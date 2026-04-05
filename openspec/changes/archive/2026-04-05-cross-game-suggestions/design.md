## Context

26 games organized into 4 tiers on the home page, but once inside a game there's no navigation between related games. The home button is the only exit.

## Goals / Non-Goals

**Goals:**
- Show 1–2 related game suggestions at the bottom of each game page
- Include a short reason explaining the conceptual link ("See what 1000 coin flips look like")
- Make it easy to navigate directly to the suggested game

**Non-Goals:**
- Algorithmic recommendations or tracking which games the user has played
- Replacing the home page navigation
- Mandatory progression gating

## Decisions

**Static connection map** — a hand-curated JS object mapping each game ID to 1–2 suggestions with i18n reason keys. This is simple, maintainable, and lets us craft the "why" for each link.

Example connections:
- Coin Flip → Galton Board ("See what happens when you flip 1000 coins at once")
- Coin Flip → Coin Flip Streak mode already exists, but → Lucky Dice ("Same idea, but with dice — and the odds aren't 50/50")
- Higher or Lower → Card Draw ("What if you could see the whole deck?")
- Greedy Pig → Bridge Quest ("Another game about knowing when to stop vs push forward")
- Dice Detective → Probability Bingo ("Use what you learned about counting outcomes")
- Galton Board → Random Walk ("Another pattern hiding in randomness")

**Compact card layout** — similar to GameCard but smaller, horizontal, with the reason text as a subtitle. Placed after the QuizPanel on every page.
