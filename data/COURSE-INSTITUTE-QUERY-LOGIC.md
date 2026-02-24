# Course & institute: data model and query logic

**Goal:** When the client selects a **university**, the table should show:
1. **Banks with a university list** (`institute.changes` = true): show only if that university is in their list; **course** = course eligible for that university for that bank (from institute list).
2. **Banks with no university list** (`institute.changes` = false): always show; **course** = **"Any course"**.

---

## Data model (two parts)

### 1. Institute list (institutes.json)

- **Role:** Holds “which **course** is eligible at this **university** for this **bank**”.
- **Fields:** `lenderName`, `university`, `country`, `criteria`, **`course`** (add **course** if not present).
- One row per (lenderName, university, criteria). **course** = course eligible at that university for that bank (for that criteria).
- Used when: bank has `institute.changes === true` (has a preferred university list).

### 2. Bank files (data/banks/*.json)

- **Per offer** in root **offers[]**:
  - **institute.changes** (or **institute.wiseChanges**): `true` = bank has a university list (in institutes.json); `false` = no list, open to all.
  - **institute.criteria**: e.g. "Top 75 QS", "Annexure B" — matches **institutes.json** `criteria` for (lenderName, university) rows when changes = true.
  - **course**: same value as in institutes.json for that (lenderName, criteria). When changes = false, use **"Any course"** (or default) for the course column when user selects any university.

Rule: For every row in institutes.json with (lenderName, university, criteria), **course** in that row must equal the **course** of the offer in that bank’s file whose **institute.criteria** equals **criteria**.

---

## Query logic: when client selects a university

The table must show **both** kinds of banks.

### 1. Banks with a university list (`institute.changes` = true)

- These banks have entries in **institutes.json** (lender + university + criteria).
- **Action:** Filter **institutes.json** by `university === selectedUniversity`.
- **Table:** One row per (lender, criteria) from that filter. **Course** column = **course** from that institutes.json row (course in front of that university for that bank).
- So: show these banks **only if** the selected university appears in institutes.json for that bank; course = from institute list.

### 2. Banks with no university list (`institute.changes` = false)

- These banks do **not** have a preferred university list (open to all).
- **Action:** From bank files, collect all lenders that have **at least one offer** with `institute.changes === false`.
- **Table:** Add one row per such lender. **Course** column = **"Any course"**.
- So: when the user selects **any** university, these banks **always** appear in the table with course = **"Any course"**.

### Combined table for selected university

| Source            | Condition                          | Course column |
|-------------------|------------------------------------|----------------|
| **institutes.json** | `university === selectedUniversity` | **course** from institutes.json (course eligible for that university for that bank) |
| **Bank files**      | `institute.changes === false`       | **"Any course"** |

### Client algorithm (pseudocode)

1. User selects **university** (e.g. "Aalto University").
2. **Rows from institute list:**  
   Filter institutes.json by `university === selectedUniversity`.  
   For each row → add table row: lenderName, **course** (from row), criteria, country.
3. **Rows for "Any course" banks:**  
   For each bank file: if any offer has `institute.changes === false`, add a table row for that lender with **course** = `"Any course"` (and e.g. criteria = "Open to all" or blank).  
   If that lender already appears from step 2 (same university in institute list), either skip or merge: one row per lender, with course from institute list when present, else "Any course".
4. **Table:** Show Bank (lender), **Course**, Criteria, Country, and other columns. Course is either from the institute list for that university or **"Any course"** for banks with no list.

---

## Summary

- **Institute list** contains (lender, university, criteria, **course**). When user selects a university, search this list for that university and show **course** for each bank that has that university.
- **Banks with `institute.changes` = false** have no university list; when user selects any university, show these banks too with **course** = **"Any course"** in the table.
