export type SkillTab = 'Traps' | 'Shadow Disciplines' | 'Martial Arts';

export interface Skill {
  id: string;
  name: string;
  tab: SkillTab;
  row: number;
  col: number;
  maxLevel: number;
  reqLevel: number;
  dependencies: string[];
  description: string;
  synergies?: {
    skillId: string;
    description: string;
    valuePerLevel: number;
    type: 'damage' | 'duration' | 'other';
  }[];
}

export type ItemRarity = 'Normal' | 'Magic' | 'Rare' | 'Unique' | 'Set' | 'Crafted';

export interface Stat {
  id: string;
  name: string;
  value: number;
  type: 'flat' | 'percentage';
}

export interface Item {
  id: string;
  name: string;
  baseType: string;
  rarity: ItemRarity;
  width: number;
  height: number;
  stats: Stat[];
  requiredLevel: number;
  isCorrupted?: boolean;
  corruptionStat?: Stat;
}

export interface CharacterStats {
  life: number;
  mana: number;
  stamina: number;
  defense: number;
  fcr: number;
  fhr: number;
  ias: number;
  fbr: number;
  resistances: {
    fire: number;
    cold: number;
    lightning: number;
    poison: number;
  };
}
