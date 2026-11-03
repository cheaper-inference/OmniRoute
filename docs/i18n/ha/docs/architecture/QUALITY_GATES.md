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

## Ƙididdigar ƙofofi da bayanan aiwatarwa

### Shigar da ɗan takara

Workflows na CI da Quality Gates kowannensu yana fitar da hukunci tabbatacce: `Gate / CI` da
`Gate / Quality`. Manufar shigarwa mai sigar tana lissafa kowane aikin upstream a matsayin
tilas ko na shawara. Aikin tilas da ya shafi lamarin dole ne ya yi nasara: sakamakon da ya
ɓace, aka soke, aka tsallake, ke jiran aiki ko ba a sani ba ba zai iya tabbatar da PASS ba.
Rarrabawa ingantacciya ta docs-only ko catalog-only na iya sa layin code ya zama ba ya aiki;
PR na draft ba ɗan takara da aka karɓa ba ne. Alamar `hotfix` ba ta kawar da buƙatar shaida ba.

Dukkan workflows ɗin suna rufe PRs zuwa rassan main/release, turawa zuwa `main`, dispatch na
manual da abubuwan merge-group. Push, dispatch da merge-group suna gudanar da cikakken zaɓi.
Turawa zuwa `release/**` ba sa fara su (2026-10-18): kowane canji ya riga ya gudanar da matrix
a kan PR ɗinsa kuma haɗin da aka haɗa aikin Release-Green ne (`docs/ops/RUNNER_BOX.md` → Hosted lane).
Forks da merge groups suna amfani da hosted runners don ayyukan da in ba haka ba za su zaɓi self-hosted
runners; dole ne a tabbatar da isasshen ƙarfin hosted kafin fitarwa.

Kowane receipt na JSON yana gano SHA ɗin da aka checkout, run na workflow da ƙoƙari.
CLI yana ƙin yarda idan SHA ɗin checkout/event ba su yi daidai ba. Gwaje-gwajen workflow suna
ɗaure kasancewar policy a cikin jerin `needs` na aikin hukunci, don kada sabon lane ko wanda aka
cire ya ɓace ba tare da an lura ba. Receipts ɗin suna rufe workflow nasu ne, ba wallafawa,
deployment, ko cikin wani advisory scanner da ya riga ya wanzu ba. Kunna sunayen check
biyu a ƙa’idojin reshe wani canjin gudanarwa ne dabam; ƙara waɗannan ayyuka kaɗai ba ya kare reshe.

### Ƙididdigar binciken tsaye

Ƙididdigar npm-alias mai sigar da kasancewar static-scan suna cikin
`config/quality/gate-manifest.json`. Gudanar da `npm run check:gate-manifest` don tabbatar da
sunayen scripts da ainihin umarni bisa ga `package.json`; ƙari, cirewa da karkatar umarni
suna sa duka local hook da ayyukan rarraba canji a CI su gaza.
Alias ba workflow job, matrix instance ko test case ba ne: kada a gabatar da waɗannan ƙididdiga
a matsayin abubuwan da za a iya musanya da juna.

Yi amfani da `npm run quality:scan -- --list` ko `npm run quality:scan:fast -- --list`
don duba aliases da aka zaɓa ba tare da gudanar da su ba. Runner yana kiran npm entrypoint,
don haka runtime ɗinsa (har da Bun inda aka tsara shi) yana nan yadda yake.
Manifest yana rubuta aliases da ke wajen waɗannan profiles a matsayin waɗanda ake kira dabam,
kuma an hana maintenance commands a cikin read-only scan profiles.

Waɗannan profiles suna rufe static scan kaɗai. Ba sa tabbatar da product tests,
coverage, packaging, external checks ko cikakkiyar amincewar release ta ɗan takara.
Shigar workflow tana amfani da `config/quality/admission-policy.json` da
`scripts/quality/admission-verdict.mjs`. Release-observer profiles suna nan dabam;
duba checks da receipts ɗin da suka shafe su daban. Ƙididdigar bayani da ke ƙasa
abin tuntuɓa ce, ba hujjar cewa gate ya gudana ba.

Scripts suna ƙarƙashin `scripts/check/` (policy gates) da `scripts/quality/` (ratchet engine).
Babban tushen gaskiyar CI shi ne `.github/workflows/ci.yml`.

### Hanyar sauri ta Release PR (`quality.yml`)

`.github/workflows/quality.yml` yana ƙara wa CI aiki a kan main/release PRs, turawa zuwa `main`,
dispatch da merge groups. PRs suna amfani da fast checks masu tacewa bisa hanyoyin fayil.
An cire build ɗin maimaitacce da aka kashe na dindindin; ainihin checks na build/package/boot
sun kasance a cikin CI.

| Aiki                                             | Faɗi                                                                                                                                                                                                                          | Toshewa          |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `Docs Gates (fast-path)`                         | PRs na docs/code; nassoshi na API docs da docs-all                                                                                                                                                                            | Eh               |
| `Fast Quality Gates`                             | PRs na code; static checks, typecheck, typecheck na dashboard, unit tests da abin ya shafa                                                                                                                                    | Eh               |
| `Forgotten sibling tests`                        | PRs na code; modules da aka canza waɗanda aka bibiyi zuwa static consumers da sibling tests na ɗan takara; ana bayar da barrel da dynamic-import paths a matsayin bayanan shawara, tare da keɓancewar allowlist da aka ambata | **Na shawara**   |
| `Vitest (fast-path)`                             | PRs na code; fast vitest suite                                                                                                                                                                                                | Eh               |
| `Unit Tests fast-path`                           | PRs na code; unit suite mai shards 4                                                                                                                                                                                          | Eh               |
| `No new ESLint warnings`                         | PRs na code; lint guard mai la’akari da suppressions                                                                                                                                                                          | Eh, har da forks |
| `Merge integrity (changelog + generated skills)` | PRs da ba draft ba; daidaita changelog da generated skill                                                                                                                                                                     | Eh, har da forks |

#### Rahoton Forgotten sibling tests

`npm run check:forgotten-sibling-tests` yana sake amfani da mai warware import ɗin da ke bayan taswirar tasirin gwaji.
Ga kowane module na samarwa da aka canza, yana bayar da jerin
`changed module/symbol -> static consumer -> candidate sibling test` masu ƙayyadadden sakamako, lokacin da gwajin da aka zaɓa
baya cikin bambancin pull request. Ana adana taƙaitaccen Markdown da sakamakon JSON a matsayin
artifact na workflow na `forgotten-sibling-tests` domin daidaitawa kafin fara aiwatar da toshewa.

Sake-fitarwar Barrel da imports masu canzawa kayan binciken warwarewa ne kawai; ba sa taɓa ƙirƙirar
sakamakon da zai toshewa. Keɓancewar da aka duba tana cikin
`config/quality/forgotten-sibling-allowlist.json`. Kowace shigarwa dole ta bayyana consumer da gwajin da aka zaɓa,
ta ba da dalili na musamman, kuma ta haɗa da GitHub issue ko pull request. Shigarwar da ba ta da inganci tana kasa ta hanyar
rufe hanya. Keɓancewa ba za ta iya hana sakamakon gwajin da aka zaɓa da aka goge ba, ko bambancin da ya ƙara `.skip`/`.todo`;
raunana assertions da sauran hanyoyin ɓoye sakamako suna ƙarƙashin ikon gate na
`check:test-masking` mai toshewa da kansa.

### Aiki: `lint`

Yana gudana a kowace PR zuwa `main`. Yana toshe haɗawa idan ya gaza.

| Script (`npm run ...`)            | Yana ingantawa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Toshewa                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| `check:node-runtime`              | Sigar Node.js tana cikin kewayon da ake tallafawa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ee                                         |
| `check:cycles`                    | Shigowar juna mai madauwari a dukkan `src/` + `open-sse/` (na tushen AST, an warware `paths` na tsconfig). Bare yana fita da 1 a duk lokacin da akwai wata madauwari (ana hana wucewa tun daga #15281) kuma yana jera SCCs. `check:cycles:ratchet` (abin da CI ke gudanarwa) yana toshewa idan adadin ya wuce iyakar `metrics.cycles` da ke cikin `quality-baseline.json` — a halin yanzu 14, `direction: down`, don haka zai iya raguwa kawai (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ee (ratchet)                               |
| `check:boundary`                  | Haɗin `open-sse → src`: shigowar fayil-zuwa-fayil na musamman daga injin zuwa manhajar (`scripts/quality/measure-boundary.mjs`; jerin gefuna shi ne jerin ayyukan gyaran v4 core/module-split). Bare = rahoton shawara (daidai da `quality:boundary`). `check:boundary:ratchet` (abin da CI ke gudanarwa, har ila yau yana cikin madaukin ratchet na fast-gates na `quality.yml`) yana toshewa idan adadin ya wuce iyakar `metrics.boundaryOpenSseToSrc` da ke cikin `quality-baseline.json` — an fara shi da adadin da aka auna na 771, `direction: down`; `--update` yana rage shi ne kawai; yana da alaƙa da tushe a kan PRs (`--base-ref`, duba ƙasa)                                                                                                                                                                                                                                                                                                                                                                                              | Ee (ratchet)                               |
| `check:route-validation:t06`      | Tsare-tsaren Zod suna nan a dukkan hanyoyi (manufar Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ee                                         |
| `check:any-budget:t11`            | Ƙididdigar `@ts-expect-error // any` ba ta wuce kasafin kuɗi ba (catraca na Mataki na 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ee                                         |
| `check:provider-consistency`      | Kowane provider a cikin `providers.ts` yana da shigarwa mai dacewa a cikin `providerRegistry.ts` (kuma akasin haka, cikin jerin waɗanda aka amince da su)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ee                                         |
| `check:model-lifecycle`           | Teburorin kewayawa guda uku da ake kula da su da hannu suna nan daidaitattu da hoton yanayin rayuwa da aka shigar (#11503): `FITNESS_TABLE` (`taskFitness.ts`) yana ƙididdige maki ga id ɗin da `REGISTRY` zai iya kewayawa kawai idan ba su yi ritaya ba; kowace manufa ta `BUILT_IN_ALIASES` tana cikin `REGISTRY` kuma ba ta cikin hoton id ɗin da suka yi ritaya; kowane id da ya yi ritaya amma har yanzu yake cikin `REGISTRY` ana tura shi gaba ko an jera shi cikin `allowedRetiredInCatalog`; kuma babu wata tushe ko manufa ta `DEFAULT_DEGRADATION_MAP` da ta bayyana a matsayin wadda ta yi ritaya a cikin wannan hoton. Wannan ba ya tabbatar da cewa wani samfurin ana samar da shi a halin yanzu ta wani upstream mai aiki. Ba tare da layi ba — yana kwatanta da `config/quality/model-lifecycle.json`, wanda ake sabunta shi da hannu ta `npm run quality:refresh-model-lifecycle` (cibiyar sadarwa; ba a haɗa shi da CI ba). `allowedRetiredInCatalog` wata hanyar rage saura ce: ƙara shigarwa ne kawai tare da batun bibiyar aiki. | Ee                                         |
| `check:fetch-targets`             | Kowane `fetch("/api/...")` a cikin `src/` na gefen abokin ciniki yana warwarewa zuwa ainihin `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ee                                         |
| `check:deps`                      | Duk abubuwan dogaro da za a iya girkawa ta `npm install` a cikin kowane `package.json` na ma’ajiyar suna cikin `dependency-allowlist.json`; ana nuna sabbin kunshe-kunshe marasa pinned ko waɗanda aka yi wa slopsquatting                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ee                                         |
| `audit:deps`                      | `npm audit` (tushen + electron) — babu shawarwarin tsaro masu tsanani ko masu matuƙar haɗari (ya yi karo da osv `check:vuln-ratchet`; duba Rationalization Backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ee                                         |
| `check:lockfile`                  | Mutuncin `package-lock.json` — rajistar https, hash na mutunci, babu gyare-gyaren host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Eh                                         |
| `check:licenses`                  | Jerin lasisin SPDX da aka amince da su don dependencies na samarwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Eh                                         |
| `check:tracked-artifacts`         | Babu kayan aikin ginawa / symlinks na `node_modules` da aka commit (yana kuma gudana a cikin husky pre-commit; pre-push an bar shi da gangan yana da sauƙi — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Eh                                         |
| `check:ai-attribution`            | Babu trailer na `Co-Authored-By` na AI/bot ko footer na samarwa ta AI a cikin commit na PR, take ko jiki — Dokar Tsauri #16 (a cikin madaukin fast-gates na `quality.yml` don PR→`release/**` — yana karanta bayanan taron, ba ya yin komai idan ba PR ba — da kuma mataki na PR-kawai a cikin lint na `ci.yml` don PR→`main`; haka kuma hook na `commit-msg` na husky; an yarda da masu haɗin gwiwa mutane; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:vitest-exclusions`         | Kowace exclusion ta Vitest tana ambaton wani issue na bin diddigi kuma tana bayyana a cikin `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Eh                                         |
| `check:file-size`                 | Fayilolin tushe (`.ts`/`.tsx` a cikin `src/`, `open-sse/`, `electron/`, `bin/`) su kasance cikin iyakar `cap`, sannan fayilolin gwaji (`*.test.ts(x)`) su kasance cikin `testCap`; fayilolin da aka daskare a cikin `file-size-baseline.json` (`frozen` / `testFrozen`) ba za su wuce girman da aka rubuta musu ba                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Eh                                         |
| `check:error-helper`              | Amsoshin kuskure a cikin executors/handlers suna amfani da `buildErrorBody()` / `sanitizeErrorMessage()` (Ƙa’ida Mai Tsauri #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Eh                                         |
| `check:migration-numbering`       | Ana ba fayilolin Migration SQL lambobi a jere, ba tare da gibi ko maimaitawa ba                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Eh                                         |
| `check:public-creds`              | Babu `client_id`/`client_secret` na OAuth na zahiri ko makullan Yanar gizo na Firebase a wajen `publicCreds.ts` (Ƙa’ida Mai Tsauri #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Eh                                         |
| `check:db-rules`                  | Babu raw SQL a wajen modules na `src/lib/db/`; babu barrel-imports daga `localDb.ts` (Ƙa’idojin Tsauri #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Eh                                         |
| `check:known-symbols`             | Masu aiwatar da ayyukan provider, dabarun routing, da masu fassara da aka yi rajista a cikin dispatch tables sun yi daidai da fayilolin da ke faifai — babu alamomin da suka zama marayu ko waɗanda ba a ayyana ba                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Eh                                         |
| `check:route-guard-membership`    | Kowace hanya da ke ƙaddamar da aikin ɗan tsari ana rarrabe ta ta `isLocalOnlyPath()` (Ƙa’idojin Tsauri #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Eh                                         |
| `check:test-discovery`            | Ana tattara kowane fayil na `*.test.ts` / `*.spec.ts` a cikin ma’ajiyar lambar ta akalla mai gudanar da gwaji guda ɗaya (ratchet: jerin marasa alaƙa a cikin `test-discovery-baseline.json` zai iya raguwa kawai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ee                                         |
| `check:test-tla-order`            | Babu wani fayil na `node:test` a ƙarƙashin `tests/unit` da ke yi wa gwaji rajista, ya kai ga `await` na matakin sama, sannan ya sake yin rajistar wasu (#18045; ratchet: `test-tla-order-allowlist.json` zai iya raguwa kawai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ee                                         |
| `check:agent-skills-sync`         | Abubuwan da aka samar na ƙwarewar wakili sun yi daidai da kundin tushensu (babu saɓani)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:provider-asset-provenance` | Tambura/abubuwan samarwa na mai bayarwa suna ɗauke da shigarwar asalin da aka rubuta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `lint:json`                       | Fayilolin saitin JSON suna iya parse kuma sun cika ƙa’idojin lint na ma’ajiya                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `typecheck:core`                  | Haɗa TypeScript ba tare da kurakurai ba (gargadin shawara kawai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ee                                         |
| `typecheck:noimplicit:core`       | Tsauraran `noImplicitAny` — ana shirin gaba; har yanzu wuraren kiran da dama da suka riga sun wanzu suna buƙatar bayanan nau’i                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **Na shawara** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` da aka keɓe zuwa `src/app/(dashboard)/**` (#7033) — jerin fayiloli 27 da aka tanada na `typecheck:core` bai ƙunshi wani dashboard TSX ba, kuma `next build` ma ba ya duba nau'in bayanan sa (`next.config.mjs` ya sa `ignoreBuildErrors: true`), saboda haka koma-bayan identifiers da suka zama marayu a can (#6625/#6909) ba su bayyana ga CI ba. Ana kwatanta bambance-bambance da ma'aunin ƙidaya da aka daskarar don kowane fayil/kowane lambar TS (`config/quality/dashboard-typecheck-baseline.json`, irin tsarin tilasta tsohon ma'auni kamar `check:known-symbols`) — kurakuran NEW kawai da suka wuce adadin da aka tanada ne ke sa gate ya fadi; a rage ma'aunin da `--update` idan an gyara wani kuskuren da ya riga ya kasance.                                                                                                                                                                                                                                                                                                     | Eh                                         |

### Aiki: `quality-gate`

Yana gudana bayan `test-coverage`. Yana hana haɗa canji idan ya gaza.

| Script                       | Abin da yake tantancewa                                                                                                                                                                                           | Yana hana haɗawa                        |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `quality:collect`            | Yana fitar da `quality-metrics.json` (ƙidayar gargadin ESLint, da coverage daga rahoton merged shard)                                                                                                             | Eh (shi ne matakin upstream na ratchet) |
| `quality:ratchet`            | Kowanne ma'auni a cikin `quality-baseline.json` bai koma baya ba (gargadin ESLint ≤ baseline; coverage ≥ baseline)                                                                                                | Eh                                      |
| `check:duplication`          | Kwafin lamba (jscpd@4) bai wuce baseline da ke cikin `quality-baseline.json` ba                                                                                                                                   | Eh                                      |
| `check:complexity`           | Rikitarwar cyclomatic a matakin fayil bai wuce iyaka ba (core ESLint `complexity` + `max-lines-per-function`)                                                                                                     | Eh                                      |
| `check:cognitive-complexity` | Ratchet na rikitarwar fahimta (`eslint-plugin-sonarjs`) — wani binciken ESLint dabam; CI yana tafiyar da su duka a haɗe a matsayin mataki guda na `check:complexity-ratchets`                                     | Eh                                      |
| `check:dead-code`            | Ratchet na exports / fayilolin da ba a amfani da su (knip) bai koma baya ba idan aka kwatanta da baseline                                                                                                         | Eh                                      |
| `check:compression-budget`   | Kasafin ma'aunin compression — ƙananan iyakokin tanadin tokens na kowane engine ba su koma baya ba                                                                                                                | Eh                                      |
| `check:type-coverage`        | Ratchet na kaso mai nau'in bayanai (`type-coverage`) bai koma baya ba; galibi yana maye gurbin `typecheck:noimplicit:core`                                                                                        | Eh                                      |
| `check:codeql-ratchet`       | Ƙidayar buɗaɗɗun faɗakarwar CodeQL ba ta koma baya ba (ana karantawa ta `gh api`; yana tsallakewa cikin aminci ba tare da token ba) — don jadawalin sabuntawa da kunna shi da hannu: duba "CodeQL ratchet" a ƙasa | Eh                                      |

### Aiki: `quality-extended`

Dukan aikin na ba da shawara ne (`continue-on-error: true`). Ratchets na tushen npm suna gudana
da gaske; masu binciken waje suna girkawa ta `gh release download` kuma su tsallake kansu (exit 0)
idan binary bai kasance ba tukuna.

| Script                   | Abin da yake tantancewa                                                                                                                                                                                                                                                | Yana hana haɗawa                                               |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `check:circular-deps`    | Babu dependencies masu zagaye (dpdm)                                                                                                                                                                                                                                   | **Na ba da shawara ne**                                        |
| `check:bundle-size`      | Girman bundle bai wuce iyaka ba                                                                                                                                                                                                                                        | **Na ba da shawara ne**                                        |
| `check:secrets`          | Binciken sirruka (gitleaks) — yana tsallakewa idan binary bai kasance ba                                                                                                                                                                                               | **Na ba da shawara ne**                                        |
| `check:vuln-ratchet`     | Raunin dependencies (osv-scanner) bai koma baya ba — yana tsallakewa idan binary bai kasance ba                                                                                                                                                                        | **Na ba da shawara ne**                                        |
| `check:workflows`        | Lint na workflows (actionlint + zizmor); rashin masu bincike ko lalacewarsu, rahotannin da ba su inganta ba ko rashin baseline na ratchet suna sa a kasa a matsayin INCOMPLETE. Abubuwan da aka samu masu inganci suna bin manufar strict/advisory/ratchet da aka zaɓa | Ana buƙatar aiwatarwa; ratchet na zizmor yana hana haɗawa a CI |
| `check:openapi-breaking` | Canje-canjen da ke karya kwangilar API ta jama'a (`openapi.yaml`) idan aka kwatanta da reshen tushe (oasdiff) — yana fitar da `openapiBreaking=N`; yana tsallakewa idan oasdiff bai kasance ba ko ba a iya warware ƙayyadaddun tushe ba                                | **Na ba da shawara ne**                                        |

### Aiki: `docs-sync-strict`

Yana gudana a kowace PR zuwa `main`. Yana hana haɗa canji idan ya gaza.

| Script                         | Abin da yake tantancewa                                                                                                                                                                                  | Toshewa                        |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `check:docs-all`               | Meta-gate da ke gudanar da ƙananan gates 6 da ke ƙasa a jere                                                                                                                                             | Eh                             |
| ↳ `check:docs-sync`            | Daidaiton sigar CHANGELOG / OpenAPI / llm.txt                                                                                                                                                            | Eh                             |
| ↳ `check:docs-counts`          | Ƙididdiga a cikin rubutu (adadin providers, adadin migrations, da sauransu) suna cikin tazarar ratchet na ainihin ƙididdiga                                                                              | Eh                             |
| ↳ `check:env-doc-sync`         | Ana bayyana kowace env var da ke cikin `.env.example` a cikin teburin docs, kuma akasin haka                                                                                                             | Eh                             |
| ↳ `check:deprecated-versions`  | Babu tsoffin sigogi a cikin docs                                                                                                                                                                         | Eh                             |
| ↳ `check:doc-links`            | Hanyoyin haɗin markdown na cikin gida a cikin docs suna warwarewa zuwa fayiloli na gaske (`[text]`/`(path)` form)                                                                                        | Eh                             |
| ↳ `check:fabricated-docs`      | Routes, env vars, CLI commands, sunayen hooks, da hanyoyin fayilolin da aka ambata a cikin docs suna wanzuwa a cikin codebase. Ƙofa mai tsauri ta `--strict`; ba tare da flag ɗin ba, gazawa mai laushi. | Eh (ta hanyar `--strict` a CI) |
| `check:cli-i18n`               | Ana samun igiyoyin CLI command a cikin dukkan fayilolin i18n locale                                                                                                                                      | Eh                             |
| `check:openapi-coverage`       | Bayanin OpenAPI ya rufe aƙalla ƙaramar iyakar routes na gaske da aka tsara ta ratchet                                                                                                                    | Eh                             |
| `check:openapi-security-tiers` | Bayanan matakan tsaro a cikin `openapi.yaml` sun yi daidai da rarrabawar `routeGuard.ts`                                                                                                                 | **Na shawara**                 |
| `check:openapi-routes`         | Kowace hanya a cikin `openapi.yaml` tana warwarewa zuwa ainihin `route.ts` (anti-hallucination)                                                                                                          | Eh                             |
| `check:docs-symbols`           | Kowace magana ta `/api/...` a cikin `docs/**/*.md` tana warwarewa zuwa ainihin `route.ts` (anti-hallucination)                                                                                           | Eh                             |
| `i18n translation drift`       | Maɓallan da ba a fassara ba a cikin fayilolin i18n locale — gargaɗi kawai                                                                                                                                | **Na shawara**                 |

SVG goma sha biyu na README da ke ƙarƙashin `docs/diagrams/` ana samar da su ta atomatik (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` yana sake samar da dukkaninsu). Kowannensu yana da unit test na kwatanta bytes
(`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) wanda ke kasawa idan fayil ɗin da aka yi commit bai sabunta ba, kuma `check:docs-counts` yana karanta lambobin asali daga nodes ɗin `<text>` — shi ya sa matakin outlining yake adana kowace igiyar da aka yi outline a cikin fayil a matsayin `<text>` marar ganuwa. Binciken lambobin asali na SVG yana karanta fayilolin da aka jera a
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, tare da `public/images/tier-flow-dark.svg` da `tier-flow-light.svg`;
ikiran free-forever, catalog-entry, recurring-pool da scoring-factors su ma suna karanta
`promise-pillars.svg`, `free-tier-budget.svg` da `strategies-grid.svg`. `free-tier-budget.svg`
yana zana adadinsa daga live catalog loader, saboda haka canji ga `FREE_MODEL_BUDGETS` ko sunan nunawar provider yana sa CI ya kasa har sai an sake samar da wannan fayil.

### Aiki: `i18n-ui-coverage`

| Script                            | Abin da yake tantancewa                                                                                                                                                                                  | Toshewa        |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | Rufe maɓallan UI i18n ya kai ≥ 65%                                                                                                                                                                       | Eh             |
| `check-ui-value-drift` (inline)   | Sake rubuta Turanci **value** ba ya barin tsohuwar fassara a baya                                                                                                                                        | Eh             |
| `check-new-key-coverage` (inline) | Ana fassara sabuwar maɓallin Turanci **a cikin kowane locale** — ana ƙin alamar `__MISSING__:`                                                                                                           | Eh             |
| `check-translation-ratio`         | Matsakaicin fassara ta gaske ga kowane locale (identical-to-English / placeholder / missing da aka bari a wajen allowlist) bai kamata ya wuce `config/quality/i18n-translation-baseline.json` + slack ba | **Na shawara** |

Yana buƙatar `fetch-depth: 0` — gate ɗin value-drift yana kwatanta `en.json` da merge base.

#### `check-ui-value-drift` — gate ɗin tsohuwar fassara

Yana kama koma bayan i18n guda ɗaya da sauran ƙofofin bincike ba za su iya ganowa ta fuskar tsari ba: ana sake rubuta wata ƙimar Turanci, sannan fassarorin da aka samo daga Turancin _previous_ sukan kasance a baya, don haka masu amfani da harsunan da ba Turanci ba su ci gaba da karanta rubutu mai kama da na tabbaci, amma yanzu ba daidai ba.

An tura wannan a zahiri. An sake rubuta `oauthModal.googleOAuthWarning` lokacin da aka ƙara mai taimakon shiga na Antigravity (#5203); **39 daga cikin locales 43** sun ci gaba da nuna wa masu aiki cewa su “kwafi cikakkiyar URL sannan su manna ta a ƙasa” — wani tsari da ba zai iya kammaluwa ga wannan mai bayarwa ba. Ba a lura da hakan ba sai #8463 saboda:

- `sync-ui-keys` yana cike keys da suka **ɓace** kawai, ba waɗanda suka **tsufa** ba;
- `check-ui-keys-coverage` yana ƙirga kasancewar key, don haka fassarar da ta tsufa tana samun matsayin an rufe ta;
- `check-translation-drift` yana bin kwafin takardun `docs/i18n/<locale>/**.md` —
  ba ya karanta `src/i18n/messages/*.json`. Yana toshewa a cikin job `docs-sync-strict` tun bayan sake daidaitawar 2026-09: gyara wata babbar takarda → `npm run i18n:run -- --files=<doc>` (a matakin sashe, kuma mai sauƙi).

**Yana kula da bambancin canji, ba ya dogara da baseline ba.** Yana kwatanta `en.json` da ke merge base da working tree; ga kowace key da ƙimar Turancinta ta canza, duk locale da har yanzu ke riƙe da fassarar da ba a taɓa ta ba ta tsufa. Wannan da gangan yana **daskarar da bashin da ya riga ya wanzu** — bambanci ba zai iya bayyana daga wane tsohon Turanci fassarar da ta daɗe ta samo asali ba, don haka ƙofar tana tantance abin da canjin yanzu ya taɓa ne kawai. Madadin haka (baseline hash na kowace key) zai kashe fayil ɗin da aka samar mai kusan 600 KB, sau 3 girman mafi girman baseline na yanzu, kuma ya riƙa canzawa a kowane i18n PR.

Akwai hanyoyi biyu na cika sharadin:

1. sabunta fassarorin da abin ya shafa, ko
2. saita su zuwa `__MISSING__:<new english>` — runtime zai ba da Turancin da aka gyara (`src/i18n/request.ts::deepMergeFallback`, #7258), sannan key ɗin ta shiga jerin aikin fassara.

Idan **ma'anar** jimlar ta canza, fi son **sake sunan key**: sabuwar key ba za ta iya gādon fassarar da ta tsufa ba. Wannan shi ne tsarin da #8463 ya yi amfani da shi.

```bash
npm run i18n:check-value-drift          # mai tsauri (abin da CI ke gudanarwa)
npm run i18n:check-value-drift:warn     # rahoto kawai
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Yana fita da 0 tare da `SKIP reason=base-unresolved` lokacin da ba za a iya karanta base catalog ba (shallow clone ba tare da base ref ba), kamar yadda `check-openapi-breaking` yake yi.

### Aiki: `i18n`

Cikakkiyar matrix na tabbatar da i18n (aiki guda ga kowane locale). Aikin gaba ɗaya na ba da shawara ne.

| Script                          | Abin da yake tantancewa          | Toshewa                                                          |
| ------------------------------- | -------------------------------- | ---------------------------------------------------------------- |
| `validate_translation.py quick` | Cikawar fassara ga kowane locale | **Na shawara** (`continue-on-error: true` a kan aikin gaba ɗaya) |

### Aiki: `pr-test-policy`

Yana gudana ne kawai a kan pull requests.

| Script                 | Abin da yake tantancewa                                                                                                                 | Toshewa |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:pr-test-policy` | PRs da suka canza lambar samarwa a cikin `src/`, `open-sse/`, `electron/`, ko `bin/` dole su haɗa ko su sabunta tests (Hard Rule #8)    | Ee      |
| `check:test-masking`   | Fayilolin test da aka canza ba sa rage jimillar assert ko ƙara tautologies na `assert.ok(true)`                                         | Ee      |
| `check:pr-evidence`    | Rubutun PR yana ambaton shaidar test/VPS game da canjin (yana aiwatar da Hard Rule #18 ta bincika rubutun PR — mai rauni, duba Backlog) | Ee      |

### Aiki: `test-vitest`

Yana gudana bayan `build`. Rashin nasara yana toshe merge.

| Suite            | Abin da yake tantancewa                                              | Toshewa                                                                                                                   |
| ---------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Sabar MCP (kayan aiki 110), autoCombo, cache — mai gudanar da vitest | Ee                                                                                                                        |
| `test:vitest:ui` | Gwaje-gwajen abubuwan UI — mai gudanar da vitest                     | **Toshewa** — an ware gazawar da ta riga ta wanzu a fili a cikin `vitest.config.ts`; sabbin gazawa za su sa aikin ya gaza |

### Ayyukan dare (an tsara su, na shawara)

Waɗannan suna gudana bisa jadawalin cron (da `workflow_dispatch`), ba sa gudana a kan PRs. Dukkansu na shawara ne.

| Aiki                   | Yana tabbatar da                                                                                                                                                                               | Toshewa    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `nightly-property`     | gwaje-gwajen kadarorin fast-check tare da bazuwar iri + yawan gudanarwa mai yawa                                                                                                               | **Nasiha** |
| `nightly-resilience`   | ƙofar haɓakar heap, allurar kuskuren chaos, da lodin/soak na k6                                                                                                                                | **Nasiha** |
| `nightly-llm-security` | kariyar allurar promptfoo (yanayin toshewa) + binciken garak (ana tsallakewa idan babu sirrin mai bayarwa)                                                                                     | **Nasiha** |
| `nightly-schemathesis` | gwajin fuzzing na kwangilar OpenAPI (schemathesis) a kan OmniRoute mai aiki ta amfani da `docs/openapi.yaml` — yana bayyana keta ƙa'idar bayani / 500s da ba a kula da su ba (Mataki na 8 B.4) | **Nasiha** |
| `nightly-mutation`     | maki na gwajin mutation na Stryker a kan layin unit mai sauri — mutants da suka tsira suna bayyana asserts marasa ƙarfi                                                                        | **Nasiha** |
| `nightly-compat`       | matrix ɗin daidaituwar injin Node a cikin zangon `engines.node` da ake tallafawa                                                                                                               | **Nasiha** |

Ana rubuta ma'aunan tushe na aiki (heap, TTFB, lokacin ginawa), ba a sanya su sharadi ba: duba [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
