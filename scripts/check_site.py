from pathlib import Path
import json
import re
import sys
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parents[1]
HTML_FILES = sorted(ROOT.glob("*.html"))
HREF_RE = re.compile(r'''(?:href|src)="([^"]+)"''')
TITLE_RE = re.compile(r"<title>([^<]+)</title>")
DESCRIPTION_RE = re.compile(r'<meta name="description" content="([^"]+)">')
CANONICAL_RE = re.compile(r'<link rel="canonical" href="([^"]+)">')
H1_RE = re.compile(r"<h1(?:\s[^>]*)?>.*?</h1>", re.DOTALL)
OG_TITLE_RE = re.compile(r'<meta property="og:title" content="([^"]+)">')
OG_DESCRIPTION_RE = re.compile(r'<meta property="og:description" content="([^"]+)">')
OG_URL_RE = re.compile(r'<meta property="og:url" content="([^"]+)">')
JSON_LD_RE = re.compile(
    r'<script type="application/ld\+json">\s*(.*?)\s*</script>',
    re.DOTALL,
)
SITE_URL = "https://www.buero-betreuung.de"
IMPORTANT_PAGES = {
    "leistungen.html",
    "rechtliche-betreuung.html",
    "verfahrenspflegschaft.html",
    "fuer-betroffene-und-angehoerige.html",
    "ablauf-nach-bestellung.html",
    "fuer-behoerden-und-einrichtungen.html",
    "kontakt.html",
    "faq.html",
    "begriffe.html",
    "fachliche-einordnung.html",
    "impressum.html",
    "datenschutz.html",
}


def is_external(value: str) -> bool:
    return value.startswith(("http://", "https://", "mailto:", "tel:", "#", "data:"))


def main() -> int:
    errors = []
    titles = {}
    descriptions = {}
    canonicals = {}
    internal_html_targets = set()

    for html_file in HTML_FILES:
      content = html_file.read_text(encoding="utf-8")
      for match in HREF_RE.findall(content):
        target = match.split("#", 1)[0].split("?", 1)[0]
        if not target or is_external(target):
          continue
        if target.startswith("/"):
          resolved = ROOT / target.lstrip("/")
        else:
          resolved = (html_file.parent / target).resolve()
        if not resolved.exists():
          errors.append(f"{html_file.name}: missing target {match}")
        elif resolved.suffix == ".html":
          internal_html_targets.add(resolved.name)

      if "github.io" in content:
        errors.append(f"{html_file.name}: contains a GitHub Pages URL")
      if re.search(r"http://(?:www\.)?buero-betreuung\.de", content):
        errors.append(f"{html_file.name}: contains an HTTP site URL")

      is_noindex = bool(re.search(r'<meta name="robots" content="[^"]*noindex', content))
      if html_file == ROOT / "404.html":
        if not is_noindex:
          errors.append("404.html: missing noindex directive")
        continue
      if is_noindex:
        continue

      title_matches = TITLE_RE.findall(content)
      description_matches = DESCRIPTION_RE.findall(content)
      canonical_matches = CANONICAL_RE.findall(content)
      h1_matches = H1_RE.findall(content)
      og_title_matches = OG_TITLE_RE.findall(content)
      og_description_matches = OG_DESCRIPTION_RE.findall(content)
      og_url_matches = OG_URL_RE.findall(content)

      if len(title_matches) != 1:
        errors.append(f"{html_file.name}: expected exactly one title")
      else:
        titles[html_file.name] = title_matches[0]

      if len(description_matches) != 1:
        errors.append(f"{html_file.name}: expected exactly one meta description")
      else:
        descriptions[html_file.name] = description_matches[0]

      if len(canonical_matches) != 1:
        errors.append(f"{html_file.name}: expected exactly one canonical")
      else:
        expected = SITE_URL + ("/" if html_file.name == "index.html" else f"/{html_file.name}")
        canonical = canonical_matches[0]
        canonicals[html_file.name] = canonical
        if canonical != expected:
          errors.append(f"{html_file.name}: canonical must be {expected}")

      if len(h1_matches) != 1:
        errors.append(f"{html_file.name}: expected exactly one h1")
      if len(og_title_matches) != 1:
        errors.append(f"{html_file.name}: expected exactly one og:title")
      if len(og_description_matches) != 1:
        errors.append(f"{html_file.name}: expected exactly one og:description")
      if len(og_url_matches) != 1:
        errors.append(f"{html_file.name}: expected exactly one og:url")
      elif canonical_matches and og_url_matches[0] != canonical_matches[0]:
        errors.append(f"{html_file.name}: og:url must match canonical")

    for label, values in (("title", titles), ("meta description", descriptions)):
      duplicates = {value for value in values.values() if list(values.values()).count(value) > 1}
      for duplicate in sorted(duplicates):
        pages = ", ".join(name for name, value in values.items() if value == duplicate)
        errors.append(f"duplicate {label} in {pages}")

    missing_internal_pages = IMPORTANT_PAGES - internal_html_targets
    for page in sorted(missing_internal_pages):
      errors.append(f"important page is not internally linked: {page}")

    robots_content = (ROOT / "robots.txt").read_text(encoding="utf-8")
    expected_robots = (
      "User-agent: *\n"
      "Allow: /\n\n"
      f"Sitemap: {SITE_URL}/sitemap.xml\n"
    )
    if robots_content != expected_robots:
      errors.append("robots.txt: content differs from the required open configuration")

    try:
      sitemap_root = ET.parse(ROOT / "sitemap.xml").getroot()
      namespace = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
      sitemap_urls = [element.text for element in sitemap_root.findall("sm:url/sm:loc", namespace)]
    except (ET.ParseError, OSError) as error:
      errors.append(f"sitemap.xml: cannot parse ({error})")
      sitemap_urls = []

    expected_sitemap_urls = set(canonicals.values())
    if set(sitemap_urls) != expected_sitemap_urls:
      missing = expected_sitemap_urls - set(sitemap_urls)
      extra = set(sitemap_urls) - expected_sitemap_urls
      if missing:
        errors.append(f"sitemap.xml: missing URLs: {', '.join(sorted(missing))}")
      if extra:
        errors.append(f"sitemap.xml: unexpected URLs: {', '.join(sorted(extra))}")
    if len(sitemap_urls) != len(set(sitemap_urls)):
      errors.append("sitemap.xml: contains duplicate URLs")

    all_text_files = [
      *HTML_FILES,
      ROOT / "kontakt.vcf",
      ROOT / "sitemap.xml",
      ROOT / "robots.txt",
    ]
    for path in all_text_files:
      content = path.read_text(encoding="utf-8")
      if "Dietendorf 7" in content:
        errors.append(f"{path.name}: contains the removed street address")
      if "0176 41233015" in content or "036693 164997" in content:
        errors.append(f"{path.name}: contains a national phone or fax format")
      for tel_link in re.findall(r'href="(tel:[^"]+)"', content):
        if " " in tel_link or not re.fullmatch(r"tel:\+\d+", tel_link):
          errors.append(f"{path.name}: invalid tel link {tel_link}")

    index_content = (ROOT / "index.html").read_text(encoding="utf-8")
    json_ld_matches = JSON_LD_RE.findall(index_content)
    if len(json_ld_matches) != 1:
      errors.append("index.html: expected exactly one JSON-LD block")
    else:
      try:
        structured_data = json.loads(json_ld_matches[0])
      except json.JSONDecodeError as error:
        errors.append(f"index.html: invalid JSON-LD ({error})")
      else:
        expected_structured_data = {
          "name": "Betreuungsbüro Maximilian Sporbert",
          "url": f"{SITE_URL}/",
          "email": "kontakt@buero-betreuung.de",
          "telephone": "+4917641233015",
          "faxNumber": "+4936693164997",
        }
        for key, expected_value in expected_structured_data.items():
          if structured_data.get(key) != expected_value:
            errors.append(f"index.html: JSON-LD {key} must be {expected_value}")

        expected_regions = {"Burgenlandkreis", "Zeitz", "Weißenfels", "Gera", "Umland"}
        if set(structured_data.get("areaServed", [])) != expected_regions:
          errors.append("index.html: JSON-LD areaServed is incomplete")

    required = [
      ROOT / "404.html",
      ROOT / "robots.txt",
      ROOT / "sitemap.xml",
      ROOT / "assets" / "css" / "styles.css",
      ROOT / "assets" / "js" / "site.js",
      ROOT / "assets" / "js" / "availability.js",
    ]

    for path in required:
      if not path.exists():
        errors.append(f"missing required file: {path.relative_to(ROOT)}")

    if errors:
      for error in errors:
        print(error)
      return 1

    print(
      f"Checked {len(HTML_FILES)} HTML files, {len(canonicals)} canonicals, "
      f"{len(sitemap_urls)} sitemap URLs and SEO metadata successfully."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
