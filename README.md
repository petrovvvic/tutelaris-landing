# Tutelaris Landing Page

A minimal, fast, and responsive landing page starter. No dependencies — just HTML, CSS, and a tiny bit of JavaScript.

## Neues Design ansehen (Branch `feature/new-design`)

Auf dem Branch `feature/new-design` liegt die Landingpage im neuen Design (Tailwind über CDN,
helles Layout, Vorlage: `NEW_DESIGN/index.html`). Die Inhalte sind identisch mit der Live-Seite.
`main` bleibt unverändert — der Branch ist **nicht** veröffentlicht.

So schaust du dir die neue Version an:

1. **Lokal (empfohlen, alles funktioniert inkl. Bilder, Video und Typeform):**

   ```bash
   git fetch origin
   git checkout feature/new-design
   python3 -m http.server 5173
   ```

   Dann http://localhost:5173 im Browser öffnen.
   Zurück zur alten Version: `git checkout main`.

2. **Direkt auf GitHub, ohne etwas herunterzuladen:**
   https://htmlpreview.github.io/?https://github.com/petrovvvic/tutelaris-landing/blob/feature/new-design/index.html
   Hinweis: Die Vorschau rendert nur eingeschränkt — Bilder mit absoluten Pfaden
   (`/assets/...`) und das Typeform-Embed können fehlen. Für eine verlässliche
   Beurteilung Variante 1 nutzen.

Wenn das Design übernommen werden soll: Pull Request von `feature/new-design` nach `main`
öffnen oder `git merge feature/new-design` auf `main`.

## Quick Start

- Open `index.html` directly in your browser, or run a simple local server:
  - Python: `python3 -m http.server 5173` then visit http://localhost:5173
  - Node: `npx serve .` (if you have `serve` installed)

## Customize

- Branding:
  - Update the brand name and title in `index.html` `<title>` and `.brand-name`.
  - Replace `assets/favicon.svg` with your icon.
  - Swap `assets/hero-placeholder.svg` with your product visual.

- Copy:
  - Edit hero, features, and about text in `index.html` sections.
  - Update the email in the Contact section (`mailto:hello@example.com`).

- Colors & theme:
  - Tweak CSS variables in `styles.css` `:root` and light-mode block.

## Structure

- `index.html` — Markup with SEO and accessible structure
- `styles.css` — Theme, layout, responsive design
- `script.js` — Mobile nav and small UX helpers
- `assets/` — Favicon and illustration placeholder
- `robots.txt` — Basic crawler policy

## SEO Tips

- Set canonical URL and real social images (OG/Twitter) in `<head>` of `index.html`.
- Fill out a real description meta and ensure heading hierarchy is meaningful.
- Add a `sitemap.xml` when you deploy multiple pages.

## Deployment

- GitHub Pages: push this folder to a `gh-pages` branch or enable Pages for `main`.
- Netlify/Vercel: drag-and-drop the folder or point to the repo; output directory is the project root.

## License

This template is provided as-is, no warranty. You’re free to adapt it for your site.

