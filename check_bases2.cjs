const fs = require('fs');
const content = fs.readFileSync('src/data/projectDiablo2Items.ts', 'utf8');
const bases = fs.readFileSync('src/data/itemBases.ts', 'utf8');

const baseNames = [];
const regex = /name:\s*["']([^"']+)["']/g;
let match;
while ((match = regex.exec(bases)) !== null) {
  baseNames.push(match[1]);
}

console.log("Sample bases:");
console.log(baseNames.slice(0, 10));
