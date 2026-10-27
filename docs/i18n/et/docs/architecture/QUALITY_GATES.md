# Quality Gates Reference (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

See dokument on kõigi OmniRoute’i CI kvaliteediväravate autoriteetne viide.
See kirjeldab iga väravat, mida see valideerib, millises CI töös see käivitatakse, kas see kasutab
ratchet-lähtejoont või läbitud/läbikukutud poliitikat ning kas see blokeerib järgu või on nõuandev.

Lühikokkuvõtte ja lubatud loendi poliitika leiate faili `AGENTS.md` jaotisest „Quality Gates & Ratchets“.
Sama süsteemi kriitilise hinnangu, küpsusklassifikatsiooni ja tööriistast sõltumatu
replikatsiooniplaani leiate dokumendist
[Quality Gate Playbook](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Kontrollväravate inventar ja käivitusprofiilid

### Kandidaadi vastuvõtmine

CI ja Quality Gates töövood väljastavad kumbki stabiilse otsuse: `Gate / CI` ja
`Gate / Quality`. Nende versioonitud vastuvõtupoliitika loetleb kõik eelnevad tööd
kohustuslike või soovituslikena. Kohaldatav kohustuslik töö peab õnnestuma: puuduv,
tühistatud, vahele jäetud, ootel või tundmatu tulemus ei saa kinnitada olekut PASS. Kehtiv
ainult dokumentatsiooni või ainult kataloogi muudatuse klassifikatsioon võib muuta koodiraja mittekohaldatavaks;
mustand-PR ei ole vastuvõetav kandidaat. Silt `hotfix` ei kõrvalda tõendite nõuet.

Mõlemad töövood hõlmavad PR-e põhi-/väljalaskeharudesse, tõukeid harusse `main`, käsitsi käivitamist
ja liitmisrühma sündmusi. Tõuke, käsitsi käivitamise ja liitmisrühma korral tehakse täielik valik. Tõuked
harudesse `release/**` neid ei käivita (2026-10-18): iga muudatus läbis maatriksi juba oma PR-is
ja liidetud kombinatsiooni eest vastutab Release-Green (`docs/ops/RUNNER_BOX.md` → majutatud rada). Forkid
ja liitmisrühmad kasutavad majutatud käitajaid tööde jaoks, mis muidu valiksid isemajutatud
käitajad; enne juurutamist tuleb kontrollida piisava majutatud võimsuse olemasolu.

Iga JSON-kviitung tuvastab välja võetud SHA, töövoo käituse ja katse.
CLI lükkab tagasi väljavõtte/sündmuse SHA mittevastavuse. Töövootestid seovad poliitika liikmesuse
otsusetöö loendiga `needs`, nii et uus või eemaldatud rada ei saaks märkamatult kaduda.
Kviitungid hõlmavad oma töövoogu, mitte avaldamist, juurutamist ega olemasoleva
soovitusliku skanneri sisemist tööd. Mõlema kontrollnime aktiveerimine harureeglites on
eraldi haldusmuudatus; nende tööde lisamine ei kaitse iseenesest haru.

### Säilitatud tõendid vastuvõtu reduktoris

`scripts/quality/validate-release-acceptance.mjs` redutseerib etteantud plaani ja selle
manifeste; see ei tõenda, et plaan hõlmab kogu väljalaskekonveierit.
Selle aruanded määravad sõnaselgelt `releaseAcceptance: false`, isegi kui plaan on
`VERIFIED`. Töövoog `release-acceptance.yml` kasutab endiselt näidisandmeid, mitte
tegelikke järgu-, pakendamis-, käivitamis- või edutamiskviitungeid.

CLI nõuab säilitatud tõendite kontrollimiseks võtit `--evidence-root`. Failid lahendatakse
kujul `<evidence-root>/<artifact_id>/<member>` ja räsitakse SHA-256 abil. Tõenditeta PASS-kirje,
puuduv või muudetud fail, ebaturvaline tee või sümbollink takistab
kontrollimist. Puuduvad failid ei ole samaväärsed tühjade edukate logidega. Olemasolevad
SHA/käituse/katse kontrollid jäävad sõltumatuks: kattuvad baidid ei saa päästa aegunud
kviitungit. Faili terviklus ei tõenda käivituse autentsust ega artefakti edutamist.

### Kasutajaliidese käivitusvõimsus

CI käitab kogu kasutajaliidese inventari nelja `test-vitest` maatriksikilluna, millest igaühel on kuni
kaks töötajat killu kohta ja olemasolev 15-minutiline töö tähtaeg. Esimene kild käitab ka
MCP/autoCombo Vitesti testikomplekti. Kohustuslik töötulemus hõlmab maatriksi iga haru; ühe killu
nurjumine või tühistamine ei saa kinnitada kandidaadi vastuvõtmist.

Igaöine vaatleja säilitab iga kasutajaliidese killu jaoks eraldi täpse kandidaadi kviitungi,
sealhulgas MCP käivituse esimeses kviitungis. Nõutavad on kõik neli kviitungit, logid ja kattuvad
käivitusidentiteedid. Kohalik `npm run test:vitest:ui` valib endiselt
kogu testikomplekti; üks `--shard` käitus on ainult osaline tõend.

### Üksustestide katvuse kogumine

Kaksteist üksustestikildude käitust koguvad V8 katvust olemasoleva testikäituse ajal. Edukas
kild käitab skripti `scripts/ci/compact-v8-coverage.mjs`, et tihendada algsed failid ilma
vahepealset Istanbuli aruannet genereerimata. Lõplik Coverage'i töö kontrollib kõiki kahtteist manifesti
kandidaadi SHA, käituskeskkonna, lähtejuure ja andmeräside suhtes ning käitab seejärel c8 reportereid ja olemasolevaid
katvuslävendeid. Sisendid säilitavad c8 globaalse failinimede järjestuse; killupõhine eelliitmine on ebaturvaline
funktsioonide/plokkide segakatvuse korral. Puuduvad, vigased või ühildumatud killud põhjustavad vastuvõtmise nurjumise.
Nurjunud testikillud säilitavad diagnostilise toorkatvuse eraldi; seda ei saa lõplikku liitmisse kaasata.

### Staatilise skannimise inventar

Versioonitud npm-i aliaste inventar ja staatilise skannimise liikmesus asuvad failis
`config/quality/gate-manifest.json`. Käivitage `npm run check:gate-manifest`, et kontrollida
skriptinimesid ja täpseid käske faili `package.json` suhtes; lisamised, eemaldamised ja
käskude lahknevused nurjavad nii kohaliku haagi kui ka muudatuste klassifitseerimise tööd CI-s.
Alias ei ole töövootöö, maatriksi eksemplar ega testjuhtum: neid arve ei tohi
esitada omavahel asendatavatena.

Kasutage `npm run quality:scan -- --list` või `npm run quality:scan:fast -- --list`,
et vaadata valitud aliaseid ilma neid käivitamata. Käitaja kutsub välja
npm-i sisenemispunkti, mistõttu säilib selle käituskeskkond (sealhulgas Bun, kus see on seadistatud).
Manifest salvestab neist profiilidest väljapoole jäävad aliased eraldi käivitatavatena ning
hoolduskäsud on kirjutuskaitstud skannimisprofiilides keelatud.

Need profiilid hõlmavad ainult staatilist skannimist. Need ei sertifitseeri toote teste,
katvust, pakendamist, väliseid kontrolle ega kandidaadi täielikku väljalaske vastuvõttu.
Töövoo vastuvõtt kasutab lingitud faili `config/quality/admission-policy.json` ja
skripti `scripts/quality/admission-verdict.mjs`. Väljalaskevaatleja profiilid jäävad eraldiseisvaks;
kontrollige nende kohaldatavaid kontrolle ja kviitungeid eraldi. Täieliku vaatleja staatilised
käsud on deklareeritud failis `config/quality/release-green-static-profile.json`, sealhulgas
`audit:deps`, mutatsioonitestide valik ja tõlkekontrollid. Laadur kontrollib npm-i
käske package.json-i ja modelleeritud CI/Quality deklaratsioonide suhtes; see lükkab lahknevused tagasi,
selle asemel et käivitada shelli sõnesid argumentidena. Kohustusliku skanneri väljund SKIP/INCOMPLETE
ei saa kinnitada olekut PASS. Profiil salvestab oma välised välistused ega asenda
majutatud katvuse, testimaatriksite, pakettide ega juurutuse tõendeid. Allolev tekstiline inventar
on viide, mitte tõend selle kohta, et kontrollvärav tegelikult käivitati.

Skriptid asuvad kataloogides `scripts/check/` (poliitikaväravad) ja `scripts/quality/` (fikseerimismootor).
CI tõeallikas on `.github/workflows/ci.yml`.

### Väljalaske-PR-i kiirtee (`quality.yml`)

`.github/workflows/quality.yml` täiendab CI-d peamise/väljalaskeharu PR-ide, `main`-harusse tehtavate tõugete,
käsitsi käivitamise ja ühendamisrühmade puhul. PR-id kasutavad teepõhise filtreerimisega kiireid kontrolle. Püsivalt
keelatud dubleeriv koostamine eemaldati; tegelikud koostamise, pakendamise ja käivitamise kontrollid jäävad CI-sse.

| Töö                                              | Ulatus                                                                                                                                                                                                          | Blokeeriv                |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `Docs Gates (fast-path)`                         | Dokumentatsiooni/koodi PR-id; API dokumentatsiooni viited ja kogu dokumentatsioon                                                                                                                               | Jah                      |
| `Fast Quality Gates`                             | Koodi PR-id; staatilised kontrollid, tüübikontroll, töölaua tüübikontroll, mõjutatud üksustestid                                                                                                                | Jah                      |
| `Forgotten sibling tests`                        | Koodi PR-id; muudetud moodulite seostamine staatiliste tarbijate ja võimalike sõsar-testidega; koondmoodulite ja dünaamiliste importide teed esitatakse nõuandva diagnostikana koos viidatud lubatud eranditega | **Nõuandev**             |
| `Vitest (fast-path)`                             | Koodi PR-id; kiire Vitesti testikomplekt                                                                                                                                                                        | Jah                      |
| `Unit Tests fast-path`                           | Koodi PR-id; neljaks jaotatud üksustestide komplekt                                                                                                                                                             | Jah                      |
| `No new ESLint warnings`                         | Koodi PR-id; eranditeadlik lintimise kaitsekontroll                                                                                                                                                             | Jah, sealhulgas forkides |
| `Merge integrity (changelog + generated skills)` | PR-id, mis pole mustandid; muudatuste logi ja genereeritud oskuste sünkroonsus                                                                                                                                  | Jah, sealhulgas forkides |

#### Unustatud sõsar-testide aruanne

`npm run check:forgotten-sibling-tests` kasutab uuesti testide mõjukaardi aluseks olevat impordilahendajat.
Iga muudetud tootmismooduli kohta esitab see deterministlikud
`changed module/symbol -> static consumer -> candidate sibling test` ahelad, kui võimalikku
testi tõmbetaotluse muudatuste hulgas pole. Markdowni kokkuvõte ja JSON-i tulemus säilitatakse
töövoo artefaktina `forgotten-sibling-tests`, et võimaldada kalibreerimist enne mis tahes blokeeriva kontrolli kasutuselevõttu.

Koondmoodulite reeksport ja dünaamilised impordid on ainult lahendusdiagnostika; need ei tekita kunagi
blokeerivat leidu. Läbivaadatud erandid asuvad failis
`config/quality/forgotten-sibling-allowlist.json`. Iga kirje peab nimetama tarbija ja võimaliku
testi, esitama konkreetse põhjenduse ning linkima GitHubi probleemi või tõmbetaotluse. Vigase vorminguga kirjed põhjustavad
kontrolli nurjumise. Erandid ei saa eirata kustutatud võimalikku testi ega muudatust, mis lisab `.skip`/`.todo`;
väidete nõrgendamist ja muud varjamist kontrollib jätkuvalt eraldiseisvalt blokeeriv
`check:test-masking` kontroll.

### Töö: `lint`

Käivitatakse iga `main`-haru PR-i puhul. Ebaõnnestumise korral blokeerib ühendamise.

| Skript (`npm run ...`)            | Kontrollib                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Blokeeriv                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| `check:node-runtime`              | Node.js-i versioon jääb toetatud vahemikku                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Jah                                      |
| `check:cycles`                    | Ringimportide olemasolu kogu `src/` + `open-sse/` ulatuses (AST-põhine, tsconfig-i `paths` lahendatud). Puhas käivitus lõpetab olekukoodiga 1 alati, kui leidub mõni tsükkel (alates #15281 tõrke korral suletud), ning loetleb SCC-d. `check:cycles:ratchet` (mida CI käitab) blokeerib, kui arv ületab failis `quality-baseline.json` määratud `metrics.cycles` ülempiiri — praegu 14, `direction: down`, seega saab see ainult väheneda (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Jah (põrkmehhanism)                      |
| `check:boundary`                  | `open-sse → src` seotus: unikaalsed failidevahelised impordid mootorist rakendusse (`scripts/quality/measure-boundary.mjs`; servade loend on v4 tuuma/mooduliteks jagamise parandustööde mahajäämus). Puhas käivitus = nõuandev aruanne (sama mis `quality:boundary`). `check:boundary:ratchet` (mida CI käitab, samuti `quality.yml` kiirete kontrollväravate põrkmehhanismi tsüklis) blokeerib, kui arv ületab failis `quality-baseline.json` määratud `metrics.boundaryOpenSseToSrc` ülempiiri — algväärtuseks on mõõdetud 771, `direction: down`; `--update` saab seda ainult vähendada; PR-ides baasi suhtes (`--base-ref`, vt allpool)                                                                                                                                                                                                                                                                                                                                                                             | Jah (põrkmehhanism)                      |
| `check:route-validation:t06`      | Zodi skeemide olemasolu kõigil marsruutidel (6. taseme poliitika)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Jah                                      |
| `check:any-budget:t11`            | `@ts-expect-error // any` arv ei ületa eelarvet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Jah                                      |
| `check:provider-consistency`      | Igale failis `providers.ts` olevale pakkujale leidub vastav kirje failis `providerRegistry.ts` (ja vastupidi, lubatud loendi piires)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jah                                      |
| `check:model-lifecycle`           | Kolm käsitsi hallatavat marsruutimistabelit püsivad kooskõlas hoidlasse lisatud elutsükli hetktõmmisega (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ei määra skoori ühelegi kasutuselt kõrvaldatud ID-le, mida `REGISTRY` suudab marsruutida; iga `BUILT_IN_ALIASES` sihtmärk on registris `REGISTRY` olemas ega sisaldu kasutuselt kõrvaldatud ID-de hetktõmmises; iga kasutuselt kõrvaldatud ID, mis on endiselt registris `REGISTRY`, suunatakse edasi või on loetletud loendis `allowedRetiredInCatalog`; ning ükski `DEFAULT_DEGRADATION_MAP` lähte- ega sihtkirje ei ole selles hetktõmmises märgitud kasutuselt kõrvaldatuks. See ei tõesta, et mudelit teenindab praegu toimiv ülesvooluteenus. Võrguühenduseta — võrdleb failiga `config/quality/model-lifecycle.json`, mida värskendatakse käsitsi käsuga `npm run quality:refresh-model-lifecycle` (vajab võrku; pole CI-ga ühendatud). `allowedRetiredInCatalog` on järk-järgulise vähendamise põrkmehhanism: lisage kirje ainult koos jälgimisprobleemiga. | Jah                                      |
| `check:fetch-targets`             | Iga kliendipoolses kataloogis `src/` olev `fetch("/api/...")` viitab tegelikule failile `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jah                                      |
| `check:deps`                      | Kõik hoidla igas failis `package.json` olevad sõltuvused, mida saab installida käsuga `npm install`, sisalduvad failis `dependency-allowlist.json`; uued kinnitamata versiooniga või kirjaveopettuse ohuga paketid märgitakse                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Jah                                      |
| `audit:deps`                      | Kõigi viie sõltumatu lukustusfaili npm-audit (juurkataloog, Electron, OpenCode'i pistikprogrammid v1/v2 ja pakkuja). Kriitilised turvahoiatused blokeerivad; kõrge taseme turvahoiatused jäävad nähtavateks hoiatusteks. Puuduvad või nurjunud auditid märgitakse olekuga INCOMPLETE ja blokeerivad; ulatusepõhised lukuräsid ning aruanded säilitatakse.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Jah                                      |
| `check:lockfile`                  | `package-lock.json` terviklus — HTTPS-register, terviklusräsid, hosti ülekirjutused puuduvad                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jah                                      |
| `check:licenses`                  | Tootmissõltuvuste SPDX-litsentside lubatud loend                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Jah                                      |
| `check:tracked-artifacts`         | Kooste artefaktid / versioonihaldusse lisatud `node_modules` sümbollingid puuduvad (käivitatakse ka husky commit'i-eelses konksus; push'i-eelne konks on tahtlikult kerge — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jah                                      |
| `check:ai-attribution`            | PR-i commit'ides, pealkirjas ega sisus ei tohi olla tehisintellekti/roboti `Co-Authored-By` järelrida ega tehisintellektiga genereerimise jalust — range reegel #16 (`quality.yml` kiirete kontrollide tsüklis PR→`release/**` jaoks — loeb sündmuse lasti, väljaspool PR-e ei tee midagi — ning ainult PR-idele mõeldud etapp `ci.yml` lintimises PR→`main` jaoks; samuti husky `commit-msg` konks; inimkaasautorid on lubatud; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:vitest-exclusions`         | Iga Vitesti välistus nimetab jälgimisprobleemi ja sisaldub failis `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jah                                      |
| `check:file-size`                 | Lähtefailid (`.ts`/`.tsx` kaustades `src/`, `open-sse/`, `electron/`, `bin/`) jäävad `cap` piiresse ja testifailid (`*.test.ts(x)`) `testCap` piiresse; failis `file-size-baseline.json` külmutatud failid (`frozen` / `testFrozen`) ei tohi kasvada üle nende salvestatud suuruse                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jah                                      |
| `check:error-helper`              | Täiturite/käsitlejate veavastused kasutavad `buildErrorBody()` / `sanitizeErrorMessage()` (range reegel nr 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Jah                                      |
| `check:migration-numbering`       | Migratsiooni SQL-failid on järjestikku nummerdatud, ilma lünkade või duplikaatideta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Jah                                      |
| `check:public-creds`              | Väljaspool faili `publicCreds.ts` ei ole literaalseid OAuthi `client_id`/`client_secret` väärtusi ega Firebase Web võtmeid (range reegel nr 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Jah                                      |
| `check:db-rules`                  | Väljaspool kataloogi `src/lib/db/` mooduleid ei ole toorest SQL-i; failist `localDb.ts` ei kasutata koondimporti (ranged reeglid nr 2/5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Jah                                      |
| `check:known-symbols`             | Pakkujate täiturid, marsruutimisstrateegiad ja tõlkijad, mis on registreeritud nende suunamistabelites, vastavad kettal olevatele failidele — puuduvad orvuks jäänud või deklareerimata sümbolid                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Jah                                      |
| `check:route-guard-membership`    | Iga alamprotsessi käivitav marsruut on klassifitseeritud funktsiooniga `isLocalOnlyPath()` (ranged reeglid nr 15/17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jah                                      |
| `check:test-discovery`            | Iga repos olev `*.test.ts` / `*.spec.ts` fail kogutakse vähemalt ühe testikäitaja poolt (ratchet: orbude loend failis `test-discovery-baseline.json` saab ainult kahaneda)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Jah                                      |
| `check:test-tla-order`            | Ükski `node:test` fail kataloogis `tests/unit` ei registreeri testi, ei jõua tipptaseme `await`-ini ega registreeri seejärel uusi teste (#18045; ratchet: `test-tla-order-allowlist.json` saab ainult kahaneda)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Jah                                      |
| `check:agent-skills-sync`         | Genereeritud agendioskuste artefaktid vastavad nende lähtekataloogile (lahknevusi pole)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:provider-asset-provenance` | Pakkujate logodel/varadel on registreeritud päritolukirje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `lint:json`                       | JSON-i konfiguratsioonifailid parsitakse ja need vastavad repo lintimisreeglitele                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `typecheck:core`                  | TypeScripti kompileerimine vigadeta (ainult nõuandvad hoiatused)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Jah                                      |
| `typecheck:noimplicit:core`       | Range `noImplicitAny` — tulevikku suunatud; paljud olemasolevad väljakutsekohad vajavad endiselt annotatsioone                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | **Nõuandev** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, mille ulatus on piiratud kataloogiga `src/app/(dashboard)/**` (#7033) — `typecheck:core`-i hoolikalt valitud 27 faili lubatud loend ei sisalda ühtegi töölaua TSX-faili ning ka `next build` ei tee neile kunagi tüübikontrolli (`next.config.mjs` määrab `ignoreBuildErrors: true`), mistõttu olid seal esinevad orbidentifikaatorite regressioonid (#6625/#6909) CI-le nähtamatud. Erinevusi võrreldakse külmutatud faili- ja TS-koodi-põhise arvu lähtetasemega (`config/quality/dashboard-typecheck-baseline.json`, sama aegunud kirjete jõustamise muster nagu `check:known-symbols`) — kontroll ebaõnnestub ainult lähtetaseme arvust suurema hulga UUTE vigade korral; kui olemasolev viga parandatakse, langetage lähtetaset käsuga `--update`.                                                                                                                                                                                                                                                           | Jah                                      |

### Töö: `quality-gate`

Käivitub pärast tööd `test-coverage`. Tõrke korral blokeerib ühendamise.

| Skript                       | Kontrollib                                                                                                                                                                                                         | Blokeeriv                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| `quality:collect`            | Väljastab faili `quality-metrics.json` (ESLinti hoiatuste arv, ühendatud fragmentide aruandest pärinev testikate)                                                                                                  | Jah (lävendmehhanismile eelnev) |
| `quality:ratchet`            | Ükski faili `quality-baseline.json` mõõdik pole halvenenud (ESLinti hoiatused ≤ lähtetase; testikate ≥ lähtetase)                                                                                                  | Jah                             |
| `check:duplication`          | Koodi dubleerimine (jscpd@4) ei ületa failis `quality-baseline.json` määratud lähtetaset                                                                                                                           | Jah                             |
| `check:complexity`           | Failitaseme tsüklomaatiline keerukus ei ületa ülempiiri (ESLinti põhifunktsioonid `complexity` + `max-lines-per-function`)                                                                                         | Jah                             |
| `check:cognitive-complexity` | Kognitiivse keerukuse lävendmehhanism (`eslint-plugin-sonarjs`) — eraldi ESLinti käitus; CI käitab mõlemat ühendatuna ühe sammuna `check:complexity-ratchets`                                                      | Jah                             |
| `check:dead-code`            | Kasutamata eksporditud elementide / failide lävendmehhanism (knip) ei halvene võrreldes lähtetasemega                                                                                                              | Jah                             |
| `check:compression-budget`   | Tihendamise jõudlustesti eelarve — mootoripõhised tokenisäästu alampiirid ei tohi halveneda                                                                                                                        | Jah                             |
| `check:type-coverage`        | Tüübitud koodi protsendi lävendmehhanism (`type-coverage`) ei halvene; asendab suures osas kontrolli `typecheck:noimplicit:core`                                                                                   | Jah                             |
| `check:codeql-ratchet`       | Avatud CodeQL-i hoiatuste arv ei halvene (loeb käsuga `gh api`; tokeni puudumisel jäetakse sujuvalt vahele) — värskendamissageduse ja käsitsi käivitamise kohta vaadake allpool jaotist „CodeQL-i lävendmehhanism“ | Jah                             |

### Töö: `quality-extended`

Töö blokeerib asjakohased kandidaadid. Paketi suurust, saladuste leide, haavatavuste
leide, töövoo leide ja OpenAPI muudatusi kontrollitakse kohustuslike lävendmehhanismidega.
Tsükliliste sõltuvuste diagnostika jääb soovituslikuks. Skannerite paigaldamine on kohustuslik:
`scripts/ci/install-quality-scanners.sh` paigaldab fikseeritud versioonid ja edastab
paigaldustõrked. Puuduvate tööriistade, vigaste aruannete või puuduvate lähtetasemete korral jääb
kohustuslik skannerikontroll olekusse INCOMPLETE.

| Skript                   | Kontrollib                                                                                                                                                                                                                 | Blokeeriv                                                    |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `check:circular-deps`    | Ringseid sõltuvusi pole (dpdm)                                                                                                                                                                                             | **Nõuandev**                                                 |
| `check:bundle-size`      | Paketi suurus ei ületa ülempiiri; mõõtmise kättesaamatus põhjustab nurjumise                                                                                                                                               | **Blokeeriv võtmega --ratchet**                              |
| `check:secrets`          | Gitleaksi leiud ei halvene; kohustuslikud skannid lükkavad tagasi puuduvad tööriistad/lähtekoodi/lähtebaasi, nurjunud skannid ja vigased aruanded                                                                          | **Blokeeriv võtmega --ratchet**                              |
| `check:vuln-ratchet`     | Sõltuvuste haavatavused ei halvene; kohustuslikud skannid lükkavad tagasi puuduvad tööriistad, vigased aruanded või puuduvad lähtebaasid                                                                                   | **Blokeeriv võtmega --ratchet**                              |
| `check:workflows`        | Töövoogude lintimine (actionlint + zizmor); puuduvad/rikkis skannerid, vigased aruanded või puuduv ratchet-lähtebaas nurjuvad olekuga INCOMPLETE. Korrektsed leiud järgivad valitud ranget/nõuandvat/ratchet-poliitikat    | Käivitamine on kohustuslik; zizmor ratchet on CI-s blokeeriv |
| `check:openapi-breaking` | Avaliku API leping kinnitatud sündmuse commit'ide suhtes (PR-i merge-base, push'i before, merge-group'i baas; ajastatud/käsitsi käivitamisel checkout'i esimene vanem); kohustusliku mõõtmise nurjumisel katkestatakse töö | **Blokeeriv võtmega --ratchet**                              |

### Töö: `docs-sync-strict`

`main`-i või `release/**`-i suunatud pull request’ide korral käivitub see töö ainult mustandiks märkimata (või usaldatud järjekorra) kandidaatidel, mis on liigitatud dokumentatsiooni- või koodimuudatusteks. Töö käivitub ka PR-väliste CI-sündmuste korral; selle töövoo push-päästik hõlmab ainult `main`-i, mitte `release/**`-i. Nullist erineva väljumiskoodiga samm blokeerib töö; allpool kirjeldatud ainult aruandesse minevad leiud ja dokumenteeritud erandid seda ei tee.

| Skript                         | Kontrollib                                                                                                                                                                                                                                                                                                                                            | Blokeeriv                                                                                 |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `check:docs-all`               | Metavärav, mis käivitab alltoodud 7 alamväravat järjestikku                                                                                                                                                                                                                                                                                           | Jah                                                                                       |
| ↳ `check:docs-sync`            | Paketi/OpenAPI/CHANGELOG-i versioonide kooskõla, täpsed `llm.txt` peeglid, tõlgitud CHANGELOG-i jaotiste/mahu invariandid ning asendatud duplikaatdokumentide puudumine                                                                                                                                                                               | Jah                                                                                       |
| ↳ `check:docs-frontmatter`     | Kompileeritud dokumentatsioonilehtedel on kehtivad frontmatter’i pealkirjad                                                                                                                                                                                                                                                                           | Jah                                                                                       |
| ↳ `check:docs-counts`          | Kõrge usaldusväärsusega loendusinvariandid on ranged; heuristilised failiarvu kontrollid ainult hoiatavad, kui skriptile ei anta `--strict` (CI metavärav seda ei edasta)                                                                                                                                                                             | Range tase blokeerib; pehme tase on nõuandev                                              |
| ↳ `check:env-doc-sync`         | Lähtekoodi keskkonnamuutujate lugemised, `.env.example` ja `docs/reference/ENVIRONMENT.md` on kooskõlas pärast selgesõnaliste ignore-, doc-only- ja env-only-erandiloendite rakendamist                                                                                                                                                               | Jah, väljaspool dokumenteeritud erandiloendeid                                            |
| ↳ `check:deprecated-versions`  | Teatab võimalikest aegunud versioonidest väljaspool ohutuid ajaloolisi kontekste ja aegunud uuendamiskuupäevadest, jättes ignoreeritud dokumendid välja                                                                                                                                                                                               | Praeguses CI seadistuses nõuandev (`--strict` ei edastata)                                |
| ↳ `check:doc-links`            | Dokumentatsiooni sisemised markdown-lingid viitavad olemasolevatele failidele (`[text]`/`(path)`-vorming)                                                                                                                                                                                                                                             | Jah                                                                                       |
| ↳ `check:fabricated-docs`      | Dokumentatsioonis nimetatud marsruudid, keskkonnamuutujad, CLI-käsud, hook'ide nimed ja failiteed on koodibaasis olemas. Range kontroll võtmega `--strict`; ilma liputa pehme nurjumine.                                                                                                                                                              | Jah (CI-s võtmega `--strict`)                                                             |
| `check:cli-i18n`               | Kasutatud CLI `t()` võtmed on olemas failis `en`; `pt-BR` säilitab kõik ülataseme jaotised; `zh-CN` ja `zh-TW` sisaldavad kõiki `en` võtmeid                                                                                                                                                                                                          | Jah                                                                                       |
| `check:openapi-coverage`       | OpenAPI spetsifikatsioon hõlmab vähemalt ratchet-mehhanismiga määratud tegelike marsruutide alampiiri                                                                                                                                                                                                                                                 | Jah                                                                                       |
| `check:openapi-security-tiers` | Deklareeritud `x-loopback-only`/`x-always-protected` annotatsioonidel peab olema kate failis `routeGuard.ts`; parseri- ja edasisuunalised lahknevused blokeerivad. Ainult kohalike prefiksite all puuduvate `x-loopback-only` annotatsioonide pöördkontroll hoiatab ning ainult mustriga määratud marsruudid jäetakse sellest pöördkontrollist välja. | Parseri-/edasisuunalised kontrollid blokeerivad; pöördkontroll on nõuandev                |
| `check:openapi-routes`         | Iga `/api...` tee failis `openapi.yaml` vastab parameetrinimedest sõltumatult tegelikule marsruudile pärast põhjendatud `KNOWN_STALE_SPEC` erandiloendi rakendamist; ka aegunud erandiloendi kirjed põhjustavad nurjumise                                                                                                                             | Jah                                                                                       |
| `check:docs-symbols`           | Kanooniliste mittepeegeldatud dokumentide sisemised `/api/...` URL-viited vastavad tegelikule marsruudile või marsruudiperele; proxy/upstream/kohatäite/failiviited ja põhjendatud `KNOWN_STALE_DOC_REFS` kirjed jäetakse välja ning aegunud erandiloendi kirjed põhjustavad nurjumise                                                                | Jah                                                                                       |
| `i18n translation drift`       | Põhikomplekti tõlgitud dokumentide lähte-/sihtfailide räsid vastavad failile `.i18n-state.json`. PR-id nurjuvad ainult uue lähte-, puuduva sihtfaili või sihträsi kõrvalekalde korral; PR-välised kontrollid on ranged. Päritud PR-kõrvalekalded ja aegunud sihtfailide lähteräsid on hoiatused.                                                      | Uus PR-i/PR-väline range kõrvalekalle blokeerib; päritud/aegunud kõrvalekalle on nõuandev |

`docs/diagrams/` all olevad kaksteist README SVG-d genereeritakse failidega `scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` genereerib need kõik uuesti.
Igal failil on bait-baidilt võrdlev ühiktest (`tests/unit/docs/readme-*-svg.test.ts`, töö `test-unit`), mis nurjub, kui repositooriumisse salvestatud fail on aegunud.
`check:docs-counts` loeb kanoonilised arvud nende `<text>`-sõlmedest, mistõttu arve ei teisendata kunagi kontuuriradadeks.
SVG kanooniliste arvude kontroll loeb loendis `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) nimetatud faile: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, `public/images/tier-flow-dark.svg`, `tier-flow-light.svg`.
Püsivalt tasuta pakkujate, kataloogikirjete, korduvate kogumite ja hindamistegurite väidete kontrollid loevad ka faile `promise-pillars.svg`, `free-tier-budget.svg`, `strategies-grid.svg`.
`free-tier-budget.svg` saab oma arvud jooksva kataloogi laadijast, seega muudatus `FREE_MODEL_BUDGETS`-s või pakkuja kuvatavas nimes muudab CI ebaõnnestunuks, kuni see fail uuesti genereeritakse.

### Töö: `i18n-ui-coverage`

| Skript                                  | Kontrollib                                                                                                                                                                                                                    | Blokeeriv       |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (tekstisisene) | Kas kasutajaliidese i18n-võtmete katvus on ≥ 65%                                                                                                                                                                              | Jah             |
| `check-ui-value-drift` (tekstisisene)   | Ingliskeelse **väärtuse** ümberkirjutamisel ei jää maha aegunud tõlget                                                                                                                                                        | Jah             |
| `check-new-key-coverage` (tekstisisene) | **Uus** ingliskeelne võti on tõlgitud igas lokaadis — marker `__MISSING__:` lükatakse tagasi                                                                                                                                  | Jah             |
| `check-translation-ratio`               | Tegelike tõlgete osakaal lokaadi kohta (inglise keelega identsed / kohatäited / puuduvad lehed väljaspool lubatud loendit) ei tohi ületada faili `config/quality/i18n-translation-baseline.json` väärtust koos lubatud varuga | **Soovituslik** |

Vajab sätet `fetch-depth: 0` — väärtuste lahknevuse kontroll võrdleb faili `en.json` ühendamisbaasiga.

#### `check-ui-value-drift` — aegunud tõlgete kontroll

Tuvastab ühe i18n-regressiooni, mida teised kontrollid oma ülesehituse tõttu ei näe: ingliskeelne väärtus
kirjutatakse ümber, kuid _eelmisest_ ingliskeelsest väärtusest tuletatud tõlked jäävad alles, mistõttu
mitteingliskeelsed kasutajad loevad jätkuvalt enesekindlalt sõnastatud, kuid nüüdseks valet teksti.

See jõudis päriselt väljalaskesse. `oauthModal.googleOAuthWarning` kirjutati ümber, kui lisati Antigravity
sisselogimisabiline (#5203); **39 lokaadis 43-st** jäi alles tekst, mis käskis operaatoritel „kopeerida
täielik URL ja kleepida see allapoole” — selle teenusepakkuja puhul ei saa seda töövoogu lõpule viia. See jäi
kuni muudatuseni #8463 märkamata, sest:

- `sync-ui-keys` lisab ainult **puuduvad** võtmed, mitte kunagi **aegunuid**;
- `check-ui-keys-coverage` loendab võtme _olemasolu_, mistõttu aegunud tõlge loetakse kaetuks;
- `check-translation-drift` jälgib dokumentatsiooni peegelkoopiaid asukohas `docs/i18n/<locale>/**.md` —
  see ei loe kunagi faile `src/i18n/messages/*.json`. Alates 2026-09 uuesti sünkroonimisest blokeerib töö
  `docs-sync-strict`: muuda põhidokumenti → `npm run i18n:run -- --files=<doc>` (jaotisepõhine, odav).

**Arvestab erinevusi, ei tugine lähtejoonele.** See võrdleb ühendamisbaasis olevat faili `en.json`
tööpuuga; iga võtme puhul, mille ingliskeelne väärtus muutus, loetakse aegunuks kõik lokaadid, milles
on endiselt muutmata tõlge. See **külmutab olemasoleva võla** teadlikult — erinevusest ei saa tuvastada,
millisest vanast ingliskeelsest tekstist pärineb pikka aega olemas olnud tõlge, seega hindab kontroll
ainult seda, mida praegune muudatus puudutab. Alternatiiv (võtmepõhine räsi lähtejoon) nõuaks
umbes 600 KB suurust genereeritud faili, mis oleks kolm korda suurem kui suurim olemasolev lähtejoon
ja muutuks iga i18n-i PR-i korral.

Kontrolli läbimiseks on kaks võimalust:

1. värskenda mõjutatud tõlkeid või
2. määra nende väärtuseks `__MISSING__:<new english>` — käituskeskkond väljastab siis parandatud ingliskeelse teksti
   (`src/i18n/request.ts::deepMergeFallback`, #7258) ja võti lisatakse tõlkejärjekorda.

Kui stringi **tähendus** muutus, eelista **võtme ümbernimetamist**: uus võti ei saa aegunud tõlget pärida.
Seda mustrit kasutati muudatuses #8463.

```bash
npm run i18n:check-value-drift          # range (seda käitab CI)
npm run i18n:check-value-drift:warn     # ainult aruanne
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Lõpetab koodiga 0 ja kuvab `SKIP reason=base-unresolved`, kui baaskataloogi ei saa lugeda (pinnapealne
kloon ilma baasviiteta), järgides kontrolli `check-openapi-breaking` käitumist.

### Töö: `i18n`

Täielik i18n-i valideerimismaatriks (üks töö lokaadi kohta). Kogu töö on soovituslik.

| Skript                          | Kontrollib                      | Blokeeriv                                                  |
| ------------------------------- | ------------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | Tõlke täielikkust lokaadi kohta | **Soovituslik** (`continue-on-error: true` kogu töö puhul) |

### Töö: `pr-test-policy`

Käivitatakse ainult tõmbetaotluste korral.

| Skript                 | Kontrollib                                                                                                                                                          | Blokeeriv |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | Tõmbetaotlused, mis muudavad tootmiskoodi asukohtades `src/`, `open-sse/`, `electron/` või `bin/`, peavad lisama või värskendama teste (range reegel nr 8)          | Jah       |
| `check:test-masking`   | Muudetud testifailid ei vähenda väidete netoarvu ega lisa tautoloogiaid `assert.ok(true)`                                                                           | Jah       |
| `check:pr-evidence`    | Tõmbetaotluse kirjeldus viitab muudatuse testi-/VPS-tõenditele (automatiseerib range reegli nr 18, otsides teksti tõmbetaotluse kirjeldusest — habras, vt tööjärge) | Jah       |

### Töö: `test-vitest`

Käivitatakse pärast tööd `build`. Tõrke korral blokeerib ühendamise.

| Testikomplekt    | Valideerib                                                             | Blokeeriv                                                                                                             |
| ---------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-server (110 tööriista), autoCombo, vahemälu — vitesti testikäitaja | Jah                                                                                                                   |
| `test:vitest:ui` | Kasutajaliidese komponentide testid — vitesti testikäitaja             | **Blokeeriv** — olemasolevad tõrked on failis `vitest.config.ts` selgesõnaliselt välistatud; uued tõrked nurjavad töö |

### Igaöised töövood (ajastatud, nõuandvad)

Need käivituvad cron-ajakava alusel (ja sündmusega `workflow_dispatch`), mitte kunagi PR-ides. Kõik on nõuandvad.

| Töövoog                | Valideerib                                                                                                                                                                                  | Blokeeriv    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | fast-checki omaduspõhised testid juhusliku seemne ja suure käituskordade arvuga                                                                                                             | **Nõuandev** |
| `nightly-resilience`   | kuhja kasvu kontroll, kaosepõhine tõrgete sisestamine, k6 koormus-/kestustestid                                                                                                             | **Nõuandev** |
| `nightly-llm-security` | promptfoo sisestusrünnete kaitse (blokeerimisrežiim) + garaki sondid (jäetakse pakkuja saladuse puudumisel vahele)                                                                          | **Nõuandev** |
| `nightly-schemathesis` | OpenAPI lepingu hägustestimine (schemathesis) töötava OmniRoute'i vastu, kasutades faili `docs/openapi.yaml` — toob esile spetsifikatsiooni rikkumised / käsitlemata 500-vead (etapp 8 B.4) | **Nõuandev** |
| `nightly-mutation`     | Strykeri mutatsioonitestimise skoor kiirete ühiktestide rajal — ellujäänud mutandid toovad esile nõrgad väited                                                                              | **Nõuandev** |
| `nightly-compat`       | Node'i mootori ühilduvusmaatriks toetatud `engines.node` vahemikes                                                                                                                          | **Nõuandev** |

Jõudluse lähtetasemed (kuhi, TTFB, koostamisaeg) salvestatakse, kuid nende alusel ei blokeerita: vt [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Kiirusefaas (2026-08-30 → v4.0 LTS): iga lähtetaset lõdvendati 20%

Omaniku otsus (2026-08-30): kuni v4.0 modulariseerimiseni on väljalaskekiirus olulisem
kui tehnilise võla piiri hoidmine. Iga **numbrilist** astmelise kontrolli lähtetaset lõdvendati ühe
auditeeritava korraga 20% ning faas on deklareeritud failis `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Mis muutus                                                                                                                                                                                     | Kus                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — väiksem-on-parem loendused ×1,2, suurem-on-parem protsendid ÷1,2 (katvuse alampiiriks jäi 60, `eslintErrors` jääb 0, `eslintWarnings` 0 → 20% külmutatud eiramiste arvust) | `quality-baseline.json` (märkus `_relax_velocity_2026_08_30` loetleb kõik enne → pärast väärtused)     |
| `count` ×1,2 / `percentage` ×1,2                                                                                                                                                               | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, iga `frozen[*]` / `testFrozen[*]` rea ülempiir ×1,2                                                                                                                          | `file-size-baseline.json`                                                                              |
| failipõhised / TS-koodipõhised loendused ×1,2                                                                                                                                                  | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                            | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` muutub soovituslikuks, kui `_policy.requireTighten === false`                                                                                                              | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| igaöine `bank-ratchet-shrinks` peatatakse (see talletaks mõõdetud vähenemise ja tühistaks varu)                                                                                                | `.github/workflows/nightly-release-green.yml`                                                          |

Lubatud erandite loendid (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **ei ole** eelarved ja neid ei muudetud. Läbitud/ebaõnnestunud olekuga poliitikaväravad (saladused, SQL-i reeglid,
dokumentatsiooni/keskkonna leping, i18n-i pariteet, ühiktestid) ei muutunud — ebaõnnestunud test on endiselt ebaõnnestunud test.

**Tööriistad**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — ühekordne
  lõdvendamine (`scripts/quality/relax-baselines.mjs`); keeldub sama märkusega teist korda käivitumast.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mõõdab iga numbrilist väravat samamoodi nagu CI ja kuvab iga värava järelejäänud varu
  (`scripts/quality/baseline-headroom.mjs`). Igaöine töö `baseline-headroom` avaldab tabeli
  töövoo käivituse kokkuvõttes ning laadib selle JSON-/Markdown-aruande üles nimega
  `baseline-headroom-<run_id>` ja säilitab seda 90 päeva. Hoiatus- ja kriitilised read tuvastavad
  väravad, mis on oma ülempiirist kuni 10% kaugusel või juba seda ületavad. Käsitlege neid aruandeid
  varajase hoiatusena eelarvete ammendumise kohta; uurige probleemi põhjustava värava märkusi
  `_rebaseline_*`. Töö ei loo ega värskenda enam püsivat probleemi; #12149 säilitab varasema
  aruandlusajaloo.

**Uue koodi režiim (Clean-as-You-Code) — alates 2026-08-30, ainult PR-i kiirtee**

Sündmuste `pull_request` korral edastab `quality.yml` argumendi `--base-ref <PR base SHA>` kontrollidele `check:file-size`,
`check:complexity-ratchets` ja `check:dead-code`. Kontrollide `check:complexity-ratchets` ja
`check:dead-code` puhul võrdleb värav HEAD-i ühise eellasega, **piirdudes PR-i muudetud failidega**
(`scripts/check/newCodeMode.mjs`: ühine eellane realiseeritakse ajutises
`git worktree`-s, ESLint/knip käivitatakse seal ja HEAD-il ning failipõhiste loenduste erinevused arvutatakse):

- **blokeeriv** — PR lisas muudetud failidesse tsüklomaatilise/kognitiivse keerukuse rikkumisi või surnud eksporte
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` logis);
- **soovituslik** — globaalne koguarv võrreldes külmutatud lähtetasemega. Päritud kõrvalekalle ei muuda
  süütut PR-i kunagi ebaõnnestunuks; kõrvalekalle külmutatakse väljalaske kooskõlastamisel uuesti ja seda jälgib varu mõõtmise töö.

`check:file-size` kasutab baasviidet oma reeglite järgi (`scripts/check/check-file-size.mjs`, #8522):
see kontrollib puus iga lähtekoodi- ja testifaili, loeb käsuga `git show` iga faili ridade arvu PR-i baasis
ning märgib faili ebaõnnestunuks ainult siis, kui see kasvab suuremaks oma lähtetaseme ülempiirist
(`frozen` / `testFrozen` või lähtetasemest puuduva faili puhul `cap` / `testCap`) ja baassuurusest.
Seetõttu ei muuda juba baasis kõrvalekaldunud fail süütut PR-i kunagi ebaõnnestunuks.

`check:boundary:ratchet` rakendab oma ainsale arvule sama reeglit
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR-i sündmuste korral edastavad nii
`quality.yml` kiirkontrollid kui ka `ci.yml` lintimistöö PR-i baasi SHA, baaskommitit
mõõdetakse `git archive` ekspordist ning PR nurjub ainult siis, kui selle `open-sse → src` servade
arv ületab väärtustest `metrics.boundaryOpenSseToSrc` ja baasi servade arv suuremat. Ülempiiri
ületavast baasi triivist teatatakse (`base drift herdado`), kuid see ei muuda süütut PR-i kunagi nurjunuks; push → main
säilitab absoluutse ülempiiri ning lahendamatu baasi SHA korral võetakse see hoiatusega varuvariandina kasutusele.

`workflow_dispatch` käivitustel, väljalaske rohelisuse täielikul kontrollil ja igaöisel varuruumi tööl puudub PR-i baas
ning need säilitavad absoluutse (globaalse) võrdluse. Koodikaetus, dubleerimine ja tüübikaetus jäävad praegu
globaalseks (nende tööriistad ei loo failipõhist erinevust väikese ressursikuluga) — need on kandidaadid samasuguseks käsitluseks.

**Etapi lõpetamine versioonis v4.0 (LTS = varasemast rangem, mitte „tagasi tavapärase juurde”)**

1. Puhta `release/v4.0.0` tipu puhul: dokumenteerimiseks `npm run quality:headroom --json`, seejärel
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` ja iga tüübikontrolli värava
   `--update` — iga lähteväärtus langetatakse mõõdetud väärtuseni.
2. Kustutage `_policy` failist `quality-baseline.json` (aktiveerib uuesti `--require-tighten` ja igaöise
   varu kogumise), taastage failis `check-openapi-coverage.mjs` `THRESHOLD = 36` (või suurem).
3. Muutke piirangud mõõdetust rangemaks seal, kus modulariseerimine end ära tasus: failisuuruse `cap` tagasi väärtusele 1000
   (või 800), koodikaetuse alampiirid +5, kasutamata ekspordid modulariseeritud pakettides 0.

## Ratchet’i baastase (`quality-baseline.json`)

Ratchet’i mootor (`scripts/quality/check-quality-ratchet.mjs`) loeb faili `quality-baseline.json`
ja võrdleb seda värskelt kogutud failiga `quality-metrics.json`. Iga mõõdik, mis halveneb
rohkem kui selle epsilon lubab, põhjustab järgu nurjumise.

Praegu jälgitavad mõõdikud:

| Mõõdik                | Suund  | Tähendus                                |
| --------------------- | ------ | --------------------------------------- |
| `eslintWarnings`      | `down` | ESLinti hoiatuste arv ei tohi suureneda |
| `coverage.statements` | `up`   | Lausete katvus ei tohi väheneda         |
| `coverage.lines`      | `up`   | Ridade katvus ei tohi väheneda          |
| `coverage.functions`  | `up`   | Funktsioonide katvus ei tohi väheneda   |
| `coverage.branches`   | `up`   | Harude katvus ei tohi väheneda          |

Baastaseme värskendamiseks pärast tegelikku paranemist tehke järgmist:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Lipp `--update` kirjutab praegu mõõdetud väärtused faili `quality-baseline.json`.
Kommiteerige see fail koos muudatusega, mis mõõdikut parandas. PR, mis parandab
mõõdikut ilma baastaset värskendamata, tuvastatakse lipuga `--require-tighten` (etapp 6A.5,
rakendamine on ootel).

### CodeQL-i ratchet: värskendamissagedus ja käsitsi käivitamine

`check:codeql-ratchet` loeb **hoidla olekut, mida värskendatakse ajakava alusel — mitte iga PR-i korral.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` annab tulemuseks
`state: configured`, `schedule: weekly`: see on GitHubi vaikeseadistuse kontroll, mitte iga tõuke
korral tehtav analüüs. Tagajärg: pärast hoiatusi PARANDAVA PR-i mestimist loeb ratchet
endiselt vana, suuremat arvu kuni järgmise ajastatud kontrolli käivitumiseni — seega teatab see
halvenemisest iga avatud PR-i puhul, sealhulgas parandava PR-i enda järelmuudatuste puhul, kuni kontroll järele jõuab.

**Käsitsi värskendamine**: `gh workflow run codeql.yml --ref release/vX.Y.Z` käivitab
analüüsi uuesti ja avaldab hoiatused mõne minuti jooksul uuesti. Lugege esmalt faili `.github/workflows/codeql.yml`
— selle päis selgitab, et see on ainult `workflow_dispatch`-põhine, **sest see on vastuolus
GitHubi „vaikeseadistusega“** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Käivitajate `push`/`pull_request`/
`schedule` taastamine nõuab esmalt **omaniku toimingut**: Settings → Code security →
CodeQL: Default → Advanced. Ärge lisage käivitajat `schedule:` ilma seda ümberlülitust tegemata — see
tekitab ainult nurjunud käivitusi.

**Pärast arvu vähenemist karmistage baastaset** — `node scripts/check/check-codeql-ratchet.mjs
--update` kirjutab uue mõõdetud arvu faili `quality-baseline.json` →
`metrics.codeqlAlerts.value`, et ratchet ei lubaks vaikimisi halvenemist tagasi
vana ülempiirini. Läbitöötatud näide (2026-09-02/03): PR #12502 parandas 7 tegelikku hoiatust
(13 → 6 mõõdetud avatud hoiatust); PR #12530 karmistas fikseeritud baastaseme 11 → 6, et see vastaks tulemusele;
ülejäänud 6 märgiti seejärel iga hoiatuse kohta esitatud põhjendusega lahendatuks, kuni avatuks jäi 0 hoiatust.

**Hoiatuste lahendatuks märkimise otsustab operaator (range reegel #14)** — ärge märkige CodeQL-i hoiatust
kunagi lahendatuks ilma tehnilist põhjendust lahendatuks märkimise kommentaari lisamata: `won't fix`
ülesvooluprotokolli nõude korral, `used in tests` testifixtuuri korral, `false positive`
sellise puhastaja korral, mida CodeQL ei suuda tuvastada (pretsedent: `docs/security/ERROR_SANITIZATION.md`).

---

## Testide korduskatsete poliitika (WS5.4, v3.8.49)

Korduskatseid hallatakse iga käitaja kohta eraldi, mitte kunagi üldise lausreeglina — üldine korduskatse muudab tegelikud regressioonid nähtamatuteks ebastabiilsusteks:

| Käitaja          | Poliitika                                                                                                                                            | Põhjus                                                                                                                                   |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` ainult CI-s koos seadega `trace: on-first-retry`                                                                                        | Brauseri/võrgu ajastus on tõepoolest mittedeterministlik; üks korduskatse koos jäljega muudab ebastabiilsuse diagnoositavaks artefaktiks |
| Vitest           | EI OLE üldist korduskatset. Tõendatult ebastabiilsele testile määratakse selgesõnaline testipõhine korduskatse (nähtav diffis, vaadatakse PR-is üle) | Hoiab karantiiniloendi repos, mitte kunagi läbipaistmatuna                                                                               |
| node:test (unit) | MITTE KUNAGI korduskatset                                                                                                                            | Ebastabiilne üksustest on testi viga — paranda see, ära lihtsalt käivita uuesti                                                          |

Siht-SLO-d pärast ebastabiilsuse telemeetria valmimist (WS5.2/5.3): <1% ebastabiilsuse määr testi kohta
(„paranda kohe” lävend), ≥95% läbimismäär konveieri kohta. Valdkonna võrdlusväärtused —
kalibreerida ümber meie enda mõõtmiste põhjal.

## Väljalasketaseme põrkmehhanismi nihe (WS5.5, v3.8.49)

Kui põrkmehhanism (faili suurus, keerukus, eslint-i hoiatused) halveneb PUHTA väljalaskeharu
tipus — st ühendamiste KOMBINATSIOON põhjustas regressiooni ja ükski PR eraldi ei taasesita
regressiooni oma harus — vastutab paranduse eest **üks kord väljalaskeharus väljalaskejuht**:
eelistada eraldamist/refaktoreerimist; lähtetaseme uuendamine on lubatud ainult koos dokumenteeritud
põhjenduskirjega. Ära kunagi lükka kombinatsioonist tulenevat nihet kaastöötaja PR-i kanda ega
uuenda lähtetaset iga PR-i kohta (see peidab tegelikud regressioonid). Esmalt erista põhjus:
taasesita ebaõnnestumine puhta tipu põhjal prooviks loodud worktree-s, enne kui eeldad, et selle põhjustas sinu PR.

## Põrkmehhanismi piirmäärade langetamise talletamine — allapoole liikumine (#8584)

Põrkmehhanism on ainult pooleldi automaatne ja automatiseeritud on vale pool. Piirmäära
**tõstmine** on käsitsi tehtav JSON-i muudatus, mis võtab kümme sekundit ja on kiireim viis
ebaõnnestunud PR-i blokeeringust vabastamiseks. Piirmäära **langetamiseks** peab keegi käivitama
`--update` ja tulemuse commit'ima — ning kuni töö `bank-ratchet-shrinks` lisamiseni ei käivitanud
seda ükski töövoog. Mõõdetud tagajärg (2026-07-25): 18 fikseeritud faili olid juba uute failide
800-realise piirmäära juures või sellest allpool, halvim neist 132× (`src/shared/validation/schemas.ts`,
19 rida, kuid piirmäär 2,523); keerukuse ülempiir liikus umbes 37 lähtetaseme uuendamise märkme jooksul
`1794 → 2169`, kusjuures toimus täpselt üks langus (−1); ning „kitsenda järgmises tsüklis käsuga
`--update`” kirjutati 31 korda ja järgiti ühe korra. Piirmäär, mis püsib kauem kui selle tinginud
kood, muudab iga lõpetatud osadeks jaotamise vaikimisi kasvuruumiks järgmisele faili muutjale.

`nightly-release-green.yml` → töö **`bank-ratchet-shrinks`** sulgeb selle tsükli:

|            |                                                                                                                            |
| ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| Käivitub   | `schedule` (3× päevas) + `workflow_dispatch` — teadlikult **mitte** `push`                                                 |
| Mõõdab     | kõrgeimat `release/vX.Y.Z`, kasutades sama resolutsiooni ja sisestuskaitset nagu `release-green`                           |
| Kirjutab   | `check:file-size --update` ja `check:complexity-ratchets --update` (mõlemad saavad konstruktsiooni järgi ainult vähendada) |
| Kontrollib | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                                   |
| Tarnib     | ühe alati ajakohase PR-i väljalaskeharu vastu — sunduuendatakse, rämpsu ei tekitata                                        |

Talletamine toimub paketi kaupa, mitte iga push'i järel, sest sellel pole latentsusnõuet
(8 tunni jooksul talletatud langus on piisav), samas kui iga ühendamise järel käivitamine
ehitaks ühendamiskampaaniate ajal PR-i haru korduvalt ümber ja teeks iga kord täieliku ESLint-i
läbivaatuse. Tuvastamine jääb push'i peale (`release-green`); ainult talletamine toimub paketi kaupa.

### Ohutuse kontrollija

Töö kirjutab lähtetasemeid järelevalveta, mistõttu muudab selle vastuvõetavaks
`verify-ratchet-bank.mjs`. See võrdleb `--update`-järgset puud `HEAD`-iga ja **katkestab töö
enne ühegi commit'i loomist** — PR-i avamata — kui iga muudatus ei ole üks järgmistest:

- `frozen` / `testFrozen` numbriline kirje on **langetatud** või **eemaldatud**
- `complexity-baseline.json` → `count` on **langetatud**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` on **langetatud**

Kõik muu ebaõnnestub: arvu tõstmine, kirje lisamine, `cap`/`testCap` muutmine või
`_rebaseline_*` märkme kustutamine/ümberkirjutamine (need märkmed on auditijälg selle kohta,
miks iga ülempiir eksisteerib, ning neid hoitakse failikirjetega samas objektis `frozen`).
Robot, mis võiks piirmäära tõsta, oleks praegusest olukorrast selgelt halvem. Regressioonikaitse:
`tests/unit/verify-ratchet-bank.test.ts`.

Töö ei tee kunagi push'i harusse `release/*` — PR-i ühendab inimene, seega ei saa vigane mõõtmine
ilma ülevaatuseta harusse jõuda.

## Lubatud loendi poliitika

Iga kontroll, mis ei tohi olemasolevate rikkumiste tõttu ebaõnnestuda, kasutab fikseeritud lubatud loendit
(nt `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Poliitika on järgmine:

**Parandage algpõhjus; kasutage lubatud loendit ainult siis, kui rikkumine oli juba olemas ja
seda ei saa samas PR-is parandada.**

Kirje lisamisel lubatud loendisse:

1. Lisage kommentaar koos põhjendusega.
2. Viidake jälgimisprobleemile (nt `// #3498 — Phase 2 feature, not yet implemented`).
3. Eemaldage kirje samas PR-is, mis rikkumise parandab — aegunud kirje, mis enam
   aktiivset rikkumist ei varja, on ise defekt (6A.3 aegunud jõustamise kontroll
   kukutab pärast rakendamist orvuks jäänud lubatud loendi kirje tõttu kontrolli läbi).

**Ärge** lisage lubatud loendisse kirjeid selleks, et testid kiiremini läbiksid. Roheline kontroll koos kasvava
lubatud loendiga loob petliku kvaliteeditunde.

### Kui kontroll teie PR-is ebaõnnestub

1. **Lugege kontrolli väljundit hoolikalt** — see ütleb täpselt, milline fail või sümbol
   reeglit rikkus.
2. **Parandage rikkumine** — enamik kontrolle on deterministlikud failisüsteemi kontrollid, mis läbivad testi kohe,
   kui kood on õige.
3. **Kui rikkumine oli juba olemas** (st teie ei põhjustanud seda, kuid kontroll nüüd
   hõlmab seda): lisage lubatud loendisse kirje koos põhjendava kommentaari ja viitega jälgimisprobleemile.
4. **Kui kontroll on põrkmehhanism** (testikate, ESLinti hoiatused, dubleerimine, keerukus):
   teie muudatus halvendas mõõdikut. Parandage algpõhjus või käivitage (harvadel juhtudel)
   `npm run quality:ratchet -- --update`, kui muudatus on tahtlik ja mõõdiku
   halvenemine vastuvõetav — kuid dokumenteerige põhjus PR-i kirjelduses.
5. **Nõuandvad kontrollid** (`continue-on-error: true`) on informatiivsed — need ei blokeeri
   mestimist, kuid kuvatakse CI kokkuvõttes. Parandage need sellegipoolest.

---

## Uue kontrollvärava lisamine

1. Looge `scripts/check/check-<name>.mjs` (või `.ts`). Poliitika kontrollväravad lõpetavad koodiga 0/1.
   Põrkmehhanismi tüüpi kontrollväravad väljastavad mõõdiku faili `quality-metrics.json` skripti `collect-metrics.mjs` kaudu.
2. Lisage `"check:<name>": "node scripts/check/check-<name>.mjs"` faili `package.json`.
3. Ühendage see failis `.github/workflows/ci.yml` sobiva töö alla
   (poliitika → `lint` või `docs-sync-strict`; põrkmehhanism → `quality-gate`).
4. Kui sellel on lubatud loend, rakendage `reportStaleEntries()` failist
   `scripts/check/lib/allowlist.mjs`, et aegunud kirjed tuvastataks automaatselt.
5. Kirjutage kausta `tests/unit/build/` test, mis katab kontrollvärava tuvastamisloogika.
6. Uuendage seda dokumenti (lisage vastava töö tabelisse rida).

---

## Agendi tööriistad: LSP tsüklis (valikuline)

Lisaks CI kontrollväravatele sisaldab OmniRoute **valikulist** `agent-lsp` alustaristut
(projektitaseme `.mcp.json`, 7. faasi ülesanne 15). Looge `.mcp.json`,
et teha TypeScripti keeleserver programmeerimisagentidele kättesaadavaks, võimaldades neil lahendada sümbolid /
diagnostika **enne** koodi kirjutamist — see on kompileeri-enne-väidet kaaslane käsule
`typecheck:core`, mis vähendab „väljamõeldud sümbolite” vigu juba nende tekkekohas. Seda ei laadita tahtlikult
automaatselt (MCP↔LSP silla valite ja kontrollite teie); vigane kirje logib ainult
ühendusvea ega katkesta kunagi seansse.

---

## Ratsionaliseerimise järjekord (ROI ülevaatus — etapp 9, laine 3)

See inventuur viidi 2026-06-17 vastavusse failiga `ci.yml` (eelmisest versioonist puudusid
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Vastavusse viidud komplekti ROI ülevaatus
tuvastas järgmised ratsionaliseerimise kandidaadid. **Liitmised on mehaanilised CI
muudatused; aktiveerimised/eemaldamised on operaatorile jäetud poliitikaotsused.** Midagi
alltoodust pole veel rakendatud.

**Eespool on dokumenteerimata ka** (nõuandev, nõrk signaal): töö `docs-lint`
(markdownlint + Vale, kogu tööl `continue-on-error`) ja eraldiseisvad skanneri töövood
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` sisaldub failis
`quality-baseline.json`, kuid pole failis `ci.yml` ühendatud blokeeriva põrkmehhanismiga — mõõdik on
praegu orb.

### Liitmine / dubleerimise eemaldamine (mehaaniline, väiksema riskiga)

Iga kandidaati kontrolliti 2026-06-17 aktiivse kontrolloleku suhtes (usalda, aga kontrolli);
mitu „ilmselget“ liitmist osutusid varjatud võlga sisaldavaks ega ole **puhtad** asendused.

- **`check:docs-sync` käivitatakse kaks korda** — eraldiseisvalt töös `lint` ning uuesti `check:docs-all` (`docs-sync-strict`) sees ja husky commit'i-eelses hook'is. ✅ **TEHTUD** — eraldiseisev `lint`-käivitus eemaldatud.
- **CVE-skannimine** — ❌ **EI OLE puhas liitmine.** `audit:deps` blokeerib kriitilised turvanõrkuse teated ja mittetäielikud auditid kõigi viie lockfile'i puhul, esitades praeguse poliitika kohaselt kõrge taseme teated hoiatustena; `check:vuln-ratchet` (osv) nurjub ainult sisseregistreeritud baasjoonega võrreldes toimunud _regressiooni_ korral ning lükkab nõutavate mõõtmiste puudumise tagasi. Semantika on erinev — `audit:deps` eemaldamisel kaoks absoluutne kriitilise taseme kontroll ja sõltumatud paketiauditi tõendid. Säilitage mõlemad.
- **Tsüklite tuvastamine** — ✅ **TEHTUD** (#15159 G-01/G-02). Siinne vana tekst nimetas `check:cycles` kontrolli „roheliseks, kureeritud“ kontrolliks ja põhjendas selle blokeerivana säilitamist sellega, et `check:circular-deps` (dpdm) teatas 91 tsüklist. See roheline tulemus oli **valeroheline**: `check:cycles` skannis 5 alamkataloogi (450 faili), sobitas ainult staatilisi `import|export … from` konstruktsioone ning jättis kõrvale kõik `@/` ja `@omniroute/open-sse/` spetsifikaatorid, mistõttu ei suutnud see näha dünaamilise importimise ja aliaste tsükleid, mis hoidlas domineerisid. Parandatud: kontroll läbib nüüd `src` + `open-sse` (5023 faili), kogub spetsifikaatorid TypeScripti AST-st (seega `import("…")` läheb arvesse ja tüübi positsioonis olev `typeof import("…")` mitte) ning lahendab tsconfigi `paths` kirjed. See leiab **14** tsüklit, mitte 0. Kuna 14 olemasolevat tsüklit ei saa kontrolli PR-is parandada, on `check:cycles` nüüd **põrkmehhanism** (`--ratchet`, ülempiir `metrics.cycles.value = 14` failis `quality-baseline.json`, `direction: down`) — see blokeerib iga _regressiooni_ ja arv saab ainult väheneda. CI käivitab `npm run check:cycles:ratchet`. Vähendamine toimub koos üksusega **A-01**. `check:circular-deps` (dpdm) jääb nõuandvaks laiema ulatusega teiseks arvamuseks.
- **Keerukus** — ✅ **TEHTUD** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): üks ESLinti läbikäik, loendamine ruleId järgi, et tsüklomaatilise keerukuse + maksimaalse ridade arvu ning kognitiivse keerukuse baasjooned jääksid sõltumatuks; eraldi `check:complexity` / `check:cognitive-complexity` jäävad alles kohaliku `--update` jaoks.
- **`/api` hallutsinatsioonivastane kontroll** — ✅ **TEHTUD** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): üks `src/app/api` failisüsteemi inventuur, openapi-routes + docs-symbols raporteerivad endiselt sõltumatult; eraldi kontrollid jäävad kohalike käivituste jaoks alles.
- **`check:node-runtime` käivitatakse 11 töös** — ⚠️ **madal ROI.** Igaüks on eraldi runner ja kontroll kestab <1 s; kogusääst on ~10 s, kuid kaoks odav tööpõhine kaitse. Muutmise vaeva pole väärt.
- **`typecheck:noimplicit:core` CI lint-töös** — ✅ **lint-tööst eemaldatud** (oli nõuandev `continue-on-error`); blokeeriva tüübipinna moodustavad `typecheck:core` + `check:type-coverage`. Kohalik skript säilitati.

### Aktiveerimine / otsustamine (operaatori poliitika)

- `check:openapi-security-tiers` (nõuandev) — ❌ **EI OLE puhtalt aktiveeritav.** See lõpetab koodiga 0, kuid hoiatab, et mitmel `traffic-inspector` marsruudil `LOCAL_ONLY_API_PREFIXES` all puudub annotatsioon `x-loopback-only: true`. Selle jõustamiseks tuleb need annotatsioonid esmalt faili `openapi.yaml` lisada.
- `typecheck:noimplicit:core` (nõuandev) — blokeeriv `check:type-coverage` põrkmehhanism katab seda suuresti. Muutke see põrkmehhanismiks või eemaldage üleliigne teine `tsc` läbikäik.
- `test:vitest:ui` (nüüd **blokeeriv**) — olemasolevad tõrked on failis `vitest.config.ts` sõnaselgelt välistatud jälgimiskommentaaridega `// #8618`; uued tõrked kukutavad töö läbi.
- `check:secrets` (gitleaks, blokeeriv põrkmehhanism) — praegune ülempiir on `metrics.secretFindings` failis `quality-baseline.json`. Iga erand vajab põhjendatud kirjet failis `.gitleaks.toml`; kättesaamatu mõõtmine on MITTETÄIELIK. Skannimine täiendab GitHubi sisseehitatud saladuste skannimist ja kontrolli `check:public-creds`.
- `check:pr-evidence` (blokeeriv, otsib PR-i kirjelduse proosast grep'iga) — suur valepositiivsete tulemuste risk; eemaldamine nõrgendaks range reegli nr 18 jõustamist, seega on see tõeline poliitikaotsus.
- `semgrep` (nõuandev eraldiseisev kontroll) — kattub OWASP-i kategooriate puhul CodeQL-iga; ühendage selle baasjoon põrkmehhanismiga või eemaldage.

---

## Seotud dokumentatsioon

- Tarkvara tarneahel (päritolu, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — võtmekogumite võrdsuse kontroll

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, töö `i18n-ui-coverage`).
Võrdleb iga faili `src/i18n/messages/<locale>.json` lehtvõtmete kogumit failiga `en.json` ja nurjub
mis tahes puuduva või üleliigse lehe korral, olenemata sellest, millal võti lisati. Kohatäited
`__MISSING__:` loetakse olemasolevaks (nende sisu kuulub suhtarvukontrolli vastutusalasse). See on
kahe erinevuspõhise/protsendipõhise kontrolli absoluutne täiendus: `check-ui-keys-coverage` nõuab iga
lokaadi puhul vähemalt 80% katvust (43 puuduvat võtit umbes 13 000-st annavad endiselt tulemuseks
99,7%) ja `check-new-key-coverage` hindab ainult võtmeid, mille PR lisab faili `en.json`. Lokaadipakk
luuakse selle päeva failist `en.json`, mil selle haru luuakse, ning seda tõlgitakse mitu päeva, samal
ajal kui baasharusse lisatakse jätkuvalt võtmeid; paki PR ise ei lisa ühtegi võtit, mistõttu ei
reageerinud kumbki sõsarkontroll, kui pakk 1 (#13044) liideti nii, et üheksas lokaadis puudus 43
võtit, ja pakk 2 (#13660) nii, et kaheksas lokaadis puudus 10 võtit (2026-09-15). Kõrvalda tõrge
käsuga `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; `extra`-leht
tähendab, et lähtefailist on see eemaldatud — kustuta see lokaadist. `--warn` raporteerib ilma
nurjumiseta. `--catalog=cli` käitab sama võrdlust kataloogis `bin/cli/locales`
(`npm run i18n:check-keys:cli`); mõlemad sammud asuvad töös `i18n-ui-coverage`.

#### `check-new-key-coverage` — uute võtmete i18n-kontroll

Kontrolli `check-ui-value-drift` sõsarkontroll. Too tuvastab ingliskeelse väärtuse, mis **kirjutati
ümber**, samal ajal kui selle tõlked jäid muutmata; see kontroll tuvastab ingliskeelse võtme, mis
**lisati**, kuid mida mõni lokaat ei saanud.

`check-ui-keys-coverage` ei suuda sellist olukorda tuvastada: see nõuab iga lokaadi puhul minimaalset
katvusprotsenti ning üheteistkümne puuduva võtme korral umbes 13 000-st jääb katvuseks 99,9%.
Keelepõhine protsent ei suuda väljendada olukorda „see funktsioon avaldati tõlkimata“ — terve
funktsioon võib jõuda uude lokaati ilma igasuguse tekstita, ilma et number üldse muutuks.

Juhtum, mille see fikseerib: Orchestration Canvase 3. etapis tõlgiti selle üksteist võtit kõigisse
tol ajal olemas olnud 42 lokaati. Mõni tund hiljem suurendas EL-i keelte pakk (#13044) hoidla
lokaadid 51-ni ning üheksa uut lokaati (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ei
saanud neid võtmeid kunagi. `deepMergeFallback` asendab puuduva võtme ingliskeelse tekstiga, mistõttu
oli tõrke ilminguks tõlkimata, mitte tühi kasutajaliides — tegelik probleem, mis jäi oma ülesehituse
tõttu märkamatuks.

Nagu sõsarkontrollgi, on see **erinevusteadlik**: see võrdleb liitmisbaasi ingliskeelset versiooni
tööpuuga, mistõttu olemasolevad lüngad jäävad muutumatuks ja kontrolli sisselülitamiseks ei olnud
migraati vaja.

**Marker `__MISSING__:<english>` ei rahulda seda kontrolli (alates 2026-09-17).** Varem oli see
dokumenteeritud edasilükkamisviis — käitusaeg kasutab korrektset ingliskeelset varuvarianti —, kuni
kaheksa funktsiooni-PR-i lisasid 2026-09-16 kokku 61 võtit ja lisasid tõlkimise asemel markeri kõigisse
65 lokaati: see kontroll aktsepteeris neid kõiki, miski ei blokeerinud PR-e ning blokeeriv tegeliku
tõlke suhtarvukontroll nurjus seejärel väljalaske viimase versiooni puhul kõigil (pt-BR 3,2% > 2,5%

- 0,5). Marker loetakse nüüd puuduvaks tõlkeks. Kõrvalda tõrge käsuga
  `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` või
  kõigis lokaatides paralleelselt käsuga `npm run i18n:translate-new-keys`
  (`scripts/i18n/translate-new-keys.sh`, toimib lahtiühendatult, keeldub käivitumast ilma
  keskkonnamuutujateta `OMNIROUTE_TRANSLATION_*`). Võti, mis peab jääma ingliskeelseks (fikseeritud
  toote-, mootori- või lipunimi), kuulub faili `scripts/i18n/untranslatable-keys.json`, mitte kunagi
  markeri taha. `vi` keelab markerid täielikult (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — ootele pandud testide kontroll

Fail, mis on faili `vitest.config.ts` loendis `exclude`, on test, mida ei käitata, kuid puu lugejale
näib see katvusena. Kommentaari `// #8618 — pre-existing failure; remove this exclusion when fixed`
taha kogunes kuuskümmend kaks faili. Probleem #8618 suleti 2026-08-11, samal ajal kui selle jälgitav
loend kasvas 45 kirjelt 62-ni ning iga uus kirje päris kommentaari, mis viitas suletud probleemile.
Kui loend lõpuks failhaaval üle mõõdeti (#13204), **läbis 62 failist 51 testi praeguse puu suhtes
ilma lähtekoodi muutmata**.

Kontroll nõuab, et iga välistus, mis osutab tegelikule failile, (a) nimetaks jälgimisprobleemi ja
(b) esineks failis `config/quality/vitest-exclusions.json` koos mõõdetud olekuga, nii et välistuse
lisamine oleks eraldi failis ülevaadatav erinevus, mitte lihtsalt järjekordne rida 60 kirjega massiivis.
Kontroll ei käita välistatud teste tahtlikult uuesti — see võtab umbes 10 minutit ja kuulub
perioodilisse töösse; register talletab iga testi viimase mõõtmise aja.
