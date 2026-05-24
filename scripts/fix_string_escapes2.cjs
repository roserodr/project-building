const fs = require('fs');

const path = 'src/data/projectDiablo2Items.ts';
let content = fs.readFileSync(path, 'utf8');

// Some baseTypes or names have single quotes inside them and break the object literal.
// E.g. baseType: 'Assassin's Claws' -> baseType: 'Assassin\'s Claws'
content = content.replace(/(name|baseType): '([^']+)'([^']+)'([^']*)',/g, "$1: '$2\\'$3\\'$4',");
content = content.replace(/(name|baseType): '([^']+)'([^']*)',/g, "$1: '$2\\'$3',");

fs.writeFileSync(path, content, 'utf8');
console.log("Fixed string escapes again");
