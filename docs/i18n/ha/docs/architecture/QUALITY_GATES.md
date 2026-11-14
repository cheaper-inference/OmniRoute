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

## Ƙofar kaya da bayanan kisa

### Shigar ɗan takara

CI da Ƙofar Ƙofar Ƙofar Ƙofa tana fitar da tabbataccen hukunci: `Gate / CI` da `Gate / Quality`. Manufofin shigarsu da aka tsara suna ƙididdige kowane aiki na sama kamar yadda ake buƙata ko shawara. Dole ne aikin da ake buƙata ya yi nasara: ɓacewa, sokewa, tsallakewa, jiran aiki da sakamakon da ba a san su ba ba zai iya kafa PASS. Ingantacciyar takaddun shaida-kawai ko rarrabuwar kasida-kawai na iya sanya layin lamba ba ya aiki; daftarin PR ba ɗan takara karɓuwa ba ne. Alamar `hotfix` baya barin shaida.

Dukansu ayyukan aiki suna rufe PRs cikin rassan main/release, turawa zuwa `main`, aikawa da hannu da abubuwan haɗin gwiwa. Tura, aikawa da haɗa-ƙungiyar suna gudanar da cikakken zaɓi. Turawa zuwa `release/**` baya fara su (2026-10-18): kowane canji ya riga ya aiwatar da matrix akan PR ɗin sa kuma haɗin haɗakar aikin Sakin-Green (`docs/ops/RUNNER_BOX.md` → Hosted line). Forks da ƙungiyoyi masu haɗaka suna amfani da masu gudu da aka karɓa don ayyukan da in ba haka ba zaɓaɓɓen masu gudu da kansu; Dole ne a tabbatar da isassun ƙarfin da aka karɓa kafin fitowa.

PR ta yau da kullun tana gudanar da zaɓe mai sauri. Hanyoyin `full-code` da `full-code-e2e` na manufofin shiga (E2E, haɗin kai, kayan tarihi na kunshin, Electron hayaki, Bun SQLite, tsarin halittu da abokan ciniki) suna gudana ne kawai akan daftarin layin Mergify ko kuma a kan cikakken gudu: `gh workflow run ci.yml --ref <branch>`.

Kowane rasidin JSON yana gano SHA da aka bincika, tafiyar tafiyar aiki da ƙoƙari. CLI ya ƙi rashin daidaiton checkout/event SHA. Gwajin aikin aiki yana ɗaure membobin manufofin zuwa lissafin `needs` na aikin hukunci don haka sabon layin ko cirewa ba zai iya ɓacewa cikin shiru ba. Rasidun sun ƙunshi nasu tsarin aikin, ba buguwa ba, turawa, ko abubuwan ciki na na'urar daukar hotan takardu na ba da shawara. Kunna sunayen rajistan biyu a cikin dokokin reshe shine canjin gudanarwa na daban; ƙara waɗannan ayyukan ba shi da kansa ya kare reshe.

### Haɗa jerin gwano

Alamar `queue` tana aika PR zuwa layin Mergify (`.mergify.yml`). Mergify yana buɗe daftarin PR akan reshen `mergify/merge-queue/`, CI yana gudanar da cikakken zaɓi a wurin, kuma asalin PR yana haɗuwa lokacin da `Gate / CI`, `Gate / Quality` da `Merge integrity (changelog + generated skills)` suka wuce.

Mergify yana rubuta taƙaitaccen jerin gwano a cikin bayanin daftarin, kuma wasu ƙa'idodi na iya gyara shi ma. Waki'ar `pull_request` `edited` akan irin wannan daftarin yana ɗaukar ƙungiyar haɗin gwiwa (`-queue-edit-<run_id>`) don haka ba zai iya soke ainihin aikin daftarin ba, kuma yana tsallake ƙofar da matrix. `Merge integrity` ne kawai ke gudana. Aikin gate ɗin da aka tsallake yana ɗauke da sunan rajistan daban, saboda Mergify yana karanta `Gate / CI` da aka tsallake a matsayin cak ɗin da ya gaza kuma ya ƙaddamar da PR.

Bayan dequee, tura ba koyaushe yana neman PR. Yi comment `@mergifyio queue` akai.

### Riƙe shaida a cikin mai rage karɓa

`scripts/quality/validate-release-acceptance.mjs` yana rage tsarin da aka kawowa da bayyanarsa; bai tabbatar da cewa shirin ya shafi cikakken bututun sakin ba. Rahotonta yana saita `releaseAcceptance: false` a sarari , koda lokacin da wannan shirin ya kasance `VERIFIED`. Gudun aikin `release-acceptance.yml` har yanzu yana amfani da kayan gyara inuwa, ba ainihin gini ba, fakiti, taya ko rasidun tallatawa.

CLI yana buƙatar `--evidence-root` don tabbatar da shaidar da aka riƙe. Ana warware fayiloli azaman `<evidence-root>/<artifact_id>/<member>` kuma ana hashed azaman SHA-256. Rikodin PASS ba tare da shaida ba, fayil ɗin da ya ɓace ko canza, hanya mara lafiya ko alamar haɗin gwiwa yana hana tabbatarwa. Fayilolin da suka ɓace ba su yi daidai da ɓangarorin rajistan ayyukan nasara ba. Canjin SHA/run/attempt da ke wanzu sun kasance masu zaman kansu: madaidaitan bytes ba za su iya ceton dattijon rasit ba. Mutuncin fayil ba hujja ba ce ta sahihancin aiwatarwa ko haɓaka kayan tarihi.

### Ingantattun sikanin sikandire

Ƙirar npm-alaas da aka ƙirƙira da zama memba na sikelin-scan suna rayuwa a cikin `config/quality/gate-manifest.json`. Gudun `npm run check:gate-manifest` don inganta sunayen rubutun da ainihin umarni akan `package.json`; kari, cirewa da drift umarni sun gaza duka ƙugiya na gida da ayyukan rarrabuwa a cikin CI. Laƙabi ba aikin gudana ba ne, misali matrix ko shari'ar gwaji: dole ne a gabatar da waɗannan ƙididdiga azaman masu musanyawa.

Yi amfani da `npm run quality:scan -- --list` ko `npm run quality:scan:fast -- --list` don bincika sunayen laƙabi da aka zaɓa ba tare da aiwatar da su ba. Mai gudu yana kiran wurin shigarwa na npm, don haka lokacin aiki (ciki har da Bun inda aka saita) ana kiyaye shi. Bayanin yana yin rikodin laƙabi a wajen waɗannan bayanan martaba kamar yadda aka kira daban, kuma an hana umarnin kulawa a bayanan bayanan karantawa kawai.

Waɗannan bayanan martaba suna rufe siginar tsaye kawai. Ba sa tabbatar da gwajin samfur, ɗaukar hoto, marufi, cak na waje ko cikakken yarda da ɗan takara. Shigar da kwararar aiki yana amfani da haɗin `config/quality/admission-policy.json` da `scripts/quality/admission-verdict.mjs`. Bayanan martaba-mai lura sun kasance daban; duba cak da rasidun da suka dace da kan su. Ana bayyana cikakkun umarnin mai duba a cikin `config/quality/release-green-static-profile.json`, gami da `audit:deps`, zaɓin gwajin maye gurbi da bincikar fassarar. Loader yana tabbatar da umarnin npm akan package.json da ƙirar CI/Quality ; yana ƙin drift maimakon aiwatar da alamun harsashi a matsayin hujja. Fitowar na'urar daukar hotan SKIP/INCOMPLETE ba zai iya kafa PASS. Bayanan martaba yana yin rikodin keɓanta na waje kuma baya maye gurbin ɗaukar hoto, gwajin matrices, fakiti ko shaidar turawa. Ƙididdiga na ƙasidar da ke ƙasa abin tunani ne, ba hujjar cewa kofa ta gudu ba.

Rubutun suna rayuwa ƙarƙashin `scripts/check/` (ƙofofin siyasa) da `scripts/quality/` (injin ratchet). CI tushen gaskiya shine `.github/workflows/ci.yml`.

### Saki hanyar sauri ta PR (`quality.yml`)

`.github/workflows/quality.yml` yana cika CI akan main/release PRs, turawa zuwa `main`, aikawa da haɗa ƙungiyoyi. PRs yi amfani da bincike mai sauri-tace. An cire kwafin ginin da aka kashe na dindindin; cak na ainihin build/package/boot ya kasance a cikin CI. Rukunin suite da vitest suna gudana ne kawai a cikin CI (`Unit Tests (N/8)` da `Vitest`).

| Ayuba                                            | Iyakar                                                                                                                                                                                                                                                                                                                                                                  | Toshewa                      |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs da docs-duk                                                                                                                                                                                                                                                                                                                                | Ee                           |
| `Fast Quality Gates`                             | Code PRs; cak na tsaye, nau'in nau'in nau'in nau'in nau'in nau'in nau'in nau'in nau'in nau'in nau'in nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i nau'i) wanda aka manta da gwajin gwaji (shawara) |
| `No new ESLint warnings`                         | Code PRs; suppressions-sani lint guard                                                                                                                                                                                                                                                                                                                                  | Ee, gami da cokali mai yatsu |
| `Merge integrity (changelog + generated skills)` | Ba daftarin PRs; canje-canje da ƙirƙira haɓaka fasaha                                                                                                                                                                                                                                                                                                                   | Ee, gami da cokali mai yatsu |

#### Rahoton gwajin 'yan uwa da aka manta

`npm run check:forgotten-sibling-tests` yana gudana azaman matakin shawara na `Fast Quality Gates` kuma yana sake amfani da mai warware shigo da kaya bayan taswirar tasirin gwajin. Ga kowane samfurin samarwa da aka canza, yana bayar da rahoton sarƙoƙi na `changed module/symbol -> static consumer -> candidate sibling test` lokacin da gwajin ɗan takarar ya ɓace daga bambance-bambancen buƙatun ja. Takaitaccen bayanin Markdown da sakamakon JSON ana kiyaye su azaman kayan aikin `forgotten-sibling-tests` don daidaitawa kafin duk wani aikin toshewa.

Sake fitar da ganga da shigo da kaya masu kuzarin gani ne kawai; ba su taɓa haifar da gano abin toshewa ba. Abubuwan da aka bita suna rayuwa a cikin `config/quality/forgotten-sibling-allowlist.json`. Kowane shigarwa dole ne ya ambaci mabukaci da gwajin ɗan takara, bayar da takamaiman dalili, kuma ya danganta batun GitHub ko buƙatar ja. An kasa rufe shigarwar mara kyau. Keɓancewa ba za su iya murkushe gwajin ɗan takara da aka goge ba ko bambancin da ke ƙara `.skip`/`.todo`; tabbatar da rauni da sauran abin rufe fuska sun kasance mallakin ƙofar `check:test-masking` mai zaman kanta.

### Ayuba: `lint`

Yana gudana akan kowane PR zuwa `main`. Tubalan sun haɗu akan gazawar.

| Rubutun (`npm run ...`)           | Yana tabbatarwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Toshewa                                |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `check:node-runtime`              | sigar Node.js tana cikin kewayon da aka goyan baya                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ee                                     |
| `check:cycles`                    | Ana shigo da madauwari a duk faɗin `src/` + `open-sse/` ( tushen AST, tsconfig `paths` warware). Bare yana fita 1 a duk lokacin da kowane zagayowar ya wanzu (ba a rufe tun #15281) kuma yana lissafin SCCs. `check:cycles:ratchet` (abin da CI ke gudana) yana toshe lokacin da ƙidayar ta zarce silin `metrics.cycles` a `quality-baseline.json` — a halin yanzu 14, `direction: down`, don haka yana iya faɗuwa kawai (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da (rasa)                              |
| `check:boundary`                  | haɗakar `open-sse → src` : keɓaɓɓen shigo da fayil-zuwa-fayil daga injin zuwa cikin app (`scripts/quality/measure-boundary.mjs`; jeri na gefen shine v4 core/module-split remediation backlog). Bare = rahoton shawara (daidai da `quality:boundary`). `check:boundary:ratchet` (abin da CI ke gudana, shima a cikin `quality.yml` fast-gates ratchet loop) toshe lokacin da ƙidayar ta zarce silin `metrics.boundaryOpenSseToSrc` a cikin `quality-baseline.json` — iri a ma'aunin 771, `direction: down`; `--update` yana rage shi kawai; Dangin tushe akan PRs (`--base-ref`, duba ƙasa)                                                                                                                                                                                                                                                                                                                                      | Da (rasa)                              |
| `check:route-validation:t06`      | tsare-tsaren Zod suna kan duk hanyoyin (manufofin Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ee                                     |
| `check:any-budget:t11`            | ƙidaya `@ts-expect-error // any` bai wuce kasafin kuɗi ba (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ee                                     |
| `check:provider-consistency`      | Kowane mai bayarwa a cikin `providers.ts` yana da madaidaicin shigarwa a cikin `providerRegistry.ts` (kuma akasin haka, cikin jerin izini)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ee                                     |
| `check:model-lifecycle`           | Teburan kewayawa da hannu guda uku suna tsayawa daidai da hoton zagayowar rayuwa da aka duba (#11503): `FITNESS_TABLE` (`taskFitness.ts`) babu alamar id mai ritaya da `REGISTRY` zai iya bi; kowane maƙasudin `BUILT_IN_ALIASES` yana nan a cikin `REGISTRY` kuma baya nan daga hoton-id mai ritaya; duk id mai ritaya har yanzu yana cikin `REGISTRY` ana tura shi ko a jera shi a cikin `allowedRetiredInCatalog`; kuma babu tushen `DEFAULT_DEGRADATION_MAP` ko manufa da ya bayyana ya yi ritaya a wannan hoton. Wannan baya tabbatar da cewa a halin yanzu ana amfani da samfurin ta hanyar kai tsaye. — na kan layi yana kwatanta da `config/quality/model-lifecycle.json`, an wartsake da hannu tare da `npm run quality:refresh-model-lifecycle` (cibiyar sadarwa; ba a haɗa shi cikin CI). `allowedRetiredInCatalog` bera ne mai ƙonawa: ƙara shigarwa kawai tare da batun bin diddigi.                                | Ee                                     |
| `check:fetch-targets`             | Kowane `fetch("/api/...")` a cikin abokin ciniki-gefen `src/` yana warwarewa zuwa ainihin `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ee                                     |
| `check:deps`                      | Duk `npm install` -able deps a fadin kowane `package.json` a cikin repo suna cikin `dependency-allowlist.json`; sabbin fakitin da ba a lanƙwasa ko gangare masu tuta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ee                                     |
| `audit:deps`                      | npm duba duk fayilolin kulle masu zaman kansu guda biyar (tushen, Electron, OpenCode plugins v1/v2 da mai bayarwa). Mahimman shawarwari toshe; manyan shawarwari sun kasance gargaɗin bayyane. Missing/failed duban su ne INCOMPLETE da toshe; Ana ajiye hashes na kulle kowane-ikon da rahotanni.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ee                                     |
| `check:lockfile`                  | `package-lock.json` mutunci — https rajista, hashes na mutunci, babu mai watsa shiri da ya soke                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ee                                     |
| `check:licenses`                  | Jerin izinin lasisi SPDX don abubuwan dogaro da samarwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ee                                     |
| `check:tracked-artifacts`         | Babu ginanniyar kayan tarihi / aikata `node_modules` symlinks (kuma yana gudana cikin husky pre-commit; pre-turawa yana da niyya haske — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ee                                     |
| `check:ai-attribution`            | Babu AI/bot `Co-Authored-By` tirela ko ƙafar AI-ƙarni a cikin PR da ke aikatawa, take ko jiki — Hard Rule #16 (a cikin `quality.yml` madauki mai sauri don PR→ `release/**` — yana karanta nauyin taron, babu-op kashe PRs — da mataki na PR-kawai a cikin `ci.yml` lint don PR→ `main`; kuma an yarda copsky `commit-msg` ; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:vitest-exclusions`         | Kowane keɓanta Vitest suna suna batun bin diddigi kuma yana bayyana a cikin `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ee                                     |
| `check:file-size`                 | Fayilolin tushe (`.ts`/`.tsx` a cikin `src/`, `open-sse/`, `electron/`, `bin/`) tsaya a cikin `cap` da fayilolin gwaji (`*.test.ts(x)`) a cikin `testCap`; Fayilolin da aka daskare a cikin `file-size-baseline.json` (`frozen` / `testFrozen`) dole ne su wuce girman da aka yi rikodin su                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ee                                     |
| `check:error-helper`              | Amsoshin kuskure a cikin executors/handlers yi amfani da `buildErrorBody()` / `sanitizeErrorMessage()` (Hard Dokokin #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ee                                     |
| `check:migration-numbering`       | Fayilolin ƙaura SQL ana ƙididdige su a jere, babu gibi ko kwafi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ee                                     |
| `check:public-creds`              | Babu ainihin OAuth `client_id`/`client_secret` ko maɓallan gidan yanar gizo na Firebase a wajen `publicCreds.ts` (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ee                                     |
| `check:db-rules`                  | Babu danyen SQL a wajen tsarin `src/lib/db/` ; babu ganga-shigo da ganga daga `localDb.ts` (Hard Dokokin #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ee                                     |
| `check:known-symbols`             | Masu aiwatar da masu ba da izini, dabaru, da masu fassarorin da aka yi rajista a cikin allunan aika aika sun yi daidai da fayilolin da ke kan faifai — babu alamomin marayu ko waɗanda ba a bayyana ba.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ee                                     |
| `check:route-guard-membership`    | Duk hanyar da ta haifar da tsarin yaro ana rarraba ta ta `isLocalOnlyPath()` (Hard Dokokin #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ee                                     |
| `check:test-discovery`            | Kowane fayil `*.test.ts` / `*.spec.ts` a cikin repo ana tattara shi ta aƙalla mai gudu ɗaya (ratchet: jerin marayu a cikin `test-discovery-baseline.json` kawai zai iya raguwa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ee                                     |
| `check:test-tla-order`            | Babu fayil ɗin `node:test` ƙarƙashin `tests/unit` da yayi rijistar gwaji, ya sami babban matakin `await`, sannan yayi ƙarin rijista (#18045; ratchet: `test-tla-order-allowlist.json` zai iya raguwa kawai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ee                                     |
| `check:agent-skills-sync`         | Ƙirƙirar ƙwararrun ƙwararrun wakilai-ƙwararrun kayan tarihi sun dace da kasidar tushen su (babu drift)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:provider-asset-provenance` | Mai ba da logos/assets yana ɗauke da shigarwar da aka yi rikodi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `lint:json`                       | JSON daidaita fayilolin ɓarna kuma ku gamsar da ƙa'idodin repo lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `typecheck:core`                  | harhada TypeScript ba tare da kurakurai ba ( gargaɗin shawara kawai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ee                                     |
| `typecheck:noimplicit:core`       | M `noImplicitAny` — mai kallon gaba; yawancin wuraren kiran da suka rigaya har yanzu suna buƙatar bayanai                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **Nasiha** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` scoped to `src/app/(dashboard)/**` (#7033) — `typecheck:core`'s curated 27-file allowlist baya haɗa da kowane dashboard TSX, kuma `next build` bai taɓa taɓa buga shi ko ɗaya ba (`next.config.mjs` yana saita `ignoreBuildErrors: true`), don haka koma baya ga marayu a can (#6625/#6909) CI ba ya iya gani. Ya bambanta da daskararren ƙidayar ƙidayar per-file/per-TS-code (`config/quality/dashboard-typecheck-baseline.json`, tsarin aiwatar da aiki iri ɗaya kamar `check:known-symbols`) — kurakurai NEW kawai fiye da ƙididdige ƙididdiga sun kasa ƙofar; ratchet saukar da `--update` lokacin da aka gyara kuskuren da ya gabata.                                                                                                                                                                                                                                                                                | Ee                                     |
| `check:build-typecheck`           | Nau'in samarwa gabaɗaya aikace-aikacen duba `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), jerin izinin fayil 27 na saman `typecheck:core` da ƙofar dashboard ba sa rufe. Saɓani da `config/quality/build-typecheck-baseline.json`; sabon ko haɓaka kowane-- (fayil, code) ƙidaya ya gaza, ƙaramin ƙidayar yana tambayar ku don ratchet. `--update` ya ƙi yayin da gudu ya ƙunshi sabon ko ɗaga biyu sai dai idan an wuce `--force-regressions`, kuma ya ƙi sabon fayil ɗin shiru sai dai idan an wuce `--force-nocheck`, don haka faɗaɗa tushen don samun kore da ba da shiru na dindindin ayyuka biyu ne na gangan. An ƙi `--force` mara tushe. Hakanan yana duba ikon ginin `@ts-nocheck` akan `config/quality/ts-nocheck-baseline.json`, saboda fayil ɗin da ke amfani da shi yana ba da rahoton wani bincike ko kaɗan kuma in ba haka ba zai kasance ganuwa ga kowace kofa. | Ee                                     |

#### Shirye-shiryen nau'in nau'i biyu suna amsa daban-daban

`typecheck:core` da `check:build-typecheck` suna tattara shirye-shirye daban-daban a ƙarƙashin zaɓuɓɓuka daban-daban, kuma fayil iri ɗaya na iya zama mai tsabta a cikin ɗayan kuma cike da kurakurai a ɗayan.

`tsconfig.build.json` tana saita `"strict": false`, don haka an kashe `noImplicitAny`. Babban saitin yana tattara jerin izinin fayil 27 da aka keɓe tare da zaɓuɓɓuka masu tsauri kuma suna bin kowane jadawali shigo da shi, don haka fayilolin da ba su bayyana a cikin shirin ginin har yanzu ana duba su a can.

Sakamakon yana da mahimmanci yayin yanke hukunci ko an buga fayil:** Sifili diagnostics karkashin `check:build-typecheck` baya nufin sifili** . Cire `@ts-nocheck` daga fayilolin 26 ya nuna 23 daga cikinsu mai tsabta a cikin shirin ginawa; goma sha shida daga cikin wadanda suka bayyana kusan 120 a fakaice-kowane kurakurai a cikin tsauraran. Bincika duka biyun kafin kiran fayil mai tsabta.

### Ayuba: `quality-gate`

Gudu bayan `test-coverage`. Tubalan sun haɗu akan gazawar.

| Rubutun                      | Yana tabbatarwa                                                                                                                                                                         | Toshewa                 |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `quality:collect`            | Emits `quality-metrics.json` (ƙididdigar faɗakarwar ESLint, ɗaukar hoto daga haɗewar rahoton shard)                                                                                     | Ee (na sama na ratchet) |
| `quality:ratchet`            | Kowane ma'auni a cikin `quality-baseline.json` bai koma baya ba ( kashedin ESLint tushen tushen ≤, ɗaukar hoto ≥ tushe)                                                                 | Ee                      |
| `check:duplication`          | Kwafin lamba (jscpd@4) baya wuce tushe a cikin `quality-baseline.json`                                                                                                                  | Ee                      |
| `check:complexity`           | Matsalolin cyclomatic matakin-fayil baya wuce iyaka (zuriyar ESLint `complexity` + `max-lines-per-function`)                                                                            | Ee                      |
| `check:cognitive-complexity` | Ƙwararren fahimta ratchet (`eslint-plugin-sonarjs`) — raba ESLint wucewa; CI yana gudanar da duka biyun a hade azaman matakin `check:complexity-ratchets` ɗaya                          | Ee                      |
| `check:dead-code`            | Fitar da fayilolin da ba a yi amfani da su ba (knip) baya komawa baya vs asali                                                                                                          | Ee                      |
| `check:compression-budget`   | Kasafin ma'aunin ma'aunin matsi — kowace injin token token-ajiye benaye dole ne kada su koma baya                                                                                       | Ee                      |
| `check:type-coverage`        | ratchet nau'in kashi (`type-coverage`) baya komawa baya; mafi yawan subsues `typecheck:noimplicit:core`                                                                                 | Ee                      |
| `check:codeql-ratchet`       | Buɗe ƙididdige faɗakarwar CodeQL baya komawa baya ( karanta ta hanyar `gh api`; Tsalle mai kyau ba tare da alama ba) — refresh cadence and manual trigger: duba "CodeQL ratchet" a ƙasa | Ee                      |

### Ayuba: `quality-extended`

Gaba ɗaya aikin shawara ne (`continue-on-error: true`). Ratchets na tushen npm suna gudana da gaske; na'urorin daukar hoto na waje suna shigarwa ta hanyar `gh release download` da tsalle-tsalle (fita 0) lokacin da binary ba ya nan.

| Rubutun                  | Yana tabbatarwa                                                                                                                                                                                                                            | Toshewa                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| `check:circular-deps`    | Babu abin dogara da'ira (dpdm)                                                                                                                                                                                                             | **Nasiha**                                                 |
| `check:bundle-size`      | Girman damfara bai wuce hula ba                                                                                                                                                                                                            | **Nasiha**                                                 |
| `check:secrets`          | Binciken sirri (gitleaks) — ya tsallake idan binary ba ya nan                                                                                                                                                                              | **Nasiha**                                                 |
| `check:vuln-ratchet`     | Lalacewar dogaro (osv-scanner) baya komawa baya — `--ratchet` ta gaza kamar INCOMPLETE (fita 2) idan ba a auna ba                                                                                                                          | **Nasiha**                                                 |
| `check:workflows`        | Ayyukan aiki (actionlint + zizmor); missing/broken na'urar daukar hotan takardu, rahotanni marasa inganci ko ɓataccen tushen ratchet sun kasa kamar INCOMPLETE. Bincike mai inganci yana bin manufofin strict/advisory/ratchet da aka zaɓa | Ana buƙatar aiwatar da kisa; zizmor ratchet blocking in CI |
| `check:openapi-breaking` | Kwangilar API ta jama'a game da abubuwan da aka haɗa (PR merge-base, turawa kafin, tushen ƙungiyar; scheduled/manual wurin biya iyaye na farko); ma'aunin da ake buƙata ya kasa rufe                                                       | **Toshewa da --ratchet**                                   |

### Ayuba: `docs-sync-strict`

Yana gudana akan kowane PR zuwa `main`. Tubalan sun haɗu akan gazawar.

| Rubutun                        | Yana tabbatarwa                                                                                                                                                                                   | Toshewa                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `check:docs-all`               | Meta-gate wanda ke gudanar da ƙananan ƙofofin 6 a ƙasa a jere                                                                                                                                     | Ee                        |
| ↳ `check:docs-sync`            | daidaiton sigar CHANGELOG / OpenAPI / llm.txt                                                                                                                                                     | Ee                        |
| ↳ `check:docs-counts`          | Ƙididdigar ƙididdiga (ƙidaya masu bayarwa, ƙidayar ƙaura, da sauransu) suna cikin tagar ratchet na ainihin kirga.                                                                                 | Ee                        |
| ↳ `check:env-doc-sync`         | Kowane env var a cikin `.env.example` an rubuta shi a cikin tebur na docs, kuma akasin haka                                                                                                       | Ee                        |
| ↳ `check:deprecated-versions`  | Babu igiyoyin sigar da aka yanke a cikin takardu                                                                                                                                                  | Ee                        |
| ↳ `check:doc-links`            | Hanyoyin haɗin alamar ciki a cikin docs suna warware fayiloli na ainihi ( siffan `[text]`/`(path)` )                                                                                              | Ee                        |
| ↳ `check:fabricated-docs`      | Hanyoyi, env vars, umarnin CLI, sunayen ƙugiya, da hanyoyin fayil da aka ambata a cikin takaddun suna wanzu a cikin codebase. Ƙofa mai wuya ta hanyar `--strict`; taushi-kasa ba tare da tuta ba. | Ee (via `--strict` in CI) |
| `check:cli-i18n`               | igiyoyin umarni CLI suna nan a cikin duk fayilolin gida na i18n                                                                                                                                   | Ee                        |
| `check:openapi-coverage`       | OpenAPI spec ya ƙunshi aƙalla bene mai ƙima na ainihin hanyoyi                                                                                                                                    | Ee                        |
| `check:openapi-security-tiers` | Bayanan matakin tsaro a cikin `openapi.yaml` sun yi daidai da rabe-raben `routeGuard.ts`                                                                                                          | **Nasiha**                |
| `check:openapi-routes`         | Kowace hanya a cikin `openapi.yaml` tana warwarewa zuwa ainihin `route.ts` (anti-hallucination)                                                                                                   | Ee                        |
| `check:docs-symbols`           | Duk wata magana ta `/api/...` a cikin `docs/**/*.md` tana warwarewa zuwa ainihin `route.ts` (anti-hallucination)                                                                                  | Ee                        |
| `i18n translation drift`       | Maɓallan da ba a fassara su a cikin i18n fayilolin gida — gargaɗi kawai                                                                                                                           | **Nasiha**                |

An samar da SVGs README sha biyu a ƙarƙashin `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` yana sabunta su duka). Kowannensu yana da gwajin kwatankwacin byte (`tests/unit/docs/readme-*-svg.test.ts`, `test-unit` aiki) wanda ke kasawa lokacin da fayil ɗin da aka aikata ya ƙare, kuma `check:docs-counts` yana karanta lambobi na canonical daga nodes `<text>` — wanda shine dalilin da ya sa matakin fayyace yana kiyaye kowane kirtani da aka zayyana a cikin fayil ɗin azaman `<text>` marar ganuwa. Duban lambobin canonical SVG yana karanta fayilolin da aka jera a cikin `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, da `public/images/tier-flow-dark.svg` da `tier-flow-light.svg`; free-har abada, katalogi-shigarwa, maimaituwa-pool da maki-da'awar da'awar kuma karanta `promise-pillars.svg`, `free-tier-budget.svg` da `strategies-grid.svg`. `free-tier-budget.svg` yana zana alkalummansa daga mai ɗaukar kaya mai rai, don haka canzawa zuwa `FREE_MODEL_BUDGETS` ko zuwa mai bada suna nuna ja CI har sai an sake sabunta fayil ɗin.

### Ayuba: `i18n-ui-coverage`

| Rubutun                           | Yana tabbatarwa                                                                                                                                                                            | Toshewa    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `check-ui-keys-coverage` (inline) | UI i18n key ɗaukar hoto shine ≥ 65%                                                                                                                                                        | Ee         |
| `check-ui-value-drift` (inline)   | Turanci da aka sake rubuta** daraja** ba ya barin tafsirin fassarar baya                                                                                                                   | Ee         |
| `check-new-key-coverage` (inline) | A** sabo** Ana fassara maɓalli na Ingilishi a kowane yanki — ana ƙi alamar `__MISSING__:`                                                                                                  | Ee         |
| `check-translation-ratio`         | Matsakaicin fassarar gaskiya a kowane yanki (daidai-zuwa-Turanci / mai riƙewa / bacewar ganye a wajen jerin izini) dole ne ya wuce `config/quality/i18n-translation-baseline.json` + slack | **Nasiha** |

Yana buƙatar `fetch-depth: 0` — Ƙofar ɗigon ƙima ta bambanta `en.json` da tushen haɗin kai.

#### `check-ui-value-drift` — stale-fassara ƙofar

Ya kama koma bayan i18n da sauran ƙofofin ba za su iya gani ba: ana sake rubuta ƙimar Ingilishi kuma fassarorin da aka samo daga _previous_ turanci sun tsaya a baya, don haka masu amfani da Ingilishi ba su ci gaba da karantawa da tabbaci-kalmomi, kwafin yanzu ba daidai ba.

An aika wannan don gaske. An sake rubuta `oauthModal.googleOAuthWarning` lokacin da mai taimakon shiga Antigravity ya sauka (#5203);** 39 daga cikin 43 yankuna** ya ci gaba da gaya wa masu aiki da rubutu su "kwafi cikakken URL su liƙa a ƙasa" — gudana wanda ba zai iya kammalawa ga mai badawa ba. Ba a lura da shi ba har #8463 saboda:

- `sync-ui-keys` kawai yana mayar da makullin da suke** ba ya nan** , ba wanda suke** tsayayye** ;
- `check-ui-keys-coverage` yana ƙirga maɓalli _presence_, don haka dattijon fassarar yana da maki kamar yadda aka rufe;
- `check-translation-drift` yana bin `docs/i18n/<locale>/**.md` takaddun takaddun — ba ya karanta `src/i18n/messages/*.json`. Toshewa a cikin aikin `docs-sync-strict` tun 2026-09 sake daidaitawa: gyara ainihin doc → `npm run i18n:run -- --files=<doc>` (matakin sashe, mai arha).

**Bambance-bambance, ba mai goyan bayan tushe ba.** Yana kwatanta `en.json` a gindin haɗin kai da itacen aiki; ga kowane maɓalli wanda ƙimar Ingilishi ya canza, duk wani yanki da har yanzu yana riƙe da fassarar da ba a taɓa taɓawa ba ya daɗe. Wannan da gangan** daskare bashin da ya kasance** — diff ba zai iya bayyana wanne tsohuwar Ingilishi fassarar da aka daɗe ba ta fito, don haka ƙofar ta yanke hukunci kawai abin da canjin yanzu ya taɓa. Madadin (maɓallin maɓalli na kowane maɓalli) zai kashe fayil ɗin ~ 600 KB da aka samar, 3 × mafi girman tushen tushen da ake da shi, yana ɓarna akan kowane i18n PR.

Hanyoyi biyu don gamsar da shi:

1. sabunta fassarorin da abin ya shafa, ko
2. saita su zuwa `__MISSING__:<new english>` — lokacin aiki sannan a ba da ingantaccen Ingilishi (`src/i18n/request.ts::deepMergeFallback`, #7258) da maɓallan layukan fassara.

Idan igiyar ta** ma'ana** canza, fi son** canza sunan maɓalli** : sabon maɓalli ba zai iya gadon juzu'in fassarar. Wato tsarin #8463 da aka yi amfani da shi.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Yana fita 0 tare da `SKIP reason=base-unresolved` lokacin da ba za a iya karanta kasidar tushe ba (clone mai zurfi ba tare da ref na tushe ba), yana kwatanta `check-openapi-breaking`.

### Ayuba: `i18n`

Cikakken matrix ingantaccen i18n (aiki ɗaya a kowane yanki). Gabaɗayan aikin shawara ne.

| Rubutun                         | Yana tabbatarwa                | Toshewa                                           |
| ------------------------------- | ------------------------------ | ------------------------------------------------- |
| `validate_translation.py quick` | Cikakken fassarar kowane yanki | **Nasiha** (`continue-on-error: true` on all job) |

### Ayuba: `pr-test-policy`

Yana gudana akan buƙatun ja kawai.

| Rubutun                | Yana tabbatarwa                                                                                                                          | Toshewa |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:pr-test-policy` | PRs wanda ke canza lambar samarwa a `src/`, `open-sse/`, `electron/`, ko `bin/` dole ne ya haɗa ko sabunta gwaje-gwaje (Hard Dokokin #8) | Ee      |
| `check:test-masking`   | Fayilolin gwaji da aka canza baya rage ƙididdige ƙididdigewa ko ƙara tautologies `assert.ok(true)`                                       | Ee      |
| `check:pr-evidence`    | Jikin PR ya kawo shaidar test/VPS don canji (Mai sarrafa Hard Rule #18 ta hanyar grepping PR prose — mai rauni, duba Backlog)            | Ee      |

### Ayuba: `test-vitest`

Gudu bayan `build`. Tubalan sun haɗu akan gazawar.

| Suite            | Yana tabbatarwa                                                     | Toshewa                                                                                                          |
| ---------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | uwar garken MCP (kayan aikin 110), autoCombo, cache — vitest runner | Ee                                                                                                               |
| `test:vitest:ui` | bangaren UI yana gwada mafi — gudu                                  | **Toshewa** An cire gazawar — da ta kasance a bayyane a cikin `vitest.config.ts`; sababbin gazawar sun kasa aiki |

### Gudun aikin dare (tsara, shawara)

Waɗannan suna gudana akan jadawalin cron ( da `workflow_dispatch`), ba a kan PRs. Duk nasiha ne.

| Gudun aiki             | Yana tabbatarwa                                                                                                                                                | Toshewa    |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `nightly-property`     | gwaje-gwajen kaddarorin da sauri-bincike tare da bazuwar iri + babban gudu                                                                                     | **Nasiha** |
| `nightly-resilience`   | Ƙofar girma-girma, hargitsi laifin allura, k6 load/soak                                                                                                        | **Nasiha** |
| `nightly-llm-security` | Mai gadin allura da gaggawa (yanayin toshe) + garak bincike (an tsallake ba tare da sirrin mai bayarwa ba)                                                     | **Nasiha** |
| `nightly-schemathesis` | kwangilar OpenAPI mai ban mamaki (ƙirƙira) akan OmniRoute mai rai ta amfani da `docs/openapi.yaml` — saman fassarorin ketare / 500s marasa kulawa (Fase 8 B.4) | **Nasiha** |
| `nightly-mutation`     | Makin gwajin maye gurbi na Stryker akan makin naúrar sauri — tsirar da mutants saman fage marasa ƙarfi.                                                        | **Nasiha** |
| `nightly-compat`       | Matrix dacewa injin node a cikin jeri na `engines.node` da aka goyan baya                                                                                      | **Nasiha** |

Ana yin rikodi na tushen ayyuka (tuni, TTFB, lokacin ginawa), ba gated: duba [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Matsayin saurin gudu (2026-08-30 → v4.0 LTS): kowane tushe an sassauta shi da kashi 20%

Shawarar mai shi (2026-08-30): har zuwa modularization v4.0, saurin jigilar kaya yana da mahimmanci fiye da riƙe layin bashi. Kowanne** lamba** An sassauta tushen ratchet da kashi 20 cikin ɗari a cikin fasfo ɗaya da za a iya tantancewa, kuma an ayyana matakin a cikin `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Me ya canza                                                                                                                                                                                             | Ina                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — ƙananan-ne-mafi kyawun ƙirga × 1.2, mafi girma-shi-mafi kyaun kaso ÷ 1.2 (shafin bene 60 da aka ajiye, `eslintErrors` ya tsaya 0, `eslintWarnings` 0 → 20% na ƙididdige daskararre) | `quality-baseline.json` ( jerin bayanan `_relax_velocity_2026_08_30` kowane kafin → bayan)             |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                        | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, kowane `frozen[*]` / `testFrozen[*]` line cap × 1.2                                                                                                                                   | `file-size-baseline.json`                                                                              |
| per-file / per-TS-code yana ƙidaya × 1.2                                                                                                                                                                | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                     | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` ta zama nasiha yayin da `_policy.requireTighten === false`                                                                                                                          | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| `bank-ratchet-shrinks` na dare yana tsayawa (zai bankado raguwar da aka auna kuma ya gyara dakin kai)                                                                                                   | `.github/workflows/nightly-release-green.yml`                                                          |

Masu ba da izini (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`, …).** ba** kasafin kudi kuma ba a taɓa su ba. Ƙofofin manufofin Pass/fail (asiri, dokokin SQL, kwangilar docs/env, i18n daidaito, gwaje-gwaje naúrar) ba su canzawa — gwajin ja har yanzu gwajin ja ne.

**Kayan aiki**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — hutun harbi daya (`scripts/quality/relax-baselines.mjs`); ya ƙi gudu sau biyu tare da rubutu iri ɗaya.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` — yana auna kowace kofa na lamba kamar yadda CI yake yi kuma yana buga sauran ɗakin kwana a kowace kofa (`scripts/quality/baseline-headroom.mjs`). Aikin `baseline-headroom` na dare yana buga tebur a cikin taƙaitaccen tafiyar tafiyar aiki kuma yana loda rahoton JSON/Markdown ɗinsa azaman `baseline-headroom-<run_id>`, wanda aka riƙe har tsawon kwanaki 90. Gargadi da layuka masu mahimmanci suna gano ƙofofin cikin kashi 10% na hular su ko kuma sun riga sun wuce ta. Yi bitar waɗannan rahotanni a matsayin gargaɗin farko na kasafin kuɗi da ake cinyewa; duba bayanan `_rebaseline_*` na kofa mai laifi. Aikin baya ƙirƙira ko sabunta batun dindindin; #12149 tana adana tarihin rahoton farko.

**Yanayin sabon-ladi (Tsaftace-as-You-Code) — tun 2026-08-30, PR -hanyar sauri kawai**

Akan abubuwan `pull_request` `quality.yml` yana wuce `--base-ref <PR base SHA>` zuwa `check:file-size`, `check:complexity-ratchets` da `check:dead-code`. Don `check:complexity-ratchets` da `check:dead-code` ƙofar tana kwatanta HEAD da tushen haɗakarwa** iyakance ga fayilolin da PR ya taɓa** (`scripts/check/newCodeMode.mjs`: haɗin ginin yana samuwa a cikin jefar `git worktree`, ESLint/knip gudu a can kuma akan HEAD, ƙididdiga na kowane fayil yana bambanta):

- **tarewa** — da PR ya ƙara cin zarafin cyclomatic/cognitive ko fitarwar da aka mutu a cikin fayilolin da ya canza (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` a cikin log);
- **shawara** — jimlar duniya vs. tushen daskararre. Gado ba ya jan PR mara laifi; drift ɗin yana sake daskarar da shi a sakin sulhu kuma yana kallo ta aikin headroom.

`check:file-size` yana amfani da tushe ref akan sharuɗɗansa (`scripts/check/check-file-size.mjs`, #8522): yana bincika kowane tushe da fayil ɗin gwajin da ke cikin bishiyar, yana karanta ƙididdigar kowane layi a gindin PR tare da `git show`, kuma ya kasa fayil kawai lokacin da ya girma ya wuce mafi girma na rufin tushe (`frozen` / `testFrozen`, ko `cap` / `testCap` ga fayil a waje da tushe.) Fayil ɗin da ya riga ya yawo akan tushe saboda haka baya jan PR mara laifi.

`check:boundary:ratchet` tana aiki da ƙa'ida ɗaya ga lambarsa ɗaya (`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): akan abubuwan da suka faru PR duka biyun `quality.yml` fast-gates da `ci.yml` lint job sun wuce PR tushe SHA, ƙaddamar da tushe ana auna shi daga `git archive` fitarwa, kuma PR ya gaza ne kawai lokacin da ƙididdige gefen `open-sse → src` ɗinsa ya wuce mafi girma na `metrics.boundaryOpenSseToSrc` da ƙidaya akan tushe. An ba da rahoton ƙwanƙwasa tushe sama da rufin (`base drift herdado`) amma ba zai taɓa jan PR mara laifi ba; tura → main yana kiyaye rufin kwata-kwata, sai wani gindin da ba SHA warware ba ya fado masa da gargadi.

`workflow_dispatch` yana gudana, share kore-kore da aikin ɗakin kwana na dare ba su da tushe PR kuma suna kiyaye cikakkiyar kwatancen (duniya). Rufewa, kwafi da nau'in ɗaukar hoto suna kasancewa a duniya a yanzu (kayan aikinsu ba sa samar da bambancin kowane fayil da rahusa) ƴan takarar — don jiyya iri ɗaya.

**Rufe lokaci a v4.0 (LTS = mai ƙarfi fiye da da, ba "komawa zuwa al'ada ba")**

1. A kan tsattsauran tip `release/v4.0.0` : `npm run quality:headroom --json` don rikodin, sannan `npm run quality:ratchet -- --update`, `check:file-size --update`, `check:complexity-ratchets --update`, `check:dead-code --update`, kowane ƙofa ta bugu `--update` — kowane tushe yana faɗuwa zuwa ƙimar da aka auna.
2. Share `_policy` daga `quality-baseline.json` (sake makamai `--require-tighten` da bankin dare), mayar da `THRESHOLD = 36` (ko mafi girma) a cikin `check-openapi-coverage.mjs`.
3. Ƙarfafa fiye da ƙididdigewa inda aka biya kuɗin daidaitawa: girman fayil ɗin `cap` baya zuwa 1000 (ko 800), shimfidar benaye + 5, fitar da matattu 0 don fakitin da aka daidaita.

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

## Manufar Lissafin Bada izini

Kowace ƙofa da ba za ta iya yin kasala kan ƙetare da aka rigaya ba tana amfani da daskararre jerin izini (misali, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Manufar ita ce:

**Gyara tushen dalilin; yi amfani da lissafin izini kawai lokacin da cin zarafi ya riga ya kasance kuma ba za a iya gyarawa a cikin PR ɗaya ba.**

Lokacin ƙara shigarwa zuwa lissafin izini:

1. Haɗa sharhi tare da hujja.
2. Duba batun bin diddigin (misali, `// #3498 — Phase 2 feature, not yet implemented`).
3. Cire shigarwar a cikin PR guda ɗaya wanda ke gyara ƙetare — shigarwar da ba ta daina dakatar da cin zarafi ba ita kanta aibi ne (6A.3 stale-confirment will fail the ƙofa kan shigar marayu da zarar an aiwatar da shi).

Yi** ba** ƙara shigarwar lissafin izini don yin gwaje-gwaje su wuce da sauri. Ƙofar kore tare da lissafin izinin girma shine ma'anar inganci na ƙarya.

### Idan wata kofa ta gaza akan PR

1. **Karanta fitarwar ƙofar a hankali** — yana gaya muku ainihin fayil ko alamar da ta keta ka'ida.
2. **Gyara cin zarafi** — mafi yawan ƙofofin bincike ne na tsarin tsarin fayil waɗanda ke wucewa da zarar lambar ta yi daidai.
3. **Idan cin zarafin ya riga ya kasance** (watau, ba ku gabatar da shi ba amma ƙofar yanzu ta rufe ta): ƙara shigarwar lissafin izini tare da bayanin hujja da batun bin diddigi.
4. **Idan kofar bera ce** (shafi, gargadin ESLint, kwafi, rikitarwa): Canjin ku ya sa ma'aunin ya yi muni. Gyara al'amarin, ko (da wuya) gudanar da `npm run quality:ratchet -- --update` idan canjin na ganganci ne kuma lalacewar awo ta kasance karɓuwa — amma rubuta dalilin da yasa a cikin bayanin PR.
5. **Ƙofofin shawarwari** (`continue-on-error: true`) sune — na bayanai ba sa toshe haɗuwa amma suna bayyana a cikin taƙaitaccen CI. Gyara su ko ta yaya.

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

## Rationalization Backlog (ROI review — Fase 9 Onda 3)

An daidaita wannan lissafin da `ci.yml` a kan 2026-06-17 (wanda aka rigaya ya tsallake `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence`). Wani nazari na ROI na saitin sulhu ya gano waɗannan ƴan takara masu ra'ayi.** Haɗaɗɗen canje-canjen CI na injiniya ne; flips/drops yanke shawara ne na manufofin da aka keɓance don mai aiki.** Ba a yi amfani da wani abu a ƙasa tukuna.

**Har ila yau, babu takardun shaida a sama** (shawara, ƙananan sigina): aikin `docs-lint` (markdownlint + Vale, dukan aikin `continue-on-error`) da kuma na'urar daukar hotan takardu ta tsaye `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` yana cikin `quality-baseline.json` amma ba a haɗa shi zuwa ratchet mai toshewa a cikin `ci.yml` — ma'aunin a halin yanzu marayu ne.

### Haɗa / raba (masu aikin injiniya, ƙananan haɗari)

An tabbatar da kowane ɗan takara a kan jihar mai rai a ranar 2026-06-17 (amincewa-amma-tabbace); da dama "bayyane" merges juya waje boye bashi kuma su ne** ba** tsaftataccen fadowa.

- **`check:docs-sync` gudu sau biyu** — a tsaye a cikin aikin `lint` kuma a cikin `check:docs-all` (`docs-sync-strict`) da husky pre-commit ƙugiya. ✅**DONE** An cire kiran — `lint` tsaye.
- **CVE scanning** — ❌**NOT tsaftataccen hade.** `audit:deps` yana toshe shawarwari masu mahimmanci da kuma rashin cikakken bincike a cikin dukkan fayilolin kulle guda biyar, yayin da yake ba da rahoton manyan shawarwari a matsayin gargadi a ƙarƙashin manufar yanzu; `check:vuln-ratchet` (osv) kawai ya gaza akan _regression_ vs tushen da aka bincika kuma ya ƙi ma'aunin da ya ɓace lokacin da ake buƙata. Harsuna daban-daban — sauke `audit:deps` zai rasa cikakkiyar ƙofa mai mahimmanci da rasidun tantance fakiti mai zaman kansa. Ajiye duka biyun.
- **Gano zagayowar** — ✅**DONE** (#15159 G-01/G-02). Tsohon rubutun nan da ake kira `check:cycles` "koren kore, curated" kofa kuma ya ba da tabbacin kiyaye shi tare da shi saboda `check:circular-deps` (dpdm) ya ba da rahoton zagayowar 91. Wannan kore ya kasance a** kore kore** : `check:cycles` ya duba kundin kundin adireshi guda 5 (fiyiloli 450), sun dace da daidaitattun `import|export … from` kawai, kuma ya jefar da kowane ma'anar `@/` da `@omniroute/open-sse/`, don haka ba zai iya ganin zagayowar zagayowar + mai ƙarfi da aka fi sani da shi wanda ya mamaye repo. Kafaffen: Ƙofar yanzu tana tafiya `src` + `open-sse` (fiyilolin 5023), yana tattara takamaiman bayanai daga TypeScript AST (don haka `import("…")` ƙidaya da nau'in matsayi `typeof import("…")` baya), kuma yana warware tsconfig `paths`. Yana samun** 14** cycles, ba 0. Domin 14 da suka rigaya ba za a iya gyara su a cikin ƙofar PR ba, `check:cycles` yanzu shine** ratsi** (`--ratchet`, rufin `metrics.cycles.value = 14` a cikin `quality-baseline.json`, `direction: down`) — yana toshe duk wani _regression_ kuma ƙidayar zata iya faɗuwa kawai. CI yana gudanar da `npm run check:cycles:ratchet`. Ƙona-ƙasa ke tafiya tare da**A-01** . `check:circular-deps` (dpdm) ya kasance mai ba da shawara a matsayin babban ra'ayi na biyu.
- **Abun rikitarwa** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): tafiya ESLint ɗaya, ƙidaya ta ruleId don haka cyclomatic + max-lines da fahimi tushe sun kasance masu zaman kansu; mutum `check:complexity` / `check:cognitive-complexity` ya rage don `--update` na gida.
- **`/api` anti-hallucination** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): lissafin FS ɗaya na `src/app/api`, openapi-hanyoyin + alamun alamun har yanzu suna ba da rahoto kai tsaye; mutane sun kasance don gudanar da gida.
- **`check:node-runtime` yana aiki a cikin ayyuka 11** — ⚠️** yar ROI.** Kowane mai gudu daban ne kuma cak ɗin shine < 1s; jimlar ajiyar ~ 10s, a kan rasa mai gadin kowane aiki mai arha. Bai cancanci jinkiri ba.
- **`typecheck:noimplicit:core` on CI lint** — ✅** cire daga lint aiki** (ya kasance nasiha `continue-on-error`); toshe nau'in saman shine `typecheck:core` + `check:type-coverage`. Rubutun gida yana riƙe.

### Juyawa / yanke shawara (manufofin mai aiki)

- `check:openapi-security-tiers` (nasiha) — ❌**NOT mai tsafta mai jujjuyawa.** Yana fita 0 amma yayi kashedin cewa hanyoyin `traffic-inspector` da yawa ƙarƙashin `LOCAL_ONLY_API_PREFIXES` basu da bayanin `x-loopback-only: true`. Ƙaddamar da shi yana buƙatar ƙara waɗannan bayanan zuwa `openapi.yaml` da farko.
- `typecheck:noimplicit:core` (shawarwari) — wanda aka mamaye shi ta hanyar toshe `check:type-coverage` ratchet. Juya zuwa ratchet ko jefar da m na biyu wuce `tsc`.
- `test:vitest:ui` (yanzu** tarewa** ) gazawar — da aka rigaya an cire su a fili a cikin `vitest.config.ts` tare da sharhin bin diddigin `// #8618` ; sababbin gazawar sun kasa aiki.
- `check:secrets` (gitleaks, toshe ratchet daskararre a 3 rubuce-rubucen tabbataccen ƙarya) — yana ba da izinin jerin 3 don isa 0, ko rage ƙasa zuwa shawara. Ya mamaye GitHub asali na binciken sirrin + `check:public-creds`.
- `check:pr-evidence` (tarewa, greps PR-body prose) — babban haɗari mai inganci; yana raunana aiwatar da Dokokin Hard Rule #18 idan an jefar da shi, don haka wannan kiran manufa ce ta gaske.
- `semgrep` (nasiha a tsaye) — ya mamaye CodeQL ga iyalan OWASP ; Wayar da tushen sa zuwa ratchet ko digo.

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
