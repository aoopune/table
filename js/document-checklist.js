(function () {
  'use strict';

  window.fetchSheet('Document_Checklist').then(function (rows) {
    var container = document.getElementById('doc-container');
    if (!rows || rows.length === 0) {
      container.innerHTML = '<p class="text-secondary">No document list available.</p>';
      return;
    }
    function esc(s) {
      var d = document.createElement('div');
      d.textContent = s;
      return d.innerHTML;
    }
    function get(r, key) {
      var k = key.toLowerCase();
      var v = r[key] != null ? r[key] : r[k];
      if (v != null) return String(v).trim();
      var keys = Object.keys(r);
      for (var i = 0; i < keys.length; i++) {
        if (keys[i].toLowerCase() === k) return String(r[keys[i]]).trim();
      }
      return '';
    }
    var byCat = {};
    var orderedCats = [];
    var orderedSubcats = {};
    var headingNote = {};
    rows.forEach(function (r) {
      var cat = get(r, 'category') || get(r, 'Category') || '';
      if (!cat) return;
      var sub = get(r, 'subcategory') || get(r, 'Subcategory') || '';
      var item = get(r, 'item') || get(r, 'Item') || '';
      var mand = get(r, 'mandatory') || get(r, 'Mandatory') || '';
      var note = get(r, 'heading_note') || get(r, 'Heading note') || '';
      if (!byCat[cat]) {
        byCat[cat] = {};
        orderedCats.push(cat);
        if (note) headingNote[cat] = note;
      }
      if (!orderedSubcats[cat]) orderedSubcats[cat] = [];
      if (orderedSubcats[cat].indexOf(sub) === -1) orderedSubcats[cat].push(sub);
      if (!byCat[cat][sub]) byCat[cat][sub] = [];
      if (item) byCat[cat][sub].push({ item: item, mandatory: mand });
    });
    var html = '<div class="doc-accordion-list" data-testid="doc-accordion-list">';
    orderedCats.forEach(function (cat) {
      var subcats = orderedSubcats[cat].length ? orderedSubcats[cat] : [''];
      html += '<details class="doc-section-accordion doc-section" data-testid="doc-section-accordion">';
      html += '<summary class="doc-section-header doc-section-summary">' + esc(cat);
      if (headingNote[cat]) html += ' <span class="doc-heading-note">' + esc(headingNote[cat]) + '</span>';
      html += '</summary>';
      html += '<div class="doc-section-content">';
      subcats.forEach(function (sub) {
        var entries = byCat[cat][sub] || [];
        html += '<details class="doc-accordion" data-testid="doc-accordion">';
        html += '<summary class="doc-accordion-summary">' + esc(sub || 'Documents') + '</summary>';
        html += '<div class="doc-accordion-content"><ul class="doc-item-list">';
        entries.forEach(function (entry) {
          html += '<li class="doc-item">';
          html += '<span class="doc-item-name">' + esc(entry.item) + '</span>';
          if (entry.mandatory) html += ' <span class="doc-item-mandatory">' + esc(entry.mandatory) + '</span>';
          html += '</li>';
        });
        html += '</ul></div></details>';
      });
      html += '</div></details>';
    });
    html += '</div>';
    container.innerHTML = html;
  }).catch(function () {
    document.getElementById('doc-container').innerHTML = '<p class="text-secondary">Data temporarily unavailable. Please try again.</p><button type="button" class="btn btn-primary" onclick="location.reload()">Retry</button>';
  });
})();
