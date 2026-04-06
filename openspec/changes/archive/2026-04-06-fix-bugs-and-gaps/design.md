## Context

The site has 26 interactive probability games deployed on Vercel. During review, we found two broken suggestion links, a missing 404 route, one game without a quiz, and a minor redundant-span issue in the header. All games use a consistent structure (GamePageLayout, ExplainerPanel, QuizPanel, GameSuggestions) except House Always Wins which lacks a QuizPanel.

## Goals / Non-Goals

**Goals:**
- Fix all broken navigation so users never land on a blank page
- Bring House Always Wins into full consistency with the other 25 games by adding a quiz
- Clean up the redundant header span

**Non-Goals:**
- Code splitting / lazy loading (separate performance initiative)
- Adding PersonalBest to more games (separate feature work)
- Adding a footer or additional site chrome
- Changing game content or mechanics

## Decisions

### 1. Fix gameConnections.js link targets
**Decision**: Change `/lucky-dice` → `/dice` and `common.games.lucky-dice` → `common.games.dice` in the two affected entries (lines 32 and 107).
**Rationale**: The route is `/dice` (mapped to `LuckyDicePage`), and the i18n key is `common.games.dice`. The `/lucky-dice` route and key never existed — this was a naming inconsistency introduced when the game was originally added.

### 2. 404 page as inline component in App.jsx
**Decision**: Add a simple `NotFoundPage` directly in App.jsx (no new file) with a `<Route path="*">` catch-all as the last route. The page shows an emoji, a translated message, and a "Back to Games" button using the existing pill-chip style.
**Rationale**: This is a small component (~15 lines). Creating a separate file would be overkill. The catch-all route must be last in the `<Routes>` block. i18n keys will be added under `notFound.*`.

### 3. House Always Wins quiz content
**Decision**: Create `src/quizzes/houseAlwaysWins.js` with 3 questions covering: (1) what expected value means, (2) why the house always wins long-term, (3) which game has the lowest house edge. Follow the exact same pattern as all other quiz files (array of `{ question, options: [{ label, correct? }], explanation }`).
**Rationale**: 3 questions matches the typical quiz length across the site. Topics align with what the game teaches. The quiz is wired into the page the same way as all other games — import + `<QuizPanel questions={...} />`.

### 4. Fix redundant header spans
**Decision**: Replace the two `<span>` elements (one `hidden sm:inline`, one `sm:hidden`) with a single `<span>` since they both render `t('site.title')` identically.
**Rationale**: The original intent may have been to show a shorter title on mobile, but both spans use the same i18n key. A single span achieves the same visual result with less DOM.

## Risks / Trade-offs

- **[Low] Quiz content quality** — The 3 quiz questions need to be pedagogically sound and match the game's teaching goals. Mitigation: model questions on the existing `houseAlwaysWins.explainer.*` content and the real-world odds section.
- **[Low] Hebrew translations for new keys** — New i18n keys (404 page, quiz) need Hebrew translations. Mitigation: add them in the same PR; the existing pattern makes this straightforward.
