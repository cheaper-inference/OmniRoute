# Quality Gates Reference (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Този документ е авторитетният справочник за всички контроли за качество в CI на OmniRoute.
Той описва всяка контрола, какво валидира, в коя CI задача се изпълнява, дали използва
базова линия с храпов механизъм или политика за успешно/неуспешно преминаване и дали блокира компилацията, или е само препоръчителна.

За кратко обобщение и политиката за списъка с разрешения вижте раздела „Quality Gates & Ratchets“
в `AGENTS.md`. За критичната оценка, класификацията на зрелостта и независимия от конкретни инструменти
план за възпроизвеждане на същата система вижте
[Наръчника за контроли за качество](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Инвентаризация на гейтовете и профили за изпълнение

### Допускане на кандидати

Работните потоци CI и Quality Gates издават стабилна присъда: `Gate / CI` и
`Gate / Quality`. Тяхната версионирана политика за допускане изброява всяка
възходяща задача като задължителна или препоръчителна. Приложимата задължителна
задача трябва да завърши успешно: липсващи, отменени, пропуснати, чакащи и
неизвестни резултати не могат да установят PASS. Валидна класификация само за
документация или само за каталог може да направи кодовата пътека неприложима;
чернова на PR не е приет кандидат. Етикетът `hotfix` не отменя изискването за
доказателства.

И двата работни потока обхващат PR-и към клонове main/release, push-ове към
`main`, ръчно стартиране и събития merge-group. Push-ът, dispatch-ът и
merge-group изпълняват пълния подбор. Push-овете към `release/**` не ги
стартират (2026-10-18): всяка промяна вече е изпълнила матрицата в своя PR, а
обединената комбинация е задача на Release-Green (`docs/ops/RUNNER_BOX.md` →
Hosted lane). Fork-овете и merge групите използват хоствани runner-и за задачите,
които иначе избират self-hosted runner-и; достатъчният капацитет на хостваните
runner-и трябва да бъде проверен преди внедряването.

Всеки JSON отчет идентифицира SHA на checkout-а, изпълнението на работния поток и
опита. CLI отхвърля несъответствие между SHA на checkout-а и събитието.
Тестовете на работния поток обвързват членството в политиката със списъка
`needs` на задачата за присъдата, така че нова или премахната пътека да не може
тихо да изчезне. Отчетите обхващат собствения си работен поток, но не и
публикуването, внедряването или вътрешните механизми на съществуващ скенер с
препоръчителен статус. Активирането на двете имена на проверките в правилата на
клона е отделна административна промяна; добавянето на тези задачи само по себе
си не защитава клона.

### Инвентаризация на статичното сканиране

Версионираният инвентар на npm псевдонимите и членството в статичното сканиране
се намират в `config/quality/gate-manifest.json`. Изпълнете
`npm run check:gate-manifest`, за да валидирате имената на скриптовете и точните
команди спрямо `package.json`; добавяния, премахвания и отклонения в командите
провалят както локалния hook, така и задачите за класификация на промените в CI.
Псевдонимът не е задача на работен поток, екземпляр на матрица или тестов случай:
тези бройки не трябва да се представят като взаимозаменяеми.

Използвайте `npm run quality:scan -- --list` или
`npm run quality:scan:fast -- --list`, за да прегледате избраните псевдоними,
без да ги изпълнявате. Runner-ът извиква npm entrypoint-а, така че неговата
среда за изпълнение (включително Bun, когато е конфигуриран) се запазва.
Манифестът записва псевдонимите извън тези профили като извиквани отделно, а
командите за поддръжка са забранени в профилите за сканиране само за четене.

Тези профили обхващат само статичното сканиране. Те не удостоверяват продуктовите
тестове, покритието, пакетирането, външните проверки или пълното приемане на
кандидата за издание. Допускането в работния поток използва свързаните
`config/quality/admission-policy.json` и `scripts/quality/admission-verdict.mjs`.
Профилите на Release-observer остават отделни; проверявайте независимо техните
приложими проверки и отчети. Инвентаризацията в прозата по-долу е справочна, а
не доказателство, че даден гейт действително е изпълнен.

Скриптовете се намират в `scripts/check/` (гейтове на политиката) и
`scripts/quality/` (механизъм за рачет). Източникът на истината за CI е
`.github/workflows/ci.yml`.

### Бърз път за PR-и към издание (`quality.yml`)

`.github/workflows/quality.yml` допълва CI за PR-и към main/release, push-ове към
`main`, dispatch и merge групи. PR-ите използват бързи проверки, филтрирани по
път. Постоянно деактивираната дублирана компилация беше премахната; реалните
проверки за компилация/пакетиране/стартиране остават в CI.

| Задача                                           | Обхват                                                                                                                                                                                                                                   | Блокиращо                   |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `Docs Gates (fast-path)`                         | PR-и за документация/код; препратки към API документация и docs-all                                                                                                                                                                      | Да                          |
| `Fast Quality Gates`                             | PR-и за код; статични проверки, проверка на типовете, проверка на типовете на таблото, модулни тестове за засегнатите части                                                                                                              | Да                          |
| `Forgotten sibling tests`                        | PR-и за код; променени модули, проследени до статични потребители и кандидатстващи сродни тестове; пътищата с barrel и динамичен import се отчитат като диагностични данни с препоръчителен статус, с посочени изключения от allowlist-а | **Препоръчително**          |
| `Vitest (fast-path)`                             | PR-и за код; бърз набор от vitest тестове                                                                                                                                                                                                | Да                          |
| `Unit Tests fast-path`                           | PR-и за код; набор от модулни тестове с 4 шарда                                                                                                                                                                                          | Да                          |
| `No new ESLint warnings`                         | PR-и за код; lint защита, съобразена със suppressions                                                                                                                                                                                    | Да, включително за fork-ове |
| `Merge integrity (changelog + generated skills)` | PR-и, които не са чернови; синхронизация на changelog и генерираните умения                                                                                                                                                              | Да, включително за fork-ове |

#### Отчет за забравени сродни тестове

`npm run check:forgotten-sibling-tests` използва повторно резолвъра за импортиране, който стои зад картата на въздействието върху тестовете.
За всеки променен продукционен модул той отчита детерминирани вериги
`changed module/symbol -> static consumer -> candidate sibling test`, когато кандидат-тестът
липсва в diff-а на pull request-а. Обобщението в Markdown и резултатът във формат JSON се запазват като
артефакт на работния процес `forgotten-sibling-tests` за калибриране преди въвеждането на блокираща проверка.

Повторните експортирания чрез barrel файлове и динамичните импортирания служат само за диагностика на резолюцията; те никога не създават
блокиращо нарушение. Прегледаните изключения се намират в
`config/quality/forgotten-sibling-allowlist.json`. Всеки запис трябва да посочва потребителя и кандидат-теста,
да съдържа конкретна обосновка и да препраща към GitHub issue или pull request. Невалидно форматираните записи водят до отказ по подразбиране. Изключенията не могат да потиснат изтрит кандидат-тест или diff, който добавя `.skip`/`.todo`;
отслабването на твърденията и други начини за прикриване остават отговорност на независимо блокиращата проверка
`check:test-masking`.

### Задача: `lint`

Изпълнява се при всеки PR към `main`. Блокира сливането при неуспех.

| Скрипт (`npm run ...`)            | Проверява                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Блокиращо                                      |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `check:node-runtime`              | Версията на Node.js е в поддържания диапазон                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Да                                             |
| `check:cycles`                    | Циклични импорти в `src/` + `open-sse/` (на базата на AST, с разрешени `paths` от tsconfig). Самостоятелното изпълнение завършва с код 1, когато съществува поне един цикъл (fail-closed след #15281), и показва SCC-тата. `check:cycles:ratchet` (изпълнява се от CI) блокира, когато броят надвиши ограничението `metrics.cycles` в `quality-baseline.json` — в момента 14, `direction: down`, така че може само да намалява (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Да (ratchet)                                   |
| `check:boundary`                  | Свързаност `open-sse → src`: уникални импорти файл-към-файл от engine към приложението (`scripts/quality/measure-boundary.mjs`; списъкът с връзки е неизпълненият списък за отстраняване при разделянето на v4 core/module). Самостоятелното изпълнение генерира консултативен отчет (същото като `quality:boundary`). `check:boundary:ratchet` (изпълнява се от CI, също и в ratchet цикъла на бързите проверки в `quality.yml`) блокира, когато броят надвиши ограничението `metrics.boundaryOpenSseToSrc` в `quality-baseline.json` — зададено първоначално на измерените 771, `direction: down`; `--update` може само да го намалява; спрямо базата при PR (`--base-ref`, вижте по-долу)                                                                                                                                                                                                                                                                                                                      | Да (ratchet)                                   |
| `check:route-validation:t06`      | Zod схеми, налични във всички маршрути (политика за Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Да                                             |
| `check:any-budget:t11`            | Броят на `@ts-expect-error // any` не надвишава бюджета (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Да                                             |
| `check:provider-consistency`      | Всеки доставчик в `providers.ts` има съответстващ запис в `providerRegistry.ts` (и обратно, в рамките на списъка с разрешени стойности)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Да                                             |
| `check:model-lifecycle`           | Трите таблици за маршрутизация, поддържани ръчно, остават съгласувани с наличната моментна снимка на жизнения цикъл (#11503): `FITNESS_TABLE` (`taskFitness.ts`) не оценява изведен от употреба идентификатор, който `REGISTRY` може да маршрутизира; всяка цел на `BUILT_IN_ALIASES` присъства в `REGISTRY` и отсъства от моментната снимка на изведените от употреба идентификатори; всеки изведен от употреба идентификатор, който все още е в `REGISTRY`, се препраща или е посочен в `allowedRetiredInCatalog`; и нито един източник или цел на `DEFAULT_DEGRADATION_MAP` не е отбелязан като изведен от употреба в тази моментна снимка. Това не доказва, че даден модел в момента се обслужва от активен upstream. Работи офлайн — сравнява с `config/quality/model-lifecycle.json`, обновяван ръчно с `npm run quality:refresh-model-lifecycle` (изисква мрежа; не е включено в CI). `allowedRetiredInCatalog` е механизъм за постепенно намаляване на списъка: добавяйте запис само с проследяващ issue. | Да                                             |
| `check:fetch-targets`             | Всеки `fetch("/api/...")` в клиентската част на `src/` се разрешава до реален `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Да                                             |
| `check:deps`                      | Всички зависимости, които могат да бъдат инсталирани с `npm install`, във всеки `package.json` в хранилището присъстват в `dependency-allowlist.json`; сигнализират се нови непиннати или slopsquatted пакети                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Да                                             |
| `audit:deps`                      | `npm audit` (root + electron) — няма предупреждения с висока или критична степен (припокрива се с `check:vuln-ratchet` на osv; вижте Backlog за рационализация)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Да                                             |
| `check:lockfile`                  | Целостност на `package-lock.json` — HTTPS регистър, хешове за целостност, без замествания на хостове                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Да                                             |
| `check:licenses`                  | Списък с разрешени SPDX лицензи за производствени зависимости                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Да                                             |
| `check:tracked-artifacts`         | Без артефакти от компилация / записани symlink-ове към `node_modules` (изпълнява се и в husky pre-commit; pre-push умишлено е ограничен — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Да                                             |
| `check:ai-attribution`            | Без AI/bot трейлър `Co-Authored-By` или футър за генериране от AI в commit-ите на PR, заглавието или съдържанието — Твърдо правило #16 (в цикъла fast-gates на `quality.yml` за PR→`release/**` — прочита payload-а на събитието, не прави нищо извън PR — и отделна стъпка само за PR в lint на `ci.yml` за PR→`main`; също и в husky hook-а `commit-msg`; човешки съавтори са разрешени; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:vitest-exclusions`         | Всяко изключение на Vitest посочва issue за проследяване и присъства в `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Да                                             |
| `check:file-size`                 | Изходните файлове (`.ts`/`.tsx` в `src/`, `open-sse/`, `electron/`, `bin/`) остават в рамките на `cap`, а тестовите файлове (`*.test.ts(x)`) — в рамките на `testCap`; файловете, замразени във `file-size-baseline.json` (`frozen` / `testFrozen`), не трябва да надвишават записания си размер                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Да                                             |
| `check:error-helper`              | Error responses in executors/handlers use `buildErrorBody()` / `sanitizeErrorMessage()` (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Да                                             |
| `check:migration-numbering`       | Migration SQL files are sequentially numbered, no gaps or duplicates                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Да                                             |
| `check:public-creds`              | No literal OAuth `client_id`/`client_secret` or Firebase Web keys outside `publicCreds.ts` (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Да                                             |
| `check:db-rules`                  | No raw SQL outside `src/lib/db/` modules; no barrel-imports from `localDb.ts` (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Да                                             |
| `check:known-symbols`             | Provider executors, routing strategies, and translators registered in their dispatch tables match the files on disk — no orphaned or undeclared symbols                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Да                                             |
| `check:route-guard-membership`    | Every route that spawns a child process is classified by `isLocalOnlyPath()` (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Да                                             |
| `check:test-discovery`            | Всеки файл `*.test.ts` / `*.spec.ts` в хранилището се събира от поне един тестов изпълнител (ratchet: списъкът с изолирани файлове в `test-discovery-baseline.json` може само да намалява)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Да                                             |
| `check:test-tla-order`            | Никой файл на `node:test` в `tests/unit` не регистрира тест, не достига до `await` на най-високо ниво и след това не регистрира още тестове (#18045; ratchet: `test-tla-order-allowlist.json` може само да намалява)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Да                                             |
| `check:agent-skills-sync`         | Генерираните артефакти на уменията на агентите съвпадат с изходния им каталог (няма разминаване)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:provider-asset-provenance` | Логата/ресурсите на доставчиците имат запис за произход                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `lint:json`                       | Конфигурационните JSON файлове се анализират и отговарят на правилата за lint на хранилището                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `typecheck:core`                  | Компилиране на TypeScript без грешки (само предупредителни съобщения)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Да                                             |
| `typecheck:noimplicit:core`       | Строг `noImplicitAny` — ориентирано към бъдещето; много от съществуващите извиквания все още се нуждаят от анотации                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | **Препоръчително** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, ограничен до `src/app/(dashboard)/**` (#7033) — подбраният списък от 27 файла на `typecheck:core` не включва нито един dashboard TSX файл, а `next build` също никога не проверява типовете му (`next.config.mjs` задава `ignoreBuildErrors: true`), така че регресиите с осиротели идентификатори там (#6625/#6909) оставаха невидими за CI. Разликите се сравняват със замразена базова стойност за броя по файл и по TS код (`config/quality/dashboard-typecheck-baseline.json`, същият модел на остаряло прилагане като при `check:known-symbols`) — само НОВИ грешки над базовия брой провалят проверката; намалете броя с `--update`, когато съществуваща грешка бъде отстранена.                                                                                                                                                                                                                                                                                                                    | Да                                             |

### Задача: `quality-gate`

Изпълнява се след `test-coverage`. Блокира сливането при неуспех.

| Скрипт                       | Проверява                                                                                                                                                                                                           | Блокираща            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `quality:collect`            | Извежда `quality-metrics.json` (брой предупреждения на ESLint, покритие от обединения отчет на shard-овете)                                                                                                         | Да (преди ratchet-а) |
| `quality:ratchet`            | Всеки показател в `quality-baseline.json` не е регресирал (предупрежденията на ESLint ≤ базовата стойност; покритието ≥ базовата стойност)                                                                          | Да                   |
| `check:duplication`          | Дублирането на код (jscpd@4) не надвишава базовата стойност в `quality-baseline.json`                                                                                                                               | Да                   |
| `check:complexity`           | Цикломатичната сложност на ниво файл не надвишава ограничението (основните правила за `complexity` + `max-lines-per-function` на ESLint)                                                                            | Да                   |
| `check:cognitive-complexity` | Ratchet за когнитивната сложност (`eslint-plugin-sonarjs`) — отделно изпълнение на ESLint; CI изпълнява и двете проверки, обединени в една стъпка `check:complexity-ratchets`                                       | Да                   |
| `check:dead-code`            | Ratchet за неизползвани експорти / файлове (knip) не регресира спрямо базовата стойност                                                                                                                             | Да                   |
| `check:compression-budget`   | Бюджет за сравнителен тест на компресирането — минималните стойности за спестени токени за всеки engine не трябва да регресират                                                                                     | Да                   |
| `check:type-coverage`        | Ratchet за процента типизиран код (`type-coverage`) не регресира; до голяма степен обхваща `typecheck:noimplicit:core`                                                                                              | Да                   |
| `check:codeql-ratchet`       | Броят на отворените сигнали на CodeQL не регресира (чете чрез `gh api`; при липса на token пропуска проверката без грешка) — вижте „Ratchet на CodeQL“ по-долу за периодичността на обновяване и ръчното стартиране | Да                   |

### Задача: `quality-extended`

Цялата задача е само информативна (`continue-on-error: true`). Ratchet проверките, базирани на npm, се изпълняват реално; външните скенери се инсталират чрез `gh release download` и пропускат изпълнението (изход 0), когато даден бинарен файл все още липсва.

| Скрипт                   | Проверява                                                                                                                                                                                                                                        | Блокираща                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| `check:circular-deps`    | Няма циклични зависимости (dpdm)                                                                                                                                                                                                                 | **Само информативна**                                          |
| `check:bundle-size`      | Размерът на bundle-а не надвишава ограничението                                                                                                                                                                                                  | **Само информативна**                                          |
| `check:secrets`          | Сканиране за секрети (gitleaks) — пропуска проверката, ако бинарният файл липсва                                                                                                                                                                 | **Само информативна**                                          |
| `check:vuln-ratchet`     | Уязвимостите в зависимостите (osv-scanner) не регресират — пропуска проверката, ако бинарният файл липсва                                                                                                                                        | **Само информативна**                                          |
| `check:workflows`        | Линтване на workflow-ите (actionlint + zizmor); липсващи/повредени скенери, невалидни отчети или липсваща базова стойност за ratchet-а водят до неуспех като INCOMPLETE. Валидните находки следват избраната политика за strict/advisory/ratchet | Изпълнението е задължително; ratchet-ът на zizmor блокира в CI |
| `check:openapi-breaking` | Несъвместими промени в публичния API договор (`openapi.yaml`) спрямо базовия клон (oasdiff) — извежда `openapiBreaking=N`; пропуска проверката, ако oasdiff липсва или базовата спецификация не може да бъде разрешена                           | **Само информативна**                                          |

### Задача: `docs-sync-strict`

Изпълнява се при всеки PR към `main`. Блокира сливането при неуспех.

| Скрипт                         | Валидира                                                                                                                                                                                               | Блокира                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `check:docs-all`               | Мета-гейт, който последователно изпълнява 6-те подгейта по-долу                                                                                                                                        | Да                        |
| ↳ `check:docs-sync`            | Съгласуваност на версиите в CHANGELOG / OpenAPI / llm.txt                                                                                                                                              | Да                        |
| ↳ `check:docs-counts`          | Броевете в прозата (брой доставчици, брой миграции и т.н.) са в рамките на прозореца на рачетърите спрямо реалните броеве                                                                              | Да                        |
| ↳ `check:env-doc-sync`         | Всяка променлива на средата в `.env.example` е документирана в таблица на документацията и обратно                                                                                                     | Да                        |
| ↳ `check:deprecated-versions`  | В документацията няма низове за остарели версии                                                                                                                                                        | Да                        |
| ↳ `check:doc-links`            | Вътрешните markdown връзки в документацията сочат към реални файлове (формат `[text]`/`(path)`)                                                                                                        | Да                        |
| ↳ `check:fabricated-docs`      | Посочените в документацията маршрути, променливи на средата, CLI команди, имена на hook-ове и файлови пътища съществуват в кодовата база. Твърд гейт чрез `--strict`; без флага се отчита мек неуспех. | Да (чрез `--strict` в CI) |
| `check:cli-i18n`               | Низовете на CLI командите присъстват във всички i18n локализационни файлове                                                                                                                            | Да                        |
| `check:openapi-coverage`       | OpenAPI спецификацията покрива поне минимален праг на реалните маршрути, определен от рачетъра                                                                                                         | Да                        |
| `check:openapi-security-tiers` | Анотациите за нивата на сигурност в `openapi.yaml` са съгласувани с класификациите в `routeGuard.ts`                                                                                                   | **Само информативно**     |
| `check:openapi-routes`         | Всеки път в `openapi.yaml` съответства на реален `route.ts` (защита от халюцинации)                                                                                                                    | Да                        |
| `check:docs-symbols`           | Всяка препратка `/api/...` в `docs/**/*.md` съответства на реален `route.ts` (защита от халюцинации)                                                                                                   | Да                        |
| `i18n translation drift`       | Непреведени ключове в i18n локализационните файлове — само предупреждение                                                                                                                              | **Само информативно**     |

Дванадесетте README SVG файла в `docs/diagrams/` се генерират автоматично (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` регенерира всички тях). Всеки има модулен тест за сравнение на байтове
(`tests/unit/docs/readme-*-svg.test.ts`, задача `test-unit`), който се проваля, когато записаният файл е остарял, а `check:docs-counts` прочита каноничните числа от техните `<text>` възли — затова стъпката за очертаване оставя всеки очертан низ във файла като невидим `<text>`. Проверката за канонични числа в SVG прочита файловете, изброени в
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, както и `public/images/tier-flow-dark.svg` и `tier-flow-light.svg`;
твърденията за безплатност завинаги, записи в каталога, повтарящ се пул и фактори за оценяване също четат
`promise-pillars.svg`, `free-tier-budget.svg` и `strategies-grid.svg`. `free-tier-budget.svg`
извлича числата си от активния loader на каталога, така че промяна в `FREE_MODEL_BUDGETS` или в показваното име на доставчик проваля CI, докато този файл не бъде регенериран.

### Задача: `i18n-ui-coverage`

| Скрипт                            | Валидира                                                                                                                                                                                                                                   | Блокира               |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| `check-ui-keys-coverage` (inline) | Покритието на UI i18n ключовете е ≥ 65%                                                                                                                                                                                                    | Да                    |
| `check-ui-value-drift` (inline)   | Пренаписана английска **стойност** не оставя стара версия на превода                                                                                                                                                                       | Да                    |
| `check-new-key-coverage` (inline) | **Нов** английски ключ е преведен във всяка локализация — маркер `__MISSING__:` се отхвърля                                                                                                                                                | Да                    |
| `check-translation-ratio`         | Съотношението на реалните преводи за всяка локализация (идентични с английския / заместители / липсващи, извън списъка с разрешени случаи) не трябва да надвишава `config/quality/i18n-translation-baseline.json` + допустимото отклонение | **Само информативно** |

Изисква `fetch-depth: 0` — гейтът за разминаване на стойностите сравнява `en.json` с базата за сливане.

#### `check-ui-value-drift` — гейт за остарели преводи

Улавя единствената регресия в i18n, която останалите проверки не могат да открият структурно: стойност на английски е
презаписана, а преводите, извлечени от _предишния_ английски текст, остават непроменени, така че
потребителите, които не използват английски, продължават да четат уверено формулиран, но вече неправилен текст.

Това наистина беше пуснато в продукция. `oauthModal.googleOAuthWarning` беше пренаписан, когато беше добавен помощникът за
влизане на Antigravity (#5203); **39 от 43 локализации** запазиха текст, който казва на операторите да „копират
пълния URL адрес и да го поставят по-долу“ — поток, който не може да завърши за този доставчик. Остана незабелязано до #8463, защото:

- `sync-ui-keys` попълва обратно само ключове, които **липсват**, но никога такива, които са **остарели**;
- `check-ui-keys-coverage` отчита наличието на ключа, така че остарял превод се счита за покрит;
- `check-translation-drift` следи документационните огледала `docs/i18n/<locale>/**.md` —
  никога не чете `src/i18n/messages/*.json`. Блокиращо в job `docs-sync-strict` след повторната синхронизация през
  2026-09: редактирайте основен документ → `npm run i18n:run -- --files=<doc>` (на ниво секция, евтино).

**Съобразено с промените, а не базирано на baseline.** Сравнява `en.json` в базата на сливането с
работното дърво; за всеки ключ, чиято английска стойност е променена, всяка локализация, която все още съдържа
непроменен превод, се счита за остаряла. Това умишлено **замразява съществуващия дълг** — diff не може да разкрие от кой стар
английски текст произлиза дългогодишен превод, затова проверката оценява само това, до което текущата промяна се отнася. Алтернативата
(хешов baseline за всеки ключ) би струвала генериран файл от около 600 KB, 3× по-голям от най-големия съществуващ baseline, и би
се променяла при всеки i18n PR.

Има два начина да изпълните изискването:

1. актуализирайте засегнатите преводи, или
2. задайте им `__MISSING__:<new english>` — runtime-ът след това ще подава коригирания английски текст
   (`src/i18n/request.ts::deepMergeFallback`, #7258), а ключът ще бъде поставен на опашка за превод.

Ако **смисълът** на низа се е променил, предпочитайте **преименуването на ключа**: нов ключ не може да наследи
остарял превод. Това е подходът, използван в #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Завършва с код 0 и `SKIP reason=base-unresolved`, когато базовият каталог не може да бъде прочетен (повърхностен
clone без базовия ref), по аналогия с `check-openapi-breaking`.

### Job: `i18n`

Пълна матрица за валидиране на i18n (един job за всяка локализация). Целият job е информативен.

| Скрипт                          | Валидира                                | Блокиращо                                                 |
| ------------------------------- | --------------------------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | Пълнота на превода за всяка локализация | **Информативно** (`continue-on-error: true` за целия job) |

### Job: `pr-test-policy`

Изпълнява се само при pull request-и.

| Скрипт                 | Валидира                                                                                                                                              | Блокиращо |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PR-ове, които променят production код в `src/`, `open-sse/`, `electron/` или `bin/`, трябва да включват или актуализират тестове (Hard Rule #8)       | Да        |
| `check:test-masking`   | Променените тестови файлове не намаляват нетния брой assert-и и не добавят тавтологии `assert.ok(true)`                                               | Да        |
| `check:pr-evidence`    | Тялото на PR-а посочва доказателства от тестове/VPS за промяната (механизира Hard Rule #18 чрез търсене в текста на PR-а — нестабилно, вижте Backlog) | Да        |

### Job: `test-vitest`

Изпълнява се след `build`. Блокира сливането при неуспех.

| Набор            | Валидира                                                       | Блокиращо                                                                                                         |
| ---------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP сървър (110 инструмента), autoCombo, cache — vitest runner | Да                                                                                                                |
| `test:vitest:ui` | Тестове на UI компоненти — vitest runner                       | **Блокиращо** — съществуващите неуспехи са изрично изключени в `vitest.config.ts`; новите неуспехи провалят job-а |

### Нощни workflow-и (по график, информативни)

Те се изпълняват по cron график (и чрез `workflow_dispatch`), никога при PR-ове. Всички са информативни.

| Workflow               | Валидира                                                                                                                                                                    | Блокиращо          |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `nightly-property`     | тестове на свойства с `fast-check` с произволен seed + голям брой изпълнения                                                                                                | **Препоръчително** |
| `nightly-resilience`   | ограничение за нарастване на heap-а, инжектиране на хаотични повреди, тестове за натоварване/продължителност с k6                                                           | **Препоръчително** |
| `nightly-llm-security` | защита от инжектиране с promptfoo (режим на блокиране) + сонди с garak (пропуска се без secret за доставчика)                                                               | **Препоръчително** |
| `nightly-schemathesis` | fuzz тестване на OpenAPI договора (schemathesis) срещу работещ OmniRoute с `docs/openapi.yaml` — открива нарушения на спецификацията / необработени 500 грешки (Фаза 8 B.4) | **Препоръчително** |
| `nightly-mutation`     | резултат от mutation testing със Stryker за бързия модулен lane — оцелелите мутанти показват слаби проверки                                                                 | **Препоръчително** |
| `nightly-compat`       | матрица за съвместимост на Node engine между поддържаните диапазони на `engines.node`                                                                                       | **Препоръчително** |

Базовите показатели за производителност (heap, TTFB, време за build) се записват, но не са блокиращи: вижте [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Фаза на ускорена разработка (2026-08-30 → v4.0 LTS): всяка базова граница е разхлабена с 20%

Решение на отговорника (2026-08-30): до модуларизацията във v4.0 скоростта на доставяне е по-важна
от ограничаването на техническия дълг. Всяка **числова** базова граница на ограничителите беше разхлабена с 20% чрез една
подлежаща на одит операция, а фазата е декларирана в `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Какво се промени                                                                                                                                                                                                                              | Къде                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — бройките, при които по-ниското е по-добро, ×1.2; процентите, при които по-високото е по-добро, ÷1.2 (минималното покритие 60 е запазено, `eslintErrors` остава 0, `eslintWarnings` 0 → 20% от фиксирания брой потискания) | `quality-baseline.json` (бележката `_relax_velocity_2026_08_30` изброява всяка стойност преди → след)  |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                              | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, ограничението за брой редове за всеки `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                    | `file-size-baseline.json`                                                                              |
| бройките за отделен файл / отделен TS код ×1.2                                                                                                                                                                                                | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                           | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` става препоръчителен, докато `_policy.requireTighten === false`                                                                                                                                                           | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| нощната задача `bank-ratchet-shrinks` е поставена на пауза (тя би запазила измереното свиване и би премахнала свободния резерв)                                                                                                               | `.github/workflows/nightly-release-green.yml`                                                          |

Списъците с разрешения (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **не** са бюджети и не бяха променени. Контролните механизми с политика за успешно/неуспешно преминаване (тайни, SQL правила,
договор между документацията и средата, съответствие на i18n, модулни тестове) остават непроменени — неуспешният тест продължава да бъде неуспешен тест.

**Инструменти**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — еднократното
  разхлабване (`scripts/quality/relax-baselines.mjs`); отказва да се изпълни два пъти с една и съща бележка.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  измерва всяко числово ограничение по същия начин като CI и извежда оставащия резерв за всяко ограничение
  (`scripts/quality/baseline-headroom.mjs`). Нощната задача `baseline-headroom` публикува
  таблицата в обобщението на изпълнението на работния процес и качва своя JSON/Markdown отчет като
  `baseline-headroom-<run_id>`, съхраняван за 90 дни. Предупредителните и критичните редове обозначават ограничения,
  които са в рамките на 10% от своя максимум или вече са го надвишили. Преглеждайте тези отчети като ранно предупреждение за
  изчерпване на бюджетите; проверявайте бележките `_rebaseline_*` на съответното ограничение. Задачата вече
  не създава и не актуализира постоянен проблем; #12149 съхранява предишната история на отчетите.

**Режим за нов код (Clean-as-You-Code) — от 2026-08-30, само за бързия път на PR**

При събития `pull_request` `quality.yml` подава `--base-ref <PR base SHA>` към `check:file-size`,
`check:complexity-ratchets` и `check:dead-code`. За `check:complexity-ratchets` и
`check:dead-code` ограничението сравнява HEAD с общата базова ревизия, **ограничено до файловете, които PR
е променил** (`scripts/check/newCodeMode.mjs`: общата базова ревизия се материализира във временна
`git worktree`, ESLint/knip се изпълняват там и върху HEAD, а бройките за отделните файлове се сравняват):

- **блокиращо** — PR е добавил нарушения на цикломатичната/когнитивната сложност или мъртви експорти във файловете, които е променил
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` в дневника);
- **препоръчително** — глобалната обща стойност спрямо фиксираната базова стойност. Наследеното отклонение никога не прави
  невинен PR неуспешен; отклонението се фиксира отново при съгласуването за издание и се наблюдава от задачата за свободния резерв.

`check:file-size` използва базовата референция според собствените си правила (`scripts/check/check-file-size.mjs`, #8522):
проверява всеки файл с изходен код и всеки тестов файл в дървото, прочита броя редове на всеки от тях в базата на PR
чрез `git show` и отбелязва даден файл като неуспешен само когато той нарасне над по-голямата стойност измежду базовия си таван
(`frozen` / `testFrozen` или `cap` / `testCap` за файл извън базовата стойност) и размера си в базата.
Следователно файл, който вече се е отклонил в базата, никога не прави невинен PR неуспешен.

`check:boundary:ratchet` прилага същото правило към своето единствено число
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): при PR събития както бързите
проверки в `quality.yml`, така и lint задачата в `ci.yml` подават базовия SHA на PR, базовият commit се
измерва от експорт чрез `git archive`, а PR се проваля само когато броят на връзките `open-sse → src`
надвишава по-голямата от стойността на `metrics.boundaryOpenSseToSrc` и броя в базата. Отклонение
на базата над тавана се отчита (`base drift herdado`), но никога не проваля невинен PR; push → main
запазва абсолютния таван, а базов SHA, който не може да бъде разрешен, се връща към него с предупреждение.

Изпълненията чрез `workflow_dispatch`, финалната проверка за успешно издание и нощната задача за резерв нямат PR база
и запазват абсолютното (глобално) сравнение. Покритието, дублирането и типовото покритие засега остават глобални
(техните инструменти не създават евтино diff по файлове) — те са кандидати за същия подход.

**Завършване на фазата при v4.0 (LTS = по-строго от преди, а не „обратно към нормалното“)**

1. Върху чистия връх на `release/v4.0.0`: `npm run quality:headroom --json` за протокола, след това
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, както и
   `--update` за всяка typecheck проверка — всяка базова стойност се понижава до измерената стойност.
2. Изтрийте `_policy` от `quality-baseline.json` (активира отново `--require-tighten` и нощното
   натрупване на резерв), възстановете `THRESHOLD = 36` (или по-висока стойност) в `check-openapi-coverage.mjs`.
3. Затегнете ограниченията отвъд измереното там, където модуларизацията е дала резултат: върнете `cap` за размера на файловете на 1000
   (или 800), повишете минималните прагове за покритие с 5, задайте 0 неизползвани експорта за модуларизираните пакети.

## Базова линия с храпов механизъм (`quality-baseline.json`)

Механизмът с храпов принцип (`scripts/quality/check-quality-ratchet.mjs`) прочита `quality-baseline.json`
и го сравнява с току-що събрания `quality-metrics.json`. Всяка метрика, която се влоши
с повече от нейния епсилон, води до неуспешно компилиране.

Текущо проследявани метрики:

| Метрика               | Посока | Значение                                          |
| --------------------- | ------ | ------------------------------------------------- |
| `eslintWarnings`      | `down` | Броят предупреждения от ESLint не трябва да расте |
| `coverage.statements` | `up`   | Покритието на операторите не трябва да спада      |
| `coverage.lines`      | `up`   | Покритието на редовете не трябва да спада         |
| `coverage.functions`  | `up`   | Покритието на функциите не трябва да спада        |
| `coverage.branches`   | `up`   | Покритието на разклоненията не трябва да спада    |

За да актуализирате базовата линия след реално подобрение:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Флагът `--update` записва текущите измерени стойности в `quality-baseline.json`.
Включете този файл в същия commit като промяната, подобрила метриката. PR, който подобрява
метрика, без да актуализира базовата линия, ще бъде засечен от `--require-tighten` (Фаза 6A.5,
предстои реализация).

### Храпов механизъм за CodeQL: честота на опресняване и ръчно задействане

`check:codeql-ratchet` прочита **състоянието на хранилището, опреснявано по график — не за всеки PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` отчита
`state: configured`, `schedule: weekly`: сканиране чрез настройката по подразбиране на GitHub, а не анализ при всяко изпращане.
Следствие: след сливане на PR, който ПОПРАВЯ предупреждения, храповият механизъм продължава да отчита
стария, по-висок брой, докато не се изпълни следващото планирано сканиране — затова отчита регресия
за всеки отворен PR, включително за последващите PR-и към самата поправка, докато сканирането не се актуализира.

**Ръчно опресняване**: `gh workflow run codeql.yml --ref release/vX.Y.Z` изпълнява анализа
отново и публикува повторно предупрежденията в рамките на минути. Първо прочетете `.github/workflows/codeql.yml`
— заглавната му част обяснява, че той е само за `workflow_dispatch`, **защото влиза в конфликт с
„настройката по подразбиране“ на GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Възстановяването на задействанията чрез `push`/`pull_request`/
`schedule` първо изисква **действие от собственик**: Settings → Code security →
CodeQL: Default → Advanced. Не добавяйте задействане `schedule:`, без да направите това превключване — то
само ще доведе до неуспешни изпълнения.

**Затегнете базовата линия, след като броят спадне** — `node scripts/check/check-codeql-ratchet.mjs
--update` записва новия измерен брой в `quality-baseline.json` →
`metrics.codeqlAlerts.value`, така че храповият механизъм да не допуска незабелязано връщане на регресията
до стария таван. Практически пример (2026-09-02/03): PR #12502 поправи 7 реални предупреждения
(13 → 6 измерени отворени); PR #12530 затегна фиксираната базова линия от 11 → 6, за да съответства; след това
останалите 6 бяха отхвърлени с индивидуална обосновка за всяко предупреждение, докато отворените станаха 0.

**Отхвърлянията са решение на оператора (Строго правило #14)** — никога не отхвърляйте предупреждение от CodeQL,
без да запишете техническата обосновка в коментара за отхвърляне: `won't fix` за
изискване на външен протокол, `used in tests` за тестова фикстура, `false positive`
за средство за пречистване на данни, което CodeQL не може да разпознае (прецедент: `docs/security/ERROR_SANITIZATION.md`).

---

## Политика за повторно изпълнение на тестове (WS5.4, v3.8.49)

Повторното изпълнение се задава за всеки runner поотделно, никога глобално за всички — глобалното повторно изпълнение превръща реалните регресии
в невидими нестабилни тестове:

| Runner           | Политика                                                                                                                                               | Защо                                                                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` само в CI, с `trace: on-first-retry`                                                                                                      | Времената на браузъра/мрежата са действително недетерминистични; едно повторно изпълнение с trace превръща нестабилността в артефакт, който може да бъде диагностициран |
| Vitest           | БЕЗ глобално повторно изпълнение. Доказано нестабилен тест получава изрично повторно изпълнение за конкретния тест (видимо в diff-а и прегледано в PR) | Поддържа списъка с карантинирани тестове в repo-то, без никога да бъде непрозрачен                                                                                      |
| node:test (unit) | НИКОГА без повторно изпълнение                                                                                                                         | Нестабилният unit тест е дефект в теста — поправете го, не го изпълнявайте отново с надеждата да мине                                                                   |

Целеви SLO след въвеждането на телеметрията за нестабилност (WS5.2/5.3): <1% честота на нестабилност за тест
(праг „поправете незабавно“), ≥95% успеваемост за pipeline. Референтни стойности за индустрията —
калибрирайте ги спрямо собствените ни измервания.

## Отклонение на ratchet-а на ниво release (WS5.5, v3.8.49)

Когато ratchet (размер на файл, сложност, предупреждения от eslint) регресира върху ЧИСТИЯ връх на release-а
— т.е. КОМБИНАЦИЯТА от merge-ове го е влошила и нито един отделен PR не възпроизвежда
регресията в собствения си branch — поправката е отговорност на **release captain, еднократно, в
release branch-а**: предпочитайте извличане/refactor; актуализирайте baseline-а само с документиран
запис с обосновка. Никога не прехвърляйте отклонение от комбинация върху PR на contributor и никога
не актуализирайте baseline-а за всеки PR поотделно (това скрива реални регресии). Първо направете разграничението: възпроизведете
червения статус спрямо чистия връх в probe worktree, преди да приемете, че вашият PR го е причинил.

## Запазване на пониженията на ratchet-а — посоката надолу (#8584)

Ratchet-ът е автоматичен само наполовина, и то в грешната половина. **Повишаването** на лимит е
ръчна редакция на JSON, която отнема десет секунди и е най-бързият начин да се отблокира червен PR.
**Понижаването** му изисква някой да изпълни `--update` и да commit-не резултата — а докато
job-ът `bank-ratchet-shrinks` не беше въведен, никой workflow не го изпълняваше. Измерените последствия
(2026-07-25): 18 замразени файла вече са на или под лимита от 800 реда за нов файл, като най-лошият
е на 132× (`src/shared/validation/schemas.ts`, 19 реда с лимит 2,523); таванът за
сложност се придвижи от `1794 → 2169` в рамките на ~37 бележки за актуализиране на baseline-а, с точно едно
понижение (−1); а „затегнете чрез `--update` в следващия цикъл“ беше написано 31 пъти и изпълнено
веднъж. Лимит, който надживява кода, заради който е бил въведен, безшумно превръща всяко завършено
разделяне в разрешение за растеж за следващия, който редактира файла.

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** затваря този цикъл:

|                  |                                                                                                                |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| Изпълнява се при | `schedule` (3×/ден) + `workflow_dispatch` — умишлено **не** при `push`                                         |
| Измерва          | най-високия `release/vX.Y.Z`, със същата резолюция + защита срещу инжектиране като `release-green`             |
| Записва          | `check:file-size --update` и `check:complexity-ratchets --update` (и двете по замисъл могат само да понижават) |
| Проверява        | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                       |
| Доставя          | един винаги актуален PR към release branch-а — принудително актуализиран, без спам                             |

Запазването се извършва пакетно, а не при всеки push, защото няма изискване за латентност (понижение,
запазено в рамките на 8 часа, е приемливо), докато изпълнение при всеки merge би изграждало многократно PR branch-а
по време на кампании за merge и би плащало цената на пълно обхождане от ESLint всеки път. Откриването остава при
push (`release-green`); само запазването се извършва пакетно.

### Проверка за безопасност

Job-ът записва в baseline-ите без надзор, затова `verify-ratchet-bank.mjs` прави
това приемливо. Той сравнява дървото след `--update` спрямо `HEAD` и **прекратява job-а,
преди да съществува какъвто и да е commit** — без да отваря PR — освен ако всяка промяна не е една от следните:

- числова стойност в `frozen` / `testFrozen`, която е **понижена** или **премахната**
- `complexity-baseline.json` → `count` е **понижена**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` е **понижена**

Всичко друго води до неуспех: повишаване на число, добавяне на запис, промяна на `cap`/`testCap` или
изтриване/пренаписване на бележка `_rebaseline_*` (тези бележки са одитната следа за причината за съществуването на всеки
таван и се съхраняват в същия обект `frozen` като записите за файловете).
Бот, който може да повишава лимит, би бил категорично по-лош от текущото положение. Защита срещу регресии:
`tests/unit/verify-ratchet-bank.test.ts`.

Job-ът никога не прави push към `release/*` — човек merge-ва PR-а, така че неправилно измерване
не може да бъде приложено без преглед.

## Политика за списъка с разрешени изключения

Всяка проверка, която не може да се провали заради вече съществуващи нарушения, използва замразен списък с разрешени изключения
(напр. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Политиката е:

**Отстранете първопричината; използвайте списъка с разрешени изключения само когато нарушението вече е съществувало и
не може да бъде отстранено в същата PR.**

Когато добавяте запис към списък с разрешени изключения:

1. Включете коментар с обосновка.
2. Посочете задачата за проследяване (напр. `// #3498 — Функционалност от фаза 2, която все още не е реализирана`).
3. Премахнете записа в същата PR, която отстранява нарушението — остарял запис, който вече
   не потиска активно нарушение, сам по себе си е дефект (проверката за остаряло прилагане 6A.3 ще
   доведе до неуспех на проверката при осиротял запис в списъка с разрешени изключения, след като бъде реализирана).

**Не** добавяйте записи в списъка с разрешени изключения, за да накарате тестовете да преминат по-бързо. Успешна проверка с нарастващ
списък с разрешени изключения създава фалшиво усещане за качество.

### Когато проверка се провали за вашата PR

1. **Прочетете внимателно изхода от проверката** — той ви казва точно кой файл или символ нарушава
   правилото.
2. **Отстранете нарушението** — повечето проверки са детерминистични проверки на файловата система, които преминават веднага щом
   кодът е коректен.
3. **Ако нарушението вече е съществувало** (т.е. не сте го въвели вие, но проверката вече
   го обхваща): добавете запис в списъка с разрешени изключения с коментар за обосновка и задача за проследяване.
4. **Ако проверката е тип ratchet** (покритие, предупреждения от ESLint, дублиране, сложност):
   вашата промяна е влошила показателя. Отстранете основния проблем или (в редки случаи) изпълнете
   `npm run quality:ratchet -- --update`, ако промяната е умишлена и влошаването на показателя
   е приемливо — но документирайте причината в описанието на PR.
5. **Препоръчителните проверки** (`continue-on-error: true`) са информативни — те не блокират
   сливането, но се показват в обобщението на CI. Въпреки това ги коригирайте.

---

## Добавяне на нова проверка

1. Създайте `scripts/check/check-<name>.mjs` (или `.ts`). Проверките за политики завършват с код 0/1.
   Проверките от тип ratchet записват показател в `quality-metrics.json` чрез `collect-metrics.mjs`.
2. Добавете `"check:<name>": "node scripts/check/check-<name>.mjs"` към `package.json`.
3. Свържете я в `.github/workflows/ci.yml` под подходящата задача
   (политика → `lint` или `docs-sync-strict`; ratchet → `quality-gate`).
4. Ако има списък с разрешени изключения, приложете `reportStaleEntries()` от
   `scripts/check/lib/allowlist.mjs`, така че остарелите записи да се откриват автоматично.
5. Напишете тест в `tests/unit/build/`, който покрива логиката за откриване на проверката.
6. Актуализирайте този документ (добавете ред към съответната таблица на задачата).

---

## Инструменти за агенти: LSP-in-the-loop (по избор)

Освен CI проверките, OmniRoute предоставя **незадължителна** заготовка `agent-lsp`
(проектен `.mcp.json`, Фаза 7, задача 15). Създайте `.mcp.json`,
за да предоставите TypeScript езиков сървър на агентите за програмиране, така че те да разрешават символи /
диагностика **преди** писането на код — допълнение към `typecheck:core` за компилиране преди заявяване на готовност,
което премахва грешките от „измислени символи“ още при източника. Умишлено
не се зарежда автоматично (вие избирате и проверявате моста MCP↔LSP); повреден запис само регистрира
грешка при свързване и никога не прекъсва сесиите.

---

## Натрупани задачи за рационализиране (преглед на ROI — Фаза 9, Вълна 3)

Този инвентар беше съпоставен с `ci.yml` на 2026-06-17 (в предходната версия бяха пропуснати
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Прегледът на ROI на съпоставения набор
идентифицира следните кандидати за рационализиране. **Обединяванията са механични промени
по CI; превключванията/премахванията са решения относно правилата, запазени за оператора.**
Нищо от посоченото по-долу все още не е приложено.

**Също недокументирани по-горе** (консултативни, със слаб сигнал): задачата `docs-lint`
(markdownlint + Vale, цялата задача е с `continue-on-error`) и самостоятелните работни процеси
за сканиране `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` присъства в
`quality-baseline.json`, но не е свързана с блокиращ ограничител в `ci.yml` — понастоящем
метриката е осиротяла.

### Обединяване / дедупликация (механично, по-нисък риск)

Всеки кандидат беше валидиран спрямо актуалното състояние на проверките на 2026-06-17
(доверявай се, но проверявай); оказа се, че няколко „очевидни“ обединявания прикриват
натрупани проблеми и **не** са директни заместители.

- **`check:docs-sync` се изпълнява два пъти** — самостоятелно в задачата `lint` и отново в `check:docs-all` (`docs-sync-strict`), както и в husky pre-commit hook. ✅ **ГОТОВО** — самостоятелното извикване в `lint` е премахнато.
- **Сканиране за CVE** — ❌ **НЕ е чисто обединяване.** `audit:deps` прекратява с грешка при всяка CVE с висока/критична тежест; `check:vuln-ratchet` (osv) се проваля само при _регресия_ спрямо базовата стойност (в момента 1 MODERATE). Семантиката е различна — премахването на `audit:deps` би премахнало абсолютната проверка за висока/критична тежест. Запазете и двете.
- **Откриване на цикли** — ✅ **ГОТОВО** (#15159 G-01/G-02). Старият текст тук наричаше `check:cycles` „зелената, курирана“ проверка и обосноваваше запазването ѝ като блокираща с това, че `check:circular-deps` (dpdm) отчита 91 цикъла. Този зелен резултат беше **фалшиво зелен**: `check:cycles` сканираше 5 поддиректории (450 файла), съпоставяше само статични `import|export … from` и отхвърляше всеки спецификатор `@/` и `@omniroute/open-sse/`, така че не можеше да види циклите с динамичен импорт и псевдоними, които преобладаваха в хранилището. Поправено: проверката вече обхожда `src` + `open-sse` (5023 файла), събира спецификатори от TypeScript AST (така `import("…")` се отчита, а `typeof import("…")` в позиция на тип — не) и разрешава `paths` от tsconfig. Тя намира **14** цикъла, а не 0. Тъй като 14-те съществуващи цикъла не могат да бъдат поправени в PR за проверката, `check:cycles` вече е **ограничител** (`--ratchet`, таван `metrics.cycles.value = 14` в `quality-baseline.json`, `direction: down`) — блокира всяка _регресия_ и броят може само да намалява. CI изпълнява `npm run check:cycles:ratchet`. Постепенното намаляване върви с **A-01**. `check:circular-deps` (dpdm) остава консултативна като по-широко второ мнение.
- **Сложност** — ✅ **ГОТОВО** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): едно обхождане с ESLint, броене по ruleId, така че базовите стойности за цикломатична сложност + максимален брой редове и когнитивна сложност да останат независими; отделните `check:complexity` / `check:cognitive-complexity` се запазват за локално `--update`.
- **Защита срещу халюцинации за `/api`** — ✅ **ГОТОВО** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): един FS инвентар на `src/app/api`, openapi-routes + docs-symbols продължават да докладват независимо; отделните проверки се запазват за локални изпълнения.
- **`check:node-runtime` се изпълнява в 11 задачи** — ⚠️ **нисък ROI.** Всяка е на отделен runner и проверката отнема <1s; общото спестяване е ~10s, за сметка на загубата на евтина защита за всяка задача. Не си струва сътресението.
- **`typecheck:noimplicit:core` в CI lint** — ✅ **премахната от задачата lint** (беше консултативна с `continue-on-error`); блокиращата повърхност за типовете е `typecheck:core` + `check:type-coverage`. Локалният скрипт е запазен.

### Превключване / решение (правила на оператора)

- `check:openapi-security-tiers` (консултативна) — ❌ **НЕ може да бъде чисто превключена.** Завършва с код 0, но предупреждава, че няколко маршрута на `traffic-inspector` под `LOCAL_ONLY_API_PREFIXES` нямат анотацията `x-loopback-only: true`. Налагането ѝ изисква първо тези анотации да бъдат добавени в `openapi.yaml`.
- `typecheck:noimplicit:core` (консултативна) — до голяма степен е покрита от блокиращия ограничител `check:type-coverage`. Превключете я към ограничител или премахнете излишното второ изпълнение на `tsc`.
- `test:vitest:ui` (вече **блокираща**) — съществуващите неуспешни тестове са изрично изключени във `vitest.config.ts` с проследяващи коментари `// #8618`; новите неуспешни тестове провалят задачата.
- `check:secrets` (gitleaks, блокиращ ограничител, фиксиран на 3 документирани фалшиво положителни резултата) — добавете трите към allowlist, за да достигне 0, или я понижете до консултативна. Припокрива се с вграденото сканиране на тайни в GitHub + `check:public-creds`.
- `check:pr-evidence` (блокираща, търси чрез grep в прозата на тялото на PR) — висок риск от фалшиво положителни резултати; премахването ѝ отслабва прилагането на Hard Rule #18, така че това е реално решение относно правилата.
- `semgrep` (самостоятелна консултативна) — припокрива се с CodeQL за категориите на OWASP; свържете базовата ѝ стойност с ограничител или я премахнете.

---

## Свързана документация

- Верига за доставки (произход, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — проверка за съответствие на наборите от ключове

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, задача `i18n-ui-coverage`).
Сравнява набора от крайни ключове на всеки `src/i18n/messages/<locale>.json` с `en.json` и завършва
с грешка при всеки липсващ или излишен краен ключ, независимо кога е бил добавен ключът. Заместващите
маркери `__MISSING__:` се считат за налични (тяхното съдържание е отговорност на проверката за съотношението).
Това е абсолютното допълнение към двете проверки, базирани на разлики/проценти: `check-ui-keys-coverage`
налага минимално покритие от 80 % за всяка локализация (43 липсващи ключа от общо ~13 000 все още дават
99,7 %), а `check-new-key-coverage` оценява само ключовете, които дадена PR заявка добавя към `en.json`.
Пакет от локализации се генерира от актуалния `en.json` в деня на създаване на неговия клон и се превежда
в продължение на дни, докато базовият клон продължава да добавя ключове; самата PR заявка на пакета не
добавя ключове, затова и двете сродни проверки останаха безмълвни, когато пакет 1 (#13044) беше слят с
43 липсващи ключа в девет локализации, а пакет 2 (#13660) — с 10 липсващи ключа в осем (2026-09-15).
Поправете неуспешната проверка с
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; краен ключ `extra`
означава, че източникът го е премахнал — изтрийте го от локализацията. `--warn` докладва, без да
причинява неуспех. `--catalog=cli` изпълнява същото сравнение върху `bin/cli/locales`
(`npm run i18n:check-keys:cli`); и двете стъпки са част от задачата `i18n-ui-coverage`.

#### `check-new-key-coverage` — i18n проверка за нови ключове

Сродна проверка на `check-ui-value-drift`. Последната открива английска стойност, която е била
**пренаписана**, докато преводите ѝ са останали непроменени; тази открива английски ключ, който е бил
**добавен**, но някои локализации никога не са го получили.

`check-ui-keys-coverage` не може да открие този тип проблем: тя налага минимален процент за всяка
локализация, а единадесет липсващи ключа от ~13 000 оставят покритието на 99,9%. Процентът за отделен
език не може да изрази „тази функционалност беше пусната без превод“ — цяла функционалност може да
попадне в нова локализация без никакъв текст, без това изобщо да промени стойността.

Инцидентът, който тя формализира: фаза 3 на Orchestration Canvas преведе своите единадесет ключа във
всичките 42 локализации, съществуващи по това време. Часове по-късно пакетът с езици на ЕС (#13044)
увеличи локализациите в хранилището до 51, а деветте нови (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`,
`sl`, `sr`) никога не ги получиха. `deepMergeFallback` замества липсващ ключ с английския текст, така
че проблемът се прояви като непреведен, а не празен потребителски интерфейс — реален проблем, който
по замисъл остана незабелязан.

Подобно на сродната си проверка, тя **взема предвид разликите**, като сравнява английския текст в
базата за сливане с работното дърво, така че вече съществуващите пропуски остават замразени и за
включването на проверката не беше необходима миграция.

**Маркерът `__MISSING__:<english>` не удовлетворява проверката (от 2026-09-17).** Преди той беше
документираният начин за отлагане — по време на изпълнение се използва резервният правилен английски
текст — докато осем PR заявки за функционалности на 2026-09-16 не добавиха 61 ключа и не поставиха
маркера във всичките 65 локализации вместо преводи: тази проверка прие всяка от тях, нищо не блокира
PR заявките, а след това блокиращата проверка за съотношението на реалните преводи се провали на върха
на клона за изданието за всички (pt-BR 3,2 % > 2,5 % + 0,5). Сега маркерът се оценява като липсващ
превод. Поправете неуспешната проверка с
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` или
всички локализации паралелно с `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
безопасен при отделен HEAD, отказва да стартира без променливите на средата `OMNIROUTE_TRANSLATION_*`).
Ключ, който трябва да остане на английски (фиксирано име на продукт/движок/флаг), трябва да бъде в
`scripts/i18n/untranslatable-keys.json`, никога зад маркер. `vi` забранява маркерите изцяло
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — проверка за временно изключени тестове

Файл в списъка `exclude` на `vitest.config.ts` е тест, който не се изпълнява, но изглежда като покритие
за всеки, който разглежда дървото. Шестдесет и два файла се натрупаха зад коментара
`// #8618 — вече съществуваща грешка; премахнете това изключване, когато бъде поправена`. Задача #8618
беше затворена на 2026-08-11, докато проследяваният от нея списък нарасна от 45 на 62 записа, като
всеки нов наследяваше коментар, сочещ към затворена задача. Когато списъкът най-накрая беше измерен
файл по файл (#13204), **51 от 62 преминаха успешно спрямо текущото дърво без никаква промяна в
изходния код**.

Проверката изисква всяко изключване, което сочи към реален файл, (a) да посочва задача за проследяване
и (b) да присъства в `config/quality/vitest-exclusions.json` с измерения си статус, така че добавянето
му да бъде разлика, подлежаща на преглед в специален файл, вместо поредния ред в масив с 60 записа.
Тя умишлено не изпълнява повторно изключените тестове — това отнема ~10 минути и принадлежи на
периодична задача; регистърът записва кога всеки от тях е бил измерен за последно.
