# CLAUDE.md (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Kaikki projektin säännöt elävät [`AGENTS.md`](AGENTS.md)** — ainoa totuuden lähde jokaiselle AI avustajalle; yllä oleva tuonti lataa sen jo. Älä lisää tähän projektisääntöjä uudelleen. Kaikki alla oleva koskee ONLY Claude koodiin. — toiminnalliset tarkennukset sääntöihin, jotka on jo määritetty `AGENTS.md` ssä.

## Työpuun eristäminen — Claude Koodin tiedot

- Vahvista perushaara operaattorilta `AskUserQuestion` (kova sääntö #19), ellei he ole jo kertoneet sinulle.
- Luo työpuu komennolla `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (se laskeutuu `.claude/worktrees/` alle, linkittää `node_modules` ja kopioi `.husky/_`) ja kutsu sitten `EnterWorktree` `path` llä. Ohita aina kanta: ilman sitä skripti valitsee korkeimman `release/*`, joka ei välttämättä ole operaattorin vahvistama. Työpuussa, jonka `EnterWorktree` luo itsestään, ei ole kovia linkkejä eikä koukkuja, joten siinä ei kulje esisitoumusporttia.

## Subagents ja git

Jokainen aliagentti, joka koskettaa gitiä (agenttityökalu tai työnkulkukomentosarja), saa Kovan säännön #22 a:n `git stash` ban sanatarkasti kehotteessaan — tallennetun stash-tapahtuman toistuminen tuli aliagentin kautta.

## Artefaktien suunnittelu — supervoimien polun ohituksia

Supervoimataidot ilmoittavat oletusarvot kohdissa `docs/superpowers/plans/`, `docs/superpowers/specs/` ja `docs/research/`. Kirjoita jokainen uudelleen `_tasks/` -vastineensa `AGENTS.md` → "Planning & Research Artifacts" -kohdassa ennen kirjoittamista ja sitoa se `git -C _tasks …` llä, ei koskaan päärepossa.

## Raaputustiedostot — `_artifacts/`, ei `/tmp`

Tämä projekti ohittaa valjaiden istuntoalustan (`/tmp/claude-*/…`). Kirjoita väliaikaiset tiedostot — -vientit, luodut zip-tiedostot, kertaluonteiset välitulosteet — - `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: ohitettu `_*` juuripolku, jotta operaattori löytää ja poistaa kaikki naarmut yhdestä paikasta. Kestävät suunnitelmat, tekniset tiedot, tutkimus ja luovutukset menevät sen sijaan `_tasks/` (Hard Rule #23).

## Punainen pohja

Tyhjennä kerääntynyt punainen tila (peruskärki + red PRs), käytä `/sweep-reds` taitoa.
