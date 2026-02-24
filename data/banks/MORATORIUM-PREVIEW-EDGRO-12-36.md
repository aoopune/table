# Preview: Moratorium update — EdGro (min 12, max 36, Optional)

**Bank to update (1):** EdGro.

**Values:**
- **periodMonths:** min = 12, max = 36 (12–36 months)
- **periodDisplay:** "12/36 months"
- **paymentDuring:** "Optional"

---

## What it will look like

### In `_keyTree.offers[0]` — BEFORE (current):

```json
{
  "moratorium_period": 12,
  "course": "Any course",
  "payment_during_moratorium": "Optional",
  "level_of_study": "...",
  ...
}
```

### In `_keyTree.offers[0]` — AFTER (new):

```json
{
  "moratorium": {
    "periodMonths": { "min": 12, "max": 36 },
    "periodDisplay": "12/36 months",
    "paymentDuring": "Optional"
  },
  "course": "Any course",
  "level_of_study": "...",
  ...
}
```

Change: remove `moratorium_period` and `payment_during_moratorium`, add the `moratorium` object above (in **_keyTree** only).

---

## File to update (1)

| Bank  | File           |
|-------|----------------|
| EdGro | `edgro.json`   |

---

**Note:** Display is set to "12/36 months" (plural) to match other banks. If you prefer "12/36 month" (singular), say so and it can be updated.

**Reply with permission (e.g. "yes" or "go ahead") to apply this change.**
