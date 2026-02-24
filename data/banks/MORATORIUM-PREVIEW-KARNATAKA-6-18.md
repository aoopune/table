# Preview: Moratorium update — Karnataka Bank (min 6, max 18, Optional)

**Bank to update (1):** Karnataka Bank.

**Values:**
- **periodMonths:** min = 6, max = 18 (6 or 18 months)
- **periodDisplay:** "6 or 18 months"
- **paymentDuring:** "Optional"

---

## What it will look like

### In `_keyTree.offers[0]` — BEFORE (current):

```json
{
  "moratorium_period": 6,
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
    "periodMonths": { "min": 6, "max": 18 },
    "periodDisplay": "6 or 18 months",
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

| Bank           | File                  |
|----------------|-----------------------|
| Karnataka Bank | `karnataka-bank.json` |

---

**Reply with permission (e.g. "yes" or "go ahead") to apply this change.**
