# Cinematic Layout Data Files

All data libraries for the cinematic-layout skill. These files are loaded ON DEMAND — only read what you need per scene.

## File Index

| File | Size | Entries | When to Read |
|------|------|---------|-------------|
| `dna-index.tsv` | 144KB | 1486 | Step 3.5 — search by mood/shape/motion to find matching DNAs |
| `hero-archetypes.md` | ~25KB | 30 | Step 3.9 — select hero skeleton before storyboard |
| `narrative-beats.md` | ~20KB | 25 beats + 12 arcs | Step 3.95 — build page narrative arc per director |
| `section-functions.md` | ~8KB | 50 | Step 3.95 — available section function types |
| `section-archetypes.md` | ~20KB | 50+ | Step 3.95 — structural variants per section function |
| `directors-200.md` | ~100KB | 200+ | Step 1 — present director options to user |
| `camera-shots-50.md` | ~30KB | 50+ | Step 4 — pick entrance animation per scene |
| `interaction-effects-50.md` | ~40KB | 50+ | Step 4 — pick hover/scroll/click effects per scene |
| `textures.md` | ~10KB | 30+ | Step 4 — pick background textures per scene |
| `color-grades.md` | ~8KB | 40+ | Step 3 — apply film color grading |
| `font-moods.md` | ~6KB | 30+ | Step 3 — pick font pairing by mood |
| `compositions.md` | ~8KB | 30+ | Step 4 — pick section layout composition |

## Full DNA Database

`design-dna-db.txt` contains the complete 2.3MB DNA dataset. The `dna-index.tsv` in this folder is the searchable index — use it first, then load `design-dna-db.txt` only when the index points to a specific entry you need.

To read a specific site's full DNA record:
```bash
awk '/DNA\|.*{hostname}/{found=1} /^---$/{if(found)exit} found' design-dna-db.txt
```

## How to Search

```bash
# Find dark animated sites
awk -F'\t' '$2=="dark" && $7=="animated"' data/dna-index.tsv | head -10

# Find sites using serif fonts
grep -i "serif\|playfair\|cormorant\|georgia" data/dna-index.tsv | head -10

# Find sharp-cornered sites
awk -F'\t' '$6=="sharp"' data/dna-index.tsv | head -10
```
