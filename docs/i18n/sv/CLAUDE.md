# CLAUDE.md (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Alla projektregler finns i [`AGENTS.md`](AGENTS.md)** — den enda källan till sanning för varje AI assistent; importen ovan laddar den redan. Lägg inte till projektregler här igen. Allt nedan gäller ONLY för Claude Code — operativa förbättringar av regler som redan definierats i `AGENTS.md`.

## Arbetsträdsisolering — Claude Kodspecifikationer

- Bekräfta basgrenen med operatören via `AskUserQuestion` (Hård regel #19) om de inte redan har sagt det till dig.
- Skapa arbetsträdet med `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (det landar under `.claude/worktrees/`, hårdlänkar `node_modules` och kopierar `.husky/_`), anropa sedan `EnterWorktree` med sin `path`. Passera alltid basen: utan den väljer skriptet den högsta `release/*`, som kanske inte är den som operatören bekräftade. Ett arbetsträd som `EnterWorktree` skapar av sig själv har varken de hårda länkarna eller krokarna, så ingen pre-commit gate körs i den.

## Subagenter och git

Varje subagent som rör git (agentverktyg eller arbetsflödesskript) får Hard Rule #22 a:s `git stash` förbud ordagrant i sin prompt — den registrerade upprepningen av stash-incidenten kom via en subagent.

## Planera artefakter — superpowers väg åsidosätter

Superpowers färdigheter tillkännager standardvärden under `docs/superpowers/plans/`, `docs/superpowers/specs/` och `docs/research/`. Skriv om var och en till sin `_tasks/` motsvarighet i `AGENTS.md` → "Planning & Research Artifacts" innan du skriver, och begå den med `git -C _tasks …`, aldrig i huvudrepo.

## Skrapa filer — `_artifacts/`, inte `/tmp`

Det här projektet åsidosätter selens sessionsskrapplatta (`/tmp/claude-*/…`). Skriv temporära filer — -exporter, genererade zippar, enstaka mellanutgångar — till `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: en gitignorerad `_*` rotsökväg, så att operatören hittar och raderar alla scratch på ett ställe. Hållbara planer, specifikationer, forskning och hand-offs går till `_tasks/` istället (Hard Rule #23).

## Röd bas

För att dränera ett ackumulerat rött tillstånd (basspets + red PRs), använd `/sweep-reds` färdigheten.
