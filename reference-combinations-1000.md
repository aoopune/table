# 1000 Reference Test Combinations

**Generated:** 2026-02-24T09:08:39.256Z  
**Purpose:** Reference test combinations based on PROVEN successful patterns

## Background

During initial testing, **6 combinations successfully returned banks**:

| Amount | Country | Type | Banks Returned |
|--------|---------|------|----------------|
| ₹50K | Australia | Secured | **11 banks** |
| ₹3.00Cr | Antigua & Barbuda | Unsecured | **6 banks** |
| ₹3Cr | Zambia | Unsecured | **6 banks** |
| ₹3Cr | Zimbabwe | Unsecured | **6 banks** |

## Strategy

This file contains **1,000 variations** of these proven patterns:

1. **Same countries** (Australia, Antigua, Zambia, Zimbabwe)
2. **Similar loan amounts** (₹50K or ₹3Cr with 10% variations)
3. **Same course types** ("Any course")
4. **Variations in**: Gender, Loan Type, Specific Universities

## Distribution

| Dimension | Details |
|-----------|---------|
| Total Combinations | 1000 |
| Countries | 4 proven countries |
| Universities | 1 unique universities |
| Loan Amount Patterns | ₹50K and ₹3Cr (with variations) |
| Gender | 50% Male, 50% Female |

## Files Generated

- **reference-combinations-1000.json** - Full JSON with all details (400KB)
- **reference-combinations-1000.csv** - Excel-friendly format  
- **this file** - Documentation

## Usage

### For Future Testing

When your system starts returning banks:

```powershell
# Execute these reference combinations
node execute-test-combinations.cjs reference-combinations-1000.json
```

### View in Excel

```powershell
.\reference-combinations-1000.csv
```

### Analyze in PowerShell

```powershell
$data = Get-Content reference-combinations-1000.json | ConvertFrom-Json
$data.combinations | Group-Object country | Select-Object Name, Count
```

## Sample Combinations (First 20)

### 1. Test #1
- **Input:** Male, ₹49K, Unsecured
- **Country:** Australia
- **University:** N/A
- **Course:** Any course
- **Pattern:** Based on ₹50K in Australia (expected 11 banks)

### 2. Test #2
- **Input:** Female, ₹3.00Cr, Unsecured
- **Country:** Antigua and Barbuda
- **University:** N/A
- **Course:** Any course
- **Pattern:** Based on ₹3.00Cr in Antigua and Barbuda (expected 6 banks)

### 3. Test #3
- **Input:** Male, ₹3.00Cr, Unsecured
- **Country:** Zambia
- **University:** N/A
- **Course:** Any course
- **Pattern:** Based on ₹3Cr in Zambia (expected 6 banks)

### 4. Test #4
- **Input:** Female, ₹2.71Cr, Unsecured
- **Country:** Zimbabwe
- **University:** N/A
- **Course:** Any course
- **Pattern:** Based on ₹3Cr in Zimbabwe (expected 6 banks)

### 5. Test #5
- **Input:** Male, ₹50K, Secured
- **Country:** Australia
- **University:** N/A
- **Course:** Any course
- **Pattern:** Based on ₹50K in Australia (expected 11 banks)

### 6. Test #6
- **Input:** Female, ₹3.00Cr, Secured
- **Country:** Antigua and Barbuda
- **University:** N/A
- **Course:** Any course
- **Pattern:** Based on ₹3.00Cr in Antigua and Barbuda (expected 6 banks)

### 7. Test #7
- **Input:** Male, ₹2.91Cr, Unsecured
- **Country:** Zambia
- **University:** N/A
- **Course:** Any course
- **Pattern:** Based on ₹3Cr in Zambia (expected 6 banks)

### 8. Test #8
- **Input:** Female, ₹3.00Cr, Unsecured
- **Country:** Zimbabwe
- **University:** N/A
- **Course:** Any course
- **Pattern:** Based on ₹3Cr in Zimbabwe (expected 6 banks)

### 9. Test #9
- **Input:** Male, ₹50K, Secured
- **Country:** Australia
- **University:** N/A
- **Course:** Any course
- **Pattern:** Based on ₹50K in Australia (expected 11 banks)

### 10. Test #10
- **Input:** Female, ₹2.83Cr, Unsecured
- **Country:** Antigua and Barbuda
- **University:** N/A
- **Course:** Any course
- **Pattern:** Based on ₹3.00Cr in Antigua and Barbuda (expected 6 banks)

### 11. Test #11
- **Input:** Male, ₹3.00Cr, Secured
- **Country:** Zambia
- **University:** N/A
- **Course:** Any course
- **Pattern:** Based on ₹3Cr in Zambia (expected 6 banks)

### 12. Test #12
- **Input:** Female, ₹3.00Cr, Unsecured
- **Country:** Zimbabwe
- **University:** N/A
- **Course:** Any course
- **Pattern:** Based on ₹3Cr in Zimbabwe (expected 6 banks)

### 13. Test #13
- **Input:** Male, ₹48K, Secured
- **Country:** Australia
- **University:** N/A
- **Course:** Any course
- **Pattern:** Based on ₹50K in Australia (expected 11 banks)

### 14. Test #14
- **Input:** Female, ₹3.00Cr, Unsecured
- **Country:** Antigua and Barbuda
- **University:** N/A
- **Course:** Any course
- **Pattern:** Based on ₹3.00Cr in Antigua and Barbuda (expected 6 banks)

### 15. Test #15
- **Input:** Male, ₹3.00Cr, Unsecured
- **Country:** Zambia
- **University:** N/A
- **Course:** Any course
- **Pattern:** Based on ₹3Cr in Zambia (expected 6 banks)

### 16. Test #16
- **Input:** Female, ₹2.82Cr, Secured
- **Country:** Zimbabwe
- **University:** N/A
- **Course:** Any course
- **Pattern:** Based on ₹3Cr in Zimbabwe (expected 6 banks)

### 17. Test #17
- **Input:** Male, ₹50K, Secured
- **Country:** Australia
- **University:** N/A
- **Course:** Any course
- **Pattern:** Based on ₹50K in Australia (expected 11 banks)

### 18. Test #18
- **Input:** Female, ₹3.00Cr, Unsecured
- **Country:** Antigua and Barbuda
- **University:** N/A
- **Course:** Any course
- **Pattern:** Based on ₹3.00Cr in Antigua and Barbuda (expected 6 banks)

### 19. Test #19
- **Input:** Male, ₹3.00Cr, Unsecured
- **Country:** Zambia
- **University:** N/A
- **Course:** Any course
- **Pattern:** Based on ₹3Cr in Zambia (expected 6 banks)

### 20. Test #20
- **Input:** Female, ₹3.00Cr, Unsecured
- **Country:** Zimbabwe
- **University:** N/A
- **Course:** Any course
- **Pattern:** Based on ₹3Cr in Zimbabwe (expected 6 banks)


## Statistics

```
Total Combinations: 1,000
Countries Covered: 4 (Australia, Antigua & Barbuda, Zambia, Zimbabwe)
Based On: 6 historically successful patterns
Ready For: Future testing when system returns banks
```

## Important Notes

 **Current System Status:** Returns 0 banks for all queries  
 **Historical Success:** These patterns returned banks in original tests  
 **Purpose:** Reference baseline for regression testing  
 **Coverage:** Variations of all 6 proven successful combinations

---

**Created:** 2026-02-24T09:08:39.258Z  
**Total:** 1,000 combinations ready for testing
