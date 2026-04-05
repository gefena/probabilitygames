## 1. ExplainerPanel — font size bump

- [x] 1.1 In `src/components/ExplainerPanel.jsx`, change the H3 title from `text-base` → `text-lg`
- [x] 1.2 Change ExplainerPanel body `<p>` from `text-sm` → `text-base`
- [x] 1.3 Change ExplainerPanel example box `<div>` from `text-sm` → `text-base`
- [x] 1.4 Change ExplainerPanel callout box `<div>` from `text-sm` → `text-base`

## 2. QuizPanel — font size bump

- [x] 2.1 In `src/components/QuizPanel.jsx`, change the H3 title from `text-base` → `text-lg`
- [x] 2.2 Change QuizPanel question `<p>` from `text-sm font-bold` → `text-base font-bold`
- [x] 2.3 Change QuizPanel option buttons from `text-sm` → `text-base`
- [x] 2.4 Change QuizPanel explanation box from `text-sm` → `text-base`
- [x] 2.5 Change QuizPanel "Next" button from `text-sm` → `text-base`

## 3. GamePageLayout — back button tap target

- [x] 3.1 In `src/components/GamePageLayout.jsx`, add `py-3 px-2 -mx-2 rounded-lg` to the back button — `py-3` (12px × 2) + line-height (~20px) = 44px touch height, meeting the spec
