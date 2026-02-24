/**
 * Test helper: parse CSV the same way as loan-data-loader.js and output
 * expected row count + first/middle/last row for comparison with the table.
 * Run from project root: node scripts/test-table-vs-csv.js
 */
var fs = require('fs');
var path = require('path');

var CSV_PATH = path.join(__dirname, '..', 'data', 'loan-data-abroad.csv');

var CSV_TO_COL = {
  0: 'lender',
  2: 'sector',
  12: 'nationality',
  13: 'age',
  14: 'qualification',
  15: 'coApplicant',
  16: 'universityStrictness',
  3: 'interestRate',
  4: 'typeOfInterestRate',
  5: 'margin',
  6: 'processingFees',
  7: 'refundableProcessingFees',
  8: 'repaymentTenure',
  9: 'moratoriumPeriod',
  10: 'paymentDuringMoratorium',
  11: 'delayedEmiPayment',
  17: 'avgTimeToSanction',
  18: 'dedicatedCaseManager',
  19: 'onboardingProcess'
};

function parseCSV(text) {
  var rows = [];
  var row = [];
  var cell = '';
  var i = 0;
  var inQuotes = false;
  var len = text.length;
  while (i < len) {
    var ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < len && text[i + 1] === '"') {
          cell += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      if (ch === '\r' || ch === '\n') {
        cell += '\n';
        i++;
        continue;
      }
      cell += ch;
      i++;
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (ch === ',') {
      row.push(cell.trim());
      cell = '';
      i++;
      continue;
    }
    if (ch === '\n' || ch === '\r') {
      row.push(cell.trim());
      if (row.length > 0 && row.some(function (c) { return c.length > 0; })) {
        rows.push(row);
      }
      row = [];
      cell = '';
      if (ch === '\r' && i + 1 < len && text[i + 1] === '\n') i++;
      i++;
      continue;
    }
    cell += ch;
    i++;
  }
  if (cell.length > 0 || row.length > 0) {
    row.push(cell.trim());
    rows.push(row);
  }
  return rows;
}

function buildTableDataFromRows(dataRows) {
  return dataRows.map(function (row) {
    var obj = { select: false };
    Object.keys(CSV_TO_COL).forEach(function (csvIdx) {
      var colId = CSV_TO_COL[csvIdx];
      var val = row[csvIdx];
      if (val != null && String(val).trim() !== '') {
        obj[colId] = String(val).trim().replace(/\r\n/g, '\n').replace(/\n/g, ' ');
      }
    });
    return obj;
  });
}

var text = fs.readFileSync(CSV_PATH, 'utf8');
var rows = parseCSV(text);
if (rows.length < 4) {
  console.error('CSV has fewer than 4 rows (need header + info + data)');
  process.exit(1);
}
var dataRows = rows.slice(4);
var expectedTableData = buildTableDataFromRows(dataRows);
var count = expectedTableData.length;
var mid = Math.floor(count / 2);

var report = {
  csvDataRowCount: count,
  sampleRows: {
    first: { index: 0, lender: expectedTableData[0].lender, row: expectedTableData[0] },
    middle: { index: mid, lender: expectedTableData[mid].lender, row: expectedTableData[mid] },
    last: { index: count - 1, lender: expectedTableData[count - 1].lender, row: expectedTableData[count - 1] }
  }
};

console.log(JSON.stringify(report, null, 2));
