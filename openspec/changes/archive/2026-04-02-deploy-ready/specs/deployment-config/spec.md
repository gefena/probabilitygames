## ADDED Requirements

### Requirement: Clean git state
The repository SHALL include a `.gitignore` that excludes `node_modules/`, `dist/`, `.env*`, `.claude/`, and common editor artefacts.

#### Scenario: node_modules excluded
- **WHEN** `git status` is run in a fresh clone after `npm install`
- **THEN** `node_modules/` does not appear as untracked

### Requirement: Zero lint errors
`npm run lint` SHALL exit with code 0. No `no-unused-vars` errors or any other errors SHALL be present.

#### Scenario: motion namespace JSX usage
- **WHEN** ESLint analyses a file that imports `motion` and uses it only as `<motion.div>`
- **THEN** no `no-unused-vars` error is reported for `motion`

### Requirement: Build produces no warnings
`npm run build` SHALL complete with no chunk-size warnings. No individual output chunk SHALL exceed 500 KB after minification.

### Requirement: Vercel SPA routing
A `vercel.json` SHALL exist at the project root with a catch-all rewrite to `index.html`, enabling direct-URL navigation if the router is changed to `BrowserRouter`.

### Requirement: Basic SEO meta tags
`index.html` SHALL include:
- `<meta name="description">` with a one-sentence description of the site
- `<meta property="og:title">` and `<meta property="og:description">`
- `<meta property="og:type" content="website">`

### Requirement: robots.txt
`public/robots.txt` SHALL exist and allow all crawlers.
