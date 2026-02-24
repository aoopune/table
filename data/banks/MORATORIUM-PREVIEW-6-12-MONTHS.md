# Preview: Moratorium update (min 6, max 12, Optional)

**Banks to update (3):** Karur Vyasa Bank, City Union Bank, Tamilnad Mercantile Bank.

**Values:**
- **periodMonths:** min = 6, max = 12 (6–12 months; “12 months or 6 months after getting job, whichever is earlier”)
- **periodDisplay:** "12 months or 6 months after getting job, whichever is earlier"
- **paymentDuring:** "Optional"

---

## What it will look like

### In each bank's `_keyTree.offers[0]` — BEFORE (current):

```json
{
  "moratorium_period": 12,
  "course": "...",
  "payment_during_moratorium": "Optional",
  "level_of_study": "...",
  ...
}
```

### In each bank's `_keyTree.offers[0]` — AFTER (new):

```json
{
  "moratorium": {
    "periodMonths": { "min": 6, "max": 12 },
    "periodDisplay": "12 months or 6 months after getting job, whichever is earlier",
    "paymentDuring": "Optional"
  },
  "course": "...",
  "level_of_study": "...",
  ...
}
```

Change: remove `moratorium_period` and `payment_during_moratorium`, add the `moratorium` object above (in **_keyTree** only).

---

## Files to update (3)

| # | Bank name              | File                          |
|---|-------------------------|-------------------------------|
| 1 | Karur Vyasa Bank        | `karur-vyasa-bank.json`       |
| 2 | City Union Bank         | `city-union-bank.json`        |
| 3 | Tamilnad Mercantile Bank| `tamilnad-mercantile-bank.json` |

---

**Reply with permission (e.g. "yes" or "go ahead") to apply these changes to all 3 files.**
