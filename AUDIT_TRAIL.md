# Audit trail – Loan comparison table

This file is updated as the project evolves. It records major decisions and changes from the conversation and ongoing work.

---

## Project context

- **Product**: India-based loan comparison startup (education, home, personal, vehicle loans, etc.). Users compare loans and can apply to selected banks with one application for a small fee; comparison table can be downloaded.
- **Current focus**: Education loans (Indian and Abroad). Starting with **Abroad education**; table must be reusable for home loan, personal loan, etc.
- **Tech**: Plain HTML, CSS, JS; config-driven table (`data/table-config.js`); data from `window.TABLE_DATA` (and later CSV).

---

## Conversation history (summary)

### 1. Initial setup

- **Table design**: Based on drawio HTML (Sector | Eligibility criteria | Loan features | Fees & Charges) with subheaders and info icons.
- **Data**: Used CSV “Loan data matrix for website - institutes-abroad-standardized.csv” for lender/institute data; full product matrix (rates, fees) added as placeholder in JS (xlsx not readable).
- **Deliverables**: Reusable table with Indian/Abroad toggle, filters, Apply/Download buttons, sticky Lender + Select columns, responsive layout.

### 2. Strip to table only

- **Request**: Remove all data and everything outside the table (red-box area).
- **Done**: Only the table structure remained (header from config, empty body); filters, tabs, buttons, disclaimer, footer removed. Table driven by `table-config.js` and `app.js`.

### 3. Responsive and layout

- **Request**: Table responsive on all viewport sizes; full horizontal space; vertical flow for all rows; support any number of rows/columns without code change; readable font for all ages.
- **Done**: Fluid layout (clamp, rem), full-width table, no fixed height, column sizing from content + colgroup, sticky thead (vertical), sticky columns from config, typography with clamp and readability in mind.

### 4. Structure and headers (Sector, headers, data)

- **Request**: Sector as separate column before Lender and Select; column width from largest value, table full width; dynamic (CSV) + static data; two-row header (main + subheaders), subheader’s main header visible; centre-aligned headers; reorderable via config.
- **Done**: Config updated with Sector column first (then Lender, Select); column groups: Sector, Eligibility criteria, Loan features, Customer service with exact subheader labels; `TABLE_DATA` + `renderTableBody()`; centre-aligned thead; column order = config order.

### 5. Column order and comparisontabl.es-style UI

- **Request**: Column order Lender → Sector → Select; table display/font like comparisontabl.es; 50+ blank rows to test; mobile-friendly; remove “Lender then Sector then Select” line on phone.
- **Done**: Config column order set to Lender, Sector, Select; compact font/padding (13px → 12px); 55 blank rows when no `TABLE_DATA`; mobile styles and touch targets; scroll-hint line removed.

### 6. Header visibility and UX

- **Request**: Header visible when table is scrolled (horizontal); smaller Select column; borders between header blocks; slightly smaller but readable font; remove scroll hint.
- **Done**: Split into header table + body table; scroll synced so header stays aligned when body scrolls horizontally; Select column and checkbox reduced; `.th-group-end` / `.th-col-group-end` / `.td-col-group-end` for 2px borders between blocks; font reduced (12px/11px) with readable minimums; scroll hint removed.

### 7. Blank rows, audit trail, header stickiness

- **Request**: Insert blank data rows; generate and maintain audit trail; first header (Sector) must stay visible on horizontal scroll; on vertical scroll, all headers and subheaders visible until the table ends.
- **Done**:
  - **Blank rows**: Default test rows increased to **60** blank rows when `TABLE_DATA` is empty or not set.
  - **Audit trail**: This file `AUDIT_TRAIL.md` created and will be updated as we go.
  - **First header block sticky (horizontal)**: First main header cell (“Sector”) and first three subheader cells (Lender, Sector, Select) in the **header table** are `position: sticky` with `left` and `min-width` so they stay visible when the header area is scrolled horizontally. Sticky widths set on `.table-container` so header and body share the same CSS variables.
  - **Headers sticky (vertical)**: `.table-header-wrap` has `position: sticky; top: 0; z-index: 10` so the entire header (both rows) stays visible while the user scrolls the page down until the table container scrolls out of view.

---

## Current file roles

| File | Role |
|------|------|
| `index.html` | Page with table container, header table wrapper, body table wrapper; no scroll hint. |
| `styles.css` | Layout (split header/body), sticky header (top + first block left), borders, fonts, responsive. |
| `app.js` | Builds header and body from config; 60 default blank rows; colgroup for both tables; scroll sync; `updateStickyWidths()` on container. |
| `data/table-config.js` | Column groups and columns (order = display order). First group: Lender, Sector, Select (all sticky). |
| `data/data-loader.js` | Commented example for TABLE_DATA / CSV. |
| `AUDIT_TRAIL.md` | This audit trail. |

---

## Config column structure (current)

- **Sector** (3 cols): Lender, Sector, Select (all sticky).
- **Eligibility criteria** (5): Nationality, Age (in years), Qualification, Co-applicant, University Strictness.
- **Loan features** (9): Interest rate, Type of interest rate, Margin, Processing fees, Refundable Processing fees, Repayment Tenure, Moratorium period, Payment during moratorium, Delayed EMI payment Per month.
- **Customer service** (3): Avg. Time to Sanction, Dedicated Case Manager, Onboarding process.

---

## How to update this file

- Append new sections under “Conversation history” for each new request/batch of changes, with a short **Request** and **Done**.
- Adjust “Current file roles” and “Config column structure” when structure or responsibilities change.
- Keep entries concise; use the same format (Request / Done) for consistency.

### 8. Column size fit to header; responsive

- **Request**: First three columns (Lender, Sector, Select) were too wide; reduce size so they fit the header’s character size. Table should be dynamically responsive to every display size.
- **Done**:
  - **Sticky columns fit header**: For the first 3 columns, `measureAndSizeColumns()` now uses only the header cell width (plus a small buffer), not the max of header and body, so Lender, Sector, Select columns match header text width. Select has a small minimum (40px) for the checkbox.
  - **updateStickyWidths()** now reads widths from the **header** table (not body) and sets `--sticky-col-*` on `.table-container`, so sticky columns stay header-sized.
  - **Default CSS** sticky widths reduced (e.g. 5.5rem, 4.5rem, 2.25rem) so initial render is tighter.
  - **max-width** set on sticky header and body cells so they don’t grow beyond the set width.
  - **Padding** slightly reduced (4px/6px); app padding uses `clamp(6px, 2vw, 12px)` for viewport-based spacing.
  - **Responsive**: Media queries for ≤767px and ≤359px keep font and padding scaled; horizontal scroll on small screens unchanged.

### 9. Darker block borders and subheader info popover

- **Request**: (1) Darker border between header blocks to differentiate them. (2) Info symbol on every subheader: on desktop show a small info box on hover; on mobile/touch show on click. (3) Info box styled like reference: dark background, light text, rounded corners, triangular arrow pointing at the icon. (4) Info box must fit the viewport (dynamic positioning/sizing).
- **Done**:
  - **Block borders**: Introduced `--block-border: #5b6370` and use it for `.th-group-end`, `.th-col-group-end`, `.td-col-group-end` instead of `--border`.
  - **Info on every subheader**: Each subheader cell now includes an info icon (ⓘ) and a custom popover. Content comes from `col.tooltip` in config, or placeholder “Description will be added here.” for columns without tooltip.
  - **Behavior**: Desktop (hover-capable per `matchMedia('(hover: hover)')`): popover shows on mouseenter and hides on mouseleave. Touch/mobile: popover toggles on click; closing on outside click (single document listener, guarded so it’s only added once).
  - **Styling**: Popover uses dark background `#1f2937`, light text `#f3f4f6`, 8px border-radius, left-side arrow (::before) pointing at the icon; `.arrow-right` flips the arrow when the popover is positioned to the left of the icon.
  - **Viewport fit**: `positionPopover()` uses `getBoundingClientRect()` and viewport dimensions to place the popover (prefer right of icon, fallback left); clamps top/bottom and left so it stays within padding; `max-width: min(320px, 90vw)`.

---

### 10. Future-proof for actual data; filter on every subheader (except Select)

- **Request**: (1) Ensure the table still works when actual data is provided later. (2) Add a filter option on every subheader except the Select column. (3) Filter behaviour as in the design: per drawio (Sort A–Z/Z–A, Filter by condition, Filter by values) and as described in the Comparison Table design doc.
- **Done**:
  - **Data contract**: Documented in `data/data-loader.js`: `TABLE_DATA` must be an array of row objects whose keys match column ids from `TABLE_CONFIG`. Missing keys show as "—". Order of columns always comes from config. After setting `TABLE_DATA`, call `window.renderTableBody()` to refresh. Sort and filter state are applied on top of `TABLE_DATA`, so changing data and re-rendering keeps current sort/filter applied to the new data.
  - **Single data path**: All body rows come from `getViewRows()`: `getSourceRows()` (TABLE_DATA or 60 blank rows) → sort by `tableState.sortBy`/`sortDir` → apply `tableState.filters` per column. So the table works with any future data without code change.
  - **Filter trigger**: Each subheader (except Select) has a filter trigger button (▼). Click opens a dropdown panel (viewport-positioned) with:
    - **Sort**: "Sort A to Z / Smallest to Largest", "Sort Z to A / Largest to Smallest" (apply immediately and close).
    - **Filter by condition**: Dropdown of conditions (None, Is empty, Is not empty, Text contains, Text does not contain, Text starts with, Text ends with, Text is exactly, Greater than, Greater than or equal to, Less than, Less than or equal to, Is equal to, Is not equal to, Is between, Is not between) plus optional value input. Stored on OK.
    - **Filter by values**: Select all, Clear all, search box, list of unique values (from source data) with checkboxes, Cancel, OK. Stored on OK.
  - **Filter logic**: Per column, either a condition filter or a values filter (selected set). Rows must pass all column filters (AND). Condition operators implemented in `matchesCondition()` (text and numeric).
  - **Panel**: One shared `#filterPanel`; content and position updated when a filter trigger is clicked; closes on Cancel, OK, or click outside.

---

### 11. Info icon colour and font size

- **Request**: (1) Change info icon colour to black so it is visible. (2) Increase info icon font size (desktop and non-desktop); user then requested +1px for both.
- **Done**:
  - **Colour**: Info icon (`.info-icon-inner`) uses `color: #1a1d21` and `border: 2px solid #1a1d21` (desktop); mobile keeps same colour with `border-width: 1.5px`.
  - **Font size**: Desktop 13px; mobile (≤767px) 11px. Icon box remains 14×14px (desktop) and 12×12px (mobile).

### 12. Column max width 20 characters; wrap without breaking words

- **Request**: Max width of each column 20 characters; content beyond that wraps in the cell; no word should appear incomplete (e.g. "compu-" on one line and "-ter" on the next — words like "computer" must stay whole, even if on the next line).
- **Done**:
  - **CSS**: All body cells (`.comparison-table td`) and subheader cells (`.comparison-table .subheader-row .th-col`) use `max-width: 20ch`. Wrapping uses `white-space: normal`, `word-break: normal`, `overflow-wrap: normal` so text wraps only at word boundaries and words are never split mid-word. Sticky columns use `white-space: normal` so they wrap too; subheader labels (`.th-col-label`) wrap with the same word-boundary rules.
  - **JS**: `get20ChPx()` measures the pixel width of 20ch using the table’s font size; `setColgroup()` caps each column width at that value so the table never allocates more than 20ch per column.

---

---

### 13. Full baseline recap (from beginning to current state)

This section is a single-run recap so any future teammate can understand what has already been done without reading the entire history.

#### Phase A — Foundation and UX shell
- Built a config-driven comparison table using `data/table-config.js` and `app.js`.
- Removed non-table UI blocks when requested; retained only table-first screen.
- Ensured responsive behaviour across viewport sizes and dynamic row/column counts.

#### Phase B — Table structure and sticky behaviour
- Finalized header architecture with grouped main headers + subheaders.
- Added sticky header (vertical) and sticky first block columns (horizontal).
- Split into header/body tables with scroll sync to keep alignment stable.

#### Phase C — Display quality and readability
- Tuned font sizing, spacing, borders, and block separators for clarity.
- Added max-width behaviour (20ch) and wrap-at-word boundaries.
- Reduced first 3 sticky column widths to fit header-content size.

#### Phase D — Column-level intelligence
- Added info icon per subheader with tooltip/popover behaviour:
  - hover on desktop;
  - click/toggle on touch/mobile;
  - viewport-aware positioning.
- Added per-column filter panel (except Select):
  - sort A→Z / Z→A;
  - condition filters;
  - values filter with search + select/clear all.

#### Phase E — Data model integration
- Added data-source precedence:
  1) `window.LOAN_OFFERS` (bank JSON + flattening),
  2) `window.TABLE_DATA` (inline/CSV fallback),
  3) generated blank rows.
- Loaded bank JSONs via `data/bank-loader.js` and institutes via `data/institutes.json`.
- Loaded static columns/tooltips via `data/static-data-loader.js`.
- Kept CSV fallback path via `data/loan-data-loader.js`.

#### Phase F — Query engine (frontend filtering)
- Added user query inputs for gender, amount, security, level, country, university.
- Implemented query matching in `app.js`:
  - gender with Equal fallback,
  - amount min/max range,
  - secured/unsecured,
  - level matching,
  - country by lender↔institutes relation,
  - university by lender+criteria match.
- Deduplicated offer-mode rows by lender for display.

#### Phase G — Documentation and maintainability
- Added and expanded architecture/handoff docs (`docs/` + `HANDOFF.md`).
- Maintained this audit trail as a running log of requests and implementation details.
- Added a dedicated master mapping/key reference doc for future change safety (see section 14).

---

### 14. Documentation control added for future updates

To make future edits easier and safer, mapping and key-level documentation is now centralized in:

- `docs/MAPPINGS_AND_KEYS_REFERENCE.md`

This document includes:
- source-to-source mappings (CSV → app keys, JSON → flat offer keys);
- table column id catalog and feature behaviour;
- query key definitions and where each key is used;
- merge precedence and fallback rules;
- change protocol for adding/removing/renaming keys.

---

*Last updated: full baseline recap + master mappings/key reference documentation added.*
