# CLAUDE.md (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Все правила проекта живут в [`AGENTS.md`](AGENTS.md)** — единственный источник достоверной информации для каждого помощника AI ; импорт выше уже загружает его. Не добавляйте сюда заново правила проекта. Все нижеприведенное относится к ONLY к Claude Код — оперативные уточнения правил, уже определенных в `AGENTS.md`.

## Изоляция рабочего дерева — Claude Особенности кода

- Подтвердите базовую ветвь у оператора через `AskUserQuestion` (жесткое правило #19), если вам еще не сказали.
- Создайте рабочее дерево с помощью `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (оно находится под `.claude/worktrees/`, жестко связывает `node_modules` и копирует `.husky/_`), затем вызовите `EnterWorktree` с его `path`. Всегда передавайте базу: без нее скрипт выбирает самый высокий `release/*`, который может не совпадать с тем, который подтвердил оператор. Рабочее дерево, которое `EnterWorktree` создает само по себе, не имеет ни жестких ссылок, ни перехватчиков, поэтому в нем не запускаются шлюзы предварительной фиксации.

## Субагенты и git

Каждый субагент, который обращается к git (инструмент агента или сценарий рабочего процесса), получает дословный бан жесткого правила #22 a в своем приглашении `git stash` — что зарегистрированный повтор инцидента с тайником произошел через субагента.

## Планирование артефактов: переопределение пути сверхспособностей —

Навыки сверхспособностей объявляют значения по умолчанию под `docs/superpowers/plans/`, `docs/superpowers/specs/` и `docs/research/`. Перепишите каждый из них в эквивалент `_tasks/` в `AGENTS.md` → «Planning & Research Artifacts» перед записью и зафиксируйте его с помощью `git -C _tasks …`, а не в основном репозитории.

## Скретч-файлы — `_artifacts/`, а не `/tmp`

Этот проект переопределяет блокнот сеанса жгута (`/tmp/claude-*/…`). Записывайте временные файлы экспорта —, сгенерированные zip-архивы, разовые промежуточные выходные данные — в `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: корневой путь `_*` с gitignored, поэтому оператор находит и удаляет все царапины в одном месте. Вместо этого долгосрочные планы, спецификации, исследования и передача данных передаются `_tasks/` (жесткое правило #23).

## Красная база

Чтобы истощить накопленное красное состояние (базовый наконечник + red PRs), используйте навык `/sweep-reds`.
