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

Tsarukan aikin CI da Quality Gates kowannensu yana fitar da tabbataccen hukunci: `Gate / CI` da
`Gate / Quality`. Manufofin karɓarsu masu sigogi suna jero kowane aikin sama
a matsayin wajibi ko na shawara. Aikin wajibi da ya dace dole ne ya yi nasara: sakamakon da
babu, wanda aka soke, aka tsallake, yake jiran kammalawa ko ba a sani ba ba zai iya tabbatar da PASS ba. Ingantaccen
rarrabuwar docs-only ko catalog-only na iya sa layin lamba bai dace ba;
ba a karɓar daftarin PR a matsayin ɗan takara. Alamar `hotfix` ba ta soke buƙatar shaida.

Dukkan tsarukan aikin suna rufe PR zuwa rassan main/release, turawa zuwa `main`, kunnawa da hannu
da kuma abubuwan merge-group. Push, dispatch da merge-group suna gudanar da cikakken zaɓi. Turawa zuwa
`release/**` ba sa fara su (2026-10-18): kowane sauyi ya riga ya gudanar da matrix a kan PR ɗinsa
kuma haɗaɗɗen sakamakon aikin Release-Green ne (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks
da merge groups suna amfani da hosted runners ga ayyukan da in ba haka ba za su zaɓi self-hosted
runners; dole ne a tabbatar da isasshen ƙarfin hosted kafin ƙaddamarwa.

Kowane rasitin JSON yana bayyana SHA da aka checkout, gudun tsarin aiki da kuma ƙoƙarin.
CLI yana ƙin rashin daidaituwar SHA na checkout/event. Gwaje-gwajen tsarin aiki suna ɗaure kasancewar manufofi
da jerin `needs` na aikin hukunci domin kada sabon layi ko wanda aka cire ya ɓace ba tare da an lura ba.
Rasitan sun shafi tsarin aikinsu ne kawai, ba wallafawa, turawa zuwa aiki, ko abubuwan ciki
na na'urar bincike mai ba da shawara da ake da ita ba. Sanya binciken da suka dace su zama wajibi a ƙa'idojin reshe
wani canjin gudanarwa ne na daban; bayyana ayyukansu kaɗai ba ya kare reshe.

`API Route Typecheck` binciken tsarin aiki ne mai zaman kansa, wanda yake wajen duka hukuncin haɗaka
da bayanin martabar tsaye na cikakken mai sa ido na gida. Bincika sakamakonsa daban don ainihin
ɗan takarar. `.github/workflows/api-route-typecheck.yml` yana gudana kan PRs masu nufin `main` ko
`release/**`, turawa zuwa kowane ɗaya daga cikin rukunin rassan, da kuma ƙaddamarwa da hannu. Ba shi da matatar hanya.
Sake sauya reshen tushe na PR yana neman sabon bincike; gyare-gyaren jiki/take suna amfani da sunan sa ido kawai
`Admission not requested / API Route Typecheck` kuma ba za su iya maye gurbin binciken karɓa ba.
Tsarin aikin bai ayyana abin tayar da merge-group ba. Duk wani ƙaddamar da jerin gwanon haɗewa da ke buƙatar
wannan binciken dole ne da farko ya tabbatar da gudanarsa don wannan aukuwar.

### Ƙarfin aiwatar da UI

CI yana gudanar da cikakken jerin UI a matsayin sassa huɗu na matrix na `test-vitest`, kowannensu yana da
ma’aikata har biyu da iyakar mintuna 15 da ake da ita ta aikin. Sashe na farko kuma yana gudanar da
rukunin gwajin MCP/autoCombo Vitest. Sakamakon aikin wajibi yana rufe kowane ɓangaren matrix; gazawa
ko soke sashe ɗaya ba zai iya tabbatar da karɓar ɗan takara ba.

Mai lura na dare yana riƙe da wani rasitin exact-candidate na daban ga kowane sashe na UI,
ciki har da aiwatar da MCP a cikin rasiti na farko. Ana buƙatar duk rasitocin huɗu, rajistan ayyuka da
daidaitattun shaidun aiwatarwa. `npm run test:vitest:ui` na gida har yanzu yana zaɓar
cikakken rukunin; gudu guda na `--shard` shaida ce ta wani ɓangare kawai.

### Tattara coverage na unit

Sassan unit guda goma sha biyu suna tattara V8 coverage yayin aiwatar da gwaje-gwajensu na yanzu. Sashe da ya yi nasara
yana gudanar da `scripts/ci/compact-v8-coverage.mjs` don matse fayilolin asali ba tare da samar da
rahoton Istanbul na tsaka-tsaki ba. Aikin Coverage na ƙarshe yana tantance duk manifest guda goma sha biyu bisa
SHA na ɗan takara, runtime, tushen source da hashes na bayanai, sannan ya gudanar da reporters na c8 da iyakokin
coverage da ake da su. Inputs suna riƙe da jerin sunayen fayiloli na global na c8; haɗa bayanai tun a matakin kowane sashe ba shi da aminci
ga coverage na function/block mai gauraya. Sassan da suka ɓace, suka lalace ko ba su dace ba suna sa karɓa ya gaza.
Sassan gwaji da suka gaza suna riƙe da raw diagnostic coverage daban; ba zai iya shiga haɗawar ƙarshe ba.

### Bayanan shaidar ci gaban gudanar da gwajin unit

Umarnin gama-gari na `test:unit:ci:shard` yana rikodin matakan `primary`, `dashboard` da `serial`
ta hanyar `scripts/ci/unit-progress-reporter.mjs`. Rahoton gwaji na yau da kullum yana nan
har yanzu. Wani bayanin shaida na metadata kaɗai yana rikodin farawa da kammalawar kowane fayil,
kuma siginar heartbeat ta kowane daƙiƙa 30 tana jera fayilolin da har yanzu suke aiki da kuma tsawon lokacin da suka ɗauka. Yana rikodin
metadata na gudanarwa da ke cikin jerin waɗanda aka amince da su kawai; ba a mayar da bayanin gwaje-gwaje, sakamakon da aka fitar, cikakkun bayanan kurakurai da dukan
environment zuwa tsari na serialized.

CI da Quality suna adana fayilolin JSONL a matsayin `unit-progress-ci-<run>-<attempt>-<shard>` da
`unit-progress-quality-<run>-<attempt>-<shard>`. Ƙarewar lokacin job na iya hana upload na gaba;
sigogin heartbeat da aka riga aka fitar suna nan a matsayin hujjar gano matsala. Rashin sigogin heartbeat na iya kuma nuna
cewa an toshe ko an dakatar da tsarin runner. Waɗannan bayanan shaida suna kiyaye zaɓin gwaji,
concurrency, wa'adin ƙarshe da exit status da suke akwai; ba hukuncin amincewa da candidate ba ne.

### Shaidun da aka adana a tsarin tattara sakamakon karɓa

`scripts/quality/validate-release-acceptance.mjs` yana tattara sakamakon tsarin da aka ba shi da manifests ɗinsa; ba ya tabbatar da cewa tsarin ya ƙunshi dukkan matakan fitar da sigar ba. Rahotanninsa suna saita `releaseAcceptance: false` a fili, ko da tsarin yana da matsayin `VERIFIED`. Workflow na `release-acceptance.yml` har yanzu yana amfani da bayanan gwajin shadow, ba ainihin rasitocin build, package, boot ko promotion ba.

CLI yana buƙatar `--evidence-root` domin tabbatar da shaidun da aka adana. Ana nemo fayiloli a `<evidence-root>/<artifact_id>/<member>` kuma a lissafa hash ɗinsu da SHA-256. Rikodin PASS marar shaida, fayil da ya ɓace ko ya canza, hanyar da ba ta da aminci ko symlink yana hana tabbatarwa. Fayilolin da suka ɓace ba su yi daidai da logs marasa rubutu daga ayyukan da suka yi nasara ba. Binciken SHA/run/attempt da ake da shi yana kasancewa mai zaman kansa: bytes masu daidaito ba za su sa tsohon rasiti ya zama ingantacce ba. Mutuncin fayil ba shaida ba ce ta sahihancin gudanarwa ko promotion na artifact.

### Jerin static scan

Jerin npm-alias mai sigogi da kasancewar static-scan suna cikin
`config/quality/gate-manifest.json`. Gudanar da `npm run check:gate-manifest` don tabbatar da
sunayen script da ainihin commands bisa `package.json`; ƙari, cirewa da
sauyin command suna sa local hook da ayyukan change-classification a CI su gaza.
Alias ba aikin tsarin aiki ba ne, ko matrix instance ko test case: bai kamata
a gabatar da waɗannan ƙididdigun a matsayin masu musanyawa ba.

Yi amfani da `npm run quality:scan -- --list` ko `npm run quality:scan:fast -- --list`
don bincika aliases da aka zaɓa ba tare da aiwatar da su ba. Runner yana kiran
npm entrypoint, saboda haka ana kiyaye runtime ɗinsa (ciki har da Bun inda aka saita shi).
Manifest yana rubuta aliases da ke wajen waɗannan bayanan martaba a matsayin waɗanda ake kira daban, kuma
an haramta maintenance commands a cikin bayanan martabar scan na read-only.

Waɗannan bayanan martaba suna rufe static scan kawai. Ba sa tabbatar da product tests,
coverage, packaging, external checks ko cikakken karɓar sakin ɗan takara.
Karɓar tsarin aiki yana amfani da `config/quality/admission-policy.json` da aka haɗa da
`scripts/quality/admission-verdict.mjs`. Bayanan martabar release-observer suna nan daban;
a binciki gwaje-gwajen da suka dace da rasitocinsu dabam. Static
commands na cikakken observer an bayyana su a `config/quality/release-green-static-profile.json`, ciki har da
`audit:deps`, zaɓin mutation-test da translation checks. Loader yana tantance npm
commands bisa package.json da bayanan CI/Quality da aka tsara; yana ƙin drift
maimakon aiwatar da shell tokens a matsayin arguments. Sakamakon SKIP/INCOMPLETE na scanner da ake buƙata
ba zai iya tabbatar da PASS ba. Bayanin martabar yana rubuta external exclusions nasa kuma ba ya maye gurbin
hosted coverage, test matrices, package ko shaidar deployment. Jerin bayanin da ke ƙasa
madogara ce, ba hujjar cewa an gudanar da gate da gaske ba.

Scripts suna ƙarƙashin `scripts/check/` (policy gates) da `scripts/quality/` (ratchet engine).
Tushen gaskiya na CI shi ne `.github/workflows/ci.yml`.

### Lafiyar takardun tushen da aka wallafa

`.github/workflows/i18n-base-health.yml` yana lura da lafiyar takardu bayan wasu zaɓaɓɓun
turawa zuwa `main` da `release/v*`, da kuma yayin ƙaddamarwa da hannu. Matatansa sun ƙunshi takardu,
Markdown na tushe, `llm.txt`, yanayin/saitin fassara da kayan aikin i18n masu dacewa.
Aikin guda ɗaya na `Published base documentation health` yana amfani da Ubuntu da aka masauki kuma yana da
wa'adin mintuna biyar. Yana gudanar da ingantawa ta karatu-kawai kuma yana rubuta rasidin bincike ba tare da
sanya dependency, yin fassara ko karɓar wani yanayi ba.

`scripts/i18n/check-base-health.mjs` yana buƙatar kada a sami rashin daidaito na source-hash, missing-target, target-hash,
stale-translation da section-cache. Haka kuma yana inganta iyakar core
document/locale ta yanzu da asalin da aka rubuta mata. Mahalli mara inganci, ɗaukar bayani da bai cika ba
ko katsewar mai dubawa yana haifar da `INCOMPLETE`; tabbataccen karkacewa yana haifar da `FAIL`. Dukansu
suna dawo da matsayin fita na gazawa. Ana ɗaure rasidin da SHA na checkout, workflow, run da
attempt, kuma ana adana shi a matsayin `i18n-base-health-<sha>-<run>-<attempt>`.

Wannan lura ne mai zaman kansa kan tushen da aka wallafa. Ba ya ƙara event na PR ko
merge-group, required PR check, npm alias ko memba na static-scan profile.
Manufar differential PR da ake da ita da advisory classifications na ainihin checker
suna ci gaba da kasancewa daban. Nasarar upload ba za ta iya sauya sakamakon lafiya da ya gaza zuwa PASS ba.

### Hanya mai sauri ta Release PR (`quality.yml`)

`.github/workflows/quality.yml` yana cika CI a kan PR na main/release, turawa zuwa `main`,
dispatch da merge groups. PRs suna amfani da fast checks da aka tace ta path. An cire duplicate build
da aka kashe na dindindin; ainihin gwaje-gwajen build/package/boot suna nan a CI.

| Aiki                                             | Iyaka                                                                                                                                                                                                                                                    | Toshewa           |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `Docs Gates (fast-path)`                         | PR na takardu/lamba; nassoshin takardun API da docs-all                                                                                                                                                                                                  | Eh                |
| `Fast Quality Gates`                             | PR na lamba; binciken tsaye, typecheck, typecheck na dashboard, gwaje-gwajen raka'a da abin ya shafa                                                                                                                                                     | Eh                |
| `Forgotten sibling tests`                        | PR na lamba; ana bin diddigin modules da aka canza zuwa masu amfani na tsaye da gwaje-gwajen sibling masu yiwuwa; ana bayar da rahoton hanyoyin barrel da dynamic-import a matsayin bayanan shawarwari, tare da keɓance-keɓancen allowlist da aka ambata | **Na shawarwari** |
| `Vitest (fast-path)`                             | PR na lamba; rukunin gwajin vitest mai sauri                                                                                                                                                                                                             | Eh                |
| `Unit Tests fast-path`                           | PR na lamba; rukunin gwajin raka'a mai shardi 4                                                                                                                                                                                                          | Eh                |
| `No new ESLint warnings`                         | PR na lamba; kariyar lint mai la'akari da suppressions                                                                                                                                                                                                   | Eh, har da forks  |
| `Merge integrity (changelog + generated skills)` | PR da ba draft ba; daidaita changelog da skills da aka samar                                                                                                                                                                                             | Eh, har da forks  |

#### Rahoton gwaje-gwajen sibling da aka manta

`npm run check:forgotten-sibling-tests` yana sake amfani da import resolver da ke bayan taswirar tasirin gwaji.
Ga kowane production module da aka canza, yana bayar da rahoton jerin
`changed module/symbol -> static consumer -> candidate sibling test` masu tabbataccen tsari idan babu gwajin da ake
nufi a cikin diff na pull request. Ana adana taƙaitawar Markdown da sakamakon JSON a matsayin
artifact na workflow na `forgotten-sibling-tests` domin daidaitawa kafin aiwatar da duk wani tsarin toshewa.

Sake fitarwa ta barrel da dynamic imports bayanan binciken resolution ne kawai; ba sa taɓa haifar da
sakamakon toshewa. Keɓance-keɓancen da aka duba suna cikin
`config/quality/forgotten-sibling-allowlist.json`. Dole ne kowace shigarwa ta ambaci consumer da candidate
test, ta bayar da takamaiman dalili, sannan ta haɗa GitHub issue ko pull request. Shigarwar da ba ta da inganci tana sa
a ƙi ci gaba. Keɓance-keɓance ba za su iya ɓoye candidate test da aka goge ko diff da ke ƙara `.skip`/`.todo` ba;
raunana assertions da sauran hanyoyin ɓoyewa suna ƙarƙashin gate na
`check:test-masking` mai zaman kansa wanda shi ma ke toshewa.

### Aiki: `lint`

Yana gudana a kan kowane PR zuwa `main`. Yana hana merge idan ya gaza.

| Rubutun (`npm run ...`)           | Abin da yake tantancewa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Mai hana ci gaba                           |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Sigar Node.js tana cikin zangon da ake tallafawa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ee                                         |
| `check:test-tla-order`            | Babu fayil na `node:test` ƙarƙashin `tests/unit` da ke rajistar gwaji, ya ci karo da `await` na matakin-sama, sannan ya ƙara rajistar wasu (#18045; ratchet: `test-tla-order-allowlist.json` zai iya raguwa kawai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ee                                         |
| `check:cycles`                    | Shigo da juna na madauwari a duk faɗin `src/` + `open-sse/` (wanda ya dogara da AST, an warware `paths` na tsconfig). Bare yana fita da 1 a duk lokacin da wani madauwari ya wanzu (fail-closed tun daga #15281) kuma yana jera SCCs. `check:cycles:ratchet` (wanda CI ke gudanarwa) yana hana ci gaba idan adadin ya wuce iyakar `metrics.cycles` a cikin `quality-baseline.json` — a halin yanzu 14, `direction: down`, don haka zai iya raguwa kawai (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ee (ratchet)                               |
| `check:boundary`                  | Haɗin `open-sse → src`: shigo da kaya na musamman daga-fayil-zuwa-fayil daga engine zuwa app (`scripts/quality/measure-boundary.mjs`; jerin edge shi ne tarin ayyukan gyaran v4 core/module-split). Bare = rahoton shawara (iri ɗaya da `quality:boundary`). `check:boundary:ratchet` (wanda CI ke gudanarwa, kuma yana cikin madauwar ratchet ta fast-gates ta `quality.yml`) yana hana ci gaba idan adadin ya wuce iyakar `metrics.boundaryOpenSseToSrc` a cikin `quality-baseline.json` — an fara shi da ƙimar 771 da aka auna, `direction: down`; `--update` yana rage ta ne kawai; yana danganta da tushe a kan PRs (`--base-ref`, duba ƙasa)                                                                                                                                                                                                                                                                                                                            | Ee (ratchet)                               |
| `check:route-validation:t06`      | Akwai tsarin Zod a kan dukkan routes (manufar Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Eh                                         |
| `check:any-budget:t11`            | Adadin `@ts-expect-error // any` bai wuce kasafin da aka ware ba (catraca na Tier 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Eh                                         |
| `check:provider-consistency`      | Kowane provider da ke cikin `providers.ts` yana da shigarwar da ta dace a cikin `providerRegistry.ts` (haka kuma akasin haka, a cikin allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Eh                                         |
| `check:model-lifecycle`           | Ana kiyaye teburorin routing guda uku da ake kula da su da hannu su kasance daidai da lifecycle snapshot da aka shigar (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ba ya bai wa kowane retired id da `REGISTRY` zai iya routing maki; kowane target na `BUILT_IN_ALIASES` yana cikin `REGISTRY` kuma ba ya cikin retired-id snapshot; kowane retired id da har yanzu yake cikin `REGISTRY` ana tura shi zuwa wani wuri ko kuma an jera shi a cikin `allowedRetiredInCatalog`; kuma babu source ko target na `DEFAULT_DEGRADATION_MAP` da ya bayyana a matsayin retired a wannan snapshot. Wannan ba ya tabbatar da cewa a halin yanzu ana samar da model ɗin ta live upstream. Offline — yana kwatantawa da `config/quality/model-lifecycle.json`, wanda ake sabunta shi da hannu ta amfani da `npm run quality:refresh-model-lifecycle` (network; ba a haɗa shi da CI ba). `allowedRetiredInCatalog` burn-down ratchet ne: a ƙara shigarwa ne kawai tare da tracking issue. | Eh                                         |
| `check:fetch-targets`             | Kowane `fetch("/api/...")` a cikin `src/` na ɓangaren client yana warwarewa zuwa ainihin `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Eh                                         |
| `check:deps`                      | Duk deps da za a iya yin `npm install` a kansu a cikin kowane `package.json` da ke repo suna cikin `dependency-allowlist.json`; ana yi wa sabbin packages marasa pinned ko slopsquatted alama                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Eh                                         |
| `audit:deps`                      | Binciken npm na dukkan lockfile masu zaman kansu guda biyar (tushen aiki, Electron, OpenCode plugins v1/v2 da provider). Gargaɗin tsaro masu matakin critical suna toshewa; masu matakin high suna ci gaba da bayyana a matsayin gargaɗi. Binciken da ya ɓace/ya gaza yana da matsayin INCOMPLETE kuma yana toshewa; ana adana hashes na lock da rahotanni na kowane scope.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ee                                         |
| `check:lockfile`                  | Ingancin `package-lock.json` — registry na https, hashes na integrity, babu sauya hosts                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ee                                         |
| `check:licenses`                  | Jerin lasisin SPDX da aka amince da su don dependencies na production                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ee                                         |
| `check:tracked-artifacts`         | Babu artifacts na build / symlinks na `node_modules` da aka commit (yana kuma gudana a husky pre-commit; an bar pre-push da sauƙi da gangan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ee                                         |
| `check:ai-attribution`            | Babu trailer na AI/bot mai suna `Co-Authored-By` ko footer na ƙirƙirar AI a cikin commits, take ko bayanin PR — Ƙa'ida Mai Tsauri #16 (a cikin maimaitawar fast-gates ta `quality.yml` don PR→`release/**` — yana karanta event payload, ba ya yin komai idan ba PR ba ne — da kuma mataki na PR kaɗai a lint na `ci.yml` don PR→`main`; haka kuma hook na husky `commit-msg`; an yarda da marubuta na haɗin gwiwa na ɗan Adam; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:vitest-exclusions`         | Kowane exclusion na Vitest yana ambaton tracking issue kuma yana bayyana a cikin `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ee                                         |
| `check:file-size`                 | Fayilolin tushe (`.ts`/`.tsx` a cikin `src/`, `open-sse/`, `electron/`, `bin/`) su kasance cikin iyakar `cap`, sannan fayilolin gwaji (`*.test.ts(x)`) su kasance cikin `testCap`; fayilolin da aka kafe a cikin `file-size-baseline.json` (`frozen` / `testFrozen`) kada su zarce girman da aka rubuta musu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ee                                         |
| `check:error-helper`              | Amsoshin kuskure a cikin masu aiwatarwa/masu sarrafawa su yi amfani da `buildErrorBody()` / `sanitizeErrorMessage()` (Ƙa'ida Mai Tsauri #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ee                                         |
| `check:migration-numbering`       | Fayilolin SQL na ƙaura suna da lambobi masu jere, ba tare da giɓi ko maimaitawa ba                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ee                                         |
| `check:public-creds`              | Babu OAuth `client_id`/`client_secret` ko maɓallan Firebase Web na zahiri a wajen `publicCreds.ts` (Ƙa'ida Mai Tsauri #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ee                                         |
| `check:db-rules`                  | Babu ɗanyen SQL a wajen modulolin `src/lib/db/`; babu shigo da kaya ta barrel daga `localDb.ts` (Ƙa'idoji Masu Tsauri #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ee                                         |
| `check:known-symbols`             | Masu aiwatarwa na mai samarwa, dabarun routin, da masu fassara da aka yi wa rajista a cikin teburorinsu na turawa su yi daidai da fayilolin da ke kan faifai — babu alamomin da ba su da alaƙa ko waɗanda ba a ayyana ba                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ee                                         |
| `check:route-guard-membership`    | Ana rarraba kowace hanya da ke ƙaddamar da child process ta hanyar `isLocalOnlyPath()` (Ƙa’idoji Masu Tsauri #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ee                                         |
| `check:test-discovery`            | Aƙalla test runner ɗaya yana tattara kowane fayil na `*.test.ts` / `*.spec.ts` da ke cikin repo (ratchet: jerin orphan da ke cikin `test-discovery-baseline.json` zai iya raguwa kawai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ee                                         |
| `check:agent-skills-sync`         | Abubuwan agent-skills da aka samar sun yi daidai da kundin tushe nasu (babu saɓani)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:provider-asset-provenance` | Tambura/kadarorin provider suna ɗauke da shigarwar asali da aka rubuta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `lint:json`                       | Ana iya parse na fayilolin daidaitawar JSON kuma suna cika ƙa’idojin lint na repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `typecheck:core`                  | Haɗa TypeScript ba tare da kurakurai ba (gargaɗin shawara kawai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ee                                         |
| `typecheck:noimplicit:core`       | Tsauraran `noImplicitAny` — don ci gaba nan gaba; wuraren kira da yawa da suka riga suka kasance har yanzu suna buƙatar annotations                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | **Na shawara** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` da aka taƙaita zuwa `src/app/(dashboard)/**` (#7033) — jerin izinin fayiloli 27 da aka zaɓa na `typecheck:core` bai haɗa da kowane dashboard TSX ba, kuma `next build` shi ma ba ya taɓa duba nau'insa (`next.config.mjs` yana saita `ignoreBuildErrors: true`), don haka koma-bayan masu ganowa da suka zama marayu a can (#6625/#6909) ba su bayyana ga CI ba. Ana kwatanta bambance-bambance da daskararren ma'aunin asali na ƙidaya bisa kowane fayil/kowace lambar TS (`config/quality/dashboard-typecheck-baseline.json`, irin tsarin tilasta tsufa ɗaya da `check:known-symbols`) — kurakuran SABBI kawai da suka zarce ƙidayar ma'aunin asali ne ke sa ƙofar ta gaza; rage ma'aunin a hankali da `--update` lokacin da aka gyara kuskuren da ya riga ya kasance.                                                                                                                                                                                                | I                                          |

### Aiki: `quality-gate`

Yana gudana bayan `test-coverage`. Yana hana haɗewa idan an gaza.

| Skrif                        | Abin da yake tabbatarwa                                                                                                                                                                                   | Mai hanawa             |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `quality:collect`            | Yana fitar da `quality-metrics.json` (ƙidayar gargaɗin ESLint, ɗaukar gwaji daga rahoton guntu da aka haɗa)                                                                                               | I (yana gaban ratchet) |
| `quality:ratchet`            | Kowace ma'auni a cikin `quality-baseline.json` ba ta taɓarɓare ba (gargaɗin ESLint ≤ ma'aunin asali; ɗaukar gwaji ≥ ma'aunin asali)                                                                       | I                      |
| `check:duplication`          | Maimaita lamba (jscpd@4) bai zarce ma'aunin asali a cikin `quality-baseline.json` ba                                                                                                                      | I                      |
| `check:complexity`           | Sarƙaƙƙiyar cyclomatic ta matakin fayil ba ta zarce iyakar da aka saita ba (ainihin ESLint `complexity` + `max-lines-per-function`)                                                                       | I                      |
| `check:cognitive-complexity` | Ratchet na sarƙaƙƙiyar fahimta (`eslint-plugin-sonarjs`) — zagayen ESLint daban; CI yana gudanar da dukansu a haɗe a matsayin mataki guda na `check:complexity-ratchets`                                  | I                      |
| `check:dead-code`            | Ratchet na exports / fayilolin da ba a amfani da su (knip) bai taɓarɓare idan aka kwatanta da ma'aunin asali ba                                                                                           | I                      |
| `check:compression-budget`   | Kasafin gwajin ma'aunin matsawa — dole ne mafi ƙarancin adana token na kowane engine kada ya taɓarɓare                                                                                                    | I                      |
| `check:type-coverage`        | Ratchet na kaso mai nau'i (`type-coverage`) bai taɓarɓare ba; galibi yana mamaye `typecheck:noimplicit:core`                                                                                              | I                      |
| `check:codeql-ratchet`       | Ƙidayar faɗakarwar CodeQL da ke buɗe ba ta taɓarɓare ba (yana karantawa ta `gh api`; yana tsallakewa cikin sauƙi idan babu token) — don mitar sabuntawa da kunnawa da hannu: duba "CodeQL ratchet" a ƙasa | I                      |

### Aiki: `quality-extended`

Aikin yana hana 'yan takarar da suka dace. Ana duba girman bundle, abubuwan sirri da aka gano, raunin tsaro
da aka gano, abubuwan workflow da aka gano, da sauye-sauyen OpenAPI ta amfani da ratchets da ake buƙata.
Binciken dogaro mai zagaye ya ci gaba da zama na shawara kawai. Ana buƙatar shigar da scanner:
`scripts/ci/install-quality-scanners.sh` yana tanadar da sigogin da aka tsayar kuma yana yaɗa
gazawar shigarwa. Rashin kayan aiki, rahotanni marasa inganci, ko rashin ma'aunan asali suna barin
ƙofar scanner da ake buƙata a matsayin INCOMPLETE.

| Skrif                    | Abin da yake tantancewa                                                                                                                                                                                                                | Matsayin toshewa                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `check:circular-deps`    | Babu madogaru masu zagayawa (dpdm)                                                                                                                                                                                                     | **Na shawara**                                          |
| `check:bundle-size`      | Girman bundle bai wuce iyakar da aka sa ba; rashin samun ma'auni yana haifar da gazawa                                                                                                                                                 | **Mai toshewa tare da --ratchet**                       |
| `check:secrets`          | Sakamakon Gitleaks ba ya komawa baya; sikanin da ake buƙata yana ƙin karɓar rashin kayan aiki/source/baseline, sikanin da ya gaza, da rahotanni marasa inganci                                                                         | **Mai toshewa tare da --ratchet**                       |
| `check:vuln-ratchet`     | Raunin tsaro na madogaru ba ya komawa baya; sikanin da ake buƙata yana ƙin karɓar rashin kayan aiki, rahotanni marasa inganci, ko rashin baselines                                                                                     | **Mai toshewa tare da --ratchet**                       |
| `check:workflows`        | Lint na workflow (actionlint + zizmor); scanners da suka ɓace/lalace, rahotanni marasa inganci, ko rashin ratchet baseline suna gazawa a matsayin INCOMPLETE. Ingantattun sakamako suna bin tsarin strict/advisory/ratchet da aka zaɓa | Ana buƙatar aiwatarwa; zizmor ratchet yana toshewa a CI |
| `check:openapi-breaking` | Kwangilar API ta jama'a bisa event commits da aka tsayar (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); ma'aunin da ake buƙata yana gazawa a rufe                                             | **Mai toshewa tare da --ratchet**                       |

### Aiki: `docs-sync-strict`

Ga pull requests zuwa `main` ko `release/**`, wannan aiki yana gudana ne kawai ga candidates da ba drafts ba (ko waɗanda ke cikin trusted queue) kuma aka rarraba su a matsayin canje-canjen takardu ko lambar shiri. Yana gudana kuma a abubuwan CI da ba PR ba; push trigger na wannan workflow ya shafi `main` kawai, ba `release/**` ba. Matakin da ya ƙare da lambar fita wadda ba sifili ba yana hana aikin wucewa; sakamakon rahoto kawai da keɓantattun abubuwan da aka bayyana a ƙasa ba sa hana shi.

| Skrif                          | Abin da yake tantancewa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Matsayin toshewa                                                                                                                                                                 |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-gate da ke gudanar da ƙananan gates 7 da ke ƙasa ɗaya bayan ɗaya                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Eh                                                                                                                                                                               |
| ↳ `check:docs-sync`            | Daidaiton sigogin package/OpenAPI/CHANGELOG, kwafin `llm.txt` masu daidaito cikakke, ƙa’idodin sassa/girman CHANGELOG da aka fassara, da rashin takardun maimaitattu da aka maye gurbinsu                                                                                                                                                                                                                                                                                                                                                    | Eh                                                                                                                                                                               |
| ↳ `check:docs-frontmatter`     | Shafukan takardun da aka compile suna ɗauke da ingantattun taken frontmatter                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Eh                                                                                                                                                                               |
| ↳ `check:docs-counts`          | Ƙa’idodin ƙididdiga masu babban tabbaci suna da tsauri; gwaje-gwajen heuristics na adadin fayiloli suna ba da gargaɗi kawai sai idan an ba wa script `--strict` (babban gate na CI ba ya tura wannan flag)                                                                                                                                                                                                                                                                                                                                   | Matakin tsauri yana hana wucewa; matakin sassauci na shawara ne                                                                                                                  |
| ↳ `check:env-doc-sync`         | Karanta env a lambar shiri, `.env.example`, da `docs/reference/ENVIRONMENT.md` sun dace bayan amfani da bayyanannun jerin keɓancewa na ignore, doc-only, da env-only                                                                                                                                                                                                                                                                                                                                                                         | Eh, a wajen jerin keɓancewa da aka bayyana                                                                                                                                       |
| ↳ `check:deprecated-versions`  | Yana bayar da rahoton sigogin da wataƙila sun tsufa a wajen mahallin tarihin da aka ɗauka amintacce da tsoffin ranakun sabuntawa, ban da takardun da aka ware                                                                                                                                                                                                                                                                                                                                                                                | Na shawara a tsarin CI na yanzu (ba a tura `--strict`)                                                                                                                           |
| ↳ `check:doc-links`            | Internal markdown links a cikin takardu suna kaiwa ga ainihin fayiloli (`[text]`/`(path)` form)                                                                                                                                                                                                                                                                                                                                                                                                                                              | Eh                                                                                                                                                                               |
| ↳ `check:fabricated-docs`      | Routes, env vars, CLI commands, hook names, da file paths da aka ambata a cikin takardu suna nan a codebase. Hard gate ta hanyar `--strict`; soft-fail ba tare da flag ba.                                                                                                                                                                                                                                                                                                                                                                   | Eh (ta hanyar `--strict` a CI)                                                                                                                                                   |
| `check:cli-i18n`               | Maɓallan CLI `t()` da ake amfani da su suna cikin `en`; `pt-BR` yana riƙe kowane sashe na matakin farko; `zh-CN` da `zh-TW` suna ɗauke da kowane maɓalli na `en`                                                                                                                                                                                                                                                                                                                                                                             | Eh                                                                                                                                                                               |
| `check:openapi-coverage`       | OpenAPI spec yana rufe aƙalla ratcheted floor na ainihin routes                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Eh                                                                                                                                                                               |
| `check:openapi-security-tiers` | Bayanan `x-loopback-only`/`x-always-protected` da aka ayyana dole su sami goyon baya daga `routeGuard.ts`; kurakuran parser da rashin daidaito a gwajin gaba suna hana wucewa. Gwajin baya na `x-loopback-only` da ya ɓace ƙarƙashin prefixes na local-only yana ba da gargaɗi, kuma routes da aka bayyana da pattern kawai ba sa cikin wannan gwajin baya.                                                                                                                                                                                  | Parser/gwaje-gwajen gaba suna hana wucewa; gwajin baya na shawara ne                                                                                                             |
| `check:openapi-routes`         | Kowane path `/api...` a `openapi.yaml` yana dacewa da route na gaske ba tare da la’akari da sunayen parameters ba bayan jerin keɓancewa mai dalili `KNOWN_STALE_SPEC`; tsoffin entries na jerin ma suna sa gwajin ya faɗi                                                                                                                                                                                                                                                                                                                    | Eh                                                                                                                                                                               |
| `check:docs-symbols`           | URL references na ciki `/api/...` a takardun asali waɗanda ba mirrors ba suna dacewa da route na gaske ko rukunin routes; an keɓe references na proxy/upstream/placeholder/fayil da entries masu dalili na `KNOWN_STALE_DOC_REFS`, kuma tsoffin entries na jerin suna sa gwajin ya faɗi                                                                                                                                                                                                                                                      | Eh                                                                                                                                                                               |
| `i18n translation drift`       | Yana duba hash na tushe/manufa na muhimman takardu da asalin fassarar. Kwatancen PR yana yarda da kurakuran da aka gada iri ɗaya tak kawai; sabbin rashin daidaito ko waɗanda ba a tabbatar da su ba a tushe, manufa da ta ɓace, hash na manufa, tsohuwar fassara ko cache na sassa suna hana ci gaba. A wajen kwatancen PR, kurakuran tushe/manufa da ta ɓace/hash na manufa suna hana ci gaba, amma tsofaffin fassarori da cache na sassa marasa daidaito suna zama gargadi kawai. Rashin cache na sassa na tsohon tsari ba kuskure ba ne. | Sabon karkacewa ko wanda ba a tabbatar da shi ba a PR yana hana ci gaba; karkacewar da aka gada iri ɗaya tak gargadi ne kawai; ƙa'idojin wajen PR sun danganta da nau'in kuskure |

### Aiki: `i18n-ui-coverage`

| Skrif                             | Abin da yake tabbatarwa                                                                                                                                                                        | Mai toshewa     |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (a ciki) | Rufin maɓallan UI i18n ya kai ≥ 65%                                                                                                                                                            | Eh              |
| `check-ui-value-drift` (a ciki)   | Sake rubuta **ƙimar** Turanci ba ya barin wata tsohuwar fassara a baya                                                                                                                         | Eh              |
| `check-new-key-coverage` (a ciki) | An fassara **sabon** maɓallin Turanci a kowane locale — ana ƙin alamar `__MISSING__:`                                                                                                          | Eh              |
| `check-translation-ratio`         | Rabon fassara na ainihi ga kowane locale (mai kama da Turanci / placeholder / abin da ya ɓace a wajen allowlist) bai kamata ya wuce `config/quality/i18n-translation-baseline.json` + slack ba | **Mai toshewa** |

Yana buƙatar `fetch-depth: 0` — shingen value-drift yana kwatanta bambancin `en.json` da merge base.

#### `check-ui-value-drift` — shingen tsohuwar fassara

Yana gano matsalar koma-bayan i18n guda ɗaya da sauran shingayen ba za su iya gani ta fuskar tsari ba: an sake rubuta ƙimar Turanci
amma fassarorin da aka samo daga Turancin _da ya gabata_ sun ci gaba da kasancewa, don haka
masu amfani da waɗanda ba Turanci ba suna ci gaba da karanta rubutu mai nuna tabbaci amma wanda yanzu ba daidai ba ne.

Wannan ya taɓa shiga sigar da aka fitar da gaske. An sake rubuta `oauthModal.googleOAuthWarning` lokacin da aka
ƙaddamar da mai taimakon shiga na Antigravity (#5203); **39 daga cikin locales 43** sun ci gaba da riƙe rubutun da ke gaya wa masu gudanarwa su “kwafi
cikakken URL su liƙa shi a ƙasa” — matakin da ba zai iya kammaluwa ga wannan provider ba. Ba a
lura da shi ba sai #8463 saboda:

- `sync-ui-keys` yana cike maɓallan da **babu su** kawai, ba waɗanda suka zama **tsofaffi** ba;
- `check-ui-keys-coverage` yana ƙirga _kasancewar_ maɓalli, don haka tsohuwar fassara tana samun maki a matsayin an rufe ta;
- `check-translation-drift` yana bin kwafin takardu na `docs/i18n/<locale>/**.md` —
  ba ya taɓa karanta `src/i18n/messages/*.json`. Yana toshewa a job `docs-sync-strict` tun bayan
  sake daidaitawar 2026-09: gyara ainihin takarda → `npm run i18n:run -- --files=<doc>` (matakin sashe, mai sauƙi).

**Yana la’akari da diff, ba ya dogara da baseline.** Yana kwatanta `en.json` da ke merge base da
working tree; ga kowane maɓalli da ƙimarsa ta Turanci ta canza, duk wani locale da har yanzu yake riƙe da
fassarar da ba a taɓa ba tsohuwa ce. Wannan da gangan yana **daskarar da bashin da ya riga ya kasance** — diff
ba zai iya bayyana daga wane tsohon Turanci aka samo fassarar da ta daɗe ba, don haka shingen yana tantance
abin da canjin yanzu ya taɓa kawai. Madadin (baseline na hash ga kowane maɓalli) zai haifar da
generated file mai girman kusan 600 KB, wanda ya ninka babban baseline da ake da shi sau 3, tare da yawan sauyawa a kowane PR na i18n.

Akwai hanyoyi biyu na cika shi:

1. sabunta fassarorin da abin ya shafa, ko
2. saita su zuwa `__MISSING__:<new english>` — daga nan runtime zai samar da gyararren Turanci
   (`src/i18n/request.ts::deepMergeFallback`, #7258), sannan a sanya maɓallin cikin jerin jiran fassara.

Idan **ma’anar** jimlar ta canza, fi son **sake sanya wa maɓallin suna**: sabon maɓalli ba zai iya gado
tsohuwar fassara ba. Wannan shi ne tsarin da #8463 ya yi amfani da shi.

```bash
npm run i18n:check-value-drift          # mai tsauri (abin da CI ke gudanarwa)
npm run i18n:check-value-drift:warn     # bayar da rahoto kawai
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Matakan tantance karkacewar ƙima da sabbin maɓallai suna amfani da kwatance guda ɗaya marar sauyawa daga
`scripts/i18n/resolve-ui-diff-base.mjs`. Tsarin aiki yana miƙa SHAs iri ɗaya na tushe, ƙarshen tushe da
ɗan takara zuwa duka gwaje-gwajen. Gudanarwar PR/sake nufar da tushe, push da merge-group suna amfani da mahallin
abubuwan da suka faru nasu. Aika reshen ɗan takara yana buƙatar ainihin PR ɗinsa da yake buɗe ko shigarwar
`i18n_base_sha` a sarari. Aika ko lura da aka tsara na `main` ko `release/vX.Y.Z`
ba tare da wannan shigarwar ba yana kwatanta commit na ƙarshe da mahaifinsa na farko; ba bincike ba ne na
duk bashin fassara da aka gada. Kiran gida yana buƙatar tushen kwatance da aka bayyana a sarari,
misali umarnin `BASE_REF` da ke sama.

Mahallin kwatance da ya ɓace ko yake da ruɗani, kundin da ake buƙata wanda ba za a iya karantawa ba ko ba ingantacce ba, da
ɗan takara da ya sauya suna haifar da `INCOMPLETE` tare da lambar fita **2**, har ma a yanayin gargaɗi.
Ana karanta kundin ta amfani da `scripts/i18n/read-ui-catalog.mjs`; ba a maye gurbin gazawar karantawa
da abubuwa marasa komai. Rashin samuwar tushe ko shigarwa marar cikawa ba sa tabbatar da PASS.

### Job: `i18n`

Cikakken matrix na tabbatar da i18n (job ɗaya ga kowane locale). Dukan job ɗin na shawara ne.

| Skrif                           | Abin da yake tabbatarwa           | Mai toshewa                                                |
| ------------------------------- | --------------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | Cikakken fassara ga kowane locale | **Na shawara** (`continue-on-error: true` a dukan job ɗin) |

### Job: `pr-test-policy`

Yana gudana a pull requests kawai.

| Skrif                  | Abin da yake tabbatarwa                                                                                                                        | Mai toshewa |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check:pr-test-policy` | PRs da ke canza production code a `src/`, `open-sse/`, `electron/`, ko `bin/` dole su haɗa ko su sabunta tests (Ƙa’ida Mai Tsauri #8)          | Eh          |
| `check:test-masking`   | Test files da aka canza ba sa rage jimillar adadin assert ko ƙara tautologies na `assert.ok(true)`                                             | Eh          |
| `check:pr-evidence`    | Jikin PR yana ambaton shaidar test/VPS don canjin (yana sarrafa Ƙa’ida Mai Tsauri #18 ta hanyar binciken rubutun PR — mai rauni, duba Backlog) | Eh          |

### Job: `test-vitest`

Yana buƙatar aikin rarrabawa na `changes`. Sassan matrix da suka dace suna hana haɗewa idan sun gaza.

| Rukunin Gwaji    | Abin da yake tabbatarwa                                                             | Mai toshewa                                                                                                                            |
| ---------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Sabar MCP (kayan aiki 110), autoCombo, ma'ajiyar wucin gadi — mai gudanar da vitest | Eh                                                                                                                                     |
| `test:vitest:ui` | Gwaje-gwajen ɓangarorin UI — mai gudanar da vitest                                  | **Mai toshewa** — an ware gazawowin da suka riga suka kasance a sarari cikin `vitest.config.ts`; sabbin gazawowi suna sa aikin ya gaza |

### Gudanawar dare (an tsara lokaci, na shawarwari)

Waɗannan suna gudana bisa jadawalin cron (da kuma `workflow_dispatch`), ba sa gudana a kan PRs. Dukkansu na shawarwari ne.

| Gudanawar Aiki         | Abin da yake tabbatarwa                                                                                                                                                                                   | Mai toshewa    |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | Gwaje-gwajen siffofi na fast-check tare da bazuwar seed + adadin gudanawa mai yawa                                                                                                                        | **Na shawara** |
| `nightly-resilience`   | shingen haɓakar heap, shigar da kurakuran chaos, gwajin kaya/ɗorewa na k6                                                                                                                                 | **Na shawara** |
| `nightly-llm-security` | kariyar promptfoo daga injection (yanayin block) + binciken garak (ana tsallakewa idan babu sirrin mai samarwa)                                                                                           | **Na shawara** |
| `nightly-schemathesis` | Fuzzing na kwangilar OpenAPI (schemathesis) a kan OmniRoute mai aiki ta amfani da `docs/openapi.yaml` — yana bayyana keta ƙa'idojin ƙayyadaddun bayanai / kurakuran 500 da ba a sarrafa ba (Mataki 8 B.4) | **Na shawara** |
| `nightly-mutation`     | Makin gwajin mutation na Stryker a kan saurin layin gwajin unit — mutants da suka tsira suna bayyana asserts masu rauni                                                                                   | **Na shawara** |
| `nightly-compat`       | Matrix ɗin dacewar injin Node a duk faɗin zangon `engines.node` da ake tallafawa                                                                                                                          | **Na shawara** |

Ana yin rikodin ma'aunai na asali na aiki (heap, TTFB, lokacin ginawa), ba a sanya su a matsayin shinge ba: duba [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Matakin Velocity (2026-08-30 → v4.0 LTS): an sassauta kowane ma'aunin tushe da 20%

Shawarar mai aikin (2026-08-30): har zuwa tsarin rarraba sassa na v4.0, saurin fitarwa ya fi muhimmanci
fiye da kiyaye iyakar bashin fasaha. An sassauta kowane ma'aunin tushe na **lamba** da 20% a cikin
aiki guda da za a iya tantancewa, kuma an ayyana matakin a cikin `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Abin da ya canza                                                                                                                                                                                                                 | Inda                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — ƙididdigar da ƙaranci ya fi kyau ×1.2, kaso na ɗari da yawa ya fi kyau ÷1.2 (an riƙe mafi ƙarancin coverage a 60, `eslintErrors` ya tsaya 0, `eslintWarnings` 0 → 20% na adadin suppression da aka daskarar) | `quality-baseline.json` (bayanin `_relax_velocity_2026_08_30` yana jera kowane kafin → bayan)          |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                 | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, iyakar layin kowane `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                         | `file-size-baseline.json`                                                                              |
| ƙididdiga na kowane fayil / kowace TS-code ×1.2                                                                                                                                                                                  | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                              | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` ya zama shawara yayin da `_policy.requireTighten === false`                                                                                                                                                  | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| ana dakatar da `bank-ratchet-shrinks` na kowane dare (zai adana raguwar da aka auna kuma ya soke sararin da aka tanada)                                                                                                          | `.github/workflows/nightly-release-green.yml`                                                          |

Jerin abubuwan da aka amince da su (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) ba kasafin iyaka **ba ne** kuma ba a taɓa su ba. Ƙofofin manufofin wucewa/rashawa (sirrika, ƙa'idojin SQL,
yarjejeniyar docs/env, daidaiton i18n, gwaje-gwajen raka'a) ba su canza ba — gwaji ja har yanzu gwaji ja ne.

**Kayan aiki**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — sassautawa
  ta sau ɗaya (`scripts/quality/relax-baselines.mjs`); yana ƙin sake aiki da bayanin guda.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  yana auna kowace ƙofar lamba yadda CI ke yi kuma yana buga sauran sararin kowane ƙofa
  (`scripts/quality/baseline-headroom.mjs`). Aikin `baseline-headroom` na kowane dare yana wallafa
  teburin a taƙaitaccen sakamakon aikin workflow kuma yana ɗora rahotonsa na JSON/Markdown a matsayin
  `baseline-headroom-<run_id>`, wanda ake riƙewa na tsawon kwanaki 90. Layukan gargadi da masu muhimmancin gaske
  suna gano ƙofofin da ke tsakanin 10% na iyakarsu ko waɗanda suka riga suka wuce ta. Duba waɗannan rahotanni
  a matsayin gargaɗin farko cewa ana cinye kasafin iyaka; bincika bayanan `_rebaseline_*` na ƙofar da ta jawo matsalar.
  Aikin ba ya ƙirƙira ko sabunta batun dindindin yanzu; #12149 yana adana tarihin rahotannin baya.

**Yanayin sabuwar code (Clean-as-You-Code) — tun daga 2026-08-30, hanyar sauri ta PR kawai**

A abubuwan `pull_request`, `quality.yml` yana miƙa `--base-ref <PR base SHA>` zuwa `check:file-size`,
`check:complexity-ratchets` da `check:dead-code`. Ga `check:complexity-ratchets` da
`check:dead-code`, ƙofar tana kwatanta HEAD da merge-base **iyakata ga fayilolin da PR
ya taɓa** (`scripts/check/newCodeMode.mjs`: ana samar da merge-base a cikin
`git worktree` na wucin gadi, ana gudanar da ESLint/knip a can da kuma a HEAD, sannan a kwatanta ƙididdigar kowane fayil):

- **mai toshewa** — PR ya ƙara matsalolin cyclomatic/cognitive ko dead exports a fayilolin da ya canza
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` a cikin log);
- **shawara** — jimillar gaba ɗaya idan aka kwatanta da ma’aunin tushe da aka daskarar. Karkacewar da aka gada ba ta taɓa sa
  PR marar laifi ya zama ja ba; ana bibiyar karkacewar don gyarawa yayin daidaitawar fitarwa, kuma aikin
  headroom yana sa ido a kanta.

`check:file-size` yana amfani da base ref bisa nasa ƙa'idojin (`scripts/check/check-file-size.mjs`, #8522):
yana duba kowane fayil na source da test a cikin bishiyar, yana karanta adadin layukan kowannensu a PR base
ta amfani da `git show`, kuma yana sa fayil ya gaza ne kawai idan ya ƙaru ya wuce mafi girma daga iyakar ma'auninsa
(`frozen` / `testFrozen`, ko `cap` / `testCap` ga fayil da ke wajen ma'aunin tushe) da kuma girman base ɗinsa.
Saboda haka, fayil da tuni ya samu drift a base ba zai taɓa sanya PR marar laifi ya zama ja ba.

`check:boundary:ratchet` yana amfani da ƙa’ida iri ɗaya ga lambarsa guda ɗaya
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): a abubuwan da suka faru na PR, duka
matakan tantancewa masu sauri na `quality.yml` da aikin lint na `ci.yml` suna miƙa SHA na tushen PR, ana
auna commit ɗin tushe daga fitarwar `git archive`, kuma PR yana fāɗuwa ne kawai idan adadin gefen
`open-sse → src` ya zarce mafi girma tsakanin `metrics.boundaryOpenSseToSrc` da adadin da ke kan tushe. Ana
bayar da rahoton karkacewar tushe sama da iyaka (`base drift herdado`) amma ba ya taɓa sa PR marar laifi ya
fāɗi; push → main yana riƙe cikakkiyar iyakar, kuma SHA na tushe da ba za a iya warwarewa ba yana koma mata
tare da gargaɗi.

Gudanarwar `workflow_dispatch`, cikakken binciken release-green da aikin headroom na dare ba su da tushen PR
kuma suna ci gaba da amfani da cikakkiyar kwatantawa (ta duniya). Coverage, duplication da type-coverage suna
nan a matsayin na duniya a yanzu (kayan aikinsu ba sa samar da bambancin kowane fayil cikin sauƙi) — su ne
'yan takarar da za a yi musu irin wannan tsarin.

**Rufe wannan mataki a v4.0 (LTS = ya fi na baya tsauri, ba “komawa yadda aka saba” ba)**

1. A kan tsantsar tip na `release/v4.0.0`: `npm run quality:headroom --json` domin rikodi, sannan
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, da `--update` na kowace
   ƙofar typecheck — kowace baseline ta sauka zuwa ƙimar da aka auna.
2. Goge `_policy` daga `quality-baseline.json` (yana sake kunna `--require-tighten` da tanadin dare),
   sannan a mayar da `THRESHOLD = 36` (ko sama da haka) a cikin `check-openapi-coverage.mjs`.
3. Ƙara tsaurara fiye da abin da aka auna a inda rarrabawa zuwa modules ta biya: a mayar da `cap` na
   file-size zuwa 1000 (ko 800), a ƙara wa ƙananan iyakokin coverage +5, sannan dead exports su zama 0
   ga packages da aka rarraba zuwa modules.

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

Kowace ƙofa da ba za ta iya gazawa saboda keta ƙa’idojin da suka riga suka kasance ba tana amfani da allowlist daskararre
(misali, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Manufar ita ce:

**Gyara tushen matsalar; yi amfani da allowlist kawai idan ketawar ta riga ta kasance kuma
ba za a iya gyara ta a cikin PR ɗin nan ba.**

Lokacin ƙara shigarwa zuwa allowlist:

1. Haɗa tsokaci mai bayyana dalilin.
2. Nuna batun bibiyar da ya dace (misali, `// #3498 — Phase 2 feature, not yet implemented`).
3. Cire shigarwar a cikin PR ɗin da ya gyara ketawar — tsohuwar shigarwa da ba ta ƙara
   danne wata ketawa mai aiki ba ita ma matsala ce (tilasta dokar tsoffin shigarwa ta 6A.3
   za ta sa ƙofar ta gaza kan shigarwar allowlist marar alaƙa da zarar an aiwatar da ita).

**Kada** a ƙara shigarwar allowlist don kawai a sa gwaje-gwaje su yi nasara da sauri. Ƙofa mai
nasara tare da allowlist mai ci gaba da girma tana ba da tunanin inganci na ƙarya.

### Lokacin da ƙofa ta gaza a PR ɗinka

1. **Karanta sakamakon ƙofar a hankali** — yana gaya maka ainihin fayil ko alamar da ta karya
   ƙa’idar.
2. **Gyara ketawar** — yawancin ƙofofi binciken tsarin fayil ne mai tabbataccen sakamako waɗanda ke yin nasara da zarar
   lambar ta daidaita.
3. **Idan ketawar ta riga ta kasance** (wato, ba kai ne ka ƙirƙire ta ba amma yanzu ƙofar
   tana duba ta): ƙara shigarwar allowlist tare da tsokacin dalili da batun bibiyarta.
4. **Idan ƙofar ratchet ce** (coverage, gargadin ESLint, maimaitawa, sarƙaƙiya):
   canjinka ya sa ma’aunin ya taɓarɓare. Gyara ainihin matsalar, ko kuma (a lokuta da ba kasafai ba) gudanar da
   `npm run quality:ratchet -- --update` idan canjin da gangan ne kuma
   ana iya amincewa da taɓarɓarewar ma’aunin — amma bayyana dalilin a cikin bayanin PR.
5. **Ƙofofin shawarwari** (`continue-on-error: true`) na bayar da bayanai ne kawai — ba sa hana
   haɗawa amma suna bayyana a taƙaitaccen bayanin CI. Duk da haka, gyara su.

---

## Ƙara Sabuwar Ƙofa

1. Ƙirƙiri `scripts/check/check-<name>.mjs` (ko `.ts`). Ƙofofin manufofi suna fita da 0/1.
   Ƙofofi irin na ratchet suna fitar da ma'auni zuwa `quality-metrics.json` ta hanyar `collect-metrics.mjs`.
2. Ƙara `"check:<name>": "node scripts/check/check-<name>.mjs"` zuwa `package.json`, sannan
   a daidaita alias ɗin da ainihin umarninsa a cikin `config/quality/gate-manifest.json`.
   A yi irin wannan daidaitawar yayin canzawa ko cire alias na tabbatarwa da yake akwai.
   Gudanar da `npm run check:gate-manifest`; hook na pre-commit da rarrabe sauye-sauye na CI
   suna tilasta bin wannan ƙa'ida.
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

## Jerin Ayyukan Da Ke Jira Don Daidaitawa (bitar ROI — Mataki na 9 Zagaye na 3)

An daidaita wannan jerin da `ci.yml` a ranar 2026-06-17 (sigar da ta gabata ta tsallake
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Bitar ROI kan jerin da aka daidaita
ta gano waɗannan abubuwan da za a iya sauƙaƙawa. **Haɗe-haɗen sauye-sauyen CI ne na
kai-tsaye; sauya matsayi/cirewa kuwa shawarwarin manufofi ne da aka keɓe wa mai gudanarwa.** Har yanzu ba a
aiwatar da komai daga cikin abubuwan da ke ƙasa ba.

**Waɗannan ma ba a rubuta bayaninsu a sama ba** (na shawara, ƙarancin sigina): aikin `docs-lint`
(markdownlint + Vale, gabaɗayan aikin yana da `continue-on-error`) da kuma keɓantattun tsarin aikin na'urorin dubawa
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` yana cikin
`quality-baseline.json` amma ba a haɗa shi da ratchet mai toshewa a `ci.yml` ba — a halin yanzu
ma'aunin ba shi da alaƙa da wani tsari.

### Haɗewa / cire maimaituwa (na kai-tsaye, ƙarancin haɗari)

An tabbatar da kowane ɗan takara bisa halin gate na kai-tsaye a ranar 2026-06-17 (amince amma a tabbatar);
haɗe-haɗe da dama da suka yi kama da “bayyane” sun ternyata suna ɓoye bashi kuma **ba** sauye-sauye ne masu sauƙin sanyawa kai-tsaye ba.

- **`check:docs-sync` yana gudana sau biyu** — shi kaɗai a aikin `lint`, sannan kuma a cikin `check:docs-all` (`docs-sync-strict`) da husky pre-commit hook. ✅ **AN KAMMALA** — an cire keɓantaccen kiran `lint`.
- **Duba CVE** — ❌ **BA haɗewa ce mai sauƙi ba.** `audit:deps` yana toshe sanarwar haɗari masu matuƙar tsanani da binciken da bai kammala ba a dukkan lockfiles guda biyar, yayin da yake bayar da rahoton sanarwar haɗari masu girma a matsayin gargaɗi ƙarƙashin manufar yanzu; `check:vuln-ratchet` (osv) yana gazawa ne kawai idan aka samu _koma-baya_ idan aka kwatanta da baseline da aka shigar, kuma yana ƙin ma'aunan da suka ɓace idan ana buƙatarsu. Ma'anoni sun bambanta — cire `audit:deps` zai kawar da cikakken gate na haɗari masu matuƙar tsanani da kuma keɓantattun shaidun binciken fakiti. A ci gaba da riƙe duka biyun.
- **Gano zagaye** — ✅ **AN KAMMALA** (#15159 G-01/G-02). Tsohon rubutun nan ya kira `check:cycles` gate “mai kore, da aka zaɓa da kulawa” kuma ya halasta ci gaba da sanya shi mai toshewa saboda `check:circular-deps` (dpdm) ya bayar da rahoton zagaye 91. Wannan koren sakamakon **koren ƙarya ne**: `check:cycles` ya duba ƙananan kundin adireshi 5 (fayiloli 450), ya dace kawai da tsayayyen `import|export … from`, sannan ya watsar da kowane `@/` da `@omniroute/open-sse/` specifier, don haka ba zai iya ganin zagayen dynamic-import + alias waɗanda suka mamaye ma'ajiyar ba. An gyara: yanzu gate ɗin yana bin `src` + `open-sse` (fayiloli 5023), yana tattara specifiers daga TypeScript AST (don haka `import("…")` yana ƙirgawa amma `typeof import("…")` na matsayin nau'i ba ya ƙirgawa), sannan yana warware `paths` na tsconfig. Yana gano zagaye **14**, ba 0 ba. Saboda ba za a iya gyara zagaye 14 da suka riga suka kasance a cikin gate PR ba, yanzu `check:cycles` ya zama **ratchet** (`--ratchet`, iyaka `metrics.cycles.value = 14` a cikin `quality-baseline.json`, `direction: down`) — yana toshe duk wani _koma-baya_ kuma adadin zai iya raguwa ne kawai. CI yana gudanar da `npm run check:cycles:ratchet`. Rage adadin zai gudana tare da **A-01**. `check:circular-deps` (dpdm) zai ci gaba da zama na shawara a matsayin faffadan ra'ayi na biyu.
- **Sarƙaƙiya** — ✅ **AN KAMMALA** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): zagayen ESLint guda ɗaya, yana ƙirgawa bisa ruleId don baselines na cyclomatic+max-lines da cognitive su ci gaba da kasancewa masu zaman kansu; keɓantattun `check:complexity` / `check:cognitive-complexity` za su ci gaba da kasancewa don `--update` na cikin gida.
- **Hana ƙirƙirar bayanan `/api` na ƙarya** — ✅ **AN KAMMALA** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): lissafin FS guda ɗaya na `src/app/api`, openapi-routes + docs-symbols har yanzu suna bayar da rahoto dabam-dabam; keɓantattun abubuwan za su ci gaba da kasancewa don gudu na cikin gida.
- **`check:node-runtime` yana gudana a ayyuka 11** — ⚠️ **ƙarancin ROI.** Kowannensu runner ne daban kuma binciken bai kai sakan 1 ba; jimillar abin da za a adana kusan sakan 10 ne, idan aka kwatanta da rasa kariya mai arha ga kowane aiki. Bai cancanci wannan sauyi ba.
- **`typecheck:noimplicit:core` a CI lint** — ✅ **an cire daga aikin lint** (ya kasance na shawara da `continue-on-error`); filin nau'i mai toshewa shi ne `typecheck:core` + `check:type-coverage`. An riƙe script na cikin gida.

### Sauya matsayi / yanke shawara (manufar mai gudanarwa)

- `check:openapi-security-tiers` (na shawara) — ❌ **BA za a iya sauya shi cikin sauƙi ba.** Yana fita da 0 amma yana gargaɗin cewa wasu hanyoyin `traffic-inspector` ƙarƙashin `LOCAL_ONLY_API_PREFIXES` ba su da bayanin `x-loopback-only: true`. Tilasta shi yana buƙatar fara ƙara waɗannan bayanan zuwa `openapi.yaml`.
- `typecheck:noimplicit:core` (na shawara) — ratchet mai toshewa na `check:type-coverage` ya riga ya mamaye mafi yawansa. A sauya shi zuwa ratchet ko a cire maimaitaccen zagayen `tsc` na biyu.
- `test:vitest:ui` (yanzu **mai toshewa**) — an ware gazawar da ta riga ta kasance a sarari a cikin `vitest.config.ts` tare da bayanan sa ido na `// #8618`; sabbin gazawa za su sa aikin ya gaza.
- `check:secrets` (gitleaks, ratchet mai toshewa) — iyakar yanzu ita ce `metrics.secretFindings` a cikin `quality-baseline.json`. Duk wani keɓancewa yana buƙatar shigarwar `.gitleaks.toml` mai hujja; ma'aunin da ba ya samuwa INCOMPLETE ne. Binciken yana cike gibin native secret scanning na GitHub da `check:public-creds`.
- `check:pr-evidence` (mai toshewa, yana yin grep a kan rubutun PR-body) — yana da babban haɗarin false-positive; cire shi zai raunana aiwatar da Hard Rule #18, don haka wannan hakikanin shawarar manufa ce.
- `semgrep` (keɓantacce kuma na shawara) — yana yin karo da CodeQL a rukunonin OWASP; a haɗa baseline ɗinsa da ratchet ko a cire shi.

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
