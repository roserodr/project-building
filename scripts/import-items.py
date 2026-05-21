#!/usr/bin/env python3
"""
Import unique, set, and runeword items from the Project Diablo 2 wiki All Items page.
This script writes a generated TypeScript file with categorized wiki items.
"""

import html
import re
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from urllib.request import Request, urlopen

WIKI_URL = "https://wiki.projectdiablo2.com/wiki/All_Items"
OUTPUT_FILE = Path(__file__).resolve().parent.parent / "src" / "data" / "projectDiablo2Items.ts"

DEFAULT_DIMENSIONS: Dict[str, Tuple[int, int]] = {
    'Helm': (2, 2),
    'Body Armor': (2, 3),
    'Gloves': (2, 2),
    'Boots': (2, 2),
    'Belt': (2, 1),
    'Amulet': (1, 1),
    'Ring': (1, 1),
    'Weapon': (2, 3),
    'Offhand': (2, 3),
    'Chest': (2, 3),
}

EXCLUDE_STAT_TEXT = [
    'Before', 'After', 'Note:', 'Image', 'Stats', 'Base Defense', 'Base Durability',
    'Base Maximum Sockets', 'Base Damage', 'Base Speed Modifier', 'Base Block',
    'Base Potion Rows', 'Base Maximum Sockets', 'Required Strength',
    'Required Dexterity', 'Required Level', 'Minimum Item Level', 'Occurrence Rate',
]


def fetch_wiki_html() -> str:
    req = Request(WIKI_URL, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    })
    with urlopen(req, timeout=30) as response:
        return response.read().decode('utf-8')


def clean_text(value: str) -> str:
    text = re.sub(r'<[^>]+>', '', value)
    text = html.unescape(text)
    return re.sub(r'\s+', ' ', text).strip()


def get_item_slot_type(base_type: Optional[str]) -> Optional[str]:
    if not base_type:
        return None
    text = base_type.lower()
    if any(x in text for x in ['helm', 'cap', 'circlet', 'tiara', 'bonnet', 'mask']):
        return 'Helm'
    if any(x in text for x in ['armor', 'breast', 'robe', 'tunic', 'coat', 'plate', 'mail', 'scale', 'chain', 'leather']):
        return 'Body Armor'
    if any(x in text for x in ['glove', 'gauntlet', 'mitt', 'fist', 'claw']):
        return 'Gloves'
    if any(x in text for x in ['boot', 'greave', 'sandal']):
        return 'Boots'
    if any(x in text for x in ['belt', 'girdle', 'sash', 'cinch']):
        return 'Belt'
    if 'amulet' in text:
        return 'Amulet'
    if 'ring' in text:
        return 'Ring'
    if any(x in text for x in ['shield', 'buckler', 'tower shield', 'pavise']):
        return 'Offhand'
    if any(x in text for x in ['bow', 'crossbow', 'javelin', 'spear', 'club', 'mace', 'hammer', 'polearm', 'staff', 'wand', 'dagger', 'sword', 'axe', 'blade', 'thresher', 'scimitar', 'claw', 'cestus', 'scepter']):
        return 'Weapon'
    if 'chest' in text:
        return 'Body Armor'
    return None


def dimensions_for(slot_type: Optional[str]) -> Tuple[int, int]:
    if slot_type and slot_type in DEFAULT_DIMENSIONS:
        return DEFAULT_DIMENSIONS[slot_type]
    return (2, 2)


def extract_base_type(item_html: str) -> Optional[str]:
    match = re.search(r'<p>\s*<b>([^<]+)</b>\s*</p>', item_html)
    if match:
        return clean_text(match.group(1))
    return None


def extract_required_level(item_html: str) -> int:
    match = re.search(r'<b>Required Level:</b>\s*([0-9]+)', item_html)
    return int(match.group(1)) if match else 1


STAT_ID_STOPWORDS = {
    'to', 'of', 'and', 'the', 'a', 'an', 'per', 'on', 'when', 'by', 'with', 'in',
    'for', 'is', 'from', 'at', 'as', 'against', 'over', 'under', 'each', 'each',
    'while', 'may', 'be', 'that', 'your', 'this', 'also', 'set', 'complete',
}


def normalize_stat_id(value: str) -> str:
    value = value.lower()
    value = re.sub(r'<[^>]+>', '', value)
    value = re.sub(r'\[[^\]]*\]', '', value)
    value = re.sub(r'\b\d+\s*-\s*\d+\b', '', value)
    value = re.sub(r'[+%]', ' ', value)
    value = re.sub(r'[()\[\]{}]', ' ', value)
    value = re.sub(r'[^a-z0-9]+', ' ', value)
    words = [w for w in value.split() if w not in STAT_ID_STOPWORDS]
    return '_'.join(words).strip('_')


def parse_stat_value(value: str) -> int:
    match = re.search(r'(-?\d+)(?:\.\d+)?', value)
    if not match:
        return 0
    try:
        return int(match.group(1))
    except ValueError:
        return 0


def parse_stat_bounds(stat_text: str) -> Dict[str, Optional[int]]:
    range_match = re.search(r'\[\s*(-?\d+)\s*-\s*(-?\d+)\s*\]', stat_text)
    if not range_match:
        range_match = re.search(r'\b(-?\d+)\s*-\s*(-?\d+)\b', stat_text)
    if range_match:
        try:
            return {
                'min': int(range_match.group(1)),
                'max': int(range_match.group(2)),
            }
        except ValueError:
            return {'min': None, 'max': None}
    number_match = re.search(r'(-?\d+)(?:\.\d+)?', stat_text)
    if number_match:
        try:
            value = int(number_match.group(1))
            return {'min': value, 'max': value}
        except ValueError:
            return {'min': None, 'max': None}
    return {'min': None, 'max': None}


def stat_from_text(stat_text: str) -> Dict:
    stat_text = stat_text.strip()
    stat_id = normalize_stat_id(stat_text)
    stat_type = 'percentage' if '%' in stat_text else 'flat'
    bounds = parse_stat_bounds(stat_text)
    stat_value = bounds['min'] if bounds['min'] is not None else 0
    return {
        'id': stat_id or 'stat',
        'name': stat_text,
        'value': stat_value,
        'type': stat_type,
        'min': bounds['min'],
        'max': bounds['max'],
    }


def extract_stats(item_html: str) -> List[Dict]:
    stats: List[Dict] = []
    table_match = re.search(r'<table[^>]*class="[^"]*wikitable[^"]*wikitable-2col[^"]*"[^>]*>(.*?)</table>', item_html, flags=re.DOTALL | re.IGNORECASE)
    if not table_match:
        return stats
    table_html = table_match.group(1)
    for row_match in re.finditer(r'<tr[^>]*>(.*?)</tr>', table_html, flags=re.DOTALL | re.IGNORECASE):
        row_html = row_match.group(1)
        cells = re.findall(r'<td[^>]*>(.*?)</td>', row_html, flags=re.DOTALL | re.IGNORECASE)
        if not cells:
            continue
        stat_cell = clean_text(cells[-1])
        if not stat_cell or any(ex.lower() in stat_cell.lower() for ex in EXCLUDE_STAT_TEXT):
            continue
        stat_obj = stat_from_text(stat_cell)
        if all(existing['id'] != stat_obj['id'] for existing in stats):
            stats.append(stat_obj)
    return stats


def extract_colored_items(html_text: str, color_class: str, rarity: str) -> List[Dict]:
    pattern = re.compile(
        r'<div class="mw-heading mw-heading4"><h4[^>]*id="([^"]+)"[^>]*>\s*(?:<span[^>]*class="' + re.escape(color_class) + r'"[^>]*>)?([^<]+)(?:</span>)?\s*</h4>',
        flags=re.IGNORECASE,
    )

    items: List[Dict] = []
    positions = list(pattern.finditer(html_text))
    for idx, match in enumerate(positions):
        item_id = match.group(1)
        item_name = clean_text(match.group(2))
        start = match.end()
        end = positions[idx + 1].start() if idx + 1 < len(positions) else len(html_text)
        item_html = html_text[start:end]
        base_type = extract_base_type(item_html)
        slot_type = get_item_slot_type(base_type)
        width, height = dimensions_for(slot_type)
        required_level = extract_required_level(item_html)
        stats = extract_stats(item_html)
        if slot_type:
            items.append({
                'id': re.sub(r'[^a-z0-9_]', '_', item_id.lower()),
                'name': item_name,
                'baseType': base_type or item_name,
                'slotType': slot_type,
                'rarity': rarity,
                'width': width,
                'height': height,
                'requiredLevel': required_level,
                'stats': stats,
            })
    return items


def extract_runeword_items(html_text: str) -> List[Dict]:
    sections = re.split(r'<div class="mw-heading mw-heading1"><h1 id="Runeword_[^"]+">', html_text)
    items: List[Dict] = []
    if len(sections) < 2:
        return items
    runeword_html = ''.join(sections[1:])
    pattern = re.compile(
        r'<div class="mw-heading mw-heading3"><h3[^>]*>\s*(?:<span[^>]*>)?([^<]+)(?:</span>)?\s*</h3>',
        flags=re.IGNORECASE,
    )
    positions = list(pattern.finditer(runeword_html))
    for idx, match in enumerate(positions):
        item_name = clean_text(match.group(1))
        start = match.end()
        end = positions[idx + 1].start() if idx + 1 < len(positions) else len(runeword_html)
        item_html = runeword_html[start:end]
        base_type = extract_base_type(item_html)
        if not base_type:
            # Some runewords use a single heading like "2-Socket Helms"
            fallback = re.search(r'<p>\s*<b>([0-9]+-Socket [^<]+)</b>\s*</p>', item_html)
            base_type = clean_text(fallback.group(1)) if fallback else None
        if base_type and base_type.lower().endswith('s'):
            base_type = base_type[:-1]
        slot_type = get_item_slot_type(base_type)
        width, height = dimensions_for(slot_type)
        required_level = extract_required_level(item_html)
        stats = extract_stats(item_html)
        if slot_type:
            items.append({
                'id': re.sub(r'[^a-z0-9_]', '_', item_name.lower()),
                'name': item_name,
                'baseType': base_type or item_name,
                'slotType': slot_type,
                'rarity': 'Runeword',
                'width': width,
                'height': height,
                'requiredLevel': required_level,
                'stats': stats,
            })
    return items


def serialize_stat(stat: Dict) -> str:
    name = stat['name'].replace("'", "\\'")
    parts = [
        "id: '%s'" % stat['id'],
        "name: '%s'" % name,
        "value: %s" % stat['value'],
        "type: '%s'" % stat['type'],
    ]
    if stat.get('min') is not None:
        parts.append('min: %s' % stat['min'])
    if stat.get('max') is not None:
        parts.append('max: %s' % stat['max'])
    return '{ %s }' % (', '.join(parts))


def format_ts_array(items: List[Dict], array_name: str) -> str:
    rows = []
    for item in items:
        name = item['name'].replace("'", "\\'")
        base_type = (item['baseType'] or item['name']).replace("'", "\\'")
        stats = item.get('stats', [])
        stats_text = ', '.join(serialize_stat(stat) for stat in stats)
        rows.append(
            "  { id: '%s', name: '%s', baseType: '%s', slotType: '%s', rarity: '%s', width: %s, height: %s, requiredLevel: %s, stats: [%s] }," % (
                item['id'], name, base_type, item['slotType'], item['rarity'], item['width'], item['height'], item['requiredLevel'], stats_text
            )
        )
    return f"export const {array_name}: Item[] = [\n" + "\n".join(rows) + "\n];\n"


def generate_output(unique_items: List[Dict], set_items: List[Dict], runeword_items: List[Dict]) -> str:
    return f"""import type {{ Item, Stat }} from '../types';

export const wikiUniqueItems: Item[] = [
{''.join(format_ts_array(unique_items, 'wikiUniqueItems').splitlines(True)[1:-1])}\n];

export const wikiSetItems: Item[] = [
{''.join(format_ts_array(set_items, 'wikiSetItems').splitlines(True)[1:-1])}\n];

export const wikiRunewordItems: Item[] = [
{''.join(format_ts_array(runeword_items, 'wikiRunewordItems').splitlines(True)[1:-1])}\n];
"""


def main() -> None:
    print('Fetching wiki HTML...')
    html_text = fetch_wiki_html()
    print('Extracting unique items...')
    unique_items = extract_colored_items(html_text, 'd2-gold', 'Unique')
    print('Extracting set items...')
    set_items = extract_colored_items(html_text, 'd2-green', 'Set')
    print('Extracting runeword items...')
    runeword_items = extract_runeword_items(html_text)

    print(f'Found {len(unique_items)} unique items')
    print(f'Found {len(set_items)} set items')
    print(f'Found {len(runeword_items)} runeword items')

    output = generate_output(unique_items, set_items, runeword_items)
    OUTPUT_FILE.write_text(output, encoding='utf-8')
    print(f'Wrote {OUTPUT_FILE}')


if __name__ == '__main__':
    main()
