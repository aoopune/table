/**
 * Tests for table logic: matchesCondition, sortRows, applyFilters, CSV parse.
 * Run from project root: node scripts/test-table-logic.js
 */
var fs = require('fs');
var path = require('path');

var passed = 0;
var failed = 0;

function assert(cond, msg) {
  if (cond) { passed++; return; }
  failed++;
  console.error('FAIL: ' + msg);
}

// --- matchesCondition (same logic as app.js) ---
function matchesCondition(cellStr, op, value) {
  var v = (value != null && value !== '') ? String(value).trim() : '';
  var cell = cellStr;
  var empty = cell === '';
  switch (op) {
    case 'none': return true;
    case 'is_empty': return empty;
    case 'is_not_empty': return !empty;
    case 'contains': return cell.toLowerCase().indexOf(v.toLowerCase()) !== -1;
    case 'not_contains': return cell.toLowerCase().indexOf(v.toLowerCase()) === -1;
    case 'starts_with': return cell.toLowerCase().indexOf(v.toLowerCase()) === 0;
    case 'ends_with': return v.length && cell.length >= v.length && cell.toLowerCase().slice(-v.length) === v.toLowerCase();
    case 'equals': return cell.toLowerCase() === v.toLowerCase();
    case 'greater': return parseFloat(cell) > parseFloat(v);
    case 'greater_eq': return parseFloat(cell) >= parseFloat(v);
    case 'less': return parseFloat(cell) < parseFloat(v);
    case 'less_eq': return parseFloat(cell) <= parseFloat(v);
    case 'not_equals': return cell.toLowerCase() !== v.toLowerCase();
    case 'between': return v.indexOf(',') !== -1 && (function () { var parts = v.split(',').map(Number); return cell !== '' && parseFloat(cell) >= Math.min(parts[0], parts[1]) && parseFloat(cell) <= Math.max(parts[0], parts[1]); })();
    case 'not_between': return v.indexOf(',') !== -1 && !(function () { var parts = v.split(',').map(Number); return cell !== '' && parseFloat(cell) >= Math.min(parts[0], parts[1]) && parseFloat(cell) <= Math.max(parts[0], parts[1]); })();
    default: return true;
  }
}

function testMatchesCondition() {
  assert(matchesCondition('', 'none', '') === true, 'none');
  assert(matchesCondition('', 'is_empty', '') === true, 'is_empty true');
  assert(matchesCondition('x', 'is_empty', '') === false, 'is_empty false');
  assert(matchesCondition('hi', 'is_not_empty', '') === true, 'is_not_empty true');
  assert(matchesCondition('', 'is_not_empty', '') === false, 'is_not_empty false');
  assert(matchesCondition('Hello World', 'contains', 'world') === true, 'contains');
  assert(matchesCondition('Hello', 'contains', 'x') === false, 'contains false');
  assert(matchesCondition('Hello', 'not_contains', 'x') === true, 'not_contains');
  assert(matchesCondition('Hello', 'starts_with', 'hel') === true, 'starts_with');
  assert(matchesCondition('Hello', 'ends_with', 'lo') === true, 'ends_with');
  assert(matchesCondition('Hello', 'equals', 'hello') === true, 'equals');
  assert(matchesCondition('10', 'greater', '5') === true, 'greater');
  assert(matchesCondition('10', 'greater_eq', '10') === true, 'greater_eq');
  assert(matchesCondition('3', 'less', '5') === true, 'less');
  assert(matchesCondition('5', 'less_eq', '5') === true, 'less_eq');
  assert(matchesCondition('a', 'not_equals', 'b') === true, 'not_equals');
  assert(matchesCondition('5', 'between', '1,10') === true, 'between');
  assert(matchesCondition('15', 'between', '1,10') === false, 'between false');
  assert(matchesCondition('15', 'not_between', '1,10') === true, 'not_between');
}

// --- sortRows (same logic as app.js) ---
function sortRows(rows, colId, dir) {
  var out = rows.slice();
  out.sort(function (a, b) {
    var va = a[colId];
    var vb = b[colId];
    var na = typeof va === 'number' || (typeof va === 'string' && /^-?\d*\.?\d+$/.test(String(va).trim()));
    var nb = typeof vb === 'number' || (typeof vb === 'string' && /^-?\d*\.?\d+$/.test(String(vb).trim()));
    if (na && nb) {
      var nA = Number(va);
      var nB = Number(vb);
      return dir === 'asc' ? (nA - nB) : (nB - nA);
    }
    var sA = va != null && va !== '' ? String(va).toLowerCase() : '';
    var sB = vb != null && vb !== '' ? String(vb).toLowerCase() : '';
    var c = sA.localeCompare(sB);
    return dir === 'asc' ? c : -c;
  });
  return out;
}

function testSortRows() {
  var rows = [
    { lender: 'C Bank' },
    { lender: 'A Bank' },
    { lender: 'B Bank' }
  ];
  var asc = sortRows(rows, 'lender', 'asc');
  assert(asc[0].lender === 'A Bank', 'sort asc first');
  assert(asc[2].lender === 'C Bank', 'sort asc last');
  var desc = sortRows(rows, 'lender', 'desc');
  assert(desc[0].lender === 'C Bank', 'sort desc first');
  assert(desc[2].lender === 'A Bank', 'sort desc last');
  var numRows = [{ age: '30' }, { age: '20' }, { age: '25' }];
  var numAsc = sortRows(numRows, 'age', 'asc');
  assert(numAsc[0].age === '20', 'sort numeric asc');
  assert(numAsc[2].age === '30', 'sort numeric asc last');
}

// --- applyFilters with mock config ---
var MOCK_CONFIG = {
  columnGroups: [
    { cols: [{ id: 'lender' }, { id: 'sector' }] }
  ]
};

function applyFilters(rows, filters) {
  var colIds = ['lender', 'sector'];
  return rows.filter(function (row) {
    for (var i = 0; i < colIds.length; i++) {
      var colId = colIds[i];
      var rule = filters[colId];
      if (!rule) continue;
      var val = row[colId];
      var cellStr = val != null && val !== '' ? String(val) : '';
      if (rule.type === 'condition') {
        if (!matchesCondition(cellStr, rule.op, rule.value)) return false;
      } else if (rule.type === 'values') {
        if (!rule.selectedValues || !rule.selectedValues[cellStr]) return false;
      }
    }
    return true;
  });
}

function testApplyFilters() {
  var rows = [
    { lender: 'A', sector: 'Public' },
    { lender: 'B', sector: 'Private' },
    { lender: 'C', sector: 'Public' }
  ];
  var f1 = applyFilters(rows, { sector: { type: 'condition', op: 'equals', value: 'Public' } });
  assert(f1.length === 2, 'filter condition equals');
  assert(f1.every(function (r) { return r.sector === 'Public'; }), 'filter condition content');
  var f2 = applyFilters(rows, { sector: { type: 'values', selectedValues: { 'Private': true } } });
  assert(f2.length === 1 && f2[0].lender === 'B', 'filter by values');
  var f3 = applyFilters(rows, { sector: { type: 'condition', op: 'contains', value: 'lic' } });
  assert(f3.length === 2, 'filter contains');
}

// --- CSV parse and buildTableData ---
var CSV_PATH = path.join(__dirname, '..', 'data', 'loan-data-abroad.csv');
var CSV_TO_COL = { 0: 'lender', 2: 'sector', 12: 'nationality', 13: 'age', 14: 'qualification', 15: 'coApplicant', 16: 'universityStrictness', 3: 'interestRate', 4: 'typeOfInterestRate', 5: 'margin', 6: 'processingFees', 7: 'refundableProcessingFees', 8: 'repaymentTenure', 9: 'moratoriumPeriod', 10: 'paymentDuringMoratorium', 11: 'delayedEmiPayment', 17: 'avgTimeToSanction', 18: 'dedicatedCaseManager', 19: 'onboardingProcess' };

function parseCSV(text) {
  var rows = [], row = [], cell = '', i = 0, inQuotes = false, len = text.length;
  while (i < len) {
    var ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < len && text[i + 1] === '"') { cell += '"'; i += 2; continue; }
        inQuotes = false; i++; continue;
      }
      if (ch === '\r' || ch === '\n') { cell += '\n'; i++; continue; }
      cell += ch; i++; continue;
    }
    if (ch === '"') { inQuotes = true; i++; continue; }
    if (ch === ',') { row.push(cell.trim()); cell = ''; i++; continue; }
    if (ch === '\n' || ch === '\r') {
      row.push(cell.trim());
      if (row.length > 0 && row.some(function (c) { return c.length > 0; })) rows.push(row);
      row = []; cell = '';
      if (ch === '\r' && i + 1 < len && text[i + 1] === '\n') i++;
      i++; continue;
    }
    cell += ch; i++;
  }
  if (cell.length > 0 || row.length > 0) { row.push(cell.trim()); rows.push(row); }
  return rows;
}

function buildTableDataFromRows(dataRows) {
  return dataRows.map(function (row) {
    var obj = { select: false };
    Object.keys(CSV_TO_COL).forEach(function (csvIdx) {
      var colId = CSV_TO_COL[csvIdx];
      var val = row[csvIdx];
      if (val != null && String(val).trim() !== '') obj[colId] = String(val).trim().replace(/\r\n/g, '\n').replace(/\n/g, ' ');
    });
    return obj;
  });
}

function testCSV() {
  if (!fs.existsSync(CSV_PATH)) {
    assert(false, 'CSV file missing');
    return;
  }
  var text = fs.readFileSync(CSV_PATH, 'utf8');
  var rows = parseCSV(text);
  assert(rows.length >= 4, 'CSV has header + info + data rows');
  var dataRows = rows.slice(4);
  var data = buildTableDataFromRows(dataRows);
  assert(data.length === 38, 'CSV data row count 38');
  assert(data[0].lender === 'State Bank of India', 'first row lender');
  assert(data[0].sector === 'Public bank', 'first row sector');
  assert(data[37].lender === 'Jammu & Kashmir Bank', 'last row lender');
}

// --- run all ---
testMatchesCondition();
testSortRows();
testApplyFilters();
testCSV();

console.log('Logic tests: ' + passed + ' passed, ' + failed + ' failed');
process.exit(failed > 0 ? 1 : 0);
