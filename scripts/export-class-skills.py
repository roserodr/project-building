import csv
import json

CLASS_MAP = {
    'ama': 'Amazon',
    'sor': 'Sorceress',
    'nec': 'Necromancer',
    'pal': 'Paladin',
    'bar': 'Barbarian',
    'dru': 'Druid',
    'ass': 'Assassin'
}

TAB_NAMES = {
    'Amazon': ['Bow and Crossbow', 'Passive and Magic', 'Javelin and Spear'],
    'Sorceress': ['Cold Spells', 'Lightning Spells', 'Fire Spells'],
    'Necromancer': ['Summoning Spells', 'Poison and Bone', 'Curses'],
    'Paladin': ['Combat Skills', 'Offensive Auras', 'Defensive Auras'],
    'Barbarian': ['Warcries', 'Combat Masteries', 'Combat Skills'],
    'Druid': ['Elemental', 'Shape Shifting', 'Summoning'],
    'Assassin': ['Traps', 'Shadow Disciplines', 'Martial Arts']
}

def clean_str(s):
    if not s: return ""
    return s.strip()

def run():
    skilldesc = {}
    with open('skilldesc.txt', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f, delimiter='\t')
        for row in reader:
            if clean_str(row.get('skilldesc')):
                skilldesc[clean_str(row.get('skilldesc'))] = row

    skills_data = {}
    with open('skills.txt', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f, delimiter='\t')
        for row in reader:
            charclass_code = clean_str(row.get('charclass'))
            if not charclass_code or charclass_code not in CLASS_MAP:
                continue

            skill_name = clean_str(row.get('skill'))
            skill_id = skill_name.replace(' ', '_').replace('-', '_').replace("'", "").lower()
            desc_key = clean_str(row.get('skilldesc'))

            desc_data = skilldesc.get(desc_key)
            if not desc_data:
                continue

            try:
                page = int(desc_data.get('SkillPage', 0))
                row_val = int(desc_data.get('SkillRow', 0))
                col_val = int(desc_data.get('SkillColumn', 0))
                list_row = int(desc_data.get('ListRow', 0))
            except ValueError:
                continue

            if page == 0 or list_row == 0:
                continue

            c = CLASS_MAP[charclass_code]
            if c not in skills_data:
                skills_data[c] = []

            tab_name = TAB_NAMES[c][page - 1]
            deps = []
            for i in range(1, 4):
                req = clean_str(row.get(f'reqskill{i}'))
                if req:
                    deps.append(req.replace(' ', '_').replace('-', '_').replace("'", "").lower())

            try:
                icon = int(desc_data.get('IconCel', 0))
            except:
                icon = 0

            try:
                req_level = int(row.get('reqlevel', 1))
            except:
                req_level = 1

            skills_data[c].append({
                'id': skill_id,
                'iconCel': icon,
                'name': skill_name.title() if not skill_name.isupper() else skill_name,
                'tab': tab_name,
                'row': row_val - 1,
                'col': col_val - 1,
                'maxLevel': 20,
                'reqLevel': req_level,
                'dependencies': deps,
                'description': f'Base skill {skill_name}'
            })

    output = []
    output.append("import type { Skill } from '../types';\n")
    output.append("import { assassinSkills } from './assassinSkills';\n\n")

    output.append("export const allSkills: Record<string, Skill[]> = {\n")

    for c, skills in skills_data.items():
        if c == 'Assassin':
            output.append(f"  '{c}': assassinSkills,\n")
            continue

        output.append(f"  '{c}': [\n")
        for s in skills:
            output.append(f"    {{\n")
            output.append(f"      id: '{s['id']}',\n")
            output.append(f"      iconCel: {s['iconCel']},\n")
            output.append(f"      name: '{s['name']}',\n")
            output.append(f"      tab: '{s['tab']}',\n")
            output.append(f"      row: {s['row']},\n")
            output.append(f"      col: {s['col']},\n")
            output.append(f"      maxLevel: 20,\n")
            output.append(f"      reqLevel: {s['reqLevel']},\n")
            output.append(f"      dependencies: {json.dumps(s['dependencies'])},\n")
            output.append(f"      description: '',\n")
            output.append(f"    }},\n")
        output.append(f"  ],\n")

    output.append("};\n")

    with open('src/data/allSkills.ts', 'w') as f:
        f.write("".join(output))

if __name__ == '__main__':
    run()
