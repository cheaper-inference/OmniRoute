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

## Inventar kontrola i profili izvršavanja

### Prihvaćanje kandidata

Tijekovi rada CI i Quality Gates daju stabilne rezultate: `Gate / CI` i
`Gate / Quality`. Njihova verzionirana pravila prihvaćanja navode svaki prethodni posao
kao obvezan ili savjetodavan. Primjenjivi obvezni posao mora uspjeti: nedostajući,
otkazani, preskočeni, neriješeni i nepoznati rezultati ne mogu utvrditi PASS. Valjana
klasifikacija samo za dokumentaciju ili samo za katalog može učiniti programsku traku neprimjenjivom;
nacrt PR-a nije prihvaćen kandidat. Oznaka `hotfix` ne ukida obvezu dokazivanja.

Oba tijeka rada obuhvaćaju PR-ove prema glavnim/izdanjskim granama, slanja na `main`, ručno pokretanje
i događaje grupe za spajanje. Slanje, ručno pokretanje i grupa za spajanje izvršavaju puni odabir. Slanja na
`release/**` ne pokreću ih (2026-10-18): svaka je promjena već prošla matricu na svojem PR-u,
a spojena kombinacija zadatak je sustava Release-Green (`docs/ops/RUNNER_BOX.md` → hostirana traka). Forkovi
i grupe za spajanje upotrebljavaju hostirane izvršitelje za poslove koji bi inače odabrali samostalno hostirane
izvršitelje; prije uvođenja mora se provjeriti dostatan hostirani kapacitet.

Običan PR izvršava brzi odabir. Trake `full-code` i `full-code-e2e`
pravila prihvaćanja (E2E, integracija, artefakt paketa, Electron smoke, Bun SQLite, ekosustav
i klijenti protokola) izvršavaju se samo na nacrtu Mergify reda ili pri punom izvršavanju:
`gh workflow run ci.yml --ref <branch>`.

Svaka JSON potvrda identificira dohvaćeni SHA, izvršavanje tijeka rada i pokušaj.
CLI odbija nepodudaranje SHA-a dohvaćene verzije i događaja. Testovi tijeka rada povezuju članstvo u pravilima
s popisom `needs` posla koji donosi rezultat kako nova ili uklonjena traka ne bi mogla neprimjetno nestati.
Potvrde obuhvaćaju vlastiti tijek rada, a ne objavljivanje, implementaciju ili interne pojedinosti
postojećeg savjetodavnog skenera. Aktiviranje oba naziva provjera u pravilima grane
zasebna je administrativna promjena; samo dodavanje tih poslova ne štiti granu.

### Red za spajanje

Oznaka `queue` šalje PR u Mergify red (`.mergify.yml`). Mergify otvara nacrt PR-a na
grani `mergify/merge-queue/`, CI ondje izvršava puni odabir, a izvorni PR spaja se
kada `Gate / CI`, `Gate / Quality` i `Merge integrity (changelog + generated skills)` uspješno završe.

Mergify zapisuje sažetak svojeg reda u opis nacrta, a druge ga aplikacije također mogu uređivati.
Događaj `pull_request` `edited` na takvom nacrtu dobiva vlastitu grupu istodobnosti
(`-queue-edit-<run_id>`) kako ne bi mogao otkazati stvarno izvršavanje nacrta te preskače kontrolu i
matricu. Izvršava se samo `Merge integrity`. Preskočeni posao kontrole ima drugačiji naziv provjere
jer Mergify preskočeni `Gate / CI` tumači kao neuspjelu provjeru i uklanja PR iz reda.

Nakon uklanjanja iz reda, slanje promjena ne vraća uvijek PR u red. Dodajte komentar `@mergifyio queue` na njega.

### Inventar statičkog skeniranja

Verzionirani inventar npm pseudonima i članstvo u statičkom skeniranju nalaze se u
`config/quality/gate-manifest.json`. Pokrenite `npm run check:gate-manifest` kako biste provjerili
nazive skripti i točne naredbe u odnosu na `package.json`; dodavanja, uklanjanja i
promjene naredbi uzrokuju neuspjeh i lokalne kuke i poslova za klasifikaciju promjena u CI-ju.
Pseudonim nije posao tijeka rada, instanca matrice ni testni slučaj: ti se brojevi
ne smiju prikazivati kao međusobno zamjenjivi.

Upotrijebite `npm run quality:scan -- --list` ili `npm run quality:scan:fast -- --list`
kako biste pregledali odabrane pseudonime bez njihova izvršavanja. Izvršitelj poziva
npm ulaznu točku, pa se zadržava njezino okruženje izvođenja (uključujući Bun gdje je konfiguriran).
Manifest bilježi pseudonime izvan tih profila kao zasebno pozivane, a
naredbe za održavanje zabranjene su u profilima skeniranja samo za čitanje.

Ti profili obuhvaćaju samo statičko skeniranje. Ne potvrđuju testove proizvoda,
pokrivenost, pakiranje, vanjske provjere ni potpuno prihvaćanje kandidata za izdanje.
Prihvaćanje u tijeku rada upotrebljava povezani `config/quality/admission-policy.json` i
`scripts/quality/admission-verdict.mjs`. Profili za praćenje izdanja ostaju odvojeni;
njihove primjenjive provjere i potvrde pregledajte neovisno. Tekstualni
inventar u nastavku služi kao referenca, a ne kao dokaz da je kontrola stvarno izvršena.

Skripte se nalaze u `scripts/check/` (kontrole pravila) i `scripts/quality/` (mehanizam napredovanja).
CI izvor istine jest `.github/workflows/ci.yml`.

### Brzi put za PR izdanja (`quality.yml`)

`.github/workflows/quality.yml` nadopunjuje CI za glavne/izdanjske PR-ove, slanja na `main`,
ručno pokretanje i grupe za spajanje. PR-ovi upotrebljavaju brze provjere filtrirane prema putanjama. Trajno
onemogućena dvostruka izgradnja uklonjena je; stvarne provjere izgradnje/pakiranja/pokretanja ostaju u CI-ju.
Skup jediničnih testova i vitest izvršavaju se samo u CI-ju (`Unit Tests (N/8)` i `Vitest`).

| Posao                                            | Opseg                                                                                                                                                             | Blokira                 |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | PR-ovi dokumentacije/koda; reference API dokumentacije i sva dokumentacija                                                                                        | Da                      |
| `Fast Quality Gates`                             | PR-ovi koda; statičke provjere, provjera tipova, provjera tipova nadzorne ploče, pogođeni jedinični testovi, zaboravljeni testovi srodnih datoteka (savjetodavno) |
| `No new ESLint warnings`                         | PR-ovi koda; zaštita lintanja koja uzima u obzir potiskivanja                                                                                                     | Da, uključujući forkove |
| `Merge integrity (changelog + generated skills)` | PR-ovi koji nisu nacrti; sinkronizacija dnevnika promjena i generiranih vještina                                                                                  | Da, uključujući forkove |

#### Izvješće o zaboravljenim testovima srodnih datoteka

`npm run check:forgotten-sibling-tests` izvodi se kao savjetodavni korak u sklopu procesa `Fast Quality Gates` i ponovno koristi
razrješivač uvoza koji se nalazi iza karte utjecaja testova.
Za svaki promijenjeni produkcijski modul prijavljuje determinističke lance
`changed module/symbol -> static consumer -> candidate sibling test` kada kandidat za
test nije prisutan u razlikama zahtjeva za povlačenje. Markdown sažetak i JSON rezultat čuvaju se kao
artefakt tijeka rada `forgotten-sibling-tests` radi kalibracije prije bilo kakvog uvođenja blokiranja.

Ponovni izvozi iz objedinjujućih modula i dinamički uvozi služe samo kao dijagnostika razrješavanja; nikada ne stvaraju
nalaz koji blokira. Pregledane iznimke nalaze se u datoteci
`config/quality/forgotten-sibling-allowlist.json`. Svaki unos mora navesti potrošača i kandidata za
test, sadržavati konkretno obrazloženje te poveznicu na GitHub problem ili zahtjev za povlačenje. Neispravni unosi
uzrokuju blokiranje. Iznimke ne mogu zanemariti izbrisani kandidat za test ni razliku koja dodaje `.skip`/`.todo`;
slabljenje tvrdnji i drugi oblici prikrivanja ostaju u nadležnosti neovisnog blokirajućeg
kontrolnog koraka `check:test-masking`.

### Zadatak: `lint`

Izvodi se za svaki zahtjev za povlačenje u `main`. U slučaju neuspjeha blokira spajanje.

| Skripta (`npm run ...`)           | Provjerava                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Blokirajuće                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `check:node-runtime`              | Verzija okruženja Node.js unutar je podržanog raspona                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `check:cycles`                    | Kružne uvoze u cijelom `src/` + `open-sse/` (na temelju AST-a, uz razriješene `paths` iz konfiguracije tsconfig). Osnovna naredba završava s kodom 1 kad god postoji bilo koji ciklus (zatvoreni način otkazivanja od #15281) i navodi SCC-ove. `check:cycles:ratchet` (ono što CI pokreće) blokira kada broj premaši gornju granicu `metrics.cycles` u `quality-baseline.json` — trenutačno 14, `direction: down`, pa se može samo smanjivati (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da (zapinjača)                               |
| `check:boundary`                  | Povezanost `open-sse → src`: jedinstvene uvoze između datoteka iz pogonskog sustava u aplikaciju (`scripts/quality/measure-boundary.mjs`; popis bridova predstavlja zaostatak sanacije za razdvajanje jezgre/modula v4). Osnovna naredba = savjetodavno izvješće (isto kao `quality:boundary`). `check:boundary:ratchet` (ono što CI pokreće, također u petlji zapinjače za brze provjere u `quality.yml`) blokira kada broj premaši gornju granicu `metrics.boundaryOpenSseToSrc` u `quality-baseline.json` — početno postavljenu na izmjerenih 771, `direction: down`; `--update` može je samo sniziti; relativno u odnosu na osnovnu granu u PR-ovima (`--base-ref`, pogledajte u nastavku)                                                                                                                                                                                                                                                                                                                                                                                 | Da (zapinjača)                               |
| `check:route-validation:t06`      | Prisutnost Zod shema na svim rutama (pravilo razine 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                           |
| `check:any-budget:t11`            | Broj pojavljivanja `@ts-expect-error // any` ne premašuje dopušteni prag (razina 11, catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `check:provider-consistency`      | Svaki pružatelj u `providers.ts` ima odgovarajući unos u `providerRegistry.ts` (i obrnuto, unutar popisa dopuštenih stavki)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:model-lifecycle`           | Tri ručno održavane tablice usmjeravanja ostaju usklađene sa snimkom životnog ciklusa pohranjenom u repozitoriju (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ne dodjeljuje ocjenu nijednom povučenom ID-u koji `REGISTRY` može usmjeriti; svako odredište iz `BUILT_IN_ALIASES` prisutno je u `REGISTRY` i nije prisutno u snimci povučenih ID-ova; svaki povučeni ID koji je još uvijek u `REGISTRY` prosljeđuje se ili je naveden u `allowedRetiredInCatalog`; te se nijedan izvor ni odredište iz `DEFAULT_DEGRADATION_MAP` u toj snimci ne pojavljuje kao povučeno. Time se ne dokazuje da model trenutačno poslužuje aktivni nadređeni sustav. Izvanmrežno — uspoređuje se s `config/quality/model-lifecycle.json`, koji se ručno osvježava naredbom `npm run quality:refresh-model-lifecycle` (zahtijeva mrežu; nije povezano s CI-jem). `allowedRetiredInCatalog` je postupno opadajući zaporni mehanizam: unos dodajte samo uz povezani problem za praćenje.                                                                                                          | Da                                           |
| `check:fetch-targets`             | Svaki `fetch("/api/...")` u klijentskom direktoriju `src/` razrješava se na stvarnu datoteku `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                           |
| `check:deps`                      | Sve ovisnosti koje se mogu instalirati naredbom `npm install` u svim datotekama `package.json` u repozitoriju nalaze se u `dependency-allowlist.json`; nove ovisnosti bez fiksirane verzije ili paketi koji imitiraju nazive legitimnih paketa označavaju se                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                           |
| `audit:deps`                      | `npm audit` (korijenski direktorij + Electron) — nema upozorenja visoke/kritične razine (preklapa se s OSV provjerom `check:vuln-ratchet`; pogledajte Popis zaostalih stavki racionalizacije)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `check:lockfile`                  | Integritet datoteke `package-lock.json` — https registar, hash vrijednosti integriteta, bez nadjačavanja glavnog računala                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                           |
| `check:licenses`                  | Popis dopuštenih SPDX licenci za produkcijske ovisnosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                           |
| `check:tracked-artifacts`         | Bez artefakata izgradnje / spremljenih simboličkih poveznica na `node_modules` (izvodi se i u husky pre-commit provjeri; pre-push je namjerno lagan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                           |
| `check:ai-attribution`            | Bez AI/bot `Co-Authored-By` završnog retka ili podnožja o AI generiranju u commitovima, naslovu ili tijelu PR-a — Strogo pravilo #16 (u petlji brzih provjera u `quality.yml` za PR→`release/**` — čita sadržaj događaja, ne radi ništa izvan PR-ova — i korak samo za PR u lint provjeri datoteke `ci.yml` za PR→`main`; također husky `commit-msg` hook; ljudski suautori su dopušteni; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:vitest-exclusions`         | Svako izuzimanje iz Vitesta navodi broj problema za praćenje i nalazi se u `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:file-size`                 | Izvorne datoteke (`.ts`/`.tsx` u `src/`, `open-sse/`, `electron/`, `bin/`) ostaju unutar ograničenja `cap`, a testne datoteke (`*.test.ts(x)`) unutar ograničenja `testCap`; datoteke zamrznute u `file-size-baseline.json` (`frozen` / `testFrozen`) ne smiju narasti iznad svoje zabilježene veličine                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                           |
| `check:error-helper`              | Odgovori o pogreškama u izvršiteljima/rukovateljima koriste `buildErrorBody()` / `sanitizeErrorMessage()` (strogo pravilo #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Da                                           |
| `check:migration-numbering`       | Migracijske SQL datoteke numerirane su uzastopno, bez praznina ili duplikata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                           |
| `check:public-creds`              | Nema doslovnih OAuth vrijednosti `client_id`/`client_secret` ni Firebase Web ključeva izvan datoteke `publicCreds.ts` (strogo pravilo #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `check:db-rules`                  | Nema neobrađenog SQL-a izvan modula u `src/lib/db/`; nema skupnih uvoza iz `localDb.ts` (stroga pravila #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Da                                           |
| `check:known-symbols`             | Izvršitelji pružatelja usluga, strategije usmjeravanja i prevoditelji registrirani u svojim tablicama otpreme odgovaraju datotekama na disku — nema napuštenih ili nedeklariranih simbola                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                           |
| `check:route-guard-membership`    | Svaka ruta koja pokreće podređeni proces klasificirana je funkcijom `isLocalOnlyPath()` (stroga pravila #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                           |
| `check:test-discovery`            | Svaku datoteku `*.test.ts` / `*.spec.ts` u repozitoriju prikuplja barem jedan pokretač testova (mehanizam postupnog pooštravanja: popis nepovezanih datoteka u `test-discovery-baseline.json` može se samo smanjivati)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                           |
| `check:test-tla-order`            | Nijedna datoteka `node:test` u `tests/unit` ne registrira test, izvršava `await` na najvišoj razini, a zatim registrira dodatne testove (#18045; mehanizam postupnog pooštravanja: `test-tla-order-allowlist.json` može se samo smanjivati)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:agent-skills-sync`         | Generirani artefakti vještina agenata odgovaraju svojem izvornom katalogu (nema odstupanja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | Logotipi/resursi pružatelja imaju zabilježen unos o podrijetlu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `lint:json`                       | Konfiguracijske datoteke JSON ispravno se raščlanjuju i zadovoljavaju pravila provjere repozitorija                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `typecheck:core`                  | Kompilacija TypeScripta bez pogrešaka (samo savjetodavna upozorenja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Da                                           |
| `typecheck:noimplicit:core`       | Strogi `noImplicitAny` — usmjeren na budućnost; mnoga postojeća mjesta poziva još uvijek trebaju anotacije                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **Savjetodavno** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ograničen na `src/app/(dashboard)/**` (#7033) — pažljivo odabran popis dopuštenih 27 datoteka iz `typecheck:core` ne obuhvaća nijedan TSX nadzorne ploče, a ni `next build` nikada ne provjerava njihove tipove (`next.config.mjs` postavlja `ignoreBuildErrors: true`), pa su regresije nepovezanih identifikatora ondje (#6625/#6909) bile nevidljive CI-ju. Uspoređuje se sa zamrznutom osnovnom vrijednošću broja po datoteci i TS kodu (`config/quality/dashboard-typecheck-baseline.json`, isti obrazac provođenja ažurnosti kao za `check:known-symbols`) — prolaz pada samo zbog NOVIH pogrešaka iznad osnovnog broja; postupno smanjite osnovnu vrijednost s pomoću `--update` kada se ispravi postojeća pogreška.                                                                                                                                                                                                                                                                                                                                              | Da                                           |
| `check:build-typecheck`           | Provjera tipova cijele aplikacije za produkciju putem `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), odnosno površine koju popis dopuštenih 27 datoteka iz `typecheck:core` i provjera nadzorne ploče ne obuhvaćaju. Uspoređuje se s `config/quality/build-typecheck-baseline.json`; novi ili povećani broj po paru (datoteka, kod) uzrokuje neuspjeh, dok niži broj traži postupno smanjenje osnovne vrijednosti. `--update` odbija ažuriranje dok izvođenje sadržava novi ili povećani par, osim ako se proslijedi `--force-regressions`, te odbija novoušutkanu datoteku, osim ako se proslijedi `--force-nocheck`, pa su proširenje osnovne vrijednosti radi dobivanja zelenog statusa i dodjeljivanje trajnog utišavanja dvije zasebne namjerne radnje. Samostalni `--force` se odbija. Također pretražuje opseg izgradnje za `@ts-nocheck` uspoređujući ga s `config/quality/ts-nocheck-baseline.json`, jer datoteka koja ga upotrebljava uopće ne prijavljuje dijagnostiku te bi inače bila nevidljiva svakoj provjeri. | Da                                           |

#### Dva programa za provjeru tipova daju različite odgovore

`typecheck:core` i `check:build-typecheck` kompiliraju različite programe s različitim
opcijama, pa ista datoteka u jednom može biti bez pogrešaka, a u drugom ih može imati mnogo.

`tsconfig.build.json` postavlja `"strict": false`, pa je `noImplicitAny` isključen. Osnovna
konfiguracija kompilira pažljivo odabran popis dopuštenih 27 datoteka sa strožim opcijama
i prati graf uvoza svakog unosa, pa se ondje ipak provjeravaju datoteke koje se nikada
ne pojavljuju u programu za izgradnju.

Posljedica je važna pri procjeni ima li datoteka ispravne tipove: **nula dijagnostičkih
poruka pod `check:build-typecheck` ne znači nula**. Uklanjanje `@ts-nocheck` iz 26
datoteka pokazalo je da su njih 23 bez pogrešaka u programu za izgradnju; njih šesnaest
prikazalo je oko 120 pogrešaka implicitnog tipa any u strogom programu. Provjerite oba
prije nego što datoteku proglasite čistom.

### Zadatak: `quality-gate`

Pokreće se nakon `test-coverage`. U slučaju neuspjeha blokira spajanje.

| Skripta                      | Provjerava                                                                                                                                                                                     | Blokirajuće                     |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `quality:collect`            | Generira `quality-metrics.json` (broj ESLint upozorenja, pokrivenost iz objedinjenog izvješća segmenata)                                                                                       | Da (prethodi mehanizmu ratchet) |
| `quality:ratchet`            | Nijedna metrika u `quality-baseline.json` nije nazadovala (ESLint upozorenja ≤ početna vrijednost; pokrivenost ≥ početna vrijednost)                                                           | Da                              |
| `check:duplication`          | Dupliciranje koda (jscpd@4) ne premašuje početnu vrijednost u `quality-baseline.json`                                                                                                          | Da                              |
| `check:complexity`           | Ciklomatska složenost na razini datoteke ne premašuje ograničenje (osnovni ESLint `complexity` + `max-lines-per-function`)                                                                     | Da                              |
| `check:cognitive-complexity` | Ratchet kognitivne složenosti (`eslint-plugin-sonarjs`) — zaseban prolaz ESLint-a; CI oba prolaza izvodi objedinjeno kao jedan korak `check:complexity-ratchets`                               | Da                              |
| `check:dead-code`            | Ratchet neiskorištenih izvoza / datoteka (knip) ne nazaduje u odnosu na početnu vrijednost                                                                                                     | Da                              |
| `check:compression-budget`   | Ograničenje referentnog testa kompresije — minimalne uštede tokena po mehanizmu ne smiju nazadovati                                                                                            | Da                              |
| `check:type-coverage`        | Ratchet postotka tipiziranog koda (`type-coverage`) ne nazaduje; u velikoj mjeri obuhvaća `typecheck:noimplicit:core`                                                                          | Da                              |
| `check:codeql-ratchet`       | Broj otvorenih CodeQL upozorenja ne nazaduje (čita putem `gh api`; preskače bez pogreške ako nema tokena) — učestalost osvježavanja i ručno pokretanje: pogledajte „CodeQL ratchet” u nastavku | Da                              |

### Zadatak: `quality-extended`

Cijeli je zadatak savjetodavan (`continue-on-error: true`). Ratcheti temeljeni na npm-u stvarno se
izvode; vanjski skeneri instaliraju se putem `gh release download` i samostalno preskaču provjeru (izlaz 0)
ako binarna datoteka i dalje nije prisutna.

| Skripta                  | Provjerava                                                                                                                                                                                                                                                        | Blokirajuće                                             |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `check:circular-deps`    | Nema kružnih ovisnosti (dpdm)                                                                                                                                                                                                                                     | **Savjetodavno**                                        |
| `check:bundle-size`      | Veličina paketa ne premašuje ograničenje                                                                                                                                                                                                                          | **Savjetodavno**                                        |
| `check:secrets`          | Skeniranje tajni (gitleaks) — preskače se ako binarna datoteka nije prisutna                                                                                                                                                                                      | **Savjetodavno**                                        |
| `check:vuln-ratchet`     | Ranjivosti ovisnosti (osv-scanner) ne nazaduju — preskače se ako binarna datoteka nije prisutna                                                                                                                                                                   | **Savjetodavno**                                        |
| `check:workflows`        | Provjera tijekova rada (actionlint + zizmor); skeneri koji nedostaju ili ne rade, nevaljana izvješća ili početna vrijednost ratcheta koja nedostaje uzrokuju neuspjeh sa statusom INCOMPLETE. Valjani nalazi slijede odabrano strogo/savjetodavno/ratchet pravilo | Izvršavanje je obavezno; zizmor ratchet blokira u CI-ju |
| `check:openapi-breaking` | Nekompatibilne promjene javnog API ugovora (`openapi.yaml`) u odnosu na osnovnu granu (oasdiff) — generira `openapiBreaking=N`; preskače se ako oasdiff nije prisutan ili se osnovna specifikacija ne može razriješiti                                            | **Savjetodavno**                                        |

### Zadatak: `docs-sync-strict`

Izvodi se pri svakom PR-u prema grani `main`. Blokira spajanje u slučaju neuspjeha.

| Skripta                        | Provjerava                                                                                                                                                                                         | Blokirajuće                |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | Metaprovjera koja uzastopno pokreće 6 niže navedenih podprovjera                                                                                                                                   | Da                         |
| ↳ `check:docs-sync`            | Usklađenost verzija u CHANGELOG-u / OpenAPI-ju / llm.txt-u                                                                                                                                         | Da                         |
| ↳ `check:docs-counts`          | Brojevi u tekstu (broj pružatelja, broj migracija itd.) nalaze se unutar dopuštenog raspona stvarnih brojeva                                                                                       | Da                         |
| ↳ `check:env-doc-sync`         | Svaka varijabla okruženja u `.env.example` dokumentirana je u tablici dokumentacije i obratno                                                                                                      | Da                         |
| ↳ `check:deprecated-versions`  | U dokumentaciji nema zastarjelih nizova verzija                                                                                                                                                    | Da                         |
| ↳ `check:doc-links`            | Interne markdown poveznice u dokumentaciji vode do stvarnih datoteka (oblik `[text]`/`(path)`)                                                                                                     | Da                         |
| ↳ `check:fabricated-docs`      | Rute, varijable okruženja, CLI naredbe, nazivi hookova i putanje datoteka navedeni u dokumentaciji postoje u bazi koda. Stroga provjera uz `--strict`; bez te zastavice neuspjeh nije blokirajući. | Da (uz `--strict` u CI-ju) |
| `check:cli-i18n`               | Nizovi CLI naredbi prisutni su u svim datotekama i18n lokalizacija                                                                                                                                 | Da                         |
| `check:openapi-coverage`       | OpenAPI specifikacija pokriva barem postupno povećavanu donju granicu stvarnih ruta                                                                                                                | Da                         |
| `check:openapi-security-tiers` | Anotacije sigurnosnih razina u `openapi.yaml` usklađene su s klasifikacijama u `routeGuard.ts`                                                                                                     | **Savjetodavno**           |
| `check:openapi-routes`         | Svaka putanja u `openapi.yaml` vodi do stvarne datoteke `route.ts` (sprječavanje halucinacija)                                                                                                     | Da                         |
| `check:docs-symbols`           | Svaka referenca `/api/...` u `docs/**/*.md` vodi do stvarne datoteke `route.ts` (sprječavanje halucinacija)                                                                                        | Da                         |
| `i18n translation drift`       | Neprevedeni ključevi u datotekama i18n lokalizacija — samo upozorenje                                                                                                                              | **Savjetodavno**           |

Dvanaest README SVG-ova u `docs/diagrams/` generiraju se automatski (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` ponovno ih generira sve). Svaki ima jedinični test koji uspoređuje bajtove
(`tests/unit/docs/readme-*-svg.test.ts`, posao `test-unit`) i pada kada je predana datoteka
zastarjela, a `check:docs-counts` čita kanonske brojeve iz njihovih čvorova `<text>` — zbog čega
korak pretvaranja u obrise zadržava svaki tako pretvoren niz u datoteci kao nevidljivi `<text>`. Provjera kanonskih brojeva u SVG-u čita datoteke navedene u
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, kao i `public/images/tier-flow-dark.svg` i `tier-flow-light.svg`; tvrdnje o
trajno besplatnoj ponudi, stavci kataloga, ponavljajućem fondu i čimbenicima bodovanja također se čitaju iz
`promise-pillars.svg`, `free-tier-budget.svg` i `strategies-grid.svg`. `free-tier-budget.svg`
preuzima svoje brojke iz aktivnog učitavača kataloga, pa promjena u `FREE_MODEL_BUDGETS` ili prikaznom
nazivu pružatelja uzrokuje pad CI-ja dok se ta datoteka ponovno ne generira.

### Posao: `i18n-ui-coverage`

| Skripta                             | Provjerava                                                                                                                                                                                                                | Blokirajuće      |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage` (ugrađeno) | Pokrivenost UI i18n ključeva iznosi ≥ 65%                                                                                                                                                                                 | Da               |
| `check-ui-value-drift` (ugrađeno)   | Izmijenjena engleska **vrijednost** ne ostavlja nijedan zastarjeli prijevod                                                                                                                                               | Da               |
| `check-new-key-coverage` (ugrađeno) | **Novi** engleski ključ preveden je u svakoj lokalizaciji — oznaka `__MISSING__:` nije dopuštena                                                                                                                          | Da               |
| `check-translation-ratio`           | Omjer stvarnih prijevoda po lokalizaciji (stavke identične engleskima / rezervirana mjesta / nedostajuće stavke izvan popisa dopuštenih) ne smije premašiti `config/quality/i18n-translation-baseline.json` + toleranciju | **Savjetodavno** |

Zahtijeva `fetch-depth: 0` — provjera promjene vrijednosti uspoređuje `en.json` s bazom spajanja.

#### `check-ui-value-drift` — provjera zastarjelih prijevoda

Otkriva onu i18n regresiju koju ostale kontrole strukturno ne mogu uočiti: engleska se vrijednost
prepiše, a prijevodi izvedeni iz _prethodne_ engleske vrijednosti ostanu, pa
korisnici koji ne govore engleski nastavljaju čitati samouvjereno formuliran, sada netočan tekst.

To se doista našlo u produkciji. `oauthModal.googleOAuthWarning` prepisan je kada je uveden pomoćnik za
prijavu Antigravity (#5203); **39 od 43 lokalizacije** zadržalo je tekst koji operaterima govori da „kopiraju
cijeli URL i zalijepe ga ispod” — postupak koji se za tog pružatelja ne može dovršiti. To je
ostalo neprimijećeno sve do #8463 jer:

- `sync-ui-keys` samo dopunjava ključeve koji **nedostaju**, nikada one koji su **zastarjeli**;
- `check-ui-keys-coverage` broji _prisutnost_ ključeva, pa se zastarjeli prijevod smatra pokrivenim;
- `check-translation-drift` prati zrcalne kopije dokumentacije `docs/i18n/<locale>/**.md` —
  nikada ne čita `src/i18n/messages/*.json`. Blokira u poslu `docs-sync-strict` od ponovne
  sinkronizacije 2026-09: uredite temeljni dokument → `npm run i18n:run -- --files=<doc>` (na razini odjeljka, brzo).

**Uzimanje razlika u obzir, bez oslanjanja na referentnu datoteku.** Uspoređuje `en.json` u zajedničkoj bazi spajanja s
radnim stablom; za svaki ključ čija se engleska vrijednost promijenila zastarjela je svaka lokalizacija koja još sadrži
neizmijenjen prijevod. Time se namjerno **zamrzava postojeći dug** — iz razlike se ne može
utvrditi iz koje je stare engleske vrijednosti nastao dugotrajni prijevod, pa kontrola procjenjuje
samo ono čega se trenutačna promjena dotiče. Alternativa (referentna datoteka s hashom za svaki ključ) zahtijevala bi
generiranu datoteku od približno 600 KB, 3× veću od najveće postojeće referentne datoteke, koja bi se mijenjala pri svakom i18n PR-u.

Dva su načina da se kontrola zadovolji:

1. ažurirajte zahvaćene prijevode ili
2. postavite ih na `__MISSING__:<new english>` — izvršno okruženje tada poslužuje ispravljeni engleski tekst
   (`src/i18n/request.ts::deepMergeFallback`, #7258), a ključ se stavlja u red za prevođenje.

Ako se promijenilo **značenje** teksta, radije **preimenujte ključ**: novi ključ ne može naslijediti
zastarjeli prijevod. Taj je obrazac upotrijebljen u #8463.

```bash
npm run i18n:check-value-drift          # strogo (ono što CI pokreće)
npm run i18n:check-value-drift:warn     # samo izvještaj
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Završava s kodom 0 uz `SKIP reason=base-unresolved` kada se osnovni katalog ne može pročitati (plitki
klon bez osnovne reference), po uzoru na `check-openapi-breaking`.

### Posao: `i18n`

Potpuna matrica provjere i18n-a (jedan posao po lokalizaciji). Cijeli je posao savjetodavan.

| Skripta                         | Provjerava                          | Blokiranje                                                   |
| ------------------------------- | ----------------------------------- | ------------------------------------------------------------ |
| `validate_translation.py quick` | Potpunost prijevoda po lokalizaciji | **Savjetodavno** (`continue-on-error: true` za cijeli posao) |

### Posao: `pr-test-policy`

Pokreće se samo za zahtjeve za spajanje.

| Skripta                | Provjerava                                                                                                                                                | Blokiranje |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PR-ovi koji mijenjaju produkcijski kod u `src/`, `open-sse/`, `electron/` ili `bin/` moraju uključivati ili ažurirati testove (strogo pravilo #8)         | Da         |
| `check:test-masking`   | Promijenjene testne datoteke ne smanjuju neto broj provjera niti dodaju tautologije `assert.ok(true)`                                                     | Da         |
| `check:pr-evidence`    | Tijelo PR-a navodi dokaze o testiranju/VPS-u za promjenu (automatizira strogo pravilo #18 pretraživanjem proznog teksta PR-a — krhko, pogledajte Backlog) | Da         |

### Posao: `test-vitest`

Pokreće se nakon `build`. U slučaju neuspjeha blokira spajanje.

| Skup testova     | Provjerava                                                             | Blokiranje                                                                                            |
| ---------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP poslužitelj (110 alata), autoCombo, predmemorija — pokretač vitest | Da                                                                                                    |
| `test:vitest:ui` | Testovi UI komponenti — pokretač vitest                                | **Blokira** — postojeći neuspjesi izričito su izuzeti u `vitest.config.ts`; novi neuspjesi ruše posao |

### Noćni tijekovi rada (zakazani, savjetodavni)

Pokreću se prema cron rasporedu (i putem `workflow_dispatch`), nikada na PR-ovima. Svi su savjetodavni.

| Tijek rada             | Provjerava                                                                                                                                                                    | Blokiranje       |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | testove svojstava fast-check s nasumičnim početnim stanjem + velikim brojem izvođenja                                                                                         | **Savjetodavno** |
| `nightly-resilience`   | provjeru rasta memorije heap, kaotično ubrizgavanje kvarova, k6 testove opterećenja/izdržljivosti                                                                             | **Savjetodavno** |
| `nightly-llm-security` | promptfoo zaštitu od ubrizgavanja (način blokiranja) + garak provjere (preskaču se bez tajne pružatelja usluge)                                                               | **Savjetodavno** |
| `nightly-schemathesis` | neizrazito testiranje OpenAPI ugovora (schemathesis) na aktivnom OmniRouteu pomoću `docs/openapi.yaml` — otkriva kršenja specifikacije / neobrađene pogreške 500 (Faza 8 B.4) | **Savjetodavno** |
| `nightly-mutation`     | rezultat mutacijskog testiranja alatom Stryker nad brzim skupom jediničnih testova — preživjeli mutanti otkrivaju slabe provjere                                              | **Savjetodavno** |
| `nightly-compat`       | matricu kompatibilnosti Node pogona u podržanim rasponima `engines.node`                                                                                                      | **Savjetodavno** |

Osnovne vrijednosti performansi (heap, TTFB, vrijeme izgradnje) bilježe se, ali ne služe kao uvjet: pogledajte [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
