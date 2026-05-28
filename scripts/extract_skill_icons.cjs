const fs = require('fs');
const path = require('path');

const destDir = 'src/assets/skills';

if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
}
console.log('Successfully ran extract_skill_icons.cjs dummy script');
