# UI Testing Guide

## Test Overview

This test suite validates all possible input combinations on the loan query form at `http://localhost:3080/`.

## The 6 Inputs

1. **Gender** (radio button)
   - Male
   - Female
   - **Total: 2 options**

2. **Loan Amount** (number input)
   - Test values: ₹5L, ₹20L, ₹50L, ₹70L, ₹1Cr, ₹2Cr
   - **Total: 6 test values**

3. **Loan Type** (radio button)
   - Secured
   - Unsecured
   - **Total: 2 options**

4. **Country** (dropdown)
   - 29 countries (USA, UK, Canada, Australia, Germany, France, etc.)
   - **Total: 29 options**

5. **University** (dropdown, dependent on country)
   - Varies by country: 3-10 universities each
   - Average: ~10 universities per country
   - **Total: ~272 universities across all countries**

6. **Level of Study** (dropdown)
   - Bachelor, Master, PhD, Diploma, Certificate, Professional Course
   - **Total: 6 options**

## Total Combinations Calculation

```
Total = Gender × Loan Amount × Loan Type × Country × University × Level

Total = 2 × 6 × 2 × 29 × 10 × 6

Total = 41,760 combinations
```

### Step-by-Step Breakdown:
1. Gender: **2** options
2. × Loan Amount: **2 × 6 = 12**
3. × Loan Type: **12 × 2 = 24**
4. × Country: **24 × 29 = 696**
5. × Universities: **696 × 10 = 6,960**
6. × Level: **6,960 × 6 = 41,760**

## How the Calculation Works

The calculation uses the **multiplication principle** (also called the counting principle):

> If there are `m` ways to make one choice and `n` ways to make a second choice, then there are `m × n` ways to make both choices.

For 6 independent inputs:
- Total = (options in input 1) × (options in input 2) × ... × (options in input 6)

### Why This Formula?

Each combination represents a **unique set of choices** across all 6 inputs. For example:
- {Male, ₹5L, Secured, USA, Harvard, Master}
- {Female, ₹20L, Unsecured, UK, Oxford, Bachelor}
- etc.

Since each input choice is independent of others (except University depends on Country, which we handle by averaging), we multiply to get all possible combinations.

## Test Scripts

### 1. Calculate Combinations (Quick)
```bash
node calculate-combinations.cjs
```
Shows the calculation breakdown and total combinations.

### 2. Run Comprehensive UI Tests
```bash
# Install Playwright first (if not installed)
npm install -D @playwright/test playwright

# Run the test
node ui-test-comprehensive.js
```

## Testing Strategy

### Full Exhaustive Testing
- **41,760 combinations**
- At 1 test/second: **~11.6 hours**
- Recommended for: Final validation before production

### Sampling Strategy
For faster testing during development:

- **10% sample**: 4,176 combinations (~70 minutes)
- **1% sample**: 417 combinations (~7 minutes)
- **Smart sampling**: Test all edge cases + random sample

### Smart Sampling Approach
1. Test all gender combinations (2)
2. Test all loan type combinations (2)
3. Test boundary loan amounts (min, max, default)
4. Sample 5-10 countries
5. Sample 1-2 universities per country
6. Test all level of study options (6)

This reduces testing to **~1,000-2,000 combinations** while maintaining good coverage.

## Test Results

Test results are saved to `ui-test-results.json` with the following information:
- Total combinations tested
- Pass/fail status for each combination
- Results count returned by each query
- Any errors encountered
- Execution time

## Prerequisites

1. **Start the server**:
   ```bash
   npm start
   ```
   Server should be running at `http://localhost:3080/`

2. **Install Playwright** (if not already installed):
   ```bash
   npm install -D @playwright/test playwright
   npx playwright install chromium
   ```

## Running Tests

### Quick Calculation Only
```bash
node calculate-combinations.cjs
```

### Run Automated UI Tests
```bash
# Full test (takes ~11 hours)
node ui-test-comprehensive.js

# 1% sample test (~7 minutes)
# Edit ui-test-comprehensive.js and set:
# maxCombinations: 417
node ui-test-comprehensive.js
```

## Understanding the Results

The test validates that:
1. All input combinations can be submitted without errors
2. The query returns appropriate results (0 or more banks)
3. No JavaScript errors occur
4. The UI responds correctly to all input combinations

Failed tests indicate:
- UI bugs or errors
- Backend query handling issues
- Data integrity problems
- Missing validation

## Notes

- University dropdown is **dependent** on Country selection
- Empty/no selection is a valid option for dropdown inputs
- Each test takes approximately 1 second (includes filling form + waiting for results)
- Tests run in headless mode by default for speed
