## 1. Project Setup

- [x] 1.1 Scaffold project with `npm create vite@latest probability-games -- --template react`
- [x] 1.2 Install dependencies: `tailwindcss@3`, `postcss`, `autoprefixer`, `framer-motion`, `react-i18next`, `i18next`, `recharts`, `react-router-dom`, `lucide-react`
- [x] 1.3 Configure Tailwind CSS v3 with `tailwind.config.js` and PostCSS; import in `index.css`
- [x] 1.4 Define design tokens (color palette, font scale, border-radius) as CSS custom properties
- [x] 1.5 Set up React Router with hash-based routing (`HashRouter`) in `main.jsx`
- [x] 1.6 Write `src/i18n/index.js` — initialises i18next with `react-i18next`, loads `en.json` and `he.json`, reads saved language from localStorage
- [x] 1.7 Create empty `src/i18n/en.json` and `src/i18n/he.json` with top-level namespace structure; fill in strings as each feature is built
- [x] 1.8 Add `dir` attribute switching on `<html>` when language changes (LTR ↔ RTL)

## 2. Site Shell

- [x] 2.1 Create `AppLayout` component with top navigation bar (logo + language switcher)
- [x] 2.2 Implement language switcher button (EN / עב) that calls `i18n.changeLanguage()` and persists to localStorage
- [x] 2.3 Build `HomePage` with responsive grid of five `GameCard` components
- [x] 2.4 Create `GameCard` component with `lucide-react` icon, localized title, localized description, and hover animation
- [x] 2.5 Add "Back to Home" button to a shared `GamePageLayout` wrapper used by all game routes
- [x] 2.6 Add route definitions: `/`, `/coin-flip`, `/dice`, `/candy-jar`, `/spinner`, `/card-draw`
- [x] 2.7 Populate `en.json` and `he.json` with all site-shell strings (nav, game titles, descriptions)

## 3. Coin Flip Lab

- [x] 3.1 Create `CoinFlipPage` component with 3D animated coin (CSS `rotateY` via Framer Motion)
- [x] 3.2 Implement single flip logic (Math.random < 0.5 → heads) and flip animation
- [x] 3.3 Add flip-count selector (×1, ×10, ×100) and batch flip logic (no per-coin animation for batch)
- [x] 3.4 Build statistics panel: total flips, heads count, tails count, heads %
- [x] 3.5 Add Recharts `BarChart` for heads vs. tails frequency (updates after each flip/batch)
- [x] 3.6 Implement Reset button that clears all state
- [x] 3.7 Add all coin-flip strings to `en.json` and `he.json`

## 4. Lucky Dice

- [x] 4.1 Create `LuckyDicePage` with animated die components (SVG faces, tumble animation via Framer Motion)
- [x] 4.2 Implement dice count selector (1, 2, 3 dice) and conditional rendering
- [x] 4.3 Add prediction dropdown: face 1–6 when 1 die selected; sum range (2–12 or 3–18) when 2–3 dice selected; reset after each roll
- [x] 4.4 Implement roll logic (`Math.floor(Math.random() * 6) + 1` per die) with tumble animation
- [x] 4.5 Show post-roll feedback with the result, whether prediction matched, and the theoretical probability of that prediction
- [x] 4.6 Build distribution chart: face-count bar chart (6 bars, 1/6 reference) for 1 die; sum-distribution bar chart (11 bars for 2 dice, 16 bars for 3 dice, triangular reference curve) for multi-die; chart resets when dice count changes
- [x] 4.7 Implement Reset and add all dice strings to both locale files

## 5. Candy Jar

- [x] 5.1 Create `CandyJarPage` with a jar SVG/div filled with colored candy circles (Framer Motion layout animation)
- [x] 5.2 Implement composition controls (3 colors by default: red, blue, green) with + / − buttons, enforcing min 0 per color and total ≥ 1
- [x] 5.3 Implement draw-count selector (×1, ×10, ×100) and draw logic: weighted random selection proportional to counts, sampling with replacement; batch draws skip per-candy animation
- [x] 5.4 Animate drawn candy "popping out" of the jar (single draw only); show burst summary for batch draws
- [x] 5.5 Display theoretical probability per color as fraction and percentage (updates on composition change)
- [x] 5.6 Build draw-history bar chart (actual frequency vs. theoretical probability per color)
- [x] 5.7 Implement Reset Draws (clears history, preserves composition) and add all candy jar strings to locale files

## 6. Magic Spinner

- [x] 6.1 Create `MagicSpinnerPage` with an SVG pie-chart spinner component that accepts slice definitions
- [x] 6.2 Implement slice controls: weight adjustment with + / − buttons; spinner redraws in real time
- [x] 6.3 Implement Add Section (max 8) and Remove Section (min 2) with proportional weight redistribution
- [x] 6.4 Assign colors from a preset palette for new slices; label each slice with name and percentage
- [x] 6.5 Implement spin animation: random outcome weighted by slice weights; Framer Motion deceleration animation (≥3 rotations, 2–4 s)
- [x] 6.6 Disable Spin button while animation is running
- [x] 6.7 Show results table/bar chart with per-outcome count, actual frequency %, and theoretical probability
- [x] 6.8 Implement Reset Spins and add all spinner strings to locale files

## 7. Card Draw

- [x] 7.1 Create `CardDrawPage` with a shuffled 52-card deck in state (Fisher-Yates shuffle on init/reset)
- [x] 7.2 Build card component (SVG or styled div) with face-down back design and face showing suit + rank
- [x] 7.3 Implement draw animation: card slides out of deck and flips to reveal face (Framer Motion)
- [x] 7.4 Display remaining card count on the deck; disable Draw button when deck is empty
- [x] 7.5 Build suit probability panel (4 suits, fraction + %) and rank probability panel (persistent dropdown of 13 ranks; updates on draw or rank selection change)
- [x] 7.6 Build drawn-cards history row (scrollable) showing each drawn card in order
- [x] 7.7 Implement conditional-probability explanation text after each draw (localized sentence with updated probability)
- [x] 7.8 Implement Shuffle & Reset and add all card-draw strings to both locale files

## 8. Polish and QA

- [x] 8.1 Verify all pages render correctly in LTR (English) and RTL (Hebrew); fix any layout issues
- [x] 8.2 Check that all Tailwind classes use logical properties (no physical `ml-`/`mr-`) for RTL compatibility
- [x] 8.3 Confirm Hebrew translations are complete and natural-sounding for a 10-year-old audience
- [x] 8.4 Test at 768 px, 1024 px, and 1440 px widths for responsive correctness
- [x] 8.5 Performance check: verify animations run at ≥ 30 fps on a mid-range device (Chrome DevTools profiling)
- [x] 8.6 Verify probability math is correct for all games (unit tests or manual verification)
- [x] 8.7 Run `npm run build` and confirm `dist/` deploys correctly on a static host (or localhost preview)
