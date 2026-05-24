export type SkillTab = 'Traps' | 'Shadow Disciplines' | 'Martial Arts';

export interface Skill {
  id: string;
  iconCel?: string | number;
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
  levelData?: {
    [level: number]: {
      minDamage?: number;
      maxDamage?: number;
    }
  };
}

export type ItemRarity = 'Normal' | 'Magic' | 'Rare' | 'Unique' | 'Set' | 'Crafted' | 'Runeword';

export interface Stat {
  id: string;
  name: string;
  value: number;
  type: 'flat' | 'percentage';
  min?: number;
  max?: number;
}

export interface Item {
  imageFile?: string;
  id: string;
  name: string;
  baseType: string;
  slotType?: string;
  rarity: ItemRarity;
  width: number;
  height: number;
  stats: Stat[];
  requiredLevel: number;
  requiredStrength?: number;
  requiredDexterity?: number;
  defense?: number;
  oneHandDamage?: { min: number; max: number };
  twoHandDamage?: { min: number; max: number };
  missileDamage?: { min: number; max: number };
  durability?: number;
  baseWeaponSpeed?: number;
  blockChance?: number;
  isCorrupted?: boolean;
  corruptionStat?: Stat;
}

export interface CharacterStats {
  life: number;
  mana: number;
  stamina: number;
  defense: number;
  damage: { min: number; max: number };
  fcr: number;
  fhr: number;
  ias: number;
  wsm: number;
  primaryWeaponType: string;
  skillIas: number;
  fbr: number;
  resistances: {
    fire: number;
    cold: number;
    lightning: number;
    poison: number;
  };
}
