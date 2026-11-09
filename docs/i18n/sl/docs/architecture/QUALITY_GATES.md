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

Vsak od delovnih tokov CI in Quality Gates izda stabilno razsodbo: `Gate / CI` in `Gate / Quality`. Njihov pravilnik o sprejemu v različicah našteva vsako predhodno delovno mesto kot zahtevano ali svetovalno. Ustrezno zahtevano opravilo mora uspeti: manjkajoči, preklicani, preskočeni, čakajoči in neznani rezultati ne morejo vzpostaviti PASS. Zaradi veljavne klasifikacije samo za dokumente ali samo za katalog lahko kodni pas postane neuporaben; navaden osnutek PR ni sprejet kandidat. Oznaka `hotfix` ne opusti dokazov.

Oba delovna toka zajemata PRs v veje main/release, potiske v `main`, ročno odpošiljanje in dogodke združevanja skupin. Push, dispatch in merge-group izvaja celotno izbiro. Zaupanja vreden osnutek čakalne vrste Mergify izvaja tudi ustrezna opravila `full-code`/`full-code-e2e` ; navaden PRs jih preskoči. Pred ročnim združevanjem zaženite popolno odpošiljanje na točno določenem kandidatu. Potiski v `release/**` ne zaženejo teh delovnih tokov; Release-Green ločeno opazuje združeno bazo (`docs/ops/RUNNER_BOX.md` → Hosted lane). Razcepi in skupine za združevanje uporabljajo gostujoče izvajalce za opravila, ki sicer izbirajo samogostiteljske izvajalce; pred uvedbo je treba preveriti zadostno gostujočo zmogljivost.

Navadna PR izvaja hitro izbiro. Proga `full-code` in `full-code-e2e` politike sprejema (E2E, integracija, artefakt paketa, Electron smoke, Bun SQLite, odjemalci ekosistema in protokola) se izvajata samo na osnutku čakalne vrste Mergify ali na celotnem zagonu: `gh workflow run ci.yml --ref <branch>`.

Vsako potrdilo JSON identificira odjavljeni SHA, zagon in poskus delovnega toka. CLI zavrne neujemanje checkout/event SHA. Preskusi delovnega toka vežejo članstvo v pravilniku na seznam `needs` opravila sodbe, tako da nov ali odstranjen pas ne more tiho izginiti. Potrdila pokrivajo lasten potek dela, ne pa objave, uvajanja ali notranjosti obstoječega svetovalnega skenerja. Izvedba ustreznih preverjanj, ki jih zahtevajo pravila podružnice, je ločena upravna sprememba; opredelitev njihovih delovnih mest sama po sebi ne ščiti podružnice.

`API Route Typecheck` je neodvisno preverjanje delovnega toka, zunaj zbirnih sodb in statičnega profila lokalnega polnega opazovalca. Njegov rezultat preverite posebej za točnega kandidata. `.github/workflows/api-route-typecheck.yml` teče na PRs v `main` ali `release/**`, potisne v družino veje, ročno odpošiljanje in dogodke `merge_group` tipa `checks_requested`. Nima filtra poti. Združite skupine preverite `merge_group.head_sha`; drugi dogodki preverite `github.sha`. Vsi dogodki uporabljajo iste teste diagnostičnih vrat API in enot vrat. PR base retargets zahtevajo novo preverjanje; urejanja body/title uporabljajo ime samo za opazovanje `Admission not requested / API Route Typecheck` in ne morejo nadomestiti sprejemnega preverjanja.

### Ohranjena dokazila v reduktorju sprejema

`scripts/quality/validate-release-acceptance.mjs` reducira podani načrt in njegove
manifeste; ne potrjuje, da načrt zajema celoten izdajni cevovod.
Njegova poročila izrecno nastavijo `releaseAcceptance: false`, tudi ko je ta načrt
`VERIFIED`. Potek dela `release-acceptance.yml` še vedno uporablja nadomestne preskusne podatke, ne pa
resničnih potrdil o gradnji, pakiranju, zagonu ali promociji.

CLI za preverjanje ohranjenih dokazil zahteva `--evidence-root`. Datoteke so razrešene
kot `<evidence-root>/<artifact_id>/<member>` in zgoščene z algoritmom SHA-256. Zapis PASS
brez dokazila, manjkajoča ali spremenjena datoteka, nevarna pot ali simbolna povezava prepreči
preverjanje. Manjkajoče datoteke niso enakovredne praznim dnevnikom uspešne izvedbe. Obstoječa
preverjanja SHA/izvedbe/poskusa ostanejo neodvisna: ujemajoči se bajti ne morejo rešiti zastarelega
potrdila. Celovitost datoteke ni dokaz pristnosti izvedbe ali promocije artefakta.

### DAST uporablja preverjeno gradnjo CI

Obvezno opravilo CI `dast-smoke` po `build` pokliče `.github/workflows/dast-smoke.yml`. Uporablja isti izbor glede na kodo in stanje osnutka kot gradnja, vključno s podprtimi PR-ji iz razcepov, PR-ji v veje izdaj in skupinami združevanja. Manjkajoče, neuspešno, preklicano ali nepričakovano preskočeno opravilo DAST blokira `Gate / CI`. Delovni tok za ponovno uporabo nima neodvisnega sprožilca PR/ročnega zagona; ročno preverjanje uporablja zagon CI, da gradnja in porabnik ostaneta v istem izvajanju.

`scripts/ci/next-build-provenance.mjs` zapečati celoten artefakt Next z njegovim izvlečkom tar, repozitorijem/dogodkom/izvajanjem, poskusom proizvajalca, head/base/checkout/tree, identitetami delovnih tokov, zaklepno datoteko, točno različico/ABI Node, platformo in paketnikom. DAST izbere nespremenljivi ID artefakta iz `needs.build.outputs`, zahteva preverjanje izvlečka prenosa in neodvisno primerja zgoščeno vrednost ZIP z izvlečkom proizvajalca, preden s `scripts/ci/unpack-ci-build.py` razširi njegova dva dovoljena člana. Pred razširitvijo drevesa Next se morata tudi manifest in arhiv tar ujemati z neodvisnimi izhodi proizvajalca. Nikoli ne išče zadnje uspešne gradnje veje. Delna ponovitev lahko ponovno uporabi isti poskus proizvajalca, če se njegov ID in vsi vhodi še vedno ujemajo; potrdilo zabeleži oba poskusa.

Porabnik ostane na gostovanem izvajalniku Linux z dovoljenjem za repozitorij samo za branje in brez skrivnosti repozitorija. Namesti točno različico Node proizvajalca, nato sestavi CLI z `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` zavrne manjkajoči samostojni strežnik pred kakršno koli nadomestno gradnjo; običajne lokalne gradnje CLI ohranijo obstoječi nadomestni postopek. Pripravljenost strežnika, Schemathesis in promptfoo morajo vsi uspeti znotraj nespremenjene omejitve opravila 25 minut. Potrdilo o izvoru dokazuje identiteto in bajte vhodov, ne uspešnega pregleda DAST. Potek veljavnosti artefakta, prekinitev izvajalnika ali neuspešen pregledovalnik ostajajo nepopolni ali neuspešni dokazi; svetovalni ovoj jih ne more spremeniti v PASS.

### Zmogljivost izvajanja uporabniškega vmesnika

CI izvaja celoten inventar uporabniškega vmesnika kot štiri matrične razdelke `test-vitest`, vsak z največ
dvema izvajalcema na razdelek in obstoječo 15-minutno časovno omejitvijo opravila. Prvi razdelek izvaja tudi
zbirko Vitest MCP/autoCombo. Rezultat obveznega opravila zajema vsak krak matrike; neuspeh
ali preklic enega razdelka ne more potrditi sprejema kandidata.

Nočni opazovalnik ohrani ločeno potrdilo za natančno določenega kandidata za vsak razdelek uporabniškega vmesnika,
vključno z izvajanjem MCP v prvem potrdilu. Zahtevani so vsa štiri potrdila, dnevniki in ujemajoče se
identitete izvedb. Lokalni `npm run test:vitest:ui` še vedno izbere
celotno zbirko; ena izvedba `--shard` je le delno dokazilo.

### Zbiranje pokritosti enot

Dvanajst razdelkov enot zbira pokritost V8 med obstoječim izvajanjem preizkusov. Uspešen
razdelek zažene `scripts/ci/compact-v8-coverage.mjs`, da stisne izvorne datoteke brez ustvarjanja
vmesnega poročila Istanbul. Končno opravilo Coverage preveri vseh dvanajst manifestov glede na
SHA kandidata, izvajalno okolje, koren izvorne kode in zgoščene vrednosti podatkov, nato pa zažene c8-jeve poročevalnike in obstoječe
pragove pokritosti. Vhodi ohranijo globalni vrstni red imen datotek c8; predhodno združevanje po razdelkih ni varno
za mešano pokritost funkcij/blokov. Manjkajoči, nepravilno oblikovani ali nezdružljivi razdelki povzročijo neuspeh sprejema.
Neuspeli preizkusni razdelki ločeno ohranijo neobdelano diagnostično pokritost; ta ne more biti vključena v končno združevanje.

### Potrdila o napredku izvajanja enotnih testov

Skupni ukaz `test:unit:ci:shard` beleži faze `primary`, `dashboard` in `serial`
prek skripta `scripts/ci/unit-progress-reporter.mjs`. Običajno poročilo o testih ostane
na voljo. Ločeno potrdilo, ki vsebuje samo metapodatke, beleži začetek in dokončanje vsake
datoteke, 30-sekundni signal aktivnosti pa navaja datoteke, ki so še vedno aktivne, in čas
njihovega izvajanja. Beleži samo metapodatke o izvajanju z dovoljenega seznama; opisi testov,
izhodni podatki, vsebina napak in celotno okolje se ne serializirajo.

CI hrani datoteke JSONL kot `unit-progress-ci-<run>-<attempt>-<shard>`. Časovna omejitev opravila lahko prepreči
poznejše nalaganje; že oddani signali aktivnosti ostanejo diagnostični dokaz. Manjkajoči
signali aktivnosti lahko pomenijo tudi, da je proces izvajalnika blokiran ali končan.
Ta potrdila ohranjajo obstoječi izbor testov, sočasnost, roke in izhodno stanje; ne pomenijo
odločitve o sprejemu kandidata.

### Združi čakalno vrsto

Oznaka `queue` pošlje PR v čakalno vrsto Mergify (`.mergify.yml`). Mergify odpre osnutek PR na veji `mergify/merge-queue/`, CI tam zažene celotno izbiro in izvirni PR se združi, ko `Gate / CI`, `Gate / Quality` in `Merge integrity (changelog + generated skills)` prehajajo.

Mergify zapiše svoj povzetek čakalne vrste v opis osnutka, urejajo pa ga lahko tudi druge aplikacije. Dogodek `pull_request` `edited` na takem osnutku prevzame lastno sočasno skupino (`-queue-edit-<run_id>`), tako da ne more preklicati dejanskega izvajanja osnutka in preskoči vrata in matriko. Samo `Merge integrity` še deluje. Preskočeno opravilo vrat nosi drugačno ime preverjanja, ker Mergify prebere preskočeno `Gate / CI` kot neuspelo preverjanje in odstrani PR iz čakalne vrste.

Po odstranitvi iz čakalne vrste potisni element PR ne postavi vedno znova v čakalno vrsto. Komentirajte `@mergifyio queue` o tem.

### Inventar statičnega pregledovanja

Različiceni inventar vzdevkov npm in članstvo v statičnem pregledovanju sta določena v
`config/quality/gate-manifest.json`. Za preverjanje imen skriptov in natančnih ukazov glede na `package.json` zaženite
`npm run check:gate-manifest`; dodatki, odstranitve in odstopanja ukazov povzročijo neuspeh
lokalne kljuke in opravil za razvrščanje sprememb v CI.
Vzdevek ni opravilo poteka dela, primerek matrike ali preizkusni primer: teh števil
se ne sme predstavljati kot medsebojno zamenljivih.

Uporabite `npm run quality:scan -- --list` ali `npm run quality:scan:fast -- --list`,
da pregledate izbrane vzdevke, ne da bi jih izvedli. Izvajalnik prikliče
vstopno točko npm, zato se ohrani njeno izvajalno okolje (vključno z Bun, kjer je konfiguriran).
Manifest beleži vzdevke zunaj teh profilov kot ločeno priklicane,
vzdrževalni ukazi pa so prepovedani v profilih pregledovanja samo za branje.

Ti profili zajemajo samo statično pregledovanje. Ne potrjujejo preizkusov izdelka,
pokritosti, pakiranja, zunanjih preverjanj ali celotnega sprejema kandidata za izdajo.
Sprejem v poteku dela uporablja povezani `config/quality/admission-policy.json` in
`scripts/quality/admission-verdict.mjs`. Profili opazovalnika izdaj ostanejo ločeni;
njihova veljavna preverjanja in potrdila preglejte neodvisno. Statični
ukazi celotnega opazovalnika so deklarirani v `config/quality/release-green-static-profile.json`, vključno z
`audit:deps`, izbiro mutacijskih preizkusov in preverjanji prevodov. Nalagalnik preveri ukaze npm
glede na package.json in modelirane deklaracije CI/Quality; odstopanja zavrne,
namesto da bi žetone lupine izvedel kot argumente. Obvezni izpis pregledovalnika SKIP/INCOMPLETE
ne more potrditi stanja PASS. Profil beleži svoje zunanje izključitve in ne nadomešča
gostovane pokritosti, preizkusnih matrik, dokazil o paketih ali uvedbi. Spodnji besedilni inventar
je referenca in ne dokaz, da je bila kontrola dejansko izvedena.

Skripti so v `scripts/check/` (kontrole pravilnikov) in `scripts/quality/` (mehanizem zapore).
Vir resnice za CI je `.github/workflows/ci.yml`.

### Stanje objavljene osnovne dokumentacije

`.github/workflows/i18n-base-health.yml` spremlja stanje dokumentacije po izbranih potiskih v `main` in `release/v*` ter ob ročnem zagonu. Njegovi filtri zajemajo dokumentacijo, korenske datoteke Markdown, `llm.txt`, stanje in konfiguracijo prevodov ter ustrezna orodja i18n. Edino opravilo `Published base documentation health` uporablja gostovani Ubuntu in petminutni rok. Izvaja preverjanje samo za branje in zapiše diagnostično potrdilo brez nameščanja odvisnosti, prevajanja ali prevzema stanja.

`scripts/i18n/check-base-health.mjs` zahteva, da ni nobenih nedoslednosti glede zgoščene vrednosti vira, manjkajočega cilja, zgoščene vrednosti cilja, zastarelega prevoda in predpomnilnika razdelkov. Prav tako preveri trenutni obseg temeljnih dokumentov in jezikovnih nastavitev ter zabeleženo poreklo. Neveljaven kontekst, nepopolna pokritost ali prekinjeno preverjanje povzroči rezultat `INCOMPLETE`; potrjeno odstopanje povzroči rezultat `FAIL`. Oba vrneta izhodno stanje napake. Potrdilo je vezano na SHA prevzete različice, delovni tok, izvajanje in poskus ter se hrani kot `i18n-base-health-<sha>-<run>-<attempt>`.

To je neodvisno opazovanje objavljene osnove. Ne dodaja dogodka zahteve za vlečenje ali skupine združevanja, obveznega preverjanja zahteve za vlečenje, vzdevka npm ali člana profila statičnega pregledovanja. Obstoječa diferencialna politika za zahteve za vlečenje in svetovalne razvrstitve temeljnega preverjevalnika ostajajo ločene. Uspešen prenos ne more spremeniti neuspešnega rezultata preverjanja stanja v PASS.

### Izdaja hitre poti PR (`quality.yml`)

`.github/workflows/quality.yml` dopolnjuje CI na main/release PRs, potiska v `main`, pošilja in spaja skupine. PRs uporablja hitra preverjanja s filtriranjem poti. Trajno onemogočena podvojena zgradba je bila odstranjena; pravi build/package/boot pregledi ostanejo v CI. Zbirka enot in vitest delujeta samo v CI (`Unit Tests (N/8)` in `Vitest`).

| delo                                             | Področje uporabe                                                                                                                                                                                               | Blokiranje              |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs in docs-all                                                                                                                                                                       | ja                      |
| `Fast Quality Gates`                             | koda PRs; statična preverjanja, preverjanje tipa, preverjanje tipa armaturne plošče, preskusi prizadetih enot                                                                                                  | ja                      |
| `Forgotten sibling tests`                        | koda PRs; spremenjeni moduli, sledeni statičnim porabnikom in sorodniškim testom kandidatov; sod in poti dinamičnega uvoza se poročajo kot svetovalna diagnostika, z navedenimi izjemami na seznamu dovoljenih | **Svetovalni**          |
| `No new ESLint warnings`                         | koda PRs; zaščita proti vlaknom, ki se zaveda zatiranja                                                                                                                                                        | Da, vključno z vilicami |
| `Merge integrity (changelog + generated skills)` | Neosnutek PRs; dnevnik sprememb in ustvarjena sinhronizacija spretnosti                                                                                                                                        | Da, vključno z vilicami |

#### Poročilo o testih pozabljenega brata in sestre

`npm run check:forgotten-sibling-tests` deluje kot svetovalni korak za `Fast Quality Gates` in ponovno uporabi razreševalnik uvoza za zemljevidom vpliva preskusa. Za vsak spremenjen produkcijski modul poroča o determinističnih verigah `changed module/symbol -> static consumer -> candidate sibling test`, ko test kandidata ni v razliki zahteve po vleku. Povzetek Markdown in rezultat JSON se ohranita kot artefakt delovnega toka `forgotten-sibling-tests` za kalibracijo pred kakršno koli uvedbo blokiranja.

Ponovni izvozi sodov in dinamični uvozi so samo diagnostika ločljivosti; nikoli ne ustvarijo blokirajoče ugotovitve. Pregledane izjeme so v živo v `config/quality/forgotten-sibling-allowlist.json`. Vsak vnos mora poimenovati test potrošnika in kandidata, navesti posebno utemeljitev in povezati težavo GitHub ali zahtevo za vlečenje. Napačno oblikovani vnosi se ne zaprejo. Izjeme ne morejo zavrniti izbrisanega kandidatnega testa ali razlike, ki dodaja `.skip`/`.todo`; oslabitev trditve in drugo maskiranje ostanejo v lasti neodvisno blokirajočih vrat `check:test-masking`.

### Opravilo: `lint`

Izvede se pri vsakem PR-ju v `main`. Ob neuspehu blokira združitev.

| Skript (`npm run ...`)            | Preverja                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Blokira                                    |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Različica Node.js je znotraj podprtega razpona                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                         |
| `check:cycles`                    | Krožne uvoze v celotnih imenikih `src/` + `open-sse/` (na podlagi AST, z razrešenimi `paths` iz tsconfig). Neposredni zagon se konča s kodo 1, kadar obstaja kateri koli cikel (varno zavračanje od #15281), in izpiše SCC-je. `check:cycles:ratchet` (kar izvaja CI) blokira, ko število preseže zgornjo mejo `metrics.cycles` v `quality-baseline.json` — trenutno 14, `direction: down`, zato se lahko le zmanjšuje (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da (raglja)                                |
| `check:boundary`                  | Sklopljenost `open-sse → src`: enolični uvozi med datotekami iz pogona v aplikacijo (`scripts/quality/measure-boundary.mjs`; seznam povezav je seznam preostalih sanacijskih opravil za razdelitev jedra/modulov v4). Neposredni zagon = svetovalno poročilo (enako kot `quality:boundary`). `check:boundary:ratchet` (kar izvaja CI in je tudi v zanki raglje hitrih kontrol v `quality.yml`) blokira, ko število preseže zgornjo mejo `metrics.boundaryOpenSseToSrc` v `quality-baseline.json` — začetna vrednost je izmerjenih 771, `direction: down`; `--update` jo lahko samo zniža; pri PR-jih je relativna glede na osnovno vejo (`--base-ref`, glejte spodaj)                                                                                                                                                                                                                                                                                                                                                  | Da (raglja)                                |
| `check:route-validation:t06`      | Prisotnost shem Zod na vseh poteh (pravilnik 6. ravni)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Da                                         |
| `check:any-budget:t11`            | Število `@ts-expect-error // any` ne presega proračuna (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                         |
| `check:provider-consistency`      | Vsak ponudnik v `providers.ts` ima ustrezen vnos v `providerRegistry.ts` (in obratno, znotraj seznama dovoljenih)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                         |
| `check:model-lifecycle`           | Tri ročno vzdrževane usmerjevalne tabele ostajajo skladne z vključeno kopijo stanja življenjskega cikla (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ne ocenjuje nobenega opuščenega ID-ja, ki ga lahko usmerja `REGISTRY`; vsak cilj `BUILT_IN_ALIASES` je prisoten v `REGISTRY` in odsoten iz kopije stanja opuščenih ID-jev; vsak opuščeni ID, ki je še vedno v `REGISTRY`, je preusmerjen ali naveden v `allowedRetiredInCatalog`; in noben vir ali cilj `DEFAULT_DEGRADATION_MAP` v tej kopiji stanja ni označen kot opuščen. To ne dokazuje, da model trenutno zagotavlja delujoča nadrejena storitev. Brez povezave — primerja z `config/quality/model-lifecycle.json`, ki se ročno osveži z `npm run quality:refresh-model-lifecycle` (zahteva omrežje; ni vključeno v CI). `allowedRetiredInCatalog` je postopoma zmanjševana varovalka: vnos dodajte le skupaj z zadevo za sledenje.                                                                                                                         | Da                                         |
| `check:fetch-targets`             | Vsak `fetch("/api/...")` v odjemalskem `src/` se razreši v dejanski `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                         |
| `check:deps`                      | Vse odvisnosti, ki jih je mogoče namestiti z `npm install`, iz vsake datoteke `package.json` v repozitoriju so navedene v `dependency-allowlist.json`; novi nepripeti ali tipografsko zavajajoči paketi so označeni                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                         |
| `audit:deps`                      | Preverjanje npm audit vseh petih neodvisnih datotek zaklepa (korenska, Electron, vtičniki OpenCode v1/v2 in ponudnik). Kritična varnostna opozorila blokirajo; opozorila visoke stopnje ostanejo vidna. Manjkajoča/neuspešna preverjanja so označena kot NEPOPOLNA in blokirajo; zgoščene vrednosti datotek zaklepa ter poročila za vsak obseg se ohranijo.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                         |
| `check:lockfile`                  | Celovitost datoteke `package-lock.json` — register https, zgoščene vrednosti za preverjanje celovitosti, brez preglasitev gostitelja                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                         |
| `check:licenses`                  | Seznam dovoljenih licenc SPDX za produkcijske odvisnosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                         |
| `check:tracked-artifacts`         | Brez artefaktov gradnje / potrjenih simbolnih povezav `node_modules` (izvede se tudi v husky pre-commit; pre-push je namenoma lahek — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Da                                         |
| `check:ai-attribution`            | Brez zaključne vrstice AI/bota `Co-Authored-By` ali noge o ustvarjanju z AI v potrditvah, naslovu ali vsebini PR-ja — strogo pravilo št. #16 (v zanki hitrih preverjanj `quality.yml` za PR→`release/**` — prebere koristno vsebino dogodka, zunaj PR-jev pa ne izvede ničesar — in korak samo za PR-je v preverjanju lint datoteke `ci.yml` za PR→`main`; tudi kavelj husky `commit-msg`; človeški soavtorji so dovoljeni; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:vitest-exclusions`         | Vsaka izključitev Vitest navaja težavo za sledenje in je navedena v `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                         |
| `check:file-size`                 | Izvorne datoteke (`.ts`/`.tsx` v `src/`, `open-sse/`, `electron/`, `bin/`) ostanejo znotraj `cap`, testne datoteke (`*.test.ts(x)`) pa znotraj `testCap`; datoteke, zamrznjene v `file-size-baseline.json` (`frozen` / `testFrozen`), ne smejo preseči svoje zabeležene velikosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                         |
| `check:error-helper`              | Odzivi z napakami v izvajalnikih/obdelovalnikih uporabljajo `buildErrorBody()` / `sanitizeErrorMessage()` (strogo pravilo št. #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                         |
| `check:migration-numbering`       | Migracijske datoteke SQL so oštevilčene zaporedno, brez vrzeli ali podvojenih številk                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                         |
| `check:public-creds`              | Zunaj `publicCreds.ts` ni dobesedno navedenih poverilnic OAuth `client_id`/`client_secret` ali spletnih ključev Firebase (strogo pravilo št. #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                         |
| `check:db-rules`                  | Zunaj modulov `src/lib/db/` ni neposrednih poizvedb SQL; ni krovnih uvozov iz `localDb.ts` (strogi pravili št. #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                         |
| `check:known-symbols`             | Izvajalniki ponudnikov, strategije usmerjanja in prevajalniki, registrirani v svojih tabelah za razpošiljanje, se ujemajo z datotekami na disku — brez osirotelih ali nedeklariranih simbolov                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                         |
| `check:route-guard-membership`    | Vsaka pot, ki ustvari podrejeni proces, je razvrščena s funkcijo `isLocalOnlyPath()` (strogi pravili št. #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                         |
| `check:test-discovery`            | Vsako datoteko `*.test.ts` / `*.spec.ts` v repozitoriju zbere vsaj en izvajalnik testov (postopno zaostrovanje: seznam osirotelih datotek v `test-discovery-baseline.json` se lahko le krajša)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                         |
| `check:test-tla-order`            | Nobena datoteka `node:test` v `tests/unit` ne registrira testa, nato naleti na `await` na najvišji ravni in zatem registrira še več testov (#18045; postopno zaostrovanje: `test-tla-order-allowlist.json` se lahko le krajša)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                         |
| `check:agent-skills-sync`         | Ustvarjeni artefakti zmožnosti agentov se ujemajo z izvornim katalogom (brez odstopanj)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:provider-asset-provenance` | Logotipi/sredstva ponudnikov imajo zabeležen vnos o izvoru                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | Konfiguracijske datoteke JSON se pravilno razčlenijo in izpolnjujejo pravila preverjanja repozitorija                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `typecheck:core`                  | Prevajanje TypeScripta brez napak (samo svetovalna opozorila)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                         |
| `typecheck:noimplicit:core`       | Strogi `noImplicitAny` — usmerjeno v prihodnost; številna že obstoječa mesta klicev še vedno potrebujejo anotacije                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **Svetovalno** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, omejen na `src/app/(dashboard)/**` (#7033) — skrbno izbran seznam 27 dovoljenih datotek v `typecheck:core` ne vključuje nobene datoteke TSX nadzorne plošče, prav tako pa jih `next build` nikoli ne preverja glede tipov (`next.config.mjs` nastavi `ignoreBuildErrors: true`), zato so bile regresije osirotelih identifikatorjev na tem mestu (#6625/#6909) za CI nevidne. Razlike se primerjajo z zamrznjenim izhodiščem števila napak na datoteko in kodo TS (`config/quality/dashboard-typecheck-baseline.json`, enak vzorec uveljavljanja zastarelosti kot pri `check:known-symbols`) — preverjanje spodleti samo zaradi NOVIH napak, ki presegajo izhodiščno število; ko je že obstoječa napaka odpravljena, znižajte izhodišče z `--update`.                                                                                                                                                                                                                                                           | Da                                         |
| `check:build-typecheck`           | Preverjanje tipov celotne aplikacije za produkcijo nad `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), ki ga površina 27-datotečnega dovoljenega seznama `typecheck:core` in preverjanje dashboarda ne pokrivata. Primerja spremembe z `config/quality/build-typecheck-baseline.json`; novo ali povečano število po paru (datoteka, koda) povzroči neuspeh, manjše število pa zahteva posodobitev osnove. `--update` se zavrne, če zagon vsebuje nov ali povečan par, razen če je podan `--force-regressions`, in zavrne tudi na novo utišano datoteko, razen če je podan `--force-nocheck`, zato sta razširitev osnove za uspešen rezultat in podelitev trajnega utišanja dve ločeni, namerni dejanji. Samostojni `--force` je zavrnjen. Obseg gradnje se preveri tudi glede `@ts-nocheck` v primerjavi z `config/quality/ts-nocheck-baseline.json`, ker datoteka, ki ga uporablja, ne poroča nobene diagnostike in bi bila sicer nevidna za vsa vrata za preverjanje. | Da                                         |

#### Programa za preverjanje tipov odgovarjata različno

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) in `check:build-typecheck` prevedeta različna programa z različnimi
možnostmi, zato je lahko ista datoteka v enem brez napak, v drugem pa polna napak.

`tsconfig.build.json` nastavi `"strict": false`, zato je `noImplicitAny` izklopljen. Konfiguracija
jedra prevede kurirani seznam dovoljenih 27 datotek s strožjimi možnostmi in sledi uvoznemu
grafu vsakega vnosa, zato se tam preverjajo tudi datoteke, ki se v programu gradnje nikoli
ne pojavijo.

Posledica je pomembna pri presoji, ali je datoteka tipizirana: **nič diagnostike
pod `check:build-typecheck` ne pomeni nič**. Odstranitev `@ts-nocheck` iz 26
datotek je pokazala, da jih je bilo 23 v programu gradnje brez napak; pri šestnajstih
od teh pa se je v strožjem programu pojavilo približno 120 napak implicitnega tipa any.
Preden datoteko označite kot brez napak, preverite oboje.

### Opravilo: `quality-gate`

Izvede se po `test-coverage`. Ob neuspehu blokira združitev.

| Skript                       | Preverja                                                                                                                                                            | Blokira                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `quality:collect`            | Ustvari `quality-metrics.json` (število opozoril ESLint, pokritost iz združenega poročila segmentov)                                                                | Da (predhodni korak mehanizma zategovanja) |
| `quality:ratchet`            | Nobena metrika v `quality-baseline.json` se ni poslabšala (opozorila ESLint ≤ izhodišče; pokritost ≥ izhodišče)                                                     | Da                                         |
| `check:duplication`          | Podvajanje kode (jscpd@4) ne presega izhodišča v `quality-baseline.json`                                                                                            | Da                                         |
| `check:complexity`           | Ciklomatska kompleksnost na ravni datoteke ne presega omejitve (osnovni pravili ESLint `complexity` + `max-lines-per-function`)                                     | Da                                         |
| `check:cognitive-complexity` | Mehanizem zategovanja kognitivne kompleksnosti (`eslint-plugin-sonarjs`) — ločen prehod ESLint; CI oba izvede združeno kot en sam korak `check:complexity-ratchets` | Da                                         |
| `check:dead-code`            | Mehanizem zategovanja za neuporabljene izvoze/datoteke (knip) se glede na izhodišče ne poslabša                                                                     | Da                                         |
| `check:compression-budget`   | Proračun primerjalnega preizkusa stiskanja — spodnje meje prihranka žetonov za posamezen mehanizem se ne smejo poslabšati                                           | Da                                         |
| `check:type-coverage`        | Mehanizem zategovanja odstotka tipiziranosti (`type-coverage`) se ne poslabša; večinoma zajema `typecheck:noimplicit:core`                                          | Da                                         |

### Opravili: `codeql-scan` in `codeql-admission`

`codeql-scan` ustvari vse nastavljene kategorije analize. Ko to opravilo uspe, `codeql-admission` preveri njegove točno določene prenose in ratchet opozoril kandidata. Obe sta obvezni odvisnosti `Gate / CI`, tudi za kandidate, ki spreminjajo samo dokumentacijo. Zahteve za skrbniško aktivacijo in canary so opisane spodaj v razdelku »Ratchet CodeQL«.

| Skript                 | Preverja                                                                                                                                                                                           | Blokira |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:codeql-ratchet` | Ref/SHA kandidata in vse nastavljene kategorije analize morajo biti aktualni pred ratchetom opozoril; manjkajoči dokazi blokirajo. Globalni inventar ostaja ločen — glejte »Ratchet CodeQL« spodaj | Da      |

### Posel: `quality-extended`

Opravilo blokira ustrezne kandidate. Velikost svežnja, najdbe skrivnosti, najdbe
ranljivosti, najdbe poteka dela in spremembe OpenAPI se preverjajo z obveznimi
mehanizmi zategovanja. Diagnostika krožnih odvisnosti ostaja svetovalna. Namestitev
pregledovalnikov je obvezna: `scripts/ci/install-quality-scanners.sh` zagotovi
pripete različice in posreduje napake pri namestitvi. Zaradi manjkajočih orodij,
neveljavnih poročil ali manjkajočih izhodišč ostanejo obvezna preverjanja
pregledovalnikov NEDOKONČANA.

| Skript                   | Preverja                                                                                                                                                                                                                                                                                              | Blokiranje                                      |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `check:circular-deps`    | Ni krožnih odvisnosti (dpdm)                                                                                                                                                                                                                                                                          | **Svetovalno**                                  |
| `check:bundle-size`      | Velikost paketa ne presega omejitve; meritev, ki ni na voljo, povzroči neuspeh                                                                                                                                                                                                                        | **Blokira z --ratchet**                         |
| `check:secrets`          | Ugotovitve Gitleaks se ne poslabšajo; obvezna preverjanja zavrnejo manjkajoča orodja/izvorno kodo/izhodiščno stanje, neuspešna preverjanja in neveljavna poročila                                                                                                                                     | **Blokira z --ratchet**                         |
| `check:vuln-ratchet`     | Ranljivosti odvisnosti se ne poslabšajo; obvezna preverjanja zavrnejo manjkajoča orodja, neveljavna poročila ali manjkajoča izhodiščna stanja                                                                                                                                                         | **Blokira z --ratchet**                         |
| `check:workflows`        | Preverjanje delovnih tokov (actionlint + zizmor); manjkajoči/nedelujoči pregledovalniki, neveljavna poročila ali manjkajoče izhodiščno stanje mehanizma ratchet povzročijo neuspeh s stanjem INCOMPLETE. Veljavne ugotovitve upoštevajo izbrani strogi/svetovalni pravilnik oziroma pravilnik ratchet | Izvedba je obvezna; zizmor ratchet blokira v CI |
| `check:openapi-breaking` | Pogodba javnega API-ja glede na pripete potrditve dogodkov (osnova združevanja PR, stanje pred potiskom, osnova skupine združevanja; pri načrtovanem/ročnem izvajanju prvi nadrejeni element prevzema); obvezna meritev ob napaki zavrne spremembo                                                    | **Blokira z --ratchet**                         |

### Posel: `docs-sync-strict`

Pri zahtevah za združitev v `main` ali `release/**` se to opravilo izvede samo za kandidate, ki niso osnutki (ali so v zaupanja vredni čakalni vrsti) in so razvrščeni kot spremembe dokumentacije ali kode. Izvede se tudi ob dogodkih CI, ki niso PR; sprožilec push tega delovnega toka zajema samo `main`, ne pa `release/**`. Korak, ki se konča z izhodno kodo, različno od nič, blokira opravilo; ugotovitve, namenjene samo poročanju, in spodaj dokumentirane izjeme ga ne blokirajo.

| Skript                         | Preverja                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Blokiranje                                                                                                                                 |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `check:docs-all`               | Meta-prehod, ki zaporedno izvede spodnjih 7 podprehodov                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                                                                                                                         |
| ↳ `check:docs-sync`            | Skladnost različic paketa/OpenAPI/CHANGELOG, natančne zrcalne kopije `llm.txt`, invariante razdelkov in velikosti prevedenega CHANGELOG ter odsotnost podvojenih dokumentov, ki so že bili nadomeščeni                                                                                                                                                                                                                                                                                                                               | Da                                                                                                                                         |
| ↳ `check:docs-frontmatter`     | Prevedene strani dokumentacije vsebujejo veljavne naslove v uvodnih metapodatkih                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                                                                                                                         |
| ↳ `check:docs-counts`          | Invariante števil z visoko stopnjo zaupanja se uveljavljajo strogo; hevristična preverjanja števila datotek samo opozarjajo, razen če skript prejme `--strict` (meta-prehod CI te zastavice ne poda)                                                                                                                                                                                                                                                                                                                                 | Stroga raven blokira; mehka raven je svetovalna                                                                                            |
| ↳ `check:env-doc-sync`         | Branja okoljskih spremenljivk v izvorni kodi, `.env.example` in `docs/reference/ENVIRONMENT.md` so usklajena po uporabi izrecnih seznamov izjem za prezrte elemente, elemente samo v dokumentaciji in elemente samo v okolju                                                                                                                                                                                                                                                                                                         | Da, zunaj dokumentiranih seznamov izjem                                                                                                    |
| ↳ `check:deprecated-versions`  | Poroča o morebitnih zastarelih različicah zunaj varnih zgodovinskih kontekstov in zastarelih datumih posodobitev, pri čemer izključi prezrte dokumente                                                                                                                                                                                                                                                                                                                                                                               | Svetovalno v trenutni nastavitvi CI (`--strict` se ne poda)                                                                                |
| ↳ `check:doc-links`            | Notranje povezave markdown v dokumentaciji kažejo na obstoječe datoteke (oblika `[text]`/`(path)`)                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                                                                                                                         |
| ↳ `check:fabricated-docs`      | Poti, okoljske spremenljivke, ukazi CLI, imena kavljev in poti datotek, navedeni v dokumentaciji, obstajajo v kodni zbirki. Stroga pregrada z `--strict`; brez zastavice je neuspeh neblokirajoč.                                                                                                                                                                                                                                                                                                                                    | Da (prek `--strict` v CI)                                                                                                                  |
| `check:cli-i18n`               | Ključi `t()`, uporabljeni v CLI, obstajajo v `en`; `pt-BR` ohranja vse razdelke najvišje ravni; `zh-CN` in `zh-TW` vsebujeta vse ključe iz `en`                                                                                                                                                                                                                                                                                                                                                                                      | Da                                                                                                                                         |
| `check:openapi-coverage`       | Specifikacija OpenAPI pokriva vsaj z mehanizmom ratchet določeno spodnjo mejo dejanskih poti                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                                                                                                                         |
| `check:openapi-security-tiers` | Deklarirane oznake `x-loopback-only`/`x-always-protected` morajo biti podprte s pravili v `routeGuard.ts`; napake razčlenjevalnika in neujemanja pri preverjanju naprej blokirajo. Obratno preverjanje manjkajoče oznake `x-loopback-only` pod predponami samo za lokalni dostop opozarja, poti, določene samo z vzorcem, pa so iz tega obratnega prehoda izključene.                                                                                                                                                                | Preverjanja razčlenjevalnika in preverjanja naprej blokirajo; obratno preverjanje je svetovalno                                            |
| `check:openapi-routes`         | Vsaka pot `/api...` v `openapi.yaml` ne glede na parametre ustreza dejanski poti po uporabi utemeljenega seznama izjem `KNOWN_STALE_SPEC`; zastareli vnosi na seznamu izjem prav tako povzročijo neuspeh                                                                                                                                                                                                                                                                                                                             | Da                                                                                                                                         |
| `check:docs-symbols`           | Notranji sklici URL `/api/...` v kanoničnih dokumentih, ki niso zrcalne kopije, ustrezajo dejanski poti ali družini poti; sklici na proxy/upstream/nadomestne oznake/datoteke in utemeljeni vnosi `KNOWN_STALE_DOC_REFS` so izključeni, zastareli vnosi na seznamu izjem pa povzročijo neuspeh                                                                                                                                                                                                                                       | Da                                                                                                                                         |
| `i18n translation drift`       | Preverja zgoščene vrednosti vira/cilja osnovnih dokumentov in izvor prevoda. Primerjava PR dovoljuje samo povsem enake podedovane napake; nove ali nepreverjene neskladnosti vira, manjkajočega cilja, zgoščene vrednosti cilja, zastarelega prevoda ali predpomnilnika razdelkov blokirajo. Zunaj primerjave PR napake vira/manjkajočega cilja/zgoščene vrednosti cilja blokirajo, zastareli prevodi in neskladni predpomnilniki razdelkov pa ostanejo le opozorila. Odsotnost predpomnilnika razdelkov v starem formatu ni napaka. | Novo/nepreverjeno odstopanje v PR blokira; povsem enako podedovano odstopanje je le opozorilo; pravila zunaj PR so odvisna od vrste napake |

Dvanajst datotek README SVG v `docs/diagrams/` je generiranih (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` regenerira vse). Vsaka ima enotski test primerjave bajtov
(`tests/unit/docs/readme-*-svg.test.ts`, opravilo `test-unit`), ki spodleti, ko je različica v repozitoriju zastarela, `check:docs-counts` pa bere kanonična števila iz njihovih vozlišč `<text>` — zato korak pretvarjanja v obrise ohrani vsak obrisan niz v datoteki kot neviden `<text>`. Preverjanje kanoničnih števil SVG bere datoteke, navedene v
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, pa tudi `public/images/tier-flow-dark.svg` in `tier-flow-light.svg`;
trditve free-forever, catalog-entry, recurring-pool in scoring-factors prav tako berejo
`promise-pillars.svg`, `free-tier-budget.svg` in `strategies-grid.svg`. `free-tier-budget.svg`
črpa svoje številke iz nalagalnika živega kataloga, zato sprememba `FREE_MODEL_BUDGETS` ali prikaznega imena ponudnika povzroči neuspeh CI, dokler ta datoteka ni regenerirana.

### Opravilo: `i18n-ui-coverage`

| Skript                              | Preverja                                                                                                                                                                                                        | Blokira         |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (vgrajeno) | Pokritost ključev i18n uporabniškega vmesnika je ≥ 65 %                                                                                                                                                         | Da              |
| `check-ui-value-drift` (vgrajeno)   | Spremenjena angleška **vrednost** za seboj ne pusti zastarelega prevoda                                                                                                                                         | Da              |
| `check-new-key-coverage` (vgrajeno) | **Nov** angleški ključ je preveden v vsaki jezikovni različici — oznaka `__MISSING__:` je zavrnjena                                                                                                             | Da              |
| `check-translation-ratio`           | Delež dejanskih prevodov na jezikovno različico (enako angleščini / nadomestna vrednost / manjkajoči listi zunaj seznama dovoljenih) ne sme preseči `config/quality/i18n-translation-baseline.json` + tolerance | **Blokirajoče** |

Zahteva `fetch-depth: 0` — varovalo za odmik vrednosti primerja `en.json` z osnovo združitve.

#### `check-ui-value-drift` — prehod za zastarele prevode

Prestreže tisto regresijo i18n, ki je druga varovala strukturno ne morejo zaznati: angleška vrednost
je spremenjena, prevodi, izpeljani iz _prejšnje_ angleške vrednosti, pa ostanejo, zato
neangleško govoreči uporabniki še naprej berejo samozavestno zapisano, vendar zdaj napačno besedilo.

To se je dejansko znašlo v izdaji. `oauthModal.googleOAuthWarning` je bil spremenjen, ko je bil dodan
pomočnik za prijavo Antigravity (#5203); **39 od 43 jezikovnih različic** je ohranilo besedilo, ki je
upravljavcem naročalo, naj »kopirajo celoten URL in ga prilepijo spodaj« — postopek, ki ga za tega
ponudnika ni mogoče dokončati. Težava je ostala neopažena do #8463, ker:

- `sync-ui-keys` dopolnjuje samo ključe, ki **manjkajo**, nikoli pa tistih, ki so **zastareli**;
- `check-ui-keys-coverage` šteje _prisotnost_ ključev, zato je zastarel prevod obravnavan kot pokrit;
- `check-translation-drift` spremlja dokumentacijske zrcalne kopije `docs/i18n/<locale>/**.md` —
  nikoli ne bere `src/i18n/messages/*.json`. Od ponovne sinhronizacije 2026-09 blokira v opravilu
  `docs-sync-strict`: uredite osnovni dokument → `npm run i18n:run -- --files=<doc>` (na ravni razdelka, poceni).

**Upošteva razlike in ne temelji na izhodišču.** Primerja `en.json` na osnovi združitve z
delovnim drevesom; za vsak ključ, katerega angleška vrednost se je spremenila, je vsaka jezikovna
različica, ki še vedno vsebuje nedotaknjen prevod, zastarela. To namenoma **zamrzne obstoječi dolg** —
iz razlike ni mogoče ugotoviti, iz katere stare angleške različice izvira že dolgo obstoječ prevod,
zato varovalo presoja samo tisto, česar se dotika trenutna sprememba. Alternativa (izhodišče z zgoščeno
vrednostjo za vsak ključ) bi zahtevala približno 600 KB veliko ustvarjeno datoteko, trikrat večjo od
največjega obstoječega izhodišča, ki bi se spreminjala pri vsakem PR-ju za i18n.

Zahtevo lahko izpolnite na dva načina:

1. posodobite zadevne prevode ali
2. nastavite jih na `__MISSING__:<new english>` — izvajalno okolje nato prikaže popravljeno angleško
   besedilo (`src/i18n/request.ts::deepMergeFallback`, #7258), ključ pa se uvrsti v čakalno vrsto za prevod.

Če se je spremenil **pomen** niza, raje **preimenujte ključ**: nov ključ ne more podedovati
zastarelega prevoda. Ta vzorec je bil uporabljen v #8463.

```bash
npm run i18n:check-value-drift          # strogo (kar izvaja CI)
npm run i18n:check-value-drift:warn     # samo poročilo
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Kontroli odmika vrednosti in novih ključev uporabljata isto nespremenljivo primerjavo iz
`scripts/i18n/resolve-ui-diff-base.mjs`. Delovni tok obema preverjanjema posreduje iste SHA-je osnove, konice osnove in
kandidata. Izvajanja za PR/spremembo ciljne veje (osnove), potisk in skupino združevanja uporabljajo kontekst svojega
dogodka. Ročni zagon za vejo kandidata zahteva njen točno določen odprti PR ali izrecni vhod
`i18n_base_sha`. Ročni ali načrtovani pregled veje `main` ali `release/vX.Y.Z`
brez tega vhoda primerja zadnjo potrditev z njenim prvim nadrejenim elementom; ne gre za revizijo
celotnega podedovanega dolga prevodov. Lokalni zagon zahteva izrecno osnovo primerjave,
na primer zgornji ukaz `BASE_REF`.

Manjkajoči ali dvoumni kontekst primerjave, neberljiv ali neveljaven zahtevani katalog in
spremenjeni kandidat povzročijo stanje `INCOMPLETE` z izhodno kodo **2**, tudi v opozorilnem načinu.
Katalogi se berejo z uporabo `scripts/i18n/read-ui-catalog.mjs`; napake pri branju se ne nadomestijo
s praznimi objekti. Niti nerazpoložljiva osnova niti nepopolni vhodni podatki ne pomenijo stanja PASS.

### Delovno mesto: `i18n`

Popolna validacijska matrika i18n (eno opravilo na jezik). Celotno delo je svetovalno.

| Skripta                         | Potrjuje                   | Blokiranje                                                 |
| ------------------------------- | -------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | Popolnost prevoda na jezik | **Svetovalni** (`continue-on-error: true` na celotno delo) |

### Delovno mesto: `pr-test-policy`

Deluje samo na zahtevo za vleko.

| Skripta                | Potrjuje                                                                                                                                  | Blokiranje |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PRs, ki spreminja produkcijsko kodo v `src/`, `open-sse/`, `electron/` ali `bin/` mora vključevati ali posodobiti teste (trdo pravilo #8) | ja         |
| `check:test-masking`   | Spremenjene testne datoteke ne zmanjšajo števila neto trditev ali dodajo tavtologij `assert.ok(true)`                                     | ja         |
| `check:pr-evidence`    | telo PR navaja dokaze test/VPS za spremembo (mehanizira Hard Rule #18 z greppingom PR prose — fragile, glejte Backlog)                    | ja         |

### Opravilo: `test-vitest`

Potrebuje opravilo za razvrščanje `changes`. Ustrezni deli matrike ob neuspehu blokirajo združitev.

| Sklop            | Preverja                                                                | Blokirajoče                                                                                                            |
| ---------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Strežnik MCP (110 orodij), autoCombo, predpomnilnik — izvajalnik vitest | Da                                                                                                                     |
| `test:vitest:ui` | Testi komponent uporabniškega vmesnika — izvajalnik vitest              | **Blokirajoče** — obstoječe napake so izrecno izključene v `vitest.config.ts`; nove napake povzročijo neuspeh opravila |

### Nočni delovni tokovi (načrtovani, svetovalni)

Te delujejo po urniku cron (in `workflow_dispatch`), nikoli po PRs. Vsi so svetovalni.

| Potek dela             | Potrjuje                                                                                                                                                    | Blokiranje     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | testi lastnosti hitrega preverjanja z naključnim začetnim številom +                                                                                        | **Svetovalni** |
| `nightly-resilience`   | heap-growth gate, kaos fault-injection, k6 load/soak                                                                                                        | **Svetovalni** |
| `nightly-llm-security` | promptfoo injection guard (blok način) + garak sonde (preskočeno brez skrivnosti ponudnika)                                                                 | **Svetovalni** |
| `nightly-schemathesis` | OpenAPI pogodba fuzzing (shemateza) proti OmniRoute v živo z uporabo `docs/openapi.yaml` — površin kršitve specifikacij / neobravnavanih 500 s (faza 8 B.4) | **Svetovalni** |
| `nightly-mutation`     | Strykerjev rezultat mutacijskega testiranja nad hitrim pasom enote — preživeli mutanti na površini šibki trdi                                               | **Svetovalni** |
| `nightly-compat`       | Matrika združljivosti motorja vozlišča v podprtih obsegih `engines.node`                                                                                    | **Svetovalni** |

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

### Ratchet CodeQL: sprejem kandidata in inventar repozitorija

CI upravlja sprejem kandidata prek CodeQL z izrecno verigo odvisnosti: `codeql-scan` pokliče matriko štirih jezikov v `codeql.yml`, nato `codeql-admission` izvede `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` zahteva oba rezultata. Quality ohrani svoja številčna preverjanja, vendar ne poizveduje pri pregledovalniku, preden proizvajalec konča; sam `Gate / Quality` ni popoln sprejem kandidata. CodeQL ostaja obvezen za kandidate, ki spreminjajo samo dokumentacijo.

Pravilnik v `config/quality/codeql-admission-policy.json` izbere Actions, C/C++, JavaScript/TypeScript in Python, zbirko poizvedb default, model groženj remote in način gradnje none. Predhodno preverjanje proizvajalca zavrne čakajoči zapis aktivacije in veje zunaj izrecnega seznama ciljev. Začetna cilja sta main in release/v3.8.53; naslednja izdaja zahteva pregledano vključitev. Obstoječi širši sprožilec CI za PR-je v veje izdaj se ohrani, vendar nevključen cilj pred ekstrakcijo sporoči HOLD, namesto da bi dobil neizmerjeni PASS.

Vsako opravilo matrike zabeleži dejanski ID prenosa SARIF, jezik, kategorijo, izvajanje in poskus, identiteto klicnega delovnega toka, ref/head/base/merge SHA dogodka in zgoščeno vrednost pravilnika. Odvisno opravilo prenese samo potrdila tega izvajanja in preveri izvlečke artefaktov. Zahteva vse štiri kategorije, uspešnega proizvajalca in končano obdelavo vsakega točno določenega prenosa. Uporablja filter API sarif_id, ne zadnje analize, najdene na veji. Delne ponovitve lahko znova uporabijo uspešne kategorije iz prejšnjega poskusa istega izvajanja in kandidata ter ohranijo poskus, ki jih je ustvaril; neuspešen trenutni proizvajalec ne more ponovno uporabiti prejšnjih zelenih dokazov.

Akcija CodeQL čaka na obdelavo, vendar lahko njena pripeta implementacija po napaki pri branju stanja ali izčrpanem čakanju izda opozorilo in nadaljuje. Zato sprejem ponovno preveri obdelavo. Manjkajoče kategorije, čakajoča obdelava, neuspešna ali preklicana opravila, zastarela identiteta, nepopolno straničenje ali nedosegljivi API-ji povzročijo HOLD in izhod 2. Ni več fiksnega čakanja na neodvisni delovni tok pregledovalnika. Nepregledan PR ne more uspeti zato, ker je poizvedba opozoril vrnila 0. Izmerjeno število nad `metrics.codeqlAlerts.value` povzroči izhod 1; baseline se ne zviša za vključitev opozoril druge veje. [Stanje prenosa in iskanje analize](https://docs.github.com/en/rest/code-scanning/code-scanning).

Potrdilo zabeleži ID-je prenosov in analiz, kategorije, različice orodij, ref/SHA, baseline in števila opozoril. Identiteta/število rezultatov SARIF, najmanjša števila pravil in točno določeni primerki opozoril ostajajo obvezni. Identitete PR-ja/analize se pred sprejemom ponovno preverijo. Ta preverjanja dokazujejo pokritost nastavljenih kategorij, ne inventarja vseh izvlečenih izvornih datotek. Ekstrakcija C/C++ brez gradnje ne vključuje kode, ustvarjene med gradnjo projekta. Izključitve virov še vedno potrebujejo pregled, pripisovanje odgovornosti prispevalcem pa primerljive dokaze iz točno določene osnove.

`codeql-maintenance.yml` zagotavlja preglede ob potisku v aktivno vejo izdaje in tedenski razpored brez podvajanja proizvajalcev za PR/main. `nightly-codeql-inventory.yml` ohranja baseline celotnega repozitorija ločen, z `--strict-measurement` in neuspehom, ko meritev ni na voljo. Prizanesljivo preskakovanje starega lokalnega zbiralnika ni sprejem kandidata. Zaostritev ostaja izrecen `--update` po potrjenem nižjem globalnem številu.

Delovnega toka Advanced ni dovoljeno objaviti, dokler je nastavljen Default Setup: GitHub to kombinacijo zavrne. Njegov različiceni pravilnik ostaja v čakanju, dokler pregledani skrbniški prehod ni potrjen s ponovnim branjem. Pred objavo operater pripne repozitorij, head/base/tree, zgoščene vrednosti pravilnika/popravka/povrnitve in opaženo stanje nastavitev; `node scripts/quality/codeql-producer.mjs verify-admin-readback` preveri podane pričakovane in dejanske zapise JSON. To je tehnična zaščita, ne odobritev operaterja ali nadomestilo za pridobivanje svežih povratnih odčitkov. Token PR-ja nikoli ne zahteva dostopa Administration. Uvedba in vsaka sprememba pregledovalnika zahtevata ta ločen povratni odčitek ter dejanske dokaze o združljivosti za PR, razcep in skupino združevanja.

Razcepi uporabljajo gostovane izvajalnike, checkout brez ohranjenih poverilnic, brez namestitve/gradnje projekta pri proizvajalcu in brez podedovanih skrivnosti repozitorija. GitHub podpira prenos SARIF za dogodek pull_request z omejenim tokenom razcepa; odobritev izvajanja prvega prispevka ostaja pravilnik GitHub. Nikoli ne uporabljajte pull_request_target za izvajanje nezaupanja vredne kode. Preden migracijo štejete za končano, v nadzorovanem canary preverite dejanska dovoljenja tokena, analysis_key in vsa okolja kategorij. [Pravila za prenose iz razcepov](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [nasprotujoči si načini nastavitev](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Zavrnitve so odločitev upravljavca (strogo pravilo št. #14)** — opozorila CodeQL nikoli ne zavrnite,
ne da bi v komentarju ob zavrnitvi navedli tehnično utemeljitev: `won't fix` za
zahtevo nadrejenega protokola, `used in tests` za testni pripomoček, `false positive`
za razkuževalnik, ki ga CodeQL ne more zaznati (precedens: `docs/security/ERROR_SANITIZATION.md`).

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
