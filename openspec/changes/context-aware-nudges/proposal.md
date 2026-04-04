## Why

The games generate data but don't call attention to surprising moments. A coin flip lab at 100 flips showing 63/37 is interesting — but nobody says "that's totally normal" or "whoa, that's unusually far from 50/50." The Galton Board builds a bell curve but never overlays the expected shape. The "aha" moments that make probability click happen when something surprising is noticed in context, and right now the games don't notice for you.

## What Changes

Add small, reactive text nudges to key games that highlight interesting states:

- **Coin Flip Lab**: "63% heads after 100 flips — that's within normal range" or "78% heads? That's unusually far from 50%! Keep flipping — watch it drift back"
- **Galton Board**: overlay the expected bell curve on the histogram so kids can see actual vs expected
- **Candy Jar**: when the composition changes, highlight how the probability shifted ("Adding 3 reds changed your odds from 20% to 38%!")
- **Lucky Dice**: after enough rolls, note which face appeared most vs expected ("Face 6 showed up 22% of the time — close to the expected 16.7% for a loaded die")

These are not tooltips or modals — they're inline text that appears naturally in the flow, like a coach whispering "Look at that!"

## Capabilities

### New Capabilities

- `context-nudges`: Reactive inline nudges that highlight interesting probability moments during gameplay

### Modified Capabilities

_(none)_

## Impact

- New utility: `src/utils/nudges.js` (functions that evaluate game state and return nudge text keys, or null)
- Modified pages: CoinFlipPage, GaltonBoardPage, CandyJarPage, LuckyDicePage
- `src/i18n/en.json` and `he.json` — nudge text strings with interpolation variables
