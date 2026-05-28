import type { CharacterClass } from '../types';

export interface ClassBaseStats {
  strength: number;
  dexterity: number;
  vitality: number;
  energy: number;
  baseLife: number;
  baseMana: number;
  baseStamina: number;
  lifePerLevel: number;
  manaPerLevel: number;
  staminaPerLevel: number;
  lifePerVit: number;
  manaPerEng: number;
  staminaPerVit: number;
}

export const CLASS_STATS: Record<CharacterClass, ClassBaseStats> = {
  Amazon: { strength: 20, dexterity: 25, vitality: 20, energy: 15, baseLife: 50, baseMana: 15, baseStamina: 84, lifePerLevel: 2, manaPerLevel: 1.5, staminaPerLevel: 1, lifePerVit: 3, manaPerEng: 1.5, staminaPerVit: 1 },
  Assassin: { strength: 20, dexterity: 20, vitality: 20, energy: 25, baseLife: 50, baseMana: 25, baseStamina: 95, lifePerLevel: 2, manaPerLevel: 1.5, staminaPerLevel: 1.25, lifePerVit: 3, manaPerEng: 1.75, staminaPerVit: 1.25 },
  Necromancer: { strength: 15, dexterity: 25, vitality: 15, energy: 25, baseLife: 45, baseMana: 25, baseStamina: 79, lifePerLevel: 1.5, manaPerLevel: 2, staminaPerLevel: 1, lifePerVit: 2, manaPerEng: 2, staminaPerVit: 1 },
  Barbarian: { strength: 30, dexterity: 20, vitality: 25, energy: 10, baseLife: 55, baseMana: 10, baseStamina: 92, lifePerLevel: 2, manaPerLevel: 1, staminaPerLevel: 1, lifePerVit: 4, manaPerEng: 1, staminaPerVit: 1 },
  Paladin: { strength: 25, dexterity: 20, vitality: 25, energy: 15, baseLife: 55, baseMana: 15, baseStamina: 89, lifePerLevel: 2, manaPerLevel: 1.5, staminaPerLevel: 1, lifePerVit: 3, manaPerEng: 1.5, staminaPerVit: 1 },
  Sorceress: { strength: 10, dexterity: 25, vitality: 10, energy: 35, baseLife: 40, baseMana: 35, baseStamina: 74, lifePerLevel: 1, manaPerLevel: 2, staminaPerLevel: 1, lifePerVit: 2, manaPerEng: 2, staminaPerVit: 1 },
  Druid: { strength: 15, dexterity: 20, vitality: 25, energy: 20, baseLife: 55, baseMana: 20, baseStamina: 84, lifePerLevel: 1.5, manaPerLevel: 2, staminaPerLevel: 1, lifePerVit: 2, manaPerEng: 2, staminaPerVit: 1 }
};
