## 1. Lucky Combo — fix stale i18n labels

- [x] 1.1 In `LuckyComboPage.jsx`, change `outcomesA` and `outcomesB` state initialization to store a `labelKey` field (the i18n key string) instead of the already-translated label string
- [x] 1.2 Update all places that read `item.label` for display to call `t(item.labelKey ?? item.label)` — if `labelKey` is absent (user-edited custom name), fall back to the raw `label` string
- [x] 1.3 Update the outcome rename handler to set `labelKey: null` and `label: newName` when the user provides a custom name, so language switches don't overwrite it

## 2. Remove One — fix simulator tie handling

- [x] 2.1 In `RemoveOnePage.jsx`, update `simulateGame` to collect ALL keys that cleared on the same roll before returning — if more than one key clears, return an array (e.g., `['you', 'larry']`) instead of a single string
- [x] 2.2 Update `runSimulation` to handle array returns from `simulateGame`: add `1 / tiedKeys.length` to each tied key's win count instead of 1.0
- [x] 2.3 Verify the simulator UI still correctly displays win percentages (they should sum to 100%)

## 3. CoinFlip — prevent stale animation callback

- [x] 3.1 In `CoinFlipPage.jsx`, add a `cancelledRef = useRef(false)` (or `flipIdRef` storing the timeout ID)
- [x] 3.2 In `labFlip`, before `setFlipping(true)`, reset `cancelledRef.current = false`; inside the `setTimeout` callback, check `if (cancelledRef.current) return` before updating any state
- [x] 3.3 In `switchMode`, set `cancelledRef.current = true` before clearing the rest of the state

## 4. GuessThePhone — fix stale closure in give-up restart

- [x] 4.1 In `GuessThePhonePage.jsx`, add `restartTimerRef = useRef(null)` to hold the pending restart timeout ID
- [x] 4.2 In `handleGiveUp`, replace bare `setTimeout(...)` with `restartTimerRef.current = setTimeout(...)` and ensure the callback reads `length` from a ref (or uses the current `length` state value via a ref updated on each render)
- [x] 4.3 In the length-change handler (wherever `startGame(l)` is called on new length selection), add `clearTimeout(restartTimerRef.current)` before starting the new game

## 5. MonteCarloPi — respect pause inside instant-mode chunk

- [x] 5.1 In `MonteCarloPiPage.jsx`, update `dropDarts` (or `runChunk`) to check `runningRef.current` before processing each individual dart (or at minimum each sub-batch of darts within a chunk) and exit early if it is false
- [x] 5.2 Verify that the auto-stop at 100,000 darts still works correctly after the change

## 6. Hack the Password — character disambiguation hint

- [x] 6.1 In `HackThePasswordPage.jsx`, add a small hint element (e.g., a `<p>` with `text-xs text-gray-400`) that is conditionally rendered when `difficulty === 'hard'`
- [x] 6.2 The hint text should read something like: `"Hard mode is case-sensitive — 0 is zero, O is letter O; 1 is one, l is lowercase L, I is uppercase i"` — add an i18n key for it (`hackPassword.hardModeHint`) in both `en.json` and `he.json`
- [x] 6.3 Place the hint below the character keyboard grid so it's visible when choosing characters without blocking the position display

## 7. Probability Bingo — surface Pete's strategy

- [x] 7.1 In `ProbabilityBingoPage.jsx`, add a short caption element below or beside Pete's board label that explains his fixed strategy — e.g., "Pete always places 6, 7, 8 in one row (most-rolled sums)"
- [x] 7.2 Add the i18n key `probabilityBingo.peteStrategyHint` to `en.json` and `he.json` with the caption text
- [x] 7.3 Ensure the hint is only shown for Pete's board (not Larry's, which is randomized)

## 8. Galton Board — remove SVG bin-count labels

- [x] 8.1 In `GaltonBoardPage.jsx`, delete the `counts.map(...)` block that renders `<text>` elements with bin counts inside the SVG (around line 116-124)
- [x] 8.2 Verify the Recharts histogram below still shows correct bar heights and tooltip counts after the removal

## 9. Pizza Builder — show count badges from first order

- [x] 9.1 In `PizzaBuilderPage.jsx`, change the count threshold from `orders.length >= 20` to `orders.length >= 1` (around line 292)
- [x] 9.2 Verify that the badge renders correctly for count `0` (gray badge, already styled) and count `≥1` (purple badge) from the first order onward
