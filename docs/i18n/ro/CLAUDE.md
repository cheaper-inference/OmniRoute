# CLAUDE.md (Română)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Toate regulile proiectului locuiesc în [`AGENTS.md`](AGENTS.md)** — sursa unică de adevăr pentru fiecare asistent AI ; importul de mai sus îl încarcă deja. Nu adăugați din nou regulile proiectului aici. Totul de mai jos se aplică ONLY la Claude Cod — perfecționări operaționale ale regulilor deja definite în `AGENTS.md`.

## Izolarea arborelui de lucru — Claude Specificații codului

- Confirmați ramura de bază cu operatorul prin `AskUserQuestion` (Hard Rule #19) dacă nu v-a spus deja.
- Creați arborele de lucru cu `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (aterizează sub `.claude/worktrees/`, hard-links `node_modules` și copiază `.husky/_`), apoi apelați `EnterWorktree` cu `path`. Treceți întotdeauna baza: fără ea, scriptul alege cel mai mare `release/*`, care poate să nu fie cel confirmat de operator. Un arbore de lucru pe care `EnterWorktree` îl creează de la sine nu are nici legăturile dure, nici cârligele, așa că nu rulează nicio poartă de pre-commit în el.

## Subagenți și git

Fiecare subagent care atinge git (instrumentul agentului sau scriptul fluxului de lucru) primește interdicția `git stash` a lui Hard Rule #22 a textului în promptul său — reapariția înregistrată a incidentului stash a venit printr-un subagent.

## Planificarea artefactelor superputeri — anulează calea

Abilitățile superputeri anunță valorile implicite sub `docs/superpowers/plans/`, `docs/superpowers/specs/` și `docs/research/`. Rescrieți fiecare la echivalentul său `_tasks/` în `AGENTS.md` → „Artefacte de planificare și cercetare” înainte de a scrie și comite-o cu `git -C _tasks …`, niciodată în depozitul principal.

## Fișiere scratch — `_artifacts/`, nu `/tmp`

Acest proiect suprascrie scratchpad-ul sesiunii hamului (`/tmp/claude-*/…`). Scrieți fișiere temporare — exporturi, zip-uri generate, ieșiri intermediare unice — la `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: o cale rădăcină `_*` ignorată, astfel încât operatorul să găsească și să ștergă toate scratch-urile într-un singur loc. Planurile durabile, specificațiile, cercetările și transferurile sunt trimise în schimb la `_tasks/` (Hard Rule #23).

## Bază roșie

Pentru a scurge o stare roșie acumulată (base vârf + red PRs), utilizați skill-ul `/sweep-reds`.
