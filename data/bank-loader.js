/**
 * Load per-bank JSON files (Numerical_data_abroad) and institutes.json (institutes_abroad_standardized).
 * Sets window.LOAN_OFFERS and window.INSTITUTES using bank JSON data only.
 * Source: https://docs.google.com/spreadsheets/d/1eaYl0tfAiTR4AcAaBfqemsbMX8QFcX_yQZOQcD2kW7g
 * Run after app.js. Open via a local server so fetch works.
 */
(function () {
  var BANKS_BASE = 'data/banks/';
  var MANIFEST_URL = BANKS_BASE + 'manifest.json';
  var INSTITUTES_URL = 'data/institutes.json';

  function loadBanksAndInstitutes() {
    Promise.all([
      fetch(MANIFEST_URL).then(function (r) { return r.ok ? r.json() : []; }),
      fetch(INSTITUTES_URL).then(function (r) { return r.ok ? r.json() : []; })
    ]).then(function (results) {
      var manifest = results[0];
      var institutes = results[1];
      window.INSTITUTES = Array.isArray(institutes) ? institutes : [];

      if (!Array.isArray(manifest) || manifest.length === 0) {
        if (window.TABLE_DATA && window.TABLE_DATA.length > 0) {
          window.rebuildTable && window.rebuildTable();
        }
        return;
      }

      var promises = manifest.map(function (slug) {
        return fetch(BANKS_BASE + slug + '.json').then(function (r) {
          return r.ok ? r.json() : null;
        });
      });

      function flattenOffer(o, fileLender, sharedOffer) {
        if (!o || !o.loan || !o.loan.amount) return o;
        var lenderName = (fileLender && (fileLender.name || fileLender)) || (o.lender && (o.lender.name || o.lender)) || '';
        var shared = sharedOffer || {};
        var sec = o.security;
        var secReq = sec && (sec.required === true || sec.required === 'Yes');
        var weight = (sec && sec.weightage) || '';
        var delayedDisplay = (shared.delayed_emi_payment && shared.delayed_emi_payment.displayText) || '';
        var ageVal = '';
        if (shared.age && (shared.age.min != null || shared.age.max != null)) {
          if (shared.age.min != null && shared.age.max != null) ageVal = String(shared.age.min) + '-' + String(shared.age.max);
          else if (shared.age.min != null) ageVal = String(shared.age.min) + '+';
          else if (shared.age.max != null) ageVal = String(shared.age.max);
        }
        var avgTime = '';
        if (shared.Average_Time_To_Sanction && (shared.Average_Time_To_Sanction.min != null || shared.Average_Time_To_Sanction.max != null)) {
          if (shared.Average_Time_To_Sanction.min != null && shared.Average_Time_To_Sanction.max != null) {
            avgTime = String(shared.Average_Time_To_Sanction.min) + '-' + String(shared.Average_Time_To_Sanction.max);
          } else {
            avgTime = String(shared.Average_Time_To_Sanction.min != null ? shared.Average_Time_To_Sanction.min : shared.Average_Time_To_Sanction.max);
          }
        }
        if (typeof weight === 'object' && weight !== null) {
          if (weight.min != null && weight.max != null) weight = weight.min + '–' + weight.max + '%';
          else weight = weight.min != null ? '≥' + weight.min + '%' : (weight.max != null ? weight.max + '%' : '');
        }
        return {
          gender: o.gender,
          minLoan: o.loan.amount.min,
          maxLoan: o.loan.amount.max,
          security: secReq ? 'Yes' : 'No',
          securityWeightage: weight || (secReq ? '' : 'None'),
          others: o.coapplicant || '',
          interestRate: (o.interest && o.interest.rate != null) ? String(o.interest.rate) : '',
          typeOfInterestRate: (o.interest && o.interest.type) || '',
          margin: (o.margin != null) ? ((Number(o.margin) === 99) ? 'N/A' : String(o.margin)) : '',
          processingFees: '',
          refundableProcessingFees: '',
          repaymentTenure: o.repayment_tenure != null ? String(o.repayment_tenure) : '',
          moratoriumPeriod: '',
          paymentDuringMoratorium: '',
          levelOfStudy: (o.institute && o.institute.level_of_study) || o.course || '',
          course: o.course || '',
          instituteWiseChanges: (o.institute && o.institute.changes) ? 'Yes' : 'No',
          instituteCriteria: (o.institute && o.institute.criteria) || '',
          lender: lenderName,
          sector: (fileLender && fileLender.sector) || '',
          delayedEmiPayment: delayedDisplay,
          nationality: shared.nationality || '',
          age: ageVal,
          qualification: shared.qualification || '',
          coApplicant: (shared.coApplicant === null) ? 'N/A' : (shared.coApplicant || ''),
          universityStrictness: shared.universityStrictness || '',
          avgTimeToSanction: avgTime,
          dedicatedCaseManager: (shared.dedicatedCaseManager === true ? 'Yes' : (shared.dedicatedCaseManager === false ? 'No' : '')),
          onboardingProcess: shared.onboarding_process || '',
          select: false
        };
      }

      Promise.all(promises).then(function (bankFiles) {
        var allOffers = [];
        bankFiles.forEach(function (file) {
          if (file && file.offers && Array.isArray(file.offers)) {
            var fileLender = file.lender;
            var sharedOffer = (file._keyTree && Array.isArray(file._keyTree.offers) && file._keyTree.offers.length > 0)
              ? file._keyTree.offers[0]
              : null;
            file.offers.forEach(function (o) {
              var flat = flattenOffer(o, fileLender, sharedOffer);
              if (flat === o && !flat.lender && fileLender) flat.lender = (fileLender.name || fileLender);
              allOffers.push(flat);
            });
          }
        });
        window.LOAN_OFFERS = allOffers;
        if (typeof window.populateQueryDropdowns === 'function') window.populateQueryDropdowns();
        if (typeof window.rebuildTable === 'function') window.rebuildTable();
      }).catch(function () {
        if (window.TABLE_DATA && window.TABLE_DATA.length > 0 && typeof window.rebuildTable === 'function') {
          window.rebuildTable();
        }
      });
    }).catch(function () {
      if (window.TABLE_DATA && window.TABLE_DATA.length > 0 && typeof window.rebuildTable === 'function') {
        window.rebuildTable();
      }
    });
  }

  if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadBanksAndInstitutes);
    } else {
      setTimeout(loadBanksAndInstitutes, 0);
    }
  }
})();
