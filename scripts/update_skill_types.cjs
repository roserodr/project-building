const fs = require('fs');

const path = 'src/types/index.ts';
let content = fs.readFileSync(path, 'utf8');

// Insert iconCel into Skill interface
if (!content.includes('iconCel?: string;')) {
    content = content.replace(
        '  id: string;',
        '  id: string;\n  iconCel?: string | number;'
    );
}
// Insert imageFile into Item interface
if (!content.includes('imageFile?: string;')) {
    content = content.replace(
        '  id: string;',
        '  id: string;\n  imageFile?: string;'
    );
}

fs.writeFileSync(path, content, 'utf8');
console.log('Updated types/index.ts');
