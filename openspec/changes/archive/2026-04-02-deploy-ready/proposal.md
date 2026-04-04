## Why

The site is built and fully functional but not yet ready to push to GitHub or deploy to Vercel. A pre-launch audit found: no `.gitignore` (node_modules and dist would be committed), 15 ESLint errors that block a clean CI run, a 934 KB JS bundle that triggers Vite's chunk-size warning, missing SEO meta tags, and no `robots.txt`. All must be fixed before the repo goes public.

## What Changes

- Add `.gitignore` to keep `node_modules/`, `dist/`, `.claude/`, and editor artefacts out of git
- Fix 3 real lint bugs: unused `t`, `pA`, `pB` in the `TreeDiagram` sub-components of `LuckyComboPage` and `MagicSpinnerPage`
- Fix 12 `motion`-unused false-positive lint errors by adding `eslint-plugin-react` with the `react/jsx-uses-vars` rule
- Add `manualChunks` to Vite config to split vendor libraries (React, Recharts, Framer Motion, i18next) into separate chunks, eliminating the >500 KB bundle warning
- Add `<meta name="description">` and Open Graph tags to `index.html`
- Add `public/robots.txt` (allow all)
- Add `vercel.json` with SPA rewrite rule so the site can optionally migrate to `BrowserRouter` in the future without breaking direct URL navigation; harmless with the current `HashRouter`

## Capabilities

### New Capabilities

- `deployment-config`: Site has all files needed for a clean GitHub push and Vercel deploy

### Modified Capabilities

*(none — no spec-level behaviour changes)*

## Impact

- `.gitignore` — new file
- `eslint.config.js` — add `eslint-plugin-react`
- `package.json` — add `eslint-plugin-react` as dev dependency
- `vite.config.js` — add `build.rollupOptions.output.manualChunks`
- `index.html` — add meta description + OG tags
- `public/robots.txt` — new file
- `vercel.json` — new file
- `src/pages/LuckyComboPage.jsx` — remove unused vars in `TreeDiagram`
- `src/pages/MagicSpinnerPage.jsx` — remove unused `t` param from `TreeDiagram`
