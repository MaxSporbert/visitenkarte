from pathlib import Path
import re
import sys


ROOT = Path(__file__).resolve().parents[1]
HTML_FILES = sorted(ROOT.glob("*.html"))
HREF_RE = re.compile(r'''(?:href|src)="([^"]+)"''')


def is_external(value: str) -> bool:
    return value.startswith(("http://", "https://", "mailto:", "tel:", "#", "data:"))


def main() -> int:
    errors = []

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

    print(f"Checked {len(HTML_FILES)} HTML files successfully.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
