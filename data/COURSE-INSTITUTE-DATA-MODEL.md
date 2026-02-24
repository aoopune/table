# Data model: University → Course per bank (for table display)

**Goal:** When the client selects a **university**, the data model should allow looking up which **course(s)** the student is eligible for at that university for each bank, and show that in the table.

---

## Current structure

1. **institutes.json** — list of (lender, university) eligibility:
   - `lenderName`, `university`, `country`, `criteria`
   - **No `course`** today. Each row says “this bank covers this university under this criteria”.

2. **Bank files** (e.g. `yes-bank.json`):
   - Root **offers[]**: each offer has `institute.criteria` (matches institutes.json) and in many banks **`course`** (e.g. "Any Course", "Any course").
   - **_keyTree.offers[0]**: some banks still have **`course`** here (one value per lender).

So today: **university + bank** → institutes.json gives **criteria** → bank offer with matching **institute.criteria** has **course** on the offer. The join is: (lenderName, criteria) → offer.

---

## Recommended data model (two parts)

### 1. Institute list: add `course` so the list “contains” course

**institutes.json** — add a **`course`** field to each row so the institute list explicitly carries “which course is eligible at this university for this bank”:

```json
{
  "lenderName": "Yes Bank",
  "university": "Aalto University",
  "country": "Finland",
  "criteria": "Top 75-300 as per QS Rankings 2026",
  "course": "Any Course"
}
```

- **course** = the course(s) eligible at that **university** for that **lender** (for that criteria).
- One row per (lenderName, university, criteria). Same **course** as the matching offer in the bank file (see below).

**Client flow (select university → show table):**

1. User selects **university** (e.g. "Aalto University").
2. **Filter institutes.json** by `university === selectedUniversity`.
3. Each row is (lenderName, country, criteria, **course**). Show in table: Bank (lenderName), Course, Criteria, Country (and any other columns you need).
4. Optionally: for full offer details (loan amount, interest, etc.), use (lenderName, criteria) to find the matching offer in that bank’s file and merge.

So the **institute list** is the source of “course in front of that university for that bank”; no need to open bank files only to show course in the table.

---

### 2. Bank offers: keep `course` on each offer (for join and consistency)

**Bank files** — each offer in root **offers[]** should have:

- **institute.criteria** — matches **institutes.json** `criteria` for (lenderName, university) rows.
- **course** — same value you put in institutes.json for that (lenderName, criteria).

So:

- **institutes.json** = “for this university, these banks, and for each the criteria and **course**”.
- **Bank file** = “for this bank, these offers (by criteria), and for each the **course** and rest of offer.”

Rule: for every row in institutes.json with (lenderName, university, criteria), **course** in that row must equal the **course** of the offer in that bank’s file whose **institute.criteria** equals **criteria**. That way:
- Table can be built from **institutes.json** only (university filter → show course per bank).
- Deeper details (loan, interest, fees, etc.) come from the bank file by (lenderName, criteria) → offer.

---

## Summary: how the model answers “course for selected university”

| Step | Data | Action |
|------|------|--------|
| 1 | User selects **university** | e.g. "Aalto University" |
| 2 | **institutes.json** | Filter where `university === selectedUniversity` |
| 3 | Result rows | Each row: lenderName, country, criteria, **course** |
| 4 | Table | Show one row per bank: Bank name, **Course**, Criteria, Country, etc. |
| 5 | (Optional) Full offer | For each row, get (lenderName, criteria) → find offer in bank file where `offer.institute.criteria === criteria` → use that offer for loan/interest/fees, etc. |

So the **data model** is:

1. **institutes.json**  
   - Fields: `lenderName`, `university`, `country`, `criteria`, **`course`** (add **course**).  
   - One row per (lender, university, criteria).  
   - **course** = course eligible at that university for that bank (for that criteria).

2. **Bank files**  
   - Each offer in **offers[]** has **institute.criteria** and **course** (already so in many banks).  
   - **course** on the offer must match the **course** you put in institutes.json for the same (lenderName, criteria).

3. **Client**  
   - Select university → filter institutes.json by university → show table with **course** (and other columns).  
   - Optionally join to bank file by (lenderName, criteria) for full offer details.

---

## Populating `course` in institutes.json

For each row in institutes.json:

- **course** = the **course** from the bank’s offer whose **institute.criteria** equals this row’s **criteria**.
- If the bank has only one course (e.g. "Any course" in _keyTree or on all offers), use that for every row for that lender.
- If the bank has different courses per criteria (different offers with different **course**), use the offer that matches **criteria** and take that offer’s **course**.

This can be done with a one-time script: for each institutes.json row, open the bank file for `lenderName`, find the offer where `offer.institute.criteria === row.criteria` (or fallback to _keyTree or first offer), set `row.course = offer.course` (or _keyTree value).

---

## Optional: multiple courses per (lender, university)

If in the future one (lender, university) can have **multiple** courses (e.g. "Engineering" and "MBA"):

- Either **course** in institutes.json is a string that lists them (e.g. "Engineering, MBA") and the client parses for display,
- Or **course** is an array: `"course": ["Engineering", "MBA"]`, and the table shows them (e.g. comma-separated or one line per course).

The rest of the model (filter by university → show course per bank) stays the same.
