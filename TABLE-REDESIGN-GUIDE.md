# Table Redesign Guide

This document shows you where the table structure from the attached image is defined in the code and how to redesign it.

## 📋 Table Overview

The table you prepared has:
- **Header Groups**: Sector, Loan features, Customer service
- **Multiple columns** within each group
- **Sticky columns** (Lender, Sector, Select checkbox)
- **Filter and sort capabilities** on each column

## 🗺️ Key Files and Their Roles

### 1. **Table Configuration** - `data/table-config.js`
**Purpose**: Defines the structure, columns, and groups

```javascript
const TABLE_CONFIG = {
  productType: 'education-loan',
  columnGroups: [
    {
      id: 'sector',
      label: 'Sector',
      cols: [
        { id: 'lender', label: 'Lender', type: 'text', sticky: true },
        { id: 'sector', label: 'Sector', type: 'text', sticky: true },
        { id: 'select', label: 'Select', type: 'checkbox', sticky: true }
      ]
    },
    {
      id: 'eligibility',
      label: 'Eligibility criteria',
      cols: [
        { id: 'nationality', label: 'Nationality', type: 'text' },
        { id: 'age', label: 'Age (in years)', type: 'text' },
        // ... more columns
      ]
    },
    {
      id: 'loanFeatures',
      label: 'Loan features',
      cols: [
        { id: 'interestRate', label: 'Interest rate(in % p.a. onwards)', type: 'text' },
        { id: 'margin', label: 'Margin(in % of loan amount)', type: 'text' },
        { id: 'processingFees', label: 'Processing fees(Max. % of loan amount)', type: 'text' },
        { id: 'refundableProcessingFees', label: 'Refundable Processing fees', type: 'text' },
        { id: 'repaymentTenure', label: 'Repayment Tenure(Max. in years)', type: 'text' },
        { id: 'moratoriumPeriod', label: 'Moratorium period(course period plus)', type: 'text' },
        { id: 'paymentDuringMoratorium', label: 'Payment during moratorium', type: 'text' },
        { id: 'delayedEmiPayment', label: 'Delayed EMI payment Per month', type: 'text' }
      ]
    },
    {
      id: 'customerService',
      label: 'Customer service',
      cols: [
        { id: 'avgTimeToSanction', label: 'Avg. Time to Sanction(Business Days)', type: 'text' },
        { id: 'dedicatedCaseManager', label: 'Dedicated Case Manager', type: 'text' },
        { id: 'onboardingProcess', label: 'Onboarding process', type: 'text' }
      ]
    }
  ]
};
```

**To redesign**: 
- Add/remove column groups in `columnGroups` array
- Add/remove columns in each group's `cols` array
- Change labels, IDs, or types
- Mark columns as `sticky: true` to lock them on scroll

---

### 2. **Table Rendering Logic** - `app.js`
**Purpose**: Converts the configuration into HTML table with headers and body

**Key functions**:
- **`buildTableHeader()`** (around line 285): Creates the two-row header (group row + column row)
- **`buildTableBody()`** (around line 330): Creates table rows with data
- **`applyFilters()`**: Handles column filtering
- **`applySorting()`**: Handles column sorting

**Line 285-340** (buildTableHeader):
```javascript
function buildTableHeader() {
  var config = getConfig();
  if (!config || !config.columnGroups) return '';
  
  // First row: Group headers (Sector, Loan features, Customer service)
  var html = '<tr class="header-row">';
  config.columnGroups.forEach(function (group, gIdx) {
    var colSpan = group.cols ? group.cols.length : 1;
    var stickyGroupClass = (gIdx === 0) ? ' sticky-group' : '';
    html += '<th colspan="' + colSpan + '" class="th-group th-group-end' + stickyGroupClass + '">' 
          + escapeHtml(group.label) + '</th>';
  });
  html += '</tr>';
  
  // Second row: Individual column headers
  html += '<tr class="subheader-row">';
  config.columnGroups.forEach(function (group, gIdx) {
    var cols = group.cols || [];
    cols.forEach(function (col, cIdx) {
      // Render each column with filter/info icons
      // ...
    });
  });
  html += '</tr>';
  return html;
}
```

**To redesign**:
- Modify header rendering logic in `buildTableHeader()`
- Change body cell rendering in `buildTableBody()`
- Adjust filter/sort behavior

---

### 3. **Table Styling** - `styles.css`
**Purpose**: Visual appearance, colors, borders, spacing, sticky columns

**Key sections**:
- **Lines 1-20**: CSS variables (colors, spacing, widths)
- **Lines 130-167**: Header styling (`.table-header-outer`, `.comparison-table-header`)
- **Lines 185-250**: Column and cell styling (`.th-col`, `.td-col`)
- **Lines 330-420**: Sticky column styles (`.sticky-col-1`, `.sticky-col-2`, `.sticky-col-3`)
- **Lines 490-560**: Group borders (`.th-group-end`, `.td-col-group-end`)

**Example sticky column CSS**:
```css
/* Sticky columns - first 3 columns stay visible when scrolling horizontally */
.sticky-col-1 { 
  position: sticky; 
  left: 0; 
  z-index: 3;
  width: var(--sticky-col-1-width); /* 5.5rem */
}
.sticky-col-2 { 
  position: sticky; 
  left: var(--sticky-col-1-width); 
  z-index: 3;
  width: var(--sticky-col-2-width); /* 4.5rem */
}
```

**To redesign**:
- Change colors in CSS variables (`:root`)
- Adjust column widths
- Modify borders and spacing
- Change font sizes

---

### 4. **Test Page** - `test.html`
**Purpose**: Full functional test page that uses the table

This file loads:
- `data/table-config.js` - Table structure
- `app.js` - Table logic
- `styles.css` - Table styling
- `data/bank-loader.js` - Data loader

**Use this file to**:
- Test your table redesign
- See all features working (sort, filter, sticky columns)
- Run automated tests

---

### 5. **Main Application** - `index.html`
**Purpose**: Production page with query interface

**Note**: This file has a **different, simpler table implementation** that doesn't use `TABLE_CONFIG`. It uses inline column definitions (lines 930-945).

If you want to use the grouped table structure in `index.html`, you need to:
1. Include `data/table-config.js` and `app.js`
2. Replace the current table rendering code
3. Use the same structure as `test.html`

---

## 🎨 How to Redesign the Table

### Adding a New Column

1. **Edit** `data/table-config.js`:
```javascript
{
  id: 'customerService',
  label: 'Customer service',
  cols: [
    { id: 'avgTimeToSanction', label: 'Avg. Time to Sanction(Business Days)', type: 'text' },
    { id: 'dedicatedCaseManager', label: 'Dedicated Case Manager', type: 'text' },
    { id: 'onboardingProcess', label: 'Onboarding process', type: 'text' },
    // ADD NEW COLUMN HERE:
    { id: 'customerRating', label: 'Customer Rating (out of 5)', type: 'text' }
  ]
}
```

2. **Ensure your data source** (`data/loan-data-abroad.csv` or data loader) includes the new column

3. **Test** in `test.html` to see it appear

### Adding a New Group

1. **Edit** `data/table-config.js`:
```javascript
columnGroups: [
  // ... existing groups ...
  {
    id: 'additionalInfo',
    label: 'Additional Information',
    cols: [
      { id: 'partnerBanks', label: 'Partner Banks', type: 'text' },
      { id: 'specialOffers', label: 'Special Offers', type: 'text' }
    ]
  }
]
```

### Changing Styling

1. **Edit** `styles.css`
2. **Change CSS variables** for colors:
```css
:root {
  --bg: #f5f7fa;              /* Background color */
  --card: #fff;                /* Table background */
  --border: #e0e4e9;          /* Light borders */
  --block-border: #5b6370;    /* Strong borders */
  --primary: #0066cc;          /* Accent color */
  --header-bg: #e8ecf1;       /* Header background */
  --header-group: #d0d8e2;    /* Group header background */
}
```

### Changing Column Widths

**Edit** `styles.css` variables:
```css
:root {
  --sticky-col-1-width: 5.5rem;  /* Lender column */
  --sticky-col-2-width: 4.5rem;  /* Sector column */
  --sticky-col-3-width: 1.75rem; /* Select checkbox column */
}
```

---

## 🧪 Testing Your Changes

1. **Open** `test.html` in your browser
2. **Check**:
   - All columns appear correctly
   - Group headers span the right number of columns
   - Sticky columns stay fixed when scrolling
   - Filters and sort buttons work
   - Data loads properly

---

## 📁 Data Source

The table data comes from:
- **CSV file**: `data/loan-data-abroad.csv`
- **Data loader**: `data/bank-loader.js` or `data/data-loader.js`
- **Direct data**: Can set `window.TABLE_DATA` array

Column IDs in `TABLE_CONFIG` must match the data property names.

---

## 🔑 Quick Reference

| What to Change | File to Edit | Section |
|----------------|--------------|---------|
| Add/remove columns | `data/table-config.js` | `columnGroups[].cols[]` |
| Add/remove groups | `data/table-config.js` | `columnGroups[]` |
| Change column labels | `data/table-config.js` | `cols[].label` |
| Make column sticky | `data/table-config.js` | `cols[].sticky = true` |
| Change colors | `styles.css` | `:root` CSS variables |
| Change column widths | `styles.css` | `--sticky-col-X-width` |
| Change borders/spacing | `styles.css` | `.th-col`, `.td-col` classes |
| Modify rendering logic | `app.js` | `buildTableHeader()`, `buildTableBody()` |
| Test table | Open in browser | `test.html` |

---

## 💡 Pro Tips

1. **Always test in `test.html`** first before modifying `index.html`
2. **Use browser DevTools** to inspect and debug styling
3. **Keep column IDs consistent** between config and data source
4. **Clear browser cache** if changes don't appear
5. **Check console for errors** if table doesn't render

---

## 📝 Current Table Structure (from your image)

Based on the attached image, your table has:

**Group 1: Sector**
- Lender (sticky)
- Sector (sticky, with filter icon)
- Select checkbox (sticky)

**Group 2: Loan features**
- Margin (% of loan amount)
- Processing fees (Max. % of loan amount)
- Refundable Processing fees
- Repayment Tenure (Max. in years)
- Moratorium period (course period plus)
- Payment during moratorium
- Delayed EMI payment Per month

**Group 3: Customer service**
- Avg. Time to Sanction (Business Days)
- Dedicated Case Manager
- Onboarding process

All these are already defined in `data/table-config.js`!

---

**Need help?** Check the inline comments in each file or refer to:
- `docs/DATA_AND_ARCHITECTURE.md` - Architecture documentation
- `docs/MAPPINGS_AND_KEYS_REFERENCE.md` - Column mappings
- `AUDIT_TRAIL.md` - Change history
