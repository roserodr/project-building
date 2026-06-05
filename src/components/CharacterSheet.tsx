import React from 'react';
import { useCharacterStore } from '../store/useCharacterStore';
import { calculateCharacterStats, FCR_BREAKPOINTS, FHR_BREAKPOINTS, FBR_BREAKPOINTS, getFrameFromBreakpoints } from '../utils/calc';

// Authentic PD2 character panel art (char_panel.png, native 320x432).
const PW = 320, PH = 432;
const px = (x: number, y: number, w: number, h: number): React.CSSProperties => ({
  position: 'absolute',
  left: `${(x / PW) * 100}%`, top: `${(y / PH) * 100}%`,
  width: `${(w / PW) * 100}%`, height: `${(h / PH) * 100}%`,
});

// D2 character-screen "+" button (authentic game asset: /ui/btn.png)
const PlusBtn = ({ onAdd, onSubtract }: { onAdd: (n: number) => void; onSubtract: (n: number) => void }) => (
  <button
    onClick={(e) => { const n = e.shiftKey ? 5 : 1; e.ctrlKey ? onSubtract(n) : onAdd(n); }}
    title="Click +1 · Shift+Click +5 · Ctrl+Click −1 · Ctrl+Shift+Click −5"
    className="relative flex items-center justify-center active:brightness-75"
    style={{ width: '100%', height: '100%', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
  >
    <img src="/ui/btn.png" alt="" draggable={false} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', imageRendering: 'pixelated', filter: 'brightness(0.7)' }} />
    <span style={{ position: 'relative', color: '#fffde0', fontSize: 13, fontWeight: 'bold', lineHeight: 1, textShadow: '0 1px 2px rgba(0,0,0,0.9)', marginTop: -1, pointerEvents: 'none' }}>+</span>
  </button>
);

const BreakpointRow = ({ label, value, breakpoints, baseFrames }: { label: string, value: number, breakpoints: number[], baseFrames: number }) => {
  const nextBp = breakpoints.find(bp => bp > value);
  const framesIdx = getFrameFromBreakpoints(value, breakpoints);
  return (
    <div className="py-1">
      <div className="flex justify-between text-[10px] mb-0.5">
        <span style={{ color: '#c0aa80' }}>{label}</span>
        <span className="font-bold" style={{ color: '#e8c060' }}>{value}%</span>
      </div>
      <div className="text-[9px]" style={{ color: '#8a7850' }}>
        Frames: <span style={{ color: '#a09060' }}>{baseFrames - framesIdx}</span>
        &ensp;·&ensp;Next BP: <span style={{ color: '#a09060' }}>{nextBp !== undefined ? `${nextBp}%` : 'MAX'}</span>
      </div>
    </div>
  );
};

const Num = ({ children, color = '#e8e0d0', size = 13 }: { children: React.ReactNode; color?: string; size?: number }) => (
  <span style={{ color, fontSize: size, fontWeight: 'bold', textShadow: '0 1px 2px #000', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{children}</span>
);

export const CharacterSheet: React.FC = () => {
  const { level, strength, dexterity, vitality, energy, equipment, charms, setStat, setLevel } = useCharacterStore();
  const { skillPoints } = useCharacterStore();
  const stats = calculateCharacterStats(
    "Assassin", level,
    { str: strength, dex: dexterity, vit: vitality, energy: energy },
    skillPoints, equipment, charms
  );

  // stat points: 5 per level after 1 + 15 from quests, minus what's been spent over base
  const baseStats = { strength: 20, dexterity: 20, vitality: 20, energy: 25 };
  const spent = (strength - baseStats.strength) + (dexterity - baseStats.dexterity) + (vitality - baseStats.vitality) + (energy - baseStats.energy);
  const statPointsRemaining = Math.max(0, (level - 1) * 5 + 15 - spent);
  const stamina = 95 + (level - 1) + vitality; // approximate D2 stamina

  // Attribute row: label box + value box + red plus button
  const AttrRow = ({ y, label, base, total, onChange }: { y: number; label: string; base: number; total: number; onChange: (v: number) => void }) => {
    const boosted = total !== base;
    return (
      <>
        <div style={px(10, y, 64, 18)} className="flex items-center justify-center">
          <span className="text-[11px] uppercase tracking-wide font-bold" style={{ color: '#e8e0d0', textShadow: '0 1px 3px #000' }}>{label}</span>
        </div>
        <div style={px(76, y, 39, 18)} className="flex items-center justify-center">
          <Num color={boosted ? '#6cb4ff' : '#8a8aff'} size={15}>{total}</Num>
        </div>
        <div style={px(122, y - 4, 26, 26)}><PlusBtn onAdd={(n) => onChange(base + n)} onSubtract={(n) => onChange(base - n)} /></div>
      </>
    );
  };

  // Single-value right stat (label right-aligned in left cell, value in right cell)
  const RightStat = ({ y, label, value, color }: { y: number; label: string; value: React.ReactNode; color?: string }) => (
    <>
      <div style={px(161, y, 88, 18)} className="flex items-center justify-end pr-2">
        <span className="text-[10px] uppercase tracking-wide font-bold" style={{ color: '#e8e0d0', textShadow: '0 1px 2px #000' }}>{label}</span>
      </div>
      <div style={px(251, y, 56, 18)} className="flex items-center justify-center">
        <Num color={color}>{value}</Num>
      </div>
    </>
  );

  // Two-value right stat: label + current(blue) + max(white)
  const RightStat2 = ({ y, label, cur, max }: { y: number; label: string; cur: number; max: number }) => (
    <>
      <div style={px(161, y, 70, 18)} className="flex items-center justify-end pr-1.5">
        <span className="text-[10px] uppercase tracking-wide font-bold" style={{ color: '#e8e0d0', textShadow: '0 1px 2px #000' }}>{label}</span>
      </div>
      <div style={px(233, y, 40, 18)} className="flex items-center justify-center"><Num color="#8a8aff">{cur}</Num></div>
      <div style={px(273, y, 34, 18)} className="flex items-center justify-center"><Num>{max}</Num></div>
    </>
  );

  return (
    <div className="w-[340px] flex flex-col h-full overflow-y-auto custom-scrollbar diablo-panel border-r border-[#3a2a12]">
      <div className="relative mx-auto" style={{ width: '100%', maxWidth: PW, aspectRatio: `${PW} / ${PH}` }}>
        <img src="/ui/char_panel.png" alt="" draggable={false} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', imageRendering: 'pixelated' }} />

        {/* Name + Class */}
        <div style={px(10, 7, 172, 21)} className="flex items-center justify-center">
          <span className="text-xs uppercase tracking-[0.18em] font-bold" style={{ color: '#e8c878', textShadow: '0 1px 3px #000', fontFamily: 'Cinzel, serif' }}>Assassin</span>
        </div>
        <div style={px(190, 7, 120, 21)} className="flex items-center justify-center">
          <span className="text-xs uppercase tracking-[0.14em] font-bold" style={{ color: '#e8c878', textShadow: '0 1px 3px #000', fontFamily: 'Cinzel, serif' }}>Assassin</span>
        </div>

        {/* Level / Experience / Next Level */}
        <div style={px(10, 33, 44, 33)} className="flex flex-col items-center justify-center leading-none gap-0.5">
          <span className="text-[8px] uppercase" style={{ color: '#a89060' }}>Level</span>
          <div className="flex items-center gap-1">
            <Num size={13}>{level}</Num>
            <div style={{ width: 13, height: 13 }}><PlusBtn onAdd={(n) => setLevel(level + n)} onSubtract={(n) => setLevel(level - n)} /></div>
          </div>
        </div>
        <div style={px(66, 33, 116, 33)} className="flex flex-col items-center justify-center leading-none">
          <span className="text-[8px] uppercase" style={{ color: '#a89060' }}>Experience</span>
          <Num size={12} color="#c8c0b0">—</Num>
        </div>
        <div style={px(192, 33, 118, 33)} className="flex flex-col items-center justify-center leading-none">
          <span className="text-[8px] uppercase" style={{ color: '#a89060' }}>Next Level</span>
          <Num size={12} color="#c8c0b0">—</Num>
        </div>

        {/* Attributes */}
        <AttrRow y={83}  label="Strength"  base={strength}  total={stats.totalStr}    onChange={(v) => setStat('strength', v)} />
        <AttrRow y={145} label="Dexterity" base={dexterity} total={stats.totalDex}    onChange={(v) => setStat('dexterity', v)} />
        <AttrRow y={231} label="Vitality"  base={vitality}  total={stats.totalVit}    onChange={(v) => setStat('vitality', v)} />
        <AttrRow y={293} label="Energy"    base={energy}    total={stats.totalEnergy} onChange={(v) => setStat('energy', v)} />

        {/* Stat points remaining */}
        <div style={px(10, 360, 110, 30)} className="flex items-center justify-center text-center leading-none">
          <span className="text-[9px] uppercase font-bold" style={{ color: '#d06030', textShadow: '0 1px 2px #000' }}>Stat Points<br/>Remaining</span>
        </div>
        <div style={px(124, 364, 44, 22)} className="flex items-center justify-center">
          <Num size={14}>{statPointsRemaining}</Num>
        </div>

        {/* Right column */}
        <RightStat  y={193} label="Defense" value={stats.defense} />
        <RightStat2 y={231} label="Stamina" cur={stamina}    max={stamina} />
        <RightStat2 y={255} label="Life"    cur={stats.life}  max={stats.life} />
        <RightStat2 y={293} label="Mana"    cur={stats.mana}  max={stats.mana} />

        {/* Resistances */}
        {[
          { label: 'Fire',      val: stats.resistances.fire,      y: 332 },
          { label: 'Cold',      val: stats.resistances.cold,      y: 356 },
          { label: 'Lightning', val: stats.resistances.lightning, y: 380 },
          { label: 'Poison',    val: stats.resistances.poison,    y: 404 },
        ].map(r => (
          <React.Fragment key={r.label}>
            <div style={px(174, r.y, 96, 22)} className="flex items-center justify-center text-center leading-[1.05]">
              <span className="text-[8px] uppercase font-bold" style={{ color: '#e8e0d0', textShadow: '0 1px 2px #000' }}>{r.label}<br/>Resistance</span>
            </div>
            <div style={px(270, r.y, 38, 22)} className="flex items-center justify-center">
              <Num color={r.val < 0 ? '#ff5050' : r.val >= 75 ? '#e8c060' : '#e8e0d0'}>{r.val}</Num>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Extra planner values not on the D2 panel */}
      <div className="px-4 py-3 mt-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(200,160,80,0.5))' }} />
          <span className="text-[9px] uppercase tracking-[0.25em]" style={{ color: '#c8a050' }}>Breakpoints</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(200,160,80,0.5))' }} />
        </div>
        <div className="px-2 py-1 rounded" style={{ background: 'rgba(0,0,0,0.45)' }}>
          <BreakpointRow label="Faster Cast Rate"     value={stats.fcr} breakpoints={FCR_BREAKPOINTS["Assassin"]} baseFrames={16} />
          <BreakpointRow label="Faster Hit Recovery"  value={stats.fhr} breakpoints={FHR_BREAKPOINTS["Assassin"]} baseFrames={9} />
          <BreakpointRow label="Faster Block Rate"    value={stats.fbr} breakpoints={FBR_BREAKPOINTS["Assassin"]} baseFrames={5} />
          <div className="flex justify-between text-[10px] pt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ color: '#c0aa80' }}>Damage</span>
            <span className="font-bold" style={{ color: '#f0a050' }}>{stats.damage.min}–{stats.damage.max}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
