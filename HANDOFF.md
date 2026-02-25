# Project Handoff — Education Loan Comparison Table

Use this when **closing the project in Cursor** and **continuing in another IDE** (e.g. VS Code with GitHub Copilot). It describes what the app does, the data model, how to run it, and step-by-step how to close in Cursor and start elsewhere.

---

## 1. What This App Does

- **Web app** that shows a **comparison table of education loan offers (abroad)** from multiple banks.
- User selects **6 inputs**: Gender, Loan amount (₹), Loan type (Secured/Unsecured), Country, University, Level of study.
- The app calls **POST /api/query-all** and displays **one row per matching offer** (grouped by bank).
- **Data sources**: Bank JSONs in `data/banks/*.json` + `data/institutes.json`. No external DB; all query logic uses these files.

---

## 2. Tech Stack & Entry Points

| Item | Detail |
|------|--------|
| **Runtime** | Node.js (ES modules: `"type": "module"` in package.json) |
| **Server** | `server.js` — HTTP server, port **3080** (or next free port) |
| **Frontend** | Single page: `index.html` (HTML + inline CSS + JS, no build step) |
| **Query engine** | `scripts/query-offers.js` — uses **json-rules-engine** to match offers by gender, amount, security |
| **Dependencies** | `json-rules-engine` (see `package.json`) |

- **Start app:** `npm start` (runs `node server.js`).
- **Open in browser:** `http://localhost:3080` (or the port printed in the console).

---

## 3. Project Layout (Important Files)

```
Table/
├── index.html          # Single-page UI: form (6 inputs) + results table
├── server.js           # HTTP server + API routes
├── package.json        # name: table-bank-queries, scripts: start, query, test
├── HANDOFF.md          # This file
├── scripts/
│   ├── query-offers.js # queryOffers(), queryAllBanks(), getShared(); rules for gender/amount/security
│   └── test-data-model.js  # Optional: hits APIs to verify data model
├── data/
│   ├── banks/
│   │   ├── manifest.json   # List of bank slugs (which banks to query)
│   │   ├── *.json          # One JSON per bank (e.g. axis-bank.json, mpower.json)
│   │   └── offer-key-tree-schema.json  # Reference for _keyTree shape
│   ├── institutes.json     # lenderName, university, country, criteria, course — for Course + Preferred University + filters
│   └── loan-data-abroad.csv  # Optional static CSV merged into rows (e.g. dedicatedCaseManager, onboarding_process)
└── docs/               # DATA_AND_ARCHITECTURE.md, etc.
```

### UI / Layout (do not revert)

- **Results table width:** The results table card (`.results-card`) is intentionally full-width so the table uses the same horizontal space as the input section above it. It uses `width: calc(100% + 3rem)` and `margin-left/right: -1.5rem` (same as `.query-card`). **Do not remove or change these styles** — the table must stay fully utilised on the sides.

---

## 4. Data Model (Summary)

### Bank JSON (`data/banks/<slug>.json`)

- **`lender`**: `{ name, sector }`.
- **`offers`**: Array of offers. Each offer has at least:
  - **Query fields:** `gender`, `loan.amount.min`, `loan.amount.max`, `security.required`, and optionally `security.coverageDisplay`.
  - **Display fields:** `interest.rate`, `interest.type`, `repayment_tenure.tenure`, `margin`, `processing_fees.displayText`, `moratorium.periodDisplay` (with " *" when `moratorium.paymentDuring` is Mandatory), `course`.
- **`_keyTree`**: Optional; `_keyTree.offers[0]` is “shared” row data (one row per bank): `level_of_study`, `age`, `qualification`, `coApplicant`, `universityStrictness`, `delayed_emi_payment` (with `displayText`), `Average_Time_To_Sanction`, `dedicatedCaseManager`, `onboarding_process`.

### Institutes (`data/institutes.json`)

- Array of objects: **`lenderName`**, **`university`**, **`country`**, **`criteria`**, **`course`**.
- Used for: Country/University dropdowns, **Course** (when a specific university + level are selected), **Preferred University** (Yes/No per bank for selected university).

### Query Logic (backend)

- **Gender:** Offer matches if `offer.gender` equals user gender or `"Equal"`.
- **Amount:** User amount must be between `offer.loan.amount.min` and `offer.loan.amount.max`.
- **Secured:** If user wants secured, `offer.security.required === true`; if unsecured, `required === false` or `"No"`.
- **Country / University / Level:** Applied as filters on the result set (institutes + `row.shared.level_of_study`).
- **Level = "Any":** No level filter; results are **sorted** so offers with `level_of_study` containing **XXXXXX** appear first, then others.

---

## 5. Table Columns (Order & Sources)

| Column | Source |
|--------|--------|
| Bank | Row’s bank name |
| # | Offer index |
| Interest Rate | `offer.interest.rate` |
| Type of Rate | `offer.interest.type` |
| **Preferred University** | Yes if (bank, selected university) exists in institutes.json; No otherwise; N/A if no university selected |
| Security coverage % | `offer.security.coverageDisplay` — **only when Secured** is selected |
| Repayment Tenure | `offer.repayment_tenure.tenure` |
| Margin (%) | `offer.margin` |
| Processing fees | `offer.processing_fees.displayText` |
| Moratorium period | `offer.moratorium.periodDisplay`; " *" appended when `offer.moratorium.paymentDuring` is Mandatory (tooltip explains payment-during-moratorium and the star) |
| **Course** | See below |
| Age, Qualification, Co-applicant, University strictness | `shared` (_keyTree / merged static) |
| Delayed EMI payment | `shared.delayed_emi_payment.displayText` |
| Avg time to sanction | `shared.Average_Time_To_Sanction` (min–max if object) |
| Dedicated case manager | `shared.dedicatedCaseManager` (Yes/No) |
| Onboarding process | `shared.onboarding_process` |

### Course column logic

- **When Level of study = "Any" OR University = "Not in the list":**  
  Course = **`offer.course`** from the bank’s offer (from bank JSON).
- **When a specific University AND a specific Level are selected:**  
  Course = value from **institutes.json** for that **bank + selected university** (if found).

---

## 6. Level of Study (Dropdown → Data Mapping)

Dropdown shows 7 options; **value sent to backend** is the data-model string:

| Dropdown label | Value sent (match in data) |
|----------------|----------------------------|
| Any | `Any` — no level filter; sort so XXXXXX offers first |
| Postgraduate (Degree / Diploma) | `Postgraduate (De / Di)` |
| Undergraduate (Degree / Diploma) | `Undergraduate (De / Di)` |
| Doctrate courses | `Doctrate courses` |
| Professional & Techical courses | `Prof. / Tech. courses` |
| Executive courses | `Exec. courses` |
| Government approved courses | `Govt. approved courses` |

Backend matches by `row.shared.level_of_study` containing the value (case-insensitive). For **Any**, backend does not filter by level but sorts by XXXXXX first.

---

## 7. University Dropdown

- **First option:** **"Not in the list"** (value `""`). When selected, no university filter is applied; results use the other 5 inputs.
- Remaining options are loaded from **institutes.json** (optionally filtered by selected Country).

---

## 8. APIs (Server)

| Method + path | Purpose |
|---------------|--------|
| GET `/` or `/index.html` | Serves the single-page app |
| GET `/api/banks` | Returns list of bank slugs from `data/banks/manifest.json` |
| GET `/api/shared?bank=<slug>` | Returns shared row for a bank (from `_keyTree.offers[0]` or getShared) |
| GET `/api/institutes` | Returns `data/institutes.json` |
| POST `/api/query` | Body: `{ gender, amount, secured, bank }` — single-bank query |
| POST `/api/query-all` | Body: `{ gender, amount, secured, country, university, levelOfStudy }` — all banks, filters applied, Level=Any → sort by XXXXXX first |

---

## 9. How to Close This Project in Cursor & Start in Another IDE

### Step 1: Save and commit (if using Git)

```bash
cd "c:\Users\Yash Jangid\Desktop\Table"
git status
git add -A
git commit -m "Handoff: table columns, Level/University/Course/Preferred University logic"
```

If you don’t use Git, skip to Step 2.

### Step 2: Close the project in Cursor

1. **File → Close Folder** (or close the Cursor window that has this project open).
2. Optionally: **File → Exit** to fully quit Cursor.

You don’t need to “uninstall” anything; just close the folder/window.

### Step 3: Copy or move the project (if needed)

- If the project is only on this machine and you’ll use another IDE on the same PC: no need to copy; open the same folder in the new IDE.
- If you’ll use another machine or want a backup:
  - Copy the whole **Table** folder (e.g. to a USB drive or cloud folder), or
  - Push to GitHub from Cursor/terminal, then clone on the other machine.

### Step 4: Open the project in your new IDE (e.g. VS Code + GitHub Copilot)

1. Open **VS Code** (or your chosen IDE).
2. **File → Open Folder** and select the **Table** folder (e.g. `C:\Users\Yash Jangid\Desktop\Table`).
3. Install **GitHub Copilot** (or Copilot Chat) from the Extensions panel if you haven’t already.
4. Give Copilot context by opening this file: **`HANDOFF.md`** — you can paste a short summary from the “Quick context for Copilot” section below when starting a new task.

### Step 5: Install dependencies and run the app

In the IDE’s terminal (or system terminal) from the **Table** folder:

```bash
cd "C:\Users\Yash Jangid\Desktop\Table"
npm install
npm start
```

Then open **http://localhost:3080** in a browser. If 3080 is in use, the server will try the next port (e.g. 3081) and print the URL.

### Step 6: Optional — run data-model tests

```bash
node scripts/test-data-model.js
```

(Uses default `http://localhost:3080`; if your server runs on another port, set `BASE_URL`, e.g. `set BASE_URL=http://localhost:3081` on Windows before running.)

---

## 10. Quick Context for Copilot (Copy-Paste When Starting Again)

You can paste something like this when you open the project in the new IDE and ask Copilot to help:

```
This is an education loan comparison app (Node.js, no build). 
- Frontend: index.html (single page, form + table).
- Backend: server.js (port 3080), scripts/query-offers.js (json-rules-engine).
- Data: data/banks/*.json (one per bank), data/institutes.json, data/banks/manifest.json.
- Table columns and Course/Preferred University/Level logic are documented in HANDOFF.md.
- Run: npm start, then open http://localhost:3080.
```

---

## 11. Key Conventions

- **Bank slug:** filename without `.json` (e.g. `axis-bank`, `mpower`). `manifest.json` lists which banks are queried.
- **Lender name:** From `bank.lender.name`; must align with `institutes.json`’s `lenderName` for Course and Preferred University (matching is case-insensitive).
- **Level "Any":** Backend receives `levelOfStudy === 'Any'` and sorts rows so `level_of_study` containing `XXXXXX` comes first; no level filter.
- **Course:** From `offer.course` when Level=Any or University=Not in the list; from institutes when a specific university + level are selected.

---

## 12. More Detail (If Needed)

- **`docs/DATA_AND_ARCHITECTURE.md`** — Data flow, script order, CSV mapping.
- **`docs/MAPPINGS_AND_KEYS_REFERENCE.md`** — Master reference for all mappings, key behavior, and safe key-change workflow.
- **`scripts/query-offers.js`** — Exact rule conditions (gender, amount, security).
- **`server.js`** — All API routes and filter/sort logic (country, university, level, XXXXXX sort).

You can close Cursor, open this folder in your new IDE, run `npm install` and `npm start`, and continue from here. Keep **HANDOFF.md** open or in mind when asking Copilot to change table columns, add filters, or adjust the data model.
