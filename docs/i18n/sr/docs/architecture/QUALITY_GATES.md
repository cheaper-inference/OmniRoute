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

## Инвентар капије и профили извршења

### Пријем кандидата

Токови рада CI и Куалити Гатес сваки емитују стабилну пресуду: `Gate / CI` и `Gate / Quality`. Њихова верзионисана политика пријема набраја сваки претходни посао према потреби или као саветодавни. Применљиви тражени посао мора успети: недостајући, отказани, прескочени, на чекању и непознати резултати не могу успоставити PASS. Важећа класификација само за документе или само за каталог може учинити траку кода неприменљивом; обичан нацрт PR није прихваћен кандидат. `hotfix` ознака не одустаје од доказа.

Оба тока рада покривају PRs у main/release гране, потискује у `main`, ручно отпремање и догађаје спајања групе. Пусх, диспатцх и спајање група покрећу пун избор. Поуздани нацрт реда Мергифи такође покреће применљиве `full-code`/`full-code-e2e` послове; обични PRs их прескочи. Пре ручног спајања, покрените комплетно слање тачног кандидата. Притисци на `release/**` не покрећу ове токове посла; Релеасе-Греен посматра спојену базу одвојено (`docs/ops/RUNNER_BOX.md` → Хостед лане). Форкс и групе за спајање користе хостоване тркаче за послове који иначе бирају сами хостоване тркаче; довољан хостовани капацитет мора бити верификован пре увођења.

Сваки JSON рачун идентификује одјављени SHA, покретање и покушај тока посла. CLI одбацује checkout/event SHA неусклађеност. Тестови тока посла везују чланство у политици за `needs` листу за посао пресуде, тако да нова или уклоњена трака не може тихо нестати. Потврде покривају сопствени ток посла, а не објављивање, примену или унутрашње делове постојећег саветодавног скенера. Извршавање применљивих провера захтеваних у правилима огранка је посебна административна промена; дефинисање њихових послова само по себи не штити грану.

`API Route Typecheck` је независна провера тока посла, изван збирних пресуда и статичког профила локалног пуног посматрача. Прегледајте његов резултат посебно за тачног кандидата. `.github/workflows/api-route-typecheck.yml` ради на PRs у `main` или `release/**`, гура у било коју породицу грана, ручно отпремање и `merge_group` догађаје типа `checks_requested`. Нема филтер путање. Обједините групе проверите `merge_group.head_sha`; остале догађаје погледајте `github.sha`. Сви догађаји користе исте API дијагностичке тестове и тестове јединице капије. PR базни ретаргети захтевају нову проверу; body/title измене користе назив `Admission not requested / API Route Typecheck` само за посматрање и не могу заменити проверу пријема.

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

### DAST koristi provereni build iz CI-ja

Obavezni CI posao `dast-smoke` poziva `.github/workflows/dast-smoke.yml` posle `build`. Prati isti izbor prema kodu i statusu nacrta kao build, uključujući podržane PR-ove iz forkova, PR-ove prema granama izdanja i grupe spajanja. DAST posao koji nedostaje, nije uspeo, otkazan je ili neočekivano preskočen blokira `Gate / CI`. Ponovno upotrebljivi radni tok nema nezavisan okidač za PR/ručno pokretanje; ručna validacija koristi pokretanje CI-ja kako bi build i potrošač ostali unutar istog izvođenja.

`scripts/ci/next-build-provenance.mjs` zapečaćuje celi artefakt Next njegovim sažetkom tar arhive, repozitorijumom/događajem/izvođenjem, pokušajem proizvođača, head/base/checkout/tree, identitetima radnih tokova, datotekom zaključavanja, tačnom verzijom/ABI-jem Node, platformom i bundlerom. DAST bira nepromenljivi ID artefakta iz `needs.build.outputs`, zahteva proveru sažetka preuzimanja i nezavisno upoređuje hash ZIP-a sa sažetkom proizvođača pre izdvajanja njegova dva dozvoljena člana putem `scripts/ci/unpack-ci-build.py`. Manifest i tar arhiva takođe moraju odgovarati nezavisnim izlazima proizvođača pre izdvajanja stabla Next. Nikada ne traži poslednji uspešni build grane. Delimično ponovno izvođenje može koristiti isti pokušaj proizvođača ako se njegov ID i svi ulazi još podudaraju; potvrda beleži oba pokušaja.

Potrošač ostaje na hostanom Linux runneru sa ovlašćenjem samo za čitanje repozitorijuma i bez tajni repozitorijuma. Instalira tačnu verziju Node proizvođača, zatim sastavlja CLI uz `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` odbija nedostajući samostalni server pre bilo kakvog zamenskog builda; uobičajeni lokalni CLI buildovi zadržavaju postojeći zamenski postupak. Spremnost servera, Schemathesis i promptfoo moraju svi uspeti unutar nepromenjenog ograničenja posla od 25 minuta. Potvrda o poreklu dokazuje identitet i bajtove ulaza, a ne uspešno DAST skeniranje. Istek artefakta, prekid runnera ili neuspešan skener ostaju nepotpuni ili neuspešni dokazi; savetodavni omotač ne može ih pretvoriti u PASS.

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

### Потврде о напретку извршавања јединичних тестова

Заједничка команда `test:unit:ci:shard` бележи фазе `primary`, `dashboard` и `serial`
помоћу `scripts/ci/unit-progress-reporter.mjs`. Уобичајени извештај о тестирању остаје
доступан. Засебна потврда која садржи само метаподатке бележи почетак и завршетак сваке датотеке,
док сигнал активности на сваких 30 секунди наводи датотеке које су и даље активне и њихово протекло време. Бележе
се само изричито дозвољени метаподаци о извршавању; описи тестова, излаз, тела грешака и целокупно
окружење не серијализују се.

CI чува JSONL датотеке као `unit-progress-ci-<run>-<attempt>-<shard>`. Истек временског ограничења посла може спречити касније отпремање;
већ емитовани сигнали активности остају дијагностички доказ. Недостајући сигнали активности такође могу указивати
на блокиран или прекинут процес извршиоца. Ове потврде задржавају постојећи избор тестова,
конкурентност, рокове и излазни статус; оне не представљају одлуке о прихватању кандидата.

### Inventar statičkog skeniranja

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

### Здравствена исправност документације објављене базе

`.github/workflows/i18n-base-health.yml` посматра стање документације након одабраних гурања у `main` и `release/v*` и приликом ручног слања. Његови филтери покривају документацију, роот Маркдовн, `llm.txt`, превод state/configuration и релевантне и18н алате. Један `Published base documentation health` посао користи хостовани Убунту и рок од пет минута. Он врши валидацију само за читање и пише дијагностичку потврду без инсталације зависности, превода или усвајања стања.

`scripts/i18n/check-base-health.mjs` захтева нулту недоследност изворног хеша, циља који недостаје, хеш циља, застарелог превода и кеша одељака. Такође потврђује тренутни основни document/locale обим и његово забележено порекло. Неважећи контекст, непотпуна покривеност или прекинута провера производи `INCOMPLETE`; потврђени дрифт производи `FAIL`. Оба враћају неуспешан излазни статус. Потврда је везана за одјаву SHA, ток посла, покретање и покушај, и задржава се као `i18n-base-health-<sha>-<run>-<attempt>`.

Ово је независно посматрање објављене базе. Не додаје догађај PR или групе спајања, потребну PR проверу, нпм алиас или члана профила статичког скенирања. Основна провера такође блокира свих пет класа у апсолутном режиму. Обична припрема PR остаје одвојена од пријема. Успешно отпремање не може да претвори неуспели здравствени резултат у PASS.

Обичан PR користи `--preflight` са основним извештајем који генерише `--baseline-evidence`. Може оставити енглески извор на чекању само када су комплетан запис превода и стварни циљни бајтови непромењени у односу на тачну базу. Недоследности новог циља или кеша секција и даље блокирају, а непотпуни докази не могу да овласте припрему. Извештај разоткрива `preparationPending` и `mergeReady` одвојено: успешна припрема не чини преводе на чекању спремним за спајање. Освежите погођена огледала у састављеном кандидату пре пријема. Кандидат за ред од поверења за Мергифи, `merge_group`, потискивање гранања и ручна покретања CI а користе апсолутну проверу, без `--warn` или опроштаја наслеђених неуспеха. Недостајући циљни хешови и обим смањен избрисаним снимљеним основним датотекама не могу произвести успешну апсолутну пресуду.

### Издајте PR брзи пут (`quality.yml`)

`.github/workflows/quality.yml` допуњује CI на main/release PRs, гура у `main`, отпрема и спаја групе. PRs користи брзе провере филтриране путем. Трајно онемогућена дуплирана верзија је уклоњена; прави build/package/boot чекови остају у CI.

| Јоб                                              | Обим                                                                                                                                                                                               | Блокирање              |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API документи рефс и доцс-алл                                                                                                                                                       | Да                     |
| `Fast Quality Gates`                             | Цоде PRs; статичке провере, провера типа, провера типа на контролној табли, тестирања јединица са утицајем                                                                                         | Да                     |
| `Forgotten sibling tests`                        | Цоде PRs; промењени модули праћени до статичких потрошача и тестова кандидата; барел и путање динамичког увоза се пријављују као саветодавна дијагностика, са изузецима листе дозвољених референци | **Саветодавно**        |
| `No new ESLint warnings`                         | Цоде PRs; штитник од длачица који је свестан супресије                                                                                                                                             | Да, укључујући виљушке |
| `Merge integrity (changelog + generated skills)` | Нон-драфт PRs; дневник промена и синхронизација генерисаних вештина                                                                                                                                | Да, укључујући виљушке |

#### Извештај о заборављеним тестовима

`npm run check:forgotten-sibling-tests` поново користи резолвер увоза иза мапе тест-утицаја. За сваки промењен производни модул, он извештава о детерминистичким `changed module/symbol -> static consumer -> candidate sibling test` ланцима када тест кандидата изостане из разлике захтева за повлачењем. Резиме Маркдовн и JSON резултат се задржавају као артефакт `forgotten-sibling-tests` тока посла за калибрацију пре било каквог увођења блокирања.

Поновни извоз барела и динамички увоз су само дијагностика резолуције; никада не стварају блокирајући налаз. Прегледани изузеци уживо у `config/quality/forgotten-sibling-allowlist.json`. Сваки унос мора именовати тест потрошача и кандидата, дати специфично образложење и повезати GitHub проблем или захтев за повлачење. Неуспешно затварање погрешно обликованих уноса. Изузеци не могу потиснути обрисани тест кандидата или дифф који додаје `.skip`/`.todo`; слабљење тврдњи и друго маскирање остају у власништву `check:test-masking` капије која независно блокира.

### Посао: `lint`

Pokreće se za svaki PR ka grani `main`. Blokira spajanje u slučaju neuspeha.

| Скрипта (`npm run ...`)           | Проверава                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Блокирајуће                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| `check:node-runtime`              | Да ли је верзија Node.js-а у подржаном опсегу                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Да                                          |
| `check:cycles`                    | Цикличне увозе у целом `src/` + `open-sse/` (засновано на AST-у, уз разрешене tsconfig `paths`). Самостално покретање завршава се кодом 1 кад год постоји било који циклус (затворено у случају грешке од #15281) и наводи SCC-ове. `check:cycles:ratchet` (који CI покреће) блокира када број премаши горњу границу `metrics.cycles` у `quality-baseline.json` — тренутно 14, `direction: down`, тако да може само да се смањује (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Да (механизам затезања)                     |
| `check:boundary`                  | Спрегу `open-sse → src`: јединствене увозе из датотеке у датотеку, из механизма у апликацију (`scripts/quality/measure-boundary.mjs`; листа веза представља заостале ставке за отклањање проблема раздвајањем језгра/модула v4). Самостално покретање = саветодавни извештај (исто као `quality:boundary`). `check:boundary:ratchet` (који CI покреће, а налази се и у петљи механизма затезања за брзе контроле у `quality.yml`) блокира када број премаши горњу границу `metrics.boundaryOpenSseToSrc` у `quality-baseline.json` — почетно постављену на измерених 771, `direction: down`; `--update` је може само смањити; на PR-овима је релативно у односу на основну грану (`--base-ref`, погледајте испод)                                                                                                                                                                                                                                                                                                                    | Да (механизам затезања)                     |
| `check:route-validation:t06`      | Да ли су Zod шеме присутне на свим рутама (политика нивоа 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Да                                          |
| `check:any-budget:t11`            | Број `@ts-expect-error // any` не премашује буџет (ниво 11, catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Да                                          |
| `check:provider-consistency`      | Сваки провајдер у `providers.ts` има одговарајући унос у `providerRegistry.ts` (и обрнуто, у оквиру листе дозвољених ставки)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Да                                          |
| `check:model-lifecycle`           | Три ручно одржаване табеле рутирања остају усклађене са снимком стања животног циклуса који је укључен у репозиторијум (#11503): `FITNESS_TABLE` (`taskFitness.ts`) не оцењује ниједан повучени идентификатор који `REGISTRY` може да рутира; сваки циљ из `BUILT_IN_ALIASES` присутан је у `REGISTRY` и одсутан из снимка повучених идентификатора; сваки повучени идентификатор који је још увек у `REGISTRY` прослеђује се или је наведен у `allowedRetiredInCatalog`; и ниједан извор или циљ из `DEFAULT_DEGRADATION_MAP` није означен као повучен у том снимку. Ово не доказује да модел тренутно опслужује активни узводни систем. Ради ван мреже — пореди са `config/quality/model-lifecycle.json`, који се ручно освежава помоћу `npm run quality:refresh-model-lifecycle` (захтева мрежу; није укључено у CI). `allowedRetiredInCatalog` је механизам за постепено смањивање: унос додајте само уз задатак за праћење.                                                                                                     | Да                                          |
| `check:fetch-targets`             | Сваки `fetch("/api/...")` у клијентском `src/` разрешава се на стварни `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Да                                          |
| `check:deps`                      | Све зависности које се могу инсталирати помоћу `npm install` из сваке датотеке `package.json` у репозиторијуму налазе се у `dependency-allowlist.json`; нови пакети без фиксиране верзије или пакети који представљају slopsquatting означавају се                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Да                                          |
| `audit:deps`                      | npm провера свих пет независних lock датотека (корен, Electron, OpenCode додаци v1/v2 и провајдер). Критична упозорења блокирају; упозорења високог нивоа остају видљива. Недостајуће или неуспеле провере имају статус INCOMPLETE и блокирају; хешеви lock датотека и извештаји задржавају се за сваки опсег.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Да                                          |
| `check:lockfile`                  | Интегритет датотеке `package-lock.json` — https регистар, хешеви интегритета, без замене хостова                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Да                                          |
| `check:licenses`                  | Листа дозвољених SPDX лиценци за продукционе зависности                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Да                                          |
| `check:tracked-artifacts`         | Без артефаката изградње / комитованих симболичких веза ка `node_modules` (такође се покреће у husky pre-commit куки; pre-push је намерно минималан — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Да                                          |
| `check:ai-attribution`            | Без AI/bot `Co-Authored-By` завршног реда или подножја о AI генерисању у PR комитовима, наслову или телу — Строго правило #16 (у `quality.yml` петљи брзих провера за PR→`release/**` — чита садржај догађаја, не ради ништа ван PR-ова — и корак само за PR у `ci.yml` lint провери за PR→`main`; такође husky `commit-msg` кука; људски коаутори су дозвољени; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:vitest-exclusions`         | Свако Vitest изузеће наводи проблем за праћење и налази се у `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Да                                          |
| `check:file-size`                 | Изворне датотеке (`.ts`/`.tsx` у `src/`, `open-sse/`, `electron/`, `bin/`) остају у оквиру `cap`, а тест датотеке (`*.test.ts(x)`) у оквиру `testCap`; датотеке замрзнуте у `file-size-baseline.json` (`frozen` / `testFrozen`) не смеју да премаше своју забележену величину                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Да                                          |
| `check:error-helper`              | Одговори о грешкама у извршиоцима/руковаоцима користе `buildErrorBody()` / `sanitizeErrorMessage()` (Строго правило #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Да                                          |
| `check:migration-numbering`       | SQL датотеке миграција су нумерисане узастопно, без празнина или дупликата                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Да                                          |
| `check:public-creds`              | Нема дословних OAuth вредности `client_id`/`client_secret` нити Firebase Web кључева изван `publicCreds.ts` (Строго правило #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Да                                          |
| `check:db-rules`                  | Нема сировог SQL-а изван модула у `src/lib/db/`; нема збирних увоза из `localDb.ts` (Строга правила #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Да                                          |
| `check:known-symbols`             | Извршиоци добављача, стратегије усмеравања и преводиоци регистровани у својим табелама отпремања подударају се са датотекама на диску — нема неповезаних или недекларисаних симбола                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Да                                          |
| `check:route-guard-membership`    | Свака рута која покреће подређени процес класификована је помоћу `isLocalOnlyPath()` (Строга правила #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Да                                          |
| `check:test-discovery`            | Свака `*.test.ts` / `*.spec.ts` датотека у репозиторијуму обухваћена је бар једним покретачем тестова (ratchet: листа неповезаних датотека у `test-discovery-baseline.json` може само да се смањује)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Да                                          |
| `check:test-tla-order`            | Ниједна `node:test` датотека у `tests/unit` не региструје тест, наилази на `await` највишег нивоа, а затим региструје још тестова (#18045; ratchet: `test-tla-order-allowlist.json` може само да се смањује)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Да                                          |
| `check:agent-skills-sync`         | Генерисани артефакти вештина агента подударају се са својим изворним каталогом (без одступања)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:provider-asset-provenance` | Логотипи/ресурси добављача имају забележен унос о пореклу                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `lint:json`                       | JSON конфигурационе датотеке могу да се рашчлане и задовољавају правила провере репозиторијума                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `typecheck:core`                  | TypeScript компилација без грешака (само саветодавна упозорења)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Да                                          |
| `typecheck:noimplicit:core`       | Строги `noImplicitAny` — усмерено на будућност; многим већ постојећим местима позива и даље су потребне анотације                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | **Саветодавно** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ограничен на `src/app/(dashboard)/**` (#7033) — пажљиво одабрана листа од 27 дозвољених датотека у `typecheck:core` не укључује ниједан TSX са контролне табле, а ни `next build` их никада не проверава по типовима (`next.config.mjs` поставља `ignoreBuildErrors: true`), па су регресије напуштених идентификатора у њима (#6625/#6909) биле невидљиве за CI. Пореди се са замрзнутом полазном основом броја грешака по датотеци и TS коду (`config/quality/dashboard-typecheck-baseline.json`, исти образац примене застарелости као код `check:known-symbols`) — само НОВЕ грешке изнад броја у полазној основи обарају проверу; смањите полазну основу помоћу `--update` када се исправи већ постојећа грешка.                                                                                                                                                                                                                                                                                                          | Да                                          |
| `check:build-typecheck`           | Провера типова продукционе апликације у целини над `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), коју не покривају површинска листа од 27 датотека у `typecheck:core` нити dashboard провера. Разлике се упоређују са `config/quality/build-typecheck-baseline.json`; нови или повећани број по пару (датотека, код) обара проверу, а мањи број тражи од вас да смањите основну вредност. `--update` одбија рад док извршавање садржи нови или повећани пар, осим ако није прослеђен `--force-regressions`, а одбија и ново утишану датотеку осим ако није прослеђен `--force-nocheck`, тако да су проширивање основне вредности ради добијања успешног резултата и давање трајног утишавања две одвојене, свесне радње. Самостални `--force` се одбија. Такође скенира опсег изградње у потрази за `@ts-nocheck` у односу на `config/quality/ts-nocheck-baseline.json`, јер датотека која га користи не пријављује никакву дијагностику и иначе би била невидљива свим проверкама. | Да                                          |

#### Два програма за проверу типова дају различите одговоре

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) и `check:build-typecheck` компајлирају различите програме са различитим
опцијама, па иста датотека може бити без грешака у једном, а препуна грешака у другом.

`tsconfig.build.json` поставља `"strict": false`, па је `noImplicitAny` искључен. Основна
конфигурација компајлира курирану листу од 27 датотека са строжим опцијама и прати граф
увоза сваке ставке, па се датотеке које се никада не појављују у програму изградње ипак
тамо проверавају.

Последица је важна када процењујете да ли је датотека типизирана: **нула дијагностика
под `check:build-typecheck` не значи нула**. Уклањање `@ts-nocheck` из 26 датотека
показало је да је 23 од њих без грешака у програму изградње; код шеснаест од њих појавило
се око 120 грешака за implicit-any у строгом програму. Проверите оба пре него што датотеку
прогласите чистом.

### Задатак: `quality-gate`

Покреће се након `test-coverage`. У случају неуспеха блокира спајање.

| Скрипта                      | Проверава                                                                                                                                                                       | Блокирајуће                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `quality:collect`            | Генерише `quality-metrics.json` (број ESLint упозорења, покривеност из обједињеног извештаја сегмената)                                                                         | Да (претходи механизму постепеног пооштравања) |
| `quality:ratchet`            | Ниједна метрика у `quality-baseline.json` није регресирала (ESLint упозорења ≤ полазна основа; покривеност ≥ полазна основа)                                                    | Да                                             |
| `check:duplication`          | Дуплирање кода (jscpd@4) не премашује полазну основу у `quality-baseline.json`                                                                                                  | Да                                             |
| `check:complexity`           | Цикломатска сложеност на нивоу датотеке не премашује ограничење (основна ESLint правила `complexity` + `max-lines-per-function`)                                                | Да                                             |
| `check:cognitive-complexity` | Постепено пооштравање когнитивне сложености (`eslint-plugin-sonarjs`) — засебно покретање ESLint-а; CI покреће обе провере обједињене у један корак `check:complexity-ratchets` | Да                                             |
| `check:dead-code`            | Постепено пооштравање за некоришћене извозе / датотеке (knip) не регресира у односу на полазну основу                                                                           | Да                                             |
| `check:compression-budget`   | Буџет референтног теста компресије — минималне уштеде токена по механизму не смеју да регресирају                                                                               | Да                                             |
| `check:type-coverage`        | Постепено пооштравање процента типизираног кода (`type-coverage`) не регресира; углавном обухвата `typecheck:noimplicit:core`                                                   | Да                                             |

### Poslovi: `codeql-scan` i `codeql-admission`

`codeql-scan` proizvodi sve konfigurisane kategorije analize. Posle što taj posao uspe, `codeql-admission` proverava njegove tačno određene učitane rezultate i ratchet upozorenja kandidata. Oba su obavezne zavisnosti za `Gate / CI`, uključujući kandidate koji menjaju samo dokumentaciju. Zahtevi za administrativnu aktivaciju i canary opisani su niže pod „CodeQL ratchet”.

| Skripta                | Proverava                                                                                                                                                                                             | Blokira |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:codeql-ratchet` | Ref/SHA kandidata i sve konfigurisane kategorije analize moraju biti aktuelni pre ratcheta upozorenja; nedostatak dokaza blokira. Globalni inventar ostaje odvojen — pogledajte „CodeQL ratchet” niže | Da      |

### Posao: `quality-extended`

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

### Посао: `docs-sync-strict`

За захтеве за повлачење за `main` или `release/**`, овај посао се покреће само за кандидате који нису нацрти (или поуздани ред) који су класификовани као промене документације или кода. Такође ради на догађајима који нису ПР CI ; Гурни окидач овог тока посла покрива само `main`, а не `release/**`. Корак који излази из различитог од нуле блокира посао; налази само за извештаје и документовани изузеци у наставку не.

| Скрипта                        | Проверава                                                                                                                                                                                                                                                                                                                                                                                                                               | Блокирање                                                                                                                    |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Мета-капија која редом покреће 7 поткапија наведених испод                                                                                                                                                                                                                                                                                                                                                                              | Да                                                                                                                           |
| ↳ `check:docs-sync`            | Конзистентност Package/OpenAPI/CHANGELOG верзије, тачна `llm.txt` огледала, преведене CHANGELOG section/size инваријанте и одсуство замењених дупликата докумената                                                                                                                                                                                                                                                                      | Да                                                                                                                           |
| ↳ `check:docs-frontmatter`     | Састављене странице са документацијом носе важеће наслове фронтматера                                                                                                                                                                                                                                                                                                                                                                   | Да                                                                                                                           |
| ↳ `check:docs-counts`          | Високопоуздане инваријанте бројања су строге; хеуристичке провере броја датотека упозоравају само ако скрипта не прими `--strict` ( CI мета-капија га не прође)                                                                                                                                                                                                                                                                         | Строго блокирање нивоа; меки ниво саветовања                                                                                 |
| ↳ `check:env-doc-sync`         | Извор енв чита, `.env.example` и `docs/reference/ENVIRONMENT.md` се слажу након експлицитних листа дозвољених за игнорисање, само за документе и само за енв                                                                                                                                                                                                                                                                            | Да, изван документованих листа дозвољених                                                                                    |
| ↳ `check:deprecated-versions`  | Пријављује потенцијалне застареле верзије ван безбедних историјских контекста и застареле датуме ажурирања, искључујући занемарене документе                                                                                                                                                                                                                                                                                            | Упозорење о тренутном CI ожичењу (`--strict` није прошао)                                                                    |
| ↳ `check:doc-links`            | Интерне везе за смањење вредности у документима се решавају у стварне датотеке (`[text]`/`(path)` образац)                                                                                                                                                                                                                                                                                                                              | Да                                                                                                                           |
| ↳ `check:fabricated-docs`      | Руте, енв варс, CLI команде, називи кукица и путање датотека цитирани у документима постоје у бази кода. Чврста капија преко `--strict`; софт-фаил без заставе.                                                                                                                                                                                                                                                                         | Да (преко `--strict` у CI)                                                                                                   |
| `check:cli-i18n`               | Кључеви `t()` које CLI користи постоје у `en`; `pt-BR` задржава сваки одељак највишег нивоа; `zh-CN` и `zh-TW` садрже сваки кључ из `en`                                                                                                                                                                                                                                                                                                | Да                                                                                                                           |
| `check:openapi-coverage`       | OpenAPI спецификација покрива најмање ratchet доњу границу стварних рута                                                                                                                                                                                                                                                                                                                                                                | Да                                                                                                                           |
| `check:openapi-security-tiers` | Декларисане ознаке `x-loopback-only`/`x-always-protected` морају имати подршку у `routeGuard.ts`; грешке парсера и неслагања у директној провери блокирају. Обрнута провера недостатка `x-loopback-only` под префиксима који дозвољавају само локални приступ даје упозорења, а руте одређене искључиво обрасцима изузете су из те обрнуте провере.                                                                                     | Провере парсера и директне провере блокирају; обрнута провера је саветодавна                                                 |
| `check:openapi-routes`         | Свака путања `/api...` у `openapi.yaml` одговара стварној рути без обзира на разлике у параметрима, након примене образложене листе изузетака `KNOWN_STALE_SPEC`; застареле ставке листе изузетака такође изазивају неуспех                                                                                                                                                                                                             | Да                                                                                                                           |
| `check:docs-symbols`           | Интерне URL референце на `/api/...` у канонским документима који нису огледалне копије одговарају стварној рути или породици рута; изузете су референце на посредничке и узводне сервисе, резервисана места и датотеке, као и образложене ставке `KNOWN_STALE_DOC_REFS`, а застареле ставке листе изузетака изазивају неуспех                                                                                                           | Да                                                                                                                           |
| `i18n translation drift`       | Апсолутни пријем захтева нулту недоследност у извору, недостатку циља, хешу циља, застарелом преводу и кешу одељка. Уобичајена PR припрема може задржати тачне наслеђене доказе или промену на чекању само на енглеском са непромењеним комплетним стањем и циљним бајтовима; њен извештај посебно проглашава спремност за спајање. Недостају хешови циља и некомплетан основни блок доказа. Одсутан кеш застарелог одељка није грешка. | Свих пет класа блокира пријем queue/base ; обична припрема дозвољава само доказани наслеђени или само енглески рад на чекању |

Генерише се дванаест README SVGs под `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` их све регенерише). Сваки од њих има јединични тест за поређење бајтова (`tests/unit/docs/readme-*-svg.test.ts`, посао `test-unit`) који не успева када је урезана датотека застарела, а `check:docs-counts` чита канонске бројеве из својих `<text>` чворова — због чега корак уцртавања чува сваки оцртани низ у датотеци као невидљив `<text>`. SVG провера канонских бројева чита датотеке наведене у `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, плус `public/images/tier-flow-dark.svg` и `tier-flow-light.svg`; тврдње о бесплатном заувек, уносу у каталог, понављајућем скупу и факторима бодовања такође гласе `promise-pillars.svg`, `free-tier-budget.svg` и `strategies-grid.svg`. `free-tier-budget.svg` извлачи своје бројке из живог учитавача каталога, тако да промена на `FREE_MODEL_BUDGETS` или име за приказ провајдера црвени CI док се та датотека не регенерише.

### Job: `i18n-ui-coverage`

| Скрипта                             | Проверава                                                                                                                                                                                                      | Блокирајуће     |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (уграђено) | Покривеност UI i18n кључева је ≥ 65%                                                                                                                                                                           | Да              |
| `check-ui-value-drift` (уграђено)   | Преписана енглеска **вредност** не оставља застарели превод                                                                                                                                                    | Да              |
| `check-new-key-coverage` (уграђено) | **Нови** енглески кључ је преведен у сваком локалу — ознака `__MISSING__:` се одбацује                                                                                                                         | Да              |
| `check-translation-ratio`           | Удео стварних превода по локалу (ставке идентичне енглеском / резервисане вредности / недостајуће ставке ван листе дозвољених) не сме да премаши `config/quality/i18n-translation-baseline.json` + толеранцију | **Блокирајуће** |

Захтева `fetch-depth: 0` — контрола одступања вредности пореди разлике у `en.json` у односу на базу спајања.

#### `check-ui-value-drift` — провера застарелих превода

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

Провере одступања вредности и нових кључева деле једно непроменљиво поређење из
`scripts/i18n/resolve-ui-diff-base.mjs`. Ток рада прослеђује исте SHA вредности основе, врха основе и
кандидата обема проверама. Покретања за PR/преусмеравање основе, push и merge-group користе свој контекст
догађаја. Ручно покретање за кандидатску грану захтева њен тачан отворени PR или експлицитан
улаз `i18n_base_sha`. Ручно или заказано посматрање гране `main` или `release/vX.Y.Z`
без тог улаза пореди последњи commit са његовим првим родитељем; то није ревизија
целокупног наслеђеног дуга превода. Локално покретање захтева експлицитну основу за поређење,
на пример горенаведену команду `BASE_REF`.

Недостајући или двосмислени контекст поређења, нечитљив или неважећи обавезни каталог и
измењен кандидат доводе до статуса `INCOMPLETE` са излазним кодом **2**, укључујући и режим упозорења.
Каталози се читају помоћу `scripts/i18n/read-ui-catalog.mjs`; грешке при читању не замењују се
празним објектима. Ни недоступна основа ни непотпун улаз не утврђују статус PASS.

### Посао: `i18n`

Потпуна и18н матрица валидације (један посао по локалу). Цео посао је саветодавни.

| Скрипта                         | Валидатес                     | Блокирање                                                |
| ------------------------------- | ----------------------------- | -------------------------------------------------------- |
| `validate_translation.py quick` | Комплетност превода по локалу | **Саветодавно** (`continue-on-error: true` на цео посао) |

### Посао: `pr-test-policy`

Ради само на захтевима за повлачење.

| Скрипта                | Валидатес                                                                                                                         | Блокирање |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PRs који мења производни код у `src/`, `open-sse/`, `electron/` или `bin/` мора укључити или ажурирати тестове (тврдо правило #8) | Да        |
| `check:test-masking`   | Промењене тестне датотеке не смањују број нето тврдњи нити додају `assert.ok(true)` таутологије                                   | Да        |
| `check:pr-evidence`    | PR боди цитира test/VPS доказе за промену (механизује Хард Руле #18 греппинг PR — фрагиле, погледајте Бацклог)                    | Да        |

### Посао: `test-vitest`

Захтева задатак за класификацију `changes`. Применљиви делови матрице блокирају спајање у случају неуспеха.

| Пакет            | Проверава                                                 | Блокирајуће                                                                                                  |
| ---------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP сервер (110 алатки), autoCombo, кеш — vitest покретач | Да                                                                                                           |
| `test:vitest:ui` | Тестови UI компоненти — vitest покретач                   | **Блокирајуће** — постојећи неуспеси су изричито изузети у `vitest.config.ts`; нови неуспеси обарају задатак |

### Ноћни радни токови (планирани, саветодавни)

Ови се покрећу по црон распореду (и `workflow_dispatch`), никада на PRs. Сви су саветодавни.

| Воркфлов               | Валидатес                                                                                                                                               | Блокирање       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | брза провера тестова својстава са насумичним почетним + великим бројем покретања                                                                        | **Саветодавно** |
| `nightly-resilience`   | капија раста гомиле, хаос фаулт-ињецтион, к6 load/soak                                                                                                  | **Саветодавно** |
| `nightly-llm-security` | промптфоо ињецтион гуард (режим блока) + зка гарак (прескочено без тајне провајдера)                                                                    | **Саветодавно** |
| `nightly-schemathesis` | OpenAPI уговор фуззинг (шематеза) против живог OmniRoute коришћењем кршења спецификација `docs/openapi.yaml` — површина / необрађених 500с (фаза 8 Б.4) | **Саветодавно** |
| `nightly-mutation`     | Стрикеров резултат тестирања мутација преко брзе јединичне траке — преживјели мутанти на површини слабе тврдње                                          | **Саветодавно** |
| `nightly-compat`       | Матрица компатибилности мотора чворова у подржаним `engines.node` опсегима                                                                              | **Саветодавно** |

Основне линије перформанси (хеап, TTFB, време изградње) се снимају, а не затварају се: видети [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
- **саветодавно** — глобални укупан резултат у односу на замрзнуту основну вредност. Наслеђено одступање никада не обара
  недужан PR; одступање се прати ради исправке током усаглашавања издања и надгледа га
  посао за проверу резервног капацитета.

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

### CodeQL чегртаљка: пријем кандидата и инвентар спремишта

CI поседује пријем кандидата CodeQL кроз експлицитни ланац зависности: `codeql-scan` позива матрицу са четири језика у `codeql.yml`, затим `codeql-admission` покреће `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` захтева оба резултата. Квалитет задржава сопствене нумеричке провере, али не испитује скенер пре него што произвођач заврши; `Gate / Quality` сам по себи није потпуни пријем кандидата. CodeQL остаје неопходан за кандидате само за документе.

Политика у `config/quality/codeql-admission-policy.json` бира Акције, C/C++, JavaScript/TypeScript и Питхон, подразумевани скуп упита, модел удаљене претње и режим изградње без. Префлигхт произвођача одбија запис о активацији на чекању и грана се изван експлицитне циљне листе. Тренутни циљеви су главни и release/v3.8.54. уговор тестови пореде ову коначну листу и окидач за одржавање са верзијом пакета; следеће издање треба да се прегледа укључивање. CI-ов постојећи PR окидач ширег издања је задржан, али неуграђени циљ пријављује HOLD пре екстракције уместо да добије неизмерени PASS.

Сваки матрични посао бележи свој стварни SARIF уплоад ID, језик, категорију, покретање и покушај, идентитет тока посла позиваоца, догађај ref/head/base/merge SHA и хеш политике. Зависни посао преузима само признанице овог покретања и потврђује сажетке артефаката. Захтева све четири категорије, успешног продуцента и завршену обраду сваког тачног отпремања. Користи API-ов сариф_ид филтер, а не најновију анализу пронађену на грани. Делимичне репризе могу поново користити успешне категорије из ранијег покушаја исте серије и кандидата, чувајући покушај продукције; неуспели тренутни произвођач не може поново да користи претходне зелене доказе.

CodeQL акција чека на обраду, али њена закачена имплементација може упозорити и наставити након неуспеха читања статуса или исцрпљеног чекања. Пријем стога поново потврђује обраду. Недостајуће категорије, обрада на чекању, неуспели или отказани послови, застарели идентитет, непотпуна пагинација или недоступан APIs производи HOLD и излаз 2. Не остаје фиксно чекање за независни ток рада скенера. Нескенирани PR не може да прође јер је упит упозорења вратио 0. Измерени број изнад `metrics.codeqlAlerts.value` излази 1; основна линија се не подиже да би апсорбовала упозорења друге гране. [Статус отпремања и тражење анализе](https://docs.github.com/en/rest/code-scanning/code-scanning).

Потврда о пријему бележи отпремање и анализу IDs, категорије, верзије алата, ref/SHA, основне линије и бројеве упозорења. SARIF identity/result број, минимални број правила и тачне инстанце упозорења остају обавезни. PR/analysis идентитети се поново проверавају пре прихватања. Ове провере успостављају покривеност конфигурисане категорије, а не инвентар сваке екстраховане изворне датотеке. C/C++ екстракција без изградње не укључује код генерисан током изградње пројекта. Изузимања извора и даље треба да се прегледају, а за приписивање сарадника потребни су упоредиви докази на основу тачне.

`codeql-maintenance.yml` обезбеђује пусх скенирање са активним ослобађањем и недељни распоред без дуплирања PR/main произвођача. `nightly-codeql-inventory.yml` држи основну линију за читаво складиште одвојено, са `--strict-measurement` и грешком када мерење није доступно. Грациозно прескакање локалног колекционара наслеђа није пријем кандидата. Затезање остаје експлицитни `--update` након верификованог нижег глобалног броја.

Напредни ток посла не сме бити објављен док је подразумевано подешавање конфигурисано: GitHub одбија ту комбинацију. Његова верзионисана политика остаје на чекању док се прегледани административни прелаз не прочита. Пре објављивања, оператор закачи спремиште, head/base/tree, policy/patch/rollback хешове и посматрано стање подешавања; `node scripts/quality/codeql-producer.mjs verify-admin-readback` проверава достављене очекиване и стварне JSON записе. Ово је техничка заштита, а не одобрење оператера или замена за преузимање нових очитавања. PR токен никада не захтева приступ администрацији. Увођење и свака промена скенера захтевају одвојено читање плус прави доказ компатибилности PR, форк-а и група за спајање.

Форкс користи хостоване тркаче, одјављивање без трајних акредитива, без install/build пројекта у произвођачу и без наслеђених тајни спремишта. GitHub подржава SARIF отпремање за пулл_рекуест догађај са смањеним форк токеном; одобрење за извршење доприноса по први пут остаје политика GitHub. Никада не користите пулл_рекуест_таргет за извршавање непоузданог кода. Потврдите стварне дозволе токена, аналисис_кеи и окружења свих категорија у контролисаном канаринцу пре него што сматрате да је миграција завршена. [Правила за отпремање виљушке](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [конфликтни режими подешавања](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Отпуштања су позив оператера (тврдо правило #14)** — никада не одбацује CodeQL упозорење без евидентирања техничког оправдања у коментару за отпуштање: `won't fix` за захтев упстреам протокола, `used in tests` за тест уређај, `false positive` за средство за дезинфекцију CodeQL не може да види (преседан: `docs/security/ERROR_SANITIZATION.md`).

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
2. Додајте `"check:<name>": "node scripts/check/check-<name>.mjs"` у `package.json` и
   синхронизујте алијас и његову тачну команду у `config/quality/gate-manifest.json`.
   Примените исту синхронизацију када мењате или уклањате постојећи алијас за валидацију.
   Покрените `npm run check:gate-manifest`; pre-commit hook и CI класификација измена
   намећу овај уговор.
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

**Takođe nije dokumentovano iznad** (savetodavno, niske informativne vrednosti): posao `docs-lint` (markdownlint + Vale, celi posao `continue-on-error`) i samostalni radni tokovi skenera `semgrep.yml` / `scorecard.yml`. CodeQL sada ima obavezne poslove proizvođača i prihvata pod `Gate / CI`, uz gore opisane zahteve aktivacije. `semgrepFindings: 0` nalazi se u `quality-baseline.json`, ali nije povezan s blokirajućim ratchetom u `ci.yml` — metrika je trenutno nepovezana.

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
- `check:pr-evidence` (блокирајуће, претражује прозу тела PR-а помоћу grep-а) — висок ризик од лажно позитивних резултата; уклањање слаби примену строгог правила бр. #18, па је ово истинска одлука о политици.
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
