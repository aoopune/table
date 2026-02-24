/**
 * Execute 1000 test combinations and capture outputs
 * This creates files with both inputs and outputs for validation
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

// Load the 1000 test combinations
const combinationsPath = path.join(__dirname, 'test-combinations-1000.json');
const combinationsData = JSON.parse(fs.readFileSync(combinationsPath, 'utf8'));
const combinations = combinationsData.combinations;

const SERVER_URL = 'http://localhost:3080';
const API_ENDPOINT = '/api/query-all';

// Results storage
const results = [];
let successCount = 0;
let errorCount = 0;
let emptyResultCount = 0;

function makeQueryRequest(combination) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      gender: combination.gender,
      amount: combination.loanAmount,
      secured: combination.loanType === 'Secured',
      country: combination.country,
      university: combination.university,
      levelOfStudy: combination.course
    });

    const options = {
      hostname: 'localhost',
      port: 3080,
      path: API_ENDPOINT,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 10000 // 10 second timeout per request
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve({
            success: true,
            statusCode: res.statusCode,
            data: result
          });
        } catch (e) {
          resolve({
            success: false,
            statusCode: res.statusCode,
            error: 'Failed to parse response',
            rawData: data
          });
        }
      });
    });

    req.on('error', (e) => {
      resolve({
        success: false,
        error: e.message
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

async function executeCombinations() {
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('  EXECUTING 1000 TEST COMBINATIONS');
  console.log('═══════════════════════════════════════════════════════════════════\n');
  
  console.log(`Server: ${SERVER_URL}${API_ENDPOINT}`);
  console.log(`Total combinations: ${combinations.length}\n`);
  
  // Test server connectivity first
  console.log('Testing server connectivity...');
  const testResult = await makeQueryRequest(combinations[0]);
  if (!testResult.success) {
    console.error('\n❌ ERROR: Cannot connect to server!');
    console.error('Please ensure the server is running: npm start');
    console.error(`Error: ${testResult.error}\n`);
    process.exit(1);
  }
  console.log('✅ Server is responding\n');
  
  console.log('Starting execution...\n');
  const startTime = Date.now();
  
  for (let i = 0; i < combinations.length; i++) {
    const combo = combinations[i];
    
    // Progress indicator
    if ((i + 1) % 50 === 0 || i === 0) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const rate = ((i + 1) / elapsed).toFixed(1);
      const remaining = ((combinations.length - i - 1) / rate).toFixed(0);
      console.log(`  Progress: ${i + 1}/${combinations.length} (${((i+1)/combinations.length*100).toFixed(1)}%) | ${rate} req/sec | ETA: ${remaining}s`);
    }
    
    // Execute query
    const response = await makeQueryRequest(combo);
    
    // Build result object
    const result = {
      id: combo.id,
      input: {
        gender: combo.gender,
        loanAmount: combo.loanAmount,
        loanAmountDisplay: combo.loanAmountDisplay,
        loanType: combo.loanType,
        country: combo.country,
        university: combo.university,
        course: combo.course
      },
      output: null,
      metadata: {
        timestamp: new Date().toISOString(),
        success: response.success,
        statusCode: response.statusCode
      }
    };
    
    if (response.success) {
      successCount++;
      
      const data = response.data;
      result.output = {
        banksReturned: (data.rows || []).length,
        banks: (data.rows || []).map(row => row.bankName),
        secured: data.secured,
        totalRows: data.rows ? data.rows.length : 0,
        hasResults: data.rows && data.rows.length > 0
      };
      
      if (result.output.totalRows === 0) {
        emptyResultCount++;
        result.output.note = 'No banks qualify for this combination';
      }
      
      // Store full row data (first 3 banks only to keep file size manageable)
      if (data.rows && data.rows.length > 0) {
        result.output.sampleBanks = data.rows.slice(0, 3).map(row => ({
          bankName: row.bankName,
          margin: row.margin,
          processing: row.processing,
          // Add other important fields but keep it concise
        }));
      }
    } else {
      errorCount++;
      result.metadata.error = response.error;
      result.output = {
        error: response.error,
        rawData: response.rawData ? response.rawData.substring(0, 200) : null
      };
    }
    
    results.push(result);
    
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  
  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  const avgRate = (combinations.length / totalTime).toFixed(1);
  
  console.log(`\n✅ Execution complete!`);
  console.log(`   Total time: ${totalTime}s`);
  console.log(`   Average rate: ${avgRate} requests/second\n`);
}

function analyzeResults() {
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('  RESULTS ANALYSIS');
  console.log('═══════════════════════════════════════════════════════════════════\n');
  
  console.log(`Total tests: ${results.length}`);
  console.log(`Successful: ${successCount} (${(successCount/results.length*100).toFixed(1)}%)`);
  console.log(`Errors: ${errorCount} (${(errorCount/results.length*100).toFixed(1)}%)`);
  console.log(`Empty results (no banks): ${emptyResultCount} (${(emptyResultCount/successCount*100).toFixed(1)}%)`);
  
  // Count banks returned
  const bankCounts = {};
  let totalBanks = 0;
  let maxBanks = 0;
  let minBanks = Infinity;
  
  results.forEach(r => {
    if (r.output && r.output.banksReturned !== undefined) {
      const count = r.output.banksReturned;
      bankCounts[count] = (bankCounts[count] || 0) + 1;
      totalBanks += count;
      if (count > maxBanks) maxBanks = count;
      if (count < minBanks && count >= 0) minBanks = count;
    }
  });
  
  const avgBanks = (totalBanks / successCount).toFixed(1);
  
  console.log(`\nBanks returned per query:`);
  console.log(`  Average: ${avgBanks} banks`);
  console.log(`  Min: ${minBanks} banks`);
  console.log(`  Max: ${maxBanks} banks`);
  
  console.log(`\nDistribution of bank counts:`);
  Object.entries(bankCounts)
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
    .slice(0, 15) // Show first 15
    .forEach(([count, freq]) => {
      const bar = '█'.repeat(Math.floor(freq / (results.length / 50)));
      console.log(`  ${count.padStart(2)} banks: ${String(freq).padStart(4)} tests ${bar}`);
    });
  
  console.log('');
}

function saveResults() {
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('  SAVING RESULTS');
  console.log('═══════════════════════════════════════════════════════════════════\n');
  
  // 1. Save full results (inputs + outputs)
  const fullOutput = {
    generated: new Date().toISOString(),
    totalCombinations: results.length,
    summary: {
      successful: successCount,
      errors: errorCount,
      emptyResults: emptyResultCount
    },
    results: results
  };
  
  const fullPath = path.join(__dirname, 'test-combinations-1000-with-output.json');
  fs.writeFileSync(fullPath, JSON.stringify(fullOutput, null, 2), 'utf8');
  console.log(`✅ Saved full results: ${path.basename(fullPath)}`);
  
  // 2. Save summary (compact format)
  const summary = {
    generated: new Date().toISOString(),
    totalCombinations: results.length,
    summary: {
      successful: successCount,
      errors: errorCount,
      emptyResults: emptyResultCount
    },
    results: results.map(r => ({
      id: r.id,
      input: {
        gender: r.input.gender,
        amount: r.input.loanAmountDisplay,
        type: r.input.loanType,
        country: r.input.country
      },
      output: r.output ? {
        banksReturned: r.output.banksReturned,
        banks: r.output.banks ? r.output.banks.slice(0, 5) : [], // First 5 only
        hasResults: r.output.hasResults
      } : { error: true }
    }))
  };
  
  const summaryPath = path.join(__dirname, 'test-combinations-1000-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf8');
  console.log(`✅ Saved summary: ${path.basename(summaryPath)}`);
  
  // 3. Save CSV with results
  const csvLines = ['ID,Gender,Amount,Type,Country,University,Course,Banks Returned,Top Banks,Success'];
  
  results.forEach(r => {
    const topBanks = r.output && r.output.banks ? r.output.banks.slice(0, 3).join('; ') : 'N/A';
    const banksCount = r.output && r.output.banksReturned !== undefined ? r.output.banksReturned : 'ERROR';
    const success = r.metadata.success ? 'YES' : 'NO';
    
    csvLines.push([
      r.id,
      r.input.gender,
      `"${r.input.loanAmountDisplay}"`,
      r.input.loanType,
      `"${r.input.country}"`,
      `"${r.input.university.replace(/"/g, '""')}"`,
      `"${r.input.course.replace(/"/g, '""')}"`,
      banksCount,
      `"${topBanks}"`,
      success
    ].join(','));
  });
  
  const csvPath = path.join(__dirname, 'test-combinations-1000-with-output.csv');
  fs.writeFileSync(csvPath, csvLines.join('\n'), 'utf8');
  console.log(`✅ Saved CSV with output: ${path.basename(csvPath)}`);
  
  // 4. Save markdown report
  const mdLines = [
    '# Test Combinations: 1000 Cases with Outputs',
    '',
    `**Generated:** ${new Date().toISOString()}`,
    `**Total:** ${results.length} test cases`,
    '',
    '## Summary',
    '',
    `- ✅ Successful: ${successCount} (${(successCount/results.length*100).toFixed(1)}%)`,
    `- ❌ Errors: ${errorCount} (${(errorCount/results.length*100).toFixed(1)}%)`,
    `- ⚠️ Empty results: ${emptyResultCount} (${(emptyResultCount/successCount*100).toFixed(1)}%)`,
    '',
    '## Sample Results (First 20)',
    '',
    '| ID | Inputs | Banks | Top Banks |',
    '|----|--------|-------|-----------|'
  ];
  
  results.slice(0, 20).forEach(r => {
    const inputs = `${r.input.gender}, ${r.input.loanAmountDisplay}, ${r.input.loanType}`;
    const banksCount = r.output && r.output.banksReturned !== undefined ? r.output.banksReturned : 'ERROR';
    const topBanks = r.output && r.output.banks ? r.output.banks.slice(0, 2).join(', ') : 'N/A';
    
    mdLines.push(`| ${r.id} | ${inputs} | ${banksCount} | ${topBanks} |`);
  });
  
  mdLines.push('');
  mdLines.push('*(See JSON/CSV files for complete results)*');
  
  const mdPath = path.join(__dirname, 'test-combinations-1000-with-output.md');
  fs.writeFileSync(mdPath, mdLines.join('\n'), 'utf8');
  console.log(`✅ Saved markdown report: ${path.basename(mdPath)}`);
  
  console.log('\n✅ All files saved successfully!\n');
}

// Main execution
(async () => {
  try {
    await executeCombinations();
    analyzeResults();
    saveResults();
    
    console.log('═══════════════════════════════════════════════════════════════════');
    console.log('  ✅ COMPLETE');
    console.log('═══════════════════════════════════════════════════════════════════\n');
    console.log('Files generated:');
    console.log('  1. test-combinations-1000-with-output.json (full data)');
    console.log('  2. test-combinations-1000-summary.json (compact)');
    console.log('  3. test-combinations-1000-with-output.csv (spreadsheet)');
    console.log('  4. test-combinations-1000-with-output.md (report)');
    console.log('');
    
  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
})();
