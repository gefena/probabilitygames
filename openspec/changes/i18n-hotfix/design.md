## Context
During the implementation of the `site-ux-and-i18n-fixes` change, a text replacement operation inadvertently wiped out all top-level objects in `en.json` and `he.json` (such as `home`, `coin`, `dice`, etc.), keeping only `nav`, `site`, and `common`. This broke the descriptions for all games like "Dice Detective" on the Home Page and on individual game pages.

## Goals / Non-Goals
**Goals:**
- Restore the missing JSON structures.
- Safely re-apply the necessary additions (`site.title`, `common.games`) and corrections (Hebrew punctuation).

**Non-Goals:**
- Changing any spec behavior or UI designs.

## Decisions
- **Decision:** Use a Node.js script to read the original full JSON files from git history (`a40c394` or the exact commit before the break), parse them into objects, mutate them programmatically (adding `site`, `common.games` and applying the recursive punctuation fix for Hebrew), and stringify them back to disk.
- **Rationale:** Doing this programmatically guarantees that no existing structures are accidentally deleted via simplistic regex or string replacements.

## Risks / Trade-offs
- **[Risk]** → Corrupting the JSON syntax.
  - **[Mitigation]** → Using `JSON.parse()` and `JSON.stringify()` ensures valid output.
