const fs = require('fs');
const content = fs.readFileSync('src/data/projectDiablo2Items.ts', 'utf8');
const bases = fs.readFileSync('src/data/itemBases.ts', 'utf8');

const baseNames = [];
const regex = /name:\s*["']([^"']+)["']/g;
let match;
while ((match = regex.exec(bases)) !== null) {
  baseNames.push(match[1].toLowerCase().replace(/\\'/g, "'"));
}

const unqRegex = /baseType:\s*["']([^"']+)["']/g;
const notFound = [];
while ((match = unqRegex.exec(content)) !== null) {
  const t = match[1].toLowerCase().replace(/\\'/g, "'");
  if (!baseNames.includes(t)) {
    if (!notFound.includes(t)) notFound.push(t);
  }
}

console.log("Not found bases:", notFound);
