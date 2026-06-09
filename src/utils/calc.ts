import type { Item, Stat, CharacterStats, Skill, CharacterClass } from '../types';
import { skillsLevelData } from '../data/skillsLevelData';
import { CLASS_STATS } from '../data/classes';

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

    let baseMin = 0;
    let baseMax = 0;

    const skillLevelData = skill.levelData || skillsLevelData[skill.name];

    if (skillLevelData) {
        const availableLevels = Object.keys(skillLevelData).map(Number).sort((a, b) => a - b);
        let validLevel = totalLevel;
        if (availableLevels.length > 0) {
            const maxAvailable = availableLevels[availableLevels.length - 1];
            if (validLevel > maxAvailable) {
                validLevel = maxAvailable;
            }
        }

        const data = (skillLevelData as Record<number, { minDamage?: number; maxDamage?: number }>)[validLevel];
        if (data) {
            baseMin = data.minDamage || 0;
            baseMax = data.maxDamage || 0;
        }
    } else {
        baseMin = 10 + totalLevel * 5;
        baseMax = 20 + totalLevel * 10;
    }

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
  charClass: CharacterClass,
  level: number,
  baseStats: { str: number; dex: number; vit: number; energy: number },
  skillPoints: Record<string, number>,
  equipment: Record<string, Item>,
  charms: Record<string, Item>
): CharacterStats => {
  const classStats = CLASS_STATS[charClass];

  // Life/Mana base are calculated first, then item vit/energy are added later
  let life = classStats.baseLife + (level - 1) * classStats.lifePerLevel + (baseStats.vit - classStats.vitality) * classStats.lifePerVit;
  let mana = classStats.baseMana + (level - 1) * classStats.manaPerLevel + (baseStats.energy - classStats.energy) * classStats.manaPerEng;
  const stamina = classStats.baseStamina + (level - 1) * classStats.staminaPerLevel + (baseStats.vit - classStats.vitality) * classStats.staminaPerVit;

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

  const res = { fire: 0, cold: 0, lightning: 0, poison: 0 };
  let defense = 0;
  let totalStr = baseStats.str;
  let totalDex = baseStats.dex;
  let totalVit = baseStats.vit;
  let totalEnergy = baseStats.energy;

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
      case 'strength':
      case 'str': totalStr += stat.value; break;
      case 'dexterity':
      case 'dex': totalDex += stat.value; break;
      case 'vitality':
      case 'vit': totalVit += stat.value; break;
      case 'energy':
      case 'enr': totalEnergy += stat.value; break;
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

  life += (totalVit - baseStats.vit) * classStats.lifePerVit;
  mana += (totalEnergy - baseStats.energy) * classStats.manaPerEng;
  const totalStamina = stamina + (totalVit - baseStats.vit) * classStats.staminaPerVit;

  return {
    totalStr,
    totalDex,
    totalVit,
    totalEnergy,
    life: Math.floor(life),
    mana: Math.floor(mana),
    stamina: Math.floor(totalStamina),
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

export const getWeaponClass = (charClass: CharacterClass, weaponType: string) => {
  // Simplification for all classes based on previously implemented Assassin logic,
  // generalized. In a full implementation, this should parse game files exactly.
  const isTwoHandSwinging = ['Polearm', 'Staff'].includes(weaponType);
  const isOneHandSwinging = ['Hand Axe', 'Axe', 'Sword', 'Mace', 'Scepter', 'Wand', 'Club', 'Hammer'].includes(weaponType) && !isTwoHandSwinging;
  const isOneHandThrusting = ['Dagger', 'Javelin'].includes(weaponType);
  const isTwoHandThrusting = ['Spear'].includes(weaponType);
  const isClaw = weaponType === 'Claw' || weaponType === 'Hand-to-Hand';
  const isBow = weaponType === 'Bow';
  const isCrossbow = weaponType === 'Crossbow';

  if (charClass === 'Assassin') {
    if (isClaw) return { baseFrames: 11, animationSpeed: 208 };
    if (isOneHandSwinging) return { baseFrames: 15, animationSpeed: 256 };
    if (isOneHandThrusting) return { baseFrames: 15, animationSpeed: 256 };
    if (isTwoHandSwinging) return { baseFrames: 19, animationSpeed: 256 };
    if (isTwoHandThrusting) return { baseFrames: 23, animationSpeed: 256 };
    if (isBow) return { baseFrames: 16, animationSpeed: 256 };
    if (isCrossbow) return { baseFrames: 21, animationSpeed: 256 };
    return { baseFrames: 11, animationSpeed: 256 };
  } else if (charClass === 'Amazon') {
    if (isBow) return { baseFrames: 14, animationSpeed: 256 };
    if (isCrossbow) return { baseFrames: 20, animationSpeed: 256 };
    if (isOneHandThrusting || isTwoHandThrusting) return { baseFrames: 15, animationSpeed: 256 };
    if (isOneHandSwinging || isTwoHandSwinging) return { baseFrames: 16, animationSpeed: 256 };
    return { baseFrames: 14, animationSpeed: 256 }; // Unarmed
  } else if (charClass === 'Barbarian') {
    if (isOneHandSwinging) return { baseFrames: 16, animationSpeed: 256 }; // 1HS
    if (isTwoHandSwinging) return { baseFrames: 19, animationSpeed: 256 };
    if (isBow) return { baseFrames: 15, animationSpeed: 256 };
    if (isCrossbow) return { baseFrames: 20, animationSpeed: 256 };
    return { baseFrames: 12, animationSpeed: 256 }; // Fast base for Barbarian unarmed
  } else if (charClass === 'Paladin') {
    if (isOneHandSwinging) return { baseFrames: 15, animationSpeed: 256 };
    if (isTwoHandSwinging) return { baseFrames: 18, animationSpeed: 256 };
    if (isBow) return { baseFrames: 16, animationSpeed: 256 };
    if (isCrossbow) return { baseFrames: 20, animationSpeed: 256 };
    return { baseFrames: 14, animationSpeed: 256 };
  } else {
    // Default fallback for Sorc, Necro, Druid
    if (isOneHandSwinging) return { baseFrames: 19, animationSpeed: 256 };
    if (isTwoHandSwinging) return { baseFrames: 20, animationSpeed: 256 };
    if (isBow) return { baseFrames: 17, animationSpeed: 256 };
    if (isCrossbow) return { baseFrames: 20, animationSpeed: 256 };
    return { baseFrames: 15, animationSpeed: 256 };
  }
}

export const FCR_BREAKPOINTS: Record<string, number[]> = {
  Amazon: [0, 7, 14, 22, 32, 48, 68, 99, 152],
  Assassin: [0, 8, 16, 27, 42, 65, 102, 174],
  Necromancer: [0, 9, 18, 30, 48, 75, 125],
  Barbarian: [0, 9, 20, 37, 63, 105, 200],
  Paladin: [0, 9, 18, 30, 48, 75, 125],
  Sorceress: [0, 9, 20, 37, 63, 105, 200],
  Druid: [0, 4, 10, 19, 30, 46, 68, 99, 163]
};

export const FHR_BREAKPOINTS: Record<string, number[]> = {
  Amazon: [0, 6, 13, 20, 32, 52, 86, 174],
  Assassin: [0, 7, 15, 27, 48, 86, 200],
  Necromancer: [0, 5, 10, 16, 26, 39, 56, 86, 152],
  Barbarian: [0, 7, 15, 27, 48, 86, 200],
  Paladin: [0, 7, 15, 27, 48, 86, 200],
  Sorceress: [0, 5, 9, 14, 20, 30, 42, 60, 86, 142],
  Druid: [0, 3, 7, 13, 19, 29, 42, 63, 99, 174]
};

export const FBR_BREAKPOINTS: Record<string, number[]> = {
  Amazon: [0, 4, 6, 11, 15, 23, 29, 40, 56, 80, 120],
  Assassin: [0, 13, 32, 86, 600],
  Necromancer: [0, 6, 13, 20, 32, 52, 86, 174],
  Barbarian: [0, 9, 20, 42, 86, 280],
  Paladin: [0, 13, 32, 86, 600],
  Sorceress: [0, 7, 15, 27, 48, 86, 200],
  Druid: [0, 5, 10, 16, 27, 40, 65, 109, 223]
};

export const getAssassinWeaponClass = (_type: string) => {
  return { baseFrames: 11, animationSpeed: 256 };
};
