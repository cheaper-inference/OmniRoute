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

### Prihvat kandidata

Tijekovi rada CI i Quality Gates daju stabilne odluke: `Gate / CI` i
`Gate / Quality`. Njihova verzionirana pravila prihvata navode svaki prethodni zadatak
kao obvezan ili savjetodavan. Primjenjivi obvezni zadatak mora uspjeti: nedostajući,
otkazani, preskočeni, neriješeni i nepoznati rezultati ne mogu utvrditi PASS. Valjana
klasifikacija samo za dokumentaciju ili samo za katalog može učiniti programsku granu
neprimjenjivom; nacrt PR-a nije prihvaćen kandidat. Oznaka `hotfix` ne ukida obvezu
pružanja dokaza.

Oba tijeka rada obuhvaćaju PR-ove prema granama main/release, slanja na `main`, ručno pokretanje
i događaje grupe spajanja. Slanje, ručno pokretanje i grupa spajanja izvršavaju puni odabir. Slanja na
`release/**` ne pokreću ih (2026-10-18): svaka je promjena već prošla matricu u svojem PR-u,
a spojena kombinacija zadatak je sustava Release-Green (`docs/ops/RUNNER_BOX.md` → hostirana grana). Forkovi
i grupe spajanja koriste hostirane izvršitelje za zadatke koji bi inače odabrali samostalno hostirane
izvršitelje; prije uvođenja mora se potvrditi dostatan hostirani kapacitet.

Svaka JSON potvrda identificira dohvaćeni SHA, pokretanje tijeka rada i pokušaj.
CLI odbija nepodudaranje SHA-a dohvaćene verzije i događaja. Testovi tijeka rada povezuju članstvo u pravilima
s popisom `needs` zadatka koji donosi odluku, tako da nova ili uklonjena grana ne može neprimjetno nestati.
Potvrde obuhvaćaju vlastiti tijek rada, a ne objavljivanje, implementaciju ili unutarnji rad
postojećeg savjetodavnog skenera. Aktiviranje obaju naziva provjera u pravilima grane
zasebna je administrativna promjena; dodavanje ovih zadataka samo po sebi ne štiti granu.

### Zadržani dokazi u reduktoru prihvata

`scripts/quality/validate-release-acceptance.mjs` reducira dostavljeni plan i njegove
manifeste; ne utvrđuje obuhvaća li plan cjelokupni cjevovod izdanja.
Njegova izvješća izričito postavljaju `releaseAcceptance: false`, čak i kada je taj plan
`VERIFIED`. Tijek rada `release-acceptance.yml` i dalje koristi testne zamjenske podatke, a ne
stvarne potvrde izgradnje, pakiranja, pokretanja ili promicanja.

CLI zahtijeva `--evidence-root` radi provjere zadržanih dokaza. Datoteke se razrješavaju
kao `<evidence-root>/<artifact_id>/<member>` i sažimaju algoritmom SHA-256. Zapis PASS
bez dokaza, nedostajuća ili izmijenjena datoteka, nesigurna putanja ili simbolička poveznica
onemogućuju provjeru. Nedostajuće datoteke nisu isto što i prazni zapisnici uspješnog izvršavanja.
Postojeće provjere SHA-a, pokretanja i pokušaja ostaju neovisne: podudarni bajtovi ne mogu popraviti
zastarjelu potvrdu. Cjelovitost datoteke nije dokaz autentičnosti izvršavanja ni promicanja artefakta.

### Kapacitet izvršavanja korisničkog sučelja

CI izvršava puni inventar korisničkog sučelja kao četiri matrične particije `test-vitest`, svaku s najviše
dva izvršitelja po particiji i postojećim vremenskim ograničenjem zadatka od 15 minuta. Prva particija također izvršava
Vitest paket MCP/autoCombo. Rezultat obveznog zadatka obuhvaća svaku stavku matrice; neuspjeh
ili otkazivanje jedne particije ne može utvrditi prihvat kandidata.

Noćni promatrač zadržava zasebnu potvrdu točnog kandidata za svaku particiju korisničkog sučelja,
uključujući izvršavanje MCP-a u prvoj potvrdi. Potrebne su sve četiri potvrde, zapisnici i podudarni
identiteti izvršavanja. Lokalna naredba `npm run test:vitest:ui` i dalje odabire
cijeli paket; jedno izvršavanje s `--shard` samo je djelomičan dokaz.

### Prikupljanje pokrivenosti jediničnih testova

Dvanaest particija jediničnih testova prikuplja V8 pokrivenost tijekom postojećeg izvršavanja testova. Uspješna
particija pokreće `scripts/ci/compact-v8-coverage.mjs` radi sažimanja izvornih datoteka bez generiranja
posrednog izvješća Istanbul. Završni zadatak Coverage provjerava svih dvanaest manifesta u odnosu na
SHA kandidata, okruženje izvođenja, korijenski direktorij izvornog koda i sažetke podataka, a zatim pokreće c8 izvjestitelje i postojeće
pragove pokrivenosti. Ulazni podaci zadržavaju c8-ov globalni redoslijed naziva datoteka; prethodno spajanje po particijama nije sigurno
za mješovitu pokrivenost funkcija/blokova. Nedostajuće, neispravne ili nekompatibilne particije uzrokuju neuspjeh prihvata.
Neuspjele testne particije zasebno zadržavaju neobrađene dijagnostičke podatke o pokrivenosti; oni ne mogu ući u završno spajanje.

### Inventar statičkog skeniranja

Verzionirani inventar npm aliasa i članstvo u statičkom skeniranju nalaze se u
`config/quality/gate-manifest.json`. Pokrenite `npm run check:gate-manifest` kako biste provjerili
nazive skripti i točne naredbe prema datoteci `package.json`; dodavanja, uklanjanja i
odstupanja naredbi uzrokuju neuspjeh i lokalne kuke i zadataka klasifikacije promjena u CI-ju.
Alias nije zadatak tijeka rada, instanca matrice ni testni slučaj: ti se brojevi
ne smiju prikazivati kao međusobno zamjenjivi.

Upotrijebite `npm run quality:scan -- --list` ili `npm run quality:scan:fast -- --list`
kako biste pregledali odabrane aliase bez njihova izvršavanja. Izvršitelj poziva
npm ulaznu točku, pa se zadržava njezino okruženje izvođenja (uključujući Bun gdje je konfiguriran).
Manifest bilježi aliase izvan tih profila kao zasebno pozvane, a
naredbe održavanja zabranjene su u profilima skeniranja samo za čitanje.

Ti profili obuhvaćaju samo statičko skeniranje. Ne certificiraju testove proizvoda,
pokrivenost, pakiranje, vanjske provjere ni potpuni prihvat kandidata za izdanje.
Prihvat tijeka rada koristi povezane `config/quality/admission-policy.json` i
`scripts/quality/admission-verdict.mjs`. Profili promatrača izdanja ostaju zasebni;
neovisno pregledajte njihove primjenjive provjere i potvrde. Statičke
naredbe potpunog promatrača deklarirane su u `config/quality/release-green-static-profile.json`, uključujući
`audit:deps`, odabir mutacijskih testova i provjere prijevoda. Učitavač provjerava npm
naredbe prema datoteci package.json i modeliranim deklaracijama CI/Quality; odbija odstupanja
umjesto izvršavanja tokena ljuske kao argumenata. Obvezni izlaz skenera SKIP/INCOMPLETE
ne može utvrditi PASS. Profil bilježi svoja vanjska izuzimanja i ne zamjenjuje
hostiranu pokrivenost, testne matrice, pakete ni dokaze implementacije. Tekstualni inventar u nastavku
služi kao referenca, a ne kao dokaz da je kontrola doista izvršena.

Skripte se nalaze u `scripts/check/` (kontrole pravila) i `scripts/quality/` (mehanizam pooštravanja).
Izvor istine za CI jest `.github/workflows/ci.yml`.

### Ubrzani put za PR izdanja (`quality.yml`)

`.github/workflows/quality.yml` nadopunjuje CI za PR-ove prema granama main/release, slanja na `main`,
ručna pokretanja i grupe spajanja. PR-ovi koriste brze provjere filtrirane prema putanjama. Trajno
onemogućena duplicirana izgradnja uklonjena je; stvarne provjere izgradnje/pakiranja/pokretanja ostaju u CI-ju.

| Zadatak                                          | Opseg                                                                                                                                                                                                                            | Blokira                 |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | PR-ovi za dokumentaciju/kôd; reference API dokumentacije i docs-all                                                                                                                                                              | Da                      |
| `Fast Quality Gates`                             | PR-ovi za kôd; statičke provjere, provjera tipova, provjera tipova nadzorne ploče, obuhvaćeni jedinični testovi                                                                                                                  | Da                      |
| `Forgotten sibling tests`                        | PR-ovi za kôd; promijenjeni moduli prate se do statičkih potrošača i kandidata za srodne testove; putanje barrel modula i dinamičkih uvoza prijavljuju se kao savjetodavna dijagnostika, uz navedene iznimke s popisa dopuštenih | **Savjetodavno**        |
| `Vitest (fast-path)`                             | PR-ovi za kôd; brzi paket vitest testova                                                                                                                                                                                         | Da                      |
| `Unit Tests fast-path`                           | PR-ovi za kôd; paket jediničnih testova u 4 dijela                                                                                                                                                                               | Da                      |
| `No new ESLint warnings`                         | PR-ovi za kôd; zaštitna provjera lintanja koja uzima u obzir potiskivanja                                                                                                                                                        | Da, uključujući forkove |
| `Merge integrity (changelog + generated skills)` | PR-ovi koji nisu skice; sinkronizacija dnevnika promjena i generiranih vještina                                                                                                                                                  | Da, uključujući forkove |

#### Izvješće o zaboravljenim srodnim testovima

`npm run check:forgotten-sibling-tests` ponovno koristi razrješivač uvoza na kojem se temelji karta utjecaja testova.
Za svaki promijenjeni produkcijski modul prijavljuje determinističke lance
`changed module/symbol -> static consumer -> candidate sibling test` kada kandidatski
test nije prisutan u razlici zahtjeva za povlačenje. Markdown sažetak i JSON rezultat čuvaju se kao
artefakt tijeka rada `forgotten-sibling-tests` radi kalibracije prije bilo kakvog uvođenja blokiranja.

Ponovni izvozi barrel modula i dinamički uvozi služe samo kao dijagnostika razrješavanja; nikada ne stvaraju
blokirajući nalaz. Pregledane iznimke nalaze se u
`config/quality/forgotten-sibling-allowlist.json`. Svaki unos mora navesti potrošača i kandidatski
test, pružiti konkretno obrazloženje te sadržavati poveznicu na GitHub problem ili zahtjev za povlačenje. Neispravni unosi
uzrokuju neuspjeh u sigurnom načinu rada. Iznimke ne mogu potisnuti izbrisani kandidatski test ni razliku koja dodaje `.skip`/`.todo`;
slabljenje tvrdnji i druga prikrivanja ostaju u nadležnosti neovisno blokirajuće
provjere `check:test-masking`.

### Zadatak: `lint`

Pokreće se za svaki PR prema grani `main`. U slučaju neuspjeha blokira spajanje.

| Skripta (`npm run ...`)           | Provjerava                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Blokira                                      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `check:node-runtime`              | Verzija Node.js-a unutar je podržanog raspona                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `check:cycles`                    | Kružne uvoze u cijelom `src/` + `open-sse/` (temeljeno na AST-u, razriješeni su `paths` iz tsconfiga). Osnovna naredba završava s kodom 1 kad god postoji bilo koji ciklus (zatvoreno pri pogrešci od #15281) i navodi snažno povezane komponente (SCC-ove). `check:cycles:ratchet` (koji CI pokreće) blokira kada broj premaši gornju granicu `metrics.cycles` u `quality-baseline.json` — trenutačno 14, `direction: down`, pa se može samo smanjivati (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da (postupno pooštravanje)                   |
| `check:boundary`                  | Povezanost `open-sse → src`: jedinstvene uvoze između datoteka iz pogonskog sustava u aplikaciju (`scripts/quality/measure-boundary.mjs`; popis bridova predstavlja zaostatak zadataka za sanaciju razdvajanja jezgre/modula v4). Osnovna naredba = savjetodavno izvješće (isto kao `quality:boundary`). `check:boundary:ratchet` (koji CI pokreće, također u petlji postupnog pooštravanja brzih provjera u `quality.yml`) blokira kada broj premaši gornju granicu `metrics.boundaryOpenSseToSrc` u `quality-baseline.json` — početno postavljenu na izmjerenih 771, `direction: down`; `--update` samo je smanjuje; na PR-ovima se izračunava u odnosu na osnovnu granu (`--base-ref`, pogledajte u nastavku)                                                                                                                                                                                                               | Da (postupno pooštravanje)                   |
| `check:route-validation:t06`      | Prisutnost Zod shema na svim rutama (pravilo razine 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                           |
| `check:any-budget:t11`            | Broj `@ts-expect-error // any` ne premašuje dopušteni prag (razina 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Da                                           |
| `check:provider-consistency`      | Svaki pružatelj u `providers.ts` ima odgovarajući unos u `providerRegistry.ts` (i obratno, unutar popisa dopuštenih)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Da                                           |
| `check:model-lifecycle`           | Tri ručno održavane tablice usmjeravanja ostaju usklađene sa snimkom životnog ciklusa pohranjenom u repozitoriju (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ne boduje nijedan povučeni id koji `REGISTRY` može usmjeriti; svaki cilj iz `BUILT_IN_ALIASES` prisutan je u `REGISTRY` i ne nalazi se u snimci povučenih id-ova; svaki povučeni id koji je još uvijek u `REGISTRY` prosljeđuje se ili je naveden u `allowedRetiredInCatalog`; te se nijedan izvor ni cilj iz `DEFAULT_DEGRADATION_MAP` u toj snimci ne pojavljuje kao povučen. Time se ne dokazuje da model trenutačno poslužuje aktivni nadređeni servis. Izvanmrežno — uspoređuje se s `config/quality/model-lifecycle.json`, koji se ručno osvježava naredbom `npm run quality:refresh-model-lifecycle` (zahtijeva mrežu; nije uključen u CI). `allowedRetiredInCatalog` je postupno smanjujući zaporni mehanizam: unos dodajte samo uz problem za praćenje. | Da                                           |
| `check:fetch-targets`             | Svaki `fetch("/api/...")` u klijentskom dijelu direktorija `src/` razrješava se na stvarni `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `check:deps`                      | Sve ovisnosti koje je moguće instalirati naredbom `npm install` iz svake datoteke `package.json` u repozitoriju nalaze se u `dependency-allowlist.json`; nove neprikvačene ili slopsquattane pakete označava                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                           |
| `audit:deps`                      | npm revizija svih pet neovisnih datoteka zaključavanja (korijenska, Electron, OpenCode dodaci v1/v2 i pružatelj). Kritična upozorenja blokiraju; upozorenja visoke razine ostaju vidljiva. Revizije koje nedostaju ili nisu uspjele označene su kao NEPOTPUNE i blokiraju; zadržavaju se sažeci zaključavanja i izvješća za svaki opseg.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                           |
| `check:lockfile`                  | Integritet datoteke `package-lock.json` — https registar, sažeci integriteta, bez nadjačavanja poslužitelja                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:licenses`                  | Popis dopuštenih SPDX licenci za produkcijske ovisnosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                           |
| `check:tracked-artifacts`         | Bez artefakata izgradnje / predanih simboličkih poveznica `node_modules` (također se pokreće u husky pre-commit provjeri; pre-push je namjerno pojednostavljen — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                           |
| `check:ai-attribution`            | Bez AI/bot prikolice `Co-Authored-By` ili podnožja o AI generiranju u commitovima, naslovu ili tijelu PR-a — strogo pravilo #16 (u petlji brzih provjera `quality.yml` za PR→`release/**` — čita sadržaj događaja, ne poduzima ništa izvan PR-ova — i korak samo za PR u lint provjeri `ci.yml` za PR→`main`; također husky `commit-msg` kuka; ljudski suautori su dopušteni; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:vitest-exclusions`         | Svako Vitest izuzimanje navodi problem za praćenje i nalazi se u `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                           |
| `check:file-size`                 | Izvorne datoteke (`.ts`/`.tsx` u `src/`, `open-sse/`, `electron/`, `bin/`) ostaju unutar ograničenja `cap`, a testne datoteke (`*.test.ts(x)`) unutar `testCap`; datoteke zamrznute u `file-size-baseline.json` (`frozen` / `testFrozen`) ne smiju premašiti svoju zabilježenu veličinu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                           |
| `check:error-helper`              | Odgovori o pogreškama u izvršiteljima/rukovateljima koriste `buildErrorBody()` / `sanitizeErrorMessage()` (strogo pravilo #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Da                                           |
| `check:migration-numbering`       | Migracijske SQL datoteke numerirane su uzastopno, bez praznina ili duplikata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                           |
| `check:public-creds`              | Nema doslovnih OAuth vrijednosti `client_id`/`client_secret` ni Firebase Web ključeva izvan datoteke `publicCreds.ts` (strogo pravilo #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `check:db-rules`                  | Nema neobrađenog SQL-a izvan modula u `src/lib/db/`; nema zbirnih uvoza iz `localDb.ts` (stroga pravila #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Da                                           |
| `check:known-symbols`             | Izvršitelji pružatelja usluga, strategije usmjeravanja i prevoditelji registrirani u svojim tablicama otpreme odgovaraju datotekama na disku — nema nepovezanih ili nedeklariranih simbola                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `check:route-guard-membership`    | Svaka ruta koja pokreće podređeni proces klasificirana je funkcijom `isLocalOnlyPath()` (stroga pravila #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                           |
| `check:test-discovery`            | Svaku datoteku `*.test.ts` / `*.spec.ts` u repozitoriju prikuplja barem jedan pokretač testova (mehanizam postupnog pooštravanja: popis nepridruženih datoteka u `test-discovery-baseline.json` može se samo smanjivati)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                           |
| `check:test-tla-order`            | Nijedna datoteka `node:test` unutar `tests/unit` ne registrira test, ne izvršava `await` na najvišoj razini, a zatim registrira dodatne testove (#18045; mehanizam postupnog pooštravanja: `test-tla-order-allowlist.json` može se samo smanjivati)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                           |
| `check:agent-skills-sync`         | Generirani artefakti agentskih vještina odgovaraju svojem izvornom katalogu (nema odstupanja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:provider-asset-provenance` | Logotipi/resursi pružatelja imaju zabilježene podatke o podrijetlu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | Konfiguracijske datoteke JSON ispravno se parsiraju i zadovoljavaju pravila provjere repozitorija                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `typecheck:core`                  | Kompilacija TypeScripta bez pogrešaka (samo savjetodavna upozorenja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Da                                           |
| `typecheck:noimplicit:core`       | Strogi `noImplicitAny` — usmjeren na budućnost; mnoga postojeća mjesta poziva još uvijek zahtijevaju anotacije                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **Savjetodavno** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ograničen na `src/app/(dashboard)/**` (#7033) — pažljivo odabran popis od 27 dopuštenih datoteka za `typecheck:core` ne uključuje nijedan TSX nadzorne ploče, a ni `next build` nikada ne provjerava njegove tipove (`next.config.mjs` postavlja `ignoreBuildErrors: true`), pa su regresije napuštenih identifikatora na tom mjestu (#6625/#6909) bile nevidljive CI-ju. Uspoređuje se sa zamrznutom osnovnom vrijednošću broja po datoteci i po TS kodu (`config/quality/dashboard-typecheck-baseline.json`, isti obrazac provedbe zastarjelosti kao za `check:known-symbols`) — samo NOVE pogreške iznad broja u osnovnoj vrijednosti uzrokuju neuspjeh provjere; postupno smanjite osnovnu vrijednost s `--update` kada se ispravi postojeća pogreška.                                                                                                                                                               | Da                                           |

### Zadatak: `quality-gate`

Pokreće se nakon `test-coverage`. Neuspjeh blokira spajanje.

| Skripta                      | Provjerava                                                                                                                                                                                             | Blokira                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- |
| `quality:collect`            | Stvara `quality-metrics.json` (broj ESLint upozorenja, pokrivenost iz objedinjenog izvješća fragmenata)                                                                                                | Da (prethodi zapornom mehanizmu) |
| `quality:ratchet`            | Nijedna metrika u `quality-baseline.json` nije nazadovala (ESLint upozorenja ≤ osnovna vrijednost; pokrivenost ≥ osnovna vrijednost)                                                                   | Da                               |
| `check:duplication`          | Dupliciranje koda (jscpd@4) ne premašuje osnovnu vrijednost u `quality-baseline.json`                                                                                                                  | Da                               |
| `check:complexity`           | Ciklomatska složenost na razini datoteke ne premašuje ograničenje (osnovni ESLint `complexity` + `max-lines-per-function`)                                                                             | Da                               |
| `check:cognitive-complexity` | Zaporni mehanizam kognitivne složenosti (`eslint-plugin-sonarjs`) — zasebno pokretanje ESLint-a; CI oba pokreće objedinjeno kao jedan korak `check:complexity-ratchets`                                | Da                               |
| `check:dead-code`            | Zaporni mehanizam za nekorištene izvoze/datoteke (knip) ne nazaduje u odnosu na osnovnu vrijednost                                                                                                     | Da                               |
| `check:compression-budget`   | Proračun referentnog testa kompresije — minimalne uštede tokena po pogonu ne smiju nazadovati                                                                                                          | Da                               |
| `check:type-coverage`        | Zaporni mehanizam postotka tipiziranosti (`type-coverage`) ne nazaduje; u velikoj mjeri obuhvaća `typecheck:noimplicit:core`                                                                           | Da                               |
| `check:codeql-ratchet`       | Broj otvorenih CodeQL upozorenja ne nazaduje (čita putem `gh api`; kontrolirano preskakanje bez tokena) — učestalost osvježavanja i ručno pokretanje: pogledajte „CodeQL zaporni mehanizam” u nastavku | Da                               |

### Zadatak: `quality-extended`

Zadatak blokira primjenjive kandidate. Veličina paketa, nalazi tajni, nalazi ranjivosti,
nalazi tijeka rada i promjene OpenAPI-ja provjeravaju se obveznim zapornim mehanizmima.
Dijagnostika kružnih ovisnosti ostaje savjetodavna. Instalacija skenera je obvezna:
`scripts/ci/install-quality-scanners.sh` priprema prikvačene verzije i prosljeđuje
neuspjehe instalacije. Nedostajući alati, nevažeća izvješća ili nedostajuće osnovne vrijednosti ostavljaju
obveznu provjeru skenera NEPOTPUNOM.

| Skripta                  | Provjerava                                                                                                                                                                                                                                                   | Blokiranje                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| `check:circular-deps`    | Nema kružnih ovisnosti (dpdm)                                                                                                                                                                                                                                | **Savjetodavno**                                        |
| `check:bundle-size`      | Veličina paketa ne premašuje ograničenje; nedostupno mjerenje uzrokuje neuspjeh                                                                                                                                                                              | **Blokirajuće uz --ratchet**                            |
| `check:secrets`          | Nalazi alata Gitleaks ne nazaduju; obavezna skeniranja odbacuju nedostajuće alate/izvor/referentnu vrijednost, neuspjela skeniranja i nevaljana izvješća                                                                                                     | **Blokirajuće uz --ratchet**                            |
| `check:vuln-ratchet`     | Ranjivosti ovisnosti ne nazaduju; obavezna skeniranja odbacuju nedostajuće alate, nevaljana izvješća ili nedostajuće referentne vrijednosti                                                                                                                  | **Blokirajuće uz --ratchet**                            |
| `check:workflows`        | Provjera tijekova rada (actionlint + zizmor); nedostajući/neispravni skeneri, nevaljana izvješća ili nedostajuća ratchet referentna vrijednost uzrokuju neuspjeh sa statusom INCOMPLETE. Valjani nalazi slijede odabrana stroga/savjetodavna/ratchet pravila | Izvršavanje je obavezno; zizmor ratchet blokira u CI-ju |
| `check:openapi-breaking` | Ugovor javnog API-ja u odnosu na prikvačene commitove događaja (PR merge-base, push before, merge-group base; za zakazano/ručno izvođenje prvo se dohvaća prvi roditelj); obavezno mjerenje ne uspijeva ako ga nije moguće izvršiti                          | **Blokirajuće uz --ratchet**                            |

### Zadatak: `docs-sync-strict`

Za pull requestove prema `main` ili `release/**`, ovaj se zadatak pokreće samo za kandidate koji nisu skice (ili dolaze iz pouzdanog reda) i klasificirani su kao promjene dokumentacije ili koda. Pokreće se i za CI događaje koji nisu PR-ovi; push okidač ovog workflowa obuhvaća samo `main`, a ne `release/**`. Korak koji završi izlaznim kodom različitim od nule blokira zadatak; nalazi koji se samo prijavljuju i dokumentirane iznimke u nastavku ga ne blokiraju.

| Skripta                        | Provjerava                                                                                                                                                                                                                                                                                                                               | Blokiranje                                                                             |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-kontrola koja redom pokreće 7 podređenih kontrola u nastavku                                                                                                                                                                                                                                                                        | Da                                                                                     |
| ↳ `check:docs-sync`            | Usklađenost verzija paketa/OpenAPI-ja/CHANGELOG-a, točne kopije `llm.txt`, invarijante odjeljaka/veličine prevedenog CHANGELOG-a i odsutnost zamijenjenih duplikata dokumenata                                                                                                                                                           | Da                                                                                     |
| ↳ `check:docs-frontmatter`     | Kompilirane stranice dokumentacije imaju valjane naslove u prednjem zaglavlju                                                                                                                                                                                                                                                            | Da                                                                                     |
| ↳ `check:docs-counts`          | Invarijante brojanja visoke pouzdanosti su stroge; heurističke provjere broja datoteka samo upozoravaju osim ako skripta primi `--strict` (CI meta-kontrola ga ne prosljeđuje)                                                                                                                                                           | Stroga razina blokira; blaga razina je savjetodavna                                    |
| ↳ `check:env-doc-sync`         | Čitanja varijabli okruženja u izvornom kodu, `.env.example` i `docs/reference/ENVIRONMENT.md` usklađeni su nakon primjene izričitih popisa iznimaka ignore, doc-only i env-only                                                                                                                                                          | Da, izvan dokumentiranih popisa iznimaka                                               |
| ↳ `check:deprecated-versions`  | Prijavljuje moguće zastarjele verzije izvan sigurnih povijesnih konteksta i zastarjele datume ažuriranja, izuzimajući ignorirane dokumente                                                                                                                                                                                               | Savjetodavno u trenutačnoj CI konfiguraciji (`--strict` se ne prosljeđuje)             |
| ↳ `check:doc-links`            | Interne markdown poveznice u dokumentaciji vode do stvarnih datoteka (oblik `[text]`/`(path)`)                                                                                                                                                                                                                                           | Da                                                                                     |
| ↳ `check:fabricated-docs`      | Rute, varijable okruženja, CLI naredbe, nazivi hookova i putanje datoteka navedeni u dokumentaciji postoje u bazi koda. Stroga kontrola uz `--strict`; bez zastavice dopušta neuspjeh.                                                                                                                                                   | Da (putem `--strict` u CI-ju)                                                          |
| `check:cli-i18n`               | Korišteni CLI `t()` ključevi postoje u `en`; `pt-BR` zadržava sve odjeljke najviše razine; `zh-CN` i `zh-TW` sadrže svaki ključ iz `en`                                                                                                                                                                                                  | Da                                                                                     |
| `check:openapi-coverage`       | Specifikacija OpenAPI pokriva najmanje ratchetom određenu donju granicu stvarnih ruta                                                                                                                                                                                                                                                    | Da                                                                                     |
| `check:openapi-security-tiers` | Deklarirane oznake `x-loopback-only`/`x-always-protected` moraju imati pokriće u `routeGuard.ts`; pogreške parsera i nepodudarnosti u provjeri unaprijed blokiraju. Obrnuta provjera nedostajućih `x-loopback-only` pod prefiksima samo za lokalni pristup upozorava, a rute definirane samo obrascem izuzete su iz te obrnute provjere. | Parser/provjere unaprijed blokiraju; obrnuta provjera je savjetodavna                  |
| `check:openapi-routes`         | Svaka putanja `/api...` u `openapi.yaml` odgovara stvarnoj ruti neovisno o nazivima parametara nakon primjene obrazloženog popisa iznimaka `KNOWN_STALE_SPEC`; zastarjeli unosi na popisu također uzrokuju neuspjeh                                                                                                                      | Da                                                                                     |
| `check:docs-symbols`           | Interne URL reference `/api/...` u kanonskim dokumentima koji nisu prijevodne kopije odgovaraju stvarnoj ruti ili obitelji ruta; proxy/upstream/placeholder/datotečne reference i obrazloženi unosi `KNOWN_STALE_DOC_REFS` izuzeti su, a zastarjeli unosi na popisu uzrokuju neuspjeh                                                    | Da                                                                                     |
| `i18n translation drift`       | Hash vrijednosti izvora/cilja osnovnog skupa prevedenih dokumenata podudaraju se s `.i18n-state.json`. PR-ovi padaju samo zbog novouvedenog odstupanja izvora, nedostajućeg cilja ili ciljnog hasha; provjere izvan PR-a su stroge. Naslijeđena odstupanja PR-a i izvorni hashovi zastarjelih ciljeva daju upozorenja.                   | Nova PR/stroga odstupanja izvan PR-a blokiraju; naslijeđena/zastarjela su savjetodavna |

Dvanaest README SVG-ova u `docs/diagrams/` generira se pomoću `scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` ponovno generira sve.
Svaki ima jedinični test koji uspoređuje bajt po bajt (`tests/unit/docs/readme-*-svg.test.ts`, posao `test-unit`) i pada kada je datoteka pohranjena u repozitoriju zastarjela.
`check:docs-counts` čita kanonske brojeve iz njihovih čvorova `<text>`, pa se brojevi nikad ne pretvaraju u putanje obrisa.
Provjera kanonskih SVG brojeva čita datoteke navedene u `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, `public/images/tier-flow-dark.svg`, `tier-flow-light.svg`.
Provjere tvrdnji o trajno besplatnim pružateljima, stavkama kataloga, ponavljajućim skupovima i čimbenicima bodovanja čitaju i `promise-pillars.svg`, `free-tier-budget.svg`, `strategies-grid.svg`.
`free-tier-budget.svg` dobiva brojke iz učitavača trenutačnog kataloga, pa promjena `FREE_MODEL_BUDGETS` ili prikaznog imena pružatelja ruši CI dok se ta datoteka ponovno ne generira.

### Zadatak: `i18n-ui-coverage`

| Skripta                             | Provjerava                                                                                                                                                                                                                            | Blokira          |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage` (ugrađeno) | Pokrivenost UI i18n ključeva iznosi ≥ 65%                                                                                                                                                                                             | Da               |
| `check-ui-value-drift` (ugrađeno)   | Prepisana engleska **vrijednost** ne ostavlja za sobom zastarjeli prijevod                                                                                                                                                            | Da               |
| `check-new-key-coverage` (ugrađeno) | **Novi** engleski ključ preveden je u svim lokalizacijama — oznaka `__MISSING__:` se odbija                                                                                                                                           | Da               |
| `check-translation-ratio`           | Omjer stvarnih prijevoda po lokalizaciji (stavke identične engleskima / rezervirana mjesta / stavke koje nedostaju izvan popisa dopuštenih) ne smije premašiti `config/quality/i18n-translation-baseline.json` + dopušteno odstupanje | **Savjetodavno** |

Zahtijeva `fetch-depth: 0` — kontrola odstupanja vrijednosti uspoređuje `en.json` s bazom spajanja.

#### `check-ui-value-drift` — kontrola zastarjelih prijevoda

Otkriva onu i18n regresiju koju ostale kontrole strukturno ne mogu uočiti: engleska se vrijednost
prepiše, a prijevodi izvedeni iz _prethodnog_ engleskog ostanu nepromijenjeni, pa
korisnici koji ne govore engleski nastavljaju čitati samouvjereno sročen, ali sada netočan tekst.

To se doista dogodilo u produkciji. `oauthModal.googleOAuthWarning` prepisan je kada je uveden pomoćnik
za prijavu Antigravity (#5203); **39 od 43 lokalizacije** zadržalo je tekst koji operaterima govori da „kopiraju
cijeli URL i zalijepe ga ispod” — tijek koji se za tog pružatelja ne može dovršiti. Problem je
ostao neprimijećen sve do #8463 jer:

- `sync-ui-keys` samo dopunjava ključeve koji **nedostaju**, nikada one koji su **zastarjeli**;
- `check-ui-keys-coverage` broji _prisutnost_ ključeva, pa se zastarjeli prijevod računa kao pokriven;
- `check-translation-drift` prati zrcalne kopije dokumentacije `docs/i18n/<locale>/**.md` —
  nikada ne čita `src/i18n/messages/*.json`. Blokira u zadatku `docs-sync-strict` od ponovne
  sinkronizacije 2026-09: uredite temeljni dokument → `npm run i18n:run -- --files=<doc>` (na razini odjeljka, brzo).

**Uzima u obzir razlike, a ne temelji se na referentnom stanju.** Uspoređuje `en.json` na bazi spajanja s
radnim stablom; za svaki ključ čija se engleska vrijednost promijenila, svaka lokalizacija koja još sadrži
netaknuti prijevod smatra se zastarjelom. Time se namjerno **zamrzava postojeći dug** — razlika
ne može otkriti iz koje je stare engleske verzije nastao dugogodišnji prijevod, pa kontrola procjenjuje
samo ono što trenutačna promjena dotiče. Alternativa (referentno stanje sa sažetkom za svaki ključ) zahtijevala bi
generiranu datoteku od ~600 KB, tri puta veću od najvećeg postojećeg referentnog stanja, koja bi se mijenjala pri svakom i18n PR-u.

Postoje dva načina za zadovoljavanje kontrole:

1. ažurirajte zahvaćene prijevode ili
2. postavite ih na `__MISSING__:<new english>` — izvršno okruženje tada poslužuje ispravljeni engleski
   (`src/i18n/request.ts::deepMergeFallback`, #7258), a ključ ulazi u red za prevođenje.

Ako se promijenilo **značenje** niza, radije **preimenujte ključ**: novi ključ ne može naslijediti
zastarjeli prijevod. Taj je obrazac upotrijebljen u #8463.

```bash
npm run i18n:check-value-drift          # strogo (ono što CI izvršava)
npm run i18n:check-value-drift:warn     # samo izvješće
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Završava s kodom 0 i porukom `SKIP reason=base-unresolved` kada se osnovni katalog ne može pročitati (plitki
klon bez osnovne reference), po uzoru na `check-openapi-breaking`.

### Zadatak: `i18n`

Potpuna matrica i18n provjere valjanosti (jedan zadatak po lokalizaciji). Cijeli je zadatak savjetodavan.

| Skripta                         | Provjerava                          | Blokira                                                        |
| ------------------------------- | ----------------------------------- | -------------------------------------------------------------- |
| `validate_translation.py quick` | Potpunost prijevoda po lokalizaciji | **Savjetodavno** (`continue-on-error: true` za cijeli zadatak) |

### Zadatak: `pr-test-policy`

Izvršava se samo za zahtjeve za povlačenje.

| Skripta                | Provjerava                                                                                                                                                          | Blokira |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:pr-test-policy` | PR-ovi koji mijenjaju produkcijski kod u `src/`, `open-sse/`, `electron/` ili `bin/` moraju uključiti ili ažurirati testove (Strogo pravilo br. 8)                  | Da      |
| `check:test-masking`   | Promijenjene testne datoteke ne smanjuju neto broj tvrdnji niti dodaju tautologije `assert.ok(true)`                                                                | Da      |
| `check:pr-evidence`    | Tijelo PR-a navodi dokaze testiranja/VPS-a za promjenu (automatizira Strogo pravilo br. 18 pretraživanjem teksta PR-a — krhko, pogledajte popis zaostalih zadataka) | Da      |

### Zadatak: `test-vitest`

Izvršava se nakon `build`. U slučaju neuspjeha blokira spajanje.

| Paket            | Provjerava                                                             | Blokirajuće                                                                                                         |
| ---------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP poslužitelj (110 alata), autoCombo, predmemorija — vitest pokretač | Da                                                                                                                  |
| `test:vitest:ui` | Testovi UI komponenti — vitest pokretač                                | **Blokirajuće** — postojeći neuspjesi izričito su izuzeti u `vitest.config.ts`; novi neuspjesi uzrokuju pad zadatka |

### Noćni tijekovi rada (zakazani, savjetodavni)

Pokreću se prema cron rasporedu (i putem `workflow_dispatch`), nikada na PR-ovima. Svi su savjetodavni.

| Tijek rada             | Provjerava                                                                                                                                                         | Blokirajuće      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `nightly-property`     | fast-check testovi svojstava s nasumičnim početnim brojem i velikim brojem izvođenja                                                                               | **Savjetodavno** |
| `nightly-resilience`   | provjera rasta hrpe, ubrizgavanje kaotičnih kvarova, k6 testovi opterećenja/izdržljivosti                                                                          | **Savjetodavno** |
| `nightly-llm-security` | promptfoo zaštita od ubrizgavanja (način blokiranja) + garak sonde (preskaču se bez tajne pružatelja)                                                              | **Savjetodavno** |
| `nightly-schemathesis` | Fuzziranje OpenAPI ugovora (schemathesis) na aktivnom OmniRouteu pomoću `docs/openapi.yaml` — otkriva kršenja specifikacije / neobrađene pogreške 500 (Faza 8 B.4) | **Savjetodavno** |
| `nightly-mutation`     | Rezultat Stryker mutacijskog testiranja nad brzom linijom jediničnih testova — preživjeli mutanti otkrivaju slabe provjere                                         | **Savjetodavno** |
| `nightly-compat`       | Matrica kompatibilnosti Node pogona u podržanim rasponima `engines.node`                                                                                           | **Savjetodavno** |

Osnovne vrijednosti performansi (hrpa, TTFB, vrijeme izgradnje) bilježe se, ali ne služe kao uvjet: pogledajte [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

## Zaostatak racionalizacije (pregled ROI-ja — Fase 9 Onda 3)

Ovaj je popis usklađen s `ci.yml` 2026-06-17 (u prethodnoj su verziji izostavljeni
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Pregledom ROI-ja usklađenog skupa
utvrđeni su sljedeći kandidati za racionalizaciju. **Spajanja su mehaničke promjene CI-ja;
prebacivanja/uklanjanja odluke su o pravilima rezervirane za operatera.** Ništa od navedenog
još nije primijenjeno.

**Također nije dokumentirano iznad** (savjetodavno, slab signal): posao `docs-lint`
(markdownlint + Vale, cijeli posao `continue-on-error`) i samostalni tijekovi rada skenera
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` nalazi se u
`quality-baseline.json`, ali nije povezan s blokirajućim zapornim mehanizmom u `ci.yml` — metrika je
trenutačno nepovezana.

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
- `check:pr-evidence` (blokirajuće, pretražuje prozni tekst tijela PR-a) — visok rizik od lažno pozitivnih rezultata; uklanjanje slabi provedbu strogog pravila br. 18, stoga je ovo stvarna odluka o pravilima.
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
