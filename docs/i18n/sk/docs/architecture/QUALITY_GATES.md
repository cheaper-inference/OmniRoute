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

Pracovné postupy CI a Quality Gates vydávajú stabilný verdikt: `Gate / CI` a `Gate / Quality`. Ich verzovaná politika prijímania vymenúva každú upstreamovú prácu podľa požiadaviek alebo odporúčaní. Príslušná požadovaná úloha musí byť úspešná: chýbajúce, zrušené, preskočené, čakajúce a neznáme výsledky nemôžu určiť PASS. Platná klasifikácia len pre dokumenty alebo len pre katalóg môže spôsobiť, že kódový pruh nebude použiteľný; návrh PR nie je akceptovaným kandidátom. Označenie `hotfix` nezbavuje dôkazov.

Oba pracovné postupy pokrývajú PRs do main/release vetiev, presuny do `main`, manuálne odosielanie a udalosti zlučovacej skupiny. Push, dispatch a merge-group spustia úplný výber. Stlačenie `release/**` ich nespustí (2026-10-18): každá zmena už spustila maticu na svojom PR a zlúčená kombinácia je úlohou Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks a merge groups používajú hostovaných bežcov pre úlohy, ktoré inak vyberajú samostatne hostených bežcov; dostatočná hosťovaná kapacita musí byť overená pred zavedením.

Bežný PR spúšťa rýchly výber. Dráhy `full-code` a `full-code-e2e` politiky prijatia (E2E, integrácia, artefakt balíka, Electron smoke, Bun SQLite, klienti ekosystému a protokolu) bežia len na koncepte frontu Mergify alebo na úplnom spustení: `gh workflow run ci.yml --ref <branch>`.

Každý doklad JSON identifikuje odhlásený SHA, spustenie pracovného postupu a pokus. CLI odmietne nesúlad checkout/event SHA. Testy pracovného toku spájajú členstvo v politike so zoznamom `needs` úlohy verdiktu, takže nový alebo odstránený pruh nemôže ticho zmiznúť. Potvrdenia pokrývajú ich vlastný pracovný postup, nie publikáciu, nasadenie alebo interné prvky existujúceho poradenského skenera. Aktivácia oboch kontrolných názvov v pravidlách pobočky je samostatnou administratívnou zmenou; pridanie týchto pracovných miest samo o sebe nechráni pobočku.

### Zlúčiť front

Označenie `queue` odošle PR do frontu Mergify (`.mergify.yml`). Mergify otvorí koncept PR na vetve `mergify/merge-queue/`, CI tam spustí úplný výber a pôvodný PR sa zlúči, keď prejdú `Gate / CI`, `Gate / Quality` a `Merge integrity (changelog + generated skills)`.

Mergify zapíše svoj súhrn frontu do popisu konceptu a ďalšie aplikácie ho môžu tiež upraviť. Udalosť `pull_request` `edited` na takomto návrhu má svoju vlastnú skupinu súbežnosti (`-queue-edit-<run_id>`), takže nemôže zrušiť skutočný priebeh návrhu a preskočí bránu a maticu. Stále beží iba `Merge integrity`. Úloha vynechanej brány nesie iný názov kontroly, pretože Mergify načíta vynechané `Gate / CI` ako neúspešnú kontrolu a odstráni PR.

Po vyradení z frontu nemusí push vždy znova zaradiť PR. Komentujte to `@mergifyio queue`.

### Zachovaný dôkaz v akceptačnom reduktore

`scripts/quality/validate-release-acceptance.mjs` znižuje dodaný plán a jeho manifesty; nestanovuje, že plán pokrýva celý proces uvoľňovania. Jeho správy explicitne stanovujú `releaseAcceptance: false`, aj keď je plán `VERIFIED`. Pracovný postup `release-acceptance.yml` stále používa tieňové príslušenstvo, nie skutočné potvrdenie o zostavení, balíku, zavádzaní alebo propagácii.

CLI vyžaduje `--evidence-root` na overenie zachovaných dôkazov. Súbory sú rozlíšené ako `<evidence-root>/<artifact_id>/<member>` a hašované ako SHA-256. Záznam PASS bez dôkazov, chýbajúci alebo zmenený súbor, nebezpečná cesta alebo symbolický odkaz bráni overeniu. Chýbajúce súbory nie sú ekvivalentom prázdnych úspešných protokolov. Existujúce kontroly SHA/run/attempt zostávajú nezávislé: zhodné bajty nemôžu zachrániť zastaraný príjem. Integrita súboru nie je dôkazom pravosti vykonania alebo propagácie artefaktu.

### Inventár statického skenovania

Verzovaný inventár npm-alias a členstvo v statickom skenovaní sú dostupné v `config/quality/gate-manifest.json`. Spustite `npm run check:gate-manifest` na overenie názvov skriptov a presných príkazov proti `package.json`; pridania, odstránenia a posun príkazov zlyhávajú pri lokálnom háku aj úlohách klasifikácie zmien v CI. Alias nie je úlohou pracovného toku, inštanciou matice alebo testovacím prípadom: tieto počty nesmú byť prezentované ako zameniteľné.

Použite `npm run quality:scan -- --list` alebo `npm run quality:scan:fast -- --list` na kontrolu vybratých aliasov bez ich vykonania. Runner vyvolá vstupný bod npm, takže jeho runtime (vrátane Bun ak je nakonfigurované) sa zachová. Manifest zaznamenáva aliasy mimo týchto profilov, ktoré sa vyvolávajú samostatne, a príkazy údržby sú v profiloch skenovania iba na čítanie zakázané.

Tieto profily pokrývajú iba statické skenovanie. Necertifikujú testy produktu, pokrytie, balenie, externé kontroly ani úplné prijatie kandidáta na uvoľnenie. Prijatie pracovného toku používa prepojené `config/quality/admission-policy.json` a `scripts/quality/admission-verdict.mjs`. Profily pozorovateľa uvoľnenia zostávajú oddelené; nezávisle kontrolovať ich príslušné šeky a potvrdenky. Úplné statické príkazy pozorovateľa sú deklarované v `config/quality/release-green-static-profile.json`, vrátane `audit:deps`, výberu testu mutácie a kontroly prekladu. Zavádzač overuje príkazy npm voči deklaráciám package.json a modelovaným CI/Quality ; odmieta drift namiesto spustenia tokenov shellu ako argumentov. Požadovaný výstup skenera SKIP/INCOMPLETE nemôže vytvoriť PASS. Profil zaznamenáva svoje externé vylúčenia a nenahrádza hostované pokrytie, testovacie matrice, balík alebo dôkaz o nasadení. Nižšie uvedený súpis prózy je odkazom, nie dôkazom, že brána skutočne bežala.

Skripty fungujú pod `scripts/check/` (politické brány) a `scripts/quality/` (ratchet engine). Zdroj pravdy CI je `.github/workflows/ci.yml`.

### Uvoľnite rýchlu cestu PR (`quality.yml`)

`.github/workflows/quality.yml` dopĺňa CI na main/release PRs, posúva do `main`, odosiela a spája skupiny. PRs používa rýchle kontroly filtrované cestou. Trvalo deaktivovaná duplicitná zostava bola odstránená; skutočné kontroly build/package/boot zostávajú v CI. Jednotková sada a vitest bežia iba v CI (`Unit Tests (N/8)` a `Vitest`).

| Job                                              | Rozsah                                                                                                                                            | Blokovanie          |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API dokumenty refs a docs-all                                                                                                      | áno                 |
| `Fast Quality Gates`                             | Kód PRs; statické kontroly, kontrola typu, kontrola typu prístrojovej dosky, testy ovplyvnených jednotiek, testy zabudnutých súrodencov (poradné) |
| `No new ESLint warnings`                         | Kód PRs; ochrana proti žmolkom, ktorá podporuje potlačenie                                                                                        | Áno, vrátane vidlíc |
| `Merge integrity (changelog + generated skills)` | Nekoncept PRs; changelog a vygenerovaná synchronizácia zručností                                                                                  | Áno, vrátane vidlíc |

#### Správa o testoch zabudnutého súrodenca

`npm run check:forgotten-sibling-tests` beží ako poradný krok `Fast Quality Gates` a opätovne používa prekladač importu za mapou testovacieho vplyvu. Pre každý zmenený produkčný modul hlási deterministické reťazce `changed module/symbol -> static consumer -> candidate sibling test` keď kandidátsky test chýba v rozdiele požiadavky na stiahnutie. Súhrn Markdown a výsledok JSON sa zachovajú ako artefakt pracovného toku `forgotten-sibling-tests` na kalibráciu pred akýmkoľvek zavedením blokovania.

Reexporty sudov a dynamické importy sú len diagnostikou rozlíšenia; nikdy nevytvoria blokujúci nález. Skontrolované výnimky sú zverejnené v `config/quality/forgotten-sibling-allowlist.json`. Každý záznam musí pomenovať test spotrebiteľa a kandidáta, uviesť konkrétne odôvodnenie a prepojiť problém GitHub alebo požiadavku na stiahnutie. Chybné záznamy sa nepodarilo zatvoriť. Výnimky nemôžu potlačiť vymazaný kandidátsky test alebo rozdiel, ktorý pridáva `.skip`/`.todo`; oslabenie tvrdenia a iné maskovanie zostávajú vo vlastníctve nezávisle blokujúcej brány `check:test-masking`.

### Práca: `lint`

Beží na každom PR až `main`. Pri zlyhaní sa bloky spájajú.

| skript (`npm run ...`)            | Potvrdzuje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Blokovanie                              |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | verzia Node.js je v podporovanom rozsahu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | áno                                     |
| `check:cycles`                    | Kruhové importy naprieč všetkými `src/` + `open-sse/` (založené na AST, tsconfig `paths` vyriešené). Bare ukončí 1 vždy, keď existuje akýkoľvek cyklus (uzavretý zlyhaním od #15281) a vypíše SCCs. `check:cycles:ratchet` (čo beží CI ) blokuje, keď počet prekročí strop `metrics.cycles` v `quality-baseline.json` — momentálne 14, `direction: down`, takže môže iba klesnúť (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Áno (račňa)                             |
| `check:boundary`                  | spájanie `open-sse → src` : jedinečné importy medzi súbormi z nástroja do aplikácie (`scripts/quality/measure-boundary.mjs`; okrajový zoznam je nevybavený protokol o náprave v4 core/module-split ). Holá poradenská správa = (rovnaká ako `quality:boundary`). `check:boundary:ratchet` (čo CI beží, tiež v `quality.yml` rýchlobránovej rohatkovej slučke) blokuje, keď počet prekročí strop `metrics.boundaryOpenSseToSrc` v `quality-baseline.json` — nasadený na nameraných 771, `direction: down`; `--update` ju iba zníži; základne relatívne na PRs (`--base-ref`, pozri nižšie)                                                                                                                                                                                                                                                                                                                      | Áno (račňa)                             |
| `check:route-validation:t06`      | schémy Zod prítomné na všetkých trasách (politika úrovne 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | áno                                     |
| `check:any-budget:t11`            | počet `@ts-expect-error // any` nepresahuje rozpočet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | áno                                     |
| `check:provider-consistency`      | Každý poskytovateľ v `providers.ts` má zodpovedajúcu položku v `providerRegistry.ts` (a naopak, v rámci zoznamu povolených)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | áno                                     |
| `check:model-lifecycle`           | Tri ručne udržiavané smerovacie tabuľky zostávajú konzistentné so zaznamenanou snímkou životného cyklu (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nezískava žiadne vyradené ID, ktoré môže `REGISTRY` smerovať; každý cieľ `BUILT_IN_ALIASES` je prítomný v `REGISTRY` a chýba na snímke vyradeného id; každé vyradené ID stále v `REGISTRY` je preposlané alebo uvedené v `allowedRetiredInCatalog`; a žiadny zdroj alebo cieľ `DEFAULT_DEGRADATION_MAP` sa v tejto snímke nezobrazí ako vyradený. To nedokazuje, že model je v súčasnosti obsluhovaný priamym prenosom. Offline — sa porovnáva so `config/quality/model-lifecycle.json`, obnovuje sa ručne pomocou `npm run quality:refresh-model-lifecycle` (sieť; nie je zapojené do CI). `allowedRetiredInCatalog` je horľavá račňa: pridajte položku len s problémom sledovania.                                                                       | áno                                     |
| `check:fetch-targets`             | Každé `fetch("/api/...")` v `src/` na strane klienta sa premietne do skutočného `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | áno                                     |
| `check:deps`                      | Všetky hodnoty `npm install` -able v každom `package.json` v repo sú v `dependency-allowlist.json`; nové nepripnuté alebo zablokované balíky označené príznakom                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | áno                                     |
| `audit:deps`                      | npm audit všetkých piatich nezávislých lockfiles (root, Electron, OpenCode pluginy v1/v2 a poskytovateľ). Blok kritických upozornení; vysoké upozornenia zostávajú viditeľnými varovaniami. Missing/failed audity sú INCOMPLETE a block; zamknuté hodnoty hash a zostavy podľa rozsahu sa zachovajú.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | áno                                     |
| `check:lockfile`                  | `package-lock.json` integrita — https register, integrita hash, žiadne prepísanie hostiteľa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | áno                                     |
| `check:licenses`                  | SPDX licenčný zoznam povolených pre závislosti produkcie                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | áno                                     |
| `check:tracked-artifacts`         | Žiadne artefakty zostavy / potvrdené symbolické odkazy `node_modules` (tiež beží v režime husky pre-commit; predbežné stlačenie je zámerne ľahké — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | áno                                     |
| `check:ai-attribution`            | No AI/bot `Co-Authored-By` trailer or AI-generation footer in PR commits, title or body — Hard Rule #16 (in the `quality.yml` fast-gates loop for PR→`release/**` — reads the event payload, no-op off PRs — and a PR-only step in `ci.yml` lint for PR→`main`; also the husky `commit-msg` hook; human co-authors allowed; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:vitest-exclusions`         | Každé vylúčenie Vitest pomenúva problém so sledovaním a zobrazuje sa v `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | áno                                     |
| `check:file-size`                 | Zdrojové súbory (`.ts`/`.tsx` v `src/`, `open-sse/`, `electron/`, `bin/`) zostávajú v `cap` a testovacie súbory (`*.test.ts(x)`) v `testCap`; súbory zmrazené v `file-size-baseline.json` (`frozen` / `testFrozen`) nesmú presiahnuť svoju zaznamenanú veľkosť                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | áno                                     |
| `check:error-helper`              | Chybové odpovede v executors/handlers používajú `buildErrorBody()` / `sanitizeErrorMessage()` (tvrdé pravidlo #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | áno                                     |
| `check:migration-numbering`       | Migračné súbory SQL sú sekvenčne očíslované, bez medzier alebo duplikátov                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | áno                                     |
| `check:public-creds`              | Žiadne doslovné OAuth `client_id`/`client_secret` alebo webové kľúče Firebase mimo `publicCreds.ts` (pevné pravidlo #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | áno                                     |
| `check:db-rules`                  | Žiadne surové SQL mimo modulov `src/lib/db/` ; žiadne dovozy sudov zo `localDb.ts` (tvrdé pravidlá #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | áno                                     |
| `check:known-symbols`             | Vykonávatelia poskytovateľov, stratégie smerovania a prekladatelia zaregistrovaní v ich odosielacích tabuľkách zodpovedajú súborom na disku — žiadne osirelé alebo nedeklarované symboly                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | áno                                     |
| `check:route-guard-membership`    | Každá cesta, ktorá vytvára podriadený proces, je klasifikovaná podľa `isLocalOnlyPath()` (tvrdé pravidlá #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | áno                                     |
| `check:test-discovery`            | Každý súbor `*.test.ts` / `*.spec.ts` v repo zhromažďuje aspoň jeden testovací bežec (ratchet: zoznam osirelých zvierat v `test-discovery-baseline.json` sa môže iba zmenšiť)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | áno                                     |
| `check:test-tla-order`            | Žiadny súbor `node:test` pod `tests/unit` nezaregistruje test, zasiahne `await` najvyššej úrovne a potom zaregistruje ďalšie (#18045; ratchet: `test-tla-order-allowlist.json` sa môže iba zmenšiť)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | áno                                     |
| `check:agent-skills-sync`         | Vygenerované artefakty schopností agentov zodpovedajú ich zdrojovému katalógu (bez posunu). Režim uvoľnenia preverí každú zručnosť; funkcia PR (režim `pr` ) kontroluje iba zručnosti, ktorých vygenerovaný text upravuje — pozri [Generované súbory a odvodené základné línie](#generated-files-and-derived-baselines-written-at-release)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:provider-asset-provenance` | Poskytovateľ logos/assets má zaznamenaný záznam o pôvode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `lint:json`                       | JSON konfiguračné súbory analyzujú a spĺňajú pravidlá repo lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | kompilácia TypeScript bez chýb (len poradné upozornenia)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | áno                                     |
| `typecheck:noimplicit:core`       | Prísne `noImplicitAny` — orientované dopredu; mnohé už existujúce stránky volania stále potrebujú anotácie                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **Poradný** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` s rozsahom na `src/app/(dashboard)/**` (#7033) — 27-súborový zoznam povolených súborov spravovaný `typecheck:core` neobsahuje žiadny dashboard TSX a `next build` ho tiež nikdy nekontroluje typu (`next.config.mjs` nastavuje `ignoreBuildErrors: true`), takže regresie osamotených identifikátorov (#6625/#6909) boli pre CI neviditeľné. Rozdiely oproti zamrznutej základnej línii počtu per-file/per-TS-code (`config/quality/dashboard-typecheck-baseline.json`, rovnaký vzor zastaraného presadzovania ako `check:known-symbols`) — len chyby NEW mimo základného počtu zlyhajú; po oprave už existujúcej chyby znížiť rýchlosť pomocou `--update`.                                                                                                                                                                                                                                              | áno                                     |
| `check:build-typecheck`           | Kontrola typu produkcie celej aplikácie cez `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), zoznam povolených súborov `typecheck:core` s 27 súbormi a brána palubnej dosky nepokrývajú. Rozdiely oproti `config/quality/build-typecheck-baseline.json`; nový alebo zvýšený počet za (súbor, kód) zlyhá, nižší počet vás požiada o ratchet. `--update` odmietne, kým beh obsahuje nový alebo zvýšený pár, pokiaľ neprejde `--force-regressions`, a odmietne novo umlčaný súbor, pokiaľ neprejde `--force-nocheck`, takže rozšírenie základnej línie na zelenú a udelenie trvalého ticha sú dva samostatné úmyselné činy. Holý `--force` je odmietnutý. Tiež skenuje rozsah zostavenia pre `@ts-nocheck` oproti `config/quality/ts-nocheck-baseline.json`, pretože súbor, ktorý ho používa, nehlási žiadnu diagnostiku a inak by bol neviditeľný pre každú bránu. | áno                                     |

#### Dva programy na kontrolu písma odpovedajú odlišne

`typecheck:core` a `check:build-typecheck` kompilujú rôzne programy pod rôznymi možnosťami a ten istý súbor môže byť v jednom čistý a v druhom plný chýb.

`tsconfig.build.json` nastavuje `"strict": false`, takže `noImplicitAny` je vypnuté. Základná konfigurácia zostavuje upravený zoznam povolených súborov s 27 súbormi s prísnejšími možnosťami a riadi sa grafom importu každej položky, takže súbory, ktoré sa nikdy nezobrazia v zostavovacom programe, sú tam stále kontrolované.

Dôsledok je dôležitý pri posudzovaní, či je súbor napísaný:** nulová diagnostika pod `check:build-typecheck` neznamená nulu** . Odstránenie `@ts-nocheck` z 26 súborov ukázalo, že 23 z nich je v zostavovacom programe čistých; šestnásť z nich vyplávalo na povrch okolo 120 implicitných chýb v prísnej chybe. Pred volaním súboru clean skontrolujte obe.

### Práca: `quality-gate`

Beží po `test-coverage`. Pri zlyhaní sa bloky spájajú.

| Skript                       | Potvrdzuje                                                                                                                                                                       | Blokovanie        |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `quality:collect`            | Vysiela `quality-metrics.json` (počet varovaní ESLint, pokrytie zo zlúčenej správy o zlomku)                                                                                     | Áno (pred račňou) |
| `quality:ratchet`            | Každá metrika v `quality-baseline.json` sa nevrátila (ESLint upozornenia ≤ základná línia; základná úroveň pokrytia ≥ )                                                          | áno               |
| `check:duplication`          | Duplikácia kódu (jscpd@4) nepresahuje základnú hodnotu v `quality-baseline.json`                                                                                                 | áno               |
| `check:complexity`           | Cyklomatická zložitosť na úrovni súboru nepresahuje limit (core ESLint `complexity` + `max-lines-per-function`)                                                                  | áno               |
| `check:cognitive-complexity` | Ratchet kognitívnej zložitosti (`eslint-plugin-sonarjs`) — samostatný prechod ESLint ; CI spúšťa oba zlúčené ako jediný krok `check:complexity-ratchets`                         | áno               |
| `check:dead-code`            | Nepoužívaná západka exportov/súborov (knip) neregresuje oproti základnej čiare                                                                                                   | áno               |
| `check:compression-budget`   | Referenčný rozpočet kompresie — na minimálnu úsporu tokenov na motor nesmie klesnúť                                                                                              | áno               |
| `check:type-coverage`        | Ráčna s percentným typom (`type-coverage`) neregresuje; do značnej miery zahŕňa `typecheck:noimplicit:core`                                                                      | áno               |
| `check:codeql-ratchet`       | Počet otvorených upozornení CodeQL sa nevracia (číta sa cez `gh api`; elegantné preskočenie bez tokenu) kadencia obnovenia — a manuálne spustenie: pozri „CodeQL ratchet“ nižšie | áno               |

### Práca: `quality-extended`

Celá práca je poradná (`continue-on-error: true`). Ratchety založené na npm fungujú skutočne; externé skenery sa inštalujú cez `gh release download` a automaticky preskočia (ukončenie 0), keď binárny súbor stále chýba.

| Skript                   | Potvrdzuje                                                                                                                                                                                                                    | Blokovanie                                          |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `check:circular-deps`    | Žiadne kruhové závislosti (dpdm)                                                                                                                                                                                              | **Poradný**                                         |
| `check:bundle-size`      | Veľkosť balíka nepresahuje vrchnú časť                                                                                                                                                                                        | **Poradný**                                         |
| `check:secrets`          | Tajné skenovanie (gitleaks) — preskočí, ak binárne chýba                                                                                                                                                                      | **Poradný**                                         |
| `check:vuln-ratchet`     | Chyby v závislosti (osv-scanner) neregresujú — `--ratchet` zlyhá ako INCOMPLETE (výstup 2), ak nie sú zmerané                                                                                                                 | **Poradný**                                         |
| `check:workflows`        | Prachnutie pracovného toku (actionlint + zizmor); skenery missing/broken, neplatné hlásenia alebo chýbajúca základná čiara račne zlyhajú ako INCOMPLETE. Platné zistenia sa riadia vybranou politikou strict/advisory/ratchet | Vyžaduje sa vykonanie; blokovanie račne zizmor v CI |
| `check:openapi-breaking` | Verejná zmluva API proti potvrdeniam pripnutej udalosti (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); požadované meranie zlyhá zatvorené                                            | **Blokovanie pomocou --ratchet**                    |

### Práca: `docs-sync-strict`

Beží na každom PR až `main`. Pri zlyhaní sa bloky spájajú.

| Skript                         | Potvrdzuje                                                                                                                                                        | Blokovanie                |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `check:docs-all`               | Metabrána, ktorá postupne spúšťa 6 podbrán                                                                                                                        | áno                       |
| ↳ `check:docs-sync`            | konzistencia verzie CHANGELOG / OpenAPI ; režim uvoľnenia aj zrkadlá 66 `llm.txt` a preložené sekcie CHANGELOG (režim PR : zrkadlá súhlasia)                      | áno                       |
| ↳ `check:docs-counts`          | Počty v próze (počet poskytovateľov, počet migrácií atď.). Dva režimy: `pr` na funkcii PRs, `release` inde — pozri „Odvodené hodnoty“ nižšie                      | áno                       |
| ↳ `check:env-doc-sync`         | Každý env var v `.env.example` je zdokumentovaný v tabuľke dokumentov a naopak                                                                                    | áno                       |
| ↳ `check:deprecated-versions`  | V dokumentoch nie sú žiadne reťazce zastaraných verzií                                                                                                            | áno                       |
| ↳ `check:doc-links`            | Interné odkazy na zníženie v dokumentoch sa rozlíšia na skutočné súbory (forma `[text]`/`(path)` )                                                                | áno                       |
| ↳ `check:fabricated-docs`      | V kódovej základni existujú trasy, env vars, príkazy CLI, názvy hákov a cesty k súborom citované v dokumentoch. Tvrdá brána cez `--strict`; soft-fail bez vlajky. | Áno (cez `--strict` v CI) |
| `check:cli-i18n`               | Klávesy CLI `t()` existujú v `bin/cli/locales/en.json` (oba režimy); Parita pt-BR / zh-CN / zh-TW so `en.json` iba v režime uvoľnenia                             | áno                       |
| `check:openapi-coverage`       | OpenAPI spec pokrýva aspoň ratchetovú podlahu skutočných trás                                                                                                     | áno                       |
| `check:openapi-security-tiers` | Anotácie bezpečnostnej úrovne v `openapi.yaml` sú konzistentné s klasifikáciami `routeGuard.ts`                                                                   | **Poradný**               |
| `check:openapi-routes`         | Každá cesta v `openapi.yaml` sa mení na skutočný `route.ts` (antihalucinácia)                                                                                     | áno                       |
| `check:docs-symbols`           | Každý odkaz `/api/...` v `docs/**/*.md` sa mení na skutočný `route.ts` (antihalucinácia)                                                                          | áno                       |
| `i18n translation drift`       | `docs/i18n/**` mirrors vs `.i18n-state.json` — poradenské na PRs (zrkadlá sú osviežené vlnou prekladu), prísne na push a nočné                                    | **Poradný** na PRs        |

#### Zrkadlá prekladu sú odvodené súbory (režim PR vs režim uvoľnenia)

Funkcia PR upravuje iba anglické zdroje. Zrkadlá `docs/i18n/<locale>/**` (vrátane 66 kópií `llm.txt` a preložených súborov `CHANGELOG.md` ) a `.i18n-state.json` sa prepisujú v jednom kroku vlnou prekladu (vetvy `docs/i18n-*` / `chore/i18n-*`, plánované `i18n-mirror-refresh.yml`) a vydaním (`npm run release:sync-changelog-i18n`). Zrkadlové brány preto bežia v dvoch režimoch, ktoré sa riešia pomocou `scripts/check/lib/gateMode.mjs` (`--mode=pr|release`, potom `OMNIROUTE_GATE_MODE`, potom udalosť Actions; lokálne spustenie je `release`):

- Režim uvoľnenia `check:docs-sync` — spustí každú kontrolu. Režim PR zachováva verziu package.json/OpenAPI, koreňové nadpisy CHANGELOG a ochranu nahradených dokumentov a tlačí `SKIP reason=pr-mode` pre zrkadlové kópie `llm.txt` a preložené sekcie CHANGELOG — pokiaľ PR nezapisuje zrkadlá: hlavná vetva deklarovaná ako zapisovateľ rodiny `docs/i18n/**` v `config/quality/derived-paths/*.json` spúšťa obe kontroly striktne, a keď je spustená vlastná rozdielová báza, `docs/i18n/<locale>/llm.txt` sa striktne kontroluje zmena `CHANGELOG.md`. Základ rozdielu sa nevyrieši pri kontrole depth-1 (úloha `docs-sync-strict` ), takže režim PR tiež spúšťa jednu kontrolu, ktorá nepotrebuje žiadnu základňu: každé zrkadlo `llm.txt` musí existovať, musí si ponechať svoj oddeľovač `---` a niesť buď koreňové telo alebo telo, ktoré zdieľa väčšina zrkadiel. Základňa, ktorá sa posunula, zanecháva všetky zrkadlá rovnako zastarané a prechádza; ručná úprava jedného zrkadla zlyhá. Preložené súbory `CHANGELOG.md` nemajú takúto kontrolu v pokladni depth-1 PR.
- Hák pred potvrdením spustí `check-docs-sync.mjs --mode=pr`: potvrdenie sa posudzuje podľa toho, čo robí. Bez príznaku je lokálne spustenie režimom uvoľnenia a jeden zlúčený PR, ktorý upravuje koreňový `llm.txt` by zablokoval každé neskoršie odovzdanie na tejto báze, kým by sa vlna nespustila. Rovnaké pravidlo platí pre každú bránu s ohľadom na režim, po ktorej Husky hook beží: hák prejde `--mode=pr` a prísne verdikt zostáva pri spustení v režime uvoľnenia (uvoľnenie PR, stlačí na `main`, obyčajný lokálny chod).
- Testy zrkadlových jednotiek obsahu (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`, `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`, `docs/*-locales`) Režim vydania — presadzuje každé miestne nastavenie. Režim PR uplatňuje iba zrkadlá, ktoré sú aktuálne s anglickým zdrojom podľa `.i18n-state.json` (celý súbor alebo hash zaznamenanej sekcie testovacích pinov) a preskakuje zastarané s odôvodnením. Kontroly pôvodu `target_hash` prebiehajú pre každé miestne nastavenie v oboch režimoch. Čerstvosť je na sekciu `## `, jednotka `run-translation.mjs` hash; dlhá sekcia (súpis brány tohto súboru je približne polovica) znamená, že akákoľvek úprava v ňom ponechá tieto zrkadlá zastarané a ich tvrdenia v režime PR preskočia do ďalšej vlny. Kotva, ktorú anglický zdroj už neobsahuje, spadá späť do porovnania celého súboru.
- `i18n translation drift` — poradenstvo na PRs, prísne na tlačenie, nočné a uvoľnenie rez, takže zastarané zrkadlo nemôže byť odoslané vo verzii.

`scripts/i18n/sync-llm-mirrors.mjs` (tiež exportované ako `syncLlmMirrors()`, so `--dry-run`) prepisuje `llm.txt` zrkadlá; obnova vydania, vlna prekladu a naplánované `i18n-mirror-refresh.yml` to spustia (obnovenie detekuje zastarané zrkadlá `llm.txt` pomocou suchého chodu, pretože správa o posune ich neuvádza a synchronizuje ich pred `check:docs-all`).

Vygeneruje sa dvanásť README SVGs pod `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` ich všetky regeneruje). Každý má test jednotky porovnávania bajtov (`tests/unit/docs/readme-*-svg.test.ts`, úloha `test-unit`), ktorý zlyhá, keď je potvrdený súbor v režime uvoľnenia zastaraný; v PR, `check:generated-artifacts` posudzuje a SVG úpravy PR a posun základne je ponechaný na obnovenie vydania (pozri [Generované súbory a odvodené základné línie](#generated-files-and-derived-baselines-written-at-release) ) — a `check:docs-counts` čítajú kanonické čísla z ich uzlov `<text>` — čo je dôvod, prečo krok obrysu zachováva každý načrtnutý reťazec v súbore ako neviditeľný `<text>`. Kontrola kanonických čísel SVG číta súbory uvedené v `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` a `tier-flow-light.svg`; tvrdenia o voľnom čase, o vstupe do katalógu, o opakovanom fonde a o faktoroch hodnotenia tiež čítajú `promise-pillars.svg`, `free-tier-budget.svg` a `strategies-grid.svg`. Počty, ktoré tieto generátory čerpajú (celkový počet poskytovateľov, nástroje MCP, stratégie smerovania, poskytovatelia bez obmedzenia, ...) pochádzajú zo snímky faktov `docs/reference/derived-facts.json` až po `scripts/docs/readmeFacts.mjs`, nie z literálov, takže pri regenerácii diagramu na ľubovoľnej vetve sa reprodukuje potvrdený súbor. `free-tier-budget.svg` čerpá svoje riadky z rovnakej snímky (`code.freeTierBudget`, katalógový súhrn záznamov skúmania faktov), takže zmena na `FREE_MODEL_BUDGETS` sa na kartu dostane pri ďalšom obnovení namiesto sfarbenia CI na červenú.

### Odvodené hodnoty: režimy brány `pr` a `release`

Funkcia PR nikdy nezapisuje hodnotu, ktorá závisí od stavu jej základne: poskytovateľ, migrácia, počet nástrojov MCP a stratégie, čísla README SVG, prehľad faktov. Jeden krok prepočíta všetky z nich, `npm run release:refresh-derived`, spustené vydaním a nočným odvodeným obnovovaním PR. Takže** medzi vydaniami je základňa dizajnom za živým kódom** a brána alebo test, ktorý porovnáva strom so živým kódom, by bol červený na každom PR potom, čo súrodenec pridal poskytovateľa. Brány, ktoré posudzujú odvodené hodnoty, preto bežia v jednom z dvoch režimov, vyriešených pomocou `scripts/check/lib/gateMode.mjs` (prvý zápas vyhráva):

1. `--mode=pr|release` na príkazovom riadku;
2. premenná prostredia `OMNIROUTE_GATE_MODE` (`pr` alebo `release`);
3. automaticky, z udalosti GitHub Actions: `pull_request`, ktorého hlava nie je `release/v*`, `merge_group`, alebo stlačenie na `omni-queue/**` → `pr`; všetko ostatné (push, plán, odoslanie, vydanie PR `release/v* → main`, akékoľvek lokálne spustenie) → `release`.

Čo `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) zlyhá v každom režime:

| Režim     | Zlyhá                                                                                                                                                                                                                                                                                                                                                                                                                                  | Potrebuje živé fakty |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `release` | Každá kontrola, prísna rovnosť s faktami zozbieranými zo stromu (správanie brány vždy): zastaraný počet, verzia, spodná hranica pokrytia alebo číslo SVG je posun STRICT                                                                                                                                                                                                                                                               | áno                  |
| `pr`      | Iba to, čo zmena urobila, sa porovnalo so základom PR s rovnakými extraktormi nárokov: (1) riadená hodnota, ktorá neexistovala v základni pre túto kontrolu a súbor („PR upravila spravované číslo — obnovila riadok na základný text“); (2) požadovaný nárok, ktorý základňa niesol a hlava stratila. Invarianty obsahu, ktoré nepotrebujú žiadne fakty, bežia ako v režime vydania; kontroly len na uvoľnenie sú uvedené a vynechané | Nie                  |

Súbory s pokynmi agenta nesú** č** odvodený počet vôbec: `AGENTS.md`, `llm.txt` (a jeho kópie `docs/i18n/*/llm.txt` ), vidlica bs `AGENTS.md`, `open-sse/services/AGENTS.md`, `src/shared/constants/agentSkills.ts`, `skills/README.md` a každé `skills/*/SKILL.md` ukazujú na zdroj (napríklad `ROUTING_STRATEGY_VALUES` v `src/shared/constants/routingStrategies.ts`) a namiesto toho na `npm run facts`. Invariant „Žiadne odvodené počty (súbor inštrukcií agenta…)“ zlyhá pri počítaní (poskytovatelia, migrácie, nástroje a rozsahy MCP, stratégie smerovania, faktory skórovania, balíky režimov), takže obnovenie vydania nikdy nemusí prepisovať súbor inštrukcií.

V režime `pr` môžu vetvy zapisovača upravovať spravované hodnoty: `chore/derived-*` (nočné obnovenie PR), `release/v*` a vlny prekladu `docs/i18n-*` a `chore/i18n-*` (`scripts/check/lib/derivedClaimsDiff.mjs`). Dávky frontu (`merge_group`, Mergify drafts, `omni-queue/**`) sa znova neposudzujú: sčítavajú PRs brány, ktoré už boli hodnotené, jednu po druhej.

Výstupné kódy: `0` clean · `1` STRICT drift (alebo jemný drift s `--strict`) alebo porušenie spravovanej hodnoty · `2` infraštruktúra — fakty o kóde nebolo možné zhromaždiť (sonda tsx zlyhala alebo vypršal časový limit; časový limit je `OMNIROUTE_FACTS_TIMEOUT_MS`, predvolená základňa 600 000 ms sa nedá vyriešiť) alebo, v CI, rozdiel PR. Výstup 2 nikdy nie je rozdiel v dokumentácii: znova spustite úlohu alebo opravte prostredie.

Kde beží každý režim:

| Kde                                                                                                       | Režim                                                                                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Funkcia PR — `ci.yml` úloha `docs-sync-strict`, `quality.yml` krok "Presnosť dokumentov"                  | `pr` (automatické); úloha prejde základom ako `BASE_SHA` a odhlási sa pomocou `fetch-depth: 2`                                                                                                                    |
| `merge_group`, `omni-queue/**` kandidáti, úplný zoznam brán zlúčeného vlaku                               | `pr`                                                                                                                                                                                                              |
| Uvoľnenie PR (`release/v* → main`), tlačenie, plánované a manuálne spustenie                              | `release`                                                                                                                                                                                                         |
| Release-Green (`scripts/quality/validate-release-green.mjs`)                                              | položky HARD bežia so `OMNIROUTE_GATE_MODE=pr` ("zlomila sa základňa?"); položka DRIFT `derived-refresh` spúšťa `npm run release:refresh-derived -- --check` (prísne zobrazenie, nikdy neotvorí základnú červenú) |
| Uvoľnenie (`/generate-release` fázy 0a a 1; zapojenie zručností je samostatná zmena schválená vlastníkom) | `npm run release:refresh-derived` zapisuje odvodené súbory; vlastné kontroly vydania PR sa potom spustia v režime `release`                                                                                       |
| `nightly-derived-refresh.yml` (denne, najvyššie `release/vX.Y.Z`, preskočené pri zmrazení vydania)        | `npm run release:refresh-derived -- --profile=nightly`; na rozdiele ponecháva ONE PR otvorené od `chore/derived-refresh`; nikdy nesplynie                                                                         |

Príkazy za tým:

- `npm run facts` vypíše každé odvodené číslo ako JSON (`scripts/release/facts.mjs`). `--key=code.mcpTools` vypíše jednu hodnotu, `--snapshot` načíta potvrdenú snímku namiesto živého stromu. Výstup 2, keď nie je možné zhromaždiť fakty.
- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) prepočíta odvodené súbory v jednom prechode v tomto `e2e-timings` (identifikátory krokov pre `--only=`): `provider-reference` (`docs/reference/PROVIDER_REFERENCE.md`), `facts` (snímka), `numbers` (plán prepísania — počítaní aplikovaný na dokumenty, potom prenesený do ich `origin/main` `docs/i18n/` `--only`, `readme-diagrams`, `skills` `--rewritten-since=<ref>` vygenerované `SKILL.md` `en.json` `syncE2eTimings` do stromu — `check:generated-artifacts` `ui-keys` preskočené `check:agent-skills-sync` `--check` `llm-mirrors` `verify-generated` Krok `changelog` je voliteľný (`--with-changelog`, iba profil vydania). `--profile=nightly` sa nikdy nedotkne nároku na verziu. Pomocou `-- --check` nezapíše nič a ukončí 1, keď sa ktorýkoľvek súbor zmení alebo keď spravovaná hodnota potrebuje manuálnu úpravu (uvádza oboje); exit 2 pri zlyhaní infraštruktúry. `--json` vypíše výsledok ako JSON.
- `docs/reference/derived-facts.json` je snímka skutočností, ktoré sa použili pri poslednom obnovení. Píše to len refresh. Generátory README SVG ho prečítajú a testy jednotky času PR porovnávajú potvrdené dokumenty a vygenerované súbory s ním — nikdy so živým kódom. Jediným živým porovnaním balíka je "aktualizácia vydania uzatvára cyklus" v `tests/unit/check-docs-counts-sync.test.ts`: so skutočnými faktami plán prepísania obnovenia aplikovaný v pamäti nezanecháva žiadny posun STRICT, ktorý nehlási, a preplánovanie nič nezmení.

Ak chcete reprodukovať lokálne (predvolené lokálne spustenie je `release`):

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # what a feature PR is judged on
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # what the release would rewrite
```

Bez rozlíšiteľného základu (žiadne `BASE_SHA`/`BASE_REF`, žiadne lokálne `origin/release/v<version>`) miestne spustenie `pr` vypíše varovanie a preskočí rozdiel namiesto zlyhania.

### Práca: `i18n-ui-coverage`

| Skript                              | Potvrdzuje                                                                                                                                                                                                        | Blokovanie                |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `check-ui-keys-coverage` (v riadku) | Pokrytie kľúčom UI i18n je ≥ 65 %                                                                                                                                                                                 | Áno (oba režimy)          |
| `check:ui-icu`                      | Každá správa každého katalógu UI sa kompiluje pomocou `IntlMessageFormat`                                                                                                                                         | Áno (oba režimy)          |
| `check-ui-value-drift` (v riadku)   | Prepísaná angličtina** hodnotu** nezanechá za sebou žiadny zatuchnutý preklad                                                                                                                                     | Áno (iba režim uvoľnenia) |
| `check-new-key-coverage` (v riadku) | A** nové** Anglický kľúč je preložený v každom jazyku — a značka `__MISSING__:` je odmietnutá                                                                                                                     | Áno (iba režim uvoľnenia) |
| `check-key-completeness` (v riadku) | Každý katalóg UI (a pri `--catalog=cli` každý katalóg CLI ) nesie presne kľúčovú sadu svojho `en.json`; v režime `pr` sa každý katalóg PR zmenil proti sebe na základni zlúčenia                                  | Áno (oba režimy)          |
| `check-translation-ratio`           | Skutočný pomer prekladu na miestne nastavenie (identický s angličtinou / zástupný symbol / chýbajúce listy mimo zoznamu povolených) nesmie presiahnuť `config/quality/i18n-translation-baseline.json` + uvoľnenie | Áno (iba režim uvoľnenia) |

Potrebuje `fetch-depth: 0` — brána posunu hodnoty sa líši `en.json` proti zlučovacej základni.

**Dva režimy (od 2026-11-13).** Funkcia PR pridáva alebo prepisuje kľúče v `en.json` (a `bin/cli/locales/en.json`) a nedotýka sa žiadneho iného miestneho nastavenia; `check:pr-derived-paths` (job `pr-test-policy`, rodina `config/quality/derived-paths/translation.json`) zlyhá pri funkcii PR ktorá to robí. Ostatné miestne nastavenia sú dokončené raz za vydanie pomocou `release:refresh-derived`, ktoré volá `syncUiKeys()` v `scripts/i18n/sync-ui-keys.mjs` (pridať chýbajúce kľúče, orezať vynechané, označiť preklady prepísanej angličtiny pomocou `rewrittenSinceRef`, preložiť) alebo prekladovou vlnou. Brány čítajú režim z `scripts/check/lib/gateMode.mjs`: v režime `pr` (funkcia PRs, `merge_group`, `omni-queue/**`) brány režimu uvoľnenia nad vytlačia `SKIP reason=pr-mode` a ukončia 0; v režime `release` (vydanie PR, stlačí na `main`, `workflow_dispatch`, lokálne beží) sú prísne ako predtým a pri vydaní PR tí, ktorí si uvedomujú rozdiel, dostanú `BASE_REF=origin/main`, takže posudzujú každý kľúč, ktorý cyklus pridal alebo prepísal. Ukážte si verdikt feature-PR lokálne pomocou `--mode=pr`.

PR, ktorý stále mení miestne katalógy v režime `pr` (vlna prekladu, obnova vydania, oprava len pre preklad), sa nepreskočí: `check-key-completeness` posúdi každý zmenený katalóg oproti rovnakému katalógu na zlučovacej báze (`scripts/i18n/lib/touched-catalogs.mjs`) a zlyhá na kľúči, ktorý katalóg stratil, chýba kľúč `en.json`, skutočný preklad sa zmenil na značku `__MISSING__:` alebo do anglického textu, ktorý už neinterpoluje hodnotu placeholders/tags, PR a dotyk. Nový katalóg v PR musí obsahovať celú sadu kľúčov `en.json`. To zahŕňa, pre katalógy, PR, čo by videli brány pomeru a CLI-parity.

Testy jednotiek lokálnej parity (`cli-i18n-catalog`, `i18n-pt-br`, `i18n-vi-completeness`, `i18n-placeholder-parity`) sa riadia rovnakými režimami až do `tests/_helpers/localeParityMode.ts`: v režime `pr` preskakujú výrazy parity kľúčov a ponechajú na uvoľnenie obnovenie zástupnej parity kľúčov, ktorých angličtina sa zmenila od základne zlúčenia (každý kľúč, keď ho plytká pokladňa úlohy testu jednotiek nedokáže prečítať). Tým pomocníkom je** iba** podmienené preskočenie schváleného režimu: `check:test-masking` počíta `.skip(` a `{ skip: true }`, ale nie vypočítané `{ skip: "<reason>" }` ktoré vráti, takže `tests/unit/locale-parity-mode.test.ts` pripne zoznam testov, ktoré ho môžu použiť — pridanie jedného je skontrolovanou úpravou tohto zoznamu.

#### `check-ui-value-drift` — zatuchnutá-prekladová brána

Zachytáva jednu regresiu i18n, ktorú ostatné brány štrukturálne nevidia: anglická hodnota je prepísaná a preklady odvodené z _predchádzajúcej_ angličtiny zostávajú pozadu, takže používatelia, ktorí nie sú v angličtine, pokračujú v čítaní sebavedome formulovanej, teraz nesprávnej kópie.

Toto bolo skutočne odoslané. `oauthModal.googleOAuthWarning` bolo prepísané, keď pristál pomocník pri prihlásení Antigravity (#5203);** 39 zo 43 miest** stále text oznamujúci operátorom, aby „skopírovali celé URL a vložili ho nižšie“ — tok, ktorý pre daného poskytovateľa nemožno dokončiť. Až do #8463 to zostalo nepovšimnuté, pretože:

- `sync-ui-keys` vyplní iba kľúče, ktoré sú** neprítomný** , nikdy také, ktoré sú** zatuchnutý** ;
- `check-ui-keys-coverage` počíta kľúčovú _prítomnosť_, takže zastaraný preklad sa považuje za pokrytý;
- `check-translation-drift` sleduje dokumentáciu `docs/i18n/<locale>/**.md` zrkadlí — nikdy nečíta `src/i18n/messages/*.json`. Beží v úlohe `docs-sync-strict`: poradenské na PRs, prísne na push a nočné; vlna prekladu osviežuje zrkadlá, nie funkcia PR.

**Zohľadňujúce rozdiely, nie sú podporované základnou líniou.** Porovnáva `en.json` na zlučovacej báze s pracovným stromom; pre každý kľúč, ktorého anglická hodnota sa zmenila, je každé miestne nastavenie, ktoré stále obsahuje nedotknutý preklad, zastarané. Toto schválne** zmrazí už existujúci dlh** — a diff nedokáže odhaliť, z ktorej starej angličtiny pochádza dlhoročný preklad, takže brána posudzuje len to, čoho sa aktuálna zmena dotýka. Alternatíva (základná hodnota hash na kľúč) by stála súbor generovaný ~ 600 KB, čo je 3 × najväčšia existujúca základná hodnota, ktorá by sa šírila na každom i18n PR.

Dva spôsoby, ako to uspokojiť:

1. aktualizovať dotknuté preklady, príp
2. nastavte ich na `__MISSING__:<new english>` — runtime potom obsluhuje opravenú angličtinu (`src/i18n/request.ts::deepMergeFallback`, #7258) a kľúčové fronty na preklad.

Ak je reťazec** význam** zmenil, preferuj** premenovanie kľúča** : nový kľúč nemôže zdediť zastaraný preklad. To je použitý vzor #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Ukončí 0 s `SKIP reason=base-unresolved` keď sa nedá prečítať základný katalóg (plytký klon bez základného ref), zrkadlenie `check-openapi-breaking`. Len režim uvoľnenia: funkcia PR prepíše angličtinu a zastaví sa tam; obnova vydania označuje preklady, ktoré po sebe zanechala (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`, same `findStaleTranslations`).

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

### Práca: `test-vitest`

Beží po `build`. Pri zlyhaní sa bloky spájajú.

| Suita            | Potvrdzuje                                                   | Blokovanie                                                                                                 |
| ---------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 nástrojov), autoCombo, cache — vitest runner | áno                                                                                                        |
| `test:vitest:ui` | UI testy komponentov — vitest runner                         | **Blokovanie** — už existujúce zlyhania sú v `vitest.config.ts` explicitne vylúčené; nové zlyhania zlyhajú |

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

## Rýchlostná fáza (2026-08-30 → v4.0 LTS): každá základná línia sa uvoľnila o 20 %

Rozhodnutie vlastníka (2026-08-30): až do modularizácie verzie 4.0 záleží na rýchlosti prepravy viac ako na držaní dlhu. Každý** číselné** základná línia račne bola uvoľnená o 20 % pri jednom auditovateľnom prechode a fáza je deklarovaná v `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Čo sa zmenilo                                                                                                                                                                                               | Kde                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — nižšie-je-lepšie počty × 1,2, vyššie-je-lepšie percentá ÷ 1,2 (minimálna hranica pokrytia 60 zachovaná, `eslintErrors` zostáva 0, `eslintWarnings` 0 → 20 % počtu zmrazených potlačení) | `quality-baseline.json` (zoznam poznámok `_relax_velocity_2026_08_30` vždy pred → po)                  |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                            | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, každý `frozen[*]` / `testFrozen[*]` riadkový uzáver × 1.2                                                                                                                                 | `file-size-baseline.json`                                                                              |
| počet na súbor / na kód TS × 1.2                                                                                                                                                                            | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                         | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` sa stáva poradným, zatiaľ čo `_policy.requireTighten === false`                                                                                                                         | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| nočné prestávky `bank-ratchet-shrinks` (naklonilo by sa tým namerané zmenšenie a zrušila by sa svetlá výška)                                                                                                | `.github/workflows/nightly-release-green.yml`                                                          |

Zoznamy povolených (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`, …) sú** nie** rozpočty a neboli dotknuté. Brány politiky Pass/fail (tajomstvá, pravidlá SQL, zmluva docs/env, parita i18n, testy jednotiek) sú nezmenené — červený test je stále červený test.

**Nástroje**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — jednorazová relaxácia (`scripts/quality/relax-baselines.mjs`); odmietne bežať dvakrát s tou istou poznámkou.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` — meria každú numerickú bránu tak, ako to robí CI, a vypíše zostávajúcu svetlú výšku na bránu (`scripts/quality/baseline-headroom.mjs`). Nočná úloha `baseline-headroom` zverejní tabuľku v súhrne spustenia pracovného toku a odovzdá svoju správu JSON/Markdown ako `baseline-headroom-<run_id>`, ktorá sa uchováva 90 dní. Varovné a kritické riadky identifikujú brány v rámci 10 % ich stropu alebo už nad ním. Preskúmajte tieto správy ako včasné varovanie pred vyčerpaním rozpočtov; skontrolujte poznámky `_rebaseline_*` brániaceho sa brány. Úloha už nevytvára ani neaktualizuje trvalý problém; #12149 zachováva staršiu históriu prehľadov.

**Režim nového kódu (Clean-as-You-Code) — od 30. 8. 2026, iba rýchla cesta PR**

Pri udalostiach `pull_request` `quality.yml` prechádza `--base-ref <PR base SHA>` do `check:file-size`, `check:complexity-ratchets` a `check:dead-code`. Pre `check:complexity-ratchets` a `check:dead-code` brána porovnáva HEAD so zlučovacou základňou** obmedzené na súbory, ktorých sa PR dotkol** (`scripts/check/newCodeMode.mjs`: zlučovacia základňa sa zhmotní v jednorazovom `git worktree`, tam beží ESLint/knip a na HEAD sa počty na súbor líšia):

- **blokovanie** — PR pridalo porušenia cyclomatic/cognitive alebo mŕtve exporty v súboroch, ktoré zmenil (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` v protokole);
- **poradenské** — globálny súčet vs. zmrazená základná línia. Zdedený drift nikdy neovplyvní nevinný PR; drift je znovu zmrazený pri uvoľnení zosúladenia a sleduje ho pracovná rezerva.

`check:file-size` používa základnú referenciu na základe vlastných podmienok (`scripts/check/check-file-size.mjs`, #8522): kontroluje každý zdrojový a testovací súbor v strome, číta počet riadkov každého z nich na základni PR pomocou `git show` a súbor zlyhá iba vtedy, keď presiahne väčšiu hranicu základnej línie (`frozen` / `testFrozen` alebo `cap` / `testCap` ) a veľkosť súboru mimo základnej línie. Pilník, ktorý už driftoval na základni, preto nikdy nezničí nevinné PR.

`check:boundary:ratchet` aplikuje rovnaké pravidlo na svoje jediné číslo (`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): pri udalostiach PR obe rýchle brány `quality.yml` aj úloha `ci.yml` lint prejdú základom PR SHA, základné odovzdanie sa meria z exportu `git archive` a PR zlyhá iba vtedy, keď počet hrán `open-sse → src` presiahne väčší z `metrics.boundaryOpenSseToSrc` a počet na základni. Posun základne nad stropom je zaznamenaný (`base drift herdado`), ale nikdy neovplyvní nevinný PR; push → main udržuje absolútny strop a nevyriešiteľný základ SHA sa k nemu vráti s varovaním.

Kandidát na viacúčelový front (presunutie na `omni-queue/**`, pozri [OMNI_QUEUE.md](../ops/OMNI_QUEUE.md) ) má rovnaké zaobchádzanie ako žiadosť o stiahnutie: oba pracovné postupy prejdú základňou kandidátov (`needs.changes.outputs.candidateBase`) ako `--base-ref` a `check:ts7-diagnostics-ratchet` sa s ním tiež stretne. Pre dve brány nového kódu je porovnávacou základňou samotný SHA, nie prvý rodič najvyššieho odovzdania zlúčenia, takže sa posudzuje každá žiadosť o stiahnutie dávky.

`workflow_dispatch` beží, uvoľnená zelená sweep a nočná práca s rezervou nemajú základ PR a zachovávajú absolútne (globálne) porovnanie. Pokrytie, duplikácia a typové pokrytie zatiaľ zostávajú globálne (ich nástroje nevytvárajú rozdiel medzi súbormi lacno) kandidátmi — na rovnaké zaobchádzanie.

**Ukončenie fázy vo verzii 4.0 (LTS = prísnejšie ako predtým, nie „návrat do normálu“)**

1. Na čistom tipe `release/v4.0.0` : `npm run quality:headroom --json` pre záznam, potom `npm run quality:ratchet -- --update`, `check:file-size --update`, `check:complexity-ratchets --update`, `check:dead-code --update`, `--update` — každej základnej čiary klesá na nameranú hodnotu.
2. Odstráňte `_policy` zo `quality-baseline.json` (znovu vyzbrojte `--require-tighten` a nočné bankovanie), obnovte `THRESHOLD = 36` (alebo vyššie) v `check-openapi-coverage.mjs`.
3. Utiahnite nad rámec merania tam, kde sa modularizácia vyplatila: veľkosť súboru `cap` späť na 1 000 (alebo 800), pokrytie + 5, mŕtve exporty 0 pre modularizované balíky.

## Ratchet Baseline (`quality-baseline.json`)

Rohatkový motor (`scripts/quality/check-quality-ratchet.mjs`) číta `quality-baseline.json` a porovnáva ho s čerstvo nazbieraným `quality-metrics.json`. Akákoľvek metrika, ktorá sa vráti za hranicu epsilon, zlyhá pri zostavovaní.

Aktuálne sledované metriky:

| Metrické              | Smer   | Význam                            |
| --------------------- | ------ | --------------------------------- |
| `eslintWarnings`      | `down` | Počet varovaní ESLint nesmie rásť |
| `coverage.statements` | `up`   | Pokrytie výpisu nesmie klesnúť    |
| `coverage.lines`      | `up`   | Pokrytie linky nesmie klesnúť     |
| `coverage.functions`  | `up`   | Funkčné pokrytie nesmie klesnúť   |
| `coverage.branches`   | `up`   | Krytie pobočky nesmie klesnúť     |

Ak chcete aktualizovať základnú líniu po skutočnom zlepšení:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Príznak `--update` zapisuje aktuálne namerané hodnoty do `quality-baseline.json`. Zlepšenie bankovania je práca release/nightly, nie funkcia PR's: `--require-tighten` (Fase 6A.5) zlyhá pri vylepšení bez bankovania iba v režime uvoľnenia (push, plán, uvoľnenie PR, lokálne spúšťanie). Vo funkcii PR (režim brány `pr` ) vytlačí vylepšenie ako informáciu a odovzdá ho; regresia zlyhá v oboch režimoch. Počas rýchlostnej fázy je všade poradný (`_policy.requireTighten: false`). Pozrite si časť [Generované súbory a odvodené základné línie](#generated-files-and-derived-baselines-written-at-release).

### CodeQL račňa: obnovovacia kadencia a manuálna spúšť

`check:codeql-ratchet` číta** stav repo, obnovený podľa plánu — nie za PR.** `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` hlási `state: configured`, `schedule: weekly`: skenovanie predvoleného nastavenia GitHub, nie analýza typu push. Dôsledok: po zlúčení PR, že FIXES výstrahy, ratchet pokračuje v čítaní starého, vyššieho počtu, až kým sa nespustí ďalšie naplánované skenovanie — takže hlási regresiu pri každom otvorenom PR, vrátane vlastných následných krokov fixujúceho PR, až kým sken nedobehne.

**Manuálne obnovenie** : `gh workflow run codeql.yml --ref release/vX.Y.Z` znova spustí analýzu a znova zverejní upozornenia v priebehu niekoľkých minút. Najprv si prečítajte `.github/workflows/codeql.yml` — jeho hlavička vysvetľuje, že ide `workflow_dispatch` -only** pretože je v konflikte s "predvoleným nastavením" GitHub** (`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`). Obnovenie spúšťačov `push`/`pull_request`/ `schedule` vyžaduje** ako prvá akcia vlastníka** : Nastavenia → Zabezpečenie kódu → CodeQL: Predvolené → Rozšírené. Nepridávajte spúšť `schedule:` bez tohto prepínača — spôsobí to iba neúspešné spustenia.

**Po poklese počtu utiahnite základnú čiaru** — `node scripts/check/check-codeql-ratchet.mjs --update` zapíše nový nameraný počet do `quality-baseline.json` → `metrics.codeqlAlerts.value`, takže račňa v tichosti nepovolí regresiu späť na starý strop. Spracovaný príklad (2026-09-02/03): PR #12502 opravených 7 skutočných upozornení (13 → 6 nameraných otvorených); PR #12530 sprísnil zamrznutú základnú líniu 11 → 6, aby zodpovedal; zvyšných 6 bolo potom zamietnutých s odôvodnením pre každé upozornenie až na 0 otvorených.

**Výpovede sú výzvou operátora (tvrdé pravidlo #14)** — nikdy nezruší výstrahu CodeQL bez zaznamenania technického zdôvodnenia v komentári k odmietnutiu: `won't fix` pre požiadavku upstream protokolu, `used in tests` pre testovacie zariadenie, `false positive` pre dezinfekčný prostriedok CodeQL nevidí (precedens: `docs/security/ERROR_SANITIZATION.md`).

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

## Vygenerované súbory a odvodené základné línie (napísané pri vydaní)

Plán 2026-11-13 („odvodené čísla a texty vyriešené až pri vydaní“): funkcia PR mení** zdroj** — `src/shared/constants/providers.ts`, `docs/openapi.yaml`, katalóg zručností, katalóg voľnej úrovne, nová špecifikácia e2e. Negeneruje súbory vypočítané z tohto zdroja a nezahŕňa namerané zlepšenie do základnej línie. Tieto súbory sa prepíšu raz, obnovením vydania (`release:refresh-derived`) alebo nočným obnovením PR. Predtým každý súrodenec PR niesol svoju vlastnú regenerovanú kópiu a bol v konflikte s ďalším zlúčením (2026-11-13: 30 z 321 otvorených PRs prepísalo `PROVIDER_REFERENCE.md`, 26–28 prepísalo diagramy README ).

**Strážca.** `check:pr-derived-paths` (job `pr-test-policy`) zlyhá pri funkcii PR, ktorá sa dotýka súboru rodiny v `config/quality/derived-paths/`:

| Rodina      | Súbory                                                                                                                                                                                | Prepísal                                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`; dvanásť generovaných README SVGs; `skills/*/references/**`; súbory `SKILL.md`, ktoré nemajú vlastný blok | `release:refresh-derived` (fakty), `gen:provider-reference`, `docs:readme-diagrams`, `generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                                     | `balance-e2e-shards.mjs --sync` (`syncE2eTimings()`)                                                                     |

Spisovatelia (`release/v*`, `chore/derived-*` a `chore/bank-ratchet-*` pre základné línie) sú vyňatí; taký je PR, ktorý mení iba jednu rodinu plus jej spoločníkov (pre `generated`: skripty generátora, ich testy, vstupy schopností agenta — `src/shared/constants/agentSkills.ts`, ručne písané dokumenty `skills/**`, `docs/openapi.yaml` — a `changelog.d/**`), napr. zmena rozloženia hrdinu s jeho regenerovaným SVG alebo oprava zručností, ktorej test číta regenerované súbory `SKILL.md`. `SKILL.md` s ručne napísaným blokom `<!-- skill:custom-start -->` nie je v rodine: jeho vlastný blok zostáva upraviteľný vedľa prvku.

**Kontroly podľa režimu brány** (`scripts/check/lib/gateMode.mjs`; pomocník `scripts/check/lib/derivedArtifactScope.mjs`):

| Skontrolujte                                                                       | `release` (posunúť, naplánovať, uvoľniť PR, lokálne)                         | `pr` (funkcia PR, dávka vo fronte)                                                                                                                                                                |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:agent-skills-sync`                                                          | každá zručnosť sa musí rovnať výkonu generátora                              | iba zručnosti, ktorých vygenerovaný text (mimo vlastného bloku) alebo `references/` PR upravuje; inak `SKIP reason=pr-mode`                                                                       |
| `check:generated-artifacts` (časovanie README SVGs + e2e; vyžaduje úplnú históriu) | každá SVG sa rovná svojmu generátoru; každá špecifikácia má záznam časovania | iba artefakty, ktoré PR upravuje; zvyšok `SKIP reason=pr-mode`; základ bez rozdielu → každý artefakt posúdený (zlyhanie uzavreté)                                                                 |
| README SVG testy porovnávania bajtov (`tests/unit/docs/readme-*-svg.test.ts`)      | každý SVG                                                                    | len SVG upraví PR, keď sa základ vyrieši; Plytká pokladňa `test-unit` PR nemá základňu, takže tam test preskočí so `SKIP reason=base-unresolved` a `check:generated-artifacts` vlastní porovnanie |
| úplnosť časovania e2e (`tests/unit/balance-e2e-shards.test.ts`)                    | každá špecifikácia má záznam                                                 | rovnaké pravidlo ako pri testoch SVG (nová špecifikácia beží so strednou hmotnosťou)                                                                                                              |
| `check-quality-ratchet.mjs --require-tighten`                                      | nebankové zlepšenie zlyhá (pokiaľ `_policy`)                                 | zaznamenané zlepšenie, nikdy zlyhanie; regresia stále zlyháva                                                                                                                                     |

Režim uvoľnenia uchováva verdikty, výstupné kódy a správy, ktoré tieto kontroly mali pred rozdelením; pridá sa najviac jeden riadok s názvom vyriešeného režimu (`[agent-skills-sync] mode=release (auto: local run)`). Testy preskočia cez voľbu `{ skip: releaseOnlyUnlessTouched(...) }` node:test, ktorú `check:test-masking` vypíše v bloku iba pre zostavu (nie je to ani `.skip(` ani `{ skip: true }`, takže sa to nepočíta ako tvrdé preskočenie). `check:generated-artifacts` beží tam, kde je základňa riešiteľná: úloha `lint` (`fetch-depth: 0`), hneď po `check:agent-skills-sync`. Lokálne `npm run check:generated-artifacts -- --mode=pr` ukazuje, čo tento krok hodnotí na PR. Krížová kontrola medzi poskytovateľom a celkom `check:docs-counts` („Referenčný celkový počet poskytovateľov (doc vs živé moduly)“) je súčasťou brány počtov a sleduje vlastné režimy tejto brány.

Zámerne nie v rodine: súbory zásad, o ktorých rozhodujú ľudia (`gate-manifest.json`, zoznamy povolených, `admission-policy.json`, `provider-assets-provenance.jsonl`, `model-lifecycle.json`) a obmedzujú funkciu, ktorú môže PR musieť upraviť spolu s kódom ( metrické položky `quality-baseline.json`, základné línie typecheck/file-size/complexity, `eslint-suppressions.json` — orezané spustením ESLint vopred, keď zamrznuté porušenie PR opraví). `src/i18n/routeNamespaces.generated.json` sa tiež vygeneruje, ale zostane vo funkcii PRs: aplikácia ho importuje v čase spustenia, takže nemôže čakať na obnovenie.

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

## Pravidlá zoznamu povolených

Každá brána, ktorá nemôže zlyhať pri už existujúcich porušeniach, používa zmrazený zoznam povolených (napr. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Zásadou je:

**Opravte hlavnú príčinu; použite zoznam povolených iba vtedy, keď porušenie už existuje a nemožno ho opraviť v rovnakom PR.**

Pri pridávaní záznamu do zoznamu povolených:

1. Pridajte komentár s odôvodnením.
2. Uveďte problém sledovania (napr. `// #3498 — Phase 2 feature, not yet implemented`).
3. Odstráňte záznam v tom istom PR, ktorý opravuje porušenie — zastaraný záznam, ktorý už nepotláča aktívne porušenie, je sám osebe chybou (vynútenie zastaraných 6A.3 zlyhá po implementácii brány na osirelom zozname povolených položiek).

Do** nie** pridajte položky zoznamu povolených, aby testy prešli rýchlejšie. Zelená brána s rastúcim povoleným zoznamom je falošný pocit kvality.

### Keď na vašom PR zlyhá brána

1. **Pozorne si prečítajte výstup brány** — vám presne povie, ktorý súbor alebo symbol porušil pravidlo.
2. **Opravte porušenie** — väčšina brán sú deterministické kontroly súborového systému, ktoré prejdú hneď, ako je kód správny.
3. **Ak porušenie už existuje** (tj, nezaviedli ste to, ale brána to teraz pokrýva): pridajte položku zoznamu povolených s komentárom odôvodnenia a problémom so sledovaním.
4. **Ak je brána račňa** (pokrytie, upozornenia ESLint, duplikácia, zložitosť): vaša zmena zhoršila metriku. Opravte základný problém alebo (zriedkavo) spustite `npm run quality:ratchet -- --update` ak je zmena zámerná a zníženie metriky je prijateľné — ale v popise PR zdokumentujte dôvod.
5. **Poradné brány** (`continue-on-error: true`) sú informačné —, neblokujú zlúčenie, ale zobrazujú sa v súhrne CI. Aj tak ich opravte.

---

## Pridanie novej brány

1. Vytvorte `scripts/check/check-<name>.mjs` (alebo `.ts`). Brány zásad sa ukončujú s kódom 0/1.
   Brány západkového typu zapisujú metriku do `quality-metrics.json` prostredníctvom `collect-metrics.mjs`.
2. Pridajte `"check:<name>": "node scripts/check/check-<name>.mjs"` do `package.json`.
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

## Nevybavená racionalizácia (ROI review — Fase 9 Onda 3)

Tento inventár bol odsúhlasený so `ci.yml` dňa 2026-06-17 (predchádzajúca verzia vynechala `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence`). Prehľad ROI zosúladeného súboru identifikoval nasledujúcich kandidátov na racionalizáciu.** Zlúčenia sú mechanické zmeny CI ; flips/drops sú politické rozhodnutia vyhradené pre prevádzkovateľa.** Zatiaľ nie je aplikované nič nižšie.

**Tiež nezdokumentované vyššie** (poradný, nízky signál): úloha `docs-lint` (markdownlint + Vale, celá úloha `continue-on-error`) a pracovné postupy samostatného skenera `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` je v `quality-baseline.json`, ale nie je pripojený k blokovacej račni v `ci.yml` — metrika je momentálne osamotená.

### Zlúčenie / odstránenie (mechanické, nižšie riziko)

Každý kandidát bol potvrdený oproti aktuálnemu stavu brány 2026-06-17 (dôveruj-ale-overuj); Ukázalo sa, že niekoľko „zrejmých“ zlúčení skrylo dlh a je** nie** čisté drop-iny.

- **`check:docs-sync` beží dvakrát** — samostatne v úlohe `lint` a opäť vo vnútri `check:docs-all` (`docs-sync-strict`) a husky pre-commit hook. ✅**DONE** Samostatné vyvolanie — `lint` odstránené.
- **skenovanie CVE** — ❌**NOT čisté zlúčenie.** `audit:deps` blokuje kritické upozornenia a neúplné audity vo všetkých piatich uzamykacích súboroch, pričom podľa aktuálnej politiky hlási vysoké upozornenia ako varovania; `check:vuln-ratchet` (osv) zlyhá iba na _regresii_ v porovnaní so zapísanou základnou líniou a v prípade potreby zamietne chýbajúce merania. Odlišná sémantika — vypustením `audit:deps` by stratila absolútne kritickú bránu a potvrdenia o audite nezávislého balíka. Nechajte si oboje.
- **Detekcia cyklu** — ✅**DONE** (#15159 G-01/G-02). Starý text tu nazval `check:cycles` „zelená, kurátorská“ brána a oprávňoval ho ponechať blokovaný, pretože `check:circular-deps` (dpdm) hlásil 91 cyklov. Tá zelená bola a** falošná zelená** : `check:cycles` naskenoval 5 podadresárov (450 súborov), porovnal iba statické `import|export … from` a zrušil každý špecifikátor `@/` a `@omniroute/open-sse/`, takže nevidel cykly aliasov dynamického importu +, ktoré dominovali v repo. Opravené: brána teraz prechádza `src` + `open-sse` (5023 súborov), zbiera špecifikátory zo TypeScript AST (takže `import("…")` sa počíta a `typeof import("…")` typ-pozícia nie) a rieši tsconfig `paths`. Nájde sa** 14** cyklov, nie 0. Pretože v bráne PR nemožno opraviť 14 už existujúcich cyklov, `check:cycles` je teraz** račňa** (`--ratchet`, strop `metrics.cycles.value = 14` v `quality-baseline.json`, `direction: down`) — blokuje akúkoľvek _regresiu_ a počet môže iba klesať. CI spustí `npm run check:cycles:ratchet`. Vyhorené jazdy s**A-01** . `check:circular-deps` (dpdm) zostáva poradný ako širší druhý názor.
- **Zložitosť** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): jedna prechádzka ESLint, počíta sa po ruleId, takže cyklomatické + maximálne línie a kognitívne základné línie zostávajú nezávislé; jednotlivé `check:complexity` / `check:cognitive-complexity` zostávajú pre miestne `--update`.
- **`/api` proti halucináciám** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): jeden FS inventár `src/app/api`, openapi-trasy + docs-symboly sa stále hlásia nezávisle; jednotlivci zostávajú pre miestne behy.
- **`check:node-runtime` má 11 pracovných miest** — ⚠️** nízke ROI.** Každý je samostatný bežec a kontrola je < 1s; celková úspora ~ 10s, proti strate lacného strážcu na pracovné miesto. Nestojí to za to.
- **`typecheck:noimplicit:core` on CI lint** — ✅ **removed from lint job** (was advisory `continue-on-error`); blocking type surface is `typecheck:core` + `check:type-coverage`. Local script retained.

### Otočiť / rozhodnúť (zásady prevádzkovateľa)

- `check:openapi-security-tiers` (poradný) — ❌**NOT čisto preklopiteľné.** Ukončí sa 0, ale varuje, že niekoľko trás `traffic-inspector` pod `LOCAL_ONLY_API_PREFIXES` nemá anotáciu `x-loopback-only: true`. Na jeho vynútenie je potrebné najskôr pridať tieto anotácie do `openapi.yaml`.
- `typecheck:noimplicit:core` (poradné) — z veľkej časti zahrnuté do blokovacej `check:type-coverage` račne. Otočte na rohatku alebo zahoďte nadbytočný druhý prechod `tsc`.
- `test:vitest:ui` (teraz** blokovanie** ) už existujúce zlyhania — sú explicitne vylúčené v `vitest.config.ts` s komentármi sledovania `// #8618` ; nové zlyhania zlyhajú.
- `check:secrets` (gitleaks, blokovanie račne zmrazené na 3 zdokumentované falošne pozitívne výsledky) — zoznam povolených 3 na dosiahnutie 0 alebo zníženie na poradný. Prekrýva GitHub natívne tajné skenovanie + `check:public-creds`.
- `check:pr-evidence` (blokovanie, greps PR-body próza) — vysoké falošne pozitívne riziko; oslabuje presadzovanie Hard Rule #18 ak sa zruší, takže toto je skutočná výzva na politiku.
- `semgrep` (samostatný poradca) — sa prekrýva CodeQL pre rodiny OWASP ; pripevnite jeho základnú čiaru k račni alebo k padaniu.

---

## Súvisiaca dokumentácia

- Dodávateľský reťazec (proveniencia, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — kľúč-set paritná brána

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, práca `i18n-ui-coverage`). Porovná sadu kľúčov listu každého `src/i18n/messages/<locale>.json` so `en.json` a zlyhá na akomkoľvek chýbajúcom alebo extra liste bez ohľadu na to, kedy bol kľúč pridaný. Zástupné symboly `__MISSING__:` sa počítajú ako prítomné (ich obsah je záležitosťou pomerovej brány). Je absolútnym doplnkom dvoch brán diff-based/percentage : `check-ui-keys-coverage` presadzuje 80 % minimálnu hranicu na lokalitu (43 chýbajúcich klávesov z ~ 000 stále číta 99,7 %) a `check-new-key-coverage` posudzuje iba klávesy, ktoré PR pridáva k `en.json`. Dávka miestneho nastavenia sa vygeneruje zo `en.json` dňa, keď bola vetva prerušená, a prekladá sa niekoľko dní, kým základňa neustále pridáva kľúče; dávka PR sama nepridáva žiadny kľúč, takže obaja súrodenci zostali ticho, keď dávka 1 (#13044) pristála o 43 kľúčov v deviatich lokalitách a dávka 2 (#13660) o 10 kľúčov v ôsmich (2026-09-15). Opravte červenú pomocou `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; list `extra` znamená, že zdroj ho zahodil — `sync-ui-keys` ho zahodil (`--prune-extra`, predvolené nastavenie). `--warn` správy bez zlyhania. `--catalog=cli` spustí rovnaké porovnanie cez `bin/cli/locales` (`npm run i18n:check-keys:cli`); oba kroky žijú v práci `i18n-ui-coverage`. Absolútna kontrola je len v režime vydania: funkcia PR vidí `SKIP reason=pr-mode` a oprava sa spustí v obnove vydania alebo vlne prekladu, nikdy nie vo funkcii PR; PR, ktorý mení katalógy miestnych nastavení, má každý z nich namiesto toho posúdený podľa zlučovacej bázy (pozri "Dva režimy" pod úlohou `i18n-ui-coverage`).

#### `check-new-key-coverage` — brána i18n s novým kľúčom

Súrodenec `check-ui-value-drift`. Ten zachytáva anglickú hodnotu, ktorá bola** prepísané** zatiaľ čo jeho preklady zostali pozadu; tento zachytáva anglický kľúč, ktorý bol** pridané** zatiaľ čo niektoré lokality ho nikdy nedostali.

`check-ui-keys-coverage` nevidí túto triedu: vynucuje si percentuálnu minimálnu hranicu na miestne nastavenie a jedenásť chýbajúcich kľúčov z 13 000 ~ ponecháva pokrytie na 99,9 %. Percentuálny podiel na jazyk nemôže vyjadriť „táto funkcia bola odoslaná nepreložená“ — celá funkcia môže pristáť v novom prostredí bez textu a číslo sa nikdy nepohne.

Incident, ktorý zakóduje: 3. fáza orchestračného plátna preložila svojich jedenásť kláves cez 42 miest, ktoré v tom čase existovali. O niekoľko hodín neskôr dávka v jazyku EÚ (#13044) prevzala repo do 51 miest a deväť nových používateľov (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ich nikdy nedostalo. `deepMergeFallback` nahrádza angličtinu za chýbajúci kľúč, takže režim zlyhania bol nepreložený UI skôr ako prázdny UI — skutočný a tichý svojou konštrukciou.

Rovnako ako jeho súrodenec** vedomý rozdielov** , porovnávajúc angličtinu na zlučovacej základni s pracovným stromom, takže existujúce medzery zostanú zmrazené a brána nepotrebovala žiadnu migráciu na zapnutie.

**Značka `__MISSING__:<english>` to nespĺňa (od 2026-09-17).** Kedysi to bolo zdokumentované odloženie — runtime sa vráti späť do správneho anglického —, kým osem funkcií PRs dňa 2026-09-16 nepridalo 61 kľúčov a označilo značku do všetkých 65 miest namiesto prekladu: táto brána akceptovala každé z nich, nič neblokovalo PRs a blokovacia brána reálneho prekladu potom zlyhala na 2pt.5 %BR tip pre všetkých > + 0,5). Značka sa teraz posudzuje ako chýbajúci preklad. Režim uvoľnenia len od 13. 11. 2026: funkcia PR vidí `SKIP reason=pr-mode` a pri uvoľnení PR (`BASE_REF=origin/main`) brána posúdi každú klávesu, ktorú cyklus pridal. Opravte červenú v obnove vydania alebo vlne prekladu pomocou `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` alebo všetkých miestnych nastavení paralelne so `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`, oddelené-bezpečné, odmieta spustiť bez `OMNIROUTE_TRANSLATION_*` env). Kľúč, ktorý musí zostať anglický (pripnutý názov product/engine/flag ), patrí do `scripts/i18n/untranslatable-keys.json`, nikdy nie za značku. `vi` úplne zakáže značky (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — parkovacia skúšobná brána

Súbor v zozname `vitest.config.ts` `exclude` test, ktorý sa nespustí a komukoľvek, kto strom číta, vyzerá ako pokrytie. Za komentárom `// #8618 — pre-existing failure; remove this exclusion when fixed` sa nahromadilo 62 súborov. Vydanie #8618 bolo uzavreté 2026-08-11, zatiaľ čo zoznam, ktorý sledoval, sa rozrástol zo 45 záznamov na 62, pričom každý nový zdedil komentár poukazujúci na mŕtvy problém. Keď bol zoznam konečne zmeraný súbor po súbore (#13204),** 51 zo 62 prešlo proti aktuálnemu stromu bez zmeny zdroja** .

Brána vyžaduje každé vylúčenie, ktoré sa premietne do skutočného súboru, aby (a) pomenovalo problém so sledovaním a (b) sa objavilo v `config/quality/vitest-exclusions.json` s jeho nameraným stavom, takže pridanie jedného je skontrolovateľným rozdielom vo vyhradenom súbore a nie o jeden ďalší riadok v poli so 60 položkami. Zámerne znovu nespúšťa vylúčené testy — ktoré stoja ~ 10 minút a patria k pravidelnej úlohe; inventarizačné záznamy, kedy bola každá z nich naposledy meraná.
