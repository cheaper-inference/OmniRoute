# Quality Gates Reference (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Ovaj je dokument mjerodavna referenca za sve CI kontrole kvalitete u OmniRouteu.
Opisuje svaku kontrolu, što provjerava, u kojem se CI poslu izvodi, koristi li
referentnu osnovu s postupnim pooštravanjem ili pravilo prolaz/pad te blokira li izgradnju ili je savjetodavna.

Za kratak sažetak i pravila popisa dopuštenih stavki pogledajte odjeljak "Kontrole kvalitete i postupna pooštravanja"
u `AGENTS.md`. Za kritičku procjenu, klasifikaciju zrelosti i plan
replikacije istog sustava neovisan o alatima pogledajte
[Priručnik za kontrole kvalitete](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Popis kapija i izvedbeni profili

### Prijem kandidata

Tijek rada CI i Quality Gates emitira stabilnu presudu: `Gate / CI` i `Gate / Quality`. Njihova politika prijema s verzijama nabraja svaki uzvodni posao prema potrebi ili uputama. Primjenjivi traženi posao mora uspjeti: nedostajući, otkazani, preskočeni, na čekanju i nepoznati rezultati ne mogu uspostaviti PASS. Važeća klasifikacija samo za dokumente ili samo za katalog može učiniti kodnu stazu neprimjenjivom; nacrt PR nije prihvaćen kandidat. Oznaka `hotfix` ne odriče se dokaza.

Oba tijeka rada pokrivaju grane PRs u main/release, guranja u `main`, ručno slanje i događaje spajanja grupe. Push, dispatch i merge-group pokreću cijeli odabir. Pushovi na `release/**` ih ne pokreću (2026-10-18): svaka promjena već je pokrenula matricu na svom PR, a spojena kombinacija je posao Release-Greena (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forkovi i grupe za spajanje koriste pokretače s hostom za poslove koji inače odabiru pokretače s vlastitim hostom; dovoljan hostirani kapacitet mora se provjeriti prije uvođenja.

Obični PR pokreće brzi odabir. `full-code` i `full-code-e2e` staze pravila pristupa (E2E, integracija, artefakt paketa, Electron dim, Bun SQLite, klijenti ekosustava i protokola) pokreću se samo na nacrtu reda čekanja Mergify ili na punom izvođenju: `gh workflow run ci.yml --ref <branch>`.

### Spajanje reda čekanja

Oznaka `queue` šalje PR u Mergify red (`.mergify.yml`). Mergify otvara nacrt PR na `mergify/merge-queue/` grani, CI tamo pokreće puni odabir, a izvorni PR se spaja kada `Gate / CI`, `Gate / Quality` i `Merge integrity (changelog + generated skills)` prođu.

Mergify upisuje svoj sažetak čekanja u opis nacrta, a druge ga aplikacije također mogu uređivati. Događaj `pull_request` `edited` na takvom nacrtu uzima vlastitu grupu paralelnosti (`-queue-edit-<run_id>`) tako da ne može otkazati stvarno izvođenje nacrta i preskače vrata i matricu. Još uvijek radi samo `Merge integrity`. Preskočeni gate posao nosi drugačiji naziv provjere, jer Mergify čita preskočeni `Gate / CI` kao neuspjelu provjeru i stavlja PR u red čekanja.

Nakon uklanjanja iz reda čekanja, push ne stavlja uvijek ponovno u red čekanja PR. Komentirajte `@mergifyio queue` o tome.

Svaki JSON račun identificira odjavljeni SHA, pokretanje i pokušaj tijeka rada. CLI odbacuje neusklađenost checkout/event SHA. Testovi tijeka rada povezuju članstvo u politici sa `needs` popisom posla presude tako da nova ili uklonjena traka ne može tiho nestati. Potvrde pokrivaju vlastiti tijek rada, a ne objavljivanje, implementaciju ili unutrašnjost postojećeg savjetodavnog skenera. Aktiviranje oba naziva provjere u pravilima grana je zasebna administrativna promjena; dodavanje ovih poslova samo po sebi ne štiti granu.

### Statičko skeniranje inventara

Inventar verzioniranog npm-aliasa i static-scan članstvo živi u `config/quality/gate-manifest.json`. Pokrenite `npm run check:gate-manifest` za provjeru valjanosti naziva skripti i točnih naredbi u odnosu na `package.json`; dodavanja, uklanjanja i pomicanje naredbi ne uspijevaju ni lokalni hook ni poslovi promjene klasifikacije u CI. Pseudonim nije posao tijeka rada, instanca matrice ili testni slučaj: ti se brojevi ne smiju predstavljati kao međusobno zamjenjivi.

Koristite `npm run quality:scan -- --list` ili `npm run quality:scan:fast -- --list` za pregled odabranih aliasa bez njihovog izvršavanja. Izvođač poziva npm ulaznu točku, tako da je njegovo vrijeme izvođenja (uključujući Bun ako je konfigurirano) sačuvano. Manifest bilježi pseudonime izvan tih profila kao zasebno pozvane, a naredbe za održavanje zabranjene su u profilima skeniranja samo za čitanje.

Ovi profili pokrivaju samo statičko skeniranje. Oni ne potvrđuju testove proizvoda, pokrivenost, pakiranje, vanjske provjere ili potpuno prihvaćanje kandidata za izdavanje. Prijem tijeka rada koristi povezane `config/quality/admission-policy.json` i `scripts/quality/admission-verdict.mjs`. Profili promatrača izdanja ostaju odvojeni; neovisno pregledati svoje važeće čekove i račune. Prozni inventar u nastavku je referenca, a ne dokaz da su vrata doista bila otvorena.

Skripte žive pod `scripts/check/` (policy gates) i `scripts/quality/` (ratchet engine). CI izvor istine je `.github/workflows/ci.yml`.

### Izdanje PR brze staze (`quality.yml`)

`.github/workflows/quality.yml` nadopunjuje CI na main/release PRs, gura u `main`, šalje i spaja grupe. PRs koristi brze provjere filtrirane putem. Uklonjena je trajno onemogućena duplicirana verzija; pravi build/package/boot čekovi ostaju u CI. Paket jedinica i vitest rade samo u CI (`Unit Tests (N/8)` i `Vitest`).

| Posao                                            | Opseg                                                                                                                                            | Blokiranje             |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs i docs-all                                                                                                          | Da                     |
| `Fast Quality Gates`                             | Kod PRs; statičke provjere, provjera tipa, provjera tipa nadzorne ploče, testovi zahvaćene jedinice, zaboravljeni testovi srodnih (savjetodavni) |
| `No new ESLint warnings`                         | Kod PRs; suppressions-aware lint guard                                                                                                           | Da, uključujući vilice |
| `Merge integrity (changelog + generated skills)` | Nenacrt PRs; zapis promjena i generirana sinkronizacija vještina                                                                                 | Da, uključujući vilice |

#### Izvješće o testovima zaboravljenog brata i sestre

`npm run check:forgotten-sibling-tests` radi kao savjetodavni korak za `Fast Quality Gates` i ponovno koristi razrješivač uvoza iza karte utjecaja testa. Za svaki promijenjeni proizvodni modul izvješćuje o determinističkim `changed module/symbol -> static consumer -> candidate sibling test` lancima kada je test kandidata odsutan u razlici zahtjeva za povlačenjem. Sažetak Markdown i JSON rezultat zadržavaju se kao `forgotten-sibling-tests` artefakt tijeka rada za kalibraciju prije bilo kakvog uvođenja blokiranja.

Reeksport bačve i dinamički uvoz samo su dijagnostika rezolucije; nikad ne stvaraju blokirajući nalaz. Pregledani izuzeci uživo u `config/quality/forgotten-sibling-allowlist.json`. Svaki unos mora imenovati potrošača i test kandidata, dati specifično obrazloženje i povezati GitHub problem ili zahtjev za povlačenjem. Neispravni unosi nisu uspjeli zatvoriti. Iznimke ne mogu potisnuti izbrisani test kandidata ili diff koji dodaje `.skip`/`.todo`; slabljenje tvrdnje i drugo maskiranje ostaju u vlasništvu neovisno blokirajućih `check:test-masking` vrata.

### Posao: `lint`

Radi na svakom PR do `main`. Blokovi se spajaju u slučaju kvara.

| Skripta (`npm run ...`)           | Provjerava valjanost                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Blokiranje                                   |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Node.js verzija unutar je podržanog raspona                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `check:cycles`                    | Kružni uvozi preko cijelog `src/` + `open-sse/` (na temelju AST-a, tsconfig `paths` razriješen). Bare izlazi iz 1 kad god postoji bilo koji ciklus (neuspješno zatvoren od #15281) i navodi SCCs. `check:cycles:ratchet` (ono što CI pokreće) blokira kada broj premaši `metrics.cycles` plafon u `quality-baseline.json` — trenutno 14, `direction: down`, tako da može samo pasti (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da (čegrtaljka)                              |
| `check:boundary`                  | `open-sse → src` spajanje: jedinstveni uvozi iz datoteke u datoteku iz motora u aplikaciju (`scripts/quality/measure-boundary.mjs`; rubni popis je v4 core/module-split remediation backlog). Bare = savjetodavno izvješće (isto kao `quality:boundary`). `check:boundary:ratchet` (ono što CI pokreće, također u `quality.yml` brzim vratima ratchet loop) blokira kada broj premaši `metrics.boundaryOpenSseToSrc` gornju granicu u `quality-baseline.json` — zasijano na izmjerenih 771, `direction: down`; `--update` samo snižava; baza-relativna na PRs (`--base-ref`, vidi dolje)                                                                                                                                                                                                                                                                                                                                                                             | Da (čegrtaljka)                              |
| `check:route-validation:t06`      | Zod sheme prisutne na svim rutama (pravilo razine 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Da                                           |
| `check:any-budget:t11`            | `@ts-expect-error // any` broj ne premašuje proračun (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                           |
| `check:provider-consistency`      | Svaki pružatelj usluga u `providers.ts` ima odgovarajući unos u `providerRegistry.ts` (i obrnuto, unutar liste dopuštenih)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Da                                           |
| `check:model-lifecycle`           | Tri ručno održavane tablice usmjeravanja ostaju u skladu s prijavljenom snimkom životnog ciklusa (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ne bilježi povučeni ID koji `REGISTRY` može usmjeriti; svaki `BUILT_IN_ALIASES` cilj prisutan je u `REGISTRY` i odsutan je iz povučene id snimke; svaki umirovljeni ID koji je još u `REGISTRY` proslijeđen je ili naveden u `allowedRetiredInCatalog`; i nijedan `DEFAULT_DEGRADATION_MAP` izvor ili cilj se ne pojavljuju povučeni u toj snimci. To ne dokazuje da se model trenutno opslužuje uzvodno uživo. Izvanmrežni — uspoređuje se sa `config/quality/model-lifecycle.json`, ručno osvježen sa `npm run quality:refresh-model-lifecycle` (mreža; nije spojen na CI). `allowedRetiredInCatalog` je burn-down ratchet: dodajte unos samo s problemom praćenja.                                                                                                                                                  | Da                                           |
| `check:fetch-targets`             | Svaki `fetch("/api/...")` u `src/` -u na strani klijenta razrješava pravi `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Da                                           |
| `check:deps`                      | Svi `npm install` -able deps u svakom `package.json` u repou su u `dependency-allowlist.json`; označeni novi neprikvačeni ili slopsquatted paketi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `audit:deps`                      | `npm audit` (korijen + elektron) — nema savjeta za high/critical (preklapa se osv `check:vuln-ratchet`; pogledajte Zaostatak racionalizacije)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                           |
| `check:lockfile`                  | `package-lock.json` integritet — https registar, hashovi integriteta, bez nadjačavanja hosta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                           |
| `check:licenses`                  | popis dopuštenih licenci SPDX za proizvodne ovisnosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Da                                           |
| `check:tracked-artifacts`         | Nema artefakata izgradnje / predanih `node_modules` simboličkih veza (također radi u husky pre-commitu; pre-push je namjerno lagan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `check:ai-attribution`            | Nema AI/bot `Co-Authored-By` najave ili podnožja generiranja umjetne inteligencije u PR obvezama, naslovu ili tijelu — Hard Rule #16 (u `quality.yml` fast-gates petlji za PR→ `release/**` — čita sadržaj događaja, no-op off PRs — i korak samo za PR u `ci.yml` lint za PR→ `main`; također husky `commit-msg` hook; ljudski koautori dopušteni #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:vitest-exclusions`         | Svako Vitest izuzimanje imenuje problem praćenja i pojavljuje se u `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `check:file-size`                 | Izvorne datoteke (`.ts`/`.tsx` u `src/`, `open-sse/`, `electron/`, `bin/`) ostaju unutar `cap`, a testne datoteke (`*.test.ts(x)`) unutar `testCap`; datoteke zamrznute u `file-size-baseline.json` (`frozen` / `testFrozen`) ne smiju porasti preko svoje snimljene veličine                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                           |
| `check:error-helper`              | Odgovori na pogreške u executors/handlers koriste `buildErrorBody()` / `sanitizeErrorMessage()` (tvrdo pravilo #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `check:migration-numbering`       | Migracijske SQL datoteke su redom numerirane, bez praznina ili duplikata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                           |
| `check:public-creds`              | Nema doslovnog OAuth `client_id`/`client_secret` ili Firebase web ključeva izvan `publicCreds.ts` (tvrdo pravilo #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Da                                           |
| `check:db-rules`                  | Nema sirovog SQL izvan `src/lib/db/` modula; nema barrel-imports iz `localDb.ts` (tvrda pravila #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                           |
| `check:known-symbols`             | Izvršitelji pružatelja usluga, strategije usmjeravanja i prevoditelji registrirani u njihovim otpremnim tablicama odgovaraju datotekama na disku — bez napuštenih ili nedeklariranih simbola                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                           |
| `check:route-guard-membership`    | Svaka ruta koja stvara podređeni proces klasificira se prema `isLocalOnlyPath()` (tvrda pravila #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                           |
| `check:test-discovery`            | Svaku `*.test.ts` / `*.spec.ts` datoteku u repou prikuplja najmanje jedan pokretač testa (ratchet: lista siročadi u `test-discovery-baseline.json` može se samo smanjivati)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `check:test-tla-order`            | Nijedna `node:test` datoteka pod `tests/unit` ne registrira test, pogađa `await` najviše razine, zatim registrira još (#18045; ratchet: `test-tla-order-allowlist.json` se može samo smanjiti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                           |
| `check:agent-skills-sync`         | Generirani artefakti vještina agenta odgovaraju njihovom izvornom katalogu (bez pomaka)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:provider-asset-provenance` | Davatelj logos/assets nosi zabilježeni unos o porijeklu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `lint:json`                       | JSON konfiguracijske datoteke analiziraju i zadovoljavaju pravila repo linta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecheck:core`                  | TypeScript kompilacija bez grešaka (samo savjetodavna upozorenja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `typecheck:noimplicit:core`       | Strogi `noImplicitAny` — usmjeren prema budućnosti; mnoga već postojeća mjesta poziva još uvijek trebaju bilješke                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | **Savjetodavno** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` u opsegu `src/app/(dashboard)/**` (#7033) — `typecheck:core`-ov odabrani popis dopuštenih 27 datoteka ne uključuje nijednu kontrolnu ploču TSX, a `next build` ga nikad ne provjerava tipom (`next.config.mjs` postavlja `ignoreBuildErrors: true`), tako da su tamošnje regresije identifikatora siročadi (#6625/#6909) bile nevidljive za CI. Razlikuje se u odnosu na zamrznutu osnovnu liniju broja per-file/per-TS-code (`config/quality/dashboard-typecheck-baseline.json`, isti obrazac zastarjele provedbe kao i `check:known-symbols`) — samo greške NEW izvan osnovnog broja ne prolaze vrata; ratchet down sa `--update` kada se popravi već postojeća pogreška.                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:build-typecheck`           | Provjera vrste produkcije cijele aplikacije preko `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), površinskog `typecheck:core`-ovog popisa dopuštenih 27 datoteka i vrata nadzorne ploče ne pokrivaju. Razlike u odnosu na `config/quality/build-typecheck-baseline.json`; novi ili povećani broj po-(datoteci, kodu) ne uspije, niži broj od vas traži da ubrzate. `--update` odbija dok izvođenje sadrži novi ili podignuti par osim ako nije proslijeđen `--force-regressions`, i odbija novoutišanu datoteku osim ako nije proslijeđen `--force-nocheck`, tako da su širenje osnovne linije da postane zelena i odobravanje trajne tišine dva odvojena namjerna čina. Goli `--force` se odbija. Također skenira opseg izgradnje za `@ts-nocheck` u odnosu na `config/quality/ts-nocheck-baseline.json`, jer datoteka koja ga koristi ne prijavljuje nikakvu dijagnostiku i inače bi bila nevidljiva svim vratima. | Da                                           |

#### Dva programa za provjeru tipa odgovaraju različito

`typecheck:core` i `check:build-typecheck` kompiliraju različite programe pod različitim opcijama, a ista datoteka može biti čista u jednom, a puna pogrešaka u drugom.

`tsconfig.build.json` postavlja `"strict": false`, tako da je `noImplicitAny` isključen. Temeljna konfiguracija sastavlja odabrani popis dopuštenih datoteka od 27 datoteka sa strožim opcijama i prati grafikon uvoza svakog unosa, tako da se datoteke koje se nikada ne pojavljuju u programu za izradu i dalje tamo provjeravaju.

Posljedica je važna kada se procjenjuje je li datoteka upisana:** nula dijagnostika pod `check:build-typecheck` ne znači nula** . Skidanje `@ts-nocheck` iz 26 datoteka pokazalo je da su 23 čiste u programu za izgradnju; šesnaest od njih pojavilo se oko 120 implicitnih - bilo kakvih pogrešaka u strogom. Provjerite oboje prije nego što datoteku nazovete čistom.

### Posao: `quality-gate`

Trči nakon `test-coverage`. Blokovi se spajaju u slučaju kvara.

| Skripta                      | Provjerava valjanost                                                                                                                                                       | Blokiranje                 |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `quality:collect`            | Emituje `quality-metrics.json` (ESLint broj upozorenja, pokrivenost iz spojenog izvješća o fragmentima)                                                                    | Da (uzvodno od čegrtaljke) |
| `quality:ratchet`            | Nijedna metrika u `quality-baseline.json` nije nazadovala (ESLint upozorenja ≤ osnovna vrijednost; pokrivenost ≥ osnovna vrijednost)                                       | Da                         |
| `check:duplication`          | Dupliciranje koda (jscpd@4) ne prelazi osnovnu vrijednost u `quality-baseline.json`                                                                                        | Da                         |
| `check:complexity`           | Ciklopmatska složenost na razini datoteke ne premašuje ograničenje (core ESLint `complexity` + `max-lines-per-function`)                                                   | Da                         |
| `check:cognitive-complexity` | Ratchet kognitivne složenosti (`eslint-plugin-sonarjs`) — odvojeni ESLint prolaz; CI izvodi oba spojena kao jedan `check:complexity-ratchets` korak                        | Da                         |
| `check:dead-code`            | Neiskorišteni izvozi / datoteke ratchet (knip) ne regresira u odnosu na osnovnu vrijednost                                                                                 | Da                         |
| `check:compression-budget`   | Referentni proračun kompresije — pragovi uštede tokena po motoru ne smiju nazadovati                                                                                       | Da                         |
| `check:type-coverage`        | Percent-typed ratchet (`type-coverage`) ne regresira; velikim dijelom podvodi `typecheck:noimplicit:core`                                                                  | Da                         |
| `check:codeql-ratchet`       | Otvoreni broj upozorenja CodeQL ne regresira (čita putem `gh api`; graceful-skip bez tokena) — kadenca osvježavanja i ručni okidač: pogledajte "CodeQL ratchet" u nastavku | Da                         |

### Posao: `quality-extended`

Cijeli posao je savjetodavni (`continue-on-error: true`). Čegrtaljke temeljene na npm-u rade stvarno; vanjski skeneri se instaliraju preko `gh release download` i samopreskaču (izlaz 0) kada binarni još uvijek nema.

| Skripta                  | Provjerava valjanost                                                                                                                                                                                                      | Blokiranje                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `check:circular-deps`    | Nema kružnih ovisnosti (dpdm)                                                                                                                                                                                             | **Savjetodavno**                                 |
| `check:bundle-size`      | Veličina paketa ne prelazi ograničenje                                                                                                                                                                                    | **Savjetodavno**                                 |
| `check:secrets`          | Tajno skeniranje (gitleaks) — preskače ako nema binarnog zapisa                                                                                                                                                           | **Savjetodavno**                                 |
| `check:vuln-ratchet`     | Ranjivosti ovisnosti (osv-skener) ne regresiraju — preskače ako nema binarnog zapisa                                                                                                                                      | **Savjetodavno**                                 |
| `check:workflows`        | Workflow lint (actionlint + zizmor); missing/broken skeneri, nevažeći izvještaji ili nedostajuća osnovna linija čegrtaljke ne uspijevaju kao INCOMPLETE. Valjani nalazi slijede odabranu strict/advisory/ratchet politiku | Potrebna izvedba; zizmor ratchet blokiranje u CI |
| `check:openapi-breaking` | Razbijanje promjena u javnom API ugovoru (`openapi.yaml`) u odnosu na osnovnu granu (oasdiff) — emitira `openapiBreaking=N`; preskače ako je oasdiff odsutan ili osnovna specifikacija nije razriješiva                   | **Savjetodavno**                                 |

### Posao: `docs-sync-strict`

Radi na svakom PR do `main`. Blokovi se spajaju u slučaju kvara.

| Skripta                        | Provjerava valjanost                                                                                                                                           | Blokiranje                 |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | Meta-vrata koja uzastopno pokreću 6 pod-vrata ispod                                                                                                            | Da                         |
| ↳ `check:docs-sync`            | dosljednost CHANGELOG / OpenAPI / llm.txt verzije                                                                                                              | Da                         |
| ↳ `check:docs-counts`          | Brojevi u prozi (broj pružatelja usluga, broj migracija, itd.) unutar su okvira stvarnog brojanja                                                              | Da                         |
| ↳ `check:env-doc-sync`         | Svaka env var u `.env.example` je dokumentirana u tablici dokumenata, i obrnuto                                                                                | Da                         |
| ↳ `check:deprecated-versions`  | U dokumentima nema nizova zastarjele verzije                                                                                                                   | Da                         |
| ↳ `check:doc-links`            | Interne veze za označavanje u dokumentima rješavaju stvarne datoteke (`[text]`/`(path)` obrazac)                                                               | Da                         |
| ↳ `check:fabricated-docs`      | Rute, env vars, CLI naredbe, nazivi poveznica i staze datoteka navedeni u dokumentima postoje u bazi koda. Tvrda vrata preko `--strict`; soft-fail bez oznake. | Da (putem `--strict` u CI) |
| `check:cli-i18n`               | CLI nizovi naredbi prisutni su u svim datotekama lokalizacije i18n                                                                                             | Da                         |
| `check:openapi-coverage`       | OpenAPI specifikacija pokriva barem niz stvarnih ruta                                                                                                          | Da                         |
| `check:openapi-security-tiers` | Bilješke o sigurnosnoj razini u `openapi.yaml` su u skladu s klasifikacijama `routeGuard.ts`                                                                   | **Savjetodavno**           |
| `check:openapi-routes`         | Svaka staza u `openapi.yaml` rješava do pravog `route.ts` (anti-halucinacija)                                                                                  | Da                         |
| `check:docs-symbols`           | Svaka `/api/...` referenca u `docs/**/*.md` rješava pravi `route.ts` (anti-halucinacije)                                                                       | Da                         |
| `i18n translation drift`       | Neprevedeni ključevi u i18n lokalnim datotekama samo — upozoravaju                                                                                             | **Savjetodavno**           |

Generira se dvanaest README SVGs pod `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` ih sve regenerira). Svaki ima jedinični test usporedbe bajtova (`tests/unit/docs/readme-*-svg.test.ts`, posao `test-unit`) koji ne uspijeva kada je predana datoteka ustajala, a `check:docs-counts` čita kanonske brojeve iz svojih `<text>` čvorova — zbog čega korak ocrtavanja drži svaki ocrtani niz u datoteci kao nevidljiv `<text>`. Provjera SVG kanonskih brojeva čita datoteke navedene u `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` i `tier-flow-light.svg`; tvrdnje o besplatnom zauvijek, unosu u katalog, ponavljajućem skupu i faktorima bodovanja također glase `promise-pillars.svg`, `free-tier-budget.svg` i `strategies-grid.svg`. `free-tier-budget.svg` izvlači svoje brojke iz live kataloškog punjača, tako da promjena u `FREE_MODEL_BUDGETS` ili u imenu za prikaz pružatelja označava CI dok se ta datoteka ponovno ne generira.

### Posao: `i18n-ui-coverage`

| Skripta                             | Provjerava valjanost                                                                                                                                                                                       | Blokiranje       |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage` (umetnuti) | UI i18n ključna pokrivenost je ≥ 65%                                                                                                                                                                       | Da               |
| `check-ui-value-drift` (umetnuti)   | Prepisani engleski** vrijednost** ne ostavlja za sobom ustajali prijevod                                                                                                                                   | Da               |
| `check-new-key-coverage` (umetnuti) | A** novi** Engleski ključ se prevodi u svakom lokalitetu — a `__MISSING__:` marker se odbija                                                                                                               | Da               |
| `check-translation-ratio`           | Omjer stvarnog prijevoda po lokalitetu (identičan engleskom / rezervirano mjesto / nedostajući listovi izvan popisa dopuštenih) ne smije premašiti `config/quality/i18n-translation-baseline.json` + slack | **Savjetodavno** |

Treba `fetch-depth: 0` — vrata za pomicanje vrijednosti diff `en.json` u odnosu na bazu spajanja.

#### `check-ui-value-drift` — stale-translation gate

Hvata jednu i18n regresiju koju druga vrata strukturalno ne mogu vidjeti: engleska vrijednost je prepisana, a prijevodi izvedeni iz _prethodnog_ engleskog ostaju iza, tako da korisnici koji nisu engleski nastavljaju čitati samouvjereno sročenu, sada pogrešnu kopiju.

Ovo je stvarno poslano. `oauthModal.googleOAuthWarning` je ponovno napisan kada je sletio pomoćnik za prijavu Antigravity (#5203);** 39 od 43 mjesta** zadržao tekst koji operaterima govori da "kopiraju cijeli URL i zalijepe ga ispod" — tijek koji se ne može dovršiti za tog pružatelja usluga. Prošlo je nezapaženo do #8463 jer:

- `sync-ui-keys` samo zatrpava ključeve koji su** odsutan** , nikada one koje jesu** mokraća** ;
- `check-ui-keys-coverage` broji _prisutnost_ ključa, tako da se zastarjeli prijevod ocjenjuje kao pokriven;
- `check-translation-drift` prati `docs/i18n/<locale>/**.md` dokumentaciju zrcala — nikad ne čita `src/i18n/messages/*.json`. Blokiranje u poslu `docs-sync-strict` od ponovne sinkronizacije 2026-09: uredite osnovni dokument → `npm run i18n:run -- --files=<doc>` (razina odjeljka, jeftino).

**Svjestan razlike, nije podržan osnovnom linijom.** Uspoređuje `en.json` na bazi spajanja s radnim stablom; za svaki ključ čija se engleska vrijednost promijenila, svaka lokalizacija koja još uvijek sadrži nedirnuti prijevod je zastarjela. Ovo namjerno** zamrzava već postojeći dug** — a diff ne može otkriti s kojeg je starog engleskog dugotrajni prijevod došao, tako da vrata prosuđuju samo ono što trenutna promjena dotiče. Alternativa (bazna linija raspršivanja po ključu) koštala bi ~ 600 KB generiranu datoteku, 3 × najveću postojeću osnovnu liniju, bućkanje na svakom i18n PR.

Dva načina da ga zadovoljite:

1. ažurirati zahvaćene prijevode, ili
2. postavite ih na `__MISSING__:<new english>` — vrijeme izvođenja zatim poslužuje ispravljeni engleski (`src/i18n/request.ts::deepMergeFallback`, #7258) i redove ključeva za prijevod.

Ako je niz** značenje** promijenio, radije** preimenovanje ključa** : novi ključ ne može naslijediti zastarjeli prijevod. To je obrazac koji se koristi #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Izlazi 0 sa `SKIP reason=base-unresolved` kada se osnovni katalog ne može pročitati (plitki klon bez baze ref), zrcaljenje `check-openapi-breaking`.

### Posao: `i18n`

Potpuna i18n validacijska matrica (jedan posao po lokalitetu). Cijeli posao je savjetodavni.

| Skripta                         | Provjerava valjanost                | Blokiranje                                                   |
| ------------------------------- | ----------------------------------- | ------------------------------------------------------------ |
| `validate_translation.py quick` | Cjelovitost prijevoda po lokalitetu | **Savjetodavno** (`continue-on-error: true` na cijeli posao) |

### Posao: `pr-test-policy`

Radi samo na zahtjevima za povlačenje.

| Skripta                | Provjerava valjanost                                                                                                                    | Blokiranje |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PRs koji mijenja proizvodni kod u `src/`, `open-sse/`, `electron/` ili `bin/` mora uključivati ili ažurirati testove (tvrdo pravilo #8) | Da         |
| `check:test-masking`   | Promijenjene testne datoteke ne smanjuju broj neto tvrdnji niti dodaju `assert.ok(true)` tautologije                                    | Da         |
| `check:pr-evidence`    | PR tijelo navodi test/VPS dokaze za promjenu (mehanizira Hard Rule #18 greppingom PR prose — fragile, pogledajte Backlog)               | Da         |

### Posao: `test-vitest`

Trči nakon `build`. Blokovi se spajaju u slučaju kvara.

| Suite            | Provjerava valjanost                                     | Blokiranje                                                                                                         |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP server (110 alata), autoCombo, cache — vitest runner | Da                                                                                                                 |
| `test:vitest:ui` | UI komponente testovi — vitest runner                    | **Blokiranje** — već postojeći kvarovi izričito su isključeni u `vitest.config.ts`; novi neuspjesi propadaju posao |

### Noćni tijek rada (planirani, savjetodavni)

Oni rade na cron rasporedu (i `workflow_dispatch`), nikad na PRs. Svi su savjetodavni.

| Tijek rada             | Provjerava valjanost                                                                                                                                          | Blokiranje       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | testovi svojstava brze provjere s nasumičnim početnim + velikim brojem pokretanja                                                                             | **Savjetodavno** |
| `nightly-resilience`   | heap-growth gate, chaos fault-injection, k6 load/soak                                                                                                         | **Savjetodavno** |
| `nightly-llm-security` | promptfoo injection guard (blokiranje) + garak sonde (preskočeno bez tajne pružatelja)                                                                        | **Savjetodavno** |
| `nightly-schemathesis` | OpenAPI ugovorni fuzzing (shemateza) protiv živog OmniRoute koji koristi `docs/openapi.yaml` — površine kršenja specifikacija / neobrađenih 500s (faza 8 B.4) | **Savjetodavno** |
| `nightly-mutation`     | Strykerov rezultat testiranja mutacija preko brze jedinice — preživjeli mutanti površinski slabi tvrdnje                                                      | **Savjetodavno** |
| `nightly-compat`       | Matrica kompatibilnosti motora čvorova u podržanim `engines.node` rasponima                                                                                   | **Savjetodavno** |

Osnovne linije izvedbe (hrpa, TTFB, vrijeme izgradnje) se bilježe, a ne usmjeravaju: pogledajte [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Faza ubrzanog razvoja (2026-08-30 → v4.0 LTS): svaka početna granica ublažena je za 20%

Odluka vlasnika (2026-08-30): do modularizacije u v4.0 brzina isporuke važnija je
od ograničavanja tehničkog duga. Svaka **numerička** početna granica kontrolnog mehanizma ublažena je za 20% u jednom
revizijski provjerljivom prolazu, a faza je deklarirana u `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Što je promijenjeno                                                                                                                                                                                                         | Gdje                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — vrijednosti kod kojih je manje bolje ×1.2, postoci kod kojih je više bolje ÷1.2 (donja granica pokrivenosti ostaje 60, `eslintErrors` ostaje 0, `eslintWarnings` 0 → 20% zamrznutog broja potiskivanja) | `quality-baseline.json` (bilješka `_relax_velocity_2026_08_30` navodi svaku vrijednost prije → poslije) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                            | `complexity-baseline.json`, `duplication-baseline.json`                                                 |
| `cap`, `testCap`, ograničenje broja redaka za svaki `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                      | `file-size-baseline.json`                                                                               |
| broj po datoteci / po retku TS koda ×1.2                                                                                                                                                                                    | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`  |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                         | `scripts/check/check-openapi-coverage.mjs`                                                              |
| `--require-tighten` postaje savjetodavan dok je `_policy.requireTighten === false`                                                                                                                                          | `scripts/quality/check-quality-ratchet.mjs`                                                             |
| noćni `bank-ratchet-shrinks` pauziran je (zabilježio bi izmjereno smanjenje i poništio rezervu)                                                                                                                             | `.github/workflows/nightly-release-green.yml`                                                           |

Popisi dopuštenih stavki (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **nisu** proračuni i nisu mijenjani. Pravila prolaza/pada (tajne, SQL pravila,
ugovor dokumentacije/okruženja, paritet i18n-a, jedinični testovi) nisu promijenjena — neuspješan test i dalje je neuspješan test.

**Alati**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — jednokratno
  ublažavanje (`scripts/quality/relax-baselines.mjs`); odbija ponovno pokretanje s istom
  bilješkom.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mjeri svaku numeričku kontrolu na isti način kao CI i ispisuje preostalu rezervu za svaku kontrolu
  (`scripts/quality/baseline-headroom.mjs`). Noćni zadatak `baseline-headroom` objavljuje
  tablicu u sažetku izvođenja tijeka rada i prenosi svoje JSON/Markdown izvješće kao
  `baseline-headroom-<run_id>`, koje se čuva 90 dana. Retci s upozorenjima i kritični retci označavaju kontrole
  koje su unutar 10% svojeg ograničenja ili su ga već prekoračile. Pregledavajte ta izvješća kao rano upozorenje da se
  proračuni troše; provjerite bilješke `_rebaseline_*` problematične kontrole. Zadatak više
  ne stvara niti ažurira trajni problem; #12149 čuva raniju povijest izvješća.

**Način rada za novi kod (Clean-as-You-Code) — od 2026-08-30, samo ubrzani put za PR-ove**

Na događajima `pull_request` datoteka `quality.yml` prosljeđuje `--base-ref <PR base SHA>` naredbama `check:file-size`,
`check:complexity-ratchets` i `check:dead-code`. Za `check:complexity-ratchets` i
`check:dead-code` kontrola uspoređuje HEAD s bazom spajanja, **ograničeno na datoteke koje je PR
izmijenio** (`scripts/check/newCodeMode.mjs`: baza spajanja materijalizira se u privremenom
`git worktree`, ESLint/knip pokreću se ondje i na HEAD-u, a zatim se uspoređuju brojevi po datoteci):

- **blokirajuće** — PR je dodao kršenja ciklomatske/kognitivne složenosti ili mrtve izvoze u datotekama koje je izmijenio
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` u zapisniku);
- **savjetodavno** — globalni zbroj u odnosu na zamrznutu početnu vrijednost. Naslijeđeno odstupanje nikada ne ruši
  nedužan PR; odstupanje se ponovno zamrzava pri usklađivanju izdanja, a nadzire ga zadatak za praćenje rezerve.

`check:file-size` koristi osnovnu referencu prema vlastitim pravilima (`scripts/check/check-file-size.mjs`, #8522):
provjerava svaku izvornu i testnu datoteku u stablu, čita broj redaka svake datoteke u osnovi PR-a
pomoću `git show` te označava datoteku neuspješnom samo kada naraste iznad veće vrijednosti između njezina početnog ograničenja
(`frozen` / `testFrozen` ili `cap` / `testCap` za datoteku izvan početnog skupa) i njezine osnovne
veličine. Datoteka koja je već odstupila u osnovi stoga nikada ne ruši nedužan PR.

`check:boundary:ratchet` primjenjuje isto pravilo na svoj jedini broj
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): pri PR događajima i brze provjere u
`quality.yml` i posao lintanja u `ci.yml` prosljeđuju SHA osnovne grane PR-a, osnovni se commit
mjeri iz izvoza `git archive`, a PR ne prolazi samo kada njegov broj veza
`open-sse → src` premašuje veću vrijednost između `metrics.boundaryOpenSseToSrc` i broja na osnovnoj grani. Odstupanje
osnovne grane iznad gornje granice prijavljuje se (`base drift herdado`), ali nikada ne uzrokuje pad nedužnog PR-a; push → main
zadržava apsolutnu gornju granicu, a SHA osnovne grane koji se ne može razriješiti vraća se na nju uz upozorenje.

Pokretanja putem `workflow_dispatch`, završna provjera zelenog izdanja i noćni posao provjere rezerve nemaju osnovnu granu PR-a
te zadržavaju apsolutnu (globalnu) usporedbu. Pokrivenost, dupliciranje i pokrivenost tipovima zasad ostaju globalni
(njihovi alati ne stvaraju jeftino diff po datoteci) — kandidati su za isti pristup.

**Zatvaranje faze na v4.0 (LTS = stroži nego prije, a ne „povratak na normalno”)**

1. Na čistom vrhu grane `release/v4.0.0`: za evidenciju pokrenite `npm run quality:headroom --json`, zatim
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` i
   `--update` za svaku provjeru tipova — svaka se osnovna vrijednost spušta na izmjerenu vrijednost.
2. Izbrišite `_policy` iz `quality-baseline.json` (ponovno aktivira `--require-tighten` i noćno
   akumuliranje rezerve), vratite `THRESHOLD = 36` (ili više) u `check-openapi-coverage.mjs`.
3. Postrožite granice iznad izmjerenih vrijednosti ondje gdje se modularizacija isplatila: vratite `cap` veličine datoteke na 1000
   (ili 800), povećajte minimalnu pokrivenost za 5, a broj neupotrijebljenih izvoza postavite na 0 za modularizirane pakete.

## Referentna vrijednost mehanizma zapinjače (`quality-baseline.json`)

Mehanizam zapinjače (`scripts/quality/check-quality-ratchet.mjs`) čita `quality-baseline.json`
i uspoređuje ga s upravo prikupljenim `quality-metrics.json`. Svaka metrika koja nazaduje
izvan svoje epsilon-vrijednosti uzrokuje neuspjeh izgradnje.

Trenutačno praćene metrike:

| Metrika               | Smjer  | Značenje                              |
| --------------------- | ------ | ------------------------------------- |
| `eslintWarnings`      | `down` | Broj ESLint upozorenja ne smije rasti |
| `coverage.statements` | `up`   | Pokrivenost naredbi ne smije pasti    |
| `coverage.lines`      | `up`   | Pokrivenost redaka ne smije pasti     |
| `coverage.functions`  | `up`   | Pokrivenost funkcija ne smije pasti   |
| `coverage.branches`   | `up`   | Pokrivenost grana ne smije pasti      |

Za ažuriranje referentne vrijednosti nakon stvarnog poboljšanja:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Zastavica `--update` zapisuje trenutačno izmjerene vrijednosti u `quality-baseline.json`.
Predajte ovu datoteku zajedno s promjenom koja je poboljšala metriku. PR koji poboljša
metriku bez ažuriranja referentne vrijednosti otkrit će `--require-tighten` (Faza 6A.5,
implementacija je na čekanju).

### CodeQL zapinjača: učestalost osvježavanja i ručno pokretanje

`check:codeql-ratchet` čita **stanje repozitorija koje se osvježava prema rasporedu — ne za svaki PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` prijavljuje
`state: configured`, `schedule: weekly`: GitHubovo skeniranje prema zadanoj konfiguraciji, a ne analiza
pri svakom slanju promjena. Posljedica: nakon spajanja PR-a koji ISPRAVLJA upozorenja, zapinjača nastavlja očitavati
stari, veći broj sve dok se ne pokrene sljedeće zakazano skeniranje — stoga prijavljuje regresiju
na svakom otvorenom PR-u, uključujući i naknadne PR-ove povezane s onim koji je sadržavao ispravak, sve dok se skeniranje ne uskladi.

**Ručno osvježavanje**: `gh workflow run codeql.yml --ref release/vX.Y.Z` ponovno pokreće
analizu i u roku od nekoliko minuta ponovno objavljuje upozorenja. Najprije pročitajte `.github/workflows/codeql.yml`
— njegovo zaglavlje objašnjava da se pokreće samo putem `workflow_dispatch` **jer je u sukobu sa
GitHubovom „zadanom konfiguracijom”** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Vraćanje okidača `push`/`pull_request`/
`schedule` prvo zahtijeva **radnju vlasnika**: Settings → Code security →
CodeQL: Default → Advanced. Nemojte dodavati okidač `schedule:` bez tog prebacivanja — to
će samo uzrokovati neuspješna izvođenja.

**Postrožite referentnu vrijednost nakon smanjenja broja** — `node scripts/check/check-codeql-ratchet.mjs
--update` zapisuje novi izmjereni broj u `quality-baseline.json` →
`metrics.codeqlAlerts.value`, kako zapinjača ne bi prešutno dopustila regresiju natrag
do starog gornjeg praga. Praktični primjer (2026-09-02/03): PR #12502 ispravio je 7 stvarnih upozorenja
(13 → 6 izmjerenih otvorenih); PR #12530 postrožio je zamrznutu referentnu vrijednost s 11 → 6 kako bi se podudarala; preostalih
6 zatim je odbačeno uz zasebno obrazloženje za svako upozorenje, čime je broj otvorenih upozorenja smanjen na 0.

**Odbacivanje je odluka rukovatelja (Strogo pravilo #14)** — nikada nemojte odbaciti CodeQL upozorenje
bez bilježenja tehničkog obrazloženja u komentaru odbacivanja: `won't fix` za
zahtjev uzvodnog protokola, `used in tests` za testnu fixturu, `false positive`
za pročišćivač koji CodeQL ne može prepoznati (presedan: `docs/security/ERROR_SANITIZATION.md`).

---

## Pravila ponovnog pokretanja testova (WS5.4, v3.8.49)

Ponovno pokretanje određuje se po izvršitelju, nikada kao opće pravilo — opće ponovno pokretanje pretvara stvarne regresije
u nevidljive nestabilnosti:

| Izvršitelj       | Pravilo                                                                                                                                        | Zašto                                                                                                                                           |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` samo u CI-ju, uz `trace: on-first-retry`                                                                                          | Vremenski uvjeti preglednika/mreže doista su nedeterministički; jedno ponovno pokretanje uz trag pretvara nestabilnost u dijagnostički artefakt |
| Vitest           | NEMA globalnog ponovnog pokretanja. Dokazano nestabilan test dobiva izričito ponovno pokretanje po testu (vidljivo u diffu, pregledano u PR-u) | Popis izdvojenih testova ostaje u repozitoriju i nikada nije neproziran                                                                         |
| node:test (unit) | NEMA ponovnog pokretanja, nikada                                                                                                               | Nestabilan jedinični test pogreška je u testu — popravite ga, nemojte ga samo ponovno pokretati                                                 |

Ciljni SLO-ovi nakon uvođenja telemetrije nestabilnosti (WS5.2/5.3): <1% stopa nestabilnosti po testu
(prag „odmah popravi”), ≥95% stopa prolaznosti po cjevovodu. Referentne vrijednosti iz industrije —
ponovno ih kalibrirajte prema našim vlastitim mjerenjima.

## Odstupanje zapinjača na razini izdanja (WS5.5, v3.8.49)

Kada zapinjač (veličina datoteke, složenost, eslint upozorenja) nazaduje na ČISTOM vrhu izdanja
— tj. KOMBINACIJA spajanja uzrokuje regresiju, a nijedan pojedinačni PR ne reproducira
regresiju na vlastitoj grani — popravak je odgovornost **voditelja izdanja, jednom, na
grani izdanja**: prednost dajte izdvajanju/refaktoriranju; ponovno postavite referentnu vrijednost samo uz dokumentirani
zapis obrazloženja. Nikada ne prebacujte kombinirano odstupanje na PR doprinositelja i nikada
ne postavljajte ponovno referentnu vrijednost za svaki PR (time se skrivaju stvarne regresije). Najprije razlučite uzrok: reproducirajte
neuspjeh na čistom vrhu u probnom radnom stablu prije nego što pretpostavite da ga je uzrokovao vaš PR.

## Pohranjivanje smanjenja zapinjača — smjer prema dolje (#8584)

Zapinjač je samo napola automatski, i to pogrešna polovica. **Povećavanje** ograničenja
ručno je uređivanje JSON-a koje traje deset sekundi i najbrži je način deblokiranja neuspješnog PR-a.
**Smanjivanje** zahtijeva da netko pokrene `--update` i zabilježi rezultat — a sve dok
posao `bank-ratchet-shrinks` nije uveden, nijedan tijek rada to nije pokretao. Izmjerena posljedica
(2026-07-25): 18 zamrznutih datoteka već je bilo na ili ispod ograničenja od 800 redaka za nove datoteke, najgora
na 132× (`src/shared/validation/schemas.ts`, 19 redaka uz ograničenje od 2,523); gornja granica
složenosti porasla je `1794 → 2169` kroz ~37 bilješki o ponovnom postavljanju referentne vrijednosti, uz točno jedno
smanjenje (−1); a „pooštri putem `--update` u sljedećem ciklusu” zapisano je 31 put i ispoštovano
jednom. Ograničenje koje nadživi kôd zbog kojeg je uvedeno neprimjetno pretvara svaku dovršenu
dekompoziciju u dopuštenje za rast onome tko sljedeći uređuje datoteku.

`nightly-release-green.yml` → posao **`bank-ratchet-shrinks`** zatvara tu petlju:

|               |                                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| Pokreće se na | `schedule` (3×/dan) + `workflow_dispatch` — namjerno **ne** na `push`                                 |
| Mjeri         | najviši `release/vX.Y.Z`, uz isto razrješavanje + zaštitu od ubrizgavanja kao `release-green`         |
| Zapisuje      | `check:file-size --update` i `check:complexity-ratchets --update` (oba po konstrukciji samo smanjuju) |
| Provjerava    | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                              |
| Isporučuje    | jedan uvijek ažuran PR prema grani izdanja — prisilno ažuriran, bez neželjenog umnažanja              |

Pohranjivanje se obavlja skupno, a ne pri svakom slanju, jer nema zahtjeva za latencijom (smanjenje
pohranjeno unutar 8 h sasvim je prihvatljivo), dok bi pokretanje nakon svakog spajanja opetovano ponovno izgrađivalo granu PR-a
tijekom kampanja spajanja i svaki put plaćalo puni prolaz ESLint-a. Otkrivanje ostaje pri
slanju (`release-green`); samo se pohranjivanje obavlja skupno.

### Sigurnosni provjeravatelj

Posao bez nadzora zapisuje u referentne vrijednosti, stoga `verify-ratchet-bank.mjs` to čini
prihvatljivim. Uspoređuje stablo nakon `--update` s `HEAD` i **prekida posao
prije nego što postoji ikakav commit** — bez otvaranja PR-a — osim ako je svaka promjena jedna od sljedećih:

- brojčani unos `frozen` / `testFrozen` **smanjen** je ili **uklonjen**
- `complexity-baseline.json` → `count` **smanjen** je
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **smanjen** je

Sve ostalo uzrokuje neuspjeh: povećavanje broja, dodavanje unosa, mijenjanje `cap`/`testCap` ili
brisanje/prepisivanje bilješke `_rebaseline_*` (te bilješke čine revizijski trag razloga postojanja svake
gornje granice i pohranjene su unutar istog objekta `frozen` kao i unosi datoteka).
Bot koji bi mogao povećati ograničenje bio bi strogo lošiji od postojećeg stanja. Zaštita od regresije:
`tests/unit/verify-ratchet-bank.test.ts`.

Posao nikada ne šalje promjene u `release/*` — čovjek spaja PR, pa pogrešno mjerenje
ne može biti prihvaćeno bez pregleda.

## Pravila popisa dopuštenih stavki

Svaka kontrola koja ne može pasti zbog postojećih kršenja koristi zamrznuti popis dopuštenih stavki
(npr. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Pravilo glasi:

**Ispravite temeljni uzrok; koristite popis dopuštenih stavki samo kada je kršenje već postojalo i
ne može se ispraviti u istom PR-u.**

Pri dodavanju stavke na popis dopuštenih stavki:

1. Dodajte komentar s obrazloženjem.
2. Navedite povezani problem praćenja (npr. `// #3498 — Značajka 2. faze, još nije implementirana`).
3. Uklonite stavku u istom PR-u koji ispravlja kršenje — zastarjela stavka koja više
   ne potiskuje aktivno kršenje i sama je nedostatak (provjera zastarjelog provođenja pravila 6A.3
   uzrokovat će pad kontrole zbog nepovezane stavke na popisu dopuštenih nakon što bude implementirana).

**Nemojte** dodavati stavke na popis dopuštenih kako bi testovi brže prošli. Uspješna kontrola uz rastući
popis dopuštenih stvara lažan osjećaj kvalitete.

### Kada kontrola ne uspije na vašem PR-u

1. **Pažljivo pročitajte izlaz kontrole** — on vam točno govori koja je datoteka ili simbol prekršio
   pravilo.
2. **Ispravite kršenje** — većina kontrola determinističke su provjere datotečnog sustava koje prolaze čim
   je kôd ispravan.
3. **Ako je kršenje već postojalo** (tj. niste ga vi uveli, ali ga kontrola sada
   obuhvaća): dodajte stavku na popis dopuštenih s komentarom obrazloženja i problemom praćenja.
4. **Ako je kontrola zaporna** (pokrivenost, upozorenja ESLint-a, dupliciranje, složenost):
   vaša je promjena pogoršala metriku. Ispravite temeljni problem ili (rijetko) pokrenite
   `npm run quality:ratchet -- --update` ako je promjena namjerna i pogoršanje metrike
   prihvatljivo — ali u opisu PR-a dokumentirajte razlog.
5. **Savjetodavne kontrole** (`continue-on-error: true`) informativne su — ne blokiraju
   spajanje, ali se pojavljuju u sažetku CI-ja. Svejedno ih ispravite.

---

## Dodavanje nove kontrole

1. Izradite `scripts/check/check-<name>.mjs` (ili `.ts`). Kontrole pravila završavaju izlaznim kodom 0/1.
   Zaporne kontrole šalju metriku u `quality-metrics.json` putem `collect-metrics.mjs`.
2. Dodajte `"check:<name>": "node scripts/check/check-<name>.mjs"` u `package.json`.
3. Povežite je u `.github/workflows/ci.yml` pod odgovarajućim zadatkom
   (pravilo → `lint` ili `docs-sync-strict`; zaporna kontrola → `quality-gate`).
4. Ako ima popis dopuštenih stavki, primijenite `reportStaleEntries()` iz
   `scripts/check/lib/allowlist.mjs` kako bi se zastarjele stavke automatski otkrile.
5. Napišite test u `tests/unit/build/` koji pokriva logiku otkrivanja kontrole.
6. Ažurirajte ovaj dokument (dodajte redak u tablicu odgovarajućeg zadatka).

---

## Alati za agente: LSP-in-the-loop (opcionalno)

Osim CI kontrola, OmniRoute isporučuje **opcionalnu** osnovu `agent-lsp`
(projektni `.mcp.json`, Faza 7, zadatak 15). Izradite `.mcp.json`
kako biste agentima za programiranje izložili TypeScript jezični poslužitelj, tako da razriješe simbole /
dijagnostiku **prije** pisanja koda — dopunu za `typecheck:core` koja provjerava kompilaciju prije iznošenja tvrdnji
i uklanja pogreške „izmišljenih simbola” na samom izvoru. Namjerno se
ne učitava automatski (vi birate i provjeravate MCP↔LSP most); neispravna stavka samo bilježi
pogrešku povezivanja i nikada ne prekida sesije.

---

## Zaostatak racionalizacije (pregled ROI-ja — faza 9, val 3)

Ovaj je inventar usklađen s `ci.yml` 2026-06-17 (u prethodnoj su verziji izostavljeni
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Pregled ROI-ja usklađenog skupa
utvrdio je sljedeće kandidate za racionalizaciju. **Spajanja su mehaničke promjene CI-ja;
promjene statusa/uklanjanja političke su odluke rezervirane za operatera.** Ništa navedeno
u nastavku još nije primijenjeno.

**Također nije dokumentirano iznad** (savjetodavno, slab signal): posao `docs-lint`
(markdownlint + Vale, cijeli posao s `continue-on-error`) i samostalni tijekovi rada skenera
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` nalazi se u
`quality-baseline.json`, ali nije povezan s blokirajućom čegrtaljkom u `ci.yml` — metrika je
trenutačno nepovezana.

### Spajanje / uklanjanje duplikata (mehanički, manji rizik)

Svaki je kandidat provjeren u odnosu na aktivno stanje kontrola 2026-06-17 (vjeruj, ali provjeri);
pokazalo se da nekoliko „očiglednih” spajanja skriva dug i **nisu** izravno primjenjive zamjene.

- **`check:docs-sync` izvodi se dvaput** — samostalno u poslu `lint` i ponovno unutar `check:docs-all` (`docs-sync-strict`) te husky pre-commit kuke. ✅ **GOTOVO** — uklonjeno je samostalno pozivanje iz posla `lint`.
- **Skeniranje CVE-ova** — ❌ **NIJE jednostavno spajanje.** `audit:deps` završava neuspjehom pri bilo kojem CVE-u visoke/kritične razine; `check:vuln-ratchet` (osv) završava neuspjehom samo pri _regresiji_ u odnosu na osnovnu vrijednost (trenutačno 1 MODERATE). Semantike se razlikuju — uklanjanjem `audit:deps` izgubila bi se apsolutna kontrola za visoku/kritičnu razinu. Zadržati oboje.
- **Otkrivanje ciklusa** — ✅ **GOTOVO** (#15159 G-01/G-02). Stari je tekst ovdje nazivao `check:cycles` „zelenom, selektivnom” kontrolom i opravdavao njezino zadržavanje kao blokirajuće jer je `check:circular-deps` (dpdm) prijavljivao 91 ciklus. To zeleno stanje bilo je **lažno zeleno**: `check:cycles` skenirao je 5 poddirektorija (450 datoteka), prepoznavao samo statičke obrasce `import|export … from` te odbacivao svaki specifikator `@/` i `@omniroute/open-sse/`, pa nije mogao uočiti cikluse dinamičkog uvoza i aliasa koji su prevladavali u repozitoriju. Ispravljeno: kontrola sada obilazi `src` + `open-sse` (5023 datoteke), prikuplja specifikatore iz TypeScript AST-a (tako da se `import("…")` računa, a `typeof import("…")` na položaju tipa ne računa) te razrješava tsconfig `paths`. Pronalazi **14** ciklusa, a ne 0. Budući da se 14 postojećih ciklusa ne može ispraviti u PR-u kontrole, `check:cycles` sada je **čegrtaljka** (`--ratchet`, gornja granica `metrics.cycles.value = 14` u `quality-baseline.json`, `direction: down`) — blokira svaku _regresiju_, a broj se može samo smanjivati. CI izvodi `npm run check:cycles:ratchet`. Postupno smanjivanje provodi se uz **A-01**. `check:circular-deps` (dpdm) ostaje savjetodavan kao šire drugo mišljenje.
- **Složenost** — ✅ **GOTOVO** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): jedan ESLint prolaz, brojanje prema ruleId-u kako bi osnovne vrijednosti ciklomatske složenosti + maksimalnog broja redaka i kognitivne složenosti ostale neovisne; pojedinačni `check:complexity` / `check:cognitive-complexity` ostaju za lokalni `--update`.
- **Zaštita `/api` od halucinacija** — ✅ **GOTOVO** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): jedan inventar datotečnog sustava za `src/app/api`; openapi-routes + docs-symbols i dalje izvješćuju neovisno; pojedinačne provjere ostaju za lokalna izvođenja.
- **`check:node-runtime` izvodi se u 11 poslova** — ⚠️ **nizak ROI.** Svaki je zaseban izvršitelj, a provjera traje <1 s; ukupna ušteda iznosi ~10 s, uz gubitak jeftine zaštite po poslu. Nije vrijedno previranja.
- **`typecheck:noimplicit:core` u CI poslu lint** — ✅ **uklonjeno iz posla lint** (bilo je savjetodavno uz `continue-on-error`); blokirajuću površinu tipova čine `typecheck:core` + `check:type-coverage`. Lokalna skripta je zadržana.

### Promijeniti status / odlučiti (politika operatera)

- `check:openapi-security-tiers` (savjetodavno) — ❌ **NE može se jednostavno prebaciti.** Završava s 0, ali upozorava da nekoliko ruta `traffic-inspector` pod `LOCAL_ONLY_API_PREFIXES` nema oznaku `x-loopback-only: true`. Za njegovo nametanje najprije je potrebno dodati te oznake u `openapi.yaml`.
- `typecheck:noimplicit:core` (savjetodavno) — uglavnom ga zamjenjuje blokirajuća čegrtaljka `check:type-coverage`. Prebaciti na čegrtaljku ili ukloniti suvišni drugi prolaz `tsc`.
- `test:vitest:ui` (sada **blokirajuće**) — postojeći neuspjesi izričito su isključeni u `vitest.config.ts` uz komentare za praćenje `// #8618`; novi neuspjesi uzrokuju neuspjeh posla.
- `check:secrets` (gitleaks, blokirajuća čegrtaljka zamrznuta na 3 dokumentirana lažno pozitivna rezultata) — dodati ta 3 rezultata na popis dopuštenih kako bi se došlo do 0 ili spustiti na savjetodavni status. Preklapa se s GitHubovim izvornim skeniranjem tajni + `check:public-creds`.
- `check:pr-evidence` (blokirajuće, pretražuje prozni tekst tijela PR-a) — visok rizik od lažno pozitivnih rezultata; uklanjanje slabi provedbu strogog pravila br. 18, stoga je ovo stvarna politička odluka.
- `semgrep` (savjetodavni samostalni tijek) — preklapa se s CodeQL-om za OWASP obitelji; povezati njegovu osnovnu vrijednost s čegrtaljkom ili ga ukloniti.

---

## Povezana dokumentacija

- Lanac opskrbe (podrijetlo, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — kontrola podudarnosti skupova ključeva

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, zadatak `i18n-ui-coverage`).
Uspoređuje skup krajnjih ključeva svake datoteke `src/i18n/messages/<locale>.json` s datotekom `en.json` i prijavljuje
neuspjeh za svaki nedostajući ili suvišni krajnji ključ, bez obzira na to kada je ključ dodan. Rezervirana mjesta
`__MISSING__:` smatraju se prisutnima (njihov je sadržaj odgovornost kontrole omjera). To je apsolutna dopuna
dvjema kontrolama temeljenima na razlikama/postocima: `check-ui-keys-coverage` provodi donju granicu od 80 % po
lokalizaciji (43 nedostajuća ključa od približno 13.000 i dalje daju 99,7 %), a `check-new-key-coverage` procjenjuje
samo ključeve koje PR dodaje u `en.json`. Skup lokalizacija generira se iz verzije datoteke `en.json` dostupne na dan
izrade njegove grane te se prevodi danima, dok osnovna grana nastavlja dobivati nove ključeve; PR skupa sam ne dodaje
nijedan ključ, pa su obje srodne kontrole ostale nijeme kada je skup 1 (#13044) spojen s 43 nedostajuća ključa u devet
lokalizacija, a skup 2 (#13660) s 10 nedostajućih ključeva u osam lokalizacija (2026-09-15). Neuspješnu kontrolu popravite naredbom
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; krajnji ključ označen kao `extra`
znači da je uklonjen iz izvora — izbrišite ga iz lokalizacije. `--warn` izvještava bez prijave neuspjeha.
`--catalog=cli` pokreće istu usporedbu nad `bin/cli/locales` (`npm run i18n:check-keys:cli`);
oba se koraka nalaze u zadatku `i18n-ui-coverage`.

#### `check-new-key-coverage` — i18n kontrola novih ključeva

Srodna kontrola kontroli `check-ui-value-drift`. Ona otkriva englesku vrijednost koja je **prepisana**
dok su njezini prijevodi ostali nepromijenjeni; ova otkriva engleski ključ koji je **dodan**
dok ga neke lokalizacije nikada nisu dobile.

`check-ui-keys-coverage` ne može otkriti ovu vrstu problema: provodi donju granicu postotka po lokalizaciji, a
jedanaest nedostajućih ključeva od približno 13.000 ostavlja pokrivenost na 99,9 %. Postotak po jeziku ne može
izraziti „ova je funkcionalnost objavljena neprevedena” — cijela funkcionalnost može stići u novu lokalizaciju bez
ikakvog teksta, a da se broj nikada ne promijeni.

Incident koji ta kontrola kodificira: 3. faza Orchestration Canvasa prevela je svojih jedanaest ključeva u
42 lokalizacije koje su tada postojale. Nekoliko sati poslije skup jezika EU-a (#13044) povećao je broj lokalizacija u repozitoriju
na 51, a devet novih (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) nikada
ih nije dobilo. `deepMergeFallback` zamjenjuje nedostajući ključ engleskim tekstom, pa je posljedica bila
neprevedeno, a ne prazno korisničko sučelje — stvaran problem koji je po svojoj prirodi ostao neprimijećen.

Kao i njezina srodna kontrola, i ova je **svjesna razlika** te uspoređuje engleski na zajedničkoj osnovi spajanja s radnim
stablom, pa postojeći nedostaci ostaju zamrznuti i za uključivanje kontrole nije bila potrebna migracija.

**Oznaka `__MISSING__:<english>` ne zadovoljava kontrolu (od 2026-09-17).** Prije je služila kao
dokumentirana odgoda — tijekom izvođenja koristi se ispravan engleski tekst kao pričuvna vrijednost — sve dok osam PR-ova funkcionalnosti
2026-09-16 nije dodalo 61 ključ i postavilo oznaku u svih 65 lokalizacija umjesto prevođenja: ova je
kontrola prihvatila svaki od njih, ništa nije blokiralo PR-ove, a blokirajuća kontrola omjera stvarnih prijevoda
zatim je pala na vrhu grane izdanja za sve (pt-BR 3,2 % > 2,5 % + 0,5). Oznaka se sada smatra
nedostajućim prijevodom. Neuspješnu kontrolu popravite naredbom
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` ili
sve lokalizacije paralelno naredbom `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
sigurna za odvojeno izvođenje, odbija se pokrenuti bez varijabli okruženja `OMNIROUTE_TRANSLATION_*`). Ključ koji mora ostati
na engleskom (fiksirani naziv proizvoda/mehanizma/zastavice) pripada u `scripts/i18n/untranslatable-keys.json`,
nikada iza oznake. `vi` u potpunosti zabranjuje oznake (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — kontrola odloženih testova

Datoteka na popisu `exclude` u `vitest.config.ts` test je koji se ne izvršava, a onome tko pregledava
stablo izgleda kao pokrivenost. Šezdeset dvije datoteke nakupile su se iza komentara
`// #8618 — postojeći neuspjeh; uklonite ovo izuzeće kada bude ispravljen`. Problem #8618 zatvoren je
2026-08-11, dok je popis koji je pratio narastao s 45 na 62 stavke, pri čemu je svaka nova naslijedila komentar
koji je upućivao na zatvoren problem. Kada je popis napokon izmjeren datoteku po datoteku (#13204), **51 od 62
testa prošao je na trenutačnom stablu bez ikakve promjene izvornog koda**.

Kontrola zahtijeva da svako izuzeće koje se razrješava u stvarnu datoteku (a) navodi problem za praćenje i
(b) postoji u `config/quality/vitest-exclusions.json` sa svojim izmjerenim statusom, tako da je dodavanje izuzeća
razlika koja se može pregledati u namjenskoj datoteci, umjesto još jednog retka u polju sa 60 stavki. Kontrola namjerno
ne pokreće ponovno izuzete testove — to traje približno 10 minuta i pripada periodičnom zadatku; inventar
bilježi kada je svaki od njih posljednji put izmjeren.
