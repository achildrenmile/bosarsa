# Termine hinzufügen — Anleitung

## Kurzfassung

1. **Bild** vorbereiten (`.webp`-Format, im Projekt-Root ablegen)
2. **Eintrag** in `src/_data/termine.json` hinzufügen (neueste Termine oben)
3. **Bauen & Deployen** mit `bash deploy-production.sh`

---

## Schritt 1: Bild vorbereiten

- Das Bild muss im **WebP-Format** vorliegen (Eleventy kopiert keine `.jpg`-Dateien!)
- Bild im **Projekt-Root** ablegen (z. B. `bosarsa/mein-bild.webp`), NICHT in `src/`
- Empfohlene Breite: ca. 1200 px, Dateigröße unter 400 KB
- Konvertierung mit ImageMagick: `magick input.png -resize 1200x -quality 80 output.webp`

Falls kein Bild vorhanden: Das Feld `image` und `imageAlt` einfach weglassen.

---

## Schritt 2: Eintrag in termine.json

Die Datei `src/_data/termine.json` ist ein JSON-Array. Jeder Termin ist ein Objekt. **Neueste Termine kommen an den Anfang des Arrays** (vor die bestehenden Einträge).

### Vorlage (kopieren & anpassen):

```json
{
  "date": "25. April 2026",
  "tag": "veranstaltung",
  "tagLabel": "Sicherheitstag",
  "title": "Titel der Veranstaltung",
  "image": "/mein-bild.webp",
  "imageAlt": "Beschreibung des Bildes",
  "intro": "Kurze Einleitung, 1-2 Sätze.",
  "sections": [
    {
      "heading": "Abschnittsüberschrift",
      "type": "text",
      "content": "Fließtext für diesen Abschnitt."
    }
  ],
  "author": "Max Mustermann"
}
```

### Felder erklärt

| Feld        | Pflicht | Beschreibung                                                       |
|-------------|---------|---------------------------------------------------------------------|
| `date`      | Ja      | Angezeigtes Datum (Freitext, z. B. `"13. Juni 2026"`)              |
| `tag`       | Ja      | CSS-Klasse für die farbige Markierung (siehe Tag-Typen unten)       |
| `tagLabel`  | Ja      | Angezeigter Text der Markierung (z. B. `"Notfunkübung"`)           |
| `title`     | Ja      | Titel des Termins                                                   |
| `image`     | Nein    | Pfad zum Headerbild (z. B. `"/mein-bild.webp"`)                    |
| `imageAlt`  | Nein    | Alt-Text für das Bild (Barrierefreiheit)                            |
| `intro`     | Ja      | Einleitungstext (1-2 Sätze)                                        |
| `sections`  | Ja      | Array von Inhaltsabschnitten (siehe unten)                          |
| `author`    | Nein    | Autor/Quelle (wird kursiv am Ende angezeigt)                       |

### Tag-Typen

| `tag`-Wert        | Farbe | Beispiel-Label       |
|--------------------|-------|----------------------|
| `uebung`           | Grün  | Notfunkübung         |
| `veranstaltung`    | Blau  | Sicherheitstag       |

Neuen Tag-Typ hinzufügen: In `src/css/termine.css` eine neue Klasse `.article__tag--NEUERNAME` ergänzen.

### Sections (Inhaltsabschnitte)

Jeder Abschnitt hat einen `heading`, einen `type` und den Inhalt.

**Text-Abschnitt:**
```json
{
  "heading": "Überschrift",
  "type": "text",
  "content": "Der Fließtext hier."
}
```

**Tabellen-Abschnitt:**
```json
{
  "heading": "Termine",
  "type": "table",
  "columns": ["Datum", "Ort"],
  "rows": [
    ["Samstag, 25. April 2026", "Bleiburg"],
    ["Samstag, 23. Mai 2026", "Glanhofen"]
  ]
}
```

---

## Schritt 3: JSON prüfen

Vor dem Deploy sicherstellen, dass die JSON-Datei gültig ist:

```bash
nix-shell -p nodejs_20 --run "node -e \"JSON.parse(require('fs').readFileSync('src/_data/termine.json','utf8')); console.log('OK');\""
```

### Häufige Fehler

- **Typografische Anführungszeichen** (`„"`) sind in JSON nicht erlaubt! Stattdessen Unicode-Escapes verwenden: `\u201E` für „ und `\u201C` für "
- **Komma nach dem letzten Element** — JSON erlaubt kein Trailing-Comma
- **Vergessenes Komma** zwischen Einträgen im Array

---

## Schritt 4: Deployen

```bash
bash deploy-production.sh
```

Das Script kopiert alles auf den Server, baut dort das Docker-Image und startet den Container neu.

---

## Vollständiges Beispiel

So sieht `termine.json` mit zwei Einträgen aus:

```json
[
  {
    "date": "April – Oktober 2026",
    "tag": "veranstaltung",
    "tagLabel": "Sicherheitstage",
    "title": "Sicherheitstage 2026 in Kärnten",
    "image": "/sicherheitstage-2026.webp",
    "imageAlt": "Sicherheitstage 2026 Plakat",
    "intro": "Kurze Beschreibung der Veranstaltung.",
    "sections": [
      {
        "heading": "Die Termine",
        "type": "table",
        "columns": ["Datum", "Ort"],
        "rows": [
          ["Samstag, 25. April 2026", "Bleiburg"]
        ]
      },
      {
        "heading": "Weitere Infos",
        "type": "text",
        "content": "Hier steht der Fließtext."
      }
    ],
    "author": "Kärntner Zivilschutzverband"
  },
  {
    "date": "10. März 2026",
    "tag": "uebung",
    "tagLabel": "Notfunkübung",
    "title": "Notfunkübung Klagenfurt",
    "intro": "Beschreibung der Übung.",
    "sections": [
      {
        "heading": "Details",
        "type": "text",
        "content": "Alle Infos hier."
      }
    ]
  }
]
```
