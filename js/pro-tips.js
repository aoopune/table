(function () {
  'use strict';

  var container = document.getElementById('protips-container');

  function get(r, key) {
    var lower = key.toLowerCase();
    var k = Object.keys(r || {}).find(function (x) { return x.toLowerCase() === lower; });
    return k ? r[k] : (r[key] || '');
  }
  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s == null ? '' : s;
    return d.innerHTML;
  }
  function escAndBold(s) {
    if (s == null || s === '') return '';
    var str = String(s);
    var parts = str.split(/\*\*/);
    if (parts.length <= 1) return esc(str);
    var out = '';
    for (var i = 0; i < parts.length; i++) {
      out += i % 2 === 1 ? '<strong>' + esc(parts[i]) + '</strong>' : esc(parts[i]);
    }
    return out;
  }
  function parseLinksAndBold(text) {
    if (text == null || String(text).trim() === '') return '';
    var s = String(text).trim();
    var linkRegex = /\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g;
    var parts = [];
    var lastIndex = 0;
    var match;
    while ((match = linkRegex.exec(s)) !== null) {
        if (match.index > lastIndex) parts.push({ type: 'text', value: s.slice(lastIndex, match.index) });
        parts.push({ type: 'link', text: match[1], url: match[2] });
        lastIndex = match.index + match[0].length;
    }
    if (lastIndex < s.length) parts.push({ type: 'text', value: s.slice(lastIndex) });
    var out = '';
    parts.forEach(function (p) {
      if (p.type === 'link') out += '<a href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer">' + esc(p.text) + '</a>';
      else out += escAndBold(p.value);
    });
    return out;
  }
  function cellHtml(val) {
    if (val == null || String(val).trim() === '') return '';
    var s = String(val).replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
    var parts = s.split(/\n/);
    var bits = [];
    parts.forEach(function (p) {
      var t = p.trim();
      if (t) bits.push(escAndBold(t));
    });
    return bits.length > 0 ? bits.join('<br>') : escAndBold(s);
  }

  function flushBullets(html, bullets) {
    if (bullets.length === 0) return html;
    html += '<ul class="protips-bullets">';
    bullets.forEach(function (text) {
      html += '<li class="protips-bullet">' + parseLinksAndBold(text) + '</li>';
    });
    html += '</ul>';
    return html;
  }

  function render(rows) {
    if (!rows || rows.length === 0) {
      container.innerHTML = '<p class="text-secondary">No data yet. Use sheet Pro-Tips_Before_You_Apply with columns: section_heading, sub_heading, block_type, content. See PRO_TIPS_SHEET_STEPS.md.</p>';
      return;
    }
    var html = '';
    var currentTable = null;
    var sectionOpen = false;
    var currentBullets = [];
    var i = 0;
    while (i < rows.length) {
      var r = rows[i];
      var sectionHeading = get(r, 'section_heading');
      var subHeading = get(r, 'sub_heading') || get(r, 'sub-heading');
      var blockType = (get(r, 'block_type') || '').toLowerCase().trim();
      var content = get(r, 'content');

      if (!blockType && subHeading && subHeading.toLowerCase().trim() === 'heading') blockType = 'heading';

      if (sectionHeading && sectionHeading.trim() && (blockType === 'heading' || (!blockType && !content))) {
        if (currentTable) {
          html += currentTable + '</tbody></table></div>';
          currentTable = null;
        }
        html = flushBullets(html, currentBullets);
        currentBullets = [];
        if (sectionOpen) html += '</div>';
        sectionOpen = true;
        html += '<div class="protips-section">';
        html += '<h2 class="protips-section-title">' + esc(sectionHeading.trim()) + '</h2>';
        if (content && content.trim()) {
          html += '<p class="protips-section-intro">' + parseLinksAndBold(content) + '</p>';
        }
        i++;
        continue;
      }

      if (blockType === 'sub' && subHeading && subHeading.trim()) {
        if (currentTable) {
          html += currentTable + '</tbody></table></div>';
          currentTable = null;
        }
        html = flushBullets(html, currentBullets);
        currentBullets = [];
        html += '<h3 class="protips-sub-title">' + esc(subHeading.trim()) + '</h3>';
        i++;
        continue;
      }

      if (blockType === 'table_header') {
        if (currentTable) html += currentTable;
        html = flushBullets(html, currentBullets);
        currentBullets = [];
        var headers = (content || '').split(/\|/).map(function (c) { return c.trim(); });
        currentTable = '<div class="protips-table-wrapper table-scroll-wrapper" role="region" aria-label="Table"><table class="data-table pro-tips-table" data-testid="pro-tips-table"><thead><tr>';
        headers.forEach(function (h) { currentTable += '<th>' + esc(h) + '</th>'; });
        currentTable += '</tr></thead><tbody>';
      } else if (blockType === 'table_row' && currentTable !== null) {
        var cells = (content || '').split(/\|/).map(function (c) { return c.trim(); });
        currentTable += '<tr>';
        cells.forEach(function (c) { currentTable += '<td>' + cellHtml(c) + '</td>'; });
        currentTable += '</tr>';
      } else if (blockType === 'bullet' && content) {
        if (currentTable) {
          html += currentTable + '</tbody></table></div>';
          currentTable = null;
        }
        currentBullets.push(content.trim());
      } else if (blockType === 'paragraph' || (blockType === '' && content && content.trim() && !subHeading)) {
        if (currentTable) {
          html += currentTable + '</tbody></table></div>';
          currentTable = null;
        }
        html = flushBullets(html, currentBullets);
        currentBullets = [];
        var para = parseLinksAndBold(content);
        if (para) html += '<p class="protips-para">' + para + '</p>';
      }
      i++;
    }
    if (currentTable) html += currentTable + '</tbody></table></div>';
    html = flushBullets(html, currentBullets);
    if (sectionOpen) html += '</div>';

    container.innerHTML = html || '<p class="text-secondary">No content.</p>';
  }

  function showError() {
    container.innerHTML = '<p class="text-secondary">Data temporarily unavailable. Check that the sheet tab is named Pro-Tips_Before_You_Apply (or Pro-Tips Before You Apply) and sharing is Anyone with the link.</p>';
  }

  window.fetchSheet('Pro-Tips_Before_You_Apply').then(render).catch(function () {
    window.fetchSheet('Pro-Tips Before You Apply', false).then(render).catch(showError);
  });
})();
