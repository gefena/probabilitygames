## Context

`HomePage.jsx` references `home.games.<game>.desc` for each Go Deeper card. These keys exist for some games but were never added for the 8 newer ones. i18next silently falls back to rendering the key string itself, causing raw key text to appear as the card subtitle.

## Goals / Non-Goals

**Goals:**
- Fix all 8 missing card descriptions in EN and HE
- Use the existing game page subtitles as the basis for descriptions (they already describe each game well)

**Non-Goals:**
- Changing any game page subtitles
- Touching any JSX or routing code

## Decisions

**Use game page subtitles as descriptions** — each game already has a `<game>.subtitle` key with a punchy one-liner. These are ideal for home page cards. Adapt as needed for the card context (home page cards are slightly more marketing-oriented).
