# Tutelaris Landing Page

A minimal, fast, and responsive landing page starter. No dependencies — just HTML, CSS, and a tiny bit of JavaScript.

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

