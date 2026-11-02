# Library Index

Use this file to decide what to read next. Load the smallest useful subset.

## Core References

- `premium-calibration.md`
  - Use after the director brief to raise the level of control and restraint without leaving the cinematic concept.
- `reference-protocol.md`
  - Use when the user shares visual references but wants to avoid template copying.

## Phase 1

- `data/directors-200.md`
  - Use to present genre-appropriate directors and film references.

## Phase 2

- `anti-convergence.md`
  - Use when selecting hero archetypes, arc variants, or section archetypes so repeated shells do not converge across pages or projects.
- `data/hero-archetypes.md`
  - Use to choose the hero skeleton for each page.
- `data/narrative-beats.md`
  - Use to map page flow to a cinematic arc.
- `data/section-functions.md`
  - Use to convert beats into functional section types.
- `data/section-archetypes.md`
  - Use to pick structural variants for each section function.
- `data/dna-index.tsv`
  - Use to find visual DNA matches by mood, typography, motion, or radius.
- `data/design-dna-db.txt`
  - Use only for deep lookup after `dna-index.tsv` identifies a promising host or pattern worth expanding.

## Phase 3

- `implementation-guardrails.md`
  - Use to enforce entrance-map variety, external library decisions, JS-required interaction handling, quality checklists, and post-screening adjustment rules.
- `data/camera-shots-50.md`
  - Use for section entrance and reveal behavior.
- `data/interaction-effects-50.md`
  - Use for hover, cursor, click, and scroll interactions.
- `data/compositions.md`
  - Use for layout composition and grid logic.
- `data/visual-elements.md`
  - Use to add frames, badges, glows, halos, separators, and other visual structure.
- `data/background-techniques.md`
  - Use for hero backgrounds and atmosphere layers.
- `data/typography-cinema.md`
  - Use for text treatment and hierarchy.
- `data/color-grades.md`
  - Use to translate film palette into UI tokens.
- `data/font-moods.md`
  - Use to pair fonts by tone.
- `data/textures.md`
  - Use for grain, grids, dust, scan lines, and surfaces.
- `data/image-direction.md`
  - Use only when the design includes image placeholders.
- `data/visual-styles.md`
  - Use for style cross-checking, not as the primary source of layout logic.

## Search Hints

Use targeted search instead of opening whole files.

```bash
rg -n "Villeneuve|Nolan|Fincher|Wong Kar-wai" references/data/directors-200.md
rg -n "^##|^###|Hero|split|sticky|timeline" references/data/hero-archetypes.md
rg -n "spotlight|tilt|magnetic|scramble|cursor" references/data/interaction-effects-50.md
rg -n "grain|mesh|orb|fog|grid" references/data/background-techniques.md
```

## Suggested DNA Search

### Bash / macOS / Linux

```bash
awk -F'\t' '$2=="dark" && $7=="animated"' references/data/dna-index.tsv | head -10
```

### PowerShell

```powershell
Import-Csv references/data/dna-index.tsv -Delimiter "`t" |
  Where-Object { $_.mood -eq "dark" -and $_.motion -eq "animated" } |
  Select-Object -First 10
```
