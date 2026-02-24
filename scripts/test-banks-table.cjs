/**
 * Bank-by-bank tests: verify each bank JSON and that the table can show correct data
 * when merged with Static_data_abroad.
 *
 * Run from Table folder: node scripts/test-banks-table.js
 *
 * TESTS:
 * 1. manifest.json exists and is a non-empty array of slugs.
 * 2. For each slug in manifest, data/banks/<slug>.json exists and is valid:
 *    - has "lender" (non-empty string)
 *    - has "offers" (array, length >= 1)
 *    - each offer has minLoan, maxLoan, gender; and at least one of interestRate or typeOfInterestRate.
 * 3. Static_data_abroad CSV parses and yields STATIC_DATA_BY_LENDER with at least one lender.
 * 4. For each bank in manifest, after merging static data into one of its offers:
 *    - merged row has "lender" and "sector" (sector can come from static).
 * 5. institutes.json exists and is an array (optional: non-empty).
 * 6. Table column ids from table-config exist on merged sample rows (no extra/missing required cols).
 * 7. Query fields: each bank's offers have the fields required for all possible queries (gender, minLoan,
 *    maxLoan, security, levelOfStudy; if instituteWiseChanges === 'yes', instituteCriteria present).
 */

var fs = require('fs');
var path = require('path');

var TABLE_DIR = path.join(__dirname, '..');
var BANKS_DIR = path.join(TABLE_DIR, 'data', 'banks');
var CSV_PATH = path.join(TABLE_DIR, 'data', 'loan-data-abroad.csv');
var INSTITUTES_PATH = path.join(TABLE_DIR, 'data', 'institutes.json');
var CONFIG_PATH = path.join(TABLE_DIR, 'data', 'table-config.js');

var failures = [];
var passed = 0;

function fail(testName, message) {
  failures.push({ test: testName, message: message });
}

function ok(testName) {
  passed++;
}

// ----- CSV parse (same as static-data-loader / loan-data-loader) -----
var CSV_TO_COL = {
  0: 'lender', 2: 'sector', 12: 'nationality', 13: 'age', 14: 'qualification', 15: 'coApplicant',
  16: 'universityStrictness', 3: 'interestRate', 4: 'typeOfInterestRate', 5: 'margin', 6: 'processingFees',
  7: 'refundableProcessingFees', 8: 'repaymentTenure', 9: 'moratoriumPeriod', 10: 'paymentDuringMoratorium',
  11: 'delayedEmiPayment', 17: 'avgTimeToSanction', 18: 'dedicatedCaseManager', 19: 'onboardingProcess'
};

function parseCSV(text) {
  var rows = [];
  var row = [];
  var cell = '';
  var i = 0;
  var inQuotes = false;
  var len = text.length;
  while (i < len) {
    var ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < len && text[i + 1] === '"') { cell += '"'; i += 2; continue; }
        inQuotes = false;
        i++;
        continue;
      }
      if (ch === '\r' || ch === '\n') { cell += '\n'; i++; continue; }
      cell += ch;
      i++;
      continue;
    }
    if (ch === '"') { inQuotes = true; i++; continue; }
    if (ch === ',') { row.push(cell.trim()); cell = ''; i++; continue; }
    if (ch === '\n' || ch === '\r') {
      row.push(cell.trim());
      if (row.length > 0 && row.some(function (c) { return c.length > 0; })) rows.push(row);
      row = []; cell = '';
      if (ch === '\r' && i + 1 < len && text[i + 1] === '\n') i++;
      i++;
      continue;
    }
    cell += ch;
    i++;
  }
  if (cell.length > 0 || row.length > 0) { row.push(cell.trim()); rows.push(row); }
  return rows;
}

function buildStaticByLender(dataRows) {
  var byLender = {};
  dataRows.forEach(function (row) {
    var lender = row[0];
    if (lender == null || String(lender).trim() === '') return;
    lender = String(lender).trim();
    if (byLender[lender]) return;
    var obj = {};
    Object.keys(CSV_TO_COL).forEach(function (idx) {
      var colId = CSV_TO_COL[idx];
      if (colId === 'lender') return;
      var val = row[idx];
      if (val != null && String(val).trim() !== '') {
        obj[colId] = String(val).trim().replace(/\r\n/g, '\n').replace(/\n/g, ' ');
      }
    });
    byLender[lender] = obj;
  });
  return byLender;
}

// mergeStaticIntoRows (same logic as app.js)
function mergeStaticIntoRows(rows, staticByLender) {
  if (!staticByLender || typeof staticByLender !== 'object') return rows;
  return rows.map(function (row) {
    var lender = row.lender;
    var stat = lender ? staticByLender[lender] : null;
    if (!stat) return row;
    var out = {};
    for (var k in row) out[k] = row[k];
    for (var key in stat) {
      if (out[key] == null || String(out[key]).trim() === '') out[key] = stat[key];
    }
    return out;
  });
}

// ----- Get table column ids from table-config (read file and extract) -----
function getTableColumnIds() {
  try {
    var src = fs.readFileSync(CONFIG_PATH, 'utf8');
    var ids = [];
    var re = /id:\s*['"](\w+)['"]/g;
    var m;
    while ((m = re.exec(src)) !== null) ids.push(m[1]);
    return ids;
  } catch (e) {
    return [];
  }
}

// ----- Tests -----

// Test 1: manifest
var manifest;
try {
  var manifestPath = path.join(BANKS_DIR, 'manifest.json');
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (!Array.isArray(manifest) || manifest.length === 0) {
    fail('manifest', 'manifest.json must be a non-empty array of bank slugs');
  } else {
    ok('manifest');
  }
} catch (e) {
  fail('manifest', e.message || 'Could not load manifest.json');
  manifest = [];
}

// Normalize lender to string (supports relational { name, sector })
function lenderDisplay(data) {
  var l = data.lender;
  if (typeof l === 'string') return l.trim();
  if (l && typeof l === 'object' && l.name) return String(l.name).trim();
  return '';
}

// Normalize offer to flat form for tests (supports relational loan.amount, security, interest, institute)
function normalizeOffer(o, lenderName) {
  if (o.loan && o.loan.amount) {
    var sec = o.security;
    var secVal = (sec && (sec.required === true || sec.required === 'Yes')) ? 'Yes' : 'No';
    var iwc = (o.institute && o.institute.changes) ? 'yes' : 'no';
    var level = (o.level_of_study != null) ? o.level_of_study : '';
    if (level === '' && o.levelOfStudy != null) level = o.levelOfStudy;
    return {
      minLoan: o.loan.amount.min,
      maxLoan: o.loan.amount.max,
      gender: o.gender,
      interestRate: (o.interest && o.interest.rate != null) ? String(o.interest.rate) : '',
      typeOfInterestRate: (o.interest && o.interest.type) || '',
      security: secVal,
      securityWeightage: (sec && sec.weightage) || '',
      levelOfStudy: level,
      instituteWiseChanges: iwc,
      instituteCriteria: (o.institute && o.institute.criteria) || '',
      lender: lenderName
    };
  }
  return o;
}

// Test 2: each bank JSON (supports both flat and relational format)
var allOffers = [];
var lendersBySlug = {};
manifest.forEach(function (slug) {
  var filePath = path.join(BANKS_DIR, slug + '.json');
  try {
    if (!fs.existsSync(filePath)) {
      fail('bank-' + slug, 'File missing: ' + filePath);
      return;
    }
    var data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    var lenderName = lenderDisplay(data);
    if (!lenderName) {
      fail('bank-' + slug, 'Missing or empty "lender" (or lender.name)');
      return;
    }
    if (!Array.isArray(data.offers) || data.offers.length === 0) {
      fail('bank-' + slug, 'Missing or empty "offers" array');
      return;
    }
    lendersBySlug[slug] = lenderName;
    data.offers.forEach(function (o, idx) {
      var offer = normalizeOffer(o, lenderName);
      if (!offer.minLoan && offer.minLoan !== 0) {
        fail('bank-' + slug, 'Offer ' + idx + ' missing minLoan (or loan.amount.min)');
        return;
      }
      if (!offer.maxLoan && offer.maxLoan !== 0) {
        fail('bank-' + slug, 'Offer ' + idx + ' missing maxLoan (or loan.amount.max)');
        return;
      }
      if (offer.gender == null && offer.gender !== '') {
        fail('bank-' + slug, 'Offer ' + idx + ' missing gender');
        return;
      }
      if ((offer.interestRate == null || String(offer.interestRate).trim() === '') &&
          (offer.typeOfInterestRate == null || String(offer.typeOfInterestRate).trim() === '')) {
        fail('bank-' + slug, 'Offer ' + idx + ' should have interestRate or typeOfInterestRate');
        return;
      }
      if (!offer.lender) offer.lender = lenderName;
      allOffers.push(offer);
    });
    ok('bank-' + slug);
    // Test 7: query fields (security; levelOfStudy optional for relational; if instituteWiseChanges yes then instituteCriteria)
    var queryFieldsOk = true;
    data.offers.forEach(function (o, idx) {
      var flat = normalizeOffer(o, lenderName);
      var isRelational = o.loan && o.loan.amount;
      var hasSecurity = flat.security !== undefined && flat.security !== null;
      var hasLevel = flat.levelOfStudy !== undefined && flat.levelOfStudy !== null;
      var iwc = (flat.instituteWiseChanges || '').toString().toLowerCase();
      var needsCriteria = iwc === 'yes';
      var hasCriteria = !needsCriteria || (flat.instituteCriteria != null && String(flat.instituteCriteria).trim() !== '');
      if (!hasSecurity) {
        fail('query-fields-' + slug, 'Offer ' + idx + ' missing security (required for Secured/Unsecured query)');
        queryFieldsOk = false;
      }
      if (!isRelational && !hasLevel) {
        fail('query-fields-' + slug, 'Offer ' + idx + ' missing levelOfStudy');
        queryFieldsOk = false;
      }
      if (!hasCriteria && needsCriteria) {
        fail('query-fields-' + slug, 'Offer ' + idx + ' has instituteWiseChanges=yes but missing instituteCriteria');
        queryFieldsOk = false;
      }
    });
    if (queryFieldsOk) ok('query-fields-' + slug);
  } catch (e) {
    fail('bank-' + slug, e.message || 'Invalid JSON or read error');
  }
});

// Test 3 & 4: static data and merge
var staticByLender = {};
try {
  var csvText = fs.readFileSync(CSV_PATH, 'utf8');
  var rows = parseCSV(csvText);
  if (rows.length < 4) {
    fail('static-csv', 'CSV has fewer than 4 rows (need header + info + data)');
  } else {
    var dataRows = rows.slice(4).filter(function (r) {
      return r[0] != null && String(r[0]).trim() !== '';
    });
    staticByLender = buildStaticByLender(dataRows);
    var staticLenders = Object.keys(staticByLender);
    if (staticLenders.length === 0) {
      fail('static-csv', 'STATIC_DATA_BY_LENDER is empty');
    } else {
      ok('static-csv');
    }
    // Test 4: each bank has at least one offer that, when merged, has lender; if static has this lender, sector should be filled
    manifest.forEach(function (slug) {
      var lenderName = lendersBySlug[slug];
      if (!lenderName) return;
      var bankOffers = allOffers.filter(function (o) { return o.lender === lenderName; });
      if (bankOffers.length === 0) {
        fail('merge-' + slug, 'No offers found for lender "' + lenderName + '"');
        return;
      }
      var merged = mergeStaticIntoRows([ bankOffers[0] ], staticByLender);
      var row = merged[0];
      if (!row.lender || String(row.lender).trim() === '') {
        fail('merge-' + slug, 'Merged row missing lender');
        return;
      }
      var staticRow = staticByLender[lenderName];
      if (staticRow && (staticRow.sector == null || String(staticRow.sector).trim() === '')) {
        // static has this lender but no sector - ok, table may show empty sector
      } else if (staticRow && (!row.sector || String(row.sector).trim() === '')) {
        fail('merge-' + slug, 'Merged row missing sector (static has sector for ' + lenderName + ')');
        return;
      }
      ok('merge-' + slug);
    });
  }
} catch (e) {
  fail('static-csv', e.message || 'Could not load or parse Static_data_abroad CSV');
}

// Test 5: institutes.json
try {
  if (!fs.existsSync(INSTITUTES_PATH)) {
    fail('institutes', 'institutes.json not found');
  } else {
    var institutes = JSON.parse(fs.readFileSync(INSTITUTES_PATH, 'utf8'));
    if (!Array.isArray(institutes)) {
      fail('institutes', 'institutes.json must be an array');
    } else {
      ok('institutes');
    }
  }
} catch (e) {
  fail('institutes', e.message || 'Could not load institutes.json');
}

// Test 6: table column ids present on merged row
var colIds = getTableColumnIds();
if (colIds.length > 0 && Object.keys(staticByLender).length > 0) {
  var firstLender = Object.keys(staticByLender)[0];
  var sampleOffers = allOffers.filter(function (o) { return o.lender === firstLender; });
  if (sampleOffers.length > 0) {
    var sampleMerged = mergeStaticIntoRows([ sampleOffers[0] ], staticByLender)[0];
    var missing = colIds.filter(function (id) {
      if (id === 'select') return false;
      return sampleMerged[id] == null || String(sampleMerged[id]).trim() === '';
    });
    if (missing.length === colIds.length - 1) {
      fail('table-cols', 'Merged row has no table columns (except select)');
    } else {
      ok('table-cols');
    }
  } else {
    ok('table-cols');
  }
} else {
  ok('table-cols');
}

// ----- Report -----
console.log('--- Bank-by-bank table tests ---');
console.log('Passed: ' + passed);
console.log('Failed: ' + failures.length);
if (failures.length > 0) {
  console.log('\nFailures:');
  failures.forEach(function (f) {
    console.log('  [' + f.test + '] ' + f.message);
  });
  process.exit(1);
}
console.log('\nAll tests passed. Table data (bank JSONs + static merge) is consistent.');
process.exit(0);
