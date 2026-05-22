import React, { useState } from 'react';
import { useCharacterStore } from '../store/useCharacterStore';
import { baseItems, possibleCorruptions } from '../data/items';
import { wikiUniqueItems } from '../data/projectDiablo2Items';
import type { Item, Stat } from '../types';
import { RareItemCreator } from './RareItemCreator';
import { ItemTooltip } from './ItemTooltip';
import { enrichItemWithBaseStats } from '../utils/itemUtils';

const slots = [
  { id: 'head', name: 'Head', x: 4, y: 0, w: 2, h: 2 },
  { id: 'neck', name: 'Neck', x: 6, y: 1, w: 1, h: 1 },
  { id: 'body', name: 'Body', x: 4, y: 2, w: 2, h: 3 },
  { id: 'waist', name: 'Waist', x: 4, y: 5, w: 2, h: 1 },
  { id: 'mainhand', name: 'Main Hand', x: 1, y: 1, w: 2, h: 3 },
  { id: 'offhand', name: 'Off Hand', x: 7, y: 1, w: 2, h: 3 },
  { id: 'hands', name: 'Hands', x: 1, y: 4, w: 2, h: 2 },
  { id: 'feet', name: 'Feet', x: 7, y: 4, w: 2, h: 2 },
  // Place rings directly left and right of the belt (waist spans x:4-5)
  { id: 'finger1', name: 'Ring 1', x: 3, y: 5, w: 1, h: 1 },
  { id: 'finger2', name: 'Ring 2', x: 6, y: 5, w: 1, h: 1 },
];

export const Equipment: React.FC = () => {
  const { equipment, charms, equipItem, unequipItem, equipCharm, unequipCharm } = useCharacterStore();
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [activeCharmSlot, setActiveCharmSlot] = useState<string | null>(null);

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
    const enriched = enrichItemWithBaseStats(item);
    equipItem(slot, enriched);
    setActiveSlot(null);
  };

  const handleCorruption = (slot: string, corruption: Stat) => {
    const item = equipment[slot];
    if (item) {
        equipItem(slot, { ...item, isCorrupted: true, corruptionStat: corruption });
    }
  };

  const charmOptions: Item[] = [
    { id: 'sc_life', name: 'Small Charm of Life', baseType: 'Small Charm', rarity: 'Magic', width: 1, height: 1, requiredLevel: 1, stats: [{ id: 'life', name: '+20 to Life', value: 20, type: 'flat' }] },
    { id: 'sc_res', name: 'Small Charm of Vita', baseType: 'Small Charm', rarity: 'Magic', width: 1, height: 1, requiredLevel: 1, stats: [{ id: 'all_res', name: '+5 to All Resistances', value: 5, type: 'flat' }] },
    { id: 'lc_life', name: 'Large Charm of Life', baseType: 'Large Charm', rarity: 'Magic', width: 1, height: 2, requiredLevel: 1, stats: [{ id: 'life', name: '+35 to Life', value: 35, type: 'flat' }] },
    { id: 'gc_skiller', name: 'Grand Charm of Vita', baseType: 'Grand Charm', rarity: 'Magic', width: 1, height: 3, requiredLevel: 1, stats: [{ id: 'assassin_skills', name: '+1 to Assassin Skills', value: 1, type: 'flat' }, { id: 'life', name: '+45 to Life', value: 45, type: 'flat' }] },
  ];

  const handleEquipCharm = (slot: string, charm: Item) => {
      equipCharm(slot, charm);
      setActiveCharmSlot(null);
  };

  return (
    <div className="flex flex-col items-center bg-diablo-dark p-5 border border-diablo-gold/30 rounded-xl shadow-2xl">
      <h2 className="text-diablo-gold text-xl mb-5 font-bold uppercase tracking-widest font-serif">Inventory</h2>

      <div className="relative w-[342px] h-[342px] bg-black/80 border border-diablo-gold/20 rounded-xl p-2 inventory-grid">

        {slots.map(slot => {
          const equipped = equipment[slot.id];
          return (
            <button
              key={slot.id}
              className={`inventory-slot-box group hover:z-[100] ${equipped?.rarity === 'Unique' ? 'diablo-unique' : ''} ${equipped?.rarity === 'Rare' ? 'diablo-rare' : ''}`}
              style={{
                gridColumnStart: slot.x + 1,
                gridColumnEnd: `span ${slot.w}`,
                gridRowStart: slot.y + 1,
                gridRowEnd: `span ${slot.h}`,
              }}
              onClick={() => setActiveSlot(slot.id)}
            >
              {equipped ? (
                <div className="text-[10px] text-center p-1 font-bold leading-tight">
                  {equipped.name}
                  {equipped.isCorrupted && <div className="text-red-500 font-bold uppercase">Corrupted</div>}
                </div>
              ) : (
                <div className="text-[9px] text-gray-500 uppercase tracking-[0.22em] text-center">
                  {slot.name}
                </div>
              )}

              {equipped && (
                <div className="invisible group-hover:visible absolute z-[100] top-full left-1/2 -translate-x-1/2 mt-1 w-max pointer-events-none">
                    <ItemTooltip item={equipped} />
                    <div className="pointer-events-auto">
                        <button
                            className="mt-1 w-full bg-red-900/30 text-red-500 text-[10px] py-1 border border-red-900"
                            onClick={(e) => { e.stopPropagation(); unequipItem(slot.id); }}
                        >
                            UNEQUIP
                        </button>
                    </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {activeSlot && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80">
          <div className="bg-diablo-panel border-2 border-diablo-gold p-6 w-[500px] max-h-[80vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-diablo-gold font-bold uppercase">Select Item for {activeSlot}</h3>
              <button onClick={() => setActiveSlot(null)} className="text-gray-500 hover:text-white text-xl">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Unique Items</h4>
                <div className="grid grid-cols-1 gap-4">
                  {wikiUniqueItems
                    .filter(i => !activeSlot || i.slotType === slotToType[activeSlot])
                    .map(item => {
                        const enriched = enrichItemWithBaseStats(item);
                        return (
                            <div key={item.id} className="relative group">
                                <button
                                    onClick={() => handleEquip(activeSlot!, item)}
                                    className="w-full text-left p-2 border border-diablo-unique/30 bg-diablo-unique/5 hover:bg-diablo-unique/20 text-diablo-unique text-xs font-serif"
                                >
                                    {item.name} ({item.baseType})
                                </button>
                                <div className="invisible group-hover:visible absolute z-[60] left-full top-0 ml-2 pointer-events-none">
                                    <ItemTooltip item={enriched} />
                                </div>
                            </div>
                        );
                    })}
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

      {activeCharmSlot && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80">
          <div className="bg-diablo-panel border-2 border-diablo-gold p-6 w-[400px] max-h-[80vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-diablo-gold font-bold uppercase">Select Charm</h3>
              <button onClick={() => setActiveCharmSlot(null)} className="text-gray-500 hover:text-white text-xl">✕</button>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {charmOptions.map(charm => (
                <button
                  key={charm.id}
                  onClick={() => handleEquipCharm(activeCharmSlot, charm)}
                  className="text-left p-3 border border-diablo-gold/30 bg-black/40 hover:bg-diablo-gold/10 transition-colors"
                >
                  <div className="text-blue-400 font-bold">{charm.name}</div>
                  <div className="text-[10px] text-gray-400">{charm.baseType}</div>
                  {charm.stats.map((s, i) => (
                      <div key={i} className="text-blue-400 text-xs">{s.name}</div>
                  ))}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-diablo-gold text-sm mb-2 font-bold uppercase tracking-widest text-center">Charms / Inventory</h3>
        <div className="grid grid-cols-10 grid-rows-4 w-[320px] h-[128px] border border-diablo-gold/30 bg-black/40 relative">
          {Array.from({ length: 40 }).map((_, i) => {
              const charm = charms[`charm-${i}`];
              return (
                <div
                    key={i}
                    className="border border-gray-800/50 flex items-center justify-center cursor-pointer hover:bg-white/5 relative group"
                    onClick={() => setActiveCharmSlot(`charm-${i}`)}
                >
                    {charm && (
                        <>
                            <div className="text-[10px] text-green-500 font-bold">C</div>
                            <div className="invisible group-hover:visible absolute z-[100] bottom-full left-1/2 -translate-x-1/2 mb-1 w-max pointer-events-none">
                                <ItemTooltip item={charm} />
                                <div className="pointer-events-auto">
                                    <button
                                        className="mt-1 w-full bg-red-900/30 text-red-500 text-[10px] py-1 border border-red-900"
                                        onClick={(e) => { e.stopPropagation(); unequipCharm(`charm-${i}`); }}
                                    >
                                        REMOVE
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
};
