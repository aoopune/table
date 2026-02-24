# Master Mappings & Key Reference

This is the single source of truth for mappings, key behavior, and change-safe rules.

Use this before changing any data key, column id, loader, or query condition.

---

## 1) Data source priority (runtime)

`app.js` (`getSourceRows`) uses this order:

1. `window.LOAN_OFFERS` (from `data/bank-loader.js`)  
2. `window.TABLE_DATA` (from inline/CSV loaders)  
3. `getDefaultTestRows()` (blank rows)

### Why this matters
- If bank JSON data exists, it always wins.
- CSV/static data still enriches display fields via merge logic.
- Table never breaks even when APIs/files are unavailable.

---

## 2) Script-level mapping (who sets what)

| Script | Inputs | Output globals | Main purpose |
|---|---|---|---|
| `data/table-config.js` | static config | `TABLE_CONFIG` | Defines table groups/columns/order/types/sticky behavior. |
| `app.js` | `TABLE_CONFIG`, globals | `window.renderTableBody`, `window.rebuildTable`, `window.populateQueryDropdowns` | Render engine, sorting, filters, query application. |
| `data/loan-data-inline.js` | inline JS | `TABLE_DATA` | Fallback table rows when remote loading is unavailable. |
| `data/static-data-loader.js` | static CSV/sheet | `STATIC_DATA_BY_LENDER` (+ tooltips on config) | Static lender attributes + tooltip text. |
| `data/bank-loader.js` | `manifest.json`, bank JSONs, `institutes.json` | `LOAN_OFFERS`, `INSTITUTES` | Main offer-mode data and institute mappings. |
| `data/loan-data-loader.js` | static CSV/sheet | `TABLE_DATA` (+ tooltips) | Secondary CSV fallback loader. |

---

## 3) CSV index to app key mapping

Used in both `data/static-data-loader.js` and `data/loan-data-loader.js`.

| CSV index | App key | Feature/use |
|---|---|---|
| 0 | `lender` | Primary row identity / merge key. |
| 2 | `sector` | Sector column value. |
| 3 | `interestRate` | Loan feature display. |
| 4 | `typeOfInterestRate` | Loan feature display. |
| 5 | `margin` | Loan feature display. |
| 6 | `processingFees` | Loan feature display. |
| 7 | `refundableProcessingFees` | Loan feature display. |
| 8 | `repaymentTenure` | Loan feature display. |
| 9 | `moratoriumPeriod` | Loan feature display. |
| 10 | `paymentDuringMoratorium` | Loan feature display. |
| 11 | `delayedEmiPayment` | Loan feature display. |
| 12 | `nationality` | Eligibility display. |
| 13 | `age` | Eligibility display. |
| 14 | `qualification` | Eligibility display. |
| 15 | `coApplicant` | Eligibility display. |
| 16 | `universityStrictness` | Eligibility display. |
| 17 | `avgTimeToSanction` | Customer service display. |
| 18 | `dedicatedCaseManager` | Customer service display. |
| 19 | `onboardingProcess` | Customer service display. |

Notes:
- CSV index `1` (Link) is intentionally unused.
- CSV info row (tooltip row) uses the same index mapping.

---

## 4) Flat offer key mapping (`bank-loader.js` flatten)

`data/bank-loader.js` flattens nested bank offer JSON into a table-ready row shape.

| Flat key | Derived from | Feature/use |
|---|---|---|
| `gender` | `offer.gender` | Query: gender matching (`Male/Female/Equal`). |
| `minLoan` | `offer.loan.amount.min` | Query: loan amount lower bound. |
| `maxLoan` | `offer.loan.amount.max` | Query: loan amount upper bound. |
| `security` | `offer.security.required` | Query: secured/unsecured (`Yes/No`). |
| `securityWeightage` | `offer.security.weightage` | Display-only, normalized text/percent range. |
| `others` | `offer.coapplicant` | Additional condition text. |
| `interestRate` | `offer.interest.rate` | Loan feature display. |
| `typeOfInterestRate` | `offer.interest.type` | Loan feature display. |
| `margin` | `offer.margin` | Loan feature display (`99` normalized to `N/A`). |
| `processingFees` | currently blank in flatten | Reserved display key (filled from static when available). |
| `refundableProcessingFees` | currently blank in flatten | Reserved display key (filled from static when available). |
| `repaymentTenure` | `offer.repayment_tenure` | Loan feature display. |
| `moratoriumPeriod` | currently blank in flatten | Reserved display key. |
| `paymentDuringMoratorium` | currently blank in flatten | Reserved display key. |
| `levelOfStudy` | `offer.institute.level_of_study` or `offer.course` | Query: level filtering. |
| `course` | `offer.course` | University match can override this for selected institute. |
| `instituteWiseChanges` | `offer.institute.changes` | Query branch: strict university matching when `Yes`. |
| `instituteCriteria` | `offer.institute.criteria` | Query: criteria matching with institutes rows. |
| `lender` | file-level lender name | Primary key for dedupe/merge/institute lookup. |
| `sector` | file-level lender sector | Display (can be overwritten by static merge if empty). |
| `delayedEmiPayment` | `_keyTree.offers[0].delayed_emi_payment.displayText` | Static/shared display. |
| `nationality` | `_keyTree.offers[0].nationality` | Eligibility display. |
| `age` | `_keyTree.offers[0].age.{min,max}` | Eligibility display; string formatted as ranges. |
| `qualification` | `_keyTree.offers[0].qualification` | Eligibility display. |
| `coApplicant` | `_keyTree.offers[0].coApplicant` | Eligibility display. |
| `universityStrictness` | `_keyTree.offers[0].universityStrictness` | Eligibility display. |
| `avgTimeToSanction` | `_keyTree.offers[0].Average_Time_To_Sanction` | Customer service display. |
| `dedicatedCaseManager` | `_keyTree.offers[0].dedicatedCaseManager` | Customer service display (`Yes/No`). |
| `onboardingProcess` | `_keyTree.offers[0].onboarding_process` | Customer service display. |
| `select` | default false | UI checkbox state. |

---

## 5) Table column key catalog (`TABLE_CONFIG`)

These are the display column IDs and their UI behavior.

| Group | Key | Label | Type | Sticky | Notes |
|---|---|---|---|---|---|
| Sector | `lender` | Lender | text | Yes | Primary visible identifier. |
| Sector | `sector` | Sector | text | Yes | Lender segment/group. |
| Sector | `select` | Select | checkbox | Yes | Row select; excluded from filter panel. |
| Eligibility criteria | `nationality` | Nationality | text | No | Can be from static merge. |
| Eligibility criteria | `age` | Age (in years) | text | No | String/range representation. |
| Eligibility criteria | `qualification` | Qualification | text | No | Eligibility descriptor. |
| Eligibility criteria | `universityStrictness` | University Strictness | text | No | Eligibility policy descriptor. |
| Loan features | `interestRate` | Interest rate(in % p.a. onwards) | text | No | Display + sortable/filterable. |
| Loan features | `typeOfInterestRate` | Type of interest rate | text | No | Display + sortable/filterable. |
| Loan features | `margin` | Margin(in % of loan amount) | text | No | Display + sortable/filterable. |
| Loan features | `processingFees` | Processing fees(Max. % of loan amount) | text | No | Display + sortable/filterable. |
| Loan features | `refundableProcessingFees` | Refundable Processing fees | text | No | Display + sortable/filterable. |
| Loan features | `repaymentTenure` | Repayment Tenure(Max. in years) | text | No | Display + sortable/filterable. |
| Loan features | `moratoriumPeriod` | Moratorium period(course period plus) | text | No | Display + sortable/filterable. |
| Loan features | `paymentDuringMoratorium` | Payment during moratorium | text | No | Display + sortable/filterable. |
| Loan features | `delayedEmiPayment` | Delayed EMI payment Per month | text | No | Display + sortable/filterable. |
| Customer service | `avgTimeToSanction` | Avg. Time to Sanction(Business Days) | text | No | Display + sortable/filterable. |
| Customer service | `dedicatedCaseManager` | Dedicated Case Manager | text | No | Display + sortable/filterable. |
| Customer service | `onboardingProcess` | Onboarding process | text | No | Display + sortable/filterable. |

---

## 6) Query keys and behavior map (`tableState.query`)

| Query key | Input source | Matching behavior |
|---|---|---|
| `gender` | gender buttons | Keep rows where `row.gender === selected` or `row.gender === 'Equal'`. |
| `loanAmount` | amount input | Keep rows where selected amount is between `minLoan` and `maxLoan` (`99999999` treated as Infinity). |
| `security` | secured/unsecured buttons | `Secured` => `row.security === 'yes'`; `Unsecured` => `row.security === 'no'`. |
| `levelOfStudy` | level dropdown | Case-insensitive exact/substring match on `row.levelOfStudy` (or `course`). |
| `country` | country dropdown | Keep lenders present in `INSTITUTES` for selected country. |
| `university` | university dropdown | If `instituteWiseChanges === 'yes'`, requires lender+university+criteria match in `INSTITUTES`. |

---

## 7) Filter engine keys (`tableState.filters`)

Per column key, filter can be one of:

- Condition mode:
  - `{ type: 'condition', op: <operator>, value: <text> }`
- Values mode:
  - `{ type: 'values', selectedValues: { "<value>": true, ... } }`

Supported operators:
- `none`, `is_empty`, `is_not_empty`, `contains`, `not_contains`, `starts_with`, `ends_with`, `equals`, `greater`, `greater_eq`, `less`, `less_eq`, `not_equals`, `between`, `not_between`.

---

## 8) Merge/fallback feature mapping

`getViewRows()` applies this pipeline:

1. Get source rows (`LOAN_OFFERS` / `TABLE_DATA` / defaults)
2. Apply query filters when in offer mode
3. Dedupe by lender (offer mode)
4. Apply sort (`tableState.sortBy`, `tableState.sortDir`)
5. Apply per-column filters (`tableState.filters`)

Feature result:
- Table is always renderable.
- Same UI works with JSON, CSV, or fallback rows.
- Changes to source data do not require renderer rewrite.

---

## 9) Key change protocol (mandatory)

When adding/removing/renaming any key:

1. Update key in `data/table-config.js` (if it is a column key).
2. Update source mapping (`bank-loader.js` and/or CSV loaders).
3. Update this document section 3/4/5/6 as needed.
4. Update related docs:
   - `AUDIT_TRAIL.md`
   - `docs/DATA_AND_ARCHITECTURE.md`
   - `docs/BANK_JSON_DATA_MODEL.md` (if bank schema changed)
5. Validate by running table and key checks:
   - `node scripts/test-banks-table.js`

---

## 10) Fast lookup (where to edit)

- Column labels/order/sticky/type: `data/table-config.js`
- Query behavior: `app.js` (`applyQueryToOffers`)
- Filter behavior: `app.js` (`applyFilters`, `matchesCondition`)
- JSON flatten mapping: `data/bank-loader.js` (`flattenOffer`)
- Static CSV mapping and tooltips: `data/static-data-loader.js`, `data/loan-data-loader.js`
- Bank-level schema details: `docs/BANK_JSON_DATA_MODEL.md`
- End-to-end architecture: `docs/DATA_AND_ARCHITECTURE.md`
- Change log history: `AUDIT_TRAIL.md`
