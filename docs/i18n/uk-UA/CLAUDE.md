# CLAUDE.md (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Усі правила проекту доступні в [`AGENTS.md`](AGENTS.md)** — єдине джерело правди для кожного помічника AI ; імпорт вище вже завантажує його. Не додавайте сюди повторно правила проекту. Усе, що наведено нижче, стосується ONLY до Claude Код — операційні вдосконалення правил, уже визначених у `AGENTS.md`.

## Ізоляція робочого дерева — Claude Особливості коду

- Підтвердьте базову гілку в оператора за допомогою `AskUserQuestion` (жорсткого правила #19), якщо вони ще не сказали вам.
- Створіть робоче дерево за допомогою `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (воно потрапляє під `.claude/worktrees/`, жорстко зв’язує `node_modules` і копіює `.husky/_`), а потім викличте `EnterWorktree` за допомогою `path`. Завжди передавайте базу: без неї сценарій вибирає найвищий `release/*`, який може не бути підтвердженим оператором. Робоче дерево, яке `EnterWorktree` створює самостійно, не має ні жорстких посилань, ні гаків, тому в ньому не працює шлюз попередньої фіксації.

## Субагенти та git

Кожен субагент, який торкається git (інструмента агента або сценарію робочого процесу), отримує дослівну заборону #22 жорсткого правила `git stash` a у своєму запиті — записане повторення інциденту зі сховищем надійшло через субагента.

## Планування артефактів — superpowers path overrides

Навички суперздатності оголошують значення за замовчуванням у `docs/superpowers/plans/`, `docs/superpowers/specs/` і `docs/research/`. Перепишіть кожен до його еквівалента `_tasks/` у `AGENTS.md` → «Артефакти планування та дослідження» перед записом і зафіксуйте його за допомогою `git -C _tasks …`, ніколи в основному репо.

## Скретч-файли — `_artifacts/`, а не `/tmp`

Цей проект перевизначає блокнот сеансу джгута (`/tmp/claude-*/…`). Записуйте тимчасові файли, експорти —, створені архіви, одноразові проміжні виходи — до `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: ігнорований кореневий шлях `_*`, щоб оператор знаходив і видаляв усі подряпини в одному місці. Натомість довгострокові плани, специфікації, дослідження та передачі надходять до `_tasks/` (Hard Rule #23).

## Червона основа

Щоб вичерпати накопичений червоний стан (наконечник основи + red PRs), використовуйте навик `/sweep-reds`.
