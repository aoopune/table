# Security: where weightage vs coveragePct are used (and why keep only one)

---

## 1. Where each field is used

| Field | Where used | Purpose |
|-------|------------|--------|
| **weightage** (current: `"None"` or `{ min: 100, max: 500 }`) | Legacy / old code. The **500** was a placeholder (not a real %). | Not needed for display or query if you have coveragePct. |
| **coverageDisplay** | **UI / table column** “Coverage %” | Exact text: `"≥90%"`, `"75%–<100%"`, `"None"`, etc. |
| **coveragePct** | **Filtering / queries** | e.g. “coverage ≥ 90%” → `coveragePct.minPct >= 90`; “75%–<100%” → `minPct >= 75 && maxPct <= 100`. |

So:
- **coverageDisplay** → only for **showing** in the table.
- **coveragePct** → only for **filtering** (and sorting if needed).
- **weightage** → was only a placeholder (e.g. 500); you don’t need to keep it.

---

## 2. Why keep 2? (You don’t.)

You only need **two** fields for coverage:

1. **coverageDisplay** (string) – for the **table column** “Coverage %”.
2. **coveragePct** (object or null) – for **queries** (e.g. “secured”, “coverage ≥ 90%”).

You do **not** need **weightage** (the old `min`/`max` like 100–500) if you have **coveragePct**. So:

- **Keep:** `required`, `coverageDisplay`, `coveragePct`.
- **Drop:** `weightage` (or ignore it; 500 was just “some value” and isn’t a real coverage %).

That way you have a single source of truth: **coverageDisplay** for display, **coveragePct** for logic.

---

## 3. About the 500 (max) you added

You said you added **500 as max** just to keep some value there. So:

- **100** might have meant “100%” (e.g. ≥100%).
- **500** was not a real “max percent” (coverage doesn’t go to 500%).

So in the new model:

- For “≥100%”: use **coveragePct: { "minPct": 100, "maxPct": null }** (no need for 500).
- For “None”: use **coveragePct: null**.
- For “75%–<100%”: use **coveragePct: { "minPct": 75, "maxPct": 100 }**.

You can **stop using** the old `weightage: { min: 100, max: 500 }` and rely only on **coveragePct** (and **coverageDisplay** for the table).

---

## 4. Recommended structure (only 2 for coverage)

On each offer, under **security**:

```json
"security": {
  "required": true,
  "coverageDisplay": "≥100%",
  "coveragePct": { "minPct": 100, "maxPct": null }
}
```

Or for unsecured:

```json
"security": {
  "required": false,
  "coverageDisplay": "None",
  "coveragePct": null
}
```

- **required** – quick check: secured vs unsecured.
- **coverageDisplay** – used in the **table** (“Coverage %” column).
- **coveragePct** – used in **filters** (e.g. “coverage ≥ 90%”, “75%–<100%”).
- **weightage** – not used; can be removed (500 was placeholder).

---

## 5. Summary

| Question | Answer |
|----------|--------|
| Where is **weightage** used? | Only in old/legacy sense; 500 was placeholder. Not needed. |
| Where is **coveragePct** used? | In **queries/filters** (e.g. “coverage ≥ 90%”, “secured”). |
| Where is **coverageDisplay** used? | In the **table** (“Coverage %” column). |
| Why keep 2? | You keep **2** fields: **coverageDisplay** (display) and **coveragePct** (query). You do **not** keep **weightage**; drop it and use coveragePct instead (no 500). |

So: **one** display field (**coverageDisplay**), **one** query field (**coveragePct**). No need for **weightage** or the 500 max.
