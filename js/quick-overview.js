(function () {
  'use strict';

  var container = document.getElementById('overview-container');
  function render(rows) {
    if (!rows || rows.length === 0) {
      container.innerHTML = '<p class="text-secondary">No content available.</p>';
      return;
    }
    function esc(s) {
      var d = document.createElement('div');
      d.textContent = s;
      return d.innerHTML;
    }
    function contentToListItems(text) {
      if (!text || !String(text).trim()) return '';
      var s = String(text).trim();
      var parts = s.split(/\n+/);
      var out = '';
      parts.forEach(function (p) {
        var t = p.trim();
        if (t) out += '<li class="overview-point">' + esc(t) + '</li>';
      });
      return out ? '<ul class="overview-points">' + out + '</ul>' : '';
    }
    function get(r, key) {
      var lower = key.toLowerCase();
      var k = Object.keys(r || {}).find(function (x) { return x.toLowerCase() === lower; });
      return k ? r[k] : (r[key] || '');
    }
    var list = (rows || []).filter(function (r) { return get(r, 'section'); });
    if (list.length === 0) {
      container.innerHTML = '<p class="text-secondary">No sections available.</p>';
      return;
    }
    list.sort(function (a, b) {
      var na = parseInt(get(a, 'sort_order'), 10) || 0;
      var nb = parseInt(get(b, 'sort_order'), 10) || 0;
      return na - nb;
    });
    var html = '<div class="overview-flow">';
    list.forEach(function (r) {
      var sectionTitle = get(r, 'section');
      var subtitle = get(r, 'subtitle');
      var content = get(r, 'content');
      html += '<section class="overview-flow-step">';
      html += '<div class="overview-flow-head">';
      html += '<span class="overview-flow-marker" aria-hidden="true"></span>';
      if (sectionTitle) html += '<h2 class="overview-section-title">' + esc(sectionTitle) + '</h2>';
      html += '</div>';
      html += '<div class="overview-flow-body">';
      if (subtitle) html += '<p class="overview-subtitle">' + esc(subtitle) + '</p>';
      if (content) html += '<div class="card overview-section-card">' + contentToListItems(content) + '</div>';
      html += '</div></section>';
    });
    html += '</div>';
    container.innerHTML = html;
  }
  function showError() {
    container.innerHTML = '<p class="text-secondary">Data temporarily unavailable. Please try again.</p><button type="button" class="btn btn-primary" onclick="location.reload()">Retry</button>';
  }
  // Try Quick_Overview first (underscore), then Quick Overview (space) – tab name in Sheets may be either
  window.fetchSheet('Quick_Overview').then(render).catch(function () {
    window.fetchSheet('Quick Overview', false).then(render).catch(showError);
  });

  // Roadmap (right column) – from Roadmap sheet
  var roadmapContainer = document.getElementById('roadmap-container');
  if (roadmapContainer) {
    function esc(s) {
      var d = document.createElement('div');
      d.textContent = s;
      return d.innerHTML;
    }
    function get(r, key) {
      var lower = key.toLowerCase();
      var k = Object.keys(r || {}).find(function (x) { return x.toLowerCase() === lower; });
      return k ? r[k] : (r[key] || '');
    }
    function renderRoadmap(rows) {
      var list = (rows || []).filter(function (r) {
        return get(r, 'heading') || get(r, 'description');
      });
      if (list.length === 0) {
        roadmapContainer.innerHTML = '<p class="text-secondary">No roadmap data available.</p>';
        return;
      }
      list.sort(function (a, b) {
        var na = parseInt(get(a, 'sort_order'), 10) || 0;
        var nb = parseInt(get(b, 'sort_order'), 10) || 0;
        return na - nb;
      });
      var html = '<ol class="roadmap-timeline">';
      list.forEach(function (r) {
        var heading = get(r, 'heading');
        var time = get(r, 'time');
        var description = get(r, 'description');
        html += '<li class="roadmap-step">';
        html += '<span class="roadmap-marker" aria-hidden="true"></span>';
        html += '<div class="roadmap-step-content">';
        html += '<h3 class="roadmap-step-heading">' + esc(heading);
        if (time) html += ' <span class="roadmap-time">(' + esc(time) + ')</span>';
        html += '</h3>';
        if (description) html += '<p class="roadmap-step-desc">' + esc(description) + '</p>';
        html += '</div></li>';
      });
      html += '</ol>';
      roadmapContainer.innerHTML = html;
    }
    function showRoadmapError() {
      roadmapContainer.innerHTML = '<p class="text-secondary">Roadmap data temporarily unavailable.</p>';
    }
    window.fetchSheet('Roadmap').then(renderRoadmap).catch(function () {
      window.fetchSheet('Quick_Overview_Roadmap', false).then(renderRoadmap).catch(showRoadmapError);
    });
  }
})();
