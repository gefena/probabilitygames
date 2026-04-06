## Context

The home page is driven entirely by a `TIERS` array in `HomePage.jsx`. Each tier has a `key`, `titleKey`, `taglineKey`, `accent` colour, an optional `dark` background class, and a `games` array. The i18n keys for tier titles/taglines live in `en.json` and `he.json`. No backend, no routing — this is a pure data/presentation change.

Current tier keys: `startHere`, `goDeeper`, `crackTheCode`, `patternsInChaos`.

## Goals / Non-Goals

**Goals:**
- Reorder games by interaction intensity: bot battles → deduction → solo challenge → simulation
- Give the two new tiers arcade-energy names and taglines
- Move Monty Hall and Mystery Machine from Tier 4 to Tier 3
- Preserve all existing game cards, colours, emojis, and routes unchanged

**Non-Goals:**
- Changing any game page
- Changing card colours or emojis
- Adding or removing games
- Changing the dark background treatment on Crack the Code or Tier 4

## Decisions

**New tier keys and names**

| Key | Title | Tagline |
|---|---|---|
| `beatTheBot` | Beat the Bot | Pick your strategy. Outsmart the machine. |
| `crackTheCode` | Crack the Code | (unchanged) |
| `testYourWits` | Test Your Wits | Think fast. Decide smart. Beat the odds. |
| `fromChaosToOrder` | From Chaos to Order | Watch randomness become pattern. |

- `startHere` and `goDeeper` are dropped entirely — their games are redistributed
- `patternsInChaos` is renamed to `fromChaosToOrder` to match the user's requested language
- `crackTheCode` key and all its i18n values are unchanged

**Tier 4 dark background**

Tier 4 ("From Chaos to Order") inherits the dark treatment (`bg-slate-900`) currently on `patternsInChaos`. This preserves the visual rhythm: light → dark → light → dark.

**Game assignments**

| Tier | Games |
|---|---|
| Beat the Bot | bridge-quest, climber-race, greedy-pig, remove-one, probability-bingo |
| Crack the Code | guess-the-phone, hack-the-password, pattern-lock-hacker |
| Test Your Wits | higher-or-lower, dice-detective, monty-hall, mystery-machine, house-always-wins, prize-machine |
| From Chaos to Order | coin-flip, dice, candy-jar, spinner, card-draw, roll-and-race, pizza-builder, lucky-combo, galton-board, random-walk, monte-carlo-pi, birthday-room |

**i18n key strategy**

- Add new keys under `home.tiers.beatTheBot.*`, `home.tiers.testYourWits.*`, and `home.tiers.fromChaosToOrder.*` — consistent with the existing `home.tiers.startHere.*` / `home.tiers.goDeeper.*` structure
- `crackTheCode` is the exception: its keys live at `home.crackTheCode.title` and `home.crackTheCode.tagline` (not under `home.tiers.*`). Its `titleKey` and `taglineKey` in the TIERS array must keep pointing to those paths — do not move them.
- The `patternsInChaos.*` keys can remain in the JSON (unused keys are harmless) — no need to remove them

## Risks / Trade-offs

- [Risk] Tier 4 has 12 games — a long grid on desktop → Mitigation: acceptable for now; the dark background visually contains it. Can split later if needed.
- [Risk] Removing "Start Here" loses the beginner on-ramp signal → Mitigation: "Beat the Bot" is actually more inviting for new users than a generic label. The games themselves are approachable.
