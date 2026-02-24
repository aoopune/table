# Preview: Moratorium update (min 6, max null; 6 months display)

**Banks to update (5):** State Bank of India, Mpower, ICICI Bank, Axis bank, Credila.

**Values (common):**
- **periodMonths:** min = 6, max = null (6 months or more)
- **periodDisplay:** "6 months"

**paymentDuring:**
- **Optional:** State Bank of India, Mpower, ICICI Bank, Axis bank
- **Mandatory:** Credila only

---

## What it will look like

### State Bank of India, Mpower, ICICI Bank, Axis bank — AFTER (in `_keyTree.offers[0]`):

```json
"moratorium": {
  "periodMonths": { "min": 6, "max": null },
  "periodDisplay": "6 months",
  "paymentDuring": "Optional"
},
"course": "...",
"level_of_study": "...",
```

### Credila — AFTER (in `_keyTree.offers[0]`):

```json
"moratorium": {
  "periodMonths": { "min": 6, "max": null },
  "periodDisplay": "6 months",
  "paymentDuring": "Mandatory"
},
"course": "...",
"level_of_study": "...",
```

Change in each file: remove `moratorium_period` and `payment_during_moratorium`, add the `moratorium` object above (in **_keyTree** only). Credila gets `paymentDuring: "Mandatory"`; the other four get `"Optional"`.

---

## Files to update (5)

| # | Bank                | File                      | paymentDuring |
|---|---------------------|---------------------------|---------------|
| 1 | State Bank of India | `state-bank-of-india.json` | Optional      |
| 2 | Mpower              | `mpower.json`            | Optional      |
| 3 | ICICI Bank          | `icici-bank.json`         | Optional      |
| 4 | Axis bank           | `axis-bank.json`          | Optional      |
| 5 | Credila             | `credila.json`            | **Mandatory** |

---

**Reply with permission (e.g. "yes" or "go ahead") to apply these changes to all 5 files.**
