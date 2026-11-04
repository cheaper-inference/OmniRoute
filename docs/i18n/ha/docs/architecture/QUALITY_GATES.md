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

## Kundin ƙofofi da bayanan aiwatarwa

### Shigar da ɗan takara

Ayyukan CI da Quality Gates kowannensu suna fitar da hukunci tabbatacce: `Gate / CI` da
`Gate / Quality`. Manufar shigarwar da aka tsara da sigar aiki tana jera kowane aikin sama
a matsayin wajibi ko na shawara. Aikin wajibi da ya dace dole ne ya yi nasara: sakamakon da
ya ɓace, aka soke, aka tsallake, yake jiran aiki ko ba a sani ba ba zai iya tabbatar da PASS
ba. Rarrabuwa ingantacciya ta docs-only ko catalog-only na iya sa layin lambar ya zama
wanda bai dace ba; PR na draft ba ɗan takarar da aka amince da shi ba ne. Lakabin `hotfix`
ba ya kawar da buƙatar hujja.

Dukkan ayyukan biyu suna rufe PRs da ake shigarwa zuwa rassan main/release, turawa zuwa
`main`, dispatch na hannu da abubuwan merge-group. Push, dispatch da merge-group suna gudanar
da cikakken zaɓi. Turawa zuwa `release/**` ba sa fara su (2026-10-18): kowane canji ya riga
ya gudanar da matrix a PR ɗinsa, kuma haɗin da aka haɗa aiki ne na Release-Green
(`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks da merge groups suna amfani da hosted runners
ga ayyukan da in ba haka ba za su zaɓi self-hosted runners; dole ne a tabbatar da isasshen
ikon hosted kafin ƙaddamarwa.

Kowane rasit na JSON yana gano SHA da aka checkout, run na workflow da ƙoƙari.
CLI yana ƙin karɓar rashin daidaiton checkout/event SHA. Gwaje-gwajen workflow suna ɗaure
membobin manufofi da jerin `needs` na aikin hukunci domin sabon lane ko wanda aka cire kada
ya ɓace ba tare da an lura ba. Rasitocin suna rufe workflow ɗinsu ne kawai, ba wallafawa,
ƙaddamarwa ko bayanan cikin wani scanner na shawara da yake wanzu ba. Kunna sunayen checks
biyu a dokokin reshe wani canjin gudanarwa ne dabam; ƙara waɗannan ayyukan kaɗai ba ya
kare reshe.

### Kundin binciken tsaye

Kundin npm-alias mai siga da membobin static-scan suna cikin
`config/quality/gate-manifest.json`. Gudanar da `npm run check:gate-manifest` domin tabbatar da
sunayen scripts da ainihin umarni bisa ga `package.json`; ƙari, cirewa da karkatar umarni
suna gaza duka hook na gida da ayyukan rarrabuwar canji a CI.
Alias ba aikin workflow ba ne, ba misalin matrix ba ne, kuma ba yanayin gwaji ba ne: bai kamata
a gabatar da waɗannan ƙididdiga a matsayin abubuwan da za a musanya da juna ba.

Yi amfani da `npm run quality:scan -- --list` ko `npm run quality:scan:fast -- --list`
domin duba aliases da aka zaɓa ba tare da aiwatar da su ba. Runner yana kiran npm entrypoint,
don haka ana kiyaye runtime ɗinsa (har da Bun inda aka tsara shi).
Manifest yana yin rikodin aliases da suke wajen waɗannan bayanan aiwatarwa a matsayin waɗanda
ake kiran su daban, kuma an hana umarnin kulawa a cikin bayanan binciken karatu-kawai.

Waɗannan bayanan aiwatarwa suna rufe static scan ne kawai. Ba sa tabbatar da gwaje-gwajen
samfuri, coverage, packaging, binciken waje ko cikakkiyar amincewar sakin ɗan takara.
Shigarwar workflow tana amfani da `config/quality/admission-policy.json` da
`scripts/quality/admission-verdict.mjs`. Bayanai na aiwatarwa na Release-observer suna nan
dabam; bincika checks da rasitocin da suka dace da su daban. Kundin bayanin da ke ƙasa
abin tunani ne, ba hujjar cewa an gudanar da wata ƙofa ba.

Scripts suna ƙarƙashin `scripts/check/` (ƙofofin manufofi) da `scripts/quality/`
(injin ratchet). Asalin gaskiyar CI yana cikin `.github/workflows/ci.yml`.

### Hanyar gaggawa ta Release PR (`quality.yml`)

`.github/workflows/quality.yml` yana ƙara wa CI ƙarfi a kan PRs na main/release, turawa zuwa
`main`, dispatch da merge groups. PRs suna amfani da gwaje-gwajen gaggawa da aka tace bisa
hanyoyi. An cire aikin build na kwafi da aka kashe na dindindin; ainihin gwaje-gwajen
build/package/boot suna nan cikin CI.

| Aiki                                             | Iyakar aiki                                                                                                                                                                                                                                  | Toshewa          |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `Docs Gates (fast-path)`                         | PRs na docs/code; nassoshin API docs da docs-all                                                                                                                                                                                             | Ee               |
| `Fast Quality Gates`                             | PRs na code; bincike na tsaye, typecheck, typecheck na dashboard, gwaje-gwajen unit da abin ya shafa                                                                                                                                         | Ee               |
| `Forgotten sibling tests`                        | PRs na code; modules da aka canza waɗanda aka bibiyi zuwa masu amfani da static da gwaje-gwajen sibling na ɗan takara; ana bayar da hanyoyin barrel da dynamic-import a matsayin bayanan shawara, tare da keɓancewar allowlist da aka ambata | **Na shawara**   |
| `Vitest (fast-path)`                             | PRs na code; rukunin vitest mai sauri                                                                                                                                                                                                        | Ee               |
| `Unit Tests fast-path`                           | PRs na code; rukunin unit mai shards 4                                                                                                                                                                                                       | Ee               |
| `No new ESLint warnings`                         | PRs na code; tsaron lint da ke lura da suppressions                                                                                                                                                                                          | Ee, har da forks |
| `Merge integrity (changelog + generated skills)` | PRs marasa draft; daidaita changelog da generated skill                                                                                                                                                                                      | Ee, har da forks |

#### Rahoton Forgotten sibling tests

`npm run check:forgotten-sibling-tests` yana sake amfani da mai warware imports da ke bayan taswirar tasirin gwaje-gwaje.
Ga kowane tsarin samarwa da aka canza, yana bayar da tsararrun
`changed module/symbol -> static consumer -> candidate sibling test` jerin alaƙa lokacin da gwajin da ake nema
ba ya cikin bambancin pull request. Ana adana taƙaitaccen Markdown da sakamakon JSON a matsayin
abin aikin workflow na `forgotten-sibling-tests` domin daidaitawa kafin a fara aiwatar da toshewa.

Sake fitarwa ta barrel da imports masu canzawa na daga cikin binciken warwarewa kawai; ba sa taɓa ƙirƙirar
sakamakon da zai toshewa. Keɓancewar da aka duba tana cikin
`config/quality/forgotten-sibling-allowlist.json`. Kowace shigarwa dole ta ambaci mai amfani da candidate
test, ta ba da takamaiman dalili, kuma ta haɗa da issue ko pull request na GitHub. Shigarwar da ba ta da tsari mai kyau
za ta kasa cikin yanayin rufewa. Keɓancewa ba za ta iya dakile share candidate test ko bambancin da ya ƙara `.skip`/`.todo` ba;
raunana assertions da sauran hanyoyin ɓoye matsala suna ƙarƙashin ikon ƙofar
`check:test-masking` mai toshewa da kanta.

### Aiki: `lint`

Yana gudana a kowace PR zuwa `main`. Yana toshe haɗewa idan ya gaza.

| Rubutun (`npm run ...`)           | Yana tantance                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Toshewa                                    |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Sigar Node.js tana cikin kewayon da ake tallafawa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Eh                                         |
| `check:cycles`                    | Shigo da fayiloli masu madauwari a cikin dukkan `src/` + `open-sse/` (na tushen AST, an warware `paths` na tsconfig). Bare yana fita da 1 duk lokacin da akwai wani cycle (yana hana wucewa tun daga #15281) kuma yana jera SCCs. `check:cycles:ratchet` (abin da CI ke gudanarwa) yana toshewa lokacin da adadin ya wuce iyakar `metrics.cycles` a cikin `quality-baseline.json` — a halin yanzu 14, `direction: down`, don haka zai iya raguwa kawai (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Eh (ratchet)                               |
| `check:boundary`                  | Haɗin `open-sse → src`: shigo da fayil-zuwa-fayil na musamman daga engine zuwa app (`scripts/quality/measure-boundary.mjs`; jerin gefuna shi ne jerin ayyukan gyaran v4 core/module-split). Bare = rahoton shawara (daidai da `quality:boundary`). `check:boundary:ratchet` (abin da CI ke gudanarwa, kuma yana cikin madaukin ratchet na fast-gates na `quality.yml`) yana toshewa lokacin da adadin ya wuce iyakar `metrics.boundaryOpenSseToSrc` a cikin `quality-baseline.json` — an fara saita shi a 771 da aka auna, `direction: down`; `--update` yana rage shi kawai; a kan PRs ana danganta shi da tushe (`--base-ref`, duba ƙasa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Eh (ratchet)                               |
| `check:route-validation:t06`      | Tsare-tsaren Zod suna nan a dukkan routes (manufar Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Eh                                         |
| `check:any-budget:t11`            | Ƙididdigar `@ts-expect-error // any` ba ta wuce kasafi ba (katangar Tier 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Eh                                         |
| `check:provider-consistency`      | Kowane mai samarwa a cikin `providers.ts` yana da shigarwa mai dacewa a cikin `providerRegistry.ts` (da akasin haka, cikin jerin waɗanda aka amince da su)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Eh                                         |
| `check:model-lifecycle`           | Teburan kewayawa guda uku da ake kula da su da hannu suna nan cikin daidaito da hoton yanayin rayuwa da aka shigar cikin ma'ajiyar lambar (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ba ya ba da maki ga wani ID da aka yi ritaya wanda `REGISTRY` zai iya kewayawa zuwa gare shi; kowane makasudin `BUILT_IN_ALIASES` yana cikin `REGISTRY` kuma ba ya cikin hoton ID-ɗin da aka yi ritaya; kowane ID da aka yi ritaya da har yanzu yake cikin `REGISTRY` ana tura shi gaba ko kuma an jera shi a cikin `allowedRetiredInCatalog`; kuma babu wata tushe ko makasudi na `DEFAULT_DEGRADATION_MAP` da ya bayyana a matsayin wanda aka yi ritaya a cikin wannan hoton. Wannan ba ya tabbatar da cewa wani samfurin ana samar da shi a halin yanzu ta wani sabis na sama mai aiki. Ba ya buƙatar hanyar sadarwa — yana kwatanta da `config/quality/model-lifecycle.json`, wanda ake sabunta shi da hannu ta amfani da `npm run quality:refresh-model-lifecycle` (hanyar sadarwa; ba a haɗa shi cikin CI ba). `allowedRetiredInCatalog` ma'aunin rage ragowa ne: ƙara shigarwa ne kawai tare da batun bin diddigi. | Eh                                         |
| `check:fetch-targets`             | Kowane `fetch("/api/...")` a cikin `src/` na ɓangaren abokin ciniki yana warwarewa zuwa ainihin `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Eh                                         |
| `check:deps`                      | Dukkan dogaro da za a iya girkawa ta `npm install` a cikin kowane `package.json` na ma'ajiyar lambar suna cikin `dependency-allowlist.json`; ana yi wa sabbin kunshe-kunshe marasa kulle sigar ko waɗanda aka sace musu suna alama                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Eh                                         |
| `audit:deps`                      | `npm audit` (tushen ma'ajiyar lambar + electron) — babu shawarwarin tsaro masu tsanani ko masu matuƙar tsanani (ya yi karo da osv `check:vuln-ratchet`; duba Jerin ayyukan da suka rage na daidaitawa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Eh                                         |
| `check:lockfile`                  | `package-lock.json` integrity — rajistar https, hashes na integrity, babu sauye-sauyen host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Eh                                         |
| `check:licenses`                  | Jerin lasisin SPDX da aka yarda da su don dogaro na samarwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Eh                                         |
| `check:tracked-artifacts`         | Babu kayan aikin ginawa / symlinks na `node_modules` da aka ƙaddamar (yana kuma gudana a cikin husky pre-commit; pre-push an bar shi da gangan ya kasance mai sauƙi — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Eh                                         |
| `check:ai-attribution`            | Babu trailer na `Co-Authored-By` na AI/bot ko footer na samarwar AI a cikin commit na PR, take ko jiki — Ƙa’ida Mai Tsauri #16 (a cikin madauki na fast-gates na `quality.yml` don PR→`release/**` — yana karanta bayanan taron, ba ya yin komai idan ba PR ba — da kuma mataki na PR-kawai a cikin lint na `ci.yml` don PR→`main`; haka kuma hook na husky `commit-msg`; an yarda da masu haɗin gwiwar mutane; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:vitest-exclusions`         | Kowace keɓewar Vitest tana ambaton batun bin diddigi kuma tana bayyana a cikin `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Eh                                         |
| `check:file-size`                 | Fayilolin tushe (`.ts`/`.tsx` a cikin `src/`, `open-sse/`, `electron/`, `bin/`) su kasance cikin iyakar `cap`, sannan fayilolin gwaji (`*.test.ts(x)`) su kasance cikin `testCap`; fayilolin da aka daskare a cikin `file-size-baseline.json` (`frozen` / `testFrozen`) ba za su girma fiye da girman da aka rubuta musu ba                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Eh                                         |
| `check:error-helper`              | Amsoshin kuskure a cikin masu aiwatarwa/masu sarrafawa suna amfani da `buildErrorBody()` / `sanitizeErrorMessage()` (Doka Mai Tsauri #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Eh                                         |
| `check:migration-numbering`       | Fayilolin SQL na ƙaura suna da lambobi a jere, ba tare da gibi ko maimaitawa ba                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Eh                                         |
| `check:public-creds`              | Babu `client_id`/`client_secret` na OAuth ko maɓallan Firebase Web na zahiri a wajen `publicCreds.ts` (Doka Mai Tsauri #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Eh                                         |
| `check:db-rules`                  | Babu SQL kai tsaye a wajen kayayyakin `src/lib/db/`; babu shigo da bayanai ta ganga daga `localDb.ts` (Dokoki Masu Tsauri #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Eh                                         |
| `check:known-symbols`             | Masu aiwatar da mai bayarwa, dabarun turawa, da masu fassara da aka yi rajista a cikin teburorin rabawa sun yi daidai da fayilolin da ke faifai — babu alamomin da suka zama marayu ko waɗanda ba a ayyana ba                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Eh                                         |
| `check:route-guard-membership`    | Kowace hanya da ke ƙaddamar da tsarin yaro ana rarrabe ta ta `isLocalOnlyPath()` (Dokoki Masu Tsauri #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Eh                                         |
| `check:test-discovery`            | Ana tattara kowane fayil ɗin `*.test.ts` / `*.spec.ts` da ke cikin repo ta aƙalla mai gudanar da gwaji guda ɗaya (ratchet: jerin marasa masu amfani a cikin `test-discovery-baseline.json` zai iya raguwa kawai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ee                                         |
| `check:test-tla-order`            | Babu wani fayil ɗin `node:test` a ƙarƙashin `tests/unit` da ke yin rijistar gwaji, ya isa ga `await` na matakin sama, sannan ya sake yin rijistar wasu gwaje-gwaje (#18045; ratchet: `test-tla-order-allowlist.json` zai iya raguwa kawai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ee                                         |
| `check:agent-skills-sync`         | Abubuwan da aka samar na agent-skills sun yi daidai da kundin tushensu (babu saɓani)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:provider-asset-provenance` | Tambura/abubuwan kadarorin mai samarwa suna ɗauke da shigarwar asalin da aka rubuta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `lint:json`                       | Fayilolin saitin JSON suna fassarawa kuma suna cika ƙa'idojin lint na repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `typecheck:core`                  | Tarawa na TypeScript ba tare da kurakurai ba (gargadin shawara kawai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ee                                         |
| `typecheck:noimplicit:core`       | `noImplicitAny` mai tsauri — na gaba; har yanzu wuraren kira da yawa da suka riga sun kasance suna buƙatar bayanan nau'i                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **Shawarwari** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` da aka takaita zuwa `src/app/(dashboard)/**` (#7033) — jerin fayiloli 27 da aka zaɓa na `typecheck:core` ba ya haɗa da kowane dashboard TSX, haka kuma `next build` ba ya taɓa duba nau'insa (`next.config.mjs` yana saita `ignoreBuildErrors: true`), don haka koma-bayan masu gano alamomin da suka zama marasa tushe a can (#6625/#6909) sun kasance ba a gani ga CI. Yana kwatanta bambance-bambance da ma'aunin ƙidaya na kowane fayil/kodin TS da aka daskare (`config/quality/dashboard-typecheck-baseline.json`, tsarin tilasta tsohon ma'auni iri ɗaya da na `check:known-symbols`) — kurakurai SABBI kawai da suka wuce ƙidayar ma'aunin ne ke sa ƙofar ta fadi; a rage ma'aunin da `--update` idan an gyara kuskuren da ya riga ya kasance.                                                                                                                                                                                                                                                                                                                                                     | Ee                                         |
| `check:build-typecheck`           | Cikakken duba nau'in aikace-aikacen samarwa a kan `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), wanda jerin fayiloli 27 na `typecheck:core` da aka zaɓa da ƙofar dashboard ba su rufe ba. Yana kwatanta bambance-bambance da `config/quality/build-typecheck-baseline.json`; sabon ƙidaya ko ƙidayar (fayil, kodin) da ta ƙaru yana sa binciken ya fadi, yayin da ƙidaya da ta ragu ke neman ka rage ma'aunin. `--update` yana ƙi aiki yayin da gudu ya ƙunshi sabon ma'auri ko wanda ya ƙaru sai an ba da `--force-regressions`, kuma yana ƙin fayil da aka rufe shiru a sabon salo sai an ba da `--force-nocheck`, don haka faɗaɗa ma'aunin don samun nasarar bincike da kuma ba da izinin yin shiru na dindindin ayyuka ne biyu daban-daban da aka yi da gangan. Ba a yarda da `--force` shi kaɗai ba. Haka kuma yana bincika iyakar ginin don `@ts-nocheck` a kan `config/quality/ts-nocheck-baseline.json`, domin fayil da ke amfani da shi ba ya bayar da kowace alamar bincike kuma da hakan zai kasance ba a gani ga kowace ƙofa.                       | Ee                                         |

#### Shirye-shiryen duba nau'i guda biyu suna ba da amsoshi daban-daban

`typecheck:core` da `check:build-typecheck` suna haɗa shirye-shirye daban-daban
ƙarƙashin zaɓuɓɓuka daban-daban, kuma fayil iri ɗaya na iya zama babu matsala a
ɗaya amma ya cika da kurakurai a ɗayan.

`tsconfig.build.json` yana saita `"strict": false`, don haka `noImplicitAny` a kashe yake. Tsarin
core yana haɗa jerin fayiloli 27 da aka zaɓa tare da zaɓuɓɓuka masu tsauri kuma yana
bi diddigin jadawalin shigo da kowane shigarwa, don haka fayilolin da ba su taɓa
bayyana a cikin shirin gini ba ana duba su a can.

Sakamakon yana da muhimmanci yayin tantance ko an rubuta nau'in fayil: **babu
alamun bincike a ƙarƙashin `check:build-typecheck` ba ya nufin babu komai**. Cire
`@ts-nocheck` daga fayiloli 26 ya nuna cewa 23 daga cikinsu ba su da matsala a cikin
shirin gini; goma sha shida daga cikinsu sun bayyana kusan kurakuran implicit-any
120 a cikin tsayayyen shirin. Duba duka biyun kafin ka ce fayil ba shi da matsala.

### Aiki: `quality-gate`

Yana gudana bayan `test-coverage`. Yana hana haɗa canje-canje idan ya gaza.

| Script                       | Yana tantance                                                                                                                                                                                                     | Toshewa                 |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `quality:collect`            | Yana fitar da `quality-metrics.json` (adadin gargaɗin ESLint, da coverage daga rahoton shard da aka haɗa)                                                                                                         | Eh (na sama da ratchet) |
| `quality:ratchet`            | Kowanne ma'auni a cikin `quality-baseline.json` bai koma baya ba (gargaɗin ESLint ≤ baseline; coverage ≥ baseline)                                                                                                | Eh                      |
| `check:duplication`          | Maimaituwar lamba (jscpd@4) ba ta wuce baseline a cikin `quality-baseline.json` ba                                                                                                                                | Eh                      |
| `check:complexity`           | Rikitarwar cyclomatic a matakin fayil ba ta wuce iyaka ba (core ESLint `complexity` + `max-lines-per-function`)                                                                                                   | Eh                      |
| `check:cognitive-complexity` | Ratchet na rikitarwar fahimta (`eslint-plugin-sonarjs`) — wani binciken ESLint na dabam; CI yana gudanar da su biyun a haɗe a matsayin mataki guda na `check:complexity-ratchets`                                 | Eh                      |
| `check:dead-code`            | Ratchet na fitarwa / fayilolin da ba a yi amfani da su ba (knip) bai koma baya ba idan aka kwatanta da baseline                                                                                                   | Eh                      |
| `check:compression-budget`   | Kasafin ma'aunin matsawar bayanai — matakan ƙarancin tanadin tokens na kowane engine ba su koma baya ba                                                                                                           | Eh                      |
| `check:type-coverage`        | Ratchet na kaso mai nau'in type (`type-coverage`) bai koma baya ba; galibi yana maye gurbin `typecheck:noimplicit:core`                                                                                           | Eh                      |
| `check:codeql-ratchet`       | Adadin faɗakarwar CodeQL da ke buɗe bai koma baya ba (yana karantawa ta `gh api`; yana tsallakewa cikin ladabi ba tare da token ba) — don jadawalin sabuntawa da kunna shi da hannu: duba "CodeQL ratchet" a ƙasa | Eh                      |

### Aiki: `quality-extended`

Dukan aikin na ba da shawara ne (`continue-on-error: true`). Ratchet na tushen npm suna gudana
a zahiri; na'urorin bincike na waje suna girkawa ta `gh release download` kuma suna tsallake kansu (exit 0)
idan har binary bai kasance ba.

| Script                   | Yana tantance                                                                                                                                                                                                                                       | Toshewa                                                    |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `check:circular-deps`    | Babu dogarorin da suke zagaye (dpdm)                                                                                                                                                                                                                | **Na ba da shawara**                                       |
| `check:bundle-size`      | Girman bundle bai wuce iyaka ba                                                                                                                                                                                                                     | **Na ba da shawara**                                       |
| `check:secrets`          | Binciken sirrika (gitleaks) — yana tsallakewa idan binary bai kasance ba                                                                                                                                                                            | **Na ba da shawara**                                       |
| `check:vuln-ratchet`     | Lalurar dogaro (osv-scanner) ba ta koma baya ba — yana tsallakewa idan binary bai kasance ba                                                                                                                                                        | **Na ba da shawara**                                       |
| `check:workflows`        | Lint na workflow (actionlint + zizmor); rashin scanners ko lalacewarsu, rahotannin da ba su inganta ba ko rashin baseline na ratchet suna fadi a matsayin INCOMPLETE. Sakamakon da aka inganta yana bin manufar strict/advisory/ratchet da aka zaɓa | Ana buƙatar aiwatarwa; ratchet na zizmor yana toshewa a CI |
| `check:openapi-breaking` | Sauye-sauyen da ke karya kwangilar API ta jama'a (`openapi.yaml`) idan aka kwatanta da reshen tushe (oasdiff) — yana fitar da `openapiBreaking=N`; yana tsallakewa idan oasdiff bai kasance ba ko ba a iya warware spec na tushe ba                 | **Na ba da shawara**                                       |

### Aiki: `docs-sync-strict`

Yana gudana a kowace PR zuwa `main`. Yana hana haɗa canjin idan ya gaza.

| Script                         | Yana tantance                                                                                                                                                                        | Yana toshewa                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------ |
| `check:docs-all`               | Meta-gate da ke gudanar da ƙananan gates 6 da ke ƙasa a jere                                                                                                                         | Ee                             |
| ↳ `check:docs-sync`            | Daidaiton sigar CHANGELOG / OpenAPI / llm.txt                                                                                                                                        | Ee                             |
| ↳ `check:docs-counts`          | Ƙididdiga a cikin rubutu (adadin masu samarwa, adadin ƙaura, da sauransu) suna cikin iyakar ratchet na ainihin ƙididdiga                                                             | Ee                             |
| ↳ `check:env-doc-sync`         | Ana rubuta kowace env var a cikin `.env.example` a teburin docs, kuma akasin haka                                                                                                    | Ee                             |
| ↳ `check:deprecated-versions`  | Babu tsoffin sigogi a cikin docs                                                                                                                                                     | Ee                             |
| ↳ `check:doc-links`            | Hanyoyin markdown na cikin gida a cikin docs suna nuni zuwa fayiloli na gaske (`[text]`/`(path)` form)                                                                               | Ee                             |
| ↳ `check:fabricated-docs`      | Hanyoyi, env vars, umarnin CLI, sunayen hook, da hanyoyin fayil da aka ambata a docs suna wanzuwa a codebase. Gate mai tsauri ta `--strict`; ba ya hana aiki ba tare da flag ɗin ba. | Ee (ta hanyar `--strict` a CI) |
| `check:cli-i18n`               | Kirtan umarnin CLI suna cikin duk fayilolin i18n na harsuna                                                                                                                          | Ee                             |
| `check:openapi-coverage`       | Bayanin OpenAPI ya rufe aƙalla ƙaramar iyakar ratchet na hanyoyi na gaske                                                                                                            | Ee                             |
| `check:openapi-security-tiers` | Bayanan matakan tsaro a cikin `openapi.yaml` sun yi daidai da rarrabawar `routeGuard.ts`                                                                                             | **Na shawara**                 |
| `check:openapi-routes`         | Kowace hanya a cikin `openapi.yaml` tana nuni zuwa ainihin `route.ts` (hana ƙirƙirar bayanan ƙarya)                                                                                  | Ee                             |
| `check:docs-symbols`           | Kowace magana ta `/api/...` a cikin `docs/**/*.md` tana nuni zuwa ainihin `route.ts` (hana ƙirƙirar bayanan ƙarya)                                                                   | Ee                             |
| `i18n translation drift`       | Maɓallan da ba a fassara ba a fayilolin i18n na harsuna — gargaɗi kawai                                                                                                              | **Na shawara**                 |

An ƙirƙiri SVG goma sha biyu na README da ke ƙarƙashin `docs/diagrams/` ta atomatik (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` yana sake ƙirƙirar dukansu). Kowannensu yana da gwajin unit na kwatanta bytes (`tests/unit/docs/readme-*-svg.test.ts`, aikin `test-unit`) wanda ke kasa idan fayil ɗin da aka ƙaddamar ya tsufa, kuma `check:docs-counts` yana karanta lambobin tushe daga nodes ɗin `<text>` — shi ya sa matakin outlining yake barin kowace kirtani da aka yi outline a cikin fayil a matsayin `<text>` marar gani. Gwajin lambobin tushe na SVG yana karanta fayilolin da aka jera a cikin `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, da kuma `public/images/tier-flow-dark.svg` da `tier-flow-light.svg`; ikirarin free-forever, catalog-entry, recurring-pool da scoring-factors su ma suna karanta `promise-pillars.svg`, `free-tier-budget.svg` da `strategies-grid.svg`. `free-tier-budget.svg` yana samo alkalummansa daga mai ɗora catalog na aiki, don haka canji ga `FREE_MODEL_BUDGETS` ko sunan nunawar mai samarwa yana sa CI ya nuna ja har sai an sake ƙirƙiri wannan fayil.

### Aiki: `i18n-ui-coverage`

| Script                            | Yana tantance                                                                                                                                                                                      | Yana toshewa   |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | Rufe maɓallan i18n na UI ya kai ≥ 65%                                                                                                                                                              | Ee             |
| `check-ui-value-drift` (inline)   | Sake rubuta **value** na Turanci ba ya barin tsohuwar fassara a baya                                                                                                                               | Ee             |
| `check-new-key-coverage` (inline) | Ana fassara kowane maɓallin Turanci **sabo** a duk harsuna — ana ƙin alamar `__MISSING__:`                                                                                                         | Ee             |
| `check-translation-ratio`         | Rabon fassara ta gaske ga kowane harshe (mai kama da Turanci / placeholder / wanda ya ɓace da ba ya cikin allowlist) bai kamata ya wuce `config/quality/i18n-translation-baseline.json` + slack ba | **Na shawara** |

Yana buƙatar `fetch-depth: 0` — gate na karkacewar ƙima yana kwatanta `en.json` da merge base.

#### `check-ui-value-drift` — gate na tsohuwar fassara

Yana kama koma bayan i18n guda ɗaya da sauran ƙofofin tantancewa ba za su iya gani ta fuskar tsari ba: an sake rubuta wata ƙimar Turanci
kuma fassarar da aka samo daga tsohuwar Turancin ta kasance yadda take, don haka
masu amfani da ba Turanci ba suna ci gaba da karanta rubutu mai sauti na tabbaci, amma yanzu ba daidai ba.

An fitar da wannan da gaske. An sake rubuta `oauthModal.googleOAuthWarning` lokacin da aka ƙara mataimakin
shiga na Antigravity (#5203); **39 daga cikin harsuna 43** sun riƙe rubutun da ke gaya wa masu aiki su “kwafi
cikakkiyar URL su manna ta a ƙasa” — wani tsari da ba zai iya kammala wa wannan mai samarwa ba. Ba a lura da shi ba sai #8463 saboda:

- `sync-ui-keys` yana cike maɓallan da **ba su nan** kawai, ba waɗanda suka **tsufa** ba;
- `check-ui-keys-coverage` yana ƙirga **kasancewar** maɓalli, don haka fassarar da ta tsufa tana samun ƙima kamar an rufe ta;
- `check-translation-drift` yana bibiyar kwafin takardun `docs/i18n/<locale>/**.md` —
  ba ya karanta `src/i18n/messages/*.json`. Yana toshewa a aikin `docs-sync-strict` tun bayan sake daidaitawar
  2026-09: gyara wata babbar takarda → `npm run i18n:run -- --files=<doc>` (a matakin sashe, kuma mai arha).

**Yana kula da bambanci, ba ma’adanar tushe ba.** Yana kwatanta `en.json` da ke kan tushen haɗin kai da
itacen aiki; ga kowane maɓalli da ƙimar Turancinsa ta canza, duk wani yare da har yanzu yake riƙe da
fassarar da ba a taɓa ta ba yana da tsufa. Wannan da gangan yana **daskarar da bashin da ya riga ya kasance** — bambanci
ba zai iya bayyana daga wace tsohuwar Turanci fassarar da ta daɗe ta samo asali ba, don haka ƙofar tantancewa tana hukunci
ne kawai kan abin da canjin yanzu ya shafa. Madadin haka (ma’adanar hash ta kowane maɓalli) zai kashe kuɗin fayil
da aka samar mai girman kusan 600 KB, sau 3 girman ma’adanar da ta fi kowace girma a yanzu, tare da canzawa a kowane PR na i18n.

Akwai hanyoyi biyu na cika abin da ake buƙata:

1. sabunta fassarorin da abin ya shafa, ko
2. sa su zama `__MISSING__:<new english>` — lokacin aiki zai bayar da Turancin da aka gyara
   (`src/i18n/request.ts::deepMergeFallback`, #7258) kuma maɓallin zai shiga jerin fassara.

Idan **ma’anar** zaren ta canza, a fi son **sake wa maɓallin suna**: sabon maɓalli ba zai iya gādon
fassarar da ta tsufa ba. Wannan shi ne tsarin da #8463 ya yi amfani da shi.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Yana fita da 0 tare da `SKIP reason=base-unresolved` lokacin da ba za a iya karanta ma’adanar tushe ba (clone mai zurfi kaɗan
ba tare da ref ɗin tushe ba), daidai da `check-openapi-breaking`.

### Aiki: `i18n`

Cikakkiyar matrix ɗin tantancewar i18n (aiki ɗaya ga kowane yare). Aikin gaba ɗaya shawara ne kawai.

| Script                          | Abin da yake tantancewa        | Toshewa                                                          |
| ------------------------------- | ------------------------------ | ---------------------------------------------------------------- |
| `validate_translation.py quick` | Cikawar fassara ga kowane yare | **Na shawara** (`continue-on-error: true` a kan aikin gaba ɗaya) |

### Aiki: `pr-test-policy`

Yana gudana ne a kan pull request kawai.

| Script                 | Abin da yake tantancewa                                                                                                                     | Toshewa |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:pr-test-policy` | PRs da suka canza lambar samarwa a `src/`, `open-sse/`, `electron/`, ko `bin/` dole su ƙunshi ko su sabunta gwaje-gwaje (Dokar Ƙarfi #8)    | Eh      |
| `check:test-masking`   | Fayilolin gwaji da aka canza ba sa rage jimillar adadin assert ko ƙara tautologies na `assert.ok(true)`                                     | Eh      |
| `check:pr-evidence`    | Jikin PR yana ambaton shaidar gwaji/VPS ga canjin (yana aiwatar da Dokar Ƙarfi #18 ta hanyar binciken rubutun PR — mai rauni, duba Backlog) | Eh      |

### Aiki: `test-vitest`

Yana gudana bayan `build`. Yana toshe haɗewa idan ya gaza.

| Rukunin gwaje-gwaje | Abin da yake tantancewa                                              | Toshewa                                                                                                                     |
| ------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`       | Sabar MCP (kayan aiki 110), autoCombo, cache — mai gudanar da vitest | Eh                                                                                                                          |
| `test:vitest:ui`    | Gwaje-gwajen ɓangarorin UI — mai gudanar da vitest                   | **Yana toshewa** — an ware gazawar da ta riga ta kasance a sarari a `vitest.config.ts`; sabbin gazawa suna sa aikin ya gaza |

### Ayyukan dare (tsararru, na shawara)

Waɗannan suna gudana bisa jadawalin cron (da `workflow_dispatch`), ba sa gudana a kan PRs. Dukkansu na shawara ne kawai.

| Workflow               | Yana tantancewa                                                                                                                                                                          | Toshewa     |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | Gwaje-gwajen property na fast-check tare da bazuwar seed + yawan gudanarwa mai yawa                                                                                                      | **Shawara** |
| `nightly-resilience`   | Ƙofar haɓakar heap, shigar da kurakuran chaos, da gwajin lodi/ɗorewa na k6                                                                                                               | **Shawara** |
| `nightly-llm-security` | Kariyar allurar promptfoo (yanayin toshewa) + binciken garak (ana tsallakewa idan babu sirrin mai bayarwa)                                                                               | **Shawara** |
| `nightly-schemathesis` | Gwajin fuzz na kwangilar OpenAPI (schemathesis) a kan OmniRoute mai gudana ta amfani da `docs/openapi.yaml` — yana bayyana take dokokin bayani / 500s da ba a sarrafa su ba (Fase 8 B.4) | **Shawara** |
| `nightly-mutation`     | Makin gwajin mutation na Stryker a kan layin unit mai sauri — mutants da suka tsira suna bayyana asserts masu rauni                                                                      | **Shawara** |
| `nightly-compat`       | Matrix ɗin dacewar injin Node a tsakanin kewayon `engines.node` da ake tallafawa                                                                                                         | **Shawara** |

Ana yin rikodin ma’aunan aikin asali (heap, TTFB, lokacin gini), ba a sanya su a matsayin sharadin wucewa ba: duba [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
