/**
 * Generates data/loan-data-inline.js from the CSV so the table works without a server.
 * Run from project root: node scripts/generate-inline-data.js
 */
var fs = require('fs');
var path = require('path');

var CSV_PATH = path.join(__dirname, '..', 'data', 'loan-data-abroad.csv');
var OUT_PATH = path.join(__dirname, '..', 'data', 'loan-data-inline.js');

var CSV_TO_COL = {
  0: 'lender', 2: 'sector', 12: 'nationality', 13: 'age', 14: 'qualification',
  15: 'coApplicant', 16: 'universityStrictness', 3: 'interestRate', 4: 'typeOfInterestRate',
  5: 'margin', 6: 'processingFees', 7: 'refundableProcessingFees', 8: 'repaymentTenure',
  9: 'moratoriumPeriod', 10: 'paymentDuringMoratorium', 11: 'delayedEmiPayment',
  17: 'avgTimeToSanction', 18: 'dedicatedCaseManager', 19: 'onboardingProcess'
};

function parseCSV(text) {
  var rows = [], row = [], cell = '', i = 0, inQuotes = false, len = text.length;
  while (i < len) {
    var ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < len && text[i + 1] === '"') { cell += '"'; i += 2; continue; }
        inQuotes = false; i++; continue;
      }
      if (ch === '\r' || ch === '\n') { cell += '\n'; i++; continue; }
      cell += ch; i++; continue;
    }
    if (ch === '"') { inQuotes = true; i++; continue; }
    if (ch === ',') { row.push(cell.trim()); cell = ''; i++; continue; }
    if (ch === '\n' || ch === '\r') {
      row.push(cell.trim());
      if (row.length > 0 && row.some(function (c) { return c.length > 0; })) rows.push(row);
      row = []; cell = '';
      if (ch === '\r' && i + 1 < len && text[i + 1] === '\n') i++;
      i++; continue;
    }
    cell += ch; i++;
  }
  if (cell.length > 0 || row.length > 0) { row.push(cell.trim()); rows.push(row); }
  return rows;
}

function buildTableDataFromRows(dataRows) {
  return dataRows.map(function (row) {
    var obj = { select: false };
    Object.keys(CSV_TO_COL).forEach(function (csvIdx) {
      var colId = CSV_TO_COL[csvIdx];
      var val = row[csvIdx];
      if (val != null && String(val).trim() !== '')
        obj[colId] = String(val).trim().replace(/\r\n/g, '\n').replace(/\n/g, ' ');
    });
    return obj;
  });
}

var text = fs.readFileSync(CSV_PATH, 'utf8');
var rows = parseCSV(text);
if (rows.length < 4) {
  console.error('CSV has fewer than 4 rows');
  process.exit(1);
}
var data = buildTableDataFromRows(rows.slice(4));
var js = '/** Inline table data – table works when opening index.html directly (no server). Generated from loan-data-abroad.csv */\n' +
  'window.TABLE_DATA = ' + JSON.stringify(data, null, 0) + ';\n';
fs.writeFileSync(OUT_PATH, js, 'utf8');
console.log('Wrote', data.length, 'rows to data/loan-data-inline.js');
