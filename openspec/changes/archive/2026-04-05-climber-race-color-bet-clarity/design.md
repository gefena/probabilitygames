## Context

The internal color keys (`sunny`, `blaze`, `storm`, `ivy`) are used throughout the codebase as identifiers — in `CLIMBER_COLORS`, `COLORS` array, i18n key lookups like `t('climberRace.sunny')`. The internal keys do not need to change. Only the i18n display strings change.

Current display labels (en.json):
- `climberRace.sunny` = "Sunny"
- `climberRace.blaze` = "Blaze"
- `climberRace.storm` = "Storm"
- `climberRace.ivy` = "Ivy"

These sound like racer character names. Changing them to plain color words breaks the "betting on a climber" mental model.

## Goals / Non-Goals

**Goals:**
- Rename the four color labels to plain colors in EN and HE
- Update subtitle and howToPlay copy to frame the bet as "pick which color the spinner lands on"
- Update any copy that implies a color is a competing climber (e.g. `betWinIf`, `noBetResult`)

**Non-Goals:**
- Renaming internal keys (`sunny`, `blaze`, `storm`, `ivy`) — these stay as-is
- Changing any game logic, move mechanic, or visual design
- Changing the bot strategy or mountain SVG

## Decisions

**Internal keys unchanged** — changing the keys would require touching `CLIMBER_COLORS`, `COLORS`, history rendering, quiz data, and potentially other pages. The display labels are the only thing that creates the wrong mental model; renaming just those strings is sufficient and safe.

**Plain color names** — "Yellow", "Red", "Blue", "Green" (EN) / "צהוב", "אדום", "כחול", "ירוק" (HE). Short, unambiguous, and clearly describe a spinner sector rather than a character.

**Copy framing** — subtitle becomes something like "Pick which colors the spinner will land on — and climb when you're right!". The `betWinIf` string changes from "You move UP if {{bet}} wins the spin" to "You climb if the spinner lands on {{bet}}".

## Risks / Trade-offs

- **Low risk**: purely a text change; no logic or structure changes.
- **Quiz data**: the quiz questions in `climberRace` quiz file may reference color names — check and update if needed.
