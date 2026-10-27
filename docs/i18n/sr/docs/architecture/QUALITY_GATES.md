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

## Инвентар контролних тачака и профили извршавања

### Прихватање кандидата

Токови рада CI и Quality Gates производе по један стабилан исход: `Gate / CI` и
`Gate / Quality`. Њихова верзионисана политика прихватања наводи сваки претходни посао
као обавезан или саветодаван. Сваки примењиви обавезни посао мора бити успешан:
недостајући, отказани, прескочени, недовршени и непознати резултати не могу да утврде PASS. Важећа
класификација само за документацију или само за каталог може учинити програмску грану непримењивом;
нацрт PR-а није прихваћен кандидат. Ознака `hotfix` не укида захтев за доказима.

Оба тока рада обухватају PR-ове ка главним/издавачким гранама, слања на `main`, ручно покретање
и догађаје групе спајања. Слање, ручно покретање и група спајања извршавају пун избор. Слања на
`release/**` их не покрећу (2026-10-18): свака измена је већ прошла матрицу у свом PR-у,
а спојена комбинација је задатак система Release-Green (`docs/ops/RUNNER_BOX.md` → хостована грана). Форкови
и групе спајања користе хостоване извршиоце за послове који би иначе изабрали
самостално хостоване извршиоце; пре увођења мора се потврдити довољан хостовани капацитет.

Свака JSON потврда идентификује преузети SHA, покретање тока рада и покушај.
CLI одбацује неподударност SHA-а преузете верзије и догађаја. Тестови тока рада везују припадност политици
за листу `needs` посла који утврђује исход, тако да нова или уклоњена грана не може неприметно нестати.
Потврде обухватају сопствени ток рада, а не објављивање, постављање или унутрашњи рад
постојећег саветодавног скенера. Активирање оба назива провере у правилима гране представља
посебну административну измену; додавање ових послова само по себи не штити грану.

### Сачувани докази у редуктору прихватања

`scripts/quality/validate-release-acceptance.mjs` редукује достављени план и његове
манифесте; не утврђује да план обухвата комплетан процес издавања.
Његови извештаји изричито постављају `releaseAcceptance: false`, чак и када је тај план
`VERIFIED`. Ток рада `release-acceptance.yml` и даље користи помоћне тестне податке, а не
стварне потврде изградње, паковања, покретања или промоције.

CLI захтева `--evidence-root` ради провере сачуваних доказа. Датотеке се разрешавају
као `<evidence-root>/<artifact_id>/<member>` и хеширају помоћу SHA-256. PASS запис
без доказа, датотека која недостаје или је измењена, небезбедна путања или симболичка веза спречавају
проверу. Датотеке које недостају нису исто што и празни дневници успешног извршавања. Постојеће
провере SHA-а, покретања и покушаја остају независне: подударни бајтови не могу исправити застарелу
потврду. Интегритет датотеке није доказ аутентичности извршавања или промоције артефакта.

### Капацитет извршавања корисничког интерфејса

CI покреће комплетан инвентар корисничког интерфејса као четири матрична сегмента `test-vitest`, сваки са највише
два извршна процеса по сегменту и постојећим роком од 15 минута по послу. Први сегмент такође покреће
Vitest скуп за MCP/autoCombo. Резултат обавезног посла обухвата сваку грану матрице; неуспех
или отказивање једног сегмента не може да утврди прихватање кандидата.

Ноћни посматрач чува засебну потврду тачног кандидата за сваки сегмент корисничког интерфејса,
укључујући извршавање MCP-а у првој потврди. Све четири потврде, дневници и подударни
идентитети извршавања су обавезни. Локална команда `npm run test:vitest:ui` и даље бира
комплетан скуп; једно извршавање са `--shard` представља само делимичан доказ.

### Прикупљање покривености јединичних тестова

Дванаест сегмената јединичних тестова прикупља V8 покривеност током постојећег извршавања тестова. Успешан
сегмент покреће `scripts/ci/compact-v8-coverage.mjs` како би сажео оригиналне датотеке без генерисања
посредног Istanbul извештаја. Завршни посао Coverage проверава свих дванаест манифеста у односу на
SHA кандидата, извршно окружење, корени директоријум изворног кода и хешеве података, а затим покреће c8 извештаче и постојеће
прагове покривености. Улази задржавају c8-ов глобални редослед назива датотека; претходно спајање по сегментима није безбедно
за мешовиту покривеност функција/блокова. Недостајући, неправилно формирани или некомпатибилни сегменти онемогућавају прихватање.
Неуспешни сегменти тестова засебно чувају сирову дијагностичку покривеност; она не може ући у завршно спајање.

### Инвентар статичког скенирања

Верзионисани инвентар npm алијаса и припадност статичком скенирању налазе се у
`config/quality/gate-manifest.json`. Покрените `npm run check:gate-manifest` да бисте проверили
називе скрипти и тачне команде у односу на `package.json`; додавања, уклањања и
одступања команди доводе до неуспеха и локалне куке и послова класификације измена у CI-ју.
Алијас није посао тока рада, примерак матрице нити тест-случај: ови бројеви се
не смеју представљати као међусобно заменљиви.

Користите `npm run quality:scan -- --list` или `npm run quality:scan:fast -- --list`
да бисте прегледали изабране алијасе без њиховог извршавања. Извршилац позива
npm улазну тачку, па се њено извршно окружење (укључујући Bun где је конфигурисан) задржава.
Манифест бележи алијасе изван тих профила као засебно позване, а
команде за одржавање су забрањене у профилима скенирања само за читање.

Ови профили обухватају само статичко скенирање. Они не сертификују тестове производа,
покривеност, паковање, спољне провере нити потпуно прихватање кандидата за издавање.
Прихватање у току рада користи повезани `config/quality/admission-policy.json` и
`scripts/quality/admission-verdict.mjs`. Профили посматрача издања остају засебни;
њихове примењиве провере и потврде прегледајте независно. Статичке
команде потпуног посматрача декларисане су у `config/quality/release-green-static-profile.json`, укључујући
`audit:deps`, избор мутационих тестова и провере превода. Учитавач проверава npm
команде у односу на package.json и моделоване CI/Quality декларације; одбацује одступања
уместо да извршава токене љуске као аргументе. Обавезни излаз скенера SKIP/INCOMPLETE
не може да утврди PASS. Профил бележи своја спољна изузимања и не замењује
хостовану покривеност, матрице тестова, доказе о пакетима или постављању. Текстуални инвентар у наставку
служи као референца, а не као доказ да је контролна тачка заиста покренута.

Скрипте се налазе у `scripts/check/` (контролне тачке политика) и `scripts/quality/` (механизам постепеног пооштравања).
CI извор истине је `.github/workflows/ci.yml`.

### Убрзана путања PR-а издања (`quality.yml`)

`.github/workflows/quality.yml` dopunjuje CI za PR-ove ka granama main/release, slanja na `main`,
ručno pokretanje i grupe za spajanje. PR-ovi koriste brze provere filtrirane prema putanjama. Trajno
onemogućena duplirana izgradnja je uklonjena; stvarne provere izgradnje/pakovanja/pokretanja ostaju u CI-u.

| Posao                                            | Opseg                                                                                                                                                                                                                                    | Blokirajući             |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | PR-ovi za dokumentaciju/kôd; reference API dokumentacije i docs-all                                                                                                                                                                      | Da                      |
| `Fast Quality Gates`                             | PR-ovi za kôd; statičke provere, provera tipova, provera tipova kontrolne table, obuhvaćeni jedinični testovi                                                                                                                            | Da                      |
| `Forgotten sibling tests`                        | PR-ovi za kôd; praćenje izmenjenih modula do statičkih potrošača i potencijalnih srodnih testova; putanje preko zbirnih modula i dinamičkih uvoza prijavljuju se kao savetodavna dijagnostika, uz navedene izuzetke sa liste dozvoljenih | **Savetodavno**         |
| `Vitest (fast-path)`                             | PR-ovi za kôd; brzi vitest skup                                                                                                                                                                                                          | Da                      |
| `Unit Tests fast-path`                           | PR-ovi za kôd; skup jediničnih testova podeljen u 4 dela                                                                                                                                                                                 | Da                      |
| `No new ESLint warnings`                         | PR-ovi za kôd; zaštitna provera lintovanja koja uzima u obzir potiskivanja                                                                                                                                                               | Da, uključujući forkove |
| `Merge integrity (changelog + generated skills)` | PR-ovi koji nisu nacrti; sinhronizacija dnevnika izmena i generisanih veština                                                                                                                                                            | Da, uključujući forkove |

#### Izveštaj o zaboravljenim srodnim testovima

`npm run check:forgotten-sibling-tests` ponovo koristi razrešavač uvoza na kojem se zasniva mapa uticaja testova.
Za svaki izmenjeni produkcioni modul prijavljuje determinističke lance
`changed module/symbol -> static consumer -> candidate sibling test` kada potencijalni
test nije prisutan u razlikama zahteva za preuzimanje. Markdown sažetak i JSON rezultat čuvaju se kao
artefakt toka rada `forgotten-sibling-tests` radi kalibracije pre eventualnog uvođenja blokiranja.

Ponovni izvozi preko zbirnih modula i dinamički uvozi služe samo kao dijagnostika razrešavanja; nikada ne stvaraju
blokirajući nalaz. Pregledani izuzeci nalaze se u
`config/quality/forgotten-sibling-allowlist.json`. Svaka stavka mora da navede potrošača i potencijalni
test, pruži konkretno obrazloženje i sadrži vezu ka GitHub problemu ili zahtevu za preuzimanje. Neispravne stavke
dovode do neuspeha. Izuzeci ne mogu da potisnu izbrisani potencijalni test ili razliku koja dodaje `.skip`/`.todo`;
slabljenje tvrdnji i drugi oblici prikrivanja ostaju u nadležnosti nezavisno blokirajuće
provere `check:test-masking`.

### Posao: `lint`

Pokreće se za svaki PR ka grani `main`. Blokira spajanje u slučaju neuspeha.

| Скрипта (`npm run ...`)           | Проверава                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Блокирајуће                                 |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | Да ли је верзија Node.js-а у подржаном опсегу                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Да                                          |
| `check:cycles`                    | Цикличне увозе у целом `src/` + `open-sse/` (засновано на AST-у, уз разрешене tsconfig `paths`). Самостално покретање завршава се кодом 1 кад год постоји било који циклус (затворено у случају грешке од #15281) и наводи SCC-ове. `check:cycles:ratchet` (који CI покреће) блокира када број премаши горњу границу `metrics.cycles` у `quality-baseline.json` — тренутно 14, `direction: down`, тако да може само да се смањује (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Да (механизам затезања)                     |
| `check:boundary`                  | Спрегу `open-sse → src`: јединствене увозе из датотеке у датотеку, из механизма у апликацију (`scripts/quality/measure-boundary.mjs`; листа веза представља заостале ставке за отклањање проблема раздвајањем језгра/модула v4). Самостално покретање = саветодавни извештај (исто као `quality:boundary`). `check:boundary:ratchet` (који CI покреће, а налази се и у петљи механизма затезања за брзе контроле у `quality.yml`) блокира када број премаши горњу границу `metrics.boundaryOpenSseToSrc` у `quality-baseline.json` — почетно постављену на измерених 771, `direction: down`; `--update` је може само смањити; на PR-овима је релативно у односу на основну грану (`--base-ref`, погледајте испод)                                                                                                                                                                                                                | Да (механизам затезања)                     |
| `check:route-validation:t06`      | Да ли су Zod шеме присутне на свим рутама (политика нивоа 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Да                                          |
| `check:any-budget:t11`            | Број `@ts-expect-error // any` не премашује буџет (ниво 11, catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Да                                          |
| `check:provider-consistency`      | Сваки провајдер у `providers.ts` има одговарајући унос у `providerRegistry.ts` (и обрнуто, у оквиру листе дозвољених ставки)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Да                                          |
| `check:model-lifecycle`           | Три ручно одржаване табеле рутирања остају усклађене са снимком стања животног циклуса који је укључен у репозиторијум (#11503): `FITNESS_TABLE` (`taskFitness.ts`) не оцењује ниједан повучени идентификатор који `REGISTRY` може да рутира; сваки циљ из `BUILT_IN_ALIASES` присутан је у `REGISTRY` и одсутан из снимка повучених идентификатора; сваки повучени идентификатор који је још увек у `REGISTRY` прослеђује се или је наведен у `allowedRetiredInCatalog`; и ниједан извор или циљ из `DEFAULT_DEGRADATION_MAP` није означен као повучен у том снимку. Ово не доказује да модел тренутно опслужује активни узводни систем. Ради ван мреже — пореди са `config/quality/model-lifecycle.json`, који се ручно освежава помоћу `npm run quality:refresh-model-lifecycle` (захтева мрежу; није укључено у CI). `allowedRetiredInCatalog` је механизам за постепено смањивање: унос додајте само уз задатак за праћење. | Да                                          |
| `check:fetch-targets`             | Сваки `fetch("/api/...")` у клијентском `src/` разрешава се на стварни `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Да                                          |
| `check:deps`                      | Све зависности које се могу инсталирати помоћу `npm install` из сваке датотеке `package.json` у репозиторијуму налазе се у `dependency-allowlist.json`; нови пакети без фиксиране верзије или пакети који представљају slopsquatting означавају се                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Да                                          |
| `audit:deps`                      | npm провера свих пет независних lock датотека (корен, Electron, OpenCode додаци v1/v2 и провајдер). Критична упозорења блокирају; упозорења високог нивоа остају видљива. Недостајуће или неуспеле провере имају статус INCOMPLETE и блокирају; хешеви lock датотека и извештаји задржавају се за сваки опсег.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Да                                          |
| `check:lockfile`                  | Интегритет датотеке `package-lock.json` — https регистар, хешеви интегритета, без замене хостова                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Да                                          |
| `check:licenses`                  | Листа дозвољених SPDX лиценци за продукционе зависности                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Да                                          |
| `check:tracked-artifacts`         | Без артефаката изградње / комитованих симболичких веза ка `node_modules` (такође се покреће у husky pre-commit куки; pre-push је намерно минималан — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Да                                          |
| `check:ai-attribution`            | Без AI/bot `Co-Authored-By` завршног реда или подножја о AI генерисању у PR комитовима, наслову или телу — Строго правило #16 (у `quality.yml` петљи брзих провера за PR→`release/**` — чита садржај догађаја, не ради ништа ван PR-ова — и корак само за PR у `ci.yml` lint провери за PR→`main`; такође husky `commit-msg` кука; људски коаутори су дозвољени; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:vitest-exclusions`         | Свако Vitest изузеће наводи проблем за праћење и налази се у `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Да                                          |
| `check:file-size`                 | Изворне датотеке (`.ts`/`.tsx` у `src/`, `open-sse/`, `electron/`, `bin/`) остају у оквиру `cap`, а тест датотеке (`*.test.ts(x)`) у оквиру `testCap`; датотеке замрзнуте у `file-size-baseline.json` (`frozen` / `testFrozen`) не смеју да премаше своју забележену величину                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Да                                          |
| `check:error-helper`              | Одговори о грешкама у извршиоцима/руковаоцима користе `buildErrorBody()` / `sanitizeErrorMessage()` (Строго правило #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Да                                          |
| `check:migration-numbering`       | SQL датотеке миграција су нумерисане узастопно, без празнина или дупликата                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Да                                          |
| `check:public-creds`              | Нема дословних OAuth вредности `client_id`/`client_secret` нити Firebase Web кључева изван `publicCreds.ts` (Строго правило #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Да                                          |
| `check:db-rules`                  | Нема сировог SQL-а изван модула у `src/lib/db/`; нема збирних увоза из `localDb.ts` (Строга правила #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Да                                          |
| `check:known-symbols`             | Извршиоци добављача, стратегије усмеравања и преводиоци регистровани у својим табелама отпремања подударају се са датотекама на диску — нема неповезаних или недекларисаних симбола                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Да                                          |
| `check:route-guard-membership`    | Свака рута која покреће подређени процес класификована је помоћу `isLocalOnlyPath()` (Строга правила #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Да                                          |
| `check:test-discovery`            | Свака `*.test.ts` / `*.spec.ts` датотека у репозиторијуму обухваћена је бар једним покретачем тестова (ratchet: листа неповезаних датотека у `test-discovery-baseline.json` може само да се смањује)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Да                                          |
| `check:test-tla-order`            | Ниједна `node:test` датотека у `tests/unit` не региструје тест, наилази на `await` највишег нивоа, а затим региструје још тестова (#18045; ratchet: `test-tla-order-allowlist.json` може само да се смањује)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Да                                          |
| `check:agent-skills-sync`         | Генерисани артефакти вештина агента подударају се са својим изворним каталогом (без одступања)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:provider-asset-provenance` | Логотипи/ресурси добављача имају забележен унос о пореклу                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `lint:json`                       | JSON конфигурационе датотеке могу да се рашчлане и задовољавају правила провере репозиторијума                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `typecheck:core`                  | TypeScript компилација без грешака (само саветодавна упозорења)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Да                                          |
| `typecheck:noimplicit:core`       | Строги `noImplicitAny` — усмерено на будућност; многим већ постојећим местима позива и даље су потребне анотације                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **Саветодавно** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ограничен на `src/app/(dashboard)/**` (#7033) — пажљиво одабрана листа од 27 дозвољених датотека у `typecheck:core` не укључује ниједан TSX са контролне табле, а ни `next build` их никада не проверава по типовима (`next.config.mjs` поставља `ignoreBuildErrors: true`), па су регресије напуштених идентификатора у њима (#6625/#6909) биле невидљиве за CI. Пореди се са замрзнутом полазном основом броја грешака по датотеци и TS коду (`config/quality/dashboard-typecheck-baseline.json`, исти образац примене застарелости као код `check:known-symbols`) — само НОВЕ грешке изнад броја у полазној основи обарају проверу; смањите полазну основу помоћу `--update` када се исправи већ постојећа грешка.                                                                                                                                                                                                      | Да                                          |

### Задатак: `quality-gate`

Покреће се након `test-coverage`. У случају неуспеха блокира спајање.

| Скрипта                      | Проверава                                                                                                                                                                                       | Блокирајуће                                    |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `quality:collect`            | Генерише `quality-metrics.json` (број ESLint упозорења, покривеност из обједињеног извештаја сегмената)                                                                                         | Да (претходи механизму постепеног пооштравања) |
| `quality:ratchet`            | Ниједна метрика у `quality-baseline.json` није регресирала (ESLint упозорења ≤ полазна основа; покривеност ≥ полазна основа)                                                                    | Да                                             |
| `check:duplication`          | Дуплирање кода (jscpd@4) не премашује полазну основу у `quality-baseline.json`                                                                                                                  | Да                                             |
| `check:complexity`           | Цикломатска сложеност на нивоу датотеке не премашује ограничење (основна ESLint правила `complexity` + `max-lines-per-function`)                                                                | Да                                             |
| `check:cognitive-complexity` | Постепено пооштравање когнитивне сложености (`eslint-plugin-sonarjs`) — засебно покретање ESLint-а; CI покреће обе провере обједињене у један корак `check:complexity-ratchets`                 | Да                                             |
| `check:dead-code`            | Постепено пооштравање за некоришћене извозе / датотеке (knip) не регресира у односу на полазну основу                                                                                           | Да                                             |
| `check:compression-budget`   | Буџет референтног теста компресије — минималне уштеде токена по механизму не смеју да регресирају                                                                                               | Да                                             |
| `check:type-coverage`        | Постепено пооштравање процента типизираног кода (`type-coverage`) не регресира; углавном обухвата `typecheck:noimplicit:core`                                                                   | Да                                             |
| `check:codeql-ratchet`       | Број отворених CodeQL упозорења не регресира (чита се преко `gh api`; уредно се прескаче без токена) — учесталост освежавања и ручно покретање: погледајте „CodeQL постепено пооштравање“ испод | Да                                             |

### Задатак: `quality-extended`

Задатак блокира одговарајуће кандидате. Величина пакета, проналасци тајни, проналасци
рањивости, проналасци у токовима рада и OpenAPI измене проверавају се уз обавезно постепено пооштравање.
Дијагностика кружних зависности остаје саветодавна. Инсталација скенера је обавезна:
`scripts/ci/install-quality-scanners.sh` обезбеђује закачене верзије и прослеђује
грешке при инсталацији. Алатке које недостају, неважећи извештаји или полазне основе које недостају остављају
обавезну проверу скенера у стању INCOMPLETE.

| Скрипта                  | Проверава                                                                                                                                                                                                                             | Блокирање                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `check:circular-deps`    | Нема кружних зависности (dpdm)                                                                                                                                                                                                        | **Саветодавно**                                        |
| `check:bundle-size`      | Величина пакета не премашује ограничење; неуспешно мерење доводи до грешке                                                                                                                                                            | **Блокирајуће уз --ratchet**                           |
| `check:secrets`          | Gitleaks налази не регресирају; обавезна скенирања одбацују недостајуће алате/изворе/полазне вредности, неуспешна скенирања и неважеће извештаје                                                                                      | **Блокирајуће уз --ratchet**                           |
| `check:vuln-ratchet`     | Рањивости зависности не регресирају; обавезна скенирања одбацују недостајуће алате, неважеће извештаје или недостајуће полазне вредности                                                                                              | **Блокирајуће уз --ratchet**                           |
| `check:workflows`        | Провера радних токова (actionlint + zizmor); недостајући/неисправни скенери, неважећи извештаји или недостајућа ratchet полазна вредност доводе до стања INCOMPLETE. Важећи налази прате изабрану строгу/саветодавну/ratchet политику | Извршавање је обавезно; zizmor ratchet блокира у CI-ју |
| `check:openapi-breaking` | Уговор јавног API-ја у односу на закачена commit стања догађаја (PR merge-base, push before, merge-group base; за заказано/ручно покретање први родитељ checkout-а); обавезно мерење се затвара уз грешку                             | **Блокирајуће уз --ratchet**                           |

### Задатак: `docs-sync-strict`

За захтеве за спајање ка `main` или `release/**`, овај посао се покреће само за кандидате који нису нацрти (или долазе из поузданог реда) и класификовани су као измене документације или кода. Покреће се и за CI догађаје који нису PR; окидач за push у овом току рада обухвата само `main`, а не `release/**`. Корак који се заврши излазним кодом различитим од нуле блокира посао; налази који се само пријављују и изузеци документовани испод не блокирају га.

| Скрипта                        | Проверава                                                                                                                                                                                                                                                                                                                                           | Блокирање                                                                                                                   |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Мета-капија која редом покреће 7 поткапија наведених испод                                                                                                                                                                                                                                                                                          | Да                                                                                                                          |
| ↳ `check:docs-sync`            | Усклађеност верзија пакета, OpenAPI-ја и CHANGELOG-а, тачне огледалне копије `llm.txt`, инваријанте одељака и величине преведеног CHANGELOG-а и одсуство дуплираних докумената који су већ замењени                                                                                                                                                 | Да                                                                                                                          |
| ↳ `check:docs-frontmatter`     | Компајлиране странице документације имају важеће наслове у предњој метаподаточној секцији                                                                                                                                                                                                                                                           | Да                                                                                                                          |
| ↳ `check:docs-counts`          | Инваријанте бројања са високом поузданошћу примењују се строго; хеуристичке провере броја датотека само упозоравају, осим ако скрипта добије `--strict` (CI мета-капија га не прослеђује)                                                                                                                                                           | Строги ниво блокира; блажи ниво је саветодаван                                                                              |
| ↳ `check:env-doc-sync`         | Читања променљивих окружења у изворном коду, `.env.example` и `docs/reference/ENVIRONMENT.md` усклађена су након примене изричитих листа изузетака за занемарене променљиве, оне само у документацији и оне само у окружењу                                                                                                                         | Да, ван документованих листа изузетака                                                                                      |
| ↳ `check:deprecated-versions`  | Пријављује потенцијално застареле верзије ван безбедних историјских контекста и застареле датуме ажурирања, изузимајући занемарене документе                                                                                                                                                                                                        | Саветодавно у тренутној CI поставци (`--strict` се не прослеђује)                                                           |
| ↳ `check:doc-links`            | Интерне markdown везе у документацији упућују на стварне датотеке (облик `[text]`/`(path)`)                                                                                                                                                                                                                                                         | Да                                                                                                                          |
| ↳ `check:fabricated-docs`      | Руте, променљиве окружења, CLI команде, називи hook-ова и путање датотека наведени у документацији постоје у бази кода. Строга капија уз `--strict`; без заставице грешка није блокирајућа.                                                                                                                                                         | Да (уз `--strict` у CI-ју)                                                                                                  |
| `check:cli-i18n`               | Кључеви `t()` које CLI користи постоје у `en`; `pt-BR` задржава сваки одељак највишег нивоа; `zh-CN` и `zh-TW` садрже сваки кључ из `en`                                                                                                                                                                                                            | Да                                                                                                                          |
| `check:openapi-coverage`       | OpenAPI спецификација покрива најмање ratchet доњу границу стварних рута                                                                                                                                                                                                                                                                            | Да                                                                                                                          |
| `check:openapi-security-tiers` | Декларисане ознаке `x-loopback-only`/`x-always-protected` морају имати подршку у `routeGuard.ts`; грешке парсера и неслагања у директној провери блокирају. Обрнута провера недостатка `x-loopback-only` под префиксима који дозвољавају само локални приступ даје упозорења, а руте одређене искључиво обрасцима изузете су из те обрнуте провере. | Провере парсера и директне провере блокирају; обрнута провера је саветодавна                                                |
| `check:openapi-routes`         | Свака путања `/api...` у `openapi.yaml` одговара стварној рути без обзира на разлике у параметрима, након примене образложене листе изузетака `KNOWN_STALE_SPEC`; застареле ставке листе изузетака такође изазивају неуспех                                                                                                                         | Да                                                                                                                          |
| `check:docs-symbols`           | Интерне URL референце на `/api/...` у канонским документима који нису огледалне копије одговарају стварној рути или породици рута; изузете су референце на посредничке и узводне сервисе, резервисана места и датотеке, као и образложене ставке `KNOWN_STALE_DOC_REFS`, а застареле ставке листе изузетака изазивају неуспех                       | Да                                                                                                                          |
| `i18n translation drift`       | Хешеви извора и одредишта основног скупа преведених докумената подударају се са `.i18n-state.json`. PR-ови не пролазе само због новоуведеног одступања извора, недостајућег одредишта или одступања хеша одредишта; провере ван PR-а су строге. Наслеђена одступања у PR-у и хешеви извора застарелих одредишта пријављују се као упозорења.        | Нова одступања у PR-у и одступања под строгом провером ван PR-а блокирају; наслеђени или застарели случајеви су саветодавни |

Дванаест README SVG-ова у `docs/diagrams/` генерише се помоћу `scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` их све поново генерише.
Сваки има јединични тест који пореди бајт по бајт (`tests/unit/docs/readme-*-svg.test.ts`, посао `test-unit`) и пада када је датотека сачувана у репозиторијуму застарела.
`check:docs-counts` чита канонске бројеве из њихових чворова `<text>`, па се цифре никада не претварају у контурне путање.
Провера канонских SVG бројева чита датотеке наведене у `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, `public/images/tier-flow-dark.svg`, `tier-flow-light.svg`.
Провере тврдњи о трајно бесплатним провајдерима, ставкама каталога, обнављајућим пуловима и факторима бодовања читају и `promise-pillars.svg`, `free-tier-budget.svg`, `strategies-grid.svg`.
`free-tier-budget.svg` добија бројке из учитавача текућег каталога, па измена `FREE_MODEL_BUDGETS` или приказаног имена провајдера обара CI док се та датотека поново не генерише.

### Задатак: `i18n-ui-coverage`

| Скрипта                             | Проверава                                                                                                                                                                                                      | Блокирајуће     |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (уграђено) | Покривеност UI i18n кључева је ≥ 65%                                                                                                                                                                           | Да              |
| `check-ui-value-drift` (уграђено)   | Преписана енглеска **вредност** не оставља застарели превод                                                                                                                                                    | Да              |
| `check-new-key-coverage` (уграђено) | **Нови** енглески кључ је преведен у сваком локалу — ознака `__MISSING__:` се одбацује                                                                                                                         | Да              |
| `check-translation-ratio`           | Удео стварних превода по локалу (ставке идентичне енглеском / резервисане вредности / недостајуће ставке ван листе дозвољених) не сме да премаши `config/quality/i18n-translation-baseline.json` + толеранцију | **Саветодавно** |

Захтева `fetch-depth: 0` — контрола одступања вредности пореди разлике у `en.json` у односу на базу спајања.

#### `check-ui-value-drift` — контрола застарелих превода

Открива ону i18n регресију коју друге контроле структурно не могу да уоче: енглеска вредност
се препише, а преводи изведени из _претходног_ енглеског остану непромењени, па
корисници који не користе енглески настављају да читају самоуверено формулисан, али сада нетачан текст.

Ово се заиста нашло у издању. `oauthModal.googleOAuthWarning` је преписан када је додат Antigravity
помоћник за пријављивање (#5203); **39 од 43 локала** задржало је текст који оператерима налаже да „копирају
целу URL адресу и налепе је испод“ — ток који код тог добављача не може да се доврши. То је
остало непримећено све до #8463 зато што:

- `sync-ui-keys` допуњава само кључеве који **недостају**, никада оне који су **застарели**;
- `check-ui-keys-coverage` броји _присуство_ кључева, па се застарели превод рачуна као покривен;
- `check-translation-drift` прати документационе копије `docs/i18n/<locale>/**.md` —
  никада не чита `src/i18n/messages/*.json`. Блокирајуће у послу `docs-sync-strict` од
  поновне синхронизације 2026-09: измените основни документ → `npm run i18n:run -- --files=<doc>` (на нивоу одељка, јефтино).

**Ослања се на разлике, а не на основну линију.** Пореди `en.json` у бази спајања са
радним стаблом; за сваки кључ чија је енглеска вредност промењена, сваки локал који и даље садржи
неизмењен превод сматра се застарелим. Ово намерно **замрзава постојећи дуг** — разлика
не може да открије из које је старе енглеске вредности настао дуготрајни превод, па контрола оцењује
само оно што тренутна измена дотиче. Алтернатива (основна линија хешева по кључу) захтевала би
генерисану датотеку од око 600 KB, 3× већу од највеће постојеће основне линије, која би се мењала у сваком i18n PR-у.

Постоје два начина да се контрола задовољи:

1. ажурирајте погођене преводе или
2. поставите их на `__MISSING__:<new english>` — окружење за извршавање ће тада испоручити исправљени енглески
   (`src/i18n/request.ts::deepMergeFallback`, #7258), а кључ ће бити стављен у ред за превођење.

Ако се променило **значење** ниске, пожељно је **преименовати кључ**: нови кључ не може да наследи
застарели превод. Тај образац је коришћен у #8463.

```bash
npm run i18n:check-value-drift          # строго (оно што CI покреће)
npm run i18n:check-value-drift:warn     # само извештај
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Завршава се кодом 0 уз `SKIP reason=base-unresolved` када основни каталог не може да се прочита (плитак
клон без основне референце), по узору на `check-openapi-breaking`.

### Посао: `i18n`

Пуна матрица i18n провере (по један посао за сваки локал). Цео посао је саветодаван.

| Скрипта                         | Проверава                   | Блокирајуће                                              |
| ------------------------------- | --------------------------- | -------------------------------------------------------- |
| `validate_translation.py quick` | Потпуност превода по локалу | **Саветодавно** (`continue-on-error: true` за цео посао) |

### Посао: `pr-test-policy`

Покреће се само за захтеве за спајање.

| Скрипта                | Проверава                                                                                                                                   | Блокирајуће |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check:pr-test-policy` | PR-ови који мењају продукциони кôд у `src/`, `open-sse/`, `electron/` или `bin/` морају да укључе или ажурирају тестове (Строго правило #8) | Да          |
| `check:test-masking`   | Измењене тест-датотеке не смањују укупан број тврдњи нити додају таутологије `assert.ok(true)`                                              | Да          |
| `check:pr-evidence`    | Тело PR-а наводи доказе о тестирању/VPS-у за измену (аутоматизује Строго правило #18 претрагом текста PR-а — крхко, погледајте Backlog)     | Да          |

### Посао: `test-vitest`

Покреће се након `build`. Неуспех блокира спајање.

| Пакет            | Проверава                                                 | Блокирајуће                                                                                                  |
| ---------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP сервер (110 алатки), autoCombo, кеш — vitest покретач | Да                                                                                                           |
| `test:vitest:ui` | Тестови UI компоненти — vitest покретач                   | **Блокирајуће** — постојећи неуспеси су изричито изузети у `vitest.config.ts`; нови неуспеси обарају задатак |

### Ноћни токови рада (планирани, саветодавни)

Они се покрећу према cron распореду (и путем `workflow_dispatch`), никада за PR-ове. Сви су саветодавни.

| Ток рада               | Проверава                                                                                                                                                      | Блокирајуће     |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | fast-check тестови својстава са насумичним иницијалним стањем и великим бројем покретања                                                                       | **Саветодавно** |
| `nightly-resilience`   | контрола раста heap меморије, хаотично убризгавање грешака, k6 тестови оптерећења/дуготрајног рада                                                             | **Саветодавно** |
| `nightly-llm-security` | promptfoo заштита од убризгавања (режим блокирања) + garak пробе (прескачу се без тајне добављача)                                                             | **Саветодавно** |
| `nightly-schemathesis` | фузинг OpenAPI уговора (schemathesis) над активним OmniRoute-ом помоћу `docs/openapi.yaml` — открива кршења спецификације / необрађене грешке 500 (Фаза 8 B.4) | **Саветодавно** |
| `nightly-mutation`     | Stryker резултат мутационог тестирања над брзом траком јединичних тестова — преживели мутанти откривају слабе провере                                          | **Саветодавно** |
| `nightly-compat`       | матрица компатибилности Node механизма у свим подржаним опсезима `engines.node`                                                                                | **Саветодавно** |

Основне вредности перформанси (heap, TTFB, време изградње) се бележе, али не представљају услов: погледајте [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

1. Додајте коментар са образложењем.
2. Наведите референцу на issue за праћење (нпр. `// #3498 — Phase 2 feature, not yet implemented`).
3. Уклоните ставку у истом PR-у који отклања прекршај — застарела ставка која више
   не потискује активан прекршај и сама представља дефект (6A.3 провера застарелих правила ће,
   када буде имплементирана, оборити контролу због ставке на листи дозвољених изузетака без одговарајућег прекршаја).

**Немојте** додавати ставке на листу дозвољених изузетака да би тестови брже прошли. Успешна контрола уз све дужу
листу дозвољених изузетака ствара лажан осећај квалитета.

### Када контрола падне на вашем PR-у

1. **Пажљиво прочитајте излаз контроле** — он тачно наводи која датотека или симбол крши
   правило.
2. **Отклоните прекршај** — већина контрола су детерминистичке провере система датотека које пролазе чим
   код буде исправан.
3. **Ако је прекршај већ постојао** (тј. нисте га ви увели, али га контрола сада
   обухвата): додајте ставку на листу дозвољених изузетака са коментаром који садржи образложење и issue за праћење.
4. **Ако је контрола типа ratchet** (покривеност, ESLint упозорења, дуплирање, сложеност):
   ваша измена је погоршала метрику. Отклоните основни проблем или, у ретким случајевима, покрените
   `npm run quality:ratchet -- --update` ако је измена намерна и погоршање метрике
   прихватљиво — али документујте разлог у опису PR-а.
5. **Саветодавне контроле** (`continue-on-error: true`) су информативне — оне не блокирају
   спајање, али се приказују у CI сажетку. Ипак их исправите.

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

## Заостатак рационализације (ROI преглед — Фаза 9 Талас 3)

Овај инвентар је усаглашен са `ci.yml` 2026-06-17 (претходна верзија је изоставила
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). ROI преглед усаглашеног скупа
идентификовао је следеће кандидате за рационализацију. **Спајања су механичке CI
измене; укључивања/уклањања су одлуке о политици резервисане за оператера.** Ништа од наведеног
још није примењено.

**Такође није документовано изнад** (саветодавно, слаб сигнал): посао `docs-lint`
(markdownlint + Vale, цео посао има `continue-on-error`) и самостални токови рада скенера
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` се налази у
`quality-baseline.json`, али није повезан са блокирајућим механиз­мом постепеног пооштравања у `ci.yml` — метрика је
тренутно неповезана.

### Спајање / дедупликација (механички, мањи ризик)

Сваки кандидат је проверен у односу на активно стање контролних механизама 2026-06-17 (веруј, али провери);
испоставило се да неколико „очигледних“ спајања скрива дуг и **нису** чисте директне замене.

- **`check:docs-sync` се извршава два пута** — самостално у послу `lint`, а затим поново унутар `check:docs-all` (`docs-sync-strict`) и husky pre-commit hook-а. ✅ **ЗАВРШЕНО** — самостално позивање у `lint` је уклоњено.
- **CVE скенирање** — ❌ **НИЈЕ чисто спајање.** `audit:deps` блокира критична упозорења и непотпуне провере у свих пет lockfile-ова, док упозорења високог нивоа пријављује као упозорења у складу са тренутном политиком; `check:vuln-ratchet` (osv) пада само при _регресији_ у односу на верзионисану основну вредност и одбацује мерења која недостају када су обавезна. Различита семантика — уклањањем `audit:deps` изгубили би се апсолутни контролни механизам за критичне проблеме и независне потврде провере пакета. Задржати оба.
- **Откривање циклуса** — ✅ **ЗАВРШЕНО** (#15159 G-01/G-02). Стари текст је овде називао `check:cycles` „зеленим, ручно одабраним“ контролним механизмом и оправдавао његово задржавање као блокирајућег јер је `check:circular-deps` (dpdm) пријављивао 91 циклус. То зелено стање било је **лажно зелено**: `check:cycles` је скенирао 5 поддиректоријума (450 датотека), препознавао само статичке `import|export … from` изразе и одбацивао сваки `@/` и `@omniroute/open-sse/` спецификатор, па није могао да види циклусе динамичког увоза и алијаса који су доминирали репозиторијумом. Исправљено: контролни механизам сада обилази `src` + `open-sse` (5023 датотеке), прикупља спецификаторе из TypeScript AST-а (тако да се `import("…")` рачуна, а `typeof import("…")` на позицији типа не рачуна) и разрешава tsconfig `paths`. Проналази **14** циклуса, а не 0. Пошто 14 постојећих циклуса не може да се исправи у PR-у контролног механизма, `check:cycles` је сада **механизам постепеног пооштравања** (`--ratchet`, горња граница `metrics.cycles.value = 14` у `quality-baseline.json`, `direction: down`) — блокира сваку _регресију_, а број може само да опада. CI покреће `npm run check:cycles:ratchet`. Постепено смањивање се спроводи уз **A-01**. `check:circular-deps` (dpdm) остаје саветодаван као шире друго мишљење.
- **Сложеност** — ✅ **ЗАВРШЕНО** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): један ESLint пролаз, бројање према ruleId-у како би основне вредности за цикломатску сложеност и максимални број редова остале независне од основних вредности когнитивне сложености; појединачни `check:complexity` / `check:cognitive-complexity` остају за локални `--update`.
- **`/api` заштита од халуцинација** — ✅ **ЗАВРШЕНО** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): један FS инвентар за `src/app/api`, openapi-routes + docs-symbols и даље извештавају независно; појединачне провере остају за локална покретања.
- **`check:node-runtime` се извршава у 11 послова** — ⚠️ **низак ROI.** Сваки се извршава на засебном runner-у, а провера траје <1s; укупна уштеда је ~10s, наспрам губитка јефтине заштите по послу. Није вредно измена.
- **`typecheck:noimplicit:core` у CI lint-у** — ✅ **уклоњено из lint посла** (било је саветодавно уз `continue-on-error`); блокирајућу површину типова чине `typecheck:core` + `check:type-coverage`. Локална скрипта је задржана.

### Укључити / одлучити (политика оператера)

- `check:openapi-security-tiers` (саветодавно) — ❌ **НЕ МОЖЕ се једноставно укључити.** Завршава се кодом 0, али упозорава да неколико `traffic-inspector` рута под `LOCAL_ONLY_API_PREFIXES` нема анотацију `x-loopback-only: true`. Његово принудно спровођење најпре захтева додавање тих анотација у `openapi.yaml`.
- `typecheck:noimplicit:core` (саветодавно) — у великој мери га замењује блокирајући механизам постепеног пооштравања `check:type-coverage`. Претворити га у механизам постепеног пооштравања или уклонити сувишни други `tsc` пролаз.
- `test:vitest:ui` (сада **блокирајуће**) — постојећи неуспеси су изричито изузети у `vitest.config.ts` уз `// #8618` коментаре за праћење; нови неуспеси обарају посао.
- `check:secrets` (gitleaks, блокирајући механизам постепеног пооштравања) — тренутна горња граница је `metrics.secretFindings` у `quality-baseline.json`. Сваки изузетак захтева оправдан унос у `.gitleaks.toml`; недоступно мерење је НЕПОТПУНО. Скенирање допуњује GitHub-ово изворно скенирање тајни и `check:public-creds`.
- `check:pr-evidence` (блокирајуће, претражује прозу тела PR-а помоћу grep-а) — висок ризик од лажно позитивних резултата; уклањање слаби примену строгог правила бр. 18, па је ово истинска одлука о политици.
- `semgrep` (самостално саветодавно) — преклапа се са CodeQL-ом за OWASP породице; повезати његову основну вредност са механизмом постепеног пооштравања или га уклонити.

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
