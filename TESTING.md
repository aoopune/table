# Testing the Loan Comparison Table

All table functions are covered by two test suites.

---

## 1. Logic tests (Node)

Tests **sort**, **filter conditions**, **filter by values**, and **CSV parsing** (no browser).

**Run:**
```bash
cd "c:\Users\Yash Jangid\Desktop\Table"
node scripts/test-table-logic.js
```

**What is tested:**
- **matchesCondition** – all 16 operators: `none`, `is_empty`, `is_not_empty`, `contains`, `not_contains`, `starts_with`, `ends_with`, `equals`, `greater`, `greater_eq`, `less`, `less_eq`, `not_equals`, `between`, `not_between`
- **sortRows** – ascending/descending for text and numeric columns
- **applyFilters** – condition filter (equals, contains), values filter, multiple columns
- **CSV** – parse and `buildTableDataFromRows`: row count (38), first/last row lender and sector

**Expected:** `Logic tests: 34 passed, 0 failed` and exit code 0.

---

## 2. UI / integration tests (browser)

Tests the full table UI and behaviour in the browser.

**Run:**
1. Open **test.html** in your browser (double‑click or open from the Table folder).
2. Wait a few seconds for the table to load and tests to run.
3. Check the **results** section below the iframe.

**What is tested:**

| # | Area | Checks |
|---|------|--------|
| 1 | Data and structure | `TABLE_DATA` array and length, table body row count, header column count, column count vs config |
| 2 | Sort | Open lender filter → Sort A–Z → check first/last order; Sort Z–A → check order |
| 3 | Filter by condition | Sector = "Public bank" → all visible rows have Sector "Public bank" |
| 4 | Filter by values | Filter by value "Private bank" → at least one row has Sector "Private bank" |
| 5 | Clear filter | Clear filter → row count back to full data length |
| 6 | Select-all | Select all → all row checkboxes checked; Deselect all → none checked |
| 7 | Info popover | Click info icon → popover visible; click close → popover hidden |
| 8 | Scroll sync | Scroll body horizontally → header `scrollLeft` matches body |
| 9 | Filter panel + Escape | Open filter panel → visible; press Escape → panel closed |
| 10 | Filter panel content | Filter triggers count; lender column has unique values in list |
| 11 | Sticky columns | Sticky column classes present in header and body |

**Expected:** All lines show **PASS** and summary: "All tests passed."

---

## Quick check

- **Logic only:** `node scripts/test-table-logic.js`
- **Full (logic + UI):** run the Node command above, then open **test.html** in the browser and confirm all PASS.
