## Context

Pizza Builder teaches compound independent events to children aged 10. The app already has games for single events (CoinFlip, Dice, Spinner), sums of two dice (RollAndRace, RemoveOne, ProbabilityBingo), and counting combinations (LuckyCombo). The multiplication principle for independent events — P(A and B) = P(A) × P(B) — has no dedicated game. Pizza Builder fills this gap without using any formula: the grid IS the lesson.

## Goals / Non-Goals

**Goals:**
- 4-phase game: Build Menu → Make Statement → Order Pizzas → View Heatmap
- Menu: 2–4 crusts, 2–5 toppings; grid shows all combinations live as menu grows
- OR statement: player taps grid cells (or row/column headers) to select winning pizzas; count updates live ("5 of your 12 pizzas win!")
- Random ordering: independent spinners for crust and topping; result highlights matching cell; win/lose feedback
- Heatmap: after 20+ orders, cell counts shown as badges; "pretty close to even" message
- ExplainerPanel + QuizPanel
- Full EN/HE i18n

**Non-Goals:**
- AND statements as a UI control (the contrast is shown in explainer only)
- Dependent events (running out of toppings)
- Persistent history across sessions (localStorage)
- More than 4 crusts × 5 toppings (20 cells max)
- Permutations (order of toppings does not matter)

## Decisions

### Grid representation

```js
// State — crusts and toppings store short i18n identifiers, not raw strings
const [crusts,   setCrusts]   = useState(['thin', 'thick'])          // identifier[]
const [toppings, setToppings] = useState(['mushroom', 'pepper'])     // identifier[]
const [winners,  setWinners]  = useState(new Set())                  // Set of "ci|ti" keys
const [orders,   setOrders]   = useState([])                         // { ci, ti, key, isWin }[]

// Display label: t(`pizzaBuilder.crust.${id}`) / t(`pizzaBuilder.topping.${id}`)
// Cell key: `${crustIndex}|${toppingIndex}` (index-based, stable while menu doesn't change)
```

Grid is a 2D layout: rows = crusts, columns = toppings. Each cell is identified by `"${ci}|${ti}"`. The Set of winners drives both the highlight state and the win-check on each order.

### OR statement mechanic

Tapping a cell toggles it in the `winners` Set. Tapping a row header toggles all cells in that row. Tapping a column header toggles all cells in that column. No explicit "OR" button needed — the multi-select behaviour is the OR. The count of winners and total cells is always displayed:

```js
const winCount = winners.size
const totalCells = crusts.length * toppings.length
// Display: "5 of your 12 pizzas are winners!"
```

### Phase state machine

```
'building'  — default; player adds crusts/toppings and taps winners
'ordering'  — player presses Order; spinners animate; results accumulate
              (no phase gate — player can go back to building at any time)
```

Unlike other games, this one has no hard `finished` state. The player keeps ordering as long as they want. The heatmap section appears after `orders.length >= 20` automatically. A "Reset" button clears orders and lets them rebuild.

No separate `placing` vs `rolling` phase gate. Building and ordering are always available. This keeps the game loop open and exploratory — right for the age group.

### Order animation

Show two animated cards side by side — one for crust, one for topping. Each card cycles through its options rapidly (Framer Motion `animate` with fast `y` translate) and snaps to the result after 350ms. This is a pizza-specific animation, not the pip-die pattern used in dice games.

```js
// Ordering mechanic
function doOrder() {
  if (isOrdering) return
  setIsOrdering(true)
  setTimeout(() => {
    const ci = Math.floor(Math.random() * crusts.length)
    const ti = Math.floor(Math.random() * toppings.length)
    const key = `${ci}|${ti}`
    const isWin = winners.has(key)
    setLastOrder({ ci, ti, key, isWin })
    setOrders(prev => [...prev, { ci, ti, key, isWin }])
    setIsOrdering(false)
  }, 350)
}
```

### Default menu items and "Add" picker

```js
const ALL_CRUSTS   = ['thin', 'thick', 'sourdough', 'deepDish']   // all available
const ALL_TOPPINGS = ['mushroom', 'pepper', 'cheese', 'olive', 'pepperoni']

const DEFAULT_CRUSTS   = ['thin', 'thick']       // shown on load
const DEFAULT_TOPPINGS = ['mushroom', 'pepper']  // shown on load
```

All labels are resolved via `t(`pizzaBuilder.crust.${id}`)` / `t(`pizzaBuilder.topping.${id}`)` so Hebrew renders correctly.

**"+ Add Crust" / "+ Add Topping" mechanic:** tapping the button opens a small inline picker showing only the items not yet on the menu. The player taps one to add it. The picker closes automatically. This gives the player a real choice and makes the label of the new row/column visible before it appears. The "+" button is hidden once all items from `ALL_CRUSTS` / `ALL_TOPPINGS` are on the menu (max 4 crusts, max 5 toppings).

### Zero-winners order button

The Order button is enabled even when no cells are selected (winners.size === 0). Every result will be a loss, which is itself educational: P(win) = 0/total = 0. A subtle hint label appears: "Pick some winners first to have a chance!" No hard disable — keeping the loop open.

### Heatmap

After `orders.length >= 20`, each cell displays a count badge. Cell background intensity scales with count (more orders → darker tint). Expected count per cell = `orders.length / totalCells`.

Even-spread rule: "Looks pretty even!" when no cell has count 0 AND max cell count ≤ 1.5× expected average. Otherwise "Keep ordering — it'll even out!"

```js
function cellCount(orders, ci, ti) {
  const key = `${ci}|${ti}`
  return orders.filter(o => o.key === key).length
}

function isEvenSpread(orders, totalCells) {
  if (orders.length < 20 || totalCells === 0) return false
  const expected = orders.length / totalCells
  for (let ci = 0; ci < crusts.length; ci++) {
    for (let ti = 0; ti < toppings.length; ti++) {
      const count = cellCount(orders, ci, ti)
      if (count === 0 || count > expected * 1.5) return false
    }
  }
  return true
}
```

### i18n key structure

```
pizzaBuilder.title          — "Pizza Builder"
pizzaBuilder.emoji          — "🍕"
pizzaBuilder.subtitle
pizzaBuilder.howToPlay
pizzaBuilder.addCrust       — "+ Add Crust"
pizzaBuilder.addTopping     — "+ Add Topping"
pizzaBuilder.removeCrust    — "Remove"
pizzaBuilder.removeTopping  — "Remove"
pizzaBuilder.winnerHint     — "Tap cells (or a whole row/column) to mark your winning pizzas"
pizzaBuilder.winCount       — "{{n}} of your {{total}} pizzas are winners!"
pizzaBuilder.noWinners      — "Tap a cell to pick your winning pizzas"
pizzaBuilder.orderBtn       — "Order a Random Pizza!"
pizzaBuilder.win            — "🎉 {{crust}} + {{topping}} — that's yours!"
pizzaBuilder.lose           — "😬 {{crust}} + {{topping}} — not this time!"
pizzaBuilder.ordersLabel    — "{{n}} orders so far"
pizzaBuilder.heatmapTitle   — "How spread out are your orders?"
pizzaBuilder.heatmapEven    — "Looks pretty even! Each pizza comes up about equally."
pizzaBuilder.heatmapUneven  — "Keep ordering — it'll even out!"
pizzaBuilder.resetBtn       — "Reset"
pizzaBuilder.crust.thin     — "Thin"
pizzaBuilder.crust.thick    — "Thick"
pizzaBuilder.topping.mushroom — "🍄 Mushroom"
pizzaBuilder.topping.pepper   — "🫑 Pepper"
pizzaBuilder.explainer.*
pizzaBuilder.simulator.*    — not needed (ordering IS the simulation)
quiz.pizzaBuilder.q1/q2/q3
home.games.pizzaBuilder.title
home.games.pizzaBuilder.desc
```

## Risks / Trade-offs

- **No hard finish state** — the open loop is intentional but means there's no natural "game over" moment. Mitigated by the heatmap appearing after 20 orders as a natural milestone.
- **Stale winners after menu edit** → call `pruneWinners()` whenever crusts/toppings change: `setWinners(prev => new Set([...prev].filter(k => validKey(k, newCrusts, newToppings))))`. Must be called in the same handler that updates `crusts`/`toppings`.
- **Stale orders after menu shrink** → reset `orders` and `lastOrder` to `[]` / `null` whenever a crust or topping is removed. Reason: removed items leave ghost entries that inflate `orders.length` and skew the heatmap's expected-count calculation. Keeping history isn't worth the confusion at this age level.
- **Topping/crust labels in Hebrew** — crust labels are i18n-keyed; topping labels include emoji prefix (language-neutral). No custom player-defined items.
- **Mobile layout** — grid with 4 crusts × 5 toppings = 20 cells needs to be scrollable horizontally at 375px. Cells use fixed `w-14 h-14`; grid wraps in a horizontal scroll container.

## Open Questions

None — design fully determined.
