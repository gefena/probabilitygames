## Why

The app works well functionally but several small UX gaps reduce the sense of quality and completion: the quiz loops silently with no acknowledgment, the explainer panel is always fully open adding scroll weight on mobile, route transitions are hard cuts, every game page looks identical at the top with no visual connection to its home card, and the home page drops directly into the game grid with no orienting moment. All five issues have low-risk, additive fixes.

## What Changes

- **QuizPanel**: Track per-cycle answer history; show a completion summary card (score + coloured dot row) between cycles before looping back to Q1
- **ExplainerPanel**: Make the panel collapsible — open by default, title row acts as a toggle; remembers state within the session
- **AppLayout**: Add a 150ms fade transition between routes using Framer Motion (already in bundle)
- **GamePageLayout**: Add a subtle coloured top accent bar derived from a pathname→colour lookup table; no changes needed to individual game pages
- **HomePage**: Give the subtitle area a light card treatment so the eye has somewhere to land before the game grid begins

## Capabilities

### New Capabilities
- `quiz-cycle-summary`: Show score and per-answer dot history at end of each quiz cycle
- `collapsible-explainer`: ExplainerPanel can be collapsed/expanded by the user
- `route-fade-transition`: Smooth 150ms opacity fade between route changes
- `game-page-accent`: Coloured top bar on game pages matched to the game's home card colour
- `home-hero`: Compact visual treatment for the home page subtitle/welcome area

### Modified Capabilities

## Impact

- `src/components/QuizPanel.jsx` — cycle history state, summary screen
- `src/components/ExplainerPanel.jsx` — collapsible toggle
- `src/components/AppLayout.jsx` — AnimatePresence + route fade
- `src/components/GamePageLayout.jsx` — accent bar + pathname lookup table
- `src/pages/HomePage.jsx` — hero card treatment
