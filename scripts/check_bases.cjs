const fs = require('fs');

const content = fs.readFileSync('src/data/projectDiablo2Items.ts', 'utf8');
const basesStr = fs.readFileSync('src/data/itemBases.ts', 'utf8');

const baseNames = new Set();
const regex = /name:\s*["']([^"']+)["']/g;
let match;
while ((match = regex.exec(basesStr)) !== null) {
  baseNames.add(match[1].toLowerCase().replace(/\\'/g, "'"));
}

console.log(`Total bases: ${baseNames.size}`);

const unqRegex = /baseType:\s*["']([^"']+)["']/g;
const notFound = new Set();
while ((match = unqRegex.exec(content)) !== null) {
  const t = match[1].toLowerCase().replace(/\\'/g, "'");
  if (!baseNames.has(t)) notFound.add(t);
}

if (notFound.size === 0) {
  console.log('All baseType values matched.');
} else {
  console.log('Not found bases:', [...notFound]);
  process.exit(1);
}
