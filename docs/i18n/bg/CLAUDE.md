# CLAUDE.md (Български)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Всички правила на проекта са живи в [`AGENTS.md`](AGENTS.md)** — единственият източник на истина за всеки AI асистент; импортирането по-горе вече го зарежда. Не добавяйте отново правила за проекта тук. Всичко по-долу се прилага ONLY към Claude Код — оперативни усъвършенствания на правила, които вече са дефинирани в `AGENTS.md`.

## Изолация на работното дърво — Claude Специфики на кода

- Потвърдете основния клон с оператора чрез `AskUserQuestion` (твърдо правило #19), освен ако вече не ви е казал.
- Създайте работното дърво с `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (то се намира под `.claude/worktrees/`, твърди връзки `node_modules` и копира `.husky/_`), след което извикайте `EnterWorktree` с неговия `path`. Винаги предавайте базата: без нея скриптът избира най-високия `release/*`, който може да не е този, потвърден от оператора. Работно дърво, което `EnterWorktree` създава от само себе си, няма нито твърди връзки, нито кукички, така че в него не работи порта за предварително ангажиране.

## Субагенти и git

Всеки субагент, който докосне git (инструмент на агент или скрипт на работен поток), получава `git stash` забрана на Hard Rule #22 a дословно в подканата си — записаното повторение на инцидента със скривалище е дошло чрез субагент.

## Планиране на артефакти — superpowers път отмени

Уменията за суперсили обявяват настройки по подразбиране под `docs/superpowers/plans/`, `docs/superpowers/specs/` и `docs/research/`. Пренапишете всеки в неговия `_tasks/` еквивалент в `AGENTS.md` → „Артефакти за планиране и изследване“ преди да пишете и го ангажирайте с `git -C _tasks …`, никога в главното репо.

## Скреч файлове — `_artifacts/`, не `/tmp`

Този проект отменя скречпада на сесията на сбруята (`/tmp/claude-*/…`). Записване на временни файлове — експорти, генерирани zip файлове, еднократни междинни изходи — към `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: gitignored root `_*` път, така че операторът да намира и изтрива цялата нула на едно място. Трайни планове, спецификации, изследвания и предавания отиват вместо това към `_tasks/` (твърдо правило #23).

## Червена основа

За да източите натрупано червено състояние (основен връх + червено PRs), използвайте умението `/sweep-reds`.
