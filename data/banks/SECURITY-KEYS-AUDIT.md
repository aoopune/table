# Security keys audit – per bank, per offer

**Standard:** Each offer’s `security` should have:
- `required` (boolean): `true` = secured, `false` = unsecured  
- `coverageDisplay` (string): e.g. `"None"`, `"≥100%"`, `"50%–<100%"`  
- `coveragePct` (object or null): `{ "minPct": number, "maxPct": number | null }` for secured; `null` for unsecured  

**Correct:** All three keys present; `required` matches coverage; types correct (no string `"No"`/`"Yes"`); `coveragePct` uses `minPct`/`maxPct` not `min`/`max`.

**Incorrect:** Missing `coverageDisplay`/`coveragePct`; only legacy `weightage`; wrong type for `required`; wrong keys in `coveragePct`.

*Last run: script `check-security-keys.cjs` over all bank JSONs (excl. schema/manifest).*

---

## Banks with ALL offers CORRECT (37 files)

| Bank file |
|-----------|
| aditya-birla-capital.json |
| auxilo.json |
| avanse.json |
| axis-bank.json |
| bank-of-baroda.json |
| bank-of-india.json |
| bank-of-maharashtra.json |
| canara-bank.json |
| city-union-bank.json |
| credila.json |
| dcb-bank.json |
| dhanlaxmi-bank.json |
| edgro.json |
| federal-bank.json |
| icici-bank.json |
| idbi-bank.json |
| idfc-first-bank.json |
| incred.json |
| indian-overseas-bank.json |
| jammu--kashmir-bank.json |
| jammu-and-kashmir-grameen-bank.json |
| karnataka-bank.json |
| karur-vyasa-bank.json |
| leap-finance.json |
| mpower.json |
| nainital-bank.json |
| poonawalla-fincorp.json |
| prodigy.json |
| rbl-bank.json |
| saraswat-co-operative-bank.json |
| south-indian-bank.json |
| state-bank-of-india.json |
| tamilnad-mercantile-bank.json |
| tata-capital.json |
| uco-bank.json |
| union-bank-of-india.json |
| yes-bank.json |

---

## Banks with one or more INCORRECT offers (2 files)

### 1. punjab-national-bank-relational-example.json  
**45 incorrect of 45 offers**

| Offers | Issue |
|--------|--------|
| 0–26 (secured) | Only `weightage`; missing `coverageDisplay` and `coveragePct`. |
| 27–44 (unsecured) | `required` is string `"No"` (must be boolean `false`); only `weightage`; missing `coverageDisplay` and `coveragePct`. |

**Fix:** For every offer add `coverageDisplay` and `coveragePct` (secured: e.g. `"≥100%"` + minPct/maxPct; unsecured: `"None"` + null). For unsecured, set `required` to boolean `false`.

---

### 2. punjab-national-bank.json  
**26 incorrect of 45 offers**

| Offers | Loan bands | Issue |
|--------|------------|--------|
| 0–22 | Various (1–400000, 400001–750000, 750001–99999999) | Only `weightage`; missing `coverageDisplay` and `coveragePct`. |
| 24, 25, 26 | 1–400000, 400001–750000, 750001–99999999 | Same. |

**Fix:** For these 26 offers add `coverageDisplay` and `coveragePct` (e.g. secured: `"≥100%"`, `{ "minPct": 100, "maxPct": null }` or per product). Offers 23 and 27–44 already have correct security keys.

---

## Quick reference

| File | Incorrect count | Action |
|------|-----------------|--------|
| punjab-national-bank-relational-example.json | 45 | Add coverageDisplay + coveragePct to all; fix `required` to boolean for unsecured. |
| punjab-national-bank.json | 26 | Add coverageDisplay + coveragePct to offers 0–22, 24–26. |

To re-check: run `node check-security-keys.cjs` from `data/banks`.
