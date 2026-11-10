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

## Súpis brány a profily vykonávania

### Prijatie kandidáta

Pracovné postupy CI a Quality Gates vydávajú stabilný verdikt: `Gate / CI` a `Gate / Quality`. Ich verzovaná politika prijímania vymenúva každú upstream prácu podľa požiadaviek alebo odporúčaní. Príslušná požadovaná úloha musí byť úspešná: chýbajúce, zrušené, preskočené, čakajúce a neznáme výsledky nemôžu vytvoriť PASS. Platná klasifikácia len pre dokumenty alebo iba pre katalóg môže spôsobiť, že kódový pruh nebude použiteľný; obyčajný návrh PR nie je akceptovaným kandidátom. Označenie `hotfix` nezbavuje dôkazov.

Oba pracovné postupy pokrývajú PRs do main/release pobočiek, presuny do `main`, manuálne odosielanie a udalosti zlučovacej skupiny. Push, dispatch a merge-group spustia úplný výber. Dôveryhodný koncept frontu Mergify tiež spúšťa príslušné úlohy `full-code`/`full-code-e2e` ; bežné PRs ich preskočte. Pred manuálnym zlúčením spustite úplné odoslanie presného kandidáta. Push to `release/**` nespustí tieto pracovné postupy; Release-Green pozoruje zlúčenú základňu oddelene (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks a merge groups používajú hostovaných bežcov pre úlohy, ktoré inak vyberajú samostatne hostených bežcov; dostatočná hosťovaná kapacita musí byť overená pred zavedením.

Každý doklad JSON identifikuje odhlásený SHA, spustenie pracovného postupu a pokus. CLI odmieta nesúlad checkout/event SHA. Testy pracovného toku spájajú členstvo v politike so zoznamom `needs` úlohy verdiktu, takže nový alebo odstránený pruh nemôže ticho zmiznúť. Potvrdenia pokrývajú ich vlastný pracovný postup, nie publikáciu, nasadenie alebo interné prvky existujúceho poradenského skenera. Vykonávanie príslušných kontrol požadovaných v pravidlách pobočky je samostatnou administratívnou zmenou; definovanie ich pracovných miest samo o sebe nechráni pobočku.

`API Route Typecheck` je nezávislá kontrola pracovného toku, mimo súhrnných verdiktov a statického profilu miestneho úplného pozorovateľa. Skontrolujte jeho výsledok samostatne, aby ste našli presného kandidáta. `.github/workflows/api-route-typecheck.yml` beží na PRs do `main` alebo `release/**`, posiela buď do rodiny vetiev, manuálne odoslanie a udalosti `merge_group` typu `checks_requested`. Nemá žiadny cestný filter. Zlúčiť skupiny skontrolujte `merge_group.head_sha`; ostatné akcie pozrite si `github.sha`. Všetky udalosti používajú rovnaké testy diagnostickej brány a jednotky brány API. Základné retargety PR vyžadujú novú kontrolu; Úpravy body/title používajú iba názov `Admission not requested / API Route Typecheck` na pozorovanie a nemôžu nahradiť vstupnú kontrolu.

### Uchovávané dôkazy v reduktore prijatia

`scripts/quality/validate-release-acceptance.mjs` redukuje zadaný plán a jeho
manifesty; nepreukazuje, že plán pokrýva kompletný proces vydania.
Jeho správy explicitne nastavujú `releaseAcceptance: false`, aj keď je daný plán
`VERIFIED`. Pracovný postup `release-acceptance.yml` stále používa tieňové testovacie
dáta, nie skutočné potvrdenia o zostavení, balení, spustení alebo propagácii.

CLI na overenie uchovávaných dôkazov vyžaduje `--evidence-root`. Súbory sa vyhľadávajú
ako `<evidence-root>/<artifact_id>/<member>` a hašujú pomocou SHA-256. Záznam PASS
bez dôkazov, chýbajúci alebo zmenený súbor, nebezpečná cesta alebo symbolický odkaz
zabraňujú overeniu. Chýbajúce súbory nie sú ekvivalentom prázdnych úspešných protokolov.
Existujúce kontroly SHA/spustenia/pokusu zostávajú nezávislé: zhodné bajty nemôžu
zachrániť zastarané potvrdenie. Integrita súboru nie je dôkazom autenticity vykonania
ani propagácie artefaktu.

### DAST používa overený build CI

Povinná úloha CI `dast-smoke` volá `.github/workflows/dast-smoke.yml` po `build`. Uplatňuje rovnaký výber podľa zmien kódu a stavu draft ako build vrátane podporovaných PR z forkov, PR do release vetiev a skupín zlúčenia. Chýbajúca, neúspešná, zrušená alebo neočakávane preskočená úloha DAST blokuje `Gate / CI`. Opakovane použiteľné workflow nemá samostatný spúšťač PR/manuálneho spustenia; manuálne overenie používa spustenie CI, aby build a spotrebiteľ zostali v jednom behu.

`scripts/ci/next-build-provenance.mjs` zapečatí úplný artefakt Next spolu s digestom tar, repozitárom/udalosťou/behom, pokusom producenta, head/base/checkout/tree, identitami workflow, lockfile, presnou verziou/ABI Node, platformou a bundlerom. DAST vyberá nemenné ID artefaktu z `needs.build.outputs`, vyžaduje overenie digestu pri stiahnutí a pred extrahovaním dvoch povolených položiek pomocou `scripts/ci/unpack-ci-build.py` nezávisle porovná hash ZIP s digestom producenta. Pred extrahovaním stromu Next sa aj manifest a archív tar musia zhodovať s nezávislými výstupmi producenta. Nikdy nehľadá posledný úspešný build vetvy. Čiastočné opakovanie môže znova použiť ten istý pokus producenta, ak sa stále zhodujú jeho ID a všetky vstupy; potvrdenie zaznamenáva oba pokusy.

Spotrebiteľ zostáva na hostovanom Linux runneri s oprávnením na repozitár iba na čítanie a bez tajomstiev repozitára. Nainštaluje presnú verziu Node použitú producentom a potom zostaví CLI s `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` odmietne chýbajúci samostatný server ešte pred akýmkoľvek záložným buildom; bežné lokálne buildy CLI si zachovávajú existujúci záložný postup. Pripravenosť servera, Schemathesis aj promptfoo musia všetky uspieť v nezmenenom limite úlohy 25 minút. Potvrdenie pôvodu dokazuje identitu a bajty vstupov, nie úspešné skenovanie DAST. Exspirácia artefaktu, prerušenie runnera alebo zlyhanie skenera zostávajú neúplným alebo neúspešným dôkazom; poradný wrapper ich nemôže zmeniť na PASS.

### Kapacita vykonávania používateľského rozhrania

CI spúšťa celý inventár používateľského rozhrania ako štyri fragmenty matice
`test-vitest`, každý s najviac dvoma workermi na fragment a existujúcim 15-minútovým
časovým limitom úlohy. Prvý fragment spúšťa aj sadu Vitest MCP/autoCombo. Výsledok
povinnej úlohy pokrýva každú vetvu matice; zlyhanie alebo zrušenie jedného fragmentu
nemôže preukázať prijatie kandidáta.

Nočný pozorovateľ uchováva samostatné potvrdenie presného kandidáta pre každý fragment
používateľského rozhrania vrátane vykonania MCP v prvom potvrdení. Vyžadujú sa všetky
štyri potvrdenia, protokoly a zodpovedajúce identity vykonania. Lokálny príkaz
`npm run test:vitest:ui` naďalej vyberá kompletnú sadu; jedno spustenie s `--shard`
predstavuje iba čiastočný dôkaz.

### Zhromažďovanie pokrytia jednotkových testov

Dvanásť fragmentov jednotkových testov zhromažďuje pokrytie V8 počas existujúceho
vykonávania testov. Úspešný fragment spustí `scripts/ci/compact-v8-coverage.mjs`,
aby skomprimoval pôvodné súbory bez generovania prechodnej správy Istanbul. Záverečná
úloha Coverage overí všetkých dvanásť manifestov voči SHA kandidáta, behovému prostrediu,
koreňu zdrojov a hašom údajov a potom spustí reportéry c8 a existujúce prahové hodnoty
pokrytia. Vstupy zachovávajú globálne poradie názvov súborov c8; predbežné zlúčenie
po jednotlivých fragmentoch nie je bezpečné pri zmiešanom pokrytí funkcií/blokov.
Chýbajúce, nesprávne vytvorené alebo nekompatibilné fragmenty spôsobia zlyhanie prijatia.
Fragmenty s neúspešnými testami uchovávajú nespracované diagnostické pokrytie samostatne;
nemôže vstúpiť do konečného zlúčenia.

### Potvrdenia o priebehu vykonávania jednotkových testov

Zdieľaný príkaz `test:unit:ci:shard` zaznamenáva fázy `primary`, `dashboard` a `serial`
prostredníctvom `scripts/ci/unit-progress-reporter.mjs`. Bežný report testov zostáva
k dispozícii. Samostatné potvrdenie obsahujúce iba metadáta zaznamenáva začiatok a dokončenie
každého súboru a 30-sekundový signál heartbeat uvádza súbory, ktoré sú stále aktívne, spolu
s časom ich vykonávania. Zaznamenávajú sa iba povolené metadáta vykonávania; popisy testov,
výstup, obsah chýb ani úplné prostredie sa neserializujú.

CI uchováva súbory JSONL ako `unit-progress-ci-<run>-<attempt>-<shard>`. Časový limit úlohy môže zabrániť neskoršiemu
nahratiu; už odoslané signály heartbeat zostávajú diagnostickým dôkazom. Chýbajúce signály
heartbeat môžu tiež znamenať zablokovaný alebo ukončený proces runnera. Tieto potvrdenia
zachovávajú existujúci výber testov, súbežnosť, časové limity a návratový stav; nejde
o rozhodnutia o prijatí kandidáta.

### Inventár statického skenovania

Verzovaný inventár aliasov npm a členstvo v statickom skenovaní sa nachádzajú v
`config/quality/gate-manifest.json`. Spustením `npm run check:gate-manifest` overíte
názvy skriptov a presné príkazy voči `package.json`; pridania, odstránenia a odchýlky
príkazov spôsobia zlyhanie lokálneho hooku aj úloh klasifikácie zmien v CI.
Alias nie je úloha pracovného postupu, inštancia matice ani testovací prípad: tieto počty
sa nesmú prezentovať ako vzájomne zameniteľné.

Pomocou `npm run quality:scan -- --list` alebo `npm run quality:scan:fast -- --list`
skontrolujte vybrané aliasy bez ich vykonania. Runner vyvoláva vstupný bod npm, takže
jeho behové prostredie (vrátane Bun tam, kde je nakonfigurované) zostáva zachované.
Manifest zaznamenáva aliasy mimo týchto profilov ako samostatne spúšťané a príkazy
údržby sú v profiloch skenovania iba na čítanie zakázané.

Tieto profily pokrývajú iba statické skenovanie. Necertifikujú testy produktu,
pokrytie, balenie, externé kontroly ani úplné prijatie kandidáta na vydanie.
Prijatie pracovným postupom používa prepojené súbory
`config/quality/admission-policy.json` a `scripts/quality/admission-verdict.mjs`.
Profily pozorovateľa vydania zostávajú samostatné; ich príslušné kontroly a potvrdenia
overujte nezávisle. Statické príkazy úplného pozorovateľa sú deklarované v
`config/quality/release-green-static-profile.json` vrátane `audit:deps`, výberu
mutačných testov a kontrol prekladov. Načítavač overuje príkazy npm voči package.json
a modelovaným deklaráciám CI/Quality; namiesto vykonania tokenov shellu ako argumentov
odmietne odchýlku. Povinný výstup skenera SKIP/INCOMPLETE nemôže preukázať PASS.
Profil zaznamenáva svoje externé výnimky a nenahrádza hostované pokrytie, testovacie
matice, balík ani dôkazy o nasadení. Textový inventár nižšie slúži ako referencia,
nie ako dôkaz, že sa brána skutočne spustila.

Skripty sa nachádzajú v `scripts/check/` (brány politík) a `scripts/quality/`
(ratchet mechanizmus). Zdrojom pravdy pre CI je `.github/workflows/ci.yml`.

### Zdravie zverejnenej dokumentácie

`.github/workflows/i18n-base-health.yml` sleduje stav dokumentácie po vybratých presunoch do `main` a `release/v*` a pri manuálnom odoslaní. Jeho filtre pokrývajú dokumentáciu, root Markdown, `llm.txt`, preklad state/configuration a príslušné nástroje i18n. Jedna úloha `Published base documentation health` využíva hostované Ubuntu a päťminútový termín. Vykonáva overenie len na čítanie a zapisuje diagnostické potvrdenie bez inštalácie závislosti, prekladu alebo prijatia stavu.

`scripts/i18n/check-base-health.mjs` vyžaduje nulové nezrovnalosti zdrojového hašovania, chýbajúceho cieľa, cieľového hašovania, zastaralého prekladu a vyrovnávacej pamäte sekcií. Potvrdzuje tiež súčasný základný rozsah document/locale a jeho zaznamenaný pôvod. Neplatný kontext, neúplné pokrytie alebo prerušená kontrola vytvára `INCOMPLETE`; potvrdený drift produkuje `FAIL`. Obe vrátia stav zlyhania. Potvrdenie je viazané na pokladničku SHA, pracovný postup, spustenie a pokus a uchováva sa ako `i18n-base-health-<sha>-<run>-<attempt>`.

Ide o nezávislé pozorovanie zverejnenej základne. Nepridáva udalosť PR alebo zlučovacej skupiny, požadovanú kontrolu PR, alias npm ani člena profilu statického skenovania. Základná kontrola tiež blokuje všetkých päť tried v absolútnom režime. Bežná príprava PR zostáva oddelená od prijatia. Úspešné odovzdanie nemôže zmeniť výsledok neúspešného stavu na PASS.

Bežný PR používa `--preflight` so základnou správou generovanou `--baseline-evidence`. Anglický zdroj môže ponechať čakajúci iba vtedy, keď sa úplný záznam prekladu a skutočné cieľové bajty nezmenia od tohto presného základu. Stále blokujú nové nezrovnalosti cieľov alebo vyrovnávacej pamäte sekcií a neúplné dôkazy nemôžu povoliť prípravu. Správa odhaľuje `preparationPending` a `mergeReady` oddelene: úspešná príprava neznamená, že čakajúce preklady sú pripravené na zlúčenie. Pred prijatím obnovte postihnuté zrkadlá v zloženom kandidátovi. Dôveryhodný kandidát do fronty Mergify, `merge_group`, presuny pobočiek a manuálne spustenie CI používajú absolútnu kontrolu bez `--warn` alebo odpustenia zdedených porúch. Chýbajúce cieľové hodnoty hash a rozsah zmenšený o vymazané zaznamenané základné súbory nemôžu priniesť úspešný absolútny verdikt.

### Uvoľnite rýchlu cestu PR (`quality.yml`)

`.github/workflows/quality.yml` dopĺňa CI na main/release PRs, posúva do `main`, odosiela a spája skupiny. PRs používa rýchle kontroly filtrované cestou. Trvalo deaktivovaná duplicitná zostava bola odstránená; skutočné kontroly build/package/boot zostávajú v CI.

| Job                                              | Rozsah                                                                                                                                                                                                            | Blokovanie          |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API dokumenty refs a docs-all                                                                                                                                                                      | áno                 |
| `Fast Quality Gates`                             | Kód PRs; statické kontroly, typová kontrola, typová kontrola prístrojovej dosky, testy ovplyvnených jednotiek                                                                                                     | áno                 |
| `Forgotten sibling tests`                        | Kód PRs; zmenené moduly vysledované k statickým spotrebiteľom a kandidátskym súrodeneckým testom; cesty suda a dynamického importu sú hlásené ako poradná diagnostika s odkazovanými výnimkami zoznamu povolených | **Poradný**         |
| `No new ESLint warnings`                         | Kód PRs; ochrana proti žmolkom, ktorá podporuje potlačenie                                                                                                                                                        | Áno, vrátane vidlíc |
| `Merge integrity (changelog + generated skills)` | Nekoncept PRs; changelog a vygenerovaná synchronizácia zručností                                                                                                                                                  | Áno, vrátane vidlíc |

#### Správa o testoch zabudnutého súrodenca

`npm run check:forgotten-sibling-tests` opätovne používa prekladač importu za mapou vplyvu testu. Pre každý zmenený výrobný modul hlási deterministické reťazce `changed module/symbol -> static consumer -> candidate sibling test`, keď kandidátsky test chýba v rozdiele požiadaviek na ťahanie. Súhrn Markdown a výsledok JSON sa uchovávajú ako artefakt pracovného postupu `forgotten-sibling-tests` na kalibráciu pred akýmkoľvek zavedením blokovania.

Reexporty sudov a dynamické importy sú len diagnostikou rozlíšenia; nikdy nevytvoria blokujúci nález. Skontrolované výnimky naživo v `config/quality/forgotten-sibling-allowlist.json`. Každý záznam musí pomenovať test spotrebiteľa a kandidáta, uviesť konkrétne zdôvodnenie a prepojiť problém GitHub alebo požiadavku na stiahnutie. Chybné záznamy sa nepodarilo zatvoriť. Výnimky nemôžu potlačiť vymazaný kandidátsky test alebo rozdiel, ktorý pridáva `.skip`/`.todo`; oslabenie tvrdenia a iné maskovanie zostávajú vo vlastníctve nezávisle blokujúcej brány `check:test-masking`.

### Úloha: `lint`

Spúšťa sa pri každom PR do `main`. Pri zlyhaní blokuje zlúčenie.

| Skript (`npm run ...`)            | Overuje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Blokujúce                                    |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Verzia Node.js je v podporovanom rozsahu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Áno                                          |
| `check:cycles`                    | Cyklické importy v celom `src/` + `open-sse/` (založené na AST, s vyriešenými `paths` z tsconfig). Samostatný skript skončí s kódom 1 vždy, keď existuje akýkoľvek cyklus (prístup fail-closed od #15281), a vypíše SCC. `check:cycles:ratchet` (ktorý spúšťa CI) blokuje, keď počet prekročí strop `metrics.cycles` v `quality-baseline.json` — momentálne 14, `direction: down`, takže môže iba klesať (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Áno (ratchet)                                |
| `check:boundary`                  | Prepojenie `open-sse → src`: jedinečné importy medzi súbormi z jadra do aplikácie (`scripts/quality/measure-boundary.mjs`; zoznam hrán predstavuje backlog nápravných prác pre rozdelenie jadra/modulov vo v4). Samostatný skript = informatívny report (rovnako ako `quality:boundary`). `check:boundary:ratchet` (ktorý spúšťa CI a ktorý je tiež v slučke ratchet rýchlych kontrol v `quality.yml`) blokuje, keď počet prekročí strop `metrics.boundaryOpenSseToSrc` v `quality-baseline.json` — počiatočne nastavený na nameraných 771, `direction: down`; `--update` ho iba znižuje; v PR je relatívny voči základnej vetve (`--base-ref`, pozri nižšie)                                                                                                                                                                                                                                                                                                                                                                                        | Áno (ratchet)                                |
| `check:route-validation:t06`      | Schémy Zod sú prítomné na všetkých trasách (pravidlá úrovne 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Áno                                          |
| `check:any-budget:t11`            | Počet `@ts-expect-error // any` neprekračuje limit (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Áno                                          |
| `check:provider-consistency`      | Každý poskytovateľ v `providers.ts` má zodpovedajúci záznam v `providerRegistry.ts` (a naopak, v rámci zoznamu povolených položiek)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Áno                                          |
| `check:model-lifecycle`           | Tri ručne udržiavané smerovacie tabuľky zostávajú konzistentné so snapshotom životného cyklu uloženým v repozitári (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nehodnotí žiadny vyradený identifikátor, ktorý dokáže `REGISTRY` smerovať; každý cieľ `BUILT_IN_ALIASES` sa nachádza v `REGISTRY` a nenachádza sa v snapshote vyradených identifikátorov; každý vyradený identifikátor, ktorý je stále v `REGISTRY`, je presmerovaný alebo uvedený v `allowedRetiredInCatalog`; a žiadny zdroj ani cieľ `DEFAULT_DEGRADATION_MAP` sa v danom snapshote nenachádza medzi vyradenými. Toto nedokazuje, že model je momentálne poskytovaný aktívnou nadradenou službou. Offline — porovnáva sa s `config/quality/model-lifecycle.json`, ktorý sa ručne aktualizuje pomocou `npm run quality:refresh-model-lifecycle` (vyžaduje sieť; nie je zapojené do CI). `allowedRetiredInCatalog` je postupne sprísňovaná západka: záznam pridávajte iba spolu so sledovacou úlohou.                                                                               | Áno                                          |
| `check:fetch-targets`             | Každé `fetch("/api/...")` v klientskej časti `src/` sa prekladá na skutočný súbor `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Áno                                          |
| `check:deps`                      | Všetky závislosti inštalovateľné cez `npm install` vo všetkých súboroch `package.json` v repozitári sa nachádzajú v `dependency-allowlist.json`; nové nepripnuté balíky alebo balíky s názvami podobnými iným balíkom sú označené                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Áno                                          |
| `audit:deps`                      | Audit npm všetkých piatich nezávislých súborov uzamknutia (koreňový adresár, Electron, doplnky OpenCode v1/v2 a poskytovateľ). Kritické upozornenia proces zablokujú; upozornenia s vysokou závažnosťou zostávajú viditeľnými varovaniami. Chýbajúce/neúspešné audity majú stav INCOMPLETE a proces zablokujú; hodnoty hash súborov uzamknutia a správy sa uchovávajú osobitne pre každý rozsah.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Áno                                          |
| `check:lockfile`                  | Integrita `package-lock.json` — register https, haše integrity, žiadne prepísania hostiteľa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Áno                                          |
| `check:licenses`                  | Zoznam povolených licencií SPDX pre produkčné závislosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Áno                                          |
| `check:tracked-artifacts`         | Žiadne artefakty zostavenia ani commitnuté symbolické odkazy `node_modules` (spúšťa sa aj v husky pre-commit; pre-push je zámerne nenáročný — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Áno                                          |
| `check:ai-attribution`            | Žiadna pätička AI/bota `Co-Authored-By` ani pätička o generovaní AI v commitoch, názve či tele PR — záväzné pravidlo č. #16 (v slučke rýchlych kontrol `quality.yml` pre PR→`release/**` — číta payload udalosti, mimo PR nevykonáva žiadnu operáciu — a krok iba pre PR v lintovaní `ci.yml` pre PR→`main`; tiež hook `commit-msg` nástroja husky; ľudskí spoluautori sú povolení; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:vitest-exclusions`         | Každé vylúčenie Vitest uvádza sledovaný problém a nachádza sa v `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Áno                                          |
| `check:file-size`                 | Zdrojové súbory (`.ts`/`.tsx` v `src/`, `open-sse/`, `electron/`, `bin/`) zostávajú v rámci `cap` a testovacie súbory (`*.test.ts(x)`) v rámci `testCap`; súbory zmrazené v `file-size-baseline.json` (`frozen` / `testFrozen`) nesmú narásť nad zaznamenanú veľkosť                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Áno                                          |
| `check:error-helper`              | Chybové odpovede v exekútoroch/obslužných rutinách používajú `buildErrorBody()` / `sanitizeErrorMessage()` (Pevné pravidlo č. #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Áno                                          |
| `check:migration-numbering`       | Migračné SQL súbory sú číslované postupne, bez medzier alebo duplicít                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Áno                                          |
| `check:public-creds`              | Žiadne doslovné OAuth `client_id`/`client_secret` ani webové kľúče Firebase mimo `publicCreds.ts` (Pevné pravidlo č. #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Áno                                          |
| `check:db-rules`                  | Žiadne nespracované SQL mimo modulov `src/lib/db/`; žiadne súhrnné importy z `localDb.ts` (Pevné pravidlá č. #2/č. #5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Áno                                          |
| `check:known-symbols`             | Exekútory poskytovateľov, stratégie smerovania a prekladače registrované v ich dispečerských tabuľkách zodpovedajú súborom na disku — žiadne osirelé ani nedeklarované symboly                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Áno                                          |
| `check:route-guard-membership`    | Každá trasa, ktorá spúšťa podradený proces, je klasifikovaná pomocou `isLocalOnlyPath()` (Pevné pravidlá č. #15/č. #17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Áno                                          |
| `check:test-discovery`            | Každý súbor `*.test.ts` / `*.spec.ts` v repozitári zachytí aspoň jeden nástroj na spúšťanie testov (ratchet: zoznam osirelých súborov v `test-discovery-baseline.json` sa môže iba zmenšovať)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Áno                                          |
| `check:test-tla-order`            | Žiadny súbor `node:test` v `tests/unit` nezaregistruje test, nevykoná `await` na najvyššej úrovni a následne nezaregistruje ďalšie testy (#18045; ratchet: `test-tla-order-allowlist.json` sa môže iba zmenšovať)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Áno                                          |
| `check:agent-skills-sync`         | Vygenerované artefakty zručností agentov zodpovedajú svojmu zdrojovému katalógu (bez odchýlok)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:provider-asset-provenance` | Logá/aktíva poskytovateľov majú zaznamenaný údaj o pôvode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `lint:json`                       | Konfiguračné súbory JSON sa dajú spracovať a spĺňajú pravidlá kontroly kódu repozitára                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `typecheck:core`                  | Kompilácia TypeScriptu bez chýb (iba informatívne upozornenia)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Áno                                          |
| `typecheck:noimplicit:core`       | Striktné `noImplicitAny` — zamerané do budúcnosti; mnohé existujúce miesta volania stále vyžadujú anotácie                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | **Informatívne** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` obmedzený na `src/app/(dashboard)/**` (#7033) — starostlivo vybraný zoznam 27 súborov v `typecheck:core` neobsahuje žiadny dashboard TSX a ani `next build` ho nikdy typovo nekontroluje (`next.config.mjs` nastavuje `ignoreBuildErrors: true`), takže regresie osirotených identifikátorov v tejto oblasti (#6625/#6909) neboli pre CI viditeľné. Porovnáva sa so zmrazenou východiskovou hodnotou počtu podľa jednotlivých súborov a kódov TS (`config/quality/dashboard-typecheck-baseline.json`, rovnaký vzor vynucovania neaktuálnosti ako pri `check:known-symbols`) — kontrola zlyhá iba pri NOVÝCH chybách nad rámec východiskového počtu; keď sa opraví už existujúca chyba, znížte východiskovú hodnotu pomocou `--update`.                                                                                                                                                                                                                                                                                                         | Áno                                          |
| `check:build-typecheck`           | Produkčná kontrola typov celej aplikácie nad `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), ktorú nepokrýva 27-súborový zoznam povolených súborov v `typecheck:core` ani kontrola dashboardu. Porovnáva zmeny s `config/quality/build-typecheck-baseline.json`; nový alebo zvýšený počet pre dvojicu (súbor, kód) spôsobí zlyhanie, nižší počet vás vyzve na zníženie hodnoty. `--update` odmietne pokračovať, ak beh obsahuje novú alebo zvýšenú dvojicu, pokiaľ nie je zadané `--force-regressions`, a odmietne aj novo umlčaný súbor, pokiaľ nie je zadané `--force-nocheck`, takže rozšírenie základnej hodnoty s cieľom dosiahnuť úspešný výsledok a udelenie trvalého umlčania sú dva samostatné vedomé kroky. Samotný `--force` je odmietnutý. Kontrola tiež prehľadáva rozsah zostavenia na výskyt `@ts-nocheck` podľa `config/quality/ts-nocheck-baseline.json`, pretože súbor, ktorý ho používa, nehlási vôbec žiadne diagnostické správy a inak by zostal neviditeľný pre každú kontrolu. | Áno                                          |

#### Dva programy kontroly typov poskytujú odlišné odpovede

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) a `check:build-typecheck` kompilujú odlišné programy s odlišnými
možnosťami a ten istý súbor môže byť v jednom bez chýb a v druhom ich môže obsahovať
veľa.

`tsconfig.build.json` nastavuje `"strict": false`, takže `noImplicitAny` je vypnuté.
Konfigurácia core kompiluje kurátorovaný zoznam povolených 27 súborov s prísnejšími
možnosťami a sleduje graf importov každej položky, takže súbory, ktoré sa v programe
zostavenia nikdy neobjavia, sa tam napriek tomu kontrolujú.

Dôsledok je dôležitý pri posudzovaní, či je súbor typovaný: **nula diagnostických
správ pod `check:build-typecheck` neznamená nulu**. Odstránenie `@ts-nocheck` z 26
súborov ukázalo, že 23 z nich je v programe zostavenia bez chýb; šestnásť z nich však
v prísnom programe odhalilo približne 120 chýb implicitného typu any. Pred označením
súboru za bezchybný skontrolujte oboje.

### Úloha: `quality-gate`

Spúšťa sa po `test-coverage`. Pri zlyhaní blokuje zlúčenie.

| Skript                       | Overuje                                                                                                                                                                           | Blokujúce                                           |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `quality:collect`            | Vytvorí `quality-metrics.json` (počet upozornení ESLint, pokrytie zo zlúčenej správy segmentov)                                                                                   | Áno (predchádza mechanizmu postupného sprísňovania) |
| `quality:ratchet`            | Žiadna metrika v `quality-baseline.json` sa nezhoršila (upozornenia ESLint ≤ východisková hodnota; pokrytie ≥ východisková hodnota)                                               | Áno                                                 |
| `check:duplication`          | Duplikácia kódu (jscpd@4) neprekračuje východiskovú hodnotu v `quality-baseline.json`                                                                                             | Áno                                                 |
| `check:complexity`           | Cyklická zložitosť na úrovni súborov neprekračuje limit (základné pravidlá ESLint `complexity` + `max-lines-per-function`)                                                        | Áno                                                 |
| `check:cognitive-complexity` | Postupné sprísňovanie kognitívnej zložitosti (`eslint-plugin-sonarjs`) — samostatný priechod ESLint; CI spúšťa obe kontroly zlúčené do jediného kroku `check:complexity-ratchets` | Áno                                                 |
| `check:dead-code`            | Postupné sprísňovanie nepoužitých exportov/súborov (knip) sa oproti východiskovej hodnote nezhoršuje                                                                              | Áno                                                 |
| `check:compression-budget`   | Rozpočet benchmarku kompresie — minimálne úspory tokenov pre jednotlivé enginy sa nesmú zhoršiť                                                                                   | Áno                                                 |
| `check:type-coverage`        | Percentuálne typové pokrytie (`type-coverage`) sa nezhoršuje; do veľkej miery nahrádza `typecheck:noimplicit:core`                                                                | Áno                                                 |

### Úlohy: `codeql-scan` a `codeql-admission`

`codeql-scan` vytvára všetky nakonfigurované kategórie analýzy. Po úspešnom dokončení tejto úlohy `codeql-admission` overuje jej presné uploady a ratchet upozornení kandidáta. Obe sú povinnými závislosťami `Gate / CI`, aj pre kandidátov meniace iba dokumentáciu. Požiadavky na administratívnu aktiváciu a canary sú opísané nižšie v časti „Ratchet CodeQL“.

| Skript                 | Overuje                                                                                                                                                                                                | Blokujúci |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `check:codeql-ratchet` | Ref/SHA kandidáta a všetky nakonfigurované kategórie analýzy musia byť aktuálne pred ratchetom upozornení; chýbajúci dôkaz blokuje. Globálny inventár zostáva oddelený — pozri „Ratchet CodeQL“ nižšie | Áno       |

### Úloha: `quality-extended`

Úloha blokuje príslušných kandidátov. Veľkosť balíka, nálezy tajných údajov, nálezy
zraniteľností, nálezy pracovných postupov a zmeny OpenAPI sa kontrolujú pomocou povinných mechanizmov postupného sprísňovania.
Diagnostika kruhových závislostí zostáva informatívna. Inštalácia skenerov je povinná:
`scripts/ci/install-quality-scanners.sh` zabezpečuje pevne stanovené verzie a propaguje
zlyhania inštalácie. Chýbajúce nástroje, neplatné správy alebo chýbajúce východiskové hodnoty ponechajú
povinnú kontrolu skenera v stave INCOMPLETE.

| Skript                   | Overuje                                                                                                                                                                                                                                                    | Blokovanie                                             |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `check:circular-deps`    | Žiadne cyklické závislosti (dpdm)                                                                                                                                                                                                                          | **Odporúčacie**                                        |
| `check:bundle-size`      | Veľkosť balíka neprekračuje limit; nedostupné meranie spôsobí zlyhanie                                                                                                                                                                                     | **Blokujúce s --ratchet**                              |
| `check:secrets`          | Nálezy Gitleaks sa nezhoršujú; povinné kontroly odmietnu chýbajúce nástroje, zdroj alebo referenčný stav, neúspešné kontroly a neplatné reporty                                                                                                            | **Blokujúce s --ratchet**                              |
| `check:vuln-ratchet`     | Zraniteľnosti závislostí sa nezhoršujú; povinné kontroly odmietnu chýbajúce nástroje, neplatné reporty alebo chýbajúce referenčné stavy                                                                                                                    | **Blokujúce s --ratchet**                              |
| `check:workflows`        | Kontrola workflowov (actionlint + zizmor); chýbajúce alebo nefunkčné skenery, neplatné reporty či chýbajúci referenčný stav ratchetu spôsobia zlyhanie so stavom INCOMPLETE. Platné nálezy sa riadia vybranou prísnou, odporúčacou alebo ratchet politikou | Spustenie je povinné; ratchet zizmor je v CI blokujúci |
| `check:openapi-breaking` | Verejný kontrakt API voči pripnutým commitom udalostí (merge-base PR, predchádzajúci commit pri push, základ merge group; pri plánovanom alebo manuálnom spustení prvý rodič checkoutu); zlyhanie povinného merania vedie k bezpečnému zablokovaniu        | **Blokujúce s --ratchet**                              |

### Práca: `docs-sync-strict`

V prípade žiadostí o stiahnutie do `main` alebo `release/**` sa táto úloha spustí iba pre kandidátov, ktorí nie sú v koncepte (alebo dôveryhodní vo fronte), ktorí sú klasifikovaní ako zmeny v dokumentácii alebo kóde. Beží aj na podujatiach CI ktoré nie sú PR; spúšť tohto pracovného postupu pokrýva iba `main`, nie `release/**`. Krok, ktorý opustí nenulovú hodnotu, zablokuje úlohu; zistenia iba v správe a nižšie uvedené zdokumentované výnimky nie.

| Skript                         | Overuje                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Blokovanie                                                                                                                   |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Metakontrola, ktorá postupne spustí 7 nižšie uvedených čiastkových kontrol                                                                                                                                                                                                                                                                                                                                                                                                    | Áno                                                                                                                          |
| ↳ `check:docs-sync`            | Konzistencia verzie Package/OpenAPI/CHANGELOG, presné zrkadlá `llm.txt`, preložené invarianty CHANGELOG section/size a absencia nahradených duplicitných dokumentov                                                                                                                                                                                                                                                                                                           | áno                                                                                                                          |
| ↳ `check:docs-frontmatter`     | Kompilované dokumentačné stránky nesú platné tituly frontmatter                                                                                                                                                                                                                                                                                                                                                                                                               | áno                                                                                                                          |
| ↳ `check:docs-counts`          | Invarianty s vysokou spoľahlivosťou sú prísne; heuristické kontroly počtu súborov iba varujú, pokiaľ skript neprijme `--strict` (metabrána CI ho neprejde)                                                                                                                                                                                                                                                                                                                    | Prísne blokovanie úrovní; mäkká úroveň poradenstva                                                                           |
| ↳ `check:env-doc-sync`         | Čítania zdrojového env, `.env.example` a `docs/reference/ENVIRONMENT.md` súhlasia po explicitných zoznamoch povolených ignorovať, iba dokumenty a iba env                                                                                                                                                                                                                                                                                                                     | Áno, mimo zdokumentovaných zoznamov povolených                                                                               |
| ↳ `check:deprecated-versions`  | Hlási potenciálne zastarané verzie mimo bezpečných historických kontextov a zastaraných dátumov aktualizácií, s výnimkou ignorovaných dokumentov                                                                                                                                                                                                                                                                                                                              | Poradenstvo v aktuálnom zapojení CI (`--strict` neprešlo)                                                                    |
| ↳ `check:doc-links`            | Interné odkazy na zníženie v dokumentoch sa rozlíšia na skutočné súbory (forma `[text]`/`(path)` )                                                                                                                                                                                                                                                                                                                                                                            | áno                                                                                                                          |
| ↳ `check:fabricated-docs`      | V kódovej základni existujú trasy, env vars, príkazy CLI, názvy hákov a cesty k súborom citované v dokumentoch. Tvrdá brána cez `--strict`; soft-fail bez vlajky.                                                                                                                                                                                                                                                                                                             | Áno (cez `--strict` v CI)                                                                                                    |
| `check:cli-i18n`               | Použité CLI kľúče `t()` existujú v `en`; `pt-BR` zachováva všetky sekcie najvyššej úrovne; `zh-CN` a `zh-TW` obsahujú všetky kľúče z `en`                                                                                                                                                                                                                                                                                                                                     | Áno                                                                                                                          |
| `check:openapi-coverage`       | Špecifikácia OpenAPI pokrýva aspoň postupne zvyšovanú minimálnu hranicu skutočných trás                                                                                                                                                                                                                                                                                                                                                                                       | Áno                                                                                                                          |
| `check:openapi-security-tiers` | Deklarované anotácie `x-loopback-only`/`x-always-protected` musia mať oporu v `routeGuard.ts`; chyby parsera a nezhody pri doprednej kontrole blokujú. Spätná kontrola chýbajúcich `x-loopback-only` pod výlučne lokálnymi prefixmi upozorňuje a trasy definované iba vzormi sú z tejto spätnej kontroly vynechané.                                                                                                                                                           | Parser/dopredné kontroly blokujú; spätná kontrola je odporúčacia                                                             |
| `check:openapi-routes`         | Každá cesta `/api...` v `openapi.yaml` zodpovedá skutočnej trase bez ohľadu na názvy parametrov po uplatnení odôvodneného zoznamu výnimiek `KNOWN_STALE_SPEC`; zastarané položky zoznamu tiež spôsobujú zlyhanie                                                                                                                                                                                                                                                              | Áno                                                                                                                          |
| `check:docs-symbols`           | Interné URL odkazy `/api/...` v kanonických dokumentoch, ktoré nie sú zrkadlami, zodpovedajú skutočnej trase alebo rodine trás; odkazy na proxy/upstream/zástupné hodnoty/súbory a odôvodnené položky `KNOWN_STALE_DOC_REFS` sú vynechané, pričom zastarané položky zoznamu výnimiek spôsobujú zlyhanie                                                                                                                                                                       | Áno                                                                                                                          |
| `i18n translation drift`       | Absolútne prijatie vyžaduje nulový zdroj, chýbajúci cieľ, cieľový hash, zastaralý preklad a nekonzistentnosť vyrovnávacej pamäte sekcií. Bežná príprava PR môže zachovať presné zdedené dôkazy alebo len v angličtine čakajúcu zmenu s nezmeneným úplným stavom a cieľovými bajtmi; jeho správa samostatne deklaruje pripravenosť na zlúčenie. Chýbajúce cieľové hodnoty hash a neúplný základný dôkazový blok. Absentujúca vyrovnávacia pamäť starších sekcií nie je chybou. | Všetkých päť tried blokuje vstup queue/base ; bežná príprava povoľuje len overenú zdedenú prácu alebo prácu len v angličtine |

Vygeneruje sa dvanásť README SVGs pod `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` ich všetky regeneruje). Každý z nich má test jednotky porovnávania bajtov (`tests/unit/docs/readme-*-svg.test.ts`, úloha `test-unit`), ktorý zlyhá, keď je potvrdený súbor neaktuálny, a `check:docs-counts` číta kanonické čísla z ich uzlov `<text>` — čo je dôvod, prečo krok s obrysom zachováva každý načrtnutý reťazec v súbore ako neviditeľný `<text>`. Kontrola kanonických čísel SVG číta súbory uvedené v `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` a `tier-flow-light.svg`; tvrdenia o bezplatných navždy, o vstupe do katalógu, o opakovanom fonde a o faktoroch hodnotenia tiež čítajú `promise-pillars.svg`, `free-tier-budget.svg` a `strategies-grid.svg`. `free-tier-budget.svg` čerpá svoje čísla z načítača živého katalógu, takže zmena na `FREE_MODEL_BUDGETS` alebo na zobrazovaný názov poskytovateľa sfarbí CI, kým sa tento súbor nevygeneruje.

### Úloha: `i18n-ui-coverage`

| Skript                            | Overuje                                                                                                                                                                                                                     | Blokujúce     |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (inline) | Pokrytie kľúčov i18n používateľského rozhrania je ≥ 65 %                                                                                                                                                                    | Áno           |
| `check-ui-value-drift` (inline)   | Prepísaná anglická **hodnota** nezanechá žiadny zastaraný preklad                                                                                                                                                           | Áno           |
| `check-new-key-coverage` (inline) | **Nový** anglický kľúč je preložený v každom locale — značka `__MISSING__:` sa zamietne                                                                                                                                     | Áno           |
| `check-translation-ratio`         | Pomer skutočných prekladov pre každý locale (hodnoty zhodné s angličtinou / zástupné hodnoty / chýbajúce vetvy mimo zoznamu povolených výnimiek) nesmie prekročiť `config/quality/i18n-translation-baseline.json` + rezervu | **Blokujúce** |

Vyžaduje `fetch-depth: 0` — kontrola odchýlky hodnôt porovnáva rozdiely v `en.json` voči základu zlúčenia.

#### `check-ui-value-drift` — brána na kontrolu zastaraných prekladov

Zachytáva jedinú regresiu i18n, ktorú ostatné kontroly zo svojej podstaty nedokážu odhaliť: anglická hodnota
sa prepíše a preklady odvodené z _predchádzajúcej_ anglickej hodnoty zostanú nezmenené, takže
používatelia iných jazykov naďalej čítajú presvedčivo formulovaný, no už nesprávny text.

Toto sa skutočne dostalo do vydania. `oauthModal.googleOAuthWarning` bol prepísaný pri pridaní pomocníka
prihlásenia Antigravity (#5203); **39 zo 43 locales** si ponechalo text, ktorý operátorom prikazoval „skopírovať
celú adresu URL a vložiť ju nižšie“ — postup, ktorý pri tomto poskytovateľovi nemožno dokončiť. Zostalo to
bez povšimnutia až do #8463, pretože:

- `sync-ui-keys` dopĺňa iba kľúče, ktoré **chýbajú**, nikdy nie tie, ktoré sú **zastarané**;
- `check-ui-keys-coverage` počíta _prítomnosť_ kľúčov, takže zastaraný preklad sa započíta ako pokrytý;
- `check-translation-drift` sleduje zrkadlá dokumentácie `docs/i18n/<locale>/**.md` —
  nikdy nečíta `src/i18n/messages/*.json`. Od opätovnej synchronizácie 2026-09 je blokujúci v úlohe `docs-sync-strict`: upravte základný dokument → `npm run i18n:run -- --files=<doc>` (na úrovni sekcií, nenáročné).

**Zohľadňuje rozdiely, nepoužíva základnú líniu.** Porovnáva `en.json` v základe zlúčenia
s pracovným stromom; pri každom kľúči, ktorého anglická hodnota sa zmenila, je každý locale, ktorý stále obsahuje
nezmenený preklad, zastaraný. Týmto sa zámerne **zmrazí existujúci dlh** — z rozdielu
nemožno zistiť, z ktorej starej anglickej hodnoty pochádza dlhodobo existujúci preklad, preto kontrola posudzuje
iba to, čoho sa dotýka aktuálna zmena. Alternatíva (základná línia hashov pre jednotlivé kľúče) by vyžadovala
približne 600 KB generovaný súbor, 3× väčší než najväčšia existujúca základná línia, ktorý by sa menil pri každom PR i18n.

Kontrolu možno splniť dvoma spôsobmi:

1. aktualizujte dotknuté preklady alebo
2. nastavte ich na `__MISSING__:<new english>` — runtime potom poskytne opravený anglický text
   (`src/i18n/request.ts::deepMergeFallback`, #7258) a kľúč sa zaradí do frontu na preklad.

Ak sa zmenil **význam** reťazca, uprednostnite **premenovanie kľúča**: nový kľúč nemôže zdediť
zastaraný preklad. Tento postup bol použitý v #8463.

```bash
npm run i18n:check-value-drift          # prísne (to, čo spúšťa CI)
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

### Práca: `i18n`

Plná validačná matica i18n (jedna úloha na miestne nastavenie). Celá práca je poradenská.

| Skript                          | Potvrdzuje                                  | Blokovanie                                            |
| ------------------------------- | ------------------------------------------- | ----------------------------------------------------- |
| `validate_translation.py quick` | Úplnosť prekladu podľa miestneho nastavenia | **Poradný** (`continue-on-error: true` na celú prácu) |

### Práca: `pr-test-policy`

Beží len na žiadosti o stiahnutie.

| Skript                 | Potvrdzuje                                                                                                                                | Blokovanie |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PRs, ktoré menia produkčný kód v `src/`, `open-sse/`, `electron/` alebo `bin/` musia zahŕňať alebo aktualizovať testy (tvrdé pravidlo #8) | áno        |
| `check:test-masking`   | Zmenené testovacie súbory neznižujú čistý počet tvrdení ani nepridávajú tautológie `assert.ok(true)`                                      | áno        |
| `check:pr-evidence`    | PR body cituje test/VPS dôkazy pre zmenu (mechanizuje Hard Rule #18 grepovaním PR prose — fragile, pozri Backlog)                         | áno        |

### Úloha: `test-vitest`

Vyžaduje úlohu klasifikácie `changes`. Príslušné časti matice pri zlyhaní zablokujú zlúčenie.

| Sada             | Overuje                                                                   | Blokujúce                                                                                                                 |
| ---------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Server MCP (110 nástrojov), autoCombo, vyrovnávacia pamäť — runner vitest | Áno                                                                                                                       |
| `test:vitest:ui` | Testy komponentov používateľského rozhrania — runner vitest               | **Blokujúce** — už existujúce zlyhania sú explicitne vylúčené v `vitest.config.ts`; nové zlyhania spôsobia zlyhanie úlohy |

### Nočné pracovné postupy (plánované, poradenské)

Tieto bežia podľa plánu cron (a `workflow_dispatch`), nikdy nie podľa PRs. Všetky sú poradné.

| Pracovný postup        | Potvrdzuje                                                                                                                                                        | Blokovanie  |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | rýchle testy vlastností s náhodným počtom semien + vysokým počtom                                                                                                 | **Poradný** |
| `nightly-resilience`   | halda-growth gate, chaos error-injection, k6 load/soak                                                                                                            | **Poradný** |
| `nightly-llm-security` | promptfoo ochrana vstrekovania (režim blokovania) sondy + garak (vynechané bez tajného tajomstva poskytovateľa)                                                   | **Poradný** |
| `nightly-schemathesis` | OpenAPI kontrakt fuzzing (schéma) oproti živému OmniRoute s použitím `docs/openapi.yaml` — povrchových porušení špecifikácií / nespracovaných 500 s (8. fáza B.4) | **Poradný** |
| `nightly-mutation`     | Skóre testovania mutácií Stryker na rýchlej jednotkovej dráhe — prežívajúcich mutantov na povrchu slabé tvrdenia                                                  | **Poradný** |
| `nightly-compat`       | Matica kompatibility uzlov v rámci podporovaných rozsahov `engines.node`                                                                                          | **Poradný** |

Základné línie výkonu (hromada, TTFB, čas zostavenia) sa zaznamenávajú, nie sú hradené: pozri [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

### Ráčna CodeQL : prijatie kandidátov a inventár úložiska

CI vlastní kandidáta na prijatie CodeQL prostredníctvom explicitného reťazca závislostí: `codeql-scan` volá štvorjazyčnú maticu v `codeql.yml`, potom `codeql-admission` spustí `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` vyžaduje oba výsledky. Kvalita si zachováva svoje vlastné numerické kontroly, ale nepýta sa skener skôr, ako výrobca skončí; Samotný `Gate / Quality` nie je úplným prijatím kandidáta. CodeQL sa naďalej vyžaduje pre kandidátov, ktorí majú iba dokumenty.

Politika v `config/quality/codeql-admission-policy.json` vyberá akcie, C/C++, JavaScript/TypeScript a Python, predvolenú sadu dotazov, model vzdialenej hrozby a režim zostavovania žiadny. Preflight Producer odmietne čakajúci záznam o aktivácii a vetví sa mimo explicitného zoznamu cieľov. Aktuálne ciele sú hlavné a testy zmluvy release/v3.8.54. porovnávajú tento konečný zoznam a spúšťací mechanizmus údržby s verziou balíka; ďalšie vydanie si vyžaduje kontrolu a registráciu. Existujúci spúšťač PR v širšom vydaní CI je zachovaný, ale nezaradený cieľ hlási HOLD pred extrakciou namiesto získania nemeraného PASS.

Každá maticová úloha zaznamenáva svoje skutočné nahranie SARIF ID, jazyk, kategóriu, spustenie a pokus, identitu pracovného toku volajúceho, udalosť ref/head/base/merge SHA a hash politiky. Závislá úloha stiahne iba potvrdenky tohto cyklu a overí súhrny artefaktov. Vyžaduje si to všetky štyri kategórie, úspešného producenta a dokončené spracovanie každého presného uploadu. Používa filter sarif_id API, nie najnovšiu analýzu nájdenú na vetve. Čiastočné opakovania môžu opätovne použiť úspešné kategórie z predchádzajúceho pokusu rovnakého kola a kandidáta, pričom sa zachová pokus o produkciu; neúspešný súčasný výrobca nemôže opätovne použiť predchádzajúci zelený dôkaz.

Akcia CodeQL čaká na spracovanie, ale jej pripnutá implementácia môže varovať a pokračovať po zlyhaní čítania stavu alebo vyčerpanom čakaní. Vstupné teda opäť overuje spracovanie. Chýbajúce kategórie, čakajúce spracovanie, neúspešné alebo zrušené úlohy, zastaraná identita, neúplné stránkovanie alebo nedostupné APIs vytvárajú HOLD a ukončia 2. Nezostáva žiadne pevné čakanie na nezávislý pracovný postup skenera. Nenaskenovaný PR nemôže prejsť, pretože výstražný dotaz vrátil 0. Nameraný počet nad `metrics.codeqlAlerts.value` končí 1; základná línia sa nezvýši, aby absorbovala upozornenia inej pobočky. [Stav nahrávania a vyhľadávanie analýzy](https://docs.github.com/en/rest/code-scanning/code-scanning).

Potvrdenie zaznamenáva nahrávanie a analýzu IDs, kategórie, verzie nástrojov, ref/SHA, východiskové a výstražné čísla. SARIF Počet identity/result, minimálny počet pravidiel a presné inštancie výstrah zostávajú povinné. Identity PR/analysis sa pred prijatím znova skontrolujú. Tieto kontroly vytvárajú konfigurované pokrytie kategórií, nie súpis každého extrahovaného zdrojového súboru. Extrakcia C/C++ bez zostavenia nezahŕňa kód generovaný počas zostavovania projektu. Vylúčenia zdrojov si stále vyžadujú kontrolu a pripisovanie prispievateľov potrebuje porovnateľné presné dôkazy.

`codeql-maintenance.yml` poskytuje aktívne skenovanie push a týždenný plán bez duplikovania výrobcov PR/main. `nightly-codeql-inventory.yml` udržiava základnú líniu celého úložiska oddelenú, so `--strict-measurement` a zlyhaním, keď meranie nie je k dispozícii. Pôvabné preskočenie miestneho zberateľského dedičstva nie je kandidátom na prijatie. Utiahnutie zostáva explicitným `--update` po overenom nižšom globálnom počte.

Pokročilý pracovný postup nesmie byť zverejnený, kým je nakonfigurované Predvolené nastavenie: GitHub túto kombináciu odmietne. Jeho politika s verziou zostáva nevyriešená, kým sa neprečíta skontrolovaný administratívny prechod. Pred zverejnením operátor pripojí úložisko, hash head/base/tree, policy/patch/rollback a pozorovaný stav nastavenia; `node scripts/quality/codeql-producer.mjs verify-admin-readback` kontroluje dodané očakávané a skutočné záznamy JSON. Toto je technická ochrana, nie súhlas operátora ani náhrada za načítanie nových spätných údajov. Token PR nikdy nepožaduje administratívny prístup. Zavedenie a akákoľvek zmena skenera vyžaduje samostatné spätné čítanie plus skutočné dôkazy o kompatibilite PR, vidlice a zlučovacej skupiny.

Forky používajú hostovaných bežcov, pokladňu bez trvalých poverení, žiadny projekt install/build v producentovi a žiadne zdedené tajomstvá úložiska. GitHub podporuje nahrávanie SARIF pre udalosť pull_request so zníženým tokenom rozvetvenia; schválenie vykonania prvého príspevku zostáva zásadou GitHub. Nikdy nepoužívajte pull_request_target na spustenie nedôveryhodného kódu. Pred pokladaním migrácie za dokončenú potvrďte skutočné oprávnenia tokenov, analysis_key a všetky prostredia kategórií v kontrolovanom kanáriku. [Pravidlá nahrávania do vidlice](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [konfliktné režimy nastavenia](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Výpovede sú výzvou operátora (tvrdé pravidlo #14)** — nikdy nezruší výstrahu CodeQL bez zaznamenania technického odôvodnenia v komentári k zamietnutiu: `won't fix` pre požiadavku upstream protokolu, `used in tests` pre testovacie zariadenie, `false positive` pre dezinfekčný prostriedok CodeQL nevidí (precedens: `docs/security/ERROR_SANITIZATION.md`).

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

**Vyššie tiež nezdokumentované** (poradné, s nízkou výpovednou hodnotou): úloha `docs-lint` (markdownlint + Vale, celá úloha `continue-on-error`) a samostatné workflow skenerov `semgrep.yml` / `scorecard.yml`. CodeQL má teraz povinné úlohy producenta a prijatia pod `Gate / CI`, podliehajúce vyššie uvedeným požiadavkám na aktiváciu. `semgrepFindings: 0` je v `quality-baseline.json`, ale nie je zapojené do blokujúceho ratchetu v `ci.yml` — metrika momentálne nemá napojenie.

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
- `check:pr-evidence` (blokujúce, prehľadáva prózu v tele PR pomocou grepu) — vysoké riziko falošne pozitívnych výsledkov; jeho odstránenie oslabí vynucovanie tvrdého pravidla č. #18, takže ide o skutočné politické rozhodnutie.
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
