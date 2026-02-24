/**
 * Data for table: mix of dynamic (CSV) and static.
 *
 * CONTRACT (so the table works with your actual data later):
 * - Set window.TABLE_DATA = [ { sector, lender, select, ... }, ... ] (array of row objects).
 * - Each row object should use the same keys as column ids from TABLE_CONFIG:
 *   TABLE_CONFIG.columnGroups[].cols[].id (e.g. lender, sector, select, nationality, age, ...).
 * - Missing keys in a row are shown as "—". Extra keys are ignored. Order of columns
 *   is always taken from TABLE_CONFIG, not from the row keys.
 * - For checkbox columns use true/false; for others use strings or numbers (displayed as-is).
 * - After setting TABLE_DATA, call window.renderTableBody() to refresh the table.
 * - Sort and filter state are applied on top of TABLE_DATA; changing TABLE_DATA and
 *   calling renderTableBody() will re-apply current sort/filter to the new data.
 *
 * When you have a CSV: parse it (e.g. Papa Parse or custom), map column headers to
 * TABLE_CONFIG column ids, then:
 *   window.TABLE_DATA = mergedRows;
 *   window.renderTableBody();
 */

// Example static row (column ids must match table-config columnGroups[].cols[].id)
// window.TABLE_DATA = [
//   {
//     sector: 'Education',
//     lender: 'Bank of India',
//     select: false,
//     nationality: 'Indian',
//     age: '18–35',
//     qualification: '12th / UG / PG',
//     coApplicant: 'Optional',
//     universityStrictness: 'As per list',
//     interestRate: '9.25% – 11.50%',
//     typeOfInterestRate: 'Floating',
//     margin: '—',
//     processingFees: 'Nil – 1%',
//     refundableProcessingFees: 'No',
//     repaymentTenure: '15',
//     moratoriumPeriod: 'Course + 12 months',
//     paymentDuringMoratorium: 'Interest only',
//     delayedEmiPayment: 'As per bank',
//     avgTimeToSanction: '7–10',
//     dedicatedCaseManager: 'Yes',
//     onboardingProcess: 'Online'
//   }
// ];
