#!/usr/bin/env python3
"""
Import unique items from Project Diablo 2 wiki All Items page
Parses the wiki HTML and extracts all unique item data with their properties
"""

import re
import json
from typing import List, Dict, Optional, Tuple
from urllib.request import urlopen, Request

def fetch_wiki_page() -> str:
    """Fetch the All Items wiki page"""
    print("Fetching wiki page...")
    try:
        url = "https://wiki.projectdiablo2.com/wiki/All_Items"
        req = Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        with urlopen(req, timeout=30) as response:
            return response.read().decode('utf-8')
    except Exception as e:
        print(f"Error fetching page: {e}")
        return ""

def get_item_type_from_base(base_type: str) -> Optional[str]:
    """Convert base type to item slot type"""
    base_type = base_type.lower().strip()
    
    # Armor pieces
    if any(x in base_type for x in ['helm', 'cap', 'crown', 'mask', 'circlet', 'tiara', 'bonnet']):
        return 'Helm'
    if any(x in base_type for x in ['armor', 'breast', 'robe', 'coat', 'tunic', 'leather', 'plate']):
        return 'Body Armor'
    if any(x in base_type for x in ['glove', 'gauntlet', 'mitt', 'claw']):
        return 'Gloves'
    if any(x in base_type for x in ['boot', 'greave']):
        return 'Boots'
    if any(x in base_type for x in ['belt', 'girdle', 'sash', 'cinch']):
        return 'Belt'
    if any(x in base_type for x in ['amulet']):
        return 'Amulet'
    if any(x in base_type for x in ['ring']):
        return 'Ring'
    
    # Weapons
    if any(x in base_type for x in ['sword', 'axe', 'bow', 'hammer', 'mace', 'spear', 'staff', 'wand', 'pike', 'polearm', 'club', 'maul', 'scimitar', 'dagger', 'claw']):
        return 'Weapon'
    if any(x in base_type for x in ['shield', 'buckler', 'kite']):
        return 'Offhand'
    
    return None

def get_dimensions_for_type(slot_type: str) -> Tuple[int, int]:
    """Get default inventory dimensions for item type"""
    dims = {
        'Helm': (2, 2),
        'Body Armor': (2, 3),
        'Gloves': (2, 2),
        'Boots': (2, 2),
        'Belt': (2, 1),
        'Amulet': (1, 1),
        'Ring': (1, 1),
        'Weapon': (2, 3),
        'Offhand': (2, 3),
    }
    return dims.get(slot_type, (2, 2))

def parse_stat_text(stat_text: str) -> Dict:
    """Parse a stat text into id, name, value, and type"""
    # Remove HTML tags
    stat_text = re.sub(r'<[^>]+>', '', stat_text).strip()
    
    # Try to extract numeric value
    value = 0
    stat_type = 'flat'
    
    # Check for percentage
    if '%' in stat_text:
        stat_type = 'percentage'
        match = re.search(r'(\d+(?:\.\d+)?)\s*%', stat_text)
        if match:
            value = float(match.group(1))
    else:
        # Look for flat numbers
        match = re.search(r'(\d+(?:\.\d+)?)', stat_text)
        if match:
            value = float(match.group(1))
    
    # Create ID from stat name
    stat_id = re.sub(r'[^a-z0-9_]', '_', stat_text.lower()[:30])
    
    return {
        'id': stat_id,
        'name': stat_text,
        'value': int(value) if value == int(value) else value,
        'type': stat_type,
    }

def extract_unique_items(html: str) -> List[Dict]:
    """Extract unique items from wiki HTML"""
    unique_items = []
    
    # Find all h4 headings with unique item names (they have class d2-gold)
    item_pattern = r'<h4[^>]*id="([^"]+)"[^>]*><span[^>]*class="d2-gold"[^>]*>([^<]+)</span>'
    
    for match in re.finditer(item_pattern, html):
        item_id = match.group(1)
        item_name = match.group(2).strip()
        
        # Get content after the heading until the next h4
        start = match.end()
        next_h4 = re.search(r'<h4', html[start:])
        if next_h4:
            end = start + next_h4.start()
        else:
            end = start + 5000  # Look ahead a reasonable distance
        
        item_content = html[start:end]
        
        # Extract base type from item-info-box
        base_match = re.search(r'<div class="item-info-box">.*?<p><b>([^<]+)</b></p>', item_content, re.DOTALL)
        base_type = base_match.group(1).strip() if base_match else None
        
        if not base_type:
            continue
        
        slot_type = get_item_type_from_base(base_type)
        if not slot_type:
            continue
        
        # Extract required level
        level_match = re.search(r'<b>Required Level:</b>\s*(\d+)', item_content)
        required_level = int(level_match.group(1)) if level_match else 1
        
        # Extract stats
        stats = []
        
        # Get stats from the "After" column (with nmod class)
        stat_pattern = r'<td><span class="nmod">([^<]+)</span>'
        for stat_match in re.finditer(stat_pattern, item_content):
            stat_text = stat_match.group(1).strip()
            if stat_text and len(stat_text) > 2:
                stats.append(parse_stat_text(stat_text))
        
        # Get regular stats without nmod (unchanged stats)
        stat_pattern2 = r'<td>([^<]*?[^\s<][^<]*?(?:<a[^>]*>[^<]+</a>[^<]*)*)</td>\s*</tr>'
        found_stats = set()
        for stat_match in re.finditer(stat_pattern2, item_content):
            stat_text = stat_match.group(1).strip()
            # Remove HTML tags
            stat_text = re.sub(r'<[^>]+>', '', stat_text).strip()
            if stat_text and len(stat_text) > 3 and 'Chance to Cast' not in stat_text:
                stat_key = stat_text.lower()
                if stat_key not in found_stats:
                    stats.append(parse_stat_text(stat_text))
                    found_stats.add(stat_key)
        
        # Also get stats from the info box
        info_box_stats = re.findall(r'<li><p><b>([^:]+):</b>\s*([^<]+)</p></li>', item_content)
        for stat_name, stat_value in info_box_stats:
            if 'Base' in stat_name:  # Skip base stats, we want the modified ones
                continue
            combined = f"{stat_name}: {stat_value}".strip()
            if combined and len(combined) > 3:
                stats.append(parse_stat_text(combined))
        
        # Get dimensions
        width, height = get_dimensions_for_type(slot_type)
        
        unique_items.append({
            'id': re.sub(r'[^a-z0-9_]', '_', item_id.lower()),
            'name': item_name,
            'baseType': base_type,
            'slotType': slot_type,
            'rarity': 'Unique',
            'width': width,
            'height': height,
            'requiredLevel': required_level,
            'stats': stats[:15],  # Limit to 15 stats
        })
    
    return unique_items

def generate_unique_items_code(unique_items: List[Dict]) -> str:
    """Generate TypeScript code for unique items"""
    
    items_code = []
    for item in unique_items:
        stats_code = []
        for stat in item['stats']:
            stats_code.append(
                f"      {{ id: '{stat['id']}', name: '{stat['name'].replace(\"'\", \"\\\\'\")}',"
                f" value: {stat['value']}, type: '{stat['type']}' }}"
            )
        
        stats_str = ',\n'.join(stats_code) if stats_code else ''
        
        items_code.append(f"""  {{
    id: '{item['id']}',
    name: '{item['name'].replace("'", "\\'")}',
    baseType: '{item['baseType']}',
    slotType: '{item['slotType']}',
    rarity: 'Unique',
    width: {item['width']},
    height: {item['height']},
    requiredLevel: {item['requiredLevel']},
    stats: [
{stats_str}
    ]
  }},""")
    
    items_str = '\n'.join(items_code)
    
    return f"""export const uniqueItems: Item[] = [
{items_str}
];
"""

def main():
    """Main import function"""
    html = fetch_wiki_page()
    if not html:
        print("Failed to fetch wiki page")
        return
    
    print("Parsing unique items from wiki...")
    unique_items = extract_unique_items(html)
    
    if not unique_items:
        print("No unique items found")
        return
    
    unique_items_sorted = sorted(unique_items, key=lambda x: (x['slotType'], x['name']))
    
    print(f"Found {len(unique_items_sorted)} unique items")
    
    # Generate file content
    file_content = generate_unique_items_code(unique_items_sorted)
    
    # Write to file
    output_path = '/workspaces/project-building/src/data/unique-items.ts'
    with open(output_path, 'w') as f:
        f.write("import type { Item } from '../types';\n\n")
        f.write(file_content)
    
    print(f"✓ Imported {len(unique_items_sorted)} unique items to {output_path}")
    
    # Print summary by type
    items_by_type = {}
    for item in unique_items_sorted:
        item_type = item['slotType']
        items_by_type[item_type] = items_by_type.get(item_type, 0) + 1
    
    print("\nUnique items by type:")
    for item_type in sorted(items_by_type.keys()):
        print(f"  {item_type}: {items_by_type[item_type]}")
        # Print first few items of this type
        type_items = [i['name'] for i in unique_items_sorted if i['slotType'] == item_type][:3]
        for item_name in type_items:
            print(f"    - {item_name}")

if __name__ == '__main__':
    main()
