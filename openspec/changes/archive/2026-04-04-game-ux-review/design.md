## Context

Nine issues were found across seven game pages through code review: four are correctness bugs (wrong state, wrong simulation output), three are UX clarity issues, and two are display polish items. All fixes are isolated to individual component files — no shared infrastructure changes are needed.

## Goals / Non-Goals

**Goals:**
- Eliminate the four correctness bugs (Lucky Combo i18n, Remove One simulator, CoinFlip timeout leak, GuessThePhone stale closure)
- Fix the MonteCarloPi mid-chunk pause issue
- Make Hack the Password Hard mode characters visually distinguishable
- Surface Pete's strategy to the user in Probability Bingo
- Remove the jarring Galton Board `99+` cap and Pizza Builder badge cliff

**Non-Goals:**
- Redesigning any game mechanics
- Changing quiz content or scoring
- Addressing the broader i18n architecture (only the LuckyCombo usage pattern is fixed)

## Decisions

**Lucky Combo — store translation keys, not translated strings**
`useState(() => [{ label: t('luckyCombo.defaultA1') }])` calls `t()` once at mount time. The fix: store `{ labelKey: 'luckyCombo.defaultA1' }` in state and call `t(item.labelKey)` at render. User-edited labels (after renaming) are free strings and remain unchanged. Alternative considered: call `useTranslation` effect to re-seed state on `i18n.language` change — rejected as more complex and fragile.

**Remove One simulator — detect simultaneous clears**
The `simulateGame` loop checks for a winner after every roll. Currently it iterates `['you', 'larry', 'max']` and returns the first key with all-zero tokens, silently resolving simultaneous clears as a `you` win. Fix: collect all keys that cleared in the same roll and return a concatenated key (`'you+larry'`). `runSimulation` accumulates fractional wins (each tied player gets 0.5 contribution) or simply counts each tie as a separate bucket. Simplest safe fix: split the win equally (0.5 per player) reflected in the displayed win-rate percentage.

**CoinFlip — cancel stale timeouts on mode switch**
`labFlip` uses `setTimeout(callback, 600)`. Add a `cancelRef = useRef(false)` that is set to `true` in `switchMode`, and checked inside the timeout callback before updating state. The ref is reset to `false` each time `labFlip` starts. Alternative: `clearTimeout` on the timer ID — also valid but requires storing the ID in a ref, slightly more code.

**GuessThePhone — use a ref for the restart timeout**
Store the give-up timer in `restartRef = useRef(null)`. `handleGiveUp` stores the timer: `restartRef.current = setTimeout(...)`. The length-change handler cancels any pending restart: `clearTimeout(restartRef.current)` before starting the new game. This prevents the double `startGame` race.

**MonteCarloPi — check ref inside the dart loop**
`dropDarts(batchSize)` is a single synchronous call that adds `batchSize` darts with no pause check. Two options: (a) move the `runningRef.current` check inside `dropDarts` so it exits early, or (b) reduce batchSize for instant mode so overshoot is negligible. Option (a) is cleaner.

**Hack the Password — monospace font with clear 0/O disambiguation**
The reveal and keyboard grid use `font-mono`. Tailwind's default monospace stack (`ui-monospace, SFMono-Regular, ...`) already has decent disambiguation, but adding a small colored badge (`0` = blue tint, `O` = neutral) is too complex. Simpler: wrap the revealed secret in a `font-mono tracking-widest` span with a note "(case-sensitive — 0 is zero, O is letter O, 1 is one, l is lowercase L)" visible in Hard mode only. The hint renders below the character grid when `difficulty === 'hard'`.

**Probability Bingo — Pete strategy caption**
A one-line hint below Pete's board: "Pete places tokens on the most-rolled sums (6, 7, 8 in a row)." This is always visible during the game, educating the student without cluttering the UI. No new state required.

**Galton Board — remove SVG count labels**
The bar height in the histogram communicates relative frequency. The SVG labels at `y=205` are an 8px font squeezed into a 28px bin column — unreadable at scale and capped at `99+`. Remove them entirely. The separate histogram below the SVG already shows exact counts on hover via Recharts tooltip.

**Pizza Builder — show count badges progressively**
Change the threshold from 20 to 1: `count = orders.length >= 1 ? cellCount(orders, ci, ti) : null`. When `count === 0`, display a subdued badge (already styled with `bg-gray-300`). This provides immediate feedback and removes the visual cliff. The educational point (results stabilize over more orders) is preserved — the badge just starts at 0 rather than appearing all at once.

## Risks / Trade-offs

- Lucky Combo: user-defined label renames are still stored as raw strings. On language switch, only the default labels update; custom names stay. This is correct behaviour (user chose that name). → No mitigation needed.
- Remove One simulator: splitting ties as 0.5 wins slightly changes displayed win percentages for strategies that frequently tie. The difference is small (ties are rare) and is more accurate than before. → Accept.
- Galton Board label removal: users lose the exact bin count from the SVG overlay. The Recharts histogram tooltip still provides it. → Accept.

## Open Questions

- None.
