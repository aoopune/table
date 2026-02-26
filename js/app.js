(function () {
  'use strict';

  const SPREADSHEET_ID = '1eaYl0tfAiTR4AcAaBfqemsbMX8QFcX_yQZOQcD2kW7g';
  const CACHE_KEY = 'aoo_sheet_cache';
  const DEFAULT_CACHE_MINUTES = 5;

  function getCacheMinutes() {
    return (window.__aooConfig && window.__aooConfig.cache_minutes)
      ? parseInt(window.__aooConfig.cache_minutes, 10) || DEFAULT_CACHE_MINUTES
      : DEFAULT_CACHE_MINUTES;
  }

  function sheetUrl(sheetName) {
    return 'https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/gviz/tq?tqx=out:csv&sheet=' + encodeURIComponent(sheetName);
  }

  function getCached(key) {
    try {
      const raw = sessionStorage.getItem(CACHE_KEY + '_' + key);
      if (!raw) return null;
      const { data, at } = JSON.parse(raw);
      if (Date.now() - at > getCacheMinutes() * 60 * 1000) return null;
      return data;
    } catch (_) { return null; }
  }

  function setCached(key, data) {
    try {
      sessionStorage.setItem(CACHE_KEY + '_' + key, JSON.stringify({ data, at: Date.now() }));
    } catch (_) {}
  }

  function parseCSV(text) {
    const rows = [];
    let row = [];
    let cell = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"') {
        inQuotes = !inQuotes;
      } else if (inQuotes) {
        cell += c;
      } else if (c === ',') {
        row.push(cell.trim());
        cell = '';
      } else if (c === '\r' && text[i + 1] === '\n') {
        row.push(cell.trim());
        rows.push(row);
        row = [];
        cell = '';
        i++;
      } else if (c === '\n' || c === '\r') {
        row.push(cell.trim());
        rows.push(row);
        row = [];
        cell = '';
      } else {
        cell += c;
      }
    }
    if (cell !== '' || row.length > 0) {
      row.push(cell.trim());
      rows.push(row);
    }
    return rows;
  }

  function rowsToObjects(rows) {
    if (rows.length < 2) return [];
    const headers = rows[0].map(h => (h || '').trim());
    const out = [];
    for (let i = 1; i < rows.length; i++) {
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = (rows[i][j] != null ? String(rows[i][j]).trim() : '');
      }
      out.push(obj);
    }
    return out;
  }

  window.fetchSheet = function (sheetName, useCache) {
    if (useCache !== false) {
      const cached = getCached(sheetName);
      if (cached) return Promise.resolve(cached);
    }
    return fetch(sheetUrl(sheetName))
      .then(r => { if (!r.ok) throw new Error('Sheet fetch failed'); return r.text(); })
      .then(text => {
        const rows = parseCSV(text);
        const data = rowsToObjects(rows);
        setCached(sheetName, data);
        return data;
      });
  };

  window.fetchSheetRaw = function (sheetName) {
    return fetch(sheetUrl(sheetName)).then(r => r.text()).then(parseCSV);
  };

  function parseConfigRows(rows) {
    const cfg = {};
    (rows || []).forEach(r => {
      const k = (r.key || r.Key || '').trim();
      const v = (r.value != null ? r.value : r.Value);
      if (k) cfg[k] = v;
    });
    return cfg;
  }

  window.getConfig = function () {
    if (window.__aooConfig) return Promise.resolve(window.__aooConfig);
    return window.fetchSheet('Config').then(rows => {
      window.__aooConfig = parseConfigRows(rows);
      return window.__aooConfig;
    });
  };

  /* Header / Footer – same on every page. Nav: logo extreme left; links extreme right in this order. */
  const navItems = [
    { path: 'pro-tips.html', label: 'Pro tips before you apply' },
    { path: 'quick-overview.html', label: 'Quick overview' },
    { path: 'government-schemes.html', label: 'Government schemes' },
    { path: 'faq.html', label: 'FAQ' },
    { path: 'document-checklist.html', label: 'Standardised document list' },
    { path: 'about.html', label: 'About us' }
  ];

  function inPagesDir() {
    return (window.location.pathname || '').indexOf('/pages/') !== -1;
  }

  function currentPage() {
    const path = window.location.pathname || '';
    if (path.endsWith('index.html') || path.endsWith('/')) return 'index.html';
    const m = path.match(/\/([^/]+)$/);
    return m ? m[1] : path;
  }

  function navHref(path) {
    if (path === 'index.html') return inPagesDir() ? '../index.html' : 'index.html';
    return inPagesDir() ? path : 'pages/' + path;
  }

  window.renderHeaderFooter = function (cfg) {
    cfg = cfg || window.__aooConfig || {};
    const contactPhone = (cfg.contact_phone || '+91 91123 34367').trim();
    const contactEmail = (cfg.contact_email || 'applyonlyonceindia@gmail.com').trim();
    const telHref = 'tel:' + contactPhone.replace(/\s/g, '');

    const cur = currentPage();
    const header = document.getElementById('site-header');
    if (header) {
      const homeHref = navHref('index.html');
      const navLinksHtml = navItems.map(n => {
        const href = navHref(n.path);
        const isActive = (n.path === 'index.html' && cur === 'index.html') || (cur === n.path);
        const testId = 'nav-' + (n.path === 'index.html' ? 'home' : n.path.replace('.html', ''));
        return '<a href="' + href + '"' + (isActive ? ' class="active"' : '') + ' data-testid="' + testId + '">' + n.label + '</a>';
      }).join('');
      header.innerHTML =
        '<div class="site-header-inner">' +
        '<div class="site-logo"><a href="' + homeHref + '" data-testid="nav-logo">Apply Only Once</a></div>' +
        '<nav class="site-nav" aria-label="Main">' + navLinksHtml + '</nav>' +
        '<button type="button" class="nav-hamburger" aria-label="Open menu" aria-expanded="false" data-testid="nav-hamburger">' +
        '<span class="nav-hamburger-bar"></span><span class="nav-hamburger-bar"></span><span class="nav-hamburger-bar"></span></button>' +
        '</div>' +
        '<div class="nav-drawer-overlay" id="nav-drawer-overlay" aria-hidden="true"></div>' +
        '<div class="nav-drawer" id="nav-drawer" aria-label="Navigation menu">' +
        '<nav class="nav-drawer-nav" aria-label="Main">' + navLinksHtml + '</nav></div>';
      (function () {
        var hamburger = header.querySelector('.nav-hamburger');
        var drawer = document.getElementById('nav-drawer');
        var overlay = document.getElementById('nav-drawer-overlay');
        function openDrawer() {
          drawer.classList.add('open');
          overlay.classList.add('open');
          hamburger.setAttribute('aria-expanded', 'true');
          overlay.setAttribute('aria-hidden', 'false');
        }
        function closeDrawer() {
          drawer.classList.remove('open');
          overlay.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          overlay.setAttribute('aria-hidden', 'true');
        }
        hamburger.addEventListener('click', function () {
          if (drawer.classList.contains('open')) closeDrawer(); else openDrawer();
        });
        overlay.addEventListener('click', closeDrawer);
        drawer.querySelectorAll('a').forEach(function (a) {
          a.addEventListener('click', closeDrawer);
        });
      })();
    }
    const footer = document.getElementById('site-footer');
    if (footer) {
      footer.innerHTML =
        '<p><strong>Let us know anything we should know by:</strong></p>' +
        '<div class="contact">' +
        'Call / WhatsApp: <a href="' + telHref + '">' + contactPhone + '</a><br>' +
        'Mail: <a href="mailto:' + contactEmail + '">' + contactEmail + '</a>' +
        '</div>';
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    window.fetchSheet('Config', false).then(rows => {
      window.__aooConfig = parseConfigRows(rows);
      window.renderHeaderFooter(window.__aooConfig);
    }).catch(function () {
      window.__aooConfig = {};
      window.renderHeaderFooter({});
    });
  });
})();
