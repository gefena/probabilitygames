## ADDED Requirements

### Requirement: Hard mode displays a character disambiguation hint
When `difficulty === 'hard'`, the Hack the Password game SHALL show a visible note near the character input grid informing the student that the charset contains visually similar characters (`0` vs `O`, `1` vs `l` vs `I`).

#### Scenario: Hard mode hint is visible before guessing begins
- **WHEN** the user selects Hard difficulty
- **THEN** a short hint such as "Note: includes 0 (zero) vs O (letter) and 1 (one) vs l (letter)" SHALL be visible near the character grid

#### Scenario: Hint is absent in Easy and Medium modes
- **WHEN** the user selects Easy or Medium difficulty
- **THEN** the disambiguation hint SHALL NOT be shown (those alphabets have no ambiguous pairs)

#### Scenario: Hint does not obstruct gameplay
- **WHEN** the hint is visible
- **THEN** it SHALL be displayed as non-intrusive secondary text (small, subdued color) that does not overlap the character grid or the position display
