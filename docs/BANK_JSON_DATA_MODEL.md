# Bank JSON Data Model (All Queries)

This document defines the **canonical data model** for `data/banks/<slug>.json` so every app query can be answered from the JSON (plus `institutes.json` for Country/University). It is based on the structure used in `canara-bank.json` and aligned with all filter logic in `app.js`.

---

## 1. File structure (top level)

```json
{
  "lender": "<Display name, must match Static_data_abroad and institutes.json>",
  "offers": [ "<Offer>" ]
}
```

| Field    | Type     | Required | Description |
|----------|----------|----------|-------------|
| `lender` | `string` | Yes      | Bank display name. Must match exactly: (1) `STATIC_DATA_BY_LENDER` keys, (2) `institutes.json` `lenderName`. |
| `offers` | `Offer[]` | Yes    | Array of one or more offers. Each offer is a row candidate; filters apply per offer. |

---

## 2. Offer shape: query dimensions (required for filters)

These fields **drive the six app queries**. Every offer **must** include them so any combination of filters can be applied.

| Field | Type | Required | Allowed values | Query |
|-------|------|----------|----------------|-------|
| **gender** | `string` | Yes | `"Male"` \| `"Female"` \| `"Equal"` | **Gender** – Row kept if `gender === query.gender \|\| gender === 'Equal'`. |
| **minLoan** | `number` | Yes | Non-negative integer (₹) | **Loan amount** – Row kept if `query.loanAmount >= minLoan && query.loanAmount <= maxLoan`. |
| **maxLoan** | `number` | Yes | Non-negative integer (₹); use `99999999` for “no cap” | **Loan amount** – Same as above. |
| **security** | `string` | Yes | `"Yes"` (Secured) \| `"No"` (Unsecured) | **Security type** – Filter by Secured (`"Yes"`) or Unsecured (`"No"`). |
| **levelOfStudy** | `string` | Yes | Free text; filter is substring match (case-insensitive) | **Level of education** – Row kept if offer’s `levelOfStudy` matches or contains selected level. |
| **instituteWiseChanges** | `string` | Yes | `"Yes"` \| `"No"` | **University** – If `"Yes"`, row kept only when `lenderHasUniversity(lender, query.university, instituteCriteria)` using `institutes.json`. If `"No"`, row kept for any university. |
| **instituteCriteria** | `string` | Conditional | Free text; must match `criteria` in `institutes.json` when `instituteWiseChanges === "Yes"` | **University** – Required when `instituteWiseChanges === "Yes"`. Used with `institutes.json` (lenderName, university, criteria). |

**Canara Bank example (query dimensions only):**

```json
{
  "gender": "Equal",
  "minLoan": 750000,
  "maxLoan": 10000000,
  "security": "Yes",
  "levelOfStudy": "Postgraduate (De)",
  "instituteWiseChanges": "No",
  "instituteCriteria": ""
}
```

---

## 3. Offer shape: offer details (rates, fees, tenure)

These fields describe the offer and are shown in the table. They are **not** used for filtering but are part of the best data model.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **interestRate** | `string` | Yes* | e.g. `"9.85"`, `"9.25"`. *At least one of `interestRate` or `typeOfInterestRate` should be non-empty. |
| **typeOfInterestRate** | `string` | No | e.g. `"Floating"`, `"Fixed"`. |
| **margin** | `string` | No | e.g. `"10"`. |
| **processingFees** | `string` | No | e.g. `"0.5%, Max. 20k"`. |
| **refundableProcessingFees** | `string` | No | e.g. `"No"`, `"Yes"`. |
| **repaymentTenure** | `string` | No | e.g. `"15 excl. morat"`. |
| **moratoriumPeriod** | `string` | No | e.g. `"12 months"`. |
| **paymentDuringMoratorium** | `string` | No | e.g. `"Optional"`. |
| **securityWeightage** | `string` | No | e.g. `"75%–<100%"`, `"≥100%"`. |
| **others** | `string` | No | e.g. `"Mandatory Co-applicant + assignment of future income"`. |

---

## 4. Offer shape: display / static (optional in offer)

These can be **empty in the JSON** and filled from **Static_data_abroad** via `mergeStaticIntoRows()`. Including them in the offer allows bank-specific overrides; otherwise the app merges from `STATIC_DATA_BY_LENDER[lender]`.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **lender** | `string` | No (inherited from top level) | Usually same as file’s `lender`; can be set per offer if needed. |
| **sector** | `string` | No | e.g. `"Public bank"`. From Static_data_abroad. |
| **delayedEmiPayment** | `string` | No | From Static_data_abroad. |
| **nationality** | `string` | No | From Static_data_abroad. |
| **age** | `string` | No | From Static_data_abroad. |
| **qualification** | `string` | No | From Static_data_abroad. |
| **coApplicant** | `string` | No | From Static_data_abroad. |
| **universityStrictness** | `string` | No | From Static_data_abroad. |
| **avgTimeToSanction** | `string` | No | From Static_data_abroad. |
| **dedicatedCaseManager** | `string` | No | From Static_data_abroad. |
| **onboardingProcess** | `string` | No | From Static_data_abroad. |
| **select** | `boolean` | No | UI state; default `false`. |

---

## 5. Query → field mapping (summary)

| Query | Source | Field(s) in bank JSON | Notes |
|-------|--------|------------------------|-------|
| Gender | Bank JSON | `gender` | `"Male"` \| `"Female"` \| `"Equal"`. |
| Loan amount | Bank JSON | `minLoan`, `maxLoan` | Numeric, in ₹. |
| Security type | Bank JSON | `security` | `"Yes"` = Secured, `"No"` = Unsecured. |
| Level of education | Bank JSON | `levelOfStudy` | Substring match. |
| Country | institutes.json | — | `lenderName` = file’s `lender`; filter by `country`. |
| University | Bank JSON + institutes | `instituteWiseChanges`, `instituteCriteria` | If `instituteWiseChanges === "Yes"`, match (lender, university, criteria) in institutes. |

---

## 6. institutes.json (Country & University)

Country and University filters use **`data/institutes.json`**, not fields inside the bank JSON. The link is **lender name** (`lender` in bank JSON = `lenderName` in institutes).

**Shape:**

```json
[
  {
    "lenderName": "Canara Bank",
    "university": "<University name>",
    "country": "<Country name>",
    "criteria": "<Criteria; must match offer.instituteCriteria when instituteWiseChanges is Yes>"
  }
]
```

- **Country query:** Keep bank if any institute row has `lenderName === lender` and `country === query.country`.
- **University query:** For offers with `instituteWiseChanges === "Yes"`, keep only if an institute row has `lenderName`, `university === query.university`, and `criteria` matching `offer.instituteCriteria`.

---

## 7. Minimal valid offer (all queries supported)

Smallest offer that still supports every query:

```json
{
  "gender": "Equal",
  "minLoan": 750000,
  "maxLoan": 99999999,
  "security": "Yes",
  "levelOfStudy": "Postgraduate (De)",
  "instituteWiseChanges": "No",
  "instituteCriteria": "",
  "interestRate": "9.25",
  "typeOfInterestRate": "Floating"
}
```

Display fields can be omitted; they will be filled from Static_data_abroad when present in `STATIC_DATA_BY_LENDER[lender]`.

---

## 8. Canara Bank–style full offer (reference)

One full offer in the style of `canara-bank.json`, with all sections:

```json
{
  "gender": "Equal",
  "minLoan": 750000,
  "maxLoan": 99999999,
  "security": "Yes",
  "securityWeightage": "≥100%",
  "others": "Mandatory Co-applicant + assignment of future income",
  "interestRate": "9.25",
  "typeOfInterestRate": "Floating",
  "margin": "10",
  "processingFees": "0.5%, Max. 10k",
  "refundableProcessingFees": "No",
  "repaymentTenure": "15 excl. morat",
  "moratoriumPeriod": "12 months",
  "paymentDuringMoratorium": "Optional",
  "levelOfStudy": "Postgraduate (De)",
  "instituteWiseChanges": "No",
  "instituteCriteria": "",
  "lender": "Canara Bank",
  "sector": "Public bank",
  "delayedEmiPayment": "",
  "nationality": "Indian",
  "age": "",
  "qualification": "",
  "coApplicant": "",
  "universityStrictness": "",
  "avgTimeToSanction": "",
  "dedicatedCaseManager": "",
  "onboardingProcess": "",
  "select": false
}
```

This is the **best data model** for all queries: query dimensions are required and typed; offer details and display fields are optional and can be merged from static data where empty.
