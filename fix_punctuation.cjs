const fs = require('fs');
const content = fs.readFileSync('src/i18n/he.json', 'utf8');

const replacements = [
  { old: '"!החפיסה ריקה — אפס כדי לשחק שוב"', new: '"החפיסה ריקה — אפס כדי לשחק שוב!"' },
  { old: '"!הסכום עולה על 100%"', new: '"הסכום עולה על 100%!"' },
  { old: '"!🎉 נמצאה התאמת יום הולדת"', new: '"🎉 נמצאה התאמת יום הולדת!"' },
  { old: '"!🎉 נמצאו {{n}} התאמות יום הולדת"', new: '"🎉 נמצאו {{n}} התאמות יום הולדת!"' },
  { old: '"!הגענו ל-50% סיכוי! רק 23 אנשים — מפתיע, לא?"', new: '"הגענו ל-50% סיכוי! רק 23 אנשים — מפתיע, לא?!"' },
  { old: '"!סכום 7 אפשר להרכיב ב-6 דרכים: 1+6, 2+5, 3+4, 4+3, 5+2, 6+1. זה 6 מתוך 36 הטלות — יותר מכל סכום אחר"', new: '"סכום 7 אפשר להרכיב ב-6 דרכים: 1+6, 2+5, 3+4, 4+3, 5+2, 6+1. זה 6 מתוך 36 הטלות — יותר מכל סכום אחר!"' },
  { old: '"!בינגו"', new: '"בינגו!"' },
  { old: '"!🎉 בינגו! ניצחת"', new: '"🎉 בינגו! ניצחת!"' },
  { old: '"!כמעט שם"', new: '"כמעט שם!"' }
];

let newContent = content;
replacements.forEach(({ old, new: n }) => {
  newContent = newContent.replace(old, n);
});

fs.writeFileSync('src/i18n/he.json', newContent);
console.log('Successfully updated src/i18n/he.json');
