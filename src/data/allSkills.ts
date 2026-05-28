import { assassinSkills } from './assassinSkills';
import type { Skill, CharacterClass } from '../types';

export const allSkills: Record<CharacterClass, Skill[]> = {
  Amazon: [],
  Assassin: assassinSkills,
  Necromancer: [],
  Barbarian: [],
  Paladin: [],
  Sorceress: [],
  Druid: []
};
