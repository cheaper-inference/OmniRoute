# Quality Gates Reference (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Ta dokument je avtoritativna referenca za vsa kakovostna preverjanja CI v projektu OmniRoute.
Opisuje vsako preverjanje, kaj preverja, v katerem opravilu CI se izvaja, ali uporablja
referenčno osnovo z ragljo ali pravilnik uspeh/neuspeh ter ali blokira gradnjo ali je zgolj svetovalno.

Za kratek povzetek in pravilnik seznama dovoljenih elementov glejte razdelek »Kakovostna preverjanja in raglje«
v datoteki `AGENTS.md`. Za kritično oceno, razvrstitev zrelosti in od orodij neodvisen
načrt ponovitve istega sistema glejte
[Priročnik za kakovostna preverjanja](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Popis in izvedbeni profili vrat

### Sprejem kandidatov

Vsak od delovnih tokov CI in Quality Gates daje stabilno razsodbo: `Gate / CI` in `Gate / Quality`. Njihov pravilnik o sprejemu v različicah našteva vsako predhodno delovno mesto kot zahtevano ali svetovalno. Ustrezno zahtevano opravilo mora uspeti: manjkajoči, preklicani, preskočeni, čakajoči in neznani rezultati ne morejo vzpostaviti PASS. Zaradi veljavne klasifikacije samo za dokumente ali samo za katalog lahko kodni pas postane neuporaben; navaden osnutek PR ni sprejet kandidat. Oznaka `hotfix` ne opusti dokazov.

Oba delovna toka zajemata PRs v veje main/release, potiske v `main`, ročno odpošiljanje in dogodke združevanja skupin. Push, dispatch in merge-group izvaja celotno izbiro. Zaupanja vreden osnutek čakalne vrste Mergify izvaja tudi ustrezna opravila `full-code`/`full-code-e2e` ; običajni PRs jih preskočite. Pred ročnim združevanjem zaženite popolno odpošiljanje na točno določenem kandidatu. Potiski v `release/**` ne zaženejo teh delovnih tokov; Release-Green ločeno opazuje združeno bazo (`docs/ops/RUNNER_BOX.md` → Hosted lane). Razcepi in skupine za združevanje uporabljajo gostujoče izvajalce za opravila, ki sicer izbirajo samogostiteljske izvajalce; pred uvedbo je treba preveriti zadostno gostujočo zmogljivost.

Navadni PR vodi hitro izbiro. Proga `full-code` in `full-code-e2e` politike sprejema (E2E, integracija, artefakt paketa, dim Electron, Bun SQLite, odjemalci ekosistema in protokola) se izvajata samo na osnutku čakalne vrste Mergify ali na celotnem zagonu: `gh workflow run ci.yml --ref <branch>`.

Vsako potrdilo JSON identificira odjavljeni SHA, zagon in poskus delovnega toka. CLI zavrača neujemanje checkout/event SHA. Preizkusi delovnega toka povezujejo članstvo v pravilniku s seznamom `needs` opravila presoje, tako da nov ali odstranjen pas ne more tiho izginiti. Potrdila pokrivajo lasten potek dela, ne pa objave, uvajanja ali notranjosti obstoječega svetovalnega skenerja. Izvedba ustreznih preverjanj, ki jih zahtevajo pravila podružnice, je ločena upravna sprememba; opredelitev njihovih delovnih mest sama po sebi ne ščiti podružnice.

`API Route Typecheck` je neodvisno preverjanje delovnega toka, zunaj skupnih razsodb in statičnega profila lokalnega polnega opazovalca. Njegov rezultat preverite posebej za točnega kandidata. `.github/workflows/api-route-typecheck.yml` deluje na PRs v `main` ali `release/**`, potisne v družino veje, ročno odpošiljanje in dogodke `merge_group` tipa `checks_requested`. Nima filtra poti. Združite skupine preverite `merge_group.head_sha`; drugi dogodki preverite `github.sha`. Vsi dogodki uporabljajo iste teste diagnostičnih vrat API in enot vrat. PR base retargets zahteva novo preverjanje; Urejanja body/title uporabljajo ime `Admission not requested / API Route Typecheck` samo za opazovanje in ne morejo nadomestiti sprejemnega preverjanja.

### Zadržani dokazi v sprejemnem reduktorju

`scripts/quality/validate-release-acceptance.mjs` zmanjša predloženi načrt in njegove manifeste; ne dokazuje, da načrt zajema celoten cevovod za sprostitev. Njegova poročila izrecno določajo `releaseAcceptance: false`, tudi če je ta načrt `VERIFIED`. Potek dela `release-acceptance.yml` še vedno uporablja senčne napeljave, ne pravih računov o gradnji, pakiranju, zagonu ali napredovanju.

CLI zahteva, da `--evidence-root` preveri hranjene dokaze. Datoteke so razrešene kot `<evidence-root>/<artifact_id>/<member>` in zgoščene kot SHA-256. Zapis PASS brez dokazov, manjkajoča ali spremenjena datoteka, nevarna pot ali simbolna povezava preprečuje preverjanje. Manjkajoče datoteke niso enakovredne praznim uspešnim dnevnikom. Obstoječa preverjanja SHA/run/attempt ostajajo neodvisna: ujemajoči se bajti ne morejo rešiti zastarelega računa. Celovitost datoteke ni dokaz pristnosti izvedbe ali promocije artefaktov.

### DAST uporablja preverjeno zgradbo CI

Zahtevano opravilo `dast-smoke` CI kliče `.github/workflows/dast-smoke.yml` za `build`. Sledi enakemu izboru code/draft kot graditev, vključno s podprto razcepitvijo PRs, ciljno izdajo PRs in združitvenimi skupinami. Manjkajoče, neuspešno, preklicano ali nepričakovano preskočeno opravilo DAST blokira `Gate / CI`. Potek dela za večkratno uporabo nima neodvisnega sprožilca PR/dispatch ; ročno preverjanje uporablja odpošiljanje CI, tako da zgradba in porabnik ostaneta v enem zagonu.

`scripts/ci/next-build-provenance.mjs` zapečati celoten artefakt Next s svojim tar digestom, repository/event/run, poskusom proizvajalca, head/base/checkout/tree, identitetami delovnega toka, ključavnico, natančnim vozliščem version/ABI, platformo in povezovalnikom. DAST izbere nespremenljivi artefakt ID iz `needs.build.outputs`, zahteva preverjanje izvlečka prenosa in neodvisno zgosti ZIP proti izvlečku proizvajalca, preden prek `scripts/ci/unpack-ci-build.py` ekstrahira njegova dva dovoljena člana. Arhiv manifesta in tar se morata ujemati tudi z rezultati neodvisnega proizvajalca, preden se ekstrahira naslednje drevo. Nikoli ne išče najnovejše uspešne gradnje veje. Delna ponovitev lahko ponovno uporabi isti poskus proizvajalca, ko se njegov ID in vsi vnosi še vedno ujemajo; potrdilo zabeleži oba poskusa.

Potrošnik ostane na gostovanem izvajalcu Linux z dovoljenjem za repozitorij samo za branje in brez skrivnosti repozitorija. Namesti točno proizvajalčevo različico vozlišča, nato sestavi CLI z `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` zavrne manjkajoči samostojni strežnik pred morebitno nadomestno gradnjo; običajne lokalne zgradbe CLI ohranijo svojo obstoječo nadomestno različico. Pripravljenost strežnika, Schemathesis in promptfoo morajo vsi uspeti znotraj nespremenjene 25-minutne omejitve opravil. Potrdilo o poreklu dokazuje identiteto vnosa in bajtov, ne pa uspešno skeniranje DAST. Potek artefakta, prekinitev tekača ali okvara optičnega bralnika ostane nepopoln ali neuspešen dokaz; ne more postati PASS prek svetovalnega ovoja.

### UI zmogljivost izvajanja

CI izvaja celoten inventar UI kot štiri matrične drobce `test-vitest`, od katerih ima vsak največ dva delavca na del in obstoječi 15-minutni rok za opravilo. Prvi delček poganja tudi zbirko MCP/autoCombo Vitest. Zahtevani rezultat dela pokriva vse krake matrice; neuspeh ali preklic enega sharda ne more zagotoviti sprejema kandidata.

Nočni opazovalec obdrži ločeno potrdilo o natančnem kandidatu za vsak delček UI, vključno z izvedbo MCP v prvem potrdilu. Zahtevajo se vsa štiri potrdila, dnevniki in ujemajoče se izvršilne identitete. Lokalni `npm run test:vitest:ui` še vedno izbere celotno zbirko; ena serija `--shard` je le delni dokaz.

### Zbiranje pokritosti enot

Dvanajst drobcev enot zbira pokritost V8 med obstoječo izvedbo preskusa. Uspešen delček zažene `scripts/ci/compact-v8-coverage.mjs` za stiskanje izvirnih datotek brez generiranja vmesnega poročila Istanbul. Končno opravilo Coverage preveri vseh dvanajst manifestov glede na kandidata SHA, čas izvajanja, izvorni koren in zgoščene podatke, nato pa zažene poročevalce c8 in obstoječe pragove pokritosti. Vhodi ohranijo globalni vrstni red imen datotek c8; predhodno združevanje na drobec ni varno za mešano pokritost function/block. Manjkajoči, napačno oblikovani ali nezdružljivi drobci niso sprejeti. Neuspeli preskusni delci ločeno ohranijo surovo diagnostično pokritost; ne more vstopiti v končno spajanje.

### Potrdila o napredku izvajanja enote

Skupni ukaz `test:unit:ci:shard` beleži faze `primary`, `dashboard` in `serial` prek `scripts/ci/unit-progress-reporter.mjs`. Običajno poročilo o preskusu ostaja na voljo. Ločeno potrdilo samo o metapodatkih beleži začetek in zaključek vsake datoteke, 30-sekundni srčni utrip pa navaja datoteke, ki so še vedno aktivne, in njihov pretečeni čas. Beleži samo metapodatke o izvajanju na seznamu dovoljenih; opisi testov, izhod, telesa napak in celotno okolje niso serializirani.

CI obdrži datoteke JSONL kot `unit-progress-ci-<run>-<attempt>-<shard>`. Časovna omejitev opravila lahko prepreči kasnejše nalaganje; že oddani srčni utripi ostajajo diagnostični dokazi. Manjkajoči srčni utripi lahko odražajo tudi blokiran ali prekinjen tekaški proces. Ta potrdila ohranjajo obstoječo izbiro testa, sočasnost, roke in izhodni status; niso sodbe o sprejemu kandidatov.

### Združi čakalno vrsto

Oznaka `queue` pošlje PR v čakalno vrsto Mergify (`.mergify.yml`). Mergify odpre osnutek PR na veji `mergify/merge-queue/`, CI izvede celotno izbiro tam, izvirni PR pa se združi, ko `Gate / CI`, `Gate / Quality` in `Merge integrity (changelog + generated skills)` preidejo.

Mergify zapiše svoj povzetek čakalne vrste v opis osnutka. Dogodki Body/title-only `pull_request` `edited` uporabljajo skupino sočasnosti, specifično za izvajanje, in ne izvajajo znova klasifikacije, testnih matrik, integritete spajanja ali sodbe o sprejemu. Imena preverjanj samo za opazovanje ne morejo nadomestiti `Gate / CI` ali `Gate / Quality`. Urejanje, ki spremeni ciljno bazo, zahteva novo validacijo kandidata.

Po odstranitvi iz čakalne vrste potisni zapis PR ne postavi vedno znova v čakalno vrsto. Komentirajte `@mergifyio queue` o tem.

### Inventar statičnega skeniranja

Popis vzdevkov npm z različicami in članstvo v statičnem skeniranju sta v živo v `config/quality/gate-manifest.json`. Zaženite `npm run check:gate-manifest`, da preverite imena skriptov in natančne ukaze glede na `package.json`; dodajanja, odstranjevanja in premikanje ukazov ne uspejo tako pri lokalnem kavlju kot pri opravilih spreminjanja klasifikacije v CI. Vzdevek ni opravilo delovnega toka, primerek matrike ali testni primer: ta števila ne smejo biti predstavljena kot zamenljiva.

Uporabite `npm run quality:scan -- --list` ali `npm run quality:scan:fast -- --list` za pregled izbranih vzdevkov, ne da bi jih izvršili. Izvajalec prikliče vstopno točko npm, tako da se njegov čas izvajanja (vključno z Bun kjer je konfiguriran) ohrani. Manifest beleži vzdevke zunaj teh profilov kot ločeno klicane, ukazi za vzdrževanje pa so prepovedani v profilih pregledovanja samo za branje.

Ti profili pokrivajo samo statično skeniranje. Ne potrjujejo preskusov izdelkov, pokritosti, embalaže, zunanjih pregledov ali kandidatove popolne izdaje. Sprejem poteka dela uporablja povezana `config/quality/admission-policy.json` in `scripts/quality/admission-verdict.mjs`. Profili opazovalcev izdaje ostanejo ločeni; neodvisno pregledati svoje veljavne čeke in potrdila. Celotni statični ukazi opazovalca so deklarirani v `config/quality/release-green-static-profile.json`, vključno z `audit:deps`, izbiro testa mutacije in preverjanji prevodov. Nalagalnik potrdi ukaze npm glede na package.json in modelirane deklaracije CI/Quality ; zavrača odmik namesto izvajanja žetonov lupine kot argumentov. Zahtevan izhod SKIP/INCOMPLETE skenerja ne more vzpostaviti PASS. Profil beleži svoje zunanje izključitve in ne nadomešča gostujoče pokritosti, testnih matrik, paketov ali dokazov o uvedbi. Spodnji popis proze je referenca in ne dokaz, da so vrata dejansko tekla.

Skripte živijo pod `scripts/check/` (policy gates) in `scripts/quality/` (ratchet engine). Vir resnice CI je `.github/workflows/ci.yml`.

### Zdravje objavljene dokumentacije

`.github/workflows/i18n-base-health.yml` opazuje zdravje dokumentacije po izbranih potiskih v `main` in `release/v*` ter pri ročnem pošiljanju. Njegovi filtri pokrivajo dokumentacijo, root Markdown, `llm.txt`, prevod state/configuration in ustrezna orodja i18n. Posamezno delo `Published base documentation health` uporablja gostujoči Ubuntu in petminutni rok. Izvaja preverjanje veljavnosti samo za branje in piše diagnostično potrdilo brez namestitve odvisnosti, prevoda ali sprejetja stanja.

`scripts/i18n/check-base-health.mjs` ne zahteva nedoslednosti izvornega zgoščevanja, manjkajočega cilja, ciljnega zgoščevanja, zastarelega prevoda in predpomnilnika razdelkov. Prav tako potrjuje trenutni osnovni obseg document/locale in njegovo zabeleženo poreklo. Neveljaven kontekst, nepopolna pokritost ali prekinjeno preverjanje ustvari `INCOMPLETE`; potrjeno premikanje povzroči `FAIL`. Oba vrneta status neuspešnega izhoda. Račun je vezan na blagajno SHA, potek dela, zagon in poskus ter se obdrži kot `i18n-base-health-<sha>-<run>-<attempt>`.

To je neodvisno opazovanje objavljene baze. Ne dodaja dogodka PR ali združitvene skupine, zahtevanega preverjanja PR, vzdevka npm ali člana profila statičnega skeniranja. Osnovni preverjevalnik tudi blokira vseh pet razredov v absolutnem načinu. Običajna priprava PR ostaja ločena od sprejema. Uspešno nalaganje ne more spremeniti neuspešnega zdravstvenega rezultata v PASS.

Navadni PR uporablja `--preflight` z osnovnim poročilom, ki ga ustvari `--baseline-evidence`. Angleški vir lahko pusti čakajoč le, če se celoten zapis prevoda in dejanski ciljni bajti ne spremenijo glede na to točno osnovo. Nove nedoslednosti cilja ali predpomnilnika odsekov še vedno blokirajo in nepopolni dokazi ne morejo odobriti priprave. Poročilo ločeno razkriva `preparationPending` in `mergeReady` : uspešna priprava ne pomeni, da so čakajoči prevodi pripravljeni za združitev. Osvežite prizadeta ogledala v sestavljenem kandidatu pred sprejemom. Zaupanja vreden kandidat za čakalno vrsto Mergify, `merge_group`, potiskanje veje in ročno izvajanje CI uporablja absolutno preverjanje brez `--warn` ali odpuščanja podedovanih napak. Manjkajoče ciljne zgoščene vrednosti in obseg, zmanjšan zaradi izbrisanih posnetih jedrnih datotek, ne morejo dati uspešne absolutne razsodbe.

### Izdaja hitre poti PR (`quality.yml`)

`.github/workflows/quality.yml` dopolnjuje CI na main/release PRs, potiska v `main`, pošilja in združuje skupine. PRs uporablja hitra preverjanja s filtriranjem poti. Trajno onemogočena podvojena zgradba je bila odstranjena; pravi čeki build/package/boot ostanejo v CI. Nabor enot in vitetest delujeta samo v CI (`Unit Tests (N/12)` in `Vitest`).

| delo                                             | Področje uporabe                                                                                                                                                                                               | Blokiranje              |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; Reference dokumentov API in vsi dokumenti                                                                                                                                                       | ja                      |
| `Fast Quality Gates`                             | Koda PRs; statična preverjanja, preverjanje tipa, preverjanje tipa armaturne plošče, preskusi prizadetih enot                                                                                                  | ja                      |
| `Forgotten sibling tests`                        | Koda PRs; spremenjeni moduli, sledeni statičnim porabnikom in sorodniškim testom kandidatov; sod in poti dinamičnega uvoza se poročajo kot svetovalna diagnostika, z navedenimi izjemami na seznamu dovoljenih | **Svetovalni**          |
| `No new ESLint warnings`                         | Koda PRs; zaščita proti vlaknom, ki se zaveda zatiranja                                                                                                                                                        | Da, vključno z vilicami |
| `Merge integrity (changelog + generated skills)` | Neosnutek PRs; dnevnik sprememb in ustvarjena sinhronizacija spretnosti                                                                                                                                        | Da, vključno z vilicami |

#### Poročilo o testih pozabljenega brata in sestre

`npm run check:forgotten-sibling-tests` deluje kot svetovalni korak `Fast Quality Gates` in ponovno uporablja razreševalnik uvoza za zemljevidom vpliva preskusa. Za vsak spremenjen produkcijski modul poroča o determinističnih verigah `changed module/symbol -> static consumer -> candidate sibling test`, ko kandidatni test ni v razliki zahteve po vleku. Povzetek Markdown in rezultat JSON se ohranita kot artefakt delovnega toka `forgotten-sibling-tests` za kalibracijo pred kakršno koli uvedbo blokiranja.

Ponovni izvozi sodov in dinamični uvozi so samo diagnostika ločljivosti; nikoli ne ustvarijo blokirajoče ugotovitve. Pregledane izjeme so v živo v `config/quality/forgotten-sibling-allowlist.json`. Vsak vnos mora poimenovati test potrošnika in kandidata, navesti posebno utemeljitev in povezati težavo GitHub ali zahtevo za vlečenje. Napačno oblikovani vnosi se ne zaprejo. Izjeme ne morejo zavrniti izbrisanega testa kandidata ali razlike, ki doda `.skip`/`.todo`; oslabitev trditve in drugo maskiranje ostanejo v lasti neodvisno blokirajočih vrat `check:test-masking`.

### Delovno mesto: `lint`

Deluje na vseh PR do `main`. Bloki se združijo ob napaki.

| Skripta (`npm run ...`)           | Potrjuje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Blokiranje                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| `check:node-runtime`              | Različica Node.js je znotraj podprtega obsega                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ja                                         |
| `check:cycles`                    | Krožni uvozi v celotnem `src/` + `open-sse/` (na osnovi AST, tsconfig `paths` razrešen). Bare zapusti 1, kadar koli obstaja kateri koli cikel (zaprt zaradi napake od #15281) in navede SCCs. `check:cycles:ratchet` (kaj izvaja CI ) blokira, ko število preseže zgornjo mejo `metrics.cycles` v `quality-baseline.json` — trenutno 14, `direction: down`, tako da lahko samo pade (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da (raglja)                                |
| `check:boundary`                  | Spajanje `open-sse → src` : edinstveni uvozi med datotekami iz mehanizma v aplikacijo (`scripts/quality/measure-boundary.mjs`; robni seznam je zaostanek za sanacijo v4 core/module-split ). Golo svetovalno poročilo = (enako kot `quality:boundary`). `check:boundary:ratchet` (kar izvaja CI, tudi v zanki z ragljo hitrih vrat `quality.yml` ) blokira, ko štetje preseže zgornjo mejo `metrics.boundaryOpenSseToSrc` v `quality-baseline.json` — zasejano pri izmerjenih 771, `direction: down`; `--update` jo samo zniža; osnovno relativno na PRs (`--base-ref`, glej spodaj)                                                                                                                                                                                                                                                                                                                                                                         | Da (raglja)                                |
| `check:route-validation:t06`      | Sheme Zod prisotne na vseh poteh (pravilnik stopnje 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ja                                         |
| `check:any-budget:t11`            | Število `@ts-expect-error // any` ne presega proračuna (stopnja 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ja                                         |
| `check:provider-consistency`      | Vsak ponudnik v `providers.ts` ima ustrezen vnos v `providerRegistry.ts` (in obratno, znotraj seznama dovoljenih)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ja                                         |
| `check:model-lifecycle`           | Tri ročno vzdrževane usmerjevalne tabele ostajajo skladne s prijavljenim posnetkom življenjskega cikla (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ne zabeleži nobenega odsluženega ID-ja, ki bi ga lahko `REGISTRY` usmerjal; vsak cilj `BUILT_IN_ALIASES` je prisoten v `REGISTRY` in ga ni na posnetku upokojenega ID-ja; vsaka upokojena izkaznica, ki je še v `REGISTRY` je posredovana ali navedena v `allowedRetiredInCatalog`; in noben vir ali cilj `DEFAULT_DEGRADATION_MAP` ni videti umaknjen na tem posnetku. To ne dokazuje, da model trenutno streže v živo navzgor. Offline — se primerja z `config/quality/model-lifecycle.json`, ročno osveženim z `npm run quality:refresh-model-lifecycle` (omrežje; ni povezano z CI). `allowedRetiredInCatalog` je raglja za izgorevanje: dodajte vnos samo s težavo sledenja.                                                                                                                        | ja                                         |
| `check:fetch-targets`             | Vsak `fetch("/api/...")` v `src/` na strani odjemalca se razreši v pravi `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ja                                         |
| `check:deps`                      | Vsi depi `npm install` -able v vsakem `package.json` v repoju so v `dependency-allowlist.json`; označeni novi odpeti ali pokvarjeni paketi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ja                                         |
| `audit:deps`                      | npm revizija vseh petih neodvisnih zaklepnih datotek (root, Electron, OpenCode vtičniki v1/v2 in ponudnik). Blok kritičnih nasvetov; visoka opozorila ostajajo vidna opozorila. Missing/failed revizije so INCOMPLETE in blok; zgoščene vrednosti in poročila zaklepanja na obseg se ohranijo.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ja                                         |
| `check:lockfile`                  | `package-lock.json` integriteta — https register, zgoščene vrednosti integritete, brez preglasitev gostitelja                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ja                                         |
| `check:licenses`                  | Seznam dovoljenih licenc SPDX za proizvodne odvisnosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ja                                         |
| `check:tracked-artifacts`         | Brez gradbenih artefaktov/zavezanih simbolnih povezav `node_modules` (teče tudi v husky vnaprejšnji potrditvi; predhodni pritisk je namerno lahek — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ja                                         |
| `check:ai-attribution`            | Brez napovednika AI/bot `Co-Authored-By` ali noge generacije umetne inteligence v PR obveženosti, naslovu ali telesu — Hard Rule #16 (v zanki hitrih vrat `quality.yml` za PR→ `release/**` — bere koristni tovor dogodka, ne-op off PRs — in korak samo za PR v `ci.yml` lint za PR→ `main`; tudi husky `commit-msg` hook; človeški soavtorji dovoljeni #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:vitest-exclusions`         | Vsaka izključitev Vitest poimenuje težavo s sledenjem in se pojavi v `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ja                                         |
| `check:file-size`                 | Izvorne datoteke (`.ts`/`.tsx` v `src/`, `open-sse/`, `electron/`, `bin/`) ostanejo znotraj `cap`, testne datoteke (`*.test.ts(x)`) pa znotraj `testCap`; Datoteke, zamrznjene v `file-size-baseline.json` (`frozen` / `testFrozen`), ne smejo preseči zabeležene velikosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ja                                         |
| `check:error-helper`              | Odgovori na napake v executors/handlers uporabljajo `buildErrorBody()` / `sanitizeErrorMessage()` (trdo pravilo #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ja                                         |
| `check:migration-numbering`       | Datoteke SQL za selitev so zaporedno oštevilčene, brez vrzeli ali dvojnikov                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ja                                         |
| `check:public-creds`              | Brez dobesednih ključev OAuth `client_id`/`client_secret` ali Firebase Web zunaj `publicCreds.ts` (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ja                                         |
| `check:db-rules`                  | Brez surovega SQL zunaj modulov `src/lib/db/` ; brez uvoza sodov iz `localDb.ts` (trda pravila #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ja                                         |
| `check:known-symbols`             | Izvajalci ponudnika, strategije usmerjanja in prevajalci, registrirani v njihovih odpremnih tabelah, se ujemajo z datotekami na disku — brez osirotelih ali neprijavljenih simbolov                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ja                                         |
| `check:route-guard-membership`    | Vsaka pot, ki ustvari podrejeni proces, je razvrščena po `isLocalOnlyPath()` (trda pravila #15/#17).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ja                                         |
| `check:test-discovery`            | Vsako datoteko `*.test.ts` / `*.spec.ts` v skladišču zbira vsaj en preskusni izvajalec (ratchet: seznam sirot v `test-discovery-baseline.json` se lahko samo skrči)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ja                                         |
| `check:test-tla-order`            | Nobena datoteka `node:test` pod `tests/unit` ne registrira preizkusa, zadene `await` najvišje ravni, nato registrira več (#18045; zaskok: `test-tla-order-allowlist.json` se lahko samo skrči)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ja                                         |
| `check:agent-skills-sync`         | Ustvarjeni artefakti sposobnosti agenta se ujemajo z izvornim katalogom (brez premikanja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | Ponudnik logos/assets nosi zabeležen vnos porekla                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `lint:json`                       | Konfiguracijske datoteke JSON razčlenjujejo in izpolnjujejo pravila repo linta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `typecheck:core`                  | Prevajanje TypeScript brez napak (samo svetovalna opozorila)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ja                                         |
| `typecheck:noimplicit:core`       | Stroga `noImplicitAny` — usmerjena v prihodnost; številna že obstoječa spletna mesta za klice še vedno potrebujejo opombe                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | **Svetovalni** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` v obsegu `src/app/(dashboard)/**` (#7033) — `typecheck:core`-jev izbrani seznam dovoljenih s 27 datotekami ne vključuje nadzorne plošče TSX, `next build` pa ga tudi nikoli ne preveri (`next.config.mjs` nastavi `ignoreBuildErrors: true`), zato so bile regresije osirotelega identifikatorja tam (#6625/#6909) nevidne za CI. Razlikuje se glede na zamrznjeno osnovno linijo števila per-file/per-TS-code (`config/quality/dashboard-typecheck-baseline.json`, isti vzorec zastarelega uveljavljanja kot `check:known-symbols`) — samo napake NEW ki presegajo osnovno linijo števila, ne uspejo; zaskoči z `--update`, ko je že obstoječa napaka odpravljena.                                                                                                                                                                                                                                                                                    | ja                                         |
| `check:build-typecheck`           | Preverjanje vrste produkcije celotne aplikacije prek `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), površinskega seznama dovoljenih 27 datotek `typecheck:core` in vrat armaturne plošče ne pokriva. Razlike proti `config/quality/build-typecheck-baseline.json`; novo ali povišano število na (datoteko, kodo) ne uspe, nižje število vas zahteva, da povečate. `--update` zavrne, medtem ko zagon vsebuje nov ali dvignjen par, razen če je `--force-regressions` izpolnjen, in zavrne novo utišano datoteko, razen če je `--force-nocheck` izpolnjen, tako da sta razširitev osnovne črte, da postane zelena, in dodelitev trajne tišine dve ločeni naklepni dejanji. Goli `--force` je zavrnjen. Prav tako skenira obseg gradnje za `@ts-nocheck` proti `config/quality/ts-nocheck-baseline.json`, ker datoteka, ki ga uporablja, ne poroča o nobeni diagnostiki in bi bila sicer nevidna za vsa vrata. | ja                                         |

#### Dva programa za preverjanje tipov odgovarjata različno

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) in `check:build-typecheck` prevajata različne programe pod različnimi možnostmi in ista datoteka je lahko v enem čista, v drugem pa polna napak.

`tsconfig.build.json` nastavi `"strict": false`, zato je `noImplicitAny` izklopljen. Osnovna konfiguracija sestavi izbran seznam dovoljenih 27 datotek s strožjimi možnostmi in sledi grafu uvoza vsakega vnosa, tako da so datoteke, ki se nikoli ne pojavijo v programu za gradnjo, tam še vedno preverjene.

Pri presoji, ali je datoteka vtipkana, je pomembna posledica:**ničelna diagnostika po `check:build-typecheck` ne pomeni nič** . Odstranjevanje `@ts-nocheck` iz 26 datotek je pokazalo, da jih je 23 čistih v programu za gradnjo; šestnajst od teh je pokazalo približno 120 implicitnih napak v strogem. Preverite oboje, preden datoteko označite za čisto.

### Delovno mesto: `quality-gate`

Teče po `test-coverage`. Bloki se združijo ob napaki.

| Skripta                      | Potrjuje                                                                                                                                          | Blokiranje       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `quality:collect`            | Oddaja `quality-metrics.json` (število opozoril ESLint, pokritost iz združenega poročila o delcih)                                                | Da (pred ragljo) |
| `quality:ratchet`            | Vsaka metrika v `quality-baseline.json` ni nazadovala ( opozorila ESLint izhodišče ≤ ; izhodišče ≥ pokritosti)                                    | ja               |
| `check:duplication`          | Podvajanje kode (jscpd@4) ne presega osnovne vrednosti v `quality-baseline.json`                                                                  | ja               |
| `check:complexity`           | Ciklopmatska kompleksnost na ravni datoteke ne presega zgornje meje (jedro ESLint `complexity` + `max-lines-per-function`)                        | ja               |
| `check:cognitive-complexity` | Kognitivna kompleksnost Ratchet (`eslint-plugin-sonarjs`) — ločen prehod ESLint ; CI deluje združeno kot en sam korak `check:complexity-ratchets` | ja               |
| `check:dead-code`            | Neuporabljeni izvozi/datoteke Ratchet (knip) se ne zmanjšajo glede na osnovno vrednost                                                            | ja               |
| `check:compression-budget`   | Kompresijska primerjalna vrednost proračuna — na motor prihrankov žetonov ne sme nazadovati                                                       | ja               |
| `check:type-coverage`        | Odstotno tipizirana raglja (`type-coverage`) ne nazaduje; v veliki meri vključuje `typecheck:noimplicit:core`                                     | ja               |

### Delovna mesta: `codeql-scan` in `codeql-admission`

`codeql-scan` proizvaja vse konfigurirane kategorije analiz. Ko je ta naloga uspešna, `codeql-admission` potrdi svoja natančna nalaganja in opozorilno ragljo kandidata. Oba sta zahtevani odvisnosti od `Gate / CI`, vključno s kandidati samo za dokumente. Administrativna aktivacija in zahteve za kanarčka so opisane spodaj pod "CodeQL Ratchet".

| Skripta                | Potrjuje                                                                                                                                                                                          | Blokiranje |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:codeql-ratchet` | Kandidat ref/SHA in vse konfigurirane kategorije analiz morajo biti aktualne pred zaskokom opozorila; bloki manjkajočih dokazov. Globalni inventar ostaja ločen —, glejte "Raglja CodeQL " spodaj | ja         |

### Delovno mesto: `quality-extended`

Delovno mesto blokira ustrezne kandidate. Velikost paketa, skrivne ugotovitve, ugotovitve ranljivosti, ugotovitve delovnega toka in spremembe OpenAPI se preverjajo z zahtevanimi ragljami. Diagnostika krožne odvisnosti ostaja svetovalna. Potrebna je namestitev optičnega bralnika: `scripts/ci/install-quality-scanners.sh` zagotavlja pripete različice in širi napake pri namestitvi. Manjkajoča orodja, neveljavna poročila ali manjkajoče osnovne črte zapuščajo zahtevana vrata optičnega bralnika INCOMPLETE.

| Skripta                  | Potrjuje                                                                                                                                                                                                           | Blokiranje                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| `check:circular-deps`    | Brez krožnih odvisnosti (dpdm)                                                                                                                                                                                     | **Svetovalni**                                  |
| `check:bundle-size`      | Velikost svežnja ne presega zgornje meje; nerazpoložljiva meritev ne uspe                                                                                                                                          | **Blokiranje z --ratchet**                      |
| `check:secrets`          | Ugotovitve Gitleaksa ne nazadujejo; zahtevana skeniranja zavrnejo manjkajoče tools/source/baseline, neuspešna skeniranja in neveljavna poročila                                                                    | **Blokiranje z --ratchet**                      |
| `check:vuln-ratchet`     | Ranljivosti odvisnosti se ne zmanjšajo; potrebni pregledi zavrnejo manjkajoča orodja, neveljavna poročila ali manjkajoče osnovne črte                                                                              | **Blokiranje z --ratchet**                      |
| `check:workflows`        | Workflow lint (actionlint + zizmor); Skenerji missing/broken, neveljavna poročila ali manjkajoča osnovna linija zaskoka ne uspejo kot INCOMPLETE. Veljavni izvidi sledijo izbrani politiki strict/advisory/ratchet | Zahtevana izvedba; zizmor zaskočna blokada v CI |
| `check:openapi-breaking` | Javna pogodba API proti zavezam pripetih dogodkov (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); zahtevana meritev ne zapre                                               | **Blokiranje z --ratchet**                      |

### Delovno mesto: `docs-sync-strict`

Za zahteve po vleku v `main` ali `release/**` se to opravilo izvaja samo za kandidate, ki niso osnutki (ali zaupanja vredna čakalna vrsta), razvrščeni kot dokumentacija ali spremembe kode. Deluje tudi na dogodkih CI ki niso PR; potisni sprožilec tega poteka dela pokriva samo `main`, ne pa `release/**`. Korak, ki zapusti neničelno vrednost, blokira opravilo; ugotovitve samo za poročanje in dokumentirane izjeme spodaj ne.

| Skripta                        | Potrjuje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Blokiranje                                                                                                                            |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-vrata, ki vodijo 7 spodnjih pod-vrat zaporedoma                                                                                                                                                                                                                                                                                                                                                                                                                                        | ja                                                                                                                                    |
| ↳ `check:docs-sync`            | Doslednost različice Package/OpenAPI/CHANGELOG, natančna zrcalna ogledala `llm.txt`, prevedene invariante CHANGELOG section/size in odsotnost nadomeščenih podvojenih dokumentov                                                                                                                                                                                                                                                                                                            | ja                                                                                                                                    |
| ↳ `check:docs-frontmatter`     | Strani z zbrano dokumentacijo imajo veljavne naslove naslovov                                                                                                                                                                                                                                                                                                                                                                                                                               | ja                                                                                                                                    |
| ↳ `check:docs-counts`          | Invariante štetja z visoko stopnjo zaupanja so stroge; hevristična preverjanja števila datotek opozorijo samo, če skript ne prejme `--strict` (metavrata CI ga ne prenesejo)                                                                                                                                                                                                                                                                                                                | Strogo blokiranje ravni; svetovanje mehke stopnje                                                                                     |
| ↳ `check:env-doc-sync`         | Vir env bere, `.env.example` in `docs/reference/ENVIRONMENT.md` se strinjata po izrecnem dovoljenem seznamu prezri, samo dokument in env                                                                                                                                                                                                                                                                                                                                                    | Da, zunaj dokumentiranih dovoljenih seznamov                                                                                          |
| ↳ `check:deprecated-versions`  | Poroča o morebitnih zastarelih različicah zunaj varnih zgodovinskih kontekstov in zastarelih datumih posodobitev, razen prezrtih dokumentov                                                                                                                                                                                                                                                                                                                                                 | Nasvet pri trenutnem ožičenju CI (`--strict` ni opravljen)                                                                            |
| ↳ `check:doc-links`            | Notranje označevalne povezave v dokumentih razrešijo prave datoteke (obrazec `[text]`/`(path)` )                                                                                                                                                                                                                                                                                                                                                                                            | ja                                                                                                                                    |
| ↳ `check:fabricated-docs`      | Poti, env vars, ukazi CLI, imena kavljev in poti datotek, navedene v dokumentih, obstajajo v kodni bazi. Trda vrata preko `--strict`; mehka napaka brez oznake.                                                                                                                                                                                                                                                                                                                             | Da (prek `--strict` v CI)                                                                                                             |
| `check:cli-i18n`               | Uporabljeni ključi CLI `t()` obstajajo v `en`; `pt-BR` obdrži vse razdelke najvišje ravni; `zh-CN` in `zh-TW` vsebujeta vse ključe iz `en`                                                                                                                                                                                                                                                                                                                                                  | ja                                                                                                                                    |
| `check:openapi-coverage`       | Specifikacije OpenAPI pokrivajo vsaj del resničnih poti                                                                                                                                                                                                                                                                                                                                                                                                                                     | ja                                                                                                                                    |
| `check:openapi-security-tiers` | Deklarirane pripombe `x-loopback-only`/`x-always-protected` morajo biti podprte z `routeGuard.ts`; blok razčlenjevalnika in posredovanja neujemanja. Obratno preverjanje manjkajočega `x-loopback-only` pod samo lokalnimi predponami opozori in poti samo z vzorcem so izključene iz tega povratnega prehoda.                                                                                                                                                                              | Parser/forward preverja blokiranje; opozorilo o povratnem pregledu                                                                    |
| `check:openapi-routes`         | Vsaka pot `/api...` v `openapi.yaml` se po utemeljenem seznamu dovoljenih `KNOWN_STALE_SPEC` neobčutljivo razreši na pravo pot; zastareli vnosi na seznam dovoljenih prav tako ne uspejo                                                                                                                                                                                                                                                                                                    | ja                                                                                                                                    |
| `check:docs-symbols`           | Notranje reference `/api/...` URL v kanoničnih nezrcalnih dokumentih se razrešijo v pravo pot ali družino poti; Reference proxy/upstream/placeholder/file in upravičeni vnosi `KNOWN_STALE_DOC_REFS` so izključeni, zastareli vnosi na seznam dovoljenih pa ne uspejo                                                                                                                                                                                                                       | ja                                                                                                                                    |
| `i18n translation drift`       | Absolutni sprejem zahteva nedoslednosti nič vira, manjkajočega cilja, zgoščene vrednosti cilja, zastarelega prevoda in predpomnilnika odsekov. Običajna priprava PR lahko ohrani natančne podedovane dokaze ali čakajočo spremembo samo v angleščini z nespremenjenim popolnim stanjem in ciljnimi bajti; njeno poročilo ločeno navaja pripravljenost na združitev. Manjkajoči ciljni razpršilci in nepopoln osnovni dokazni blok. Odsotnost podedovanega predpomnilnika odsekov ni napaka. | Vseh pet razredov blokira sprejem queue/base ; običajna priprava dovoljuje le dokazano podedovano ali čakajoče delo samo v angleščini |

Ustvarjenih je dvanajst README SVGs pod `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` regenerira vse). Vsak ima preizkus enote za primerjavo bajtov (`tests/unit/docs/readme-*-svg.test.ts`, opravilo `test-unit`), ki ne uspe, ko je odobrena datoteka zastarela, `check:docs-counts` pa bere kanonična števila iz njihovih vozlišč `<text>` — zato korak orisov ohranja vsak orisani niz v datoteki kot neviden `<text>`. Preverjanje kanoničnih števil SVG prebere datoteke, navedene v `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg` ter `public/images/tier-flow-dark.svg` in `tier-flow-light.svg`; trditve o brezplačnem za vedno, vnosu v katalog, ponavljajočem se zbiranju in faktorjih točkovanja se glasijo tudi `promise-pillars.svg`, `free-tier-budget.svg` in `strategies-grid.svg`. `free-tier-budget.svg` črpa svoje številke iz nalagalnika kataloga v živo, tako da sprememba v `FREE_MODEL_BUDGETS` ali prikazno ime ponudnika pordeči CI dokler ta datoteka ni ponovno ustvarjena.

### Delovno mesto: `i18n-ui-coverage`

| Skripta                           | Potrjuje                                                                                                                                                                                       | Blokiranje     |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | Pokritost ključa UI i18n je ≥ 65 %                                                                                                                                                             | ja             |
| `check-ui-value-drift` (inline)   | Prepisana angleščina **vrednost** za seboj ne pušča zastarelega prevoda                                                                                                                        | ja             |
| `check-new-key-coverage` (inline) | A **novo** Angleški ključ je preveden v vsakem jeziku — oznaka `__MISSING__:` je zavrnjena                                                                                                     | ja             |
| `check-translation-ratio`         | Razmerje dejanskega prevoda na jezik (enako z angleščino / nadomestni znak / manjkajoči listi zunaj seznama dovoljenih) ne sme preseči `config/quality/i18n-translation-baseline.json` + slack | **Blokiranje** |

Potrebuje `fetch-depth: 0` — vrata za premik vrednosti razlikujejo `en.json` od združitvene baze.

#### Vrata za zastarel prevod `check-ui-value-drift` —

Ujame eno i18n regresijo, ki je druga vrata strukturno ne vidijo: angleška vrednost je prepisana in prevodi, izpeljani iz _prejšnje_ angleščine, ostanejo zadaj, tako da neangleški uporabniki še naprej berejo samozavestno ubesedeno, zdaj pa napačno kopijo.

To je res poslano. `oauthModal.googleOAuthWarning` je bil prepisan, ko je pristal pomočnik za prijavo Antigravity (#5203);**39 od 43 krajev** ohranjeno besedilo, ki operaterjem sporoča, naj "kopirajo celoten URL in ga prilepijo spodaj" — tok, ki se ne more dokončati za tega ponudnika. Do #8463 je ostalo neopaženo, ker:

- `sync-ui-keys` zapolni samo ključe, ki so **odsoten** , nikoli takih, ki so **zastarel** ;
- `check-ui-keys-coverage` šteje ključno _prisotnost_, tako da zastarel prevod šteje kot pokrit;
- `check-translation-drift` sledi dokumentaciji `docs/i18n/<locale>/**.md`, ki zrcali — in nikoli ne bere `src/i18n/messages/*.json`. Blokiranje v opravilu `docs-sync-strict` od ponovne sinhronizacije 2026-09: uredite osnovni dokument → `npm run i18n:run -- --files=<doc>` (na ravni razdelka, poceni).

**Zaveda se razlik, ni podprt z osnovno linijo.** Primerja `en.json` na bazi spajanja z delovnim drevesom; za vsak ključ, katerega angleška vrednost se je spremenila, so vse področne nastavitve, ki še vedno vsebujejo nedotaknjen prevod, zastarele. To namerno **zamrzne že obstoječi dolg** — a diff ne more razkriti, iz katere stare angleščine je prišel dolgoletni prevod, zato vrata presojajo le, česa se trenutna sprememba dotakne. Alternativa (osnovna vrednost zgoščevanja na ključ) bi stala ~ 600 KB generirano datoteko, 3 × največjo obstoječo osnovno linijo, ki se vrti na vsakem i18n PR.

Dva načina za zadovoljitev:

1. posodobiti prizadete prevode ali
2. nastavite jih na `__MISSING__:<new english>` — izvajalno okolje nato postreže popravljeno angleščino (`src/i18n/request.ts::deepMergeFallback`, #7258) in ključne čakalne vrste za prevod.

Če je niz **pomen** spremenjeno, raje **preimenovanje ključa** : nov ključ ne more podedovati zastarelega prevoda. To je uporabljeni vzorec #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Vrata za premik vrednosti in vrata z novim ključem imajo skupno eno nespremenljivo primerjavo z `scripts/i18n/resolve-ui-diff-base.mjs`. Potek dela posreduje isto podlago, konico podlage in kandidatno SHAs za obe preverjanji. PR/base-retarget, potiskanje in spajanje skupin uporablja svoj kontekst dogodka. Pošiljanje kandidatne veje zahteva njen natančen odprt PR ali eksplicitni vnos `i18n_base_sha`. Pošiljanje ali načrtovano opazovanje `main` ali `release/vX.Y.Z` brez tega vnosa primerja zadnjo objavo z njenim prvim nadrejenim; ne gre za revizijo vseh podedovanih prevodnih dolgov. Lokalni priklic zahteva eksplicitno primerjalno bazo, na primer zgornji ukaz `BASE_REF`.

Manjkajoči ali dvoumni primerjalni kontekst, neberljiv ali neveljaven zahtevani katalog in spremenjeni kandidat ustvarijo `INCOMPLETE` z izhodno kodo **2** , tudi v načinu opozorila. Katalog bere uporabo `scripts/i18n/read-ui-catalog.mjs`; napake pri branju niso nadomeščene s praznimi objekti. Niti nerazpoložljiva osnova niti nepopoln vnos ne vzpostavita PASS.

### Delovno mesto: `i18n`

Popolna validacijska matrika i18n (eno opravilo na jezik). Celotno delo je svetovalno.

| Skripta                         | Potrjuje                   | Blokiranje                                                 |
| ------------------------------- | -------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | Popolnost prevoda na jezik | **Svetovalni** (`continue-on-error: true` za celotno delo) |

### Delovno mesto: `pr-test-policy`

Deluje samo na zahtevo za vleko.

| Skripta                | Potrjuje                                                                                                                                   | Blokiranje |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `check:pr-test-policy` | PRs, ki spreminja produkcijsko kodo v `src/`, `open-sse/`, `electron/` ali `bin/`, mora vključevati ali posodobiti teste (trdo pravilo #8) | ja         |
| `check:test-masking`   | Spremenjene preskusne datoteke ne zmanjšajo števila neto trditev ali dodajo tavtologij `assert.ok(true)`                                   | ja         |
| `check:pr-evidence`    | Telo PR navaja dokaze test/VPS za spremembo (mehanizira Hard Rule #18 tako, da prevzame PR prose — fragile, glejte Backlog)                | ja         |

### Delovno mesto: `test-vitest`

Potrebuje službo klasifikacije `changes`. Veljavni drobci matrike blokirajo spajanje ob napaki.

| Apartma          | Potrjuje                                                            | Blokiranje                                                                                                    |
| ---------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Strežnik MCP (110 orodij), autoCombo, predpomnilnik — vitest runner | ja                                                                                                            |
| `test:vitest:ui` | UI komponenta testira — vitest runner                               | **Blokiranje** Že obstoječe napake — so v `vitest.config.ts` izrecno izključene; novi neuspehi propadejo delo |

### Nočni delovni tokovi (načrtovani, svetovalni)

Te delujejo po urniku cron (in `workflow_dispatch`), nikoli po PRs. Vsi so svetovalni.

| Potek dela             | Potrjuje                                                                                                                                                        | Blokiranje     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | testi lastnosti hitrega preverjanja z naključnim začetnim številom +                                                                                            | **Svetovalni** |
| `nightly-resilience`   | heap-growth gate, kaos fault-injection, k6 load/soak                                                                                                            | **Svetovalni** |
| `nightly-llm-security` | promptfoo injection guard (blok način) + garak sonde (preskočeno brez skrivnosti ponudnika)                                                                     | **Svetovalni** |
| `nightly-schemathesis` | Fuzzing pogodbe OpenAPI (shemateza) proti OmniRoute v živo, ki uporablja kršitve specifikacij površin `docs/openapi.yaml` — / neobravnavanih 500 s (faza 8 B.4) | **Svetovalni** |
| `nightly-mutation`     | Strykerjev rezultat mutacijskega testiranja na hitri enoti — preživeli mutanti na površini šibki trdi                                                           | **Svetovalni** |
| `nightly-compat`       | Matrika združljivosti motorja vozlišča v podprtih obsegih `engines.node`                                                                                        | **Svetovalni** |

Osnovne črte zmogljivosti (kopiča, TTFB, čas gradnje) se zabeležijo, ne preklopijo: glejte [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Faza hitrosti (2026-08-30 → v4.0 LTS): vsa izhodišča omiljena za 20 %

Odločitev lastnika (2026-08-30): do modularizacije v4.0 je hitrost izdajanja pomembnejša
od omejevanja tehničnega dolga. Vsa **številska** izhodišča zaskočne politike so bila v enem
sledljivem koraku omiljena za 20 %, faza pa je navedena v `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Kaj se je spremenilo                                                                                                                                                                                                           | Kje                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — števci, pri katerih je manj bolje, ×1.2; odstotki, pri katerih je več bolje, ÷1.2 (spodnja meja pokritosti ostaja 60, `eslintErrors` ostaja 0, `eslintWarnings` 0 → 20 % zamrznjenega števila izključitev) | `quality-baseline.json` (opomba `_relax_velocity_2026_08_30` navaja vse vrednosti prej → potem)        |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                               | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, omejitev vrstic za vsak `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                   | `file-size-baseline.json`                                                                              |
| števci po datotekah / po kodah TS ×1.2                                                                                                                                                                                         | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                            | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` postane zgolj priporočilen, ko je `_policy.requireTighten === false`                                                                                                                                       | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| nočni postopek `bank-ratchet-shrinks` je začasno ustavljen (zabeležil bi izmerjeno zmanjšanje in izničil razpoložljivo rezervo)                                                                                                | `.github/workflows/nightly-release-green.yml`                                                          |

Seznami dovoljenj (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **niso** proračuni in niso bili spremenjeni. Politična preverjanja uspeha/neuspeha (skrivnosti, pravila SQL,
pogodba dokumentacije/okolja, skladnost i18n, testi enot) ostajajo nespremenjena — neuspešen test je še vedno neuspešen test.

**Orodja**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — enkratna
  omilitev (`scripts/quality/relax-baselines.mjs`); zavrne ponovno izvajanje z isto opombo.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  izmeri vsa številska preverjanja na enak način kot CI in izpiše preostalo rezervo za vsako preverjanje
  (`scripts/quality/baseline-headroom.mjs`). Nočno opravilo `baseline-headroom` objavi
  tabelo v povzetku izvajanja delovnega toka ter naloži svoje poročilo JSON/Markdown kot
  `baseline-headroom-<run_id>`, ki se hrani 90 dni. Opozorilne in kritične vrstice označujejo preverjanja,
  ki so znotraj 10 % svoje zgornje meje ali jo že presegajo. Ta poročila pregledujte kot zgodnje opozorilo,
  da se proračuni porabljajo; preglejte opombe `_rebaseline_*` zadevnega preverjanja. Opravilo ne
  ustvarja ali posodablja več trajne težave; #12149 ohranja zgodovino prejšnjih poročil.

**Način za novo kodo (Clean-as-You-Code) — od 2026-08-30, samo hitra pot za PR**

Pri dogodkih `pull_request` datoteka `quality.yml` posreduje `--base-ref <PR base SHA>` ukazom `check:file-size`,
`check:complexity-ratchets` in `check:dead-code`. Pri `check:complexity-ratchets` in
`check:dead-code` preverjanje primerja HEAD z združitveno osnovo, pri čemer je primerjava **omejena na datoteke, ki jih je
PR spremenil** (`scripts/check/newCodeMode.mjs`: združitvena osnova se materializira v začasnem
`git worktree`, ESLint/knip se izvedeta tam in na HEAD, nato pa se primerjajo števci po datotekah):

- **blokirajoče** — PR je v spremenjenih datotekah dodal kršitve ciklomatske/kognitivne kompleksnosti ali mrtve izvoze
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` v dnevniku);
- **svetovalno** — globalna skupna vrednost v primerjavi z zamrznjeno izhodiščno vrednostjo. Podedovani odklon nikoli ne označi
  nedolžnega PR-ja z rdečo; odklon se spremlja za odpravo ob usklajevanju izdaje, nadzoruje pa ga
  opravilo za preverjanje rezerve.

`check:file-size` uporablja osnovni sklic po lastnih pravilih (`scripts/check/check-file-size.mjs`, #8522):
preveri vsako izvorno in testno datoteko v drevesu, z `git show` prebere število vrstic vsake datoteke
v osnovi PR-ja in datoteko označi kot neuspešno samo, če zraste prek večje izmed naslednjih vrednosti:
njene izhodiščne zgornje meje (`frozen` / `testFrozen` oziroma `cap` / `testCap` za datoteko zunaj
izhodišča) in njene velikosti v osnovi. Datoteka, ki je odstopala že v osnovi, zato nikoli ne povzroči
neuspeha nedolžnega PR-ja.

`check:boundary:ratchet` uporablja isto pravilo za svojo edino številčno vrednost
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): ob dogodkih PR tako hitra preverjanja
`quality.yml` kot opravilo lint v `ci.yml` posredujejo SHA osnove PR-ja, osnovna potrditev se
izmeri iz izvoza `git archive`, PR pa ne uspe samo, kadar njegovo število povezav
`open-sse → src` preseže večjo izmed vrednosti `metrics.boundaryOpenSseToSrc` in števila na osnovi. Odmik
osnove nad zgornjo mejo se prijavi (`base drift herdado`), vendar nikoli ne povzroči neuspeha nedolžnega PR-ja; push → main
ohrani absolutno zgornjo mejo, nerazrešljiv SHA osnove pa se z opozorilom vrne nanjo.

Zagoni `workflow_dispatch`, končni pregled zelene izdaje in nočno opravilo za preverjanje rezerve nimajo osnove PR-ja
in ohranijo absolutno (globalno) primerjavo. Pokritost, podvajanje in pokritost tipov za zdaj ostajajo globalni
(njihova orodja ne ustvarijo poceni razlik po posameznih datotekah) — so kandidati za enako obravnavo.

**Zaključek faze pri v4.0 (LTS = strožje kot prej, ne »nazaj na običajno«)**

1. Na čistem vrhu `release/v4.0.0`: za evidenco zaženite `npm run quality:headroom --json`, nato
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` in `--update` za vsako preverjanje tipov
   — vse osnovne vrednosti se znižajo na izmerjeno vrednost.
2. Izbrišite `_policy` iz `quality-baseline.json` (s tem znova omogočite `--require-tighten` in nočno
   kopičenje rezerve), v `check-openapi-coverage.mjs` obnovite `THRESHOLD = 36` (ali več).
3. Zaostrite meje pod izmerjene vrednosti tam, kjer se je modularizacija obrestovala: `cap` velikosti datotek znova na 1000
   (ali 800), najnižje pragove pokritosti zvišajte za 5, število mrtvih izvozov pa nastavite na 0 za modularizirane pakete.

## Osnovno stanje zaskočke (`quality-baseline.json`)

Mehanizem zaskočke (`scripts/quality/check-quality-ratchet.mjs`) prebere `quality-baseline.json`
in ga primerja s sveže zbrano datoteko `quality-metrics.json`. Vsaka metrika, ki se poslabša
za več kot njen epsilon, povzroči neuspešno gradnjo.

Trenutno spremljane metrike:

| Metrika               | Smer   | Pomen                                      |
| --------------------- | ------ | ------------------------------------------ |
| `eslintWarnings`      | `down` | Število opozoril ESLint se ne sme povečati |
| `coverage.statements` | `up`   | Pokritost stavkov se ne sme zmanjšati      |
| `coverage.lines`      | `up`   | Pokritost vrstic se ne sme zmanjšati       |
| `coverage.functions`  | `up`   | Pokritost funkcij se ne sme zmanjšati      |
| `coverage.branches`   | `up`   | Pokritost vej se ne sme zmanjšati          |

Za posodobitev osnovnega stanja po dejanskem izboljšanju:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Zastavica `--update` zapiše trenutno izmerjene vrednosti v `quality-baseline.json`.
To datoteko objavite skupaj s spremembo, ki je izboljšala metriko. Zahtevo PR, ki izboljša
metriko brez posodobitve osnovnega stanja, bo zaznal `--require-tighten` (faza 6A.5,
implementacija je v pripravi).

### CodeQL Ratchet: sprejem kandidatov in inventar skladišča

CI ima v lasti sprejem kandidata CodeQL prek izrecne verige odvisnosti: `codeql-scan` pokliče matriko štirih jezikov v `codeql.yml`, nato pa `codeql-admission` zažene `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` zahteva oba rezultata. Kakovost ohranja lastna številčna preverjanja, vendar ne povpraša optičnega bralnika, preden proizvajalec zaključi; Samo `Gate / Quality` ni popoln sprejem kandidatov. CodeQL je še vedno obvezen za kandidate samo za dokumente.

Pravilnik v `config/quality/codeql-admission-policy.json` izbere Dejanja, C/C++, JavaScript/TypeScript in Python, privzeto zbirko poizvedb, model oddaljene grožnje in način gradnje brez. Proizvajalec pred tiskom zavrne čakajoči aktivacijski zapis in se razveji izven eksplicitnega ciljnega seznama. Trenutni cilji so glavni in preizkusi pogodbe release/v3.8.54. primerjajo ta končni seznam in vzdrževalni potisni sprožilec z različico paketa; naslednjo izdajo je treba pregledati vkrcanje. Obstoječi sprožilec PR za širšo sprostitev CI je ohranjen, vendar nevkrcana tarča poroča HOLD pred ekstrakcijo, namesto da bi pridobila neizmerjeno PASS.

Vsako matrično opravilo zabeleži svoje dejansko nalaganje SARIF ID, jezik, kategorijo, zagon in poskus, identiteto poteka dela klicatelja, dogodek ref/head/base/merge SHA in zgoščeno vrednost pravilnika. Odvisno opravilo prenese samo potrdila tega zagona in potrdi izvlečke artefaktov. Zahteva vse štiri kategorije, uspešnega producenta in dokončano obdelavo vsakega natančnega nalaganja. Uporablja filter sarif_id API, ne najnovejše analize, najdene v veji. Delne ponovitve lahko ponovno uporabijo uspešne kategorije iz prejšnjega poskusa iste serije in kandidata, pri čemer se ohrani poskus produkcije; neuspešen trenutni proizvajalec ne more ponovno uporabiti prejšnjih zelenih dokazov.

Dejanje CodeQL čaka na obdelavo, vendar lahko njegova pripeta izvedba opozori in nadaljuje po napaki branja stanja ali izčrpanem čakanju. Sprejem torej ponovno preverja obdelavo. Manjkajoče kategorije, čakajoča obdelava, neuspešna ali preklicana opravila, zastarela identiteta, nepopolna paginacija ali nerazpoložljiv APIs izdelajo HOLD in izhod 2. Fiksno čakanje na potek dela neodvisnega optičnega bralnika ni več. Neprebran PR ne more prestati, ker je opozorilna poizvedba vrnila 0. Izmerjeno število nad `metrics.codeqlAlerts.value` se konča z 1; osnovna linija ni dvignjena, da bi absorbirala opozorila druge veje. [Stanje nalaganja in iskanje analize](https://docs.github.com/en/rest/code-scanning/code-scanning).

Potrdilo beleži nalaganje in analizo IDs, kategorije, različice orodij, ref/SHA, izhodiščne številke in številke opozoril. Število SARIF identity/result, najmanjše število pravil in natančni primeri opozoril ostajajo obvezni. Identitete PR/analysis se pred sprejemom ponovno preverijo. Ta preverjanja vzpostavijo pokritost konfigurirane kategorije in ne popisa vsake ekstrahirane izvorne datoteke. C/C++ ekstrakcija brez gradnje ne vključuje kode, ustvarjene med gradnjo projekta. Izključitve virov je še vedno treba pregledati, pripisovanje sodelavcev pa potrebuje primerljive natančne dokaze.

`codeql-maintenance.yml` zagotavlja potisne preglede z aktivno sprostitvijo in tedenski razpored brez podvajanja proizvajalcev PR/main. `nightly-codeql-inventory.yml` ohranja osnovno linijo celotnega repozitorija ločeno, z `--strict-measurement` in napako, ko meritev ni na voljo. Elegantno preskakovanje lokalnega zbiratelja dediščine ni dovoljenje za kandidate. Zaostrovanje ostaja izrecno `--update` po preverjenem nižjem globalnem številu.

Napredni potek dela ne sme biti objavljen, medtem ko je konfigurirana privzeta nastavitev: GitHub zavrne to kombinacijo. Njegov pravilnik z različicami ostaja v teku, dokler se pregledani upravni prehod ne prebere nazaj. Pred objavo operater pripne repozitorij, zgoščene vrednosti head/base/tree, policy/patch/rollback in opaženo stanje nastavitev; `node scripts/quality/codeql-producer.mjs verify-admin-readback` preveri posredovane pričakovane in dejanske zapise JSON. To je tehnična zaščita, ne odobritev operaterja ali zamenjava za pridobivanje novih povratnih informacij. Žeton PR nikoli ne zahteva skrbniškega dostopa. Uvedba in kakršna koli sprememba optičnega bralnika zahtevata ločeno povratno branje in dejanske dokaze o združljivosti PR, fork in merge-group.

Razcepi uporabljajo gostujoče izvajalce, preverjanje brez trajnih poverilnic, brez projekta install/build v proizvajalcu in brez podedovanih skrivnosti repozitorija. GitHub podpira nalaganje SARIF za dogodek pull_request s svojim zmanjšanim fork žetonom; odobritev izvršitve prvega prispevka ostaja politika GitHub. Nikoli ne uporabite pull_request_target za izvajanje nezaupljive kode. Potrdite dejanska dovoljenja žetona, analysis_key in vsa okolja kategorij v nadzorovanem kanarčku, preden menite, da je selitev dokončana. [Pravila za nalaganje viličarjev](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [nasprotujoči si načini nastavitve](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Odpuščanja so klic operaterja (Hard Rule #14)** — nikoli ne opusti opozorila CodeQL ne da bi zabeležil tehnično utemeljitev v komentarju o zavrnitvi: `won't fix` za zahtevo protokola navzgor, `used in tests` za preskusno napravo, `false positive` za razkužilo CodeQL ne vidi (precedens: `docs/security/ERROR_SANITIZATION.md`).

---

## Pravilnik ponovnih poskusov testov (WS5.4, v3.8.49)

Ponovni poskusi se določajo za vsak izvajalnik posebej, nikoli globalno — splošen ponovni poskus resnične regresije spremeni
v nevidne nestabilnosti:

| Izvajalnik       | Pravilnik                                                                                                                                   | Zakaj                                                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` samo v CI, z `trace: on-first-retry`                                                                                           | Časovno usklajevanje brskalnika/omrežja je dejansko nedeterministično; en ponovni poskus s sledjo spremeni nestabilnost v diagnostični artefakt |
| Vitest           | BREZ globalnega ponovnega poskusa. Dokazano nestabilen test dobi izrecen ponovni poskus na ravni testa (viden v razliki, pregledan v PR-ju) | Seznam izoliranih testov ostane v repozitoriju in ni nikoli nepregleden                                                                         |
| node:test (unit) | NIKOLI brez ponovnega poskusa                                                                                                               | Nestabilen test enote je napaka v testu — popravite ga, ne zaganjajte ga znova                                                                  |

Ciljni SLO-ji, ko bo na voljo telemetrija nestabilnosti (WS5.2/5.3): <1-% stopnja nestabilnosti na test
(prag »popravi takoj«), ≥95-% uspešnost na cevovod. Referenčne vrednosti panoge —
ponovno jih umerite glede na naše meritve.

## Odklon raglje na ravni izdaje (WS5.5, v3.8.49)

Ko raglja (velikost datoteke, kompleksnost, opozorila eslint) nazaduje na ČISTEM vrhu izdaje
— tj. nazadovanje je povzročila KOMBINACIJA združitev in ga noben posamezen PR ne poustvari
na svoji veji — je za popravek **enkratno odgovoren vodja izdaje, in sicer na veji
izdaje**: prednost dajte izločitvi/refaktoriranju; izhodiščno vrednost na novo določite samo z dokumentiranim
vnosom utemeljitve. Kombinacijskega odklona nikoli ne prelagajte na PR sodelujočega in nikoli
ne določajte nove izhodiščne vrednosti za vsak PR posebej (to skrije resnične regresije). Najprej razločite vzrok: rdeče stanje poustvarite
na čistem vrhu v preizkusnem delovnem drevesu, preden domnevate, da ga je povzročil vaš PR.

## Shranjevanje zmanjšanj raglje — smer navzdol (#8584)

Raglja je avtomatizirana le napol, in sicer napačna polovica. **Zvišanje** omejitve je
ročno urejanje JSON-a, ki traja deset sekund in je najhitrejši način za odblokiranje rdečega PR-ja.
**Znižanje** zahteva, da nekdo zažene `--update` in potrdi rezultat — dokler
ni bilo uvedeno opravilo `bank-ratchet-shrinks`, tega ni izvajal noben potek dela. Izmerjena posledica
(2026-07-25): 18 zamrznjenih datotek je bilo že na meji 800 vrstic za nove datoteke ali pod njo, najslabša
pa pri 132× (`src/shared/validation/schemas.ts`, 19 vrstic z omejitvijo 2.523); zgornja meja
kompleksnosti se je prek približno 37 opomb o ponovni določitvi izhodišča premaknila z `1794 → 2169`, pri čemer je bilo natanko eno
zmanjšanje (−1); zapis »zaostri z `--update` v naslednjem ciklu« pa se je pojavil 31-krat in bil upoštevan
enkrat. Omejitev, ki preživi kodo, zaradi katere je nastala, vsako dokončano
razgradnjo potiho spremeni v dovoljenje za rast za naslednjo osebo, ki ureja datoteko.

`nightly-release-green.yml` → opravilo **`bank-ratchet-shrinks`** sklene to zanko:

|              |                                                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------------------- |
| Izvaja se ob | `schedule` (3×/dan) + `workflow_dispatch` — namenoma **ne** ob `push`                                               |
| Meri         | najvišjo vejo `release/vX.Y.Z`, z enakim razreševanjem in zaščito pred vbrizgavanjem kot `release-green`            |
| Zapiše       | `check:file-size --update` in `check:complexity-ratchets --update` (oba sta po zasnovi namenjena samo zmanjševanju) |
| Preveri      | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                            |
| Dostavi      | en vedno posodobljen PR za vejo izdaje — prisilno posodobljen, nikoli podvojen                                      |

Shranjevanje poteka paketno in ne ob vsakem potisku, ker zanj ni zahteve glede zakasnitve (zmanjšanje,
shranjeno v 8 urah, je sprejemljivo), medtem ko bi izvajanje ob vsaki združitvi med kampanjami združevanja
vedno znova gradilo vejo PR-ja in vsakič zahtevalo celoten pregled ESLint. Zaznavanje ostaja vezano na
potisk (`release-green`); paketno je le shranjevanje.

### Varnostni preverjevalnik

Opravilo nenadzorovano zapisuje v izhodiščne vrednosti, zato sprejemljivost tega zagotavlja `verify-ratchet-bank.mjs`.
Primerja drevo po `--update` z `HEAD` in **prekine opravilo,
še preden obstaja kakršna koli potrditev** — ne da bi odprlo PR — razen če je vsaka sprememba ena od naslednjih:

- številski vnos `frozen` / `testFrozen`, ki je **znižan** ali **odstranjen**
- `complexity-baseline.json` → `count` je **znižan**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` je **znižan**

Vse drugo povzroči neuspeh: zvišanje števila, dodajanje vnosa, spreminjanje `cap`/`testCap` ali
brisanje/prepisovanje opombe `_rebaseline_*` (te opombe so revizijska sled razlogov za obstoj posamezne
zgornje meje in so shranjene znotraj istega objekta `frozen` kot vnosi datotek).
Bot, ki bi lahko zvišal omejitev, bi bil nedvomno slabši od obstoječega stanja. Varovalo pred regresijo:
`tests/unit/verify-ratchet-bank.test.ts`.

Opravilo nikoli ne potiska v `release/*` — PR združi človek, zato napačna meritev
ne more pristati brez pregleda.

## Pravilnik seznama dovoljenih izjem

Vsako preverjanje, ki ne more spodleteti zaradi že obstoječih kršitev, uporablja zamrznjen seznam dovoljenih izjem
(npr. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Pravilnik je:

**Odpravite osnovni vzrok; seznam dovoljenih izjem uporabite samo, kadar je kršitev že obstajala in
je ni mogoče odpraviti v istem PR-ju.**

Pri dodajanju vnosa na seznam dovoljenih izjem:

1. Dodajte komentar z utemeljitvijo.
2. Navedite povezano težavo za sledenje (npr. `// #3498 — Phase 2 feature, not yet implemented`).
3. Vnos odstranite v istem PR-ju, ki odpravi kršitev — zastarel vnos, ki ne
   prikriva več aktivne kršitve, je tudi sam napaka (preverjanje zastarelega uveljavljanja 6A.3 bo,
   ko bo implementirano, spodletelo zaradi osirotelega vnosa na seznamu dovoljenih izjem).

**Ne** dodajajte vnosov na seznam dovoljenih izjem samo zato, da bi testi hitreje uspeli. Uspešno preverjanje ob rastočem
seznamu dovoljenih izjem ustvarja lažen občutek kakovosti.

### Ko preverjanje za vaš PR spodleti

1. **Pozorno preberite izpis preverjanja** — natančno vam pove, katera datoteka ali simbol je kršil
   pravilo.
2. **Odpravite kršitev** — večina preverjanj je determinističnih preverjanj datotečnega sistema, ki uspejo takoj,
   ko je koda pravilna.
3. **Če je kršitev že obstajala** (tj. niste je uvedli vi, vendar jo preverjanje zdaj
   zajema): dodajte vnos na seznam dovoljenih izjem s komentarjem z utemeljitvijo in povezano težavo za sledenje.
4. **Če je preverjanje omejevalnik** (pokritost, opozorila ESLint, podvajanje, kompleksnost):
   vaša sprememba je poslabšala metriko. Odpravite osnovno težavo ali (redko) zaženite
   `npm run quality:ratchet -- --update`, če je sprememba namerna in je poslabšanje metrike
   sprejemljivo — vendar v opisu PR-ja dokumentirajte razlog.
5. **Svetovalna preverjanja** (`continue-on-error: true`) so informativna — ne blokirajo
   združitve, vendar se prikažejo v povzetku CI. Kljub temu jih odpravite.

---

## Dodajanje novega preverjanja

1. Ustvarite `scripts/check/check-<name>.mjs` (ali `.ts`). Preverjanja pravilnikov se končajo s kodo 0/1.
   Preverjanja vrste omejevalnik prek `collect-metrics.mjs` zapišejo metriko v `quality-metrics.json`.
2. Dodajte `"check:<name>": "node scripts/check/check-<name>.mjs"` v `package.json` in
   sinhronizirajte vzdevek ter njegov natančen ukaz v `config/quality/gate-manifest.json`.
   Enako sinhronizacijo izvedite pri spreminjanju ali odstranjevanju obstoječega vzdevka za preverjanje.
   Zaženite `npm run check:gate-manifest`; predpotrditveni kavelj in klasifikacija sprememb v CI
   zagotavljata upoštevanje te pogodbe.
3. Povežite ga v `.github/workflows/ci.yml` pod ustreznim opravilom
   (pravilnik → `lint` ali `docs-sync-strict`; omejevalnik → `quality-gate`).
4. Če uporablja seznam dovoljenih izjem, uporabite `reportStaleEntries()` iz
   `scripts/check/lib/allowlist.mjs`, da se zastareli vnosi samodejno zaznajo.
5. V `tests/unit/build/` napišite test, ki pokriva logiko zaznavanja preverjanja.
6. Posodobite ta dokument (dodajte vrstico v tabelo ustreznega opravila).

---

## Orodja za agente: LSP v zanki (izbirno)

Poleg preverjanj CI OmniRoute vključuje **izbirno** ogrodje `agent-lsp`
(datoteka `.mcp.json` na ravni projekta, Faza 7, naloga 15). Ustvarite `.mcp.json`,
da programerskim agentom omogočite dostop do jezikovnega strežnika TypeScript, tako da razrešijo simbole /
diagnostiko **pred** pisanjem kode — kot dopolnilo preverjanju `typecheck:core` po načelu prevajanja pred zatrjevanjem,
ki napake zaradi »izmišljenih simbolov« odpravlja pri viru. Namenoma se ne naloži
samodejno (most MCP↔LSP izberete in preverite sami); nedelujoč vnos zgolj zabeleži
napako povezave in nikoli ne prekine sej.

---

## Seznam za racionalizacijo (pregled ROI — faza 9, val 3)

Ta inventar je bil 2026-06-17 usklajen z `ci.yml` (prejšnja različica je izpustila
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Pregled ROI usklajenega nabora je
opredelil naslednje kandidate za racionalizacijo. **Združitve so mehanske spremembe CI;
preklopi/opustitve so politične odločitve, pridržane upravljavcu.** Nič od spodaj
navedenega še ni uveljavljeno.

**Zgoraj prav tako nedokumentirano** (svetovalno, z nizko informativno vrednostjo): opravilo `docs-lint` (markdownlint + Vale, celotno opravilo `continue-on-error`) in samostojna delovna toka pregledovalnikov `semgrep.yml` / `scorecard.yml`. CodeQL ima zdaj obvezni opravili proizvajalca in sprejema pod `Gate / CI`, ob upoštevanju zgoraj opisanih zahtev za aktivacijo. `semgrepFindings: 0` je v `quality-baseline.json`, vendar ni povezan z blokirajočim ratchetom v `ci.yml` — metrika trenutno ni povezana z uveljavljanjem.

### Združitev / odstranjevanje podvajanj (mehansko, manjše tveganje)

Vsak kandidat je bil 2026-06-17 preverjen glede na dejansko stanje kontrol (zaupaj, vendar preveri);
izkazalo se je, da več »očitnih« združitev skriva dolg in **niso** neposredno zamenljive.

- **`check:docs-sync` se izvede dvakrat** — samostojno v opravilu `lint` in znova znotraj `check:docs-all` (`docs-sync-strict`) ter v predpotrditvenem kavlju husky. ✅ **KONČANO** — samostojni klic v opravilu `lint` je odstranjen.
- **Pregledovanje CVE** — ❌ **Združitev NI neposredna.** `audit:deps` blokira kritična opozorila in nepopolne revizije v vseh petih zaklepnih datotekah, opozorila visoke stopnje pa v skladu s trenutno politiko poroča kot opozorila; `check:vuln-ratchet` (osv) spodleti samo ob _poslabšanju_ glede na shranjeno izhodiščno stanje in zavrne manjkajoče meritve, kadar so zahtevane. Semantika je različna — opustitev `audit:deps` bi odstranila absolutno kontrolo kritičnih ranljivosti in neodvisna dokazila revizije paketov. Ohranite oba.
- **Zaznavanje ciklov** — ✅ **KONČANO** (#15159 G-01/G-02). Staro besedilo je `check:cycles` opisovalo kot »zeleno, skrbno izbrano« kontrolo in utemeljevalo, da mora ostati blokirajoča, ker je `check:circular-deps` (dpdm) poročal o 91 ciklih. Ta zelena oznaka je bila **lažno zelena**: `check:cycles` je pregledal 5 podimenikov (450 datotek), ujemal samo statične `import|export … from` in zavrgel vsak določilnik `@/` ter `@omniroute/open-sse/`, zato ni mogel zaznati ciklov dinamičnih uvozov in vzdevkov, ki so prevladovali v repozitoriju. Popravljeno: kontrola zdaj prehodi `src` + `open-sse` (5023 datotek), zbira določilnike iz AST-ja TypeScript (zato se `import("…")` upošteva, `typeof import("…")` na mestu tipa pa ne) in razrešuje `paths` iz tsconfig. Najde **14** ciklov, ne 0. Ker 14 že obstoječih ciklov ni mogoče odpraviti v PR-ju za kontrolo, je `check:cycles` zdaj **raglja** (`--ratchet`, zgornja meja `metrics.cycles.value = 14` v `quality-baseline.json`, `direction: down`) — blokira vsako _poslabšanje_, število pa lahko samo pada. CI izvaja `npm run check:cycles:ratchet`. Postopno zmanjševanje poteka skupaj z **A-01**. `check:circular-deps` (dpdm) ostaja svetovalno širše drugo mnenje.
- **Kompleksnost** — ✅ **KONČANO** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): en prehod ESLint, štetje po ruleId, tako da izhodiščne vrednosti ciklomatske kompleksnosti + največjega števila vrstic in kognitivne kompleksnosti ostanejo neodvisne; posamezna `check:complexity` / `check:cognitive-complexity` ostaneta za lokalni `--update`.
- **Preprečevanje halucinacij za `/api`** — ✅ **KONČANO** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): en popis datotečnega sistema za `src/app/api`; openapi-routes + docs-symbols še vedno poročata neodvisno; posamezni kontroli ostaneta za lokalne zagone.
- **`check:node-runtime` se izvaja v 11 opravilih** — ⚠️ **nizek ROI.** Vsako uporablja ločen izvajalnik, preverjanje pa traja <1 s; skupni prihranek bi bil ~10 s, v zameno pa bi izgubili poceni varovalo za vsako opravilo. Ni vredno posega.
- **`typecheck:noimplicit:core` v preverjanju lint v CI** — ✅ **odstranjeno iz opravila lint** (bilo je svetovalno z `continue-on-error`); blokirajočo površino tipov predstavljata `typecheck:core` + `check:type-coverage`. Lokalni skript je ohranjen.

### Preklop / odločitev (politika upravljavca)

- `check:openapi-security-tiers` (svetovalno) — ❌ **Ni ga mogoče neposredno preklopiti.** Konča se s kodo 0, vendar opozarja, da več poti `traffic-inspector` pod `LOCAL_ONLY_API_PREFIXES` nima oznake `x-loopback-only: true`. Pred uveljavitvijo je treba te oznake dodati v `openapi.yaml`.
- `typecheck:noimplicit:core` (svetovalno) — v veliki meri ga nadomešča blokirajoča raglja `check:type-coverage`. Preklopite ga na ragljo ali opustite odvečni drugi prehod `tsc`.
- `test:vitest:ui` (zdaj **blokirajoče**) — že obstoječe napake so izrecno izključene v `vitest.config.ts` s sledilnimi komentarji `// #8618`; nove napake povzročijo neuspeh opravila.
- `check:secrets` (gitleaks, blokirajoča raglja) — trenutna zgornja meja je `metrics.secretFindings` v `quality-baseline.json`. Vsaka izjema potrebuje utemeljen vnos v `.gitleaks.toml`; nerazpoložljiva meritev pomeni INCOMPLETE. Pregled dopolnjuje GitHubovo izvorno pregledovanje skrivnosti in `check:public-creds`.
- `check:pr-evidence` (blokirajoče, preiskuje prozno besedilo telesa PR-ja) — veliko tveganje lažno pozitivnih rezultatov; opustitev bi oslabila uveljavljanje strogega pravila št. #18, zato gre za dejansko politično odločitev.
- `semgrep` (svetovalni samostojni delovni tok) — pri družinah OWASP se prekriva s CodeQL; povežite njegovo izhodiščno stanje z ragljo ali ga opustite.

---

## Povezana dokumentacija

- Dobavna veriga (izvor, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — prehod za pariteto nabora ključev

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, opravilo `i18n-ui-coverage`).
Primerja nabor končnih ključev vsake datoteke `src/i18n/messages/<locale>.json` z `en.json` in spodleti
ob vsakem manjkajočem ali dodatnem končnem ključu, ne glede na to, kdaj je bil ključ dodan. Ograde
`__MISSING__:` štejejo kot prisotne (njihova vsebina je stvar prehoda razmerja). To je absolutno dopolnilo
obeh prehodov, ki temeljita na razlikah oziroma odstotkih: `check-ui-keys-coverage` uveljavlja 80-% prag
za vsak jezik (43 manjkajočih ključev od približno 13.000 še vedno pomeni 99,7 %), `check-new-key-coverage`
pa presoja samo ključe, ki jih zahteva PR doda v `en.json`. Paket jezikov se ustvari iz različice `en.json`
na dan, ko je ustvarjena njegova veja, nato pa se prevaja več dni, medtem ko osnovna veja še naprej dodaja
ključe; zahteva PR za paket sama ne doda nobenega ključa, zato sta oba sorodna prehoda ostala tiha, ko je
bil paket 1 (#13044) združen s 43 manjkajočimi ključi v devetih jezikih, paket 2 (#13660) pa z 10
manjkajočimi ključi v osmih (2026-09-15). Napako odpravite z
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; dodatni končni ključ (`extra`)
pomeni, da ga je izvor odstranil — izbrišite ga iz jezika. `--warn` poroča brez sprožitve napake.
`--catalog=cli` izvede enako primerjavo nad `bin/cli/locales` (`npm run i18n:check-keys:cli`);
oba koraka sta del opravila `i18n-ui-coverage`.

#### `check-new-key-coverage` — prehod i18n za nove ključe

Sorodni prehod za `check-ui-value-drift`. Ta zazna angleško vrednost, ki je bila **prepisana**,
medtem ko so njeni prevodi ostali nespremenjeni; ta pa zazna angleški ključ, ki je bil **dodan**,
ne da bi ga nekateri jeziki prejeli.

`check-ui-keys-coverage` tega razreda ne more zaznati: uveljavlja odstotni prag za vsak jezik,
enajst manjkajočih ključev od približno 13.000 pa še vedno pomeni 99,9-% pokritost. Odstotek za
posamezen jezik ne more izraziti »ta funkcionalnost je bila izdana neprevedena« — celotna funkcionalnost
je lahko vključena v nov jezik brez kakršnega koli besedila, ne da bi se številka sploh spremenila.

Dogodek, ki ga ta prehod kodira: 3. faza platna Orchestration Canvas je svojih enajst ključev prevedla
v vseh 42 jezikov, ki so takrat obstajali. Nekaj ur pozneje je paket jezikov EU (#13044) povečal število
jezikov v repozitoriju na 51, devet novincev (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) pa
teh ključev ni nikoli prejelo. `deepMergeFallback` manjkajoči ključ nadomesti z angleščino, zato se je
napaka pokazala kot nepreveden uporabniški vmesnik in ne kot prazen uporabniški vmesnik — resnična težava,
ki je bila po zasnovi tiha.

Tako kot sorodni prehod tudi ta **upošteva razlike**, saj primerja angleščino na osnovi združitve z
delovnim drevesom, zato obstoječe vrzeli ostanejo zamrznjene in za vklop prehoda ni bila potrebna migracija.

**Ograda `__MISSING__:<english>` ga ne zadovolji (od 2026-09-17).** Prej je bila dokumentiran način
odloga — izvajalno okolje uporabi pravilno angleško nadomestno besedilo — dokler ni osem zahtev PR za
funkcionalnosti dne 2026-09-16 dodalo 61 ključev in v vseh 65 jezikih namesto prevoda vstavilo ogrado:
ta prehod je sprejel vse, nič ni blokiralo zahtev PR, blokirni prehod razmerja dejanskih prevodov pa je
nato spodletel na konici izdaje za vse (pt-BR 3,2 % > 2,5 % + 0,5). Ograda se zdaj obravnava kot
manjkajoči prevod. Napako odpravite z
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` ali pa vse
jezike vzporedno obdelajte z `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
varno za ločeno izvajanje, zavrne zagon brez okoljske spremenljivke `OMNIROUTE_TRANSLATION_*`). Ključ,
ki mora ostati v angleščini (pripeto ime izdelka, pogona ali zastavice), spada v
`scripts/i18n/untranslatable-keys.json`, nikoli za ogrado. `vi` povsem prepoveduje ograde
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — prehod za odložene preizkuse

Datoteka na seznamu `exclude` v `vitest.config.ts` je preizkus, ki se ne izvede, vendar je vsakomur,
ki pregleduje drevo, videti kot pokritost. Za komentarjem
`// #8618 — pre-existing failure; remove this exclusion when fixed` se je nabralo dvainšestdeset datotek.
Zadeva #8618 je bila zaprta 2026-08-11, medtem ko je seznam, ki mu je sledila, zrasel s 45 na 62 vnosov,
pri čemer je vsak nov vnos podedoval komentar, ki je kazal na mrtvo zadevo. Ko je bil seznam končno
izmerjen po posameznih datotekah (#13204), je **51 od 62 datotek prestalo preizkus glede na trenutno
drevo brez kakršne koli spremembe izvorne kode**.

Prehod zahteva, da vsaka izključitev, ki se razreši v dejansko datoteko, (a) navede sledilno zadevo in
(b) nastopa v `config/quality/vitest-exclusions.json` skupaj z izmerjenim stanjem, tako da je dodajanje
izključitve pregledljiva razlika v namenski datoteki in ne le še ena vrstica v polju s 60 vnosi. Namenoma
ne zažene znova izključenih preizkusov — to traja približno 10 minut in sodi v periodično opravilo;
evidenca beleži, kdaj je bila posamezna izključitev nazadnje izmerjena.
