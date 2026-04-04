## ADDED Requirements

### Requirement: Two-Round tournament mode
The Magic Spinner game SHALL offer a "Two Rounds" mode toggle. In this mode the spinner is spun twice per tournament. Round 1 determines the bracket; Round 2 determines the winner. After each spin the current path is highlighted on a two-level tree diagram.

#### Scenario: Round 1 completes and tree highlights path
- **WHEN** Round 1 spin completes
- **THEN** the branch corresponding to the Round 1 result is highlighted; Round 2 branches for the other Round 1 outcomes are dimmed

#### Scenario: Round 2 completes and full path shown
- **WHEN** Round 2 spin completes
- **THEN** the full path (Round 1 branch → Round 2 branch) is highlighted, and the combined probability of that path is displayed

#### Scenario: Tree hidden for more than 4 slices
- **WHEN** the spinner has more than 4 slices
- **THEN** the tree diagram is hidden and replaced by a text summary of the path taken (e.g., "A → B: probability 1/16")

#### Scenario: Next tournament resets path
- **WHEN** the user starts a new tournament after Round 2
- **THEN** the tree diagram clears and Round 1 begins again
