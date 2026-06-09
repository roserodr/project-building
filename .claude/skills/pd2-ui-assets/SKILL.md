---
name: pd2-ui-assets
description: >-
  Extract Project Diablo 2 (PD2) game assets and build authentic D2-style UI panels in this
  React planner. Use this whenever the task involves PD2/Diablo 2 art, DC6 sprites, skill trees,
  the inventory/equipment panel, the character/stats panel, skill icons, item images, or anything
  that should "look like Diablo 2 / Project Diablo 2." Also use when adding a new class's skill
  tree, mapping game data (skills, inventory slots) onto the UI, or decoding/assembling any
  `.dc6` file pulled from the asset bucket. Covers the full pipeline: rclone → R2, DC6 decode,
  tiled-panel assembly, reading coordinates from the game's `.txt` tables, and positioning React
  overlays as percentages on the art.
---

# PD2 UI Assets

This project recreates the Project Diablo 2 interface by using the **actual game art** as
backgrounds and positioning interactive React elements on top of it. The guiding principle:
**don't hand-draw D2-looking CSS — extract the real asset and overlay on it.** Coordinates come
from the game's own data tables wherever they exist, so alignment is exact rather than eyeballed.

## When to reach for this

- Adding/altering a skill tree, the equipment panel, or the character/stats panel
- Decoding any `.dc6` sprite (skill icons, panels, item images, buttons)
- "Make X look more like D2/PD2", "use the real PD2 asset", "the layout should match PD2"
- Porting another class's skills, or wiring game data (positions, names, prereqs) into the UI

## 1. Get assets from the R2 bucket

Assets live in a Cloudflare R2 bucket (`project-building`) accessed with **rclone**. The binary is
at `~/rclone/rclone-v1.68.2-windows-amd64/rclone.exe` and the remote `r2` is already configured in
`~/AppData/Roaming/rclone/rclone.conf` (S3 endpoint + keys). Bucket layout:

- `pd2assets/data/global/ui/...` — PD2 UI art (`.dc6`). Key folders: `SPELLS/` (skill trees +
  icons), `PANEL/` (inventory/character panels, buttons), `CONTROLS/`, `MENU/`.
- `pd2data/data/global/excel/...` — PD2 game data tables (`.txt`, tab-separated): `Skills.txt`,
  `Skilldesc.txt`, `Inventory.txt`, etc. **These define exact positions** — prefer them over guessing.
- `d2data/` — classic D2 fallback (rarely needed; PD2 differs, see §5).

```bash
RCLONE=~/rclone/rclone-v1.68.2-windows-amd64/rclone.exe
$RCLONE lsf --recursive r2:project-building/pd2assets/data/global/ui/   # browse
$RCLONE copy r2:project-building/pd2assets/data/global/ui/PANEL/invchar6.dc6 gamedata/pd2panel/
```

Downloaded source files live under `gamedata/` (already in the repo, e.g. `gamedata/pd2/`,
`gamedata/pd2excel/`). The Units palette `gamedata/palette/pal.dat` (768 bytes, BGR) is needed for
every decode.

## 2. Decode DC6 → PNG

DC6 is D2's sprite format. Decode with the bundled `dc6png` package and the Units palette:

```bash
cd <dir with the .dc6>
"/c/Program Files/nodejs/node.exe" <repo>/node_modules/dc6png/src/index.js \
  -p <repo>/gamedata/palette/pal.dat -f SomeFile.dc6
# → SomeFile_0_<cel>.png, one PNG per frame (cel)
```

Each `.dc6` has multiple **frames** (cels). For sprite sheets (skill icons, buttons) each cel is one
image — reference it by index. For panels, the frames are **tiles** that must be assembled (§3).

Use Python + Pillow for assembly/inspection (numpy is available; **cv2 is not**). To read box
positions out of dark UI art, brighten first (`ImageEnhance.Brightness(...).enhance(2.5)`) — the
recessed boxes are near-black and invisible otherwise.

## 3. Assemble tiled panels

Panel `.dc6` files store the panel as a 2×2 grid of tiles (TL 256-wide, TR 64-wide, BL, BR), and a
file may contain **several panels** as consecutive 4-frame groups. Assemble a group onto one canvas:

```python
from PIL import Image
def assemble(frames, w, h):  # frames = [TL, TR, BL, BR]
    c = Image.new('RGBA', (w, h))
    c.paste(Image.open(f'{frames[0]}.png'), (0, 0))
    c.paste(Image.open(f'{frames[1]}.png'), (256, 0))
    c.paste(Image.open(f'{frames[2]}.png'), (0, 256))
    c.paste(Image.open(f'{frames[3]}.png'), (256, 256))
    return c
```

Known files (see `references/asset-map.md` for full frame/group tables and exact coordinates):

- **`SPELLS/skltree_i_back.dc6`** (Assassin tree) — 16 frames = 4 groups. Group 0 = chrome (the
  right-edge tab strip + "skill choices" box). Groups 1–3 = the three trees. **Each tree group also
  carries its tab in the *lit/selected* state on its right edge** — that's how the selected-tab
  highlight is done. Don't crop it off; composite it back in (see §6). Tree letters: a=Amazon,
  b=Barbarian, d=Druid, **i=assassIn**, n=Necromancer, p=Paladin, s=Sorceress.
- **`PANEL/invchar6.dc6`** — 8 frames = 2 panels. Group A (320×432) = character/stats panel.
  Group B (320×502) = inventory/equipment panel.

Generated panel PNGs are committed to `public/ui/` (`tree_*.png`, `char_panel.png`, `inv_panel.png`,
`tab_*.png`). Skill icons go in `public/skills/`, item images in `public/items/`.

## 4. Position React overlays as percentages on the art

The pattern used everywhere: a relative container whose size is driven by the art's aspect ratio,
the art as an absolutely-positioned `<img>` filling it, and every interactive element placed with
**percentage** left/top/width/height so it scales with the panel. Percentages = `coord / nativeDim`.

```tsx
const PW = 320, PH = 502;
const pct = (x:number,y:number,w:number,h:number) => ({
  left:`${x/PW*100}%`, top:`${y/PH*100}%`, width:`${w/PW*100}%`, height:`${h/PH*100}%`,
});
// container: style={{ height:'100%', aspectRatio:`${PW} / ${PH}` }}, img fills inset:0
```

Set `imageRendering: 'pixelated'` on the art so it stays crisp when scaled.

## 5. Get coordinates and game data from the .txt tables — not by eye

PD2's data tables are the source of truth and save enormous guesswork:

- **`Inventory.txt`** — equipment slot rects + the inventory grid. Coordinates are screen-space;
  convert to panel-relative: `x_panel = x_screen - invLeft (320)`, `y_panel = y_screen - invTop`
  (invTop is negative, e.g. -30, so this *adds*). Columns: `headLeft/Top/Width/Height`, `torso*`,
  `rArm*`/`lArm*` (weapons), `neck*`, `rHand*`/`lHand*` (rings), `belt*`, `feet*`, `gloves*`,
  `gridLeft/Top`, `gridX`/`gridY` (PD2 inventory is **10×8**, not classic 10×4), `gridBoxWidth/Height`.
- **`Skilldesc.txt`** — `SkillPage` (tab), `SkillRow`, `SkillColumn`, `IconCel` for each skill.
  Grid index = `SkillRow - 1`, `SkillColumn - 1`. **PD2 renames and re-lays-out skills vs classic D2**
  (e.g. Fire Blast→Fire Trauma, Burst of Speed→Quickness, Wake of Inferno→Inferno Sentry, Phoenix
  Strike→Royal Strike, plus the new Chain Lightning Sentry). Always source the layout from PD2's
  table — classic D2 data will be subtly wrong.
- **`Skills.txt`** — `charclass` (e.g. `ass`), `reqlevel`, `maxlvl`, `reqskill1/2/3` (prerequisites).

Join `Skills.txt` (gameplay) to `Skilldesc.txt` (layout) on the `skilldesc` column. When a table
doesn't exist for a panel (the character/stats panel has no coordinate table), detect the recessed
boxes directly: brighten the art and run a connected-components pass over near-black pixels to get
each box rectangle, then map values into them.

## 6. Hard-won gotchas

- **Selected skill tab.** The lit-tab art is baked into each tree group's right edge. Composite the
  base chrome (all tabs dark) with the lit tab from the active tree's group → one strip per tab
  (`tab_traps.png`, `tab_shadow.png`, `tab_martial.png`). Swap the strip by active tab.
- **Panel-edge shadow / seams.** Tab strips carry a near-black left-edge shadow. To merge a strip
  into the panel cleanly: feather that edge to transparent (ramp alpha for dark pixels in the left
  ~30px) **and** layer the tree panel above the strip (`z-index`) with a small negative margin so
  the panel's solid frame covers the gradient. Composite full-width bands (not cropped cells) to
  avoid texture seams between two frame groups.
- **Tooltips rendering behind siblings.** Each absolutely-positioned skill node creates a stacking
  context; an inline `zIndex` traps its tooltip so later nodes paint over it. Fix by raising the
  node on hover via classes that actually override (`z-[1] hover:z-[100]`), not an inline z-index.
- **Hand-drawn art isn't a perfect grid.** Skill-tree boxes are slightly irregular. Calibrate the
  grid from one unambiguous anchor box, then fine-tune visually; expect a couple of nudge passes and
  ask the user for a screenshot/overlay rather than trusting detection alone.
- **Decode hygiene.** `0x80` is the DC6 end-of-scanline marker; wrong palette → blank/miscolored
  output (use the Units `pal.dat`). When copying icons to `public/`, watch for cels beyond what was
  previously decoded (e.g. new PD2 skills like Chain Lightning Sentry at cel 60).
- **Temp files.** Do analysis/overlay images in the repo root and delete them when done; only commit
  the final `public/ui/*` and `public/skills/*` assets.

## Reference

`references/asset-map.md` — exact frame/group tables, the calibrated skill-tree grid, the full
equipment-slot and character-panel box coordinates, and the asset → `public/` filename map.
