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

Pracovné postupy CI a Quality Gates vydávajú stabilný verdikt: `Gate / CI` a `Gate / Quality`. Ich verzovaná politika prijímania vymenúva každú upstream prácu podľa požiadaviek alebo odporúčaní. Príslušná požadovaná úloha musí byť úspešná: chýbajúce, zrušené, preskočené, čakajúce a neznáme výsledky nemôžu určiť PASS. Platná klasifikácia len pre dokumenty alebo iba pre katalóg môže spôsobiť, že kódový pruh nebude použiteľný; návrh PR nie je akceptovaným kandidátom. Označenie `hotfix` nezbavuje dôkazov.

Oba pracovné postupy pokrývajú PRs do main/release vetiev, presuny do `main`, manuálne odosielanie a udalosti zlučovacej skupiny. Push, dispatch a merge-group spustia úplný výber. Stlačenie `release/**` ich nespustí (2026-10-18): každá zmena už spustila maticu na svojom PR a zlúčená kombinácia je úlohou Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks a merge groups používajú hostovaných bežcov pre úlohy, ktoré inak vyberajú samostatne hostených bežcov; Pred zavedením je potrebné overiť dostatočnú hosťovanú kapacitu.

Bežný PR spúšťa rýchly výber. Dráhy `full-code` a `full-code-e2e` politiky prijatia (E2E, integrácia, artefakt balíka, Electron smoke, Bun SQLite, klienti ekosystému a protokolu) bežia len na koncepte frontu Mergify alebo na úplnom spustení: `gh workflow run ci.yml --ref <branch>`.

Každý doklad JSON identifikuje odhlásený SHA, spustenie pracovného postupu a pokus. CLI odmietne nesúlad checkout/event SHA. Testy pracovného toku spájajú členstvo v politike so zoznamom `needs` úlohy verdiktu, takže nový alebo odstránený pruh nemôže ticho zmiznúť. Potvrdenia pokrývajú ich vlastný pracovný postup, nie publikáciu, nasadenie alebo interné prvky existujúceho poradenského skenera. Aktivácia oboch kontrolných názvov v pravidlách pobočky je samostatnou administratívnou zmenou; pridanie týchto pracovných miest samo o sebe nechráni pobočku.

### Zlúčiť front

Označenie `queue` odošle PR do frontu Mergify (`.mergify.yml`). Mergify otvorí koncept PR na vetve `mergify/merge-queue/`, CI tam spustí úplný výber a pôvodný PR sa zlúči, keď prejdú `Gate / CI`, `Gate / Quality` a `Merge integrity (changelog + generated skills)`.

Mergify zapíše svoj súhrn frontu do popisu konceptu a ďalšie aplikácie ho môžu tiež upraviť. Udalosť `pull_request` `edited` na takomto návrhu má svoju vlastnú skupinu súbežnosti (`-queue-edit-<run_id>`), takže nemôže zrušiť skutočný priebeh návrhu a preskočí bránu a maticu. Stále beží iba `Merge integrity`. Úloha preskočenej brány nesie iný názov kontroly, pretože Mergify prečíta vynechané `Gate / CI` ako neúspešnú kontrolu a zruší front PR.

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

Reexporty sudov a dynamické importy sú len diagnostikou rozlíšenia; nikdy nevytvoria blokujúci nález. Skontrolované výnimky sú zverejnené v `config/quality/forgotten-sibling-allowlist.json`. Každý záznam musí pomenovať test spotrebiteľa a kandidáta, uviesť konkrétne zdôvodnenie a prepojiť problém GitHub alebo požiadavku na stiahnutie. Chybné záznamy sa nepodarilo zatvoriť. Výnimky nemôžu potlačiť vymazaný kandidátsky test alebo rozdiel, ktorý pridáva `.skip`/`.todo`; oslabenie tvrdenia a iné maskovanie zostávajú vo vlastníctve nezávisle blokujúcej brány `check:test-masking`.

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
| `check:known-symbols`             | Vykonávatelia poskytovateľov, stratégie smerovania a prekladatelia registrovaní v ich odosielacích tabuľkách zodpovedajú súborom na disku — žiadne osirelé alebo nedeklarované symboly                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | áno                                     |
| `check:route-guard-membership`    | Každá cesta, ktorá vytvára podriadený proces, je klasifikovaná podľa `isLocalOnlyPath()` (tvrdé pravidlá #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | áno                                     |
| `check:test-discovery`            | Každý súbor `*.test.ts` / `*.spec.ts` v repo zhromažďuje aspoň jeden testovací bežec (ratchet: zoznam osirelých zvierat v `test-discovery-baseline.json` sa môže iba zmenšiť)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | áno                                     |
| `check:test-tla-order`            | Žiadny súbor `node:test` pod `tests/unit` nezaregistruje test, zasiahne `await` najvyššej úrovne a potom zaregistruje ďalšie (#18045; ratchet: `test-tla-order-allowlist.json` sa môže iba zmenšiť)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | áno                                     |
| `check:agent-skills-sync`         | Vygenerované artefakty schopností agentov zodpovedajú ich zdrojovému katalógu (bez posunu)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
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
| ↳ `check:docs-sync`            | konzistencia verzie CHANGELOG / OpenAPI / llm.txt                                                                                                                 | áno                       |
| ↳ `check:docs-counts`          | Počty v próze (počet poskytovateľov, počet migrácií atď.) sú v rámci skutočného počtu                                                                             | áno                       |
| ↳ `check:env-doc-sync`         | Každý env var v `.env.example` je zdokumentovaný v tabuľke dokumentov a naopak                                                                                    | áno                       |
| ↳ `check:deprecated-versions`  | V dokumentoch nie sú žiadne reťazce zastaraných verzií                                                                                                            | áno                       |
| ↳ `check:doc-links`            | Interné odkazy na zníženie v dokumentoch sa rozlíšia na skutočné súbory (forma `[text]`/`(path)` )                                                                | áno                       |
| ↳ `check:fabricated-docs`      | V kódovej základni existujú trasy, env vars, príkazy CLI, názvy hákov a cesty k súborom citované v dokumentoch. Tvrdá brána cez `--strict`; soft-fail bez vlajky. | Áno (cez `--strict` v CI) |
| `check:cli-i18n`               | Príkazové reťazce CLI sú prítomné vo všetkých súboroch miestnych nastavení i18n                                                                                   | áno                       |
| `check:openapi-coverage`       | OpenAPI spec pokrýva aspoň ratchetovú podlahu skutočných trás                                                                                                     | áno                       |
| `check:openapi-security-tiers` | Anotácie bezpečnostnej úrovne v `openapi.yaml` sú konzistentné s klasifikáciami `routeGuard.ts`                                                                   | **Poradný**               |
| `check:openapi-routes`         | Každá cesta v `openapi.yaml` sa mení na skutočný `route.ts` (antihalucinácia)                                                                                     | áno                       |
| `check:docs-symbols`           | Každý odkaz `/api/...` v `docs/**/*.md` sa mení na skutočný `route.ts` (antihalucinácia)                                                                          | áno                       |
| `i18n translation drift`       | Nepreložené kľúče v súboroch miestnych nastavení i18n — iba varujú                                                                                                | **Poradný**               |

Vygeneruje sa dvanásť README SVGs pod `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` ich všetky regeneruje). Každý z nich má test jednotky porovnávania bajtov (`tests/unit/docs/readme-*-svg.test.ts`, úloha `test-unit`), ktorý zlyhá, keď je potvrdený súbor neaktuálny, a `check:docs-counts` číta kanonické čísla z ich uzlov `<text>` — čo je dôvod, prečo krok obrysu zachováva každý načrtnutý reťazec v súbore ako neviditeľný `<text>`. Kontrola kanonických čísel SVG číta súbory uvedené v `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` a `tier-flow-light.svg`; tvrdenia o voľnom pohybe navždy, o vstupe do katalógu, o opakovanom fonde a o faktoroch bodovania tiež čítajú `promise-pillars.svg`, `free-tier-budget.svg` a `strategies-grid.svg`. `free-tier-budget.svg` čerpá svoje čísla zo zavádzača živého katalógu, takže zmena na `FREE_MODEL_BUDGETS` alebo na zobrazovaný názov poskytovateľa sčervená CI kým sa súbor nevygeneruje.

### Práca: `i18n-ui-coverage`

| Skript                              | Potvrdzuje                                                                                                                                                                                                        | Blokovanie  |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (v riadku) | Pokrytie kľúčom UI i18n je 65 % ≥                                                                                                                                                                                 | áno         |
| `check-ui-value-drift` (v riadku)   | Prepísaná angličtina** hodnotu** nezanechá za sebou žiadny zatuchnutý preklad                                                                                                                                     | áno         |
| `check-new-key-coverage` (v riadku) | A** nové** Anglický kľúč je preložený v každom jazyku — a značka `__MISSING__:` je odmietnutá                                                                                                                     | áno         |
| `check-translation-ratio`           | Skutočný pomer prekladu na miestne nastavenie (identický s angličtinou / zástupný symbol / chýbajúce listy mimo zoznamu povolených) nesmie presiahnuť `config/quality/i18n-translation-baseline.json` + uvoľnenie | **Poradný** |

Potrebuje `fetch-depth: 0` — brána posunu hodnoty sa líši `en.json` oproti zlučovacej základni.

#### `check-ui-value-drift` — stale-translation gate

Zachytáva jednu regresiu i18n, ktorú ostatné brány štrukturálne nevidia: anglická hodnota je prepísaná a preklady odvodené z _predchádzajúcej_ angličtiny zostávajú pozadu, takže používatelia, ktorí nie sú v angličtine, pokračujú v čítaní sebavedome formulovanej, teraz nesprávnej kópie.

Toto bolo skutočne odoslané. `oauthModal.googleOAuthWarning` sa prepísalo, keď pristál pomocník pri prihlásení Antigravity (#5203);** 39 zo 43 miest** stále text oznamujúci operátorom, aby „skopírovali celé URL a prilepili ho nižšie“ — tok, ktorý pre daného poskytovateľa nemožno dokončiť. Až do #8463 to zostalo nepovšimnuté, pretože:

- `sync-ui-keys` vyplní iba kľúče, ktoré sú** neprítomný** , nikdy také, ktoré sú** zatuchnutý** ;
- `check-ui-keys-coverage` počíta kľúčovú _prítomnosť_, takže zastaraný preklad sa považuje za pokrytý;
- `check-translation-drift` sleduje dokumentáciu `docs/i18n/<locale>/**.md` zrkadlí — nikdy nečíta `src/i18n/messages/*.json`. Blokovanie úlohy `docs-sync-strict` od opätovnej synchronizácie 2026-09: upravte hlavný dokument → `npm run i18n:run -- --files=<doc>` (úroveň sekcie, lacné).

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

Ukončí 0 s `SKIP reason=base-unresolved` keď sa nedá prečítať základný katalóg (plytký klon bez základného ref), zrkadlenie `check-openapi-breaking`.

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
- **poradné** — globálny súčet voči zmrazenému základu. Zdedený odklon nikdy nespôsobí zlyhanie
  nevinného PR; odklon sa pri zosúladení vydania znovu zmrazí a monitoruje ho úloha na sledovanie rezervy.

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

Príznak `--update` zapisuje aktuálne namerané hodnoty do `quality-baseline.json`. Potvrdiť tento súbor spolu so zmenou, ktorá zlepšila metriku. PR, ktorý zlepšuje metriku bez aktualizácie základnej línie, bude zachytený `--require-tighten` (fáza 6A.5, čaká sa na implementáciu).

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

Do** nie** pridajte položky zoznamu povolených, aby testy prešli rýchlejšie. Zelená brána s rastúcim zoznamom povolených je falošným pocitom kvality.

### Keď zlyhá brána na vašom PR

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

- **`check:docs-sync` beží dvakrát** — samostatne v úlohe `lint` a opäť vo vnútri `check:docs-all` (`docs-sync-strict`) a husky pre-commit hook. ✅**DONE** — samostatné vyvolanie `lint` odstránené.
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
