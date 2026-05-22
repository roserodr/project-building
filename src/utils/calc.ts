import type { Item, Stat, CharacterStats, Skill } from '../types';

export const FCR_BREAKPOINTS = [0, 8, 16, 27, 42, 65, 102, 174];
export const FHR_BREAKPOINTS = [0, 7, 15, 27, 48, 86, 200];
export const FBR_BREAKPOINTS = [0, 13, 32, 86];

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
  skillPoints: Record<string, number>,
  equipment: Record<string, Item>,
  charms: Record<string, Item>
): CharacterStats => {
  let life = 50 + (level - 1) * 2 + baseStats.vit * 3;
  let mana = 25 + (level - 1) * 1.5 + baseStats.enr * 1.5;
  let stamina = 95 + baseStats.vit * 1.25;

  let fcr = 0;
  let fhr = 0;
  let ias = 0;
  let fbr = 0;
  let wsm = 0;
  let primaryWeaponType = "None";
  let skillIas = 0;
  let weaponDmg = { min: 1, max: 2 }; // Default bare fists
  let offWeaponEd = 0;
  let maxDmgFlat = 0;
  let minDmgFlat = 0;

  let res = { fire: 0, cold: 0, lightning: 0, poison: 0 };
  let defense = 0;
  let totalStr = baseStats.str;
  let totalDex = baseStats.dex;

  Object.entries(equipment).forEach(([slot, item]) => {
      if (item.defense) defense += item.defense;
      if (slot === 'weapon') {
          if (item.baseWeaponSpeed !== undefined) {
             wsm = item.baseWeaponSpeed;
          }
          primaryWeaponType = item.baseType;
          if (item.oneHandDamage) {
             weaponDmg = { min: item.oneHandDamage.min, max: item.oneHandDamage.max };
          } else if (item.twoHandDamage) {
             weaponDmg = { min: item.twoHandDamage.min, max: item.twoHandDamage.max };
          }
      }
  });

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
      case 'enhanced_damage': offWeaponEd += stat.value; break;
      case 'max_damage': maxDmgFlat += stat.value; break;
      case 'min_damage': minDmgFlat += stat.value; break;
      case 'strength': totalStr += stat.value; break;
      case 'dexterity': totalDex += stat.value; break;
    }
  };

  // Claw mastery ED
  const clawMasteryLevel = getSkillLevel('claw_mastery', skillPoints, equipment);
  if (clawMasteryLevel > 0 && (primaryWeaponType === 'Claw' || primaryWeaponType === 'Hand-to-Hand' || primaryWeaponType.includes('Katar') || primaryWeaponType.includes('Talons'))) {
      offWeaponEd += 35 + (clawMasteryLevel - 1) * 10; // Approx 35% base + 10% per level
  }

  // Burst of speed IAS
  const bosLevel = getSkillLevel('burst_of_speed', skillPoints, equipment);
  if (bosLevel > 0) {
     // Approximation: 15 + Math.floor((110 * bosLevel) / (bosLevel + 6))
     // But using a simpler linear/diminishing or hardcoded from table.
     // According to wiki: Level 1 = 21%, Level 2 = 28%, Lvl 20 = 52%
     // Exact formula: Math.floor((120 * bosLevel) / (bosLevel + 7))
     skillIas += Math.floor((120 * bosLevel) / (bosLevel + 7));
  }

  Object.values(equipment).forEach(item => {
    item.stats.forEach(processStat);
    if (item.corruptionStat) processStat(item.corruptionStat);
  });

  Object.values(charms).forEach(charm => {
    charm.stats.forEach(processStat);
  });

  return {
    life: Math.floor(life),
    mana: Math.floor(mana),
    stamina: Math.floor(stamina),
    defense,
    damage: {
       // Note: Ideally we would calculate total str/dex properly before using it here.
       // For now, we calculate a rough totalStr/totalDex by summing baseStats + item stats.
       min: Math.floor((weaponDmg.min + minDmgFlat) * (1 + (offWeaponEd + totalStr + totalDex) / 100)),
       max: Math.floor((weaponDmg.max + maxDmgFlat) * (1 + (offWeaponEd + totalStr + totalDex) / 100))
    },
    fcr,
    fhr,
    ias,
    fbr,
    wsm,
    primaryWeaponType,
    skillIas,
    resistances: res
  };
};

export const getIASBreakpoints = (
  wsm: number,
  baseFrames: number,
  animationSpeed: number,
  skillIas: number = 0
) => {
  const breakpoints = [];
  let tempFrame = -1;
  for (let ias = 0; ias <= 250; ias++) {
      const eias = Math.floor((120 * ias) / (120 + ias)) + skillIas - wsm;
      const acceleration = Math.min(Math.max(100 + eias, 15), 175);
      const fpa = Math.ceil(256 * baseFrames / Math.floor(animationSpeed * acceleration / 100)) - 1;

      if (fpa !== tempFrame) {
          breakpoints.push({ ias, fpa });
          tempFrame = fpa;
      }
  }
  return breakpoints;
};

// weapon classes for assassin based on the code from pod-calc
export const getAssassinWeaponClass = (weaponType: string) => {
  const isTwoHandSwinging = ['Polearm', 'Staff'].includes(weaponType); // Should refine this to differentiate 1H/2H axes/swords based on item stats, but simplify for now
  const isOneHandSwinging = ['Hand Axe', 'Axe', 'Sword', 'Mace', 'Scepter', 'Wand', 'Club', 'Hammer'].includes(weaponType) && !isTwoHandSwinging;
  const isOneHandThrusting = ['Dagger', 'Javelin'].includes(weaponType);
  const isTwoHandThrusting = ['Spear'].includes(weaponType);
  const isClaw = weaponType === 'Claw' || weaponType === 'Hand-to-Hand';
  const isBow = weaponType === 'Bow';
  const isCrossbow = weaponType === 'Crossbow';

  if (isClaw) return { baseFrames: 11, animationSpeed: 208 };
  if (isOneHandSwinging) return { baseFrames: 15, animationSpeed: 256 };
  if (isOneHandThrusting) return { baseFrames: 15, animationSpeed: 256 };
  if (isTwoHandSwinging) return { baseFrames: 19, animationSpeed: 256 };
  if (isTwoHandThrusting) return { baseFrames: 23, animationSpeed: 256 };
  if (isBow) return { baseFrames: 16, animationSpeed: 256 };
  if (isCrossbow) return { baseFrames: 21, animationSpeed: 256 };

  return { baseFrames: 11, animationSpeed: 256 }; // Default unarmed
}
