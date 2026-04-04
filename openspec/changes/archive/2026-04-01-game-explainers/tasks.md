## 1. Shared ExplainerPanel Component

- [x] 1.1 Create `src/components/ExplainerPanel.jsx` with props: `title`, `body`, `example` (string or JSX), `visual` (optional JSX), `callout` (optional highlighted note), `accentColor` (Tailwind border-color class, e.g. `border-violet-500`)
- [x] 1.2 Style the panel: white card with rounded-3xl, a left accent border using `accentColor` prop, `title` in bold, `body` in regular text, `example` in a lightly shaded box, `callout` in amber background
- [x] 1.3 Add only the top-level `"explainer": {}` namespace key to both `en.json` and `he.json`; individual game strings are added in tasks 2.4, 3.6, 4.4, 5.4, and 6.6

## 2. Coin Flip Explainer

- [x] 2.1 Add `ExplainerPanel` to `CoinFlipPage.jsx` between the controls and the stats card, with the "Law of Large Numbers" title and static body text
- [x] 2.2 Wire the live worked example: derive current flip count and heads % from existing state; show introductory prompt when `total === 0`
- [x] 2.3 Build the two-segment horizontal bar visual (purple = heads share, pink = tails share) with a dashed 50% midpoint line; update on every flip
- [x] 2.4 Add English and Hebrew strings for coin-flip explainer to locale files

## 3. Lucky Dice Explainer

- [x] 3.1 Add `ExplainerPanel` to `LuckyDicePage.jsx` between the feedback section and the chart; content driven by `numDice` state
- [x] 3.2 Implement 1-die panel: title "Equal Chances", body, six die-face emoji row (⚀–⚅) each labelled "1/6", and static worked example
- [x] 3.3 Implement 2-dice panel: title "Why Does 7 Win?", body, mini table of sums 6/7/8 with their way-counts (5/6/5), and the 1+6…6+1 worked example
- [x] 3.4 Implement 3-dice panel: title "The Bell Curve", body with the sum 10 vs. sum 3 worked example, and an emoji visual hinting at the bell shape (e.g., ▁▂▄▇█▇▄▂▁)
- [x] 3.5 Panel switches immediately when dice count changes (already re-renders because `numDice` is state)
- [x] 3.6 Add English and Hebrew strings for dice explainer to locale files

## 4. Candy Jar Explainer

- [x] 4.1 Add `ExplainerPanel` to `CandyJarPage.jsx` between the draw controls and the chart
- [x] 4.2 Build live worked example: compute spotlight colour as the color with the highest count (tie-break: red); format using i18next named interpolation keys (`{{r}}`, `{{rLabel}}`, `{{b}}`, `{{bLabel}}`, `{{g}}`, `{{gLabel}}`, `{{total}}`, `{{spotlightLabel}}`, `{{spotlightCount}}`, `{{pct}}`) so Hebrew translation can express correct word order and grammatical agreement
- [x] 4.3 Build the live coloured bar visual: three segments (red/blue/green) proportional to current counts, each labelled with its percentage; updates via `colors` state
- [x] 4.4 Add English and Hebrew strings for candy-jar explainer to locale files, using the named interpolation keys from task 4.2; verify Hebrew sentence is grammatically correct with a native-speaker review or reference

## 5. Magic Spinner Explainer

- [x] 5.1 Add `ExplainerPanel` to `MagicSpinnerPage.jsx` between the spinner controls and the results chart
- [x] 5.2 Build live worked example: map over `slices` to produce "[label] = [weight]/[total] = [pct]%" per slice; updates whenever `slices` changes
- [x] 5.3 Add the "fair vs. unfair spinner" amber callout box with the suggestion to make all weights equal
- [x] 5.4 Add English and Hebrew strings for spinner explainer to locale files

## 6. Card Draw Explainer

- [x] 6.1 Add `ExplainerPanel` to `CardDrawPage.jsx` between the draw controls/deck area and the drawn-cards history
- [x] 6.2 Store `prevSuitCounts` in state (captured just before each draw) to enable the before/after comparison; derive `prevSuitCounts` from deck before removing the drawn card
- [x] 6.3 Render the before/after example: "Before: [N+1] cards, [cnt] [suit] → [oldProb]%" and "After: [N] cards, [cnt] [suit] → [newProb]%" with a directional indicator: ↓ orange if probability dropped, ↑ blue if rose, → grey if unchanged (no red/green to avoid good/bad connotation)
- [x] 6.4 Show introductory prompt ("Draw your first card…") when `drawn.length === 0`; reset to prompt on shuffle
- [x] 6.5 Add the "conditional probability" amber callout box
- [x] 6.6 Add English and Hebrew strings for card-draw explainer to locale files
