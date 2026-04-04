## 1. Rewrite i18n text — Original 5 games (en.json)

- [x] 1.1 Rewrite `coin.instructions` to a how-to-play instruction; rename `explainer.coin.title` from "The Law of Large Numbers" to kid-friendly; soften body text; add `explainer.coin.furtherReading` with formal name + game connection
- [x] 1.2 Rewrite `dice.instructions`; rename `explainer.dice1.title` from "Equal Chances" to "Every Face Is Equally Likely"; rename `explainer.dice3.title` from "The Bell Curve" to "Why Do Middle Numbers Show Up More?"; add `explainer.dice3.furtherReading` (Central Limit Theorem) (keep dice2 as-is)
- [x] 1.3 Rewrite `candy.instructions`; rename `explainer.candy.title` from "Probability = Part ÷ Whole" to "More of One Colour = Better Chance"; add `explainer.candy.furtherReading` (Classical Probability)
- [x] 1.4 Rewrite `spinner.instructions` (keep explainer title — already kid-friendly, no furtherReading needed)
- [x] 1.5 Rewrite `cards.instructions`; soften `explainer.cards.callout` to remove "conditional probability" label; add `explainer.cards.furtherReading` (Conditional Probability)

## 2. Rewrite i18n text — Advanced games (en.json)

- [x] 2.1 Improve `houseAlwaysWins.subtitle`; rename `houseAlwaysWins.explainer.title` from "What is House Edge?" to "Why the Casino Always Profits"; simplify explainer body formula; add `houseAlwaysWins.howToPlay`; add `houseAlwaysWins.explainer.furtherReading` (Expected Value & House Edge)
- [x] 2.2 Keep `birthdayRoom.subtitle` and explainer (already great); add `birthdayRoom.howToPlay`
- [x] 2.3 Rename `mysteryMachine.explainer.title` from "Statistical Inference" to "How to Be a Probability Detective"; soften body text; add `mysteryMachine.howToPlay`; add `mysteryMachine.explainer.furtherReading` (Statistical Inference)
- [x] 2.4 Rename `prizeMachine.explainer.title` from "Expected Value" to "What You'll Win (or Lose) on Average"; remove sigma notation from body; improve subtitle; add `prizeMachine.howToPlay`; add `prizeMachine.explainer.furtherReading` (Expected Value / EV)
- [x] 2.5 Improve `luckyCombo.subtitle` to remove "compound probabilities"; add `luckyCombo.howToPlay`

## 3. Rewrite i18n text — Patterns in Chaos games (en.json)

- [x] 3.1 Improve `galtonBoard.subtitle` (remove "bell curve" from opening); rename explainer title from "Why a Bell Curve?" to "Why Does Randomness Make a Shape?"; remove "Central Limit Theorem" label from body; add `galtonBoard.howToPlay`; add `galtonBoard.explainer.furtherReading` (Central Limit Theorem / Normal Distribution)
- [x] 3.2 Rewrite `randomWalk.subtitle` (remove √steps); rename explainer title from "The √n Law" to "The Surprising Rule of Random Steps"; rewrite body to explain √ gently; add `randomWalk.howToPlay`; add `randomWalk.explainer.furtherReading` (√n Diffusion Law / Brownian Motion)
- [x] 3.3 Add `monteCarloPi.howToPlay` with a brief "what is π?" intro; add `monteCarloPi.explainer.furtherReading` (Monte Carlo Method)
- [x] 3.4 Add `montyHall.howToPlay`; add `montyHall.explainer.furtherReading` (Conditional Probability / Bayes' Theorem)

## 4. Hebrew translations (he.json)

- [x] 4.1 Translate all updated/added keys from tasks 1.x, 2.x, 3.x to Hebrew in he.json — matching the kid-friendly tone, including all furtherReading entries

## 5. ExplainerPanel component update

- [x] 5.1 Add optional `furtherReading` prop to `ExplainerPanel` component — rendered after callout/example with dashed top border, small muted text, 📚 prefix

## 6. Wire up furtherReading in all game pages

- [x] 6.1 Pass `furtherReading={t('explainer.{game}.furtherReading')}` to ExplainerPanel in: CoinFlipPage, LuckyDicePage (dice3 only), CandyJarPage, CardDrawPage
- [x] 6.2 Pass `furtherReading={t('{game}.explainer.furtherReading')}` to ExplainerPanel in: HouseAlwaysWinsPage, MysteryMachinePage, PrizeMachinePage, GaltonBoardPage, RandomWalkPage, MonteCarloPiPage, MontyHallPage

## 7. Add howToPlay rendering to 9 game pages

- [x] 7.1 Add `{t('{ns}.howToPlay')}` paragraph to: HouseAlwaysWinsPage, BirthdayRoomPage, MysteryMachinePage, PrizeMachinePage, LuckyComboPage, GaltonBoardPage, RandomWalkPage, MonteCarloPiPage, MontyHallPage — styled as `text-sm text-gray-500 mb-6 max-w-xl mx-auto text-center`, placed below the subtitle

## 8. Verify

- [x] 8.1 Run `npm run lint` — 0 errors
- [x] 8.2 Run `npm run build` — clean build
