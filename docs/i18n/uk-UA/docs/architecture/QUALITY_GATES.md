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

## Інвентаризація гейтів та профілі виконання

### Допуск кандидатів

Кожен із workflow CI та Quality Gates видає стабільний вердикт: `Gate / CI` та
`Gate / Quality`. Їхня версіонована політика допуску перелічує кожну upstream-задачу
як обов'язкову або рекомендаційну. Застосовна обов'язкова задача має завершитися успішно:
відсутній, скасований, пропущений, очікуючий чи невідомий результат не може встановити
PASS. Чинна класифікація docs-only або catalog-only може зробити смугу коду
незастосовною; чернетка PR не є допустимим кандидатом. Мітка `hotfix` не звільняє
від доказів.

Обидва workflow охоплюють PR у гілки main/release, пуші в `main`, ручний запуск (dispatch)
і події merge-груп. Push, dispatch і merge-групи запускають повну вибірку. Пуші в
`release/**` не запускають їх (2026-10-18): кожна зміна вже пройшла матрицю у своєму PR,
а злита комбінація — зона відповідальності Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane).
Форки та merge-групи використовують hosted-раннери для задач, які інакше обирають self-hosted
раннери; достатню потужність hosted-раннерів потрібно перевірити перед розгортанням.

Кожна JSON-квитанція ідентифікує SHA чекауту, запуск workflow і спробу.
CLI відхиляє невідповідність SHA чекауту та події. Тести workflow прив'язують членство
в політиці до списку `needs` задачі вердикту, тож нова чи видалена смуга не може
непомітно зникнути. Квитанції охоплюють лише власний workflow, а не публікацію,
розгортання чи внутрішню реалізацію наявного рекомендаційного сканера. Активація обох
назв перевірок у правилах гілок — окрема адміністративна зміна; додавання цих задач
само по собі не захищає гілку.

### Інвентаризація статичного сканування

Версіонована інвентаризація npm-аліасів та членство статичного сканування зберігаються в
`config/quality/gate-manifest.json`. Запустіть `npm run check:gate-manifest`, щоб
перевірити назви скриптів і точні команди відповідно до `package.json`; додавання,
видалення та дрейф команд провалюють і локальний хук, і задачі класифікації змін у CI.
Аліас — це не задача workflow, не екземпляр матриці й не тест-кейс: ці лічильники
не можна подавати як взаємозамінні.

Використовуйте `npm run quality:scan -- --list` або `npm run quality:scan:fast -- --list`,
щоб переглянути обрані аліаси без їх виконання. Раннер викликає точку входу npm,
тому його рантайм (включно з Bun, де налаштовано) зберігається. Маніфест фіксує аліаси
поза цими профілями як такі, що викликаються окремо, а команди обслуговування
заборонені в профілях сканування лише для читання.

Ці профілі охоплюють лише статичне сканування. Вони не засвідчують продуктові тести,
покриття, пакування, зовнішні перевірки чи повний релізний прийом кандидата. Допуск
workflow використовує пов'язані `config/quality/admission-policy.json` та
`scripts/quality/admission-verdict.mjs`. Профілі Release-observer залишаються окремими;
перевіряйте їхні застосовні перевірки та квитанції незалежно. Текстова інвентаризація
нижче — це довідка, а не доказ того, що гейт дійсно виконувався.

Скрипти розташовані в `scripts/check/` (гейти політики) та `scripts/quality/` (рушій рачета).
Джерело істини CI — `.github/workflows/ci.yml`.

### Fast-path для релізних PR (`quality.yml`)

`.github/workflows/quality.yml` доповнює CI на PR у main/release, пушах у `main`,
dispatch і merge-групах. PR використовують швидкі перевірки з фільтрацією за шляхами.
Назавжди вимкнений дубльований білд видалено; справжні перевірки білд/пакування/завантаження
залишаються в CI.

| Задача                                           | Охоплення                                                                                                                                                                                                   | Блокування             |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `Docs Gates (fast-path)`                         | PR документації/коду; посилання на API-документацію та docs-all                                                                                                                                             | Так                    |
| `Fast Quality Gates`                             | PR коду; статичні перевірки, typecheck, typecheck дашборда, юніт-тести, яких зачіпають зміни                                                                                                                | Так                    |
| `Forgotten sibling tests`                        | PR коду; змінені модулі простежуються до статичних споживачів і кандидатних sibling-тестів; шляхи barrel та динамічного імпорту звітуються як рекомендаційна діагностика з винятками з посиланого allowlist | **Рекомендаційна**     |
| `Vitest (fast-path)`                             | PR коду; швидкий набір vitest                                                                                                                                                                               | Так                    |
| `Unit Tests fast-path`                           | PR коду; юніт-набір із 4 шардів                                                                                                                                                                             | Так                    |
| `No new ESLint warnings`                         | PR коду; lint-контроль, що враховує придушення                                                                                                                                                              | Так, включно з форками |
| `Merge integrity (changelog + generated skills)` | PR, що не є чернетками; синхронізація changelog та згенерованих скілів                                                                                                                                      | Так, включно з форками |

#### Звіт «Forgotten sibling tests»

`npm run check:forgotten-sibling-tests` повторно використовує резолвер імпортів, що стоїть за мапою тестового впливу.
Для кожного зміненого production-модуля він звітує детерміновані
ланцюжки `changed module/symbol -> static consumer -> candidate sibling test`, коли тест-кандидат
відсутній у diff pull request. Підсумок Markdown і результат JSON зберігаються як
артефакт workflow `forgotten-sibling-tests` для калібрування перед будь-яким блокувальним розгортанням.

Барельні реекспорти та динамічні імпорти є лише діагностикою розпізнавання; вони ніколи не створюють
блокувальної знахідки. Перевірені винятки зберігаються у
`config/quality/forgotten-sibling-allowlist.json`. Кожен запис має називати споживача та тест-кандидат,
надавати конкретне обґрунтування та посилатися на GitHub issue або pull request. Некоректні записи
спричиняють закриту відмову. Винятки не можуть придушити видалений тест-кандидат або diff, що додає `.skip`/`.todo`;
послаблення перевірок та інші маскування залишаються у віданні незалежно блокувального
гейту `check:test-masking`.

### Завдання: `lint`

Запускається для кожного PR у `main`. Блокує злиття у разі невдачі.

| Скрипт (`npm run ...`)            | Перевіряє                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Блокує                                         |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `check:node-runtime`              | Версія Node.js перебуває в межах підтримуваного діапазону                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Так                                            |
| `check:cycles`                    | Циклічні імпорти в усьому `src/` + `open-sse/` (на основі AST, з розв'язанням tsconfig `paths`). Базовий варіант завершується з кодом 1, щойно існує будь-який цикл (fail-closed з #15281), і виводить список SCC. `check:cycles:ratchet` (те, що запускає CI) блокує, коли кількість перевищує стелю `metrics.cycles` у `quality-baseline.json` — наразі 14, `direction: down`, тож вона може лише зменшуватися (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Так (ratchet)                                  |
| `check:boundary`                  | Зв'язність `open-sse → src`: унікальні файлові імпорти з рушія в застосунок (`scripts/quality/measure-boundary.mjs`; список ребер — це беклог усунення для розбиття v4 core/module-split). Базовий варіант = довідковий звіт (те саме, що `quality:boundary`). `check:boundary:ratchet` (те, що запускає CI, а також у циклі fast-gates ratchet у `quality.yml`) блокує, коли кількість перевищує стелю `metrics.boundaryOpenSseToSrc` у `quality-baseline.json` — початково встановлено на виміряному значенні 771, `direction: down`; `--update` лише знижує її; відносно базової гілки в PR (`--base-ref`, див. нижче)                                                                                                                                                                                                                                                                                                                                   | Так (ratchet)                                  |
| `check:route-validation:t06`      | Схеми Zod присутні на всіх маршрутах (політика Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Так                                            |
| `check:any-budget:t11`            | Кількість `@ts-expect-error // any` не перевищує бюджет (catraca рівня 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Так                                            |
| `check:provider-consistency`      | Кожен провайдер у `providers.ts` має відповідний запис у `providerRegistry.ts` (і навпаки, у межах списку дозволених)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Так                                            |
| `check:model-lifecycle`           | Три таблиці маршрутизації, що підтримуються вручну, залишаються узгодженими зі знімком життєвого циклу, закоміченим у репозиторій (#11503): `FITNESS_TABLE` (`taskFitness.ts`) не оцінює жодного вилученого ідентифікатора, який `REGISTRY` може маршрутизувати; кожна ціль `BUILT_IN_ALIASES` присутня в `REGISTRY` і відсутня у знімку вилучених ідентифікаторів; кожен вилучений ідентифікатор, що досі є в `REGISTRY`, перенаправляється або вказаний у `allowedRetiredInCatalog`; і жодне джерело чи ціль `DEFAULT_DEGRADATION_MAP` не фігурує як вилучене в цьому знімку. Це не доводить, що модель наразі обслуговується активним апстримом. Офлайн — порівнюється з `config/quality/model-lifecycle.json`, який оновлюється вручну командою `npm run quality:refresh-model-lifecycle` (потребує мережі; не підключено до CI). `allowedRetiredInCatalog` — це burn-down ratchet: додавайте запис лише разом із задачею відстеження (tracking issue). | Так                                            |
| `check:fetch-targets`             | Кожен `fetch("/api/...")` у клієнтському `src/` розв'язується в реальний `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Так                                            |
| `check:deps`                      | Усі залежності, які можна встановити через `npm install`, у кожному `package.json` репозиторію містяться в `dependency-allowlist.json`; нові незакріплені або slopsquat-пакети позначаються                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Так                                            |
| `audit:deps`                      | `npm audit` (корінь + electron) — без сповіщень високого/критичного рівня (перетинається з osv `check:vuln-ratchet`; див. Rationalization Backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Так                                            |
| `check:lockfile`                  | Цілісність `package-lock.json` — реєстр https, хеші цілісності, без перевизначень хостів                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Так                                            |
| `check:licenses`                  | Список дозволених ліцензій SPDX для продакшн-залежностей                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Так                                            |
| `check:tracked-artifacts`         | Жодних артефактів збірки / закомічених симлінків `node_modules` (також виконується в husky pre-commit; pre-push навмисно легкий — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Так                                            |
| `check:ai-attribution`            | Жодних трейлерів `Co-Authored-By` від ШІ/ботів або підвалів про ШІ-генерацію в комітах PR, заголовку чи тілі — Жорстке правило №16 (у циклі fast-gates `quality.yml` для PR→`release/**` — зчитує payload події, не діє поза PR — і крок лише для PR у lint `ci.yml` для PR→`main`; також husky-хук `commit-msg`; співавтори-люди дозволені; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:vitest-exclusions`         | Кожне виключення Vitest посилається на задачу відстеження та присутнє у `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Так                                            |
| `check:file-size`                 | Вихідні файли (`.ts`/`.tsx` у `src/`, `open-sse/`, `electron/`, `bin/`) залишаються в межах `cap`, а тестові файли (`*.test.ts(x)`) — у межах `testCap`; файли, заморожені у `file-size-baseline.json` (`frozen` / `testFrozen`), не повинні зростати понад зафіксований розмір                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Так                                            |
| `check:error-helper`              | Відповіді про помилки у виконавцях/обробниках використовують `buildErrorBody()` / `sanitizeErrorMessage()` (Жорстке правило №12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Так                                            |
| `check:migration-numbering`       | Файли міграцій SQL пронумеровані послідовно, без пропусків чи дублікатів                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Так                                            |
| `check:public-creds`              | Жодних літеральних значень OAuth `client_id`/`client_secret` або веб-ключів Firebase поза `publicCreds.ts` (Жорстке правило №11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Так                                            |
| `check:db-rules`                  | Жодного сирого SQL поза модулями `src/lib/db/`; жодних barrel-імпортів з `localDb.ts` (Жорсткі правила №2/№5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Так                                            |
| `check:known-symbols`             | Виконавці провайдерів, стратегії маршрутизації та транслятори, зареєстровані у своїх таблицях диспетчеризації, відповідають файлам на диску — жодних осиротілих або неоголошених символів                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Так                                            |
| `check:route-guard-membership`    | Кожен маршрут, що породжує дочірній процес, класифікується за допомогою `isLocalOnlyPath()` (Жорсткі правила №15/№17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Так                                            |
| `check:test-discovery`            | Кожен файл `*.test.ts` / `*.spec.ts` у репозиторії збирається принаймні одним тестовим раннером (ratchet: список сиріт у `test-discovery-baseline.json` може лише зменшуватися)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Так                                            |
| `check:agent-skills-sync`         | Згенеровані артефакти agent-skills відповідають своєму вихідному каталогу (без розбіжностей)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:provider-asset-provenance` | Логотипи/ресурси провайдерів мають зафіксований запис про походження                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `lint:json`                       | Файли конфігурації JSON успішно розбираються та відповідають правилам lint репозиторію                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `typecheck:core`                  | Компіляція TypeScript без помилок (лише рекомендаційні попередження)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Так                                            |
| `typecheck:noimplicit:core`       | Суворий `noImplicitAny` — орієнтований на майбутнє; багато вже існуючих місць викликів усе ще потребують анотацій                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | **Рекомендаційна** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` з областю дії `src/app/(dashboard)/**` (#7033) — кураторський список дозволених із 27 файлів у `typecheck:core` не включає жодного dashboard TSX, а `next build` також ніколи не перевіряє його типи (`next.config.mjs` встановлює `ignoreBuildErrors: true`), тож регресії осиротілих ідентифікаторів там (#6625/#6909) були невидимими для CI. Порівняння зі замороженою базовою лінією кількості помилок за файлом/кодом TS (`config/quality/dashboard-typecheck-baseline.json`, той самий шаблон контролю застарілості, що й у `check:known-symbols`) — лише НОВІ помилки понад базову кількість призводять до провалу gate; знижуйте поріг ratchet за допомогою `--update`, коли виправлено наявну помилку.                                                                                                                                                                                                                                      | Так                                            |

### Завдання: `quality-gate`

Виконується після `test-coverage`. Блокує злиття у разі збою.

| Скрипт                       | Перевіряє                                                                                                                                                                            | Блокує                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| `quality:collect`            | Генерує `quality-metrics.json` (кількість попереджень ESLint, покриття з об'єднаного звіту шардів)                                                                                   | Так (попередній до ретчета) |
| `quality:ratchet`            | Жодна метрика в `quality-baseline.json` не регресувала (попередження ESLint ≤ базової лінії; покриття ≥ базової лінії)                                                               | Так                         |
| `check:duplication`          | Дублювання коду (jscpd@4) не перевищує базову лінію в `quality-baseline.json`                                                                                                        | Так                         |
| `check:complexity`           | Цикломатична складність на рівні файлів не перевищує обмеження (основне правило ESLint `complexity` + `max-lines-per-function`)                                                      | Так                         |
| `check:cognitive-complexity` | Ретчет когнітивної складності (`eslint-plugin-sonarjs`) — окремий прохід ESLint; CI виконує обидва, об'єднані в єдиний крок `check:complexity-ratchets`                              | Так                         |
| `check:dead-code`            | Ретчет невикористаних експортів / файлів (knip) не регресує відносно базової лінії                                                                                                   | Так                         |
| `check:compression-budget`   | Бюджет бенчмарку стиснення — мінімальні межі економії токенів для кожного рушія не повинні регресувати                                                                               | Так                         |
| `check:type-coverage`        | Ретчет відсотка типізації (`type-coverage`) не регресує; значною мірою перекриває `typecheck:noimplicit:core`                                                                        | Так                         |
| `check:codeql-ratchet`       | Кількість відкритих сповіщень CodeQL не регресує (зчитування через `gh api`; коректне пропускання без токена) — періодичність оновлення та ручний запуск: див. «Ретчет CodeQL» нижче | Так                         |

### Завдання: `quality-extended`

Усе завдання є рекомендаційним (`continue-on-error: true`). Ретчети на основі npm
виконуються по-справжньому; зовнішні сканери встановлюються через `gh release download`
і самопропускаються (exit 0), коли бінарний файл досі відсутній.

| Скрипт                   | Перевіряє                                                                                                                                                                                                                               | Блокує                                           |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `check:circular-deps`    | Відсутність циклічних залежностей (dpdm)                                                                                                                                                                                                | **Рекомендаційна**                               |
| `check:bundle-size`      | Розмір бандла не перевищує обмеження                                                                                                                                                                                                    | **Рекомендаційна**                               |
| `check:secrets`          | Сканування секретів (gitleaks) — пропускається, якщо бінарний файл відсутній                                                                                                                                                            | **Рекомендаційна**                               |
| `check:vuln-ratchet`     | Вразливості залежностей (osv-scanner) не регресують — пропускається, якщо бінарний файл відсутній                                                                                                                                       | **Рекомендаційна**                               |
| `check:workflows`        | Лінтинг воркфлоу (actionlint + zizmor); відсутні/зламані сканери, недійсні звіти або відсутня базова лінія ретчета завершуються зі статусом INCOMPLETE. Дійсні знахідки обробляються згідно з обраною політикою strict/advisory/ratchet | Виконання обов'язкове; ретчет zizmor блокує в CI |
| `check:openapi-breaking` | Ламкі зміни публічного API-контракту (`openapi.yaml`) відносно базової гілки (oasdiff) — генерує `openapiBreaking=N`; пропускається, якщо oasdiff відсутній або базову специфікацію неможливо розв'язати                                | **Рекомендаційна**                               |

### Завдання: `docs-sync-strict`

Виконується для кожного PR до `main`. Блокує злиття у разі збою.

| Скрипт                         | Перевіряє                                                                                                                                                                            | Блокування                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| `check:docs-all`               | Мета-гейт, який послідовно запускає 6 підгейтів нижче                                                                                                                                | Так                         |
| ↳ `check:docs-sync`            | Узгодженість версій CHANGELOG / OpenAPI / llm.txt                                                                                                                                    | Так                         |
| ↳ `check:docs-counts`          | Числа в тексті (кількість провайдерів, кількість міграцій тощо) перебувають у межах ratchet-вікна реальних значень                                                                   | Так                         |
| ↳ `check:env-doc-sync`         | Кожна змінна середовища в `.env.example` задокументована в таблиці документації, і навпаки                                                                                           | Так                         |
| ↳ `check:deprecated-versions`  | У документації немає застарілих рядків версій                                                                                                                                        | Так                         |
| ↳ `check:doc-links`            | Внутрішні markdown-посилання в документації вказують на реальні файли (форма `[text]`/`(path)`)                                                                                      | Так                         |
| ↳ `check:fabricated-docs`      | Маршрути, змінні середовища, CLI-команди, назви хуків і шляхи до файлів, згадані в документації, існують у кодовій базі. Жорсткий гейт через `--strict`; м'яке падіння без прапорця. | Так (через `--strict` у CI) |
| `check:cli-i18n`               | Рядки CLI-команд присутні в усіх файлах локалей i18n                                                                                                                                 | Так                         |
| `check:openapi-coverage`       | Специфікація OpenAPI охоплює щонайменше ratchet-поріг реальних маршрутів                                                                                                             | Так                         |
| `check:openapi-security-tiers` | Анотації рівнів безпеки в `openapi.yaml` узгоджені з класифікаціями `routeGuard.ts`                                                                                                  | **Рекомендаційний**         |
| `check:openapi-routes`         | Кожен шлях в `openapi.yaml` відповідає реальному `route.ts` (анти-галюцинація)                                                                                                       | Так                         |
| `check:docs-symbols`           | Кожне посилання `/api/...` у `docs/**/*.md` відповідає реальному `route.ts` (анти-галюцинація)                                                                                       | Так                         |
| `i18n translation drift`       | Неперекладені ключі у файлах локалей i18n — лише попередження                                                                                                                        | **Рекомендаційний**         |

### Завдання: `i18n-ui-coverage`

| Скрипт                               | Перевіряє                                                                                                                                                                                      | Блокування          |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `check-ui-keys-coverage` (вбудовано) | Покриття ключів i18n інтерфейсу становить ≥ 65%                                                                                                                                                | Так                 |
| `check-ui-value-drift` (вбудовано)   | Переписане англійське **значення** не залишає після себе застарілого перекладу                                                                                                                 | Так                 |
| `check-new-key-coverage` (вбудовано) | **Новий** англійський ключ перекладено в кожній локалі — маркер `__MISSING__:` відхиляється                                                                                                    | Так                 |
| `check-translation-ratio`            | Частка реальних перекладів для локалі (листи, ідентичні англійській / заповнювачі / відсутні, поза allowlist) не повинна перевищувати `config/quality/i18n-translation-baseline.json` + допуск | **Рекомендаційний** |

Потрібен `fetch-depth: 0` — гейт value-drift порівнює `en.json` із базовою точкою злиття (merge base).

#### `check-ui-value-drift` — гейт застарілих перекладів

Виявляє єдину i18n-регресію, якої інші гейти структурно не можуть побачити: англійське
значення переписують, а переклади, створені на основі _попередньої_ англійської версії,
залишаються — тож неангломовні користувачі й надалі читають впевнено сформульований,
але вже хибний текст.

Це сталося насправді. `oauthModal.googleOAuthWarning` було переписано, коли з'явився
помічник входу Antigravity (#5203); **39 із 43 локалей** зберегли текст, що просив
операторів «скопіювати повну URL-адресу та вставити її нижче» — сценарій, який для цього
провайдера не може завершитися. Це залишалося непоміченим до #8463, тому що:

- `sync-ui-keys` лише дозаповнює ключі, які **відсутні**, але ніколи ті, що **застаріли**;
- `check-ui-keys-coverage` рахує _наявність_ ключа, тож застарілий переклад зараховується як покритий;
- `check-translation-drift` відстежує дзеркала документації `docs/i18n/<locale>/**.md` —
  він ніколи не читає `src/i18n/messages/*.json`. Блокує в завданні `docs-sync-strict` з
  повторної синхронізації 2026-09: відредагуйте основний документ → `npm run i18n:run -- --files=<doc>` (на рівні секцій, дешево).

**З урахуванням змін, а не на основі базової версії.** Він порівнює `en.json` у точці злиття з
робочим деревом; для кожного ключа, значення якого англійською змінилося, будь-яка локаль, що все ще
містить недоторканий переклад, вважається застарілою. Це навмисно **заморожує попередній борг** — diff
не може показати, від якої старої англійської версії походить давній переклад, тому перевірка оцінює
лише те, чого торкається поточна зміна. Альтернатива (базова версія з хешами для кожного ключа)
потребувала б згенерованого файлу розміром близько 600 КБ, що втричі більше за найбільшу наявну базову
версію, і змінювалася б під час кожного i18n PR.

Є два способи виконати цю вимогу:

1. оновити відповідні переклади, або
2. встановити для них `__MISSING__:<new english>` — тоді середовище виконання надає виправлену англійську
   (`src/i18n/request.ts::deepMergeFallback`, #7258), а ключ додається до черги на переклад.

Якщо змінилося **значення** рядка, краще перейменувати ключ: новий ключ не може успадкувати
застарілий переклад. Саме такий підхід використано в #8463.

```bash
npm run i18n:check-value-drift          # суворий режим (його запускає CI)
npm run i18n:check-value-drift:warn     # лише звіт
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Завершується з кодом 0 і `SKIP reason=base-unresolved`, якщо базовий каталог неможливо прочитати (поверхневий
клон без базового ref), аналогічно до `check-openapi-breaking`.

### Завдання: `i18n`

Повна матриця перевірки i18n (одне завдання для кожної локалі). Усе завдання має рекомендаційний статус.

| Скрипт                          | Перевіряє                           | Блокування                                                         |
| ------------------------------- | ----------------------------------- | ------------------------------------------------------------------ |
| `validate_translation.py quick` | Повноту перекладу для кожної локалі | **Рекомендаційне** (`continue-on-error: true` для всього завдання) |

### Завдання: `pr-test-policy`

Запускається лише для pull request.

| Скрипт                 | Перевіряє                                                                                                                                           | Блокування |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PR, що змінюють виробничий код у `src/`, `open-sse/`, `electron/` або `bin/`, повинні містити або оновлювати тести (Жорстке правило №8)             | Так        |
| `check:test-masking`   | Змінені файли тестів не зменшують загальну кількість assert і не додають тавтології `assert.ok(true)`                                               | Так        |
| `check:pr-evidence`    | Опис PR містить посилання на докази тестування/VPS для зміни (механізує Жорстке правило №18 через пошук у тексті PR — крихке рішення, див. Backlog) | Так        |

### Завдання: `test-vitest`

Запускається після `build`. Блокує злиття в разі помилки.

| Набір            | Перевіряє                                                         | Блокування                                                                                                          |
| ---------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-сервер (110 інструментів), autoCombo, кеш — виконавець vitest | Так                                                                                                                 |
| `test:vitest:ui` | Тести компонентів UI — виконавець vitest                          | **Блокування** — попередні помилки явно виключено у `vitest.config.ts`; нові помилки призводять до помилки завдання |

### Нічні робочі процеси (за розкладом, рекомендаційні)

Вони запускаються за розкладом cron (і через `workflow_dispatch`), але ніколи не запускаються для PR. Усі вони мають рекомендаційний статус.

| Робочий процес         | Перевіряє                                                                                                                                                                          | Блокування         |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `nightly-property`     | Властивісні тести fast-check із випадковим seed + великою кількістю запусків                                                                                                       | **Рекомендаційне** |
| `nightly-resilience`   | Перевірку зростання heap, хаотичне введення відмов, навантаження/тривале навантаження k6                                                                                           | **Рекомендаційне** |
| `nightly-llm-security` | Захист від ін’єкцій promptfoo (режим блокування) + зонди garak (пропускається без секрету провайдера)                                                                              | **Рекомендаційне** |
| `nightly-schemathesis` | Нечітке тестування контракту OpenAPI (schemathesis) проти запущеного OmniRoute з використанням `docs/openapi.yaml` — виявляє порушення специфікації / необроблені 500 (Фаза 8 B.4) | **Рекомендаційне** |
| `nightly-mutation`     | Оцінку мутаційного тестування Stryker у швидкому блоці модульних тестів — мутанти, що вижили, виявляють слабкі assert                                                              | **Рекомендаційне** |
| `nightly-compat`       | Матрицю сумісності рушія Node для всіх підтримуваних діапазонів `engines.node`                                                                                                     | **Рекомендаційне** |

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
