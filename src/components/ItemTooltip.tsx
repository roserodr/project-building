import React from 'react';
import type { Item, Stat } from '../types';
import { useCharacterStore } from '../store/useCharacterStore';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ItemTooltipProps {
  item: Item;
  className?: string;
}

export const ItemTooltip: React.FC<ItemTooltipProps> = ({ item, className }) => {
  const { strength, dexterity, level } = useCharacterStore();

  const rarityColors = {
    Normal: 'text-white',
    Magic: 'text-blue-400',
    Rare: 'text-yellow-400',
    Unique: 'text-diablo-unique',
    Set: 'text-green-500',
    Crafted: 'text-orange-500',
    Runeword: 'text-diablo-unique',
  };

  const nameColor = rarityColors[item.rarity] || 'text-white';

  return (
    <div className={cn(
      "p-3 bg-black border-2 border-gray-700 text-sm shadow-2xl min-w-[200px] flex flex-col items-center text-center font-serif pointer-events-none",
      className
    )}>
      <div className={cn("font-bold text-base mb-1", nameColor)}>
        {item.name}
      </div>
      <div className="text-white text-xs mb-1">{item.baseType}</div>

      {item.defense && (
        <div className="text-white text-xs">Defense: <span className="text-blue-400">{item.defense}</span></div>
      )}

      {item.oneHandDamage && (
        <div className="text-white text-xs">
          One-Hand Damage: <span className="text-blue-400">{item.oneHandDamage.min} to {item.oneHandDamage.max}</span>
        </div>
      )}

      {item.twoHandDamage && (
        <div className="text-white text-xs">
          Two-Hand Damage: <span className="text-blue-400">{item.twoHandDamage.min} to {item.twoHandDamage.max}</span>
        </div>
      )}

      {item.baseWeaponSpeed !== undefined && (
          <div className="text-white text-xs">Weapon Speed: <span className="text-blue-400">[{item.baseWeaponSpeed}]</span></div>
      )}

      {item.blockChance !== undefined && (
          <div className="text-white text-xs">Chance to Block: <span className="text-blue-400">{item.blockChance}%</span></div>
      )}

      {item.durability && (
        <div className="text-white text-xs">Durability: {item.durability} of {item.durability}</div>
      )}

      <div className="mt-2 space-y-0.5">
        {item.requiredStrength && (
          <div className={cn("text-xs", strength < item.requiredStrength ? "text-red-500" : "text-white")}>
            Required Strength: {item.requiredStrength}
          </div>
        )}
        {item.requiredDexterity && (
          <div className={cn("text-xs", dexterity < item.requiredDexterity ? "text-red-500" : "text-white")}>
            Required Dexterity: {item.requiredDexterity}
          </div>
        )}
        {item.requiredLevel && (
          <div className={cn("text-xs", level < item.requiredLevel ? "text-red-500" : "text-white")}>
            Required Level: {item.requiredLevel}
          </div>
        )}
      </div>

      <div className="mt-2 w-full border-t border-gray-800 pt-2 flex flex-col items-center">
        {item.stats.map((s: Stat, i: number) => (
          <div key={i} className="text-blue-400 text-xs">
            {s.name.replace(/\[.*\]/, s.value.toString())}
          </div>
        ))}
      </div>

      {item.isCorrupted && (
        <div className="mt-2 w-full border-t border-red-900 pt-1">
          <div className="text-red-500 font-bold uppercase text-[10px]">Corrupted</div>
          {item.corruptionStat && (
             <div className="text-red-500 text-xs">{item.corruptionStat.name}</div>
          )}
        </div>
      )}
    </div>
  );
};
