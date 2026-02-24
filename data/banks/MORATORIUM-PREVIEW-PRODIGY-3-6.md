# Preview: Moratorium update — Prodigy (min 3, max 6, Optional)

**Bank to update (1):** Prodigy.

**Values:**
- **periodMonths:** min = 3, max = 6 (3–6 months)
- **periodDisplay:** "3/6 months"
- **paymentDuring:** "Optional"

---

## What it will look like

### In `_keyTree.offers[0]` — BEFORE (current):

```json
{
  "moratorium_period": 3,
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
    "periodMonths": { "min": 3, "max": 6 },
    "periodDisplay": "3/6 months",
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

| Bank   | File            |
|--------|-----------------|
| Prodigy| `prodigy.json`  |

---

**Note:** Display is set to "3/6 months" (plural) to match other banks. If you prefer "3/6 month" (singular), say so and it can be updated.

**Reply with permission (e.g. "yes" or "go ahead") to apply this change.**
