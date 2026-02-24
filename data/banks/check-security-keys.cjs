const fs = require('fs');
const path = require('path');

const BANKS_DIR = __dirname;
const SKIP = new Set(['offer-key-tree-schema.json', 'bank-offer-schema.json', 'delayed-emi-payment-schema.json', 'manifest.json']);

function checkSecurity(sec, offerIndex, file) {
  const issues = [];
  if (!sec || typeof sec !== 'object') {
    return { ok: false, issues: ['missing or invalid security object'] };
  }

  const req = sec.required;
  if (typeof req !== 'boolean') {
    if (req === 'No' || req === 'Yes') issues.push('required is string "' + req + '" (must be boolean)');
    else issues.push('required missing or not boolean');
  }

  const hasDisplay = typeof sec.coverageDisplay === 'string';
  const hasPct = sec.coveragePct === null || (typeof sec.coveragePct === 'object' && sec.coveragePct !== null);
  const hasWeightageOnly = !hasDisplay && !hasPct && (sec.weightage === 'None' || (sec.weightage && typeof sec.weightage === 'object'));

  if (!hasDisplay) issues.push('missing coverageDisplay');
  if (!hasPct && !hasWeightageOnly) {
    if (sec.coveragePct === undefined && !sec.weightage) issues.push('missing coveragePct');
  }
  if (hasWeightageOnly) issues.push('only weightage present (need coverageDisplay + coveragePct)');

  if (sec.coveragePct && typeof sec.coveragePct === 'object') {
    const cp = sec.coveragePct;
    if ('min' in cp && !('minPct' in cp)) issues.push('coveragePct uses min/max instead of minPct/maxPct');
    if (sec.weightage && typeof sec.weightage === 'object' && (sec.weightage.coverageDisplay || sec.weightage.coveragePct))
      issues.push('coverageDisplay/coveragePct nested inside weightage');
  }

  if (typeof req === 'boolean') {
    if (req === true && hasDisplay && sec.coverageDisplay === 'None') issues.push('required true but coverageDisplay is "None"');
    if (req === true && hasPct && sec.coveragePct === null) issues.push('required true but coveragePct is null');
    if (req === false && hasDisplay && sec.coverageDisplay !== 'None') issues.push('required false but coverageDisplay is not "None"');
    if (req === false && hasPct && sec.coveragePct !== null) issues.push('required false but coveragePct is not null');
  }

  return { ok: issues.length === 0, issues };
}

const files = fs.readdirSync(BANKS_DIR).filter(f => f.endsWith('.json') && !SKIP.has(f)).sort();
const results = [];

for (const file of files) {
  const filepath = path.join(BANKS_DIR, file);
  let data;
  try {
    data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  } catch (e) {
    results.push({ file, error: e.message });
    continue;
  }
  const offers = data.offers;
  if (!Array.isArray(offers)) {
    results.push({ file, error: 'no offers array' });
    continue;
  }
  const offerResults = [];
  for (let i = 0; i < offers.length; i++) {
    const sec = offers[i].security;
    const check = checkSecurity(sec, i, file);
    const loan = offers[i].loan && offers[i].loan.amount ? `loan ${offers[i].loan.amount.min}-${offers[i].loan.amount.max}` : `index ${i}`;
    offerResults.push({
      index: i,
      loan,
      ok: check.ok,
      issues: check.issues
    });
  }
  results.push({ file, offers: offerResults });
}

// Print report
const allCorrect = [];
const hasIncorrect = [];

for (const r of results) {
  if (r.error) {
    console.log(r.file + ': ERROR ' + r.error);
    continue;
  }
  const incorrect = r.offers.filter(o => !o.ok);
  if (incorrect.length === 0) {
    allCorrect.push(r.file);
  } else {
    hasIncorrect.push({ file: r.file, incorrect });
  }
}

console.log('=== ALL CORRECT (' + allCorrect.length + ' files) ===');
allCorrect.forEach(f => console.log(f));

console.log('\n=== HAS INCORRECT OFFERS (' + hasIncorrect.length + ' files) ===');
for (const { file, incorrect } of hasIncorrect) {
  const total = results.find(r => r.file === file).offers.length;
  console.log('\n' + file + ' (' + incorrect.length + ' incorrect of ' + total + ' offers)');
  for (const o of incorrect) {
    console.log('  Offer ' + o.index + ' (' + o.loan + '): INCORRECT - ' + (o.issues && o.issues.length ? o.issues.join('; ') : 'unknown'));
  }
}
