## Context

`LuckyDicePage` already contains `sumProbabilities(numDice)` — a recursive function that computes the exact probability of each sum for N dice. For two dice it returns the triangular distribution (2: 1/36 … 7: 6/36 … 12: 1/36). Roll & Race makes that distribution tangible through a race metaphor. The two pages complement each other: LuckyDice asks "what's the chance of this sum?", Roll & Race shows "here's what that feels like over many rolls."

## Goals / Non-Goals

**Goals:**
- Player picks one car (sum 2–12) before the race starts; all 11 cars race
- Two dice animate on each roll; the matching car advances one step on the track
- Track length [5, 10, 15], default 10
- Manual roll (one tap = one roll) as the primary loop
- Auto-finish button to resolve the race at speed (~80ms per roll)
- Win / lose celebration when first car reaches the finish line
- Simulator (unlocked after 1 completed race): 100 / 500 / 1000 simulated races, bar chart of win counts per car sum

**Non-Goals:**
- Multiplayer or player-vs-player
- Betting points or score accumulation across races
- Configurable number of dice (always two)

## Decisions

### State machine

```
'picking'     — player selects their car
'racing'      — roll loop active (manual or auto)
'finished'    — winner decided, play again available
```

Key state:
```js
const [phase, setPhase]         = useState('picking')
const [chosen, setChosen]       = useState(null)   // 2–12
const [positions, setPositions] = useState(...)    // { 2:0, 3:0, ..., 12:0 }
const [dieA, setDieA]           = useState(null)
const [dieB, setDieB]           = useState(null)
const [shaking, setShaking]     = useState(false)
const [winner, setWinner]       = useState(null)   // null | 2–12
const [trackLength, setTrackLength] = useState(10)
const [gamesPlayed, setGamesPlayed] = useState(0)
const autoRef = useRef(false)    // flag to stop auto-finish mid-race
```

### Track rendering

11 horizontal lanes, one per sum. Player's lane is highlighted (star + accent color).

```
Sum  Car  ░░░░░░░░░░  🏁
 2   🚗   ▓░░░░░░░░░  (1/10)
 7  ⭐🚗   ▓▓▓▓░░░░░░  (4/10)  ← player's car
```

Each lane: label (sum number) | car emoji | progress bar (filled cells = position) | finish flag.

Progress bar: `Array(trackLength)` of cells, filled vs empty, rendered as colored squares. Player's car uses a distinct accent color (e.g. yellow/amber); others use a neutral color graded by probability (optional — simplest is all grey, player car is amber).

### Roll mechanic

```js
function doRoll() {
  const a = Math.floor(Math.random() * 6) + 1
  const b = Math.floor(Math.random() * 6) + 1
  const sum = a + b
  setShaking(true)
  setDieA(a); setDieB(b)
  setTimeout(() => {
    setShaking(false)
    setPositions(prev => {
      const next = { ...prev, [sum]: prev[sum] + 1 }
      if (next[sum] >= trackLength) {
        setWinner(sum)
        setPhase('finished')
        setGamesPlayed(g => g + 1)
        autoRef.current = false
      }
      return next
    })
  }, 350)
}
```

Auto-finish: sets `autoRef.current = true`, then fires `doRoll` repeatedly via `setTimeout` chains (~80ms between rolls) until a winner is found or `autoRef.current` is false (race ended or interrupted).

### Die face component

Reuse the `PIP_LAYOUTS` + pip-grid pattern from `GreedyPigPage` (inline in this page — no shared component needed). Two dice side by side, shake animation on each roll.

### Simulator

```js
function runSimulation(n, trackLen) {
  // returns { 2: wins, 3: wins, ..., 12: wins }
  const wins = {}
  for (let s = 2; s <= 12; s++) wins[s] = 0
  for (let i = 0; i < n; i++) {
    const pos = {}
    for (let s = 2; s <= 12; s++) pos[s] = 0
    let done = false
    while (!done) {
      const a = Math.floor(Math.random() * 6) + 1
      const b = Math.floor(Math.random() * 6) + 1
      const sum = a + b
      pos[sum]++
      if (pos[sum] >= trackLen) { wins[sum]++; done = true }
    }
  }
  return wins
}
```

Pure synchronous function. 1000 races with track length 10 completes in <5ms — no chunking needed.

Result displayed as a Recharts `BarChart`. Player's chosen car bar is highlighted (full opacity); all others at 0.5 opacity, matching the Greedy Pig simulator pattern.

### i18n key structure

```
rollAndRace.title
rollAndRace.emoji           — 🏎️
rollAndRace.subtitle
rollAndRace.howToPlay
rollAndRace.trackLabel
rollAndRace.pickPrompt      — "Pick your car!"
rollAndRace.yourCar         — "Your car: {n}"
rollAndRace.rollBtn
rollAndRace.autoBtn         — "Auto-finish"
rollAndRace.win             — "🎉 Car {n} wins — that's you!"
rollAndRace.lose            — "Car {n} wins! Better luck next race."
rollAndRace.playAgain
rollAndRace.rollResult      — "Rolled {a} + {b} = {sum} → Car {sum} moves!"
rollAndRace.explainer.*
rollAndRace.simulator.*
quiz.rollAndRace.q1/q2/q3
home.games.rollAndRace.title
home.games.rollAndRace.desc
```

### Home page integration

Add one entry to the `goDeeper` tier in `TIERS` (HomePage.jsx):
```js
{ to: '/roll-and-race', emoji: '🏎️', color: 'bg-red-500', titleKey: 'home.games.rollAndRace.title', descKey: 'home.games.rollAndRace.desc' }
```

## Risks / Trade-offs

- **11 lanes on mobile** — 11 rows is tall but each row is compact (sum label + progress cells). At track length 10 each cell can be ~20px wide on a 375px screen (11 cells including label). Needs careful Tailwind sizing — use `gap-0.5` cells and `text-xs` labels.
- **Auto-finish speed** — 80ms per roll gives ~800ms for a 10-step race at average pace. Fast enough to feel snappy, slow enough to watch. Can be tuned.

## Open Questions

None — design is fully determined from exploration.
