## 1. Global Styles Update

- [x] 1.1 Update `src/index.css` body background color from `#F5F3FF` to `slate-100` (#F1F5F9).
- [x] 1.2 Update `AppLayout.jsx` container class to use `bg-slate-100` and remove the violet-to-pink gradient.
- [x] 1.3 Update the sticky header in `AppLayout.jsx` to use `bg-white/80` and `backdrop-blur-md`.

## 2. Shared Component Update

- [x] 2.1 Update `ExplainerPanel.jsx` to include a very subtle border (`border border-slate-200/60`) along with the existing accent border.
- [x] 2.2 Reduce shadow intensity on common containers (e.g., from `shadow-sm` to a custom lighter shadow or `shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]`).

## 3. Game Page Polish

- [x] 3.1 Review and update individual game pages (e.g., `CandyJarPage.jsx`, `RollAndRacePage.jsx`) to ensure containers look soft against the new slate-100 background.
- [x] 3.2 Add subtle borders to `bg-white` panels in game pages to define them better on the new background.

## 4. Verification

- [x] 4.1 Verify that the site feels "easier on the eyes" and lacks harsh pure-white blocks.
- [x] 4.2 Verify that text readability remains high across all pages.
- [x] 4.3 Run `npm run build` to ensure no styling breakages.
