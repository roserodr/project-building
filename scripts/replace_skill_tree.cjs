const fs = require('fs');

const path = 'src/components/SkillTree.tsx';
let content = fs.readFileSync(path, 'utf8');

const search = `<div className={\`flex items-center justify-center h-full w-full \${!isAvailable ? 'opacity-40 grayscale' : ''}\`}>
                <div className="text-[10px] text-center leading-tight">{skill.name}</div>`;

const replace = `<div className={\`flex items-center justify-center h-full w-full \${!isAvailable ? 'opacity-40 grayscale' : ''}\`}>
                {skill.iconCel !== undefined ? (
                  <img src={\`/src/assets/skills/skillicon_0_\${skill.iconCel}.png\`} alt={skill.name} className="w-10 h-10 object-contain" onError={(e) => {
                    // fallback if assassin actually uses another icon set like amskillicon etc
                    // Or if skillicon doesn't exist. Actually Assassin expansion icons might be elsewhere but let's try skillicon first.
                    (e.target as HTMLImageElement).src = \`/src/assets/skills/paskillicon_0_\${skill.iconCel}.png\`;
                  }} />
                ) : (
                  <div className="text-[10px] text-center leading-tight">{skill.name}</div>
                )}`;

if (content.includes(search)) {
    content = content.replace(search, replace);
    fs.writeFileSync(path, content, 'utf8');
    console.log("Successfully updated SkillTree.tsx");
} else {
    console.log("Could not find search string in SkillTree.tsx");
}
