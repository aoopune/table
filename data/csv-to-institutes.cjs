const fs = require('fs');
const path = require('path');

const CSV_PATH = path.join(
  path.dirname(__dirname),
  '..',
  'Loan data matrix  for website - institutes-abroad-standardized (2).csv'
);
const OUT_PATH = path.join(__dirname, 'institutes.json');

const csvText = fs.readFileSync(CSV_PATH, 'utf8');
const lines = csvText.split(/\r?\n/).filter(line => line.trim());

if (lines.length < 2) {
  console.error('CSV has no data rows');
  process.exit(1);
}

const header = lines[0];
const dataLines = lines.slice(1);

const rows = [];
for (const line of dataLines) {
  const parts = line.split(',').map(s => s.trim());
  if (parts.length < 5) continue;
  const lenderName = parts[0];
  const university = parts[1];
  const country = parts[2];
  const criteria = parts[3];
  const course = parts[parts.length - 1] || 'Any course';
  rows.push({
    lenderName,
    university,
    country,
    criteria,
    course
  });
}

fs.writeFileSync(OUT_PATH, JSON.stringify(rows, null, 2), 'utf8');
console.log('Wrote', rows.length, 'rows to', OUT_PATH);
