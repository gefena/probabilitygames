## Why

The main specs have accumulated redundant and game-specific content over many incremental changes — individual route requirements, per-game locale requirements, and hotfix changelog scenarios that duplicate broader general requirements. This makes the specs harder to read and maintain without adding useful information.

## What Changes

- Collapse 8+ individual "Route for X page" requirements in `site-shell` into one general routing requirement
- Merge additive "add X to home page" requirements into the general home page requirement
- Delete 6 game-specific hotfix scenarios from `i18n-completeness` (MysteryMachine, BirthdayRoom, MontyHall ×2, LuckyCombo, MagicSpinner) that document past bugs rather than standing requirements
- Delete 3 per-game locale requirements from `i18n-completeness` (guess-phone, hack-password, greedy-pig) that are covered by the general key-parity requirement
- Replace the `diceDetective`-specific scenario in `quiz-engine` with a generic one

No game behavior, routing, or i18n logic changes. This is spec-only cleanup.

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `site-shell`: Consolidate route and home-page requirements — no behavioral change, just removing duplicates
- `i18n-completeness`: Remove game-specific hotfix scenarios and per-game locale requirements covered by general requirements
- `quiz-engine`: Generalize the diceDetective-specific bank conformance scenario

## Impact

- `openspec/specs/site-shell/spec.md` — significant restructuring (~70 lines removed)
- `openspec/specs/i18n-completeness/spec.md` — remove ~65 lines of redundant content
- `openspec/specs/quiz-engine/spec.md` — replace 1 game-specific scenario with a generic one
- No source code changes
