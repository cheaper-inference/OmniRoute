# CLAUDE.md (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Visi projekta noteikumi dzīvo [`AGENTS.md`](AGENTS.md)** — ir vienīgais patiesības avots katram AI palīgam; iepriekš minētais imports to jau ielādē. Nepievienojiet šeit atkārtoti projekta noteikumus. Viss tālāk norādītais attiecas ONLY uz Claude Koda — darbības precizējumi noteikumiem, kas jau ir definēti `AGENTS.md`.

## Darba koka izolācija — Claude Koda specifika

- Apstipriniet bāzes atzaru ar operatoru, izmantojot `AskUserQuestion` (cietais noteikums #19), ja vien viņš jums jau nav teicis.
- Izveidojiet darbkoku ar `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (tas nonāk zem `.claude/worktrees/`, savieno `node_modules` cietās saites un kopē `.husky/_`), pēc tam izsauciet `EnterWorktree` ar tā `path`. Vienmēr nododiet bāzi: bez tā skripts izvēlas augstāko `release/*`, kas var nebūt operatora apstiprinātais. Darbkokam, ko `EnterWorktree` izveido pats, nav ne cieto saišu, ne āķu, tāpēc tajā neiet pirmsapstiprināšanas vārti.

## Subaģenti un gīts

Katrs apakšaģents, kas pieskaras git (aģenta rīks vai darbplūsmas skripts), savā uzvednē — burtiski saņem Hard Rule #22 a's `git stash` aizliegumu. Reģistrētais atlicināšanas incidenta atkārtojums notika, izmantojot apakšaģentu.

## Artefaktu plānošana — lielvaru ceļa ignorēšana

Lielspēju prasmes paziņo par noklusējuma iestatījumiem zem `docs/superpowers/plans/`, `docs/superpowers/specs/` un `docs/research/`. Pirms rakstīšanas pārrakstiet katru uz tā `_tasks/` ekvivalentu sadaļā `AGENTS.md` → "Plānošanas un izpētes artefakti" un veiciet to ar `git -C _tasks …`, nevis galvenajā repo.

## Skrāpējiet failus — `_artifacts/`, nevis `/tmp`

Šis projekts ignorē instalācijas sesijas scratchpad (`/tmp/claude-*/…`). Rakstiet pagaidu failus — eksportus, ģenerētos zips, vienreizējus starpizvadus — līdz `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: gitignorēts saknes `_*` ceļš, lai operators atrastu un dzēstu visus skrāpējumus vienuviet. Ilgstoši plāni, specifikācijas, izpēte un nodošana tiek izmantota `_tasks/` (stingrs noteikums #23).

## Sarkana bāze

Lai iztukšotu uzkrāto sarkano stāvokli (pamata gals + red PRs), izmantojiet `/sweep-reds` prasmi.
