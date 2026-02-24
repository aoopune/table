/**
 * Table config: subheaders match Static_data_abroad sheet (ApplyOnlyOnce - Loan Data).
 * Source: https://docs.google.com/spreadsheets/d/1eaYl0tfAiTR4AcAaBfqemsbMX8QFcX_yQZOQcD2kW7g (gid=2117455473)
 */
const TABLE_CONFIG = {
  productType: 'education-loan',
  // Column groups: first row = main header; second row = subheaders. Order is display order.
  columnGroups: [
    {
      id: 'sector',
      label: 'Sector',
      cols: [
        { id: 'lender', label: 'Lender', type: 'text', sticky: true },
        { id: 'sector', label: 'Sector', type: 'text', sticky: true },
        { id: 'select', label: 'Select', type: 'checkbox', sticky: true }
      ]
    },
    {
      id: 'loanFeatures',
      label: 'Loan features',
      cols: [
        { id: 'interestRate', label: 'Interest Rate', type: 'text' },
        { id: 'typeOfInterestRate', label: 'Type of Rate', type: 'text' },
        { id: 'preferredUniversity', label: 'Preferred University', type: 'text' },
        { id: 'securityCoverage', label: 'Security coverage %', type: 'text' },
        { id: 'repaymentTenure', label: 'Repayment Tenure', type: 'text' },
        { id: 'margin', label: 'Margin (%)', type: 'text' },
        { id: 'processingFees', label: 'Processing fees', type: 'text' },
        { id: 'moratoriumPeriod', label: 'Moratorium period', type: 'text' },
        { id: 'paymentDuringMoratorium', label: 'Payment during moratorium', type: 'text' },
        { id: 'delayedEmiPayment', label: 'Delayed EMI payment', type: 'text' }
      ]
    },
    {
      id: 'eligibility',
      label: 'Eligibility criteria',
      cols: [
        { id: 'course', label: 'Course', type: 'text' },
        { id: 'nationality', label: 'Nationality', type: 'text' },
        { id: 'age', label: 'Age', type: 'text' },
        { id: 'qualification', label: 'Qualification', type: 'text' }
      ]
    },
    {
      id: 'customerService',
      label: 'Customer service & others',
      cols: [
        { id: 'universityStrictness', label: 'University strictness', type: 'text' },
        { id: 'avgTimeToSanction', label: 'Avg time to sanction', type: 'text' },
        { id: 'dedicatedCaseManager', label: 'Dedicated case manager', type: 'text' },
        { id: 'onboardingProcess', label: 'Onboarding process', type: 'text' }
      ]
    }
  ]
};
