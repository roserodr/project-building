const fs = require('fs');
const content = fs.readFileSync('src/data/projectDiablo2Items.ts', 'utf8');
const bases = fs.readFileSync('src/data/itemBases.ts', 'utf8');

const baseNames = [];
const regex = /name:\s*["']([^"']+)["']/g;
let match;
while ((match = regex.exec(bases)) !== null) {
  baseNames.push(match[1]);
}

const unqRegex = /baseType:\s*["']([^"']+)["']/g;
const notFound = [];
while ((match = unqRegex.exec(content)) !== null) {
  if (!baseNames.includes(match[1])) {
    if (!notFound.includes(match[1])) notFound.push(match[1]);
  }
}

console.log("Not found bases:", notFound);
