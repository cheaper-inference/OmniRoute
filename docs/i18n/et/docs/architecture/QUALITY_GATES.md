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

## Väravate inventuuri ja täitmisprofiilid

### Kandidaadi vastuvõtt

CI ja Quality Gatesi töövood annavad mõlemad stabiilse otsuse: `Gate / CI` ja `Gate / Quality`. Nende versioonis sisseastumispoliitika loetleb kõik eelnevad töökohad vastavalt vajadusele või soovitustele. Kohaldatav nõutav töö peab õnnestuma: puuduvad, tühistatud, vahele jäetud, ootel ja tundmatud tulemused ei saa luua PASS. Kehtiv ainult dokumentide või ainult kataloogide klassifikatsioon võib muuta koodiraja kohaldamatuks; PR mustandit ei aktsepteerita. `hotfix` silt ei loobu tõenditest.

Mõlemad töövood hõlmavad PRs main/release harudeks, tõuke `main`, käsitsi saatmist ja rühmade ühendamise sündmusi. Tõuke, saatmise ja ühendamise rühm käivitab täieliku valiku. Tõuked `release/**` ei käivita neid (2026-10-18): iga muudatus käivitas maatriksi juba oma PR ja ühendatud kombinatsioon on Release-Greeni töö (`docs/ops/RUNNER_BOX.md` → Hosted lane). Kahvlid ja liitrühmad kasutavad hostitud jooksjaid tööde jaoks, mis muidu valivad ise hostitud jooksjaid; enne levitamist tuleb kontrollida piisav hostitud võimsus.

Tavaline PR jookseb kiirvalikuga. Sissepääsupoliitika `full-code` ja `full-code-e2e` rajad (E2E, integratsioon, paketi artefakt, Electron suitsu, Bun SQLite, ökosüsteemi ja protokolli kliendid) töötavad ainult Mergify järjekorra mustandil või täielikul käitamisel: `gh workflow run ci.yml --ref <branch>`.

Iga JSON kviitung tuvastab väljamakstud SHA, töövoo käitamise ja katse. CLI lükkab tagasi checkout/event SHA mittevastavuse. Töövoo testid seovad poliitika liikmesuse otsuse töö `needs` loendiga, nii et uus või eemaldatud rada ei saa vaikselt kaduda. Kviitungid hõlmavad nende enda töövoogu, mitte avaldamist, juurutamist ega olemasoleva nõuandeskanneri sisemisi andmeid. Mõlema kontrollinime aktiveerimine harureeglites on eraldi haldusmuudatus; nende töökohtade lisamine ei kaitse filiaali.

### Ühenda järjekord

> **2026-11-19: Mergify ühendamisjärjekord on lõpetatud** (omaniku otsus). `.mergify.yml` ei määratle enam järjekorda ja lükkab tagasi Mergify käsud, mis liidavad või kirjutavad ümber tõmbetaotluse. Tõmbetaotlused väljalaskeharule liidetakse käsitsi hoidla reeglistiku "Require green gates on the active release" (`Gate / CI` + `Gate / Quality`) alusel, kuni omni-queue töötab live-režiimis ja seejärel omni-queue kaudu ([OMNI_QUEUE.md](../ops/OMNI_QUEUE.md)). Allpool kirjeldatud Mergify mustandite töövoo käsitlemine on endiselt `ci.yml` ja `quality.yml`, kuid Mergify mustandit enam ei avata.

`queue` silt saadab PR ühendamisjärjekorda (`.mergify.yml`). Mergify avab `mergify/merge-queue/` -harus mustandi PR, CI käivitab seal täieliku valiku ja `Gate / CI`, `Gate / Quality` ja `Merge integrity (changelog + generated skills)` möödumisel liidetakse algne PR.

Mergify kirjutab oma järjekorra kokkuvõtte mustandi kirjeldusse ja ka teised rakendused saavad seda muuta. Sellise mustandi `pull_request` `edited` sündmus võtab oma samaaegsusrühma (`-queue-edit-<run_id>`), nii et see ei saa mustandi tegelikku käitamist tühistada ning jätab värava ja maatriksi vahele. Ainult `Merge integrity` töötab veel. Vahelejäetud värava töö kannab teistsugust kontrolli nime, kuna Mergify loeb vahele jäetud `Gate / CI` ebaõnnestunud kontrollina ja eemaldab PR.

Pärast järjekorras seismist ei võta tõuge alati PR uuesti järjekorda. Kommenteerige seda `@mergifyio queue`.

### Säilitatud tõendid vastuvõtu reduktoris

`scripts/quality/validate-release-acceptance.mjs` vähendab esitatud plaani ja selle manifeste; see ei kinnita, et plaan hõlmab kogu vabastamistorustikku. Selle aruannetes on selgesõnaliselt määratud `releaseAcceptance: false`, isegi kui see plaan on `VERIFIED`. `release-acceptance.yml` töövoog kasutab endiselt variseadmeid, mitte tegelikke ehitus-, pakett-, alglaadimis- või reklaamikviitungeid.

CLI nõuab, et `--evidence-root` kontrolliks säilitatud tõendeid. Failid lahendatakse kui `<evidence-root>/<artifact_id>/<member>` ja räsitakse kui SHA-256. Tõenditeta PASS -kirje, puuduv või muudetud fail, ebaturvaline tee või sümbollink takistab kinnitamist. Puuduvad failid ei ole samaväärsed tühjade edukate logidega. Olemasolevad SHA/run/attempt -tšekid jäävad sõltumatuks: sobivad baidid ei saa päästa aegunud kviitungit. Faili terviklikkus ei tõenda täitmise autentsust ega artefakti reklaamimist.

### Staatilise skannimise inventar

Versiooniga npm-aliase inventar ja staatilise skannimise liikmesus asuvad `config/quality/gate-manifest.json`. Käivitage `npm run check:gate-manifest` skriptide nimede ja täpsete käskude kinnitamiseks `package.json` vastu; täiendused, eemaldamised ja käskude triivimine nurjuvad nii kohalikus konksus kui ka muutmise-klassifikatsiooni töödes CI. Alias ei ole töövootöö, maatrikseksemplar ega testjuhtum: neid loendusi ei tohi esitada vahetatavatena.

Valitud varjunimede kontrollimiseks ilma neid käivitamata kasutage `npm run quality:scan -- --list` või `npm run quality:scan:fast -- --list`. Runner kutsub npm-i sisendpunkti, nii et selle käitusaeg (sealhulgas Bun kui see on konfigureeritud) säilib. Manifest salvestab varjunimed väljaspool neid profiile eraldi kutsutuna ja hoolduskäsud on kirjutuskaitstud kontrolliprofiilides keelatud.

Need profiilid hõlmavad ainult staatilist skannimist. Nad ei sertifitseeri tooteteste, katvust, pakendeid, väliseid kontrolle ega kandidaadi täielikku vabastamist. Töövoo sissepääs kasutab lingitud `config/quality/admission-policy.json` ja `scripts/quality/admission-verdict.mjs`. Väljalaske-vaatleja profiilid jäävad eraldi; kontrollige iseseisvalt nende kohaldatavaid tšekke ja kviitungeid. Täielikud vaatleja staatilised käsud on deklareeritud `config/quality/release-green-static-profile.json`, sealhulgas `audit:deps`, mutatsioonitesti valiku ja tõlkekontrollid. Laadija kontrollib npm käske package.json ja modelleeritud CI/Quality deklaratsioonide vastu; see lükkab tagasi triivi, selle asemel et käivitada argumentidena shellistokeneid. Nõutav skanneri SKIP/INCOMPLETE väljund ei saa PASS luua. Profiil salvestab selle välised välistused ega asenda hostitud katvust, testmaatrikse, paketti ega juurutamise tõendeid. Allolev proosaloend on viide, mitte tõend, et värav tegelikult jooksis.

Skriptid elavad `scripts/check/` (policy gates) ja `scripts/quality/` (ratchet engine) all. CI tõe allikas on `.github/workflows/ci.yml`.

### Vabastage PR kiirtee (`quality.yml`)

`.github/workflows/quality.yml` täiendab CI-d main/release-PR-ide, harusse `main` tehtavate
tõugete, dispatch'i ja merge-gruppide puhul. PR-id kasutavad teefiltritega kiireid kontrolle.
Pidevalt keelatud duplikaatne ehitus eemaldati; tegelikud ehituse, pakendamise ja käivitamise
kontrollid jäävad CI-sse. Ühiktestide komplekt ja vitest käivituvad ainult CI-s
(`Unit Tests (N/8)` ja `Vitest`).

| Töö                                              | Ulatus                                                                                                                                   | Blokeerimine            |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs ja docs-all                                                                                                 | Jah                     |
| `Fast Quality Gates`                             | Kood PRs; staatilised kontrollid, tüübikontroll, armatuurlaua tüübikontroll, mõjutatud üksuste testid, unustatud õdede testid (soovitav) |
| `No new ESLint warnings`                         | Kood PRs; summutustest teadlik ebemekaitse                                                                                               | Jah, sealhulgas kahvlid |
| `Merge integrity (changelog + generated skills)` | Süvisevaba PRs; muudatuste logi ja loodud oskuste sünkroonimine                                                                          | Jah, sealhulgas kahvlid |

#### Unustatud õdede-vendade testide aruanne

`npm run check:forgotten-sibling-tests` töötab `Fast Quality Gates` nõuandva sammuna ja taaskasutab testi-mõju kaardi taga olevat impordi lahendajat. Iga muudetud tootmismooduli puhul teatab see deterministlikest `changed module/symbol -> static consumer -> candidate sibling test` ahelatest, kui kandidaattest puudub tõmbamistaotluse erinevusest. Markdowni kokkuvõte ja JSON -tulemus säilitatakse `forgotten-sibling-tests` töövoo artefaktina kalibreerimiseks enne mis tahes blokeerivat levitamist.

Tünnireeksport ja dünaamiline import on ainult eraldusvõime diagnostika; nad ei loo kunagi blokeerivat leidu. Arvustatud erandid elavad kohas `config/quality/forgotten-sibling-allowlist.json`. Iga kirje peab nimetama tarbija ja kandidaadi testi, esitama konkreetse põhjenduse ja linkima GitHub probleemi või tõmbetaotluse. Vigaste kirjete sulgemine nurjub. Erandid ei saa maha suruda kustutatud kandidaadi testi ega diferentsi, mis lisab `.skip`/`.todo`; kinnituse nõrgenemine ja muu maskeerimine jäävad iseseisvalt blokeeriva `check:test-masking` värava omaks.

### Töökoht: `lint`

Töötab iga PR kuni `main` puhul. Plokid liidetakse ebaõnnestumise korral.

| Skript (`npm run ...`)            | Kinnitab                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Blokeerimine                             |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`              | Node.js-i versioon jääb toetatud vahemikku                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Jah                                      |
| `check:cycles`                    | Ringimpordid kogu `src/` + `open-sse/` ulatuses (AST-põhine, tsconfigi `paths` lahendatud). Põhivariant lõpetab alati koodiga 1, kui leidub mõni tsükkel (alates versioonist #15281 kasutatakse tõrke korral sulgemist), ja loetleb tugevalt seotud komponendid (SCC-d). `check:cycles:ratchet` (mida CI käivitab) blokeerib, kui tsüklite arv ületab failis `quality-baseline.json` oleva `metrics.cycles` ülempiiri — praegu 14, `direction: down`, seega saab see ainult väheneda (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Jah (ratchet)                            |
| `check:boundary`                  | `open-sse → src` sõltuvus: mootori ainulaadsed failist faili impordid rakendusse (`scripts/quality/measure-boundary.mjs`; servade loend on v4 tuuma/moodulite eraldamise parandusmeetmete nimekiri). Põhivariant annab soovitusliku aruande (sama mis `quality:boundary`). `check:boundary:ratchet` (mida CI käivitab ja mis on samuti `quality.yml` kiirete kontrollide ratchet-tsüklis) blokeerib, kui arv ületab failis `quality-baseline.json` oleva `metrics.boundaryOpenSseToSrc` ülempiiri — algväärtuseks mõõdetud 771, `direction: down`; `--update` saab seda ainult vähendada; PR-ide puhul võrreldakse baasharu suhtes (`--base-ref`, vt allpool)                                                                                                                                                                                                                                                                                              | Jah (ratchet)                            |
| `check:route-validation:t06`      | Zodi skeemid on olemas kõigil marsruutidel (6. taseme poliitika)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Jah                                      |
| `check:any-budget:t11`            | `@ts-expect-error // any` count does not exceed budget (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Jah                                      |
| `check:provider-consistency`      | Igal `providers.ts`-is oleval provideril on vastav kirje failis `providerRegistry.ts` (ja vastupidi, lubatud loendi piires)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Jah                                      |
| `check:model-lifecycle`           | Kolm käsitsi hallatavat marsruutimistabelit on registreeritud elutsükli hetktõmmisega (#11503) kooskõlas: `FITNESS_TABLE` (`taskFitness.ts`) ei anna hinnet ühelegi aegunud id-le, mida `REGISTRY` saab marsruutida; iga `BUILT_IN_ALIASES` sihtmärk on `REGISTRY`-s olemas ja aegunud id-de hetktõmmises puudub; iga `REGISTRY`-s endiselt olev aegunud id suunatakse edasi või on loetletud jaotises `allowedRetiredInCatalog`; ning ükski `DEFAULT_DEGRADATION_MAP`-i lähte- ega sihtmärk ei esine selles hetktõmmises aegununa. See ei tõesta, et mudelit teenindab praegu aktiivne ülesvoolu teenus. Võrguta — võrdleb faili `config/quality/model-lifecycle.json`, mida värskendatakse käsitsi käsuga `npm run quality:refresh-model-lifecycle` (võrk; CI-ga seotud ei ole). `allowedRetiredInCatalog` on vähendamise järkjärgulise lõpetamise loendur: lisa kirje ainult jälgimisülesande olemasolul.                                               | Jah                                      |
| `check:fetch-targets`             | Iga kliendipoolses `src/`-is leiduv `fetch("/api/...")` lahendub tegelikuks failiks `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jah                                      |
| `check:deps`                      | Kõik `npm install`-iga installitavad sõltuvused kõigis repositooriumi `package.json`-failides on loetletud failis `dependency-allowlist.json`; uued versioonita või slopsquatted paketid märgistatakse                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jah                                      |
| `audit:deps`                      | Kõigi viie sõltumatu lockfile'i (juur, Electron, OpenCode'i pluginad v1/v2 ja provider) npm audit. Kriitilised nõuanded blokeerivad; kõrge taseme nõuanded jäävad nähtavateks hoiatusteks. Puuduvad või ebaõnnestunud auditid on olekus INCOMPLETE ja blokeerivad; ulatusepõhised lock-hash'id ja aruanded säilitatakse.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Jah                                      |
| `check:lockfile`                  | `package-lock.json` terviklikkus — https-registri kasutamine, terviklus-räsid, hosti ülekirjutusi pole                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jah                                      |
| `check:licenses`                  | SPDX-litsentside lubatud loend tootmissõltuvuste jaoks                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jah                                      |
| `check:tracked-artifacts`         | Ehituse artefakte ega versioneeritud `node_modules`-i sümbolviiteid pole (käivitatakse ka husky pre-commit-käigus; pre-push on tahtlikult minimaalne — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Jah                                      |
| `check:ai-attribution`            | PR-i commit'ides, pealkirjas ega sisus pole tehisintellekti/roboti `Co-Authored-By`-päist ega tehisintellekti loodud sisu jalust — range reegel #16 (PR→`release/**` jaoks `quality.yml`-i kiirete väravate tsüklis — loeb sündmuse andmeid, PR-idest väljaspool ei tee midagi — ning PR-ile piiratud sammuna `ci.yml`-i lint-kontrollis PR→`main`; samuti husky `commit-msg`-haak; inimkaasautorid on lubatud; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:vitest-exclusions`         | Iga Vitesti välistus nimetab jälgimisülesannet ja esineb failis `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Jah                                      |
| `check:file-size`                 | Lähtefailid (`.ts`/`.tsx` kataloogides `src/`, `open-sse/`, `electron/`, `bin/`) jäävad `cap`-i piiresse ja testifailid (`*.test.ts(x)`) `testCap`-i piiresse; failid, mis on failis `file-size-baseline.json` külmutatud (`frozen` / `testFrozen`), ei tohi ületada neile salvestatud suurust                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jah                                      |
| `check:error-helper`              | Täiturite/käsitlejate veavastused kasutavad funktsioone `buildErrorBody()` / `sanitizeErrorMessage()` (range reegel #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Jah                                      |
| `check:migration-numbering`       | Migratsioonifailide nimed: vana `001`–`241` seeria on külmutatud ja uued failid on `YYYYMMDDHHMMSS_<description>.sql`. PR baasi vastu lükkab see tagasi eemaldatud migratsiooni, ümbernimetatud ilma ühilduvuskirjeta ja korrast ära või redigeeritud migratsiooni, mille lõplik skeem ei liigu edasi.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:public-creds`              | Väljaspool faili `publicCreds.ts` ei ole OAuthi `client_id`/`client_secret` literaale ega Firebase'i veebivõtmeid (range reegel #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jah                                      |
| `check:db-rules`                  | Väljaspool kataloogi `src/lib/db/` asuvaid mooduleid ei ole SQL-i otsepäringuid; failist `localDb.ts` ei tehta koondimporte (ranged reeglid #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Jah                                      |
| `check:known-symbols`             | Teenusepakkujate täiturid, marsruutimisstrateegiad ja tõlkijad, mis on registreeritud nende suunamistabelites, vastavad kettal olevatele failidele — orvuks jäänud ega deklareerimata sümboleid pole                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jah                                      |
| `check:route-guard-membership`    | Iga marsruut, mis käivitab alamprotsessi, on funktsiooniga `isLocalOnlyPath()` klassifitseeritud (ranged reeglid #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Jah                                      |
| `check:test-discovery`            | Kõik hoidlas olevad `*.test.ts` / `*.spec.ts` failid kogutakse vähemalt ühe testikäituri poolt (järelkorrigeerimine: `test-discovery-baseline.json`-is olev orbude loend saab ainult kahaneda)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jah                                      |
| `check:test-tla-order`            | Ükski `tests/unit` all olev `node:test`-fail ei registreeri testi, jõua tipptaseme `await`-ini ega registreeri seejärel rohkem teste (#18045; järelkorrigeerimine: `test-tla-order-allowlist.json` saab ainult kahaneda)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Jah                                      |
| `check:agent-skills-sync`         | Loodud agendioskuste artefaktid vastavad nende lähtekataloogile (ei triivi). Vabastusrežiim kontrollib iga oskust; funktsioon PR (`pr` režiim) kontrollib ainult neid oskusi mille loodud teksti ta redigeerib — vt [Loodud failid ja tuletatud lähtejooned](#generated-files-and-derived-baselines-written-at-release)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | Teenusepakkujate logodel/varadel on registreeritud päritolu kirje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lint:json`                       | JSON-i konfiguratsioonifailid parsitakse ja need vastavad hoidla lintimisreeglitele                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `typecheck:core`                  | TypeScripti kompileerimine vigadeta (ainult soovituslikud hoiatused)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jah                                      |
| `typecheck:noimplicit:core`       | Range `noImplicitAny` — tulevikku vaatav; paljud olemasolevad kutsungikohad vajavad endiselt annotatsioone                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **Nõuandev** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, mille ulatus on `src/app/(dashboard)/**` (#7033) — `typecheck:core`-i kureeritud 27-faililine lubatud loend ei hõlma ühtegi dashboardi TSX-faili ning `next build` ei kontrolli samuti selle tüüpe (`next.config.mjs` määrab `ignoreBuildErrors: true`), mistõttu jäid seal esinenud orvuks jäänud identifikaatorite regressioonid (#6625/#6909) CI-le nähtamatuks. Võrdleb tulemusi külmutatud failipõhise/TS-koodipõhise arvu baasväärtusega (`config/quality/dashboard-typecheck-baseline.json`, sama aegunud jõustamise muster nagu `check:known-symbols`) — värava läbimine ebaõnnestub ainult juhul, kui ilmneb baasväärtusest rohkem UUSI vigu; olemasoleva vea parandamisel vähenda arvu käsuga `--update`.                                                                                                                                                                                                                                 | Jah                                      |
| `check:build-typecheck`           | Terve rakenduse tootmistüübi kontroll `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), pinna `typecheck:core` 27-faililist lubade loendit ja armatuurlaua väravat ei kata. Erinevused `config/quality/build-typecheck-baseline.json` vastu; uus või tõstetud per-(fail, kood) loendus ebaõnnestub, väiksem arv palub teil põrkama. `--update` keeldub, kui käivitamine sisaldab uut või tõstetud paari, välja arvatud juhul, kui `--force-regressions` on läbitud, ja keeldub äsja vaigistatud failist, välja arvatud juhul, kui `--force-nocheck` on läbitud, seega on baasjoone laiendamine roheliseks saamiseks ja püsiva vaikuse andmine kaks eraldi tahtlikku tegevust. Paljas `--force` lükatakse tagasi. Samuti skannib `@ts-nocheck` ehitamise ulatust `config/quality/ts-nocheck-baseline.json` vastu, kuna seda kasutav fail ei teata üldse diagnostikast ja oleks muidu igale väravale nähtamatu. | Jah                                      |

#### Kaks tüübikontrolli programmi vastavad erinevalt

`typecheck:core` ja `check:build-typecheck` kompileerivad erinevate valikute all erinevaid programme ja sama fail võib ühes olla puhas ja teises vigu täis.

`tsconfig.build.json` määrab `"strict": false`, seega on `noImplicitAny` välja lülitatud. Põhikonfiguratsioon koostab kureeritud 27 failist koosneva rangemate suvanditega lubatud loendi ja järgib iga kirje impordigraafikut, nii et failid, mida ehitusprogrammis kunagi ei kuvata, kontrollitakse seal endiselt.

Tagajärg on oluline, kui otsustatakse, kas fail on trükitud:** nulldiagnostika `check:build-typecheck` all ei tähenda nulli** . 26 failist `@ts-nocheck` eemaldamine näitas, et 23 failist olid ehitusprogrammis puhtad; kuueteistkümnel neist ilmnes umbes 120 kaudset viga – ranges veas. Enne faili puhtaks kutsumist kontrollige mõlemat.

### Töökoht: `quality-gate`

Jookseb `test-coverage` järel. Plokid liidetakse ebaõnnestumise korral.

| Skript                       | Kinnitab                                                                                                                                                                                 | Blokeerimine                     |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `quality:collect`            | Väljastab `quality-metrics.json` (ESLint hoiatuste arv, katvus ühendatud killuaruandest)                                                                                                 | Jah (põrkmehhanismist ülesvoolu) |
| `quality:ratchet`            | Ükski `quality-baseline.json` mõõdik ei ole taandunud (ESLint hoiatused ≤ baasjoon; katvus ≥ baasjoon)                                                                                   | Jah                              |
| `check:duplication`          | Koodi dubleerimine (jscpd@4) ei ületa `quality-baseline.json` algväärtust                                                                                                                | Jah                              |
| `check:complexity`           | Failitaseme tsüklomaatiline keerukus ei ületa piirmäära (core ESLint `complexity` + `max-lines-per-function`)                                                                            | Jah                              |
| `check:cognitive-complexity` | Kognitiivse keerukuse põrk (`eslint-plugin-sonarjs`) — eraldi ESLint pass; CI töötab mõlemad liidetuna ühe `check:complexity-ratchets` sammuna                                           | Jah                              |
| `check:dead-code`            | Kasutamata ekspordid / failid põrkega (knip) ei taandu algtasemega võrreldes                                                                                                             | Jah                              |
| `check:compression-budget`   | Kompressiooni etaloneelarve — mootori kohta märgisäästu alammäärad ei tohi taanduda                                                                                                      | Jah                              |
| `check:type-coverage`        | Protsenditüüpi põrkmehhanism (`type-coverage`) ei taandu; hõlmab suures osas `typecheck:noimplicit:core`                                                                                 | Jah                              |
| `check:codeql-ratchet`       | Avatud CodeQL hoiatuste arv ei taandu (loeb `gh api` kaudu; graatsiline vahelejätmine ilma märgita) — värskendamise kadents ja käsitsi päästik: vaadake allpool jaotist "CodeQL ratchet" | Jah                              |
| `check:type-scale-ratchet`   | Komplekti tüübi skaala: suurused alla 12 px ja `font-bold` - `src/` vähenevad ainult (`typeScaleSubFloorSizes`, `typeScaleFontBold`); ka eelkohustuse konksus                            | Jah                              |

### Töökoht: `quality-extended`

Segatöö, mille tasemel puudub `continue-on-error`: samm, mis edastab `--ratchet`, nurjab töö, kui mõõdetud tulemus on võrreldes failiga `quality-baseline.json` halvenenud. Ainult `check:circular-deps` ja skannerite installimise samm on soovituslikud (sammu tasemel `continue-on-error: true`). Välised skannerid installitakse `gh release download` kaudu; `check:secrets` jätab kontrolli ise vahele (exit 0), kui gitleaks puudub, samas kui `check:vuln-ratchet`, `check:workflows` ja `check:openapi-breaking` nurjuvad suletult, kui nende mõõtmine puudub.

| Skript                   | Kinnitab                                                                                                                                                                                                        | Blokeerimine                                             |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `check:circular-deps`    | Ringikujulisi sõltuvusi pole (dpdm)                                                                                                                                                                             | **Nõuandev**                                             |
| `check:bundle-size`      | Kimbu suurus ei ületa korki; ka mõõtmatu suurus ebaõnnestub                                                                                                                                                     | **Blokeerimine --ratchet**                               |
| `check:secrets`          | Salajane skannimine (gitleaks) — jätab kahendkoodi puudumisel vahele                                                                                                                                            | **Blokeerimine --ratchet**                               |
| `check:vuln-ratchet`     | Sõltuvuste haavatavused (osv-skanner) ei taandu — `--ratchet` ebaõnnestub kui INCOMPLETE (exit 2), kui neid ei mõõdeta                                                                                          | **Blokeerimine --ratchet**                               |
| `check:workflows`        | Töövoo lint (actionlint + zizmor); missing/broken -skannerid, kehtetud aruanded või puuduv põrkmehhanismi baasjoon ebaõnnestuvad INCOMPLETE. Kehtivad leiud järgivad valitud strict/advisory/ratchet poliitikat | Vajalik täitmine; zizmori põrkmehhanismi blokeerimine CI |
| `check:openapi-breaking` | Avalik API leping kinnitatud sündmuste vastuvõtmise vastu (PR merge-base, push before, merge-group base; scheduled/manual checkout esimene ülem); nõutav mõõtmine ebaõnnestub                                   | **Blokeerimine --ratchet**                               |

### Töökoht: `docs-sync-strict`

Töötab iga PR kuni `main` puhul. Plokid liidetakse ebaõnnestumise korral.

| Skript                         | Kinnitab                                                                                                                                                 | Blokeerimine               |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | Metavärav, mis juhib järjestikku kuut allolevat alamväravat                                                                                              | Jah                        |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI versiooni järjepidevus; vabastamisrežiim ka 66 `llm.txt` peeglit ja tõlgitud CHANGELOG sektsioone (PR režiim: peeglid nõus)          | Jah                        |
| ↳ `check:docs-counts`          | Loendab proosas (pakkujate arv, rände arv jne). Kaks režiimi: `pr` funktsioonil PRs, `release` mujal — allpool jaotist "Tuletatud väärtused"             | Jah                        |
| ↳ `check:env-doc-sync`         | Iga env var `.env.example` on dokumenteeritud dokumentide tabelis ja vastupidi                                                                           | Jah                        |
| ↳ `check:deprecated-versions`  | Dokumendis puuduvad aegunud versioonistringid                                                                                                            | Jah                        |
| ↳ `check:doc-links`            | Sisemised allahindluslingid dokumentides lahendavad tegelikud failid (vorm `[text]`/`(path)` )                                                           | Jah                        |
| ↳ `check:fabricated-docs`      | Dokumendis viidatud marsruudid, env vars, CLI käsud, konksu nimed ja failiteed on koodibaasis olemas. Kõvavärav `--strict` kaudu; soft-fail ilma liputa. | Jah ( `--strict` kaudu CI) |
| `check:cli-i18n`               | CLI `t()` klahvid on `bin/cli/locales/en.json` olemas (mõlemad režiimid); pt-BR / zh-CN / zh-TW paarsus `en.json` -ga ainult vabastusrežiimis            | Jah                        |
| `check:openapi-coverage`       | OpenAPI spetsifikatsioon hõlmab vähemalt põrkunud põrandat tõelistest marsruutidest                                                                      | Jah                        |
| `check:openapi-security-tiers` | `openapi.yaml` turvataseme annotatsioonid on kooskõlas `routeGuard.ts` klassifikatsioonidega                                                             | **Nõuandev**               |
| `check:openapi-routes`         | Iga `openapi.yaml` tee lahendab tõelise `route.ts` (antihallutsinatsiooni)                                                                               | Jah                        |
| `check:docs-symbols`           | Iga `/api/...` viide `docs/**/*.md` s lahendab tõelise `route.ts` (antihallutsinatsiooni)                                                                | Jah                        |
| `i18n translation drift`       | `docs/i18n/**` peeglid vs `.i18n-state.json` — nõuanded PRs kohta (peeglid värskendavad tõlkelaine), ranged lükkamisel ja igaõhtused                     | **Nõuandev** PRs           |

#### Tõlkepeeglid on tuletatud failid (PR režiim vs vabastusrežiim)

Funktsioon PR redigeerib ainult ingliskeelseid allikaid. `docs/i18n/<locale>/**` -peeglid (sealhulgas 66 `llm.txt` koopiat ja tõlgitud `CHANGELOG.md` failid) ja `.i18n-state.json` kirjutatakse ühes etapis ümber tõlkelaine (`docs/i18n-*` / `chore/i18n-*` harud, ajastatud `i18n-mirror-refresh.yml`) ja väljalaske (`npm run release:sync-changelog-i18n`) abil. Seetõttu töötavad peegelväravad kahes režiimis, mille lahendab `scripts/check/lib/gateMode.mjs` (`--mode=pr|release`, seejärel `OMNIROUTE_GATE_MODE`, seejärel sündmus Actions ; kohalik käitamine on `release`):

- `check:docs-sync` — vabastusrežiim käivitab iga kontrolli. PR režiim säilitab package.json/OpenAPI versiooni, juur CHANGELOG pealkirjad ja asendatud dokumentide kaitse ning prindib `SKIP reason=pr-mode` `llm.txt` peegelkoopiate ja tõlgitud CHANGELOG osade jaoks — kui PR ei kirjuta peegleid: peaharu, mis on deklareeritud `docs/i18n/**` perekonna kirjutajana, `config/quality/derived-paths/*.json` range muutmine, difff muudab nii check-i kui ka difff-i. kelle enda diff redigeerib `docs/i18n/<locale>/llm.txt` või `CHANGELOG.md` mis kontrollib rangelt. Diff-baas ei lahene depth-1 kontrollis ( `docs-sync-strict` töö), seega käivitab PR režiim ka ühe kontrolli, mis ei vaja alust: iga `llm.txt` peegel peab olemas olema, säilitama oma `---` eraldaja ja kandma kas juurkeha või keha, mida enamik peegleid jagavad. Liigutatud alus jätab kõik peeglid võrdselt vanaks ja läheb läbi; ühe peegli käsitsi redigeerimine ebaõnnestub. Tõlgitud `CHANGELOG.md` failidel pole depth-1 PR kassas sellist kontrolli.
- Pühendumise-eelne konks jookseb `check-docs-sync.mjs --mode=pr`: kohustust hinnatakse selle järgi, mida see teeb. Ilma liputa on kohalik käitamine vabastamisrežiim ja üks ühendatud PR, mis redigeerib juur- `llm.txt` blokeeriks kõik hilisemad toimingud sellel alusel, kuni laine jookseb. Sama reegel kehtib kõigi režiimiteadlike väravate puhul, mida Husky konks jookseb: konks läbib `--mode=pr` ja range otsus jääb vabastusrežiimi käituste juurde (vabastus PR, lükkab `main`, tavaline kohalik jooks).
- Peegelsisu ühiku testid (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`, `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`, `docs/*-locales`) — väljalaskerežiim kinnitab iga lokaadi. PR režiim kinnitab ainult need peeglid, mis kehtivad ingliskeelse allikaga vastavalt `.i18n-state.json` (kogu faili räsi või jaotise salvestatud sektsiooni räsi testviigud) ja jätab aegunud peeglid põhjusega vahele. `target_hash` päritolukontrollid käitatakse mõlemas režiimis iga lokaadi jaoks. Värskus on `## ` sektsiooni kohta, ühik `run-translation.mjs` räsib; pikk osa (selle faili väravavaru moodustab sellest umbes poole) tähendab, et mis tahes muudatus selles jätab need peeglid vanaks ja nende PR-režiimi väited jäävad järgmise laineni vahele. Ankur, mida ingliskeelne allikas enam ei sisalda, langeb tagasi kogu faili võrdluse juurde.
- `i18n translation drift` — soovitus PRs kohta, range lükkamisel, öisel ja vabastuslõikel, nii et aegunud peeglit ei saa vabastada.

`scripts/i18n/sync-llm-mirrors.mjs` (eksporditakse ka kui `syncLlmMirrors()`, koos lipuga `--dry-run`)
kirjutab `llm.txt`-i peegeldused ümber; väljalaske värskendus, tõlkelaine ja ajastatud
`i18n-mirror-refresh.yml` käivitavad selle (värskendus tuvastab aegunud `llm.txt`-i peegeldused
kuivkäivitusega, kuna triiviaruanne neid ei loetle, ning sünkroonib need enne `check:docs-all`-i).

Kaksteist README SVG-d kataloogis `docs/diagrams/` on genereeritud
(`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` genereerib need kõik uuesti).
Igal neist on baitide võrdluse ühiktest
(`tests/unit/docs/readme-*-svg.test.ts`, töö `test-unit`), mis ebaõnnestub, kui commiti'tud fail on
väljalaskerežiimis aegunud; PR-is hindab `check:generated-artifacts` SVG-d, mida PR muudab, ning aluse
triiv jäetakse väljalaske värskenduse hooleks (vt [Genereeritud failid ja tuletatud baasjooned, mis kirjutatakse väljalaskel](#generated-files-and-derived-baselines-written-at-release)) — ja `check:docs-counts` loeb kanoonilised numbrid nende `<text>`-sõlmedest — mistõttu
kontuurimise samm hoiab iga kontuuritud stringi failis nähtamatu `<text>`-ina. SVG kanooniliste numbrite
kontroll loeb failidest, mis on loetletud muutujas
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, samuti `public/images/tier-flow-dark.svg` ja `tier-flow-light.svg`;
väited free-forever, catalog-entry, recurring-pool ja scoring-factors loevad samuti faile
`promise-pillars.svg`, `free-tier-budget.svg` ja `strategies-grid.svg`. Arvud, mida need
genereerijad joonistavad (pakkujate koguarv, MCP tööriistad, marsruutimisstrateegiad, tasuta-püsivalt
pakkujad, …), pärinevad faktide hetktõmmisest `docs/reference/derived-facts.json` skripti
`scripts/docs/readmeFacts.mjs` kaudu, mitte literaalidest, seega taastoodab diagrammi mis tahes harus
uuesti genereerimine commiti'tud faili. `free-tier-budget.svg` joonistab oma read samast hetktõmmisest
(`code.freeTierBudget`, faktide sondi salvestatud kataloogi kokkuvõte), seega jõuab muudatus
`FREE_MODEL_BUDGETS`-is kaardile järgmisel värskendusel, selle asemel et CI punaseks muuta.

### Tuletatud väärtused: `pr` ja `release` väravarežiimid

Funktsioon PR ei kirjuta kunagi väärtust, mis sõltub selle baasi olekust: pakkuja, migratsioon, MCP-tööriist ja strateegia loendused, README SVG numbrid, faktide hetktõmmis. Üks samm arvutab need kõik ümber, `npm run release:refresh-derived`, mida käitavad väljalase ja igaöine tuletatud-värskenda PR. Niisiis** väljaannete vahel on baas disainilt reaalajas koodi taga** ja värav või test, mis võrdles puud reaalajas koodiga, oleks punane igal PR pärast seda, kui vend on teenusepakkuja lisanud. Tuletatud väärtusi hindavad väravad töötavad seega ühes kahest režiimist, mille lahendab `scripts/check/lib/gateMode.mjs` (esimese matši võit):

1. `--mode=pr|release` ;
2. `OMNIROUTE_GATE_MODE` keskkonnamuutuja (`pr` või `release`);
3. automaatne sündmusest GitHub Actions: `pull_request` mille pea ei ole `release/v*`, a `merge_group` või tõuge `omni-queue/**` → `pr`; kõik muu (tõuge, ajakava, väljasaatmine, väljalase PR `release/v* → main`, mis tahes kohalik käitamine) → `release`.

Mis `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) ebaõnnestub igas režiimis:

| Režiim    | Ebaõnnestunud                                                                                                                                                                                                                                                                                                                                                                                                 | Vajab elavaid fakte |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `release` | Iga kontroll, range võrdsus puust kogutud faktidega (värava käitumine alati): aegunud arv, versioon, leviala või SVG number on STRICT triiv                                                                                                                                                                                                                                                                   | Jah                 |
| `pr`      | Ainult see, mida muudatus tegi, erines PR baasist samade nõudeekstraktoritega: (1) hallatav väärtus, mida selle tšeki ja faili aluses ei eksisteerinud ("PR redigeeris hallatud numbrit — taastab rea põhitekstile"); (2) nõutav nõue, mille alus kandis ja pea kaotas. Sisu invariandid, mis ei vaja fakte, töötavad nagu väljalaskerežiimis; ainult vabastatavad kontrollid on loetletud ja jäetakse vahele | Ei                  |

Agendi juhiste failid kannavad** ei** tuletatud arv üldse: `AGENTS.md`, `llm.txt` (ja selle `docs/i18n/*/llm.txt` koopiad), bs `AGENTS.md` kahvel, `open-sse/services/AGENTS.md`, `src/shared/constants/agentSkills.ts`, `skills/README.md` ja iga `skills/*/SKILL.md` osutab allikale (näiteks `ROUTING_STRATEGY_VALUES` in `src/shared/constants/routingStrategies.ts`) ja selle asemel `npm run facts`. Invariant "No tuletatud loendeid (agendi juhiste fail …)" ei suuda seal loendamist (pakkujad, migratsioonid, MCP tööriistad ja ulatused, marsruutimisstrateegiad, hindamistegurid, režiimipaketid) mõlemas režiimis, nii et väljalaske värskendamine ei pea kunagi käsufaili ümber kirjutama.

Režiimis `pr` võivad kirjutaja harud hallatavaid väärtusi muuta: `chore/derived-*` (öine värskenduse
PR), `release/v*` ja tõlkelained `docs/i18n-*` ning `chore/i18n-*`
(`scripts/check/lib/derivedClaimsDiff.mjs`). Järjekorra partiisid (`merge_group`, Mergify mustandid,
`omni-queue/**`) uuesti ei hinnata: need liidavad PR-id, mida värav juba ükshaaval hindas.

Väljumiskoodid: `0` kontroll läbis · `1` rangete reeglite kõrvalekalle (või pehme kõrvalekalle valikuga `--strict`) või hallatava väärtuse rikkumine · `2` taristutõrge — koodi fakte ei saanud koguda (tsx-kontroll ebaõnnestus või ületas ajalimiidi, mille määrab `OMNIROUTE_FACTS_TIMEOUT_MS`, vaikimisi 600000 ms), või CI-s ei õnnestunud PR-i võrdlusbaasi tuvastada. Kood 2 ei tähenda dokumentatsiooni kõrvalekallet. Käivita töö uuesti või paranda keskkond.

Kus iga režiim töötab:

| Kus                                                                                                                  | Režiim                                                                                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Funktsioon PR — `ci.yml` töö `docs-sync-strict`, `quality.yml` samm "Dokumendi täpsus"                               | `pr` (automaatne); töö läbib baasi `BASE_SHA` ja kontrollib välja `fetch-depth: 2` ga                                                                                                                   |
| `merge_group`, `omni-queue/**` kandidaadid, ühinemisrongi täielik väravaloend                                        | `pr`                                                                                                                                                                                                    |
| Vabastage PR (`release/v* → main`), tõuged, ajastatud ja käsitsi jooksud                                             | `release`                                                                                                                                                                                               |
| Release-roheline (`scripts/quality/validate-release-green.mjs`)                                                      | HARD üksused jooksevad koos `OMNIROUTE_GATE_MODE=pr` ("kas alus purunes?"); DRIFT üksus `derived-refresh` käivitab `npm run release:refresh-derived -- --check` (range vaade, ei ava kunagi aluspunast) |
| Vabastamine (`/generate-release` faasid 0a ja 1; oskuste juhtmestik on eraldi omaniku poolt heaks kiidetud muudatus) | `npm run release:refresh-derived` kirjutab tuletatud failid; väljalase PR kontrollib seejärel `release` -režiimis                                                                                       |
| `nightly-derived-refresh.yml` (igapäevane, kõrgeim `release/vX.Y.Z`, vabastamise-külmutamise ajal vahele jäetud)     | `npm run release:refresh-derived -- --profile=nightly`; diff-il hoiab see ONE PR `chore/derived-refresh` st lahti; ei ühine kunagi                                                                      |

Selle taga olevad käsud:

- `npm run facts` prindib iga tuletatud arvu kui JSON (`scripts/release/facts.mjs`). `--key=code.mcpTools` prindib ühe väärtuse, `--snapshot` loeb aktiivse puu asemel pühendunud hetktõmmise. Väljuge 2, kui fakte ei saa koguda.
- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) arvutab tuletatud failid ümber ühe käiguga, järgmises järjekorras ( `--only=` sammu ID-d): `provider-reference` (`docs/reference/PROVIDER_REFERENCE.md`), `facts` (hetktõmmis), `numbers` (loendusvärava ümberkirjutamise plaan rakendatakse dokumentidele, seejärel kantakse nende `docs/i18n/` peeglitesse (genereeritud), `readme-diagrams` `SKILL.md`), `skills` (jäetakse vahele, kuni puu tarnib `syncE2eTimings`), `e2e-timings` (pügab klahvid `en.json` maha ja `ui-keys` `--rewritten-since=<ref>` vaikeväärtusega — `origin/main` — ingliskeelsed väärtused uuesti järjekorda, mis on alates viimasest väljalaskest ümber kirjutatud; väärtused tõlgitakse samas töös keskkonnas konfigureeritud taustaprogrammis või `.env` `OMNIROUTE_TRANSLATION_*` on ainult lugemiseks mõeldud mootor, Google ) Ilma taustaprogrammita ei kirjuta see kunagi `__MISSING__` -markereid: väljalaskeprofiil ebaõnnestub, igaõhtune klahve jätab vahele ja `--allow-untranslated` kirjutab need meelega), `llm-mirrors` ja `verify-generated` (pärast kirjutamist peavad vabastamisrežiimis olevad `check:generated-artifacts` ja `check:agent-skills-sync` läbima; vahele jäetakse `--check` ja kui `--only` jätab selle välja; tõrge on väljumine). `changelog` samm on lubatav (`--with-changelog`, ainult vabastamisprofiil). `--profile=nightly` ei puuduta kunagi versiooninõuet. `-- --check` puhul ei kirjuta see midagi ja väljub 1-st, kui mõni fail muutub või hallatav väärtus vajab käsitsi muutmist (mõlemad); väljapääs 2 infrastruktuuri rikke korral. `--json` prindib tulemuseks JSON.
- `docs/reference/derived-facts.json` on viimase värskenduse kasutatud faktide hetktõmmis. Ainult värskendus kirjutab selle. README SVG generaatorid loevad seda ja PR-ajaühiku testid võrdlevad loodud dokumente ja sellega loodud faile ning — mitte kunagi reaalajas koodiga. Komplekti ainus reaalajas võrdlus on "väljalaske värskendamine sulgeb tsükli" keeles `tests/unit/check-docs-counts-sync.test.ts`: reaalajas faktide korral ei jäta mällu rakendatud värskenduse ümberkirjutamise plaan STRICT triivi, millest see ei teata, ja ümberplaneerimine ei muuda midagi.

Lokaalseks reprodutseerimiseks (kohalikul käivitamisel on vaikimisi `release`):

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # what a feature PR is judged on
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # what the release would rewrite
```

Ilma lahendatava aluseta (ei `BASE_SHA`/`BASE_REF`, pole kohalikku `origin/release/v<version>`) prindib kohalik `pr` -käivitus hoiatuse ja jätab ebaõnnestumise asemel erinevuse vahele.

### Töökoht: `i18n-ui-coverage`

| Skript                            | Kinnitab                                                                                                                                                                                 | Blokeerimine                  |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `check-ui-keys-coverage` (inline) | UI i18n võtme katvus on ≥ 65%                                                                                                                                                            | Jah (mõlemad režiimid)        |
| `check:ui-icu`                    | Iga UI kataloogi iga sõnum on koostatud `IntlMessageFormat` ga                                                                                                                           | Jah (mõlemad režiimid)        |
| `check-ui-value-drift` (inline)   | Ümberkirjutatud inglise keel** väärtus** ei jäta maha jäänud tõlget                                                                                                                      | Jah (ainult vabastamisrežiim) |
| `check-new-key-coverage` (inline) | A** uus** Ingliskeelne võti tõlgitakse igas lokaadis — `__MISSING__:` -marker lükatakse tagasi                                                                                           | Jah (ainult vabastamisrežiim) |
| `check-key-completeness` (inline) | Iga UI kataloog (ja `--catalog=cli` puhul iga CLI kataloog) sisaldab täpselt oma `en.json` võtmekomplekti; `pr` režiimis muutus iga kataloog PR enda suhtes liitmisbaasis                | Jah (mõlemad režiimid)        |
| `check-translation-ratio`         | Päris tõlke suhe lokaadi kohta (identne inglise keelega / kohatäide / puuduvad lehed väljaspool lubatud loendit) ei tohi ületada `config/quality/i18n-translation-baseline.json` + slack | Jah (ainult vabastamisrežiim) |

Vajab `fetch-depth: 0` — väärtuse triivi värav diffs `en.json` võrreldes liitmisbaasi.

**Kaks režiimi (alates 2026-11-13).** Funktsiooni-PR lisab või kirjutab võtmeid failis
`en.json` (ja failis `bin/cli/locales/en.json`) ümber ega puuduta ühtki muud lokaati;
`check:pr-derived-paths` (töö `pr-test-policy`, perekond `config/quality/derived-paths/translation.json`)
ebaõnnestub funktsiooni-PR-il, mis seda teeb. Teised lokaadid viiakse lõpule kord väljalaske kohta
`release:refresh-derived` abil, mis kutsub välja `syncUiKeys()` failis
`scripts/i18n/sync-ui-keys.mjs` (lisab puuduvad võtmed, eemaldab kõrvale jäetud võtmed, märgib
ümber kirjutatud ingliskeelsete tekstide tõlked väljaga `rewrittenSinceRef`, tõlgib), või
tõlkelainena.
Väravad loevad režiimi failist `scripts/check/lib/gateMode.mjs`: `pr`-režiimis (funktsiooni-PR-id,
`merge_group`, `omni-queue/**`) prindivad ülaltoodud väljalaskerežiimi väravad `SKIP reason=pr-mode`
ja lõpetavad koodiga 0; `release`-režiimis (väljalaske-PR, tõuked harusse `main`,
`workflow_dispatch`, kohalikud käivitused) on need rangemad nagu varem ning väljalaske-PR-il
saavad erinevusteadlikud kontrollid väärtuse `BASE_REF=origin/main`, mistõttu hindavad nad
iga tsükli lisatud või ümber kirjutatud võtit. Funktsiooni-PR-i otsust saab kohapeal eelvaadata
suvandiga `--mode=pr`.

PR-i, mis muudab `pr`-režiimis endiselt lokaatkatalooge (tõlkelaines, väljalaske värskenduse ajal või ainult tõlget puudutava paranduse korral), ei jäeta vahele: `check-key-completeness` võrdleb iga muudetud kataloogi sama kataloogiga merge base'is (`scripts/i18n/lib/touched-catalogs.mjs`) ja ebaõnnestub, kui kataloogist on kadunud võti, mida `en.json` ei sisalda, tegelik tõlge on muutunud markeriks `__MISSING__:` või ingliskeelseks tekstiks või kui väärtus ei interpoleeri enam ingliskeelses stringis olevaid kohatäiteid/silte, mida PR ei muutnud. PR-is uus kataloog peab sisaldama kogu `en.json`-i võtmekogumit. See katab PR-i puudutatud kataloogide puhul selle, mida suhte- ja CLI-pariteedi kontrollid näeksid.

Lokaadipariteedi ühikutestid (`cli-i18n-catalog`, `i18n-pt-br`, `i18n-vi-completeness`, `i18n-placeholder-parity`) järgivad samu režiime läbi `tests/_helpers/localeParityMode.ts`: `pr` -režiimis jätavad nad võtmepaarsuse väited vahele ja jätavad vabastamiseni nende võtmete kohatäitepaarsuse värskendamise, mille inglise keel on pärast liitmisbaasi muutunud (iga võti, kui üksuse testimistöö ei saa lugeda). See abimees on** ainult** sanktsioneeritud režiimi tingimuslik vahelejätmine: `check:test-masking` loeb `.skip(` ja `{ skip: true }`, kuid mitte arvutatud `{ skip: "<reason>" }` mille see tagastab, nii et `tests/unit/locale-parity-mode.test.ts` kinnitab testide loendi, millel on lubatud seda kasutada. — ühe lisamine on selle loendi läbivaadatud muudatus.

#### `check-ui-value-drift` — aegunud tõlkevärav

Saab kinni ühe i18n regressiooni, mida teised väravad struktuurselt ei näe: ingliskeelne väärtus kirjutatakse ümber ja _eelmisest_ inglise keelest tuletatud tõlked jäävad maha, nii et mitteingliskeelsed kasutajad loevad enesekindlalt sõnastatud, nüüd vale koopiat.

See saadeti päriselt. `oauthModal.googleOAuthWarning` kirjutati ümber, kui Antigravity sisselogimisabi maandus (#5203);** 39 43-st lokaadist** hoidis tekst, mis käskis operaatoritel "kopeerida täielik URL ja kleepida see alla" — voogu, mida selle pakkuja jaoks ei saa lõpule viia. Kuni #8463 jäi see märkamatuks, sest:

- `sync-ui-keys` täidab ainult need võtmed, mis on** puudub** , mitte kunagi selliseid, mis on** vananenud** ;
- `check-ui-keys-coverage` loeb klahvi _presence_, nii et aegunud tõlge loetakse hõlmatuks;
- `check-translation-drift` jälgib `docs/i18n/<locale>/**.md` dokumentatsiooni, peegeldab — ei loe kunagi `src/i18n/messages/*.json`. See töötab töös `docs-sync-strict`: nõuandev PRs, range lükkamisel ja igaõhtune; tõlkelaine värskendab peegleid, mitte funktsiooni PR.

**Diff-teadlik, mitte lähtetasemega tagatud.** See võrdleb `en.json` liitmisaluses tööpuuga; iga võtme puhul, mille ingliskeelne väärtus on muutunud, on iga lokaat, millel on veel puutumata tõlge, vananenud. Seda meelega** külmutab olemasoleva võla** — a diff ei saa paljastada, millisest vanast inglise keelest ammune tõlge pärineb, seega hindab värav ainult seda, mida praegune muudatus puudutab. Alternatiiv (võtmepõhine räsi baasjoon) maksaks ~ 600 KB genereeritud faili, mis on 3 × suurim olemasolev baasjoon, mis kahandab iga i18n PR.

Selle rahuldamiseks on kaks võimalust:

1. värskendage mõjutatud tõlkeid või
2. määrake need väärtusele `__MISSING__:<new english>` — käitusaeg, seejärel teenindab parandatud inglise keelt (`src/i18n/request.ts::deepMergeFallback`, #7258) ja tõlke võtmejärjekordi.

Kui string on** tähenduses** muutunud, eelistada** võtme ümbernimetamine** : uus võti ei saa pärida aegunud tõlget. See on #8463 muster.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Väljub 0-st koos `SKIP reason=base-unresolved`, kui põhikataloogi ei saa lugeda (madal kloon ilma põhiviiteta), peegeldades `check-openapi-breaking`. Ainult väljalaskerežiim: funktsioon PR kirjutab inglise keele ümber ja peatub seal; väljaande värskendamine tähistab tõlkeid, mille see maha jättis (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`, sama `findStaleTranslations`).

### Töökoht: `i18n`

Täielik i18n valideerimismaatriks (üks töö lokaadi kohta). Kogu töö on nõuandev.

| Skript                          | Kinnitab                       | Blokeerimine                                            |
| ------------------------------- | ------------------------------ | ------------------------------------------------------- |
| `validate_translation.py quick` | Tõlke täielikkus lokaadi järgi | **Nõuandev** (`continue-on-error: true` kogu töö kohta) |

### Töökoht: `pr-test-policy`

Töötab ainult tõmbamistaotluste korral.

| Skript                 | Kinnitab                                                                                                                           | Blokeerimine |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check:pr-test-policy` | PRs, mis muudavad tootmiskoodi `src/`, `open-sse/`, `electron/` või `bin/` peavad sisaldama või värskendama teste (kõva reegel #8) | Jah          |
| `check:test-masking`   | Muudetud testfailid ei vähenda väidete arvu ega lisa `assert.ok(true)` tautoloogiaid                                               | Jah          |
| `check:pr-evidence`    | PR keha tsiteerib test/VPS tõendeid muutuse kohta (mehhaniseerib Hard Rule #18 grepping PR prose — fragile, vt Backlog)            | Jah          |

### Töökoht: `test-vitest`

Jookseb `build` järel. Plokid liidetakse ebaõnnestumise korral.

| Sviit            | Kinnitab                                                        | Blokeerimine                                                                                                                  |
| ---------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 tööriista), autoCombo, vahemälu — vitest runner | Jah                                                                                                                           |
| `test:vitest:ui` | UI komponent testib — vitest jooksjat                           | **Blokeerimine** — olemasolevad tõrked on `vitest.config.ts` s selgesõnaliselt välistatud; uued ebaõnnestumised ebaõnnestuvad |

### Igaõhtused töövood (plaanitud, nõuandev)

Need töötavad cron-graafiku (ja `workflow_dispatch`) alusel, mitte kunagi PRs. Kõik on soovituslikud.

| Töövoog                | Kinnitab                                                                                                                                                                     | Blokeerimine |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | kiire kontrolli omaduste testid juhusliku seemne + suure käivituste arvuga                                                                                                   | **Nõuandev** |
| `nightly-resilience`   | kuhjakasvu värav, kaose rikkesüst, k6 load/soak                                                                                                                              | **Nõuandev** |
| `nightly-llm-security` | promptfoo süstimiskaitse (blokeerimisrežiim) + garaki sondid (vahele jäetud ilma teenusepakkuja saladuseta)                                                                  | **Nõuandev** |
| `nightly-schemathesis` | OpenAPI lepingu hägustamine (skematees) aktiivse OmniRoute vastu, kasutades `docs/openapi.yaml` — pindade spetsifikatsiooni rikkumisi / töötlemata 500 sekundit (faas 8 B.4) | **Nõuandev** |
| `nightly-mutation`     | Strykeri mutatsioonitesti skoor kiire ühiku raja — ellujäänud mutandid pinnal nõrgad väited                                                                                  | **Nõuandev** |
| `nightly-compat`       | Sõlmemootori ühilduvusmaatriks toetatud `engines.node` vahemikes                                                                                                             | **Nõuandev** |

Jõudluse baasjooned (kuhja, TTFB, ehitusaeg) salvestatakse, mitte ei piirata: vt [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Velocity-faas (2026-08-30 → v4.0 LTS): iga baastaset leevendati 20%

Omaniku otsus (2026-08-30): kuni v4.0 modulariseerimiseni on väljalaske kiirus olulisem
kui võlataseme hoidmine. Iga **numbriline** lävend lähtestati auditeeritavas ühekordses
etapis 20% võrra leebemaks ning faas on deklareeritud failis `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Muudatus                                                                                                                                                                                                                                    | Asukoht                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — mida väiksem, seda parem loend korrutati 1,2-ga, mida suurem, seda parem protsent jagati 1,2-ga (katvuse alampiir 60 säilitati, `eslintErrors` jääb väärtusele 0, `eslintWarnings` 0 → fikseeritud summutuste arvu 20%) | `quality-baseline.json` (märkus `_relax_velocity_2026_08_30` loetleb kõik enne → pärast väärtused)     |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                            | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, iga `frozen[*]` / `testFrozen[*]` rea lävend korrutati 1,2-ga                                                                                                                                                             | `file-size-baseline.json`                                                                              |
| faili- / TS-koodi-põhised loendid korrutati 1,2-ga                                                                                                                                                                                          | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                         | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` muutub soovituslikuks, kui `_policy.requireTighten === false`                                                                                                                                                           | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| igaöine `bank-ratchet-shrinks` peatub (see talletaks mõõdetud vähenemise ja tühistaks varuruumi)                                                                                                                                            | `.github/workflows/nightly-release-green.yml`                                                          |

Lubatud loendid (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **ei ole** eelarved ja neid ei muudetud. Läbimise/ebaõnnestumise poliitikaväravad (saladused, SQL-reeglid,
dokumentatsiooni/keskkonna leping, i18n-i võrdsus, ühiktestid) on muutmata — ebaõnnestunud test on endiselt ebaõnnestunud test.

**Tööriistad**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — ühekordne
  leevendus (`scripts/quality/relax-baselines.mjs`); keeldub sama märkmega teist korda käivitumast.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mõõdab iga numbrilist väravat CI-ga samal viisil ja kuvab iga värava allesjäänud varuruumi
  (`scripts/quality/baseline-headroom.mjs`). Igaöine `baseline-headroom` töö avaldab
  tabeli töövoo käivituse kokkuvõttes ning laadib oma JSON-i/Markdowni aruande üles nimega
  `baseline-headroom-<run_id>`, säilitades seda 90 päeva. Hoiatus- ja kriitilised read tuvastavad
  väravad, mis on oma ülempiirist 10% kaugusel või juba seda ületavad. Vaadake need aruanded üle kui
  varajane hoiatus eelarvete kulutamise kohta; uurige rikkuva värava `_rebaseline_*` märkmeid. Töö ei
  loo ega uuenda enam püsivat probleemi; #12149 säilitab varasemate aruannete ajaloo.

**Uue koodi režiim (Clean-as-You-Code) — alates 2026-08-30, ainult PR-i kiirtee**

`pull_request` sündmuste korral edastab `quality.yml` lipu `--base-ref <PR base SHA>` kontrollidele
`check:file-size`, `check:complexity-ratchets` ja `check:dead-code`. Kontrollide `check:complexity-ratchets` ja
`check:dead-code` puhul võrdleb värav HEAD-i ühises lähtepunktis oleva versiooniga, **piiratuna PR-i muudetud failidele**
(`scripts/check/newCodeMode.mjs`: ühine lähtepunkt materialiseeritakse ajutises
`git worktree`-is, ESLint/knip käivitatakse seal ja HEAD-is ning failipõhised loendid võrreldakse):

- **blokeeriv** — PR lisas muudetud failidesse tsüklomaatilisi/kognitiivseid rikkumisi või surnud eksporti
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` logis);
- **soovituslik** — globaalne kogus võrreldes fikseeritud baasjoonega. Päritud kõrvalekalle ei muuda
  süütut PR-i kunagi punaseks; kõrvalekalle fikseeritakse väljalaske kooskõlastamisel uuesti ning seda jälgib varuruumi töö.

`check:file-size` kasutab baasviidet oma tingimustel (`scripts/check/check-file-size.mjs`, #8522):
see kontrollib puus iga lähte- ja testifaili, loeb iga faili ridade arvu PR-i baasis käsuga `git show`
ning ebaõnnestub faili puhul ainult siis, kui see kasvab suuremaks oma baasjoone ülemmäärast
(`frozen` / `testFrozen` või `cap` / `testCap` baasjoonest välja jääva faili korral) ja baasversiooni
suurusest suurema väärtuseni. Seega ei muuda fail, milles baasversioonis oli kõrvalekalle, süütut PR-i
kunagi punaseks.

`check:boundary:ratchet` rakendab sama reeglit oma ainsale arvule
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR-sündmuste korral edastavad nii
`quality.yml` kiirkontrollid kui ka `ci.yml` lint-töö PR-i baas-SHA, baas-commit mõõdetakse
`git archive`-ekspordist ning PR ebaõnnestub ainult siis, kui selle
`open-sse → src` servade arv ületab väärtustest `metrics.boundaryOpenSseToSrc` ja baasil loendatud arvust suuremat. Baasi ülempiiri ületav kõrvalekalle teatatakse (`base drift herdado`), kuid süütut PR-i ei märgita kunagi ebaõnnestunuks; `push → main` säilitab absoluutse ülempiiri ning lahendamatu baas-SHA korral kasutatakse hoiatusega seda ülempiiri.

Omni-järjekorra kandidaat (push harusse `omni-queue/**`, vt [OMNI_QUEUE.md](../ops/OMNI_QUEUE.md))
saab sama käsitluse nagu pull request: mõlemad töövood edastavad kandidaadi baasi
(`needs.changes.outputs.candidateBase`) argumendina `--base-ref` ning `check:ts7-diagnostics-ratchet` käivitatakse
samuti selle vastu. Kahe uue koodi kontrolli puhul on võrdlusbaas see SHA ise, mitte ülemise
merge-commiti esimene vanem, seega hinnatakse iga paketi pull request’i.

`workflow_dispatch`-käivitustel, release’i rohelise oleku kontrollil ja öisel varuruumi-tööl puudub PR-i baas
ning need kasutavad absoluutset (globaalset) võrdlust. Katvus, dubleerimine ja tüübikatvus jäävad praegu globaalseks
(nende tööriistad ei loo failipõhist diff’i odavalt) — kandidaadid sama käsitluse jaoks.

**Etapi lõpetamine versioonis v4.0 (LTS = varasemast rangem, mitte „tagasi normaalsusse“)**

1. Puhtal `release/v4.0.0` tipil: `npm run quality:headroom --json` dokumenteerimiseks, seejärel
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, iga typecheck-kontrolli
   `--update` — iga baasjoon langeb mõõdetud väärtuseni.
2. Kustuta `quality-baseline.json`-ist `_policy` (aktiveerib uuesti `--require-tighten`-i ja öise
   pangastamise), taasta `THRESHOLD = 36` (või suurem) failis `check-openapi-coverage.mjs`.
3. Muuda piirangud mõõdetust rangemaks seal, kus modulariseerimine end ära tasus: faili suuruse `cap` tagasi väärtusele 1000
   (või 800), katvuse alampiirid +5, modulariseeritud pakettide surnud ekspordid väärtusele 0.

## Ratchet-alus (`quality-baseline.json`)

Ratchet-mootor (`scripts/quality/check-quality-ratchet.mjs`) loeb faili `quality-baseline.json`
ja võrdleb seda värskelt kogutud failiga `quality-metrics.json`. Kõik mõõdikud, mis halvenevad
üle epsilon'i, põhjustavad järgu ebaõnnestumise.

Praegu jälgitavad mõõdikud:

| Mõõdik                | Suund  | Tähendus                                |
| --------------------- | ------ | --------------------------------------- |
| `eslintWarnings`      | `down` | ESLinti hoiatuste arv ei tohi suureneda |
| `coverage.statements` | `up`   | Lausete katvus ei tohi langeda          |
| `coverage.lines`      | `up`   | Ridade katvus ei tohi langeda           |
| `coverage.functions`  | `up`   | Funktsioonide katvus ei tohi langeda    |
| `coverage.branches`   | `up`   | Harude katvus ei tohi langeda           |

Alusnäidu värskendamiseks pärast tegelikku paranemist:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Lipp `--update` kirjutab praegu mõõdetud väärtused faili `quality-baseline.json`.
Paranemise talletamine on väljalaske-/öötöö, mitte funktsiooni-PR-i töö: `--require-tighten`
(Faas 6A.5) põhjustab talletamata paranemise korral ebaõnnestumise ainult väljalaskerežiimis
(push, ajastatud käivitus, väljalaske-PR, kohalikud käivitused). Funktsiooni-PR-is (`pr` väravarežiim)
kuvab see paranemise teabena ja läbib; regressioon põhjustab mõlemas režiimis ebaõnnestumise.
Kiirusefaasi ajal on see kõikjal soovituslik (`_policy.requireTighten: false`). Vt
[Genereeritud failid ja tuletatud alusnäidud, mis kirjutatakse väljalaskel](#generated-files-and-derived-baselines-written-at-release).

### CodeQL-i ratchet: värskendamise sagedus ja käsitsi käivitamine

`check:codeql-ratchet` loeb **repositooriumi olekut, mida värskendatakse ajakava alusel — mitte iga PR-i puhul.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` tagastab
`state: configured`, `schedule: weekly`: GitHubi vaikeseadistuse skannimine, mitte iga push'i puhul
tehtav analüüs. Tagajärg: pärast PR-i, mis parandab hoiatused, liidetakse, jätkab ratchet
vana, suurema arvu lugemist kuni järgmise ajastatud skannimise käivitumiseni — seega teatab see
regressioonist igas avatud PR-is, sealhulgas parandava PR-i enda järelkäikudes, kuni skannimine
järele jõuab.

**Käsitsi värskendamine**: `gh workflow run codeql.yml --ref release/vX.Y.Z` käivitab analüüsi uuesti
ja avaldab hoiatused mõne minuti jooksul. Lugege esmalt faili `.github/workflows/codeql.yml`
— selle päis selgitab, et see on ainult `workflow_dispatch`-i jaoks, **sest see on vastuolus
GitHubi „vaikeseadistusega“** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). `push`/`pull_request`/
`schedule`-i päästikute taastamine nõuab esmalt **omaniku toimingut**: Settings → Code security →
CodeQL: Default → Advanced. Ärge lisage `schedule:`-i päästikut ilma selle lülitita —
see tekitab ainult ebaõnnestuvaid käivitusi.

**Pinguldage alusnäitu pärast arvu vähenemist** — `node scripts/check/check-codeql-ratchet.mjs
--update` kirjutab uue mõõdetud arvu faili `quality-baseline.json` →
`metrics.codeqlAlerts.value`, et ratchet ei lubaks vaikimisi regressiooni tagasi vana ülempiirini.
Töötav näide (2026-09-02/03): PR #12502 parandas 7 tegelikku hoiatust
(13 → 6 mõõdetud avatud hoiatust); PR #12530 pinguldas külmutatud alusnäidu 11 → 6-ni, et see
sobiks; seejärel lükati ülejäänud 6 põhjendusega iga hoiatuse kohta tagasi kuni 0 avatud hoiatuseni.

**Tagasilükkamised on operaatori otsus (Hard Rule #14)** — ärge lükake CodeQL-i hoiatust
kunagi tagasi, salvestamata tagasilükkamise kommentaari tehnilist põhjendust: `won't fix`
ülesvooluprotokolli nõude korral, `used in tests` testi-fixtures'i korral, `false positive`
puhul, kui CodeQL ei suuda desinfitseerijat tuvastada (pretsedent: `docs/security/ERROR_SANITIZATION.md`).

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

## Loodud failid ja tuletatud lähtejooned (kirjutatud vabastamisel)

Plaan 2026-11-13 ("tuletatud numbrid ja tekstid lahendatakse ainult vabastamisel"): funktsioon PR muudab** allikas** — `src/shared/constants/providers.ts`, `docs/openapi.yaml`, oskuste kataloog, vabataseme kataloog, uus e2e spetsifikatsioon. See ei taasta sellest allikast arvutatud faile ega lisa mõõdetud täiustusi lähtetasemeks. Need failid kirjutatakse üks kord ümber, väljalase värskenduse (`release:refresh-derived`) või öise värskenduse PR abil. Enne seda kandis iga õde-vend PR oma regenereeritud koopiat ja sattus vastuollu järgmise liitmisega (2026-11-13: 30/321 avatud PRs kirjutas `PROVIDER_REFERENCE.md` ümber, 26–28 kirjutas README diagrammid ümber).

**Valvur.** `check:pr-derived-paths` (töö `pr-test-policy`) ei tööta PR funktsioonis, mis puudutab `config/quality/derived-paths/` perekonna faili:

| Perekond    | Failid                                                                                                                                                                                        | Kirjutaja                                                                                                                 |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`; kaksteist genereeritud README SVG-d; `skills/*/references/**`; `SKILL.md` failid, millel puudub kohandatud plokk | `release:refresh-derived` (faktid), `gen:provider-reference`, `docs:readme-diagrams`, `generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                                             | `balance-e2e-shards.mjs --sync` (`syncE2eTimings()`)                                                                      |

Kirjutajad (`release/v*`, `chore/derived-*` ja `chore/bank-ratchet-*` lähtejoonte jaoks) on vabastatud; nii on ka PR, mis muudab ainult ühte perekonda pluss selle kaaslasi ( `generated` jaoks: generaatori skriptid, nende testid, agendioskuste sisendid — `src/shared/constants/agentSkills.ts`, käsitsi kirjutatud `skills/**` dokumendid, `docs/openapi.yaml` — ja `changelog.d/**`), nt kangelase paigutuse muutus koos selle taasloetud, SVG või sql testitud oskustega. `SKILL.md` failid. Käsitsi kirjutatud `<!-- skill:custom-start -->` plokiga `SKILL.md` ei kuulu perekonda: selle kohandatud plokk jääb funktsiooni kõrval redigeeritavaks.

Orbude puhastamist ei hinnata ka perekonnad: PR võib kustutada `docs/i18n/<locale>/<doc>` kui liitmisbaasis oli see peegel ja `<doc>` PR peas enam ei eksisteeri, ja võib redigeerida `.i18n-state.json` ainult selleks, et sellised dokumendid `sources` välja jätta. Valvur loetleb need failid `orphan-cleanup` all. Endiselt eksisteeriva dokumendi peegli kustutamine jääb rikkumiseks: ükski teine konveierirada seda väidet ei sisalda ning `llm.txt` ja `CHANGELOG.md` -peeglitel on oma kirjutajad.

**Tšekid iga värava režiimi kohta** (`scripts/check/lib/gateMode.mjs`; abimees `scripts/check/lib/derivedArtifactScope.mjs`):

| Kontrollige                                                                        | `release` (tõuke, ajakava, PR vabastamine, kohalik)                           | `pr` (funktsioon PR, järjekorrapakett)                                                                                                                                                       |
| ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:agent-skills-sync`                                                          | iga oskus peab võrduma generaatori väljundiga                                 | ainult oskused, mille loodud teksti (väljaspool kohandatud plokki) või `references/` PR redigeerib; muidu `SKIP reason=pr-mode`                                                              |
| `check:generated-artifacts` (README SVGs + e2e ajastused; vajab täielikku ajalugu) | iga SVG võrdub selle generaatoriga; igal spetsifikatsioonil on ajastuse kirje | ainult artefaktid, mida PR redigeerib; ülejäänud `SKIP reason=pr-mode`; diff-baas puudub → iga artefakt hinnatud (tõrke-suletud)                                                             |
| README SVG baitide võrdlemise testid (`tests/unit/docs/readme-*-svg.test.ts`)      | iga SVG                                                                       | PR redigeerib ainult SVG, kui põhi lahendab; `test-unit` madalal PR kassal pole alust, seega jäetakse test vahele `SKIP reason=base-unresolved` ja `check:generated-artifacts` omab võrdlust |
| e2e ajastuse täielikkus (`tests/unit/balance-e2e-shards.test.ts`)                  | igal spetsifikatsioonil on kirje                                              | sama reegel mis SVG testidel (uus spetsifikatsioon töötab keskmise kaaluga)                                                                                                                  |
| `check-quality-ratchet.mjs --require-tighten`                                      | Pangata parendus ebaõnnestub (välja arvatud juhul, kui `_policy`)             | teatatud paranemisest, mitte kunagi ebaõnnestumine; taandareng ikka ebaõnnestub                                                                                                              |

Vabastusrežiim säilitab otsused, väljumiskoodid ja sõnumid, mis neil kontrollidel olid enne jagamist; lisatakse maksimaalselt üks rida, mis nimetab lahendatud režiimi (`[agent-skills-sync] mode=release (auto: local run)`). Testid jätavad vahele node:testi `{ skip: releaseOnlyUnlessTouched(...) }` suvandi, mille `check:test-masking` loetleb ainult aruandeplokis (see ei ole ei `.skip(` ega `{ skip: true }`, seega ei loeta seda raske vahelejätmisena). `check:generated-artifacts` jookseb seal, kus põhi on lahendatav: töö `lint` (`fetch-depth: 0`), kohe pärast `check:agent-skills-sync`. Kohalikult näitab `npm run check:generated-artifacts -- --mode=pr`, mida see samm PR põhjal hindab. `check:docs-counts` -i pakkuja-kogusumma ristkontroll ("Pakkuja viite kogusumma (doc vs reaalajas moodulid)") on osa loendusväravast ja järgib selle värava enda režiime.

Meelega ei kuulu ühtegi perekonda: inimeste otsustatud poliitikafailid (`gate-manifest.json`, lubatud loendid,
`admission-policy.json`, `provider-assets-provenance.jsonl`, `model-lifecycle.json`) ning ülemmäärad, mida funktsiooni PR võib
olla vaja koos koodiga muuta (`quality-baseline.json` mõõdikukirjed, tüübikontrolli-/failisuuruse-/keerukuse baasväärtused,
`eslint-suppressions.json` — mida pre-commit-i ESLint-i käitamine kärbib, kui PR parandab külmutatud rikkumise).
Ka `src/i18n/routeNamespaces.generated.json` on genereeritud, kuid jääb funktsiooni PR-idesse: rakendus impordib selle
käitusajal, mistõttu ei saa see värskendust oodata.

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

Iga kontroll, mis ei saa varasemast olemasolevate rikkumiste tõttu ebaõnnestuda, kasutab fikseeritud lubatud loendit
(nt `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Poliitika on järgmine:

**Parandage algpõhjus; kasutage lubatud loendit ainult juhul, kui rikkumine on varasemast olemas ja
seda ei saa samas PR-is parandada.**

Kui lisate lubatud loendisse kirje:

1. Lisage koos põhjendusega kommentaar.
2. Viidake jälgitavale ülesandele (nt `// #3498 — Phase 2 feature, not yet implemented`).
3. Eemaldage kirje samas PR-is, millega rikkumine parandatakse — aegunud kirje, mis enam
   aktiivset rikkumist ei varja, on ise defekt (6A.3 aegunud jõustamine
   põhjustab pärast rakendamist orbunud lubatud loendi kirje tõttu kontrolli
   ebaõnnestumise).

**Ärge lisage lubatud loendi kirjeid selleks, et testid kiiremini läbiksid.** Roheline kontroll koos kasvava
lubatud loendiga loob petliku kvaliteeditunde.

### Kui kontroll teie PR-is ebaõnnestub

1. **Lugege kontrolli väljund hoolikalt läbi** — see näitab täpselt, milline fail või sümbol reeglit rikkus.
2. **Parandage rikkumine** — enamik kontrolle on deterministlikud failisüsteemi kontrollid, mis läbivad kohe, kui kood on korrektne.
3. **Kui rikkumine on varasemast olemas** (st teie seda ei tekitanud, kuid kontroll hõlmab seda nüüd): lisage põhjendava kommentaari ja jälgitava ülesandega lubatud loendi kirje.
4. **Kui tegemist on ratchet-kontrolliga** (katvus, ESLinti hoiatused, dubleerimine, keerukus):
   teie muudatus halvendas mõõdikut. Parandage aluseks olev probleem või (harvadel juhtudel) käivitage
   `npm run quality:ratchet -- --update`, kui muudatus on tahtlik ja mõõdiku halvenemine vastuvõetav — kuid dokumenteerige PR-i kirjelduses, miks seda tehti.
5. **Teavitavad kontrollid** (`continue-on-error: true`) on informatiivsed — need ei blokeeri
   liitmist, kuid kuvatakse CI kokkuvõttes. Parandage need siiski.

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

## Ratsionaliseerimise mahajäämus (ROI ülevaade — etapp 9, laine 3)

See inventuur viidi 2026-06-17 kooskõlla failiga `ci.yml` (eelmisest versioonist puudusid
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Kooskõlastatud kogumi ROI ülevaates
tuvastati järgmised ratsionaliseerimise kandidaadid. **Ühendamised on mehaanilised CI
muudatused; ümberlülitamised/eemaldamised on operaatorile jäetud poliitikaotsused.** Mitte midagi allolevast pole veel rakendatud.

**Samuti on ülal dokumenteerimata** (soovituslik, vähese signaaliga): töö
`docs-lint` (markdownlint + Vale, kogu töö `continue-on-error`) ning eraldiseisvad skanneri töövood
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` on failis
`quality-baseline.json`, kuid seda ei ole failis `ci.yml` ühendatud blokeeriva kasvupiiranguga — mõõdik on
praegu orb.

### Ühendamine / duplikaatide eemaldamine (mehaaniline, väiksema riskiga)

Iga kandidaat valideeriti 2026-06-17 aktiivse värava oleku suhtes (usalda, kuid kontrolli);
mitme „ilmse” ühendamise puhul ilmnes varjatud tehniline võlg ning need **ei ole**
puhastatud otseasendused.

- **`check:docs-sync` käivitatakse kaks korda** — eraldiseisvana `lint` töös ja uuesti `check:docs-all` sees (`docs-sync-strict`) ning husky pre-commit-hook’is. ✅ **TEHTUD** — eraldiseisev `lint`-i väljakutse eemaldati.
- **CVE-skannimine** — ❌ **EI OLE puhas ühendamine.** `audit:deps` blokeerib kriitilised teated ja kõigis viies lockfile’is puudulikud auditid, teatades samal ajal praeguse poliitika kohaselt kõrge taseme teadetest hoiatusena; `check:vuln-ratchet` (osv) ebaõnnestub ainult kontrollitud baastasemega võrreldes toimunud _regressiooni_ korral ning nõuab mõõtmiste puudumise korral nende olemasolu. Semantika on erinev — `audit:deps` eemaldamine kaotaks absoluutse kriitilise värava ja sõltumatu pakettide auditi tõendid. Hoida mõlemad.
- **Tsüklite tuvastamine** — ✅ **TEHTUD** (#15159 G-01/G-02). Vana tekst nimetas siin `check:cycles`-it „roheliseks, kureeritud” väravaks ja põhjendas selle blokeerivana hoidmist, sest `check:circular-deps` (dpdm) teatas 91 tsüklist. See roheline olek oli **vale roheline**: `check:cycles` skannis 5 alamkataloogi (450 faili), leidis ainult staatilised `import|export … from` konstruktsioonid ning jättis kõrvale kõik `@/` ja `@omniroute/open-sse/` spetsifikaatorid, mistõttu ei suutnud see näha hoidlas domineerinud dünaamilise impordi ja aliase tsükleid. Parandus: värav läbib nüüd `src` + `open-sse` (5023 faili), kogub spetsifikaatorid TypeScripti AST-st (seega `import("…")` läheb arvesse, kuid tüübi positsioonis olev `typeof import("…")` mitte) ning lahendab tsconfig-i `paths`-id. See leiab 14 tsüklit, mitte 0. Kuna 14 olemasolevat tsüklit ei saa värava PR-is parandada, on `check:cycles` nüüd **kasvupiirang** (`--ratchet`, ülempiir `metrics.cycles.value = 14` failis `quality-baseline.json`, `direction: down`) — see blokeerib kõik _regressioonid_ ning arv saab ainult väheneda. CI käivitab `npm run check:cycles:ratchet`. Vähendamistöö toimub koos **A-01**-ga. `check:circular-deps` (dpdm) jääb laiema teise arvamusena soovituslikuks.
- **Keerukus** — ✅ **TEHTUD** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): üks ESLinti läbimine, loendamine reegli ID järgi, nii et tsüklomaatilise keerukuse + max-lines-i ja kognitiivse keerukuse baastasemed jäävad sõltumatuks; individuaalsed `check:complexity` / `check:cognitive-complexity` jäävad kohalikuks `--update`-i kasutuseks.
- **`/api` hallutsinatsioonivastane kontroll** — ✅ **TEHTUD** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): üks FS-i inventuur asukohas `src/app/api`, openapi-routes + docs-symbols annavad endiselt aru sõltumatult; individuaalsed kontrollid jäävad kohalikuks käivitamiseks.
- **`check:node-runtime` käivitatakse 11 töös** — ⚠️ **väike ROI.** Igaüks kasutab eraldi käivitajat ja kontroll kestab alla 1 sekundi; koguvõit on umbes 10 sekundit, kuid selle arvelt kaoks odav tööpõhine kaitse. Muudatuste hulka arvestades ei ole see väärt.
- **`typecheck:noimplicit:core` CI lint’is** — ✅ **eemaldatud lint-tööst** (oli soovituslik `continue-on-error`); blokeeriv tüübi pind on `typecheck:core` + `check:type-coverage`. Kohalik skript on alles.

### Ümberlülitamine / otsustamine (operaatori poliitika)

- `check:openapi-security-tiers` (soovituslik) — ❌ **EI OLE puhtalt ümberlülitatav.** See lõpetab koodiga 0, kuid hoiatab, et mitmel `traffic-inspector`-i marsruudil `LOCAL_ONLY_API_PREFIXES` all puudub annotatsioon `x-loopback-only: true`. Selle jõustamiseks tuleb need annotatsioonid esmalt faili `openapi.yaml` lisada.
- `typecheck:noimplicit:core` (soovituslik) — blokeeriv `check:type-coverage`-i kasvupiirang katab selle suuresti. Lülitada kasvupiiranguks või eemaldada üleliigne teine `tsc` läbimine.
- `test:vitest:ui` (nüüd **blokeeriv**) — olemasolevad tõrked on failis `vitest.config.ts` sõnaselgelt välja jäetud kommentaaridega `// #8618`; uued tõrked põhjustavad töö ebaõnnestumise.
- `check:secrets` (gitleaks, blokeeriv kasvupiirang, mis on külmutatud 3 dokumenteeritud valepositiivse tulemuse juures) — lubada need 3, et jõuda nullini, või muuta kontroll soovituslikuks. Kattub GitHubi loomuliku saladuste skannimise + `check:public-creds`-iga.
- `check:pr-evidence` (blokeeriv, otsib PR-i keha tekstist) — suur valepositiivsete tulemuste risk; eemaldamise korral nõrgeneks Hard Rule #18 jõustamine, seega on see tõeline poliitikaotsus.
- `semgrep` (eraldiseisev soovituslik) — kattub OWASP-i perekondade puhul CodeQL-iga; ühendada selle baasväärtus kasvupiiranguga või eemaldada.

## Seotud dokumentatsioon

- Tarneahel (päritolu, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — võtmekogumi võrdsuse värav

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, töö `i18n-ui-coverage`).
Võrdleb iga `src/i18n/messages/<locale>.json` lehtvõtmete kogumit failiga `en.json` ja ebaõnnestub
iga puuduva või üleliigse lehtvõtme korral, sõltumata võtme lisamise ajast. `__MISSING__:` kohatäited
loetakse olemasolevateks (nende sisu on suhtarvuvärava äriline vastutus). See on kahe
erinevuspõhise/protsendipõhise värava absoluutne täiendus: `check-ui-keys-coverage` jõustab iga
lokaliseerimise puhul 80% alampiiri (43 puuduvat võtit ligikaudu 13 000 hulgast tähendab endiselt
99,7%) ja `check-new-key-coverage` hindab ainult võtmeid, mille PR lisab faili `en.json`. Lokalisatsiooni
partii luuakse selle päeva `en.json` põhjal, mil haru luuakse, ning tõlgitakse päevi, samal ajal kui
baas jätkab võtmete lisamist; partii PR ise võtmeid ei lisa, seega jäid mõlemad sõsarkontrollid
vaikseks, kui partii 1 (#13044) jõudis üheksas lokaliseerimises kohale 43 võtme võrra puudulikuna ja
partii 2 (#13660) kaheksas 10 võtme võrra puudulikuna (2026-09-15). Paranda punane tulemus käsuga
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; `extra`-leht tähendab,
et lähtefail eemaldas selle — `sync-ui-keys` eemaldab selle (`--prune-extra`, vaikimisi). `--warn`
annab teada ilma ebaõnnestumata.
`--catalog=cli` käivitab sama võrdluse kataloogis `bin/cli/locales` (`npm run i18n:check-keys:cli`);
mõlemad sammud asuvad töös `i18n-ui-coverage`. Absoluutne kontroll töötab ainult väljalaskerežiimis:
funktsiooniharus näeb PR `SKIP reason=pr-mode` ja parandus käivitatakse väljalaske värskenduses
või tõlkelaine ajal, mitte funktsiooni-PR-is; PR-i puhul, mis muudab lokaliseerimiskatalooge,
hinnatakse iga kataloogi selle asemel ühinemise aluse suhtes (vt töö `i18n-ui-coverage` jaotist
„Kaks režiimi“).

#### `check-new-key-coverage` — uute võtmete i18n-värav

`check-ui-value-drift`-i sõsarkontroll. See tuvastab ingliskeelse väärtuse, mis **kirjutati ümber**,
samal ajal kui selle tõlked jäid muutmata; see tuvastab ingliskeelse võtme, mis **lisati**, samal ajal
kui mõni lokaliseerimine seda kunagi ei saanud.

`check-ui-keys-coverage` ei näe seda juhtumit: see jõustab lokaliseerimise kohta protsendipõhist
alampiiri ning üksteist puuduvat võtit ligikaudu 13 000 lehtvõtme hulgast jätab katvuseks 99,9%.
Keelepõhine protsent ei suuda väljendada olukorda „see funktsioon tarniti tõlkimata“ — terve
funktsioon võib jõuda uude lokaliseerimisse ilma tekstita ja number ei muutu kunagi.

Sündmus, mida see kontroll modelleerib: Orchestration Canvase 3. faas tõlkis oma üksteist võtit
tol ajal olemas olnud 42 lokaliseerimisse. Mõni tund hiljem viis EL-i keelte partii (#13044) hoidla
51 lokaliseerimiseni ning üheksa uut (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ei saanud
neid kunagi. `deepMergeFallback` asendab puuduva võtme ingliskeelsega, seega oli rikkevormiks
tõlkimata kasutajaliides, mitte tühi kasutajaliides — tõeline ja olemuslikult vaikne.

Nagu sõsarkontroll, on ka see **erinevusteadlik**, võrreldes ingliskeelset faili ühinemise aluses
tööpuiduga, nii et olemasolevad puudujäägid jäävad muutmata ja värava sisselülitamiseks polnud
migratsiooni vaja.

**`__MISSING__:<english>` marker ei rahulda seda alates 2026-09-17.** Varem oli see dokumenteeritud
edasilükkamisviis — käitusaeg langeb tagasi korrektsele ingliskeelsele tekstile — kuni kaheksa
funktsiooni-PR-i lisasid 2026-09-16 61 võtit ja märkisid need kõigis 65 lokaliseerimises markeri abil
tõlkimise asemel: see värav aktsepteeris kõik võtmed, miski ei blokeerinud PR-e, ning blokeeriv
tegeliku tõlke suhtarvuvärav ebaõnnestus seejärel väljalaske sihis kõigi jaoks (`pt-BR` 3,2% > 2,5%

- 0,5). Markerit hinnatakse nüüd puuduva tõlkena. Ainult väljalaskerežiimis alates 2026-11-13:
  funktsiooni-PR näeb `SKIP reason=pr-mode` ning väljalaske-PR-is (`BASE_REF=origin/main`) hindab
  värav kõiki võtmeid, mille tsükkel lisas. Paranda punane tulemus väljalaske värskenduses või
  tõlkelaine ajal käsuga `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`
  või paralleelselt kõigis lokaliseerimistes käsuga `npm run i18n:translate-new-keys`
  (`scripts/i18n/translate-new-keys.sh`, eraldatud käivituseks ohutu, keeldub käivitumast ilma
  `OMNIROUTE_TRANSLATION_*` keskkonnata). Võti, mis peab jääma ingliskeelseks (fikseeritud toote-,
  mootori- või lipunimi), kuulub faili `scripts/i18n/untranslatable-keys.json`, mitte kunagi markeri
  taha. `vi` keelab markerid täielikult (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — pargitud testi värav

Fail `vitest.config.ts`-i `exclude`-loendis on test, mida ei käivitata, ja see näeb puu lugejale
välja nagu katvus. Kommentaari
`// #8618 — pre-existing failure; remove this exclusion when fixed` taha kogunes 62 faili. Probleem
#8618 suleti 2026-08-11, samal ajal kui selle jälgitav loend kasvas 45 kirjelt 62-le, kusjuures iga
uus kirje päris surnud probleemile viitava kommentaari. Kui loend lõpuks faili kaupa mõõdeti
(#13204), läbisid **51 faili 62-st praeguse puu korral ilma lähtekoodi muutmata**.

Värav nõuab, et iga välistus, mis lahendub tegelikuks failiks, (a) nimetaks jälgitava probleemi ja
(b) esineks failis `config/quality/vitest-exclusions.json` koos mõõdetud olekuga, nii et ühe lisamine
on ülevaadatav erinevus spetsiaalses failis, mitte järjekordne rida 60-kirjelises massiivis. See ei
käivita välistatud teste tahtlikult uuesti — selleks kulub ligikaudu 10 minutit ja see kuulub
perioodilisse töösse; inventar salvestab, millal iga testi viimati mõõdeti.
