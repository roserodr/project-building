import React, { useState } from 'react';
import type { Item, Stat, ItemRarity } from '../types';
import { allPossibleAffixes, allowedAffixesPerSlot } from '../data/affixes';
import { baseItems } from '../data/items';
import { enrichItemWithBaseStats } from '../utils/itemUtils';

interface RareItemCreatorProps {
  slotId: string;
  onSelect: (item: Item) => void;
}

export const RareItemCreator: React.FC<RareItemCreatorProps> = ({ slotId, onSelect }) => {
  const [name, setName] = useState('Rare Item');
  const [selectedStats, setSelectedStats] = useState<Stat[]>([]);

  const toggleStat = (stat: Stat) => {
    if (selectedStats.find(s => s.id === stat.id)) {
      setSelectedStats(selectedStats.filter(s => s.id !== stat.id));
    } else {
      setSelectedStats([...selectedStats, { ...stat, value: 10 }]);
    }
  };

  const updateStatValue = (id: string, value: number) => {
    setSelectedStats(selectedStats.map(s => s.id === id ? { ...s, value } : s));
  };
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

  const slotType = slotToType[slotId] || 'Misc';
  const base = baseItems.find(b => b.type === slotType)?.name || 'Rare Base';

  const handleCreate = () => {
    const newItem: Item = {
      id: `rare-${Date.now()}`,
      name: name,
      baseType: base,
      slotType: slotType,
      rarity: 'Rare' as ItemRarity,
      width: 2,
      height: 2,
      stats: selectedStats,
      requiredLevel: 1,
    };
    const enriched = enrichItemWithBaseStats(newItem);
    onSelect(enriched);
  };

  const allowedAffixIds = allowedAffixesPerSlot[slotType] || allPossibleAffixes.map(a => a.id);
  const allowedAffixes = allPossibleAffixes.filter(a => allowedAffixIds.includes(a.id));

  return (
    <div className="mt-6 border-t border-diablo-gold/20 pt-4">
      <h4 className="text-xs font-bold text-diablo-rare uppercase mb-2">Create Rare Item</h4>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full bg-black border border-diablo-gold/30 text-diablo-rare p-2 mb-4 text-sm font-serif"
        placeholder="Item Name"
      />

      <div className="grid grid-cols-2 gap-2 mb-4 h-48 overflow-y-auto pr-2 custom-scrollbar">
        {allowedAffixes.map(stat => {
          const isSelected = selectedStats.find(s => s.id === stat.id);
          return (
            <div key={stat.id} className="flex flex-col">
              <button
                onClick={() => toggleStat(stat)}
                className={`text-[10px] p-1 border text-left truncate ${isSelected ? 'bg-diablo-gold/20 border-diablo-gold text-diablo-gold' : 'border-gray-700 text-gray-500'}`}
              >
                {stat.name}
              </button>
              {isSelected && (
                <input
                  type="number"
                  value={isSelected.value}
                  onChange={(e) => updateStatValue(stat.id, parseInt(e.target.value) || 0)}
                  className="bg-black border border-diablo-gold/20 text-white text-[10px] p-1 mt-1"
                />
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={handleCreate}
        className="w-full diablo-button text-xs py-2 uppercase tracking-widest font-bold"
      >
        CREATE & EQUIP
      </button>
    </div>
  );
};
