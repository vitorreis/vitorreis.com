# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run develop   # Start dev server at localhost:8000 (hot reload)
npm run build     # Production static build to /public
npm run serve     # Serve the production build locally
npm run format    # Format JS/JSX files with Prettier
npm run deploy    # Build and deploy to GitHub Pages
```

GraphQL playground is available at `http://localhost:8000/___graphql` during development.

## Architecture

This is a **Gatsby v2 static blog** with internationalization support, deployed to GitHub Pages.

**Content pipeline:**
- Blog posts are Markdown files in `/content/blog/` organized by year
- `gatsby-transformer-remark` parses frontmatter and converts Markdown to HTML
- `gatsby-node.js` queries all posts at build time, creates pages from `/src/templates/blog-post.js`, and injects prev/next navigation context

**Internationalization:**
- Posts support multiple languages (English, Portuguese, Traditional Chinese) via frontmatter `langs` field
- English posts route to `/slug/`, other languages to `/{lang}/slug/`
- `/src/utils/i18n.js` handles language name mapping and slug construction
- `gatsby-plugin-i18n` sets the default language to `en`

**Key source files:**
- `gatsby-config.js` — site metadata, plugin config (analytics ID: UA-140524142-1, sharp, prismjs, offline PWA)
- `gatsby-node.js` — `createPages` (generates post pages sorted by date, filtered by lang) and `onCreateNode` (creates slug fields)
- `src/pages/index.js` — homepage listing posts filtered by current language
- `src/templates/blog-post.js` — individual post layout with translation links and prev/next nav
- `src/components/` — `layout.js`, `bio.js`, `seo.js`

## Code Style

Prettier config (`.prettierrc`): no semicolons, double quotes, 2-space tabs, trailing commas (ES5), LF line endings.

No test suite is configured (`npm test` is a placeholder).
