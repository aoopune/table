# Security weightage (coverage %) & interest rate: data model for complex queries

**Goal:** Security weightage = **% of loan amount that must be covered by collateral**. When the client selects **"Secured"**, the table should show: **"If this much coverage % → this much rate"** in respective columns, so any complex query (by coverage band, rate, secured/unsecured) can be answered.

---

## 1. What you have today

- **security.required**: true/false (secured vs unsecured).
- **security.weightage**: either string `"None"` or object `{ min: 100, max: 500 }` (meaning may vary by bank).
- **interest.rate**: number on each offer.

Each **offer** = one (loan band, security tier, …) with one **rate** and one **weightage**. So the link “this coverage % → this rate” is already there: same row has both.

---

## 2. Standardise security so coverage % is queryable and displayable

Store **coverage %** in two ways: one for **display**, one for **querying**.

### On each offer, under `security`:

| Field | Purpose | Example values |
|-------|---------|----------------|
| **required** | Secured vs unsecured | `true` / `false` |
| **coverageDisplay** | Exact text for table column “Coverage %” | `"≥90%"`, `"75%–<100%"`, `"50%–<75%"`, `"None"`, `"≥100%"`, `"≥125%"`, `"≥80%"`, `"≥133%"`, `"50%–<100%"` |
| **coveragePct** | Queryable range (for filters) | `{ "minPct": 90, "maxPct": null }` for “≥90%”; `{ "minPct": 75, "maxPct": 100 }` for “75%–<100%”; `null` for “None” |

- **None** = no collateral → `required: false`, `coverageDisplay: "None"`, `coveragePct: null`.
- **Secured** = any band other than None → `required: true`, `coverageDisplay` and `coveragePct` as above.

**interest.rate** stays on the same offer. So each row already gives: **(coverage % → rate)**.

---

## 3. Mapping your bands to queryable ranges

| coverageDisplay | coveragePct | Meaning |
|-----------------|-------------|---------|
| None | `null` | Unsecured |
| ≥133% | `{ "minPct": 133, "maxPct": null }` | 133% and above |
| ≥125% | `{ "minPct": 125, "maxPct": null }` | 125% and above |
| ≥100% | `{ "minPct": 100, "maxPct": null }` | 100% and above |
| ≥90% | `{ "minPct": 90, "maxPct": null }` | 90% and above |
| ≥80% | `{ "minPct": 80, "maxPct": null }` | 80% and above |
| 75%–<100% | `{ "minPct": 75, "maxPct": 100 }` | 75 to under 100 |
| 50%–<100% | `{ "minPct": 50, "maxPct": 100 }` | 50 to under 100 |
| 50%–<75% | `{ "minPct": 50, "maxPct": 75 }` | 50 to under 75 |

So:
- **Unsecured:** `coverageDisplay === "None"`, `coveragePct === null`.
- **Secured:** `coverageDisplay` is one of the bands above, `coveragePct` has min/max (or min only for “≥X%”).

---

## 4. How the client answers queries

### “Show me secured offers”

- Filter offers where `security.required === true` (or `security.coverageDisplay !== "None"`).
- Table columns: **Bank**, **Coverage %** (= `security.coverageDisplay`), **Rate** (= `interest.rate`), Loan amount, etc.
- So the table says: **“If this much coverage % → this much rate”** per row.

### “Show me unsecured offers”

- Filter where `security.coverageDisplay === "None"` (or `security.required === false`).

### “Secured, coverage ≥ 90%”

- Filter where `security.coveragePct != null` and `security.coveragePct.minPct >= 90` (and optionally `maxPct` if you need “within band”).

### “Secured, rate ≤ 11%”

- Filter secured offers and then `interest.rate <= 11`.

### “Secured, coverage ≥ 90%, rate ≤ 11%”

- Combine: `security.required === true`, `coveragePct.minPct >= 90`, `interest.rate <= 11`.

So **any combination** of secured/unsecured, coverage band, and rate can be answered from these fields.

---

## 5. What to put in the bank JSON files

**Option A – Add fields, keep current weightage (easiest)**

- Keep existing `security.required` and `security.weightage`.
- Add on each offer:
  - **security.coverageDisplay**: string, one of the bands above (e.g. `"≥90%"`, `"75%–<100%"`, `"None"`).
  - **security.coveragePct**: `null` for None, else `{ "minPct": number, "maxPct": number | null }`.

So each offer looks like:

```json
"security": {
  "required": true,
  "weightage": { "min": 100, "max": 500 },
  "coverageDisplay": "≥100%",
  "coveragePct": { "minPct": 100, "maxPct": null }
},
"interest": { "rate": 10.99, "type": "Floating" }
```

**Option B – Replace weightage**

- Replace `security.weightage` by **coverageDisplay** + **coveragePct** only (and keep **required**). Same behaviour, fewer fields.

---

## 6. Example table when client selects “Secured”

| Bank | Coverage % | Rate | Loan amount | … |
|------|------------|------|-------------|---|
| Yes Bank | ≥100% | 10.99% | 1–125L | … |
| Union Bank | 75%–<100% | 12% | 40–150L | … |
| Union Bank | 50%–<75% | 13% | 40–150L | … |

Each row = one offer. **Coverage %** = `security.coverageDisplay`, **Rate** = `interest.rate`. So the model already supports “if this coverage % then this rate” for any complex query; you only need to add **coverageDisplay** and **coveragePct** (and optionally align existing weightage with these bands).

---

## 7. Summary

- **One row per offer** = one (loan band, coverage band, rate). So “this coverage % → this rate” is already in the data.
- Add **security.coverageDisplay** (for table “Coverage %”) and **security.coveragePct** (for filters like “≥90%”, “75%–<100%”).
- **None** = unsecured; **coveragePct: null**.
- Client: “Secured” → filter by **required** or **coverageDisplay !== "None"**, then show **Coverage %** and **Rate**; any extra filter on coverage band or rate is just more conditions on **coveragePct** and **interest.rate**.

This keeps your data model able to answer complex queries (secured/unsecured, by coverage band, by rate, and combinations) while making the “if this much coverage % then this much rate” table straightforward to build from the same structure.
