(function () {
  'use strict';

  var MISSION_TEXT = 'Our mission is to help people understand and use banking effortlessly.';

  function get(r, key) {
    var lower = key.toLowerCase();
    var k = Object.keys(r || {}).find(function (x) { return x.toLowerCase() === lower; });
    return k ? r[k] : (r[key] || '');
  }

  window.fetchSheet('About_Us').then(function (rows) {
    var container = document.getElementById('about-container');
    if (!rows || rows.length === 0) {
      container.innerHTML = '<p class="text-secondary">Content will appear here.</p>';
      return;
    }
    function esc(s) {
      var d = document.createElement('div');
      d.textContent = s;
      return d.innerHTML;
    }
    function escAndBold(s) {
      var parts = String(s).split(/\*\*/);
      if (parts.length <= 1) return esc(s);
      var out = '';
      for (var i = 0; i < parts.length; i++) {
        out += i % 2 === 1 ? '<strong>' + esc(parts[i]) + '</strong>' : esc(parts[i]);
      }
      return out;
    }
    function contentToParagraphs(text) {
      if (!text || !String(text).trim()) return '';
      var s = String(text).replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
      var paragraphs = s.split(/\n\n+/);
      var out = '';
      paragraphs.forEach(function (block) {
        var lines = block.split(/\n/);
        var bits = [];
        lines.forEach(function (line) {
          var t = line.trim();
          if (t) bits.push(escAndBold(t));
        });
        if (bits.length > 0) out += '<p class="about-block">' + bits.join('<br>') + '</p>';
      });
      return out || '<p class="about-block">' + escAndBold(s) + '</p>';
    }
    var html = '';
    rows.forEach(function (r) {
      var heading = get(r, 'heading');
      var content = get(r, 'content');
      var section = get(r, 'section');
      if (!heading && !content) return;
      var contentTrimmed = content ? String(content).trim() : '';
      if (contentTrimmed === MISSION_TEXT) return;
      if (heading) html += '<h2 class="about-heading">' + esc(heading) + '</h2>';
      if (content) html += '<div class="card about-card">' + contentToParagraphs(content) + '</div>';
    });
    container.innerHTML = html || '<p class="text-secondary">Content will appear here.</p>';
  }).catch(function () {
    window.fetchSheet('About Us', false).then(function (rows) {
      var container = document.getElementById('about-container');
      if (!rows || rows.length === 0) {
        container.innerHTML = '<p class="text-secondary">Content will appear here. Check that the sheet tab is named About_Us or About Us and has heading + content columns.</p>';
        return;
      }
      var MISSION_TEXT = 'Our mission is to help people understand and use banking effortlessly.';
      function get(r, key) {
        var lower = key.toLowerCase();
        var k = Object.keys(r || {}).find(function (x) { return x.toLowerCase() === lower; });
        return k ? r[k] : (r[key] || '');
      }
      function esc(s) {
        var d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
      }
      function escAndBold(s) {
        var parts = String(s).split(/\*\*/);
        if (parts.length <= 1) return esc(s);
        var out = '';
        for (var i = 0; i < parts.length; i++) {
          out += i % 2 === 1 ? '<strong>' + esc(parts[i]) + '</strong>' : esc(parts[i]);
        }
        return out;
      }
      function contentToParagraphs(text) {
        if (!text || !String(text).trim()) return '';
        var s = String(text).replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
        var paragraphs = s.split(/\n\n+/);
        var out = '';
        paragraphs.forEach(function (block) {
          var lines = block.split(/\n/);
          var bits = [];
          lines.forEach(function (line) {
            var t = line.trim();
            if (t) bits.push(escAndBold(t));
          });
          if (bits.length > 0) out += '<p class="about-block">' + bits.join('<br>') + '</p>';
        });
        return out || '<p class="about-block">' + escAndBold(s) + '</p>';
      }
      var html = '';
      rows.forEach(function (r) {
        var heading = get(r, 'heading');
        var content = get(r, 'content');
        var contentTrimmed = content ? String(content).trim() : '';
        if (contentTrimmed === MISSION_TEXT) return;
        if (!heading && !content) return;
        if (heading) html += '<h2 class="about-heading">' + esc(heading) + '</h2>';
        if (content) html += '<div class="card about-card">' + contentToParagraphs(content) + '</div>';
      });
      container.innerHTML = html || '<p class="text-secondary">Content will appear here.</p>';
    }).catch(function () {
      document.getElementById('about-container').innerHTML = '<p class="text-secondary">Data temporarily unavailable. Check: (1) Sheet tab is named About_Us or About Us, (2) Sharing is Anyone with the link, (3) Row 1 has heading and content columns.</p>';
    });
  });
})();
