import React from 'react';
import { useCharacterStore } from '../store/useCharacterStore';
import { calculateCharacterStats, FCR_BREAKPOINTS, FHR_BREAKPOINTS, getFrameFromBreakpoints } from '../utils/calc';

export const CharacterSheet: React.FC = () => {
  const { level, strength, dexterity, vitality, energy, equipment, charms, setStat, setLevel } = useCharacterStore();

  const stats = calculateCharacterStats(
    level,
    { str: strength, dex: dexterity, vit: vitality, enr: energy },
    equipment,
    charms
  );

  const StatRow = ({ label, value, onChange }: { label: string, value: number, onChange?: (v: number) => void }) => (
    <div className="flex justify-between items-center py-1 border-b border-diablo-gold/10">
      <span className="text-xs text-gray-400 uppercase">{label}</span>
      <div className="flex items-center">
        {onChange && (
            <button onClick={() => onChange(value - 1)} className="px-1 text-diablo-gold hover:text-white">-</button>
        )}
        <span className="text-sm font-bold w-12 text-center">{value}</span>
        {onChange && (
            <button onClick={() => onChange(value + 1)} className="px-1 text-diablo-gold hover:text-white">+</button>
        )}
      </div>
    </div>
  );

  const BreakpointRow = ({ label, value, breakpoints }: { label: string, value: number, breakpoints: number[] }) => {
    const nextBp = breakpoints.find(bp => bp > value);
    const frames = getFrameFromBreakpoints(value, breakpoints);
    return (
      <div className="py-2">
        <div className="flex justify-between text-xs mb-1">
          <span>{label}</span>
          <span className="text-diablo-gold font-bold">{value}%</span>
        </div>
        <div className="text-[10px] text-gray-500">
           Frames: {16 - frames} | Next BP: {nextBp ? `${nextBp}%` : 'MAX'}
        </div>
      </div>
    );
  };

  return (
    <div className="w-[300px] bg-diablo-panel p-4 border-r border-diablo-gold/30 overflow-y-auto font-serif">
      <h2 className="text-diablo-gold text-center text-lg font-bold mb-4 border-b border-diablo-gold/50 pb-2">ASSASSIN</h2>

      <div className="mb-6">
        <StatRow label="Level" value={level} onChange={setLevel} />
      </div>

      <div className="space-y-1 mb-8">
        <StatRow label="Strength" value={strength} onChange={(v) => setStat('strength', v)} />
        <StatRow label="Dexterity" value={dexterity} onChange={(v) => setStat('dexterity', v)} />
        <StatRow label="Vitality" value={vitality} onChange={(v) => setStat('vitality', v)} />
        <StatRow label="Energy" value={energy} onChange={(v) => setStat('energy', v)} />
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-red-500 font-bold">
          <span>LIFE</span>
          <span>{stats.life}</span>
        </div>
        <div className="flex justify-between text-blue-500 font-bold">
          <span>MANA</span>
          <span>{stats.mana}</span>
        </div>
        <div className="flex justify-between text-yellow-500 font-bold text-xs uppercase">
          <span>Defense</span>
          <span>{stats.defense}</span>
        </div>
      </div>

      <div className="border-t border-diablo-gold/20 pt-4">
        <h3 className="text-[10px] text-gray-500 font-bold uppercase mb-2">Breakpoints</h3>
        <BreakpointRow label="Faster Cast Rate" value={stats.fcr} breakpoints={FCR_BREAKPOINTS} />
        <BreakpointRow label="Faster Hit Recovery" value={stats.fhr} breakpoints={FHR_BREAKPOINTS} />
        <div className="flex justify-between text-xs py-2">
          <span>Increased Attack Speed</span>
          <span className="text-diablo-gold">{stats.ias}%</span>
        </div>
      </div>

      <div className="border-t border-diablo-gold/20 mt-4 pt-4">
        <h3 className="text-[10px] text-gray-500 font-bold uppercase mb-2">Resistances</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-red-600 text-xs">Fire: {stats.resistances.fire}%</div>
          <div className="text-blue-400 text-xs">Cold: {stats.resistances.cold}%</div>
          <div className="text-yellow-500 text-xs">Light: {stats.resistances.lightning}%</div>
          <div className="text-green-500 text-xs">Poison: {stats.resistances.poison}%</div>
        </div>
      </div>
    </div>
  );
};
