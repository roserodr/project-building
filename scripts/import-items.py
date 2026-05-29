import csv
import json
import re

# Since we don't have tbl files easily readable to get "ModStr1a", let's manually map the main attributes to human readable formats for the item parser.

prop_display_map = {
    'ac': '+{min} to Defense',
    'ac%': '+{min}% Enhanced Defense',
    'str': '+{min} to Strength',
    'dex': '+{min} to Dexterity',
    'vit': '+{min} to Vitality',
    'enr': '+{min} to Energy',
    'mana': '+{min} to Mana',
    'hp': '+{min} to Life',
    'life': '+{min} to Life',
    'att': '+{min} to Attack Rating',
    'att%': '{min}% Bonus to Attack Rating',
    'dmg%': '{min}% Enhanced Damage',
    'dmg-min': '+{min} to Minimum Damage',
    'dmg-max': '+{min} to Maximum Damage',
    'dmg-norm': 'Adds {min}-{max} Damage',
    'res-all': '+{min} to All Resistances',
    'res-fire': '{min}% Fire Resistance',
    'res-ltng': '{min}% Lightning Resistance',
    'res-cold': '{min}% Cold Resistance',
    'res-pois': '{min}% Poison Resistance',
    'swing1': '{min}% Increased Attack Speed',
    'swing2': '{min}% Increased Attack Speed',
    'swing3': '{min}% Increased Attack Speed',
    'cast1': '{min}% Faster Cast Rate',
    'cast2': '{min}% Faster Cast Rate',
    'cast3': '{min}% Faster Cast Rate',
    'block1': '{min}% Faster Block Rate',
    'block2': '{min}% Faster Block Rate',
    'block3': '{min}% Faster Block Rate',
    'hit1': '{min}% Faster Hit Recovery',
    'hit2': '{min}% Faster Hit Recovery',
    'hit3': '{min}% Faster Hit Recovery',
    'balance1': '{min}% Faster Hit Recovery',
    'balance2': '{min}% Faster Hit Recovery',
    'balance3': '{min}% Faster Hit Recovery',
    'mag%': '{min}% Better Chance of Getting Magic Items',
    'gold%': '{min}% Extra Gold from Monsters',
    'lifesteal': '{min}% Life Stolen Per Hit',
    'manasteal': '{min}% Mana Stolen Per Hit',
    'allskills': '+{min} to All Skills',
    'skill': '+{min} to Skill',
    'skpoints': '+{min} Skill Points',
    'openwounds': '{min}% Chance of Open Wounds',
    'deadly': '{min}% Deadly Strike',
    'crush': '{min}% Chance of Crushing Blow',
    'pierce': '{min}% Piercing Attack',
    'red-dmg': 'Damage Reduced by {min}',
    'red-dmg%': 'Damage Reduced by {min}%',
    'red-mag': 'Magic Damage Reduced by {min}',
    'regen-mana': 'Regenerate Mana {min}%',
    'regen': 'Replenish Life +{min}',
    'splash': 'Melee Attacks Deal Splash Damage',
    'indestruct': 'Indestructible',
    'light': '+{min} to Light Radius',
    'ease': 'Requirements -{min}%',
    'hp/lvl': '+{min} to Life (Based on Character Level)',
    'mana/lvl': '+{min} to Mana (Based on Character Level)'
}

def format_stat_name(prop_code, min_val, max_val, param=None):
    if min_val and str(min_val).startswith('-'):
        pass

    mapped = prop_display_map.get(prop_code.lower())
    if mapped:
        if '{max}' in mapped and max_val and min_val != max_val:
            return mapped.format(min=min_val, max=max_val)
        else:
            return mapped.format(min=min_val, max=max_val).replace('-{max}', '')

    if prop_code.lower() == 'dmg-to-mana': return f"{min_val}% Damage Taken Goes to Mana"
    if prop_code.lower() == 'ac-miss': return f"+{min_val} Defense vs. Missiles"
    if prop_code.lower() == 'hit-skill': return f"{min_val}% Chance to Cast Level {max_val} Skill {param} on Striking"
    if prop_code.lower() == 'gethit-skill': return f"{min_val}% Chance to Cast Level {max_val} Skill {param} when Struck"
    if prop_code.lower() == 'att-skill': return f"{min_val}% Chance to Cast Level {max_val} Skill {param} on Attack"
    if prop_code.lower() == 'cast-skill': return f"{min_val}% Chance to Cast Level {max_val} Skill {param} when you Kill an Enemy"
    if prop_code.lower() == 'levelup-skill': return f"{min_val}% Chance to Cast Level {max_val} Skill {param} when you Level Up"
    if prop_code.lower() == 'aura': return f"Level {min_val} Aura {param} when Equipped"

    # Fallback heuristic
    return f"{prop_code} {'[' + str(min_val) + '-' + str(max_val) + ']' if min_val and max_val and min_val != max_val else '+' + str(min_val)}"

def read_txt(file_path):
    with open(file_path, 'r', encoding='utf-8-sig', errors='replace') as f:
        reader = csv.DictReader(f, delimiter='\t')
        return list(reader)

EXCEL = 'gamedata/pd2data/data/global/excel'

def parse_items():
    armors = read_txt(f'{EXCEL}/Armor.txt')
    weapons = read_txt(f'{EXCEL}/Weapons.txt')
    misc = read_txt(f'{EXCEL}/Misc.txt')
    unique_items = read_txt(f'{EXCEL}/UniqueItems.txt')
    set_items = read_txt(f'{EXCEL}/SetItems.txt')
    runes = read_txt(f'{EXCEL}/Runes.txt')

    base_items_by_code = {}
    for item in armors:
        if item.get('code'):
            item['base_type_cat'] = 'Armor'
            base_items_by_code[item['code']] = item
    for item in weapons:
        if item.get('code'):
            item['base_type_cat'] = 'Weapon'
            base_items_by_code[item['code']] = item
    for item in misc:
        if item.get('code'):
            item['base_type_cat'] = 'Misc'
            base_items_by_code[item['code']] = item

    def get_slot_type(item_cat, itype):
        if item_cat == 'Armor':
            if itype == 'helm': return 'Helm'
            if itype == 'tors': return 'Body Armor'
            if itype == 'glov': return 'Gloves'
            if itype == 'boot': return 'Boots'
            if itype == 'belt': return 'Belt'
            if itype == 'shld': return 'Offhand'
            return 'Armor'
        if item_cat == 'Weapon':
            return 'Weapon'
        if item_cat == 'Misc':
            if itype == 'ring': return 'Ring'
            if itype == 'amul': return 'Amulet'
        return 'Misc'

    def extract_stats(props_row, prefix='prop', val_prefix='min', max_prefix='max', par_prefix='par'):
        stats = []
        for i in range(1, 13):
            prop_code = props_row.get(f'{prefix}{i}')
            if not prop_code: continue
            par = props_row.get(f'{par_prefix}{i}', '')
            min_val = props_row.get(f'{val_prefix}{i}', '')
            max_val = props_row.get(f'{max_prefix}{i}', '')

            stat_name = format_stat_name(prop_code, min_val, max_val, par)

            val = min_val if min_val else '0'
            try:
                val = int(val)
            except:
                val = 0

            stats.append({
                'id': re.sub(r'[^a-z0-9_]', '_', prop_code.lower()),
                'name': stat_name,
                'value': val,
                'type': 'flat',
                'min': int(min_val) if str(min_val).lstrip('-').isdigit() else None,
                'max': int(max_val) if str(max_val).lstrip('-').isdigit() else None,
            })
        return stats

    def serialize_stat(stat):
        name = stat['name'].replace("'", "\\'")
        parts = [
            f"id: '{stat['id']}'",
            f"name: '{name}'",
            f"value: {stat['value']}",
            f"type: '{stat['type']}'",
        ]
        if stat.get('min') is not None: parts.append(f"min: {stat['min']}")
        if stat.get('max') is not None: parts.append(f"max: {stat['max']}")
        return '{ ' + ', '.join(parts) + ' }'

    def format_ts_array(items, array_name):
        rows = []
        for item in items:
            name = item['name'].replace("'", "\\'")
            base_type = (item['baseType'] or item['name']).replace("'", "\\'")
            stats = item.get('stats', [])
            stats_text = ', '.join(serialize_stat(stat) for stat in stats)
            image_file = item.get('imageFile', '')
            image_prop = f", imageFile: '{image_file}'" if image_file else ""
            rows.append(
                f"  {{ id: '{item['id']}', name: '{name}', baseType: '{base_type}', slotType: '{item['slotType']}', rarity: '{item['rarity']}', width: {item['width']}, height: {item['height']}, requiredLevel: {item['requiredLevel']}, stats: [{stats_text}]{image_prop} }},"
            )
        return f"export const {array_name}: Item[] = [\n" + "\n".join(rows) + "\n];\n"

    def process_items(item_list, rarity):
        processed = []
        for item in item_list:
            if not item.get('index'):
                continue
            code = item.get('item') or item.get('code')
            base_item = base_items_by_code.get(code)
            if not base_item:
                continue

            itype = base_item.get('type')
            slot_type = get_slot_type(base_item.get('base_type_cat'), itype)

            width = int(base_item.get('invwidth', 1))
            height = int(base_item.get('invheight', 1))

            req_lvl = item.get('lvl req', '1')

            stats = extract_stats(item)

            processed.append({
                'id': re.sub(r'[^a-z0-9_]', '_', item['index'].lower()),
                'name': item['index'],
                'baseType': base_item.get('name', code),
                'slotType': slot_type,
                'rarity': rarity,
                'width': width,
                'height': height,
                'requiredLevel': int(req_lvl) if req_lvl.isdigit() else 1,
                'stats': stats,
                'imageFile': item.get('invfile') or base_item.get('invfile', '')
            })
        return processed

    def process_runewords(item_list):
        processed = []
        for item in item_list:
            if not item.get('Name') or item.get('complete') == '0':
                continue
            name = item.get('Rune Name') or item.get('Name')
            t1 = item.get('itype1', '')
            slot_type = 'Weapon'
            if 'tors' in t1 or 'armo' in t1: slot_type = 'Body Armor'
            elif 'helm' in t1 or 'circ' in t1 or 'phlm' in t1: slot_type = 'Helm'
            elif 'shld' in t1 or 'pala' in t1: slot_type = 'Offhand'

            stats = extract_stats(item, prefix='T1Code', val_prefix='T1Min', max_prefix='T1Max', par_prefix='T1Param')

            processed.append({
                'id': re.sub(r'[^a-z0-9_]', '_', name.lower()),
                'name': name,
                'baseType': item.get('Name', 'Runeword'),
                'slotType': slot_type,
                'rarity': 'Runeword',
                'width': 2,
                'height': 3,
                'requiredLevel': 1,
                'stats': stats,
                'imageFile': ''
            })
        return processed

    print("Extracting uniques...")
    uniques = [u for u in unique_items if u.get('enabled') != '0']
    processed_uniques = process_items(uniques, 'Unique')

    print("Extracting sets...")
    processed_sets = process_items(set_items, 'Set')

    print("Extracting runewords...")
    processed_runewords = process_runewords(runes)

    out_ts = "import type { Item } from '../types';\n\n"
    out_ts += format_ts_array(processed_uniques, 'wikiUniqueItems')
    out_ts += "\n" + format_ts_array(processed_sets, 'wikiSetItems')
    out_ts += "\n" + format_ts_array(processed_runewords, 'wikiRunewordItems')

    with open('src/data/projectDiablo2Items.ts', 'w') as f:
        f.write(out_ts)

    print(f"Generated src/data/projectDiablo2Items.ts with {len(processed_uniques)} uniques, {len(processed_sets)} set items, and {len(processed_runewords)} runewords.")

if __name__ == '__main__':
    parse_items()
