import { wikiItemBases } from '../data/itemBases';
import type { Item } from '../types';

export const enrichItemWithBaseStats = (item: Item): Item => {
  const base = wikiItemBases.find(b => b.name === item.baseType);
  if (!base) return item;

  const enriched = { ...item };

  if (base.stats.requiredStrength) enriched.requiredStrength = parseInt(base.stats.requiredStrength);
  if (base.stats.requiredDexterity) enriched.requiredDexterity = parseInt(base.stats.requiredDexterity);
  if (base.stats.requiredLevel && !enriched.requiredLevel) enriched.requiredLevel = parseInt(base.stats.requiredLevel);

  if (base.stats.defenseMin && base.stats.defenseMax) {
      // For uniques, we usually take max defense + enhanced defense
      // But for now let's just use max base defense as a starting point
      enriched.defense = parseInt(base.stats.defenseMax);
  }

  if (base.stats.damageMin && base.stats.damageMax) {
      const min = parseInt(base.stats.damageMin);
      const max = parseInt(base.stats.damageMax);

      if (base.category === 'Weapon') {
          if (base.stats.oneHandDamage || (base.stats.damageMin && !base.stats.twoHandDamage)) {
              enriched.oneHandDamage = { min, max };
          }
          if (base.stats.twoHandDamage) {
              enriched.twoHandDamage = { min, max };
          }
      }
  }

  if (base.stats.durability && base.stats.durability !== '-') {
      enriched.durability = parseInt(base.stats.durability);
  }

  if (base.stats.speed) {
      enriched.baseWeaponSpeed = parseInt(base.stats.speed);
  }

  if (base.stats.blockChance) {
      enriched.blockChance = parseInt(base.stats.blockChance);
  }

  // Handle Enhanced Defense / Damage from item stats to update base values
  const edStat = item.stats.find(s => s.id === 'enhanced_defense');
  if (edStat && enriched.defense) {
      enriched.defense = Math.floor(enriched.defense * (1 + edStat.value / 100));
  }

  const dmgStat = item.stats.find(s => s.id === 'enhanced_damage');
  if (dmgStat) {
      if (enriched.oneHandDamage) {
          enriched.oneHandDamage.min = Math.floor(enriched.oneHandDamage.min * (1 + dmgStat.value / 100));
          enriched.oneHandDamage.max = Math.floor(enriched.oneHandDamage.max * (1 + dmgStat.value / 100));
      }
      if (enriched.twoHandDamage) {
          enriched.twoHandDamage.min = Math.floor(enriched.twoHandDamage.min * (1 + dmgStat.value / 100));
          enriched.twoHandDamage.max = Math.floor(enriched.twoHandDamage.max * (1 + dmgStat.value / 100));
      }
  }

  return enriched;
};
