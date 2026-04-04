## 1. Restore the lost JSON sections
- [x] 1.1 Use `git show 98bb5ec` (the commit before the break) to retrieve the original `en.json` and `he.json` containing the full objects (`home`, `coin`, `dice`, etc).
- [x] 1.2 Write a script to parse these files, add `site.title`, populate `common.games` using the original titles, and fix Hebrew punctuation programmatically.
- [x] 1.3 Run the script to produce correct, complete versions of `src/i18n/en.json` and `src/i18n/he.json`.

## 2. Verification
- [x] 2.1 Verify that games like "Dice Detective" show up correctly with descriptions on the home page.
- [x] 2.2 Verify the build passes with `npm run build`.
