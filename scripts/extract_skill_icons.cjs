const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Use project-local gamedata/ if present, otherwise fall back to the desktop copy
const LOCAL_GAMEDATA   = path.resolve('gamedata');
const DESKTOP_GAMEDATA = path.join(
  process.env.USERPROFILE || process.env.HOME || '',
  'Desktop', 'gamedata'
);
const GAMEDATA = fs.existsSync(LOCAL_GAMEDATA) ? LOCAL_GAMEDATA : DESKTOP_GAMEDATA;

// Palette: prefer gamedata/pal.dat; fall back to the ACT1 pal inside gamedata
const PAL_CANDIDATES = [
  path.join(LOCAL_GAMEDATA, 'pal.dat'),
  path.join(GAMEDATA, 'd2data', 'data', 'global', 'palette', 'ACT1', 'pal.dat'),
];
const PAL = PAL_CANDIDATES.find(p => fs.existsSync(p)) || PAL_CANDIDATES[0];
// Skill icons need the ACT1 palette — the default pal.dat maps the skill-icon
// background indices to a blue cast (R/B differ at those indices), which the
// game's ACT1 palette renders as the correct warm grey-brown. Items still use
// the default pal.dat (they render correctly with it).
const SKILL_PAL_CANDIDATES = [
  path.join(LOCAL_GAMEDATA, 'pal_act1.dat'),
  path.join(GAMEDATA, 'd2data', 'data', 'global', 'palette', 'ACT1', 'pal.dat'),
  PAL,
];
const SKILL_PAL = SKILL_PAL_CANDIDATES.find(p => fs.existsSync(p)) || PAL;
const SKILLS_OUT = path.resolve('public', 'skills');
const ITEMS_OUT  = path.resolve('public', 'items');

// Call dc6png via the current node binary — avoids relying on `node` being in PATH
const NODE   = process.execPath;
const DC6PNG = path.resolve('node_modules', 'dc6png', 'src', 'index.js');

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

function run(cmd) {
  execSync(cmd, { stdio: 'inherit' });
}

// ── Palette check ────────────────────────────────────────────────────────────
if (!fs.existsSync(PAL)) {
  console.log('Palette not found — trying download_pal.cjs...');
  run(`"${NODE}" scripts/download_pal.cjs`);
}
if (!fs.existsSync(PAL)) {
  console.error(`ERROR: palette still missing. Expected one of:\n${PAL_CANDIDATES.join('\n')}`);
  process.exit(1);
}
console.log(`Using palette: ${PAL}`);

// ── Skill icons ──────────────────────────────────────────────────────────────
// SkillTree.tsx constructs:  /skills/{classPrefix}skillicon_0_{iconCel}.png
// dc6png outputs:            {basename}_{dir}_{frame}.png  (multi-frame DC6s)
// We lowercase all outputs so e.g. "AmSkillicon_0_3.png" → "amskillicon_0_3.png"
//
// Class prefix → DC6 mapping (substring(0,2).toLowerCase() of class name):
//   am → AmSkillicon  (d2data)
//   ba → BaSkillicon  (d2data)
//   ne → NeSkillicon  (d2data)
//   pa → PaSkillicon  (d2data)
//   so → SoSkillicon  (d2data)
//   as → AsSkillicon  (d2exp)
//   dr → DrSkillicon  (d2exp)
//       Skillicon      (d2data) — generic fallback used by SkillTree onError

// Processed in order; the rename pass below overwrites on filename conflict, so
// later entries win. PD2 reworked several classes' skill trees and added skills,
// so its pd2assets skillicons have MORE frames than the classic d2data/d2exp DC6s
// (e.g. Sorc/Necro/Paladin go up to iconCel 66, Druid to 60). We therefore list
// the classic DC6s first and let the pd2assets overrides win where they exist.
// The Amazon has no PD2 override, so it stays on the classic d2data icons.
const SKILL_DC6S = [
  path.join(GAMEDATA, 'd2data',    'data', 'global', 'ui', 'SPELLS', 'AmSkillicon.DC6'),
  path.join(GAMEDATA, 'd2data',    'data', 'global', 'ui', 'SPELLS', 'BaSkillicon.DC6'),
  path.join(GAMEDATA, 'd2data',    'data', 'global', 'ui', 'SPELLS', 'NeSkillicon.DC6'),
  path.join(GAMEDATA, 'd2data',    'data', 'global', 'ui', 'SPELLS', 'PaSkillicon.DC6'),
  path.join(GAMEDATA, 'd2data',    'data', 'global', 'ui', 'SPELLS', 'SoSkillicon.DC6'),
  path.join(GAMEDATA, 'd2data',    'data', 'global', 'ui', 'SPELLS', 'Skillicon.DC6'),
  path.join(GAMEDATA, 'd2exp',     'data', 'global', 'ui', 'SPELLS', 'AsSkillicon.DC6'),
  path.join(GAMEDATA, 'd2exp',     'data', 'global', 'ui', 'SPELLS', 'DrSkillicon.DC6'),
  // PD2 overrides (more frames) — listed last so they win on conflict.
  path.join(GAMEDATA, 'pd2assets', 'data', 'global', 'ui', 'SPELLS', 'BaSkillicon.DC6'),
  path.join(GAMEDATA, 'pd2assets', 'data', 'global', 'ui', 'SPELLS', 'NeSkillicon.DC6'),
  path.join(GAMEDATA, 'pd2assets', 'data', 'global', 'ui', 'SPELLS', 'PaSkillicon.DC6'),
  path.join(GAMEDATA, 'pd2assets', 'data', 'global', 'ui', 'SPELLS', 'SoSkillicon.DC6'),
  path.join(GAMEDATA, 'pd2assets', 'data', 'global', 'ui', 'SPELLS', 'AsSkillicon.dc6'),
  path.join(GAMEDATA, 'pd2assets', 'data', 'global', 'ui', 'SPELLS', 'DrSkillicon.dc6'),
  path.join(GAMEDATA, 'pd2assets', 'data', 'global', 'ui', 'SPELLS', 'CLSSkillicon.dc6'),
];

ensureDir(SKILLS_OUT);
const tmpSkills = path.join(SKILLS_OUT, '_tmp');
ensureDir(tmpSkills);

for (const dc6 of SKILL_DC6S) {
  if (!fs.existsSync(dc6)) {
    console.warn(`  skip ${path.basename(dc6)} (not found)`);
    continue;
  }
  console.log(`  ${path.basename(dc6)}`);
  run(`"${NODE}" "${DC6PNG}" -p "${SKILL_PAL}" -f "${dc6}" -o "${tmpSkills}"`);
}

for (const f of fs.readdirSync(tmpSkills)) {
  fs.renameSync(path.join(tmpSkills, f), path.join(SKILLS_OUT, f.toLowerCase()));
}
fs.rmdirSync(tmpSkills);
console.log(`Skill icons → ${SKILLS_OUT}`);

// ── Item icons ───────────────────────────────────────────────────────────────
// Equipment.tsx constructs:  /items/{imageFile}.png  (e.g. "invhaxu.png")
// Item DC6s (inv*.DC6) are single-frame → dc6png outputs {basename}.png directly.
// Multi-frame ones output {basename}_0_0.png etc.; we keep only frame _0_0 and
// rename to {basename}.png.
//
// Sources processed in priority order (pd2assets last = wins on conflicts):

const ITEM_DIRS = [
  path.join(GAMEDATA, 'd2data',    'data', 'global', 'items'),
  path.join(GAMEDATA, 'd2exp',     'data', 'global', 'items'),
  path.join(GAMEDATA, 'pd2assets', 'data', 'global', 'items'),
];

ensureDir(ITEMS_OUT);
const tmpItems = path.join(ITEMS_OUT, '_tmp');
ensureDir(tmpItems);

for (const dir of ITEM_DIRS) {
  if (!fs.existsSync(dir)) continue;
  const dc6s = fs.readdirSync(dir).filter(f => /^inv.*\.dc6$/i.test(f));
  if (!dc6s.length) continue;
  const srcName = path.basename(path.dirname(path.dirname(path.dirname(path.dirname(dir)))));
  console.log(`  items from ${srcName} (${dc6s.length} files)...`);
  // Process one file at a time to avoid Windows command-line length limits
  for (const dc6 of dc6s) {
    run(`"${NODE}" "${DC6PNG}" -p "${PAL}" -f "${path.join(dir, dc6)}" -o "${tmpItems}"`);
  }
}

for (const f of fs.readdirSync(tmpItems)) {
  const lower = f.toLowerCase();
  // Multi-frame: keep only direction-0 frame-0; rename to strip the suffix
  const multiMatch = lower.match(/^(.+)_0_0\.png$/);
  if (multiMatch) {
    fs.renameSync(path.join(tmpItems, f), path.join(ITEMS_OUT, multiMatch[1] + '.png'));
  } else if (lower.match(/_\d+_\d+\.png$/)) {
    // Other frame — discard
    fs.unlinkSync(path.join(tmpItems, f));
  } else {
    // Single-frame output (no suffix) — keep as-is, lowercased
    fs.renameSync(path.join(tmpItems, f), path.join(ITEMS_OUT, lower));
  }
}
fs.rmdirSync(tmpItems);
console.log(`Item icons → ${ITEMS_OUT}`);

console.log('Done.');
