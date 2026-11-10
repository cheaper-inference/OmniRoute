# Quality Gates Reference (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Šis dokumentas yra pagrindinis visų „OmniRoute“ CI kokybės vartų informacijos šaltinis.
Jame aprašomi visi vartai, ką jie tikrina, kurioje CI užduotyje jie vykdomi, ar jiems
taikoma reketo bazinė reikšmė, ar sėkmės / nesėkmės politika, ir ar jie blokuoja komponavimą, ar yra tik rekomendaciniai.

Trumpą santrauką ir leidžiamų išimčių sąrašo politiką rasite `AGENTS.md` skiltyje „Quality Gates & Ratchets“.
Kritinį vertinimą, brandos klasifikaciją ir nuo įrankių nepriklausomą
tos pačios sistemos atkūrimo planą rasite
[kokybės vartų vadove](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Patikrų inventorius ir vykdymo profiliai

### Kandidatų priėmimas

Kiekviena CI ir kokybės patikrų darbo eiga pateikia stabilų verdiktą: `Gate / CI` ir
`Gate / Quality`. Jų versijuojamoje priėmimo politikoje kiekviena pirminė užduotis
nurodoma kaip privaloma arba rekomendacinė. Taikoma privaloma užduotis turi būti sėkminga:
trūkstami, atšaukti, praleisti, laukiantys ir nežinomi rezultatai negali patvirtinti PASS.
Tinkama tik dokumentacijos arba tik katalogo pakeitimų klasifikacija gali padaryti kodo
vykdymo šaką netaikomą; juodraštinis PR nėra priimamas kaip kandidatas. Žyma `hotfix`
nepanaikina įrodymų reikalavimo.

Abi darbo eigos apima PR į main/release šakas, siuntimus į `main`, rankinį paleidimą
ir sujungimo grupės įvykius. Siuntimo, paleidimo ir sujungimo grupės atvejais vykdomas visas
rinkinys. Siuntimai į `release/**` jų nepaleidžia (2026-10-18): kiekvienam pakeitimui matrica
jau buvo įvykdyta jo PR, o sujungto derinio tikrinimas yra Release-Green užduotis
(`docs/ops/RUNNER_BOX.md` → prieglobos vykdymo šaka). Išsišakojimuose ir sujungimo grupėse
užduotims, kurios kitu atveju pasirinktų savarankiškai administruojamas vykdymo aplinkas,
naudojamos prieglobos vykdymo aplinkos; prieš diegimą būtina patikrinti, ar prieglobos
pajėgumų pakanka.

Įprastame PR vykdomas greitasis rinkinys. Priėmimo politikos `full-code` ir
`full-code-e2e` vykdymo šakos (E2E, integraciniai testai, paketo artefaktas, Electron
bazinis patikrinimas, Bun SQLite, ekosistemos ir protokolo klientai) vykdomos tik
Mergify eilės juodraštyje arba per visą vykdymą:
`gh workflow run ci.yml --ref <branch>`.

Kiekviename JSON kvite nurodomi patikrinto SHA, darbo eigos vykdymas ir bandymas.
CLI atmeta išsiregistruoto kodo ir įvykio SHA neatitiktį. Darbo eigos testai susieja
politikos narystę su verdikto užduoties `needs` sąrašu, kad nauja arba pašalinta
vykdymo šaka negalėtų tyliai dingti. Kvitai apima savo darbo eigą, o ne publikavimą,
diegimą ar esamo rekomendacinio skaitytuvo vidinę veiklą. Abiejų patikrų pavadinimų
aktyvinimas šakų taisyklėse yra atskiras administracinis pakeitimas; šių užduočių
pridėjimas savaime neapsaugo šakos.

### Sujungimo eilė

Žyma `queue` nusiunčia PR į Mergify eilę (`.mergify.yml`). Mergify atidaro juodraštinį PR
šakoje `mergify/merge-queue/`, CI joje vykdo visą rinkinį, o pradinis PR sujungiamas, kai
`Gate / CI`, `Gate / Quality` ir `Merge integrity (changelog + generated skills)` patikros
būna sėkmingos.

Mergify įrašo eilės suvestinę į juodraščio aprašą, kurį taip pat gali redaguoti kitos
programos. Tokio juodraščio `pull_request` `edited` įvykis gauna atskirą lygiagretumo
grupę (`-queue-edit-<run_id>`), todėl negali atšaukti tikrojo juodraščio vykdymo ir
praleidžia patikrą bei matricą. Vis tiek vykdoma tik `Merge integrity`. Praleista
patikros užduotis turi kitą patikros pavadinimą, nes Mergify praleistą `Gate / CI`
interpretuoja kaip nesėkmingą patikrą ir pašalina PR iš eilės.

Pašalinus PR iš eilės, siuntimas ne visada grąžina jį į eilę. Parašykite jame komentarą
`@mergifyio queue`.

### Statinės analizės inventorius

Versijuojamas npm alternatyviųjų pavadinimų inventorius ir statinės analizės sudėtis
saugomi `config/quality/gate-manifest.json`. Paleiskite `npm run check:gate-manifest`,
kad pagal `package.json` patikrintumėte scenarijų pavadinimus ir tikslias komandas;
pridėjimai, pašalinimai ir komandų neatitikimai lemia nesėkmę tiek vietiniame kabliuke,
tiek CI pakeitimų klasifikavimo užduotyse. Alternatyvusis pavadinimas nėra darbo eigos
užduotis, matricos egzempliorius ar testo atvejis: šių skaičių negalima pateikti kaip
tarpusavyje pakeičiamų.

Norėdami peržiūrėti pasirinktus alternatyviuosius pavadinimus jų nevykdydami, naudokite
`npm run quality:scan -- --list` arba `npm run quality:scan:fast -- --list`.
Vykdymo aplinka iškviečia npm įėjimo tašką, todėl išsaugoma jo vykdymo aplinka
(įskaitant Bun, kur jis sukonfigūruotas). Apraše šiems profiliams nepriklausantys
alternatyvieji pavadinimai pažymėti kaip iškviečiami atskirai, o tik skaitymui skirtuose
analizės profiliuose priežiūros komandos draudžiamos.

Šie profiliai apima tik statinę analizę. Jie nepatvirtina produkto testų,
aprėpties, paketų kūrimo, išorinių patikrų ar visiško kandidato tinkamumo leidimui.
Priėmimui darbo eigoje naudojami susieti `config/quality/admission-policy.json` ir
`scripts/quality/admission-verdict.mjs`. Leidimo stebėjimo profiliai lieka atskiri;
jų taikomas patikras ir kvitus tikrinkite nepriklausomai. Toliau pateiktas tekstinis
inventorius yra informacinis ir neįrodo, kad patikra iš tikrųjų buvo vykdyta.

Scenarijai yra kataloguose `scripts/check/` (politikos patikros) ir
`scripts/quality/` (reikalavimų griežtinimo mechanizmas).
CI pirminis tiesos šaltinis yra `.github/workflows/ci.yml`.

### Spartusis leidimo PR kelias (`quality.yml`)

`.github/workflows/quality.yml` papildo CI main/release PR, siuntimų į `main`,
paleidimo ir sujungimo grupių atvejais. PR naudojamos pagal kelius filtruojamos
sparčiosios patikros. Visam laikui išjungta pasikartojanti komponavimo užduotis buvo
pašalinta; tikrosios komponavimo, paketų kūrimo ir paleidimo patikros lieka CI.
Modulių testų rinkinys ir vitest vykdomi tik CI (`Unit Tests (N/8)` ir `Vitest`).

| Užduotis                                         | Apimtis                                                                                                                                         | Blokuojanti                   |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `Docs Gates (fast-path)`                         | Dokumentacijos / kodo PR; API dokumentacijos nuorodos ir visa dokumentacija                                                                     | Taip                          |
| `Fast Quality Gates`                             | Kodo PR; statinės patikros, tipų patikra, valdymo skydelio tipų patikra, paveikti modulių testai, pamiršti gretutiniai testai (rekomendaciniai) |
| `No new ESLint warnings`                         | Kodo PR; lint apsauga, atsižvelgianti į slopinimus                                                                                              | Taip, įskaitant išsišakojimus |
| `Merge integrity (changelog + generated skills)` | Ne juodraštiniai PR; pakeitimų žurnalo ir sugeneruotų įgūdžių sinchronizavimas                                                                  | Taip, įskaitant išsišakojimus |

#### Ataskaita apie pamirštus gretutinius testus

`npm run check:forgotten-sibling-tests` vykdoma kaip rekomendacinis `Fast Quality Gates` etapas ir pakartotinai naudoja importų sprendiklį, kuriuo grindžiamas testų poveikio žemėlapis.
Kiekvienam pakeistam produkciniam moduliui ji pateikia deterministines
`changed module/symbol -> static consumer -> candidate sibling test` grandines, kai siūlomo
testo nėra ištraukimo užklausos pakeitimų rinkinyje. Markdown suvestinė ir JSON rezultatas išsaugomi kaip
`forgotten-sibling-tests` darbo eigos artefaktas, skirtas kalibravimui prieš pradedant bet kokį blokuojantį diegimą.

Barrel tipo pakartotiniai eksportai ir dinaminiai importai yra tik sprendimo diagnostika; jie niekada nesukuria
blokuojančio radinio. Peržiūrėtos išimtys pateikiamos faile
`config/quality/forgotten-sibling-allowlist.json`. Kiekviename įraše turi būti nurodytas vartotojas ir siūlomas
testas, pateiktas konkretus pagrindimas ir nuoroda į GitHub problemą arba ištraukimo užklausą. Netinkamai suformuoti įrašai
lemia blokavimą. Išimtys negali paslėpti ištrinto siūlomo testo arba pakeitimų rinkinio, kuriame pridedama `.skip`/`.todo`;
teiginių susilpninimą ir kitus maskavimo atvejus toliau kontroliuoja nepriklausomai blokuojanti
`check:test-masking` patikra.

### Užduotis: `lint`

Vykdoma kiekvienai į `main` nukreiptai ištraukimo užklausai. Nesėkmės atveju sujungimas blokuojamas.

| Scenarijus (`npm run ...`)        | Tikrina                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Blokuojantis                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `check:node-runtime`              | Ar Node.js versija patenka į palaikomą intervalą                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Taip                                         |
| `check:cycles`                    | Ciklines importavimo priklausomybes visame `src/` + `open-sse/` (AST pagrindu, atsižvelgiant į tsconfig `paths`). Paleistas atskirai grąžina 1 išėjimo kodą, kai aptinkamas bent vienas ciklas (saugiai blokuojama nuo #15281), ir pateikia stipriai susietų komponentų (SCC) sąrašą. `check:cycles:ratchet` (vykdomas CI) blokuoja, kai skaičius viršija `quality-baseline.json` nustatytą `metrics.cycles` ribą — šiuo metu 14, `direction: down`, todėl jis gali tik mažėti (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Taip (ribos fiksatorius)                     |
| `check:boundary`                  | `open-sse → src` susietumą: unikalius importavimus iš variklio failų į programos failus (`scripts/quality/measure-boundary.mjs`; briaunų sąrašas yra v4 branduolio / modulių atskyrimo korekcijų darbų sąrašas). Paleistas atskirai pateikia rekomendacinę ataskaitą (tokią pačią kaip `quality:boundary`). `check:boundary:ratchet` (vykdomas CI ir taip pat įtrauktas į `quality.yml` greitųjų patikrų ribų fiksavimo ciklą) blokuoja, kai skaičius viršija `quality-baseline.json` nustatytą `metrics.boundaryOpenSseToSrc` ribą — pradinė reikšmė nustatyta pagal išmatuotą 771, `direction: down`; `--update` ją gali tik sumažinti; PR atveju skaičiuojama bazinės versijos atžvilgiu (`--base-ref`, žr. toliau)                                                                                                                                                                                                                                                                                                                                                         | Taip (ribos fiksatorius)                     |
| `check:route-validation:t06`      | Ar visuose maršrutuose yra Zod schemos (6 lygio politika)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Taip                                         |
| `check:any-budget:t11`            | `@ts-expect-error // any` skaičius neviršija biudžeto (11 lygio catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Taip                                         |
| `check:provider-consistency`      | Kiekvienas teikėjas faile `providers.ts` turi atitinkamą įrašą faile `providerRegistry.ts` (ir atvirkščiai, leidžiamųjų sąrašo ribose)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Taip                                         |
| `check:model-lifecycle`           | Trys rankiniu būdu prižiūrimos maršrutizavimo lentelės išlieka suderintos su į repozitoriją įtraukta gyvavimo ciklo momentine kopija (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nevertina jokio nebenaudojamo ID, kurį gali nukreipti `REGISTRY`; kiekvienas `BUILT_IN_ALIASES` tikslas yra įtrauktas į `REGISTRY` ir jo nėra nebenaudojamų ID momentinėje kopijoje; kiekvienas nebenaudojamas ID, vis dar esantis `REGISTRY`, yra peradresuojamas arba nurodytas `allowedRetiredInCatalog`; ir joks `DEFAULT_DEGRADATION_MAP` šaltinis ar tikslas toje momentinėje kopijoje nėra pažymėtas kaip nebenaudojamas. Tai neįrodo, kad modelį šiuo metu teikia veikianti išorinė sistema. Veikia neprisijungus — lyginama su `config/quality/model-lifecycle.json`, kuri rankiniu būdu atnaujinama naudojant `npm run quality:refresh-model-lifecycle` (reikalingas tinklas; neintegruota į CI). `allowedRetiredInCatalog` yra mažinimo reketas: įrašą pridėkite tik kartu su sekimo užduotimi.                                                                                   | Taip                                         |
| `check:fetch-targets`             | Kiekvienas `fetch("/api/...")`, esantis kliento pusės `src/`, nurodo į realų `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Taip                                         |
| `check:deps`                      | Visos naudojant `npm install` įdiegiamos priklausomybės iš kiekvieno repozitorijos `package.json` yra įtrauktos į `dependency-allowlist.json`; nauji nefiksuotų versijų arba typosquatting būdu imituojami paketai pažymimi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Taip                                         |
| `audit:deps`                      | `npm audit` (šakninis projektas ir electron) — nėra didelio ar kritinio pavojingumo įspėjimų (iš dalies dubliuoja osv `check:vuln-ratchet`; žr. racionalizavimo darbų sąrašą)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Taip                                         |
| `check:lockfile`                  | `package-lock.json` vientisumas — https registras, vientisumo maišos, jokių pagrindinio kompiuterio perrašymų                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Taip                                         |
| `check:licenses`                  | Leidžiamų SPDX licencijų sąrašas gamybinėms priklausomybėms                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Taip                                         |
| `check:tracked-artifacts`         | Jokių kūrimo artefaktų / į versijų valdymą įtrauktų `node_modules` simbolinių nuorodų (taip pat vykdoma husky prieš patvirtinimą; patikra prieš išsiuntimą sąmoningai yra minimali — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Taip                                         |
| `check:ai-attribution`            | Jokių DI / roboto `Co-Authored-By` prierašų ar DI generavimo poraščių PR patvirtinimuose, pavadinime ar apraše — griežta taisyklė #16 (`quality.yml` greitųjų patikrų cikle, skirtame PR→`release/**` — nuskaito įvykio duomenis, o ne PR atveju neatlieka jokių veiksmų — ir tik PR skirtame `ci.yml` lint patikros žingsnyje, skirtame PR→`main`; taip pat husky `commit-msg` kabliuke; bendraautoriai žmonės leidžiami; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:vitest-exclusions`         | Kiekvienoje Vitest išimtyje nurodyta sekimo užduotis ir ji įtraukta į `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Taip                                         |
| `check:file-size`                 | Šaltinio failai (`.ts`/`.tsx`, esantys `src/`, `open-sse/`, `electron/`, `bin/`) neviršija `cap`, o testų failai (`*.test.ts(x)`) — `testCap`; failai, užfiksuoti `file-size-baseline.json` (`frozen` / `testFrozen`), negali viršyti juose užregistruoto dydžio                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Taip                                         |
| `check:error-helper`              | Atsakymai į klaidas executors/handlers naudoja `buildErrorBody()` / `sanitizeErrorMessage()` (kieta taisyklė #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Taip                                         |
| `check:migration-numbering`       | Perkėlimo SQL failai yra sunumeruoti iš eilės, nėra spragų ar dublikatų                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Taip                                         |
| `check:public-creds`              | Jokių pažodinių OAuth `client_id`/`client_secret` arba „Firebase“ žiniatinklio raktų už `publicCreds.ts` ribų (kieta taisyklė #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Taip                                         |
| `check:db-rules`                  | Nėra neapdorotų SQL išorinių `src/lib/db/` modulių; be statinės importo iš `localDb.ts` (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Taip                                         |
| `check:known-symbols`             | Teikėjų vykdytojai, maršruto strategijos ir vertėjai, registruoti jų išsiuntimo lentelėse, atitinka failus diske — be našlaičių ar nedeklaruotų simbolių                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Taip                                         |
| `check:route-guard-membership`    | Kiekvienas maršrutas, sukuriantis antrinį procesą, klasifikuojamas pagal `isLocalOnlyPath()` (kietos taisyklės #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Taip                                         |
| `check:test-discovery`            | Kiekvieną saugykloje esantį `*.test.ts` / `*.spec.ts` failą aptinka bent viena testų vykdymo priemonė („ratchet“ principas: neaptiktų failų sąrašas faile `test-discovery-baseline.json` gali tik trumpėti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Taip                                         |
| `check:test-tla-order`            | Jokiame `node:test` faile, esančiame `tests/unit`, neužregistruojamas testas, tada nepasiekiamas aukščiausiojo lygmens `await` ir po to neužregistruojama daugiau testų (#18045; „ratchet“ principas: sąrašas faile `test-tla-order-allowlist.json` gali tik trumpėti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Taip                                         |
| `check:agent-skills-sync`         | Sugeneruoti agentų įgūdžių artefaktai atitinka jų šaltinio katalogą (nėra neatitikimų)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:provider-asset-provenance` | Teikėjų logotipai ir ištekliai turi užregistruotą kilmės įrašą                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `lint:json`                       | JSON konfigūracijos failai sėkmingai analizuojami ir atitinka saugyklos lintavimo taisykles                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `typecheck:core`                  | TypeScript kompiliavimas be klaidų (tik patariamojo pobūdžio įspėjimai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Taip                                         |
| `typecheck:noimplicit:core`       | Griežtas `noImplicitAny` — orientuotas į ateitį; daugeliui jau egzistuojančių iškvietimo vietų vis dar reikia anotacijų                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **Patariamasis** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, apribotas iki `src/app/(dashboard)/**` (#7033) — `typecheck:core` kuruojamas 27 failų leidžiamasis sąrašas neapima nė vieno ataskaitų srities TSX failo, o `next build` taip pat niekada neatlieka jų tipų patikros (`next.config.mjs` nustato `ignoreBuildErrors: true`), todėl ten atsiradusios nebesusietų identifikatorių regresijos (#6625/#6909) CI sistemai buvo nematomos. Skirtumai lyginami su fiksuotu kiekvieno failo ir TS kodo klaidų skaičiaus baziniu lygiu (`config/quality/dashboard-typecheck-baseline.json`, taikomas toks pats pasenusio bazinio lygio tikrinimo modelis kaip `check:known-symbols`) — patikra nepavyksta tik dėl NAUJŲ klaidų, viršijančių bazinį skaičių; ištaisius jau egzistuojančią klaidą, bazinį lygį sumažinkite naudodami `--update`.                                                                                                                                                                                                                                                                                     | Taip                                         |
| `check:build-typecheck`           | Visos programos produkcinė tipų patikra pagal `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), apimanti sritį, kurios neapima `typecheck:core` 27 failų leidžiamasis sąrašas ir ataskaitų srities patikra. Skirtumai lyginami su `config/quality/build-typecheck-baseline.json`; naujas arba padidėjęs kiekvienos (failo, kodo) poros skaičius lemia nesėkmę, o sumažėjęs skaičius nurodo sumažinti bazinį lygį. `--update` nevykdomas, jei patikros metu aptinkama nauja arba padidėjusi pora, nebent perduodamas `--force-regressions`, taip pat nevykdomas naujai nutildytam failui, nebent perduodamas `--force-nocheck`, todėl bazinio lygio išplėtimas siekiant sėkmingos patikros ir nuolatinio nutildymo suteikimas yra du atskiri sąmoningi veiksmai. Vien tik `--force` atmetamas. Be to, kūrimo srityje ieškoma `@ts-nocheck`, rezultatą lyginant su `config/quality/ts-nocheck-baseline.json`, nes jį naudojantis failas apskritai nepateikia diagnostikos pranešimų ir kitu atveju būtų nematomas visoms patikroms. | Taip                                         |

#### Dvi tipų tikrinimo programos pateikia skirtingus atsakymus

`typecheck:core` ir `check:build-typecheck` kompiliuoja skirtingas programas naudodamos skirtingas
parinktis, todėl tas pats failas vienoje gali būti be klaidų, o kitoje — pilnas klaidų.

`tsconfig.build.json` nustato `"strict": false`, todėl `noImplicitAny` yra išjungtas. Pagrindinė
konfigūracija kompiliuoja kuruojamą 27 failų leidžiamąjį sąrašą naudodama griežtesnes parinktis ir seka kiekvieno
įrašo importų grafą, todėl joje vis tiek tikrinami failai, kurie niekada nepatenka į kūrimo programą.

Ši pasekmė svarbi vertinant, ar failo tipai apibrėžti: **nulis diagnostikos pranešimų
naudojant `check:build-typecheck` nereiškia nulio**. Pašalinus `@ts-nocheck` iš 26
failų paaiškėjo, kad 23 iš jų kūrimo programoje buvo be klaidų; šešiolikoje iš jų griežtoje
programoje buvo aptikta apie 120 numanomo `any` klaidų. Prieš paskelbdami failą neturinčiu klaidų, patikrinkite abiem būdais.

### Užduotis: `quality-gate`

Vykdoma po `test-coverage`. Nesėkmės atveju neleidžia sulieti pakeitimų.

| Scenarijus                   | Tikrina                                                                                                                                                                                                                          | Blokuojantis                             |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `quality:collect`            | Sugeneruoja `quality-metrics.json` (ESLint įspėjimų skaičių, aprėptį iš sujungtos segmentų ataskaitos)                                                                                                                           | Taip (vykdomas prieš slenkstinę patikrą) |
| `quality:ratchet`            | Nė viena `quality-baseline.json` metrika nepablogėjo (ESLint įspėjimai ≤ bazinė reikšmė; aprėptis ≥ bazinė reikšmė)                                                                                                              | Taip                                     |
| `check:duplication`          | Kodo dubliavimas (jscpd@4) neviršija `quality-baseline.json` bazinės reikšmės                                                                                                                                                    | Taip                                     |
| `check:complexity`           | Failo lygmens ciklomatinis sudėtingumas neviršija ribos (pagrindinės ESLint taisyklės `complexity` + `max-lines-per-function`)                                                                                                   | Taip                                     |
| `check:cognitive-complexity` | Kognityvinio sudėtingumo slenkstinė patikra (`eslint-plugin-sonarjs`) — atskiras ESLint vykdymas; CI vykdo abi patikras, sujungtas į vieną `check:complexity-ratchets` žingsnį                                                   | Taip                                     |
| `check:dead-code`            | Nenaudojamų eksportų / failų slenkstinė patikra (knip) nepablogėjo, palyginti su bazine reikšme                                                                                                                                  | Taip                                     |
| `check:compression-budget`   | Glaudinimo našumo testo biudžetas — kiekvieno variklio žetonų sutaupymo apatinės ribos neturi pablogėti                                                                                                                          | Taip                                     |
| `check:type-coverage`        | Tipizuotos dalies procentinės reikšmės slenkstinė patikra (`type-coverage`) nepablogėjo; iš esmės apima `typecheck:noimplicit:core`                                                                                              | Taip                                     |
| `check:codeql-ratchet`       | Atvirų CodeQL įspėjimų skaičius nepablogėjo (nuskaitoma naudojant `gh api`; jei nėra prieigos rakto, patikra korektiškai praleidžiama) — atnaujinimo dažnį ir rankinį paleidimą žr. toliau, skiltyje „CodeQL slenkstinė patikra“ | Taip                                     |

### Užduotis: `quality-extended`

Visa užduotis yra rekomendacinė (`continue-on-error: true`). npm pagrįstos slenkstinės patikros
vykdomos iš tikrųjų; išoriniai skaitytuvai įdiegiami naudojant `gh release download` ir patys praleidžia patikrą (baigimo kodas 0),
jei vykdomojo failo vis dar nėra.

| Scenarijus               | Tikrina                                                                                                                                                                                                                                                                                  | Blokuojantis                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `check:circular-deps`    | Nėra ciklinių priklausomybių (dpdm)                                                                                                                                                                                                                                                      | **Rekomendacinis**                                                   |
| `check:bundle-size`      | Paketo dydis neviršija ribos                                                                                                                                                                                                                                                             | **Rekomendacinis**                                                   |
| `check:secrets`          | Paslapčių nuskaitymas (gitleaks) — praleidžiama, jei nėra vykdomojo failo                                                                                                                                                                                                                | **Rekomendacinis**                                                   |
| `check:vuln-ratchet`     | Priklausomybių pažeidžiamumai (osv-scanner) nepablogėjo — praleidžiama, jei nėra vykdomojo failo                                                                                                                                                                                         | **Rekomendacinis**                                                   |
| `check:workflows`        | Darbo eigų lint patikra (actionlint + zizmor); nesami arba neveikiantys skaitytuvai, netinkamos ataskaitos ar nesama slenkstinės patikros bazinė reikšmė sukelia INCOMPLETE klaidą. Galiojantiems radiniams taikoma pasirinkta griežta, rekomendacinė arba slenkstinės patikros politika | Vykdymas privalomas; zizmor slenkstinė patikra CI aplinkoje blokuoja |
| `check:openapi-breaking` | Viešosios API sutarties (`openapi.yaml`) nesuderinami pakeitimai, palyginti su bazine šaka (oasdiff) — sugeneruoja `openapiBreaking=N`; praleidžiama, jei nėra oasdiff arba nepavyksta nustatyti bazinės specifikacijos                                                                  | **Rekomendacinis**                                                   |

### Užduotis: `docs-sync-strict`

Vykdoma kiekvienai PR į `main`. Nesėkmės atveju neleidžia sulieti pakeitimų.

| Scenarijus                     | Tikrina                                                                                                                                                                                                   | Blokuojantis                             |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:docs-all`               | Metapatikra, nuosekliai paleidžianti 6 toliau nurodytas dalines patikras                                                                                                                                  | Taip                                     |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt versijų suderinamumą                                                                                                                                                        | Taip                                     |
| ↳ `check:docs-counts`          | Ar tekste pateikti skaičiai (teikėjų skaičius, migracijų skaičius ir kt.) patenka į realių skaičių reketinio slenksčio intervalą                                                                          | Taip                                     |
| ↳ `check:env-doc-sync`         | Ar kiekvienas aplinkos kintamasis iš `.env.example` yra dokumentuotas dokumentacijos lentelėje ir atvirkščiai                                                                                             | Taip                                     |
| ↳ `check:deprecated-versions`  | Ar dokumentacijoje nėra nebenaudojamų versijų eilučių                                                                                                                                                     | Taip                                     |
| ↳ `check:doc-links`            | Ar vidinės markdown nuorodos dokumentacijoje nurodo realius failus (`[text]`/`(path)` forma)                                                                                                              | Taip                                     |
| ↳ `check:fabricated-docs`      | Ar dokumentacijoje minimi maršrutai, aplinkos kintamieji, CLI komandos, kablių pavadinimai ir failų keliai egzistuoja kodo bazėje. Griežtoji patikra su `--strict`; be parametro klaida nėra blokuojanti. | Taip (CI sistemoje naudojant `--strict`) |
| `check:cli-i18n`               | Ar CLI komandų eilutės yra visuose i18n lokalės failuose                                                                                                                                                  | Taip                                     |
| `check:openapi-coverage`       | Ar OpenAPI specifikacija apima bent reketiniu būdu nustatytą minimalų realių maršrutų skaičių                                                                                                             | Taip                                     |
| `check:openapi-security-tiers` | Ar saugumo lygių anotacijos faile `openapi.yaml` atitinka `routeGuard.ts` klasifikacijas                                                                                                                  | **Rekomendacinis**                       |
| `check:openapi-routes`         | Ar kiekvienas kelias faile `openapi.yaml` atitinka realų `route.ts` (apsauga nuo haliucinacijų)                                                                                                           | Taip                                     |
| `check:docs-symbols`           | Ar kiekviena `/api/...` nuoroda failuose `docs/**/*.md` atitinka realų `route.ts` (apsauga nuo haliucinacijų)                                                                                             | Taip                                     |
| `i18n translation drift`       | Neišversti raktai i18n lokalės failuose — tik įspėjimas                                                                                                                                                   | **Rekomendacinis**                       |

Dvylika README SVG failų kataloge `docs/diagrams/` yra generuojami (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` iš naujo sugeneruoja juos visus). Kiekvienam iš jų skirtas baitų palyginimo vieneto testas
(`tests/unit/docs/readme-*-svg.test.ts`, užduotis `test-unit`), kuris nepavyksta, kai į saugyklą įtrauktas failas yra
pasenęs, o `check:docs-counts` nuskaito kanoninius skaičius iš jų `<text>` mazgų — todėl
kontūrų kūrimo veiksmas kiekvieną į kontūrus konvertuotą eilutę faile išsaugo kaip nematomą `<text>`. SVG kanoninių skaičių patikra skaito failus, nurodytus
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, taip pat `public/images/tier-flow-dark.svg` ir `tier-flow-light.svg`; teiginiai apie
nemokamą visam laikui naudojimą, katalogo įrašą, pasikartojantį išteklių telkinį ir vertinimo veiksnius taip pat skaitomi iš
`promise-pillars.svg`, `free-tier-budget.svg` ir `strategies-grid.svg`. `free-tier-budget.svg`
skaičius gauna iš veikiančio katalogo įkėlimo komponento, todėl pakeitus `FREE_MODEL_BUDGETS` arba
teikėjo rodomą pavadinimą, CI patikra nepavyksta, kol šis failas nesugeneruojamas iš naujo.

### Užduotis: `i18n-ui-coverage`

| Scenarijus                          | Tikrina                                                                                                                                                                                                                                             | Blokuojantis       |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `check-ui-keys-coverage` (įterptas) | Ar UI i18n raktų aprėptis yra ≥ 65 %                                                                                                                                                                                                                | Taip               |
| `check-ui-value-drift` (įterptas)   | Ar perrašius anglišką **reikšmę** nelieka pasenusio vertimo                                                                                                                                                                                         | Taip               |
| `check-new-key-coverage` (įterptas) | Ar **naujas** angliškas raktas išverstas kiekvienoje lokalėje — žymeklis `__MISSING__:` atmetamas                                                                                                                                                   | Taip               |
| `check-translation-ratio`           | Realių vertimų santykis kiekvienoje lokalėje (angliškam tekstui identiški / vietaženklio / trūkstami galiniai mazgai, neįtraukti į leidžiamųjų sąrašą) negali viršyti `config/quality/i18n-translation-baseline.json` reikšmės su leistina paklaida | **Rekomendacinis** |

Reikalingas `fetch-depth: 0` — reikšmių pokyčio patikra palygina `en.json` su sujungimo baze.

#### `check-ui-value-drift` — pasenusių vertimų patikra

Sulaiko vieną i18n regresiją, kurios kiti vartai struktūriškai nemato: angliška reikšmė perrašoma, o vertimai, gauti iš _ankstesnės_ anglų kalbos, pasilieka, todėl ne anglų kalbos vartotojai toliau skaito užtikrintai suformuluotą, dabar neteisingą kopiją.

Tai buvo išsiųsta tikrai. `oauthModal.googleOAuthWarning` buvo perrašytas, kai nusileido Antigravity prisijungimo pagalbininkas (#5203);** 39 iš 43 vietovių** išliko tekstas, liepiantis operatoriams „nukopijuoti visą URL ir įklijuoti jį žemiau“ — srautas, kurio negalima užbaigti tam teikėjui. Tai buvo nepastebėta iki #8463 nes:

- `sync-ui-keys` užpildo tik tuos raktus, kurie yra** nėra** , niekada tokių, kurie yra** pasenęs** ;
- `check-ui-keys-coverage` skaičiuoja raktą _buvimas_, todėl pasenęs vertimas vertinamas kaip padengtas;
- `check-translation-drift` seka `docs/i18n/<locale>/**.md` dokumentaciją, atspindi — niekada neskaito `src/i18n/messages/*.json`. Užblokavimas `docs-sync-strict` nuo 2026–2009 m. pakartotinio sinchronizavimo: redaguokite pagrindinį dokumentą → `npm run i18n:run -- --files=<doc>` (skilties lygio, pigus).

**Atkreipia dėmesį į skirtumus, nepalaikoma pradinio lygio.** Jis lygina `en.json` sujungimo bazėje su darbiniu medžiu; kiekvienam raktui, kurio anglų kalbos reikšmė pasikeitė, bet kuri lokalė, kurioje vis dar yra nepaliestas vertimas, yra pasenusi. Tai tyčia** įšaldo jau turimą skolą** — a diff negali atskleisti, iš kurios senosios anglų kalbos atėjo senas vertimas, todėl vartai vertina tik tai, ką paliečia dabartinis pakeitimas. Alternatyva (bazinė maišos linija kiekvienam raktui) kainuotų ~ 600 KB sugeneruotą failą, 3 × didžiausią esamą bazinę liniją, keikiant kiekvieną i18n PR.

Du būdai jį patenkinti:

1. atnaujinti paveiktus vertimus arba
2. nustatykite juos į `__MISSING__:<new english>` — vykdymo laikas, tada aptarnauja taisyta anglų kalba (`src/i18n/request.ts::deepMergeFallback`, #7258) ir pagrindines vertimo eiles.

Jei styga** prasmė** pasikeitė, pirmenybę** rakto pervadinimas** : naujas raktas negali paveldėti pasenusio vertimo. Tai yra #8463 modelis.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Išeina 0 su `SKIP reason=base-unresolved` kai negalima perskaityti pagrindinio katalogo (seklus klonas be pagrindinės nuorodos), atspindintis `check-openapi-breaking`.

### Darbas: `i18n`

Visa i18n patvirtinimo matrica (vienoje lokalėje viena užduotis). Visas darbas yra patariamasis.

| Scenarijus                      | Patvirtina                     | Blokavimas                                             |
| ------------------------------- | ------------------------------ | ------------------------------------------------------ |
| `validate_translation.py quick` | Vertimo išsamumas pagal lokalę | **Patariamoji** (`continue-on-error: true` visą darbą) |

### Darbas: `pr-test-policy`

Veikia tik pagal ištraukimo užklausas.

| Scenarijus             | Patvirtina                                                                                                                         | Blokavimas |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PRs, kurie keičia gamybos kodą `src/`, `open-sse/`, `electron/` arba `bin/` turi apimti arba atnaujinti testus (kieta taisyklė #8) | Taip       |
| `check:test-masking`   | Pakeisti bandomieji failai nesumažina grynojo pareiškimų skaičiaus ir neprideda `assert.ok(true)` tautologijos                     | Taip       |
| `check:pr-evidence`    | PR body cituoja test/VPS pakeitimo įrodymus (mechanizuoja Hard Rule #18 grepping PR prose — fragile, žr. Atsilikimas)              | Taip       |

### Darbas: `test-vitest`

Bėga paskui `build`. Blokai susijungia sugedus.

| Liukso numeris   | Patvirtina                                                       | Blokavimas                                                                                                              |
| ---------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP serveris (110 įrankių), autoCombo, talpyklos — vitest runner | Taip                                                                                                                    |
| `test:vitest:ui` | UI komponentas išbando — vitest runner                           | **Blokavimas** — jau egzistuojantys gedimai yra aiškiai neįtraukti į `vitest.config.ts`; naujos nesėkmės sužlugdo darbą |

### Naktinės darbo eigos (suplanuotos, konsultacinės)

Jie veikia pagal cron tvarkaraštį (ir `workflow_dispatch`), niekada ne pagal PRs. Visi yra patariamieji.

| Darbo eiga             | Tikrina                                                                                                                                                                                             | Blokuojanti       |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `nightly-property`     | fast-check savybių testus su atsitiktine pradine reikšme ir dideliu vykdymų skaičiumi                                                                                                               | **Rekomendacinė** |
| `nightly-resilience`   | atminties krūvos augimo ribą, chaoso trikčių įterpimą, k6 apkrovos / ilgalaikės apkrovos testus                                                                                                     | **Rekomendacinė** |
| `nightly-llm-security` | promptfoo įterpimo apsaugą (blokavimo režimu) ir garak patikras (praleidžiamos be teikėjo slaptosios reikšmės)                                                                                      | **Rekomendacinė** |
| `nightly-schemathesis` | OpenAPI sutarties neapibrėžtųjų įvesčių testavimą (schemathesis) veikiančioje OmniRoute naudojant `docs/openapi.yaml` — aptinka specifikacijos pažeidimus / neapdorotas 500 klaidas (8 etapas, B.4) | **Rekomendacinė** |
| `nightly-mutation`     | Stryker mutacinio testavimo įvertį greitojoje modulių testų sekoje — išlikę mutantai atskleidžia silpnus teiginius                                                                                  | **Rekomendacinė** |
| `nightly-compat`       | Node variklio suderinamumo matricą visuose palaikomuose `engines.node` diapazonuose                                                                                                                 | **Rekomendacinė** |

Našumo baziniai rodikliai (atminties krūva, TTFB, komponavimo laikas) registruojami, tačiau pagal juos neblokuojama: žr. [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Spartos etapas (2026-08-30 → v4.0 LTS): visos bazinės ribos sušvelnintos 20 %

Savininko sprendimas (2026-08-30): iki v4.0 moduliarizavimo išleidimo sparta yra svarbesnė
už techninės skolos ribojimą. Visos **skaitinės** reketo bazinės ribos buvo vienu
audituojamu veiksmu sušvelnintos 20 %, o etapas deklaruotas faile `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Kas pasikeitė                                                                                                                                                                                                               | Kur                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — skaičiai, kuriems mažiau yra geriau, ×1.2, procentai, kuriems daugiau yra geriau, ÷1.2 (minimali aprėptis palikta 60, `eslintErrors` lieka 0, `eslintWarnings` 0 → 20 % užfiksuoto nutildymų skaičiaus) | `quality-baseline.json` (`_relax_velocity_2026_08_30` pastaboje išvardytos visos reikšmės prieš → po)  |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                            | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, kiekviena `frozen[*]` / `testFrozen[*]` eilučių riba ×1.2                                                                                                                                                 | `file-size-baseline.json`                                                                              |
| kiekvieno failo / kiekvieno TS kodo skaičiai ×1.2                                                                                                                                                                           | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                         | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` tampa rekomendacinis, kol `_policy.requireTighten === false`                                                                                                                                            | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| naktinis `bank-ratchet-shrinks` pristabdomas (jis užfiksuotų išmatuotą sumažėjimą ir panaikintų rezervą)                                                                                                                    | `.github/workflows/nightly-release-green.yml`                                                          |

Leidžiamųjų reikšmių sąrašai (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **nėra** biudžetai ir nebuvo keičiami. Praėjimo / nepraėjimo politikos patikros (paslaptys, SQL taisyklės,
dokumentacijos ir aplinkos sutartis, i18n atitiktis, vienetų testai) nepasikeitė — nepraėjęs testas tebėra nepraėjęs testas.

**Įrankiai**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — vienkartinis
  sušvelninimas (`scripts/quality/relax-baselines.mjs`); atsisako būti vykdomas antrą kartą su ta pačia
  pastaba.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  išmatuoja kiekvieną skaitinę patikrą taip, kaip tai daro CI, ir išveda likusį kiekvienos patikros rezervą
  (`scripts/quality/baseline-headroom.mjs`). Naktinė `baseline-headroom` užduotis paskelbia
  lentelę darbo eigos vykdymo suvestinėje ir įkelia jos JSON / Markdown ataskaitą kaip
  `baseline-headroom-<run_id>`, saugomą 90 dienų. Įspėjimo ir kritinės eilutės nurodo patikras,
  kurioms iki ribos liko ne daugiau kaip 10 % arba kurios ją jau viršijo. Peržiūrėkite šias ataskaitas
  kaip ankstyvą perspėjimą apie naudojamus biudžetus; patikrinkite atitinkamos patikros
  `_rebaseline_*` pastabas. Užduotis daugiau nebekuria ir neatnaujina nuolatinės problemos; #12149
  išsaugo ankstesnių ataskaitų istoriją.

**Naujo kodo režimas (Clean-as-You-Code) — nuo 2026-08-30, tik spartusis PR kelias**

Per `pull_request` įvykius `quality.yml` perduoda `--base-ref <PR bazės SHA>` komandoms `check:file-size`,
`check:complexity-ratchets` ir `check:dead-code`. Naudojant `check:complexity-ratchets` ir
`check:dead-code`, patikra lygina HEAD su sujungimo baze, **apsiribodama PR pakeistais failais**
(`scripts/check/newCodeMode.mjs`: sujungimo bazė parengiama vienkartiniame
`git worktree`, ESLint / knip paleidžiami joje ir HEAD būsenoje, tada apskaičiuojami kiekvieno failo
skaičių skirtumai):

- **blokuojanti patikra** — PR pridėjo ciklomatinio / kognityvinio sudėtingumo pažeidimų arba nenaudojamų eksportų pakeistuose failuose
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` žurnale);
- **rekomendacinė patikra** — bendras visuotinis skaičius, palygintas su užfiksuota bazine riba. Paveldėtas nuokrypis niekada
  nesukelia nesusijusio PR nepraėjimo; nuokrypis iš naujo užfiksuojamas derinant leidimą ir stebimas rezervo užduoties.

`check:file-size` bazinę nuorodą naudoja pagal savo taisykles (`scripts/check/check-file-size.mjs`, #8522):
jis patikrina kiekvieną šaltinio kodo ir testų failą medyje, naudodamas `git show` nuskaito kiekvieno failo
eilučių skaičių PR bazėje ir pažymi failą kaip nepraėjusį tik tada, kai jis išauga virš didesnės iš šių reikšmių:
jo bazinės viršutinės ribos (`frozen` / `testFrozen` arba `cap` / `testCap`, jei failo nėra bazėje) ir jo bazinio
dydžio. Todėl failas, kuris jau nukrypo bazėje, niekada nesukelia nesusijusio PR nepraėjimo.

`check:boundary:ratchet` taiko tą pačią taisyklę savo vieninteliam skaičiui
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR įvykių metu tiek
`quality.yml` spartieji barjerai, tiek `ci.yml` lint užduotis perduoda PR bazės SHA, bazinis
commit išmatuojamas iš `git archive` eksporto, o PR nepavyksta tik tada, kai jo `open-sse → src`
ryšių skaičius viršija didesnę iš šių reikšmių: `metrics.boundaryOpenSseToSrc` arba bazės ryšių
skaičių. Bazės nuokrypis virš ribos pranešamas (`base drift herdado`), tačiau dėl jo nekaltas PR
niekada nepažymimas kaip nepavykęs; push → main išlaiko absoliučią ribą, o jei bazės SHA
neįmanoma nustatyti, su įspėjimu grįžtama prie šios ribos.

`workflow_dispatch` vykdymai, leidimo žalios būsenos patikra ir naktinė rezervo užduotis neturi PR
bazės, todėl išlaiko absoliutų (visuotinį) palyginimą. Aprėptis, dubliavimas ir tipų aprėptis kol
kas lieka visuotiniai (jų įrankiai negali nebrangiai sugeneruoti kiekvieno failo skirtumo) — tai
kandidatai tokiam pačiam apdorojimui.

**Etapo užbaigimas ties v4.0 (LTS = griežčiau nei anksčiau, o ne „grįžimas į įprastą būseną“)**

1. Grynoje `release/v4.0.0` viršūnėje: įrašui paleiskite `npm run quality:headroom --json`, tada
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` ir kiekvieno tipų tikrinimo
   barjero `--update` — kiekviena bazinė reikšmė sumažinama iki išmatuotos reikšmės.
2. Pašalinkite `_policy` iš `quality-baseline.json` (taip iš naujo įjungiami `--require-tighten`
   ir naktinis rezervo kaupimas), o faile `check-openapi-coverage.mjs` atkurkite
   `THRESHOLD = 36` (arba didesnę reikšmę).
3. Ten, kur modularizavimas pasiteisino, sugriežtinkite ribas labiau nei išmatuota: failo dydžio
   `cap` vėl nustatykite į 1000 (arba 800), aprėpties apatines ribas padidinkite 5, o
   nenaudojamų eksportų skaičių modularizuotuose paketuose nustatykite į 0.

## Reketo bazinė reikšmė (`quality-baseline.json`)

Reketo variklis (`scripts/quality/check-quality-ratchet.mjs`) nuskaito `quality-baseline.json`
ir palygina jį su naujai surinktu `quality-metrics.json`. Jei kuris nors rodiklis pablogėja
daugiau nei leidžiama jo epsilon reikšmė, komponavimas laikomas nesėkmingu.

Šiuo metu stebimi rodikliai:

| Rodiklis              | Kryptis | Reikšmė                                |
| --------------------- | ------- | -------------------------------------- |
| `eslintWarnings`      | `down`  | ESLint įspėjimų skaičius neturi didėti |
| `coverage.statements` | `up`    | Sakinių aprėptis neturi mažėti         |
| `coverage.lines`      | `up`    | Eilučių aprėptis neturi mažėti         |
| `coverage.functions`  | `up`    | Funkcijų aprėptis neturi mažėti        |
| `coverage.branches`   | `up`    | Šakų aprėptis neturi mažėti            |

Norėdami atnaujinti bazinę reikšmę po realaus pagerėjimo:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Žyma `--update` įrašo dabartines išmatuotas reikšmes į `quality-baseline.json`.
Įtraukite šį failą į tą patį pakeitimų įrašą kaip ir rodiklį pagerinusį pakeitimą. PR, kuris pagerina
rodiklį neatnaujindamas bazinės reikšmės, bus aptiktas naudojant `--require-tighten` (6A.5 etapas,
įgyvendinimas dar laukiamas).

### CodeQL reketas: atnaujinimo dažnis ir rankinis paleidimas

`check:codeql-ratchet` nuskaito **saugyklos būseną, atnaujinamą pagal tvarkaraštį, o ne kiekvienam PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` pateikia
`state: configured`, `schedule: weekly`: tai GitHub numatytojo nustatymo nuskaitymas, o ne
kiekvieno išsiuntimo analizė. Pasekmė: sujungus įspėjimus IŠTAISANTĮ PR, reketas toliau
nuskaito seną, didesnį skaičių, kol bus paleistas kitas suplanuotas nuskaitymas, todėl
jis praneša apie regresiją kiekviename atvirame PR, įskaitant ir taisančio PR tolesnius
pakeitimus, kol nuskaitymo rezultatai pasivys.

**Rankinis atnaujinimas**: `gh workflow run codeql.yml --ref release/vX.Y.Z` iš naujo paleidžia
analizę ir per kelias minutes pakartotinai paskelbia įspėjimus. Pirmiausia perskaitykite `.github/workflows/codeql.yml`
— jo antraštėje paaiškinta, kad jis skirtas **tik `workflow_dispatch`**, nes **konfliktuoja su
GitHub „default setup“** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Norint atkurti `push`/`pull_request`/
`schedule` paleidiklius, pirmiausia būtinas **savininko veiksmas**: Settings → Code security →
CodeQL: Default → Advanced. Nepridėkite `schedule:` paleidiklio neatlikę šio perjungimo — jis
tik sukurs nesėkmingus paleidimus.

**Sumažėjus skaičiui, sugriežtinkite bazinę reikšmę** — `node scripts/check/check-codeql-ratchet.mjs
--update` įrašo naują išmatuotą skaičių į `quality-baseline.json` →
`metrics.codeqlAlerts.value`, kad reketas tyliai neleistų regresijos iki ankstesnės viršutinės
ribos. Praktinis pavyzdys (2026-09-02/03): PR #12502 ištaisė 7 realius įspėjimus
(13 → 6 išmatuoti atviri); PR #12530 sugriežtino užfiksuotą bazinę reikšmę nuo 11 iki 6, kad ji atitiktų rezultatą; likę
6 įspėjimai tuomet buvo atmesti, kiekvienam pateikiant atskirą pagrindimą, kol atvirų įspėjimų liko 0.

**Sprendimą dėl atmetimo priima operatorius (griežta taisyklė #14)** — niekada neatmeskite CodeQL įspėjimo
atmetimo komentare neįrašę techninio pagrindimo: `won't fix`, kai tai aukštesnio lygmens protokolo
reikalavimas, `used in tests`, kai tai testų fikstūra, `false positive`, kai naudojama dezinfekavimo priemonė,
kurios CodeQL negali aptikti (precedentas: `docs/security/ERROR_SANITIZATION.md`).

---

## Testų pakartojimo politika (WS5.4, v3.8.49)

Pakartojimo politika nustatoma kiekvienai vykdymo priemonei atskirai ir niekada netaikoma visuotinai — visuotinis pakartojimas tikras regresijas paverčia nematomais nestabiliais testais:

| Vykdymo priemonė | Politika                                                                                                                                                  | Kodėl                                                                                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` tik CI aplinkoje, su `trace: on-first-retry`                                                                                                 | Naršyklės / tinklo laiko parinkimas iš tiesų yra nedeterministinis; vienas pakartojimas su trasavimu nestabilų testą paverčia diagnozuojamu artefaktu |
| Vitest           | JOKIO visuotinio pakartojimo. Patvirtintai nestabiliam testui aiškiai nustatomas individualus pakartojimas (matomas pakeitimų skirtume ir peržiūrimas PR) | Taip karantino sąrašas lieka repozitorijoje ir niekada nebūna nepermatomas                                                                            |
| node:test (unit) | JOKIO pakartojimo, niekada                                                                                                                                | Nestabilus vienetinis testas yra testo klaida — ją ištaisykite, o ne bandykite dar kartą                                                              |

Tiksliniai SLO, kai bus įdiegta nestabilumo telemetrija (WS5.2/5.3): <1 % nestabilumo dažnis vienam testui
(„taisyti dabar“ slenkstis), ≥95 % sėkmingo vykdymo dažnis vienam konvejeriui. Tai pramonės orientacinės vertės —
jas reikia iš naujo sukalibruoti pagal mūsų pačių matavimus.

## Leidimo lygmens kartelės nuokrypis (WS5.5, v3.8.49)

Kai kartelė (failo dydžio, sudėtingumo, eslint įspėjimų) regresuoja GRYNAME leidimo
viršūnės taške, t. y. ją pablogino SUJUNGTŲ pakeitimų VISUMA, o nė vienas atskiras PR
savo šakoje regresijos neatkuria, pataisą turi atlikti **leidimo vadovas, vieną kartą,
leidimo šakoje**: pirmenybę teikite išskyrimui / pertvarkymui; bazinę reikšmę iš naujo
nustatykite tik pateikę dokumentuotą pagrindimo įrašą. Niekada neperkelkite kombinacinio
nuokrypio į pakeitimo autoriaus PR ir niekada iš naujo nenustatykite bazinės reikšmės
kiekvienam PR (tai paslepia tikras regresijas). Pirmiausia atskirkite priežastį: prieš
manydami, kad ją sukėlė jūsų PR, atkurkite nesėkmę pagal gryną viršūnės tašką
bandomajame worktree.

## Kartelės sumažinimų užfiksavimas — mažėjimo kryptis (#8584)

Kartelė automatizuota tik iš dalies, ir būtent netinkama jos dalis. Viršutinės ribos
**didinimas** yra rankinis JSON redagavimas, trunkantis dešimt sekundžių ir greičiausiai
atblokuojantis nesėkmingą PR. Norint ją **sumažinti**, kas nors turi paleisti `--update`
ir įtraukti rezultatą į commit — o iki užduoties `bank-ratchet-shrinks` įdiegimo jokia
darbo eiga to nedarė. Išmatuotos pasekmės (2026-07-25): 18 fiksuotų failų jau neviršijo
naujiems failams taikomos 800 eilučių ribos, o blogiausias neatitikimas siekė 132×
(`src/shared/validation/schemas.ts`, 19 eilučių su 2,523 riba); sudėtingumo viršutinė
riba per maždaug 37 bazinės reikšmės atnaujinimo pastabas pakilo `1794 → 2169`, o
sumažėjo tiksliai vieną kartą (−1); be to, „kitame cikle sugriežtinti naudojant
`--update`“ buvo parašyta 31 kartą, bet įvykdyta vieną kartą. Riba, išliekanti ilgiau
nei ją nulėmęs kodas, kiekvieną užbaigtą išskaidymą tyliai paverčia augimo leidimu tam,
kas failą redaguos vėliau.

`nightly-release-green.yml` → užduotis **`bank-ratchet-shrinks`** uždaro šį ciklą:

|             |                                                                                                                  |
| ----------- | ---------------------------------------------------------------------------------------------------------------- |
| Paleidžiama | pagal `schedule` (3× per dieną) + `workflow_dispatch` — sąmoningai **ne** pagal `push`                           |
| Matuoja     | aukščiausią `release/vX.Y.Z`, naudodama tokią pačią skyrą ir įterpimo apsaugą kaip `release-green`               |
| Įrašo       | `check:file-size --update` ir `check:complexity-ratchets --update` (abu dėl savo konstrukcijos gali tik mažinti) |
| Patikrina   | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                         |
| Pateikia    | vieną visada aktualų PR į leidimo šaką — priverstinai atnaujinamą, niekada nekuriantį perteklinių PR             |

Sumažinimai fiksuojami paketais, o ne po kiekvieno push, nes tam nėra delsos reikalavimo
(pakanka sumažinimą užfiksuoti per 8 val.), o vykdant po kiekvieno sujungimo PR šaka būtų
pakartotinai kuriama per sujungimo kampanijas ir kiekvieną kartą reikėtų vykdyti visą
ESLint patikrą. Aptikimas ir toliau vykdomas per push (`release-green`); paketais
atliekamas tik fiksavimas.

### Saugos tikrintuvas

Užduotis bazines reikšmes keičia be priežiūros, todėl būtent `verify-ratchet-bank.mjs`
užtikrina, kad tai būtų priimtina. Jis palygina medį po `--update` su `HEAD` ir
**nutraukia užduotį dar prieš sukuriant bet kokį commit** — neatverdamas jokio PR —
nebent kiekvienas pakeitimas yra vienas iš šių:

- `frozen` / `testFrozen` skaitinė reikšmė **sumažinta** arba **pašalinta**
- `complexity-baseline.json` → `count` **sumažinta**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **sumažinta**

Visa kita laikoma nesėkme: skaičiaus didinimas, įrašo pridėjimas, `cap` / `testCap`
keitimas arba `_rebaseline_*` pastabos ištrynimas / perrašymas (šios pastabos yra audito
seka, paaiškinanti kiekvienos viršutinės ribos priežastį, ir saugomos tame pačiame
`frozen` objekte kaip failų įrašai). Robotas, galintis padidinti ribą, būtų akivaizdžiai
blogesnis už esamą padėtį. Regresijos apsauga: `tests/unit/verify-ratchet-bank.test.ts`.

Užduotis niekada nevykdo push į `release/*` — PR sujungia žmogus, todėl klaidingas
matavimas negali būti įtrauktas be peržiūros.

## Leidžiamųjų sąrašo politika

Kiekviena patikra, kuri negali nepavykti dėl jau egzistuojančių pažeidimų, naudoja fiksuotą leidžiamųjų sąrašą
(pvz., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Politika yra tokia:

**Pašalinkite pagrindinę priežastį; leidžiamųjų sąrašą naudokite tik tada, kai pažeidimas jau egzistavo ir
jo negalima ištaisyti tame pačiame PR.**

Pridėdami įrašą į leidžiamųjų sąrašą:

1. Įtraukite komentarą su pagrindimu.
2. Nurodykite susijusią sekimo užduotį (pvz., `// #3498 — 2 etapo funkcija, dar neįgyvendinta`).
3. Pašalinkite įrašą tame pačiame PR, kuriame ištaisomas pažeidimas — pasenęs įrašas, kuris daugiau
   nebeslopina aktyvaus pažeidimo, pats yra defektas (įgyvendinus 6A.3 pasenusių taisyklių kontrolę,
   patikra nepraeis dėl niekur nebenaudojamo leidžiamųjų sąrašo įrašo).

**Nepridėkite** įrašų į leidžiamųjų sąrašą vien tam, kad testai būtų išlaikyti greičiau. Sėkminga patikra su augančiu
leidžiamųjų sąrašu sukuria klaidingą kokybės įspūdį.

### Kai jūsų PR nepraeina patikros

1. **Atidžiai perskaitykite patikros išvestį** — joje tiksliai nurodoma, kuris failas ar simbolis
   pažeidė taisyklę.
2. **Ištaisykite pažeidimą** — dauguma patikrų yra deterministinės failų sistemos patikros, kurios praeina vos tik
   kodas tampa teisingas.
3. **Jei pažeidimas jau egzistavo** (t. y. jūs jo nesukūrėte, tačiau dabar patikra
   jį apima): pridėkite leidžiamųjų sąrašo įrašą su pagrindimo komentaru ir sekimo užduotimi.
4. **Jei patikra yra slenkstinė** (aprėptis, ESLint įspėjimai, dubliavimas, sudėtingumas):
   jūsų pakeitimas pablogino metriką. Ištaisykite pagrindinę problemą arba (retais atvejais) paleiskite
   `npm run quality:ratchet -- --update`, jei pakeitimas yra sąmoningas ir metrikos
   pablogėjimas priimtinas — tačiau PR apraše paaiškinkite, kodėl.
5. **Rekomendacinės patikros** (`continue-on-error: true`) yra informacinės — jos neblokuoja
   sujungimo, tačiau rodomos CI suvestinėje. Vis tiek jas ištaisykite.

---

## Naujos patikros pridėjimas

1. Sukurkite `scripts/check/check-<name>.mjs` (arba `.ts`). Politiką tikrinančios patikros baigiamos kodu 0/1.
   Slenkstinės patikros perduoda metriką į `quality-metrics.json` per `collect-metrics.mjs`.
2. Į `package.json` pridėkite `"check:<name>": "node scripts/check/check-<name>.mjs"`.
3. Prijunkite ją `.github/workflows/ci.yml` faile prie tinkamos užduoties
   (politika → `lint` arba `docs-sync-strict`; slenkstinė patikra → `quality-gate`).
4. Jei ji turi leidžiamųjų sąrašą, pritaikykite `reportStaleEntries()` iš
   `scripts/check/lib/allowlist.mjs`, kad pasenę įrašai būtų aptinkami automatiškai.
5. Parašykite testą kataloge `tests/unit/build/`, apimantį patikros aptikimo logiką.
6. Atnaujinkite šį dokumentą (pridėkite eilutę į atitinkamos užduoties lentelę).

---

## Agentų įrankiai: LSP cikle (pasirenkama)

Be CI patikrų, „OmniRoute“ pateikia **pasirenkamą** `agent-lsp` karkasą
(projekto lygmens `.mcp.json`, 7 etapas, 15 užduotis). Sukurkite `.mcp.json`,
kad programavimo agentams būtų pasiekiamas TypeScript kalbos serveris ir jie galėtų išspręsti simbolių /
diagnostikos problemas **prieš** rašydami kodą — tai kompiliavimo prieš teiginį papildinys
`typecheck:core` patikrai, pašalinantis „išgalvotų simbolių“ klaidas jų atsiradimo vietoje. Jis sąmoningai
neįkeliamas automatiškai (MCP↔LSP tarpinį sprendimą pasirenkate ir patikrinate patys); netinkamas įrašas tik užregistruoja
prisijungimo klaidą ir niekada nenutraukia seansų.

---

## Racionalizavimo darbų sąrašas (ROI peržiūra — 9 fazė, 3 banga)

Šis sąrašas buvo suderintas su `ci.yml` 2026-06-17 (ankstesnėje versijoje nebuvo
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Suderinto rinkinio ROI peržiūra
nustatė toliau pateiktus racionalizavimo kandidatus. **Sujungimai yra mechaniniai CI
pakeitimai; perjungimai ir pašalinimai yra operatoriui palikti politikos sprendimai.** Niekas iš toliau
pateiktų pakeitimų dar nepritaikyta.

**Taip pat pirmiau nedokumentuota** (patariamojo pobūdžio, silpnas signalas): `docs-lint` užduotis
(markdownlint + Vale, visai užduočiai taikoma `continue-on-error`) ir atskiros skenerių darbo eigos
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` yra
`quality-baseline.json`, tačiau nėra prijungta prie blokuojančio reketo `ci.yml` faile — šiuo metu ši metrika
yra nesusieta.

### Sujungimas / dubliavimo pašalinimas (mechaniniai pakeitimai, mažesnė rizika)

Kiekvienas kandidatas buvo patikrintas pagal faktinę vartų būseną 2026-06-17 (pasitikėk, bet patikrink);
paaiškėjo, kad keli „akivaizdūs“ sujungimai slepia techninę skolą ir **nėra** tiesiogiai pritaikomi.

- **`check:docs-sync` vykdoma du kartus** — atskirai `lint` užduotyje ir dar kartą `check:docs-all` (`docs-sync-strict`) viduje bei husky prieš patvirtinimą vykdomame kabliuke. ✅ **ATLIKTA** — atskiras iškvietimas `lint` užduotyje pašalintas.
- **CVE skenavimas** — ❌ **NETINKA tiesiogiai sujungti.** `audit:deps` griežtai nesėkmingai baigiasi aptikusi bet kokį aukšto / kritinio lygio CVE; `check:vuln-ratchet` (osv) nesėkmingai baigiasi tik esant _regresijai_, palyginti su bazine reikšme (šiuo metu 1 MODERATE). Semantika skiriasi — pašalinus `audit:deps` būtų prarasti absoliutūs aukšto / kritinio lygio vartai. Palikti abu.
- **Ciklų aptikimas** — ✅ **ATLIKTA** (#15159 G-01/G-02). Ankstesniame tekste `check:cycles` buvo vadinama „žaliais, kuruojamais“ vartais ir jos blokavimas buvo grindžiamas tuo, kad `check:circular-deps` (dpdm) pranešė apie 91 ciklą. Tas žalias rezultatas buvo **klaidingai teigiamas**: `check:cycles` skenavo 5 pakatalogius (450 failų), aptiko tik statinius `import|export … from` ir atmetė kiekvieną `@/` bei `@omniroute/open-sse/` specifikatorių, todėl negalėjo aptikti dinaminių importų ir pseudonimų ciklų, kurių saugykloje buvo daugiausia. Ištaisyta: dabar vartai pereina per `src` + `open-sse` (5023 failus), surenka specifikatorius iš TypeScript AST (todėl `import("…")` įskaičiuojamas, o tipo pozicijoje esantis `typeof import("…")` — ne) ir išsprendžia tsconfig `paths`. Aptinkama **14** ciklų, o ne 0. Kadangi 14 anksčiau egzistavusių ciklų negalima ištaisyti vartų PR, `check:cycles` dabar yra **reketas** (`--ratchet`, riba `metrics.cycles.value = 14` faile `quality-baseline.json`, `direction: down`) — jis blokuoja bet kokią _regresiją_, o skaičius gali tik mažėti. CI vykdo `npm run check:cycles:ratchet`. Mažinimo darbai vykdomi kartu su **A-01**. `check:circular-deps` (dpdm) lieka patariamojo pobūdžio kaip platesnė antroji nuomonė.
- **Sudėtingumas** — ✅ **ATLIKTA** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): vienas ESLint perėjimas, skaičiuojama pagal ruleId, todėl ciklomatinio sudėtingumo ir maksimalaus eilučių skaičiaus bei kognityvinio sudėtingumo bazinės reikšmės lieka nepriklausomos; atskiros `check:complexity` / `check:cognitive-complexity` paliekamos vietiniam `--update`.
- **`/api` apsauga nuo haliucinacijų** — ✅ **ATLIKTA** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): viena `src/app/api` FS inventorizacija, openapi-routes + docs-symbols vis dar teikia atskiras ataskaitas; atskiros patikros paliktos vietiniam vykdymui.
- **`check:node-runtime` vykdoma 11 užduočių** — ⚠️ **maža ROI.** Kiekvienai naudojamas atskiras vykdytojas, o patikra trunka <1 s; iš viso būtų sutaupyta ~10 s, tačiau būtų prarasta nebrangi kiekvienos užduoties apsauga. Neverta sukeliamo triukšmo.
- **`typecheck:noimplicit:core` CI lint užduotyje** — ✅ **pašalinta iš lint užduoties** (buvo patariamojo pobūdžio `continue-on-error`); blokuojamas tipų paviršius yra `typecheck:core` + `check:type-coverage`. Vietinis scenarijus paliktas.

### Perjungti / nuspręsti (operatoriaus politika)

- `check:openapi-security-tiers` (patariamojo pobūdžio) — ❌ **NETINKA tiesiogiai perjungti.** Ji baigiama su 0 kodu, tačiau įspėja, kad keliems `traffic-inspector` maršrutams, esantiems `LOCAL_ONLY_API_PREFIXES`, trūksta anotacijos `x-loopback-only: true`. Norint ją padaryti privalomą, pirmiausia reikia pridėti tas anotacijas į `openapi.yaml`.
- `typecheck:noimplicit:core` (patariamojo pobūdžio) — didžiąja dalimi pakeista blokuojančiu `check:type-coverage` reketu. Perjungti į reketą arba pašalinti perteklinį antrąjį `tsc` perėjimą.
- `test:vitest:ui` (dabar **blokuojanti**) — anksčiau egzistavusios triktys aiškiai neįtrauktos faile `vitest.config.ts` su `// #8618` sekimo komentarais; dėl naujų trikčių užduotis baigiama nesėkmingai.
- `check:secrets` (gitleaks, blokuojantis reketas, užfiksuotas ties 3 dokumentuotais klaidingai teigiamais rezultatais) — įtraukti šiuos 3 į leidžiamųjų sąrašą, kad būtų pasiektas 0, arba pažeminti iki patariamojo pobūdžio. Dubliuojasi su GitHub integruotu paslapčių skenavimu + `check:public-creds`.
- `check:pr-evidence` (blokuojanti, ieško atitikmenų PR aprašo tekste) — didelė klaidingai teigiamų rezultatų rizika; ją pašalinus susilpnėtų griežtosios taisyklės Nr. 18 vykdymas, todėl tai tikras politikos sprendimas.
- `semgrep` (atskira patariamojo pobūdžio patikra) — dubliuojasi su CodeQL OWASP šeimoms; prijungti jos bazinę reikšmę prie reketo arba pašalinti.

---

## Susijusi dokumentacija

- Tiekimo grandinė (kilmė, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — raktų rinkinių atitikties patikra

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, užduotis `i18n-ui-coverage`).
Palygina kiekvieno `src/i18n/messages/<locale>.json` galinių raktų rinkinį su `en.json` ir patikra
nepavyksta aptikus bet kokį trūkstamą ar perteklinį galinį raktą, neatsižvelgiant į tai, kada jis
buvo pridėtas. `__MISSING__:` vietos rezervavimo žymenys laikomi esamais (jų turinį vertina
santykio patikra). Tai yra absoliutus dviejų pakeitimų skirtumais ir procentais pagrįstų patikrų
papildinys: `check-ui-keys-coverage` kiekvienai lokalei nustato 80 % apatinę ribą (trūkstant 43
raktų iš ~13 000, vis tiek rodoma 99,7 %), o `check-new-key-coverage` vertina tik tuos raktus,
kuriuos PR prideda į `en.json`. Lokalės paketas sugeneruojamas iš tos dienos, kai sukuriama jo
šaka, `en.json` ir verčiamas kelias dienas, nors bazinėje šakoje vis pridedama naujų raktų; pats
paketo PR neprideda jokio rakto, todėl abi giminingos patikros nieko nepranešė, kai 1 paketas
(#13044) buvo sujungtas devyniose lokalėse trūkstant 43 raktų, o 2 paketas (#13660) — aštuoniose
lokalėse trūkstant 10 raktų (2026-09-15). Raudoną būseną ištaisykite naudodami
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; `extra` galinis raktas
reiškia, kad jis pašalintas iš šaltinio — pašalinkite jį iš lokalės. `--warn` pateikia ataskaitą
nesukeldamas nesėkmės. `--catalog=cli` tą patį palyginimą vykdo kataloge `bin/cli/locales`
(`npm run i18n:check-keys:cli`); abu žingsniai yra užduotyje `i18n-ui-coverage`.

#### `check-new-key-coverage` — naujų i18n raktų patikra

Gimininga `check-ui-value-drift` patikra. Pastaroji aptinka atvejį, kai angliška reikšmė buvo
**perrašyta**, tačiau jos vertimai nebuvo atnaujinti; ši patikra aptinka atvejį, kai angliškas
raktas buvo **pridėtas**, tačiau kai kurios lokalės jo negavo.

`check-ui-keys-coverage` negali aptikti šios klasės problemų: ji kiekvienai lokalei nustato
procentinę apatinę ribą, o trūkstant vienuolikos raktų iš ~13 000 aprėptis vis tiek siekia 99,9 %.
Procentinė kiekvienos kalbos reikšmė negali išreikšti „ši funkcija išleista neišversta“ — naujoje
lokalėje gali atsirasti visa funkcija be jokio teksto, o skaičius visiškai nepasikeis.

Incidentas, kurį ji įamžina: 3-iajame „Orchestration Canvas“ etape vienuolika jo raktų buvo
išversti į tuo metu egzistavusias 42 lokales. Po kelių valandų ES kalbų paketas (#13044) padidino
repozitorijos lokalių skaičių iki 51, o devynios naujos lokalės (`el`, `et`, `ga`, `hr`, `lt`,
`lv`, `mt`, `sl`, `sr`) jų taip ir negavo. `deepMergeFallback` vietoje trūkstamo rakto pateikia
anglišką tekstą, todėl problema pasireiškė neišversta, o ne tuščia naudotojo sąsaja — ji buvo
reali ir dėl pačios konstrukcijos nepastebima.

Kaip ir gimininga patikra, ji **atsižvelgia į pakeitimų skirtumus**, lygindama bazinio sujungimo
taško anglų kalbos duomenis su darbiniu medžiu, todėl ankstesnės spragos lieka užfiksuotos ir
įjungiant patikrą nereikėjo jokio perkėlimo.

**`__MISSING__:<english>` žymuo šios patikros netenkina (nuo 2026-09-17).** Anksčiau tai buvo
dokumentuotas atidėjimo būdas — vykdymo metu naudojamas tinkamas angliškas tekstas — kol aštuoni
funkcijų PR 2026-09-16 pridėjo 61 raktą ir, užuot juos išvertę, į visas 65 lokales įrašė šį
žymenį: ši patikra priėmė juos visus, niekas nesustabdė PR, o leidimo šakos viršūnėje privaloma
tikrų vertimų santykio patikra nepavyko visiems (pt-BR 3,2 % > 2,5 % + 0,5). Dabar žymuo
vertinamas kaip trūkstamas vertimas. Raudoną būseną ištaisykite naudodami
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` arba
visas lokales lygiagrečiai apdorodami su `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, saugu vykdyti atsietai, atsisako pradėti be
`OMNIROUTE_TRANSLATION_*` aplinkos kintamųjų). Raktas, kuris privalo likti angliškas
(fiksuotas produkto, variklio ar vėliavėlės pavadinimas), turi būti įtrauktas į
`scripts/i18n/untranslatable-keys.json`, o ne slepiamas už žymens. `vi` visiškai draudžia
žymenis (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — atidėtų testų patikra

Failas, esantis `vitest.config.ts` sąraše `exclude`, yra nevykdomas testas, nors medį skaitančiam
asmeniui jis atrodo kaip aprėpties dalis. Už komentaro
`// #8618 — pre-existing failure; remove this exclusion when fixed` susikaupė šešiasdešimt du
failai. Problema #8618 buvo uždaryta 2026-08-11, o jos stebimas sąrašas išaugo nuo 45 iki 62
įrašų; kiekvienas naujas įrašas paveldėjo komentarą su nuoroda į uždarytą problemą. Kai sąrašas
pagaliau buvo patikrintas failas po failo (#13204), **51 iš 62 failų sėkmingai veikė su esamu
medžiu be jokių šaltinio pakeitimų**.

Patikra reikalauja, kad kiekviena išimtis, nurodanti realų failą, (a) įvardytų stebėjimo problemą
ir (b) būtų įtraukta į `config/quality/vitest-exclusions.json` su išmatuota būsena, kad naujos
išimties pridėjimas būtų peržiūrimas pakeitimas specialiame faile, o ne dar viena eilutė 60 įrašų
masyve. Ji sąmoningai pakartotinai nevykdo neįtrauktų testų — tai trunka ~10 minučių ir turėtų
būti atliekama periodinėje užduotyje; inventoriuje registruojama, kada kiekvienas testas buvo
paskutinį kartą patikrintas.
