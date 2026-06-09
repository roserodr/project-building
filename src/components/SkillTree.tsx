import React, { useState, useRef } from 'react';
import { useCharacterStore } from '../store/useCharacterStore';
import { allSkills } from '../data/allSkills';
import type { Skill, SkillTab } from '../types';
import { getSkillLevel, calculateSkillDamage } from '../utils/calc';

export const SkillTree: React.FC = () => {
  const { skillPoints, allocateSkill, equipment, level, setLevel, characterClass } = useCharacterStore();
  const classSkills = allSkills[characterClass] || [];

  // Extract unique tabs for the current class
  const tabs: SkillTab[] = Array.from(new Set(classSkills.map(s => s.tab)));
  const [selectedTab, setSelectedTab] = useState<SkillTab>(tabs[0] || '');
  // Derive the active tab so a class change (which swaps the tab set) falls back
  // to the first tab without a setState-in-effect.
  const activeTab: SkillTab = tabs.includes(selectedTab) ? selectedTab : (tabs[0] || '');
  const setActiveTab = setSelectedTab;

  // Ref to the tree art container
  const gridRef = useRef<HTMLDivElement>(null);

  const handleSkillClick = (skill: Skill, isRightClick: boolean) => {
    const currentPoints = skillPoints[skill.id] || 0;
    const hasRequiredDependencies = skill.dependencies.every(dep => (skillPoints[dep] || 0) > 0);
    const isAvailable = level >= skill.reqLevel && hasRequiredDependencies;

    if (isRightClick) {
      if (currentPoints > 0) allocateSkill(skill.id, -1);
    } else if (isAvailable) {
      if (currentPoints < skill.maxLevel) {
        if (level < skill.reqLevel) {
          setLevel(skill.reqLevel);
        }
        allocateSkill(skill.id, 1);
      }
    }
  };

  const currentTabSkills = classSkills.filter(s => s.tab === activeTab);

  // D2 skill budget: 1 per level + 12 quest points (matches store auto-level logic)
  const totalSpent = classSkills.reduce((sum, s) => sum + (skillPoints[s.id] || 0), 0);
  const skillsRemaining = Math.max(0, level + 11 - totalSpent);


  return (
    <div className="flex flex-col h-full diablo-panel diablo-panel-ornate border-l border-[#3a2a12] p-4 w-[440px]">
      <div className="diablo-section-title text-sm tracking-[0.25em] text-glow-gold text-center mb-3">Skills</div>

      <div className="flex flex-row flex-1 min-h-0 items-center justify-center gap-0">
        {(() => {
          // Every class has baked PD2 tree art (stone + recessed slots + connector
          // arrows), assembled from skltree_<x>_back.dc6 by scripts/gen-tree-art.py
          // and keyed by class + tab slug. The generic-tree fallback below only runs
          // if there is no active tab (a class with no skills loaded).
          const tabSlug = String(activeTab).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
          const bg = activeTab ? `/ui/trees/${characterClass}/${tabSlug}.png` : undefined;
          const baked = bg !== undefined;

          // Per-tree slot-center grids (% of each 250x432 tree art). Each tree's baked
          // art positions its grid slightly differently, so they're calibrated separately.
          // Box centers calibrated to the baked PD2 tree art (the recessed boxes the
          // arrows connect to). Anchored on the lone clean box (blade_shield, col2/row5 =
          // 189,399 in 256-wide native art) with D2's symmetric uniform grid.
          // cols ÷250-crop, rows ÷432. All three Assassin trees share the same layout.
          // The generic grid is an even 3×6 spread used for the non-baked trees.
          const BAKED_COLS = ['15%', '43.3%', '70%'];
          const BAKED_ROWS = [8.8, 25, 40.1, 56.5, 71.8, 87.8];       // base row centers (%)
          const GENERIC_COLS = ['18%', '50%', '82%'];
          const GENERIC_ROWS = [9.5, 25.8, 42.1, 58.4, 74.7, 91];
          const COLS = baked ? BAKED_COLS : GENERIC_COLS;
          const ROWS = baked ? BAKED_ROWS : GENERIC_ROWS;
          const slotLeft = (c: number) => COLS[c] ?? COLS[COLS.length - 1];
          const slotTop = (_c: number, r: number) => `${ROWS[r] ?? ROWS[ROWS.length - 1]}%`;

          // D2-style prerequisite arrows for the generic trees, drawn in the art's
          // native 250×432 space (the container is locked to that aspect, so the SVG
          // scales uniformly — no stroke/arrowhead distortion). Routes parent→child
          // orthogonally (vertical then horizontal) with an arrowhead at the child,
          // mirroring the baked Assassin arrow style but generated from the data.
          const center = (col: number, row: number) => ({
            x: (parseFloat(GENERIC_COLS[col] ?? GENERIC_COLS[0]) / 100) * 250,
            y: ((ROWS[row] ?? ROWS[ROWS.length - 1]) / 100) * 432,
          });
          const buildArrows = () => currentTabSkills.flatMap(skill =>
            skill.dependencies.map(depId => {
              const dep = currentTabSkills.find(s => s.id === depId);
              if (!dep) return null;
              const p = center(dep.col ?? 0, dep.row ?? 0);
              const c = center(skill.col ?? 0, skill.row ?? 0);
              const sgnX = Math.sign(c.x - p.x);
              const sgnY = Math.sign(c.y - p.y) || 1;
              let dir: { x: number; y: number };
              let pts: number[][];
              if (Math.abs(c.x - p.x) < 1) {                 // straight vertical
                dir = { x: 0, y: sgnY };
                pts = [[p.x, p.y + 20 * sgnY], [c.x, c.y - 22 * sgnY]];
              } else if (Math.abs(c.y - p.y) < 1) {          // straight horizontal
                dir = { x: sgnX, y: 0 };
                pts = [[p.x + 20 * sgnX, p.y], [c.x - 22 * sgnX, c.y]];
              } else {                                        // vertical then horizontal
                dir = { x: sgnX, y: 0 };
                pts = [[p.x, p.y + 20 * sgnY], [p.x, c.y], [c.x - 22 * sgnX, c.y]];
              }
              const perp = { x: -dir.y, y: dir.x };
              const tip = [c.x - dir.x * 14, c.y - dir.y * 14];
              const base = [c.x - dir.x * 22, c.y - dir.y * 22];
              const head = [tip, [base[0] + perp.x * 6, base[1] + perp.y * 6], [base[0] - perp.x * 6, base[1] - perp.y * 6]];
              return {
                key: `${skill.id}-${depId}`,
                line: pts.map(pt => pt.join(',')).join(' '),
                head: head.map(pt => pt.join(',')).join(' '),
                met: (skillPoints[depId] || 0) > 0,
              };
            })
          ).filter((a): a is { key: string; line: string; head: string; met: boolean } => a !== null);
          return (
        <div className="flex items-center justify-center h-full min-w-0" style={{ position: 'relative', zIndex: 2 }}>
        <div ref={gridRef} className="relative"
          style={{
            height: '100%',
            maxWidth: '100%',
            aspectRatio: '250 / 432',
            backgroundImage: baked ? `url('${bg}')` : `url('/ui/stone_tile.png')`,
            backgroundSize: baked ? '100% 100%' : '128px',
            backgroundRepeat: baked ? 'no-repeat' : 'repeat',
            border: baked ? undefined : '2px solid #3a2a12',
            boxShadow: baked ? undefined : 'inset 0 0 40px rgba(0,0,0,0.8)',
          }}>
        {/* Prerequisite arrows between skills — baked trees already paint these. */}
        {!baked && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} preserveAspectRatio="none" viewBox="0 0 250 432">
            {buildArrows().map(a => (
              <g key={a.key}>
                <polyline points={a.line} fill="none" stroke="rgba(18,12,6,0.9)" strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />
                <polyline points={a.line} fill="none" stroke={a.met ? '#c8a050' : '#5a4a2a'} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
                <polygon points={a.head} fill={a.met ? '#c8a050' : '#5a4a2a'} stroke="rgba(18,12,6,0.9)" strokeWidth={1.5} strokeLinejoin="round" />
              </g>
            ))}
          </svg>
        )}
        {currentTabSkills.map(skill => {
          const points = skillPoints[skill.id] || 0;
          const totalLevel = getSkillLevel(skill.id, skillPoints, equipment);
          const hasRequiredDependencies = skill.dependencies.every(dep => (skillPoints[dep] || 0) > 0);
          const isAvailable = level >= skill.reqLevel && hasRequiredDependencies;
          const damage = calculateSkillDamage(skill, skillPoints, equipment);

          return (
            <div
              key={skill.id}
              className="absolute z-[1] hover:z-[100]"
              style={{
                left: slotLeft(skill.col ?? 0),
                top: slotTop(skill.col ?? 0, skill.row ?? 0),
                transform: 'translate(-50%, -50%)',
                width: '18.5%',
                aspectRatio: '1',
              }}
            >
              <div
                className="relative cursor-pointer group w-full h-full"
                onClick={() => handleSkillClick(skill, false)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleSkillClick(skill, true);
                }}
              >
              <div className={`flex items-center justify-center h-full w-full ${!isAvailable ? 'opacity-80 grayscale' : ''}`}
                style={!baked ? {
                  // Drawn slot frame for the generic (non-baked) trees.
                  background: 'radial-gradient(circle at 50% 40%, #2a2012 0%, #100b06 100%)',
                  border: `2px solid ${isAvailable ? '#c8a050' : '#5a4a2a'}`,
                  borderRadius: '6px',
                  boxShadow: isAvailable
                    ? '0 0 6px rgba(200,160,80,0.4), inset 0 0 6px rgba(0,0,0,0.8)'
                    : 'inset 0 0 6px rgba(0,0,0,0.8)',
                  padding: '8%',
                } : undefined}>
                {skill.iconCel !== undefined ? (
                  <img
                    src={`/skills/${characterClass.substring(0,2).toLowerCase()}skillicon_0_${skill.iconCel}.png`}
                    alt={skill.name}
                    className="w-full h-full object-contain"
                    style={{ filter: isAvailable ? 'none' : 'brightness(0.9)' }}
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      if (!img.dataset.fallback) {
                          img.dataset.fallback = '1';
                          img.src = `/skills/skillicon_0_${skill.iconCel}.png`;
                      } else {
                          img.style.display = 'none';
                          const textDiv = img.nextElementSibling as HTMLElement;
                          if (textDiv) textDiv.classList.remove('hidden');
                      }
                    }}
                  />
                ) : null}
                <div className={`text-[10px] text-center leading-tight ${skill.iconCel !== undefined ? 'hidden' : ''}`}>{skill.name}</div>
              </div>

              {/* D2-style skill tooltip */}
              <div className="invisible group-hover:visible absolute z-50 top-0 left-full lg:left-auto lg:right-full lg:mr-2 ml-2 lg:ml-0 w-72 pointer-events-none select-none"
                style={{
                  background: 'linear-gradient(160deg, #0e0905 0%, #070503 100%)',
                  border: '1px solid #6a5020',
                  boxShadow: '0 0 0 1px #1a1208, 0 8px 32px rgba(0,0,0,0.95)',
                  fontFamily: 'Georgia, "Palatino Linotype", serif',
                }}>

                {/* Skill name banner */}
                <div className="px-3 py-2 text-center" style={{ borderBottom: '1px solid #3a2a0e', background: 'linear-gradient(180deg, #1a1008 0%, #0e0905 100%)' }}>
                  <div className="text-sm font-bold tracking-wide" style={{ color: '#c8a050', textShadow: '0 0 8px rgba(200,160,80,0.4)', fontFamily: 'Cinzel, serif' }}>
                    {skill.name}
                  </div>
                </div>

                <div className="px-3 py-2">
                  {/* Req level + prereqs */}
                  <div className="text-[10px] mb-1" style={{ color: '#7a6030' }}>
                    Required Level: <span style={{ color: level >= skill.reqLevel ? '#c8a050' : '#c03030' }}>{skill.reqLevel}</span>
                  </div>
                  {skill.dependencies.length > 0 && (
                    <div className="text-[10px] mb-1" style={{ color: '#7a6030' }}>
                      Prerequisites:{' '}
                      {skill.dependencies.map((dep, i) => {
                        const depSkill = classSkills.find(s => s.id === dep);
                        const met = (skillPoints[dep] || 0) > 0;
                        return (
                          <span key={dep} style={{ color: met ? '#50a050' : '#c03030' }}>
                            {depSkill?.name || dep}{i < skill.dependencies.length - 1 ? ', ' : ''}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {/* Divider */}
                  <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #4a3818, transparent)', margin: '6px 0' }} />

                  {/* Description */}
                  <div className="text-[11px] leading-relaxed mb-2" style={{ color: '#c8b880', fontStyle: 'italic' }}>
                    {skill.description}
                  </div>

                  {/* Divider */}
                  <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #4a3818, transparent)', margin: '6px 0' }} />

                  {/* Current level */}
                  <div className="flex justify-between text-[11px] mb-1">
                    <span style={{ color: '#a09070' }}>Current Skill Level:</span>
                    <span style={{ color: points > 0 ? '#c8a050' : '#5a4a30' }}>{points}</span>
                  </div>
                  <div className="flex justify-between text-[11px] mb-2">
                    <span style={{ color: '#a09070' }}>Total (with +skills):</span>
                    <span style={{ color: totalLevel > points ? '#6090e0' : '#c8a050' }}>{totalLevel}</span>
                  </div>

                  {/* Damage */}
                  {damage.max > 0 && (
                    <>
                      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #4a3818, transparent)', margin: '6px 0' }} />
                      <div className="flex justify-between text-[11px]">
                        <span style={{ color: '#a09070' }}>Attack Damage:</span>
                        <span style={{ color: '#e08858' }}>{damage.min}–{damage.max}</span>
                      </div>
                    </>
                  )}

                  {/* Synergies */}
                  {skill.synergies && skill.synergies.length > 0 && (
                    <>
                      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #4a3818, transparent)', margin: '8px 0 6px' }} />
                      <div className="text-[9px] uppercase tracking-widest mb-1" style={{ color: '#6a5020' }}>Synergies</div>
                      <div className="space-y-0.5">
                        {skill.synergies.map(syn => {
                          const synSkill = classSkills.find(s => s.id === syn.skillId);
                          const pts = skillPoints[syn.skillId] || 0;
                          const bonus = pts * syn.valuePerLevel;
                          return (
                            <div key={syn.skillId} className="flex justify-between text-[10px]">
                              <span style={{ color: '#8a7850' }}>{synSkill?.name || syn.skillId}</span>
                              <span style={{ color: pts > 0 ? '#50c050' : '#3a3020' }}>+{bonus}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>
              </div>
              {/* Skill level number — sits in the small darker box baked into the
                  template art at the node's bottom-right corner. White D2 text. */}
              {points > 0 && (
                <div className="font-bold flex items-center justify-center" style={{
                  position: 'absolute',
                  left: '88%',
                  top: '92%',
                  width: '52%',
                  height: '34%',
                  transform: 'translate(-50%, -50%)',
                  color: '#ffffff',
                  fontSize: '12px',
                  lineHeight: 1,
                  textShadow: '0 0 2px #000, 0 1px 2px #000, 1px 0 2px #000, -1px 0 2px #000',
                  fontVariantNumeric: 'tabular-nums',
                  pointerEvents: 'none',
                  zIndex: 2,
                }}>
                  {points}
                </div>
              )}
            </div>
          );
        })}
        </div>
        </div>
          );
        })()}

        {/* Right column: the entire authentic D2 panel-edge art (box + 3 tabs) as one image,
            with the number and tab labels overlaid as clickable regions.
            Native art is 94x432; displayed at 1.15x. */}
        {(() => {
          // Native art is 94x432. Lay it out by height so it always fits the panel
          // (fixed-pixel sizing used to overflow and clip the bottom/selected tab).
          const NW = 94, NH = 432;
          const pctY = (y: number) => `${(y / NH) * 100}%`;
          // Native tab bands (top→bottom): Martial Arts, Shadow Disciplines, Traps
          const orderedTabs = [...tabs].reverse();
          const bands = [
            { top: 113, bottom: 210 },
            { top: 221, bottom: 318 },
            { top: 329, bottom: 426 },
          ];
          return (
            <div className="flex flex-col items-center flex-shrink-0" style={{ height: '100%', marginLeft: '-28px', position: 'relative', zIndex: 3 }}>
              <div className="relative" style={{ height: '100%', aspectRatio: `${NW} / ${NH}` }}>
                {(() => {
                  // Per-class tab column (chrome), baked from each skltree's chrome
                  // group by scripts/gen-tree-art.py. Fills to the left edge so it
                  // butts cleanly against the tree art (the generic tab_column.png
                  // had a black left margin that left a seam).
                  return (
                    <img src={`/ui/trees/${characterClass}/_tabs.png`} alt="" draggable={false}
                      style={{ width: '100%', height: '100%', imageRendering: 'pixelated' }} />
                  );
                })()}
                {/* "Skill Choices Remaining" label overlaid on the top box of the art */}
                <div className="absolute text-[7px] uppercase tracking-[0.12em] leading-[1.15] text-center" style={{
                  left: '8%', right: '8%', top: pctY(14),
                  color: '#c8b48a', textShadow: '0 1px 2px rgba(0,0,0,1)',
                }}>
                  Skill Choices Remaining
                </div>
                {/* number in the box recess (native recess center ~y62) */}
                <span className="absolute font-bold" style={{
                  left: 0, right: 0, top: pctY(62), textAlign: 'center',
                  color: skillsRemaining > 0 ? '#8a8aff' : '#6a5828',
                  fontSize: '15px', textShadow: '0 1px 2px rgba(0,0,0,1)', fontVariantNumeric: 'tabular-nums',
                }}>
                  {skillsRemaining}
                </span>
                {/* clickable tab regions with labels */}
                {orderedTabs.map((tab, i) => {
                  const b = bands[i];
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className="absolute flex items-center justify-center text-center text-[10px] uppercase tracking-[0.18em] leading-tight"
                      style={{
                        left: 0, right: 0,
                        top: pctY(b.top),
                        height: pctY(b.bottom - b.top),
                        padding: '0 6px',
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: isActive ? '#e8e2d4' : '#9a8a64',
                        textShadow: isActive
                          ? '0 0 8px rgba(255,255,255,0.35), 0 1px 3px #000'
                          : '0 1px 3px #000',
                      }}
                    >
                      <span style={{ position: 'relative' }}>{tab}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
