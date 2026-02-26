(function () {
  'use strict';

  var SORT_ORDER_ROW_MARKER = 'Sort order';
  var SCHEME_NAME_KEY = 'Scheme name';

  function getVisibleKeys(keys, config) {
    var cfg = config || {};
    var hidden = keys.filter(function (k) {
      var key = 'gov_schemes.column.' + k + '.visible';
      var val = cfg[key];
      return val === false || val === 'false' || val === '0' || (typeof val === 'string' && val.toLowerCase() === 'false');
    });
    if (hidden.length > 0) return keys.filter(function (k) { return hidden.indexOf(k) === -1; });
    return keys;
  }

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function escAttr(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function linkifyBareUrls(s) {
    return s.replace(
      /(https?:\/\/[^\s<]+)/g,
      function (url) {
        return '<a href="' + escAttr(url) + '" target="_blank" rel="noopener noreferrer">Click here</a>';
      }
    );
  }

  function formatCellContent(str) {
    var out = '';
    var re = /\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/g;
    var lastIndex = 0;
    var m;
    while ((m = re.exec(str)) !== null) {
      out += linkifyBareUrls(esc(str.slice(lastIndex, m.index)));
      out += '<a href="' + escAttr(m[2]) + '" target="_blank" rel="noopener noreferrer">' + esc(m[1] || 'Click here') + '</a>';
      lastIndex = re.lastIndex;
    }
    out += linkifyBareUrls(esc(str.slice(lastIndex)));
    return out;
  }

  function formatCell(val, key) {
    if (val == null || val === '') return '—';
    var str = String(val).trim();
    var parts = str.split(/\n+/).map(function (p) { return p.trim(); }).filter(Boolean);
    if (parts.length === 0) return '—';
    if (parts.length === 1) return formatCellContent(parts[0]);
    var listHtml = '<ul class="gov-schemes-cell-points">';
    parts.forEach(function (p) {
      listHtml += '<li class="gov-schemes-cell-point">' + formatCellContent(p) + '</li>';
    });
    listHtml += '</ul>';
    return listHtml;
  }

  function buildRowsFromRaw(rawRows) {
    if (!rawRows || rawRows.length < 2) return { headers: [], rows: [] };
    var headerCells = rawRows[0];
    var headers = [];
    for (var j = 0; j < headerCells.length; j++) {
      var h = (headerCells[j] != null ? String(headerCells[j]) : '').trim();
      if (h === '') h = 'Column_' + (j + 1);
      if (h !== 'B') headers.push(h);
    }
    var rows = [];
    for (var i = 1; i < rawRows.length; i++) {
      var obj = {};
      for (var k = 0; k < headerCells.length; k++) {
        var head = (headerCells[k] != null ? String(headerCells[k]) : '').trim();
        if (head === '') head = 'Column_' + (k + 1);
        if (head !== 'B') obj[head] = rawRows[i][k] != null ? String(rawRows[i][k]).trim() : '';
      }
      rows.push(obj);
    }
    return { headers: headers, rows: rows };
  }

  function isSortOrderRow(row, firstKey) {
    var val = row[firstKey];
    return val != null && String(val).trim().toLowerCase() === SORT_ORDER_ROW_MARKER.toLowerCase();
  }

  function sortKeysByOrderRow(keys, orderRow) {
    if (!orderRow || keys.length === 0) return keys.slice();
    var orderMap = {};
    for (var i = 0; i < keys.length; i++) {
      var v = orderRow[keys[i]];
      var num = v != null && v !== '' ? parseInt(String(v).trim(), 10) : NaN;
      orderMap[keys[i]] = (num >= 1 && num <= 9999) ? num : 9999 + i;
    }
    return keys.slice().sort(function (a, b) {
      return (orderMap[a] || 9999) - (orderMap[b] || 9999);
    });
  }

  var fetchPromise = window.fetchSheetRaw
    ? window.fetchSheetRaw('Government_Schemes')
    : window.fetchSheet('Government_Schemes').then(function (rows) {
        if (!rows || rows.length === 0) return [];
        var keys = Object.keys(rows[0] || {}).filter(function (k) { return k && k !== 'B'; });
        return [keys].concat(rows.map(function (r) { return keys.map(function (k) { return r[k] != null ? String(r[k]).trim() : ''; }); }));
      });

  Promise.all([
    fetchPromise,
    window.getConfig ? window.getConfig() : Promise.resolve({})
  ]).then(function (results) {
    var rawRows = results[0] || [];
    var config = results[1] || {};
    var container = document.getElementById('gov-container');
    var built = (rawRows.length > 0 && Array.isArray(rawRows[0])) ? buildRowsFromRaw(rawRows) : { headers: [], rows: [] };
    var rows = built.rows;
    var allKeys = built.headers.length > 0 ? built.headers : (rows[0] ? Object.keys(rows[0]).filter(function (k) { return k && k !== 'B'; }) : []);
    if (!rows || rows.length === 0 || allKeys.length === 0) {
      container.innerHTML = '<p class="text-secondary">No schemes available.</p>';
      return;
    }
    var firstKey = allKeys[0];
    var schemeNameKey = allKeys.indexOf(SCHEME_NAME_KEY) >= 0 ? SCHEME_NAME_KEY : firstKey;
    var sortOrderRow = null;
    var dataRows = [];
    for (var r = 0; r < rows.length; r++) {
      if (isSortOrderRow(rows[r], firstKey)) sortOrderRow = rows[r];
      else if (allKeys.some(function (k) { var v = rows[r][k]; return v != null && v !== ''; })) dataRows.push(rows[r]);
    }
    var visibleKeys = getVisibleKeys(allKeys, config);
    if (visibleKeys.length === 0) visibleKeys = allKeys.slice();
    visibleKeys = sortKeysByOrderRow(visibleKeys, sortOrderRow);
    var bodyKeys = visibleKeys.filter(function (k) { return k !== SCHEME_NAME_KEY; });

    var tableHtml = '<div class="gov-schemes-table-wrap" role="region" aria-label="Government schemes table"><table class="gov-schemes-table"><thead><tr>';
    tableHtml += '<th scope="col" class="gov-schemes-th gov-schemes-sticky-col gov-schemes-sticky-corner">Particulars</th>';
    dataRows.forEach(function (r) {
      var name = r[schemeNameKey];
      tableHtml += '<th scope="col" class="gov-schemes-th">' + esc(name != null && name !== '' ? String(name) : '—') + '</th>';
    });
    tableHtml += '</tr></thead><tbody>';
    bodyKeys.forEach(function (key) {
      tableHtml += '<tr><th scope="row" class="gov-schemes-th gov-schemes-sticky-col">' + esc(key) + '</th>';
      dataRows.forEach(function (r) {
        var v = r[key];
        tableHtml += '<td class="gov-schemes-td">' + formatCell(v, key) + '</td>';
      });
      tableHtml += '</tr>';
    });
    tableHtml += '</tbody></table></div>';
    container.innerHTML = tableHtml;
    var wrap = container.querySelector('.gov-schemes-table-wrap');
    if (wrap && dataRows.length > 0) wrap.style.setProperty('--gov-cols', String(dataRows.length));
  }).catch(function () {
    document.getElementById('gov-container').innerHTML = '<p class="text-secondary">Data temporarily unavailable. Please try again.</p><button type="button" class="btn btn-primary" onclick="location.reload()">Retry</button>';
  });
})();
