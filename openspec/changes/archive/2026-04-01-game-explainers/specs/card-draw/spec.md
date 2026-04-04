## ADDED Requirements

### Requirement: Card draw explainer panel
The game SHALL display an explainer panel below the draw controls and above the drawn-cards history. The panel SHALL contain:
1. **Concept title**: "Probability Changes as Cards Disappear" (localized)
2. **Plain-language explanation**: 2 sentences explaining that unlike coins or dice, drawing cards without putting them back *changes* the probabilities — each card drawn gives new information about what's left
3. **Live before/after example**: Shows a concrete comparison using the actual drawn card (updated after each draw). Format:
   - Before line: "Before this draw: [N+1] cards left, [suit count before] [suit name] → [old prob]% chance"
   - After line: "After drawing [rank][symbol]: [N] cards left, [suit count after] [suit name] → [new prob]% chance"
   - A directional indicator between the two lines: **↓ in orange** if the probability dropped for that suit, **↑ in blue** if it rose, **→ in grey** if unchanged. Avoid red/green so kids don't read "bad/good" into a neutral probability shift.
   - When no card has been drawn yet, display: "Draw your first card to see how the odds change!"
4. **Key insight callout**: A highlighted box reading "This is called conditional probability — the chance of the next event depends on what already happened." (localized)

#### Scenario: Panel shows prompt on load
- **WHEN** the card draw page loads (no cards drawn)
- **THEN** the explainer shows the concept title, explanation, "Draw your first card…" prompt, and the key insight callout

#### Scenario: Before/after example appears after first draw
- **WHEN** the user draws the Ace of Hearts from a full deck
- **THEN** the before line shows "52 cards, 13 Hearts → 25.0%" and the after line shows "51 cards, 12 Hearts → 23.5%" with a ↓ orange indicator showing the probability dropped

#### Scenario: Probability increase shown with blue up-arrow
- **WHEN** a non-heart card is drawn and hearts become more probable relative to remaining cards
- **THEN** the probability change indicator shows ↑ in blue

#### Scenario: Panel updates on every draw
- **WHEN** the user draws another card
- **THEN** the before/after lines update to reflect the most recent draw and the new remaining count

#### Scenario: Panel resets on shuffle
- **WHEN** the user clicks "Shuffle & Reset"
- **THEN** the before/after example reverts to the "Draw your first card…" prompt

#### Scenario: Panel is bilingual
- **WHEN** the global language is Hebrew
- **THEN** all explainer panel text displays in Hebrew
