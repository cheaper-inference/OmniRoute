# Quality Gates Reference (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Цей документ є авторитетним довідником щодо всіх шлюзів якості CI в OmniRoute.
У ньому описано кожен шлюз, що він перевіряє, у якому завданні CI запускається, чи використовує
базову лінію з храповим механізмом або політику успішного/неуспішного проходження, а також чи блокує він збірку або має рекомендаційний характер.

Короткий огляд і політику списку дозволів див. у розділі "Шлюзи якості та храпові механізми"
у `AGENTS.md`. Критичну оцінку, класифікацію зрілості та незалежний від інструментів
план відтворення цієї ж системи див. у
[Посібнику зі шлюзів якості](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Інвентаризація гейтів і профілі виконання

### Допуск кандидатів

Робочі процеси CI та Quality Gates кожен видає стабільний вердикт: `Gate / CI` і
`Gate / Quality`. Їхня версійована політика допуску перераховує кожне висхідне
завдання як обов’язкове або рекомендаційне. Застосовне обов’язкове завдання має
завершитися успішно: відсутні, скасовані, пропущені, незавершені та невідомі
результати не можуть встановити PASS. Коректна класифікація лише документації
або лише каталогу може зробити кодовий напрям незастосовним; чернетка PR не є
прийнятим кандидатом. Мітка `hotfix` не скасовує вимогу щодо доказів.

Обидва робочі процеси охоплюють PR до гілок main/release, push до `main`, ручний
запуск і події merge-group. Push, dispatch і merge-group запускають повний вибір.
Push до `release/**` не запускає їх (2026-10-18): кожна зміна вже виконала матрицю
у своєму PR, а об’єднана комбінація є завданням Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane).
Forks і групи злиття використовують hosted runners для завдань, які інакше обирають
self-hosted runners; перед розгортанням потрібно перевірити достатню місткість
hosted.

Кожен JSON-квитанція ідентифікує SHA перевіреної версії, запуск робочого процесу
та спробу. CLI відхиляє невідповідність SHA checkout і події. Тести робочих процесів
прив’язують членство в політиці до списку `needs` завдання-вердикту, тому новий або
видалений напрям не може непомітно зникнути. Квитанції охоплюють власний робочий
процес, але не публікацію, розгортання чи внутрішню логіку наявного рекомендаційного
сканера. Активація обох назв перевірок у правилах гілки є окремою адміністративною
зміною; додавання цих завдань саме по собі не захищає гілку.

### Інвентаризація статичного сканування

Версійований інвентар npm-аліасів і членство в статичному скануванні містяться у
`config/quality/gate-manifest.json`. Виконайте `npm run check:gate-manifest`, щоб
перевірити назви скриптів і точні команди відповідно до `package.json`; додавання,
видалення та зміна команд призводять до помилки як локального хуку, так і завдань
класифікації змін у CI. Аліас не є завданням робочого процесу, екземпляром матриці
чи тестовим прикладом: ці кількості не можна подавати як взаємозамінні.

Використовуйте `npm run quality:scan -- --list` або `npm run quality:scan:fast -- --list`,
щоб переглянути вибрані аліаси без їх виконання. Виконавець викликає npm entrypoint,
тому його середовище виконання (зокрема Bun, якщо налаштовано) зберігається.
Маніфест записує аліаси поза цими профілями як такі, що викликаються окремо, а
команди обслуговування заборонені в профілях сканування лише для читання.

Ці профілі охоплюють лише статичне сканування. Вони не сертифікують продуктові
тести, покриття, пакування, зовнішні перевірки чи повне приймання кандидата до
релізу. Допуск у робочому процесі використовує пов’язаний
`config/quality/admission-policy.json` і `scripts/quality/admission-verdict.mjs`.
Профілі Release-observer залишаються окремими; перевіряйте їхні застосовні
перевірки та квитанції незалежно. Наведений нижче описовий інвентар є довідковим
і не доводить, що гейт справді було запущено.

Скрипти розташовані в `scripts/check/` (гейти політики) та `scripts/quality/`
(механізм ратчетингу). Джерелом істини для CI є `.github/workflows/ci.yml`.

### Швидкий шлях для PR до релізу (`quality.yml`)

`.github/workflows/quality.yml` доповнює CI для PR до main/release, push до `main`,
dispatch і груп злиття. Для PR використовуються швидкі перевірки з фільтрацією за
шляхами. Назавжди вимкнену дубльовану збірку видалено; справжні перевірки збірки,
пакування та запуску залишаються в CI.

| Job                                              | Scope                                                                                                                                                                                                                                 | Blocking             |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | PR документації/коду; посилання на API-документацію та docs-all                                                                                                                                                                       | Yes                  |
| `Fast Quality Gates`                             | PR коду; статичні перевірки, перевірка типів, перевірка типів dashboard, модульні тести для змінених компонентів                                                                                                                      | Yes                  |
| `Forgotten sibling tests`                        | PR коду; змінені модулі, відстежені до статичних споживачів і кандидатних споріднених тестів; шляхи barrel та динамічного імпорту повідомляються як рекомендаційна діагностика, з винятками, посилання на які містить список дозволів | **Advisory**         |
| `Vitest (fast-path)`                             | PR коду; швидкий набір vitest                                                                                                                                                                                                         | Yes                  |
| `Unit Tests fast-path`                           | PR коду; набір модульних тестів із 4 сегментів                                                                                                                                                                                        | Yes                  |
| `No new ESLint warnings`                         | PR коду; захист lint із урахуванням подавлень                                                                                                                                                                                         | Yes, including forks |
| `Merge integrity (changelog + generated skills)` | PR не в статусі чернетки; синхронізація changelog і згенерованих навичок                                                                                                                                                              | Yes, including forks |

#### Звіт про забуті споріднені тести

`npm run check:forgotten-sibling-tests` повторно використовує засіб розв’язання імпортів, що лежить в основі карти впливу тестів.
Для кожного зміненого робочого модуля він повідомляє детерміновані
ланцюжки `changed module/symbol -> static consumer -> candidate sibling test`, якщо кандидатний
тест відсутній у diff запиту на злиття. Підсумок у форматі Markdown і результат у форматі JSON зберігаються як
артефакт робочого процесу `forgotten-sibling-tests` для калібрування перед будь-яким блокувальним розгортанням.

Повторні експорти через barrel-файли та динамічні імпорти є лише діагностикою розв’язання; вони ніколи не створюють
блокувального порушення. Переглянуті винятки зберігаються у
`config/quality/forgotten-sibling-allowlist.json`. Кожен запис має містити назви споживача й
кандидатного тесту, конкретне обґрунтування та посилання на GitHub issue або pull request. Некоректно сформовані записи призводять до
блокування за замовчуванням. Винятки не можуть приховати видалений кандидатний тест або diff, що додає `.skip`/`.todo`;
послаблення перевірок та інші способи маскування залишаються відповідальністю незалежного блокувального
контролю `check:test-masking`.

### Завдання: `lint`

Запускається для кожного PR до `main`. У разі помилки блокує злиття.

| Скрипт (`npm run ...`)            | Перевіряє                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Блокує                                          |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `check:node-runtime`              | Версія Node.js входить до підтримуваного діапазону                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Так                                             |
| `check:cycles`                    | Циклічні імпорти в усіх `src/` + `open-sse/` (на основі AST, із розв’язанням `paths` у tsconfig). Без суфікса завершується з кодом 1, коли існує будь-який цикл (fail-closed починаючи з #15281), і перелічує SCC. `check:cycles:ratchet` (саме його запускає CI) блокує виконання, коли кількість перевищує обмеження `metrics.cycles` у `quality-baseline.json` — наразі 14, `direction: down`, тож вона може лише зменшуватися (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Так (ratchet)                                   |
| `check:boundary`                  | Взаємозв’язок `open-sse → src`: унікальні імпорти між файлами з рушія до застосунку (`scripts/quality/measure-boundary.mjs`; список зв’язків є беклогом усунення проблем у ядрі/поділі модулів v4). Без суфікса формує рекомендаційний звіт (так само, як `quality:boundary`). `check:boundary:ratchet` (саме його запускає CI, також у циклі ratchet швидких перевірок `quality.yml`) блокує виконання, коли кількість перевищує обмеження `metrics.boundaryOpenSseToSrc` у `quality-baseline.json` — початкове значення дорівнює виміряному 771, `direction: down`; `--update` лише зменшує його; у PR використовується відносно бази (`--base-ref`, див. нижче)                                                                                                                                                                                                                                                                                                                                                                                                                                          | Так (ratchet)                                   |
| `check:route-validation:t06`      | Схеми Zod наявні в усіх маршрутах (політика рівня 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Так                                             |
| `check:any-budget:t11`            | Кількість `@ts-expect-error // any` не перевищує ліміт (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Так                                             |
| `check:provider-consistency`      | Кожен постачальник у `providers.ts` має відповідний запис у `providerRegistry.ts` (і навпаки, у межах списку дозволених)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Так                                             |
| `check:model-lifecycle`           | Три таблиці маршрутизації, які підтримуються вручну, залишаються узгодженими з фіксованим знімком життєвого циклу (#11503): `FITNESS_TABLE` (`taskFitness.ts`) не нараховує бали для ідентифікатора, який вийшов із використання та який може маршрутизувати `REGISTRY`; кожна ціль `BUILT_IN_ALIASES` присутня в `REGISTRY` і відсутня у знімку ідентифікаторів, що вийшли із використання; кожен ідентифікатор, що вийшов із використання, але все ще присутній у `REGISTRY`, перенаправляється або зазначений у `allowedRetiredInCatalog`; а жодне джерело чи ціль `DEFAULT_DEGRADATION_MAP` не позначені як такі, що вийшли із використання, у цьому знімку. Це не доводить, що модель наразі обслуговується активним upstream. Працює офлайн — порівнює з `config/quality/model-lifecycle.json`, який оновлюється вручну за допомогою `npm run quality:refresh-model-lifecycle` (мережа; не підключено до CI). `allowedRetiredInCatalog` — це ратчет для скорочення списку: додавайте запис лише разом із задачею для відстеження.                                                                     | Так                                             |
| `check:fetch-targets`             | Кожен `fetch("/api/...")` у клієнтському `src/` відповідає реальному `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Так                                             |
| `check:deps`                      | Усі залежності, які можна встановити за допомогою `npm install`, у кожному `package.json` репозиторію містяться в `dependency-allowlist.json`; виявляються нові пакети без фіксованої версії або пакети, що імітують назви легітимних пакетів                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Так                                             |
| `audit:deps`                      | `npm audit` (кореневий проєкт + electron) — відсутні рекомендації щодо усунення вразливостей із високим або критичним рівнем (перетинається з osv `check:vuln-ratchet`; див. Backlog раціоналізації)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Так                                             |
| `check:lockfile`                  | Цілісність `package-lock.json` — реєстр https, хеші цілісності, без перевизначень хосту                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Так                                             |
| `check:licenses`                  | Список дозволених ліцензій SPDX для виробничих залежностей                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Так                                             |
| `check:tracked-artifacts`         | Відсутні артефакти збірки / символічні посилання на зафіксований `node_modules` (також запускається в husky pre-commit; pre-push навмисно полегшений — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Так                                             |
| `check:ai-attribution`            | Відсутні трейлер `Co-Authored-By` від ШІ/бота або нижній колонтитул про генерацію ШІ в комітах PR, заголовку чи тексті — Жорстке правило №16 (у циклі швидких перевірок `quality.yml` для PR→`release/**` — читає дані події, нічого не робить поза PR — і в окремому кроці лише для PR у lint `ci.yml` для PR→`main`; також у хуку husky `commit-msg`; співавтори-люди дозволені; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:vitest-exclusions`         | Кожне виключення Vitest містить посилання на задачу відстеження та зазначене в `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Так                                             |
| `check:file-size`                 | Вихідні файли (`.ts`/`.tsx` у `src/`, `open-sse/`, `electron/`, `bin/`) не перевищують `cap`, а тестові файли (`*.test.ts(x)`) — `testCap`; файли, зафіксовані у `file-size-baseline.json` (`frozen` / `testFrozen`), не повинні перевищувати записаний для них розмір                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Так                                             |
| `check:error-helper`              | Відповіді з помилками у виконавцях/обробниках використовують `buildErrorBody()` / `sanitizeErrorMessage()` (Жорстке правило №12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Так                                             |
| `check:migration-numbering`       | Файли SQL-міграцій мають послідовну нумерацію, без пропусків і дублікатів                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Так                                             |
| `check:public-creds`              | Немає літералів OAuth `client_id`/`client_secret` або вебключів Firebase за межами `publicCreds.ts` (Жорстке правило №11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Так                                             |
| `check:db-rules`                  | Немає необробленого SQL за межами модулів `src/lib/db/`; немає імпортів через barrel-файли з `localDb.ts` (Жорсткі правила №2/№5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Так                                             |
| `check:known-symbols`             | Виконавці провайдерів, стратегії маршрутизації та транслятори, зареєстровані в таблицях диспетчеризації, відповідають файлам на диску — немає осиротілих або незадекларованих символів                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Так                                             |
| `check:route-guard-membership`    | Кожен маршрут, який запускає дочірній процес, класифікується за допомогою `isLocalOnlyPath()` (Жорсткі правила №15/№17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Так                                             |
| `check:test-discovery`            | Кожен файл `*.test.ts` / `*.spec.ts` у репозиторії збирається принаймні одним засобом запуску тестів (правило поступового посилення: список файлів-сиріт у `test-discovery-baseline.json` може лише скорочуватися)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Так                                             |
| `check:test-tla-order`            | Жоден файл `node:test` у `tests/unit` не реєструє тест, не досягає `await` на верхньому рівні, а потім не реєструє додаткові тести (#18045; правило поступового посилення: `test-tla-order-allowlist.json` може лише скорочуватися)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Так                                             |
| `check:agent-skills-sync`         | Згенеровані артефакти agent-skills відповідають їхньому вихідному каталогу (розбіжностей немає)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:provider-asset-provenance` | Логотипи й ресурси провайдерів мають відповідний запис про походження                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `lint:json`                       | Файли конфігурації JSON успішно розбираються та відповідають правилам лінтингу репозиторію                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `typecheck:core`                  | Компіляція TypeScript без помилок (лише попередження інформаційного характеру)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Так                                             |
| `typecheck:noimplicit:core`       | Строгий `noImplicitAny` — орієнтований на майбутнє; багато наявних викликів усе ще потребують анотацій                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **Рекомендаційний** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` в області `src/app/(dashboard)/**` (#7033) — підібраний список дозволених із 27 файлів для `typecheck:core` не містить жодного dashboard TSX, а `next build` також ніколи не перевіряє типи для нього (`next.config.mjs` встановлює `ignoreBuildErrors: true`), тому регресії з ідентифікаторами-сиротами там (#6625/#6909) залишалися невидимими для CI. Відмінності порівнюються із зафіксованою базовою кількістю помилок для кожного файлу/коду TS (`config/quality/dashboard-typecheck-baseline.json`, за тією самою схемою застарілого контролю, що й `check:known-symbols`) — лише НОВІ помилки понад базову кількість блокують перевірку; зменшуйте лічильник за допомогою `--update`, коли наявну помилку виправлено.                                                                                                                                                                                                                                                                                                                                                                        | Так                                             |
| `check:build-typecheck`           | Перевірка типів усього застосунку для продакшну через `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), яку не охоплюють поверхня з 27 файлів, дозволених для `typecheck:core`, і перевірка dashboard. Відмінності порівнюються з `config/quality/build-typecheck-baseline.json`; нова або збільшена кількість для пари (файл, код) спричиняє помилку, а менша кількість просить вас зменшити базове значення. `--update` відмовляється працювати, якщо під час запуску наявна нова або збільшена пара, доки не передано `--force-regressions`, і відмовляється для щойно замовчуваного файлу, доки не передано `--force-nocheck`, тож розширення базової кількості для отримання успішного результату та надання постійного замовчування є двома окремими свідомими діями. Простий `--force` відхиляється. Також перевіряє область збірки на наявність `@ts-nocheck` відповідно до `config/quality/ts-nocheck-baseline.json`, оскільки файл, який його використовує, взагалі не повідомляє про діагностику інакше залишався б невидимим для кожної перевірки. | Так                                             |

#### Дві програми перевірки типів дають різні відповіді

`typecheck:core` і `check:build-typecheck` компілюють різні програми з різними
параметрами, тому той самий файл може бути чистим в одній і містити безліч помилок в іншій.

`tsconfig.build.json` встановлює `"strict": false`, тому `noImplicitAny` вимкнено. Основна
конфігурація компілює підібраний список дозволених із 27 файлів із суворішими параметрами
та переходить за графом імпортів кожного запису, тому файли, які ніколи не з’являються в
програмі збірки, усе одно перевіряються там.

Цей наслідок важливий під час визначення, чи типізовано файл: **нуль діагностичних
повідомлень у `check:build-typecheck` не означає нуль**. Видалення `@ts-nocheck` із 26
файлів показало, що 23 з них чисті в програмі збірки; у шістнадцяти з них у строгій
програмі виявилося близько 120 помилок implicit-any. Перевірте обидві програми, перш ніж
вважати файл чистим.

### Завдання: `quality-gate`

Запускається після `test-coverage`. Блокує злиття в разі помилки.

| Script                       | Перевіряє                                                                                                                                                                                 | Блокування          |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `quality:collect`            | Створює `quality-metrics.json` (кількість попереджень ESLint, покриття з об’єднаного звіту шардів)                                                                                        | Так (перед ratchet) |
| `quality:ratchet`            | Жодна метрика в `quality-baseline.json` не погіршилася (попередження ESLint ≤ базового значення; покриття ≥ базового значення)                                                            | Так                 |
| `check:duplication`          | Дублювання коду (jscpd@4) не перевищує базове значення в `quality-baseline.json`                                                                                                          | Так                 |
| `check:complexity`           | Цикломатична складність на рівні файлу не перевищує обмеження (основні правила ESLint `complexity` + `max-lines-per-function`)                                                            | Так                 |
| `check:cognitive-complexity` | Ратчет когнітивної складності (`eslint-plugin-sonarjs`) — окремий запуск ESLint; CI запускає обидва, об’єднані в один крок `check:complexity-ratchets`                                    | Так                 |
| `check:dead-code`            | Ратчет невикористовуваних експортів / файлів (knip) не погіршився порівняно з базовим значенням                                                                                           | Так                 |
| `check:compression-budget`   | Бюджет тесту стиснення — мінімальні значення економії токенів для кожного рушія не мають погіршуватися                                                                                    | Так                 |
| `check:type-coverage`        | Ратчет відсотка типізованого коду (`type-coverage`) не погіршився; значною мірою охоплює `typecheck:noimplicit:core`                                                                      | Так                 |
| `check:codeql-ratchet`       | Кількість відкритих сповіщень CodeQL не погіршилася (зчитується через `gh api`; без токена коректно пропускається) — періодичність оновлення та ручний запуск: див. нижче «Ратчет CodeQL» | Так                 |

### Завдання: `quality-extended`

Усе завдання є рекомендаційним (`continue-on-error: true`). Ратчети на основі npm виконуються
фактично; зовнішні сканери встановлюються через `gh release download` і самостійно пропускаються (з кодом виходу 0),
якщо бінарний файл досі відсутній.

| Script                   | Перевіряє                                                                                                                                                                                                                               | Блокування                                    |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `check:circular-deps`    | Відсутність циклічних залежностей (dpdm)                                                                                                                                                                                                | **Рекомендаційне**                            |
| `check:bundle-size`      | Розмір бандла не перевищує обмеження                                                                                                                                                                                                    | **Рекомендаційне**                            |
| `check:secrets`          | Сканування секретів (gitleaks) — пропускається, якщо бінарний файл відсутній                                                                                                                                                            | **Рекомендаційне**                            |
| `check:vuln-ratchet`     | Вразливості залежностей (osv-scanner) не погіршилися — пропускається, якщо бінарний файл відсутній                                                                                                                                      | **Рекомендаційне**                            |
| `check:workflows`        | Лінтинг робочих процесів (actionlint + zizmor); відсутні/несправні сканери, недійсні звіти або відсутня базова лінія ратчета призводять до помилки INCOMPLETE. Дійсні результати відповідають вибраній політиці strict/advisory/ratchet | Потрібне виконання; ратчет zizmor блокує в CI |
| `check:openapi-breaking` | Несумісні зміни публічного API-контракту (`openapi.yaml`) порівняно з базовою гілкою (oasdiff) — створює `openapiBreaking=N`; пропускається, якщо oasdiff відсутній або базову специфікацію неможливо визначити                         | **Рекомендаційне**                            |

### Завдання: `docs-sync-strict`

Запускається під час кожного PR до `main`. У разі помилки блокує злиття.

| Script                         | Перевіряє                                                                                                                                                                                   | Блокує                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `check:docs-all`               | Меташлюз, який послідовно запускає 6 наведених нижче підшлюзів                                                                                                                              | Так                         |
| ↳ `check:docs-sync`            | Узгодженість версій CHANGELOG / OpenAPI / llm.txt                                                                                                                                           | Так                         |
| ↳ `check:docs-counts`          | Кількість у прозі (кількість провайдерів, міграцій тощо) перебуває в межах вікна рачету фактичної кількості                                                                                 | Так                         |
| ↳ `check:env-doc-sync`         | Кожна змінна середовища у `.env.example` задокументована в таблиці документації, і навпаки                                                                                                  | Так                         |
| ↳ `check:deprecated-versions`  | У документації немає застарілих рядків версій                                                                                                                                               | Так                         |
| ↳ `check:doc-links`            | Внутрішні посилання Markdown у документації ведуть до наявних файлів (форма `[text]`/`(path)`)                                                                                              | Так                         |
| ↳ `check:fabricated-docs`      | Маршрути, змінні середовища, команди CLI, назви хуків і шляхи до файлів, наведені в документації, існують у кодовій базі. Жорстка перевірка через `--strict`; без прапорця — м’яка помилка. | Так (через `--strict` у CI) |
| `check:cli-i18n`               | Рядки команд CLI присутні в усіх файлах локалей i18n                                                                                                                                        | Так                         |
| `check:openapi-coverage`       | Специфікація OpenAPI охоплює щонайменше встановлену рачетом мінімальну кількість реальних маршрутів                                                                                         | Так                         |
| `check:openapi-security-tiers` | Анотації рівнів безпеки в `openapi.yaml` узгоджені з класифікаціями `routeGuard.ts`                                                                                                         | **Дорадчий**                |
| `check:openapi-routes`         | Кожен шлях у `openapi.yaml` відповідає наявному `route.ts` (захист від галюцинацій)                                                                                                         | Так                         |
| `check:docs-symbols`           | Кожне посилання `/api/...` у `docs/**/*.md` відповідає наявному `route.ts` (захист від галюцинацій)                                                                                         | Так                         |
| `i18n translation drift`       | Неперекладені ключі у файлах локалей i18n — лише попередження                                                                                                                               | **Дорадчий**                |

Дванадцять README SVG у `docs/diagrams/` генеруються (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` повторно генерує їх усі). Для кожного є модульний тест
порівняння байтів (`tests/unit/docs/readme-*-svg.test.ts`, завдання `test-unit`), який завершується
помилкою, якщо зафіксований файл застарів, а `check:docs-counts` зчитує канонічні числа з їхніх вузлів `<text>` —
саме тому крок перетворення на контури зберігає кожен перетворений рядок у файлі як невидимий `<text>`. Перевірка
канонічних чисел SVG зчитує файли, перелічені в
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, а також `public/images/tier-flow-dark.svg` і `tier-flow-light.svg`; твердження про
free-forever, catalog-entry, recurring-pool і scoring-factors також зчитують
`promise-pillars.svg`, `free-tier-budget.svg` і `strategies-grid.svg`. `free-tier-budget.svg`
отримує свої значення з активного завантажувача каталогу, тому зміна `FREE_MODEL_BUDGETS` або відображуваного імені
провайдера спричиняє помилку CI, доки цей файл не буде повторно згенеровано.

### Завдання: `i18n-ui-coverage`

| Script                            | Перевіряє                                                                                                                                                                                                           | Блокує       |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check-ui-keys-coverage` (inline) | Охоплення ключів UI i18n становить ≥ 65%                                                                                                                                                                            | Так          |
| `check-ui-value-drift` (inline)   | Переписане англійське **значення** не залишає застарілого перекладу                                                                                                                                                 | Так          |
| `check-new-key-coverage` (inline) | **Новий** англійський ключ перекладено в кожній локалі — маркер `__MISSING__:` відхиляється                                                                                                                         | Так          |
| `check-translation-ratio`         | Коефіцієнт реальних перекладів для кожної локалі (ідентичні англійському / заповнювачі / відсутні значення поза списком дозволених) не повинен перевищувати `config/quality/i18n-translation-baseline.json` + запас | **Дорадчий** |

Потрібен `fetch-depth: 0` — шлюз перевірки дрейфу значень порівнює `en.json` з базою злиття.

#### `check-ui-value-drift` — шлюз перевірки застарілих перекладів

Виявляє єдину регресію i18n, яку інші структурні перевірки не можуть побачити: значення англійською переписано, а переклади, створені на основі _попередньої_ англійської версії, залишилися без змін, тож користувачі неанглійською мовою продовжують упевнено читати текст, який тепер є неправильним.

Це справді потрапило у реліз. `oauthModal.googleOAuthWarning` було переписано після появи помічника входу Antigravity (#5203); **39 із 43 локалей** зберегли текст із вказівкою «скопіюйте повну URL-адресу та вставте її нижче» — процес, який для цього провайдера неможливо завершити. Це залишалося непоміченим до #8463, оскільки:

- `sync-ui-keys` доповнює лише **відсутні** ключі, але ніколи не оновлює **застарілі**;
- `check-ui-keys-coverage` рахує _наявність_ ключа, тому застарілий переклад вважається таким, що має покриття;
- `check-translation-drift` відстежує дзеркала документації `docs/i18n/<locale>/**.md` —
  він ніколи не читає `src/i18n/messages/*.json`. Блокує в завданні `docs-sync-strict` після повторної синхронізації у 2026-09: відредагуйте основний документ → `npm run i18n:run -- --files=<doc>` (на рівні секції, швидко).

**Враховує зміни, а не базову лінію.** Він порівнює `en.json` у точці злиття з робочим деревом; для кожного ключа, значення якого англійською змінилося, переклад у будь-якій локалі, що залишився без змін, вважається застарілим. Це навмисно **заморожує наявний борг** — за змінами неможливо визначити, на основі якої старої англійської версії було створено давній переклад, тому перевірка оцінює лише те, чого торкається поточна зміна. Альтернатива — базова лінія з хешами для кожного ключа — вимагала б згенерованого файлу розміром близько 600 КБ, що втричі перевищує найбільшу наявну базову лінію, і спричиняла б зміни в кожному PR, пов’язаному з i18n.

Є два способи це виконати:

1. оновити відповідні переклади, або
2. встановити для них `__MISSING__:<new english>` — тоді середовище виконання показуватиме виправлений текст англійською
   (`src/i18n/request.ts::deepMergeFallback`, #7258), а ключ буде додано до черги перекладу.

Якщо змінилося **значення** рядка, краще **перейменувати ключ**: новий ключ не може успадкувати застарілий переклад. Саме такий підхід використано в #8463.

```bash
npm run i18n:check-value-drift          # строгий режим (його запускає CI)
npm run i18n:check-value-drift:warn     # лише звіт
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Завершується з кодом 0 і `SKIP reason=base-unresolved`, якщо базовий каталог неможливо прочитати (поверхневий клон без базового ref), аналогічно до `check-openapi-breaking`.

### Завдання: `i18n`

Повна матриця перевірок i18n (окреме завдання для кожної локалі). Усе завдання має рекомендаційний характер.

| Скрипт                          | Перевіряє                           | Блокування                                                         |
| ------------------------------- | ----------------------------------- | ------------------------------------------------------------------ |
| `validate_translation.py quick` | Повноту перекладу для кожної локалі | **Рекомендаційне** (`continue-on-error: true` для всього завдання) |

### Завдання: `pr-test-policy`

Запускається лише для pull request.

| Скрипт                 | Перевіряє                                                                                                                                        | Блокування |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `check:pr-test-policy` | PR, що змінюють робочий код у `src/`, `open-sse/`, `electron/` або `bin/`, мають містити або оновлювати тести (Жорстке правило №8)               | Так        |
| `check:test-masking`   | Змінені файли тестів не зменшують загальну кількість assert і не додають тавтологій `assert.ok(true)`                                            | Так        |
| `check:pr-evidence`    | Опис PR містить посилання на докази тестування/VPS для зміни (механізує Жорстке правило №18 шляхом пошуку в тексті PR — ненадійно, див. Backlog) | Так        |

### Завдання: `test-vitest`

Запускається після `build`. Блокує злиття в разі помилки.

| Набір            | Перевіряє                                                         | Блокування                                                                                                            |
| ---------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-сервер (110 інструментів), autoCombo, кеш — виконавець vitest | Так                                                                                                                   |
| `test:vitest:ui` | Тести компонентів UI — виконавець vitest                          | **Блокує** — наявні раніше помилки явно виключено у `vitest.config.ts`; нові помилки призводять до невдалого завдання |

### Нічні робочі процеси (заплановані, рекомендаційні)

Вони запускаються за розкладом cron (і через `workflow_dispatch`), але ніколи не запускаються для PR. Усі вони мають рекомендаційний характер.

| Робочий процес         | Перевіряє                                                                                                                                                               | Блокування         |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `nightly-property`     | тести властивостей fast-check із випадковим початковим значенням + великою кількістю запусків                                                                           | **Рекомендаційне** |
| `nightly-resilience`   | перевірка зростання heap, хаотичне введення збоїв, навантажувальне/тривале тестування k6                                                                                | **Рекомендаційне** |
| `nightly-llm-security` | захист від ін’єкцій promptfoo (режим блокування) + зондування garak (пропускається без секрету провайдера)                                                              | **Рекомендаційне** |
| `nightly-schemathesis` | фаззинг контракту OpenAPI (schemathesis) проти активного OmniRoute із використанням `docs/openapi.yaml` — виявляє порушення специфікації / необроблені 500 (Fase 8 B.4) | **Рекомендаційне** |
| `nightly-mutation`     | показник мутаційного тестування Stryker у швидкому модулі модульних тестів — мутанти, що вижили, виявляють слабкі перевірки                                             | **Рекомендаційне** |
| `nightly-compat`       | матриця сумісності рушія Node у підтримуваних діапазонах `engines.node`                                                                                                 | **Рекомендаційне** |

Базові показники продуктивності (heap, TTFB, час збірки) записуються, але не блокують: див. [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Фаза швидкості (2026-08-30 → v4.0 LTS): усі базові обмеження послаблено на 20%

Рішення власника (2026-08-30): до модульної перебудови v4.0 швидкість випуску важливіша
за стримування технічного боргу. Усі **числові** базові обмеження храпового механізму було послаблено на 20% за один
аудитований прохід, а фазу оголошено в `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Що змінило                                                                                                                                                                                                                         | Де                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — лічильники, де менше — краще, ×1.2; відсотки, де більше — краще, ÷1.2 (мінімальне покриття залишено на рівні 60, `eslintErrors` залишається 0, `eslintWarnings` 0 → 20% від зафіксованої кількості приглушень) | `quality-baseline.json` (примітка `_relax_velocity_2026_08_30` містить усі значення до → після)        |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                   | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, обмеження кількості рядків для кожного `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                        | `file-size-baseline.json`                                                                              |
| кількість для кожного файлу / TS-коду ×1.2                                                                                                                                                                                         | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` стає рекомендаційним, поки `_policy.requireTighten === false`                                                                                                                                                  | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| нічне завдання `bank-ratchet-shrinks` призупинено (інакше воно зафіксувало б виміряне скорочення та скасувало запас)                                                                                                               | `.github/workflows/nightly-release-green.yml`                                                          |

Списки дозволів (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **не** є бюджетами, тому їх не змінювали. Політики перевірок із результатом «пройдено/не пройдено» (секрети, правила SQL,
контракт документації/середовища, паритет i18n, модульні тести) не змінилися — червоний тест залишається червоним.

**Інструменти**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — одноразове
  послаблення (`scripts/quality/relax-baselines.mjs`); відмовляється запускатися двічі з тією самою
  приміткою.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  вимірює кожну числову перевірку так само, як це робить CI, і виводить залишок запасу для кожної перевірки
  (`scripts/quality/baseline-headroom.mjs`). Нічне завдання `baseline-headroom` публікує
  таблицю в підсумку запуску робочого процесу та завантажує свій звіт у форматах JSON/Markdown як
  `baseline-headroom-<run_id>` зі зберіганням протягом 90 днів. Рядки з попередженнями та критичними станами визначають перевірки,
  що перебувають у межах 10% від свого обмеження або вже перевищили його. Переглядайте ці звіти як раннє попередження про
  вичерпання бюджетів; перевіряйте примітки `_rebaseline_*` відповідної перевірки. Завдання більше
  не створює й не оновлює постійну задачу; #12149 зберігає попередню історію звітів.

**Режим нового коду (Clean-as-You-Code) — з 2026-08-30, лише для швидкого шляху PR**

Для подій `pull_request` файл `quality.yml` передає `--base-ref <PR base SHA>` до `check:file-size`,
`check:complexity-ratchets` і `check:dead-code`. Для `check:complexity-ratchets` і
`check:dead-code` перевірка порівнює HEAD із базою злиття **лише для файлів, яких торкнувся PR**
(`scripts/check/newCodeMode.mjs`: база злиття матеріалізується в тимчасовому
`git worktree`, ESLint/knip запускаються там і на HEAD, після чого порівнюються різниці кількості для кожного файлу):

- **блокує** — PR додав порушення цикломатичної/когнітивної складності або мертві експорти у змінених ним файлах
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` у журналі);
- **рекомендаційна** — глобальна загальна кількість порівняно із зафіксованою базовою лінією. Успаджене відхилення ніколи не робить
  невинний PR червоним; відхилення повторно фіксується під час узгодження випуску та відстежується завданням контролю запасу.

`check:file-size` використовує базове посилання за власними правилами (`scripts/check/check-file-size.mjs`, #8522):
він перевіряє кожен файл вихідного коду й тестів у дереві, зчитує кількість рядків кожного з них у базі PR
за допомогою `git show` і позначає файл як непройдений лише тоді, коли той виростає понад більше з двох значень: його базову верхню межу
(`frozen` / `testFrozen` або `cap` / `testCap` для файлу поза базовою лінією) чи його базовий
розмір. Тому файл, який уже відхилився в базі, ніколи не робить невинний PR червоним.

`check:boundary:ratchet` застосовує те саме правило до свого єдиного числа
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): під час подій PR і швидкі
перевірки `quality.yml`, і завдання lint у `ci.yml` передають SHA базової версії PR; базовий коміт
вимірюється з експорту `git archive`, а PR завершується помилкою лише тоді, коли кількість його
зв’язків `open-sse → src` перевищує більше зі значень `metrics.boundaryOpenSseToSrc` і кількості
в базовій версії. Дрейф базової версії вище граничного значення повідомляється
(`base drift herdado`), але ніколи не спричиняє помилку в невинному PR; push → main
зберігає абсолютне граничне значення, а якщо SHA базової версії неможливо визначити,
використовується це значення з попередженням.

Запуски `workflow_dispatch`, повна перевірка перед релізом і нічне завдання перевірки запасу
не мають базової версії PR та зберігають абсолютне (глобальне) порівняння. Покриття,
дублювання й покриття типами наразі залишаються глобальними (їхні інструменти не дають змоги
дешево отримати різницю для окремих файлів) — це кандидати на таку саму обробку.

**Завершення етапу на v4.0 (LTS = суворіше, ніж раніше, а не «повернення до норми»)**

1. На чистій верхівці `release/v4.0.0`: виконайте `npm run quality:headroom --json` для фіксації,
   потім `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, а також `--update` для кожної
   перевірки типів — усі базові значення знижуються до виміряного рівня.
2. Видаліть `_policy` з `quality-baseline.json` (це повторно активує `--require-tighten` і нічне
   накопичення запасу), відновіть `THRESHOLD = 36` (або вище) у `check-openapi-coverage.mjs`.
3. Зробіть обмеження суворішими за виміряні значення там, де модульність дала результат:
   поверніть `cap` розміру файлу до 1000 (або 800), підвищте мінімальні пороги покриття на 5,
   установіть 0 мертвих експортів для модульних пакетів.

## Базовий рівень храповика (`quality-baseline.json`)

Механізм храповика (`scripts/quality/check-quality-ratchet.mjs`) зчитує `quality-baseline.json`
і порівнює його зі щойно зібраним `quality-metrics.json`. Будь-яка метрика, що погіршується
понад допустиме значення epsilon, призводить до невдалої збірки.

Метрики, які наразі відстежуються:

| Метрика               | Напрямок | Значення                                         |
| --------------------- | -------- | ------------------------------------------------ |
| `eslintWarnings`      | `down`   | Кількість попереджень ESLint не повинна зростати |
| `coverage.statements` | `up`     | Покриття інструкцій не повинно зменшуватися      |
| `coverage.lines`      | `up`     | Покриття рядків не повинно зменшуватися          |
| `coverage.functions`  | `up`     | Покриття функцій не повинно зменшуватися         |
| `coverage.branches`   | `up`     | Покриття гілок не повинно зменшуватися           |

Щоб оновити базовий рівень після фактичного покращення:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Прапорець `--update` записує поточні виміряні значення у `quality-baseline.json`.
Зафіксуйте цей файл у тому самому коміті, що й зміну, яка покращила метрику. PR, який покращує
метрику без оновлення базового рівня, буде виявлено за допомогою `--require-tighten` (Фаза 6A.5,
очікує на реалізацію).

### Храповик CodeQL: частота оновлення та ручний запуск

`check:codeql-ratchet` зчитує **стан репозиторію, що оновлюється за розкладом, а не для кожного PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` повідомляє
`state: configured`, `schedule: weekly`: це сканування стандартного налаштування GitHub, а не аналіз
для кожного надсилання змін. Наслідок: після злиття PR, який ВИПРАВЛЯЄ сповіщення, храповик продовжує
зчитувати стару, більшу кількість до наступного запланованого сканування — тому він повідомляє про
регресію для кожного відкритого PR, включно з подальшими змінами самого виправного PR, доки
сканування не наздожене актуальний стан.

**Ручне оновлення**: `gh workflow run codeql.yml --ref release/vX.Y.Z` повторно запускає
аналіз і повторно публікує сповіщення протягом кількох хвилин. Спочатку прочитайте `.github/workflows/codeql.yml`
— його заголовок пояснює, що він призначений лише для `workflow_dispatch` **через конфлікт зі
«стандартним налаштуванням» GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Для відновлення тригерів `push`/`pull_request`/
`schedule` спочатку потрібна **дія власника**: Settings → Code security →
CodeQL: Default → Advanced. Не додавайте тригер `schedule:` без цього перемикання — він
лише спричинятиме невдалі запуски.

**Посильте базовий рівень після зменшення кількості** — `node scripts/check/check-codeql-ratchet.mjs
--update` записує нову виміряну кількість у `quality-baseline.json` →
`metrics.codeqlAlerts.value`, щоб храповик не дозволяв непомітно повернутися до старої верхньої
межі. Практичний приклад (2026-09-02/03): PR #12502 виправив 7 реальних сповіщень
(13 → 6 виміряних відкритих); PR #12530 посилив зафіксований базовий рівень з 11 → 6 відповідно
до результату; решту 6 потім було відхилено з окремим обґрунтуванням для кожного сповіщення,
зменшивши кількість відкритих до 0.

**Відхилення — рішення оператора (Жорстке правило #14)** — ніколи не відхиляйте сповіщення CodeQL
без зазначення технічного обґрунтування в коментарі до відхилення: `won't fix` для вимоги
зовнішнього протоколу, `used in tests` для тестової фікстури, `false positive`
для санітайзера, який CodeQL не може виявити (прецедент: `docs/security/ERROR_SANITIZATION.md`).

---

## Політика повторного запуску тестів (WS5.4, v3.8.49)

Повторний запуск налаштовується для кожного раннера окремо, а не глобально — глобальний повторний запуск перетворює реальні регресії
на непомітні нестабільні збої:

| Раннер           | Політика                                                                                                                                                   | Чому                                                                                                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` лише в CI, з `trace: on-first-retry`                                                                                                          | Часові характеристики браузера/мережі справді недетерміновані; один повторний запуск із трасуванням перетворює нестабільний збій на артефакт, придатний для діагностики |
| Vitest           | БЕЗ глобального повторного запуску. Тест із підтвердженою нестабільністю отримує явний повторний запуск на рівні тесту (видимий у diff і перевірений у PR) | Зберігає список карантину в репозиторії, а не в непрозорому вигляді                                                                                                     |
| node:test (unit) | БЕЗ повторних запусків за жодних обставин                                                                                                                  | Нестабільний модульний тест — це помилка в тесті: виправте її, а не запускайте тест навмання повторно                                                                   |

Цільові SLO після впровадження телеметрії нестабільних тестів (WS5.2/5.3): частота нестабільних збоїв <1% на тест
(поріг «виправити негайно»), частка успішних проходжень ≥95% на пайплайн. Значення, прийняті в галузі як орієнтири, —
їх слід відкалібрувати за нашими власними вимірюваннями.

## Дрейф храповика на рівні релізу (WS5.5, v3.8.49)

Коли храповик (розмір файлу, складність, попередження eslint) регресує на ЧИСТІЙ верхівці гілки релізу
— тобто регресію спричинила КОМБІНАЦІЯ злиттів, а жоден окремий PR не відтворює її
у власній гілці, — виправлення має виконати **капітан релізу, один раз, у
гілці релізу**: надавайте перевагу виділенню коду/рефакторингу; змінюйте базову лінію лише з документованим
обґрунтуванням. Ніколи не перекладайте комбінований дрейф на PR учасника та ніколи
не змінюйте базову лінію окремо для кожного PR (це приховує реальні регресії). Спочатку розрізніть причини: відтворіть
помилку на чистій верхівці в тестовому worktree, перш ніж припускати, що її спричинив ваш PR.

## Фіксація знижень храповика — рух донизу (#8584)

Храповик автоматизований лише наполовину, до того ж не в той бік. **Підвищення** ліміту — це
ручне редагування JSON, що займає десять секунд і є найшвидшим способом розблокувати червоний PR.
**Зниження** ліміту вимагає, щоб хтось запустив `--update` і закомітив результат — а до
появи завдання `bank-ratchet-shrinks` жоден робочий процес цього не робив. Виміряний наслідок
(2026-07-25): 18 заморожених файлів уже мали не більше ніж 800 рядків — ліміт для нових файлів; найгірший випадок
перевищував фактичний розмір у 132 рази (`src/shared/validation/schemas.ts`, 19 рядків із лімітом 2 523);
стеля складності зросла з `1794 → 2169` упродовж ~37 приміток про зміну базової лінії, лише з одним
зниженням (−1); а фразу «посилити через `--update` у наступному циклі» написали 31 раз, але виконали
лише один раз. Ліміт, який пережив код, через який його запровадили, непомітно перетворює кожну завершену
декомпозицію на дозвіл збільшувати код для наступного, хто редагуватиме файл.

`nightly-release-green.yml` → завдання **`bank-ratchet-shrinks`** замикає цей цикл:

|           |                                                                                                                                        |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Запуск    | `schedule` (3×/день) + `workflow_dispatch` — навмисно **не** `push`                                                                    |
| Вимірює   | найвищу `release/vX.Y.Z`, з тією самою логікою визначення та захистом від ін’єкцій, що й `release-green`                               |
| Записує   | `check:file-size --update` і `check:complexity-ratchets --update` (обидві команди за своєю структурою можуть лише зменшувати значення) |
| Перевіряє | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                                               |
| Доставляє | один завжди актуальний PR до гілки релізу — примусово оновлюваний, без спаму                                                           |

Фіксація виконується пакетно, а не під час кожного push, оскільки вона не має вимог щодо затримки (зафіксувати
зниження протягом 8 годин цілком прийнятно), тоді як запуск під час кожного злиття неодноразово перебудовував би гілку PR
під час кампаній зі злиття та щоразу оплачував би повний прохід ESLint. Виявлення залишається на
push (`release-green`); пакетно виконується лише фіксація.

### Перевірка безпеки

Завдання змінює базові лінії без нагляду, тому саме `verify-ratchet-bank.mjs` робить
це прийнятним. Він порівнює дерево після `--update` з `HEAD` і **перериває завдання
ще до створення будь-якого коміту** — не відкриваючи PR, — якщо не кожна зміна належить до одного з таких типів:

- числовий запис `frozen` / `testFrozen` **знижено** або **видалено**
- `complexity-baseline.json` → `count` **знижено**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **знижено**

Усе інше спричиняє помилку: підвищення числа, додавання запису, зміна `cap`/`testCap` або
видалення/перезапис примітки `_rebaseline_*` (ці примітки є журналом аудиту причин існування кожної
стелі та зберігаються всередині того самого об’єкта `frozen`, що й записи файлів).
Бот, здатний підвищувати ліміт, був би однозначно гіршим за поточний стан. Захист від
регресій: `tests/unit/verify-ratchet-bank.test.ts`.

Завдання ніколи не виконує push до `release/*` — PR зливає людина, тож помилковий результат вимірювання
не може потрапити до гілки без перевірки.

## Політика списку дозволеного

Кожен бар’єр, який не може завершитися невдало через уже наявні порушення, використовує заморожений список дозволеного
(наприклад, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Політика така:

**Усувайте першопричину; використовуйте список дозволеного лише тоді, коли порушення вже існувало
й не може бути виправлене в тому самому PR.**

Додаючи запис до списку дозволеного:

1. Додайте коментар з обґрунтуванням.
2. Укажіть посилання на задачу для відстеження (наприклад, `// #3498 — Функція фази 2, ще не реалізована`).
3. Видаліть запис у тому самому PR, який виправляє порушення, — застарілий запис, що більше
   не приховує активне порушення, сам є дефектом (перевірка застарілих правил 6A.3 після
   реалізації призведе до невдалого проходження бар’єра через осиротілий запис у списку дозволеного).

**Не** додавайте записи до списку дозволеного, щоб тести проходили швидше. Зелений бар’єр зі списком
дозволеного, що зростає, створює хибне відчуття якості.

### Коли бар’єр не проходить у вашому PR

1. **Уважно прочитайте вивід бар’єра** — у ньому точно вказано, який файл або символ порушив
   правило.
2. **Виправте порушення** — більшість бар’єрів є детермінованими перевірками файлової системи, які проходять,
   щойно код виправлено.
3. **Якщо порушення вже існувало** (тобто ви його не внесли, але тепер воно
   охоплюється бар’єром): додайте запис до списку дозволеного з коментарем-обґрунтуванням і задачею для відстеження.
4. **Якщо бар’єр працює за принципом храповика** (покриття, попередження ESLint, дублювання, складність):
   ваша зміна погіршила метрику. Виправте першопричину або (у рідкісних випадках) виконайте
   `npm run quality:ratchet -- --update`, якщо зміна навмисна й погіршення
   метрики є прийнятним, — але поясніть причину в описі PR.
5. **Рекомендаційні бар’єри** (`continue-on-error: true`) мають інформаційний характер — вони не блокують
   злиття, але відображаються в підсумку CI. Усе одно виправляйте їх.

---

## Додавання нового бар’єра

1. Створіть `scripts/check/check-<name>.mjs` (або `.ts`). Бар’єри політик завершуються з кодом 0/1.
   Бар’єри типу «храповик» записують метрику до `quality-metrics.json` через `collect-metrics.mjs`.
2. Додайте `"check:<name>": "node scripts/check/check-<name>.mjs"` до `package.json`.
3. Підключіть його в `.github/workflows/ci.yml` у відповідному завданні
   (політика → `lint` або `docs-sync-strict`; храповик → `quality-gate`).
4. Якщо він має список дозволеного, застосуйте `reportStaleEntries()` з
   `scripts/check/lib/allowlist.mjs`, щоб застарілі записи виявлялися автоматично.
5. Напишіть тест у `tests/unit/build/`, що охоплює логіку виявлення бар’єра.
6. Оновіть цей документ (додайте рядок до таблиці відповідного завдання).

---

## Інструменти агента: LSP у циклі (за бажанням)

Окрім бар’єрів CI, OmniRoute постачається з **необов’язковим** каркасом `agent-lsp`
(файл `.mcp.json` на рівні проєкту, фаза 7, завдання 15). Створіть `.mcp.json`,
щоб надати агентам програмування доступ до мовного сервера TypeScript, аби вони знаходили символи /
діагностику **до** написання коду — це доповнення до `typecheck:core` за принципом «компіляція перед твердженням»,
яке усуває помилки з «вигаданими символами» в самому джерелі. Він навмисно
не завантажується автоматично (ви самі обираєте й перевіряєте міст MCP↔LSP); некоректний запис лише фіксує
помилку підключення в журналі й ніколи не порушує роботу сеансів.

---

## Беклог раціоналізації (огляд ROI — Фаза 9 Хвиля 3)

Цей перелік було звірено з `ci.yml` 2026-06-17 (у попередній версії було пропущено
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Огляд ROI звіреного набору
виявив наведені нижче кандидатури для раціоналізації. **Об’єднання є механічними змінами
CI; увімкнення/видалення є політичними рішеннями, зарезервованими за оператором.** Нічого
з наведеного нижче ще не застосовано.

**Також не задокументовано вище** (рекомендаційні перевірки, слабкий сигнал): завдання `docs-lint`
(markdownlint + Vale, для всього завдання встановлено `continue-on-error`) та окремі робочі процеси сканерів
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` міститься у
`quality-baseline.json`, але не підключено до блокувального храповика в `ci.yml` — наразі
ця метрика осиротіла.

### Об’єднання / усунення дублювання (механічні зміни, нижчий ризик)

Кожну кандидатуру було перевірено проти актуального стану шлюзів 2026-06-17 (довіряй, але перевіряй);
виявилося, що кілька «очевидних» об’єднань приховують борг і **не** є готовими безпечними замінами.

- **`check:docs-sync` запускається двічі** — окремо в завданні `lint` і ще раз усередині `check:docs-all` (`docs-sync-strict`) та в husky-хуку перед комітом. ✅ **ВИКОНАНО** — окремий виклик у `lint` видалено.
- **Сканування CVE** — ❌ **НЕ є простим об’єднанням.** `audit:deps` жорстко завершується помилкою за будь-якої CVE високої/критичної серйозності; `check:vuln-ratchet` (osv) завершується помилкою лише в разі _регресії_ відносно базового рівня (наразі 1 MODERATE). Семантика різна — видалення `audit:deps` призвело б до втрати абсолютного шлюзу для високих/критичних вразливостей. Залишити обидві перевірки.
- **Виявлення циклів** — ✅ **ВИКОНАНО** (#15159 G-01/G-02). У старому тексті тут `check:cycles` називався «зеленим, вибірковим» шлюзом, а збереження його блокувальним обґрунтовувалося тим, що `check:circular-deps` (dpdm) повідомляв про 91 цикл. Цей зелений статус був **хибно зеленим**: `check:cycles` сканував 5 підкаталогів (450 файлів), зіставляв лише статичні `import|export … from` і відкидав усі специфікатори `@/` та `@omniroute/open-sse/`, тому не міг побачити цикли з динамічним імпортом і псевдонімами, які переважали в репозиторії. Виправлено: тепер шлюз обходить `src` + `open-sse` (5023 файли), збирає специфікатори з AST TypeScript (тому `import("…")` враховується, а `typeof import("…")` у позиції типу — ні) та розпізнає `paths` із tsconfig. Він знаходить **14** циклів, а не 0. Оскільки 14 наявних циклів неможливо виправити в PR зі зміною шлюзу, `check:cycles` тепер є **храповиком** (`--ratchet`, верхня межа `metrics.cycles.value = 14` у `quality-baseline.json`, `direction: down`) — він блокує будь-яку _регресію_, і кількість може лише зменшуватися. CI запускає `npm run check:cycles:ratchet`. Поступове скорочення виконується разом з **A-01**. `check:circular-deps` (dpdm) залишається рекомендаційною ширшою другою думкою.
- **Складність** — ✅ **ВИКОНАНО** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): один обхід ESLint, підрахунок за ruleId, завдяки чому базові рівні цикломатичної складності+максимальної кількості рядків і когнітивної складності залишаються незалежними; окремі `check:complexity` / `check:cognitive-complexity` збережено для локального `--update`.
- **Захист від галюцинацій щодо `/api`** — ✅ **ВИКОНАНО** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): одна інвентаризація `src/app/api` у файловій системі, openapi-routes + docs-symbols усе ще звітують незалежно; окремі перевірки збережено для локальних запусків.
- **`check:node-runtime` запускається в 11 завданнях** — ⚠️ **низький ROI.** Кожне завдання виконується на окремому раннері, а перевірка триває <1 с; загальна економія становить ~10 с ціною втрати дешевого захисного механізму для кожного завдання. Не варте зайвих змін.
- **`typecheck:noimplicit:core` у lint CI** — ✅ **видалено із завдання lint** (було рекомендаційним із `continue-on-error`); блокувальна поверхня типів — `typecheck:core` + `check:type-coverage`. Локальний скрипт збережено.

### Увімкнути / вирішити (політика оператора)

- `check:openapi-security-tiers` (рекомендаційна перевірка) — ❌ **НЕ можна просто зробити блокувальною.** Вона завершується з кодом 0, але попереджає, що в кількох маршрутах `traffic-inspector` під `LOCAL_ONLY_API_PREFIXES` відсутня анотація `x-loopback-only: true`. Для її примусового застосування спочатку потрібно додати ці анотації до `openapi.yaml`.
- `typecheck:noimplicit:core` (рекомендаційна перевірка) — значною мірою перекривається блокувальним храповиком `check:type-coverage`. Перетворити на храповик або видалити надлишковий другий прохід `tsc`.
- `test:vitest:ui` (тепер **блокувальна перевірка**) — наявні збої явно виключено у `vitest.config.ts` за допомогою коментарів відстеження `// #8618`; нові збої спричиняють помилку завдання.
- `check:secrets` (gitleaks, блокувальний храповик, зафіксований на рівні 3 задокументованих хибнопозитивних результатів) — додати ці 3 результати до списку дозволених, щоб досягти 0, або понизити до рекомендаційної перевірки. Перекривається з нативним скануванням секретів GitHub + `check:public-creds`.
- `check:pr-evidence` (блокувальна перевірка, що шукає шаблони в прозі тіла PR) — високий ризик хибнопозитивних результатів; її видалення послабить дотримання Hard Rule #18, тому це справжнє політичне рішення.
- `semgrep` (окрема рекомендаційна перевірка) — перекривається з CodeQL щодо сімейств OWASP; підключити її базовий рівень до храповика або видалити.

---

## Пов’язана документація

- Ланцюг постачання (походження, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — шлюз паритету наборів ключів

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, завдання `i18n-ui-coverage`).
Порівнює набір кінцевих ключів кожного `src/i18n/messages/<locale>.json` з `en.json` і завершується
помилкою за наявності будь-якого відсутнього або зайвого кінцевого ключа, незалежно від того, коли
цей ключ було додано. Заповнювачі `__MISSING__:` вважаються наявними (їхній вміст належить до сфери
відповідальності шлюзу співвідношення). Це абсолютне доповнення двох шлюзів на основі різниці/
відсотків: `check-ui-keys-coverage` забезпечує мінімальне покриття 80 % для кожної локалі
(43 відсутні ключі з ~13 000 усе одно дають 99,7 %), а `check-new-key-coverage` оцінює лише ключі,
які PR додає до `en.json`. Пакет локалей генерується з актуального на день створення гілки
`en.json` і перекладається протягом кількох днів, поки до базової гілки продовжують додавати ключі;
сам пакетний PR не додає жодного ключа, тому обидва сусідні шлюзи промовчали, коли пакет 1
(#13044) було інтегровано з нестачею 43 ключів у дев’яти локалях, а пакет 2 (#13660) — з нестачею
10 ключів у восьми (2026-09-15). Щоб усунути помилку, виконайте
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; кінцевий ключ `extra`
означає, що його було видалено з джерела — видаліть його з локалі. `--warn` повідомляє про
проблему без завершення з помилкою. `--catalog=cli` виконує таке саме порівняння для
`bin/cli/locales` (`npm run i18n:check-keys:cli`); обидва кроки виконуються в завданні
`i18n-ui-coverage`.

#### `check-new-key-coverage` — шлюз i18n для нових ключів

Сусідній шлюз для `check-ui-value-drift`. Той виявляє випадок, коли англійське значення було
**переписано**, а його переклади залишилися без змін; цей виявляє випадок, коли англійський ключ
було **додано**, але деякі локалі так його й не отримали.

`check-ui-keys-coverage` не може виявити цей клас проблем: він забезпечує мінімальний відсоток
покриття для кожної локалі, а одинадцять відсутніх ключів із ~13 000 залишають покриття на рівні
99,9 %. Відсоток для окремої мови не може виразити твердження «цю функцію випущено без перекладу» —
ціла функція може потрапити до нової локалі без жодного тексту й ніяк не змінити показник.

Інцидент, який він формалізує: на етапі 3 Orchestration Canvas одинадцять його ключів було
перекладено для 42 локалей, що існували на той момент. Кілька годин потому пакет мов ЄС (#13044)
збільшив кількість локалей у репозиторії до 51, а дев’ять нових локалей (`el`, `et`, `ga`, `hr`,
`lt`, `lv`, `mt`, `sl`, `sr`) так і не отримали ці ключі. `deepMergeFallback` підставляє англійський
текст для відсутнього ключа, тому проявом помилки був неперекладений, а не порожній інтерфейс —
реальна проблема, яка за своєю природою залишалася непомітною.

Як і споріднений шлюз, він **враховує різницю**, порівнюючи англійську версію в базі злиття з
робочим деревом, тому попередні прогалини залишаються зафіксованими, а для ввімкнення шлюзу
не знадобилася міграція.

**Маркер `__MISSING__:<english>` не задовольняє його вимоги (з 2026-09-17).** Раніше це був
задокументований спосіб відкласти переклад — під час виконання система повертається до коректного
англійського тексту, — доки вісім PR із функціональністю від 2026-09-16 не додали 61 ключ і не
проставили цей маркер у всіх 65 локалях замість перекладу: цей шлюз прийняв кожен із них, ніщо
не заблокувало PR, а блокувальний шлюз співвідношення справжніх перекладів потім завершився
помилкою на вершині гілки випуску для всіх (pt-BR 3,2 % > 2,5 % + 0,5). Тепер маркер оцінюється
як відсутній переклад. Щоб усунути помилку, виконайте
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` або
обробіть усі локалі паралельно за допомогою `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, безпечно для від’єднаного запуску, відмовляється запускатися
без змінних середовища `OMNIROUTE_TRANSLATION_*`). Ключ, який має залишатися англійською
(зафіксована назва продукту/рушія/прапорця), слід додати до
`scripts/i18n/untranslatable-keys.json`, а не приховувати за маркером. `vi` повністю забороняє
маркери (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — шлюз відкладених тестів

Файл у списку `exclude` в `vitest.config.ts` — це тест, який не виконується, хоча для того, хто
переглядає дерево, він виглядає як частина покриття. Шістдесят два файли накопичилися за
коментарем `// #8618 — наявна раніше помилка; видаліть це виключення після виправлення`.
Завдання #8618 було закрито 2026-08-11, тоді як відстежуваний ним список виріс із 45 до 62 записів,
кожен новий запис успадковував коментар із посиланням на вже закрите завдання. Коли список нарешті
перевірили файл за файлом (#13204), **51 із 62 тестів пройшов на поточному дереві без жодної зміни
вихідного коду**.

Шлюз вимагає, щоб кожне виключення, яке відповідає реальному файлу, (a) містило номер завдання
для відстеження та (b) було внесено до `config/quality/vitest-exclusions.json` із виміряним
статусом, тож додавання виключення стає доступною для перевірки різницею у спеціальному файлі,
а не ще одним рядком у масиві з 60 записів. Він навмисно не запускає виключені тести повторно —
це займає ~10 хвилин і має виконуватися в періодичному завданні; в інвентарі фіксується дата
останньої перевірки кожного з них.
