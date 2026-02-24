# Moratorium period: how to store simple and complex values

The schema uses **`repayment.moratorium.period`** (and in `_keyTree`: **`moratoriumPeriod`**).  
Real data can be:

- **Simple:** e.g. `12` (months)
- **Complex:** e.g. *"12 months or 6 months after getting job, whichever is earlier"*, *"12/36 months"*, *"6 or 18 months"*, *"3 or 6 months"*

Use **one** of the patterns below so all banks can be handled the same way.

---

## Option 1: Single field — number or string (minimal change)

Keep one field that can be either a number or a full description.

| Type   | Example value | Use when |
|--------|----------------|----------|
| Number | `12`           | Simple: "12 months" |
| String | `"12 months or 6 months after getting job, whichever is earlier"` | Complex / conditional |

**In JSON (offer or _keyTree):**

```json
"moratorium": {
  "period": 12,
  "paymentDuring": "Optional"
}
```

or

```json
"moratorium": {
  "period": "12 months or 6 months after getting job, whichever is earlier",
  "paymentDuring": "Mandatory"
}
```

**Pros:** Very simple, no schema change.  
**Cons:** Complex values are not machine-parseable for filters/sorting.

---

## Option 2: Display + optional structured (recommended)

Use **`periodDisplay`** for the exact wording and **`period`** for a number when you have a single value.  
For ranges/options, add **`periodMonths`** so you can filter/sort.

**Shape:**

- **periodDisplay** (string): Exact text to show in UI.  
  Examples:  
  `"12 months"`,  
  `"12 months or 6 months after getting job, whichever is earlier"`,  
  `"12/36 months"`,  
  `"6 or 18 months"`,  
  `"3 or 6 months"`.
- **period** (number, optional): Single value in months when the rule is just "X months".  
  Omit when the rule is conditional or has multiple options.
- **periodMonths** (object, optional): For ranges or options.
  - **min** / **max**: e.g. `"3 or 6 months"` → `{ "min": 3, "max": 6 }`
  - **options**: e.g. `"12/36 months"` → `{ "options": [12, 36] }`  
  Use whichever fits your data and queries.

**Examples in `repayment.moratorium` (or _keyTree equivalent):**

```json
"moratorium": {
  "periodDisplay": "12 months",
  "period": 12,
  "paymentDuring": "Optional"
}
```

```json
"moratorium": {
  "periodDisplay": "12 months or 6 months after getting job, whichever is earlier",
  "periodMonths": { "min": 6, "max": 12 },
  "paymentDuring": "Mandatory"
}
```

```json
"moratorium": {
  "periodDisplay": "12/36 months",
  "periodMonths": { "options": [12, 36] },
  "paymentDuring": "Optional"
}
```

```json
"moratorium": {
  "periodDisplay": "6 or 18 months",
  "periodMonths": { "options": [6, 18] },
  "paymentDuring": "Optional"
}
```

```json
"moratorium": {
  "periodDisplay": "3 or 6 months",
  "periodMonths": { "options": [3, 6] },
  "paymentDuring": "Optional"
}
```

**Pros:** One place for UI text; optional structure for logic.  
**Cons:** Slightly more fields.

---

## Option 3: period as object only

Encode everything inside **`period`**:

```json
"moratorium": {
  "period": {
    "display": "12 months or 6 months after getting job, whichever is earlier",
    "months": [12, 6],
    "condition": "whichever is earlier"
  },
  "paymentDuring": "Optional"
}
```

**Pros:** Single key for period.  
**Cons:** All consumers must handle an object; backward-incompatible with current single number.

---

## Recommendation

Use **Option 2**:

1. Add **`periodDisplay`** and use it for **all** moratorium texts (simple and complex).
2. Keep **`period`** as an optional number for simple "X months" cases.
3. Add **`periodMonths`** (with `min`/`max` or `options`) when you have ranges/options so you can filter/sort.

**Mapping your examples:**

| Your description | periodDisplay | period | periodMonths |
|------------------|--------------|--------|--------------|
| 12 months | `"12 months"` | `12` | omit |
| 12 months or 6 months after getting job, whichever is earlier | `"12 months or 6 months after getting job, whichever is earlier"` | omit | `{ "min": 6, "max": 12 }` |
| 12/36 months | `"12/36 months"` | omit | `{ "options": [12, 36] }` |
| 6 months after getting job, whichever is earlier | `"6 months after getting job, whichever is earlier"` | omit | optional e.g. `{ "min": 6, "max": 6 }` |
| 6 or 18 months | `"6 or 18 months"` | omit | `{ "options": [6, 18] }` |
| 3 or 6 months | `"3 or 6 months"` | omit | `{ "options": [3, 6] }` |

**Where to show this:**  
In each bank file, put this under **`repayment.moratorium`** in the main **offers[]**, and if you keep **_keyTree**, mirror the same structure there (e.g. **`moratoriumPeriodDisplay`**, **`moratoriumPeriod`**, **`moratoriumPeriodMonths`** in camelCase).

---

## Queryability (client-side queries)

For **any** client-side query to scan moratorium correctly for each bank:

- **Always** populate **`periodMonths`** (with `min`/`max` or `options`) so the client can filter/sort without parsing text.
- For simple "X months", use `periodMonths: { "min": X, "max": X }`.
- Full rules and how the client should interpret these fields: see **`MORATORIUM-QUERY-CONTRACT.md`**.
