## Context

Current Galton Board: a static SVG showing peg positions (8 rows of pegs, 9 bins). The `dropBalls(n)` function randomly walks each ball through the peg rows (L/R at each level) to determine the final bin, then updates bin counts. The histogram is rendered via Recharts. No animation exists.

The SVG is 320×200 with pegs at known positions: row `r` has `r+2` pegs, x-spaced at 36px, y-spaced at 22px, starting at y=24.

## Goals / Non-Goals

**Goals:**
- Animate a ball visually dropping through the peg grid for Drop 1 and Drop 10
- The ball should bounce L/R at each peg row, following the actual random path that determines which bin it lands in
- The histogram should update after the ball lands
- The animation should feel satisfying — a smooth fall with slight horizontal deflections

**Non-Goals:**
- Physics simulation (no gravity curves, no realistic bouncing — just smooth transitions between peg positions)
- Animating Drop 100 or Drop 1000 (these stay as instant batch updates)
- Sound effects

## Decisions

**SVG-based animation using Framer Motion** — the ball is a `<motion.circle>` that animates through a sequence of (x, y) keyframes. Each keyframe corresponds to a peg level. The L/R decision at each level determines the next x position.

**Animation timing**:
- Drop 1: ~1.2s total (150ms per peg row × 8 rows)
- Drop 10: stagger by 100ms, so all 10 balls complete within ~2.2s

**Ball path calculation**: pre-compute the full path (array of {x, y} positions from top to bin) using the same random logic as `dropBalls()`, then animate along that path. This keeps the math and the visual in sync.

**Disable buttons during animation** — while balls are animating, all drop buttons are disabled to prevent overlapping animations.

**Ball visual**: a small filled circle (r=6), using a gradient or solid violet fill, with slight opacity trail or scale bounce at each peg.

## Risks / Trade-offs

- **Risk**: Drop 10 with 10 simultaneous SVG animations could be janky on low-end phones → Mitigation: if performance is poor, fall back to sequential animation (one ball at a time, fast) instead of parallel
- **Trade-off**: The peg board SVG may need to be taller to show the full path clearly. Current 200px might be tight — may need 240-260px.
