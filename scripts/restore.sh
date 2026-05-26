#!/bin/bash
set -e

# types/index.ts
cat << 'INNEREOF' > src/types/index.ts
export type CharacterClass = 'Amazon' | 'Assassin' | 'Necromancer' | 'Barbarian' | 'Paladin' | 'Sorceress' | 'Druid';

export type SkillTab = string;

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
INNEREOF

# data/classes.ts
cat << 'INNEREOF' > src/data/classes.ts
import type { CharacterClass } from '../types';

export interface ClassStats {
  str: number;
  dex: number;
  vit: number;
  eng: number;
  lifePerVit: number;
  manaPerEng: number;
  lifePerLevel: number;
  manaPerLevel: number;
  staminaPerVit: number;
  staminaPerLevel: number;
  baseLife: number;
  baseMana: number;
  baseStamina: number;
}

export const CLASS_STATS: Record<CharacterClass, ClassStats> = {
  Amazon: {
    str: 20, dex: 25, vit: 20, eng: 15,
    lifePerVit: 3, manaPerEng: 1.5,
    lifePerLevel: 2, manaPerLevel: 1.5,
    staminaPerVit: 1, staminaPerLevel: 1,
    baseLife: 50, baseMana: 15, baseStamina: 84
  },
  Sorceress: {
    str: 10, dex: 25, vit: 10, eng: 35,
    lifePerVit: 2, manaPerEng: 2,
    lifePerLevel: 1, manaPerLevel: 2,
    staminaPerVit: 1, staminaPerLevel: 1,
    baseLife: 40, baseMana: 35, baseStamina: 74
  },
  Necromancer: {
    str: 15, dex: 25, vit: 15, eng: 25,
    lifePerVit: 2, manaPerEng: 2,
    lifePerLevel: 1.5, manaPerLevel: 2,
    staminaPerVit: 1, staminaPerLevel: 1,
    baseLife: 45, baseMana: 25, baseStamina: 79
  },
  Paladin: {
    str: 25, dex: 20, vit: 25, eng: 15,
    lifePerVit: 3, manaPerEng: 1.5,
    lifePerLevel: 2, manaPerLevel: 1.5,
    staminaPerVit: 1, staminaPerLevel: 1,
    baseLife: 55, baseMana: 15, baseStamina: 89
  },
  Barbarian: {
    str: 30, dex: 20, vit: 25, eng: 10,
    lifePerVit: 4, manaPerEng: 1,
    lifePerLevel: 2, manaPerLevel: 1,
    staminaPerVit: 1, staminaPerLevel: 1,
    baseLife: 55, baseMana: 10, baseStamina: 92
  },
  Druid: {
    str: 15, dex: 20, vit: 25, eng: 20,
    lifePerVit: 2, manaPerEng: 2,
    lifePerLevel: 1.5, manaPerLevel: 2,
    staminaPerVit: 1, staminaPerLevel: 1,
    baseLife: 55, baseMana: 20, baseStamina: 84
  },
  Assassin: {
    str: 20, dex: 20, vit: 20, eng: 15,
    lifePerVit: 3, manaPerEng: 1.75,
    lifePerLevel: 2, manaPerLevel: 1.5,
    staminaPerVit: 1.25, staminaPerLevel: 1.25,
    baseLife: 50, baseMana: 25, baseStamina: 95
  }
};
INNEREOF

# data/breakpoints.ts
cat << 'INNEREOF' > src/data/breakpoints.ts
import type { CharacterClass } from '../types';

export interface Breakpoints {
  fcr: { frames: number[]; base: number };
  fhr: { frames: number[]; base: number };
  fbr: { frames: number[]; base: number };
}

export const CLASS_BREAKPOINTS: Record<CharacterClass, Breakpoints> = {
  Amazon: {
    fcr: { base: 19, frames: [0, 7, 14, 22, 32, 48, 68, 99, 152] },
    fhr: { base: 11, frames: [0, 6, 13, 20, 32, 52, 86, 174, 600] },
    fbr: { base: 11, frames: [0, 4, 13, 32, 86, 600] }
  },
  Sorceress: {
    fcr: { base: 13, frames: [0, 9, 20, 37, 63, 105, 200] },
    fhr: { base: 15, frames: [0, 5, 9, 14, 20, 30, 42, 60, 86, 142, 280] },
    fbr: { base: 9, frames: [0, 7, 15, 27, 48, 86, 200] }
  },
  Necromancer: {
    fcr: { base: 15, frames: [0, 9, 18, 30, 48, 75, 125] },
    fhr: { base: 13, frames: [0, 5, 10, 16, 26, 39, 56, 86, 152, 377] },
    fbr: { base: 11, frames: [0, 6, 13, 22, 32, 48, 75, 125] }
  },
  Paladin: {
    fcr: { base: 15, frames: [0, 9, 18, 30, 48, 75, 125] },
    fhr: { base: 9, frames: [0, 7, 15, 27, 48, 86, 200] },
    fbr: { base: 5, frames: [0, 13, 32, 86, 600] }
  },
  Barbarian: {
    fcr: { base: 13, frames: [0, 9, 20, 37, 63, 105, 200] },
    fhr: { base: 9, frames: [0, 7, 15, 27, 48, 86, 200] },
    fbr: { base: 7, frames: [0, 9, 20, 42, 86, 280] }
  },
  Druid: {
    fcr: { base: 18, frames: [0, 4, 10, 19, 30, 46, 68, 99, 163] },
    fhr: { base: 14, frames: [0, 3, 7, 13, 19, 29, 39, 56, 86, 152, 377] },
    fbr: { base: 11, frames: [0, 6, 13, 20, 32, 52, 86, 174, 600] }
  },
  Assassin: {
    fcr: { base: 16, frames: [0, 8, 16, 27, 42, 65, 102, 174] },
    fhr: { base: 9, frames: [0, 7, 15, 27, 48, 86, 200] },
    fbr: { base: 5, frames: [0, 13, 32, 86, 600] }
  }
};
INNEREOF
