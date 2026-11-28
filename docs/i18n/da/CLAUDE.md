# CLAUDE.md (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Alle projektregler lever i [`AGENTS.md`](AGENTS.md)** — den eneste kilde til sandhed for hver AI assistent; importen ovenfor indlæser den allerede. Tilføj ikke projektregler igen her. Alt nedenfor gælder ONLY for Claude Code — operationelle justeringer af regler, der allerede er defineret i `AGENTS.md`.

## Worktree isolation — Claude Kodespecifikationer

- Bekræft basisgrenen med operatøren via `AskUserQuestion` (Hard Rule #19), medmindre de allerede har fortalt dig det.
- Opret arbejdstræet med `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (det lander under `.claude/worktrees/`, hard-links `node_modules` og kopierer `.husky/_`), og kald derefter `EnterWorktree` med dets `path`. Bestå altid basen: uden den vælger scriptet den højeste `release/*`, som måske ikke er den, som operatøren bekræftede. Et arbejdstræ, som `EnterWorktree` skaber af sig selv, har hverken de hårde links eller krogene, så der kører ingen pre-commit gate i det.

## Subagenter og git

Hver subagent, der rører ved git (agentværktøj eller workflow-script) får Hard Rule #22 a's `git stash` forbud ordret i sin prompt — den registrerede gentagelse af stash-hændelsen kom gennem en subagent.

## Planlægning af artefakter — supermagter sti tilsidesætter

Supermagter færdigheder annoncerer standarder under `docs/superpowers/plans/`, `docs/superpowers/specs/` og `docs/research/`. Omskriv hver til dens `_tasks/` ækvivalent i `AGENTS.md` → "Planning & Research Artifacts", før du skriver, og begå det med `git -C _tasks …`, aldrig i hovedrepoen.

## Scratch filer — `_artifacts/`, ikke `/tmp`

Dette projekt tilsidesætter selens sessionskladde (`/tmp/claude-*/…`). Skriv midlertidige filer — eksporter, genererede zips, engangs mellemudgange — til `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: en gitignored root `_*` sti, så operatøren finder og sletter alle scratch på ét sted. Holdbare planer, specifikationer, forskning og overdragelser går til `_tasks/` i stedet (Hard Rule #23).

## Rød bund

For at dræne en akkumuleret rød tilstand (basisspids + red PRs), skal du bruge `/sweep-reds` færdigheden.
