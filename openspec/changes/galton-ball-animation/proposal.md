## Why

The Galton Board is the most visually iconic probability demonstration — balls bouncing through pegs to form a bell curve. But right now the balls don't animate. You click "Drop 1" and a histogram bar silently increments. The peg SVG is static decoration. This is the single biggest missed opportunity in the visualization tier.

## What Changes

Animate individual ball drops through the peg board for single and small-batch drops:

- **Drop 1**: a visible ball falls from the top, bounces L/R at each peg row, then lands in a bin with the histogram updating
- **Drop 10**: balls drop in rapid sequence (slight stagger), each following its random path
- **Drop 100/1000**: remain instant (batch mode) — animating 1000 balls would be overwhelming

The peg board SVG grows slightly taller to accommodate the animation path. Ball paths are determined by the same random L/R logic that already drives `dropBalls()`.

## Capabilities

### New Capabilities

_(none — this enhances the existing galton-board visualization)_

### Modified Capabilities

- `galton-board`: Add animated ball drop through the peg grid for Drop 1 and Drop 10

## Impact

- `src/pages/GaltonBoardPage.jsx` — significant changes to SVG and animation logic (~80-120 new lines)
- No i18n changes needed (the buttons and labels stay the same)
