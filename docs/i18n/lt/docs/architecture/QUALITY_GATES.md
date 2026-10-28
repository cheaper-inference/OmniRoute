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

### Kandidatų priėmimas

CI ir „Quality Gates“ darbo srautai kiekvienas pateikia stabilų sprendimą: `Gate / CI` ir
`Gate / Quality`. Jų versijuojama priėmimo politika išvardija kiekvieną priešingos grandies užduotį
kaip privalomą arba patariamąją. Taikoma privaloma užduotis turi būti sėkminga: trūkstami,
atšaukti, praleisti, laukiantys ir nežinomi rezultatai negali patvirtinti PASS. Galiojanti
vien tik dokumentų arba vien tik katalogo klasifikacija gali padaryti kodo liniją netaikoma;
juodraštinis PR nėra priimtinas kandidatas. Žyma `hotfix` neatleidžia nuo įrodymų.

Abu darbo srautai apima PR į main/release šakas, push į `main`, rankinį paleidimą
ir merge-group įvykius. Push, dispatch ir merge-group vykdo visą atranką. Push į
`release/**` jų nepaleidžia (2026-10-18): kiekvienas pakeitimas jau buvo paleistas matricoje savo PR,
o sujungtą derinį turi apdoroti Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane). Fork'ai
ir merge-group naudoja hosted runnerius toms užduotims, kurios kitu atveju pasirenka self-hosted
runnerius; prieš diegiant reikia patikrinti, ar pakanka hosted pajėgumų.

Kiekvienas JSON kvitas nurodo išgautą SHA, darbo srauto paleidimą ir bandymą.
CLI atmeta checkout/event SHA nesutapimą. Darbo srauto testai susieja narystę politikoje
su sprendimo užduoties `needs` sąrašu, kad nauja ar pašalinta linija negalėtų tyliai išnykti.
Kvitai apima jų pačių darbo srautą, o ne publikavimą, diegimą ar esamo patariamojo skenerio
vidinę logiką. Abiejų patikrų pavadinimų aktyvavimas šakų taisyklėse yra
atskiras administracinis pakeitimas; šių užduočių pridėjimas pats savaime neapsaugo šakos.

### Statinio nuskaitymo inventorius

Versijuojamas npm alias inventorius ir statinio nuskaitymo narystė yra
`config/quality/gate-manifest.json`. Paleiskite `npm run check:gate-manifest`, kad patikrintumėte
scenarijų pavadinimus ir tikslias komandas pagal `package.json`; papildymai, pašalinimai ir
komandų skirtumai (drift) nepraeina tiek vietinio hook, tiek CI pakeitimų klasifikavimo užduotyse.
Alias nėra darbo srauto užduotis, matricos egzempliorius ar bandymo atvejis: šie skaičiai neturi
būti pateikiami kaip sukeičiami.

Naudokite `npm run quality:scan -- --list` arba `npm run quality:scan:fast -- --list`,
kad peržiūrėtumėte pasirinktus alias jų nevykdydami. Vykdytojas iškviečia
npm įėjimo tašką, todėl jo vykdymo aplinka (įskaitant Bun, kur sukonfigūruota) išsaugoma.
Manifeste alias, esantys už tų profilių ribų, įrašomi kaip atskirai iškviečiami, o
priežiūros komandos draudžiamos tik skaitymo režimo nuskaitymo profiliuose.

Šie profiliai apima tik statinį nuskaitymą. Jie nesertifikuoja produkto testų,
padengimo, pakavimo, išorinių patikrų ar visiško kandidato leidimo išleisti.
Darbo srauto priėmimas naudoja susietus `config/quality/admission-policy.json` ir
`scripts/quality/admission-verdict.mjs`. Release-observer profiliai lieka atskiri;
tikrinkite jų taikomas patikras ir kvitus nepriklausomai. Toliau pateiktas tekstinis
inventorius yra nuoroda, o ne įrodymas, kad vartai iš tikrųjų buvo paleisti.

Scenarijai yra `scripts/check/` (politikos vartai) ir `scripts/quality/` (ratchet variklis).
CI tiesos šaltinis yra `.github/workflows/ci.yml`.

### Leidimo PR greitasis kelias (`quality.yml`)

`.github/workflows/quality.yml` papildo CI PR į main/release, push į `main`,
dispatch ir merge-group įvykių metu. PR naudoja pagal kelią filtruojamas greitąsias patikras. Nuolat
išjungta pasikartojanti build versija buvo pašalinta; tikrieji build/package/boot patikrinimai lieka CI.

| Užduotis                                         | Apimtis                                                                                                                                                                                                       | Blokuojanti             |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | Dokumentų/kodo PR; API dokumentacijos nuorodos ir docs-all                                                                                                                                                    | Taip                    |
| `Fast Quality Gates`                             | Kodo PR; statinės patikros, typecheck, dashboard typecheck, paveiktų vienetų testai                                                                                                                           | Taip                    |
| `Forgotten sibling tests`                        | Kodo PR; pakeisti moduliai atsekami iki statinių vartotojų ir kandidatų giminingų testų; barrel ir dynamic-import keliai pateikiami kaip patariamoji diagnostika, su nurodytomis leidžiamųjų sąrašo išimtimis | **Patariamoji**         |
| `Vitest (fast-path)`                             | Kodo PR; greitasis vitest rinkinys                                                                                                                                                                            | Taip                    |
| `Unit Tests fast-path`                           | Kodo PR; 4 dalių (shard) vienetų rinkinys                                                                                                                                                                     | Taip                    |
| `No new ESLint warnings`                         | Kodo PR; lint apsauga, atsižvelgianti į slopinimus                                                                                                                                                            | Taip, įskaitant fork'us |
| `Merge integrity (changelog + generated skills)` | Ne juodraštiniai PR; changelog ir sugeneruotų įgūdžių (skills) sinchronizavimas                                                                                                                               | Taip, įskaitant fork'us |

#### Pamirštų giminingų testų ataskaita

`npm run check:forgotten-sibling-tests` naudoja importų resolverį, kuris yra testų poveikio žemėlapio pagrindas.
Kiekvienam pakeistam produkciniam moduliui jis pateikia deterministines
`changed module/symbol -> static consumer -> candidate sibling test` grandines, kai kandidatinis
testas nepatenka į pull-request diff. Markdown suvestinė ir JSON rezultatas išsaugomi kaip
`forgotten-sibling-tests` workflow artefaktas kalibravimui prieš bet kokį blokuojantį įdiegimą.

Barrel pereksportai ir dinaminiai importai yra tik rezoliucijos diagnostika; jie niekada nesukuria
blokuojančio radinio. Peržiūrėtos išimtys saugomos
`config/quality/forgotten-sibling-allowlist.json`. Kiekvienas įrašas turi nurodyti vartotoją ir kandidatinį
testą, pateikti konkrečią priežastį ir susieti su GitHub issue arba pull request. Neteisingai
suformuoti įrašai atmetami pagal fail-closed principą. Išimtys negali slopinti ištrinto kandidatinio
testo ar diff, kuriame pridedama `.skip`/`.todo`; dėl assertionų silpninimo ir kito maskavimo
atsakinga nepriklausomai blokuojanti `check:test-masking` patikra.

### Užduotis: `lint`

Vykdoma kiekvienam PR, skirtam `main`. Nesėkmės atveju blokuoja sujungimą.

| Scenarijus (`npm run ...`)        | Tikrina                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Blokuojantis                                  |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `check:node-runtime`              | Node.js versija atitinka palaikomą diapazoną                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Taip                                          |
| `check:cycles`                    | Cikliniai importai visame `src/` + `open-sse/` (paremta AST, išspręsti tsconfig `paths`). Be vėliavų grąžina išėjimo kodą 1, kai tik egzistuoja bet koks ciklas (fail-closed nuo #15281), ir išvardija SCC. `check:cycles:ratchet` (tai, ką vykdo CI) blokuoja, kai skaičius viršija `metrics.cycles` lubas faile `quality-baseline.json` — šiuo metu 14, `direction: down`, todėl jis gali tik mažėti (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Taip (ratchet)                                |
| `check:boundary`                  | `open-sse → src` susiejimas: unikalūs importai iš failo į failą iš variklio į programą (`scripts/quality/measure-boundary.mjs`; briaunų sąrašas yra v4 branduolio/modulių skaidymo taisymo darbų eilė). Be vėliavų = patariamoji ataskaita (tas pats kaip `quality:boundary`). `check:boundary:ratchet` (tai, ką vykdo CI, taip pat `quality.yml` greitųjų vartų ratchet cikle) blokuoja, kai skaičius viršija `metrics.boundaryOpenSseToSrc` lubas faile `quality-baseline.json` — pradinė reikšmė išmatuota 771, `direction: down`; `--update` tik sumažina ją; bazinis santykinis PR'uose (`--base-ref`, žr. žemiau)                                                                                                                                                                                                                                                                                                                                                          | Taip (ratchet)                                |
| `check:route-validation:t06`      | Zod schemos esančios visuose maršrutuose (6 lygio politika)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Taip                                          |
| `check:any-budget:t11`            | `@ts-expect-error // any` skaičius neviršija biudžeto (11 lygio ratchet)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Taip                                          |
| `check:provider-consistency`      | Kiekvienas teikėjas faile `providers.ts` turi atitinkamą įrašą faile `providerRegistry.ts` (ir atvirkščiai, leidžiamųjų sąraše)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Taip                                          |
| `check:model-lifecycle`           | Trys rankiniu būdu prižiūrimos maršrutizavimo lentelės išlieka suderintos su į saugyklą įtraukta gyvavimo ciklo momentine kopija (#11503): `FITNESS_TABLE` (`taskFitness.ts`) neįvertina nė vieno nebenaudojamo ID, kurį `REGISTRY` gali nukreipti; kiekvienas `BUILT_IN_ALIASES` tikslas yra įtrauktas į `REGISTRY` ir jo nėra nebenaudojamų ID momentinėje kopijoje; kiekvienas nebenaudojamas ID, vis dar esantis `REGISTRY`, yra persiunčiamas arba nurodytas `allowedRetiredInCatalog`; ir nė vienas `DEFAULT_DEGRADATION_MAP` šaltinis ar tikslas tame momentiniame vaizde nėra pažymėtas kaip nebenaudojamas. Tai neįrodo, kad modelį šiuo metu aptarnauja veikiantis upstream. Veikia neprisijungus — lygina su `config/quality/model-lifecycle.json`, kuris rankiniu būdu atnaujinamas komanda `npm run quality:refresh-model-lifecycle` (reikia tinklo; neįtraukta į CI). `allowedRetiredInCatalog` yra mažėjimo ratchet: įrašą pridėkite tik turėdami sekimo užduotį. | Taip                                          |
| `check:fetch-targets`             | Kiekvienas `fetch("/api/...")` kliento pusės `src/` faile nurodo į tikrą `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Taip                                          |
| `check:deps`                      | Visos priklausomybės, kurias galima įdiegti su `npm install`, visuose saugyklos `package.json` failuose yra įtrauktos į `dependency-allowlist.json`; nauji neužfiksuotos versijos arba slopsquatted paketai pažymimi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Taip                                          |
| `audit:deps`                      | `npm audit` (šakninis + electron) — nėra aukšto/kritinio lygio saugumo įspėjimų (persidengia su osv `check:vuln-ratchet`; žr. Racionalizavimo darbų sąrašą)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Taip                                          |
| `check:lockfile`                  | `package-lock.json` vientisumas — https registras, vientisumo maišos, jokių host perrašymų                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Taip                                          |
| `check:licenses`                  | SPDX licencijų leidžiamasis sąrašas produkcinėms priklausomybėms                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Taip                                          |
| `check:tracked-artifacts`         | Jokių kompiliavimo artefaktų / įtrauktų `node_modules` simbolinių nuorodų (taip pat paleidžiama husky pre-commit metu; pre-push sąmoningai lengvas — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Taip                                          |
| `check:ai-attribution`            | Nėra AI/bot `Co-Authored-By` prierašo ar AI generavimo poraštės PR commit'uose, pavadinime ar aprašyme — Griežtoji taisyklė #16 (`quality.yml` greitųjų vartų cikle, skirtame PR→`release/**` — nuskaito įvykio duomenis, ne PR atveju nieko nedaro — ir tik PR skirtame `ci.yml` lint žingsnyje, skirtame PR→`main`; taip pat husky `commit-msg` hook; žmonių bendraautoriai leidžiami; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:vitest-exclusions`         | Kiekviena Vitest išimtis nurodo sekimo problemą ir yra įtraukta į `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Taip                                          |
| `check:file-size`                 | Šaltinio failai (`.ts`/`.tsx` kataloge `src/`, `open-sse/`, `electron/`, `bin/`) neviršija `cap`, o testų failai (`*.test.ts(x)`) neviršija `testCap`; failai, įšaldyti `file-size-baseline.json` (`frozen` / `testFrozen`), neturi išaugti virš įrašyto dydžio                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Taip                                          |
| `check:error-helper`              | Klaidų atsakymai vykdytojuose/apdorotojuose naudoja `buildErrorBody()` / `sanitizeErrorMessage()` (Griežtoji taisyklė #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Taip                                          |
| `check:migration-numbering`       | Migracijų SQL failai sunumeruoti nuosekliai, be praleistų numerių ar dublikatų                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Taip                                          |
| `check:public-creds`              | Nėra tiesioginių OAuth `client_id`/`client_secret` ar Firebase Web raktų už `publicCreds.ts` ribų (Griežtoji taisyklė #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Taip                                          |
| `check:db-rules`                  | Nėra neapdoroto SQL už `src/lib/db/` modulių ribų; nėra barrel importų iš `localDb.ts` (Griežtosios taisyklės #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Taip                                          |
| `check:known-symbols`             | Teikėjų vykdytojai, maršrutizavimo strategijos ir vertėjai, užregistruoti jų iškvietimų lentelėse, atitinka diske esančius failus – nėra našlaičių ar nedeklaruotų simbolių                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Taip                                          |
| `check:route-guard-membership`    | Kiekvienas maršrutas, kuris paleidžia antrinį procesą, yra klasifikuojamas pagal `isLocalOnlyPath()` (Griežtosios taisyklės #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Taip                                          |
| `check:test-discovery`            | Kiekvienas `*.test.ts` / `*.spec.ts` failas saugykloje yra surenkamas bent vieno testų vykdyklio (ratchet: našlaičių sąrašas `test-discovery-baseline.json` faile gali tik mažėti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Taip                                          |
| `check:test-tla-order`            | Joks `node:test` failas kataloge `tests/unit` negali užregistruoti testo, pasiekti viršutinio lygmens `await` ir tada užregistruoti daugiau (#18045; ratchet: `test-tla-order-allowlist.json` gali tik mažėti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Taip                                          |
| `check:agent-skills-sync`         | Sugeneruoti agentų įgūdžių artefaktai atitinka jų šaltinio katalogą (nėra nukrypimų)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:provider-asset-provenance` | Tiekėjų logotipai/ištekliai turi užregistruotą kilmės įrašą                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `lint:json`                       | JSON konfigūracijos failai išanalizuojami ir atitinka saugyklos lint taisykles                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `typecheck:core`                  | TypeScript kompiliavimas be klaidų (tik rekomendaciniai įspėjimai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Taip                                          |
| `typecheck:noimplicit:core`       | Griežtas `noImplicitAny` — orientuotas į ateitį; daugeliui jau esamų iškvietimo vietų vis dar reikia anotacijų                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **Rekomendacinė** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` taikomas tik `src/app/(dashboard)/**` (#7033) — `typecheck:core` atrinktame 27 failų sąraše nėra nė vieno dashboard TSX failo, o `next build` jo taip pat niekada netikrina tipų (`next.config.mjs` nustato `ignoreBuildErrors: true`), todėl ten atsiradę našlaičių identifikatorių regresai (#6625/#6909) buvo nematomi CI. Lyginama su užšaldyta kiekvieno failo / kiekvieno TS kodo skaičiaus bazinė linija (`config/quality/dashboard-typecheck-baseline.json`, tas pats pasenusio vykdymo šablonas kaip `check:known-symbols`) — patikrą sustabdo tik NAUJOS klaidos, viršijančios bazinį skaičių; kai esama klaida ištaisoma, mažinkite žingsnis po žingsnio su `--update`.                                                                                                                                                                                                                                                                                         | Taip                                          |

### Jobas: `quality-gate`

Paleidžiamas po `test-coverage`. Nepavykus blokuoja sujungimą (merge).

| Skriptas                     | Ką tikrina                                                                                                                                                                                  | Blokuojantis         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `quality:collect`            | Išveda `quality-metrics.json` (ESLint įspėjimų skaičių, padengimą iš sujungtos shard ataskaitos)                                                                                            | Taip (prieš ratchet) |
| `quality:ratchet`            | Nė vienas metrikas faile `quality-baseline.json` nepablogėjo (ESLint įspėjimai ≤ bazinė reikšmė; padengimas ≥ bazinė reikšmė)                                                               | Taip                 |
| `check:duplication`          | Kodo dubliavimas (jscpd@4) neviršija bazinės reikšmės faile `quality-baseline.json`                                                                                                         | Taip                 |
| `check:complexity`           | Failo lygmens ciklomatinis sudėtingumas neviršija ribos (pagrindinės ESLint `complexity` + `max-lines-per-function`)                                                                        | Taip                 |
| `check:cognitive-complexity` | Kognityvinio sudėtingumo ratchet (`eslint-plugin-sonarjs`) — atskiras ESLint paleidimas; CI abu sujungia į vieną `check:complexity-ratchets` žingsnį                                        | Taip                 |
| `check:dead-code`            | Nenaudojamų eksportų / failų ratchet (knip) nepablogėja, palyginti su bazine reikšme                                                                                                        | Taip                 |
| `check:compression-budget`   | Suspaudimo etalono biudžetas — kiekvieno variklio žetonų taupymo apatinės ribos neturi pablogėti                                                                                            | Taip                 |
| `check:type-coverage`        | Tipizuotų dalių procento ratchet (`type-coverage`) nepablogėja; iš esmės apima `typecheck:noimplicit:core`                                                                                  | Taip                 |
| `check:codeql-ratchet`       | Atvirų CodeQL įspėjimų skaičius nepablogėja (skaitoma per `gh api`; be tokeno praleidžiama be klaidos) — atnaujinimo periodiškumas ir paleidimas rankiniu būdu: žr. „CodeQL ratchet“ žemiau | Taip                 |

### Jobas: `quality-extended`

Visas jobas yra patariamasis (`continue-on-error: true`). npm pagrindu veikiantys ratchet'ai
vykdomi realiai; išoriniai skaitytuvai įdiegiami per `gh release download` ir patys praleidžiami (exit 0),
kai dvejetainio failo vis dar nėra.

| Skriptas                 | Ką tikrina                                                                                                                                                                                                                                                           | Blokuojantis                                 |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:circular-deps`    | Nėra ciklinių priklausomybių (dpdm)                                                                                                                                                                                                                                  | **Patariamasis**                             |
| `check:bundle-size`      | Paketo (bundle) dydis neviršija ribos                                                                                                                                                                                                                                | **Patariamasis**                             |
| `check:secrets`          | Slaptųjų duomenų skenavimas (gitleaks) — praleidžiama, jei dvejetainio failo nėra                                                                                                                                                                                    | **Patariamasis**                             |
| `check:vuln-ratchet`     | Priklausomybių pažeidžiamumai (osv-scanner) nepablogėja — praleidžiama, jei dvejetainio failo nėra                                                                                                                                                                   | **Patariamasis**                             |
| `check:workflows`        | Workflow lint (actionlint + zizmor); trūkstami / sugedę skaitytuvai, neteisingos ataskaitos ar trūkstama ratchet bazinė reikšmė traktuojami kaip INCOMPLETE ir nepavyksta. Galiojantys radiniai tvarkomi pagal pasirinktą griežtąją / patariamąją / ratchet politiką | Būtinas vykdymas; zizmor ratchet blokuoja CI |
| `check:openapi-breaking` | Nesuderinami viešosios API sutarties (`openapi.yaml`) pakeitimai, palyginti su bazine šaka (oasdiff) — išveda `openapiBreaking=N`; praleidžiama, jei oasdiff nėra arba bazinė specifikacija neįskaitoma                                                              | **Patariamasis**                             |

### Jobas: `docs-sync-strict`

Paleidžiamas prie kiekvieno PR į `main`. Nepavykus blokuoja sujungimą.

| Scenarijus                     | Tikrina                                                                                                                                                                                        | Blokuojantis             |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `check:docs-all`               | Meta-vartai, kurie nuosekliai paleidžia 6 toliau nurodytus sub-vartus                                                                                                                          | Taip                     |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt versijų suderinamumas                                                                                                                                            | Taip                     |
| ↳ `check:docs-counts`          | Skaičiai prozoje (tiekėjų skaičius, migracijų skaičius ir t. t.) neviršija realių skaičių fiksavimo (ratchet) ribos                                                                            | Taip                     |
| ↳ `check:env-doc-sync`         | Kiekvienas aplinkos kintamasis faile `.env.example` yra dokumentuotas dokumentacijos lentelėje ir atvirkščiai                                                                                  | Taip                     |
| ↳ `check:deprecated-versions`  | Dokumentacijoje nėra pasenusių versijų eilučių                                                                                                                                                 | Taip                     |
| ↳ `check:doc-links`            | Vidinės markdown nuorodos dokumentacijoje nurodo realius failus (forma `[text]`/`(path)`)                                                                                                      | Taip                     |
| ↳ `check:fabricated-docs`      | Dokumentacijoje minimi maršrutai, aplinkos kintamieji, CLI komandos, hook pavadinimai ir failų keliai egzistuoja kodų bazėje. Griežti vartai su `--strict`; švelnus nepavykimas be vėliavėlės. | Taip (per `--strict` CI) |
| `check:cli-i18n`               | CLI komandų eilutės yra visuose i18n lokalės failuose                                                                                                                                          | Taip                     |
| `check:openapi-coverage`       | OpenAPI specifikacija apima bent jau užfiksuotą minimalų realių maršrutų skaičių                                                                                                               | Taip                     |
| `check:openapi-security-tiers` | Saugumo lygio anotacijos faile `openapi.yaml` atitinka `routeGuard.ts` klasifikacijas                                                                                                          | **Rekomendacinis**       |
| `check:openapi-routes`         | Kiekvienas kelias faile `openapi.yaml` nurodo realų `route.ts` (anti-haliucinacija)                                                                                                            | Taip                     |
| `check:docs-symbols`           | Kiekviena `/api/...` nuoroda faile `docs/**/*.md` nurodo realų `route.ts` (anti-haliucinacija)                                                                                                 | Taip                     |
| `i18n translation drift`       | Neišversti raktai i18n lokalės failuose — tik įspėjimas                                                                                                                                        | **Rekomendacinis**       |

Dvylika README SVG failų kataloge `docs/diagrams/` yra sugeneruoti (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` iš naujo sugeneruoja juos visus). Kiekvienas turi baitų palyginimo unit testą
(`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`), kuris nepavyksta, kai įtrauktas failas yra
pasenęs, o `check:docs-counts` skaito kanoninius skaičius iš jų `<text>` mazgų — todėl skaičiai niekada
nėra paverčiami kontūrais į kelius. SVG kanoninių skaičių patikra skaito failus, išvardytus
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, taip pat `public/images/tier-flow-dark.svg` ir `tier-flow-light.svg`; teiginiai apie
„amžinai nemokama“, katalogo įrašą, pasikartojantį fondą ir vertinimo faktorius taip pat skaito
`promise-pillars.svg`, `free-tier-budget.svg` ir `strategies-grid.svg`. `free-tier-budget.svg`
ima savo skaičius iš gyvo katalogo įkroviklio, todėl pakeitimas `FREE_MODEL_BUDGETS` arba tiekėjo
rodomajame pavadinime raudonai pažymi CI, kol tas failas nebus iš naujo sugeneruotas.

### Užduotis: `i18n-ui-coverage`

| Scenarijus                        | Tikrina                                                                                                                                                                                                                   | Blokuojantis       |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `check-ui-keys-coverage` (inline) | UI i18n raktų padengimas yra ≥ 65 %                                                                                                                                                                                       | Taip               |
| `check-ui-value-drift` (inline)   | Perrašyta anglų **reikšmė** nepalieka pasenusio vertimo                                                                                                                                                                   | Taip               |
| `check-new-key-coverage` (inline) | **Naujas** anglų raktas yra išverstas visose lokalėse — `__MISSING__:` žymeklis atmetamas                                                                                                                                 | Taip               |
| `check-translation-ratio`         | Tikrų vertimų santykis kiekvienoje lokalėje (identiški anglų kalbai / vietos rezervavimo ženklai / trūkstami lapai už leidžiamųjų sąrašo ribų) neturi viršyti `config/quality/i18n-translation-baseline.json` + paklaidos | **Rekomendacinis** |

Reikia `fetch-depth: 0` — reikšmių nuokrypio vartai lygina `en.json` su sujungimo baze.

#### `check-ui-value-drift` — pasenusių vertimų vartai

Pagauna tą vieną i18n regresiją, kurios kiti vartai struktūriškai negali pamatyti: angliška reikšmė perrašoma, o iš _ankstesnės_ anglų kalbos išvesti vertimai lieka, todėl ne anglų kalbos vartotojai toliau skaito užtikrintai suformuluotą, bet dabar neteisingą tekstą.

Tai įvyko iš tikrųjų. `oauthModal.googleOAuthWarning` buvo perrašytas, kai atsirado Antigravity prisijungimo pagalbininkas (#5203); **39 iš 43 kalbų** išlaikė tekstą, nurodantį operatoriams „nukopijuoti visą URL ir įklijuoti jį žemiau" — srautas, kuris negali būti užbaigtas su tuo teikėju. Tai liko nepastebėta iki #8463, nes:

- `sync-ui-keys` tik užpildo raktus, kurių **nėra**, bet niekada tų, kurie yra **pasenę**;
- `check-ui-keys-coverage` skaičiuoja raktų _buvimą_, todėl pasenęs vertimas įskaitomas kaip padengtas;
- `check-translation-drift` seka `docs/i18n/<locale>/**.md` dokumentacijos kopijas — jis niekada neskaito `src/i18n/messages/*.json`. Blokuojama užduotyje `docs-sync-strict` nuo 2026-09 pakartotinio sinchronizavimo: redaguokite pagrindinį dokumentą → `npm run i18n:run -- --files=<doc>` (skyriaus lygmuo, pigiai).

**Difų suvokimas, ne pagrįstas bazinėmis versijomis.** Jis lygina `en.json` sujungimo bazėje su darbo medžiu; kiekvienam raktui, kurio angliška reikšmė pasikeitė, bet kuri kalba, vis dar laikanti nepaliestą vertimą, yra pasenusi. Tai sąmoningai **užšaldo jau esamą skolą** — difas negali atskleisti, iš kokios senos anglų kalbos kilo ilgai gyvavęs vertimas, todėl vartai vertina tik tai, ką paliečia dabartinis pakeitimas. Alternatyva (kiekvieno rakto maišos pagrindinė versija) kainuotų ~600 KB sugeneruotą failą, 3× didesnį už didžiausią esamą pagrindinę versiją, ir kaskart būtų perrašinėjama kiekviename i18n PR.

Du būdai jį patenkinti:

1. atnaujinkite paveiktus vertimus, arba
2. nustatykite juos į `__MISSING__:<new english>` — tada vykdymo aplinka pateikia pataisytą anglų kalbą (`src/i18n/request.ts::deepMergeFallback`, #7258), ir raktas patenka į vertimo eilę.

Jei eilutės **prasmė** pasikeitė, pirmenybę teikite **rakto pervadinimui**: naujas raktas negali paveldėti pasenusio vertimo. Tai modelis, kurį naudojo #8463.

```bash
npm run i18n:check-value-drift          # griežtas (ką vykdo CI)
npm run i18n:check-value-drift:warn     # tik ataskaita
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Išeina su 0 ir `SKIP reason=base-unresolved`, kai bazinio katalogo negalima nuskaityti (sekli klonas be bazinio ref), atspindint `check-openapi-breaking`.

### Užduotis: `i18n`

Pilna i18n validavimo matrica (po vieną užduotį kiekvienai kalbai). Visa užduotis yra patariamoji.

| Skriptas                        | Validuoja                           | Blokuojama                                                  |
| ------------------------------- | ----------------------------------- | ----------------------------------------------------------- |
| `validate_translation.py quick` | Vertimo išsamumas kiekvienai kalbai | **Patariamoji** (`continue-on-error: true` visai užduočiai) |

### Užduotis: `pr-test-policy`

Vykdoma tik pull request'ams.

| Skriptas               | Validuoja                                                                                                                               | Blokuojama |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PR, keičiantys produkcinį kodą `src/`, `open-sse/`, `electron/` arba `bin/`, turi įtraukti arba atnaujinti testus (Kietoji taisyklė #8) | Taip       |
| `check:test-masking`   | Pakeisti testų failai nesumažina grynojo assert kiekio ir neprideda `assert.ok(true)` tautologijų                                       | Taip       |
| `check:pr-evidence`    | PR aprašas nurodo testo/VPS įrodymus pakeitimui (mechanizuoja Kietąją taisyklę #18, grep'uodamas PR prozą — trapūs, žr. Backlog)        | Taip       |

### Užduotis: `test-vitest`

Vykdoma po `build`. Blokuoja sujungimą, jei nepavyksta.

| Rinkinys         | Validuoja                                                        | Blokuojama                                                                                                             |
| ---------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP serveris (110 įrankių), autoCombo, podėlis — vitest vykdyklė | Taip                                                                                                                   |
| `test:vitest:ui` | UI komponentų testai — vitest vykdyklė                           | **Blokuojama** — jau esantys nepavykimai yra aiškiai pašalinti `vitest.config.ts`; nauji nepavykimai sugriauna užduotį |

### Naktiniai darbo srautai (pagal tvarkaraštį, patariamieji)

Jie vykdomi pagal cron tvarkaraštį (ir `workflow_dispatch`), niekada PR'uose. Visi yra patariamieji.

| Darbo eiga             | Tikrina                                                                                                                                                                     | Blokuojanti     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | fast-check savybių testai su atsitiktine sėkla + dideliu paleidimų skaičiumi                                                                                                | **Patariamoji** |
| `nightly-resilience`   | heap-growth kontrolinis slenkstis, chaos gedimų injekcija, k6 apkrovos / ištvermės testai                                                                                   | **Patariamoji** |
| `nightly-llm-security` | promptfoo injekcijų apsauga (blokavimo režimas) + garak zondai (praleidžiami be teikėjo slaptojo rakto)                                                                     | **Patariamoji** |
| `nightly-schemathesis` | OpenAPI sutarties fuzzing (schemathesis) prie gyvo OmniRoute naudojant `docs/openapi.yaml` — atskleidžia specifikacijos pažeidimus / neapdorotus 500 atsakymus (8 fazė B.4) | **Patariamoji** |
| `nightly-mutation`     | Stryker mutacijų testavimo balas greitoje vienetų linijoje — išlikę mutantai atskleidžia silpnus patvirtinimus                                                              | **Patariamoji** |
| `nightly-compat`       | Node variklio suderinamumo matrica pagal palaikomus `engines.node` diapazonus                                                                                               | **Patariamoji** |

Našumo bazinės linijos (heap, TTFB, kūrimo laikas) įrašomos, bet nėra privalomai tikrinamos: žr. [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
