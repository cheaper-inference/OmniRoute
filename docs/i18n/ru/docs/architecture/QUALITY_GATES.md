# Quality Gates Reference (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Этот документ является авторитетным справочным материалом по всем контрольным критериям качества CI в OmniRoute.
В нём описывается каждый критерий, что он проверяет, в каком задании CI он выполняется, использует ли он
базовый уровень с храповым механизмом или политику «пройдено/не пройдено», а также блокирует ли он сборку или носит рекомендательный характер.

Краткое описание и политику списка разрешений см. в разделе "Quality Gates & Ratchets"
в `AGENTS.md`. Критическую оценку, классификацию зрелости и не зависящий от инструментов
план воспроизведения той же системы см. в
[руководстве по контрольным критериям качества](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Каталог гейтов и профили выполнения

### Допуск кандидатов

Workflow CI и Quality Gates выдают стабильный вердикт: `Gate / CI` и
`Gate / Quality`. Их версионированная политика допуска перечисляет каждую
вышестоящую задачу как обязательную или рекомендательную. Применимая обязательная
задача должна завершиться успешно: отсутствующие, отменённые, пропущенные,
ожидающие и неизвестные результаты не могут дать PASS. Корректная классификация
docs-only или catalog-only может сделать кодовую дорожку неприменимой;
черновой PR не является принятым кандидатом. Метка `hotfix` не освобождает
от предоставления доказательств.

Оба workflow охватывают PR в ветки main/release, пуши в `main`, ручной запуск
(dispatch) и события merge-group. Пуш, ручной запуск и merge-group выполняют полный
набор. Пуши в `release/**` их не запускают (2026-10-18): каждое изменение уже
прошло матрицу в своём PR, а проверка объединённой комбинации — задача
Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane). Форки и merge-группы
используют hosted-раннеры для задач, которые иначе выбирают self-hosted
раннеры; достаточную ёмкость hosted-раннеров необходимо проверить до развёртывания.

Каждая JSON-квитанция идентифицирует SHA извлечённого кода, запуск workflow
и попытку. CLI отклоняет несовпадение SHA чекаута и события. Тесты workflow
привязывают членство в политике к списку `needs` задачи вердикта, чтобы новая
или удалённая дорожка не могла незаметно исчезнуть. Квитанции охватывают
собственный workflow, а не публикацию, развёртывание или внутреннее устройство
существующего рекомендательного сканера. Активация обоих имён проверок в правилах
ветки — отдельное административное изменение; добавление этих задач само по себе
не защищает ветку.

### Каталог статического сканирования

Версионированный каталог npm-алиасов и состав статического сканирования находятся
в `config/quality/gate-manifest.json`. Запустите `npm run check:gate-manifest`,
чтобы проверить имена скриптов и точные команды по `package.json`; добавления,
удаления и расхождения команд приводят к падению как локального хука, так и задач
классификации изменений в CI. Алиас — это не задача workflow, не экземпляр матрицы
и не тестовый случай: эти счётчики нельзя представлять как взаимозаменяемые.

Используйте `npm run quality:scan -- --list` или `npm run quality:scan:fast -- --list`,
чтобы просмотреть выбранные алиасы без их выполнения. Раннер вызывает точку входа
npm, поэтому её рантайм (включая Bun, где он настроен) сохраняется. Манифест
фиксирует алиасы вне этих профилей как вызываемые отдельно, а служебные команды
запрещены в профилях сканирования только для чтения.

Эти профили охватывают только статическое сканирование. Они не удостоверяют
продуктовые тесты, покрытие, упаковку, внешние проверки или полную релизную
приёмку кандидата. Допуск в workflow использует связанные
`config/quality/admission-policy.json` и `scripts/quality/admission-verdict.mjs`.
Профили наблюдателя релизов остаются отдельными; проверяйте их применимые проверки
и квитанции независимо. Текстовый каталог ниже — справочник, а не доказательство
того, что гейт действительно выполнялся.

Скрипты находятся в `scripts/check/` (гейты политики) и `scripts/quality/`
(движок ratchet). Источник истины для CI — `.github/workflows/ci.yml`.

### Fast-path для релизных PR (`quality.yml`)

`.github/workflows/quality.yml` дополняет CI для PR в main/release, пушей в
`main`, ручного запуска и merge-групп. PR используют быстрые проверки с
фильтрацией по путям. Окончательно отключённая дублирующая сборка удалена;
настоящие проверки сборки/упаковки/загрузки остаются в CI.

| Задача                                           | Область                                                                                                                                                                                                                       | Блокирует            |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | PR с документацией/кодом; ссылки API-документации и docs-all                                                                                                                                                                  | Да                   |
| `Fast Quality Gates`                             | PR с кодом; статические проверки, typecheck, typecheck дашборда, затронутые unit-тесты                                                                                                                                        | Да                   |
| `Forgotten sibling tests`                        | PR с кодом; изменённые модули отслеживаются до статических потребителей и кандидатных соседних тестов; пути barrel и динамического импорта сообщаются как рекомендательная диагностика с указанными исключениями из allowlist | **Рекомендательная** |
| `Vitest (fast-path)`                             | PR с кодом; быстрый набор vitest                                                                                                                                                                                              | Да                   |
| `Unit Tests fast-path`                           | PR с кодом; unit-набор из 4 шардов                                                                                                                                                                                            | Да                   |
| `No new ESLint warnings`                         | PR с кодом; lint-защита с учётом подавлений                                                                                                                                                                                   | Да, включая форки    |
| `Merge integrity (changelog + generated skills)` | PR не в статусе черновика; синхронизация changelog и сгенерированных скиллов                                                                                                                                                  | Да, включая форки    |

#### Отчёт `Forgotten sibling tests`

`npm run check:forgotten-sibling-tests` повторно использует резолвер импортов, лежащий в основе карты влияния тестов.
Для каждого изменённого production-модуля он выводит детерминированные
цепочки `changed module/symbol -> static consumer -> candidate sibling test`, если кандидатный
тест отсутствует в diff пул-реквеста. Сводка в формате Markdown и результат в формате JSON сохраняются как
артефакт workflow `forgotten-sibling-tests` для калибровки перед любым блокирующим развёртыванием.

Barrel-реэкспорты и динамические импорты служат только диагностикой разрешения импортов; они никогда не создают
блокирующей находки. Проверенные исключения хранятся в
`config/quality/forgotten-sibling-allowlist.json`. Каждая запись должна называть потребителя и кандидатный
тест, давать конкретное обоснование и ссылаться на issue или pull request на GitHub. Некорректно сформированные
записи приводят к закрытому отказу (fail closed). Исключения не могут подавлять удалённый кандидатный тест или diff,
добавляющий `.skip`/`.todo`; ослабление утверждений и другие виды маскировки остаются в ведении
независимо блокирующего гейта `check:test-masking`.

### Задание: `lint`

Запускается для каждого PR в `main`. При неудаче блокирует слияние.

| Скрипт (`npm run ...`)            | Проверяет                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Блокирующий                                      |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `check:node-runtime`              | Версия Node.js находится в поддерживаемом диапазоне                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Да                                               |
| `check:cycles`                    | Циклические импорты по всему `src/` + `open-sse/` (на основе AST, с разрешением `paths` из tsconfig). Запуск без ratchet завершается с кодом 1 при наличии любого цикла (fail-closed с #15281) и перечисляет SCC. `check:cycles:ratchet` (то, что запускает CI) блокирует, когда количество превышает потолок `metrics.cycles` в `quality-baseline.json` — сейчас 14, `direction: down`, поэтому оно может только снижаться (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Да (ratchet)                                     |
| `check:boundary`                  | Связность `open-sse → src`: уникальные импорты файл-в-файл из движка в приложение (`scripts/quality/measure-boundary.mjs`; список рёбер — это бэклог исправлений v4 core/module-split). Запуск без ratchet = информационный отчёт (то же, что `quality:boundary`). `check:boundary:ratchet` (то, что запускает CI, также в цикле ratchet fast-gates в `quality.yml`) блокирует, когда количество превышает потолок `metrics.boundaryOpenSseToSrc` в `quality-baseline.json` — зафиксирован на измеренном значении 771, `direction: down`; `--update` только снижает его; на PR рассчитывается относительно базовой ветки (`--base-ref`, см. ниже)                                                                                                                                                                                                                                                                                                                                                                                                                    | Да (ratchet)                                     |
| `check:route-validation:t06`      | Схемы Zod присутствуют на всех маршрутах (политика Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Да                                               |
| `check:any-budget:t11`            | Количество `@ts-expect-error // any` не превышает бюджет (трещотка уровня 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Да                                               |
| `check:provider-consistency`      | Каждый провайдер в `providers.ts` имеет соответствующую запись в `providerRegistry.ts` (и наоборот, в пределах списка разрешённых)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Да                                               |
| `check:model-lifecycle`           | Три поддерживаемые вручную таблицы маршрутизации остаются согласованными с зафиксированным в репозитории снапшотом жизненного цикла (#11503): `FITNESS_TABLE` (`taskFitness.ts`) не присваивает оценки ни одному выведенному из эксплуатации идентификатору, который `REGISTRY` способен маршрутизировать; каждая цель из `BUILT_IN_ALIASES` присутствует в `REGISTRY` и отсутствует в снапшоте выведенных идентификаторов; каждый выведенный идентификатор, всё ещё находящийся в `REGISTRY`, либо перенаправляется, либо перечислен в `allowedRetiredInCatalog`; и ни один источник или цель из `DEFAULT_DEGRADATION_MAP` не числится выведенным в этом снапшоте. Это не доказывает, что модель в данный момент обслуживается работающим апстримом. Офлайн-проверка — сравнивает с `config/quality/model-lifecycle.json`, обновляемым вручную через `npm run quality:refresh-model-lifecycle` (требует сети; не подключено к CI). `allowedRetiredInCatalog` — это трещотка на выгорание (burn-down): добавляйте запись только при наличии задачи для отслеживания. | Да                                               |
| `check:fetch-targets`             | Каждый `fetch("/api/...")` в клиентском `src/` разрешается в реальный `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Да                                               |
| `check:deps`                      | Все зависимости, устанавливаемые через `npm install`, во всех `package.json` репозитория присутствуют в `dependency-allowlist.json`; новые незакреплённые или подвергнутые слопскваттингу пакеты помечаются                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Да                                               |
| `audit:deps`                      | `npm audit` (корень + electron) — нет уязвимостей уровня high/critical (пересекается с osv-проверкой `check:vuln-ratchet`; см. бэклог рационализации)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Да                                               |
| `check:lockfile`                  | Целостность `package-lock.json` — https-реестр, хеши целостности, без переопределений хоста                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Да                                               |
| `check:licenses`                  | Список разрешённых лицензий SPDX для production-зависимостей                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Да                                               |
| `check:tracked-artifacts`         | Отсутствие артефактов сборки / закоммиченных симлинков `node_modules` (также запускается в husky pre-commit; pre-push намеренно облегчён — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Да                                               |
| `check:ai-attribution`            | Отсутствие трейлера `Co-Authored-By` от ИИ/ботов или футера об ИИ-генерации в коммитах, заголовке или теле PR — Жёсткое правило №16 (в цикле быстрых проверок `quality.yml` для PR→`release/**` — читает данные события, вне PR ничего не делает — и отдельный шаг только для PR в lint-задаче `ci.yml` для PR→`main`; также хук husky `commit-msg`; соавторы-люди допускаются; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:vitest-exclusions`         | Каждое исключение Vitest ссылается на отслеживаемую задачу и присутствует в `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Да                                               |
| `check:file-size`                 | Исходные файлы (`.ts`/`.tsx` в `src/`, `open-sse/`, `electron/`, `bin/`) не выходят за пределы `cap`, а тестовые файлы (`*.test.ts(x)`) — за пределы `testCap`; файлы, замороженные в `file-size-baseline.json` (`frozen` / `testFrozen`), не должны превышать зафиксированный размер                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Да                                               |
| `check:error-helper`              | Ответы об ошибках в executors/handlers используют `buildErrorBody()` / `sanitizeErrorMessage()` (Жёсткое правило #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Да                                               |
| `check:migration-numbering`       | Файлы миграций SQL пронумерованы последовательно, без пропусков и дубликатов                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Да                                               |
| `check:public-creds`              | Никаких литеральных OAuth `client_id`/`client_secret` или ключей Firebase Web вне `publicCreds.ts` (Жёсткое правило #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Да                                               |
| `check:db-rules`                  | Никакого сырого SQL вне модулей `src/lib/db/`; никаких barrel-импортов из `localDb.ts` (Жёсткие правила #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Да                                               |
| `check:known-symbols`             | Исполнители провайдеров, стратегии маршрутизации и переводчики, зарегистрированные в своих таблицах диспетчеризации, соответствуют файлам на диске — нет осиротевших или необъявленных символов                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Да                                               |
| `check:route-guard-membership`    | Каждый маршрут, порождающий дочерний процесс, классифицируется через `isLocalOnlyPath()` (Жёсткие правила #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Да                                               |
| `check:test-discovery`            | Каждый файл `*.test.ts` / `*.spec.ts` в репозитории собирается хотя бы одним тестовым раннером (ratchet: список осиротевших файлов в `test-discovery-baseline.json` может только сокращаться)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Да                                               |
| `check:agent-skills-sync`         | Сгенерированные артефакты agent-skills соответствуют исходному каталогу (без расхождений)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:provider-asset-provenance` | Логотипы/ресурсы провайдеров имеют зарегистрированную запись о происхождении                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `lint:json`                       | JSON-файлы конфигурации успешно парсятся и соответствуют правилам линта репозитория                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `typecheck:core`                  | Компиляция TypeScript без ошибок (только рекомендательные предупреждения)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Да                                               |
| `typecheck:noimplicit:core`       | Строгий `noImplicitAny` — на перспективу; многие существующие места вызовов всё ещё требуют аннотаций                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **Рекомендательный** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` с областью `src/app/(dashboard)/**` (#7033) — курируемый белый список из 27 файлов в `typecheck:core` не включает ни одного dashboard-файла TSX, и `next build` также никогда не выполняет его проверку типов (`next.config.mjs` задаёт `ignoreBuildErrors: true`), поэтому регрессии с осиротевшими идентификаторами там (#6625/#6909) были невидимы для CI. Сравнение с замороженной базовой линией по количеству ошибок на файл/на TS-код (`config/quality/dashboard-typecheck-baseline.json`, тот же шаблон контроля устаревания, что и в `check:known-symbols`) — проверку проваливают только НОВЫЕ ошибки сверх зафиксированного количества; уменьшайте базовую линию с помощью `--update` при исправлении существующей ошибки.                                                                                                                                                                                                                                                                                                                          | Да                                               |

### Задание: `quality-gate`

Запускается после `test-coverage`. Блокирует слияние при ошибке.

| Скрипт                       | Проверяет                                                                                                                                                                            | Блокирует                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `quality:collect`            | Формирует `quality-metrics.json` (количество предупреждений ESLint, покрытие из объединённого отчёта по шардам)                                                                      | Да (предшествует ратчету) |
| `quality:ratchet`            | Каждая метрика в `quality-baseline.json` не деградировала (предупреждения ESLint ≤ базовой линии; покрытие ≥ базовой линии)                                                          | Да                        |
| `check:duplication`          | Дублирование кода (jscpd@4) не превышает базовую линию в `quality-baseline.json`                                                                                                     | Да                        |
| `check:complexity`           | Цикломатическая сложность на уровне файлов не превышает предел (базовые правила ESLint `complexity` + `max-lines-per-function`)                                                      | Да                        |
| `check:cognitive-complexity` | Ратчет когнитивной сложности (`eslint-plugin-sonarjs`) — отдельный проход ESLint; CI запускает оба объединёнными в единый шаг `check:complexity-ratchets`                            | Да                        |
| `check:dead-code`            | Ратчет неиспользуемых экспортов / файлов (knip) не деградирует относительно базовой линии                                                                                            | Да                        |
| `check:compression-budget`   | Бюджет бенчмарка сжатия — минимальные пороги экономии токенов по каждому движку не должны деградировать                                                                              | Да                        |
| `check:type-coverage`        | Ратчет процента типизации (`type-coverage`) не деградирует; в значительной степени поглощает `typecheck:noimplicit:core`                                                             | Да                        |
| `check:codeql-ratchet`       | Количество открытых предупреждений CodeQL не деградирует (чтение через `gh api`; корректный пропуск без токена) — периодичность обновления и ручной запуск: см. «Ратчет CodeQL» ниже | Да                        |

### Задание: `quality-extended`

Всё задание является рекомендательным (`continue-on-error: true`). Ратчеты на основе npm выполняются
по-настоящему; внешние сканеры устанавливаются через `gh release download` и самопропускаются (exit 0),
если бинарный файл всё ещё отсутствует.

| Скрипт                   | Проверяет                                                                                                                                                                                                                                                           | Блокирует                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `check:circular-deps`    | Отсутствие циклических зависимостей (dpdm)                                                                                                                                                                                                                          | **Рекомендательная**                                 |
| `check:bundle-size`      | Размер бандла не превышает предел                                                                                                                                                                                                                                   | **Рекомендательная**                                 |
| `check:secrets`          | Сканирование секретов (gitleaks) — пропускается, если бинарный файл отсутствует                                                                                                                                                                                     | **Рекомендательная**                                 |
| `check:vuln-ratchet`     | Уязвимости зависимостей (osv-scanner) не деградируют — пропускается, если бинарный файл отсутствует                                                                                                                                                                 | **Рекомендательная**                                 |
| `check:workflows`        | Линт workflow (actionlint + zizmor); отсутствующие/сломанные сканеры, недействительные отчёты или отсутствующая базовая линия ратчета завершаются ошибкой как INCOMPLETE. Действительные находки обрабатываются согласно выбранной политике strict/advisory/ratchet | Выполнение обязательно; ратчет zizmor блокирует в CI |
| `check:openapi-breaking` | Ломающие изменения публичного API-контракта (`openapi.yaml`) относительно базовой ветки (oasdiff) — генерирует `openapiBreaking=N`; пропускается, если oasdiff отсутствует или базовая спецификация не может быть разрешена                                         | **Рекомендательная**                                 |

### Задание: `docs-sync-strict`

Запускается на каждый PR в `main`. Блокирует слияние при ошибке.

| Скрипт                         | Проверяет                                                                                                                                                                                | Блокирующий                |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | Мета-гейт, последовательно запускающий 6 подчинённых гейтов ниже                                                                                                                         | Да                         |
| ↳ `check:docs-sync`            | Согласованность версий в CHANGELOG / OpenAPI / llm.txt                                                                                                                                   | Да                         |
| ↳ `check:docs-counts`          | Числа в прозе (количество провайдеров, миграций и т. д.) находятся в пределах ratchet-окна реальных значений                                                                             | Да                         |
| ↳ `check:env-doc-sync`         | Каждая переменная окружения в `.env.example` задокументирована в таблице документации, и наоборот                                                                                        | Да                         |
| ↳ `check:deprecated-versions`  | В документации нет устаревших строк версий                                                                                                                                               | Да                         |
| ↳ `check:doc-links`            | Внутренние markdown-ссылки в документации указывают на реальные файлы (форма `[text]`/`(path)`)                                                                                          | Да                         |
| ↳ `check:fabricated-docs`      | Маршруты, переменные окружения, CLI-команды, имена хуков и пути к файлам, упомянутые в документации, существуют в кодовой базе. Жёсткий гейт через `--strict`; без флага — мягкий отказ. | Да (через `--strict` в CI) |
| `check:cli-i18n`               | Строки CLI-команд присутствуют во всех файлах локалей i18n                                                                                                                               | Да                         |
| `check:openapi-coverage`       | Спецификация OpenAPI покрывает не менее установленного ratchet-минимума реальных маршрутов                                                                                               | Да                         |
| `check:openapi-security-tiers` | Аннотации уровней безопасности в `openapi.yaml` согласованы с классификациями `routeGuard.ts`                                                                                            | **Рекомендательный**       |
| `check:openapi-routes`         | Каждый путь в `openapi.yaml` соответствует реальному `route.ts` (защита от галлюцинаций)                                                                                                 | Да                         |
| `check:docs-symbols`           | Каждая ссылка `/api/...` в `docs/**/*.md` соответствует реальному `route.ts` (защита от галлюцинаций)                                                                                    | Да                         |
| `i18n translation drift`       | Непереведённые ключи в файлах локалей i18n — только предупреждение                                                                                                                       | **Рекомендательный**       |

### Джоба: `i18n-ui-coverage`

| Скрипт                            | Проверяет                                                                                                                                                                                            | Блокирующий          |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `check-ui-keys-coverage` (inline) | Покрытие UI-ключей i18n ≥ 65%                                                                                                                                                                        | Да                   |
| `check-ui-value-drift` (inline)   | Переписанное английское **значение** не оставляет после себя устаревшего перевода                                                                                                                    | Да                   |
| `check-new-key-coverage` (inline) | **Новый** английский ключ переведён во всех локалях — маркер `__MISSING__:` отклоняется                                                                                                              | Да                   |
| `check-translation-ratio`         | Доля реальных переводов по каждой локали (совпадающие с английским / плейсхолдеры / отсутствующие листья вне allowlist) не должна превышать `config/quality/i18n-translation-baseline.json` + допуск | **Рекомендательный** |

Требуется `fetch-depth: 0` — гейт value-drift сравнивает `en.json` с merge base.

#### `check-ui-value-drift` — гейт устаревших переводов

Отлавливает единственную регрессию i18n, которую остальные гейты структурно не видят:
английское значение переписано, а переводы, сделанные с _прежнего_ английского текста,
остаются позади, и неанглоязычные пользователи продолжают читать уверенно
сформулированный, но уже неверный текст.

Это реально попало в продакшн. `oauthModal.googleOAuthWarning` был переписан, когда
появился помощник входа Antigravity (#5203); **39 из 43 локалей** сохранили текст,
предлагающий операторам «скопировать полный URL и вставить его ниже» — сценарий,
который для этого провайдера завершить невозможно. Это оставалось незамеченным
до #8463, потому что:

- `sync-ui-keys` заполняет только ключи, которые **отсутствуют**, и никогда — те, что **устарели**;
- `check-ui-keys-coverage` учитывает _наличие_ ключа, поэтому устаревший перевод засчитывается как покрытый;
- `check-translation-drift` отслеживает зеркала документации `docs/i18n/<locale>/**.md` —
  он никогда не читает `src/i18n/messages/*.json`. Блокирующий в джобе `docs-sync-strict`
  с момента повторной синхронизации 2026-09: отредактировали основной документ →
  `npm run i18n:run -- --files=<doc>` (на уровне секций, дёшево).

**С учётом диффа, а не на основе базовой линии.** Он сравнивает `en.json` в базовой точке слияния с рабочим деревом; для каждого ключа, чьё английское значение изменилось, любая локаль, всё ещё содержащая нетронутый перевод, считается устаревшей. Это намеренно **замораживает уже существующий долг** — дифф не может показать, из какого старого английского текста произошёл давно существующий перевод, поэтому гейт оценивает только то, что затрагивает текущее изменение. Альтернатива (базовая линия с хешем для каждого ключа) потребовала бы сгенерированный файл размером ~600 КБ — в 3 раза больше крупнейшей существующей базовой линии, — который пересоздавался бы при каждом i18n PR.

Два способа выполнить это условие:

1. обновить затронутые переводы, или
2. установить для них `__MISSING__:<new english>` — тогда рантайм будет отдавать исправленный английский текст (`src/i18n/request.ts::deepMergeFallback`, #7258), а ключ попадёт в очередь на перевод.

Если **смысл** строки изменился, предпочтите **переименование ключа**: новый ключ не может унаследовать устаревший перевод. Именно этот подход использовался в #8463.

```bash
npm run i18n:check-value-drift          # строгий режим (то, что запускает CI)
npm run i18n:check-value-drift:warn     # только отчёт
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Завершается с кодом 0 и `SKIP reason=base-unresolved`, когда базовый каталог невозможно прочитать (поверхностный клон без базовой ссылки), по аналогии с `check-openapi-breaking`.

### Задача: `i18n`

Полная матрица валидации i18n (одна задача на локаль). Вся задача носит рекомендательный характер.

| Скрипт                          | Проверяет                          | Блокирует                                                        |
| ------------------------------- | ---------------------------------- | ---------------------------------------------------------------- |
| `validate_translation.py quick` | Полнота перевода для каждой локали | **Рекомендательный** (`continue-on-error: true` для всей задачи) |

### Задача: `pr-test-policy`

Запускается только для pull request'ов.

| Скрипт                 | Проверяет                                                                                                                                             | Блокирует |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PR, изменяющие production-код в `src/`, `open-sse/`, `electron/` или `bin/`, должны включать или обновлять тесты (Жёсткое правило #8)                 | Да        |
| `check:test-masking`   | Изменённые тестовые файлы не уменьшают итоговое количество assert'ов и не добавляют тавтологии `assert.ok(true)`                                      | Да        |
| `check:pr-evidence`    | В описании PR приводятся доказательства тестирования/VPS для изменения (механизирует Жёсткое правило #18 путём грепа текста PR — хрупко, см. Backlog) | Да        |

### Задача: `test-vitest`

Запускается после `build`. Блокирует слияние при сбое.

| Набор            | Проверяет                                                           | Блокирует                                                                                                       |
| ---------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-сервер (110 инструментов), autoCombo, кэш — запуск через vitest | Да                                                                                                              |
| `test:vitest:ui` | Тесты UI-компонентов — запуск через vitest                          | **Блокирует** — уже существующие сбои явно исключены в `vitest.config.ts`; новые сбои приводят к провалу задачи |

### Ночные workflow (по расписанию, рекомендательные)

Они запускаются по cron-расписанию (и через `workflow_dispatch`), но никогда — на PR. Все они носят рекомендательный характер.

| Workflow               | Проверяет                                                                                                                                                                 | Блокирует            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `nightly-property`     | property-тесты fast-check со случайным seed и большим количеством прогонов                                                                                                | **Рекомендательный** |
| `nightly-resilience`   | контроль роста heap, chaos-инъекция сбоев, нагрузочные/soak-тесты k6                                                                                                      | **Рекомендательный** |
| `nightly-llm-security` | защита от инъекций promptfoo (режим блокировки) + пробы garak (пропускаются без секрета провайдера)                                                                       | **Рекомендательный** |
| `nightly-schemathesis` | фаззинг OpenAPI-контракта (schemathesis) против живого OmniRoute с использованием `docs/openapi.yaml` — выявляет нарушения спецификации / необработанные 500 (Fase 8 B.4) | **Рекомендательный** |
| `nightly-mutation`     | Показатель mutation-тестирования Stryker для быстрого unit-набора — выжившие мутанты указывают на слабые assert'ы                                                         | **Рекомендательный** |
| `nightly-compat`       | Матрица совместимости движка Node для поддерживаемых диапазонов `engines.node`                                                                                            | **Рекомендательный** |

Базовые показатели производительности (heap, TTFB, время сборки) фиксируются, но не блокируют: см. [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Фаза скорости (2026-08-30 → v4.0 LTS): все базовые пороги ослаблены на 20%

Решение владельца (2026-08-30): до модульной переработки в v4.0 скорость выпуска важнее
сдерживания технического долга. Все **числовые** базовые пороги храповиков были ослаблены на 20% за один
аудируемый проход, а фаза объявлена в `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Что изменилось                                                                                                                                                                                                                                      | Где                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — значения, где меньше — лучше, умножены на 1.2; проценты, где больше — лучше, разделены на 1.2 (минимальное покрытие осталось 60, `eslintErrors` остаётся 0, `eslintWarnings` 0 → 20% от зафиксированного количества подавлений) | `quality-baseline.json` (примечание `_relax_velocity_2026_08_30` содержит все значения до → после)     |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                                    | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, лимит строк для каждого `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                                        | `file-size-baseline.json`                                                                              |
| количество для каждого файла / каждого TS-кода ×1.2                                                                                                                                                                                                 | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                                 | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` становится рекомендательным, пока `_policy.requireTighten === false`                                                                                                                                                            | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| ночной процесс `bank-ratchet-shrinks` приостанавливается (иначе он зафиксировал бы измеренное сокращение и устранил запас)                                                                                                                          | `.github/workflows/nightly-release-green.yml`                                                          |

Списки разрешений (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **не** являются бюджетами и не изменялись. Политики проверок с результатом «пройдено/не пройдено» (секреты, правила SQL,
контракт документации и переменных окружения, паритет i18n, модульные тесты) не изменились — непройденный тест по-прежнему остаётся непройденным.

**Инструменты**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — одноразовое
  ослабление (`scripts/quality/relax-baselines.mjs`); скрипт отказывается запускаться повторно с тем же
  примечанием.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  измеряет каждый числовой порог так же, как CI, и выводит оставшийся запас для каждого порога
  (`scripts/quality/baseline-headroom.mjs`). Ночная задача `baseline-headroom` публикует
  таблицу в сводке запуска рабочего процесса и загружает отчёт в форматах JSON/Markdown как
  `baseline-headroom-<run_id>` со сроком хранения 90 дней. Строки с предупреждениями и критическими состояниями
  указывают на пороги, находящиеся в пределах 10% от своего лимита или уже превысившие его. Используйте эти отчёты
  как раннее предупреждение о расходовании бюджетов; проверяйте примечания `_rebaseline_*`
  соответствующего порога. Задача больше не создаёт и не обновляет постоянную задачу; #12149
  сохраняет историю предыдущих отчётов.

**Режим нового кода (Clean-as-You-Code) — с 2026-08-30, только для ускоренного пути PR**

При событиях `pull_request` файл `quality.yml` передаёт `--base-ref <PR base SHA>` в `check:file-size`,
`check:complexity-ratchets` и `check:dead-code`. Для `check:complexity-ratchets` и
`check:dead-code` проверка сравнивает HEAD с базой слияния **только для файлов, затронутых PR**
(`scripts/check/newCodeMode.mjs`: база слияния материализуется во временном
`git worktree`, ESLint/knip запускаются там и на HEAD, после чего вычисляется разница количества по каждому файлу):

- **блокирующее условие** — PR добавил нарушения цикломатической/когнитивной сложности или мёртвые экспорты в изменённых им файлах
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` в журнале);
- **рекомендательное условие** — глобальное итоговое значение относительно зафиксированного базового порога. Унаследованное отклонение никогда не приводит
  к провалу невиновного PR; отклонение повторно фиксируется при сверке релиза и отслеживается задачей контроля запаса.

`check:file-size` использует базовую ссылку по собственным правилам (`scripts/check/check-file-size.mjs`, #8522):
он проверяет каждый файл исходного кода и тестов в дереве, считывает количество строк каждого файла в базе PR
с помощью `git show` и считает проверку файла непройденной, только когда файл превышает больший из двух порогов: свой базовый предел
(`frozen` / `testFrozen` либо `cap` / `testCap` для файла вне базового набора) или свой размер
в базе. Поэтому файл, уже отклонившийся в базе, никогда не приводит к провалу невиновного PR.

`check:boundary:ratchet` применяет то же правило к своему единственному числовому показателю
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): при событиях PR и быстрые
проверки `quality.yml`, и задача линтинга из `ci.yml` передают базовый SHA PR, базовый коммит
измеряется из экспорта `git archive`, а PR завершается с ошибкой, только если количество его
рёбер `open-sse → src` превышает большее из значений `metrics.boundaryOpenSseToSrc` и количества
в базовой версии. Дрейф базы выше предельного значения отмечается (`base drift herdado`), но
никогда не приводит к сбою невиновного PR; push → main сохраняет абсолютный предел, а при
невозможности разрешить базовый SHA выполняется откат к нему с предупреждением.

Запуски `workflow_dispatch`, итоговая проверка зелёного статуса релиза и ночная задача проверки
запаса не имеют базы PR и сохраняют абсолютное (глобальное) сравнение. Покрытие, дублирование и
покрытие типами пока остаются глобальными (их инструменты не позволяют дёшево получить разницу
по отдельным файлам) — они являются кандидатами на такую же обработку.

**Завершение этапа в v4.0 (LTS = строже, чем раньше, а не «возврат к норме»)**

1. На чистой вершине `release/v4.0.0`: выполнить `npm run quality:headroom --json` для фиксации
   результата, затем `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, а также `--update` для
   каждой проверки типов — все базовые значения снижаются до измеренного уровня.
2. Удалить `_policy` из `quality-baseline.json` (это повторно активирует `--require-tighten` и
   ночное накопление запаса), восстановить `THRESHOLD = 36` (или выше) в
   `check-openapi-coverage.mjs`.
3. Ужесточить значения относительно измеренных там, где модульность принесла результат:
   вернуть `cap` размера файла к 1000 (или 800), повысить минимальные пороги покрытия на 5,
   установить 0 для неиспользуемых экспортов в модульных пакетах.

## Базовый уровень храповика (`quality-baseline.json`)

Механизм храповика (`scripts/quality/check-quality-ratchet.mjs`) считывает `quality-baseline.json`
и сравнивает его со свежесобранным `quality-metrics.json`. Если любая метрика ухудшается
больше, чем допускает её эпсилон, сборка завершается с ошибкой.

Текущие отслеживаемые метрики:

| Метрика               | Направление | Значение                                         |
| --------------------- | ----------- | ------------------------------------------------ |
| `eslintWarnings`      | `down`      | Количество предупреждений ESLint не должно расти |
| `coverage.statements` | `up`        | Покрытие операторов не должно снижаться          |
| `coverage.lines`      | `up`        | Покрытие строк не должно снижаться               |
| `coverage.functions`  | `up`        | Покрытие функций не должно снижаться             |
| `coverage.branches`   | `up`        | Покрытие ветвей не должно снижаться              |

Чтобы обновить базовый уровень после фактического улучшения:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Флаг `--update` записывает текущие измеренные значения в `quality-baseline.json`.
Зафиксируйте этот файл вместе с изменением, улучшившим метрику. PR, который улучшает
метрику без обновления базового уровня, будет обнаружен с помощью `--require-tighten` (Фаза 6A.5,
реализация ожидается).

### Храповик CodeQL: периодичность обновления и ручной запуск

`check:codeql-ratchet` считывает **состояние репозитория, обновляемое по расписанию, а не для каждого PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` сообщает
`state: configured`, `schedule: weekly`: это сканирование GitHub с настройками по умолчанию, а не анализ
при каждой отправке изменений. Следствие: после слияния PR, ИСПРАВЛЯЮЩЕГО предупреждения, храповик продолжает считывать
старое, более высокое значение до следующего запуска сканирования по расписанию — поэтому он сообщает о регрессии
в каждом открытом PR, включая последующие PR для исправляющего PR, пока результаты сканирования не обновятся.

**Ручное обновление**: `gh workflow run codeql.yml --ref release/vX.Y.Z` повторно запускает
анализ и в течение нескольких минут повторно публикует предупреждения. Сначала прочитайте `.github/workflows/codeql.yml`
— в его заголовке объясняется, что используется только `workflow_dispatch`, **поскольку он конфликтует с
«настройками по умолчанию» GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Для восстановления триггеров `push`/`pull_request`/
`schedule` сначала требуется **действие владельца**: Настройки → Безопасность кода →
CodeQL: По умолчанию → Расширенная. Не добавляйте триггер `schedule:` без этого переключения — он
будет приводить только к неудачным запускам.

**Ужесточите базовый уровень после уменьшения количества** — `node scripts/check/check-codeql-ratchet.mjs
--update` записывает новое измеренное количество в `quality-baseline.json` →
`metrics.codeqlAlerts.value`, чтобы храповик не допускал незаметной регрессии обратно
до старого предельного значения. Практический пример (2026-09-02/03): PR #12502 исправил 7 реальных предупреждений
(13 → 6 измеренных открытых); PR #12530 ужесточил зафиксированный базовый уровень с 11 до 6 для соответствия; затем
оставшиеся 6 были отклонены с отдельным обоснованием для каждого предупреждения, в результате чего открытых предупреждений стало 0.

**Решение об отклонении принимает оператор (Жёсткое правило #14)** — никогда не отклоняйте предупреждение CodeQL,
не указав техническое обоснование в комментарии к отклонению: `won't fix` для
требования вышестоящего протокола, `used in tests` для тестовой фикстуры, `false positive`
для санитайзера, который CodeQL не может обнаружить (прецедент: `docs/security/ERROR_SANITIZATION.md`).

---

## Политика повторных запусков тестов (WS5.4, v3.8.49)

Повторные запуски настраиваются отдельно для каждого раннера, а не глобально для всех — глобальный повторный запуск превращает реальные регрессии в незаметные нестабильности:

| Раннер           | Политика                                                                                                                                                   | Почему                                                                                                                                                       |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Playwright (e2e) | `retries: 1` только в CI, с `trace: on-first-retry`                                                                                                        | Временные параметры браузера/сети действительно недетерминированы; один повторный запуск с трассировкой превращает нестабильность в диагностируемый артефакт |
| Vitest           | БЕЗ глобального повторного запуска. Для подтверждённо нестабильного теста повторный запуск задаётся явно на уровне теста (виден в diff и проверяется в PR) | Список изолированных тестов остаётся в репозитории и никогда не становится непрозрачным                                                                      |
| node:test (unit) | БЕЗ повторных запусков, никогда                                                                                                                            | Нестабильный модульный тест — это ошибка в тесте: исправьте её, а не запускайте тест заново                                                                  |

Целевые SLO после появления телеметрии нестабильностей (WS5.2/5.3): частота нестабильности <1% для каждого теста (порог «исправить сейчас»), доля успешных выполнений для каждого пайплайна ≥95%. Это отраслевые ориентиры — их следует откалибровать по нашим собственным измерениям.

## Дрейф ограничителей на уровне релиза (WS5.5, v3.8.49)

Когда ограничитель (размера файла, сложности, предупреждений eslint) регрессирует на ЧИСТОЙ вершине релизной ветки — то есть регрессия возникает из-за КОМБИНАЦИИ слияний и ни один отдельный PR не воспроизводит её в собственной ветке, — исправление выполняет **капитан релиза, однократно, в релизной ветке**: предпочтительно выделить код или провести рефакторинг; обновлять базовый уровень можно только с документированным обоснованием. Никогда не перекладывайте дрейф, вызванный комбинацией изменений, на PR участника и никогда не обновляйте базовый уровень отдельно для каждого PR (это скрывает реальные регрессии). Сначала определите источник: воспроизведите ошибку на чистой вершине в проверочном worktree, прежде чем предполагать, что её вызвал ваш PR.

## Фиксация снижений ограничителей — движение вниз (#8584)

Автоматизирована лишь половина механизма ограничителей, причём не та половина, которая нужна. **Повышение** предела — это ручное редактирование JSON, занимающее десять секунд и позволяющее быстрее всего разблокировать красный PR. **Понижение** требует, чтобы кто-то запустил `--update` и зафиксировал результат, — а до появления задания `bank-ratchet-shrinks` ни один рабочий процесс этого не делал. Измеренные последствия (2026-07-25): 18 замороженных файлов уже достигли или опустились ниже предела в 800 строк для новых файлов, худший случай превышает актуальное значение в 132 раза (`src/shared/validation/schemas.ts`: 19 строк при установленном пределе 2 523); потолок сложности вырос с `1794 → 2169` примерно за 37 заметок об обновлении базового уровня и снизился ровно один раз (−1); фраза «снизить через `--update` в следующем цикле» была записана 31 раз, а выполнено это было один раз. Предел, сохраняющийся дольше, чем код, из-за которого он появился, незаметно превращает каждую завершённую декомпозицию в разрешение на рост для следующего разработчика, изменяющего файл.

`nightly-release-green.yml` → задание **`bank-ratchet-shrinks`** замыкает этот цикл:

|            |                                                                                                                       |
| ---------- | --------------------------------------------------------------------------------------------------------------------- |
| Запуск     | `schedule` (3 раза в день) + `workflow_dispatch` — намеренно **не** `push`                                            |
| Измеряет   | старшую ветку `release/vX.Y.Z`, с тем же разрешением и защитой от внедрения, что и `release-green`                    |
| Записывает | `check:file-size --update` и `check:complexity-ratchets --update` (оба по своей реализации допускают только снижение) |
| Проверяет  | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                              |
| Доставляет | один всегда актуальный PR в релизную ветку — принудительно обновляемый и не создающий спама                           |

Фиксация выполняется пакетно, а не при каждом push, поскольку у неё нет требований к задержке (зафиксировать снижение в течение 8 часов вполне допустимо), тогда как запуск при каждом слиянии многократно пересобирал бы ветку PR во время серий слияний и каждый раз требовал бы полного прохода ESLint. Обнаружение по-прежнему выполняется при push (`release-green`); пакетно выполняется только фиксация.

### Верификатор безопасности

Задание изменяет базовые уровни без вмешательства человека, поэтому приемлемость этого обеспечивает `verify-ratchet-bank.mjs`. Он сравнивает дерево после `--update` с `HEAD` и **прерывает задание до создания какого-либо коммита**, не открывая PR, если каждое изменение не относится к одному из следующих типов:

- числовая запись `frozen` / `testFrozen` **снижена** или **удалена**
- `complexity-baseline.json` → `count` **снижено**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **снижено**

Любые другие изменения приводят к сбою: повышение числа, добавление записи, изменение `cap`/`testCap` либо удаление/перезапись заметки `_rebaseline_*` (эти заметки служат журналом аудита, объясняющим причину существования каждого потолка, и хранятся внутри того же объекта `frozen`, что и записи файлов). Бот, способный повысить предел, был бы однозначно хуже текущего положения дел. Защита от регрессий: `tests/unit/verify-ratchet-bank.test.ts`.

Задание никогда не выполняет push в `release/*` — PR сливает человек, поэтому ошибочное измерение не может попасть в ветку без проверки.

## Политика списка разрешений

Каждая проверка, которая не должна завершаться ошибкой из-за ранее существовавших нарушений, использует зафиксированный список разрешений
(например, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Политика такова:

**Устраняйте первопричину; используйте список разрешений только тогда, когда нарушение существовало ранее и
не может быть исправлено в том же PR.**

При добавлении записи в список разрешений:

1. Добавьте комментарий с обоснованием.
2. Укажите ссылку на задачу для отслеживания (например, `// #3498 — Функциональность этапа 2, ещё не реализована`).
3. Удалите запись в том же PR, который исправляет нарушение, — устаревшая запись, которая больше
   не подавляет активное нарушение, сама является дефектом (проверка устаревших правил 6A.3
   после реализации будет завершаться ошибкой при наличии бесхозной записи в списке разрешений).

**Не** добавляйте записи в список разрешений, чтобы тесты проходили быстрее. Успешная проверка при растущем
списке разрешений создаёт ложное ощущение качества.

### Если проверка завершается ошибкой в вашем PR

1. **Внимательно прочитайте вывод проверки** — в нём точно указано, какой файл или символ нарушил
   правило.
2. **Исправьте нарушение** — большинство проверок представляют собой детерминированные проверки файловой системы, которые проходят, как только
   код исправлен.
3. **Если нарушение существовало ранее** (то есть вы его не вносили, но теперь оно
   охватывается проверкой): добавьте запись в список разрешений с комментарием-обоснованием и ссылкой на задачу для отслеживания.
4. **Если проверка использует храповый механизм** (покрытие, предупреждения ESLint, дублирование, сложность):
   ваше изменение ухудшило метрику. Исправьте первопричину или (в редких случаях) выполните
   `npm run quality:ratchet -- --update`, если изменение было намеренным и ухудшение
   метрики допустимо, — но объясните причину в описании PR.
5. **Рекомендательные проверки** (`continue-on-error: true`) носят информационный характер — они не блокируют
   слияние, но отображаются в сводке CI. Тем не менее исправляйте их.

---

## Добавление новой проверки

1. Создайте `scripts/check/check-<name>.mjs` (или `.ts`). Проверки политик завершаются с кодом 0/1.
   Проверки с храповым механизмом записывают метрику в `quality-metrics.json` через `collect-metrics.mjs`.
2. Добавьте `"check:<name>": "node scripts/check/check-<name>.mjs"` в `package.json`.
3. Подключите её в `.github/workflows/ci.yml` в рамках соответствующего задания
   (политика → `lint` или `docs-sync-strict`; храповый механизм → `quality-gate`).
4. Если у неё есть список разрешений, примените `reportStaleEntries()` из
   `scripts/check/lib/allowlist.mjs`, чтобы устаревшие записи обнаруживались автоматически.
5. Напишите тест в `tests/unit/build/`, покрывающий логику обнаружения нарушений этой проверкой.
6. Обновите этот документ (добавьте строку в таблицу соответствующего задания).

---

## Инструменты для агентов: LSP в цикле разработки (по желанию)

Помимо проверок CI, OmniRoute поставляется с **опциональной** заготовкой `agent-lsp`
(проектный файл `.mcp.json`, этап 7, задача 15). Создайте `.mcp.json`,
чтобы предоставить агентам разработки доступ к языковому серверу TypeScript и позволить им разрешать символы /
диагностику **до** написания кода — это дополняющий `typecheck:core` подход «компиляция до утверждения»,
который устраняет ошибки с «выдуманными символами» в самом источнике. Заготовка намеренно
не загружается автоматически (вы сами выбираете и проверяете мост MCP↔LSP); некорректная запись лишь регистрирует
ошибку подключения и никогда не нарушает работу сеансов.

---

## Бэклог рационализации (оценка ROI — фаза 9, волна 3)

Эта инвентаризация была сверена с `ci.yml` 2026-06-17 (в предыдущей версии были пропущены
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Оценка ROI сверенного набора
выявила следующие кандидатуры на рационализацию. **Объединения представляют собой механические
изменения CI; переключение режимов и удаление — это решения по политикам, остающиеся за оператором.** Ничто из перечисленного ниже
пока не применено.

**Также не задокументированы выше** (рекомендательные, низкий уровень сигнала): задание `docs-lint`
(markdownlint + Vale, всё задание с `continue-on-error`) и автономные рабочие процессы сканирования
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` присутствует в
`quality-baseline.json`, но не подключён к блокирующему храповому механизму в `ci.yml` — сейчас эта метрика
изолирована.

### Объединение / устранение дублирования (механические изменения, меньший риск)

Каждая кандидатура была проверена по фактическому состоянию гейтов на 2026-06-17 (доверяй, но проверяй);
оказалось, что несколько «очевидных» объединений скрывают технический долг и **не** являются беспроблемной заменой.

- **`check:docs-sync` запускается дважды** — отдельно в задании `lint`, а затем ещё раз внутри `check:docs-all` (`docs-sync-strict`) и в pre-commit-хуке husky. ✅ **ГОТОВО** — отдельный вызов в `lint` удалён.
- **Сканирование CVE** — ❌ **НЕ является беспроблемным объединением.** `audit:deps` завершается с ошибкой при любой CVE уровня high/critical; `check:vuln-ratchet` (osv) завершается с ошибкой только при _регрессии_ относительно базового уровня (сейчас 1 MODERATE). Семантика различается — удаление `audit:deps` приведёт к потере абсолютного гейта для уровней high/critical. Сохранить оба.
- **Обнаружение циклов** — ✅ **ГОТОВО** (#15159 G-01/G-02). В старом тексте `check:cycles` назывался «зелёным, тщательно настроенным» гейтом, а его блокирующий статус обосновывался тем, что `check:circular-deps` (dpdm) обнаруживал 91 цикл. Этот зелёный статус был **ложноположительным**: `check:cycles` сканировал 5 подкаталогов (450 файлов), находил только статические конструкции `import|export … from` и отбрасывал все спецификаторы `@/` и `@omniroute/open-sse/`, поэтому не мог увидеть циклы с динамическим импортом и псевдонимами, преобладавшие в репозитории. Исправлено: теперь гейт обходит `src` + `open-sse` (5023 файла), собирает спецификаторы из AST TypeScript (поэтому `import("…")` учитывается, а `typeof import("…")` в позиции типа — нет) и разрешает `paths` из tsconfig. Он обнаруживает **14** циклов, а не 0. Поскольку 14 существовавших ранее циклов нельзя исправить в PR для гейта, `check:cycles` теперь является **храповым механизмом** (`--ratchet`, порог `metrics.cycles.value = 14` в `quality-baseline.json`, `direction: down`) — он блокирует любую _регрессию_, а количество циклов может только уменьшаться. CI запускает `npm run check:cycles:ratchet`. Постепенное устранение выполняется в рамках **A-01**. `check:circular-deps` (dpdm) остаётся рекомендательной более широкой второй проверкой.
- **Сложность** — ✅ **ГОТОВО** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): один проход ESLint, подсчёт по ruleId, поэтому базовые уровни цикломатической сложности + максимального числа строк и когнитивной сложности остаются независимыми; отдельные `check:complexity` / `check:cognitive-complexity` сохранены для локального запуска с `--update`.
- **Защита от галлюцинаций `/api`** — ✅ **ГОТОВО** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): одна инвентаризация `src/app/api` в файловой системе, openapi-routes + docs-symbols по-прежнему формируют отчёты независимо; отдельные проверки сохранены для локального запуска.
- **`check:node-runtime` запускается в 11 заданиях** — ⚠️ **низкий ROI.** Каждое выполняется на отдельном раннере, а проверка занимает <1 с; общая экономия составит ~10 с ценой потери дешёвой защиты в каждом задании. Не стоит вносимых изменений.
- **`typecheck:noimplicit:core` в CI lint** — ✅ **удалён из задания lint** (был рекомендательным с `continue-on-error`); блокирующая поверхность типов обеспечивается `typecheck:core` + `check:type-coverage`. Локальный скрипт сохранён.

### Переключить / решить (политика оператора)

- `check:openapi-security-tiers` (рекомендательный) — ❌ **НЕЛЬЗЯ беспроблемно перевести в блокирующий режим.** Он завершается с кодом 0, но предупреждает, что у нескольких маршрутов `traffic-inspector` в `LOCAL_ONLY_API_PREFIXES` отсутствует аннотация `x-loopback-only: true`. Для принудительного применения сначала необходимо добавить эти аннотации в `openapi.yaml`.
- `typecheck:noimplicit:core` (рекомендательный) — в значительной степени перекрывается блокирующим храповым механизмом `check:type-coverage`. Перевести на храповой механизм или удалить избыточный второй проход `tsc`.
- `test:vitest:ui` (теперь **блокирующий**) — существовавшие ранее сбои явно исключены в `vitest.config.ts` с отслеживающими комментариями `// #8618`; новые сбои приводят к провалу задания.
- `check:secrets` (gitleaks, блокирующий храповой механизм, зафиксированный на 3 задокументированных ложноположительных результатах) — добавить эти 3 результата в список разрешений, чтобы достичь 0, либо перевести проверку в рекомендательный режим. Перекрывается нативным сканированием секретов GitHub + `check:public-creds`.
- `check:pr-evidence` (блокирующий, ищет шаблоны в тексте тела PR) — высокий риск ложноположительных результатов; его удаление ослабит соблюдение Hard Rule #18, поэтому это действительно вопрос политики.
- `semgrep` (рекомендательный автономный процесс) — перекрывается с CodeQL по семействам OWASP; подключить его базовый уровень к храповому механизму или удалить.

---

## Связанная документация

- Цепочка поставок (происхождение, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — проверка соответствия наборов ключей

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, задание `i18n-ui-coverage`).
Сравнивает набор конечных ключей каждого файла `src/i18n/messages/<locale>.json` с `en.json` и завершает
работу с ошибкой при наличии любого отсутствующего или лишнего конечного ключа, независимо от того, когда ключ был добавлен. Заполнители `__MISSING__:`
считаются присутствующими (их содержимое относится к компетенции проверки доли). Это абсолютное дополнение
двух проверок на основе различий/процентов: `check-ui-keys-coverage` устанавливает минимальный порог 80 % для каждой
локали (43 отсутствующих ключа из ~13 000 всё ещё дают 99,7 %), а `check-new-key-coverage` оценивает
только ключи, которые PR добавляет в `en.json`. Пакет локалей создаётся на основе версии `en.json` на день
ответвления его ветки, после чего перевод выполняется несколько дней, пока базовая ветка продолжает получать новые ключи; сам PR пакета не добавляет
ключей, поэтому обе соседние проверки промолчали, когда пакет 1 (#13044) был влит с нехваткой 43 ключей в девяти
локалях, а пакет 2 (#13660) — с нехваткой 10 ключей в восьми (2026-09-15). Чтобы исправить ошибку, выполните
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; конечный ключ `extra`
означает, что он был удалён из источника — удалите его из локали. `--warn` выводит отчёт без завершения с ошибкой.
`--catalog=cli` выполняет такое же сравнение для `bin/cli/locales` (`npm run i18n:check-keys:cli`);
оба шага находятся в задании `i18n-ui-coverage`.

#### `check-new-key-coverage` — проверка интернационализации новых ключей

Соседняя проверка для `check-ui-value-drift`. Та обнаруживает случай, когда английское значение было **переписано**,
а его переводы не были обновлены; эта же обнаруживает случай, когда английский ключ был **добавлен**,
но некоторые локали его так и не получили.

`check-ui-keys-coverage` не может обнаружить такой случай: она устанавливает процентный порог для каждой локали, а
одиннадцать отсутствующих ключей из ~13 000 оставляют покрытие на уровне 99,9 %. Процентный показатель для языка не может
выразить ситуацию «эта функция выпущена без перевода» — целая функция может появиться в новой локали без какого-либо
текста и вообще не изменить этот показатель.

Инцидент, который она предотвращает: на этапе 3 Orchestration Canvas одиннадцать ключей были переведены на
42 локали, существовавшие на тот момент. Несколько часов спустя пакет языков ЕС (#13044) увеличил число локалей в репозитории
до 51, а девять новых локалей (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) так и не
получили эти ключи. `deepMergeFallback` подставляет английский текст вместо отсутствующего ключа, поэтому результатом был
непереведённый, а не пустой интерфейс — реальная проблема, по своей природе остававшаяся незаметной.

Как и соседняя проверка, она **учитывает различия**, сравнивая английский текст в точке слияния базовых веток с рабочим
деревом, поэтому существовавшие ранее пробелы остаются зафиксированными, и для включения проверки миграция не потребовалась.

**Маркер `__MISSING__:<english>` не удовлетворяет этой проверке (с 2026-09-17).** Ранее это был
документированный способ отложить перевод — во время выполнения вместо него подставляется корректный английский текст, — пока восемь PR с функциями от
2026-09-16 не добавили 61 ключ и не проставили этот маркер во всех 65 локалях вместо перевода: данная
проверка приняла каждый из них, ничто не заблокировало PR, а затем блокирующая проверка доли реальных переводов
завершилась с ошибкой на вершине релизной ветки для всех (pt-BR 3,2 % > 2,5 % + 0,5). Теперь маркер считается
отсутствующим переводом. Чтобы исправить ошибку, выполните
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` либо
обработайте все локали параллельно с помощью `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
безопасно для отсоединённого режима, отказывается запускаться без переменных окружения `OMNIROUTE_TRANSLATION_*`). Ключ, который должен оставаться
на английском языке (закреплённое название продукта, движка или флага), следует помещать в `scripts/i18n/untranslatable-keys.json`,
а не скрывать за маркером. `vi` полностью запрещает маркеры (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — проверка отложенных тестов

Файл в списке `exclude` конфигурации `vitest.config.ts` — это тест, который не запускается, хотя для тех, кто просматривает
дерево, он выглядит как часть покрытия. За комментарием
`// #8618 — pre-existing failure; remove this exclusion when fixed` накопилось шестьдесят два файла. Задача #8618 была закрыта
2026-08-11, в то время как отслеживаемый ею список вырос с 45 до 62 записей, каждая новая запись наследовала комментарий,
ссылавшийся на уже закрытую задачу. Когда список наконец проверили файл за файлом (#13204), **51 из 62 файлов
успешно прошёл тестирование на текущем дереве без каких-либо изменений исходного кода**.

Проверка требует, чтобы каждое исключение, соответствующее реальному файлу, (a) указывало отслеживающую задачу и
(b) присутствовало в `config/quality/vitest-exclusions.json` с измеренным статусом, чтобы добавление исключения
представляло собой проверяемое изменение в отдельном файле, а не ещё одну строку в массиве из 60 записей. Она намеренно
не запускает исключённые тесты повторно — это занимает около 10 минут и должно выполняться периодическим заданием;
в реестре фиксируется дата последней проверки каждого из них.
