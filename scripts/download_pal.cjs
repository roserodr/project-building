const fs   = require('fs');
const path = require('path');

const DEST = path.resolve('gamedata', 'pal.dat');

// Candidate sources, in priority order
const SOURCES = [
  // Local gamedata already has the palette in the expected ACT1 location
  path.resolve('gamedata', 'd2data', 'data', 'global', 'palette', 'ACT1', 'pal.dat'),
  // Desktop copy (used when project-local gamedata/ hasn't been downloaded yet)
  path.join(
    process.env.USERPROFILE || process.env.HOME || '',
    'Desktop', 'gamedata', 'd2data', 'data', 'global', 'palette', 'ACT1', 'pal.dat'
  ),
];

function tryLocalCopy() {
  for (const src of SOURCES) {
    if (fs.existsSync(src)) {
      fs.mkdirSync(path.dirname(DEST), { recursive: true });
      fs.copyFileSync(src, DEST);
      console.log(`Copied palette from ${src}`);
      return true;
    }
  }
  return false;
}

async function tryRemoteDownload() {
  // Fallback: attempt remote fetch (may be unavailable)
  const URLS = [
    'https://raw.githubusercontent.com/fabd/diablo2/refs/heads/master/data/global/palette/ACT1/pal.dat',
    'https://raw.githubusercontent.com/fabd/diablo2/master/data/global/palette/ACT1/pal.dat',
  ];
  for (const url of URLS) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const buffer = await response.arrayBuffer();
        fs.mkdirSync(path.dirname(DEST), { recursive: true });
        fs.writeFileSync(DEST, Buffer.from(buffer));
        console.log(`Downloaded palette from ${url}`);
        return true;
      }
    } catch (_) { /* try next */ }
  }
  return false;
}

(async () => {
  if (fs.existsSync(DEST)) {
    console.log('pal.dat already exists, skipping.');
    return;
  }
  if (tryLocalCopy()) return;
  if (await tryRemoteDownload()) return;
  console.error('Could not obtain pal.dat from any source.');
  process.exit(1);
})();
