import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
require('./test-table-vs-csv.cjs');
