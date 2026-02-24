# Delayed EMI Payment – Data Model & Client Queries

Delayed EMI payment rules vary by bank: some are a simple % per month, others depend on **days overdue**, **loan amount**, **quota**, or are **narrative** (“As per contract”). This document defines how to represent all cases in the data model and how the client can answer complex queries.

- **Schema**: `data/banks/delayed-emi-payment-schema.json` (JSON Schema for validation).
- **Client display**: `index.html` uses `fmtDelayedEmiPayment(delayed_emi_payment)` — it shows `display` when present, otherwise legacy `min`–`max` or a primitive.

---

## 1. Data model overview

`delayed_emi_payment` is **one of**:

| Type | Use when | Query support |
|------|----------|----------------|
| **simple** (percent) | Single % or min–max % per month | `summary.maxPercentPerMonth` / `minPercentPerMonth` |
| **simple** (fixed) | Fixed Rs/day or Rs/month | `summary.maxRupeesPerDay` etc. |
| **conditional** | Rules by days overdue / loan amount / quota | `rules[]` + `summary` for bounds |
| **narrative** | Text only (“As per contract”, “As per default slab”) | Filter by “has narrative” only |
| **legacy** | Current `min`/`max` object (backward compatible) | Treat as simple % when numeric |

**Always** provide a **`display`** string for the table cell. For queryable types, provide **`summary`** with numeric bounds so the client can filter without evaluating rules.

---

## 2. Examples for your cases

### 2.1 Time-based: “0.2% if <60 days, 0.42% if >60 days”

```json
{
  "type": "conditional",
  "unit": "percent_per_month",
  "rules": [
    { "condition": { "days_overdue_lt": 60 }, "value": { "percent": 0.2, "per": "month" } },
    { "condition": { "days_overdue_gte": 60 }, "value": { "percent": 0.42, "per": "month" } }
  ],
  "display": "0.2% if <60 days, 0.42% if >60 days",
  "summary": { "minPercentPerMonth": 0.2, "maxPercentPerMonth": 0.42 }
}
```

### 2.2 Time-based: “0.08% if <60 days, 0.2% if >60 days”

```json
{
  "type": "conditional",
  "unit": "percent_per_month",
  "rules": [
    { "condition": { "days_overdue_lt": 60 }, "value": { "percent": 0.08, "per": "month" } },
    { "condition": { "days_overdue_gte": 60 }, "value": { "percent": 0.2, "per": "month" } }
  ],
  "display": "0.08% if <60 days, 0.2% if >60 days",
  "summary": { "minPercentPerMonth": 0.08, "maxPercentPerMonth": 0.2 }
}
```

### 2.3 Loan amount: “0.2%, if the loan > Rs. 4 Lakh”

```json
{
  "type": "conditional",
  "unit": "percent_per_month",
  "rules": [
    { "condition": { "loan_amount_lakh_gt": 4 }, "value": { "percent": 0.2, "per": "month" } }
  ],
  "display": "0.2%, if the loan > Rs. 4 Lakh",
  "summary": { "minPercentPerMonth": 0.2, "maxPercentPerMonth": 0.2 }
}
```

### 2.4 Loan amount: “0.08% if loan < Rs. 2 lakh, 0.2% if loan > Rs. 2 lakh”

```json
{
  "type": "conditional",
  "unit": "percent_per_month",
  "rules": [
    { "condition": { "loan_amount_lakh_lt": 2 }, "value": { "percent": 0.08, "per": "month" } },
    { "condition": { "loan_amount_lakh_gte": 2 }, "value": { "percent": 0.2, "per": "month" } }
  ],
  "display": "0.08%, if loan < Rs. 2 lakh; 0.2%, if loan > Rs. 2 lakh",
  "summary": { "minPercentPerMonth": 0.08, "maxPercentPerMonth": 0.2 }
}
```

### 2.5 Narrative: “As per contract”

```json
{
  "type": "narrative",
  "display": "As per contract"
}
```

### 2.6 Mixed: “2%, Max. Rs. 300; 7.5% of EMI bounced Min. Rs. 400 & Max. Rs. 1000”

```json
{
  "type": "conditional",
  "unit": "mixed",
  "rules": [
    { "value": { "percent": 2, "cap_rupees": 300, "per": "month" } },
    { "value": { "percent": 7.5, "of": "emi_bounced", "min_rupees": 400, "max_rupees": 1000 } }
  ],
  "display": "2%, Max. Rs. 300; 7.5% of EMI bounced Min. Rs. 400 & Max. Rs. 1000",
  "summary": { "maxPercentPerMonth": 7.5 }
}
```

### 2.7 Narrative: “As per default amount slab”

```json
{
  "type": "narrative",
  "display": "As per default amount slab"
}
```

### 2.8 Loan + quota: “0.2% if loan > Rs. 4 lakhs; If Mgmt. quota 0.2%”

```json
{
  "type": "conditional",
  "unit": "percent_per_month",
  "rules": [
    { "condition": { "loan_amount_lakh_gt": 4 }, "value": { "percent": 0.2, "per": "month" } },
    { "condition": { "quota": "management" }, "value": { "percent": 0.2, "per": "month" } }
  ],
  "display": "0.2%, if loan > Rs. 4 lakhs; If Mgmt. quota 0.2%",
  "summary": { "minPercentPerMonth": 0.2, "maxPercentPerMonth": 0.2 }
}
```

### 2.9 Fixed: “Rs. 25/day”

```json
{
  "type": "simple",
  "unit": "rupees_per_day",
  "amount": 25,
  "display": "Rs. 25/day",
  "summary": { "minRupeesPerDay": 25, "maxRupeesPerDay": 25 }
}
```

### 2.10 Simple percentage (most banks)

```json
{
  "type": "simple",
  "unit": "percent_per_month",
  "min": 0.2,
  "max": 0.2,
  "display": "0.2%",
  "summary": { "minPercentPerMonth": 0.2, "maxPercentPerMonth": 0.2 }
}
```

---

## 3. Client: display in table

Use **`display`** for the “Delayed EMI payment” column:

- If the value is an object and has **`display`**, use `delayed_emi_payment.display`.
- Else if it’s an object with **`min`** / **`max`** (legacy), show `min + '–' + max` (or just one if the other is null).
- Else if it’s a string/number, show it; otherwise show `"N/A"`.

This keeps the table correct for both the new model and existing bank files.

---

## 4. Client: answering complex queries

### 4.1 Helper: get numeric bounds

```js
function getDelayedEmiBounds(delayedEmiPayment) {
  if (!delayedEmiPayment || typeof delayedEmiPayment !== 'object') return null;
  const s = delayedEmiPayment.summary;
  if (s) return s;
  // Legacy min/max (numbers only)
  const min = delayedEmiPayment.min;
  const max = delayedEmiPayment.max;
  if (typeof min === 'number' && typeof max === 'number')
    return { minPercentPerMonth: min, maxPercentPerMonth: max };
  if (typeof min === 'number') return { minPercentPerMonth: min, maxPercentPerMonth: min };
  if (typeof max === 'number') return { minPercentPerMonth: max, maxPercentPerMonth: max };
  return null;
}
```

### 4.2 Query: “Banks where delayed EMI penalty is at most X% per month”

- For each offer, get `bounds = getDelayedEmiBounds(shared.delayed_emi_payment)`.
- If `bounds == null` → narrative or unknown; either exclude or treat as “no bound”.
- Keep offer if `bounds.maxPercentPerMonth != null && bounds.maxPercentPerMonth <= X`.

### 4.3 Query: “Banks where penalty is at most X% when loan &lt; 2 lakh”

- If you only have **summary**: use `maxPercentPerMonth` (worst case); this may over-include (e.g. 0.2% only when loan > 4L).
- For **exact** answer: evaluate **rules** with context `{ loan_amount_lakh: 2 }`:
  - Find rules whose condition matches (e.g. `loan_amount_lakh_lt: 2` or `loan_amount_lakh_gte: 2` for boundary).
  - Take the **value** (e.g. `percent`) for the matching rule(s) and compare to X.

### 4.4 Query: “Banks where penalty is at most X% when days overdue &lt; 60”

- Same idea: use **summary** for a quick “worst case” filter, or evaluate **rules** with context `{ days_overdue: 59 }` and compare the resulting percent to X.

### 4.5 Query: “Show only narrative / only structured”

- **Narrative**: `delayed_emi_payment.type === 'narrative'`.
- **Structured (queryable)**: `delayed_emi_payment.type === 'simple' || delayed_emi_payment.type === 'conditional'`, or `getDelayedEmiBounds(delayed_emi_payment) != null`.

---

## 5. Unit (per month vs per day)

- **percent_per_month**: All “%” in your examples are per month unless stated otherwise.
- **rupees_per_day**: Use for “Rs. 25/day”.
- Keep **unit** in the schema so the client can show “% per month” vs “Rs/day” in the UI and convert if needed for comparison.

---

## 6. Backward compatibility

Existing bank files use `delayed_emi_payment: { min, max }` (sometimes with string `min`, e.g. “as per contract”). The client should:

1. **Display**: If object has `display`, use it; else use `min`–`max` (or single value) as today.
2. **Query**: If object has `summary`, use it; else if `min`/`max` are numbers, treat as simple % and use them as `minPercentPerMonth` / `maxPercentPerMonth`.

No need to change every bank file at once; migrate to the new shapes (with `type`, `rules`, `display`, `summary`) as you go.
