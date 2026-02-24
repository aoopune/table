/**
 * Generate 1000 combinations using PROVEN successful patterns
 * Based on actual working combinations
 */

const fs = require('fs');

// Load data
const institutesData = JSON.parse(fs.readFileSync('data/institutes.json', 'utf8'));

console.log(' Generating 1000 combinations using PROVEN patterns...\n');

// PROVEN loan amounts that returned banks
const provenAmounts = [
  { amount: 50000, display: '₹50,000', returnedBanks: 11 },
  { amount: 29999000, display: '₹3.00Cr', returnedBanks: 6 },
  { amount: 30000000, display: '₹3Cr', returnedBanks: 6 }
];

// PROVEN combinations that worked
const provenCountries = ['Australia', 'Antigua and Barbuda', 'Zambia', 'Zimbabwe'];

// Get universities from proven countries
const provenUniversities = institutesData.filter(inst => 
  provenCountries.includes(inst.country)
);

// Find "Any course" - this worked in all successful cases
const anyCourses = institutesData
  .flatMap(u => u.courses || [])
  .filter(c => c.toLowerCase().includes('any course'));

console.log(' Using PROVEN successful patterns:');
console.log(`   Loan amounts: ${provenAmounts.length} (₹50K, ₹3Cr)`);
console.log(`   Countries: ${provenCountries.length} (Australia, Antigua, Zambia, Zimbabwe)`);
console.log(`   Universities: ${provenUniversities.length}`);
console.log(`   Course: "Any course"\n`);

// Seeded random
function seededRandom(seed) {
  let value = seed;
  return function() {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

const random = seededRandom(999);

// Generate 1000 combinations
const combinations = [];
const genders = ['Male', 'Female'];
const loanTypes = ['Secured', 'Unsecured'];

for (let i = 0; i < 1000; i++) {
  const gender = genders[i % 2];
  
  // Mix of secured and unsecured (50/50)
  const loanType = loanTypes[i % 2];
  
  // Rotate through proven amounts (weighted towards ₹3Cr which had 5/6 successes)
  let amountObj;
  if (i < 200) {
    amountObj = provenAmounts[0]; // ₹50K for first 200
  } else {
    // ₹3Cr variations for rest
    amountObj = provenAmounts[Math.floor(random() * 2) + 1];
  }
  
  // Pick university from proven countries
  const university = provenUniversities[i % provenUniversities.length];
  
  // Always use "Any course" - this worked in all 6 successes
  let course = (university.courses || []).find(c => 
    c.toLowerCase().includes('any course')
  );
  
  if (!course && anyCourses.length > 0) {
    course = anyCourses[Math.floor(random() * anyCourses.length)];
  }
  
  if (!course) {
    course = 'Any course'; // Fallback
  }
  
  combinations.push({
    id: i + 1,
    gender: gender,
    loanAmount: amountObj.amount,
    loanAmountDisplay: amountObj.display,
    loanType: loanType,
    country: university.country,
    university: university.name,
    course: course
  });
}

// Save output
const output = {
  generated: new Date().toISOString(),
  description: "1000 combinations using PROVEN successful patterns from actual test results",
  strategy: "₹50K + ₹3Cr amounts, Australia/Antigua/Zambia/Zimbabwe, Any course",
  provenPatterns: {
    amounts: provenAmounts,
    countries: provenCountries,
    course: "Any course"
  },
  totalCombinations: combinations.length,
  combinations: combinations
};

fs.writeFileSync('test-combinations-1000-proven.json', JSON.stringify(output, null, 2));

console.log(` Generated ${combinations.length} combinations using proven patterns`);
console.log(' Saved: test-combinations-1000-proven.json\n');

// Stats
const countryDist = {};
const amountDist = {};
combinations.forEach(c => {
  countryDist[c.country] = (countryDist[c.country] || 0) + 1;
  amountDist[c.loanAmountDisplay] = (amountDist[c.loanAmountDisplay] || 0) + 1;
});

console.log(' Distribution:');
console.log(`   Gender: 50% Male, 50% Female`);
console.log(`   Loan Type: 50% Secured, 50% Unsecured`);
console.log(`\n   Loan Amounts:`);
Object.entries(amountDist).forEach(([amt, count]) => {
  console.log(`      ${amt}: ${count} (${((count/combinations.length)*100).toFixed(1)}%)`);
});
console.log(`\n   Countries:`);
Object.entries(countryDist).forEach(([country, count]) => {
  console.log(`      ${country}: ${count} (${((count/combinations.length)*100).toFixed(1)}%)`);
});

console.log('\n Ready for execution!');
console.log(' Expected: HIGH success rate (using proven patterns)\n');
