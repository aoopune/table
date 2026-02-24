/**
 * Calculate Total UI Test Combinations
 * 
 * This script calculates how many unique combinations can be made
 * using the 6 inputs on the loan query form.
 */

// Define test parameters
const testParams = {
  // Input 1: Gender (radio buttons)
  genders: ['Male', 'Female'],
  
  // Input 2: Loan Amount (number input)
  // For testing, we'll use representative values
  loanAmounts: [
    500000,    // ₹5 lakhs
    2000000,   // ₹20 lakhs
    5000000,   // ₹50 lakhs
    7000000,   // ₹70 lakhs (default value)
    10000000,  // ₹1 crore
    20000000   // ₹2 crores
  ],
  
  // Input 3: Loan Type/Secured (radio buttons)
  loanTypes: ['Secured', 'Unsecured'],
  
  // Input 4: Country (dropdown)
  countries: [
    'United States of America',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Netherlands',
    'Ireland',
    'Singapore',
    'United Arab Emirates',
    'New Zealand',
    'Sweden',
    'Switzerland',
    'Denmark',
    'Finland',
    'Norway',
    'Japan',
    'South Korea',
    'China',
    'Hong Kong',
    'Italy',
    'Spain',
    'Belgium',
    'Austria',
    'Poland',
    'Czechia',
    'Hungary',
    'Malaysia',
    'India'
  ],
  
  // Input 5: University (dropdown - depends on country)
  // We'll estimate based on available data
  universitiesByCountry: {
    'United States of America': 10,
    'United Kingdom': 6,
    'Canada': 3,
    'Australia': 3,
    // Most other countries have limited data, estimate 10 on average
  },
  
  // Input 6: Level of Study (dropdown)
  // Common values from education loan context
  levelsOfStudy: [
    'Bachelor',
    'Master',
    'PhD',
    'Diploma',
    'Certificate',
    'Professional Course'
  ]
};

/**
 * Calculate universities per country
 */
function calculateUniversityOptions() {
  let totalUniversities = 0;
  let countriesWithExplicitCounts = 0;
  
  for (const country in testParams.universitiesByCountry) {
    totalUniversities += testParams.universitiesByCountry[country];
    countriesWithExplicitCounts++;
  }
  
  // For countries without explicit university counts, assume average of 10
  const countriesWithoutLists = testParams.countries.length - countriesWithExplicitCounts;
  const estimatedUniversities = countriesWithoutLists * 10;
  totalUniversities += estimatedUniversities;
  
  const avgPerCountry = totalUniversities / testParams.countries.length;
  
  return {
    totalUniversities,
    avgPerCountry: Math.ceil(avgPerCountry),
    countriesWithExplicitLists: countriesWithExplicitCounts,
    countriesWithoutLists
  };
}

/**
 * Main calculation
 */
function calculateCombinations() {
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('  LOAN QUERY UI - TOTAL COMBINATIONS CALCULATION');
  console.log('═══════════════════════════════════════════════════════════════════\n');
  
  // Input counts
  const numGenders = testParams.genders.length;
  const numLoanAmounts = testParams.loanAmounts.length;
  const numLoanTypes = testParams.loanTypes.length;
  const numCountries = testParams.countries.length;
  const numLevels = testParams.levelsOfStudy.length;
  
  const universityData = calculateUniversityOptions();
  const avgUniversities = universityData.avgPerCountry;
  
  console.log('📋 INPUT BREAKDOWN:');
  console.log('───────────────────────────────────────────────────────────────────');
  console.log(`1. Gender:              ${numGenders} options`);
  console.log(`   Options: ${testParams.genders.join(', ')}`);
  console.log('');
  
  console.log(`2. Loan Amount:         ${numLoanAmounts} test values`);
  console.log(`   Values: ₹${testParams.loanAmounts.map(a => (a/100000).toFixed(0) + 'L').join(', ₹')}`);
  console.log('');
  
  console.log(`3. Loan Type:           ${numLoanTypes} options`);
  console.log(`   Options: ${testParams.loanTypes.join(', ')}`);
  console.log('');
  
  console.log(`4. Country:             ${numCountries} countries`);
  console.log(`   Countries: ${testParams.countries.slice(0, 5).join(', ')}, ...`);
  console.log('');
  
  console.log(`5. University:          ~${avgUniversities} avg per country`);
  console.log(`   Total universities: ~${universityData.totalUniversities}`);
  console.log(`   (${universityData.countriesWithExplicitLists} countries with lists,`);
  console.log(`    ${universityData.countriesWithoutLists} estimated at 10 each)`);
  console.log('');
  
  console.log(`6. Level of Study:      ${numLevels} options`);
  console.log(`   Levels: ${testParams.levelsOfStudy.join(', ')}`);
  console.log('');
  
  // Calculate total combinations
  // Formula: Gender × LoanAmount × LoanType × Country × University × Level
  const totalCombinations = numGenders * numLoanAmounts * numLoanTypes * numCountries * avgUniversities * numLevels;
  
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('📊 CALCULATION:');
  console.log('───────────────────────────────────────────────────────────────────');
  console.log(`Total Combinations = Gender × Loan Amount × Loan Type × Country × University × Level`);
  console.log('');
  console.log(`                   = ${numGenders} × ${numLoanAmounts} × ${numLoanTypes} × ${numCountries} × ${avgUniversities} × ${numLevels}`);
  console.log('');
  console.log(`                   = ${totalCombinations.toLocaleString()} combinations`);
  console.log('═══════════════════════════════════════════════════════════════════\n');
  
  // Breakdown by stages
  console.log('🔢 STEP-BY-STEP MULTIPLICATION:');
  console.log('───────────────────────────────────────────────────────────────────');
  let running = numGenders;
  console.log(`Step 1: Gender                     = ${running.toLocaleString()}`);
  
  running *= numLoanAmounts;
  console.log(`Step 2: × Loan Amount             = ${running.toLocaleString()}`);
  
  running *= numLoanTypes;
  console.log(`Step 3: × Loan Type               = ${running.toLocaleString()}`);
  
  running *= numCountries;
  console.log(`Step 4: × Country                 = ${running.toLocaleString()}`);
  
  running *= avgUniversities;
  console.log(`Step 5: × Avg Universities        = ${running.toLocaleString()}`);
  
  running *= numLevels;
  console.log(`Step 6: × Level of Study          = ${running.toLocaleString()}`);
  console.log('═══════════════════════════════════════════════════════════════════\n');
  
  // Practical testing considerations
  console.log('⚠️  PRACTICAL TESTING CONSIDERATIONS:');
  console.log('───────────────────────────────────────────────────────────────────');
  console.log(`Full exhaustive testing: ${totalCombinations.toLocaleString()} combinations`);
  
  // If we test each combination at 1 second each
  const secondsPerTest = 1;
  const totalSeconds = totalCombinations * secondsPerTest;
  const hours = (totalSeconds / 3600).toFixed(1);
  const days = (totalSeconds / 86400).toFixed(1);
  console.log(`Time at 1 test/second:   ${hours} hours (${days} days)`);
  
  // Sampling strategy
  const sampleRate = 0.01; // Test 1% of combinations
  const sampleSize = Math.floor(totalCombinations * sampleRate);
  const sampleTimeMinutes = (sampleSize * secondsPerTest / 60).toFixed(0);
  console.log(`\n10% sample:              ${Math.floor(totalCombinations * 0.1).toLocaleString()} combinations`);
  console.log(`1% sample:               ${sampleSize.toLocaleString()} combinations (~${sampleTimeMinutes} minutes)`);
  console.log('═══════════════════════════════════════════════════════════════════\n');
  
  return {
    totalCombinations,
    breakdown: {
      genders: numGenders,
      loanAmounts: numLoanAmounts,
      loanTypes: numLoanTypes,
      countries: numCountries,
      universities: avgUniversities,
      levels: numLevels
    }
  };
}

// Run calculation
if (require.main === module) {
  calculateCombinations();
}

module.exports = { calculateCombinations, testParams };
