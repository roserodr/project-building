"""Bake per-class skill-tree backgrounds (stone + slots + connector arrows) from
PD2's skltree_<x>_back.dc6.

Each DC6 is 1 direction x 16 frames = four 2x2 tile groups (each 320x432):
  group 0 = chrome only (tab column + "skill choices" box; tree area empty)
  group 1 = SkillPage 1 tree art   (boxes + arrows baked in)
  group 2 = SkillPage 2 tree art
  group 3 = SkillPage 3 tree art
We assemble groups 1-3, crop to the 250-wide tree area (matching the existing
hand-made Assassin tree_traps.png, which is exactly group 1 cropped), and write
public/ui/trees/<Class>/<tab-slug>.png keyed by the tab name for that page.
Requires the DC6s under gamedata/pd2assets/.../SPELLS (download-gamedata / rclone).
"""
import os, re, subprocess, sys, shutil
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPELLS = os.path.join(ROOT, 'gamedata', 'pd2assets', 'data', 'global', 'ui', 'SPELLS')
# Skill-tree art (like the skill icons) needs the ACT1 palette; the default
# pal.dat renders the recessed-slot/box tones with a blue cast.
_PAL_CANDIDATES = [
    os.path.join(ROOT, 'gamedata', 'pal_act1.dat'),
    os.path.join(ROOT, 'gamedata', 'd2data', 'data', 'global', 'palette', 'ACT1', 'pal.dat'),
    os.path.join(ROOT, 'gamedata', 'pal.dat'),
]
PAL = next((p for p in _PAL_CANDIDATES if os.path.exists(p)), _PAL_CANDIDATES[-1])
DC6PNG = os.path.join(ROOT, 'node_modules', 'dc6png', 'src', 'index.js')
OUT = os.path.join(ROOT, 'public', 'ui', 'trees')

# class -> (skltree letter, [page1 tab, page2 tab, page3 tab])
CLASSES = {
    'Amazon':      ('a', ['Bow and Crossbow', 'Passive and Magic', 'Javelin and Spear']),
    'Sorceress':   ('s', ['Fire Spells', 'Lightning Spells', 'Cold Spells']),
    'Necromancer': ('n', ['Curses', 'Poison and Bone', 'Summoning Spells']),
    'Paladin':     ('p', ['Combat Skills', 'Offensive Auras', 'Defensive Auras']),
    'Barbarian':   ('b', ['Combat Skills', 'Combat Masteries', 'Warcries']),
    'Druid':       ('d', ['Summoning', 'Shape Shifting', 'Elemental']),
    'Assassin':    ('i', ['Traps', 'Shadow Disciplines', 'Martial Arts']),
}

def slug(name):
    return re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')

def extract(dc6, tmp):
    if os.path.isdir(tmp):
        shutil.rmtree(tmp)
    os.makedirs(tmp)
    subprocess.run(['node', DC6PNG, '-p', PAL, '-f', dc6, '-o', tmp],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def assemble(tmp, base, g):
    def fr(i):
        return Image.open(os.path.join(tmp, f'{base}_0_{i}.png')).convert('RGBA')
    im = Image.new('RGBA', (320, 432), (0, 0, 0, 255))
    im.paste(fr(4*g + 0), (0, 0))      # 256x256 top-left
    im.paste(fr(4*g + 1), (256, 0))    # 64x256 top-right
    im.paste(fr(4*g + 2), (0, 256))    # 256x176 bottom-left
    im.paste(fr(4*g + 3), (256, 256))  # 64x176 bottom-right
    return im.convert('RGB')

def tree_area(im):
    return im.crop((0, 0, 250, 432))      # 250-wide tree area (matches tree_traps.png)

def tab_strip(im):
    return im.crop((226, 0, 320, 432))    # 94-wide tab column (matches tab_traps.png)

def run():
    if not os.path.exists(PAL):
        sys.exit(f'palette missing: {PAL}')
    tmp = os.path.join(ROOT, 'scripts', '_tree_extract')
    for cls, (letter, tabs) in CLASSES.items():
        dc6 = os.path.join(SPELLS, f'skltree_{letter}_back.dc6')
        if not os.path.exists(dc6):
            print(f'  skip {cls} ({os.path.basename(dc6)} not found)')
            continue
        base = f'skltree_{letter}_back'
        extract(dc6, tmp)
        dest = os.path.join(OUT, cls)
        os.makedirs(dest, exist_ok=True)
        for page, tab in enumerate(tabs, start=1):     # groups 1..3 = pages 1..3
            tree_area(assemble(tmp, base, page)).save(os.path.join(dest, f'{slug(tab)}.png'))
        # group 0 = chrome (tab column + "skill choices" box), shared by all 3 tabs
        tab_strip(assemble(tmp, base, 0)).save(os.path.join(dest, '_tabs.png'))
        print(f'  {cls}: {len(tabs)} tabs + strip -> public/ui/trees/{cls}/')
    if os.path.isdir(tmp):
        shutil.rmtree(tmp)

if __name__ == '__main__':
    run()
