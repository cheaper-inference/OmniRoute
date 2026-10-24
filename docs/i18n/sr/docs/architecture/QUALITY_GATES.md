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

## Inventar gejtova i profili izvršavanja

### Prihvatanje kandidata

Tokovi rada CI i Quality Gates svaki za sebe emituju stabilan ishod: `Gate / CI` i
`Gate / Quality`. Njihova verzionisana politika prihvatanja navodi svaki uzvodni posao
kao obavezan ili savetodavan. Primenljiv obavezni posao mora da uspe: nedostajući,
otkazani, preskočeni, rezultati na čekanju i nepoznati rezultati ne mogu uspostaviti PASS.
Ispravna klasifikacija docs-only ili catalog-only može učiniti traku za kod
neprimenljivom; draft PR nije prihvaćen kandidat. Oznaka `hotfix` ne odriče se dokaza.

Oba toka rada pokrivaju PR-ove ka main/release granama, push-ove na `main`, ručno
pokretanje (dispatch) i događaje merge grupe. Push, dispatch i merge grupa izvršavaju
punu selekciju. Push-ovi na `release/**` ih ne pokreću (2026-10-18): svaka promena je već
izvršila matricu na svom PR-u, a spojena kombinacija je zadatak Release-Green-a
(`docs/ops/RUNNER_BOX.md` → Hostovana traka). Fork-ovi i merge grupe koriste hostovane
runner-e za poslove koji inače biraju self-hosted runner-e; dovoljan hostovani kapacitet
mora biti proveren pre primene.

Svaka JSON potvrda identifikuje odjavljeni (checked-out) SHA, pokretanje toka rada i pokušaj.
CLI odbija nepodudarnost SHA vrednosti između odjave i događaja. Testovi toka rada vezuju
članstvo politike za listu `needs` posla sa ishodom, tako da nova ili uklonjena traka
ne može tiho nestati. Potvrde pokrivaju sopstveni tok rada, a ne publikaciju,
raspoređivanje ili interne delove postojećeg savetodavnog skenera. Aktiviranje oba imena
provera u pravilima grana je posebna administrativna izmena; dodavanje ovih poslova samo
po sebi ne štiti granu.

### Inventar statičkog skeniranja

Verzionisani inventar npm alijasa i članstvo u statičkom skeniranju nalaze se u
`config/quality/gate-manifest.json`. Pokrenite `npm run check:gate-manifest` da biste
potvrdili imena skripti i tačne komande u odnosu na `package.json`; dodavanja, uklanjanja
i odstupanja komandi padaju i na lokalnom hook-u i na poslovima klasifikacije promena u
CI-ju. Alijas nije posao toka rada, instanca matrice niti test slučaj: ovi brojevi se ne
smeju prikazivati kao zamenljivi.

Koristite `npm run quality:scan -- --list` ili `npm run quality:scan:fast -- --list`
da pregledate odabrane alijase bez njihovog izvršavanja. Runner poziva npm ulaznu tačku,
tako da je njegovo izvršno okruženje (uključujući Bun gde je konfigurisan) očuvano.
Manifest beleži alijase van tih profila kao odvojeno pozvane, a komande održavanja su
zabranjene u profilima skeniranja samo za čitanje.

Ovi profili pokrivaju samo statičko skeniranje. Oni ne potvrđuju testove proizvoda,
pokrivenost, pakovanje, spoljne provere niti potpuno prihvatanje kandidata za izdanje.
Prihvatanje u tok rada koristi povezane `config/quality/admission-policy.json` i
`scripts/quality/admission-verdict.mjs`. Release-observer profili ostaju odvojeni;
pregledajte njihove primenljive provere i potvrde nezavisno. Prozni inventar ispod je
referenca, a ne dokaz da je gejt stvarno izvršen.

Skripte se nalaze pod `scripts/check/` (gejtovi politike) i `scripts/quality/` (ratchet
mehanizam). CI izvor istine je `.github/workflows/ci.yml`.

### Brza putanja za PR izdanja (`quality.yml`)

`.github/workflows/quality.yml` dopunjava CI na main/release PR-ovima, push-ovima na
`main`, dispatch-u i merge grupama. PR-ovi koriste brze provere filtrirane po putanji.
Trajno onemogućena duplirana izrada je uklonjena; prave provere izrade/pakovanja/
pokretanja ostaju u CI-ju.

| Posao                                            | Opseg                                                                                                                                                                                                                        | Blokira                  |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `Docs Gates (fast-path)`                         | PR-ovi dokumentacije/koda; reference API dokumentacije i docs-all                                                                                                                                                            | Da                       |
| `Fast Quality Gates`                             | PR-ovi sa kodom; statičke provere, provera tipova, provera tipova kontrolne table, pogođeni jedinični testovi                                                                                                                | Da                       |
| `Forgotten sibling tests`                        | PR-ovi sa kodom; izmenjeni moduli praćeni do statičkih potrošača i kandidata srodnih testova; barrel putanje i putanje dinamičkog uvoza prijavljuju se kao savetodavna dijagnostika, sa referenciranim izuzecima allowlist-e | **Savetodavno**          |
| `Vitest (fast-path)`                             | PR-ovi sa kodom; brza vitest serija                                                                                                                                                                                          | Da                       |
| `Unit Tests fast-path`                           | PR-ovi sa kodom; jedinična serija u 4 shard-a                                                                                                                                                                                | Da                       |
| `No new ESLint warnings`                         | PR-ovi sa kodom; lint zaštitnik svestan supresija                                                                                                                                                                            | Da, uključujući fork-ove |
| `Merge integrity (changelog + generated skills)` | PR-ovi koji nisu draft; sinhronizacija dnevnika promena i generisanih veština                                                                                                                                                | Da, uključujući fork-ove |

#### Izveštaj o zaboravljenim srodnim testovima

`npm run check:forgotten-sibling-tests` ponovo koristi import rezolver koji stoji iza mape uticaja testova.
Za svaki izmenjeni produkcioni modul prijavljuje determinističke
`changed module/symbol -> static consumer -> candidate sibling test` lance kada kandidat
test nije prisutan u diff-u pull request-a. Markdown rezime i JSON rezultat se čuvaju kao
`forgotten-sibling-tests` artefakt workflow-a radi kalibracije pre bilo kakvog blokirajućeg puštanja u primenu.

Barrel re-export-i i dinamički import-i predstavljaju samo dijagnostiku razrešavanja; oni nikada ne stvaraju
blokirajući nalaz. Pregledani izuzeci se nalaze u
`config/quality/forgotten-sibling-allowlist.json`. Svaki unos mora da navede potrošača i kandidat
test, da konkretno obrazloženje i da linkuje GitHub issue ili pull request. Pogrešno oblikovani unosi se odbijaju po principu fail-closed. Izuzeci ne mogu da potisnu obrisan kandidat test ili diff koji dodaje `.skip`/`.todo`;
slabljenje asercija i drugi oblici maskiranja ostaju u nadležnosti nezavisno blokirajuće
`check:test-masking` provere.

### Posao: `lint`

Pokreće se na svakom PR-u ka `main`. Blokira spajanje pri neuspehu.

| Skripta (`npm run ...`)           | Proverava                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Blokira                                      |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Verzija Node.js je unutar podržanog opsega                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                           |
| `check:cycles`                    | Cirkularni importi kroz ceo `src/` + `open-sse/` (na bazi AST-a, tsconfig `paths` razrešeni). Osnovna verzija izlazi sa kodom 1 kad god postoji ijedan ciklus (fail-closed od #15281) i ispisuje SCC-ove. `check:cycles:ratchet` (ono što CI pokreće) blokira kada broj premaši gornju granicu `metrics.cycles` u `quality-baseline.json` — trenutno 14, `direction: down`, tako da može samo da opada (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da (ratchet)                                 |
| `check:boundary`                  | Povezanost `open-sse → src`: jedinstveni importi od fajla do fajla iz engine-a u aplikaciju (`scripts/quality/measure-boundary.mjs`; lista ivica predstavlja backlog remedijacije za v4 core/module-split). Osnovna verzija = informativni izveštaj (isto kao `quality:boundary`). `check:boundary:ratchet` (ono što CI pokreće, takođe u ratchet petlji fast-gates u `quality.yml`) blokira kada broj premaši gornju granicu `metrics.boundaryOpenSseToSrc` u `quality-baseline.json` — inicijalizovana na izmerenih 771, `direction: down`; `--update` je samo snižava; relativno u odnosu na baznu granu na PR-ovima (`--base-ref`, vidi ispod)                                                                                                                                                                                                                                     | Da (ratchet)                                 |
| `check:route-validation:t06`      | Zod šeme prisutne na svim rutama (Tier 6 politika)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `check:any-budget:t11`            | Број `@ts-expect-error // any` не премашује буџет (ратчет нивоа 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Да                                           |
| `check:provider-consistency`      | Сваки провајдер у `providers.ts` има одговарајући унос у `providerRegistry.ts` (и обрнуто, у оквиру дозвољене листе)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Да                                           |
| `check:model-lifecycle`           | Три ручно одржаване табеле усмеравања остају у складу са уписаним снимком животног циклуса (#11503): `FITNESS_TABLE` (`taskFitness.ts`) не оцењује ниједан повучени идентификатор који `REGISTRY` може да усмери; сваки циљ из `BUILT_IN_ALIASES` присутан је у `REGISTRY` и одсутан из снимка повучених идентификатора; сваки повучени идентификатор који је још увек у `REGISTRY` прослеђује се или је наведен у `allowedRetiredInCatalog`; и ниједан извор нити циљ у `DEFAULT_DEGRADATION_MAP` не појављује се као повучен у том снимку. Ово не доказује да живи upstream тренутно послужује дати модел. Офлајн — пореди се са `config/quality/model-lifecycle.json`, који се ручно освежава командом `npm run quality:refresh-model-lifecycle` (захтева мрежу; није повезано у CI). `allowedRetiredInCatalog` је ратчет за постепено смањење: унос додајте само уз пратећи issue. | Да                                           |
| `check:fetch-targets`             | Сваки `fetch("/api/...")` у клијентском `src/` разрешава се на стварни `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Да                                           |
| `check:deps`                      | Све зависности које се могу инсталирати преко `npm install` у сваком `package.json` у репозиторијуму налазе се у `dependency-allowlist.json`; нови незакључани или slopsquat-овани пакети се означавају                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Да                                           |
| `audit:deps`                      | `npm audit` (root + electron) — без високих/критичних безбедносних упозорења (преклапа се са osv `check:vuln-ratchet`; погледајте заостатак рационализације)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Да                                           |
| `check:lockfile`                  | Интегритет `package-lock.json` фајла — https регистар, хешеви интегритета, без преписивања хостова                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Да                                           |
| `check:licenses`                  | SPDX листа дозвољених лиценци за продукцијске зависности                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Да                                           |
| `check:tracked-artifacts`         | Без build-артефаката / комитованих `node_modules` симболичких линкова (такође се покреће у husky pre-commit; pre-push је намерно лаган — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Да                                           |
| `check:ai-attribution`            | Без AI/bot `Co-Authored-By` ознаке или подножја о AI-генерисању у PR комитовима, наслову или телу — Строго правило #16 (у `quality.yml` петљи брзих провера за PR→`release/**` — чита payload догађаја, без дејства ван PR-ова — и као корак само за PR у `ci.yml` lint за PR→`main`; такође и husky `commit-msg` hook; људски коаутори су дозвољени; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:vitest-exclusions`         | Свако Vitest искључење наводи issue за праћење и појављује се у `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Да                                           |
| `check:file-size`                 | Изворни фајлови (`.ts`/`.tsx` у `src/`, `open-sse/`, `electron/`, `bin/`) остају у оквиру `cap`, а тест фајлови (`*.test.ts(x)`) у оквиру `testCap`; фајлови замрзнути у `file-size-baseline.json` (`frozen` / `testFrozen`) не смеју да премаше своју забележену величину                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Да                                           |
| `check:error-helper`              | Odgovori sa greškom u izvršiocima/handler-ima koriste `buildErrorBody()` / `sanitizeErrorMessage()` (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:migration-numbering`       | SQL fajlovi migracija su numerisani uzastopno, bez praznina ili duplikata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                           |
| `check:public-creds`              | Nema literalnih OAuth `client_id`/`client_secret` ili Firebase Web ključeva van `publicCreds.ts` (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                           |
| `check:db-rules`                  | Nema sirovog SQL-a van modula `src/lib/db/`; nema barrel-importa iz `localDb.ts` (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:known-symbols`             | Izvršioci provajdera, strategije rutiranja i prevodioci registrovani u svojim dispatch tabelama odgovaraju fajlovima na disku — nema siročića ili nedeklarisanih simbola                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                           |
| `check:route-guard-membership`    | Svaka ruta koja pokreće child proces je klasifikovana pomoću `isLocalOnlyPath()` (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `check:test-discovery`            | Svaka `*.test.ts` / `*.spec.ts` datoteka u repozitorijumu prikupljena je od strane bar jednog izvršioca testova (ratchet: lista siročadi u `test-discovery-baseline.json` može samo da se smanjuje)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:agent-skills-sync`         | Generisani agent-skills artefakti odgovaraju svom izvornom katalogu (nema odstupanja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:provider-asset-provenance` | Logotipi/resursi provajdera imaju zabeležen unos o poreklu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | JSON konfiguracione datoteke se ispravno parsiraju i zadovoljavaju lint pravila repozitorijuma                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecheck:core`                  | TypeScript kompilacija bez grešaka (samo informativna upozorenja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                           |
| `typecheck:noimplicit:core`       | Strogi `noImplicitAny` — usmeren ka budućnosti; mnoge postojeće tačke poziva još uvek zahtevaju anotacije                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **Informativno** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ograničen na `src/app/(dashboard)/**` (#7033) — ručno odabrana lista dozvoljenih od 27 datoteka za `typecheck:core` ne uključuje nijednu dashboard TSX datoteku, a `next build` je takođe nikada ne proverava tipovski (`next.config.mjs` postavlja `ignoreBuildErrors: true`), pa su regresije s usamljenim identifikatorima tamo (#6625/#6909) bile nevidljive za CI. Upoređuje se sa zamrznutom osnovnom vrednošću broja grešaka po datoteci/po TS kodu (`config/quality/dashboard-typecheck-baseline.json`, isti obrazac zaštite od zastarevanja kao `check:known-symbols`) — samo NOVE greške iznad osnovnog broja obaraju kapiju; smanjite osnovnu vrednost pomoću `--update` kada se ispravi postojeća greška.                                                                                                                                                            | Da                                           |

### Posao: `quality-gate`

Покреће се након `test-coverage`. Блокира спајање у случају неуспеха.

| Скрипта                      | Проверава                                                                                                                                                                         | Блокира                   |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | Издаје `quality-metrics.json` (број ESLint упозорења, покривеност из спојеног shard извештаја)                                                                                    | Да (узводно од ratchet-а) |
| `quality:ratchet`            | Ниједна метрика у `quality-baseline.json` није регресовала (ESLint упозорења ≤ baseline; покривеност ≥ baseline)                                                                  | Да                        |
| `check:duplication`          | Дупликација кода (jscpd@4) не прелази baseline у `quality-baseline.json`                                                                                                          | Да                        |
| `check:complexity`           | Цикломатска сложеност на нивоу фајла не прелази ограничење (основни ESLint `complexity` + `max-lines-per-function`)                                                               | Да                        |
| `check:cognitive-complexity` | Ratchet когнитивне сложености (`eslint-plugin-sonarjs`) — засебан ESLint пролаз; CI покреће оба спојена као један корак `check:complexity-ratchets`                               | Да                        |
| `check:dead-code`            | Ratchet некоришћених извоза / фајлова (knip) не регресује у односу на baseline                                                                                                    | Да                        |
| `check:compression-budget`   | Буџет бенчмарка компресије — доње границе уштеде токена по енџину не смеју регресовати                                                                                            | Да                        |
| `check:type-coverage`        | Ratchet процента типизираности (`type-coverage`) не регресује; у великој мери обухвата `typecheck:noimplicit:core`                                                                | Да                        |
| `check:codeql-ratchet`       | Број отворених CodeQL упозорења не регресује (чита преко `gh api`; грациозно се прескаче без токена) — учесталост освежавања и ручно покретање: погледајте „CodeQL ratchet“ испод | Да                        |

### Посао: `quality-extended`

Цео посао је саветодаван (`continue-on-error: true`). Ratchet-ови засновани на npm-у
се стварно покрећу; спољни скенери се инсталирају преко `gh release download` и сами
себе прескачу (exit 0) када бинарни фајл још увек није доступан.

| Скрипта                  | Проверава                                                                                                                                                                                                                          | Блокирајуће                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `check:circular-deps`    | Без цикличних зависности (dpdm)                                                                                                                                                                                                    | **Саветодавно**                                     |
| `check:bundle-size`      | Величина bundle-а не прелази ограничење                                                                                                                                                                                            | **Саветодавно**                                     |
| `check:secrets`          | Скенирање тајни (gitleaks) — прескаче ако бинарни фајл недостаје                                                                                                                                                                   | **Саветодавно**                                     |
| `check:vuln-ratchet`     | Ранњивости зависности (osv-scanner) не регресују — прескаче ако бинарни фајл недостаје                                                                                                                                             | **Саветодавно**                                     |
| `check:workflows`        | Lint workflow фајлова (actionlint + zizmor); недостајући/неисправни скенери, неважећи извештаји или недостајући ratchet baseline не успевају са статусом INCOMPLETE. Важећи налази прате изабрану strict/advisory/ratchet политику | Извршавање обавезно; zizmor ratchet блокира у CI-ју |
| `check:openapi-breaking` | Кршеће измене уговора јавног API-ја (`openapi.yaml`) у односу на основну грану (oasdiff) — издаје `openapiBreaking=N`; прескаче ако oasdiff недостаје или се основна спецификација не може разрешити                               | **Саветодавно**                                     |

### Посао: `docs-sync-strict`

Покреће се на сваком PR-у ка `main`. Блокира спајање у случају неуспеха.

| Skripta                        | Proverava                                                                                                                                                                    | Blokira                    |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | Meta-kapija koja redom pokreće 6 podkapija navedenih ispod                                                                                                                   | Da                         |
| ↳ `check:docs-sync`            | Konzistentnost verzija u CHANGELOG / OpenAPI / llm.txt                                                                                                                       | Da                         |
| ↳ `check:docs-counts`          | Brojevi u prozi (broj provajdera, broj migracija itd.) su unutar ratchet prozora stvarnih brojeva                                                                            | Da                         |
| ↳ `check:env-doc-sync`         | Svaka env promenljiva u `.env.example` je dokumentovana u tabeli u dokumentaciji, i obrnuto                                                                                  | Da                         |
| ↳ `check:deprecated-versions`  | Nema zastarelih stringova verzija u dokumentaciji                                                                                                                            | Da                         |
| ↳ `check:doc-links`            | Interni markdown linkovi u dokumentaciji razrešavaju se u stvarne fajlove (oblik `[text]`/`(path)`)                                                                          | Da                         |
| ↳ `check:fabricated-docs`      | Rute, env promenljive, CLI komande, imena hook-ova i putanje fajlova navedeni u dokumentaciji postoje u kodnoj bazi. Čvrsta kapija preko `--strict`; meki neuspeh bez flaga. | Da (preko `--strict` u CI) |
| `check:cli-i18n`               | Stringovi CLI komandi prisutni su u svim i18n fajlovima lokalizacije                                                                                                         | Da                         |
| `check:openapi-coverage`       | OpenAPI specifikacija pokriva najmanje ratchet-ovani donji prag stvarnih ruta                                                                                                | Da                         |
| `check:openapi-security-tiers` | Anotacije sigurnosnih nivoa u `openapi.yaml` konzistentne su sa klasifikacijama u `routeGuard.ts`                                                                            | **Savetodavno**            |
| `check:openapi-routes`         | Svaka putanja u `openapi.yaml` razrešava se u stvarni `route.ts` (anti-halucinacija)                                                                                         | Da                         |
| `check:docs-symbols`           | Svaka `/api/...` referenca u `docs/**/*.md` razrešava se u stvarni `route.ts` (anti-halucinacija)                                                                            | Da                         |
| `i18n translation drift`       | Neprevedeni ključevi u i18n fajlovima lokalizacije — samo upozorenje                                                                                                         | **Savetodavno**            |

### Posao: `i18n-ui-coverage`

| Skripta                           | Proverava                                                                                                                                                                           | Blokira         |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (inline) | Pokrivenost UI i18n ključeva je ≥ 65%                                                                                                                                               | Da              |
| `check-ui-value-drift` (inline)   | Prepisana engleska **vrednost** ne ostavlja zastareli prevod za sobom                                                                                                               | Da              |
| `check-new-key-coverage` (inline) | **Novi** engleski ključ je preveden u svakom lokalu — `__MISSING__:` marker se odbacuje                                                                                             | Da              |
| `check-translation-ratio`         | Odnos stvarnih prevoda po lokalu (listovi identični engleskom / placeholder / nedostajući van allowliste) ne sme da premaši `config/quality/i18n-translation-baseline.json` + slack | **Savetodavno** |

Zahteva `fetch-depth: 0` — kapija za value-drift poredi (diff) `en.json` sa osnovom spajanja (merge base).

#### `check-ui-value-drift` — kapija za zastarele prevode

Hvata jedinu i18n regresiju koju ostale kapije strukturno ne mogu da vide: engleska vrednost
se prepiše, a prevodi izvedeni iz _prethodnog_ engleskog ostaju pozadi, pa korisnici koji
ne govore engleski i dalje čitaju samouvereno formulisan, sada netačan tekst.

Ovo se stvarno desilo. `oauthModal.googleOAuthWarning` je prepisan kada je stigao Antigravity
login helper (#5203); **39 od 43 lokala** zadržalo je tekst koji operaterima kaže da „kopiraju
ceo URL i nalepe ga ispod" — tok koji se za tog provajdera ne može završiti. Ostalo je
neprimećeno do #8463 jer:

- `sync-ui-keys` dopunjuje samo ključeve koji **nedostaju**, nikad one koji su **zastareli**;
- `check-ui-keys-coverage` broji _prisustvo_ ključa, pa zastareli prevod prolazi kao pokriven;
- `check-translation-drift` prati `docs/i18n/<locale>/**.md` preslike dokumentacije —
  nikad ne čita `src/i18n/messages/*.json`. Blokira u poslu `docs-sync-strict` od ponovne
  sinhronizacije 2026-09: izmenite osnovni dokument → `npm run i18n:run -- --files=<doc>` (na nivou sekcije, jeftino).

**Засновано на diff-у, а не на baseline датотеци.** Пореди `en.json` у merge base тачки са радним стаблом; за сваки кључ чија се енглеска вредност променила, сваки локалитет који још увек чува недирнут превод је застарео. Ово намерно **замрзава већ постојећи дуг** — diff не може да открије из које старе енглеске верзије потиче одавно постојећи превод, па контролна тачка (gate) процењује само оно чега се тренутна промена дотиče. Алтернатива (baseline са хешом по кључу) коштала би генерисану датотеку од ~600 KB — 3× већу од највеће постојеће baseline датотеке — уз сталне измене на сваком i18n PR-у.

Два начина да се захтев испуни:

1. ажурирајте погођене преводе, или
2. поставите их на `__MISSING__:<new english>` — runtime тада испоручује исправљени енглески
   (`src/i18n/request.ts::deepMergeFallback`, #7258), а кључ се ставља у ред за превођење.

Ако се **значење** ниске променило, боље је **преименовати кључ**: нови кључ не може да наследи застарели превод. То је образац који је користио #8463.

```bash
npm run i18n:check-value-drift          # стриктно (оно што CI покреће)
npm run i18n:check-value-drift:warn     # само извештавај
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Излази са 0 уз `SKIP reason=base-unresolved` када се основни каталог не може прочитати (плитки клон без основне референце), исто као `check-openapi-breaking`.

### Посао: `i18n`

Потпуна матрица i18n валидације (један посао по локалитету). Цео посао је саветодаван.

| Скрипта                         | Проверава                         | Блокира                                                    |
| ------------------------------- | --------------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | Комплетност превода по локалитету | **Саветодавно** (`continue-on-error: true` на целом послу) |

### Посао: `pr-test-policy`

Покреће се само на pull захтевима.

| Скрипта                | Проверава                                                                                                                                 | Блокира |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:pr-test-policy` | PR-ови који мењају производни код у `src/`, `open-sse/`, `electron/` или `bin/` морају укључити или ажурирати тестове (Строго правило #8) | Да      |
| `check:test-masking`   | Измењене тест-датотеке не смањују нето број assert тврдњи нити додају `assert.ok(true)` таутологије                                       | Да      |
| `check:pr-evidence`    | Тело PR-а наводи доказе из тестова/VPS-а за промену (механизује Строго правило #18 grep-овањем прозе PR-а — крхко, види Backlog)          | Да      |

### Посао: `test-vitest`

Покреће се после `build`-а. Блокира спајање при неуспеху.

| Скуп тестова     | Проверава                                                | Блокира                                                                                                           |
| ---------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP сервер (110 алата), autoCombo, кеш — vitest покретач | Да                                                                                                                |
| `test:vitest:ui` | Тестови UI компонената — vitest покретач                 | **Блокирајуће** — већ постојећи неуспеси су експлицитно изузети у `vitest.config.ts`; нови неуспеси обарају посао |

### Ноћни workflow-ови (заказани, саветодавни)

Покрећу се по cron распореду (и `workflow_dispatch`), никада на PR-овима. Сви су саветодавни.

| Workflow               | Проверава                                                                                                                                                            | Блокира         |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | fast-check property тестови са насумичним seed-ом и великим бројем покретања                                                                                         | **Саветодавно** |
| `nightly-resilience`   | gate раста heap-а, chaos fault-injection, k6 оптерећење/soak                                                                                                         | **Саветодавно** |
| `nightly-llm-security` | promptfoo заштита од injection-а (block режим) + garak сонде (прескачу се без тајне провајдера)                                                                      | **Саветодавно** |
| `nightly-schemathesis` | OpenAPI fuzzing уговора (schemathesis) према живој OmniRoute инстанци помоћу `docs/openapi.yaml` — открива кршења спецификације / необрађене 500 грешке (Fase 8 B.4) | **Саветодавно** |
| `nightly-mutation`     | Stryker скор мутационог тестирања над брзом unit траком — преживели мутанти откривају слабе assert-ове                                                               | **Саветодавно** |
| `nightly-compat`       | Матрица компатибилности Node engine-а преко подржаних `engines.node` опсега                                                                                          | **Саветодавно** |

Основне линије перформанси (heap, TTFB, време build-а) се бележе, а не контролишу gate-ом: види [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
