# Lender logos

All logo files use the **lender slug** (same as in `data/banks/*.json` and `manifest.json`). When SVG is not available, PNG/JPG/WEBP are used with the same base name:

- `axis-bank.svg`, `state-bank-of-india.svg`, `bank-of-india.png`, `avanse.webp`, etc.

## Renamed (your short names → slug)

| Your file | Renamed to |
|-----------|------------|
| Axis_Bank_logo.svg | axis-bank.svg |
| State_Bank_of_India.svg | state-bank-of-india.svg |
| ICICI_Bank_Logo.svg | icici-bank.svg |
| Logo_of_IDFC_First_Bank.svg | idfc-first-bank.svg |
| Punjab_National_Bank.svg | punjab-national-bank.svg |
| Yes_Bank_SVG_Logo.svg | yes-bank.svg |
| Canara_Bank_Logo.svg | canara-bank.svg |
| Union_Bank_of_India_Logo.svg | union-bank-of-india.svg |
| Bank_of_Maharashtra_logo.svg | bank-of-maharashtra.svg |
| Indian_Overseas_Bank_Logo.svg | indian-overseas-bank.svg |
| Karnataka_Bank_svg_Logo.svg | karnataka-bank.svg |
| Karur_Vysya_Bank.svg | karur-vyasa-bank.svg |
| DCB.svg | dcb-bank.svg |
| Federal-Bank-Logo_SVG.svg | federal-bank.svg |
| RBL_Bank_SVG_Logo.svg | rbl-bank.svg |
| BANKBARODA.NS_BIG.svg | bank-of-baroda.svg |
| POONAWALLA.NS_BIG.svg | poonawalla-fincorp.svg |
| SOUTHBANK.NS_BIG.svg | south-indian-bank.svg |
| idbi-bank-logo-1.svg | idbi-bank.svg |
| Auxilo-logo-horizontal.svg | auxilo.svg |
| Sarwar.svg | saraswat-co-operative-bank.svg |
| Tamilnad.svg | tamilnad-mercantile-bank.svg |
| logo-dhanlaxmi.47067014.svg | dhanlaxmi-bank.svg |
| leapfinance.svg | leap-finance.svg |
| Incred.svg | incred.svg |
| prodigy-finance-logo.svg | prodigy.svg |
| Aditya birla capital.svg | aditya-birla-capital.svg |
| brand.4c6ae784.svg | credila.svg |

**Other SVGs** (alternate logos, icons, etc.): add the file and tell me the lender name — I’ll rename to `{slug}.svg`.

## Raster logos (no SVG available)

These use PNG/JPG/WEBP with the same slug naming:

| Your file | Renamed to |
|-----------|------------|
| boi_en_US_logo.png | bank-of-india.png |
| City union.jpg | city-union-bank.jpg |
| nainital bank.png | nainital-bank.png |
| UCO_Bank.jpg | uco-bank.jpg |
| Edgro.png | edgro.png |
| Avanse.webp | avanse.webp |
| Jammu_&_Kashmir_Bank_Logo.svg.png | jammu--kashmir-bank.png |
| Jammu & kashmir grameen bank.png | jammu-and-kashmir-grameen-bank.png |
| Logo-MPower.png.webp | mpower.webp |
| Tata_Capital_Logo-01.jpg | tata-capital.jpg |
| Dhanlaxmi_Bank.svg.png | dhanlaxmi-bank.png |

**Using logos in the app:** For each lender slug, try in order: `assets/logo/{slug}.svg` → `{slug}.png` → `{slug}.jpg` → `{slug}.webp` (use the first that exists).

## Missing (no logo file yet)

None — all 38 lenders in `manifest.json` now have a logo file (SVG or raster).
