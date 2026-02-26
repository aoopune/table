(function () {
  'use strict';

  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  Promise.all([window.fetchSheet('FAQ'), window.getConfig ? window.getConfig() : Promise.resolve({})]).then(function (results) {
    var rows = results[0];
    var config = results[1] || {};
    var expandDefault = (config['faq.expand_default'] !== 'false' && config['faq.expand_default'] !== '0');
    var container = document.getElementById('faq-container');
    if (!rows || rows.length === 0) {
      container.innerHTML = '<p class="text-secondary">No FAQ available.</p>';
      return;
    }
    var byCategory = {};
    rows.forEach(function (r) {
      var cat = (r.category || 'General').trim();
      if (!byCategory[cat]) byCategory[cat] = [];
      byCategory[cat].push(r);
    });
    var html = '<div class="faq-accordion">';
    Object.keys(byCategory).sort().forEach(function (cat) {
      html += '<div class="faq-item">';
      html += '<button type="button" class="accordion-header" data-testid="faq-category" aria-expanded="' + expandDefault + '">' + escapeHtml(cat) + ' <span class="icon" aria-hidden="true">▼</span></button>';
      html += '<div class="accordion-body"' + (expandDefault ? '' : ' hidden') + '>';
      byCategory[cat].forEach(function (item) {
        html += '<div class="mb-2"><div class="faq-q">' + escapeHtml(item.question || '') + '</div><div class="faq-a">' + escapeHtml(item.answer || '') + '</div></div>';
      });
      html += '</div></div>';
    });
    html += '</div>';
    container.innerHTML = html;
    container.querySelectorAll('.accordion-header').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var body = btn.nextElementSibling;
        var open = body.hidden;
        body.hidden = !open;
        btn.setAttribute('aria-expanded', open);
      });
    });
  }).catch(function (err) {
    document.getElementById('faq-container').innerHTML = '<p class="text-secondary">Data temporarily unavailable. Please try again.</p><button type="button" class="btn btn-primary" onclick="location.reload()">Retry</button>';
  });
})();
