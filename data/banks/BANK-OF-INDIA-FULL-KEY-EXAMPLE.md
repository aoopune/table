# Bank of India: example of full key structure (standardised)

This shows how **one offer** would look with all keys in the standardised form (schema + security coverage %). Same structure applies to every offer in the file.

---

## Root level (file)

```json
{
  "_comment": "...",
  "_keyTree": { ... },
  "lender": {
    "name": "Bank of India",
    "sector": "Public - Bank"
  },
  "offers": [ ... ]
}
```

---

## Example 1: Unsecured offer (no collateral)

**Full key structure for one offer:**

```json
{
  "eligibility": {
    "gender": "Equal",
    "coApplicant": "Mandatory Co-applicant + CGFSEL cover"
  },
  "loan": {
    "amount": {
      "min": 1,
      "max": 400000
    }
  },
  "security": {
    "required": false,
    "weightage": "None",
    "coverageDisplay": "None",
    "coveragePct": null
  },
  "interest": {
    "rate": 9.8,
    "type": "Floating",
    "margin": 0
  },
  "fees": {
    "processing": { "min": 10000, "max": 0 },
    "refundable": true
  },
  "repayment": {
    "tenure": 15,
    "type": null,
    "moratorium": {
      "periodMonths": { "min": 12, "max": null },
      "periodDisplay": "12 months",
      "paymentDuring": "Optional"
    }
  },
  "institute": {
    "levelOfStudy": "Undergraduate (De / Di) Postgraduate (De / Di) Prof. / Tech. / Govt. approved courses",
    "wiseChanges": true,
    "criteria": "Top 1000 as per QS Rankings 2026 / Top 3000 as per webometrics.org"
  },
  "course": "Specified or Any course",
  "moratorium": {
    "periodMonths": { "min": 12, "max": null },
    "periodDisplay": "12 months",
    "paymentDuring": "Optional"
  }
}
```

**Key mapping (current → standard):**

| Current in file | Standard key (this example) |
|-----------------|------------------------------|
| gender | eligibility.gender |
| coapplicant | eligibility.coApplicant |
| loan.amount | loan.amount (same) |
| security.required, weightage | security.required, weightage, **coverageDisplay**, **coveragePct** |
| interest.rate, type | interest.rate, type, margin |
| processing_fees, refundable_processing_fees | fees.processing, fees.refundable |
| repayment_tenure | repayment.tenure (+ repayment.moratorium) |
| institute.changes, level_of_study, criteria | institute.wiseChanges, levelOfStudy, criteria |
| course | course (same) |
| moratorium | moratorium (same, already per-offer) |

---

## Example 2: Secured offer (with collateral coverage %)

**Full key structure for one offer (e.g. loan 7.5L–150L, secured ≥100%):**

```json
{
  "eligibility": {
    "gender": "Equal",
    "coApplicant": "Mandatory Co-applicant"
  },
  "loan": {
    "amount": {
      "min": 750001,
      "max": 15000000
    }
  },
  "security": {
    "required": true,
    "weightage": { "min": 100, "max": 500 },
    "coverageDisplay": "≥100%",
    "coveragePct": { "minPct": 100, "maxPct": null }
  },
  "interest": {
    "rate": 9.6,
    "type": "Floating",
    "margin": 10
  },
  "fees": {
    "processing": { "min": 10000, "max": 0 },
    "refundable": true
  },
  "repayment": {
    "tenure": 15,
    "type": null,
    "moratorium": {
      "periodMonths": { "min": 12, "max": null },
      "periodDisplay": "12 months",
      "paymentDuring": "Optional"
    }
  },
  "institute": {
    "levelOfStudy": "Undergraduate (De / Di) Postgraduate (De / Di) Prof. / Tech. / Govt. approved courses",
    "wiseChanges": true,
    "criteria": "Top 1000 as per QS Rankings 2026 / Top 3000 as per webometrics.org"
  },
  "course": "Specified or Any course",
  "moratorium": {
    "periodMonths": { "min": 12, "max": null },
    "periodDisplay": "12 months",
    "paymentDuring": "Optional"
  }
}
```

Here the table row for “Secured” would show: **Coverage %** = `"≥100%"`, **Rate** = `9.6`.

---

## Whole key tree (one place)

All keys that can appear on **one offer** for Bank of India (or any bank), in standard form:

```
lender
  name
  sector

offers[]
  eligibility
    gender
    coApplicant
  loan
    amount
      min
      max
  security
    required
    weightage          ← optional legacy
    coverageDisplay    ← for table "Coverage %"
    coveragePct        ← { minPct, maxPct } for filters
  interest
    rate
    type
    margin
  fees
    processing         ← { min, max } or value
    refundable
  repayment
    tenure
    type
    moratorium
      periodMonths     ← { min, max } or { options }
      periodDisplay
      paymentDuring
  institute
    levelOfStudy
    wiseChanges
    criteria
  course
  moratorium           ← (same as repayment.moratorium if you mirror)
    periodMonths
    periodDisplay
    paymentDuring
```

---

## Summary for Bank of India

- **Unsecured:** `security.coverageDisplay: "None"`, `security.coveragePct: null`, `security.required: false`. Table: “None” in Coverage %, rate in Rate column.
- **Secured:** `security.coverageDisplay: "≥100%"` (or whatever band), `security.coveragePct: { minPct: 100, maxPct: null }`, `security.required: true`. Table: “≥100%” in Coverage %, rate (e.g. 9.6) in Rate column.
- Rest of the keys (loan, interest, fees, repayment, institute, course, moratorium) follow the same structure for every offer; only values change.

This is how the **whole key** looks for Bank of India in standardised form.
