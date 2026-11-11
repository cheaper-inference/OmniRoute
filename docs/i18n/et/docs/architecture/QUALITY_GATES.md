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

CI ja kvaliteedivärava töövood annavad mõlemad stabiilse otsuse: `Gate / CI` ja `Gate / Quality`. Nende versioonis sisseastumispoliitika loetleb kõik eelnevad töökohad vastavalt vajadusele või soovitustele. Kohaldatav nõutav töö peab õnnestuma: puuduvad, tühistatud, vahele jäetud, ootel ja tundmatud tulemused ei saa luua PASS. Kehtiv ainult dokumentide või ainult kataloogide klassifikatsioon võib muuta koodiraja kohaldamatuks; tavaline PR kavand ei ole aktsepteeritud kandidaat. `hotfix` märgis ei loobu tõenditest.

Mõlemad töövood hõlmavad PRs main/release harudeks, tõuke `main`, käsitsi saatmist ja rühmade ühendamise sündmusi. Push, dispatch and merge-group run the full selection. Usaldusväärne Mergify järjekorra mustand käitab ka kohaldatavaid `full-code`/`full-code-e2e` töid; tavaline PRs jäta need vahele. Before a manual merge, run a full dispatch on the exact candidate. Tõuked `release/**` sse ei käivita neid töövooge; Release-Green jälgib ühendatud baasi eraldi (`docs/ops/RUNNER_BOX.md` → hostitud rada). Forks and merge groups use hosted runners for jobs that otherwise select self-hosted runners; sufficient hosted capacity must be verified before rollout.

Tavaline PR käivitab kiire valiku. The `full-code` and `full-code-e2e` lanes of the admission policy (E2E, integration, package artifact, Electron smoke, Bun SQLite, ecosystem and protocol clients) run only on a Mergify queue draft or on a full run: `gh workflow run ci.yml --ref <branch>`.

Iga JSON kviitung tuvastab välja võetud SHA, töövoo käitamise ja katse. CLI lükkab tagasi checkout/event SHA mittevastavuse. Töövoo testid seovad poliitika liikmesuse otsuse töö `needs` loendiga, nii et uus või eemaldatud rada ei saa vaikselt kaduda. Kviitungid hõlmavad nende enda töövoogu, mitte avaldamist, juurutamist ega olemasoleva nõuandeskanneri sisemisi andmeid. Eraldi haldusmuudatus on filiaalireeglites nõutud asjakohaste kontrollide tegemine; defining their jobs does not itself protect a branch.

`API Route Typecheck` on sõltumatu töövoo kontroll, mis ei hõlma nii koondotsuseid kui ka kohaliku täieliku vaatleja staatilist profiili. Inspect its result separately for the exact candidate. `.github/workflows/api-route-typecheck.yml` töötab PRs kaudu `main` või `release/**`, tõukab mõlemale haruperekonnale, käsitsi saatmisele ja `merge_group` tüüpi `checks_requested`-i sündmustele. Sellel pole teefiltrit. Ühenda rühmad vaadake `merge_group.head_sha`; muid üritusi vaadake `github.sha`. Kõik sündmused kasutavad samu API diagnostikavärava ja väravaüksuse teste. PR baasresihtimised nõuavad uut kontrolli; body/title muudatustes kasutatakse ainult vaatlusnimetust `Admission not requested / API Route Typecheck` ja see ei saa asendada vastuvõtukontrolli.

### Säilitatud tõendid vastuvõtu reduktoris

`scripts/quality/validate-release-acceptance.mjs` vähendab tarnitud plaani ja selle manifeste; see ei kinnita, et plaan hõlmab kogu vabastamistorustikku. Selle aruannetes on selgesõnaliselt määratud `releaseAcceptance: false`, isegi kui see plaan on `VERIFIED`. `release-acceptance.yml` töövoog kasutab endiselt variseadmeid, mitte tegelikke ehitus-, pakett-, alglaadimis- või reklaamikviitungeid.

The CLI requires `--evidence-root` to verify retained evidence. Failid lahendatakse `<evidence-root>/<artifact_id>/<member>` ja räsitakse kui SHA-256. A PASS record without evidence, a missing or changed file, an unsafe path or a symlink prevents verification. Missing files are not equivalent to empty successful logs. Existing SHA/run/attempt checks remain independent: matching bytes cannot rescue a stale receipt. File integrity is not proof of execution authenticity or artifact promotion.

### DAST tarbib kinnitatud CI järgu

Nõutav `dast-smoke` CI töö kutsub `.github/workflows/dast-smoke.yml` pärast `build`. See järgib sama code/draft valikut nagu järg, sealhulgas toetatud kahvel PRs, vabastamise sihtmärk PRs ja liitrühmad. Puuduv, ebaõnnestunud, tühistatud või ootamatult vahele jäetud DAST töö blokeerib `Gate / CI`. Korduvkasutataval töövool puudub sõltumatu PR/dispatch päästik; manuaalne valideerimine kasutab CI lähetamist, nii et ehitamine ja tarbija jäävad ühte käiku.

`scripts/ci/next-build-provenance.mjs` seals the full Next artifact with its tar digest, repository/event/run, producer attempt, head/base/checkout/tree, workflow identities, lockfile, exact Node version/ABI, platform and bundler. DAST selects the immutable artifact ID from `needs.build.outputs`, requires download digest verification, and independently hashes the ZIP against the producer digest before extracting its two allowlisted members through `scripts/ci/unpack-ci-build.py`. The manifest and tar archive must also match independent producer outputs before the Next tree is extracted. It never searches for the latest successful branch build. A partial rerun may reuse that same producer attempt when its ID and all inputs still match; kviitung registreerib mõlemad katsed.

Tarbija jääb hostitud Linux runnerisse, millel on kirjutuskaitstud hoidla luba ja hoidlasaladusi pole. See installib tootja täpse Node'i versiooni, seejärel monteerib CLI koos `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` lükkab puuduva eraldiseisva serveri enne varuehitust tagasi; tavalised kohalikud CLI järgud säilitavad oma olemasoleva varu. Serveri valmisolek, skeem ja promptfoo peavad kõik õnnestuma muutumatu 25-minutilise tööpiirangu piires. Päritolukviitung tõendab sisendi identiteeti ja baite, mitte edukat DAST skannimist. Artefaktide aegumine, jooksja katkestus või skanneri rike jääb puudulikuks või ebaõnnestunud tõendiks; see ei saa nõuandeümbrise kaudu muutuda PASS.

### UI täitmisvõime

CI runs the full UI inventory as four `test-vitest` matrix shards, each with at most two workers per shard and the existing 15-minute job deadline. Esimesel killul käitatakse ka MCP/autoCombo Vitest komplekti. Nõutav töötulemus katab iga maatriksi jala; failure or cancellation of one shard cannot establish candidate admission.

Igaöine vaatleja säilitab iga UI killu kohta eraldi täpse kandidaadi kviitungi, sealhulgas esimese kviitungi MCP täitmise kohta. Nõutavad on kõik neli kviitungit, logi ja vastavad täitmise identiteedid. Kohalik `npm run test:vitest:ui` valib endiselt kogu komplekti; üks `--shard` jooks on vaid osaline tõend.

### Üksuse katvuse kogumine

Kaksteist üksuse killustikku koguvad V8 leviala oma olemasoleva testimise ajal. Edukas killuke käivitab `scripts/ci/compact-v8-coverage.mjs`, et tihendada originaalfaile ilma Istanbuli vahearuannet genereerimata. Viimane katvuse töö kontrollib kõiki kahtteist manifesti kandidaadi SHA, käitusaja, lähtejuure ja andmeräsi suhtes, seejärel käitab c8 reporterid ja olemasolevad katvuse läved. Sisendid säilitavad c8 globaalse failinime järjekorra; killu kohta eelühendamine on segatud function/block katvuse korral ohtlik. Puuduvad, valesti vormindatud või kokkusobimatud killud ei saa vastu võtta. Ebaõnnestunud testikillud säilitavad toores diagnostilise katvuse eraldi; see ei saa siseneda lõplikku liitmisse.

### Üksuse täitmise edenemise kviitungid

Jagatud `test:unit:ci:shard` käsk salvestab `scripts/ci/unit-progress-reporter.mjs` kaudu `primary`, `dashboard` ja `serial` faasid. Tavaline katsearuanne jääb kättesaadavaks. Eraldi ainult metaandmeid sisaldav kviitung salvestab iga faili alguse ja lõpetamise ning 30-sekundiline südamelöök loetleb endiselt aktiivsed failid ja nende kulunud aja. See salvestab ainult lubatud loendis olevad täitmise metaandmed; testide kirjeldusi, väljundit, veakehi ja kogu keskkonda ei serialiseerita.

CI säilitab JSONL failid `unit-progress-ci-<run>-<attempt>-<shard>` na. Töö ajalõpp võib takistada hilisemat üleslaadimist; juba kiiratud südamelöögid jäävad diagnostiliseks tõendiks. Puuduvad südamelöögid võivad kajastada ka blokeeritud või lõpetatud jooksjaprotsessi. Need kviitungid säilitavad olemasoleva testivaliku, samaaegsuse, tähtajad ja väljumisoleku; need ei ole kandidaatide vastuvõtmise otsused.

### Ühenda järjekord

`queue` silt saadab PR ühendamisjärjekorda (`.mergify.yml`). Mergify avab PR mustandi `mergify/merge-queue/` harus, CI käivitab seal täieliku valiku ja algne PR liidetakse, kui `Gate / CI`, `Gate / Quality` ja `Merge integrity (changelog + generated skills)` läbivad.

Mergify kirjutab oma järjekorra kokkuvõtte mustandi kirjeldusse. Body/title-only `pull_request` `edited` sündmused kasutavad jooksupõhist samaaegsusrühma ega käivita klassifikatsiooni, maatriksite testimist, terviklikkuse ühendamist ega lubamisotsust. Ainult vaatluseks mõeldud kontrollinimed ei saa asendada `Gate / CI` või `Gate / Quality`. Muudatus, mis muudab sihtbaasi, nõuab uut kandidaadi valideerimist.

Pärast järjekorras seismist ei võta tõuge alati PR järjekorda. Kommenteerige seda `@mergifyio queue` d.

### Staatilise skannimise inventar

Versiooniga npm-aliase inventar ja staatilise skannimise liikmesus on saadaval `config/quality/gate-manifest.json`. Käivitage `npm run check:gate-manifest`, et kontrollida skriptide nimesid ja täpseid käske `package.json` vastu; täiendused, eemaldamised ja käsutriivid nurjuvad nii kohalikus konksus kui ka muutmise-klassifikatsioonis CI. Alias ei ole töövootöö, maatrikseksemplar ega testjuhtum: neid loendusi ei tohi esitada vahetatavatena.

Kasutage `npm run quality:scan -- --list` või `npm run quality:scan:fast -- --list` valitud varjunimede kontrollimiseks ilma neid käivitamata. Runner kutsub npm-sisendpunkti, nii et selle käitusaeg (sealhulgas Bun kui see on konfigureeritud) säilib. Manifest salvestab aliased väljaspool neid profiile eraldi kutsutuna ja hoolduskäsud on kirjutuskaitstud kontrolliprofiilides keelatud.

Need profiilid hõlmavad ainult staatilist skannimist. Nad ei sertifitseeri tooteteste, katvust, pakendeid, väliseid kontrolle ega kandidaadi täielikku vabastamist. Töövoo sissepääs kasutab lingitud `config/quality/admission-policy.json` ja `scripts/quality/admission-verdict.mjs`. Väljalaske-vaatleja profiilid jäävad eraldi; kontrollige iseseisvalt nende kohaldatavaid tšekke ja kviitungeid. Täielikud vaatleja staatilised käsud deklareeritakse `config/quality/release-green-static-profile.json`, sealhulgas `audit:deps`, mutatsioonitesti valik ja tõlkekontrollid. Laadija kontrollib npm-käske package.json ja modelleeritud CI/Quality -deklaratsioonide suhtes; see lükkab tagasi triivi, selle asemel et käivitada argumentidena shellmärke. Nõutav skanneri SKIP/INCOMPLETE väljund ei saa PASS luua. Profiil salvestab selle välised välistused ega asenda hostitud katvust, testmaatrikse, paketti ega juurutamise tõendeid. Allolev proosaloend on viide, mitte tõend, et värav tegelikult jooksis.

Skriptid elavad `scripts/check/` (policy gates) ja `scripts/quality/` (ratchet engine) all. CI tõe allikas on `.github/workflows/ci.yml`.

### Avaldatud alusdokumentide tervis

`.github/workflows/i18n-base-health.yml` jälgib dokumentatsiooni seisukorda pärast valitud tõuke `main` ja `release/v*` ning käsitsi saatmisel. Selle filtrid hõlmavad dokumentatsiooni, root Markdowni, `llm.txt`, tõlke state/configuration ja asjakohaseid i18n-tööriistu. Üksik `Published base documentation health` töö kasutab hostitud Ubuntut ja viieminutilist tähtaega. See teostab kirjutuskaitstud valideerimist ja kirjutab diagnostilise kviitungi ilma sõltuvuse installimise, tõlke või oleku vastuvõtmiseta.

`scripts/i18n/check-base-health.mjs` nõuab nulli lähte-räsi, puuduva sihtmärgi, sihträsi, aegunud tõlke ja jaotise vahemälu vastuolusid. Samuti kinnitab see praeguse document/locale põhiulatuse ja selle registreeritud päritolu. Kehtetu kontekst, mittetäielik katvus või katkestatud kontrollija tekitab `INCOMPLETE`; kinnitatud triiv toodab `FAIL`. Mõlemad tagastavad ebaõnnestunud väljumise oleku. Kviitung on seotud SHA kassasse , töövooga, käitamisega ja katsega ning seda säilitatakse kui `i18n-base-health-<sha>-<run>-<attempt>`.

See on avaldatud baasi sõltumatu vaatlus. See ei lisa PR või grupi ühendamise sündmust, nõutavat PR -kontrolli, npm-aliast ega staatilise skannimise profiili liiget. Aluseks olev kontrollija blokeerib ka kõik viis klassi absoluutrežiimis. Tavaline PR ettevalmistus jääb sissepääsust eraldi. Edukas üleslaadimine ei saa muuta ebaõnnestunud tervisetulemust PASS.

Tavaline PR kasutab `--preflight` koos `--baseline-evidence` genereeritud baasaruandega. See võib jätta ingliskeelse allika ootele ainult siis, kui täielik tõlkekirje ja tegelikud sihtbaidid ei muutu sellest täpsest baasist. Uued sihtmärgi või jaotise vahemälu ebakõlad blokeerivad endiselt ja mittetäielikud tõendid ei luba ettevalmistamist. Aruandes tuuakse välja `preparationPending` ja `mergeReady` eraldi: edukas ettevalmistamine ei muuda ootel olevaid tõlkeid liitmisvalmis. Enne vastuvõtmist värskendage koostatud kandidaadi mõjutatud peegleid. Usaldusväärne Mergify järjekorrakandidaat `merge_group`, harutõuke ja käsitsi CI käitamine kasutavad absoluutset kontrolli, ilma `--warn` või päriliku ebaõnnestumise andestuseta. Puuduvad sihträsid ja kustutatud salvestatud põhifailidega vähendatud ulatus ei saa anda edukat absoluutset otsust.

### Laske välja PR kiirtee (`quality.yml`)

`.github/workflows/quality.yml` täiendab CI main/release PRs, tõukab `main` sse, lähetab ja ühendab rühmi. PRs kasutab teefiltriga kiirkontrolle. Püsivalt keelatud duplikaatjärg eemaldati; tõelised build/package/boot tšekid jäävad CI. Ühikukomplekt ja vitest töötavad ainult CI (`Unit Tests (N/12)` ja `Vitest`).

| Töö                                              | Ulatus                                                                                                                                                                                                               | Blokeerimine            |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs ja docs-all                                                                                                                                                                             | Jah                     |
| `Fast Quality Gates`                             | Kood PRs; staatilised kontrollid, tüübikontroll, armatuurlaua tüübikontroll, mõjutatud üksuste testid                                                                                                                | Jah                     |
| `Forgotten sibling tests`                        | Kood PRs; muudetud moodulid, mis on jälgitud staatiliste tarbijate ja kandidaatide õdede testidega; barrel- ja dünaamilise impordi teed esitatakse soovitusliku diagnostikana koos viidatud lubamisloendi eranditega | **Nõuandev**            |
| `No new ESLint warnings`                         | Kood PRs; summutustest teadlik ebemekaitse                                                                                                                                                                           | Jah, sealhulgas kahvlid |
| `Merge integrity (changelog + generated skills)` | Mitte-visand PRs; muudatuste logi ja loodud oskuste sünkroonimine                                                                                                                                                    | Jah, sealhulgas kahvlid |

#### Unustatud õdede-vendade testide aruanne

`npm run check:forgotten-sibling-tests` töötab `Fast Quality Gates` nõuandva sammuna ja taaskasutab testimõju kaardi taga olevat impordilahendajat. Iga muudetud tootmismooduli puhul teatab see deterministlikest `changed module/symbol -> static consumer -> candidate sibling test` ahelatest, kui kandidaattest puudub tõmbamistaotluse erinevusest. Markdowni kokkuvõte ja JSON tulemus säilitatakse `forgotten-sibling-tests` töövoo artefaktina kalibreerimiseks enne mis tahes blokeerimise levitamist.

Tünnide reeksport ja dünaamiline import on ainult eraldusvõime diagnostika; nad ei loo kunagi blokeerivat leidu. Arvustatud erandid otse `config/quality/forgotten-sibling-allowlist.json`. Iga kirje peab nimetama tarbija ja kandidaadi testi, esitama konkreetse põhjenduse ja linkima GitHub probleemi või tõmbetaotluse. Vigaste kirjete sulgemine nurjub. Erandid ei saa maha suruda kustutatud kandidaadi testi või erinevust, mis lisab `.skip`/`.todo`; kinnituse nõrgenemine ja muu maskeerimine jäävad iseseisvalt blokeerivale `check:test-masking` väravale.

### Töökoht: `lint`

Töötab igal PR lt `main`. Plokid liidetakse ebaõnnestumise korral.

| Skript (`npm run ...`)            | Kinnitab                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Blokeerimine                             |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`              | Node.js versioon on toetatud vahemikus                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Jah                                      |
| `check:cycles`                    | Ringimportimine kogu `src/` + `open-sse/` ulatuses (AST-põhine, tsconfig `paths` lahendatud). Bare väljub väärtusest 1 iga kord, kui mõni tsükkel eksisteerib (tõrkesuletud alates #15281) ja loetleb SCCs. `check:cycles:ratchet` (mida CI töötab) blokeerib, kui arv ületab `metrics.cycles` ülemmäära `quality-baseline.json` — praegu 14, `direction: down`, nii et see võib ainult kukkuda (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jah (põrkmehhanism)                      |
| `check:boundary`                  | `open-sse → src` sidumine: kordumatu failist faili importimine mootorist rakendusse (`scripts/quality/measure-boundary.mjs`; servaloend on v4 core/module-split parandustööde mahajäämus). Bare = nõuandearuanne (sama mis `quality:boundary`). `check:boundary:ratchet` (mida CI töötab, ka `quality.yml` kiirvärava põrkahelas) blokeerib, kui arv ületab `metrics.boundaryOpenSseToSrc` ülemmäära `quality-baseline.json` — külvatud mõõdetud 771, `direction: down`; `--update` ainult alandab seda; baassuhteline PRs is (`--base-ref`, vt allpool)                                                                                                                                                                                                                                                                                                                                                                                                 | Jah (põrkmehhanism)                      |
| `check:route-validation:t06`      | Zod skeemid on olemas kõigil marsruutidel (6. taseme eeskirjad)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Jah                                      |
| `check:any-budget:t11`            | `@ts-expect-error // any` arv ei ületa eelarvet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Jah                                      |
| `check:provider-consistency`      | Igal `providers.ts` pakkujal on vastav kirje `providerRegistry.ts` (ja vastupidi, lubatud loendis)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jah                                      |
| `check:model-lifecycle`           | Kolm käsitsi hooldatud marsruutimistabelit püsivad kooskõlas registreeritud elutsükli hetktõmmisega (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ei anna ühtegi vananenud ID-d, mida `REGISTRY` saaks marsruutida; iga `BUILT_IN_ALIASES` sihtmärk on `REGISTRY` is olemas ja puudub pensionil oleva ID hetktõmmises; kõik `REGISTRY` olevad pensionile jäänud ID edastatakse või loetletud `allowedRetiredInCatalog`; ja ükski `DEFAULT_DEGRADATION_MAP` allikas või sihtmärk ei paista sellel hetktõmmisel olevat kasutuselt kõrvaldatud. See ei tõesta, et mudelit teenindab praegu otseülekanne. Võrguühenduseta — võrreldakse `config/quality/model-lifecycle.json` ga, mida värskendatakse käsitsi `npm run quality:refresh-model-lifecycle` (võrk; pole CI iga ühendatud). `allowedRetiredInCatalog` on põlev põrkmehhanism: lisage kirje ainult jälgimisprobleemiga.                                                                             | Jah                                      |
| `check:fetch-targets`             | Iga kliendipoolse `fetch("/api/...")` `src/` lahendab tõelise `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Jah                                      |
| `check:deps`                      | Kõik `npm install` -able dep-d kõigis repo `package.json` des on `dependency-allowlist.json`; märgistatud uued lahtised või nööritud pakendid                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Jah                                      |
| `audit:deps`                      | Kõigi viie sõltumatu lukufaili npm audit (root, Electron, OpenCode pluginad v1/v2 ja pakkuja). Kriitiliste nõuannete plokk; kõrged nõuanded jäävad nähtavaks hoiatuseks. Missing/failed auditid on INCOMPLETE ja plokk; valdkonnapõhised lukuräsid ja aruanded säilitatakse.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jah                                      |
| `check:lockfile`                  | `package-lock.json` terviklikkus — https-register, terviklikkuse räsid, hosti eirata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jah                                      |
| `check:licenses`                  | SPDX litsentside loend tootmissõltuvuste jaoks                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Jah                                      |
| `check:tracked-artifacts`         | Ehitamata artefakte / kinnitatud `node_modules` sümlinke (töötab ka husky-eelses vormingus; eeltõuke on tahtlikult kerge — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Jah                                      |
| `check:ai-attribution`            | AI/bot `Co-Authored-By` — või AI-generatsiooni jalus PR s ei toimu, pealkiri või keha — kõva reegel #16 ( `quality.yml` kiirvärava tsüklis PR→ `release/**` loeb sündmuse kasulikku koormust, no-op off PRs — ja ainult PR-samm `ci.yml` PR-s → jaoks ka `main`; `commit-msg` ; inimestest kaasautorid lubatud #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:vitest-exclusions`         | Iga Vitest välistamine nimetab jälgimisprobleemi ja kuvatakse `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Jah                                      |
| `check:file-size`                 | Lähtefailid (`.ts`/`.tsx` `src/`, `open-sse/`, `electron/`, `bin/`) jäävad `cap` sse ja testfailid (`*.test.ts(x)`) `testCap` sse; `file-size-baseline.json` (`frozen` / `testFrozen`) külmutatud failid ei tohi ületada salvestatud suurust                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jah                                      |
| `check:error-helper`              | executors/handlers veavastused kasutavad `buildErrorBody()` / `sanitizeErrorMessage()` (kõva reegel #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Jah                                      |
| `check:migration-numbering`       | Migratsiooni SQL failid on järjestikku nummerdatud, ilma lünkadeta ega duplikaatideta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Jah                                      |
| `check:public-creds`              | Väljaspool `publicCreds.ts` puuduvad sõnasõnalised OAuth `client_id`/`client_secret` või Firebase'i veebivõtmed (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Jah                                      |
| `check:db-rules`                  | No raw SQL outside `src/lib/db/` modules; tünni import puudub `localDb.ts` -st (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Jah                                      |
| `check:known-symbols`             | Pakkujate täitjad, marsruutimisstrateegiad ja nende väljasaatmistabelites registreeritud tõlkijad vastavad — kettal olevatele failidele ilma orvuks jäänud või deklareerimata sümboliteta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Jah                                      |
| `check:route-guard-membership`    | Iga marsruut, mis loob alamprotsessi, on klassifitseeritud `isLocalOnlyPath()` (Hard Rules #15/#17) järgi.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Jah                                      |
| `check:test-discovery`            | Iga repos oleva `*.test.ts` / `*.spec.ts` -faili kogub vähemalt üks testija (ratchet: orbide loend `test-discovery-baseline.json` võib ainult kahaneda)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Jah                                      |
| `check:test-tla-order`            | Ükski `tests/unit` all olev `node:test` fail ei registreeri testi, saavutab tipptaseme `await`, seejärel registreerib rohkem (#18045; põrk: `test-tla-order-allowlist.json` saab ainult kahaneda)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Jah                                      |
| `check:agent-skills-sync`         | Loodud agendioskuste artefaktid vastavad nende lähtekataloogile (ei triivi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:provider-asset-provenance` | Pakkujal logos/assets on registreeritud päritolukanne                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `lint:json`                       | JSON konfiguratsioonifailid sõeluvad ja vastavad repo lintreeglitele                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `typecheck:core`                  | TypeScript koostamine ilma vigadeta (ainult soovituslikud hoiatused)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jah                                      |
| `typecheck:noimplicit:core`       | Range `noImplicitAny` — tulevikku vaatav; paljud olemasolevad kõnesaidid vajavad endiselt märkusi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **Nõuandev** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ulatus on `src/app/(dashboard)/**` (#7033) — `typecheck:core` kureeritud 27 failist koosnev lubade loend ei sisalda armatuurlauda TSX ja `next build` ei kontrolli seda kunagi (`next.config.mjs` seab `ignoreBuildErrors: true`), seega olid orvuks jäänud identifikaatorite regressioonid seal (#6625/#6909) CI jaoks nähtamatud. Erinevused külmutatud per-file/per-TS-code -loenduse algtaseme suhtes (`config/quality/dashboard-typecheck-baseline.json`, sama aegunud jõustamismuster nagu `check:known-symbols`) Ainult — NEW vead, mis ületavad algtaseme loendust, ei suuda väravat täita; kui olemasolev viga on parandatud, keerake `--update` iga alla.                                                                                                                                                                                                                                                                                | Jah                                      |
| `check:build-typecheck`           | Terve rakenduse tootmistüübi kontroll `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), pinna `typecheck:core` 27-faililist lubamisloendit ja armatuurlaua väravat ei kata. Erinevused `config/quality/build-typecheck-baseline.json` vastu; uus või tõstetud per-(fail, kood) loendus ebaõnnestub, väiksem arv palub teil põrkama. `--update` keeldub, kui jooks sisaldab uut või tõstetud paari, välja arvatud juhul, kui `--force-regressions` on läbitud, ja keeldub äsja vaigistatud failist, välja arvatud juhul, kui `--force-nocheck` on läbitud, seega on baasjoone laiendamine roheliseks saamiseks ja püsiva vaikuse andmine kaks eraldi tahtlikku tegevust. Paljas `--force` lükatakse tagasi. Samuti kontrollib `@ts-nocheck` koostamise ulatust `config/quality/ts-nocheck-baseline.json` vastu, kuna seda kasutav fail ei teata üldse diagnostikast ja oleks muidu igale väravale nähtamatu. | Jah                                      |

#### Kaks tüübikontrolli programmi vastavad erinevalt

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) ja `check:build-typecheck` koostavad erinevate valikute all erinevaid programme ning sama fail võib ühes olla puhas ja teises vigu täis.

`tsconfig.build.json` määrab `"strict": false`, seega on `noImplicitAny` välja lülitatud. Põhikonfiguratsioon koostab kureeritud 27 failist koosneva rangemate suvanditega lubatud loendi ja järgib iga kirje impordigraafikut, nii et failid, mida ehitusprogrammis kunagi ei kuvata, kontrollitakse seal endiselt.

Tagajärg on oluline, kui otsustatakse, kas fail on trükitud:**nulldiagnostika `check:build-typecheck` all ei tähenda nulli** . `@ts-nocheck` eemaldamine 26 failist näitas, et 23 failist olid ehitusprogrammis puhtad; kuueteistkümnel neist ilmnes umbes 120 kaudset viga – ranges veas. Enne faili puhtaks kutsumist kontrollige mõlemat.

### Töökoht: `quality-gate`

Töötab pärast `test-coverage`. Plokid liidetakse ebaõnnestumise korral.

| Skript                       | Kinnitab                                                                                                                                                      | Blokeerimine                     |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `quality:collect`            | Väljastab `quality-metrics.json` (ESLint hoiatuste arv, ühendatud killuaruande katvus)                                                                        | Jah (põrkmehhanismist ülesvoolu) |
| `quality:ratchet`            | Ükski `quality-baseline.json` mõõdik ei ole taandunud (ESLint hoiatused ≤ baasjoon; katvus ≥ baasjoon)                                                        | Jah                              |
| `check:duplication`          | Koodi dubleerimine (jscpd@4) ei ületa `quality-baseline.json` algväärtust                                                                                     | Jah                              |
| `check:complexity`           | Failitaseme tsüklomaatiline keerukus ei ületa piirmäära (tuum ESLint `complexity` + `max-lines-per-function`)                                                 | Jah                              |
| `check:cognitive-complexity` | Kognitiivse keerukuse põrkmehhanism (`eslint-plugin-sonarjs`) — eraldiseisev ESLint pass; CI käitab mõlemad ühendatud ühe `check:complexity-ratchets` astmena | Jah                              |
| `check:dead-code`            | Kasutamata ekspordid / failid põrkega (knip) ei taandu algtasemega võrreldes                                                                                  | Jah                              |
| `check:compression-budget`   | Kompressiooni etaloneelarve — mootorite märgisäästu alammäärad ei tohi taanduda                                                                               | Jah                              |
| `check:type-coverage`        | Protsenditüüpi põrkmehhanism (`type-coverage`) ei taandu; hõlmab suures osas `typecheck:noimplicit:core`                                                      | Jah                              |

### Töökohad: `codeql-scan` ja `codeql-admission`

`codeql-scan` toodab kõik konfigureeritud analüüsikategooriad. Pärast selle töö õnnestumist kinnitab `codeql-admission` oma täpsed üleslaadimised ja kandidaadi hoiatuse. Mõlemad on `Gate / CI` kohustuslikud sõltuvused, sealhulgas ainult dokumentide jaoks mõeldud kandidaadid. Administratiivseid aktiveerimis- ja kanaarinõudeid on kirjeldatud allpool jaotises "CodeQL põrkmehhanism".

| Skript                 | Kinnitab                                                                                                                                                                                                              | Blokeerimine |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check:codeql-ratchet` | Kandidaat ref/SHA ja kõik konfigureeritud analüüsikategooriad peavad olema kehtivad enne hoiatuse põrkmehhanismi; puuduvad tõendusplokid. Globaalne laovaru jääb eraldiseisvaks —, vt allpool "CodeQL põrkmehhanism". | Jah          |

### Töökoht: `quality-extended`

Töökohad blokeerivad sobivad kandidaadid. Komplekti suurust, salaleidmisi, haavatavuse leide, töövoo leide ja OpenAPI muudatusi kontrollitakse vajalike põrkmehhanismidega. Ringsõltuvuse diagnostika on endiselt soovituslik. Skanneri installimine on vajalik: `scripts/ci/install-quality-scanners.sh` tagab kinnitatud versioonid ja levitab installitõrkeid. Puuduvad tööriistad, kehtetud aruanded või puuduvad lähtejooned jätavad vajaliku skannerivärava INCOMPLETE.

| Skript                   | Kinnitab                                                                                                                                                                                                   | Blokeerimine                                               |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `check:circular-deps`    | Ringikujulisi sõltuvusi pole (dpdm)                                                                                                                                                                        | **Nõuandev**                                               |
| `check:bundle-size`      | Kimbu suurus ei ületa korki; kättesaamatu mõõtmine ebaõnnestub                                                                                                                                             | **Blokeerimine --ratchet ga**                              |
| `check:secrets`          | Gitleaksi leiud ei taandu; nõutavad skaneeringud lükkavad tagasi puuduva tools/source/baseline, ebaõnnestunud skaneeringud ja kehtetud aruanded                                                            | **Blokeerimine --ratchet ga**                              |
| `check:vuln-ratchet`     | Sõltuvuste haavatavused ei taandu; nõutavad skaneeringud lükkavad tagasi puuduvad tööriistad, kehtetud aruanded või puuduvad lähtetasemed                                                                  | **Blokeerimine --ratchet ga**                              |
| `check:workflows`        | Töövoo lint (actionlint + zizmor); missing/broken -skannerid, kehtetud aruanded või puuduv põrkmehhanismi baasjoon toimivad INCOMPLETE. Kehtivad leiud järgivad valitud strict/advisory/ratchet poliitikat | Vajalik täitmine; zizmori põrkmehhanismi blokeerimine CI s |
| `check:openapi-breaking` | Avalik API leping kinnitatud sündmuste vastuvõtmiste vastu (PR ühendamise baas, push enne, liitmisrühma baas; scheduled/manual kassa esimene vanem); nõutav mõõtmine ebaõnnestub                           | **Blokeerimine --ratchet ga**                              |

### Töökoht: `docs-sync-strict`

`main` või `release/**` tõmbetaotluste puhul käitatakse seda tööd ainult mitte-mustandi (või usaldusväärse järjekorra) kandidaatide puhul, mis on klassifitseeritud dokumentatsiooni või koodimuudatustena. See töötab ka mitte-PR CI üritustel; selle töövoo tõukepäästik hõlmab ainult `main`, mitte `release/**`. Samm, mis väljub nullist erinevalt, blokeerib töö; ainult aruannetes esitatud leiud ja allpool esitatud dokumenteeritud erandid seda ei tee.

| Skript                         | Kinnitab                                                                                                                                                                                                                                                                                                                                                                                                                     | Blokeerimine                                                                                                                                           |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `check:docs-all`               | Metavärav, mis juhib järjestikku 7 allväravat                                                                                                                                                                                                                                                                                                                                                                                | Jah                                                                                                                                                    |
| ↳ `check:docs-sync`            | Package/OpenAPI/CHANGELOG versiooni järjepidevus, täpsed `llm.txt` peeglid, tõlgitud CHANGELOG section/size invariandid ja asendatud dubleerivate dokumentide puudumine                                                                                                                                                                                                                                                      | Jah                                                                                                                                                    |
| ↳ `check:docs-frontmatter`     | Koostatud dokumentatsiooni lehtedel on kehtivad frontmatter pealkirjad                                                                                                                                                                                                                                                                                                                                                       | Jah                                                                                                                                                    |
| ↳ `check:docs-counts`          | Kõrge usaldusväärsusega loenduse invariandid on ranged; heuristilised faililoenduse kontrollid hoiatavad ainult siis, kui skript `--strict` vastu ei võta ( CI metavärav seda ei läbi)                                                                                                                                                                                                                                       | Range astme blokeerimine; pehme astme nõuanne                                                                                                          |
| ↳ `check:env-doc-sync`         | Allika env loeb, `.env.example` ja `docs/reference/ENVIRONMENT.md` nõustuvad pärast selgesõnalisi ignoreerimis-, ainult dokumentide ja ainult env-lubade loendeid                                                                                                                                                                                                                                                            | Jah, väljaspool dokumenteeritud lubatud loendeid                                                                                                       |
| ↳ `check:deprecated-versions`  | Teatab võimalikest aegunud versioonidest väljaspool turvalist ajaloolist konteksti ja aegunud värskenduskuupäevi, välja arvatud ignoreeritud dokumendid                                                                                                                                                                                                                                                                      | Soovitus praeguse CI juhtmestiku osas (`--strict` pole läbitud)                                                                                        |
| ↳ `check:doc-links`            | Sisemised allahindluslingid dokumentides lahendavad tegelikud failid (vorm `[text]`/`(path)` )                                                                                                                                                                                                                                                                                                                               | Jah                                                                                                                                                    |
| ↳ `check:fabricated-docs`      | Dokumendis viidatud marsruudid, env vars, CLI käsud, konksu nimed ja failiteed on koodibaasis olemas. Kõvavärav `--strict` kaudu; soft-fail ilma liputa.                                                                                                                                                                                                                                                                     | Jah ( `--strict` kaudu CI)                                                                                                                             |
| `check:cli-i18n`               | Kasutatud CLI `t()` võtmed on `en` olemas; `pt-BR` säilitab kõik tipptasemel sektsioonid; `zh-CN` ja `zh-TW` sisaldavad iga `en` võtit                                                                                                                                                                                                                                                                                       | Jah                                                                                                                                                    |
| `check:openapi-coverage`       | OpenAPI spetsifikatsioon hõlmab vähemalt tõeliste marsruutide põrkunud põrandat                                                                                                                                                                                                                                                                                                                                              | Jah                                                                                                                                                    |
| `check:openapi-security-tiers` | Deklareeritud `x-loopback-only`/`x-always-protected` annotatsioonid peavad olema `routeGuard.ts`-ga tagatud; parseri ja edastamise mittevastavuse plokk. Puuduva `x-loopback-only` pöördkontroll ainult kohalike eesliidete all hoiatab ja ainult mustriga marsruudid jäetakse sellest tagasikäigust välja.                                                                                                                  | Parser/forward kontrollib blokeerimist; pöördkontrolli nõuanne                                                                                         |
| `check:openapi-routes`         | Iga `/api...` tee `openapi.yaml` -s lahendab parameetriteta reaalse marsruudi pärast põhjendatud `KNOWN_STALE_SPEC` lubade loendit; aegunud lubatud loendi kirjed ebaõnnestuvad                                                                                                                                                                                                                                              | Jah                                                                                                                                                    |
| `check:docs-symbols`           | Sisemised `/api/...` URL viited kanoonilistes mittepeegeldokumentides lahendavad tõelise marsruudi või marsruudiperekonna; proxy/upstream/placeholder/file viited ja õigustatud `KNOWN_STALE_DOC_REFS` -kirjed on välistatud ning aegunud lubamisloendi kirjed ebaõnnestuvad                                                                                                                                                 | Jah                                                                                                                                                    |
| `i18n translation drift`       | Absoluutne lubamine nõuab null-allika, puuduva sihtmärgi, siht-räsi, aegunud tõlke ja jaotise vahemälu vastuolusid. Tavaline PR ettevalmistus võib säilitada täpsed päritud tõendid või ainult ingliskeelne ootel muudatus muutumatu täieliku oleku ja sihtbaitidega; oma aruandes deklareerib eraldi ühinemisvalmidus. Puuduvad sihträsid ja mittetäielik alustõendite plokk. Pärandjaotise vahemälu puudumine ei ole rike. | Kõik viis klassi blokeerivad queue/base sissepääsu; tavaline ettevalmistus lubab ainult tõestatud päritud või ainult inglise keele pooleliolevaid töid |

`docs/diagrams/` all olevad kaksteist README SVGs luuakse (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` regenereerib need kõik). Igaühel neist on baitide võrdluse ühiku test (`tests/unit/docs/readme-*-svg.test.ts`, töö `test-unit`), mis ebaõnnestub, kui loodud fail on aegunud, ja `check:docs-counts` loeb nende `<text>` sõlmedest — kanoonilisi numbreid, mistõttu kontuurimise samm hoiab failis iga kontuuriga stringi nähtamatuna `<text>`. SVG -i kanooniliste numbrite kontroll loeb `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) loetletud faile: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, pluss `public/images/tier-flow-dark.svg` ja `tier-flow-light.svg`; igavesti tasuta, kataloogikirje, korduva kogumi ja punktitegurite väited loevad ka `promise-pillars.svg`, `free-tier-budget.svg` ja `strategies-grid.svg`. `free-tier-budget.svg` võtab oma arvud reaalajas kataloogilaadijast, nii et `FREE_MODEL_BUDGETS` või pakkuja kuvatava nime muutmine muudab CI punaseks, kuni see fail uuesti genereeritakse.

### Töökoht: `i18n-ui-coverage`

| Skript                            | Kinnitab                                                                                                                                                                                  | Blokeerimine     |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage` (inline) | UI i18n võtme katvus on ≥ 65%                                                                                                                                                             | Jah              |
| `check-ui-value-drift` (inline)   | Ümberkirjutatud inglise keel **väärtus** ei jäta maha jäänud tõlget                                                                                                                       | Jah              |
| `check-new-key-coverage` (inline) | A **uus** Ingliskeelne võti tõlgitakse igas lokaadis — `__MISSING__:` -marker lükatakse tagasi                                                                                            | Jah              |
| `check-translation-ratio`         | Reaalne tõlkesuhe lokaadi kohta (identne inglise keelega / kohatäide / puuduvad lehed väljaspool lubatud loendit) ei tohi ületada `config/quality/i18n-translation-baseline.json` + lõtku | **Blokeerimine** |

Vajab `fetch-depth: 0` — väärtuse triivimise värav eristab `en.json` d liitmisaluse vastu.

#### `check-ui-value-drift` — aegunud tõlkevärav

Saab kinni ühe i18n regressiooni, mida teised väravad struktuurselt ei näe: ingliskeelne väärtus kirjutatakse ümber ja _eelmisest_ inglise keelest tuletatud tõlked jäävad maha, nii et mitteingliskeelsed kasutajad loevad enesekindlalt sõnastatud, nüüd vale koopiat.

See saadeti päriselt. `oauthModal.googleOAuthWarning` kirjutati ümber, kui Antigravity sisselogimisabi maandus (#5203);**39 43-st lokaadist** hoidis teksti, mis käskis operaatoritel "kopeerida täielik URL ja kleepida see alla" — voogu, mida selle teenusepakkuja jaoks ei saa lõpule viia. See jäi kuni #8463 märkamatuks, sest:

- `sync-ui-keys` täidab ainult need võtmed, mis on **puudub** , mitte kunagi selliseid, mis on **vananenud** ;
- `check-ui-keys-coverage` arvestab võtme _esinemist_, nii et aegunud tõlge loetakse hõlmatuks;
- `check-translation-drift` jälgib `docs/i18n/<locale>/**.md` dokumentatsiooni, mis peegeldab — see ei loe kunagi `src/i18n/messages/*.json`. Töö `docs-sync-strict` blokeerimine alates uuesti sünkroonimisest 2026-09: muutke põhidokumenti → `npm run i18n:run -- --files=<doc>` (jaotise tasemel, odav).

**Diff-teadlik, mitte lähtetasemega tagatud.** See võrdleb ühendamisaluse `en.json` d tööpuuga; iga võtme puhul, mille ingliskeelne väärtus on muutunud, on iga lokaat, millel on veel puutumata tõlge, vananenud. Seda meelega **külmutab olemasoleva võla** — a diff ei saa paljastada, millisest vanast inglise keelest ammune tõlge pärines, seega hindab värav ainult seda, mida praegune muudatus puudutab. Alternatiiv (võtmepõhine räsi baasjoon) maksaks ~ 600 KB genereeritud faili, mis on 3 × suurim olemasolev lähtetase, mis käib igal i18n PR.

Selle rahuldamiseks on kaks võimalust:

1. värskendage mõjutatud tõlkeid või
2. määrake need väärtusele `__MISSING__:<new english>` — käitusaeg, seejärel teenindab parandatud inglise keelt (`src/i18n/request.ts::deepMergeFallback`, #7258) ja tõlke võtmejärjekordi.

Kui string on **tähenduses** muutunud, eelistada **võtme ümbernimetamine** : uus võti ei saa pärida aegunud tõlget. See on #8463 muster.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Väärtuse triivi ja uue võtmega väravad jagavad üht muutumatut võrdlust `scripts/i18n/resolve-ui-diff-base.mjs`. Töövoog läbib mõlemale kontrollile sama baasi, baasotsa ja kandidaat SHAs. PR/base-retarget, push ja merge-group käitused kasutavad nende sündmuste konteksti. Kandidaatharu väljasaatmine nõuab selle täpset avatud PR või selgesõnalist `i18n_base_sha` sisendit. `main` või `release/vX.Y.Z` i väljasaatmine või ajastatud jälgimine ilma selle sisendita võrdleb viimast rakendamist selle esimese vanemaga; see ei ole kogu päritud tõlkevõla audit. Kohalik kutsumine nõuab selgesõnalist võrdlusbaasi, näiteks ülaltoodud käsku `BASE_REF`.

Puuduv või mitmetähenduslik võrdluskontekst, loetamatu või kehtetu nõutav kataloog ja muudetud kandidaat toodavad väljumiskoodiga `INCOMPLETE`**2** , sealhulgas hoiatusrežiimis. Kataloogi lugemiseks kasutatakse `scripts/i18n/read-ui-catalog.mjs`; lugemistõrkeid ei asendata tühjade objektidega. Mittekättesaamatu baas ega mittetäielik sisend ei loo PASS.

### Töökoht: `i18n`

Täielik i18n valideerimismaatriks (üks töö lokaadi kohta). Kogu töö on nõuandev.

| Skript                          | Kinnitab                       | Blokeerimine                                            |
| ------------------------------- | ------------------------------ | ------------------------------------------------------- |
| `validate_translation.py quick` | Tõlke täielikkus lokaadi järgi | **Nõuandev** (`continue-on-error: true` kogu töö kohta) |

### Töökoht: `pr-test-policy`

Töötab ainult tõmbamistaotluste korral.

| Skript                 | Kinnitab                                                                                                                     | Blokeerimine |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check:pr-test-policy` | PRs, mis muudab tootmiskoodi `src/`, `open-sse/`, `electron/` või `bin/` peab sisaldama või värskendama teste (Hard Rule #8) | Jah          |
| `check:test-masking`   | Muudetud testfailid ei vähenda väidete arvu ega lisa `assert.ok(true)` tautoloogiaid                                         | Jah          |
| `check:pr-evidence`    | PR organ tsiteerib test/VPS tõendeid muutuse kohta (mehhaniseerib Hard Rule #18 haarates PR proosa — habras, vt Backlog)     | Jah          |

### Töökoht: `test-vitest`

Vajab `changes` klassifitseerimise tööd. Rakendatavad maatriksikillud ühendavad tõrke korral plokkide ühendamise.

| Sviit            | Kinnitab                                                        | Blokeerimine                                                                                                                |
| ---------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 tööriista), autoCombo, vahemälu — vitest runner | Jah                                                                                                                         |
| `test:vitest:ui` | UI komponent testib — vitest jooksjat                           | **Blokeerimine** — olemasolevad tõrked on `vitest.config.ts` selgesõnaliselt välistatud; uued ebaõnnestumised ebaõnnestuvad |

### Igaõhtused töövood (plaanitud, nõuandev)

Need töötavad cron-graafiku (ja `workflow_dispatch`) alusel, mitte kunagi PRs. Kõik on soovituslikud.

| Töövoog                | Kinnitab                                                                                                                                                                 | Blokeerimine |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| `nightly-property`     | kiire kontrolli omaduste testid juhusliku seemne + suure jooksuarvuga                                                                                                    | **Nõuandev** |
| `nightly-resilience`   | kuhja kasvu värav, kaose rikke süstimine, k6 load/soak                                                                                                                   | **Nõuandev** |
| `nightly-llm-security` | promptfoo süstimiskaitse (blokeerimisrežiim) + garaki sondid (vahele jäetud ilma teenusepakkuja saladuseta)                                                              | **Nõuandev** |
| `nightly-schemathesis` | OpenAPI lepingu hägustamine (skeem) aktiivse OmniRoute vastu, kasutades `docs/openapi.yaml` — pindade spetsifikatsiooni rikkumisi / töötlemata 500 sekundit (faas 8 B.4) | **Nõuandev** |
| `nightly-mutation`     | Strykeri mutatsioonide testimise skoor kiire ühiku rajal. — ellujäänud mutandid näitavad nõrkade väidete                                                                 | **Nõuandev** |
| `nightly-compat`       | Sõlmemootori ühilduvusmaatriks toetatud `engines.node` vahemikes                                                                                                         | **Nõuandev** |

Toimivuse lähtejooned (kuhja, TTFB, ehitusaeg) salvestatakse, mitte ei piirata: vt [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

### CodeQL põrkmehhanism: kandidaatide vastuvõtt ja hoidla inventar

CI kuulub kandidaadi CodeQL vastuvõtt selgesõnalise sõltuvusahela kaudu: `codeql-scan` kutsub `codeql.yml` s neljakeelset maatriksit, seejärel käivitab `codeql-admission` `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` nõuab mõlemat tulemust. Kvaliteet säilitab oma numbrilised kontrollid, kuid ei esita skannerile päringuid enne, kui tootja on lõpetanud; Ainuüksi `Gate / Quality` ei ole täielik kandidaadi vastuvõtt. CodeQL on endiselt nõutav ainult dokumentide jaoks mõeldud kandidaatidel.

`config/quality/codeql-admission-policy.json` poliitika valib toimingud, C/C++, JavaScript/TypeScript ja Python, päringukomplekti vaikeseade, kaugohu mudeli ja ehitusrežiimi puuduvad. Tootja eelproov lükkab ootel oleva aktiveerimiskirje tagasi ja hargneb väljapoole selgesõnalist sihtloendit. Praegused eesmärgid on peamised ja release/v3.8.54. lepingutestid võrdlevad seda lõplikku loendit ja hooldustõuke päästikut paketi versiooniga; järgmine väljaanne vajab ülevaatamist. CI-i olemasolev laiem väljalaske PR päästik jäetakse alles, kuid pardale võtmata sihtmärk teatab HOLD enne ekstraheerimist, mitte ei saa mõõtmata PASS.

Iga maatrikstöö salvestab selle tegeliku SARIF üleslaadimise ID, keele, kategooria, käitamise ja katse, helistaja töövoo identiteedi, sündmuse ref/head/base/merge SHA ja poliitika räsi. Sõltuv töö laadib alla ainult selle käitamise kviitungid ja kinnitab artefakti kokkuvõtteid. See nõuab kõiki nelja kategooriat, edukat tootjat ja iga täpse üleslaadimise lõpetatud töötlemist. See kasutab API filtrit sarif_id, mitte viimast harult leitud analüüsi. Osalised kordused võivad uuesti kasutada sama jooksu ja kandidaadi varasema katse edukaid kategooriaid, säilitades produtseerimiskatse; ebaõnnestunud praegune tootja ei saa varasemaid rohelisi tõendeid uuesti kasutada.

CodeQL toiming ootab töötlemist, kuid selle kinnitatud rakendamine võib hoiatada ja jätkata pärast oleku lugemise ebaõnnestumist või ammendunud ootamist. Seetõttu kontrollib vastuvõtmine uuesti töötlemist. Puuduvad kategooriad, ootel töötlemine, ebaõnnestunud või tühistatud tööd, aegunud identiteet, mittetäielik lehekülgede jaotus või kättesaamatu APIs loob HOLD ja väljub 2. Sõltumatu skanneri töövoo jaoks ei jää fikseeritud ootamist. Skaneerimata PR ei saa läbida, kuna hoiatuspäring tagastas 0. `metrics.codeqlAlerts.value` ületav mõõdetud arv väljub 1; baasjoont ei tõsteta teise haru hoiatuste vastuvõtmiseks. [Üleslaadimise olek ja analüüsi otsing](https://docs.github.com/en/rest/code-scanning/code-scanning).

Kviitung salvestab üleslaadimise ja analüüsi IDs, kategooriad, tööriista versioonid, ref/SHA, algtaseme ja hoiatuste numbrid. SARIF identity/result arv, reeglite miinimumarv ja täpsed hoiatusjuhtumid jäävad kohustuslikuks. PR/analysis identiteeti kontrollitakse enne vastuvõtmist uuesti. Need kontrollid loovad konfigureeritud kategooria katvuse, mitte iga ekstraheeritud lähtefaili loendi. C/C++ ehituseta väljavõte ei sisalda projekti ehitamise ajal loodud koodi. Allikate välistamised vajavad endiselt ülevaatamist ja kaastöötajate omistamine vajab võrreldavaid täpseid tõendeid.

`codeql-maintenance.yml` pakub aktiivse väljalaskega push-skaneeringuid ja iganädalast ajakava ilma PR/main tootjaid dubleerimata. `nightly-codeql-inventory.yml` hoiab hoidlaülese baasjoone eraldi koos `--strict-measurement` ja rikkega, kui mõõtmine pole saadaval. Kohaliku pärandkollektsionääri graatsiline vahelejätmine ei ole sisseastumiskandidaat. Pingutamine jääb selgesõnaliseks `--update` pärast kontrollitud madalamat globaalset arvu.

Täpsemat töövoogu ei tohi avaldada, kui vaikehäälestus on konfigureeritud: GitHub lükkab selle kombinatsiooni tagasi. Selle versioonipoliitika jääb ootele, kuni ülevaadatud haldusüleminek tagasi loetakse. Enne avaldamist kinnitab operaator hoidla, head/base/tree, policy/patch/rollback räsid ja vaadeldava seadistusoleku; `node scripts/quality/codeql-producer.mjs verify-admin-readback` kontrollib tarnitud eeldatavaid ja tegelikke JSON -kirjeid. See on tehniline kaitse, mitte operaatori heakskiit ega asendus värskete lugemiste hankimiseks. PR tunnus ei taotle kunagi administraatori juurdepääsu. Levitamine ja kõik skanneri muudatused nõuavad eraldi lugemist ja tõendeid PR, kahvli ja liitmisrühma ühilduvuse kohta.

Forks kasutab hostitud jooksjaid, kassast ilma püsivate mandaatideta, produtsendis ei ole projekti install/build ega päritud hoidlasaladusi. GitHub toetab SARIF üleslaadimist sündmuse pull_request jaoks oma vähendatud kahvli märgiga; esmakordse panuse täitmise heakskiit jääb GitHub poliitikaks. Ärge kunagi kasutage pull_request_target ebausaldusväärse koodi käivitamiseks. Enne migratsiooni lõppenuks lugemist kinnitage juhitud kanaari tegelikud loaõigused, analüüsi_võti ja kõik kategooriakeskkonnad. [Kahvli üleslaadimise reeglid](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [vastuolulised seadistusrežiimid](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Vallandamine on operaatori kõne (Hard Rule #14)** — ei loobu kunagi CodeQL hoiatusest, salvestamata tehnilist põhjendust loobumiskommentaaris: `won't fix` ülesvoolu protokollinõude jaoks, `used in tests` testseadme jaoks, `false positive` desinfitseerimisvahendi puhul CodeQL ei näe (pretsedent: `docs/security/ERROR_SANITIZATION.md`).

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

**Samuti eespool dokumenteerimata** (nõuandev, vähese signaaliga): töö `docs-lint` (markdownlint + Vale, kogu töö `continue-on-error`) ning eraldiseisvad skanneritöövood `semgrep.yml` / `scorecard.yml`. CodeQL sisaldab nüüd kohustuslikke tootmis- ja vastuvõtutöid `Gate / CI` all, järgides eespool kirjeldatud aktiveerimisnõudeid. `semgrepFindings: 0` on failis `quality-baseline.json`, kuid pole failis `ci.yml` seotud blokeeriva ratchet-kontrolliga — mõõdik on praegu sidumata.

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
- `check:pr-evidence` (blokeeriv, otsib PR-i kirjelduse proosast grep'iga) — suur valepositiivsete tulemuste risk; eemaldamine nõrgendaks range reegli nr #18 jõustamist, seega on see tõeline poliitikaotsus.
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
