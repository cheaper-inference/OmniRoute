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

## Інвентар і профілі виконання воріт

### Прийом кандидатів

Робочі процеси CI та Quality Gates видають стабільний вердикт: `Gate / CI` та `Gate / Quality`. Їхня політика прийому з версіями перераховує кожну вакансію, яка є обов’язковою або рекомендованою. Відповідне обов’язкове завдання має бути успішним: відсутні, скасовані, пропущені, очікувані та невідомі результати не можуть встановити PASS. Дійсна класифікація лише для документів або лише для каталогу може зробити кодову смугу незастосовною; проект PR не є прийнятним кандидатом. Мітка `hotfix` не відмовляється від доказів.

Обидва робочі процеси охоплюють PRs у гілках main/release, надсилання до `main`, ручну диспетчеризацію та події злиття груп. Push, dispatch і merge-group запускають повний вибір. Пуші до `release/**` не запускають їх (2026-10-18): кожна зміна вже запустила матрицю на своєму PR, а об’єднана комбінація є завданням Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane). Розгалуження та групи злиття використовують розміщені бігуни для завдань, які в іншому випадку вибирають саморозміщувані бігуни; перед розгортанням необхідно перевірити достатню потужність хостингу.

Звичайний PR виконує швидкий вибір. Доріжки `full-code` і `full-code-e2e` політики доступу (E2E, інтеграція, артефакт пакета, Electron smoke, Bun SQLite, клієнти екосистеми та протоколу) запускаються лише в чернетці черги Mergify або під час повного виконання: `gh workflow run ci.yml --ref <branch>`.

Кожна квитанція JSON ідентифікує знятий SHA, запуск робочого процесу та спробу. CLI відхиляє невідповідність checkout/event SHA. Тести робочого циклу прив’язують членство в політиці до списку `needs` вердикту, тому нова або видалена смуга не може мовчки зникнути. Квитанції охоплюють їхній власний робочий процес, а не публікацію, розгортання чи внутрішню роботу наявного консультативного сканера. Активація обох імен перевірок у правилах гілок є окремою адміністративною зміною; додавання цих завдань саме по собі не захищає гілку.

### Об'єднати чергу

Мітка `queue` надсилає PR до черги Mergify (`.mergify.yml`). Mergify відкриває чернетку PR у гілці `mergify/merge-queue/`, CI запускає повний вибір там, а вихідний PR об’єднується, коли `Gate / CI`, `Gate / Quality` та `Merge integrity (changelog + generated skills)` проходять.

Mergify записує свій підсумок черги в опис чернетки, і інші програми також можуть його редагувати. Подія `pull_request` `edited` у такій чернетці приймає власну групу паралельності (`-queue-edit-<run_id>`), тому вона не може скасувати реальний запуск чернетки, і вона пропускає ворота та матрицю. Тільки `Merge integrity` все ще працює. Пропущене завдання шлюзу має іншу назву перевірки, оскільки Mergify зчитує пропущений `Gate / CI` як невдалу перевірку та вилучає з черги PR.

Після вилучення з черги push не завжди повертає PR в чергу. Прокоментуйте це `@mergifyio queue`.

### Інвентар статичного сканування

Версійний інвентар npm-alias і членство в static-scan живуть у `config/quality/gate-manifest.json`. Запустіть `npm run check:gate-manifest`, щоб перевірити імена сценаріїв і точні команди на `package.json`; додавання, видалення та дрейф команд не виконують як локальний підхоплювач, так і завдання класифікації змін у CI. Псевдонім не є завданням робочого циклу, екземпляром матриці чи тестовим випадком: ці показники не можна подавати як взаємозамінні.

Використовуйте `npm run quality:scan -- --list` або `npm run quality:scan:fast -- --list` щоб перевірити вибрані псевдоніми без їх виконання. Програма запуску викликає точку входу npm, тому її час виконання (включаючи Bun якщо налаштовано) зберігається. Маніфест записує псевдоніми поза цими профілями як викликані окремо, а команди обслуговування заборонені в профілях сканування лише для читання.

Ці профілі охоплюють лише статичне сканування. Вони не сертифікують випробування продукту, покриття, упаковку, зовнішні перевірки або повне прийняття кандидата. Прийом робочого процесу використовує пов’язані `config/quality/admission-policy.json` та `scripts/quality/admission-verdict.mjs`. Профілі спостерігачів випуску залишаються окремими; самостійно перевіряти відповідні чеки та квитанції. Наведений нижче опис прози є посиланням, а не доказом того, що ворота справді пробігли.

Сценарії живуть під `scripts/check/` (policy gates) і `scripts/quality/` (ratchet engine). Джерелом правди CI є `.github/workflows/ci.yml`.

### Випуск PR fast-path (`quality.yml`)

`.github/workflows/quality.yml` доповнює CI на main/release PRs, надсилає до `main`, відправляє та зливає групи. PRs використовує швидкі перевірки з фільтрацією шляху. Постійно вимкнену дублікату збірки видалено; реальні перевірки build/package/boot залишаються в CI. Набір модулів і vitest працюють лише в CI (`Unit Tests (N/8)` і `Vitest`).

| Робота                                           | Область застосування                                                                                                                                | Блокування               |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs і docs-all                                                                                                             | так                      |
| `Fast Quality Gates`                             | Код PRs; статичні перевірки, перевірка типів, перевірка типів інформаційної панелі, пов'язані модульні тести, забуті однорідні тести (консультація) |
| `No new ESLint warnings`                         | Код PRs; захист від ворсу                                                                                                                           | Так, включно з виделками |
| `Merge integrity (changelog + generated skills)` | Нечорновий PRs; журнал змін і синхронізація створених навичок                                                                                       | Так, включно з виделками |

#### Звіт про тести на забутих братів і сестер

`npm run check:forgotten-sibling-tests` виконується як консультативний крок `Fast Quality Gates` і повторно використовує розпізнавач імпорту за картою тестового впливу. Для кожного зміненого виробничого модуля він повідомляє про детерміновані ланцюги `changed module/symbol -> static consumer -> candidate sibling test`, коли тест-кандидат відсутній у diff запиту на отримання. Підсумок Markdown і результат JSON зберігаються як артефакт робочого процесу `forgotten-sibling-tests` для калібрування перед будь-яким розгортанням блокування.

Реекспорт стовбура та динамічний імпорт є лише діагностикою роздільної здатності; вони ніколи не створюють блокуючих знахідок. Переглянуті винятки живуть у `config/quality/forgotten-sibling-allowlist.json`. У кожному записі має бути названо тест споживача та кандидата, надано конкретне обґрунтування та пов’язано з проблемою GitHub або запитом на отримання. Неправильно сформовані записи не вдалося закрити. Винятки не можуть придушити видалений тест-кандидат або різницю, яка додає `.skip`/`.todo`; ослаблення твердження та інше маскування залишаються у власності незалежного блокуючого воріт `check:test-masking`.

### Посада: `lint`

Працює на кожному PR до `main`. Блоки зливаються в разі невдачі.

| Скрипт (`npm run ...`)            | Перевіряє                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Блокування                                      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| `check:node-runtime`              | версія Node.js знаходиться в межах підтримуваного діапазону                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | так                                             |
| `check:cycles`                    | Циклічний імпорт у всіх `src/` + `open-sse/` (на основі AST, tsconfig `paths` дозволено). Bare виходить 1 кожного разу, коли існує будь-який цикл (закривається через помилку, оскільки #15281) і перераховує SCCs. `check:cycles:ratchet` (що запускає CI ) блокується, коли кількість перевищує межу `metrics.cycles` у `quality-baseline.json` — на даний момент 14, `direction: down`, тому він може лише впасти (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Так (тріскачка)                                 |
| `check:boundary`                  | зв’язок `open-sse → src` : унікальний імпорт файлів із механізму в програму (`scripts/quality/measure-boundary.mjs`; граничний список — це відставання виправлення v4 core/module-split ). Голий консультативний звіт = (те саме, що `quality:boundary`). `check:boundary:ratchet` (те, що запускає CI, також у петлі храповика з швидкими воротами `quality.yml` ) блокує, коли кількість перевищує межу `metrics.boundaryOpenSseToSrc` в `quality-baseline.json` — засіяно на виміряних 771, `direction: down`; `--update` лише знижує його; базовий відносний на PRs (`--base-ref`, див. нижче)                                                                                                                                                                                                                                                                                                                                                                                               | Так (тріскачка)                                 |
| `check:route-validation:t06`      | схеми Zod присутні на всіх маршрутах (політика Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | так                                             |
| `check:any-budget:t11`            | кількість `@ts-expect-error // any` не перевищує бюджет (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | так                                             |
| `check:provider-consistency`      | Кожен постачальник у `providers.ts` має відповідний запис у `providerRegistry.ts` (і навпаки, у списку дозволених)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | так                                             |
| `check:model-lifecycle`           | Три таблиці маршрутизації, що обслуговуються вручну, зберігають узгодженість із зареєстрованим знімком життєвого циклу (#11503): `FITNESS_TABLE` (`taskFitness.ts`) не зазначає жодного вилученого ідентифікатора, який може маршрутизувати `REGISTRY` ; кожна мета `BUILT_IN_ALIASES` присутня в `REGISTRY` і відсутня на знімку вилученого ідентифікатора; кожен вилучений ідентифікатор, який все ще знаходиться в `REGISTRY` пересилається або перераховується в `allowedRetiredInCatalog`; і жодне джерело чи ціль `DEFAULT_DEGRADATION_MAP` не відображаються на цьому знімку. Це не доводить, що модель наразі обслуговується живим апстрімом. Offline — порівнюється з `config/quality/model-lifecycle.json`, оновленим вручну за допомогою `npm run quality:refresh-model-lifecycle` (мережа; не підключено до CI). `allowedRetiredInCatalog` — це тріскачка, що спалює: додайте запис лише з проблемою відстеження.                                                                    | так                                             |
| `check:fetch-targets`             | Кожен `fetch("/api/...")` в `src/` на стороні клієнта перетворюється на справжній `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | так                                             |
| `check:deps`                      | Усі `npm install` -able deps у кожному `package.json` у сховищі знаходяться в `dependency-allowlist.json`; нові незакріплені або скупотовані пакунки позначено                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | так                                             |
| `audit:deps`                      | `npm audit` (кореневий + електрон) — немає рекомендацій щодо high/critical (перекриває osv `check:vuln-ratchet`; див. Відставання раціоналізації)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | так                                             |
| `check:lockfile`                  | `package-lock.json` цілісність — https реєстр, хеші цілісності, без перевизначення хосту                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | так                                             |
| `check:licenses`                  | список дозволених ліцензій SPDX для виробничих залежностей                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | так                                             |
| `check:tracked-artifacts`         | Жодних артефактів збірки/зафіксованих символічних посилань `node_modules` (також працює в попередньому коміті husky; попереднє надсилання навмисно легке — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | так                                             |
| `check:ai-attribution`            | Немає трейлера AI/bot `Co-Authored-By` або нижнього колонтитула, створеного штучним інтелектом, у комітах PR, заголовку чи тілі — Жорстке правило #16 (у циклі швидких воріт `quality.yml` для PR→ `release/**` — зчитує корисне навантаження подій, no-op off PRs — і крок лише для PR у `ci.yml` lint для PR→ `main`; також husky `commit-msg` ; дозволені люди-співавтори #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:vitest-exclusions`         | Кожне виключення Vitest називає проблему відстеження та відображається в `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | так                                             |
| `check:file-size`                 | Вихідні файли (`.ts`/`.tsx` у `src/`, `open-sse/`, `electron/`, `bin/`) залишаються в `cap` а тестові файли (`*.test.ts(x)`) у `testCap`; файли, заморожені в `file-size-baseline.json` (`frozen` / `testFrozen`), не повинні перевищувати їх записаний розмір                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | так                                             |
| `check:error-helper`              | Відповіді на помилки в executors/handlers використовують `buildErrorBody()` / `sanitizeErrorMessage()` (жорстке правило #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | так                                             |
| `check:migration-numbering`       | Файли міграції SQL мають послідовну нумерацію, без пропусків чи дублікатів                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | так                                             |
| `check:public-creds`              | Немає літеральних OAuth `client_id`/`client_secret` або веб-ключів Firebase поза `publicCreds.ts` (жорсткі правила #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | так                                             |
| `check:db-rules`                  | Немає вихідного SQL поза модулями `src/lib/db/` ; відсутність бочкових імпортів із `localDb.ts` (жорсткі правила #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | так                                             |
| `check:known-symbols`             | Виконавці постачальників, стратегії маршрутизації та перекладачі, зареєстровані в їхніх таблицях відправлення, відповідають файлам на диску — без втрати або незаявлених символів                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | так                                             |
| `check:route-guard-membership`    | Кожен маршрут, який породжує дочірній процес, класифікується за `isLocalOnlyPath()` (жорсткі правила #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | так                                             |
| `check:test-discovery`            | Кожен файл `*.test.ts` / `*.spec.ts` у сховищі збирається принаймні одним тестовим виконавцем (Ratchet: список сиріт у `test-discovery-baseline.json` може лише зменшуватися)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | так                                             |
| `check:test-tla-order`            | Жоден `node:test` файл під `tests/unit` не реєструє тест, потрапляє на `await` верхнього рівня, а потім реєструє більше (#18045; ratchet: `test-tla-order-allowlist.json` може лише зменшуватися)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | так                                             |
| `check:agent-skills-sync`         | Згенеровані артефакти навичок агента відповідають своєму вихідному каталогу (без дрейфу)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:provider-asset-provenance` | Постачальник logos/assets містить запис про походження                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `lint:json`                       | Конфігураційні файли JSON аналізують і задовольняють правила repo lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `typecheck:core`                  | компіляція TypeScript без помилок (лише рекомендаційні попередження)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | так                                             |
| `typecheck:noimplicit:core`       | Сувора перспективність `noImplicitAny` — ; багато вже існуючих сайтів дзвінків все ще потребують анотацій                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **консультативний** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` охоплює `src/app/(dashboard)/**` (#7033) — Підібраний список дозволених файлів з 27 файлів `typecheck:core` не містить жодної інформаційної панелі TSX, і `next build` також ніколи не перевіряє його тип (`next.config.mjs` встановлює `ignoreBuildErrors: true`), тому регресії залишеного ідентифікатора (#6625/#6909) були невидимі для CI. Розрізняється із замороженою базовою лінією підрахунку per-file/per-TS-code (`config/quality/dashboard-typecheck-baseline.json`, той самий застарілий шаблон застосування, що й `check:known-symbols`) — лише помилки NEW що перевищують базову кількість, не проходять ворота; за допомогою `--update`, коли вже існуючу помилку виправлено.                                                                                                                                                                                                                                                                                              | так                                             |
| `check:build-typecheck`           | Перевірка робочого типу всієї програми через `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), поверхневий список дозволених файлів `typecheck:core` із 27 файлів і шлюз інформаційної панелі не охоплюють. Відрізняється від `config/quality/build-typecheck-baseline.json`; новий або підвищений підрахунок за (файл, код) не вдається, нижчий підрахунок просить вас збільшити. `--update` відмовляється, поки цикл містить нову або підвищену пару, якщо не передано `--force-regressions`, і відмовляється від нещодавно вимкненого файлу, доки не передано `--force-nocheck`, тому розширення базової лінії, щоб стати зеленим, і надання постійного мовчання є двома окремими навмисними діями. Голий `--force` відхилено. Також сканує область збірки для `@ts-nocheck` проти `config/quality/ts-nocheck-baseline.json`, тому що файл, який використовує його, не повідомляє про жодну діагностику, інакше був би невидимим для всіх воріт. | так                                             |

#### Дві програми перевірки типів відповідають по-різному

`typecheck:core` і `check:build-typecheck` компілюють різні програми з різними параметрами, і той самий файл може бути чистим в одній і повним помилок в іншій.

`tsconfig.build.json` встановлює `"strict": false`, тому `noImplicitAny` вимкнено. Основна конфігурація складає підібраний білий список із 27 файлів із суворішими параметрами та дотримується графіка імпорту кожного запису, тож файли, які ніколи не з’являються в програмі збирання, все ще перевіряються там.

Наслідки мають значення, коли судять про те, чи набраний файл:** нульова діагностика під `check:build-typecheck` не означає нуль** . Видалення `@ts-nocheck` з 26 файлів показало, що 23 з них чисті в програмі збирання; шістнадцять із них виявили близько 120 неявних будь-яких помилок у строгому. Перевірте обидва, перш ніж назвати файл чистим.

### Посада: `quality-gate`

Запускається після `test-coverage`. Блоки зливаються в разі невдачі.

| Сценарій                     | Перевіряє                                                                                                                                                                     | Блокування             |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `quality:collect`            | Випромінює `quality-metrics.json` (кількість попереджень ESLint, покриття з об’єднаного звіту сегментів)                                                                      | Так (перед тріскачкою) |
| `quality:ratchet`            | Кожен показник у `quality-baseline.json` не регресував (попередження ESLint базовий рівень ≤ ; базовий рівень покриття ≥ )                                                    | так                    |
| `check:duplication`          | Дублювання коду (jscpd@4) не перевищує базового рівня в `quality-baseline.json`                                                                                               | так                    |
| `check:complexity`           | Цикломатична складність на рівні файлу не перевищує обмеження (core ESLint `complexity` + `max-lines-per-function`)                                                           | так                    |
| `check:cognitive-complexity` | Когнітивна складність Ratchet (`eslint-plugin-sonarjs`) — окремий ESLint проход; CI виконує обидва об’єднані як один крок `check:complexity-ratchets`                         | так                    |
| `check:dead-code`            | Невикористані експорти/файли тріскачки (knip) не регресують порівняно з базовим рівнем                                                                                        | так                    |
| `check:compression-budget`   | Еталонний бюджет стиснення — для кожного двигуна не має знижуватися                                                                                                           | так                    |
| `check:type-coverage`        | Відсотковий храповик (`type-coverage`) не регресує; значною мірою включає `typecheck:noimplicit:core`                                                                         | так                    |
| `check:codeql-ratchet`       | Відкритий підрахунок сповіщень CodeQL не регресує (читає через `gh api`; витончений пропуск без маркера) Частота оновлення — і ручний тригер: дивіться "CodeQL ratchet" нижче | так                    |

### Посада: `quality-extended`

Вся робота консультативна (`continue-on-error: true`). Храпові механізми на основі npm працюють реально; зовнішні сканери встановлюються через `gh release download` і самопропуск (вихід 0), коли двійковий файл все ще відсутній.

| Сценарій                 | Перевіряє                                                                                                                                                                                                             | Блокування                                           |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `check:circular-deps`    | Без циклічних залежностей (dpdm)                                                                                                                                                                                      | **консультативний**                                  |
| `check:bundle-size`      | Розмір пачки не перевищує ковпачка                                                                                                                                                                                    | **консультативний**                                  |
| `check:secrets`          | Секретне сканування (gitleaks) — пропускає, якщо двійковий код відсутній                                                                                                                                              | **консультативний**                                  |
| `check:vuln-ratchet`     | Уразливості залежностей (osv-сканер) не регресують. — пропускає, якщо двійковий код відсутній                                                                                                                         | **консультативний**                                  |
| `check:workflows`        | Workflow lint (actionlint + zizmor); сканери missing/broken, недійсні звіти або відсутня базова лінія храповика виходять з ладу як INCOMPLETE. Дійсні висновки відповідають вибраній політиці strict/advisory/ratchet | Потрібне виконання; zizmor блокування тріскачки в CI |
| `check:openapi-breaking` | Порушення змін загальнодоступного контракту API (`openapi.yaml`) проти базової гілки (oasdiff) — видає `openapiBreaking=N`; пропускається, якщо oasdiff відсутній або базова специфікація нерозв’язана                | **консультативний**                                  |

### Посада: `docs-sync-strict`

Працює на кожному PR до `main`. Блоки зливаються в разі невдачі.

| Сценарій                       | Перевіряє                                                                                                                                                               | Блокування                  |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `check:docs-all`               | Мета-шлюз, який послідовно запускає 6 суб-шлюзів нижче                                                                                                                  | так                         |
| ↳ `check:docs-sync`            | узгодженість версій CHANGELOG / OpenAPI / llm.txt                                                                                                                       | так                         |
| ↳ `check:docs-counts`          | Підрахунки в прозі (кількість постачальників, кількість міграцій тощо) знаходяться в межах реального підрахунку                                                         | так                         |
| ↳ `check:env-doc-sync`         | Кожна змінна env у `.env.example` задокументована в таблиці документів, і навпаки                                                                                       | так                         |
| ↳ `check:deprecated-versions`  | Немає рядків застарілої версії в документах                                                                                                                             | так                         |
| ↳ `check:doc-links`            | Внутрішні посилання розмітки в документах перетворюються на реальні файли (форма `[text]`/`(path)` )                                                                    | так                         |
| ↳ `check:fabricated-docs`      | Маршрути, змінні env, команди CLI, імена гаків і шляхи до файлів, цитовані в документах, існують у кодовій базі. Жорсткий гейт через `--strict`; soft-fail без прапора. | Так (через `--strict` в CI) |
| `check:cli-i18n`               | Командні рядки CLI присутні в усіх файлах локалі i18n                                                                                                                   | так                         |
| `check:openapi-coverage`       | Специфікація OpenAPI охоплює принаймні низку реальних маршрутів                                                                                                         | так                         |
| `check:openapi-security-tiers` | Анотації рівня безпеки в `openapi.yaml` узгоджуються з класифікаціями `routeGuard.ts`                                                                                   | **консультативний**         |
| `check:openapi-routes`         | Кожен шлях у `openapi.yaml` перетворюється на справжній `route.ts` (антигалюцинації)                                                                                    | так                         |
| `check:docs-symbols`           | Кожне посилання на `/api/...` в `docs/**/*.md` перетворюється на справжній `route.ts` (антигалюцинації)                                                                 | так                         |
| `i18n translation drift`       | Неперекладені ключі у файлах локалі i18n лише попереджають —                                                                                                            | **консультативний**         |

Генеруються дванадцять README SVGs під `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` регенерує їх усіх). Кожен із них має одиничний тест порівняння байтів (`tests/unit/docs/readme-*-svg.test.ts`, завдання `test-unit`), який не вдається, коли зафіксований файл застарів, а `check:docs-counts` зчитує канонічні числа з їхніх вузлів `<text>` — тому на етапі окреслення кожен окреслений рядок у файлі зберігається як невидимий `<text>`. Перевірка канонічних чисел SVG читає файли, перелічені в `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, а також `public/images/tier-flow-dark.svg` та `tier-flow-light.svg`; твердження про безкоштовність назавжди, запис у каталог, повторюваний пул і коефіцієнти оцінки також читаються як `promise-pillars.svg`, `free-tier-budget.svg` і `strategies-grid.svg`. `free-tier-budget.svg` малює свої цифри із завантажувача живого каталогу, тому зміна на `FREE_MODEL_BUDGETS` або відображуване ім’я постачальника відображає CI доки цей файл не буде створено повторно.

### Посада: `i18n-ui-coverage`

| Сценарій                              | Перевіряє                                                                                                                                                                                        | Блокування          |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| `check-ui-keys-coverage` (вбудований) | покриття ключів UI i18n становить ≥ 65%                                                                                                                                                          | так                 |
| `check-ui-value-drift` (вбудований)   | Переписана англійська** значення** не залишає застарілих перекладів                                                                                                                              | так                 |
| `check-new-key-coverage` (вбудований) | А** новий** Англійський ключ перекладається в кожній локалі —, а маркер `__MISSING__:` відхиляється                                                                                              | так                 |
| `check-translation-ratio`             | Коефіцієнт реального перекладу на мову (ідентично англійській / заповнювач / відсутні листи поза дозволеним списком) не має перевищувати `config/quality/i18n-translation-baseline.json` + slack | **консультативний** |

Потрібен `fetch-depth: 0` — ворота дрейфу значення відрізняє `en.json` від бази злиття.

#### `check-ui-value-drift` — шлюз застарілого перекладу

Вловлює одну i18n регресію, яку інші ворота структурно не бачать: значення англійською мовою переписується, а переклади, отримані з _попередньої_ англійської мови, залишаються позаду, тому неангломовні користувачі продовжують читати впевнено сформульовану, тепер неправильну копію.

Це справді відправлено. `oauthModal.googleOAuthWarning` було переписано, коли з’явився помічник входу Antigravity (#5203);** 39 з 43 локалізацій** зберіг текст, що повідомляє операторам «скопіювати повний URL і вставити його нижче» — потік, який не може завершитися для цього постачальника. Це залишилося непоміченим до #8463 оскільки:

- `sync-ui-keys` заповнює лише ключі, які є** відсутній** , ніколи не є** несвіжий** ;
- `check-ui-keys-coverage` підраховує _присутність_ ключа, тому застарілий переклад вважається покритим;
- `check-translation-drift` відстежує документацію `docs/i18n/<locale>/**.md`, дзеркала — вона ніколи не читає `src/i18n/messages/*.json`. Блокування в роботі `docs-sync-strict` після повторної синхронізації 2026-09: редагування основного документа → `npm run i18n:run -- --files=<doc>` (рівень розділу, дешево).

**З урахуванням відмінностей, без підтримки базової лінії.** Він порівнює `en.json` на базі злиття з робочим деревом; для кожного ключа, англійське значення якого змінено, будь-яка локаль, яка все ще містить незайманий переклад, є застарілою. Це свідомо** заморожує наявну заборгованість** — a diff не може виявити, з якої давньої англійської походить давній переклад, тому гейт оцінює лише те, що стосується поточної зміни. Альтернатива (базова лінія хешу для кожного ключа) коштувала б ~ 600 KB, згенерований файл, 3 × найбільший існуючий базовий рівень, збиваючи на кожному i18n PR.

Два способи задовольнити це:

1. оновити відповідні переклади, або
2. встановіть для них `__MISSING__:<new english>` — середовище виконання, а потім обслуговує виправлену англійську (`src/i18n/request.ts::deepMergeFallback`, #7258) і ключові черги для перекладу.

Якщо рядок** значення** змінений, воліти** перейменування ключа** : новий ключ не може успадкувати застарілий переклад. Це використаний шаблон #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Виходить 0 із `SKIP reason=base-unresolved`, коли базовий каталог неможливо прочитати (неглибокий клон без базового посилання), віддзеркалюючи `check-openapi-breaking`.

### Посада: `i18n`

Повна матриця перевірки i18n (одне завдання для кожної мови). Вся робота консультативна.

| Сценарій                        | Перевіряє                         | Блокування                                                    |
| ------------------------------- | --------------------------------- | ------------------------------------------------------------- |
| `validate_translation.py quick` | Повнота перекладу для кожної мови | **консультативний** (`continue-on-error: true` на всю роботу) |

### Посада: `pr-test-policy`

Працює лише за запитами на отримання.

| Сценарій               | Перевіряє                                                                                                                              | Блокування |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PRs, які змінюють робочий код у `src/`, `open-sse/`, `electron/` або `bin/` повинні включати або оновлювати тести (жорсткі правила #8) | так        |
| `check:test-masking`   | Змінені тестові файли не зменшують кількість net assert і не додають тавтології `assert.ok(true)`                                      | так        |
| `check:pr-evidence`    | PR body цитує test/VPS докази змін (механізує Hard Rule #18 шляхом grepping PR prose — fragile, див. Backlog)                          | так        |

### Посада: `test-vitest`

Запускається після `build`. Блоки зливаються в разі невдачі.

| Люкс             | Перевіряє                                                     | Блокування                                                                                        |
| ---------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 інструментів), autoCombo, кеш — vitest runner | так                                                                                               |
| `test:vitest:ui` | UI компонент тестує — vitest runner                           | **Блокування** попередні збої — явно виключені в `vitest.config.ts`; нові невдачі руйнують роботу |

### Нічні робочі процеси (за розкладом, рекомендації)

Вони працюють за розкладом cron (і `workflow_dispatch`), а не за PRs. Усі рекомендаційні.

| робочий процес         | Перевіряє                                                                                                                                                             | Блокування          |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `nightly-property`     | тести властивостей швидкої перевірки з випадковим початковим значенням +                                                                                              | **консультативний** |
| `nightly-resilience`   | heap-growth gate, chaos fault-injection, k6 load/soak                                                                                                                 | **консультативний** |
| `nightly-llm-security` | promptfoo injection guard (режим блокування) + garak probes (пропущено без секрету провайдера)                                                                        | **консультативний** |
| `nightly-schemathesis` | Фаззинг контракту OpenAPI (схематеза) проти живого OmniRoute що використовує `docs/openapi.yaml` —, порушення специфікацій поверхонь / необроблені 500 с (фаза 8 B.4) | **консультативний** |
| `nightly-mutation`     | Оцінка тестування на мутації Страйкера на швидкісній смузі одиниць — вижилі мутанти на поверхні слабкі твердження                                                     | **консультативний** |
| `nightly-compat`       | Матриця сумісності механізму вузла в підтримуваних діапазонах `engines.node`                                                                                          | **консультативний** |

Базові показники продуктивності (купа, TTFB, час створення) записуються, а не стробуються: див. [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
