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

## Uksuste laovarud ja käivitamisprofiilid

### Kandidaadi vastuvõtt

CI ja Quality Gates töövood igaüks annavad stabiilse otsuse: `Gate / CI` ja `Gate / Quality`. Nende versioonitud vastuvõtupoliitikka loetleb iga ülesvoolu töö nõutava või soovituslikuna. Kõigepealt peab nõutav töö edukalt lõpetama: puuduv, katkestatud, vahele jäetud, ootel ja teadmata tulemused ei või tagada PASS-i. Kehtiv docs-only või catalog-only klassifikatsioon võib teha koodiraja kehtetuks; mustandi PR ei ole aktsepteeritud kandidaat. `hotfix` silt ei tühista tõendit.

Mõlemad töövood hõlmavad PR-sid main/release harudele, `main`-ile suunatud push-käske, manuaalseid käivitusi ja merge-group sündmusi. Push, dispatch ja merge-group käivad täieliku valiku. Push-id `release/**` ei käivita neid (2026-10-18): iga muu juba käis läbi maatriksi oma PR-s ja ühendatud kombinatsioon on Release-Green'i ülesanne (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forked ja merge group kasutavad hosted runnereid töödele, mis muidu valivad self-hosted runnereid; enne rakendamist tuleb kinnitada piisav hosted võimsus.

Iga JSON kviitung identifitseerib checkout SHA, töövoo käigu ja katse. CLI lükab tagasi SHA vastavuse puudumise checkout ja vahel. Töövood testid seostavad poliitika liikmelisuse otsustöö `needs` nimekirjaga, et uus või eemaldatud raja ei saaks vaikselt kaduda. Kviitingud hõlmavad oma töövood, mitte avaldamist, juurutust või olemasoleva nõuandliku skänneri sisemust. Mõlemate kontrollinimide aktiveerimine reeglites on eraldi haldusmuudatus; nende tööde lisamine ei kaitse haru ise.

### staatilise skaneerimise laovarud

Versioonitud npm-aliase laovarud ja staatilise skaneerimise liikmed asuvad `config/quality/gate-manifest.json`. Käivita `npm run check:gate-manifest`, et valideerida skriptinimesid ja täpseid käske `package.json` suhtes; lisandused, eemaldused ja käske muutvad muutused läbikukkuvad nii kohalikus hoos kui ka CI-s klassifitseerimistöödes. Alias ei ole töövoo töö, maatriksi eksemplar ega testjuhtumi: neid arve ei toodaks kui vahetuvaid.

Kasuta `npm run quality:scan -- --list` või `npm run quality:scan:fast -- --list`, et vaadelda valitud aliaseid ilma neid käivitamata. Käivitaja kutsub npm sisendpunkti, seega säilib selle käitusaeg (sh Bun, kui konfigureeritud). Manifest salvestab aliased väljastpoolt neid profiile eraldi käivitatud, ja hoolduskäske on keelatud kirjutuskaitstud skaneerimisprofiilides.

Need profiilid hõlmavad vaid staatilist skaneerimist. Nad ei sertifitseeri toote teste, katvust, pakendamist, välist kontrolli ega kandidaati täielikku vastuvõttu. Töövoo vastuvõtt kasutab seotud `config/quality/admission-policy.json` ja `scripts/quality/admission-verdict.mjs`. Release-observer profiilid jäävad eraldi; vaadelda nende kohaldatavaid kontrole ja kviitinguid eraldi. Järgnev proosapõhine laovarud on viide, mitte tõend, et värav tegelikult käis.

Skriptid asuvad `scripts/check/` (poliitikaväravad) ja `scripts/quality/` (ratcheti mootor). CI tõepõhjane allikas on `.github/workflows/ci.yml`.

### Release PR kiirtee (`quality.yml`)

`.github/workflows/quality.yml` täiendab CI-d main/release PR-sidel, `main`-ile suunatud push-käskudel, dispatch ja merge group sündmustel. PR-d kasutavad teepõhist kiirkontrolli. Permanentselt keelatud duplikaat ehitus eemaldati; tegelikud ehitus/pakendamis/käivitus kontrollid jäävad CI-sse.

| Töö                                              | Ulatus                                                                                                                                                                                           | Blokeeriv      |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `Docs Gates (fast-path)`                         | Dokumentide/koodi PR-d; API dokumendi viited ja docs-all                                                                                                                                         | Jah            |
| `Fast Quality Gates`                             | Koodi PR-d; staatilised kontrollid, typecheck, dashboard typecheck, mõjutatud ühikud                                                                                                             | Jah            |
| `Forgotten sibling tests`                        | Koodi PR-d; muutunud moodulid, jälitatud staatilistele tarbijatele ja kandidaatidele; barrel ja dünaamilise importi teed teavitatakse nõuandlike diagnostikana, viidatud lubamislisti eranditega | **Nõuavaldus** |
| `Vitest (fast-path)`                             | Koodi PR-d; kiire vitest komplekt                                                                                                                                                                | Jah            |
| `Unit Tests fast-path`                           | Koodi PR-d; 4-osaline ühikute komplekt                                                                                                                                                           | Jah            |
| `No new ESLint warnings`                         | Koodi PR-d; keelamisest teadlik lint kaitse                                                                                                                                                      | Jah, ka forked |
| `Merge integrity (changelog + generated skills)` | Mustandivabad PR-d; changelog ja genereeritud oskuste sünkroonimine                                                                                                                              | Jah, ka forked |

#### Unustatud nõo testide aruanne

`npm run check:forgotten-sibling-tests` kasutab testi mõju kaardi taga olevat impordi lahendajat.
Iga muudetud tootmismooduli puhul teatab see deterministlikud
`changed module/symbol -> static consumer -> candidate sibling test` ahelad, kui kandidaattest
puudub pull-request'i diffist. Markdowni kokkuvõte ja JSON-tulemus säilitatakse
`forgotten-sibling-tests` töövoo artefaktina kalibreerimiseks enne mis tahes blokeerivat kasutuselevõttu.

Barrel-taasekspordid ja dünaamilised impordid on ainult lahendamise diagnostika; need ei loo kunagi
blokeerivat leidu. Ülevaadatud erandid asuvad failis
`config/quality/forgotten-sibling-allowlist.json`. Iga kirje peab nimetama tarbija ja kandidaattesti,
andma konkreetse põhjenduse ning linkima GitHubi issue või pull requesti. Vorminguliselt vigased kirjed
ebaõnnestuvad suletud olekus. Erandid ei saa summutada kustutatud kandidaattesti ega diffi, mis lisab `.skip`/`.todo`;
väidete nõrgendamine ja muu maskeerimine jäävad iseseisvalt blokeeriva
`check:test-masking` värava vastutusalasse.

### Töö: `lint`

Käivitub igal PR-il, mis on suunatud `main`-i. Blokeerib ühendamise ebaõnnestumisel.

| Script (`npm run ...`)            | Valideerib                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Blokeeriv                                |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`              | Node.js versioon on toetatud vahemikus                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Jah                                      |
| `check:cycles`                    | Ringikujulised importid kogu `src/` + `open-sse/` ulatuses (AST-põhine, tsconfig `paths` lahendatud). Bare väljub koodiga 1 alati, kui mõni tsükkel eksisteerib (fail-closed alates #15281), ja loetleb SCC-d. `check:cycles:ratchet` (mida CI käivitab) blokeerib, kui arv ületab `quality-baseline.json`-is oleva `metrics.cycles` ülempiiri — praegu 14, `direction: down`, seega saab see ainult langeda (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jah (ratchet)                            |
| `check:boundary`                  | `open-sse → src` sidusus: unikaalsed failist-faili importid mootorist rakendusse (`scripts/quality/measure-boundary.mjs`; servade nimekiri on v4 tuuma/mooduli jaotamise parandusjärjekord). Bare = nõuandev raport (sama mis `quality:boundary`). `check:boundary:ratchet` (mida CI käivitab, samuti `quality.yml` fast-gates ratchet-tsüklis) blokeerib, kui arv ületab `quality-baseline.json`-is oleva `metrics.boundaryOpenSseToSrc` ülempiiri — seemendatud mõõdetud 771 juures, `direction: down`; `--update` ainult langetab seda; PR-ide puhul baasi suhtes (`--base-ref`, vt allpool)                                                                                                                                                                                                                                                                                                                                                     | Jah (ratchet)                            |
| `check:route-validation:t06`      | Zod-skeemid on olemas kõigil marsruutidel (6. taseme poliitika)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jah                                      |
| `check:any-budget:t11`            | `@ts-expect-error // any` arv ei ületa eelarvet (11. taseme ratchet)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Jah                                      |
| `check:provider-consistency`      | Igal teenusepakkujal failis `providers.ts` on vastav kirje failis `providerRegistry.ts` (ja vastupidi, lubatud loendi piires)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jah                                      |
| `check:model-lifecycle`           | Kolm käsitsi hooldatavat marsruutimistabelit püsivad kooskõlas repos oleva elutsükli hetktõmmisega (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ei hinda ühtegi kasutusest kõrvaldatud id-d, mida `REGISTRY` suudab marsruutida; iga `BUILT_IN_ALIASES` sihtmärk on olemas `REGISTRY`-s ja puudub kasutusest kõrvaldatud id-de hetktõmmisest; iga kasutusest kõrvaldatud id, mis on endiselt `REGISTRY`-s, on edasi suunatud või loetletud `allowedRetiredInCatalog`-s; ja ükski `DEFAULT_DEGRADATION_MAP` allikas ega sihtmärk ei ole selles hetktõmmises kasutusest kõrvaldatuna näidatud. See ei tõesta, et mudelit teenindab praegu aktiivne ülemvool. Võrguühenduseta — võrdleb failiga `config/quality/model-lifecycle.json`, mida värskendatakse käsitsi käsuga `npm run quality:refresh-model-lifecycle` (vajab võrku; pole CI-sse ühendatud). `allowedRetiredInCatalog` on vähendamise ratchet: lisa kirje ainult koos jälgimisülesandega. | Jah                                      |
| `check:fetch-targets`             | Iga `fetch("/api/...")` kliendipoolses `src/`-is laheneb tegelikuks `route.ts`-ks                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Jah                                      |
| `check:deps`                      | Kõik `npm install`-itavad sõltuvused kõigis repo `package.json`-ides on failis `dependency-allowlist.json`; uued kinnitamata või slopsquatted paketid märgitakse                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Jah                                      |
| `audit:deps`                      | `npm audit` (juur + electron) — pole kõrge/kriitilise taseme hoiatusi (kattub osv `check:vuln-ratchet`-iga; vt ratsionaliseerimise jääkloend)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jah                                      |
| `check:lockfile`                  | `package-lock.json` terviklikkus — https-register, terviklikkuse räsid, hosti ülekirjutusi pole                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jah                                      |
| `check:licenses`                  | SPDX-litsentside lubatud loend tootmissõltuvustele                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Jah                                      |
| `check:tracked-artifacts`         | Pole ehitusartefakte / commititud `node_modules` sümbollinke (jookseb ka husky pre-commit'is; pre-push on teadlikult kerge — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Jah                                      |
| `check:ai-attribution`            | Pole AI/boti `Co-Authored-By` trailerit ega AI-genereerimise jalust PR-i commit'ides, pealkirjas ega sisus — Hard Rule #16 (`quality.yml`i kiirväravate tsüklis PR→`release/**` jaoks — loeb sündmuse payload'i, väljaspool PR-e no-op — ning ainult PR-idele mõeldud samm `ci.yml` lint'is PR→`main` jaoks; ka husky `commit-msg` konks; inimkaasautorid on lubatud; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:vitest-exclusions`         | Iga Vitesti väljajätt nimetab jälgimisissue ja esineb failis `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jah                                      |
| `check:file-size`                 | Lähtefailid (`.ts`/`.tsx` kaustades `src/`, `open-sse/`, `electron/`, `bin/`) püsivad `cap`i piires ja testfailid (`*.test.ts(x)`) `testCap`i piires; failid, mis on külmutatud failis `file-size-baseline.json` (`frozen` / `testFrozen`), ei tohi kasvada üle nende registreeritud suuruse                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Jah                                      |
| `check:error-helper`              | Täitjates/käsitlejates olevad veavastused kasutavad funktsioone `buildErrorBody()` / `sanitizeErrorMessage()` (range reegel #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Jah                                      |
| `check:migration-numbering`       | Migratsioonide SQL-failid on järjestikku nummerdatud, lünki ega duplikaate pole                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jah                                      |
| `check:public-creds`              | Väljaspool `publicCreds.ts` ei ole sõnasõnalisi OAuthi `client_id`/`client_secret` ega Firebase'i veebivõtmeid (range reegel #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Jah                                      |
| `check:db-rules`                  | Väljaspool `src/lib/db/` mooduleid ei ole toor-SQL-i; `localDb.ts`-st ei tehta barrel-importe (range reeglid #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Jah                                      |
| `check:known-symbols`             | Pakkujate täitjad, marsruutimisstrateegiad ja tõlkijad, mis on registreeritud oma dispetšitabelites, vastavad kettal olevatele failidele — orbe ega deklareerimata sümboleid ei ole                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Jah                                      |
| `check:route-guard-membership`    | Iga marsruut, mis käivitab alamprotsessi, on liigitatud funktsiooniga `isLocalOnlyPath()` (range reeglid #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Jah                                      |
| `check:test-discovery`            | Iga `*.test.ts` / `*.spec.ts` fail repos kogutakse vähemalt ühe testijooksja poolt (ratchet: orbfailide nimekiri failis `test-discovery-baseline.json` saab ainult lüheneda)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Jah                                      |
| `check:test-tla-order`            | Ükski `node:test` fail kataloogis `tests/unit` ei järgi mustrit, kus test registreeritakse, jõutakse ülatasandi `await`-ini ja registreeritakse seejärel veel (#18045; ratchet: `test-tla-order-allowlist.json` saab ainult väheneda)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Jah                                      |
| `check:agent-skills-sync`         | Genereeritud agent-skills artefaktid vastavad oma lähtekataloogile (triivi pole)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | Pakkuja logodel/varadel on kirjendatud päritolukirje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `lint:json`                       | JSON-konfiguratsioonifailid parsitakse ja vastavad repo lintimisreeglitele                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `typecheck:core`                  | TypeScripti kompileerimine vigadeta (ainult nõuandvad hoiatused)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Jah                                      |
| `typecheck:noimplicit:core`       | Range `noImplicitAny` — tulevikku suunatud; paljud varemolevad kutsekohad vajavad endiselt annotatsioone                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | **Nõuandev** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, mis on piiratud kaustaga `src/app/(dashboard)/**` (#7033) — `typecheck:core`'i kureeritud 27 faili lubatud loend ei sisalda ühtegi töölaua TSX-faili ja ka `next build` ei tee sellele kunagi tüübikontrolli (`next.config.mjs` määrab `ignoreBuildErrors: true`), seetõttu olid seal esinevad orvuks jäänud identifikaatorite regressioonid (#6625/#6909) CI-le nähtamatud. Erinevusi võrreldakse külmutatud failipõhise/TS-koodipõhise loendusbaasjoonega (`config/quality/dashboard-typecheck-baseline.json`, sama aegunud jõustamise muster nagu `check:known-symbols`) — värav ei lase läbi ainult UUSI vigu, mis ületavad baasjoone loenduse; kui varasem viga on parandatud, langeta ratchet'it valikuga `--update`.                                                                                                                                                                                                                  | Jah                                      |

### Töö: `quality-gate`

Käivitub pärast `test-coverage`'i. Blokeerib liitmise ebaõnnestumise korral.

| Skript                       | Valideerib                                                                                                                                                                                | Blokeeriv                   |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `quality:collect`            | Väljastab `quality-metrics.json` (ESLinti hoiatuste arv, katvus ühendatud shardi raportist)                                                                                               | Jah (ratchet'ist ülesvoolu) |
| `quality:ratchet`            | Iga mõõdik `quality-baseline.json`is ei ole regresseerunud (ESLinti hoiatused ≤ baasjoon; katvus ≥ baasjoon)                                                                              | Jah                         |
| `check:duplication`          | Koodi duplikaadid (jscpd@4) ei ületa `quality-baseline.json`is olevat baasjoont                                                                                                           | Jah                         |
| `check:complexity`           | Failitasandi tsüklomaatiline keerukus ei ületa ülempiiri (ESLinti tuuma `complexity` + `max-lines-per-function`)                                                                          | Jah                         |
| `check:cognitive-complexity` | Kognitiivse keerukuse ratchet (`eslint-plugin-sonarjs`) — eraldi ESLinti läbiminek; CI käitab mõlemad ühendatult ühe sammuna `check:complexity-ratchets`                                  | Jah                         |
| `check:dead-code`            | Kasutamata eksportide/failide ratchet (knip) ei regresseeru baasjoonega võrreldes                                                                                                         | Jah                         |
| `check:compression-budget`   | Kokkusurumise võrdlusaluse eelarve — mootoripõhised tokeni kokkuhoiu alampiirid ei tohi regresseeruda                                                                                     | Jah                         |
| `check:type-coverage`        | Tüübistatuse protsendi ratchet (`type-coverage`) ei regresseeru; hõlmab suuresti `typecheck:noimplicit:core`                                                                              | Jah                         |
| `check:codeql-ratchet`       | Avatud CodeQLi hoiatuste arv ei regresseeru (loetakse `gh api` kaudu; ilma tokenita jäetakse sujuvalt vahele) — värskendamise sagedus ja käsitsi käivitamine: vt allpool „CodeQL ratchet” | Jah                         |

### Töö: `quality-extended`

Kogu töö on nõuandev (`continue-on-error: true`). npm-põhised ratchet'id jooksevad
päriselt; välised skannerid paigaldatakse `gh release download` kaudu ja jätavad enda
vahele (väljumiskood 0), kui binaarfail puudub.

| Skript                   | Valideerib                                                                                                                                                                                                              | Blokeeriv                                            |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `check:circular-deps`    | Ringsõltuvusi ei ole (dpdm)                                                                                                                                                                                             | **Nõuandev**                                         |
| `check:bundle-size`      | Paketi suurus ei ületa ülempiiri                                                                                                                                                                                        | **Nõuandev**                                         |
| `check:secrets`          | Saladuste skaneerimine (gitleaks) — jäetakse vahele, kui binaarfail puudub                                                                                                                                              | **Nõuandev**                                         |
| `check:vuln-ratchet`     | Sõltuvuste haavatavused (osv-scanner) ei regresseeru — jäetakse vahele, kui binaarfail puudub                                                                                                                           | **Nõuandev**                                         |
| `check:workflows`        | Töövoogude lint (actionlint + zizmor); puuduvad/katkised skannerid, kehtetud raportid või puuduv ratcheti baasjoon ebaõnnestuvad olekuga INCOMPLETE. Kehtivad leiud järgivad valitud range/nõuandva/ratcheti poliitikat | Käivitamine nõutud; zizmor ratchet on CI-s blokeeriv |
| `check:openapi-breaking` | Avaliku API lepingu (`openapi.yaml`) ühilduvust rikkuvad muudatused võrreldes baasharuga (oasdiff) — väljastab `openapiBreaking=N`; jäetakse vahele, kui oasdiff puudub või baasspetsifikatsiooni ei suudeta lahendada  | **Nõuandev**                                         |

### Töö: `docs-sync-strict`

Käivitub iga `main`i suunatud PR-i puhul. Blokeerib liitmise ebaõnnestumise korral.

| Skript                         | Valideerib                                                                                                                                                                       | Blokeeriv                 |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `check:docs-all`               | Metavärav, mis käivitab allolevad 6 alamväravat järjestikku                                                                                                                      | Jah                       |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt versioonide kooskõla                                                                                                                               | Jah                       |
| ↳ `check:docs-counts`          | Proosateksti arvud (pakkujate arv, migratsioonide arv jne) jäävad tegelike arvude kohandamisakna piiresse                                                                        | Jah                       |
| ↳ `check:env-doc-sync`         | Kõik `.env.example`-is olevad keskkonnamuutujad on dokumenteeritud dokumentatsiooni tabelis ja vastupidi                                                                         | Jah                       |
| ↳ `check:deprecated-versions`  | Dokumentatsioonis ei ole aegunud versioonistringe                                                                                                                                | Jah                       |
| ↳ `check:doc-links`            | Dokumentatsiooni sisemised Markdowni lingid viitavad olemasolevatele failidele (`[text]`/`(path)` vorm)                                                                          | Jah                       |
| ↳ `check:fabricated-docs`      | Dokumentatsioonis viidatud marsruudid, keskkonnamuutujad, CLI-käsud, hook'ide nimed ja failiteed on koodibaasis olemas. Rangelt blokeeriv `--strict`-iga; liputa nurjub pehmelt. | Jah (`--strict`-iga CI-s) |
| `check:cli-i18n`               | CLI-käsustringid on olemas kõigis i18n lokaalifailides                                                                                                                           | Jah                       |
| `check:openapi-coverage`       | OpenAPI spetsifikatsioon hõlmab vähemalt tegelike marsruutide kohandatud miinimumi                                                                                               | Jah                       |
| `check:openapi-security-tiers` | `openapi.yaml`-i turvataseme annotatsioonid on kooskõlas `routeGuard.ts`-i klassifikatsioonidega                                                                                 | **Soovituslik**           |
| `check:openapi-routes`         | Iga `openapi.yaml`-i tee viitab tegelikule `route.ts`-ile (hallutsinatsioonivastane kontroll)                                                                                    | Jah                       |
| `check:docs-symbols`           | Iga `/api/...` viide kaustas `docs/**/*.md` viitab tegelikule `route.ts`-ile (hallutsinatsioonivastane kontroll)                                                                 | Jah                       |
| `i18n translation drift`       | Tõlkimata võtmed i18n lokaalifailides — ainult hoiatus                                                                                                                           | **Soovituslik**           |

Kaksteist README SVG-d kaustas `docs/diagrams/` genereeritakse (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` genereerib need kõik uuesti). Igal neist on baidivõrdluse ühiktest
(`tests/unit/docs/readme-*-svg.test.ts`, töö `test-unit`), mis nurjub, kui versioonihalduses olev fail
on aegunud, ning `check:docs-counts` loeb kanoonilised arvud nende `<text>`-sõlmedest — seepärast ei
teisendata arve radadeks. SVG kanooniliste arvude kontroll loeb faile, mis on loetletud muutujas
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, samuti `public/images/tier-flow-dark.svg` ja `tier-flow-light.svg`;
väited free-forever, catalog-entry, recurring-pool ja scoring-factors loevad lisaks faile
`promise-pillars.svg`, `free-tier-budget.svg` ja `strategies-grid.svg`. `free-tier-budget.svg`
hangib oma arvud aktiivsest kataloogilaadurist, seega `FREE_MODEL_BUDGETS`-i või pakkuja kuvatava nime
muudatus põhjustab CI-s tõrke, kuni see fail uuesti genereeritakse.

### Töö: `i18n-ui-coverage`

| Skript                            | Valideerib                                                                                                                                                                                         | Blokeeriv       |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (inline) | UI i18n-võtmete katvus on ≥ 65%                                                                                                                                                                    | Jah             |
| `check-ui-value-drift` (inline)   | Ümberkirjutatud ingliskeelne **väärtus** ei jäta maha aegunud tõlget                                                                                                                               | Jah             |
| `check-new-key-coverage` (inline) | **Uus** ingliskeelne võti on tõlgitud igas lokaalis — marker `__MISSING__:` lükatakse tagasi                                                                                                       | Jah             |
| `check-translation-ratio`         | Lokaalipõhine tegeliku tõlke suhtarv (inglise keelega identne / kohatäide / puuduv kirje väljaspool lubatud loendit) ei tohi ületada faili `config/quality/i18n-translation-baseline.json` + lõtku | **Soovituslik** |

Vajab `fetch-depth: 0` — väärtuse muutumise värav võrdleb `en.json`-i ühise lähtepunktiga.

#### `check-ui-value-drift` — aegunud tõlke värav

Tabab ainsa i18n-regressiooni, mida teised väravad struktuurselt tuvastada ei suuda: ingliskeelne väärtus
kirjutatakse ümber ja _eelmise_ ingliskeelse väärtuse põhjal loodud tõlked jäävad muutmata, mistõttu
muukeelsed kasutajad loevad edasi enesekindlas toonis, kuid nüüd valesid tekste.

See jõudis päriselt kasutusse. `oauthModal.googleOAuthWarning` kirjutati Antigravity
sisselogimisabilise lisamisel ümber (#5203); **39 43-st lokaadist** säilitasid teksti, mis käskis operaatoritel „kopeerida
täielik URL ja kleepida see allolevale väljale” — voog, mida selle teenusepakkuja puhul ei saa lõpule viia. See
jäi märkamata kuni #8463-ni, sest:

- `sync-ui-keys` täidab tagasi ainult võtmeid, mis on **puudu**, mitte neid, mis on **aegunud**;
- `check-ui-keys-coverage` loendab võtmete _olemasolu_, seega läheb aegunud tõlge kaetuna arvesse;
- `check-translation-drift` jälgib dokumentatsiooni peegleid `docs/i18n/<locale>/**.md` —
  see ei loe kunagi faile `src/i18n/messages/*.json`. Alates 2026-09 uuestisünkroonimisest blokeerib see töös `docs-sync-strict`:
  põhidokumendi muutmisel käivita `npm run i18n:run -- --files=<doc>` (jaotise tasemel, odav).

**Diff-teadlik, mitte baasjoonepõhine.** See võrdleb ühinemisbaasis olevat `en.json`-i
tööpuuga; iga võtme puhul, mille ingliskeelne väärtus muutus, on muutmata tõlget hoidev lokaadikirje aegunud. See külmutab teadlikult
**olemasoleva võla** — diff ei saa paljastada, millisest vanast ingliskeelsest väärtusest pikaajaliselt säilinud tõlge pärines, seega hindab värav
ainult seda, mida praegune muudatus puudutab. Alternatiiv — võtmekohane räsi baasjoonena — tekitaks umbes 600 KB suuruse genereeritud faili,
mis oleks 3× suurem kui suurim olemasolev baasjoon ja muutuks iga i18n-i PR-iga.

Selle nõude täitmiseks on kaks võimalust:

1. uuenda mõjutatud tõlked või
2. määra neile väärtuseks `__MISSING__:<new english>` — käitusaeg esitab seejärel parandatud ingliskeelse teksti
   (`src/i18n/request.ts::deepMergeFallback`, #7258) ja võti lisatakse tõlkimisjärjekorda.

Kui stringi **tähendus** muutus, eelista **võtme ümbernimetamist**: uus võti ei saa aegunud tõlget pärida.
Just seda mustrit kasutati muudatuses #8463.

```bash
npm run i18n:check-value-drift          # range (mida CI käivitab)
npm run i18n:check-value-drift:warn     # ainult raporteerib
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Lõpetab koodiga 0 ja väljastab `SKIP reason=base-unresolved`, kui baas-kataloogi ei saa lugeda (madalkloon,
milles baasviide puudub), järgides `check-openapi-breaking`-i põhimõtet.

### Töö: `i18n`

Täielik i18n-i valideerimismatriits (üks töö lokaadi kohta). Kogu töö on nõuandev.

| Skript                          | Valideerib                     | Blokeeriv                                               |
| ------------------------------- | ------------------------------ | ------------------------------------------------------- |
| `validate_translation.py quick` | Tõlke täielikkus lokaadi kohta | **Nõuandev** (`continue-on-error: true` kogu töö kohta) |

### Töö: `pr-test-policy`

Käivitatakse ainult tõmbetaotluste korral.

| Skript                 | Valideerib                                                                                                                                             | Blokeeriv |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `check:pr-test-policy` | Tootmiskoodi muudatustega PR-id kataloogides `src/`, `open-sse/`, `electron/` või `bin/` peavad sisaldama teste või teste uuendama (range reegel nr 8) | Jah       |
| `check:test-masking`   | Muudetud testifailid ei vähenda väidete koguarvu ega lisa `assert.ok(true)`-taolisi tautoloogiaid                                                      | Jah       |
| `check:pr-evidence`    | PR-i kirjeldus viitab muudatuse testide/VPS-i tõenditele (rakendab ranget reeglit nr 18, otsides PR-i tekstist märksõnu — habras, vt tööde nimekiri)   | Jah       |

### Töö: `test-vitest`

Käivitatakse pärast `build`-i. Tõrke korral blokeerib ühendamise.

| Testikomplekt    | Valideerib                                                          | Blokeeriv                                                                                                         |
| ---------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-server (110 tööriista), autoCombo, vahemälu — vitesti käivitaja | Jah                                                                                                               |
| `test:vitest:ui` | Kasutajaliidese komponentide testid — vitesti käivitaja             | **Blokeeriv** — olemasolevad tõrked on `vitest.config.ts`-is selgesõnaliselt välistatud; uued tõrked nurjavad töö |

### Öised töövood (ajakava alusel, nõuandvad)

Need käivitatakse cron-ajakava alusel (ja `workflow_dispatch`-iga), mitte kunagi PR-ide korral. Kõik on nõuandvad.

| Töövoog                | Valideerib                                                                                                                                                                  | Blokeeriv    |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | fast-checki omaduspõhised testid juhusliku seemnega + suur käivituste arv                                                                                                   | **Nõuandev** |
| `nightly-resilience`   | heap-kasvu värav, kaoslik rikkeinjektsioon, k6 koormus-/vastupidavustestid                                                                                                  | **Nõuandev** |
| `nightly-llm-security` | promptfoo injektsioonikaitse (blokeeriv režiim) + garak sondid (jätetakse vahele ilma teenusepakkuja saladuseta)                                                            | **Nõuandev** |
| `nightly-schemathesis` | OpenAPI lepingu fuzzimine (schemathesis) töötava OmniRoute'i vastu, kasutades `docs/openapi.yaml` — toob esile spetsifikatsioonirikkumised / käsitlemata 500-d (Fase 8 B.4) | **Nõuandev** |
| `nightly-mutation`     | Strykeri mutatsioonitestimise skoor kiire ühikutestide raja ulatuses — ellujäänud mutantid toovad esile nõrgad väited                                                       | **Nõuandev** |
| `nightly-compat`       | Node'i mootori ühilduvusmaatriks toetatud `engines.node` vahemike lõikes                                                                                                    | **Nõuandev** |

Jõudluse baasnäitajad (heap, TTFB, ehitusaeg) registreeritakse, mitte ei rakendata väravana: vt [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Kiirusefaas (2026-08-30 → v4.0 LTS): iga lähtetaset lõdvendati 20%

Omaniku otsus (2026-08-30): kuni v4.0 modulariseerimiseni on tarnimiskiirus olulisem
kui tehnilise võla piiri hoidmine. Iga **numbrilist** astmelise kontrolli lähtetaset lõdvendati ühe
auditeeritava toiminguga 20% ning faas on deklareeritud failis `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Mis muutus                                                                                                                                                                                           | Kus                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — väiksem-on-parem arvud ×1.2, suurem-on-parem protsendid ÷1.2 (katvuse alampiiriks jäi 60, `eslintErrors` jääb väärtusele 0, `eslintWarnings` 0 → 20% külmutatud erandite arvust) | `quality-baseline.json` (märkus `_relax_velocity_2026_08_30` loetleb kõik enne → pärast väärtused)     |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                     | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, iga `frozen[*]` / `testFrozen[*]` rea ülempiir ×1.2                                                                                                                                | `file-size-baseline.json`                                                                              |
| failipõhised / TS-koodi põhised arvud ×1.2                                                                                                                                                           | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                  | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` muutub soovituslikuks, kui `_policy.requireTighten === false`                                                                                                                    | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| igaöine `bank-ratchet-shrinks` peatatakse (see talletaks mõõdetud vähenemise ja tühistaks puhvri)                                                                                                    | `.github/workflows/nightly-release-green.yml`                                                          |

Lubatud loendid (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **ei ole** eelarved ja neid ei muudetud. Läbitud/nurjunud olekuga poliitikakontrollid (saladused, SQL-i reeglid,
dokumentatsiooni/keskkonna leping, i18n-i vastavus, ühiktestid) ei muutu — nurjunud test on endiselt nurjunud test.

**Tööriistad**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — ühekordne
  lõdvendamine (`scripts/quality/relax-baselines.mjs`); keeldub sama märkusega teist korda käivitumast.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mõõdab iga numbrilist kontrolli samamoodi nagu CI ja väljastab iga kontrolli allesjäänud puhvri
  (`scripts/quality/baseline-headroom.mjs`). Igaöine töö `baseline-headroom` avaldab
  tabeli töövoo käivituse kokkuvõttes ja laadib selle JSON-/Markdown-aruande üles artefaktina
  `baseline-headroom-<run_id>`, mida säilitatakse 90 päeva. Hoiatus- ja kriitilised read tähistavad kontrolle,
  mis on oma ülempiirist kuni 10% kaugusel või on selle juba ületanud. Vaadake neid aruandeid
  varajase hoiatusena eelarvete ammendumise kohta; kontrollige probleemi põhjustava kontrolli märkusi
  `_rebaseline_*`. Töö ei loo ega värskenda enam püsivat probleemi; #12149 säilitab varasema
  aruandeajaloo.

**Uue koodi režiim (Clean-as-You-Code) — alates 2026-08-30, ainult PR-i kiirtee**

Sündmuste `pull_request` korral edastab `quality.yml` argumendi `--base-ref <PR base SHA>` käskudele
`check:file-size`, `check:complexity-ratchets` ja `check:dead-code`. Kontrollide
`check:complexity-ratchets` ja `check:dead-code` puhul võrdleb kontroll HEAD-i ühendamisbaasiga,
**piirdudes failidega, mida PR muutis** (`scripts/check/newCodeMode.mjs`: ühendamisbaas materialiseeritakse
ajutises `git worktree`-s, ESLint/knip käivitatakse seal ja HEAD-is ning failipõhiste arvude erinevused leitakse):

- **blokeeriv** — PR lisas muudetud failidesse tsüklomaatilise/kognitiivse keerukuse rikkumisi või surnud eksporte
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` logis);
- **soovituslik** — globaalne koguarv võrreldes külmutatud lähtetasemega. Päritud kõrvalekalle ei muuda
  süütut PR-i kunagi nurjunuks; kõrvalekalle külmutatakse väljalaske kooskõlastamisel uuesti ja puhvrikontroll jälgib seda.

`check:file-size` kasutab baasviidet oma reeglite järgi (`scripts/check/check-file-size.mjs`, #8522):
see kontrollib puus iga lähtekoodi- ja testifaili, loeb käsuga `git show` iga faili ridade arvu PR-i baasis
ning märgib faili nurjunuks ainult siis, kui see kasvab suuremaks oma lähtetaseme ülempiirist
(`frozen` / `testFrozen` või lähtetasemest puuduva faili puhul `cap` / `testCap`) ja baassuurusest.
Seetõttu ei muuda juba baasis kõrvalekaldunud fail süütut PR-i kunagi nurjunuks.

`check:boundary:ratchet` rakendab sama reeglit oma ainsale arvule
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR-i sündmuste korral edastavad nii
`quality.yml`-i kiirkontrollid kui ka `ci.yml`-i lintimistöö PR-i baasi SHA, baaskommitit
mõõdetakse `git archive`-i ekspordist ning PR ebaõnnestub ainult siis, kui selle `open-sse → src` servade
arv ületab väärtustest `metrics.boundaryOpenSseToSrc` ja baasi servade arv suurema.
Ülempiiri ületav baasi triiv raporteeritakse (`päritud baasi triiv`), kuid see ei muuda süütut PR-i
kunagi punaseks; push → main säilitab absoluutse ülempiiri ning lahendamatu baasi SHA korral
võetakse hoiatusega kasutusele absoluutne ülempiir.

`workflow_dispatch`-i käivitustel, väljalaske rohelisuse kontrollil ja igaöisel varuruumi tööl puudub PR-i baas
ning need kasutavad endiselt absoluutset (globaalset) võrdlust. Testikate, duplikaadid ja tüübikate jäävad
praegu globaalseks (nende tööriistad ei võimalda failipõhist erinevust odavalt arvutada) — need on kandidaadid
samaks käsitluseks.

**Faasi lõpetamine versioonis v4.0 (LTS = varasemast rangem, mitte „tagasi tavapäraseks“)**

1. Puhta `release/v4.0.0` tipu peal: dokumenteerimiseks `npm run quality:headroom --json`, seejärel
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` ning iga tüübikontrolli värava
   `--update` — kõik lähtetasemed langetatakse mõõdetud väärtuseni.
2. Kustuta failist `quality-baseline.json` `_policy` (aktiveerib uuesti `--require-tighten`-i ja igaöise
   varuruumi kogumise), taasta failis `check-openapi-coverage.mjs` `THRESHOLD = 36` (või suurem).
3. Karmista piiranguid mõõdetust enam seal, kus modulariseerimine end ära tasus: failisuuruse `cap` tagasi väärtusele 1000
   (või 800), testikatte alampiirid +5, surnud ekspordid modulariseeritud pakettides 0.

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

Iga kontroll, mis ei saa olemasolevate rikkumiste tõttu ebaõnnestuda, kasutab fikseeritud lubatud loendit
(nt `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Poliitika on järgmine:

**Parandage algpõhjus; kasutage lubatud loendit ainult siis, kui rikkumine on juba olemas ja
seda ei saa samas PR-is parandada.**

Kirje lisamisel lubatud loendisse:

1. Lisage kommentaar koos põhjendusega.
2. Viidake jälgimisülesandele (nt `// #3498 — 2. etapi funktsioon, pole veel rakendatud`).
3. Eemaldage kirje samas PR-is, mis rikkumise parandab — aegunud kirje, mis enam
   aktiivset rikkumist ei eira, on ise viga (pärast rakendamist nurjab 6A.3 aegunud jõustamise kontroll
   üksiku lubatud loendi kirje korral kontrollvärava läbimise).

**Ärge** lisage lubatud loendisse kirjeid selleks, et testid kiiremini läbiksid. Roheline kontrollvärav koos kasvava
lubatud loendiga loob petliku kvaliteeditunde.

### Kui kontrollvärav teie PR-is ebaõnnestub

1. **Lugege kontrollvärava väljundit hoolikalt** — see ütleb täpselt, milline fail või sümbol
   reeglit rikkus.
2. **Parandage rikkumine** — enamik kontrollväravaid on deterministlikud failisüsteemi kontrollid, mis läbivad testi kohe,
   kui kood on korrektne.
3. **Kui rikkumine on juba olemas** (st teie ei tekitanud seda, kuid kontrollvärav
   nüüd hõlmab seda): lisage lubatud loendisse kirje koos põhjendava kommentaari ja jälgimisülesandega.
4. **Kui kontrollvärav on põrkmehhanism** (koodikate, ESLinti hoiatused, dubleerimine, keerukus):
   teie muudatus halvendas mõõdikut. Parandage algpõhjus või käivitage (harvadel juhtudel)
   `npm run quality:ratchet -- --update`, kui muudatus on tahtlik ja mõõdiku
   halvenemine vastuvõetav — kuid dokumenteerige PR-i kirjelduses põhjus.
5. **Nõuandvad kontrollväravad** (`continue-on-error: true`) on informatiivsed — need ei blokeeri
   liitmist, kuid kuvatakse CI kokkuvõttes. Parandage need sellegipoolest.

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

## Ratsionaliseerimise mahajäämus (ROI ülevaatus — 9. etapp, 3. laine)

See inventuur viidi 2026-06-17 vastavusse failiga `ci.yml` (eelmisest versioonist puudusid
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Kooskõlastatud kogumi ROI ülevaatus
tuvastas järgmised ratsionaliseerimise kandidaadid. **Ühendamised on mehaanilised CI
muudatused; ümberlülitamised/eemaldamised on käitaja otsustada olevad poliitikavalikud.** Midagi alltoodust
pole veel rakendatud.

**Ülalpool on dokumenteerimata ka** (soovituslik, madala signaaliga): töö `docs-lint`
(markdownlint + Vale, kogu tööl `continue-on-error`) ja eraldiseisvad skanneri töövood
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` asub failis
`quality-baseline.json`, kuid pole failis `ci.yml` ühendatud blokeeriva põrkmehhanismiga — mõõdik on
praegu orvuks jäänud.

### Ühendamine / dubleerimise eemaldamine (mehaaniline, väiksem risk)

Iga kandidaati kontrolliti 2026-06-17 aktiivse kontrollvärava oleku suhtes (usalda, kuid kontrolli);
mitu „ilmselget“ ühendamist osutusid varjatud võlga sisaldavaks ega ole **puhtad** asendused.

- **`check:docs-sync` käivitub kaks korda** — eraldiseisvalt töös `lint` ning uuesti `check:docs-all` (`docs-sync-strict`) sees ja husky commit'i-eelses konksus. ✅ **TEHTUD** — eraldiseisev `lint`-käivitus eemaldatud.
- **CVE-skannimine** — ❌ **EI OLE puhas ühendamine.** `audit:deps` nurjub kohe iga kõrge/kriitilise CVE korral; `check:vuln-ratchet` (osv) nurjub ainult baasjoonega võrreldes toimunud _regressiooni_ korral (praegu 1 MODERATE). Semantika on erinev — `audit:deps` eemaldamine kaotaks absoluutse kõrge/kriitilise taseme kontrollvärava. Säilitage mõlemad.
- **Tsüklite tuvastamine** — ✅ **TEHTUD** (#15159 G-01/G-02). Siinne vana tekst nimetas `check:cycles` kontrolli „roheliseks, kureeritud“ kontrollväravaks ja põhjendas selle blokeerivana hoidmist sellega, et `check:circular-deps` (dpdm) tuvastas 91 tsüklit. See roheline tulemus oli **valepositiivne roheline**: `check:cycles` skannis 5 alamkataloogi (450 faili), sobitas ainult staatilisi `import|export … from` konstruktsioone ning jättis välja kõik `@/` ja `@omniroute/open-sse/` spetsifikaatorid, mistõttu ei suutnud see näha dünaamilise impordi ja aliase tsükleid, mis repositooriumis domineerisid. Parandatud: kontrollvärav läbib nüüd kataloogid `src` + `open-sse` (5023 faili), kogub spetsifikaatorid TypeScripti AST-st (seega läheb `import("…")` arvesse, kuid tüübipositsioonis `typeof import("…")` mitte) ning lahendab tsconfigi `paths`-väärtused. See leiab **14** tsüklit, mitte 0. Kuna 14 olemasolevat tsüklit ei saa kontrollvärava PR-is parandada, on `check:cycles` nüüd **põrkmehhanism** (`--ratchet`, ülempiir `metrics.cycles.value = 14` failis `quality-baseline.json`, `direction: down`) — see blokeerib iga _regressiooni_ ja arv saab ainult väheneda. CI käivitab `npm run check:cycles:ratchet`. Vähendamine toimub koos üksusega **A-01**. `check:circular-deps` (dpdm) jääb laiema teise arvamusena soovituslikuks.
- **Keerukus** — ✅ **TEHTUD** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): üks ESLinti läbimine, loendamine `ruleId` järgi, et tsüklomaatilise keerukuse + maksimaalse ridade arvu ja kognitiivse keerukuse baasjooned püsiksid sõltumatuna; eraldiseisvad `check:complexity` / `check:cognitive-complexity` säilivad kohaliku `--update` jaoks.
- **`/api` hallutsinatsioonivastane kontroll** — ✅ **TEHTUD** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): üks `src/app/api` failisüsteemi inventuur, openapi-routes + docs-symbols annavad endiselt aru sõltumatult; eraldiseisvad kontrollid säilivad kohalikeks käivitusteks.
- **`check:node-runtime` käivitub 11 töös** — ⚠️ **madal ROI.** Igaüks kasutab eraldi käitajat ja kontroll võtab <1 s; kogusääst ~10 s, kuid selle hinnaks oleks odava tööpõhise kaitse kaotamine. Muudatuste vaeva ei väärt.
- **`typecheck:noimplicit:core` CI lintimisel** — ✅ **lint-tööst eemaldatud** (oli soovituslik `continue-on-error`); blokeeriv tüübipind on `typecheck:core` + `check:type-coverage`. Kohalik skript säilitati.

### Ümberlülitamine / otsustamine (käitaja poliitika)

- `check:openapi-security-tiers` (soovituslik) — ❌ **EI OLE puhtalt ümberlülitatav.** See lõpetab koodiga 0, kuid hoiatab, et mitmel `traffic-inspector` marsruudil jaotises `LOCAL_ONLY_API_PREFIXES` puudub annotatsioon `x-loopback-only: true`. Selle jõustamiseks tuleb esmalt lisada need annotatsioonid faili `openapi.yaml`.
- `typecheck:noimplicit:core` (soovituslik) — blokeeriv `check:type-coverage` põrkmehhanism katab seda suuresti. Muutke see põrkmehhanismiks või eemaldage üleliigne teine `tsc` läbimine.
- `test:vitest:ui` (nüüd **blokeeriv**) — olemasolevad tõrked on failis `vitest.config.ts` selgesõnaliselt välistatud jälgimiskommentaaridega `// #8618`; uued tõrked nurjavad töö.
- `check:secrets` (gitleaks, blokeeriv põrkmehhanism, mis on külmutatud 3 dokumenteeritud valepositiivse tulemuse juures) — lisage need 3 lubatud loendisse, et jõuda nullini, või alandage kontroll soovituslikuks. Kattub GitHubi sisseehitatud saladuste skannimisega + `check:public-creds`.
- `check:pr-evidence` (blokeeriv, otsib PR-i kirjeldusest teksti) — suur valepositiivsete tulemuste risk; eemaldamine nõrgendaks range reegli nr 18 jõustamist, seega on see tõeline poliitikaotsus.
- `semgrep` (soovituslik eraldiseisev kontroll) — kattub OWASP-i kategooriate puhul CodeQL-iga; ühendage selle baasjoon põrkmehhanismiga või eemaldage.

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
