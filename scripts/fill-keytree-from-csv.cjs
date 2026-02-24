const fs = require('fs');
const path = require('path');

// Parse CSV with quoted fields (handles newlines inside quotes)
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  const len = text.length;
  for (let i = 0; i < len; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        field += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (!inQuotes) {
      if (c === ',') {
        row.push(field.trim());
        field = '';
      } else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(field.trim());
        if (row.some(cell => cell !== '')) rows.push(row);
        row = [];
        field = '';
      } else {
        field += c;
      }
    } else {
      field += c;
    }
  }
  if (field.trim() !== '' || row.length > 0) {
    row.push(field.trim());
    if (row.some(cell => cell !== '')) rows.push(row);
  }
  return rows;
}

function parseAge(val) {
  if (!val || val === '-' || val === '') return null;
  const m = val.match(/^(\d+)\+$/);
  if (m) return { min: parseInt(m[1], 10), max: 99 };
  const range = val.match(/^(\d+)-(\d+)$/);
  if (range) return { min: parseInt(range[1], 10), max: parseInt(range[2], 10) };
  return val;
}

function parseAvgTime(val) {
  if (!val || val === '' || /not available/i.test(val)) return null;
  const m = val.match(/^(\d+)-(\d+)$/);
  if (m) return { min: parseInt(m[1], 10), max: parseInt(m[2], 10) };
  return val;
}

function parseDedicated(val) {
  if (!val || val === '') return null;
  return /^yes$/i.test(val.trim());
}

const EXCLUDE = new Set([
  'aditya-birla-capital',
  'auxilo',
  'avanse',
  'axis-bank',
  'bank-of-baroda'
]);

const BANKS_DIR = path.join(__dirname, '..', 'data', 'banks');
const CSV_PATH = 'c:\\Users\\Yash Jangid\\Desktop\\Loan data matrix  for website - Columns to show on website abroad (3).csv';

// CSV column indices (header row 3 = index 2)
const COL = {
  lender: 0,
  link: 1,
  sector: 2,
  delayed_emi_payment: 11,
  nationality: 12,
  age: 13,
  qualification: 14,
  coApplicant: 15,
  universityStrictness: 16,
  avgTimeToSanction: 17,
  dedicatedCaseManager: 18,
  onboarding_process: 19,
  moratorium_period: 9,
  payment_during_moratorium: 10
};

// Normalize lender name for matching (CSV name -> possible JSON lender.name values)
function normalizeLenderName(name) {
  if (!name) return '';
  return name.trim()
    .replace(/\s+/g, ' ')
    .replace(/&/g, '&')
    .toLowerCase();
}

// Build map: CSV lender name (normalized) -> CSV row
function buildCSVMap(rows) {
  const map = new Map();
  // Skip header rows (first 3 rows)
  for (let i = 3; i < rows.length; i++) {
    const row = rows[i];
    const name = (row[COL.lender] || '').trim();
    if (!name) continue;
    const key = normalizeLenderName(name);
    map.set(key, row);
  }
  return map;
}

// Lender name from JSON (from lender.name or _keyTree.lender.name) -> bank file slug
function lenderNameToSlug(name) {
  if (!name) return '';
  const n = name.trim().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/&/g, '--')
    .replace(/[^a-z0-9-]/g, '');
  return n;
}

function getSlugToLenderName(banksDir) {
  const slugs = fs.readdirSync(banksDir)
    .filter(f => f.endsWith('.json') && !['bank-offer-schema.json', 'offer-key-tree-schema.json', 'manifest.json'].includes(f));
  const slugToName = {};
  for (const file of slugs) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(banksDir, file), 'utf8'));
      const name = (data.lender && data.lender.name) || (data._keyTree && data._keyTree.lender && data._keyTree.lender.name) || '';
      if (name) slugToName[path.basename(file, '.json')] = name.trim();
    } catch (e) {}
  }
  return slugToName;
}

function main() {
  const csvText = fs.readFileSync(CSV_PATH, 'utf8');
  const rows = parseCSV(csvText);
  const csvMap = buildCSVMap(rows);
  const slugToLenderName = getSlugToLenderName(BANKS_DIR);

  let updated = 0;
  let skipped = 0;

  for (const [slug, lenderName] of Object.entries(slugToLenderName)) {
    if (EXCLUDE.has(slug)) {
      skipped++;
      continue;
    }
    const key = normalizeLenderName(lenderName);
    const row = csvMap.get(key);
    if (!row) {
      console.warn('No CSV row for:', lenderName, '(slug:', slug + ')');
      continue;
    }

    const filePath = path.join(BANKS_DIR, slug + '.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const keyTreeOffer = data._keyTree && data._keyTree.offers && data._keyTree.offers[0];
    if (!keyTreeOffer) continue;

    const v = (i) => (row[i] !== undefined && row[i] !== '') ? String(row[i]).trim() : null;

    keyTreeOffer.nationality = v(COL.nationality) || keyTreeOffer.nationality;
    keyTreeOffer.age = parseAge(v(COL.age));
    if (keyTreeOffer.age === null && v(COL.age) === null) delete keyTreeOffer.age;
    else if (keyTreeOffer.age !== undefined) {}
    keyTreeOffer.qualification = v(COL.qualification) || keyTreeOffer.qualification;
    keyTreeOffer.coApplicant = v(COL.coApplicant) || keyTreeOffer.coApplicant;
    keyTreeOffer.universityStrictness = v(COL.universityStrictness) || keyTreeOffer.universityStrictness;
    keyTreeOffer.delayed_emi_payment = v(COL.delayed_emi_payment) || keyTreeOffer.delayed_emi_payment;
    const avgTime = parseAvgTime(v(COL.avgTimeToSanction));
    keyTreeOffer.Average_Time_To_Sanction = avgTime !== null ? avgTime : keyTreeOffer.Average_Time_To_Sanction;
    const dedicated = parseDedicated(v(COL.dedicatedCaseManager));
    keyTreeOffer.dedicatedCaseManager = dedicated !== null ? dedicated : keyTreeOffer.dedicatedCaseManager;
    keyTreeOffer.onboarding_process = v(COL.onboarding_process) || keyTreeOffer.onboarding_process;

    const moratorium = v(COL.moratorium_period);
    if (moratorium) {
      const num = parseInt(moratorium, 10);
      keyTreeOffer.moratorium_period = isNaN(num) ? keyTreeOffer.moratorium_period : num;
    }
    const paymentDuring = v(COL.payment_during_moratorium);
    if (paymentDuring) keyTreeOffer.payment_during_moratorium = paymentDuring;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    updated++;
    console.log('Updated:', slug);
  }

  console.log('\nUpdated:', updated, 'banks. Skipped (excluded):', skipped);
}

main();
