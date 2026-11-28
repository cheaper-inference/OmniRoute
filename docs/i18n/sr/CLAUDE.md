# CLAUDE.md (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Сва правила пројекта живе у [`AGENTS.md`](AGENTS.md)** — једини извор истине за сваког AI асистента; горњи увоз га већ учитава. Немојте поново додавати правила пројекта овде. Све у наставку примењује се ONLY на Claude Оперативна прецизирања кода — правила која су већ дефинисана у `AGENTS.md`.

## Изолација радног — Claude Специфичности кода

- Потврдите основну грану код оператера преко `AskUserQuestion` (тврдо правило #19) осим ако вам је већ рекао.
- Креирајте стабло рада помоћу `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (слеће под `.claude/worktrees/`, тврде везе `node_modules` и копира `.husky/_`), а затим позовите `EnterWorktree` са његовим `path`. Увек проследите базу: без ње скрипта бира највиши `release/*`, који можда није онај који је оператер потврдио. Радно стабло које `EnterWorktree` креира сам нема ни чврсте везе ни куке, тако да се у њему не покреће никаква капија пре урезивања.

## Субагенти и гит

Сваки подагент који дотакне гит (алатка агента или скрипту тока рада) добија дословно забрану #22 хард правила `git stash` а у свом промпту — забележено понављање инцидента са скривеним садржајем долази преко подагента.

## Планирање артефаката — суперсила пут надјачава

Вештине супермоћи објављују подразумеване вредности под `docs/superpowers/plans/`, `docs/superpowers/specs/` и `docs/research/`. Пре писања препишите сваки на његов `_tasks/` еквивалент у `AGENTS.md` → "Планнинг & Ресеарцх Артефацтс" и урезујте га помоћу `git -C _tasks …`, никада у главном репо-у.

## Гребајте датотеке — `_artifacts/`, не `/tmp`

Овај пројекат замењује блок за писање сесије појаса (`/tmp/claude-*/…`). Писање привремених датотека — извоза, генерисаних зипова, једнократних средњих излаза — до `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: гитигнорисана роот `_*` путања, тако да оператер проналази и брише све огреботине на једном месту. Издржљиви планови, спецификације, истраживања и предаје иду у `_tasks/` (тешко правило #23).

## Црвена база

Да испразните акумулирано црвено стање (основни врх + ред PRs), користите `/sweep-reds` вештину.
