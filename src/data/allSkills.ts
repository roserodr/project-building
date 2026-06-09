import { assassinSkills } from './assassinSkills';
import { amazonSkills } from './amazonSkills';
import { sorceressSkills } from './sorceressSkills';
import { necromancerSkills } from './necromancerSkills';
import { paladinSkills } from './paladinSkills';
import { barbarianSkills } from './barbarianSkills';
import { druidSkills } from './druidSkills';
import type { Skill, CharacterClass } from '../types';

export const allSkills: Record<CharacterClass, Skill[]> = {
  Amazon: amazonSkills,
  Assassin: assassinSkills,
  Necromancer: necromancerSkills,
  Barbarian: barbarianSkills,
  Paladin: paladinSkills,
  Sorceress: sorceressSkills,
  Druid: druidSkills
};
