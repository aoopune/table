(function () {
  'use strict';

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function getVisibleColumns(keys, config) {
    var cfg = config || {};
    if (cfg['qhei.visible_columns']) {
      var list = (cfg['qhei.visible_columns'] || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
      if (list.length) return list.filter(function (k) { return keys.indexOf(k) !== -1; });
    }
    var fromConfig = keys.filter(function (k) {
      var key = 'qhei.column.' + k + '.visible';
      var val = cfg[key];
      return val === true || val === 'true' || val === '1' || (typeof val === 'string' && val.toLowerCase() === 'true');
    });
    if (fromConfig.length > 0) return fromConfig;
    return keys;
  }

  function makeSortable(table) {
    var thead = table.querySelector('thead tr');
    if (!thead) return;
    var headers = thead.querySelectorAll('th');
    headers.forEach(function (th, colIdx) {
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

  Promise.all([
    window.fetchSheet('PM_Vidyalaxmi'),
    window.fetchSheet('PM_Vidyalaxmi_QHEI'),
    window.getConfig ? window.getConfig() : Promise.resolve({})
  ]).then(function (results) {
    var scheme = results[0] || [];
    var qhei = results[1] || [];
    var config = results[2] || {};

    var schemeHtml = '';
    var bySection = {};
    scheme.forEach(function (r) {
      var sec = (r.section || r.Section || '').trim() || 'Scheme';
      if (!bySection[sec]) bySection[sec] = [];
      bySection[sec].push(r);
    });
    Object.keys(bySection).forEach(function (sec) {
      var rows = bySection[sec].filter(function (r) {
        var key = (r.key || r.Key || '').trim();
        var val = r.value != null ? String(r.value).trim() : (r.Value != null ? String(r.Value).trim() : '');
        return key || val;
      });
      if (rows.length === 0) return;
      schemeHtml += '<div class="card mb-2"><h3>' + esc(sec) + '</h3>';
      rows.forEach(function (r) {
        var key = (r.key || r.Key || '').trim();
        var val = r.value != null ? r.value : (r.Value != null ? r.Value : '');
        var extra = (r.extra || r.Extra || '').trim();
        if (!key && !val) return;
        schemeHtml += '<p><strong>' + esc(key || '—') + '</strong>: ' + esc(String(val));
        if (extra) schemeHtml += ' <span class="text-secondary">' + esc(extra) + '</span>';
        schemeHtml += '</p>';
      });
      schemeHtml += '</div>';
    });
    document.getElementById('scheme-content').innerHTML = schemeHtml || '<p class="text-secondary">No scheme content available.</p>';

    if (qhei.length === 0) {
      document.getElementById('qhei-container').innerHTML = '<h2>QHEI table (colleges)</h2><p class="text-secondary">No data.</p>';
      return;
    }
    var keys = Object.keys(qhei[0]);
    var cols = getVisibleColumns(keys, config);
    var qheiHtml = '<div class="table-scroll-wrapper"><div class="table-scroll-inner"><table class="data-table sortable-table" data-testid="qhei-table"><thead><tr>';
    cols.forEach(function (k) {
      qheiHtml += '<th data-sortable>' + esc(k) + '</th>';
    });
    qheiHtml += '</tr></thead><tbody>';
    qhei.forEach(function (row) {
      qheiHtml += '<tr>';
      cols.forEach(function (k) {
        qheiHtml += '<td>' + esc((row[k] != null ? String(row[k]) : '')) + '</td>';
      });
      qheiHtml += '</tr>';
    });
    qheiHtml += '</tbody></table></div></div>';
    qheiHtml += '<p class="text-secondary">Showing ' + qhei.length + ' rows.</p>';
    document.getElementById('qhei-container').innerHTML = '<h2>QHEI table (colleges)</h2>' + qheiHtml;
    makeSortable(document.querySelector('#qhei-container .sortable-table'));
  }).catch(function () {
    document.getElementById('scheme-content').innerHTML = '<p class="text-secondary">Data temporarily unavailable. Please try again.</p><button type="button" class="btn btn-primary" onclick="location.reload()">Retry</button>';
    document.getElementById('qhei-container').innerHTML = '';
  });
})();
