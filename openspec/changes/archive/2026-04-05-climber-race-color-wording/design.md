## Context

Climber Race was redesigned in a prior change: players now bet on spinner colors (Yellow/Red/Blue/Green), not on named climber characters. The game component and logic correctly reflect this. However, i18n strings were not fully updated — "climber(s)" slipped through in UI prompts, explainer copy, and quiz questions.

No code changes are needed. All fixes are string substitutions in `en.json` and `he.json`.

## Goals / Non-Goals

**Goals:**
- All user-facing text consistently uses "color(s)" / "צבע/ים" where "climber(s)" / "מטפס/ים" was used incorrectly
- Quiz questions remain educationally correct — the probability concept (mutual exclusivity) is unchanged, only the framing moves from "climbers" to "colors"

**Non-Goals:**
- Changing any game logic, component code, or routes
- Updating the game title ("Climber Race") — the title refers to the climbing mechanic, not what you bet on

## Decisions

### English: "color(s)" throughout
Simple substitution. "Pick your color(s)" / "Tap a color" / "two colors can't both win" etc.

### Hebrew: "צבע/ים" (color/colors)
Hebrew uses "צבע" (masc.) for color. "בחר צבע/ים" and "שני צבעים" are natural and grammatically correct.

### q2 pronoun fix: "she" → "it" (EN), "היא" → implicit (HE)
Ivy was a climber character (she). Now Ivy is a color name used as a label. In English: "it is due to win again". In Hebrew: restructure to avoid the pronoun — "הצבע הזה אמור לנצח שוב" or just drop it.

### Keep color names (Sunny/Blaze/Storm/Ivy = Yellow/Red/Blue/Green) unchanged
These display-name translations are already correct in both languages. Only "climber" references need fixing.
