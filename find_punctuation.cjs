const fs = require('fs');
const content = fs.readFileSync('src/i18n/he.json', 'utf8');
const data = JSON.parse(content);

const punctuation = /[!?.|,:;]+/;

function fixString(str) {
  if (typeof str !== 'string') return str;
  // Match leading punctuation, optionally preceded by whitespace
  const match = str.match(/^([!?.|,:;]+)(.*)/);
  if (match) {
    const punct = match[1];
    const rest = match[2];
    // If rest starts with an emoji or Hebrew, move punct to the end
    // For this task, we assume any leading punctuation in he.json is "pre-reversed"
    return rest + punct;
  }
  return str;
}

function traverse(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      const original = obj[key];
      const fixed = fixString(original);
      if (original !== fixed) {
        console.log(`Key: ${key}`);
        console.log(`Original: ${original}`);
        console.log(`Fixed:    ${fixed}`);
        console.log('---');
      }
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      traverse(obj[key]);
    }
  }
}

traverse(data);
