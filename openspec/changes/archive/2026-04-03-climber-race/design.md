## Context

Climber Race teaches the addition rule for mutually exclusive events. The spinner changes every turn, so the player must re-read the odds before each spin and decide whether to keep or change their OR bet. The bet resets to empty at the start of each new race, ensuring the player consciously picks their bet each time.

The app already has Pizza Builder (multiplication rule, compound AND), so this game completes the pair: AND → multiply, OR → add.

## Goals / Non-Goals

**Goals:**
- 4 named climbers in 2 pairs (left side / right side of mountain): Sunny 🟡, Blaze 🔴 (left), Storm 🔵, Ivy 🟢 (right)
- Fixed 6-step race; first to step 6 wins
- Per-turn random spinner: 4 sections with random sizes (min 8% each, sum 100%)
- Player picks 1 or 2 climbers as their bet before each spin; bet resets at race start
- Live arc highlight on spinner showing combined %; plain-language ratio ("about 2 in 3 spins")
- Spin button animates needle → winning climber advances 1 step
- Warning when any climber is 1 step from winning
- Win/lose result message; Play Again resets everything
- Race history: last 5 races shown (who won, did player's bet win)
- ExplainerPanel + QuizPanel
- Full EN/HE i18n

**Non-Goals:**
- Adjustable race length (fixed at 6)
- More than 2 climbers in a bet
- Persistent history across sessions
- Animated climbing character sprites (emoji + step counter sufficient)
- Bot opponents placing their own bets

## Decisions

### Climber layout

```
Left side: Sunny (yellow), Blaze (red)
Right side: Storm (blue), Ivy (green)

Mountain display — two columns, 6 rows:
  Col 0 (left): Sunny track | Col 1 (right): Storm track
                Blaze track |                Ivy track
```

Each climber has its own vertical track. Step 6 = summit = win.

### Spinner generation

```js
const COLORS = ['sunny', 'blaze', 'storm', 'ivy']
const MIN_PCT = 8

function randomSpinner() {
  const raw = COLORS.map(() => Math.random())
  const total = raw.reduce((a, b) => a + b, 0)
  let pcts = raw.map(w => Math.round((w / total) * 100))
  // Fix rounding drift to exactly 100
  pcts[0] += 100 - pcts.reduce((a, b) => a + b, 0)
  // Clamp to minimum, renormalise
  pcts = pcts.map(p => Math.max(MIN_PCT, p))
  const sum = pcts.reduce((a, b) => a + b, 0)
  pcts = pcts.map(p => Math.round((p / sum) * 100))
  pcts[0] += 100 - pcts.reduce((a, b) => a + b, 0)
  return pcts  // [sunnyPct, blazePct, stormPct, ivyPct]
}
```

New spinner is generated at start of each turn, AFTER the previous spin result is displayed (player sees result → new odds appear → player reads and decides → spin).

### Bet state

```js
const [bet, setBet] = useState([])          // [] | ['sunny'] | ['sunny','storm']
const [spinner, setSpinner] = useState(null) // pcts array, null until race starts
const [steps, setSteps] = useState({ sunny: 0, blaze: 0, storm: 0, ivy: 0 })
const [phase, setPhase] = useState('betting') // 'betting' | 'spinning' | 'result'
const [lastSpin, setLastSpin] = useState(null) // { winner: colorKey, betWon: bool }
const [isSpinning, setIsSpinning] = useState(false)
const [raceWinner, setRaceWinner] = useState(null) // null | colorKey
const [history, setHistory] = useState([]) // { raceWinner, betWon }[]
```

Bet resets to `[]` on Play Again. Spinner regenerates each turn. Phase is always `'betting'` (player can always change bet between spins; no separate phase gate needed — `isSpinning` guards double-tap).

### Spin mechanic

```js
function doSpin() {
  if (isSpinning || !spinner) return
  setIsSpinning(true)
  setTimeout(() => {
    // Weighted random pick from spinner pcts
    const winner = weightedPick(spinner)  // returns colorKey
    const newSteps = { ...steps, [winner]: steps[winner] + 1 }
    setSteps(newSteps)
    const betWon = bet.includes(winner)
    setLastSpin({ winner, betWon })
    if (newSteps[winner] >= 6) {
      setRaceWinner(winner)
      setHistory(h => [...h.slice(-4), { raceWinner: winner, betWon }])
      setPhase('result')
    } else {
      // Generate next turn's spinner
      setSpinner(randomSpinner())
    }
    setIsSpinning(false)
  }, 600)
}

function weightedPick(pcts) {
  const r = Math.random() * 100
  let cum = 0
  for (let i = 0; i < COLORS.length; i++) {
    cum += pcts[i]
    if (r < cum) return COLORS[i]
  }
  return COLORS[COLORS.length - 1]
}
```

### Spinner visualisation

SVG pie chart with 4 arcs. Arcs whose colorKey is in `bet` are highlighted (brighter fill + stroke ring). A needle animates during spin (rotates from 0° to a random final angle that lands in the winning sector). Framer Motion `animate` for needle rotation.

Combined bet percentage:
```js
const betPct = bet.reduce((sum, key) => sum + spinner[COLORS.indexOf(key)], 0)
```

Plain-language ratio: map betPct to nearest simple fraction:
```js
function toRatio(pct) {
  if (pct >= 90) return 'almost every spin'
  if (pct >= 65) return 'about 2 in 3 spins'
  if (pct >= 45) return 'about 1 in 2 spins'
  if (pct >= 30) return 'about 1 in 3 spins'
  if (pct >= 15) return 'about 1 in 5 spins'
  return 'rarely'
}
```

### Mountain display

Two-column layout. Each column has a left and right climber track. Steps shown as dots (filled = reached, empty = not yet):

```
        SUMMIT
  🏅  ─────────  🏅
  ⬡   Step 6    ⬡     ← Sunny / Storm
  ⬡   Step 5    ⬡
  🟡  Step 4    ⬡     ← Sunny at step 4, Storm at 0
  ...
  LEFT side     RIGHT side
  (Sunny, Blaze) (Storm, Ivy)
```

Warning badge shown below mountain when any climber is at step 5: "⚠️ Blaze is one step away!"

### i18n key structure

```
climberRace.title           — "Climber Race"
climberRace.emoji           — "🧗"
climberRace.subtitle
climberRace.howToPlay
climberRace.sunny           — "Sunny"
climberRace.blaze           — "Blaze"
climberRace.storm           — "Storm"
climberRace.ivy             — "Ivy"
climberRace.pickBet         — "Pick your climber(s) — up to 2"
climberRace.betLabel        — "Your bet: {{bet}}"
climberRace.betOr           — "{{a}} OR {{b}}"
climberRace.betArc          — "Your colours cover {{pct}}% of the spinner"
climberRace.betRatio        — "— {{ratio}}"
climberRace.betWinIf        — "You WIN if {{bet}} reaches the top first!"
climberRace.noBet           — "Tap a climber to place your bet"
climberRace.spinBtn         — "Spin!"
climberRace.spinResult      — "{{name}} advances!"
climberRace.betWon          — "✓ Your colour!"
climberRace.betMissed       — "✗ Not yours"
climberRace.warning         — "⚠️ {{name}} is one step away!"
climberRace.win             — "🎉 {{name}} wins — that's your bet!"
climberRace.lose            — "{{name}} wins — your bet missed."
climberRace.playAgain       — "Play Again"
climberRace.historyTitle    — "Last races"
climberRace.historyWon      — "✓"
climberRace.historyLost     — "✗"
climberRace.explainer.*
quiz.climberRace.q1/q2/q3
home.games.climberRace.title
home.games.climberRace.desc
```

## Risks / Trade-offs

- **Spinner changes mid-race feel** — player's bet might look great at 70% one turn and drop to 25% the next. This is intentional and educational, but may feel "unfair" to younger players. Mitigated by always showing the updated arc and ratio clearly before the spin.
- **Bet persistence within a race** — the bet persists turn to turn but can be changed any time. This means a player might forget they can switch. Mitigated by showing the bet card prominently with an explicit "Change?" affordance.
- **SVG spinner complexity** — pie arc paths require trigonometry. Use a standard `polarToCartesian` helper + `describeArc` function, same pattern as MagicSpinnerPage if it exists in the codebase.
- **Needle animation landing accuracy** — the needle must visually land in the winning sector. Compute final angle as midpoint of winning sector arc, add several full rotations for visual spin effect: `finalAngle = sectorMidpoint + 360 * 3`.

## Open Questions

None — design fully determined.
