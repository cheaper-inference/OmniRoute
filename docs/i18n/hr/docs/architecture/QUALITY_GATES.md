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

## Popis gateova i profili izvođenja

### Prijam kandidata

Tijekovi rada CI i Quality Gates svaki za sebe izdaju stabilan ishod: `Gate / CI` i
`Gate / Quality`. Njihova verzionirana politika prijama navodi svaki upstream posao
kao obavezan ili savjetodavan. Primjenjivi obavezni posao mora uspjeti: rezultati
koji nedostaju ili su otkazani, preskočeni, na čekanju ili nepoznati ne mogu
potvrditi PASS. Valjana klasifikacija docs-only ili catalog-only može učiniti traku
koda neprimjenjivom; PR u statusu skice (draft) nije prihvaćeni kandidat. Oznaka
`hotfix` ne oslobađa od dokaza.

Oba tijeka rada pokrivaju PR-ove prema granama main/release, pushove na `main`,
ručno pokretanje (dispatch) i događaje grupe spajanja (merge-group). Push, dispatch
i merge-group izvode potpuni odabir. Pushovi na `release/**` ne pokreću ih
(2026-10-18): svaka je promjena već prošla matricu na svom PR-u, a spojena je
kombinacija posao Release-Greena (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forkovi
i grupe spajanja za poslove koji bi inače odabrali self-hosted runnere koriste
hostane runnere; prije uvođenja potrebno je provjeriti dovoljan kapacitet hostanih
runnera.

Svaka JSON potvrda identificira SHA checkouta, pokretanje tijeka rada i pokušaj.
CLI odbija nepodudarnost SHA-ova checkouta i događaja. Testovi tijeka rada vežu
članstvo politike na popis `needs` posla s ishodom, pa nova ili uklonjena traka ne
može nezapaženo nestati. Potvrde pokrivaju vlastiti tijek rada, a ne objavu,
deployment ili unutrašnjost postojećeg savjetodavnog skenera. Aktiviranje obaju
naziva provjera u pravilima grana zasebna je administrativna promjena; dodavanje
ovih poslova samo po sebi ne štiti granu.

### Popis statičkog skeniranja

Verzionirani popis npm aliasa i članstvo u statičkom skeniranju nalaze se u
`config/quality/gate-manifest.json`. Pokrenite `npm run check:gate-manifest` kako
biste provjerili nazive skripti i točne naredbe u odnosu na `package.json`;
dodavanja, uklanjanja i odstupanja naredbi dovode do neuspjeha i lokalnog hooka i
poslova klasifikacije promjena u CI-ju. Alias nije posao tijeka rada, instanca
matrice ni testni slučaj: te se brojke ne smiju prikazivati kao međusobno
zamjenjive.

Upotrijebite `npm run quality:scan -- --list` ili `npm run quality:scan:fast -- --list`
za pregled odabranih aliasa bez njihova izvršavanja. Runner poziva npm ulaznu
točku, pa se njegov runtime (uključujući Bun gdje je konfiguriran) zadržava.
Manifest bilježi aliase izvan tih profila kao zasebno pozvane, a naredbe za
održavanje zabranjene su u profilima skeniranja samo za čitanje.

Ovi profili pokrivaju samo statičko skeniranje. Ne potvrđuju testove proizvoda,
pokrivenost, pakiranje, vanjske provjere ni potpunu prihvatljivost kandidata za
izdanje. Prijam u tijeku rada koristi povezane `config/quality/admission-policy.json`
i `scripts/quality/admission-verdict.mjs`. Profili Release-observera ostaju
odvojeni; njihove primjenjive provjere i potvrde pregledajte neovisno. Prozni
popis u nastavku referenca je, a ne dokaz da se gate doista izvršio.

Skripte se nalaze pod `scripts/check/` (gateovi politike) i `scripts/quality/`
(ratchet mehanizam). Izvor istine za CI je `.github/workflows/ci.yml`.

### Ubrzana putanja (fast-path) za PR izdanja (`quality.yml`)

`.github/workflows/quality.yml` nadopunjuje CI na PR-ovima prema granama
main/release, pushovima na `main`, dispatchu i grupama spajanja. PR-ovi koriste
brze provjere filtrirane po putanjama. Trajno onemogućeni dupli build uklonjen je;
prave provjere izgradnje/pakiranja/pokretanja ostaju u CI-ju.

| Posao                                            | Opseg                                                                                                                                                                                                                                 | Blokira                 |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | PR-ovi dokumentacije/koda; reference API dokumentacije i docs-all                                                                                                                                                                     | Da                      |
| `Fast Quality Gates`                             | PR-ovi koda; statičke provjere, typecheck, typecheck nadzorne ploče, zahvaćeni jedinični testovi                                                                                                                                      | Da                      |
| `Forgotten sibling tests`                        | PR-ovi koda; promijenjeni moduli prate se do statičkih potrošača i kandidata za srodne testove; barrel putanje i putanje dinamičkog uvoza prijavljuju se kao savjetodavna dijagnostika, s referenciranim iznimkama s allowlist popisa | **Savjetodavno**        |
| `Vitest (fast-path)`                             | PR-ovi koda; brzi vitest skup                                                                                                                                                                                                         | Da                      |
| `Unit Tests fast-path`                           | PR-ovi koda; jedinični skup u 4 sharda                                                                                                                                                                                                | Da                      |
| `No new ESLint warnings`                         | PR-ovi koda; lint zaštita koja uvažava supresije                                                                                                                                                                                      | Da, uključujući forkove |
| `Merge integrity (changelog + generated skills)` | PR-ovi koji nisu skice; sinkronizacija changelog-a i generiranih skillova                                                                                                                                                             | Da, uključujući forkove |

#### Izvještaj o zaboravljenim srodnim testovima

`npm run check:forgotten-sibling-tests` ponovno koristi razrješavač uvoza koji stoji iza mape utjecaja testova.
Za svaki izmijenjeni produkcijski modul izvještava o determinističkim
lancima `changed module/symbol -> static consumer -> candidate sibling test` kada kandidatni
test nije prisutan u diffu pull requesta. Markdown sažetak i JSON rezultat zadržavaju se kao
artefakt tijeka rada `forgotten-sibling-tests` radi kalibracije prije bilo kakvog blokirajućeg uvođenja.

Ponovni barrel izvozi i dinamički uvozi samo su dijagnostika razrješavanja; nikada ne stvaraju
blokirajući nalaz. Pregledane iznimke nalaze se u
`config/quality/forgotten-sibling-allowlist.json`. Svaki unos mora navesti potrošača i kandidatni
test, dati konkretno obrazloženje i povezati GitHub issue ili pull request. Neispravno oblikovani
unosi automatski se odbijaju. Iznimke ne mogu potisnuti obrisan kandidatni test niti diff koji dodaje
`.skip`/`.todo`; slabljenje tvrdnji i ostalo maskiranje ostaju u nadležnosti neovisno blokirajuće
kontrolne točke `check:test-masking`.

### Posao: `lint`

Pokreće se na svakom PR-u prema `main`. Blokira spajanje pri neuspjehu.

| Skripta (`npm run ...`)           | Provjerava                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Blokira                                      |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Node.js verzija je unutar podržanog raspona                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `check:cycles`                    | Kružni importi kroz cijeli `src/` + `open-sse/` (temeljeno na AST-u, razriješeni tsconfig `paths`). Bez argumenata izlazi s kodom 1 kad god postoji bilo koji ciklus (fail-closed od #15281) i ispisuje SCC-ove. `check:cycles:ratchet` (ono što CI pokreće) blokira kada broj premaši gornju granicu `metrics.cycles` u `quality-baseline.json` — trenutno 14, `direction: down`, pa može samo padati (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da (ratchet)                                 |
| `check:boundary`                  | Sprega `open-sse → src`: jedinstveni importi datoteka-u-datoteku iz enginea u aplikaciju (`scripts/quality/measure-boundary.mjs`; popis bridova čini zaostatak sanacije v4 core/module-split). Bez argumenata = savjetodavno izvješće (isto kao `quality:boundary`). `check:boundary:ratchet` (ono što CI pokreće, također u fast-gates ratchet petlji u `quality.yml`) blokira kada broj premaši gornju granicu `metrics.boundaryOpenSseToSrc` u `quality-baseline.json` — postavljena na izmjerenih 771, `direction: down`; `--update` je može samo sniziti; relativno prema bazi na PR-ovima (`--base-ref`, vidi dolje)                                                                                                                                                                                                                                                   | Da (ratchet)                                 |
| `check:route-validation:t06`      | Zod sheme prisutne na svim rutama (politika Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `check:any-budget:t11`            | Broj pojavljivanja `@ts-expect-error // any` ne prelazi budžet (zapornica razine 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                           |
| `check:provider-consistency`      | Svaki provider u `providers.ts` ima odgovarajući unos u `providerRegistry.ts` (i obrnuto, unutar allowliste)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Da                                           |
| `check:model-lifecycle`           | Tri ručno održavane tablice usmjeravanja ostaju usklađene sa snapshotom životnog ciklusa pohranjenim u repozitoriju (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ne ocjenjuje nijedan povučeni id koji `REGISTRY` može usmjeriti; svaki cilj iz `BUILT_IN_ALIASES` prisutan je u `REGISTRY` i odsutan iz snapshota povučenih id-ova; svaki povučeni id koji je i dalje u `REGISTRY` proslijeđen je ili naveden u `allowedRetiredInCatalog`; te se nijedan izvor ni cilj iz `DEFAULT_DEGRADATION_MAP` ne pojavljuje kao povučen u tom snapshotu. Ovo ne dokazuje da model trenutačno poslužuje aktivan upstream. Izvanmrežno — uspoređuje se s `config/quality/model-lifecycle.json`, ručno se osvježava pomoću `npm run quality:refresh-model-lifecycle` (mreža; nije spojeno na CI). `allowedRetiredInCatalog` je burn-down zapornica: unos dodajte samo uz tracking issue. | Da                                           |
| `check:fetch-targets`             | Svaki `fetch("/api/...")` u klijentskom dijelu `src/` razrješava se na stvarnu `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:deps`                      | Sve ovisnosti koje se mogu instalirati pomoću `npm install` u svim `package.json` datotekama u repozitoriju nalaze se u `dependency-allowlist.json`; novi nepinirani ili slopsquatted paketi označavaju se                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                           |
| `audit:deps`                      | `npm audit` (root + electron) — nema high/critical sigurnosnih preporuka (preklapa se s osv `check:vuln-ratchet`; vidi Rationalization Backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                           |
| `check:lockfile`                  | Integritet `package-lock.json` — https registar, hashovi integriteta, bez nadjačavanja hosta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Da                                           |
| `check:licenses`                  | SPDX popis dopuštenih licencija za produkcijske ovisnosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:tracked-artifacts`         | Nema artefakata izgradnje / commitanih `node_modules` simlinkova (također se izvodi u husky pre-commit; pre-push je namjerno lagan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `check:ai-attribution`            | Nema AI/bot `Co-Authored-By` trailera ni podnožja s naznakom AI generacije u PR commitovima, naslovu ili tijelu — Tvrdo pravilo #16 (u `quality.yml` fast-gates petlji za PR→`release/**` — čita payload događaja, ne radi ništa izvan PR-ova — i koraku samo za PR u `ci.yml` lintu za PR→`main`; također husky `commit-msg` hook; ljudski suautori su dopušteni; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                           |
| `check:vitest-exclusions`         | Svako Vitest izuzeće navodi issue za praćenje i pojavljuje se u `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                           |
| `check:file-size`                 | Izvorne datoteke (`.ts`/`.tsx` u `src/`, `open-sse/`, `electron/`, `bin/`) ostaju unutar `cap`, a testne datoteke (`*.test.ts(x)`) unutar `testCap`; datoteke zamrznute u `file-size-baseline.json` (`frozen` / `testFrozen`) ne smiju narasti iznad svoje zabilježene veličine                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                           |
| `check:error-helper`              | Odgovori grešaka u executorima/handlerima koriste `buildErrorBody()` / `sanitizeErrorMessage()` (Strogo pravilo br. 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                           |
| `check:migration-numbering`       | SQL datoteke migracija su sekvencijalno numerirane, bez praznina ili duplikata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                           |
| `check:public-creds`              | Nema doslovnih OAuth `client_id`/`client_secret` ili Firebase Web ključeva izvan `publicCreds.ts` (Strogo pravilo br. 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:db-rules`                  | Nema sirovog SQL-a izvan `src/lib/db/` modula; nema barrel-importa iz `localDb.ts` (Stroga pravila br. 2/br. 5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                           |
| `check:known-symbols`             | Executori pružatelja usluga, strategije usmjeravanja i prevoditelji registrirani u svojim dispatch tablicama odgovaraju datotekama na disku — bez napuštenih ili nedeklariranih simbola                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                           |
| `check:route-guard-membership`    | Svaka ruta koja pokreće podređeni proces klasificirana je pomoću `isLocalOnlyPath()` (Stroga pravila br. 15/br. 17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `check:test-discovery`            | Svaku datoteku `*.test.ts` / `*.spec.ts` u repozitoriju prikuplja barem jedan pokretač testova (ratchet: popis siročadi u `test-discovery-baseline.json` može se samo smanjivati)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                           |
| `check:test-tla-order`            | Nijedna `node:test` datoteka pod `tests/unit` ne registrira test, ne naiđe na `await` na najvišoj razini, a zatim registrira dodatne (#18045; ratchet: `test-tla-order-allowlist.json` može se samo smanjivati)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                           |
| `check:agent-skills-sync`         | Generirani artefakti agent-skills podudaraju se sa svojim izvornim katalogom (bez odstupanja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:provider-asset-provenance` | Logotipi/resursi pružatelja imaju zabilježen unos o podrijetlu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `lint:json`                       | JSON konfiguracijske datoteke se uspješno raščlanjuju i zadovoljavaju lint pravila repozitorija                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `typecheck:core`                  | TypeScript kompilacija bez pogrešaka (samo savjetodavna upozorenja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `typecheck:noimplicit:core`       | Strogi `noImplicitAny` — usmjereno prema budućnosti; mnoga postojeća mjesta poziva još uvijek trebaju anotacije                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **Savjetodavno** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ograničen na `src/app/(dashboard)/**` (#7033) — kurirani popis dopuštenih od 27 datoteka u `typecheck:core` ne uključuje nijedan dashboard TSX, a `next build` ga također nikad ne provjerava tipove (`next.config.mjs` postavlja `ignoreBuildErrors: true`), pa su regresije napuštenih identifikatora tamo (#6625/#6909) bile nevidljive za CI. Uspoređuje se sa zamrznutom osnovnom linijom broja pogrešaka po datoteci i po TS-kodu (`config/quality/dashboard-typecheck-baseline.json`, isti obrazac sprječavanja zastarjelosti kao `check:known-symbols`) — samo NOVE pogreške koje premašuju osnovni broj ruše prolaz; smanjite osnovnu liniju s `--update` kada se ispravi postojeća pogreška.                                                                                                                                                                 | Da                                           |

### Zadatak: `quality-gate`

Pokreće se nakon `test-coverage`. Blokira spajanje u slučaju neuspjeha.

| Skripta                      | Provjerava                                                                                                                                                               | Blokirajuće              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `quality:collect`            | Emitira `quality-metrics.json` (broj ESLint upozorenja, pokrivenost iz spojenog izvještaja shardova)                                                                     | Da (uzvodno od ratcheta) |
| `quality:ratchet`            | Svaka metrika u `quality-baseline.json` nije regresirala (ESLint upozorenja ≤ osnovna linija; pokrivenost ≥ osnovna linija)                                              | Da                       |
| `check:duplication`          | Dupliciranje koda (jscpd@4) ne premašuje osnovnu liniju u `quality-baseline.json`                                                                                        | Da                       |
| `check:complexity`           | Ciklomatska složenost na razini datoteke ne premašuje ograničenje (temeljni ESLint `complexity` + `max-lines-per-function`)                                              | Da                       |
| `check:cognitive-complexity` | Ratchet kognitivne složenosti (`eslint-plugin-sonarjs`) — zaseban ESLint prolaz; CI pokreće oba spojena kao jedan korak `check:complexity-ratchets`                      | Da                       |
| `check:dead-code`            | Ratchet nekorištenih izvoza / datoteka (knip) ne regresira u odnosu na osnovnu liniju                                                                                    | Da                       |
| `check:compression-budget`   | Proračun kompresijskog benchmarka — donje granice uštede tokena po mehanizmu ne smiju regresirati                                                                        | Da                       |
| `check:type-coverage`        | Ratchet postotka tipiziranosti (`type-coverage`) ne regresira; uvelike obuhvaća `typecheck:noimplicit:core`                                                              | Da                       |
| `check:codeql-ratchet`       | Broj otvorenih CodeQL upozorenja ne regresira (čita putem `gh api`; glatko preskače bez tokena) — učestalost osvježavanja i ručno pokretanje: vidi "CodeQL ratchet" niže | Da                       |

### Zadatak: `quality-extended`

Cijeli je zadatak savjetodavni (`continue-on-error: true`). Ratcheti temeljeni na npm-u
pokreću se uistinu; vanjski se skeneri instaliraju putem `gh release download` i sami
se preskaču (exit 0) kada binarna datoteka još uvijek nije dostupna.

| Skripta                  | Provjerava                                                                                                                                                                                                              | Blokirajuće                                          |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `check:circular-deps`    | Nema kružnih ovisnosti (dpdm)                                                                                                                                                                                           | **Savjetodavno**                                     |
| `check:bundle-size`      | Veličina bundlea ne premašuje ograničenje                                                                                                                                                                               | **Savjetodavno**                                     |
| `check:secrets`          | Skeniranje tajni (gitleaks) — preskače ako binarna datoteka nije dostupna                                                                                                                                               | **Savjetodavno**                                     |
| `check:vuln-ratchet`     | Ranljivosti ovisnosti (osv-scanner) ne regresiraju — preskače ako binarna datoteka nije dostupna                                                                                                                        | **Savjetodavno**                                     |
| `check:workflows`        | Lint workflowa (actionlint + zizmor); nedostajući/neispravni skeneri, nevažeća izvješća ili nedostajuća osnovna linija ratcheta padaju kao INCOMPLETE. Valjani nalazi slijede odabranu politiku strict/advisory/ratchet | Izvršavanje obavezno; zizmor ratchet blokira u CI-ju |
| `check:openapi-breaking` | Kršeće promjene javnog API ugovora (`openapi.yaml`) u odnosu na osnovnu granu (oasdiff) — emitira `openapiBreaking=N`; preskače ako oasdiff nije dostupan ili se osnovna specifikacija ne može razriješiti              | **Savjetodavno**                                     |

### Zadatak: `docs-sync-strict`

Pokreće se na svakom PR-u prema `main`. Blokira spajanje u slučaju neuspjeha.

| Skripta                        | Provjerava                                                                                                                                                                                           | Blokirajuće                |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | Meta-kontrola koja redom pokreće 6 podkontrola navedenih u nastavku                                                                                                                                  | Da                         |
| ↳ `check:docs-sync`            | Konzistentnost verzija u CHANGELOG / OpenAPI / llm.txt                                                                                                                                               | Da                         |
| ↳ `check:docs-counts`          | Brojevi u prozi (broj pružatelja, broj migracija itd.) unutar su ratchet-prozora stvarnih brojeva                                                                                                    | Da                         |
| ↳ `check:env-doc-sync`         | Svaka varijabla okoline u `.env.example` dokumentirana je u tablici dokumentacije, i obrnuto                                                                                                         | Da                         |
| ↳ `check:deprecated-versions`  | Nema zastarjelih oznaka verzija u dokumentaciji                                                                                                                                                      | Da                         |
| ↳ `check:doc-links`            | Interne markdown poveznice u dokumentaciji vode do stvarnih datoteka (oblik `[text]`/`(path)`)                                                                                                       | Da                         |
| ↳ `check:fabricated-docs`      | Rute, varijable okoline, CLI naredbe, nazivi hookova i putanje datoteka navedeni u dokumentaciji postoje u kodnoj bazi. Stroga kontrola putem `--strict`; bez zastavice samo upozorenje (soft-fail). | Da (putem `--strict` u CI) |
| `check:cli-i18n`               | Stringovi CLI naredbi prisutni su u svim i18n datotekama lokaliteta                                                                                                                                  | Da                         |
| `check:openapi-coverage`       | OpenAPI specifikacija pokriva barem ratchet-minimum stvarnih ruta                                                                                                                                    | Da                         |
| `check:openapi-security-tiers` | Anotacije sigurnosnih razina u `openapi.yaml` usklađene su s klasifikacijama u `routeGuard.ts`                                                                                                       | **Informativno**           |
| `check:openapi-routes`         | Svaka putanja u `openapi.yaml` odgovara stvarnom `route.ts` (anti-halucinacija)                                                                                                                      | Da                         |
| `check:docs-symbols`           | Svaka `/api/...` referenca u `docs/**/*.md` odgovara stvarnom `route.ts` (anti-halucinacija)                                                                                                         | Da                         |
| `i18n translation drift`       | Neprevedeni ključevi u i18n datotekama lokaliteta — samo upozorenje                                                                                                                                  | **Informativno**           |

Dvanaest README SVG-ova u `docs/diagrams/` generirani su (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` regenerira ih sve). Svaki ima jedinični test koji uspoređuje bajtove
(`tests/unit/docs/readme-*-svg.test.ts`, zadatak `test-unit`) i pada kad je commitana datoteka
zastarjela, a `check:docs-counts` čita kanonske brojeve iz njihovih `<text>` čvorova — zbog čega se
brojevi nikada ne pretvaraju u putanje. Provjera kanonskih brojeva u SVG-ovima čita datoteke
navedene u `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`):
`docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`,
`comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus
`public/images/tier-flow-dark.svg` i `tier-flow-light.svg`; tvrdnje free-forever, catalog-entry,
recurring-pool i scoring-factors također čitaju `promise-pillars.svg`, `free-tier-budget.svg` i
`strategies-grid.svg`. `free-tier-budget.svg` svoje brojke dobiva iz aktivnog učitavača kataloga, pa
će promjena u `FREE_MODEL_BUDGETS` ili u prikazanom nazivu pružatelja obojiti CI u crveno dok se ta
datoteka ne regenerira.

### Zadatak: `i18n-ui-coverage`

| Skripta                           | Provjerava                                                                                                                                                                                                    | Blokirajuće      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage` (inline) | Pokrivenost UI i18n ključeva iznosi ≥ 65%                                                                                                                                                                     | Da               |
| `check-ui-value-drift` (inline)   | Prepravljena engleska **vrijednost** ne ostavlja za sobom zastarjeli prijevod                                                                                                                                 | Da               |
| `check-new-key-coverage` (inline) | **Novi** engleski ključ preveden je na svim jezicima — oznaka `__MISSING__:` se odbacuje                                                                                                                      | Da               |
| `check-translation-ratio`         | Omjer stvarnih prijevoda po jeziku (listovi identični engleskom / placeholderi / nedostajući, osim onih s popisa dopuštenih) ne smije premašiti `config/quality/i18n-translation-baseline.json` + toleranciju | **Informativno** |

Potreban je `fetch-depth: 0` — kontrola value-drift uspoređuje `en.json` s točkom spajanja (merge base).

#### `check-ui-value-drift` — kontrola zastarjelih prijevoda

Hvata jedinu i18n regresiju koju ostale kontrole strukturno ne mogu vidjeti: engleska
vrijednost se prepiše, a prijevodi izvedeni iz _prethodnog_ engleskog ostaju iza, pa
korisnici koji ne govore engleski i dalje čitaju samouvjereno formuliran, sada netočan tekst.

Ovo se doista isporučilo. `oauthModal.googleOAuthWarning` prepisan je kada je stigao
Antigravity pomoćnik za prijavu (#5203); **39 od 43 jezične verzije** zadržalo je tekst koji
operatorima govori da "kopiraju cijeli URL i zalijepe ga ispod" — tijek koji se za tog
pružatelja ne može dovršiti. Prošlo je nezapaženo do #8463 jer:

- `sync-ui-keys` samo dopunjuje ključeve koji **nedostaju**, nikada one koji su **zastarjeli**;
- `check-ui-keys-coverage` broji _prisutnost_ ključeva, pa zastarjeli prijevod prolazi kao pokriven;
- `check-translation-drift` prati zrcalne kopije dokumentacije `docs/i18n/<locale>/**.md` —
  nikada ne čita `src/i18n/messages/*.json`. Blokira u zadatku `docs-sync-strict` od ponovne
  sinkronizacije 2026-09: uredite temeljni dokument → `npm run i18n:run -- --files=<doc>`
  (na razini odjeljka, jeftino).

**Temelji se na diffu, a ne na osnovnoj liniji.** Uspoređuje `en.json` na zajedničkoj točki
spajanja (merge base) s radnim stablom; za svaki ključ čija se engleska vrijednost
promijenila, svaka jezična verzija koja i dalje drži nedirnut prijevod zastarjela je. Ovo
namjerno **zamrzava postojeći dug** — diff ne može otkriti iz kojeg je starog engleskog
dugogodišnji prijevod nastao, pa kontrola ocjenjuje samo ono čega se trenutna promjena
dotiče. Alternativa (osnovna linija s hashom po ključu) koštala bi generiranu datoteku od
~600 KB, 3× veću od najveće postojeće osnovne linije, uz stalne izmjene na svakom i18n PR-u.

Dva načina da se zadovolji:

1. ažurirajte zahvaćene prijevode, ili
2. postavite ih na `__MISSING__:<new english>` — izvršno okruženje tada poslužuje
   ispravljeni engleski tekst (`src/i18n/request.ts::deepMergeFallback`, #7258), a ključ
   se stavlja u red za prijevod.

Ako se **značenje** niza promijenilo, radije **preimenujte ključ**: novi ključ ne može
naslijediti zastarjeli prijevod. To je obrazac koji je koristio #8463.

```bash
npm run i18n:check-value-drift          # strogo (ono što CI izvršava)
npm run i18n:check-value-drift:warn     # samo izvještaj
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Izlazi s 0 uz `SKIP reason=base-unresolved` kada se osnovni katalog ne može pročitati
(plitki klon bez osnovne reference), po uzoru na `check-openapi-breaking`.

### Zadatak: `i18n`

Potpuna matrica i18n validacije (jedan zadatak po jezičnoj verziji). Cijeli je zadatak savjetodavan.

| Skripta                         | Provjerava                              | Blokirajuće                                                     |
| ------------------------------- | --------------------------------------- | --------------------------------------------------------------- |
| `validate_translation.py quick` | Potpunost prijevoda po jezičnoj verziji | **Savjetodavno** (`continue-on-error: true` na cijelom zadatku) |

### Zadatak: `pr-test-policy`

Izvršava se samo na pull requestovima.

| Skripta                | Provjerava                                                                                                                                           | Blokirajuće |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check:pr-test-policy` | PR-ovi koji mijenjaju produkcijski kod u `src/`, `open-sse/`, `electron/` ili `bin/` moraju uključivati ili ažurirati testove (Strogo pravilo br. 8) | Da          |
| `check:test-masking`   | Promijenjene testne datoteke ne smiju smanjiti neto broj assertova niti dodavati tautologije `assert.ok(true)`                                       | Da          |
| `check:pr-evidence`    | Tijelo PR-a navodi dokaze iz testova/VPS-a za promjenu (mehanizira Strogo pravilo br. 18 pretraživanjem proze PR-a — krhko, vidi Backlog)            | Da          |

### Zadatak: `test-vitest`

Izvršava se nakon `build`. Blokira spajanje pri neuspjehu.

| Paket            | Provjerava                                                             | Blokirajuće                                                                                                           |
| ---------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP poslužitelj (110 alata), autoCombo, predmemorija — vitest pokretač | Da                                                                                                                    |
| `test:vitest:ui` | Testovi UI komponenti — vitest pokretač                                | **Blokirajuće** — već postojeći neuspjesi izričito su isključeni u `vitest.config.ts`; novi neuspjesi obaraju zadatak |

### Noćni tijekovi rada (zakazani, savjetodavni)

Ovi se izvršavaju prema cron rasporedu (i `workflow_dispatch`), nikada na PR-ovima. Svi su savjetodavni.

| Tijek rada             | Provjerava                                                                                                                                                            | Blokirajuće      |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | fast-check testovi svojstava sa slučajnim seedom + visok broj pokretanja                                                                                              | **Savjetodavno** |
| `nightly-resilience`   | kontrola rasta heap-a, chaos ubacivanje grešaka, k6 opterećenje/soak                                                                                                  | **Savjetodavno** |
| `nightly-llm-security` | promptfoo zaštita od injekcija (blokirajući način) + garak sonde (preskaču se bez tajne davatelja)                                                                    | **Savjetodavno** |
| `nightly-schemathesis` | OpenAPI fuzzing ugovora (schemathesis) protiv aktivnog OmniRoute koristeći `docs/openapi.yaml` — otkriva kršenja specifikacije / neobrađene 500 pogreške (Faza 8 B.4) | **Savjetodavno** |
| `nightly-mutation`     | Stryker rezultat mutacijskog testiranja nad brzom jediničnom trakom — preživjeli mutanti otkrivaju slabe tvrdnje                                                      | **Savjetodavno** |
| `nightly-compat`       | Matrica kompatibilnosti Node enginea kroz podržane raspone `engines.node`                                                                                             | **Savjetodavno** |

Osnovne performanse (heap, TTFB, vrijeme izgradnje) bilježe se, a ne kontroliraju: vidi [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
