const fs = require('fs');
const path = require('path');

const BANKS_DIR = __dirname;
const SKIP = new Set(['offer-key-tree-schema.json', 'bank-offer-schema.json', 'manifest.json']);

const files = fs.readdirSync(BANKS_DIR).filter(f => f.endsWith('.json') && !SKIP.has(f));

let done = 0;
let skipped = 0;

for (const file of files) {
  const filePath = path.join(BANKS_DIR, file);
  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    console.error(file, e.message);
    continue;
  }

  const keyTreeOffers = data._keyTree && data._keyTree.offers;
  const rootOffers = data.offers;
  if (!keyTreeOffers || !keyTreeOffers[0] || !rootOffers || rootOffers.length === 0) {
    skipped++;
    continue;
  }

  const course = keyTreeOffers[0].course;
  if (course === undefined) {
    skipped++;
    continue;
  }

  // Copy course into each root offer
  for (const offer of rootOffers) {
    offer.course = course;
  }

  // Remove course from _keyTree.offers[0]
  delete keyTreeOffers[0].course;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  done++;
  console.log('OK:', file, '-', rootOffers.length, 'offers');
}

console.log('Done:', done, 'files updated,', skipped, 'skipped');
