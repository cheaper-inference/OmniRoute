# CLAUDE.md (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Sva pravila projekta postoje u [`AGENTS.md`](AGENTS.md)** — jedini izvor istine za svakog AI pomoćnika; gornji uvoz ga već učitava. Ovdje nemojte ponovno dodavati pravila projekta. Sve ispod primjenjuje se ONLY na Claude Kod — operativna usavršavanja pravila koja su već definirana u `AGENTS.md`.

## Izolacija radnog stabla — Claude Specifičnosti koda

- Potvrdite osnovnu granu kod operatera putem `AskUserQuestion` (Hard Rule #19) osim ako vam je već rekao.
- Kreirajte radno stablo sa `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (slijeće pod `.claude/worktrees/`, tvrdi veze `node_modules` i kopira `.husky/_`), zatim pozovite `EnterWorktree` sa svojim `path`. Uvijek proslijedite bazu: bez nje skripta odabire najveći `release/*`, koji možda nije onaj koji je potvrdio operater. Radno stablo koje `EnterWorktree` sam kreira nema niti čvrste veze niti zakačke, tako da se u njemu ne izvode vrata prije predaje.

## Subagenti i git

Svaki subagent koji dotakne git (alat agenta ili skriptu tijeka rada) dobiva `git stash` zabranu Hard Rule #22 a doslovce u svom promptu — zabilježeno ponavljanje incidenta zalihe došlo je preko subagenta.

## Artefakti planiranja — nadjačavaju put supermoći

Vještine supermoći objavljuju zadane vrijednosti pod `docs/superpowers/plans/`, `docs/superpowers/specs/` i `docs/research/`. Prepišite svaki u njegov `_tasks/` ekvivalent u `AGENTS.md` → "Artefakti planiranja i istraživanja" prije pisanja i pokrenite ga pomoću `git -C _tasks …`, nikad u glavnom repou.

## Scratch datoteke — `_artifacts/`, ne `/tmp`

Ovaj projekt nadjačava blok za natuknice sesije (`/tmp/claude-*/…`). Pisanje privremenih datoteka — izvoza, generiranih zipova, jednokratnih međuizlaza — u `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: gitignorirana korijenska `_*` staza, tako da operater pronalazi i briše sve scratch na jednom mjestu. Trajni planovi, specifikacije, istraživanja i primopredaje umjesto toga idu u `_tasks/` (Hard Rule #23).

## Crvena baza

Za ispuštanje nakupljenog crvenog stanja (bazni vrh + crveno PRs), upotrijebite vještinu `/sweep-reds`.
