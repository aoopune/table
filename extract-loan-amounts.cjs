/**
 * Extract actual loan amounts from bank data
 */

const fs = require('fs');
const path = require('path');

// Read the loan offers file content
const offersFilePath = path.join(__dirname, 'data', 'loan-offers-abroad.js');
const content = fs.readFileSync(offersFilePath, 'utf8');

// Extract minLoan and maxLoan values using regex
const minLoanMatches = content.matchAll(/minLoan:\s*(\d+)/g);
const maxLoanMatches = content.matchAll(/maxLoan:\s*(\d+)/g);

const minLoans = new Set();
const maxLoans = new Set();

for (const match of minLoanMatches) {
  minLoans.add(parseInt(match[1]));
}

for (const match of maxLoanMatches) {
  const amount = parseInt(match[1]);
  // Exclude the placeholder for "unlimited" (99999999)
  if (amount < 99999999) {
    maxLoans.add(amount);
  }
}

// Get all unique amounts sorted
const allAmounts = new Set([...minLoans, ...maxLoans]);
const sortedAmounts = Array.from(allAmounts).sort((a, b) => a - b);

console.log('═══════════════════════════════════════════════════════════════════');
console.log('  ACTUAL LOAN AMOUNTS FROM BANK DATA');
console.log('═══════════════════════════════════════════════════════════════════\n');

console.log('minLoan values:', Array.from(minLoans).sort((a, b) => a - b));
console.log('  Minimum:', Math.min(...minLoans).toLocaleString());
console.log('  Maximum:', Math.max(...minLoans).toLocaleString());
console.log('');

console.log('maxLoan values (excluding 99999999):', Array.from(maxLoans).sort((a, b) => a - b));
console.log('  Minimum:', Math.min(...maxLoans).toLocaleString());
console.log('  Maximum:', Math.max(...maxLoans).toLocaleString());
console.log('');

console.log('All unique loan thresholds:', sortedAmounts.length);
sortedAmounts.forEach(amt => {
  const display = amt >= 10000000 ? `₹${(amt/10000000).toFixed(2)}Cr` : `₹${(amt/100000).toFixed(2)}L`;
  console.log(`  ${display.padEnd(12)} (${amt.toLocaleString()})`);
});

console.log('');
console.log('═══════════════════════════════════════════════════════════════════');
console.log('RECOMMENDATION FOR TESTING:');
console.log('───────────────────────────────────────────────────────────────────');
console.log('Use all unique threshold values from bank data:');
console.log(`  Total test values: ${sortedAmounts.length}`);
console.log(`  Range: ₹${Math.min(...sortedAmounts).toLocaleString()} to ₹${Math.max(...sortedAmounts).toLocaleString()}`);
console.log('');
console.log('This captures all the actual loan breakpoints where bank');
console.log('offers change, providing complete test coverage.');
console.log('═══════════════════════════════════════════════════════════════════\n');

module.exports = { sortedAmounts, minLoans, maxLoans };
