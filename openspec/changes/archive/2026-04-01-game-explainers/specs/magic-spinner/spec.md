## ADDED Requirements

### Requirement: Spinner explainer panel
The game SHALL display an explainer panel below the spinner and controls, and above the results chart. The panel SHALL contain:
1. **Concept title**: "Bigger Slice = Better Chance" (localized)
2. **Plain-language explanation**: 2 sentences explaining that the spinner lands on a slice in proportion to its size — a slice that takes up half the wheel gets hit half the time
3. **Live worked example**: Lists the current slices and their probability as a fraction of the total weight, formatted as: "With your current spinner: [A] takes up [wA]/[total] = [pct]%, [B] takes up [wB]/[total] = [pct]%, …" — updates live as weights change
4. **Fair vs. unfair callout**: A highlighted note reading "A fair spinner has equal slices — every outcome gets the same chance. Make all weights equal and watch the chart even out!" (localized). The note is highlighted in a distinct colour (e.g., amber background) to draw attention.

#### Scenario: Panel visible on load
- **WHEN** the spinner page loads with 4 equal slices (weight 1 each)
- **THEN** the explainer shows each slice at 1/4 = 25% and the fair-spinner callout is visible

#### Scenario: Live example updates on weight change
- **WHEN** the user increases slice A's weight to 3 (others remain 1, total = 6)
- **THEN** the worked example updates to show A = 3/6 = 50% and the other slices at 1/6 ≈ 17%

#### Scenario: Example updates on slice add/remove
- **WHEN** the user adds a new slice
- **THEN** the worked example immediately reflects the new total weight and all updated percentages

#### Scenario: Panel is bilingual
- **WHEN** the global language is Hebrew
- **THEN** all explainer panel text displays in Hebrew
