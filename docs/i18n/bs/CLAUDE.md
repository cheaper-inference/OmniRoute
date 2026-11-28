# CLAUDE.md (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Sva pravila projekta žive u [`AGENTS.md`](AGENTS.md)** — jedini izvor istine za svakog AI asistenta; gornji uvoz ga već učitava. Ovdje nemojte ponovo dodavati pravila projekta. Sve ispod se odnosi na ONLY na Claude Operativna preciziranja koda — pravila koja su već definirana u `AGENTS.md`.

## Izolacija radnog stabla — Claude Specifičnosti koda

- Potvrdite osnovnu granu kod operatera putem `AskUserQuestion` (tvrdo pravilo #19) osim ako vam je već rekao.
- Kreirajte stablo rada pomoću `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (dolazi pod `.claude/worktrees/`, tvrde veze `node_modules` i kopira `.husky/_`), zatim pozovite `EnterWorktree` sa njegovim `path`. Uvijek proslijedite bazu: bez nje skripta bira najviši `release/*`, koji možda nije onaj koji je potvrdio operater. Stablo rada koje `EnterWorktree` kreira sam nema ni čvrste veze ni kuke, tako da se u njemu ne radi nikakva kapija pre urezivanja.

## Subagenti i git

Svaki podagent koji dotakne git (alatka agenta ili skripta toka rada) dobija doslovno zabranu `git stash` Hard Rule #22 a u svom promptu — zabeleženo ponavljanje incidenta sa skrivenim sadržajem je došlo preko subagenta.

## Planiranje artefakata — supermoći puta poništava

Vještine supermoći objavljuju zadane vrijednosti pod `docs/superpowers/plans/`, `docs/superpowers/specs/` i `docs/research/`. Prepišite svaki na njegov `_tasks/` ekvivalent u `AGENTS.md` → "Artefaktima planiranja i istraživanja" prije pisanja, i urezujte ga sa `git -C _tasks …`, nikad u glavnom repo-u.

## Grebanje datoteka — `_artifacts/`, ne `/tmp`

Ovaj projekat poništava blok za pisanje sesije pojasa (`/tmp/claude-*/…`). Pisanje privremenih datoteka — izvoza, generiranih zipova, jednokratnih srednjih izlaza — do `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: gitignorirana korijenska `_*` putanja, tako da operater pronalazi i briše sve ogrebotine na jednom mjestu. Trajni planovi, specifikacije, istraživanja i predaje idu u `_tasks/` umjesto toga (tvrdo pravilo #23).

## Crvena baza

Da ispraznite akumulirano crveno stanje (osnovni vrh + red PRs), koristite `/sweep-reds` vještinu.
