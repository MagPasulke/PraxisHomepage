# Technik-Manual – Homepage Gemeinschaftspraxis Soika

Dieses Dokument beschreibt die technische Grundlage der Website sowie den Ablauf, wie Änderungen gemacht und veröffentlicht (gepusht) werden.

Live-Adresse: **https://www.gemeinschaftspraxis-soika.de**

---

## 1. Technik-Überblick

| Bereich | Technologie |
| --- | --- |
| Framework | [Astro](https://astro.build) (statische Website, `output: "static"`) |
| Styling | [Tailwind CSS](https://tailwindcss.com) (via `@tailwindcss/vite`) |
| UI-Komponenten | [Porsche Design System](https://designsystem.porsche.com) (`@porsche-design-system/components-js`) |
| Inhalte | JSONC-Dateien im Ordner `content/` |
| Hosting | GitHub Pages |
| Auslieferung | Eigene Domain (Custom Domain) über IONOS-DNS |
| CI/CD | GitHub Actions (automatisches Deployment bei jedem Push auf `main`) |

Die Seite wird **statisch gebaut**: Aus den Quelldateien entsteht reines HTML/CSS/JS. Es gibt keinen laufenden Server und keine Datenbank – das macht die Seite schnell, sicher und wartungsarm.

---

## 2. Projektstruktur

```
astro.config.mjs        Astro-Konfiguration (Domain, Build-Modus)
package.json            Abhängigkeiten und Skripte
content/                Alle Texte/Daten als JSONC
  aktuelles.jsonc       Aktuelles (Urlaube, Hinweise)
  leistungen.jsonc      Leistungen
  standorte.jsonc       Standorte & Öffnungszeiten
  team.jsonc            Team (Ärzte & MFA)
public/                 Statische Dateien (werden 1:1 übernommen)
  CNAME                 Custom-Domain-Definition für GitHub Pages
  images/team/          Team-Fotos
  images/misc/          Sonstige Bilder
src/
  layouts/BaseLayout.astro   Grundgerüst (Header, Footer, <head>)
  pages/index.astro          Startseite
  pages/impressum.astro      Impressum
  pages/datenschutz.astro    Datenschutzerklärung
  components/TeamSlider.astro Team-Komponente
  styles/global.css          Globale Styles
.github/workflows/deploy.yml  Automatisches Deployment
```

---

## 3. Lokale Entwicklung

Voraussetzung: [Node.js](https://nodejs.org) (LTS) installiert.

```sh
npm install        # Abhängigkeiten einmalig installieren
npm run dev        # Lokalen Entwicklungsserver starten (http://localhost:4321)
npm run build      # Produktions-Build erzeugen (Ordner dist/)
npm run preview    # Den Build lokal testen
```

Während `npm run dev` läuft, werden Änderungen sofort im Browser sichtbar.

---

## 4. Inhalte pflegen

Alle Texte und Daten liegen in `content/` als **JSONC** (JSON mit `//`-Kommentaren).

| Was | Datei |
| --- | --- |
| Aktuelles (Urlaube, Hinweise) | `content/aktuelles.jsonc` |
| Leistungen | `content/leistungen.jsonc` |
| Standorte & Öffnungszeiten | `content/standorte.jsonc` |
| Team (Ärzte & MFA) | `content/team.jsonc` |

- **Bilder**: Team-Fotos nach `public/images/team/`, sonstige Bilder nach `public/images/misc/`. Pfade in den JSONC-Dateien beginnen mit `/images/...`.
- **Rechtstexte**: direkt in `src/pages/impressum.astro` und `src/pages/datenschutz.astro`.

---

## 5. Änderungen veröffentlichen (Push & Deployment)

Die Seite wird **automatisch** neu gebaut und veröffentlicht, sobald Änderungen auf den `main`-Branch gepusht werden. Manuelles Hochladen ist nicht nötig.

### Standard-Ablauf

```sh
# 1. Änderungen vornehmen (Dateien bearbeiten)

# 2. (Optional) lokal prüfen
npm run build

# 3. Änderungen einchecken und pushen
git add -A
git commit -m "Kurze Beschreibung der Änderung"
git push
```

### Was danach automatisch passiert

1. Der Push auf `main` startet den GitHub-Actions-Workflow `.github/workflows/deploy.yml`.
2. Astro baut die Seite (`withastro/action`).
3. Das Ergebnis wird auf GitHub Pages veröffentlicht (`actions/deploy-pages`).
4. Nach wenigen Minuten ist die Änderung unter der Live-Domain sichtbar.

Den Status der Veröffentlichung sieht man im Repository unter **Actions**.

---

## 6. Domain & Hosting (Custom Domain)

Die Seite läuft auf GitHub Pages und wird über die eigene Domain ausgeliefert.

### Zusammenspiel der Bausteine

- **`astro.config.mjs`**: `site: 'https://www.gemeinschaftspraxis-soika.de'`, kein `base` (Seite liegt auf der Wurzel `/`).
- **`public/CNAME`**: enthält `www.gemeinschaftspraxis-soika.de` – teilt GitHub Pages die Domain mit (wird bei jedem Build mitausgeliefert).
- **GitHub → Settings → Pages**: Custom Domain gesetzt, „Enforce HTTPS" aktiv.

### DNS-Einträge bei IONOS

| Typ | Host | Wert |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `magpasulke.github.io` |

- Die vier A-Records leiten die nackte Domain (`gemeinschaftspraxis-soika.de`) auf GitHub; diese wird automatisch auf `www` umgeleitet.
- Der CNAME verbindet `www` mit GitHub Pages.
- Es darf **keine** IONOS-Weiterleitung aktiv sein (sonst Konflikt + fremder Cookie-Banner).

### DNS prüfen (optional)

```sh
dig +short gemeinschaftspraxis-soika.de A
dig +short www.gemeinschaftspraxis-soika.de CNAME
```

---

## 7. Wichtige Hinweise

- **Pfade immer ab der Wurzel** (`/images/...`, `/impressum`). Da kein `base` gesetzt ist, dürfen keine doppelten Slashes (`//images/...`) entstehen – sonst brechen Bilder/Links.
- **CNAME-Datei nicht löschen**: `public/CNAME` muss erhalten bleiben, sonst verliert GitHub Pages die Domain.
- **Nur auf `main` pushen** löst ein Deployment aus.
- **E-Mail-DNS-Einträge** (MX, TXT, `autodiscover` …) bei IONOS nie anfassen – die gehören zum E-Mail-Betrieb, nicht zur Website.
