# Preview: Moratorium update — Dhanlaxmi Bank (min 6, max null, Optional)

**Bank to update (1):** Dhanlaxmi Bank.

**Values:**
- **periodMonths:** min = 6, max = null (6 months or more)
- **periodDisplay:** "6 months after getting job, whichever is earlier"
- **paymentDuring:** "Optional"

---

## What it will look like

### In `_keyTree.offers[0]` — BEFORE (current):

```json
{
  "moratorium_period": 6,
  "course": "Any Course",
  "payment_during_moratorium": "Optional",
  "level_of_study": "...",
  ...
}
```

### In `_keyTree.offers[0]` — AFTER (new):

```json
{
  "moratorium": {
    "periodMonths": { "min": 6, "max": null },
    "periodDisplay": "6 months after getting job, whichever is earlier",
    "paymentDuring": "Optional"
  },
  "course": "Any Course",
  "level_of_study": "...",
  ...
}
```

Change: remove `moratorium_period` and `payment_during_moratorium`, add the `moratorium` object above (in **_keyTree** only).

---

## File to update (1)

| Bank           | File                   |
|----------------|------------------------|
| Dhanlaxmi Bank | `dhanlaxmi-bank.json`  |

---

**Reply with permission (e.g. "yes" or "go ahead") to apply this change.**
