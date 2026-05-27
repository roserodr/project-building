import { create } from 'zustand';
import type { CharacterClass } from '../types';

interface CharacterState {
  characterClass: CharacterClass;
  level: number;
  strength: number;
  dexterity: number;
  vitality: number;
  energy: number;
  skillPoints: Record<string, number>;
  equipment: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  charms: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  activeView: 'planner' | 'rare-editor';

  setLevel: (level: number) => void;
  setStat: (stat: 'strength' | 'dexterity' | 'vitality' | 'energy', value: number) => void;
  allocateSkill: (skillId: string, amount: number) => void;
  equipItem: (slot: string, item: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  unequipItem: (slot: string) => void;
  equipCharm: (slot: string, charm: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  unequipCharm: (slot: string) => void;
  setClass: (charClass: CharacterClass, baseStats: { strength: number; dexterity: number; vitality: number; energy: number }) => void;
  setView: (view: 'planner' | 'rare-editor') => void;
  loadBuild: (data: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const useCharacterStore = create<CharacterState>((set) => ({
  characterClass: 'Assassin',
  level: 1,
  strength: 20,
  dexterity: 20,
  vitality: 20,
  energy: 15,
  skillPoints: {},
  equipment: {},
  charms: {},
  activeView: 'planner',

  setLevel: (level) => set({ level: Math.max(1, Math.min(99, level)) }),
  setStat: (stat, value) => set((state) => ({ ...state, [stat]: Math.max(0, value) })),
  allocateSkill: (skillId, amount) => set((state) => {
    const currentPoints = state.skillPoints[skillId] || 0;
    const newPoints = Math.max(0, currentPoints + amount);

    // Auto-level logic based on total skill points
    const totalPoints = Object.values({ ...state.skillPoints, [skillId]: newPoints }).reduce((a, b) => a + b, 0);
    const requiredLevel = Math.max(state.level, totalPoints - 11); // Start level 1, +12 quest points

    return {
      level: Math.min(99, requiredLevel),
      skillPoints: {
        ...state.skillPoints,
        [skillId]: newPoints,
      },
    };
  }),
  equipItem: (slot, item) => set((state) => ({
    equipment: {
      ...state.equipment,
      [slot]: item,
    },
  })),
  unequipItem: (slot) => set((state) => {
    const newEquipment = { ...state.equipment };
    delete newEquipment[slot];
    return { equipment: newEquipment };
  }),
  equipCharm: (slot, charm) => set((state) => ({
    charms: {
        ...state.charms,
        [slot]: charm
    }
  })),
  unequipCharm: (slot) => set((state) => {
      const newCharms = { ...state.charms };
      delete newCharms[slot];
      return { charms: newCharms };
  }),
  setClass: (charClass, baseStats) => set({
    characterClass: charClass,
    level: 1,
    strength: baseStats.strength,
    dexterity: baseStats.dex,
    vitality: baseStats.vitality,
    energy: baseStats.energy,
    skillPoints: {},
    equipment: {},
    charms: {}
  }),
  setView: (view) => set({ activeView: view }),
  loadBuild: (data) => set((state) => ({ ...state, ...data })),
}));
