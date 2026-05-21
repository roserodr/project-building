/// <reference types="node" />
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface WikiItem {
  name: string;
  type: string;
  width: number;
  height: number;
  requiredLevel?: number;
  rarity?: 'Normal' | 'Magic' | 'Rare' | 'Unique' | 'Set' | 'Crafted';
}

// Mapping of wiki item types to slot types
const typeToSlotMap: Record<string, string> = {
  'Helms': 'Helm',
  'Body Armors': 'Body Armor',
  'Gloves': 'Gloves',
  'Boots': 'Boots',
  'Belts': 'Belt',
  'Amulets': 'Amulet',
  'Rings': 'Ring',
  'Swords': 'Weapon',
  'Axes': 'Weapon',
  'Polearms': 'Weapon',
  'Maces': 'Weapon',
  'Hammers': 'Weapon',
  'Bows': 'Weapon',
  'Crossbows': 'Weapon',
  'Claws': 'Weapon',
  'Staves': 'Weapon',
  'Wands': 'Weapon',
  'Spears': 'Weapon',
  'Shields': 'Offhand',
};

// Default dimensions for different item types
const defaultDimensions: Record<string, { width: number; height: number }> = {
  'Helm': { width: 2, height: 2 },
  'Body Armor': { width: 2, height: 3 },
  'Gloves': { width: 2, height: 2 },
  'Boots': { width: 2, height: 2 },
  'Belt': { width: 2, height: 1 },
  'Amulet': { width: 1, height: 1 },
  'Ring': { width: 1, height: 1 },
  'Weapon': { width: 2, height: 3 },
  'Offhand': { width: 2, height: 3 },
};

async function fetchWikiItems(): Promise<WikiItem[]> {
  try {
    // Fetch the wiki page - Project Diablo 2 wiki all items page
    const response = await fetch('https://wiki.projectdiablo2.com/wiki/All_Items');
    const html = await response.text();

    // Parse the HTML to extract item data
    // This is a simplified parser - the actual structure may need adjustment based on wiki format
    const items: WikiItem[] = [];

    // Extract tables from the HTML
    const tableRegex = /<table[^>]*>[\s\S]*?<\/table>/gi;
    const tables = html.match(tableRegex) || [];

    for (const table of tables) {
      // Extract rows
      const rowRegex = /<tr[^>]*>[\s\S]*?<\/tr>/gi;
      const rows = table.match(rowRegex) || [];

      for (const row of rows) {
        // Extract cells
        const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
        let match;
        const cells: string[] = [];

        while ((match = cellRegex.exec(row)) !== null) {
          // Strip HTML tags and clean whitespace
          const text = match[1]
            .replace(/<[^>]*>/g, '')
            .trim()
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&');
          cells.push(text);
        }

        // Parse if we have enough cells
        if (cells.length >= 2) {
          const itemName = cells[0];
          const itemType = cells[1];
          const slotType = typeToSlotMap[itemType];

          if (slotType && itemName && itemName.length > 0) {
            const dims = defaultDimensions[slotType];
            items.push({
              name: itemName,
              type: itemType,
              width: dims?.width || 1,
              height: dims?.height || 1,
              requiredLevel: 1,
            });
          }
        }
      }
    }

    return items;
  } catch (error) {
    console.error('Error fetching wiki items:', error);
    return [];
  }
}

function generateItemsFile(items: WikiItem[]): string {
  const baseItemsCode = items
    .map(
      (item) =>
        `  { name: '${item.name.replace(/'/g, "\\'")}', type: '${typeToSlotMap[item.type] || item.type}', width: ${item.width}, height: ${item.height} },`
    )
    .join('\n');

  return `import type { Item, Stat } from '../types';

export const possibleCorruptions: Record<string, Stat[]> = {
  'Helm': [
    { id: 'all_skills', name: '+1 to All Skills', value: 1, type: 'flat' },
    { id: 'fhr', name: '20% Faster Hit Recovery', value: 20, type: 'percentage' },
    { id: 'max_life', name: '10% Increase Maximum Life', value: 10, type: 'percentage' },
  ],
  'Body Armor': [
    { id: 'all_skills', name: '+1 to All Skills', value: 1, type: 'flat' },
    { id: 'fhr', name: '24% Faster Hit Recovery', value: 24, type: 'percentage' },
    { id: 'all_res', name: '+15 to All Resistances', value: 15, type: 'flat' },
  ],
  'Amulet': [
    { id: 'all_skills', name: '+1 to All Skills', value: 1, type: 'flat' },
    { id: 'fcr', name: '10% Faster Cast Rate', value: 10, type: 'percentage' },
  ],
  'Weapon': [
    { id: 'ias', name: '20% Increased Attack Speed', value: 20, type: 'percentage' },
    { id: 'ed', name: '50% Enhanced Damage', value: 50, type: 'percentage' },
  ]
};

export const baseItems = [
${baseItemsCode}
];

export const iconicUniques: Item[] = [
  {
    id: 'bartucs',
    name: "Bartuc's Cut-Throat",
    baseType: 'Greater Talons',
    slotType: 'Weapon',
    rarity: 'Unique',
    width: 2,
    height: 3,
    requiredLevel: 42,
    stats: [
      { id: 'assassin_skills', name: '+2 to Assassin Skills', value: 2, type: 'flat' },
      { id: 'ias', name: '30% Increased Attack Speed', value: 30, type: 'percentage' },
      { id: 'str', name: '+20 to Strength', value: 20, type: 'flat' },
      { id: 'dex', name: '+20 to Dexterity', value: 20, type: 'flat' },
    ]
  },
  {
    id: 'shako',
    name: 'Harlequin Crest',
    baseType: 'Shako',
    slotType: 'Helm',
    rarity: 'Unique',
    width: 2,
    height: 2,
    requiredLevel: 62,
    stats: [
      { id: 'all_skills', name: '+2 to All Skills', value: 2, type: 'flat' },
      { id: 'life_per_level', name: '1.5 Life per Level', value: 1.5, type: 'flat' },
    ]
  }
];
`;
}

async function importItems() {
  console.log('Fetching items from Project Diablo 2 wiki...');
  const items = await fetchWikiItems();

  if (items.length === 0) {
    console.warn('No items found. The wiki structure may have changed.');
    console.log('Manual setup required - please check the wiki HTML structure.');
    return;
  }

  console.log(`Found ${items.length} items`);

  // Remove duplicates
  const uniqueItems = Array.from(
    new Map(items.map((item) => [item.name.toLowerCase(), item])).values()
  );

  console.log(`${uniqueItems.length} unique items after deduplication`);

  // Generate the items file
  const fileContent = generateItemsFile(uniqueItems);

  // Write to file
  const filePath = join(__dirname, '../src/data/items.ts');
  writeFileSync(filePath, fileContent, 'utf-8');

  console.log(`✓ Items imported successfully to ${filePath}`);
  console.log(`Total base items: ${uniqueItems.length}`);
}

importItems().catch(console.error);
