const fs = require('fs');

const content = fs.readFileSync('src/data/projectDiablo2Items.ts', 'utf8');
const basesStr = fs.readFileSync('src/data/itemBases.ts', 'utf8');

const baseNames = new Set();
// itemBases.ts uses JSON-style quoted keys ("name": "Hand Axe"); also tolerate
// unquoted keys (name: 'Hand Axe').
const regex = /["']?name["']?:\s*["']([^"']+)["']/g;
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
  // Reported but non-fatal: many unmatched values are intentionally non-equipment
  // baseTypes (rings, amulets, jewels, charms, maps, arrows) and some are
  // pre-existing data typos. This is a data-quality report, not a build gate.
  console.warn(`${notFound.size} baseType value(s) without a matching item base:`);
  console.warn([...notFound]);
}
