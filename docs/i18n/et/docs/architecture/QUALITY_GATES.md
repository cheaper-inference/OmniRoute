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

## Kontrollväravate loend ja käivitusprofiilid

### Kandidaadi vastuvõtmine

CI ja Quality Gates töövood väljastavad kumbki stabiilse otsuse: `Gate / CI` ja
`Gate / Quality`. Nende versioonitud vastuvõtupoliitika loetleb kõik eelnevad tööd
kohustuslike või nõuandvatena. Kohaldatav kohustuslik töö peab õnnestuma: puuduv,
tühistatud, vahele jäetud, ootel või tundmatu tulemus ei saa kinnitada olekut PASS. Kehtiv
ainult dokumentatsiooni või ainult kataloogi puudutav klassifikatsioon võib muuta koodiraja mittekohaldatavaks;
mustand-PR ei ole vastuvõetav kandidaat. Silt `hotfix` ei tühista tõendite nõuet.

Mõlemad töövood hõlmavad PR-e põhi-/väljalaskeharudesse, tõukeid harusse `main`, käsitsi käivitamist
ja liitmisrühma sündmusi. Tõuge, käsitsi käivitamine ja liitmisrühm käitavad täieliku valiku. Tõuked harudesse
`release/**` neid ei käivita (2026-10-18): iga muudatus on maatriksi juba oma PR-is läbinud
ja ühendatud kombinatsioon on Release-Greeni ülesanne (`docs/ops/RUNNER_BOX.md` → hostitud rada). Kahvlid
ja liitmisrühmad kasutavad hostitud käitajaid tööde jaoks, mis muidu valiksid isemajutatud
käitajad; enne kasutuselevõttu tuleb kontrollida piisava hostitud mahu olemasolu.

Iga JSON-kviitung tuvastab väljavõetud SHA, töövoo käituse ja katse.
CLI lükkab tagasi väljavõtte/sündmuse SHA mittevastavuse. Töövootestid seovad poliitika liikmesuse
otsusetöö `needs` loendiga, et uus või eemaldatud rada ei saaks märkamatult kaduda.
Kviitungid hõlmavad omaenda töövoogu, mitte avaldamist, juurutamist ega olemasoleva nõuandva skanneri sisemist toimimist. Kohaldatavate kontrollide kohustuslikuks muutmine harureeglites on eraldiseisev haldusmuudatus; nende tööde määratlemine ei kaitse iseenesest haru.

`API Route Typecheck` on sõltumatu töövookontroll, mis jääb väljapoole mõlemat koondotsust ja kohaliku täieliku vaatleja staatilist profiili. Kontrollige selle tulemust täpse kandidaadi jaoks eraldi. `.github/workflows/api-route-typecheck.yml` käivitub `main`- või `release/**`-harusse suunatud PR-ide, kummagi haruperekonna tõukamiste ja käsitsi käivitamise korral. Sellel puudub teefilter. PR-i sihtharu muutmine taotleb uut kontrolli; keha või pealkirja muutmisel kasutatakse ainult vaatlemiseks mõeldud nime `Admission not requested / API Route Typecheck` ning see ei saa vastuvõtukontrolli asendada. Töövoog ei deklareeri liitmisrühma päästikut. Iga liitmisjärjekorra kasutuselevõtt, mis seda kontrolli nõuab, peab esmalt tagama selle käivitamise vastava sündmuse korral.

### Kasutajaliidese käivitusmaht

CI käitab kogu kasutajaliidese loendi nelja `test-vitest` maatriksikilluna, millest igaühel on kuni
kaks töötluslõime ja olemasolev 15-minutiline töö tähtaeg. Esimene kild käitab ka
MCP/autoCombo Vitesti komplekti. Kohustusliku töö tulemus hõlmab maatriksi iga haru; ühe
killu ebaõnnestumine või tühistamine ei saa kinnitada kandidaadi vastuvõtmist.

Igaöine vaatleja säilitab iga kasutajaliidese killu jaoks eraldi täpse kandidaadi kviitungi,
sealhulgas MCP käivituse esimeses kviitungis. Nõutavad on kõik neli kviitungit, logid ja vastavad
käivitusidentiteedid. Kohalik `npm run test:vitest:ui` valib endiselt
täieliku komplekti; üks `--shard` käitus on ainult osaline tõend.

### Ühiktestide katvuse kogumine

Kaksteist ühiktestikildude käitust koguvad olemasoleva testikäituse ajal V8 katvust. Edukas
kild käitab skripti `scripts/ci/compact-v8-coverage.mjs`, et tihendada algsed failid ilma
vahepealset Istanbuli aruannet genereerimata. Viimane Coverage töö kontrollib kõiki kahtteist manifesti
kandidaadi SHA, käituskeskkonna, lähtejuure ja andmeräside suhtes ning käitab seejärel c8 raporteerijad ja olemasolevad
katvusläved. Sisendid säilitavad c8 globaalse failinimede järjestuse; killupõhine eelliitmine ei ole
funktsioonide/plokkide segakatvuse korral ohutu. Puuduvad, vigased või ühildumatud killud nurjavad vastuvõtmise.
Ebaõnnestunud testikildude töötlemata diagnostiline katvus säilitatakse eraldi; seda ei saa lõplikku liitmisse kaasata.

### Üksustestide täitmise edenemise kviitungid

Ühiskäsk `test:unit:ci:shard` salvestab etappide `primary`, `dashboard` ja `serial`
edenemise skripti `scripts/ci/unit-progress-reporter.mjs` kaudu. Tavapärane testiaruanne jääb
kättesaadavaks. Eraldi, ainult metaandmeid sisaldav kviitung salvestab iga faili käivitamise ja lõpetamise
ning 30-sekundilise intervalliga südamelöök loetleb endiselt aktiivsed failid ja nende möödunud tööaja. See salvestab
ainult lubatud täitmise metaandmed; testide kirjeldusi, väljundit, vigade sisu ega täielikku
keskkonda ei serialiseerita.

CI ja Quality säilitavad JSONL-failid nimedega `unit-progress-ci-<run>-<attempt>-<shard>` ja
`unit-progress-quality-<run>-<attempt>-<shard>`. Töö ajalõpp võib takistada hilisemat üleslaadimist;
juba väljastatud südamelöögid jäävad diagnostiliseks tõendusmaterjaliks. Puuduvad südamelöögid võivad viidata ka
blokeeritud või lõpetatud käitusprotsessile. Need kviitungid säilitavad olemasoleva testivaliku,
rööpsuse, tähtajad ja väljumisoleku; need ei ole kandidaatide vastuvõtmise otsused.

### Säilitatud tõendid vastuvõtu tulemuste koondajas

`scripts/quality/validate-release-acceptance.mjs` koondab etteantud plaani ja selle manifestid; see ei tõenda, et plaan katab kogu väljalaskeprotsessi. Selle aruanded määravad sõnaselgelt `releaseAcceptance: false` ka siis, kui plaani tulemus on `VERIFIED`. Töövoog `release-acceptance.yml` kasutab endiselt varirežiimi testandmeid, mitte tegelikke ehitamise, pakkimise, käivitamise või edutamise kviitungeid.

CLI nõuab säilitatud tõendite kontrollimiseks valikut `--evidence-root`. Failid leitakse teelt `<evidence-root>/<artifact_id>/<member>` ja nende räsi arvutatakse SHA-256 abil. Tõenditeta PASS-kirje, puuduv või muudetud fail, ohtlik tee või sümbollink takistab kinnitamist. Puuduvad failid ei võrdu edukate käivituste tühjade logidega. Olemasolevad SHA/run/attempt kontrollid jäävad sõltumatuks: kattuvad baidid ei muuda aegunud kviitungit kehtivaks. Faili terviklus ei tõenda käivituse ehtsust ega artefakti edutamist.

### Staatilise skannimise loend

Versioonitud npm-aliaste loend ja staatilise skannimise liikmesus asuvad failis
`config/quality/gate-manifest.json`. Käitage `npm run check:gate-manifest`, et valideerida
skriptinimed ja täpsed käsud faili `package.json` suhtes; lisamised, eemaldamised ja
käskude kõrvalekalded nurjavad nii kohaliku haagi kui ka CI muudatuste klassifitseerimise tööd.
Alias ei ole töövootöö, maatriksi eksemplar ega testjuhtum: neid arve ei tohi
esitada omavahel asendatavatena.

Kasutage `npm run quality:scan -- --list` või `npm run quality:scan:fast -- --list`,
et valitud aliaseid ilma neid käivitamata kontrollida. Käitaja kutsub npm-i sisenemispunkti, seega säilib
selle käituskeskkond, sealhulgas Bun seal, kus see on seadistatud.
Manifest registreerib nendest profiilidest väljapoole jäävad aliased eraldi käivitatavatena ning
hoolduskäsud on kirjutuskaitstud skannimisprofiilides keelatud.

Need profiilid hõlmavad ainult staatilist skannimist. Need ei sertifitseeri tooteteste,
katvust, pakendamist, väliseid kontrolle ega kandidaadi täielikku väljalaske heakskiitu.
Töövoo vastuvõtmine kasutab lingitud faili `config/quality/admission-policy.json` ja
skripti `scripts/quality/admission-verdict.mjs`. Väljalaskevaatleja profiilid jäävad eraldiseisvaks;
kontrollige nende kohaldatavaid kontrolle ja kviitungeid sõltumatult. Täieliku vaatleja staatilised
käsud on deklareeritud failis `config/quality/release-green-static-profile.json`, sealhulgas
`audit:deps`, mutatsioonitestide valik ja tõlkekontrollid. Laadija valideerib npm-i
käsud package.json-i ja modelleeritud CI/Quality deklaratsioonide suhtes; see lükkab kõrvalekalded
tagasi, selle asemel et käivitada kestatõlgitõendeid argumentidena. Kohustusliku skanneri SKIP/INCOMPLETE väljund
ei saa kinnitada olekut PASS. Profiil registreerib oma välised välistused ega asenda
hostitud katvust, testmaatrikseid, paketi- ega juurutustõendeid. Allolev proosaloend
on viide, mitte tõend selle kohta, et kontrollvärav tegelikult käitus.

Skriptid asuvad kataloogides `scripts/check/` (poliitika kontrollväravad) ja `scripts/quality/` (ratchet-mootor).
CI tõeallikas on `.github/workflows/ci.yml`.

### Avaldatud baasdokumentatsiooni seisund

`.github/workflows/i18n-base-health.yml` jälgib dokumentatsiooni seisundit pärast valitud
tõukeid harudesse `main` ja `release/v*` ning käsitsi käivitamisel. Selle filtrid hõlmavad dokumentatsiooni,
juurkataloogi Markdown-faile, faili `llm.txt`, tõlke olekut ja konfiguratsiooni ning asjakohaseid i18n-tööriistu.
Ainus töö `Published base documentation health` kasutab majutatud Ubuntut ja viieminutilist
tähtaega. See teostab kirjutuskaitstud valideerimise ja kirjutab diagnostilise kviitungi ilma
sõltuvusi installimata, tõlkimata ega olekut üle võtmata.

`scripts/i18n/check-base-health.mjs` nõuab, et lähte-räsi vastuolusid, puuduvaid sihtfaile, siht-räsi
vastuolusid, aegunud tõlkeid ega jaotiste vahemälu vastuolusid ei esineks. Samuti valideerib see praeguse põhidokumentide
ja lokaatide ulatuse ning nende salvestatud päritolu. Sobimatu kontekst, puudulik katvus
või katkestatud kontrollija annab tulemuseks `INCOMPLETE`; kinnitatud lahknevus annab tulemuseks `FAIL`. Mõlemad
tagastavad nurjumist tähistava väljumisoleku. Kviitung seotakse väljavõtte SHA, töövoo, käituse ja
katsega ning seda säilitatakse nimega `i18n-base-health-<sha>-<run>-<attempt>`.

See on avaldatud baasi sõltumatu vaatlus. See ei lisa PR-i ega
liitmisrühma sündmust, kohustuslikku PR-kontrolli, npm-i aliast ega staatilise skannimise profiili liiget.
Olemasolev diferentsiaalne PR-poliitika ja selle aluseks oleva kontrollija soovituslikud klassifikatsioonid
jäävad eraldiseisvaks. Edukas üleslaadimine ei saa muuta nurjunud seisunditulemust väärtuseks PASS.

### Väljalaske-PR-i kiirtee (`quality.yml`)

`.github/workflows/quality.yml` täiendab CI-d põhi-/väljalaske-PR-ide, harusse `main` tehtavate tõugete,
käsitsi käivitamise ja liitmisrühmade korral. PR-id kasutavad teekonna järgi filtreeritud kiirkontrolle. Püsivalt
keelatud dubleeritud ehitamine eemaldati; tegelikud ehitus-, pakendamis- ja käivituskontrollid jäävad CI-sse.

| Töö                                              | Ulatus                                                                                                                                                                                                                 | Blokeeriv                 |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `Docs Gates (fast-path)`                         | Dokumentatsiooni-/koodi-PR-id; API dokumentatsiooni viited ja kogu dokumentatsioon                                                                                                                                     | Jah                       |
| `Fast Quality Gates`                             | Koodi-PR-id; staatilised kontrollid, tüübikontroll, juhtpaneeli tüübikontroll, mõjutatud ühiktestid                                                                                                                    | Jah                       |
| `Forgotten sibling tests`                        | Koodi-PR-id; muudetud moodulite seostamine staatiliste tarbijate ja võimalike sõsartestidega; koondmoodulite ja dünaamilise impordi teed esitatakse soovituslike diagnostikateadetena koos viidatud lubatud eranditega | **Soovituslik**           |
| `Vitest (fast-path)`                             | Koodi-PR-id; kiire Vitesti testikomplekt                                                                                                                                                                               | Jah                       |
| `Unit Tests fast-path`                           | Koodi-PR-id; neljaks osaks jaotatud ühiktestide komplekt                                                                                                                                                               | Jah                       |
| `No new ESLint warnings`                         | Koodi-PR-id; tõkestusteavet arvestav lintimise kaitsekontroll                                                                                                                                                          | Jah, sealhulgas fork’ides |
| `Merge integrity (changelog + generated skills)` | Mitte-mustand-PR-id; muudatuste logi ja genereeritud oskuste sünkroonimine                                                                                                                                             | Jah, sealhulgas fork’ides |

#### Unustatud sõsartestide aruanne

`npm run check:forgotten-sibling-tests` kasutab uuesti testide mõjukaardi aluseks olevat impordilahendajat.
Iga muudetud tootmismooduli kohta esitab see deterministlikud
`changed module/symbol -> static consumer -> candidate sibling test` ahelad, kui võimalik
test puudub pull request’i diffist. Markdowni kokkuvõte ja JSON-tulemus säilitatakse
töövoo `forgotten-sibling-tests` artefaktina kalibreerimiseks enne blokeeriva kontrolli kasutuselevõttu.

Koondmoodulite reeksport ja dünaamilised impordid on ainult lahendusdiagnostika; need ei tekita
kunagi blokeerivat leidu. Üle vaadatud erandid asuvad failis
`config/quality/forgotten-sibling-allowlist.json`. Iga kirje peab nimetama tarbija ja võimaliku
testi, esitama konkreetse põhjenduse ning viitama GitHubi probleemile või pull request’ile. Vigaste kirjete korral
kontroll ebaõnnestub. Erandid ei saa peita kustutatud võimalikku testi ega diffi, mis lisab `.skip`/`.todo`;
väidete nõrgendamine ja muu varjamine jäävad sõltumatult blokeeriva
`check:test-masking` kontrolli vastutusalasse.

### Töö: `lint`

Käivitatakse iga `main`-harusse suunatud PR-i puhul. Ebaõnnestumise korral blokeerib ühendamise.

| Skript (`npm run ...`)            | Kontrollib                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Blokeeriv                                |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`              | Node.js-i versioon jääb toetatud vahemikku                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jah                                      |
| `check:test-tla-order`            | Ükski `node:test`-i fail kataloogis `tests/unit` ei registreeri testi, ei jõua tipptaseme `await`-ini ega registreeri seejärel rohkem teste (#18045; põrkmehhanism: `test-tla-order-allowlist.json` saab ainult kahaneda)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Jah                                      |
| `check:cycles`                    | Ringimpordid kogu `src/` + `open-sse/` ulatuses (AST-põhine, tsconfig-i `paths` lahendatud). Põhikäsk lõpetab väljumiskoodiga 1 alati, kui leidub mõni tsükkel (alates #15281 tõrke korral suletud), ja loetleb SCC-d. `check:cycles:ratchet` (mida CI käitab) blokeerib, kui arv ületab faili `quality-baseline.json` ülempiiri `metrics.cycles` — praegu 14, `direction: down`, seega saab see ainult langeda (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jah (põrkmehhanism)                      |
| `check:boundary`                  | `open-sse → src` sidestus: unikaalsed failidevahelised impordid mootorist rakendusse (`scripts/quality/measure-boundary.mjs`; servade loend on v4 tuuma/mooduliteks jaotamise parandustööde loend). Põhikäsk = nõuandev aruanne (sama mis `quality:boundary`). `check:boundary:ratchet` (mida CI käitab, samuti `quality.yml`-i kiirkontrollide põrkmehhanismi tsüklis) blokeerib, kui arv ületab faili `quality-baseline.json` ülempiiri `metrics.boundaryOpenSseToSrc` — algväärtuseks on mõõdetud 771, `direction: down`; `--update` ainult vähendab seda; PR-ides põhiharuga võrreldav (`--base-ref`, vt allpool)                                                                                                                                                                                                                                                                                                                                                                                                                  | Jah (põrkmehhanism)                      |
| `check:route-validation:t06`      | Zod-skeemid on olemas kõigil marsruutidel (6. taseme reegel)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Jah                                      |
| `check:any-budget:t11`            | `@ts-expect-error // any` arv ei ületa eelarvet (11. taseme tõke)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Jah                                      |
| `check:provider-consistency`      | Igal failis `providers.ts` oleval teenusepakkujal on vastav kirje failis `providerRegistry.ts` (ja vastupidi, lubatud loendi piires)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Jah                                      |
| `check:model-lifecycle`           | Kolm käsitsi hallatavat marsruutimistabelit peavad jääma kooskõlla repositooriumisse talletatud elutsükli hetktõmmisega (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ei määra skoori ühelegi kasutuselt kõrvaldatud ID-le, millele `REGISTRY` saab marsruutida; iga `BUILT_IN_ALIASES` sihtmärk on olemas registris `REGISTRY` ja puudub kasutuselt kõrvaldatud ID-de hetktõmmisest; iga kasutuselt kõrvaldatud ID, mis on endiselt registris `REGISTRY`, suunatakse edasi või on loetletud loendis `allowedRetiredInCatalog`; ning ükski `DEFAULT_DEGRADATION_MAP` lähte- ega sihtkirje ei ole selles hetktõmmises märgitud kasutuselt kõrvaldatuks. See ei tõenda, et mudelit teenindab praegu töötav ülesvooluteenus. Võrguühenduseta — võrdleb failiga `config/quality/model-lifecycle.json`, mida värskendatakse käsitsi käsuga `npm run quality:refresh-model-lifecycle` (vajab võrku; pole CI-ga ühendatud). `allowedRetiredInCatalog` on järk-järgulise vähendamise põrkmehhanism: lisa kirje ainult koos jälgimisprobleemiga. | Jah                                      |
| `check:fetch-targets`             | Iga kliendipoolses kaustas `src/` olev `fetch("/api/...")` viitab tegelikule failile `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Jah                                      |
| `check:deps`                      | Kõik repositooriumi iga faili `package.json` kaudu käsuga `npm install` installitavad sõltuvused on failis `dependency-allowlist.json`; uued kinnitamata versiooniga või nimekaaperduse kahtlusega paketid märgistatakse                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Jah                                      |
| `audit:deps`                      | kõigi viie sõltumatu lukufaili npm-audit (juur, Electron, OpenCode'i pistikprogrammid v1/v2 ja teenusepakkuja). Kriitilised turvateated blokeerivad; kõrge taseme turvateated jäävad nähtavateks hoiatusteks. Puuduvad/ebaõnnestunud auditid märgitakse olekuga INCOMPLETE ja need blokeerivad; iga ulatuse lukuräsid ja aruanded säilitatakse.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Jah                                      |
| `check:lockfile`                  | `package-lock.json`-i terviklus — https-register, terviklusräsid, hosti ülekirjutused puuduvad                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Jah                                      |
| `check:licenses`                  | Tootmissõltuvuste SPDX-litsentside lubatud loend                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jah                                      |
| `check:tracked-artifacts`         | Ehitamise artefaktid / versioonihaldusse lisatud `node_modules`-i sümbollingid puuduvad (käitatakse ka husky pre-commit-haagis; pre-push on tahtlikult kerge — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Jah                                      |
| `check:ai-attribution`            | PR-i muudatustes, pealkirjas ega sisus ei tohi olla tehisintellekti/roboti `Co-Authored-By`-lõpurida ega tehisintellektiga genereerimise jalust — range reegel nr 16 (`quality.yml`-i kiirete kontrollide tsüklis PR→`release/**` puhul — loeb sündmuse andmekogumit, väljaspool PR-e ei tee midagi — ning ainult PR-idele mõeldud sammuna `ci.yml`-i lintimisel PR→`main` puhul; samuti husky `commit-msg`-haak; inimestest kaasautorid on lubatud; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:vitest-exclusions`         | Iga Vitesti välistus nimetab jälgimisprobleemi ja esineb failis `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jah                                      |
| `check:file-size`                 | Lähtefailid (`.ts`/`.tsx` kaustades `src/`, `open-sse/`, `electron/`, `bin/`) jäävad `cap` piiresse ja testifailid (`*.test.ts(x)`) `testCap` piiresse; failis `file-size-baseline.json` fikseeritud failid (`frozen` / `testFrozen`) ei tohi kasvada üle nende salvestatud suuruse                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Jah                                      |
| `check:error-helper`              | Täiturite/käitlejate veavastused kasutavad funktsioone `buildErrorBody()` / `sanitizeErrorMessage()` (range reegel #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Jah                                      |
| `check:migration-numbering`       | Migratsiooni SQL-failid on nummerdatud järjestikku, ilma lünkade või duplikaatideta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Jah                                      |
| `check:public-creds`              | Väljaspool faili `publicCreds.ts` ei ole literaalseid OAuthi `client_id`/`client_secret` väärtusi ega Firebase Webi võtmeid (range reegel #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Jah                                      |
| `check:db-rules`                  | Väljaspool `src/lib/db/` mooduleid ei ole töötlemata SQL-i; failist `localDb.ts` ei kasutata koondimporti (ranged reeglid #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jah                                      |
| `check:known-symbols`             | Pakkujate täiturid, marsruutimisstrateegiad ja tõlkijad, mis on registreeritud nende suunamistabelites, vastavad kettal olevatele failidele — ei ole orvuks jäänud ega deklareerimata sümboleid                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Jah                                      |
| `check:route-guard-membership`    | Iga alamprotsessi käivitav marsruut on funktsiooniga `isLocalOnlyPath()` klassifitseeritud (ranged reeglid #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Jah                                      |
| `check:test-discovery`            | Iga repos olev `*.test.ts` / `*.spec.ts` fail tuvastatakse vähemalt ühe testikäitaja poolt (põrkmehhanism: orbfailide loend failis `test-discovery-baseline.json` saab ainult kahaneda)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Jah                                      |
| `check:agent-skills-sync`         | Genereeritud agendioskuste artefaktid vastavad nende lähtekataloogile (lahknevusi pole)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:provider-asset-provenance` | Pakkujate logode/varade päritolu on registreeritud                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `lint:json`                       | JSON-i konfiguratsioonifailid parsitakse ja need vastavad repo lintimisreeglitele                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `typecheck:core`                  | TypeScripti kompileerimine vigadeta (ainult nõuandvad hoiatused)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jah                                      |
| `typecheck:noimplicit:core`       | Range `noImplicitAny` — tulevikku suunatud; paljud olemasolevad väljakutsed vajavad endiselt annotatsioone                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **Nõuandev** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, mille ulatus on piiratud kataloogiga `src/app/(dashboard)/**` (#7033) — `typecheck:core`-i hoolikalt valitud 27 faili lubatud loend ei sisalda ühtegi töölaua TSX-faili ning ka `next build` ei kontrolli kunagi nende tüüpe (`next.config.mjs` määrab `ignoreBuildErrors: true`), mistõttu jäid seal esinenud määratlemata identifikaatorite regressioonid (#6625/#6909) CI-le nähtamatuks. Erinevusi võrreldakse külmutatud faili- ja TS-koodipõhise arvulise lähtetasemega (`config/quality/dashboard-typecheck-baseline.json`, sama aegunud kirjete jõustamise muster nagu `check:known-symbols`-is) — kontroll nurjub ainult lähtetasemel fikseeritud arvust suurema arvu UUTE vigade korral; kui olemasolev viga parandatakse, langeta lähtetaset käsuga `--update`.                                                                                                                                                                                                                                                      | Jah                                      |

### Töö: `quality-gate`

Käivitatakse pärast tööd `test-coverage`. Tõrke korral blokeerib mestimise.

| Skript                       | Kontrollib                                                                                                                                                                                                  | Blokeeriv                   |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `quality:collect`            | Väljastab faili `quality-metrics.json` (ESLinti hoiatuste arv, ühendatud osade aruandest pärinev testikattuvus)                                                                                             | Jah (ratcheti eelnev etapp) |
| `quality:ratchet`            | Ükski faili `quality-baseline.json` mõõdik pole halvenenud (ESLinti hoiatused ≤ lähtetase; testikattuvus ≥ lähtetase)                                                                                       | Jah                         |
| `check:duplication`          | Koodi dubleerimine (jscpd@4) ei ületa failis `quality-baseline.json` määratud lähtetaset                                                                                                                    | Jah                         |
| `check:complexity`           | Failitaseme tsüklomaatiline keerukus ei ületa ülempiiri (ESLinti tuumreeglid `complexity` + `max-lines-per-function`)                                                                                       | Jah                         |
| `check:cognitive-complexity` | Kognitiivse keerukuse ratchet (`eslint-plugin-sonarjs`) — eraldiseisev ESLinti käivitus; CI käivitab mõlemad ühendatuna ühe etapina `check:complexity-ratchets`                                             | Jah                         |
| `check:dead-code`            | Kasutamata eksportide/failide ratchet (knip) ei halvene võrreldes lähtetasemega                                                                                                                             | Jah                         |
| `check:compression-budget`   | Tihendamise võrdlustesti eelarve — mootoripõhised minimaalsed tokenisäästu määrad ei tohi halveneda                                                                                                         | Jah                         |
| `check:type-coverage`        | Tüübitud koodi protsendi ratchet (`type-coverage`) ei halvene; asendab suures osas kontrolli `typecheck:noimplicit:core`                                                                                    | Jah                         |
| `check:codeql-ratchet`       | Avatud CodeQL-i hoiatuste arv ei halvene (loetakse käsuga `gh api`; tokeni puudumisel jäetakse kontroll veatult vahele) — värskendamissagedus ja käsitsi käivitamine: vt allpool jaotist „CodeQL-i ratchet“ | Jah                         |

### Töö: `quality-extended`

Töö blokeerib asjakohased kandidaadid. Paketi suurust, saladuste leide, turvanõrkuste
leide, töövoo leide ja OpenAPI muudatusi kontrollitakse kohustuslike ratchet'itega.
Tsükliliste sõltuvuste diagnostika jääb soovituslikuks. Skannerite installimine on kohustuslik:
`scripts/ci/install-quality-scanners.sh` paigaldab fikseeritud versioonid ja edastab
installimistõrked. Puuduvate tööriistade, vigaste aruannete või puuduvate lähtetasemete korral jääb
kohustusliku skanneri kontroll OLEKUSSE INCOMPLETE.

| Skript                   | Kontrollib                                                                                                                                                                                                                                           | Blokeeriv                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `check:circular-deps`    | Ringseid sõltuvusi pole (dpdm)                                                                                                                                                                                                                       | **Soovituslik**                                              |
| `check:bundle-size`      | Paketi suurus ei ületa ülempiiri; mõõtmise kättesaamatus põhjustab nurjumise                                                                                                                                                                         | **Blokeeriv koos võtmega --ratchet**                         |
| `check:secrets`          | Gitleaksi leiud ei halvene; kohustuslikud kontrollid lükkavad tagasi puuduva tööriista/lähtekoodi/lähtetaseme, nurjunud kontrollid ja vigased aruanded                                                                                               | **Blokeeriv koos võtmega --ratchet**                         |
| `check:vuln-ratchet`     | Sõltuvuste turvanõrkuste olukord ei halvene; kohustuslikud kontrollid lükkavad tagasi puuduvad tööriistad, vigased aruanded või puuduva lähtetaseme                                                                                                  | **Blokeeriv koos võtmega --ratchet**                         |
| `check:workflows`        | Töövoo lintimine (actionlint + zizmor); puuduvad või katkised skannerid, vigased aruanded või puuduv ratchet’i lähtetase põhjustavad oleku INCOMPLETE. Korrektsed leiud järgivad valitud ranget/soovituslikku/ratchet’i poliitikat                   | Käivitamine on kohustuslik; zizmor ratchet on CI-s blokeeriv |
| `check:openapi-breaking` | Avaliku API leping fikseeritud sündmuse commit’ide suhtes (PR-i merge-base, tõuke-eelne olek, merge-group’i alus; ajastatud/käsitsi käivitamisel esmalt checkout’i esimene eellane); kohustusliku mõõtmise nurjumisel rakendatakse kinnist nurjumist | **Blokeeriv koos võtmega --ratchet**                         |

### Töö: `docs-sync-strict`

`main`-i või `release/**`-i suunatud pull request’ide korral käivitub see töö ainult mustandiks märkimata (või usaldatud järjekorra) kandidaatidel, mis on liigitatud dokumentatsiooni- või koodimuudatusteks. Töö käivitub ka PR-väliste CI-sündmuste korral; selle töövoo push-päästik hõlmab ainult `main`-i, mitte `release/**`-i. Nullist erineva väljumiskoodiga samm blokeerib töö; allpool kirjeldatud ainult aruandesse minevad leiud ja dokumenteeritud erandid seda ei tee.

| Skript                         | Kontrollib                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Blokeeriv                                                                                                                                     |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Metavärav, mis käivitab alltoodud 7 alamväravat järjestikku                                                                                                                                                                                                                                                                                                                                                                                                                                  | Jah                                                                                                                                           |
| ↳ `check:docs-sync`            | Paketi/OpenAPI/CHANGELOG-i versioonide kooskõla, täpsed `llm.txt` peeglid, tõlgitud CHANGELOG-i jaotiste/mahu invariandid ning asendatud duplikaatdokumentide puudumine                                                                                                                                                                                                                                                                                                                      | Jah                                                                                                                                           |
| ↳ `check:docs-frontmatter`     | Kompileeritud dokumentatsioonilehtedel on kehtivad frontmatter’i pealkirjad                                                                                                                                                                                                                                                                                                                                                                                                                  | Jah                                                                                                                                           |
| ↳ `check:docs-counts`          | Kõrge usaldusväärsusega loendusinvariandid on ranged; heuristilised failiarvu kontrollid ainult hoiatavad, kui skriptile ei anta `--strict` (CI metavärav seda ei edasta)                                                                                                                                                                                                                                                                                                                    | Range tase blokeerib; pehme tase on nõuandev                                                                                                  |
| ↳ `check:env-doc-sync`         | Lähtekoodi keskkonnamuutujate lugemised, `.env.example` ja `docs/reference/ENVIRONMENT.md` on kooskõlas pärast selgesõnaliste ignore-, doc-only- ja env-only-erandiloendite rakendamist                                                                                                                                                                                                                                                                                                      | Jah, väljaspool dokumenteeritud erandiloendeid                                                                                                |
| ↳ `check:deprecated-versions`  | Teatab võimalikest aegunud versioonidest väljaspool ohutuid ajaloolisi kontekste ja aegunud uuendamiskuupäevadest, jättes ignoreeritud dokumendid välja                                                                                                                                                                                                                                                                                                                                      | Praeguses CI seadistuses nõuandev (`--strict` ei edastata)                                                                                    |
| ↳ `check:doc-links`            | Dokumentatsiooni sisemised markdown-lingid viitavad olemasolevatele failidele (`[text]`/`(path)` vormingus)                                                                                                                                                                                                                                                                                                                                                                                  | Jah                                                                                                                                           |
| ↳ `check:fabricated-docs`      | Dokumentatsioonis viidatud marsruudid, keskkonnamuutujad, CLI-käsud, hook’ide nimed ja failiteed on koodibaasis olemas. Range värav võtmega `--strict`; ilma võtmeta pehme nurjumine.                                                                                                                                                                                                                                                                                                        | Jah (CI-s võtme `--strict` kaudu)                                                                                                             |
| `check:cli-i18n`               | Kasutatud CLI `t()` võtmed on olemas failis `en`; `pt-BR` säilitab kõik ülataseme jaotised; `zh-CN` ja `zh-TW` sisaldavad kõiki `en` võtmeid                                                                                                                                                                                                                                                                                                                                                 | Jah                                                                                                                                           |
| `check:openapi-coverage`       | OpenAPI spetsifikatsioon katab vähemalt ratchet’iga määratud reaalselt olemasolevate marsruutide alampiiri                                                                                                                                                                                                                                                                                                                                                                                   | Jah                                                                                                                                           |
| `check:openapi-security-tiers` | Deklareeritud `x-loopback-only`/`x-always-protected` annotatsioonidel peab olema kate failis `routeGuard.ts`; parseri- ja edasisuunalised lahknevused blokeerivad. Ainult kohalike prefiksite all puuduvate `x-loopback-only` annotatsioonide pöördkontroll hoiatab ning ainult mustriga määratud marsruudid jäetakse sellest pöördkontrollist välja.                                                                                                                                        | Parseri-/edasisuunalised kontrollid blokeerivad; pöördkontroll on nõuandev                                                                    |
| `check:openapi-routes`         | Iga `/api...` tee failis `openapi.yaml` vastab parameetrinimedest sõltumatult tegelikule marsruudile pärast põhjendatud `KNOWN_STALE_SPEC` erandiloendi rakendamist; ka aegunud erandiloendi kirjed põhjustavad nurjumise                                                                                                                                                                                                                                                                    | Jah                                                                                                                                           |
| `check:docs-symbols`           | Kanooniliste mittepeegeldatud dokumentide sisemised `/api/...` URL-viited vastavad tegelikule marsruudile või marsruudiperele; proxy/upstream/kohatäite/failiviited ja põhjendatud `KNOWN_STALE_DOC_REFS` kirjed jäetakse välja ning aegunud erandiloendi kirjed põhjustavad nurjumise                                                                                                                                                                                                       | Jah                                                                                                                                           |
| `i18n translation drift`       | Kontrollib põhidokumentide lähte-/sihtfailide räsisid ja tõlke päritolu. PR-i võrdlus lubab ainult identseid päritud vigu; uued või kontrollimata lähtefaili, puuduva sihtfaili, sihtfaili räsi, aegunud tõlke või jaotise vahemälu vastuolud blokeerivad. Väljaspool PR-i võrdlust blokeerivad lähtefaili/puuduva sihtfaili/sihtfaili räsi vead, kuid aegunud tõlked ja vastuolulised jaotiste vahemälud jäävad üksnes hoiatusteks. Vanas vormingus jaotise vahemälu puudumine ei ole viga. | Uus/kontrollimata PR-i kõrvalekalle blokeerib; identne päritud kõrvalekalle on üksnes hoiatus; PR-ist väljaspool sõltuvad reeglid vea liigist |

### Töö: `i18n-ui-coverage`

| Skript                                  | Kontrollib                                                                                                                                                                                                                   | Blokeeriv     |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (tekstisisene) | Kas kasutajaliidese i18n-võtmete kaetus on ≥ 65%                                                                                                                                                                             | Jah           |
| `check-ui-value-drift` (tekstisisene)   | Muudetud ingliskeelne **väärtus** ei jäta maha aegunud tõlget                                                                                                                                                                | Jah           |
| `check-new-key-coverage` (tekstisisene) | **Uus** ingliskeelne võti on tõlgitud igas lokaadis — marker `__MISSING__:` lükatakse tagasi                                                                                                                                 | Jah           |
| `check-translation-ratio`               | Tegelike tõlgete suhtarv lokaadi kohta (inglise keelega identsed / kohatäited / puuduvad lehed väljaspool lubatute loendit) ei tohi ületada faili `config/quality/i18n-translation-baseline.json` väärtust koos puhvervaruga | **Blokeeriv** |

Vajab sätet `fetch-depth: 0` — väärtuste lahknevuse kontroll võrdleb faili `en.json` ühendamisbaasiga.

#### `check-ui-value-drift` — aegunud tõlgete tõke

Tuvastab ühe i18n-i regressiooni, mida teised tõkked oma ülesehituse tõttu ei näe: ingliskeelne väärtus
kirjutatakse ümber, kuid _eelmisest_ ingliskeelsest tekstist tuletatud tõlked jäävad alles, mistõttu
mitteingliskeelsed kasutajad loevad jätkuvalt enesekindlalt sõnastatud, kuid nüüdseks vale teksti.

See jõudis päriselt väljalaskesse. `oauthModal.googleOAuthWarning` kirjutati ümber, kui lisati Antigravity
sisselogimisabiline (#5203); **39 lokaadis 43-st** jäi alles tekst, mis käskis operaatoritel „kopeerida
täieliku URL-i ja kleepida selle allapoole” — töövoog, mida selle teenusepakkuja puhul ei saa lõpule viia. See jäi
kuni muudatuseni #8463 märkamata, sest:

- `sync-ui-keys` lisab ainult **puuduvad** võtmed ega uuenda kunagi **aegunuid**;
- `check-ui-keys-coverage` arvestab võtme _olemasolu_, seega loetakse aegunud tõlge kaetuks;
- `check-translation-drift` jälgib dokumentatsiooni peegelkoopiaid asukohas `docs/i18n/<locale>/**.md` —
  see ei loe kunagi faile `src/i18n/messages/*.json`. Töö `docs-sync-strict` on blokeeriv alates
  2026-09 uuesti sünkroonimisest: muuda põhidokumenti → `npm run i18n:run -- --files=<doc>` (jaotisepõhine, kiire).

**Arvestab erinevusi, ei tugine lähtejoonele.** See võrdleb ühendamisbaasis olevat faili `en.json`
tööpuuga; iga võtme puhul, mille ingliskeelne väärtus muutus, loetakse aegunuks kõik lokaadid, milles
on endiselt muutmata tõlge. See **külmutab olemasoleva võla** teadlikult — erinevus ei näita,
millisest vanast ingliskeelsest tekstist pikaajaline tõlge pärineb, seega hindab tõke ainult seda,
mida praegune muudatus puudutab. Alternatiiv (võtmepõhine räsilähtejoon) nõuaks umbes 600 KB suurust
genereeritud faili, mis oleks kolm korda suurem kui suurim olemasolev lähtejoon ja muutuks iga i18n-i PR-iga.

Selle kontrolli läbimiseks on kaks võimalust:

1. uuenda mõjutatud tõlkeid või
2. määra nende väärtuseks `__MISSING__:<new english>` — käituskeskkond kasutab siis parandatud ingliskeelset teksti
   (`src/i18n/request.ts::deepMergeFallback`, #7258) ja võti lisatakse tõlkejärjekorda.

Kui stringi **tähendus** muutus, eelista **võtme ümbernimetamist**: uus võti ei saa pärida
aegunud tõlget. Seda mustrit kasutati muudatuses #8463.

```bash
npm run i18n:check-value-drift          # range (seda käitab CI)
npm run i18n:check-value-drift:warn     # ainult aruanne
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Väärtusnihke ja uue võtme kontrollväravad kasutavad üht muutumatut võrdlust skriptist
`scripts/i18n/resolve-ui-diff-base.mjs`. Töövoog edastab mõlemale kontrollile sama baasi, baasi tipu ja
kandidaadi SHA-d. PR-i/baasi ümbersuunamise, push'i ja liitmisrühma käivitused kasutavad oma sündmuse
konteksti. Kandidaatharu käsitsi käivitamine nõuab selle täpset avatud PR-i või sõnaselget
`i18n_base_sha` sisendit. `main`-i või `release/vX.Y.Z`-i käsitsi või ajastatud jälgimine
ilma selle sisendita võrdleb viimast commit'i selle esimese eellasega; see ei ole kogu
päritud tõlkevõla audit. Kohalik käivitamine nõuab sõnaselget võrdlusbaasi,
näiteks ülaltoodud käsku `BASE_REF`.

Puuduv või mitmetähenduslik võrdluskontekst, loetamatu või vigane nõutav kataloog ja
muutunud kandidaat annavad tulemuseks `INCOMPLETE` väljumiskoodiga **2**, sealhulgas hoiatusrežiimis.
Kataloogide lugemiseks kasutatakse skripti `scripts/i18n/read-ui-catalog.mjs`; lugemistõrgete korral ei
asendata neid tühjade objektidega. Ei kättesaamatu baas ega mittetäielik sisend anna tulemuseks PASS.

### Töö: `i18n`

Täielik i18n-i valideerimismaatriks (üks töö lokaadi kohta). Kogu töö on soovituslik.

| Skript                          | Kontrollib                     | Blokeeriv                                              |
| ------------------------------- | ------------------------------ | ------------------------------------------------------ |
| `validate_translation.py quick` | Tõlke täielikkus lokaadi kohta | **Soovituslik** (`continue-on-error: true` kogu tööle) |

### Töö: `pr-test-policy`

Käivitatakse ainult tõmbetaotluste puhul.

| Skript                 | Kontrollib                                                                                                                                         | Blokeeriv |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PR-id, mis muudavad tootmiskoodi kataloogides `src/`, `open-sse/`, `electron/` või `bin/`, peavad sisaldama või uuendama teste (range reegel nr 8) | Jah       |
| `check:test-masking`   | Muudetud testifailid ei vähenda väidete netoarvu ega lisa tautoloogiaid `assert.ok(true)`                                                          | Jah       |
| `check:pr-evidence`    | PR-i kirjeldus viitab muudatuse testi-/VPS-tõenditele (automatiseerib range reegli nr 18, otsides vasteid PR-i tekstist — habras, vt tööjärge)     | Jah       |

### Töö: `test-vitest`

Vajab klassifitseerimistööd `changes`. Kohaldatavate maatriksikildude nurjumine blokeerib ühendamise.

| Komplekt         | Valideerib                                                         | Blokeeriv                                                                                                                      |
| ---------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP-server (110 tööriista), autoCombo, vahemälu — vitest-käivitaja | Jah                                                                                                                            |
| `test:vitest:ui` | Kasutajaliidese komponentide testid — vitest-käivitaja             | **Blokeeriv** — olemasolevad tõrked on failis `vitest.config.ts` sõnaselgelt välistatud; uued tõrked põhjustavad töö nurjumise |

### Igaöised töövood (ajastatud, soovituslikud)

Need käivitatakse cron-ajagraafiku alusel (ja käsuga `workflow_dispatch`), mitte kunagi PR-ides. Kõik on soovituslikud.

| Töövoog                | Valideerib                                                                                                                                                                                  | Blokeeriv       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | fast-check’i omaduspõhised testid juhusliku algväärtuse ja suure käivituskordade arvuga                                                                                                     | **Soovituslik** |
| `nightly-resilience`   | kuhjamälu kasvu kontrollvärav, kaosepõhine tõrgete sisestamine, k6 koormus- ja kestustestid                                                                                                 | **Soovituslik** |
| `nightly-llm-security` | promptfoo sisestusrünnete tõkestus (blokeerimisrežiim) + garak-proovid (jäetakse pakkuja saladuse puudumisel vahele)                                                                        | **Soovituslik** |
| `nightly-schemathesis` | OpenAPI lepingu hägustestimine (schemathesis) töötava OmniRoute’i suhtes, kasutades faili `docs/openapi.yaml` — toob esile spetsifikatsiooni rikkumised / käsitlemata 500 vead (Faas 8 B.4) | **Soovituslik** |
| `nightly-mutation`     | Strykeri mutatsioonitestimise skoor kiires ühiktestide voos — ellujäänud mutandid toovad esile nõrgad kontrollväited                                                                        | **Soovituslik** |
| `nightly-compat`       | Node’i mootori ühilduvusmaatriks toetatud `engines.node` vahemikes                                                                                                                          | **Soovituslik** |

Jõudluse lähteväärtused (kuhjamälu, TTFB, koostamisaeg) salvestatakse, kuid neid ei kasutata kontrollväravana: vt [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
- **nõuandev** — globaalne kogusumma võrrelduna fikseeritud lähtejoonega. Päritud hälve ei muuda
  süütut PR-i kunagi punaseks; hälvet jälgitakse, et see väljalaske kooskõlastamisel parandada, ning seda
  seirab varuruumi kontrolltöö.

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
2. Lisage `"check:<name>": "node scripts/check/check-<name>.mjs"` faili `package.json` ning
   sünkroonige alias ja selle täpne käsk failis `config/quality/gate-manifest.json`.
   Rakendage sama sünkroonimist olemasoleva valideerimisaliase muutmisel või eemaldamisel.
   Käivitage `npm run check:gate-manifest`; sissekandmiseelne konks ja CI muudatuste klassifitseerimine
   jõustavad selle lepingu.
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
