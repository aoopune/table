(function () {
  'use strict';

  /**
   * Data: set window.TABLE_DATA = [ { lender, sector, select, ... } ] (keys = column ids from config).
   * Missing keys show as "—". Sort/filter apply on top of TABLE_DATA; table works with any future data.
   */

  var tableState = {
    sortBy: null,
    sortDir: 'asc',
    filters: {},
    query: { gender: null, loanAmount: null, security: null, levelOfStudy: null, country: null, university: null }
  };
  var _filterPanelTrigger = null;

  function getConfig() {
    return typeof TABLE_CONFIG !== 'undefined' ? TABLE_CONFIG : null;
  }

  function getAllColumnIds() {
    var config = getConfig();
    if (!config || !config.columnGroups) return [];
    var ids = [];
    config.columnGroups.forEach(function (group) {
      (group.cols || []).forEach(function (col) {
        ids.push(col);
      });
    });
    return ids;
  }

  function getSourceRows() {
    if (typeof window !== 'undefined' && window.LOAN_OFFERS && Array.isArray(window.LOAN_OFFERS) && window.LOAN_OFFERS.length > 0) {
      return window.LOAN_OFFERS.slice();
    }
    var rows = typeof window !== 'undefined' && window.TABLE_DATA && Array.isArray(window.TABLE_DATA) && window.TABLE_DATA.length > 0
      ? window.TABLE_DATA
      : getDefaultTestRows();
    return rows.slice();
  }

  function isOfferMode(rows) {
    return rows.length > 0 && rows[0].minLoan != null && rows[0].maxLoan != null && rows[0].gender != null;
  }

  function parseLoanAmount(val) {
    if (val == null || val === '') return null;
    var s = String(val).replace(/,/g, '').trim();
    if (s === '') return null;
    var n = parseFloat(s);
    return isNaN(n) ? null : n;
  }

  function criteriaMatchesRow(rowCriteria, instituteCriteria) {
    if (!rowCriteria || !instituteCriteria) return false;
    var parts = String(rowCriteria).split('/').map(function (p) { return p.trim(); });
    var want = String(instituteCriteria).trim();
    for (var i = 0; i < parts.length; i++) {
      if (parts[i] === want) return true;
    }
    return rowCriteria.trim() === want;
  }

  function lenderHasUniversity(lender, university, rowCriteria) {
    var inst = window.INSTITUTES;
    if (!inst || !Array.isArray(inst)) return false;
    var parts = (rowCriteria || '').split('/').map(function (p) { return p.trim(); });
    for (var i = 0; i < inst.length; i++) {
      var e = inst[i];
      if (e.lenderName !== lender || e.university !== university) continue;
      var c = (e.criteria || '').trim();
      for (var j = 0; j < parts.length; j++) {
        if (parts[j] === c) return true;
      }
      if (c === (rowCriteria || '').trim()) return true;
    }
    return false;
  }

  function lenderHasCountry(lender, country) {
    var inst = window.INSTITUTES;
    if (!inst || !Array.isArray(inst) || !country) return false;
    for (var i = 0; i < inst.length; i++) {
      if (inst[i].lenderName === lender && inst[i].country === country) return true;
    }
    return false;
  }

  function getInstituteMatch(lender, university, rowCriteria, country) {
    var inst = window.INSTITUTES;
    if (!inst || !Array.isArray(inst) || !lender || !university) return null;
    var fallback = null;
    for (var i = 0; i < inst.length; i++) {
      var e = inst[i];
      if (e.lenderName !== lender || e.university !== university) continue;
      if (country && e.country && e.country !== country) continue;
      if (!fallback) fallback = e;
      var c = (e.criteria || '').trim();
      if (criteriaMatchesRow(rowCriteria, c) || c === (rowCriteria || '').trim()) return e;
    }
    return fallback;
  }

  function applyQueryToOffers(rows, query) {
    var gender = query.gender;
    var amount = query.loanAmount;
    var security = query.security;
    var levelOfStudy = query.levelOfStudy;
    var university = query.university;
    var country = query.country;
    var filtered = rows.slice();
    if (country) {
      filtered = filtered.filter(function (row) { return lenderHasCountry(row.lender, country); });
    }
    if (amount != null && typeof amount === 'number') {
      filtered = filtered.filter(function (row) {
        var min = Number(row.minLoan);
        var max = row.maxLoan === 99999999 || row.maxLoan == null ? Infinity : Number(row.maxLoan);
        return !isNaN(min) && amount >= min && amount <= max;
      });
    }
    if (security === 'Secured') {
      filtered = filtered.filter(function (row) { return (row.security || '').toLowerCase() === 'yes'; });
    } else if (security === 'Unsecured') {
      filtered = filtered.filter(function (row) { return (row.security || '').toLowerCase() === 'no'; });
    }
    if (university) {
      filtered = filtered.map(function (row) {
        var iwc = (row.instituteWiseChanges || '').toLowerCase();
        if (iwc !== 'yes') return row;
        if (!lenderHasUniversity(row.lender, university, row.instituteCriteria)) return null;
        var match = getInstituteMatch(row.lender, university, row.instituteCriteria, country);
        if (!match) return null;
        var out = {};
        for (var k in row) out[k] = row[k];
        out.course = (match.course || '').trim();
        out.levelOfStudy = out.course;
        return out;
      }).filter(function (row) { return !!row; });
    }
    if (levelOfStudy) {
      filtered = filtered.filter(function (row) {
        var level = (row.levelOfStudy || row.course || '').trim();
        return level === levelOfStudy || level.toLowerCase().indexOf(levelOfStudy.toLowerCase()) !== -1;
      });
    }
    if (gender === 'Male' || gender === 'Female') {
      filtered = filtered.filter(function (row) {
        var g = row.gender;
        return g === gender || g === 'Equal';
      });
      filtered.sort(function (a, b) {
        var ag = a.gender === gender ? 0 : 1;
        var bg = b.gender === gender ? 0 : 1;
        if (ag !== bg) return ag - bg;
        return 0;
      });
    }
    var seen = {};
    filtered = filtered.filter(function (row) {
      var l = row.lender;
      if (seen[l]) return false;
      seen[l] = true;
      return true;
    });
    return filtered;
  }

  function hasAnyQuery(query) {
    return !!(query.gender || query.loanAmount != null || query.security || query.levelOfStudy || query.country || query.university);
  }

  function getViewRows() {
    var rows = getSourceRows();
    if (isOfferMode(rows) && hasAnyQuery(tableState.query)) {
      rows = applyQueryToOffers(rows, tableState.query);
    } else if (isOfferMode(rows)) {
      var seen = {};
      rows = rows.filter(function (row) {
        var l = row.lender;
        if (seen[l]) return false;
        seen[l] = true;
        return true;
      });
    }
    if (tableState.sortBy) {
      rows = sortRows(rows, tableState.sortBy, tableState.sortDir);
    }
    rows = applyFilters(rows);
    return rows;
  }

  function sortRows(rows, colId, dir) {
    var out = rows.slice();
    out.sort(function (a, b) {
      var va = a[colId];
      var vb = b[colId];
      var na = typeof va === 'number' || (typeof va === 'string' && /^-?\d*\.?\d+$/.test(String(va).trim()));
      var nb = typeof vb === 'number' || (typeof vb === 'string' && /^-?\d*\.?\d+$/.test(String(vb).trim()));
      if (na && nb) {
        var nA = Number(va);
        var nB = Number(vb);
        return dir === 'asc' ? (nA - nB) : (nB - nA);
      }
      var sA = va != null && va !== '' ? String(va).toLowerCase() : '';
      var sB = vb != null && vb !== '' ? String(vb).toLowerCase() : '';
      var c = sA.localeCompare(sB);
      return dir === 'asc' ? c : -c;
    });
    return out;
  }

  function applyFilters(rows) {
    var config = getConfig();
    if (!config || !config.columnGroups) return rows;
    var colIds = [];
    config.columnGroups.forEach(function (group) {
      (group.cols || []).forEach(function (col) {
        colIds.push(col.id);
      });
    });
    var f = tableState.filters;
    return rows.filter(function (row) {
      for (var i = 0; i < colIds.length; i++) {
        var colId = colIds[i];
        var rule = f[colId];
        if (!rule) continue;
        var val = row[colId];
        var cellStr = val != null && val !== '' ? String(val) : '';
        if (rule.type === 'condition') {
          if (!matchesCondition(cellStr, rule.op, rule.value)) return false;
        } else if (rule.type === 'values') {
          var key = cellStr;
          if (!rule.selectedValues || !rule.selectedValues[key]) return false;
        }
      }
      return true;
    });
  }

  function matchesCondition(cellStr, op, value) {
    var v = (value != null && value !== '') ? String(value).trim() : '';
    var cell = cellStr;
    var empty = cell === '';
    switch (op) {
      case 'none': return true;
      case 'is_empty': return empty;
      case 'is_not_empty': return !empty;
      case 'contains': return cell.toLowerCase().indexOf(v.toLowerCase()) !== -1;
      case 'not_contains': return cell.toLowerCase().indexOf(v.toLowerCase()) === -1;
      case 'starts_with': return cell.toLowerCase().indexOf(v.toLowerCase()) === 0;
      case 'ends_with': return v.length && cell.length >= v.length && cell.toLowerCase().slice(-v.length) === v.toLowerCase();
      case 'equals': return cell.toLowerCase() === v.toLowerCase();
      case 'greater': return parseFloat(cell) > parseFloat(v);
      case 'greater_eq': return parseFloat(cell) >= parseFloat(v);
      case 'less': return parseFloat(cell) < parseFloat(v);
      case 'less_eq': return parseFloat(cell) <= parseFloat(v);
      case 'not_equals': return cell.toLowerCase() !== v.toLowerCase();
      case 'between': return v.indexOf(',') !== -1 && (function () { var parts = v.split(',').map(Number); return cell !== '' && parseFloat(cell) >= Math.min(parts[0], parts[1]) && parseFloat(cell) <= Math.max(parts[0], parts[1]); })();
      case 'not_between': return v.indexOf(',') !== -1 && !(function () { var parts = v.split(',').map(Number); return cell !== '' && parseFloat(cell) >= Math.min(parts[0], parts[1]) && parseFloat(cell) <= Math.max(parts[0], parts[1]); })();
      default: return true;
    }
  }

  function getUniqueValues(colId) {
    var rows = getSourceRows();
    var set = {};
    rows.forEach(function (row) {
      var val = row[colId];
      var key = val != null && val !== '' ? String(val) : '';
      set[key] = true;
    });
    return Object.keys(set).sort(function (a, b) {
      return (a === '' ? '—' : a).toString().localeCompare(b === '' ? '—' : b);
    });
  }

  function getTotalColumnCount() {
    var config = getConfig();
    if (!config || !config.columnGroups) return 0;
    return config.columnGroups.reduce(function (n, group) {
      return n + (group.cols ? group.cols.length : 1);
    }, 0);
  }

  function buildTableHeader() {
    var config = getConfig();
    if (!config || !config.columnGroups) return '';
    var totalCols = getTotalColumnCount();
    var html = '<tr class="header-row">';
    config.columnGroups.forEach(function (group, gIdx) {
      var colSpan = group.cols ? group.cols.length : 1;
      var stickyGroupClass = (gIdx === 0) ? ' sticky-group' : '';
      html += '<th colspan="' + colSpan + '" class="th-group th-group-end' + stickyGroupClass + '">' + escapeHtml(group.label) + '</th>';
    });
    html += '</tr><tr class="header-divider-row"><td colspan="' + totalCols + '" class="header-divider-cell"></td></tr><tr class="subheader-row">';
    var stickyIndex = 0;
    config.columnGroups.forEach(function (group, gIdx) {
      var cols = group.cols || [];
      cols.forEach(function (col, cIdx) {
        var stickyClass = '';
        if (col.sticky) {
          stickyIndex += 1;
          stickyClass = ' sticky-col sticky-col-' + stickyIndex;
        }
        var groupEndClass = (cIdx === cols.length - 1) ? ' th-col-group-end' : '';
        if (col.id === 'select') {
          html += '<th class="th-col th-col-select-only' + stickyClass + groupEndClass + '" data-col-id="select"><span class="th-col-inner"><input type="checkbox" class="select-all-checkbox" aria-label="Select all"></span></th>';
          return;
        }
        var infoContent = (col.tooltip != null && col.tooltip !== '') ? col.tooltip : 'Description will be added here.';
        var infoPopover = '<span class="info-trigger-wrap"><button type="button" class="info-icon" aria-label="Info for ' + escapeHtml(col.label) + '"><span class="info-icon-inner">i</span></button><span class="info-popover" role="tooltip"><button type="button" class="info-popover-close" aria-label="Close">×</button><span class="info-popover-text">' + escapeHtml(infoContent) + '</span></span></span>';
        var filterCls = 'filter-trigger';
        if (tableState.sortBy === col.id) filterCls += ' is-sorted';
        if (tableState.filters[col.id]) filterCls += ' is-filtered';
        var filterTrigger = '<button type="button" class="' + filterCls + '" data-col-id="' + escapeHtml(col.id) + '" aria-label="Filter ' + escapeHtml(col.label) + '">&#9660;</button>';
        var iconsHtml = '<span class="header-icons">' + filterTrigger + infoPopover + '</span>';
        html += '<th class="th-col' + stickyClass + groupEndClass + '" data-col-id="' + escapeHtml(col.id) + '"><span class="th-col-inner"><span class="th-col-label">' + escapeHtml(col.label) + '</span>' + iconsHtml + '</span></th>';
      });
    });
    html += '</tr>';
    return html;
  }

  function getDefaultTestRows() {
    var rows = [];
    for (var i = 0; i < 60; i++) {
      rows.push({});
    }
    return rows;
  }

  function buildTableBody() {
    var rows = getViewRows();
    var config = getConfig();
    if (!config || !config.columnGroups) return '';
    return rows.map(function (row, i) {
      var stickyIndex = 0;
      var tr = '<tr data-row-index="' + i + '">';
      config.columnGroups.forEach(function (group) {
        var cols = group.cols || [];
        cols.forEach(function (col, cIdx) {
          var stickyClass = '';
          if (col.sticky) {
            stickyIndex += 1;
            stickyClass = ' sticky-col sticky-col-' + stickyIndex;
          }
          var groupEndClass = (cIdx === cols.length - 1) ? ' td-col-group-end' : '';
          var val = row[col.id];
          if (col.type === 'checkbox') {
            var checked = val ? ' checked' : '';
            tr += '<td class="td-' + col.id + stickyClass + groupEndClass + '"><label><input type="checkbox" class="row-select"' + checked + '></label></td>';
          } else {
            tr += '<td class="td-' + col.id + stickyClass + groupEndClass + '">' + (val != null && val !== '' ? escapeHtml(String(val)) : '—') + '</td>';
          }
        });
      });
      tr += '</tr>';
      return tr;
    }).join('');
  }

  function updateStickyWidths() {
    var tableHeader = document.getElementById('comparisonTableHeader');
    var container = document.querySelector('.table-container');
    if (!tableHeader || !container) return;
    for (var i = 1; i <= 3; i++) {
      var cell = tableHeader.querySelector('.sticky-col-' + i);
      if (cell) {
        var w = Math.min(cell.scrollWidth + 4, cell.offsetWidth) + 'px';
        container.style.setProperty('--sticky-col-' + i + '-width', w);
      }
    }
  }

  function get20ChPx() {
    var table = document.getElementById('comparisonTableBody');
    var fontSize = (table && window.getComputedStyle(table).fontSize) ? window.getComputedStyle(table).fontSize : '12px';
    var el = document.createElement('span');
    el.setAttribute('aria-hidden', 'true');
    el.style.cssText = 'position:absolute;width:20ch;font-size:' + fontSize + ';pointer-events:none;visibility:hidden;';
    document.body.appendChild(el);
    var px = el.offsetWidth;
    document.body.removeChild(el);
    return px;
  }

  function setColgroup(minWidths) {
    var colgroupHeader = document.getElementById('colgroupHeader');
    var colgroupBody = document.getElementById('colgroupBody');
    if (!colgroupHeader || !colgroupBody) return;
    var capPx = get20ChPx();
    colgroupHeader.innerHTML = '';
    colgroupBody.innerHTML = '';
    minWidths.forEach(function (w) {
      var capped = Math.min(w, capPx);
      var colH = document.createElement('col');
      colH.style.minWidth = capped + 'px';
      colH.style.width = capped + 'px';
      colgroupHeader.appendChild(colH);
      var colB = document.createElement('col');
      colB.style.minWidth = capped + 'px';
      colB.style.width = capped + 'px';
      colgroupBody.appendChild(colB);
    });
  }

  function getColumnLabels() {
    var config = getConfig();
    if (!config || !config.columnGroups) return [];
    var labels = [];
    config.columnGroups.forEach(function (group) {
      (group.cols || []).forEach(function (col) {
        labels.push(col.label || '');
      });
    });
    return labels;
  }

  function minWidthForLabel(label) {
    if (!label || !label.length) return 40;
    var pxPerChar = 6;
    var iconSpace = 22;
    return Math.ceil(label.length * pxPerChar) + iconSpace;
  }

  function measureAndSizeColumns() {
    var tableHeader = document.getElementById('comparisonTableHeader');
    var tableBody = document.getElementById('comparisonTableBody');
    if (!tableHeader || !tableBody) return;
    var subheaderRow = tableHeader.querySelector('.subheader-row');
    var tbody = tableBody.querySelector('tbody');
    if (!subheaderRow) return;
    var colLabels = getColumnLabels();
    var colCount = subheaderRow.cells.length;
    var minWidths = [];
    for (var c = 0; c < colCount; c++) {
      if (c === 2) {
        minWidths.push(28);
        continue;
      }
      var headerW = subheaderRow.cells[c] ? subheaderRow.cells[c].scrollWidth + 2 : 40;
      var labelMin = (colLabels[c] != null) ? minWidthForLabel(colLabels[c]) : 48;
      if (c < 3) {
        var stickyMin = (c === 0) ? 52 : (c === 1) ? 50 : 44;
        minWidths.push(Math.max(headerW, stickyMin, labelMin));
      } else {
        minWidths.push(Math.max(headerW, labelMin, 40));
      }
    }
    setColgroup(minWidths);
  }

  function escapeHtml(s) {
    if (s == null) return '';
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function updateHeaderScrollState() {
    var bodyWrap = document.getElementById('tableBodyWrap');
    var container = document.querySelector('.table-container');
    if (!bodyWrap || !container) return;
    container.classList.toggle('has-h-scrolled', bodyWrap.scrollLeft > 0);
  }

  function syncHeaderScroll() {
    var headerWrap = document.getElementById('tableHeaderWrap');
    var bodyWrap = document.getElementById('tableBodyWrap');
    if (!headerWrap || !bodyWrap) return;
    bodyWrap.addEventListener('scroll', function () {
      headerWrap.scrollLeft = bodyWrap.scrollLeft;
      updateHeaderScrollState();
    });
    headerWrap.addEventListener('scroll', function () {
      bodyWrap.scrollLeft = headerWrap.scrollLeft;
      updateHeaderScrollState();
    });
    updateHeaderScrollState();
  }

  function positionPopover(btn, popover) {
    var rect = btn.getBoundingClientRect();
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var pad = 8;
    popover.style.maxWidth = Math.min(320, vw * 0.9) + 'px';
    popover.style.left = '';
    popover.style.right = '';
    popover.style.top = '';
    popover.classList.remove('arrow-right', 'arrow-top');
    popover.classList.add('visible');
    var pw = popover.offsetWidth;
    var ph = popover.offsetHeight;
    var left;
    var top;
    if (rect.bottom + ph + pad <= vh - pad) {
      top = rect.bottom + pad;
      left = rect.left + (rect.width / 2) - (pw / 2);
      popover.classList.add('arrow-top');
    } else {
      left = rect.right + pad;
      top = rect.top + (rect.height / 2) - (ph / 2);
      if (left + pw > vw - pad) {
        left = rect.left - pw - pad;
        popover.classList.add('arrow-right');
      }
    }
    if (left < pad) left = pad;
    if (left + pw > vw - pad) left = vw - pw - pad;
    if (top < pad) top = pad;
    if (top + ph > vh - pad) top = vh - ph - pad;
    popover.style.left = left + 'px';
    popover.style.top = top + 'px';
  }

  var CONDITION_OPTIONS = [
    { op: 'none', label: 'None', needsValue: false },
    { op: 'is_empty', label: 'Is empty', needsValue: false },
    { op: 'is_not_empty', label: 'Is not empty', needsValue: false },
    { op: 'contains', label: 'Text contains', needsValue: true },
    { op: 'not_contains', label: 'Text does not contain', needsValue: true },
    { op: 'starts_with', label: 'Text starts with', needsValue: true },
    { op: 'ends_with', label: 'Text ends with', needsValue: true },
    { op: 'equals', label: 'Text is exactly', needsValue: true },
    { op: 'greater', label: 'Greater than', needsValue: true },
    { op: 'greater_eq', label: 'Greater than or equal to', needsValue: true },
    { op: 'less', label: 'Less than', needsValue: true },
    { op: 'less_eq', label: 'Less than or equal to', needsValue: true },
    { op: 'not_equals', label: 'Is not equal to', needsValue: true },
    { op: 'between', label: 'Is between', needsValue: true },
    { op: 'not_between', label: 'Is not between', needsValue: true }
  ];

  function openFilterPanel(colId, triggerEl) {
    var panel = document.getElementById('filterPanel');
    if (!panel) return;
    var uniqueVals = getUniqueValues(colId);
    var currentFilter = tableState.filters[colId];
    var currentSort = tableState.sortBy === colId ? tableState.sortDir : null;
    var conditionOpts = CONDITION_OPTIONS.map(function (o) {
      return '<option value="' + escapeHtml(o.op) + '"' + (currentFilter && currentFilter.type === 'condition' && currentFilter.op === o.op ? ' selected' : '') + '>' + escapeHtml(o.label) + '</option>';
    }).join('');
    var conditionValue = (currentFilter && currentFilter.type === 'condition' && currentFilter.value != null) ? escapeHtml(currentFilter.value) : '';
    var selectedValues = (currentFilter && currentFilter.type === 'values' && currentFilter.selectedValues) ? currentFilter.selectedValues : {};
    uniqueVals = uniqueVals.slice().sort(function (a, b) {
      var aSel = selectedValues[a] ? 1 : 0;
      var bSel = selectedValues[b] ? 1 : 0;
      if (aSel !== bSel) return bSel - aSel;
      return (a === '' ? '—' : a).toString().localeCompare(b === '' ? '—' : b);
    });
    var valuesListHtml = uniqueVals.map(function (v) {
      var label = v === '' ? '—' : v;
      var checked = selectedValues[v] ? ' checked' : '';
      return '<label class="filter-values-item"><input type="checkbox" data-value="' + escapeHtml(v) + '"' + checked + '><span>' + escapeHtml(label) + '</span></label>';
    }).join('');
    var clearSortHtml = (tableState.sortBy === colId) ? '<button type="button" class="filter-sort-option filter-clear-sort">Clear sort</button>' : '';
    var clearFilterHtml = tableState.filters[colId] ? '<button type="button" class="filter-sort-option filter-clear-filter">Clear filter</button>' : '';
    var clearBothHtml = (tableState.sortBy === colId && tableState.filters[colId]) ? '<button type="button" class="filter-sort-option filter-clear-both">Clear both</button>' : '';
    var clearButtonsHtml = (clearSortHtml || clearFilterHtml || clearBothHtml) ? '<div class="filter-clear-buttons">' + clearSortHtml + clearFilterHtml + clearBothHtml + '</div>' : '';
    var sortAscActive = currentSort === 'asc' ? ' filter-sort-option-active' : '';
    var sortDescActive = currentSort === 'desc' ? ' filter-sort-option-active' : '';
    var conditionActive = (currentFilter && currentFilter.type === 'condition' && currentFilter.op !== 'none') ? ' filter-section-active' : '';
    var valuesActive = (currentFilter && currentFilter.type === 'values') ? ' filter-section-active' : '';
    panel.innerHTML =
      '<div class="filter-section"><span class="filter-section-title">Sort</span>' +
      '<button type="button" class="filter-sort-option' + sortAscActive + '" data-sort="asc">Sort A to Z / Smallest to Largest</button>' +
      '<button type="button" class="filter-sort-option' + sortDescActive + '" data-sort="desc">Sort Z to A / Largest to Smallest</button>' +
      clearButtonsHtml + '</div>' +
      '<div class="filter-section' + conditionActive + '"><span class="filter-section-title">Filter by condition</span>' +
      '<select class="filter-condition-select" id="filterConditionSelect">' + conditionOpts + '</select>' +
      '<input type="text" class="filter-condition-input" id="filterConditionInput" placeholder="Value" value="' + conditionValue + '"></div>' +
      '<div class="filter-section filter-section-values' + valuesActive + '"><span class="filter-section-title">Filter by values</span>' +
      '<div class="filter-values-buttons"><button type="button" class="filter-select-all">Select all</button><button type="button" class="filter-clear-all">Clear all</button><button type="button" class="filter-cancel">Cancel</button><button type="button" class="filter-ok primary">OK</button></div>' +
      '<input type="text" class="filter-values-search" placeholder="Search values..." id="filterValuesSearch">' +
      '<div class="filter-values-list" id="filterValuesList">' + valuesListHtml + '</div></div>';
    panel.setAttribute('data-col-id', colId);
    panel.classList.add('visible');
    panel.setAttribute('aria-hidden', 'false');
    positionFilterPanel(panel, triggerEl);
    var condSelect = panel.querySelector('#filterConditionSelect');
    var condInput = panel.querySelector('#filterConditionInput');
    var needsValue = CONDITION_OPTIONS.filter(function (o) { return o.op === condSelect.value; })[0];
    condInput.style.display = (needsValue && needsValue.needsValue) ? 'block' : 'none';
    condSelect.addEventListener('change', function () {
      var opt = CONDITION_OPTIONS.filter(function (o) { return o.op === condSelect.value; })[0];
      condInput.style.display = (opt && opt.needsValue) ? 'block' : 'none';
    });
    panel.querySelectorAll('.filter-sort-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.classList.contains('filter-clear-sort')) {
          tableState.sortBy = null;
          tableState.sortDir = 'asc';
          updateFilterTriggerStates();
          refreshTableBody();
          closeFilterPanel(triggerEl);
          return;
        }
        if (btn.classList.contains('filter-clear-filter')) {
          delete tableState.filters[colId];
          updateFilterTriggerStates();
          refreshTableBody();
          closeFilterPanel(triggerEl);
          return;
        }
        if (btn.classList.contains('filter-clear-both')) {
          tableState.sortBy = null;
          tableState.sortDir = 'asc';
          delete tableState.filters[colId];
          updateFilterTriggerStates();
          refreshTableBody();
          closeFilterPanel(triggerEl);
          return;
        }
        tableState.sortBy = colId;
        tableState.sortDir = btn.getAttribute('data-sort');
        refreshTableBody();
        closeFilterPanel(triggerEl);
      });
    });
    panel.querySelector('.filter-select-all').addEventListener('click', function () {
      panel.querySelectorAll('#filterValuesList input[type="checkbox"]').forEach(function (cb) {
        cb.checked = true;
      });
    });
    panel.querySelector('.filter-clear-all').addEventListener('click', function () {
      panel.querySelectorAll('#filterValuesList input[type="checkbox"]').forEach(function (cb) {
        cb.checked = false;
      });
    });
    panel.querySelector('#filterValuesSearch').addEventListener('input', function () {
      var q = this.value.toLowerCase();
      panel.querySelectorAll('#filterValuesList .filter-values-item').forEach(function (item) {
        var text = (item.querySelector('span') || {}).textContent || '';
        item.style.display = text.toLowerCase().indexOf(q) !== -1 ? '' : 'none';
      });
    });
    panel.querySelector('.filter-cancel').addEventListener('click', function () { closeFilterPanel(triggerEl); });
    panel.querySelector('.filter-ok').addEventListener('click', function () {
      applyFilterFromPanel(colId, panel);
      refreshTableBody();
      closeFilterPanel(triggerEl);
    });
    _filterPanelTrigger = triggerEl;
    setTimeout(function () {
      var first = panel.querySelector('.filter-sort-option, .filter-condition-select, .filter-select-all, .filter-cancel');
      if (first) first.focus();
    }, 0);
    setupFilterPanelKeyboard(panel, triggerEl);
  }

  function bindSelectAll() {
    var container = document.querySelector('.table-container');
    if (!container) return;
    if (container._selectAllBound) {
      updateSelectAllCheckboxState();
      return;
    }
    container._selectAllBound = true;
    function getRowCheckboxes() {
      var tbody = document.getElementById('tableBody');
      return tbody ? tbody.querySelectorAll('input.row-select') : [];
    }
    function setAllRows(checked) {
      getRowCheckboxes().forEach(function (cb) { cb.checked = checked; });
      var h = container.querySelector('.select-all-checkbox');
      if (h) { h.checked = checked; h.indeterminate = false; }
    }
    window.updateSelectAllCheckboxState = function () {
      var h = container.querySelector('.select-all-checkbox');
      if (!h) return;
      var cbs = getRowCheckboxes();
      if (cbs.length === 0) {
        h.checked = false;
        h.indeterminate = false;
        return;
      }
      var n = 0;
      for (var i = 0; i < cbs.length; i++) {
        if (cbs[i].checked) n++;
      }
      h.indeterminate = n > 0 && n < cbs.length;
      h.checked = n === cbs.length;
    };
    container.addEventListener('change', function (e) {
      if (e.target.classList.contains('select-all-checkbox')) {
        setAllRows(e.target.checked);
      } else if (e.target.classList.contains('row-select')) {
        window.updateSelectAllCheckboxState();
      }
    });
    updateSelectAllCheckboxState();
  }

  function bindFilterTriggers() {
    document.querySelectorAll('.filter-trigger').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var colId = btn.getAttribute('data-col-id');
        if (colId) openFilterPanel(colId, btn);
      });
    });
    if (!document._filterPanelOutsideClick) {
      document._filterPanelOutsideClick = true;
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.filter-panel') && !e.target.closest('.filter-trigger')) {
          closeFilterPanel(_filterPanelTrigger);
        }
      });
    }
  }

  function applyFilterFromPanel(colId, panel) {
    var condSelect = panel.querySelector('#filterConditionSelect');
    var condInput = panel.querySelector('#filterConditionInput');
    var op = condSelect && condSelect.value ? condSelect.value : 'none';
    var checked = panel.querySelectorAll('#filterValuesList input[type="checkbox"]:checked');
    if (op !== 'none') {
      tableState.filters[colId] = { type: 'condition', op: op, value: condInput ? condInput.value : '' };
    } else if (checked.length > 0) {
      var selectedValues = {};
      checked.forEach(function (cb) {
        selectedValues[cb.getAttribute('data-value')] = true;
      });
      tableState.filters[colId] = { type: 'values', selectedValues: selectedValues };
    } else {
      delete tableState.filters[colId];
    }
  }

  function setupFilterPanelKeyboard(panel, triggerEl) {
    var focusables = panel.querySelectorAll('button, select, input:not([type="hidden"])');
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    panel.addEventListener('keydown', function keydown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeFilterPanel(triggerEl);
        panel.removeEventListener('keydown', keydown);
      } else if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    });
  }

  function positionFilterPanel(panel, triggerEl) {
    var rect = triggerEl.getBoundingClientRect();
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var pad = 8;
    panel.style.left = '';
    panel.style.right = '';
    panel.style.top = '';
    panel.style.bottom = '';
    var ph = panel.offsetHeight;
    var pw = panel.offsetWidth;
    var left = rect.left;
    var top = rect.bottom + pad;
    if (top + ph > vh - pad) top = rect.top - ph - pad;
    if (top < pad) top = pad;
    if (left + pw > vw - pad) left = vw - pw - pad;
    if (left < pad) left = pad;
    panel.style.left = left + 'px';
    panel.style.top = top + 'px';
  }

  function closeFilterPanel(triggerEl) {
    var panel = document.getElementById('filterPanel');
    if (panel) {
      panel.classList.remove('visible');
      panel.setAttribute('aria-hidden', 'true');
    }
    var restore = triggerEl || _filterPanelTrigger;
    if (restore && typeof restore.focus === 'function') {
      try { restore.focus(); } catch (err) {}
    }
    _filterPanelTrigger = null;
  }

  function updateFilterTriggerStates() {
    document.querySelectorAll('.filter-trigger').forEach(function (btn) {
      var colId = btn.getAttribute('data-col-id');
      if (!colId) return;
      btn.classList.toggle('is-sorted', tableState.sortBy === colId);
      btn.classList.toggle('is-filtered', !!tableState.filters[colId]);
    });
  }

  function refreshTableBody() {
    var tbody = document.getElementById('tableBody');
    if (tbody) tbody.innerHTML = buildTableBody();
    updateStickyWidths();
    updateFilterTriggerStates();
  }

  function getInfoPopoverPortal() {
    return document.getElementById('infoPopoverPortal');
  }

  function hideInfoPopover() {
    var portal = getInfoPopoverPortal();
    if (portal) {
      portal.classList.remove('visible');
      portal.setAttribute('aria-hidden', 'true');
    }
  }

  function bindInfoPopovers() {
    var wraps = document.querySelectorAll('.info-trigger-wrap');
    var hoverCapable = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: hover)').matches;
    var portal = getInfoPopoverPortal();
    wraps.forEach(function (wrap) {
      var btn = wrap.querySelector('.info-icon');
      var popover = wrap.querySelector('.info-popover');
      if (!btn || !popover || !portal) return;
      var show = function () {
        portal.innerHTML = popover.innerHTML;
        portal.setAttribute('aria-hidden', 'false');
        var closeBtn = portal.querySelector('.info-popover-close');
        if (closeBtn) {
          closeBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            hideInfoPopover();
          });
        }
        positionPopover(btn, portal);
        portal.classList.add('visible');
      };
      var toggle = function () {
        if (portal.classList.contains('visible')) hideInfoPopover();
        else show();
      };
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggle();
      });
      if (hoverCapable) {
        wrap.addEventListener('mouseenter', show);
        wrap.addEventListener('mouseleave', hideInfoPopover);
      }
    });
    if (!document._infoPopoverOutsideClick) {
      document._infoPopoverOutsideClick = true;
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.info-trigger-wrap') && !e.target.closest('#infoPopoverPortal')) {
          hideInfoPopover();
        }
      });
    }
  }

  function render() {
    var thead = document.getElementById('tableHead');
    var tbody = document.getElementById('tableBody');
    if (thead) thead.innerHTML = buildTableHeader();
    if (tbody) tbody.innerHTML = buildTableBody();
    measureAndSizeColumns();
    updateStickyWidths();
    syncHeaderScroll();
    bindInfoPopovers();
    bindFilterTriggers();
    bindSelectAll();
  }

  function setupGlobalKeyboard() {
    if (document._tableGlobalKeyboard) return;
    document._tableGlobalKeyboard = true;
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var panel = document.getElementById('filterPanel');
      if (panel && panel.classList.contains('visible')) {
        closeFilterPanel(_filterPanelTrigger);
        e.preventDefault();
        return;
      }
      hideInfoPopover();
    });
  }

  var _queryInputsBound = false;

  function rebuildFromQuery() {
    if (typeof window.rebuildTable === 'function') window.rebuildTable();
  }

  function bindQueryInputs() {
    if (_queryInputsBound) return;
    var genderGroup = document.getElementById('queryGender');
    var amountInput = document.getElementById('queryLoanAmount');
    var securityGroup = document.getElementById('querySecurity');
    var levelSelect = document.getElementById('queryLevel');
    var countrySelect = document.getElementById('queryCountry');
    var universitySelect = document.getElementById('queryUniversity');
    if (!genderGroup || !amountInput) return;
    _queryInputsBound = true;
    var genderBtns = genderGroup.querySelectorAll('.query-btn[data-gender]');
    genderBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var g = btn.getAttribute('data-gender');
        var current = tableState.query.gender;
        tableState.query.gender = (current === g) ? null : g;
        genderBtns.forEach(function (b) {
          b.setAttribute('aria-pressed', b.getAttribute('data-gender') === tableState.query.gender ? 'true' : 'false');
        });
        rebuildFromQuery();
      });
    });
    amountInput.addEventListener('input', function () {
      tableState.query.loanAmount = parseLoanAmount(amountInput.value);
      rebuildFromQuery();
    });
    amountInput.addEventListener('change', function () {
      tableState.query.loanAmount = parseLoanAmount(amountInput.value);
      rebuildFromQuery();
    });
    if (securityGroup) {
      var secBtns = securityGroup.querySelectorAll('.query-btn[data-security]');
      secBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var s = btn.getAttribute('data-security');
          var current = tableState.query.security;
          tableState.query.security = (current === s) ? null : s;
          secBtns.forEach(function (b) {
            b.setAttribute('aria-pressed', b.getAttribute('data-security') === tableState.query.security ? 'true' : 'false');
          });
          rebuildFromQuery();
        });
      });
    }
    if (levelSelect) {
      levelSelect.addEventListener('change', function () {
        tableState.query.levelOfStudy = levelSelect.value || null;
        rebuildFromQuery();
      });
    }
    if (countrySelect) {
      countrySelect.addEventListener('change', function () {
        tableState.query.country = countrySelect.value || null;
        tableState.query.university = null;
        populateUniversityOptions(countrySelect.value);
        if (universitySelect) universitySelect.value = '';
        rebuildFromQuery();
      });
    }
    if (universitySelect) {
      universitySelect.addEventListener('change', function () {
        tableState.query.university = universitySelect.value || null;
        rebuildFromQuery();
      });
    }
  }

  function populateUniversityOptions(country) {
    var sel = document.getElementById('queryUniversity');
    if (!sel) return;
    var inst = window.INSTITUTES;
    sel.innerHTML = '<option value="">Select university</option>';
    if (!inst || !Array.isArray(inst)) return;
    var list = [];
    var seen = {};
    for (var i = 0; i < inst.length; i++) {
      var e = inst[i];
      if (country && e.country !== country) continue;
      if (e.university && !seen[e.university]) {
        seen[e.university] = true;
        list.push(e.university);
      }
    }
    list.sort();
    list.forEach(function (u) {
      var opt = document.createElement('option');
      opt.value = u;
      opt.textContent = u;
      sel.appendChild(opt);
    });
  }

  function populateQueryDropdowns() {
    var levelSelect = document.getElementById('queryLevel');
    var countrySelect = document.getElementById('queryCountry');
    var offers = window.LOAN_OFFERS;
    var inst = window.INSTITUTES;
    if (levelSelect && offers && Array.isArray(offers)) {
      var levelSet = {};
      offers.forEach(function (row) {
        var l = (row.levelOfStudy || '').trim();
        if (l) levelSet[l] = true;
      });
      var levels = Object.keys(levelSet).sort();
      levelSelect.innerHTML = '<option value="">Any</option>';
      levels.forEach(function (l) {
        var opt = document.createElement('option');
        opt.value = l;
        opt.textContent = l.length > 50 ? l.substring(0, 47) + '...' : l;
        levelSelect.appendChild(opt);
      });
    }
    if (countrySelect && inst && Array.isArray(inst)) {
      var countrySet = {};
      inst.forEach(function (e) {
        var c = (e.country || '').trim();
        if (c) countrySet[c] = true;
      });
      var countries = Object.keys(countrySet).sort();
      countrySelect.innerHTML = '<option value="">Select country</option>';
      countries.forEach(function (c) {
        var opt = document.createElement('option');
        opt.value = c;
        opt.textContent = c;
        countrySelect.appendChild(opt);
      });
      populateUniversityOptions(null);
    }
  }

  function init() {
    render();
    bindQueryInputs();
    setupGlobalKeyboard();
    if (typeof window !== 'undefined' && window.ResizeObserver) {
      var tableBody = document.getElementById('comparisonTableBody');
      if (tableBody) {
        var resizeTimeout;
        var ro = new ResizeObserver(function () {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(function () {
            updateStickyWidths();
          }, 80);
        });
        ro.observe(tableBody);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  if (typeof window !== 'undefined') {
    window.renderTableBody = function () {
      var tbody = document.getElementById('tableBody');
      if (tbody) tbody.innerHTML = buildTableBody();
      measureAndSizeColumns();
      updateStickyWidths();
      if (typeof window.updateSelectAllCheckboxState === 'function') window.updateSelectAllCheckboxState();
    };
    window.rebuildTable = function () {
      render();
    };
    window.populateQueryDropdowns = populateQueryDropdowns;
  }
})();
