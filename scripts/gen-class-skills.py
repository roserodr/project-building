import csv, re, html, json, os

# Generates per-class skill data files (Amazon/Sorceress/Necromancer/Paladin/
# Barbarian/Druid) from PD2's Skills.txt + Skilldesc.txt for layout/prereqs and
# the "All Skills - Project Diablo 2" wiki snapshot for friendly descriptions.
# The Assassin is hand-curated separately in assassinSkills.ts and left untouched.

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CLASS_MAP = {
    'ama': 'Amazon', 'sor': 'Sorceress', 'nec': 'Necromancer',
    'pal': 'Paladin', 'bar': 'Barbarian', 'dru': 'Druid',
}
# Indexed by SkillPage (1,2,3) in the order PD2's Skills.txt actually uses them.
TAB_NAMES = {
    'Amazon': ['Bow and Crossbow', 'Passive and Magic', 'Javelin and Spear'],
    'Sorceress': ['Fire Spells', 'Lightning Spells', 'Cold Spells'],
    'Necromancer': ['Curses', 'Poison and Bone', 'Summoning Spells'],
    'Paladin': ['Combat Skills', 'Offensive Auras', 'Defensive Auras'],
    'Barbarian': ['Combat Skills', 'Combat Masteries', 'Warcries'],
    'Druid': ['Summoning', 'Shape Shifting', 'Elemental'],
}

# PD2 internal skill names (Skills.txt) that differ from the wiki's display name.
# Anything internal that maps to a wiki name is renamed; internal skills with no
# wiki entry (e.g. the Amazon's old "Avoid", the Barbarian's per-weapon masteries)
# are deprecated in PD2 and dropped via the wiki-membership filter below.
ALIAS = {
    'Dopplezon': 'Decoy',
    'Enchant': 'Enchant Fire',
    'AmpDmg': 'Amplify Damage',
    'Raise Skeleton': 'Raise Skeleton Warrior',
    'Poison Dagger': 'Poison Strike',
    'BloodGolem': 'Blood Golem',
    'IronGolem': 'Iron Golem',
    'LowRes': 'Lower Resist',
    'FireGolem': 'Fire Golem',
    'CurMas': 'Curse Mastery',
    'One Hand Mastery': 'One Handed Mastery',
    'Two Hand Mastery': 'Two Handed Mastery',
    'Raven': 'Summon Ravens',
    'Plague Poppy': 'Poison Creeper',
    'Wearwolf': 'Werewolf',
    'Shape Shifting': 'Lycanthropy',
    'Wearbear': 'Werebear',
    'Cycle of Life': 'Solar Creeper',
    'Summon Fenris': 'Summon Dire Wolf',
    'Vines': 'Carrion Vine',
    'Eruption': 'Fissure',
}
FILE_NAMES = {
    'Amazon': 'amazonSkills', 'Sorceress': 'sorceressSkills',
    'Necromancer': 'necromancerSkills', 'Paladin': 'paladinSkills',
    'Barbarian': 'barbarianSkills', 'Druid': 'druidSkills',
}

def clean(s):
    return (s or '').strip()

def skill_id(name):
    return name.replace(' ', '_').replace('-', '_').replace("'", '').lower()

def wiki_descriptions():
    path = os.path.join(ROOT, 'scripts', 'All Skills - Project Diablo 2.html')
    d = open(path, encoding='utf-8', errors='ignore').read()
    cut = d.find('id="Item-Granted_Skills"')
    body = d[:cut] if cut > 0 else d
    desc = {}
    for m in re.finditer(r'<h2 id="([^"]+)">(.*?)</h2>(.*?)(?=<h2 |<h1 |$)', body, re.S):
        name = re.sub('<[^>]+>', '', m.group(2)).strip()
        dm = re.search(r'<b>Description:</b>\s*(.*?)</li>', m.group(3), re.S)
        if not dm:
            continue
        txt = html.unescape(re.sub('<[^>]+>', '', dm.group(1))).strip()
        desc[name.lower()] = txt
    return desc

def load_skilldesc():
    path = os.path.join(ROOT, 'gamedata', 'pd2excel', 'Skilldesc.txt')
    sd = {}
    with open(path, encoding='utf-8', errors='ignore') as f:
        for r in csv.DictReader(f, delimiter='\t'):
            k = clean(r.get('skilldesc'))
            if k:
                sd[k] = r
    return sd

def run():
    desc = wiki_descriptions()
    sd = load_skilldesc()
    by_class = {c: [] for c in CLASS_MAP.values()}

    path = os.path.join(ROOT, 'gamedata', 'pd2excel', 'Skills.txt')
    with open(path, encoding='utf-8', errors='ignore') as f:
        for r in csv.DictReader(f, delimiter='\t'):
            cc = clean(r.get('charclass'))
            if cc not in CLASS_MAP:
                continue
            raw = clean(r.get('skill'))
            name = ALIAS.get(raw, raw)
            dd = sd.get(clean(r.get('skilldesc')))
            if not dd:
                continue
            # Only include skills that exist in the PD2 wiki tree (filters out
            # deprecated/hidden skills like the old Amazon "Avoid").
            if name.lower() not in desc:
                continue
            try:
                page = int(dd.get('SkillPage', 0))
                row = int(dd.get('SkillRow', 0))
                col = int(dd.get('SkillColumn', 0))
                listrow = int(dd.get('ListRow', 0))
                icon = int(dd.get('IconCel', 0))
            except ValueError:
                continue
            if page == 0 or listrow == 0:
                continue
            try:
                req_level = int(r.get('reqlevel', 1))
            except (ValueError, TypeError):
                req_level = 1
            deps = []
            for i in range(1, 4):
                req = clean(r.get(f'reqskill{i}'))
                if req:
                    deps.append(skill_id(ALIAS.get(req, req)))
            c = CLASS_MAP[cc]
            by_class[c].append({
                'id': skill_id(name),
                'iconCel': icon,
                'name': name,
                'tab': TAB_NAMES[c][page - 1],
                'row': row - 1,
                'col': col - 1,
                'maxLevel': 20,
                'reqLevel': req_level,
                'dependencies': deps,
                'description': desc[name.lower()],
            })

    for c, skills in by_class.items():
        ids = {s['id'] for s in skills}
        for s in skills:
            s['dependencies'] = [d for d in s['dependencies'] if d in ids]
        # Sort by tab page order (not alphabetical) so the rendered tab strip
        # matches the authentic D2 ordering, then by grid position.
        tab_order = {name: i for i, name in enumerate(TAB_NAMES[c])}
        skills.sort(key=lambda s: (tab_order.get(s['tab'], 99), s['row'], s['col']))
        var = FILE_NAMES[c]
        out = ["import type { Skill } from '../types';\n\n"]
        out.append(f"// Auto-generated by scripts/gen-class-skills.py from PD2 Skills.txt /\n")
        out.append(f"// Skilldesc.txt (layout, prerequisites, icon cels, required levels) and the\n")
        out.append(f"// Project Diablo 2 wiki (descriptions). Positions: row = SkillRow - 1,\n")
        out.append(f"// col = SkillColumn - 1.\n")
        out.append(f"export const {var}: Skill[] = [\n")
        for s in skills:
            out.append("  {\n")
            out.append(f"    id: {json.dumps(s['id'])},\n")
            out.append(f"    iconCel: {s['iconCel']},\n")
            out.append(f"    name: {json.dumps(s['name'])},\n")
            out.append(f"    tab: {json.dumps(s['tab'])},\n")
            out.append(f"    row: {s['row']},\n")
            out.append(f"    col: {s['col']},\n")
            out.append(f"    maxLevel: {s['maxLevel']},\n")
            out.append(f"    reqLevel: {s['reqLevel']},\n")
            out.append(f"    dependencies: {json.dumps(s['dependencies'])},\n")
            out.append(f"    description: {json.dumps(s['description'])},\n")
            out.append("  },\n")
        out.append("];\n")
        with open(os.path.join(ROOT, 'src', 'data', f'{var}.ts'), 'w', encoding='utf-8') as fh:
            fh.write("".join(out))
        print(f"{c}: {len(skills)} skills -> src/data/{var}.ts")

if __name__ == '__main__':
    run()
