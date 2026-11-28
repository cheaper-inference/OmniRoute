# CLAUDE.md (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Alle Projektregeln leben in [`AGENTS.md`](AGENTS.md)** — die zentrale Informationsquelle für jeden AI Assistenten. Der obige Import lädt es bereits. Fügen Sie hier keine Projektregeln erneut hinzu. Alles Folgende gilt ONLY für Claude Code — operative Verfeinerungen von Regeln, die bereits in `AGENTS.md` definiert sind.

## Worktree-Isolation — Claude Code-Besonderheiten

- Bestätigen Sie den Basiszweig mit dem Operator über `AskUserQuestion` (Hard Rule #19), sofern er Ihnen dies nicht bereits mitgeteilt hat.
- Erstellen Sie den Arbeitsbaum mit `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (er landet unter `.claude/worktrees/`, verknüpft `node_modules` fest und kopiert `.husky/_`) und rufen Sie dann `EnterWorktree` mit seinem `path` auf. Übergeben Sie immer die Basis: Ohne sie wählt das Skript den höchsten `release/*` aus, der möglicherweise nicht derjenige ist, der vom Operator bestätigt wurde. Ein Arbeitsbaum, den `EnterWorktree` selbst erstellt, verfügt weder über feste Links noch über Hooks, sodass darin kein Pre-Commit-Gate ausgeführt wird.

## Subagenten und Git

Jeder Subagent, der Git (Agent-Tool oder Workflow-Skript) berührt, erhält die harte Regel #22 a's `git stash` ban wörtlich in seiner Eingabeaufforderung — Die aufgezeichnete Wiederholung des Stash-Vorfalls kam durch einen Subagenten.

## Planungsartefakte — Supermächte-Pfadüberschreibungen

Superkräftefähigkeiten kündigen Standardeinstellungen unter `docs/superpowers/plans/`, `docs/superpowers/specs/` und `docs/research/` an. Schreiben Sie jedes vor dem Schreiben in sein `_tasks/` Äquivalent in `AGENTS.md` → „Planning & Research Artifacts“ um und schreiben Sie es mit `git -C _tasks …` fest, niemals im Haupt-Repo.

## Scratch-Dateien — `_artifacts/`, nicht `/tmp`

Dieses Projekt überschreibt das Sitzungs-Scratchpad (`/tmp/claude-*/…`) des Harness. Schreiben Sie temporäre Dateien, — Exporte, generierte ZIP-Dateien und einmalige Zwischenausgaben — nach `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: einen gitignorierten Root `_*` Pfad, damit der Operator alle Kratzer an einem Ort findet und löscht. Dauerhafte Pläne, Spezifikationen, Recherchen und Übergaben gehen stattdessen an `_tasks/` (harte Regel #23).

## Rote Basis

Um einen angesammelten roten Zustand (Basisspitze + rot PRs) zu entleeren, verwenden Sie die Fähigkeit `/sweep-reds`.
