# Quality Gates Reference (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Овај документ је меродавна референца за све CI капије квалитета у OmniRoute-у.
Он описује сваку капију, шта она проверава, у оквиру ког CI посла се извршава, да ли користи
референтну основу са механизмом напретка или политику пролаза/пада и да ли блокира израду или је саветодавна.

За кратак резиме и политику листе дозвољених ставки погледајте одељак „Капије квалитета и механизми напретка“
у `AGENTS.md`. За критичку процену, класификацију зрелости и план репликације
истог система који не зависи од конкретних алата, погледајте
[Приручник за капије квалитета](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Инвентар гејтова и профили извршавања

### Пријем кандидата

CI и Quality Gates workflow-ови сваки за себе издају стабилан вердикт: `Gate / CI` и
`Gate / Quality`. Њихова верзионисана политика пријема набраја сваки upstream посао
као обавезан или саветодаван. Примењив обавезан посао мора да успе: недостајући,
отказани, прескочени, резултати на чекању и непознати резултати не могу да успоставе
PASS. Важећа класификација docs-only или catalog-only може учинити траку за код
непримењивом; нацрт PR није прихваћени кандидат. Ознака `hotfix` не изузима доказе.

Оба workflow-ја покривају PR-ове ка main/release гранама, push-ове на `main`, ручни
dispatch и догађаје merge групе. Push, dispatch и merge група покрећу пуну селекцију.
Push-ови на `release/**` их не покрећу (2026-10-18): свака промена је већ прошла
матрицу на свом PR-у, а спојена комбинација је посао Release-Green-а
(`docs/ops/RUNNER_BOX.md` → Hosted lane). Fork-ови и merge групе користе hosted
runner-е за послове који иначе одабиру self-hosted runner-е; довољан hosted
капацитет мора се потврдити пре увођења.

Свака JSON потврда идентификује SHA издвојен на checkout-у, покретање workflow-ја и
покушај. CLI одбија непоклапање SHA између checkout-а и догађаја. Тестови workflow-ја
везују чланство у политици за `needs` листу посла вердикта, тако да нова или уклоњена
трака не може тихо да нестане. Потврде покривају сопствени workflow, а не
објављивање, постављање нити унутрашњост постојећег саветодавног скенера.
Активирање оба имена провера у правилима гране је засебна административна измена;
додавање ових послова само по себи не штити грану.

### Инвентар статичког скенирања

Верзионисани инвентар npm алијаса и чланство у статичком скенирању налазе се у
`config/quality/gate-manifest.json`. Покрените `npm run check:gate-manifest` да бисте
потврдили имена скрипти и тачне команде у односу на `package.json`; додаци, уклањања
и одступања команди обарају и локални hook и послове класификације промена у CI-ју.
Алијас није посао workflow-ја, инстанца матрице нити тест случај: ови бројеви се не
смеју представљати као међусобно заменљиви.

Користите `npm run quality:scan -- --list` или `npm run quality:scan:fast -- --list`
да бисте прегледали изабране алијасе без њиховог извршавања. Runner позива npm улазну
тачку, тако да се њен runtime (укључујући Bun тамо где је конфигурисан) задржава.
Манифест бележи алијасе изван тих профила као посебно позиване, а команде одржавања
су забрањене у профилима скенирања само за читање.

Ови профили покривају само статичко скенирање. Они не потврђују тестове производа,
покривеност, паковање, спољне провере нити пун пријем кандидата за издање. Пријем у
workflow користи повезане `config/quality/admission-policy.json` и
`scripts/quality/admission-verdict.mjs`. Профили Release-observer-а остају засебни;
њихове примењиве провере и потврде прегледајте независно. Прозни инвентар испод је
референца, а не доказ да се гејт заиста покренуо.

Скрипте се налазе под `scripts/check/` (гејтови политике) и `scripts/quality/`
(ratchet механизам). Извор истине за CI је `.github/workflows/ci.yml`.

### Брза трака (fast-path) за PR-ове издања (`quality.yml`)

`.github/workflows/quality.yml` допуњава CI на PR-овима ка main/release, push-овима
на `main`, dispatch-у и merge групама. PR-ови користе брзе провере филтриране по
путањи. Трајно онемогућен дуплирани build је уклоњен; стварне провере
build/package/boot остају у CI-ју.

| Посао                                            | Обим                                                                                                                                                                                                             | Блокира                 |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | PR-ови документације/кода; референце API документације и docs-all                                                                                                                                                | Да                      |
| `Fast Quality Gates`                             | PR-ови кода; статичке провере, typecheck, typecheck контролне табле, погођени јединични тестови                                                                                                                  | Да                      |
| `Forgotten sibling tests`                        | PR-ови кода; измењени модули испраћени до статичких потрошача и кандидатских сродних тестова; barrel и путање динамичког увоза пријављују се као саветодавна дијагностика, са референцираним allowlist изузецима | **Саветодавно**         |
| `Vitest (fast-path)`                             | PR-ови кода; брзи vitest пакет                                                                                                                                                                                   | Да                      |
| `Unit Tests fast-path`                           | PR-ови кода; јединични пакет у 4 shard-а                                                                                                                                                                         | Да                      |
| `No new ESLint warnings`                         | PR-ови кода; lint стражар који поштује потискивања (suppressions)                                                                                                                                                | Да, укључујући fork-ове |
| `Merge integrity (changelog + generated skills)` | PR-ови који нису нацрти; синхронизација changelog-а и генерисаних вештина                                                                                                                                        | Да, укључујући fork-ове |

#### Извештај о заборављеним сродним тестовима

`npm run check:forgotten-sibling-tests` ponovo koristi import resolver koji stoji iza mape uticaja testova.
Za svaki izmenjeni produkcijski modul prijavljuje determinističke lance
`changed module/symbol -> static consumer -> candidate sibling test` kada se kandidat
za prateći test ne nalazi u diff-u pull request-a. Markdown rezime i JSON rezultat se zadržavaju kao
`forgotten-sibling-tests` artefakt workflow-a radi kalibracije pre bilo kakvog blokirajućeg uvođenja.

Barrel re-export-i i dinamički import-i služe samo kao dijagnostika rezolucije; oni nikada ne stvaraju
blokirajući nalaz. Pregledani izuzeci se nalaze u
`config/quality/forgotten-sibling-allowlist.json`. Svaki unos mora da navede potrošača i kandidat
testa, da pruži konkretno obrazloženje i da poveže GitHub issue ili pull request. Neispravno formirani
unosi uzrokuju odbijanje (fail closed). Izuzeci ne mogu da potisnu obrisan kandidat test ili diff koji dodaje
`.skip`/`.todo`; slabljenje tvrdnji i drugo maskiranje ostaju u nadležnosti nezavisno blokirajuće
`check:test-masking` provere.

### Posao: `lint`

Pokreće se na svakom PR-u prema grani `main`. Blokira spajanje pri neuspehu.

| Script (`npm run ...`)            | Валидира                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Блокирајуће                                 |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | Верзија Node.js је унутар подржаног опсега                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Да                                          |
| `check:cycles`                    | Циркуларни увози кроз цео `src/` + `open-sse/` (засновано на AST-у, `paths` из tsconfig-а се решавају). Самостално излази са 1 кад год постоји било који циклус (fail-closed од #15281) и наводи SCC-ове. `check:cycles:ratchet` (оно што CI покреће) блокира када број премаши горњу границу `metrics.cycles` у `quality-baseline.json` — тренутно 14, `direction: down`, тако да може само да опада (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                | Да (ratchet)                                |
| `check:boundary`                  | `open-sse → src` повезивање: јединствени увози од датотеке до датотеке из engine-а у апликацију (`scripts/quality/measure-boundary.mjs`; листа ивица је заостатак санације v4 core/module-split). Самостално = саветодавни извештај (исто као `quality:boundary`). `check:boundary:ratchet` (оно што CI покреће, такође у `quality.yml` петљи fast-gates ratchet-а) блокира када број премаши горњу границу `metrics.boundaryOpenSseToSrc` у `quality-baseline.json` — иницијализовано на измерених 771, `direction: down`; `--update` га само снижава; релативно у односу на базу на PR-овима (`--base-ref`, види испод)                                                                                                                                                                                                                                               | Да (ratchet)                                |
| `check:route-validation:t06`      | Zod шеме присутне на свим рутама (политика Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Да                                          |
| `check:any-budget:t11`            | Broj `@ts-expect-error // any` ne premašuje budžet (nivo 11 — catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                          |
| `check:provider-consistency`      | Svaki provajder u `providers.ts` ima odgovarajući unos u `providerRegistry.ts` (i obrnuto, u okviru liste dozvoljenih)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                          |
| `check:model-lifecycle`           | Tri ručno održavane tabele rutiranja ostaju usklađene sa snimkom životnog ciklusa koji je deo repozitorijuma (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ne ocenjuje nijedan povučeni id koji `REGISTRY` može da rutira; svako odredište iz `BUILT_IN_ALIASES` prisutno je u `REGISTRY` i odsutno iz snimka povučenih id-jeva; svaki povučeni id koji je i dalje u `REGISTRY` prosleđen je ili naveden u `allowedRetiredInCatalog`; i nijedan izvor niti odredište iz `DEFAULT_DEGRADATION_MAP` ne pojavljuje se kao povučen u tom snimku. Ovo ne dokazuje da model trenutno servira aktivan upstream. Van mreže — poredi se sa `config/quality/model-lifecycle.json`, koji se ručno osvežava komandom `npm run quality:refresh-model-lifecycle` (mreža; nije uključeno u CI). `allowedRetiredInCatalog` je burn-down ratchet: unos dodajte samo uz tiket za praćenje. | Da                                          |
| `check:fetch-targets`             | Svaki `fetch("/api/...")` u `src/` na strani klijenta razrešava se u stvarni `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Da                                          |
| `check:deps`                      | Sve zavisnosti koje se mogu instalirati komandom `npm install` u svakom `package.json` u repozitorijumu nalaze se u `dependency-allowlist.json`; novi paketi bez fiksirane verzije ili slopsquatting paketi se označavaju                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                          |
| `audit:deps`                      | `npm audit` (root + electron) — bez bezbednosnih upozorenja visokog/kritičnog nivoa (preklapa se sa osv `check:vuln-ratchet`; pogledajte backlog racionalizacije)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                          |
| `check:lockfile`                  | Integritet `package-lock.json` — https registar, integrity heševi, bez nadjačavanja hosta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                          |
| `check:licenses`                  | SPDX lista dozvoljenih licenci za produkcione zavisnosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Da                                          |
| `check:tracked-artifacts`         | Nema build artefakata / commitovanih `node_modules` simboličkih linkova (takođe se pokreće u husky pre-commit; pre-push je namerno lagan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                          |
| `check:ai-attribution`            | Nema AI/bot `Co-Authored-By` trailer-a niti AI-generation footer-a u PR commit-ovima, naslovu ili telu — Hard Rule #16 (u `quality.yml` fast-gates petlji za PR→`release/**` — čita event payload, no-op van PR-ova — i PR-only korak u `ci.yml` lint-u za PR→`main`; takođe husky `commit-msg` hook; ljudski koautori dozvoljeni; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:vitest-exclusions`         | Svaka Vitest ekskluzija navodi tracking issue i pojavljuje se u `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                          |
| `check:file-size`                 | Izvorni fajlovi (`.ts`/`.tsx` u `src/`, `open-sse/`, `electron/`, `bin/`) ostaju u okviru `cap`, a test fajlovi (`*.test.ts(x)`) u okviru `testCap`; fajlovi zamrznuti u `file-size-baseline.json` (`frozen` / `testFrozen`) ne smeju da narastu preko zabeležene veličine                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                          |
| `check:error-helper`              | Odgovori grešaka u executorima/handlerima koriste `buildErrorBody()` / `sanitizeErrorMessage()` (Strogo pravilo #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                          |
| `check:migration-numbering`       | SQL fajlovi migracija su redno numerisani, bez praznina ili duplikata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                          |
| `check:public-creds`              | Nema doslovnih OAuth `client_id`/`client_secret` ili Firebase Web ključeva izvan `publicCreds.ts` (Strogo pravilo #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                          |
| `check:db-rules`                  | Nema sirovog SQL-a izvan modula `src/lib/db/`; nema barrel uvoza iz `localDb.ts` (Stroga pravila #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Da                                          |
| `check:known-symbols`             | Executori provajdera, strategije rutiranja i translatori registrovani u svojim dispatch tabelama odgovaraju fajlovima na disku — bez osirelih ili nedeklarisanih simbola                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Da                                          |
| `check:route-guard-membership`    | Svaka ruta koja pokreće podređeni proces klasifikovana je pomoću `isLocalOnlyPath()` (Stroga pravila #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Da                                          |
| `check:test-discovery`            | Сваки `*.test.ts` / `*.spec.ts` фајл у репозиторијуму прикупља бар један тест извршилац (ratchet: листа сирочади у `test-discovery-baseline.json` може само да се смањује)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Да                                          |
| `check:test-tla-order`            | Ниједан `node:test` фајл под `tests/unit` не сме да региструје тест, наиђе на `await` на највишем нивоу, а затим региструје још тестова (#18045; ratchet: `test-tla-order-allowlist.json` може само да се смањује)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Да                                          |
| `check:agent-skills-sync`         | Генерисани артефакти agent-skills одговарају свом изворном каталогу (без одступања)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:provider-asset-provenance` | Логотипи/асести провајдера имају забележен унос о пореклу                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `lint:json`                       | JSON конфигурациони фајлови се парсирају и задовољавају lint правила репозиторијума                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `typecheck:core`                  | TypeScript компајлирање без грешака (само саветодавна упозорења)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Да                                          |
| `typecheck:noimplicit:core`       | Строги `noImplicitAny` — усмерен ка будућности; многа постојећа места позива још увек захтевају анотације                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | **Саветодавно** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` sa obuhvatom `src/app/(dashboard)/**` (#7033) — kurirana lista dozvoljenih od 27 fajlova skripte `typecheck:core` ne uključuje nijedan dashboard TSX, a `next build` takođe nikada ne vrši proveru tipova nad njim (`next.config.mjs` postavlja `ignoreBuildErrors: true`), tako da su regresije napuštenih identifikatora tamo (#6625/#6909) bile nevidljive za CI. Poredi razlike sa zamrznutom osnovnom vrednošću broja po fajlu/po TS-kodu (`config/quality/dashboard-typecheck-baseline.json`, isti obrazac primene zastarelosti kao `check:known-symbols`) — samo NOVE greške iznad osnovnog broja ne prolaze kapiju; spustite vrednost sa `--update` kada se ispravi unapred postojeća greška.                                                                                                                                                             | Da                                          |

### Posao: `quality-gate`

Pokreće se nakon `test-coverage`. Blokira spajanje pri neuspehu.

| Skripta                      | Proverava                                                                                                                                                                   | Blokira                   |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | Generiše `quality-metrics.json` (broj ESLint upozorenja, pokrivenost iz objedinjenog izveštaja šardova)                                                                     | Da (uzvodno od ratchet-a) |
| `quality:ratchet`            | Svaka metrika u `quality-baseline.json` nije regresirala (ESLint upozorenja ≤ osnovna vrednost; pokrivenost ≥ osnovna vrednost)                                             | Da                        |
| `check:duplication`          | Duplikacija koda (jscpd@4) ne prelazi osnovnu vrednost u `quality-baseline.json`                                                                                            | Da                        |
| `check:complexity`           | Ciklomatska složenost na nivou fajla ne prelazi ograničenje (osnovni ESLint `complexity` + `max-lines-per-function`)                                                        | Da                        |
| `check:cognitive-complexity` | Ratchet kognitivne složenosti (`eslint-plugin-sonarjs`) — zaseban ESLint prolaz; CI pokreće oba objedinjena kao jedinstveni korak `check:complexity-ratchets`               | Da                        |
| `check:dead-code`            | Ratchet neiskorišćenih izvoza / fajlova (knip) ne regresira u odnosu na osnovnu vrednost                                                                                    | Da                        |
| `check:compression-budget`   | Budžet kompresije u benchmark-u — donje granice uštede tokena po engine-u ne smeju regresirati                                                                              | Da                        |
| `check:type-coverage`        | Ratchet procenta tipiziranog koda (`type-coverage`) ne regresira; u velikoj meri obuhvata `typecheck:noimplicit:core`                                                       | Da                        |
| `check:codeql-ratchet`       | Broj otvorenih CodeQL upozorenja ne regresira (čita preko `gh api`; graciozno preskače bez tokena) — učestalost osvežavanja i ručno pokretanje: vidi „CodeQL ratchet" ispod | Da                        |

### Posao: `quality-extended`

Ceo posao je savetodavan (`continue-on-error: true`). Ratchet-i zasnovani na npm-u pokreću se zaista; eksterni skeneri se instaliraju preko `gh release download` i sami sebe preskaču (exit 0) kada binarni fajl još uvek nije prisutan.

| Skripta                  | Proverava                                                                                                                                                                                                                 | Blokira                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `check:circular-deps`    | Bez cirkularnih zavisnosti (dpdm)                                                                                                                                                                                         | **Savetodavno**                                   |
| `check:bundle-size`      | Veličina bundle-a ne prelazi ograničenje                                                                                                                                                                                  | **Savetodavno**                                   |
| `check:secrets`          | Skeniranje tajni (gitleaks) — preskače ako binarni fajl nije prisutan                                                                                                                                                     | **Savetodavno**                                   |
| `check:vuln-ratchet`     | Ranjivosti zavisnosti (osv-scanner) ne regresiraju — preskače ako binarni fajl nije prisutan                                                                                                                              | **Savetodavno**                                   |
| `check:workflows`        | Lint tokova rada (actionlint + zizmor); nedostajući/pokvareni skeneri, nevažeći izveštaji ili nedostajuća osnovna vrednost ratchet-a padaju kao INCOMPLETE. Važeći nalazi prate izabranu politiku strict/advisory/ratchet | Izvršavanje obavezno; zizmor ratchet blokira u CI |
| `check:openapi-breaking` | Lomne promene javnog API ugovora (`openapi.yaml`) u odnosu na osnovnu granu (oasdiff) — emituje `openapiBreaking=N`; preskače ako oasdiff nije prisutan ili se osnovna specifikacija ne može razrešiti                    | **Savetodavno**                                   |

### Posao: `docs-sync-strict`

Pokreće se na svakom PR-u ka `main`. Blokira spajanje pri neuspehu.

| Скрипта                        | Валидира                                                                                                                                                             | Блокирајућа                |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | Мета-капија која секвенцијално покреће 6 под-капија наведених испод                                                                                                  | Да                         |
| ↳ `check:docs-sync`            | Конзистентност верзија CHANGELOG / OpenAPI / llm.txt                                                                                                                 | Да                         |
| ↳ `check:docs-counts`          | Бројеви у прози (број провајдера, број миграција, итд.) су унутар ratchet прозора стварних бројева                                                                   | Да                         |
| ↳ `check:env-doc-sync`         | Свака env променљива у `.env.example` је документована у табели документације, и обрнуто                                                                             | Да                         |
| ↳ `check:deprecated-versions`  | Нема застарелих стрингова верзија у документацији                                                                                                                    | Да                         |
| ↳ `check:doc-links`            | Интерни markdown линкови у документацији се резолвују у стварне фајлове (форма `[text]`/`(path)`)                                                                    | Да                         |
| ↳ `check:fabricated-docs`      | Руте, env променљиве, CLI команде, називи hook-ова и путање фајлова наведени у документацији постоје у коду. Тврда капија преко `--strict`; мекан неуспех без флага. | Да (преко `--strict` у CI) |
| `check:cli-i18n`               | Стрингови CLI команди су присутни у свим i18n locale фајловима                                                                                                       | Да                         |
| `check:openapi-coverage`       | OpenAPI спецификација покрива најмање ratchet-овани минимум стварних рута                                                                                            | Да                         |
| `check:openapi-security-tiers` | Анотације безбедносних нивоа у `openapi.yaml` су конзистентне са класификацијама у `routeGuard.ts`                                                                   | **Саветодавна**            |
| `check:openapi-routes`         | Свака путања у `openapi.yaml` се резолвује у стварни `route.ts` (анти-халуцинација)                                                                                  | Да                         |
| `check:docs-symbols`           | Свака `/api/...` референца у `docs/**/*.md` се резолвује у стварни `route.ts` (анти-халуцинација)                                                                    | Да                         |
| `i18n translation drift`       | Непреведени кључеви у i18n locale фајловима — само упозорење                                                                                                         | **Саветодавна**            |

Дванаест README SVG-ова под `docs/diagrams/` су генерисани (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` их све регенерише). Сваки има unit тест за поређење бајт по бајт
(`tests/unit/docs/readme-*-svg.test.ts`, посао `test-unit`) који пада када је комитовани фајл
застарео, а `check:docs-counts` чита канонске бројеве из њихових `<text>` чворова — управо зато
бројеви никада нису конвертовани у путање. Провера SVG канонских бројева чита фајлове наведене у
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, плус `public/images/tier-flow-dark.svg` и `tier-flow-light.svg`; тврдње
free-forever, catalog-entry, recurring-pool и scoring-factors такође читају
`promise-pillars.svg`, `free-tier-budget.svg` и `strategies-grid.svg`. `free-tier-budget.svg`
узима своје бројеве из живог учитавача каталога, па промена у `FREE_MODEL_BUDGETS` или у
приказаном имену провајдера чини CI црвеним све док се тај фајл не регенерише.

### Посао: `i18n-ui-coverage`

| Скрипта                           | Валидира                                                                                                                                                                              | Блокирајућа     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (inline) | Покривеност UI i18n кључева је ≥ 65%                                                                                                                                                  | Да              |
| `check-ui-value-drift` (inline)   | Преписана енглеска **вредност** не оставља за собом застарели превод                                                                                                                  | Да              |
| `check-new-key-coverage` (inline) | **Нови** енглески кључ је преведен у сваком locale-у — маркер `__MISSING__:` се одбија                                                                                                | Да              |
| `check-translation-ratio`         | Однос стварних превода по locale-у (идентични енглеском / placeholder / недостајући листови ван allowlist-е) не сме премашити `config/quality/i18n-translation-baseline.json` + slack | **Саветодавна** |

Захтева `fetch-depth: 0` — капија за дрифт вредности пореди `en.json` са merge base-ом.

#### `check-ui-value-drift` — капија за застареле преводе

Hvata jedinu i18n regresiju koju ostale kapije strukturno ne mogu da vide: engleska vrednost se prepiše, a prevodi izvedeni iz _prethodne_ engleske verzije zaostaju, pa korisnici koji ne govore engleski i dalje čitaju samouvereno formulisan, sada netačan tekst.

Ovo je stvarno isporučeno. `oauthModal.googleOAuthWarning` je prepisan kada je stigao Antigravity pomoćnik za prijavu (#5203); **39 od 43 lokaliteta** zadržalo je tekst koji operatorima kaže da „kopiraju kompletnu URL adresu i nalepe je ispod" — tok koji se za tog dobavljača ne može završiti. Ostalo je neprimećeno do #8463 jer:

- `sync-ui-keys` dopunjuje samo ključeve koji **nedostaju**, nikada one koji su **zastareli**;
- `check-ui-keys-coverage` broji _prisustvo_ ključeva, pa se zastareli prevod računa kao pokriven;
- `check-translation-drift` prati dokumentacijske kopije `docs/i18n/<locale>/**.md` — nikada ne čita `src/i18n/messages/*.json`. Blokira u poslu `docs-sync-strict` od ponovne sinhronizacije 2026-09: izmeni osnovni dokument → `npm run i18n:run -- --files=<doc>` (na nivou sekcije, jeftino).

**Zasnovano na diff-u, ne na osnovnoj liniji.** Poredi `en.json` na merge base-u sa radnim stablom; za svaki ključ čija se engleska vrednost promenila, svaki lokalitet koji i dalje drži netaknut prevod je zastareo. Ovo namerno **zamrzava postojeći dug** — diff ne može otkriti iz koje stare engleske verzije potiče odavno postojeći prevod, pa kapija ocenjuje samo ono što trenutna izmena dotiče. Alternativa (osnovna linija sa hešom po ključu) koštala bi generisani fajl od ~600 KB, 3× veći od najveće postojeće osnovne linije, uz stalne promene na svakom i18n PR-u.

Dva načina da se zadovolji:

1. ažuriraj pogođene prevode, ili
2. postavi ih na `__MISSING__:<new english>` — runtime tada servira ispravljenu englesku vrednost (`src/i18n/request.ts::deepMergeFallback`, #7258), a ključ se stavlja u red za prevođenje.

Ako se **značenje** stringa promenilo, radije **preimenuj ključ**: novi ključ ne može naslediti zastareli prevod. To je obrazac koji je koristio #8463.

```bash
npm run i18n:check-value-drift          # striktno (ono što CI pokreće)
npm run i18n:check-value-drift:warn     # samo izveštaj
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Izlazi sa 0 uz `SKIP reason=base-unresolved` kada osnovni katalog ne može da se pročita (plitki klon bez osnovnog ref-a), po ugledu na `check-openapi-breaking`.

### Posao: `i18n`

Kompletna matrica i18n validacije (jedan posao po lokalitetu). Ceo posao je savetodavan.

| Skripta                         | Proverava                         | Blokira                                                    |
| ------------------------------- | --------------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | Kompletnost prevoda po lokalitetu | **Savetodavno** (`continue-on-error: true` na celom poslu) |

### Posao: `pr-test-policy`

Pokreće se samo na pull requestovima.

| Skripta                | Proverava                                                                                                                                     | Blokira |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:pr-test-policy` | PR-ovi koji menjaju produkcijski kod u `src/`, `open-sse/`, `electron/` ili `bin/` moraju uključiti ili ažurirati testove (Strogo pravilo #8) | Da      |
| `check:test-masking`   | Izmenjeni test fajlovi ne smeju smanjiti neto broj assert-ova niti dodati `assert.ok(true)` tautologije                                       | Da      |
| `check:pr-evidence`    | Telo PR-a navodi dokaze o testovima/VPS-u za izmenu (mehanizuje Strogo pravilo #18 grep-ovanjem proze PR-a — krhko, vidi Backlog)             | Da      |

### Posao: `test-vitest`

Pokreće se nakon `build`. Blokira spajanje pri neuspehu.

| Skripta          | Proverava                                                | Blokira                                                                                                   |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 alata), autoCombo, keš — vitest pokretač | Da                                                                                                        |
| `test:vitest:ui` | Testovi UI komponenti — vitest pokretač                  | **Blokira** — postojeći neuspesi su izričito isključeni u `vitest.config.ts`; novi neuspesi obaraju posao |

### Noćni workflow-i (zakazani, savetodavni)

Ovi se pokreću po cron rasporedu (i na `workflow_dispatch`), nikada na PR-ovima. Svi su savetodavni.

| Radni tok              | Validira                                                                                                                                                                  | Blokirajuće     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | fast-check testovi svojstava sa nasumičnim seed-om + visokim brojem pokretanja                                                                                            | **Savetodavno** |
| `nightly-resilience`   | gate rasta heap-a, chaos ubrizgavanje grešaka, k6 load/soak                                                                                                               | **Savetodavno** |
| `nightly-llm-security` | promptfoo injection guard (block režim) + garak sonde (preskaču se bez secret-a provajdera)                                                                               | **Savetodavno** |
| `nightly-schemathesis` | OpenAPI contract fuzzing (schemathesis) protiv aktivne OmniRoute instance pomoću `docs/openapi.yaml` — otkriva kršenja specifikacije / neobrađene 500 greške (Faza 8 B.4) | **Savetodavno** |
| `nightly-mutation`     | Stryker score mutacionog testiranja nad brzom unit trakom — preživeli mutanti otkrivaju slabe assert-e                                                                    | **Savetodavno** |
| `nightly-compat`       | Matrica kompatibilnosti Node engine-a kroz podržane `engines.node` opsege                                                                                                 | **Savetodavno** |

Osnovne vrednosti performansi (heap, TTFB, vreme build-a) se beleže, a ne koriste kao gate: pogledajte [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Фаза брзине (2026-08-30 → v4.0 LTS): свака основна граница ублажена је за 20%

Одлука власника (2026-08-30): до модуларизације у верзији v4.0, брзина испоруке важнија је
од задржавања техничког дуга на постојећем нивоу. Свака **нумеричка** основна граница механизма постепеног пооштравања ублажена је за 20% у једном
ревидирајућем пролазу, а фаза је декларисана у `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Шта је промењено                                                                                                                                                                                                         | Где                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — бројеви код којих је ниже боље ×1.2, проценти код којих је више боље ÷1.2 (доња граница покривености 60 је задржана, `eslintErrors` остаје 0, `eslintWarnings` 0 → 20% замрзнутог броја потискивања) | `quality-baseline.json` (напомена `_relax_velocity_2026_08_30` наводи сваку вредност пре → после)      |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                         | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, ограничење броја линија за сваки `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                    | `file-size-baseline.json`                                                                              |
| бројеви по датотеци / по TS коду ×1.2                                                                                                                                                                                    | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                      | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` постаје саветодавна опција док је `_policy.requireTighten === false`                                                                                                                                 | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| ноћни `bank-ratchet-shrinks` се паузира (он би забележио измерено смањење и поништио расположиву резерву)                                                                                                                | `.github/workflows/nightly-release-green.yml`                                                          |

Листе дозвољених ставки (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **нису** буџети и нису мењане. Контролне тачке смерница са исходом пролаз/пад (тајне, SQL правила,
уговор документације/окружења, i18n паритет, јединични тестови) нису промењене — неуспешан тест и даље је неуспешан тест.

**Алати**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — једнократно
  ублажавање (`scripts/quality/relax-baselines.mjs`); одбија да се покрене двапут са истом
  напоменом.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  мери сваку нумеричку контролну тачку на исти начин као CI и исписује преосталу резерву за сваку контролну тачку
  (`scripts/quality/baseline-headroom.mjs`). Ноћни задатак `baseline-headroom` објављује
  табелу у сажетку извршавања радног тока и отпрема свој JSON/Markdown извештај као
  `baseline-headroom-<run_id>`, који се чува 90 дана. Редови са упозорењима и критични редови означавају контролне тачке
  које су унутар 10% свог ограничења или су га већ прекорачиле. Прегледајте ове извештаје као рано упозорење
  да се буџети троше; проверите напомене `_rebaseline_*` проблематичне контролне тачке. Задатак више
  не прави нити ажурира трајну пријаву проблема; #12149 чува ранију историју извештаја.

**Режим новог кода (Clean-as-You-Code) — од 2026-08-30, само брза путања за PR**

При догађајима `pull_request`, `quality.yml` прослеђује `--base-ref <PR base SHA>` командама `check:file-size`,
`check:complexity-ratchets` и `check:dead-code`. За `check:complexity-ratchets` и
`check:dead-code`, контролна тачка пореди HEAD са заједничком базом спајања **ограничено на датотеке које је PR
изменио** (`scripts/check/newCodeMode.mjs`: заједничка база спајања материјализује се у привременом
`git worktree`, ESLint/knip се покрећу тамо и на HEAD-у, а бројеви по датотеци се пореде):

- **блокирајуће** — PR је додао прекорачења цикломатске/когнитивне сложености или мртве извозе у датотекама које је изменио
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` у евиденцији);
- **саветодавно** — глобални укупан број у односу на замрзнуту основну вредност. Наслеђено одступање никада не обара
  невин PR; одступање се поново замрзава при усаглашавању издања и надгледа га задатак за праћење резерве.

`check:file-size` користи основну референцу према сопственим правилима (`scripts/check/check-file-size.mjs`, #8522):
проверава сваку изворну и тестну датотеку у стаблу, чита број линија сваке од њих у основи PR-а
помоћу `git show` и обара датотеку само када она нарасте преко веће вредности између њене основне горње границе
(`frozen` / `testFrozen`, или `cap` / `testCap` за датотеку ван основног скупа) и њене основне
величине. Датотека која је већ одступила у основи стога никада не обара невин PR.

`check:boundary:ratchet` примењује исто правило на свој једини број
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): при PR догађајима и брзе провере у
`quality.yml` и lint задатак у `ci.yml` прослеђују основни SHA PR-а, основни commit се
мери из `git archive` извоза, а PR не пролази само када његов број `open-sse → src` веза
премаши већу од вредности `metrics.boundaryOpenSseToSrc` и броја на основи. Одступање основе
изнад горње границе се пријављује (`base drift herdado`), али никада не обара недужан PR; push → main
задржава апсолутну горњу границу, а основни SHA који није могуће разрешити враћа се на њу уз упозорење.

`workflow_dispatch` покретања, завршна провера свих услова за издање и ноћни задатак за резервни простор немају PR основу
и задржавају апсолутно (глобално) поређење. Покривеност, дуплирање и покривеност типовима за сада остају глобални
(њихови алати не производе јефтино разлику по датотеци) — кандидати су за исти третман.

**Затварање фазе у v4.0 (LTS = строже него раније, а не „повратак у нормалу”)**

1. На чистом врху гране `release/v4.0.0`: `npm run quality:headroom --json` ради евиденције, затим
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, као и `--update` за сваку
   typecheck проверу — свака основна вредност се спушта на измерену вредност.
2. Обришите `_policy` из `quality-baseline.json` (поново активира `--require-tighten` и ноћно
   акумулирање), вратите `THRESHOLD = 36` (или више) у `check-openapi-coverage.mjs`.
3. Пооштрите границе испод измерених вредности тамо где се модуларизација исплатила: вратите `cap` за величину датотеке на 1000
   (или 800), повећајте минималне прагове покривености за 5, поставите број мртвих извоза на 0 за модуларизоване пакете.

## Основна вредност механизма чегртаљке (`quality-baseline.json`)

Механизам чегртаљке (`scripts/quality/check-quality-ratchet.mjs`) чита `quality-baseline.json`
и пореди га са управо прикупљеним `quality-metrics.json`. Свака метрика која назадује
више од свог епсилона доводи до неуспешне изградње.

Метрике које се тренутно прате:

| Метрика               | Смер   | Значење                               |
| --------------------- | ------ | ------------------------------------- |
| `eslintWarnings`      | `down` | Број ESLint упозорења не сме да расте |
| `coverage.statements` | `up`   | Покривеност наредби не сме да опадне  |
| `coverage.lines`      | `up`   | Покривеност линија не сме да опадне   |
| `coverage.functions`  | `up`   | Покривеност функција не сме да опадне |
| `coverage.branches`   | `up`   | Покривеност грана не сме да опадне    |

Да бисте ажурирали основну вредност након стварног побољшања:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Ознака `--update` уписује тренутно измерене вредности у `quality-baseline.json`.
Укључите ову датотеку у исти комит са изменом која је побољшала метрику. PR који побољша
метрику без ажурирања основне вредности биће откривен помоћу `--require-tighten` (Фаза 6A.5,
имплементација је у току).

### CodeQL чегртаљка: учесталост освежавања и ручно покретање

`check:codeql-ratchet` чита **стање репозиторијума које се освежава по распореду — не за сваки PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` пријављује
`state: configured`, `schedule: weekly`: GitHub скенирање са подразумеваним подешавањем, а не анализу
при сваком слању измена. Последица: након спајања PR-а који ИСПРАВЉА упозорења, чегртаљка наставља да чита
стари, већи број све док се не покрене следеће заказано скенирање — па пријављује назадовање
на сваком отвореном PR-у, укључујући и накнадне измене самог PR-а са исправком, све док скенирање не ажурира стање.

**Ручно освежавање**: `gh workflow run codeql.yml --ref release/vX.Y.Z` поново покреће
анализу и за неколико минута поново објављује упозорења. Прво прочитајте `.github/workflows/codeql.yml`
— његово заглавље објашњава да користи само `workflow_dispatch` **зато што је у сукобу са
GitHub-овим „подразумеваним подешавањем“** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Враћање окидача `push`/`pull_request`/
`schedule` најпре захтева **радњу власника**: Settings → Code security →
CodeQL: Default → Advanced. Немојте додавати окидач `schedule:` без тог пребацивања — то
ће само произвести неуспешна покретања.

**Пооштрите основну вредност након што број опадне** — `node scripts/check/check-codeql-ratchet.mjs
--update` уписује нови измерени број у `quality-baseline.json` →
`metrics.codeqlAlerts.value`, тако да чегртаљка прећутно не дозволи назадовање до
старе горње границе. Практичан пример (2026-09-02/03): PR #12502 исправио је 7 стварних упозорења
(13 → 6 измерених отворених); PR #12530 пооштрио је замрзнуту основну вредност са 11 → 6 како би се подударала; преосталих
6 упозорења је затим одбачено уз појединачна образложења, чиме је број отворених упозорења сведен на 0.

**Одбацивање је одлука оператера (Строго правило #14)** — никада немојте одбацити CodeQL упозорење
без навођења техничког образложења у коментару о одбацивању: `won't fix` за
захтев надређеног протокола, `used in tests` за тестни фикстур, `false positive`
за санитизатор који CodeQL не може да препозна (преседан: `docs/security/ERROR_SANITIZATION.md`).

---

## Политика поновног покретања тестова (WS5.4, v3.8.49)

Поновно покретање се подешава по покретачу тестова, никада као глобално правило — глобално поновно покретање претвара стварне регресије
у невидљиве нестабилности:

| Покретач              | Политика                                                                                                                                     | Зашто                                                                                                                                                       |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e)      | `retries: 1` само у CI-ју, са `trace: on-first-retry`                                                                                        | Временски односи у прегледачу/мрежи заиста су недетерминистички; једно поновно покретање са трагом претвара нестабилност у артефакт погодан за дијагностику |
| Vitest                | БЕЗ глобалног поновног покретања. Доказано нестабилан тест добија изричито поновно покретање по тесту (видљиво у разлици, прегледано у PR-у) | Задржава списак изолованих тестова у репозиторијуму, тако да никада није непрозиран                                                                         |
| node:test (јединични) | БЕЗ поновног покретања, икада                                                                                                                | Нестабилан јединични тест је грешка у тесту — исправите га, немојте га само поново покретати                                                                |

Циљни SLO-ови након што телеметрија нестабилности буде уведена (WS5.2/5.3): стопа нестабилности <1% по тесту
(праг „исправити одмах“), стопа пролазности ≥95% по цевоводу. Референтне вредности из индустрије —
поново их калибрисати на основу наших мерења.

## Одступање чегртаљке на нивоу издања (WS5.5, v3.8.49)

Када чегртаљка (величина датотеке, сложеност, eslint упозорења) назадује на ЧИСТОМ врху издања
— тј. КОМБИНАЦИЈА спајања изазива назадовање, а ниједан појединачни PR не репродукује
регресију на сопственој грани — исправка припада **капетану издања, једнократно, на
грани издања**: предност дати издвајању/рефакторисању; поновно постављање основне вредности дозволити само уз документовани
унос образложења. Никада не пребацујте комбиновано одступање на PR сарадника и никада
не постављајте основну вредност поново за сваки PR (то скрива стварне регресије). Прво утврдите разлику: репродукујте
неуспех на чистом врху у пробном радном стаблу пре него што претпоставите да га је ваш PR изазвао.

## Бележење смањења чегртаљке — смер наниже (#8584)

Чегртаљка је само напола аутоматска, и то погрешна половина. **Повећање** ограничења је
ручна измена JSON-а која траје десет секунди и најбржи је начин да се одблокира неуспели PR.
**Смањење** захтева да неко покрене `--update` и комитује резултат — а док
задатак `bank-ratchet-shrinks` није уведен, ниједан ток рада га није покретао. Измерена последица
(2026-07-25): 18 замрзнутих датотека већ је било на ограничењу од 800 редова за нове датотеке или испод њега, а најгори
случај био је 132× (`src/shared/validation/schemas.ts`, 19 редова са ограничењем од 2,523);
горња граница сложености порасла је `1794 → 2169` кроз ~37 напомена о поновном постављању основне вредности, уз тачно једно
смањење (−1); а „пооштрити помоћу `--update` у следећем циклусу“ написано је 31 пут и испоштовано
једном. Ограничење које надживи кôд због којег је уведено неприметно претвара свако завршено
разлагање у дозволу за раст ономе ко следећи буде уређивао датотеку.

`nightly-release-green.yml` → задатак **`bank-ratchet-shrinks`** затвара ту петљу:

|               |                                                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------------------------------- |
| Покреће се на | `schedule` (3×/дан) + `workflow_dispatch` — намерно **не** на `push`                                             |
| Мери          | највиши `release/vX.Y.Z`, са истим разрешавањем + заштитом од убацивања као `release-green`                      |
| Уписује       | `check:file-size --update` и `check:complexity-ratchets --update` (оба по конструкцији дозвољавају само смањење) |
| Проверава     | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                         |
| Испоручује    | један увек ажуран PR према грани издања — принудно ажуриран, без стварања нежељене буке                          |

Бележење се обавља групно, уместо при сваком слању измена, јер нема захтев у погледу кашњења (смањење
забележено у року од 8 сати је прихватљиво), док би покретање при сваком спајању више пута поново изградило PR грану
током кампања спајања и сваки пут платило цену потпуног ESLint пролаза. Откривање остаје при
слању измена (`release-green`); само се бележење обавља групно.

### Безбедносни проверивач

Задатак без надзора уписује у основне вредности, па `verify-ratchet-bank.mjs` то чини
прихватљивим. Он пореди стабло после `--update` са `HEAD` и **прекида задатак
пре него што било који комит постоји** — без отварања PR-а — осим ако је свака измена једна од следећих:

- нумерички унос `frozen` / `testFrozen` је **смањен** или **уклоњен**
- `complexity-baseline.json` → `count` је **смањен**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` је **смањен**

Све остало доводи до неуспеха: повећање броја, додавање уноса, мењање `cap`/`testCap` или
брисање/преписивање напомене `_rebaseline_*` (те напомене су ревизијски траг који објашњава зашто свака
горња граница постоји и чувају се унутар истог објекта `frozen` као и уноси датотека).
Бот који би могао да повећа ограничење био би строго гори од постојећег стања. Заштита од регресије:
`tests/unit/verify-ratchet-bank.test.ts`.

Задатак никада не шаље измене у `release/*` — човек спаја PR, тако да погрешно мерење
не може бити прихваћено без прегледа.

## Политика листе дозвољених изузетака

Свака контрола која не може да падне због већ постојећих прекршаја користи замрзнуту листу дозвољених изузетака
(нпр. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Политика гласи:

**Отклоните основни узрок; користите листу дозвољених изузетака само када је прекршај већ постојао и
не може бити отклоњен у истом PR-у.**

При додавању ставке на листу дозвољених изузетака:

1. Укључите коментар са образложењем.
2. Наведите проблем за праћење (нпр. `// #3498 — Функционалност из фазе 2, још није имплементирана`).
3. Уклоните ставку у истом PR-у који отклања прекршај — застарела ставка која више
   не потискује активан прекршај и сама представља дефект (6A.3 провера застарелих правила ће,
   када буде имплементирана, оборити контролу због напуштене ставке на листи дозвољених изузетака).

**Немојте** додавати ставке на листу дозвољених изузетака да би тестови брже прошли. Зелена контрола уз све већу
листу дозвољених изузетака ствара лажан осећај квалитета.

### Када контрола падне на вашем PR-у

1. **Пажљиво прочитајте излаз контроле** — он вам тачно говори која датотека или симбол крши
   правило.
2. **Отклоните прекршај** — већина контрола су детерминистичке провере система датотека које пролазе чим
   код буде исправан.
3. **Ако је прекршај већ постојао** (тј. нисте га ви увели, али га контрола сада
   обухвата): додајте ставку на листу дозвољених изузетака са коментаром образложења и проблемом за праћење.
4. **Ако је контрола запорна** (покривеност, ESLint упозорења, дуплирање, сложеност):
   ваша измена је погоршала метрику. Отклоните основни проблем или (ретко) покрените
   `npm run quality:ratchet -- --update` ако је измена намерна и погоршање метрике
   прихватљиво — али у опису PR-а документујте зашто.
5. **Саветодавне контроле** (`continue-on-error: true`) су информативне — не блокирају
   спајање, али се појављују у CI резимеу. Ипак их исправите.

---

## Додавање нове контроле

1. Направите `scripts/check/check-<name>.mjs` (или `.ts`). Контроле политика завршавају се кодом 0/1.
   Запорне контроле уписују метрику у `quality-metrics.json` преко `collect-metrics.mjs`.
2. Додајте `"check:<name>": "node scripts/check/check-<name>.mjs"` у `package.json`.
3. Повежите је у `.github/workflows/ci.yml` у оквиру одговарајућег посла
   (политика → `lint` или `docs-sync-strict`; запорна контрола → `quality-gate`).
4. Ако има листу дозвољених изузетака, примените `reportStaleEntries()` из
   `scripts/check/lib/allowlist.mjs` како би се застареле ставке аутоматски откривале.
5. Напишите тест у `tests/unit/build/` који покрива логику откривања те контроле.
6. Ажурирајте овај документ (додајте ред у одговарајућу табелу послова).

---

## Алатке за агенте: LSP-in-the-loop (опционо)

Поред CI контрола, OmniRoute испоручује **опциони** `agent-lsp` оквир
(пројектни `.mcp.json`, Фаза 7, задатак 15). Направите `.mcp.json`
како бисте агентима за програмирање изложили TypeScript језички сервер, тако да разреше симболе /
дијагностику **пре** писања кода — пратећи механизам за компајлирање пре изношења тврдњи уз
`typecheck:core`, који отклања грешке „измишљених симбола“ на самом извору. Намерно се
не учитава аутоматски (ви бирате и проверавате MCP↔LSP мост); неисправна ставка само бележи
грешку при повезивању и никада не прекида сесије.

---

## Заостатак рационализације (преглед ROI — Фаза 9 Талас 3)

Овај инвентар је усклађен са `ci.yml` 2026-06-17 (претходна верзија је изоставила
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Преглед ROI усклађеног скупа
идентификовао је следеће кандидате за рационализацију. **Спајања су механичке CI
измене; промене статуса/уклањања су одлуке о политици резервисане за оператера.** Ништа од наведеног
још није примењено.

**Такође није документовано изнад** (саветодавно, слаб сигнал): посао `docs-lint`
(markdownlint + Vale, цео посао има `continue-on-error`) и самостални токови рада скенера
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` се налази у
`quality-baseline.json`, али није повезан са блокирајућим механизмом постепеног пооштравања у `ci.yml` — метрика је
тренутно неповезана.

### Спајање / уклањање дупликата (механички, нижи ризик)

Сваки кандидат је проверен у односу на актуелно стање контролних механизама 2026-06-17 (веруј, али провери);
испоставило се да неколико „очигледних“ спајања прикрива технички дуг и **нису** непосредне замене без додатних измена.

- **`check:docs-sync` се покреће два пута** — самостално у послу `lint`, а затим поново унутар `check:docs-all` (`docs-sync-strict`) и husky pre-commit hook-а. ✅ **ЗАВРШЕНО** — самостално позивање у `lint` је уклоњено.
- **CVE скенирање** — ❌ **НИЈЕ чисто спајање.** `audit:deps` завршава неуспехом при било ком CVE-у високог/критичног нивоа; `check:vuln-ratchet` (osv) завршава неуспехом само при _регресији_ у односу на полазну вредност (тренутно 1 MODERATE). Различита семантика — уклањањем `audit:deps` изгубио би се апсолутни контролни механизам за висок/критичан ниво. Задржати оба.
- **Откривање циклуса** — ✅ **ЗАВРШЕНО** (#15159 G-01/G-02). Стари текст је овде називао `check:cycles` „зеленим, ручно одабраним“ контролним механизмом и оправдавао задржавање његовог блокирајућег статуса тиме што је `check:circular-deps` (dpdm) пријављивао 91 циклус. То зелено стање било је **лажно зелено**: `check:cycles` је скенирао 5 потдиректоријума (450 датотека), препознавао само статички образац `import|export … from` и одбацивао сваки спецификатор `@/` и `@omniroute/open-sse/`, па није могао да уочи циклусе динамичког увоза и алијаса који су доминирали репозиторијумом. Исправљено: контролни механизам сада обилази `src` + `open-sse` (5023 датотеке), прикупља спецификаторе из TypeScript AST-а (тако да се `import("…")` рачуна, док се `typeof import("…")` на позицији типа не рачуна) и разрешава `paths` из tsconfig-а. Проналази **14** циклуса, а не 0. Пошто 14 постојећих циклуса не може да се исправи у PR-у за контролни механизам, `check:cycles` је сада механизам **постепеног пооштравања** (`--ratchet`, горња граница `metrics.cycles.value = 14` у `quality-baseline.json`, `direction: down`) — блокира сваку _регресију_, а број може само да опада. CI покреће `npm run check:cycles:ratchet`. Постепено смањивање се спроводи у оквиру **A-01**. `check:circular-deps` (dpdm) остаје саветодаван као шире друго мишљење.
- **Сложеност** — ✅ **ЗАВРШЕНО** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): један ESLint пролаз, бројање по ruleId-у како би полазне вредности за цикломатску сложеност+максималан број редова и когнитивну сложеност остале независне; појединачни `check:complexity` / `check:cognitive-complexity` остају за локални `--update`.
- **`/api` заштита од халуцинација** — ✅ **ЗАВРШЕНО** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): један FS инвентар за `src/app/api`, openapi-routes + docs-symbols и даље извештавају независно; појединачне провере остају за локална покретања.
- **`check:node-runtime` се покреће у 11 послова** — ⚠️ **низак ROI.** Сваки се извршава на засебном runner-у, а провера траје <1s; укупна уштеда је ~10s, уз губитак јефтине заштите по послу. Није вредно ремећења.
- **`typecheck:noimplicit:core` у CI lint-у** — ✅ **уклоњено из lint посла** (било је саветодавно уз `continue-on-error`); блокирајућу површину типова чине `typecheck:core` + `check:type-coverage`. Локална скрипта је задржана.

### Променити статус / одлучити (политика оператера)

- `check:openapi-security-tiers` (саветодавно) — ❌ **НИЈЕ могуће чисто променити статус.** Завршава се кодом 0, али упозорава да неколико `traffic-inspector` рута под `LOCAL_ONLY_API_PREFIXES` нема анотацију `x-loopback-only: true`. Његово наметање прво захтева додавање тих анотација у `openapi.yaml`.
- `typecheck:noimplicit:core` (саветодавно) — у великој мери је обухваћено блокирајућим механизмом постепеног пооштравања `check:type-coverage`. Претворити га у механизам постепеног пооштравања или уклонити сувишни други `tsc` пролаз.
- `test:vitest:ui` (сада **блокирајуће**) — постојећи неуспеси су изричито изузети у `vitest.config.ts` уз коментаре за праћење `// #8618`; нови неуспеси обарају посао.
- `check:secrets` (gitleaks, блокирајући механизам постепеног пооштравања замрзнут на 3 документована лажно позитивна резултата) — додати та 3 резултата на листу дозвољених како би се достигла 0 или спустити статус на саветодавни. Преклапа се са GitHub-овим уграђеним скенирањем тајни + `check:public-creds`.
- `check:pr-evidence` (блокирајуће, претражује прозни текст PR-а) — висок ризик од лажно позитивних резултата; уклањање слаби спровођење строгог правила бр. 18, па је ово стварна одлука о политици.
- `semgrep` (саветодаван, самосталан) — преклапа се са CodeQL-ом за OWASP породице; повезати његову полазну вредност са механизмом постепеног пооштравања или га уклонити.

---

## Повезана документација

- Ланац снабдевања (порекло, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — контролна капија за подударност скупа кључева

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, посао `i18n-ui-coverage`).
Пореди скуп крајњих кључева сваке датотеке `src/i18n/messages/<locale>.json` са `en.json` и пријављује
неуспех за сваки кључ који недостаје или је сувишан, без обзира на то када је кључ додат. Чувари места
`__MISSING__:` рачунају се као присутни (њихов садржај је предмет контролне капије односа). Ово је потпуна
допуна двеју контролних капија заснованих на разликама/процентима: `check-ui-keys-coverage` намеће доњу
границу од 80 % по локалу (43 одсутна кључа од ~13,000 и даље дају 99.7 %), док `check-new-key-coverage`
оцењује само кључеве које PR додаје у `en.json`. Серија локала генерише се из верзије `en.json` која
постоји на дан прављења њене гране и преводи се данима док основна грана наставља да додаје кључеве;
сам PR серије не додаје ниједан кључ, па су обе сродне контролне капије остале неме када је серија 1
(#13044) обједињена са 43 кључа мање у девет локала, а серија 2 (#13660) са 10 кључева мање у осам
(2026-09-15). Црвену проверу исправите помоћу
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; сувишан (`extra`) крајњи кључ
значи да га је извор уклонио — избришите га из локала. `--warn` пријављује проблем без изазивања
неуспеха. `--catalog=cli` покреће исто поређење над `bin/cli/locales` (`npm run i18n:check-keys:cli`);
оба корака налазе се у послу `i18n-ui-coverage`.

#### `check-new-key-coverage` — i18n контролна капија за нове кључеве

Сродна је контроли `check-ui-value-drift`. Она открива вредност на енглеском која је **преписана**
док су њени преводи остали непромењени; ова открива кључ на енглеском који је **додат**
а да га неки локали никада нису добили.

`check-ui-keys-coverage` не може да уочи ову врсту проблема: намеће процентуалну доњу границу по локалу,
а једанаест одсутних кључева од ~13,000 оставља покривеност на 99.9%. Проценат по језику не може да
изрази „ова функционалност је објављена непреведена“ — цела функционалност може да стигне у нови локал
без икаквог текста, а да се број никада не промени.

Инцидент који ова контрола обухвата: фаза 3 оркестрационог платна превела је својих једанаест кључева
у свих 42 локала који су тада постојали. Неколико сати касније, серија језика ЕУ (#13044) довела је
репозиторијум до 51 локала, а девет нових (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) никада
их није добило. `deepMergeFallback` замењује одсутан кључ енглеским текстом, па је последица била
непреведен, а не празан кориснички интерфејс — стваран проблем који је по самој конструкцији остао непримећен.

Као и сродна контрола, она је **свесна разлика** и пореди енглески на основи обједињавања са радним
стаблом, тако да већ постојећи недостаци остају замрзнути и за укључивање контролне капије није била
потребна миграција.

**Ознака `__MISSING__:<english>` не задовољава ову контролу (од 2026-09-17).** Раније је била
документовани начин одлагања — окружење за извршавање се враћа на исправан енглески текст — све док
осам PR-ова функционалности од 2026-09-16 није додало 61 кључ и утиснуло ознаку у свих 65 локала
уместо да их преведе: ова контролна капија је прихватила сваки од њих, ништа није блокирало PR-ове,
а блокирајућа контролна капија односа стварних превода затим није прошла на врху издања ни за кога
(pt-BR 3.2 % > 2.5 % + 0.5). Ознака се сада оцењује као одсутан превод. Црвену проверу исправите помоћу
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, или за
све локале паралелно помоћу `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
безбедно за покретање без прикљученог терминала, одбија да се покрене без променљивих окружења
`OMNIROUTE_TRANSLATION_*`). Кључ који мора да остане на енглеском (фиксирани назив производа/механизма/опције)
припада датотеци `scripts/i18n/untranslatable-keys.json`, никада иза ознаке. `vi` у потпуности забрањује
ознаке (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — контролна капија за паркиране тестове

Датотека на листи `exclude` у `vitest.config.ts` представља тест који се не извршава, а ономе ко чита
стабло изгледа као покривеност. Шездесет две датотеке нагомилале су се иза коментара
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Проблем #8618 затворен је
2026-08-11, док је листа коју је пратио порасла са 45 на 62 ставке, при чему је свака нова наследила
коментар који упућује на затворен проблем. Када је листа коначно измерена датотеку по датотеку (#13204),
**51 од 62 теста прошло је над тренутним стаблом без икакве измене изворног кода**.

Контролна капија захтева да свако изузеће које се разрешава у стварну датотеку (а) наведе проблем за
праћење и (б) буде присутно у `config/quality/vitest-exclusions.json` са својим измереним статусом,
тако да додавање изузећа буде разлика која се може прегледати у наменској датотеци, уместо још једног
реда у низу од 60 ставки. Она намерно не покреће поново изузете тестове — то траје ~10 минута и припада
периодичном послу; евиденција бележи када је сваки од њих последњи пут измерен.
