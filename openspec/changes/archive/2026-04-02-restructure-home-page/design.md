## Context

`HomePage.jsx` currently has four hard-coded sections: a top `GAMES` array rendered as a card grid, a manual "Explore More" section with `motion.button` elements, a "Crack the Code" dark-panel section, and a "Patterns in Chaos" dark-panel section. Adding each new game required editing multiple places. The new design replaces all of this with a single `TIERS` data structure that drives the entire page.

## Goals / Non-Goals

**Goals:**
- One data structure (`TIERS`) owns all game ordering and grouping
- Page flows top-to-bottom from simplest → most complex
- Each tier has a heading, tagline, colour accent, and list of game entries
- Existing `GameCard` component continues to be used for all cards
- All tier headings and taglines go through i18n

**Non-Goals:**
- Changing game page layouts or routes
- Adding new games
- Animation overhaul (keep existing hover/tap Framer Motion behaviour)
- Any personalisation or dynamic ordering

## Decisions

### Single `TIERS` array replaces all hard-coded sections

Each game entry carries explicit `titleKey` and `descKey` fields pointing directly to existing i18n paths — no new game-card keys are needed.

```js
const TIERS = [
  {
    key: 'startHere',
    titleKey: 'home.tiers.startHere.title',
    taglineKey: 'home.tiers.startHere.tagline',
    accent: 'violet',
    games: [
      { to: '/coin-flip',  emoji: '🪙', color: 'bg-violet-500', titleKey: 'home.games.coinFlip.title', descKey: 'home.games.coinFlip.desc' },
      { to: '/dice',       emoji: '🎲', color: 'bg-orange-400', titleKey: 'home.games.dice.title',     descKey: 'home.games.dice.desc'     },
      { to: '/candy-jar',  emoji: '🍬', color: 'bg-pink-500',   titleKey: 'home.games.candy.title',    descKey: 'home.games.candy.desc'    },
      { to: '/spinner',    emoji: '🎡', color: 'bg-emerald-500',titleKey: 'home.games.spinner.title',  descKey: 'home.games.spinner.desc'  },
      { to: '/card-draw',  emoji: '🃏', color: 'bg-blue-500',   titleKey: 'home.games.cards.title',    descKey: 'home.games.cards.desc'    },
    ],
  },
  {
    key: 'goDeeper',
    titleKey: 'home.tiers.goDeeper.title',
    taglineKey: 'home.tiers.goDeeper.tagline',
    accent: 'orange',
    games: [
      { to: '/greedy-pig',        emoji: '🐷', color: 'bg-orange-500', titleKey: 'greedyPig.title',       descKey: 'home.greedyPig.desc'        },
      { to: '/house-always-wins', emoji: '🏦', color: 'bg-red-500',    titleKey: 'houseAlwaysWins.title', descKey: 'home.houseAlwaysWins.desc'  },
      { to: '/lucky-combo',       emoji: '🔗', color: 'bg-teal-500',   titleKey: 'luckyCombo.title',      descKey: 'home.luckyCombo.desc'       },
      { to: '/prize-machine',     emoji: '🎰', color: 'bg-amber-500',  titleKey: 'prizeMachine.title',    descKey: 'home.prizeMachine.desc'     },
    ],
  },
  {
    key: 'crackTheCode',
    titleKey: 'home.crackTheCode.title',
    taglineKey: 'home.crackTheCode.tagline',
    accent: 'rose',
    dark: true,
    games: [
      { to: '/guess-the-phone',   emoji: '📱', color: 'bg-violet-600', titleKey: 'home.crackTheCode.guessPhone.title',   descKey: 'home.crackTheCode.guessPhone.desc'   },
      { to: '/hack-the-password', emoji: '🔐', color: 'bg-rose-600',   titleKey: 'home.crackTheCode.hackPassword.title', descKey: 'home.crackTheCode.hackPassword.desc' },
    ],
  },
  {
    key: 'patternsInChaos',
    titleKey: 'home.patternsInChaos.title',
    taglineKey: 'home.patternsInChaos.tagline',
    accent: 'indigo',
    dark: true,
    games: [
      { to: '/galton-board',    emoji: '🟣', color: 'bg-violet-600', titleKey: 'home.patternsInChaos.galtonBoard.title',  descKey: 'home.patternsInChaos.galtonBoard.desc'  },
      { to: '/random-walk',     emoji: '🚶', color: 'bg-cyan-500',   titleKey: 'home.patternsInChaos.randomWalk.title',   descKey: 'home.patternsInChaos.randomWalk.desc'   },
      { to: '/monte-carlo-pi',  emoji: '🎯', color: 'bg-rose-500',   titleKey: 'home.patternsInChaos.monteCarloPi.title', descKey: 'home.patternsInChaos.monteCarloPi.desc' },
      { to: '/monty-hall',      emoji: '🚪', color: 'bg-amber-500',  titleKey: 'home.patternsInChaos.montyHall.title',    descKey: 'home.patternsInChaos.montyHall.desc'    },
      { to: '/birthday-room',   emoji: '🎂', color: 'bg-pink-500',   titleKey: 'birthdayRoom.title',                      descKey: 'home.birthdayRoom.desc'                 },
      { to: '/mystery-machine', emoji: '🔍', color: 'bg-indigo-500', titleKey: 'mysteryMachine.title',                    descKey: 'home.mysteryMachine.desc'               },
    ],
  },
]
```

Rationale: a single loop renders the whole page; adding a game is one line in one place; no i18n key duplication.

### i18n keys needed

Only two tier headings are genuinely new — `startHere` and `goDeeper`. The `crackTheCode` and `patternsInChaos` tiers reuse existing `home.crackTheCode.*` and `home.patternsInChaos.*` keys already in both locales.

```
home.tiers.startHere.title       — "Start Here"          (NEW)
home.tiers.startHere.tagline     — "Tap once and see what chance looks like"  (NEW)
home.tiers.goDeeper.title        — "Go Deeper"            (NEW)
home.tiers.goDeeper.tagline      — "Make decisions — and find out if they pay off"  (NEW)
```

All game card titles and descriptions already exist in `en.json` and `he.json` — no new game keys required.

### `dark` tiers use slate background panels (existing pattern)

Tiers with `dark: true` render inside a `bg-slate-800` or `bg-slate-900` rounded panel, matching the existing aesthetic. Light tiers render on the page background.

### `GameCard` used for all cards

All tiers use the same `GameCard` component. The gradient "explore more" buttons are replaced by uniform `GameCard` entries — simpler, consistent, more maintainable.

## Risks / Trade-offs

- **Birthday Room and Mystery Machine move from "Explore More" to tier 4** — their existing card descriptions (`home.birthdayRoom.desc`, `home.mysteryMachine.desc`) remain valid; just the rendering location changes.
- **`home.crackTheCode` and `home.patternsInChaos` already have `title` and `tagline` keys** — the TIERS data reuses them directly rather than introducing `home.tiers.crackTheCode.*` aliases, avoiding duplication.

## Open Questions

None — scope is fully defined.
