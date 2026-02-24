# Query-ready data model: support any client query

This document defines how the bank JSON data model must be shaped so **any type of query from the client** can be answered. It maps each query dimension to the data and specifies the minimal “query contract.”

---

## 1. Current client query dimensions

From `app.js`, `server.js`, and `scripts/query-offers.js`:

| Query dimension | Used by | Where it reads from | Type needed for query |
|----------------|--------|---------------------|------------------------|
| **Gender** | API + app | `offer.gender` | string: `"Male"` \| `"Female"` \| `"Equal"` |
| **Loan amount** | API + app | `offer.loan.amount.min`, `offer.loan.amount.max` | number (₹) |
| **Security (Secured/Unsecured)** | API + app | `offer.security.required` | boolean or `"No"` (false/unsecured) |
| **Level of study** | API (query-all) + app | `row.shared.level_of_study` (from _keyTree) | string (substring match) |
| **Country** | API (query-all) + app | `institutes.json` + `row.bankName` | lenderName in institutes |
| **University** | API (query-all) + app | `row.offer.institute.changes`, `row.offer.institute.criteria` + `institutes.json` | boolean + string (criteria) |

So for **current** queries, the data model must expose the above paths and types.

---

## 2. Where each dimension must live (data model contract)

### 2.1 Root `lender` and `offers[]`

Each **offer** in `bankData.offers` must have these paths so the API and app can answer queries:

| Query dimension | Path in offer (current or standard) | Required type | Notes |
|-----------------|--------------------------------------|---------------|--------|
| Gender | `offer.gender` or `offer.eligibility.gender` | string | Male / Female / Equal |
| Loan amount | `offer.loan.amount.min`, `offer.loan.amount.max` | number | min ≤ user amount ≤ max |
| Security | `offer.security.required` | boolean or `"No"` | true = Secured, false/No = Unsecured |
| University | `offer.institute.changes` (or `wiseChanges`), `offer.institute.criteria` | boolean + string | Used with institutes.json; if changes is false, offer applies to all univ. |

If you standardise keys: use `eligibility.gender`, `institute.wiseChanges`, `institute.levelOfStudy`; the API/app must then read from those paths (or you normalize once when loading).

### 2.2 `_keyTree.offers[]` (shared row data)

The server uses **`row.shared`** = `_keyTree.offers[0]` for level-of-study filter:

| Query dimension | Path in shared (_keyTree.offers[0]) | Required type | Notes |
|----------------|-------------------------------------|---------------|--------|
| Level of study | `shared.level_of_study` or `shared.levelOfStudy` | string | Substring match; `"XXXXXX"` = any |

So **at least one** of `level_of_study` or `levelOfStudy` must be present in `_keyTree.offers[]` for level filter to work.

### 2.3 Country and University

- **Country:** Not stored in bank JSON. Resolved via `institutes.json` (lenderName + country). The API row must have `bankName` = lender name so that `bankHasCountry(row.bankName, country, institutes)` works.
- **University:** Resolved via `row.offer.institute` + `institutes.json` (lenderName, university, criteria). So each offer must have `institute.changes` and `institute.criteria` (or standard names) and API must return full `offer` and `bankName` in each row.

---

## 3. API response shape (so client can run any query)

For **POST /api/query-all** (and similarly for /api/query), each **row** in `result.rows` is used for filtering by country, university, and level of study. So each row must have:

| Field | Source | Purpose |
|-------|--------|---------|
| `bankName` | lender.name | Country filter (institutes), display |
| `bankSlug` | slug | Link, single-bank query |
| `offer` | one item from bankData.offers | Gender, amount, security, institute (university filter) |
| `shared` | _keyTree.offers[0] | Level-of-study filter (`shared.level_of_study` / `levelOfStudy`) |

So the **data model** (bank JSON) must provide:

1. **lender** with **name** (and sector if needed).
2. **offers[]** with **gender**, **loan.amount.min/max**, **security.required**, **institute.changes**, **institute.criteria** (and optionally **institute.level_of_study** / **levelOfStudy** for display).
3. **_keyTree.offers[]** with at least **level_of_study** or **levelOfStudy** so level filter works.

Then the existing server logic can answer all current queries.

---

## 4. Future / additional query dimensions

If the client adds more filters, the same idea applies: **each filter needs a single, consistent path and type**.

| Potential query | Where it should live | Type for query |
|-----------------|----------------------|----------------|
| Moratorium period | `offer.repayment.moratorium.period` or `shared.moratoriumPeriod` | number (months) or `{ min, max }` / `{ options: [] }` so “min 6 months” works |
| Repayment tenure | `offer.repayment.tenure` | number (years/months – decide one unit) |
| Interest rate | `offer.interest.rate` | number (for range queries) |
| Processing fees | `offer.fees.processing` | number or `{ min, max }` (same unit) |
| Onboarding (Branch / Digital / Hybrid) | `shared.onboarding_process` or `shared.onboarding` | string (enum) |
| Nationality | `shared.nationality` | string |
| Age range | `shared.age` | `{ min, max }` (numbers) |

Rule: **if the client can filter by it, it must be in the data model as a queryable type** (number, enum string, or structured range), not only as free text. For display-only, a string is fine.

---

## 5. Summary: what the data model must guarantee

For **any type of query from the client** to be answerable:

1. **Every query dimension** has a **single, documented path** in the bank JSON (either in `offers[]` or in `_keyTree.offers[]`).
2. **Values are queryable:** numbers for ranges (amount, tenure, moratorium, rate, fees), enums or booleans for categories (gender, security, onboarding).
3. **Optional but recommended:** For text that can be “X or Y” (e.g. moratorium “12 or 6 months”), keep:
   - a **display** string for UI, and  
   - a **queryable** value (e.g. min/max months or options array) so “moratorium ≥ 6 months” works.
4. **API row shape:** Each row returned by the API must include **bankName**, **offer** (with institute, loan, security, gender), and **shared** (with level_of_study / levelOfStudy) so server-side filters for country, university, and level of study work.
5. **Naming:** Use one convention (e.g. camelCase per offer-key-tree-schema) and have the server (or a single loader) map from bank JSON to that convention so all clients see the same paths.

With this, the data model can answer every current query (gender, amount, security, level of study, country, university) and any future filter you add, as long as the corresponding field exists in the model and is exposed in the API response.
