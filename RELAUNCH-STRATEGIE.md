# Relaunch-Strategie - Arbeitsabschnitt 1

Stand: 2. Juli 2026

## 1. Strategische Leitidee

Die Website wird nicht inhaltlich neu erfunden. Ihr fachlicher Kern bleibt erhalten und
wird in einer klareren Informationsarchitektur neu gewichtet. Die künftige Website
führt zuerst betroffene Personen und Angehörige durch verständliche Einstiege. Für
Behörden und Einrichtungen entsteht ein eigener, schneller Fachzugang.

Der Auftritt soll ruhig, hochwertig und persönlich wirken, ohne werbliche Versprechen
oder behördliche Schwere. Jede Seite erfüllt eine erkennbare Aufgabe:

- Orientierung geben
- einen Begriff oder Tätigkeitsbereich verständlich erklären
- den nächsten sinnvollen Schritt zeigen
- Zuständigkeiten und Grenzen nachvollziehbar benennen

## 2. Bestandsanalyse

### 2.1 Fachlich stark und zu erhalten

| Bestehende Seite | Stärken | Entscheidung |
| --- | --- | --- |
| `index.html` | klarer Hero, verständlicher Leistungsüberblick, sichtbare Kontaktwege | Grundstruktur erhalten; Zielgruppenblock früh ergänzen und Arbeitsweise kompakter einordnen |
| `ueber-mich.html` | glaubwürdiger beruflicher Hintergrund, Registrierung und Haltung | erhalten; regionale Ausrichtung präzisieren und stärker mit der Arbeitsweise verbinden |
| `leistungen.html` | guter Verteiler zwischen den zwei Tätigkeitsbereichen, verständlicher Vergleich | als Leistungs-Hub erhalten; um den Ablauf nach Bestellung ergänzen |
| `rechtliche-betreuung.html` | fachlich präzise Erklärung, Aufgabenbereiche, Erforderlichkeit, Selbstbestimmung und Abgrenzung | weitgehend erhalten; Einstieg stärker auf Betroffene und Angehörige ausrichten, Wiederholungen kürzen |
| `verfahrenspflegschaft.html` | klare Trennung zur Betreuung, Rolle im Verfahren, Gehör, Unterlagen und Rückmeldung | weitgehend erhalten; Dateiname und sichtbare Bezeichnung auf Singular vereinheitlicht |
| `faq.html` | gute thematische Breite, Filter, Vorsorge, Zuständigkeiten und externe Fachstellen | erhalten; Fragen nach Zielgruppen und Situation priorisieren |
| `begriffe.html` | niedrigschwellige Erklärungen und gute Querverweise | erhalten; als fachliches Nachschlagewerk aus der Hauptnavigation herausnehmen |
| `fachliche-einordnung.html` | belastbare fachliche Vertiefung mit Rechtsprechungsbezug | erhalten; klar als Vertiefung für professionelle und besonders interessierte Besucher kennzeichnen |
| `kontakt.html` | klare Kontaktwege, Sprechzeiten, E-Mail-Assistent und Notfallabgrenzung | erhalten; Zielgruppenhinweise für Aktenzeichen, Fristen und Rückrufwunsch ergänzen |
| `datenschutz.html` | technische Situation der statischen Website wird abgebildet | erhalten und nur bei technischen Änderungen aktualisieren |
| `impressum.html` | rechtliche Pflichtseite | in diesem Arbeitsauftrag inhaltlich nicht bearbeiten |

### 2.2 Doppelungen und Gewichtsprobleme

- Der Leistungsüberblick auf Startseite und Leistungsseite verwendet teilweise fast
  dieselben Erklärungen und Listen. Die Startseite braucht künftig nur die kurze
  Orientierung; die Leistungsseite übernimmt Vergleich und Verteilung.
- Rechtliche Betreuung, Leistungsseite und FAQ wiederholen die Abgrenzung zu Pflege,
  Haushaltshilfe und Notfalldienst. Eine kurze Fassung genügt auf Überblicksseiten;
  die vollständige Einordnung bleibt auf der Detailseite.
- Kontakt-CTAs wiederholen auf vielen Seiten dieselben zwei Wege. Künftig soll pro
  Seite nur der inhaltlich passende nächste Schritt hervorgehoben werden.
- Fachbegriffe wie Erforderlichkeit, Aufgabenbereich, rechtliches Gehör und
  Rechtsfürsorge sind fachlich richtig, werden aber teilweise vor einer lebensnahen
  Einordnung eingeführt. Künftig steht zuerst die konkrete Situation, danach der
  Fachbegriff.
- Die professionelle Zielgruppe ist bisher über Fachliche Einordnung und Kontakt
  verteilt. Aktenzeichen, Fristen, Unterlagen und Verfahrensbezug brauchen einen
  gebündelten Zugang.
- Für Betroffene und Angehörige fehlt bislang eine Seite, die nicht mit einer
  Leistungsdefinition, sondern mit ihrer Situation und ihren Fragen beginnt.
- Der Ablauf nach gerichtlicher Bestellung ist nur indirekt aus mehreren Seiten
  ableitbar. Eine eigenständige Ablaufseite verbessert Orientierung und reduziert
  wiederkehrende Erklärungen.

### 2.3 Inhalte nach Zielgruppe

**Betroffene Personen und Angehörige**

- Was bedeutet die gerichtliche Bestellung konkret?
- Was bleibt selbstbestimmt?
- Welche Aufgaben übernimmt ein Betreuer und welche nicht?
- Was passiert als Nächstes?
- Welche Unterlagen und Angaben helfen?
- Wo gibt es allgemeine Beratung, Notfallhilfe oder praktische Unterstützung?

**Behörden und Einrichtungen**

- Tätigkeitsgebiet und Tätigkeitsbereiche
- direkte Kontaktwege und Sprechzeiten
- Aktenzeichen, Fristen und relevante Unterlagen
- sichere beziehungsweise geeignete Übermittlungswege
- sachliche Rückmeldung und Abstimmung
- klare Abgrenzung zwischen Betreuung und Verfahrenspflegschaft

## 3. Finale Sitemap

Die im Briefing genannten 13 Seiten werden um den bereits vorhandenen und für die
Navigation notwendigen Leistungs-Hub ergänzt. Damit umfasst die finale Sitemap 14
indexierbare Seiten. Die Fehlerseite bleibt außerhalb der Sitemap.

| Ebene | Seite | Vorgesehener Pfad | Rolle |
| --- | --- | --- | --- |
| 1 | Startseite | `/` | Orientierung, Zielgruppenwahl, Leistungen und Kontakt |
| 1 | Über mich | `/ueber-mich.html` | Person, Qualifikation, Haltung und Region |
| 1 | Leistungen | `/leistungen.html` | kompakter Verteiler zu drei Leistungswegen |
| 2 | Rechtliche Betreuung | `/rechtliche-betreuung.html` | verständliche Leistungs- und Aufgabenklärung |
| 2 | Verfahrenspflegschaft | `/verfahrenspflegschaft.html` | Rolle und Ablauf im konkreten Verfahren |
| 2 | Ablauf nach gerichtlicher Bestellung | `/ablauf-nach-bestellung.html` | zeitliche Orientierung vom Beschluss bis zur Abstimmung |
| 1 | Für Betroffene und Angehörige | `/fuer-betroffene-und-angehoerige.html` | niedrigschwelliger Zielgruppeneinstieg |
| 1 | Für Behörden und Einrichtungen | `/fuer-behoerden-und-einrichtungen.html` | kompakter professioneller Zugang |
| 1 | Häufige Fragen | `/faq.html` | situationsbezogene Antworten |
| 2 | Begriffe | `/begriffe.html` | Glossar und Querverweise |
| 2 | Fachliche Einordnung | `/fachliche-einordnung.html` | fachliche Vertiefung und Rechtsprechung |
| 1 | Kontakt | `/kontakt.html` | Kontaktwege, Erreichbarkeit und E-Mail-Vorbereitung |
| 3 | Datenschutz | `/datenschutz.html` | Pflichtinformation |
| 3 | Impressum | `/impressum.html` | Pflichtinformation, inhaltlich unverändert |

Bei der Umstellung von `verfahrenspflegschaften.html` auf
`verfahrenspflegschaft.html` muss der alte Pfad entweder erhalten oder dauerhaft
weitergeleitet werden, damit bestehende Links und Suchmaschinensignale nicht verloren
gehen.

## 4. Navigationskonzept

### 4.1 Hauptnavigation

1. Start
2. Über mich
3. Leistungen
4. Für Betroffene & Angehörige
5. FAQ
6. Kontakt

`Leistungen` bleibt als anklickbare Übersichtsseite erhalten und erhält ein Untermenü:

- Rechtliche Betreuung
- Verfahrenspflegschaft
- Ablauf nach gerichtlicher Bestellung

### 4.2 Fachlicher Zugang

Die Seiten für professionelle Beteiligte und fachliche Vertiefungen werden nicht als
gleichgewichtige Punkte in die Hauptnavigation gedrängt. Sie erhalten einen sichtbaren
Zugang über:

- einen Zielgruppenblock auf der Startseite
- einen Bereich `Fachliches` im Footer
- passende Querverweise auf Leistungs- und Detailseiten

`Fachliches` umfasst:

- Für Behörden und Einrichtungen
- Begriffe
- Fachliche Einordnung

### 4.3 Footer

Der Footer wird in vier logisch erkennbare Gruppen gegliedert:

- Büro und Kontakt
- Leistungen
- Orientierung und Fachliches
- Rechtliches

Datenschutz und Impressum stehen ausschließlich im Footer. Die Telefonnummer und
E-Mail-Adresse bleiben direkt erreichbar.

### 4.4 Mobile Navigation

Auf Mobilgeräten wird das Leistungs-Untermenü als aufklappbare Gruppe umgesetzt.
Alle Unterseiten müssen auch ohne Hover erreichbar sein. Die Reihenfolge entspricht
der Desktop-Navigation; Kontakt bleibt als letzter und klarer Handlungspunkt sichtbar.

## 5. Zielgruppenlogik und Nutzerwege

### 5.1 Früher Zielgruppenblock auf der Startseite

Direkt nach dem knappen Leistungsüberblick erscheint ein Block mit drei Einstiegen:

**Für betroffene Personen**

Orientierung zu Rechten, Aufgabenbereichen, Ablauf und Kontakt. Der Einstieg führt auf
die gemeinsame Zielgruppenseite und dort direkt zum Abschnitt für Betroffene.

**Für Angehörige**

Einordnung typischer Fragen, Grenzen der Betreuung und Hinweise darauf, welche Angaben
bei einer Kontaktaufnahme hilfreich sind. Der Einstieg führt auf derselben Seite zum
Angehörigen-Abschnitt.

**Für Behörden und Einrichtungen**

Tätigkeitsgebiet, Verfahrensbezug, Aktenzeichen, Fristen, Unterlagen und Kontaktwege.
Der Einstieg führt auf die professionelle Zielgruppenseite.

### 5.2 Hauptwege

**Betroffene Person**

Startseite -> Für Betroffene und Angehörige -> Ablauf nach gerichtlicher Bestellung ->
Begriffe oder FAQ -> Kontakt

**Angehörige**

Startseite -> Für Betroffene und Angehörige -> Rechtliche Betreuung -> FAQ -> Kontakt

**Gericht, Behörde oder Einrichtung**

Startseite -> Für Behörden und Einrichtungen -> gewünschter
Tätigkeitsbereich -> Kontakt

### 5.3 Inhalt der neuen Zielgruppenseiten

**Für Betroffene und Angehörige**

- verständlicher Einstieg ohne Fachwissen
- getrennte, aber auf einer Seite verbundene Abschnitte für Betroffene und Angehörige
- Selbstbestimmung und Wünsche der betroffenen Person
- typische erste Fragen
- was nach einer gerichtlichen Bestellung geschieht
- Grenzen zu Pflege, Alltagshilfe, Notfallhilfe und allgemeiner Rechtsberatung
- passende Weiterleitungen zu FAQ, Ablauf, Glossar und Kontakt

**Ablauf nach gerichtlicher Bestellung**

1. Beschluss und Aufgabenbereiche prüfen
2. erste Kontaktaufnahme und persönliches Gespräch
3. dringende Fristen und Unterlagen ordnen
4. Wünsche, Lebenssituation und bestehende Hilfen erfassen
5. notwendige Abstimmungen und rechtliche Schritte beginnen
6. weiteres Vorgehen nachvollziehbar abstimmen

Der Ablauf wird nicht als starres Versprechen formuliert. Umfang und Reihenfolge
richten sich nach Beschluss, Situation und Dringlichkeit.

**Für Behörden und Einrichtungen**

- Tätigkeitsgebiet: Burgenlandkreis, insbesondere Zeitz und Weißenfels, außerdem Gera
  und Umland
- rechtliche Betreuung und Verfahrenspflegschaft
- benötigte Angaben: Aktenzeichen, zuständige Stelle, Frist, betroffene Person und
  kurzer Anlass
- geeignete Kontakt- und Übermittlungswege
- Erreichbarkeit und Rückrufmöglichkeit
- sachliche Abgrenzung zu Notfalldienst, Pflege und allgemeiner Rechtsberatung

## 6. Tonalitätsvorgaben

### 6.1 Grundsätze

- Sie-Ansprache, außer wenn die eigene Arbeitsweise in der Ich-Form beschrieben wird
- konkrete Alltagssituation vor abstraktem Fachbegriff
- kurze Hauptsätze und kontrollierte Nebensätze
- aktive Verben statt Substantivketten
- fachliche Begriffe erklären, nicht vermeiden
- keine Erfolgs-, Verfügbarkeits- oder Rundumhilfe-Versprechen
- die betroffene Person als handelndes Subjekt beschreiben
- Grenzen ruhig als Zuständigkeitsklärung formulieren

### 6.2 Gewünschter Sprachrhythmus

Ein Absatz behandelt einen Gedanken. Ein Einstieg benennt zunächst die Situation,
danach die rechtliche Einordnung und zuletzt den möglichen nächsten Schritt.

Beispiel:

> Nach einer gerichtlichen Bestellung müssen häufig mehrere Dinge gleichzeitig
> geklärt werden: Welche Aufgabenbereiche nennt der Beschluss? Gibt es laufende
> Fristen? Welche Wünsche hat die betroffene Person? Im ersten Gespräch wird deshalb
> geordnet, was bereits feststeht und was als Nächstes veranlasst werden muss.

### 6.3 Zu vermeiden

- austauschbare Vertrauens- und Kompetenzfloskeln
- unnötig defensive Überschriften
- Begriffe wie `unkompliziert`, `maßgeschneidert` oder `in guten Händen`
- eine Sprache, die Betreuung als vollständige Übernahme des Lebens darstellt
- unklare Sammelbegriffe wie `umfassende Hilfe`
- fachliche Verdichtung ohne vorherige Alltagserklärung

## 7. Abgrenzung der Tätigkeit

### 7.1 Kurze Fassung für Übersichtsseiten

> Rechtliche Betreuung und Verfahrenspflegschaft beruhen auf gerichtlicher Bestellung
> und gelten für klar bestimmte Aufgaben oder Verfahren. Das Betreuungsbüro ist keine
> Pflegeeinrichtung, kein Notfalldienst und keine allgemeine Rechtsberatungsstelle.

### 7.2 Ausführliche Fassung für Leistungs- und Zielgruppenseiten

> Innerhalb der gerichtlichen Bestellung werden rechtliche Angelegenheiten geklärt,
> Anträge und Rückmeldungen bearbeitet und notwendige Hilfen angestoßen oder
> abgestimmt. Pflege, Haushaltshilfe, Fahrdienste, medizinische Behandlung und akute
> Krisenintervention werden von den jeweils zuständigen Diensten und Stellen erbracht.
> Eine private Beauftragung außerhalb einer gerichtlichen Bestellung ist nicht
> vorgesehen.

Die ausführliche Fassung steht zentral auf den passenden Detailseiten. Startseite und
Leistungs-Hub verwenden nur die kurze Fassung, um Wiederholungen zu vermeiden.

## 8. Verbindliche Inhaltsentscheidungen

| Inhalt | Entscheidung |
| --- | --- |
| Hero und direkte Kontaktwege | erhalten, sprachlich nur feinjustieren |
| Leistungsüberblick Startseite | auf kurze Orientierung reduzieren |
| Zielgruppenblock | neu und früh auf der Startseite einführen |
| Arbeitsweise Startseite | erhalten, aber nach Zielgruppenblock einordnen und knapp halten |
| Leistungsseite | als Hub erhalten; keine dritte ausführliche Erklärung der Detailinhalte |
| Rechtliche Betreuung | fachlichen Kern übernehmen; Einstieg lebensnäher, Dopplungen kürzen |
| Verfahrenspflegschaft | fachlichen Kern übernehmen; Benennung und URL auf Singular vereinheitlichen |
| Ablauf nach Bestellung | neue eigenständige Seite aus vorhandenen Kontakt-, Aufgaben- und Abstimmungsinhalten |
| Betroffene und Angehörige | neue gemeinsame Zielgruppenseite |
| Behörden und Einrichtungen | neue professionelle Zielgruppenseite |
| FAQ | erhalten; Fragen neu priorisieren und mit Zielgruppenseiten verknüpfen |
| Begriffe | erhalten; aus Hauptnavigation in Fachliches verschieben |
| Fachliche Einordnung | erhalten; aus Hauptnavigation in Fachliches verschieben |
| Kontakt | erhalten; Angaben für professionelle Anfragen ergänzen |
| Datenschutz | erhalten, nur technisch bedingt ändern |
| Impressum | nicht inhaltlich bearbeiten |

## 9. Leitplanken für Arbeitsabschnitt 2

- Bestehende URLs bleiben erhalten, sofern keine bewusst geplante Weiterleitung
  eingerichtet wird.
- Neue Seiten verwenden dieselben statischen technischen Grundsätze wie der Bestand.
- Keine Cookies, Analysewerkzeuge, eingebetteten Karten, externen Fonts oder unnötigen
  Skripte.
- Die Navigation wird zentral konsistent in allen HTML-Dateien umgesetzt.
- Neue Seiten erhalten individuelle Titles, Meta Descriptions, Canonicals,
  Open-Graph-Daten und Sitemap-Einträge.
- Texte bleiben auch ohne Kartenlayout verständlich und in sinnvoller Reihenfolge.
- Mobile Bedienung, Tastaturnavigation, Fokuszustände und reduzierte Bewegung werden
  von Beginn an mitgeprüft.
- Das Impressum bleibt inhaltlich unangetastet.
