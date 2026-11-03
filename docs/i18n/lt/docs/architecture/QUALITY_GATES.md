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

## Vartų inventorius ir vykdymo profiliai

### Kandidato priėmimas

CI ir Quality Gates darbo eigos kiekviena pateikia stabilų verdiktą: `Gate / CI` ir
`Gate / Quality`. Jų versijuotoje priėmimo politikoje kiekviena ankstesnė užduotis
išvardijama kaip privaloma arba patariamoji. Taikoma privaloma užduotis turi būti
sėkminga: trūkstami, atšaukti, praleisti, laukiantys ir nežinomi rezultatai negali
nustatyti PASS. Galiojanti tik dokumentacijos arba tik katalogo klasifikacija gali
padaryti kodo juostą netaikomą; juodraštinis PR nėra priimtinas kandidatas. `hotfix`
etiketė neatleidžia nuo įrodymų.

Abi darbo eigos apima PR į main/release šakas, išsiuntimus į `main`, rankinį paleidimą
ir merge-group įvykius. Push, dispatch ir merge-group vykdo visą atranką. Push į
`release/**` jų nepaleidžia (2026-10-18): kiekvienas pakeitimas jau paleido matricą savo PR,
o sujungta kombinacija yra Release-Green užduotis (`docs/ops/RUNNER_BOX.md` → Hosted lane).
Fork ir merge group naudoja hostinamus vykdiklius užduotims, kurios kitu atveju pasirinktų
savarankiškai talpinamus vykdiklius; prieš diegimą turi būti patikrinta, kad hostinamų
vykdiklių pajėgumo pakanka.

Kiekvienas JSON kvitas nurodo patikrintą SHA, darbo eigos paleidimą ir bandymą.
CLI atmeta checkout/event SHA neatitikimą. Darbo eigos testai susieja politikos narystę
su verdikto užduoties `needs` sąrašu, kad nauja arba pašalinta juosta negalėtų tyliai
dingti. Kvituose aprašoma jų pačių darbo eiga, o ne publikavimas, diegimas ar esamo
patariamojo skaitytuvo vidiniai procesai. Abiejų tikrinimo pavadinimų aktyvavimas šakų
taisyklėse yra atskiras administracinis pakeitimas; šių užduočių pridėjimas savaime
šakos neapsaugo.

### Statinio skenavimo inventorius

Versijuotas npm-alias inventorius ir statinio skenavimo narystė yra faile
`config/quality/gate-manifest.json`. Paleiskite `npm run check:gate-manifest`, kad
patikrintumėte scenarijų pavadinimus ir tikslias komandas pagal `package.json`;
pridėjimai, pašalinimai ir komandų neatitikimai sustabdo tiek vietinį kablį, tiek
pakeitimų klasifikavimo užduotis CI.

Naudokite `npm run quality:scan -- --list` arba `npm run quality:scan:fast -- --list`,
kad patikrintumėte pasirinktas alias jų nevykdydami. Vykdyklė iškviečia npm įvesties
tašką, todėl išlaikoma jos vykdymo aplinka (įskaitant sukonfigūruotą Bun).
Manifeste alias, nepatenkančios į šiuos profilius, nurodomos kaip iškviečiamos
atskirai, o priežiūros komandos tik skaitymui skirtuose skenavimo profiliuose
draudžiamos.

Šie profiliai apima tik statinį skenavimą. Jie nepatvirtina produkto testų,
aprėpties, pakavimo, išorinių patikrų ar visiško kandidato išleidimo priėmimo.
Darbo eigos priėmimas naudoja susietus `config/quality/admission-policy.json` ir
`scripts/quality/admission-verdict.mjs`. Release-observer profiliai lieka atskiri;
jų taikomas patikras ir kvitus tikrinkite nepriklausomai. Toliau pateiktas prozos
inventorius yra nuoroda, o ne įrodymas, kad vartai iš tikrųjų buvo paleisti.

Scenarijai yra kataloguose `scripts/check/` (politikos vartai) ir
`scripts/quality/` (ratchet variklis). CI pagrindinis tiesos šaltinis yra
`.github/workflows/ci.yml`.

### Išleidimo PR greitasis kelias (`quality.yml`)

`.github/workflows/quality.yml` papildo CI main/release PR, išsiuntimuose į `main`,
rankiniame paleidime ir merge group. PR naudoja pagal kelius filtruojamas greitąsias
patikras. Nuolat išjungtas pasikartojantis build buvo pašalintas; tikrosios build,
package ir boot patikros lieka CI.

| Užduotis                                         | Apimtis                                                                                                                                                                                                     | Blokuojanti          |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | Dokumentacijos/kodo PR; API dokumentacijos nuorodos ir docs-all                                                                                                                                             | Taip                 |
| `Fast Quality Gates`                             | Kodo PR; statinės patikros, typecheck, dashboard typecheck, paveikti vienetų testai                                                                                                                         | Taip                 |
| `Forgotten sibling tests`                        | Kodo PR; pakeisti moduliai, atsekti iki statinių vartotojų ir kandidato giminingų testų; barrel ir dynamic-import keliai pateikiami kaip patariamoji diagnostika, nurodant leidžiamų išimčių sąrašo išimtis | **Patariamoji**      |
| `Vitest (fast-path)`                             | Kodo PR; greitas vitest rinkinys                                                                                                                                                                            | Taip                 |
| `Unit Tests fast-path`                           | Kodo PR; 4 dalių vienetų testų rinkinys                                                                                                                                                                     | Taip                 |
| `No new ESLint warnings`                         | Kodo PR; su slopinimais suderinta lint apsauga                                                                                                                                                              | Taip, įskaitant fork |
| `Merge integrity (changelog + generated skills)` | Ne juodraštiniai PR; pakeitimų žurnalo ir sugeneruotų įgūdžių sinchronizacija                                                                                                                               | Taip, įskaitant fork |

#### Pamirštų giminingų testų ataskaita

`npm run check:forgotten-sibling-tests` pakartotinai naudoja importų sprendiklį, esantį už testų poveikio žemėlapio.
Kiekvienam pakeistam produkciniam moduliui jis pateikia deterministines
`changed module/symbol -> static consumer -> candidate sibling test` grandines, kai kandidatinio
testo nėra pull request pakeitimų rinkinyje. Markdown santrauka ir JSON rezultatas išsaugomi kaip
`forgotten-sibling-tests` darbo eigos artefaktas, skirtas kalibravimui prieš pradedant bet kokį blokavimo diegimą.

Barrel eksportai iš naujo ir dinaminiai importai yra tik sprendimo diagnostika; jie niekada nesukuria
blokuojančio radinio. Peržiūrėtos išimtys saugomos faile
`config/quality/forgotten-sibling-allowlist.json`. Kiekviename įraše turi būti nurodytas vartotojas ir kandidatinis
testas, pateiktas konkretus pagrindimas ir pridėta nuoroda į „GitHub“ problemą arba pull request. Netinkamai suformuoti
įrašai laikomi neleistinais. Išimtys negali nuslopinti ištrinto kandidatinio testo arba pakeitimų rinkinio, kuriame
pridedamas `.skip`/`.todo`; tvirtinimų susilpninimas ir kitas maskavimas priklauso nepriklausomai blokuojančiam
`check:test-masking` vartams.

### Užduotis: `lint`

Vykdoma kiekviename PR į `main`. Nesėkmės atveju blokuoja sujungimą.

| Scenarijus (`npm run ...`)        | Tikrina                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Blokuojantis                                   |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `check:node-runtime`              | Node.js versija patenka į palaikomą intervalą                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Taip                                           |
| `check:cycles`                    | Cikliniai importai visame `src/` + `open-sse/` (pagrįsta AST, išspręsti tsconfig `paths`). Paprastas paleidimas grąžina 1, kai egzistuoja bent vienas ciklas (uždarojo nesėkmės režimo veikimas nuo #15281) ir pateikia SCC sąrašą. `check:cycles:ratchet` (tai vykdo CI) blokuoja, kai skaičius viršija `quality-baseline.json` faile esančią `metrics.cycles` ribą — šiuo metu 14, `direction: down`, todėl ji gali tik mažėti (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Taip (ribojimas)                               |
| `check:boundary`                  | `open-sse → src` susiejimas: unikalūs failų tarpusavio importai iš variklio į programą (`scripts/quality/measure-boundary.mjs`; briaunų sąrašas yra v4 branduolio / modulių atskyrimo taisymo darbų sąrašas). Paprastas paleidimas pateikia patariamąją ataskaitą (kaip ir `quality:boundary`). `check:boundary:ratchet` (tai vykdo CI, taip pat įtraukta į `quality.yml` greitųjų vartų ribojimo ciklą) blokuoja, kai skaičius viršija `quality-baseline.json` faile esančią `metrics.boundaryOpenSseToSrc` ribą — pradinė reikšmė nustatyta pagal išmatuotą 771, `direction: down`; `--update` gali tik ją sumažinti; PR atveju lyginama su bazine reikšme (`--base-ref`, žr. toliau)                                                                                                                                                                                                                                                                                                                                                  | Taip (ribojimas)                               |
| `check:route-validation:t06`      | „Zod“ schemos pateiktos visuose maršrutuose (6 lygio politika)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Taip                                           |
| `check:any-budget:t11`            | `@ts-expect-error // any` count does not exceed budget (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Taip                                           |
| `check:provider-consistency`      | Kiekvienas `providers.ts` teikėjas turi atitinkantį įrašą faile `providerRegistry.ts` (ir atvirkščiai, atsižvelgiant į leidžiamų elementų sąrašą)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Taip                                           |
| `check:model-lifecycle`           | Trys rankiniu būdu prižiūrimos maršrutizavimo lentelės išlieka suderintos su į repozitoriją įrašyta gyvavimo ciklo momentine kopija (#11503): `FITNESS_TABLE` (`taskFitness.ts`) neįvertina nė vieno nutraukto identifikatoriaus, kurį gali nukreipti `REGISTRY`; kiekvienas `BUILT_IN_ALIASES` tikslas yra faile `REGISTRY` ir jo nėra nutrauktų identifikatorių momentinėje kopijoje; kiekvienas nutrauktas identifikatorius, vis dar esantis faile `REGISTRY`, yra persiunčiamas arba įtrauktas į `allowedRetiredInCatalog`; ir šioje momentinėje kopijoje nė vienas `DEFAULT_DEGRADATION_MAP` šaltinis ar tikslas nėra pažymėtas kaip nutrauktas. Tai neįrodo, kad modelį šiuo metu aptarnauja aktyvus tiekėjas. Veikia neprisijungus — palygina su `config/quality/model-lifecycle.json`, kuris rankiniu būdu atnaujinamas naudojant `npm run quality:refresh-model-lifecycle` (reikalingas tinklas; į CI neįtrauktas). `allowedRetiredInCatalog` yra laipsniško mažinimo ribotuvas: įrašą pridėkite tik kartu su sekimo užduotimi. | Taip                                           |
| `check:fetch-targets`             | Kiekvienas `fetch("/api/...")` kliento pusės `src/` kataloge nurodo tikrą `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Taip                                           |
| `check:deps`                      | Visos `npm install` įdiegiamos priklausomybės visuose repozitorijos `package.json` failuose yra įtrauktos į `dependency-allowlist.json`; pažymėti nauji neprisegti arba slopsquatting būdu įtraukti paketai                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Taip                                           |
| `audit:deps`                      | `npm audit` (šakninio katalogo ir electron) — nėra aukšto ar kritinio lygio įspėjimų (persidengia su osv `check:vuln-ratchet`; žr. Racionalizavimo darbų sąrašą)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Taip                                           |
| `check:lockfile`                  | `package-lock.json` vientisumas — https registras, vientisumo maišos, be pagrindinio kompiuterio perrašymų                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Taip                                           |
| `check:licenses`                  | SPDX licencijų leidžiamasis sąrašas gamybinėms priklausomybėms                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Taip                                           |
| `check:tracked-artifacts`         | Nėra kompiliavimo artefaktų / įkeltų į repozitoriją `node_modules` simbolinių nuorodų (taip pat vykdoma husky pre-commit etape; pre-push veiksmas sąmoningai yra minimalus — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Taip                                           |
| `check:ai-attribution`            | PR įsipareigojimuose, pavadinime ar pagrindiniame tekste nėra AI / roboto `Co-Authored-By` prierašo ar AI generavimo poraštės — griežta taisyklė Nr. #16 (įtraukta į `quality.yml` greitųjų vartų ciklą, skirtą PR→`release/**` — nuskaito įvykio naudingąją apkrovą, už PR ribų nieko nedaro — ir į PR skirtą veiksmą `ci.yml` lintinimui, skirtą PR→`main`; taip pat į husky `commit-msg` kablį; žmonės bendraautoriai leidžiami; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:vitest-exclusions`         | Kiekviena Vitest išimtis nurodo sekimo užduotį ir yra faile `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Taip                                           |
| `check:file-size`                 | Šaltinio failai (`.ts`/`.tsx` kataloguose `src/`, `open-sse/`, `electron/`, `bin/`) neviršija `cap`, o testų failai (`*.test.ts(x)`) — `testCap`; faile `file-size-baseline.json` užfiksuoti failai (`frozen` / `testFrozen`) negali išaugti virš juose įrašyto dydžio                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Taip                                           |
| `check:error-helper`              | Vykdytojų / tvarkyklių klaidų atsakymuose naudojamos `buildErrorBody()` / `sanitizeErrorMessage()` (griežtoji taisyklė Nr. 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Taip                                           |
| `check:migration-numbering`       | Migracijos SQL failai sunumeruoti nuosekliai, nėra tarpų ar dublikatų                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Taip                                           |
| `check:public-creds`              | Nėra pažodinių OAuth `client_id` / `client_secret` ar „Firebase Web“ raktų už `publicCreds.ts` ribų (griežtoji taisyklė Nr. 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Taip                                           |
| `check:db-rules`                  | Už `src/lib/db/` modulių ribų nėra neapdoroto SQL; iš `localDb.ts` neimportuojama naudojant barrel-importus (griežtosios taisyklės Nr. 2 ir Nr. 5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Taip                                           |
| `check:known-symbols`             | Teikėjų vykdytojai, maršrutizavimo strategijos ir vertėjai, užregistruoti jų iškvietimo lentelėse, atitinka diske esančius failus — nėra nenaudojamų ar nedeklaruotų simbolių                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Taip                                           |
| `check:route-guard-membership`    | Kiekvienas maršrutas, paleidžiantis antrinį procesą, klasifikuojamas naudojant `isLocalOnlyPath()` (griežtosios taisyklės Nr. 15 ir Nr. 17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Taip                                           |
| `check:test-discovery`            | Kiekvienas `*.test.ts` / `*.spec.ts` failas saugykloje surenkamas bent vieno testų vykdyklės (ratchet: našlaičių sąrašas faile `test-discovery-baseline.json` gali tik trumpėti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Taip                                           |
| `check:test-tla-order`            | Nė vienas `node:test` failas kataloge `tests/unit` neregistruoja testo, nepasiekia aukščiausio lygio `await`, o tada neužregistruoja daugiau testų (#18045; ratchet: `test-tla-order-allowlist.json` gali tik trumpėti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Taip                                           |
| `check:agent-skills-sync`         | Sugeneruoti agentų įgūdžių artefaktai atitinka jų šaltinio katalogą (nėra neatitikimų)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:provider-asset-provenance` | Teikėjų logotipai / ištekliai turi įrašytą kilmės įrašą                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `lint:json`                       | JSON konfigūracijos failai yra analizuojami ir atitinka saugyklos lint taisykles                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecheck:core`                  | TypeScript kompiliavimas be klaidų (tik informaciniai įspėjimai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Taip                                           |
| `typecheck:noimplicit:core`       | Griežtas `noImplicitAny` — orientuota į ateitį; daugelyje esamų iškvietimo vietų vis dar reikia anotacijų                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **Rekomendacinis** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, taikomas tik `src/app/(dashboard)/**` sričiai (#7033) — kuruojamame `typecheck:core` 27 failų leidžiamajame sąraše nėra nė vieno dashboard TSX failo, o `next build` taip pat niekada netikrina tipų (`next.config.mjs` nustato `ignoreBuildErrors: true`), todėl našlaičių identifikatorių regresijos ten (#6625/#6909) CI buvo nepastebimos. Skirtumai lyginami su užfiksuota kiekvieno failo / TS kodo skaičiaus pradine reikšme (`config/quality/dashboard-typecheck-baseline.json`, naudojamas toks pats pasenusio vykdymo užtikrinimo modelis kaip ir `check:known-symbols`) — vartus pažeidžia tik NAUJOS klaidos, viršijančios pradinėje reikšmėje nurodytą skaičių; sumažinkite reikšmę naudodami `--update`, kai ištaisoma ankstesnė klaida.                                                                                                                                                                                                                                                                            | Taip                                           |
| `check:build-typecheck`           | Viso programos produkcinės versijos tipų tikrinimas pagal `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), kurio neapima `typecheck:core` 27 failų leidžiamasis sąrašas ir dashboard vartai. Skirtumai lyginami su `config/quality/build-typecheck-baseline.json`; naujas arba padidėjęs skaičius pagal (failą, kodą) pažeidžia vartus, o mažesnis skaičius prašo jį sumažinti. `--update` atsisako veikti, jei vykdymo metu randama nauja arba padidėjusi pora, nebent perduodama `--force-regressions`, ir atsisako priimti naujai nutildytą failą, nebent perduodama `--force-nocheck`, todėl pradinės reikšmės išplėtimas, kad patikra būtų sėkminga, ir nuolatinio nutildymo suteikimas yra du atskiri sąmoningi veiksmai. Vien tik `--force` atmetama. Be to, kūrimo srityje ieškoma `@ts-nocheck` pagal `config/quality/ts-nocheck-baseline.json`, nes jį naudojantis failas apskritai nepateikia diagnostikos ir kitu atveju būtų nematomas visiems vartams.                       | Taip                                           |

#### Dvi tipų tikrinimo programos pateikia skirtingus atsakymus

`typecheck:core` ir `check:build-typecheck` kompiliuoja skirtingas programas su skirtingomis
parinktimis, todėl tas pats failas vienoje gali būti tvarkingas, o kitoje turėti daugybę klaidų.

`tsconfig.build.json` nustato `"strict": false`, todėl `noImplicitAny` yra išjungta. Core
konfigūracija kompiliuoja kuruojamą 27 failų leidžiamąjį sąrašą su griežtesnėmis parinktimis ir
seka kiekvieno įrašo importų grafą, todėl failai, kurie niekada nepatenka į kūrimo programą,
vis tiek ten patikrinami.

Tai svarbu sprendžiant, ar failas yra tipiškai tvarkingas: **nulis diagnostikos pranešimų
vykdant `check:build-typecheck` nereiškia nulio**. Pašalinus `@ts-nocheck` iš 26
failų, paaiškėjo, kad 23 iš jų kūrimo programoje yra tvarkingi; šešiolikoje iš jų griežtoje
programoje išryškėjo apie 120 netiesiogiai nustatyto tipo `any` klaidų. Prieš teigdami, kad
failas yra tvarkingas, patikrinkite abi programas.

### Užduotis: `quality-gate`

Vykdoma po `test-coverage`. Nesėkmės atveju blokuoja suliejimą.

| Script                       | Tikrina                                                                                                                                                                                                            | Blokuojantis           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `quality:collect`            | Sugeneruoja `quality-metrics.json` (ESLint įspėjimų skaičius, aprėptis iš sujungtos shard ataskaitos)                                                                                                              | Taip (prieš `ratchet`) |
| `quality:ratchet`            | Kiekviena `quality-baseline.json` metrika nepatyrė regresijos (ESLint įspėjimai ≤ bazinė reikšmė; aprėptis ≥ bazinė reikšmė)                                                                                       | Taip                   |
| `check:duplication`          | Kodo dubliavimas (`jscpd@4`) neviršija `quality-baseline.json` bazinės reikšmės                                                                                                                                    | Taip                   |
| `check:complexity`           | Failo lygmens ciklomatinis sudėtingumas neviršija ribos (pagrindinė ESLint `complexity` + `max-lines-per-function`)                                                                                                | Taip                   |
| `check:cognitive-complexity` | Kognityvinio sudėtingumo regresijos kontrolė (`eslint-plugin-sonarjs`) — atskiras ESLint vykdymas; CI abu sujungia į vieną `check:complexity-ratchets` veiksmą                                                     | Taip                   |
| `check:dead-code`            | Nenaudojamų eksportų / failų regresijos kontrolė (`knip`) nepablogėja, palyginti su bazine reikšme                                                                                                                 | Taip                   |
| `check:compression-budget`   | Suspaudimo etaloninis biudžetas — kiekvieno variklio žetonų sutaupymo minimumai neturi pablogėti                                                                                                                   | Taip                   |
| `check:type-coverage`        | Tipizuoto kodo procentinės dalies regresijos kontrolė (`type-coverage`) nepablogėja; iš esmės apima `typecheck:noimplicit:core`                                                                                    | Taip                   |
| `check:codeql-ratchet`       | Atvirų CodeQL įspėjimų skaičius nepablogėja (skaitoma per `gh api`; be žetono tvarkingai praleidžiama) — atnaujinimo periodiškumas ir rankinis paleidimas: žr. toliau pateiktą skyrių „CodeQL regresijos kontrolė“ | Taip                   |

### Užduotis: `quality-extended`

Visa užduotis yra patariamoji (`continue-on-error: true`). npm pagrįstos regresijos kontrolės vykdomos
realiai; išoriniai skeneriai įdiegiami per `gh release download` ir praleidžiami (exit 0),
jei dvejetainio failo vis dar nėra.

| Script                   | Tikrina                                                                                                                                                                                                                                                                                  | Blokuojantis                                              |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `check:circular-deps`    | Ciklinių priklausomybių nėra (`dpdm`)                                                                                                                                                                                                                                                    | **Patariama**                                             |
| `check:bundle-size`      | Paketo dydis neviršija ribos                                                                                                                                                                                                                                                             | **Patariama**                                             |
| `check:secrets`          | Paslapčių skenavimas (`gitleaks`) — praleidžiama, jei dvejetainio failo nėra                                                                                                                                                                                                             | **Patariama**                                             |
| `check:vuln-ratchet`     | Priklausomybių pažeidžiamumai (`osv-scanner`) nepablogėja — praleidžiama, jei dvejetainio failo nėra                                                                                                                                                                                     | **Patariama**                                             |
| `check:workflows`        | Darbo eigų lint tikrinimas (`actionlint` + `zizmor`); trūkstami / neveikiantys skeneriai, netinkamos ataskaitos arba trūkstama regresijos kontrolės bazinė reikšmė laikomi NEBAIGTAIS. Galiojantys radiniai vadovaujasi pasirinkta griežta / patariamąja / regresijos kontrolės politika | Būtina vykdymui; `zizmor` regresijos kontrolė CI blokuoja |
| `check:openapi-breaking` | Esminiai viešosios API sutarties (`openapi.yaml`) pakeitimai, palyginti su bazine šaka (`oasdiff`) — sugeneruoja `openapiBreaking=N`; praleidžiama, jei `oasdiff` nėra arba bazinės specifikacijos nepavyksta išspręsti                                                                  | **Patariama**                                             |

### Užduotis: `docs-sync-strict`

Vykdoma kiekviename PR į `main`. Nesėkmės atveju sujungimas blokuojamas.

| Script                         | Tikrina                                                                                                                                                                                                                | Blokuojantis                 |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `check:docs-all`               | Metavartai, kurie paeiliui paleidžia toliau nurodytus 6 papildomus vartus                                                                                                                                              | Ta                           |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt versijų nuoseklumą                                                                                                                                                                       | Ta                           |
| ↳ `check:docs-counts`          | Ar prozoje nurodyti skaičiai (teikėjų skaičius, migracijų skaičius ir kt.) patenka į tikrųjų skaičių ratchet intervalą                                                                                                 | Ta                           |
| ↳ `check:env-doc-sync`         | Kiekvienas aplinkos kintamasis iš `.env.example` yra aprašytas dokumentacijos lentelėje ir atvirkščiai                                                                                                                 | Ta                           |
| ↳ `check:deprecated-versions`  | Dokumentacijoje nėra pasenusių versijų eilučių                                                                                                                                                                         | Ta                           |
| ↳ `check:doc-links`            | Vidinės Markdown nuorodos dokumentacijoje nurodo esamus failus (`[text]`/`(path)` forma)                                                                                                                               | Ta                           |
| ↳ `check:fabricated-docs`      | Dokumentacijoje nurodyti maršrutai, aplinkos kintamieji, CLI komandos, kabliukų pavadinimai ir failų keliai egzistuoja kodų bazėje. Griežtas vartas naudojant `--strict`; be vėliavėlės klaida laikoma neblokuojančia. | Ta (naudojant `--strict` CI) |
| `check:cli-i18n`               | CLI komandų eilutės yra visuose i18n lokalės failuose                                                                                                                                                                  | Ta                           |
| `check:openapi-coverage`       | OpenAPI specifikacija apima bent ratchet būdu nustatytą tikrųjų maršrutų minimumą                                                                                                                                      | Ta                           |
| `check:openapi-security-tiers` | Saugumo lygių anotacijos faile `openapi.yaml` atitinka klasifikacijas faile `routeGuard.ts`                                                                                                                            | **Patariamasis**             |
| `check:openapi-routes`         | Kiekvienas `openapi.yaml` kelias nurodo tikrą `route.ts` (apsauga nuo haliucinacijų)                                                                                                                                   | Ta                           |
| `check:docs-symbols`           | Kiekviena `/api/...` nuoroda faile `docs/**/*.md` nurodo tikrą `route.ts` (apsauga nuo haliucinacijų)                                                                                                                  | Ta                           |
| `i18n translation drift`       | Neišversti raktai i18n lokalės failuose — tik įspėjama                                                                                                                                                                 | **Patariamasis**             |

Dvylika README SVG failų kataloge `docs/diagrams/` yra sugeneruoti (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` sugeneruoja juos visus iš naujo). Kiekvienas turi baitų palyginimo vieneto testą
(`tests/unit/docs/readme-*-svg.test.ts`, užduotis `test-unit`), kuris nepraeina, kai įrašytas failas yra pasenęs, o
`check:docs-counts` nuskaito kanoninius skaičius iš jų `<text>` mazgų — todėl kontūrų kūrimo žingsnis faile palieka kiekvieną kontūruotą eilutę kaip nematomą `<text>`. SVG kanoninių skaičių tikrinimas nuskaito failus, išvardytus
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, taip pat `public/images/tier-flow-dark.svg` ir `tier-flow-light.svg`;
teiginiams apie nemokamą naudojimą visam laikui, katalogo įrašą, pasikartojantį fondą ir vertinimo veiksnius taip pat nuskaitomi
`promise-pillars.svg`, `free-tier-budget.svg` ir `strategies-grid.svg`. `free-tier-budget.svg`
savo skaičius gauna iš aktyvaus katalogo įkėlimo programos, todėl pakeitus `FREE_MODEL_BUDGETS` arba teikėjo rodomą pavadinimą CI tampa raudonas, kol tas failas nesugeneruojamas iš naujo.

### Užduotis: `i18n-ui-coverage`

| Script                            | Tikrina                                                                                                                                                                                                                                              | Blokuojantis     |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage` (inline) | UI i18n raktų aprėptis yra ≥ 65%                                                                                                                                                                                                                     | Ta               |
| `check-ui-value-drift` (inline)   | Pakeitus anglišką **reikšmę**, nelieka pasenusio vertimo                                                                                                                                                                                             | Ta               |
| `check-new-key-coverage` (inline) | **Naujas** angliškas raktas išverstas kiekvienoje lokalėje — `__MISSING__:` žymeklis atmetamas                                                                                                                                                       | Ta               |
| `check-translation-ratio`         | Tikro vertimo santykis kiekvienoje lokalėje (vienodi su anglų kalba / vietos rezervavimo ženklai / trūkstami elementai, neįtraukti į leidžiamų išimčių sąrašą) neturi viršyti `config/quality/i18n-translation-baseline.json` + leidžiamos paklaidos | **Patariamasis** |

Reikalingas `fetch-depth: 0` — reikšmių neatitikimų vartai palygina `en.json` su suliejimo baziniu įrašu.

#### `check-ui-value-drift` — pasenusio vertimo vartai

Užfiksuoja vienintelę i18n regresiją, kurios kiti vartai struktūriškai negali pastebėti: angliška reikšmė perrašoma, o iš _ankstesnės_ anglų kalbos išvesti vertimai lieka nepakitę, todėl ne anglų kalba kalbantys naudotojai ir toliau skaito užtikrintai suformuluotą, tačiau dabar neteisingą tekstą.

Tai iš tiesų pateko į leidimą. `oauthModal.googleOAuthWarning` buvo perrašytas, kai buvo įdiegtas „Antigravity“ prisijungimo pagalbinis komponentas (#5203); **39 iš 43 lokalų** išlaikė tekstą, kuriame operatoriams nurodoma „nukopijuoti visą URL ir įklijuoti jį toliau“ — tai srautas, kurio šis teikėjas negali užbaigti. Tai liko nepastebėta iki #8463, nes:

- `sync-ui-keys` papildo tik **trūkstamus**, o ne **pasenusius** raktus;
- `check-ui-keys-coverage` skaičiuoja rakto _buvimą_, todėl pasenęs vertimas laikomas aprėptu;
- `check-translation-drift` seka `docs/i18n/<locale>/**.md` dokumentacijos kopijas —
  jis niekada neskaito `src/i18n/messages/*.json`. Nuo 2026-09 pakartotinio sinchronizavimo blokuojama užduotyje `docs-sync-strict`: redaguokite pagrindinį dokumentą → `npm run i18n:run -- --files=<doc>` (sekcijos lygmeniu, nebrangu).

**Atsižvelgia į skirtumus, o ne į bazinę būseną.** Ji lygina `en.json` suliejimo bazėje su darbiniu medžiu; kiekvienam raktui, kurio angliška reikšmė pasikeitė, bet kuri lokalė, vis dar turinti nepakeistą vertimą, laikoma pasenusia. Taip sąmoningai **įšaldoma iš anksto egzistavusi skola** — skirtumas negali atskleisti, iš kurios senos angliškos reikšmės atsirado ilgą laiką egzistuojantis vertimas, todėl vartai vertina tik tai, ką paliečia dabartinis pakeitimas. Alternatyva (maišos bazinė būsena kiekvienam raktui) kainuotų maždaug 600 KB sugeneruoto failo — tai būtų 3× didžiausia esama bazinė būsena, kuri keistųsi per kiekvieną i18n PR.

Yra du būdai tai įvykdyti:

1. atnaujinti paveiktus vertimus arba
2. nustatyti juos į `__MISSING__:<new english>` — vykdymo metu tada pateikiama pataisyta anglų kalba
   (`src/i18n/request.ts::deepMergeFallback`, #7258), o raktas įtraukiamas į vertimo eilę.

Jei pasikeitė eilutės **prasmė**, pirmenybę teikite rakto **pervadinimui**: naujas raktas negali paveldėti pasenusio vertimo. Tokį šabloną naudojo #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Grąžina 0 su `SKIP reason=base-unresolved`, kai bazinio katalogo nepavyksta perskaityti (seklus klonas be bazinės nuorodos), taip pat kaip `check-openapi-breaking`.

### Užduotis: `i18n`

Visa i18n validavimo matrica (po vieną užduotį kiekvienai lokalei). Visa užduotis yra rekomendacinė.

| Scenarijus                      | Ką tikrina                          | Ar blokuoja                                                   |
| ------------------------------- | ----------------------------------- | ------------------------------------------------------------- |
| `validate_translation.py quick` | Vertimo išsamumą kiekvienai lokalei | **Rekomendacinė** (`continue-on-error: true` visai užduočiai) |

### Užduotis: `pr-test-policy`

Vykdoma tik naudojant pull request.

| Scenarijus             | Ką tikrina                                                                                                                                                    | Ar blokuoja |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check:pr-test-policy` | PR, kuriuose keičiamas gamybinis kodas `src/`, `open-sse/`, `electron/` arba `bin/`, turi įtraukti arba atnaujinti testus (8-oji griežtoji taisyklė)          | Taip        |
| `check:test-masking`   | Pakeisti testų failai nesumažina bendro teiginių skaičiaus ir neprideda `assert.ok(true)` tautologijų                                                         | Taip        |
| `check:pr-evidence`    | PR apraše nurodomi testo / VPS įrodymai apie pakeitimą (įgyvendina 18-ąją griežtąją taisyklę, ieškodama PR tekste — nepatikima, žr. Atsilikusių darbų sąrašą) | Taip        |

### Užduotis: `test-vitest`

Vykdoma po `build`. Nesėkmės atveju blokuoja suliejimą.

| Rinkinys         | Ką tikrina                                                       | Ar blokuoja                                                                                                          |
| ---------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP serverį (110 įrankių), `autoCombo`, podėlį — vitest vykdyklė | Taip                                                                                                                 |
| `test:vitest:ui` | UI komponentų testus — vitest vykdyklė                           | **Blokuoja** — ankstesnės nesėkmės aiškiai neįtraukiamos faile `vitest.config.ts`; naujos nesėkmės užduotį nutraukia |

### Naktinės darbo sekos (suplanuotos, rekomendacinės)

Jos vykdomos pagal cron tvarkaraštį (ir naudojant `workflow_dispatch`), niekada nevykdomos PR kontekste. Visos yra rekomendacinės.

| Workflow               | Tikrina                                                                                                                                                                                     | Blokavimas      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | fast-check savybių testus su atsitiktine pradine reikšme ir dideliu paleidimų skaičiumi                                                                                                     | **Patariamoji** |
| `nightly-resilience`   | atminties krūvos augimo vartus, chaoso gedimų įterpimą, k6 apkrovos / ištvermės testus                                                                                                      | **Patariamoji** |
| `nightly-llm-security` | promptfoo įterpimo apsaugą (blokavimo režimu) + garak zondus (praleidžiama, jei nėra tiekėjo paslapties)                                                                                    | **Patariamoji** |
| `nightly-schemathesis` | OpenAPI sutarties fuzinį testavimą (schemathesis) prieš veikiančią OmniRoute naudojant `docs/openapi.yaml` — atskleidžia specifikacijos pažeidimus / neapdorotas 500 klaidas (8 etapas B.4) | **Patariamoji** |
| `nightly-mutation`     | Stryker mutacijų testavimo balą greitųjų vienetų testų grandyje — išlikę mutantai atskleidžia silpnus teiginius                                                                             | **Patariamoji** |
| `nightly-compat`       | Node variklio suderinamumo matricą įvairiuose palaikomuose `engines.node` diapazonuose                                                                                                      | **Patariamoji** |

Našumo bazinės reikšmės (heap, TTFB, kūrimo laikas) registruojamos, bet nėra blokavimo kriterijus: žr. [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
