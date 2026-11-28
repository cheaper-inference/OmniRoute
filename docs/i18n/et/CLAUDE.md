# CLAUDE.md (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Kõik projektireeglid kehtivad [`AGENTS.md`](AGENTS.md)** — on iga AI assistendi ainus tõeallikas; ülaltoodud import laadib selle juba sisse. Ärge lisage siia projekti reegleid uuesti. Kõik allpool olev rakendab ONLY d Claude Kood — juba `AGENTS.md` määratletud reeglite operatsioonilised täpsustused.

## Tööpuu isoleerimine — Claude Koodi eripära

- Kinnitage põhiharu operaatoriga `AskUserQuestion` (kõva reegel #19) kaudu, kui ta pole teile juba öelnud.
- Looge tööpuu `scripts/dev/new-worktree.sh <branch> <confirmed-base>` abil (see langeb `.claude/worktrees/` alla, ühendab `node_modules` ja kopeerib `.husky/_`), seejärel kutsuge `EnterWorktree` selle `path` abil. Edastage alati baas: ilma selleta valib skript kõrgeima `release/*`, mis ei pruugi olla see, mille operaator kinnitas. Tööpuul, mille `EnterWorktree` ise loob, pole ei kõvasid lülisid ega konkse, seega ei jookse selles ühtegi eelkohustuse väravat.

## Subagendid ja git

Iga alamagent, mis puudutab git (agendi tööriist või töövoo skript), saab kõva reegli #22 a `git stash` sõna-sõnalt — Salvestatud intsidendi kordumine tuli alamagendi kaudu.

## Artefaktide planeerimine — supervõimete tee alistab

Supervõimete oskused teatavad vaikeväärtustest `docs/superpowers/plans/`, `docs/superpowers/specs/` ja `docs/research/` all. Enne kirjutamist kirjutage igaüks oma `_tasks/` ekvivalendiks jaotises `AGENTS.md` → "Planning & Research Artifacts" ja kinnitage see `git -C _tasks …`, mitte kunagi põhirepos.

## Kraapimisfailid — `_artifacts/`, mitte `/tmp`

See projekt alistab rakmete seansi märkmiku (`/tmp/claude-*/…`). Kirjutage ajutised failid — ekspordid, loodud ZIP-failid, ühekordsed vaheväljundid — kuni `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: gitignoositud juur- `_*` tee, nii et operaator leiab ja kustutab kõik kriimud ühest kohast. Kestvad plaanid, spetsifikatsioonid, uuringud ja üleandmised lähevad selle asemel `_tasks/` (Hard Rule #23).

## Punane alus

Kogunenud punase oleku (alusots + red PRs) tühjendamiseks kasutage `/sweep-reds` oskust.
