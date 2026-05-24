import zipfile
import csv
import io
import json
import re

def read_txt(zip_path, file_path):
    with zipfile.ZipFile(zip_path, 'r') as z:
        with z.open(file_path, 'r') as f:
            content = f.read().decode('utf-8-sig', errors='replace')
            reader = csv.DictReader(io.StringIO(content), delimiter='\t')
            return list(reader)

def map_icons():
    skills = read_txt('gamedata.zip', 'gamedata/pd2data/excel/skills.txt')
    skilldesc = read_txt('gamedata.zip', 'gamedata/pd2data/excel/Skilldesc.txt')

    skill_name_map = {
        'fire trauma': 'fire_blast',
        'shock field': 'shock_web',
        'blade sentinel': 'blade_sentinel',
        'charged bolt sentry': 'charged_bolt_sentry',
        'wake of fire sentry': 'wake_of_fire',
        'blade fury': 'blade_fury',
        'lightning sentry': 'lightning_sentry',
        'inferno sentry': 'wake_of_inferno',
        'death sentry': 'death_sentry',
        'blade shield': 'blade_shield',
        'claw mastery': 'claw_mastery',
        'psychic hammer': 'psychic_hammer',
        'quickness': 'burst_of_speed',
        'cloak of shadows': 'cloak_of_shadows',
        'weapon block': 'weapon_block',
        'fade': 'fade',
        'shadow warrior': 'shadow_warrior',
        'mind blast': 'mind_blast',
        'venom': 'venom',
        'shadow master': 'shadow_master',
        'tiger strike': 'tiger_strike',
        'dragon talon': 'dragon_talon',
        'fists of fire': 'fists_of_fire',
        'dragon claw': 'dragon_claw',
        'cobra strike': 'cobra_strike',
        'claws of thunder': 'claws_of_thunder',
        'dragon tail': 'dragon_tail',
        'blades of ice': 'blades_of_ice',
        'dragon flight': 'dragon_flight',
        'royal strike': 'phoenix_strike'
    }

    desc_map = {desc['skilldesc'].lower(): desc for desc in skilldesc if desc.get('skilldesc')}

    icon_map = {}
    for skill in skills:
        skill_name = skill.get('skill', '').lower()
        if skill_name in skill_name_map:
            mapped_name = skill_name_map[skill_name]

            desc_key = skill.get('skilldesc', '').lower()
            desc_row = desc_map.get(desc_key)
            if desc_row:
                icon_cel = desc_row.get('IconCel')
                if icon_cel:
                    charclass = skill.get('charclass')
                    prefix = ""
                    if charclass == 'ama': prefix = 'amskillicon'
                    elif charclass == 'sor': prefix = 'soskillicon'
                    elif charclass == 'nec': prefix = 'neskillicon'
                    elif charclass == 'pal': prefix = 'paskillicon'
                    elif charclass == 'bar': prefix = 'baskillicon'
                    elif charclass == 'dru': prefix = 'skillicon'
                    elif charclass == 'ass': prefix = 'skillicon' # For assassin it is actually skillicon too or paskillicon?

                    # Assassin skills in D2 LOD are located in the expansion skill files. But if you look at our file list, we don't have "asskillicon.dc6".
                    # Let's see what the assassin uses in charclass.
                    # Actually wait, D2 uses charclass for base 5, and then what? Assasin and Druid use 'skillicon' or 'amskillicon'?
                    # No, Assassin and Druid icons are usually in 'Skillicon.DC6' or in 'obj.txt'. Let's just output the cel, and we can find out.
                    icon_map[mapped_name] = {'cel': icon_cel}

    # read assassinSkills.ts and inject it
    with open('src/data/assassinSkills.ts', 'r') as f:
        content = f.read()

    for k, v in icon_map.items():
        # Inject the icon property right after id
        pattern = r"(id:\s*'" + k + r"',)"
        repl = r"\1\n    iconCel: " + v['cel'] + ","
        content = re.sub(pattern, repl, content)

    with open('src/data/assassinSkills.ts', 'w') as f:
        f.write(content)

    print(f"Injected {len(icon_map)} iconcels")

if __name__ == '__main__':
    map_icons()
