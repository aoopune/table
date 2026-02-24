/**
 * Generate one JSON file per bank in RELATIONAL format (same as punjab-national-bank-relational-example.json)
 * from "Loan data matrix for website - Numerical data abroad.csv".
 * Run from Table folder: node scripts/generate-bank-json-relational.js
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TABLE_DIR = path.join(__dirname, '..');
const BANKS_DIR = path.join(TABLE_DIR, 'data', 'banks');
const NUMERICAL_CSV = process.env.NUMERICAL_CSV || path.join(TABLE_DIR, '..', 'Loan data matrix  for website - Numerical data abroad.csv');

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

/** Lender name -> slug matching manifest (e.g. "Jammu & Kashmir Bank" -> "jammu--kashmir-bank"). */
function lenderToSlug(lender) {
  return String(lender)
    .trim()
    .toLowerCase()
    .replace(/\s*&\s*/g, '--')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

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

/** Parse security weightage: "≥100%" -> {min:100,max:500}, "50–<100%" -> {min:50,max:100}, "None" -> "None". */
function parseWeightage(s) {
  const t = norm(s);
  if (!t || t.toLowerCase() === 'none') return 'None';
  const match = t.match(/≥\s*(\d+)/);
  if (match) return { min: parseInt(match[1], 10), max: 500 };
  const range = t.match(/(\d+)\s*[–-]\s*<\s*(\d+)/);
  if (range) return { min: parseInt(range[1], 10), max: parseInt(range[2], 10) };
  return t;
}

/** Parse tenure: "≤10" -> 10, ">10" -> 15, "15 excl. morat" -> 15. */
function parseTenure(s) {
  const t = norm(s);
  if (!t) return null;
  const num = t.match(/(\d+)/);
  if (num) return parseInt(num[1], 10);
  if (/≤\s*10/.test(t)) return 10;
  if (/>\s*10/.test(t)) return 15;
  return null;
}

/** Parse processing fees to { min: number (rupees), max: number (percentage) }. */
function parseProcessingFees(s) {
  const t = norm(s);
  if (!t) return null;
  let minRupees = null;
  let maxPct = null;
  const pctMatch = t.match(/(\d+(?:\.\d+)?)\s*%/);
  if (pctMatch) maxPct = parseFloat(pctMatch[1]);
  const kMatch = t.match(/(\d+)\s*k/i);
  if (kMatch) minRupees = parseInt(kMatch[1], 10) * 1000;
  const numMatch = t.match(/(\d+)\s*k/i) || t.match(/\b(\d{4,})\b/);
  if (numMatch && !minRupees) minRupees = parseInt(numMatch[1], 10);
  if (minRupees == null && maxPct == null) return null;
  return { min: minRupees != null ? minRupees : 0, max: maxPct != null ? maxPct : 0 };
}

/** Moratorium "12 months" -> 12. */
function parseMoratorium(s) {
  const t = norm(s);
  if (!t) return null;
  const m = t.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

const PUBLIC_BANKS = new Set([
  'bank of india', 'union bank of india', 'punjab national bank', 'bank of baroda', 'state bank of india',
  'canara bank', 'bank of maharashtra', 'uco bank', 'indian overseas bank', 'jammu and kashmir grameen bank'
]);

function getSector(lender) {
  const lower = (lender || '').toLowerCase();
  if (PUBLIC_BANKS.has(lower)) return 'Public bank';
  if (lower.includes('bank') && (lower.includes('state') || lower.includes('national') || lower.includes('india'))) return 'Public bank';
  return 'Private';
}

function run() {
  if (!existsSync(NUMERICAL_CSV)) {
    console.error('Numerical CSV not found:', NUMERICAL_CSV);
    process.exit(1);
  }

  const manifestPath = path.join(BANKS_DIR, 'manifest.json');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const manifestSet = new Set(manifest);

  const numericalText = readFileSync(NUMERICAL_CSV, 'utf8');
  const numericalRows = parseCSV(numericalText);
  let headerRowIndex = -1;
  for (let r = 0; r < Math.min(15, numericalRows.length); r++) {
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
    if (!byBank[lender]) byBank[lender] = [];
    byBank[lender].push(row);
  }

  let written = 0;
  let skipped = 0;
  for (const [lender, rows] of Object.entries(byBank)) {
    const slug = lenderToSlug(lender);
    if (!manifestSet.has(slug)) {
      skipped++;
      continue;
    }

    const first = rows[0];
    const sector = getSector(lender);

    const shared = {
      processing_fees: parseProcessingFees(first[COLS.processingFees]) || { min: 0, max: 0 },
      refundable_processing_fees: /yes/i.test(norm(first[COLS.refundablePF])),
      moratorium_period: parseMoratorium(first[COLS.moratorium]) || 12,
      course: norm(first[COLS.course]) || 'Any course',
      payment_during_moratorium: norm(first[COLS.paymentDuringMoratorium]) || 'Optional',
      level_of_study: norm(first[COLS.levelOfStudy]) || '',
      nationality: 'Indian',
      age: null,
      qualification: null,
      coApplicant: null,
      universityStrictness: null,
      delayed_emi_payment: null,
      Average_Time_To_Sanction: null,
      dedicatedCaseManager: null,
      onboarding_process: null
    };

    const offers = rows.map(row => {
      const minLoan = numVal(row[COLS.minLoan]);
      const maxLoanRaw = row[COLS.maxLoan];
      const maxLoan = maxLoanRaw === '99999999' || maxLoanRaw === 99999999 ? 99999999 : numVal(maxLoanRaw);
      const sec = norm(row[COLS.security]);
      const required = /yes/i.test(sec);
      const weightage = required ? parseWeightage(row[COLS.securityWeightage]) : 'None';
      const rateType = norm(row[COLS.rateType]) || 'Floating';
      const marginNum = numVal(row[COLS.margin]);
      const margin = marginNum != null ? marginNum : 0;
      const tenure = parseTenure(row[COLS.tenureMax]) ?? parseTenure(row[COLS.tenureTiedToRate]) ?? 15;
      const instChanges = /yes/i.test(norm(row[COLS.instituteWiseChanges]));
      const instCriteria = norm(row[COLS.instituteCriteria]) || null;

      return {
        gender: norm(row[COLS.gender]) || 'Equal',
        loan: { amount: { min: minLoan != null ? minLoan : 1, max: maxLoan != null ? maxLoan : 99999999 } },
        security: { required: required, weightage },
        coapplicant: norm(row[COLS.others]) || '',
        interest: {
          rate: numVal(row[COLS.interestRate]) || 0,
          type: rateType.indexOf('Fixed') >= 0 ? 'Fixed' : 'Floating'
        },
        repayment_tenure: tenure,
        margin,
        institute: { changes: instChanges, criteria: instCriteria }
      };
    });

    const lenderObj = { name: lender, sector };
    const out = {
      _comment: 'Relational / expression-tree style. Filled from Numerical data abroad sheet. security.required can be true or false; when false, weightage is "None".',
      _keyTree: {
        lender: lenderObj,
        offers: [shared]
      },
      lender: lenderObj,
      offers
    };

    const filePath = path.join(BANKS_DIR, slug + '.json');
    writeFileSync(filePath, JSON.stringify(out, null, 2), 'utf8');
    console.log('Wrote', slug + '.json', '(' + offers.length, 'offers)');
    written++;
  }

  console.log('Done. Written', written, 'banks, skipped', skipped, '(not in manifest).');
}

run();
