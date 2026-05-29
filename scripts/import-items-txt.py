import csv
import json
import re

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
    properties = read_txt(f'{EXCEL}/Properties.txt')
    item_types = read_txt(f'{EXCEL}/ItemTypes.txt')

    prop_map = {p['code']: p for p in properties if p.get('code')}

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

    print("Found", len(base_items_by_code), "base items")

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
        return 'Unknown'

    def extract_stats(props_row):
        stats = []
        for i in range(1, 13):
            prop_code = props_row.get(f'prop{i}')
            if not prop_code: continue
            par = props_row.get(f'par{i}', '')
            min_val = props_row.get(f'min{i}', '')
            max_val = props_row.get(f'max{i}', '')

            prop_def = prop_map.get(prop_code)

            stat_name = prop_code
            if prop_def and prop_def.get('*desc'):
                stat_name = prop_def['*desc']

            val = min_val if min_val else '0'
            try:
                val = int(val)
            except:
                val = 0

            stats.append({
                'id': re.sub(r'[^a-z0-9_]', '_', prop_code.lower()),
                'name': f"{prop_code} {min_val}-{max_val}",
                'value': val,
                'type': 'flat'
            })
        return stats

    processed_uniques = []
    for item in unique_items:
        if not item.get('enabled') or item['enabled'] == '0':
            continue
        if not item.get('index'):
            continue

        code = item.get('code')
        base_item = base_items_by_code.get(code)
        if not base_item:
            continue

        itype = base_item.get('type')
        slot_type = get_slot_type(base_item.get('base_type_cat'), itype)

        width = int(base_item.get('invwidth', 1))
        height = int(base_item.get('invheight', 1))

        req_lvl = item.get('lvl req', '1')

        stats = extract_stats(item)

        processed_uniques.append({
            'id': re.sub(r'[^a-z0-9_]', '_', item['index'].lower()),
            'name': item['index'],
            'baseType': base_item.get('name', code),
            'slotType': slot_type,
            'rarity': 'Unique',
            'width': width,
            'height': height,
            'requiredLevel': int(req_lvl) if req_lvl.isdigit() else 1,
            'stats': stats,
            'imageFile': item.get('invfile') or base_item.get('invfile')
        })

    print("Processed", len(processed_uniques), "uniques")

    with open('scripts/parsed_uniques.json', 'w') as f:
        json.dump(processed_uniques[:5], f, indent=2)

if __name__ == '__main__':
    parse_items()
