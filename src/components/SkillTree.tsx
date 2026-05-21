import React, { useState } from 'react';
import { useCharacterStore } from '../store/useCharacterStore';
import { assassinSkills } from '../data/assassinSkills';
import type { Skill, SkillTab } from '../types';
import { getSkillLevel, calculateSkillDamage } from '../utils/calc';

export const SkillTree: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SkillTab>('Traps');
  const { skillPoints, allocateSkill, equipment, level, setLevel } = useCharacterStore();

  const tabs: SkillTab[] = ['Traps', 'Shadow Disciplines', 'Martial Arts'];

  const handleSkillClick = (skill: Skill, isRightClick: boolean) => {
    const currentPoints = skillPoints[skill.id] || 0;

    if (isRightClick) {
      if (currentPoints > 0) allocateSkill(skill.id, -1);
    } else {
      if (currentPoints < skill.maxLevel) {
        if (level < skill.reqLevel) {
          setLevel(skill.reqLevel);
        }
        allocateSkill(skill.id, 1);
      }
    }
  };

  const currentTabSkills = assassinSkills.filter(s => s.tab === activeTab);

  return (
    <div className="flex flex-col h-full bg-diablo-dark border-l border-diablo-gold/30 p-4 w-[400px] font-serif">
      <div className="flex justify-between mb-4">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2 py-1 text-xs border ${
              activeTab === tab ? 'bg-diablo-gold text-black border-white' : 'border-diablo-gold text-diablo-gold'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="relative flex-grow bg-black/50 border border-diablo-gold/20 p-4 grid grid-cols-3 grid-rows-6 gap-4">
        {currentTabSkills.map(skill => {
          const points = skillPoints[skill.id] || 0;
          const totalLevel = getSkillLevel(skill.id, skillPoints, equipment);
          const isAvailable = level >= skill.reqLevel;
          const damage = calculateSkillDamage(skill, skillPoints, equipment);

          return (
            <div
              key={skill.id}
              className={`relative skill-slot flex items-center justify-center cursor-pointer group ${
                !isAvailable ? 'opacity-40 grayscale' : ''
              }`}
              style={{ gridRow: (skill.row ?? 0) + 1, gridColumn: (skill.col ?? 0) + 1 }}
              onClick={() => handleSkillClick(skill, false)}
              onContextMenu={(e) => {
                e.preventDefault();
                handleSkillClick(skill, true);
              }}
            >
              <div className="text-[10px] text-center leading-tight">{skill.name}</div>

              <div className="absolute -bottom-2 -right-2 bg-black border border-diablo-gold text-[10px] px-1">
                {points}
              </div>

              <div className="invisible group-hover:visible absolute z-50 left-full ml-2 w-72 p-4 bg-black border-2 border-diablo-gold text-sm shadow-2xl pointer-events-none">
                <div className="text-diablo-gold font-bold mb-1 uppercase tracking-tighter text-base">{skill.name}</div>
                <div className="text-[10px] text-gray-500 mb-2 uppercase">Required Level: {skill.reqLevel}</div>
                <div className="text-xs mb-3 text-white italic">"{skill.description}"</div>

                <div className="flex justify-between items-center bg-blue-900/20 p-2 mb-3 border border-blue-900/30">
                    <span className="text-blue-400 text-xs uppercase font-bold">Total Level:</span>
                    <span className="text-blue-400 font-bold">{totalLevel}</span>
                </div>

                {damage.max > 0 && (
                    <div className="bg-red-900/20 p-2 border border-red-900/30 mb-3">
                        <div className="text-red-500 text-[10px] uppercase font-bold mb-1">Estimated Damage:</div>
                        <div className="text-red-500 text-lg font-bold">
                            {damage.min} - {damage.max}
                        </div>
                    </div>
                )}

                {skill.synergies && skill.synergies.length > 0 && (
                  <div className="mt-2 pt-3 border-t border-diablo-gold/30">
                    <div className="text-[10px] font-bold text-diablo-gold uppercase mb-2 tracking-widest">Synergies:</div>
                    <div className="space-y-1">
                        {skill.synergies.map(syn => {
                            const synSkill = assassinSkills.find(s => s.id === syn.skillId);
                            const currentSynPoints = skillPoints[syn.skillId] || 0;
                            return (
                                <div key={syn.skillId} className="text-[10px] flex justify-between items-center">
                                    <span className="text-gray-400 italic">{synSkill?.name || syn.skillId}:</span>
                                    <span className={currentSynPoints > 0 ? "text-green-500 font-bold" : "text-gray-600"}>
                                        +{currentSynPoints * syn.valuePerLevel}%
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
