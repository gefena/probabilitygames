## 1. Ball path logic

- [ ] 1.1 Extract a `computeBallPath(rows)` function that returns an array of `{ x, y, bin }` positions — one per peg row plus a final bin position — using the same L/R random logic as the existing `dropBalls`
- [ ] 1.2 Map peg-level positions to SVG coordinates matching the existing peg layout (x-spacing 36px, y-spacing 22px, origin at top center)

## 2. Animated ball component

- [ ] 2.1 Create an `AnimatedBall` component: a `<motion.circle>` that animates through a sequence of (x, y) keyframes using Framer Motion's `animate` prop with keyframe arrays
- [ ] 2.2 Add a subtle visual effect — slight scale bounce at each peg hit, and a final drop into the bin

## 3. Integrate with Drop 1 and Drop 10

- [ ] 3.1 For Drop 1: compute one ball path, render the AnimatedBall, update bin counts after animation completes
- [ ] 3.2 For Drop 10: compute 10 paths, render 10 staggered AnimatedBalls (100ms stagger), update bin counts as each ball lands
- [ ] 3.3 Disable all drop/reset buttons while balls are animating
- [ ] 3.4 Keep Drop 100 and Drop 1000 as instant batch updates (no animation)

## 4. SVG adjustments

- [ ] 4.1 Increase SVG height if needed to accommodate ball starting position above the top peg row and landing zone below the last row
- [ ] 4.2 Ensure bin counts visually update in real-time as each animated ball lands (not all at once at the end)
