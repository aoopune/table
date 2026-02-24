const fs = require('fs');
const path = require('path');

const dir = __dirname;
const skip = new Set(['bank-offer-schema.json', 'offer-key-tree-schema.json', 'manifest.json']);
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && !skip.has(f));

let done = 0;
let err = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    const keyOffer = data._keyTree?.offers?.[0];
    const processingFees = keyOffer?.processing_fees;
    if (!data.offers || !Array.isArray(data.offers)) {
      console.warn(file, 'no root offers, skip');
      continue;
    }
    if (processingFees == null) {
      console.warn(file, 'no processing_fees in _keyTree.offers[0], skip');
      continue;
    }
    for (const offer of data.offers) {
      offer.processing_fees =
        typeof processingFees === 'object' && processingFees !== null
          ? { ...processingFees }
          : processingFees;
    }
    delete keyOffer.processing_fees;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    done++;
    console.log(file, '-> processing_fees shifted');
  } catch (e) {
    err++;
    console.error(file, e.message);
  }
}

console.log('\nDone:', done, 'files. Errors:', err);
