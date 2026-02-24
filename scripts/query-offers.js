/**
 * Query bank offers using json-rules-engine.
 * Matches offers by gender, loan amount range, and security (secured/unsecured).
 */
import { Engine } from 'json-rules-engine';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BANKS_DIR = join(__dirname, '..', 'data', 'banks');

function getManifestSlugs() {
  const manifestPath = join(BANKS_DIR, 'manifest.json');
  if (!existsSync(manifestPath)) {
    throw new Error('manifest.json not found');
  }
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
  if (!Array.isArray(manifest)) {
    throw new Error('manifest.json must be an array of bank slugs');
  }
  return manifest;
}

/** Resolve bank JSON path. slug defaults to punjab-national-bank. */
function getBankPath(slug) {
  const safe = (slug && String(slug).trim()) || 'punjab-national-bank';
  return join(BANKS_DIR, safe + '.json');
}

/** Return common bank data from _keyTree.offers[0] for the table. */
export function getShared(bankSlug) {
  const path = getBankPath(bankSlug);
  const bankData = JSON.parse(readFileSync(path, 'utf-8'));
  const raw = (bankData._keyTree && Array.isArray(bankData._keyTree.offers) && bankData._keyTree.offers[0])
    ? bankData._keyTree.offers[0]
    : null;
  return raw ? JSON.parse(JSON.stringify(raw)) : null;
}

/**
 * Normalize gender string for comparison: "equal" -> "Equal", "male" -> "Male", "female" -> "Female".
 */
function normalizeGender(g) {
  if (g == null || typeof g !== 'string') return g;
  const s = g.trim();
  if (!s) return s;
  const lower = s.toLowerCase();
  if (lower === 'equal') return 'Equal';
  if (lower === 'male') return 'Male';
  if (lower === 'female') return 'Female';
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

/**
 * Build the matching rule for the given criteria.
 * Gender logic: show (1) offers that match the selected gender (Male/Female) and (2) offers with no
 * gender criteria (gender "Equal" applies to all). So when user selects Male, show Male + Equal offers;
 * when user selects Female, show Female + Equal offers.
 */
function buildRule() {
  return {
    conditions: {
      all: [
        // Gender: offer applies to user's gender OR "Equal" (no gender criteria – applies to all)
        {
          any: [
            { fact: 'offerGenderNorm', operator: 'equal', value: { fact: 'userGender' } },
            { fact: 'offerGenderNorm', operator: 'equal', value: 'Equal' }
          ]
        },
        // Amount within offer's loan range
        {
          fact: 'userAmount',
          operator: 'greaterThanInclusive',
          value: { fact: 'offer', path: '$.loan.amount.min' }
        },
        {
          fact: 'userAmount',
          operator: 'lessThanInclusive',
          value: { fact: 'offer', path: '$.loan.amount.max' }
        },
        // Security: secured = offer.security.required === true; unsecured = "No" or false
        {
          any: [
            {
              all: [
                { fact: 'userSecured', operator: 'equal', value: true },
                { fact: 'offer', path: '$.security.required', operator: 'equal', value: true }
              ]
            },
            {
              all: [
                { fact: 'userSecured', operator: 'equal', value: false },
                {
                  any: [
                    { fact: 'offer', path: '$.security.required', operator: 'equal', value: 'No' },
                    { fact: 'offer', path: '$.security.required', operator: 'equal', value: false }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    event: { type: 'offer-match', params: {} }
  };
}

/**
 * Query offers from the bank JSON file. Form inputs form the query; only matching rows are returned.
 * @param {Object} criteria - { gender, amount, secured, bank?: string (slug) }
 * @returns {Promise<{ dataFile: string, lender: Object, offers: Array }>}
 */
export async function queryOffers(criteria) {
  const bankSlug = (criteria.bank && String(criteria.bank).trim()) || 'punjab-national-bank';
  const bankPath = getBankPath(bankSlug);
  if (!existsSync(bankPath)) {
    throw new Error('Bank not found: ' + bankSlug);
  }
  const bankData = JSON.parse(readFileSync(bankPath, 'utf-8'));
  const offers = Array.isArray(bankData.offers) ? bankData.offers : [];
  const lender = bankData.lender || { name: '', sector: '' };
  const dataFileName = bankSlug + '.json';

  const userGender =
    typeof criteria.gender === 'string'
      ? criteria.gender.charAt(0).toUpperCase() + criteria.gender.slice(1).toLowerCase()
      : (criteria.gender || 'Male');
  const userAmount = Number(criteria.amount);
  const userSecured =
    criteria.secured === true ||
    criteria.secured === 'true' ||
    (typeof criteria.secured === 'string' && criteria.secured.toLowerCase() === 'secured');

  if (!Number.isFinite(userAmount) || userAmount < 0) {
    throw new Error('Invalid amount: must be a positive number');
  }

  const engine = new Engine([buildRule()]);
  const matched = [];
  for (let i = 0; i < offers.length; i++) {
    const offer = offers[i];
    const facts = {
      userGender,
      userAmount,
      userSecured,
      offer,
      offerGenderNorm: normalizeGender(offer.gender)
    };
    const { events } = await engine.run(facts);
    if (events.length > 0) {
      matched.push({ ...offer, _index: i + 1 });
    }
  }

  const rawShared = (bankData._keyTree && Array.isArray(bankData._keyTree.offers) && bankData._keyTree.offers[0])
    ? bankData._keyTree.offers[0]
    : null;
  const rawKeyTreeLender = (bankData._keyTree && bankData._keyTree.lender && typeof bankData._keyTree.lender === 'object')
    ? bankData._keyTree.lender
    : null;
  const shared = rawShared ? JSON.parse(JSON.stringify(rawShared)) : null;
  const keyTreeLender = rawKeyTreeLender ? JSON.parse(JSON.stringify(rawKeyTreeLender)) : null;
  const bankSector = (keyTreeLender && keyTreeLender.sector) ? String(keyTreeLender.sector) : '';

  return {
    dataFile: dataFileName,
    lender,
    secured: userSecured,
    keyTreeLender,
    bankSector,
    shared,
    offers: matched
  };
}

/**
 * Query all banks with the same criteria. Returns one row per matching offer, each with bank name and that bank's shared data.
 * @param {Object} criteria - { gender, amount, secured }
 * @returns {Promise<{ secured: boolean, rows: Array<{ bankName: string, sector: string, bankSlug: string, shared: object, offer: object }> }>}
 */
export async function queryAllBanks(criteria) {
  const manifest = getManifestSlugs();
  const rows = [];
  const errors = [];
  for (const slug of manifest) {
    try {
      const result = await queryOffers({ ...criteria, bank: slug });
      const bankName = (result.lender && result.lender.name) || slug;
      const sector = result.bankSector || 'N/A';
      for (const offer of result.offers || []) {
        rows.push({
          bankName,
          sector,
          bankSlug: slug,
          shared: result.shared || null,
          offer
        });
      }
    } catch (error) {
      errors.push({
        bankSlug: slug,
        error: error && error.message ? String(error.message) : 'Unknown error'
      });
    }
  }
  return {
    secured: criteria.secured === true || criteria.secured === 'true' || (typeof criteria.secured === 'string' && criteria.secured.toLowerCase() === 'secured'),
    rows,
    errors
  };
}

/**
 * Validate that every bank in manifest can be executed through json-rules-engine.
 * Runs two probes per bank (secured + unsecured) so each file is exercised via queryOffers.
 */
export async function validateAllBanksWithRulesEngine() {
  const manifest = getManifestSlugs();
  const failures = [];

  for (const slug of manifest) {
    try {
      await queryOffers({ bank: slug, gender: 'Male', amount: 7000000, secured: true });
      await queryOffers({ bank: slug, gender: 'Female', amount: 7000000, secured: false });
    } catch (error) {
      failures.push({
        bankSlug: slug,
        error: error && error.message ? String(error.message) : 'Unknown error'
      });
    }
  }

  return {
    totalBanks: manifest.length,
    passedBanks: manifest.length - failures.length,
    failedBanks: failures.length,
    failures
  };
}

/**
 * CLI: node scripts/query-offers.js [gender] [amount] [secured] [bankSlug]
 * e.g. node scripts/query-offers.js male 7000000 secured punjab-national-bank
 */
async function main() {
  const args = process.argv.slice(2);
  const gender = args[0] || 'Male';
  const amount = args[1] || '7000000';
  const securedArg = (args[2] || 'secured').toLowerCase();
  const secured = securedArg === 'secured' || securedArg === 'yes' || securedArg === 'true';
  const bank = args[3] || 'punjab-national-bank';

  const result = await queryOffers({ gender, amount: Number(amount), secured, bank });
  console.log(JSON.stringify(result, null, 2));
}

const isCli = typeof process !== 'undefined' && process.argv[1] && process.argv[1].includes('query-offers');
if (isCli) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
