## Context

Remove One is the strategic complement to Roll & Race. Both use two-dice sums, but Remove One rewards players who remember that 7 is most likely and punishes naive even-spreading. The page has two phases (placement → game) and two fixed AI opponents whose strategies are transparent after the game ends.

## Goals / Non-Goals

**Goals:**
- Placement phase: tap +/− per row, 18 tokens total, Roll unlocks when all placed
- Game phase: one roll per round, all three players remove simultaneously, animated
- Two bots with distinct strategies visible to the player
- Win/lose reveal + Play Again
- Simulator: 3 strategies, 100/500/1000 games, bar chart of win rates
- Full i18n EN + HE

**Non-Goals:**
- Variable token count (always 18)
- Configurable number of opponents
- Turn-based (all players act on the same roll simultaneously)

## Decisions

### Phase state machine

```
'placing'   — player distributes tokens; Roll button disabled until total === 18
'rolling'   — dice animate, tokens being removed
'finished'  — winner declared, Play Again available
```

### Token counts & bot strategies

```js
const SUMS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const TOTAL_TOKENS = 18

// Lucky Larry: distribute 18 as evenly as possible across 11 numbers
// 18 / 11 = 1 remainder 7 → seven numbers get 2, four get 1
// Assigned to middle-ish numbers for slight realism
function larryTokens() {
  // [2,3,4,5,6,7,8,9,10,11,12] → [1,1,2,2,2,2,2,2,2,1,1]
  return { 2:1, 3:1, 4:2, 5:2, 6:2, 7:2, 8:2, 9:2, 10:2, 11:1, 12:1 }
}

// Max: floor(P(sum) × 18) per sum, then give the 1 remaining token to sum 7 (most probable)
// Result is a perfect symmetric triangle with 0 on 2 and 12:
// P(2)=0, P(3)=1, P(4)=1, P(5)=2, P(6)=3, P(7)=4, P(8)=3, P(9)=2, P(10)=1, P(11)=1, P(12)=0
function maxTokens() {
  return { 2:0, 3:1, 4:1, 5:2, 6:3, 7:4, 8:3, 9:2, 10:1, 11:1, 12:0 }
  // total = 18 ✓ — symmetric around 7, 0 on 2 and 12
}
```

Max deliberately puts 0 on 2 and 12 — this is visible to the player and sparks curiosity.

### Placement UI

```
Sum  [ − ]  ●●●  [ + ]   (3 tokens here)
 7   [ − ]  ●●●●  [ + ]  (4 tokens here)
```

Each row: sum label | minus button (disabled at 0) | pip display (filled circles) | plus button (disabled when total === 18).

Running total banner: `"Tokens placed: 14 / 18"` — turns green and shows "Ready!" when 18 reached.

Pip display: render filled dots up to the count. Max ~6 per row looks good; use a compact dot grid.

### Game board during play

Three columns — You / Lucky Larry / Max — each showing their token board:

```
     You      Larry     Max
 2   ○ ○       ●         ○
 3   ● ●       ●         ●
 4   ● ● ●     ● ●       ●
 5   ● ● ●     ● ●       ● ●
 6   ● ● ● ●   ● ●       ● ● ●
 7   ● ● ● ●   ● ●       ● ● ●
 8   ● ● ● ●   ● ●       ● ● ●
...
```

Filled dot = token still there. Empty circle = removed slot. When a sum is rolled, that row flashes (brief highlight animation) then the matching dots animate out across all three columns.

### Roll mechanic

```js
// State vars: playerTokens/setPlayerTokens, larryBoard/setLarryBoard, maxBoard/setMaxBoard
// (larryTokens() and maxTokens() are pure initialisers — avoid name collision with state setters)

function removeOneToken(tokens, sum) {
  if (!tokens[sum]) return tokens
  return { ...tokens, [sum]: tokens[sum] - 1 }
}

function totalTokens(tokens) {
  return Object.values(tokens).reduce((a, b) => a + b, 0)
}

// Player taps Roll button → doRoll() fires
function doRoll() {
  if (isRolling || phase !== 'rolling') return  // isRolling guards animation
  const a = Math.floor(Math.random() * 6) + 1
  const b = Math.floor(Math.random() * 6) + 1
  const sum = a + b
  setIsRolling(true)
  setLastRoll({ a, b, sum })
  setTimeout(() => {
    setHighlightRow(sum)
    setTimeout(() => {
      setHighlightRow(null)
      // Compute all new boards inline — win check is synchronous
      const newPlayer = removeOneToken(playerTokens, sum)
      const newLarry  = removeOneToken(larryBoard, sum)
      const newMax    = removeOneToken(maxBoard, sum)
      setPlayerTokens(newPlayer)
      setLarryBoard(newLarry)
      setMaxBoard(newMax)
      // Win check: any board at zero?
      const playerDone = totalTokens(newPlayer) === 0
      const larryDone  = totalTokens(newLarry)  === 0
      const maxDone    = totalTokens(newMax)     === 0
      if (playerDone || larryDone || maxDone) {
        const w = playerDone ? 'player' : larryDone ? 'larry' : 'max'
        setWinner(w)
        setPhase('finished')
        setGamesPlayed(g => g + 1)
      }
      setIsRolling(false)
    }, 400)
  }, 350)
}
```

Win check after each removal: first to have all zeros wins. Could be a tie (simultaneous) — declare all tied winners.

### Simulator

Three strategies compared:
1. **Yours** — the exact placement from the last game played
2. **Larry** — even spread
3. **Max** — probability-weighted

```js
function simulateGame(initYou, initLarry, initMax) {
  const boards = {
    you:   { ...initYou },
    larry: { ...initLarry },
    max:   { ...initMax },
  }
  while (true) {
    const sum = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1
    for (const key of ['you', 'larry', 'max']) {
      if (boards[key][sum] > 0) boards[key][sum]--
    }
    for (const key of ['you', 'larry', 'max']) {
      if (Object.values(boards[key]).every(v => v === 0)) return key
    }
  }
}

function runSimulation(n, yourTokens) {
  const wins = { you: 0, larry: 0, max: 0 }
  const ly = larryTokens(), mx = maxTokens()
  for (let i = 0; i < n; i++) {
    const winner = simulateGame(yourTokens, ly, mx)
    wins[winner]++
  }
  return wins
}
```

Bar chart: three bars (You / Larry / Max), your bar highlighted.

### i18n key structure

```
removeOne.title
removeOne.emoji          — 🎯
removeOne.subtitle
removeOne.howToPlay
removeOne.tokensLabel    — "Tokens placed: {{n}} / 18"
removeOne.tokensReady    — "Ready to roll!"
removeOne.rollBtn
removeOne.yourBoard      — "You"
removeOne.larry          — "Lucky Larry"
removeOne.max            — "Max"
removeOne.larryHint      — "Spreads evenly"
removeOne.maxHint        — "Follows the odds"
removeOne.rollResult     — "{{a}} + {{b}} = {{sum}}"
removeOne.win            — "🎉 You win!"
removeOne.lose           — "{{name}} wins!"
removeOne.tie            — "It's a tie!"
removeOne.playAgain
removeOne.explainer.*
removeOne.simulator.*
quiz.removeOne.q1/q2/q3
home.games.removeOne.title
home.games.removeOne.desc
```

## Risks / Trade-offs

- **Three-column board on mobile** — three narrow columns for 11 rows is tight at 375px. Each column shows sum label + small dots. Use compact dot rendering (max 5 dots per row visible, overflow shown as +N number). Or show player's board full-width and bot boards as compact score strips.
- **Simultaneous win** — if player and a bot both clear on the same roll, declare a tie. Rare but needs handling.
- **Simulator uses "your last placement"** — if the player hasn't played yet this session, fall back to an even spread as the "your strategy" baseline.

## Open Questions

None — design fully determined.
