import type { Item, Stat, CharacterStats, Skill } from '../types';

export const FCR_BREAKPOINTS = [0, 8, 16, 27, 42, 65, 102, 174];
export const FHR_BREAKPOINTS = [0, 7, 15, 27, 48, 86, 200];

export const getFrameFromBreakpoints = (totalValue: number, breakpoints: number[]) => {
  const index = breakpoints.findIndex((bp, i) => totalValue >= bp && (i === breakpoints.length - 1 || totalValue < breakpoints[i+1]));
  return index === -1 ? 0 : index;
};

export const getSkillLevel = (skillId: string, skillPoints: Record<string, number>, equipment: Record<string, Item>) => {
  let level = skillPoints[skillId] || 0;
  if (level === 0) return 0;

  Object.values(equipment).forEach(item => {
    item.stats.forEach(stat => {
      if (stat.id === 'all_skills' || stat.id === 'assassin_skills') {
        level += stat.value;
      }
    });
    if (item.corruptionStat?.id === 'all_skills') {
        level += item.corruptionStat.value;
    }
  });

  return level;
};

export const calculateSkillDamage = (skill: Skill, skillPoints: Record<string, number>, equipment: Record<string, Item>) => {
    const totalLevel = getSkillLevel(skill.id, skillPoints, equipment);
    if (totalLevel === 0) return { min: 0, max: 0 };

    let baseMin = 10 + totalLevel * 5;
    let baseMax = 20 + totalLevel * 10;

    let totalSynergyMultiplier = 0;

    if (skill.synergies) {
        skill.synergies.forEach(syn => {
            const synPoints = skillPoints[syn.skillId] || 0;
            if (syn.type === 'damage') {
                totalSynergyMultiplier += (synPoints * syn.valuePerLevel);
            }
        });
    }

    const finalMultiplier = 1 + (totalSynergyMultiplier / 100);

    return {
        min: Math.floor(baseMin * finalMultiplier),
        max: Math.floor(baseMax * finalMultiplier)
    };
};

export const calculateCharacterStats = (
  level: number,
  baseStats: { str: number; dex: number; vit: number; enr: number },
  equipment: Record<string, Item>,
  charms: Item[]
): CharacterStats => {
  let life = 50 + (level - 1) * 2 + baseStats.vit * 3;
  let mana = 25 + (level - 1) * 1.5 + baseStats.enr * 1.5;
  let stamina = 95 + baseStats.vit * 1.25;

  let fcr = 0;
  let fhr = 0;
  let ias = 0;
  let fbr = 0;

  let res = { fire: 0, cold: 0, lightning: 0, poison: 0 };
  let defense = 0;

  const processStat = (stat: Stat) => {
    switch (stat.id) {
      case 'life': life += stat.value; break;
      case 'mana': mana += stat.value; break;
      case 'fcr': fcr += stat.value; break;
      case 'fhr': fhr += stat.value; break;
      case 'ias': ias += stat.value; break;
      case 'fbr': fbr += stat.value; break;
      case 'fire_res': res.fire += stat.value; break;
      case 'cold_res': res.cold += stat.value; break;
      case 'lightning_res': res.lightning += stat.value; break;
      case 'poison_res': res.poison += stat.value; break;
      case 'all_res':
        res.fire += stat.value;
        res.cold += stat.value;
        res.lightning += stat.value;
        res.poison += stat.value;
        break;
      case 'defense': defense += stat.value; break;
      case 'life_per_level': life += stat.value * level; break;
      case 'mana_per_level': mana += stat.value * level; break;
    }
  };

  Object.values(equipment).forEach(item => {
    item.stats.forEach(processStat);
    if (item.corruptionStat) processStat(item.corruptionStat);
  });

  charms.forEach(charm => {
    charm.stats.forEach(processStat);
  });

  return {
    life: Math.floor(life),
    mana: Math.floor(mana),
    stamina: Math.floor(stamina),
    defense,
    fcr,
    fhr,
    ias,
    fbr,
    resistances: res
  };
};
