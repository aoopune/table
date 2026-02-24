# Bank JSON Data Model Analysis

**Reference standard:** `offer-key-tree-schema.json` (expression-tree of keys: nested structure with camelCase field names).

---

## Summary Table: Standard vs Not Standard

| Bank (file) | Data model | Status |
|-------------|------------|--------|
| aditya-birla-capital | Relational / tree (non-standard keys) | **Not standard** |
| auxilo | Relational / tree (non-standard keys) | **Not standard** |
| avanse | Relational / tree (non-standard keys) | **Not standard** |
| axis-bank | Relational / tree (non-standard keys) | **Not standard** |
| bank-of-baroda | Relational / tree (non-standard keys) | **Not standard** |
| bank-of-india | Relational / tree (non-standard keys) | **Not standard** |
| bank-of-maharashtra | Relational / tree (non-standard keys) | **Not standard** |
| canara-bank | Relational / tree (non-standard keys) | **Not standard** |
| city-union-bank | Relational / tree (non-standard keys) | **Not standard** |
| credila | Relational / tree (non-standard keys) | **Not standard** |
| dcb-bank | Relational / tree (non-standard keys) | **Not standard** |
| dhanlaxmi-bank | Relational / tree (non-standard keys) | **Not standard** |
| edgro | Relational / tree (non-standard keys) | **Not standard** |
| federal-bank | Relational / tree (non-standard keys) | **Not standard** |
| icici-bank | Relational / tree (non-standard keys) | **Not standard** |
| idbi-bank | Relational / tree (non-standard keys) | **Not standard** |
| idfc-first-bank | Relational / tree (non-standard keys) | **Not standard** |
| incred | Relational / tree (non-standard keys) | **Not standard** |
| indian-overseas-bank | Relational / tree (non-standard keys) | **Not standard** |
| jammu--kashmir-bank | Relational / tree (non-standard keys) | **Not standard** |
| jammu-and-kashmir-grameen-bank | Relational / tree (non-standard keys) | **Not standard** |
| karnataka-bank | Relational / tree (non-standard keys) | **Not standard** |
| karur-vyasa-bank | Relational / tree (non-standard keys) | **Not standard** |
| leap-finance | Relational / tree (non-standard keys) | **Not standard** |
| mpower | Relational / tree (non-standard keys) | **Not standard** |
| nainital-bank | Relational / tree (non-standard keys) | **Not standard** |
| poonawalla-fincorp | Relational / tree (non-standard keys) | **Not standard** |
| prodigy | Relational / tree (non-standard keys) | **Not standard** |
| punjab-national-bank | Relational / tree (non-standard keys) | **Not standard** |
| punjab-national-bank-relational-example | Relational / tree (non-standard keys) | **Not standard** |
| rbl-bank | Relational / tree (non-standard keys) | **Not standard** |
| saraswat-co-operative-bank | Relational / tree (non-standard keys) | **Not standard** |
| south-indian-bank | Relational / tree (non-standard keys) | **Not standard** |
| state-bank-of-india | Relational / tree (non-standard keys) | **Not standard** |
| tamilnad-mercantile-bank | Relational / tree (non-standard keys) | **Not standard** |
| tata-capital | Relational / tree (non-standard keys) | **Not standard** |
| uco-bank | Relational / tree (non-standard keys) | **Not standard** |
| union-bank-of-india | Relational / tree (non-standard keys) | **Not standard** |
| yes-bank | Relational / tree (non-standard keys) | **Not standard** |

*Excluded from table: `offer-key-tree-schema.json`, `bank-offer-schema.json`, `manifest.json` (not bank data).*

**Result:** **0** files are standard; **39** bank files use a consistent but non-standard data model (same structure, wrong key names and nesting vs schema).

---

## What to Fix in the JSON Files

To align with **offer-key-tree-schema.json**, apply the following changes across all bank JSON files.

### 1. Root / offer keys – naming and nesting

| Current (in files) | Standard (schema) | Fix |
|-------------------|-------------------|-----|
| `repayment_tenure` (object `{ tenure, type }` or number) | `repayment.tenure` (number) and `repayment.moratorium.period` / `repayment.moratorium.paymentDuring` | Move tenure under `repayment`; use `repayment.tenure`. For moratorium, use `repayment.moratorium.period` and `repayment.moratorium.paymentDuring` (values can come from `_keyTree` or stay at offer level as needed). |
| `processing_fees` (object with min/max) | `fees.processing` | Nest under `fees`: `fees.processing` (keep min/max structure if needed). |
| `refundable_processing_fees` (at offer root) | `fees.refundable` | Move to `fees.refundable`. |
| `coapplicant` (at offer root) | `eligibility.coApplicant` | Nest under `eligibility`: `eligibility.coApplicant`. |
| `gender` (at offer root) | `eligibility.gender` | Nest under `eligibility`: `eligibility.gender`. |
| `institute.changes` | `institute.wiseChanges` | Rename `institute.changes` → `institute.wiseChanges`. |
| `institute.level_of_study` | `institute.levelOfStudy` | Rename `institute.level_of_study` → `institute.levelOfStudy`. |

### 2. `_keyTree` – snake_case and PascalCase → camelCase

| Current (in _keyTree) | Standard | Fix |
|----------------------|----------|-----|
| `moratorium_period` | `repayment.moratorium.period` (or same name in camelCase in _keyTree) | Use `moratoriumPeriod` or align key name with schema. |
| `payment_during_moratorium` | `repayment.moratorium.paymentDuring` | Use `paymentDuringMoratorium`. |
| `level_of_study` | `institute.levelOfStudy` | Use `levelOfStudy`. |
| `delayed_emi_payment` | `process.delayedEmiPayment` | Use `delayedEmiPayment`. |
| `Average_Time_To_Sanction` | `process.avgTimeToSanction` | Use `avgTimeToSanction` (camelCase). |
| `onboarding_process` | `process.onboarding` | Use `onboarding` or `onboardingProcess`. |

### 3. Type and shape consistency

| Issue | Fix |
|-------|-----|
| `repayment_tenure` sometimes a **number** (e.g. 15), sometimes **object** `{ tenure, type }` | Standardise to schema shape: use `repayment.tenure` (number). Optionally keep `repayment.moratorium` with `period` and `paymentDuring`; map `type` (e.g. "excluding moratorium") into moratorium fields if needed. |
| `processing_fees` as `{ min, max }` with mixed semantics (e.g. min=10000, max=1) | Decide one convention (e.g. both in same unit, or min/max as percentage/cap) and document; keep structure under `fees.processing`. |
| `security.weightage` sometimes string `"None"`, sometimes object `{ min, max }` | Keep as-is for semantics; ensure consumers handle both. No key rename needed. |

### 4. Optional: Align with flat schema (`bank-offer-schema.json`)

If you also need to support the **flat** model (lender as string, one flat object per offer with `minLoan`, `maxLoan`, `security`, `levelOfStudy`, etc.):

- Either **derive** flat view from the tree (e.g. `minLoan` ← `offer.loan.amount.min`, `levelOfStudy` ← `offer.institute.levelOfStudy`), or
- Add a separate pipeline that outputs flat JSON per the flat schema; do not mix flat and tree in the same file unless documented.

### 5. Checklist per file

For each bank JSON file:

1. [ ] Rename `repayment_tenure` → nest under `repayment` as `repayment.tenure` (and normalise to number if currently object).
2. [ ] Add or use `repayment.moratorium.period` and `repayment.moratorium.paymentDuring` (from _keyTree or existing fields).
3. [ ] Nest `processing_fees` and `refundable_processing_fees` under `fees` as `fees.processing` and `fees.refundable`.
4. [ ] Nest `gender` and `coapplicant` under `eligibility` as `eligibility.gender` and `eligibility.coApplicant`.
5. [ ] In `institute`, rename `changes` → `wiseChanges` and `level_of_study` → `levelOfStudy`.
6. [ ] In `_keyTree`, use camelCase: `moratoriumPeriod`, `paymentDuringMoratorium`, `levelOfStudy`, `delayedEmiPayment`, `avgTimeToSanction`, `onboardingProcess` (or `onboarding`).
7. [ ] Ensure `lender` remains `{ name, sector }` (already correct).

---

## Summary

- **Standard:** Defined by `offer-key-tree-schema.json` (nested, camelCase).
- **Current state:** All 39 bank JSON files use the same **relational/tree** layout but with **snake_case** and different key names/nesting, so they are **not standard**.
- **To make them standard:** Apply the renames and nesting above in both the root `lender`/`offers` and in `_keyTree`, and normalise `repayment_tenure` type/shape.
