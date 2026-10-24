# Quality Gates Reference (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

# Referenca za Quality Gates

Ovaj dokument je mjerodavna referenca za sve CI quality gates u OmniRoute-u.
Opisuje svaku kapiju, šta ona validira, u kojem CI poslu se izvršava, da li koristi
ratchet osnovicu ili politiku prolaza/pada (pass/fail), te da li blokira build ili je samo savjetodavna.

Za kratak sažetak i politiku liste dozvoljenih (allowlist), pogledajte odjeljak „Quality Gates & Ratchets”
u `AGENTS.md`. Za kritičku procjenu, klasifikaciju zrelosti i plan replikacije
istog sistema nezavisan od alata, pogledajte
[Quality Gate Playbook](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventar gateova i profili izvršavanja

### Prijem kandidata

CI i Quality Gates workflowi svaki emituju stabilan verdict: `Gate / CI` i
`Gate / Quality`. Njihova verzionisana politika prijema navodi svaki upstream job
kao obavezan ili savjetodavan. Primjenjivi obavezni job mora uspjeti: rezultati koji su
odsutni, otkazani, preskočeni, na čekanju ili nepoznati ne mogu potvrditi PASS. Važeća
docs-only ili catalog-only klasifikacija može učiniti code lane neprimjenjivim;
draft PR nije prihvaćeni kandidat. Oznaka `hotfix` ne ukida dokaze.

Oba workflowa pokrivaju PR-ove prema main/release granama, pushove na `main`, ručno
pokretanje (dispatch) i merge-group događaje. Push, dispatch i merge-group pokreću punu
selekciju. Pushovi na `release/**` ih ne pokreću (2026-10-18): svaka promjena je već
prošla matricu na svom PR-u, a provjera spojene kombinacije je zadatak Release-Greena
(`docs/ops/RUNNER_BOX.md` → Hosted lane). Forkovi i merge grupe koriste hosted runnere
za jobove koji inače biraju self-hosted runnere; dovoljan hosted kapacitet mora biti
provjeren prije primjene.

Svaki JSON zapisnik identificira checkoutani SHA, workflow run i pokušaj.
CLI odbacuje nepodudarnost checkout/event SHA-a. Workflow testovi vezuju članstvo
u politici za `needs` listu verdict joba, tako da novi ili uklonjeni lane ne može
tiho nestati. Zapisnici pokrivaju vlastiti workflow, a ne publikaciju, deployment
ili interne detalje postojećeg savjetodavnog skenera. Aktiviranje oba imena provjera
u pravilima grana je zasebna administrativna promjena; dodavanje ovih jobova samo
po sebi ne štiti granu.

### Inventar statičke provjere

Verzionisani inventar npm-aliasa i članstvo u statičkoj provjeri nalaze se u
`config/quality/gate-manifest.json`. Pokrenite `npm run check:gate-manifest` za validaciju
imena skripti i tačnih komandi u odnosu na `package.json`; dodaci, uklanjanja i
odstupanja komandi uzrokuju neuspjeh i lokalne kuke i jobova za klasifikaciju promjena u CI-ju.
Alias nije workflow job, instanca matrice niti test slučaj: ovi brojevi se
ne smiju prikazivati kao zamjenjivi.

Koristite `npm run quality:scan -- --list` ili `npm run quality:scan:fast -- --list`
za pregled odabranih aliasa bez njihovog izvršavanja. Runner poziva
npm ulaznu tačku, pa se njegov runtime (uključujući Bun gdje je konfigurisan) zadržava.
Manifest bilježi aliase izvan tih profila kao zasebno pozvane, a
komande za održavanje su zabranjene u read-only profilima provjere.

Ovi profili pokrivaju samo statičku provjeru. Oni ne potvrđuju testove proizvoda,
pokrivenost, pakovanje, eksterne provjere niti potpuni release prihvat kandidata.
Prijem u workflow koristi povezane `config/quality/admission-policy.json` i
`scripts/quality/admission-verdict.mjs`. Profili release-observera ostaju odvojeni;
njihove primjenjive provjere i zapisnike pregledajte nezavisno. Prozni
inventar ispod je referenca, a ne dokaz da se gate stvarno izvršio.

Skripte se nalaze pod `scripts/check/` (gateovi politike) i `scripts/quality/` (ratchet engine).
Izvor istine za CI je `.github/workflows/ci.yml`.

### Brza putanja za release PR (`quality.yml`)

`.github/workflows/quality.yml` nadopunjuje CI na main/release PR-ovima, pushovima na `main`,
dispatchu i merge grupama. PR-ovi koriste brze provjere filtrirane po putanji. Trajno
onemogućeni duplirani build je uklonjen; stvarne provjere build/package/boot ostaju u CI-ju.

| Job                                              | Opseg                                                                                                                                                                                                                  | Blokirajuće             |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PR-ovi; API docs reference i docs-all                                                                                                                                                                        | Da                      |
| `Fast Quality Gates`                             | Code PR-ovi; statičke provjere, typecheck, typecheck dashboarda, pogođeni unit testovi                                                                                                                                 | Da                      |
| `Forgotten sibling tests`                        | Code PR-ovi; promijenjeni moduli praćeni do statičkih potrošača i kandidiranih sibling testova; barrel i dynamic-import putanje se prijavljuju kao savjetodavne dijagnostike, s referenciranim izuzecima iz allowliste | **Savjetodavno**        |
| `Vitest (fast-path)`                             | Code PR-ovi; brzi vitest paket                                                                                                                                                                                         | Da                      |
| `Unit Tests fast-path`                           | Code PR-ovi; unit paket u 4 sharda                                                                                                                                                                                     | Da                      |
| `No new ESLint warnings`                         | Code PR-ovi; lint zaštita svjesna suppresija                                                                                                                                                                           | Da, uključujući forkove |
| `Merge integrity (changelog + generated skills)` | Ne-draft PR-ovi; sinhronizacija changelog-a i generisanih skillova                                                                                                                                                     | Da, uključujući forkove |

#### Izvještaj o zaboravljenim sibling testovima

`npm run check:forgotten-sibling-tests` ponovo koristi import resolver iza mape uticaja testova.
Za svaki izmijenjeni produkcijski modul prijavljuje determinističke lance
`changed module/symbol -> static consumer -> candidate sibling test` kada test-kandidat
nedostaje u diff-u pull requesta. Markdown sažetak i JSON rezultat zadržavaju se kao
artefakt `forgotten-sibling-tests` workflow-a radi kalibracije prije bilo kakvog blokirajućeg uvođenja.

Barrel re-exporti i dinamički importi služe isključivo kao dijagnostika razrješavanja; nikada ne
stvaraju blokirajući nalaz. Pregledani izuzeci nalaze se u
`config/quality/forgotten-sibling-allowlist.json`. Svaki unos mora imenovati potrošača i
test-kandidat, dati konkretno obrazloženje i povezati GitHub issue ili pull request. Neispravno
oblikovani unosi padaju na sigurnoj strani (fail closed). Izuzeci ne mogu potisnuti obrisan
test-kandidat ili diff koji dodaje `.skip`/`.todo`; slabljenje asercija i ostalo maskiranje ostaju
u nadležnosti nezavisno blokirajuće `check:test-masking` provjere.

### Posao: `lint`

Pokreće se na svakom PR-u prema `main`. Blokira merge u slučaju neuspjeha.

| Script (`npm run ...`)            | Validira                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Blokirajuće                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `check:node-runtime`              | Verzija Node.js je unutar podržanog opsega                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Da                                           |
| `check:cycles`                    | Kružni importi kroz cijeli `src/` + `open-sse/` (bazirano na AST-u, tsconfig `paths` razriješen). Samostalna komanda izlazi sa kodom 1 kad god postoji ijedan ciklus (fail-closed od #15281) i ispisuje SCC-ove. `check:cycles:ratchet` (ono što CI pokreće) blokira kada broj premaši plafon `metrics.cycles` u `quality-baseline.json` — trenutno 14, `direction: down`, tako da može samo padati (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                               | Da (ratchet)                                 |
| `check:boundary`                  | Sprega `open-sse → src`: jedinstveni importi datoteka-u-datoteku iz engine-a u aplikaciju (`scripts/quality/measure-boundary.mjs`; lista bridova je backlog za remedijaciju v4 core/module-split). Samostalno = savjetodavni izvještaj (isto kao `quality:boundary`). `check:boundary:ratchet` (ono što CI pokreće, također u ratchet petlji brzih kontrola u `quality.yml`) blokira kada broj premaši plafon `metrics.boundaryOpenSseToSrc` u `quality-baseline.json` — inicijalno postavljen na izmjerene 771, `direction: down`; `--update` ga samo smanjuje; relativno u odnosu na bazu na PR-ovima (`--base-ref`, vidi ispod)                                                                                                                                                                                                   | Da (ratchet)                                 |
| `check:route-validation:t06`      | Zod sheme prisutne na svim rutama (Tier 6 politika)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `check:any-budget:t11`            | Broj `@ts-expect-error // any` ne prelazi budžet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                           |
| `check:provider-consistency`      | Svaki provider u `providers.ts` ima odgovarajući unos u `providerRegistry.ts` (i obrnuto, unutar allowliste)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                           |
| `check:model-lifecycle`           | Tri ručno održavane routing tabele ostaju konzistentne sa snapshotom životnog ciklusa koji je checked-in (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ne ocjenjuje nijedan povučeni id koji `REGISTRY` može rutirati; svaka `BUILT_IN_ALIASES` meta prisutna je u `REGISTRY` i nije u snapshotu povučenih id-ova; svaki povučeni id koji je još uvijek u `REGISTRY` je proslijeđen ili naveden u `allowedRetiredInCatalog`; i nijedan `DEFAULT_DEGRADATION_MAP` izvor ili meta ne pojavljuje se kao povučen u tom snapshotu. Ovo ne dokazuje da model trenutno poslužuje živi upstream. Offline — poredi se sa `config/quality/model-lifecycle.json`, ručno se osvježava s `npm run quality:refresh-model-lifecycle` (mreža; nije povezano u CI). `allowedRetiredInCatalog` je burn-down ratchet: unos dodaj samo uz tracking issue. | Da                                           |
| `check:fetch-targets`             | Svaki `fetch("/api/...")` u klijentskom `src/` razrješava se u stvarni `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:deps`                      | Sve zavisnosti koje se mogu instalirati putem `npm install` u svakom `package.json` u repozitoriju nalaze se u `dependency-allowlist.json`; novi nepinirani ili slopsquatted paketi se označavaju                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `audit:deps`                      | `npm audit` (root + electron) — nema high/critical preporuka (preklapa se s osv `check:vuln-ratchet`; vidi Rationalization Backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `check:lockfile`                  | integritet datoteke `package-lock.json` — https registar, hash vrijednosti integriteta, bez nadjačavanja hosta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                           |
| `check:licenses`                  | SPDX lista dozvoljenih licenci za produkcijske zavisnosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                           |
| `check:tracked-artifacts`         | Bez build artefakata / commit-anih `node_modules` simboličkih linkova (također se pokreće u husky pre-commit hook-u; pre-push je namjerno lagan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                           |
| `check:ai-attribution`            | Bez AI/bot `Co-Authored-By` trailer-a ili footer-a o AI-generisanju u PR commit-ima, naslovu ili tijelu — Strogo pravilo #16 (u `quality.yml` fast-gates petlji za PR→`release/**` — čita payload događaja, no-op izvan PR-ova — i korak samo za PR-ove u `ci.yml` lint-u za PR→`main`; također i husky `commit-msg` hook; ljudski koautori su dozvoljeni; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:vitest-exclusions`         | Svako Vitest izuzeće navodi issue za praćenje i pojavljuje se u `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `check:file-size`                 | Izvorne datoteke (`.ts`/`.tsx` u `src/`, `open-sse/`, `electron/`, `bin/`) ostaju u okviru `cap`, a testne datoteke (`*.test.ts(x)`) u okviru `testCap`; datoteke zamrznute u `file-size-baseline.json` (`frozen` / `testFrozen`) ne smiju rasti iznad svoje zabilježene veličine                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:error-helper`              | Odgovori o greškama u executorima/handlerima koriste `buildErrorBody()` / `sanitizeErrorMessage()` (Strogo pravilo br. 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Da                                           |
| `check:migration-numbering`       | SQL datoteke migracija su sekvencijalno numerisane, bez praznina ili duplikata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                           |
| `check:public-creds`              | Nema doslovnih OAuth `client_id`/`client_secret` ili Firebase Web ključeva izvan `publicCreds.ts` (Strogo pravilo br. 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                           |
| `check:db-rules`                  | Nema sirovog SQL-a izvan `src/lib/db/` modula; nema barrel-importa iz `localDb.ts` (Stroga pravila br. 2/br. 5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                           |
| `check:known-symbols`             | Executori provajdera, strategije usmjeravanja i prevodioci registrovani u njihovim dispatch tabelama odgovaraju datotekama na disku — nema napuštenih ili nedeklarisanih simbola                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `check:route-guard-membership`    | Svaka ruta koja pokreće podređeni proces klasificirana je pomoću `isLocalOnlyPath()` (Stroga pravila br. 15/br. 17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `check:test-discovery`            | Svaka `*.test.ts` / `*.spec.ts` datoteka u repozitoriju prikuplja se od strane barem jednog pokretača testova (ratchet: lista siročadi u `test-discovery-baseline.json` može se samo smanjivati)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `check:agent-skills-sync`         | Generirani agent-skills artefakti odgovaraju svom izvornom katalogu (bez odstupanja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                              |
| `check:provider-asset-provenance` | Logotipi/resursi providera nose zabilježeni unos o porijeklu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |                                              |
| `lint:json`                       | JSON konfiguracijske datoteke se uspješno parsiraju i zadovoljavaju lint pravila repozitorija                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |                                              |
| `typecheck:core`                  | TypeScript kompilacija bez grešaka (samo informativna upozorenja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `typecheck:noimplicit:core`       | Strogi `noImplicitAny` — usmjeren unaprijed; mnoga postojeća mjesta poziva još uvijek zahtijevaju anotacije                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | **Informativno** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ograničen na `src/app/(dashboard)/**` (#7033) — kurirana lista dozvoljenih datoteka iz `typecheck:core` (27 datoteka) ne uključuje nijedan dashboard TSX, a `next build` ga također nikada ne provjerava po tipovima (`next.config.mjs` postavlja `ignoreBuildErrors: true`), pa su regresije napuštenih identifikatora tamo (#6625/#6909) bile nevidljive za CI. Usporedba s zamrznutom baznom linijom brojača po datoteci/po TS-kodu (`config/quality/dashboard-typecheck-baseline.json`, isti obrazac sprječavanja zastarjelosti kao `check:known-symbols`) — samo NOVE greške iznad baznog broja obaraju provjeru; smanjite ratchet s `--update` kada se ispravi postojeća greška.                                                                                                                                         | Da                                           |

### Zadatak: `quality-gate`

Pokreće se nakon `test-coverage`. Blokira spajanje pri neuspjehu.

| Skripta                      | Provjerava                                                                                                                                                                               | Blokirajuće               |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | Emituje `quality-metrics.json` (broj ESLint upozorenja, pokrivenost iz spojenog shard izvještaja)                                                                                        | Da (uzvodno od ratchet-a) |
| `quality:ratchet`            | Svaka metrika u `quality-baseline.json` nije regresirala (ESLint upozorenja ≤ osnova; pokrivenost ≥ osnova)                                                                              | Da                        |
| `check:duplication`          | Duplikacija koda (jscpd@4) ne prelazi osnovu u `quality-baseline.json`                                                                                                                   | Da                        |
| `check:complexity`           | Ciklomatska složenost na nivou datoteke ne prelazi limit (jezgreni ESLint `complexity` + `max-lines-per-function`)                                                                       | Da                        |
| `check:cognitive-complexity` | Ratchet kognitivne složenosti (`eslint-plugin-sonarjs`) — odvojeni ESLint prolaz; CI pokreće oba spojena kao jedinstveni korak `check:complexity-ratchets`                               | Da                        |
| `check:dead-code`            | Ratchet nekorištenih exporta / datoteka (knip) ne regresira u odnosu na osnovu                                                                                                           | Da                        |
| `check:compression-budget`   | Budžet kompresijskog benchmarka — donje granice uštede tokena po engine-u ne smiju regresirati                                                                                           | Da                        |
| `check:type-coverage`        | Ratchet procenta tipiziranog koda (`type-coverage`) ne regresira; uveliko obuhvata `typecheck:noimplicit:core`                                                                           | Da                        |
| `check:codeql-ratchet`       | Broj otvorenih CodeQL upozorenja ne regresira (čita putem `gh api`; preskače bez greške ako nema tokena) — učestalost osvježavanja i ručno pokretanje: pogledajte "CodeQL ratchet" ispod | Da                        |

### Job: `quality-extended`

Cijeli job je savjetodavan (`continue-on-error: true`). Ratchet-i bazirani na npm-u
izvršavaju se stvarno; eksterni skeneri se instaliraju putem `gh release download` i
sami se preskaču (exit 0) kada binarni fajl još uvijek nedostaje.

| Skripta                  | Provjerava                                                                                                                                                                                                               | Blokirajuće                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------- |
| `check:circular-deps`    | Nema kružnih zavisnosti (dpdm)                                                                                                                                                                                           | **Savjetodavno**                                  |
| `check:bundle-size`      | Veličina bundle-a ne prelazi limit                                                                                                                                                                                       | **Savjetodavno**                                  |
| `check:secrets`          | Skeniranje tajni (gitleaks) — preskače ako binarni fajl nedostaje                                                                                                                                                        | **Savjetodavno**                                  |
| `check:vuln-ratchet`     | Ranjivosti zavisnosti (osv-scanner) ne regresiraju — preskače ako binarni fajl nedostaje                                                                                                                                 | **Savjetodavno**                                  |
| `check:workflows`        | Lint workflow-a (actionlint + zizmor); nedostajući/pokvareni skeneri, nevažeći izvještaji ili nedostajuća ratchet osnova padaju kao INCOMPLETE. Važeći nalazi slijede odabranu strict/advisory/ratchet politiku          | Izvršavanje obavezno; zizmor ratchet blokira u CI |
| `check:openapi-breaking` | Promjene javnog API ugovora (`openapi.yaml`) koje krše kompatibilnost u odnosu na osnovnu granu (oasdiff) — emituje `openapiBreaking=N`; preskače ako oasdiff nedostaje ili se osnovna specifikacija ne može razriješiti | **Savjetodavno**                                  |

### Job: `docs-sync-strict`

Pokreće se na svakom PR-u prema `main`. Blokira spajanje pri neuspjehu.

| Skripta                        | Provjerava                                                                                                                                                                 | Blokira                       |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `check:docs-all`               | Meta-kapija koja redom pokreće 6 podkapija navedenih ispod                                                                                                                 | Da                            |
| ↳ `check:docs-sync`            | Konzistentnost verzija u CHANGELOG / OpenAPI / llm.txt                                                                                                                     | Da                            |
| ↳ `check:docs-counts`          | Brojevi u prozi (broj provajdera, broj migracija itd.) nalaze se unutar ratchet prozora stvarnih brojeva                                                                   | Da                            |
| ↳ `check:env-doc-sync`         | Svaka env varijabla u `.env.example` dokumentovana je u tabeli u dokumentaciji, i obrnuto                                                                                  | Da                            |
| ↳ `check:deprecated-versions`  | Nema zastarjelih stringova verzija u dokumentaciji                                                                                                                         | Da                            |
| ↳ `check:doc-links`            | Interni markdown linkovi u dokumentaciji vode do stvarnih datoteka (oblik `[text]`/`(path)`)                                                                               | Da                            |
| ↳ `check:fabricated-docs`      | Rute, env varijable, CLI komande, nazivi hookova i putanje datoteka navedeni u dokumentaciji postoje u bazi koda. Čvrsta kapija putem `--strict`; soft-fail bez zastavice. | Da (putem `--strict` u CI-ju) |
| `check:cli-i18n`               | Stringovi CLI komandi prisutni su u svim i18n locale datotekama                                                                                                            | Da                            |
| `check:openapi-coverage`       | OpenAPI specifikacija pokriva barem ratchetirani minimalni prag stvarnih ruta                                                                                              | Da                            |
| `check:openapi-security-tiers` | Anotacije sigurnosnih nivoa u `openapi.yaml` konzistentne su s klasifikacijama u `routeGuard.ts`                                                                           | **Savjetodavno**              |
| `check:openapi-routes`         | Svaka putanja u `openapi.yaml` vodi do stvarnog `route.ts` (anti-halucinacija)                                                                                             | Da                            |
| `check:docs-symbols`           | Svaka referenca `/api/...` u `docs/**/*.md` vodi do stvarnog `route.ts` (anti-halucinacija)                                                                                | Da                            |
| `i18n translation drift`       | Neprevedeni ključevi u i18n locale datotekama — samo upozorenje                                                                                                            | **Savjetodavno**              |

### Posao: `i18n-ui-coverage`

| Skripta                           | Provjerava                                                                                                                                                                                        | Blokira          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage` (inline) | Pokrivenost UI i18n ključeva je ≥ 65%                                                                                                                                                             | Da               |
| `check-ui-value-drift` (inline)   | Prepisana engleska **vrijednost** ne ostavlja za sobom zastarjeli prijevod                                                                                                                        | Da               |
| `check-new-key-coverage` (inline) | **Novi** engleski ključ preveden je za svaki locale — marker `__MISSING__:` se odbija                                                                                                             | Da               |
| `check-translation-ratio`         | Omjer stvarnih prijevoda po localeu (listovi identični engleskom / placeholderi / nedostajući, izvan dozvoljene liste) ne smije premašiti `config/quality/i18n-translation-baseline.json` + slack | **Savjetodavno** |

Zahtijeva `fetch-depth: 0` — kapija za value-drift poredi `en.json` s merge bazom.

#### `check-ui-value-drift` — kapija za zastarjele prijevode

Hvata jedinu i18n regresiju koju ostale kapije strukturno ne mogu vidjeti: engleska
vrijednost se prepiše, a prijevodi izvedeni iz _prethodne_ engleske verzije ostanu iza,
pa korisnici koji ne govore engleski i dalje čitaju samouvjereno formuliran, a sada
pogrešan tekst.

Ovo se stvarno desilo u produkciji. `oauthModal.googleOAuthWarning` je prepisan kada je
Antigravity login helper ubačen (#5203); **39 od 43 localea** zadržalo je tekst koji
operatorima govori da "kopiraju puni URL i zalijepe ga ispod" — tok koji se za tog
provajdera ne može dovršiti. Ostalo je neprimijećeno do #8463 jer:

- `sync-ui-keys` samo naknadno popunjava ključeve koji **nedostaju**, nikad one koji su **zastarjeli**;
- `check-ui-keys-coverage` broji _prisustvo_ ključa, pa se zastarjeli prijevod računa kao pokriven;
- `check-translation-drift` prati dokumentacijske kopije `docs/i18n/<locale>/**.md` —
  nikad ne čita `src/i18n/messages/*.json`. Blokira u poslu `docs-sync-strict` od
  ponovne sinhronizacije 2026-09: uredite osnovni dokument → `npm run i18n:run -- --files=<doc>` (na nivou sekcije, jeftino).

**Svjestan razlika (diff), ne zasnovan na osnovnoj liniji.** Poredi `en.json` na tački spajanja (merge base) s radnim stablom; za svaki ključ čija se engleska vrijednost promijenila, svaki lokalitet koji i dalje sadrži nepromijenjen prijevod je zastario. Ovo namjerno **zamrzava postojeći dug** — diff ne može otkriti iz kojeg starog engleskog teksta potiče dugogodišnji prijevod, pa kapija ocjenjuje samo ono što trenutna izmjena dotiče. Alternativa (hash osnovna linija po ključu) koštala bi generisanu datoteku od ~600 KB, 3× veću od najveće postojeće osnovne linije, uz stalne izmjene na svakom i18n PR-u.

Dva načina da se zadovolji:

1. ažurirajte pogođene prijevode, ili
2. postavite ih na `__MISSING__:<new english>` — runtime tada servira ispravljeni engleski
   (`src/i18n/request.ts::deepMergeFallback`, #7258), a ključ se stavlja u red za prijevod.

Ako se **značenje** stringa promijenilo, radije **preimenujte ključ**: novi ključ ne može
naslijediti zastario prijevod. To je obrazac koji je koristio #8463.

```bash
npm run i18n:check-value-drift          # striktno (ono što CI izvršava)
npm run i18n:check-value-drift:warn     # samo izvještaj
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Izlazi sa statusom 0 uz `SKIP reason=base-unresolved` kada se osnovni katalog ne može
pročitati (plitki klon bez osnovne reference), oslikavajući `check-openapi-breaking`.

### Zadatak: `i18n`

Potpuna matrica i18n validacije (jedan zadatak po lokalitetu). Cijeli zadatak je savjetodavan.

| Skripta                         | Validira                          | Blokira                                                         |
| ------------------------------- | --------------------------------- | --------------------------------------------------------------- |
| `validate_translation.py quick` | Potpunost prijevoda po lokalitetu | **Savjetodavno** (`continue-on-error: true` na cijelom zadatku) |

### Zadatak: `pr-test-policy`

Izvršava se samo na pull requestovima.

| Skripta                | Validira                                                                                                                                           | Blokira |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:pr-test-policy` | PR-ovi koji mijenjaju produkcijski kod u `src/`, `open-sse/`, `electron/` ili `bin/` moraju uključiti ili ažurirati testove (Strogo pravilo br. 8) | Da      |
| `check:test-masking`   | Izmijenjene testne datoteke ne smanjuju neto broj asserta niti dodaju tautologije `assert.ok(true)`                                                | Da      |
| `check:pr-evidence`    | Tijelo PR-a navodi dokaze o testovima/VPS-u za izmjenu (mehanizira Strogo pravilo br. 18 pretragom proze PR-a — krhko, vidi Backlog)               | Da      |

### Zadatak: `test-vitest`

Izvršava se nakon `build`. Blokira spajanje u slučaju neuspjeha.

| Paket            | Validira                                                 | Blokira                                                                                                       |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 alata), autoCombo, keš — vitest pokretač | Da                                                                                                            |
| `test:vitest:ui` | Testovi UI komponenti — vitest pokretač                  | **Blokira** — postojeći neuspjesi su izričito isključeni u `vitest.config.ts`; novi neuspjesi obaraju zadatak |

### Noćni workflow-i (zakazani, savjetodavni)

Ovi se izvršavaju po cron rasporedu (i `workflow_dispatch`), nikada na PR-ovima. Svi su savjetodavni.

| Workflow               | Validira                                                                                                                                                         | Blokira          |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | fast-check testovi svojstava sa slučajnim seedom + velikim brojem izvršavanja                                                                                    | **Savjetodavno** |
| `nightly-resilience`   | kapija rasta heap-a, chaos ubrizgavanje grešaka, k6 opterećenje/soak                                                                                             | **Savjetodavno** |
| `nightly-llm-security` | promptfoo zaštita od injekcije (blokirajući režim) + garak sonde (preskočene bez provider secret-a)                                                              | **Savjetodavno** |
| `nightly-schemathesis` | OpenAPI fuzzing ugovora (schemathesis) protiv živog OmniRoute koristeći `docs/openapi.yaml` — otkriva kršenja specifikacije / neobrađene 500 greške (Faza 8 B.4) | **Savjetodavno** |
| `nightly-mutation`     | Stryker rezultat mutacijskog testiranja nad brzom jediničnom trakom — preživjeli mutanti otkrivaju slabe asserte                                                 | **Savjetodavno** |
| `nightly-compat`       | Matrica kompatibilnosti Node enginea kroz podržane `engines.node` opsege                                                                                         | **Savjetodavno** |

Osnovne linije performansi (heap, TTFB, vrijeme izgradnje) se bilježe, a ne blokiraju: vidi [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Faza brzine (2026-08-30 → v4.0 LTS): svaka osnovna vrijednost ublažena za 20%

Odluka vlasnika (2026-08-30): do modularizacije u v4.0, brzina isporuke važnija je
od zadržavanja tehničkog duga na trenutnom nivou. Svaka **numerička** osnovna vrijednost mehanizma postepenog pooštravanja ublažena je za 20% u jednom
provjerljivom prolazu, a faza je deklarisana u `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Šta je promijenjeno                                                                                                                                                                                          | Gdje                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — brojevi gdje je niže bolje ×1.2, postoci gdje je više bolje ÷1.2 (minimalna pokrivenost 60 je zadržana, `eslintErrors` ostaje 0, `eslintWarnings` 0 → 20% zamrznutog broja potiskivanja) | `quality-baseline.json` (bilješka `_relax_velocity_2026_08_30` navodi svako prije → poslije)           |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                             | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, ograničenje broja linija za svaki `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                       | `file-size-baseline.json`                                                                              |
| brojevi po datoteci / po TS kodu ×1.2                                                                                                                                                                        | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                          | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` postaje savjetodavan dok je `_policy.requireTighten === false`                                                                                                                           | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| noćni `bank-ratchet-shrinks` se pauzira (zabilježio bi izmjereno smanjenje i poništio rezervu)                                                                                                               | `.github/workflows/nightly-release-green.yml`                                                          |

Liste dozvoljenih stavki (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **nisu** budžeti i nisu mijenjane. Pravila prolaza/pada (tajne, SQL pravila,
ugovor dokumentacije/okruženja, i18n paritet, jedinični testovi) nisu promijenjena — crveni test je i dalje crveni test.

**Alati**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — jednokratno
  ublažavanje (`scripts/quality/relax-baselines.mjs`); odbija se pokrenuti dvaput s istom
  bilješkom.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mjeri svaku numeričku kontrolu na isti način kao CI i ispisuje preostalu rezervu za svaku kontrolu
  (`scripts/quality/baseline-headroom.mjs`). Noćni posao `baseline-headroom` objavljuje
  tabelu u sažetku izvršavanja radnog toka i učitava svoj JSON/Markdown izvještaj kao
  `baseline-headroom-<run_id>`, uz čuvanje 90 dana. Redovi upozorenja i kritični redovi označavaju kontrole
  koje su unutar 10% svog ograničenja ili su ga već premašile. Pregledajte ove izvještaje kao rano upozorenje da se
  budžeti troše; pregledajte bilješke `_rebaseline_*` problematične kontrole. Posao više
  ne kreira niti ažurira trajni problem; #12149 čuva raniju historiju izvještaja.

**Režim novog koda (Clean-as-You-Code) — od 2026-08-30, samo brza putanja za PR**

Na događajima `pull_request`, `quality.yml` prosljeđuje `--base-ref <PR base SHA>` komandama `check:file-size`,
`check:complexity-ratchets` i `check:dead-code`. Za `check:complexity-ratchets` i
`check:dead-code` kontrola poredi HEAD s bazom spajanja, **ograničeno na datoteke koje je PR
izmijenio** (`scripts/check/newCodeMode.mjs`: baza spajanja materijalizira se u privremenom
`git worktree`, ESLint/knip se pokreću tamo i na HEAD-u, a brojevi po datoteci se porede):

- **blokirajuće** — PR je dodao kršenja ciklomatske/kognitivne složenosti ili mrtve izvoze u datotekama koje je izmijenio
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` u zapisniku);
- **savjetodavno** — globalni zbir u odnosu na zamrznutu osnovnu vrijednost. Naslijeđeno odstupanje nikada ne obara
  nedužan PR; odstupanje se ponovo zamrzava pri usklađivanju izdanja i prati ga posao za rezervu.

`check:file-size` koristi baznu referencu prema vlastitim pravilima (`scripts/check/check-file-size.mjs`, #8522):
provjerava svaku izvornu i testnu datoteku u stablu, čita broj linija svake od njih na PR bazi
pomoću `git show` i obara datoteku samo kada naraste preko većeg od njenog osnovnog ograničenja
(`frozen` / `testFrozen`, ili `cap` / `testCap` za datoteku izvan osnovne vrijednosti) i njene bazne
veličine. Datoteka koja je već odstupila na bazi stoga nikada ne obara nedužan PR.

`check:boundary:ratchet` primjenjuje isto pravilo na svoj jedini broj
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): pri PR događajima i brze provjere u `quality.yml` i lint zadatak u `ci.yml` prosljeđuju osnovni SHA PR-a, osnovni commit mjeri se iz izvoza `git archive`, a PR ne prolazi samo kada njegov broj veza `open-sse → src` premašuje veću vrijednost između `metrics.boundaryOpenSseToSrc` i broja na osnovi. Odstupanje osnove iznad gornje granice prijavljuje se (`base drift herdado`), ali nikada ne uzrokuje pad nedužnog PR-a; push → main zadržava apsolutnu gornju granicu, a osnovni SHA koji se ne može razriješiti vraća se na nju uz upozorenje.

Pokretanja putem `workflow_dispatch`, završna provjera zelenog statusa izdanja i noćni zadatak za rezervu nemaju PR osnovu i zadržavaju apsolutno (globalno) poređenje. Pokrivenost, dupliciranje i pokrivenost tipovima za sada ostaju globalni (njihovi alati ne mogu jeftino proizvesti razliku po datoteci) — kandidati su za isti tretman.

**Zatvaranje faze na v4.0 (LTS = strožije nego prije, a ne „povratak u normalu”)**

1. Na čistom vrhu grane `release/v4.0.0`: pokrenite `npm run quality:headroom --json` radi evidencije, zatim
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` i `--update` za svaku provjeru tipova — svaka osnovna vrijednost spušta se na izmjerenu vrijednost.
2. Izbrišite `_policy` iz `quality-baseline.json` (ponovo aktivira `--require-tighten` i noćno
   akumuliranje rezerve), vratite `THRESHOLD = 36` (ili više) u `check-openapi-coverage.mjs`.
3. Postavite strožije granice od izmjerenih tamo gdje se modularizacija isplatila: vratite `cap` veličine datoteke na 1000
   (ili 800), povećajte minimalnu pokrivenost za 5, postavite mrtve izvoze na 0 za modularizirane pakete.

## Ratchet osnova (`quality-baseline.json`)

Ratchet mehanizam (`scripts/quality/check-quality-ratchet.mjs`) čita `quality-baseline.json`
i upoređuje ga sa svježe prikupljenim `quality-metrics.json`. Svaka metrika koja regresira
izvan svoje epsilon vrijednosti uzrokuje neuspjeh build-a.

Trenutno praćene metrike:

| Metrika               | Smjer  | Značenje                              |
| --------------------- | ------ | ------------------------------------- |
| `eslintWarnings`      | `down` | Broj ESLint upozorenja ne smije rasti |
| `coverage.statements` | `up`   | Pokrivenost naredbi ne smije opasti   |
| `coverage.lines`      | `up`   | Pokrivenost linija ne smije opasti    |
| `coverage.functions`  | `up`   | Pokrivenost funkcija ne smije opasti  |
| `coverage.branches`   | `up`   | Pokrivenost grana ne smije opasti     |

Za ažuriranje osnove nakon stvarnog poboljšanja:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Flag `--update` upisuje trenutno izmjerene vrijednosti u `quality-baseline.json`.
Commit-ujte ovu datoteku zajedno sa izmjenom koja je poboljšala metriku. PR koji poboljšava
metriku bez ažuriranja osnove će biti uhvaćen pomoću `--require-tighten` (Faza 6A.5,
implementacija na čekanju).

### CodeQL ratchet: učestalost osvježavanja i ručno pokretanje

`check:codeql-ratchet` čita **stanje repozitorija, osvježeno prema rasporedu — ne po PR-u.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` prijavljuje
`state: configured`, `schedule: weekly`: GitHub-ovo skeniranje putem 'default-setup', a ne
analiza po push-u. Posljedica: nakon što se PR koji POPRAVLJA upozorenja merge-uje,
ratchet nastavlja čitati stari, veći broj sve dok se ne pokrene sljedeće zakazano skeniranje
— tako da prijavljuje regresiju na svakom otvorenom PR-u, uključujući i naknadne izmjene
samog PR-a koji vrši popravku, sve dok skeniranje ne sustigne stanje.

**Ručno osvježavanje**: `gh workflow run codeql.yml --ref release/vX.Y.Z` ponovo pokreće
analizu i ponovo objavljuje upozorenja u roku od nekoliko minuta. Prvo pročitajte
`.github/workflows/codeql.yml` — njegovo zaglavlje objašnjava da je samo za
`workflow_dispatch` **zato što je u sukobu sa GitHub-ovim "default setup-om"**
(`CodeQL analize iz naprednih konfiguracija se ne mogu obraditi kada je omogućen 'default setup'`).
Vraćanje `push`/`pull_request`/`schedule` okidača zahtijeva **prvo akciju vlasnika**:
Settings → Code security → CodeQL: Default → Advanced. Nemojte dodavati `schedule:`
okidač bez tog prekidača — to će samo proizvesti neuspješna pokretanja.

**Postrožite osnovu nakon što broj opadne** — `node scripts/check/check-codeql-ratchet.mjs
--update` upisuje novi izmjereni broj u `quality-baseline.json` →
`metrics.codeqlAlerts.value`, tako da ratchet ne dozvoli tiho regresiju nazad do starog
limita. Primjer iz prakse (2026-09-02/03): PR #12502 popravio 7 stvarnih upozorenja
(13 → 6 izmjerenih otvorenih); PR #12530 postrožio zamrznutu osnovu sa 11 na 6 kako bi se
podudarala; preostalih 6 je zatim odbačeno uz obrazloženje za svako upozorenje, sve do 0 otvorenih.

**Odbacivanja su odluka operatera (Strogo pravilo #14)** — nikada ne odbacujte CodeQL
upozorenje bez bilježenja tehničkog obrazloženja u komentaru odbacivanja: `won't fix` za
zahtjev upstream protokola, `used in tests` za test fixture, `false positive` za
sanitizer koji CodeQL ne može vidjeti (presedan: `docs/security/ERROR_SANITIZATION.md`).

---

## Politika ponovnog pokretanja testova (WS5.4, v3.8.49)

Ponovno pokretanje se vrši po pokretaču (runner), nikada kao globalna mjera — globalno ponovno pokretanje pretvara stvarne regresije u nevidljive nestabilne testove (flakes):

| Pokretač (Runner) | Politika                                                                                                                                           | Zašto                                                                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e)  | `retries: 1` samo u CI, sa `trace: on-first-retry`                                                                                                 | Vrijeme preglednika/mreže je istinski nedeterminističko; jedan ponovni pokušaj sa tragom (trace) pretvara nestabilan test u dijagnostički artefakt |
| Vitest            | NEMA globalnog ponovnog pokretanja. Dokazano nestabilan test dobija eksplicitno ponovno pokretanje po testu (vidljivo u diff-u, pregledano u PR-u) | Čuva listu karantina u repozitorijumu, nikada nije neprozirno                                                                                      |
| node:test (unit)  | NIKADA nema ponovnog pokretanja                                                                                                                    | Nestabilan jedinični test je greška u testu — popravite ga, nemojte ga ponovo pokretati                                                            |

Ciljani SLO-ovi kada se implementira telemetrija nestabilnosti (WS5.2/5.3): <1% stopa nestabilnosti po testu (prag "popravi odmah"), ≥95% stopa prolaznosti po cjevovodu (pipeline). Industrijske referentne vrijednosti — rekalibrirajte prema našim vlastitim mjerenjima.

## Odstupanje mehanizma kontrole (Ratchet Drift) na nivou izdanja (WS5.5, v3.8.49)

Kada mehanizam kontrole (veličina datoteke, složenost, eslint upozorenja) regresira na ČISTOM vrhu izdanja (release tip) — tj. KOMBINACIJA spajanja (merges) ga je dovela do regresije, a nijedan pojedinačni PR ne reproducira regresiju na svojoj grani — popravka pripada kapetanu izdanja (release captain), jednom, na grani izdanja: preferirajte ekstrakciju/refaktorisanje; ponovno baziranje (rebaseline) vršite samo uz dokumentovani unos opravdanja. Nikada ne gurajte kombinovano odstupanje na PR saradnika, i nikada ne vršite ponovno baziranje po PR-u (to skriva stvarne regresije). Prvo napravite razliku: reproducirajte crveno stanje (red) u odnosu na čisti vrh u probnom radnom stablu (probe worktree) prije nego što pretpostavite da ga je vaš PR uzrokovao.

## Grupisanje smanjenja mehanizma kontrole (Banking Ratchet Shrinks) — smjer prema dolje (#8584)

Mehanizam kontrole je samo napola automatski, i to je pogrešna polovina. **Povećanje** ograničenja (cap) je ručna JSON izmjena koja traje deset sekundi i najbrži je način za deblokadu crvenog PR-a. **Smanjenje** zahtijeva da neko pokrene `--update` i commituje rezultat — i sve dok posao `bank-ratchet-shrinks` nije implementiran, nijedan radni tok ga nije pokretao. Izmjerena posljedica (2026-07-25): 18 zamrznutih datoteka već na ili ispod ograničenja od 800 linija za nove datoteke, najgora na 132× (`src/shared/validation/schemas.ts`, 19 linija koje nose ograničenje od 2,523); gornja granica složenosti se pomjerila `1794 → 2169` kroz ~37 bilješki o ponovnom baziranju sa tačno jednim smanjenjem (−1); i "zategni putem `--update` u sljedećem ciklusu" napisano 31 put, a ispoštovano jednom. Ograničenje koje nadživi kod koji ga je zaslužio tiho pretvara svaku završenu dekompoziciju u dozvolu za rast za bilo koga ko sljedeći uređuje datoteku.

`nightly-release-green.yml` → posao **`bank-ratchet-shrinks`** zatvara tu petlju:

|               |                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------ |
| Pokreće se na | `schedule` (3×/dnevno) + `workflow_dispatch` — namjerno **NE** na `push`                                     |
| Mjeri         | najviši `release/vX.Y.Z`, ista rezolucija + zaštita od injekcije kao `release-green`                         |
| Piše          | `check:file-size --update` i `check:complexity-ratchets --update` (oba su samo za smanjenje po konstrukciji) |
| Verifikuje    | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                     |
| Isporučuje    | jedan uvijek aktuelan PR u odnosu na granu izdanja — prisilno ažuriran, nikada spaman                        |

Grupisanje (Banking) se koristi umjesto rada po push-u jer nema zahtjeva za latencijom (smanjenje bankirano unutar 8h je u redu), dok bi pokretanje po spajanju (per-merge) ponovo gradilo PR granu tokom kampanja spajanja i plaćalo puni ESLint prolaz svaki put. Detekcija ostaje na push-u (`release-green`); samo se grupisanje (banking) vrši serijski.

### Sigurnosni verifikator

Posao piše u osnovne vrijednosti (baselines) bez nadzora, pa je `verify-ratchet-bank.mjs` ono što to čini prihvatljivim. On upoređuje (diffs) stablo nakon `--update` sa `HEAD` i **prekida posao prije nego što postoji bilo kakav commit** — ne otvarajući PR — osim ako je svaka promjena jedna od:

- numerički unos `frozen` / `testFrozen` **smanjen** ili **uklonjen**
- `complexity-baseline.json` → `count` **smanjen**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **smanjen**

Sve ostalo ne uspijeva: povećanje broja, dodavanje unosa, promjena `cap`/`testCap`, ili brisanje/prepisivanje `_rebaseline_*` bilješke (te bilješke su revizijski trag zašto svaka gornja granica postoji i pohranjene su unutar istog `frozen` objekta kao i unosi datoteka). Bot koji bi mogao povećati ograničenje bio bi strogo gori od statusa quo. Regresijska zaštita: `tests/unit/verify-ratchet-bank.test.ts`.

Posao nikada ne gura (push) na `release/*` — čovjek spaja PR, tako da loše mjerenje ne može dospjeti bez pregleda.

## Politika liste dozvoljenih (Allowlist Policy)

Svaka kapija koja ne može pasti zbog već postojećih kršenja koristi zamrznutu listu dozvoljenih
(npr. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Politika je:

**Otklonite osnovni uzrok; koristite listu dozvoljenih samo kada je kršenje već postojeće i
ne može se popraviti u istom PR-u.**

Kada dodajete unos na listu dozvoljenih:

1. Uključite komentar sa obrazloženjem.
2. Referencirajte problem praćenja (npr. `// #3498 — Funkcionalnost faze 2, još nije implementirana`).
3. Uklonite unos u istom PR-u koji popravlja kršenje — zastarjeli unos koji više ne
   potiskuje aktivno kršenje je sam po sebi defekt (6A.3 stale-enforcement će oboriti
   kapiju na napuštenom unosu liste dozvoljenih kada se implementira).

Nemojte **dodavati** unose na listu dozvoljenih da bi testovi brže prolazili. Zelena kapija sa rastućom
listom dozvoljenih je lažni osjećaj kvaliteta.

### Kada kapija padne na vašem PR-u

1. **Pažljivo pročitajte izlaz kapije** — on vam tačno govori koji fajl ili simbol je prekršio
   pravilo.
2. **Popravite kršenje** — većina kapija su determinističke provjere sistema datoteka koje prolaze čim je kod ispravan.
3. **Ako je kršenje već postojeće** (tj. niste ga vi uveli, ali ga kapija sada pokriva): dodajte unos na listu dozvoljenih sa komentarom obrazloženja i problemom praćenja.
4. **Ako je kapija ratchet** (pokrivenost, ESLint upozorenja, duplikacija, kompleksnost):
   vaša izmjena je pogoršala metriku. Popravite osnovni problem, ili (rijetko) pokrenite
   `npm run quality:ratchet -- --update` ako je izmjena namjerna i degradacija metrike
   prihvatljiva — ali dokumentujte zašto u opisu PR-a.
5. **Savjetodavne kapije** (`continue-on-error: true`) su informativne — one ne blokiraju
   spajanje (merge), ali se pojavljuju u CI sažetku. Svejedno ih popravite.

---

## Dodavanje nove kapije

1. Kreirajte `scripts/check/check-<name>.mjs` (ili `.ts`). Kapije politike izlaze sa 0/1.
   Kapije tipa ratchet emituju metriku u `quality-metrics.json` putem `collect-metrics.mjs`.
2. Dodajte `"check:<name>": "node scripts/check/check-<name>.mjs"` u `package.json`.
3. Povežite je u `.github/workflows/ci.yml` pod odgovarajućim poslom
   (policy → `lint` ili `docs-sync-strict`; ratchet → `quality-gate`).
4. Ako ima listu dozvoljenih, primijenite `reportStaleEntries()` iz
   `scripts/check/lib/allowlist.mjs` tako da se zastarjeli unosi automatski detektuju.
5. Napišite test u `tests/unit/build/` koji pokriva logiku detekcije kapije.
6. Ažurirajte ovaj dokument (dodajte red u relevantnu tabelu poslova).

---

## Alati za agente: LSP-u-petlji (opciono)

Pored CI kapija, OmniRoute isporučuje **opcionu** `agent-lsp` skelu
(projektnu datoteku `.mcp.json`, Faza 7 Zadatak 15). Kreirajte `.mcp.json`
da izložite TypeScript jezički server agentima za kodiranje, tako da oni razriješe simbole /
dijagnostiku **prije** pisanja koda — pratilac "kompajliraj-prije-zahtjeva" za
`typecheck:core` koji siječe greške "izmišljenih simbola" u korijenu. Namjerno
nije automatski učitan (vi birate i verifikujete MCP↔LSP most); neispravan unos samo bilježi grešku konekcije i nikada ne prekida sesije.

---

## Zaostatak racionalizacije (pregled ROI-ja — Faza 9 Talas 3)

Ovaj inventar je usklađen sa `ci.yml` 2026-06-17 (prethodna verzija je izostavila
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Pregled ROI-ja usklađenog skupa
identificirao je sljedeće kandidate za racionalizaciju. **Spajanja su mehaničke CI
izmjene; promjene statusa/uklanjanja su odluke o pravilima rezervirane za operatera.** Ništa od navedenog
još nije primijenjeno.

**Također nije dokumentirano iznad** (savjetodavno, slab signal): zadatak `docs-lint`
(markdownlint + Vale, cijeli zadatak ima `continue-on-error`) i samostalni tokovi rada skenera
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` se nalazi u
`quality-baseline.json`, ali nije povezan s blokirajućim mehanizmom postepenog pooštravanja u `ci.yml` — metrika je
trenutno nepovezana.

### Spajanje / uklanjanje duplikata (mehanički, manji rizik)

Svaki kandidat je provjeren u odnosu na aktivno stanje kontrolnih tačaka 2026-06-17 (vjeruj, ali provjeri);
ispostavilo se da nekoliko „očiglednih” spajanja skriva dug i **nisu** neposredno primjenjiva.

- **`check:docs-sync` se pokreće dvaput** — samostalno u zadatku `lint` i ponovo unutar `check:docs-all` (`docs-sync-strict`) te u husky pre-commit kuki. ✅ **ZAVRŠENO** — samostalno pokretanje u zadatku `lint` je uklonjeno.
- **CVE skeniranje** — ❌ **NIJE jednostavno spajanje.** `audit:deps` bezuslovno ne prolazi za bilo koji CVE visoke/kritične ozbiljnosti; `check:vuln-ratchet` (osv) ne prolazi samo pri _regresiji_ u odnosu na osnovno stanje (trenutno 1 MODERATE). Različite semantike — uklanjanjem `audit:deps` izgubila bi se apsolutna kontrolna tačka za visoku/kritičnu ozbiljnost. Zadržati oba.
- **Otkrivanje ciklusa** — ✅ **ZAVRŠENO** (#15159 G-01/G-02). Stari tekst je ovdje nazivao `check:cycles` „zelenom, pažljivo odabranom” kontrolnom tačkom i opravdavao njeno zadržavanje kao blokirajuće jer je `check:circular-deps` (dpdm) prijavljivao 91 ciklus. To zeleno stanje bilo je **lažno zeleno**: `check:cycles` je skenirao 5 poddirektorija (450 datoteka), prepoznavao samo statičke izraze `import|export … from` i odbacivao svaki specifikator `@/` i `@omniroute/open-sse/`, pa nije mogao uočiti cikluse dinamičkog uvoza + aliasa koji su dominirali repozitorijem. Ispravljeno: kontrolna tačka sada prolazi kroz `src` + `open-sse` (5023 datoteke), prikuplja specifikatore iz TypeScript AST-a (tako da se `import("…")` računa, dok se `typeof import("…")` na poziciji tipa ne računa) i razrješava tsconfig `paths`. Pronalazi **14** ciklusa, a ne 0. Budući da se 14 prethodno postojećih ciklusa ne može ispraviti u PR-u kontrolne tačke, `check:cycles` je sada **mehanizam postepenog pooštravanja** (`--ratchet`, gornja granica `metrics.cycles.value = 14` u `quality-baseline.json`, `direction: down`) — blokira svaku _regresiju_, a broj se može samo smanjivati. CI pokreće `npm run check:cycles:ratchet`. Postepeno uklanjanje duga odvija se u sklopu **A-01**. `check:circular-deps` (dpdm) ostaje savjetodavan kao šire drugo mišljenje.
- **Složenost** — ✅ **ZAVRŠENO** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): jedan ESLint prolaz, brojanje prema ruleId-u kako bi osnovna stanja ciklomatske složenosti + maksimalnog broja linija i kognitivne složenosti ostala nezavisna; pojedinačne provjere `check:complexity` / `check:cognitive-complexity` ostaju za lokalni `--update`.
- **`/api` zaštita od halucinacija** — ✅ **ZAVRŠENO** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): jedan FS inventar za `src/app/api`, openapi-routes + docs-symbols i dalje izvještavaju nezavisno; pojedinačne provjere ostaju za lokalna pokretanja.
- **`check:node-runtime` se pokreće u 11 zadataka** — ⚠️ **nizak ROI.** Svaki je zaseban izvršitelj, a provjera traje <1s; ukupna ušteda je ~10s, uz gubitak jeftine zaštite za svaki zadatak. Nije vrijedno izmjena.
- **`typecheck:noimplicit:core` u CI lint zadatku** — ✅ **uklonjeno iz lint zadatka** (bilo je savjetodavno uz `continue-on-error`); blokirajuću površinu tipova čine `typecheck:core` + `check:type-coverage`. Lokalna skripta je zadržana.

### Promijeniti status / odlučiti (pravila operatera)

- `check:openapi-security-tiers` (savjetodavno) — ❌ **NE MOŽE se jednostavno učiniti blokirajućim.** Završava s kodom 0, ali upozorava da nekolicini `traffic-inspector` ruta pod `LOCAL_ONLY_API_PREFIXES` nedostaje anotacija `x-loopback-only: true`. Njegovo nametanje prvo zahtijeva dodavanje tih anotacija u `openapi.yaml`.
- `typecheck:noimplicit:core` (savjetodavno) — u velikoj mjeri ga zamjenjuje blokirajući mehanizam postepenog pooštravanja `check:type-coverage`. Pretvoriti ga u mehanizam postepenog pooštravanja ili ukloniti redundantni drugi `tsc` prolaz.
- `test:vitest:ui` (sada **blokirajuće**) — prethodno postojeći neuspjesi izričito su isključeni u `vitest.config.ts` pomoću komentara za praćenje `// #8618`; novi neuspjesi obaraju zadatak.
- `check:secrets` (gitleaks, blokirajući mehanizam postepenog pooštravanja zamrznut na 3 dokumentirana lažno pozitivna rezultata) — dodati ta 3 rezultata na listu dozvoljenih kako bi se došlo do 0 ili ga spustiti na savjetodavni status. Preklapa se s GitHubovim izvornim skeniranjem tajni + `check:public-creds`.
- `check:pr-evidence` (blokirajuće, pretražuje prozni tekst tijela PR-a) — visok rizik od lažno pozitivnih rezultata; uklanjanje bi oslabilo provođenje strogog pravila br. 18, tako da je ovo stvarna odluka o pravilima.
- `semgrep` (savjetodavni samostalni tok) — preklapa se s CodeQL-om za OWASP porodice; povezati njegovo osnovno stanje s mehanizmom postepenog pooštravanja ili ga ukloniti.

---

## Povezana dokumentacija

- Lanac snabdijevanja (provenance, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — kapija pariteta skupa ključeva

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, posao `i18n-ui-coverage`).
Upoređuje skup listovnih ključeva svakog `src/i18n/messages/<locale>.json` sa `en.json` i ne prolazi ako postoji bilo koji nedostajući ili dodatni list, bez obzira na to kada je ključ dodan. `__MISSING__:` rezervisana mjesta se računaju kao prisutna (njihov sadržaj je stvar kapije omjera). Ovo je apsolutni komplement dvije kapije zasnovane na diff-u/procentima: `check-ui-keys-coverage` nameće prag od 80 % po lokalu (43 nedostajuća ključa od ~13.000 i dalje daju 99,7 %) i `check-new-key-coverage` procjenjuje samo ključeve koje PR dodaje u `en.json`. Lokalna serija (batch) se generiše iz `en.json` na dan kada je njena grana isječena i prevodi se danima dok baza nastavlja dodavati ključeve; batch PR sam po sebi ne dodaje nijedan ključ, tako da su oba srodnika ostala tiha kada je batch 1 (#13044) stigao sa 43 ključa manje u devet lokala, a batch 2 (#13660) sa 10 ključeva manje u osam (15.09.2026.). Popravite crvenu (grešku) sa `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; `extra` list znači da ga je izvor odbacio — izbrišite ga iz lokala. `--warn` izvještava bez neuspjeha. `--catalog=cli` pokreće isto poređenje nad `bin/cli/locales` (`npm run i18n:check-keys:cli`); oba koraka žive u poslu `i18n-ui-coverage`.

#### `check-new-key-coverage` — i18n kapija za nove ključeve

Srodnik `check-ui-value-drift`. Taj hvata englesku vrijednost koja je **prepisana** dok su njeni prijevodi ostavljeni iza; ovaj hvata engleski ključ koji je **dodan** dok ga neki lokali nikada nisu primili.

`check-ui-keys-coverage` ne može vidjeti ovu klasu: ona nameće procentualni prag po lokalu, a jedanaest nedostajućih ključeva od ~13.000 ostavlja pokrivenost na 99,9%. Procenat po jeziku ne može izraziti "ova funkcija je isporučena neprevedena" — cijela funkcija može sletjeti u novi lokal bez teksta i nikada ne pomjeriti broj.

Incident koji kodira: Faza 3 Orchestration Canvas-a prevela je svojih jedanaest ključeva kroz 42 lokala koji su postojali u to vrijeme. Sati kasnije, EU-jezični batch (#13044) doveo je repo do 51 lokala, a devet pridošlica (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ih nikada nije primilo. `deepMergeFallback` zamjenjuje engleski za nedostajući ključ, tako da je način neuspjeha bio nepreveden UI umjesto praznog UI-a — stvaran, i tih po konstrukciji.

Kao i njegov srodnik, on je **svjestan razlika (diff-aware)**, upoređujući engleski na bazi spajanja (merge base) sa radnim stablom, tako da prethodno postojeće praznine ostaju zamrznute i kapiji nije bila potrebna migracija da bi se uključila.

**Oznaka `__MISSING__:<english>` ga ne zadovoljava (od 17.09.2026.).** To je nekada bilo dokumentovano odlaganje — runtime se vraća na ispravan engleski — sve dok osam PR-ova funkcija 16.09.2026. nije dodalo 61 ključ i utisnulo oznaku u svih 65 lokala umjesto prevođenja: ova kapija je prihvatila svaki, ništa nije blokiralo PR-ove, a blokirajuća kapija omjera stvarnog prijevoda je tada pala na vrhu izdanja za sve (pt-BR 3,2 % > 2,5 % + 0,5). Oznaka se sada procjenjuje kao nedostajući prijevod. Popravite crvenu (grešku) sa `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, ili sve lokale paralelno sa `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`, detached-safe, odbija da se pokrene bez `OMNIROUTE_TRANSLATION_*` env). Ključ koji mora ostati na engleskom (fiksirani naziv proizvoda/mašine/fleg-a) pripada `scripts/i18n/untranslatable-keys.json`, nikada iza oznake. `vi` potpuno zabranjuje oznake (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — kapija za parkirane testove

Datoteka na listi `exclude` u `vitest.config.ts` je test koji se ne pokriva, i izgleda kao pokrivenost svakome ko čita stablo. Šezdeset dvije datoteke su se akumulirale iza komentara `// #8618 — prethodno postojeći neuspjeh; uklonite ovo isključenje kada se popravi`. Problem #8618 je zatvoren 11.08.2026. dok je lista koju je pratio porasla sa 45 unosa na 62, pri čemu je svaki novi naslijedio komentar koji ukazuje na mrtav problem. Kada je lista konačno izmjerena datoteku po datoteku (#13204), **51 od 62 je prošlo protiv trenutnog stabla bez promjene izvora**.

Kapija zahtijeva da svako isključenje koje se razrješava u stvarnu datoteku (a) imenuje problem praćenja i (b) pojavi se u `config/quality/vitest-exclusions.json` sa svojim izmjerenim statusom, tako da je dodavanje jednog diff koji se može pregledati u namjenskoj datoteci, a ne još jedan red u nizu od 60 unosa. Namjerno ne ponovo pokreće isključene testove — to košta ~10 minuta i pripada periodičnom poslu; inventar bilježi kada je svaki posljednji put izmjeren.
