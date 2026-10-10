# Betreuungsbüro Maximilian Sporbert

Statische GitHub-Pages-Website des Betreuungsbüros Sporbert.

## Struktur

- `index.html`: Startseite mit Überblick zu Tätigkeitsbereichen und Kontaktaufnahme
- `ueber-mich.html`: Persönlicher Hintergrund, Qualifikation und Registrierung
- `leistungen.html`: Zentrale Übersicht der beiden Tätigkeitsbereiche
- `rechtliche-betreuung.html`: Informationen zum Tätigkeitsbereich Rechtliche Betreuung
- `verfahrenspflegschaft.html`: Informationen zum Tätigkeitsbereich Verfahrenspflegschaft
- `fuer-betroffene-und-angehoerige.html`: Orientierung für betroffene Personen und Angehörige
- `ablauf-nach-bestellung.html`: Ablauf nach gerichtlicher Bestellung
- `fuer-behoerden-und-einrichtungen.html`: kompakter Zugang für professionelle Beteiligte
- `fachliche-einordnung.html`: Kompakte Einordnung ausgewählter Rechtsprechung
- `faq.html`: Antworten auf häufige Fragen
- `kontakt.html`: Kontaktdaten, Erreichbarkeit und digitale Kontaktkarte
- `impressum.html`: Impressum des Webauftritts
- `datenschutz.html`: Datenschutzinformationen zur statischen Website
- `assets/css/variables.css`: Design-Tokens (Farben, fünfstufige Textskala, Abstände, Tap-Ziel-Größe)
- `assets/css/styles.css`: Zentrales Stylesheet für Layout, Typografie und Responsive-Verhalten; der Abschnitt „Design-Revision Oktober 2026“ am Ende setzt den Design- und UX-Prüfbericht um
- `assets/js/availability.js`: Live-Anzeige der telefonischen Erreichbarkeit (Kopfzeile, Kontaktseite); Abwesenheiten stehen in `ABSENCES` und müssen zusammen mit den Hinweisboxen auf Startseite und Kontaktseite gepflegt werden
- `assets/js/site.js`: Mobile Navigation, FAQ- und Glossarfilter, Einblendungen, Inhaltsleiste und Akkordeons für Seiten mit `data-section-nav`, „Nach oben“-Schaltfläche
- `scripts/check_site.py`: Qualitätsprüfung (Links, Sprungmarken, SEO-Metadaten, Sitemap), läuft in der GitHub-Action
- `assets/img/og-betreuungsbuero.png`: Open-Graph-Vorschaubild
- `kontakt.vcf`: Digitale Kontaktkarte
- `CNAME`: GitHub-Pages-Domain für die Veröffentlichung

Bei Änderungen an CSS oder JS den Versionsparameter `?v=…-site-NN` in allen HTML-Dateien hochzählen.

Die Website ist vollständig statisch, GitHub-Pages-kompatibel und verwendet keine Frameworks, Build-Tools oder externen Bibliotheken.
