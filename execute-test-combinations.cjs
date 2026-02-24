/**
 * Execute Test Combinations and Capture Outputs
 * Modified to accept input file parameter
 */

const http = require('http');
const fs = require('fs');

// Get input file from command line or use default
const inputFileName = process.argv[2] || 'test-combinations-1000-guaranteed.json';

console.log(`\n Loading combinations from: ${inputFileName}\n`);

// Load test combinations
const inputData = JSON.parse(fs.readFileSync(inputFileName, 'utf8'));
const combinations = inputData.combinations;

console.log(` Loaded ${combinations.length} combinations\n`);
console.log(' Starting execution...\n');

// Configuration
const hostname = 'localhost';
const port = 3080;
const path = '/api/query-all';

let successCount = 0;
let errorCount = 0;
let emptyResultCount = 0;
const results = [];
const startTime = Date.now();

/**
 * Make API request for a single combination
 */
function makeQueryRequest(combination) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      gender: combination.gender,
      loanAmount: combination.loanAmount,
      loanType: combination.loanType,
      country: combination.country,
      university: combination.university,
      course: combination.course
    });
    
    const options = {
      hostname: hostname,
      port: port,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 10000
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve({
            success: true,
            statusCode: res.statusCode,
            data: response
          });
        } catch (err) {
          resolve({
            success: false,
            error: `Failed to parse response: ${err.message}`,
            statusCode: res.statusCode
          });
        }
      });
    });
    
    req.on('error', (err) => {
      resolve({
        success: false,
        error: err.message
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({
        success: false,
        error: 'Request timeout'
      });
    });
    
    req.write(postData);
    req.end();
  });
}

/**
 * Execute all combinations
 */
async function executeCombinations() {
  for (let i = 0; i < combinations.length; i++) {
    const combination = combinations[i];
    
    // Progress indicator
    if ((i + 1) % 50 === 0 || i === 0) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const rate = ((i + 1) / (elapsed || 1)).toFixed(1);
      console.log(`   Progress: ${i + 1}/${combinations.length} (${((i + 1) / combinations.length * 100).toFixed(1)}%) | ${elapsed}s | ${rate} req/s`);
    }
    
    // Make request
    const response = await makeQueryRequest(combination);
    
    // Process response
    const result = {
      id: combination.id,
      input: combination,
      output: {},
      metadata: {
        timestamp: new Date().toISOString(),
        success: response.success,
        statusCode: response.statusCode || null
      }
    };
    
    if (response.success && response.data) {
      const banks = response.data.banks || [];
      const banksReturned = banks.length;
      
      result.output = {
        banksReturned: banksReturned,
        banks: banks.map(b => b.bankName),
        secured: combination.loanType === 'Secured',
        totalRows: banksReturned,
        hasResults: banksReturned > 0,
        sampleBanks: banks.slice(0, 3)
      };
      
      successCount++;
      if (banksReturned === 0) {
        emptyResultCount++;
        result.output.note = 'No banks qualify for this combination';
      }
    } else {
      result.output = {
        error: response.error || 'Unknown error',
        banksReturned: 0,
        hasResults: false
      };
      errorCount++;
    }
    
    results.push(result);
    
    // Small delay to avoid overwhelming server
    await new Promise(resolve => setTimeout(resolve, 50));
  }
}

/**
 * Analyze and display results
 */
function analyzeResults() {
  console.log('\n\n');
  console.log(' EXECUTION COMPLETE');
  console.log('\n');
  
  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  const avgRate = (combinations.length / totalTime).toFixed(1);
  
  console.log(`  Total time: ${totalTime}s`);
  console.log(` Average rate: ${avgRate} requests/second\n`);
  
  console.log(` Results Summary:`);
  console.log(`   Total tests: ${combinations.length}`);
  console.log(`   Successful: ${successCount} (${((successCount / combinations.length) * 100).toFixed(1)}%)`);
  console.log(`   Errors: ${errorCount} (${((errorCount / combinations.length) * 100).toFixed(1)}%)`);
  console.log(`   Empty results (no banks): ${emptyResultCount} (${((emptyResultCount / combinations.length) * 100).toFixed(1)}%)`);
  console.log(`   Tests with results: ${successCount - emptyResultCount} (${(((successCount - emptyResultCount) / combinations.length) * 100).toFixed(1)}%)\n`);
  
  // Bank count distribution
  const bankCounts = {};
  results.forEach(r => {
    const count = r.output.banksReturned || 0;
    bankCounts[count] = (bankCounts[count] || 0) + 1;
  });
  
  console.log(` Banks returned distribution:`);
  Object.keys(bankCounts).sort((a, b) => parseInt(a) - parseInt(b)).forEach(count => {
    console.log(`   ${count} banks: ${bankCounts[count]} tests`);
  });
  
  const banksReturnedArray = results.map(r => r.output.banksReturned || 0);
  const minBanks = Math.min(...banksReturnedArray);
  const maxBanks = Math.max(...banksReturnedArray);
  const avgBanks = (banksReturnedArray.reduce((a, b) => a + b, 0) / banksReturnedArray.length).toFixed(1);
  
  console.log(`\n   Min banks: ${minBanks}`);
  console.log(`   Max banks: ${maxBanks}`);
  console.log(`   Avg banks: ${avgBanks}\n`);
}

/**
 * Save results to files
 */
function saveResults() {
  const timestamp = new Date().toISOString();
  
  // Determine output file names based on input file
  const baseFileName = inputFileName.replace('.json', '');
  
  // 1. Full JSON output
  const fullOutput = {
    generated: timestamp,
    sourceFile: inputFileName,
    totalCombinations: combinations.length,
    summary: {
      successful: successCount,
      errors: errorCount,
      emptyResults: emptyResultCount,
      withResults: successCount - emptyResultCount
    },
    results: results
  };
  
  const jsonFile = `${baseFileName}-with-output.json`;
  fs.writeFileSync(jsonFile, JSON.stringify(fullOutput, null, 2));
  console.log(` Saved: ${jsonFile}`);
  
  // 2. Summary JSON
  const summaryOutput = {
    generated: timestamp,
    sourceFile: inputFileName,
    totalCombinations: combinations.length,
    successful: successCount,
    errors: errorCount,
    successRate: `${((successCount / combinations.length) * 100).toFixed(2)}%`,
    emptyResults: emptyResultCount,
    withResults: successCount - emptyResultCount,
    resultsWithBanks: results.filter(r => (r.output.banksReturned || 0) > 0).map(r => ({
      id: r.id,
      combination: `${r.input.gender}, ${r.input.loanAmountDisplay}, ${r.input.loanType}, ${r.input.country}`,
      banksReturned: r.output.banksReturned,
      topBanks: (r.output.banks || []).slice(0, 5)
    }))
  };
  
  const summaryFile = `${baseFileName}-summary.json`;
  fs.writeFileSync(summaryFile, JSON.stringify(summaryOutput, null, 2));
  console.log(` Saved: ${summaryFile}`);
  
  // 3. CSV output
  const csvHeader = 'ID,Gender,Loan Amount,Loan Type,Country,University,Course,Banks Returned,Success,Top Banks\n';
  const csvRows = results.map(r => {
    const topBanks = (r.output.banks || []).slice(0, 3).join('; ');
    return `${r.id},"${r.input.gender}","${r.input.loanAmountDisplay}","${r.input.loanType}","${r.input.country}","${r.input.university.replace(/"/g, '""')}","${r.input.course.replace(/"/g, '""')}",${r.output.banksReturned || 0},${r.metadata.success},"${topBanks}"`;
  }).join('\n');
  
  const csvFile = `${baseFileName}-with-output.csv`;
  fs.writeFileSync(csvFile, csvHeader + csvRows);
  console.log(` Saved: ${csvFile}`);
  
  // 4. Markdown report
  const mdContent = `# Test Execution Results

**Source:** ${inputFileName}  
**Generated:** ${timestamp}  
**Total Tests:** ${combinations.length}

## Summary

| Metric | Count | Percentage |
|--------|-------|------------|
| Total Tests | ${combinations.length} | 100% |
| Successful | ${successCount} | ${((successCount / combinations.length) * 100).toFixed(1)}% |
| Errors | ${errorCount} | ${((errorCount / combinations.length) * 100).toFixed(1)}% |
| With Banks | ${successCount - emptyResultCount} | ${(((successCount - emptyResultCount) / combinations.length) * 100).toFixed(1)}% |
| Empty Results | ${emptyResultCount} | ${((emptyResultCount / combinations.length) * 100).toFixed(1)}% |

## Sample Results (First 20 with banks)

${results.filter(r => (r.output.banksReturned || 0) > 0).slice(0, 20).map((r, idx) => `### ${idx + 1}. Test #${r.id}
- **Input:** ${r.input.gender}, ${r.input.loanAmountDisplay}, ${r.input.loanType}
- **Country:** ${r.input.country}
- **University:** ${r.input.university}
- **Course:** ${r.input.course.substring(0, 80)}${r.input.course.length > 80 ? '...' : ''}
- **Banks Returned:** ${r.output.banksReturned}
- **Top Banks:** ${(r.output.banks || []).slice(0, 5).join(', ')}
`).join('\n') || '*No results with banks*'}

---
**Files Generated:**
- ${jsonFile} - Full results with inputs and outputs
- ${summaryFile} - Compact summary
- ${csvFile} - Spreadsheet format
- This file - Human-readable report
`;

  const mdFile = `${baseFileName}-with-output.md`;
  fs.writeFileSync(mdFile, mdContent);
  console.log(` Saved: ${mdFile}`);
  
  console.log('\n All output files saved!\n');
}

// Main execution
(async () => {
  try {
    // Check server connectivity
    console.log(' Checking server connectivity...');
    const testResponse = await makeQueryRequest(combinations[0]);
    
    if (!testResponse.success) {
      console.error('\n ERROR: Cannot connect to server!');
      console.error(`   Error: ${testResponse.error}`);
      console.error(`\n Make sure the server is running:`);
      console.error(`   npm start\n`);
      process.exit(1);
    }
    
    console.log(' Server is responsive\n');
    console.log('');
    
    // Execute all combinations
    await executeCombinations();
    
    // Analyze results
    analyzeResults();
    
    // Save results
    saveResults();
    
    console.log(' Execution complete!\n');
    
  } catch (error) {
    console.error('\n Fatal error:', error);
    process.exit(1);
  }
})();
