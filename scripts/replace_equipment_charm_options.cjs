const fs = require('fs');

const path = 'src/components/Equipment.tsx';
let content = fs.readFileSync(path, 'utf8');

const search = `  const charmOptions: Item[] = [
    { id: 'sc_life', name: 'Small Charm of Life', baseType: 'Small Charm', rarity: 'Magic', width: 1, height: 1, requiredLevel: 1, stats: [{ id: 'life', name: '+20 to Life', value: 20, type: 'flat' }] },
    { id: 'sc_res', name: 'Small Charm of Vita', baseType: 'Small Charm', rarity: 'Magic', width: 1, height: 1, requiredLevel: 1, stats: [{ id: 'all_res', name: '+5 to All Resistances', value: 5, type: 'flat' }] },
    { id: 'lc_life', name: 'Large Charm of Life', baseType: 'Large Charm', rarity: 'Magic', width: 1, height: 2, requiredLevel: 1, stats: [{ id: 'life', name: '+35 to Life', value: 35, type: 'flat' }] },
    { id: 'gc_skiller', name: 'Grand Charm of Vita', baseType: 'Grand Charm', rarity: 'Magic', width: 1, height: 3, requiredLevel: 1, stats: [{ id: 'assassin_skills', name: '+1 to Assassin Skills', value: 1, type: 'flat' }, { id: 'life', name: '+45 to Life', value: 45, type: 'flat' }] },
  ];`;

const replace = `  const charmOptions: Item[] = [
    { id: 'sc_life', name: 'Small Charm of Life', baseType: 'Small Charm', rarity: 'Magic', width: 1, height: 1, requiredLevel: 1, imageFile: 'invcm1', stats: [{ id: 'life', name: '+20 to Life', value: 20, type: 'flat' }] },
    { id: 'sc_res', name: 'Small Charm of Vita', baseType: 'Small Charm', rarity: 'Magic', width: 1, height: 1, requiredLevel: 1, imageFile: 'invcm1', stats: [{ id: 'all_res', name: '+5 to All Resistances', value: 5, type: 'flat' }] },
    { id: 'lc_life', name: 'Large Charm of Life', baseType: 'Large Charm', rarity: 'Magic', width: 1, height: 2, requiredLevel: 1, imageFile: 'invcm2', stats: [{ id: 'life', name: '+35 to Life', value: 35, type: 'flat' }] },
    { id: 'gc_skiller', name: 'Grand Charm of Vita', baseType: 'Grand Charm', rarity: 'Magic', width: 1, height: 3, requiredLevel: 1, imageFile: 'invcm3', stats: [{ id: 'assassin_skills', name: '+1 to Assassin Skills', value: 1, type: 'flat' }, { id: 'life', name: '+45 to Life', value: 45, type: 'flat' }] },
  ];`;

if (content.includes(search)) {
    content = content.replace(search, replace);
    fs.writeFileSync(path, content, 'utf8');
    console.log("Successfully updated Equipment.tsx (Charm Options)");
} else {
    console.log("Could not find search string in Equipment.tsx (Charm Options)");
}
