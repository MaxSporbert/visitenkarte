from pathlib import Path
import re
import sys
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parents[1]
HTML_FILES = sorted(ROOT.glob("*.html"))
HREF_RE = re.compile(r'''(?:href|src)="([^"]+)"''')
TITLE_RE = re.compile(r"<title>([^<]+)</title>")
DESCRIPTION_RE = re.compile(r'<meta name="description" content="([^"]+)">')
CANONICAL_RE = re.compile(r'<link rel="canonical" href="([^"]+)">')
SITE_URL = "https://www.buero-betreuung.de"
IMPORTANT_PAGES = {
    "leistungen.html",
    "rechtliche-betreuung.html",
    "verfahrenspflegschaften.html",
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
        target = match.split("#", 1)[0]
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

      if html_file == ROOT / "404.html":
        if '<meta name="robots" content="noindex">' not in content:
          errors.append("404.html: missing noindex directive")
        continue

      title_matches = TITLE_RE.findall(content)
      description_matches = DESCRIPTION_RE.findall(content)
      canonical_matches = CANONICAL_RE.findall(content)

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
