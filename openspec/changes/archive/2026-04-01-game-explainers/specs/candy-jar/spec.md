## ADDED Requirements

### Requirement: Candy jar explainer panel
The game SHALL display an explainer panel below the controls and above the draw history chart. The panel SHALL contain:
1. **Concept title**: "Probability = Part ÷ Whole" (localized)
2. **Plain-language explanation**: 2 sentences explaining that the more candies of one colour you put in, the more likely you are to pick that colour — because probability is just counting
3. **Live worked example**: Derives from the current jar composition. The spotlight colour SHALL be the colour with the highest count (or red if tied). Format: "Right now: [R] red + [B] blue + [G] green = [T] total. Chance of [spotlight colour] = [count]/[T] = [pct]%. Try drawing lots to check!" — the fraction, percentage, and spotlight colour all update live as composition changes. All colour names and sentence fragments SHALL use i18next named interpolation keys (not string concatenation) so Hebrew word order and grammatical agreement can be expressed correctly in the translation.
4. **Visual aid**: A horizontal bar divided into coloured segments (red/blue/green) proportional to the current candy counts, labelled with each colour's percentage. Updates live with composition changes.

#### Scenario: Panel visible on load
- **WHEN** the candy jar page loads with default composition (5 red, 3 blue, 2 green)
- **THEN** the explainer shows "5 red + 3 blue + 2 green = 10 total. Chance of red = 5/10 = 50%." (red is spotlight because it has the most) and the bar shows 50% red, 30% blue, 20% green

#### Scenario: Spotlight colour updates to highest-count colour
- **WHEN** the user increases blue to 12 (making 5 red, 12 blue, 2 green = 19 total)
- **THEN** the spotlight switches to blue and the worked example updates to show "Chance of blue = 12/19 = 63%." and the bar reflects the new proportions

#### Scenario: Visual bar matches composition
- **WHEN** the jar has equal counts of all three colours
- **THEN** each coloured segment in the bar occupies exactly one-third of the width

#### Scenario: Panel is bilingual
- **WHEN** the global language is Hebrew
- **THEN** all explainer panel text displays in Hebrew with RTL layout
