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

## Inventar kapije i profili izvršenja

### Prijem kandidata

CI i Quality Gates radni tok svaki daje stabilnu presudu: `Gate / CI` i `Gate / Quality`. Njihova verzionirana politika prijema nabraja svaki prethodni posao prema potrebi ili savjetu. Primjenjivi traženi posao mora uspjeti: nedostaje, otkazan, preskočen, na čekanju i nepoznati rezultati ne mogu uspostaviti PASS. Važeća klasifikacija samo za dokumente ili samo za katalog može učiniti traku koda neprimjenjivom; nacrt PR nije prihvaćen kandidat. `hotfix` oznaka ne odustaje od dokaza.

Oba toka rada pokrivaju PRs u main/release grane, potiskuje u `main`, ručno otpremanje i događaje spajanja grupe. Push, dispatch i merge-group pokreću punu selekciju. Guranje na `release/**` ih ne pokreće (2026-10-18): svaka promjena je već pokrenula matricu na svom PR i spojena kombinacija je Release-Green-ov posao (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks i stapanje grupe koriste hostovane runnere za poslove koji inače biraju samo-hostovane runnere; dovoljan hostovani kapacitet se mora provjeriti prije uvođenja.

Običan PR pokreće brzu selekciju. `full-code` i `full-code-e2e` trake politike prijema (E2E, integracija, artefakt paketa, Electron smoke, Bun SQLite, klijenti ekosistema i protokola) pokreću se samo na nacrtu reda za spajanje ili na punom pokretanju: `gh workflow run ci.yml --ref <branch>`.

### Red za spajanje

Oznaka `queue` šalje PR u red za spajanje (`.mergify.yml`). Objedinjavanje otvara nacrt PR na `mergify/merge-queue/` grani, CI tamo pokreće punu selekciju, a originalni PR se spaja kada `Gate / CI`, `Gate / Quality` i `Merge integrity (changelog + generated skills)` prođu.

Mergify upisuje svoj sažetak reda u opis nacrta, a druge aplikacije ga također mogu uređivati. Događaj `pull_request` `edited` na takvom nacrtu uzima sopstvenu grupu konkurentnosti (`-queue-edit-<run_id>`) tako da ne može otkazati stvarno pokretanje nacrta i preskače kapiju i matricu. Samo `Merge integrity` još uvijek radi. Posao preskočenih vrata nosi drugačije ime provjere, jer Mergify čita preskočeni `Gate / CI` kao neuspješnu provjeru i iz reda stavlja PR.

Nakon dequeua, push ne stavlja uvijek u red PR. Komentirajte `@mergifyio queue` na to.

Svaki JSON račun identifikuje odjavljeni SHA, radni tok i pokušaj. CLI odbija checkout/event SHA neusklađenost. Testovi toka posla vezuju članstvo u politici za `needs` listu posla presude tako da nova ili uklonjena traka ne može tiho nestati. Računi pokrivaju njihov vlastiti tok rada, a ne objavljivanje, implementaciju ili unutrašnje dijelove postojećeg savjetodavnog skenera. Aktiviranje oba imena provjera u pravilima grane je zasebna administrativna promjena; dodavanje ovih poslova samo po sebi ne štiti granu.

### Statički inventar skeniranja

Versionirani npm-alias inventar i članstvo u statičkom skeniranju žive u `config/quality/gate-manifest.json`. Pokrenite `npm run check:gate-manifest` da potvrdite imena skripti i tačne komande protiv `package.json`; dodavanja, uklanjanja i drift komandi ne uspijevaju i lokalni zakačci i poslovi promjene-klasifikacije u CI. Alias nije posao toka posla, instanca matrice ili testni slučaj: ovi brojevi ne smiju biti predstavljeni kao zamjenjivi.

Koristite `npm run quality:scan -- --list` ili `npm run quality:scan:fast -- --list` za pregled odabranih alijasa bez njihovog izvršavanja. Runner poziva npm ulaznu tačku, tako da je njegovo vrijeme izvođenja (uključujući Bun gdje je konfigurirano) sačuvano. Manifest bilježi pseudonime izvan tih profila kao zasebno pozvane, a naredbe održavanja su zabranjene u profilima skeniranja samo za čitanje.

Ovi profili pokrivaju samo statičko skeniranje. Oni ne potvrđuju testove proizvoda, pokrivenost, pakovanje, eksterne provjere ili potpuno prihvaćanje od strane kandidata. Prijem toka posla koristi povezane `config/quality/admission-policy.json` i `scripts/quality/admission-verdict.mjs`. Profili posmatrača oslobađanja ostaju odvojeni; nezavisno pregledaju njihove primjenjive čekove i račune. Prozni inventar ispod je referenca, a ne dokaz da je kapija zaista prošla.

Skripte žive pod `scripts/check/` (policy gates) i `scripts/quality/` (ratchet engine). CI izvor istine je `.github/workflows/ci.yml`.

### Otpustite PR fast-path (`quality.yml`)

`.github/workflows/quality.yml` dopunjuje CI na main/release PRs, gura u `main`, šalje i spaja grupe. PRs koristi brze provjere filtrirane putem. Trajno onemogućena duplirana verzija je uklonjena; prave build/package/boot provjere ostaju u CI. Jedinica i vitest rade samo u CI (`Unit Tests (N/8)` i `Vitest`).

| Posao                                            | Obim                                                                                                                                                          | Blokiranje               |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs i docs-all                                                                                                                       | Da                       |
| `Fast Quality Gates`                             | Code PRs; statičke provjere, tipska provjera, tipska provjera kontrolne ploče, pogođeni testovi jedinice, zaboravljeni testovi brata i sestara (savjetodavni) |
| `No new ESLint warnings`                         | Code PRs; štitnik od dlačica koji je svestan supresije                                                                                                        | Da, uključujući viljuške |
| `Merge integrity (changelog + generated skills)` | Non-draft PRs; dnevnik promjena i generirana sinhronizacija vještina                                                                                          | Da, uključujući viljuške |

#### Zaboravljeni izvještaj o testovima

`npm run check:forgotten-sibling-tests` radi kao savjetodavni korak za `Fast Quality Gates` i ponovo koristi razrješavač uvoza iza mape probnog utjecaja. Za svaki promijenjen proizvodni modul, on prijavljuje determinističke `changed module/symbol -> static consumer -> candidate sibling test` lance kada test kandidata izostane iz razlike zahtjeva za povlačenjem. Sažetak Markdowna i JSON rezultat se zadržavaju kao artefakt `forgotten-sibling-tests` toka posla za kalibraciju prije bilo kakvog uvođenja blokiranja.

Ponovni izvoz barela i dinamički uvoz samo su dijagnostika rezolucije; oni nikada ne stvaraju blokirajući nalaz. Recenzirani izuzeci uživo u `config/quality/forgotten-sibling-allowlist.json`. Svaki unos mora imenovati test potrošača i kandidata, dati specifično obrazloženje i povezati GitHub problem ili zahtjev za povlačenjem. Pogrešno oblikovani unosi nisu uspjeli zatvoriti. Izuzeci ne mogu potisnuti obrisani test kandidata ili diff koji dodaje `.skip`/`.todo`; slabljenje tvrdnji i drugo maskiranje ostaju u vlasništvu `check:test-masking` kapije koja nezavisno blokira.

### Posao: `lint`

Radi na svakom PR do `main`. Blokovi se spajaju u slučaju kvara.

| skripta (`npm run ...`)           | Validates                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Blokiranje                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Node.js verzija je unutar podržanog raspona                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                           |
| `check:cycles`                    | Cirkularni uvoz u cijelom `src/` + `open-sse/` (zasnovano na AST-u, riješen tsconfig `paths` ). Goli izlazi iz 1 kad god postoji bilo koji ciklus (zatvoren bez greške od #15281) i navodi SCCs. `check:cycles:ratchet` (šta CI pokreće) blokira kada broj premaši `metrics.cycles` plafon u `quality-baseline.json` — trenutno 14, `direction: down`, tako da može samo pasti (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | da (čegrtaljka)                              |
| `check:boundary`                  | `open-sse → src` spajanje: jedinstveni uvoz datoteke u datoteku iz motora u aplikaciju (`scripts/quality/measure-boundary.mjs`; lista rubova je v4 core/module-split remedijacijski zaostatak). Goli = savjetodavni izvještaj (isto kao `quality:boundary`). `check:boundary:ratchet` (ono što CI pokreće, takođe u `quality.yml` brzim vratima sa začepljivanjem) blokira kada brojanje premaši `metrics.boundaryOpenSseToSrc` plafon u `quality-baseline.json` — zadanom na izmjerenom 771, `direction: down`; `--update` ga samo snižava; bazni relativni na PRs (`--base-ref`, vidi dolje)                                                                                                                                                                                                                                                                                                                                                          | da (čegrtaljka)                              |
| `check:route-validation:t06`      | Zod šeme prisutne na svim rutama (pravila nivoa 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                           |
| `check:any-budget:t11`            | `@ts-expect-error // any` count ne prelazi budžet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `check:provider-consistency`      | Svaki provajder u `providers.ts` ima odgovarajući unos u `providerRegistry.ts` (i obrnuto, unutar liste dozvoljenih)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:model-lifecycle`           | Tri ručno održavane tabele rutiranja ostaju konzistentne sa prijavljenom snapshotom životnog ciklusa (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ne postiže nijedan povučeni ID koji `REGISTRY` može usmjeriti; svaki `BUILT_IN_ALIASES` cilj je prisutan u `REGISTRY` i odsutan je iz snimka penzionisanog ID-a; svaki povučeni ID koji je još uvijek u `REGISTRY` se prosljeđuje ili navodi u `allowedRetiredInCatalog`; i nijedan `DEFAULT_DEGRADATION_MAP` izvor ili cilj se ne pojavljuju povučeni u tom snimku. Ovo ne dokazuje da se model trenutno opslužuje uzvodnim putem uživo. Offline — upoređuje sa `config/quality/model-lifecycle.json`, osvježenim ručno pomoću `npm run quality:refresh-model-lifecycle` (mreža; nije spojeno u CI). `allowedRetiredInCatalog` je sagorevanje: dodajte unos samo sa problemom praćenja.                                                                                                              | Da                                           |
| `check:fetch-targets`             | Svaki `fetch("/api/...")` u `src/` na strani klijenta razrješava se u pravi `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `check:deps`                      | Svi `npm install` -able depovi preko svakog `package.json` u repo su u `dependency-allowlist.json`; označeni novi otkvačeni ili slopsquatted paketi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `audit:deps`                      | `npm audit` (korijenski + elektron) — bez high/critical savjeta (preklapa se osv `check:vuln-ratchet`; vidi zaostatke racionalizacije)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `check:lockfile`                  | `package-lock.json` integritet — https registar, hešovi integriteta, bez zamjene hosta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `check:licenses`                  | lista dopuštenja SPDX licence za ovisnosti o proizvodnji                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Da                                           |
| `check:tracked-artifacts`         | Nema artefakata građenja / učinjenih `node_modules` simboličnih veza (također radi u husky pre-commit; pre-push je namjerno lagan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                           |
| `check:ai-attribution`            | Nema prikolice AI/bot `Co-Authored-By` ili podnožja AI-generacije u PR urezivanja, naslova ili tijela — Hard Rule #16 (u `quality.yml` petlji brzih vrata za PR→ `release/**` — čita sadržaj događaja, no-op off PRs — i korak samo za PR za `ci.yml` PR `main` također `commit-msg` → hook dozvoljeni koautori #14436                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:vitest-exclusions`         | Svako Vitest izuzimanje imenuje problem praćenja i pojavljuje se u `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `check:file-size`                 | Izvorni fajlovi (`.ts`/`.tsx` u `src/`, `open-sse/`, `electron/`, `bin/`) ostaju unutar `cap` a test fajlovi (`*.test.ts(x)`) unutar `testCap`; datoteke zamrznute u `file-size-baseline.json` (`frozen` / `testFrozen`) ne smiju prerasti svoju snimljenu veličinu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `check:error-helper`              | Odgovori na greške u executors/handlers koriste `buildErrorBody()` / `sanitizeErrorMessage()` (tvrdo pravilo #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                           |
| `check:migration-numbering`       | SQL datoteke za migraciju su sekvencijalno numerisane, bez praznina ili duplikata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                           |
| `check:public-creds`              | Nema literalnih OAuth `client_id`/`client_secret` ili Firebase web ključeva izvan `publicCreds.ts` (tvrdo pravilo #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `check:db-rules`                  | Nema sirovog SQL izvan `src/lib/db/` modula; nema uvoza barela iz `localDb.ts` (tvrda pravila #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:known-symbols`             | Izvršioci provajdera, strategije usmjeravanja i prevodioci registrirani u njihovim tablicama otpreme odgovaraju datotekama na disku — bez napuštenih ili nedeklariranih simbola                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                           |
| `check:route-guard-membership`    | Svaka ruta koja pokreće podređeni proces je klasifikovana po `isLocalOnlyPath()` (tvrda pravila #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Da                                           |
| `check:test-discovery`            | Svaki `*.test.ts` / `*.spec.ts` fajl u repo-u prikuplja najmanje jedan test pokretač (ratchet: lista siročadi u `test-discovery-baseline.json` može se samo smanjiti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                           |
| `check:test-tla-order`            | Nijedan `node:test` fajl pod `tests/unit` ne registruje test, pogađa `await` najvišeg nivoa, a zatim registruje više (#18045; ratchet: `test-tla-order-allowlist.json` se može samo smanjiti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Da                                           |
| `check:agent-skills-sync`         | Generirani artefakti vještina agenta odgovaraju njihovom izvornom katalogu (bez pomaka)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:provider-asset-provenance` | Provajder logos/assets nosi zabilježeni unos porijekla                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `lint:json`                       | JSON konfiguracijske datoteke analiziraju i zadovoljavaju pravila repo linta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `typecheck:core`                  | TypeScript kompilacija bez grešaka (samo savjetodavna upozorenja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                           |
| `typecheck:noimplicit:core`       | Strogi `noImplicitAny` — usmjeren prema budućnosti; mnogim već postojećim lokacijama za pozive i dalje su potrebne napomene                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **Savjetodavno** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` u opsegu do `src/app/(dashboard)/**` (#7033) — `typecheck:core`-ova kurirana lista dozvoljenih datoteka od 27 datoteka ne uključuje nijednu kontrolnu tablu TSX, a `next build` ni nju nikada ne provjerava (`next.config.mjs` postavlja `ignoreBuildErrors: true`), tako da su regresije siročeta identifikatora tamo (#6625/#6909CI bile nevidljive. Diffs u odnosu na zamrznutu osnovnu liniju brojanja per-file/per-TS-code (`config/quality/dashboard-typecheck-baseline.json`, isti obrazac zastarjele primjene kao `check:known-symbols`) — samo NEW greške izvan osnovnog brojanja ne uspijevaju na kapiji; zategnite `--update` kada se popravi već postojeća greška.                                                                                                                                                                                                                                                                    | Da                                           |
| `check:build-typecheck`           | Provjera tipa proizvodnje cijele aplikacije preko `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), površinske `typecheck:core` liste dopuštenih od 27 datoteka i kapije kontrolne ploče ne pokrivaju. Diffs against `config/quality/build-typecheck-baseline.json`; novi ili povećan broj po (datoteci, kodu) ne uspijeva, manji broj traži od vas da zategnete. `--update` odbija dok run sadrži novi ili podignuti par osim ako `--force-regressions` nije proslijeđen, i odbija novo utišani fajl osim ako se ne prođe `--force-nocheck`, tako da su proširenje osnovne linije kako bi se dobilo zeleno i davanje trajne tišine dva odvojena namjerna čina. Goli `--force` je odbijen. Također skenira opseg izgradnje za `@ts-nocheck` protiv `config/quality/ts-nocheck-baseline.json`, jer datoteka koja ga koristi ne prijavljuje nikakvu dijagnostiku i inače bi bila nevidljiva za svaku kapiju. | Da                                           |

#### Dva programa za provjeru tipa odgovaraju različito

`typecheck:core` i `check:build-typecheck` kompajliraju različite programe pod različitim opcijama, i isti fajl može biti čist u jednom i pun grešaka u drugom.

`tsconfig.build.json` postavlja `"strict": false`, tako da je `noImplicitAny` isključen. Osnovna konfiguracija kompajlira odabranu listu dozvoljenih datoteka od 27 datoteka sa strožim opcijama i prati grafikon uvoza svakog unosa, tako da se datoteke koje se nikada ne pojavljuju u programu za pravljenje i dalje tamo provjeravaju.

Posljedica je bitna kada se procjenjuje da li je datoteka otkucana:** nula dijagnostika pod `check:build-typecheck` ne znači nula** . Skidanje `@ts-nocheck` iz 26 fajlova pokazalo je da su 23 od njih čista u programu za pravljenje; šesnaest od njih je isplivalo oko 120 implicitnih – bilo koja greška u strogom. Provjerite oba prije pozivanja datoteke clean.

### Posao: `quality-gate`

Trči nakon `test-coverage`. Blokovi se spajaju u slučaju kvara.

| Skripta                      | Validates                                                                                                                                                                            | Blokiranje                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `quality:collect`            | Emituje `quality-metrics.json` (broj upozorenja ESLint, pokrivenost iz izvještaja spojenog dijela)                                                                                   | Da (uzvodno od čegrtaljke) |
| `quality:ratchet`            | Svaka metrika u `quality-baseline.json` nije regresirala (ESLint upozorenja ≤ osnovna linija; pokrivenost ≥ osnovna linija)                                                          | Da                         |
| `check:duplication`          | Dupliciranje koda (jscpd@4) ne prelazi osnovnu liniju u `quality-baseline.json`                                                                                                      | Da                         |
| `check:complexity`           | Ciklomatska složenost na nivou datoteke ne prelazi ograničenje (jezgro ESLint `complexity` + `max-lines-per-function`)                                                               | Da                         |
| `check:cognitive-complexity` | Kognitivna složenost ratchet (`eslint-plugin-sonarjs`) — odvojeni ESLint prolaz; CI radi obje spojene kao jedan `check:complexity-ratchets` korak                                    | Da                         |
| `check:dead-code`            | Neiskorišteni izvozi / datoteke ratchet (knip) ne regresiraju u odnosu na osnovnu liniju                                                                                             | Da                         |
| `check:compression-budget`   | Budžetski standard kompresije — po motoru donji prag uštede tokena ne smije nazadovati                                                                                               | Da                         |
| `check:type-coverage`        | Ratchet (`type-coverage`) ne regresira; uglavnom obuhvata `typecheck:noimplicit:core`                                                                                                | Da                         |
| `check:codeql-ratchet`       | Broj otvorenih CodeQL upozorenja se ne regresira (čita se putem `gh api`; graciozno preskakanje bez tokena) kadenca — osvježavanja i ručni okidač: pogledajte "CodeQL ratchet" ispod | Da                         |

### Posao: `quality-extended`

Cijeli posao je savjetodavni (`continue-on-error: true`). npm-bazirani ratchets rade stvarno; eksterni skeneri se instaliraju preko `gh release download` i sami preskaču (izlaz 0) kada binarni program još uvijek nema.

| Skripta                  | Validates                                                                                                                                                                                                     | Blokiranje                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `check:circular-deps`    | Nema kružnih zavisnosti (dpdm)                                                                                                                                                                                | **Savjetodavno**                                      |
| `check:bundle-size`      | Veličina paketa ne prelazi ograničenje                                                                                                                                                                        | **Savjetodavno**                                      |
| `check:secrets`          | Tajno skeniranje (gitleaks) — preskače ako je binarno odsutno                                                                                                                                                 | **Savjetodavno**                                      |
| `check:vuln-ratchet`     | Ranjivosti ovisnosti (osv-skener) ne regresiraju — preskače ako je binarno odsutno                                                                                                                            | **Savjetodavno**                                      |
| `check:workflows`        | Radni tok lint (actionlint + zizmor); missing/broken skeneri, nevažeći izvještaji ili nedostajuća bazna linija ne uspijevaju kao INCOMPLETE. Valjani nalazi slijede odabranu strict/advisory/ratchet politiku | Potrebno izvršenje; zizmor blokiranje čegrtaljke u CI |
| `check:openapi-breaking` | Prekidanje promjena javnog API ugovora (`openapi.yaml`) naspram osnovne grane (oasdiff) — emituje `openapiBreaking=N`; preskače ako oasdiff nema ili je osnovna specifikacija nerješiva                       | **Savjetodavno**                                      |

### Posao: `docs-sync-strict`

Radi na svakom PR do `main`. Blokovi se spajaju u slučaju kvara.

| Skripta                        | Validates                                                                                                                                                         | Blokiranje                 |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | Meta-kapija koja uzastopno pokreće 6 pod-kapija ispod                                                                                                             | Da                         |
| ↳ `check:docs-sync`            | konzistentnost verzije CHANGELOG / OpenAPI / llm.txt                                                                                                              | Da                         |
| ↳ `check:docs-counts`          | Brojevi u prozi (broj dobavljača, broj migracija, itd.) su unutar okvira stvarnog brojanja                                                                        | Da                         |
| ↳ `check:env-doc-sync`         | Svaka env var u `.env.example` je dokumentirana u tablici dokumenata, i obrnuto                                                                                   | Da                         |
| ↳ `check:deprecated-versions`  | Nema zastarjelih nizova verzije u dokumentima                                                                                                                     | Da                         |
| ↳ `check:doc-links`            | Interne veze za smanjenje vrijednosti u dokumentima rješavaju stvarne datoteke (`[text]`/`(path)` obrazac)                                                        | Da                         |
| ↳ `check:fabricated-docs`      | Rute, env vars, CLI komande, nazivi kukica i putanje datoteka citirani u dokumentima postoje u bazi koda. Tvrda kapija preko `--strict`; soft-fail bez zastavice. | Da (preko `--strict` u CI) |
| `check:cli-i18n`               | CLI komandni nizovi su prisutni u svim i18n datotekama lokalizacije                                                                                               | Da                         |
| `check:openapi-coverage`       | OpenAPI spec pokriva barem dio stvarnih ruta                                                                                                                      | Da                         |
| `check:openapi-security-tiers` | Napomene na nivou sigurnosti u `openapi.yaml` su u skladu sa `routeGuard.ts` klasifikacijama                                                                      | **Savjetodavno**           |
| `check:openapi-routes`         | Svaki put u `openapi.yaml` se pretvara u pravi `route.ts` (anti-halucinacija)                                                                                     | Da                         |
| `check:docs-symbols`           | Svaka `/api/...` referenca u `docs/**/*.md` se razvodi na pravi `route.ts` (anti-halucinacija)                                                                    | Da                         |
| `i18n translation drift`       | Neprevedeni ključevi u i18n datotekama lokalizacije samo — upozoravaju                                                                                            | **Savjetodavno**           |

Generira se dvanaest README SVGs pod `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` ih sve regeneriše). Svaki od njih ima jedinični test za poređenje bajtova (`tests/unit/docs/readme-*-svg.test.ts`, posao `test-unit`) koji ne uspijeva kada je urezana datoteka zastarjela, a `check:docs-counts` čita kanonske brojeve iz njihovih `<text>` čvorova — zbog čega korak obrisa čuva svaki ocrtani niz u datoteci kao nevidljiv `<text>`. SVG provjera kanonskih brojeva čita datoteke navedene u `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` i `tier-flow-light.svg`; tvrdnje o besplatnom zauvijek, unosu u katalog, recurring-pool i faktorima bodovanja također glase `promise-pillars.svg`, `free-tier-budget.svg` i `strategies-grid.svg`. `free-tier-budget.svg` izvlači svoje brojke iz živog učitavača kataloga, tako da promjena u `FREE_MODEL_BUDGETS` ili u ime za prikaz provajdera crvena CI dok se taj fajl ne regeneriše.

### Posao: `i18n-ui-coverage`

| Skripta                           | Validates                                                                                                                                                                                                      | Blokiranje       |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage` (inline) | UI i18n pokrivenost ključem je ≥ 65%                                                                                                                                                                           | Da               |
| `check-ui-value-drift` (inline)   | Prepisani engleski** vrijednost** ne ostavlja zastarjeli prijevod iza sebe                                                                                                                                     | Da               |
| `check-new-key-coverage` (inline) | A** novo** Engleski ključ se prevodi u svakom lokalu — `__MISSING__:` marker je odbijen                                                                                                                        | Da               |
| `check-translation-ratio`         | Omjer stvarnog prijevoda po lokalizaciji (identičan na engleskom / rezervirano mjesto / nedostajući listovi izvan liste dopuštenih) ne smije premašiti `config/quality/i18n-translation-baseline.json` + slack | **Savjetodavno** |

Potreban je `fetch-depth: 0` — kapija pomjeranja vrijednosti diffs `en.json` u odnosu na bazu spajanja.

#### `check-ui-value-drift` — stale-translation kapija

Hvata jednu i18n regresiju koju druge kapije strukturno ne mogu vidjeti: engleska vrijednost je prepisana i prijevodi izvedeni iz _prethodnog_ engleskog ostaju iza, tako da korisnici koji nisu engleski nastavljaju čitati samouvjereno napisanu, sada pogrešnu kopiju.

Ovo je stvarno poslano. `oauthModal.googleOAuthWarning` je prepisan kada je Antigravity pomoćnik za prijavu sletio (#5203);** 39 od 43 lokaliteta** zadržao tekst koji govori operaterima da "kopiraju cijeli URL i zalijepe ga ispod" — tok koji se ne može završiti za tog provajdera. Prošlo je nezapaženo do #8463 jer:

- `sync-ui-keys` popunjava samo ključeve koji su** odsutan** , nikad one koje jesu** ustajao** ;
- `check-ui-keys-coverage` broji ključno _prisutnost_, tako da se zastarjeli prijevod smatra pokrivenim;
- `check-translation-drift` prati `docs/i18n/<locale>/**.md` dokumentaciju preslikava — nikad ne čita `src/i18n/messages/*.json`. Blokiranje u poslu `docs-sync-strict` od ponovne sinhronizacije 2026-09: uredite osnovni dokument → `npm run i18n:run -- --files=<doc>` (na nivou odjeljka, jeftino).

**Svjestan razlike, ne baziran na bazi.** On upoređuje `en.json` na bazi spajanja sa radnim stablom; za svaki ključ čija je engleska vrijednost promijenjena, bilo koja lokacija koja još uvijek ima netaknuti prijevod je zastarjela. Ovo namerno** zamrzava već postojeći dug** — a diff ne može otkriti s kojeg starog engleskog je došao dugogodišnji prijevod, tako da kapija prosuđuje samo ono što trenutna promjena dotiče. Alternativa (osnovna linija heširanja po ključu) bi koštala ~ 600 KB generisanu datoteku, 3 × najveću postojeću osnovnu liniju, koja se izbacuje na svaki i18n PR.

Dva načina da se to zadovolji:

1. ažurirati zahvaćene prijevode, ili
2. postavite ih na `__MISSING__:<new english>` — vrijeme izvođenja tada služi ispravljeni engleski (`src/i18n/request.ts::deepMergeFallback`, #7258) i redove ključeva za prijevod.

Ako je niz** značenje** promijenio, preferiram** preimenovanje ključa** : novi ključ ne može naslijediti zastarjeli prijevod. To je obrazac #8463 koji se koristi.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Izlazi iz 0 sa `SKIP reason=base-unresolved` kada se osnovni katalog ne može pročitati (plitki klon bez osnovne reference), zrcaljenje `check-openapi-breaking`.

### Posao: `i18n`

Potpuna i18n matrica validacije (jedan posao po lokalizaciji). Cijeli posao je savjetodavan.

| Skripta                         | Validates                             | Blokiranje                                                    |
| ------------------------------- | ------------------------------------- | ------------------------------------------------------------- |
| `validate_translation.py quick` | Kompletnost prijevoda po lokalizaciji | **Savjetodavno** (`continue-on-error: true` na cijelom poslu) |

### Posao: `pr-test-policy`

Radi samo na zahtjevima za povlačenjem.

| Skripta                | Validates                                                                                                                             | Blokiranje |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PRs koji mijenja proizvodni kod u `src/`, `open-sse/`, `electron/` ili `bin/` mora uključiti ili ažurirati testove (tvrdo pravilo #8) | Da         |
| `check:test-masking`   | Promijenjene testne datoteke ne smanjuju broj neto tvrdnji niti dodaju `assert.ok(true)` tautologije                                  | Da         |
| `check:pr-evidence`    | PR tijelo citira test/VPS dokaze za promjenu (mehanizuje Hard Rule #18 grepping PR prose — fragile, vidi Backlog)                     | Da         |

### Posao: `test-vitest`

Trči nakon `build`. Blokovi se spajaju u slučaju kvara.

| Suite            | Validates                                                | Blokiranje                                                                                                          |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 alata), autoCombo, cache — vitest runner | Da                                                                                                                  |
| `test:vitest:ui` | UI komponenta testira — vitest runner                    | **Blokiranje** — već postojeći kvarovi su eksplicitno isključeni u `vitest.config.ts`; novi neuspjesi ne uspijevaju |

### Noćni radni tokovi (planirani, savjetodavni)

Ovi se pokreću na cron rasporedu (i `workflow_dispatch`), nikad na PRs. Svi su savjetodavni.

| Workflow               | Validates                                                                                                                                              | Blokiranje       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `nightly-property`     | brza provjera testova svojstava sa nasumičnim početnim + velikim brojem pokretanja                                                                     | **Savjetodavno** |
| `nightly-resilience`   | kapija rasta gomile, haos fault-injection, k6 load/soak                                                                                                | **Savjetodavno** |
| `nightly-llm-security` | promptfoo injection guard (blok mod) sonde + garak (preskočeno bez tajne provajdera)                                                                   | **Savjetodavno** |
| `nightly-schemathesis` | OpenAPI ugovor fuzzing (šemateza) protiv živog OmniRoute koristeći kršenja specifikacije `docs/openapi.yaml` — površina / neobrađene 500s (faza 8 B.4) | **Savjetodavno** |
| `nightly-mutation`     | Strykerov rezultat testiranja mutacija preko brze jedinične trake — preživjeli mutanti na površini slabe tvrdnje                                       | **Savjetodavno** |
| `nightly-compat`       | Matrica kompatibilnosti motora čvorova u podržanim `engines.node` rasponima                                                                            | **Savjetodavno** |

Osnovne linije performansi (heap, TTFB, vrijeme izgradnje) se bilježe, a ne zatvaraju se: vidi [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
