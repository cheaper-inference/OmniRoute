# CLAUDE.md (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Minden projektszabály a [`AGENTS.md`](AGENTS.md) ban él** — az igazság egyetlen forrása minden AI asszisztens számára; a fenti import már betölti. Ne adja ide újra a projektszabályokat. Az alábbiakban minden Claude ONLY `AGENTS.md` — vonatkozik.

## Munkafa elkülönítése — Claude Kód sajátosságai

- Erősítse meg az alapelágazást a kezelővel `AskUserQuestion` (Kemény szabály #19) segítségével, hacsak nem mondták már.
- Hozzuk létre a munkafát a `scripts/dev/new-worktree.sh <branch> <confirmed-base>` ( `.claude/worktrees/` alatt landol, `node_modules` kemény linkekkel másolja, és `.husky/_` másolja), majd hívjuk meg `EnterWorktree` `path`. Mindig adja át a bázist: enélkül a szkript a legmagasabb `release/*` választja, amely nem biztos, hogy az operátor által megerősített. A `EnterWorktree` által önmagában létrehozott munkafának nincsenek se hard linkjei, se horgjai, így nem fut benne pre-commit kapu.

## Subagents és git

Minden alágens, amely megérinti a git-et (ügynökeszköz vagy munkafolyamat-szkript), megkapja a kemény szabály #22 a `git stash` ban parancsát — promptjában, a rejtett incidens rögzített megismétlődése egy alágensen keresztül történt.

## Műtermékek tervezése — szuperhatalmak útvonalának felülbírálása

A szuperképességi készségek bejelentik az alapértelmezett értékeket `docs/superpowers/plans/`, `docs/superpowers/specs/` és `docs/research/` alatt. Írás előtt írja át mindegyiket `_tasks/` megfelelőjükre `AGENTS.md` → "Planning & Research Artifacts"-ban, és véglegesítse `git -C _tasks …`-vel, soha ne a fő repóban.

## Scratch fájlok — `_artifacts/`, nem `/tmp`

Ez a projekt felülírja a kábelköteg munkamenet scratchpadját (`/tmp/claude-*/…`). Írjon ideiglenes fájlokat — export, generált zip, egyszeri köztes kimenetek — - `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: egy gitignorált gyökér `_*` elérési út, így az operátor egy helyen talál és töröl minden karcolást. A tartós tervek, specifikációk, kutatások és átadások helyett `_tasks/` (Hard Rule #23) kerül sor.

## Piros alap

A felgyülemlett vörös állapot (alapcsúcs + red PRs) kiürítéséhez használja a `/sweep-reds` készségeket.
