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

## Vartų inventorizacija ir vykdymo profiliai

### Kandidatų priėmimas

CI ir „Quality Gates“ darbo eigos skleidžia stabilų sprendimą: `Gate / CI` ir `Gate / Quality`. Jų sudarytoje priėmimo politikoje yra išvardijami visi ankstesni darbai, kaip reikalaujama arba patariama. Reikalingas darbas turi būti sėkmingas: trūkstamų, atšauktų, praleistų, laukiančių ir nežinomų rezultatų negalima nustatyti PASS. Dėl galiojančios tik dokumentų arba tik katalogo klasifikacijos kodo juosta gali būti netaikoma; PR projektas nėra priimtas kandidatas. `hotfix` etiketė neatsako įrodinėjimo.

Abi darbo eigos apima PRs į main/release šakas, stumia į `main`, rankinio išsiuntimo ir sujungimo grupės įvykius. Stumti, išsiųsti ir sujungti grupę paleiskite visą pasirinkimą. Paspaudimai į `release/**` jų nepaleidžia (2026-10-18): kiekvienas pakeitimas jau paleido matricą savo PR, o sujungtas derinys yra Release-Green darbas (`docs/ops/RUNNER_BOX.md` → Hosted lane). Šakės ir sujungimo grupės naudoja priglobtus bėgikus darbams, kurie kitu atveju pasirenka savarankiškai priglobtus bėgikus; Prieš išleidžiant turi būti patikrinta, ar yra pakankamai talpyklų.

Įprastas PR vykdo greitą pasirinkimą. Priėmimo politikos `full-code` ir `full-code-e2e` juostos (E2E, integracija, paketo artefaktas, Electron dūmai, Bun SQLite, ekosistemos ir protokolo klientai) veikia tik sujungimo eilės juodraštyje arba visą paleidimą: `gh workflow run ci.yml --ref <branch>`.

Kiekviename JSON kvite nurodomas patikrintas SHA, darbo eigos vykdymas ir bandymas. CLI atmeta checkout/event SHA neatitikimą. Darbo eigos testai susieja politikos narystę su verdikto darbo `needs` sąrašu, todėl nauja arba pašalinta juosta negali tyliai išnykti. Kvitai apima jų pačių darbo eigą, o ne paskelbimą, diegimą ar esamo patariamojo skaitytuvo vidines dalis. Abiejų čekių pavadinimų aktyvinimas šakos taisyklėse yra atskiras administracinis pakeitimas; šių darbų pridėjimas neapsaugo filialo.

### Sujungti eilę

`queue` etiketė siunčia PR į sujungimo eilę (`.mergify.yml`). Sujungimas atidaro PR juodraštį `mergify/merge-queue/` šakoje, CI ten paleidžia visą pasirinkimą, o pradinis PR sujungiamas, kai praeina `Gate / CI`, `Gate / Quality` ir `Merge integrity (changelog + generated skills)`.

Mergify įrašo savo eilės suvestinę į juodraščio aprašą, o kitos programos taip pat gali ją redaguoti. Tokio juodraščio `pull_request` `edited` įvykis paima savo lygiagretumo grupę (`-queue-edit-<run_id>`), todėl negali atšaukti tikrojo juodraščio vykdymo ir praleidžia vartus bei matricą. Tik `Merge integrity` vis dar veikia. Praleisto vartų užduotis turi kitą patikros pavadinimą, nes Mergify nuskaito praleistą `Gate / CI` kaip nepavykusią patikrą ir ištraukia PR.

Nutraukus eilę, stūmimas ne visada papildo PR. Komentuokite `@mergifyio queue`.

### Priėmimo reduktoriuje išliko įrodymai

`scripts/quality/validate-release-acceptance.mjs` sumažina pateiktą planą ir jo apraiškas; jame nenustatyta, kad planas apima visą išleidimo vamzdyną. Jos ataskaitose aiškiai nustatytas `releaseAcceptance: false`, net kai tas planas yra `VERIFIED`. `release-acceptance.yml` darbo eigoje vis dar naudojami šešėliniai įrenginiai, o ne tikri kūrimo, paketo, įkrovos ar reklamos kvitai.

CLI reikalauja, kad `--evidence-root` patikrintų išsaugotus įrodymus. Failai išsprendžiami kaip `<evidence-root>/<artifact_id>/<member>` ir maišos kaip SHA-256. PASS įrašas be įrodymų, trūkstamas arba pakeistas failas, nesaugus kelias arba simbolinė nuoroda neleidžia patikrinti. Trūkstami failai nėra lygiaverčiai tuščiiems sėkmingiems žurnalams. Esami SHA/run/attempt patikrinimai išlieka nepriklausomi: sutampantys baitai negali išgelbėti pasenusio kvito. Failo vientisumas nėra vykdymo autentiškumo ar artefakto reklamavimo įrodymas.

### Statinio nuskaitymo inventorius

Versijų npm-alias inventorius ir statinio nuskaitymo narystė veikia `config/quality/gate-manifest.json`. Paleiskite `npm run check:gate-manifest`, kad patikrintumėte scenarijų pavadinimus ir tikslias komandas prieš `package.json`; papildymai, pašalinimai ir komandų perkėlimas nesugeba atlikti vietinio užkabinimo ir keitimo-klasifikavimo užduočių CI. Pseudonimas nėra darbo eigos užduotis, matricos egzempliorius ar bandomasis atvejis: šie skaičiai neturi būti pateikiami kaip keičiami.

Naudokite `npm run quality:scan -- --list` arba `npm run quality:scan:fast -- --list`, kad patikrintumėte pasirinktus slapyvardžius jų nevykdydami. Vykdytojas iškviečia npm įėjimo tašką, todėl jo vykdymo laikas (įskaitant Bun jei sukonfigūruotas) išsaugomas. Apraše įrašomi slapyvardžiai už tų profilių ribų, kaip atskirai iškviesti, o priežiūros komandos draudžiamos tik skaitomuose nuskaitymo profiliuose.

Šie profiliai apima tik statinį nuskaitymą. Jie nesertifikuoja gaminio bandymų, aprėpties, pakuotės, išorinių patikrinimų ar kandidato visiško išleidimo priėmimo. Darbo eigos priėmimui naudojami susieti `config/quality/admission-policy.json` ir `scripts/quality/admission-verdict.mjs`. Išleidimo ir stebėtojo profiliai lieka atskiri; savarankiškai patikrinti jų taikomus čekius ir kvitus. Visos stebėtojo statinės komandos yra deklaruojamos `config/quality/release-green-static-profile.json`, įskaitant `audit:deps`, mutacijų testo pasirinkimą ir vertimo patikrinimus. Įkroviklis patvirtina npm komandas pagal package.json ir modeliuojamas CI/Quality deklaracijas; jis atmeta dreifą, užuot vykdydamas apvalkalo žetonus kaip argumentus. Reikalinga skaitytuvo SKIP/INCOMPLETE išvestis negali nustatyti PASS. Profilis įrašo išorinius išskyrimus ir nepakeičia priglobtos aprėpties, bandymų matricų, paketo ar diegimo įrodymų. Žemiau pateiktas prozos inventorius yra nuoroda, o ne įrodymas, kad vartai iš tikrųjų bėgo.

Scenarijai gyvena pagal `scripts/check/` (politikos vartai) ir `scripts/quality/` (reketo variklį). CI tiesos šaltinis yra `.github/workflows/ci.yml`.

### Atleiskite PR greitąjį kelią (`quality.yml`)

`.github/workflows/quality.yml` papildo CI main/release PRs, stumia į `main`, siunčia ir sujungia grupes. PRs naudokite pagal kelią filtruotus greitus patikrinimus. Buvo pašalintas visam laikui išjungtas dublikatas; tikrieji build/package/boot patikrinimai lieka CI. Vieneto komplektas ir vitest veikia tik CI (`Unit Tests (N/8)` ir `Vitest`).

| Darbas                                           | Taikymo sritis                                                                                                                                               | Blokavimas              |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs ir docs-all                                                                                                                     | Taip                    |
| `Fast Quality Gates`                             | Kodas PRs; statiniai patikrinimai, tipo patikra, prietaisų skydelio tipo patikra, paveiktų įrenginių testai, pamirštų brolių ir seserų testai (patariamasis) |
| `No new ESLint warnings`                         | Kodas PRs; slopinantis pūkelių apsauga                                                                                                                       | Taip, įskaitant šakutes |
| `Merge integrity (changelog + generated skills)` | Ne skersvėjis PRs; pakeitimų žurnalas ir sugeneruotas įgūdžių sinchronizavimas                                                                               | Taip, įskaitant šakutes |

#### Pamirštų brolių ir seserų bandymų ataskaita

`npm run check:forgotten-sibling-tests` veikia kaip patariamasis `Fast Quality Gates` veiksmas ir pakartotinai naudoja importavimo sprendiklį, esantį už bandymo poveikio žemėlapio. Kiekvienam pakeistam gamybos moduliui jis praneša apie deterministines `changed module/symbol -> static consumer -> candidate sibling test` grandines, kai kandidato testo nėra ištraukimo užklausos skirtume. Žymėjimo suvestinė ir JSON rezultatas išsaugomi kaip `forgotten-sibling-tests` darbo eigos artefaktas kalibravimui prieš bet kokį blokavimo išleidimą.

Barrelinis reeksportas ir dinaminis importas yra tik skiriamosios gebos diagnostika; jie niekada nesukuria blokuojančio radinio. Apžvelgtos išimtys gyvena `config/quality/forgotten-sibling-allowlist.json`. Kiekvienas įrašas turi įvardyti vartotojo ir kandidato testą, pateikti konkretų pagrindimą ir susieti GitHub problemą arba užklausą. Netinkamai suformuotus įrašus nepavyko uždaryti. Išimtys negali nuslopinti ištrinto kandidato testo arba skirtumo, kuris prideda `.skip`/`.todo`; tvirtinimo susilpnėjimas ir kitas maskavimas lieka nepriklausomai blokuojantiems `check:test-masking` vartams.

### Darbas: `lint`

Veikia kiekviename nuo PR iki `main`. Blokai susijungia sugedus.

| Scenarijus (`npm run ...`)        | Patvirtina                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Blokavimas                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| `check:node-runtime`              | Node.js versija yra palaikomo diapazono ribose                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Taip                                        |
| `check:cycles`                    | Žiedinis importavimas visame `src/` + `open-sse/` (pagrįstas AST, išspręstas tsconfig `paths` ). Bare išeina iš 1, kai egzistuoja koks nors ciklas (nebuvimas uždarytas nuo #15281) ir pateikia SCCs sąrašą. `check:cycles:ratchet` (kas veikia CI ) blokuoja, kai skaičius viršija `metrics.cycles` lubas `quality-baseline.json` — šiuo metu yra 14, `direction: down`, todėl jis gali tik kristi (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Taip (reketas)                              |
| `check:boundary`                  | `open-sse → src` susiejimas: unikalus failas į failą importuojamas iš variklio į programą (`scripts/quality/measure-boundary.mjs`; kraštų sąrašas yra v4 core/module-split taisymo atsilikimas). Bare = patariamoji ataskaita (tas pats kaip `quality:boundary`). `check:boundary:ratchet` (kas veikia CI, taip pat `quality.yml` greitųjų vartų reketo kilpoje) blokuoja, kai skaičius viršija `metrics.boundaryOpenSseToSrc` lubas `quality-baseline.json` — pasėtoje išmatuotame 771, `direction: down`; `--update` jį tik sumažina; bazinis santykinis PRs (`--base-ref`, žr. toliau)                                                                                                                                                                                                                                                                                                                                                                                      | Taip (reketas)                              |
| `check:route-validation:t06`      | Zod schemos pateikiamos visuose maršrutuose (6 pakopos politika)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Taip                                        |
| `check:any-budget:t11`            | `@ts-expect-error // any` skaičius neviršija biudžeto (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Taip                                        |
| `check:provider-consistency`      | Kiekvienas `providers.ts` teikėjas turi atitinkamą įrašą `providerRegistry.ts` (ir atvirkščiai, leidžiamųjų sąraše)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Taip                                        |
| `check:model-lifecycle`           | Trys rankomis prižiūrimos maršruto lentelės išlieka suderintos su užregistruoto gyvavimo ciklo momentine nuotrauka (#11503): `FITNESS_TABLE` (`taskFitness.ts`) neįvertina pašalinto ID, kurį `REGISTRY` galėtų nukreipti; kiekvienas `BUILT_IN_ALIASES` taikinys yra `REGISTRY` ir jo nėra išjungto ID momentiniame vaizde; kiekvienas išvestas ID, vis dar esantis `REGISTRY`, yra persiunčiamas arba įtraukiamas į `allowedRetiredInCatalog`; ir toje momentinėje nuotraukoje neatrodo, kad `DEFAULT_DEGRADATION_MAP` šaltinis ar taikinys būtų pašalintas. Tai neįrodo, kad modelį šiuo metu aptarnauja tiesioginis srautas. Neprisijungęs — lyginamas su `config/quality/model-lifecycle.json`, atnaujintas ranka naudojant `npm run quality:refresh-model-lifecycle` (tinklas; neprijungtas prie CI). `allowedRetiredInCatalog` yra sudegęs reketas: pridėkite įrašą tik su stebėjimo problema.                                                                          | Taip                                        |
| `check:fetch-targets`             | Kiekvienas `fetch("/api/...")` kliento pusės `src/` yra tikras `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Taip                                        |
| `check:deps`                      | Visi `npm install` -able deps kiekviename `package.json` atpirkimo sandoryje yra `dependency-allowlist.json`; pažymėtos naujos atsegtos arba sulenktos pakuotės                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Taip                                        |
| `audit:deps`                      | npm visų penkių nepriklausomų užrakinimo failų (root, Electron, OpenCode papildinių v1/v2 ir teikėjo) auditas. Kritinių patarimų blokas; aukšti patarimai išlieka matomais įspėjimais. Missing/failed auditai yra INCOMPLETE ir blokuoti; Išsaugomos užrakto maišos ir ataskaitos pagal taikymo sritį.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Taip                                        |
| `check:lockfile`                  | `package-lock.json` integrity — https registras, vientisumo maišos, nėra pagrindinio kompiuterio nepaisymo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Taip                                        |
| `check:licenses`                  | SPDX licencijų leidimų sąrašas gamybos priklausomybėms                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Taip                                        |
| `check:tracked-artifacts`         | Nėra kūrimo artefaktų / priskirtų `node_modules` simbolių nuorodų (taip pat veikia naudojant „Husky“ išankstinį patvirtinimą; išankstinis stūmimas yra sąmoningai lengvas — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Taip                                        |
| `check:ai-attribution`            | Nėra AI/bot `Co-Authored-By` anonso ar dirbtinio intelekto kartos poraštės PR įsipareigojimuose, pavadinimo ar teksto — griežta taisyklė #16 ( `quality.yml` greitųjų vartų kilpoje PR→ `release/**` — nuskaito įvykio naudingąją apkrovą, no-op off PRs — ir PR-`main` `ci.yml` pat husky → `commit-msg` #14436;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:vitest-exclusions`         | Kiekvienas Vitest išskyrimas nurodo stebėjimo problemą ir rodomas `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Taip                                        |
| `check:file-size`                 | Šaltinio failai (`.ts`/`.tsx` `src/`, `open-sse/`, `electron/`, `bin/`) lieka `cap`, o bandomieji failai (`*.test.ts(x)`) - `testCap`; `file-size-baseline.json` (`frozen` / `testFrozen`) užšaldyti failai neturi viršyti įrašyto dydžio                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Taip                                        |
| `check:error-helper`              | Atsakymai į klaidas executors/handlers naudoja `buildErrorBody()` / `sanitizeErrorMessage()` (kieta taisyklė #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Taip                                        |
| `check:migration-numbering`       | Perkėlimo SQL failai yra sunumeruoti iš eilės, nėra spragų ar dublikatų                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Taip                                        |
| `check:public-creds`              | Jokių pažodinių OAuth `client_id`/`client_secret` arba „Firebase“ žiniatinklio raktų už `publicCreds.ts` ribų (kieta taisyklė #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Taip                                        |
| `check:db-rules`                  | Nėra neapdorotų SQL išorinių `src/lib/db/` modulių; be statinės importo iš `localDb.ts` (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Taip                                        |
| `check:known-symbols`             | Teikėjų vykdytojai, maršruto strategijos ir vertėjai, registruoti jų išsiuntimo lentelėse, atitinka failus diske — be našlaičių ar nedeklaruotų simbolių                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Taip                                        |
| `check:route-guard-membership`    | Kiekvienas maršrutas, sukuriantis antrinį procesą, klasifikuojamas pagal `isLocalOnlyPath()` (kietosios taisyklės #15/#17).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Taip                                        |
| `check:test-discovery`            | Kiekvieną `*.test.ts` / `*.spec.ts` failą atpirkimo sandoryje renka bent vienas bandomasis vykdytojas (reketas: našlaičių sąrašas `test-discovery-baseline.json` gali tik susitraukti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Taip                                        |
| `check:test-tla-order`            | Joks `node:test` failas, esantis `tests/unit`, neužregistruoja testo, pasiekia aukščiausio lygio `await`, tada registruoja daugiau (#18045; reketas: `test-tla-order-allowlist.json` gali tik susitraukti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Taip                                        |
| `check:agent-skills-sync`         | Sugeneruoti agento įgūdžių artefaktai atitinka jų šaltinio katalogą (nėra dreifo)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:provider-asset-provenance` | Teikėjas logos/assets turi įrašytą kilmės įrašą                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `lint:json`                       | JSON konfigūracijos failai išanalizuoja ir atitinka repo lint taisykles                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `typecheck:core`                  | TypeScript kompiliacija be klaidų (tik patariamieji įspėjimai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Taip                                        |
| `typecheck:noimplicit:core`       | Griežtas `noImplicitAny` — žvelgiantis į ateitį; daugeliui jau esamų skambučių svetainių vis dar reikia komentarų                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **Patariamoji** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` taikoma `src/app/(dashboard)/**` (#7033) — `typecheck:core` kuruojamame 27 failų leidimų sąraše nėra jokios informacijos suvestinės TSX, o `next build` taip pat niekada jo netikrina (`next.config.mjs` nustato `ignoreBuildErrors: true`), todėl našlaičių identifikatorių regresijos ten buvo (#6625) /#6909CI. Skirtumas nuo fiksuoto per-file/per-TS-code skaičiaus bazinės linijos (`config/quality/dashboard-typecheck-baseline.json`, toks pats pasenusio vykdymo modelis kaip `check:known-symbols`) — tik NEW klaidos, viršijančios bazinį skaičių, neatitinka vartų; suaktyvinkite `--update` kai ištaisysite esamą klaidą.                                                                                                                                                                                                                                                                                                                                   | Taip                                        |
| `check:build-typecheck`           | Visos programos gamybos tipo patikra per `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), paviršiaus `typecheck:core` 27 failų leidžiamųjų sąrašo ir prietaisų skydelio vartų neapima. Skiriasi prieš `config/quality/build-typecheck-baseline.json`; naujas arba padidintas per (failas, kodas) skaičius nepavyksta, mažesnis skaičius prašo reketuoti. `--update` atsisako, kol paleidime yra nauja arba padidinta pora, nebent `--force-regressions` būtų išlaikytas, ir atsisako naujai nutildyto failo, nebent `--force-nocheck` būtų išlaikytas, todėl bazinės linijos išplėtimas, kad būtų žalia, ir nuolatinės tylos suteikimas yra du atskiri sąmoningi veiksmai. Atmetamas plikas `--force`. Taip pat nuskaito `@ts-nocheck` kūrimo sritį, palyginti su `config/quality/ts-nocheck-baseline.json`, nes failas, kuriame jis naudojamas, visai nepraneša apie diagnostiką ir kitu atveju būtų nematomas visiems vartams. | Taip                                        |

#### Dvi tipo tikrinimo programos atsako skirtingai

`typecheck:core` ir `check:build-typecheck` kompiliuoja skirtingas programas pagal skirtingas parinktis, o tas pats failas gali būti švarus viename ir pilnas klaidų kitame.

`tsconfig.build.json` nustato `"strict": false`, todėl `noImplicitAny` išjungtas. Pagrindinė konfigūracija sudaro kuruojamą 27 failų leistinų sąrašą su griežtesnėmis parinktimis ir seka kiekvieno įrašo importavimo grafiką, todėl failai, kurie niekada nerodomi kūrimo programoje, vis tiek yra ten tikrinami.

Sprendžiant, ar failas įvestas, svarbios pasekmės:** nulinė diagnostika pagal `check:build-typecheck` nereiškia nulio** . Pašalinus `@ts-nocheck` iš 26 failų, 23 iš jų buvo švarūs kūrimo programoje; šešiolika iš jų pateikė apie 120 numanomų klaidų – bet kokių griežtų klaidų. Patikrinkite abu prieš iškviesdami failą švarų.

### Darbas: `quality-gate`

Bėga paskui `test-coverage`. Blokai susijungia sugedus.

| Scenarijus                   | Patvirtina                                                                                                                                                                                   | Blokavimas          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `quality:collect`            | Skleidžia `quality-metrics.json` (ESLint įspėjimų skaičius, aprėptis iš sujungtos skeveldros ataskaitos)                                                                                     | Taip (prieš reketą) |
| `quality:ratchet`            | Kiekviena `quality-baseline.json` metrika nebuvo regresuota (ESLint įspėjimai ≤ bazinė linija; aprėptis ≥ bazinė linija)                                                                     | Taip                |
| `check:duplication`          | Kodo dubliavimas (jscpd@4) neviršija pradinės linijos `quality-baseline.json`                                                                                                                | Taip                |
| `check:complexity`           | Failo lygio ciklomatinis sudėtingumas neviršija ribos (pagrindinis ESLint `complexity` + `max-lines-per-function`)                                                                           | Taip                |
| `check:cognitive-complexity` | Kognityvinio sudėtingumo reketas (`eslint-plugin-sonarjs`) — atskiras ESLint leidimas; CI veikia abu sujungti kaip vienas `check:complexity-ratchets` veiksmas                               | Taip                |
| `check:dead-code`            | Nepanaudotų eksporto / failų reketas (knip) nesikeičia, palyginti su pradine linija                                                                                                          | Taip                |
| `check:compression-budget`   | Suspaudimo etalono biudžeto — vienam varikliui skirto žetono taupymo ribos neturi regresuoti                                                                                                 | Taip                |
| `check:type-coverage`        | Procentinio tipo reketas (`type-coverage`) neregresuoja; daugiausia apima `typecheck:noimplicit:core`                                                                                        | Taip                |
| `check:codeql-ratchet`       | Atvirų CodeQL įspėjimų skaičius negrįžta (skaitomas per `gh api`; grakštus praleidimas be prieigos rakto) — atnaujinimo dažnis ir rankinis paleidiklis: žr. toliau pateiktą „CodeQL ratchet“ | Taip                |

### Darbas: `quality-extended`

Visas darbas yra patariamasis (`continue-on-error: true`). npm pagrįsti reketai veikia iš tikrųjų; išoriniai skaitytuvai įdiegiami per `gh release download` ir savaime praleidžiami (išėjimas 0), kai dvejetainio failo vis dar nėra.

| Scenarijus               | Patvirtina                                                                                                                                                                                                                              | Blokavimas                                        |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `check:circular-deps`    | Nėra žiedinių priklausomybių (dpdm)                                                                                                                                                                                                     | **Patariamoji**                                   |
| `check:bundle-size`      | Ryšulio dydis neviršija dangtelio                                                                                                                                                                                                       | **Patariamoji**                                   |
| `check:secrets`          | Slaptas nuskaitymas (gitleaks) — praleidžiamas, jei nėra dvejetainio                                                                                                                                                                    | **Patariamoji**                                   |
| `check:vuln-ratchet`     | Priklausomybės pažeidžiamumas (osv skaitytuvas) negrįžta — `--ratchet` nepavyksta kaip INCOMPLETE (išėjimas 2), jei neišmatuotas                                                                                                        | **Patariamoji**                                   |
| `check:workflows`        | Darbo eigos lint (actionlint + zizmor); missing/broken skaitytuvai, netinkamos ataskaitos arba trūkstamos reketo pagrindinės linijos sugenda kaip INCOMPLETE. Galiojančios išvados atitinka pasirinktą strict/advisory/ratchet politiką | Reikalingas vykdymas; zizmor reketo blokavimas CI |
| `check:openapi-breaking` | Vieša API sutartis dėl prisegtų įvykių įsipareigojimų (PR merge-base, push before, merge-group base; scheduled/manual checkout pirmasis pirminis šaltinis); reikalingo matavimo nepavyko uždaryti                                       | **Blokavimas su --ratchet**                       |

### Darbas: `docs-sync-strict`

Veikia kiekviename nuo PR iki `main`. Blokai susijungia sugedus.

| Scenarijus                     | Patvirtina                                                                                                                                                             | Blokavimas                  |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `check:docs-all`               | Meta vartai, kurie paeiliui paleidžia 6 žemiau esančius vartus                                                                                                         | Taip                        |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt versijos nuoseklumas                                                                                                                     | Taip                        |
| ↳ `check:docs-counts`          | Skaičiai prozoje (tiekėjų skaičius, migracijos skaičius ir tt) yra realių skaičių lango viduje                                                                         | Taip                        |
| ↳ `check:env-doc-sync`         | Kiekvienas env var `.env.example` yra dokumentuojamas dokumentų lentelėje ir atvirkščiai                                                                               | Taip                        |
| ↳ `check:deprecated-versions`  | Dokumentuose nėra pasenusių versijų eilučių                                                                                                                            | Taip                        |
| ↳ `check:doc-links`            | Vidinės žymėjimo nuorodos dokumentuose nukreipia į tikrus failus (forma `[text]`/`(path)` )                                                                            | Taip                        |
| ↳ `check:fabricated-docs`      | Maršrutai, env vars, CLI komandos, kabliukų pavadinimai ir failų keliai, nurodyti dokumentuose, yra kodų bazėje. Kieti vartai per `--strict`; soft-fail be vėliavėlės. | Taip (per `--strict` in CI) |
| `check:cli-i18n`               | CLI komandų eilutės yra visuose i18n lokalės failuose                                                                                                                  | Taip                        |
| `check:openapi-coverage`       | OpenAPI specifikacija apima bent jau reketas tikrų maršrutų                                                                                                            | Taip                        |
| `check:openapi-security-tiers` | Saugos pakopos anotacijos `openapi.yaml` atitinka `routeGuard.ts` klasifikacijas                                                                                       | **Patariamoji**             |
| `check:openapi-routes`         | Kiekvienas `openapi.yaml` kelias baigiasi tikru `route.ts` (antihaliucinacija)                                                                                         | Taip                        |
| `check:docs-symbols`           | Kiekviena `/api/...` nuoroda `docs/**/*.md` virsta tikru `route.ts` (antihaliucinacija)                                                                                | Taip                        |
| `i18n translation drift`       | Neišversti raktai i18n lokalės failuose — įspėja tik                                                                                                                   | **Patariamoji**             |

Sugeneruojami dvylika README SVGs pagal `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` juos visus regeneruoja). Kiekviename iš jų yra baitų palyginimo vieneto testas (`tests/unit/docs/readme-*-svg.test.ts`, užduotis `test-unit`), kuris nepavyksta, kai priskirtas failas yra pasenęs, o `check:docs-counts` nuskaito kanoninius skaičius iš jų `<text>` mazgų — todėl kontūravimo veiksme kiekviena apibūdinta failo eilutė išlieka nematoma `<text>`. SVG kanoninių skaičių patikra nuskaito failus, išvardytus `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plius `public/images/tier-flow-dark.svg` ir `tier-flow-light.svg`; paraiškose „Free-Forever“, „Recurring-pool“ ir „Scoring-factors“ taip pat yra `promise-pillars.svg`, `free-tier-budget.svg` ir `strategies-grid.svg`. `free-tier-budget.svg` pateikia skaičius iš tiesioginio katalogo įkėlimo programos, todėl pakeitus į `FREE_MODEL_BUDGETS` arba į teikėjo rodomą pavadinimą raudona CI kol failas bus iš naujo sugeneruotas.

### Darbas: `i18n-ui-coverage`

| Scenarijus                        | Patvirtina                                                                                                                                                                                                | Blokavimas      |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (įdėtas) | UI i18n rakto aprėptis yra ≥ 65 %                                                                                                                                                                         | Taip            |
| `check-ui-value-drift` (įdėtas)   | Perrašyta anglų kalba** vertė** nepalieka pasenusio vertimo                                                                                                                                               | Taip            |
| `check-new-key-coverage` (įdėtas) | A** naujas** Anglų kalbos klavišas verčiamas kiekvienoje lokalėje — `__MISSING__:` žymeklis atmetamas                                                                                                     | Taip            |
| `check-translation-ratio`         | Tikrasis vertimo koeficientas pagal lokalę (identiškas anglų kalbai / rezervuota vieta / trūkstami lapai už leidžiamų sąrašo ribų) neturi viršyti `config/quality/i18n-translation-baseline.json` + slack | **Patariamoji** |

Reikia `fetch-depth: 0` — vertės dreifo vartai skiriasi `en.json` nuo sujungimo pagrindo.

#### `check-ui-value-drift` — pasenę vertimo vartai

Sulaiko vieną i18n regresiją, kurios kiti vartai struktūriškai nemato: angliška reikšmė perrašoma, o vertimai, gauti iš _ankstesnės_ anglų kalbos, pasilieka, todėl ne anglų kalbos vartotojai toliau skaito užtikrintai suformuluotą, dabar neteisingą kopiją.

Tai buvo išsiųsta tikrai. `oauthModal.googleOAuthWarning` buvo perrašytas, kai nusileido Antigravity prisijungimo pagalbininkas (#5203);** 39 iš 43 vietovių** išliko tekstas, liepiantis operatoriams „nukopijuoti visą URL ir įklijuoti jį žemiau“ — srautas, kurio tam teikėjui nepavyks užbaigti. Tai buvo nepastebėta iki #8463 nes:

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

| Darbo eiga             | Patvirtina                                                                                                                                                         | Blokavimas      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `nightly-property`     | greito patikrinimo savybių bandymai su atsitiktiniu sėklų + dideliu paleidimo skaičiumi                                                                            | **Patariamoji** |
| `nightly-resilience`   | krūvos augimo vartai, chaoso gedimo įpurškimas, k6 load/soak                                                                                                       | **Patariamoji** |
| `nightly-llm-security` | „promptfoo“ įpurškimo apsauga (blokavimo režimas) + garak“ zondai (praleidžiama be teikėjo paslapties)                                                             | **Patariamoji** |
| `nightly-schemathesis` | OpenAPI kontrakto miglotumas (schematezė) prieš aktyvų OmniRoute naudojant `docs/openapi.yaml` — paviršių specifikacijų pažeidimus / neapdoroti 500 s (8 fazė B.4) | **Patariamoji** |
| `nightly-mutation`     | Strykerio mutacijų testavimo rezultatas per greitą vieneto juostą — išgyvenusių mutantų paviršius silpnas                                                          | **Patariamoji** |
| `nightly-compat`       | Mazgo variklio suderinamumo matrica palaikomuose `engines.node` diapazonuose                                                                                       | **Patariamoji** |

Našumo pradinės linijos (krūva, TTFB, kūrimo laikas) įrašomos, o ne ribotos: žr. [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Greičio fazė (2026-08-30 → v4.0 LTS): kiekviena bazinė linija sumažinta 20 %

Savininko sprendimas (2026-08-30): iki v4.0 moduliavimo siuntimo greitis yra svarbesnis nei skolos eilutės laikymas. kas** skaitinis** reketo bazinė linija buvo atlaisvinta 20 % per vieną tikrinamąjį praėjimą, o fazė deklaruojama `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Kas pasikeitė                                                                                                                                                                                                          | Kur                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — mažesnis yra geresnis skaičiuoja × 1,2, didesnis yra geresnis procentas ÷ 1,2 (aprėpties žemumas išlaikomas 60, `eslintErrors` išlieka 0, `eslintWarnings` 0 → 20 % užšaldyto slopinimo skaičiaus) | `quality-baseline.json` (`_relax_velocity_2026_08_30` užrašų sąrašai kas prieš → po)                   |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                       | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, kiekviena `frozen[*]` / `testFrozen[*]` linijos viršutinė riba × 1.2                                                                                                                                 | `file-size-baseline.json`                                                                              |
| skaičiai pagal failą / TS kodą × 1.2                                                                                                                                                                                   | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                    | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` tampa patariamuoju, o `_policy.requireTighten === false`                                                                                                                                           | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| naktinės `bank-ratchet-shrinks` pauzės (tai sumažintų išmatuotą susitraukimą ir panaikintų erdvę)                                                                                                                      | `.github/workflows/nightly-release-green.yml`                                                          |

Leidžiamų sąrašai (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`, …) yra** ne** biudžetų ir nebuvo paliesti. Pass/fail politikos vartai (paslaptys, SQL taisyklės, docs/env sutartis, i18n paritetas, vienetų testai) nesikeičia — raudonas testas vis dar yra raudonas testas.

**Įrankiai**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — vienkartinis atsipalaidavimas (`scripts/quality/relax-baselines.mjs`); atsisako bėgti du kartus su ta pačia nata.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` — matuoja kiekvienus skaitmeninius vartus taip, kaip tai daro CI, ir atspausdina likusią laisvą erdvę kiekvienam vartui (`scripts/quality/baseline-headroom.mjs`). Naktinis `baseline-headroom` darbas paskelbia lentelę darbo eigos vykdymo suvestinėje ir įkelia JSON/Markdown ataskaitą kaip `baseline-headroom-<run_id>`, saugomą 90 dienų. Įspėjimo ir kritinės eilutės nurodo vartus, esančius 10 % atstumu nuo jų viršutinės ribos arba jau virš jo. Peržiūrėkite šias ataskaitas kaip išankstinį įspėjimą apie išnaudojamus biudžetus; apžiūrėkite pažeidusio vartų `_rebaseline_*` užrašus. Darbas nebekuria ar neatnaujina nuolatinės problemos; #12149 išsaugo ankstesnę ataskaitų istoriją.

**Naujo kodo režimas (Clean-as-You-Code) — nuo 2026-08-30, tik PR greitasis kelias**

`pull_request` įvykiuose `quality.yml` pereina `--base-ref <PR base SHA>` į `check:file-size`, `check:complexity-ratchets` ir `check:dead-code`. `check:complexity-ratchets` ir `check:dead-code` vartai lygina HEAD su sujungimo baze** apribota failais, kuriuos palietė PR** (`scripts/check/newCodeMode.mjs`: sujungimo bazė materializuojasi išmetamame `git worktree`, ESLint/knip paleidžiama ten ir HEAD, failų skaičiai skiriasi):

- **blokavimas** — PR pridėjo cyclomatic/cognitive pažeidimus arba neveikiančius eksportus failuose, kuriuos jis pakeitė (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` žurnale);
- **patariamoji** — pasaulinė bendra suma, palyginti su fiksuota bazine linija. Paveldimas dreifas niekada neraudo nekalto PR; dreifas vėl užšaldomas išleidimo suderinimo metu ir stebimas atliekant aukšto lygio darbą.

`check:file-size` naudoja bazinę nuorodą pagal savo sąlygas (`scripts/check/check-file-size.mjs`, #8522): ji patikrina kiekvieną šaltinį ir bandomąjį failą medyje, nuskaito kiekvieno eilučių skaičių PR bazėje su `git show` ir nepavyksta failo tik tada, kai jis išauga virš didesnio iš bazinės linijos lubų (`frozen` / `testFrozen`, arba už bazinės linijos `cap` / `testCap` ribų) Todėl failas, kuris jau buvo nuklydęs ant pagrindo, niekada nerodo nekalto PR.

`check:boundary:ratchet` taiko tą pačią taisyklę savo vienam skaičiui (`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR įvykiuose tiek `quality.yml` greitieji vartai, tiek `ci.yml` lint užduotis praeina PR bazę SHA, pagrindinis įsipareigojimas matuojamas iš `git archive` eksporto, o PR nepavyksta tik tada, kai jo `open-sse → src` briaunų skaičius viršija pagrindo `metrics.boundaryOpenSseToSrc` skaičių ir didesnį skaičių. Pranešama apie pagrindo poslinkį virš lubų (`base drift herdado`) , tačiau jis niekada nerodo nekalto PR; push → main išlaiko absoliučias lubas, o neišsprendžiama bazė SHA grįžta į jas su įspėjimu.

`workflow_dispatch` veikia, išleidžiamas žalias šlavimas ir naktinis darbas neturi PR bazės ir išlaiko absoliutų (pasaulinį) palyginimą. Aprėptis, dubliavimas ir tipo aprėptis kol kas išlieka visuotinė (jų įrankiai negamina pigių skirtumų kiekviename faile) — kandidatai į tą patį gydymą.

**Fazės uždarymas naudojant v4.0 (LTS = griežtesnis nei anksčiau, o ne „grįžta į normalią“)**

1. Kalbant apie gryną `release/v4.0.0` patarimą: `npm run quality:headroom --json` įrašui, tada `npm run quality:ratchet -- --update`, `check:file-size --update`, `check:complexity-ratchets --update`, `check:dead-code --update`, kiekvieno tipo patikros vartų `--update` — kiekviena bazinė linija nukrenta iki išmatuotos vertės.
2. Ištrinkite `_policy` iš `quality-baseline.json` (iš naujo ginkluokite `--require-tighten` ir naktinį bankininkystę), atkurkite `THRESHOLD = 36` (arba aukštesnę) `check-openapi-coverage.mjs`.
3. Priveržkite daugiau nei išmatuota, kur moduliavimas pasiteisino: failo dydis `cap` sugrąžintas iki 1000 (arba 800), aprėpties aukštis + 5, negyvas eksportas 0 moduliniams paketams.

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

## Leidžiamų sąrašo politika

Visi vartai, kurie negali sugesti dėl jau esamų pažeidimų, naudoja fiksuotą leistinų sąrašą (pvz., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Politika yra tokia:

**Pašalinkite pagrindinę priežastį; naudoti leidžiamųjų sąrašą tik tada, kai pažeidimas jau yra ir jo negalima ištaisyti tame pačiame PR.**

Pridedant įrašą į leidimų sąrašą:

1. Įtraukite komentarą su pagrindimu.
2. Nurodykite stebėjimo problemą (pvz., `// #3498 — Phase 2 feature, not yet implemented`).
3. Pašalinkite įrašą tame pačiame PR, kuris ištaiso pažeidimą — Pasenęs įrašas, kuris nebeslopina aktyvaus pažeidimo, pats savaime yra defektas (6A.3 pasenęs vykdymas neleis našlaičio leidimų sąrašo įrašo, kai jis bus įdiegtas).

Daryk** ne** pridėkite leidimų sąrašo įrašus, kad testai praeitų greičiau. Žalieji vartai su augančiu leistinų sąrašu yra klaidingas kokybės jausmas.

### Kai sugenda jūsų PR vartai

1. **Atidžiai perskaitykite vartų išvestį** — tiksliai nurodo, kuris failas ar simbolis pažeidė taisyklę.
2. **Ištaisyti pažeidimą** — dauguma vartų yra deterministiniai failų sistemos patikrinimai, kurie praeina, kai tik kodas yra teisingas.
3. **Jei pažeidimas yra iš anksto** (ty jūs jo neįvedėte, bet dabar uždengia vartai): pridėkite leistinų sąrašo įrašą su pagrindimo komentaru ir sekimo problema.
4. **Jei vartai yra reketas** (aprėptis, ESLint įspėjimai, dubliavimas, sudėtingumas): jūsų pakeitimas pablogino metriką. Išspręskite pagrindinę problemą arba (retai) paleiskite `npm run quality:ratchet -- --update` jei pakeitimas yra tyčinis ir metrikos pablogėjimas yra priimtinas — bet dokumentuokite kodėl PR apraše.
5. **Patariamieji vartai** (`continue-on-error: true`) yra informaciniai — jie neblokuoja sujungimo, bet rodomi CI suvestinėje. Vis tiek pataisykite juos.

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

## Racionalizavimo atsilikimas (ROI review — Fase 9 Onda 3)

Šis inventorius buvo suderintas su `ci.yml` 2026-06-17 (ankstesnėje versijoje buvo praleisti `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence`). Suderinto rinkinio ROI peržiūra nustatė šiuos racionalizavimo kandidatus.** Sujungimai yra mechaniniai CI pakeitimai; flips/drops yra politiniai sprendimai, skirti operatoriui.** Niekas toliau nėra taikomas.

**Taip pat nedokumentuota aukščiau** (patariamasis, žemas signalas): `docs-lint` užduotis (markdownlint + Vale, visa užduotis `continue-on-error`) ir atskiro skaitytuvo darbo eigos `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` yra `quality-baseline.json`, bet nėra prijungtas prie blokuojančio reketo `ci.yml` — metrika šiuo metu yra našta.

### Sujungti / dedup (mechaninis, mažesnė rizika)

Kiekvienas kandidatas 2026-06-17 buvo patvirtintas pagal tiesioginių vartų būseną (pasitikėkite, bet patikrinkite); Keli „akivaizdūs“ susijungimai slepia skolą ir yra** ne** švarūs lašintuvai.

- **`check:docs-sync` bėga du kartus** — autonominis `lint` užduotyje ir vėl viduje `check:docs-all` (`docs-sync-strict`) ir husky išankstinio įsipareigojimo kabliukas. ✅**DONE** — atskira `lint` invokacija pašalinta.
- **CVE nuskaitymas** — ❌**NOT švarus sujungimas.** `audit:deps` blokuoja svarbius patarimus ir neišsamius auditus visuose penkiuose užrakinimo failuose, o praneša apie aukštus patarimus kaip įspėjimus pagal dabartinę politiką; `check:vuln-ratchet` (osv) nepavyksta tik esant _regresijai_, palyginti su užregistruota bazine linija, ir, kai reikia, atmeta trūkstamus matavimus. Skirtingos semantikos — atmetus `audit:deps` prarastų absoliučią kritinę vartą ir nepriklausomus paketo audito kvitus. Laikykite abu.
- **Ciklo aptikimas** — ✅**DONE** (#15159 G-01/G-02). Senasis tekstas čia vadinamas `check:cycles` „žaliaisiais, kuruojamais“ vartais ir pateisino jų blokavimą, nes `check:circular-deps` (dpdm) pranešė apie 91 ciklą. Ta žalia buvo a** netikra žalia** : `check:cycles` nuskaito 5 pakatalogius (450 failų), atitiko tik statinį `import|export … from` ir atmetė kiekvieną `@/` ir `@omniroute/open-sse/` specifikaciją, todėl negalėjo matyti dinaminio importavimo + slapyvardžių ciklų, kurie dominavo atpirkimo sandoryje. Pataisyta: dabar vartai eina `src` + `open-sse` (5023 failai), renka specifikacijas iš TypeScript AST (taigi `import("…")` skaičiuoja, o tipo padėtis `typeof import("…")` ne) ir išsprendžia tsconfig `paths`. Tai randa** 14** ciklų, o ne 0. Kadangi 14 iš anksto esamų ciklų negali būti užfiksuoti užtvaroje PR, `check:cycles` dabar yra** reketas** (`--ratchet`, lubos `metrics.cycles.value = 14` in `quality-baseline.json`, `direction: down`) — tai blokuoja bet kokią _regresiją_ ir skaičius gali tik kristi. CI paleidžia `npm run check:cycles:ratchet`. Nudegimai važiuoja su**A-01** . `check:circular-deps` (dpdm) išlieka patariamoji kaip platesnė antroji nuomonė.
- **Sudėtingumas** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): vienas ESLint ėjimas, skaičiuojama pagal ruleId, todėl ciklomatinės + max linijos ir kognityvinės bazinės linijos išlieka nepriklausomos; individualus `check:complexity` / `check:cognitive-complexity` lieka vietiniam `--update`.
- **`/api` antihaliucinacijos** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): vienas FS inventorius `src/app/api`, openapi-routes + docs-ymbols vis tiek praneša nepriklausomai; asmenų lieka vietiniams bėgimams.
- **`check:node-runtime` dirba 11 darbo vietų** — ⚠️** mažas ROI.** Kiekvienas yra atskiras bėgikas, o čekis yra < 1s; iš viso sutaupysite ~ 10s, kad neprarastumėte pigaus darbo apsaugos. Neverta suktis.
- **`typecheck:noimplicit:core` ant CI pūkelių** — ✅** pašalintas iš pūkavimo darbo** (buvo patariamasis `continue-on-error`); blokavimo tipo paviršius yra `typecheck:core` + `check:type-coverage`. Vietinis scenarijus išsaugotas.

### Apversti / nuspręsti (operatoriaus politika)

- `check:openapi-security-tiers` (patariamasis) — ❌**NOT švariai apverčiamas.** Jis išeina iš 0, bet įspėja, kad keliuose `traffic-inspector` maršrutuose po `LOCAL_ONLY_API_PREFIXES` trūksta `x-loopback-only: true` anotacijos. Norint jį įgyvendinti, pirmiausia reikia pridėti tuos komentarus prie `openapi.yaml`.
- `typecheck:noimplicit:core` (patariamasis) — daugiausia apima blokuojantis `check:type-coverage` reketas. Apverskite reketą arba numeskite perteklinį antrąjį `tsc` praėjimą.
- `test:vitest:ui` (dabar** blokavimas** ) — jau egzistuojantys gedimai yra aiškiai neįtraukti į `vitest.config.ts` su `// #8618` sekimo komentarais; naujos nesėkmės sužlugdo darbą.
- `check:secrets` (žitelių nutekėjimas, blokuojantis reketas, užšaldytas esant 3 dokumentuotiems klaidingiems teigiamiems rezultatams) — leistinas sąrašas 3 pasiekia 0 arba pažeminkite į patariamąjį. Sutampa su GitHub savuoju slaptu nuskaitymu + `check:public-creds`.
- `check:pr-evidence` (blokavimas, greps PR-kūno proza) — didelė klaidingai teigiama rizika; susilpnina „Hard Rule #18 vykdymą, jei jis atšaukiamas, todėl tai yra tikras politikos raginimas.
- `semgrep` (patariamasis savarankiškas) — sutampa su CodeQL OWASP šeimoms; prijunkite bazinę liniją prie reketo arba lašelio.

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
