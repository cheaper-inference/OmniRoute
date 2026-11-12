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

Bežný PR spúšťa rýchly výber. Dráhy `full-code` a `full-code-e2e` politiky prijatia (E2E, integrácia, artefakt balíka, dym Electron, Bun SQLite, klienti ekosystému a protokolu) bežia iba na koncepte frontu Mergify alebo na úplnom spustení: `gh workflow run ci.yml --ref <branch>`.

Každý doklad JSON identifikuje odhlásený SHA, spustenie pracovného postupu a pokus. CLI odmieta nesúlad checkout/event SHA. Testy pracovného toku spájajú členstvo v politike so zoznamom `needs` úlohy verdiktu, takže nový alebo odstránený pruh nemôže ticho zmiznúť. Potvrdenia pokrývajú ich vlastný pracovný postup, nie publikáciu, nasadenie alebo interné prvky existujúceho poradenského skenera. Vykonávanie príslušných kontrol požadovaných v pravidlách pobočky je samostatnou administratívnou zmenou; definovanie ich pracovných miest samo o sebe nechráni pobočku.

`API Route Typecheck` je nezávislá kontrola pracovného toku, mimo súhrnných verdiktov a statického profilu miestneho úplného pozorovateľa. Skontrolujte jeho výsledok samostatne, aby ste našli presného kandidáta. `.github/workflows/api-route-typecheck.yml` beží na PRs do `main` alebo `release/**`, posiela buď do rodiny vetiev, manuálne odoslanie a udalosti `merge_group` typu `checks_requested`. Nemá žiadny cestný filter. Zlúčiť skupiny skontrolujte `merge_group.head_sha`; ostatné akcie pozrite si `github.sha`. Všetky udalosti používajú rovnaké testy diagnostickej brány a jednotky brány API. Základné retargety PR vyžadujú novú kontrolu; Úpravy body/title používajú iba názov `Admission not requested / API Route Typecheck` na pozorovanie a nemôžu nahradiť vstupnú kontrolu.

### Zachovaný dôkaz v akceptačnom reduktore

`scripts/quality/validate-release-acceptance.mjs` redukuje dodaný plán a jeho prejavy; nestanovuje, že plán pokrýva celý proces uvoľňovania. Jej správy explicitne stanovujú `releaseAcceptance: false`, aj keď je tento plán `VERIFIED`. Pracovný postup `release-acceptance.yml` stále používa tieňové svietidlá, nie skutočné potvrdenie o zostavení, balíku, zavádzaní alebo propagácii.

CLI vyžaduje, aby `--evidence-root` overila uchovávané dôkazy. Súbory sú rozlíšené ako `<evidence-root>/<artifact_id>/<member>` a hašované ako SHA-256. Záznam PASS bez dôkazov, chýbajúci alebo zmenený súbor, nebezpečná cesta alebo symbolický odkaz bráni overeniu. Chýbajúce súbory nie sú ekvivalentom prázdnych úspešných protokolov. Existujúce kontroly SHA/run/attempt zostávajú nezávislé: zhodné bajty nemôžu zachrániť zastaraný príjem. Integrita súboru nie je dôkazom pravosti vykonania alebo propagácie artefaktu.

### DAST využíva overenú zostavu CI

Požadovaná úloha `dast-smoke` CI volá `.github/workflows/dast-smoke.yml` po `build`. Nasleduje rovnaký výber code/draft ako zostava, vrátane podporovaných vidlicových PRs, cieľových verzií PRs a zlučovacích skupín. Chýbajúca, neúspešná, zrušená alebo neočakávane preskočená úloha DAST blokuje `Gate / CI`. Opakovane použiteľný pracovný postup nemá žiadny nezávislý spúšťač PR/dispatch ; manuálna validácia využíva odoslanie CI, takže zostava a spotrebiteľ zostávajú v jednom chode.

`scripts/ci/next-build-provenance.mjs` zapečatí celý artefakt Next svojím dechtovým digestom, repository/event/run, pokusom o producenta, head/base/checkout/tree, identitami pracovného toku, lockfile, presným uzlom version/ABI, platformou a bundlerom. DAST vyberie nemenný artefakt ID zo `needs.build.outputs`, vyžaduje overenie súhrnu stiahnutia a nezávisle hašuje ZIP proti súhrnu výrobcu pred extrahovaním svojich dvoch členov zo zoznamu povolených cez `scripts/ci/unpack-ci-build.py`. Manifest a archív tar sa tiež musia zhodovať s výstupmi nezávislých producentov pred extrahovaním stromu Next. Nikdy nehľadá najnovšie úspešné zostavenie pobočky. Čiastočné opätovné spustenie môže znova použiť rovnaký pokus výrobcu, keď sa jeho ID a všetky vstupy stále zhodujú; účtenka zaznamenáva oba pokusy.

Spotrebiteľ zostáva na hosťovanom zariadení Linux s povolením úložiska iba na čítanie a bez tajomstiev úložiska. Nainštaluje presnú verziu Node od výrobcu a potom zostaví CLI so `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` odmietne chýbajúci samostatný server pred akýmkoľvek záložným zostavením; normálne lokálne zostavy CLI si zachovávajú svoju existujúcu záložnú verziu. Pripravenosť servera, Schemathesis a promptfoo musia byť úspešné v rámci nezmeneného 25-minútového limitu úlohy. Potvrdenie o pôvode dokazuje vstupnú identitu a bajty, nie úspešné skenovanie DAST. Exspirácia artefaktu, prerušenie bežca alebo zlyhaný skener zostáva neúplný alebo neúspešný dôkaz; nemôže sa stať PASS prostredníctvom informačného obalu.

### Výkonnosť UI

CI prevádzkuje úplný inventár UI ako štyri zlomky matrice `test-vitest`, každý s maximálne dvoma pracovníkmi na zlomok a existujúci 15-minútový termín úlohy. Prvý fragment tiež spúšťa sadu MCP/autoCombo Vitest. Požadovaný výsledok práce pokrýva každý úsek matrice; zlyhanie alebo zrušenie jedného zlomku nemôže založiť prijatie kandidáta.

Nočný pozorovateľ si ponechá samostatné potvrdenie o presnom kandidátovi pre každý zlomok UI, vrátane vykonania MCP v prvom účte. Vyžadujú sa všetky štyri potvrdenia, protokoly a zodpovedajúce identity vykonania. Miestny `npm run test:vitest:ui` stále vyberá kompletný balík; jeden beh `--shard` je len čiastočným dôkazom.

### Zber pokrytia jednotiek

Dvanásť zlomkov jednotiek zhromažďuje pokrytie V8 počas vykonávania existujúceho testu. Úspešný fragment spustí `scripts/ci/compact-v8-coverage.mjs` na komprimovanie pôvodných súborov bez generovania prechodnej Istanbulskej správy. Konečná úloha pokrytia overí všetkých dvanásť manifestov proti kandidátovi SHA, runtime, zdrojovému koreňovému adresáru a dátovým hashom, potom spustí reportéry c8 a existujúce prahové hodnoty pokrytia. Vstupy si zachovávajú globálne poradie súborov c8; pre-zlúčenie na črep nie je bezpečné pre zmiešané pokrytie function/block. Chýbajúce, poškodené alebo nekompatibilné fragmenty sa nepodarí prijať. Úlomky neúspešného testu si uchovávajú nespracované diagnostické pokrytie oddelene; nemôže vstúpiť do konečného zlúčenia.

### Potvrdenia o priebehu vykonávania jednotky

Zdieľaný príkaz `test:unit:ci:shard` zaznamenáva fázy `primary`, `dashboard` a `serial` prostredníctvom `scripts/ci/unit-progress-reporter.mjs`. Bežná správa o teste zostáva k dispozícii. Samostatná potvrdenka obsahujúca iba metadáta zaznamenáva začiatok a dokončenie každého súboru a 30-sekundový tlkot srdca zobrazuje súbory, ktoré sú stále aktívne, a ich uplynutý čas. Zaznamenáva iba povolené metadáta vykonania; popisy testov, výstup, telá chýb a celé prostredie nie sú serializované.

CI uchováva súbory JSONL ako `unit-progress-ci-<run>-<attempt>-<shard>`. Časový limit úlohy môže zabrániť neskoršiemu odovzdaniu; už vydané srdcové tepy zostávajú diagnostickým dôkazom. Chýbajúce srdcové tepy môžu tiež odrážať zablokovaný alebo ukončený proces bežca. Tieto potvrdenky zachovávajú existujúci výber testu, súbežnosť, termíny a stav ukončenia; nejde o verdikty kandidáta na prijatie.

### Zlúčiť front

Označenie `queue` odošle PR do frontu Mergify (`.mergify.yml`). Mergify otvorí koncept PR na vetve `mergify/merge-queue/`, CI tam spustí úplný výber a pôvodný PR sa zlúči, keď prejdú `Gate / CI`, `Gate / Quality` a `Merge integrity (changelog + generated skills)`.

Mergify zapíše svoj súhrn frontu do popisu konceptu. Body/title-only `pull_request` Udalosti `edited` používajú skupinu súbežností špecifickú pre spustenie a neopakujú klasifikáciu, testovacie matice, integritu zlúčenia ani verdikt prijatia. Názvy kontrol len na pozorovanie nemôžu nahradiť `Gate / CI` alebo `Gate / Quality`. Úprava, ktorá zmení cieľovú základňu, vyžaduje nové overenie kandidáta.

Po vyradení z frontu nemusí push vždy znova zaradiť PR. Komentujte to `@mergifyio queue`.

### Inventár statického skenovania

Verzovaný inventár npm-alias a členstvo v statickom skenovaní sú dostupné v `config/quality/gate-manifest.json`. Spustite `npm run check:gate-manifest` na overenie názvov skriptov a presných príkazov proti `package.json`; pridania, odstránenia a posun príkazov zlyhávajú pri lokálnom háku aj úlohách klasifikácie zmien v CI. Alias nie je úlohou pracovného toku, inštanciou matice alebo testovacím prípadom: tieto počty nesmú byť prezentované ako zameniteľné.

Použite `npm run quality:scan -- --list` alebo `npm run quality:scan:fast -- --list` na kontrolu vybratých aliasov bez ich vykonania. Bežec vyvolá vstupný bod npm, takže jeho runtime (vrátane Bun ak je nakonfigurované) sa zachová. Manifest zaznamenáva aliasy mimo týchto profilov, ktoré sa vyvolávajú samostatne, a príkazy údržby sú v profiloch skenovania iba na čítanie zakázané.

Tieto profily pokrývajú iba statické skenovanie. Necertifikujú testy produktu, pokrytie, balenie, externé kontroly ani úplné prijatie kandidáta na uvoľnenie. Prijatie pracovného toku využíva prepojené `config/quality/admission-policy.json` a `scripts/quality/admission-verdict.mjs`. Profily pozorovateľa uvoľnenia zostávajú oddelené; nezávisle kontrolovať ich príslušné šeky a potvrdenky. Úplné statické príkazy pozorovateľa sú deklarované v `config/quality/release-green-static-profile.json`, vrátane `audit:deps`, výberu testu mutácie a kontroly prekladu. Zavádzač overuje príkazy npm voči package.json a modelovaným deklaráciám CI/Quality ; odmieta drift namiesto spustenia tokenov shellu ako argumentov. Požadovaný výstup SKIP/INCOMPLETE skenera nemôže vytvoriť PASS. Profil zaznamenáva svoje externé vylúčenia a nenahrádza hostované pokrytie, testovacie matrice, balík alebo dôkaz o nasadení. Nižšie uvedený súpis prózy je odkazom, nie dôkazom, že brána skutočne bežala.

Skripty fungujú pod `scripts/check/` (politické brány) a `scripts/quality/` (ratchet engine). Zdrojom pravdy CI je `.github/workflows/ci.yml`.

### Zdravie zverejnenej dokumentácie

`.github/workflows/i18n-base-health.yml` sleduje stav dokumentácie po vybratých presunoch do `main` a `release/v*` a pri manuálnom odoslaní. Jeho filtre pokrývajú dokumentáciu, root Markdown, `llm.txt`, preklad state/configuration a príslušné nástroje i18n. Jedna úloha `Published base documentation health` využíva hostované Ubuntu a päťminútový termín. Vykonáva overenie len na čítanie a zapisuje diagnostické potvrdenie bez inštalácie závislosti, prekladu alebo prijatia stavu.

`scripts/i18n/check-base-health.mjs` vyžaduje nulové nezrovnalosti zdrojového hašovania, chýbajúceho cieľa, cieľového hašovania, zastaralého prekladu a vyrovnávacej pamäte sekcií. Potvrdzuje tiež súčasný základný rozsah document/locale a jeho zaznamenaný pôvod. Neplatný kontext, neúplné pokrytie alebo prerušená kontrola vytvára `INCOMPLETE`; potvrdený drift produkuje `FAIL`. Obidve vrátia stav zlyhania. Potvrdenie je viazané na pokladničku SHA, pracovný postup, spustenie a pokus a uchováva sa ako `i18n-base-health-<sha>-<run>-<attempt>`.

Ide o nezávislé pozorovanie zverejnenej základne. Nepridáva udalosť PR alebo zlučovacej skupiny, požadovanú kontrolu PR, alias npm ani člena profilu statického skenovania. Základná kontrola tiež blokuje všetkých päť tried v absolútnom režime. Bežná príprava PR zostáva oddelená od prijatia. Úspešné odovzdanie nemôže zmeniť výsledok neúspešného stavu na PASS.

Bežný PR používa `--preflight` so základnou správou generovanou `--baseline-evidence`. Anglický zdroj môže ponechať čakajúci iba vtedy, keď sa úplný záznam prekladu a skutočné cieľové bajty nezmenia od tohto presného základu. Stále blokujú nové nezrovnalosti cieľov alebo vyrovnávacej pamäte sekcií a neúplné dôkazy nemôžu povoliť prípravu. Správa odhaľuje `preparationPending` a `mergeReady` oddelene: úspešná príprava neznamená, že čakajúce preklady sú pripravené na zlúčenie. Pred prijatím obnovte postihnuté zrkadlá v zloženom kandidátovi. Dôveryhodný kandidát do fronty Mergify, `merge_group`, presuny pobočiek a manuálne spustenie CI používajú absolútnu kontrolu bez `--warn` alebo odpustenia zdedených porúch. Chýbajúce cieľové hodnoty hash a rozsah zmenšený o vymazané zaznamenané základné súbory nemôžu priniesť úspešný absolútny verdikt.

### Uvoľnite rýchlu cestu PR (`quality.yml`)

`.github/workflows/quality.yml` dopĺňa CI na main/release PRs, posúva do `main`, odosiela a spája skupiny. PRs používa rýchle kontroly filtrované cestou. Trvalo deaktivovaná duplicitná zostava bola odstránená; skutočné kontroly build/package/boot zostávajú v CI. Jednotka a vitest bežia iba v CI (`Unit Tests (N/12)` a `Vitest`).

| Job                                              | Rozsah                                                                                                                                                                                                            | Blokovanie          |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; Referencie dokumentov API a všetky dokumenty                                                                                                                                                       | áno                 |
| `Fast Quality Gates`                             | Kód PRs; statické kontroly, typová kontrola, typová kontrola prístrojovej dosky, testy ovplyvnených jednotiek                                                                                                     | áno                 |
| `Forgotten sibling tests`                        | Kód PRs; zmenené moduly vysledované k statickým spotrebiteľom a kandidátskym súrodeneckým testom; cesty suda a dynamického importu sú hlásené ako poradná diagnostika s odkazovanými výnimkami zoznamu povolených | **Poradný**         |
| `No new ESLint warnings`                         | Kód PRs; ochrana proti žmolkom, ktorá podporuje potlačenie                                                                                                                                                        | Áno, vrátane vidlíc |
| `Merge integrity (changelog + generated skills)` | Nenávrh PRs; changelog a vygenerovaná synchronizácia zručností                                                                                                                                                    | Áno, vrátane vidlíc |

#### Správa o testoch zabudnutého súrodenca

`npm run check:forgotten-sibling-tests` beží ako poradný krok `Fast Quality Gates` a opätovne používa prekladač importu za mapou vplyvu testu. Pre každý zmenený výrobný modul hlási deterministické reťazce `changed module/symbol -> static consumer -> candidate sibling test`, keď kandidátsky test chýba v rozdiele požiadaviek na ťahanie. Súhrn Markdown a výsledok JSON sa uchovávajú ako artefakt pracovného postupu `forgotten-sibling-tests` na kalibráciu pred akýmkoľvek zavedením blokovania.

Reexporty sudov a dynamické importy sú len diagnostikou rozlíšenia; nikdy nevytvoria blokujúci nález. Skontrolované výnimky naživo v `config/quality/forgotten-sibling-allowlist.json`. Každý záznam musí pomenovať test spotrebiteľa a kandidáta, uviesť konkrétne zdôvodnenie a prepojiť problém GitHub alebo požiadavku na stiahnutie. Chybné záznamy sa nepodarilo zatvoriť. Výnimky nemôžu potlačiť vymazaný kandidátsky test alebo rozdiel, ktorý pridáva `.skip`/`.todo`; oslabenie tvrdenia a iné maskovanie zostávajú vo vlastníctve nezávisle blokujúcej brány `check:test-masking`.

### Práca: `lint`

Beží na každom PR až `main`. Pri zlyhaní sa bloky spájajú.

| Skript (`npm run ...`)            | Potvrdzuje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Blokovanie                              |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | Verzia Node.js je v podporovanom rozsahu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | áno                                     |
| `check:cycles`                    | Kruhové importy do všetkých `src/` + `open-sse/` (založené na AST, tsconfig `paths` vyriešené). Bare končí 1 vždy, keď existuje akýkoľvek cyklus (uzavretý zlyhaním od #15281) a uvádza SCCs. `check:cycles:ratchet` (čo beží CI ) blokuje, keď počet prekročí strop `metrics.cycles` v `quality-baseline.json` — momentálne 14, `direction: down`, takže môže iba klesnúť (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Áno (račňa)                             |
| `check:boundary`                  | Prepojenie `open-sse → src` : jedinečné importy medzi súbormi z nástroja do aplikácie (`scripts/quality/measure-boundary.mjs`; okrajový zoznam je nevybavený protokol o náprave core/module-split v4). Holá poradenská správa = (rovnaká ako `quality:boundary`). `check:boundary:ratchet` (to, čo beží CI, tiež v račňovej slučke rýchlych brán `quality.yml` ) blokuje, keď počet prekročí strop `metrics.boundaryOpenSseToSrc` v `quality-baseline.json` — nasadených na nameraných 771, `direction: down`; `--update` ju iba znižuje; základný vzťah k PRs (`--base-ref`, pozri nižšie)                                                                                                                                                                                                                                                                                                                   | Áno (račňa)                             |
| `check:route-validation:t06`      | Schémy Zod prítomné na všetkých trasách (politika úrovne 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | áno                                     |
| `check:any-budget:t11`            | Počet `@ts-expect-error // any` nepresahuje rozpočet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | áno                                     |
| `check:provider-consistency`      | Každý poskytovateľ v `providers.ts` má zodpovedajúci záznam v `providerRegistry.ts` (a naopak, v rámci zoznamu povolených)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | áno                                     |
| `check:model-lifecycle`           | Tri ručne udržiavané smerovacie tabuľky zostávajú konzistentné so zaznamenanou snímkou životného cyklu (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nezískava žiadne vyradené ID, ktoré môže `REGISTRY` smerovať; každý cieľ `BUILT_IN_ALIASES` je prítomný v `REGISTRY` a chýba na snímke vyradeného ID; každé vyradené ID stále v `REGISTRY` je preposlané alebo uvedené v `allowedRetiredInCatalog`; a žiadny zdroj ani cieľ `DEFAULT_DEGRADATION_MAP` sa v tejto snímke nezobrazí ako vyradený. To nedokazuje, že model je v súčasnosti obsluhovaný priamym prenosom. Offline — sa porovnáva so `config/quality/model-lifecycle.json`, obnovený ručne pomocou `npm run quality:refresh-model-lifecycle` (sieť; nie je zapojené do CI). `allowedRetiredInCatalog` je horľavá račňa: pridajte položku len s problémom sledovania.                                                                           | áno                                     |
| `check:fetch-targets`             | Každé `fetch("/api/...")` v `src/` na strane klienta sa premietne do skutočného `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | áno                                     |
| `check:deps`                      | Všetky `npm install` -able deps v každom `package.json` v repo sú v `dependency-allowlist.json`; nové nepripnuté alebo zablokované balíky označené príznakom                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | áno                                     |
| `audit:deps`                      | npm audit všetkých piatich nezávislých lockfiles (root, Electron, OpenCode pluginy v1/v2 a poskytovateľ). Blok kritických upozornení; vysoké upozornenia zostávajú viditeľnými varovaniami. Audity Missing/failed sú INCOMPLETE a blok; zamknuté hodnoty hash a zostavy podľa rozsahu sa zachovajú.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | áno                                     |
| `check:lockfile`                  | Integrita `package-lock.json` Register https —, hodnoty hash integrity, žiadne prepisy hostiteľa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | áno                                     |
| `check:licenses`                  | Zoznam povolených licencií SPDX pre produkčné závislosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | áno                                     |
| `check:tracked-artifacts`         | Žiadne artefakty zostavy / potvrdené symbolické odkazy `node_modules` (tiež beží v režime husky pre-commit; predbežné stlačenie je zámerne ľahké — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | áno                                     |
| `check:ai-attribution`            | Žiadna upútavka AI/bot `Co-Authored-By` ani päta generácie AI v PR nezaväzuje, názov alebo telo — Hard Rule #16 (v slučke rýchlych brán `quality.yml` pre PR→ `release/**` — číta užitočné zaťaženie udalosti, bez možnosti vypnutia PRs — a krok iba pre PR v `ci.yml` lint pre PR human → `commit-msg` coaut;`main`; povolené #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:vitest-exclusions`         | Každé vylúčenie Vitest pomenúva problém so sledovaním a zobrazuje sa v `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | áno                                     |
| `check:file-size`                 | Zdrojové súbory (`.ts`/`.tsx` v `src/`, `open-sse/`, `electron/`, `bin/`) zostávajú v `cap` a testovacie súbory (`*.test.ts(x)`) v `testCap`; súbory zmrazené v `file-size-baseline.json` (`frozen` / `testFrozen`) nesmú presiahnuť svoju zaznamenanú veľkosť                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | áno                                     |
| `check:error-helper`              | Chybové odpovede v executors/handlers používajú `buildErrorBody()` / `sanitizeErrorMessage()` (tvrdé pravidlo #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | áno                                     |
| `check:migration-numbering`       | Migračné súbory SQL sú sekvenčne očíslované, bez medzier alebo duplikátov                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | áno                                     |
| `check:public-creds`              | Žiadne doslovné webové kľúče OAuth `client_id`/`client_secret` alebo Firebase mimo `publicCreds.ts` (tvrdé pravidlo #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | áno                                     |
| `check:db-rules`                  | Žiadne surové SQL mimo modulov `src/lib/db/` ; žiadny dovoz sudov zo `localDb.ts` (tvrdé pravidlá #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | áno                                     |
| `check:known-symbols`             | Vykonávatelia poskytovateľov, stratégie smerovania a prekladatelia zaregistrovaní v ich odosielacích tabuľkách sa zhodujú so súbormi na disku — bez osirelých alebo nedeklarovaných symbolov                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | áno                                     |
| `check:route-guard-membership`    | Každá cesta, ktorá vytvára podriadený proces, je klasifikovaná podľa `isLocalOnlyPath()` (tvrdé pravidlá #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | áno                                     |
| `check:test-discovery`            | Každý súbor `*.test.ts` / `*.spec.ts` v repo zhromažďuje aspoň jeden testovací bežec (ratchet: zoznam osirelých zvierat v `test-discovery-baseline.json` sa môže iba zmenšiť)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | áno                                     |
| `check:test-tla-order`            | Žiadny súbor `node:test` pod `tests/unit` nezaregistruje test, zasiahne `await` najvyššej úrovne a potom zaregistruje ďalšie (#18045; račňa: `test-tla-order-allowlist.json` sa môže iba zmenšiť)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | áno                                     |
| `check:agent-skills-sync`         | Vygenerované artefakty schopností agentov zodpovedajú ich zdrojovému katalógu (bez posunu)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | Poskytovateľ logos/assets má zaznamenaný záznam o pôvode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `lint:json`                       | Konfiguračné súbory JSON analyzujú a spĺňajú pravidlá repo lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `typecheck:core`                  | Kompilácia TypeScript bez chýb (len poradenské upozornenia)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | áno                                     |
| `typecheck:noimplicit:core`       | Prísne `noImplicitAny` — orientované na budúcnosť; mnohé už existujúce stránky volania stále potrebujú anotácie                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | **Poradný** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | Rozsah `tsc` na `src/app/(dashboard)/**` (#7033) Spravovaný `next.config.mjs` — `typecheck:core` TSX `next build` `ignoreBuildErrors: true` regresie osamotených identifikátorov (#6625/#6909) boli pre CI neviditeľné. — oproti zamrznutej základnej línii počtu per-file/per-TS-code (`config/quality/dashboard-typecheck-baseline.json`, rovnaký vzor zastaraného presadzovania NEW `check:known-symbols`). pri oprave už existujúcej chyby sklopte pomocou `--update`.                                                                                                                                                                                                                                                                                                                                                                                                                                    | áno                                     |
| `check:build-typecheck`           | Kontrola typu výroby celej aplikácie cez `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), 27-súborový zoznam povolených súborov `typecheck:core` a brána na palubnej doske nepokrývajú. Rozdiely oproti `config/quality/build-typecheck-baseline.json`; nový alebo zvýšený počet za (súbor, kód) zlyhá, nižší počet vás požiada o ratchet. `--update` odmietne, kým beh obsahuje nový alebo zvýšený pár, pokiaľ neprejde `--force-regressions`, a odmietne novo umlčaný súbor, pokiaľ neprejde `--force-nocheck`, takže rozšírenie základnej línie na zelenú a udelenie trvalého ticha sú dva samostatné úmyselné činy. Holý `--force` je odmietnutý. Tiež skenuje rozsah zostavenia pre `@ts-nocheck` oproti `config/quality/ts-nocheck-baseline.json`, pretože súbor, ktorý ho používa, nehlási žiadnu diagnostiku a inak by bol neviditeľný pre každú bránu. | áno                                     |

#### Dva programy na kontrolu písma odpovedajú odlišne

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) a `check:build-typecheck` kompilujú rôzne programy pod rôznymi možnosťami a ten istý súbor môže byť v jednom čistý a v druhom plný chýb.

`tsconfig.build.json` nastavuje `"strict": false`, takže `noImplicitAny` je vypnuté. Základná konfigurácia zostavuje upravený zoznam povolených súborov s 27 súbormi s prísnejšími možnosťami a riadi sa grafom importu každej položky, takže súbory, ktoré sa nikdy nezobrazia v zostavovacom programe, sú tam stále kontrolované.

Dôsledok je dôležitý pri posudzovaní, či je súbor napísaný:**nulová diagnostika pod `check:build-typecheck` neznamená nulu** . Odstránenie `@ts-nocheck` z 26 súborov ukázalo, že 23 z nich je v zostavovacom programe čistých; šestnásť z nich vyplávalo na povrch okolo 120 implicitných chýb v prísnej chybe. Pred volaním súboru clean skontrolujte obe.

### Práca: `quality-gate`

Beží po `test-coverage`. Pri zlyhaní sa bloky spájajú.

| Skript                       | Potvrdzuje                                                                                                                                           | Blokovanie        |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `quality:collect`            | Vysiela `quality-metrics.json` (počet varovaní ESLint, pokrytie zo správy zlúčených zlomkov)                                                         | Áno (pred račňou) |
| `quality:ratchet`            | Každá metrika v `quality-baseline.json` sa nevrátila (upozornenia ESLint ≤ základná úroveň; základná úroveň pokrytia ≥ )                             | áno               |
| `check:duplication`          | Duplikácia kódu (jscpd@4) nepresahuje základnú líniu v `quality-baseline.json`                                                                       | áno               |
| `check:complexity`           | Cyklomatická zložitosť na úrovni súboru nepresahuje limit (jadro ESLint `complexity` + `max-lines-per-function`)                                     | áno               |
| `check:cognitive-complexity` | Kognitívna komplexnosť račňa (`eslint-plugin-sonarjs`) — samostatný ESLint priechod; CI beží obe zlúčené ako jediný krok `check:complexity-ratchets` | áno               |
| `check:dead-code`            | Nepoužívaná západka exportov/súborov (knip) neregresuje oproti základnej čiare                                                                       | áno               |
| `check:compression-budget`   | Rozpočet na porovnávanie kompresie — na úroveň úspory tokenov na motor nesmie klesnúť                                                                | áno               |
| `check:type-coverage`        | Percentuálna račňa (`type-coverage`) sa nevracia späť; do značnej miery zahŕňa `typecheck:noimplicit:core`                                           | áno               |

### Pracovné miesta: `codeql-scan` a `codeql-admission`

`codeql-scan` vytvára všetky nakonfigurované kategórie analýz. Po úspešnom úspešnom vykonaní úlohy `codeql-admission` overí jej presné nahrania a upozornenie na kandidáta. Obe sú povinné závislosti `Gate / CI` vrátane kandidátov iba na dokumenty. Požiadavky na administratívnu aktiváciu a kanáriky sú popísané nižšie v časti „CodeQL račňa“.

| Skript                 | Potvrdzuje                                                                                                                                                                                         | Blokovanie |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:codeql-ratchet` | Kandidát ref/SHA a všetky nakonfigurované kategórie analýzy musia byť aktuálne pred spustením výstrahy; chýbajúce dôkazové bloky. Globálny inventár zostáva oddelený — pozri „CodeQL račňa“ nižšie | áno        |

### Práca: `quality-extended`

Práca blokuje vhodných kandidátov. Veľkosť balíka, tajné nálezy, nálezy zraniteľnosti, nálezy pracovného toku a zmeny OpenAPI sa kontrolujú pomocou požadovaných račne. Diagnóza kruhovej závislosti zostáva odporúčaná. Vyžaduje sa inštalácia skenera: `scripts/ci/install-quality-scanners.sh` poskytuje pripnuté verzie a šíri zlyhania inštalácie. Chýbajúce nástroje, neplatné správy alebo chýbajúce základné línie opúšťajú požadovanú bránu skenera INCOMPLETE.

| Skript                   | Potvrdzuje                                                                                                                                                                                                              | Blokovanie                                          |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `check:circular-deps`    | Žiadne kruhové závislosti (dpdm)                                                                                                                                                                                        | **Poradný**                                         |
| `check:bundle-size`      | Veľkosť zväzku nepresahuje uzáver; nedostupné meranie zlyhá                                                                                                                                                             | **Blokovanie pomocou --ratchet**                    |
| `check:secrets`          | Zistenia Gitleaks neregresujú; požadované kontroly odmietnu chýbajúce tools/source/baseline, neúspešné kontroly a neplatné správy                                                                                       | **Blokovanie pomocou --ratchet**                    |
| `check:vuln-ratchet`     | Zraniteľnosť závislosti neregresuje; požadované kontroly odmietajú chýbajúce nástroje, neplatné správy alebo chýbajúce základné línie                                                                                   | **Blokovanie pomocou --ratchet**                    |
| `check:workflows`        | Prášok pracovného toku (actionlint + zizmor); Skenery missing/broken, neplatné správy alebo chýbajúca základná čiara račne zlyhajú ako INCOMPLETE. Platné zistenia sa riadia zvolenou politikou strict/advisory/ratchet | Vyžaduje sa vykonanie; blokovanie račne zizmor v CI |
| `check:openapi-breaking` | Verejná zmluva API proti záväzkom pripnutej udalosti (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); požadované meranie zlyhá zatvorené                                         | **Blokovanie pomocou --ratchet**                    |

### Práca: `docs-sync-strict`

V prípade žiadostí o stiahnutie do `main` alebo `release/**` sa táto úloha spustí iba pre kandidátov, ktorí nie sú v koncepte (alebo dôveryhodní vo fronte), ktorí sú klasifikovaní ako zmeny v dokumentácii alebo kóde. Beží aj na podujatiach CI ktoré nie sú PR; spúšť tohto pracovného postupu pokrýva iba `main`, nie `release/**`. Krok, ktorý opustí nenulovú hodnotu, zablokuje úlohu; zistenia iba v správe a nižšie uvedené zdokumentované výnimky nie.

| Skript                         | Potvrdzuje                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Blokovanie                                                                                                                   |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Metabrána, ktorá postupne spúšťa 7 podbrán                                                                                                                                                                                                                                                                                                                                                                                                                                    | áno                                                                                                                          |
| ↳ `check:docs-sync`            | Konzistencia verzie Package/OpenAPI/CHANGELOG, presné zrkadlá `llm.txt`, preložené invarianty CHANGELOG section/size a absencia nahradených duplicitných dokumentov                                                                                                                                                                                                                                                                                                           | áno                                                                                                                          |
| ↳ `check:docs-frontmatter`     | Kompilované dokumentačné stránky nesú platné tituly frontmatter                                                                                                                                                                                                                                                                                                                                                                                                               | áno                                                                                                                          |
| ↳ `check:docs-counts`          | Invarianty s vysokou spoľahlivosťou sú prísne; heuristické kontroly počtu súborov iba varujú, pokiaľ skript neprijme `--strict` (metabrána CI ho neprejde)                                                                                                                                                                                                                                                                                                                    | Prísne blokovanie úrovní; mäkká úroveň poradenstva                                                                           |
| ↳ `check:env-doc-sync`         | Čítania zdrojového env, `.env.example` a `docs/reference/ENVIRONMENT.md` súhlasia po explicitných zoznamoch povolených ignorovať, iba dokumenty a iba env                                                                                                                                                                                                                                                                                                                     | Áno, mimo zdokumentovaných zoznamov povolených                                                                               |
| ↳ `check:deprecated-versions`  | Hlási potenciálne zastarané verzie mimo bezpečných historických kontextov a zastaraných dátumov aktualizácií, s výnimkou ignorovaných dokumentov                                                                                                                                                                                                                                                                                                                              | Poradenstvo v aktuálnom zapojení CI (`--strict` neprešlo)                                                                    |
| ↳ `check:doc-links`            | Interné odkazy na zníženie v dokumentoch sa rozlíšia na skutočné súbory (forma `[text]`/`(path)` )                                                                                                                                                                                                                                                                                                                                                                            | áno                                                                                                                          |
| ↳ `check:fabricated-docs`      | V kódovej základni existujú trasy, env vars, príkazy CLI, názvy hákov a cesty k súborom citované v dokumentoch. Tvrdá brána cez `--strict`; soft-fail bez vlajky.                                                                                                                                                                                                                                                                                                             | Áno (cez `--strict` v CI)                                                                                                    |
| `check:cli-i18n`               | Použité kľúče CLI `t()` existujú v `en`; `pt-BR` zachováva každú sekciu najvyššej úrovne; `zh-CN` a `zh-TW` obsahujú každý kľúč zo `en`                                                                                                                                                                                                                                                                                                                                       | áno                                                                                                                          |
| `check:openapi-coverage`       | Špecifikácia OpenAPI pokrýva aspoň rapkáčovú podlahu skutočných trás                                                                                                                                                                                                                                                                                                                                                                                                          | áno                                                                                                                          |
| `check:openapi-security-tiers` | Deklarované anotácie `x-loopback-only`/`x-always-protected` musia byť podporované `routeGuard.ts`; syntaktický a dopredný blok nesúladu. Spätná kontrola na chýbajúce `x-loopback-only` pod iba lokálnymi predponami varuje a trasy iba so vzorom sú vylúčené z tohto spätného prechodu.                                                                                                                                                                                      | Parser/forward kontroluje blokovanie; spätná kontrola poradenstvo                                                            |
| `check:openapi-routes`         | Každá cesta `/api...` v `openapi.yaml` rozlišuje parametre bez ohľadu na skutočnú cestu po odôvodnenom zozname povolených `KNOWN_STALE_SPEC` ; zastarané položky zoznamu povolených tiež zlyhávajú                                                                                                                                                                                                                                                                            | áno                                                                                                                          |
| `check:docs-symbols`           | Interné odkazy `/api/...` URL v kanonických nezrkadlových dokumentoch sa týkajú skutočnej cesty alebo rodiny ciest; Odkazy proxy/upstream/placeholder/file a zarovnané položky `KNOWN_STALE_DOC_REFS` sú vylúčené a zastarané položky zoznamu povolených zlyhajú                                                                                                                                                                                                              | áno                                                                                                                          |
| `i18n translation drift`       | Absolútne prijatie vyžaduje nulový zdroj, chýbajúci cieľ, cieľový hash, zastaralý preklad a nekonzistentnosť vyrovnávacej pamäte sekcií. Bežná príprava PR môže zachovať presné zdedené dôkazy alebo len v angličtine čakajúcu zmenu s nezmeneným úplným stavom a cieľovými bajtmi; jeho správa samostatne deklaruje pripravenosť na zlúčenie. Chýbajúce cieľové hodnoty hash a neúplný základný dôkazový blok. Absentujúca vyrovnávacia pamäť starších sekcií nie je chybou. | Všetkých päť tried blokuje vstup queue/base ; bežná príprava povoľuje len overenú zdedenú prácu alebo prácu len v angličtine |

Vygeneruje sa dvanásť README SVGs pod `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` ich všetky regeneruje). Každý z nich má test jednotky porovnávania bajtov (`tests/unit/docs/readme-*-svg.test.ts`, úloha `test-unit`), ktorý zlyhá, keď je potvrdený súbor neaktuálny, a `check:docs-counts` číta kanonické čísla z ich uzlov `<text>` — čo je dôvod, prečo krok s obrysom zachováva každý načrtnutý reťazec v súbore ako neviditeľný `<text>`. Kontrola kanonických čísel SVG číta súbory uvedené v `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` a `tier-flow-light.svg`; tvrdenia o bezplatných navždy, o vstupe do katalógu, o opakovanom fonde a o faktoroch hodnotenia tiež čítajú `promise-pillars.svg`, `free-tier-budget.svg` a `strategies-grid.svg`. `free-tier-budget.svg` čerpá svoje čísla z načítača živého katalógu, takže zmena na `FREE_MODEL_BUDGETS` alebo na zobrazovaný názov poskytovateľa sfarbí CI, kým sa tento súbor nevygeneruje.

### Práca: `i18n-ui-coverage`

| Skript                            | Potvrdzuje                                                                                                                                                                                                        | Blokovanie     |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | Pokrytie kľúča UI i18n je ≥ 65 %                                                                                                                                                                                  | áno            |
| `check-ui-value-drift` (inline)   | Prepísaná angličtina **hodnotu** nezanechá za sebou žiadny zatuchnutý preklad                                                                                                                                     | áno            |
| `check-new-key-coverage` (inline) | A **nové** Anglický kľúč je preložený v každom jazyku — a značka `__MISSING__:` je odmietnutá                                                                                                                     | áno            |
| `check-translation-ratio`         | Skutočný pomer prekladu na miestne nastavenie (identický s angličtinou / zástupný symbol / chýbajúce listy mimo zoznamu povolených) nesmie presiahnuť uvoľnenie `config/quality/i18n-translation-baseline.json` + | **Blokovanie** |

Potrebuje `fetch-depth: 0` — brána posunu hodnoty porovná `en.json` so základňou zlúčenia.

#### `check-ui-value-drift` — zatuchnutý preklad

Zachytáva jednu regresiu i18n, ktorú ostatné brány štrukturálne nevidia: anglická hodnota je prepísaná a preklady odvodené z _predchádzajúcej_ angličtiny zostávajú pozadu, takže používatelia, ktorí nie sú v angličtine, pokračujú v čítaní sebavedome formulovanej, teraz nesprávnej kópie.

Toto bolo skutočne odoslané. `oauthModal.googleOAuthWarning` bol prepísaný, keď pristál pomocník pri prihlásení Antigravity (#5203);**39 zo 43 miest** stále text oznamujúci operátorom, aby „skopírovali celé URL a vložili ho nižšie“ — tok, ktorý pre daného poskytovateľa nemožno dokončiť. Až do #8463 to zostalo nepovšimnuté, pretože:

- `sync-ui-keys` vyplní iba kľúče, ktoré sú **neprítomný** , nikdy také, ktoré sú **zatuchnutý** ;
- `check-ui-keys-coverage` počíta kľúčovú _prítomnosť_, takže zastaraný preklad sa považuje za pokrytý;
- `check-translation-drift` sleduje dokumentáciu `docs/i18n/<locale>/**.md` odzrkadľuje —, nikdy nečíta `src/i18n/messages/*.json`. Blokovanie úlohy `docs-sync-strict` od opätovnej synchronizácie 2026-09: upravte základný dokument → `npm run i18n:run -- --files=<doc>` (úroveň sekcie, lacné).

**Zohľadňujúce rozdiely, nie sú podporované základnou líniou.** Porovnáva `en.json` na zlučovacej základni s pracovným stromom; pre každý kľúč, ktorého anglická hodnota sa zmenila, je každé miestne nastavenie, ktoré stále obsahuje nedotknutý preklad, zastarané. Toto schválne **zmrazí už existujúci dlh** — a diff nedokáže odhaliť, z ktorej starej angličtiny pochádza dlhoročný preklad, takže brána posudzuje len to, čoho sa aktuálna zmena dotýka. Alternatíva (základná hodnota hash na kľúč) by stála súbor vygenerovaný ~ 600 KB, čo je 3 × čo je najväčšia existujúca základná hodnota, ktorá by sa šírila na každom i18n PR.

Dva spôsoby, ako to uspokojiť:

1. aktualizovať dotknuté preklady, príp
2. nastavte ich na `__MISSING__:<new english>` — runtime potom obsluhuje opravenú angličtinu (`src/i18n/request.ts::deepMergeFallback`, #7258) a kľúčové fronty na preklad.

Ak je reťazec **význam** zmenil, preferuj **premenovanie kľúča** : nový kľúč nemôže zdediť zastaraný preklad. To je vzor, ktorý používa #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Posun hodnoty a nový kľúč zdieľajú jedno nemenné porovnanie od `scripts/i18n/resolve-ui-diff-base.mjs`. Pracovný postup prechádza rovnakým základom, základným tipom a kandidátskym SHAs na obe kontroly. Spustenia PR/base-retarget, push a merge-group používajú svoj kontext udalosti. Odoslanie kandidátskej pobočky vyžaduje jej presný otvorený PR alebo explicitný vstup `i18n_base_sha`. Odoslanie alebo plánované pozorovanie `main` alebo `release/vX.Y.Z` bez tohto vstupu porovnáva posledné odovzdanie s jeho prvým rodičom; nejde o audit všetkých zdedených prekladových dlhov. Lokálne vyvolanie vyžaduje explicitnú porovnávaciu základňu, napríklad vyššie uvedený príkaz `BASE_REF`.

Chýbajúci alebo nejednoznačný kontext porovnania, nečitateľný alebo neplatný požadovaný katalóg a zmenený kandidát vytvárajú `INCOMPLETE` s výstupným kódom **2** vrátane režimu varovania. Čítanie katalógu používa `scripts/i18n/read-ui-catalog.mjs`; zlyhania čítania nie sú nahradené prázdnymi objektmi. Ani nedostupná základňa, ani neúplný vstup nezakladajú PASS.

### Práca: `i18n`

Plná validačná matica i18n (jedna úloha na miestne nastavenie). Celá práca je poradenská.

| Skript                          | Potvrdzuje                                  | Blokovanie                                            |
| ------------------------------- | ------------------------------------------- | ----------------------------------------------------- |
| `validate_translation.py quick` | Úplnosť prekladu podľa miestneho nastavenia | **Poradný** (`continue-on-error: true` na celú prácu) |

### Práca: `pr-test-policy`

Beží len na žiadosti o stiahnutie.

| Skript                 | Potvrdzuje                                                                                                                                 | Blokovanie |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `check:pr-test-policy` | PRs, ktoré menia produkčný kód v `src/`, `open-sse/`, `electron/` alebo `bin/`, musia zahŕňať alebo aktualizovať testy (tvrdé pravidlo #8) | áno        |
| `check:test-masking`   | Zmenené testovacie súbory neznižujú čistý počet tvrdení ani nepridávajú tautológie `assert.ok(true)`                                       | áno        |
| `check:pr-evidence`    | Telo PR cituje dôkazy test/VPS pre zmenu (mechanizuje Hard Rule #18 grepovaním PR prózy — fragile, pozri Backlog)                          | áno        |

### Práca: `test-vitest`

Potrebuje prácu klasifikácie `changes`. Použiteľné maticové črepy sa pri zlyhaní zlúčia.

| Suita            | Potvrdzuje                                                                | Blokovanie                                                                                               |
| ---------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Server MCP (110 nástrojov), autoCombo, vyrovnávacia pamäť — vitest runner | áno                                                                                                      |
| `test:vitest:ui` | Testy komponentov UI — vitest runner                                      | **Blokovanie** Preexistujúce zlyhania — sú v `vitest.config.ts` výslovne vylúčené; nové zlyhania zlyhajú |

### Nočné pracovné postupy (plánované, poradenské)

Tieto bežia podľa plánu cron (a `workflow_dispatch`), nikdy nie podľa PRs. Všetky sú poradné.

| Pracovný postup        | Potvrdzuje                                                                                                                                                        | Blokovanie  |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | rýchle testy vlastností s vysokým počtom náhodných semien +                                                                                                       | **Poradný** |
| `nightly-resilience`   | halda-growth gate, chaos fault-injection, k6 load/soak                                                                                                            | **Poradný** |
| `nightly-llm-security` | promptfoo ochrana vstrekovania (režim blokovania) sondy + garak (vynechané bez tajného tajomstva poskytovateľa)                                                   | **Poradný** |
| `nightly-schemathesis` | OpenAPI kontrakt fuzzing (schéma) oproti živému OmniRoute s použitím `docs/openapi.yaml` — povrchových porušení špecifikácií / nespracovaných 500 s (8. fáza B.4) | **Poradný** |
| `nightly-mutation`     | Skóre testovania mutácie Stryker na rýchlej jednotkovej dráhe mutantov prežívajúcich — na povrchu slabé tvrdenia                                                  | **Poradný** |
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
