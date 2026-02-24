/**
 * Comprehensive UI Test Script
 * Tests all possible combinations of the 6 inputs on http://localhost:3080/
 * 
 * The 6 inputs are:
 * 1. Gender (radio buttons: Male, Female)
 * 2. Loan Amount (number input)
 * 3. Loan Type/Secured (radio buttons: Secured, Unsecured)
 * 4. Country (combobox/dropdown)
 * 5. University (combobox/dropdown - depends on country)
 * 6. Level of Study (combobox/dropdown)
 */

const { chromium } = require('playwright');
const fs = require('fs');

// Test configuration
const TEST_CONFIG = {
  url: 'http://localhost:3080/',
  // Test with representative loan amounts (in rupees)
  loanAmounts: [
    500000,    // 5 lakhs
    2000000,   // 20 lakhs
    5000000,   // 50 lakhs  
    7000000,   // 70 lakhs (default)
    10000000,  // 1 crore
    20000000   // 2 crores
  ],
  // We'll discover these dynamically from the page:
  countries: [],
  universitiesByCountry: {},
  levelsOfStudy: [],
  // For practical testing, we can sample universities instead of testing all
  sampleUniversitiesPerCountry: 3,
  // Maximum combinations to test (set to null for unlimited)
  maxCombinations: null,
  // Output file for results
  outputFile: 'ui-test-results.json'
};

// Results tracking
const results = {
  startTime: new Date().toISOString(),
  config: TEST_CONFIG,
  combinations: [],
  summary: {
    totalCombinations: 0,
    tested: 0,
    passed: 0,
    failed: 0,
    errors: []
  }
};

/**
 * Discover all available options from the page
 */
async function discoverOptions(page) {
  console.log('🔍 Discovering available options from the page...');
  
  // Get countries from the dropdown
  await page.click('#country');
  await page.waitForTimeout(500);
  const countries = await page.evaluate(() => {
    const menu = document.getElementById('country-menu');
    if (!menu) return [];
    const options = Array.from(menu.querySelectorAll('.combo-option'));
    return options.map(opt => opt.textContent.trim()).filter(t => t && t !== '—');
  });
  console.log(`  ✓ Found ${countries.length} countries`);
  
  // Get universities for each country (sample)
  const universitiesByCountry = {};
  const sampleCountries = countries.slice(0, 5); // Sample first 5 for quick discovery
  
  for (const country of sampleCountries) {
    // Select country
    await page.fill('#country', '');
    await page.fill('#country', country);
    await page.waitForTimeout(300);
    await page.click(`#country-menu button:has-text("${country}")`);
    await page.waitForTimeout(500);
    
    // Get universities
    await page.click('#university');
    await page.waitForTimeout(500);
    const universities = await page.evaluate(() => {
      const menu = document.getElementById('university-menu');
      if (!menu) return [];
      const options = Array.from(menu.querySelectorAll('.combo-option'));
      return options.map(opt => opt.textContent.trim()).filter(t => t && t !== '—');
    });
    
    universitiesByCountry[country] = universities.slice(0, TEST_CONFIG.sampleUniversitiesPerCountry);
    console.log(`  ✓ Found ${universities.length} universities for ${country} (using ${universitiesByCountry[country].length})`);
  }
  
  // Get levels of study
  await page.click('#levelOfStudy');
  await page.waitForTimeout(500);
  const levelsOfStudy = await page.evaluate(() => {
    const menu = document.getElementById('level-menu');
    if (!menu) return [];
    const options = Array.from(menu.querySelectorAll('.combo-option'));
    return options.map(opt => opt.textContent.trim()).filter(t => t && t !== '—');
  });
  console.log(`  ✓ Found ${levelsOfStudy.length} levels of study`);
  
  return {
    countries,
    universitiesByCountry,
    levelsOfStudy
  };
}

/**
 * Calculate total number of combinations
 */
function calculateTotalCombinations(options) {
  const genders = 2; // Male, Female
  const loanAmounts = TEST_CONFIG.loanAmounts.length;
  const loanTypes = 2; // Secured, Unsecured
  const countries = options.countries.length;
  
  // For universities, we need to count based on what we'll actually test
  let totalUniversityCombinations = 0;
  for (const country of options.countries) {
    const univs = options.universitiesByCountry[country] || [''];
    // Test with each university + empty (no selection)
    totalUniversityCombinations += Math.max(1, univs.length + 1);
  }
  const avgUniversitiesPerCountry = totalUniversityCombinations / countries;
  
  const levels = Math.max(1, options.levelsOfStudy.length + 1); // Including empty
  
  const total = genders * loanAmounts * loanTypes * countries * avgUniversitiesPerCountry * levels;
  
  console.log('\n📊 COMBINATION CALCULATION:');
  console.log('════════════════════════════════════════════════════════════');
  console.log(`  Gender options:           ${genders} (Male, Female)`);
  console.log(`  Loan amounts to test:     ${loanAmounts}`);
  console.log(`  Loan type options:        ${loanTypes} (Secured, Unsecured)`);
  console.log(`  Countries:                ${countries}`);
  console.log(`  Avg universities/country: ${avgUniversitiesPerCountry.toFixed(1)} (including empty)`);
  console.log(`  Level of study options:   ${levels} (including empty)`);
  console.log('────────────────────────────────────────────────────────────');
  console.log(`  TOTAL = ${genders} × ${loanAmounts} × ${loanTypes} × ${countries} × ${avgUniversitiesPerCountry.toFixed(1)} × ${levels}`);
  console.log(`  TOTAL COMBINATIONS = ${Math.floor(total).toLocaleString()}`);
  console.log('════════════════════════════════════════════════════════════\n');
  
  return {
    total: Math.floor(total),
    breakdown: {
      genders,
      loanAmounts,
      loanTypes,
      countries,
      avgUniversitiesPerCountry: avgUniversitiesPerCountry.toFixed(1),
      levels
    }
  };
}

/**
 * Test a single combination
 */
async function testCombination(page, combo, index, total) {
  const { gender, amount, secured, country, university, levelOfStudy } = combo;
  
  try {
    // Set gender
    await page.check(`#gender-${gender.toLowerCase()}`);
    
    // Set loan amount
    await page.fill('#amount', amount.toString());
    
    // Set secured/unsecured
    await page.check(`#secured-${secured ? 'yes' : 'no'}`);
    
    // Set country
    if (country) {
      await page.fill('#country', '');
      await page.fill('#country', country);
      await page.waitForTimeout(200);
      await page.click(`#country-menu button:has-text("${country}")`);
      await page.waitForTimeout(200);
    }
    
    // Set university
    if (university) {
      await page.fill('#university', '');
      await page.fill('#university', university);
      await page.waitForTimeout(200);
      await page.click(`#university-menu button:has-text("${university}")`);
      await page.waitForTimeout(200);
    }
    
    // Set level of study
    if (levelOfStudy) {
      await page.fill('#levelOfStudy', '');
      await page.fill('#levelOfStudy', levelOfStudy);
      await page.waitForTimeout(200);
      await page.click(`#level-menu button:has-text("${levelOfStudy}")`);
      await page.waitForTimeout(200);
    }
    
    // Submit form
    await page.click('#run-btn');
    await page.waitForTimeout(500);
    
    // Check for errors
    const errorText = await page.textContent('#error-zone').catch(() => '');
    const hasError = errorText && errorText.trim().length > 0;
    
    // Get results count
    const countText = await page.textContent('#count');
    const resultsCount = parseInt(countText.match(/\d+/)?.[0] || '0');
    
    // Log progress
    const progress = ((index + 1) / total * 100).toFixed(1);
    console.log(`[${index + 1}/${total} - ${progress}%] ${gender} | ₹${amount.toLocaleString()} | ${secured ? 'Secured' : 'Unsecured'} | ${country || 'Any'} | ${university || 'Any'} | ${levelOfStudy || 'Any'} → ${hasError ? '❌ ERROR' : `✓ ${resultsCount} results`}`);
    
    return {
      combo,
      success: !hasError,
      resultsCount,
      error: hasError ? errorText : null
    };
    
  } catch (error) {
    console.error(`❌ Test failed for combination ${index + 1}:`, error.message);
    return {
      combo,
      success: false,
      error: error.message
    };
  }
}

/**
 * Generate all combinations to test
 */
function generateCombinations(options) {
  const combinations = [];
  const genders = ['Male', 'Female'];
  const loanTypes = [true, false]; // true = Secured, false = Unsecured
  
  for (const gender of genders) {
    for (const amount of TEST_CONFIG.loanAmounts) {
      for (const secured of loanTypes) {
        for (const country of options.countries) {
          const universities = options.universitiesByCountry[country] || [''];
          // Add empty option
          const univsToTest = ['', ...universities.slice(0, TEST_CONFIG.sampleUniversitiesPerCountry)];
          
          for (const university of univsToTest) {
            const levelsToTest = ['', ...options.levelsOfStudy];
            
            for (const levelOfStudy of levelsToTest) {
              combinations.push({
                gender,
                amount,
                secured,
                country,
                university,
                levelOfStudy
              });
            }
          }
        }
      }
    }
  }
  
  return combinations;
}

/**
 * Main test function
 */
async function runTests() {
  console.log('🚀 Starting Comprehensive UI Test');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Navigate to page
    console.log(`📄 Loading ${TEST_CONFIG.url}...`);
    await page.goto(TEST_CONFIG.url);
    await page.waitForLoadState('networkidle');
    console.log('  ✓ Page loaded\n');
    
    // Discover options
    const options = await discoverOptions(page);
    TEST_CONFIG.countries = options.countries;
    TEST_CONFIG.universitiesByCountry = options.universitiesByCountry;
    TEST_CONFIG.levelsOfStudy = options.levelsOfStudy;
    
    // Calculate total combinations
    const combinationStats = calculateTotalCombinations(options);
    results.summary.totalCombinations = combinationStats.total;
    results.combinationBreakdown = combinationStats.breakdown;
    
    // Generate combinations to test
    console.log('⚙️  Generating test combinations...');
    const combinations = generateCombinations(options);
    const toTest = TEST_CONFIG.maxCombinations 
      ? combinations.slice(0, TEST_CONFIG.maxCombinations)
      : combinations;
    console.log(`  ✓ Will test ${toTest.length.toLocaleString()} combinations\n`);
    
    // Run tests
    console.log('🧪 Running tests...\n');
    for (let i = 0; i < toTest.length; i++) {
      const result = await testCombination(page, toTest[i], i, toTest.length);
      results.combinations.push(result);
      results.summary.tested++;
      
      if (result.success) {
        results.summary.passed++;
      } else {
        results.summary.failed++;
        results.summary.errors.push({
          combination: result.combo,
          error: result.error
        });
      }
      
      // Save intermediate results every 100 tests
      if ((i + 1) % 100 === 0) {
        fs.writeFileSync(TEST_CONFIG.outputFile, JSON.stringify(results, null, 2));
      }
    }
    
  } catch (error) {
    console.error('\n❌ Test execution failed:', error);
    results.summary.errors.push({ error: error.message });
  } finally {
    await browser.close();
    
    // Save final results
    results.endTime = new Date().toISOString();
    fs.writeFileSync(TEST_CONFIG.outputFile, JSON.stringify(results, null, 2));
    
    // Print summary
    console.log('\n\n═══════════════════════════════════════════════════════════');
    console.log('📊 TEST SUMMARY');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`Total combinations: ${results.summary.totalCombinations.toLocaleString()}`);
    console.log(`Tested:             ${results.summary.tested.toLocaleString()}`);
    console.log(`Passed:             ${results.summary.passed.toLocaleString()} ✓`);
    console.log(`Failed:             ${results.summary.failed.toLocaleString()} ❌`);
    console.log(`Success rate:       ${(results.summary.passed / results.summary.tested * 100).toFixed(2)}%`);
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`\nResults saved to: ${TEST_CONFIG.outputFile}`);
  }
}

// Run tests
runTests().catch(console.error);
