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

## Kontrollpunktide inventuur ja käivitusprofiilid

### Kandidaatide vastuvõtt

CI ja Quality Gatesi töövood annavad mõlemad stabiilse otsuse: `Gate / CI` ja
`Gate / Quality`. Nende versioonitud vastuvõtupoliitika loetleb iga ülesvoolu töö
kohustusliku või soovituslikuna. Kohaldatav kohustuslik töö peab õnnestuma: puuduv,
tühistatud, vahele jäetud, ootel olev ega tundmatu tulemus ei saa kehtestada PASS-i.
Kehtiv ainult-dokumentatsiooni või ainult-kataloogi liigitus võib muuta koodiraja
mittekohaldatavaks; mustand-PR ei ole aktsepteeritud kandidaat. `hotfix`-silt ei
vabasta tõendite esitamise nõudest.

Mõlemad töövood katavad PR-id main/release-harudesse, tõuked `main`-harusse, käsitsi
käivituse ja liitmisgrupi sündmused. Tõuge, käsitsi käivitus ja liitmisgrupp käivitavad
täisvaliku. Tõuked `release/**`-harudesse neid ei käivita (2026-10-18): iga muudatus
läbis maatriksi juba oma PR-is ja liidetud kombinatsiooni kontrollimine on
Release-Greeni ülesanne (`docs/ops/RUNNER_BOX.md` → Hostitud rada). Forkid ja
liitmisgrupid kasutavad tööde puhul, mis muidu valiksid isehostatud runnerid, hostitud
runnereid; enne kasutuselevõttu tuleb kontrollida piisavat hostitud võimsust.

Iga JSON-kviitung identifitseerib checkout'itud SHA, töövoo käivituse ja katse.
CLI lükkab tagasi checkout'i ja sündmuse SHA mittevastavuse. Töövoo testid seovad
poliitika liikmesuse otsustöö `needs`-loendiga, nii et uus või eemaldatud rada ei saa
vaikselt kaduda. Kviitungid katavad omaenda töövoogu, mitte avaldamist, juurutamist
ega olemasoleva soovitusliku skanneri sisemisi detaile. Mõlema kontrollinime
aktiveerimine haru reeglites on eraldi administratiivne muudatus; nende tööde lisamine
iseenesest haru ei kaitse.

### Staatilise skaneerimise inventuur

Versioonitud npm-aliaste inventuur ja staatilise skaneerimise liikmesus asuvad failis
`config/quality/gate-manifest.json`. Käivitage `npm run check:gate-manifest`, et
valideerida skriptinimed ja täpsed käsud faili `package.json` vastu; lisamised,
eemaldamised ja käskude hälve põhjustavad nii lokaalse hook'i kui ka CI muudatuste
liigitamise tööde läbikukkumise. Alias ei ole töövoo töö, maatriksi instants ega
testjuht: neid koguseid ei tohi esitada omavahel asendatavatena.

Kasutage `npm run quality:scan -- --list` või `npm run quality:scan:fast -- --list`,
et vaadata valitud aliaseid neid käivitamata. Jooksutaja kutsub npm-i sisendpunkti,
seega säilib selle käituskeskkond (sh Bun, kui see on seadistatud). Manifest märgib
nendest profiilidest väljas olevad aliased eraldi kutsutavatena ning hoolduskäsud on
read-only skaneerimisprofiilides keelatud.

Need profiilid katavad ainult staatilist skaneerimist. Need ei kinnita tooteteste,
kattuvust, pakendamist, väliseid kontrolle ega kandidaadi täielikku väljalaske
vastuvõttu. Töövoo vastuvõtt kasutab lingitud faile
`config/quality/admission-policy.json` ja `scripts/quality/admission-verdict.mjs`.
Release-observeri profiilid jäävad eraldi; kontrollige nende kohaldatavaid kontrolle
ja kviitungeid sõltumatult. Allpool olev proosainventuur on viide, mitte tõend, et
kontrollpunkt tegelikult käivitus.

Skriptid asuvad kataloogides `scripts/check/` (poliitika kontrollpunktid) ja
`scripts/quality/` (narremootor). CI tõeallikas on `.github/workflows/ci.yml`.

### Väljalaske-PR-i kiirtee (`quality.yml`)

`.github/workflows/quality.yml` täiendab CI-d main/release-haru PR-idel, tõugetel
`main`-harusse, käsitsi käivitusel ja liitmisgruppidel. PR-id kasutavad
teefiltreeritud kiirkontrolle. Püsivalt keelatud dubleeriv build eemaldati; tegelikud
build-, pakendamis- ja käivituskontrollid on endiselt CI-s.

| Töö                                              | Ulatus                                                                                                                                                                                                             | Blokeeriv                 |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `Docs Gates (fast-path)`                         | Dokumentatsiooni/koodi PR-id; API-dokumentatsiooni viited ja docs-all                                                                                                                                              | Jah                       |
| `Fast Quality Gates`                             | Koodi PR-id; staatilised kontrollid, tüübikontroll, dashboardi tüübikontroll, mõjutatud ühiktestid                                                                                                                 | Jah                       |
| `Forgotten sibling tests`                        | Koodi PR-id; muudetud moodulid jälgitakse staatilistele tarbijatele ja kandidaat-sõsartestidele; barrel- ja dünaamilise impordi teed raporteeritakse soovitusliku diagnostikana koos viidatud allowlist-eranditega | **Soovituslik**           |
| `Vitest (fast-path)`                             | Koodi PR-id; kiire vitest-testikomplekt                                                                                                                                                                            | Jah                       |
| `Unit Tests fast-path`                           | Koodi PR-id; 4 šardiga ühiktestide komplekt                                                                                                                                                                        | Jah                       |
| `No new ESLint warnings`                         | Koodi PR-id; supressiooniteadlik lint-valve                                                                                                                                                                        | Jah, kaasa arvatud forkid |
| `Merge integrity (changelog + generated skills)` | PR-id, mis ei ole mustandid; changelogi ja genereeritud skillide sünkroonimine                                                                                                                                     | Jah, kaasa arvatud forkid |

#### Unustatud sõsartestide raport

`npm run check:forgotten-sibling-tests` kasutab testide mõjukaardi taga olevat importide lahendajat uuesti.
Iga muudetud tootmismooduli kohta esitab see deterministlikud
`changed module/symbol -> static consumer -> candidate sibling test` ahelad, kui kandidaattest
puudub pull request'i diffist. Markdowni kokkuvõte ja JSON-tulemus säilitatakse
`forgotten-sibling-tests` töövoo artefaktina kalibreerimiseks enne mis tahes blokeerivat kasutuselevõttu.

Barrel-taasekspordid ja dünaamilised impordid on üksnes lahendusdiagnostika; need ei tekita kunagi
blokeerivat leidu. Läbi vaadatud erandid asuvad failis
`config/quality/forgotten-sibling-allowlist.json`. Iga kirje peab nimetama tarbija ja kandidaattesti,
andma konkreetse põhjenduse ning viitama GitHubi issue'le või pull request'ile. Vigased kirjed
ebaõnnestuvad suletult. Erandid ei saa alla suruda kustutatud kandidaattesti ega diffi, mis lisab
`.skip`/`.todo`; väidete nõrgendamine ja muu maskeerimine jäävad sõltumatult blokeeriva
`check:test-masking` kontrollipunkti pädevusse.

### Töö: `lint`

Käivitub iga `main`-harusse suunatud PR-i puhul. Ebaõnnestumisel blokeerib liitmise.

| Skript (`npm run ...`)            | Kontrollib                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Blokeeriv                                   |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | Node.js versioon jääb toetatud vahemikku                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Jah                                         |
| `check:cycles`                    | Tsüklilised impordid kogu `src/` + `open-sse/` ulatuses (AST-põhine, tsconfig `paths` lahendatud). Lihtne käivitamine väljub koodiga 1 alati, kui mõni tsükkel eksisteerib (fail-closed-režiim alates #15281), ja loetleb SCC-d. `check:cycles:ratchet` (mida CI käivitab) blokeerib, kui arv ületab faili `quality-baseline.json` `metrics.cycles` ülempiiri — praegu 14, `direction: down`, seega saab see ainult langeda (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Jah (ratchet)                               |
| `check:boundary`                  | `open-sse → src` sidestus: unikaalsed failidevahelised impordid mootorist rakendusse (`scripts/quality/measure-boundary.mjs`; servade loend on v4 core/module-spliti parandustööde backlog). Lihtne käivitamine = soovituslik aruanne (sama mis `quality:boundary`). `check:boundary:ratchet` (mida CI käivitab, samuti `quality.yml` fast-gates ratchet-tsüklis) blokeerib, kui arv ületab faili `quality-baseline.json` `metrics.boundaryOpenSseToSrc` ülempiiri — algväärtuseks on mõõdetud 771, `direction: down`; `--update` ainult langetab seda; PR-ide puhul baasrelatiivne (`--base-ref`, vt allpool)                                                                                                                                                                                                                                                                                                                         | Jah (ratchet)                               |
| `check:route-validation:t06`      | Zodi skeemid olemas kõigil marsruutidel (Tier 6 poliitika)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jah                                         |
| `check:any-budget:t11`            | `@ts-expect-error // any`-de arv ei ületa eelarvet (11. taseme narre)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Jah                                         |
| `check:provider-consistency`      | Igal teenusepakkujal failis `providers.ts` on vastav kirje failis `providerRegistry.ts` (ja vastupidi, lubaloendi piires)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Jah                                         |
| `check:model-lifecycle`           | Kolm käsitsi hooldatavat marsruutimistabelit püsivad kooskõlas repositooriumi kaasas oleva elutsükli hetktõmmisega (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ei anna skoori ühelegi kasutuselt kõrvaldatud id-le, mida `REGISTRY` saaks marsruutida; iga `BUILT_IN_ALIASES`-i sihtmärk esineb `REGISTRY`-s ja puudub kõrvaldatud id-de hetktõmmisest; iga `REGISTRY`-s endiselt olev kõrvaldatud id on kas edasi suunatud või loetletud `allowedRetiredInCatalog`-s; ja ükski `DEFAULT_DEGRADATION_MAP`-i allikas ega sihtmärk ei ole selles hetktõmmises kõrvaldatuna märgitud. See ei tõesta, et mudelit teenindataks praegu toimiva ülesvoo kaudu. Võrguühenduseta — võrdlus toimub failiga `config/quality/model-lifecycle.json`, mida värskendatakse käsitsi käsuga `npm run quality:refresh-model-lifecycle` (võrk; CI-sse ühendamata). `allowedRetiredInCatalog` on kahanev narre: lisa kirje ainult koos jälgimis-issue'ga. | Jah                                         |
| `check:fetch-targets`             | Iga kliendipoolses `src/`-is asuv `fetch("/api/...")` laheneb tegelikuks `route.ts`-iks                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Jah                                         |
| `check:deps`                      | Kõik `npm install`-iga paigaldatavad sõltuvused kõigis repo `package.json` failides on loetletud `dependency-allowlist.json`-is; uued lukustamata versiooniga või slopsquat'uga seotud paketid märgistatakse                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Jah                                         |
| `audit:deps`                      | `npm audit` (root + electron) — ühtegi kõrge/kriitilise tõsidusastmega hoiatust pole (kattub osv `check:vuln-ratchet`-iga; vt Rationalization Backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Jah                                         |
| `check:lockfile`                  | `package-lock.json` terviklus — https-register, terviklusräsid, hosti ülekirjutusi pole                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Jah                                         |
| `check:licenses`                  | SPDX-litsentside lubatud loend toodangu sõltuvuste jaoks                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Jah                                         |
| `check:tracked-artifacts`         | Ehitusartefakte ega commit'itud `node_modules` sümlinke pole (käivitub ka husky pre-commit'is; pre-push on tahtlikult kerge — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Jah                                         |
| `check:ai-attribution`            | PR-i commit'ides, pealkirjas ega tekstis pole AI/boti `Co-Authored-By`-lõppu ega AI-genereerimise jalust — Range reegel nr 16 (`quality.yml` fast-gates-tsüklis PR→`release/**` jaoks — loeb sündmuse koormust, väljaspool PR-e tegevuseta — ning ainult PR-de sammuna `ci.yml` lint'is PR→`main` jaoks; samuti husky `commit-msg` hook; inimestest kaasautorid on lubatud; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:vitest-exclusions`         | Iga Vitest'i välistus viitab jälgimis-issue'le ja on loetletud failis `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Jah                                         |
| `check:file-size`                 | Lähtekoodifailid (`.ts`/`.tsx` kataloogides `src/`, `open-sse/`, `electron/`, `bin/`) jäävad `cap`-piiri alla ja testifailid (`*.test.ts(x)`) `testCap`-piiri alla; failis `file-size-baseline.json` külmutatud failid (`frozen` / `testFrozen`) ei tohi kasvada üle oma salvestatud suuruse                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Jah                                         |
| `check:error-helper`              | Veavastused executorites/handlerites kasutavad `buildErrorBody()` / `sanitizeErrorMessage()` (Range reegel #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Jah                                         |
| `check:migration-numbering`       | Migratsiooni SQL-failid on järjestikku nummerdatud, ilma lünkade ega duplikaatideta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Jah                                         |
| `check:public-creds`              | Literaalset OAuth-i `client_id`/`client_secret`-väärtust ega Firebase Webi võtit ei esine väljaspool `publicCreds.ts`-i (Range reegel #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jah                                         |
| `check:db-rules`                  | Toort SQL-i ei esine väljaspool `src/lib/db/` mooduleid; `localDb.ts`-ist pole barrel-importe (Ranged reeglid #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Jah                                         |
| `check:known-symbols`             | Teenusepakkujate executorid, marsruutimisstrateegiad ja tõlkurid on registreeritud oma dispatch-tabelites ning vastavad kettal olevatele failidele — hüljatud ega deklareerimata sümboleid pole                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Jah                                         |
| `check:route-guard-membership`    | Iga alamprotsessi käivitav marsruut on klassifitseeritud `isLocalOnlyPath()` abil (Ranged reeglid #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jah                                         |
| `check:test-discovery`            | Iga `*.test.ts` / `*.spec.ts` fail repositooriumis on kaetud vähemalt ühe testkäivitaja poolt (narre: üksildaste failide loend failis `test-discovery-baseline.json` võib ainult kahaneda)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jah                                         |
| `check:agent-skills-sync`         | Genereeritud agent-skills artefaktid vastavad oma lähtekataloogile (hälve puudub)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:provider-asset-provenance` | Pakkujate logodel/varadel on salvestatud päritolukirje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `lint:json`                       | JSON-i konfiguratsioonifailid on parsitavad ja vastavad repositooriumi lint-reeglitele                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `typecheck:core`                  | TypeScripti kompileerimine ilma vigadeta (ainult soovituslikud hoiatused)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Jah                                         |
| `typecheck:noimplicit:core`       | Range `noImplicitAny` — tulevikule suunatud; paljud juba olemasolevad väljakutsekohad vajavad endiselt annotatsioone                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **Soovituslik** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` skoobiga piiratud `src/app/(dashboard)/**` (#7033) — `typecheck:core` kureeritud 27-faililine lubaloend ei sisalda ühtegi dashboardi TSX-faili ja ka `next build` ei tüübikontrolli seda kunagi (`next.config.mjs` määrab `ignoreBuildErrors: true`), mistõttu olid sealsed üksildaste identifikaatorite regressioonid (#6625/#6909) CI jaoks nähtamatud. Võrdleb külmunud, faili- ja TS-koodi-põhiste vigade arvude alusjoonega (`config/quality/dashboard-typecheck-baseline.json`, sama vananemisjõustuse muster nagu `check:known-symbols`) — värav ebaõnnestub ainult alusjoonega fikseeritud arvu ületavate UUTE vigade puhul; kui olemasolev viga parandatakse, langetage alusjoont lipuga `--update`.                                                                                                                                                                                                                    | Jah                                         |

### Töö: `quality-gate`

Käivitub pärast `test-coverage`. Ebaõnnestumisel blokeerib liitmise.

| Skript                       | Kontrollib                                                                                                                                                                        | Blokeeriv                   |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `quality:collect`            | Genereerib `quality-metrics.json` (ESLinti hoiatuste arv, kaetus liidetud shardi raportist)                                                                                       | Jah (ratchet'ist eelnevalt) |
| `quality:ratchet`            | Ükski mõõdik failis `quality-baseline.json` pole regresseerunud (ESLinti hoiatused ≤ algtase; kaetus ≥ algtase)                                                                   | Jah                         |
| `check:duplication`          | Koodi dubleerimine (jscpd@4) ei ületa algtaset failis `quality-baseline.json`                                                                                                     | Jah                         |
| `check:complexity`           | Failitaseme tsüklomaatiline keerukus ei ületa ülempiiri (ESLinti südamiku `complexity` + `max-lines-per-function`)                                                                | Jah                         |
| `check:cognitive-complexity` | Kognitiivse keerukuse ratchet (`eslint-plugin-sonarjs`) — eraldi ESLinti läbimine; CI käivitab mõlemad liidetuna ühe `check:complexity-ratchets` sammuna                          | Jah                         |
| `check:dead-code`            | Kasutamata eksportide / failide ratchet (knip) ei regresseeru algtaseme suhtes                                                                                                    | Jah                         |
| `check:compression-budget`   | Tihenduse võrdluse eelarve — mootoripõhised tokeni kokkuhoiu miinimumtasemed ei tohi regresseeruda                                                                                | Jah                         |
| `check:type-coverage`        | Protsentuaalse tüübituse ratchet (`type-coverage`) ei regresseeru; hõlmab suures osas `typecheck:noimplicit:core`                                                                 | Jah                         |
| `check:codeql-ratchet`       | Avatud CodeQL-i teadete arv ei regresseeru (loeb `gh api` kaudu; ilma tokenita jäetakse sujuvalt vahele) — värskendussagedus ja manuaalne käivitus: vt allpool "CodeQL-i ratchet" | Jah                         |

### Töö: `quality-extended`

Kogu töö on nõuandev (`continue-on-error: true`). npm-põhised ratchet'id käivitatakse
päriselt; välised skännerid paigaldatakse `gh release download` kaudu ja need jätkavad
ise vahele (exit 0), kui binaar on endiselt puudu.

| Skript                   | Kontrollib                                                                                                                                                                                                              | Blokeeriv                                                  |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `check:circular-deps`    | Puuduvad ringsõltuvused (dpdm)                                                                                                                                                                                          | **Nõuandev**                                               |
| `check:bundle-size`      | Bundle'i suurus ei ületa ülempiiri                                                                                                                                                                                      | **Nõuandev**                                               |
| `check:secrets`          | Saladuste skaneerimine (gitleaks) — jäetakse vahele, kui binaar puudub                                                                                                                                                  | **Nõuandev**                                               |
| `check:vuln-ratchet`     | Sõltuvuste haavatavused (osv-scanner) ei regresseeru — jäetakse vahele, kui binaar puudub                                                                                                                               | **Nõuandev**                                               |
| `check:workflows`        | Töövoogude lint (actionlint + zizmor); puuduvad/katkised skännerid, vigased raportid või puuduv ratchet'i algtase ebaõnnestuvad olekuga INCOMPLETE. Kehtivad leiud järgivad valitud strict/advisory/ratchet poliitikat  | Käivitamine kohustuslik; zizmori ratchet on CI-s blokeeriv |
| `check:openapi-breaking` | Avaliku API lepingu (`openapi.yaml`) tagasiühilduvust rikkuvad muudatused võrreldes põhiharuga (oasdiff) — väljastab `openapiBreaking=N`; jäetakse vahele, kui oasdiff puudub või põhispecifikatsiooni ei saa lahendada | **Nõuandev**                                               |

### Töö: `docs-sync-strict`

Käivitub igal PR-il harusse `main`. Ebaõnnestumisel blokeerib liitmise.

| Skript                         | Kontrollib                                                                                                                                                                          | Blokeeriv                        |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `check:docs-all`               | Meta-värav, mis käivitab järjestikku 6 allpool toodud alamväravat                                                                                                                   | Jah                              |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt versioonide kooskõla                                                                                                                                  | Jah                              |
| ↳ `check:docs-counts`          | Proosas olevad arvud (pakkujate arv, migratsioonide arv jne) on tegelike arvude ratchet-akna piires                                                                                 | Jah                              |
| ↳ `check:env-doc-sync`         | Iga keskkonnamuutuja failis `.env.example` on dokumenteeritud docs-tabelis ja vastupidi                                                                                             | Jah                              |
| ↳ `check:deprecated-versions`  | Dokumentides pole aegunud versioonistringe                                                                                                                                          | Jah                              |
| ↳ `check:doc-links`            | Dokumentide sisemised markdown-lingid viitavad tegelikele failidele (vorm `[text]`/`(path)`)                                                                                        | Jah                              |
| ↳ `check:fabricated-docs`      | Dokumentides viidatud marsruudid, keskkonnamuutujad, CLI-käsud, hook-nimed ja failiteed on koodibaasis olemas. Range värav lipu `--strict` kaudu; ilma liputa pehme ebaõnnestumine. | Jah (CI-s lipu `--strict` kaudu) |
| `check:cli-i18n`               | CLI-käskude stringid on olemas kõigis i18n lokaadifailides                                                                                                                          | Jah                              |
| `check:openapi-coverage`       | OpenAPI spetsifikatsioon katab vähemalt ratchet-alampiiri jagu tegelikke marsruute                                                                                                  | Jah                              |
| `check:openapi-security-tiers` | Turvataseme annotatsioonid failis `openapi.yaml` on kooskõlas `routeGuard.ts` klassifikatsioonidega                                                                                 | **Nõuandlik**                    |
| `check:openapi-routes`         | Iga tee failis `openapi.yaml` viitab tegelikule `route.ts`-ile (hallutsinatsioonivastane)                                                                                           | Jah                              |
| `check:docs-symbols`           | Iga `/api/...` viide failides `docs/**/*.md` viitab tegelikule `route.ts`-ile (hallutsinatsioonivastane)                                                                            | Jah                              |
| `i18n translation drift`       | Tõlkimata võtmed i18n lokaadifailides — ainult hoiatus                                                                                                                              | **Nõuandlik**                    |

### Töö: `i18n-ui-coverage`

| Skript                            | Kontrollib                                                                                                                                                                                       | Blokeeriv     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `check-ui-keys-coverage` (inline) | UI i18n võtmete katvus on ≥ 65%                                                                                                                                                                  | Jah           |
| `check-ui-value-drift` (inline)   | Ümber kirjutatud ingliskeelne **väärtus** ei jäta endast maha aegunud tõlget                                                                                                                     | Jah           |
| `check-new-key-coverage` (inline) | **Uus** ingliskeelne võti on tõlgitud igas lokaadis — `__MISSING__:` marker lükatakse tagasi                                                                                                     | Jah           |
| `check-translation-ratio`         | Tegelike tõlgete suhe lokaadi kohta (ingliskeelsega identsed / kohatäited / puuduvad lehed väljaspool lubatud loendit) ei tohi ületada `config/quality/i18n-translation-baseline.json` + lõdvust | **Nõuandlik** |

Vajab `fetch-depth: 0` — väärtusetriivi värav võrdleb `en.json` faili liitmisbaasiga.

#### `check-ui-value-drift` — aegunud tõlgete värav

Püüab kinni selle ainsa i18n regressiooni, mida teised väravad struktuuriliselt näha ei suuda: ingliskeelne väärtus
kirjutatakse ümber ja _eelmisest_ ingliskeelsest tekstist tuletatud tõlked jäävad maha, nii et
mitte-ingliskeelsed kasutajad loevad edasi enesekindlalt sõnastatud, kuid nüüd valet teksti.

See juhtus päriselt. `oauthModal.googleOAuthWarning` kirjutati ümber, kui Antigravity
sisselogimise abiline lisati (#5203); **39 lokaati 43-st** säilitas teksti, mis käskis operaatoritel
"kopeerida täielik URL ja kleepida see allolevasse väljale" — voog, mida selle pakkujaga ei saa
lõpule viia. See jäi märkamatuks kuni #8463, sest:

- `sync-ui-keys` täidab tagantjärele ainult **puuduvaid** võtmeid, mitte kunagi **aegunud** võtmeid;
- `check-ui-keys-coverage` loendab võtmete _olemasolu_, seega aegunud tõlge loetakse kaetuks;
- `check-translation-drift` jälgib `docs/i18n/<locale>/**.md` dokumentatsiooni peegeldatud koopiaid —
  see ei loe kunagi `src/i18n/messages/*.json`. Blokeeriv töös `docs-sync-strict` alates
  2026-09 taas-sünkroniseerimisest: redigeeri põhidokumenti → `npm run i18n:run -- --files=<doc>` (sektsiooni tasemel, odav).

**Diffi-teadlik, mitte baasjoonele toetuv.** See võrdleb `en.json` faili liitmisbaasi juures tööpuuga; iga võtme puhul, mille ingliskeelne väärtus muutus, loetakse iga lokaat, mis endiselt hoiab puutumatut tõlget, aegunuks. See **külmutab teadlikult olemasoleva tehnilise võla** — diff ei suuda paljastada, millisest vanast ingliskeelsest tekstist mõni ammune tõlge pärineb, seega hindab värav ainult seda, mida praegune muudatus puudutab. Alternatiiv (võtmeidune räsi-baasjoon) tooks kaasa ~600 KB genereeritud faili, 3× suurima olemasoleva baasjoone, mis muutuks iga i18n PR-iga.

Seda saab rahuldada kahel viisil:

1. uuendades mõjutatud tõlkeid või
2. määrates need väärtusele `__MISSING__:<new english>` — käitusaeg serveerib siis parandatud ingliskeelset teksti (`src/i18n/request.ts::deepMergeFallback`, #7258) ja võti läheb tõlkimise järjekorda.

Kui sõne **tähendus** muutus, eelista **võtme ümbernimetamist**: uus võti ei saa pärida aegunud tõlget. Just seda mustrit kasutas #8463.

```bash
npm run i18n:check-value-drift          # range (seda käivitab CI)
npm run i18n:check-value-drift:warn     # ainult aruanne
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Lõpetab koodiga 0 koos `SKIP reason=base-unresolved`, kui baaskataloogi ei saa lugeda (madal kloon ilma baasiviiteta), peegeldades `check-openapi-breaking` käitumist.

### Töö: `i18n`

Täielik i18n valideerimismaatriks (üks töö iga lokaadi kohta). Kogu töö on nõuandev.

| Skript                          | Valideerib                       | Blokeeriv                                               |
| ------------------------------- | -------------------------------- | ------------------------------------------------------- |
| `validate_translation.py quick` | Tõlgete täielikkus lokaadi kohta | **Nõuandev** (`continue-on-error: true` kogu töö kohta) |

### Töö: `pr-test-policy`

Käivitub ainult PR-idel.

| Skript                 | Valideerib                                                                                                                                       | Blokeeriv |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `check:pr-test-policy` | PR-id, mis muudavad tootmiskoodi kataloogides `src/`, `open-sse/`, `electron/` või `bin/`, peavad sisaldama või uuendama teste (range reegel #8) | Jah       |
| `check:test-masking`   | Muudetud testifailid ei vähenda neto assertide arvu ega lisa `assert.ok(true)` tautoloogiaid                                                     | Jah       |
| `check:pr-evidence`    | PR-i kirjeldus viitab muudatuse test-/VPS-tõenditele (mehhaniseerib ranget reeglit #18, greppides PR-i proosat — habras, vt Backlog)             | Jah       |

### Töö: `test-vitest`

Käivitub pärast `build` tööd. Blokeerib liitmise ebaõnnestumise korral.

| Komplekt         | Valideerib                                                      | Blokeeriv                                                                                                                           |
| ---------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-server (110 tööriista), autoCombo, vahemälu — vitest runner | Jah                                                                                                                                 |
| `test:vitest:ui` | UI komponentide testid — vitest runner                          | **Blokeeriv** — varasemad ebaõnnestumised on failis `vitest.config.ts` sõnaselgelt välja arvatud; uued ebaõnnestumised nurjavad töö |

### Öised töövood (plaanilised, nõuandvad)

Need käivituvad cron-i ajakava järgi (ja `workflow_dispatch` kaudu), mitte kunagi PR-idel. Kõik on nõuandvad.

| Töövoog                | Valideerib                                                                                                                                                                  | Blokeeriv    |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | fast-check omadustestid juhusliku seemne ja suure käivituste arvuga                                                                                                         | **Nõuandev** |
| `nightly-resilience`   | hunniku kasvu värav, kaaose rikete sissetoomine, k6 koormus-/kestvustestid                                                                                                  | **Nõuandev** |
| `nightly-llm-security` | promptfoo injektsioonikaitse (blokeerimisrežiim) + garak sondid (jäetakse vahele ilma teenusepakkuja salasõnata)                                                            | **Nõuandev** |
| `nightly-schemathesis` | OpenAPI lepingu fuzzing (schemathesis) elusa OmniRoute vastu, kasutades `docs/openapi.yaml` — toob pinnale spetsifikatsiooni rikkumised / käsitlemata 500-vead (Fase 8 B.4) | **Nõuandev** |
| `nightly-mutation`     | Stryker mutatsioonitestimise skoor kiirel ühiktestide rajal — ellujäänud mutandid paljastavad nõrgad assertid                                                               | **Nõuandev** |
| `nightly-compat`       | Node'i mootori ühilduvusmaatriks toetatud `engines.node` vahemike ulatuses                                                                                                  | **Nõuandev** |

Jõudluse baasjooned (hunnik, TTFB, ehitusaeg) fikseeritakse, mitte ei kasutata väravana: vt [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
