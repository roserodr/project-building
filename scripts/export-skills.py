import csv
import json

def read_txt(file_path):
    with open(file_path, 'r', encoding='utf-8-sig', errors='replace') as f:
        reader = csv.DictReader(f, delimiter='\t')
        return list(reader)

def calc_damage(min_dam, lev_dam1, lev_dam2, lev_dam3, lev_dam4, lev_dam5, level, shift):
    if min_dam == "" or min_dam is None:
        return None
    try:
        val = float(min_dam)
    except:
        return None

    for i in range(1, level):
        if i < 9:
            val += float(lev_dam1 or 0)
        elif i < 17:
            val += float(lev_dam2 or 0)
        elif i < 23:
            val += float(lev_dam3 or 0)
        elif i < 29:
            val += float(lev_dam4 or 0)
        else:
            val += float(lev_dam5 or 0)

    if shift is not None:
        # Damage shifts are bits shifted (i.e. * (2^shift) / 256)
        val = val * (2 ** shift) / 256.0
    return val

def get_skills_data():
    # We will read from existing skillsLevelData.ts and inject our changes over it so we don't destroy other classes.
    skills = read_txt('gamedata/pd2data/excel/skills.txt')

    skill_name_map = {
        'fire trauma': 'Fire Blast',
        'shock field': 'Shock Web',
        'blade sentinel': 'Blade Sentinel',
        'charged bolt sentry': 'Charged Bolt Sentry',
        'wake of fire sentry': 'Wake of Fire',
        'blade fury': 'Blade Fury',
        'lightning sentry': 'Lightning Sentry',
        'inferno sentry': 'Wake of Inferno',
        'death sentry': 'Death Sentry',
        'blade shield': 'Blade Shield',
        'claw mastery': 'Claw Mastery',
        'psychic hammer': 'Psychic Hammer',
        'quickness': 'Burst of Speed',
        'cloak of shadows': 'Cloak of Shadows',
        'weapon block': 'Weapon Block',
        'fade': 'Fade',
        'shadow warrior': 'Shadow Warrior',
        'mind blast': 'Mind Blast',
        'venom': 'Venom',
        'shadow master': 'Shadow Master',
        'tiger strike': 'Tiger Strike',
        'dragon talon': 'Dragon Talon',
        'fists of fire': 'Fists of Fire',
        'dragon claw': 'Dragon Claw',
        'cobra strike': 'Cobra Strike',
        'claws of thunder': 'Claws of Thunder',
        'dragon tail': 'Dragon Tail',
        'blades of ice': 'Blades of Ice',
        'dragon flight': 'Dragon Flight',
        'royal strike': 'Phoenix Strike'
    }

    import re
    with open('src/data/skillsLevelData.ts', 'r') as f:
        content = f.read()

    # Extract json string
    match = re.search(r'export const skillsLevelData.*?=\s*(\{.*?\});\n$', content, re.DOTALL)
    if not match:
        print("Could not find skillsLevelData JSON")
        return

    levels_data = json.loads(match.group(1))

    for skill in skills:
        skill_name = skill.get('skill', '').lower()
        if skill_name in skill_name_map:
            mapped_name = skill_name_map[skill_name]
            # Replace mapped_name in levels_data
            levels_data[mapped_name] = {}

            shift = None
            if skill.get('HitShift'):
                try:
                    shift = int(skill.get('HitShift'))
                except:
                    shift = None

            for level in range(1, 41):
                min_phys = calc_damage(skill.get('MinDam'), skill.get('MinLevDam1'), skill.get('MinLevDam2'), skill.get('MinLevDam3'), skill.get('MinLevDam4'), skill.get('MinLevDam5'), level, shift)
                max_phys = calc_damage(skill.get('MaxDam'), skill.get('MaxLevDam1'), skill.get('MaxLevDam2'), skill.get('MaxLevDam3'), skill.get('MaxLevDam4'), skill.get('MaxLevDam5'), level, shift)

                min_elem = calc_damage(skill.get('EMin'), skill.get('EMinLev1'), skill.get('EMinLev2'), skill.get('EMinLev3'), skill.get('EMinLev4'), skill.get('EMinLev5'), level, shift)
                max_elem = calc_damage(skill.get('EMax'), skill.get('EMaxLev1'), skill.get('EMaxLev2'), skill.get('EMaxLev3'), skill.get('EMaxLev4'), skill.get('EMaxLev5'), level, shift)

                lvl_data = {}

                f_min = None
                f_max = None

                if (min_elem or 0) > (min_phys or 0):
                    f_min = min_elem
                    f_max = max_elem
                elif (min_phys or 0) > 0:
                    f_min = min_phys
                    f_max = max_phys

                if f_min is not None:
                    # Div by 2 roughly approximates old cheerio values since game displays are modified by 256 for float
                    lvl_data['minDamage'] = round(f_min / 2.0) if skill.get('HitShift') else f_min
                    lvl_data['maxDamage'] = round(f_max / 2.0) if skill.get('HitShift') else f_max
                    levels_data[mapped_name][level] = lvl_data

            if not levels_data[mapped_name]:
                del levels_data[mapped_name]

    with open('src/data/skillsLevelData.ts', 'w') as f:
        f.write("export const skillsLevelData: Record<string, Record<number, { minDamage?: number; maxDamage?: number; }>> = ")
        f.write(json.dumps(levels_data, indent=2))
        f.write(";\n")

    print(f"Saved skills level data for {len(levels_data)} total skills")

if __name__ == '__main__':
    get_skills_data()
