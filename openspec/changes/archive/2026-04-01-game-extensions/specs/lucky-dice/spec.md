## ADDED Requirements

### Requirement: Custom die face editor
The Lucky Dice game SHALL offer a "Custom Die" option alongside the 1 / 2 / 3 dice count selector. In Custom Die mode, the user can set the value of each of the 6 die faces independently (integer 1–99). The distribution chart SHALL update live as face values are changed.

#### Scenario: Custom face values change distribution
- **WHEN** the user sets die faces to [1, 1, 1, 2, 3, 6]
- **THEN** the distribution chart shows value 1 with 3× the frequency of value 6

#### Scenario: Reset to standard die
- **WHEN** the user clicks "Reset to standard"
- **THEN** all six faces return to values 1, 2, 3, 4, 5, 6

#### Scenario: Duplicate face values are allowed
- **WHEN** the user sets multiple faces to the same value (e.g., three faces showing 1)
- **THEN** the distribution chart groups them and shows the combined frequency for that value

#### Scenario: Custom die works with multiple dice
- **WHEN** two custom dice are in use
- **THEN** the sum distribution chart shows sums of two rolls of the custom die
