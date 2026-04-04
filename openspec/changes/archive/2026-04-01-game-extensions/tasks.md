## 1. Candy Jar — No Refill Mode

- [x] 1.1 Add `noRefill` boolean state and a "No Refill" toggle to `CandyJarPage.jsx`; default off
- [x] 1.2 Modify the `draw` function: when `noRefill` is true, decrement the drawn color's count in `colors` state after each draw
- [x] 1.3 Disable draw button and show "Jar is empty — reset to refill" when all color counts reach 0
- [x] 1.4 Handle batch draw (×10, ×100) in no-refill mode: stop early if jar empties mid-batch, report actual draws made
- [x] 1.5 Reset Draws button in no-refill mode restores `colors` to the last configured composition
- [x] 1.6 Add `candy.noRefill.*` i18n keys (toggle label, empty message) to `en.json` and `he.json`

## 2. Magic Spinner — Two Rounds Mode

- [x] 2.1 Add `twoRounds` boolean state and a "Two Rounds" toggle to `MagicSpinnerPage.jsx`
- [x] 2.2 In Two Rounds mode, add `round` (1|2), `round1Result`, `round2Result` state; Spin button advances through the two rounds sequentially
- [x] 2.3 Render a two-level SVG tree diagram (visible only when ≤ 4 slices): first level = Round 1 outcomes, second level = Round 2 outcomes for the Round 1 winner branch; show probability fractions on each branch
- [x] 2.4 After Round 1: highlight the taken branch, dim others; after Round 2: highlight the full path and display the combined probability
- [x] 2.5 For > 4 slices: show a text summary "Round 1: [X] → Round 2: [Y] — combined probability: Z%" instead of the tree
- [x] 2.6 "Next tournament" button resets round state; add `spinner.twoRounds.*` i18n keys

## 3. Lucky Dice — Custom Die

- [x] 3.1 Add a "Custom" option to the dice count selector area in `LuckyDicePage.jsx`; add `customFaces` state (array of 6 integers, default [1,2,3,4,5,6])
- [x] 3.2 Render 6 number inputs (1–99) for the custom die faces; add a "Reset to standard" button
- [x] 3.3 Modify `sumProbabilities` (or add a `customSumProbabilities` variant) to compute the distribution for custom face values; handle duplicate values by grouping
- [x] 3.4 Update the chart and prediction logic to use custom face values when Custom die is selected
- [x] 3.5 Add `dice.custom.*` i18n keys (tab label, face labels, reset button) to `en.json` and `he.json`
