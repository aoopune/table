/**
 * Simple HTTP server: serves static files, /api/query for offer search,
 * and /api/sheet to proxy the public Loan data matrix Google Sheet as JSON.
 */
import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { queryOffers, getShared, queryAllBanks, validateAllBanksWithRulesEngine } from './scripts/query-offers.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const BASE_PORT = Number(process.env.PORT) || 3080;
const MAX_PORT_ATTEMPTS = 20;
const STRICT_RULES_VALIDATION = process.env.STRICT_RULES_VALIDATION !== 'false';

const BANKS_DIR = join(__dirname, 'data', 'banks');
const INSTITUTES_PATH = join(__dirname, 'data', 'institutes.json');

let institutesCache = null;

function cleanInstituteText(value) {
  if (value == null) return '';
  let text = String(value).trim();
  if (!text) return '';
  text = text.replace(/""/g, '"');
  text = text.replace(/^\s*"+/, '').replace(/"+\s*$/, '').trim();
  return text;
}

function normalizeInstituteRow(row) {
  if (!row || typeof row !== 'object') return row;
  const normalized = { ...row };
  const lenderName = cleanInstituteText(row.lenderName);
  let university = row.university != null ? String(row.university).trim() : '';
  let country = row.country != null ? String(row.country).trim() : '';
  const criteria = row.criteria != null ? String(row.criteria).trim() : '';
  const hasSplitUniversity = /^\s*"/.test(university) && /"\s*$/.test(country);
  if (hasSplitUniversity) {
    const left = cleanInstituteText(university);
    const right = cleanInstituteText(country);
    university = [left, right].filter(Boolean).join(', ');
    country = cleanInstituteText(criteria) || right;
  } else {
    university = cleanInstituteText(university);
    country = cleanInstituteText(country);
  }
  normalized.lenderName = lenderName;
  normalized.university = university;
  normalized.country = country;
  normalized.criteria = cleanInstituteText(criteria);
  normalized.course = cleanInstituteText(row.course);
  return normalized;
}

function getInstitutes() {
  if (institutesCache) return institutesCache;
  if (!existsSync(INSTITUTES_PATH)) return [];
  try {
    const raw = JSON.parse(readFileSync(INSTITUTES_PATH, 'utf8'));
    institutesCache = Array.isArray(raw) ? raw.map(normalizeInstituteRow) : [];
    return Array.isArray(institutesCache) ? institutesCache : [];
  } catch {
    return [];
  }
}

function normalizeUniversityText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function universityTextMatches(queryText, candidateText) {
  const query = normalizeUniversityText(queryText);
  const candidate = normalizeUniversityText(candidateText);
  if (!query || !candidate) return false;
  return candidate.includes(query) || query.includes(candidate);
}

function isUniversityNotInList(value) {
  return normalizeUniversityText(value) === 'not in the list';
}

function isCountryNotInList(value) {
  return normalizeUniversityText(value) === 'not in the list';
}

function normalizeCountryName(value) {
  return String(value || '').trim().toLowerCase();
}

function getOfferCountryScope(offer) {
  const scope = offer && typeof offer === 'object' ? offer.countryScope : null;
  if (!scope || typeof scope !== 'object') {
    return { mode: 'all', countries: [], label: '' };
  }
  const modeRaw = String(scope.mode || '').trim().toLowerCase();
  const mode = modeRaw === 'only' || modeRaw === 'exclude' || modeRaw === 'all' ? modeRaw : 'all';
  const countries = Array.isArray(scope.countries)
    ? scope.countries
        .map((c) => String(c || '').trim())
        .filter((c) => c.length > 0)
    : [];
  const label = scope.label != null ? String(scope.label).trim() : '';
  return { mode, countries, label };
}

function offerAppliesToCountryScope(offer, country) {
  if (!country) return true;
  if (isCountryNotInList(country)) return true;
  const scope = getOfferCountryScope(offer);
  if (scope.mode === 'all') return true;
  const countryNorm = normalizeCountryName(country);
  const listedCountries = scope.countries.map((c) => normalizeCountryName(c));
  const included = listedCountries.includes(countryNorm);
  if (scope.mode === 'only') return included;
  if (scope.mode === 'exclude') return !included;
  return true;
}

function isInstituteChangesEnabled(inst) {
  if (!inst || typeof inst !== 'object') return false;
  const value = inst.changes;
  if (value === true) return true;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    return normalized === 'true' || normalized === 'yes';
  }
  return false;
}

function offerAppliesToUniversity(row, university, institutes) {
  if (!university || !row.bankName) return true;
  const inst = row.offer?.institute;
  const changesEnabled = isInstituteChangesEnabled(inst);
  if (isUniversityNotInList(university)) return !changesEnabled;
  if (!changesEnabled) return true;
  const offerCriteria = (inst.criteria || '').trim();
  const parts = offerCriteria ? offerCriteria.split('/').map((p) => p.trim()) : [];
  for (const e of institutes) {
    if (e.lenderName !== row.bankName || !universityTextMatches(university, e.university)) continue;
    const c = (e.criteria || '').trim();
    if (parts.some((p) => p === c) || c === offerCriteria) return true;
  }
  return false;
}

function bankHasCountry(bankName, country, institutes) {
  if (!country || !bankName) return true;
  return institutes.some((e) => e.lenderName === bankName && e.country === country);
}

function normalizeLevelText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function levelTextMatches(queryText, candidateText) {
  const query = normalizeLevelText(queryText);
  const candidate = normalizeLevelText(candidateText);
  if (!query || !candidate) return false;
  return candidate.includes(query) || query.includes(candidate);
}

const LEVEL_FILTER_MAP = {
  'Any': [
    'XXXXXX',
    'Govt. approved courses',
    'Postgraduate (De / Di)',
    'Undergraduate (De / Di)',
    'Doctrate',
    'Prof. / Tech.',
    'Exec.'
  ],
  'Postgraduate (Degree / Diploma)': ['Postgraduate (De / Di)'],
  'Undergraduate (Degree / Diploma)': ['Undergraduate (De / Di)'],
  'Doctrate courses': ['Doctrate'],
  'Professional or Technical courses': ['Prof. / Tech.'],
  'Executive courses': ['Exec.']
};

function candidateHasAnyToken(candidateText, tokens) {
  const candidate = normalizeLevelText(candidateText);
  if (!candidate) return false;
  for (const token of tokens || []) {
    const normalizedToken = normalizeLevelText(token);
    if (!normalizedToken) continue;
    if (candidate.includes(normalizedToken)) return true;
  }
  return false;
}

function offerMatchesLevel(row, levelOfStudy) {
  if (!levelOfStudy) return true;
  const candidates = [];
  const offerLevel = row && row.offer && row.offer.institute && row.offer.institute.level_of_study;
  const offerCourse = row && row.offer && row.offer.course;

  if (offerLevel != null && String(offerLevel).trim() !== '') candidates.push(String(offerLevel));
  if (offerCourse != null && String(offerCourse).trim() !== '') candidates.push(String(offerCourse));

  const tokens = LEVEL_FILTER_MAP[levelOfStudy] || [levelOfStudy];
  if (!candidates.length) {
    return levelOfStudy === 'Any';
  }
  return candidates.some((candidate) => candidateHasAnyToken(candidate, tokens));
}

function getSharedFromFile(bankSlug) {
  const slug = (bankSlug && String(bankSlug).trim()) || 'punjab-national-bank';
  const bankPath = join(BANKS_DIR, slug + '.json');
  if (!existsSync(bankPath)) throw new Error('Bank JSON not found: ' + slug);
  const bankData = JSON.parse(readFileSync(bankPath, 'utf-8'));
  const raw = (bankData._keyTree && Array.isArray(bankData._keyTree.offers) && bankData._keyTree.offers[0])
    ? bankData._keyTree.offers[0]
    : null;
  return raw ? JSON.parse(JSON.stringify(raw)) : null;
}

function getSectorFromFile(bankSlug) {
  const slug = (bankSlug && String(bankSlug).trim()) || '';
  if (!slug) return 'N/A';
  const bankPath = join(BANKS_DIR, slug + '.json');
  if (!existsSync(bankPath)) return 'N/A';
  try {
    const bankData = JSON.parse(readFileSync(bankPath, 'utf-8'));
    const sector = bankData && bankData._keyTree && bankData._keyTree.lender && bankData._keyTree.lender.sector;
    return (sector != null && String(sector).trim() !== '') ? String(sector).trim() : 'N/A';
  } catch {
    return 'N/A';
  }
}

/** Public Loan data matrix sheet – must be published to web (CSV). */
const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/13CA4HbW7jBDjcXG9wE9R9LpY73oC8CyjulZIrJOaCtc/export?format=csv&gid=98022802';

/**
 * Parse a single CSV line into fields (handles quoted commas).
 * @param {string} line
 * @returns {string[]}
 */
function parseCSVLine(line) {
  const out = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === '"') {
      i += 1;
      let val = '';
      while (i < line.length && line[i] !== '"') {
        if (line[i] === '\\') i += 1;
        if (i < line.length) val += line[i++];
      }
      if (line[i] === '"') i += 1;
      out.push(val);
    } else {
      let val = '';
      while (i < line.length && line[i] !== ',') val += line[i++];
      out.push(val.trim());
      i += 1;
    }
  }
  return out;
}

/**
 * Parse CSV text into array of objects (first row = headers).
 * @param {string} text
 * @returns {{ headers: string[], rows: Record<string, string>[] }}
 */
function csvToJSON(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.length > 0);
  if (lines.length === 0) return { headers: [], rows: [] };
  const headers = parseCSVLine(lines[0]);
  const rows = lines.slice(1).map((line) => {
    const values = parseCSVLine(line);
    const row = {};
    headers.forEach((h, i) => {
      row[h] = values[i] !== undefined ? values[i] : '';
    });
    return row;
  });
  return { headers, rows };
}

const MIMES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.ico': 'image/x-icon'
};

const server = createServer(async (req, res) => {
  const port = server.address() ? server.address().port : BASE_PORT;
  const url = new URL(req.url || '/', `http://127.0.0.1:${port}`);
  let pathname = url.pathname === '/' ? '/index.html' : url.pathname;
  pathname = pathname.replace(/\/+$/, '') || '/';

  // API: GET /api/sheet – fetch public Google Sheet as JSON (proxy to avoid CORS)
  if (pathname === '/api/sheet' && req.method === 'GET') {
    try {
      const sheetRes = await fetch(SHEET_CSV_URL);
      if (!sheetRes.ok) {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: `Sheet fetch failed: ${sheetRes.status}` }));
      }
      const csv = await sheetRes.text();
      const { headers, rows } = csvToJSON(csv);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ headers, rows }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: String(err.message) }));
    }
    return;
  }

  // API: GET /api/banks – list bank slugs from manifest (for query page dropdown)
  if (pathname === '/api/banks' && req.method === 'GET') {
    try {
      const manifestPath = join(BANKS_DIR, 'manifest.json');
      const manifest = existsSync(manifestPath)
        ? JSON.parse(readFileSync(manifestPath, 'utf-8'))
        : ['punjab-national-bank'];
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(manifest));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: String(err.message) }));
    }
    return;
  }

  // API: GET /api/shared – common bank data; ?bank=slug or /api/shared/slug
  if ((pathname === '/api/shared' || pathname.startsWith('/api/shared/')) && req.method === 'GET') {
    const bankSlug = url.searchParams.get('bank') || (pathname.startsWith('/api/shared/') ? pathname.slice('/api/shared/'.length) : null);
    try {
      const shared = getSharedFromFile(bankSlug);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(shared != null ? { shared } : { shared: null }));
    } catch (err) {
      try {
        const shared = getShared(bankSlug);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(shared != null ? { shared } : { shared: null }));
      } catch (_) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: String(err.message) }));
      }
    }
    return;
  }

  // API: GET /api/institutes – return institutes list for country/university dropdowns
  if (pathname === '/api/institutes' && req.method === 'GET') {
    try {
      const list = getInstitutes();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(list));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: String(err.message) }));
    }
    return;
  }

  // API: POST /api/query-all – query all banks with gender, amount, secured; returns rows from all matching banks
  if (pathname === '/api/query-all' && req.method === 'POST') {
    let body = '';
    for await (const chunk of req) body += chunk;
    try {
      const criteria = JSON.parse(body || '{}');
      const gender = criteria.gender ?? 'Male';
      const amountRaw = criteria.amount != null ? String(criteria.amount).replace(/,/g, '') : '';
      const amount = amountRaw !== '' ? Number(amountRaw) : 0;
      const secured = criteria.secured !== false && criteria.secured !== 'false';
      const country = criteria.country ? String(criteria.country).trim() : '';
      const university = criteria.university ? String(criteria.university).trim() : '';
      const levelOfStudy = criteria.levelOfStudy ? String(criteria.levelOfStudy).trim() : '';
      const countryNotInList = isCountryNotInList(country);
      const hasUniversityInput = university.trim() !== '';
      const effectiveUniversity = countryNotInList && !hasUniversityInput ? '' : university;
      if (!Number.isFinite(amount) || amount < 0) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid amount: enter a positive number' }));
      }
      const result = await queryAllBanks({ gender, amount, secured });
      if (result.rows && Array.isArray(result.rows)) {
        const sectorBySlug = {};
        result.rows = result.rows.map((row) => {
          const slug = row && row.bankSlug ? String(row.bankSlug) : '';
          if (slug && !sectorBySlug[slug]) sectorBySlug[slug] = getSectorFromFile(slug);
          return {
            ...row,
            sector: slug ? sectorBySlug[slug] : 'N/A'
          };
        });
      }
      const institutes = getInstitutes();
      if (result.rows && (country || university || levelOfStudy)) {
        result.rows = result.rows.filter((row) => {
          if (!offerAppliesToCountryScope(row.offer, country)) return false;
          const changesEnabled = isInstituteChangesEnabled(row.offer?.institute);
          if (country) {
            if (countryNotInList) {
              if (!hasUniversityInput && changesEnabled) return false;
            } else if (changesEnabled && !bankHasCountry(row.bankName, country, institutes)) {
              return false;
            }
          }
          if (effectiveUniversity && !offerAppliesToUniversity(row, effectiveUniversity, institutes)) return false;
          if (levelOfStudy && levelOfStudy !== 'Any' && !offerMatchesLevel(row, levelOfStudy)) return false;
          return true;
        });
      }
      // When "Any" is selected: show XXXXXX-related offers first, then others (no level filter; sort by XXXXX first)
      if (result.rows && levelOfStudy === 'Any') {
        const levelStr = (row) => String((row.shared && row.shared.level_of_study) || '').toUpperCase();
        result.rows.sort((a, b) => {
          const aHasX = levelStr(a).includes('XXXXXX');
          const bHasX = levelStr(b).includes('XXXXXX');
          if (aHasX && !bHasX) return -1;
          if (!aHasX && bHasX) return 1;
          return 0;
        });
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    } catch (err) {
      const code = err.message && err.message.includes('Invalid') ? 400 : 500;
      res.writeHead(code, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: String(err.message) }));
    }
    return;
  }

  // API: POST /api/query – form inputs form the query; single bank
  if (pathname === '/api/query' && req.method === 'POST') {
    let body = '';
    for await (const chunk of req) body += chunk;
    try {
      const criteria = JSON.parse(body || '{}');
      const gender = criteria.gender ?? 'Male';
      const amountRaw = criteria.amount != null ? String(criteria.amount).replace(/,/g, '') : '';
      const amount = amountRaw !== '' ? Number(amountRaw) : 0;
      const secured = criteria.secured !== false && criteria.secured !== 'false';
      if (!Number.isFinite(amount) || amount < 0) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid amount: enter a positive number' }));
      }
      const bankSlug = criteria.bank && String(criteria.bank).trim() ? criteria.bank : 'punjab-national-bank';
      let result = await queryOffers({ gender, amount, secured, bank: bankSlug });
      try {
        result.shared = getSharedFromFile(bankSlug) || result.shared;
      } catch (_) {
        try { result.shared = getShared(bankSlug) || result.shared; } catch (_2) {}
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    } catch (err) {
      const code = err.message && err.message.includes('Invalid') ? 400 : 500;
      res.writeHead(code, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: String(err.message) }));
    }
    return;
  }

  // Static files (project root); inject common bank data into index.html
  const filePath = join(__dirname, pathname.replace(/^\//, ''));
  if (!pathname.startsWith('/api') && existsSync(filePath)) {
    const ext = extname(filePath);
    const mime = MIMES[ext] || 'application/octet-stream';
    try {
      let content = readFileSync(filePath, 'utf-8');
      if ((pathname === '/' || pathname === '/index.html') && content.includes('<!-- INJECT_SHARED -->')) {
        let shared = null;
        try {
          shared = getSharedFromFile('punjab-national-bank');
        } catch (_) {
          try { shared = getShared('punjab-national-bank'); } catch (_2) {}
        }
        const json = JSON.stringify(shared).replace(/<\/script/gi, '<\\/script');
        const inject = '<script>window.SHARED_BANK_DATA=' + json + ';</script>';
        content = content.replace('<!-- INJECT_SHARED -->', inject);
      }
      res.writeHead(200, { 'Content-Type': mime });
      res.end(content);
    } catch {
      res.writeHead(500);
      res.end('Error reading file');
    }
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

/** If port is in use, try the next one (up to MAX_PORT_ATTEMPTS). No need to kill the old process. */
function startServer(port, attempt) {
  if (attempt >= MAX_PORT_ATTEMPTS) {
    console.error(`Could not start: no free port in range ${BASE_PORT}–${BASE_PORT + MAX_PORT_ATTEMPTS - 1}`);
    process.exit(1);
  }
  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${port} in use, trying ${port + 1}...`);
      startServer(port + 1, attempt + 1);
    } else {
      console.error(err);
      process.exit(1);
    }
  });
  server.listen(port, () => {
    server.removeAllListeners('error');
    const bound = server.address();
    const actualPort = bound && typeof bound === 'object' ? bound.port : port;
    console.log(`Server running. Open the app at http://localhost:${actualPort}`);
  });
}

async function bootstrap() {
  const report = await validateAllBanksWithRulesEngine();
  if (report.failedBanks > 0) {
    const msg = `Rules validation failed for ${report.failedBanks}/${report.totalBanks} bank JSON files`;
    if (STRICT_RULES_VALIDATION) {
      const details = report.failures.map((f) => `${f.bankSlug}: ${f.error}`).join('\n');
      throw new Error(`${msg}\n${details}`);
    }
    console.warn(msg);
  } else {
    console.log(`Rules validation passed for all ${report.totalBanks} bank JSON files`);
  }
  startServer(BASE_PORT, 0);
}

bootstrap().catch((err) => {
  console.error(err && err.message ? err.message : err);
  process.exit(1);
});
