# Quality Gates Reference (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Wannan takarda ita ce madogara mafi inganci ga dukkan ƙofofin ingancin CI a OmniRoute.
Tana bayyana kowace ƙofa, abin da take tantancewa, aikin CI da take gudana a cikinsa, ko tana amfani da
ma’aunin ratchet ko tsarin wucewa/faɗuwa, da kuma ko tana hana ginin ci gaba ko kuwa shawara ce kawai.

Don taƙaitaccen bayani da tsarin allowlist, duba sashen "Quality Gates & Ratchets"
a cikin `AGENTS.md`. Don nazari mai zurfi, rarrabuwar matakin balaga, da tsarin
maimaitawa wanda bai dogara da takamaiman kayan aiki ba na wannan tsarin, duba
[Jagorar Ƙofofin Inganci](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Jerin gate da bayanan martabar aiwatarwa

### Karɓar ɗan takara

Workflows na CI da Quality Gates kowannensu yana fitar da tabbataccen hukunci: `Gate / CI` da
`Gate / Quality`. Manufar karɓarsu mai sigar lamba tana lissafa kowane job na upstream
a matsayin wajibi ko na shawara. Dole ne job ɗin da ya dace kuma yake wajibi ya yi nasara: sakamakon da
ya ɓace, aka soke, aka tsallake, yake jira ko ba a san shi ba ba zai iya tabbatar da PASS ba. Ingantaccen
rarrabawa na docs-kawai ko catalog-kawai zai iya sa lane na lamba bai dace ba;
ba a karɓar draft PR a matsayin ɗan takara. Lakabin `hotfix` ba ya kawar da buƙatar shaida.

Dukkan workflows ɗin suna rufe PRs zuwa rassan main/release, pushes zuwa `main`, manual dispatch
da kuma abubuwan merge-group. Push, dispatch da merge-group suna gudanar da cikakken zaɓi. Pushes zuwa
`release/**` ba sa fara su (2026-10-18): kowane canji ya riga ya gudanar da matrix a kan PR ɗinsa
kuma haɗin da aka merge aikin Release-Green ne (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks
da merge groups suna amfani da hosted runners ga jobs waɗanda in ba haka ba za su zaɓi self-hosted
runners; dole ne a tabbatar da isasshen ƙarfin hosted kafin rollout.

Kowane rasidin JSON yana bayyana SHA da aka checked out, workflow run da attempt.
CLI yana ƙin rashin daidaituwar SHA na checkout/event. Gwaje-gwajen workflow suna ɗaure kasancewar policy
da jerin `needs` na job ɗin hukunci don kada sabon lane ko wanda aka cire ya ɓace ba tare da an lura ba.
Rasidan suna rufe workflow nasu ne kawai, ba publication, deployment, ko abubuwan cikin
wani advisory scanner da ke akwai ba. Kunna sunayen checks guda biyu a cikin ƙa'idodin branch
wani canjin gudanarwa ne daban; ƙara waɗannan jobs ba ya kare branch da kansa.

### Jerin static scan

Jerin npm-alias mai sigar lamba da kasancewar static-scan suna cikin
`config/quality/gate-manifest.json`. Gudanar da `npm run check:gate-manifest` don tabbatar da
sunayen scripts da ainihin commands bisa `package.json`; ƙari, cirewa da
sauyin command suna sa local hook da jobs na rarraba canji a CI su gaza.
Alias ba workflow job ba ne, ba matrix instance ba ne, kuma ba test case ba ne: bai kamata
a gabatar da waɗannan ƙididdiga kamar suna musaya da juna ba.

Yi amfani da `npm run quality:scan -- --list` ko `npm run quality:scan:fast -- --list`
don bincika aliases da aka zaɓa ba tare da gudanar da su ba. Runner yana kiran
npm entrypoint, don haka ana kiyaye runtime ɗinsa (har da Bun inda aka saita shi).
Manifest yana rubuta aliases da ke wajen waɗannan profiles a matsayin waɗanda ake kira daban,
kuma an hana maintenance commands a cikin read-only scan profiles.

Waɗannan profiles suna rufe static scan kawai. Ba sa tabbatar da product tests,
coverage, packaging, external checks ko cikakken karɓar release na ɗan takara.
Karɓar workflow yana amfani da `config/quality/admission-policy.json` da aka haɗa da
`scripts/quality/admission-verdict.mjs`. Profiles na release-observer suna ci gaba da kasancewa daban;
bincika checks da receipts ɗinsu da suka dace daban-daban. Jerin bayanin
da ke ƙasa ishara ce, ba hujjar cewa an gudanar da gate a zahiri ba.

Scripts suna ƙarƙashin `scripts/check/` (policy gates) da `scripts/quality/` (ratchet engine).
Tushen gaskiyar CI shi ne `.github/workflows/ci.yml`.

### Hanya mai sauri ta Release PR (`quality.yml`)

`.github/workflows/quality.yml` yana cika CI a kan PRs na main/release, pushes zuwa `main`,
dispatch da merge groups. PRs suna amfani da fast checks da aka tace bisa path. An cire
duplicate build da aka kashe dindindin; ainihin checks na build/package/boot suna nan a CI.

| Job                                              | Iyaka                                                                                                                                                                                                                                     | Mai toshewa      |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `Docs Gates (fast-path)`                         | PRs na docs/lamba; nassoshin API docs da docs-all                                                                                                                                                                                         | Ee               |
| `Fast Quality Gates`                             | PRs na lamba; static checks, typecheck, dashboard typecheck, da impacted unit tests                                                                                                                                                       | Ee               |
| `Forgotten sibling tests`                        | PRs na lamba; ana bin diddigin modules da suka canza zuwa static consumers da candidate sibling tests; ana bayar da rahoton paths na barrel da dynamic-import a matsayin advisory diagnostics, tare da keɓancewar allowlist da aka ambata | **Na shawara**   |
| `Vitest (fast-path)`                             | PRs na lamba; fast vitest suite                                                                                                                                                                                                           | Ee               |
| `Unit Tests fast-path`                           | PRs na lamba; 4-shard unit suite                                                                                                                                                                                                          | Ee               |
| `No new ESLint warnings`                         | PRs na lamba; lint guard mai la'akari da suppressions                                                                                                                                                                                     | Ee, har da forks |
| `Merge integrity (changelog + generated skills)` | PRs da ba draft ba; changelog da daidaitawar generated skill                                                                                                                                                                              | Ee, har da forks |

#### Rahoton forgotten sibling tests

`npm run check:forgotten-sibling-tests` yana sake amfani da mai warware import da ke bayan taswirar tasirin gwaji.
Ga kowane module na production da aka canza, yana bayar da rahoton sarƙoƙin da ke da tabbataccen sakamako na
`changed module/symbol -> static consumer -> candidate sibling test` idan gwajin da ake nema
ba ya cikin diff na pull request. Ana adana taƙaitaccen bayanin Markdown da sakamakon JSON a matsayin
artifact na workflow na `forgotten-sibling-tests` domin daidaitawa kafin duk wani ƙaddamarwa mai hanawa.

Sake-fitarwar barrel da dynamic imports bayanan gano matsalar resolution ne kawai; ba sa taɓa haifar da
sakamakon bincike mai hanawa. Keɓance-keɓancen da aka duba suna cikin
`config/quality/forgotten-sibling-allowlist.json`. Dole ne kowace shigarwa ta ambaci consumer da gwajin
da ake nema, ta bayar da takamaiman dalili, sannan ta haɗa hanyar zuwa GitHub issue ko pull request. Shigarwar da
ba ta da ingantaccen tsari tana haifar da gazawa cikin yanayin rufewa. Keɓance-keɓance ba za su iya ɓoye gwajin da ake nema da aka goge ko diff da ya ƙara `.skip`/`.todo` ba;
raunana assertion da sauran hanyoyin ɓoyewa suna ƙarƙashin gate mai zaman kansa kuma mai hanawa na
`check:test-masking`.

### Aiki: `lint`

Yana gudana a kan kowane PR zuwa `main`. Yana hana haɗewa idan ya gaza.

| Skrif (`npm run ...`)             | Abin da yake tantancewa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Mai toshewa                                |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Sigar Node.js tana cikin zangon da ake tallafawa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Eh                                         |
| `check:cycles`                    | Shigo da abubuwa masu madauwari a dukkan `src/` + `open-sse/` (bisa AST, an warware `paths` na tsconfig). Gudanarwar kai tsaye tana fita da 1 a duk lokacin da akwai kowace madauwari (gazawa-rufe tun daga #15281) kuma tana jera SCCs. `check:cycles:ratchet` (abin da CI ke gudanarwa) yana toshewa idan adadin ya wuce iyakar `metrics.cycles` a cikin `quality-baseline.json` — a halin yanzu 14, `direction: down`, don haka zai iya raguwa kawai (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Eh (ratchet)                               |
| `check:boundary`                  | Haɗin `open-sse → src`: shigo da abubuwa na musamman daga fayil zuwa fayil daga injin zuwa ƙa'idar (`scripts/quality/measure-boundary.mjs`; jerin alaƙoƙin shi ne jerin ayyukan gyaran v4 core/module-split). Gudanarwar kai tsaye = rahoton shawara (daidai da `quality:boundary`). `check:boundary:ratchet` (abin da CI ke gudanarwa, wanda kuma yake cikin madauwar ratchet ta fast-gates a `quality.yml`) yana toshewa idan adadin ya wuce iyakar `metrics.boundaryOpenSseToSrc` a cikin `quality-baseline.json` — an fara shi da adadin 771 da aka auna, `direction: down`; `--update` yana rage shi kawai; yana danganta da tushe a kan PRs (`--base-ref`, duba ƙasa)                                                                                                                                                                                                                                                                                                                                                        | Eh (ratchet)                               |
| `check:route-validation:t06`      | Akwai tsare-tsaren Zod a kan dukkan hanyoyi (manufar Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Eh                                         |
| `check:any-budget:t11`            | Adadin `@ts-expect-error // any` bai wuce kasafi ba (Ƙofa ta Mataki na 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ee                                         |
| `check:provider-consistency`      | Kowane mai samarwa a cikin `providers.ts` yana da shigarwa da ta dace a cikin `providerRegistry.ts` (haka kuma akasin haka, a cikin jerin abubuwan da aka amince da su)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ee                                         |
| `check:model-lifecycle`           | Teburan jagorantar buƙatu guda uku da ake kula da su da hannu suna ci gaba da daidaituwa da hoton matsayin zagayowar rayuwa da aka adana (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ba ya ba wa duk wani tsohon id da `REGISTRY` zai iya jagoranta maki; kowace manufa ta `BUILT_IN_ALIASES` tana cikin `REGISTRY` kuma ba ta cikin hoton tsofaffin id; kowane tsohon id da har yanzu yake cikin `REGISTRY` ana tura shi gaba ko kuma an jera shi a cikin `allowedRetiredInCatalog`; kuma babu tushen ko manufar `DEFAULT_DEGRADATION_MAP` da ta bayyana a matsayin tsohuwa a wannan hoton. Wannan ba ya tabbatar da cewa a halin yanzu wata hanyar sama mai aiki tana ba da samfurin. Ba tare da intanet ba — yana kwatantawa da `config/quality/model-lifecycle.json`, wanda ake sabunta shi da hannu ta hanyar `npm run quality:refresh-model-lifecycle` (yana buƙatar hanyar sadarwa; ba a haɗa shi da CI ba). `allowedRetiredInCatalog` makulli ne na ragewa a hankali: a ƙara shigarwa ne kawai tare da batun bin diddigi. | Ee                                         |
| `check:fetch-targets`             | Kowane `fetch("/api/...")` a cikin `src/` na ɓangaren abokin ciniki yana komawa zuwa ainihin `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ee                                         |
| `check:deps`                      | Duk dogaro da za a iya girkawa ta `npm install` a cikin kowane `package.json` da ke ma'ajiyar suna cikin `dependency-allowlist.json`; ana nuna sabbin fakitoci marasa tsayayyen sigar ko waɗanda aka sanya sunansu don ruɗarwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ee                                         |
| `audit:deps`                      | `npm audit` (tushe + electron) — babu gargaɗin tsaro masu girma/masu matuƙar haɗari (ya yi karo da osv `check:vuln-ratchet`; duba Tarin Ayyukan Bayar da Dalilai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ee                                         |
| `check:lockfile`                  | Mutuncin `package-lock.json` — ma'ajiyar https, hashes na mutunci, babu sauya-rubutun mai masauki                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ee                                         |
| `check:licenses`                  | Jerin lasisin SPDX da aka amince da su don abubuwan dogaro na samarwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ee                                         |
| `check:tracked-artifacts`         | Babu kayan gini / symlinks na `node_modules` da aka commit (yana kuma gudana a husky pre-commit; an bar pre-push da sauƙi da gangan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ee                                         |
| `check:ai-attribution`            | Babu trailer na AI/bot `Co-Authored-By` ko bayanin ƙasan samarwar AI a cikin commits, take ko jikin PR — Tsayayyar Doka #16 (a cikin zagayen fast-gates na `quality.yml` don PR→`release/**` — yana karanta event payload, ba ya yin komai idan ba PR ba — da kuma matakin PR-kawai a lint na `ci.yml` don PR→`main`; haka kuma hook ɗin husky `commit-msg`; an yarda da marubuta-tare na mutane; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:vitest-exclusions`         | Kowane keɓewar Vitest yana ambaton batun sa ido kuma yana bayyana a cikin `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ee                                         |
| `check:file-size`                 | Fayilolin tushe (`.ts`/`.tsx` a cikin `src/`, `open-sse/`, `electron/`, `bin/`) su kasance cikin `cap`, sannan fayilolin gwaji (`*.test.ts(x)`) su kasance cikin `testCap`; fayilolin da aka daskarar a cikin `file-size-baseline.json` (`frozen` / `testFrozen`) kada su ƙaru fiye da girman da aka rubuta musu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ee                                         |
| `check:error-helper`              | Amsoshin kuskure a cikin masu aiwatarwa/masu sarrafawa suna amfani da `buildErrorBody()` / `sanitizeErrorMessage()` (Ƙa'ida Mai Tsauri #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ee                                         |
| `check:migration-numbering`       | Fayilolin SQL na ƙaura suna da lambobi masu jere, ba tare da tazara ko maimaitawa ba                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ee                                         |
| `check:public-creds`              | Babu ƙimar OAuth `client_id`/`client_secret` ko maɓallan Firebase Web a wajen `publicCreds.ts` (Ƙa'ida Mai Tsauri #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ee                                         |
| `check:db-rules`                  | Babu ɗanyen SQL a wajen sassan `src/lib/db/`; babu shigo da barrel daga `localDb.ts` (Ƙa'idoji Masu Tsauri #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ee                                         |
| `check:known-symbols`             | Masu aiwatar da masu samarwa, dabarun turawa, da masu fassara da aka yi wa rajista a cikin teburan aikawa sun dace da fayilolin da ke kan faifai — babu alamomin da ba su da alaƙa ko waɗanda ba a ayyana ba                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ee                                         |
| `check:route-guard-membership`    | Kowace hanya da ke ƙaddamar da ƙaramin tsari an rarraba ta ta hanyar `isLocalOnlyPath()` (Ƙa'idoji Masu Tsauri #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ee                                         |
| `check:test-discovery`            | Kowane fayil na `*.test.ts` / `*.spec.ts` a cikin repo yana kasancewa aƙalla mai gudanar da gwaji guda ɗaya ya tattara shi (ratchet: jerin fayilolin marayu a cikin `test-discovery-baseline.json` zai iya raguwa kawai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ee                                         |
| `check:test-tla-order`            | Babu fayil na `node:test` a ƙarƙashin `tests/unit` da zai yi rajistar gwaji, ya ci karo da `await` na matakin sama, sannan ya sake yin rajistar ƙarin gwaje-gwaje (#18045; ratchet: `test-tla-order-allowlist.json` zai iya raguwa kawai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ee                                         |
| `check:agent-skills-sync`         | Abubuwan agent-skills da aka samar sun yi daidai da kundin tushensu (babu karkacewa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:provider-asset-provenance` | Tambura/kadarorin masu samarwa suna ɗauke da shigarwar asali da aka rubuta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `lint:json`                       | Ana iya tantance fayilolin saitin JSON kuma suna bin ƙa’idojin lint na repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `typecheck:core`                  | Harhaɗa TypeScript ba tare da kurakurai ba (gargaɗin shawara kawai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ee                                         |
| `typecheck:noimplicit:core`       | Tsauraran `noImplicitAny` — domin gaba; wuraren kira da yawa da suka riga suka kasance har yanzu suna buƙatar bayanin nau’i                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **Na shawara** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` da aka iyakance zuwa `src/app/(dashboard)/**` (#7033) — zaɓaɓɓen jerin fayiloli 27 na `typecheck:core` bai haɗa da kowane dashboard TSX ba, sannan `next build` ma ba ya taɓa bincika nau'insa (`next.config.mjs` yana saita `ignoreBuildErrors: true`), don haka koma-bayan masu gano abubuwa marasa tushe a can (#6625/#6909) ba sa bayyana ga CI. Yana kwatanta canje-canje da daskararren ma'aunin asali na ƙididdiga ga kowane fayil/kowane TS-code (`config/quality/dashboard-typecheck-baseline.json`, irin tsarin tilasta tsohon ma'auni ɗaya da `check:known-symbols`) — kurakuran SABO kawai da suka wuce adadin da ke cikin ma'aunin asali ne ke sa ƙofar ta gaza; rage ma'aunin a hankali da `--update` idan an gyara kuskuren da ya riga ya kasance.                                                                                                                                                                                                                                                            | Ee                                         |

### Aiki: `quality-gate`

Yana gudana bayan `test-coverage`. Yana hana haɗawa idan ya gaza.

| Script                       | Abin da yake tantancewa                                                                                                                                                                                              | Mai toshewa                    |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `quality:collect`            | Yana fitar da `quality-metrics.json` (adadin gargaɗin ESLint, ɗaukar gwaji daga rahoton shard da aka haɗa)                                                                                                           | Ee (yana gaban tsarin matsewa) |
| `quality:ratchet`            | Kowane ma'auni a `quality-baseline.json` bai koma baya ba (gargaɗin ESLint ≤ ma'aunin asali; ɗaukar gwaji ≥ ma'aunin asali)                                                                                          | Ee                             |
| `check:duplication`          | Maimaituwar lamba (jscpd@4) ba ta wuce ma'aunin asali a `quality-baseline.json` ba                                                                                                                                   | Ee                             |
| `check:complexity`           | Rikitacciyar cyclomatic a matakin fayil ba ta wuce iyakar da aka sa ba (ainihin dokokin ESLint `complexity` + `max-lines-per-function`)                                                                              | Ee                             |
| `check:cognitive-complexity` | Tsarin matse rikitacciyar fahimta (`eslint-plugin-sonarjs`) — zagayen ESLint na daban; CI yana gudanar da dukansu a haɗe a matsayin mataki guda na `check:complexity-ratchets`                                       | Ee                             |
| `check:dead-code`            | Tsarin matse exports / fayilolin da ba a amfani da su (knip) bai koma baya idan aka kwatanta da ma'aunin asali ba                                                                                                    | Ee                             |
| `check:compression-budget`   | Kasafin gwajin matsawa — mafi ƙarancin adadin tanadin token ga kowane engine dole ne kada ya koma baya                                                                                                               | Ee                             |
| `check:type-coverage`        | Tsarin matse kaso na abubuwan da aka ayyana nau'insu (`type-coverage`) bai koma baya ba; galibi yana maye gurbin `typecheck:noimplicit:core`                                                                         | Ee                             |
| `check:codeql-ratchet`       | Adadin faɗakarwar CodeQL da ke buɗe bai koma baya ba (yana karantawa ta `gh api`; yana tsallakewa cikin lumana ba tare da token ba) — don jadawalin sabuntawa da kunnawa da hannu: duba "Tsarin matse CodeQL" a ƙasa | Ee                             |

### Aiki: `quality-extended`

Dukkan aikin na shawarwari ne (`continue-on-error: true`). Tsarukan matsewa masu amfani da npm suna gudana
da gaske; na'urorin bincike na waje suna shigarwa ta `gh release download` kuma su tsallake kansu (exit 0)
idan har yanzu binary ɗin ba ya nan.

| Script                   | Abin da yake tantancewa                                                                                                                                                                                                                                       | Mai toshewa                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `check:circular-deps`    | Babu dogaro mai zagaye (dpdm)                                                                                                                                                                                                                                 | **Na shawara**                                               |
| `check:bundle-size`      | Girman bundle bai wuce iyakar da aka sa ba                                                                                                                                                                                                                    | **Na shawara**                                               |
| `check:secrets`          | Binciken sirrika (gitleaks) — yana tsallakewa idan binary ba ya nan                                                                                                                                                                                           | **Na shawara**                                               |
| `check:vuln-ratchet`     | Raunukan tsaro na dependencies (osv-scanner) ba su koma baya ba — yana tsallakewa idan binary ba ya nan                                                                                                                                                       | **Na shawara**                                               |
| `check:workflows`        | Lint na workflow (actionlint + zizmor); scanners da suka ɓace/lalace, rahotanni marasa inganci ko rashin ma'aunin asalin tsarin matsewa suna haifar da gazawar INCOMPLETE. Sakamakon bincike masu inganci suna bin tsarin strict/advisory/ratchet da aka zaɓa | Ana buƙatar aiwatarwa; tsarin matse zizmor yana toshewa a CI |
| `check:openapi-breaking` | Canje-canjen da ke karya kwangilar API ta jama'a (`openapi.yaml`) idan aka kwatanta da reshen asali (oasdiff) — yana fitar da `openapiBreaking=N`; yana tsallakewa idan oasdiff ba ya nan ko ba za a iya warware ƙayyadaddun bayanan asali ba                 | **Na shawara**                                               |

### Aiki: `docs-sync-strict`

Yana gudana a kowane PR zuwa `main`. Yana hana haɗawa idan ya gaza.

| Script                         | Abin da yake ingantawa                                                                                                                                                                           | Mai toshewa                    |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------ |
| `check:docs-all`               | Babbar ƙofa da ke gudanar da ƙananan ƙofofi 6 da ke ƙasa ɗaya bayan ɗaya                                                                                                                         | Eh                             |
| ↳ `check:docs-sync`            | Daidaiton sigar CHANGELOG / OpenAPI / llm.txt                                                                                                                                                    | Eh                             |
| ↳ `check:docs-counts`          | Ƙididdiga a cikin rubutu (adadin masu samarwa, adadin ƙaura, da sauransu) suna cikin zangon ratchet na ainihin ƙididdigar                                                                        | Eh                             |
| ↳ `check:env-doc-sync`         | Kowane env var a cikin `.env.example` yana da bayaninsa a teburin takardu, haka kuma akasin haka                                                                                                 | Eh                             |
| ↳ `check:deprecated-versions`  | Babu tsoffin kirtanin siga da aka daina amfani da su a cikin takardu                                                                                                                             | Eh                             |
| ↳ `check:doc-links`            | Haɗin markdown na ciki a cikin takardu suna kaiwa ga fayiloli na gaske (tsarin `[text]`/`(path)`)                                                                                                | Eh                             |
| ↳ `check:fabricated-docs`      | Routes, env vars, umarnin CLI, sunayen hook, da hanyoyin fayil da aka ambata a takardu suna nan a cikin codebase. Ƙofa mai tsauri ta hanyar `--strict`; gazawa mai laushi idan babu wannan flag. | Eh (ta hanyar `--strict` a CI) |
| `check:cli-i18n`               | Kirtanin umarnin CLI suna nan a duk fayilolin locale na i18n                                                                                                                                     | Eh                             |
| `check:openapi-coverage`       | Bayanin OpenAPI ya ƙunshi aƙalla mafi ƙarancin adadin routes na gaske da aka ratchet                                                                                                             | Eh                             |
| `check:openapi-security-tiers` | Bayanan matakan tsaro a cikin `openapi.yaml` sun yi daidai da rabe-raben `routeGuard.ts`                                                                                                         | **Na shawara**                 |
| `check:openapi-routes`         | Kowace path a cikin `openapi.yaml` tana kaiwa ga ainihin `route.ts` (hana ƙirƙirar bayanan ƙarya)                                                                                                | Eh                             |
| `check:docs-symbols`           | Kowace manuniya ta `/api/...` a cikin `docs/**/*.md` tana kaiwa ga ainihin `route.ts` (hana ƙirƙirar bayanan ƙarya)                                                                              | Eh                             |
| `i18n translation drift`       | Maɓallan da ba a fassara ba a cikin fayilolin locale na i18n — gargadi kawai                                                                                                                     | **Na shawara**                 |

### Aiki: `i18n-ui-coverage`

| Script                            | Abin da yake ingantawa                                                                                                                                                                                | Mai toshewa    |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (a ciki) | Rufin maɓallan i18n na UI ya kai ≥ 65%                                                                                                                                                                | Eh             |
| `check-ui-value-drift` (a ciki)   | Sake rubuta **ƙimar** Turanci ba ya barin tsohuwar fassara a baya                                                                                                                                     | Eh             |
| `check-new-key-coverage` (a ciki) | An fassara **sabon** maɓallin Turanci a kowane locale — ana ƙin alamar `__MISSING__:`                                                                                                                 | Eh             |
| `check-translation-ratio`         | Rabon ainihin fassara ga kowane locale (waɗanda suka yi daidai da Turanci / placeholder / waɗanda suka ɓace a wajen allowlist) ba zai wuce `config/quality/i18n-translation-baseline.json` + slack ba | **Na shawara** |

Yana buƙatar `fetch-depth: 0` — ƙofar value-drift tana kwatanta bambancin `en.json` da merge base.

#### `check-ui-value-drift` — ƙofar tsohuwar fassara

Tana gano matsalar koma-bayan i18n guda ɗaya da sauran ƙofofin ba za su iya gani ta tsarin su ba: an sake rubuta ƙimar Turanci
amma fassarorin da aka samo daga Turancin _da ya gabata_ sun kasance, don haka
masu amfani da ba Turanci ba suna ci gaba da karanta rubutu mai nuna tabbaci amma wanda yanzu ba daidai ba ne.

Wannan ya taɓa shiga sigar da aka fitar da gaske. An sake rubuta `oauthModal.googleOAuthWarning` lokacin da aka
ƙaddamar da mataimakin shiga na Antigravity (#5203); **39 daga cikin locales 43** sun ci gaba da nuna rubutun da ke gaya wa masu gudanarwa su “kwafi
cikakken URL sannan su manna shi a ƙasa” — tsarin da ba zai iya kammala aiki ga wannan provider ba. Ba a
lura da shi ba har sai #8463 saboda:

- `sync-ui-keys` yana cike maɓallan da **ba su nan** kawai, ba waɗanda suka zama **tsofaffi** ba;
- `check-ui-keys-coverage` yana ƙirga _kasancewar_ maɓalli, don haka tsohuwar fassara tana samun maki a matsayin wadda aka rufe;
- `check-translation-drift` yana bibiyar madubin takardu na `docs/i18n/<locale>/**.md` —
  ba ya taɓa karanta `src/i18n/messages/*.json`. Yana toshewa a aikin `docs-sync-strict` tun bayan
  sake daidaitawar 2026-09: gyara babban takarda → `npm run i18n:run -- --files=<doc>` (a matakin sashe, mai sauƙi).

**Yana la’akari da diff, ba ya dogara da baseline.** Yana kwatanta `en.json` a merge base da
working tree; ga kowane key da darajar Turancinsa ta canza, duk locale da har yanzu yake ɗauke da
fassarar da ba a taɓa ba, ta zama tsohuwa. Wannan da gangan yake **daskarar da bashin da ya riga ya wanzu** — diff
ba zai iya nuna daga wane tsohon Turanci aka samo fassarar da ta daɗe ba, don haka gate ɗin yana tantance
abin da canjin yanzu ya taɓa kawai. Madadin haka (baseline na hash ga kowane key) zai buƙaci
generated file mai ~600 KB, wanda ya ninka mafi girman baseline da ake da shi sau 3, kuma yana canzawa a kowane i18n PR.

Akwai hanyoyi biyu na cika wannan sharadi:

1. sabunta fassarorin da abin ya shafa, ko
2. saita su zuwa `__MISSING__:<new english>` — runtime zai gabatar da ingantaccen Turancin
   (`src/i18n/request.ts::deepMergeFallback`, #7258), sannan key ɗin ya shiga jerin jiran fassara.

Idan **ma’anar** string ɗin ta canza, fi son **sake sanya wa key suna**: sabon key ba zai iya gādon
tsohuwar fassara ba. Wannan shi ne tsarin da #8463 ya yi amfani da shi.

```bash
npm run i18n:check-value-drift          # tsaurara (abin da CI ke gudanarwa)
npm run i18n:check-value-drift:warn     # rahoto kawai
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Yana fita da 0 tare da `SKIP reason=base-unresolved` idan ba za a iya karanta base catalog ba (shallow
clone ba tare da base ref ba), daidai da halayen `check-openapi-breaking`.

### Job: `i18n`

Cikakken matrix na tabbatar da i18n (job ɗaya ga kowane locale). Dukkan job ɗin shawara ne kawai.

| Script                          | Abin da yake tabbatarwa        | Hana haɗawa                                                     |
| ------------------------------- | ------------------------------ | --------------------------------------------------------------- |
| `validate_translation.py quick` | Cikar fassara ga kowane locale | **Na shawara** (`continue-on-error: true` a kan dukkan job ɗin) |

### Job: `pr-test-policy`

Yana gudana a kan pull requests kawai.

| Script                 | Abin da yake tabbatarwa                                                                                                                                | Hana haɗawa |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `check:pr-test-policy` | PRs da suka canza production code a cikin `src/`, `open-sse/`, `electron/`, ko `bin/` dole ne su haɗa ko su sabunta tests (Hard Rule #8)               | I           |
| `check:test-masking`   | Test files da aka canza ba sa rage jimillar assert count ko ƙara tautologies na `assert.ok(true)`                                                      | I           |
| `check:pr-evidence`    | Jikin PR yana ambaton shaidar test/VPS game da canjin (yana mayar da Hard Rule #18 aiki ta hanyar grepping rubutun PR — ba shi da ƙarfi, duba Backlog) | I           |

### Job: `test-vitest`

Yana gudana bayan `build`. Yana hana haɗawa idan ya gaza.

| Suite            | Abin da yake tabbatarwa                                  | Hana haɗawa                                                                                                                                 |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (tools 110), autoCombo, cache — vitest runner | I                                                                                                                                           |
| `test:vitest:ui` | Tests na UI components — vitest runner                   | **Yana hana haɗawa** — an ware gazawowin da suka riga suka wanzu a sarari cikin `vitest.config.ts`; sabbin gazawowi suna sa job ɗin ya gaza |

### Nightly workflows (masu jadawali, na shawara)

Waɗannan suna gudana bisa cron schedule (da `workflow_dispatch`), ba sa taɓa gudana a kan PRs. Dukkansu na shawara ne kawai.

| Workflow               | Abin da yake tabbatarwa                                                                                                                                                   | Hana haɗawa    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | fast-check property tests tare da random seed + adadi mai yawa na runs                                                                                                    | **Na shawara** |
| `nightly-resilience`   | heap-growth gate, chaos fault-injection, k6 load/soak                                                                                                                     | **Na shawara** |
| `nightly-llm-security` | promptfoo injection guard (block mode) + garak probes (ana tsallake su idan babu provider secret)                                                                         | **Na shawara** |
| `nightly-schemathesis` | OpenAPI contract fuzzing (schemathesis) a kan OmniRoute mai aiki ta amfani da `docs/openapi.yaml` — yana fito da spec violations / 500s da ba a sarrafa ba (Mataki 8 B.4) | **Na shawara** |
| `nightly-mutation`     | Stryker mutation-testing score a kan fast unit lane — mutants da suka tsira suna nuna asserts marasa ƙarfi                                                                | **Na shawara** |
| `nightly-compat`       | Node engine compatibility matrix a duk ranges na `engines.node` da ake tallafawa                                                                                          | **Na shawara** |

Ana yin rikodin performance baselines (heap, TTFB, build time), ba a sanya su a matsayin gate ba: duba [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Matakin sauri (2026-08-30 → v4.0 LTS): an sassauta kowane ma'aunin tushe da 20%

Shawarar mai aikin (2026-08-30): har zuwa rarrabawa zuwa sassa na v4.0, saurin fitarwa ya fi
muhimmanci fiye da hana bashin fasaha ƙaruwa. An sassauta kowane ma'aunin tushe na **lamba**
da 20% a zagaye guda da za a iya tantancewa, kuma an ayyana matakin a cikin
`config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Abin da ya canza                                                                                                                                                                                                               | Inda                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — ƙididdigar da ƙaranci ya fi kyau ×1.2, kaso da yawa ya fi kyau ÷1.2 (an riƙe mafi ƙarancin coverage a 60, `eslintErrors` ya ci gaba da zama 0, `eslintWarnings` 0 → 20% na daskararren adadin suppression) | `quality-baseline.json` (bayanan `_relax_velocity_2026_08_30` sun jera kowane kafin → bayan)           |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                               | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, iyakar layi ta kowane `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                     | `file-size-baseline.json`                                                                              |
| ƙididdiga na kowane fayil / kowace TS-code ×1.2                                                                                                                                                                                | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                            | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` ya zama shawara yayin da `_policy.requireTighten === false`                                                                                                                                                | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| aikin dare na `bank-ratchet-shrinks` ya tsaya (domin zai adana raguwar da aka auna kuma ya soke sararin ƙarin da aka tanada)                                                                                                   | `.github/workflows/nightly-release-green.yml`                                                          |

Jerin abubuwan da aka yarda da su (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **ba** kasafin iyaka ba ne kuma ba a taɓa su ba. Ƙofofin manufofin ci/ƙi (sirrika, dokokin SQL,
yarjejeniyar docs/env, daidaiton i18n, gwaje-gwajen unit) ba su canza ba — jan gwaji har yanzu jan gwaji ne.

**Kayan aiki**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — sassautawar
  sau ɗaya (`scripts/quality/relax-baselines.mjs`); yana ƙin sake gudana sau biyu da bayanin
  iri ɗaya.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  yana auna kowace ƙofar lamba kamar yadda CI ke yi kuma yana buga sauran sararin ƙarin na kowace ƙofa
  (`scripts/quality/baseline-headroom.mjs`). Aikin dare na `baseline-headroom` yana wallafa
  teburin a taƙaitaccen bayanin gudanawar workflow kuma yana loda rahotonsa na JSON/Markdown a matsayin
  `baseline-headroom-<run_id>`, ana adana shi na tsawon kwanaki 90. Layukan gargaɗi da na hatsari suna nuna ƙofofin
  da suke cikin 10% na iyakarsu ko kuma sun riga sun wuce ta. Duba waɗannan rahotanni a matsayin gargaɗin farko cewa
  ana cinye kasafin iyaka; bincika bayanan `_rebaseline_*` na ƙofar da ta haifar da matsalar. Aikin
  ba ya ƙirƙira ko sabunta batun dindindin kuma; #12149 yana adana tarihin rahotannin da suka gabata.

**Yanayin sabuwar lamba (Clean-as-You-Code) — tun daga 2026-08-30, hanyar gaggawa ta PR kawai**

A abubuwan da suka faru na `pull_request`, `quality.yml` yana aika `--base-ref <PR base SHA>` zuwa `check:file-size`,
`check:complexity-ratchets` da `check:dead-code`. Ga `check:complexity-ratchets` da
`check:dead-code`, ƙofar tana kwatanta HEAD da merge-base **iyakance ga fayilolin da PR
ya taɓa** (`scripts/check/newCodeMode.mjs`: ana ƙirƙirar merge-base a cikin
`git worktree` na wucin gadi, ana gudanar da ESLint/knip a can da kuma a kan HEAD, sannan ana kwatanta ƙididdigar kowane fayil):

- **mai toshewa** — PR ya ƙara keta dokokin cyclomatic/cognitive ko dead exports a fayilolin da ya canza
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` a cikin log);
- **na shawara** — jimillar gaba ɗaya idan aka kwatanta da daskararren ma'aunin tushe. Sauyin da aka gada ba zai taɓa
  mayar da PR marar laifi ja ba; ana sake daskarar da sauyin yayin daidaitawar release kuma aikin headroom yana sa ido a kansa.

`check:file-size` yana amfani da base ref bisa ƙa'idodinsa (`scripts/check/check-file-size.mjs`, #8522):
yana duba kowane fayil na source da test a cikin tree, yana karanta adadin layukan kowannensu a PR base
ta amfani da `git show`, kuma yana sa fayil ya gaza ne kawai idan ya ƙaru fiye da mafi girma tsakanin iyakar ma'auninsa na tushe
(`frozen` / `testFrozen`, ko `cap` / `testCap` ga fayil da ba ya cikin ma'aunin tushe) da girmansa na base.
Saboda haka, fayil da ya riga ya sauya a base ba zai taɓa mayar da PR marar laifi ja ba.

`check:boundary:ratchet` yana amfani da wannan ƙa’ida ga lamba guda da yake da ita
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): a abubuwan da suka shafi PR, duka
matakan tantancewa na gaggawa na `quality.yml` da aikin lint na `ci.yml` suna miƙa SHA na tushen PR, ana
auna commit na tushen daga fitarwar `git archive`, kuma PR yana gaza ne kawai idan adadin mahaɗansa na
`open-sse → src` ya zarce mafi girma tsakanin `metrics.boundaryOpenSseToSrc` da adadin da ke tushen. Ana
bayar da rahoton karkacewar tushe sama da iyaka (`karkacewar tushe da aka gada`), amma ba ta taɓa sa PR
marar laifi ya gaza ba; push → main yana ci gaba da amfani da cikakkiyar iyaka, kuma idan ba a iya gano SHA
na tushen ba, sai a koma amfani da ita tare da gargadi.

Gudanarwar `workflow_dispatch`, cikakken binciken tabbatar da release-green, da aikin headroom na dare ba su
da tushen PR, don haka suna ci gaba da amfani da kwatancen cikakke (na duniya). Coverage, duplication, da
type-coverage suna ci gaba da kasancewa na duniya a yanzu (kayan aikinsu ba sa samar da bambancin kowane
fayil cikin sauƙi) — su ne ‘yan takarar da za a yi wa irin wannan tsarin.

**Rufe wannan mataki a v4.0 (LTS = ya fi na baya tsauri, ba “komawa yadda aka saba” ba)**

1. A kan tsantsar ƙarshen `release/v4.0.0`: gudanar da `npm run quality:headroom --json` domin adanawa, sannan
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, da `--update` na kowace
   ƙofar typecheck — kowane baseline zai sauka zuwa ƙimar da aka auna.
2. Goge `_policy` daga `quality-baseline.json` (wannan yana sake kunna `--require-tighten` da ajiyar dare),
   sannan a dawo da `THRESHOLD = 36` (ko mafi girma) a cikin `check-openapi-coverage.mjs`.
3. A ƙara tsaurara fiye da ƙimar da aka auna a inda modularization ya haifar da amfani: a mayar da `cap` na
   file-size zuwa 1000 (ko 800), a ƙara wa mafi ƙarancin coverage +5, sannan dead exports su zama 0 ga
   packages da aka raba zuwa modules.

## Ma'aunin Ratchet (`quality-baseline.json`)

Injin ratchet (`scripts/quality/check-quality-ratchet.mjs`) yana karanta `quality-baseline.json`
kuma yana kwatanta shi da sabon `quality-metrics.json` da aka tattara. Duk wani ma'auni da ya koma
baya fiye da epsilon ɗinsa zai sa ginin ya gaza.

Ma'aunan da ake bibiyarsu a halin yanzu:

| Ma'auni               | Alkibla | Ma'ana                              |
| --------------------- | ------- | ----------------------------------- |
| `eslintWarnings`      | `down`  | Kada adadin gargaɗin ESLint ya ƙaru |
| `coverage.statements` | `up`    | Kada ɗaukar bayanai ya ragu         |
| `coverage.lines`      | `up`    | Kada ɗaukar layuka ya ragu          |
| `coverage.functions`  | `up`    | Kada ɗaukar ayyuka ya ragu          |
| `coverage.branches`   | `up`    | Kada ɗaukar rassa ya ragu           |

Don sabunta ma'aunin bayan ingantawa ta gaskiya:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Tutocin `--update` yana rubuta ƙimomin da aka auna a yanzu cikin `quality-baseline.json`.
Yi commit na wannan fayil tare da canjin da ya inganta ma'aunin. PR da ya inganta wani
ma'auni ba tare da sabunta ma'aunin ba, `--require-tighten` zai gano shi (Mataki 6A.5,
ana jiran aiwatarwa).

### Ratchet na CodeQL: lokacin sabuntawa da kunnawa da hannu

`check:codeql-ratchet` yana karanta **yanayin repo, wanda ake sabuntawa bisa jadawali — ba a kowane PR ba.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` yana bayar da rahoton
`state: configured`, `schedule: weekly`: binciken default-setup na GitHub ne, ba bincike
a kowane push ba. Sakamako: bayan an haɗa PR da ya GYARA faɗakarwa, ratchet zai ci gaba da karanta
tsohon adadi mafi girma har sai an gudanar da bincike na gaba da aka tsara — don haka yana bayar da rahoton koma-baya
a kan kowane buɗaɗɗen PR, har da PR na bin diddigin gyaran kansa, har sai binciken ya sabunta.

**Sabuntawa da hannu**: `gh workflow run codeql.yml --ref release/vX.Y.Z` yana sake gudanar da
binciken kuma yana sake wallafa faɗakarwa cikin mintuna. Fara da karanta `.github/workflows/codeql.yml`
— taken kansa yana bayyana cewa `workflow_dispatch` kaɗai ne **saboda yana cin karo da
"default setup" na GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Maido da masu kunnawa na `push`/`pull_request`/
`schedule` yana buƙatar **matakin mai repo da farko**: Settings → Code security →
CodeQL: Default → Advanced. Kada a ƙara mai kunnawa na `schedule:` ba tare da wannan sauyin ba — zai
samar da ayyukan da ke gazawa ne kawai.

**Tsaurara ma'aunin bayan adadin ya ragu** — `node scripts/check/check-codeql-ratchet.mjs
--update` yana rubuta sabon adadin da aka auna cikin `quality-baseline.json` →
`metrics.codeqlAlerts.value`, domin ratchet kada ya amince da koma-baya zuwa tsohon
iyaka ba tare da bayyana ba. Misalin da aka aiwatar (2026-09-02/03): PR #12502 ya gyara faɗakarwa na gaske guda 7
(13 → 6 da aka auna a buɗe); PR #12530 ya tsaurara daskararren ma'aunin daga 11 → 6 don su dace; sannan
aka yi watsi da sauran 6 tare da hujjar kowace faɗakarwa har suka koma 0 a buɗe.

**Yin watsi da faɗakarwa shawarar mai gudanarwa ce (Doka Mai Tsauri #14)** — kada a taɓa yin watsi da faɗakarwar CodeQL
ba tare da rubuta hujjar fasaha a sharhin yin watsi ba: `won't fix` don
wani buƙatar yarjejeniyar upstream, `used in tests` don wani test fixture, `false positive`
don sanitizer da CodeQL ba zai iya gani ba (misalin da ya gabata: `docs/security/ERROR_SANITIZATION.md`).

---

## Manufar Sake Gwaji (WS5.4, v3.8.49)

Sake gwaji yana keɓanta ga kowane runner, ba ya zama ƙa’ida gama-gari — sake gwaji gama-gari yana mayar da ainihin koma-baya
zuwa matsalolin bazata da ba a iya gani:

| Runner           | Manufa                                                                                                                                                                  | Dalili                                                                                                                                                        |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` a CI kawai, tare da `trace: on-first-retry`                                                                                                                | Lokacin burauza/cibiyar sadarwa ba ya da tabbas a zahiri; sake gwaji sau ɗaya tare da trace yana mayar da matsalar bazata zuwa artifact da za a iya bincikowa |
| Vitest           | BABU sake gwaji na gama-gari. Gwajin da aka tabbatar yana samun matsalar bazata zai samu sake gwaji takamaimai ga gwajin (a bayyane a cikin diff, kuma a duba shi a PR) | Yana adana jerin keɓewar a cikin repo, ba tare da ɓoye shi ba                                                                                                 |
| node:test (unit) | BABU sake gwaji, har abada                                                                                                                                              | Gwajin unit mai matsalar bazata kwaro ne a cikin gwajin — a gyara shi, kada a sake gwada sa’a                                                                 |

SLOs da ake hari da zarar telemetry na matsalolin bazata ya fara aiki (WS5.2/5.3): ƙasa da 1% na yawan matsalar bazata ga kowane gwaji
(ma’aunin “gyara yanzu”), da yawan nasarar aƙalla 95% ga kowane pipeline. Waɗannan ƙimomin manuniya ne na masana’antu —
a sake daidaita su da ma’aunanmu.

## Kaucewar Ratchet a Matakin Release (WS5.5, v3.8.49)

Lokacin da ratchet (girman fayil, sarƙaƙiya, gargadin eslint) ya koma baya a kan TSANTSAR tip na release
— wato, HAƊIN merges ne ya jawo koma-bayan, kuma babu wani PR guda da zai iya sake haifar da
koma-bayan a branch ɗinsa shi kaɗai — gyaran yana wuyan **release captain, sau ɗaya, a kan
release branch**: a fifita cirewa/refactor; a sake saita baseline ne kawai tare da rubutacciyar
shigar bayanin dalili. Kada a taɓa ɗora kaucewar haɗin kan PR na mai ba da gudummawa, kuma kada a taɓa
sake saita baseline ga kowane PR (hakan yana ɓoye ainihin koma-baya). Da farko a bambance: a sake haifar da
ja a kan tsantsar tip cikin probe worktree kafin a ɗauka cewa PR ɗinka ne ya jawo shi.

## Adana Raguwar Ratchet — alkiblar ƙasa (#8584)

Ratchet ɗin rabinsa kawai yake aiki ta atomatik, kuma wannan rabin ne mara dacewa. **Ɗaga** cap
gyaran JSON ne da hannu wanda ke ɗaukar daƙiƙa goma, kuma shi ne hanya mafi sauri ta warware toshewar jan PR.
**Rage** cap yana buƙatar wani ya gudanar da `--update` sannan ya commit sakamakon — kuma har sai
job ɗin `bank-ratchet-shrinks` ya fara aiki, babu workflow da ke gudanar da shi. Sakamakon da aka auna
(2026-07-25): frozen files guda 18 sun riga sun kai ko sun gaza cap na layi 800 na sabon fayil, mafi muni
yana da 132× (`src/shared/validation/schemas.ts`, layi 19 suna ɗauke da cap na 2,523); iyakar
sarƙaƙiya ta tashi daga `1794 → 2169` ta cikin bayanan sake saita baseline kusan 37 tare da raguwa
guda ɗaya tak (−1); sannan an rubuta “ƙara tsaurara ta `--update` a zagaye na gaba” sau 31 amma an aiwatar
sau ɗaya. Cap da ya daɗe fiye da lambar da ta jawo kafa shi yana mayar da duk wani kammalallen
rarrabawa a ɓoye zuwa izinin faɗaɗawa ga duk wanda zai gyara fayil ɗin a gaba.

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** yana rufe wannan zagayen:

|                 |                                                                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Yana gudana a   | `schedule` (sau 3/rana) + `workflow_dispatch` — da gangan **ba** `push` ba                                                          |
| Yana aunawa     | `release/vX.Y.Z` mafi girma, daidai da resolution + injection guard na `release-green`                                              |
| Yana rubutawa   | `check:file-size --update` da `check:complexity-ratchets --update` (dukansu an gina su don ragewa kawai)                            |
| Yana tabbatarwa | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                                            |
| Yana aikawa     | PR guda ɗaya mai kasancewa na zamani koyaushe zuwa release branch — ana force-update ɗinsa, ba a taɓa cika shi da saƙonnin banza ba |

Ana tara aikin adanawa a rukuni maimakon yin sa ga kowane push saboda ba shi da buƙatar ƙarancin jinkiri (idan an adana raguwa
cikin awa 8 babu matsala), alhali gudanarwa ga kowane merge zai sake gina PR branch akai-akai
a lokacin kamfen na merge kuma ya biya cikakken zagayen ESLint kowane lokaci. Ganowa yana ci gaba a kan
push (`release-green`); adanawa kawai ake tarawa rukuni-rukuni.

### Mai tabbatar da aminci

Job ɗin yana rubuta zuwa baselines ba tare da kulawa ba, don haka `verify-ratchet-bank.mjs` ne yake sa
hakan ya zama abin karɓa. Yana yin diff na tree bayan `--update` da `HEAD` sannan ya **dakatar da job
kafin wani commit ya wanzu** — ba tare da buɗe PR ba — sai dai idan kowane canji yana ɗaya daga cikin:

- shigar lamba ta `frozen` / `testFrozen` da aka **rage** ko aka **cire**
- `complexity-baseline.json` → `count` da aka **rage**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` da aka **rage**

Duk wani abu dabam zai gaza: ɗaga lamba, ƙara shigarwa, canza `cap`/`testCap`, ko
share/sake rubuta bayanin `_rebaseline_*` (waɗannan bayanan su ne tarihin binciken dalilin da ya sa kowace
iyaka take wanzu, kuma ana adana su cikin object ɗin `frozen` guda ɗaya da shigarwar fayilolin).
Bot da zai iya ɗaga cap zai fi halin da ake ciki muni ƙwarai. Kariyar koma-baya:
`tests/unit/verify-ratchet-bank.test.ts`.

Job ɗin ba ya taɓa yin push zuwa `release/*` — mutum ne yake merge na PR, don haka mummunan ma’auni
ba zai iya shiga ba tare da an duba shi ba.

## Manufar Allowlist

Duk wata ƙofa da ba za ta iya gazawa saboda keta dokoki da suka riga suka kasance ba tana amfani da daskararren allowlist
(misali, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Manufar ita ce:

**Gyara tushen matsalar; yi amfani da allowlist ne kawai idan ketawar ta riga ta kasance kuma
ba za a iya gyara ta a cikin PR ɗin nan ba.**

Lokacin ƙara wani shigarwa zuwa allowlist:

1. Haɗa tsokaci mai bayyana dalilin.
2. Nuna batun bin diddigi (misali, `// #3498 — Fasalin Phase 2 ne, ba a aiwatar da shi ba tukuna`).
3. Cire shigarwar a cikin PR ɗin da ya gyara ketawar — tsohuwar shigarwar da ba ta ƙara
   danne wata keta doka mai aiki ba ita ma matsala ce (tilasta-dokar tsofaffin shigarwa ta 6A.3 za ta
   sa ƙofar ta gaza saboda shigarwar allowlist marar alaƙa da zarar an aiwatar da ita).

**Kada** a ƙara shigarwar allowlist don kawai a sa gwaje-gwaje su wuce da sauri. Korewar ƙofa tare da allowlist
mai ci gaba da ƙaruwa yana ba da ruɗin inganci ne kawai.

### Lokacin da wata ƙofa ta gaza a kan PR ɗinka

1. **Karanta sakamakon ƙofar da kyau** — yana gaya maka takamaiman fayil ko alamar da ta karya
   dokar.
2. **Gyara ketawar** — yawancin ƙofofi binciken tsarin fayil ne mai ƙayyadadden sakamako waɗanda ke wucewa da zarar
   lambar ta zama daidai.
3. **Idan ketawar ta riga ta kasance** (wato, ba kai ne ka shigar da ita ba amma yanzu ƙofar
   tana rufe ta): ƙara shigarwar allowlist tare da tsokacin dalili da batun bin diddigi.
4. **Idan ƙofar ratchet ce** (coverage, gargaɗin ESLint, maimaitawa, sarƙaƙiya):
   canjinka ya ƙara munana ma'aunin. Gyara ainihin matsalar, ko kuma (da wuya) gudanar da
   `npm run quality:ratchet -- --update` idan canjin da gangan aka yi shi kuma ana iya amincewa da
   tabarbarewar ma'aunin — amma bayyana dalilin a bayanin PR.
5. **Ƙofofin shawarwari** (`continue-on-error: true`) na bayar da bayanai ne — ba sa hana
   haɗawa amma suna bayyana a taƙaitaccen bayanin CI. Duk da haka, a gyara su.

---

## Ƙara Sabuwar Ƙofa

1. Ƙirƙiri `scripts/check/check-<name>.mjs` (ko `.ts`). Ƙofofin manufofi suna fita da 0/1.
   Ƙofofi irin na ratchet suna fitar da ma'auni zuwa `quality-metrics.json` ta hanyar `collect-metrics.mjs`.
2. Ƙara `"check:<name>": "node scripts/check/check-<name>.mjs"` zuwa `package.json`.
3. Haɗa ta a cikin `.github/workflows/ci.yml` ƙarƙashin aikin da ya dace
   (manufa → `lint` ko `docs-sync-strict`; ratchet → `quality-gate`).
4. Idan tana da allowlist, yi amfani da `reportStaleEntries()` daga
   `scripts/check/lib/allowlist.mjs` domin a gano tsofaffin shigarwa ta atomatik.
5. Rubuta gwaji a cikin `tests/unit/build/` wanda ya ƙunshi dabarar gano ketawar ta ƙofar.
6. Sabunta wannan takarda (ƙara layi zuwa jadawalin aikin da ya dace).

---

## Kayan aikin wakili: LSP-in-the-loop (na zaɓi)

Baya ga ƙofofin CI, OmniRoute yana zuwa da tsarin farawa na **zaɓi** na `agent-lsp`
(`.mcp.json` na matakin aikin, Fase 7 Task 15). Ƙirƙiri `.mcp.json`
don samar wa wakilan rubuta lamba damar amfani da uwar garken harshen TypeScript, domin su tantance alamomi /
binciken kurakurai **kafin** rubuta lamba — abokin `typecheck:core` na tantancewa-kafin-da'awa
wanda ke rage kurakuran "alamar da aka ƙirƙira" tun daga tushe. Da gangan ba a
loda shi ta atomatik (kai ne za ka zaɓa kuma ka tabbatar da gadar MCP↔LSP); gurɓatacciyar shigarwa tana rubuta
kuskuren haɗi ne kawai kuma ba ta taɓa karya zaman aiki ba.

---

## Jerin Ayyukan Da Aka Jira Don Daidaitawa (bitar ROI — Mataki 9 Zagaye 3)

An daidaita wannan kundin da `ci.yml` a ranar 2026-06-17 (sigar da ta gabata ba ta haɗa da
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` ba). Bitar ROI kan jerin da aka daidaita
ta gano waɗannan ayyukan da za a iya sauƙaƙawa. **Haɗe-haɗen sauye-sauyen CI ne na
inji kawai; sauya matsayi/cirewa kuwa shawarwarin manufofi ne da aka keɓe wa mai gudanarwa.** Babu wani abu a ƙasa
da aka fara aiwatarwa tukuna.

**Haka kuma ba a rubuta bayaninsu a sama ba** (na shawara, alama mai rauni): aikin `docs-lint`
(markdownlint + Vale, dukan aikin yana da `continue-on-error`) da kuma workflows na na'urorin dubawa masu zaman kansu
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` yana cikin
`quality-baseline.json` amma ba a haɗa shi da ratchet mai toshewa a `ci.yml` ba — a halin yanzu
ma'aunin ba shi da abin da yake sarrafawa.

### Haɗewa / cire maimaituwa (na inji, haɗari kaɗan)

An tabbatar da kowane zaɓi bisa halin gate na ainihi a ranar 2026-06-17 (amince amma a tabbatar);
haɗe-haɗe da dama da suka yi kama da “bayyane” sun ɓoye bashi, don haka **ba** za a iya maye gurbinsu kai tsaye cikin sauƙi ba.

- **`check:docs-sync` yana gudana sau biyu** — shi kaɗai a aikin `lint`, sannan kuma a cikin `check:docs-all` (`docs-sync-strict`) da husky pre-commit hook. ✅ **AN KAMMALA** — an cire kiran da ke gudana shi kaɗai daga `lint`.
- **Binciken CVE** — ❌ **BA haɗewa ce mai sauƙi ba.** `audit:deps` yana gaza kai tsaye idan ya ga kowane CVE mai haɗari/babban haɗari; `check:vuln-ratchet` (osv) kuwa yana gaza ne kawai idan an samu _taɓarɓarewa_ idan aka kwatanta da baseline (a halin yanzu 1 MODERATE). Ma'anoninsu sun bambanta — cire `audit:deps` zai kawar da cikakken gate na haɗari/babban haɗari. A bar su duka.
- **Gano madauwari** — ✅ **AN KAMMALA** (#15159 G-01/G-02). Tsohon rubutun nan ya kira `check:cycles` gate “mai kore, da aka zaɓa a tsanake” kuma ya ba da hujjar ci gaba da sanya shi mai toshewa saboda `check:circular-deps` (dpdm) ya bayar da rahoton madauwari 91. Wannan koren sakamakon **koren ƙarya ne**: `check:cycles` ya binciki ƙananan kundin adireshi 5 (fayiloli 450), ya dace da static `import|export … from` kawai, sannan ya yi watsi da duk wani specifier na `@/` da `@omniroute/open-sse/`, don haka bai iya ganin madauwuran dynamic-import + alias da suka mamaye repo ba. An gyara: yanzu gate ɗin yana ratsa `src` + `open-sse` (fayiloli 5023), yana tattara specifiers daga TypeScript AST (don haka `import("…")` yana ƙidayuwa amma `typeof import("…")` da ke matsayin type ba ya ƙidayuwa), kuma yana warware tsconfig `paths`. Yana gano madauwari **14**, ba 0 ba. Saboda ba za a iya gyara madauwari 14 da suka riga suka kasance a cikin gate PR ba, yanzu `check:cycles` ya zama **ratchet** (`--ratchet`, iyaka `metrics.cycles.value = 14` a cikin `quality-baseline.json`, `direction: down`) — yana toshe duk wata _taɓarɓarewa_ kuma adadin zai iya raguwa ne kawai. CI yana gudanar da `npm run check:cycles:ratchet`. Rage adadin a hankali yana tafiya tare da **A-01**. `check:circular-deps` (dpdm) zai ci gaba da zama na shawara a matsayin ra'ayi na biyu mai faɗi.
- **Sarƙaƙiya** — ✅ **AN KAMMALA** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): zagayen ESLint guda ɗaya, yana ƙirga bisa ruleId domin cyclomatic+max-lines da cognitive baselines su ci gaba da kasancewa masu zaman kansu; `check:complexity` / `check:cognitive-complexity` na ɗaiɗaiku suna nan don `--update` na gida.
- **Hana ruɗin `/api`** — ✅ **AN KAMMALA** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): lissafin FS guda ɗaya na `src/app/api`, openapi-routes + docs-symbols har yanzu suna bayar da rahoto daban-daban; na ɗaiɗaiku suna nan don gudanarwa ta gida.
- **`check:node-runtime` yana gudana a ayyuka 11** — ⚠️ **ROI kaɗan.** Kowanne yana da runner daban kuma binciken bai kai sakan 1 ba; jimillar abin da za a adana kusan sakan 10 ne, amma hakan zai sa a rasa kariyar kowane aiki mai arha. Bai cancanci rikicin sauyin ba.
- **`typecheck:noimplicit:core` a CI lint** — ✅ **an cire daga aikin lint** (a baya na shawara ne da `continue-on-error`); ɓangaren type mai toshewa shi ne `typecheck:core` + `check:type-coverage`. An riƙe script na gida.

### Sauya matsayi / yanke shawara (manufar mai gudanarwa)

- `check:openapi-security-tiers` (na shawara) — ❌ **BA za a iya sauya matsayinsa kai tsaye cikin sauƙi ba.** Yana fita da 0 amma yana gargadin cewa routes na `traffic-inspector` da dama a ƙarƙashin `LOCAL_ONLY_API_PREFIXES` ba su da annotation na `x-loopback-only: true`. Tilasta shi yana buƙatar fara ƙara waɗannan annotations zuwa `openapi.yaml`.
- `typecheck:noimplicit:core` (na shawara) — ratchet mai toshewa na `check:type-coverage` ya riga ya rufe yawancin aikinsa. A sauya shi zuwa ratchet ko a cire zagayen `tsc` na biyu mai maimaituwa.
- `test:vitest:ui` (yanzu **mai toshewa**) — an ware gazawar da ta riga ta kasance a sarari cikin `vitest.config.ts` tare da sharhin bin diddigi na `// #8618`; sababbin gazawa za su sa aikin ya gaza.
- `check:secrets` (gitleaks, ratchet mai toshewa da aka daskarar a sakamakon ƙarya 3 da aka rubuta bayaninsu) — a saka ukun cikin allowlist domin a kai 0, ko a saukar da shi zuwa na shawara. Yana maimaita wani ɓangare na aikin GitHub native secret-scanning + `check:public-creds`.
- `check:pr-evidence` (mai toshewa, yana grep rubutun PR-body) — haɗarin sakamakon ƙarya yana da yawa; cire shi zai raunana aiwatar da Hard Rule #18, don haka wannan shawarar manufa ce ta gaske.
- `semgrep` (na shawara mai zaman kansa) — yana maimaita aikin CodeQL ga rukunin OWASP; a haɗa baseline ɗinsa da ratchet ko a cire shi.

---

## Takardun da Suka Shafi Wannan

- Sarkar samarwa (provenance, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — ƙofar daidaiton tarin maɓallai

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, aikin `i18n-ui-coverage`).
Yana kwatanta tarin maɓallan ƙarshe na kowane `src/i18n/messages/<locale>.json` da `en.json`, kuma yana kasa
idan akwai wani maɓallin ƙarshe da ya ɓace ko ya yi ƙari, ba tare da la’akari da lokacin da aka ƙara maɓallin ba. Alamomin wucin-gadi na `__MISSING__:`
ana ƙirga su a matsayin suna nan (abin da ke cikinsu aikin ƙofar rabo ne). Wannan shi ne cikakken abin da ke cike gibin
ƙofofin nan biyu masu dogaro da diff/kashi: `check-ui-keys-coverage` yana tilasta mafi ƙarancin 80 % ga kowane
locale (maɓallai 43 da suka ɓace cikin ~13,000 har yanzu suna nuna 99.7 %), sannan `check-new-key-coverage` yana tantance
maɓallan da PR ya ƙara wa `en.json` kawai. Ana samar da rukunin locale daga `en.json` na ranar
da aka ƙirƙiri branch ɗinsa, sannan yana ci gaba da fassara na kwanaki yayin da base ke ƙara sabbin maɓallai; PR ɗin rukunin ba ya ƙara
wani maɓalli da kansa, don haka dukkan ƙofofin biyu ba su yi ƙararrawa ba lokacin da rukuni na 1 (#13044) ya shiga yana da ƙarancin maɓallai 43 a
locale tara, haka kuma rukuni na 2 (#13660) yana da ƙarancin maɓallai 10 a locale takwas (2026-09-15). Gyara gazawa da
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; maɓallin ƙarshe na `extra`
yana nufin tushen ya cire shi — share shi daga locale ɗin. `--warn` yana bayar da rahoto ba tare da sa gazawa ba.
`--catalog=cli` yana gudanar da kwatancin iri ɗaya a kan `bin/cli/locales` (`npm run i18n:check-keys:cli`);
duk matakan biyu suna cikin aikin `i18n-ui-coverage`.

#### `check-new-key-coverage` — ƙofar i18n ta sabon maɓalli

Abokin `check-ui-value-drift`. Wancan yana gano lokacin da aka **sake rubuta** ƙimar Turanci
amma aka bar fassarorinta a baya; wannan kuma yana gano maɓallin Turanci da aka **ƙara**
amma wasu locale ba su taɓa samunsa ba.

`check-ui-keys-coverage` ba zai iya ganin wannan nau’in ba: yana tilasta mafi ƙarancin kashi ga kowane locale, kuma
maɓallai goma sha ɗaya da suka ɓace cikin ~13,000 suna barin coverage a 99.9%. Kashi ga kowane harshe ba zai iya
bayyana cewa "an fitar da wannan fasalin ba tare da fassara ba" — cikakken fasali zai iya shiga sabon locale ba tare da
wani rubutu ba, kuma lambar ba za ta taɓa motsawa ba.

Lamarin da yake wakilta: Mataki na 3 na Orchestration Canvas ya fassara maɓallansa goma sha ɗaya a duk
locale 42 da suke akwai a lokacin. Bayan sa’o’i kaɗan, rukunin harsunan EU (#13044) ya kai repo ɗin
zuwa locale 51, kuma sabbin locale tara (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ba su taɓa
samun su ba. `deepMergeFallback` yana maye gurbin maɓallin da ya ɓace da Turanci, don haka yanayin gazawar ya kasance
UI da ba a fassara ba maimakon UI marar rubutu — matsala ta gaske, kuma wadda tsarin ya sa ta kasance shiru.

Kamar abokin nasa, yana **la’akari da diff**, yana kwatanta Turanci a merge base da working
tree, don haka tsoffin giɓi suna ci gaba da kasancewa daskararru, kuma ƙofar ba ta buƙaci migration kafin a kunna ta.

**Alamar `__MISSING__:<english>` ba ta cika sharadin ba (tun daga 2026-09-17).** A baya ita ce hanyar jinkirtawa
da aka rubuta a takardu — runtime yana komawa ga ingantaccen Turanci — har sai PR na fasali takwas a
2026-09-16 suka ƙara maɓallai 61 kuma suka sanya alamar a duk locale 65 maimakon fassara: wannan
ƙofa ta amince da kowannensu, babu abin da ya toshe PR ɗin, sannan ƙofar rabo ta ainihin fassara mai toshewa
ta kasa a release tip ga kowa (pt-BR 3.2 % > 2.5 % + 0.5). Yanzu ana ɗaukar alama
a matsayin fassarar da ta ɓace. Gyara gazawa da
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, ko kuma
duk locale a lokaci guda da `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
yana aiki lafiya a detached state, kuma ya ƙi farawa ba tare da env na `OMNIROUTE_TRANSLATION_*` ba). Maɓallin da dole ya ci gaba da kasancewa
da Turanci (sunan samfur/engine/flag da aka kafe) ya kamata ya kasance a `scripts/i18n/untranslatable-keys.json`,
ba a ɓoye shi a bayan alama ba. `vi` yana haramta alamomin gaba ɗaya (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — ƙofar gwaje-gwajen da aka ajiye gefe

Fayil da ke cikin jerin `exclude` na `vitest.config.ts` gwaji ne da ba ya gudana, kuma ga duk wanda ya karanta
tree ɗin, yana bayyana kamar coverage ne. Fayil sittin da biyu sun taru a bayan sharhin
`// #8618 — pre-existing failure; remove this exclusion when fixed`. An rufe issue #8618 a
2026-08-11 yayin da jerin da yake bi ya ƙaru daga shigarwar 45 zuwa 62, kowace sabuwa tana gadon sharhin
da ke nuna issue da ya riga ya mutu. Lokacin da a ƙarshe aka auna jerin fayil bayan fayil (#13204), **51 daga cikin 62
sun yi nasara a kan tree na yanzu ba tare da wani canji ga source ba**.

Ƙofar tana buƙatar kowane exclusion da ya warware zuwa ainihin fayil ya (a) ambaci tracking issue, kuma
(b) bayyana a `config/quality/vitest-exclusions.json` tare da matsayin da aka auna, don haka ƙara ɗaya zai zama
diff da za a iya bitarwa a cikin keɓantaccen fayil maimakon ƙara wani layi guda a cikin array mai shigarwa 60. Da gangan,
ba ta sake gudanar da gwaje-gwajen da aka ware ba — hakan yana ɗaukar ~10 minutes kuma ya dace da periodic job;
inventory ɗin yana rubuta lokacin da aka auna kowannensu a karo na ƙarshe.
