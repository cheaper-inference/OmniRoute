# Referenca za Quality Gates (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Ovaj dokument je mjerodavna referenca za sve CI quality gates u OmniRoute-u.
Opisuje svaku kapiju, šta ona validira, u kojem CI poslu se izvršava, da li koristi
ratchet osnovicu ili politiku prolaza/pada (pass/fail), te da li blokira build ili je samo savjetodavna.

Za kratak sažetak i politiku liste dozvoljenih (allowlist), pogledajte odjeljak „Quality Gates & Ratchets”
u `AGENTS.md`. Za kritičku procjenu, klasifikaciju zrelosti i plan replikacije
istog sistema nezavisan od alata, pogledajte
[Quality Gate Playbook](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventar kontrola i profili izvršavanja

### Prihvatanje kandidata

Tokovi rada CI i Quality Gates daju stabilne rezultate: `Gate / CI` i
`Gate / Quality`. Njihova verzionirana politika prihvatanja navodi svaki prethodni posao
kao obavezan ili savjetodavan. Primjenjivi obavezni posao mora uspjeti: nedostajući,
otkazani, preskočeni, neriješeni i nepoznati rezultati ne mogu uspostaviti PASS. Važeća
klasifikacija samo za dokumentaciju ili samo za katalog može učiniti programsku granu neprimjenjivom;
nacrt PR-a nije prihvaćen kandidat. Oznaka `hotfix` ne ukida obavezu pružanja dokaza.

Oba toka rada obuhvataju PR-ove prema glavnim/release granama, slanja na `main`, ručno pokretanje
i događaje grupe spajanja. Slanje, ručno pokretanje i grupa spajanja izvršavaju puni odabir. Slanja na
`release/**` ih ne pokreću (2026-10-18): svaka promjena je već izvršila matricu u svom PR-u,
a spojena kombinacija je zadatak sistema Release-Green (`docs/ops/RUNNER_BOX.md` → hostovana grana). Forkovi
i grupe spajanja koriste hostovane izvršioce za poslove koji bi inače odabrali samostalno hostovane
izvršioce; dovoljan hostovani kapacitet mora se provjeriti prije uvođenja.

Svaka JSON potvrda identificira preuzeti SHA, izvršavanje toka rada i pokušaj.
CLI odbija nepodudaranje SHA vrijednosti preuzetog stanja i događaja. Testovi toka rada povezuju članstvo u politici
s listom `needs` posla koji daje rezultat, tako da nova ili uklonjena grana ne može neprimjetno nestati.
Potvrde pokrivaju vlastiti radni tok, a ne objavljivanje, implementaciju ili interne dijelove
postojećeg savjetodavnog skenera. Postavljanje primjenjivih provjera kao obaveznih u pravilima grane
zasebna je administrativna promjena; samo definiranje njihovih poslova ne štiti granu.

`API Route Typecheck` je nezavisna provjera radnog toka, izvan obje zbirne odluke
i statičkog profila lokalnog potpunog posmatrača. Zasebno pregledajte njen rezultat za tačno
određenog kandidata. `.github/workflows/api-route-typecheck.yml` pokreće se za PR-ove prema `main` ili
`release/**`, slanja promjena u bilo koju porodicu grana i ručno pokretanje. Nema filter putanja.
Promjene ciljne grane PR-a zahtijevaju novu provjeru; izmjene tijela/naslova koriste naziv samo za posmatranje
`Admission not requested / API Route Typecheck` i ne mogu zamijeniti provjeru prijema.
Radni tok ne definira okidač grupe za spajanje. Svako uvođenje reda čekanja za spajanje koje zahtijeva
ovu provjeru mora prvo uspostaviti njeno izvršavanje za taj događaj.

### Kapacitet izvršavanja korisničkog interfejsa

CI izvršava puni inventar korisničkog interfejsa kao četiri `test-vitest` dijela matrice, od kojih svaki ima najviše
dva radnika i postojeći rok od 15 minuta po poslu. Prvi dio također izvršava
MCP/autoCombo Vitest paket. Rezultat obaveznog posla obuhvata svaki dio matrice; neuspjeh
ili otkazivanje jednog dijela ne može uspostaviti prihvatanje kandidata.

Noćni posmatrač zadržava zasebnu potvrdu tačnog kandidata za svaki dio korisničkog interfejsa,
uključujući MCP izvršavanje u prvoj potvrdi. Obavezne su sve četiri potvrde, zapisnici i odgovarajući
identiteti izvršavanja. Lokalni `npm run test:vitest:ui` i dalje odabire
kompletan paket; jedno izvršavanje s `--shard` predstavlja samo djelimičan dokaz.

### Prikupljanje pokrivenosti jediničnih testova

Dvanaest dijelova jediničnih testova prikuplja V8 pokrivenost tokom postojećeg izvršavanja testova. Uspješan
dio izvršava `scripts/ci/compact-v8-coverage.mjs` kako bi komprimirao izvorne datoteke bez generiranja
privremenog Istanbul izvještaja. Završni posao Coverage provjerava svih dvanaest manifesta u odnosu na
SHA kandidata, okruženje izvršavanja, korijenski direktorij izvornog koda i sažetke podataka, a zatim pokreće c8 izvještaje i postojeće
pragove pokrivenosti. Ulazni podaci zadržavaju c8 globalni redoslijed naziva datoteka; prethodno spajanje po dijelovima nije sigurno
za mješovitu pokrivenost funkcija/blokova. Nedostajući, neispravni ili nekompatibilni dijelovi onemogućavaju prihvatanje.
Neuspješni dijelovi testova zasebno zadržavaju sirovu dijagnostičku pokrivenost; ona ne može ući u završno spajanje.

### Potvrde o napretku izvršavanja jediničnih testova

Zajednička naredba `test:unit:ci:shard` bilježi faze `primary`, `dashboard` i `serial`
putem `scripts/ci/unit-progress-reporter.mjs`. Uobičajeni izvještaj o testiranju ostaje
dostupan. Zasebna potvrda koja sadrži samo metapodatke bilježi početak i završetak svake datoteke,
dok 30-sekundni signal aktivnosti navodi datoteke koje su još uvijek aktivne i njihovo proteklo vrijeme. Bilježe se
samo metapodaci o izvršavanju s liste dozvoljenih stavki; opisi testova, izlazni podaci, sadržaji grešaka i cjelokupno
okruženje ne serijaliziraju se.

CI i Quality čuvaju JSONL datoteke kao `unit-progress-ci-<run>-<attempt>-<shard>` i
`unit-progress-quality-<run>-<attempt>-<shard>`. Istek vremena zadatka može spriječiti kasnije otpremanje;
već emitirani signali aktivnosti ostaju dijagnostički dokaz. Nedostatak signala aktivnosti također može ukazivati
na blokiran ili prekinut proces izvršavača. Ove potvrde zadržavaju postojeći odabir testova,
konkurentnost, rokove i izlazni status; one nisu odluke o prihvatanju kandidata.

### Sačuvani dokazi u modulu za objedinjavanje prihvatanja

`scripts/quality/validate-release-acceptance.mjs` objedinjuje dostavljeni plan i njegove manifeste; ne utvrđuje da plan pokriva cijeli proces izdavanja. Njegovi izvještaji izričito postavljaju `releaseAcceptance: false`, čak i kada plan ima status `VERIFIED`. Tok rada `release-acceptance.yml` i dalje koristi testne podatke u shadow režimu, a ne stvarne potvrde izgradnje, pakovanja, pokretanja ili promocije.

CLI zahtijeva `--evidence-root` za provjeru sačuvanih dokaza. Datoteke se pronalaze putem `<evidence-root>/<artifact_id>/<member>` i heširaju algoritmom SHA-256. PASS zapis bez dokaza, nedostajuća ili izmijenjena datoteka, nesigurna putanja ili simbolička veza onemogućavaju potvrdu. Datoteke koje nedostaju nisu isto što i prazni zapisi uspješnog izvršavanja. Postojeće provjere SHA/run/attempt ostaju nezavisne: podudaranje bajtova ne može učiniti zastarjelu potvrdu važećom. Integritet datoteke nije dokaz autentičnosti izvršavanja niti promocije artefakta.

### Inventar statičkog skeniranja

Verzionirani inventar npm aliasa i članstvo u statičkom skeniranju nalaze se u
`config/quality/gate-manifest.json`. Pokrenite `npm run check:gate-manifest` kako biste provjerili
nazive skripti i tačne naredbe u odnosu na `package.json`; dodavanja, uklanjanja i
odstupanja naredbi uzrokuju neuspjeh i lokalne kuke i poslova klasifikacije promjena u CI-ju.
Alias nije posao toka rada, instanca matrice niti testni slučaj: ovi brojevi se
ne smiju predstavljati kao međusobno zamjenjivi.

Koristite `npm run quality:scan -- --list` ili `npm run quality:scan:fast -- --list`
da pregledate odabrane aliase bez njihovog izvršavanja. Izvršilac poziva
npm ulaznu tačku, tako da je njeno okruženje izvršavanja (uključujući Bun gdje je konfiguriran) sačuvano.
Manifest bilježi aliase izvan tih profila kao zasebno pozvane, a
naredbe za održavanje zabranjene su u profilima skeniranja samo za čitanje.

Ovi profili pokrivaju samo statičko skeniranje. Oni ne potvrđuju testove proizvoda,
pokrivenost, pakovanje, vanjske provjere niti potpuno odobrenje kandidata za izdavanje.
Prihvatanje u toku rada koristi povezane `config/quality/admission-policy.json` i
`scripts/quality/admission-verdict.mjs`. Profili posmatrača izdanja ostaju zasebni;
nezavisno pregledajte njihove primjenjive provjere i potvrde. Statičke naredbe punog posmatrača
deklarirane su u `config/quality/release-green-static-profile.json`, uključujući
`audit:deps`, odabir mutacijskih testova i provjere prijevoda. Učitavač provjerava npm
naredbe u odnosu na package.json i modelirane CI/Quality deklaracije; odbija odstupanja
umjesto izvršavanja tokena ljuske kao argumenata. Obavezni izlaz skenera SKIP/INCOMPLETE
ne može uspostaviti PASS. Profil bilježi svoja vanjska izuzimanja i ne zamjenjuje
hostovanu pokrivenost, testne matrice, dokaze o paketu ili implementaciji. Tekstualni inventar u nastavku
služi kao referenca, a ne kao dokaz da je kontrola zaista izvršena.

Skripte se nalaze u `scripts/check/` (kontrole politike) i `scripts/quality/` (mehanizam postepenog pooštravanja).
CI izvor istine je `.github/workflows/ci.yml`.

### Stanje dokumentacije objavljene osnove

`.github/workflows/i18n-base-health.yml` prati stanje dokumentacije nakon odabranih
slanja na `main` i `release/v*`, kao i pri ručnom pokretanju. Njegovi filteri obuhvataju dokumentaciju,
Markdown datoteke u korijenskom direktoriju, `llm.txt`, stanje/konfiguraciju prijevoda i relevantne i18n alate.
Jedini zadatak `Published base documentation health` koristi hostovani Ubuntu i vremensko
ograničenje od pet minuta. Obavlja provjeru samo za čitanje i zapisuje dijagnostičku potvrdu bez
instaliranja zavisnosti, prevođenja ili usvajanja stanja.

`scripts/i18n/check-base-health.mjs` zahtijeva da ne postoje nedosljednosti izvornog sažetka, nedostajućeg cilja, ciljnog sažetka,
zastarjelog prijevoda i predmemorije odjeljaka. Također provjerava trenutni opseg osnovnih
dokumenata/lokalizacija i njihovo zabilježeno porijeklo. Nevažeći kontekst, nepotpuna pokrivenost
ili prekinuta provjera daje rezultat `INCOMPLETE`; potvrđeno odstupanje daje rezultat `FAIL`. Oba
vraćaju izlazni status neuspjeha. Potvrda je vezana za SHA odjave, radni tok, pokretanje i
pokušaj te se čuva kao `i18n-base-health-<sha>-<run>-<attempt>`.

Ovo je nezavisno praćenje objavljene osnove. Ono ne dodaje događaj PR-a ili
grupe spajanja, obaveznu PR provjeru, npm pseudonim niti člana profila statičkog skeniranja.
Postojeća diferencijalna PR pravila i savjetodavne klasifikacije osnovnog alata za provjeru
ostaju odvojeni. Uspješno učitavanje ne može neuspješan rezultat provjere stanja pretvoriti u PASS.

### Ubrzana putanja za release PR (`quality.yml`)

`.github/workflows/quality.yml` dopunjuje CI za PR-ove prema glavnim/release granama, slanja na `main`,
ručno pokretanje i grupe spajanja. PR-ovi koriste brze provjere filtrirane prema putanjama. Trajno
onemogućena duplicirana izgradnja je uklonjena; stvarne provjere izgradnje/paketa/pokretanja ostaju u CI-ju.

| Zadatak                                          | Opseg                                                                                                                                                                                                                                 | Blokira                 |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | PR-ovi za dokumentaciju/kôd; reference API dokumentacije i docs-all                                                                                                                                                                   | Da                      |
| `Fast Quality Gates`                             | PR-ovi za kôd; statičke provjere, provjera tipova, provjera tipova kontrolne ploče, pogođeni jedinični testovi                                                                                                                        | Da                      |
| `Forgotten sibling tests`                        | PR-ovi za kôd; izmijenjeni moduli prate se do statičkih potrošača i kandidata za povezane testove; putanje kroz barrel module i dinamički uvoz prijavljuju se kao savjetodavna dijagnostika, uz navedene izuzetke s liste dozvoljenih | **Savjetodavno**        |
| `Vitest (fast-path)`                             | PR-ovi za kôd; brzi paket vitest testova                                                                                                                                                                                              | Da                      |
| `Unit Tests fast-path`                           | PR-ovi za kôd; paket jediničnih testova u 4 segmenta                                                                                                                                                                                  | Da                      |
| `No new ESLint warnings`                         | PR-ovi za kôd; zaštita za lint koja uzima u obzir potiskivanja                                                                                                                                                                        | Da, uključujući forkove |
| `Merge integrity (changelog + generated skills)` | PR-ovi koji nisu nacrti; sinhronizacija evidencije promjena i generisanih vještina                                                                                                                                                    | Da, uključujući forkove |

#### Izvještaj o zaboravljenim povezanim testovima

`npm run check:forgotten-sibling-tests` ponovo koristi razrješivač uvoza koji stoji iza mape uticaja testova.
Za svaki izmijenjeni produkcijski modul prijavljuje determinističke lance
`changed module/symbol -> static consumer -> candidate sibling test` kada kandidat za test
nije prisutan u razlikama zahtjeva za povlačenje. Markdown sažetak i JSON rezultat čuvaju se kao
artefakt toka rada `forgotten-sibling-tests` radi kalibracije prije uvođenja bilo kakvog blokiranja.

Ponovni izvozi kroz barrel module i dinamički uvozi služe samo kao dijagnostika razrješavanja; nikada ne stvaraju
nalaz koji blokira. Pregledani izuzeci nalaze se u
`config/quality/forgotten-sibling-allowlist.json`. Svaka stavka mora navesti potrošača i kandidata za
test, dati konkretno obrazloženje i sadržavati poveznicu na GitHub problem ili zahtjev za povlačenje. Neispravne stavke
podrazumijevano uzrokuju neuspjeh. Izuzeci ne mogu potisnuti izbrisanog kandidata za test niti razliku koja dodaje `.skip`/`.todo`;
slabljenje tvrdnji i druga prikrivanja ostaju u nadležnosti nezavisne blokirajuće
kontrole `check:test-masking`.

### Zadatak: `lint`

Pokreće se za svaki PR prema `main`. U slučaju neuspjeha blokira spajanje.

| Skripta (`npm run ...`)           | Provjerava                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Blokirajuće                                  |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Verzija Node.js-a je unutar podržanog raspona                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Da                                           |
| `check:test-tla-order`            | Nijedna `node:test` datoteka u `tests/unit` ne registruje test, naiđe na `await` najvišeg nivoa, a zatim registruje dodatne testove (#18045; mehanizam postepenog pooštravanja: `test-tla-order-allowlist.json` može se samo smanjivati)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `check:cycles`                    | Kružne uvoze u cijelom `src/` + `open-sse/` (zasnovano na AST-u, uz razriješene tsconfig `paths`). Osnovna provjera završava s kodom 1 kad god postoji bilo koji ciklus (princip sigurnog neuspjeha od #15281) i navodi SCC-ove. `check:cycles:ratchet` (koji CI pokreće) blokira kada broj premaši gornju granicu `metrics.cycles` u `quality-baseline.json` — trenutno 14, `direction: down`, pa se može samo smanjivati (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                | Da (postepeno pooštravanje)                  |
| `check:boundary`                  | Povezanost `open-sse → src`: jedinstveni uvozi između datoteka iz pogonskog mehanizma u aplikaciju (`scripts/quality/measure-boundary.mjs`; lista veza predstavlja zaostatak za sanaciju razdvajanja jezgre/modula v4). Osnovna provjera = savjetodavni izvještaj (isto kao `quality:boundary`). `check:boundary:ratchet` (koji CI pokreće, također u petlji postepenog pooštravanja brzih provjera u `quality.yml`) blokira kada broj premaši gornju granicu `metrics.boundaryOpenSseToSrc` u `quality-baseline.json` — početno postavljenu na izmjerenih 771, `direction: down`; `--update` je može samo smanjiti; relativno u odnosu na osnovnu granu u PR-ovima (`--base-ref`, pogledajte ispod)                                                                                                                                                                                         | Da (postepeno pooštravanje)                  |
| `check:route-validation:t06`      | Zod sheme prisutne su na svim rutama (politika nivoa 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                           |
| `check:any-budget:t11`            | Broj `@ts-expect-error // any` ne premašuje budžet (catraca nivoa 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                           |
| `check:provider-consistency`      | Svaki pružalac u `providers.ts` ima odgovarajući unos u `providerRegistry.ts` (i obrnuto, unutar liste dozvoljenih stavki)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                           |
| `check:model-lifecycle`           | Tri ručno održavane tabele usmjeravanja ostaju usklađene sa pohranjenim snimkom životnog ciklusa (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ne boduje nijedan povučeni ID koji `REGISTRY` može usmjeriti; svaki cilj iz `BUILT_IN_ALIASES` prisutan je u `REGISTRY` i nije prisutan u snimku povučenih ID-ova; svaki povučeni ID koji je još uvijek u `REGISTRY` prosljeđuje se ili je naveden u `allowedRetiredInCatalog`; te se nijedan izvor ili cilj iz `DEFAULT_DEGRADATION_MAP` ne pojavljuje kao povučen u tom snimku. Ovo ne dokazuje da model trenutno poslužuje aktivni nadređeni servis. Van mreže — poredi sa `config/quality/model-lifecycle.json`, koji se ručno osvježava pomoću `npm run quality:refresh-model-lifecycle` (mreža; nije povezan s CI-jem). `allowedRetiredInCatalog` je jednosmjerna kontrola postepenog smanjivanja: unos dodajte samo uz prateći problem. | Da                                           |
| `check:fetch-targets`             | Svaki `fetch("/api/...")` u klijentskom `src/` razrješava se na stvarni `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Da                                           |
| `check:deps`                      | Sve zavisnosti koje se mogu instalirati pomoću `npm install` u svakom `package.json` u repozitoriju nalaze se u `dependency-allowlist.json`; novi neprikovani paketi ili paketi koji predstavljaju slopsquatting označavaju se                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                           |
| `audit:deps`                      | npm revizija svih pet nezavisnih lockfileova (korijenski, Electron, OpenCode dodaci v1/v2 i provider). Kritična upozorenja blokiraju; upozorenja visokog nivoa ostaju vidljiva upozorenja. Nedostajuće/neuspjele revizije imaju status INCOMPLETE i blokiraju; hash vrijednosti lockfileova i izvještaji zadržavaju se za svaki opseg.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                           |
| `check:lockfile`                  | Integritet datoteke `package-lock.json` — https registar, hash vrijednosti integriteta, bez zamjena hosta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:licenses`                  | Lista dozvoljenih SPDX licenci za produkcijske zavisnosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:tracked-artifacts`         | Bez artefakata izgradnje / evidentiranih `node_modules` simboličkih veza (također se pokreće u husky pre-commit; pre-push je namjerno pojednostavljen — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                           |
| `check:ai-attribution`            | Bez AI/bot `Co-Authored-By` završne oznake ili podnožja o AI generiranju u commitima, naslovu ili tijelu PR-a — strogo pravilo br. 16 (u `quality.yml` petlji brzih provjera za PR→`release/**` — čita sadržaj događaja, ne radi ništa izvan PR-ova — i korak samo za PR u `ci.yml` lint provjeri za PR→`main`; također i husky `commit-msg` hook; ljudski koautori su dozvoljeni; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:vitest-exclusions`         | Svako Vitest izuzimanje navodi prateći problem i nalazi se u `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Da                                           |
| `check:file-size`                 | Izvorne datoteke (`.ts`/`.tsx` u `src/`, `open-sse/`, `electron/`, `bin/`) ostaju unutar ograničenja `cap`, a testne datoteke (`*.test.ts(x)`) unutar `testCap`; datoteke zamrznute u `file-size-baseline.json` (`frozen` / `testFrozen`) ne smiju premašiti svoju zabilježenu veličinu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                           |
| `check:error-helper`              | Odgovori o greškama u izvršiteljima/rukovateljima koriste `buildErrorBody()` / `sanitizeErrorMessage()` (Strogo pravilo #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Da                                           |
| `check:migration-numbering`       | SQL datoteke migracija numerisane su uzastopno, bez praznina ili duplikata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                           |
| `check:public-creds`              | Nema doslovnih OAuth vrijednosti `client_id`/`client_secret` ni Firebase Web ključeva izvan `publicCreds.ts` (Strogo pravilo #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                           |
| `check:db-rules`                  | Nema direktnog SQL-a izvan modula `src/lib/db/`; nema zbirnih uvoza iz `localDb.ts` (Stroga pravila #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                           |
| `check:known-symbols`             | Izvršitelji pružalaca usluga, strategije usmjeravanja i prevodioci registrirani u svojim tabelama otpreme odgovaraju datotekama na disku — nema nepovezanih ili nedeklariranih simbola                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                           |
| `check:route-guard-membership`    | Svaka ruta koja pokreće podređeni proces klasificirana je pomoću `isLocalOnlyPath()` (Stroga pravila #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Da                                           |
| `check:test-discovery`            | Svaku `*.test.ts` / `*.spec.ts` datoteku u repozitoriju prikuplja najmanje jedan pokretač testova (mehanizam postepenog pooštravanja: lista nepovezanih testova u `test-discovery-baseline.json` može se samo smanjivati)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:agent-skills-sync`         | Generirani artefakti vještina agenata podudaraju se sa svojim izvornim katalogom (bez odstupanja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:provider-asset-provenance` | Logotipi/resursi pružatelja imaju evidentiran zapis o porijeklu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `lint:json`                       | JSON konfiguracijske datoteke mogu se parsirati i zadovoljavaju pravila lintanja repozitorija                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | Kompilacija TypeScripta bez grešaka (samo savjetodavna upozorenja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Da                                           |
| `typecheck:noimplicit:core`       | Strogi `noImplicitAny` — usmjeren na budućnost; mnoga postojeća mjesta poziva još uvijek trebaju anotacije                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **Savjetodavno** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ograničen na `src/app/(dashboard)/**` (#7033) — pažljivo odabrana lista od 27 datoteka za `typecheck:core` ne uključuje nijedan TSX kontrolne ploče, a ni `next build` nikada ne provjerava njihove tipove (`next.config.mjs` postavlja `ignoreBuildErrors: true`), pa su regresije nepovezanih identifikatora u njima (#6625/#6909) bile nevidljive CI-ju. Razlike se porede sa zamrznutom osnovnom vrijednošću broja po datoteci/TS kodu (`config/quality/dashboard-typecheck-baseline.json`, isti obrazac provođenja zastarjelosti kao kod `check:known-symbols`) — samo NOVO nastale greške iznad broja u osnovnoj vrijednosti uzrokuju neuspjeh provjere; smanjite osnovnu vrijednost pomoću `--update` kada se ispravi prethodno postojeća greška.                                                                                                                               | Da                                           |

### Zadatak: `quality-gate`

Pokreće se nakon `test-coverage`. U slučaju neuspjeha blokira spajanje.

| Skripta                      | Provjerava                                                                                                                                                                        | Blokirajuće                       |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `quality:collect`            | Generiše `quality-metrics.json` (broj ESLint upozorenja, pokrivenost iz objedinjenog izvještaja dijelova)                                                                         | Da (prethodi mehanizmu zupčanika) |
| `quality:ratchet`            | Nijedna metrika u `quality-baseline.json` nije nazadovala (ESLint upozorenja ≤ osnovna vrijednost; pokrivenost ≥ osnovna vrijednost)                                              | Da                                |
| `check:duplication`          | Dupliciranje koda (jscpd@4) ne premašuje osnovnu vrijednost iz `quality-baseline.json`                                                                                            | Da                                |
| `check:complexity`           | Ciklomatska složenost na nivou datoteke ne premašuje ograničenje (osnovni ESLint `complexity` + `max-lines-per-function`)                                                         | Da                                |
| `check:cognitive-complexity` | Zupčanik kognitivne složenosti (`eslint-plugin-sonarjs`) — zasebno ESLint pokretanje; CI pokreće oba objedinjena kao jedan korak `check:complexity-ratchets`                      | Da                                |
| `check:dead-code`            | Zupčanik nekorištenih izvoza/datoteka (knip) ne nazaduje u odnosu na osnovnu vrijednost                                                                                           | Da                                |
| `check:compression-budget`   | Budžet testa performansi kompresije — minimalne uštede tokena za svaki pogon ne smiju nazadovati                                                                                  | Da                                |
| `check:type-coverage`        | Zupčanik procenta tipiziranog koda (`type-coverage`) ne nazaduje; u velikoj mjeri obuhvata `typecheck:noimplicit:core`                                                            | Da                                |
| `check:codeql-ratchet`       | Broj otvorenih CodeQL upozorenja ne nazaduje (čita putem `gh api`; uredno preskače bez tokena) — za učestalost osvježavanja i ručno pokretanje pogledajte „CodeQL zupčanik“ ispod | Da                                |

### Zadatak: `quality-extended`

Zadatak blokira primjenjive kandidate. Veličina paketa, pronalasci tajni, pronalasci
ranjivosti, pronalasci toka rada i OpenAPI promjene provjeravaju se obaveznim zupčanicima.
Dijagnostika kružnih zavisnosti ostaje savjetodavna. Instalacija skenera je obavezna:
`scripts/ci/install-quality-scanners.sh` instalira fiksirane verzije i propagira
neuspjehe instalacije. Alati koji nedostaju, nevažeći izvještaji ili osnovne vrijednosti
koje nedostaju ostavljaju obaveznu provjeru skenera NEPOTPUNOM.

| Skripta                  | Provjerava                                                                                                                                                                                                                                     | Blokiranje                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `check:circular-deps`    | Nema kružnih zavisnosti (dpdm)                                                                                                                                                                                                                 | **Savjetodavno**                                     |
| `check:bundle-size`      | Veličina paketa ne premašuje ograničenje; nedostupno mjerenje uzrokuje neuspjeh                                                                                                                                                                | **Blokirajuće uz --ratchet**                         |
| `check:secrets`          | Nalazi alata Gitleaks ne nazaduju; obavezna skeniranja odbijaju nedostajuće alate/izvor/osnovnu vrijednost, neuspješna skeniranja i nevažeće izvještaje                                                                                        | **Blokirajuće uz --ratchet**                         |
| `check:vuln-ratchet`     | Ranjivosti zavisnosti ne nazaduju; obavezna skeniranja odbijaju nedostajuće alate, nevažeće izvještaje ili nedostajuće osnovne vrijednosti                                                                                                     | **Blokirajuće uz --ratchet**                         |
| `check:workflows`        | Provjera workflowa (actionlint + zizmor); nedostajući/neispravni skeneri, nevažeći izvještaji ili nedostajuća ratchet osnovna vrijednost uzrokuju neuspjeh kao INCOMPLETE. Važeći nalazi slijede odabranu strogu/savjetodavnu/ratchet politiku | Izvršavanje je obavezno; zizmor ratchet blokira u CI |
| `check:openapi-breaking` | Javni API ugovor u odnosu na zakačene commitove događaja (PR merge-base, stanje prije pusha, osnova merge grupe; za zakazano/ručno izvršavanje prvi roditelj checkouta); obavezno mjerenje se zatvara uz neuspjeh                              | **Blokirajuće uz --ratchet**                         |

### Posao: `docs-sync-strict`

Za pull requestove prema `main` ili `release/**`, ovaj posao se pokreće samo za kandidate koji nisu nacrti (ili su u pouzdanom redu) i klasificirani su kao promjene dokumentacije ili koda. Pokreće se i za CI događaje koji nisu PR-ovi; push okidač ovog workflowa obuhvata samo `main`, ne i `release/**`. Korak koji završi izlaznim kodom različitim od nule blokira posao; nalazi koji se samo prijavljuju i dokumentovani izuzeci navedeni ispod ga ne blokiraju.

| Skripta                        | Provjerava                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Blokiranje                                                                                                                           |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `check:docs-all`               | Meta-kontrola koja redom pokreće 7 podređenih kontrola navedenih ispod                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                                                                                                                   |
| ↳ `check:docs-sync`            | Usklađenost verzija paketa/OpenAPI-ja/CHANGELOG-a, tačne kopije `llm.txt`, invarijante odjeljaka/veličine prevedenog CHANGELOG-a i odsustvo zamijenjenih duplih dokumenata                                                                                                                                                                                                                                                                                                                                 | Da                                                                                                                                   |
| ↳ `check:docs-frontmatter`     | Kompajlirane stranice dokumentacije sadrže važeće naslove u frontmatteru                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                                                                                                                   |
| ↳ `check:docs-counts`          | Invarijante brojeva s visokom pouzdanošću su stroge; heurističke provjere broja datoteka samo upozoravaju osim ako skripta dobije `--strict` (CI meta-kontrola ga ne prosljeđuje)                                                                                                                                                                                                                                                                                                                          | Strogi nivo blokira; blagi nivo je savjetodavan                                                                                      |
| ↳ `check:env-doc-sync`         | Čitanja varijabli okruženja u izvornom kodu, `.env.example` i `docs/reference/ENVIRONMENT.md` usklađeni su nakon primjene eksplicitnih lista izuzetaka ignore, doc-only i env-only                                                                                                                                                                                                                                                                                                                         | Da, izvan dokumentovanih lista izuzetaka                                                                                             |
| ↳ `check:deprecated-versions`  | Prijavljuje moguće zastarjele verzije izvan sigurnih historijskih konteksta i zastarjele datume ažuriranja, isključujući ignorisane dokumente                                                                                                                                                                                                                                                                                                                                                              | Savjetodavno u trenutnoj CI konfiguraciji (`--strict` se ne prosljeđuje)                                                             |
| ↳ `check:doc-links`            | Interne markdown veze u dokumentaciji vode do stvarnih datoteka (oblik `[text]`/`(path)`)                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                                                                                                                   |
| ↳ `check:fabricated-docs`      | Rute, varijable okruženja, CLI naredbe, nazivi hookova i putanje datoteka navedeni u dokumentaciji postoje u bazi koda. Stroga kontrola uz `--strict`; blagi neuspjeh bez zastavice.                                                                                                                                                                                                                                                                                                                       | Da (putem `--strict` u CI-ju)                                                                                                        |
| `check:cli-i18n`               | Korišteni CLI `t()` ključevi postoje u `en`; `pt-BR` zadržava svaki odjeljak najvišeg nivoa; `zh-CN` i `zh-TW` sadrže svaki ključ iz `en`                                                                                                                                                                                                                                                                                                                                                                  | Da                                                                                                                                   |
| `check:openapi-coverage`       | OpenAPI specifikacija pokriva najmanje ratchetom utvrđenu donju granicu stvarnih ruta                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                                                                                                                   |
| `check:openapi-security-tiers` | Deklarisane anotacije `x-loopback-only`/`x-always-protected` moraju imati pokriće u `routeGuard.ts`; greške parsera i nepodudarnosti u provjeri unaprijed blokiraju. Obrnuta provjera nedostajućih `x-loopback-only` ispod prefiksa samo za lokalni pristup upozorava, a rute definisane samo obrascem isključene su iz te obrnute provjere.                                                                                                                                                               | Parser/provjere unaprijed blokiraju; obrnuta provjera je savjetodavna                                                                |
| `check:openapi-routes`         | Svaka putanja `/api...` u `openapi.yaml` odgovara stvarnoj ruti bez obzira na nazive parametara nakon primjene obrazložene liste izuzetaka `KNOWN_STALE_SPEC`; zastarjeli unosi na listi također uzrokuju neuspjeh                                                                                                                                                                                                                                                                                         | Da                                                                                                                                   |
| `check:docs-symbols`           | Interne URL reference `/api/...` u kanonskim dokumentima koji nisu prijevodne kopije odgovaraju stvarnoj ruti ili porodici ruta; proxy/upstream/placeholder/datotečne reference i obrazloženi unosi `KNOWN_STALE_DOC_REFS` su isključeni, a zastarjeli unosi liste uzrokuju neuspjeh                                                                                                                                                                                                                       | Da                                                                                                                                   |
| `i18n translation drift`       | Provjerava hash vrijednosti izvora/cilja osnovnih dokumenata i porijeklo prijevoda. Poređenje u PR-u dopušta samo identične naslijeđene greške; nove ili neprovjerene nedosljednosti izvora, nedostajućeg cilja, ciljnog hasha, zastarjelog prijevoda ili keša odjeljaka blokiraju. Izvan poređenja u PR-u greške izvora/nedostajućeg cilja/ciljnog hasha blokiraju, dok zastarjeli prijevodi i nedosljedni keševi odjeljaka ostaju samo upozorenja. Odsustvo keša odjeljaka u starom formatu nije greška. | Novo/neprovjereno PR odstupanje blokira; identično naslijeđeno odstupanje je savjetodavno; pravila izvan PR-a zavise od vrste greške |

### Posao: `i18n-ui-coverage`

| Skripta                             | Provjerava                                                                                                                                                                                                       | Blokira         |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (ugrađeno) | Pokrivenost UI i18n ključeva je ≥ 65%                                                                                                                                                                            | Da              |
| `check-ui-value-drift` (ugrađeno)   | Prepisana engleska **vrijednost** ne ostavlja zastarjele prijevode                                                                                                                                               | Da              |
| `check-new-key-coverage` (ugrađeno) | **Novi** engleski ključ preveden je u svakom lokalitetu — oznaka `__MISSING__:` se odbija                                                                                                                        | Da              |
| `check-translation-ratio`           | Omjer stvarnih prijevoda po lokalitetu (identično engleskom / rezervirano mjesto / nedostajući listovi izvan liste dozvoljenih) ne smije premašiti `config/quality/i18n-translation-baseline.json` + toleranciju | **Blokirajuće** |

Zahtijeva `fetch-depth: 0` — kontrola odstupanja vrijednosti poredi `en.json` s bazom spajanja.

#### `check-ui-value-drift` — kontrola zastarjelih prijevoda

Otkriva onu i18n regresiju koju ostale kontrole strukturno ne mogu vidjeti: engleska vrijednost
se prepiše, a prijevodi izvedeni iz _prethodne_ engleske vrijednosti ostanu, pa
korisnici koji ne govore engleski nastavljaju čitati samouvjereno formuliran, ali sada pogrešan tekst.

Ovo je zaista dospjelo u izdanje. `oauthModal.googleOAuthWarning` je prepisan kada je uveden
Antigravity pomoćnik za prijavu (#5203); **39 od 43 lokaliteta** zadržalo je tekst koji operaterima
govori da „kopiraju cijeli URL i zalijepe ga ispod” — tok koji se ne može dovršiti za tog pružaoca.
Problem nije primijećen sve do #8463 jer:

- `sync-ui-keys` dopunjava samo ključeve koji su **odsutni**, nikada one koji su **zastarjeli**;
- `check-ui-keys-coverage` broji _prisutnost_ ključeva, pa se zastarjeli prijevod računa kao pokriven;
- `check-translation-drift` prati dokumentacijske kopije `docs/i18n/<locale>/**.md` —
  nikada ne čita `src/i18n/messages/*.json`. Blokira u poslu `docs-sync-strict` od
  ponovne sinhronizacije 2026-09: uredite osnovni dokument → `npm run i18n:run -- --files=<doc>` (na nivou odjeljka, jeftino).

**Svjesno razlika, bez oslanjanja na osnovnu liniju.** Poredi `en.json` na bazi spajanja s
radnim stablom; za svaki ključ čija se engleska vrijednost promijenila, svaki lokalitet koji još uvijek
sadrži netaknut prijevod smatra se zastarjelim. Time se namjerno **zamrzava prethodno postojeći dug** — razlika
ne može otkriti iz koje je stare engleske vrijednosti dugogodišnji prijevod nastao, pa kontrola procjenjuje
samo ono što trenutna promjena dotiče. Alternativa (osnovna linija heševa po ključu) zahtijevala bi
generiranu datoteku od ~600 KB, 3× veću od najveće postojeće osnovne linije, koja bi se mijenjala pri svakom i18n PR-u.

Dva su načina da se kontrola zadovolji:

1. ažurirajte zahvaćene prijevode ili
2. postavite ih na `__MISSING__:<new english>` — izvršno okruženje tada isporučuje ispravljeni engleski
   (`src/i18n/request.ts::deepMergeFallback`, #7258), a ključ se stavlja u red za prevođenje.

Ako se promijenilo **značenje** niza, poželjno je **preimenovati ključ**: novi ključ ne može naslijediti
zastarjeli prijevod. Taj obrazac je korišten u #8463.

```bash
npm run i18n:check-value-drift          # strogo (ono što CI pokreće)
npm run i18n:check-value-drift:warn     # samo izvještaj
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Kontrole odstupanja vrijednosti i novih ključeva dijele jedno nepromjenjivo poređenje iz
`scripts/i18n/resolve-ui-diff-base.mjs`. Tok rada prosljeđuje isti osnovni SHA, SHA vrha osnove i
SHA kandidata objema provjerama. Pokretanja za PR/promjenu ciljne osnove, push i merge-group koriste svoj kontekst
događaja. Pokretanje grane kandidata zahtijeva njen tačno određeni otvoreni PR ili eksplicitni
ulaz `i18n_base_sha`. Pokretanje ili planirano posmatranje grane `main` ili `release/vX.Y.Z`
bez tog ulaza poredi posljednji commit s njegovim prvim roditeljem; to nije revizija
svih naslijeđenih dugovanja u prijevodima. Lokalno pokretanje zahtijeva eksplicitnu osnovu poređenja,
naprimjer naredbu `BASE_REF` iznad.

Nedostajući ili dvosmislen kontekst poređenja, nečitljiv ili nevažeći obavezni katalog i
izmijenjeni kandidat daju `INCOMPLETE` uz izlazni kôd **2**, uključujući i režim upozorenja.
Katalozi se čitaju pomoću `scripts/i18n/read-ui-catalog.mjs`; greške pri čitanju ne zamjenjuju se
praznim objektima. Ni nedostupna osnova ni nepotpun ulaz ne uspostavljaju PASS.

### Posao: `i18n`

Potpuna matrica i18n validacije (jedan posao po lokalitetu). Cijeli posao je savjetodavan.

| Skripta                         | Provjerava                        | Blokira                                                       |
| ------------------------------- | --------------------------------- | ------------------------------------------------------------- |
| `validate_translation.py quick` | Potpunost prijevoda po lokalitetu | **Savjetodavno** (`continue-on-error: true` na cijelom poslu) |

### Posao: `pr-test-policy`

Pokreće se samo za zahtjeve za spajanje.

| Skripta                | Provjerava                                                                                                                                      | Blokira |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:pr-test-policy` | PR-ovi koji mijenjaju produkcijski kôd u `src/`, `open-sse/`, `electron/` ili `bin/` moraju uključiti ili ažurirati testove (Strogo pravilo #8) | Da      |
| `check:test-masking`   | Izmijenjene testne datoteke ne smanjuju neto broj provjera niti dodaju tautologije `assert.ok(true)`                                            | Da      |
| `check:pr-evidence`    | Tijelo PR-a navodi dokaze testiranja/VPS-a za promjenu (automatizira Strogo pravilo #18 pretraživanjem teksta PR-a — krhko, pogledajte Backlog) | Da      |

### Posao: `test-vitest`

Zahtijeva posao klasifikacije `changes`. Neuspjeh primjenjivih dijelova matrice blokira spajanje.

| Paket            | Provjerava                                               | Blokirajuće                                                                                                                 |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 alata), autoCombo, keš — vitest pokretač | Da                                                                                                                          |
| `test:vitest:ui` | Testovi UI komponenti — vitest pokretač                  | **Blokirajuće** — postojeći neuspjesi su izričito isključeni u `vitest.config.ts`; novi neuspjesi uzrokuju neuspjeh zadatka |

### Noćni radni tokovi (zakazani, savjetodavni)

Oni se pokreću prema cron rasporedu (i putem `workflow_dispatch`), nikada na PR-ovima. Svi su savjetodavni.

| Radni tok              | Provjerava                                                                                                                                                               | Blokirajuće      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `nightly-property`     | fast-check testovi svojstava s nasumičnim početnim brojem i velikim brojem pokretanja                                                                                    | **Savjetodavno** |
| `nightly-resilience`   | kontrola rasta heapa, chaos ubrizgavanje grešaka, k6 testiranje opterećenja/izdržljivosti                                                                                | **Savjetodavno** |
| `nightly-llm-security` | promptfoo zaštita od ubrizgavanja (način blokiranja) + garak probe (preskaču se bez tajne pružaoca usluge)                                                               | **Savjetodavno** |
| `nightly-schemathesis` | Fuzz testiranje OpenAPI ugovora (schemathesis) na aktivnom OmniRouteu koristeći `docs/openapi.yaml` — otkriva kršenja specifikacije / neobrađene greške 500 (Faza 8 B.4) | **Savjetodavno** |
| `nightly-mutation`     | Rezultat Stryker mutacijskog testiranja na brzoj traci jediničnih testova — preživjeli mutanti otkrivaju slabe provjere                                                  | **Savjetodavno** |
| `nightly-compat`       | Matrica kompatibilnosti Node enginea kroz podržane raspone `engines.node`                                                                                                | **Savjetodavno** |

Osnovne vrijednosti performansi (heap, TTFB, vrijeme izgradnje) bilježe se, ali se ne koriste kao uslov: pogledajte [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
- **savjetodavno** — globalni zbir u odnosu na zamrznutu osnovnu vrijednost. Naslijeđeno odstupanje nikada ne označava
  ispravan PR crvenim; odstupanje se prati radi ispravke tokom usklađivanja izdanja, a nadzire ga
  zadatak za rezervni kapacitet.

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

## Ratchet osnovna vrijednost (`quality-baseline.json`)

Ratchet mehanizam (`scripts/quality/check-quality-ratchet.mjs`) čita `quality-baseline.json`
i poredi ga s upravo prikupljenim `quality-metrics.json`. Svaka metrika koja nazaduje
izvan svoje epsilon vrijednosti uzrokuje neuspjeh builda.

Trenutno praćene metrike:

| Metrika               | Smjer  | Značenje                              |
| --------------------- | ------ | ------------------------------------- |
| `eslintWarnings`      | `down` | Broj ESLint upozorenja ne smije rasti |
| `coverage.statements` | `up`   | Pokrivenost naredbi ne smije opasti   |
| `coverage.lines`      | `up`   | Pokrivenost linija ne smije opasti    |
| `coverage.functions`  | `up`   | Pokrivenost funkcija ne smije opasti  |
| `coverage.branches`   | `up`   | Pokrivenost grana ne smije opasti     |

Za ažuriranje osnovne vrijednosti nakon stvarnog poboljšanja:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Oznaka `--update` upisuje trenutno izmjerene vrijednosti u `quality-baseline.json`.
Commitujte ovu datoteku zajedno s izmjenom koja je poboljšala metriku. PR koji poboljša
metriku bez ažuriranja osnovne vrijednosti bit će otkriven pomoću `--require-tighten` (Faza 6A.5,
implementacija na čekanju).

### CodeQL ratchet: učestalost osvježavanja i ručno pokretanje

`check:codeql-ratchet` čita **stanje repozitorija koje se osvježava prema rasporedu — ne za svaki PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` prijavljuje
`state: configured`, `schedule: weekly`: GitHubovo skeniranje sa zadanim postavkama, a ne analiza
pri svakom pushu. Posljedica: nakon spajanja PR-a koji POPRAVLJA upozorenja, ratchet nastavlja čitati
stari, veći broj sve dok se ne izvrši sljedeće zakazano skeniranje — pa prijavljuje regresiju
na svakom otvorenom PR-u, uključujući naknadne PR-ove povezane s PR-om koji je sadržavao popravak,
sve dok skeniranje ne sustigne promjene.

**Ručno osvježavanje**: `gh workflow run codeql.yml --ref release/vX.Y.Z` ponovo pokreće
analizu i ponovo objavljuje upozorenja u roku od nekoliko minuta. Prvo pročitajte `.github/workflows/codeql.yml`
— njegovo zaglavlje objašnjava da koristi isključivo `workflow_dispatch` **jer je u sukobu s
GitHubovom „zadanom postavkom“** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Vraćanje `push`/`pull_request`/
`schedule` okidača prvo zahtijeva **radnju vlasnika**: Settings → Code security →
CodeQL: Default → Advanced. Nemojte dodavati `schedule:` okidač bez te promjene — on će
samo proizvoditi neuspješna izvršavanja.

**Postrožite osnovnu vrijednost nakon što broj opadne** — `node scripts/check/check-codeql-ratchet.mjs
--update` upisuje novi izmjereni broj u `quality-baseline.json` →
`metrics.codeqlAlerts.value`, tako da ratchet ne dozvoli neprimjetnu regresiju nazad
do starog gornjeg praga. Primjer iz prakse (2026-09-02/03): PR #12502 popravio je 7 stvarnih upozorenja
(13 → 6 izmjerenih otvorenih); PR #12530 postrožio je zamrznutu osnovnu vrijednost sa 11 → 6 radi usklađivanja;
preostalih 6 zatim je odbačeno uz pojedinačno obrazloženje za svako upozorenje, čime je broj otvorenih
upozorenja smanjen na 0.

**Odbacivanja su odluka operatera (Strogo pravilo #14)** — nikada nemojte odbaciti CodeQL upozorenje
bez navođenja tehničkog obrazloženja u komentaru odbacivanja: `won't fix` za
zahtjev uzvodnog protokola, `used in tests` za testni fixture, `false positive`
za sanitizer koji CodeQL ne može prepoznati (presedan: `docs/security/ERROR_SANITIZATION.md`).

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

## Politika liste dozvoljenih stavki

Svaka kontrola koja ne može pasti zbog prethodno postojećih kršenja koristi zamrznutu listu dozvoljenih stavki
(npr. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Pravilo glasi:

**Otklonite osnovni uzrok; koristite listu dozvoljenih stavki samo kada je kršenje prethodno postojalo i
ne može se otkloniti u istom PR-u.**

Prilikom dodavanja stavke na listu dozvoljenih stavki:

1. Uključite komentar s obrazloženjem.
2. Navedite povezani problem za praćenje (npr. `// #3498 — Phase 2 feature, not yet implemented`).
3. Uklonite stavku u istom PR-u koji otklanja kršenje — zastarjela stavka koja više
   ne potiskuje aktivno kršenje i sama predstavlja grešku (6A.3 provjera zastarjelih pravila
   oborit će kontrolu zbog nepovezane stavke na listi dozvoljenih stavki nakon što bude implementirana).

**Nemojte** dodavati stavke na listu dozvoljenih stavki samo da bi testovi brže prošli. Uspješna kontrola uz rastuću
listu dozvoljenih stavki stvara lažan osjećaj kvaliteta.

### Kada kontrola ne prođe za vaš PR

1. **Pažljivo pročitajte izlaz kontrole** — on vam tačno govori koja je datoteka ili simbol prekršio
   pravilo.
2. **Otklonite kršenje** — većina kontrola su determinističke provjere sistema datoteka koje prolaze čim
   je kôd ispravan.
3. **Ako je kršenje prethodno postojalo** (tj. niste ga vi uveli, ali ga kontrola sada
   obuhvata): dodajte stavku na listu dozvoljenih stavki uz komentar s obrazloženjem i problem za praćenje.
4. **Ako je kontrola zapinjača** (pokrivenost, ESLint upozorenja, dupliciranje, složenost):
   vaša izmjena je pogoršala metriku. Otklonite osnovni problem ili (rijetko) pokrenite
   `npm run quality:ratchet -- --update` ako je izmjena namjerna i pogoršanje metrike
   prihvatljivo — ali dokumentujte razlog u opisu PR-a.
5. **Savjetodavne kontrole** (`continue-on-error: true`) služe za informisanje — ne blokiraju
   spajanje, ali se pojavljuju u CI sažetku. Svejedno ih otklonite.

---

## Dodavanje nove kapije

1. Kreirajte `scripts/check/check-<name>.mjs` (ili `.ts`). Kapije politike izlaze sa 0/1.
   Kapije tipa ratchet emituju metriku u `quality-metrics.json` putem `collect-metrics.mjs`.
2. Dodajte `"check:<name>": "node scripts/check/check-<name>.mjs"` u `package.json` i
   sinhronizirajte alias i njegovu tačnu komandu u `config/quality/gate-manifest.json`.
   Primijenite istu sinhronizaciju prilikom izmjene ili uklanjanja postojećeg aliasa za validaciju.
   Pokrenite `npm run check:gate-manifest`; pre-commit hook i klasifikacija promjena u CI-ju
   provode ovaj ugovor.
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

Ovaj inventar je usklađen s `ci.yml` 2026-06-17 (prethodna verzija je izostavila
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Pregled ROI-ja usklađenog skupa
identificirao je sljedeće kandidate za racionalizaciju. **Spajanja su mehaničke CI
izmjene; promjene statusa/uklanjanja su odluke o pravilima rezervirane za operatora.** Ništa navedeno
još nije primijenjeno.

**Također nije dokumentirano iznad** (savjetodavno, slab signal): `docs-lint` posao
(markdownlint + Vale, cijeli posao ima `continue-on-error`) i samostalni tokovi rada skenera
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` se nalazi u
`quality-baseline.json`, ali nije povezan s blokirajućim mehanizmom praga u `ci.yml` — metrika je
trenutno nepovezana.

### Spajanje / deduplikacija (mehanički, manji rizik)

Svaki kandidat je provjeren u odnosu na stvarno stanje kontrolnih tačaka 2026-06-17 (vjeruj, ali provjeri);
ispostavilo se da nekoliko „očiglednih” spajanja skriva dug i **nisu** direktne zamjene bez problema.

- **`check:docs-sync` se pokreće dvaput** — samostalno u `lint` poslu i ponovo unutar `check:docs-all` (`docs-sync-strict`) te u husky pre-commit hooku. ✅ **ZAVRŠENO** — uklonjeno samostalno pozivanje iz `lint` posla.
- **CVE skeniranje** — ❌ **NIJE čisto spajanje.** `audit:deps` blokira kritična upozorenja i nepotpune revizije za svih pet lockfileova, dok upozorenja visokog nivoa prijavljuje kao upozorenja prema trenutnim pravilima; `check:vuln-ratchet` (osv) pada samo pri _regresiji_ u odnosu na pohranjenu početnu vrijednost i odbija nedostajuća mjerenja kada su obavezna. Različita semantika — uklanjanjem `audit:deps` izgubila bi se apsolutna kontrolna tačka za kritične probleme i nezavisne potvrde revizije paketa. Zadržati oba.
- **Otkrivanje ciklusa** — ✅ **ZAVRŠENO** (#15159 G-01/G-02). Stari tekst je ovdje nazivao `check:cycles` „zelenom, kuriranom” kontrolnom tačkom i opravdavao njeno zadržavanje kao blokirajuće jer je `check:circular-deps` (dpdm) prijavljivao 91 ciklus. To zeleno stanje bilo je **lažno zeleno**: `check:cycles` je skenirao 5 poddirektorija (450 datoteka), podudarao samo statičke `import|export … from` izraze i odbacivao svaki `@/` i `@omniroute/open-sse/` specifikator, pa nije mogao vidjeti cikluse dinamičkih importa i aliasa koji su dominirali repozitorijem. Ispravljeno: kontrolna tačka sada prolazi kroz `src` + `open-sse` (5023 datoteke), prikuplja specifikatore iz TypeScript AST-a (tako da se `import("…")` računa, a `typeof import("…")` na poziciji tipa ne računa) i razrješava tsconfig `paths`. Pronalazi **14** ciklusa, a ne 0. Budući da se 14 postojećih ciklusa ne može ispraviti u PR-u kontrolne tačke, `check:cycles` je sada **mehanizam praga** (`--ratchet`, gornja granica `metrics.cycles.value = 14` u `quality-baseline.json`, `direction: down`) — blokira svaku _regresiju_, a broj se može samo smanjivati. CI pokreće `npm run check:cycles:ratchet`. Postepeno smanjenje prati **A-01**. `check:circular-deps` (dpdm) ostaje savjetodavan kao šire drugo mišljenje.
- **Složenost** — ✅ **ZAVRŠENO** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): jedan ESLint prolaz, brojanje prema ruleId-u tako da početne vrijednosti za ciklomatsku složenost + maksimalni broj linija i kognitivnu složenost ostanu nezavisne; pojedinačni `check:complexity` / `check:cognitive-complexity` ostaju za lokalni `--update`.
- **`/api` zaštita od halucinacija** — ✅ **ZAVRŠENO** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): jedan FS inventar direktorija `src/app/api`, openapi-routes + docs-symbols i dalje izvještavaju nezavisno; pojedinačne provjere ostaju za lokalna pokretanja.
- **`check:node-runtime` se pokreće u 11 poslova** — ⚠️ **nizak ROI.** Svaki koristi zaseban runner, a provjera traje <1s; ukupna ušteda je ~10s, naspram gubitka jeftine zaštite po poslu. Nije vrijedno izmjena.
- **`typecheck:noimplicit:core` u CI lint poslu** — ✅ **uklonjeno iz lint posla** (bilo je savjetodavno uz `continue-on-error`); blokirajuću površinu tipova čine `typecheck:core` + `check:type-coverage`. Lokalna skripta je zadržana.

### Promijeniti status / odlučiti (pravila operatora)

- `check:openapi-security-tiers` (savjetodavno) — ❌ **NIJE moguće jednostavno učiniti blokirajućim.** Završava s kodom 0, ali upozorava da nekoliko `traffic-inspector` ruta pod `LOCAL_ONLY_API_PREFIXES` nema oznaku `x-loopback-only: true`. Njegovo provođenje prvo zahtijeva dodavanje tih oznaka u `openapi.yaml`.
- `typecheck:noimplicit:core` (savjetodavno) — uglavnom ga zamjenjuje blokirajući mehanizam praga `check:type-coverage`. Pretvoriti ga u mehanizam praga ili ukloniti redundantni drugi `tsc` prolaz.
- `test:vitest:ui` (sada **blokirajući**) — postojeći kvarovi su eksplicitno isključeni u `vitest.config.ts` uz `// #8618` komentare za praćenje; novi kvarovi obaraju posao.
- `check:secrets` (gitleaks, blokirajući mehanizam praga) — trenutna gornja granica je `metrics.secretFindings` u `quality-baseline.json`. Svaki izuzetak zahtijeva opravdan unos u `.gitleaks.toml`; nedostupno mjerenje ima status NEPOTPUNO. Skeniranje dopunjuje GitHubovo ugrađeno skeniranje tajni i `check:public-creds`.
- `check:pr-evidence` (blokirajući, pretražuje prozni tekst tijela PR-a) — visok rizik lažno pozitivnih rezultata; njegovo uklanjanje slabi provođenje Strogog pravila #18, pa je ovo stvarna odluka o pravilima.
- `semgrep` (samostalni savjetodavni tok) — preklapa se s CodeQL-om za OWASP porodice; povezati njegovu početnu vrijednost s mehanizmom praga ili ga ukloniti.

---

## Povezana dokumentacija

- Lanac snabdijevanja (porijeklo, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — kontrola podudarnosti skupova ključeva

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, zadatak `i18n-ui-coverage`).
Poredi skup krajnjih ključeva svake datoteke `src/i18n/messages/<locale>.json` s datotekom `en.json` i prijavljuje
neuspjeh za svaki ključ koji nedostaje ili je suvišan, bez obzira na to kada je ključ dodan. Rezervirana mjesta
`__MISSING__:` računaju se kao prisutna (njihov sadržaj je odgovornost kontrole omjera). To je apsolutna dopuna
dviju kontrola zasnovanih na razlikama/postocima: `check-ui-keys-coverage` provodi donju granicu od 80 % po
lokalizaciji (43 ključa koja nedostaju od ~13.000 i dalje daju 99,7 %), dok `check-new-key-coverage` procjenjuje
samo ključeve koje PR dodaje u `en.json`. Paket lokalizacija generira se iz verzije datoteke `en.json` na dan
kada se napravi njegova grana i prevodi se danima dok osnovna grana nastavlja dodavati ključeve; PR paketa sam
ne dodaje nijedan ključ, pa su obje srodne kontrole ostale nijeme kada je paket 1 (#13044) spojen s 43 ključa
koja su nedostajala u devet lokalizacija, a paket 2 (#13660) s 10 ključeva koji su nedostajali u osam lokalizacija
(2026-09-15). Neuspješnu kontrolu ispravite pomoću
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; krajnji ključ označen kao `extra`
znači da ga je izvor uklonio — izbrišite ga iz lokalizacije. `--warn` izvještava bez prijavljivanja neuspjeha.
`--catalog=cli` pokreće isto poređenje nad `bin/cli/locales` (`npm run i18n:check-keys:cli`);
oba koraka nalaze se u zadatku `i18n-ui-coverage`.

#### `check-new-key-coverage` — i18n kontrola novih ključeva

Srodna kontrola za `check-ui-value-drift`. Ona otkriva vrijednost na engleskom koja je **prepisana**
dok su njeni prijevodi ostali nepromijenjeni; ova otkriva ključ na engleskom koji je **dodan**
dok ga neke lokalizacije nikada nisu dobile.

`check-ui-keys-coverage` ne može otkriti ovu kategoriju: ona provodi donju granicu postotka po lokalizaciji, a
jedanaest ključeva koji nedostaju od ~13.000 ostavlja pokrivenost na 99,9 %. Postotak po jeziku ne može
izraziti „ova funkcionalnost je objavljena neprevedena” — cijela funkcionalnost može biti uvedena u novu lokalizaciju
bez ikakvog teksta, a da se broj nikada ne promijeni.

Incident koji ova kontrola kodificira: Faza 3 platna Orchestration Canvas prevela je svojih jedanaest ključeva u
42 lokalizacije koje su postojale u tom trenutku. Nekoliko sati kasnije paket jezika EU-a (#13044) povećao je broj
lokalizacija u repozitoriju na 51, a devet novih (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) nikada
ih nije dobilo. `deepMergeFallback` zamjenjuje ključ koji nedostaje engleskim tekstom, pa je rezultat bio
neprevedeno, a ne prazno korisničko sučelje — stvaran problem koji je po samoj konstrukciji ostao neprimijećen.

Poput srodne kontrole, i ova je **svjesna razlika** te poredi engleski sadržaj na osnovi spajanja s radnim
stablom, tako da postojeći nedostaci ostaju zamrznuti i za uključivanje kontrole nije bila potrebna migracija.

**Marker `__MISSING__:<english>` ne zadovoljava ovu kontrolu (od 2026-09-17).** Ranije je služio kao
dokumentirano odgađanje — izvršno okruženje koristi ispravan engleski tekst kao rezervu — sve dok osam PR-ova
s funkcionalnostima 2026-09-16 nije dodalo 61 ključ i postavilo marker u svih 65 lokalizacija umjesto da ih
prevede: ova je kontrola prihvatila svaki od njih, ništa nije blokiralo PR-ove, a blokirajuća kontrola omjera
stvarnih prijevoda zatim je prijavila neuspjeh na vrhu izdanja za sve (pt-BR 3,2 % > 2,5 % + 0,5). Marker se sada
smatra prijevodom koji nedostaje. Neuspješnu kontrolu ispravite pomoću
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` ili
paralelno za sve lokalizacije pomoću `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
sigurno za odvojeni HEAD, odbija se pokrenuti bez varijabli okruženja `OMNIROUTE_TRANSLATION_*`). Ključ koji mora
ostati na engleskom (fiksirani naziv proizvoda/mehanizma/zastavice) pripada u `scripts/i18n/untranslatable-keys.json`,
nikada iza markera. `vi` u potpunosti zabranjuje markere (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — kontrola odloženih testova

Datoteka na popisu `exclude` u `vitest.config.ts` predstavlja test koji se ne pokreće, a svakome ko pregleda
stablo izgleda kao pokrivenost. Šezdeset dvije datoteke nakupile su se iza komentara
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Problem #8618 zatvoren je
2026-08-11 dok je popis koji je pratio narastao s 45 na 62 unosa, pri čemu je svaki novi unos naslijedio komentar
koji je upućivao na zatvoren problem. Kada je popis napokon izmjeren datoteku po datoteku (#13204), **51 od 62
testa prošao je na trenutnom stablu bez ikakve promjene izvornog koda**.

Kontrola zahtijeva da svako izuzimanje koje se razrješava u stvarnu datoteku (a) navodi problem za praćenje i
(b) bude navedeno u `config/quality/vitest-exclusions.json` sa svojim izmjerenim statusom, tako da je dodavanje
izuzimanja pregledljiva razlika u namjenskoj datoteci, umjesto još jednog reda u nizu od 60 unosa. Namjerno
ne pokreće ponovo izuzete testove — to traje ~10 minuta i pripada periodičnom zadatku; evidencija bilježi kada
je svaki od njih posljednji put izmjeren.
