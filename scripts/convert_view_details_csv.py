import csv
import datetime
import json
import re
from pathlib import Path


CSV_PATH = Path(r"C:\Users\Yash Jangid\Desktop\Loan data matrix  for website - View details section abroad.csv")
OUT_PATH = Path(r"C:\Users\Yash Jangid\Desktop\Table\data\view-details-abroad.json")


FIELD_MAP = {
    "apply via": "applyVia",
    "margin": "margin",
    "interest rate": "interestRate",
    "loan amount covers": "loanAmountCovers",
    "other charges": "otherCharges",
    "security": "security",
    "course": "course",
    "others": "others",
}


def clean(value):
    return (value or "").strip()


def norm_key(value):
    return re.sub(r"\s+", " ", clean(value).lower())


def to_field_value(raw_text):
    text = clean(raw_text)
    if text == "" or text == "-":
        text = "N/A"
    bullets = [line.strip() for line in text.splitlines() if line.strip()] if text != "N/A" else []
    return {"raw": text, "bullets": bullets}


def find_header_row(rows):
    for i, row in enumerate(rows):
        first = clean(row[0] if row else "")
        non_empty_rest = sum(1 for cell in row[1:] if clean(cell))
        if first == "" and non_empty_rest >= 10:
            return i
    return None


def main():
    if not CSV_PATH.exists():
        raise SystemExit(f"CSV not found: {CSV_PATH}")

    with CSV_PATH.open("r", encoding="utf-8-sig", newline="") as file:
        rows = list(csv.reader(file))

    header_idx = find_header_row(rows)
    if header_idx is None:
        raise SystemExit("Could not detect lender header row.")

    header = rows[header_idx]
    last_lender_col = 0
    for idx, value in enumerate(header):
        if idx == 0:
            continue
        if clean(value):
            last_lender_col = idx

    lenders = [clean(header[col]) for col in range(1, last_lender_col + 1)]

    records = [
        {
            "lender": lender,
            "details": {field: {"raw": "N/A", "bullets": []} for field in FIELD_MAP.values()},
        }
        for lender in lenders
    ]

    for row in rows[header_idx + 1 :]:
        key_raw = clean(row[0] if len(row) > 0 else "")
        if not key_raw:
            continue
        mapped = FIELD_MAP.get(norm_key(key_raw))
        if not mapped:
            continue

        for col in range(1, last_lender_col + 1):
            lender_idx = col - 1
            value = row[col] if col < len(row) else ""
            records[lender_idx]["details"][mapped] = to_field_value(value)

    output = {
        "sourceFile": str(CSV_PATH),
        "generatedAt": datetime.datetime.now().isoformat(),
        "fields": list(FIELD_MAP.values()),
        "records": records,
        "byLender": {record["lender"]: record["details"] for record in records},
    }

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(output, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"WROTE_JSON={OUT_PATH}")
    print(f"LENDERS={len(records)}")


if __name__ == "__main__":
    main()
