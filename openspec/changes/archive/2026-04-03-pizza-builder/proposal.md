## Why

No game in the app teaches the multiplication principle for compound independent events — that choosing from two independent categories produces a sample space where outcomes multiply, not add. The pizza theme makes this viscerally obvious through a growing grid that kids age 10 can read without any formula.

## What Changes

- Add a new game page: **Pizza Builder** — a four-phase game where players build a pizza menu (crusts × toppings), declare a winning condition using OR statements, order random pizzas, and watch a heatmap confirm the math over time
- Add a Probability Bingo–style grid that visualises the full sample space of compound events and updates live as the menu grows
- Add route `/pizza-builder` and home page card in the Go Deeper tier after Probability Bingo

## Capabilities

### New Capabilities
- `pizza-builder-game`: 3×3-to-4×5 growing grid game teaching compound independent events, OR conditions, and the multiplication principle; includes menu builder, OR statement builder, random ordering mechanic with win/lose feedback, heatmap after 20+ orders, ExplainerPanel, and QuizPanel

### Modified Capabilities
- `home-page-tiers`: add Pizza Builder card to Go Deeper tier after Probability Bingo
- `site-shell`: add `/pizza-builder` route in `App.jsx`

## Impact

- New file: `src/pages/PizzaBuilderPage.jsx`
- New file: `src/quizzes/pizzaBuilder.js`
- Modified: `src/i18n/en.json`, `src/i18n/he.json` — new `pizzaBuilder.*` namespace
- Modified: `src/App.jsx` — new route
- Modified: `src/pages/HomePage.jsx` — new card in goDeeper tier
