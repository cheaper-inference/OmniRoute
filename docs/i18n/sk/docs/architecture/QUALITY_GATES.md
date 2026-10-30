# Quality Gates Reference (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Tento dokument je autoritatívnou referenciou pre všetky kvalitatívne brány CI v OmniRoute.
Opisuje každú bránu, čo overuje, v ktorej úlohe CI sa spúšťa, či používa
sprísňujúcu referenčnú hodnotu alebo politiku úspechu/neúspechu a či zostavenie blokuje, alebo má iba poradný charakter.

Stručné zhrnutie a politiku zoznamu povolených výnimiek nájdete v časti „Quality Gates & Ratchets“
v súbore `AGENTS.md`. Kritické posúdenie, klasifikáciu vyspelosti a plán replikácie
rovnakého systému nezávislý od nástrojov nájdete v dokumente
[Príručka ku kvalitatívnym bránam](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventár brán a profily vykonávania

### Zaradenie kandidáta

Pracovné postupy CI a Quality Gates poskytujú stabilný verdikt: `Gate / CI` a
`Gate / Quality`. Ich verzovaná politika zaraďovania uvádza každú nadradenú úlohu
ako povinnú alebo poradnú. Príslušná povinná úloha musí uspieť: chýbajúce,
zrušené, preskočené, čakajúce a neznáme výsledky nemôžu potvrdiť stav PASS. Platná
klasifikácia iba pre dokumentáciu alebo iba pre katalóg môže spôsobiť, že vetva pre
kód nebude použiteľná; koncept PR nie je akceptovaným kandidátom. Označenie `hotfix`
nezbavuje povinnosti poskytnúť dôkazy.

Oba pracovné postupy pokrývajú PR smerujúce do vetiev main/release, odoslania do `main`,
manuálne spustenia a udalosti skupiny zlučovania. Odoslanie, manuálne spustenie a skupina
zlučovania vykonajú úplný výber. Odoslania do `release/**` ich nespúšťajú (2026-10-18):
každá zmena už prešla maticou vo svojom PR a zlúčená kombinácia je úlohou Release-Green
(`docs/ops/RUNNER_BOX.md` → Hostovaná vetva). Forky a skupiny zlučovania používajú
hostovaných vykonávateľov pre úlohy, ktoré by inak vybrali vlastných vykonávateľov;
pred nasadením sa musí overiť dostatočná hostovaná kapacita.

Každé potvrdenie JSON identifikuje SHA stiahnutej revízie, spustenie pracovného postupu
a pokus. CLI odmietne nezhodu medzi SHA stiahnutej revízie a SHA udalosti. Testy
pracovného postupu viažu členstvo v politike na zoznam `needs` úlohy verdiktu, takže
nová alebo odstránená vetva nemôže nepozorovane zmiznúť. Potvrdenia pokrývajú vlastný pracovný postup, nie publikovanie, nasadenie ani interné fungovanie
existujúceho poradného skenera. Nastavenie príslušných kontrol ako povinných v pravidlách vetvy
je samostatná administratívna zmena; samotné definovanie ich úloh vetvu nechráni.

`API Route Typecheck` je nezávislá kontrola pracovného postupu mimo oboch súhrnných verdiktov
aj statického profilu lokálneho úplného pozorovateľa. Jej výsledok pre konkrétneho
kandidáta skontrolujte samostatne. `.github/workflows/api-route-typecheck.yml` sa spúšťa pri PR do `main` alebo
`release/**`, pri pushnutí do ktorejkoľvek z týchto skupín vetiev a pri manuálnom spustení. Nemá žiadny filter ciest.
Zmeny cieľovej vetvy PR vyžiadajú novú kontrolu; úpravy tela/názvu používajú názov určený iba na pozorovanie
`Admission not requested / API Route Typecheck` a nemôžu nahradiť prijímaciu kontrolu.
Pracovný postup nedeklaruje spúšťač pre skupinu zlučovania. Každé zavedenie frontu zlučovania, ktoré vyžaduje
túto kontrolu, musí najprv zabezpečiť jej spustenie pre danú udalosť.

### Kapacita vykonávania používateľského rozhrania

CI spúšťa celý inventár používateľského rozhrania v štyroch častiach matice
`test-vitest`, pričom každá má najviac dvoch pracovníkov a existujúci 15-minútový
časový limit úlohy. Prvá časť spúšťa aj súpravu Vitest pre MCP/autoCombo. Výsledok
povinnej úlohy pokrýva každú vetvu matice; zlyhanie alebo zrušenie jednej časti
nemôže potvrdiť zaradenie kandidáta.

Nočný pozorovateľ uchováva samostatné potvrdenie presného kandidáta pre každú časť
používateľského rozhrania vrátane vykonania MCP v prvom potvrdení. Vyžadujú sa všetky
štyri potvrdenia, protokoly a zhodné identity vykonania. Lokálny príkaz
`npm run test:vitest:ui` naďalej vyberá celú súpravu; jedno spustenie s `--shard`
predstavuje iba čiastočný dôkaz.

### Zhromažďovanie pokrytia jednotkových testov

Dvanásť častí jednotkových testov zhromažďuje pokrytie V8 počas existujúceho vykonávania
testov. Úspešná časť spustí `scripts/ci/compact-v8-coverage.mjs`, aby skomprimovala
pôvodné súbory bez vytvorenia priebežnej správy Istanbul. Záverečná úloha Coverage overí
všetkých dvanásť manifestov voči SHA kandidáta, behovému prostrediu, koreňu zdrojových
súborov a hashom údajov a potom spustí reportéry c8 a existujúce prahové hodnoty
pokrytia. Vstupy zachovávajú globálne poradie názvov súborov c8; predbežné zlučovanie
jednotlivých častí nie je bezpečné pri zmiešanom pokrytí funkcií/blokov. Chýbajúce,
poškodené alebo nekompatibilné časti spôsobia zlyhanie zaradenia. Časti s neúspešnými
testami uchovávajú nespracované diagnostické pokrytie samostatne; nemôže vstúpiť do
záverečného zlúčenia.

### Potvrdenia o priebehu vykonávania jednotkových testov

Zdieľaný príkaz `test:unit:ci:shard` zaznamenáva fázy `primary`, `dashboard` a `serial`
prostredníctvom `scripts/ci/unit-progress-reporter.mjs`. Bežný report testov zostáva
k dispozícii. Samostatné potvrdenie obsahujúce iba metadáta zaznamenáva začiatok a dokončenie
každého súboru a 30-sekundový signál heartbeat uvádza súbory, ktoré sú stále aktívne, spolu
s časom ich vykonávania. Zaznamenávajú sa iba povolené metadáta vykonávania; popisy testov,
výstup, obsah chýb ani úplné prostredie sa neserializujú.

CI a Quality uchovávajú súbory JSONL ako `unit-progress-ci-<run>-<attempt>-<shard>` a
`unit-progress-quality-<run>-<attempt>-<shard>`. Časový limit úlohy môže zabrániť neskoršiemu
nahratiu; už odoslané signály heartbeat zostávajú diagnostickým dôkazom. Chýbajúce signály
heartbeat môžu tiež znamenať zablokovaný alebo ukončený proces runnera. Tieto potvrdenia
zachovávajú existujúci výber testov, súbežnosť, časové limity a návratový stav; nejde
o rozhodnutia o prijatí kandidáta.

### Uchované dôkazy v module na vyhodnotenie prijatia

`scripts/quality/validate-release-acceptance.mjs` vyhodnocuje dodaný plán a jeho manifesty; nepotvrdzuje, že plán pokrýva celý proces vydania. Jeho správy výslovne nastavujú `releaseAcceptance: false`, aj keď je plán `VERIFIED`. Pracovný postup `release-acceptance.yml` stále používa tieňové testovacie dáta, nie skutočné potvrdenia zostavenia, balenia, spustenia alebo povýšenia.

CLI vyžaduje `--evidence-root` na overenie uchovaných dôkazov. Súbory vyhľadáva na ceste `<evidence-root>/<artifact_id>/<member>` a vypočítava ich hash SHA-256. Záznam PASS bez dôkazov, chýbajúci či zmenený súbor, nebezpečná cesta alebo symbolický odkaz bránia overeniu. Chýbajúce súbory nie sú to isté ako prázdne protokoly úspešných behov. Existujúce kontroly SHA/run/attempt zostávajú nezávislé: zhodné bajty nemôžu urobiť zastarané potvrdenie platným. Integrita súboru nedokazuje pravosť vykonania ani povýšenie artefaktu.

### Inventár statických kontrol

Verzovaný inventár aliasov npm a členstvo v statických kontrolách sa nachádzajú v
`config/quality/gate-manifest.json`. Spustením `npm run check:gate-manifest` overíte
názvy skriptov a presné príkazy voči `package.json`; pridania, odstránenia a odchýlky
príkazov spôsobia zlyhanie lokálneho háku aj úloh klasifikácie zmien v CI. Alias nie
je úloha pracovného postupu, inštancia matice ani testovací prípad: tieto počty sa
nesmú prezentovať ako vzájomne zameniteľné.

Pomocou `npm run quality:scan -- --list` alebo `npm run quality:scan:fast -- --list`
môžete skontrolovať vybrané aliasy bez ich vykonania. Vykonávateľ vyvoláva vstupný bod
npm, takže jeho behové prostredie (vrátane Bun tam, kde je nakonfigurované) zostáva
zachované. Manifest zaznamenáva aliasy mimo týchto profilov ako samostatne vyvolávané
a príkazy údržby sú v profiloch kontrol iba na čítanie zakázané.

Tieto profily pokrývajú iba statickú kontrolu. Necertifikujú testy produktu,
pokrytie, balenie, externé kontroly ani úplné schválenie kandidáta na vydanie.
Zaradenie pracovného postupu používa prepojené súbory
`config/quality/admission-policy.json` a `scripts/quality/admission-verdict.mjs`.
Profily pozorovateľa vydania zostávajú samostatné; ich príslušné kontroly a potvrdenia
preskúmajte nezávisle. Statické príkazy úplného pozorovateľa sú deklarované v
`config/quality/release-green-static-profile.json` vrátane `audit:deps`, výberu
mutačných testov a kontrol prekladov. Načítavací mechanizmus overuje príkazy npm voči
package.json a modelovaným deklaráciám CI/Quality; namiesto vykonania tokenov shellu
ako argumentov odmietne odchýlku. Povinný výstup skenera SKIP/INCOMPLETE nemôže
potvrdiť stav PASS. Profil zaznamenáva svoje externé výnimky a nenahrádza hostované
pokrytie, testovacie matice ani dôkazy o balíkoch alebo nasadení. Textový inventár
uvedený nižšie slúži ako referencia, nie ako dôkaz, že sa brána skutočne vykonala.

Skripty sa nachádzajú v `scripts/check/` (brány politík) a `scripts/quality/`
(mechanizmus postupného sprísňovania). Zdrojom pravdy pre CI je
`.github/workflows/ci.yml`.

### Stav dokumentácie publikovaného základu

`.github/workflows/i18n-base-health.yml` sleduje stav dokumentácie po vybraných
odoslaniach do `main` a `release/v*` a pri manuálnom spustení. Jeho filtre zahŕňajú dokumentáciu,
koreňové súbory Markdown, `llm.txt`, stav/konfiguráciu prekladov a príslušné nástroje i18n.
Jediná úloha `Published base documentation health` používa hostovaný systém Ubuntu a päťminútový
časový limit. Vykonáva overenie iba na čítanie a zapisuje diagnostické potvrdenie bez
inštalácie závislostí, prekladu alebo prevzatia stavu.

`scripts/i18n/check-base-health.mjs` vyžaduje nulový počet nekonzistentností hašov zdrojov, chýbajúcich cieľov, hašov cieľov,
zastaraných prekladov a vyrovnávacej pamäte sekcií. Overuje tiež aktuálny rozsah základných
dokumentov/lokalít a zaznamenaný pôvod. Neplatný kontext, neúplné pokrytie
alebo prerušená kontrola vedú k výsledku `INCOMPLETE`; potvrdený nesúlad vedie k výsledku `FAIL`. Oba
vracajú neúspešný stav ukončenia. Potvrdenie je naviazané na SHA revízie checkoutu, pracovný postup, spustenie a
pokus a uchováva sa ako `i18n-base-health-<sha>-<run>-<attempt>`.

Ide o nezávislé pozorovanie publikovaného základu. Nepridáva udalosť PR ani
skupiny zlúčenia, povinnú kontrolu PR, alias npm ani člena profilu statickej kontroly.
Existujúce diferenciálne pravidlá PR a pomocné klasifikácie základného kontrolného nástroja
zostávajú oddelené. Úspešné nahratie nemôže zmeniť neúspešný výsledok kontroly stavu na PASS.

### Zrýchlený postup pre PR vydania (`quality.yml`)

`.github/workflows/quality.yml` dopĺňa CI pre PR smerujúce do vetiev main/release,
odoslania do `main`, manuálne spustenia a skupiny zlučovania. PR používajú zrýchlené
kontroly filtrované podľa ciest. Natrvalo zakázané duplicitné zostavenie bolo odstránené;
skutočné kontroly zostavenia/balíka/spustenia zostávajú v CI.

| Úloha                                            | Rozsah                                                                                                                                                                                                | Blokujúca           |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `Docs Gates (fast-path)`                         | PR dokumentácie/kódu; referencie dokumentácie API a docs-all                                                                                                                                          | Áno                 |
| `Fast Quality Gates`                             | PR kódu; statické kontroly, kontrola typov, kontrola typov dashboardu, ovplyvnené jednotkové testy                                                                                                    | Áno                 |
| `Forgotten sibling tests`                        | PR kódu; zmenené moduly sledované k statickým konzumentom a kandidátskym súrodeneckým testom; cesty cez barrel a dynamický import sa hlásia ako poradná diagnostika s odkazmi na výnimky v allowliste | **Poradná**         |
| `Vitest (fast-path)`                             | PR kódu; rýchly súbor testov vitest                                                                                                                                                                   | Áno                 |
| `Unit Tests fast-path`                           | PR kódu; jednotkové testy rozdelené do 4 shardov                                                                                                                                                      | Áno                 |
| `No new ESLint warnings`                         | PR kódu; ochranná kontrola lintu zohľadňujúca potlačenia                                                                                                                                              | Áno, vrátane forkov |
| `Merge integrity (changelog + generated skills)` | PR, ktoré nie sú konceptmi; synchronizácia changelogu a generovaných skills                                                                                                                           | Áno, vrátane forkov |

#### Správa o zabudnutých súrodeneckých testoch

`npm run check:forgotten-sibling-tests` opätovne používa resolver importov, na ktorom je založená mapa vplyvu testov.
Pre každý zmenený produkčný modul hlási deterministické reťazce
`changed module/symbol -> static consumer -> candidate sibling test`, keď kandidátsky
test chýba v rozdiele pull requestu. Súhrn vo formáte Markdown a výsledok vo formáte JSON sa uchovávajú ako
artefakt workflowu `forgotten-sibling-tests` na kalibráciu pred akýmkoľvek zavedením blokovania.

Opätovné exporty cez barrel a dynamické importy slúžia iba ako diagnostika rozlíšenia; nikdy nevytvárajú
blokujúce zistenie. Skontrolované výnimky sa nachádzajú v
`config/quality/forgotten-sibling-allowlist.json`. Každá položka musí uvádzať konzumenta a kandidátsky
test, poskytnúť konkrétne odôvodnenie a odkazovať na issue alebo pull request na GitHube. Chybne vytvorené položky
spôsobia zlyhanie kontroly. Výnimky nemôžu potlačiť odstránený kandidátsky test ani rozdiel, ktorý pridáva `.skip`/`.todo`;
oslabovanie asercií a iné maskovanie zostávajú v pôsobnosti nezávisle blokujúcej
kontroly `check:test-masking`.

### Úloha: `lint`

Spúšťa sa pri každom PR do `main`. Pri zlyhaní blokuje zlúčenie.

| Skript (`npm run ...`)            | Overuje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Blokujúce                                    |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Verzia Node.js je v podporovanom rozsahu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Áno                                          |
| `check:test-tla-order`            | Žiadny súbor `node:test` v adresári `tests/unit` nezaregistruje test, nenarazí na `await` na najvyššej úrovni a následne nezaregistruje ďalšie testy (#18045; západkový mechanizmus: `test-tla-order-allowlist.json` sa môže iba zmenšovať)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Áno                                          |
| `check:cycles`                    | Cyklické importy v celých adresároch `src/` + `open-sse/` (založené na AST, s rozlíšenými `paths` z tsconfig). Samostatné spustenie skončí s kódom 1 vždy, keď existuje ľubovoľný cyklus (bezpečné zlyhanie od #15281), a vypíše SCC. `check:cycles:ratchet` (ktorý spúšťa CI) blokuje, keď počet prekročí horný limit `metrics.cycles` v súbore `quality-baseline.json` — momentálne 14, `direction: down`, takže môže iba klesať (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Áno (západkový mechanizmus)                  |
| `check:boundary`                  | Prepojenie `open-sse → src`: jedinečné importy medzi súbormi z jadra do aplikácie (`scripts/quality/measure-boundary.mjs`; zoznam hrán predstavuje zoznam úloh na nápravu rozdelenia jadra/modulov v4). Samostatné spustenie = informatívna správa (rovnako ako `quality:boundary`). `check:boundary:ratchet` (ktorý spúšťa CI a nachádza sa aj v slučke západkového mechanizmu rýchlych kontrol v `quality.yml`) blokuje, keď počet prekročí horný limit `metrics.boundaryOpenSseToSrc` v súbore `quality-baseline.json` — počiatočná hodnota je nameraných 771, `direction: down`; `--update` ju môže iba znížiť; pri PR sa vyhodnocuje relatívne voči základnej vetve (`--base-ref`, pozri nižšie)                                                                                                                                                                                                                                                                             | Áno (západkový mechanizmus)                  |
| `check:route-validation:t06`      | Schémy Zod sú prítomné vo všetkých trasách (pravidlá úrovne 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Áno                                          |
| `check:any-budget:t11`            | Počet `@ts-expect-error // any` neprekračuje limit (kontrolný mechanizmus úrovne 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Áno                                          |
| `check:provider-consistency`      | Každý poskytovateľ v `providers.ts` má zodpovedajúcu položku v `providerRegistry.ts` (a naopak, v rámci zoznamu povolených položiek)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Áno                                          |
| `check:model-lifecycle`           | Tri ručne udržiavané smerovacie tabuľky zostávajú konzistentné so snapshotom životného cyklu uloženým v repozitári (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nehodnotí žiadny vyradený identifikátor, na ktorý môže `REGISTRY` smerovať; každý cieľ `BUILT_IN_ALIASES` sa nachádza v `REGISTRY` a nenachádza sa v snapshote vyradených identifikátorov; každý vyradený identifikátor, ktorý je stále v `REGISTRY`, je presmerovaný alebo uvedený v `allowedRetiredInCatalog`; a žiadny zdroj ani cieľ `DEFAULT_DEGRADATION_MAP` sa v tomto snapshote nenachádza medzi vyradenými. Toto nedokazuje, že model je momentálne poskytovaný aktívnou upstream službou. Offline — porovnáva sa s `config/quality/model-lifecycle.json`, ktorý sa ručne obnovuje pomocou `npm run quality:refresh-model-lifecycle` (vyžaduje sieť; nie je zapojené do CI). `allowedRetiredInCatalog` je postupne sprísňovaný kontrolný mechanizmus: položku pridávajte iba spolu so sledovacou úlohou. | Áno                                          |
| `check:fetch-targets`             | Každé `fetch("/api/...")` v klientskej časti `src/` sa preloží na skutočný súbor `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Áno                                          |
| `check:deps`                      | Všetky závislosti inštalovateľné pomocou `npm install` vo všetkých súboroch `package.json` v repozitári sa nachádzajú v `dependency-allowlist.json`; nové závislosti bez pripnutej verzie alebo balíky s preklepovo zamenenými názvami sú označené                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Áno                                          |
| `audit:deps`                      | npm audit všetkých piatich nezávislých lockfile súborov (koreňový adresár, Electron, pluginy OpenCode v1/v2 a provider). Kritické upozornenia blokujú; upozornenia s vysokou závažnosťou zostávajú viditeľnými varovaniami. Chýbajúce/neúspešné audity sú NEÚPLNÉ a blokujú; hashe lockfile súborov a reporty pre jednotlivé rozsahy sa uchovávajú.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Áno                                          |
| `check:lockfile`                  | Integrita súboru `package-lock.json` — register https, hashe integrity, žiadne prepísania hostiteľov                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Áno                                          |
| `check:licenses`                  | Zoznam povolených licencií SPDX pre produkčné závislosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Áno                                          |
| `check:tracked-artifacts`         | Žiadne artefakty zostavenia ani commitnuté symbolické odkazy `node_modules` (spúšťa sa aj v husky pre-commit; pre-push je zámerne nenáročný — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Áno                                          |
| `check:ai-attribution`            | Žiadna pätička `Co-Authored-By` od AI/bota ani pätička o generovaní pomocou AI v commitoch, názve alebo tele PR — pevné pravidlo č. 16 (v slučke rýchlych kontrol `quality.yml` pre PR→`release/**` — číta payload udalosti, mimo PR nevykoná žiadnu operáciu — a krok iba pre PR v lint úlohe súboru `ci.yml` pre PR→`main`; takisto husky hook `commit-msg`; ľudskí spoluautori sú povolení; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:vitest-exclusions`         | Každá výnimka Vitest uvádza sledovací issue a nachádza sa v `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Áno                                          |
| `check:file-size`                 | Zdrojové súbory (`.ts`/`.tsx` v `src/`, `open-sse/`, `electron/`, `bin/`) neprekračujú `cap` a testovacie súbory (`*.test.ts(x)`) neprekračujú `testCap`; súbory zmrazené v `file-size-baseline.json` (`frozen` / `testFrozen`) nesmú prekročiť svoju zaznamenanú veľkosť                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Áno                                          |
| `check:error-helper`              | Chybové odpovede v exekútoroch/obslužných rutinách používajú `buildErrorBody()` / `sanitizeErrorMessage()` (Pevné pravidlo č. 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Áno                                          |
| `check:migration-numbering`       | Migračné súbory SQL sú číslované postupne, bez medzier alebo duplicít                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Áno                                          |
| `check:public-creds`              | Mimo `publicCreds.ts` sa nenachádzajú žiadne doslovné hodnoty OAuth `client_id`/`client_secret` ani webové kľúče Firebase (Pevné pravidlo č. 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Áno                                          |
| `check:db-rules`                  | Mimo modulov `src/lib/db/` sa nenachádza žiadny nespracovaný SQL kód; žiadne hromadné importy z `localDb.ts` (Pevné pravidlá č. 2/5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Áno                                          |
| `check:known-symbols`             | Exekútory poskytovateľov, stratégie smerovania a prekladače zaregistrované vo svojich dispečerských tabuľkách zodpovedajú súborom na disku — žiadne osirelé ani nedeklarované symboly                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Áno                                          |
| `check:route-guard-membership`    | Každá trasa, ktorá spúšťa podriadený proces, je klasifikovaná pomocou `isLocalOnlyPath()` (Pevné pravidlá č. 15/17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Áno                                          |
| `check:test-discovery`            | Každý súbor `*.test.ts` / `*.spec.ts` v repozitári je zahrnutý aspoň jedným spúšťačom testov (západka: zoznam osirelých súborov v `test-discovery-baseline.json` sa môže iba zmenšovať)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Áno                                          |
| `check:agent-skills-sync`         | Vygenerované artefakty zručností agenta sa zhodujú so svojím zdrojovým katalógom (bez odchýlok)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:provider-asset-provenance` | Logá/aktíva poskytovateľov majú zaznamenaný údaj o pôvode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `lint:json`                       | Konfiguračné súbory JSON sa dajú analyzovať a spĺňajú pravidlá lintovania repozitára                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `typecheck:core`                  | Kompilácia TypeScriptu bez chýb (iba informatívne upozornenia)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Áno                                          |
| `typecheck:noimplicit:core`       | Striktné `noImplicitAny` — zamerané do budúcnosti; mnohé existujúce miesta volania stále potrebujú anotácie                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | **Informatívne** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` obmedzený na `src/app/(dashboard)/**` (#7033) — starostlivo vybraný zoznam 27 súborov v `typecheck:core` neobsahuje žiadny dashboard TSX a ani `next build` ho nikdy typovo nekontroluje (`next.config.mjs` nastavuje `ignoreBuildErrors: true`), takže regresie osirelých identifikátorov v tejto oblasti (#6625/#6909) neboli pre CI viditeľné. Rozdiely sa porovnávajú so zmrazenou východiskovou hodnotou počtu podľa súboru/kódu TS (`config/quality/dashboard-typecheck-baseline.json`, rovnaký vzor kontroly zastaranosti ako pri `check:known-symbols`) — kontrola zlyhá iba pri NOVÝCH chybách nad rámec východiskového počtu; po oprave existujúcej chyby východiskovú hodnotu znížte pomocou `--update`.                                                                                                                                                                                                                                                         | Áno                                          |

### Úloha: `quality-gate`

Spúšťa sa po `test-coverage`. Pri zlyhaní blokuje zlúčenie.

| Skript                       | Overuje                                                                                                                                                                           | Blokujúce                |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | Vytvorí `quality-metrics.json` (počet upozornení ESLint, pokrytie zo zlúčenej správy fragmentov)                                                                                  | Áno (predchádza západke) |
| `quality:ratchet`            | Žiadna metrika v `quality-baseline.json` sa nezhoršila (upozornenia ESLint ≤ východisková hodnota; pokrytie ≥ východisková hodnota)                                               | Áno                      |
| `check:duplication`          | Duplikácia kódu (jscpd@4) neprekračuje východiskovú hodnotu v `quality-baseline.json`                                                                                             | Áno                      |
| `check:complexity`           | Cyklomatická zložitosť na úrovni súborov neprekračuje limit (základné pravidlo ESLint `complexity` + `max-lines-per-function`)                                                    | Áno                      |
| `check:cognitive-complexity` | Západka kognitívnej zložitosti (`eslint-plugin-sonarjs`) — samostatný priechod ESLint; CI spúšťa obe zlúčené do jediného kroku `check:complexity-ratchets`                        | Áno                      |
| `check:dead-code`            | Západka nepoužívaných exportov/súborov (knip) sa oproti východiskovej hodnote nezhoršila                                                                                          | Áno                      |
| `check:compression-budget`   | Rozpočet benchmarku kompresie — minimálne úspory tokenov pre jednotlivé enginy sa nesmú zhoršiť                                                                                   | Áno                      |
| `check:type-coverage`        | Západka percenta typovaného kódu (`type-coverage`) sa nezhoršila; z veľkej časti nahrádza `typecheck:noimplicit:core`                                                             | Áno                      |
| `check:codeql-ratchet`       | Počet otvorených upozornení CodeQL sa nezhoršil (číta cez `gh api`; bez tokenu sa korektne preskočí) — interval obnovovania a manuálne spustenie: pozrite nižšie „Západka CodeQL“ | Áno                      |

### Úloha: `quality-extended`

Úloha blokuje príslušných kandidátov. Veľkosť balíka, nálezy tajných údajov, nálezy
zraniteľností, nálezy v pracovných postupoch a zmeny OpenAPI sa kontrolujú pomocou povinných západiek.
Diagnostika cyklických závislostí zostáva iba informatívna. Inštalácia skenerov je povinná:
`scripts/ci/install-quality-scanners.sh` zabezpečuje pripnuté verzie a propaguje
zlyhania inštalácie. Chýbajúce nástroje, neplatné správy alebo chýbajúce východiskové hodnoty ponechajú
povinnú kontrolu skenera v stave INCOMPLETE.

| Skript                   | Overuje                                                                                                                                                                                                                                                             | Blokovanie                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `check:circular-deps`    | Žiadne cyklické závislosti (dpdm)                                                                                                                                                                                                                                   | **Informačné**                                         |
| `check:bundle-size`      | Veľkosť balíka neprekračuje limit; nedostupné meranie spôsobí zlyhanie                                                                                                                                                                                              | **Blokujúce s --ratchet**                              |
| `check:secrets`          | Nálezy Gitleaks sa nezhoršujú; povinné kontroly odmietnu chýbajúce nástroje, zdroj alebo základnú hodnotu, neúspešné kontroly a neplatné správy                                                                                                                     | **Blokujúce s --ratchet**                              |
| `check:vuln-ratchet`     | Zraniteľnosti závislostí sa nezhoršujú; povinné kontroly odmietnu chýbajúce nástroje, neplatné správy alebo chýbajúce základné hodnoty                                                                                                                              | **Blokujúce s --ratchet**                              |
| `check:workflows`        | Kontrola pracovných postupov (actionlint + zizmor); chýbajúce alebo nefunkčné skenery, neplatné správy či chýbajúca základná hodnota ratchetu spôsobia zlyhanie so stavom INCOMPLETE. Platné nálezy sa riadia vybranou prísnou, informačnou alebo ratchet politikou | Vykonanie je povinné; zizmor ratchet je v CI blokujúci |
| `check:openapi-breaking` | Verejný kontrakt API sa porovnáva s pripnutými commitmi udalostí (merge-base PR, stav pred pushom, základ merge-group; pri plánovanom alebo manuálnom spustení prvý rodič checkoutu); povinné meranie pri chybe zablokuje proces                                    | **Blokujúce s --ratchet**                              |

### Úloha: `docs-sync-strict`

Pri pull requestoch do `main` alebo `release/**` sa táto úloha spúšťa iba pre kandidátov, ktorí nie sú konceptmi (alebo sú v dôveryhodnom fronte) a sú klasifikovaní ako zmeny dokumentácie alebo kódu. Spúšťa sa aj pri udalostiach CI mimo PR; push spúšťač tohto workflowu sa vzťahuje iba na `main`, nie na `release/**`. Krok, ktorý skončí s nenulovým návratovým kódom, úlohu zablokuje; nižšie uvedené iba hlásené zistenia a zdokumentované výnimky ju neblokujú.

| Skript                         | Overuje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Blokovanie                                                                                                                   |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Metakontrola, ktorá postupne spustí 7 nižšie uvedených čiastkových kontrol                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Áno                                                                                                                          |
| ↳ `check:docs-sync`            | Konzistentnosť verzií balíka/OpenAPI/CHANGELOG, presné zrkadlá `llm.txt`, invarianty sekcií/veľkosti preloženého CHANGELOG-u a neprítomnosť nahradených duplicitných dokumentov                                                                                                                                                                                                                                                                                                                                                  | Áno                                                                                                                          |
| ↳ `check:docs-frontmatter`     | Skompilované stránky dokumentácie obsahujú platné názvy vo frontmatteri                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Áno                                                                                                                          |
| ↳ `check:docs-counts`          | Invarianty počtov s vysokou spoľahlivosťou sú prísne; heuristické kontroly počtu súborov iba upozorňujú, pokiaľ skript nedostane `--strict` (metakontrola CI ho neodovzdáva)                                                                                                                                                                                                                                                                                                                                                     | Prísna úroveň blokuje; mäkká úroveň je odporúčacia                                                                           |
| ↳ `check:env-doc-sync`         | Čítania premenných prostredia v zdrojovom kóde, `.env.example` a `docs/reference/ENVIRONMENT.md` sú v zhode po uplatnení explicitných zoznamov výnimiek ignore, doc-only a env-only                                                                                                                                                                                                                                                                                                                                              | Áno, mimo zdokumentovaných zoznamov výnimiek                                                                                 |
| ↳ `check:deprecated-versions`  | Hlási potenciálne zastarané verzie mimo bezpečných historických kontextov a staré dátumy aktualizácie, pričom vynecháva ignorované dokumenty                                                                                                                                                                                                                                                                                                                                                                                     | Odporúčacie v aktuálnom zapojení CI (`--strict` sa neodovzdáva)                                                              |
| ↳ `check:doc-links`            | Interné markdownové odkazy v dokumentácii odkazujú na existujúce súbory (formát `[text]`/`(path)`)                                                                                                                                                                                                                                                                                                                                                                                                                               | Áno                                                                                                                          |
| ↳ `check:fabricated-docs`      | Trasy, premenné prostredia, príkazy CLI, názvy hookov a cesty k súborom uvedené v dokumentácii existujú v kódovej báze. Tvrdá kontrola cez `--strict`; bez príznaku iba mäkké zlyhanie.                                                                                                                                                                                                                                                                                                                                          | Áno (cez `--strict` v CI)                                                                                                    |
| `check:cli-i18n`               | Použité CLI kľúče `t()` existujú v `en`; `pt-BR` zachováva všetky sekcie najvyššej úrovne; `zh-CN` a `zh-TW` obsahujú všetky kľúče z `en`                                                                                                                                                                                                                                                                                                                                                                                        | Áno                                                                                                                          |
| `check:openapi-coverage`       | Špecifikácia OpenAPI pokrýva aspoň ratchetom stanovenú minimálnu hranicu skutočných trás                                                                                                                                                                                                                                                                                                                                                                                                                                         | Áno                                                                                                                          |
| `check:openapi-security-tiers` | Deklarované anotácie `x-loopback-only`/`x-always-protected` musia mať oporu v `routeGuard.ts`; chyby parsera a nezhody pri doprednej kontrole blokujú. Spätná kontrola chýbajúcich `x-loopback-only` pod výlučne lokálnymi prefixmi upozorňuje a trasy definované iba vzormi sú z tejto spätnej kontroly vynechané.                                                                                                                                                                                                              | Parser/dopredné kontroly blokujú; spätná kontrola je odporúčacia                                                             |
| `check:openapi-routes`         | Každá cesta `/api...` v `openapi.yaml` zodpovedá skutočnej trase bez ohľadu na názvy parametrov po uplatnení odôvodneného zoznamu výnimiek `KNOWN_STALE_SPEC`; zastarané položky zoznamu tiež spôsobujú zlyhanie                                                                                                                                                                                                                                                                                                                 | Áno                                                                                                                          |
| `check:docs-symbols`           | Interné URL odkazy `/api/...` v kanonických dokumentoch, ktoré nie sú zrkadlami, zodpovedajú skutočnej trase alebo rodine trás; odkazy na proxy/upstream/zástupné hodnoty/súbory a odôvodnené položky `KNOWN_STALE_DOC_REFS` sú vynechané, pričom zastarané položky zoznamu výnimiek spôsobujú zlyhanie                                                                                                                                                                                                                          | Áno                                                                                                                          |
| `i18n translation drift`       | Kontroluje hashe zdrojov/cieľov základných dokumentov a pôvod prekladu. Porovnanie v PR pripúšťa iba totožné zdedené zlyhania; nové alebo neoverené nezrovnalosti zdroja, chýbajúceho cieľa, hashu cieľa, zastaraného prekladu alebo vyrovnávacej pamäte sekcií blokujú. Mimo porovnania v PR zlyhania zdroja/chýbajúceho cieľa/hashu cieľa blokujú, zatiaľ čo zastarané preklady a nekonzistentné vyrovnávacie pamäte sekcií zostávajú iba upozorneniami. Chýbajúca vyrovnávacia pamäť sekcií v starom formáte nie je zlyhaním. | Nová/neoverená odchýlka v PR blokuje; totožná zdedená odchýlka je iba upozornením; pravidlá mimo PR závisia od typu zlyhania |

### Úloha: `i18n-ui-coverage`

| Skript                            | Overuje                                                                                                                                                                                                                                   | Blokujúce     |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (inline) | Pokrytie kľúčov i18n používateľského rozhrania je ≥ 65 %                                                                                                                                                                                  | Áno           |
| `check-ui-value-drift` (inline)   | Prepísaná anglická **hodnota** nezanechá žiadny zastaraný preklad                                                                                                                                                                         | Áno           |
| `check-new-key-coverage` (inline) | **Nový** anglický kľúč je preložený v každom locale — značka `__MISSING__:` sa zamietne                                                                                                                                                   | Áno           |
| `check-translation-ratio`         | Pomer skutočných prekladov pre jednotlivé locale (hodnoty identické s angličtinou, zástupné hodnoty alebo chýbajúce listy mimo zoznamu povolených položiek) nesmie prekročiť `config/quality/i18n-translation-baseline.json` + toleranciu | **Blokujúce** |

Vyžaduje `fetch-depth: 0` — kontrola odchýlky hodnôt porovnáva rozdiely v `en.json` voči spoločnému predkovi vetiev.

#### `check-ui-value-drift` — kontrola zastaraných prekladov

Zachytáva jedinú regresiu i18n, ktorú ostatné kontroly zo svojej podstaty nedokážu odhaliť: anglická hodnota
sa prepíše, ale preklady odvodené z _predchádzajúcej_ anglickej verzie zostanú zachované, takže
používatelia iných jazykov naďalej čítajú sebavedomo formulovaný, no už nesprávny text.

Toto sa skutočne dostalo do produkcie. Hodnota `oauthModal.googleOAuthWarning` bola prepísaná pri pridaní
pomocníka na prihlásenie Antigravity (#5203); **39 zo 43 locale** si ponechalo text, ktorý operátorom
hovoril, aby „skopírovali úplnú adresu URL a vložili ju nižšie“ — postup, ktorý sa pri danom poskytovateľovi
nedá dokončiť. Problém zostal nepovšimnutý až do #8463, pretože:

- `sync-ui-keys` dopĺňa iba kľúče, ktoré **chýbajú**, nikdy nie tie, ktoré sú **zastarané**;
- `check-ui-keys-coverage` počíta _prítomnosť_ kľúča, takže zastaraný preklad sa považuje za pokrytý;
- `check-translation-drift` sleduje zrkadlá dokumentácie `docs/i18n/<locale>/**.md` —
  súbory `src/i18n/messages/*.json` vôbec nečíta. Od opätovnej synchronizácie 2026-09 blokuje v úlohe
  `docs-sync-strict`: upravte základný dokument → `npm run i18n:run -- --files=<doc>` (na úrovni sekcií, nenáročné).

**Zohľadňuje rozdiely, neopiera sa o základnú hodnotu.** Porovnáva `en.json` v spoločnom predkovi vetiev
s pracovným stromom; pre každý kľúč, ktorého anglická hodnota sa zmenila, je každé locale, ktoré stále
obsahuje nedotknutý preklad, zastarané. Týmto sa zámerne **zmrazuje existujúci dlh** — rozdiel
nedokáže odhaliť, z ktorej starej anglickej verzie dlhodobo existujúci preklad pochádza, preto kontrola
posudzuje iba to, čoho sa aktuálna zmena dotýka. Alternatíva (základná hodnota hashov pre jednotlivé kľúče)
by si vyžadovala približne 600 KB vygenerovaný súbor, 3× väčší než najväčšia existujúca základná hodnota,
ktorý by sa menil pri každom PR pre i18n.

Kontrolu možno splniť dvoma spôsobmi:

1. aktualizovať dotknuté preklady alebo
2. nastaviť ich na `__MISSING__:<new english>` — behové prostredie potom poskytne opravenú anglickú verziu
   (`src/i18n/request.ts::deepMergeFallback`, #7258) a kľúč sa zaradí do frontu na preklad.

Ak sa zmenil **význam** reťazca, uprednostnite **premenovanie kľúča**: nový kľúč nemôže zdediť
zastaraný preklad. Tento postup bol použitý v #8463.

```bash
npm run i18n:check-value-drift          # prísne (spúšťa sa v CI)
npm run i18n:check-value-drift:warn     # iba hlásenie
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Kontroly odchýlok hodnôt a nových kľúčov používajú rovnaké nemenné porovnanie zo súboru
`scripts/i18n/resolve-ui-diff-base.mjs`. Pracovný postup odovzdáva obom kontrolám rovnaké SHA
základu, špičky základu a kandidáta. Spustenia pri PR/zmene cieľovej vetvy, odoslaní zmien
a skupine zlučovania používajú kontext svojej udalosti. Manuálne spustenie pre kandidátsku
vetvu vyžaduje jej presný otvorený PR alebo explicitný vstup
`i18n_base_sha`. Manuálne alebo plánované sledovanie vetvy `main` či `release/vX.Y.Z`
bez tohto vstupu porovnáva posledný commit s jeho prvým rodičom; nejde o audit
všetkého zdedeného dlhu v prekladoch. Lokálne spustenie vyžaduje explicitný základ porovnania,
napríklad vyššie uvedený príkaz `BASE_REF`.

Chýbajúci alebo nejednoznačný kontext porovnania, nečitateľný alebo neplatný povinný katalóg a
zmenený kandidát vedú k výsledku `INCOMPLETE` s návratovým kódom **2**, a to aj v režime upozornenia.
Katalógy sa načítavajú pomocou `scripts/i18n/read-ui-catalog.mjs`; chyby načítania sa nenahrádzajú
prázdnymi objektmi. Nedostupný základ ani neúplný vstup nepredstavujú stav PASS.

### Úloha: `i18n`

Úplná matica overovania i18n (jedna úloha pre každé locale). Celá úloha je informatívna.

| Skript                          | Overuje                                | Blokujúce                                                   |
| ------------------------------- | -------------------------------------- | ----------------------------------------------------------- |
| `validate_translation.py quick` | Úplnosť prekladu pre jednotlivé locale | **Informatívne** (`continue-on-error: true` pre celú úlohu) |

### Úloha: `pr-test-policy`

Spúšťa sa iba pri požiadavkách na zlúčenie.

| Skript                 | Overuje                                                                                                                                                       | Blokujúce |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PR, ktoré menia produkčný kód v `src/`, `open-sse/`, `electron/` alebo `bin/`, musia obsahovať alebo aktualizovať testy (pevné pravidlo č. 8)                 | Áno       |
| `check:test-masking`   | Zmenené testovacie súbory neznižujú čistý počet asercií ani nepridávajú tautológie `assert.ok(true)`                                                          | Áno       |
| `check:pr-evidence`    | Telo PR uvádza dôkazy o testovaní/VPS pre danú zmenu (automatizuje pevné pravidlo č. 18 vyhľadávaním v texte PR — krehké, pozrite si zoznam plánovaných úloh) | Áno       |

### Úloha: `test-vitest`

Vyžaduje úlohu klasifikácie `changes`. Príslušné časti matice pri zlyhaní zablokujú zlúčenie.

| Sada             | Overuje                                                                    | Blokujúca                                                                                                                 |
| ---------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Server MCP (110 nástrojov), autoCombo, vyrovnávacia pamäť — spúšťač vitest | Áno                                                                                                                       |
| `test:vitest:ui` | Testy komponentov používateľského rozhrania — spúšťač vitest               | **Blokujúca** — už existujúce zlyhania sú explicitne vylúčené v `vitest.config.ts`; nové zlyhania spôsobia zlyhanie úlohy |

### Nočné pracovné postupy (plánované, informatívne)

Spúšťajú sa podľa plánu cron (a cez `workflow_dispatch`), nikdy nie pri PR. Všetky sú informatívne.

| Pracovný postup        | Overuje                                                                                                                                                              | Blokujúci        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | Testy vlastností fast-check s náhodným seedom a vysokým počtom spustení                                                                                              | **Informatívny** |
| `nightly-resilience`   | Kontrola rastu haldy, vkladanie chaotických porúch, záťažové a dlhodobé testy k6                                                                                     | **Informatívny** |
| `nightly-llm-security` | Ochrana pred injekciou promptfoo (režim blokovania) + sondy garak (preskočené bez tajného kľúča poskytovateľa)                                                       | **Informatívny** |
| `nightly-schemathesis` | Fuzzing kontraktu OpenAPI (schemathesis) voči spustenému OmniRoute pomocou `docs/openapi.yaml` — odhaľuje porušenia špecifikácie / neošetrené chyby 500 (Fáza 8 B.4) | **Informatívny** |
| `nightly-mutation`     | Skóre mutačného testovania Stryker nad rýchlou vetvou jednotkových testov — preživšie mutanty odhaľujú slabé asercie                                                 | **Informatívny** |
| `nightly-compat`       | Matica kompatibility jadra Node naprieč podporovanými rozsahmi `engines.node`                                                                                        | **Informatívny** |

Výkonnostné základné hodnoty (halda, TTFB, čas zostavenia) sa zaznamenávajú, ale nie sú podmienkou úspechu: pozrite si [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Fáza rýchlosti (2026-08-30 → v4.0 LTS): každý základ bol uvoľnený o 20 %

Rozhodnutie vlastníka (2026-08-30): až do modularizácie vo v4.0 je rýchlosť vydávania dôležitejšia
než udržiavanie technického dlhu na uzde. Každý **číselný** základ sprísňovacieho mechanizmu bol v jednom
auditovateľnom kroku uvoľnený o 20 % a táto fáza je deklarovaná v `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Čo sa zmenilo                                                                                                                                                                                                             | Kde                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — počty, kde je nižšia hodnota lepšia, ×1.2; percentá, kde je vyššia hodnota lepšia, ÷1.2 (minimum pokrytia zostalo 60, `eslintErrors` zostáva 0, `eslintWarnings` 0 → 20 % zmrazeného počtu potlačení) | `quality-baseline.json` (poznámka `_relax_velocity_2026_08_30` uvádza každú zmenu pred → po)           |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                          | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, každý limit riadkov `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                  | `file-size-baseline.json`                                                                              |
| počty na súbor / na súbor kódu TS ×1.2                                                                                                                                                                                    | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                       | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` má iba poradný charakter, pokiaľ `_policy.requireTighten === false`                                                                                                                                   | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| nočná úloha `bank-ratchet-shrinks` je pozastavená (uložila by namerané zníženie a zrušila rezervu)                                                                                                                        | `.github/workflows/nightly-release-green.yml`                                                          |

Zoznamy povolených výnimiek (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **nie sú** rozpočty a neboli zmenené. Zásady kontrol úspechu/neúspechu (tajomstvá, pravidlá SQL,
kontrakt dokumentácie/prostredia, zhoda i18n, jednotkové testy) zostávajú nezmenené — neúspešný test je stále neúspešný test.

**Nástroje**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — jednorazové
  uvoľnenie (`scripts/quality/relax-baselines.mjs`); odmietne sa spustiť dvakrát s tou istou
  poznámkou.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  meria každú číselnú kontrolu rovnakým spôsobom ako CI a vypíše zostávajúcu rezervu pre každú kontrolu
  (`scripts/quality/baseline-headroom.mjs`). Nočná úloha `baseline-headroom` publikuje
  tabuľku v súhrne behu pracovného postupu a nahrá svoju správu vo formáte JSON/Markdown ako
  `baseline-headroom-<run_id>` s dobou uchovávania 90 dní. Varovné a kritické riadky označujú kontroly,
  ktoré sú do 10 % od svojho limitu alebo ho už prekročili. Tieto správy kontrolujte ako včasné upozornenie
  na spotrebovávanie rozpočtov; preskúmajte poznámky `_rebaseline_*` príslušnej kontroly. Úloha už
  nevytvára ani neaktualizuje trvalý problém; #12149 uchováva históriu predchádzajúcich správ.

**Režim nového kódu (Clean-as-You-Code) — od 2026-08-30, iba zrýchlená cesta pre PR**

Pri udalostiach `pull_request` odovzdáva `quality.yml` parameter `--base-ref <PR base SHA>` kontrolám `check:file-size`,
`check:complexity-ratchets` a `check:dead-code`. Pri kontrolách `check:complexity-ratchets` a
`check:dead-code` kontrola porovnáva HEAD so spoločným predkom **s obmedzením na súbory, ktorých sa PR
dotkol** (`scripts/check/newCodeMode.mjs`: spoločný predok sa materializuje v dočasnom
`git worktree`, ESLint/knip sa spustia tam aj na HEAD a následne sa porovnajú počty pre jednotlivé súbory):

- **blokujúce** — PR pridal porušenia cyklomatickej/kognitívnej zložitosti alebo nepoužívané exporty v súboroch, ktoré zmenil
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` v protokole);
- **informatívne** — globálny súčet oproti zmrazenému referenčnému stavu. Zdedená odchýlka nikdy
  nespôsobí zlyhanie nevinného PR; odchýlka sa sleduje na opravu pri zosúladení vydania a monitoruje
  ju úloha headroom.

`check:file-size` používa základnú referenciu podľa vlastných pravidiel (`scripts/check/check-file-size.mjs`, #8522):
kontroluje každý zdrojový a testovací súbor v strome, načíta počet riadkov každého z nich v základe PR
pomocou `git show` a označí súbor ako neúspešný iba vtedy, keď narastie nad vyššiu hodnotu zo svojho základného stropu
(`frozen` / `testFrozen` alebo `cap` / `testCap` pre súbor mimo základu) a svojej veľkosti
v základe. Súbor, ktorý sa už v základe odchýlil, preto nikdy nespôsobí zlyhanie nevinného PR.

`check:boundary:ratchet` uplatňuje rovnaké pravidlo na svoje jediné číslo
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): pri udalostiach PR odovzdávajú
rýchle kontroly v `quality.yml` aj lint úloha v `ci.yml` základný SHA PR, základný commit sa
meria z exportu `git archive` a PR zlyhá iba vtedy, keď jeho počet hrán `open-sse → src`
prekročí vyššiu z hodnôt `metrics.boundaryOpenSseToSrc` a počtu na základe. Posun základu nad
strop sa hlási (`base drift herdado`), ale nikdy nespôsobí zlyhanie nevinného PR; push → main
naďalej používa absolútny strop a pri nerozpoznateľnom základnom SHA sa s upozornením použije
ako náhradné riešenie tento strop.

Spustenia `workflow_dispatch`, záverečná kontrola zeleného vydania a nočná úloha na kontrolu rezervy
nemajú základ PR a zachovávajú absolútne (globálne) porovnanie. Pokrytie, duplicita a pokrytie typmi
zatiaľ zostávajú globálne (ich nástroje nedokážu lacno vytvoriť rozdiel podľa jednotlivých súborov)
— sú to kandidáti na rovnaký prístup.

**Ukončenie fázy vo v4.0 (LTS = prísnejšie než predtým, nie „návrat do normálu“)**

1. Na čistom konci vetvy `release/v4.0.0`: pre záznam spustite `npm run quality:headroom --json`, potom
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` a `--update` pre každú
   typecheck kontrolu — každá východisková hodnota klesne na nameranú hodnotu.
2. Odstráňte `_policy` zo súboru `quality-baseline.json` (znova aktivuje `--require-tighten` a nočné
   zhromažďovanie rezervy), obnovte `THRESHOLD = 36` (alebo vyššiu hodnotu) v `check-openapi-coverage.mjs`.
3. Tam, kde sa modularizácia vyplatila, sprísnite limity nad rámec nameraných hodnôt: `cap` veľkosti
   súboru späť na 1000 (alebo 800), minimá pokrytia +5, počet nepoužívaných exportov pre
   modularizované balíky na 0.

## Základná línia ratchetu (`quality-baseline.json`)

Mechanizmus ratchetu (`scripts/quality/check-quality-ratchet.mjs`) načíta súbor `quality-baseline.json`
a porovná ho s čerstvo zozbieraným súborom `quality-metrics.json`. Každá metrika, ktorá sa zhorší
nad rámec svojej hodnoty epsilon, spôsobí zlyhanie zostavenia.

Aktuálne sledované metriky:

| Metrika               | Smer   | Význam                                |
| --------------------- | ------ | ------------------------------------- |
| `eslintWarnings`      | `down` | Počet upozornení ESLint nesmie narásť |
| `coverage.statements` | `up`   | Pokrytie príkazov nesmie klesnúť      |
| `coverage.lines`      | `up`   | Pokrytie riadkov nesmie klesnúť       |
| `coverage.functions`  | `up`   | Pokrytie funkcií nesmie klesnúť       |
| `coverage.branches`   | `up`   | Pokrytie vetiev nesmie klesnúť        |

Ak chcete po skutočnom zlepšení aktualizovať základnú líniu:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Príznak `--update` zapíše aktuálne namerané hodnoty do súboru `quality-baseline.json`.
Tento súbor potvrďte spolu so zmenou, ktorá metriku zlepšila. PR, ktorý zlepší
metriku bez aktualizácie základnej línie, zachytí `--require-tighten` (Fáza 6A.5,
implementácia sa pripravuje).

### Ratchet CodeQL: frekvencia obnovenia a manuálne spustenie

`check:codeql-ratchet` načítava **stav repozitára, obnovovaný podľa plánu — nie pri každom PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` hlási
`state: configured`, `schedule: weekly`: ide o kontrolu prostredníctvom predvoleného nastavenia GitHubu, nie o analýzu
pri každom odoslaní zmien. Dôsledok: po zlúčení PR, ktorý OPRAVUJE upozornenia, ratchet naďalej načítava
starý, vyšší počet až do spustenia ďalšej naplánovanej kontroly — preto hlási regresiu
pri každom otvorenom PR vrátane nadväzujúcich PR k opravnému PR, až kým sa kontrola neaktualizuje.

**Manuálne obnovenie**: `gh workflow run codeql.yml --ref release/vX.Y.Z` znova spustí
analýzu a v priebehu niekoľkých minút opätovne zverejní upozornenia. Najprv si prečítajte `.github/workflows/codeql.yml`
— jeho hlavička vysvetľuje, že je určený **iba pre `workflow_dispatch`**, **pretože je v konflikte s
„predvoleným nastavením“ GitHubu** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Obnovenie spúšťačov `push`/`pull_request`/
`schedule` najskôr vyžaduje **zásah vlastníka**: Nastavenia → Zabezpečenie kódu →
CodeQL: Predvolené → Rozšírené. Bez tohto prepnutia nepridávajte spúšťač `schedule:` — spôsobí
iba neúspešné spustenia.

**Po poklese počtu sprísnite základnú líniu** — `node scripts/check/check-codeql-ratchet.mjs
--update` zapíše nový nameraný počet do `quality-baseline.json` →
`metrics.codeqlAlerts.value`, takže ratchet nebude potichu povoľovať regresiu späť
k pôvodnému limitu. Praktický príklad (2026-09-02/03): PR #12502 opravil 7 skutočných upozornení
(13 → 6 nameraných otvorených); PR #12530 sprísnil zmrazenú základnú líniu z 11 → 6, aby sa zhodovala; zostávajúcich
6 upozornení bolo následne zamietnutých s individuálnym odôvodnením pre každé upozornenie, čím sa počet otvorených upozornení znížil na 0.

**O zamietnutiach rozhoduje operátor (Prísne pravidlo č. 14)** — nikdy nezamietajte upozornenie CodeQL
bez zaznamenania technického odôvodnenia v komentári k zamietnutiu: `won't fix` pre
požiadavku nadradeného protokolu, `used in tests` pre testovaciu pomôcku, `false positive`
pre sanitizér, ktorý CodeQL nedokáže rozpoznať (precedens: `docs/security/ERROR_SANITIZATION.md`).

---

## Zásady opakovania testov (WS5.4, v3.8.49)

Opakovanie sa nastavuje pre každý runner samostatne, nikdy nie globálne — plošné opakovanie mení skutočné regresie
na neviditeľné nestability:

| Runner           | Zásady                                                                                                                                             | Dôvod                                                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` iba v CI, s `trace: on-first-retry`                                                                                                   | Časovanie prehliadača/siete je skutočne nedeterministické; jedno opakovanie so záznamom zmení nestabilitu na diagnostikovateľný artefakt |
| Vitest           | ŽIADNE globálne opakovanie. Preukázateľne nestabilný test dostane explicitné opakovanie pre konkrétny test (viditeľné v diffe, skontrolované v PR) | Udržiava zoznam testov v karanténe v repozitári, nikdy nie skrytý                                                                        |
| node:test (unit) | ŽIADNE opakovanie, nikdy                                                                                                                           | Nestabilný jednotkový test je chyba v teste — opravte ho, nespúšťajte ho jednoducho znova                                                |

Cieľové SLO po zavedení telemetrie nestabilít (WS5.2/5.3): <1 % miera nestability na test
(prah „opraviť teraz“), ≥95 % úspešnosť na pipeline. Referenčné hodnoty z odvetvia —
prekalibrujte ich podľa našich vlastných meraní.

## Odchýlka západiek na úrovni vydania (WS5.5, v3.8.49)

Keď sa západka (veľkosť súboru, zložitosť, upozornenia eslint) zhorší na ČISTOM vrchole
vydania — t. j. zhoršila ju KOMBINÁCIA zlúčení a žiadny jednotlivý PR nereprodukuje
regresiu vo svojej vlastnej vetve — oprava patrí **kapitánovi vydania, jednorazovo, vo
vetve vydania**: uprednostnite extrakciu/refaktoring; základnú hodnotu aktualizujte iba so zdokumentovaným
odôvodnením. Nikdy neprenášajte kombinovanú odchýlku na PR prispievateľa a nikdy
neaktualizujte základnú hodnotu pre každý PR samostatne (to skrýva skutočné regresie). Najprv rozlíšte príčinu: reprodukujte
neúspešný stav na čistom vrchole v skúšobnom worktree skôr, než predpokladáte, že ho spôsobil váš PR.

## Ukladanie sprísnení západiek — smerom nadol (#8584)

Západka je automatická iba napoly, a práve v nesprávnej polovici. **Zvýšenie** limitu je
manuálna úprava JSON, ktorá trvá desať sekúnd a predstavuje najrýchlejší spôsob, ako odblokovať neúspešný PR.
**Zníženie** limitu vyžaduje, aby niekto spustil `--update` a commitol výsledok — a kým
nebola nasadená úloha `bank-ratchet-shrinks`, žiadny workflow ju nespúšťal. Nameraný dôsledok
(2026-07-25): 18 zmrazených súborov už malo najviac 800 riadkov, teda limit pre nové súbory, pričom najhorší
prípad dosahoval 132× (`src/shared/validation/schemas.ts`, 19 riadkov s limitom 2 523); strop
zložitosti sa posunul z `1794 → 2169` počas približne 37 poznámok o aktualizácii základnej hodnoty s presne jedným
znížením (−1); a fráza „sprísniť pomocou `--update` v ďalšom cykle“ bola napísaná 31-krát a dodržaná
raz. Limit, ktorý pretrvá dlhšie než kód, pre ktorý vznikol, potichu mení každý dokončený
rozklad na povolenie rastu pre kohokoľvek, kto súbor upraví nabudúce.

`nightly-release-green.yml` → úloha **`bank-ratchet-shrinks`** uzatvára túto slučku:

|               |                                                                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Spúšťa sa pri | `schedule` (3× denne) + `workflow_dispatch` — zámerne **nie** pri `push`                                                  |
| Meria         | najvyššiu vetvu `release/vX.Y.Z`, s rovnakým rozlíšením a ochranou pred injektovaním ako `release-green`                  |
| Zapisuje      | `check:file-size --update` a `check:complexity-ratchets --update` (obe sú svojou konštrukciou určené iba na sprísňovanie) |
| Overuje       | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                                  |
| Dodáva        | jeden vždy aktuálny PR proti vetve vydania — vynútene aktualizovaný, nikdy nevytvára spam                                 |

Ukladanie sa vykonáva dávkovo namiesto každého pushu, pretože nemá požiadavku na latenciu (sprísnenie
uložené do 8 hodín je v poriadku), zatiaľ čo spustenie po každom zlúčení by počas kampaní
zlučovania opakovane zostavovalo vetvu PR a zakaždým by platilo náklady na úplný prechod ESLint. Detekcia zostáva naviazaná na
push (`release-green`); iba ukladanie prebieha dávkovo.

### Bezpečnostný overovač

Úloha zapisuje do základných hodnôt bez dozoru, takže prijateľnosť tohto postupu zabezpečuje
`verify-ratchet-bank.mjs`. Porovná strom po vykonaní `--update` so stavom `HEAD` a **preruší úlohu
pred vytvorením akéhokoľvek commitu** — bez otvorenia PR — pokiaľ každá zmena nie je jednou z nasledujúcich:

- číselná položka `frozen` / `testFrozen` bola **znížená** alebo **odstránená**
- `complexity-baseline.json` → `count` bolo **znížené**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` bolo **znížené**

Čokoľvek iné zlyhá: zvýšenie čísla, pridanie položky, zmena `cap`/`testCap` alebo
odstránenie/prepísanie poznámky `_rebaseline_*` (tieto poznámky predstavujú auditnú stopu dôvodu existencie
každého stropu a sú uložené v rovnakom objekte `frozen` ako položky súborov).
Bot, ktorý by mohol zvýšiť limit, by bol jednoznačne horší než súčasný stav. Ochrana pred regresiou:
`tests/unit/verify-ratchet-bank.test.ts`.

Úloha nikdy nevykonáva push do `release/*` — PR zlučuje človek, takže nesprávne meranie
sa nemôže dostať do vetvy bez kontroly.

## Zásady zoznamu povolených výnimiek

Každá brána, ktorá nemôže zlyhať na už existujúcich porušeniach, používa nemenný zoznam povolených výnimiek
(napr. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Platí táto zásada:

**Odstráňte základnú príčinu; zoznam povolených výnimiek použite iba vtedy, keď porušenie už existovalo a
nemožno ho opraviť v tom istom PR.**

Pri pridávaní položky do zoznamu povolených výnimiek:

1. Pridajte komentár s odôvodnením.
2. Uveďte odkaz na sledovací problém (napr. `// #3498 — Phase 2 feature, not yet implemented`).
3. Odstráňte položku v tom istom PR, ktorý opravuje porušenie — zastaraná položka, ktorá už
   nepotláča aktívne porušenie, je sama osebe chybou (kontrola zastaraného vynucovania 6A.3
   po implementácii spôsobí zlyhanie brány pri osamotenej položke v zozname povolených výnimiek).

**Nepridávajte** položky do zoznamu povolených výnimiek len preto, aby testy prešli rýchlejšie. Zelená brána s rastúcim
zoznamom povolených výnimiek vytvára falošný pocit kvality.

### Keď brána vo vašom PR zlyhá

1. **Pozorne si prečítajte výstup brány** — presne vám oznámi, ktorý súbor alebo symbol porušil
   pravidlo.
2. **Opravte porušenie** — väčšina brán vykonáva deterministické kontroly súborového systému, ktoré prejdú hneď,
   ako je kód správny.
3. **Ak porušenie už existovalo** (t. j. nezaviedli ste ho vy, ale brána ho teraz
   zahŕňa): pridajte položku do zoznamu povolených výnimiek s komentárom obsahujúcim odôvodnenie a odkazom na sledovací problém.
4. **Ak je brána typu ratchet** (pokrytie, upozornenia ESLint, duplicita, komplexnosť):
   vaša zmena zhoršila metriku. Opravte základný problém alebo (vo výnimočných prípadoch) spustite
   `npm run quality:ratchet -- --update`, ak je zmena zámerná a zhoršenie metriky
   prijateľné — v popise PR však zdokumentujte dôvod.
5. **Poradné brány** (`continue-on-error: true`) sú informatívne — neblokujú
   zlúčenie, ale zobrazujú sa v súhrne CI. Napriek tomu ich opravte.

---

## Pridanie novej brány

1. Vytvorte `scripts/check/check-<name>.mjs` (alebo `.ts`). Brány zásad sa ukončujú s kódom 0/1.
   Brány západkového typu zapisujú metriku do `quality-metrics.json` prostredníctvom `collect-metrics.mjs`.
2. Pridajte `"check:<name>": "node scripts/check/check-<name>.mjs"` do `package.json` a
   synchronizujte alias a jeho presný príkaz v `config/quality/gate-manifest.json`.
   Rovnakú synchronizáciu vykonajte aj pri zmene alebo odstránení existujúceho validačného aliasu.
   Spustite `npm run check:gate-manifest`; hook pre pre-commit a klasifikácia zmien v CI
   vynucujú túto zmluvu.
3. Zapojte ju v `.github/workflows/ci.yml` do príslušnej úlohy
   (zásada → `lint` alebo `docs-sync-strict`; západka → `quality-gate`).
4. Ak používa zoznam povolených položiek, aplikujte `reportStaleEntries()` zo súboru
   `scripts/check/lib/allowlist.mjs`, aby sa zastarané položky zisťovali automaticky.
5. Napíšte test v `tests/unit/build/`, ktorý pokrýva detekčnú logiku brány.
6. Aktualizujte tento dokument (pridajte riadok do tabuľky príslušnej úlohy).

---

## Nástroje pre agentov: LSP-in-the-loop (voliteľné)

Okrem brán CI obsahuje OmniRoute aj **voliteľnú** kostru `agent-lsp`
(projektový súbor `.mcp.json`, fáza 7, úloha 15). Vytvorte `.mcp.json`,
aby ste sprístupnili jazykový server TypeScript programovacím agentom, vďaka čomu budú riešiť symboly /
diagnostiku **pred** písaním kódu — ide o doplnok ku `typecheck:core` založený na princípe kompilácie pred tvrdením,
ktorý odstraňuje chyby „vymyslených symbolov“ už pri zdroji. Zámerne sa
nenačítava automaticky (most MCP↔LSP si vyberáte a overujete sami); nefunkčná položka iba zaznamená
chybu pripojenia a nikdy nepreruší relácie.

---

## Zoznam racionalizačných úloh (kontrola ROI — Fáza 9 Vlna 3)

Tento inventár bol zosúladený s `ci.yml` dňa 2026-06-17 (predchádzajúca verzia vynechala
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Kontrola ROI zosúladenej množiny
identifikovala nasledujúcich kandidátov na racionalizáciu. **Zlúčenia sú mechanické zmeny CI;
prepnutia a odstránenia sú politické rozhodnutia vyhradené pre operátora.** Nič z nižšie
uvedeného zatiaľ nebolo aplikované.

**Vyššie takisto nezdokumentované** (informatívne, slabý signál): úloha `docs-lint`
(markdownlint + Vale, celá úloha s `continue-on-error`) a samostatné pracovné postupy skenerov
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. Hodnota `semgrepFindings: 0` sa nachádza v
`quality-baseline.json`, ale v `ci.yml` nie je napojená na blokujúcu západku — metrika je
momentálne osirelá.

### Zlúčenie / deduplikácia (mechanické, nižšie riziko)

Každý kandidát bol 2026-06-17 overený voči aktuálnemu stavu kontrolnej brány (dôveruj, ale preveruj);
ukázalo sa, že viaceré „samozrejmé“ zlúčenia skrývajú dlh a **nie sú** bezproblémovými náhradami.

- **`check:docs-sync` sa spúšťa dvakrát** — samostatne v úlohe `lint` a znova v rámci `check:docs-all` (`docs-sync-strict`) a husky hooku pred commitom. ✅ **HOTOVO** — samostatné spustenie v `lint` bolo odstránené.
- **Skenovanie CVE** — ❌ **NIE JE to bezproblémové zlúčenie.** `audit:deps` blokuje kritické upozornenia a neúplné audity vo všetkých piatich lockfiloch, zatiaľ čo upozornenia s vysokou závažnosťou podľa aktuálnej politiky hlási ako varovania; `check:vuln-ratchet` (osv) zlyhá iba pri _regresii_ oproti baseline uloženej v repozitári a odmietne chýbajúce merania, keď sú povinné. Odlišná sémantika — odstránením `audit:deps` by sa stratila absolútna brána pre kritické nálezy aj nezávislé doklady z auditu balíkov. Ponechajte obe.
- **Detekcia cyklov** — ✅ **HOTOVO** (#15159 G-01/G-02). Starý text tu označoval `check:cycles` za „zelenú, kurátorovanú“ bránu a odôvodňoval jej ponechanie v blokujúcom režime tým, že `check:circular-deps` (dpdm) hlásil 91 cyklov. Tento zelený stav bol **falošne zelený**: `check:cycles` skenoval 5 podadresárov (450 súborov), rozpoznával iba statické `import|export … from` a zahadzoval každý špecifikátor `@/` a `@omniroute/open-sse/`, takže nedokázal odhaliť cykly s dynamickými importmi a aliasmi, ktoré v repozitári prevažovali. Opravené: brána teraz prechádza `src` + `open-sse` (5023 súborov), získava špecifikátory z AST TypeScriptu (takže `import("…")` sa započítava, zatiaľ čo `typeof import("…")` v typovej pozícii nie) a rozpoznáva `paths` z tsconfigu. Nachádza **14** cyklov, nie 0. Keďže 14 už existujúcich cyklov nemožno opraviť v PR pre bránu, `check:cycles` je teraz **západka** (`--ratchet`, strop `metrics.cycles.value = 14` v `quality-baseline.json`, `direction: down`) — blokuje každú _regresiu_ a počet môže iba klesať. CI spúšťa `npm run check:cycles:ratchet`. Postupné znižovanie sa rieši spolu s **A-01**. `check:circular-deps` (dpdm) zostáva informatívne ako širší druhý názor.
- **Komplexita** — ✅ **HOTOVO** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): jeden prechod ESLintom, počítanie podľa ruleId, aby baseline pre cyklomatickú zložitosť + maximálny počet riadkov a baseline pre kognitívnu zložitosť zostali nezávislé; jednotlivé `check:complexity` / `check:cognitive-complexity` zostávajú na lokálne použitie s `--update`.
- **Ochrana `/api` proti halucináciám** — ✅ **HOTOVO** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): jeden FS inventár `src/app/api`, openapi-routes + docs-symbols sa naďalej hlásia nezávisle; jednotlivé kontroly zostávajú na lokálne spúšťanie.
- **`check:node-runtime` sa spúšťa v 11 úlohách** — ⚠️ **nízke ROI.** Každá používa samostatný runner a kontrola trvá <1 s; celková úspora je ~10 s, za cenu straty lacnej ochrany v každej úlohe. Nestojí to za narušenie.
- **`typecheck:noimplicit:core` v CI lintovaní** — ✅ **odstránené z úlohy lint** (bolo informatívne s `continue-on-error`); blokujúci typový povrch tvoria `typecheck:core` + `check:type-coverage`. Lokálny skript bol zachovaný.

### Prepnúť / rozhodnúť (politika operátora)

- `check:openapi-security-tiers` (informatívne) — ❌ **NEDÁ SA bezproblémovo prepnúť.** Končí s kódom 0, ale upozorňuje, že viacerým trasám `traffic-inspector` pod `LOCAL_ONLY_API_PREFIXES` chýba anotácia `x-loopback-only: true`. Jeho vynútenie si najprv vyžaduje pridanie týchto anotácií do `openapi.yaml`.
- `typecheck:noimplicit:core` (informatívne) — z veľkej časti ho nahrádza blokujúca západka `check:type-coverage`. Prepnite ho na západku alebo odstráňte redundantný druhý prechod `tsc`.
- `test:vitest:ui` (teraz **blokujúce**) — už existujúce zlyhania sú explicitne vylúčené v `vitest.config.ts` pomocou sledovacích komentárov `// #8618`; nové zlyhania spôsobia zlyhanie úlohy.
- `check:secrets` (gitleaks, blokujúca západka) — aktuálny strop je `metrics.secretFindings` v `quality-baseline.json`. Každá výnimka potrebuje odôvodnenú položku v `.gitleaks.toml`; nedostupné meranie má stav INCOMPLETE. Sken dopĺňa natívne skenovanie tajomstiev v GitHube a `check:public-creds`.
- `check:pr-evidence` (blokujúce, prehľadáva prózu v tele PR pomocou grepu) — vysoké riziko falošne pozitívnych výsledkov; jeho odstránenie oslabí vynucovanie tvrdého pravidla č. 18, takže ide o skutočné politické rozhodnutie.
- `semgrep` (informatívne, samostatné) — pre rodiny OWASP sa prekrýva s CodeQL; napojte jeho baseline na západku alebo ho odstráňte.

---

## Súvisiaca dokumentácia

- Dodávateľský reťazec (pôvod, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — kontrola zhody množín kľúčov

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, úloha `i18n-ui-coverage`).
Porovnáva množinu koncových kľúčov každého súboru `src/i18n/messages/<locale>.json` so súborom `en.json` a zlyhá
pri každom chýbajúcom alebo nadbytočnom koncovom kľúči bez ohľadu na to, kedy bol kľúč pridaný. Zástupné hodnoty
`__MISSING__:` sa počítajú ako prítomné (ich obsah rieši kontrola pomeru). Ide o absolútny doplnok
dvoch kontrol založených na rozdieloch/percentách: `check-ui-keys-coverage` vynucuje minimálne 80 % pokrytie pre
každé miestne nastavenie (43 chýbajúcich kľúčov z približne 13 000 sa stále javí ako 99,7 %) a `check-new-key-coverage` posudzuje
iba kľúče, ktoré PR pridáva do `en.json`. Dávka miestnych nastavení sa vygeneruje zo súboru `en.json` v deň,
keď sa vytvorí jej vetva, a prekladá sa niekoľko dní, zatiaľ čo základná vetva naďalej pridáva kľúče; dávkový PR sám
nepridáva žiadny kľúč, takže obe príbuzné kontroly zostali ticho, keď bola dávka 1 (#13044) zlúčená s 43 chýbajúcimi kľúčmi v deviatich
miestnych nastaveniach a dávka 2 (#13660) s 10 chýbajúcimi kľúčmi v ôsmich (2026-09-15). Neúspešnú kontrolu opravte pomocou
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; koncový kľúč označený ako `extra`
znamená, že ho zdroj odstránil — odstráňte ho aj z miestneho nastavenia. `--warn` podá hlásenie bez zlyhania.
`--catalog=cli` spustí rovnaké porovnanie nad `bin/cli/locales` (`npm run i18n:check-keys:cli`);
oba kroky sú súčasťou úlohy `i18n-ui-coverage`.

#### `check-new-key-coverage` — kontrola i18n nových kľúčov

Príbuzná kontrola k `check-ui-value-drift`. Tá zachytáva anglickú hodnotu, ktorá bola **prepísaná**,
zatiaľ čo jej preklady zostali nezmenené; táto zachytáva anglický kľúč, ktorý bol **pridaný**,
ale niektoré miestne nastavenia ho nikdy nedostali.

`check-ui-keys-coverage` nedokáže zachytiť tento prípad: vynucuje minimálne percentuálne pokrytie pre každé miestne nastavenie a
jedenásť chýbajúcich kľúčov z približne 13 000 ponechá pokrytie na úrovni 99,9 %. Percentuálna hodnota pre jednotlivé jazyky nedokáže
vyjadriť „táto funkcia bola vydaná bez prekladu“ — celá funkcia sa môže dostať do nového miestneho nastavenia bez
akéhokoľvek textu a hodnota sa vôbec nezmení.

Incident, ktorý táto kontrola zachytáva: 3. fáza Orchestration Canvas preložila svojich jedenásť kľúčov do
42 miestnych nastavení, ktoré v tom čase existovali. O niekoľko hodín neskôr zvýšila dávka jazykov EÚ (#13044) počet miestnych nastavení
v repozitári na 51 a deväť nových (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ich nikdy
nedostalo. `deepMergeFallback` nahradí chýbajúci kľúč angličtinou, takže výsledkom bolo
nepreložené používateľské rozhranie namiesto prázdneho používateľského rozhrania — skutočný problém, ktorý bol zo svojej podstaty tichý.

Rovnako ako príbuzná kontrola si aj táto **uvedomuje rozdiely**: porovnáva angličtinu v základe zlúčenia s pracovným
stromom, takže už existujúce medzery zostávajú zmrazené a zapnutie kontroly nevyžadovalo žiadnu migráciu.

**Značka `__MISSING__:<english>` tejto kontrole nevyhovie (od 2026-09-17).** Predtým predstavovala
zdokumentovaný odklad — behové prostredie použije ako náhradu správnu angličtinu — až kým osem PR s funkciami
dňa 2026-09-16 nepridalo 61 kľúčov a nevložilo značku do všetkých 65 miestnych nastavení namiesto prekladu: táto
kontrola prijala každý z nich, PR nič nezablokovalo a blokujúca kontrola pomeru skutočných prekladov
následne zlyhala na konci vydania všetkým (pt-BR 3,2 % > 2,5 % + 0,5). Značka sa teraz posudzuje
ako chýbajúci preklad. Neúspešnú kontrolu opravte pomocou
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` alebo
všetky miestne nastavenia paralelne pomocou `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
bezpečný pri odpojení, odmietne sa spustiť bez premenných prostredia `OMNIROUTE_TRANSLATION_*`). Kľúč, ktorý musí zostať
v angličtine (pevne stanovený názov produktu/modulu/príznaku), patrí do `scripts/i18n/untranslatable-keys.json`,
nikdy za značku. `vi` úplne zakazuje značky (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — kontrola odložených testov

Súbor v zozname `exclude` súboru `vitest.config.ts` je test, ktorý sa nespúšťa, no každému, kto číta
strom, sa javí ako pokrytie. Za komentárom sa nahromadilo šesťdesiatdva súborov
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Problém #8618 bol uzavretý
2026-08-11, zatiaľ čo zoznam, ktorý sledoval, narástol zo 45 položiek na 62, pričom každá nová položka zdedila komentár
odkazujúci na už uzavretý problém. Keď sa zoznam napokon zmeral súbor po súbore (#13204), **51 zo 62
prešlo v aktuálnom strome bez akejkoľvek zmeny zdrojového kódu**.

Kontrola vyžaduje, aby každá výnimka odkazujúca na skutočný súbor (a) uvádzala sledovaný problém a
(b) bola uvedená v `config/quality/vitest-exclusions.json` so svojím nameraným stavom, takže jej pridanie predstavuje
kontrolovateľný rozdiel vo vyhradenom súbore namiesto ďalšieho riadka v poli so 60 položkami. Zámerne
opätovne nespúšťa vylúčené testy — trvá to približne 10 minút a patrí to do periodickej úlohy;
inventár zaznamenáva, kedy bol každý z nich naposledy zmeraný.
