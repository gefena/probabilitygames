## Context

Probability Bingo builds on Remove One's placement strategy but adds a spatial win condition: completing a row, column, or diagonal on a 3×3 grid. The game introduces the concept that position of a number matters — not just how likely it is to be rolled, but whether clearing it advances a winning line. No existing game in the app teaches this.

## Goals / Non-Goals

**Goals:**
- 3×3 grid, two-dice sums 2–12, repetition allowed across squares
- Default balanced-random card; optional Edit mode to customise any square
- Win condition: first to complete any row, column, or diagonal
- Two bot opponents: Lucky Larry (random fill) and Probability Pete (strategic fill)
- Near-bingo highlighting: lines one square from completion are visually flagged each roll
- Post-game reveal: all three grids with crossed-out squares shown simultaneously
- Simulator: 100/500/1000 games comparing three grids, bar chart of win rates, locked until first game
- ExplainerPanel + QuizPanel

**Non-Goals:**
- Grid sizes other than 3×3
- FREE square (all nine choices should be meaningful)
- Multiplayer (bot opponents only)
- Persistent session history (localStorage)
- Classic numbered bingo cards (only two-dice sums 2–12)

## Decisions

### Grid representation

```js
// 3×3 grid as flat array of 9 numbers, indexed 0–8
// row r, col c → index r*3 + c
// [0,1,2] = row 0, [3,4,5] = row 1, [6,7,8] = row 2
// columns: [0,3,6], [1,4,7], [2,5,8]
// diagonals: [0,4,8], [2,4,6]

const LINES = [
  [0,1,2], [3,4,5], [6,7,8],   // rows
  [0,3,6], [1,4,7], [2,5,8],   // cols
  [0,4,8], [2,4,6],             // diags
]
```

State: `grid` (9-element number array), `crossed` (9-element boolean array).

### Balanced-random default card

Random fill risks all 2s and 12s; probability-weighted fill spoils the lesson. The balanced-random approach guarantees each row and column contains at least one number from {5,6,7,8,9}:

```js
function balancedRandomCard() {
  const grid = Array(9).fill(null)
  const hot = [5, 6, 7, 8, 9]
  // Place one hot number in each row (cols 0, 1, 2 chosen randomly)
  for (let row = 0; row < 3; row++) {
    const col = Math.floor(Math.random() * 3)
    grid[row * 3 + col] = hot[Math.floor(Math.random() * hot.length)]
  }
  // Fill remaining squares with random numbers from 2–12
  for (let i = 0; i < 9; i++) {
    if (grid[i] === null) {
      grid[i] = Math.floor(Math.random() * 11) + 2
    }
  }
  return grid
}
```

This produces playable, imperfect cards — player wins sometimes, loses sometimes, and can see why.

### Bot grids

```js
function larryGrid() {
  // Pure random — same as balancedRandomCard but without the hot-number guarantee
  return Array.from({ length: 9 }, () => Math.floor(Math.random() * 11) + 2)
}

function peteGrid() {
  // Pack 6,7,8 into row 0 for fastest expected row clear
  // Pack 5,7,9 into column 1 for a second fast line path
  // Fill remaining squares with moderate numbers
  return [6, 7, 8,
          4, 5, 3,
          9, 9, 4]
  // row 0: [6,7,8] — all high-probability → fastest row
  // col 1: [7,5,9] — two high-probability → second-best column
}
```

Pete's grid is fixed (not random) so players can study it after the game.

### Phase state machine

```
'placing'   — default card shown; player may edit; Roll button disabled
'rolling'   — game in progress; dice animate; crossed squares update
'finished'  — winner declared; all three grids revealed; Play Again available
```

Edit mode is a UI toggle within `placing` phase — not a separate phase.

### Roll mechanic

```js
function doRoll() {
  if (isRolling || phase !== 'rolling') return
  const a = Math.floor(Math.random() * 6) + 1
  const b = Math.floor(Math.random() * 6) + 1
  const sum = a + b
  setIsRolling(true)
  setLastRoll({ a, b, sum })
  setTimeout(() => {
    // Cross out all matching squares for all three grids
    const newPlayerCrossed = crossMatching(playerCrossed, playerGrid, sum)
    const newLarryCrossed  = crossMatching(larryCrossed,  larryGrid,  sum)
    const newPeteCrossed   = crossMatching(peteCrossed,   peteGrid,   sum)
    setPlayerCrossed(newPlayerCrossed)
    setLarryCrossed(newLarryCrossed)
    setPeteCrossed(newPeteCrossed)
    // Check win synchronously
    const playerBingo = checkBingo(newPlayerCrossed)
    const larryBingo  = checkBingo(newLarryCrossed)
    const peteBingo   = checkBingo(newPeteCrossed)
    if (playerBingo || larryBingo || peteBingo) {
      const w = playerBingo ? 'player' : larryBingo ? 'larry' : 'pete'
      setWinner(w)
      setPhase('finished')
      setGamesPlayed(g => g + 1)
    }
    setIsRolling(false)
  }, 400)
}

function crossMatching(crossed, grid, sum) {
  return crossed.map((c, i) => c || grid[i] === sum)
}

function checkBingo(crossed) {
  return LINES.some(line => line.every(i => crossed[i]))
}
```

Win check is synchronous on locally-computed new state — same inline pattern as Remove One.

### Near-bingo highlighting

A line is "hot" if exactly one square in it is not yet crossed:

```js
function hotLines(crossed) {
  return LINES.filter(line =>
    line.filter(i => !crossed[i]).length === 1
  )
}
```

Hot-line squares glow with an amber ring in the player's grid during `rolling` phase.

### Edit mode

Within `placing` phase, toggled by an "Edit" button. In edit mode:
- Tap any square → open a number picker (2–12 in a row)
- Each number shows a mini probability bar below it
- Tap a number → update that square → close picker
- "Done" button returns to normal placing view

State: `editIndex` (null | 0–8).

### Number picker probability hint

```js
const WAYS = [1,2,3,4,5,6,5,4,3,2,1]   // for sums 2–12
// bar width = WAYS[sum - 2] / 6 * 100 + '%'
```

### Simulator

```js
function simulateBingoGame(playerG, larryG, peteG) {
  const crossed = { player: Array(9).fill(false), larry: Array(9).fill(false), pete: Array(9).fill(false) }
  while (true) {
    const sum = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1
    for (const key of ['player', 'larry', 'pete']) {
      const g = key === 'player' ? playerG : key === 'larry' ? larryG : peteG
      crossed[key] = crossed[key].map((c, i) => c || g[i] === sum)
    }
    for (const key of ['player', 'larry', 'pete']) {
      if (checkBingo(crossed[key])) return key
    }
  }
}

function runSimulation(n, playerGrid) {
  const wins = { player: 0, larry: 0, pete: 0 }
  const lg = larryGrid(), pg = peteGrid()
  for (let i = 0; i < n; i++) {
    wins[simulateBingoGame(playerGrid, lg, pg)]++
  }
  return wins
}
```

Larry's grid is re-randomised each simulation run (average behaviour). Pete's grid is fixed.

### i18n key structure

```
probabilityBingo.title
probabilityBingo.emoji          — 🎱
probabilityBingo.subtitle
probabilityBingo.howToPlay
probabilityBingo.editBtn        — "Edit Card"
probabilityBingo.doneBtn        — "Done"
probabilityBingo.rollBtn        — "Roll!"
probabilityBingo.player         — "You"
probabilityBingo.larry          — "Lucky Larry"
probabilityBingo.pete           — "Probability Pete"
probabilityBingo.larryHint      — "Random fill"
probabilityBingo.peteHint       — "Lines the odds"
probabilityBingo.rollResult     — "{{a}} + {{b}} = {{sum}}"
probabilityBingo.bingo          — "BINGO!"
probabilityBingo.win            — "🎉 You got bingo!"
probabilityBingo.lose           — "{{name}} got bingo first!"
probabilityBingo.playAgain      — "Play Again"
probabilityBingo.pickNumber     — "Pick a number"
probabilityBingo.nearBingo      — "Almost there!"
probabilityBingo.explainer.*
probabilityBingo.simulator.*
quiz.probabilityBingo.q1/q2/q3
home.games.probabilityBingo.title
home.games.probabilityBingo.desc
```

## Risks / Trade-offs

- **Simultaneous bingo** — if player and a bot complete a line on the same roll, declare a tie. Same pattern as Remove One. Rare but needs handling with a `tie-larry` / `tie-pete` winner value.
- **Pete's fixed grid is always the same** — players who replay many times learn Pete's pattern. Acceptable: the fixed grid makes the post-game reveal maximally educational ("here's exactly why Pete won").
- **Edit mode on mobile** — number picker (11 buttons in a row) needs to be scrollable or wrap at 375px. Use a 4-3-4 or 6-5 layout for the picker instead of a single row.
- **Near-bingo highlighting on bot grids** — only shown for the player's grid to keep the UI focused. Bot near-bingo is revealed post-game.
- **Larry's random grid in simulator** — re-randomised each game so the chart shows average random performance, not one lucky draw. Noted in UI: "Larry plays randomly each game".

## Open Questions

None — design fully determined.
