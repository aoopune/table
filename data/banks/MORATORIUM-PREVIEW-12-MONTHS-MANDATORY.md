# Preview: Moratorium update (12 months, max null, Mandatory)

**Banks to update (3):** South Indian Bank, Poonawalla Fincorp, Yes Bank.

**Values:**
- **periodMonths:** min = 12, max = null (12 months or more)
- **periodDisplay:** "12 months"
- **paymentDuring:** **"Mandatory"** (not Optional)

---

## What it will look like

### In each bank's `_keyTree.offers[0]` — BEFORE (current):

```json
{
  "moratorium_period": 12,
  "course": "...",
  "payment_during_moratorium": "Mandatory",
  "level_of_study": "...",
  ...
}
```

### In each bank's `_keyTree.offers[0]` — AFTER (new):

```json
{
  "moratorium": {
    "periodMonths": { "min": 12, "max": null },
    "periodDisplay": "12 months",
    "paymentDuring": "Mandatory"
  },
  "course": "...",
  "level_of_study": "...",
  ...
}
```

Change: remove `moratorium_period` and `payment_during_moratorium`, add the `moratorium` object above (in **_keyTree** only).

---

## Files to update (3)

| # | Bank name           | File                      |
|---|---------------------|---------------------------|
| 1 | South Indian Bank   | `south-indian-bank.json`  |
| 2 | Poonawalla Fincorp  | `poonawalla-fincorp.json` |
| 3 | Yes Bank            | `yes-bank.json`           |

---

**Reply with permission (e.g. "yes" or "go ahead") to apply these changes to all 3 files.**
