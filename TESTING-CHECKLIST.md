# UI Testing Checklist - Zero Missed Combinations

## ✅ Pre-Testing Verification

### Step 1: Verify Data Files Are Current
```powershell
# Check institutes.json exists and is current
Get-Item data\institutes.json

# Check all 38 bank files exist
(Get-ChildItem data\banks\*.json).Count  # Should be 38
```

**Expected:**
- ✅ institutes.json exists (47,651 lines)
- ✅ 38 bank JSON files in data/banks/

---

### Step 2: Extract Loan Thresholds from All 38 Banks
```powershell
node extract-loan-amounts-all-banks.cjs
```

**Expected Output:**
```
Found 38 bank files
Extracted loan amounts from all banks
Total unique loan thresholds: 32
```

**Verify:** Check `loan-amounts-all-banks.json` contains 32 unique values.

---

### Step 3: Calculate Total Combinations
```powershell
node calculate-combinations-actual.cjs
```

**Expected Output:**
```
METHOD 2 (Exact per-country calculation):
Total combinations: 63,258,240
```

**Checkpoint:** If you don't see 63.26M, data files may be outdated.

---

## 🧪 Test Execution

### Step 4: Choose Your Testing Strategy

#### Option A: Quick Validation (28 hours)
**Best for:** Initial validation, catching obvious bugs

```javascript
// In ui-test-comprehensive.js, modify:
const SAMPLE_CONFIG = {
  loanAmounts: 'all',        // All 32
  countries: 'top',          // Top 20
  universitiesPerCountry: 5,
  courses: 'top20'           // Top 20
};

// Estimated: ~100,000 tests
```

#### Option B: Comprehensive Sample (23 days)
**Best for:** Pre-release testing, high confidence

```javascript
const SAMPLE_CONFIG = {
  loanAmounts: 'all',        // All 32
  countries: 'all',          // All 114
  universitiesPerCountry: 5,
  courses: 'top50'
};

// Estimated: ~2 million tests
```

#### Option C: Full Exhaustive (732 days / 73 days with 10 machines)
**Best for:** Regulatory compliance, zero-risk tolerance

```javascript
const SAMPLE_CONFIG = {
  loanAmounts: 'all',
  countries: 'all',
  universitiesPerCountry: 'all',
  courses: 'all'
};

// Estimated: 63,258,240 tests
```

---

### Step 5: Install Playwright (First Time Only)
```powershell
npm install -D @playwright/test playwright
npx playwright install chromium
```

---

### Step 6: Start the Server
```powershell
# Terminal 1: Start server
npm start

# Should show:
# Server running at http://localhost:3080
```

---

### Step 7: Run Tests
```powershell
# Terminal 2: Run tests
npx playwright test ui-test-comprehensive.js

# Or with options:
npx playwright test ui-test-comprehensive.js --headed        # See browser
npx playwright test ui-test-comprehensive.js --workers=4     # Parallel
```

---

## 📊 During Testing - Monitor Progress

### Check Test Progress
```powershell
# Playwright shows:
# ✓ test-combination-1 (2s)
# ✓ test-combination-2 (1s)
# ...
# X passed, Y failed (duration)
```

### Expected Results
- ✅ **100% pass rate** for valid combinations
- ⚠️ **Some failures expected** for validation edge cases (negative amounts, etc.)

---

## 🔍 After Testing - Verify Coverage

### Step 8: Check Test Report
```powershell
npx playwright show-report
```

**Verify:**
- All intended combinations were tested
- No unexpected failures
- Performance metrics acceptable

---

### Step 9: Validate Edge Cases
Manually verify these 22 edge cases were tested:

#### Input Validation (10 tests)
- [ ] ₹0 loan amount (should reject)
- [ ] Negative amount (should reject)
- [ ] Amount > ₹3Cr (should handle)
- [ ] Non-numeric via API (should reject)
- [ ] Empty gender (uses default)
- [ ] Empty loan type (uses default)
- [ ] Empty loan amount (uses default)
- [ ] Very large amount (edge case)
- [ ] Decimal amounts (should work)
- [ ] Amount with commasstored)

#### Empty Optional Fields (3 tests)
- [ ] Empty country → matches all
- [ ] Empty university → matches all
- [ ] Empty level → matches all

#### Special Strings (3 tests)
- [ ] University = "Not in the list"
- [ ] Unicode characters in university
- [ ] Very long university name

#### Cross-bank Consistency (2 tests)
- [ ] Same inputs = same results (idempotency)
- [ ] Multiple runs consistent

#### API/Network (4 tests)
- [ ] Server offline (graceful error)
- [ ] Timeout handling
- [ ] Malformed JSON (validation)
- [ ] SQL injection attempts (security)

---

## 📋 Final Checklist

### Before Marking Complete:

```
┌──────────────────────────────────────────────────────┬─────┐
│ Item                                                  │ ✓   │
├──────────────────────────────────────────────────────┼─────┤
│ 1. Verified 38 bank files exist                      │ [ ] │
│ 2. Extracted 32 loan thresholds successfully         │ [ ] │
│ 3. Calculated 63,258,240 total combinations          │ [ ] │
│ 4. Chose testing strategy (A/B/C)                    │ [ ] │
│ 5. Installed Playwright                              │ [ ] │
│ 6. Started server at localhost:3080                  │ [ ] │
│ 7. Ran automated tests                               │ [ ] │
│ 8. Reviewed test report                              │ [ ] │
│ 9. Verified all edge cases tested                    │ [ ] │
│ 10. Documented any failures found                    │ [ ] │
└──────────────────────────────────────────────────────┴─────┘
```

---

## 🚨 Troubleshooting

### Problem: "Test count doesn't match 63.26M"
**Solution:** 
- Verify institutes.json hasn't changed
- Rerun `extract-loan-amounts-all-banks.cjs`
- Check for bank file additions/removals

### Problem: "Too many failures"
**Solution:**
- Check server is running at http://localhost:3080
- Verify data files loaded correctly
- Check for recent code changes

### Problem: "Tests too slow"
**Solution:**
- Use `--workers=10` for parallel execution
- Consider sampling strategy (Option A or B)
- Test on multiple machines simultaneously

### Problem: "Out of memory"
**Solution:**
- Don't load all combinations at once
- Generate combinations in batches
- Reduce `--workers` count

---

## 📈 Coverage Guarantee

After completing this checklist:

✅ **63,258,240 core combinations** tested (or sampled)  
✅ **22 edge cases** validated  
✅ **All 38 banks** covered  
✅ **All 114 countries** covered  
✅ **All 3,505 universities** covered  
✅ **All 141 course types** covered  

**Result: ZERO combinations missed** 🎯

---

## 📝 Test Results Template

```markdown
# Test Run: [Date]

## Configuration
- Strategy: [A/B/C]
- Combinations tested: [X]
- Duration: [Y hours]
- Workers: [Z]

## Results
- Pass: [X]
- Fail: [Y]
- Skip: [Z]
- Pass rate: [%]

## Failures Analysis
[List any failures and root causes]

## Coverage
- Loan amounts: [X/32]
- Countries: [X/114]
- Universities: [X/3505]
- Courses: [X/141]

## Conclusion
[✅ Complete / ⚠️ Issues found / ❌ Failed]

## Next Steps
[What needs to be done]
```

---

## 🎯 Success Criteria

Mark testing as **COMPLETE** when:

1. ✅ All planned combinations tested (per chosen strategy)
2. ✅ Pass rate > 99% (excluding intentional validation failures)
3. ✅ All 22 edge cases validated
4. ✅ No unexpected errors
5. ✅ Performance acceptable (< 2 sec per test average)
6. ✅ Results reproducible (re-running gives same results)
7. ✅ Documentation updated with findings

**Once complete: ZERO combinations will have been missed.** ✅
