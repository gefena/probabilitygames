## Context

14 game pages, react-i18next, EN/HE bilingual. The original 5 games use `{ns}.instructions` as a subtitle-like blurb shown in the page body. The other 9 games use `{ns}.subtitle` displayed via a `<p>` tag below the title. Explainer panel titles and body text are in either `explainer.{game}.*` (original 5) or `{game}.explainer.*` (later games).

## Goals / Non-Goals

**Goals:**
- Every game has a clear "how to play" instruction visible before the user touches any controls
- Zero academic jargon in explainer titles — lead with curiosity, footnote the formal name (if at all)
- Subtitles hook kids emotionally: wonder, surprise, challenge — not concept definitions
- All changes in both EN and HE

**Non-Goals:**
- No changes to quiz content
- No changes to game mechanics or interactivity

## Decisions

### How-to-play placement
For the 9 newer games (houseAlwaysWins through montyHall), add a `{ns}.howToPlay` i18n key and render it as a styled `<p>` tag below the subtitle, before the main game area. Same visual style as the existing `instructions` pattern: `text-sm text-gray-500 mb-6 max-w-xl mx-auto text-center`.

For the original 5 games, improve the existing `.instructions` keys to be more instructive (they currently describe the game concept rather than telling the kid what to do).

### Explainer title rewrite strategy
Replace the formal name with a question or observation that captures the same idea:

| Game | Current Title | New Title |
|---|---|---|
| Coin Flip | The Law of Large Numbers | Why Does It Get Closer to 50/50? |
| Dice (1) | Equal Chances | Every Face Is Equally Likely |
| Dice (2) | Why Does 7 Win? | _(keep — already curiosity-driven)_ |
| Dice (3) | The Bell Curve | Why Do Middle Numbers Show Up More? |
| Candy Jar | Probability = Part ÷ Whole | More of One Colour = Better Chance |
| Spinner | Bigger Slice = Better Chance | _(keep — already kid-friendly)_ |
| Card Draw | Probability Changes as Cards Disappear | _(keep — already descriptive)_ |
| House Always Wins | What is House Edge? | Why the Casino Always Profits |
| Birthday Room | Why Does 23 Work? | _(keep — curiosity-driven)_ |
| Mystery Machine | Statistical Inference | How to Be a Probability Detective |
| Prize Machine | Expected Value | What You'll Win (or Lose) on Average |
| Lucky Combo | AND vs. OR | _(keep — already concise)_ |
| Galton Board | Why a Bell Curve? | Why Does Randomness Make a Shape? |
| Random Walk | The √n Law | The Surprising Rule of Random Steps |
| Monte Carlo π | Why Does This Find π? | _(keep — already a question)_ |
| Monty Hall | Why Switching Wins 2/3 of the Time | _(keep — direct and clear)_ |

### De-jargon body text
Remove or soften these specific phrases in explainer body text:
- "Central Limit Theorem" → explain the idea without naming the theorem
- "conditional probability" (Card Draw callout) → "the chance changes based on what already happened"
- "statistical inference" (Mystery Machine body) → "using evidence to figure out hidden probabilities"
- "EV = Σ(payout × probability)" (Prize Machine) → plain-language breakdown without sigma notation
- "proportional to √n" (Random Walk) → "grows with the square root of the number of steps — that means after 100 steps you're about 10 away, after 400 steps about 20 away"

### Subtitle rewrites
Only rewrite subtitles that lead with jargon:
- Galton Board: lead with wonder, not "bell curve"
- Random Walk: remove √steps from subtitle
- Lucky Combo: remove "compound probabilities"
- Prize Machine: simplify "expected value predicts your balance"

### "Further Reading" appendix block
Games that reference formal mathematical concepts get a new `{ns}.explainer.furtherReading` (or `explainer.{ns}.furtherReading` for original 5) i18n key rendered at the bottom of the ExplainerPanel. This provides:
- The formal name of the concept (e.g. "This idea is called the **Law of Large Numbers**")
- A brief explanation of how the game connects to it ("What you just saw — flips getting closer to 50/50 — is exactly what this law describes")

This lives inside the ExplainerPanel component as an optional `furtherReading` prop, rendered after the callout in a subtle style (small text, muted color, dashed top border).

### ExplainerPanel component change
Add an optional `furtherReading` prop to ExplainerPanel:
- Rendered after the callout (or after the example if no callout)
- Styled: `border-t border-dashed border-gray-200 mt-3 pt-3 text-xs text-gray-500 leading-relaxed`
- Prefixed with 📚 emoji

Games that get a furtherReading appendix:
| Game | Formal Concept |
|---|---|
| Coin Flip | Law of Large Numbers |
| Dice (3 dice) | Central Limit Theorem |
| Candy Jar | Classical Probability |
| Card Draw | Conditional Probability |
| House Always Wins | Expected Value & House Edge |
| Mystery Machine | Statistical Inference |
| Prize Machine | Expected Value (EV) |
| Galton Board | Central Limit Theorem / Normal Distribution |
| Random Walk | √n Diffusion Law / Brownian Motion |
| Monte Carlo π | Monte Carlo Method |
| Monty Hall | Conditional Probability / Bayes' Theorem |

## Risks / Trade-offs

- Rewriting explainer titles changes the anchor text that users may have seen before. Acceptable — the content is pre-launch.
- Hebrew translations must capture the same kid-friendly tone, not just translate literally. Use playful Hebrew phrasing.
- The furtherReading block is optional per game — not every game needs one (Birthday Room, Spinner, Lucky Combo, Dice 1/2 are already jargon-free).
