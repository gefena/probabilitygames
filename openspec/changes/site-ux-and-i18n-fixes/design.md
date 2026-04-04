## Context

Current implementation lacks dynamic titles, hardcodes English in mobile headers, and uses "pre-reversed" punctuation in Hebrew to compensate for LTR environments, which is now unnecessary given the proper `dir="rtl"` support.

## Goals / Non-Goals

**Goals:**
- Implement dynamic `<title>` updates.
- Localize all header elements.
- Clean up Hebrew translations.
- Support language switching via URL.

**Non-Goals:**
- Full SEO optimization (site is a SPA with client-side routing).
- Persistent URL state for all game settings (only language).

## Decisions

### 1. Centralized Title Management
**Decision:** Implement title updates in `App.jsx` using `useEffect` listening to route and language changes.
**Rationale:** Avoids duplicating title logic in every game page. `GamePageLayout` will continue to receive the title prop, which we can potentially use or derive from the route.
**Alternatives:** Use `react-document-title` (adds dependency) or `react-helmet` (overkill for this).

### 2. URL Language Detection
**Decision:** Add a small utility in `src/i18n/index.js` or `App.jsx` to parse `lng` from either `window.location.search` or `window.location.hash` (due to `HashRouter`).
**Rationale:** Simple implementation without adding `i18next-browser-languagedetector` dependency.

### 3. Translation Key Restructuring
**Decision:** Move game titles to `common.games.<id>.title`.
**Rationale:** Game names are used in multiple places (Home page cards, Game page headers, Document titles). A shared key reduces duplication and ensures consistency.

### 4. Hebrew Punctuation Standardisation
**Decision:** Remove all leading punctuation from Hebrew strings that was added to "fake" RTL in LTR views.
**Rationale:** The application now correctly sets `dir="rtl"`, so standard punctuation at the logical end of the string will render correctly.

## Risks / Trade-offs

- **[Risk]** → URL parameter `?lng=` might conflict with some hosting environments if not handled correctly by the router.
- **[Mitigation]** → Use a robust parser that checks both search and hash parts.
- **[Risk]** → Massive update to `he.json` might introduce typos.
- **[Mitigation]** → Use automated search/replace where possible and verify key strings.
