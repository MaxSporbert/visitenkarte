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
- `was-ist-betreuung-und-was-nicht.html`: Abgrenzung, was rechtliche Betreuung leistet und was nicht
- `faq.html`: Antworten auf häufige Fragen (Suche und Themenfilter)
- `begriffe.html`: Glossar „Begriffe kurz erklärt“ (Suche)
- `kontakt.html`: Kontaktdaten, Erreichbarkeit und digitale Kontaktkarte
- `impressum.html`: Impressum des Webauftritts
- `datenschutz.html`: Datenschutzinformationen zur statischen Website
- `assets/css/variables.css`: Design-Tokens des Editorial-Systems (Papier- und Tintenfarben, Typografieskala `--t-xs` … `--t-title`, Abstände 8/16/24/40/64, Tap-Ziel 44 px)
- `assets/css/styles.css`: Zentrales Stylesheet: 12-Spalten-Raster, Büttenpapier-Textur, Kopf, Startseitenblöcke, Artikelvorlage (Inhaltsverzeichnis, Kapitel, Randspalte), Rechtstexte, Footer
- `assets/js/availability.js`: Live-Anzeige der telefonischen Erreichbarkeit (Kopfzeile, Kontaktseite); Abwesenheiten stehen in `ABSENCES` und müssen zusammen mit den Hinweisboxen auf Startseite und Kontaktseite gepflegt werden
- `assets/js/site.js`: Mobile Navigation, Suche und Filter (`data-filter-*`), Markierung im Inhaltsverzeichnis, mobile Akkordeons für Kapitel und Rechtstexte (`data-collapse`), „Nach oben“-Schaltfläche
- `scripts/check_site.py`: Qualitätsprüfung (Links, Sprungmarken, SEO-Metadaten, Sitemap), läuft in der GitHub-Action
- `assets/img/og-betreuungsbuero.png`: Open-Graph-Vorschaubild
- `kontakt.vcf`: Digitale Kontaktkarte
- `CNAME`: GitHub-Pages-Domain für die Veröffentlichung

Gestaltungsregeln (Editorial): Grafiken als Inline-SVG statt Fotos, kein Logo, keine dunklen Bänder, nur Kontur-Schaltflächen, Akzent nur als Linie oder Kursive, keine erklärenden Randtexte.

Bei Änderungen an CSS oder JS den Versionsparameter `?v=…-site-NN` in allen HTML-Dateien hochzählen.

Die Website ist vollständig statisch, GitHub-Pages-kompatibel und verwendet keine Frameworks, Build-Tools oder externen Bibliotheken.
