const fs = require('fs');

// Read the existing output file
const data = JSON.parse(fs.readFileSync('test-combinations-1000-with-output.json', 'utf8'));

// Filter to only combinations that returned banks
const successfulCombinations = data.results.filter(r => r.output.banksReturned > 0);

console.log(`Found ${successfulCombinations.length} combinations with bank results out of ${data.results.length} total`);
console.log();

// Create simplified output
const output = {
  generated: new Date().toISOString(),
  description: "Combinations with their outputs - showing only successful matches (banks returned)",
  totalCombinations: data.results.length,
  successfulCombinations: successfulCombinations.length,
  successRate: ((successfulCombinations.length / data.results.length) * 100).toFixed(2) + '%',
  results: successfulCombinations.map(r => ({
    id: r.id,
    combination: {
      gender: r.input.gender,
      loanAmount: r.input.loanAmountDisplay,
      loanType: r.input.loanType,
      country: r.input.country,
      university: r.input.university,
      course: r.input.course
    },
    output: {
      banksReturned: r.output.banksReturned,
      banks: r.output.banks,
      hasResults: r.output.hasResults
    }
  }))
};

// Save as JSON
fs.writeFileSync('successful-combinations-with-output.json', JSON.stringify(output, null, 2));
console.log(' Saved: successful-combinations-with-output.json');

// Save as CSV
const csvHeader = 'ID,Gender,Loan Amount,Loan Type,Country,University,Course,Banks Returned,Banks List\n';
const csvRows = successfulCombinations.map(r => {
  const banksStr = r.output.banks.join('; ');
  return `${r.id},"${r.input.gender}","${r.input.loanAmountDisplay}","${r.input.loanType}","${r.input.country}","${r.input.university.replace(/"/g, '""')}","${r.input.course.replace(/"/g, '""')}",${r.output.banksReturned},"${banksStr}"`;
}).join('\n');

fs.writeFileSync('successful-combinations-with-output.csv', csvHeader + csvRows);
console.log(' Saved: successful-combinations-with-output.csv');

// Display summary
console.log();
console.log(' Summary:');
console.log(`   Total tests: ${data.results.length}`);
console.log(`   Successful: ${successfulCombinations.length} (${((successfulCombinations.length / data.results.length) * 100).toFixed(2)}%)`);
console.log(`   Empty results: ${data.results.length - successfulCombinations.length} (${(((data.results.length - successfulCombinations.length) / data.results.length) * 100).toFixed(2)}%)`);
console.log();

// Show each successful combination
console.log(' Successful Combinations:');
console.log();
successfulCombinations.forEach((r, idx) => {
  console.log(`${idx + 1}. Test #${r.id}`);
  console.log(`   ${r.input.gender}, ${r.input.loanAmountDisplay}, ${r.input.loanType}`);
  console.log(`   ${r.input.country} - ${r.input.university}`);
  console.log(`   Course: ${r.input.course.substring(0, 60)}${r.input.course.length > 60 ? '...' : ''}`);
  console.log(`    ${r.output.banksReturned} banks: ${r.output.banks.slice(0, 3).join(', ')}${r.output.banks.length > 3 ? ` +${r.output.banks.length - 3} more` : ''}`);
  console.log();
});

console.log(' Done! Check the files for complete details.');
