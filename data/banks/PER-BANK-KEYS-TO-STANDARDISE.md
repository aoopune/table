# Per-bank keys to standardise (vs offer-key-tree-schema.json)

**Standard (schema):** `lender` { name, sector }; `offers[]` with nested `loan.amount`, `security`, `interest`, `fees`, `repayment`, `eligibility`, `institute`, `process`, `other` and **camelCase** keys.

---

## Key mapping reference

| Location | Current key (in files) | Standard key (schema) |
|----------|-------------------------|------------------------|
| **offers[]** (each offer) | `gender` | `eligibility.gender` |
| **offers[]** | `coapplicant` | `eligibility.coApplicant` |
| **offers[]** | `repayment_tenure` | `repayment.tenure` (+ `repayment.moratorium.period`, `repayment.moratorium.paymentDuring`) |
| **offers[]** | `processing_fees` | `fees.processing` |
| **offers[]** | `refundable_processing_fees` | `fees.refundable` |
| **offers[].institute** | `changes` | `wiseChanges` |
| **offers[].institute** | `level_of_study` | `levelOfStudy` |
| **_keyTree.offers[]** | `moratorium_period` | `moratoriumPeriod` (or under repayment.moratorium) |
| **_keyTree.offers[]** | `payment_during_moratorium` | `paymentDuringMoratorium` |
| **_keyTree.offers[]** | `level_of_study` | `levelOfStudy` |
| **_keyTree.offers[]** | `delayed_emi_payment` | `delayedEmiPayment` |
| **_keyTree.offers[]** | `Average_Time_To_Sanction` | `avgTimeToSanction` |
| **_keyTree.offers[]** | `onboarding_process` | `onboarding` or `onboardingProcess` |

*Note: `course` appears in _keyTree in all banks but is not in the schema; you can keep it as extra or document it.*

---

## Per-bank: keys to standardise

Each bank file uses the same non-standard keys. Below: **keys to standardise** for each bank, plus any **bank-specific** note (e.g. type of `repayment_tenure`).

| Bank (file) | Keys to standardise (in offers[]) | Keys to standardise (in _keyTree.offers[]) | Bank-specific note |
|-------------|-----------------------------------|-------------------------------------------|---------------------|
| **aditya-birla-capital** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **auxilo** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **avanse** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **axis-bank** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **bank-of-baroda** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | Some offers: **repayment_tenure** is number (e.g. 15), not object |
| **bank-of-india** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **bank-of-maharashtra** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **canara-bank** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | Some offers: **repayment_tenure** is number (e.g. 15), not object |
| **city-union-bank** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **credila** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **dcb-bank** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **dhanlaxmi-bank** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **edgro** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **federal-bank** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **icici-bank** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **idbi-bank** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | Some offers: **repayment_tenure** is number (e.g. 15), not object |
| **idfc-first-bank** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **incred** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **indian-overseas-bank** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **jammu--kashmir-bank** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **jammu-and-kashmir-grameen-bank** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **karnataka-bank** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **karur-vyasa-bank** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **leap-finance** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **mpower** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **nainital-bank** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **poonawalla-fincorp** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **prodigy** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | **repayment_tenure** is number (15), not object — normalise to repayment.tenure |
| **punjab-national-bank** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | Mixed: some offers have **repayment_tenure** as number (15 or 10), some as object |
| **punjab-national-bank-relational-example** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | Many offers: **repayment_tenure** is number (15, 10, or 1), not object |
| **rbl-bank** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **saraswat-co-operative-bank** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **south-indian-bank** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **state-bank-of-india** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **tamilnad-mercantile-bank** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **tata-capital** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **uco-bank** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **union-bank-of-india** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |
| **yes-bank** | gender, coapplicant, repayment_tenure, processing_fees, refundable_processing_fees, institute.changes, institute.level_of_study | moratorium_period, payment_during_moratorium, level_of_study, delayed_emi_payment, Average_Time_To_Sanction, onboarding_process | — |

---

## Summary list (same for every bank)

**In each offer object (`offers[]`):**

1. **gender** → move under **eligibility.gender**
2. **coapplicant** → move under **eligibility.coApplicant**
3. **repayment_tenure** → replace with **repayment.tenure** (number); add **repayment.moratorium.period** and **repayment.moratorium.paymentDuring** (e.g. from _keyTree)
4. **processing_fees** → move under **fees.processing**
5. **refundable_processing_fees** → move under **fees.refundable**
6. **institute.changes** → rename to **institute.wiseChanges**
7. **institute.level_of_study** → rename to **institute.levelOfStudy**

**In each `_keyTree.offers[]` item:**

1. **moratorium_period** → **moratoriumPeriod**
2. **payment_during_moratorium** → **paymentDuringMoratorium**
3. **level_of_study** → **levelOfStudy**
4. **delayed_emi_payment** → **delayedEmiPayment**
5. **Average_Time_To_Sanction** → **avgTimeToSanction**
6. **onboarding_process** → **onboarding** or **onboardingProcess**

**Banks with repayment_tenure as number (need shape fix):**  
prodigy, punjab-national-bank, punjab-national-bank-relational-example, idbi-bank, bank-of-baroda, canara-bank.
