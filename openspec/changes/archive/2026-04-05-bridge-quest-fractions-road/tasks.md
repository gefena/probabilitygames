## 1. Fraction-Based Bridge Generation

- [x] 1.1 Define the curated fraction pool constant in `BridgeQuestPage.jsx`: `[{num:1,den:2},{num:1,den:3},{num:2,den:3},{num:3,den:4},{num:4,den:5},{num:5,den:6},{num:9,den:10},{num:3,den:5},{num:2,den:5}]`
- [x] 1.2 Rewrite `randomPath()` to pick bridges from the pool (with replacement), storing `{ num, den, pct: Math.round(num/den*100) }` per bridge, and add a random `xPct` position per bridge (zone-based, non-overlapping)
- [x] 1.3 Update survival computation to multiply `num/den` fractions exactly instead of using the rounded `pct` value
- [x] 1.4 Add a GCD helper function and `simplifyFraction(num, den)` utility for combined survival display

## 2. Fraction/Percentage Toggle

- [x] 2.1 Add `showFractions` state (`useState(false)`) to `BridgeQuestPage`
- [x] 2.2 Add a toggle chip/button above the path list wired to `showFractions`
- [x] 2.3 Add i18n keys `bridgeQuest.showFractions` and `bridgeQuest.showPercent` to `en.json` and `he.json`
- [x] 2.4 Update `BridgePill` to accept a `showFraction` prop and render `{num}/{den}` or `{pct}%` accordingly
- [x] 2.5 Update the survival preview in `PathRow` to show simplified fraction (e.g. "3/8") when `showFractions` is true

## 3. Road Lane Visual Layout

- [x] 3.1 Replace the `flex flex-wrap gap-1` bridge container in `PathRow` with a `position: relative` road lane div that has a visible horizontal road line
- [x] 3.2 Render each `BridgePill` as `position: absolute` at `left: {bridge.xPct}%` within the road lane
- [x] 3.3 Add START indicator on the left end and FINISH/arrow indicator on the right end of each road lane
- [x] 3.4 Ensure road lane has a minimum height to accommodate the absolute-positioned bridge pills without overflow
- [x] 3.5 Verify bridges don't visually overlap at 2, 3, and 4-bridge counts across common screen sizes
