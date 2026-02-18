# BOS-ARSA Website — Installationsanleitung

Diese Anleitung beschreibt, wie die BOS-ARSA Homepage auf einer bestehenden Hosting-Umgebung installiert wird. Es werden keine besonderen technischen Kenntnisse benötigt — die Installation erfolgt ausschließlich durch Kopieren von Dateien.

## Voraussetzungen

- Zugang zu einem Webhosting (z. B. über FTP, SFTP oder ein Dateimanager-Panel wie cPanel, Plesk, etc.)
- Die Möglichkeit, Dateien auf den Webserver hochzuladen

## Dateien im Überblick

| Datei | Beschreibung |
|---|---|
| `index.html` | Die gesamte Website (HTML, CSS und JavaScript in einer Datei) |
| `logo.webp` | Optimiertes Logo im WebP-Format (37 KB) |
| `logo-web.png` | Logo als PNG-Fallback für ältere Browser (71 KB) |
| `favicon/favicon.ico` | Favicon im ICO-Format |
| `favicon/favicon.svg` | Favicon im SVG-Format |
| `favicon/favicon-96x96.png` | Favicon als PNG (96x96 Pixel) |
| `favicon/apple-touch-icon.png` | Icon für Apple-Geräte |
| `favicon/site.webmanifest` | Web-App-Manifest für mobile Geräte |
| `favicon/web-app-manifest-192x192.png` | App-Icon 192x192 |
| `favicon/web-app-manifest-512x512.png` | App-Icon 512x512 |

## Installation — Schritt für Schritt

### 1. Dateien herunterladen

Alle benötigten Dateien von GitHub herunterladen:

1. Öffne https://github.com/achildrenmile/bosarsa
2. Klicke auf den grünen Button **„Code"** → **„Download ZIP"**
3. Entpacke die ZIP-Datei auf deinem Computer

### 2. Dateien auf den Webserver hochladen

Verbinde dich mit deinem Webhosting (per FTP-Programm wie FileZilla oder über den Dateimanager deines Hosters) und navigiere zum **Stammverzeichnis** (Root) deiner Website. Das ist üblicherweise:

- `public_html/`
- `htdocs/`
- `www/`

Lade folgende Dateien und Ordner in das Stammverzeichnis hoch:

```
public_html/
├── index.html
├── logo.webp
├── logo-web.png
├── favicon.ico          (aus dem favicon-Ordner)
├── favicon.svg          (aus dem favicon-Ordner)
├── favicon-96x96.png    (aus dem favicon-Ordner)
├── apple-touch-icon.png (aus dem favicon-Ordner)
├── site.webmanifest     (aus dem favicon-Ordner)
├── web-app-manifest-192x192.png (aus dem favicon-Ordner)
└── web-app-manifest-512x512.png (aus dem favicon-Ordner)
```

**Wichtig:** Die Favicon-Dateien müssen direkt im Stammverzeichnis liegen (nicht in einem Unterordner), da die `index.html` sie unter `/favicon.ico`, `/favicon.svg` usw. erwartet.

### 3. Bestehende Website ersetzen

Falls bereits eine Website vorhanden ist (z. B. eine WordPress-Installation):

1. **Sicherung erstellen:** Lade die bestehende `index.html` (oder `index.php`) herunter und speichere sie als Backup auf deinem Computer
2. **Alte Datei umbenennen oder löschen:** Benenne die alte Startseite um (z. B. in `index_alt.html`) oder lösche sie
3. **Neue Datei hochladen:** Lade die neue `index.html` hoch

> **Hinweis bei WordPress:** Falls WordPress installiert ist, muss die `index.php` im Stammverzeichnis ersetzt oder umbenannt werden, damit die neue `index.html` geladen wird. Alternativ kann WordPress auch komplett deinstalliert werden, falls es nicht mehr benötigt wird.

### 4. Fertig

Die Website sollte jetzt unter deiner Domain erreichbar sein. Öffne die URL im Browser und prüfe, ob alles korrekt angezeigt wird.

## Anpassungen

### E-Mail-Adresse ändern

Die Kontakt-E-Mail `office@bos-arsa.at` ist an mehreren Stellen in der `index.html` hinterlegt. Um sie zu ändern, öffne die Datei in einem Texteditor und suche nach `office@bos-arsa.at` — ersetze alle Vorkommen durch die neue Adresse.

### Logo austauschen

Um das Logo zu ändern:

1. Erstelle eine neue Bilddatei im **WebP-Format** (empfohlen, max. 800 px breit) und benenne sie `logo.webp`
2. Erstelle zusätzlich eine **PNG-Version** als Fallback und benenne sie `logo-web.png`
3. Lade beide Dateien in das Stammverzeichnis hoch und überschreibe die bestehenden

### Vorstandsmitglieder ändern

Die Vorstandsdaten befinden sich im Abschnitt `<!-- Vorstand -->` in der `index.html`. Suche nach dem entsprechenden Namen und ändere ihn direkt im HTML.

## Fehlerbehebung

| Problem | Lösung |
|---|---|
| Logo wird nicht angezeigt | Prüfe, ob `logo.webp` und `logo-web.png` im Stammverzeichnis liegen |
| Favicon fehlt | Favicon-Dateien müssen direkt im Stammverzeichnis liegen, nicht in einem Unterordner |
| Seite wird nicht angezeigt | Stelle sicher, dass die Datei exakt `index.html` heißt (Kleinbuchstaben) |
| Alte Seite wird noch angezeigt | Browser-Cache leeren (Strg+Shift+R) oder im Inkognito-Modus öffnen |
| Schriftarten laden nicht | Die Schriftarten werden von Google Fonts geladen — eine Internetverbindung ist erforderlich |

## Kontakt

Bei Fragen zur Installation: **office@bos-arsa.at**
