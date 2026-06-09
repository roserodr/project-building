import { CharacterSheet } from './components/CharacterSheet';
import { Equipment } from './components/Equipment';
import { SkillTree } from './components/SkillTree';
import { RareItemEditor } from './components/RareItemEditor';
import { useCharacterStore } from './store/useCharacterStore';
import { useEffect } from 'react';
import { wikiUniqueItems } from './data/projectDiablo2Items';
import { CLASS_STATS } from './data/classes';
import type { CharacterClass, Item, Stat } from './types';

const CHARACTER_CLASSES = Object.keys(CLASS_STATS) as CharacterClass[];

// Compact shape encoded into the shareable build hash.
interface SharedBuild {
  l?: number;
  s?: { str?: number; dex?: number; vit?: number; enr?: number };
  sk?: Record<string, number>;
  eq?: Record<string, { id?: string; c?: Stat; r?: Item; isC?: boolean }>;
}

function App() {
  const { activeView, setView, ...state } = useCharacterStore();

  const handleShare = () => {
    const buildData = {
      l: state.level,
      s: { str: state.strength, dex: state.dexterity, vit: state.vitality, enr: state.energy },
      sk: state.skillPoints,
      eq: Object.entries(state.equipment).reduce((acc, [slot, item]) => ({
        ...acc,
        [slot]: {
            id: item.id,
            c: item.corruptionStat,
            r: item.rarity === 'Rare' ? item : undefined,
            isC: item.isCorrupted
        }
      }), {})
    };
    const hash = btoa(JSON.stringify(buildData));
    window.location.hash = hash;

    // Copy to clipboard
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert("Build URL copied to clipboard!");
    }).catch(() => { /* clipboard unavailable */ });
  };

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      try {
        const decoded = JSON.parse(atob(hash)) as SharedBuild;
        state.loadBuild({
            level: decoded.l || 1,
            strength: decoded.s?.str || 20,
            dexterity: decoded.s?.dex || 20,
            vitality: decoded.s?.vit || 20,
            energy: decoded.s?.enr || 15,
            skillPoints: decoded.sk || {},
            equipment: Object.entries(decoded.eq || {}).reduce<Record<string, Item>>((acc, [slot, data]) => {
                let item = wikiUniqueItems.find(i => i.id === data.id);
                if (!item && data.r) item = data.r;
                if (item) {
                    const finalItem = { ...item };
                    if (data.isC) finalItem.isCorrupted = true;
                    if (data.c) finalItem.corruptionStat = data.c;
                    return { ...acc, [slot]: finalItem };
                }
                return acc;
            }, {})
        });
      } catch (e) {
        console.error("Failed to load build from hash", e);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden diablo-bg text-diablo-gold font-serif">
      <header className="fixed top-0 left-0 right-0 h-14 z-50 flex items-center justify-between px-6"
        style={{
          background: 'linear-gradient(180deg, #1c1208 0%, #0e0905 60%, #080503 100%)',
          borderBottom: '1px solid #5a421e',
          boxShadow: '0 4px 24px rgba(0,0,0,0.8), inset 0 1px 0 rgba(200,160,80,0.07)',
        }}>
        <div className="flex items-center gap-3">
          <div className="w-0.5 h-8 bg-gradient-to-b from-transparent via-[#c8a050] to-transparent opacity-60" />
          <h1 className="diablo-section-title text-xl tracking-[0.28em] text-glow-gold">
            PD2 Planner
          </h1>
          <span className="text-[8px] text-[#7a6030] font-normal tracking-widest ml-1 mt-1 uppercase">Season 13</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-transparent via-[#c8a050] to-transparent opacity-60" />
          <select
            value={state.characterClass}
            onChange={(e) => {
              const cls = e.target.value as CharacterClass;
              state.setClass(cls, CLASS_STATS[cls]);
            }}
            className="diablo-button text-[10px] uppercase tracking-[0.18em] bg-transparent cursor-pointer"
            style={{ color: '#e8c878' }}
            aria-label="Character class"
          >
            {CHARACTER_CLASSES.map((c) => (
              <option key={c} value={c} style={{ color: '#000' }}>{c}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-3">
            <button
                onClick={() => setView(activeView === 'planner' ? 'rare-editor' : 'planner')}
                className={`diablo-button text-[10px] ${activeView === 'rare-editor' ? 'border-[#e0e000] text-[#e0e000]' : ''}`}
            >
                {activeView === 'planner' ? 'Rare Editor' : '← Back to Planner'}
            </button>
            <button
                onClick={handleShare}
                className="diablo-button text-[10px]"
            >
                Share Build
            </button>
        </div>
      </header>

      <main className="flex flex-1 pt-14 gap-4 p-4 overflow-hidden">
        {activeView === 'planner' ? (
            <>
                <CharacterSheet />
                <div className="flex-1 flex justify-center items-stretch overflow-auto custom-scrollbar">
                    <Equipment />
                </div>
                <SkillTree />
            </>
        ) : (
            <RareItemEditor />
        )}
      </main>
    </div>
  );
}

export default App;
