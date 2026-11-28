# CLAUDE.md (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Wszystkie zasady projektu znajdują się w [`AGENTS.md`](AGENTS.md)** — jedyne źródło prawdy dla każdego asystenta AI ; powyższy import już go ładuje. Nie dodawaj tutaj ponownie reguł projektu. Wszystko poniżej dotyczy ONLY do Claude Code — udoskonaleń operacyjnych reguł już zdefiniowanych w `AGENTS.md`.

## Izolacja drzewa roboczego — Claude Specyfika kodu

- Potwierdź gałąź podstawową u operatora poprzez `AskUserQuestion` (twarda reguła #19), chyba że już ci powiedział.
- Utwórz drzewo robocze za pomocą `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (ląduje pod `.claude/worktrees/`, tworzy dowiązania twarde `node_modules` i kopiuje `.husky/_`), a następnie wywołuje `EnterWorktree` z jego `path`. Zawsze przekazuj bazę: bez niej skrypt wybiera najwyższy `release/*`, który może nie być tym, który potwierdził operator. Drzewo robocze, które `EnterWorktree` tworzy samodzielnie, nie ma ani twardych dowiązań, ani haków, więc nie działa w nim żadna bramka przed zatwierdzeniem.

## Subagenci i git

Every subagent that touches git (Agent tool or Workflow script) gets Hard Rule #22a's `git stash` ban verbatim in its prompt — the recorded recurrence of the stash incident came through a subagent.

## Planowanie artefaktów — supermoce zastępuje ścieżki

Umiejętności supermocy ogłaszają domyślne wartości w ramach `docs/superpowers/plans/`, `docs/superpowers/specs/` i `docs/research/`. Przepisz każdy z nich na jego odpowiednik `_tasks/` w `AGENTS.md` → „Artefakty planowania i badań” przed zapisaniem i zatwierdź go za pomocą `git -C _tasks …`, nigdy w głównym repozytorium.

## Pliki Scratcha — `_artifacts/`, a nie `/tmp`

Ten projekt zastępuje notatnik sesji uprzęży (`/tmp/claude-*/…`). Zapisuj pliki tymczasowe, eksporty —, wygenerowane zipy, jednorazowe pośrednie wyjścia — do `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: gitignorowana ścieżka root `_*`, dzięki czemu operator znajdzie i usunie wszystkie zadrapania w jednym miejscu. Zamiast tego trwałe plany, specyfikacje, badania i przekazania trafiają do `_tasks/` (twarda zasada #23).

## Baza czerwona

Aby opróżnić nagromadzony stan czerwony (podstawowa końcówka + red PRs), użyj umiejętności `/sweep-reds`.
