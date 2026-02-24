var fs = require('fs');
var path = require('path');
var csvPath = path.join(__dirname, '..', 'data', 'loan-data-abroad.csv');
var text = fs.readFileSync(csvPath, 'utf8');

// Same parse logic as loan-data-loader.js
function parseCSV(str) {
  var rows = [];
  var row = [];
  var cell = '';
  var i = 0;
  var inQuotes = false;
  var len = str.length;
  while (i < len) {
    var ch = str[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < len && str[i + 1] === '"') {
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
      if (ch === '\r' && i + 1 < len && str[i + 1] === '\n') i++;
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

var rows = parseCSV(text);
var dataRows = rows.slice(4);
var withLender = dataRows.filter(function (r) {
  var lender = r[0];
  return lender != null && String(lender).trim() !== '';
});

console.log('Total parsed rows:', rows.length);
console.log('Header rows (0-3), data rows from index 4:', rows.length - 4);
console.log('Data rows with non-empty Lender:', withLender.length);
console.log('First 3 lenders:', dataRows.slice(0, 3).map(function (r) { return r[0]; }));
console.log('Last 3 lenders:', dataRows.slice(-3).map(function (r) { return r[0]; }));
