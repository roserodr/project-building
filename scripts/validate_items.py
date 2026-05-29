"""
Validates src/data/projectDiablo2Items.ts against the authoritative game files in
gamedata/pd2data/data/global/excel/.

Checks each unique, set item, and runeword for:
  - Correct name
  - Correct baseType (base item name)
  - Correct slotType
  - Correct requiredLevel
  - Correct width/height
  - Correct stat count and min/max values
"""

import csv
import re
import sys
from collections import defaultdict

EXCEL = 'gamedata/pd2data/data/global/excel'
TS_FILE = 'src/data/projectDiablo2Items.ts'

PROP_DISPLAY_MAP = {
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
}


def read_txt(filename):
    with open(f'{EXCEL}/{filename}', 'r', encoding='utf-8-sig', errors='replace') as f:
        reader = csv.DictReader(f, delimiter='\t')
        return list(reader)


def build_base_items():
    base_by_code = {}
    for item in read_txt('Armor.txt'):
        code = item.get('code')
        if code:
            item['_cat'] = 'Armor'
            base_by_code[code] = item
    for item in read_txt('Weapons.txt'):
        code = item.get('code')
        if code:
            item['_cat'] = 'Weapon'
            base_by_code[code] = item
    for item in read_txt('Misc.txt'):
        code = item.get('code')
        if code:
            item['_cat'] = 'Misc'
            base_by_code[code] = item
    return base_by_code


def get_slot_type(cat, itype):
    if cat == 'Armor':
        return {'helm': 'Helm', 'tors': 'Body Armor', 'glov': 'Gloves',
                'boot': 'Boots', 'belt': 'Belt', 'shld': 'Offhand'}.get(itype, 'Armor')
    if cat == 'Weapon':
        return 'Weapon'
    if cat == 'Misc':
        return {'ring': 'Ring', 'amul': 'Amulet'}.get(itype, 'Misc')
    return 'Unknown'


def extract_stats_from_row(row, prefix='prop', val_prefix='min', max_prefix='max'):
    stats = []
    for i in range(1, 13):
        prop_code = row.get(f'{prefix}{i}', '').strip()
        if not prop_code:
            continue
        min_val = row.get(f'{val_prefix}{i}', '').strip()
        max_val = row.get(f'{max_prefix}{i}', '').strip()
        stats.append({
            'id': re.sub(r'[^a-z0-9_]', '_', prop_code.lower()),
            'prop': prop_code,
            'min': int(min_val) if min_val.lstrip('-').isdigit() else None,
            'max': int(max_val) if max_val.lstrip('-').isdigit() else None,
        })
    return stats


def build_expected_items(base_by_code):
    expected = {}

    # Uniques
    for row in read_txt('UniqueItems.txt'):
        if row.get('enabled', '1') == '0' or not row.get('index'):
            continue
        code = row.get('code', '')
        base = base_by_code.get(code)
        if not base:
            continue
        idx = row['index']
        req_lvl = row.get('lvl req', '1').strip()
        expected[re.sub(r'[^a-z0-9_]', '_', idx.lower())] = {
            'name': idx,
            'baseType': base.get('name', code),
            'slotType': get_slot_type(base['_cat'], base.get('type', '')),
            'requiredLevel': int(req_lvl) if req_lvl.isdigit() else 1,
            'width': int(base.get('invwidth', 1)),
            'height': int(base.get('invheight', 1)),
            'stats': extract_stats_from_row(row),
            'rarity': 'Unique',
        }

    # Set items
    for row in read_txt('SetItems.txt'):
        if not row.get('index'):
            continue
        code = row.get('item', '')
        base = base_by_code.get(code)
        if not base:
            continue
        idx = row['index']
        req_lvl = row.get('lvl req', '1').strip()
        expected[re.sub(r'[^a-z0-9_]', '_', idx.lower())] = {
            'name': idx,
            'baseType': base.get('name', code),
            'slotType': get_slot_type(base['_cat'], base.get('type', '')),
            'requiredLevel': int(req_lvl) if req_lvl.isdigit() else 1,
            'width': int(base.get('invwidth', 1)),
            'height': int(base.get('invheight', 1)),
            'stats': extract_stats_from_row(row),
            'rarity': 'Set',
        }

    # Runewords
    for row in read_txt('Runes.txt'):
        if row.get('complete', '1') == '0' or not row.get('Name'):
            continue
        name = row.get('Rune Name') or row.get('Name')
        t1 = row.get('itype1', '')
        if 'tors' in t1 or 'armo' in t1:
            slot = 'Body Armor'
        elif 'helm' in t1 or 'circ' in t1 or 'phlm' in t1:
            slot = 'Helm'
        elif 'shld' in t1 or 'pala' in t1:
            slot = 'Offhand'
        else:
            slot = 'Weapon'
        stats = extract_stats_from_row(row, prefix='T1Code', val_prefix='T1Min', max_prefix='T1Max')
        expected[re.sub(r'[^a-z0-9_]', '_', name.lower())] = {
            'name': name,
            'baseType': row.get('Name', 'Runeword'),
            'slotType': slot,
            'requiredLevel': 1,
            'width': 2,
            'height': 3,
            'stats': stats,
            'rarity': 'Runeword',
        }

    return expected


def extract_stats_array(line):
    """Extract the stats array content, handling brackets inside stat names."""
    start = line.find('stats: [')
    if start == -1:
        return ''
    start += len('stats: [')
    depth = 1
    i = start
    while i < len(line) and depth > 0:
        if line[i] == '[':
            depth += 1
        elif line[i] == ']':
            depth -= 1
        i += 1
    return line[start:i - 1]


def parse_ts_items():
    """Parse projectDiablo2Items.ts into a dict keyed by item id."""
    with open(TS_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    items = {}
    field_pat = re.compile(
        r"id:\s*'([^']+)'[^}]*?"
        r"name:\s*'((?:[^'\\]|\\.)*)'[^}]*?"
        r"baseType:\s*'((?:[^'\\]|\\.)*)'[^}]*?"
        r"slotType:\s*'([^']*)'[^}]*?"
        r"rarity:\s*'([^']*)'[^}]*?"
        r"width:\s*(\d+)[^}]*?"
        r"height:\s*(\d+)[^}]*?"
        r"requiredLevel:\s*(\d+)"
    )
    stat_pat = re.compile(
        r"\{\s*id:\s*'([^']*)'[^}]*?"
        r"name:\s*'((?:[^'\\]|\\.)*)'[^}]*?"
        r"value:\s*(-?\d+)[^}]*?"
        r"type:\s*'([^']*)'[^}]*?"
        r"(?:min:\s*(-?\d+)[^}]*)?"
        r"(?:max:\s*(-?\d+)[^}]*)?"
        r"\}"
    )

    for line in content.splitlines():
        line = line.strip()
        if not line.startswith('{ id:'):
            continue
        m = field_pat.search(line)
        if not m:
            continue
        item_id, name, base_type, slot_type, rarity, width, height, req_lvl = m.groups()
        stats_str = extract_stats_array(line)
        stats = []
        for sm in stat_pat.finditer(stats_str):
            sid, sname, val, stype, smin, smax = sm.groups()
            stats.append({
                'id': sid,
                'name': sname,
                'value': int(val),
                'type': stype,
                'min': int(smin) if smin is not None else None,
                'max': int(smax) if smax is not None else None,
            })
        items[item_id] = {
            'name': name.replace("\\'", "'"),
            'baseType': base_type.replace("\\'", "'"),
            'slotType': slot_type,
            'rarity': rarity,
            'width': int(width),
            'height': int(height),
            'requiredLevel': int(req_lvl),
            'stats': stats,
        }
    return items


def compare_items(expected, actual):
    issues = defaultdict(list)
    missing_in_ts = []
    extra_in_ts = []

    for item_id, exp in expected.items():
        if item_id not in actual:
            missing_in_ts.append((item_id, exp['name'], exp['rarity']))
            continue
        act = actual[item_id]
        prefix = f"[{exp['rarity']}] {exp['name']} ({item_id})"

        if act['name'] != exp['name']:
            issues[prefix].append(f"  name: got '{act['name']}', expected '{exp['name']}'")
        if act['baseType'].lower() != exp['baseType'].lower():
            issues[prefix].append(f"  baseType: got '{act['baseType']}', expected '{exp['baseType']}'")
        if act['slotType'] != exp['slotType']:
            issues[prefix].append(f"  slotType: got '{act['slotType']}', expected '{exp['slotType']}'")
        if act['requiredLevel'] != exp['requiredLevel']:
            issues[prefix].append(f"  requiredLevel: got {act['requiredLevel']}, expected {exp['requiredLevel']}")
        if act['width'] != exp['width']:
            issues[prefix].append(f"  width: got {act['width']}, expected {exp['width']}")
        if act['height'] != exp['height']:
            issues[prefix].append(f"  height: got {act['height']}, expected {exp['height']}")

        exp_stats = exp['stats']
        act_stats = act['stats']
        if len(act_stats) != len(exp_stats):
            issues[prefix].append(
                f"  stat count: got {len(act_stats)}, expected {len(exp_stats)} "
                f"(game props: {[s['prop'] for s in exp_stats]})"
            )
        else:
            for i, (es, as_) in enumerate(zip(exp_stats, act_stats)):
                if es['id'] != as_['id']:
                    issues[prefix].append(
                        f"  stat[{i}] id: got '{as_['id']}', expected '{es['id']}' (prop '{es['prop']}')"
                    )
                if es['min'] is not None and as_.get('min') is not None and es['min'] != as_['min']:
                    issues[prefix].append(
                        f"  stat[{i}] '{es['prop']}' min: got {as_['min']}, expected {es['min']}"
                    )
                if es['max'] is not None and as_.get('max') is not None and es['max'] != as_['max']:
                    issues[prefix].append(
                        f"  stat[{i}] '{es['prop']}' max: got {as_['max']}, expected {es['max']}"
                    )

    for item_id, act in actual.items():
        if item_id not in expected:
            extra_in_ts.append((item_id, act['name'], act['rarity']))

    return issues, missing_in_ts, extra_in_ts


RAW_STAT_PAT = re.compile(
    r'^[a-z][a-z0-9_/-]*(?:\s+(?:\+?-?\d+|\[-?\d+-\d+\]))?$'
)

def find_raw_stat_names(actual):
    """Return items that have stats with raw/unrecognized display names."""
    raw_items = {}
    for item_id, item in actual.items():
        raw = []
        for s in item['stats']:
            name = s['name']
            if RAW_STAT_PAT.match(name):
                raw.append((s['id'], name))
        if raw:
            raw_items[item_id] = (item['name'], item['rarity'], raw)
    return raw_items


def main():
    show_raw = '--show-raw-stats' in sys.argv

    print(f"Reading game data from {EXCEL}/...")
    base_by_code = build_base_items()
    print(f"  Loaded {len(base_by_code)} base items")

    expected = build_expected_items(base_by_code)
    print(f"  Loaded {len(expected)} expected items from game files")

    print(f"\nParsing {TS_FILE}...")
    actual = parse_ts_items()
    print(f"  Parsed {len(actual)} items from TypeScript file")

    print("\nComparing...\n")
    issues, missing, extra = compare_items(expected, actual)

    if issues:
        print(f"=== INCORRECT ITEMS ({len(issues)} items with issues) ===")
        for item_label, item_issues in sorted(issues.items()):
            print(f"\n{item_label}")
            for issue in item_issues:
                print(issue)
    else:
        print("=== All items match game data ===")

    if missing:
        print(f"\n=== MISSING FROM TS ({len(missing)} items) ===")
        for item_id, name, rarity in sorted(missing, key=lambda x: x[2]):
            print(f"  [{rarity}] {name} ({item_id})")

    if extra:
        print(f"\n=== EXTRA IN TS (not in game files) ({len(extra)} items) ===")
        for item_id, name, rarity in sorted(extra, key=lambda x: x[2]):
            print(f"  [{rarity}] {name} ({item_id})")

    # Always show raw stat summary; full list only with --show-raw-stats
    raw_items = find_raw_stat_names(actual)
    total_raw_stats = sum(len(v[2]) for v in raw_items.values())
    print(f"\n=== RAW/UNRECOGNIZED STAT NAMES ===")
    print(f"  {len(raw_items)} items have {total_raw_stats} stats with raw prop-code names.")
    if show_raw:
        for item_id, (name, rarity, raw) in sorted(raw_items.items()):
            print(f"\n  [{rarity}] {name}")
            for sid, sname in raw:
                print(f"    {sid}: {sname!r}")
    else:
        print("  Run with --show-raw-stats to list them.")

    total_issues = len(issues) + len(missing) + len(extra)
    print(f"\nSummary: {len(issues)} field mismatches, "
          f"{len(missing)} missing from TS, {len(extra)} extra in TS, "
          f"{len(raw_items)} items with raw stat names")
    if total_issues > 0:
        sys.exit(1)


if __name__ == '__main__':
    main()
