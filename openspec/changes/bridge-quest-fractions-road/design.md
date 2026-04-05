## Context

`BridgeQuestPage.jsx` currently generates bridge probabilities as random integers between 30–95 via `Math.round(MIN_BRIDGE_PCT + Math.random() * (MAX_BRIDGE_PCT - MIN_BRIDGE_PCT))`. These are stored as plain numbers. `BridgePill` receives a `pct` number and renders `{pct}%`. Survival is the product of decimals: `bridges.reduce((p, b) => p * b / 100, 1)`.

`PathRow` renders bridges in a `flex flex-wrap gap-1` div — pure horizontal flow, no road metaphor.

## Goals / Non-Goals

**Goals:**
- Bridge values generated as clean fractions; both `num/den` and `pct` stored
- Toggle to switch display between `%` and `n/d` forms
- Road lane layout with bridges at randomised positions

**Non-Goals:**
- SVG animation of player traversal (existing pill-flip animation stays)
- Changing the scoring or tournament logic
- Changing quiz or explainer content

## Decisions

**D1 — Fraction-first generation**
Store each bridge as `{ num, den, pct }` where `pct = Math.round(num/den * 100)`. Survival computation switches to `bridges.reduce((p, b) => p * b.num / b.den, 1)` for exactness. Curated pool: `[{1,2},{1,3},{2,3},{3,4},{4,5},{3,5},{2,5}]`. Random selection with replacement. This ensures every displayed fraction is clean and teaches recognisable values.

Alternative (post-hoc GCD reduction of arbitrary integers): rejected because 63% → 63/100 is pedagogically useless.

**D2 — Toggle state lives in the page component**
`const [showFractions, setShowFractions] = useState(false)` at the `BridgeQuestPage` level. Passed as a prop to `PathRow` → `BridgePill`. A single small toggle chip above the path list. No persistent storage — fresh session always starts in % mode.

**D3 — Road layout: CSS-based, not SVG**
Each `PathRow` becomes a relative-positioned container div with a horizontal "road" line (a thin `border-b` or `div` with fixed height). Bridge pills are `position: absolute` with a `left` percentage computed at generation time. This avoids SVG complexity and remains responsive.

Each bridge in `randomPath()` gets a `xPct` value:
- Divide the lane into N equal zones (N = number of bridges)
- Within each zone, pick a random offset: `zone * (100/N) + Math.random() * (80/N)`
- Clamp so no bridge is within 5% of the lane edges

**D4 — Survival preview in fraction mode**
When fractions are on, the preview shows combined survival as a fraction: multiply numerators and denominators, then simplify via GCD. E.g. `1/2 × 3/4 = 3/8`. This is exact and reinforces the multiplication rule. Alongside it, the dot-bar (100 dots) stays for visual weight.

## Risks / Trade-offs

- [Curated pool coverage] Only 7 fraction options. With 2–4 bridges per path and 3 paths, repetition is expected (e.g. two "1/2" bridges in the same path). This is pedagogically fine — it actually models a realistic probability setup.
- [Absolute positioning on small screens] If the road container is too narrow, bridges may overlap. Mitigation: min-width per bridge pill (~48px), and zone offsets constrained to avoid overlap for up to 4 bridges.
- [i18n for toggle label] Two new keys needed: `bridgeQuest.showFractions` and `bridgeQuest.showPercent`. Trivial.

## Migration Plan

No data persistence to migrate. Deploy via Vercel on merge to `main`. If visual layout breaks on a specific screen size, a follow-up CSS fix is sufficient.
