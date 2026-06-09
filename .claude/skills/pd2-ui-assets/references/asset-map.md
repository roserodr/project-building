# PD2 Asset Map & Coordinates

Concrete tables for the assets wired up so far. Coordinates are in each panel's **native pixel
space**; divide by the native width/height to get the percentages used in the React components.

## DC6 decode command

```bash
"/c/Program Files/nodejs/node.exe" <repo>/node_modules/dc6png/src/index.js \
  -p <repo>/gamedata/palette/pal.dat -f <File>.dc6
```

## Skill tree — `SPELLS/skltree_i_back.dc6` (Assassin)

16 frames → 4 groups of 4 tiles (TL 256×256, TR 64×256, BL 256×176, BR 64×176 → 320×432).

| Group | Frames | Contents |
|-------|--------|----------|
| 0 | 0,1,2,3 | Chrome: right tab strip + "Skill Choices" box (all tabs dark) |
| 1 | 4,5,6,7 | Traps tree (left ~256px) + **bottom tab lit** on right edge |
| 2 | 8,9,10,11 | Shadow Disciplines tree + **middle tab lit** |
| 3 | 12,13,14,15 | Martial Arts tree + **top tab lit** |

Trees are cropped to 250×432 → `public/ui/tree_traps.png`, `tree_shadow.png`, `tree_martial.png`.
Tab strips built per §6 → `public/ui/tab_traps.png`, `tab_shadow.png`, `tab_martial.png`
(base chrome at native crop x226–320 of group 0, lit band composited from the tree group).

### Calibrated skill node grid (% of the 250×432 tree art)

All three Assassin trees share this (`TREE_GRID` in `SkillTree.tsx`). Derived from the user's
green-box reference, not from raw detection:

```
cols: 15%, 43.3%, 70%
rows: 8.8%, 25%, 40.1%, 56.5%, 71.8%, 87.8%
icon width: 18.5%
```

Skill grid cell = `(SkillColumn-1, SkillRow-1)`. The bottom-right box is the **close button**, not a
skill — leave it empty.

## PD2 Assassin skill layout (from `Skilldesc.txt` + `Skills.txt`)

`iconCel` indexes `public/skills/asskillicon_0_<cel>.png`. row/col are 0-indexed (SkillRow-1, SkillCol-1).

### Traps (page 1)
| id | name (PD2) | row | col | cel | req | deps |
|----|------------|-----|-----|-----|-----|------|
| fire_blast | Fire Trauma | 0 | 1 | 0 | 1 | — |
| shock_web | Shock Field | 1 | 0 | 2 | 6 | fire_blast |
| blade_sentinel | Blade Sentinel | 1 | 2 | 4 | 6 | — |
| charged_bolt_sentry | Charged Bolt Sentry | 2 | 0 | 6 | 12 | shock_web |
| wake_of_fire | Wake of Fire Sentry | 2 | 1 | 8 | 12 | fire_blast |
| blade_fury | Blade Fury | 3 | 2 | 10 | 18 | blade_sentinel |
| lightning_sentry | Lightning Sentry | 4 | 0 | 12 | 24 | charged_bolt_sentry |
| wake_of_inferno | Inferno Sentry | 4 | 1 | 14 | 24 | wake_of_fire |
| blade_shield | Blade Shield | 4 | 2 | 18 | 24 | blade_fury |
| chain_lightning_sentry | Chain Lightning Sentry | 5 | 0 | 60 | 30 | lightning_sentry |
| death_sentry | Death Sentry | 5 | 1 | 16 | 30 | lightning_sentry, wake_of_inferno |

### Shadow Disciplines (page 2)
Claw Mastery(0,1,cel20) · Psychic Hammer(0,2,22) · Quickness=burst_of_speed(1,0,36) ·
Weapon Block(2,1,26) · Cloak of Shadows(2,2,24) · Fade(3,0,30) · Shadow Warrior(3,1,38) ·
Mind Blast(3,2,34) · Venom(5,0,28) · Shadow Master(5,1,32).

### Martial Arts (page 3)
Tiger Strike(0,1,40) · Dragon Talon(0,2,42) · Fists of Fire(1,0,44) · Dragon Claw(1,2,46) ·
Cobra Strike(2,1,50) · Claws of Thunder(3,0,58) · Dragon Tail(3,2,48) · Blades of Ice(4,0,52) ·
Dragon Flight(4,2,54) · Royal Strike=phoenix_strike(5,1,56).

Internal `id`s are kept stable across the classic→PD2 rename so synergy/damage calc references in
`calc.ts` don't break; only `name`/positions/`iconCel`/deps/`reqLevel` change.

## Inventory/equipment panel — `PANEL/invchar6.dc6` group B (320×502)

Slot rects from `Inventory.txt` (Amazon row; identical for all classes), converted to panel-relative
(`x - 320`, `y + 30`). Native px in the 320×502 art → `public/ui/inv_panel.png`.

| slot (app id) | x | y | w | h |
|---------------|---|---|---|---|
| head | 131 | 7 | 56 | 54 |
| neck (amulet) | 202 | 37 | 25 | 25 |
| mainhand (rArm) | 17 | 30 | 55 | 110 |
| offhand (lArm) | 246 | 30 | 55 | 110 |
| body (torso) | 130 | 79 | 56 | 82 |
| hands (gloves) | 18 | 156 | 54 | 54 |
| waist (belt) | 130 | 177 | 56 | 25 |
| finger1 (rHand) | 91 | 177 | 25 | 25 |
| finger2 (lHand) | 201 | 177 | 25 | 25 |
| feet | 247 | 158 | 54 | 54 |

Inventory grid: origin (15, 219), cell 29×29, **10 cols × 8 rows** (PD2 expanded). Used for charms.

## Character/stats panel — `PANEL/invchar6.dc6` group A (320×432)

No coordinate table exists; box rects were measured by connected-components on near-black pixels
(brightened). Native px in the 320×432 art → `public/ui/char_panel.png`.

| element | x | y | w | h |
|---------|---|---|---|---|
| Name box | 10 | 7 | 172 | 21 |
| Class box | 190 | 7 | 120 | 21 |
| Level box | 10 | 33 | 44 | 33 |
| Experience box | 66 | 33 | 116 | 33 |
| Next Level box | 192 | 33 | 118 | 33 |
| Attr label boxes (Str/Dex/Vit/Enr) | 10 | 83/145/231/293 | 64 | 18 |
| Attr value boxes | 76 | 83/145/231/293 | 39 | 18 |
| Attr + button | 122 | (row)−4 | 26 | 26 |
| Stat Points Remaining (label/value) | 10 / 124 | 360 / 364 | 110 / 44 | 30 / 22 |
| Defense (label/value) | 161 / 251 | 193 | 88 / 56 | 18 |
| Stamina/Life/Mana (label / cur / max) | 161 / 233 / 273 | 231 / 255 / 293 | 70 / 40 / 34 | 18 |
| Resistance (label / value) | 174 / 270 | 332 / 356 / 380 / 404 | 96 / 38 | 22 |

Two-value stats show **current (blue #8a8aff) | max (white #e8e0d0)**. Item-boosted attribute
values turn blue. Resistance value gold (#e8c060) at ≥75 cap, red (#ff5050) when negative.
Planner-only data (breakpoints FCR/FHR/FBR/IAS, weapon damage) renders **below** the art panel,
since the D2 panel has no boxes for it.

## `public/` filename map

| public path | source |
|-------------|--------|
| `ui/tree_{traps,shadow,martial}.png` | skltree_i_back groups 1–3, cropped 250×432 |
| `ui/tab_{traps,shadow,martial}.png` | group 0 chrome + lit band from each tree group |
| `ui/char_panel.png` | invchar6 group A |
| `ui/inv_panel.png` | invchar6 group B |
| `ui/btn.png` | D2 character-screen "+" button |
| `skills/asskillicon_0_<cel>.png` | SPELLS/AsSkillicon.dc6 (per-cel) |
| `items/<imageFile>.png` | item inventory sprites |
