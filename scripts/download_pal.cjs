const fs = require('fs');

async function downloadPal() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/fabd/diablo2/master/data/global/palette/ACT1/pal.dat");
        if (response.ok) {
            const buffer = await response.arrayBuffer();
            fs.writeFileSync('gamedata/pal.dat', Buffer.from(buffer));
            console.log("Downloaded pal.dat successfully!");
        } else {
            console.log("Failed to fetch", response.status);
        }
    } catch(e) {
        console.log(e);
    }
}
downloadPal();
