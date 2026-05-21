import type { Item, Stat } from '../types';

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
  { name: 'Shako', type: 'Helm', width: 2, height: 2 },
  { name: 'Quilted Armor', type: 'Body Armor', width: 2, height: 3 },
  { name: 'Greater Talons', type: 'Weapon', width: 2, height: 3 },
  { name: 'Amulet', type: 'Amulet', width: 1, height: 1 },
];

export const iconicUniques: Item[] = [
  {
    id: 'bartucs',
    name: "Bartuc's Cut-Throat",
    baseType: 'Greater Talons',
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
