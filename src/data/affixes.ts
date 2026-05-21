import type { Stat } from '../types';

export const allPossibleAffixes: Stat[] = [
  { id: 'str', name: '+ Strength', value: 0, type: 'flat' },
  { id: 'dex', name: '+ Dexterity', value: 0, type: 'flat' },
  { id: 'vit', name: '+ Vitality', value: 0, type: 'flat' },
  { id: 'enr', name: '+ Energy', value: 0, type: 'flat' },
  { id: 'life', name: '+ Life', value: 0, type: 'flat' },
  { id: 'mana', name: '+ Mana', value: 0, type: 'flat' },
  { id: 'all_res', name: '+ All Resistances', value: 0, type: 'flat' },
  { id: 'fire_res', name: '+ Fire Resistance', value: 0, type: 'flat' },
  { id: 'cold_res', name: '+ Cold Resistance', value: 0, type: 'flat' },
  { id: 'lightning_res', name: '+ Lightning Resistance', value: 0, type: 'flat' },
  { id: 'poison_res', name: '+ Poison Resistance', value: 0, type: 'flat' },
  { id: 'fcr', name: '% Faster Cast Rate', value: 0, type: 'percentage' },
  { id: 'fhr', name: '% Faster Hit Recovery', value: 0, type: 'percentage' },
  { id: 'ias', name: '% Increased Attack Speed', value: 0, type: 'percentage' },
  { id: 'fbr', name: '% Faster Block Rate', value: 0, type: 'percentage' },
  { id: 'all_skills', name: '+ All Skills', value: 0, type: 'flat' },
  { id: 'assassin_skills', name: '+ Assassin Skills', value: 0, type: 'flat' },
  { id: 'defense', name: '+ Defense', value: 0, type: 'flat' },
  { id: 'ed', name: '% Enhanced Damage', value: 0, type: 'percentage' },
];

export const allowedAffixesPerSlot: Record<string, string[]> = {
  Helm: ['all_skills', 'life', 'mana', 'all_res', 'fcr', 'str', 'dex'],
  'Body Armor': ['life', 'all_res', 'defense', 'fhr', 'all_skills'],
  Weapon: ['ed', 'ias', 'str', 'dex', 'assassin_skills'],
  Amulet: ['all_skills', 'fcr', 'life', 'all_res', 'assassin_skills'],
  Ring: ['life', 'mana', 'all_res'],
  Gloves: ['ias', 'fcr', 'str', 'dex'],
  Boots: ['fhr', 'life', 'all_res'],
  Belt: ['life', 'str', 'dex'],
  Misc: allPossibleAffixes.map(a => a.id),
};
