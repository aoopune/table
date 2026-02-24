const http = require('http');

// Test #21 that returned 11 banks
const testData = {
  gender: 'Male',
  loanAmount: 50000,
  loanType: 'Secured',
  country: 'Australia',
  university: 'Central Queensland University CQUniversity',
  course: 'Any course'
};

console.log('Testing EXACT combination that returned 11 banks before...\n');
console.log('Input:', JSON.stringify(testData, null, 2), '\n');

const postData = JSON.stringify(testData);

const options = {
  hostname: 'localhost',
  port: 3080,
  path: '/api/query-all',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('Response:');
      console.log(`Banks returned: ${response.banks ? response.banks.length : 0}`);
      
      if (response.banks && response.banks.length > 0) {
        console.log('\nBanks list:');
        response.banks.forEach((b, i) => {
          console.log(`  ${i + 1}. ${b.bankName}`);
        });
      } else {
        console.log('\n NO BANKS RETURNED');
        console.log('Full response:', JSON.stringify(response, null, 2));
      }
    } catch (err) {
      console.error('Parse error:', err);
      console.log('Raw data:', data);
    }
  });
});

req.on('error', (err) => {
  console.error('Request error:', err);
});

req.write(postData);
req.end();
