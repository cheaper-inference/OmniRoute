# CLAUDE.md (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Alle prosjektregler lever i [`AGENTS.md`](AGENTS.md)** — den eneste kilden til sannhet for hver AI assistent; importen ovenfor laster den allerede. Ikke legg til prosjektregler på nytt her. Alt nedenfor gjelder ONLY for Claude Code — operasjonelle forbedringer av regler som allerede er definert i `AGENTS.md`.

## Arbeidstreisolasjon — Claude Kodespesifikasjoner

- Bekreft basisgrenen med operatøren via `AskUserQuestion` (Hard Rule #19) med mindre de allerede har fortalt deg det.
- Lag arbeidstreet med `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (det lander under `.claude/worktrees/`, hard-linker `node_modules` og kopierer `.husky/_`), og kall deretter `EnterWorktree` med `path`. Pass alltid basen: uten den velger skriptet den høyeste `release/*`, som kanskje ikke er den operatøren bekreftet. Et arbeidstre som `EnterWorktree` lager av seg selv har verken de harde lenkene eller krokene, så ingen pre-commit gate kjører i det.

## Subagenter og git

Hver subagent som berører git (Agent-verktøy eller Workflow-skript) får Hard Rule #22 as `git stash` forbud ordrett i meldingen — den registrerte gjentakelsen av stash-hendelsen kom gjennom en subagent.

## Planleggingsartefakter — superpowers sti overstyrer

Supermakts ferdigheter kunngjør standardverdier under `docs/superpowers/plans/`, `docs/superpowers/specs/` og `docs/research/`. Skriv om hver til sin `_tasks/` ekvivalent i `AGENTS.md` → "Planning & Research Artifacts" før du skriver, og begå den med `git -C _tasks …`, aldri i hovedrepoen.

## Scratch-filer — `_artifacts/`, ikke `/tmp`

Dette prosjektet overstyrer selens skrapelodd (`/tmp/claude-*/…`). Skriv midlertidige filer — eksporter, genererte zip-er, engangs mellomutganger — til `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: en gitignorert rot- `_*` bane, slik at operatøren finner og sletter alle scratch på ett sted. Holdbare planer, spesifikasjoner, forskning og overleveringer går til `_tasks/` i stedet (Hard Rule #23).

## Rød base

For å tømme en akkumulert rød tilstand (base tip + red PRs), bruk `/sweep-reds` ferdigheten.
