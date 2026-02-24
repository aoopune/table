# Data & Architecture – Loan Comparison Table (Handoff Doc)

Use this document when handing off to another agent or when context is full. It describes how the three Google Sheet tabs drive the app and how to test bank-by-bank.

**Canonical key/mapping reference:** `docs/MAPPINGS_AND_KEYS_REFERENCE.md` (use this before changing any key, mapping, or loader behavior).

---

## 1. Source of truth (Google Sheet)

**Spreadsheet:** [ApplyOnlyOnce - Loan Data](https://docs.google.com/spreadsheets/d/1eaYl0tfAiTR4AcAaBfqemsbMX8QFcX_yQZOQcD2kW7g)

| Sheet | Purpose | How the app uses it |
|-------|---------|---------------------|
| **Numerical_data_abroad** | Per-offer numerical data (loan bands, gender, security, interest rate, margin, fees, tenure, moratorium, level of study, institute criteria, etc.) | Exported/generated into **one JSON file per bank** in `data/banks/*.json`. Each file has `{ "lender": "Bank Name", "offers": [ ... ] }`. |
| **Static_data_abroad** | One row per bank: sector, nationality, age, qualification, co-applicant, university strictness, delayed EMI, time to sanction, case manager, onboarding. Same columns as the comparison table’s “static” columns. | Loaded by **`data/static-data-loader.js`** from CSV (or sheet export). Stored as **`window.STATIC_DATA_BY_LENDER`** (lender name → object of static fields). Merged into each offer row in the table so static columns are filled. |
| **institutes_abroad_standardized** | Lender–University–Country–Criteria mapping (which banks support which universities in which countries). | Exported/generated into **`data/institutes.json`**. Loaded by **`data/bank-loader.js`** into **`window.INSTITUTES`**. Used for **Country** and **University** dropdowns and to filter which banks appear when user selects a country or university. |

---

## 2. Bank JSON + institutes = all possible queries

**Each bank’s JSON file (together with `institutes.json`) is the single source for every query the app supports.** No query depends on data outside the bank JSONs and institutes.

| Query (input) | Source | Field(s) / logic |
|---------------|--------|-------------------|
| **Gender** (Male / Female) | Bank JSON, each offer | `gender`: `"Male"`, `"Female"`, or `"Equal"`. Row is kept if `gender === query.gender \|\| gender === 'Equal'`. |
| **Loan amount** (₹) | Bank JSON, each offer | `minLoan`, `maxLoan`. Row is kept if `query.loanAmount` is between min and max. |
| **Security type** (Secured / Unsecured) | Bank JSON, each offer | `security`: `"Yes"` (Secured) or `"No"` (Unsecured). Filter compares to `query.security`. |
| **Level of education** | Bank JSON, each offer | `levelOfStudy`. Filter: row is kept if it matches or contains `query.levelOfStudy`. |
| **Country** | institutes.json | `INSTITUTES`: `lenderName`, `country`. Row is kept if lender has at least one institute in `query.country`. |
| **University** | Bank JSON + institutes.json | Offer: `instituteWiseChanges` (`"yes"`/`"no"`), `instituteCriteria`. If `instituteWiseChanges === 'yes'`, row is kept only if **lenderHasUniversity(lender, query.university, row.instituteCriteria)** using `INSTITUTES` (lenderName, university, criteria). |

**Implication for bank JSONs:** Every offer in `data/banks/<slug>.json` must include the fields used by these filters so that any combination of the above queries can be applied. The test suite checks that each bank’s offers have the required fields (see section 7 and **query-fields** test).

---

## 3. Script load order (`index.html`)

```html
<script src="data/table-config.js"></script>
<script src="app.js"></script>
<script src="data/loan-data-inline.js"></script>
<script src="data/static-data-loader.js"></script>
<script src="data/bank-loader.js"></script>
<script src="data/loan-data-loader.js"></script>
```

- **table-config.js** – Defines `TABLE_CONFIG` (column groups and column ids). Subheader labels match Static_data_abroad.
- **app.js** – Table logic, filters, sort, query inputs, `getSourceRows`, `getViewRows`, `mergeStaticIntoRows`, `applyQueryToOffers`, `rebuildTable`, `populateQueryDropdowns`.
- **loan-data-inline.js** – Sets `window.TABLE_DATA` with 38 banks as **fallback** when bank JSONs cannot be loaded (e.g. no server).
- **static-data-loader.js** – Fetches Static_data_abroad (CSV or sheet export), parses, builds **`window.STATIC_DATA_BY_LENDER`**, applies column tooltips to `TABLE_CONFIG`, calls `rebuildTable()` when done.
- **bank-loader.js** – Fetches `data/banks/manifest.json` and `data/institutes.json`; then fetches each `data/banks/<slug>.json`, flattens all `offers` into **`window.LOAN_OFFERS`**, sets **`window.INSTITUTES`**, calls `populateQueryDropdowns()` and `rebuildTable()`.
- **loan-data-loader.js** – Fetches same Static CSV/sheet; sets **`window.TABLE_DATA`** and tooltips; calls `rebuildTable()`. Used as fallback when bank-loader doesn’t run or fails; table still prefers `LOAN_OFFERS` when present.

---

## 4. Data flow (how the table gets its rows)

1. **Source rows**  
   **`getSourceRows()`** (in `app.js`):
   - If **`window.LOAN_OFFERS`** exists and has length > 0 → use **`LOAN_OFFERS`** (from bank JSONs).
   - Else if **`window.TABLE_DATA`** exists and has length > 0 → use **`TABLE_DATA`** (inline or from loan-data-loader).
   - Else → **`getDefaultTestRows()`**.

2. **Query filtering**  
   **`getViewRows()`**:
   - Takes source rows.
   - If in “offer mode” (rows have `minLoan`, `maxLoan`, `gender`) and any query is set → **`applyQueryToOffers(rows, tableState.query)`**:
     - **Country** → keep only rows where **`lenderHasCountry(row.lender, query.country)`** (lender has at least one institute in `INSTITUTES` with that country).
     - **Loan amount** → keep rows where amount is between `minLoan` and `maxLoan`.
     - **Security** (Secured/Unsecured) → filter by `row.security === 'Yes'/'No'`.
     - **Level of study** → filter by `row.levelOfStudy`.
     - **University** → keep rows where **`lenderHasUniversity(row.lender, query.university, row.instituteCriteria)`** (for rows with `instituteWiseChanges === 'yes'`).
     - **Gender** (Male/Female) → keep `gender === query.gender || gender === 'Equal'`, then sort so matching gender first.
   - Dedupe by lender when in offer mode (one row per lender when no filters, or after filters).
   - **`mergeStaticIntoRows(rows)`** → for each row, if **`window.STATIC_DATA_BY_LENDER[row.lender]`** exists, fill in any **empty** display fields (sector, nationality, age, qualification, coApplicant, universityStrictness, delayedEmiPayment, avgTimeToSanction, dedicatedCaseManager, onboardingProcess, etc.) from that object.
   - Apply **sort** (`tableState.sortBy`, `tableState.sortDir`).
   - Apply **column filters** (`tableState.filters`).
   - Return the final rows for the table body.

3. **Table columns**  
   Defined in **`data/table-config.js`** in **`TABLE_CONFIG.columnGroups`**. Column ids include: `lender`, `sector`, `select`, `nationality`, `age`, `qualification`, `coApplicant`, `universityStrictness`, `interestRate`, `typeOfInterestRate`, `margin`, `processingFees`, `refundableProcessingFees`, `repaymentTenure`, `moratoriumPeriod`, `paymentDuringMoratorium`, `delayedEmiPayment`, `avgTimeToSanction`, `dedicatedCaseManager`, `onboardingProcess`.

---

## 5. Key files (quick reference)

| File | Role |
|------|------|
| **data/table-config.js** | Column groups and column ids; labels match Static_data_abroad. |
| **app.js** | `getSourceRows`, `getViewRows`, `mergeStaticIntoRows`, `applyQueryToOffers`, `lenderHasUniversity`, `lenderHasCountry`, sort/filter, render, query input bindings, `populateQueryDropdowns`. |
| **data/bank-loader.js** | Loads manifest + all bank JSONs → `LOAN_OFFERS`; loads institutes.json → `INSTITUTES`. |
| **data/static-data-loader.js** | Loads Static_data_abroad CSV → `STATIC_DATA_BY_LENDER`; applies tooltips; calls `rebuildTable()`. |
| **data/loan-data-loader.js** | Loads same Static CSV → `TABLE_DATA` + tooltips (fallback when no bank JSONs). |
| **data/loan-data-inline.js** | Fallback `TABLE_DATA` (38 banks) when no server. |
| **data/banks/manifest.json** | Array of bank slugs (e.g. `["bank-of-india", "state-bank-of-india", ...]`). |
| **data/banks/<slug>.json** | `{ "lender": "Display Name", "offers": [ { minLoan, maxLoan, gender, security, interestRate, ... } ] }`. |
| **data/institutes.json** | `[ { lenderName, university, country, criteria }, ... ]`. |
| **data/loan-data-abroad.csv** | Static_data_abroad export (fallback for static + TABLE_DATA). Row 0–1 headers, row 2 column headers, row 3 info/tooltips, row 4+ data. |

---

## 6. CSV → static column mapping (Static_data_abroad)

Used by **static-data-loader.js** and **loan-data-loader.js**. CSV column index → table column id:

- 0: lender  
- 2: sector  
- 3: interestRate, 4: typeOfInterestRate, 5: margin, 6: processingFees, 7: refundableProcessingFees  
- 8: repaymentTenure, 9: moratoriumPeriod, 10: paymentDuringMoratorium, 11: delayedEmiPayment  
- 12: nationality, 13: age, 14: qualification, 15: coApplicant, 16: universityStrictness  
- 17: avgTimeToSanction, 18: dedicatedCaseManager, 19: onboardingProcess  

(Column 1 is “Link” and is not used in the table.)

---

## 7. Regenerating data from the sheet

- **Numerical_data_abroad** → Run **`scripts/generate-bank-json.js`** (with CSV path for Numerical data) to regenerate **`data/banks/*.json`** and **`data/banks/manifest.json`**.
- **institutes_abroad_standardized** → Same or separate script to regenerate **`data/institutes.json`** from the institutes sheet/CSV.
- **Static_data_abroad** → Export the sheet as CSV and replace **`data/loan-data-abroad.csv`**, or point **static-data-loader.js** / **loan-data-loader.js** at the sheet’s CSV export URL (subject to CORS).

---

## 8. Tests (bank-by-bank and table correctness)

- **Location:** **`scripts/test-banks-table.js`**
- **Run (from Table folder):**  
  `node scripts/test-banks-table.js`
- **List of tests:**

| # | Test id(s) | What is checked |
|---|------------|------------------|
| 1 | `manifest` | `data/banks/manifest.json` exists and is a non-empty array of slugs. |
| 2 | `bank-<slug>` (one per bank) | For each slug, `data/banks/<slug>.json` exists; has non-empty `lender`; has `offers` array with at least one offer; each offer has `minLoan`, `maxLoan`, `gender`, and at least one of `interestRate` or `typeOfInterestRate`. |
| 3 | `static-csv` | `data/loan-data-abroad.csv` parses and yields a non-empty **STATIC_DATA_BY_LENDER** (same logic as static-data-loader). |
| 4 | `merge-<slug>` (one per bank) | For each bank, at least one offer exists; after merging that offer with **STATIC_DATA_BY_LENDER**, the row has `lender`; and if static has that lender with a sector, the merged row has `sector`. |
| 5 | `institutes` | `data/institutes.json` exists and is an array. |
| 6 | `table-cols` | A sample merged row has the table column ids from **table-config** (at least some columns populated). |
| 7 | `query-fields-<slug>` | Each bank’s offers include the fields required for **all possible queries**: `gender`, `minLoan`, `maxLoan`, `security`, `levelOfStudy`. If any offer has `instituteWiseChanges === 'yes'`, it must have `instituteCriteria` (so University filter can run). |

- **Output:** `Passed: N`, `Failed: M`, and per-failure lines `[testId] message`. Exit code 1 if any failure.
- Use this to verify **bank by bank** that the table can show correct data when LOAN_OFFERS + STATIC_DATA_BY_LENDER are used.

---

## 9. Handoff checklist for another agent

- [ ] Table is driven by **LOAN_OFFERS** (bank JSONs) when available; **TABLE_DATA** is fallback.
- [ ] **Static_data_abroad** is in **STATIC_DATA_BY_LENDER** and merged in **getViewRows** via **mergeStaticIntoRows**.
- [ ] **Country** and **University** filters use **INSTITUTES**; **lenderHasCountry** and **lenderHasUniversity** in **app.js**.
- [ ] Script order in **index.html** is as in section 2.
- [ ] Bank-by-bank and table correctness are verified by **`node scripts/test-banks-table.js`** (see section 7 and the test file itself).
