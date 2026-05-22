import fs from 'fs';
import { load } from 'cheerio';

const html = fs.readFileSync('scripts/All Skills - Project Diablo 2.html', 'utf8');
const $ = load(html);

const headings = $('h1, h2, h3, h4');
let currentHeading = null;
const tablesData = [];

// Iterate through body elements sequentially to track headings
$('*').each((i, el) => {
    if ($(el).is('h1, h2, h3, h4')) {
        currentHeading = $(el).text().trim();
    } else if ($(el).is('table.wikitable')) {
        if (currentHeading) {
            tablesData.push({ heading: currentHeading, table: el });
        }
    }
});

console.log(tablesData.slice(0, 5).map(t => t.heading));
