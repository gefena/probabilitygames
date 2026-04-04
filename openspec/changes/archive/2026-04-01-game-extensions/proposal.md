## Why

Three existing games have natural depth that is currently unexplored. Adding one focused extension to each makes each game richer without requiring a full new page, and reinforces cross-game connections (e.g., the custom die builder connects dice probability to the spinner's weight model).

## What Changes

1. **Candy Jar — "No Refill" mode**: Add a toggle so drawn candies are *not* replaced. The jar shrinks with each draw, composition changes, and probability updates live — connecting Candy Jar to Card Draw's conditional probability concept.

2. **Magic Spinner — Two-Round mode**: Add a "tournament" mode where the spinner is spun twice. Round 1 places the player in a bracket; Round 2 determines the winner. A tree diagram shows how the two-round probabilities multiply.

3. **Lucky Dice — Custom Die**: Add a "custom die" editor where each face value can be set independently (e.g., faces 1,1,1,2,3,6). The distribution chart updates live, connecting dice probability to the spinner's weight concept.

## Capabilities

### Modified Capabilities

- `candy-jar`: Add "No Refill" (without-replacement) draw mode.
- `magic-spinner`: Add Two-Round tournament mode with tree diagram.
- `lucky-dice`: Add Custom Die face editor.

### New Capabilities

_(none)_

## Impact

- Modified files: `CandyJarPage.jsx`, `MagicSpinnerPage.jsx`, `LuckyDicePage.jsx`
- New i18n keys for each extension
- No new dependencies
