### Requirement: Animated coin flip
The game SHALL display a large animated coin that flips (3D rotation animation) each time the user triggers a flip, landing on Heads or Tails. The result SHALL be determined by a fair random 50/50 calculation.

#### Scenario: Single flip
- **WHEN** the user clicks the "Flip!" button
- **THEN** the coin plays a 3D flip animation and displays the result (Heads or Tails) with the matching face

#### Scenario: Fair randomness
- **WHEN** the user performs 1000 flips total
- **THEN** both outcomes are possible on every flip (no deterministic sequence)

### Requirement: Multi-flip mode
The game SHALL allow the user to flip 10 or 100 coins at once using a selector. When flipping many coins, each result SHALL be added to the running totals instantly (no per-coin animation; only a summary animation).

#### Scenario: Flip 10 at once
- **WHEN** the user selects "×10" and clicks Flip
- **THEN** 10 results are generated at once, the totals update by 10, and a quick burst animation plays

#### Scenario: Flip 100 at once
- **WHEN** the user selects "×100" and clicks Flip
- **THEN** 100 results are generated instantly and totals update

### Requirement: Live statistics panel
The game SHALL show a statistics panel that updates after every flip, displaying: total flips, heads count, tails count, heads percentage, and a bar chart of heads vs. tails frequencies.

#### Scenario: Stats update after flip
- **WHEN** a flip (or batch of flips) completes
- **THEN** all statistics and the bar chart update to reflect the new totals

#### Scenario: Percentage approaches 50%
- **WHEN** the user has performed many flips
- **THEN** the heads percentage value is visible and animated toward 50% over time

### Requirement: Reset
The game SHALL include a Reset button that clears all flip history and resets statistics to zero.

#### Scenario: Reset clears history
- **WHEN** the user clicks Reset
- **THEN** all counters return to 0, the chart resets, and the coin returns to its neutral state

### Requirement: Bilingual content
All labels, buttons, and instructional text in this game SHALL be available in both English and Hebrew, controlled by the global language setting.

#### Scenario: Hebrew mode
- **WHEN** the global language is set to Hebrew
- **THEN** all in-game text (button labels, stat labels, instructions) displays in Hebrew

### Requirement: Coin flip explainer panel
The game SHALL display an explainer panel that teaches the user about coin-flip probability. The panel SHALL be visible on load without any user action, update its live example after flips, reflect the current heads/tails ratio in a visual bar, and be available in both English and Hebrew.

#### Scenario: Panel visible on load
- **WHEN** the game loads
- **THEN** the explainer panel is visible without any user interaction, showing introductory probability text

#### Scenario: Live example updates after flips
- **WHEN** the user has performed one or more flips
- **THEN** the explainer panel's live example updates to reference the actual heads and tails counts from the current session

#### Scenario: Bar reflects current ratio
- **WHEN** the heads/tails counts change
- **THEN** the visual bar inside the explainer panel updates to reflect the current heads-to-tails ratio

#### Scenario: Bilingual
- **WHEN** the global language is switched between English and Hebrew
- **THEN** all explainer panel text (including the live example) displays in the selected language

### Requirement: Coin flip quiz
The coin flip game SHALL include a QuizPanel below the explainer, with a question bank that tests understanding of fairness and the law of large numbers using biased-coin scenarios.

The question bank SHALL contain at least 3 questions covering:
1. **Biased coin identification**: A coin lands heads 70% of the time — can you tell after 5 flips? After 1000?
2. **Long-run vs. short-run**: After 10 flips all heads, is the next flip more likely tails? (gambler's fallacy)
3. **Fair coin definition**: If a coin is fair, what percentage of heads do you expect over a very large number of flips?

#### Scenario: Quiz appears below explainer
- **WHEN** the coin flip page is loaded
- **THEN** the QuizPanel is visible below the ExplainerPanel showing the first question

#### Scenario: Gambler's fallacy question teaches independence
- **WHEN** the user answers the question about whether tails is "due" after many heads
- **THEN** the explanation clarifies that each flip is independent — past results do not affect future flips

#### Scenario: Biased coin question links to the game
- **WHEN** the user reads the question about a 70% heads coin
- **THEN** the explanation suggests setting the multiplier to ×100 and observing whether heads dominates

### Requirement: Quiz explanations are age-appropriate
Quiz explanations SHALL use plain language suitable for a 10-year-old. Academic gambling terminology (e.g. "Gambler's Fallacy") SHALL NOT appear in explanation text; the concept SHALL be explained in plain language instead.

#### Scenario: Coin flip quiz q2 explanation
- **GIVEN** the user answers the question about whether previous flips affect future ones
- **WHEN** the explanation is revealed
- **THEN** the text explains that the coin has no memory and each flip is independent
- **AND** the phrase "Gambler's Fallacy" does not appear in the explanation

### Requirement: CoinFlip lab-mode animation does not update state after mode switch
The `labFlip` animation timeout callback (600 ms) SHALL NOT update `heads`, `tails`, or `lastResult` state if the user has switched away from lab mode before the timeout fires.

#### Scenario: User switches to streak mode while flip animation is in flight
- **WHEN** the user clicks "Flip" in lab mode and then immediately switches to streak mode before the 600 ms animation completes
- **THEN** the lab mode state (`heads`, `tails`) SHALL NOT be incremented by the stale callback

#### Scenario: Normal lab flip completes without interference
- **WHEN** the user clicks "Flip" in lab mode and does not switch modes
- **THEN** the flip SHALL complete normally and update `heads` or `tails` as before
