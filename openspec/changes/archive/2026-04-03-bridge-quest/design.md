## Context

The app teaches probability concepts through interactive games. Bridge Quest adds the multiplication rule for sequential independent events — P(path) = P(b1) × P(b2) × … × P(bn) — using a three-path race with a Greedy Bot opponent across a 3-race tournament. The game sits in the Go Deeper tier after Climber Race (OR/addition rule), completing the AND/multiplication pair at a more strategic level.

## Goals / Non-Goals

**Goals:**
- 3 parallel paths per race, each with 2–4 bridges; bridge survival probabilities randomised each race
- Tap-to-preview: tap a path to reveal its combined survival %; commit with a second tap / confirm button
- Greedy Bot: always picks the path whose minimum single-bridge probability is highest (avoids the scariest individual crossing)
- Sequential animation: player's character crosses bridge-by-bridge first, then the bot crosses
- Bridge result: each bridge lights green (safe) or red (fell) with a short pause between
- 3-race tournament: first to 2 points wins; ties (both fall or both survive) give no point; play all 3 regardless
- Tournament result screen with score (e.g. "You 2 – Bot 1") and Play Again
- ExplainerPanel + QuizPanel
- Full EN/HE i18n

**Non-Goals:**
- Branching / DAG path structure (parallel paths only)
- More than one bot
- Persistent tournament history across sessions
- Animated character sprites (emoji + step indicator sufficient)
- Simultaneous crossing (player always crosses first)

## Decisions

### Path generation

```js
const MIN_BRIDGE_PCT = 30   // no bridge below 30% (too discouraging)
const MAX_BRIDGE_PCT = 95   // no bridge above 95% (too easy / meaningless)
const PATH_COUNT = 3
const BRIDGE_COUNTS = [2, 3, 3, 4]  // pool; pick randomly for each path

function randomPath() {
  const n = BRIDGE_COUNTS[Math.floor(Math.random() * BRIDGE_COUNTS.length)]
  const bridges = Array.from({ length: n }, () =>
    Math.round(MIN_BRIDGE_PCT + Math.random() * (MAX_BRIDGE_PCT - MIN_BRIDGE_PCT))
  )
  const survival = bridges.reduce((p, b) => p * b / 100, 1)  // 0–1
  return { bridges, survival }
}

function randomRace() {
  return Array.from({ length: PATH_COUNT }, randomPath)
}
```

Paths are regenerated at the start of each race. No forced "correct answer" — the path with the best survival may or may not be obvious at a glance.

### Greedy Bot strategy

```js
function greedyBotPick(paths) {
  // Pick the path whose minimum bridge probability is highest
  return paths.reduce((best, path, i) => {
    const worstBridge = Math.min(...path.bridges)
    return worstBridge > best.worstBridge ? { index: i, worstBridge } : best
  }, { index: 0, worstBridge: -1 }).index
}
```

This produces the pedagogically correct mistake: focusing on avoiding the scariest crossing rather than comparing total path survival. When the bot's choice is revealed, it is labelled with its reasoning ("Greedy Bot avoids the scary bridge — it chose Path B").

### Tap-to-preview mechanic

```js
const [preview, setPreview] = useState(null)   // null | pathIndex
const [chosen, setChosen]   = useState(null)   // null | pathIndex
```

- First tap on a path: sets `preview` to that index; shows survival % in an expanded panel below the path row
- Tap the same path again (or a confirm button): sets `chosen`; locks in the selection
- Tap a different path while one is previewed: switches preview to the new path
- Once `chosen` is set, previewing is disabled; crossing animation starts

### Game state machine

```js
const [phase, setPhase] = useState('picking')
// 'picking'   — player selects a path
// 'crossing'  — player character crosses bridges one by one
// 'botCross'  — bot character crosses bridges one by one
// 'result'    — race result shown (who won this race)
// 'tournament'— all 3 races done, tournament result shown
```

### Crossing animation

```js
async function runCrossing(bridges, onBridgeResult) {
  for (let i = 0; i < bridges.length; i++) {
    await delay(700)                              // suspense pause
    const survived = Math.random() * 100 < bridges[i]
    onBridgeResult(i, survived)
    if (!survived) return false                   // fell — stop here
    await delay(400)                              // brief relief pause
  }
  return true                                     // reached end
}
```

`delay(ms)` is `new Promise(r => setTimeout(r, ms))`. Player crossing runs first; bot crossing starts after player result is shown (500ms gap). Bridge results are stored as `bridgeResults: Array<'pending'|'safe'|'fell'>` for display.

Each character rolls independently even when they chose the same path — `runCrossing` is called twice with separate `Math.random()` invocations, so outcomes are never shared.

### Scoring

```js
function racePoint(playerSurvived, botSurvived) {
  if (playerSurvived && !botSurvived) return { player: 1, bot: 0 }
  if (!playerSurvived && botSurvived) return { player: 0, bot: 1 }
  return { player: 0, bot: 0 }   // both survived or both fell = tie
}
```

Tournament: play all 3 races regardless. Winner is whoever has more points after race 3. If equal: draw.

### Path display

Each path row shows:
- Path label (A / B / C) + emoji (🌉)
- Bridge pills: each bridge shown as a pill with its % (e.g. `[85%] [72%] [60%]`)
- Combined survival: hidden until tapped; revealed as a coloured bar + text ("54 in 100 make it through")
- After crossing: bridge pills turn green/red according to result; a character emoji shows current position

### i18n key structure

```
bridgeQuest.title           — "Bridge Quest"
bridgeQuest.emoji           — "🌉"
bridgeQuest.subtitle
bridgeQuest.howToPlay
bridgeQuest.pathLabel       — "Path {{letter}}"
bridgeQuest.bridgePct       — "{{n}}%"
bridgeQuest.tapToPreview    — "Tap to see your odds"
bridgeQuest.survival        — "{{n}} in 100 make it through"
bridgeQuest.choosePath      — "Choose this path"
bridgeQuest.botChoice       — "Greedy Bot chose Path {{letter}}"
bridgeQuest.botReason       — "It avoids the scariest bridge"
bridgeQuest.crossing        — "Crossing..."
bridgeQuest.safe            — "Safe! ✓"
bridgeQuest.fell            — "Fell! ✗"
bridgeQuest.survived        — "You made it! 🎉"
bridgeQuest.didNotSurvive   — "You fell..."
bridgeQuest.botSurvived     — "Bot made it!"
bridgeQuest.botFell         — "Bot fell!"
bridgeQuest.pointYou        — "You win this race! +1"
bridgeQuest.pointBot        — "Bot wins this race! +1"
bridgeQuest.tie             — "Tie — no point"
bridgeQuest.score           — "You {{p}} – Bot {{b}}"
bridgeQuest.nextRace        — "Next Race →"
bridgeQuest.winTournament   — "🏆 You won the tournament!"
bridgeQuest.loseTournament  — "Bot won the tournament."
bridgeQuest.drawTournament  — "It's a draw!"
bridgeQuest.playAgain       — "Play Again"
bridgeQuest.raceN           — "Race {{n}} of 3"
bridgeQuest.greedyBot       — "Greedy Bot"
bridgeQuest.explainer.*
quiz.bridgeQuest.q1/q2/q3
home.games.bridgeQuest.title
home.games.bridgeQuest.desc
```

## Risks / Trade-offs

- **Async crossing in React** — Using `setTimeout`-based sequential animation inside an async function requires care to avoid stale closure bugs. Use refs for mutable state that changes during the animation (e.g. current step index), and only call `setState` for display updates. Also guard all `setState` calls with an `isMountedRef` (set to `false` in the `useEffect` cleanup) to prevent React warnings if the player navigates away mid-animation.
- **Path survival being too similar** — Random generation can produce three paths with nearly identical survival %. Greedy Bot's choice will often be the same as the mathematically optimal one in this case. Acceptable — the explainer addresses it. Could add a "spread" constraint if it feels too easy, but not needed for v1.
- **Bot always wins when paths look similar** — If the player can't distinguish paths visually, they may guess and lose. Mitigated by the tap-to-preview panel giving the exact survival %. The point is to reward using the preview before committing.
- **Sequential crossing feels slow** — 3 bridges × (700 + 400)ms pause each = ~3.3s per crossing, × 2 (player + bot) = ~7s per race. Acceptable at this length; don't shorten below 500ms or the suspense is lost.

## Open Questions

None — design fully determined.
