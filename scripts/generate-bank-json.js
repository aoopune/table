/**
 * Generate one JSON file per bank from Numerical data abroad CSV, and institutes.json from institutes CSV.
 * Run from Table folder: node scripts/generate-bank-json.js
 * Requires CSV paths: set NUMERICAL_CSV and INSTITUTES_CSV env vars, or they default to Desktop paths.
 */
const fs = require('fs');
const path = require('path');

const TABLE_DIR = path.join(__dirname, '..');
const BANKS_DIR = path.join(TABLE_DIR, 'data', 'banks');
const NUMERICAL_CSV = process.env.NUMERICAL_CSV || path.join(TABLE_DIR, '..', 'Loan data matrix  for website - Numerical data abroad.csv');
const INSTITUTES_CSV = process.env.INSTITUTES_CSV || path.join(TABLE_DIR, '..', 'Loan data matrix  for website - institutes-abroad-standardized (2).csv');

function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let i = 0;
  let inQuotes = false;
  const len = text.length;
  while (i < len) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < len && text[i + 1] === '"') {
          cell += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      if (ch === '\r' || ch === '\n') {
        cell += '\n';
        i++;
        continue;
      }
      cell += ch;
      i++;
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (ch === ',') {
      row.push(cell.trim());
      cell = '';
      i++;
      continue;
    }
    if (ch === '\n' || ch === '\r') {
      row.push(cell.trim());
      if (row.length > 0 && row.some(c => c.length > 0)) {
        rows.push(row);
      }
      row = [];
      cell = '';
      if (ch === '\r' && i + 1 < len && text[i + 1] === '\n') i++;
      i++;
      continue;
    }
    cell += ch;
    i++;
  }
  if (cell.length > 0 || row.length > 0) {
    row.push(cell.trim());
    rows.push(row);
  }
  return rows;
}

function slug(lender) {
  return String(lender)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// Numerical CSV: find header row (first cell "Lender"), then column indices
const COLS = {
  lender: 0,
  gender: 1,
  minLoan: 2,
  maxLoan: 3,
  security: 4,
  securityWeightage: 5,
  others: 6,
  interestRate: 7,
  rateType: 8,
  tenureTiedToRate: 9,
  margin: 10,
  processingFees: 11,
  refundablePF: 12,
  condition: 13,
  course: 14,
  levelOfStudy: 15,
  countryWiseChange: 16,
  country: 17,
  instituteWiseChanges: 18,
  instituteCriteria: 19,
  insurance: 20,
  tenureMax: 21,
  moratorium: 22,
  paymentDuringMoratorium: 23
};

function norm(s) {
  if (s == null || s === '') return '';
  return String(s).replace(/\r\n/g, ' ').replace(/\n/g, ' ').trim();
}

function numVal(s) {
  if (s == null || s === '') return null;
  const n = parseFloat(String(s).replace(/,/g, ''));
  return isNaN(n) ? null : n;
}

function run() {
  if (!fs.existsSync(NUMERICAL_CSV)) {
    console.error('Numerical CSV not found:', NUMERICAL_CSV);
    process.exit(1);
  }

  const numericalText = fs.readFileSync(NUMERICAL_CSV, 'utf8');
  const numericalRows = parseCSV(numericalText);
  let headerRowIndex = -1;
  for (let r = 0; r < Math.min(10, numericalRows.length); r++) {
    if (numericalRows[r][0] === 'Lender') {
      headerRowIndex = r;
      break;
    }
  }
  if (headerRowIndex < 0) {
    console.error('Header row (Lender) not found in Numerical CSV');
    process.exit(1);
  }

  const dataRows = numericalRows.slice(headerRowIndex + 1).filter(row => row[0] && /^[A-Za-z]/.test(row[0]));
  const byBank = {};
  for (const row of dataRows) {
    const lender = norm(row[COLS.lender]);
    if (!lender) continue;
    const minLoan = numVal(row[COLS.minLoan]);
    const maxLoanRaw = row[COLS.maxLoan];
    const maxLoan = maxLoanRaw === '99999999' || maxLoanRaw === 99999999 ? 99999999 : numVal(maxLoanRaw);
    const offer = {
      gender: norm(row[COLS.gender]) || 'Equal',
      minLoan: minLoan != null ? minLoan : 0,
      maxLoan: maxLoan != null ? maxLoan : 99999999,
      security: norm(row[COLS.security]),
      securityWeightage: norm(row[COLS.securityWeightage]),
      others: norm(row[COLS.others]),
      interestRate: norm(row[COLS.interestRate]),
      typeOfInterestRate: norm(row[COLS.rateType]),
      margin: norm(row[COLS.margin]),
      processingFees: norm(row[COLS.processingFees]),
      refundableProcessingFees: norm(row[COLS.refundablePF]),
      repaymentTenure: norm(row[COLS.tenureMax]),
      moratoriumPeriod: norm(row[COLS.moratorium]),
      paymentDuringMoratorium: norm(row[COLS.paymentDuringMoratorium]),
      levelOfStudy: norm(row[COLS.levelOfStudy]),
      instituteWiseChanges: norm(row[COLS.instituteWiseChanges]),
      instituteCriteria: norm(row[COLS.instituteCriteria]),
      lender,
      sector: 'Public bank',
      delayedEmiPayment: '',
      nationality: 'Indian',
      age: '',
      qualification: '',
      coApplicant: '',
      universityStrictness: '',
      avgTimeToSanction: '',
      dedicatedCaseManager: '',
      onboardingProcess: '',
      select: false
    };
    if (!byBank[lender]) byBank[lender] = [];
    byBank[lender].push(offer);
  }

  if (!fs.existsSync(BANKS_DIR)) {
    fs.mkdirSync(BANKS_DIR, { recursive: true });
  }

  const manifest = [];
  for (const [lender, offers] of Object.entries(byBank)) {
    const s = slug(lender);
    if (!s) continue;
    const filePath = path.join(BANKS_DIR, s + '.json');
    fs.writeFileSync(filePath, JSON.stringify({ lender, offers }, null, 2), 'utf8');
    manifest.push(s);
    console.log('Wrote', filePath, '(' + offers.length, 'offers)');
  }

  fs.writeFileSync(path.join(BANKS_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
  console.log('Wrote manifest.json with', manifest.length, 'banks');

  if (fs.existsSync(INSTITUTES_CSV)) {
    const instText = fs.readFileSync(INSTITUTES_CSV, 'utf8');
    const instRows = parseCSV(instText);
    const instHeader = instRows[0] || [];
    const lenderIdx = instHeader.findIndex(h => /lender/i.test(h));
    const uniIdx = instHeader.findIndex(h => /university/i.test(h));
    const countryIdx = instHeader.findIndex(h => /country/i.test(h));
    const criteriaIdx = instHeader.findIndex(h => /criteria/i.test(h));
    const institutes = instRows.slice(1)
      .filter(r => r[lenderIdx] && r[uniIdx])
      .map(r => ({
        lenderName: norm(r[lenderIdx]),
        university: norm(r[uniIdx]),
        country: norm(r[countryIdx] != null ? r[countryIdx] : ''),
        criteria: norm(r[criteriaIdx] != null ? r[criteriaIdx] : '')
      }));
    fs.writeFileSync(path.join(TABLE_DIR, 'data', 'institutes.json'), JSON.stringify(institutes, null, 2), 'utf8');
    console.log('Wrote data/institutes.json with', institutes.length, 'entries');
  } else {
    console.warn('Institutes CSV not found, skipping institutes.json');
  }
}

run();
