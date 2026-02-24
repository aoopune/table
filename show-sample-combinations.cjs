/**
 * Generate and display sample UI test combinations
 * Shows what the actual test cases look like
 */

const fs = require('fs');
const path = require('path');

// Load data
const institutesPath = path.join(__dirname, 'data', 'institutes.json');
const institutes = JSON.parse(fs.readFileSync(institutesPath, 'utf8'));

const strategicAmountsPath = path.join(__dirname, 'strategic-loan-amounts.json');
const strategicData = JSON.parse(fs.readFileSync(strategicAmountsPath, 'utf8'));
const loanAmounts = strategicData.amounts;

// Extract unique values
const countries = [...new Set(institutes.map(i => i.country).filter(Boolean))].sort();
const courses = [...new Set(institutes.map(i => i.course).filter(Boolean))].sort();

// Get universities by country
const universitiesByCountry = {};
institutes.forEach(inst => {
  if (inst.country && inst.university) {
    if (!universitiesByCountry[inst.country]) {
      universitiesByCountry[inst.country] = new Set();
    }
    universitiesByCountry[inst.country].add(inst.university);
  }
});

function formatINR(amount) {
  if (amount < 100000) return `₹${amount.toLocaleString('en-IN')}`;
  if (amount < 10000000) {
    const lakhs = amount / 100000;
    return `₹${lakhs.toFixed(lakhs % 1 === 0 ? 0 : 2)}L`;
  }
  const crores = amount / 10000000;
  return `₹${crores.toFixed(crores % 1 === 0 ? 0 : 2)}Cr`;
}

function generateSampleCombinations(count = 50) {
  const combinations = [];
  const genders = ['Male', 'Female'];
  const loanTypes = ['Secured', 'Unsecured'];
  
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('  SAMPLE UI TEST COMBINATIONS');
  console.log('═══════════════════════════════════════════════════════════════════\n');
  
  console.log(`Generating ${count} sample combinations from 140,354,220 total...\n`);
  
  // Generate diverse samples
  for (let i = 0; i < count; i++) {
    // Vary the selections to show diversity
    const gender = genders[i % 2];
    const loanAmount = loanAmounts[Math.floor((i * loanAmounts.length) / count)];
    const loanType = loanTypes[Math.floor(i / (count / 2)) % 2];
    const country = countries[Math.floor((i * countries.length) / count)];
    
    const countryUnivs = universitiesByCountry[country] ? Array.from(universitiesByCountry[country]) : [];
    const university = countryUnivs.length > 0 
      ? countryUnivs[Math.floor((i * countryUnivs.length) / count)] 
      : 'N/A';
    
    const course = courses[Math.floor((i * courses.length) / count)];
    
    combinations.push({
      id: i + 1,
      gender,
      loanAmount,
      loanAmountDisplay: formatINR(loanAmount),
      loanType,
      country,
      university,
      course
    });
  }
  
  return combinations;
}

function displayCombinations(combinations) {
  console.log('┌────┬────────┬──────────┬──────────┬─────────────────────┬──────────────────────────────────┬────────────────────────────────┐');
  console.log('│ ID │ Gender │ Amount   │ Type     │ Country             │ University                       │ Course                         │');
  console.log('├────┼────────┼──────────┼──────────┼─────────────────────┼──────────────────────────────────┼────────────────────────────────┤');
  
  combinations.forEach(combo => {
    const id = String(combo.id).padEnd(2);
    const gender = combo.gender.padEnd(6);
    const amount = combo.loanAmountDisplay.padEnd(8);
    const type = combo.loanType.padEnd(8);
    const country = combo.country.length > 19 ? combo.country.substring(0, 16) + '...' : combo.country.padEnd(19);
    const university = combo.university.length > 32 ? combo.university.substring(0, 29) + '...' : combo.university.padEnd(32);
    const course = combo.course.length > 30 ? combo.course.substring(0, 27) + '...' : combo.course.padEnd(30);
    
    console.log(`│ ${id} │ ${gender} │ ${amount} │ ${type} │ ${country} │ ${university} │ ${course} │`);
  });
  
  console.log('└────┴────────┴──────────┴──────────┴─────────────────────┴──────────────────────────────────┴────────────────────────────────┘');
}

function showDetailedExamples() {
  console.log('\n\n═══════════════════════════════════════════════════════════════════');
  console.log('  DETAILED EXAMPLES');
  console.log('═══════════════════════════════════════════════════════════════════\n');
  
  const examples = [
    {
      name: 'Example 1: Common User Query',
      combo: {
        gender: 'Male',
        loanAmount: formatINR(7000000),
        loanType: 'Secured',
        country: 'United States of America',
        university: 'Harvard University',
        course: 'Business & Management'
      }
    },
    {
      name: 'Example 2: Low Amount Threshold',
      combo: {
        gender: 'Female',
        loanAmount: formatINR(400000),
        loanType: 'Unsecured',
        country: 'United Kingdom',
        university: 'University of Oxford',
        course: 'Computer Science & IT'
      }
    },
    {
      name: 'Example 3: High Amount',
      combo: {
        gender: 'Male',
        loanAmount: formatINR(30000000),
        loanType: 'Secured',
        country: 'Canada',
        university: 'University of Toronto',
        course: 'Engineering'
      }
    },
    {
      name: 'Example 4: Mid-Point Test (catches hidden thresholds)',
      combo: {
        gender: 'Female',
        loanAmount: formatINR(4500000) + ' (mid-point between ₹4L and ₹5L)',
        loanType: 'Secured',
        country: 'Australia',
        university: 'University of Melbourne',
        course: 'Medicine & Health Sciences'
      }
    },
    {
      name: 'Example 5: Boundary Test',
      combo: {
        gender: 'Male',
        loanAmount: formatINR(10000001) + ' (₹1Cr + ₹1)',
        loanType: 'Unsecured',
        country: 'Germany',
        university: 'Technical University of Munich',
        course: 'STEM'
      }
    }
  ];
  
  examples.forEach((ex, idx) => {
    console.log(`${ex.name}:`);
    console.log('  ┌──────────────────────────────────────────────────────────────┐');
    console.log(`  │ Gender:      ${ex.combo.gender.padEnd(46)} │`);
    console.log(`  │ Loan Amount: ${ex.combo.loanAmount.padEnd(46)} │`);
    console.log(`  │ Loan Type:   ${ex.combo.loanType.padEnd(46)} │`);
    console.log(`  │ Country:     ${ex.combo.country.padEnd(46)} │`);
    console.log(`  │ University:  ${ex.combo.university.padEnd(46)} │`);
    console.log(`  │ Course:      ${ex.combo.course.padEnd(46)} │`);
    console.log('  └──────────────────────────────────────────────────────────────┘');
    if (idx < examples.length - 1) console.log('');
  });
}

function showCombinationStructure() {
  console.log('\n\n═══════════════════════════════════════════════════════════════════');
  console.log('  HOW COMBINATIONS ARE GENERATED');
  console.log('═══════════════════════════════════════════════════════════════════\n');
  
  console.log('Each combination is created by selecting ONE value from EACH dimension:\n');
  
  console.log('1. Gender = { Male, Female }');
  console.log('   Pick ONE: Male\n');
  
  console.log('2. Loan Amount = { ₹1, ₹50K, ₹75K, ₹1L, ..., ₹3Cr } (71 values)');
  console.log('   Pick ONE: ₹7L\n');
  
  console.log('3. Loan Type = { Secured, Unsecured }');
  console.log('   Pick ONE: Secured\n');
  
  console.log('4. Country = { USA, UK, Canada, ... } (114 countries)');
  console.log('   Pick ONE: United States of America\n');
  
  console.log('5. University = { Harvard, MIT, Stanford, ... } (1036 in USA)');
  console.log('   Pick ONE: Harvard University\n');
  
  console.log('6. Course = { Business, Engineering, Medicine, ... } (141 courses)');
  console.log('   Pick ONE: Business & Management\n');
  
  console.log('Result: ONE test combination →');
  console.log('  Test: Male, ₹7L, Secured, USA, Harvard, Business & Management\n');
  
  console.log('Total possible combinations:');
  console.log('  2 × 71 × 2 × 114 × (sum of universities per country) × 141');
  console.log('  = 140,354,220 unique test cases\n');
}

// Generate and display
const samples = generateSampleCombinations(50);
displayCombinations(samples);
showDetailedExamples();
showCombinationStructure();

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log('  SUMMARY');
console.log('═══════════════════════════════════════════════════════════════════\n');
console.log(`Total Combinations:     140,354,220`);
console.log(`Samples shown above:    ${samples.length}`);
console.log(`Percentage shown:       ${(samples.length / 140354220 * 100).toFixed(6)}%`);
console.log('\nTo test ALL combinations, each of the 140.35 million test cases');
console.log('would be executed with a unique set of 6 input values.\n');
