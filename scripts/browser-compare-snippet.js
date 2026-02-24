/**
 * Paste this into the browser console while the Loan Comparison Table is open
 * (same origin, after opening via a local server so the CSV has loaded).
 * It fetches the CSV, parses it the same way as the loader, and compares
 * window.TABLE_DATA to the expected rows. Logs a short report.
 */
(function () {
  var CSV_TO_COL = { 0: 'lender', 2: 'sector', 12: 'nationality', 13: 'age', 14: 'qualification', 15: 'coApplicant', 16: 'universityStrictness', 3: 'interestRate', 4: 'typeOfInterestRate', 5: 'margin', 6: 'processingFees', 7: 'refundableProcessingFees', 8: 'repaymentTenure', 9: 'moratoriumPeriod', 10: 'paymentDuringMoratorium', 11: 'delayedEmiPayment', 17: 'avgTimeToSanction', 18: 'dedicatedCaseManager', 19: 'onboardingProcess' };
  function parseCSV(text) {
    var rows = [], row = [], cell = '', i = 0, inQuotes = false, len = text.length;
    while (i < len) {
      var ch = text[i];
      if (inQuotes) {
        if (ch === '"') { if (i + 1 < len && text[i + 1] === '"') { cell += '"'; i += 2; continue; } inQuotes = false; i++; continue; }
        if (ch === '\r' || ch === '\n') { cell += '\n'; i++; continue; }
        cell += ch; i++; continue;
      }
      if (ch === '"') { inQuotes = true; i++; continue; }
      if (ch === ',') { row.push(cell.trim()); cell = ''; i++; continue; }
      if (ch === '\n' || ch === '\r') {
        row.push(cell.trim());
        if (row.length > 0 && row.some(function (c) { return c.length > 0; })) rows.push(row);
        row = []; cell = ''; if (ch === '\r' && i + 1 < len && text[i + 1] === '\n') i++; i++; continue;
      }
      cell += ch; i++;
    }
    if (cell.length > 0 || row.length > 0) { row.push(cell.trim()); rows.push(row); }
    return rows;
  }
  function buildExpected(dataRows) {
    return dataRows.map(function (row) {
      var obj = { select: false };
      Object.keys(CSV_TO_COL).forEach(function (csvIdx) {
        var colId = CSV_TO_COL[csvIdx];
        var val = row[csvIdx];
        if (val != null && String(val).trim() !== '') obj[colId] = String(val).trim().replace(/\r\n/g, '\n').replace(/\n/g, ' ');
      });
      return obj;
    });
  }
  fetch('data/loan-data-abroad.csv').then(function (r) { return r.text(); }).then(function (text) {
    var rows = parseCSV(text);
    if (rows.length < 4) { console.warn('CSV too short'); return; }
    var expected = buildExpected(rows.slice(4));
    var actual = window.TABLE_DATA || [];
    var countOk = actual.length === expected.length;
    console.log('--- Table vs CSV report ---');
    console.log('Row count match: ' + (countOk ? 'Yes' : 'No') + ' (CSV data rows=' + expected.length + ', table rows=' + actual.length + ')');
    var firstOk = actual.length > 0 && expected.length > 0 && actual[0].lender === expected[0].lender;
    var mid = Math.floor(expected.length / 2);
    var midOk = actual.length > mid && expected.length > mid && actual[mid].lender === expected[mid].lender;
    var lastIdx = expected.length - 1;
    var lastOk = actual.length > lastIdx && actual[lastIdx].lender === expected[lastIdx].lender;
    console.log('Sample rows (first/middle/last lender match): ' + (firstOk && midOk && lastOk ? 'Yes' : 'No'));
    if (!firstOk && actual.length > 0) console.log('  First row mismatch: expected lender=' + expected[0].lender + ', actual=' + (actual[0] && actual[0].lender));
    if (!midOk && actual.length > mid) console.log('  Middle row mismatch: expected lender=' + expected[mid].lender + ', actual=' + (actual[mid] && actual[mid].lender));
    if (!lastOk && actual.length > lastIdx) console.log('  Last row mismatch: expected lender=' + expected[lastIdx].lender + ', actual=' + (actual[lastIdx] && actual[lastIdx].lender));
    var mismatches = [];
    for (var i = 0; i < Math.min(actual.length, expected.length); i++) {
      Object.keys(CSV_TO_COL).forEach(function (k) {
        var colId = CSV_TO_COL[k];
        var e = expected[i][colId]; var a = actual[i][colId];
        if (e === undefined) e = ''; if (a === undefined) a = '';
        if (String(e).trim() !== String(a).trim()) mismatches.push({ row: i, col: colId, expected: e, actual: a });
      });
    }
    if (mismatches.length > 0) console.log('Field mismatches (first 10):', mismatches.slice(0, 10));
    else if (actual.length === expected.length) console.log('All compared fields match.');
    console.log('--- End report ---');
  }).catch(function (err) { console.error('Could not fetch CSV:', err); });
})();
