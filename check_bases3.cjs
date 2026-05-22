const fs = require('fs');
const content = fs.readFileSync('src/data/projectDiablo2Items.ts', 'utf8');
const basesStr = fs.readFileSync('src/data/itemBases.ts', 'utf8');

const baseNames = [];
const regex = /"name":\s*["']([^"']+)["']/g;
let match;
while ((match = regex.exec(basesStr)) !== null) {
  baseNames.push(match[1]);
}

console.log("Total bases:", baseNames.length);

const unqRegex = /baseType:\s*["']([^"']+)["']/g;
const notFound = [];
while ((match = unqRegex.exec(content)) !== null) {
  const t = match[1];
  if (!baseNames.includes(t)) {
    if (!notFound.includes(t)) notFound.push(t);
  }
}

console.log("Not found bases:", notFound);
