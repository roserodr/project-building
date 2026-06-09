# Project Diablo 2 — Character Builder

A React + TypeScript app for planning Project Diablo 2 characters: skill trees, equipment, rare item creation, and stat calculations.

## Features

- **Skill Tree** — browse and plan skill points for all classes
- **Character Sheet** — stat totals updated in real time
- **Equipment** — slot items and see combined affixes
- **Rare Item Creator / Editor** — generate and tweak rare items with valid affix combinations
- **Item Tooltip** — D2-style tooltip preview

## Getting Started

```bash
npm install
npm run dev
```

The dev server also runs `scripts/extract_skill_icons.cjs` to unpack skill icons from the game data before starting Vite.

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Extract icons, start Vite dev server |
| `npm run build` | Extract icons, type-check, build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |
| `node scripts/check_bases.cjs` | Check for `baseType` values in `projectDiablo2Items.ts` that don't match any name in `itemBases.ts` |
| `python scripts/gen-class-skills.py` | Regenerate the non-Assassin class skill data (`src/data/<class>Skills.ts`) from PD2's `Skills.txt`/`Skilldesc.txt` + the bundled wiki snapshot |
| `python scripts/gen-tree-art.py` | Bake per-class skill-tree backgrounds and tab strips (`public/ui/trees/<Class>/`) from `skltree_<x>_back.dc6` |

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/) for state
- [Tailwind CSS](https://tailwindcss.com/)
- [Playwright](https://playwright.dev/) for e2e tests
- [ESLint](https://eslint.org/) with `react-hooks` and `react-refresh` plugins, type-aware rules via `typescript-eslint`
