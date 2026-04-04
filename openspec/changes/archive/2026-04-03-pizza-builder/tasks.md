## 1. i18n keys

- [x] 1.1 Add `pizzaBuilder.*` namespace to `en.json`: `title`, `emoji`, `subtitle`, `howToPlay`, `addCrust`, `addTopping`, `removeCrust`, `removeTopping`, `winnerHint`, `winCount`, `noWinners`, `noWinnersHint`, `orderBtn`, `win`, `lose`, `ordersLabel`, `heatmapTitle`, `heatmapEven`, `heatmapUneven`, `resetBtn`
- [x] 1.2 Add `pizzaBuilder.crust.*`: `thin`, `thick`, `sourdough`, `deepDish`
- [x] 1.3 Add `pizzaBuilder.topping.*`: `mushroom`, `pepper`, `cheese`, `olive`, `pepperoni`
- [x] 1.4 Add `pizzaBuilder.explainer.*`: `title`, `body`, `example`, `callout`, `furtherReading`
- [x] 1.5 Add `quiz.pizzaBuilder.q1/q2/q3` — questions about why combinations multiply, what OR means on the grid, and why thin+mushroom is the same cell regardless of order
- [x] 1.6 Add `home.games.pizzaBuilder.title` and `home.games.pizzaBuilder.desc`
- [x] 1.7 Translate all above keys to Hebrew in `he.json`

## 2. Quiz file

- [x] 2.1 Create `src/quizzes/pizzaBuilder.js` — export array of 3 quiz question objects referencing `quiz.pizzaBuilder.q*` keys

## 3. PizzaBuilderPage

- [x] 3.1 Create `src/pages/PizzaBuilderPage.jsx` with state: `crusts` (string[]), `toppings` (string[]), `winners` (Set of `"ci|ti"` keys), `orders` (`{ ci, ti, key, isWin }[]`), `lastOrder` (null | order object), `isOrdering` boolean
- [x] 3.2 Implement pure helpers: `cellKey(ci, ti)`, `pruneWinners(winners, crusts, toppings)` (filters out stale keys), `cellCount(orders, ci, ti)`, `isEvenSpread(orders, crusts, toppings)` (no cell at 0 AND max ≤ 1.5× expected)
- [x] 3.3 Implement menu builder UI: two rows of chips (crusts and toppings), each with a remove ✕ button; remove calls `pruneWinners` AND resets `orders`/`lastOrder`; "+ Add Crust" / "+ Add Topping" buttons open an inline picker showing only items not yet on the menu; picker closes on selection; buttons hidden when all items from `ALL_CRUSTS`/`ALL_TOPPINGS` are added; default crusts `['thin','thick']`, default toppings `['mushroom','pepper']`
- [x] 3.4 Implement the grid: rows = crusts, columns = toppings; each cell shows the topping emoji; row headers = crust name (tappable); column headers = topping name (tappable); cell tap toggles winner; row/column header tap bulk-toggles; winner cells glow violet; winner count label below grid
- [x] 3.5 Implement `doOrder()`: guard `isOrdering`; pick `ci` and `ti` randomly; after 350ms set `lastOrder` and append to `orders`; show win/lose message with AnimatePresence; Order button always enabled (even with 0 winners — show "Pick some winners first!" hint when `winners.size === 0`)
- [x] 3.6 Implement heatmap: visible when `orders.length >= 20`; each cell shows count badge; badge background scales with count; `isEvenSpread()` controls message shown; Reset button clears `orders` and `lastOrder`
- [x] 3.7 Add `ExplainerPanel` and `QuizPanel`

## 4. Routing and home page

- [x] 4.1 Add import and route `/pizza-builder` in `src/App.jsx`
- [x] 4.2 Add Pizza Builder entry to `goDeeper` tier in `src/pages/HomePage.jsx` TIERS array, after Probability Bingo

## 5. Verify

- [x] 5.1 Run `npm run lint` — 0 errors
- [x] 5.2 Run `npm run build` — clean build
