/**
 * Extract actual loan amounts from ALL 38 bank JSON files
 */

const fs = require('fs');
const path = require('path');

const banksDir = path.join(__dirname, 'data', 'banks');

// Get all bank JSON files (exclude schema, manifest, example files)
const bankFiles = fs.readdirSync(banksDir)
  .filter(f => f.endsWith('.json'))
  .filter(f => !f.includes('schema') && !f.includes('manifest') && !f.includes('example'));

console.log(`Found ${bankFiles.length} bank JSON files\n`);

const allMinAmounts = new Set();
const allMaxAmounts = new Set();
const bankLoanRanges = [];

// Process each bank file
bankFiles.forEach(filename => {
  const bankPath = path.join(banksDir, filename);
  const bankName = filename.replace('.json', '');
  
  try {
    const data = JSON.parse(fs.readFileSync(bankPath, 'utf8'));
    
    if (data.offers && Array.isArray(data.offers)) {
      data.offers.forEach(offer => {
        if (offer.loan && offer.loan.amount) {
          const min = offer.loan.amount.min;
          const max = offer.loan.amount.max;
          
          if (min !== null && min !== undefined) {
            allMinAmounts.add(min);
          }
          if (max !== null && max !== undefined && max < 99999999) {
            allMaxAmounts.add(max);
          }
          
          bankLoanRanges.push({
            bank: bankName,
            min: min,
            max: max === 99999999 ? 'Unlimited' : max
          });
        }
      });
    }
  } catch (error) {
    console.error(`Error reading ${filename}:`, error.message);
  }
});

// Get all unique amounts sorted
const allAmounts = new Set([...allMinAmounts, ...allMaxAmounts]);
const sortedAmounts = Array.from(allAmounts).sort((a, b) => a - b);

console.log('═══════════════════════════════════════════════════════════════════');
console.log('  ACTUAL LOAN AMOUNTS FROM ALL 38 BANKS');
console.log('═══════════════════════════════════════════════════════════════════\n');

console.log(`Total banks processed: ${bankFiles.length}`);
console.log(`Total unique min values: ${allMinAmounts.size}`);
console.log(`Total unique max values: ${allMaxAmounts.size}`);
console.log(`Total unique thresholds: ${sortedAmounts.length}\n`);

console.log('All unique loan thresholds (sorted):');
console.log('───────────────────────────────────────────────────────────────────');
sortedAmounts.forEach((amt, idx) => {
  const display = amt >= 10000000 
    ? `₹${(amt/10000000).toFixed(2)}Cr`.padEnd(12)
    : `₹${(amt/100000).toFixed(2)}L`.padEnd(12);
  const formatted = `₹${amt.toLocaleString('en-IN')}`.padEnd(18);
  console.log(`${(idx + 1).toString().padStart(2)}. ${display} ${formatted}`);
});

console.log('\n───────────────────────────────────────────────────────────────────');
console.log('Range Summary:');
console.log(`  Minimum: ₹${Math.min(...sortedAmounts).toLocaleString('en-IN')}`);
console.log(`  Maximum: ₹${Math.max(...sortedAmounts).toLocaleString('en-IN')}`);
console.log('───────────────────────────────────────────────────────────────────\n');

// Show sample of banks and their ranges
console.log('Sample of bank loan ranges:');
console.log('───────────────────────────────────────────────────────────────────');
const uniqueBankRanges = [];
const seenBanks = new Set();
bankLoanRanges.forEach(range => {
  if (!seenBanks.has(range.bank)) {
    seenBanks.add(range.bank);
    uniqueBankRanges.push(range);
  }
});

uniqueBankRanges.slice(0, 10).forEach(range => {
  const min = typeof range.min === 'number' ? `₹${(range.min/100000).toFixed(1)}L` : 'N/A';
  const max = range.max === 'Unlimited' ? 'Unlimited' : `₹${(range.max/10000000).toFixed(2)}Cr`;
  console.log(`  ${range.bank.padEnd(35)} ${min.padStart(10)} to ${max}`);
});

if (uniqueBankRanges.length > 10) {
  console.log(`  ... and ${uniqueBankRanges.length - 10} more banks`);
}

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log('RECOMMENDATION FOR TESTING:');
console.log('───────────────────────────────────────────────────────────────────');
console.log(`Use all ${sortedAmounts.length} unique threshold values from all banks`);
console.log('');
console.log('These represent every point where ANY bank\'s offer changes,');
console.log('providing complete test coverage across all 38 banks.');
console.log('═══════════════════════════════════════════════════════════════════\n');

// Save detailed results
const outputData = {
  totalBanks: bankFiles.length,
  uniqueThresholds: sortedAmounts.length,
  thresholds: sortedAmounts,
  minAmount: Math.min(...sortedAmounts),
  maxAmount: Math.max(...sortedAmounts),
  bankRanges: uniqueBankRanges
};

fs.writeFileSync('loan-amounts-all-banks.json', JSON.stringify(outputData, null, 2));
console.log('📄 Detailed data saved to: loan-amounts-all-banks.json\n');

module.exports = { sortedAmounts, allMinAmounts, allMaxAmounts, bankFiles };
