## Context

Specs accumulate incrementally as changes are applied. Each delta spec is merged in as an append, preserving historical additions but creating redundancy over time. The three affected specs (`site-shell`, `i18n-completeness`, `quiz-engine`) have clear patterns of redundancy identified during an explore session.

## Goals / Non-Goals

**Goals:**
- Remove requirements that are fully covered by a more general requirement in the same file
- Collapse per-game boilerplate into general statements
- Leave the meaning and coverage of the specs unchanged — every behavior that was specified before must still be specified after

**Non-Goals:**
- Changing any game behavior, routing, or i18n logic
- Removing per-game i18n tails ("Fully bilingual EN/HE" at the end of each game spec) — these stay
- Rewriting or restructuring requirements that are unique and meaningful
- Touching any source code

## Decisions

**Decision: Edit spec files directly, no delta specs needed**

Since this change only removes/consolidates content from existing specs (not adding new requirements), there are no delta specs to write. The edits go directly to the main spec files. This is an editorial cleanup, not a capability change.

**Decision: Consolidate routes into one general requirement**

The 8+ individual "Route for X page" requirements in `site-shell` all say the same thing with different game names. Replace with: "App.jsx SHALL include a route for every game card shown on the home page." One scenario covers all cases.

**Decision: Keep the general requirements, delete the specific instances**

For i18n-completeness, the general requirements ("Key parity between locales", "No hardcoded user-visible strings in JSX") already cover all games. The per-game requirements (guess-phone, hack-password, greedy-pig locale requirements; the game-specific hotfix scenarios) are deleted, not merged.

## Risks / Trade-offs

- **Risk**: Accidentally deleting a scenario that covers a behavior the general requirement does not.
  → Mitigation: Read each requirement being deleted and verify the general requirement's language covers it before removing.

- **Risk**: The general routing requirement might be too vague for future reference.
  → Mitigation: Keep the "All games are accessible" scenario from the home page requirement, which already verifies this end-to-end.
