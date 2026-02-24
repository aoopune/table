# How All Queries Are Answered by the JSON (Example: State Bank of India)

This document shows **concretely** how each filter/query the app supports is answered using **State Bank of India’s** bank JSON and `institutes.json`. The same pattern applies to every other bank.

---

## 1. Bank JSON: `data/banks/state-bank-of-india.json`

State Bank of India’s file has **3 offers**. Here is the structure and the values that drive queries:

```json
{
  "lender": "State Bank of India",
  "offers": [
    {
      "gender": "Equal",
      "minLoan": 750000,
      "maxLoan": 5000000,
      "security": "No",
      "levelOfStudy": "Undergraduate (De / Di) Postgraduate (De / Di) Prof. / Tech. / Doctrate courses",
      "instituteWiseChanges": "Yes",
      "instituteCriteria": "Annexure",
      "interestRate": "8.9",
      "typeOfInterestRate": "Floating",
      ...
    },
    {
      "gender": "Equal",
      "minLoan": 750000,
      "maxLoan": 30000000,
      "security": "Yes",
      "levelOfStudy": "Undergraduate (De / Di) Postgraduate (De / Di) Prof. / Tech. / Doctrate courses",
      "instituteWiseChanges": "Yes",
      "instituteCriteria": "Annexure",
      "interestRate": "8.4",
      ...
    },
    {
      "gender": "Equal",
      "minLoan": 750000,
      "maxLoan": 30000000,
      "security": "Yes",
      "levelOfStudy": "Undergraduate (De / Di) Postgraduate (De / Di) Prof. / Tech. / Doctrate courses",
      "instituteWiseChanges": "No",
      "instituteCriteria": "Annexure",
      "interestRate": "8.9",
      ...
    }
  ]
}
```

---

## 2. How each query is answered

### Query 1: **Gender** (Male / Female)

- **Source:** Bank JSON only.  
- **Field:** `gender` on each offer.

**In SBI’s JSON:** All 3 offers have `"gender": "Equal"`.

- **App logic:** Keep rows where `gender === query.gender || gender === 'Equal'`.
- **Result:** If user selects **Male** or **Female**, SBI still appears (because `"Equal"` matches both). All three offers are kept.

---

### Query 2: **Loan amount (₹)**

- **Source:** Bank JSON only.  
- **Fields:** `minLoan`, `maxLoan` on each offer.

**In SBI’s JSON:**

| Offer | minLoan  | maxLoan   |
|-------|----------|-----------|
| 1     | 750,000  | 5,000,000 |
| 2     | 750,000  | 30,000,000|
| 3     | 750,000  | 30,000,000|

- **App logic:** Keep rows where `query.loanAmount >= minLoan && query.loanAmount <= maxLoan`.
- **Examples:**
  - User enters **₹10,00,000** → Offers 2 and 3 match (10L between 7.5L and 30L). Offer 1 does not (10L > 5L).
  - User enters **₹40,00,000** → Only offers 2 and 3 match.

So the **loan amount query is answered entirely from** `minLoan` and `maxLoan` in the JSON.

---

### Query 3: **Security type** (Secured / Unsecured)

- **Source:** Bank JSON only.  
- **Field:** `security` on each offer (`"Yes"` = Secured, `"No"` = Unsecured).

**In SBI’s JSON:**

| Offer | security |
|-------|----------|
| 1     | `"No"`   |
| 2     | `"Yes"`  |
| 3     | `"Yes"`  |

- **App logic:**  
  - **Secured** → keep rows where `(row.security || '').toLowerCase() === 'yes'`.  
  - **Unsecured** → keep where `=== 'no'`.
- **Result:**  
  - User selects **Unsecured** → only Offer 1 is kept (SBI still appears with one row).  
  - User selects **Secured** → Offers 2 and 3 are kept.

So the **security query is answered entirely from** `security` in the JSON.

---

### Query 4: **Level of education**

- **Source:** Bank JSON only.  
- **Field:** `levelOfStudy` on each offer.

**In SBI’s JSON:** All 3 offers have the same value:

`"Undergraduate (De / Di) Postgraduate (De / Di) Prof. / Tech. / Doctrate courses"`

- **App logic:** Keep rows where the offer’s `levelOfStudy` matches or contains the selected level (case-insensitive).
- **Result:** If user picks a level that appears in this string (e.g. “Postgraduate”), SBI’s offers are kept. So the **level-of-study query is answered entirely from** `levelOfStudy` in the JSON.

---

### Query 5: **Country**

- **Source:** **institutes.json** (not the bank JSON).  
- **Link:** `lenderName` in institutes = `lender` in bank JSON (`"State Bank of India"`).

**In institutes.json**, SBI has entries like:

| lenderName           | university                    | country                   | criteria  |
|----------------------|-------------------------------|---------------------------|-----------|
| State Bank of India  | Australian National University| Australia                 | Annexure  |
| State Bank of India  | Boston University             | United States of America  | Annexure  |
| State Bank of India  | Brown University              | United States of America  | Annexure  |
| State Bank of India  | Delft University of Technology| Netherlands              | Annexure  |
| State Bank of India  | ETH Zurich                    | Switzerland               | Annexure  |
| …                    | …                             | …                         | …         |

- **App logic:** `lenderHasCountry(lender, query.country)` checks if **any** row in `INSTITUTES` has `lenderName === "State Bank of India"` and `country === query.country`. If yes, **all** of that bank’s offers (from the JSON) are eligible for the next filters.
- **Result:**  
  - User selects **United States of America** → SBI has institutes there → SBI appears (offers still filtered by amount, security, etc.).  
  - User selects **Australia** → SBI has Australian National University → SBI appears.  
  - User selects a country where SBI has no institute → SBI does not appear.

So the **country query is answered from** `institutes.json` using the same lender name as in the bank JSON.

---

### Query 6: **University**

- **Source:** **Bank JSON + institutes.json**.  
- **Bank JSON fields:** `instituteWiseChanges`, `instituteCriteria` on each offer.  
- **institutes.json:** `lenderName`, `university`, `criteria`.

**In SBI’s JSON:**

- Offers 1 & 2: `"instituteWiseChanges": "Yes"`, `"instituteCriteria": "Annexure"`.
- Offer 3: `"instituteWiseChanges": "No"` (so it is shown for any university; no institute check).

- **App logic:**  
  - If `instituteWiseChanges !== 'yes'` → keep the row (no university filter).  
  - If `instituteWiseChanges === 'yes'` → keep only if **lenderHasUniversity(lender, query.university, row.instituteCriteria)**. That function looks in `INSTITUTES` for a row with same `lenderName`, same `university`, and `criteria` matching the offer’s `instituteCriteria` (e.g. "Annexure").

**In institutes.json**, SBI has e.g.:

- `lenderName: "State Bank of India"`, `university: "Boston University"`, `criteria: "Annexure"`.

- **Result:**  
  - User selects **Boston University** → For offers 1 & 2, we check: is there an institute row (SBI, Boston University, Annexure)? Yes → those offers are kept. Offer 3 is kept anyway (`instituteWiseChanges: "No"`).  
  - So the **university query is answered** by the bank JSON (`instituteWiseChanges`, `instituteCriteria`) plus `institutes.json` (lenderName, university, criteria).

---

## 3. Summary table (State Bank of India)

| Query           | Answered by (file)     | Field(s) used                                      |
|-----------------|------------------------|----------------------------------------------------|
| Gender          | Bank JSON              | `gender`                                           |
| Loan amount     | Bank JSON              | `minLoan`, `maxLoan`                               |
| Security        | Bank JSON              | `security`                                         |
| Level of study  | Bank JSON              | `levelOfStudy`                                     |
| Country         | institutes.json        | `lenderName` (= lender), `country`                 |
| University      | Bank JSON + institutes | `instituteWiseChanges`, `instituteCriteria` + institutes’ `university`, `criteria` |

So for State Bank of India (and every other bank), **all queries are answered only from the bank’s JSON file and `institutes.json`**—no other data is used for filtering.
