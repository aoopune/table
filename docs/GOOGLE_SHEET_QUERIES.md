# Querying the Loan Data Matrix Google Sheet from the Client

## What’s required

To run **filter and group** queries on the [Loan data matrix](https://docs.google.com/spreadsheets/d/13CA4HbW7jBDjcXG9wE9R9LpY73oC8CyjulZIrJOaCtc/edit?gid=98022802#gid=98022802) from your app:

### 1. Sheet access

- **Option A – Publish to web (no API key)**  
  - In Google Sheets: **File → Share → Publish to web**.  
  - Choose the target sheet (or “Entire document”) and **CSV**.  
  - Use the generated export URL (or the standard form below).  
  - Your **backend** must request this URL (browser can’t call it directly due to CORS).  

- **Option B – Google Sheets API (optional)**  
  - Create a [Google Cloud project](https://console.cloud.google.com/), enable **Google Sheets API**, create an **API key**.  
  - Restrict the key to Sheets API (and optionally to your domain).  
  - Sheet sharing: **Anyone with the link can view** (or public).  
  - You can call the API from the **server** (recommended, key not exposed) or from the **client** (key visible in network tab).

### 2. Backend proxy (recommended)

- Browsers block direct requests to the sheet (CORS). So:
  - Your **client** calls **your** server (e.g. `GET /api/sheet`).
  - Your **server** fetches the sheet (CSV export or Sheets API), converts to JSON, and returns it.
  - This repo uses a **server proxy** that fetches the **published CSV** (no API key).

### 3. Filter and group on the client

- Once the client has the sheet as JSON (array of rows or objects), use normal JavaScript:
  - **Filter:** `rows.filter(row => ...)`
  - **Group:** `rows.reduce((acc, row) => { ... }, {})` or build a `Map` by key.

## URLs used here

| Purpose        | URL |
|----------------|-----|
| Sheet (edit)   | `https://docs.google.com/spreadsheets/d/13CA4HbW7jBDjcXG9wE9R9LpY73oC8CyjulZIrJOaCtc/edit?gid=98022802` |
| CSV export     | `https://docs.google.com/spreadsheets/d/13CA4HbW7jBDjcXG9wE9R9LpY73oC8CyjulZIrJOaCtc/export?format=csv&gid=98022802` |

**Spreadsheet ID:** `13CA4HbW7jBDjcXG9wE9R9LpY73oC8CyjulZIrJOaCtc`  
**Sheet GID:** `98022802`

The server route `GET /api/sheet` uses the CSV export URL above. The sheet must be **published to web** (or at least the export URL must be publicly reachable).

## Client-side: fetch, filter, and group

After loading the sheet via your server, filter and group in the browser:

```js
// 1. Fetch sheet data (from your server to avoid CORS)
const { rows } = await fetch('/api/sheet').then((r) => r.json());

// 2. Filter – e.g. by lender and gender
const filtered = rows.filter(
  (row) =>
    row['Lender'] === 'Punjab National Bank' &&
    (row['Gender'] === 'Female' || row['Gender'] === 'Equal')
);

// 3. Group – e.g. by interest rate
const byRate = filtered.reduce((acc, row) => {
  const rate = row['Interest rate'] ?? 'unknown';
  if (!acc[rate]) acc[rate] = [];
  acc[rate].push(row);
  return acc;
}, {});

// Or group by lender
const byLender = rows.reduce((acc, row) => {
  const name = row['Lender'] ?? 'Unknown';
  if (!acc[name]) acc[name] = [];
  acc[name].push(row);
  return acc;
}, {});
```

Column names in the sheet (e.g. `Lender`, `Gender`, `Min loan`, `Interest rate`) come from the first row of the published sheet; use the exact header strings when reading `row['Column name']`.

## Quick checklist

1. [ ] Publish the sheet to web (CSV) so the export URL works.
2. [ ] Start the server (`npm start`); it will proxy the sheet at `GET /api/sheet`.
3. [ ] From the client, `fetch('/api/sheet')`, then filter/group the returned JSON.
