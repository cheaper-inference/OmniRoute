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

## Inventar kontrola i profili izvršavanja

### Prihvat kandidata

Radni tokovi CI i Quality Gates proizvode stabilne rezultate: `Gate / CI` i
`Gate / Quality`. Njihova verzionirana politika prihvata navodi svaki prethodni posao
kao obavezan ili savjetodavan. Primjenjivi obavezni posao mora uspjeti: nedostajući,
otkazani, preskočeni, neriješeni i nepoznati rezultati ne mogu uspostaviti PASS. Važeća
klasifikacija samo za dokumentaciju ili samo za katalog može učiniti programsku putanju
neprimjenjivom; nacrt PR-a nije prihvaćen kandidat. Oznaka `hotfix` ne uklanja obavezu pružanja dokaza.

Oba radna toka obuhvataju PR-ove prema glavnim/izdanjskim granama, slanja na `main`, ručno pokretanje
i događaje grupe spajanja. Slanje, ručno pokretanje i grupa spajanja izvršavaju puni izbor. Slanja na
`release/**` ih ne pokreću (2026-10-18): svaka promjena je već prošla matricu u svom PR-u,
a spojena kombinacija je zadatak sistema Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forkovi
i grupe spajanja koriste hostirane izvršioce za poslove koji bi inače odabrali samostalno hostirane
izvršioce; prije uvođenja mora se potvrditi dovoljan hostirani kapacitet.

Svaka JSON potvrda identificira preuzeti SHA, pokretanje radnog toka i pokušaj.
CLI odbija nepodudaranje SHA-a preuzete revizije i događaja. Testovi radnog toka povezuju članstvo u politici
s listom `needs` posla koji daje rezultat, tako da nova ili uklonjena putanja ne može neprimjetno nestati.
Potvrde obuhvataju vlastiti radni tok, a ne objavljivanje, implementaciju ili interne detalje
postojećeg savjetodavnog skenera. Aktiviranje oba naziva provjere u pravilima grane
zasebna je administrativna promjena; dodavanje ovih poslova samo po sebi ne štiti granu.

### Inventar statičkog skeniranja

Verzionirani inventar npm aliasa i članstvo u statičkom skeniranju nalaze se u
`config/quality/gate-manifest.json`. Pokrenite `npm run check:gate-manifest` kako biste provjerili
nazive skripti i tačne komande u odnosu na `package.json`; dodavanja, uklanjanja i
odstupanja komandi uzrokuju neuspjeh i lokalne kuke i poslova klasifikacije promjena u CI-u.
Alias nije posao radnog toka, instanca matrice niti testni slučaj: ovi brojevi
ne smiju se predstavljati kao međusobno zamjenjivi.

Koristite `npm run quality:scan -- --list` ili `npm run quality:scan:fast -- --list`
da pregledate odabrane aliase bez njihovog izvršavanja. Izvršilac poziva
npm ulaznu tačku, pa se njeno izvršno okruženje (uključujući Bun gdje je konfiguriran) zadržava.
Manifest bilježi aliase izvan tih profila kao zasebno pozvane, a
komande održavanja zabranjene su u profilima skeniranja samo za čitanje.

Ovi profili obuhvataju samo statičko skeniranje. Oni ne potvrđuju testove proizvoda,
pokrivenost, pakiranje, vanjske provjere niti potpuno prihvatanje kandidata za izdanje.
Prihvat radnog toka koristi povezane `config/quality/admission-policy.json` i
`scripts/quality/admission-verdict.mjs`. Profili posmatrača izdanja ostaju odvojeni;
njihove primjenjive provjere i potvrde pregledajte zasebno. Tekstualni
inventar u nastavku služi kao referenca, a ne kao dokaz da je kontrola zaista izvršena.

Skripte se nalaze pod `scripts/check/` (kontrole politike) i `scripts/quality/` (mehanizam postepenog pooštravanja).
Izvor istine za CI je `.github/workflows/ci.yml`.

### Brza putanja PR-a izdanja (`quality.yml`)

`.github/workflows/quality.yml` dopunjuje CI za PR-ove prema glavnim/izdanjskim granama, slanja na `main`,
ručno pokretanje i grupe spajanja. PR-ovi koriste brze provjere filtrirane prema putanji. Trajno
onemogućena duplirana izgradnja je uklonjena; stvarne provjere izgradnje/pakiranja/pokretanja ostaju u CI-u.

| Posao                                            | Opseg                                                                                                                                                                                                                             | Blokira                 |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | PR-ovi dokumentacije/koda; reference API dokumentacije i docs-all                                                                                                                                                                 | Da                      |
| `Fast Quality Gates`                             | PR-ovi koda; statičke provjere, provjera tipova, provjera tipova nadzorne ploče, pogođeni jedinični testovi                                                                                                                       | Da                      |
| `Forgotten sibling tests`                        | PR-ovi koda; promijenjeni moduli prate se do statičkih potrošača i kandidata za srodne testove; putanje zbirnih modula i dinamičkog uvoza prijavljuju se kao savjetodavna dijagnostika, uz navedene izuzetke na listi dozvoljenih | **Savjetodavno**        |
| `Vitest (fast-path)`                             | PR-ovi koda; brzi paket vitest testova                                                                                                                                                                                            | Da                      |
| `Unit Tests fast-path`                           | PR-ovi koda; paket jediničnih testova u 4 segmenta                                                                                                                                                                                | Da                      |
| `No new ESLint warnings`                         | PR-ovi koda; zaštita za lint koja uzima u obzir potiskivanja                                                                                                                                                                      | Da, uključujući forkove |
| `Merge integrity (changelog + generated skills)` | PR-ovi koji nisu nacrti; sinhronizacija dnevnika promjena i generiranih vještina                                                                                                                                                  | Da, uključujući forkove |

#### Izvještaj o zaboravljenim testovima srodnih modula

`npm run check:forgotten-sibling-tests` ponovo koristi razrješivač uvoza koji stoji iza mape utjecaja testova.
Za svaki izmijenjeni produkcijski modul prijavljuje determinističke lance
`changed module/symbol -> static consumer -> candidate sibling test` kada potencijalni
test nije prisutan u diffu zahtjeva za povlačenje. Markdown sažetak i JSON rezultat čuvaju se kao
artefakt toka rada `forgotten-sibling-tests` radi kalibracije prije bilo kakvog uvođenja blokiranja.

Ponovni izvozi iz barrel modula i dinamički uvozi služe samo kao dijagnostika razrješavanja; oni nikada ne stvaraju
nalaz koji blokira. Pregledani izuzeci nalaze se u
`config/quality/forgotten-sibling-allowlist.json`. Svaki unos mora navesti potrošača i potencijalni
test, pružiti konkretno obrazloženje i sadržavati poveznicu na GitHub problem ili zahtjev za povlačenje. Neispravni unosi
uzrokuju blokiranje. Izuzeci ne mogu zanemariti izbrisani potencijalni test niti diff koji dodaje `.skip`/`.todo`;
slabljenje provjera i druga prikrivanja ostaju u nadležnosti nezavisno blokirajuće
provjere `check:test-masking`.

### Zadatak: `lint`

Pokreće se za svaki PR prema grani `main`. Blokira spajanje u slučaju neuspjeha.

| Skripta (`npm run ...`)           | Provjerava                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Blokirajuće                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `check:node-runtime`              | Verzija Node.js-a je unutar podržanog raspona                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                           |
| `check:cycles`                    | Kružne importe u cijelom `src/` + `open-sse/` (zasnovano na AST-u, razriješene tsconfig `paths`). Osnovna provjera završava s kodom 1 kad god postoji bilo koji ciklus (fail-closed od #15281) i navodi SCC-ove. `check:cycles:ratchet` (ono što CI pokreće) blokira kada broj premaši gornju granicu `metrics.cycles` u `quality-baseline.json` — trenutno 14, `direction: down`, pa se može samo smanjivati (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da (ratchet)                                 |
| `check:boundary`                  | Spregu `open-sse → src`: jedinstvene importe između datoteka iz enginea u aplikaciju (`scripts/quality/measure-boundary.mjs`; lista veza je backlog za sanaciju razdvajanja jezgre/modula v4). Osnovna provjera = savjetodavni izvještaj (isto kao `quality:boundary`). `check:boundary:ratchet` (ono što CI pokreće, također u ratchet petlji brzih provjera u `quality.yml`) blokira kada broj premaši gornju granicu `metrics.boundaryOpenSseToSrc` u `quality-baseline.json` — početno postavljenu na izmjerenih 771, `direction: down`; `--update` je samo smanjuje; relativno prema osnovnoj grani na PR-ovima (`--base-ref`, pogledajte ispod)                                                                                                                                                                                                                                                              | Da (ratchet)                                 |
| `check:route-validation:t06`      | Prisustvo Zod shema na svim rutama (politika nivoa 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                           |
| `check:any-budget:t11`            | Broj `@ts-expect-error // any` ne premašuje budžet (Catraca nivoa 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                           |
| `check:provider-consistency`      | Svaki pružalac u `providers.ts` ima odgovarajući unos u `providerRegistry.ts` (i obrnuto, unutar liste dozvoljenih)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Da                                           |
| `check:model-lifecycle`           | Tri ručno održavane tabele usmjeravanja ostaju usklađene sa snimkom životnog ciklusa pohranjenom u repozitoriju (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ne boduje nijedan povučeni ID koji `REGISTRY` može usmjeriti; svaki cilj iz `BUILT_IN_ALIASES` prisutan je u `REGISTRY` i odsutan iz snimke povučenih ID-ova; svaki povučeni ID koji se još nalazi u `REGISTRY` prosljeđuje se ili je naveden u `allowedRetiredInCatalog`; te se nijedan izvor ili cilj iz `DEFAULT_DEGRADATION_MAP` ne pojavljuje kao povučen u toj snimci. Ovo ne dokazuje da model trenutno poslužuje aktivni vanjski servis. Van mreže — poredi se sa `config/quality/model-lifecycle.json`, koji se ručno osvježava pomoću `npm run quality:refresh-model-lifecycle` (zahtijeva mrežu; nije uključen u CI). `allowedRetiredInCatalog` je jednosmjerna kontrola postepenog smanjivanja: unos dodajte samo uz problem za praćenje. | Da                                           |
| `check:fetch-targets`             | Svaki `fetch("/api/...")` u klijentskom direktoriju `src/` razrješava se na stvarni `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `check:deps`                      | Sve zavisnosti koje se mogu instalirati pomoću `npm install` iz svakog `package.json` u repozitoriju nalaze se u `dependency-allowlist.json`; novi paketi bez fiksirane verzije ili paketi koji oponašaju izmišljene nazive označavaju se                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `audit:deps`                      | `npm audit` (korijenski direktorij + electron) — nema upozorenja visoke/kritične ozbiljnosti (preklapa se s osv `check:vuln-ratchet`; pogledajte Backlog racionalizacije)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `check:lockfile`                  | Integritet datoteke `package-lock.json` — https registar, hash vrijednosti integriteta, bez nadjačavanja hosta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `check:licenses`                  | Lista dozvoljenih SPDX licenci za produkcijske zavisnosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `check:tracked-artifacts`         | Bez artefakata izgradnje / predanih simboličkih veza za `node_modules` (također se pokreće u husky pre-commit provjeri; pre-push provjera je namjerno pojednostavljena — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:ai-attribution`            | Bez AI/bot `Co-Authored-By` završnog retka ili podnožja o AI generiranju u commitima, naslovu ili tijelu PR-a — Strogo pravilo #16 (u petlji brzih provjera datoteke `quality.yml` za PR→`release/**` — čita sadržaj događaja, ne radi ništa izvan PR-ova — i korak samo za PR u lint provjeri datoteke `ci.yml` za PR→`main`; također husky `commit-msg` hook; ljudski koautori su dozvoljeni; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:vitest-exclusions`         | Svako Vitest izuzimanje navodi issue za praćenje i nalazi se u `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:file-size`                 | Izvorne datoteke (`.ts`/`.tsx` u `src/`, `open-sse/`, `electron/`, `bin/`) ostaju unutar ograničenja `cap`, a testne datoteke (`*.test.ts(x)`) unutar `testCap`; datoteke zamrznute u `file-size-baseline.json` (`frozen` / `testFrozen`) ne smiju narasti iznad svoje zabilježene veličine                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                           |
| `check:error-helper`              | Odgovori o greškama u izvršiteljima/rukovateljima koriste `buildErrorBody()` / `sanitizeErrorMessage()` (Strogo pravilo #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                           |
| `check:migration-numbering`       | Migracijske SQL datoteke numerisane su uzastopno, bez praznina ili duplikata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                           |
| `check:public-creds`              | Nema doslovnih OAuth vrijednosti `client_id`/`client_secret` niti Firebase Web ključeva izvan `publicCreds.ts` (Strogo pravilo #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Da                                           |
| `check:db-rules`                  | Nema sirovog SQL-a izvan modula `src/lib/db/`; nema zbirnih uvoza iz `localDb.ts` (Stroga pravila #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Da                                           |
| `check:known-symbols`             | Izvršitelji pružatelja usluga, strategije usmjeravanja i prevoditelji registrirani u svojim tabelama otpreme odgovaraju datotekama na disku — nema napuštenih ili nedeklariranih simbola                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Da                                           |
| `check:route-guard-membership`    | Svaka ruta koja pokreće podređeni proces klasificirana je pomoću `isLocalOnlyPath()` (Stroga pravila #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                           |
| `check:test-discovery`            | Svaku datoteku `*.test.ts` / `*.spec.ts` u repozitoriju prikuplja najmanje jedan pokretač testova (ratchet: lista datoteka bez pokretača u `test-discovery-baseline.json` može se samo smanjivati)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Da                                           |
| `check:test-tla-order`            | Nijedna `node:test` datoteka unutar `tests/unit` ne registruje test, ne nailazi na `await` najvišeg nivoa, a zatim registruje još testova (#18045; ratchet: `test-tla-order-allowlist.json` može se samo smanjivati)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                           |
| `check:agent-skills-sync`         | Generisani artefakti vještina agenata podudaraju se sa svojim izvornim katalogom (bez odstupanja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:provider-asset-provenance` | Logotipi/resursi pružatelja imaju evidentiran zapis o porijeklu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `lint:json`                       | JSON konfiguracijske datoteke mogu se parsirati i zadovoljavaju pravila lintanja repozitorija                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `typecheck:core`                  | TypeScript kompilacija bez grešaka (samo savjetodavna upozorenja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `typecheck:noimplicit:core`       | Strogi `noImplicitAny` — usmjeren na budućnost; mnogim postojećim mjestima poziva i dalje su potrebne anotacije                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | **Savjetodavno** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ograničen na `src/app/(dashboard)/**` (#7033) — pažljivo odabrana lista od 27 dozvoljenih datoteka u `typecheck:core` ne uključuje nijednu TSX datoteku kontrolne ploče, a ni `next build` ih nikada ne provjerava tipovima (`next.config.mjs` postavlja `ignoreBuildErrors: true`), pa su regresije napuštenih identifikatora u njima (#6625/#6909) bile nevidljive CI-ju. Uspoređuje se sa zamrznutom osnovnom vrijednošću broja po datoteci i TS kodu (`config/quality/dashboard-typecheck-baseline.json`, isti obrazac provođenja zastarjelosti kao kod `check:known-symbols`) — samo NOVE greške iznad broja u osnovnoj vrijednosti uzrokuju neuspjeh provjere; smanjite osnovnu vrijednost pomoću `--update` kada se ispravi već postojeća greška.                                                                                                                                                     | Da                                           |

### Posao: `quality-gate`

Pokreće se nakon `test-coverage`. Blokira spajanje u slučaju neuspjeha.

| Skripta                      | Provjerava                                                                                                                                                                            | Blokira                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `quality:collect`            | Generiše `quality-metrics.json` (broj ESLint upozorenja, pokrivenost iz spojenog izvještaja fragmenata)                                                                               | Da (prethodi mehanizmu ratchet) |
| `quality:ratchet`            | Nijedna metrika u `quality-baseline.json` nije nazadovala (ESLint upozorenja ≤ osnovna vrijednost; pokrivenost ≥ osnovna vrijednost)                                                  | Da                              |
| `check:duplication`          | Dupliciranje koda (jscpd@4) ne prelazi osnovnu vrijednost u `quality-baseline.json`                                                                                                   | Da                              |
| `check:complexity`           | Ciklomatska složenost na nivou datoteke ne prelazi ograničenje (osnovna ESLint pravila `complexity` + `max-lines-per-function`)                                                       | Da                              |
| `check:cognitive-complexity` | Ratchet kognitivne složenosti (`eslint-plugin-sonarjs`) — zasebno pokretanje ESLint-a; CI oba pokreće spojeno kao jedan korak `check:complexity-ratchets`                             | Da                              |
| `check:dead-code`            | Ratchet nekorištenih izvoza/datoteka (knip) ne nazaduje u odnosu na osnovnu vrijednost                                                                                                | Da                              |
| `check:compression-budget`   | Budžet referentnog testa kompresije — minimalne uštede tokena po mehanizmu ne smiju nazadovati                                                                                        | Da                              |
| `check:type-coverage`        | Ratchet procenta tipiziranosti (`type-coverage`) ne nazaduje; u velikoj mjeri obuhvata `typecheck:noimplicit:core`                                                                    | Da                              |
| `check:codeql-ratchet`       | Broj otvorenih CodeQL upozorenja ne nazaduje (čita putem `gh api`; uredno preskače bez tokena) — za učestalost osvježavanja i ručno pokretanje pogledajte „CodeQL ratchet“ u nastavku | Da                              |

### Posao: `quality-extended`

Cijeli posao je savjetodavan (`continue-on-error: true`). Ratchet provjere zasnovane na npm-u
zaista se pokreću; vanjski skeneri instaliraju se putem `gh release download` i sami se preskaču (izlazni kod 0)
kada binarna datoteka još uvijek nije prisutna.

| Skripta                  | Provjerava                                                                                                                                                                                                                                         | Blokira                                                 |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `check:circular-deps`    | Nema kružnih zavisnosti (dpdm)                                                                                                                                                                                                                     | **Savjetodavno**                                        |
| `check:bundle-size`      | Veličina paketa ne prelazi ograničenje                                                                                                                                                                                                             | **Savjetodavno**                                        |
| `check:secrets`          | Skeniranje tajni (gitleaks) — preskače se ako binarna datoteka nije prisutna                                                                                                                                                                       | **Savjetodavno**                                        |
| `check:vuln-ratchet`     | Ranjivosti zavisnosti (osv-scanner) ne nazaduju — preskače se ako binarna datoteka nije prisutna                                                                                                                                                   | **Savjetodavno**                                        |
| `check:workflows`        | Lint provjera radnih tokova (actionlint + zizmor); nedostajući/neispravni skeneri, nevažeći izvještaji ili nedostajuća osnovna vrijednost ratcheta uzrokuju status INCOMPLETE. Važeći nalazi slijede odabranu strogu/savjetodavnu/ratchet politiku | Izvršavanje je obavezno; zizmor ratchet blokira u CI-ju |
| `check:openapi-breaking` | Nekompatibilne promjene javnog API ugovora (`openapi.yaml`) u odnosu na osnovnu granu (oasdiff) — generiše `openapiBreaking=N`; preskače se ako oasdiff nije prisutan ili se osnovna specifikacija ne može razriješiti                             | **Savjetodavno**                                        |

### Posao: `docs-sync-strict`

Pokreće se pri svakom PR-u prema grani `main`. Blokira spajanje u slučaju neuspjeha.

| Skripta                        | Provjerava                                                                                                                                                                                          | Blokirajuće                   |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `check:docs-all`               | Metaprovjera koja redom pokreće 6 podređenih provjera u nastavku                                                                                                                                    | Da                            |
| ↳ `check:docs-sync`            | Usklađenost verzija između CHANGELOG-a / OpenAPI-ja / llm.txt                                                                                                                                       | Da                            |
| ↳ `check:docs-counts`          | Brojevi u tekstu (broj pružalaca usluga, broj migracija itd.) nalaze se unutar dozvoljenog raspona stvarnih vrijednosti                                                                             | Da                            |
| ↳ `check:env-doc-sync`         | Svaka varijabla okruženja u `.env.example` dokumentovana je u tabeli dokumentacije i obrnuto                                                                                                        | Da                            |
| ↳ `check:deprecated-versions`  | U dokumentaciji nema zastarjelih oznaka verzija                                                                                                                                                     | Da                            |
| ↳ `check:doc-links`            | Interne markdown poveznice u dokumentaciji vode do stvarnih datoteka (oblik `[text]`/`(path)`)                                                                                                      | Da                            |
| ↳ `check:fabricated-docs`      | Rute, varijable okruženja, CLI naredbe, nazivi hookova i putanje datoteka navedeni u dokumentaciji postoje u bazi koda. Stroga provjera putem `--strict`; bez te zastavice greška nije blokirajuća. | Da (putem `--strict` u CI-ju) |
| `check:cli-i18n`               | Nizovi CLI naredbi prisutni su u svim i18n datotekama lokalizacija                                                                                                                                  | Da                            |
| `check:openapi-coverage`       | OpenAPI specifikacija pokriva najmanje postepeno povećavani minimalni prag stvarnih ruta                                                                                                            | Da                            |
| `check:openapi-security-tiers` | Anotacije sigurnosnih nivoa u `openapi.yaml` usklađene su s klasifikacijama u `routeGuard.ts`                                                                                                       | **Savjetodavno**              |
| `check:openapi-routes`         | Svaka putanja u `openapi.yaml` odgovara stvarnom `route.ts` (sprečavanje halucinacija)                                                                                                              | Da                            |
| `check:docs-symbols`           | Svaka `/api/...` referenca u `docs/**/*.md` odgovara stvarnom `route.ts` (sprečavanje halucinacija)                                                                                                 | Da                            |
| `i18n translation drift`       | Neprevedeni ključevi u i18n datotekama lokalizacija — samo upozorenje                                                                                                                               | **Savjetodavno**              |

### Zadatak: `i18n-ui-coverage`

| Skripta                           | Provjerava                                                                                                                                                                                                                               | Blokirajuće      |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage` (inline) | Pokrivenost UI i18n ključeva iznosi ≥ 65%                                                                                                                                                                                                | Da               |
| `check-ui-value-drift` (inline)   | Izmijenjena engleska **vrijednost** ne ostavlja za sobom nijedan zastarjeli prijevod                                                                                                                                                     | Da               |
| `check-new-key-coverage` (inline) | **Novi** engleski ključ preveden je u svakoj lokalizaciji — oznaka `__MISSING__:` se odbija                                                                                                                                              | Da               |
| `check-translation-ratio`         | Omjer stvarnih prijevoda po lokalizaciji (vrijednosti identične engleskim / rezervirana mjesta / nedostajući listovi izvan liste dozvoljenih izuzetaka) ne smije premašiti `config/quality/i18n-translation-baseline.json` + toleranciju | **Savjetodavno** |

Zahtijeva `fetch-depth: 0` — provjera promjena vrijednosti poredi `en.json` s bazom spajanja.

#### `check-ui-value-drift` — provjera zastarjelih prijevoda

Otkriva onu i18n regresiju koju druge provjere strukturno ne mogu uočiti: engleska vrijednost
se izmijeni, a prijevodi izvedeni iz _prethodnog_ engleskog ostanu nepromijenjeni, pa
korisnici koji ne koriste engleski nastavljaju čitati samouvjereno formuliran, ali sada netačan tekst.

Ovo se zaista pojavilo u izdanju. `oauthModal.googleOAuthWarning` je izmijenjen kada je uveden Antigravity
pomoćnik za prijavu (#5203); **39 od 43 lokalizacije** zadržalo je tekst koji je operaterima govorio da „kopiraju
cijeli URL i zalijepe ga ispod” — tok koji se za tog pružaoca usluga ne može dovršiti. To je ostalo
neprimijećeno sve do #8463 jer:

- `sync-ui-keys` samo naknadno dodaje ključeve koji **nedostaju**, nikada one koji su **zastarjeli**;
- `check-ui-keys-coverage` broji _prisutnost_ ključa, pa se zastarjeli prijevod računa kao pokriven;
- `check-translation-drift` prati dokumentacijske kopije u `docs/i18n/<locale>/**.md` —
  nikada ne čita `src/i18n/messages/*.json`. Blokirajuće u zadatku `docs-sync-strict` od
  ponovne sinhronizacije 2026-09: uredite osnovni dokument → `npm run i18n:run -- --files=<doc>` (na nivou odjeljka, jeftino).

**Svjesno razlika, bez oslanjanja na osnovnu verziju.** Poredi `en.json` na bazi spajanja s
radnim stablom; za svaki ključ čija se engleska vrijednost promijenila, zastarjela je svaka
lokalizacija koja još uvijek sadrži neizmijenjen prijevod. Time se namjerno **zamrzava postojeći dug** — razlika
ne može otkriti iz koje je stare engleske vrijednosti nastao dugogodišnji prijevod, pa provjera ocjenjuje
samo ono čega se trenutna izmjena dotiče. Alternativa (osnovna verzija heša za svaki ključ) zahtijevala bi
generisanu datoteku od ~600 KB, 3× veću od najveće postojeće osnovne verzije, koja bi se mijenjala pri svakom i18n PR-u.

Postoje dva načina da se provjera zadovolji:

1. ažurirati zahvaćene prijevode ili
2. postaviti ih na `__MISSING__:<new english>` — izvršno okruženje tada isporučuje ispravljeni tekst na engleskom
   (`src/i18n/request.ts::deepMergeFallback`, #7258), a ključ se stavlja u red za prevođenje.

Ako se promijenilo **značenje** niza, preporučuje se **preimenovanje ključa**: novi ključ ne može naslijediti
zastarjeli prijevod. Taj obrazac je korišten u #8463.

```bash
npm run i18n:check-value-drift          # strogo (ono što CI pokreće)
npm run i18n:check-value-drift:warn     # samo izvještaj
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Završava kodom 0 uz `SKIP reason=base-unresolved` kada se osnovni katalog ne može pročitati (plitki
klon bez osnovne reference), po uzoru na `check-openapi-breaking`.

### Posao: `i18n`

Puna matrica i18n provjera (jedan posao po lokalizaciji). Cijeli posao je savjetodavan.

| Skripta                         | Provjerava                          | Blokiranje                                                   |
| ------------------------------- | ----------------------------------- | ------------------------------------------------------------ |
| `validate_translation.py quick` | Potpunost prijevoda po lokalizaciji | **Savjetodavno** (`continue-on-error: true` za cijeli posao) |

### Posao: `pr-test-policy`

Pokreće se samo za zahtjeve za spajanje.

| Skripta                | Provjerava                                                                                                                                       | Blokiranje |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `check:pr-test-policy` | PR-ovi koji mijenjaju produkcijski kod u `src/`, `open-sse/`, `electron/` ili `bin/` moraju uključiti ili ažurirati testove (Strogo pravilo #8)  | Da         |
| `check:test-masking`   | Izmijenjene testne datoteke ne smanjuju neto broj provjera niti dodaju tautologije `assert.ok(true)`                                             | Da         |
| `check:pr-evidence`    | Tijelo PR-a navodi dokaze o testiranju/VPS-u za izmjenu (automatizira Strogo pravilo #18 pretraživanjem teksta PR-a — krhko, pogledajte Backlog) | Da         |

### Posao: `test-vitest`

Pokreće se nakon `build`. Neuspjeh blokira spajanje.

| Paket testova    | Provjerava                                                        | Blokiranje                                                                                                         |
| ---------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP server (110 alata), autoCombo, predmemoriju — vitest pokretač | Da                                                                                                                 |
| `test:vitest:ui` | Testove UI komponenti — vitest pokretač                           | **Blokira** — postojeći neuspjesi izričito su izuzeti u `vitest.config.ts`; novi neuspjesi uzrokuju neuspjeh posla |

### Noćni tokovi rada (raspoređeni, savjetodavni)

Pokreću se prema cron rasporedu (i putem `workflow_dispatch`), nikada na PR-ovima. Svi su savjetodavni.

| Tok rada               | Provjerava                                                                                                                                                                 | Blokiranje       |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | fast-check testove svojstava s nasumičnom početnom vrijednošću i velikim brojem pokretanja                                                                                 | **Savjetodavno** |
| `nightly-resilience`   | provjeru rasta hrpe, haotično ubrizgavanje grešaka, k6 testove opterećenja/izdržljivosti                                                                                   | **Savjetodavno** |
| `nightly-llm-security` | promptfoo zaštitu od ubrizgavanja (režim blokiranja) + garak sonde (preskaču se bez tajne dobavljača)                                                                      | **Savjetodavno** |
| `nightly-schemathesis` | nasumično testiranje OpenAPI ugovora (schemathesis) na aktivnom OmniRouteu pomoću `docs/openapi.yaml` — otkriva kršenja specifikacije / neobrađene greške 500 (Faza 8 B.4) | **Savjetodavno** |
| `nightly-mutation`     | rezultat Stryker mutacijskog testiranja nad brzom granom jediničnih testova — preživjeli mutanti otkrivaju slabe provjere                                                  | **Savjetodavno** |
| `nightly-compat`       | matricu kompatibilnosti Node okruženja u podržanim rasponima `engines.node`                                                                                                | **Savjetodavno** |

Osnovne vrijednosti performansi (hrpa, TTFB, vrijeme izgradnje) bilježe se, ali se ne koriste kao uslov: pogledajte [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
