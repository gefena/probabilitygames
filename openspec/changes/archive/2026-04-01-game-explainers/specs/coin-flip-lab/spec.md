## ADDED Requirements

### Requirement: Coin flip explainer panel
The game SHALL display an explainer panel below the controls and above the statistics chart. The panel SHALL contain:
1. **Concept title**: "The Law of Large Numbers" (localized)
2. **Plain-language explanation**: 2–3 sentences explaining that individual flips are unpredictable but over many flips the results even out toward 50/50
3. **Live worked example**: A sentence using the current total flip count and current heads percentage, formatted as: "You've flipped [N] times. Heads came up [H]% of the time. Flip more to watch it get closer to 50%!" When no flips have been made yet, display the default prompt: "Try flipping 10, then 100, then 1000 times — watch what happens to the heads %!"
4. **Visual aid**: A simple two-segment horizontal bar (purple = heads share, pink = tails share) that updates live, with "50%" marked at the midpoint by a dashed vertical line

#### Scenario: Panel visible on load
- **WHEN** the coin flip page loads
- **THEN** the explainer panel is visible with the concept title, static introductory example text, and the bar showing 50/50 (default state)

#### Scenario: Live example updates after flips
- **WHEN** the user has performed at least 1 flip
- **THEN** the worked example sentence shows the actual flip count and actual heads percentage

#### Scenario: Bar reflects current ratio
- **WHEN** the heads percentage is 60%
- **THEN** the purple segment occupies 60% of the bar width and the pink segment occupies 40%

#### Scenario: Panel is bilingual
- **WHEN** the global language is Hebrew
- **THEN** all explainer panel text displays in Hebrew
