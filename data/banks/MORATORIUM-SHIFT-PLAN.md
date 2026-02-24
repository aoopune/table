# Plan: Shift moratorium from _keyTree to each offer (main offers[])

## What will be done

1. **For each bank JSON file** that has a `moratorium` object in `_keyTree.offers[0]`:
   - **Copy** the `moratorium` object (with `periodMonths`, `periodDisplay`, `paymentDuring`) from `_keyTree.offers[0]` into **every** offer in the root **`offers[]`** array.
   - **Remove** the `moratorium` key from `_keyTree.offers[0]` (so moratorium lives only on each main offer).

2. **Result:**
   - **Before:** Moratorium exists only in `_keyTree.offers[0]` (one shared value per lender).
   - **After:** Moratorium exists on **each** object in root `offers[]` (same value copied to every offer for that bank). `_keyTree.offers[0]` no longer has a `moratorium` key.

3. **Banks with no moratorium in _keyTree** (e.g. Aditya Birla Capital — moratorium is null):  
   We will **not** add moratorium to main offers for those; we can either leave _keyTree as-is or add `moratorium: { periodMonths: null, periodDisplay: null, paymentDuring: null }` to each main offer. The plan assumes: **only shift when _keyTree has a moratorium object**; if _keyTree has moratorium with nulls, add that same object to each main offer so structure is consistent.

4. **Scope:** All bank JSON files in `data/banks/` that are actual bank data (exclude schema files, manifest, relational-example if you prefer). Every file that currently has `moratorium` in `_keyTree.offers[0]` will be updated.

---

## Example: Yes Bank (1 offer in _keyTree, 5 offers in main offers[])

### Before

- **\_keyTree.offers[0]** has:
  ```json
  "moratorium": { "periodMonths": { "min": 12, "max": null }, "periodDisplay": "12 months", "paymentDuring": "Mandatory" },
  "course": "...",
  ...
  ```
- **Root offers[0], offers[1], … offers[4]** have no `moratorium` key.

### After

- **\_keyTree.offers[0]** no longer has `moratorium` (only `course`, `level_of_study`, etc.).
- **Root offers[0], offers[1], … offers[4]** each have:
  ```json
  "moratorium": {
    "periodMonths": { "min": 12, "max": null },
    "periodDisplay": "12 months",
    "paymentDuring": "Mandatory"
  },
  ```
  (plus their existing keys: gender, loan, security, …).

---

## Example: Union Bank of India (1 offer in _keyTree, 6 offers in main offers[])

- Copy _keyTree moratorium (12 months, Optional) into **each** of the 6 main offers.
- Remove moratorium from _keyTree.offers[0].

---

## Summary

| Step | Action |
|------|--------|
| 1 | For each bank file, read `moratorium` from `_keyTree.offers[0]`. |
| 2 | For each item in root `offers[]`, add `"moratorium": <that value>`. |
| 3 | Remove the `moratorium` key from `_keyTree.offers[0]`. |

**Files affected:** All bank JSON files that have `moratorium` in `_keyTree.offers[0]` (all banks we updated earlier, plus Aditya Birla Capital which has null moratorium).

**Note:** Where to insert `moratorium` in each main offer (e.g. after `repayment_tenure` or with `repayment`) can be chosen for consistency; the plan is to add it to every root offer and remove it from _keyTree only.

---

**Reply with permission (e.g. "yes" or "go ahead") to apply this shift for all bank files.**
