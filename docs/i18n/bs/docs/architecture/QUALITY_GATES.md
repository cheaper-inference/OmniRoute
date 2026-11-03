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

## Inventar gateova i izvršni profili

### Prijem kandidata

CI i Quality Gates workflowi svaki emituju stabilnu presudu: `Gate / CI` i
`Gate / Quality`. Njihova verzionisana politika prijema navodi svaki upstream
posao kao obavezan ili savjetodavan. Primjenjiv obavezni posao mora uspjeti:
nedostajući, otkazani, preskočeni, neriješeni i nepoznati rezultati ne mogu
uspostaviti PASS. Važeća klasifikacija samo za dokumentaciju ili samo za katalog
može učiniti kodnu traku neprimjenjivom; draft PR nije prihvaćen kandidat.
Oznaka `hotfix` ne oslobađa od dostavljanja dokaza.

Oba workflowa obuhvataju PR-ove prema main/release granama, push događaje na
`main`, ručno pokretanje i merge-group događaje. Push, dispatch i merge-group
pokreću puni odabir. Push događaji na `release/**` ih ne pokreću (2026-10-18):
svaka izmjena je već pokrenula matricu na svom PR-u, a spojena kombinacija je posao
Release-Green-a (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forkovi i merge grupe
koriste hostovane runnere za poslove koji bi inače odabrali self-hosted
runere; dovoljan kapacitet hostovanih runera mora biti provjeren prije uvođenja.

Svaka JSON potvrda identifikuje odjavljeni SHA, pokretanje workflowa i pokušaj.
CLI odbija nepodudaranje checkout/event SHA vrijednosti. Testovi workflowa
vezuju članstvo u politici za listu `needs` posla presude, tako da nova ili
uklonjena traka ne može neprimjetno nestati. Potvrde obuhvataju vlastiti
workflow, a ne objavljivanje, isporuku ili interne detalje postojećeg
savjetodavnog skenera. Aktiviranje oba naziva provjera u pravilima grane zasebna
je administrativna izmjena; samo dodavanje ovih poslova ne štiti granu.

### Inventar statičkog skeniranja

Verzionisani inventar npm-alijasa i članstvo u statičkom skeniranju nalaze se u
`config/quality/gate-manifest.json`. Pokrenite `npm run check:gate-manifest` da
provjerite nazive skripti i tačne naredbe u odnosu na `package.json`; dodavanja,
uklanjanja i promjene naredbi obaraju i lokalnu kuku i poslove klasifikacije
izmjena u CI-ju. Alijas nije posao workflowa, instanca matrice niti testni slučaj:
ovi brojevi se ne smiju predstavljati kao međusobno zamjenjivi.

Koristite `npm run quality:scan -- --list` ili `npm run quality:scan:fast -- --list`
da pregledate odabrane alijase bez njihovog izvršavanja. Runner poziva npm
ulaznu tačku, pa je njegovo izvršno okruženje (uključujući Bun gdje je
konfigurisan) očuvano. Manifest bilježi alijase izvan tih profila kao zasebno
pozvane, a naredbe za održavanje zabranjene su u profilima skeniranja samo za
čitanje.

Ovi profili obuhvataju samo statičko skeniranje. Oni ne potvrđuju testove
proizvoda, pokrivenost, pakovanje, vanjske provjere niti potpuno prihvatanje
kandidata za izdanje. Prijem u workflowu koristi povezane
`config/quality/admission-policy.json` i `scripts/quality/admission-verdict.mjs`.
Profili posmatrača izdanja ostaju odvojeni; zasebno pregledajte njihove
primjenjive provjere i potvrde. Inventar u nastavku je referenca, a ne dokaz da
je gate zaista pokrenut.

Skripte se nalaze pod `scripts/check/` (gateovi politike) i
`scripts/quality/` (mehanizam ratcheta). Izvor istine za CI je
`.github/workflows/ci.yml`.

### Brzi put za release PR (`quality.yml`)

`.github/workflows/quality.yml` dopunjuje CI na main/release PR-ovima, push
događajima na `main`, dispatch događajima i merge grupama. PR-ovi koriste brze
provjere filtrirane prema putanjama. Trajno onemogućena duplicirana izgradnja je
uklonjena; stvarne provjere izgradnje/pakovanja/pokretanja ostaju u CI-ju.

| Posao                                            | Opseg                                                                                                                                                                                                                       | Blokiranje              |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | PR-ovi dokumentacije/koda; reference API dokumentacije i docs-all                                                                                                                                                           | Da                      |
| `Fast Quality Gates`                             | Kodni PR-ovi; statičke provjere, typecheck, typecheck kontrolne table, testovi jedinica na koje je izmjena uticala                                                                                                          | Da                      |
| `Forgotten sibling tests`                        | Kodni PR-ovi; izmijenjeni moduli praćeni do statičkih potrošača i kandidatskih sestrinskih testova; putanje barrel i dinamičkog importa prijavljuju se kao savjetodavna dijagnostika, uz navedene izuzetke dozvoljene liste | **Savjetodavno**        |
| `Vitest (fast-path)`                             | Kodni PR-ovi; brzi vitest paket                                                                                                                                                                                             | Da                      |
| `Unit Tests fast-path`                           | Kodni PR-ovi; paket testova jedinica podijeljen u 4 dijela                                                                                                                                                                  | Da                      |
| `No new ESLint warnings`                         | Kodni PR-ovi; lint zaštita svjesna potiskivanja                                                                                                                                                                             | Da, uključujući forkove |
| `Merge integrity (changelog + generated skills)` | PR-ovi koji nisu draft; sinhronizacija changeloga i generisanih vještina                                                                                                                                                    | Da, uključujući forkove |

#### Izvještaj o zaboravljenim sestrinskim testovima

`npm run check:forgotten-sibling-tests` ponovo koristi razrješavač uvoza koji stoji iza mape uticaja testova.
Za svaki izmijenjeni produkcijski modul prijavljuje determinističke lance
`changed module/symbol -> static consumer -> candidate sibling test` kada kandidat
test nedostaje iz diff-a zahtjeva za povlačenje. Markdown sažetak i JSON rezultat zadržavaju se kao
artefakt radnog toka `forgotten-sibling-tests` radi kalibracije prije bilo kakvog uvođenja blokiranja.

Ponovni izvozi iz barrel modula i dinamički uvozi služe samo kao dijagnostika razrješavanja; nikada ne stvaraju
nalaz koji blokira. Pregledani izuzeci nalaze se u
`config/quality/forgotten-sibling-allowlist.json`. Svaki unos mora navesti korisnika i kandidata
test, pružiti konkretno obrazloženje i sadržavati vezu ka GitHub problemu ili zahtjevu za povlačenje. Neispravni
unosi odbijaju se po principu sigurnog zatvaranja. Izuzeci ne mogu potisnuti obrisani kandidat za test niti diff
koji dodaje `.skip`/`.todo`; slabljenje tvrdnji i drugo maskiranje ostaju u nadležnosti nezavisno blokirajuće
provjere `check:test-masking`.

### Zadatak: `lint`

Izvršava se na svakom PR-u ka grani `main`. Blokira spajanje u slučaju neuspjeha.

| Skripta (`npm run ...`)           | Provjerava                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Blokira                                      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `check:node-runtime`              | Verzija Node.js nalazi se unutar podržanog raspona                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                           |
| `check:cycles`                    | Cirkularne importe unutar cijelog `src/` + `open-sse/` (zasnovano na AST-u, razriješene `tsconfig` `paths`). Samostalni poziv završava s kodom 1 kad god postoji bilo koji ciklus (fail-closed od #15281) i navodi SCC-ove. `check:cycles:ratchet` (ono što CI pokreće) blokira kada broj premaši ograničenje `metrics.cycles` u `quality-baseline.json` — trenutno 14, `direction: down`, tako da se može samo smanjivati (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da (ratchet)                                 |
| `check:boundary`                  | Povezanost `open-sse → src`: jedinstveni uvozi od datoteke do datoteke iz enginea u aplikaciju (`scripts/quality/measure-boundary.mjs`; lista veza predstavlja zaostatak za sanaciju v4 jezgre/podjele modula). Samostalni poziv daje savjetodavni izvještaj (isto kao `quality:boundary`). `check:boundary:ratchet` (ono što CI pokreće, također u petlji ratchet provjera `quality.yml` za brza vrata) blokira kada broj premaši ograničenje `metrics.boundaryOpenSseToSrc` u `quality-baseline.json` — postavljeno na izmjerenih 771, `direction: down`; `--update` ga može samo smanjiti; relativno u odnosu na osnovu na PR-ovima (`--base-ref`, pogledajte ispod)                                                                                                                                                                                                                                                                                                                                                                          | Da (ratchet)                                 |
| `check:route-validation:t06`      | Zod šeme prisutne su na svim rutama (pravilo Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                           |
| `check:any-budget:t11`            | Broj `@ts-expect-error // any` ne premašuje budžet (Tier 11 katraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                           |
| `check:provider-consistency`      | Svaki provider u `providers.ts` ima odgovarajući unos u `providerRegistry.ts` (i obrnuto, unutar liste dozvoljenih)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                           |
| `check:model-lifecycle`           | Tri ručno održavane tabele usmjeravanja ostaju usklađene s verzijom životnog ciklusa prijavljenom u repozitoriju (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ne dodjeljuje bodove nijednom povučenom id-u koji `REGISTRY` može usmjeriti; svako odredište u `BUILT_IN_ALIASES` prisutno je u `REGISTRY` i ne nalazi se u snimku povučenih id-jeva; svaki povučeni id koji je još uvijek u `REGISTRY` prosljeđuje se ili je naveden u `allowedRetiredInCatalog`; i nijedan izvor ili odredište u `DEFAULT_DEGRADATION_MAP` ne pojavljuje se kao povučen u tom snimku. Ovo ne dokazuje da model trenutno poslužuje aktivni upstream. Rad van mreže — poredi se s `config/quality/model-lifecycle.json`, koji se ručno osvježava pomoću `npm run quality:refresh-model-lifecycle` (mreža; nije povezan s CI-jem). `allowedRetiredInCatalog` je mehanizam postepenog smanjivanja: unos dodajte samo uz issue za praćenje.                                                                                                                           | Da                                           |
| `check:fetch-targets`             | Svaki `fetch("/api/...")` u klijentskom `src/` razrješava se na stvarni `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                           |
| `check:deps`                      | Sve zavisnosti koje se mogu instalirati pomoću `npm install` kroz svaki `package.json` u repozitoriju nalaze se u `dependency-allowlist.json`; označavaju se novi paketi bez zaključane verzije ili slopsquatted paketi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `audit:deps`                      | `npm audit` (root + electron) — nema upozorenja visokog/kritičnog nivoa (preklapa se s osv `check:vuln-ratchet`; pogledajte Backlog racionalizacije)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                           |
| `check:lockfile`                  | Integritet datoteke `package-lock.json` — https registar, hash-vrijednosti integriteta, bez nadjačavanja hosta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                           |
| `check:licenses`                  | SPDX lista dozvoljenih licenci za produkcijske zavisnosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                           |
| `check:tracked-artifacts`         | Bez artefakata izgradnje / predanih simboličkih veza `node_modules` (također se pokreće u husky pre-commit; pre-push je namjerno ograničen — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                           |
| `check:ai-attribution`            | Bez završne oznake `Co-Authored-By` AI/bota ili podnožja generiranog pomoću AI-ja u commitima, naslovu ili tijelu PR-a — Strogo pravilo #16 (u petlji brzih provjera u `quality.yml` za PR→`release/**` — čita korisni teret događaja, ne radi izvan PR-ova — i korak samo za PR u lint provjeri u `ci.yml` za PR→`main`; također i husky `commit-msg` hook; ljudski koautori su dozvoljeni; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:vitest-exclusions`         | Svako Vitest izuzimanje navodi problem za praćenje i pojavljuje se u `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                           |
| `check:file-size`                 | Izvorne datoteke (`.ts`/`.tsx` u `src/`, `open-sse/`, `electron/`, `bin/`) ostaju unutar `cap`, a testne datoteke (`*.test.ts(x)`) unutar `testCap`; datoteke zamrznute u `file-size-baseline.json` (`frozen` / `testFrozen`) ne smiju premašiti svoju zabilježenu veličinu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                           |
| `check:error-helper`              | Odgovori na greške u izvršiocima/rukovateljima koriste `buildErrorBody()` / `sanitizeErrorMessage()` (Strogo pravilo #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                           |
| `check:migration-numbering`       | SQL datoteke migracija imaju sekvencijalne brojeve, bez praznina ili duplikata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                           |
| `check:public-creds`              | Nema literalnih OAuth `client_id`/`client_secret` ili Firebase Web ključeva izvan `publicCreds.ts` (Strogo pravilo #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `check:db-rules`                  | Nema neobrađenog SQL-a izvan modula `src/lib/db/`; nema barrel-importa iz `localDb.ts` (Stroga pravila #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:known-symbols`             | Izvršioci provajdera, strategije rutiranja i prevodioci registrovani u svojim dispatch tabelama odgovaraju datotekama na disku — nema siročadi ili nedefinisanih simbola                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                           |
| `check:route-guard-membership`    | Svaka ruta koja pokreće podređeni proces klasifikovana je pomoću `isLocalOnlyPath()` (Stroga pravila #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:test-discovery`            | Svaka datoteka `*.test.ts` / `*.spec.ts` u repozitoriju prikuplja se pomoću najmanje jednog pokretača testova (mehanizam postupnog pooštravanja: lista napuštenih datoteka u `test-discovery-baseline.json` može se samo smanjivati)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                           |
| `check:test-tla-order`            | Nijedna `node:test` datoteka unutar `tests/unit` ne registruje test, doseže `await` na najvišem nivou, a zatim registruje još testova (#18045; mehanizam postupnog pooštravanja: `test-tla-order-allowlist.json` može se samo smanjivati)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                           |
| `check:agent-skills-sync`         | Generisani artefakti vještina agenata podudaraju se sa svojim izvornim katalogom (nema odstupanja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:provider-asset-provenance` | Logotipi/sredstva pružalaca imaju zabilježen unos o porijeklu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `lint:json`                       | JSON konfiguracijske datoteke mogu se analizirati i zadovoljavaju pravila lintovanja repozitorija                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | Kompilacija TypeScripta bez grešaka (upozorenja su samo informativna)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                           |
| `typecheck:noimplicit:core`       | Strogi `noImplicitAny` — usmjeren prema budućnosti; mnogim postojećim pozivnim mjestima još uvijek su potrebne anotacije                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **Savjetodavno** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ograničen na `src/app/(dashboard)/**` (#7033) — odabrana lista od 27 datoteka za `typecheck:core` ne uključuje nijedan dashboard TSX, a `next build` ga također nikada ne provjerava tipove (`next.config.mjs` postavlja `ignoreBuildErrors: true`), pa su regresije napuštenih identifikatora tamo (#6625/#6909) bile nevidljive CI-ju. Upoređuje razlike u odnosu na zamrznutu osnovnu vrijednost broja po datoteci/TS-kodu (`config/quality/dashboard-typecheck-baseline.json`, isti obrazac zastarjele primjene kao kod `check:known-symbols`) — samo NOVA greška iznad osnovnog broja obara provjeru; smanjite osnovnu vrijednost pomoću `--update` kada se postojeća greška ispravi.                                                                                                                                                                                                                                                                                                                                                 | Da                                           |
| `check:build-typecheck`           | Provjera tipova produkcije za cijelu aplikaciju nad `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), koju ne pokrivaju površina od 27 datoteka za `typecheck:core` niti provjera dashboarda. Upoređuje razlike u odnosu na `config/quality/build-typecheck-baseline.json`; nova ili povećana vrijednost po paru (datoteka, kod) obara provjeru, a manja vrijednost traži od vas da smanjite osnovnu vrijednost. `--update` odbija rad dok pokretanje sadrži novi ili povećani par, osim ako se proslijedi `--force-regressions`, i odbija novoutišanu datoteku osim ako se proslijedi `--force-nocheck`, tako da su proširivanje osnovne vrijednosti radi uspješnog prolaza i dodjela trajnog utišavanja dva odvojena promišljena postupka. Samostalni `--force` se odbija. Također skenira opseg izgradnje u potrazi za `@ts-nocheck` prema `config/quality/ts-nocheck-baseline.json`, jer datoteka koja ga koristi uopće ne prijavljuje dijagnostiku i inače bi bila nevidljiva svakoj provjeri. | Da                                           |

#### Dva programa za provjeru tipova daju različite odgovore

`typecheck:core` i `check:build-typecheck` kompajliraju različite programe pod različitim
opcijama, a ista datoteka može biti bez grešaka u jednom, a puna grešaka u drugom.

`tsconfig.build.json` postavlja `"strict": false`, pa je `noImplicitAny` isključen. Osnovna
konfiguracija kompajlira odabranu listu od 27 datoteka sa strožim opcijama i prati graf uvoza
svakog unosa, pa se datoteke koje se nikada ne pojavljuju u programu izgradnje tamo ipak
provjeravaju.

Posljedica je važna kada procjenjujete da li je datoteka tipizirana: **nula dijagnostika
pod `check:build-typecheck` ne znači nula grešaka**. Uklanjanje `@ts-nocheck` iz 26
datoteka pokazalo je da je njih 23 bez grešaka u programu izgradnje; šesnaest od tih
datoteka otkrilo je oko 120 grešaka implicitnog tipa any u strožem programu. Provjerite
oba prije nego što datoteku proglasite čistom.

### Posao: `quality-gate`

Pokreće se nakon `test-coverage`. Blokira spajanje u slučaju neuspjeha.

| Skripta                      | Provjerava                                                                                                                                                                              | Blokira                  |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | Emituje `quality-metrics.json` (broj upozorenja ESLint-a, pokrivenost iz spojenog izvještaja shardova)                                                                                  | Da (uzvodno od ratcheta) |
| `quality:ratchet`            | Nijedna metrika u `quality-baseline.json` nije nazadovala (ESLint upozorenja ≤ osnovna vrijednost; pokrivenost ≥ osnovna vrijednost)                                                    | Da                       |
| `check:duplication`          | Dupliciranje koda (jscpd@4) ne premašuje osnovnu vrijednost u `quality-baseline.json`                                                                                                   | Da                       |
| `check:complexity`           | Ciklomatska složenost na nivou datoteke ne premašuje ograničenje (osnovni ESLint `complexity` + `max-lines-per-function`)                                                               | Da                       |
| `check:cognitive-complexity` | Ratchet kognitivne složenosti (`eslint-plugin-sonarjs`) — zasebno ESLint pokretanje; CI pokreće oba spojena u jednom koraku `check:complexity-ratchets`                                 | Da                       |
| `check:dead-code`            | Ratchet nekorištenih izvozâ / datoteka (knip) ne nazaduje u odnosu na osnovnu vrijednost                                                                                                | Da                       |
| `check:compression-budget`   | Budžet referentne vrijednosti kompresije — uštede tokena po mehanizmu ne smiju nazadovati                                                                                               | Da                       |
| `check:type-coverage`        | Ratchet procenta tipiziranosti (`type-coverage`) ne nazaduje; uglavnom obuhvata `typecheck:noimplicit:core`                                                                             | Da                       |
| `check:codeql-ratchet`       | Broj otvorenih CodeQL upozorenja ne nazaduje (čita putem `gh api`; preskače bez greške bez tokena) — učestalost osvježavanja i ručno pokretanje: pogledajte „CodeQL ratchet“ u nastavku | Da                       |

### Posao: `quality-extended`

Cijeli posao je savjetodavan (`continue-on-error: true`). Ratcheti zasnovani na npm-u
pokreću se stvarno; vanjski skeneri se instaliraju putem `gh release download` i
samostalno preskaču izvršavanje (izlaz 0) kada binarna datoteka još nije prisutna.

| Skripta                  | Provjerava                                                                                                                                                                                                                                        | Blokiranje                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `check:circular-deps`    | Nema kružnih zavisnosti (dpdm)                                                                                                                                                                                                                    | **Savjetodavno**                                  |
| `check:bundle-size`      | Veličina paketa ne premašuje ograničenje                                                                                                                                                                                                          | **Savjetodavno**                                  |
| `check:secrets`          | Skeniranje tajni (gitleaks) — preskače ako binarna datoteka nije prisutna                                                                                                                                                                         | **Savjetodavno**                                  |
| `check:vuln-ratchet`     | Ranjivosti zavisnosti (osv-scanner) ne nazaduju — preskače ako binarna datoteka nije prisutna                                                                                                                                                     | **Savjetodavno**                                  |
| `check:workflows`        | Linting radnih tokova (actionlint + zizmor); nedostajući/neispravni skeneri, nevažeći izvještaji ili nedostajuća osnovna vrijednost ratcheta uzrokuju neuspjeh kao NEPOTPUNO. Važeći nalazi slijede odabranu strogu/savjetodavnu/ratchet politiku | Izvršavanje obavezno; zizmor ratchet blokira u CI |
| `check:openapi-breaking` | Prekidajuće promjene javnog API ugovora (`openapi.yaml`) u odnosu na osnovnu granu (oasdiff) — emituje `openapiBreaking=N`; preskače ako oasdiff nije prisutan ili se osnovna specifikacija ne može razriješiti                                   | **Savjetodavno**                                  |

### Posao: `docs-sync-strict`

Pokreće se pri svakom PR-u prema `main`. Blokira spajanje ako ne uspije.

| Skripta                        | Provjerava                                                                                                                                                                                      | Blokira                       |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `check:docs-all`               | Meta-kontrola koja sekvencijalno pokreće 6 kontrola u nastavku                                                                                                                                  | Da                            |
| ↳ `check:docs-sync`            | Konzistentnost verzija u CHANGELOG / OpenAPI / llm.txt                                                                                                                                          | Da                            |
| ↳ `check:docs-counts`          | Brojevi u proznom tekstu (broj providera, broj migracija itd.) unutar su prozora za postupno usklađivanje sa stvarnim brojevima                                                                 | Da                            |
| ↳ `check:env-doc-sync`         | Svaka env varijabla u `.env.example` dokumentovana je u tabeli dokumentacije i obrnuto                                                                                                          | Da                            |
| ↳ `check:deprecated-versions`  | U dokumentaciji nema zastarjelih nizova verzija                                                                                                                                                 | Da                            |
| ↳ `check:doc-links`            | Interni markdown linkovi u dokumentaciji vode do stvarnih datoteka (`[text]`/`(path)` oblik)                                                                                                    | Da                            |
| ↳ `check:fabricated-docs`      | Rute, env varijable, CLI naredbe, nazivi hookova i putanje datoteka navedene u dokumentaciji postoje u bazi koda. Stroga kontrola putem `--strict`; bez zastavice se neuspjeh samo prijavljuje. | Da (putem `--strict` u CI-ju) |
| `check:cli-i18n`               | Nizovi CLI naredbi prisutni su u svim i18n lokalizacijskim datotekama                                                                                                                           | Da                            |
| `check:openapi-coverage`       | OpenAPI specifikacija pokriva najmanje prag stvarnih ruta definisan postupnim usklađivanjem                                                                                                     | Da                            |
| `check:openapi-security-tiers` | Oznake nivoa sigurnosti u `openapi.yaml` konzistentne su s klasifikacijama u `routeGuard.ts`                                                                                                    | **Savjetodavno**              |
| `check:openapi-routes`         | Svaka putanja u `openapi.yaml` vodi do stvarnog `route.ts` (zaštita od halucinacija)                                                                                                            | Da                            |
| `check:docs-symbols`           | Svaka `/api/...` referenca u `docs/**/*.md` vodi do stvarnog `route.ts` (zaštita od halucinacija)                                                                                               | Da                            |
| `i18n translation drift`       | Ključevi koji nisu prevedeni u i18n lokalizacijskim datotekama — samo upozorenje                                                                                                                | **Savjetodavno**              |

Dvanaest README SVG-ova u `docs/diagrams/` generisano je (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` regeneriše sve). Svaki ima jedinični test za poređenje bajtova
(`tests/unit/docs/readme-*-svg.test.ts`, posao `test-unit`) koji ne prolazi kada je predata datoteka
zastarjela, a `check:docs-counts` čita kanonske brojeve iz njihovih `<text>` čvorova — zbog toga
korak za pretvaranje u konture zadržava svaki pretvoreni niz u datoteci kao nevidljivi `<text>`. Provjera
kanonskih brojeva SVG-ova čita datoteke navedene u
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, kao i `public/images/tier-flow-dark.svg` i `tier-flow-light.svg`;
tvrdnje o besplatnom korištenju zauvijek, unosu u katalog, periodičnom poolu i faktorima bodovanja takođe čitaju
`promise-pillars.svg`, `free-tier-budget.svg` i `strategies-grid.svg`. `free-tier-budget.svg`
crpi svoje brojke iz aktivnog učitavača kataloga, pa promjena u `FREE_MODEL_BUDGETS` ili
prikaznog naziva providera zaustavlja CI dok se ta datoteka ne regeneriše.

### Posao: `i18n-ui-coverage`

| Skripta                           | Provjerava                                                                                                                                                                                                      | Blokira          |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage` (inline) | Pokrivenost UI i18n ključeva je ≥ 65%                                                                                                                                                                           | Da               |
| `check-ui-value-drift` (inline)   | Prepisana engleska **vrijednost** ne ostavlja zastarjeli prijevod                                                                                                                                               | Da               |
| `check-new-key-coverage` (inline) | **Novi** engleski ključ preveden je na svakom lokalizacijskom jeziku — oznaka `__MISSING__:` se odbija                                                                                                          | Da               |
| `check-translation-ratio`         | Omjer stvarnih prijevoda po lokalizacijskom jeziku (identični engleskom / zamjenski znak / nedostajući, izuzeto iz allowliste) ne smije premašiti `config/quality/i18n-translation-baseline.json` + toleranciju | **Savjetodavno** |

Potreban je `fetch-depth: 0` — kontrola promjene vrijednosti upoređuje `en.json` s osnovom spajanja.

#### `check-ui-value-drift` — kontrola zastarjelih prijevoda

Hvata jedinu i18n regresiju koju ostale strukturne provjere ne mogu otkriti: engleska vrijednost
se ponovo napiše, a prevodi izvedeni iz _prethodnog_ engleskog teksta ostanu nepromijenjeni, pa
korisnici koji ne koriste engleski i dalje čitaju samouvjereno formulisan, sada netačan tekst.

Ovo se zaista našlo u produkciji. `oauthModal.googleOAuthWarning` je ponovo napisan kada je dodat
Antigravity pomoćnik za prijavu (#5203); **39 od 43 lokalizacije** zadržalo je tekst koji operaterima govori da
„kopiraju puni URL i zalijepe ga ispod“ — tok koji se za tog pružaoca ne može dovršiti. Ostalo je
neprimijećeno do #8463 jer:

- `sync-ui-keys` dopunjava samo ključeve koji su **odsutni**, nikada one koji su **zastarjeli**;
- `check-ui-keys-coverage` broji _prisustvo_ ključa, pa se zastarjeli prevod računa kao pokriven;
- `check-translation-drift` prati dokumentacijske odraze u `docs/i18n/<locale>/**.md` —
  nikada ne čita `src/i18n/messages/*.json`. Blokiranje u poslu `docs-sync-strict` od ponovne sinhronizacije
  u 2026-09: izmijenite osnovni dokument → `npm run i18n:run -- --files=<doc>` (na nivou odjeljka, jeftino).

**Svjesno razlika, ne zasnovano na osnovnoj vrijednosti.** Upoređuje `en.json` na osnovi spajanja sa
radnim stablom; za svaki ključ čija se engleska vrijednost promijenila, svaka lokalizacija koja još uvijek
sadrži neizmijenjen prevod je zastarjela. Ovo namjerno **zamrzava postojeći dug** — razlika ne može otkriti
iz kojeg je starog engleskog teksta nastao dugotrajni prevod, pa provjera procjenjuje samo ono što trenutna
izmjena dotiče. Alternativa (osnovna vrijednost heša po ključu) koštala bi generisanu datoteku od približno
600 KB, 3× veću od najveće postojeće osnovne datoteke, i mijenjala bi se pri svakom i18n PR-u.

Dva načina da se ovo ispuni:

1. ažurirajte pogođene prevode, ili
2. postavite ih na `__MISSING__:<new english>` — izvršavanje tada prikazuje ispravljeni engleski tekst
   (`src/i18n/request.ts::deepMergeFallback`, #7258), a ključ se stavlja u red čekanja za prevod.

Ako se **značenje** stringa promijenilo, prednost dajte **preimenovanju ključa**: novi ključ ne može naslijediti
zastarjeli prevod. To je obrazac korišten u #8463.

```bash
npm run i18n:check-value-drift          # strogo (ono što CI pokreće)
npm run i18n:check-value-drift:warn     # samo izvještaj
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Izlazni kod je 0 uz `SKIP reason=base-unresolved` kada se osnovni katalog ne može pročitati (plitki
klon bez osnovne reference), po uzoru na `check-openapi-breaking`.

### Posao: `i18n`

Potpuna matrica i18n provjere (jedan posao po lokalizaciji). Cijeli posao je savjetodavan.

| Skripta                         | Provjerava                        | Blokiranje                                                   |
| ------------------------------- | --------------------------------- | ------------------------------------------------------------ |
| `validate_translation.py quick` | Potpunost prevoda po lokalizaciji | **Savjetodavno** (`continue-on-error: true` za cijeli posao) |

### Posao: `pr-test-policy`

Pokreće se samo za zahtjeve za spajanje.

| Skripta                | Provjerava                                                                                                                                                        | Blokiranje |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | Zahtjevi za spajanje koji mijenjaju produkcijski kod u `src/`, `open-sse/`, `electron/` ili `bin/` moraju uključiti ili ažurirati testove (Čvrsto pravilo #8)     | Da         |
| `check:test-masking`   | Izmijenjene testne datoteke ne smanjuju ukupan broj asercija niti dodaju tautologije `assert.ok(true)`                                                            | Da         |
| `check:pr-evidence`    | Tijelo zahtjeva za spajanje navodi dokaze testiranja/VPS-a za izmjenu (mehanizuje Čvrsto pravilo #18 pretraživanjem teksta zahtjeva — krhko, pogledati Zaostatke) | Da         |

### Posao: `test-vitest`

Pokreće se nakon `build`. Blokira spajanje u slučaju neuspjeha.

| Paket            | Provjerava                                               | Blokiranje                                                                                                      |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 alata), autoCombo, keš — vitest pokretač | Da                                                                                                              |
| `test:vitest:ui` | Testovi UI komponenti — vitest pokretač                  | **Blokirajuće** — postojeći neuspjesi su izričito isključeni u `vitest.config.ts`; novi neuspjesi obaraju posao |

### Noćni tokovi rada (zakazani, savjetodavni)

Pokreću se prema cron rasporedu (i putem `workflow_dispatch`), nikada za zahtjeve za spajanje. Svi su savjetodavni.

| Tok rada               | Validira                                                                                                                                                                   | Blokiranje       |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | testove svojstava fast-check s nasumičnim početnim brojem + velikim brojem pokretanja                                                                                      | **Savjetodavno** |
| `nightly-resilience`   | prag rasta heap memorije, ubrizgavanje grešaka haosa, učitavanje/test izdržljivosti pomoću k6                                                                              | **Savjetodavno** |
| `nightly-llm-security` | zaštitu od prompt-injekcija promptfoo (režim blokiranja) + sonde garak (preskače se bez tajne pružaoca)                                                                    | **Savjetodavno** |
| `nightly-schemathesis` | fuzz testiranje OpenAPI ugovora (schemathesis) protiv aktivnog OmniRoute-a pomoću `docs/openapi.yaml` — otkriva kršenja specifikacije / neobrađene greške 500 (Faza 8 B.4) | **Savjetodavno** |
| `nightly-mutation`     | rezultat Stryker testiranja mutacijama u brzoj stazi jediničnih testova — preživjeli mutanti otkrivaju slabe asercije                                                      | **Savjetodavno** |
| `nightly-compat`       | matricu kompatibilnosti Node enginea u podržanim rasponima `engines.node`                                                                                                  | **Savjetodavno** |

Osnovne vrijednosti performansi (heap, TTFB, vrijeme izgradnje) se bilježe, ali ne predstavljaju uslov za prolaz: pogledajte [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
