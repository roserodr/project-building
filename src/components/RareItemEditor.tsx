import React, { useState } from 'react';
import { useCharacterStore } from '../store/useCharacterStore';
import { allPossibleAffixes } from '../data/affixes';
import { baseItems } from '../data/items';
import type { Item, Stat, ItemRarity } from '../types';

export const RareItemEditor: React.FC = () => {
    const { setView, equipItem } = useCharacterStore();
    const [name, setName] = useState('My Godly Rare');
    const [selectedBase, setSelectedBase] = useState(baseItems[0]);
    const [selectedStats, setSelectedStats] = useState<Stat[]>([]);
    const [targetSlot, setTargetSlot] = useState('head');

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

    const handleEquip = () => {
        const newItem: Item = {
            id: `rare-${Date.now()}`,
            name: name,
            baseType: selectedBase.name,
            rarity: 'Rare' as ItemRarity,
            width: selectedBase.width,
            height: selectedBase.height,
            stats: selectedStats,
            requiredLevel: 1,
        };
        equipItem(targetSlot, newItem);
        setView('planner');
    };

    return (
        <div className="flex-1 p-8 bg-diablo-dark overflow-y-auto font-serif">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8 border-b border-diablo-gold/50 pb-4">
                    <h2 className="text-3xl font-bold text-diablo-rare uppercase tracking-tighter">Rare Item Factory</h2>
                    <button onClick={() => setView('planner')} className="text-gray-400 hover:text-white uppercase text-xs">Cancel</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left Panel: Basics */}
                    <div className="space-y-8">
                        <div>
                            <label className="block text-diablo-gold text-xs font-bold uppercase mb-2">Item Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-black border border-diablo-gold/30 text-diablo-rare p-3 text-lg font-bold"
                            />
                        </div>

                        <div>
                            <label className="block text-diablo-gold text-xs font-bold uppercase mb-2">Base Type</label>
                            <select
                                className="w-full bg-black border border-diablo-gold/30 p-3 text-white"
                                onChange={(e) => setSelectedBase(baseItems.find(b => b.name === e.target.value) || baseItems[0])}
                            >
                                {baseItems.map(b => <option key={b.name} value={b.name}>{b.name} ({b.type})</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-diablo-gold text-xs font-bold uppercase mb-2">Equip to Slot</label>
                            <select
                                className="w-full bg-black border border-diablo-gold/30 p-3 text-white"
                                onChange={(e) => setTargetSlot(e.target.value)}
                            >
                                <option value="head">Head</option>
                                <option value="body">Body</option>
                                <option value="mainhand">Main Hand</option>
                                <option value="offhand">Off Hand</option>
                                <option value="neck">Neck</option>
                                <option value="waist">Waist</option>
                                <option value="hands">Hands</option>
                                <option value="feet">Feet</option>
                                <option value="finger1">Ring 1</option>
                                <option value="finger2">Ring 2</option>
                            </select>
                        </div>

                        <div className="pt-8">
                            <button
                                onClick={handleEquip}
                                className="w-full diablo-button py-4 text-lg font-bold uppercase tracking-widest shadow-lg"
                            >
                                FORGE & EQUIP ITEM
                            </button>
                        </div>
                    </div>

                    {/* Right Panel: Affixes */}
                    <div className="bg-black/40 border border-diablo-gold/20 p-6 rounded-lg">
                        <h3 className="text-diablo-gold font-bold uppercase mb-4 border-b border-diablo-gold/20 pb-2">Select Affixes</h3>
                        <div className="grid grid-cols-1 gap-2 h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                            {allPossibleAffixes.map(stat => {
                                const isSelected = selectedStats.find(s => s.id === stat.id);
                                return (
                                    <div key={stat.id} className="flex flex-col border border-gray-800 p-2 rounded">
                                        <div className="flex justify-between items-center">
                                            <span className={`text-sm ${isSelected ? 'text-diablo-rare' : 'text-gray-500'}`}>{stat.name}</span>
                                            <input
                                                type="checkbox"
                                                checked={!!isSelected}
                                                onChange={() => toggleStat(stat)}
                                                className="accent-diablo-gold"
                                            />
                                        </div>
                                        {isSelected && (
                                            <div className="mt-2 flex items-center gap-2">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="500"
                                                    value={isSelected.value}
                                                    onChange={(e) => updateStatValue(stat.id, parseInt(e.target.value))}
                                                    className="flex-1 accent-diablo-rare"
                                                />
                                                <input
                                                    type="number"
                                                    value={isSelected.value}
                                                    onChange={(e) => updateStatValue(stat.id, parseInt(e.target.value))}
                                                    className="w-16 bg-black border border-diablo-gold/50 text-white text-right p-1 text-xs"
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Preview Tooltip */}
                <div className="mt-12 flex justify-center">
                    <div className="w-80 p-6 bg-black border-2 border-diablo-gold shadow-2xl text-center">
                        <div className="text-diablo-rare font-bold text-xl mb-1 uppercase">{name}</div>
                        <div className="text-gray-400 text-sm mb-4 uppercase">{selectedBase.name}</div>
                        <div className="space-y-1">
                            {selectedStats.map(s => (
                                <div key={s.id} className="text-blue-400 text-sm">
                                    {s.name} {s.type === 'percentage' ? `${s.value}%` : `+${s.value}`}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
