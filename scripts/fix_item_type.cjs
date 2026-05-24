const fs = require('fs');

const path = 'src/types/index.ts';
let content = fs.readFileSync(path, 'utf8');

// The imageFile property was added after id string but the build failed, let's fix it manually
if (content.includes('  id: string;\n  imageFile?: string;')) {
    content = content.replace('  id: string;\n  imageFile?: string;', '  id: string;');
}
// Add to Item interface
content = content.replace(
    'export interface Item {',
    'export interface Item {\n  imageFile?: string;'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed types/index.ts');
