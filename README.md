# Gemeinschaftspraxis Soika – Homepage

Statische Website auf Basis von [Astro](https://astro.build) + Tailwind CSS. Deployment erfolgt automatisch über GitHub Pages.

Live: **https://magpasulke.github.io/PraxisHomepage/**

## Inhalte pflegen

Alle Texte und Daten liegen im Ordner [`content/`](content/) als JSONC-Dateien (JSON mit `//`-Kommentaren). Nach jedem Speichern und Pushen auf `main` wird die Seite automatisch neu gebaut und veröffentlicht.

| Was | Datei |
| --- | --- |
| Aktuelles (Urlaube, Hinweise) | [content/aktuelles.jsonc](content/aktuelles.jsonc) |
| Leistungen | [content/leistungen.jsonc](content/leistungen.jsonc) |
| Standorte & Öffnungszeiten | [content/standorte.jsonc](content/standorte.jsonc) |
| Team (Ärzte & MFA) | [content/team.jsonc](content/team.jsonc) |

### Aktuelles (z. B. Urlaub)
In [content/aktuelles.jsonc](content/aktuelles.jsonc) im `news`-Array Einträge ergänzen oder löschen:

```jsonc
{ "title": "Sommerurlaub 2026", "date": "2026-07-15", "text": "Praxis geschlossen bis 02.08.2026." }
```

Bei leerem `news`-Array wird der Aktuelles-Block automatisch ausgeblendet.

### Öffnungszeiten / Kontakt
In [content/standorte.jsonc](content/standorte.jsonc) je Standort `phone`, `fax`, `email` und `hours` (Mo–Fr) anpassen.

### Team
In [content/team.jsonc](content/team.jsonc) unter `aerzte` bzw. `mfa` Personen pflegen. Foto-Pfad zeigt auf `/images/team/...` – Bild zusätzlich in [public/images/team/](public/images/team/) ablegen.

### Bilder
- Team-Fotos: `public/images/team/`
- Sonstige Bilder: `public/images/misc/`

## Rechtstexte
- [src/pages/impressum.astro](src/pages/impressum.astro)
- [src/pages/datenschutz.astro](src/pages/datenschutz.astro)

## Lokal entwickeln

```bash
npm install      # einmalig
npm run dev      # Vorschau unter localhost
npm run build    # Produktions-Build prüfen
```

## Veröffentlichen
Änderungen committen und auf `main` pushen – der GitHub-Actions-Workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) baut und deployt automatisch.
