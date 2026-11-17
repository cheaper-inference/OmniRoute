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

## Gate'i inventar ja käivitusprofiilid

### Kandidaadi vastuvõtt

CI ja Quality Gates töövood väljastavad kumbki stabiilse otsuse: `Gate / CI` ja
`Gate / Quality`. Nende versioonitud vastuvõtupoliitika loetleb kõik ülesvoolu tööd
kohustuslike või soovituslikena. Rakenduv kohustuslik töö peab õnnestuma: puuduvad,
tühistatud, vahele jäetud, ootel ja tundmatud tulemused ei saa olekut PASS kinnitada.
Kehtiv ainult dokumentatsiooni või kataloogi puudutav klassifikatsioon võib muuta
koodiraja mitterakenduvaks; mustand-PR ei ole aktsepteeritud kandidaat. `hotfix`
silt ei vabasta tõendite esitamise kohustusest.

Mõlemad töövood hõlmavad PR-e main/release-harudesse, tõukeid harusse `main`, käsitsi
käivitamist ja merge-group sündmusi. Push-, dispatch- ja merge-group-käivitused teevad
täieliku valiku. Tõuked harudesse `release/**` ei käivita neid (2026-10-18): iga muudatus
käivitas maatriksi juba oma PR-is ning ühendatud kombinatsioon on Release-Greeni töö
(`docs/ops/RUNNER_BOX.md` → Hosted lane). Forkid ja merge-grupid kasutavad tööde jaoks,
mis muidu valiksid isemajutatud käivitajad, hostitud käivitajaid; enne kasutuselevõttu
tuleb kontrollida piisava hostitud mahu olemasolu.

Tavaline PR käivitab kiire valiku. Vastuvõtupoliitika `full-code` ja `full-code-e2e` rajad
(E2E, integratsioon, paketi artefakt, Electroni suitsutest, Bun SQLite, ökosüsteemi- ja
protokollikliendid) käivituvad ainult Mergify järjekorra mustandil või täieliku käivituse korral:
`gh workflow run ci.yml --ref <branch>`.

Iga JSON-i kviitung tuvastab välja registreeritud SHA, töövoo käivituse ja katse.
CLI lükkab välja checkout'i/sündmuse SHA mittevastavuse. Töövoo testid seovad poliitikasse
kuulumise otsuse töö `needs` loendiga, nii et uut või eemaldatud rada ei saa märkamatult
kaotada. Kviitungid hõlmavad oma töövoogu, mitte avaldamist, juurutamist ega olemasoleva
soovitusliku skanneri sisemust. Mõlema kontrollinime aktiveerimine harureeglites on
eraldi haldusmuudatus; nende tööde lisamine ei kaitse haru iseenesest.

### Ühendamisjärjekord

Silt `queue` saadab PR-i Mergify järjekorda (`.mergify.yml`). Mergify avab harul
`mergify/merge-queue/` mustand-PR-i, CI käivitab seal täieliku valiku ning algne PR ühendatakse,
kui `Gate / CI`, `Gate / Quality` ja `Merge integrity (changelog + generated skills)` läbivad.

Mergify kirjutab oma järjekorra kokkuvõtte mustandi kirjeldusse ning ka teised rakendused võivad
seda muuta. Sellise mustandi `pull_request` sündmus `edited` saab oma konkurentsirühma
(`-queue-edit-<run_id>`), nii et see ei saa mustandi tegelikku käivitust tühistada, ning jätab
värava ja maatriksi vahele. Käivitub endiselt ainult `Merge integrity`. Vahele jäetud väravatöö
kannab teistsugust kontrollinime, sest Mergify käsitleb vahele jäetud `Gate / CI` kontrolli
ebaõnnestununa ja eemaldab PR-i järjekorrast.

Pärast järjekorrast eemaldamist ei lisa tõuge PR-i alati uuesti järjekorda. Kommenteeri sellele
`@mergifyio queue`.

### Vastuvõtureduktoris säilitatavad tõendid

`scripts/quality/validate-release-acceptance.mjs` redutseerib etteantud plaani ja selle
manifestid; see ei kinnita, et plaan hõlmab kogu väljalaske konveierit.
Selle aruanded määravad sõnaselgelt väärtuseks `releaseAcceptance: false`, isegi kui plaan on
`VERIFIED`. Töövoog `release-acceptance.yml` kasutab endiselt varivarasid, mitte
tegeliku ehituse, pakendamise, käivitamise või edutamise kviitungeid.

CLI nõuab säilitatud tõendite kontrollimiseks lippu `--evidence-root`. Failid lahendatakse kujule
`<evidence-root>/<artifact_id>/<member>` ja räsitakse SHA-256-ga. Tõendita PASS-kirje,
puuduv või muutunud fail, ebaturvaline tee või sümbolviit takistab kontrollimist.
Puuduvad failid ei ole samaväärsed tühjade edukate logidega. Olemasolevad SHA-/käivituse-/katse
kontrollid jäävad sõltumatuks: sobivad baidid ei saa aegunud kviitungit kehtivaks muuta.
Faili terviklikkus ei tõenda täitmise autentsust ega artefakti edutamist.

### Staatilise skannimise inventar

Versioonitud npm-aliaste inventar ja staatilise skannimise liikmelisus asuvad failis
`config/quality/gate-manifest.json`. Käivita `npm run check:gate-manifest`, et valideerida
skriptinimed ja täpsed käsud faili `package.json` suhtes; lisamised, eemaldamised ja
käsudrift põhjustavad tõrke nii kohalikus hook'is kui ka CI muudatuse klassifitseerimise töödes.
Alias ei ole töövoo töö, maatriksi eksemplar ega testjuhtum: neid loendusi ei tohi esitada
vahetatavatena.

Kasuta `npm run quality:scan -- --list` või `npm run quality:scan:fast -- --list`, et
kontrollida valitud aliaseid neid käivitamata. Käivitaja kutsub välja npm-i sisenemispunkti,
seega säilitatakse selle käitusaeg (sealhulgas konfigureeritud Buni kasutamine).
Manifest salvestab nendest profiilidest väljaspool olevad aliased eraldi käivitatavatena ning
hoolduskäsud on kirjutuskaitstud skannimisprofiilides keelatud.

Need profiilid hõlmavad ainult staatilist skannimist. Need ei sertifitseeri toote teste,
katvust, pakendamist, väliseid kontrolle ega kandidaadi täielikku väljalaske vastuvõttu.
Töövoo vastuvõtt kasutab seotud faile `config/quality/admission-policy.json` ja
`scripts/quality/admission-verdict.mjs`. Väljalaskevaatluse profiilid jäävad eraldi;
kontrolli nende rakenduvaid kontrolle ja kviitungeid sõltumatult. Täieliku vaatleja staatilised
käsud on deklareeritud failis `config/quality/release-green-static-profile.json`, sealhulgas
`audit:deps`, mutatsioonitestide valik ja tõlkekontrollid. Laadija valideerib npm-i käsud faili
package.json suhtes ja modelleeritud CI/Quality deklaratsioonide alusel; see lükkab drifti
tagasi, selle asemel et käivitada shelli märke argumentidena. Nõutud skanneri SKIP/INCOMPLETE
väljund ei saa kinnitada olekut PASS. Profiil salvestab oma välised välistused ega asenda
hostitud katvust, testimaatrikseid, paketi- ega juurutamistõendeid. Allolev tekstiline inventar
on viide, mitte tõend selle kohta, et värav tegelikult käivitus.

Skriptid asuvad kataloogides `scripts/check/` (poliitikaväravad) ja `scripts/quality/`
(lävepiiri mootor). CI tõeallikas on `.github/workflows/ci.yml`.

### Väljalaske-PR-i kiirtee (`quality.yml`)

`.github/workflows/quality.yml` täiendab CI-d main/release-PR-ide, harusse `main` tehtavate
tõugete, dispatch'i ja merge-gruppide puhul. PR-id kasutavad teefiltritega kiireid kontrolle.
Pidevalt keelatud duplikaatne ehitus eemaldati; tegelikud ehituse, pakendamise ja käivitamise
kontrollid jäävad CI-sse. Ühiktestide komplekt ja vitest käivituvad ainult CI-s
(`Unit Tests (N/8)` ja `Vitest`).

| Töö                                              | Ulatus                                                                                                                                      | Blokeeriv               |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | Dokumentatsiooni/koodi PR-id; API dokumentatsiooni viited ja docs-all                                                                       | Jah                     |
| `Fast Quality Gates`                             | Koodi PR-id; staatilised kontrollid, tüübikontroll, juhtpaneeli tüübikontroll, mõjutatud üksustestid, unustatud sõsartestid (soovituslikud) |
| `No new ESLint warnings`                         | Koodi PR-id; summutustest teadlik lintimise kontroll                                                                                        | Jah, sealhulgas fork-id |
| `Merge integrity (changelog + generated skills)` | Mitte-mustand-PR-id; muudatuste logi ja genereeritud oskuste sünkroonimine                                                                  | Jah, sealhulgas fork-id |

#### Unustatud sõsartestide aruanne

`npm run check:forgotten-sibling-tests` käivitatakse `Fast Quality Gates` soovitusliku sammuna ja kasutab
testide mõju kaardi taga olevat impordi lahendajat.
Iga muudetud tootmismooduli kohta annab see deterministlikult teada
`changed module/symbol -> static consumer -> candidate sibling test` ahelatest, kui kandidaat-
test pull request'i difist puudub. Markdown-kokkuvõte ja JSON-tulemus säilitatakse
`forgotten-sibling-tests` töövoo artefaktina, et neid enne blokeeriva juurutamise alustamist kalibreerida.

Barrel-eksportimised ja dünaamilised impordid on ainult lahenduse diagnostika; need ei loo kunagi
blokeerivat leidu. Läbivaadatud erandid asuvad failis
`config/quality/forgotten-sibling-allowlist.json`. Iga kirje peab nimetama tarbija ja kandidaat-
testi, esitama konkreetse põhjenduse ning viitama GitHubi issue'ile või pull request'ile. Vigase
vorminguga kirjed põhjustavad kontrolli nurjumise. Erandid ei saa vaigistada kustutatud kandidaat-
testi ega difi, mis lisab `.skip`/`.todo`;
väidete nõrgendamine ja muu maskeerimine jäävad sõltumatult blokeeriva
`check:test-masking` kontrolli vastutusalasse.

### Töö: `lint`

Käivitub iga `main`-i suunduva PR-i korral. Nurjumise korral blokeerib ühendamise.

| Skript (`npm run ...`)            | Kontrollib                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Blokeeriv                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| `check:node-runtime`              | Node.js-i versioon jääb toetatud vahemikku                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Jah                                      |
| `check:cycles`                    | Ringimpordid kogu `src/` + `open-sse/` ulatuses (AST-põhine, tsconfigi `paths` lahendatud). Põhivariant lõpetab alati koodiga 1, kui leidub mõni tsükkel (alates versioonist #15281 kasutatakse tõrke korral sulgemist), ja loetleb tugevalt seotud komponendid (SCC-d). `check:cycles:ratchet` (mida CI käivitab) blokeerib, kui tsüklite arv ületab failis `quality-baseline.json` oleva `metrics.cycles` ülempiiri — praegu 14, `direction: down`, seega saab see ainult väheneda (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Jah (ratchet)                            |
| `check:boundary`                  | `open-sse → src` sõltuvus: mootori ainulaadsed failist faili impordid rakendusse (`scripts/quality/measure-boundary.mjs`; servade loend on v4 tuuma/moodulite eraldamise parandusmeetmete nimekiri). Põhivariant annab soovitusliku aruande (sama mis `quality:boundary`). `check:boundary:ratchet` (mida CI käivitab ja mis on samuti `quality.yml` kiirete kontrollide ratchet-tsüklis) blokeerib, kui arv ületab failis `quality-baseline.json` oleva `metrics.boundaryOpenSseToSrc` ülempiiri — algväärtuseks mõõdetud 771, `direction: down`; `--update` saab seda ainult vähendada; PR-ide puhul võrreldakse baasharu suhtes (`--base-ref`, vt allpool)                                                                                                                                                                                                                                                                                                                                                                                                      | Jah (ratchet)                            |
| `check:route-validation:t06`      | Zodi skeemid on olemas kõigil marsruutidel (6. taseme poliitika)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Jah                                      |
| `check:any-budget:t11`            | `@ts-expect-error // any` count does not exceed budget (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Jah                                      |
| `check:provider-consistency`      | Igal `providers.ts`-is oleval provideril on vastav kirje failis `providerRegistry.ts` (ja vastupidi, lubatud loendi piires)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Jah                                      |
| `check:model-lifecycle`           | Kolm käsitsi hallatavat marsruutimistabelit on registreeritud elutsükli hetktõmmisega (#11503) kooskõlas: `FITNESS_TABLE` (`taskFitness.ts`) ei anna hinnet ühelegi aegunud id-le, mida `REGISTRY` saab marsruutida; iga `BUILT_IN_ALIASES` sihtmärk on `REGISTRY`-s olemas ja aegunud id-de hetktõmmises puudub; iga `REGISTRY`-s endiselt olev aegunud id suunatakse edasi või on loetletud jaotises `allowedRetiredInCatalog`; ning ükski `DEFAULT_DEGRADATION_MAP`-i lähte- ega sihtmärk ei esine selles hetktõmmises aegununa. See ei tõesta, et mudelit teenindab praegu aktiivne ülesvoolu teenus. Võrguta — võrdleb faili `config/quality/model-lifecycle.json`, mida värskendatakse käsitsi käsuga `npm run quality:refresh-model-lifecycle` (võrk; CI-ga seotud ei ole). `allowedRetiredInCatalog` on vähendamise järkjärgulise lõpetamise loendur: lisa kirje ainult jälgimisülesande olemasolul.                                                                                                                                                       | Jah                                      |
| `check:fetch-targets`             | Iga kliendipoolses `src/`-is leiduv `fetch("/api/...")` lahendub tegelikuks failiks `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jah                                      |
| `check:deps`                      | Kõik `npm install`-iga installitavad sõltuvused kõigis repositooriumi `package.json`-failides on loetletud failis `dependency-allowlist.json`; uued versioonita või slopsquatted paketid märgistatakse                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jah                                      |
| `audit:deps`                      | Kõigi viie sõltumatu lockfile'i (juur, Electron, OpenCode'i pluginad v1/v2 ja provider) npm audit. Kriitilised nõuanded blokeerivad; kõrge taseme nõuanded jäävad nähtavateks hoiatusteks. Puuduvad või ebaõnnestunud auditid on olekus INCOMPLETE ja blokeerivad; ulatusepõhised lock-hash'id ja aruanded säilitatakse.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Jah                                      |
| `check:lockfile`                  | `package-lock.json` terviklikkus — https-registri kasutamine, terviklus-räsid, hosti ülekirjutusi pole                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jah                                      |
| `check:licenses`                  | SPDX-litsentside lubatud loend tootmissõltuvuste jaoks                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jah                                      |
| `check:tracked-artifacts`         | Ehituse artefakte ega versioneeritud `node_modules`-i sümbolviiteid pole (käivitatakse ka husky pre-commit-käigus; pre-push on tahtlikult minimaalne — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Jah                                      |
| `check:ai-attribution`            | PR-i commit'ides, pealkirjas ega sisus pole tehisintellekti/roboti `Co-Authored-By`-päist ega tehisintellekti loodud sisu jalust — range reegel #16 (PR→`release/**` jaoks `quality.yml`-i kiirete väravate tsüklis — loeb sündmuse andmeid, PR-idest väljaspool ei tee midagi — ning PR-ile piiratud sammuna `ci.yml`-i lint-kontrollis PR→`main`; samuti husky `commit-msg`-haak; inimkaasautorid on lubatud; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:vitest-exclusions`         | Iga Vitesti välistus nimetab jälgimisülesannet ja esineb failis `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Jah                                      |
| `check:file-size`                 | Lähtefailid (`.ts`/`.tsx` kataloogides `src/`, `open-sse/`, `electron/`, `bin/`) jäävad `cap`-i piiresse ja testifailid (`*.test.ts(x)`) `testCap`-i piiresse; failid, mis on failis `file-size-baseline.json` külmutatud (`frozen` / `testFrozen`), ei tohi ületada neile salvestatud suurust                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jah                                      |
| `check:error-helper`              | Täiturite/käsitlejate veavastused kasutavad funktsioone `buildErrorBody()` / `sanitizeErrorMessage()` (range reegel #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Jah                                      |
| `check:migration-numbering`       | Migratsiooni SQL-failid on järjestikku nummerdatud, ilma lünkade või duplikaatideta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Jah                                      |
| `check:public-creds`              | Väljaspool faili `publicCreds.ts` ei ole OAuthi `client_id`/`client_secret` literaale ega Firebase'i veebivõtmeid (range reegel #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Jah                                      |
| `check:db-rules`                  | Väljaspool kataloogi `src/lib/db/` asuvaid mooduleid ei ole SQL-i otsepäringuid; failist `localDb.ts` ei tehta koondimporte (ranged reeglid #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Jah                                      |
| `check:known-symbols`             | Teenusepakkujate täiturid, marsruutimisstrateegiad ja tõlkijad, mis on registreeritud nende suunamistabelites, vastavad kettal olevatele failidele — orvuks jäänud ega deklareerimata sümboleid pole                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Jah                                      |
| `check:route-guard-membership`    | Iga marsruut, mis käivitab alamprotsessi, on funktsiooniga `isLocalOnlyPath()` klassifitseeritud (ranged reeglid #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Jah                                      |
| `check:test-discovery`            | Kõik hoidlas olevad `*.test.ts` / `*.spec.ts` failid kogutakse vähemalt ühe testikäituri poolt (järelkorrigeerimine: `test-discovery-baseline.json`-is olev orbude loend saab ainult kahaneda)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jah                                      |
| `check:test-tla-order`            | Ükski `tests/unit` all olev `node:test`-fail ei registreeri testi, jõua tipptaseme `await`-ini ega registreeri seejärel rohkem teste (#18045; järelkorrigeerimine: `test-tla-order-allowlist.json` saab ainult kahaneda)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Jah                                      |
| `check:agent-skills-sync`         | Genereeritud agendioskuste artefaktid vastavad nende lähtekataloogile (erinevused puuduvad). Väljastusrežiim kontrollib kõiki oskusi; funktsiooniharu PR (`pr`-režiim) kontrollib ainult neid oskusi, mille genereeritud teksti see muudab — vt [Genereeritud failid ja tuletatud alusloendid](#generated-files-and-derived-baselines-written-at-release)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:provider-asset-provenance` | Teenusepakkujate logodel/varadel on registreeritud päritolu kirje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `lint:json`                       | JSON-i konfiguratsioonifailid parsitakse ja need vastavad hoidla lintimisreeglitele                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | TypeScripti kompileerimine vigadeta (ainult soovituslikud hoiatused)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Jah                                      |
| `typecheck:noimplicit:core`       | Range `noImplicitAny` — tulevikku vaatav; paljud olemasolevad kutsungikohad vajavad endiselt annotatsioone                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **Nõuandev** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, mille ulatus on `src/app/(dashboard)/**` (#7033) — `typecheck:core`-i kureeritud 27-faililine lubatud loend ei hõlma ühtegi dashboardi TSX-faili ning `next build` ei kontrolli samuti selle tüüpe (`next.config.mjs` määrab `ignoreBuildErrors: true`), mistõttu jäid seal esinenud orvuks jäänud identifikaatorite regressioonid (#6625/#6909) CI-le nähtamatuks. Võrdleb tulemusi külmutatud failipõhise/TS-koodipõhise arvu baasväärtusega (`config/quality/dashboard-typecheck-baseline.json`, sama aegunud jõustamise muster nagu `check:known-symbols`) — värava läbimine ebaõnnestub ainult juhul, kui ilmneb baasväärtusest rohkem UUSI vigu; olemasoleva vea parandamisel vähenda arvu käsuga `--update`.                                                                                                                                                                                                                                                                                                                                         | Jah                                      |
| `check:build-typecheck`           | Kogu rakenduse tootmisjärgne tüübikontroll üle `tsconfig.build.json`-i (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), mida `typecheck:core`-i 27-faililine lubatud loend ja dashboardi värav ei kata. Võrdleb tulemusi failide ja koodide kaupa failis `config/quality/build-typecheck-baseline.json`; uus või suurenenud arv põhjustab ebaõnnestumise, väiksem arv palub teil arvu vähendada. `--update` keeldub töötamast, kui käivituse tulemused sisaldavad uut või suurenenud paari, välja arvatud juhul, kui edastatakse `--force-regressions`, ning keeldub failist, mille vead on äsja vaigistatud, välja arvatud juhul, kui edastatakse `--force-nocheck`; seega on baasväärtuse laiendamine rohelise tulemuse saamiseks ja püsiva vaigistuse andmine kaks eraldi teadlikku tegevust. Paljas `--force` lükatakse tagasi. Lisaks otsib ehituse ulatusest `@ts-nocheck` vastavalt failile `config/quality/ts-nocheck-baseline.json`, sest seda kasutav fail ei anna üldse diagnostikat ja jääks muidu igale väravale nähtamatuks. | Jah                                      |

#### Kaks tüübituvastusprogrammi annavad erinevaid vastuseid

`typecheck:core` ja `check:build-typecheck` kompileerivad erinevaid programme erinevate
suvanditega ning sama fail võib olla ühes puhas ja teises vigadest tulvil.

`tsconfig.build.json` määrab `"strict": false`, mistõttu `noImplicitAny` on välja lülitatud. Põhikonfiguratsioon kompileerib rangemate suvanditega kureeritud 27-faililist lubatud loendit ja järgib iga kirje impordigraafikut, seega kontrollitakse seal ka faile, mida ehitusprogramm kunagi ei sisalda.

See tagajärg on oluline, kui otsustate, kas fail on tüübitud: **null diagnostikat
`check:build-typecheck`-i all ei tähenda nulli**. Kui 26 failist eemaldati
`@ts-nocheck`, osutusid ehitusprogrammis puhasteks 23 neist; neist kuusteist tõid rangemas
programmis esile umbes 120 implicit-any viga. Enne faili puhtaks kuulutamist kontrollige mõlemat.

### Töö: `quality-gate`

Käivitatakse pärast `test-coverage`-i. Ebaõnnestumise korral blokeerib ühinemise.

| Skript                       | Valideerib                                                                                                                                                                                           | Blokeeriv                   |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `quality:collect`            | Väljastab `quality-metrics.json` (ESLint-i hoiatuste arv, ühendomandatud shard’i aruande katvus)                                                                                                     | Jah (ratchet-ist ülesvoolu) |
| `quality:ratchet`            | Iga mõõdik failis `quality-baseline.json` ei ole regressiooni teinud (ESLint-i hoiatused ≤ baasväärtus; katvus ≥ baasväärtus)                                                                        | Jah                         |
| `check:duplication`          | Koodi dubleerimine (jscpd@4) ei ületa failis `quality-baseline.json` määratud baasväärtust                                                                                                           | Jah                         |
| `check:complexity`           | Failitaseme tsüklomaatiline keerukus ei ületa ülempiiri (tuuma ESLint-i `complexity` + `max-lines-per-function`)                                                                                     | Jah                         |
| `check:cognitive-complexity` | Kognitiivse keerukuse ratchet (`eslint-plugin-sonarjs`) — eraldi ESLint-i läbimine; CI käivitab mõlemad ühendatuna ühe sammuna `check:complexity-ratchets`                                           | Jah                         |
| `check:dead-code`            | Kasutamata ekspordid / failid ratchet (knip) ei ole baasväärtusega võrreldes halvenenud                                                                                                              | Jah                         |
| `check:compression-budget`   | Tihendamise võrdlustesti eelarve — mootoripõhised märgisäästu alampiirid ei tohi halveneda                                                                                                           | Jah                         |
| `check:type-coverage`        | Tüübitud protsendi ratchet (`type-coverage`) ei ole halvenenud; hõlmab suuresti `typecheck:noimplicit:core`                                                                                          | Jah                         |
| `check:codeql-ratchet`       | Avatud CodeQL-i hoiatuste arv ei ole suurenenud (loeb `gh api` kaudu; märgita jätab kontrolli sujuvalt vahele) — värskendamise sagedus ja käsitsi käivitamine: vt allpool jaotist „CodeQL-i ratchet“ | Jah                         |
| `check:type-scale-ratchet`   | Kiti tüübisüsteemi skaala: ainult `src/`-is olevad alla 12 px suurused ja `font-bold` vähenevad (`typeScaleSubFloorSizes`, `typeScaleFontBold`); samuti pre-commit-hook’is                           | Jah                         |

### Töö: `quality-extended`

Segatöö, mille tasemel puudub `continue-on-error`: samm, mis edastab `--ratchet`, nurjab töö, kui mõõdetud tulemus on võrreldes failiga `quality-baseline.json` halvenenud. Ainult `check:circular-deps` ja skannerite installimise samm on soovituslikud (sammu tasemel `continue-on-error: true`). Välised skannerid installitakse `gh release download` kaudu; `check:secrets` jätab kontrolli ise vahele (exit 0), kui gitleaks puudub, samas kui `check:vuln-ratchet`, `check:workflows` ja `check:openapi-breaking` nurjuvad suletult, kui nende mõõtmine puudub.

| Skript                   | Valideerib                                                                                                                                                                                                                       | Blokeeriv                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `check:circular-deps`    | Ringikujulisi sõltuvusi ei ole (dpdm)                                                                                                                                                                                            | **Soovituslik**                                        |
| `check:bundle-size`      | Kogumi suurus ei ületa ülempiiri; ka mõõtmatuks jäänud suurus nurjub                                                                                                                                                             | **Blokeeriv koos --ratchet**                           |
| `check:secrets`          | Saladuste skannimine (gitleaks) — jätab kontrolli vahele, kui binaarfail puudub                                                                                                                                                  | **Blokeeriv koos --ratchet**                           |
| `check:vuln-ratchet`     | Sõltuvuste haavatavused (osv-scanner) ei ole halvenenud — `--ratchet` nurjub mõõtmata tulemuse korral olekus INCOMPLETE (exit 2)                                                                                                 | **Blokeeriv koos --ratchet**                           |
| `check:workflows`        | Töövoo lintimine (actionlint + zizmor); puuduvad või rikkis skannerid, vigased aruanded või puuduv ratchet’i baasväärtus põhjustavad oleku INCOMPLETE. Kehtivad leiud järgivad valitud ranget/soovituslikku/ratchet’i poliitikat | Käivitamine nõutav; zizmor’i ratchet on CI-s blokeeriv |
| `check:openapi-breaking` | Avalik API leping ankurdatud sündmuse commit’ide suhtes (PR-i merge-base, push’i eelne, merge-group’i baas; ajastatud/käsitsi checkout’i korral esimene vanem); nõutud mõõtmise puudumine põhjustab suletud nurjumise            | **Blokeeriv koos --ratchet**                           |

### Töö: `docs-sync-strict`

Käivitub igal PR-il harule `main`. Nurjumine blokeerib ühendamise.

| Skript                         | Valideerib                                                                                                                                                                              | Blokeeriv                     |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `check:docs-all`               | Meta-värav, mis käivitab allolevad 6 alamväravat järjest                                                                                                                                | Jah                           |
| ↳ `check:docs-sync`            | CHANGELOG-i / OpenAPI versiooni järjepidevus; väljalaskerežiimis ka 66 `llm.txt` peeglit ja tõlgitud CHANGELOG-i jaotised (PR-režiimis: peeglid ühtivad)                                | Jah                           |
| ↳ `check:docs-counts`          | Arvud tekstis (pakkujate arv, migratsioonide arv jne). Kaks režiimi: funktsioonide PR-idele `pr`, mujal `release` — vt allpool jaotist „Tuletatud väärtused“                            | Jah                           |
| ↳ `check:env-doc-sync`         | Iga `.env.example`-is olev keskkonnamuutuja on dokumenteeritud dokumentatsiooni tabelis ja vastupidi                                                                                    | Jah                           |
| ↳ `check:deprecated-versions`  | Dokumentatsioonis ei ole aegunud versioonistringe                                                                                                                                       | Jah                           |
| ↳ `check:doc-links`            | Dokumentatsiooni sisemised Markdowni lingid viitavad olemasolevatele failidele (`[text]`/`(path)` vorm)                                                                                 | Jah                           |
| ↳ `check:fabricated-docs`      | Dokumentatsioonis viidatud marsruudid, keskkonnamuutujad, CLI-käsud, hook'ide nimed ja failiteed on koodibaasis olemas. Range kontroll `--strict`-iga; ilma liputa ebaõnnestub leebelt. | Jah (`--strict`-i kaudu CI-s) |
| `check:cli-i18n`               | CLI `t()` võtmed on failis `bin/cli/locales/en.json` olemas (mõlemas režiimis); pt-BR / zh-CN / zh-TW vastavus failiga `en.json` ainult väljalaskerežiimis                              | Jah                           |
| `check:openapi-coverage`       | OpenAPI spetsifikatsioon katab vähemalt tegelike marsruutide järk-järgult suurenevat miinimumtaset                                                                                      | Jah                           |
| `check:openapi-security-tiers` | Failis `openapi.yaml` olevad turvataseme annotatsioonid on kooskõlas faili `routeGuard.ts` klassifikatsioonidega                                                                        | **Soovituslik**               |
| `check:openapi-routes`         | Iga tee failis `openapi.yaml` viitab tegelikule failile `route.ts` (hallutsinatsioonivastane kontroll)                                                                                  | Jah                           |
| `check:docs-symbols`           | Iga `/api/...` viide failides `docs/**/*.md` viitab tegelikule failile `route.ts` (hallutsinatsioonivastane kontroll)                                                                   | Jah                           |
| `i18n translation drift`       | `docs/i18n/**` peeglid vs `.i18n-state.json` — PR-idel soovituslik (peegleid värskendatakse tõlkelaines), push'i ja öise käivituse korral range                                         | PR-idel **soovituslik**       |

#### Tõlkepeeglid on tuletatud failid (PR-režiim vs väljalaskerežiim)

Funktsiooni-PR muudab ainult ingliskeelseid lähtefaile. `docs/i18n/<locale>/**` peeglid (sealhulgas 66
`llm.txt` koopiat ja tõlgitud `CHANGELOG.md`-failid) ning `.i18n-state.json` kirjutatakse ühe sammuna ümber tõlkelaines (`docs/i18n-*` / `chore/i18n-*` harud, ajastatud
`i18n-mirror-refresh.yml`) ja väljalaskes (`npm run release:sync-changelog-i18n`). Seetõttu töötavad peegliväravad kahes režiimis, mille määrab `scripts/check/lib/gateMode.mjs` (`--mode=pr|release`,
seejärel `OMNIROUTE_GATE_MODE`, seejärel Actionsi sündmus; kohalik käivitus on `release`):

- `check:docs-sync` — väljalaskerežiim käivitab kõik kontrollid. PR-režiim säilitab package.json/OpenAPI versiooni,
  juur-CHANGELOG-i pealkirjad ja aegunud dokumentide kaitse ning väljastab
  `SKIP reason=pr-mode` peegelduskoopiate `llm.txt` ja tõlgitud CHANGELOG-i jaotiste puhul —
  välja arvatud juhul, kui PR kirjutab peegeldusi: harus, mis on `config/quality/derived-paths/*.json`-is
  deklareeritud kataloogi `docs/i18n/**` perekonna kirjutajana, käivitatakse mõlemad kontrollid rangelt
  ning kui diff-alus laheneb, käivitatakse rangelt ka kontroll, kui muudatus, mille enda diff
  redigeerib faili `docs/i18n/<locale>/llm.txt` või `CHANGELOG.md`. Diff-alus ei lahene sügavusega 1
  checkout'is (`docs-sync-strict` töö), seega käivitab PR-režiim ka ühe kontrolli, mis alust ei vaja:
  iga `llm.txt` peegeldus peab eksisteerima, säilitama oma `---` eraldaja ning sisaldama kas juure keha
  või keha, mida jagab enamik peegeldusi. Aluse liikumine jätab kõik peegeldused võrdselt aegunuks ja
  kontroll läbib; ühe peegelduse käsitsi muutmine põhjustab kontrolli ebaõnnestumise. Tõlgitud
  `CHANGELOG.md`-failidel pole sügavusega 1 PR-checkout'is sellist kontrolli.
- Eel-commit-konks käivitab `check-docs-sync.mjs --mode=pr`: commit'i hinnatakse selle põhjal, mida see teeb.
  Ilma liputa on kohalik käivitamine väljalaskerežiimis ning üks ühendatud PR, mis muudab juure `llm.txt`-i,
  blokeeriks kõik hilisemad selle aluse commit'id, kuni laine on käivitatud. Sama reegel kehtib iga
  režiimiteadliku värava kohta, mida Husky konks käivitab: konks edastab `--mode=pr` ning range otsus
  jääb väljalaskerežiimis käivitatavatele jooksutustele (väljalaske-PR, `main`-i push'id, tavaline
  kohalik käivitamine).
- Peegeldussisu ühiktestid (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`,
  `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`,
  `docs/*-locales`) — väljalaskerežiim kontrollib iga lokaati. PR-režiim kontrollib ainult neid peegeldusi,
  mis on `.i18n-state.json`-i järgi ingliskeelse allikaga ajakohased (kogu faili räsi või salvestatud
  jaotise räsi selle jaotise kohta, mille test fikseerib), ning jätab aegunud peegeldused põhjusega vahele.
  `target_hash` päritolukontrolle käivitatakse mõlemas režiimis iga lokaadi puhul. Värskus on iga `## `
  jaotise põhine, ühik `run-translation.mjs` arvutab räsi; pikk jaotis (selle faili väravate inventar
  moodustab sellest umbes poole) tähendab, et iga selles tehtud muudatus jätab need peegeldused aegunuks
  ning PR-režiimi väited jätavad need järgmise laine käivitumiseni vahele. Ankur, mida ingliskeelne allikas
  enam ei sisalda, langeb tagasi kogu faili võrdlusele.
- `i18n translation drift` — PR-ide puhul soovituslik, push'i, öise käivituse ja väljalaske lõikamise
  puhul range, et aegunud peegeldus ei jõuaks väljalaskesse.

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

Funktsiooni-PR ei kirjuta kunagi väärtust, mis sõltub oma aluse olekust: pakkujate, migratsioonide,
MCP-tööriistade ja strateegiate arvud, README SVG-de numbrid, faktide hetktõmmis. Üks samm arvutab
need kõik uuesti — `npm run release:refresh-derived`, mida käivitavad väljalase ja öine
tuletatud väärtuste värskenduse PR. Seega **on alus väljalasete vahel kavandatult elavast koodist
maas** ning värav või test, mis võrdleks puud elava koodiga, oleks punane igal PR-il pärast seda,
kui sõsar lisas pakkuja. Tuletatud väärtusi hindavad väravad käivitatakse ühes kahest režiimist,
mille lahendab `scripts/check/lib/gateMode.mjs` (esimene vaste võidab):

1. käsureal `--mode=pr|release`;
2. keskkonnamuutuja `OMNIROUTE_GATE_MODE` (`pr` või `release`);
3. automaatselt GitHub Actionsi sündmuse põhjal: `pull_request`, mille head ei ole `release/v*`,
   `merge_group` või push harusse `omni-queue/**` → `pr`; kõik muu (push, ajakava,
   dispatch, väljalaske-PR `release/v* → main`, mis tahes kohalik käivitamine) → `release`.

Mille puhul `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) kummaski režiimis ebaõnnestub:

| Režiim    | Ebaõnnestub                                                                                                                                                                                                                                                                                                                                                                                                                  | Vajab jooksvaid fakte |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `release` | Iga kontroll; range võrdlus puust kogutud faktidega (käitumine, mis väraval alati oli): aegunud arv, versioon, katvuse alampiir või SVG-arv on STRICT erinevus                                                                                                                                                                                                                                                               | Jah                   |
| `pr`      | Ainult muudatuses tehtu, võrrelduna PR-i baasiga samade väiteekstraktorite abil: (1) hallatav väärtus, mida selle kontrolli ja faili puhul baasis ei olnud („PR muutis hallatavat numbrit — taasta rida baasi tekstiks“); (2) nõutud väide, mis oli baasis olemas, kuid peast kadus. Fakte mittevajavad sisuinvariandid töötavad nagu väljalaskerežiimis; ainult väljalaskerežiimi kontrollid loetletakse ja jäetakse vahele | Ei                    |

Agendi juhiste failid ei sisalda üldse tuletatud arve: `AGENTS.md`, `llm.txt` (ja selle
`docs/i18n/*/llm.txt` koopiad), bs-i `AGENTS.md` haru, `open-sse/services/AGENTS.md`,
`src/shared/constants/agentSkills.ts`, `skills/README.md` ja kõik `skills/*/SKILL.md` viitavad
selle asemel allikale (näiteks `ROUTING_STRATEGY_VALUES` failis
`src/shared/constants/routingStrategies.ts`) ja käsule `npm run facts`. Invariant „Tuletatud arve
ei ole (agendi juhiste fail …)“ nurjub seal arvu leidmisel (pakkujad, migratsioonid, MCP tööriistad
ja ulatused, marsruutimisstrateegiad, hindamistegurid, režiimipaketid) mõlemas režiimis, seega ei
pea väljalaske värskendus kunagi juhiste faili ümber kirjutama.

Režiimis `pr` võivad kirjutaja harud hallatavaid väärtusi muuta: `chore/derived-*` (öine värskenduse
PR), `release/v*` ja tõlkelained `docs/i18n-*` ning `chore/i18n-*`
(`scripts/check/lib/derivedClaimsDiff.mjs`). Järjekorra partiisid (`merge_group`, Mergify mustandid,
`omni-queue/**`) uuesti ei hinnata: need liidavad PR-id, mida värav juba ükshaaval hindas.

Väljumiskoodid: `0` puhas · `1` STRICT erinevus (või pehme erinevus koos võtmega `--strict`) või
hallatava väärtuse rikkumine · `2` taristu — koodifakte ei saanud koguda (`tsx`-i sond nurjus või
aegus; ajalõppu määrab `OMNIROUTE_FACTS_TIMEOUT_MS`, vaikimisi 600000 ms) või CI-s ei saanud PR-i
diffi baasi lahendada. Väljumiskood 2 ei tähenda kunagi dokumentatsiooni lahknevust: käivitage töö
uuesti või parandage keskkond.

Kus iga režiim töötab:

| Kus                                                                                                     | Režiim                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Funktsiooni PR — `ci.yml` töö `docs-sync-strict`, `quality.yml` samm „Docs accuracy“                    | `pr` (automaatselt); töö edastab baasi väärtusena `BASE_SHA` ja kontrollib koodi välja `fetch-depth: 2` abil                                                                                                      |
| `merge_group`, `omni-queue/**` kandidaadid, ühendamisrongi täielik väravate loend                       | `pr`                                                                                                                                                                                                              |
| Väljalaske PR (`release/v* → main`), tõuked, ajastatud ja käsitsi käivitused                            | `release`                                                                                                                                                                                                         |
| Release-Green (`scripts/quality/validate-release-green.mjs`)                                            | HARD-üksused käivituvad väärtusega `OMNIROUTE_GATE_MODE=pr` („kas baas läks katki?“); DRIFT-üksus `derived-refresh` käivitab `npm run release:refresh-derived -- --check` (range vaade, ei ava kunagi base-red-i) |
| Release (`/generate-release` etapid 0a ja 1; oskuse juhtmestik on eraldi omaniku heakskiiduga muudatus) | `npm run release:refresh-derived` kirjutab tuletatud failid; väljalaske PR-i enda kontrollid käivituvad seejärel režiimis `release`                                                                               |
| `nightly-derived-refresh.yml` (iga päev, kõrgeim `release/vX.Y.Z`, release-freeze'i ajal vahele jäetud) | `npm run release:refresh-derived -- --profile=nightly`; erinevuse korral hoiab see `chore/derived-refresh` harust avatuna ÜHE PR-i; seda ei ühendata                                                              |

Selle taga olevad käsud:

- `npm run facts` prindib iga tuletatud numbri JSON-vormingus (`scripts/release/facts.mjs`).
  `--key=code.mcpTools` prindib ühe väärtuse, `--snapshot` loeb aktiivse puu asemel sisse
  kinnitatud snapshot’i. Kui fakte ei saa koguda, lõpetatakse töö koodiga 2.
- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) arvutab tuletatud failid
  ühe läbimisega ümber järgmises järjekorras (sammude ID-d suvandi `--only=` jaoks):
  `provider-reference` (`docs/reference/PROVIDER_REFERENCE.md`), `facts` (snapshot), `numbers`
  (loendusvärava ümberkirjutusplaan rakendatakse dokumentatsioonile ja kantakse seejärel üle
  nende `docs/i18n/` peegelfailidele), `readme-diagrams`, `skills` (genereeritud `SKILL.md`),
  `e2e-timings` (jäetakse vahele, kuni puu sisaldab `syncE2eTimings`-i), `ui-keys` (eemaldab
  võtmed, mille `en.json` on kõrvale jätnud, ning suvandiga `--rewritten-since=<ref>` —
  vaikeväärtus `origin/main` — paneb uuesti järjekorda ingliskeelsed väärtused, mis kirjutati
  ümber pärast viimast väljalaset), `llm-mirrors` ja `verify-generated` (pärast kirjutamist peavad
  väljalaskerežiimis läbima `check:generated-artifacts` ja `check:agent-skills-sync`; suvandis
  `--check` ja juhul, kui `--only` jätab selle välja, jäetakse need vahele; tõrke korral on
  väljumiskood 2). Samm `changelog` on lubatav (`--with-changelog`, ainult väljalaskeprofiilis).
  `--profile=nightly` ei puuduta kunagi versiooniväidet. Koos suvandiga `-- --check` ei kirjutata
  midagi ning tagastatakse 1, kui mõni fail muutuks või mõni hallatav väärtus vajaks käsitsi
  muutmist (loetletakse mõlemad); taristutõrke korral tagastatakse 2. `--json` prindib tulemuse JSON-vormingus.
- `docs/reference/derived-facts.json` on viimase värskenduse kasutatud faktide snapshot. Seda kirjutab
  ainult värskendus. README SVG-generaatorid loevad seda ning PR-i ajal võrdlevad ühiktestid
  kinnitatud dokumentatsiooni ja genereeritud faile sellega — mitte aktiivse koodiga. Testikomplekti
  ainus aktiivne võrdlus on „väljalaske värskendus sulgeb tsükli” failis
  `tests/unit/check-docs-counts-sync.test.ts`: aktiivsete faktide korral ei jäta värskenduse
  mälus rakendatud ümberkirjutusplaan alles ühtki teatamata STRICT-hälvet ning ümberplaneerimine
  ei muuda midagi.

Kohalikuks taasesitamiseks (kohalik käivitus kasutab vaikimisi `release`-i):

```bash
npm run check:docs-counts                                       # release: range, aktiivsed faktid
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # mille alusel funktsiooni-PR-i hinnatakse
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # mida väljalase ümber kirjutaks
```

Kui lahendatav alus puudub (pole `BASE_SHA`-d/`BASE_REF`-i ega kohalikku
`origin/release/v<version>`-i), prindib kohalik `pr`-käivitus hoiatuse ja jätab erinevuse
kontrollimata, selle asemel et ebaõnnestuda.

### Töö: `i18n-ui-coverage`

| Skript                            | Valideerib                                                                                                                                                                                          | Blokeeriv                       |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `check-ui-keys-coverage` (inline) | UI i18n-võtmete katvus on ≥ 65%                                                                                                                                                                     | Jah (mõlemad režiimid)          |
| `check:ui-icu`                    | Iga UI-kataloogi iga sõnum kompileerub `IntlMessageFormat`-iga                                                                                                                                      | Jah (mõlemad režiimid)          |
| `check-ui-value-drift` (inline)   | Ümber kirjutatud ingliskeelse **väärtuse** järel ei jää alles aegunud tõlget                                                                                                                        | Jah (ainult väljalaskerežiimis) |
| `check-new-key-coverage` (inline) | **Uus** ingliskeelne võti on tõlgitud igas lokaadis — marker `__MISSING__:` lükatakse tagasi                                                                                                        | Jah (ainult väljalaskerežiimis) |
| `check-key-completeness` (inline) | Iga UI-kataloog (ja suvandiga `--catalog=cli` iga CLI-kataloog) sisaldab täpselt oma `en.json`-i võtmekomplekti; `pr`-režiimis iga kataloog, mida PR muutis, iseenda suhtes ühendamise lähtepunktis | Jah (mõlemad režiimid)          |
| `check-translation-ratio`         | Lokaadi tegeliku tõlke suhe (ingliskeelsega identne / kohatäide / puuduv jääb lubatud loendist välja) ei tohi ületada `config/quality/i18n-translation-baseline.json` + lõtku                       | Jah (ainult väljalaskerežiimis) |

Vajab `fetch-depth: 0` — väärtuse triivimise värav võrdleb `en.json`-i ühendamise lähtepunktiga.

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

Lokaatide pariteedi ühiktestid (`cli-i18n-catalog`, `i18n-pt-br`, `i18n-vi-completeness`, `i18n-placeholder-parity`) järgivad samu režiime faili `tests/_helpers/localeParityMode.ts` kaudu: `pr`-režiimis jätavad need võtmepariteedi väited vahele ja jätavad väljalaske värskenduse hooleks nende võtmete kohatäitepariteedi, mille ingliskeelne väärtus on pärast merge base'i muutunud (iga võtme puhul, kui ühiktesti töö shallow checkout ei suuda seda lugeda). See abifunktsioon on **ainus lubatud režiimist sõltuv vahelejätmine**: `check:test-masking` loendab `.skip(` ja `{ skip: true }`, kuid mitte selle tagastatavat arvutatud väärtust `{ skip: "<reason>" }`, seega fikseerib `tests/unit/locale-parity-mode.test.ts` nende testide loendi, millel on lubatud seda kasutada — ühe lisamine sellesse loendisse on läbivaadatud muudatus.

#### `check-ui-value-drift` — aegunud tõlke kontroll

Tuvastab ühe i18n-i regressiooni, mida teised kontrollid struktuuriliselt ei näe: ingliskeelne väärtus kirjutatakse ümber, kuid eelmisest ingliskeelsest tekstist tuletatud tõlked jäävad muutmata, mistõttu muukeelsed kasutajad näevad edasi enesekindlalt sõnastatud, kuid nüüd vale teksti.

See jõudis päriselt kasutusse. `oauthModal.googleOAuthWarning` kirjutati ümber, kui Antigravity sisselogimise abifunktsioon lisandus (#5203); **39 lokaati 43-st** jätsid alles teksti, mis käskis operaatoritel „kopeerida täielik URL ja kleepida see allolevasse välja” — voog, mida selle teenusepakkuja puhul ei saa lõpule viia. See jäi märkamata kuni #8463-ni, sest:

- `sync-ui-keys` täidab tagantjärele ainult **puuduvaid** võtmeid, mitte aegunud võtmeid;
- `check-ui-keys-coverage` loendab võtme _olemasolu_, seega läheb aegunud tõlge kaetuna arvesse;
- `check-translation-drift` jälgib dokumentatsiooni peegleid `docs/i18n/<locale>/**.md` —
  see ei loe kunagi faile `src/i18n/messages/*.json`. See käivitatakse töös `docs-sync-strict`: PR-ide puhul nõuandvana, push'i ja öise käivituse puhul rangena; tõlkelaines värskendatakse peegleid, mitte funktsiooni PR-i.

**Erinevustest teadlik, mitte baastasemele toetuv.** See võrdleb merge base'is olevat `en.json`-i tööpuuga; iga võtme puhul, mille ingliskeelne väärtus muutus, on iga lokaadi muutmata tõlge aegunud. See **külmutab olemasoleva võla** — erinevusest ei saa järeldada, millisest vanast ingliskeelsest tekstist pikaajaline tõlge pärines, seega hindab kontroll ainult seda, mida praegune muudatus puudutab. Alternatiiv — võtmekohane räsiga baastaseme fail — tähendaks ligikaudu 600 KB suurust genereeritud faili, mis on kolm korda suurem kui suurim olemasolev baastaseme fail ja muutuks iga i18n PR-iga.

Selle täitmiseks on kaks võimalust:

1. uuendada mõjutatud tõlkeid või
2. määrata neile väärtuseks `__MISSING__:<new english>` — käitusaeg kuvab seejärel parandatud ingliskeelse teksti (`src/i18n/request.ts::deepMergeFallback`, #7258) ja võti lisatakse tõlkimisjärjekorda.

Kui stringi **tähendus** muutus, eelista võtme ümbernimetamist: uus võti ei saa aegunud tõlget pärida. Seda mustrit kasutati #8463-s.

```bash
npm run i18n:check-value-drift          # range (seda käivitab CI)
npm run i18n:check-value-drift:warn     # ainult aruande koostamine
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Väljub koodiga 0 ja väljastab `SKIP reason=base-unresolved`, kui baaskataloogi ei saa lugeda (baasrefita shallow clone), järgides `check-openapi-breaking`-i käitumist. Ainult väljalaskerežiim: funktsiooni PR kirjutab ingliskeelse teksti ümber ja peatub seal; väljalaske värskendus märgib alles jäänud tõlked (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`, sama `findStaleTranslations`).

### Töö: `i18n`

Täielik i18n-i valideerimismaatriks (üks töö lokaadi kohta). Kogu töö on nõuandev.

| Skript                          | Valideerib                     | Blokeeriv                                               |
| ------------------------------- | ------------------------------ | ------------------------------------------------------- |
| `validate_translation.py quick` | Tõlke täielikkus lokaadi kohta | **Nõuandev** (`continue-on-error: true` kogu töö puhul) |

### Töö: `pr-test-policy`

Käivitatakse ainult pull request'ide korral.

| Skript                 | Valideerib                                                                                                                                            | Blokeeriv |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PR-id, mis muudavad tootmiskoodi kataloogides `src/`, `open-sse/`, `electron/` või `bin/`, peavad sisaldama teste või neid uuendama (range reegel #8) | Jah       |
| `check:test-masking`   | Muudetud testifailid ei vähenda väidete netoarvu ega lisa tautoloogilisi väiteid `assert.ok(true)`                                                    | Jah       |
| `check:pr-evidence`    | PR-i kirjeldus viitab muudatuse testi-/VPS-i tõenditele (muudab range reegli #18 mehhanismiks, otsides PR-i tekstist — habras, vt mahajäämus)         | Jah       |

### Töö: `test-vitest`

Käivitatakse pärast `build`-i. Ebaõnnestumise korral blokeerib ühendamise.

| Komplekt         | Valideerib                                                         | Blokeeriv                                                                                                         |
| ---------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-server (110 tööriista), autoCombo, vahemälu — vitest-käivitaja | Jah                                                                                                               |
| `test:vitest:ui` | UI-komponentide testid — vitest-käivitaja                          | **Blokeeriv** — olemasolevad tõrked on failis `vitest.config.ts` sõnaselgelt välistatud; uued tõrked nurjavad töö |

### Öised töövood (ajastatud, nõuandvad)

Need käivitatakse cron-ajakava alusel (ja `workflow_dispatch` kaudu) ning mitte kunagi PR-ide puhul. Kõik need on nõuandvad.

| Töövoog                | Valideerib                                                                                                                                                                         | Blokeeriv    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | fast-check-i omadustestid juhusliku seemne ja suure käituste arvuga                                                                                                                | **Nõuandev** |
| `nightly-resilience`   | kuhjamälu kasvu kontroll, kaosepõhine tõrgete süstimine, k6 koormus- ja kestvustestid                                                                                              | **Nõuandev** |
| `nightly-llm-security` | promptfoo süstimise kaitse (blokeerimisrežiimis) ja garak-i sondid (jäetakse vahele ilma teenusepakkuja saladuseta)                                                                | **Nõuandev** |
| `nightly-schemathesis` | OpenAPI lepingufuzzimine (schemathesis) töötava OmniRoute'i vastu, kasutades faili `docs/openapi.yaml` — toob esile spetsifikatsiooni rikkumised / käsitlemata 500-d (Etapp 8 B.4) | **Nõuandev** |
| `nightly-mutation`     | Strykeri mutatsioonitestimise skoor kiirete ühikutestide rajal — ellujäänud mutatsioonid toovad esile nõrgad kontrollväited                                                        | **Nõuandev** |
| `nightly-compat`       | Node'i mootori ühilduvusmaatriks toetatud `engines.node` vahemike lõikes                                                                                                           | **Nõuandev** |

Jõudluse lähteväärtused (kuhjamälu, TTFB, järgu koostamise aeg) salvestatakse, kuid nende põhjal ei blokeerita: vt [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

## Genereeritud failid ja tuletatud lähteväärtused (kirjutatakse väljalaske ajal)

Plaan 2026-11-13 („tuletatud arvud ja tekstid lahendatakse ainult väljalaskel”): funktsiooni PR muudab
**lähteallikat** — `src/shared/constants/providers.ts`, `docs/openapi.yaml`, oskuste kataloogi,
tasuta taseme kataloogi ja uue e2e spetsifikatsiooni. See ei genereeri sellest lähteallikast arvutatud faile
uuesti ega kanna mõõdetud paranemist lähteväärtusse. Need failid kirjutatakse ümber üks kord
väljalaske värskendusega (`release:refresh-derived`) või öise värskendus-PR-i käigus. Enne seda kandis iga
sõsar-PR endas oma regenereeritud koopiat, mis läks järgmise ühendamisega konflikti (2026-11-13: 321 avatud
PR-ist 30 kirjutas `PROVIDER_REFERENCE.md` ümber, 26–28 kirjutasid README diagrammid ümber).

**Kontroll.** `check:pr-derived-paths` (`pr-test-policy` töö) nurjub funktsiooni PR-i korral, mis puudutab
`config/quality/derived-paths/` failiperekonda:

| Perekond    | Failid                                                                                                                                                                                        | Kirjutaja                                                                                                                 |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`; kaksteist genereeritud README SVG-d; `skills/*/references/**`; `SKILL.md` failid, millel puudub kohandatud plokk | `release:refresh-derived` (faktid), `gen:provider-reference`, `docs:readme-diagrams`, `generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                                             | `balance-e2e-shards.mjs --sync` (`syncE2eTimings()`)                                                                      |

Kirjutajad (`release/v*`, `chore/derived-*` ja lähteväärtuste puhul `chore/bank-ratchet-*`) on erand; samuti
on erand PR, mis muudab ainult üht perekonda koos selle kaasnevate failidega (perekonna `generated` puhul:
genereerimisskriptid, nende testid, agendi oskuste sisendid — `src/shared/constants/agentSkills.ts`, käsitsi
kirjutatud `skills/**` dokumendid, `docs/openapi.yaml` — ja `changelog.d/**`), näiteks kangelase paigutuse
muudatus koos regenereeritud SVG-ga või oskuse parandus, mille test loeb regenereeritud `SKILL.md` faile.
Käsitsi kirjutatud plokiga `<!-- skill:custom-start -->` `SKILL.md` ei kuulu sellesse perekonda: selle
kohandatud plokk jääb funktsiooni kõrval redigeeritavaks.

**Kontrollid väravarežiimi kaupa** (`scripts/check/lib/gateMode.mjs`; abifail
`scripts/check/lib/derivedArtifactScope.mjs`):

| Kontroll                                                                            | `release` (push, ajakava, väljalaske-PR, lokaalne)                                   | `pr` (funktsiooni PR, järjekorra partii)                                                                                                                                                                                           |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:agent-skills-sync`                                                           | iga oskus peab ühtima generaatori väljundiga                                         | ainult need oskused, mille genereeritud teksti (väljaspool kohandatud plokki) või `references/` kataloogi PR muudab; vastasel juhul `SKIP reason=pr-mode`                                                                          |
| `check:generated-artifacts` (README SVG-d + e2e ajastused; vajab täielikku ajalugu) | iga SVG peab ühtima generaatoriga; igal spetsifikatsioonil peab olema ajastuse kirje | ainult need artefaktid, mida PR muudab; ülejäänud `SKIP reason=pr-mode`; erinevuse aluse puudumisel → hinnatakse iga artefakti (vaikimisi tagasilükkav)                                                                            |
| README SVG-de baitide võrdluse testid (`tests/unit/docs/readme-*-svg.test.ts`)      | iga SVG                                                                              | ainult SVG, mida PR muudab, kui alus lahendub; `test-unit`i pinnapealses PR-i väljavõttes alus puudub, seega jäetakse test seal vahele teatega `SKIP reason=base-unresolved` ja võrdluse eest vastutab `check:generated-artifacts` |
| e2e ajastuste täielikkus (`tests/unit/balance-e2e-shards.test.ts`)                  | igal spetsifikatsioonil peab olema kirje                                             | sama reegel nagu SVG-testide puhul (uus spetsifikatsioon käivitatakse mediaankaaluga)                                                                                                                                              |
| `check-quality-ratchet.mjs --require-tighten`                                       | lähteväärtusse kandmata paranemine nurjub (välja arvatud `_policy`)                  | paranemisest teatatakse, kuid see ei põhjusta kunagi nurjumist; regressioon põhjustab endiselt nurjumise                                                                                                                           |

Release-režiim säilitab nende kontrollide varasemad hinnangud, väljumiskoodid ja sõnumid; lisada võidakse kõige rohkem
üks rida, mis nimetab lahendatud režiimi (`[agent-skills-sync] mode=release (auto: local run)`).
Testid jäetakse `node:test`-i suvandi `{ skip: releaseOnlyUnlessTouched(...) }` kaudu vahele; `check:test-masking`
loetleb selle ainult aruandluse plokis (see ei ole ei `.skip(` ega `{ skip: true }`, seega
ei lähe see arvesse sunnitud vahelejätmisena). `check:generated-artifacts` käivitatakse seal, kus alus on lahendatav: töö
`lint` (`fetch-depth: 0`) käivitab selle kohe pärast `check:agent-skills-sync`. Kohapeal
näitab `npm run check:generated-artifacts -- --mode=pr`, mida see samm PR-i puhul hindab. `check:docs-counts`-i
pakkujate koguarvu ristkontroll („Provider reference total (doc vs live modules)”) kuulub loenduste väravasse ja järgib
selle värava enda režiime.

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
