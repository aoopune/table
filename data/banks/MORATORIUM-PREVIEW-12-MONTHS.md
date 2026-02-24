# Preview: Moratorium update (12 months, max null, Optional)

**Banks to update (22):**  
Bank of India, Union Bank of India, Federal Bank, IDFC First Bank, Tata Capital, Auxilo, Indian Overseas Bank, IDBI Bank, InCred, Avanse, Jammu and Kashmir Grameen Bank, RBL Bank, Leap finance, Saraswat Co-operative Bank, Nainital Bank, UCO Bank, Bank of Maharashtra, DCB Bank, Jammu & Kashmir Bank, Canara Bank, Bank of Baroda, Punjab National Bank.

**Values:**
- **periodMonths:** min = 12, max = null (12 months or more)
- **periodDisplay:** "12 months"
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
    "periodMonths": { "min": 12, "max": null },
    "periodDisplay": "12 months",
    "paymentDuring": "Optional"
  },
  "course": "...",
  "level_of_study": "...",
  ...
}
```

So in every file we will:
1. Remove `"moratorium_period": 12,`
2. Remove `"payment_during_moratorium": "Optional",`
3. Add the `"moratorium": { ... }` object above (only in **_keyTree**; main `offers[]` is unchanged).

---

## Files to update (22)

| # | Bank name | File |
|---|-----------|------|
| 1 | Bank of India | `bank-of-india.json` |
| 2 | Union Bank of India | `union-bank-of-india.json` |
| 3 | Federal Bank | `federal-bank.json` |
| 4 | IDFC First Bank | `idfc-first-bank.json` |
| 5 | Tata Capital | `tata-capital.json` |
| 6 | Auxilo | `auxilo.json` |
| 7 | Indian Overseas Bank | `indian-overseas-bank.json` |
| 8 | IDBI Bank | `idbi-bank.json` |
| 9 | InCred | `incred.json` |
| 10 | Avanse | `avanse.json` |
| 11 | Jammu and Kashmir Grameen Bank | `jammu-and-kashmir-grameen-bank.json` |
| 12 | RBL Bank | `rbl-bank.json` |
| 13 | Leap finance | `leap-finance.json` |
| 14 | Saraswat Co-operative Bank | `saraswat-co-operative-bank.json` |
| 15 | Nainital Bank | `nainital-bank.json` |
| 16 | UCO Bank | `uco-bank.json` |
| 17 | Bank of Maharashtra | `bank-of-maharashtra.json` |
| 18 | DCB Bank | `dcb-bank.json` |
| 19 | Jammu & Kashmir Bank | `jammu--kashmir-bank.json` |
| 20 | Canara Bank | `canara-bank.json` |
| 21 | Bank of Baroda | `bank-of-baroda.json` |
| 22 | Punjab National Bank | `punjab-national-bank.json` |

---

**Reply with permission (e.g. "yes" or "go ahead") to apply these changes to all 22 files.**
