# Data model: support for complex client-side queries

**Yes.** The data model is designed so that **any complex query from the client** can be answered by combining bank files and institutes.json with the documented query semantics.

---

## Data sources

| Source | Role |
|--------|------|
| **data/banks/*.json** | One file per bank. Root `lender` (name, sector) and **offers[]** (one row per product/variant). Each offer has all queryable dimensions. |
| **data/institutes.json** | Rows (lenderName, university, country, criteria, **course**). Used for “university + bank → course” and “which banks cover this university”. |

---

## Query dimensions (what the client can filter / display)

| Dimension | Where it lives | How to query |
|-----------|----------------|---------------|
| **Lender / bank** | `lender.name` in each bank file | Filter by bank name or load one file per bank. |
| **Loan amount** | `offer.loan.amount.min`, `offer.loan.amount.max` | e.g. “loan between 10L and 40L” → `min <= 40L && max >= 10L`. |
| **Security** | `offer.security.required`, `offer.security.weightage` | e.g. “secured only” → `required === true`; “unsecured” → `required === false`. |
| **Interest** | `offer.interest.rate`, `offer.interest.type`, `offer.margin` | e.g. “rate ≤ 10%” → filter by `rate`. |
| **Fees** | `offer.processing_fees`, `offer.refundable_processing_fees` (or `fees.processing`, `fees.refundable` when standardised) | e.g. “zero processing” → filter by processing_fees. |
| **Repayment tenure** | `offer.repayment_tenure` (or `repayment.tenure`) | e.g. “tenure ≥ 15 years”. |
| **Moratorium** | `offer.moratorium.periodMonths` (min/max or options), `periodDisplay`, `paymentDuring` | e.g. “moratorium ≥ 12 months” → use `periodMonths.max >= 12`; “moratorium = 6 or 12” → use periodMonths.options or min/max. See **MORATORIUM-QUERY-CONTRACT.md**. |
| **University** | **institutes.json** (`university`, `lenderName`, `criteria`, `country`, **course**) | e.g. “Banks for University X” → filter institutes.json by `university === X`; join to bank file by lenderName for full offer. |
| **Course (for a university)** | **institutes.json** `course`; or **offer.course** when no university list (`institute.changes === false`) | e.g. “Course for (Bank, University)” → from institutes.json row; if bank has no list, use offer.course = “Any course”. See **COURSE-INSTITUTE-QUERY-LOGIC.md**. |
| **Institute list (yes/no)** | `offer.institute.changes` (or `wiseChanges`) | e.g. “Banks with a university list” → `changes === true`; “Banks open to all universities” → `changes === false`. |
| **Level of study** | `offer.institute.level_of_study` (or `levelOfStudy`) | e.g. “Postgraduate only” → substring or exact match. |
| **Eligibility** | `offer.gender`, `offer.coapplicant` (or under `eligibility` when standardised) | e.g. “Female only” → filter by gender. |
| **Process** | `_keyTree` or process fields (e.g. avgTimeToSanction, dedicatedCaseManager, onboarding_process) | e.g. “Hybrid onboarding” → filter by onboarding. |

---

## How complex queries are answered

1. **Single-dimension**  
   Filter offers (or institutes) by one field (e.g. loan amount, moratorium, university).

2. **Multi-dimension**  
   Apply several filters in sequence:
   - e.g. “Loan 10–40L, secured, moratorium ≥ 12 months, for University X”  
   - Filter offers by `loan.amount`, `security.required`, `moratorium.periodMonths`  
   - For “for University X”: take lenders that appear in institutes.json for university X **or** have `institute.changes === false`  
   - Join to institutes.json to get **course** for that university (or “Any course”).

3. **University + course**  
   - Filter institutes.json by `university === selectedUniversity` → rows (lenderName, criteria, country, **course**)  
   - Add lenders with `institute.changes === false` and **course** = “Any course”  
   - Table: Bank, **Course**, Criteria, Country, etc.

4. **Moratorium**  
   - Per offer: derive (minMonths, maxMonths) from `moratorium.periodMonths` (min/max or options)  
   - Apply predicate (e.g. “moratorium ≥ 12” → `maxMonths >= 12`).  
   See **data/banks/MORATORIUM-QUERY-CONTRACT.md**.

---

## Summary

- **Bank JSON files** hold all offer-level dimensions (loan, security, interest, fees, repayment, moratorium, institute, course, eligibility, etc.) so the client can filter and sort on them.
- **institutes.json** holds (lenderName, university, country, criteria, **course**) so the client can answer “which banks for this university?” and “what course for (bank, university)?”.
- **Moratorium** is queryable via `periodMonths` (min/max or options) and display via `periodDisplay` / `paymentDuring`.
- **Course for a university** comes from institutes.json for banks with a list, and “Any course” from the offer for banks with no list.

As long as the client uses the documented structure (offer keys, institutes.json fields, moratorium semantics, course logic), **any complex query that can be expressed in terms of these dimensions can be answered** by the current data model.
