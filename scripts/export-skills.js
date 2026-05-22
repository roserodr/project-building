import fs from 'fs';
import { load } from 'cheerio';

const html = fs.readFileSync('scripts/All Skills - Project Diablo 2.html', 'utf8');
const $ = load(html);

const skillsData = {};
let currentHeading = null;

$('*').each((i, el) => {
    if ($(el).is('h1, h2, h3, h4')) {
        let text = $(el).text().trim();
        // Remove trailing tags like (Skill) or [edit]
        text = text.replace(/ \(Skill\)/g, '').replace(/\[edit\]/g, '').trim();
        currentHeading = text;
    } else if ($(el).is('table.wikitable')) {
        if (!currentHeading) return;

        let skillName = currentHeading;

        const rows = $(el).find('tr');
        if (!rows.length) return;

        const headers = $(rows[0]).find('th, td').map((i, el) => $(el).text().trim()).get();
        if (!headers.includes('Level')) return;

        const levels = [];
        for (let i = 1; i < headers.length; i++) {
            const val = parseInt(headers[i]);
            if (!isNaN(val)) levels.push(val);
        }
        if (!levels.length) return;

        const skillData = {};
        levels.forEach(l => skillData[l] = {});

        const damageKeywords = ['Damage', 'Fire Damage', 'Lightning Damage', 'Cold Damage', 'Poison Damage', 'Magic Damage', 'Physical Damage'];

        for (let i = 1; i < rows.length; i++) {
            const cells = $(rows[i]).find('th, td').map((i, el) => $(el).text().trim().replace(/\u00a0/g, ' ')).get();
            if (!cells.length) continue;

            const rowName = cells[0];
            const isMin = rowName.toLowerCase().includes('(min)');
            const isMax = rowName.toLowerCase().includes('(max)');
            const hasKeyword = damageKeywords.some(k => rowName.includes(k));

            if (isMin && hasKeyword) {
                levels.forEach((level, idx) => {
                    if (idx + 1 < cells.length) {
                        const val = parseFloat(cells[idx + 1].replace(/,/g, ''));
                        if (!isNaN(val)) skillData[level].minDamage = val;
                    }
                });
            } else if (isMax && hasKeyword) {
                levels.forEach((level, idx) => {
                    if (idx + 1 < cells.length) {
                        const val = parseFloat(cells[idx + 1].replace(/,/g, ''));
                        if (!isNaN(val)) skillData[level].maxDamage = val;
                    }
                });
            } else if (hasKeyword && !isMin && !isMax) {
                let hasRange = false;
                for(let j=1; j < cells.length; j++) {
                    if (cells[j].includes('-')) {
                        hasRange = true;
                        break;
                    }
                }
                if (hasRange) {
                    levels.forEach((level, idx) => {
                        if (idx + 1 < cells.length) {
                            const parts = cells[idx + 1].replace(/,/g, '').split('-');
                            if (parts.length === 2) {
                                const min = parseFloat(parts[0].trim());
                                const max = parseFloat(parts[1].trim());
                                if (!isNaN(min) && !isNaN(max)) {
                                    skillData[level].minDamage = min;
                                    skillData[level].maxDamage = max;
                                }
                            }
                        }
                    });
                }
            }
        }

        for (const key in skillData) {
            if (Object.keys(skillData[key]).length === 0) {
                delete skillData[key];
            }
        }

        if (Object.keys(skillData).length > 0) {
            skillsData[skillName] = skillData;
        }
    }
});

let tsOutput = `export const skillsLevelData: Record<string, Record<number, { minDamage?: number; maxDamage?: number; }>> = ${JSON.stringify(skillsData, null, 2)};\n`;
fs.writeFileSync('src/data/skillsLevelData.ts', tsOutput);
console.log('Saved all skills level data to src/data/skillsLevelData.ts, found ' + Object.keys(skillsData).length + ' skills');
