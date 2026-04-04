## 1. Git hygiene

- [x] 1.1 Create `.gitignore` at the project root with: `node_modules/`, `dist/`, `.env*`, `.claude/`, `.DS_Store`, `*.local`, `coverage/`

## 2. Lint fixes

- [x] 2.1 Install `eslint-plugin-react` as a dev dependency (`npm install -D eslint-plugin-react`) and update `eslint.config.js` to add **only** the `react/jsx-uses-vars` rule (do NOT use the full recommended preset — it would add prop-types and other rules that fail on existing code)
- [x] 2.2 In `src/pages/LuckyComboPage.jsx`, remove the unused `const { t } = useTranslation()`, `const pA = calcP(outcomesA)`, and `const pB = calcP(outcomesB)` lines from the `TreeDiagram` sub-component (they duplicate computations already done in the parent and are never read inside the SVG renderer)
- [x] 2.3 In `src/pages/MagicSpinnerPage.jsx`, remove `t` from the `TreeDiagram` function's destructured props parameter — `t` is accepted but never called inside the function
- [x] 2.4 Run `npm run lint` and confirm exit code 0

## 3. Build / bundle

- [x] 3.1 Add `build.rollupOptions.output.manualChunks` to `vite.config.js` splitting vendors into four groups: `vendor-react` (react, react-dom, react-router-dom), `vendor-motion` (framer-motion), `vendor-charts` (recharts), `vendor-i18n` (i18next, react-i18next)
- [x] 3.2 Run `npm run build` and confirm no chunk exceeds 500 KB and no warnings appear

## 4. Deployment config

- [x] 4.1 Create `vercel.json` with a single catch-all rewrite: `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
- [x] 4.2 Create `public/robots.txt` with `User-agent: *` / `Allow: /`

## 5. SEO meta tags

- [x] 5.1 Add to `index.html`: `<meta name="description" content="Probability Playground — interactive games that teach probability and statistics for kids and curious minds.">`, plus `og:title`, `og:description`, `og:type=website`, and `og:image=/favicon.svg` tags
