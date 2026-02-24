/**
 * Load Static_data_abroad and set window.STATIC_DATA_BY_LENDER for merging into offer rows.
 * Same sheet as loan-data-loader (gid=2117455473). Used with bank JSONs: Numerical_data in bank files,
 * institutes in institutes.json (institutes_abroad_standardized). Table shows bank JSON offers + this static data.
 */
(function () {
  var SHEET_EXPORT_URL = 'https://docs.google.com/spreadsheets/d/1eaYl0tfAiTR4AcAaBfqemsbMX8QFcX_yQZOQcD2kW7g/export?format=csv&gid=2117455473';
  var CSV_FALLBACK_PATH = 'data/loan-data-abroad.csv';

  var CSV_TO_COL = {
    0: 'lender', 2: 'sector', 12: 'nationality', 13: 'age', 14: 'qualification', 15: 'coApplicant',
    16: 'universityStrictness', 3: 'interestRate', 4: 'typeOfInterestRate', 5: 'margin', 6: 'processingFees',
    7: 'refundableProcessingFees', 8: 'repaymentTenure', 9: 'moratoriumPeriod', 10: 'paymentDuringMoratorium',
    11: 'delayedEmiPayment', 17: 'avgTimeToSanction', 18: 'dedicatedCaseManager', 19: 'onboardingProcess'
  };
  var COL_TO_CSV = {};
  Object.keys(CSV_TO_COL).forEach(function (k) { COL_TO_CSV[CSV_TO_COL[k]] = parseInt(k, 10); });

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
          if (i + 1 < len && text[i + 1] === '"') { cell += '"'; i += 2; continue; }
          inQuotes = false;
          i++;
          continue;
        }
        if (ch === '\r' || ch === '\n') { cell += '\n'; i++; continue; }
        cell += ch;
        i++;
        continue;
      }
      if (ch === '"') { inQuotes = true; i++; continue; }
      if (ch === ',') { row.push(cell.trim()); cell = ''; i++; continue; }
      if (ch === '\n' || ch === '\r') {
        row.push(cell.trim());
        if (row.length > 0 && row.some(function (c) { return c.length > 0; })) rows.push(row);
        row = [];
        cell = '';
        if (ch === '\r' && i + 1 < len && text[i + 1] === '\n') i++;
        i++;
        continue;
      }
      cell += ch;
      i++;
    }
    if (cell.length > 0 || row.length > 0) { row.push(cell.trim()); rows.push(row); }
    return rows;
  }

  function buildStaticByLender(dataRows) {
    var byLender = {};
    dataRows.forEach(function (row) {
      var lender = row[0];
      if (lender == null || String(lender).trim() === '') return;
      lender = String(lender).trim();
      if (byLender[lender]) return;
      var obj = {};
      Object.keys(CSV_TO_COL).forEach(function (idx) {
        var colId = CSV_TO_COL[idx];
        if (colId === 'lender') return;
        var val = row[idx];
        if (val != null && String(val).trim() !== '') {
          obj[colId] = String(val).trim().replace(/\r\n/g, '\n').replace(/\n/g, ' ');
        }
      });
      byLender[lender] = obj;
    });
    return byLender;
  }

  function applyTooltips(infoRow) {
    var config = typeof TABLE_CONFIG !== 'undefined' ? TABLE_CONFIG : window.TABLE_CONFIG;
    if (!config || !infoRow) return;
    config.columnGroups.forEach(function (group) {
      (group.cols || []).forEach(function (col) {
        var csvIdx = COL_TO_CSV[col.id];
        if (csvIdx != null && infoRow[csvIdx] != null && String(infoRow[csvIdx]).trim() !== '') {
          col.tooltip = String(infoRow[csvIdx]).trim().replace(/\r\n/g, '\n').replace(/\n/g, ' ');
        }
      });
    });
  }

  function run(text) {
    var rows = parseCSV(text);
    if (rows.length < 4) return;
    applyTooltips(rows[3]);
    var dataRows = rows.slice(4).filter(function (row) {
      return row[0] != null && String(row[0]).trim() !== '';
    });
    window.STATIC_DATA_BY_LENDER = buildStaticByLender(dataRows);
    if (typeof window.rebuildTable === 'function') window.rebuildTable();
  }

  function load() {
    fetch(SHEET_EXPORT_URL, { mode: 'cors' })
      .then(function (res) { return res.ok ? res.text() : Promise.reject(); })
      .then(run)
      .catch(function () {
        return fetch(CSV_FALLBACK_PATH).then(function (r) { return r.text(); }).then(run);
      })
      .catch(function () {});
  }

  if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', load);
    } else {
      setTimeout(load, 0);
    }
  }
})();
