#!/bin/bash
git rm -r --cached palettes public/items public/skills
echo "palettes/" >> .gitignore
echo "public/items/" >> .gitignore
echo "public/skills/" >> .gitignore
git add .gitignore
git commit -m "chore: ignore assets"
