/**
 * Load static loan data from Google Sheets (Static_data_abroad) or fallback to local CSV.
 * Sheet: row 1-2 = group headers, row 3 = column headers, row 4 = "Info button data" (tooltips), row 5+ = data.
 * Only rows with a non-empty Lender (first column) are loaded. Sets TABLE_DATA and column tooltips, then rebuildTable().
 * Source: https://docs.google.com/spreadsheets/d/1eaYl0tfAiTR4AcAaBfqemsbMX8QFcX_yQZOQcD2kW7g (gid=2117455473)
 */
(function () {
  var SHEET_EXPORT_URL = 'https://docs.google.com/spreadsheets/d/1eaYl0tfAiTR4AcAaBfqemsbMX8QFcX_yQZOQcD2kW7g/export?format=csv&gid=2117455473';
  var CSV_FALLBACK_PATH = 'data/loan-data-abroad.csv';

  /** CSV column index -> table column id (for data rows). Select has no CSV column. */
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

  /** Table column id -> CSV column index for tooltip (info row uses same indices). */
  var COL_TO_CSV_FOR_TOOLTIP = {
    lender: 0,
    sector: 2,
    nationality: 12,
    age: 13,
    qualification: 14,
    coApplicant: 15,
    universityStrictness: 16,
    interestRate: 3,
    typeOfInterestRate: 4,
    margin: 5,
    processingFees: 6,
    refundableProcessingFees: 7,
    repaymentTenure: 8,
    moratoriumPeriod: 9,
    paymentDuringMoratorium: 10,
    delayedEmiPayment: 11,
    avgTimeToSanction: 17,
    dedicatedCaseManager: 18,
    onboardingProcess: 19
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

  function applyTooltipsFromInfoRow(infoRow) {
    var config = typeof TABLE_CONFIG !== 'undefined' ? TABLE_CONFIG : window.TABLE_CONFIG;
    if (!config || !infoRow) return;
    config.columnGroups.forEach(function (group) {
      (group.cols || []).forEach(function (col) {
        var csvIdx = COL_TO_CSV_FOR_TOOLTIP[col.id];
        if (csvIdx != null && infoRow[csvIdx] != null && String(infoRow[csvIdx]).trim() !== '') {
          col.tooltip = String(infoRow[csvIdx]).trim().replace(/\r\n/g, '\n').replace(/\n/g, ' ');
        }
      });
    });
  }

  function buildTableDataFromRows(dataRows) {
    return dataRows
      .filter(function (row) {
        var lender = row[0];
        return lender != null && String(lender).trim() !== '';
      })
      .map(function (row) {
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

  function showDataLoadError() {
    var msg = 'Table data could not be loaded. Open this page via a local server (e.g. run "npx serve" in the Table folder and open the URL in your browser).';
    console.warn(msg);
    var el = document.createElement('div');
    el.setAttribute('role', 'alert');
    el.style.cssText = 'position:fixed;top:0;left:0;right:0;padding:10px 12px;background:#d32f2f;color:#fff;font-size:13px;text-align:center;z-index:9999;';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 8000);
  }

  function applyData(rows) {
    if (rows.length < 4) return;
    var infoRow = rows[3];
    var dataRows = rows.slice(4);
    applyTooltipsFromInfoRow(infoRow);
    window.TABLE_DATA = buildTableDataFromRows(dataRows);
    if (typeof window.rebuildTable === 'function') {
      window.rebuildTable();
    }
  }

  function loadAndApply() {
    function tryApply(text) {
      if (typeof text !== 'string') return false;
      var rows = parseCSV(text);
      if (rows.length < 4) return false;
      applyData(rows);
      return true;
    }
    fetch(SHEET_EXPORT_URL, { mode: 'cors' })
      .then(function (res) {
        if (!res.ok) throw new Error('Sheet export failed');
        return res.text();
      })
      .then(function (text) {
        if (tryApply(text)) return;
        throw new Error('Sheet CSV invalid');
      })
      .catch(function () {
        return fetch(CSV_FALLBACK_PATH)
          .then(function (res) { return res.text(); })
          .then(function (text) {
            if (!tryApply(text)) throw new Error('Fallback CSV invalid');
          });
      })
      .catch(function (err) {
        console.warn('Loan data could not be loaded from sheet or CSV:', err);
        if (window.TABLE_DATA && window.TABLE_DATA.length > 0 && typeof window.rebuildTable === 'function') {
          window.rebuildTable();
        } else {
          showDataLoadError();
        }
      });
  }

  if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadAndApply);
    } else {
      setTimeout(loadAndApply, 0);
    }
  }
})();
