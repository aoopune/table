# Loan Comparison Table vs CSV – Test Report

**Source of truth:** [data/loan-data-abroad.csv](data/loan-data-abroad.csv)  
**Table app:** Open [index.html](index.html) in a browser **over HTTP** (see below).

---

## Prerequisite: Use a local server

The table loads the CSV via `fetch()`. Browsers block `fetch()` on `file://` URLs, so **do not** double-click `index.html`. Use one of:

- From the Table folder: `npx serve` then open the URL shown (e.g. http://localhost:3000)
- VS Code / Cursor: “Live Server” extension, then “Open with Live Server” on index.html

---

## 1. Row count

**Expected (from CSV):** **38** data rows (rows after the “Info button data” row).

**How to verify:** With the app open over HTTP, in the browser console run:

```js
(window.TABLE_DATA || []).length
```

Or count rows in the table: `document.querySelectorAll('#tableBody tr').length`

**Result:**

| Check | Result |
|-------|--------|
| Row count match | _Yes / No_ |
| CSV data rows | 38 |
| Table rows | _fill after checking_ |

---

## 2. Sample rows (first, middle, last)

**Expected (from CSV, same parsing as loader):**

| Position | Row index | Lender |
|----------|-----------|--------|
| First | 0 | State Bank of India |
| Middle | 19 | Poonawalla Fincorp |
| Last | 37 | Jammu & Kashmir Bank |

**How to verify:** Paste and run the contents of [scripts/browser-compare-snippet.js](scripts/browser-compare-snippet.js) in the browser console while the table page is open. It will log whether the first/middle/last lenders match and any field mismatches.

**Result:**

| Check | Result |
|-------|--------|
| Sample rows match | _Yes / No_ |
| Rows checked | First (State Bank of India), middle (Poonawalla Fincorp), last (Jammu & Kashmir Bank) |
| Any column/value that didn’t match | _list or “None”_ |

---

## 3. Columns

**Expected columns (from [table-config.js](data/table-config.js)):** Lender, Sector, Select, Nationality, Age (in years), Qualification, Co-applicant, University Strictness, Interest rate (in % p.a. onwards), Type of interest rate, Margin, Processing fees, Refundable Processing fees, Repayment Tenure, Moratorium period, Payment during moratorium, Delayed EMI payment Per month, Avg. Time to Sanction (Business Days), Dedicated Case Manager, Onboarding process.

**How to verify:** Visually confirm every column has a header and that values look correct (e.g. lender names in column 1, numbers/percentages in rate/fee columns).

**Result:**

| Check | Result |
|-------|--------|
| Columns | _All present / list any missing or wrong_ |

---

## 4. Filters

**How to verify:** Apply a filter (e.g. Sector = “Public bank”) or a sort (e.g. Lender A–Z). Check that the number of visible rows matches the CSV rows that satisfy the same condition, and that a couple of visible rows still match the CSV.

**Result:**

| Check | Result |
|-------|--------|
| Filters tested | _Yes / No_ |
| Mismatch | _describe or “None”_ |

---

## 5. Console errors

With the table open over HTTP, open DevTools → Console. Note any red errors.

**Result:**

| Check | Result |
|-------|--------|
| Console errors | _None / list errors_ |

---

## 6. Summary – what’s wrong (if anything)

Short list of issues found, or “All checks passed.”

- (1) _e.g. Row count mismatch: table shows 60, CSV has 38_
- (2) _e.g. Opening index.html by double-click doesn’t load CSV; need a local server_
- _…_

---

## Report back (short form)

Use this when reporting results:

| Item | What to report |
|------|----------------|
| **Row count** | “Row count match: Yes/No.” CSV data rows = 38, table rows = _._ |
| **Sample rows** | “Sample rows match: Yes/No.” Rows checked: first, middle, last. Any column/value that didn’t match: _._ |
| **Columns** | “Columns: all present” or list missing/wrong. |
| **Filters** | “Filters: tested Yes/No.” Any mismatch: _._ |
| **Console** | “Console errors: None” or list errors. |
| **Summary** | Short “what’s wrong” list, or “All checks passed.” |

---

## Scripts used

- **Expected row count and sample rows:** Run `node scripts/test-table-vs-csv.js` from the project root. Output is JSON with `csvDataRowCount` and `sampleRows` (first/middle/last).
- **Browser comparison:** Paste [scripts/browser-compare-snippet.js](scripts/browser-compare-snippet.js) into the console on the table page (over HTTP) to compare `window.TABLE_DATA` to the CSV and log a short report.
