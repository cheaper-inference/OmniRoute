# Quality Gates Reference (Bosanski)

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

## Inventar kontrolnih tačaka i profili izvršavanja

### Prijem kandidata

CI i Quality Gates radni tok svaki daje stabilnu presudu: `Gate / CI` i `Gate / Quality`. Njihova verzionirana politika prijema nabraja svaki prethodni posao prema potrebi ili savjetu. Primjenjivi traženi posao mora uspjeti: nedostaje, otkazan, preskočen, na čekanju i nepoznati rezultati ne mogu uspostaviti PASS. Važeća klasifikacija samo za dokumente ili samo za katalog može učiniti traku koda neprimjenjivom; običan nacrt PR nije prihvaćen kandidat. `hotfix` oznaka ne odustaje od dokaza.

Oba toka rada pokrivaju PRs u main/release grane, potiskuje u `main`, ručno otpremanje i događaje spajanja grupe. Push, dispatch i merge-group pokreću punu selekciju. Pouzdani nacrt reda Mergify također pokreće primjenjive `full-code`/`full-code-e2e` poslove; obični PRs ih preskoči. Prije ručnog spajanja, pokrenite potpunu otpremu na točno određenom kandidatu. Guranje na `release/**` ne pokreće ove tokove rada; Release-Green posmatra spojenu bazu odvojeno (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks i grupe spajanja koriste hostovane trkače za poslove koji inače biraju samo-hostovane runnere; dovoljan hostovani kapacitet se mora provjeriti prije uvođenja.

Običan PR pokreće brzu selekciju. `full-code` i `full-code-e2e` trake politike prijema (E2E, integracija, artefakt paketa, Electron smoke, Bun SQLite, klijenti ekosistema i protokola) pokreću se samo na nacrtu reda za spajanje ili na punom pokretanju: `gh workflow run ci.yml --ref <branch>`.

Svaki JSON račun identifikuje odjavljeni SHA, radni tok i pokušaj. CLI odbija checkout/event SHA neusklađenost. Testovi toka posla vezuju članstvo u politici za `needs` listu posla presude tako da nova ili uklonjena traka ne može tiho nestati. Računi pokrivaju njihov vlastiti tok rada, a ne objavljivanje, implementaciju ili unutrašnje dijelove postojećeg savjetodavnog skenera. Izvršavanje primjenjivih provjera potrebnih u pravilima podružnice je posebna administrativna promjena; definisanje njihovih poslova samo po sebi ne štiti granu.

`API Route Typecheck` je nezavisna provjera toka posla, izvan obje zbirne presude i statičkog profila lokalnog punog posmatrača. Pregledajte njegov rezultat posebno za tačnog kandidata. `.github/workflows/api-route-typecheck.yml` radi na PRs u `main` ili `release/**`, gura u bilo koju porodicu grana, ručno otpremanje i `merge_group` događaje tipa `checks_requested`. Nema filter putanje. Spajanje grupa provjeri `merge_group.head_sha`; ostale događaje pogledajte `github.sha`. Svi događaji koriste istu API dijagnostičku kapiju i testove jedinice kapije. PR base retargets zahtijevaju novu provjeru; body/title uređivanja koriste ime samo za promatranje `Admission not requested / API Route Typecheck` i ne mogu zamijeniti provjeru prijema.

### Zadržani dokazi u reduktoru prihvata

`scripts/quality/validate-release-acceptance.mjs` reducira dostavljeni plan i njegove
manifeste; ne utvrđuje da plan pokriva kompletan cjevovod izdanja.
Njegovi izvještaji izričito postavljaju `releaseAcceptance: false`, čak i kada je taj plan
`VERIFIED`. Radni tok `release-acceptance.yml` i dalje koristi pomoćne testne podatke, a ne
stvarne potvrde izgradnje, pakovanja, pokretanja ili promoviranja.

CLI zahtijeva `--evidence-root` za provjeru zadržanih dokaza. Datoteke se razrješavaju
kao `<evidence-root>/<artifact_id>/<member>` i sažimaju algoritmom SHA-256. PASS zapis
bez dokaza, nedostajuća ili izmijenjena datoteka, nesigurna putanja ili simbolička veza sprečava
provjeru. Nedostajuće datoteke nisu ekvivalentne praznim zapisnicima uspješnog izvršavanja. Postojeće
provjere SHA-a/izvršavanja/pokušaja ostaju nezavisne: podudarni bajtovi ne mogu spasiti zastarjelu
potvrdu. Integritet datoteke nije dokaz autentičnosti izvršavanja ili promoviranja artefakta.

### DAST koristi provjereni build iz CI-ja

Obavezni CI posao `dast-smoke` poziva `.github/workflows/dast-smoke.yml` nakon `build`. Prati isti izbor prema kodu i statusu nacrta kao build, uključujući podržane PR-ove iz forkova, PR-ove prema granama izdanja i grupe spajanja. DAST posao koji nedostaje, nije uspio, otkazan je ili neočekivano preskočen blokira `Gate / CI`. Ponovno upotrebljivi radni tok nema nezavisan okidač za PR/ručno pokretanje; ručna validacija koristi pokretanje CI-ja kako bi build i potrošač ostali unutar istog izvođenja.

`scripts/ci/next-build-provenance.mjs` zapečaćuje cijeli artefakt Next njegovim sažetkom tar arhive, repozitorijem/događajem/izvođenjem, pokušajem proizvođača, head/base/checkout/tree, identitetima radnih tokova, datotekom zaključavanja, tačnom verzijom/ABI-jem Node, platformom i bundlerom. DAST bira nepromjenjivi ID artefakta iz `needs.build.outputs`, zahtijeva provjeru sažetka preuzimanja i nezavisno upoređuje hash ZIP-a sa sažetkom proizvođača prije izdvajanja njegova dva dozvoljena člana putem `scripts/ci/unpack-ci-build.py`. Manifest i tar arhiva također moraju odgovarati nezavisnim izlazima proizvođača prije izdvajanja stabla Next. Nikada ne traži posljednji uspješni build grane. Djelimično ponovno izvođenje može koristiti isti pokušaj proizvođača ako se njegov ID i svi ulazi još podudaraju; potvrda bilježi oba pokušaja.

Potrošač ostaje na hostanom Linux runneru s ovlaštenjem samo za čitanje repozitorija i bez tajni repozitorija. Instalira tačnu verziju Node proizvođača, zatim sastavlja CLI uz `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` odbija nedostajući samostalni server prije bilo kakvog zamjenskog builda; uobičajeni lokalni CLI buildovi zadržavaju postojeći zamjenski postupak. Spremnost servera, Schemathesis i promptfoo moraju svi uspjeti unutar nepromijenjenog ograničenja posla od 25 minuta. Potvrda o porijeklu dokazuje identitet i bajtove ulaza, a ne uspješno DAST skeniranje. Istek artefakta, prekid runnera ili neuspješan skener ostaju nepotpuni ili neuspješni dokazi; savjetodavni omotač ne može ih pretvoriti u PASS.

### Kapacitet izvršavanja korisničkog interfejsa

CI izvršava puni inventar korisničkog interfejsa kao četiri `test-vitest` segmenta matrice, svaki s najviše
dva radnika po segmentu i postojećim rokom posla od 15 minuta. Prvi segment također izvršava
MCP/autoCombo Vitest skup. Rezultat obaveznog posla pokriva svaki dio matrice; neuspjeh
ili otkazivanje jednog segmenta ne može uspostaviti prihvat kandidata.

Noćni posmatrač zadržava zasebnu potvrdu tačnog kandidata za svaki segment korisničkog interfejsa,
uključujući izvršavanje MCP-a u prvoj potvrdi. Obavezne su sve četiri potvrde, zapisnici i podudarni
identiteti izvršavanja. Lokalni `npm run test:vitest:ui` i dalje odabire
kompletan skup; jedno izvršavanje s `--shard` predstavlja samo djelimičan dokaz.

### Prikupljanje pokrivenosti jediničnih testova

Dvanaest jediničnih segmenata prikuplja V8 pokrivenost tokom postojećeg izvršavanja testova. Uspješan
segment izvršava `scripts/ci/compact-v8-coverage.mjs` kako bi komprimirao izvorne datoteke bez generiranja
posrednog Istanbul izvještaja. Završni posao Coverage provjerava svih dvanaest manifesta u odnosu na
SHA kandidata, okruženje izvršavanja, korijen izvornog koda i sažetke podataka, a zatim pokreće c8 izvještavače i postojeće
pragove pokrivenosti. Ulazi zadržavaju c8-ov globalni redoslijed naziva datoteka; prethodno spajanje po segmentima nije sigurno
za mješovitu pokrivenost funkcija/blokova. Nedostajući, neispravni ili nekompatibilni segmenti uzrokuju neuspjeh prihvata.
Neuspješni testni segmenti zasebno zadržavaju sirovu dijagnostičku pokrivenost; ona ne može ući u završno spajanje.

### Potvrde o napretku izvršavanja jediničnih testova

Zajednička naredba `test:unit:ci:shard` bilježi faze `primary`, `dashboard` i `serial`
putem `scripts/ci/unit-progress-reporter.mjs`. Uobičajeni izvještaj o testiranju ostaje
dostupan. Zasebna potvrda koja sadrži samo metapodatke bilježi početak i završetak svake datoteke,
dok 30-sekundni signal aktivnosti navodi datoteke koje su još uvijek aktivne i njihovo proteklo vrijeme. Bilježe se
samo metapodaci o izvršavanju s liste dozvoljenih stavki; opisi testova, izlazni podaci, sadržaji grešaka i cjelokupno
okruženje ne serijaliziraju se.

CI čuva JSONL datoteke pod nazivom `unit-progress-ci-<run>-<attempt>-<shard>`. Istek vremena zadatka može spriječiti kasnije otpremanje;
već emitirani signali aktivnosti ostaju dijagnostički dokaz. Nedostatak signala aktivnosti također može ukazivati
na blokiran ili prekinut proces izvršavača. Ove potvrde zadržavaju postojeći odabir testova,
konkurentnost, rokove i izlazni status; one nisu odluke o prihvatanju kandidata.

### Red za spajanje

Oznaka `queue` šalje PR u Mergify red (`.mergify.yml`). Mergify otvara nacrt PR-a na
grani `mergify/merge-queue/`, CI tamo izvršava puni izbor, a izvorni PR se spaja
kada `Gate / CI`, `Gate / Quality` i `Merge integrity (changelog + generated skills)` prođu.

Mergify upisuje sažetak reda u opis nacrta, a i druge aplikacije ga mogu uređivati.
Događaj `pull_request` `edited` na takvom nacrtu dobija vlastitu grupu konkurentnosti
(`-queue-edit-<run_id>`) tako da ne može otkazati stvarno izvršavanje nacrta, te preskače kontrolnu tačku i
matricu. Samo se `Merge integrity` i dalje izvršava. Preskočeni posao kontrolne tačke ima drugačiji naziv provjere
jer Mergify preskočeni `Gate / CI` tumači kao neuspjelu provjeru i uklanja PR iz reda.

Nakon uklanjanja iz reda, slanje promjena ne vraća uvijek PR u red. Dodajte komentar `@mergifyio queue` na njega.

### Inventar statičkog skeniranja

Verzionirani inventar npm pseudonima i članstvo u statičkom skeniranju nalaze se u
`config/quality/gate-manifest.json`. Pokrenite `npm run check:gate-manifest` kako biste provjerili
nazive skripti i tačne naredbe u odnosu na `package.json`; dodavanja, uklanjanja i
odstupanje naredbi uzrokuju neuspjeh i lokalne kuke i poslova klasifikacije promjena u CI-u.
Pseudonim nije posao radnog toka, instanca matrice ili testni slučaj: ti se brojevi
ne smiju predstavljati kao međusobno zamjenjivi.

Koristite `npm run quality:scan -- --list` ili `npm run quality:scan:fast -- --list`
kako biste pregledali odabrane pseudonime bez njihovog izvršavanja. Izvršilac poziva
npm ulaznu tačku, pa se njeno okruženje izvršavanja (uključujući Bun gdje je konfiguriran) zadržava.
Manifest bilježi pseudonime izvan tih profila kao zasebno pozvane, a
naredbe održavanja zabranjene su u profilima skeniranja samo za čitanje.

Ovi profili pokrivaju samo statičko skeniranje. Ne certificiraju testove proizvoda,
pokrivenost, pakovanje, vanjske provjere ili puni prihvat kandidata za izdanje.
Prihvat radnog toka koristi povezani `config/quality/admission-policy.json` i
`scripts/quality/admission-verdict.mjs`. Profili posmatrača izdanja ostaju odvojeni;
nezavisno pregledajte njihove primjenjive provjere i potvrde. Statičke
naredbe punog posmatrača deklarirane su u `config/quality/release-green-static-profile.json`, uključujući
`audit:deps`, odabir testova mutacije i provjere prijevoda. Učitavač provjerava npm
naredbe u odnosu na package.json i modelirane CI/Quality deklaracije; odbija odstupanje
umjesto izvršavanja tokena ljuske kao argumenata. Obavezni izlaz skenera SKIP/INCOMPLETE
ne može uspostaviti PASS. Profil bilježi svoja vanjska izuzimanja i ne zamjenjuje
hostovanu pokrivenost, testne matrice, pakete ili dokaze implementacije. Tekstualni inventar ispod
služi kao referenca, a ne kao dokaz da je kontrola zaista izvršena.

Skripte se nalaze pod `scripts/check/` (kontrole politike) i `scripts/quality/` (mehanizam postepenog pooštravanja).
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

### Otpustite PR fast-path (`quality.yml`)

`.github/workflows/quality.yml` dopunjuje CI na main/release PRs, gura u `main`, šalje i spaja grupe. PRs koristi brze provjere filtrirane putem. Trajno onemogućena duplirana verzija je uklonjena; prave build/package/boot provjere ostaju u CI. Jedinica i vitest rade samo u CI (`Unit Tests (N/8)` i `Vitest`).

| Posao                                            | Obim                                                                                                                                                                                                         | Blokiranje               |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs i docs-all                                                                                                                                                                      | Da                       |
| `Fast Quality Gates`                             | Code PRs; statičke provjere, tipska provjera, provjera tipa kontrolne ploče, testiranja jedinica pod utjecajem                                                                                               | Da                       |
| `Forgotten sibling tests`                        | Code PRs; promijenjeni moduli praćeni statičkim potrošačima i kandidatskim testovima; staze barela i dinamičkog uvoza se prijavljuju kao savjetodavna dijagnostika, sa izuzecima liste dozvoljenih referenci | **Savjetodavno**         |
| `No new ESLint warnings`                         | Code PRs; štitnik od dlačica koji je svestan supresije                                                                                                                                                       | Da, uključujući viljuške |
| `Merge integrity (changelog + generated skills)` | Non-draft PRs; dnevnik promjena i generirana sinhronizacija vještina                                                                                                                                         | Da, uključujući viljuške |

#### Zaboravljeni izvještaj o testovima

`npm run check:forgotten-sibling-tests` radi kao savjetodavni korak za `Fast Quality Gates` i ponovo koristi razrješavač uvoza iza mape probnog utjecaja. Za svaki promijenjeni proizvodni modul, on izvještava o determinističkim `changed module/symbol -> static consumer -> candidate sibling test` lancima kada je test kandidata odsutan iz razlike zahtjeva za povlačenjem. Sažetak Markdowna i JSON rezultat se zadržavaju kao artefakt `forgotten-sibling-tests` toka posla za kalibraciju prije bilo kakvog uvođenja blokiranja.

Ponovni izvoz barela i dinamički uvoz samo su dijagnostika rezolucije; oni nikada ne stvaraju blokirajući nalaz. Recenzirani izuzeci uživo u `config/quality/forgotten-sibling-allowlist.json`. Svaki unos mora imenovati test potrošača i kandidata, dati specifično obrazloženje i povezati GitHub problem ili zahtjev za povlačenjem. Pogrešno oblikovani unosi nisu uspjeli zatvoriti. Izuzeci ne mogu potisnuti obrisani test kandidata ili diff koji dodaje `.skip`/`.todo`; slabljenje tvrdnji i drugo maskiranje ostaju u vlasništvu `check:test-masking` kapije koja nezavisno blokira.

### Zadatak: `lint`

Pokreće se na svakom PR-u prema `main`. Blokira spajanje u slučaju neuspjeha.

| Skripta (`npm run ...`)           | Provjerava                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Blokirajuće                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `check:node-runtime`              | Verzija Node.js-a je unutar podržanog raspona                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:cycles`                    | Ciklične uvoze u cijelom `src/` + `open-sse/` (zasnovano na AST-u, razriješene tsconfig `paths`). Samostalno pokretanje završava kodom 1 kad god postoji bilo koji ciklus (zatvoreno u slučaju greške od #15281) i navodi SCC-ove. `check:cycles:ratchet` (ono što CI pokreće) blokira kada broj premaši gornju granicu `metrics.cycles` u `quality-baseline.json` — trenutno 14, `direction: down`, tako da se može samo smanjivati (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da (postepeno ograničenje)                   |
| `check:boundary`                  | Spregu `open-sse → src`: jedinstvene uvoze između datoteka iz pogonskog sistema u aplikaciju (`scripts/quality/measure-boundary.mjs`; lista veza predstavlja zaostatak korektivnih zadataka za razdvajanje jezgre/modula v4). Samostalno pokretanje = savjetodavni izvještaj (isto kao `quality:boundary`). `check:boundary:ratchet` (ono što CI pokreće, također u petlji postepenog ograničavanja brzih provjera u `quality.yml`) blokira kada broj premaši gornju granicu `metrics.boundaryOpenSseToSrc` u `quality-baseline.json` — početno postavljenu na izmjerenih 771, `direction: down`; `--update` je može samo smanjiti; relativno u odnosu na osnovu u PR-ovima (`--base-ref`, pogledajte ispod)                                                                                                                                                                                                                                                                                                                                     | Da (postepeno ograničenje)                   |
| `check:route-validation:t06`      | Prisustvo Zod shema na svim rutama (politika nivoa 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                           |
| `check:any-budget:t11`            | Broj `@ts-expect-error // any` ne premašuje budžet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                           |
| `check:provider-consistency`      | Svaki pružalac u `providers.ts` ima odgovarajući unos u `providerRegistry.ts` (i obrnuto, unutar liste dozvoljenih)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                           |
| `check:model-lifecycle`           | Tri ručno održavane tabele usmjeravanja ostaju usklađene s pohranjenim snimkom životnog ciklusa (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ne ocjenjuje nijedan povučeni ID koji `REGISTRY` može usmjeriti; svaki cilj iz `BUILT_IN_ALIASES` prisutan je u `REGISTRY` i nije prisutan u snimku povučenih ID-ova; svaki povučeni ID koji je još uvijek u `REGISTRY` prosljeđuje se ili je naveden u `allowedRetiredInCatalog`; i nijedan izvor ili cilj iz `DEFAULT_DEGRADATION_MAP` nije označen kao povučen u tom snimku. Ovo ne dokazuje da model trenutno opslužuje aktivni vanjski izvor. Van mreže — poredi s `config/quality/model-lifecycle.json`, koji se ručno osvježava pomoću `npm run quality:refresh-model-lifecycle` (zahtijeva mrežu; nije uključen u CI). `allowedRetiredInCatalog` je mehanizam postepenog smanjivanja: unos dodajte samo uz problem za praćenje.                                                                                                                                                             | Da                                           |
| `check:fetch-targets`             | Svaki `fetch("/api/...")` u klijentskom dijelu direktorija `src/` razrješava se na stvarni `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                           |
| `check:deps`                      | Sve zavisnosti koje se mogu instalirati pomoću `npm install` iz svakog `package.json` u repozitoriju nalaze se u `dependency-allowlist.json`; novi paketi bez fiksirane verzije ili paketi s nazivima koji oponašaju druge pakete označavaju se                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `audit:deps`                      | npm provjera svih pet nezavisnih lock datoteka (korijenska, Electron, OpenCode dodaci v1/v2 i pružalac). Kritična upozorenja blokiraju; upozorenja visoke ozbiljnosti ostaju vidljiva. Nedostajuće/neuspjele provjere označavaju se kao NEPOTPUNE i blokiraju; hash vrijednosti lock datoteka i izvještaji zadržavaju se za svaki opseg.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                           |
| `check:lockfile`                  | Integritet datoteke `package-lock.json` — https registar, kontrolni sažeci integriteta, bez zamjene hostova                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                           |
| `check:licenses`                  | Lista dozvoljenih SPDX licenci za produkcijske zavisnosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                           |
| `check:tracked-artifacts`         | Bez artefakata izgradnje / evidentiranih `node_modules` simboličkih veza (također se pokreće u husky pre-commit provjeri; pre-push je namjerno lagan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:ai-attribution`            | Bez AI/bot `Co-Authored-By` završnog retka ili podnožja o AI generiranju u commitovima, naslovu ili tijelu PR-a — strogo pravilo #16 (u `quality.yml` petlji brzih provjera za PR→`release/**` — čita sadržaj događaja, ne radi ništa izvan PR-ova — i korak samo za PR u `ci.yml` lint provjeri za PR→`main`; također husky `commit-msg` hook; ljudski koautori su dozvoljeni; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:vitest-exclusions`         | Svako Vitest izuzimanje navodi povezani problem za praćenje i pojavljuje se u `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                           |
| `check:file-size`                 | Izvorne datoteke (`.ts`/`.tsx` u `src/`, `open-sse/`, `electron/`, `bin/`) ostaju unutar ograničenja `cap`, a testne datoteke (`*.test.ts(x)`) unutar `testCap`; datoteke zamrznute u `file-size-baseline.json` (`frozen` / `testFrozen`) ne smiju premašiti svoju evidentiranu veličinu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                           |
| `check:error-helper`              | Odgovori o greškama u izvršiteljima/obrađivačima koriste `buildErrorBody()` / `sanitizeErrorMessage()` (strogo pravilo #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                           |
| `check:migration-numbering`       | Migracijske SQL datoteke numerisane su redoslijedom, bez praznina ili duplikata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `check:public-creds`              | Nema doslovnih OAuth `client_id`/`client_secret` ili Firebase Web ključeva izvan `publicCreds.ts` (strogo pravilo #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Da                                           |
| `check:db-rules`                  | Nema sirovog SQL-a izvan modula `src/lib/db/`; nema zbirnih uvoza iz `localDb.ts` (stroga pravila #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                           |
| `check:known-symbols`             | Izvršitelji pružalaca usluga, strategije usmjeravanja i prevodioci registrirani u svojim tabelama za otpremu odgovaraju datotekama na disku — nema nepovezanih ili nedeklariranih simbola                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                           |
| `check:route-guard-membership`    | Svaka ruta koja pokreće podređeni proces klasificirana je pomoću `isLocalOnlyPath()` (stroga pravila #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:test-discovery`            | Svaka `*.test.ts` / `*.spec.ts` datoteka u repozitoriju obuhvaćena je barem jednim pokretačem testova (ratchet: lista nepovezanih datoteka u `test-discovery-baseline.json` može se samo smanjivati)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                           |
| `check:test-tla-order`            | Nijedna `node:test` datoteka unutar `tests/unit` ne registruje test, zatim izvršava `await` na najvišem nivou, pa registruje dodatne testove (#18045; ratchet: `test-tla-order-allowlist.json` može se samo smanjivati)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `check:agent-skills-sync`         | Generisani artefakti agentskih vještina odgovaraju svom izvornom katalogu (bez odstupanja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:provider-asset-provenance` | Logotipi/resursi pružatelja usluga imaju evidentiran zapis o porijeklu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `lint:json`                       | JSON konfiguracijske datoteke mogu se raščlaniti i zadovoljavaju pravila lintanja repozitorija                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `typecheck:core`                  | Kompilacija TypeScripta bez grešaka (samo savjetodavna upozorenja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                           |
| `typecheck:noimplicit:core`       | Strogi `noImplicitAny` — usmjeren na budućnost; mnoga postojeća mjesta poziva još uvijek trebaju anotacije                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | **Savjetodavno** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ograničen na `src/app/(dashboard)/**` (#7033) — pažljivo odabrana lista od 27 datoteka za `typecheck:core` ne uključuje nijedan dashboard TSX, a ni `next build` ga nikada ne provjerava u pogledu tipova (`next.config.mjs` postavlja `ignoreBuildErrors: true`), pa su regresije nepovezanih identifikatora tamo (#6625/#6909) bile nevidljive CI-u. Razlike se porede sa zamrznutom osnovnom vrijednošću broja grešaka po datoteci i TS kodu (`config/quality/dashboard-typecheck-baseline.json`, isti obrazac provođenja zastarjelosti kao kod `check:known-symbols`) — samo NOVE greške iznad broja u osnovnoj vrijednosti obaraju provjeru; smanjite osnovnu vrijednost pomoću `--update` kada se ispravi postojeća greška.                                                                                                                                                                                                                                                                                                          | Da                                           |
| `check:build-typecheck`           | Provjera tipova produkcije za cijelu aplikaciju nad `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), koju ne pokrivaju površina od 27 datoteka za `typecheck:core` niti provjera dashboarda. Upoređuje razlike u odnosu na `config/quality/build-typecheck-baseline.json`; nova ili povećana vrijednost po paru (datoteka, kod) obara provjeru, a manja vrijednost traži od vas da smanjite osnovnu vrijednost. `--update` odbija rad dok pokretanje sadrži novi ili povećani par, osim ako se proslijedi `--force-regressions`, i odbija novoutišanu datoteku osim ako se proslijedi `--force-nocheck`, tako da su proširivanje osnovne vrijednosti radi uspješnog prolaza i dodjela trajnog utišavanja dva odvojena promišljena postupka. Samostalni `--force` se odbija. Također skenira opseg izgradnje u potrazi za `@ts-nocheck` prema `config/quality/ts-nocheck-baseline.json`, jer datoteka koja ga koristi uopće ne prijavljuje dijagnostiku i inače bi bila nevidljiva svakoj provjeri. | Da                                           |

#### Dva programa za provjeru tipova daju različite odgovore

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) i `check:build-typecheck` kompajliraju različite programe pod različitim
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

| Skripta                      | Provjerava                                                                                                                                                                     | Blokira                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| `quality:collect`            | Generiše `quality-metrics.json` (broj ESLint upozorenja, pokrivenost iz objedinjenog izvještaja segmenata)                                                                     | Da (prethodi postepenom pooštravanju) |
| `quality:ratchet`            | Nijedna metrika u `quality-baseline.json` nije nazadovala (ESLint upozorenja ≤ osnovna vrijednost; pokrivenost ≥ osnovna vrijednost)                                           | Da                                    |
| `check:duplication`          | Dupliciranje koda (jscpd@4) ne prelazi osnovnu vrijednost u `quality-baseline.json`                                                                                            | Da                                    |
| `check:complexity`           | Ciklomatska složenost na nivou datoteke ne prelazi ograničenje (osnovni ESLint `complexity` + `max-lines-per-function`)                                                        | Da                                    |
| `check:cognitive-complexity` | Postepeno pooštravanje kognitivne složenosti (`eslint-plugin-sonarjs`) — zasebno izvršavanje ESLint-a; CI izvršava oba objedinjena u jednom koraku `check:complexity-ratchets` | Da                                    |
| `check:dead-code`            | Postepeno pooštravanje za nekorištene izvoze/datoteke (knip) ne nazaduje u odnosu na osnovnu vrijednost                                                                        | Da                                    |
| `check:compression-budget`   | Ograničenje benchmarka kompresije — minimalne uštede tokena po mehanizmu ne smiju nazadovati                                                                                   | Da                                    |
| `check:type-coverage`        | Postepeno pooštravanje procenta tipiziranog koda (`type-coverage`) ne nazaduje; uglavnom obuhvata `typecheck:noimplicit:core`                                                  | Da                                    |

### Poslovi: `codeql-scan` i `codeql-admission`

`codeql-scan` proizvodi sve konfigurirane kategorije analize. Nakon što taj posao uspije, `codeql-admission` provjerava njegove tačno određene učitane rezultate i ratchet upozorenja kandidata. Oba su obavezne zavisnosti za `Gate / CI`, uključujući kandidate koji mijenjaju samo dokumentaciju. Zahtjevi za administrativnu aktivaciju i canary opisani su niže pod „CodeQL ratchet”.

| Skripta                | Provjerava                                                                                                                                                                                              | Blokira |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:codeql-ratchet` | Ref/SHA kandidata i sve konfigurirane kategorije analize moraju biti aktualni prije ratcheta upozorenja; nedostatak dokaza blokira. Globalni inventar ostaje odvojen — pogledajte „CodeQL ratchet” niže | Da      |

### Posao: `quality-extended`

Zadatak blokira primjenjive kandidate. Veličina paketa, pronalasci tajni, pronalasci
ranjivosti, pronalasci u radnim tokovima i OpenAPI promjene provjeravaju se uz obavezno
postepeno pooštravanje. Dijagnostika kružnih zavisnosti ostaje savjetodavna. Instalacija skenera je obavezna:
`scripts/ci/install-quality-scanners.sh` osigurava fiksirane verzije i propagira
neuspjehe instalacije. Alati koji nedostaju, nevažeći izvještaji ili osnovne vrijednosti koje nedostaju ostavljaju
obaveznu provjeru skenera NEPOTPUNOM.

| Skripta                  | Provjerava                                                                                                                                                                                                                                                 | Blokiranje                                              |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `check:circular-deps`    | Nema kružnih zavisnosti (dpdm)                                                                                                                                                                                                                             | **Savjetodavno**                                        |
| `check:bundle-size`      | Veličina paketa ne prelazi ograničenje; nedostupno mjerenje uzrokuje neuspjeh                                                                                                                                                                              | **Blokirajuće uz --ratchet**                            |
| `check:secrets`          | Gitleaks nalazi se ne pogoršavaju; obavezna skeniranja odbijaju nedostajuće alate/izvor/osnovnu vrijednost, neuspjela skeniranja i nevažeće izvještaje                                                                                                     | **Blokirajuće uz --ratchet**                            |
| `check:vuln-ratchet`     | Ranjivosti zavisnosti se ne pogoršavaju; obavezna skeniranja odbijaju nedostajuće alate, nevažeće izvještaje ili nedostajuće osnovne vrijednosti                                                                                                           | **Blokirajuće uz --ratchet**                            |
| `check:workflows`        | Provjera radnih tokova (actionlint + zizmor); nedostajući/neispravni skeneri, nevažeći izvještaji ili nedostajuća ratchet osnovna vrijednost uzrokuju neuspjeh sa statusom INCOMPLETE. Važeći nalazi slijede odabranu strogu/savjetodavnu/ratchet politiku | Izvršavanje je obavezno; zizmor ratchet blokira u CI-ju |
| `check:openapi-breaking` | Ugovor javnog API-ja u odnosu na prikvačene commitove događaja (PR merge-base, push before, merge-group base; za zakazano/ručno izvršavanje prvi nadređeni commit nakon checkouta); obavezno mjerenje završava neuspjehom ako se ne može izvršiti          | **Blokirajuće uz --ratchet**                            |

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
| ↳ `check:fabricated-docs`      | Rute, varijable okruženja, CLI naredbe, nazivi hookova i putanje datoteka navedeni u dokumentaciji postoje u bazi koda. Stroga kontrola uz `--strict`; bez te zastavice neuspjeh nije blokirajući.                                                                                                                                                                                                                                                                                                         | Da (putem `--strict` u CI-ju)                                                                                                        |
| `check:cli-i18n`               | Korišteni CLI `t()` ključevi postoje u `en`; `pt-BR` zadržava svaki odjeljak najvišeg nivoa; `zh-CN` i `zh-TW` sadrže svaki ključ iz `en`                                                                                                                                                                                                                                                                                                                                                                  | Da                                                                                                                                   |
| `check:openapi-coverage`       | OpenAPI specifikacija pokriva najmanje ratchetom utvrđenu donju granicu stvarnih ruta                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                                                                                                                   |
| `check:openapi-security-tiers` | Deklarisane anotacije `x-loopback-only`/`x-always-protected` moraju imati pokriće u `routeGuard.ts`; greške parsera i nepodudarnosti u provjeri unaprijed blokiraju. Obrnuta provjera nedostajućih `x-loopback-only` ispod prefiksa samo za lokalni pristup upozorava, a rute definisane samo obrascem isključene su iz te obrnute provjere.                                                                                                                                                               | Parser/provjere unaprijed blokiraju; obrnuta provjera je savjetodavna                                                                |
| `check:openapi-routes`         | Svaka putanja `/api...` u `openapi.yaml` odgovara stvarnoj ruti bez obzira na nazive parametara nakon primjene obrazložene liste izuzetaka `KNOWN_STALE_SPEC`; zastarjeli unosi na listi također uzrokuju neuspjeh                                                                                                                                                                                                                                                                                         | Da                                                                                                                                   |
| `check:docs-symbols`           | Interne URL reference `/api/...` u kanonskim dokumentima koji nisu prijevodne kopije odgovaraju stvarnoj ruti ili porodici ruta; proxy/upstream/placeholder/datotečne reference i obrazloženi unosi `KNOWN_STALE_DOC_REFS` su isključeni, a zastarjeli unosi liste uzrokuju neuspjeh                                                                                                                                                                                                                       | Da                                                                                                                                   |
| `i18n translation drift`       | Provjerava hash vrijednosti izvora/cilja osnovnih dokumenata i porijeklo prijevoda. Poređenje u PR-u dopušta samo identične naslijeđene greške; nove ili neprovjerene nedosljednosti izvora, nedostajućeg cilja, ciljnog hasha, zastarjelog prijevoda ili keša odjeljaka blokiraju. Izvan poređenja u PR-u greške izvora/nedostajućeg cilja/ciljnog hasha blokiraju, dok zastarjeli prijevodi i nedosljedni keševi odjeljaka ostaju samo upozorenja. Odsustvo keša odjeljaka u starom formatu nije greška. | Novo/neprovjereno PR odstupanje blokira; identično naslijeđeno odstupanje je savjetodavno; pravila izvan PR-a zavise od vrste greške |

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

| Skripta                             | Provjerava                                                                                                                                                                                                              | Blokira         |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (ugrađeno) | Pokrivenost i18n ključeva korisničkog interfejsa iznosi ≥ 65%                                                                                                                                                           | Da              |
| `check-ui-value-drift` (ugrađeno)   | Izmijenjena engleska **vrijednost** ne ostavlja zastarjeli prijevod                                                                                                                                                     | Da              |
| `check-new-key-coverage` (ugrađeno) | **Novi** engleski ključ preveden je u svakom lokalitetu — oznaka `__MISSING__:` se odbija                                                                                                                               | Da              |
| `check-translation-ratio`           | Omjer stvarnih prijevoda po lokalitetu (listovi identični engleskom / rezervirana mjesta / nedostajući listovi izvan liste dopuštenih) ne smije premašiti `config/quality/i18n-translation-baseline.json` + toleranciju | **Blokirajuće** |

Zahtijeva `fetch-depth: 0` — provjera odstupanja vrijednosti poredi `en.json` s bazom spajanja.

#### `check-ui-value-drift` — kontrola zastarjelih prijevoda

Otkriva onu i18n regresiju koju druge provjere strukturno ne mogu uočiti: engleska vrijednost
se izmijeni, a prijevodi izvedeni iz _prethodnog_ engleskog teksta ostanu, pa
korisnici koji ne govore engleski nastavljaju čitati samouvjereno formuliran, ali sada netačan tekst.

Ovo se zaista dogodilo u produkciji. `oauthModal.googleOAuthWarning` je izmijenjen kada je uveden pomoćnik
za prijavu Antigravity (#5203); **39 od 43 lokaliteta** zadržalo je tekst koji je operaterima govorio da „kopiraju
cijeli URL i zalijepe ga ispod“ — tok koji se za tog pružaoca ne može dovršiti. To je
ostalo neprimijećeno sve do #8463 jer:

- `sync-ui-keys` samo dopunjava ključeve koji **nedostaju**, nikada one koji su **zastarjeli**;
- `check-ui-keys-coverage` računa _prisutnost_ ključa, pa se zastarjeli prijevod smatra pokrivenim;
- `check-translation-drift` prati dokumentacijske kopije `docs/i18n/<locale>/**.md` —
  nikada ne čita `src/i18n/messages/*.json`. Blokira u zadatku `docs-sync-strict` od
  ponovne sinhronizacije 2026-09: uredite osnovni dokument → `npm run i18n:run -- --files=<doc>` (na nivou odjeljka, jeftino).

**Svjesno razlike, bez oslanjanja na osnovnu vrijednost.** Poredi `en.json` na bazi spajanja s
radnim stablom; za svaki ključ čija se engleska vrijednost promijenila, svaki lokalitet koji još sadrži
netaknuti prijevod smatra se zastarjelim. Time se namjerno **zamrzava prethodno postojeći dug** — razlika
ne može otkriti iz kojeg je starog engleskog teksta izveden dugotrajni prijevod, pa provjera ocjenjuje
samo ono što trenutna izmjena dotiče. Alternativa (osnovna vrijednost hashiranja po ključu) zahtijevala bi
generiranu datoteku od ~600 KB, 3× veću od najveće postojeće osnovne vrijednosti, koja bi se mijenjala pri svakom i18n PR-u.

Postoje dva načina da se provjera zadovolji:

1. ažurirajte zahvaćene prijevode ili
2. postavite ih na `__MISSING__:<new english>` — izvršno okruženje tada prikazuje ispravljeni engleski tekst
   (`src/i18n/request.ts::deepMergeFallback`, #7258), a ključ se stavlja u red za prevođenje.

Ako se promijenilo **značenje** teksta, radije **preimenujte ključ**: novi ključ ne može naslijediti
zastarjeli prijevod. To je obrazac koji je korišten u #8463.

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

Potpuna matrica i18n provjere (jedan posao po lokalizaciji). Cijeli posao je savjetodavan.

| Skripta                         | Provjerava                          | Blokiranje                                                   |
| ------------------------------- | ----------------------------------- | ------------------------------------------------------------ |
| `validate_translation.py quick` | Potpunost prijevoda po lokalizaciji | **Savjetodavno** (`continue-on-error: true` za cijeli posao) |

### Posao: `pr-test-policy`

Pokreće se samo za zahtjeve za spajanje.

| Skripta                | Provjerava                                                                                                                                       | Blokiranje |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `check:pr-test-policy` | PR-ovi koji mijenjaju produkcijski kôd u `src/`, `open-sse/`, `electron/` ili `bin/` moraju uključiti ili ažurirati testove (Strogo pravilo #8)  | Da         |
| `check:test-masking`   | Izmijenjene testne datoteke ne smanjuju neto broj provjera niti dodaju tautologije `assert.ok(true)`                                             | Da         |
| `check:pr-evidence`    | Tijelo PR-a navodi dokaze testiranja/VPS-a za izmjenu (automatizira Strogo pravilo #18 pretraživanjem teksta PR-a — krhko, pogledajte Zaostatke) | Da         |

### Zadatak: `test-vitest`

Zahtijeva posao klasifikacije `changes`. Neuspjeh primjenjivih dijelova matrice blokira spajanje.

| Paket            | Provjerava                                               | Blokirajuće                                                                                                                 |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 alata), autoCombo, keš — vitest pokretač | Da                                                                                                                          |
| `test:vitest:ui` | Testovi UI komponenti — vitest pokretač                  | **Blokirajuće** — postojeći neuspjesi su izričito isključeni u `vitest.config.ts`; novi neuspjesi uzrokuju neuspjeh zadatka |

### Noćni tokovi rada (zakazani, savjetodavni)

Pokreću se prema cron rasporedu (i putem `workflow_dispatch`), nikada na PR-ovima. Svi su savjetodavni.

| Tok rada               | Validira                                                                                                                                                                   | Blokirajući      |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | fast-check testove svojstava s nasumičnim početnim brojem + velikim brojem izvršavanja                                                                                     | **Savjetodavno** |
| `nightly-resilience`   | provjeru rasta heap memorije, haotično ubrizgavanje grešaka, k6 testiranje opterećenja/izdržljivosti                                                                       | **Savjetodavno** |
| `nightly-llm-security` | promptfoo zaštitu od ubacivanja (režim blokiranja) + garak provjere (preskaču se bez tajne pružaoca usluge)                                                                | **Savjetodavno** |
| `nightly-schemathesis` | nasumično testiranje OpenAPI ugovora (schemathesis) na aktivnom OmniRouteu pomoću `docs/openapi.yaml` — otkriva kršenja specifikacije / neobrađene greške 500 (Faza 8 B.4) | **Savjetodavno** |
| `nightly-mutation`     | rezultat Stryker mutacijskog testiranja nad brzom jedinicom testiranja — preživjeli mutanti otkrivaju slabe provjere                                                       | **Savjetodavno** |
| `nightly-compat`       | matricu kompatibilnosti Node mehanizma u podržanim rasponima `engines.node`                                                                                                | **Savjetodavno** |

Osnovne vrijednosti performansi (heap memorija, TTFB, vrijeme izgradnje) bilježe se, ali ne služe kao uslov: pogledajte [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

### CodeQL ratchet: prihvat kandidata i inventar repozitorija

CI upravlja CodeQL prihvatom kandidata kroz izričit lanac zavisnosti: `codeql-scan` poziva matricu četiriju jezika u `codeql.yml`, zatim `codeql-admission` pokreće `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` zahtijeva oba rezultata. Quality zadržava vlastite numeričke provjere, ali ne ispituje skener prije nego što proizvođač završi; sam `Gate / Quality` nije potpuni prihvat kandidata. CodeQL ostaje obavezan za kandidate koji mijenjaju samo dokumentaciju.

Pravila u `config/quality/codeql-admission-policy.json` biraju Actions, C/C++, JavaScript/TypeScript i Python, skup upita default, model prijetnji remote i način builda none. Predprovjera proizvođača odbija zapis aktivacije na čekanju i grane izvan izričite liste ciljeva. Početni ciljevi su main i release/v3.8.53; sljedeće izdanje treba pregledano uključivanje. Postojeći širi CI okidač za PR-ove prema granama izdanja ostaje, ali neuključen cilj prijavljuje HOLD prije ekstrakcije umjesto da dobije nemjereni PASS.

Svaki posao matrice bilježi stvarni ID učitavanja SARIF, jezik, kategoriju, izvođenje i pokušaj, identitet pozivajućeg radnog toka, ref/head/base/merge SHA događaja i hash pravila. Zavisni posao preuzima samo potvrde tog izvođenja i provjerava sažetke artefakata. Zahtijeva sve četiri kategorije, uspješnog proizvođača i dovršenu obradu svakog tačno određenog učitavanja. Koristi API filter sarif_id, a ne najnoviju analizu pronađenu na grani. Djelimična ponovna izvođenja mogu ponovno koristiti uspješne kategorije iz ranijeg pokušaja istog izvođenja i kandidata, uz očuvanje pokušaja koji ih je proizveo; trenutni neuspješni proizvođač ne može ponovno koristiti prethodne zelene dokaze.

Akcija CodeQL čeka obradu, ali njezina fiksirana implementacija može upozoriti i nastaviti nakon neuspješnog čitanja statusa ili isteka čekanja. Prihvat zato ponovno provjerava obradu. Kategorije koje nedostaju, obrada na čekanju, neuspješni ili otkazani poslovi, zastarjeli identitet, nepotpuna paginacija ili nedostupni API-ji proizvode HOLD i izlazni kod 2. Više nema fiksnog čekanja na nezavisni radni tok skenera. Neskenirani PR ne može proći zato što je upit upozorenja vratio 0. Izmjereni broj iznad `metrics.codeqlAlerts.value` daje izlazni kod 1; baseline se ne podiže kako bi prihvatio upozorenja druge grane. [Status učitavanja i dohvat analize](https://docs.github.com/en/rest/code-scanning/code-scanning).

Potvrda bilježi ID-jeve učitavanja i analiza, kategorije, verzije alata, ref/SHA, baseline i brojeve upozorenja. Identitet/broj rezultata SARIF, minimalni brojevi pravila i tačne instance upozorenja ostaju obavezni. Identiteti PR-a/analize ponovno se provjeravaju prije prihvata. Te provjere utvrđuju pokrivenost konfiguriranih kategorija, a ne inventar svake izdvojene izvorne datoteke. Ekstrakcija C/C++ bez builda ne uključuje kod generiran tokom builda projekta. Isključenja izvora i dalje treba pregledati, a pripisivanje odgovornosti doprinositelju zahtijeva uporedive dokaze s tačno određene osnovne revizije.

`codeql-maintenance.yml` osigurava skeniranja pri slanju u aktivnu granu izdanja i sedmični raspored bez dupliciranja proizvođača za PR/main. `nightly-codeql-inventory.yml` drži baseline cijelog repozitorija odvojenim, uz `--strict-measurement` i neuspjeh kada mjerenje nije dostupno. Tolerantno preskakanje starog lokalnog sakupljača nije prihvat kandidata. Postroživanje ostaje izričit `--update` nakon provjerenog nižeg globalnog broja.

Radni tok Advanced ne smije se objaviti dok je konfiguriran Default Setup: GitHub odbija tu kombinaciju. Njegova verzionirana pravila ostaju na čekanju dok se pregledani administrativni prijelaz ne potvrdi povratnim očitanjem. Prije objave operater fiksira repozitorij, head/base/tree, hash vrijednosti pravila/zakrpe/povrata i opaženo stanje postavki; `node scripts/quality/codeql-producer.mjs verify-admin-readback` provjerava dostavljene očekivane i stvarne JSON zapise. To je tehnička zaštita, a ne odobrenje operatera niti zamjena za dohvat svježih povratnih očitanja. Token PR-a nikada ne traži pristup Administration. Uvođenje i svaka promjena skenera zahtijevaju to zasebno povratno očitanje te stvarne dokaze kompatibilnosti za PR, fork i grupu spajanja.

Forkovi koriste hostane runnere, checkout bez pohranjenih pristupnih podataka, bez instalacije/builda projekta u proizvođaču i bez naslijeđenih tajni repozitorija. GitHub podržava učitavanje SARIF za događaj pull_request s ograničenim tokenom forka; odobrenje izvođenja prvog doprinosa ostaje pravilom GitHub. Nikada nemojte koristiti pull_request_target za izvršavanje nepouzdanog koda. Potvrdite stvarna ovlaštenja tokena, analysis_key i sva okruženja kategorija u kontroliranom canaryju prije nego što migraciju smatrate dovršenom. [Pravila učitavanja iz forkova](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [sukobljeni načini postavljanja](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

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

**Također nije dokumentirano iznad** (savjetodavno, niske informativne vrijednosti): posao `docs-lint` (markdownlint + Vale, cijeli posao `continue-on-error`) i samostalni radni tokovi skenera `semgrep.yml` / `scorecard.yml`. CodeQL sada ima obavezne poslove proizvođača i prihvata pod `Gate / CI`, uz gore opisane zahtjeve aktivacije. `semgrepFindings: 0` nalazi se u `quality-baseline.json`, ali nije povezan s blokirajućim ratchetom u `ci.yml` — metrika je trenutno nepovezana.

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
