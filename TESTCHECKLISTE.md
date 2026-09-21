# Testcheckliste vor dem Live-Gang

Stand: 21.09.2026 · Branch `landing-new` · lokal unter http://localhost:8778

Vor dem Durchgang einmal mit **Cmd+Shift+R** neu laden, sonst zeigt der Browser alte Dateien.

---

## 1 · Formular und Terminbuchung (das Wichtigste)

- [ ] „Demo anfragen" im Kopfbereich öffnet das Formular, nicht die Terminseite
- [ ] Absenden ohne E-Mail: rote Meldung am Feld, nichts wird gesendet
- [ ] Absenden ohne Organisation: rote Meldung am Feld
- [ ] E-Mail ohne Endung (`test@firma`) wird abgelehnt
- [ ] Vollständiges Absenden zeigt „Anfrage gesendet"
- [ ] **In HubSpot nachsehen: Kontakt ist angekommen**, mit Organisation und der Antwort auf „Wie werden Vorfälle erfasst?" im Feld `message`
- [ ] Danach erscheint „Termin wählen" und öffnet den Kalender **mit vorausgefüllter E-Mail**
- [ ] „Lieber direkt einen Termin wählen" im Formular funktioniert ebenso
- [ ] E-Mail-Feld im Hero: Eingabe wird ins Formular übernommen
- [ ] Testkontakte in HubSpot danach löschen
- [ ] Benachrichtigung bei neuen Anfragen ist in HubSpot eingerichtet (sonst liegen sie nur im CRM)

## 2 · Funktionen-Tabs (fünf Ansichten)

- [ ] Klick auf jede der fünf Pillen wechselt die Ansicht darunter
- [ ] Aktive Pille ist dunkel, die anderen weiß
- [ ] Pfeiltasten links/rechts wechseln ebenfalls
- [ ] Beim Wechsel springt die Seite nicht, die Höhe bleibt ruhig
- [ ] Sofort-Meldung: roter Mikrofonknopf **pulsiert**, Timer 0:47 sichtbar
- [ ] Datenanalyse: Balken und Kennzahlen vollständig, nichts abgeschnitten
- [ ] Sicherheitskultur: Wirkungsverlauf zeigt sechs Stationen, eine davon blau hervorgehoben

## 3 · Navigation

- [ ] Funktionen, Lösungen, Sicherheitswissen öffnen beim **Darüberfahren**, nicht erst beim Klick
- [ ] Menü bleibt offen, wenn die Maus vom Knopf zum Panel wandert
- [ ] Reihenfolge: Funktionen · Lösungen · Sicherheitswissen · Pläne · Über uns
- [ ] Jeder Menüeintrag führt auf eine existierende Seite
- [ ] Logo im Kopfbereich führt zur Startseite
- [ ] Login öffnet das Anmeldefenster; nach Absenden erscheint „Zugang bald verfügbar"
- [ ] Im Anmeldefenster stehen **keine** Demo-Zugangsdaten mehr

## 4 · Sprache

- [ ] Umschalter DE/EN oben rechts auf Startseite und Inhaltsseiten
- [ ] Auf EN stellen: **kein deutscher Text bleibt stehen** (Hero, Tabs, Fußzeile, Formular)
- [ ] Auf eine andere Seite wechseln: Englisch bleibt erhalten
- [ ] Auf Impressum/Datenschutz/AGB gibt es bewusst keinen Umschalter, Text bleibt deutsch
- [ ] Zurück auf DE: alles wieder deutsch
- [ ] Englische Überschriften brechen sauber um (sie sind kürzer als die deutschen)

## 5 · Inhalte

- [ ] Startseite: Zeile „Beinaheunfälle als Teil Ihrer Präventionsstrategie" steht über der Überschrift
- [ ] Zwischen Kopfbereich und Hero ist **keine graue Kante**
- [ ] Pläne: Abschnitt „So läuft der Pilot" mit vier Schritten
- [ ] Überall steht **fünf** Betriebe, nirgends zehn
- [ ] Über uns: drei Personen mit Foto, Bryans Bild steht **aufrecht**
- [ ] Impressum: Andrei Piatrouski, Nollendorfstraße 21a, 10777 Berlin, E-Mail klickbar
- [ ] Datenschutz: Verantwortlicher und HubSpot/OpenAI als Auftragsverarbeiter genannt
- [ ] Fußzeile: LinkedIn-Link öffnet das Unternehmensprofil, E-Mail-Link funktioniert

## 6 · Handy (Browserfenster schmal ziehen oder echtes Gerät)

- [ ] Menüknopf öffnet die Navigation, Untermenüs klappen auf
- [ ] Tabs sind erreichbar, Panels stapeln Text über Nachbau
- [ ] Formular vollständig bedienbar, Felder nicht zu flach
- [ ] Kein seitliches Scrollen auf irgendeiner Seite
- [ ] Ankündigungsleiste bricht sauber um, Hero rutscht nicht unter den Kopfbereich

## 7 · Browser und Darstellung

- [ ] Chrome und Safari gegenprüfen
- [ ] Favicon erscheint im Tab (Tab schließen und neu öffnen, Chrome merkt sich alte Symbole)
- [ ] Keine Fehler in der Entwicklerkonsole (Rechtsklick → Untersuchen → Console)
- [ ] Bilder laden alle, keine leeren Rahmen

## 8 · Vor dem Veröffentlichen

- [ ] Entscheidung zur Sicherheitsseite: EU-Hosting, Verschlüsselung, Mandantentrennung, Backups und der sichtbare Redaktionshinweis
- [ ] Entscheidung zum Vorschaubild `og-image.png` (zeigt beim Teilen noch ISO 27001 und „Unfälle verhindern")
- [ ] Zwei Wissensseiten mit 80 und 150 Wörtern: veröffentlichen oder vorerst aus dem Menü nehmen
- [ ] Rechtstexte von jemandem mit Rechtskenntnis gegenlesen lassen
- [ ] Zusammenführen mit den zwei Commits von b.stoltzenburg (Schriften, Schema-Daten)
- [ ] Nach `main` bringen, danach die Live-Seite erneut durchgehen
- [ ] Nach dem Live-Gang: Link einmal in LinkedIn oder WhatsApp einfügen und das Vorschaubild prüfen
