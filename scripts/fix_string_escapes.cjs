const fs = require('fs');

const path = 'src/data/projectDiablo2Items.ts';
let content = fs.readFileSync(path, 'utf8');

// I replaced some stats with incorrectly formatted things, let's fix it properly using Python
