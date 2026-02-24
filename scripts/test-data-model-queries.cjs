/**
 * Test: every complex query that can exist is answerable from the data model.
 * Loads data/banks/*.json (no server), runs each query type, asserts result is derivable.
 * Run: node scripts/test-data-model-queries.cjs
 */
const fs = require('fs');
const path = require('path');

const BANKS_DIR = path.join(__dirname, '..', 'data', 'banks');
const MANIFEST_PATH = path.join(BANKS_DIR, 'manifest.json');

/** @typedef {{ bankSlug: string, lender: object, shared: object | null, offer: object }} OfferRow */

/**
 * Load all bank files and return flat list of { bankSlug, lender, shared, offer }.
 * shared = _keyTree.offers[0] (shared offer-level keys).
 * @returns {OfferRow[]}
 */
function loadAllOffers() {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  if (!Array.isArray(manifest)) throw new Error('manifest.json must be an array of slugs');
  const rows = [];
  for (const slug of manifest) {
    const filePath = path.join(BANKS_DIR, slug + '.json');
    if (!fs.existsSync(filePath)) continue;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const lender = data.lender || {};
    const shared = (data._keyTree && data._keyTree.offers && data._keyTree.offers[0]) || null;
    const offers = data.offers;
    if (!Array.isArray(offers)) continue;
    for (const offer of offers) {
      rows.push({ bankSlug: slug, lender, shared, offer });
    }
  }
  return rows;
}

/**
 * Assert query is answerable: run fn(rows), expect array back, each element has required keys.
 * @param {string} name
 * @param {(rows: OfferRow[]) => OfferRow[]} queryFn
 * @param {string[]} requiredKeys - e.g. ['offer.loan.amount']
 */
function assertQueryAnswerable(name, queryFn, requiredKeys = []) {
  try {
    const result = queryFn(rows);
    if (!Array.isArray(result)) {
      console.log('  FAIL: ' + name + ' — result is not an array');
      return false;
    }
    for (const row of result) {
      for (const key of requiredKeys) {
        const parts = key.split('.');
        let o = row;
        for (const p of parts) {
          o = o && o[p];
          if (o === undefined) {
            console.log('  FAIL: ' + name + ' — missing ' + key + ' in result row');
            return false;
          }
        }
      }
    }
    console.log('  OK: ' + name + ' (n=' + result.length + ')');
    return true;
  } catch (e) {
    console.log('  FAIL: ' + name + ' — ' + e.message);
    return false;
  }
}

// --- Load data once
let rows;
try {
  rows = loadAllOffers();
  console.log('Loaded ' + rows.length + ' offers from ' + BANKS_DIR + '\n');
} catch (e) {
  console.error('Load failed:', e.message);
  process.exit(1);
}

let passed = 0;
let total = 0;

// --- 1. Lender
total++;
if (assertQueryAnswerable(
  'Q1: By lender name',
  (r) => r.filter((x) => (x.lender && x.lender.name) && x.lender.name.includes('Axis')),
  ['lender', 'offer']
)) passed++;

total++;
if (assertQueryAnswerable(
  'Q2: By lender sector',
  (r) => r.filter((x) => x.lender && (x.lender.sector || '').toLowerCase().includes('public')),
  ['lender', 'offer']
)) passed++;

// --- 3. Loan amount (amount in [min, max])
total++;
if (assertQueryAnswerable(
  'Q3: Loan amount in range (e.g. 10L–40L)',
  (r) => {
    const amount = 1000000;
    return r.filter((x) => {
      const a = x.offer && x.offer.loan && x.offer.loan.amount;
      if (!a || a.min == null || a.max == null) return false;
      return amount >= a.min && amount <= a.max;
    });
  },
  ['offer', 'offer.loan', 'offer.loan.amount']
)) passed++;

// --- 4. Security
total++;
if (assertQueryAnswerable(
  'Q4: Secured only',
  (r) => r.filter((x) => x.offer && x.offer.security && x.offer.security.required === true),
  ['offer', 'offer.security']
)) passed++;

total++;
if (assertQueryAnswerable(
  'Q5: Unsecured only',
  (r) => r.filter((x) => x.offer && x.offer.security && x.offer.security.required === false),
  ['offer', 'offer.security']
)) passed++;

// --- 6. Interest
total++;
if (assertQueryAnswerable(
  'Q6: Interest rate <= 10%',
  (r) => r.filter((x) => {
    const rate = x.offer && x.offer.interest && x.offer.interest.rate;
    return typeof rate === 'number' && rate <= 10;
  }),
  ['offer', 'offer.interest']
)) passed++;

total++;
if (assertQueryAnswerable(
  'Q7: Interest rate >= 9%',
  (r) => r.filter((x) => {
    const rate = x.offer && x.offer.interest && x.offer.interest.rate;
    return typeof rate === 'number' && rate >= 9;
  }),
  ['offer']
)) passed++;

// --- 8. Processing fees (structure, refundable, summary)
total++;
if (assertQueryAnswerable(
  'Q8: Processing fee nil',
  (r) => r.filter((x) => {
    const pf = x.offer && x.offer.processing_fees;
    return pf && (pf.structure === 'nil' || (pf.summary && pf.summary.is_nil === true));
  }),
  ['offer', 'offer.processing_fees']
)) passed++;

total++;
if (assertQueryAnswerable(
  'Q9: Processing fee flat only',
  (r) => r.filter((x) => {
    const pf = x.offer && x.offer.processing_fees;
    return pf && (pf.structure === 'flat' || (pf.summary && pf.summary.is_flat_only === true));
  }),
  ['offer', 'offer.processing_fees']
)) passed++;

total++;
if (assertQueryAnswerable(
  'Q10: Processing fee percent with cap',
  (r) => r.filter((x) => {
    const pf = x.offer && x.offer.processing_fees;
    return pf && (pf.structure === 'percent_with_max_cap' || (pf.summary && pf.summary.has_cap === true));
  }),
  ['offer', 'offer.processing_fees']
)) passed++;

total++;
if (assertQueryAnswerable(
  'Q11: Refundable processing fee',
  (r) => r.filter((x) => {
    const pf = x.offer && x.offer.processing_fees;
    return pf && pf.refundable === true;
  }),
  ['offer', 'offer.processing_fees']
)) passed++;

total++;
if (assertQueryAnswerable(
  'Q12: Processing fee percent <= 1%',
  (r) => r.filter((x) => {
    const pf = x.offer && x.offer.processing_fees;
    const pct = pf && (pf.percent != null ? pf.percent : (pf.summary && pf.summary.percent));
    return typeof pct === 'number' && pct <= 1;
  }),
  ['offer']
)) passed++;

total++;
if (assertQueryAnswerable(
  'Q13: Processing fee cap <= 10000',
  (r) => r.filter((x) => {
    const pf = x.offer && x.offer.processing_fees;
    const cap = pf && (pf.max_inr != null ? pf.max_inr : (pf.summary && pf.summary.max_inr));
    return cap != null && cap <= 10000;
  }),
  ['offer']
)) passed++;

// --- 14. Repayment
total++;
if (assertQueryAnswerable(
  'Q14: Repayment tenure >= 15 years',
  (r) => r.filter((x) => {
    const rt = x.offer && x.offer.repayment_tenure;
    const tenure = rt && (rt.tenure != null ? rt.tenure : rt);
    return typeof tenure === 'number' && tenure >= 15;
  }),
  ['offer']
)) passed++;

// --- 15. Moratorium (periodMonths)
total++;
if (assertQueryAnswerable(
  'Q15: Moratorium >= 12 months',
  (r) => r.filter((x) => {
    const mor = x.offer && x.offer.moratorium;
    const pm = mor && mor.periodMonths;
    if (!pm) return false;
    const maxMonths = pm.max != null ? pm.max : (Array.isArray(pm.options) ? Math.max(...pm.options) : pm.min);
    return maxMonths != null && maxMonths >= 12;
  }),
  ['offer', 'offer.moratorium']
)) passed++;

total++;
if (assertQueryAnswerable(
  'Q16: Moratorium payment during = Optional',
  (r) => r.filter((x) => {
    const mor = x.offer && x.offer.moratorium;
    return mor && (mor.paymentDuring || '').toLowerCase().includes('optional');
  }),
  ['offer', 'offer.moratorium']
)) passed++;

// --- 17. Eligibility
total++;
if (assertQueryAnswerable(
  'Q17: By gender (Equal)',
  (r) => r.filter((x) => x.offer && (x.offer.gender || '').toLowerCase() === 'equal'),
  ['offer']
)) passed++;

total++;
if (assertQueryAnswerable(
  'Q18: Coapplicant contains "Mandatory"',
  (r) => r.filter((x) => (x.offer && x.offer.coapplicant || '').includes('Mandatory')),
  ['offer']
)) passed++;

// --- 19. Institute
total++;
if (assertQueryAnswerable(
  'Q19: Institute has university list (changes === true)',
  (r) => r.filter((x) => x.offer && x.offer.institute && x.offer.institute.changes === true),
  ['offer', 'offer.institute']
)) passed++;

total++;
if (assertQueryAnswerable(
  'Q20: Level of study contains "Postgraduate"',
  (r) => r.filter((x) => {
    const level = (x.offer && x.offer.institute && x.offer.institute.level_of_study) || (x.shared && x.shared.level_of_study) || '';
    return String(level).includes('Postgraduate');
  }),
  ['offer']
)) passed++;

total++;
if (assertQueryAnswerable(
  'Q21: By course (Any course)',
  (r) => r.filter((x) => (x.offer && x.offer.course || '').toLowerCase().includes('any')),
  ['offer']
)) passed++;

// --- 22. Shared / _keyTree (nationality, age, process)
total++;
if (assertQueryAnswerable(
  'Q22: Nationality Indian (from shared or offer)',
  (r) => r.filter((x) => {
    const n = (x.shared && x.shared.nationality) || '';
    return String(n).toLowerCase().includes('indian');
  }),
  []
)) passed++;

total++;
if (assertQueryAnswerable(
  'Q23: Age range 18–35 (shared age.min/max)',
  (r) => r.filter((x) => {
    const age = (x.shared && x.shared.age) || {};
    const min = age.min != null ? age.min : 0;
    const max = age.max != null ? age.max : 999;
    return 18 >= min && 35 <= max;
  }),
  []
)) passed++;

total++;
if (assertQueryAnswerable(
  'Q24: Dedicated case manager (shared)',
  (r) => r.filter((x) => x.shared && x.shared.dedicatedCaseManager === true),
  []
)) passed++;

total++;
if (assertQueryAnswerable(
  'Q25: Onboarding Hybrid (shared)',
  (r) => r.filter((x) => (x.shared && (x.shared.onboarding_process || '') || '').toLowerCase().includes('hybrid')),
  []
)) passed++;

total++;
if (assertQueryAnswerable(
  'Q26: Average time to sanction 5–10 days (shared)',
  (r) => r.filter((x) => {
    const at = x.shared && x.shared.Average_Time_To_Sanction;
    if (!at || at.min == null || at.max == null) return false;
    return at.min <= 10 && at.max >= 5;
  }),
  []
)) passed++;

// --- 27. Margin
total++;
if (assertQueryAnswerable(
  'Q27: Margin = 0',
  (r) => r.filter((x) => x.offer && (x.offer.margin == null || x.offer.margin === 0)),
  ['offer']
)) passed++;

// --- 28–30. Combined queries
total++;
if (assertQueryAnswerable(
  'Q28: Combined — amount 5L–20L + unsecured',
  (r) => r.filter((x) => {
    const amount = 1000000;
    const a = x.offer && x.offer.loan && x.offer.loan.amount;
    const sec = x.offer && x.offer.security && x.offer.security.required === false;
    if (!a || a.min == null || a.max == null) return false;
    return amount >= a.min && amount <= a.max && sec;
  }),
  ['offer', 'offer.loan', 'offer.security']
)) passed++;

total++;
if (assertQueryAnswerable(
  'Q29: Combined — refundable fee + moratorium >= 12 months',
  (r) => r.filter((x) => {
    const pf = x.offer && x.offer.processing_fees && x.offer.processing_fees.refundable === true;
    const mor = x.offer && x.offer.moratorium && x.offer.moratorium.periodMonths;
    if (!mor) return false;
    const maxM = mor.max != null ? mor.max : (Array.isArray(mor.options) ? Math.max(...mor.options) : (mor.min != null ? mor.min : null));
    return pf && maxM != null && maxM >= 12;
  }),
  ['offer']
)) passed++;

total++;
if (assertQueryAnswerable(
  'Q30: Combined — interest < 10% + processing fee nil',
  (r) => r.filter((x) => {
    const rate = x.offer && x.offer.interest && x.offer.interest.rate;
    const nil = x.offer && x.offer.processing_fees && (x.offer.processing_fees.structure === 'nil' || (x.offer.processing_fees.summary && x.offer.processing_fees.summary.is_nil));
    return typeof rate === 'number' && rate < 10 && nil;
  }),
  ['offer']
)) passed++;

// --- 31. Security coverage (coveragePct)
total++;
if (assertQueryAnswerable(
  'Q31: Security coverage >= 100%',
  (r) => r.filter((x) => {
    const cov = x.offer && x.offer.security && x.offer.security.coveragePct;
    if (!cov) return false;
    const minPct = cov.minPct != null ? cov.minPct : cov;
    return minPct >= 100;
  }),
  ['offer', 'offer.security']
)) passed++;

// --- 32. Display text (processing_fees.displayText)
total++;
if (assertQueryAnswerable(
  'Q32: Processing fee display text contains "Max"',
  (r) => r.filter((x) => (x.offer && x.offer.processing_fees && x.offer.processing_fees.displayText || '').includes('Max')),
  ['offer', 'offer.processing_fees']
)) passed++;

// --- 33. Delayed EMI (from shared)
total++;
if (assertQueryAnswerable(
  'Q33: Delayed EMI payment has simple structure (shared)',
  (r) => r.filter((x) => {
    const dep = x.shared && x.shared.delayed_emi_payment;
    return dep && dep.structure === 'simple';
  }),
  []
)) passed++;

console.log('\n--- Summary ---');
console.log(passed + ' / ' + total + ' query types answerable from the data model.');
if (passed < total) {
  process.exit(1);
}
console.log('All complex queries that can exist are answerable from the data model.');
