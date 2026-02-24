/**
 * SMART DISCOVERY: Find combinations that ACTUALLY return banks
 * Strategy: Test systematically until we find 1000 working combinations
 */

const http = require('http');
const fs = require('fs');

console.log(' SMART DISCOVERY: Finding combinations that return banks...\n');

// Load data
const institutesData = JSON.parse(fs.readFileSync('data/institutes.json', 'utf8'));
const strategicData = JSON.parse(fs.readFileSync('strategic-loan-amounts.json', 'utf8'));
const allAmounts = strategicData.amounts || strategicData;

// Get all unique values
const allCountries = [...new Set(institutesData.map(inst => inst.country))];
const allCourses = [...new Set(institutesData.flatMap(inst => inst.courses || []))];

console.log(` Search space:`);
console.log(`   Countries: ${allCountries.length}`);
console.log(`   Universities: ${institutesData.length}`);
console.log(`   Loan amounts: ${allAmounts.length}`);
console.log(`   Courses: ${allCourses.length}\n`);

// Seeded random
function seededRandom(seed) {
  let value = seed;
  return function() {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

const random = seededRandom(777);

function formatCurrency(amount) {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount}`;
}

/**
 * Test a single combination
 */
function testCombination(combination) {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      gender: combination.gender,
      loanAmount: combination.loanAmount,
      loanType: combination.loanType,
      country: combination.country,
      university: combination.university,
      course: combination.course
    });
    
    const options = {
      hostname: 'localhost',
      port: 3080,
      path: '/api/query-all',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 5000
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          const banks = response.banks || [];
          resolve({
            success: true,
            banksReturned: banks.length,
            banks: banks.map(b => b.bankName),
            response: response
          });
        } catch (err) {
          resolve({ success: false, error: err.message });
        }
      });
    });
    
    req.on('error', () => resolve({ success: false, error: 'Connection error' }));
    req.on('timeout', () => { req.destroy(); resolve({ success: false, error: 'Timeout' }); });
    
    req.write(postData);
    req.end();
  });
}

/**
 * Main discovery loop
 */
async function discoverWorkingCombinations() {
  const workingCombinations = [];
  const genders = ['Male', 'Female'];
  const loanTypes = ['Secured', 'Unsecured'];
  
  let tested = 0;
  let found = 0;
  const startTime = Date.now();
  
  console.log(' Starting systematic search...\n');
  
  // Try all amounts  random universities  random courses
  for (let amountIdx = 0; amountIdx < allAmounts.length && found < 1000; amountIdx++) {
    const amount = allAmounts[amountIdx];
    
    // For each amount, try multiple universities
    const universitiesToTry = Math.min(100, institutesData.length);
    
    for (let u = 0; u < universitiesToTry && found < 1000; u++) {
      const university = institutesData[Math.floor(random() * institutesData.length)];
      const courses = university.courses && university.courses.length > 0 ? university.courses : allCourses;
      
      // Try multiple course/gender/type combinations
      for (let attempt = 0; attempt < 3 && found < 1000; attempt++) {
        const gender = genders[Math.floor(random() * 2)];
        const loanType = loanTypes[Math.floor(random() * 2)];
        const course = courses[Math.floor(random() * courses.length)];
        
        const combination = {
          id: found + 1,
          gender: gender,
          loanAmount: amount,
          loanAmountDisplay: formatCurrency(amount),
          loanType: loanType,
          country: university.country,
          university: university.name,
          course: course
        };
        
        const result = await testCombination(combination);
        tested++;
        
        if (result.success && result.banksReturned > 0) {
          // FOUND ONE!
          workingCombinations.push({
            ...combination,
            output: {
              banksReturned: result.banksReturned,
              banks: result.banks,
              hasResults: true
            }
          });
          
          found++;
          
          if (found % 10 === 0 || found <= 5) {
            const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
            const rate = (tested / elapsed).toFixed(1);
            const successRate = ((found / tested) * 100).toFixed(2);
            console.log(` Found ${found}/1000 | Tested: ${tested} | Success rate: ${successRate}% | ${rate} tests/s`);
            console.log(`   Latest: ${combination.loanAmountDisplay} ${combination.country}  ${result.banksReturned} banks`);
          }
        }
        
        // Progress indicator for large searches
        if (tested % 100 === 0 && found < 10) {
          console.log(`   Searched ${tested} combinations, found ${found}...`);
        }
        
        // Small delay
        await new Promise(resolve => setTimeout(resolve, 30));
      }
    }
  }
  
  return workingCombinations;
}

// Execute
(async () => {
  try {
    const combinations = await discoverWorkingCombinations();
    
    console.log(`\n\n`);
    console.log(` DISCOVERY COMPLETE`);
    console.log(`\n`);
    
    console.log(` Found ${combinations.length} working combinations\n`);
    
    if (combinations.length === 0) {
      console.log(' No working combinations found!');
      console.log(' Your bank data may require specific criteria that are not being met.');
      console.log(' Consider checking your bank JSON files for loan criteria.\n');
      process.exit(1);
    }
    
    // Save results
    const output = {
      generated: new Date().toISOString(),
      description: `${combinations.length} combinations that ACTUALLY return banks`,
      discoveryMethod: "Systematic search through loan amounts  universities  courses",
      totalCombinations: combinations.length,
      combinations: combinations
    };
    
    fs.writeFileSync('working-combinations-discovered.json', JSON.stringify(output, null, 2));
    console.log(' Saved: working-combinations-discovered.json\n');
    
    // Create CSV
    const csvHeader = 'ID,Gender,Loan Amount,Loan Type,Country,University,Course,Banks Returned,Bank Names\n';
    const csvRows = combinations.map(c => {
      const bankNames = c.output.banks.join('; ');
      return `${c.id},"${c.gender}","${c.loanAmountDisplay}","${c.loanType}","${c.country}","${c.university.replace(/"/g, '""')}","${c.course.replace(/"/g, '""')}",${c.output.banksReturned},"${bankNames}"`;
    }).join('\n');
    
    fs.writeFileSync('working-combinations-discovered.csv', csvHeader + csvRows);
    console.log(' Saved: working-combinations-discovered.csv\n');
    
    // Stats
    const bankCounts = {};
    const countryCounts = {};
    const amountCounts = {};
    
    combinations.forEach(c => {
      const count = c.output.banksReturned;
      bankCounts[count] = (bankCounts[count] || 0) + 1;
      countryCounts[c.country] = (countryCounts[c.country] || 0) + 1;
      amountCounts[c.loanAmountDisplay] = (amountCounts[c.loanAmountDisplay] || 0) + 1;
    });
    
    console.log(' Analysis:');
    console.log(`\n   Banks returned:`);
    Object.keys(bankCounts).sort((a, b) => parseInt(b) - parseInt(a)).slice(0, 10).forEach(count => {
      console.log(`      ${count} banks: ${bankCounts[count]} combinations`);
    });
    
    console.log(`\n   Top countries:`);
    Object.entries(countryCounts).sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([country, count]) => {
      console.log(`      ${country}: ${count}`);
    });
    
    console.log(`\n   Top loan amounts:`);
    Object.entries(amountCounts).sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([amt, count]) => {
      console.log(`      ${amt}: ${count}`);
    });
    
    console.log(`\n Files saved with ${combinations.length} REAL working combinations + outputs!`);
    
  } catch (error) {
    console.error('\n Fatal error:', error);
    process.exit(1);
  }
})();
