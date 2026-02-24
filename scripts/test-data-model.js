/**
 * Test script: hit http://localhost:3080 (or PORT env) APIs with sample queries
 * to verify the data model (gender, amount, secured, shared, offers).
 * Run: node scripts/test-data-model.js
 */
const BASE = process.env.BASE_URL || 'http://localhost:3080';

async function fetchJSON(url, options = {}) {
  const res = await fetch(url, options);
  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
  try {
    return JSON.parse(text);
  } catch {
    throw new Error('Invalid JSON: ' + text.slice(0, 200));
  }
}

async function runTests() {
  const port = new URL(BASE).port || '3080';
  console.log(`Testing data model at ${BASE}\n`);

  // 1. GET /api/banks – list bank slugs
  console.log('1. GET /api/banks');
  try {
    const banks = await fetchJSON(`${BASE}/api/banks`);
    console.log('   OK: banks count =', Array.isArray(banks) ? banks.length : 'not array');
    if (Array.isArray(banks) && banks.length > 0) {
      console.log('   Sample slugs:', banks.slice(0, 3).join(', '));
    }
  } catch (e) {
    console.log('   FAIL:', e.message);
  }

  // 2. GET /api/shared?bank=axis-bank – shared data from _keyTree
  console.log('\n2. GET /api/shared?bank=axis-bank');
  try {
    const { shared } = await fetchJSON(`${BASE}/api/shared?bank=axis-bank`);
    const hasShared = shared && typeof shared === 'object';
    console.log('   OK: shared =', hasShared ? 'object' : shared);
    if (hasShared) {
      const keys = Object.keys(shared);
      console.log('   Keys:', keys.slice(0, 8).join(', ') + (keys.length > 8 ? '...' : ''));
    }
  } catch (e) {
    console.log('   FAIL:', e.message);
  }

  // 3. POST /api/query – single bank (amount within Axis range: 1–40L, unsecured)
  console.log('\n3. POST /api/query { gender: "Male", amount: 3000000, secured: false, bank: "axis-bank" }');
  try {
    const result = await fetchJSON(`${BASE}/api/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gender: 'Male',
        amount: 3000000,
        secured: false,
        bank: 'axis-bank'
      })
    });
    const hasLender = result.lender && typeof result.lender === 'object';
    const offers = result.offers || [];
    console.log('   OK: lender =', hasLender ? result.lender.name : 'missing');
    console.log('   OK: offers count =', offers.length);
    console.log('   OK: shared present =', result.shared != null);
    if (offers.length > 0) {
      const o = offers[0];
      const hasLoan = o.loan && typeof o.loan.amount === 'object';
      const hasSecurity = o.security && typeof o.security === 'object';
      console.log('   Offer shape: loan.amount =', hasLoan ? 'min/max' : 'missing', ', security =', hasSecurity ? 'ok' : 'missing');
    }
  } catch (e) {
    console.log('   FAIL:', e.message);
  }

  // 4. POST /api/query – mpower unsecured (mpower has security.required: false)
  console.log('\n4. POST /api/query { gender: "Female", amount: 5000000, secured: false, bank: "mpower" }');
  try {
    const result = await fetchJSON(`${BASE}/api/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gender: 'Female',
        amount: 5000000,
        secured: false,
        bank: 'mpower'
      })
    });
    const offers = result.offers || [];
    console.log('   OK: offers count =', offers.length);
    console.log('   OK: dataFile =', result.dataFile);
  } catch (e) {
    console.log('   FAIL:', e.message);
  }

  // 5. POST /api/query-all – all banks
  console.log('\n5. POST /api/query-all { gender: "Male", amount: 3000000, secured: false }');
  try {
    const result = await fetchJSON(`${BASE}/api/query-all`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gender: 'Male',
        amount: 3000000,
        secured: false
      })
    });
    const rows = result.rows || [];
    console.log('   OK: rows count =', rows.length);
    if (rows.length > 0) {
      const r = rows[0];
      console.log('   Row shape: bankName, bankSlug, shared, offer =', !!r.bankName, !!r.bankSlug, !!r.shared, !!r.offer);
    }
  } catch (e) {
    console.log('   FAIL:', e.message);
  }

  // 6. Invalid amount – expect 400
  console.log('\n6. POST /api/query invalid amount (expect 400)');
  try {
    await fetchJSON(`${BASE}/api/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gender: 'Male', amount: -1, secured: false })
    });
    console.log('   FAIL: expected 400');
  } catch (e) {
    const is400 = e.message.includes('400');
    console.log('   OK: got error as expected:', is400 ? '400' : e.message.slice(0, 50));
  }

  console.log('\nDone.');
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
