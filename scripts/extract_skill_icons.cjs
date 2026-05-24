const { DC6 } = require('dc6png');
const fs = require('fs');
const path = require('path');

const srcDir = 'gamedata/gamedata/d2data/ui';
const destDir = 'src/assets/skills';

if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
}

// read default pal.dat from dc6png module
// Actually dc6png doesn't export the palette as an asset easily, but wait, maybe it does?
// Looking at error message before, it requires a palette. But wait, it's just a file. We can supply one if we extract it from the library...
// Where is dc6png installed?
const dc6pngPath = require.resolve('dc6png');
const palDatPath = path.join(path.dirname(dc6pngPath), 'pal.dat');

if (fs.existsSync(palDatPath)) {
    console.log('Found pal.dat inside dc6png');
}
