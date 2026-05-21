import React, { useState } from 'react';
import { useCharacterStore } from '../store/useCharacterStore';
import { baseItems, possibleCorruptions } from '../data/items';
import { wikiUniqueItems } from '../data/projectDiablo2Items';
import type { Item, Stat } from '../types';
import { RareItemCreator } from './RareItemCreator';

const slots = [
  { id: 'head', name: 'Head', x: 4, y: 0, w: 2, h: 2 },
  { id: 'neck', name: 'Neck', x: 6, y: 1, w: 1, h: 1 },
  { id: 'body', name: 'Body', x: 4, y: 2, w: 2, h: 3 },
  { id: 'waist', name: 'Waist', x: 4, y: 5, w: 2, h: 1 },
  { id: 'mainhand', name: 'Main Hand', x: 1, y: 1, w: 2, h: 3 },
  { id: 'offhand', name: 'Off Hand', x: 7, y: 1, w: 2, h: 3 },
  { id: 'hands', name: 'Hands', x: 1, y: 4, w: 2, h: 2 },
  { id: 'feet', name: 'Feet', x: 7, y: 4, w: 2, h: 2 },
  { id: 'finger1', name: 'Ring 1', x: 3, y: 4, w: 1, h: 1 },
  { id: 'finger2', name: 'Ring 2', x: 6, y: 4, w: 1, h: 1 },
];

export const Equipment: React.FC = () => {
  const { equipment, equipItem, unequipItem } = useCharacterStore();
  const [activeSlot, setActiveSlot] = useState<string | null>(null);

  const slotToType: Record<string, string> = {
    head: 'Helm',
    neck: 'Amulet',
    body: 'Body Armor',
    waist: 'Belt',
    mainhand: 'Weapon',
    offhand: 'Weapon',
    hands: 'Gloves',
    feet: 'Boots',
    finger1: 'Ring',
    finger2: 'Ring',
  };

  const handleEquip = (slot: string, item: Item) => {
    const expected = slotToType[slot];
    // If item declares a slotType, enforce match. Otherwise allow (legacy items)
    if (item.slotType && expected && item.slotType !== expected) {
      console.warn(`Cannot equip ${item.name} to ${slot} (expects ${expected}, got ${item.slotType})`);
      return;
    }
    equipItem(slot, item);
    setActiveSlot(null);
  };

  const handleCorruption = (slot: string, corruption: Stat) => {
    const item = equipment[slot];
    if (item) {
        equipItem(slot, { ...item, isCorrupted: true, corruptionStat: corruption });
    }
  };

  return (
    <div className="flex flex-col items-center bg-diablo-dark p-6 border border-diablo-gold/30 rounded-lg shadow-2xl">
      <h2 className="text-diablo-gold text-xl mb-6 font-bold uppercase tracking-widest font-serif">Inventory</h2>

      <div className="relative w-[320px] h-[320px] bg-black/40 border border-diablo-gold/20 grid grid-cols-10 grid-rows-10">
        {slots.map(slot => {
          const equipped = equipment[slot.id];
          return (
            <div
              key={slot.id}
              className={`absolute border border-gray-700 bg-black/60 flex items-center justify-center cursor-pointer hover:border-diablo-gold transition-colors group
                ${equipped?.rarity === 'Unique' ? 'border-diablo-unique' : ''}
                ${equipped?.rarity === 'Rare' ? 'border-diablo-rare' : ''}
              `}
              style={{
                left: `${slot.x * 10}%`,
                top: `${slot.y * 10}%`,
                width: `${slot.w * 10}%`,
                height: `${slot.h * 10}%`,
              }}
              onClick={() => setActiveSlot(slot.id)}
            >
              {equipped ? (
                <div className="text-[10px] text-center p-1 font-bold">
                  {equipped.name}
                  {equipped.isCorrupted && <div className="text-red-500 font-bold uppercase">Corrupted</div>}
                </div>
              ) : (
                <div className="text-[8px] text-gray-500 uppercase">{slot.name}</div>
              )}

              {equipped && (
                <div className="invisible group-hover:visible absolute z-50 top-full left-0 mt-1 w-64 p-3 bg-black border-2 border-diablo-gold text-sm shadow-2xl">
                    <div className={`font-bold ${equipped.rarity === 'Unique' ? 'text-diablo-unique' : 'text-diablo-rare'}`}>
                        {equipped.name}
                    </div>
                    <div className="text-xs text-gray-400 mb-2">{equipped.baseType}</div>
                    {equipped.stats.map((s: Stat, i: number) => (
                        <div key={i} className="text-blue-400 text-xs">{s.name} {s.type === 'percentage' ? `${s.value}%` : `+${s.value}`}</div>
                    ))}
                    {equipped.corruptionStat && (
                        <div className="text-red-500 text-xs mt-2 border-t border-red-900 pt-1">
                            {equipped.corruptionStat.name}
                        </div>
                    )}
                    <button
                        className="mt-3 w-full bg-red-900/30 text-red-500 text-[10px] py-1 border border-red-900"
                        onClick={(e) => { e.stopPropagation(); unequipItem(slot.id); }}
                    >
                        UNEQUIP
                    </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {activeSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-diablo-panel border-2 border-diablo-gold p-6 w-[500px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-diablo-gold font-bold">Select Item for {activeSlot}</h3>
              <button onClick={() => setActiveSlot(null)} className="text-gray-500 hover:text-white">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Unique Items</h4>
                <div className="grid grid-cols-2 gap-2">
                  {wikiUniqueItems
                    .filter(i => !activeSlot || i.slotType === slotToType[activeSlot])
                    .map(item => (
                      <button
                        key={item.id}
                        onClick={() => handleEquip(activeSlot!, item)}
                        className="text-left p-2 border border-diablo-unique/30 bg-diablo-unique/5 hover:bg-diablo-unique/20 text-diablo-unique text-xs font-serif"
                      >
                        {item.name}
                      </button>
                    ))}
                </div>
              </div>

              {equipment[activeSlot] && (
                <div className="border-t border-diablo-gold/20 pt-4">
                   <h4 className="text-xs font-bold text-red-500 uppercase mb-2">Corrupt Item</h4>
                   <div className="grid grid-cols-1 gap-2">
                     {possibleCorruptions[baseItems.find(b => b.name === equipment[activeSlot].baseType)?.type || '']?.map((corr, i) => (
                       <button
                         key={i}
                         onClick={() => handleCorruption(activeSlot, corr)}
                         className="text-left p-2 border border-red-900/30 bg-red-900/5 hover:bg-red-900/20 text-red-500 text-xs font-serif"
                       >
                         {corr.name}
                       </button>
                     ))}
                   </div>
                </div>
              )}

              <RareItemCreator slotId={activeSlot!} onSelect={(item) => handleEquip(activeSlot!, item)} />
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-diablo-gold text-sm mb-2 font-bold uppercase tracking-widest text-center">Charms / Inventory</h3>
        <div className="grid grid-cols-10 grid-rows-4 w-[320px] h-[128px] border border-diablo-gold/30 bg-black/40">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="border border-gray-800/50"></div>
          ))}
        </div>
      </div>
    </div>
  );
};
