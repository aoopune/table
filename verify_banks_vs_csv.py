"""
Verify bank JSON files against 'Loan data matrix for website - Numerical data abroad.csv'.
Compares: lender presence, offer count, and key numerical/choice fields per offer.
"""
import csv
import json
import os
import re
from pathlib import Path

# Paths
DESKTOP = Path(os.environ.get("USERPROFILE", "")) / "Desktop"
CSV_PATH = DESKTOP / "Loan data matrix  for website - Numerical data abroad.csv"
BANKS_DIR = Path(__file__).resolve().parent / "data" / "banks"
MANIFEST_PATH = BANKS_DIR / "manifest.json"

# Skip these JSON files
SKIP_FILES = {"manifest.json", "bank-offer-schema.json", "offer-key-tree-schema.json", "punjab-national-bank-relational-example.json"}


def normalize_lender(name):
    if not name:
        return ""
    return " ".join(name.split()).strip()


def parse_csv(path):
    """Parse CSV; handle quoted newlines. Returns list of rows, each row is list of cell strings."""
    rows = []
    with open(path, "r", encoding="utf-8-sig", newline="") as f:
        reader = csv.reader(f)
        for row in reader:
            rows.append(row)
    return rows


def num_cell(s):
    """Parse number from cell; strip spaces; 99999999 and 99 are special."""
    if s is None or s == "":
        return None
    s = str(s).strip().replace(",", "")
    if s == "":
        return None
    try:
        return int(s)
    except ValueError:
        try:
            return float(s)
        except ValueError:
            return None


def rate_cell(s):
    """Interest rate as float for comparison."""
    if s is None or s == "":
        return None
    s = str(s).strip()
    try:
        return float(s)
    except ValueError:
        return None


def get_csv_offers_by_lender(rows):
    """Assume row 0,1 are meta; row 2 is header. Data from row 3. Columns: 0=Lender, 1=Gender, 2=Min Loan, 3=Max Loan, 4=Security, 5=Security weightage, 6=Others, 7=Interest rate, 8=Rate type, 10=Margin, 21=Tenure Max."""
    header = rows[2] if len(rows) > 2 else []
    data_rows = rows[3:]
    by_lender = {}
    for row in data_rows:
        if len(row) < 12:
            continue
        lender = normalize_lender(row[0])
        if not lender:
            continue
        if lender not in by_lender:
            by_lender[lender] = []
        min_loan = num_cell(row[2])
        max_loan = num_cell(row[3])
        security = (row[4].strip() == "Yes") if len(row) > 4 else None
        rate = rate_cell(row[7]) if len(row) > 7 else None
        rate_type = row[8].strip() if len(row) > 8 else ""
        margin = num_cell(row[10]) if len(row) > 10 else None
        tenure = row[21].strip() if len(row) > 21 else ""
        # Normalize tenure to number for comparison (e.g. "15" or "15 excl. morat" -> 15)
        tenure_num = None
        if tenure:
            m = re.match(r"^(\d+)", tenure)
            if m:
                tenure_num = int(m.group(1))
        by_lender[lender].append({
            "min_loan": min_loan,
            "max_loan": max_loan,
            "security": security,
            "rate": rate,
            "rate_type": rate_type,
            "margin": margin,
            "tenure": tenure,
            "tenure_num": tenure_num,
            "gender": row[1].strip() if len(row) > 1 else "",
        })
    return by_lender


def load_bank_json(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)


def get_json_offers(data):
    """Extract offers from bank JSON (relational style: lender object + offers array)."""
    lender_name = None
    if isinstance(data.get("lender"), dict):
        lender_name = data["lender"].get("name") or data["lender"].get("title")
    if not lender_name and "_keyTree" in data:
        lender_name = (data["_keyTree"].get("lender") or {}).get("name")
    offers = data.get("offers") or []
    result = []
    for o in offers:
        # Support both flat and nested structures
        if "loan" in o and isinstance(o["loan"], dict) and "amount" in o["loan"]:
            amt = o["loan"]["amount"]
            min_loan = amt.get("min") if isinstance(amt, dict) else None
            max_loan = amt.get("max") if isinstance(amt, dict) else None
        else:
            min_loan = o.get("minLoan")
            max_loan = o.get("maxLoan")
        sec = o.get("security")
        if isinstance(sec, dict):
            security = sec.get("required") if isinstance(sec.get("required"), bool) else (sec.get("required") == "Yes" or sec.get("required") == True)
        else:
            security = (sec == "Yes" or sec == True) if sec is not None else None
        interest = o.get("interest") or {}
        if isinstance(interest, dict):
            rate = interest.get("rate")
            rate_type = interest.get("type") or ""
        else:
            rate = o.get("interestRate")
            rate_type = o.get("typeOfInterestRate") or ""
        margin = o.get("margin")
        if margin is not None and not isinstance(margin, (int, float)):
            margin = num_cell(str(margin))
        rep = o.get("repayment_tenure")
        if rep is None:
            rep = o.get("repaymentTenure")
        tenure_num = int(rep) if rep is not None and isinstance(rep, (int, float)) else (int(rep) if isinstance(rep, str) and rep.isdigit() else None)
        result.append({
            "min_loan": min_loan,
            "max_loan": max_loan,
            "security": security,
            "rate": float(rate) if rate is not None and isinstance(rate, (int, float)) else rate_cell(str(rate)) if rate is not None else None,
            "rate_type": (rate_type or "").strip(),
            "margin": margin if isinstance(margin, (int, float)) else num_cell(str(margin)) if margin is not None else None,
            "tenure_num": tenure_num,
            "gender": (o.get("gender") or "").strip(),
        })
    return lender_name, result


def normalize_rate_type(s):
    if not s:
        return ""
    s = s.strip()
    if "float" in s.lower():
        return "Floating"
    if "fixed" in s.lower():
        return "Fixed"
    return s


def offer_signature(o):
    return (
        o.get("min_loan"),
        o.get("max_loan"),
        o.get("security"),
        o.get("rate"),
        normalize_rate_type(o.get("rate_type") or ""),
        o.get("margin"),
        o.get("tenure_num"),
        (o.get("gender") or "").strip(),
    )


def find_match(csv_offer, json_offers, used_json_indices):
    sig = offer_signature(csv_offer)
    for i, jo in enumerate(json_offers):
        if i in used_json_indices:
            continue
        if offer_signature(jo) == sig:
            return i
        # Relaxed: same min, max, security, rate, margin, tenure, gender
        m_ok = jo.get("margin") == csv_offer.get("margin") or (jo.get("margin") is None and csv_offer.get("margin") is None)
        t_ok = jo.get("tenure_num") == csv_offer.get("tenure_num") or (jo.get("tenure_num") is None and csv_offer.get("tenure_num") is None)
        g_ok = (jo.get("gender") or "").strip() == (csv_offer.get("gender") or "").strip()
        if (jo.get("min_loan") == csv_offer.get("min_loan") and jo.get("max_loan") == csv_offer.get("max_loan")
                and jo.get("security") == csv_offer.get("security") and jo.get("rate") == csv_offer.get("rate")
                and m_ok and t_ok and g_ok):
            return i
    return None


def main():
    if not CSV_PATH.exists():
        print(f"CSV not found: {CSV_PATH}")
        return
    rows = parse_csv(CSV_PATH)
    csv_by_lender = get_csv_offers_by_lender(rows)
    csv_lenders = set(csv_by_lender.keys())

    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    # Lender name in CSV -> possible variants in JSON
    def json_name_to_csv(name):
        n = normalize_lender(name)
        # CSV sometimes has "Axis bank", "Karnataka bank", "Leap finance", "Credila", "Aditya Birla capital"
        return n

    findings = []
    banks_ok = []
    banks_checked = 0

    for slug in manifest:
        path = BANKS_DIR / f"{slug}.json"
        if not path.exists() or path.name in SKIP_FILES:
            continue
        banks_checked += 1
        try:
            data = load_bank_json(path)
        except Exception as e:
            findings.append(f"[{slug}] Failed to load JSON: {e}")
            continue
        lender_name, json_offers = get_json_offers(data)
        if not lender_name:
            findings.append(f"[{slug}] No lender name in JSON.")
            continue

        csv_name = json_name_to_csv(lender_name)
        # Match CSV lender (exact or normalized)
        csv_offers = None
        for cl in csv_lenders:
            if normalize_lender(cl) == normalize_lender(csv_name):
                csv_offers = csv_by_lender[cl]
                break
            if cl.lower() == csv_name.lower():
                csv_offers = csv_by_lender[cl]
                break
        if csv_offers is None:
            findings.append(f"[{slug}] Lender '{lender_name}' not found in CSV. CSV lenders: {sorted(csv_lenders)[:10]}...")
            continue

        csv_count = len(csv_offers)
        json_count = len(json_offers)
        if csv_count != json_count:
            findings.append(f"[{slug}] Offer count mismatch: CSV has {csv_count} rows, JSON has {json_count} offers.")

        used = set()
        for co in csv_offers:
            idx = find_match(co, json_offers, used)
            if idx is None:
                findings.append(f"[{slug}] CSV row with no matching JSON offer: min={co.get('min_loan')}, max={co.get('max_loan')}, security={co.get('security')}, rate={co.get('rate')}, margin={co.get('margin')}, tenure={co.get('tenure_num')}, gender={co.get('gender')!r}")
            else:
                used.add(idx)

        if json_count > csv_count:
            for i, jo in enumerate(json_offers):
                if i in used:
                    continue
                findings.append(f"[{slug}] JSON offer with no matching CSV row: min={jo.get('min_loan')}, max={jo.get('max_loan')}, security={jo.get('security')}, rate={jo.get('rate')}, margin={jo.get('margin')}, tenure={jo.get('tenure_num')}, gender={jo.get('gender')!r}")

        if not any(f.startswith(f"[{slug}]") for f in findings[- (csv_count + json_count + 5) :]):
            # No new finding for this bank (avoid false positive from count mismatch only)
            pass
        # Record if no findings for this bank
        bank_findings = [x for x in findings if x.startswith(f"[{slug}]")]
        if not bank_findings:
            banks_ok.append(slug)

    # Report
    print("=" * 60)
    print("BANK JSON vs CSV VERIFICATION (Numerical data abroad)")
    print("=" * 60)
    print(f"CSV: {CSV_PATH}")
    print(f"Banks in manifest (checked): {banks_checked}")
    print()
    if banks_ok:
        print("Banks with no reported differences (offer counts and key fields match):")
        for b in sorted(banks_ok):
            print(f"  - {b}")
        print()
    print("FINDINGS (differences / missing / extra):")
    if not findings:
        print("  None.")
    else:
        for f in findings:
            print(f"  {f}")
    print()
    print("Done.")


if __name__ == "__main__":
    main()
