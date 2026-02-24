/**
 * Filter dropdown options for Education Loan Abroad.
 * Populated from your CSV: Country / Main Campus and University (per country).
 * For now using a subset; replace with full list or load from CSV/API.
 */
const FILTER_OPTIONS = {
  countries: [
    'United States of America',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Netherlands',
    'Ireland',
    'Singapore',
    'United Arab Emirates',
    'New Zealand',
    'Sweden',
    'Switzerland',
    'Denmark',
    'Finland',
    'Norway',
    'Japan',
    'South Korea',
    'China',
    'Hong Kong',
    'Italy',
    'Spain',
    'Belgium',
    'Austria',
    'Poland',
    'Czechia',
    'Hungary',
    'Malaysia',
    'India'
  ],
  // Sample universities for USA (expand or load dynamically)
  universitiesByCountry: {
    'United States of America': [
      'Harvard University',
      'MIT',
      'Stanford University',
      'Yale University',
      'Columbia University',
      'University of California, Berkeley',
      'A. T. Still University',
      'Adelphi University',
      'Abilene Christian University',
      'Acadia University'
    ],
    'United Kingdom': [
      'University of Oxford',
      'University of Cambridge',
      'Imperial College London',
      'UCL',
      'London School of Economics',
      'Aberystwyth University'
    ],
    'Canada': [
      'University of Toronto',
      'McGill University',
      'University of British Columbia'
    ],
    'Australia': [
      'University of Melbourne',
      'Australian National University',
      'University of Sydney'
    ]
  }
};

// Default: add all countries from CSV if we had full list; for others use "—" or empty
function getUniversitiesForCountry(country) {
  return FILTER_OPTIONS.universitiesByCountry[country] || ['—'];
}
