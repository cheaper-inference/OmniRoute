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

### Prijímanie kandidátov

Workflow CI aj Quality Gates vydávajú stabilný verdikt: `Gate / CI` a
`Gate / Quality`. Ich verzovaná politika prijímania uvádza každý upstream job
ako povinný alebo poradný. Použiteľný povinný job musí byť úspešný: chýbajúce,
zrušené, preskočené, čakajúce a neznáme výsledky nemôžu založiť PASS. Platná
klasifikácia docs-only alebo catalog-only môže spôsobiť, že kódový pruh nie je
použiteľný; draft PR nie je akceptovaným kandidátom. Štítok `hotfix` nezbavuje
povinnosti predložiť dôkazy.

Oba workflow pokrývajú PR do vetiev main/release, push-e do `main`, manuálny dispatch
a udalosti merge-group. Push, dispatch a merge-group spúšťajú úplný výber. Push-e do
`release/**` ich nespúšťajú (2026-10-18): každá zmena už prešla maticou na svojom PR
a zlúčená kombinácia je úlohou Release-Green (`docs/ops/RUNNER_BOX.md` → Hostovaný pruh). Forky
a merge skupiny používajú hostované runnery pre joby, ktoré by inak vybrali self-hosted
runnery; pred zavedením sa musí overiť dostatočná hostovaná kapacita.

Každý JSON doklad identifikuje SHA z checkoutu, workflow run a pokus.
CLI odmietne nesúlad SHA medzi checkoutom a udalosťou. Testy workflow viažu členstvo
politiky na zoznam `needs` jobu verdiktu, takže nový alebo odstránený pruh nemôže ticho
zmiznúť. Doklady pokrývajú svoj vlastný workflow, nie publikovanie, nasadenie ani
vnútornosti existujúceho poradného skenera. Aktivácia oboch názvov kontrol v pravidlách
vetiev je samostatná administratívna zmena; pridanie týchto jobov samo osebe vetvu nechráni.

### Inventár statického skenovania

Verzovaný inventár npm aliasov a členstvo statického skenovania sa nachádzajú v
`config/quality/gate-manifest.json`. Spustite `npm run check:gate-manifest` na overenie
názvov skriptov a presných príkazov voči `package.json`; pridania, odstránenia a
drift príkazov zlyhajú v lokálnom hooku aj v joboch klasifikácie zmien v CI.
Alias nie je workflow job, inštancia matice ani testovací prípad: tieto počty sa
nesmú prezentovať ako zameniteľné.

Na kontrolu vybraných aliasov bez ich vykonania použite `npm run quality:scan -- --list`
alebo `npm run quality:scan:fast -- --list`. Runner vyvoláva
npm vstupný bod, takže jeho runtime (vrátane Bun tam, kde je nakonfigurovaný) zostáva
zachovaný. Manifest zaznamenáva aliasy mimo týchto profilov ako samostatne vyvolávané a
príkazy údržby sú v read-only skenovacích profiloch zakázané.

Tieto profily pokrývajú iba statické skenovanie. Necertifikujú produktové testy,
pokrytie, balenie, externé kontroly ani úplnú akceptáciu kandidáta pre vydanie.
Prijímanie vo workflow používa prepojené `config/quality/admission-policy.json` a
`scripts/quality/admission-verdict.mjs`. Profily release-observer zostávajú oddelené;
ich príslušné kontroly a doklady preskúmajte nezávisle. Prozaický
inventár nižšie je referencia, nie dôkaz, že brána skutočne prebehla.

Skripty sa nachádzajú v `scripts/check/` (brány politík) a `scripts/quality/` (ratchet engine).
Zdrojom pravdy CI je `.github/workflows/ci.yml`.

### Fast-path pre release PR (`quality.yml`)

`.github/workflows/quality.yml` dopĺňa CI pri PR do main/release, push-och do `main`,
dispatchi a merge skupinách. PR používajú rýchle kontroly filtrované podľa ciest. Natrvalo
zakázaný duplicitný build bol odstránený; skutočné kontroly build/package/boot zostávajú v CI.

| Job                                              | Rozsah                                                                                                                                                                                              | Blokujúce           |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PR-y; referencie API docs a docs-all                                                                                                                                                      | Áno                 |
| `Fast Quality Gates`                             | Code PR-y; statické kontroly, typecheck, typecheck dashboardu, dotknuté unit testy                                                                                                                  | Áno                 |
| `Forgotten sibling tests`                        | Code PR-y; zmenené moduly vysledované k statickým konzumentom a kandidátnym sibling testom; cesty barrel a dynamic-import sa uvádzajú ako poradná diagnostika, s odkazovanými výnimkami z allowlist | **Poradné**         |
| `Vitest (fast-path)`                             | Code PR-y; rýchla vitest sada                                                                                                                                                                       | Áno                 |
| `Unit Tests fast-path`                           | Code PR-y; 4-shardová unit sada                                                                                                                                                                     | Áno                 |
| `No new ESLint warnings`                         | Code PR-y; lint stráž zohľadňujúca potlačenia                                                                                                                                                       | Áno, vrátane forkov |
| `Merge integrity (changelog + generated skills)` | PR-y, ktoré nie sú drafty; synchronizácia changelogu a generovaných zručností                                                                                                                       | Áno, vrátane forkov |

#### Správa o zabudnutých sibling testoch

`npm run check:forgotten-sibling-tests` opätovne využíva resolver importov, ktorý stojí za mapou vplyvu testov.
Pre každý zmenený produkčný modul hlási deterministické reťazce
`changed module/symbol -> static consumer -> candidate sibling test`, keď sa kandidátsky
test nenachádza v diff-e pull requestu. Súhrn v Markdowne a výsledok JSON sa uchovávajú ako
artefakt workflow `forgotten-sibling-tests` na kalibráciu pred akýmkoľvek blokujúcim zavedením.

Barrel re-exporty a dynamické importy slúžia len ako diagnostika rozlíšenia; nikdy nevytvárajú
blokujúce zistenie. Preskúmané výnimky sa nachádzajú v
`config/quality/forgotten-sibling-allowlist.json`. Každá položka musí uvádzať konzumenta a kandidátsky
test, poskytnúť konkrétne odôvodnenie a odkazovať na GitHub issue alebo pull request. Nesprávne
formátované položky zlyhajú uzavretým spôsobom (fail closed). Výnimky nemôžu potlačiť odstránený
kandidátsky test ani diff, ktorý pridáva `.skip`/`.todo`; oslabovanie asercií a iné maskovanie
zostáva v správe nezávisle blokujúcej brány `check:test-masking`.

### Úloha: `lint`

Spúšťa sa pri každom PR do `main`. Pri zlyhaní blokuje merge.

| Skript (`npm run ...`)            | Overuje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Blokujúce                                 |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:node-runtime`              | Verzia Node.js je v rámci podporovaného rozsahu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Áno                                       |
| `check:cycles`                    | Cyklické importy naprieč celým `src/` + `open-sse/` (založené na AST, vyriešené `paths` z tsconfig). Základná verzia skončí s kódom 1 vždy, keď existuje akýkoľvek cyklus (fail-closed od #15281), a vypíše SCC. `check:cycles:ratchet` (ktorý spúšťa CI) blokuje, keď počet presiahne strop `metrics.cycles` v `quality-baseline.json` — aktuálne 14, `direction: down`, takže môže len klesať (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Áno (ratchet)                             |
| `check:boundary`                  | Viazanosť `open-sse → src`: jedinečné importy súbor-súbor z enginu do aplikácie (`scripts/quality/measure-boundary.mjs`; zoznam hrán je backlogom nápravy rozdelenia core/modulu vo v4). Základná verzia = informatívna správa (rovnaká ako `quality:boundary`). `check:boundary:ratchet` (ktorý spúšťa CI, tiež v ratchet slučke fast-gates v `quality.yml`) blokuje, keď počet presiahne strop `metrics.boundaryOpenSseToSrc` v `quality-baseline.json` — inicializovaný na nameraných 771, `direction: down`; `--update` ho len znižuje; relatívny voči základu na PR (`--base-ref`, pozri nižšie)                                                                                                                                                                                                                                                                                     | Áno (ratchet)                             |
| `check:route-validation:t06`      | Zod schémy prítomné na všetkých routách (politika Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Áno                                       |
| `check:any-budget:t11`            | Počet výskytov `@ts-expect-error // any` nepresahuje rozpočet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Áno                                       |
| `check:provider-consistency`      | Každý poskytovateľ v `providers.ts` má zodpovedajúci záznam v `providerRegistry.ts` (a naopak, v rámci allowlistu)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Áno                                       |
| `check:model-lifecycle`           | Tri ručne udržiavané smerovacie tabuľky zostávajú konzistentné so snapshotom životného cyklu uloženým v repozitári (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nehodnotí žiadne vyradené id, ktoré vie `REGISTRY` smerovať; každý cieľ `BUILT_IN_ALIASES` je prítomný v `REGISTRY` a chýba v snapshote vyradených id; každé vyradené id, ktoré sa stále nachádza v `REGISTRY`, je presmerované alebo uvedené v `allowedRetiredInCatalog`; a žiadny zdroj ani cieľ `DEFAULT_DEGRADATION_MAP` sa v tomto snapshote nejaví ako vyradený. Nedokazuje to, že model je momentálne obsluhovaný živým upstreamom. Offline — porovnáva sa oproti `config/quality/model-lifecycle.json`, ktorý sa ručne obnovuje príkazom `npm run quality:refresh-model-lifecycle` (sieť; nie je zapojené do CI). `allowedRetiredInCatalog` je západka typu burn-down: záznam pridávajte iba so sledovacím issue. | Áno                                       |
| `check:fetch-targets`             | Každé volanie `fetch("/api/...")` v klientskej časti `src/` odkazuje na skutočný súbor `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Áno                                       |
| `check:deps`                      | Všetky závislosti inštalovateľné cez `npm install` vo všetkých súboroch `package.json` v repozitári sú uvedené v `dependency-allowlist.json`; nové nepripnuté alebo slopsquatované balíky sú označené                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Áno                                       |
| `audit:deps`                      | `npm audit` (root + electron) — žiadne bezpečnostné hlásenia úrovne high/critical (prekrýva sa s osv `check:vuln-ratchet`; pozri racionalizačný backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Áno                                       |
| `check:lockfile`                  | Integrita súboru `package-lock.json` — https register, haše integrity, žiadne prepísania hostiteľa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Áno                                       |
| `check:licenses`                  | Zoznam povolených licencií SPDX pre produkčné závislosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Áno                                       |
| `check:tracked-artifacts`         | Žiadne artefakty buildu / commitnuté symbolické odkazy `node_modules` (spúšťa sa aj v husky pre-commit; pre-push je zámerne odľahčený — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Áno                                       |
| `check:ai-attribution`            | Žiadny AI/bot trailer `Co-Authored-By` ani pätička o generovaní AI v commitoch PR, názve alebo tele — Pevné pravidlo č. 16 (v slučke fast-gates v `quality.yml` pre PR→`release/**` — číta payload udalosti, mimo PR je no-op — a krok iba pre PR v linte `ci.yml` pre PR→`main`; tiež husky hook `commit-msg`; ľudskí spoluautori sú povolení; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:vitest-exclusions`         | Každé vylúčenie Vitest uvádza sledovací issue a nachádza sa v `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Áno                                       |
| `check:file-size`                 | Zdrojové súbory (`.ts`/`.tsx` v `src/`, `open-sse/`, `electron/`, `bin/`) zostávajú v rámci `cap` a testovacie súbory (`*.test.ts(x)`) v rámci `testCap`; súbory zmrazené v `file-size-baseline.json` (`frozen` / `testFrozen`) nesmú rásť nad svoju zaznamenanú veľkosť                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Áno                                       |
| `check:error-helper`              | Chybové odpovede v exekutoroch/handleroch používajú `buildErrorBody()` / `sanitizeErrorMessage()` (Prísne pravidlo č. 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Áno                                       |
| `check:migration-numbering`       | Migračné SQL súbory sú postupne číslované, bez medzier alebo duplicít                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Áno                                       |
| `check:public-creds`              | Žiadne literálové OAuth `client_id`/`client_secret` alebo Firebase Web kľúče mimo `publicCreds.ts` (Prísne pravidlo č. 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Áno                                       |
| `check:db-rules`                  | Žiadne surové SQL mimo modulov `src/lib/db/`; žiadne barrel-importy z `localDb.ts` (Prísne pravidlá č. 2/č. 5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Áno                                       |
| `check:known-symbols`             | Exekutory poskytovateľov, smerovacie stratégie a prekladače registrované vo svojich dispečerských tabuľkách zodpovedajú súborom na disku — žiadne osirelé ani nedeklarované symboly                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Áno                                       |
| `check:route-guard-membership`    | Každá trasa, ktorá spúšťa podriadený proces, je klasifikovaná pomocou `isLocalOnlyPath()` (Prísne pravidlá č. 15/č. 17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Áno                                       |
| `check:test-discovery`            | Každý súbor `*.test.ts` / `*.spec.ts` v repozitári je zachytený aspoň jedným testovacím runnerom (ratchet: zoznam osirelých súborov v `test-discovery-baseline.json` sa môže len zmenšovať)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Áno                                       |
| `check:agent-skills-sync`         | Vygenerované artefakty agent-skills zodpovedajú svojmu zdrojovému katalógu (žiadny drift)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                           |
| `check:provider-asset-provenance` | Logá/assety poskytovateľov majú zaznamenaný záznam o pôvode (provenance)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |                                           |
| `lint:json`                       | Konfiguračné súbory JSON sa dajú parsovať a spĺňajú lint pravidlá repozitára                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |                                           |
| `typecheck:core`                  | Kompilácia TypeScriptu bez chýb (len nezáväzné varovania)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Áno                                       |
| `typecheck:noimplicit:core`       | Striktné `noImplicitAny` — zamerané do budúcnosti; mnohé už existujúce miesta volaní stále potrebujú anotácie                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **Nezáväzná** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` s rozsahom obmedzeným na `src/app/(dashboard)/**` (#7033) — kurátorsky zostavený allowlist 27 súborov v `typecheck:core` neobsahuje žiadne dashboard TSX a `next build` ho tiež nikdy typovo nekontroluje (`next.config.mjs` nastavuje `ignoreBuildErrors: true`), takže regresie osirelých identifikátorov (#6625/#6909) boli pre CI neviditeľné. Porovnáva sa so zmrazenou referenčnou hodnotou (baseline) počtov na súbor/TS-kód (`config/quality/dashboard-typecheck-baseline.json`, rovnaký vzor vynucovania zastaranosti ako `check:known-symbols`) — brána zlyhá len pri NOVÝCH chybách nad rámec referenčného počtu; pri oprave už existujúcej chyby referenčnú hodnotu znížte pomocou `--update`.                                                                                                                                                                          | Áno                                       |

### Úloha: `quality-gate`

Spúšťa sa po `test-coverage`. Pri zlyhaní blokuje zlúčenie.

| Skript                       | Overuje                                                                                                                                                                     | Blokovanie                |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | Generuje `quality-metrics.json` (počet upozornení ESLint, pokrytie zo zlúčeného reportu shardov)                                                                            | Áno (predchádza ratchetu) |
| `quality:ratchet`            | Žiadna metrika v `quality-baseline.json` sa nezhoršila (upozornenia ESLint ≤ baseline; pokrytie ≥ baseline)                                                                 | Áno                       |
| `check:duplication`          | Duplikácia kódu (jscpd@4) nepresahuje baseline v `quality-baseline.json`                                                                                                    | Áno                       |
| `check:complexity`           | Cyklomatická zložitosť na úrovni súborov nepresahuje limit (jadro ESLint `complexity` + `max-lines-per-function`)                                                           | Áno                       |
| `check:cognitive-complexity` | Ratchet kognitívnej zložitosti (`eslint-plugin-sonarjs`) — samostatný priechod ESLint; CI spúšťa oba zlúčené ako jediný krok `check:complexity-ratchets`                    | Áno                       |
| `check:dead-code`            | Ratchet nepoužitých exportov / súborov (knip) sa oproti baseline nezhoršuje                                                                                                 | Áno                       |
| `check:compression-budget`   | Rozpočet kompresného benchmarku — minimálne prahy úspory tokenov pre jednotlivé enginy sa nesmú zhoršiť                                                                     | Áno                       |
| `check:type-coverage`        | Ratchet percentuálnej typovanosti (`type-coverage`) sa nezhoršuje; do veľkej miery zahŕňa `typecheck:noimplicit:core`                                                       | Áno                       |
| `check:codeql-ratchet`       | Počet otvorených hlásení CodeQL sa nezhoršuje (číta cez `gh api`; bez tokenu sa elegantne preskočí) — frekvencia obnovy a manuálne spustenie: pozri „CodeQL ratchet“ nižšie | Áno                       |

### Job: `quality-extended`

Celý job je nezáväzný (`continue-on-error: true`). Ratchety založené na npm bežia
reálne; externé skenery sa inštalujú cez `gh release download` a samy sa preskočia
(exit 0), ak binárny súbor stále chýba.

| Skript                   | Overuje                                                                                                                                                                                                                | Blokovanie                                              |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `check:circular-deps`    | Žiadne cyklické závislosti (dpdm)                                                                                                                                                                                      | **Nezáväzné**                                           |
| `check:bundle-size`      | Veľkosť bundlu nepresahuje limit                                                                                                                                                                                       | **Nezáväzné**                                           |
| `check:secrets`          | Skenovanie tajomstiev (gitleaks) — preskočí sa, ak binárny súbor chýba                                                                                                                                                 | **Nezáväzné**                                           |
| `check:vuln-ratchet`     | Zraniteľnosti závislostí (osv-scanner) sa nezhoršujú — preskočí sa, ak binárny súbor chýba                                                                                                                             | **Nezáväzné**                                           |
| `check:workflows`        | Lint workflowov (actionlint + zizmor); chýbajúce/nefunkčné skenery, neplatné reporty alebo chýbajúci ratchet baseline zlyhajú so stavom INCOMPLETE. Platné nálezy sa riadia zvolenou politikou strict/advisory/ratchet | Vyžaduje sa vykonanie; zizmor ratchet je v CI blokujúci |
| `check:openapi-breaking` | Lámajúce zmeny verejného API kontraktu (`openapi.yaml`) oproti základnej vetve (oasdiff) — generuje `openapiBreaking=N`; preskočí sa, ak oasdiff chýba alebo základná špecifikácia nie je dostupná                     | **Nezáväzné**                                           |

### Job: `docs-sync-strict`

Spúšťa sa pri každom PR do `main`. Pri zlyhaní blokuje zlúčenie.

| Skript                         | Overuje                                                                                                                                                                          | Blokujúce                 |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `check:docs-all`               | Meta-brána, ktorá postupne spúšťa 6 nižšie uvedených podbrán                                                                                                                     | Áno                       |
| ↳ `check:docs-sync`            | Konzistencia verzií CHANGELOG / OpenAPI / llm.txt                                                                                                                                | Áno                       |
| ↳ `check:docs-counts`          | Počty v texte (počet poskytovateľov, počet migrácií atď.) sú v rámci ratchetového okna skutočných počtov                                                                         | Áno                       |
| ↳ `check:env-doc-sync`         | Každá premenná prostredia v `.env.example` je zdokumentovaná v tabuľke dokumentácie a naopak                                                                                     | Áno                       |
| ↳ `check:deprecated-versions`  | Žiadne zastarané reťazce verzií v dokumentácii                                                                                                                                   | Áno                       |
| ↳ `check:doc-links`            | Interné markdown odkazy v dokumentácii zodpovedajú skutočným súborom (tvar `[text]`/`(path)`)                                                                                    | Áno                       |
| ↳ `check:fabricated-docs`      | Trasy, premenné prostredia, CLI príkazy, názvy hookov a cesty k súborom citované v dokumentácii existujú v kódovej základni. Pevná brána cez `--strict`; bez príznaku soft-fail. | Áno (cez `--strict` v CI) |
| `check:cli-i18n`               | Reťazce CLI príkazov sú prítomné vo všetkých súboroch jazykových mutácií i18n                                                                                                    | Áno                       |
| `check:openapi-coverage`       | Špecifikácia OpenAPI pokrýva aspoň ratchetovanú spodnú hranicu skutočných trás                                                                                                   | Áno                       |
| `check:openapi-security-tiers` | Anotácie bezpečnostných úrovní v `openapi.yaml` sú konzistentné s klasifikáciami v `routeGuard.ts`                                                                               | **Informatívne**          |
| `check:openapi-routes`         | Každá cesta v `openapi.yaml` zodpovedá skutočnému `route.ts` (anti-halucinácia)                                                                                                  | Áno                       |
| `check:docs-symbols`           | Každá referencia `/api/...` v `docs/**/*.md` zodpovedá skutočnému `route.ts` (anti-halucinácia)                                                                                  | Áno                       |
| `i18n translation drift`       | Nepreložené kľúče v súboroch jazykových mutácií i18n — len upozornenie                                                                                                           | **Informatívne**          |

### Úloha: `i18n-ui-coverage`

| Skript                            | Overuje                                                                                                                                                                                                   | Blokujúce        |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage` (inline) | Pokrytie kľúčov UI i18n je ≥ 65 %                                                                                                                                                                         | Áno              |
| `check-ui-value-drift` (inline)   | Prepísaná anglická **hodnota** nenechá za sebou zastaraný preklad                                                                                                                                         | Áno              |
| `check-new-key-coverage` (inline) | **Nový** anglický kľúč je preložený v každej jazykovej mutácii — značka `__MISSING__:` sa odmietne                                                                                                        | Áno              |
| `check-translation-ratio`         | Pomer skutočných prekladov na jazykovú mutáciu (listy zhodné s angličtinou / so zástupným obsahom / chýbajúce mimo allowlistu) nesmie prekročiť `config/quality/i18n-translation-baseline.json` + rezervu | **Informatívne** |

Vyžaduje `fetch-depth: 0` — brána value-drift porovnáva `en.json` so základom zlúčenia (merge base).

#### `check-ui-value-drift` — brána proti zastaraným prekladom

Zachytáva jedinú regresiu i18n, ktorú ostatné brány štrukturálne nevidia: anglická hodnota
sa prepíše a preklady odvodené z _predchádzajúcej_ angličtiny zostanú pozadu, takže
neanglicky hovoriaci používatelia naďalej čítajú sebavedomo formulovaný, no už nesprávny text.

Toto sa skutočne stalo. `oauthModal.googleOAuthWarning` sa prepísal, keď pristál pomocník
na prihlásenie Antigravity (#5203); **39 z 43 jazykových mutácií** si ponechalo text, ktorý
operátorom hovoril, aby „skopírovali celú URL a vložili ju nižšie" — postup, ktorý sa pre
tohto poskytovateľa nedá dokončiť. Zostalo to bez povšimnutia až do #8463, pretože:

- `sync-ui-keys` dopĺňa len kľúče, ktoré **chýbajú**, nikdy tie, ktoré sú **zastarané**;
- `check-ui-keys-coverage` počíta _prítomnosť_ kľúčov, takže zastaraný preklad sa hodnotí ako pokrytý;
- `check-translation-drift` sleduje zrkadlá dokumentácie `docs/i18n/<locale>/**.md` —
  nikdy nečíta `src/i18n/messages/*.json`. Od re-synchronizácie 2026-09 blokujúce v úlohe
  `docs-sync-strict`: upravíte jadrový dokument → `npm run i18n:run -- --files=<doc>` (na úrovni sekcií, lacné).

**Založené na diffu, nie na baseline.** Porovnáva `en.json` v bode merge base voči
pracovnému stromu; pre každý kľúč, ktorého anglická hodnota sa zmenila, je každý locale,
ktorý stále drží nedotknutý preklad, zastaralý. Toto zámerne **zmrazuje existujúci dlh** —
diff nedokáže odhaliť, z ktorej starej angličtiny dlhodobý preklad pochádza, takže brána
posudzuje len to, čoho sa aktuálna zmena dotýka. Alternatíva (baseline s hashom pre každý
kľúč) by znamenala ~600 KB generovaný súbor, 3× väčší ako najväčší existujúci baseline,
ktorý by sa menil pri každom i18n PR.

Dva spôsoby, ako bránu splniť:

1. aktualizujte dotknuté preklady, alebo
2. nastavte ich na `__MISSING__:<new english>` — runtime potom servíruje opravenú
   angličtinu (`src/i18n/request.ts::deepMergeFallback`, #7258) a kľúč sa zaradí do frontu
   na preklad.

Ak sa zmenil **význam** reťazca, uprednostnite **premenovanie kľúča**: nový kľúč nemôže
zdeditiť zastaralý preklad. To je vzor, ktorý použilo #8463.

```bash
npm run i18n:check-value-drift          # striktné (to spúšťa CI)
npm run i18n:check-value-drift:warn     # len report
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Skončí s kódom 0 a `SKIP reason=base-unresolved`, keď sa základný katalóg nedá prečítať
(plytký klon bez základného refu), rovnako ako `check-openapi-breaking`.

### Úloha: `i18n`

Plná validačná matica i18n (jedna úloha na každý locale). Celá úloha je poradná.

| Skript                          | Validuje                           | Blokujúce                                              |
| ------------------------------- | ---------------------------------- | ------------------------------------------------------ |
| `validate_translation.py quick` | Úplnosť prekladov pre každý locale | **Poradná** (`continue-on-error: true` na celej úlohe) |

### Úloha: `pr-test-policy`

Spúšťa sa len pri pull requestoch.

| Skript                 | Validuje                                                                                                                                       | Blokujúce |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PR, ktoré menia produkčný kód v `src/`, `open-sse/`, `electron/` alebo `bin/`, musia obsahovať alebo aktualizovať testy (prísne pravidlo č. 8) | Áno       |
| `check:test-masking`   | Zmenené testovacie súbory neznižujú čistý počet asercií ani nepridávajú tautológie `assert.ok(true)`                                           | Áno       |
| `check:pr-evidence`    | Telo PR uvádza testovacie/VPS dôkazy pre zmenu (mechanizuje prísne pravidlo č. 18 grepovaním textu PR — krehké, pozri Backlog)                 | Áno       |

### Úloha: `test-vitest`

Spúšťa sa po `build`. Pri zlyhaní blokuje merge.

| Sada             | Validuje                                                     | Blokujúce                                                                                                                   |
| ---------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 nástrojov), autoCombo, cache — vitest runner | Áno                                                                                                                         |
| `test:vitest:ui` | Testy UI komponentov — vitest runner                         | **Blokujúca** — predchádzajúce zlyhania sú explicitne vylúčené vo `vitest.config.ts`; nové zlyhania spôsobia zlyhanie úlohy |

### Nočné workflow (plánované, poradné)

Tieto sa spúšťajú podľa plánu cron (a `workflow_dispatch`), nikdy pri PR. Všetky sú poradné.

| Workflow               | Validuje                                                                                                                                                          | Blokujúce   |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | property testy fast-check s náhodným seedom + vysoký počet behov                                                                                                  | **Poradné** |
| `nightly-resilience`   | brána rastu heapu, chaos fault-injection, k6 load/soak                                                                                                            | **Poradné** |
| `nightly-llm-security` | promptfoo injection guard (blokovací režim) + garak sondy (preskočené bez secretu poskytovateľa)                                                                  | **Poradné** |
| `nightly-schemathesis` | fuzzing OpenAPI kontraktu (schemathesis) proti živému OmniRoute pomocou `docs/openapi.yaml` — odhaľuje porušenia špecifikácie / neošetrené chyby 500 (Fase 8 B.4) | **Poradné** |
| `nightly-mutation`     | skóre mutačného testovania Stryker v rýchlej dráhe jednotkových testov — prežívajúci mutanti odhaľujú slabé asercie                                               | **Poradné** |
| `nightly-compat`       | matica kompatibility enginu Node naprieč podporovanými rozsahmi `engines.node`                                                                                    | **Poradné** |

Výkonnostné baseline (heap, TTFB, čas buildu) sa zaznamenávajú, ale neslúžia ako brána:
pozri [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
