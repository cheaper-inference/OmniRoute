# CLAUDE.md (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Alle projectregels leven in [`AGENTS.md`](AGENTS.md)** — de enige bron van waarheid voor iedere AI assistent; de import hierboven laadt het al. Voeg hier geen projectregels opnieuw toe. Alles hieronder is van toepassing ONLY op Claude Code — operationele verfijningen van regels die al zijn gedefinieerd in `AGENTS.md`.

## Werkboomisolatie — Claude Codespecificaties

- Bevestig de basistak bij de operator via `AskUserQuestion` (Hard Rule #19), tenzij ze u dit al hebben verteld.
- Maak de werkboom met `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (deze komt terecht onder `.claude/worktrees/`, koppelt `node_modules` hard en kopieert `.husky/_`), roep vervolgens `EnterWorktree` aan met zijn `path`. Geef altijd de basis door: zonder deze kiest het script de hoogste `release/*`, wat mogelijk niet degene is die de operator heeft bevestigd. Een werkboom die `EnterWorktree` zelf maakt, heeft noch de harde links, noch de hooks, dus er draait geen pre-commit-poort in.

## Subagenten en git

Elke subagent die git aanraakt (Agent tool of Workflow script) krijgt de harde regel #22 a's `git stash` ban letterlijk in de prompt — de geregistreerde herhaling van het stash-incident kwam via een subagent.

## Planningsartefacten — superkrachten padoverschrijvingen

Vaardigheden van superkrachten kondigen standaardwaarden aan onder `docs/superpowers/plans/`, `docs/superpowers/specs/` en `docs/research/`. Herschrijf elk naar zijn `_tasks/` equivalent in `AGENTS.md` → "Planning & Research Artefacts" voordat u het schrijft, en commit het met `git -C _tasks …`, nooit in de hoofdrepository.

## Scratch-bestanden — `_artifacts/`, niet `/tmp`

Dit project overschrijft het sessiekladblok van het harnas (`/tmp/claude-*/…`). Schrijf tijdelijke bestanden — -exports, gegenereerde zips, eenmalige tussenuitvoer — naar `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: een gitignored root `_*` pad, zodat de operator alle scratch-bestanden op één plek vindt en verwijdert. Duurzame plannen, specificaties, onderzoek en overdrachten gaan in plaats daarvan naar `_tasks/` (Hard Rule #23).

## Rode basis

Gebruik de `/sweep-reds` vaardigheid om een opgehoopte rode staat (basistip + red PRs) af te voeren.
