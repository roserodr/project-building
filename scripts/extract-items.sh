#!/bin/bash
set -e
mkdir -p src/assets/items
find gamedata/gamedata/d2data/items -name "inv*.DC6" -o -name "inv*.dc6" -o -name "flp*.dc6" -o -name "flp*.DC6" | while read -r file; do
    basename=$(basename "$file" | cut -d. -f1)
    npx dc6png -p gamedata/gamedata/d2data/items/brown.dat -f "$file" > /dev/null 2>&1
    if [ -f "gamedata/gamedata/d2data/items/${basename}_0_0.png" ]; then
        mv "gamedata/gamedata/d2data/items/${basename}_0_0.png" "src/assets/items/${basename,,}.png"
    fi
done
