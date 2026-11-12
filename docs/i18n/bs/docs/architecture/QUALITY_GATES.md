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

## Inventar kapije i profili izvršenja

### Prijem kandidata

CI i Quality Gates radni tok svaki daje stabilnu presudu: `Gate / CI` i `Gate / Quality`. Njihova verzionirana politika prijema nabraja svaki prethodni posao prema potrebi ili savjetu. Primjenjivi traženi posao mora uspjeti: nedostaje, otkazan, preskočen, na čekanju i nepoznati rezultati ne mogu uspostaviti PASS. Važeća klasifikacija samo za dokumente ili samo za katalog može učiniti traku koda neprimjenjivom; običan nacrt PR nije prihvaćen kandidat. `hotfix` oznaka ne odustaje od dokaza.

Oba toka rada pokrivaju PRs u main/release grane, potiskuje u `main`, ručno otpremanje i događaje spajanja grupe. Push, dispatch i merge-group pokreću punu selekciju. Pouzdani nacrt reda Mergify također pokreće primjenjive `full-code`/`full-code-e2e` poslove; obični PRs ih preskoči. Prije ručnog spajanja, pokrenite potpunu otpremu na točno određenom kandidatu. Guranje u `release/**` ne pokreće ove tokove rada; Release-Green posmatra spojenu bazu odvojeno (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks i stapanje grupe koriste hostovane runnere za poslove koji inače biraju samo-hostovane runnere; dovoljan hostovani kapacitet se mora provjeriti prije uvođenja.

Običan PR pokreće brzu selekciju. `full-code` i `full-code-e2e` trake politike prijema (E2E, integracija, artefakt paketa, Electron smoke, Bun SQLite, klijenti ekosistema i protokola) rade samo na nacrtu reda za spajanje ili na punom pokretanju: `gh workflow run ci.yml --ref <branch>`.

Svaki JSON račun identifikuje odjavljeni SHA, radni tok i pokušaj. CLI odbija checkout/event SHA neusklađenost. Testovi toka posla vezuju članstvo u politici za `needs` listu posla presude tako da nova ili uklonjena traka ne može tiho nestati. Računi pokrivaju njihov vlastiti tok rada, a ne objavljivanje, implementaciju ili unutrašnje dijelove postojećeg savjetodavnog skenera. Izvršavanje primjenjivih provjera potrebnih u pravilima podružnice je posebna administrativna promjena; definisanje njihovih poslova samo po sebi ne štiti granu.

`API Route Typecheck` je nezavisna provjera toka posla, izvan obje zbirne presude i statičkog profila lokalnog punog posmatrača. Pregledajte njegov rezultat posebno za tačnog kandidata. `.github/workflows/api-route-typecheck.yml` radi na PRs u `main` ili `release/**`, gura u bilo koju familiju grana, ručno otpremanje i `merge_group` događaje tipa `checks_requested`. Nema filter putanje. Spajanje grupa provjeri `merge_group.head_sha`; ostale događaje pogledajte `github.sha`. Svi događaji koriste iste API dijagnostičke kapije i testove jedinice kapije. PR bazni retargeti traže novu provjeru; body/title uređivanja koriste naziv samo za promatranje `Admission not requested / API Route Typecheck` i ne mogu zamijeniti provjeru prijema.

### Zadržani dokazi u reduktoru prihvata

`scripts/quality/validate-release-acceptance.mjs` smanjuje isporučeni plan i njegove manifeste; ne utvrđuje da plan pokriva kompletan cevovod za oslobađanje. Njegovi izvještaji eksplicitno postavljaju `releaseAcceptance: false`, čak i kada je taj plan `VERIFIED`. `release-acceptance.yml` radni tok i dalje koristi zasjenjene postavke, a ne priznanice stvarne izrade, paketa, pokretanja ili promocije.

CLI zahtijeva `--evidence-root` da provjeri zadržane dokaze. Datoteke se rješavaju kao `<evidence-root>/<artifact_id>/<member>` i heširaju kao SHA-256. PASS zapis bez dokaza, datoteka koja nedostaje ili je promijenjena, nesigurna putanja ili simbolična veza sprječava verifikaciju. Fajlovi koji nedostaju nisu ekvivalentni praznim uspješnim zapisnicima. Postojeće SHA/run/attempt provjere ostaju nezavisne: odgovarajući bajtovi ne mogu spasiti zastarjeli račun. Integritet datoteke nije dokaz autentičnosti izvršenja ili promocije artefakta.

### DAST koristi provjerenu CI verziju

Traženi `dast-smoke` CI posao poziva `.github/workflows/dast-smoke.yml` nakon `build`. Slijedi isti code/draft izbor kao i build, uključujući podržani fork PRs, cilj izdanja PRs i grupe spajanja. Nedostajući, neuspjeli, otkazani ili neočekivano preskočeni DAST blokovi posla `Gate / CI`. Tok posla za višekratnu upotrebu nema nezavisni PR/dispatch okidač; ručna provjera valjanosti koristi CI-ovo slanje tako da izrada i potrošač ostaju u jednom pokretanju.

`scripts/ci/next-build-provenance.mjs` zapečati kompletan Next artefakt sa svojim tar digestom, repository/event/run, pokušajem proizvođača, head/base/checkout/tree, identitetima toka posla, lockfileom, tačnim čvorom version/ABI, platformom i paketom. DAST odabire nepromjenjivi artefakt ID iz `needs.build.outputs`, zahtijeva verifikaciju sažetka preuzimanja i neovisno hešira ZIP u sažetku proizvođača prije nego što ekstrahuje svoja dva dozvoljena člana putem `scripts/ci/unpack-ci-build.py`. Manifest i tar arhiva također moraju odgovarati nezavisnim izlazima proizvođača prije nego što se ekstrahira sljedeće stablo. Nikada ne traži najnoviju uspješnu građu. Djelomično ponavljanje može ponovo koristiti isti pokušaj proizvođača kada se njegov ID i svi inputi i dalje podudaraju; račun bilježi oba pokušaja.

Potrošač ostaje na hostiranom Linux runneru s dozvolom spremišta samo za čitanje i bez tajni spremišta. Instalira tačnu verziju Node proizvođača, a zatim sastavlja CLI sa `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` odbija samostalni server koji nedostaje prije bilo kakve zamjenske gradnje; normalne lokalne CLI verzije zadržavaju svoj postojeći rezervni. Spremnost servera, Šemateza i promptfoo moraju uspjeti unutar nepromijenjenog ograničenja posla od 25 minuta. Potvrda o porijeklu dokazuje ulazni identitet i bajtove, a ne uspješno DAST skeniranje. Istek artefakta, prekid pokretača ili neispravan skener ostaju nepotpuni ili neuspješni dokazi; ne može postati PASS kroz savjetodavni omot.

### Izvršni kapacitet UI

CI pokreće cijeli UI inventar kao četiri `test-vitest` matrice, svaka sa najviše dva radnika po šardu i postojećim rokom za posao od 15 minuta. Prvi dio također pokreće MCP/autoCombo Vitest paket. Traženi rezultat posla pokriva svaku nogu matrice; neuspjeh ili otkazivanje jednog dijela ne može utvrditi prijem kandidata.

Noćni posmatrač zadržava posebnu potvrdu o tačnom kandidatu za svaki UI dio, uključujući izvršenje MCP u prvom prijemu. Potrebna su sva četiri računa, evidencije i odgovarajući identiteti izvršenja. Lokalni `npm run test:vitest:ui` i dalje bira kompletan paket; jedan `--shard` test je samo delimičan dokaz.

### Naplata pokrivenosti jedinica

Dvanaest komada jedinica prikuplja V8 pokrivenost tokom njihovog postojećeg izvođenja testa. Uspješan dio pokreće `scripts/ci/compact-v8-coverage.mjs` kako bi komprimirao originalne datoteke bez generiranja intermedijarnog izvještaja o Istanbulu. Konačni posao pokrivenosti provjerava svih dvanaest manifesta u odnosu na kandidat SHA, vrijeme izvođenja, izvorni korijen i hashovi podataka, zatim pokreće c8 reportere i postojeće pragove pokrivenosti. Ulazi zadržavaju c8 globalni redosled imena fajla; Prethodno spajanje po komadu nije sigurno za mješovitu function/block pokrivenost. Nedostajuće, deformisane ili nekompatibilne krhotine ne prihvaćaju se. Neuspjeli testni dijelovi zasebno zadržavaju neobrađenu dijagnostičku pokrivenost; ne može ući u konačno spajanje.

### Potvrde o napretku izvršenja jedinice

Zajednička `test:unit:ci:shard` naredba bilježi `primary`, `dashboard` i `serial` faze kroz `scripts/ci/unit-progress-reporter.mjs`. Uobičajeni izvještaj o testiranju ostaje dostupan. Zasebna priznanica koja sadrži samo metapodatke bilježi početak i završetak svake datoteke, a otkucaj srca od 30 sekundi navodi datoteke koje su još aktivne i njihovo proteklo vrijeme. Zapisuje samo metapodatke izvršenja sa liste dozvoljenih; opisi testa, izlaz, tijela grešaka i cijelo okruženje nisu serijalizirani.

CI zadržava JSONL datoteke kao `unit-progress-ci-<run>-<attempt>-<shard>`. Vremensko ograničenje posla može spriječiti kasnije učitavanje; otkucaji srca koji su već emitovani ostaju dijagnostički dokaz. Nedostatak otkucaja srca takođe može odražavati blokiran ili prekinut proces trkača. Ovi računi čuvaju postojeći izbor testa, istovremenost, rokove i izlazni status; nisu presude za prijem kandidata.

### Red za spajanje

`queue` oznaka šalje PR u red za spajanje (`.mergify.yml`). Objedinjavanje otvara nacrt PR na `mergify/merge-queue/` grani, CI tamo pokreće punu selekciju, a originalni PR se spaja kada `Gate / CI`, `Gate / Quality` i `Merge integrity (changelog + generated skills)` prođu.

Mergify upisuje svoj sažetak reda u opis nacrta. Body/title-only `pull_request` `edited` događaji koriste grupu konkurentnosti specifičnu za izvođenje i ne pokreću ponovo klasifikaciju, matrice testiranja, integritet spajanja ili presudu o prijemu. Imena provjera samo za promatranje ne mogu zamijeniti `Gate / CI` ili `Gate / Quality`. Uređivanje koje mijenja ciljnu bazu zahtijeva novu validaciju kandidata.

Nakon dequeua, guranje ne stavlja uvijek u red PR. Komentirajte `@mergifyio queue` na to.

### Statički inventar skeniranja

Versionirani npm-alias inventar i članstvo u statičkom skeniranju žive u `config/quality/gate-manifest.json`. Pokrenite `npm run check:gate-manifest` da potvrdite imena skripti i tačne komande u odnosu na `package.json`; dodavanja, uklanjanja i drift naredbi ne uspijevaju i lokalni zakačci i poslovi promjene-klasifikacije u CI. Alias nije posao toka posla, instanca matrice ili testni slučaj: ovi brojevi ne smiju biti predstavljeni kao zamjenjivi.

Koristite `npm run quality:scan -- --list` ili `npm run quality:scan:fast -- --list` za pregled odabranih alijasa bez njihovog izvršavanja. Runner poziva npm ulaznu tačku, tako da je njegovo vrijeme izvođenja (uključujući Bun gdje je konfigurirano) sačuvano. Manifest bilježi pseudonime izvan tih profila kao zasebno pozvane, a naredbe održavanja su zabranjene u profilima skeniranja samo za čitanje.

Ovi profili pokrivaju samo statičko skeniranje. Oni ne potvrđuju testove proizvoda, pokrivenost, pakovanje, eksterne provjere ili potpuno prihvaćanje od strane kandidata. Prijem toka posla koristi povezane `config/quality/admission-policy.json` i `scripts/quality/admission-verdict.mjs`. Profili posmatrača oslobađanja ostaju odvojeni; nezavisno pregledaju njihove primjenjive čekove i račune. Pune statičke komande promatrača su deklarirane u `config/quality/release-green-static-profile.json`, uključujući `audit:deps`, odabir testa mutacije i provjere prijevoda. Učitavač potvrđuje npm komande u odnosu na package.json i modelirane CI/Quality deklaracije; on odbija drift umjesto da izvršava shell tokene kao argumente. Potreban SKIP/INCOMPLETE izlaz skenera ne može uspostaviti PASS. Profil bilježi svoja eksterna isključenja i ne zamjenjuje hostovanu pokrivenost, testne matrice, paket ili dokaze o implementaciji. Prozni inventar ispod je referenca, a ne dokaz da je kapija zaista prošla.

Skripte žive pod `scripts/check/` (policy gates) i `scripts/quality/` (ratchet engine). CI izvor istine je `.github/workflows/ci.yml`.

### Zdravlje objavljene baze dokumentacije

`.github/workflows/i18n-base-health.yml` promatra stanje dokumentacije nakon odabranih guranja u `main` i `release/v*`, te prilikom ručnog slanja. Njegovi filteri pokrivaju dokumentaciju, root Markdown, `llm.txt`, prevod state/configuration i relevantne i18n alate. Jedan `Published base documentation health` posao koristi hostovani Ubuntu i rok od pet minuta. Izvodi validaciju samo za čitanje i piše dijagnostičku potvrdu bez instalacije zavisnosti, prijevoda ili usvajanja stanja.

`scripts/i18n/check-base-health.mjs` zahtijeva nultu nedosljednost izvornog hasa, nedostajućeg cilja, ciljanog heša, zastarjelog prijevoda i predmemorije odjeljka. Također potvrđuje trenutni osnovni document/locale opseg i njegovo zabilježeno porijeklo. Nevažeći kontekst, nepotpuna pokrivenost ili prekinuta provera proizvodi `INCOMPLETE`; potvrđeni drift proizvodi `FAIL`. Oba vraćaju neuspješan izlazni status. Potvrda je vezana za odjavu SHA, radni tok, pokretanje i pokušaj i zadržava se kao `i18n-base-health-<sha>-<run>-<attempt>`.

Ovo je nezavisno posmatranje objavljene baze. Ne dodaje događaj PR ili spajanje grupe, potrebnu PR provjeru, npm alias ili člana profila statičkog skeniranja. Osnovni kontrolor takođe blokira svih pet klasa u apsolutnom režimu. Uobičajena priprema PR ostaje odvojena od prijema. Uspješno otpremanje ne može pretvoriti neuspjeli zdravstveni rezultat u PASS.

Obični PR koristi `--preflight` sa osnovnim izvještajem koji generira `--baseline-evidence`. Može ostaviti engleski izvor na čekanju samo kada su kompletan zapis prijevoda i stvarni ciljni bajtovi nepromijenjeni u odnosu na tačnu bazu. Novi cilj ili nedosljednosti predmemorije odjeljka i dalje blokiraju, a nepotpuni dokazi ne mogu odobriti pripremu. Izveštaj razotkriva `preparationPending` i `mergeReady` odvojeno: uspešna priprema ne čini prevode na čekanju spremnim za spajanje. Osvježite zahvaćena ogledala u sastavljenom kandidatu prije prijema. Pouzdani kandidat za red čekanja Mergify, `merge_group`, potiskivanje grana i ručna CI izvođenja koriste apsolutni provjeravač, bez `--warn` ili oprosta naslijeđenog neuspjeha. Nedostajući ciljni hashovi i opseg smanjen zbog izbrisanih snimljenih osnovnih datoteka ne mogu proizvesti uspješnu apsolutnu presudu.

### Izdanje PR brze staze (`quality.yml`)

`.github/workflows/quality.yml` dopunjuje CI na main/release PRs, gura u `main`, otprema i spaja grupe. PRs koristi brze provjere filtrirane putem. Trajno onemogućena duplirana verzija je uklonjena; pravi build/package/boot čekovi ostaju u CI. Jedinica i vitest rade samo u CI (`Unit Tests (N/12)` i `Vitest`).

| Posao                                            | Obim                                                                                                                                                                                                          | Blokiranje               |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API dokumenti refs i docs-all                                                                                                                                                                  | Da                       |
| `Fast Quality Gates`                             | Šifra PRs; statičke provjere, tipska provjera, provjera tipa kontrolne ploče, testiranja jedinica pod utjecajem                                                                                               | Da                       |
| `Forgotten sibling tests`                        | Šifra PRs; promijenjeni moduli praćeni statičkim potrošačima i kandidatskim testovima; staze barela i dinamičkog uvoza se prijavljuju kao savjetodavna dijagnostika, sa izuzecima liste dozvoljenih referenci | **Savjetodavno**         |
| `No new ESLint warnings`                         | Šifra PRs; štitnik od dlačica koji je svestan supresije                                                                                                                                                       | Da, uključujući viljuške |
| `Merge integrity (changelog + generated skills)` | PRs bez nacrta ; dnevnik promjena i generirana sinhronizacija vještina                                                                                                                                        | Da, uključujući viljuške |

#### Zaboravljeni izvještaj o testovima

`npm run check:forgotten-sibling-tests` radi kao savjetodavni korak `Fast Quality Gates` a i ponovo koristi razrješavač uvoza iza mape probnog utjecaja. Za svaki promijenjen proizvodni modul, prijavljuje determinističke `changed module/symbol -> static consumer -> candidate sibling test` lance kada test kandidata izostane iz razlike zahtjeva za povlačenjem. Sažetak Markdowna i JSON rezultat zadržavaju se kao artefakt `forgotten-sibling-tests` toka posla za kalibraciju prije bilo kakvog uvođenja blokiranja.

Ponovni izvoz barela i dinamički uvoz samo su dijagnostika rezolucije; oni nikada ne stvaraju blokirajući nalaz. Recenzirani izuzeci uživo u `config/quality/forgotten-sibling-allowlist.json`. Svaki unos mora imenovati test potrošača i kandidata, dati specifično obrazloženje i povezati GitHub problem ili zahtjev za povlačenjem. Pogrešno oblikovani unosi nisu uspjeli zatvoriti. Izuzeci ne mogu potisnuti obrisani test kandidata ili diff koji dodaje `.skip`/`.todo`; Slabljenje tvrdnji i drugo maskiranje ostaju u vlasništvu `check:test-masking` kapije koja nezavisno blokira.

### Posao: `lint`

Radi na svakom PR do `main`. Blokovi se spajaju u slučaju kvara.

| Skripta (`npm run ...`)           | Validates                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Blokiranje                                   |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Node.js verzija je unutar podržanog raspona                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Da                                           |
| `check:cycles`                    | Cirkularni uvoz u cijelom `src/` + `open-sse/` (zasnovano na AST, riješen tsconfig `paths` ). Goli izlazi 1 kad god postoji bilo koji ciklus (neuspješno zatvoren od #15281) i navodi SCCs. `check:cycles:ratchet` (šta CI pokreće) blokira kada broj premaši `metrics.cycles` plafon u `quality-baseline.json` — trenutno 14, `direction: down`, tako da može samo pasti (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | da (čegrtaljka)                              |
| `check:boundary`                  | `open-sse → src` spajanje: jedinstveni uvoz datoteke u datoteku iz motora u aplikaciju (`scripts/quality/measure-boundary.mjs`; lista rubova je v4 core/module-split zaostatak sanacije). Goli = savjetodavni izvještaj (isto kao `quality:boundary`). `check:boundary:ratchet` (ono što CI pokreće, takođe u `quality.yml` petlji brze kapije) se blokira kada broj premašuje `metrics.boundaryOpenSseToSrc` plafon u `quality-baseline.json` — zadatom na izmerenom 771, `direction: down`; `--update` ga samo snižava; bazni relativni na PRs (`--base-ref`, vidi dolje)                                                                                                                                                                                                                                                                                                                                                                                                | da (čegrtaljka)                              |
| `check:route-validation:t06`      | Zod šeme prisutne na svim rutama (pravila Nivo 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `check:any-budget:t11`            | `@ts-expect-error // any` broj ne prelazi budžet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                           |
| `check:provider-consistency`      | Svaki provajder u `providers.ts` ima odgovarajući unos u `providerRegistry.ts` (i obrnuto, unutar liste dozvoljenih)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                           |
| `check:model-lifecycle`           | Tri ručno održavane tablice rutiranja ostaju konzistentne sa prijavljenom slikom životnog ciklusa (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ne postiže nijedan povučeni ID koji `REGISTRY` može usmjeriti; svaki `BUILT_IN_ALIASES` cilj je prisutan u `REGISTRY` i odsutan je iz snimka povučene ID-ove; svaki penzionisani ID koji je još uvijek u `REGISTRY` se prosljeđuje ili navodi u `allowedRetiredInCatalog`; i nijedan `DEFAULT_DEGRADATION_MAP` izvor ili cilj se ne pojavljuju povučeni u tom snimku. Ovo ne dokazuje da se model trenutno opslužuje uzvodnim putem uživo. Offline — se poredi sa `config/quality/model-lifecycle.json`, osvježenim ručno pomoću `npm run quality:refresh-model-lifecycle` (mreža; nije spojen na CI). `allowedRetiredInCatalog` je zaporni mehanizam: dodajte unos samo s problemom praćenja.                                                                                                                              | Da                                           |
| `check:fetch-targets`             | Svaki `fetch("/api/...")` u `src/` -u na strani klijenta rješava se u pravi `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `check:deps`                      | Svi `npm install` -able depovi u svakom `package.json` u repo su u `dependency-allowlist.json`; označeni novi otkvačeni ili neuređeni paketi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                           |
| `audit:deps`                      | npm revizija svih pet nezavisnih zaključanih datoteka (root, Electron, OpenCode dodaci v1/v2 i provajder). Blok kritičnih savjeta; visoki savjeti ostaju vidljiva upozorenja. Missing/failed revizije su INCOMPLETE i blok; hešovi zaključavanja i izvještaji po opsegu se zadržavaju.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `check:lockfile`                  | `package-lock.json` integritet — https registar, hešovi integriteta, bez zamjene hosta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `check:licenses`                  | SPDX lista dozvoljenih licenci za proizvodne zavisnosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:tracked-artifacts`         | Nema artefakata građenja/povezanih `node_modules` simboličnih veza (takođe radi u husky pre-commitu; pre-push je namjerno lagan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                           |
| `check:ai-attribution`            | Nema prikolice AI/bot `Co-Authored-By` ili podnožja AI-generacije u PR, naslova ili tijela — tvrdo pravilo #16 (u `quality.yml` petlji brzih vrata za PR→ `release/**` — čita sadržaj događaja, bez-op off PRs — PR `ci.yml` → `commit-msg` `main`; udica je dozvoljena #14436                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:vitest-exclusions`         | Svako Vitest izuzimanje imenuje problem praćenja i pojavljuje se u `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                           |
| `check:file-size`                 | Izvorni fajlovi (`.ts`/`.tsx` u `src/`, `open-sse/`, `electron/`, `bin/`) ostaju unutar `cap`, a test fajlovi (`*.test.ts(x)`) unutar `testCap`; datoteke zamrznute u `file-size-baseline.json` (`frozen` / `testFrozen`) ne smiju prerasti svoju snimljenu veličinu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                           |
| `check:error-helper`              | Odgovori na greške u executors/handlers koriste `buildErrorBody()` / `sanitizeErrorMessage()` (tvrdo pravilo #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `check:migration-numbering`       | SQL datoteke za migraciju su sekvencijalno numerisane, bez praznina ili duplikata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `check:public-creds`              | Nema literalnih OAuth `client_id`/`client_secret` ili Firebase web ključeva izvan `publicCreds.ts` (tvrdo pravilo #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `check:db-rules`                  | Nema sirovog SQL izvan `src/lib/db/` modula; nema uvoza barela iz `localDb.ts` (tvrda pravila #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                           |
| `check:known-symbols`             | Izvršioci provajdera, strategije usmjeravanja i prevoditelji registrirani u njihovim tablicama otpreme odgovaraju datotekama na disku — bez napuštenih ili nedeklariranih simbola                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `check:route-guard-membership`    | Svaka ruta koja pokreće podređeni proces je klasifikovana po `isLocalOnlyPath()` (tvrda pravila #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                           |
| `check:test-discovery`            | Svaki `*.test.ts` / `*.spec.ts` fajl u repo-u prikuplja najmanje jedan test pokretač (ratchet: lista siročadi u `test-discovery-baseline.json` može se samo smanjiti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                           |
| `check:test-tla-order`            | Nijedan `node:test` fajl pod `tests/unit` ne registruje test, pogodi `await` najvišeg nivoa, a zatim registruje više (#18045; ratchet: `test-tla-order-allowlist.json` može samo da se smanji)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                           |
| `check:agent-skills-sync`         | Generirani artefakti vještina agenta odgovaraju njihovom izvornom katalogu (bez pomaka)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | Provajder logos/assets nosi zabilježeni unos porijekla                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `lint:json`                       | JSON konfiguracioni fajlovi analiziraju i zadovoljavaju pravila repo linta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `typecheck:core`                  | TypeScript kompilacija bez grešaka (samo savjetodavna upozorenja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `typecheck:noimplicit:core`       | Strogi `noImplicitAny` — usmjeren prema budućnosti; mnogim već postojećim stranicama za pozive i dalje su potrebne napomene                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **Savjetodavno** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` u opsegu do `src/app/(dashboard)/**` (#7033) — `typecheck:core`-ova kurirana lista dozvoljenih datoteka od 27 datoteka ne uključuje nijednu kontrolnu tablu TSX, a `next build` je također nikada ne provjerava (`next.config.mjs` postavlja `ignoreBuildErrors: true`), tako da su regresije siročeta identifikatora tamo (#6625/#6909) bile nevidljive za CI. Razlike u odnosu na zamrznutu osnovnu liniju brojanja per-file/per-TS-code (`config/quality/dashboard-typecheck-baseline.json`, isti obrazac zastarjele primjene kao `check:known-symbols`) — samo NEW greške izvan osnovnog brojanja ne uspijevaju na kapiji; pričvrstite sa `--update` kada se popravi već postojeća greška.                                                                                                                                                                                                                                                                       | Da                                           |
| `check:build-typecheck`           | Provjera tipa proizvodnje cijele aplikacije preko `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), površinske `typecheck:core` liste dozvoljenih datoteka od 27 datoteka i kapije kontrolne ploče ne pokrivaju. Razlike u odnosu na `config/quality/build-typecheck-baseline.json`; novi ili povećan broj po (datoteci, kodu) ne uspijeva, manji broj traži od vas da zategnete. `--update` odbija dok izvođenje sadrži novi ili podignuti par osim ako `--force-regressions` nije proslijeđen, i odbija novoutišani fajl osim ako se `--force-nocheck` ne prođe, tako da su proširenje osnovne linije da bi se dobilo zeleno i davanje trajne tišine dva odvojena namjerna čina. Goli `--force` je odbijen. Također skenira opseg izgradnje za `@ts-nocheck` protiv `config/quality/ts-nocheck-baseline.json`, jer datoteka koja ga koristi ne prijavljuje nikakvu dijagnostiku i inače bi bila nevidljiva za svaku kapiju. | Da                                           |

#### Dva programa za provjeru tipa odgovaraju različito

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) i `check:build-typecheck` kompajliraju različite programe pod različitim opcijama, i isti fajl može biti čist u jednom i pun grešaka u drugom.

`tsconfig.build.json` postavlja `"strict": false`, tako da je `noImplicitAny` isključen. Osnovna konfiguracija kompajlira odabranu listu dozvoljenih datoteka od 27 datoteka sa strožim opcijama i prati grafikon uvoza svakog unosa, tako da se datoteke koje se nikada ne pojavljuju u programu za pravljenje i dalje tamo provjeravaju.

Posljedica je bitna kada se procjenjuje da li je datoteka otkucana:**nula dijagnostika pod `check:build-typecheck` ne znači nula** . Uklanjanje `@ts-nocheck` iz 26 fajlova pokazalo je da su 23 od njih čista u programu za pravljenje; šesnaest od njih je isplivalo oko 120 implicitnih – bilo koja greška u strogom. Provjerite oba prije pozivanja datoteke clean.

### Posao: `quality-gate`

Radi nakon `test-coverage`. Blokovi se spajaju u slučaju kvara.

| Skripta                      | Validates                                                                                                                                              | Blokiranje                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `quality:collect`            | Emituje `quality-metrics.json` (ESLint broj upozorenja, pokrivenost iz izvještaja spojenog dijela)                                                     | Da (uzvodno od čegrtaljke) |
| `quality:ratchet`            | Svaka metrika u `quality-baseline.json` nije regresirala (ESLint upozorenja ≤ osnovna linija; pokrivenost ≥ osnovna linija)                            | Da                         |
| `check:duplication`          | Dupliciranje koda (jscpd@4) ne prelazi osnovnu liniju u `quality-baseline.json`                                                                        | Da                         |
| `check:complexity`           | Ciklomatska složenost na nivou datoteke ne prelazi ograničenje (jezgro ESLint `complexity` + `max-lines-per-function`)                                 | Da                         |
| `check:cognitive-complexity` | Kognitivna složenost zavojnica (`eslint-plugin-sonarjs`) — zasebna ESLint propusnica; CI se izvodi spojeno kao jedan `check:complexity-ratchets` korak | Da                         |
| `check:dead-code`            | Neiskorišteni izvozi / datoteke ratchet (knip) ne regresiraju u odnosu na osnovnu liniju                                                               | Da                         |
| `check:compression-budget`   | Budžet standarda kompresije — po motoru donji prag uštede tokena ne smije nazadovati                                                                   | Da                         |
| `check:type-coverage`        | Procentualno otkucana čegrtaljka (`type-coverage`) ne nazaduje; uglavnom obuhvata `typecheck:noimplicit:core`                                          | Da                         |

### Poslovi: `codeql-scan` i `codeql-admission`

`codeql-scan` proizvodi sve konfigurirane kategorije analize. Nakon što taj posao uspije, `codeql-admission` provjerava svoje točne učitane podatke i signal upozorenja kandidata. Oba su obavezna zavisnosti od `Gate / CI`, uključujući kandidate samo za dokumente. Zahtjevi za administrativnu aktivaciju i canary opisani su ispod "CodeQL rachet".

| Skripta                | Validates                                                                                                                                                                                | Blokiranje |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:codeql-ratchet` | Kandidat ref/SHA i sve konfigurirane kategorije analize moraju biti aktuelne prije uzbune; nedostajući blokovi dokaza. Globalni inventar ostaje odvojen — vidi "CodeQL čegrtaljku" ispod | Da         |

### Posao: `quality-extended`

Posao blokira primjenjive kandidate. Veličina paketa, tajni nalazi, nalazi ranjivosti, nalazi toka posla i OpenAPI promjene provjeravaju se potrebnim hvataljkama. Dijagnostika kružne ovisnosti ostaje savjetodavna. Potrebna je instalacija skenera: `scripts/ci/install-quality-scanners.sh` osigurava zakačene verzije i propagira greške pri instalaciji. Nedostajući alati, nevažeći izvještaji ili nedostajuće osnovne linije ostavljaju potrebnu kapiju skenera INCOMPLETE.

| Skripta                  | Validates                                                                                                                                                                                                      | Blokiranje                                            |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `check:circular-deps`    | Nema kružnih zavisnosti (dpdm)                                                                                                                                                                                 | **Savjetodavno**                                      |
| `check:bundle-size`      | Veličina paketa ne prelazi ograničenje; nedostupno mjerenje nije uspjelo                                                                                                                                       | **Blokiranje sa --ratchet**                           |
| `check:secrets`          | Gitleaks nalazi se ne povlače; potrebna skeniranja odbijaju nedostajuće tools/source/baseline, neuspjela skeniranja i nevažeće izvještaje                                                                      | **Blokiranje sa --ratchet**                           |
| `check:vuln-ratchet`     | Ranjivosti zavisnosti se ne povlače; potrebna skeniranja odbijaju alate koji nedostaju, nevažeće izvještaje ili nedostajuće osnovne linije                                                                     | **Blokiranje sa --ratchet**                           |
| `check:workflows`        | Workflow lint (actionlint + zizmor); missing/broken skeneri, nevažeći izvještaji ili nedostajuća osnovna linija ne uspijevaju kao INCOMPLETE. Valjani nalazi slijede odabranu strict/advisory/ratchet politiku | Potrebno izvršenje; blokiranje zizmor čegrtaljke u CI |
| `check:openapi-breaking` | Javni API ugovor protiv zakačenih urezivanja događaja (PR baza spajanja, push prije, baza spajanja grupe; scheduled/manual checkout prvi roditelj); potrebno mjerenje nije zatvoreno                           | **Blokiranje sa --ratchet**                           |

### Posao: `docs-sync-strict`

Za zahtjeve za povlačenjem za `main` ili `release/**`, ovaj posao se izvodi samo za kandidate koji nisu nacrti (ili pouzdani red) koji su klasificirani kao promjene dokumentacije ili koda. Takođe radi na događajima koji nisu PR CI ; Gurni okidač ovog toka posla pokriva samo `main`, ne `release/**`. Korak koji izlazi iz različitog od nule blokira posao; samo izvještajni nalazi i dokumentirana izuzeća u nastavku nisu.

| Skripta                        | Validates                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Blokiranje                                                                                                                                  |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-kapija koja uzastopno pokreće 7 pod-kapija ispod                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                                                                                                                          |
| ↳ `check:docs-sync`            | Konzistentnost Package/OpenAPI/CHANGELOG verzije, tačna `llm.txt` ogledala, prevedene CHANGELOG section/size invarijante i odsustvo zamijenjenih duplikata dokumenata                                                                                                                                                                                                                                                                                                       | Da                                                                                                                                          |
| ↳ `check:docs-frontmatter`     | Sastavljene stranice sa dokumentacijom nose važeće naslove naslova                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                                                                                                                          |
| ↳ `check:docs-counts`          | Invarijante brojanja visoke pouzdanosti su stroge; heurističke provjere broja datoteka upozoravaju samo ako skripta ne primi `--strict` ( CI meta-kapija ga ne prođe)                                                                                                                                                                                                                                                                                                       | Strogo blokiranje nivoa; meki nivo savjetovanja                                                                                             |
| ↳ `check:env-doc-sync`         | Izvor env čita, `.env.example` i `docs/reference/ENVIRONMENT.md` se slažu nakon eksplicitnih lista dopuštenja za ignoriranje, samo za dokumente i samo za env                                                                                                                                                                                                                                                                                                               | Da, izvan dokumentovanih lista dozvoljenih                                                                                                  |
| ↳ `check:deprecated-versions`  | Izvještava o potencijalnim zastarjelim verzijama izvan sigurnih povijesnih konteksta i zastarjelim datumima ažuriranja, isključujući zanemarene dokumente                                                                                                                                                                                                                                                                                                                   | Upozorenje o trenutnom CI ožičenju (`--strict` nije položen)                                                                                |
| ↳ `check:doc-links`            | Interne veze za smanjenje vrijednosti u dokumentima rješavaju se u stvarne datoteke (`[text]`/`(path)` obrazac)                                                                                                                                                                                                                                                                                                                                                             | Da                                                                                                                                          |
| ↳ `check:fabricated-docs`      | Rute, env vars, CLI komande, nazivi zakačivaca i putanje datoteka citirani u dokumentima postoje u bazi koda. Tvrda kapija preko `--strict`; soft-fail bez oznake.                                                                                                                                                                                                                                                                                                          | Da (preko `--strict` u CI)                                                                                                                  |
| `check:cli-i18n`               | Korišteni CLI `t()` ključevi postoje u `en`; `pt-BR` zadržava svaki odeljak najvišeg nivoa; `zh-CN` i `zh-TW` sadrže svaki ključ iz `en`                                                                                                                                                                                                                                                                                                                                    | Da                                                                                                                                          |
| `check:openapi-coverage`       | OpenAPI specifikacija pokriva barem dio stvarnih ruta                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                                                                                                                          |
| `check:openapi-security-tiers` | Deklarisane `x-loopback-only`/`x-always-protected` napomene moraju biti podržane od strane `routeGuard.ts`; parser i blok neusklađenosti naprijed. Obrnuta provjera za nedostajući `x-loopback-only` pod lokalnim prefiksima upozorava, a rute samo za uzorak su isključene iz tog obrnutog prolaza.                                                                                                                                                                        | Parser/forward provjerava blokiranje; upozorenje o obrnutoj provjeri                                                                        |
| `check:openapi-routes`         | Svaka `/api...` putanja u `openapi.yaml` -u se neosjetljivo na parametre rješava na stvarnu rutu nakon opravdane `KNOWN_STALE_SPEC` liste dopuštenja; zastarjeli unosi liste dozvoljenih također ne uspijevaju                                                                                                                                                                                                                                                              | Da                                                                                                                                          |
| `check:docs-symbols`           | Interne `/api/...` URL reference u kanonskim ne-mirror dokumentima rješavaju stvarnu rutu ili porodicu ruta; proxy/upstream/placeholder/file reference i opravdani `KNOWN_STALE_DOC_REFS` unosi su isključeni, a zastarjeli unosi liste dopuštenja ne uspijevaju                                                                                                                                                                                                            | Da                                                                                                                                          |
| `i18n translation drift`       | Apsolutno prihvatanje zahteva nultu nedoslednost izvora, nedostajućeg cilja, heša cilja, zastarelog prevoda i predmemorije sekcija. Obična PR priprema može zadržati tačne naslijeđene dokaze ili samo englesku promjenu na čekanju s nepromijenjenim kompletnim stanjem i ciljnim bajtovima; njegov izvještaj posebno proglašava spremnost za spajanje. Nedostaju ciljni heševi i nepotpuni osnovni dokazni blok. Odsustvo keš memorije naslijeđenog odjeljka nije greška. | Svih pet klasa blokira prijem queue/base ; obična priprema dozvoljava samo dokazano naslijeđeno ili samo na engleskom nerešeno radno mjesto |

Generira se dvanaest README SVGs pod `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` ih sve regeneriše). Svaki od njih ima jedinični test za poređenje bajtova (`tests/unit/docs/readme-*-svg.test.ts`, posao `test-unit`) koji ne uspijeva kada je predana datoteka zastarjela, a `check:docs-counts` čita kanonske brojeve iz svojih `<text>` čvorova — zbog čega korak obrisa čuva svaki ocrtani niz u datoteci kao nevidljiv `<text>`. SVG provjera kanonskih brojeva čita datoteke navedene u `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` i `tier-flow-light.svg`; tvrdnje o besplatnom zauvijek, kataloškom unosu, ponavljajućem skupu i faktorima bodovanja također glase `promise-pillars.svg`, `free-tier-budget.svg` i `strategies-grid.svg`. `free-tier-budget.svg` izvlači svoje brojke iz živog učitavača kataloga, tako da promjena u `FREE_MODEL_BUDGETS` ili ime za prikaz provajdera crveni CI dok se taj fajl ne regeneriše.

### Posao: `i18n-ui-coverage`

| Skripta                           | Validates                                                                                                                                                                                                     | Blokiranje     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | Pokrivenost ključa UI i18n je ≥ 65%                                                                                                                                                                           | Da             |
| `check-ui-value-drift` (inline)   | Prepisani engleski **vrijednost** ne ostavlja zastarjeli prijevod iza sebe                                                                                                                                    | Da             |
| `check-new-key-coverage` (inline) | A **novo** Engleski ključ se prevodi u svakom lokalu — `__MISSING__:` marker je odbijen                                                                                                                       | Da             |
| `check-translation-ratio`         | Omjer stvarnog prijevoda po lokalizaciji (identično engleskom / rezervirano mjesto / nedostajući listovi izvan liste dozvoljenih) ne smije premašiti `config/quality/i18n-translation-baseline.json` + zastoj | **Blokiranje** |

Potreban je `fetch-depth: 0` — kapija promjene vrijednosti razlikuje `en.json` u odnosu na bazu spajanja.

#### `check-ui-value-drift` — ustajala-translation kapija

Hvata jednu i18n regresiju koju druge kapije strukturno ne mogu vidjeti: engleska vrijednost je prepisana i prijevodi izvedeni iz _prethodnog_ engleskog ostaju iza, tako da korisnici koji nisu engleski nastavljaju čitati samouvjereno napisanu, sada pogrešnu kopiju.

Ovo je stvarno poslano. `oauthModal.googleOAuthWarning` je prepisan kada je Antigravity pomoćnik za prijavu sletio (#5203);**39 od 43 lokaliteta** zadržao tekst koji govori operaterima da "kopiraju cijeli URL i zalijepe ga ispod" — tok koji se ne može završiti za tog provajdera. Prošlo je nezapaženo do #8463 jer:

- `sync-ui-keys` popunjava samo ključeve koji jesu **odsutan** , nikad one koje jesu **ustajao** ;
- `check-ui-keys-coverage` broji ključno _prisutnost_, tako da se zastarjeli prijevod smatra pokrivenim;
- `check-translation-drift` prati `docs/i18n/<locale>/**.md` dokumentaciju preslikava — nikada ne čita `src/i18n/messages/*.json`. Blokiranje u poslu `docs-sync-strict` od ponovne sinhronizacije 2026-09: uredite osnovni dokument → `npm run i18n:run -- --files=<doc>` (na nivou odjeljka, jeftino).

**Svjestan razlike, ne baziran na bazi.** On upoređuje `en.json` na bazi spajanja sa radnim stablom; za svaki ključ čija je engleska vrijednost promijenjena, bilo koja lokacija koja još uvijek ima netaknuti prijevod je zastarjela. Ovo namerno **zamrzava već postojeći dug** — a diff ne može otkriti s kojeg starog engleskog je došao dugogodišnji prijevod, tako da kapija prosuđuje samo ono što trenutna promjena dotiče. Alternativa (osnovna linija heširanja po ključu) bi koštala ~ 600 KB generiranu datoteku, 3 × najveća postojeća osnovna linija, koja se izbacuje na svaki i18n PR.

Dva načina da se to zadovolji:

1. ažurirati zahvaćene prijevode, ili
2. postavite ih na `__MISSING__:<new english>` — vrijeme izvođenja tada služi ispravljenom engleskom (`src/i18n/request.ts::deepMergeFallback`, #7258) i ključnim redovima za prijevod.

Ako je niz **značenje** promijenio, preferiram **preimenovanje ključa** : novi ključ ne može naslijediti zastarjeli prijevod. To je obrazac koji koristi #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Vrata promjene vrijednosti i kapije novog ključa dijele jedno nepromjenjivo poređenje od `scripts/i18n/resolve-ui-diff-base.mjs`. Tok posla prosljeđuje istu bazu, osnovni vrh i kandidat SHAs na obje provjere. PR/base-retarget, push i stapanje grupe koriste svoj kontekst događaja. Otpremanje grane kandidata zahtijeva njen tačan otvoreni PR ili eksplicitni `i18n_base_sha` unos. Otpremanje ili planirano posmatranje `main` ili `release/vX.Y.Z` bez tog unosa upoređuje poslednje urezivanje sa njegovim prvim roditeljem; to nije revizija svih naslijeđenih dugova za prevođenje. Lokalno pozivanje zahtijeva eksplicitnu bazu poređenja, na primjer `BASE_REF` naredbu iznad.

Nedostaje ili dvosmislen kontekst poređenja, nečitljiv ili nevažeći traženi katalog i promijenjeni kandidat proizvode `INCOMPLETE` s izlaznim kodom **2** , uključujući u režimu upozorenja. Katalog čita koristiti `scripts/i18n/read-ui-catalog.mjs`; greške čitanja se ne zamjenjuju praznim objektima. Ni nedostupna baza niti nepotpuni unos ne uspostavljaju PASS.

### Posao: `i18n`

Potpuna i18n matrica valjanosti (jedan posao po lokalizaciji). Cijeli posao je savjetodavan.

| Skripta                         | Validates                             | Blokiranje                                                    |
| ------------------------------- | ------------------------------------- | ------------------------------------------------------------- |
| `validate_translation.py quick` | Kompletnost prijevoda po lokalizaciji | **Savjetodavno** (`continue-on-error: true` na cijelom poslu) |

### Posao: `pr-test-policy`

Radi samo na zahtjevima za povlačenje.

| Skripta                | Validates                                                                                                                             | Blokiranje |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PRs koji mijenja proizvodni kod u `src/`, `open-sse/`, `electron/` ili `bin/` mora uključiti ili ažurirati testove (tvrdo pravilo #8) | Da         |
| `check:test-masking`   | Promijenjene testne datoteke ne smanjuju broj neto tvrdnji niti dodaju `assert.ok(true)` tautologije                                  | Da         |
| `check:pr-evidence`    | PR tijelo citira test/VPS dokaze za promjenu (mehanizuje Hard Rule #18 tako što se PR proza — krhka, vidi Backlog)                    | Da         |

### Posao: `test-vitest`

Potreban je posao klasifikacije `changes`. Primjenjivi dijelovi matrice blokiraju spajanje u slučaju neuspjeha.

| Suite            | Validates                                                | Blokiranje                                                                                                          |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 alata), autoCombo, cache — vitest runner | Da                                                                                                                  |
| `test:vitest:ui` | UI komponenta testira — vitest runner                    | **Blokiranje** — već postojeći kvarovi su eksplicitno isključeni u `vitest.config.ts`; novi neuspjesi ne uspijevaju |

### Noćni radni tokovi (planirani, savjetodavni)

Ovi se pokreću po cron rasporedu (i `workflow_dispatch`), nikada na PRs. Svi su savjetodavni.

| Workflow               | Validates                                                                                                                                                | Blokiranje       |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | brza provjera testova svojstava sa nasumičnim početnim + velikim brojem pokretanja                                                                       | **Savjetodavno** |
| `nightly-resilience`   | kapija rasta gomile, haos fault-injection, k6 load/soak                                                                                                  | **Savjetodavno** |
| `nightly-llm-security` | promptfoo injection guard (režim bloka) + garak sonde (preskočeno bez tajne provajdera)                                                                  | **Savjetodavno** |
| `nightly-schemathesis` | OpenAPI ugovor fuzzing (šemateza) protiv živog OmniRoute koristeći `docs/openapi.yaml` — površinske povrede specifikacija / neobrađene 500s (faza 8 B.4) | **Savjetodavno** |
| `nightly-mutation`     | Strykerov rezultat testiranja mutacija preko brze jedinične trake — preživjeli mutanti na površini slabe tvrdnje                                         | **Savjetodavno** |
| `nightly-compat`       | Matrica kompatibilnosti motora čvorova u podržanim `engines.node` rasponima                                                                              | **Savjetodavno** |

Bazne linije performansi (heap, TTFB, vrijeme izgradnje) se bilježe, a ne zatvaraju se: vidi [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

### CodeQL čegrtaljka: prijem kandidata i inventar spremišta

CI posjeduje kandidatski CodeQL prijem kroz eksplicitni lanac zavisnosti: `codeql-scan` poziva matricu na četiri jezika u `codeql.yml`, zatim `codeql-admission` pokreće `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` zahtijeva oba rezultata. Kvalitet zadržava vlastite numeričke provjere, ali ne postavlja upit skeneru prije nego što proizvođač završi; `Gate / Quality` sam po sebi nije potpuni prijem kandidata. CodeQL ostaje obavezan za kandidate samo za dokumente.

Politika u `config/quality/codeql-admission-policy.json` odabiru Akcije, C/C++, JavaScript/TypeScript i Python, zadani skup upita, model udaljene prijetnje i način izgradnje bez. Preflight proizvođača odbija zapis aktivacije na čekanju i grana se izvan eksplicitne ciljne liste. Trenutni ciljevi su glavni i release/v3.8.54. Contract testovi porede ovu konačnu listu i okidač za održavanje sa verzijom paketa; sljedeće izdanje treba pregledati onboarding. CI-ov postojeći PR okidač šireg izdanja je zadržan, ali neugrađeni cilj prijavljuje HOLD prije ekstrakcije umjesto da dobije neizmjereni PASS.

Svaki matrični posao bilježi svoj stvarni SARIF upload ID, jezik, kategoriju, pokretanje i pokušaj, identitet toka posla pozivatelja, događaj ref/head/base/merge SHA i hash politike. Zavisni posao preuzima samo račune ovog pokretanja i potvrđuje sažetke artefakata. Zahtijeva sve četiri kategorije, uspješnog producenta i završenu obradu svakog tačnog uploada. Koristi API-ov sarif_id filter, a ne najnoviju analizu pronađenu na grani. Djelomične reprize mogu ponovo koristiti uspješne kategorije iz ranijeg pokušaja iste serije i kandidata, čuvajući pokušaj produkcije; propali trenutni proizvođač ne može ponovo koristiti prethodne zelene dokaze.

CodeQL akcija čeka na obradu, ali njena zakačena implementacija može upozoriti i nastaviti nakon neuspjeha čitanja statusa ili iscrpljenog čekanja. Prijem stoga ponovo potvrđuje obradu. Nedostajuće kategorije, obrada na čekanju, neuspjeli ili otkazani poslovi, zastarjeli identitet, nepotpuna paginacija ili nedostupan APIs proizvodi HOLD i izlaz 2. Ne ostaje fiksno čekanje za nezavisni tok rada skenera. Neskenirani PR ne može proći jer je upit upozorenja vratio 0. Izmjereni broj iznad `metrics.codeqlAlerts.value` izlazi 1; osnovna linija nije podignuta da apsorbuje upozorenja druge grane. [Status otpremanja i traženje analize](https://docs.github.com/en/rest/code-scanning/code-scanning).

Račun bilježi prijenos i analizu IDs, kategorije, verzije alata, ref/SHA, osnovne linije i brojeve upozorenja. SARIF identity/result broj, minimalni broj pravila i tačne instance upozorenja ostaju obavezni. PR/analysis identiteti se ponovo provjeravaju prije prihvatanja. Ove provjere uspostavljaju pokrivenost konfigurirane kategorije, a ne inventar svake ekstrahirane izvorne datoteke. C/C++ ekstrakcija bez izgradnje ne uključuje kod generiran tijekom izgradnje projekta. Izvorna isključenja i dalje treba revidirati, a atribucija saradnika treba uporedive dokaze na osnovu tačne.

`codeql-maintenance.yml` isporučuje push skeniranje s aktivnim oslobađanjem i nedjeljni raspored bez dupliciranja PR/main proizvođača. `nightly-codeql-inventory.yml` drži osnovnu liniju za cijelo spremište odvojenom, sa `--strict-measurement` i neuspjehom kada mjerenje nije dostupno. Graciozno preskakanje lokalnog kolekcionara naslijeđa nije prijem kandidata. Zatezanje ostaje eksplicitni `--update` nakon provjerenog nižeg globalnog broja.

Napredni tok rada ne smije se objaviti dok je konfigurisano zadano podešavanje: GitHub odbija tu kombinaciju. Njegova verzionirana politika ostaje na čekanju dok se pregledani administrativni prijelaz ne pročita. Prije objavljivanja, operator zakači spremište, head/base/tree, policy/patch/rollback hešove i promatrano stanje postavljanja; `node scripts/quality/codeql-producer.mjs verify-admin-readback` provjerava dostavljene očekivane i stvarne JSON zapise. Ovo je tehnička zaštita, a ne odobrenje operatera ili zamjena za dohvaćanje svježih očitavanja. PR token nikada ne zahtijeva pristup administraciji. Uvođenje i svaka promjena skenera zahtijevaju odvojeno čitanje plus pravi dokaz kompatibilnosti PR, fork-a i grupa spajanja.

Forks koristi hostovane trkače, odjavljivanje bez trajnih vjerodajnica, bez projekta install/build u proizvođaču i bez naslijeđenih tajni spremišta. GitHub podržava SARIF upload za pull_request događaj sa smanjenim fork tokenom; odobrenje za izvršenje doprinosa po prvi put ostaje politika GitHub. Nikada nemojte koristiti pull_request_target za izvršavanje nepouzdanog koda. Potvrdite stvarne dozvole tokena, analizu_ključ i sve kategorije okruženja u kontroliranom kanarincu prije nego što smatrate da je migracija završena. [Fork upload pravila](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [konfliktni načini podešavanja](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Otpuštanja su poziv operatera (tvrdo pravilo #14)** — nikada ne odbacuje CodeQL upozorenje bez evidentiranja tehničkog opravdanja u komentaru o odbacivanju: `won't fix` za zahtjev uzvodnog protokola, `used in tests` za test uređaj, `false positive` za sredstvo za dezinfekciju CodeQL ne može vidjeti (presedan: `docs/security/ERROR_SANITIZATION.md`).

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
