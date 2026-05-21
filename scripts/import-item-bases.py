#!/usr/bin/env python3
from __future__ import annotations
import json
import re
from collections import OrderedDict
from html import unescape
from pathlib import Path

import requests

WIKI_URL = 'https://wiki.projectdiablo2.com/wiki/Item_Bases'
OUTPUT_PATH = Path(__file__).resolve().parents[1] / 'src' / 'data' / 'itemBases.ts'

TABLE_CONFIG = {
    'Base Damage': {
        'category': 'Weapon',
        'fields': ['name', 'damageBefore', 'damageAfter', 'damagePct', 'damageAvg'],
        'group_size': 5,
    },
    'Base Weapon Speed Modifiers': {
        'category': 'Weapon',
        'fields': ['name', 'speedBefore', 'speedAfter'],
        'group_size': 3,
    },
    'Base Melee Ranges': {
        'category': 'Weapon',
        'fields': ['name', 'meleeRangeBefore', 'meleeRangeAfter'],
        'group_size': 3,
    },
    'Required Strength and Dexterity': {
        'category': 'Weapon',
        'fields': ['name', 'requiredStrength', 'requiredDexterity'],
        'group_size': 3,
    },
    'Base Defense & Required Strength': {
        'category': 'Armor',
        'fields': ['name', 'defenseBefore', 'defenseAfter', 'defensePct', 'requiredStrength'],
        'group_size': 5,
    },
    'Base Block Chance': {
        'category': 'Shield',
        'fields': ['name', 'blockChanceBefore', 'blockChanceAfter'],
        'group_size': 3,
    },
    'Maximum Sockets for Weapons': {
        'category': 'Weapon',
        'fields': ['name', 'socketsBefore', 'socketsAfter'],
        'group_size': 3,
    },
    'Maximum Sockets for Armor': {
        'category': 'Armor',
        'fields': ['name', 'socketsBefore', 'socketsAfter'],
        'group_size': 3,
    },
    'Maximum Sockets for Quivers': {
        'category': 'Quiver',
        'fields': ['name', 'socketsBefore', 'socketsAfter'],
        'group_size': 3,
    },
    'Base Durability for Weapons': {
        'category': 'Weapon',
        'fields': ['name', 'durabilityBefore', 'durabilityAfter'],
        'group_size': 3,
    },
    'Base Durability for Armor': {
        'category': 'Armor',
        'fields': ['name', 'durability'],
        'group_size': 2,
    },
    'Required Levels for Weapons': {
        'category': 'Weapon',
        'fields': ['name', 'requiredLevel'],
        'group_size': 2,
    },
    'Required Levels for Armor': {
        'category': 'Armor',
        'fields': ['name', 'requiredLevel'],
        'group_size': 2,
    },
    'Required Levels for Quivers': {
        'category': 'Quiver',
        'fields': ['name', 'requiredLevel'],
        'group_size': 2,
    },
    'Weapon qlvls': {
        'category': 'Weapon',
        'fields': ['name', 'qlvl'],
        'group_size': 2,
    },
    'Armor qlvls': {
        'category': 'Armor',
        'fields': ['name', 'qlvl'],
        'group_size': 2,
    },
    'Other qlvs': {
        'category': 'Misc',
        'fields': ['name', 'qlvl'],
        'group_size': 2,
    },
}

TIER_NAMES = ['Normal', 'Exceptional', 'Elite']


def clean_text(html: str) -> str:
    text = re.sub(r'<[^>]+>', '', html)
    text = unescape(text)
    return text.strip()


def parse_cells(row_html: str) -> list[str]:
    cell_pattern = re.compile(r'<t[dh]([^>]*)>(.*?)</t[dh]>', re.DOTALL)
    cells: list[str] = []
    for attr, content in cell_pattern.findall(row_html):
        if 'class="mid-column"' in attr or "class='mid-column'" in attr:
            continue
        text = clean_text(content)
        cells.append(text)
    return cells


def row_groups(cells: list[str], group_size: int) -> list[list[str]]:
    return [cells[i:i + group_size] for i in range(0, len(cells), group_size) if len(cells[i:i + group_size]) == group_size]


def ensure_item(items: dict, name: str, category: str, tier: str) -> dict:
    key = name.strip()
    if key not in items:
        items[key] = {
            'id': re.sub(r'[^a-z0-9_]', '_', key.lower()).strip('_'),
            'name': key,
            'category': category,
            'tier': tier,
            'stats': {},
        }
    item = items[key]
    if item['category'] == 'Misc' and category != 'Misc':
        item['category'] = category
    return item


def parse_range(value: str) -> tuple[str, str] | tuple[None, None]:
    match = re.match(r'\s*([0-9]+)\s*-\s*([0-9]+)\s*$', value)
    if match:
        return match.group(1), match.group(2)
    match = re.match(r'\s*([0-9]+)\s*$', value)
    if match:
        return match.group(1), match.group(1)
    return None, None


def add_stat_values(item: dict, key_prefix: str, group: dict):
    if key_prefix == 'sockets':
        if group.get('socketsAfter'):
            item['sockets'] = group['socketsAfter']
        elif group.get('socketsBefore'):
            item['sockets'] = group['socketsBefore']
        return

    if key_prefix == 'qlvl':
        qlvl = group.get('qlvl')
        if qlvl:
            item['qlvl'] = qlvl
        return

    for key, value in group.items():
        if key == 'name' or not value:
            continue

        if key == 'damagePct':
            continue

        if key.endswith('Before'):
            after_key = key[:-6] + 'After'
            if group.get(after_key):
                continue
            normalized_key = key[:-6]
        elif key.endswith('After'):
            normalized_key = key[:-5]
        else:
            normalized_key = key

        if normalized_key == 'damage':
            damage_min, damage_max = parse_range(value)
            if damage_min is not None:
                item['stats']['damageMin'] = damage_min
            if damage_max is not None:
                item['stats']['damageMax'] = damage_max
            continue

        if normalized_key == 'defense':
            defense_min, defense_max = parse_range(value)
            if defense_min is not None:
                item['stats']['defenseMin'] = defense_min
            if defense_max is not None:
                item['stats']['defenseMax'] = defense_max
            continue

        item['stats'][normalized_key] = value


def parse_table(table_html: str, caption: str, items: dict) -> None:
    config = TABLE_CONFIG.get(caption)
    if not config:
        return

    rows = re.findall(r'<tr[^>]*>(.*?)</tr>', table_html, re.DOTALL)

    for row in rows:
        cells = parse_cells(row)
        if not cells:
            continue
        if cells[0].lower().startswith('item ('):
            continue

        for group_index, group_cells in enumerate(row_groups(cells, config['group_size'])):
            group = dict(zip(config['fields'], group_cells))
            name = group.get('name')
            if not name:
                continue
            tier = TIER_NAMES[group_index] if len(row_groups(cells, config['group_size'])) == 3 else 'Any'
            item = ensure_item(items, name, config['category'], tier)
            add_stat_values(item, config['fields'][1] if len(config['fields']) == 2 else config['fields'][1].split('Before')[0], group)


def fetch_wiki_html() -> str:
    response = requests.get(WIKI_URL, headers={'User-Agent': 'Mozilla/5.0'}, timeout=30)
    response.raise_for_status()
    return response.text


def build_item_bases(html: str) -> list[dict]:
    table_pattern = re.compile(r'<table[^>]*>(.*?)</table>', re.DOTALL)
    tables = table_pattern.findall(html)
    caption_pattern = re.compile(r'<caption>(.*?)</caption>', re.DOTALL)

    items: dict[str, dict] = OrderedDict()

    for table_html in tables:
        caption_match = caption_pattern.search(table_html)
        caption = clean_text(caption_match.group(1)) if caption_match else ''
        parse_table(table_html, caption, items)

    return list(items.values())


def generate_ts(items: list[dict]) -> str:
    header = '''export interface WikiItemBase {
  id: string;
  name: string;
  category: string;
  tier: 'Normal' | 'Exceptional' | 'Elite' | 'Any';
  stats: Record<string, string>;
  sockets?: string;
  qlvl?: string;
}

'''
    body = json.dumps(items, indent=2, ensure_ascii=False)
    return header + 'export const wikiItemBases: WikiItemBase[] = ' + body + ';\n'


def main() -> None:
    print('Fetching item bases wiki HTML...')
    html = fetch_wiki_html()
    print('Parsing item bases...')
    items = build_item_bases(html)
    print(f'Found {len(items)} item bases')
    OUTPUT_PATH.write_text(generate_ts(items), encoding='utf-8')
    print(f'Wrote {OUTPUT_PATH}')


if __name__ == '__main__':
    main()
