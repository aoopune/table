import concurrent.futures
import json
import re
import time
from pathlib import Path

import pandas as pd
import pycountry
import requests

INPUT_CSV = Path(r"c:\Users\Yash Jangid\Desktop\Loan data matrix  for website - institutes-abroad-standardized (5).csv")
OUTPUT_XLSX = Path(r"c:\Users\Yash Jangid\Desktop\Loan data matrix  for website - institutes-abroad-standardized (5) - country-check.xlsx")
CACHE_JSON = Path(r"c:\Users\Yash Jangid\Desktop\Table\analysis\fresh_country_verification_cache_v5.json")


COUNTRY_ALIASES = {
    "usa": "United States",
    "u.s.a": "United States",
    "u.s.": "United States",
    "united states of america": "United States",
    "us": "United States",
    "uk": "United Kingdom",
    "u.k.": "United Kingdom",
    "england": "United Kingdom",
    "uae": "United Arab Emirates",
    "u.a.e": "United Arab Emirates",
    "russia": "Russian Federation",
    "south korea": "Korea, Republic of",
    "north korea": "Korea, Democratic People's Republic of",
    "czech republic": "Czechia",
    "viet nam": "Vietnam",
    "hong kong": "Hong Kong",
    "macau": "Macao",
}


def country_name_set() -> dict:
    names = {}
    for c in pycountry.countries:
        names[c.name.lower()] = c.name
        if hasattr(c, "official_name"):
            names[c.official_name.lower()] = c.name
        if hasattr(c, "common_name"):
            names[c.common_name.lower()] = c.name
        names[c.alpha_2.lower()] = c.name
        names[c.alpha_3.lower()] = c.name
    names.update({k.lower(): v for k, v in COUNTRY_ALIASES.items()})
    return names


COUNTRY_LOOKUP = country_name_set()
COUNTRY_PATTERNS = sorted(
    set(re.escape(k) for k in COUNTRY_LOOKUP.keys() if len(k) > 2),
    key=len,
    reverse=True,
)
COUNTRY_REGEX = re.compile(r"\\b(" + "|".join(COUNTRY_PATTERNS) + r")\\b", re.IGNORECASE)


session = requests.Session()
session.headers.update({"User-Agent": "Mozilla/5.0 CountryVerifier/1.0"})


def country_from_alpha2(alpha2: str) -> str | None:
    if not alpha2:
        return None
    try:
        c = pycountry.countries.get(alpha_2=alpha2.upper())
        if c:
            return c.name
    except Exception:
        return None
    return None


def normalize_country(text: str) -> str:
    if text is None:
        return ""
    t = str(text).strip().lower()
    t = re.sub(r"\\s+", " ", t)
    t = t.replace("&", "and")
    if t in COUNTRY_LOOKUP:
        return COUNTRY_LOOKUP[t]
    # attempt closest by removing punctuation
    t2 = re.sub(r"[^a-z0-9 ]+", "", t)
    if t2 in COUNTRY_LOOKUP:
        return COUNTRY_LOOKUP[t2]
    return str(text).strip()


def extract_country_from_text(text: str) -> str | None:
    if not text:
        return None
    m = COUNTRY_REGEX.search(text.lower())
    if not m:
        return None
    token = m.group(1).lower()
    return COUNTRY_LOOKUP.get(token)


def nominatim_country(university: str) -> str | None:
    try:
        r = session.get(
            "https://nominatim.openstreetmap.org/search",
            params={
                "q": university,
                "format": "jsonv2",
                "limit": 1,
                "addressdetails": 1,
            },
            headers={"User-Agent": "country-verification/1.0"},
            timeout=25,
        )
        r.raise_for_status()
        items = r.json()
        if not items:
            return None
        address = items[0].get("address", {}) or {}
        cc = (address.get("country_code") or "").strip().lower()
        if cc:
            c = country_from_alpha2(cc)
            if c:
                return normalize_country(c)
        ctext = address.get("country")
        if ctext:
            return normalize_country(ctext)
    except Exception:
        return None
    return None


def wikidata_country(university: str) -> str | None:
    try:
        s = session.get(
            "https://www.wikidata.org/w/api.php",
            params={
                "action": "wbsearchentities",
                "search": university,
                "language": "en",
                "format": "json",
                "limit": 5,
                "type": "item",
            },
            timeout=25,
        )
        s.raise_for_status()
        items = s.json().get("search", [])
        if not items:
            return None

        # prefer results that look like university/college/institute
        qids = [it.get("id") for it in items if it.get("id")]
        if not qids:
            return None

        e = session.get(
            "https://www.wikidata.org/w/api.php",
            params={
                "action": "wbgetentities",
                "ids": "|".join(qids),
                "languages": "en",
                "format": "json",
                "props": "claims|labels|descriptions",
            },
            timeout=25,
        )
        e.raise_for_status()
        entities = e.json().get("entities", {})

        scored = []
        for qid in qids:
            ent = entities.get(qid, {})
            label = (ent.get("labels", {}).get("en", {}) or {}).get("value", "")
            desc = (ent.get("descriptions", {}).get("en", {}) or {}).get("value", "")
            score = 0
            text = f"{label} {desc}".lower()
            if "university" in text:
                score += 3
            if "institute" in text or "college" in text or "school" in text:
                score += 2
            if university.lower().split()[0] in text:
                score += 1
            claims = ent.get("claims", {})
            if "P17" in claims:
                score += 2
            scored.append((score, qid, ent))

        scored.sort(reverse=True, key=lambda x: x[0])

        for _, _, ent in scored:
            claims = ent.get("claims", {})
            p17 = claims.get("P17", [])
            for c in p17:
                dv = (((c.get("mainsnak") or {}).get("datavalue") or {}).get("value") or {})
                cid = dv.get("id")
                if not cid:
                    continue
                cr = session.get(
                    "https://www.wikidata.org/w/api.php",
                    params={
                        "action": "wbgetentities",
                        "ids": cid,
                        "languages": "en",
                        "format": "json",
                        "props": "labels",
                    },
                    timeout=25,
                )
                cr.raise_for_status()
                cent = cr.json().get("entities", {}).get(cid, {})
                cname = (cent.get("labels", {}).get("en", {}) or {}).get("value")
                if cname:
                    return normalize_country(cname)

        # fallback to description text country hints
        for _, _, ent in scored:
            desc = (ent.get("descriptions", {}).get("en", {}) or {}).get("value", "")
            c = extract_country_from_text(desc)
            if c:
                return normalize_country(c)

    except Exception:
        return None
    return None


def wikipedia_country(university: str) -> str | None:
    try:
        s = session.get(
            "https://en.wikipedia.org/w/api.php",
            params={
                "action": "query",
                "list": "search",
                "srsearch": university,
                "utf8": 1,
                "format": "json",
                "srlimit": 3,
            },
            timeout=25,
        )
        s.raise_for_status()
        results = s.json().get("query", {}).get("search", [])
        if not results:
            return None

        title = results[0].get("title")
        if not title:
            return None

        summ = session.get(
            f"https://en.wikipedia.org/api/rest_v1/page/summary/{requests.utils.quote(title)}",
            timeout=25,
        )
        if summ.status_code != 200:
            return None
        data = summ.json()
        text = f"{data.get('title', '')}. {data.get('extract', '')}"
        c = extract_country_from_text(text)
        if c:
            return normalize_country(c)
    except Exception:
        return None
    return None


def resolve_country(university: str) -> tuple[str, str]:
    c = nominatim_country(university)
    if c:
        return c, "nominatim"

    c = wikidata_country(university)
    if c:
        return c, "wikidata"
    c = wikipedia_country(university)
    if c:
        return c, "wikipedia"
    return "", "unresolved"


def main():
    if not INPUT_CSV.exists():
        raise FileNotFoundError(f"Input file not found: {INPUT_CSV}")

    df = pd.read_csv(INPUT_CSV, dtype=str).fillna("")
    if "University" not in df.columns or "Country / Main Campus" not in df.columns:
        raise ValueError("Expected columns not found: 'University', 'Country / Main Campus'")

    universities = sorted(set(x.strip() for x in df["University"].tolist() if x.strip()))
    print(f"Total rows: {len(df):,}")
    print(f"Unique universities: {len(universities):,}")

    cache = {}
    if CACHE_JSON.exists():
        try:
            cache = json.loads(CACHE_JSON.read_text(encoding="utf-8"))
        except Exception:
            cache = {}

    to_process = [
        u
        for u in universities
        if (u not in cache) or (not ((cache.get(u, {}) or {}).get("country", "").strip()))
    ]
    print(f"Already cached: {len(cache):,}")
    print(f"Need fresh lookup: {len(to_process):,}")

    done = 0
    if to_process:
        with concurrent.futures.ThreadPoolExecutor(max_workers=3) as ex:
            futures = {ex.submit(resolve_country, u): u for u in to_process}
            for f in concurrent.futures.as_completed(futures):
                u = futures[f]
                try:
                    country, source = f.result()
                except Exception:
                    country, source = "", "error"
                cache[u] = {"country": country, "source": source}
                done += 1
                if done % 100 == 0 or done == len(to_process):
                    print(f"Processed {done}/{len(to_process)} fresh lookups")
                    CACHE_JSON.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")

    CACHE_JSON.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")

    google_country = []
    match_flag = []

    for _, row in df.iterrows():
        uni = row["University"].strip()
        existing = normalize_country(row["Country / Main Campus"])
        found = normalize_country((cache.get(uni, {}) or {}).get("country", ""))

        if not found:
            found = existing

        yes_no = "yes" if normalize_country(existing).lower() == normalize_country(found).lower() else "no"
        google_country.append(found)
        match_flag.append(yes_no)

    df["Country Match With Existing"] = match_flag
    df["Country as per Google"] = google_country

    with pd.ExcelWriter(OUTPUT_XLSX, engine="openpyxl") as writer:
        df.to_excel(writer, sheet_name="country_check", index=False)

    unresolved = sum(1 for u in universities if not (cache.get(u, {}) or {}).get("country"))
    print(f"Created: {OUTPUT_XLSX}")
    print(f"Unresolved universities: {unresolved}")


if __name__ == "__main__":
    start = time.time()
    main()
    print(f"Done in {(time.time()-start):.1f}s")
