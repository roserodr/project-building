import React, { useState } from 'react';
import { useCharacterStore } from '../store/useCharacterStore';
import { baseItems, possibleCorruptions } from '../data/items';
import { wikiUniqueItems } from '../data/projectDiablo2Items';
import type { Item, Stat } from '../types';
import { RareItemCreator } from './RareItemCreator';
import { ItemTooltip } from './ItemTooltip';
import { enrichItemWithBaseStats } from '../utils/itemUtils';

// Equipment slot rectangles taken from PD2 Inventory.txt, converted to % of the
// authentic inventory panel art (inv_panel.png, native 320x502).
// (panel-relative px = screen px - invLeft(320) for x, + 30 for y; then /320 or /502)
const PW = 320, PH = 502;
const pct = (x: number, y: number, w: number, h: number) => ({
  left: `${(x / PW) * 100}%`, top: `${(y / PH) * 100}%`,
  width: `${(w / PW) * 100}%`, height: `${(h / PH) * 100}%`,
});
const slots = [
  { id: 'head',     name: 'Helm',      icon: '/ui/slots/inv_helm_glove_b.png', ...pct(131,   7, 56,  54) },
  { id: 'neck',     name: 'Amulet',    icon: '/ui/slots/inv_ring_amulet_a.png', ...pct(202,  37, 25,  25) },
  { id: 'mainhand', name: 'Main Hand', icon: '/ui/slots/inv_weapons.png',       ...pct( 17,  30, 55, 110) },
  { id: 'offhand',  name: 'Off Hand',  icon: '/ui/slots/inv_weapons.png',       ...pct(246,  30, 55, 110) },
  { id: 'body',     name: 'Body',      icon: '/ui/slots/inv_armor.png',         ...pct(130,  79, 56,  82) },
  { id: 'hands',    name: 'Gloves',    icon: '/ui/slots/inv_helm_glove_a.png',  ...pct( 18, 156, 54,  54) },
  { id: 'waist',    name: 'Belt',      icon: '/ui/slots/inv_belt.png',          ...pct(130, 177, 56,  25) },
  { id: 'finger1',  name: 'Ring',      icon: '/ui/slots/inv_ring_amulet_b.png', ...pct( 91, 177, 25,  25) },
  { id: 'finger2',  name: 'Ring',      icon: '/ui/slots/inv_ring_amulet_b.png', ...pct(201, 177, 25,  25) },
  { id: 'feet',     name: 'Boots',     icon: '/ui/slots/inv_boots.png',         ...pct(247, 158, 54,  54) },
];

// Inventory/charm grid (PD2: 10 columns x 8 rows, cell 29px, origin 15,219)
const GRID_COLS = 10, GRID_ROWS = 8, CELL = 29, GRID_X = 15, GRID_Y = 219;

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
    { id: 'sc_life', name: 'Small Charm of Life', baseType: 'Small Charm', rarity: 'Magic', width: 1, height: 1, requiredLevel: 1, imageFile: 'invcm1', stats: [{ id: 'life', name: '+20 to Life', value: 20, type: 'flat' }] },
    { id: 'sc_res', name: 'Small Charm of Vita', baseType: 'Small Charm', rarity: 'Magic', width: 1, height: 1, requiredLevel: 1, imageFile: 'invcm1', stats: [{ id: 'all_res', name: '+5 to All Resistances', value: 5, type: 'flat' }] },
    { id: 'lc_life', name: 'Large Charm of Life', baseType: 'Large Charm', rarity: 'Magic', width: 1, height: 2, requiredLevel: 1, imageFile: 'invcm2', stats: [{ id: 'life', name: '+35 to Life', value: 35, type: 'flat' }] },
    { id: 'gc_skiller', name: 'Grand Charm of Vita', baseType: 'Grand Charm', rarity: 'Magic', width: 1, height: 3, requiredLevel: 1, imageFile: 'invcm3', stats: [{ id: 'assassin_skills', name: '+1 to Assassin Skills', value: 1, type: 'flat' }, { id: 'life', name: '+45 to Life', value: 45, type: 'flat' }] },
  ];

  const handleEquipCharm = (slot: string, charm: Item) => {
      equipCharm(slot, charm);
      setActiveCharmSlot(null);
  };

  return (
    <div className="flex flex-col items-center justify-start h-full w-full">
      <div className="diablo-section-title text-base tracking-[0.3em] text-glow-gold mb-3">Equipment</div>

      {/* Authentic PD2 inventory panel (inv_panel.png) with slots + grid positioned on the art */}
      <div className="relative flex-1 min-h-0" style={{ height: '100%', aspectRatio: `${PW} / ${PH}` }}>
        <img src="/ui/inv_panel.png" alt="" draggable={false}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', imageRendering: 'pixelated' }} />

        {/* Equipment slots */}
        {slots.map(slot => {
          const equipped = equipment[slot.id];
          return (
            <button
              key={slot.id}
              className={`absolute group hover:z-[100] ${equipped?.rarity === 'Unique' ? 'diablo-unique' : ''} ${equipped?.rarity === 'Rare' ? 'diablo-rare' : ''}`}
              style={{ left: slot.left, top: slot.top, width: slot.width, height: slot.height, background: 'none', border: 'none', padding: '2px', cursor: 'pointer' }}
              onClick={() => setActiveSlot(slot.id)}
            >
              {equipped ? (
                <div className="flex flex-col items-center justify-center h-full w-full relative">
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-1">
                      <div className={`text-[10px] text-center font-bold leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,1)] ${equipped.imageFile ? 'opacity-0' : 'opacity-100'}`} style={{ transition: 'opacity 0.2s' }}>
                        {equipped.name}
                        {equipped.isCorrupted && <div className="text-red-500 font-bold uppercase">Corrupted</div>}
                      </div>
                  </div>
                  {equipped.imageFile ? (
                    <img src={`/items/${equipped.imageFile}.png`} alt={equipped.name} className="w-full h-full object-contain filter drop-shadow-[0_0_2px_rgba(0,0,0,0.8)] z-10" onError={(e) => {
                       const img = e.target as HTMLImageElement;
                       img.style.display = 'none';
                       const textDiv = img.previousElementSibling?.firstElementChild as HTMLElement;
                       if (textDiv) textDiv.classList.remove('opacity-0');
                    }} />
                  ) : null}
                </div>
              ) : (
                <img
                  src={slot.icon}
                  alt={slot.name}
                  title={slot.name}
                  style={{ imageRendering: 'pixelated', width: '100%', height: '100%', objectFit: 'contain', opacity: 0.5, filter: 'brightness(0.8)' }}
                />
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

        {/* Inventory / charm grid overlaid on the art's grid wells */}
        {Array.from({ length: GRID_COLS * GRID_ROWS }).map((_, i) => {
          const cx = i % GRID_COLS, cy = Math.floor(i / GRID_COLS);
          const charm = charms[`charm-${i}`];
          return (
            <div
              key={i}
              className="absolute flex items-center justify-center cursor-pointer group"
              style={{
                left: `${((GRID_X + cx * CELL) / PW) * 100}%`,
                top: `${((GRID_Y + cy * CELL) / PH) * 100}%`,
                width: `${(CELL / PW) * 100}%`,
                height: `${(CELL / PH) * 100}%`,
              }}
              onClick={() => setActiveCharmSlot(`charm-${i}`)}
            >
              {charm && (
                <>
                  {charm.imageFile ? (
                    <img src={`/items/${charm.imageFile}.png`} alt={charm.name} className="w-full h-full object-contain filter drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]" onError={(e) => {
                       (e.target as HTMLImageElement).style.display = 'none';
                       (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                    }} />
                  ) : null}
                  <div className={`text-[10px] text-green-500 font-bold ${charm.imageFile ? 'hidden' : ''}`}>C</div>
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

      {activeSlot && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80">
          <div className="diablo-panel diablo-panel-ornate border border-[#7a6030] p-6 w-[500px] max-h-[80vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-4">
              <div className="text-[#c8a050] font-bold uppercase tracking-[0.2em] text-sm" style={{ fontFamily: 'Cinzel, serif' }}>
                Select Item — <span className="text-[#a07840] capitalize">{activeSlot}</span>
              </div>
              <button onClick={() => setActiveSlot(null)} className="text-[#5a4a30] hover:text-[#c8a050] text-lg transition-colors">✕</button>
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
                                    onClick={() => handleEquip(activeSlot, item)}
                                    className="w-full text-left p-2 border border-diablo-unique/30 bg-diablo-unique/5 hover:bg-diablo-unique/20 text-diablo-unique text-xs font-serif"
                                >
                                    <div className="font-bold">{item.name} ({item.baseType})</div>
                                    <div className="mt-1 flex flex-col gap-0.5">
                                        {enriched.stats.map((s, i) => (
                                            <div key={i} className="text-blue-400 text-[10px]">
                                                {s.name.replace(/\[.*\]/, s.value.toString())}
                                            </div>
                                        ))}
                                    </div>
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

              <RareItemCreator slotId={activeSlot} onSelect={(item) => handleEquip(activeSlot, item)} />
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
    </div>
  );
};
