## Context

The i18n system uses react-i18next with `useTranslation()`. All strings must go through `t('key')`. The JSON files (en.json / he.json) are perfectly synced at 594 keys each. The fixes are small and surgical — no architecture changes needed.

## Goals / Non-Goals

**Goals:**
- Every user-visible string renders in the active language (EN or HE)
- No hardcoded English strings remain in any JSX page component
- All new i18n keys added to both en.json and he.json

**Non-Goals:**
- No new features, pages, or layout changes
- Math symbols (π, √, ×) are kept as-is (they are not language-specific)
- Internal variable names and prop names do not need translation

## Decisions

### LuckyCombo default labels
The `DEFAULT_A` and `DEFAULT_B` arrays at module scope cannot call `t()` because hooks aren't available there. **Decision**: move the defaults to use i18n keys as the label strings (e.g., `label: t('luckyCombo.defaultA1')`) inside the component, initializing state with translated values via `useState(() => [...])` lazy initializer that reads `t()`. This keeps them reactive to language changes.

Alternative: use static English strings as the initial label and translate only the displayed text. Rejected — if the user never edits the labels, they stay in English on Hebrew mode.

### MagicSpinner SVG "Start" label
The SVG `<text>` element at line 100 renders `Start`. The component already has `const { t } = useTranslation()` available. Fix: replace the hardcoded string with `{t('spinner.treeStart')}` and add the key to both JSON files.

### MontyHall "Wins" tooltip
Recharts `Tooltip formatter` runs outside React render so `t()` must be passed in. The component has `t` in scope — just reference it inside the closure: `formatter={(val) => [val, t('montyHall.wins')]}`.

### MontyHall "games each"
The string `"games each"` is in a JSX expression: `{simResults.total.toLocaleString()} games each`. Use an i18n key with an interpolation: `t('montyHall.gamesEach', { n: simResults.total.toLocaleString() })`.

## Risks / Trade-offs

- LuckyCombo lazy initializer requires `t` from `useTranslation()` to be called before `useState`. This is standard React — no risk.
- If a user has already customized their Lucky Combo labels and then switches language, the labels won't auto-translate (they typed them). This is correct behavior — we only translate the *defaults*.
