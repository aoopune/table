(function () {
  'use strict';

  var DATA_INDIA = [];
  var DATA_ABROAD = [];
  var currentTab = 'india';
  var selectedBanks = {}; /* bank row index -> checked */

  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function shorten(str, max) {
    max = max || 80;
    if (!str) return '';
    return str.length > max ? str.slice(0, max - 3) + '...' : str;
  }

  function getData() { return currentTab === 'india' ? DATA_INDIA : DATA_ABROAD; }

  var DEFAULT_COMPARE_COLUMNS = ['bank_name', 'Scheme_name', 'Purpose', 'Eligibility_criteria', 'Security_/_Collateral', 'Processing_fees(of_loan_amount)', 'Course'];

  function getVisibleColumns(data, config) {
    var cfg = config || {};
    var prefix = currentTab === 'india' ? 'compare.india.column.' : 'compare.abroad.column.';
    var row = (data || [])[0];
    var allKeys = row ? Object.keys(row) : [];

    if (cfg['compare.visible_columns']) {
      var list = (cfg['compare.visible_columns'] || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
      if (list.length) return list.filter(function (k) { return allKeys.indexOf(k) !== -1; });
    }

    var fromConfig = allKeys.filter(function (k) {
      var key = prefix + k + '.visible';
      var val = cfg[key];
      return val === true || val === 'true' || val === '1' || (typeof val === 'string' && val.toLowerCase() === 'true');
    });
    if (fromConfig.length > 0) return fromConfig;

    return DEFAULT_COMPARE_COLUMNS.filter(function (k) { return allKeys.indexOf(k) !== -1; });
  }

  function getColumnLabel(key) {
    var short = {
      'bank_name': 'Bank',
      'Scheme_name': 'Scheme',
      'Purpose': 'Purpose',
      'Security_/_Collateral': 'Collateral',
      'Processing_fees(of_loan_amount)': 'Processing fee',
      'Co-applicant_/_Guarantor(Compulsorily_strong_financial_background_is_required)2_typesFinancial_/_Primary_Non-financial_/_SecondaryIf_co-applicant_outside_of_familySufficient_proof_of_relationship_is_necessary': 'Co-applicant',
      'Quantum_of_Loan_Amount_(Max)Disbursement_-_Tution_fees_is_disbursed_directly_to_the_institution_and_eligible_expenses_are_paid_in_instalments_to_the_student_or_co-borrower_as_per_bank_norms': 'Max loan amount',
      'Course': 'Course'
    };
    return short[key] || key.replace(/_/g, ' ').slice(0, 30);
  }

  function makeSortable(table) {
    var thead = table.querySelector('thead tr');
    if (!thead) return;
    var headers = thead.querySelectorAll('th');
    headers.forEach(function (th, colIdx) {
      if (th.querySelector('input')) return;
      th.style.cursor = 'pointer';
      th.setAttribute('data-sort', 'none');
      th.addEventListener('click', function () {
        var tbody = table.querySelector('tbody');
        var rows = Array.from(tbody.querySelectorAll('tr'));
        var dir = th.getAttribute('data-sort') === 'asc' ? 'desc' : 'asc';
        th.setAttribute('data-sort', dir);
        headers.forEach(function (h) { if (h !== th) h.setAttribute('data-sort', 'none'); });
        rows.sort(function (a, b) {
          var ac = (a.children[colIdx] || {}).textContent || '';
          var bc = (b.children[colIdx] || {}).textContent || '';
          var cmp = ac.localeCompare(bc, undefined, { numeric: true });
          return dir === 'asc' ? cmp : -cmp;
        });
        rows.forEach(function (r) { tbody.appendChild(r); });
      });
    });
  }

  function renderTable() {
    var container = document.getElementById('table-container');
    var data = getData();
    if (!data || data.length === 0) {
      container.innerHTML = '<p class="text-secondary">No data available.</p>';
      return;
    }
    var cols = getVisibleColumns(data, window.__aooConfig || {});
    if (cols.length === 0) cols = DEFAULT_COMPARE_COLUMNS.filter(function (k) { return data[0][k] !== undefined; });
    if (cols.length === 0) cols = Object.keys(data[0]).slice(0, 8);
    var html = '<div class="table-scroll-inner"><table class="data-table compare-table sortable-table" data-testid="compare-table"><thead><tr><th><input type="checkbox" id="select-all-banks" aria-label="Select all banks"></th><th>Bank / Scheme</th>';
    cols.forEach(function (k) {
      if (k === 'bank_name' || k === 'Scheme_name') return;
      html += '<th>' + escapeHtml(getColumnLabel(k)) + '</th>';
    });
    html += '</tr></thead><tbody>';
    data.forEach(function (row, idx) {
      var bankName = (row.bank_name || '') + (row.Scheme_name ? ' – ' + shorten(row.Scheme_name, 40) : '');
      html += '<tr data-bank-idx="' + idx + '"><td><input type="checkbox" class="bank-checkbox" data-idx="' + idx + '" aria-label="Select bank"></td><td><strong>' + escapeHtml(bankName) + '</strong></td>';
      cols.forEach(function (k) {
        if (k === 'bank_name' || k === 'Scheme_name') return;
        html += '<td>' + escapeHtml(shorten(row[k] || '', 60)) + '</td>';
      });
      html += '</tr>';
    });
    html += '</tbody></table></div>';
    container.innerHTML = html;

    var selectAll = document.getElementById('select-all-banks');
    if (selectAll) {
      selectAll.addEventListener('change', function () {
        var check = selectAll.checked;
        container.querySelectorAll('.bank-checkbox').forEach(function (cb) { cb.checked = check; });
      });
    }
    container.querySelectorAll('.bank-checkbox').forEach(function (cb) {
      cb.addEventListener('change', function () { selectedBanks[cb.dataset.idx] = cb.checked; });
    });
    makeSortable(container.querySelector('.sortable-table'));
  }

  function loadData() {
    var container = document.getElementById('table-container');
    container.innerHTML = '<p class="text-secondary">Loading…</p>';
    Promise.all([
      window.fetchSheet('Education_Loans_India'),
      window.fetchSheet('Education_Loans_Abroad'),
      window.getConfig ? window.getConfig() : Promise.resolve({})
    ]).then(function (results) {
      DATA_INDIA = results[0] || [];
      DATA_ABROAD = results[1] || [];
      window.__aooConfig = results[2] || {};
      var defaultTab = (window.__aooConfig['default_compare_tab'] || 'india').toLowerCase();
      currentTab = defaultTab === 'abroad' ? 'abroad' : 'india';
      document.getElementById('tab-india').className = currentTab === 'india' ? 'btn btn-primary' : 'btn btn-secondary';
      document.getElementById('tab-abroad').className = currentTab === 'abroad' ? 'btn btn-primary' : 'btn btn-secondary';
      renderTable();
    }).catch(function () {
      container.innerHTML = '<p class="text-secondary">Data temporarily unavailable. Please try again.</p><button type="button" class="btn btn-primary" onclick="location.reload()">Retry</button>';
    });
  }

  document.getElementById('tab-india').addEventListener('click', function () {
    currentTab = 'india';
    document.getElementById('tab-india').className = 'btn btn-primary';
    document.getElementById('tab-abroad').className = 'btn btn-secondary';
    renderTable();
  });
  document.getElementById('tab-abroad').addEventListener('click', function () {
    currentTab = 'abroad';
    document.getElementById('tab-abroad').className = 'btn btn-primary';
    document.getElementById('tab-india').className = 'btn btn-secondary';
    renderTable();
  });

  loadData();
})();
