/**
 * Generate 1000 well-distributed test combinations
 * Outputs to multiple formats for easy review and testing
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

// Convert to arrays
Object.keys(universitiesByCountry).forEach(country => {
  universitiesByCountry[country] = Array.from(universitiesByCountry[country]).sort();
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

// Deterministic pseudo-random (for reproducible results)
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateWellDistributedCombinations(count = 1000) {
  const combinations = [];
  const genders = ['Male', 'Female'];
  const loanTypes = ['Secured', 'Unsecured'];
  
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('  GENERATING 1000 WELL-DISTRIBUTED TEST COMBINATIONS');
  console.log('═══════════════════════════════════════════════════════════════════\n');
  
  console.log('Strategy: Stratified sampling to ensure diverse coverage\n');
  console.log('Progress:');
  
  for (let i = 0; i < count; i++) {
    // Progress indicator
    if ((i + 1) % 100 === 0) {
      console.log(`  Generated ${i + 1}/${count} combinations...`);
    }
    
    // Use different distribution strategies for different ranges
    // to ensure good coverage across all dimensions
    
    // Gender: Alternate evenly
    const gender = genders[i % 2];
    
    // Loan Amount: Ensure all 71 amounts get represented multiple times
    // Use stratified sampling: divide 1000 into chunks
    const loanIdx = Math.floor((i * loanAmounts.length) / count);
    const loanAmount = loanAmounts[loanIdx];
    
    // Loan Type: Distribute evenly
    const loanType = loanTypes[Math.floor(i / (count / 2)) % 2];
    
    // Country: Ensure all 114 countries get represented
    // Use stratified + some randomness for diversity
    const countryIdx = Math.floor((i * countries.length) / count);
    const countryOffset = Math.floor(seededRandom(i * 13) * 5); // Small random offset
    const finalCountryIdx = (countryIdx + countryOffset) % countries.length;
    const country = countries[finalCountryIdx];
    
    // University: Pick from country's universities with distribution
    const countryUnivs = universitiesByCountry[country] || [];
    if (countryUnivs.length === 0) {
      console.log(`  ⚠️  Warning: No universities for ${country}, skipping...`);
      continue;
    }
    
    const univIdx = Math.floor(seededRandom(i * 17) * countryUnivs.length);
    const university = countryUnivs[univIdx];
    
    // Course: Ensure all 141 courses get represented
    const courseIdx = Math.floor((i * courses.length) / count);
    const courseOffset = Math.floor(seededRandom(i * 19) * 7); // Small random offset
    const finalCourseIdx = (courseIdx + courseOffset) % courses.length;
    const course = courses[finalCourseIdx];
    
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
  
  console.log(`\n✅ Generated ${combinations.length} combinations\n`);
  
  return combinations;
}

function analyzeCoverage(combinations) {
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('  COVERAGE ANALYSIS');
  console.log('═══════════════════════════════════════════════════════════════════\n');
  
  const genderCount = {};
  const loanAmountCount = {};
  const loanTypeCount = {};
  const countryCount = {};
  const courseCount = {};
  
  combinations.forEach(c => {
    genderCount[c.gender] = (genderCount[c.gender] || 0) + 1;
    loanAmountCount[c.loanAmountDisplay] = (loanAmountCount[c.loanAmountDisplay] || 0) + 1;
    loanTypeCount[c.loanType] = (loanTypeCount[c.loanType] || 0) + 1;
    countryCount[c.country] = (countryCount[c.country] || 0) + 1;
    courseCount[c.course] = (courseCount[c.course] || 0) + 1;
  });
  
  console.log('Gender Distribution:');
  Object.entries(genderCount).forEach(([k, v]) => {
    console.log(`  ${k}: ${v} (${(v/combinations.length*100).toFixed(1)}%)`);
  });
  
  console.log(`\nLoan Amounts: ${Object.keys(loanAmountCount).length} of 71 covered`);
  console.log(`  Min occurrences: ${Math.min(...Object.values(loanAmountCount))}`);
  console.log(`  Max occurrences: ${Math.max(...Object.values(loanAmountCount))}`);
  console.log(`  Avg per amount: ${(combinations.length / Object.keys(loanAmountCount).length).toFixed(1)}`);
  
  console.log(`\nLoan Type Distribution:`);
  Object.entries(loanTypeCount).forEach(([k, v]) => {
    console.log(`  ${k}: ${v} (${(v/combinations.length*100).toFixed(1)}%)`);
  });
  
  console.log(`\nCountries: ${Object.keys(countryCount).length} of 114 covered`);
  console.log(`  Min occurrences: ${Math.min(...Object.values(countryCount))}`);
  console.log(`  Max occurrences: ${Math.max(...Object.values(countryCount))}`);
  console.log(`  Top 10 countries:`);
  Object.entries(countryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([k, v], idx) => {
      console.log(`    ${idx + 1}. ${k}: ${v} tests`);
    });
  
  console.log(`\nCourses: ${Object.keys(courseCount).length} of 141 covered`);
  console.log(`  Min occurrences: ${Math.min(...Object.values(courseCount))}`);
  console.log(`  Max occurrences: ${Math.max(...Object.values(courseCount))}`);
  console.log(`  Avg per course: ${(combinations.length / Object.keys(courseCount).length).toFixed(1)}`);
  
  console.log('');
}

function saveToJSON(combinations) {
  const output = {
    generated: new Date().toISOString(),
    totalCombinations: combinations.length,
    coverageStrategy: 'Stratified sampling with seeded randomness for reproducibility',
    combinations: combinations
  };
  
  const filePath = path.join(__dirname, 'test-combinations-1000.json');
  fs.writeFileSync(filePath, JSON.stringify(output, null, 2), 'utf8');
  console.log(`✅ Saved JSON: ${filePath}`);
  return filePath;
}

function saveToCSV(combinations) {
  const headers = ['ID', 'Gender', 'Loan Amount', 'Loan Amount (Raw)', 'Loan Type', 'Country', 'University', 'Course'];
  const rows = [headers.join(',')];
  
  combinations.forEach(c => {
    const row = [
      c.id,
      c.gender,
      `"${c.loanAmountDisplay}"`,
      c.loanAmount,
      c.loanType,
      `"${c.country}"`,
      `"${c.university.replace(/"/g, '""')}"`, // Escape quotes
      `"${c.course.replace(/"/g, '""')}"`
    ];
    rows.push(row.join(','));
  });
  
  const filePath = path.join(__dirname, 'test-combinations-1000.csv');
  fs.writeFileSync(filePath, rows.join('\n'), 'utf8');
  console.log(`✅ Saved CSV: ${filePath}`);
  return filePath;
}

function saveToMarkdown(combinations) {
  const lines = [
    '# 1000 Well-Distributed Test Combinations',
    '',
    `**Generated:** ${new Date().toISOString()}`,
    `**Total Combinations:** ${combinations.length}`,
    `**Strategy:** Stratified sampling ensuring diverse coverage across all dimensions`,
    '',
    '---',
    '',
    '## Sample: First 50 Combinations',
    '',
    '| ID | Gender | Amount | Type | Country | University | Course |',
    '|----|--------|--------|------|---------|------------|--------|'
  ];
  
  // Add first 50
  combinations.slice(0, 50).forEach(c => {
    const univ = c.university.length > 30 ? c.university.substring(0, 27) + '...' : c.university;
    const course = c.course.length > 25 ? c.course.substring(0, 22) + '...' : c.course;
    const country = c.country.length > 18 ? c.country.substring(0, 15) + '...' : c.country;
    
    lines.push(`| ${c.id} | ${c.gender} | ${c.loanAmountDisplay} | ${c.loanType} | ${country} | ${univ} | ${course} |`);
  });
  
  lines.push('');
  lines.push('*(Showing first 50 of 1000 - see JSON/CSV for complete list)*');
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## Files Generated');
  lines.push('');
  lines.push('1. **test-combinations-1000.json** - Complete data in JSON format');
  lines.push('2. **test-combinations-1000.csv** - Complete data in CSV format (Excel-friendly)');
  lines.push('3. **test-combinations-1000.md** - This markdown summary');
  lines.push('4. **test-combinations-1000.txt** - Plain text format');
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## Coverage Summary');
  lines.push('');
  
  // Add coverage stats
  const genderCount = {};
  const loanTypeCount = {};
  const countrySet = new Set();
  const loanAmountSet = new Set();
  const courseSet = new Set();
  
  combinations.forEach(c => {
    genderCount[c.gender] = (genderCount[c.gender] || 0) + 1;
    loanTypeCount[c.loanType] = (loanTypeCount[c.loanType] || 0) + 1;
    countrySet.add(c.country);
    loanAmountSet.add(c.loanAmountDisplay);
    courseSet.add(c.course);
  });
  
  lines.push('| Dimension | Coverage |');
  lines.push('|-----------|----------|');
  lines.push(`| Gender | 2/2 (100%) |`);
  lines.push(`| Loan Amounts | ${loanAmountSet.size}/71 (${(loanAmountSet.size/71*100).toFixed(1)}%) |`);
  lines.push(`| Loan Type | 2/2 (100%) |`);
  lines.push(`| Countries | ${countrySet.size}/114 (${(countrySet.size/114*100).toFixed(1)}%) |`);
  lines.push(`| Courses | ${courseSet.size}/141 (${(courseSet.size/141*100).toFixed(1)}%) |`);
  lines.push('');
  lines.push('**Distribution:**');
  lines.push(`- Male: ${genderCount.Male || 0} tests (${(genderCount.Male/combinations.length*100).toFixed(1)}%)`);
  lines.push(`- Female: ${genderCount.Female || 0} tests (${(genderCount.Female/combinations.length*100).toFixed(1)}%)`);
  lines.push(`- Secured: ${loanTypeCount.Secured || 0} tests (${(loanTypeCount.Secured/combinations.length*100).toFixed(1)}%)`);
  lines.push(`- Unsecured: ${loanTypeCount.Unsecured || 0} tests (${(loanTypeCount.Unsecured/combinations.length*100).toFixed(1)}%)`);
  
  const filePath = path.join(__dirname, 'test-combinations-1000.md');
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  console.log(`✅ Saved Markdown: ${filePath}`);
  return filePath;
}

function saveToPlainText(combinations) {
  const lines = [
    '═══════════════════════════════════════════════════════════════════',
    '  1000 WELL-DISTRIBUTED TEST COMBINATIONS',
    '═══════════════════════════════════════════════════════════════════',
    '',
    `Generated: ${new Date().toISOString()}`,
    `Total: ${combinations.length} combinations`,
    '',
    '───────────────────────────────────────────────────────────────────',
    ''
  ];
  
  combinations.forEach((c, idx) => {
    lines.push(`Test #${c.id}:`);
    lines.push(`  Gender:      ${c.gender}`);
    lines.push(`  Loan Amount: ${c.loanAmountDisplay} (₹${c.loanAmount.toLocaleString('en-IN')})`);
    lines.push(`  Loan Type:   ${c.loanType}`);
    lines.push(`  Country:     ${c.country}`);
    lines.push(`  University:  ${c.university}`);
    lines.push(`  Course:      ${c.course}`);
    
    if (idx < combinations.length - 1) {
      lines.push('');
    }
  });
  
  lines.push('');
  lines.push('═══════════════════════════════════════════════════════════════════');
  lines.push('  END OF TEST COMBINATIONS');
  lines.push('═══════════════════════════════════════════════════════════════════');
  
  const filePath = path.join(__dirname, 'test-combinations-1000.txt');
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  console.log(`✅ Saved Plain Text: ${filePath}`);
  return filePath;
}

function saveToPlaywrightTest(combinations) {
  const lines = [
    '/**',
    ' * Playwright Test Suite: 1000 Well-Distributed UI Combinations',
    ' * Auto-generated test cases',
    ' */',
    '',
    "import { test, expect } from '@playwright/test';",
    '',
    'const TEST_COMBINATIONS = [',
  ];
  
  combinations.forEach((c, idx) => {
    lines.push('  {');
    lines.push(`    id: ${c.id},`);
    lines.push(`    gender: '${c.gender}',`);
    lines.push(`    loanAmount: ${c.loanAmount},`);
    lines.push(`    loanType: '${c.loanType}',`);
    lines.push(`    country: '${c.country.replace(/'/g, "\\'")}',`);
    lines.push(`    university: '${c.university.replace(/'/g, "\\'")}',`);
    lines.push(`    course: '${c.course.replace(/'/g, "\\'")}'`);
    lines.push(idx < combinations.length - 1 ? '  },' : '  }');
  });
  
  lines.push('];');
  lines.push('');
  lines.push("test.describe('UI Test: 1000 Combinations', () => {");
  lines.push('  TEST_COMBINATIONS.forEach((combo) => {');
  lines.push("    test(`Test #${combo.id}: ${combo.gender}, ₹${combo.loanAmount}, ${combo.loanType}`, async ({ page }) => {");
  lines.push("      await page.goto('http://localhost:3080/');");
  lines.push('      ');
  lines.push('      // Fill form');
  lines.push("      await page.check(`input[name='gender'][value='${combo.gender}']`);");
  lines.push("      await page.fill('#amount', String(combo.loanAmount));");
  lines.push("      await page.check(`input[name='secured'][value='${combo.loanType === 'Secured' ? 'true' : 'false'}']`);");
  lines.push("      await page.fill('#country', combo.country);");
  lines.push("      await page.fill('#university', combo.university);");
  lines.push("      await page.fill('#levelOfStudy', combo.course);");
  lines.push('      ');
  lines.push('      // Submit');
  lines.push("      await page.click('#run-btn');");
  lines.push('      ');
  lines.push('      // Wait for results');
  lines.push("      await page.waitForSelector('.results-head', { timeout: 10000 });");
  lines.push('      ');
  lines.push('      // Verify results loaded');
  lines.push("      const resultsCount = await page.locator('.count').textContent();");
  lines.push("      expect(resultsCount).toBeTruthy();");
  lines.push('    });');
  lines.push('  });');
  lines.push('});');
  
  const filePath = path.join(__dirname, 'test-combinations-1000.spec.js');
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  console.log(`✅ Saved Playwright Test: ${filePath}`);
  return filePath;
}

// Main execution
console.log('Starting combination generation...\n');

const combinations = generateWellDistributedCombinations(1000);
analyzeCoverage(combinations);

console.log('═══════════════════════════════════════════════════════════════════');
console.log('  SAVING TO FILES');
console.log('═══════════════════════════════════════════════════════════════════\n');

const savedFiles = [
  saveToJSON(combinations),
  saveToCSV(combinations),
  saveToMarkdown(combinations),
  saveToPlainText(combinations),
  saveToPlaywrightTest(combinations)
];

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log('  ✅ COMPLETE');
console.log('═══════════════════════════════════════════════════════════════════\n');
console.log('Generated 1000 well-distributed test combinations');
console.log('Saved to 5 different formats:\n');
savedFiles.forEach((file, idx) => {
  console.log(`  ${idx + 1}. ${path.basename(file)}`);
});
console.log('\nYou can now:');
console.log('  - Review: test-combinations-1000.md');
console.log('  - Import: test-combinations-1000.json or .csv');
console.log('  - Run tests: npx playwright test test-combinations-1000.spec.js');
console.log('');
