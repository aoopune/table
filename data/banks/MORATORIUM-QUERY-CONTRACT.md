# Moratorium: queryable data model and query contract

So that **any client-side query** can scan moratorium correctly for each bank, the data model must expose **structured, queryable fields** in addition to display text.

---

## 1. Queryable structure (required for every bank)

Every offer (and `_keyTree` offer) must include moratorium in a form the client can **scan**. Use this shape under **`repayment.moratorium`** (and mirror in **_keyTree** with camelCase):

```ts
repayment.moratorium: {
  // ---- Queryable (required for filtering) ----
  periodMonths: {
    min: number;   // minimum months (e.g. 3 for "3 or 6 months")
    max: number;   // maximum months (e.g. 12 for "12 or 6 months, whichever is earlier")
  }
  // OR
  periodMonths: {
    options: number[];  // e.g. [3, 6] or [12, 36] — use when discrete choices only
  }

  // ---- Display (required for UI) ----
  periodDisplay: string;  // exact wording, e.g. "12 months or 6 months after getting job, whichever is earlier"

  // ---- Existing ----
  paymentDuring: string;  // "Optional" | "Mandatory" | etc.
}
```

**Rule:** For **every** bank/offer, **at least one** of these must be present and populated:

- **`periodMonths.min` and `periodMonths.max`** — for ranges / “whichever is earlier” / single value (use min = max for “12 months”).
- **`periodMonths.options`** — for discrete choices only (e.g. “3 or 6 months”, “12/36 months”).

The client will **only** use `periodMonths` (and the rules below) to answer moratorium queries. `periodDisplay` is for showing the exact text to the user.

---

## 1b. When there is no data for that bank

If a bank has **no moratorium data** (unknown, not applicable, or not yet filled), use one of these so the client can detect “no data” and show it correctly.

### Option A (recommended): Explicit nulls

Keep the `moratorium` object but set queryable/display fields to `null`:

```json
"moratorium": {
  "periodMonths": null,
  "periodDisplay": null,
  "paymentDuring": null
}
```

- **periodMonths: null** → Client skips this offer for moratorium filters (or treats as “Not specified”).
- **periodDisplay: null** → UI shows e.g. “Not specified” or “—”.
- **paymentDuring: null** → Same for payment-during-moratorium.

### Option B: Omit moratorium

Omit `repayment.moratorium` entirely for that offer. Client checks `offer.repayment?.moratorium == null` and treats as no data.

### Option C: Sentinel with display text

If you want a consistent object but a clear “no data” message in the UI:

```json
"moratorium": {
  "periodMonths": null,
  "periodDisplay": "Not specified",
  "paymentDuring": null
}
```

### How the client should handle “no data”

| Check | Meaning |
|-------|--------|
| `moratorium` is absent or `null` | No moratorium data for this offer. |
| `periodMonths` is `null` (or absent) | Not queryable — exclude from moratorium filters, or show “Not specified”. |
| `periodDisplay` is `null` | Show “Not specified” or “—” in UI. |
| `paymentDuring` is `null` | Show “—” or leave blank. |

**Summary table**

| Field | When data exists | When no data (bank has no moratorium info) |
|-------|------------------|-------------------------------------------|
| **periodMonths** | `{ "min": 6, "max": 12 }` or `{ "options": [3, 6] }` | `null` — client excludes from moratorium filters. |
| **periodDisplay** | `"12 months or 6 months after job, whichever is earlier"` | `null` or `"Not specified"` — UI shows “Not specified” or “—”. |
| **paymentDuring** | `"Optional"` or `"Mandatory"` | `null` — UI shows “—” or blank. |

---

## 2. How to store each case (so queries work)

| Real-world description | periodDisplay | periodMonths | Why queryable |
|------------------------|---------------|--------------|----------------|
| 12 months | `"12 months"` | `{ "min": 12, "max": 12 }` | Single value: min = max. |
| 6 months | `"6 months"` | `{ "min": 6, "max": 6 }` | Same. |
| 12 months or 6 months after getting job, whichever is earlier | `"12 months or 6 months after getting job, whichever is earlier"` | `{ "min": 6, "max": 12 }` | Range 6–12; “at least 6” and “at most 12” both work. |
| 12/36 months | `"12/36 months"` | `{ "options": [12, 36] }` or `{ "min": 12, "max": 36 }` | Options: exact choices. Min/max: range. |
| 6 months after getting job, whichever is earlier | `"6 months after getting job, whichever is earlier"` | `{ "min": 6, "max": 6 }` | Single 6 months. |
| 6 or 18 months | `"6 or 18 months"` | `{ "options": [6, 18] }` or `{ "min": 6, "max": 18 }` | Same idea. |
| 3 or 6 months | `"3 or 6 months"` | `{ "options": [3, 6] }` or `{ "min": 3, "max": 6 }` | Same. |

**Recommendation:** Prefer **`min`/`max`** when the rule is a range or “whichever is earlier”; use **`options`** when the product explicitly offers a few discrete tenures. Both are queryable.

---

## 3. Query semantics (how the client scans each bank)

The client should resolve moratorium filters by **only** looking at `repayment.moratorium.periodMonths` (and, if you keep a legacy single number, `period` as below). Use this contract so every bank is scanned the same way.

### 3.1 Normalise to min/max per offer

Before applying any filter, derive a **single (min, max)** per offer:

- If **`periodMonths.min`** and **`periodMonths.max`** exist:  
  use `(min, max)`.
- If only **`periodMonths.options`** exists:  
  use `min = Math.min(...options)`, `max = Math.max(...options)`.
- If you still have a legacy **`period`** (number):  
  use `(period, period)`.

So every offer gets one pair `(minMonths, maxMonths)` for moratorium.

### 3.2 Supported query types and how to match

| Query (example) | How to match (per offer) |
|----------------|---------------------------|
| Moratorium **≥ X** months | `maxMonths >= X` (bank can offer at least X months). |
| Moratorium **≤ Y** months | `minMonths <= Y` (bank has at least one option ≤ Y). |
| Moratorium **= Z** months | `minMonths <= Z <= maxMonths` (Z falls in range) or, if using options, `Z` is in `options`. |
| Moratorium **between A and B** (inclusive) | Overlap: `minMonths <= B && maxMonths >= A`. |
| Moratorium **at least X** (user wants long moratorium) | Same as **≥ X**: `maxMonths >= X`. |
| Moratorium **at most Y** | Same as **≤ Y**: `minMonths <= Y`. |

So for each bank/offer, the client:

1. Reads `repayment.moratorium.periodMonths` (or legacy `period`).
2. Computes `(minMonths, maxMonths)` as above.
3. Applies the predicate for the user’s query (e.g. “moratorium >= 6” → `maxMonths >= 6`).
4. Uses `periodDisplay` only for showing the exact text in the UI.

---

## 4. Example: client-side scan (pseudocode)

```js
function getMoratoriumRange(offer) {
  const moratorium = offer.repayment?.moratorium ?? offer._keyTree?.moratorium;
  if (!moratorium) return null;  // no data: exclude from moratorium filters

  const pm = moratorium.periodMonths;
  if (pm == null) return null;   // no data: exclude from moratorium filters
  if (pm.min != null && pm.max != null) return { min: pm.min, max: pm.max };
  if (Array.isArray(pm.options) && pm.options.length) {
    return { min: Math.min(...pm.options), max: Math.max(...pm.options) };
  }
  // Legacy: single number
  const p = moratorium.period;
  if (typeof p === 'number') return { min: p, max: p };
  return null;
}

// For UI: show moratorium text or "Not specified" when no data
function getMoratoriumDisplay(offer) {
  const moratorium = offer.repayment?.moratorium ?? offer._keyTree?.moratorium;
  const display = moratorium?.periodDisplay;
  return display ?? 'Not specified';
}

function matchesMoratoriumQuery(offer, query) {
  const range = getMoratoriumRange(offer);
  if (!range) return false;
  // query: { minMonths?, maxMonths?, exact? }
  if (query.minMonths != null && range.max < query.minMonths) return false;
  if (query.maxMonths != null && range.min > query.maxMonths) return false;
  if (query.exact != null && (range.min > query.exact || range.max < query.exact)) return false;
  return true;
}
```

Then “show banks with moratorium >= 6 months” is: filter offers where `matchesMoratoriumQuery(offer, { minMonths: 6 })` is true.

---

## 5. Where to put this in the JSON files

- In **main `offers[]`** (per offer): under **`repayment.moratorium`**:
  - **`periodDisplay`** (string)
  - **`periodMonths`** (`{ min, max }` or `{ options }`) — **required for queryability**
  - **`paymentDuring`** (string)

- In **_keyTree.offers[]** (if you keep it), mirror for consistency so server or client can use one place:
  - **`moratoriumPeriodDisplay`**
  - **`moratoriumPeriodMonths`** (`{ min, max }` or `{ options }`)
  - **`paymentDuringMoratorium`**

This way, **any** moratorium query from the client can be answered by scanning **`periodMonths`** (or legacy `period`) once per bank/offer, and `periodDisplay` is always available for the answer text.
