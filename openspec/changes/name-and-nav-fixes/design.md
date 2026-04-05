## Context

The app uses react-i18next with `en.json` and `he.json` for all user-facing text. Game names live under `common.games.<key>`. The Climber Race quiz questions are stored as plain prose strings in both files — they predate the rename of color "characters" to plain colors, so they still contain "Sunny/Storm/שמשון/סערה" etc.

Navigation is handled by React Router v6 with `HashRouter`. There is no scroll restoration in place; `GameCard` uses `navigate(to)` which swaps the route but leaves the window scroll position wherever the home page was.

## Goals / Non-Goals

**Goals:**
- Correct three wrong/unclear Hebrew game name strings
- Automatically scroll to top on every route change
- Replace all old color-character names in Climber Race quiz prose with plain color names

**Non-Goals:**
- Redesigning any game UI
- Changing English game titles
- Touching any quiz answer correctness or question logic

## Decisions

**D1 — Scroll-to-top via a second `useEffect` in `App.jsx`**
`App.jsx` already imports `useLocation` and has a `useEffect` keyed on `location.pathname` for document title. Adding a second `useEffect` for `window.scrollTo(0, 0)` is minimal, co-located with the existing pattern, and requires no new files or dependencies. Alternative (a `<ScrollToTop>` child component) is equally valid but adds a file for a 3-line change.

**D2 — π clarification via "(פאי)" appended to Hebrew title only**
The English title "Monte Carlo π" is unambiguous in Latin-script fonts. In Hebrew UI at small sizes, `π` can render identically to `n`. Appending "(פאי)" in the Hebrew string only is the least-invasive fix and keeps the change purely in i18n files. Alternative (CSS font override) would require a React component change and adds fragility across font updates.

**D3 — Replace old color names inline in quiz strings**
The quiz strings are plain prose; there are no dynamic translation keys for "Sunny" etc. A simple find-and-replace of the 4 old names → 4 plain color names in both JSON files is the correct approach. No template changes needed.

## Risks / Trade-offs

- [Quiz readability] Replacing "Sunny" with "Yellow" in mid-sentence may feel slightly less vivid — acceptable given the user's explicit requirement for plain colors only.
- [Scroll behaviour on back navigation] Scroll-to-top on every pathname change means pressing Back will also scroll to top. This is standard web behaviour for SPAs and is acceptable here.

## Migration Plan

Deploy is automatic on merge to `main` via Vercel. No data migrations, no breaking changes, no rollback complexity. If a string is wrong post-deploy, fix it in a follow-up commit.
