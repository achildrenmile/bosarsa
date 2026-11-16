# Sync mit Live-Stand (2026-11)

Quelle: Live-Site https://bosarsa.oeradio.at. Das Image `ghcr.io/achildrenmile/bosarsa:20260904` (Pod `bosarsa-app`, Namespace `bosarsa`) enthaelt nur gebautes HTML in `/usr/share/nginx/html`. Auf dem Build-Host liegt kein Quell-Repo. Der Live-Stand wurde read-only per `kubectl exec tar` gelesen, nichts wurde veraendert, neu gestartet oder deployt.

Die Quellen wurden aus dem gebauten HTML rekonstruiert. **Es konnte nicht gebaut werden** (lokal kein Node). Geprueft wurde nur per Textvergleich der Daten mit dem Live-HTML. Vor dem Merge `npm run build` ausfuehren und `_site` mit dem Live-Stand vergleichen.

## Unterschiede (Live gewinnt)
- Neuer Presseartikel `htl-villach-2026` ("Amateurfunk zum Angreifen", 8. Juli 2026) in `src/_data/presse.json`, Bild `presse-htl-villach-2026.webp`.
- Neue Termine `sommerpause-2026` (19.07.–13.09.2026) und `freizeitmesse-2026` in `src/_data/termine.json`, Bilder `sommerpause-2026.webp`, `freizeitmesse-2026.webp`.
- Alle Presse- und Termin-Eintraege haben jetzt einen `slug`. Es gibt Detailseiten `/presse/<slug>/` (`src/presse-detail.njk`) und `/termine/<slug>/` (`src/termine-detail.njk`). Die Listen verlinken darauf.
- `src/_includes/base.njk`: og:image pro Seite (`ogImage`, `ogImageAlt`), CSS `?v=6`.
- `src/sitemap.njk`: Presse-Detailseiten ergaenzt.
- `src/css/base.css`, `src/css/termine.css` durch Live-Versionen ersetzt, neu `src/css/aktuelles.css`.
- Unveraendert: index, krisenkommunikation, impressum, datenschutz, nav, footer, llms, robots (Unterschiede nur durch Template-Variablen).

## Offen / nicht verifiziert
- `legacy/aktuelles/` (plus Passthrough in `.eleventy.js`): im Live-Stand vorhandene Seiten `/aktuelles/`, deren Quelle unbekannt ist (verwaist, nicht verlinkt). Als fertiges HTML uebernommen.
- Die Templates `*-detail.njk` sind aus dem gerenderten HTML abgeleitet, nicht aus Originalquellen. Kleine Abweichungen im Markup sind moeglich.
- Das Repo enthaelt eine getrackte `.env.production`. Inhalt wurde nicht gelesen und nicht ausgegeben. Bitte pruefen, ob sie Secrets enthaelt.
