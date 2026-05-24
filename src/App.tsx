import { CharacterSheet } from './components/CharacterSheet';
import { Equipment } from './components/Equipment';
import { SkillTree } from './components/SkillTree';
import { RareItemEditor } from './components/RareItemEditor';
import { useCharacterStore } from './store/useCharacterStore';
import { useEffect } from 'react';
import { wikiUniqueItems } from './data/projectDiablo2Items';

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
    });
  };

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      try {
        const decoded = JSON.parse(atob(hash));
        state.loadBuild({
            level: decoded.l || 1,
            strength: decoded.s?.str || 20,
            dexterity: decoded.s?.dex || 20,
            vitality: decoded.s?.vit || 20,
            energy: decoded.s?.enr || 15,
            skillPoints: decoded.sk || {},
            equipment: Object.entries(decoded.eq || {}).reduce((acc, [slot, data]: [string, any]) => { // eslint-disable-line @typescript-eslint/no-explicit-any
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
      <header className="fixed top-0 left-0 right-0 h-14 diablo-panel diablo-border border-b flex items-center justify-between px-6 z-50 shadow-[0_25px_35px_rgba(0,0,0,0.55)]">
        <h1 className="text-2xl font-bold tracking-[0.24em] uppercase">
          PD2 PLANNER <span className="text-[9px] text-gray-400 font-normal ml-3 align-super">SEASON 13</span>
        </h1>
        <div className="flex gap-3">
            <button
                onClick={() => setView(activeView === 'planner' ? 'rare-editor' : 'planner')}
                className={`diablo-button text-xs uppercase tracking-[0.28em] ${activeView === 'rare-editor' ? 'bg-diablo-rare/30 border-diablo-rare text-black' : ''}`}
            >
                {activeView === 'planner' ? 'Rare Editor' : 'Back to Planner'}
            </button>
            <button
                onClick={handleShare}
                className="diablo-button text-xs uppercase tracking-[0.28em]"
            >
                Share Build
            </button>
        </div>
      </header>

      <main className="flex flex-1 pt-14 gap-4 p-4 overflow-hidden">
        {activeView === 'planner' ? (
            <>
                <CharacterSheet />
                <div className="flex-1 flex justify-center items-center overflow-auto">
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
