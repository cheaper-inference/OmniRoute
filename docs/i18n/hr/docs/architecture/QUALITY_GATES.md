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

Tijek rada CI i Quality Gates daje stabilnu presudu: `Gate / CI` i `Gate / Quality`. Njihova politika prijema s verzijama nabraja svaki uzvodni posao prema potrebi ili uputama. Primjenjivi traženi posao mora uspjeti: nedostajući, otkazani, preskočeni, na čekanju i nepoznati rezultati ne mogu uspostaviti PASS. Važeća klasifikacija samo za dokumente ili samo za katalog može učiniti kodnu stazu neprimjenjivom; obični nacrt PR nije prihvaćen kandidat. Oznaka `hotfix` a ne odriče se dokaza.

Oba tijeka rada pokrivaju PRs u main/release grane, guranja u `main`, ručno slanje i događaje spajanja grupe. Push, dispatch i merge-group pokreni cijeli odabir. Pouzdana skica čekanja na Mergify također pokreće primjenjive `full-code`/`full-code-e2e` poslove; obični PRs ih preskočiti. Prije ručnog spajanja pokrenite potpuno otpremanje na točnom kandidatu. Pushovi na `release/**` ne pokreću ove tijekove rada; Release-Green zasebno promatra spojenu bazu (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forkovi i grupe za spajanje koriste pokretače s hostom za poslove koji inače odabiru pokretače s vlastitim hostom; dovoljan hostirani kapacitet mora se provjeriti prije uvođenja.

Obični PR pokreće brzi odabir. `full-code` i `full-code-e2e` trake pravila pristupa (E2E, integracija, artefakt paketa, Electron dim, Bun SQLite, klijenti ekosustava i protokola) pokreću se samo na Mergify nacrtu čekanja ili na punom izvođenju: `gh workflow run ci.yml --ref <branch>`.

Svaki JSON račun identificira odjavljeni SHA, radni tijek i pokušaj. CLI odbacuje neusklađenost checkout/event SHA. Testovi tijeka rada povezuju članstvo u politici sa `needs` popisom posla presude tako da nova ili uklonjena traka ne može tiho nestati. Potvrde pokrivaju vlastiti tijek rada, a ne objavljivanje, implementaciju ili unutrašnjost postojećeg savjetodavnog skenera. Obavljanje primjenjivih provjera koje se zahtijevaju u pravilima podružnice je zasebna administrativna promjena; definiranje njihovih poslova samo po sebi ne štiti granu.

`API Route Typecheck` je neovisna provjera tijeka rada, izvan zbirnih presuda i statičkog profila lokalnog potpunog promatrača. Provjerite njegov rezultat zasebno za točnog kandidata. `.github/workflows/api-route-typecheck.yml` radi na PRs u `main` ili `release/**`, gura bilo koju familiju grana, ručno otpremanje i `merge_group` događaje tipa `checks_requested`. Nema filter putanje. Spajanje grupa odjavi `merge_group.head_sha`; ostali događaji pogledajte `github.sha`. Svi događaji koriste ista API dijagnostička vrata i testove jedinica vrata. PR base retargets zahtijevaju novu provjeru; body/title uređivanja koriste naziv samo za promatranje `Admission not requested / API Route Typecheck` i ne mogu zamijeniti provjeru pristupa.

### Zadržani dokazi u reduktoru prihvata

`scripts/quality/validate-release-acceptance.mjs` smanjuje isporučeni plan i njegove manifeste; ne utvrđuje da plan pokriva cijeli cjevovod ispuštanja. Njegova izvješća eksplicitno postavljaju `releaseAcceptance: false`, čak i kada je taj plan `VERIFIED`. Tijek rada `release-acceptance.yml` i dalje koristi shadow fixtures, a ne prave račune za izradu, paket, pokretanje ili promociju.

CLI zahtijeva da `--evidence-root` provjeri zadržane dokaze. Datoteke se rješavaju kao `<evidence-root>/<artifact_id>/<member>` i raspršuju kao SHA-256. PASS zapis bez dokaza, datoteka koja nedostaje ili je promijenjena, nesigurna staza ili simbolička veza sprječavaju provjeru. Datoteke koje nedostaju nisu ekvivalent praznim uspješnim zapisima. Postojeće SHA/run/attempt provjere ostaju neovisne: odgovarajući bajtovi ne mogu spasiti ustajali račun. Integritet datoteke nije dokaz autentičnosti izvršenja ili promicanje artefakta.

### DAST koristi verificiranu CI verziju

Potreban `dast-smoke` CI posao poziva `.github/workflows/dast-smoke.yml` nakon `build`. Slijedi isti code/draft odabir kao i međugradnja, uključujući podržani fork PRs, cilj izdanja PRs i grupe za spajanje. DAST posao koji nedostaje, neuspješan, otkazan ili neočekivano preskočen blokira `Gate / CI`. Tijek rada za višekratnu upotrebu nema neovisni PR/dispatch okidač; ručna provjera valjanosti koristi CI-ovo slanje tako da međugradnja i potrošač ostaju u jednom izvođenju.

`scripts/ci/next-build-provenance.mjs` pečati puni Next artefakt sa svojim tar sažetkom, repository/event/run, pokušajem proizvođača, head/base/checkout/tree, identitetima tijeka rada, zaključanom datotekom, točnim čvorom version/ABI, platformom i bundlerom. DAST odabire nepromjenjivi artefakt ID iz `needs.build.outputs`, zahtijeva provjeru sažetka preuzimanja i neovisno raspršuje ZIP u odnosu na sažetak proizvođača prije izdvajanja svoja dva člana s liste dopuštenih putem `scripts/ci/unpack-ci-build.py`. Arhiva manifesta i tar također se mora podudarati s rezultatima neovisnih proizvođača prije nego što se ekstrahira sljedeće stablo. Nikada ne traži najnoviju uspješnu izgradnju grane. Djelomično ponavljanje može ponovno upotrijebiti taj isti proizvođački pokušaj kada se njegov ID i svi ulazi još uvijek podudaraju; potvrda bilježi oba pokušaja.

Potrošač ostaje na hostiranom Linux pokretaču s dozvolom za repozitorij samo za čitanje i bez tajni repozitorija. Instalira proizvođačevu točnu verziju čvora, zatim sastavlja CLI sa `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` odbija nedostajući samostalni poslužitelj prije bilo kakve zamjenske izgradnje; normalne lokalne CLI verzije zadržavaju svoje postojeće zamjene. Spremnost poslužitelja, Schemathesis i promptfoo moraju uspjeti unutar nepromijenjenog ograničenja posla od 25 minuta. Potvrda o porijeklu dokazuje identitet unosa i bajtove, a ne uspješno DAST skeniranje. Istek artefakta, prekid pokretača ili neuspjeli skener ostaje nepotpun ili neuspješan dokaz; ne može postati PASS kroz savjetodavni omot.

### UI kapacitet izvršenja

CI pokreće puni UI inventar kao četiri `test-vitest` matrice sharda, svaki s najviše dva radnika po shardu i postojećim rokom za obavljanje posla od 15 minuta. Prvi shard također pokreće MCP/autoCombo Vitest paket. Traženi rezultat posla pokriva svaki krak matrice; neuspjeh ili otkazivanje jednog sharda ne može uspostaviti prijem kandidata.

Noćni promatrač zadržava zasebnu potvrdu o točnom kandidatu za svaki UI shard, uključujući izvršenje MCP u prvoj potvrdi. Potrebna su sva četiri računa, zapisnici i odgovarajući identiteti izvršenja. Lokalni `npm run test:vitest:ui` i dalje odabire cijeli paket; jedno ispitivanje `--shard` samo je djelomičan dokaz.

### Prikupljanje pokrića jedinica

The twelve unit shards collect V8 coverage during their existing test execution. A successful shard runs `scripts/ci/compact-v8-coverage.mjs` to compress the original files without generating an intermediate Istanbul report. Konačni posao pokrivenosti provjerava svih dvanaest manifesta u odnosu na SHA kandidata, vrijeme izvođenja, izvorni korijen i hashove podataka, zatim pokreće c8-ove izvjestitelje i postojeće pragove pokrivenosti. Unosi zadržavaju c8 globalni redoslijed imena datoteka; per-shard pre-merging is unsafe for mixed function/block coverage. Missing, malformed or incompatible shards fail admission. Failed test shards retain raw diagnostic coverage separately; ne može ući u konačno spajanje.

### Potvrde o napretku izvršenja jedinice

The shared `test:unit:ci:shard` command records the `primary`, `dashboard` and `serial` phases through `scripts/ci/unit-progress-reporter.mjs`. Izvješće o uobičajenom ispitivanju ostaje dostupno. Zasebna potvrda koja sadrži samo metapodatke bilježi početak i završetak svake datoteke, a otkucaj srca od 30 sekundi navodi datoteke koje su još aktivne i njihovo proteklo vrijeme. Bilježi samo dopuštene metapodatke o izvršenju; opisi testova, izlaz, tijela grešaka i cijelo okruženje nisu serijalizirani.

CI zadržava JSONL datoteke kao `unit-progress-ci-<run>-<attempt>-<shard>`. Istek posla može spriječiti kasniji prijenos; već emitirani otkucaji srca ostaju dijagnostički dokaz. Nedostatak otkucaja srca također može odražavati blokirani ili prekinuti runner proces. Ove potvrde čuvaju postojeći odabir testa, istovremenost, rokove i izlazni status; nisu presude za prijem kandidata.

### Spajanje reda čekanja

`queue` oznaka šalje PR u Mergify red (`.mergify.yml`). Mergify otvara nacrt PR na `mergify/merge-queue/` grani, CI tamo pokreće puni odabir, a izvorni PR se spaja kada `Gate / CI`, `Gate / Quality` i `Merge integrity (changelog + generated skills)` prođu.

Mergify upisuje svoj sažetak čekanja u opis nacrta. Body/title-only `pull_request` `edited` događaji koriste grupu paralelnosti specifičnu za izvođenje i ne pokreću ponovno klasifikaciju, testne matrice, integritet spajanja ili presudu o prijemu. Imena provjere samo za promatranje ne mogu zamijeniti `Gate / CI` ili `Gate / Quality`. Uređivanje koje mijenja ciljnu bazu zahtijeva svježu provjeru kandidata.

Nakon uklanjanja iz reda čekanja, push ne stavlja PR uvijek ponovno u red čekanja. Komentirajte `@mergifyio queue` o tome.

### Statičko skeniranje inventara

The versioned npm-alias inventory and static-scan membership live in `config/quality/gate-manifest.json`. Run `npm run check:gate-manifest` to validate script names and exact commands against `package.json`; additions, removals and command drift fail both the local hook and the change-classification jobs in CI. Pseudonim nije posao tijeka rada, instanca matrice ili testni slučaj: ti se brojevi ne smiju predstavljati kao međusobno zamjenjivi.

Upotrijebite `npm run quality:scan -- --list` ili `npm run quality:scan:fast -- --list` za pregled odabranih aliasa bez njihovog izvršavanja. Izvođač poziva npm ulaznu točku, tako da je njegovo vrijeme izvođenja (uključujući Bun ako je konfigurirano) sačuvano. Manifest bilježi pseudonime izvan tih profila kao zasebno pozvane, a naredbe za održavanje zabranjene su u profilima skeniranja samo za čitanje.

These profiles cover the static scan only. Oni ne potvrđuju testove proizvoda, pokrivenost, pakiranje, vanjske provjere ili potpuno prihvaćanje kandidata za izdavanje. Workflow admission uses the linked `config/quality/admission-policy.json` and `scripts/quality/admission-verdict.mjs`. Release-observer profiles remain separate; neovisno pregledati svoje važeće čekove i račune. Statičke naredbe potpunog promatrača deklarirane su u `config/quality/release-green-static-profile.json`, uključujući `audit:deps`, odabir testa mutacije i provjere prijevoda. Učitavač provjerava valjanost npm naredbi u odnosu na package.json i modelirane CI/Quality deklaracije; odbija drift umjesto da izvršava shell tokene kao argumente. Potreban SKIP/INCOMPLETE izlaz skenera ne može uspostaviti PASS. Profil bilježi svoja vanjska isključenja i ne zamjenjuje hostirano pokrivanje, testne matrice, pakete ili dokaze o implementaciji. Prozni inventar u nastavku je referenca, a ne dokaz da su vrata doista bila otvorena.

Skripte žive pod `scripts/check/` (policy gates) i `scripts/quality/` (ratchet engine). The CI source of truth is `.github/workflows/ci.yml`.

### Zdravlje objavljene baze dokumentacije

`.github/workflows/i18n-base-health.yml` promatra ispravnost dokumentacije nakon odabranih guranja u `main` i `release/v*` te prilikom ručnog slanja. Njegovi filtri pokrivaju dokumentaciju, root Markdown, `llm.txt`, prijevod state/configuration i relevantni i18n alat. Jedan `Published base documentation health` posao koristi hostirani Ubuntu i rok od pet minuta. Izvodi provjeru valjanosti samo za čitanje i piše dijagnostičku potvrdu bez instalacije ovisnosti, prijevoda ili usvajanja stanja.

`scripts/i18n/check-base-health.mjs` ne zahtijeva nedosljednosti izvornog raspršivanja, nedostajućeg cilja, ciljanog raspršivanja, ustajalog prijevoda i predmemorije sekcija. Također potvrđuje trenutni osnovni document/locale opseg i njegovo zabilježeno porijeklo. Nevažeći kontekst, nepotpuno pokrivanje ili prekinuta provjera stvara `INCOMPLETE`; confirmed drift produces `FAIL`. Both return a failing exit status. Potvrda je vezana za naplatu SHA, tijek rada, pokretanje i pokušaj te se zadržava kao `i18n-base-health-<sha>-<run>-<attempt>`.

Ovo je neovisno promatranje objavljene baze. Ne dodaje PR ili događaj grupe spajanja, potrebnu PR provjeru, npm alias ili člana profila statičkog skeniranja. Temeljni provjerivač također blokira svih pet klasa u apsolutnom načinu rada. Obična priprema PR ostaje odvojena od prijema. Uspješan prijenos ne može pretvoriti neuspjeli zdravstveni rezultat u PASS.

Obični PR koristi `--preflight` s osnovnim izvješćem koje generira `--baseline-evidence`. Izvor na engleskom može ostaviti na čekanju samo ako se potpuni zapis prijevoda i stvarni ciljni bajtovi ne mijenjaju u odnosu na točnu bazu. Nedosljednosti novog cilja ili predmemorije odjeljka i dalje blokiraju, a nepotpuni dokazi ne mogu odobriti pripremu. Izvješće zasebno izlaže `preparationPending` i `mergeReady` : uspješna priprema ne čini prijevode na čekanju spremnima za spajanje. Osvježite zahvaćena zrcala u sastavljenom kandidatu prije prijema. Pouzdani Mergify kandidat za red čekanja, `merge_group`, guranja grana i ručna pokretanja CI a koriste apsolutnu provjeru, bez `--warn` ili oprosta naslijeđenih neuspjeha. Ciljani hashovi koji nedostaju i opseg smanjen izbrisanim snimljenim osnovnim datotekama ne mogu proizvesti uspješnu apsolutnu presudu.

### Izdanje PR brze staze (`quality.yml`)

`.github/workflows/quality.yml` nadopunjuje CI na main/release PRs, gura u `main`, šalje i spaja grupe. PRs koristi brze provjere filtrirane putem. Uklonjena je trajno onemogućena duplicirana verzija; pravi čekovi build/package/boot ostaju u CI. Paket jedinica i vitest rade samo u CI (`Unit Tests (N/12)` i `Vitest`).

| Posao                                            | Opseg                                                                                                                                                                                                            | Blokiranje             |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; Reference API dokumenata i svi dokumenti                                                                                                                                                          | Da                     |
| `Fast Quality Gates`                             | Šifra PRs; statičke provjere, provjera tipa, provjera tipa nadzorne ploče, testovi pogođenih jedinica                                                                                                            | Da                     |
| `Forgotten sibling tests`                        | Šifra PRs; promijenjeni moduli praćeni na statičke potrošače i kandidate za srodne testove; bačve i staze dinamičkog uvoza prijavljuju se kao savjetodavna dijagnostika, s navedenim iznimkama popisa dopuštenih | **Savjetodavno**       |
| `No new ESLint warnings`                         | Šifra PRs; suppressions-aware lint guard                                                                                                                                                                         | Da, uključujući vilice |
| `Merge integrity (changelog + generated skills)` | PRs bez nacrta ; zapis promjena i generirana sinkronizacija vještina                                                                                                                                             | Da, uključujući vilice |

#### Izvješće o testovima zaboravljenog brata i sestre

`npm run check:forgotten-sibling-tests` radi kao savjetodavni korak `Fast Quality Gates` a i ponovno koristi razrješivač uvoza iza karte utjecaja testa. Za svaki promijenjeni proizvodni modul izvješćuje o determinističkim `changed module/symbol -> static consumer -> candidate sibling test` lancima kada je test kandidata odsutan u dif. zahtjeva za povlačenjem. Sažetak Markdown i JSON rezultat zadržavaju se kao `forgotten-sibling-tests` artefakt tijeka rada za kalibraciju prije bilo kakvog uvođenja blokiranja.

Reeksport bačve i dinamički uvoz samo su dijagnostika rezolucije; nikad ne stvaraju blokirajući nalaz. Pregledane iznimke uživo u `config/quality/forgotten-sibling-allowlist.json`. Svaki unos mora imenovati test potrošača i kandidata, dati specifično obrazloženje i povezati GitHub problem ili zahtjev za povlačenjem. Neispravni unosi nisu uspjeli zatvoriti. Iznimke ne mogu potisnuti izbrisani test kandidata ili razliku koja dodaje `.skip`/`.todo`; slabljenje tvrdnje i drugo maskiranje ostaju u vlasništvu neovisno blokirajućih `check:test-masking` vrata.

### Posao: `lint`

Radi na svakom PR do `main`. Blokovi se spajaju u slučaju kvara.

| Skripta (`npm run ...`)           | Provjerava valjanost                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Blokiranje                                   |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Node.js verzija unutar je podržanog raspona                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:cycles`                    | Kružni uvozi u cijelom `src/` + `open-sse/` (na temelju AST-a, tsconfig `paths` razriješen). Bare izlazi iz 1 kad god postoji bilo koji ciklus (neuspješno zatvoren od #15281) i navodi SCCs. `check:cycles:ratchet` (ono što CI pokreće) blokira kada broj premaši gornju granicu `metrics.cycles` u `quality-baseline.json` — trenutno 14, `direction: down`, tako da može samo pasti (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da (čegrtaljka)                              |
| `check:boundary`                  | `open-sse → src` spajanje: jedinstveni uvozi datoteke u datoteku iz motora u aplikaciju (`scripts/quality/measure-boundary.mjs`; rubni popis je v4 core/module-split zaostatak ispravljanja). Golo = savjetodavno izvješće (isto kao `quality:boundary`). `check:boundary:ratchet` (ono što CI pokreće, također u `quality.yml` petlji s brzim vratima) blokira kada broj premaši gornju granicu `metrics.boundaryOpenSseToSrc` u `quality-baseline.json` — zasijano na izmjerenih 771, `direction: down`; `--update` ga samo snižava; baza-relativna na PRs (`--base-ref`, vidi dolje)                                                                                                                                                                                                                                                                                                                                                                        | Da (čegrtaljka)                              |
| `check:route-validation:t06`      | Zod sheme prisutne na svim rutama (Tier 6 pravilo)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                           |
| `check:any-budget:t11`            | `@ts-expect-error // any` broj ne premašuje proračun (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                           |
| `check:provider-consistency`      | Svaki pružatelj usluga u `providers.ts` ima odgovarajući unos u `providerRegistry.ts` (i obrnuto, unutar popisa dopuštenih)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:model-lifecycle`           | Tri ručno održavane tablice usmjeravanja ostaju u skladu s prijavljenim snimkom životnog ciklusa (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ne bilježi povučeni ID koji `REGISTRY` može usmjeriti; svaki `BUILT_IN_ALIASES` cilj prisutan je u `REGISTRY` i odsutan je u snimci povučenog ID-a; svaka umirovljena iskaznica koja je još u `REGISTRY` proslijeđena je ili navedena u `allowedRetiredInCatalog`; i nijedan `DEFAULT_DEGRADATION_MAP` izvor ili cilj se ne pojavljuje povučen u toj snimci. To ne dokazuje da se model trenutno opslužuje uzvodno uživo. Izvanmrežni — uspoređuje se sa `config/quality/model-lifecycle.json`, ručno osvježen sa `npm run quality:refresh-model-lifecycle` (mreža; nije spojen u CI). `allowedRetiredInCatalog` je brzinski alat: dodajte unos samo s problemom praćenja.                                                                                                                                       | Da                                           |
| `check:fetch-targets`             | Svaki `fetch("/api/...")` u `src/` -u na strani klijenta pretvara se u pravi `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                           |
| `check:deps`                      | Svi `npm install` -able deps u svakom `package.json` u repou su u `dependency-allowlist.json`; označeni novi neprikvačeni ili slopsquatted paketi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                           |
| `audit:deps`                      | npm revizija svih pet neovisnih zaključanih datoteka (root, Electron, OpenCode dodaci v1/v2 i pružatelj). Blok kritičnih savjeta; visoka upozorenja ostaju vidljiva upozorenja. Missing/failed revizije su INCOMPLETE i blok; hashovi i izvješća zaključavanja po opsegu se zadržavaju.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                           |
| `check:lockfile`                  | `package-lock.json` integritet — https registar, hashovi integriteta, nema nadjačavanja hosta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `check:licenses`                  | Popis dopuštenih licenci SPDX za proizvodne ovisnosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `check:tracked-artifacts`         | Nema artefakata izgradnje/povjerenih `node_modules` simboličkih veza (također radi u husky pre-commitu; pre-push je namjerno lagan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:ai-attribution`            | Nema AI/bot `Co-Authored-By` najave ili podnožja generiranja umjetne inteligencije u PR obvezama, naslovu ili tijelu — Hard Rule #16 (u `quality.yml` petlji brzih vrata za PR→ `release/**` — čita sadržaj događaja, bez operacije isključeno PRs — i korak samo za PR u `ci.yml` lint za PR→ `main`; također husky `commit-msg` kuka; dopušteni ljudski koautori #14436                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:vitest-exclusions`         | Svako Vitest izuzimanje imenuje problem praćenja i pojavljuje se u `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                           |
| `check:file-size`                 | Izvorne datoteke (`.ts`/`.tsx` u `src/`, `open-sse/`, `electron/`, `bin/`) ostaju unutar `cap`, a testne datoteke (`*.test.ts(x)`) unutar `testCap`; datoteke zamrznute u `file-size-baseline.json` (`frozen` / `testFrozen`) ne smiju porasti preko svoje snimljene veličine                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `check:error-helper`              | Odgovori na pogreške u executors/handlers koriste `buildErrorBody()` / `sanitizeErrorMessage()` (tvrdo pravilo #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                           |
| `check:migration-numbering`       | Migracijske SQL datoteke su redom numerirane, bez praznina ili duplikata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                           |
| `check:public-creds`              | Nema doslovnih OAuth `client_id`/`client_secret` ili Firebase web ključeva izvan `publicCreds.ts` (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                           |
| `check:db-rules`                  | Nema sirovog SQL izvan `src/lib/db/` modula; nema uvoza bačvi iz `localDb.ts` (tvrda pravila #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                           |
| `check:known-symbols`             | Izvršitelji pružatelja usluga, strategije usmjeravanja i prevoditelji registrirani u njihovim tablicama otpreme odgovaraju datotekama na disku — bez napuštenih ili nedeklariranih simbola                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `check:route-guard-membership`    | Svaka ruta koja stvara podređeni proces klasificirana je prema `isLocalOnlyPath()` (tvrda pravila #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `check:test-discovery`            | Svaku `*.test.ts` / `*.spec.ts` datoteku u repou prikuplja najmanje jedan pokretač testa (ratchet: lista siročadi u `test-discovery-baseline.json` može se samo smanjivati)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:test-tla-order`            | Nijedna `node:test` datoteka pod `tests/unit` ne registrira test, pogađa `await` najviše razine, zatim registrira više (#18045; čegrtaljka: `test-tla-order-allowlist.json` se može samo smanjiti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                           |
| `check:agent-skills-sync`         | Generirani artefakti vještina agenta odgovaraju njihovom izvornom katalogu (bez pomaka)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:provider-asset-provenance` | Pružatelj logos/assets nosi zabilježeni unos provenijencije                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `lint:json`                       | JSON konfiguracijske datoteke analiziraju i zadovoljavaju pravila repo linta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `typecheck:core`                  | TypeScript kompilacija bez grešaka (samo savjetodavna upozorenja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                           |
| `typecheck:noimplicit:core`       | Strogi `noImplicitAny` — usmjeren prema budućnosti; mnoga već postojeća mjesta poziva još uvijek trebaju bilješke                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **Savjetodavno** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` obuhvaćen `src/app/(dashboard)/**` (#7033) — `typecheck:core`-ov odabrani popis dopuštenih od 27 datoteka ne uključuje TSX nadzorne ploče, a `next build` ga nikada ne provjerava tipom (`next.config.mjs` postavlja `ignoreBuildErrors: true`), tako da su tamošnje regresije identifikatora siročadi (#6625/#6909) bile nevidljive CI. Razlikuje se u odnosu na zamrznutu osnovnu liniju brojanja per-file/per-TS-code (`config/quality/dashboard-typecheck-baseline.json`, isti obrazac zastarjele provedbe kao `check:known-symbols`) — samo NEW pogreške izvan osnovnog broja ne prolaze vrata; sniziti sa `--update` kada se popravi već postojeća pogreška.                                                                                                                                                                                                                                                                                       | Da                                           |
| `check:build-typecheck`           | Provjera vrste produkcije cijele aplikacije preko `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), površinskog `typecheck:core`-ovog popisa dopuštenih 27 datoteka i vrata nadzorne ploče ne pokrivaju. Razlike u odnosu na `config/quality/build-typecheck-baseline.json`; novi ili povećani broj po-(datoteci, kodu) ne uspije, niži broj od vas traži da ubrzate. `--update` odbija dok izvođenje sadrži novi ili podignuti par osim ako se ne položi `--force-regressions`, i odbija novoutišanu datoteku osim ako se ne položi `--force-nocheck`, tako da su širenje osnovne linije da postane zelena i odobravanje trajne tišine dva odvojena namjerna čina. Goli `--force` se odbacuje. Također skenira opseg izgradnje za `@ts-nocheck` u odnosu na `config/quality/ts-nocheck-baseline.json`, jer datoteka koja ga koristi ne prijavljuje nikakvu dijagnostiku i inače bi bila nevidljiva svim vratima. | Da                                           |

#### Dva programa za provjeru tipa odgovaraju različito

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) i `check:build-typecheck` kompiliraju različite programe pod različitim opcijama, a ista datoteka može biti čista u jednoj i puna pogrešaka u drugoj.

`tsconfig.build.json` postavlja `"strict": false`, tako da je `noImplicitAny` isključen. Temeljna konfiguracija sastavlja odabrani popis dopuštenih datoteka od 27 datoteka sa strožim opcijama i prati grafikon uvoza svakog unosa, tako da se datoteke koje se nikada ne pojavljuju u programu za izradu i dalje tamo provjeravaju.

Posljedica je važna kada se procjenjuje je li datoteka upisana:**nula dijagnostika prema `check:build-typecheck` ne znači nula** . Skidanje `@ts-nocheck` iz 26 datoteka pokazalo je da su 23 čiste u programu za izgradnju; šesnaest od njih pojavilo se oko 120 implicitnih - bilo kakvih pogrešaka u strogom. Provjerite oboje prije nego što datoteku nazovete čistom.

### Posao: `quality-gate`

Trči nakon `test-coverage`. Blokovi se spajaju u slučaju kvara.

| Skripta                      | Provjerava valjanost                                                                                                                                | Blokiranje                 |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `quality:collect`            | Emituje `quality-metrics.json` (ESLint broj upozorenja, pokrivenost iz spojenog izvješća o fragmentima)                                             | Da (uzvodno od čegrtaljke) |
| `quality:ratchet`            | Nijedna metrika u `quality-baseline.json` nije nazadovala (ESLint upozorenja ≤ osnovna vrijednost; pokrivenost ≥ osnovna vrijednost)                | Da                         |
| `check:duplication`          | Dupliciranje koda (jscpd@4) ne prelazi osnovnu vrijednost u `quality-baseline.json`                                                                 | Da                         |
| `check:complexity`           | Ciklopmatska složenost na razini datoteke ne premašuje ograničenje (core ESLint `complexity` + `max-lines-per-function`)                            | Da                         |
| `check:cognitive-complexity` | Ratchet kognitivne složenosti (`eslint-plugin-sonarjs`) — odvojeni ESLint prolaz; CI izvodi oba spojena kao jedan `check:complexity-ratchets` korak | Da                         |
| `check:dead-code`            | Neiskorišteni izvozi / datoteke ratchet (knip) ne regresira u odnosu na osnovnu vrijednost                                                          | Da                         |
| `check:compression-budget`   | Kompresija benchmark proračuna — donje granice uštede tokena po motoru ne smiju nazadovati                                                          | Da                         |
| `check:type-coverage`        | Percent-typed ratchet (`type-coverage`) ne regresira; velikim dijelom podvodi `typecheck:noimplicit:core`                                           | Da                         |

### Poslovi: `codeql-scan` i `codeql-admission`

`codeql-scan` proizvodi sve konfigurirane kategorije analize. Nakon što taj posao uspije, `codeql-admission` provjerava svoje točne učitane podatke i čegrtaljku upozorenja kandidata. Obje su potrebne ovisnosti `Gate / CI`, uključujući kandidate samo za dokumente. Zahtjevi za administrativnu aktivaciju i Canary opisani su ispod pod "CodeQL čegrtaljka".

| Skripta                | Provjerava valjanost                                                                                                                                                                                       | Blokiranje |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:codeql-ratchet` | Kandidat za ref/SHA i sve konfigurirane kategorije analize moraju biti aktualne prije upozorenja; blokovi dokaza koji nedostaju. Globalni inventar ostaje odvojen — pogledajte "CodeQL ratchet" u nastavku | Da         |

### Posao: `quality-extended`

Posao blokira primjenjive kandidate. Veličina paketa, tajni nalazi, nalazi ranjivosti, nalazi tijeka rada i OpenAPI promjene provjeravaju se potrebnim čegrtaljkama. Dijagnostika kružne ovisnosti ostaje savjetodavna. Potrebna je instalacija skenera: `scripts/ci/install-quality-scanners.sh` osigurava prikvačene verzije i propagira pogreške instalacije. Nedostajući alati, nevažeća izvješća ili nedostajuće osnovne linije ostavljaju potrebna vrata skenera INCOMPLETE.

| Skripta                  | Provjerava valjanost                                                                                                                                                                                                      | Blokiranje                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `check:circular-deps`    | Nema kružnih ovisnosti (dpdm)                                                                                                                                                                                             | **Savjetodavno**                                 |
| `check:bundle-size`      | Veličina snopa ne prelazi ograničenje; nedostupno mjerenje ne uspije                                                                                                                                                      | **Blokiranje sa --ratchet**                      |
| `check:secrets`          | Gitleaks nalazi se ne povlače; potrebna skeniranja odbacuju tools/source/baseline koji nedostaje, neuspjela skeniranja i nevažeća izvješća                                                                                | **Blokiranje sa --ratchet**                      |
| `check:vuln-ratchet`     | Ranjive točke ovisnosti se ne povlače; potrebna skeniranja odbacuju nedostajuće alate, nevažeća izvješća ili nedostajuće osnovne linije                                                                                   | **Blokiranje sa --ratchet**                      |
| `check:workflows`        | Workflow lint (actionlint + zizmor); missing/broken skeneri, nevažeći izvještaji ili nedostajuća osnovna linija čegrtaljke ne uspijevaju kao INCOMPLETE. Valjani nalazi slijede odabranu strict/advisory/ratchet politiku | Potrebna izvedba; zizmor ratchet blokiranje u CI |
| `check:openapi-breaking` | Javni API ugovor protiv obvezivanja prikvačenih događaja (PR baza spajanja, push prije, baza grupe spajanja; scheduled/manual checkout prvi roditelj); zahtijevano mjerenje nije zatvoreno                                | **Blokiranje sa --ratchet**                      |

### Posao: `docs-sync-strict`

Za zahtjeve za povlačenje prema `main` ili `release/**`, ovaj se posao izvodi samo za kandidate koji nisu skica (ili pouzdani red čekanja) klasificirani kao dokumentacija ili promjene koda. Također radi na ne-PR CI događajima; Push okidač ovog tijeka rada pokriva samo `main`, ne i `release/**`. Korak koji izlazi bez nule blokira posao; nalazi samo za izvješća i dokumentirani izuzeci u nastavku ne.

| Skripta                        | Provjerava valjanost                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Blokiranje                                                                                                                                         |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-vrata koja uzastopno pokreću 7 pod-vrata ispod                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                                                                                                                                 |
| ↳ `check:docs-sync`            | Dosljednost Package/OpenAPI/CHANGELOG verzije, točna `llm.txt` zrcala, prevedene CHANGELOG section/size invarijante i odsutnost zamijenjenih dupliciranih dokumenata                                                                                                                                                                                                                                                                                                                     | Da                                                                                                                                                 |
| ↳ `check:docs-frontmatter`     | Stranice kompilirane dokumentacije nose važeće naslove prednjeg materijala                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                                                                                                                                 |
| ↳ `check:docs-counts`          | Invarijante brojanja visoke pouzdanosti su stroge; heurističke provjere broja datoteka upozoravaju samo ako skripta ne primi `--strict` ( CI meta-vrata ga ne prolaze)                                                                                                                                                                                                                                                                                                                   | Strogo blokiranje razine; soft tier advisory                                                                                                       |
| ↳ `check:env-doc-sync`         | Izvorni env čita, `.env.example` i `docs/reference/ENVIRONMENT.md` se slažu nakon izričitog ignoriranja, doc-only i env-only popisa dopuštenih                                                                                                                                                                                                                                                                                                                                           | Da, izvan dokumentiranih popisa dopuštenih                                                                                                         |
| ↳ `check:deprecated-versions`  | Izvještava o potencijalnim zastarjelim verzijama izvan sigurnih povijesnih konteksta i zastarjelim datumima ažuriranja, isključujući zanemarene dokumente                                                                                                                                                                                                                                                                                                                                | Savjeti u trenutnom CI ožičenju (`--strict` nije prošao)                                                                                           |
| ↳ `check:doc-links`            | Interne veze za označavanje u dokumentima rješavaju stvarne datoteke (`[text]`/`(path)` obrazac)                                                                                                                                                                                                                                                                                                                                                                                         | Da                                                                                                                                                 |
| ↳ `check:fabricated-docs`      | Rute, env vars, CLI naredbe, nazivi spojnica i staze datoteka navedene u dokumentima postoje u bazi koda. Tvrda vrata preko `--strict`; soft-fail bez oznake.                                                                                                                                                                                                                                                                                                                            | Da (preko `--strict` u CI)                                                                                                                         |
| `check:cli-i18n`               | Korišteni CLI `t()` ključevi postoje u `en`; `pt-BR` zadržava svaki odjeljak najviše razine; `zh-CN` i `zh-TW` sadrže svaki ključ iz `en`                                                                                                                                                                                                                                                                                                                                                | Da                                                                                                                                                 |
| `check:openapi-coverage`       | OpenAPI specifikacija pokriva barem niz stvarnih ruta                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                                                                                                                                 |
| `check:openapi-security-tiers` | Deklarirane `x-loopback-only`/`x-always-protected` napomene moraju imati potporu `routeGuard.ts`; parser i blok neusklađenosti prema naprijed. Obrnuta provjera za nedostajući `x-loopback-only` pod samo lokalnim prefiksima upozorava, a rute samo za uzorak isključene su iz tog obrnutog prolaza.                                                                                                                                                                                    | Parser/forward provjerava blokiranje; reverse check advisory                                                                                       |
| `check:openapi-routes`         | Svaki `/api...` put u `openapi.yaml` -u rješava neosjetljivo na stvarnu rutu nakon opravdane `KNOWN_STALE_SPEC` liste dopuštenih; ustajali unosi na listi dopuštenih također ne uspijevaju                                                                                                                                                                                                                                                                                               | Da                                                                                                                                                 |
| `check:docs-symbols`           | Interne `/api/...` URL reference u kanonskim ne-zrcalnim dokumentima rješavaju pravu rutu ili obitelj ruta; proxy/upstream/placeholder/file reference i opravdani `KNOWN_STALE_DOC_REFS` unosi su isključeni, a zastarjeli unosi na listi dopuštenih nisu uspjeli                                                                                                                                                                                                                        | Da                                                                                                                                                 |
| `i18n translation drift`       | Apsolutni pristup zahtijeva nulti izvor, cilj koji nedostaje, hash cilja, nedosljednosti u starom prijevodu i predmemoriju odjeljka. Uobičajena PR priprema može zadržati točan naslijeđeni dokaz ili promjenu na čekanju samo na engleskom jeziku s nepromijenjenim potpunim stanjem i ciljnim bajtovima; njegovo izvješće zasebno izjavljuje spremnost za spajanje. Nedostaju ciljani hashovi i nepotpuni blok baze dokaza. Nedostatak predmemorije naslijeđenog odjeljka nije greška. | Svih pet razreda blokira upis queue/base ; obična priprema dopušta samo dokazano naslijeđene radove ili radove na čekanju samo na engleskom jeziku |

Generira se dvanaest README SVGs pod `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` ih sve regenerira). Svaki ima jedinični test usporedbe bajtova (`tests/unit/docs/readme-*-svg.test.ts`, posao `test-unit`) koji ne uspijeva kada je predana datoteka zastarjela, a `check:docs-counts` čita kanonske brojeve iz svojih `<text>` čvorova — zbog čega korak ocrtavanja čuva svaki ocrtani niz u datoteci kao nevidljiv `<text>`. SVG provjera kanonskih brojeva čita datoteke navedene u `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` i `tier-flow-light.svg`; tvrdnje o besplatnom zauvijek, unosu u katalog, ponavljajućem skupu i faktorima bodovanja također glase `promise-pillars.svg`, `free-tier-budget.svg` i `strategies-grid.svg`. `free-tier-budget.svg` izvlači svoje brojke iz live kataloškog punjača, tako da promjena u `FREE_MODEL_BUDGETS` ili nazivu za prikaz pružatelja daje crveni znak CI dok se ta datoteka ponovno ne generira.

### Posao: `i18n-ui-coverage`

| Skripta                             | Provjerava valjanost                                                                                                                                                                                       | Blokiranje     |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (umetnuti) | UI i18n pokrivenost ključem je ≥ 65%                                                                                                                                                                       | Da             |
| `check-ui-value-drift` (umetnuti)   | Prepisani engleski **vrijednost** ne ostavlja za sobom ustajali prijevod                                                                                                                                   | Da             |
| `check-new-key-coverage` (umetnuti) | A **novi** Engleski ključ je preveden u svakom jeziku — a `__MISSING__:` marker je odbijen                                                                                                                 | Da             |
| `check-translation-ratio`           | Omjer stvarnog prijevoda po lokalitetu (identičan engleskom / rezervirano mjesto / nedostajući listovi izvan popisa dopuštenih) ne smije premašiti `config/quality/i18n-translation-baseline.json` + slack | **Blokiranje** |

Potreban je `fetch-depth: 0` — vrata za pomicanje vrijednosti diff `en.json` u odnosu na bazu spajanja.

#### `check-ui-value-drift` — stale-translation gate

Hvata jednu i18n regresiju koju druga vrata strukturalno ne mogu vidjeti: engleska vrijednost je prepisana, a prijevodi izvedeni iz _prethodnog_ engleskog ostaju iza, tako da korisnici koji nisu engleski nastavljaju čitati samouvjereno sročenu, sada pogrešnu kopiju.

Ovo je stvarno poslano. `oauthModal.googleOAuthWarning` je ponovno napisan kada je Antigravity pomoćnik za prijavu sletio (#5203);**39 od 43 mjesta** sačuvani tekst koji operaterima govori da "kopiraju cijeli URL i zalijepe ga ispod" — tijek koji se ne može dovršiti za tog pružatelja usluga. Prošlo je nezapaženo do #8463 jer:

- `sync-ui-keys` popunjava samo ključeve koji jesu **odsutan** , nikada one koje jesu **mokraća** ;
- `check-ui-keys-coverage` broji _prisutnost_ ključa, tako da se zastarjeli prijevod ocjenjuje kao pokriven;
- `check-translation-drift` prati `docs/i18n/<locale>/**.md` dokumentaciju koja odražava — i nikad ne čita `src/i18n/messages/*.json`. Blokiranje u poslu `docs-sync-strict` od ponovne sinkronizacije 2026-09: uredite temeljni dokument → `npm run i18n:run -- --files=<doc>` (razina odjeljka, jeftino).

**Svjestan razlike, nije podržan osnovnom linijom.** Uspoređuje `en.json` na bazi spajanja s radnim stablom; za svaki ključ čija se engleska vrijednost promijenila, svaka lokalizacija koja još uvijek sadrži nedirnuti prijevod je zastarjela. Ovo namjerno **zamrzava već postojeći dug** — a diff ne može otkriti s kojeg je starog engleskog dugotrajni prijevod došao, tako da vrata prosuđuju samo ono što trenutna promjena dotiče. Alternativa (bazna linija raspršivanja po ključu) koštala bi ~ 600 KB generiranu datoteku, 3 × najveću postojeću osnovnu liniju, bućkanje na svakom i18n PR.

Dva načina da ga zadovoljite:

1. ažurirati zahvaćene prijevode, ili
2. postavite ih na `__MISSING__:<new english>` — vrijeme izvođenja zatim poslužuje ispravljeni engleski (`src/i18n/request.ts::deepMergeFallback`, #7258) i redove čekanja za prijevod.

Ako je niz **značenje** promijenio, radije **preimenovanje ključa** : novi ključ ne može naslijediti zastarjeli prijevod. To je obrazac koji koristi #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Value-drift i new-key vrata dijele jednu nepromjenjivu usporedbu sa `scripts/i18n/resolve-ui-diff-base.mjs`. Tijek rada prosljeđuje istu bazu, vrh baze i SHAs kandidata za obje provjere. PR/base-retarget, push i spajanje grupa koriste svoj kontekst događaja. Slanje grane kandidata zahtijeva njegov točan otvoreni PR ili eksplicitni `i18n_base_sha` unos. Slanje ili planirano promatranje `main` ili `release/vX.Y.Z` bez tog unosa uspoređuje zadnje predavanje s njegovim prvim roditeljem; to nije revizija svih naslijeđenih prevoditeljskih dugova. Lokalno pozivanje zahtijeva eksplicitnu bazu usporedbe, na primjer gornju naredbu `BASE_REF`.

Usporedni kontekst koji nedostaje ili je dvosmislen, nečitljiv ili nevažeći traženi katalog i promijenjeni kandidat proizvode `INCOMPLETE` s izlaznim kodom **2** , uključujući način upozorenja. Čitanja kataloga koriste `scripts/i18n/read-ui-catalog.mjs`; pogreške čitanja nisu zamijenjene praznim objektima. Niti nedostupna baza niti nepotpuni unos ne uspostavlja PASS.

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

Potreban je posao `changes` klasifikacije. Primjenjivi dijelovi matrice blokiraju spajanje u slučaju neuspjeha.

| Suite            | Provjerava valjanost                                                          | Blokiranje                                                                                                         |
| ---------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP poslužitelj (110 alata), autoCombo, predmemorija — najtestnijeg pokretača | Da                                                                                                                 |
| `test:vitest:ui` | UI komponenta testira — vitest runner                                         | **Blokiranje** — već postojeći kvarovi izričito su isključeni u `vitest.config.ts`; novi neuspjesi propadaju posao |

### Noćni tijek rada (planirani, savjetodavni)

Oni rade na cron rasporedu (i `workflow_dispatch`), nikada na PRs. Svi su savjetodavni.

| Tijek rada             | Provjerava valjanost                                                                                                                                         | Blokiranje       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `nightly-property`     | testovi svojstava brze provjere s nasumičnim početnim + visokim brojem                                                                                       | **Savjetodavno** |
| `nightly-resilience`   | heap-growth gate, chaos fault-injection, k6 load/soak                                                                                                        | **Savjetodavno** |
| `nightly-llm-security` | promptfoo injection guard (blokiranje) + garak sonde (preskočeno bez tajne pružatelja)                                                                       | **Savjetodavno** |
| `nightly-schemathesis` | Fuzzing OpenAPI ugovora (shemateza) protiv živog OmniRoute koji koristi `docs/openapi.yaml` — površine kršenja specifikacija / neobrađenih 500s (faza 8 B.4) | **Savjetodavno** |
| `nightly-mutation`     | Strykerov rezultat testiranja mutacije preko brze jedinice — preživjeli mutanti slabo tvrde                                                                  | **Savjetodavno** |
| `nightly-compat`       | Matrica kompatibilnosti Node Engine u svim podržanim `engines.node` rasponima                                                                                | **Savjetodavno** |

Osnovne vrijednosti izvedbe (hrpa, TTFB, vrijeme izrade) se bilježe, a ne usmjeravaju: vidi [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
- **savjetodavno** — ukupni globalni iznos u odnosu na zamrznutu referentnu vrijednost. Naslijeđeno odstupanje nikada ne označava
  nedužni PR crvenim; odstupanje se prati radi ispravka tijekom usklađivanja izdanja, a nadzire ga
  zadatak za praćenje rezerve.

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

### CodeQL ratchet: prijem kandidata i inventar spremišta

CI posjeduje prijem kandidata CodeQL kroz eksplicitni lanac ovisnosti: `codeql-scan` poziva četverojezičnu matricu u `codeql.yml`, zatim `codeql-admission` pokreće `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` zahtijeva oba rezultata. Kvaliteta zadržava vlastite numeričke provjere, ali ne postavlja upit skeneru prije nego što proizvođač završi; Sam `Gate / Quality` nije potpuni prijem kandidata. CodeQL ostaje obavezan za kandidate koji imaju samo dokumente.

Pravila u `config/quality/codeql-admission-policy.json` odabiru radnje, C/C++, JavaScript/TypeScript i Python, zadane postavke paketa upita, udaljeni model prijetnje i način izrade ništa. Pretprovjera proizvođača odbija aktivacijski zapis na čekanju i grana se izvan eksplicitnog ciljnog popisa. Trenutačni ciljevi su glavni, a testovi release/v3.8.54. ugovora uspoređuju ovaj konačni popis i okidač za održavanje s verzijom paketa; sljedeće izdanje treba pregledati uvođenje. Zadržan je postojeći PR okidač šireg izdanja CI-a, ali neukrcana meta prijavljuje HOLD prije ekstrakcije umjesto da dobije neizmjereni PASS.

Svaki matrični posao bilježi svoj stvarni SARIF prijenos ID, jezik, kategoriju, pokretanje i pokušaj, identitet tijeka rada pozivatelja, događaj ref/head/base/merge SHA i hash politike. Zavisni posao preuzima samo račune ovog izvođenja i potvrđuje sažetke artefakata. Zahtijeva sve četiri kategorije, uspješnog producenta i dovršenu obradu svakog točnog uploada. Koristi API-ov sarif_id filter, a ne najnoviju analizu pronađenu na grani. Djelomična ponavljanja mogu ponovno koristiti uspješne kategorije iz ranijeg pokušaja iste serije i kandidata, čuvajući pokušaj proizvodnje; neuspjeli trenutni proizvođač ne može ponovno koristiti prethodne zelene dokaze.

Radnja CodeQL čeka na obradu, ali njezina prikvačena implementacija može upozoriti i nastaviti nakon neuspjeha čitanja statusa ili iscrpljenog čekanja. Prijem stoga ponovno potvrđuje obradu. Kategorije koje nedostaju, obrada na čekanju, neuspjeli ili otkazani poslovi, zastarjeli identitet, nepotpuna paginacija ili nedostupni APIs proizvodi HOLD i izlazi 2. Nema fiksnog čekanja za neovisni tijek rada skenera. Neskenirani PR ne može proći jer je upit upozorenja vratio 0. Izmjereni broj iznad `metrics.codeqlAlerts.value` izlazi 1; osnovna linija nije podignuta da apsorbira upozorenja druge grane. [Status učitavanja i analiza analize](https://docs.github.com/en/rest/code-scanning/code-scanning).

Potvrda o primitku bilježi prijenos i analizu IDs, kategorije, verzije alata, ref/SHA, osnovne i brojeve upozorenja. SARIF identity/result broj, minimalni broj pravila i točne instance upozorenja ostaju obvezni. PR/analysis identiteti ponovno se provjeravaju prije prihvaćanja. Ove provjere uspostavljaju pokrivenost konfigurirane kategorije, a ne inventar svake ekstrahirane izvorne datoteke. C/C++ ekstrakcija bez izgradnje ne uključuje kod generiran tijekom izgradnje projekta. Izuzimanja izvora i dalje je potrebno pregledati, a atribuciji suradnika potrebni su usporedivi točni osnovni dokazi.

`codeql-maintenance.yml` isporučuje push skeniranja aktivnog izdanja i tjedni raspored bez dupliciranja PR/main proizvođača. `nightly-codeql-inventory.yml` drži osnovnu liniju cijelog repozitorija odvojenom, sa `--strict-measurement` i greškom kada mjerenje nije dostupno. Graciozno preskakanje lokalnog kolekcionara ostavštine nije ulazak kandidata. Pooštravanje ostaje eksplicitni `--update` nakon potvrđenog nižeg globalnog broja.

Napredni tijek rada ne smije se objaviti dok je konfigurirana zadana postavka: GitHub odbija tu kombinaciju. Njegova verzirana politika ostaje na čekanju dok se pregledani administrativni prijelaz ne pročita. Prije objavljivanja, operater pribada repozitorij, head/base/tree, policy/patch/rollback hashove i promatrano stanje postavljanja; `node scripts/quality/codeql-producer.mjs verify-admin-readback` provjerava isporučene očekivane i stvarne JSON zapise. Ovo je tehnička zaštita, a ne odobrenje operatera ili zamjena za dohvaćanje novih povratnih informacija. PR token nikada ne zahtijeva administrativni pristup. Uvođenje i bilo koja promjena skenera zahtijevaju odvojeno čitanje plus pravi PR, račvanje i dokaz kompatibilnosti grupe spajanja.

Forkovi koriste hostirane pokretače, odjavu bez trajnih vjerodajnica, nema projekta install/build u producentu i nema naslijeđenih tajni repozitorija. GitHub podržava SARIF upload za događaj pull_request sa svojim smanjenim fork tokenom; Odobrenje izvršenja prvog doprinosa ostaje GitHub politika. Nikada nemojte koristiti pull_request_target za izvršavanje nepouzdanog koda. Potvrdite stvarna dopuštenja tokena, analysis_key i sva okruženja kategorija u kontroliranom kanarincu prije nego što smatrate da je migracija dovršena. [Fork upload pravila](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [sukobljeni načini postavljanja](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Otkazi su poziv operatera (Hard Rule #14)** — nikada ne odbacuje CodeQL upozorenje bez bilježenja tehničkog opravdanja u komentaru o odbacivanju: `won't fix` za zahtjev uzvodnog protokola, `used in tests` za testnu instalaciju, `false positive` za dezinfekcijsko sredstvo CodeQL ne može vidjeti (prethodno: `docs/security/ERROR_SANITIZATION.md`).

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

Svaka kontrola koja ne smije pasti zbog već postojećih kršenja koristi zamrznuti popis dopuštenih stavki
(npr. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Pravilo glasi:

**Otklonite temeljni uzrok; koristite popis dopuštenih stavki samo kada je kršenje već postojalo i
ne može se otkloniti u istom PR-u.**

Pri dodavanju stavke na popis dopuštenih stavki:

1. Dodajte komentar s obrazloženjem.
2. Navedite povezani problem za praćenje (npr. `// #3498 — Phase 2 feature, not yet implemented`).
3. Uklonite stavku u istom PR-u kojim se otklanja kršenje — zastarjela stavka koja više
   ne izuzima aktivno kršenje i sama je nedostatak (provjera zastarjelih pravila 6A.3
   past će zbog nepovezane stavke na popisu dopuštenih nakon što bude implementirana).

**Nemojte** dodavati stavke na popis dopuštenih kako bi testovi brže prošli. Uspješna kontrola uz rastući
popis dopuštenih stavki stvara lažan osjećaj kvalitete.

### Kada kontrola ne prođe na vašem PR-u

1. **Pažljivo pročitajte rezultat kontrole** — on vam točno govori koja datoteka ili simbol krši
   pravilo.
2. **Otklonite kršenje** — većina kontrola determinističke su provjere datotečnog sustava koje prolaze čim
   je kôd ispravan.
3. **Ako je kršenje već postojalo** (tj. niste ga vi uveli, ali ga kontrola sada
   obuhvaća): dodajte stavku na popis dopuštenih s komentarom koji sadrži obrazloženje i povezani problem za praćenje.
4. **Ako je kontrola zaporna** (pokrivenost, upozorenja ESLint-a, dupliciranje, složenost):
   vaša je promjena pogoršala metriku. Otklonite temeljni problem ili, u rijetkim slučajevima, pokrenite
   `npm run quality:ratchet -- --update` ako je promjena namjerna i pogoršanje metrike
   prihvatljivo — ali dokumentirajte razlog u opisu PR-a.
5. **Savjetodavne kontrole** (`continue-on-error: true`) informativne su — ne blokiraju
   spajanje, ali se prikazuju u sažetku CI-ja. Svejedno ih ispravite.

---

## Dodavanje nove kontrole

1. Izradite `scripts/check/check-<name>.mjs` (ili `.ts`). Kontrole pravila završavaju izlaznim kodom 0/1.
   Zaporne kontrole šalju metriku u `quality-metrics.json` putem `collect-metrics.mjs`.
2. Dodajte `"check:<name>": "node scripts/check/check-<name>.mjs"` u `package.json` i
   sinkronizirajte alias i njegovu točnu naredbu u `config/quality/gate-manifest.json`.
   Primijenite istu sinkronizaciju pri izmjeni ili uklanjanju postojećeg aliasa za provjeru valjanosti.
   Pokrenite `npm run check:gate-manifest`; pre-commit hook i klasifikacija promjena u CI-ju
   osiguravaju poštivanje ovog ugovora.
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

## Zaostatak racionalizacije (pregled ROI-ja — Fase 9 Onda 3)

Ovaj je popis usklađen s `ci.yml` 2026-06-17 (u prethodnoj su verziji izostavljeni
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Pregledom ROI-ja usklađenog skupa
utvrđeni su sljedeći kandidati za racionalizaciju. **Spajanja su mehaničke promjene CI-ja;
prebacivanja/uklanjanja odluke su o pravilima rezervirane za operatera.** Ništa od navedenog
još nije primijenjeno.

**Također nije dokumentirano iznad** (savjetodavno, niske informativne vrijednosti): posao `docs-lint` (markdownlint + Vale, cijeli posao `continue-on-error`) i samostalni radni tijekovi skenera `semgrep.yml` / `scorecard.yml`. CodeQL sada ima obvezne poslove proizvođača i prihvata pod `Gate / CI`, uz gore opisane zahtjeve aktivacije. `semgrepFindings: 0` nalazi se u `quality-baseline.json`, ali nije povezan s blokirajućim ratchetom u `ci.yml` — metrika je trenutačno nepovezana.

### Spajanje / uklanjanje duplikata (mehanički, niži rizik)

Svaki je kandidat provjeren u odnosu na aktivno stanje kontrolnih točaka 2026-06-17 (vjeruj, ali provjeri);
pokazalo se da nekoliko „očiglednih” spajanja skriva dug i **nisu** izravne zamjene bez rizika.

- **`check:docs-sync` izvodi se dvaput** — samostalno u poslu `lint` i ponovno unutar `check:docs-all` (`docs-sync-strict`) te u husky pre-commit kuki. ✅ **DOVRŠENO** — uklonjeno je samostalno pozivanje u poslu `lint`.
- **Skeniranje CVE-ova** — ❌ **NIJE jednostavno spajanje.** `audit:deps` blokira kritična upozorenja i nepotpune revizije u svih pet lockfileova, dok upozorenja visoke ozbiljnosti prijavljuje kao upozorenja u skladu s trenutačnim pravilima; `check:vuln-ratchet` (osv) ne uspijeva samo pri _regresiji_ u odnosu na prijavljenu referentnu vrijednost i odbija nedostajuća mjerenja kada su obvezna. Različita semantika — uklanjanjem `audit:deps` izgubila bi se apsolutna kontrolna točka za kritične probleme i neovisne potvrde revizije paketa. Zadržati oboje.
- **Otkrivanje ciklusa** — ✅ **DOVRŠENO** (#15159 G-01/G-02). Stari je tekst ovdje nazivao `check:cycles` „zelenom, kuriranom” kontrolnom točkom i opravdavao njegovo zadržavanje kao blokirajuće jer je `check:circular-deps` (dpdm) prijavljivao 91 ciklus. To zeleno stanje bilo je **lažno zeleno**: `check:cycles` skenirao je 5 poddirektorija (450 datoteka), prepoznavao samo statičke izraze `import|export … from` i odbacivao svaki specifikator `@/` i `@omniroute/open-sse/`, pa nije mogao uočiti cikluse dinamičkog uvoza i aliasa koji su prevladavali u repozitoriju. Ispravljeno: kontrolna točka sada prolazi kroz `src` + `open-sse` (5023 datoteke), prikuplja specifikatore iz TypeScript AST-a (tako da se `import("…")` broji, a `typeof import("…")` na poziciji tipa ne broji) i razrješava tsconfig `paths`. Pronalazi **14** ciklusa, a ne 0. Budući da se 14 postojećih ciklusa ne može ispraviti u PR-u kontrolne točke, `check:cycles` sada je **zaporni mehanizam** (`--ratchet`, gornja granica `metrics.cycles.value = 14` u `quality-baseline.json`, `direction: down`) — blokira svaku _regresiju_, a broj se može samo smanjivati. CI izvodi `npm run check:cycles:ratchet`. Postupno smanjivanje provodi se u sklopu **A-01**. `check:circular-deps` (dpdm) ostaje savjetodavan kao šire drugo mišljenje.
- **Složenost** — ✅ **DOVRŠENO** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): jedan ESLint prolaz, brojanje prema ruleId-u kako bi ciklomatske vrijednosti + maksimalni broj redaka i kognitivne referentne vrijednosti ostale neovisne; pojedinačne naredbe `check:complexity` / `check:cognitive-complexity` ostaju za lokalni `--update`.
- **Sprječavanje halucinacija za `/api`** — ✅ **DOVRŠENO** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): jedan FS popis za `src/app/api`, openapi-routes + docs-symbols i dalje izvještavaju neovisno; pojedinačne naredbe ostaju za lokalna pokretanja.
- **`check:node-runtime` izvodi se u 11 poslova** — ⚠️ **nizak ROI.** Svaki se izvršava na zasebnom runneru, a provjera traje <1 s; ukupna ušteda iznosila bi ~10 s, uz gubitak jeftine zaštite po poslu. Nije vrijedno previranja.
- **`typecheck:noimplicit:core` u CI lint poslu** — ✅ **uklonjeno iz lint posla** (bilo je savjetodavno uz `continue-on-error`); blokirajuću površinu tipova čine `typecheck:core` + `check:type-coverage`. Lokalna skripta je zadržana.

### Prebacivanje / odluka (pravila operatera)

- `check:openapi-security-tiers` (savjetodavno) — ❌ **NIJE moguće jednostavno prebaciti.** Završava s 0, ali upozorava da nekoliko ruta `traffic-inspector` pod `LOCAL_ONLY_API_PREFIXES` nema anotaciju `x-loopback-only: true`. Za njegovo provođenje potrebno je najprije dodati te anotacije u `openapi.yaml`.
- `typecheck:noimplicit:core` (savjetodavno) — uglavnom ga obuhvaća blokirajući zaporni mehanizam `check:type-coverage`. Prebaciti na zaporni mehanizam ili ukloniti redundantni drugi prolaz naredbe `tsc`.
- `test:vitest:ui` (sada **blokirajuće**) — postojeći neuspjesi izričito su izuzeti u `vitest.config.ts` s komentarima za praćenje `// #8618`; novi neuspjesi uzrokuju neuspjeh posla.
- `check:secrets` (gitleaks, blokirajući zaporni mehanizam) — trenutačna gornja granica jest `metrics.secretFindings` u `quality-baseline.json`. Svaka iznimka zahtijeva opravdan unos u `.gitleaks.toml`; nedostupno mjerenje ima status INCOMPLETE. Skeniranje nadopunjuje GitHubovo ugrađeno skeniranje tajni i `check:public-creds`.
- `check:pr-evidence` (blokirajuće, pretražuje prozni tekst tijela PR-a) — visok rizik od lažno pozitivnih rezultata; uklanjanje slabi provedbu strogog pravila br. #18, stoga je ovo stvarna odluka o pravilima.
- `semgrep` (savjetodavno samostalno) — preklapa se s CodeQL-om za OWASP obitelji; povezati njegovu referentnu vrijednost sa zapornim mehanizmom ili ga ukloniti.

---

## Povezana dokumentacija

- Lanac opskrbe (podrijetlo, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — kontrola podudarnosti skupova ključeva

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, zadatak `i18n-ui-coverage`).
Uspoređuje skup krajnjih ključeva svake datoteke `src/i18n/messages/<locale>.json` s datotekom
`en.json` i prijavljuje neuspjeh za svaki ključ koji nedostaje ili je suvišan, bez obzira na to
kada je ključ dodan. Rezervirana mjesta `__MISSING__:` smatraju se prisutnima (njihov je sadržaj
predmet kontrole omjera). To je apsolutna dopuna dviju kontrola temeljenih na razlikama/postocima:
`check-ui-keys-coverage` nameće donju granicu od 80 % po lokalizaciji (43 ključa koja nedostaju od
njih ~13.000 i dalje daju 99,7 %), a `check-new-key-coverage` procjenjuje samo ključeve koje PR
dodaje u `en.json`. Skup lokalizacija generira se iz verzije datoteke `en.json` aktualne na dan
stvaranja njegove grane te se prevodi danima dok se u osnovnu granu nastavljaju dodavati ključevi;
PR skupa sam ne dodaje nijedan ključ, pa su obje srodne kontrole ostale tihe kada je skup 1
(#13044) spojen s manjkom od 43 ključa u devet lokalizacija, a skup 2 (#13660) s manjkom od 10
ključeva u osam lokalizacija (2026-09-15). Neuspješnu kontrolu ispravite naredbom
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; krajnji ključ označen
kao `extra` znači da je uklonjen iz izvora — izbrišite ga iz lokalizacije. `--warn` izvješćuje bez
prijave neuspjeha. `--catalog=cli` pokreće istu usporedbu nad `bin/cli/locales`
(`npm run i18n:check-keys:cli`); oba se koraka nalaze u zadatku `i18n-ui-coverage`.

#### `check-new-key-coverage` — i18n kontrola novih ključeva

Srodna je kontroli `check-ui-value-drift`. Ta kontrola otkriva englesku vrijednost koja je
**prepisana**, dok su njezini prijevodi ostali neizmijenjeni; ova otkriva engleski ključ koji je
**dodan**, dok ga neke lokalizacije nikada nisu dobile.

`check-ui-keys-coverage` ne može otkriti ovaj slučaj: nameće donju granicu postotka po
lokalizaciji, a jedanaest ključeva koji nedostaju od njih ~13.000 ostavlja pokrivenost na 99,9 %.
Postotak po jeziku ne može izraziti „ova je funkcionalnost izdana bez prijevoda” — cijela
funkcionalnost može biti uvedena u novoj lokalizaciji bez ikakvog teksta, a da se broj nikad ne
promijeni.

Incident koji bilježi: 3. faza Orchestration Canvasa prevela je svojih jedanaest ključeva u 42
lokalizacije koje su tada postojale. Nekoliko sati poslije skup jezika EU-a (#13044) povećao je
broj lokalizacija u repozitoriju na 51, a devet novih (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`,
`sl`, `sr`) nikada ih nije dobilo. `deepMergeFallback` zamjenjuje odsutan ključ engleskim tekstom,
pa je način kvara bilo neprevedeno korisničko sučelje umjesto praznog korisničkog sučelja —
stvaran problem koji po samoj konstrukciji ostaje neprimijećen.

Kao i srodna kontrola, ona je **svjesna razlika**: uspoređuje engleski na osnovi spajanja s radnim
stablom, pa postojeće praznine ostaju zamrznute i za uključivanje kontrole nije bila potrebna
migracija.

**Oznaka `__MISSING__:<english>` ne zadovoljava kontrolu (od 2026-09-17).** Prije je bila
dokumentirani način odgode — izvođenje se vraća na ispravan engleski tekst — sve dok osam PR-ova
s funkcionalnostima 2026-09-16 nije dodalo 61 ključ i postavilo oznaku u svih 65 lokalizacija
umjesto prevođenja: ova je kontrola prihvatila svaki od njih, ništa nije blokiralo PR-ove, a
blokirajuća kontrola omjera stvarnih prijevoda zatim nije prošla na vrhu izdanja ni za koga
(pt-BR 3,2 % > 2,5 % + 0,5). Oznaka se sada smatra odsutnim prijevodom. Neuspješnu kontrolu
ispravite naredbom
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` ili
sve lokalizacije obradite paralelno naredbom `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, sigurna pri odvojenom izvođenju, odbija se pokrenuti bez
varijabli okruženja `OMNIROUTE_TRANSLATION_*`). Ključ koji mora ostati na engleskom (fiksirani
naziv proizvoda/mehanizma/zastavice) pripada u `scripts/i18n/untranslatable-keys.json`, nikada iza
oznake. `vi` u potpunosti zabranjuje oznake (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — kontrola odloženih testova

Datoteka na popisu `exclude` u `vitest.config.ts` test je koji se ne izvodi, a svakome tko
pregledava stablo izgleda kao pokrivenost. Šezdeset dvije datoteke nakupile su se iza komentara
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Problem #8618 zatvoren je
2026-08-11, dok je popis koji je pratio narastao s 45 na 62 stavke, pri čemu je svaka nova
naslijedila komentar koji je upućivao na zatvoren problem. Kada je popis napokon izmjeren datoteku
po datoteku (#13204), **51 od 62 testa prošao je na trenutačnom stablu bez ikakve promjene
izvornog koda**.

Kontrola zahtijeva da svako izuzimanje koje se razrješava u stvarnu datoteku (a) navede problem
za praćenje i (b) bude navedeno u `config/quality/vitest-exclusions.json` sa svojim izmjerenim
statusom, tako da dodavanje izuzimanja bude pregledna razlika u namjenskoj datoteci, umjesto još
jednog retka u polju sa 60 stavki. Namjerno ne pokreće ponovno izuzete testove — to traje približno
10 minuta i pripada periodičnom zadatku; inventar bilježi kada je svaki od njih posljednji put
izmjeren.
