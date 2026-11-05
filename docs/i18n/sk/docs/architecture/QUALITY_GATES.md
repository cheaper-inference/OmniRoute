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

### Prijatie kandidáta

Workflows CI a Quality Gates vydávajú každý stabilný verdikt: `Gate / CI` a
`Gate / Quality`. Ich verzovaná politika prijímania uvádza každú nadradenú úlohu
ako povinnú alebo poradnú. Uplatniteľná povinná úloha musí byť úspešná: chýbajúce,
zrušené, preskočené, čakajúce a neznáme výsledky nemôžu ustanoviť PASS. Platná
klasifikácia iba pre dokumentáciu alebo iba pre katalóg môže spôsobiť, že kódová
vetva nebude uplatniteľná; draft PR nie je prijatým kandidátom. Označenie
`hotfix` neoslobodzuje od predloženia dôkazov.

Oba workflows pokrývajú PR do vetiev main/release, push do `main`, manuálne spustenie
a udalosti merge-group. Push, dispatch a merge-group spúšťajú úplný výber. Push do
`release/**` ich nespúšťa (2026-10-18): každá zmena už spustila maticu vo svojom PR
a zlúčená kombinácia je úlohou Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane).
Forky a merge groups používajú hostované runnery pre úlohy, ktoré by inak vyberali
self-hosted runnery; pred nasadením sa musí overiť dostatočná kapacita hostovaných
runnerov.

Každý JSON doklad identifikuje SHA odcheckoutovaného stavu, beh workflow a pokus.
CLI odmietne nesúlad SHA checkoutu a udalosti. Testy workflow viažu členstvo v politike
na zoznam `needs` úlohy s verdiktom, takže nová alebo odstránená vetva nemôže
potichu zmiznúť. Doklady pokrývajú vlastný workflow, nie publikovanie, nasadenie ani
interné fungovanie existujúceho poradného skenera. Aktivácia oboch názvov kontrol
v pravidlách vetvy je samostatná administratívna zmena; pridanie týchto úloh samo
o sebe vetvu nechráni.

### Inventár statického skenovania

Verzovaný inventár npm aliasov a členstvo v statickom skenovaní sa nachádzajú v
`config/quality/gate-manifest.json`. Spustite `npm run check:gate-manifest`, aby ste
overili názvy skriptov a presné príkazy voči `package.json`; pridania, odstránenia
a odchýlky v príkazoch zlyhajú v lokálnom hooku aj v úlohách klasifikácie zmien v CI.
Alias nie je workflow úloha, inštancia matice ani testovací prípad: tieto počty
sa nesmú prezentovať ako vzájomne zameniteľné.

Použite `npm run quality:scan -- --list` alebo `npm run quality:scan:fast -- --list`
na kontrolu vybraných aliasov bez ich vykonania. Runner vyvoláva npm entrypoint,
takže jeho runtime (vrátane Bun, ak je nakonfigurovaný) zostáva zachovaný.
Manifest zaznamenáva aliasy mimo týchto profilov ako samostatne vyvolávané
a údržbové príkazy sú v profiloch skenovania iba na čítanie zakázané.

Tieto profily pokrývajú iba statické skenovanie. Nepotvrdzujú produktové testy,
pokrytie, balenie, externé kontroly ani úplné prijatie kandidáta na vydanie.
Prijatie workflow používa prepojené `config/quality/admission-policy.json` a
`scripts/quality/admission-verdict.mjs`. Profily Release-observer zostávajú
oddelené; ich uplatniteľné kontroly a doklady preskúmajte nezávisle. Inventár
v texte nižšie je referenciou, nie dôkazom, že sa konkrétna brána skutočne
spustila.

Skripty sa nachádzajú v `scripts/check/` (brány politiky) a `scripts/quality/`
(engineritmus ratchetu). Zdrojom pravdy pre CI je `.github/workflows/ci.yml`.

### Rýchla cesta pre Release PR (`quality.yml`)

`.github/workflows/quality.yml` dopĺňa CI pre PR do vetiev main/release, push do `main`,
dispatch a merge groups. PR používajú rýchle kontroly filtrované podľa ciest.
Trvalo zakázané duplikátne zostavenie bolo odstránené; skutočné kontroly zostavenia,
balenia a spustenia zostávajú v CI.

| Úloha                                            | Rozsah                                                                                                                                                                                                           | Blokovanie          |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `Docs Gates (fast-path)`                         | PR dokumentácie/kódu; odkazy na API dokumentáciu a všetka dokumentácia                                                                                                                                           | Áno                 |
| `Fast Quality Gates`                             | PR kódu; statické kontroly, kontrola typov, kontrola typov dashboardu, ovplyvnené unit testy                                                                                                                     | Áno                 |
| `Forgotten sibling tests`                        | PR kódu; zmenené moduly vysledované k statickým konzumentom a kandidátskym spriazneným testom; barrel a cesty dynamických importov sa hlásia ako poradné diagnostiky s uvedenými výnimkami zo zoznamu povolených | **Poradné**         |
| `Vitest (fast-path)`                             | PR kódu; rýchla sada vitest                                                                                                                                                                                      | Áno                 |
| `Unit Tests fast-path`                           | PR kódu; unit sada rozdelená na 4 časti                                                                                                                                                                          | Áno                 |
| `No new ESLint warnings`                         | PR kódu; strážca lintu zohľadňujúci potlačenia                                                                                                                                                                   | Áno, vrátane forkov |
| `Merge integrity (changelog + generated skills)` | PR, ktoré nie sú draftmi; synchronizácia changelogu a generovaných zručností                                                                                                                                     | Áno, vrátane forkov |

#### Správa o zabudnutých spriaznených testoch

`npm run check:forgotten-sibling-tests` opätovne používa resolver importov, ktorý sa využíva v mape dopadu testov.
Pre každý zmenený produkčný modul hlási deterministické reťazce
`changed module/symbol -> static consumer -> candidate sibling test`, keď kandidátsky
test nie je súčasťou diffu pull requestu. Súhrn v Markdown a výsledok vo formáte JSON sa uchovávajú ako
artefakt workflowu `forgotten-sibling-tests` na kalibráciu pred akýmkoľvek zavedením blokovania.

Opätovné exporty z barrelov a dynamické importy slúžia iba ako diagnostika rozlíšenia; nikdy nevytvárajú
blokujúci nález. Preskúmané výnimky sú uložené v
`config/quality/forgotten-sibling-allowlist.json`. Každá položka musí uvádzať konzumenta a kandidátsky
test, obsahovať konkrétne odôvodnenie a odkazovať na issue alebo pull request na GitHube. Chybne
formátované položky spôsobia zlyhanie s uzavretým stavom. Výnimky nemôžu potlačiť odstránený kandidátsky test ani diff, ktorý pridáva `.skip`/`.todo`;
oslabenie tvrdení a ďalšie maskovanie naďalej spravuje nezávisle blokujúca
brána `check:test-masking`.

### Úloha: `lint`

Spúšťa sa pri každom PR do `main`. Pri zlyhaní blokuje zlúčenie.

| Script (`npm run ...`)            | Overuje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Blokovanie                                            |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `check:node-runtime`              | Verzia Node.js je v podporovanom rozsahu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Áno                                                   |
| `check:cycles`                    | Cyklické importy naprieč celým `src/` + `open-sse/` (na základe AST, s vyriešenými cestami tsconfig `paths`). Samostatné spustenie vždy skončí s kódom 1, keď existuje akýkoľvek cyklus (fail-closed od #15281), a vypíše SCC. `check:cycles:ratchet` (spúšťa ho CI) zablokuje vykonávanie, keď počet prekročí limit `metrics.cycles` v `quality-baseline.json` — aktuálne 14, `direction: down`, takže môže iba klesať (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Áno (ratchet)                                         |
| `check:boundary`                  | Väzba `open-sse → src`: jedinečné importy medzi súbormi z enginu do aplikácie (`scripts/quality/measure-boundary.mjs`; zoznam hrán predstavuje backlog nápravy rozdelenia v4 core/module). Samostatné spustenie = informatívna správa (rovnako ako `quality:boundary`). `check:boundary:ratchet` (spúšťa ho CI, takisto v slučke ratchet rýchlych kontrol v `quality.yml`) zablokuje vykonávanie, keď počet prekročí limit `metrics.boundaryOpenSseToSrc` v `quality-baseline.json` — nastavený na nameranú hodnotu 771, `direction: down`; `--update` ho môže iba znížiť; na PR je relatívny k základnej verzii (`--base-ref`, pozri nižšie)                                                                                                                                                                                                                                                                                                                                                                                                        | Áno (ratchet)                                         |
| `check:route-validation:t06`      | Schémy Zod sú prítomné na všetkých trasách (politika úrovne Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Áno                                                   |
| `check:any-budget:t11`            | Počet `@ts-expect-error // any` neprekračuje rozpočet (kategória Tier 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Áno                                                   |
| `check:provider-consistency`      | Každý poskytovateľ v `providers.ts` má zodpovedajúcu položku v `providerRegistry.ts` (a naopak, v rámci zoznamu povolených položiek)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Áno                                                   |
| `check:model-lifecycle`           | Tri manuálne spravované smerovacie tabuľky zostávajú konzistentné so schválenou snímkou životného cyklu (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nepriraďuje skóre žiadnemu vyradenému identifikátoru, na ktorý môže smerovať `REGISTRY`; každý cieľ v `BUILT_IN_ALIASES` je prítomný v `REGISTRY` a chýba v snímke vyradených identifikátorov; každý vyradený identifikátor, ktorý sa stále nachádza v `REGISTRY`, je presmerovaný alebo uvedený v `allowedRetiredInCatalog`; a žiadny zdroj ani cieľ v `DEFAULT_DEGRADATION_MAP` sa v tejto snímke nenachádza medzi vyradenými. Toto nedokazuje, že model je momentálne obsluhovaný aktívnym upstreamom. Funguje offline — porovnáva s `config/quality/model-lifecycle.json`, ktoré sa manuálne aktualizuje pomocou `npm run quality:refresh-model-lifecycle` (sieť; nie je zapojené do CI). `allowedRetiredInCatalog` je mechanizmus postupného znižovania: položku pridajte iba s pridruženou úlohou na sledovanie.                                                                          | Áno                                                   |
| `check:fetch-targets`             | Každé `fetch("/api/...")` na strane klienta v `src/` sa vyrieši na skutočný `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Áno                                                   |
| `check:deps`                      | Všetky závislosti, ktoré možno nainštalovať pomocou `npm install`, naprieč všetkými súbormi `package.json` v repozitári sa nachádzajú v `dependency-allowlist.json`; nové nepripnuté balíky alebo balíky s podobným názvom ako legitímne balíky sú označené                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Áno                                                   |
| `audit:deps`                      | `npm audit` (koreňový projekt + electron) — žiadne upozornenia s vysokou ani kritickou závažnosťou (prekrýva sa s osv `check:vuln-ratchet`; pozri Backlog racionalizácie)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Áno                                                   |
| `check:lockfile`                  | Integrita súboru `package-lock.json` — register HTTPS, haše integrity, žiadne prepísania hostiteľa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Áno                                                   |
| `check:licenses`                  | Zoznam povolených licencií SPDX pre produkčné závislosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Áno                                                   |
| `check:tracked-artifacts`         | Žiadne artefakty zostavenia / symbolické odkazy `node_modules` uložené v repozitári (spúšťa sa aj v husky pre-commit; pre-push je zámerne jednoduchý — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Áno                                                   |
| `check:ai-attribution`            | Žiadny trailer `Co-Authored-By` od AI/bota ani pätička o generovaní AI v commitoch PR, názve alebo tele — Prísne pravidlo #16 (v slučke fast-gates v `quality.yml` pre PR→`release/**` — číta payload udalosti, mimo PR nerobí nič — a ako krok určený iba pre PR v lintovaní `ci.yml` pre PR→`main`; tiež v husky hooku `commit-msg`; ľudskí spoluautori sú povolení; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:vitest-exclusions`         | Každá výnimka Vitest uvádza sledovaný issue a nachádza sa v `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Áno                                                   |
| `check:file-size`                 | Zdrojové súbory (`.ts`/`.tsx` v `src/`, `open-sse/`, `electron/`, `bin/`) zostávajú v rámci `cap` a testovacie súbory (`*.test.ts(x)`) v rámci `testCap`; súbory zmrazené v `file-size-baseline.json` (`frozen` / `testFrozen`) nesmú narásť nad svoju zaznamenanú veľkosť                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Áno                                                   |
| `check:error-helper`              | Chybové odpovede v exekútoroch/obslužných funkciách používajú `buildErrorBody()` / `sanitizeErrorMessage()` (Prísne pravidlo č. 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Áno                                                   |
| `check:migration-numbering`       | Migračné SQL súbory sú očíslované postupne, bez medzier alebo duplicít                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Áno                                                   |
| `check:public-creds`              | Mimo `publicCreds.ts` sa nenachádzajú žiadne literály OAuth `client_id`/`client_secret` ani webové kľúče Firebase (Prísne pravidlo č. 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Áno                                                   |
| `check:db-rules`                  | Mimo modulov `src/lib/db/` sa nenachádza žiadne nespracované SQL; z `localDb.ts` sa nepoužívajú importy z barrel súborov (Prísne pravidlá č. 2/5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Áno                                                   |
| `check:known-symbols`             | Exekútory poskytovateľov, stratégie smerovania a prekladače zaregistrované v tabuľkách dispečingu zodpovedajú súborom na disku — žiadne osamotené ani nedeclarované symboly                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Áno                                                   |
| `check:route-guard-membership`    | Každá trasa, ktorá spúšťa podradený proces, je klasifikovaná funkciou `isLocalOnlyPath()` (Prísne pravidlá č. 15/17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Áno                                                   |
| `check:test-discovery`            | Každý súbor `*.test.ts` / `*.spec.ts` v repozitári zhromažďuje aspoň jeden testovací runner (ratchet: zoznam osirelých súborov v `test-discovery-baseline.json` sa môže iba skracovať)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Áno                                                   |
| `check:test-tla-order`            | Žiadny súbor `node:test` v `tests/unit` nezaregistruje test, nevykoná `await` na najvyššej úrovni a potom nezaregistruje ďalšie testy (#18045; ratchet: `test-tla-order-allowlist.json` sa môže iba skracovať)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Áno                                                   |
| `check:agent-skills-sync`         | Vygenerované artefakty agent-skills zodpovedajú zdrojovému katalógu (bez odchýlok)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:provider-asset-provenance` | Logá/aktíva poskytovateľov obsahujú zaznamenaný záznam o pôvode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `lint:json`                       | Konfiguračné súbory JSON sa dajú analyzovať a spĺňajú pravidlá lintovania repozitára                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `typecheck:core`                  | Kompilácia TypeScriptu bez chýb (upozornenia sú iba informatívne)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Áno                                                   |
| `typecheck:noimplicit:core`       | Strictné `noImplicitAny` — výhľadovo orientované; mnohé existujúce miesta volaní stále potrebujú anotácie                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | **Informatívna kontrola** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` obmedzené na `src/app/(dashboard)/**` (#7033) — kurátorovaný zoznam povolených 27 súborov v `typecheck:core` neobsahuje žiadne dashboardové TSX a `next build` ich tiež nikdy nekontroluje typovo (`next.config.mjs` nastavuje `ignoreBuildErrors: true`), takže regresie osirelých identifikátorov v tejto oblasti (#6625/#6909) zostávali v CI neodhalené. Porovnáva zmeny so zmrazenou základnou hodnotou počtov podľa súborov a kódov TS (`config/quality/dashboard-typecheck-baseline.json`, rovnaký vzor zastaraného vynucovania ako pri `check:known-symbols`) — kontrolu zlyhajú iba NOVÉ chyby nad rámec počtu v základnej hodnote; pri opravení existujúcej chyby znížte hodnotu pomocou `--update`.                                                                                                                                                                                                                                                                                                                                 | Áno                                                   |
| `check:build-typecheck`           | Produkčná kontrola typov celej aplikácie nad `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), ktorú nepokrýva 27-súborový zoznam povolených súborov v `typecheck:core` ani kontrola dashboardu. Porovnáva zmeny s `config/quality/build-typecheck-baseline.json`; nový alebo zvýšený počet pre dvojicu (súbor, kód) spôsobí zlyhanie, nižší počet vás vyzve na zníženie hodnoty. `--update` odmietne pokračovať, ak beh obsahuje novú alebo zvýšenú dvojicu, pokiaľ nie je zadané `--force-regressions`, a odmietne aj novo umlčaný súbor, pokiaľ nie je zadané `--force-nocheck`, takže rozšírenie základnej hodnoty s cieľom dosiahnuť úspešný výsledok a udelenie trvalého umlčania sú dva samostatné vedomé kroky. Samotný `--force` je odmietnutý. Kontrola tiež prehľadáva rozsah zostavenia na výskyt `@ts-nocheck` podľa `config/quality/ts-nocheck-baseline.json`, pretože súbor, ktorý ho používa, nehlási vôbec žiadne diagnostické správy a inak by zostal neviditeľný pre každú kontrolu. | Áno                                                   |

#### Dva programy kontroly typov poskytujú odlišné odpovede

`typecheck:core` a `check:build-typecheck` kompilujú odlišné programy s odlišnými
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

| Skript                       | Overuje                                                                                                                                                                                        | Blokuje                   |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | Vytvorí `quality-metrics.json` (počet upozornení ESLint, pokrytie zo zlúčenej správy shardov)                                                                                                  | Áno (predchádza ratchetu) |
| `quality:ratchet`            | Žiadna metrika v `quality-baseline.json` sa nezhoršila (počet upozornení ESLint ≤ baseline; pokrytie ≥ baseline)                                                                               | Áno                       |
| `check:duplication`          | Duplikácia kódu (jscpd@4) neprekračuje baseline v `quality-baseline.json`                                                                                                                      | Áno                       |
| `check:complexity`           | Cyklická zložitosť na úrovni súborov neprekračuje limit (jadrové pravidlá ESLint `complexity` + `max-lines-per-function`)                                                                      | Áno                       |
| `check:cognitive-complexity` | Ratchet kognitívnej zložitosti (`eslint-plugin-sonarjs`) — samostatný priechod ESLint; CI spúšťa oba zlúčené ako jediný krok `check:complexity-ratchets`                                       | Áno                       |
| `check:dead-code`            | Ratchet nepoužitých exportov / súborov (knip) sa v porovnaní s baseline nezhoršil                                                                                                              | Áno                       |
| `check:compression-budget`   | Rozpočet benchmarku kompresie — minimálne úspory tokenov pre jednotlivé enginy sa nesmú zhoršiť                                                                                                | Áno                       |
| `check:type-coverage`        | Ratchet percentuálneho typovania (`type-coverage`) sa nezhoršil; do veľkej miery nahrádza `typecheck:noimplicit:core`                                                                          | Áno                       |
| `check:codeql-ratchet`       | Počet otvorených upozornení CodeQL sa nezhoršil (číta sa cez `gh api`; bez tokenu sa elegantne preskočí) — frekvenciu obnovovania a manuálne spustenie nájdete nižšie v časti „ratchet CodeQL“ | Áno                       |

### Úloha: `quality-extended`

Celá úloha je informatívna (`continue-on-error: true`). Ratchety založené na npm sa spúšťajú
naozaj; externé skenery sa nainštalujú cez `gh release download` a samy sa preskočia (kód ukončenia 0),
ak binárny súbor stále chýba.

| Skript                   | Overuje                                                                                                                                                                                                                                  | Blokovanie                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `check:circular-deps`    | Žiadne kruhové závislosti (dpdm)                                                                                                                                                                                                         | **Informatívne**                                   |
| `check:bundle-size`      | Veľkosť bundla neprekračuje limit                                                                                                                                                                                                        | **Informatívne**                                   |
| `check:secrets`          | Skenovanie tajomstiev (gitleaks) — preskočí sa, ak binárny súbor chýba                                                                                                                                                                   | **Informatívne**                                   |
| `check:vuln-ratchet`     | Zraniteľnosti závislostí (osv-scanner) sa nezhoršili — preskočí sa, ak binárny súbor chýba                                                                                                                                               | **Informatívne**                                   |
| `check:workflows`        | Lint pracovných postupov (actionlint + zizmor); chýbajúce/nefunkčné skenery, neplatné reporty alebo chýbajúci baseline ratchetu spôsobia zlyhanie ako INCOMPLETE. Platné nálezy sa riadia vybranou politikou strict/informatívne/ratchet | Vyžaduje sa vykonanie; ratchet zizmor blokuje v CI |
| `check:openapi-breaking` | Nekompatibilné zmeny verejného API kontraktu (`openapi.yaml`) oproti základnej vetve (oasdiff) — vytvorí `openapiBreaking=N`; preskočí sa, ak oasdiff chýba alebo základnú špecifikáciu nemožno vyriešiť                                 | **Informatívne**                                   |

### Úloha: `docs-sync-strict`

Spúšťa sa pri každom PR do `main`. Pri zlyhaní blokuje zlúčenie.

| Skript                         | Overenie                                                                                                                                                                                     | Blokovanie                |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `check:docs-all`               | Meta-brána, ktorá postupne spúšťa 6 nižšie uvedených podbrán                                                                                                                                 | Áno                       |
| ↳ `check:docs-sync`            | Konzistentnosť verzií v CHANGELOG / OpenAPI / llm.txt                                                                                                                                        | Áno                       |
| ↳ `check:docs-counts`          | Počty v próze (počet poskytovateľov, počet migrácií atď.) sú v rámci tolerančného okna skutočných počtov                                                                                     | Áno                       |
| ↳ `check:env-doc-sync`         | Každá premenná prostredia v `.env.example` je zdokumentovaná v tabuľke dokumentácie a naopak                                                                                                 | Áno                       |
| ↳ `check:deprecated-versions`  | V dokumentácii sa nenachádzajú žiadne reťazce zastaraných verzií                                                                                                                             | Áno                       |
| ↳ `check:doc-links`            | Interné odkazy Markdownu v dokumentácii odkazujú na skutočné súbory (`[text]`/`(path)` forma)                                                                                                | Áno                       |
| ↳ `check:fabricated-docs`      | Cesty, premenné prostredia, príkazy CLI, názvy hookov a cesty k súborom uvedené v dokumentácii existujú v kódovej základni. Prísna brána cez `--strict`; bez príznaku zlyhanie iba upozorní. | Áno (cez `--strict` v CI) |
| `check:cli-i18n`               | Reťazce príkazov CLI sú prítomné vo všetkých lokalizačných súboroch i18n                                                                                                                     | Áno                       |
| `check:openapi-coverage`       | Špecifikácia OpenAPI pokrýva aspoň stanovené minimum skutočných ciest                                                                                                                        | Áno                       |
| `check:openapi-security-tiers` | Anotácie úrovní zabezpečenia v `openapi.yaml` sú konzistentné s klasifikáciami v `routeGuard.ts`                                                                                             | **Informatívne**          |
| `check:openapi-routes`         | Každá cesta v `openapi.yaml` odkazuje na skutočný `route.ts` (ochrana pred halucináciami)                                                                                                    | Áno                       |
| `check:docs-symbols`           | Každý odkaz `/api/...` v `docs/**/*.md` odkazuje na skutočný `route.ts` (ochrana pred halucináciami)                                                                                         | Áno                       |
| `i18n translation drift`       | Nepreložené kľúče v lokalizačných súboroch i18n — iba upozornenie                                                                                                                            | **Informatívne**          |

Dvanásť README SVG súborov v `docs/diagrams/` sa generuje (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` ich vygeneruje všetky). Každý z nich má jednotkový test porovnania bajtov
(`tests/unit/docs/readme-*-svg.test.ts`, úloha `test-unit`), ktorý zlyhá, keď je potvrdený súbor zastaraný, a
`check:docs-counts` číta kanonické čísla z ich uzlov `<text>` — preto krok obrysovania ponecháva každý obrysovaný reťazec
v súbore ako neviditeľný `<text>`. Kontrola kanonických čísel SVG číta súbory uvedené v
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, ako aj `public/images/tier-flow-dark.svg` a `tier-flow-light.svg`;
nároky free-forever, catalog-entry, recurring-pool a scoring-factors tiež čítajú
`promise-pillars.svg`, `free-tier-budget.svg` a `strategies-grid.svg`. `free-tier-budget.svg`
čerpá svoje údaje z aktívneho načítača katalógu, takže zmena `FREE_MODEL_BUDGETS` alebo zobrazovaného názvu poskytovateľa
zafarbí CI načerveno, kým sa tento súbor znova nevygeneruje.

### Úloha: `i18n-ui-coverage`

| Skript                            | Overenie                                                                                                                                                                                                    | Blokovanie       |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage` (inline) | Pokrytie kľúčov UI i18n je ≥ 65 %                                                                                                                                                                           | Áno              |
| `check-ui-value-drift` (inline)   | Prepísaná anglická **hodnota** nezanechá žiadny zastaraný preklad                                                                                                                                           | Áno              |
| `check-new-key-coverage` (inline) | **Nový** anglický kľúč je preložený v každom locale — značka `__MISSING__:` je zamietnutá                                                                                                                   | Áno              |
| `check-translation-ratio`         | Pomer skutočných prekladov podľa locale (zhodné s angličtinou / zástupné symboly / chýbajúce položky mimo zoznamu povolených) nesmie prekročiť `config/quality/i18n-translation-baseline.json` + toleranciu | **Informatívne** |

Vyžaduje `fetch-depth: 0` — brána na kontrolu rozdielov hodnôt porovnáva `en.json` so základom merge.

#### `check-ui-value-drift` — brána na kontrolu zastaraných prekladov

Zachytáva jedinú regresiu i18n, ktorú ostatné štrukturálne kontroly nedokážu odhaliť: anglická hodnota sa prepíše a preklady odvodené od _predchádzajúcej_ angličtiny zostanú nezmenené, takže používatelia iných jazykov naďalej čítajú sebavedomo formulovaný, no teraz nesprávny text.

Toto sa skutočne dostalo do produkcie. `oauthModal.googleOAuthWarning` bol prepísaný po pridaní pomocníka na prihlasovanie Antigravity (#5203); **39 zo 43 lokalizácií** si ponechalo text, ktorý operátorom hovoril, aby „skopírovali celú URL a vložili ju nižšie“ — čo je postup, ktorý pri tomto poskytovateľovi nemožno dokončiť. Zostalo to nepovšimnuté až do #8463, pretože:

- `sync-ui-keys` dopĺňa iba kľúče, ktoré **chýbajú**, nikdy nie tie, ktoré sú **zastarané**;
- `check-ui-keys-coverage` počíta prítomnosť kľúča, takže zastaraný preklad sa považuje za pokrytý;
- `check-translation-drift` sleduje dokumentačné zrkadlá `docs/i18n/<locale>/**.md` —
  nikdy nečíta `src/i18n/messages/*.json`. Od opätovnej synchronizácie v `2026-09` blokuje úloha `docs-sync-strict`: upravte hlavný dokument → `npm run i18n:run -- --files=<doc>` (na úrovni sekcie, nenákladné).

**Zohľadňuje rozdiely, nie baseline.** Porovnáva `en.json` na bode merge base s pracovným stromom; pri každom kľúči, ktorého anglická hodnota sa zmenila, je preklad v ľubovoľnej lokalizácii, ktorý zostal nedotknutý, zastaraný. Toto zámerne **zmrazuje existujúci dlh** — rozdiel nedokáže odhaliť, z ktorej starej anglickej hodnoty dlhodobý preklad pochádza, takže kontrola posudzuje iba to, čo sa týka aktuálnej zmeny. Alternatíva (baseline hashov pre jednotlivé kľúče) by znamenala približne 600 KB veľký vygenerovaný súbor, 3× väčší než najväčší existujúci baseline, ktorý by sa menil pri každom i18n PR.

Existujú dva spôsoby, ako kontrolou prejsť:

1. aktualizujte príslušné preklady alebo
2. nastavte ich na `__MISSING__:<new english>` — runtime potom použije opravenú angličtinu
   (`src/i18n/request.ts::deepMergeFallback`, #7258) a kľúč zaradí do frontu na preklad.

Ak sa zmenil **význam** reťazca, uprednostnite **premenovanie kľúča**: nový kľúč nemôže zdediť zastaraný preklad. To je vzor, ktorý použil #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Pri nemožnosti načítať základný katalóg (plytký klon bez základného refu) skončí s kódom 0 a `SKIP reason=base-unresolved`, rovnako ako `check-openapi-breaking`.

### Úloha: `i18n`

Úplná matica overovania i18n (jedna úloha pre každú lokalizáciu). Celá úloha je informatívna.

| Skript                          | Overuje                                | Blokovanie                                                  |
| ------------------------------- | -------------------------------------- | ----------------------------------------------------------- |
| `validate_translation.py quick` | Úplnosť prekladu pre každú lokalizáciu | **Informatívne** (`continue-on-error: true` pre celú úlohu) |

### Úloha: `pr-test-policy`

Spúšťa sa iba pri pull requestoch.

| Skript                 | Overuje                                                                                                                                        | Blokovanie |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PR, ktoré menia produkčný kód v `src/`, `open-sse/`, `electron/` alebo `bin/`, musia obsahovať alebo aktualizovať testy (Prísne pravidlo č. 8) | Áno        |
| `check:test-masking`   | Zmenené testovacie súbory neznižujú celkový počet assertov ani nepridávajú tautológie `assert.ok(true)`                                        | Áno        |
| `check:pr-evidence`    | Telo PR uvádza dôkazy z testov/VPS pre danú zmenu (mechanizuje Prísne pravidlo č. 18 vyhľadávaním v texte PR — krehké, pozri Backlog)          | Áno        |

### Úloha: `test-vitest`

Spúšťa sa po `build`. Pri zlyhaní blokuje zlúčenie.

| Sada             | Overuje                                                      | Blokovanie                                                                                                           |
| ---------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 nástrojov), autoCombo, cache — runner vitest | Áno                                                                                                                  |
| `test:vitest:ui` | Testy komponentov UI — runner vitest                         | **Blokuje** — existujúce zlyhania sú explicitne vylúčené v `vitest.config.ts`; nové zlyhania spôsobia zlyhanie úlohy |

### Nočné workflow (plánované, informatívne)

Spúšťajú sa podľa plánu cron (a pomocou `workflow_dispatch`), nikdy nie pri PR. Všetky sú informatívne.

| Workflow               | Overenie                                                                                                                                                              | Blokovanie       |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | testy vlastností fast-check s náhodným seed a vysokým počtom spustení                                                                                                 | **Informatívne** |
| `nightly-resilience`   | kontrola rastu haldy, vstrekovanie chaotických chýb, záťažové testy a testy vytrvalosti k6                                                                            | **Informatívne** |
| `nightly-llm-security` | ochrana pred injekciami promptfoo (režim blokovania) + sondy garak (preskočené bez tajomstva poskytovateľa)                                                           | **Informatívne** |
| `nightly-schemathesis` | fuzzing kontraktu OpenAPI (schemathesis) voči aktívnemu OmniRoute pomocou `docs/openapi.yaml` — odhaľuje porušenia špecifikácie / nespracované chyby 500 (Fáza 8 B.4) | **Informatívne** |
| `nightly-mutation`     | skóre mutačného testovania Stryker v rýchlej jednotkovej vetve — prežívajúce mutanty odhaľujú slabé overenia                                                          | **Informatívne** |
| `nightly-compat`       | matica kompatibility enginu Node naprieč podporovanými rozsahmi `engines.node`                                                                                        | **Informatívne** |

Výkonnostné základné hodnoty (heap, TTFB, čas zostavenia) sa zaznamenávajú, ale neblokujú: pozrite si [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

## Zásady zoznamu povolených položiek

Každá brána, ktorá nemôže zlyhať pri už existujúcich porušeniach, používa nemenný zoznam povolených položiek
(napr. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Platí táto zásada:

**Odstráňte základnú príčinu; zoznam povolených položiek použite iba vtedy, keď porušenie už existovalo a
nemožno ho opraviť v rámci rovnakého PR.**

Pri pridávaní položky do zoznamu povolených položiek:

1. Pridajte komentár s odôvodnením.
2. Uveďte odkaz na sledovaný problém (napr. `// #3498 — Funkcia fázy 2, zatiaľ neimplementovaná`).
3. Odstráňte položku v tom istom PR, ktoré opravuje porušenie — zastaraná položka, ktorá už
   nepotláča aktívne porušenie, je sama osebe chybou (kontrola zastaraného vynucovania 6A.3
   po implementácii spôsobí zlyhanie brány pri osamotenej položke zoznamu povolených položiek).

**Nepridávajte** položky do zoznamu povolených položiek, aby testy prešli rýchlejšie. Zelená brána s rastúcim
zoznamom povolených položiek vytvára falošný pocit kvality.

### Keď brána vo vašom PR zlyhá

1. **Pozorne si prečítajte výstup brány** — presne uvádza, ktorý súbor alebo symbol
   porušil pravidlo.
2. **Opravte porušenie** — väčšina brán vykonáva deterministické kontroly súborového systému, ktoré prejdú hneď,
   ako je kód správny.
3. **Ak porušenie už existovalo** (t. j. nezaviedli ste ho vy, ale brána ho teraz
   pokrýva): pridajte položku do zoznamu povolených položiek spolu s komentárom obsahujúcim odôvodnenie a odkazom na sledovaný problém.
4. **Ak je brána západková** (pokrytie, upozornenia ESLint, duplicita, zložitosť):
   vaša zmena metriku zhoršila. Opravte základný problém alebo (výnimočne) spustite
   `npm run quality:ratchet -- --update`, ak je zmena zámerná a zhoršenie metriky
   prijateľné — v popise PR však zdokumentujte dôvod.
5. **Poradné brány** (`continue-on-error: true`) sú informačné — neblokujú
   zlúčenie, ale zobrazujú sa v súhrne CI. Napriek tomu ich opravte.

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

## Zoznam racionalizačných úloh (preskúmanie ROI — fáza 9, vlna 3)

Tento inventár bol 2026-06-17 zosúladený s `ci.yml` (predchádzajúca verzia vynechávala
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Preskúmanie ROI zosúladenej množiny
identifikovalo nasledujúcich kandidátov na racionalizáciu. **Zlúčenia sú mechanické zmeny CI;
prepnutia/odstránenia sú politické rozhodnutia vyhradené pre operátora.** Nič z nižšie
uvedeného zatiaľ nebolo aplikované.

**Vyššie takisto nezdokumentované** (informatívne, nízka výpovedná hodnota): úloha `docs-lint`
(markdownlint + Vale, celá úloha s `continue-on-error`) a samostatné pracovné postupy skenerov
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. Hodnota `semgrepFindings: 0` sa nachádza v
`quality-baseline.json`, ale v `ci.yml` nie je napojená na blokujúcu západku — metrika je
momentálne osirelá.

### Zlúčenie / deduplikácia (mechanické, nižšie riziko)

Každý kandidát bol 2026-06-17 overený voči aktuálnemu stavu brán (dôveruj, ale preveruj);
ukázalo sa, že viaceré „zjavné“ zlúčenia skrývajú dlh a **nie sú** bezproblémovými náhradami.

- **`check:docs-sync` sa spúšťa dvakrát** — samostatne v úlohe `lint` a znova v rámci `check:docs-all` (`docs-sync-strict`) a hooku husky pre pre-commit. ✅ **HOTOVO** — samostatné spustenie v úlohe `lint` bolo odstránené.
- **Skenovanie CVE** — ❌ **NIE JE to bezproblémové zlúčenie.** `audit:deps` tvrdo zlyhá pri ľubovoľnej CVE s vysokou/kritickou závažnosťou; `check:vuln-ratchet` (osv) zlyhá iba pri _regresii_ oproti východiskovej hodnote (aktuálne 1 MODERATE). Odlišná sémantika — odstránením `audit:deps` by sa stratila absolútna brána pre vysokú/kritickú závažnosť. Ponechať obe.
- **Detekcia cyklov** — ✅ **HOTOVO** (#15159 G-01/G-02). Starý text tu označoval `check:cycles` za „zelenú, starostlivo zostavenú“ bránu a odôvodňoval jej zachovanie ako blokujúcej tým, že `check:circular-deps` (dpdm) hlásil 91 cyklov. Tento zelený stav bol **falošne zelený**: `check:cycles` skenoval 5 podadresárov (450 súborov), vyhľadával iba statické `import|export … from` a zahadzoval každý špecifikátor `@/` a `@omniroute/open-sse/`, takže nemohol zachytiť cykly dynamických importov a aliasov, ktoré v repozitári prevládali. Opravené: brána teraz prechádza `src` + `open-sse` (5023 súborov), zhromažďuje špecifikátory z AST TypeScriptu (takže `import("…")` sa započítava a `typeof import("…")` v typovej pozícii nie) a rozpoznáva `paths` z tsconfig. Nachádza **14** cyklov, nie 0. Keďže 14 existujúcich cyklov nemožno opraviť v PR pre bránu, `check:cycles` je teraz **západka** (`--ratchet`, strop `metrics.cycles.value = 14` v `quality-baseline.json`, `direction: down`) — blokuje akúkoľvek _regresiu_ a počet môže iba klesať. CI spúšťa `npm run check:cycles:ratchet`. Postupné odstraňovanie prebieha spolu s **A-01**. `check:circular-deps` (dpdm) zostáva informatívny ako širší druhý názor.
- **Zložitosť** — ✅ **HOTOVO** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): jeden prechod ESLintom, počítanie podľa ruleId, aby východiskové hodnoty cyklomatickej zložitosti + max-lines a kognitívnej zložitosti zostali nezávislé; jednotlivé `check:complexity` / `check:cognitive-complexity` zostávajú na lokálne použitie s `--update`.
- **Ochrana `/api` proti halucináciám** — ✅ **HOTOVO** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): jeden inventár FS pre `src/app/api`, openapi-routes + docs-symbols naďalej hlásia výsledky nezávisle; jednotlivé kontroly zostávajú na lokálne spúšťanie.
- **`check:node-runtime` sa spúšťa v 11 úlohách** — ⚠️ **nízke ROI.** Každá beží na samostatnom runneri a kontrola trvá <1 s; celková úspora je približne 10 s za cenu straty lacnej ochrany v každej úlohe. Nestojí to za súvisiace zmeny.
- **`typecheck:noimplicit:core` v úlohe lint CI** — ✅ **odstránené z úlohy lint** (bolo informatívne s `continue-on-error`); blokujúci typový povrch tvoria `typecheck:core` + `check:type-coverage`. Lokálny skript bol zachovaný.

### Prepnúť / rozhodnúť (politika operátora)

- `check:openapi-security-tiers` (informatívne) — ❌ **NEDÁ SA bezproblémovo prepnúť.** Končí s kódom 0, ale upozorňuje, že viacerým trasám `traffic-inspector` pod `LOCAL_ONLY_API_PREFIXES` chýba anotácia `x-loopback-only: true`. Jej vynútenie si najprv vyžaduje pridanie týchto anotácií do `openapi.yaml`.
- `typecheck:noimplicit:core` (informatívne) — do značnej miery ho nahrádza blokujúca západka `check:type-coverage`. Prepnúť na západku alebo odstrániť redundantný druhý prechod `tsc`.
- `test:vitest:ui` (teraz **blokujúce**) — existujúce zlyhania sú explicitne vylúčené vo `vitest.config.ts` pomocou sledovacích komentárov `// #8618`; nové zlyhania spôsobia zlyhanie úlohy.
- `check:secrets` (gitleaks, blokujúca západka zmrazená na 3 zdokumentovaných falošne pozitívnych nálezoch) — pridať tieto 3 prípady do zoznamu povolených a dostať sa na 0 alebo degradovať na informatívnu kontrolu. Prekrýva sa s natívnym skenovaním tajomstiev v GitHube + `check:public-creds`.
- `check:pr-evidence` (blokujúce, prehľadáva prózu v tele PR pomocou grep) — vysoké riziko falošne pozitívnych nálezov; odstránenie oslabí vynucovanie pevného pravidla č. 18, takže ide o skutočné politické rozhodnutie.
- `semgrep` (samostatné informatívne) — pri rodinách OWASP sa prekrýva s CodeQL; napojiť jeho východiskovú hodnotu na západku alebo ho odstrániť.

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
