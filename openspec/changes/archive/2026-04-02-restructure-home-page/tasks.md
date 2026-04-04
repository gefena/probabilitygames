## 1. i18n keys (new keys only)

- [x] 1.1 Add `home.tiers.startHere.title` and `home.tiers.startHere.tagline` to `en.json` and `he.json`
- [x] 1.2 Add `home.tiers.goDeeper.title` and `home.tiers.goDeeper.tagline` to `en.json` and `he.json`

## 2. HomePage rewrite

- [x] 2.1 Replace `GAMES` array and all hard-coded sections in `HomePage.jsx` with a single `TIERS` array; each game entry carries explicit `titleKey` and `descKey` props pointing to existing i18n paths (see design.md for full data structure)
- [x] 2.2 Render each tier as a section: heading (`t(tier.titleKey)`), tagline (`t(tier.taglineKey)`), and a responsive `GameCard` grid using `t(game.titleKey)` / `t(game.descKey)`
- [x] 2.3 Wrap `crackTheCode` and `patternsInChaos` tiers in dark background panels (`bg-slate-800` / `bg-slate-900` rounded-3xl)
- [x] 2.4 Remove all `motion.button` bespoke navigation elements — every game entry uses `GameCard`

## 3. Verify

- [x] 3.1 Run `npm run lint` — 0 errors
- [x] 3.2 Run `npm run build` — clean build
