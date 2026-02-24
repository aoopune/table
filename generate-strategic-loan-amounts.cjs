/**
 * Generate STRATEGIC loan amounts for comprehensive testing
 * 
 * Strategy:
 * 1. All 32 thresholds where ANY bank changes logic
 * 2. All boundary ±1 values (already in the 32)
 * 3. Mid-points BETWEEN consecutive thresholds (to verify consistency)
 * 4. Additional strategic values to catch edge cases
 */

const fs = require('fs');
const path = require('path');

// The 32 base thresholds from all 38 banks
const baseThresholds = [
  1,           // ₹1
  100000,      // ₹1L
  400000,      // ₹4L
  400001,      // ₹4L+1
  500000,      // ₹5L
  500001,      // ₹5L+1
  750000,      // ₹7.5L
  750001,      // ₹7.5L+1
  1000000,     // ₹10L
  1000001,     // ₹10L+1
  1500000,     // ₹15L
  2000000,     // ₹20L
  2000001,     // ₹20L+1
  2500000,     // ₹25L
  3000000,     // ₹30L
  3000001,     // ₹30L+1
  4000000,     // ₹40L
  4000001,     // ₹40L+1
  5000000,     // ₹50L
  6000000,     // ₹60L
  6200000,     // ₹62L
  6200001,     // ₹62L+1
  7500000,     // ₹75L
  8000000,     // ₹80L
  8000001,     // ₹80L+1
  8500000,     // ₹85L
  10000000,    // ₹1Cr
  10000001,    // ₹1Cr+1
  12500000,    // ₹1.25Cr
  15000000,    // ₹1.5Cr
  20000000,    // ₹2Cr
  30000000     // ₹3Cr
];

function formatINR(amount) {
  if (amount < 100000) return `₹${amount}`;
  if (amount < 10000000) {
    const lakhs = amount / 100000;
    return lakhs === Math.floor(lakhs) ? `₹${lakhs}L` : `₹${lakhs.toFixed(2)}L`;
  }
  const crores = amount / 10000000;
  return crores === Math.floor(crores) ? `₹${crores}Cr` : `₹${crores.toFixed(2)}Cr`;
}

function generateStrategicAmounts() {
  const strategicAmounts = new Set();
  
  console.log('=== STRATEGIC LOAN AMOUNT GENERATION ===\n');
  
  // 1. Add all base thresholds
  console.log('Step 1: Adding all 32 base thresholds...');
  baseThresholds.forEach(amt => strategicAmounts.add(amt));
  console.log(`  Added: ${baseThresholds.length} threshold values\n`);
  
  // 2. Add mid-points between consecutive thresholds
  console.log('Step 2: Adding mid-points between thresholds...');
  const sortedBase = [...baseThresholds].sort((a, b) => a - b);
  let midPointCount = 0;
  
  for (let i = 0; i < sortedBase.length - 1; i++) {
    const lower = sortedBase[i];
    const upper = sortedBase[i + 1];
    
    // Only add midpoint if there's significant gap (> ₹1)
    if (upper - lower > 1) {
      const midPoint = Math.floor((lower + upper) / 2);
      if (!strategicAmounts.has(midPoint)) {
        strategicAmounts.add(midPoint);
        console.log(`  Mid-point: ${formatINR(midPoint)} (between ${formatINR(lower)} and ${formatINR(upper)})`);
        midPointCount++;
      }
    }
  }
  console.log(`  Added: ${midPointCount} mid-point values\n`);
  
  // 3. Add critical psychological boundaries (round numbers users might try)
  console.log('Step 3: Adding psychological boundaries...');
  const psychologicalValues = [
    50000,      // ₹50K
    75000,      // ₹75K
    200000,     // ₹2L
    300000,     // ₹3L
    1200000,    // ₹12L
    1800000,    // ₹18L
    3500000,    // ₹35L
    4500000,    // ₹45L
    5500000,    // ₹55L
    7000000,    // ₹70L (default in UI!)
    9000000,    // ₹90L
    11000000,   // ₹1.1Cr
    18000000,   // ₹1.8Cr
    25000000,   // ₹2.5Cr
  ];
  
  let psychCount = 0;
  psychologicalValues.forEach(amt => {
    if (!strategicAmounts.has(amt)) {
      strategicAmounts.add(amt);
      console.log(`  Psychological: ${formatINR(amt)}`);
      psychCount++;
    }
  });
  console.log(`  Added: ${psychCount} psychological boundary values\n`);
  
  // 4. Add verification values near major boundaries
  console.log('Step 4: Adding verification values (±₹1000 from major thresholds)...');
  const majorThresholds = [1000000, 5000000, 10000000, 20000000, 30000000];
  let verifyCount = 0;
  
  majorThresholds.forEach(threshold => {
    const checks = [
      threshold - 1000,  // Just below
      threshold + 1000,  // Just above
    ];
    
    checks.forEach(amt => {
      if (amt > 0 && amt <= 30000000 && !strategicAmounts.has(amt)) {
        strategicAmounts.add(amt);
        verifyCount++;
      }
    });
  });
  console.log(`  Added: ${verifyCount} verification values\n`);
  
  // Sort and convert to array
  const finalAmounts = Array.from(strategicAmounts).sort((a, b) => a - b);
  
  // Display summary
  console.log('=== SUMMARY ===');
  console.log(`Total strategic loan amounts: ${finalAmounts.length}`);
  console.log(`  - Base thresholds: 32`);
  console.log(`  - Mid-points: ${midPointCount}`);
  console.log(`  - Psychological: ${psychCount}`);
  console.log(`  - Verification: ${verifyCount}`);
  console.log(`  - Total unique: ${finalAmounts.length}\n`);
  
  // Show sample distribution
  console.log('=== SAMPLE DISTRIBUTION ===');
  console.log('First 10:', finalAmounts.slice(0, 10).map(formatINR).join(', '));
  console.log('Last 10:', finalAmounts.slice(-10).map(formatINR).join(', '));
  
  return finalAmounts;
}

// Generate the amounts
const strategicAmounts = generateStrategicAmounts();

// Create detailed output
const output = {
  generated: new Date().toISOString(),
  totalAmounts: strategicAmounts.length,
  strategy: 'Thresholds + Mid-points + Psychological + Verification',
  amounts: strategicAmounts,
  formatted: strategicAmounts.map(amt => ({
    amount: amt,
    display: formatINR(amt),
    isThreshold: baseThresholds.includes(amt)
  }))
};

// Save to file
const outputPath = path.join(__dirname, 'strategic-loan-amounts.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8');
console.log(`\n✅ Saved to: ${outputPath}`);

// Calculate new combination count
console.log('\n=== NEW COMBINATION CALCULATION ===');
const genders = 2;
const loanAmounts = strategicAmounts.length;
const loanTypes = 2;
const countries = 114;
const avgUniversities = 31;
const courses = 141;

const totalCombinations = genders * loanAmounts * loanTypes * countries * avgUniversities * courses;

console.log(`Gender × Loan × Type × Country × Univ × Course`);
console.log(`${genders} × ${loanAmounts} × ${loanTypes} × ${countries} × ${avgUniversities} × ${courses}`);
console.log(`= ${totalCombinations.toLocaleString()} combinations`);

const testingSeconds = totalCombinations;
const testingHours = testingSeconds / 3600;
const testingDays = testingHours / 24;

console.log(`\nTesting time @ 1 test/sec:`);
console.log(`  ${testingHours.toLocaleString()} hours`);
console.log(`  ${testingDays.toLocaleString()} days`);
console.log(`  ${(testingDays / 365).toFixed(1)} years`);

console.log('\n✅ Strategic loan amounts generated successfully!');
