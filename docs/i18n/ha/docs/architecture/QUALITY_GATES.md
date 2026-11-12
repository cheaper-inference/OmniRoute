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

CI da Ƙofar Ƙofar Ƙirar Ƙofar aiki kowanne yana fitar da tabbataccen hukunci: `Gate / CI` da `Gate / Quality`. Manufofin shigar da sigar su ta ƙididdige kowane aiki na sama kamar yadda ake buƙata ko shawara. Dole ne aikin da ake buƙata ya yi nasara: ɓacewa, sokewa, tsallakewa, sakamakon da ba a sani ba ba zai iya kafa PASS ba. Ingantacciyar takaddun shaida-kawai ko rarrabuwar kasida-kawai na iya sa layin lamba ba ya aiki; daftarin yau da kullun PR ba ɗan takara karɓuwa ba ne. Alamar `hotfix` baya barin shaida.

Dukansu ayyukan aiki suna rufe PRs cikin rassan main/release, turawa zuwa `main`, aikawa da hannu da abubuwan haɗin gwiwa. Tura, aika da haɗa-ƙungiyar suna gudanar da cikakken zaɓi. Amintaccen daftarin layin Mergify shima yana gudanar da ayyukan `full-code`/`full-code-e2e` masu dacewa; talakawa PRs tsallake su. Kafin haɗakar da hannu, gudanar da cikakken aikawa akan ainihin ɗan takarar. Turawa zuwa `release/**` ba sa fara waɗannan ayyukan aiki; Saki-Green yana lura da ginin da aka haɗa daban (Layin `docs/ops/RUNNER_BOX.md` → Hosted). Forks da ƙungiyoyi masu haɗaka suna amfani da masu gudu da aka karɓa don ayyukan da in ba haka ba zaɓaɓɓen masu gudu da kansu; Dole ne a tabbatar da isassun ƙarfin da aka karɓa kafin fitowa.

PR na yau da kullun yana gudanar da zaɓi mai sauri. Hanyoyin `full-code` da `full-code-e2e` na tsarin shigarwa (E2E, haɗin kai, kayan fasaha na kunshin, Electron hayaki, Bun SQLite, tsarin halittu da abokan ciniki) suna gudana ne kawai a kan daftarin layi na Mergify ko a kan cikakken gudu: `gh workflow run ci.yml --ref <branch>`.

Kowane rasidin JSON yana gano SHA da aka bincika, gudanawar aiki da ƙoƙari. CLI ta ƙi rashin daidaiton checkout/event SHA. Gwajin aikin aiki yana ɗaure membobin manufofin zuwa lissafin `needs` na aikin hukunci don haka sabon layin ko cirewa ba zai iya ɓacewa cikin shiru ba. Rasidun sun shafi nasu tsarin tafiyar da aikin, ba buguwa ba, turawa, ko abubuwan ciki na na'urar daukar hotan takardu na ba da shawara. Yin rajistan ayyukan da ake buƙata a cikin dokokin reshe shine canjin gudanarwa na daban; ayyana ayyukansu baya kare reshe da kansa.

`API Route Typecheck` bincike ne mai zaman kansa mai zaman kansa, a waje da jimillar hukunce-hukunce da cikakken bayanin martaba na gida. Bincika sakamakonta daban don ainihin ɗan takara. `.github/workflows/api-route-typecheck.yml` yana gudana akan PRs zuwa `main` ko `release/**`, yana turawa zuwa ko dai dangin reshe, aikawa da hannu, da abubuwan `merge_group` na nau'in `checks_requested`. Bata da hanya tace. Ƙungiyoyin haɗaka duba `merge_group.head_sha`; sauran abubuwan da suka faru duba `github.sha`. Duk abubuwan da suka faru suna amfani da kofa na bincike API ɗaya da gwajin naúrar ƙofa. PR tushe retargets bukatar wani sabon rajistan shiga; Gyaran body/title yana amfani da sunan kallo-kawai `Admission not requested / API Route Typecheck` kuma ba zai iya maye gurbin rajistan shiga ba.

### Riƙe shaida a cikin mai rage karɓa

`scripts/quality/validate-release-acceptance.mjs` yana rage shirin da aka kawo da kuma bayyanarsa; bai tabbatar da cewa shirin ya shafi cikakken bututun sakin ba. Rahotonsa sun saita `releaseAcceptance: false` a sarari, koda lokacin da shirin shine `VERIFIED`. Gudun aikin `release-acceptance.yml` har yanzu yana amfani da kayan gyara inuwa, ba ainihin gini ba, fakiti, taya ko rasidun tallatawa.

CLI na buƙatar `--evidence-root` don tabbatar da shaidar da aka riƙe. Ana warware fayilolin azaman `<evidence-root>/<artifact_id>/<member>` kuma ana hashed azaman SHA-256. Rikodin PASS ba tare da shaida ba, fayil ɗin da ya ɓace ko canza, hanya mara lafiya ko alamar haɗin gwiwa yana hana tabbatarwa. Fayilolin da suka ɓace ba su yi daidai da ɓangarorin rajistan ayyukan nasara ba. Canje-canjen SHA/run/attempt da ke wanzu sun kasance masu zaman kansu: madaidaitan bytes ba za su iya ceton dattijon rasit ba. Mutuncin fayil ba hujja ba ce ta sahihancin aiwatarwa ko haɓaka kayan tarihi.

### DAST yana cinye ingantaccen ginin CI

Ayyukan `dast-smoke` CI da ake buƙata suna kiran `.github/workflows/dast-smoke.yml` bayan `build`. Yana bin zaɓin code/draft iri ɗaya azaman ginin, gami da goyan bayan cokali mai yatsa PRs, PRs -manufa da kuma haɗa ƙungiyoyi. Bacewar, gazawa, sokewa ko tsallakewa ba zato ba tsammani ya toshe DAST ayyukan `Gate / CI`. Matsakaicin aikin sake amfani da shi ba shi da jan hankali PR/dispatch ; Ingantacciyar hanyar hannu tana amfani da aika CI don haka ginin da mabukaci su kasance cikin gudu ɗaya.

`scripts/ci/next-build-provenance.mjs` ta rufe cikakken kayan tarihi na gaba tare da narke kwalta, repository/event/run, yunƙurin mai samarwa, head/base/checkout/tree, ƙididdigar aikin aiki, kulle fayil, ainihin Node version/ABI, dandamali da bundler. DAST yana zaɓar kayan aikin ID da ba za a iya canzawa daga `needs.build.outputs` ba, yana buƙatar tabbatar da zazzagewa, kuma da kansa ya hashes da ZIP a kan mai samarwa kafin fitar da membobinsa biyu da aka ba da izini ta hanyar `scripts/ci/unpack-ci-build.py`. Dole ne ma'ajiyar bayanai da kwalta ta dace da abubuwan da masu samarwa masu zaman kansu suke da su kafin a fitar da bishiyar ta gaba. Ba zai taɓa neman sabon ginin reshe mai nasara ba. Sake kunnawa wani ɓangare na iya sake amfani da wannan ƙoƙarin mai ƙira lokacin da ID ɗinsa da duk abubuwan da ke cikin sa suka yi daidai; rasidin ya rubuta duka ƙoƙarin.

Mabukaci yana tsayawa kan mai gudu Linux da aka shirya tare da izinin ma'ajiyar karatu kawai kuma babu sirrin ma'aji. Yana shigar da ainihin nau'in Node na furodusa, sannan ya haɗa CLI tare da `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` ya ƙi sabar uwar garken da ta ɓace kafin kowane ginin koma baya; Gina CLI na gida na yau da kullun yana riƙe da koma baya. Shirye-shiryen uwar garken, Tsari da kuma hanzari dole ne duk suyi nasara a cikin iyakar aiki na mintuna 25 da ba a canza ba. Rasidin shaida yana tabbatar da ainihin shigarwar da kuma bytes, ba ingantaccen sikanin DAST ba. Ƙarshen ƙaƙƙarfan ƙaƙƙarfan ƙaƙƙarfan ƙaƙƙarfan ƙaƙƙarfan ƙaƙƙarfan ƙaƙƙarfan mai gudu ko na'urar daukar hotan takardu da ta kasa ci gaba da zama mara cikakke ko gazawar shaida; ba zai iya zama PASS ta hanyar nadi nasiha ba.

### Ƙarfin aiwatar da UI

CI tana gudanar da cikakken lissafin UI azaman shards na matrix `test-vitest` guda huɗu, kowannensu yana da aƙalla ma'aikata biyu a kowane shard da kuma lokacin ƙarshe na aiki na mintuna 15. Shard na farko kuma yana gudanar da suite MCP/autoCombo Vitest. Sakamakon aikin da ake buƙata ya ƙunshi kowane ƙafar matrix; gazawa ko soke shard ɗaya ba zai iya kafa shigar ɗan takara ba.

Mai duban dare yana riƙe da takamaiman rasidin ɗan takara na kowane shard UI, gami da aiwatar da MCP a cikin rasit na farko. Ana buƙatar duk rasit guda huɗu, rajistan ayyukan rajista da abubuwan da suka dace na aiwatarwa. `npm run test:vitest:ui` na gida har yanzu yana zaɓar cikakken ɗakin; Gudun `--shard` ɗaya shaida ce kawai.

### Tarin ɗaukar hoto

Shards na raka'a goma sha biyu suna tattara ɗaukar hoto na V8 yayin aiwatar da gwajin da suke yi. Shard mai nasara yana gudanar da `scripts/ci/compact-v8-coverage.mjs` don matsawa ainihin fayilolin ba tare da samar da matsakaicin rahoton Istanbul ba. Aikin Rufewa na ƙarshe yana tabbatar da duka sha biyun bayyanawa akan ɗan takarar SHA, lokacin aiki, tushen tushen da hashes na bayanai, sannan yana gudanar da masu ba da rahoto na c8 da madaidaitan ɗaukar hoto. Abubuwan shigarwa suna riƙe odar sunan fayil na c8 na duniya; kafin haɗe-haɗe-haɗe-haɗe ba shi da aminci ga gauraye ɗaukar hoto na function/block. Rasa, maras kyau ko shards mara jituwa sun kasa shiga. Gwajin gwajin da bai yi nasara ba yana riƙe da ɗanyen ɗaukar hoto daban; ba zai iya shiga cikin haɗuwa ta ƙarshe ba.

### Rasidun ci gaban kisa

Umurnin `test:unit:ci:shard` da aka raba yana rubuta matakan `primary`, `dashboard` da `serial` ta hanyar `scripts/ci/unit-progress-reporter.mjs`. Rahoton gwajin na yau da kullun yana nan. Rasidin metadata-kawai yana rubuta farkon kowane fayil da kammalawarsa, da bugun bugun zuciya na daƙiƙa 30 ya jera fayilolin har yanzu suna aiki da lokacinsu. Yana yin rikodin metadata da aka ba da izini kawai; kwatancen gwaji, fitarwa, jikunan kuskure da cikakken yanayin ba a jera su ba.

CI yana riƙe da fayilolin JSONL azaman `unit-progress-ci-<run>-<attempt>-<shard>`. Ƙayyadaddun aiki na iya hana ƙaddamarwa daga baya; bugun zuciya da ya riga ya fita ya kasance shaidar gano cutar. Ƙunƙarar bugun zuciya kuma na iya nuna katange ko ƙarewar tsarin mai gudu. Waɗannan rasidun suna adana zaɓin gwajin da ake da su, daidaito, kwanakin ƙarshe da matsayin fita; ba hukunce-hukuncen shigar dan takara ba ne.

### Haɗa jerin gwano

Alamar `queue` tana aika PR zuwa layin Mergify (`.mergify.yml`). Mergify yana buɗe daftarin PR akan reshen `mergify/merge-queue/`, CI yana gudanar da cikakken zaɓi a wurin, kuma ainihin PR yana haɗuwa lokacin da `Gate / CI`, `Gate / Quality` da `Merge integrity (changelog + generated skills)` suka wuce.

Mergify yana rubuta taƙaitaccen jerin gwano a cikin bayanin daftarin. Abubuwan da suka faru na Body/title-only `pull_request` `edited` suna amfani da takamaiman ƙungiyar haɗin kai kuma ba sa sake aiwatar da rarrabuwa, gwajin matrices, haɗe mutunci ko hukuncin shigar. Duba-kawai rajistan sunayen ba zai iya maye gurbin `Gate / CI` ko `Gate / Quality`. Gyaran da ke canza tushen manufa yana buƙatar ingantaccen ingantaccen ɗan takara.

Bayan dequeue, tura ba koyaushe yana buƙatar PR. Yi sharhi `@mergifyio queue` akan shi.

### Ingantattun sikanin sikandire

Ƙirar npm-alaas da aka ƙirƙira da kasancewa memba na sikelin-scan suna rayuwa a cikin `config/quality/gate-manifest.json`. Gudun `npm run check:gate-manifest` don inganta sunayen rubutun da ainihin umarni akan `package.json`; kari, cirewa da drift umarni sun gaza duka ƙugiya na gida da ayyukan rarrabuwa a cikin CI. Laƙabi ba aikin gudana ba ne, misali matrix ko shari'ar gwaji: waɗannan ƙididdiga ba dole ne a gabatar da su azaman masu musanyawa ba.

Yi amfani da `npm run quality:scan -- --list` ko `npm run quality:scan:fast -- --list` don bincika sunayen laƙabi da aka zaɓa ba tare da aiwatar da su ba. Mai gudu yana kiran wurin shigarwa na npm, don haka lokacin aiki (ciki har da Bun inda aka saita) ana kiyaye shi. Bayanin yana yin rikodin laƙabi a wajen waɗannan bayanan martaba kamar yadda aka kira daban, kuma an hana umarnin kulawa a bayanan bayanan karantawa kawai.

Waɗannan bayanan martaba suna rufe siginar tsaye kawai. Ba sa tabbatar da gwajin samfur, ɗaukar hoto, marufi, cak na waje ko cikakken yarda da ɗan takara. Shigar da aiki yana amfani da haɗin `config/quality/admission-policy.json` da `scripts/quality/admission-verdict.mjs`. Bayanan martaba-mai lura sun kasance daban; duba cak da rasidun da suka dace da kansu. Ana bayyana cikakkun umarnin mai duba a cikin `config/quality/release-green-static-profile.json`, gami da `audit:deps`, zaɓin gwajin maye gurbi da duban fassarar. Loader yana tabbatar da umarnin npm akan package.json da ƙirar CI/Quality ; yana ƙin drift maimakon aiwatar da alamun harsashi a matsayin hujja. Na'urar daukar hotan takardu da ake bukata fitarwa SKIP/INCOMPLETE ba zai iya kafa PASS ba. Bayanan martaba yana yin rikodin keɓanta na waje kuma baya maye gurbin ɗaukar hoto, gwajin matrices, fakiti ko shaidar turawa. Ƙididdiga na ƙasidar da ke ƙasa abin tunani ne, ba hujjar cewa kofa ta gudu ba.

Rubutun suna rayuwa ƙarƙashin `scripts/check/` (ƙofofin siyasa) da `scripts/quality/` (injin ratchet). CI tushen gaskiya shine `.github/workflows/ci.yml`.

### Kiwon lafiya takardun shaida da aka buga

`.github/workflows/i18n-base-health.yml` tana lura da lafiyar takaddun bayanai bayan zaɓaɓɓen turawa zuwa `main` da `release/v*`, kuma akan aika da hannu. Yana tace bayanan murfinsa, tushen Markdown, `llm.txt`, fassarar state/configuration da kayan aikin i18n masu dacewa. Ayyukan `Published base documentation health` guda ɗaya yana amfani da Ubuntu da aka shirya da kuma lokacin ƙarshe na minti biyar. Yana aiwatar da ingantaccen karantawa-kawai kuma yana rubuta rasidin bincike ba tare da shigar da abin dogaro ba, fassarar ko ɗaukan jihohi.

`scripts/i18n/check-base-health.mjs` yana buƙatar sifili-zata-zata, bata-manufa, manufa-zata, fassarorin-fassara da rashin daidaiton cache-sashe. Hakanan yana tabbatar da iyakar document/locale na yanzu da kuma tabbatar da ingancin sa. Mahallin mara inganci, ɗaukar hoto mara cika ko katsewa mai duba yana samar da `INCOMPLETE`; tabbatar da drift yana samar da `FAIL`. Dukansu sun dawo da gazawar matsayin fita. Ana daure rasidin don duba SHA, tafiyar aiki, gudu da ƙoƙari, kuma ana riƙe shi azaman `i18n-base-health-<sha>-<run>-<attempt>`.

Wannan kallo ne mai zaman kansa na tushen da aka buga. Ba ya ƙara taron PR ko haɗa-rukuni, rajistan PR da ake buƙata, npm alias ko memba na bayanan martaba. Mai duba abin da ke ƙasa kuma yana toshe duk azuzuwan biyar a cikin cikakkiyar yanayi. Shirye-shiryen PR na yau da kullun ya kasance dabam daga shiga. Nasarar ɗorawa ba zai iya juya sakamakon lafiya da ya gaza zuwa PASS ba.

PR na yau da kullun yana amfani da `--preflight` tare da rahoton tushe wanda `--baseline-evidence` ya samar. Yana iya barin tushen Turanci yana jiran kawai lokacin da cikakken rikodin fassarar da ainihin maƙasudin ba su canza daga ainihin tushe. Sabbin maƙasudi ko rashin daidaiton sashe-sashe har yanzu suna toshewa, kuma shaidar da ba ta cika ba ba za ta iya ba da izinin shiri ba. Rahoton ya fallasa `preparationPending` da `mergeReady` daban-daban: shirye-shiryen nasara baya sanya fassarori masu jiran gado su shirya don haɗuwa. Sake sabunta madubin da abin ya shafa a cikin ɗan takarar da aka haɗa kafin shiga. Amintaccen ɗan takarar layin Mergify, `merge_group`, turawa reshe da jagorar CI suna amfani da cikakken abin dubawa, ba tare da `--warn` ko gada-gafara ba. Rashin hashes da aka rage ta hanyar manyan fayilolin da aka yi rikodi ba za su iya samar da cikakken hukunci mai nasara ba.

### Saki PR hanya mai sauri (`quality.yml`)

`.github/workflows/quality.yml` ya cika CI akan main/release PRs, turawa zuwa `main`, aikawa da haɗa ƙungiyoyi. PRs tana amfani da bincike mai sauri-tace hanya. An cire kwafin ginin da aka kashe na dindindin; ainihin cak na build/package/boot ya kasance a cikin CI. Rukunin suite da vitest suna gudana ne kawai a cikin CI (`Unit Tests (N/12)` da `Vitest`).

| Ayuba                                            | Iyakar                                                                                                                                                                                                                               | Toshewa                      |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs da docs-duk                                                                                                                                                                                             | Ee                           |
| `Fast Quality Gates`                             | Code PRs; a tsaye cak, nau'in nau'i, nau'in dashboard, gwajin naúrar da abin ya shafa                                                                                                                                                | Ee                           |
| `Forgotten sibling tests`                        | Code PRs; canza kayan aiki da aka gano zuwa ga masu amfani da su da kuma gwaje-gwajen 'yan'uwan ɗan takara; Ana ba da rahoton ganga da hanyoyin shigowa da ƙarfi azaman bincike na ba da shawara, tare da keɓancewar lissafin izini. | **Nasiha**                   |
| `No new ESLint warnings`                         | Code PRs; suppressions-sani lint guard                                                                                                                                                                                               | Ee, gami da cokali mai yatsu |
| `Merge integrity (changelog + generated skills)` | PRs ba daftari ba; canje-canje da ƙirƙira haɓaka fasaha                                                                                                                                                                              | Ee, gami da cokali mai yatsu |

#### Rahoton gwajin 'yan uwa da aka manta

`npm run check:forgotten-sibling-tests` yana gudana azaman matakin shawara na `Fast Quality Gates` kuma yana sake amfani da mai warware shigo da kaya bayan taswirar tasirin gwajin. Ga kowane samfurin samarwa da aka canza, yana ba da rahoton sarƙoƙi `changed module/symbol -> static consumer -> candidate sibling test` masu kayyade lokacin da gwajin ɗan takarar ya ɓace daga bambance-bambancen buƙatun ja. Takaitaccen bayanin Markdown da sakamakon JSON ana kiyaye su azaman kayan aikin `forgotten-sibling-tests` don daidaitawa kafin duk wani aikin toshewa.

Sake fitar da ganga da shigo da kaya masu kuzarin bincike ne kawai; ba su taɓa haifar da gano abin toshewa ba. Keɓanta da aka bita suna zaune a cikin `config/quality/forgotten-sibling-allowlist.json`. Kowane shigarwa dole ne ya ambaci mabukaci da gwajin ɗan takara, bayar da takamaiman dalili, da haɗa batun GitHub ko buƙatar ja. An kasa rufe shigarwar mara kyau. Keɓancewa ba za su iya murkushe gwajin ɗan takara da aka goge ko bambance-bambancen da ke ƙara `.skip`/`.todo` ba; tabbatar da rauni da sauran abin rufe fuska sun kasance mallakin ƙofar `check:test-masking` mai zaman kanta.

### Aiki: `lint`

Yana gudana akan kowane PR zuwa `main`. Tubalan sun haɗu akan gazawar.

| Rubutun (`npm run ...`)           | Yana tabbatarwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Toshewa                                |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `check:node-runtime`              | Sigar Node.js tana cikin kewayon tallafi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ee                                     |
| `check:cycles`                    | Ana shigo da madauwari a duk faɗin `src/` + `open-sse/` ( tushen AST, tsconfig `paths` an warware). Bare yana fita 1 a duk lokacin da kowane zagayowar ya wanzu (ba a rufe tun #15281) kuma yana lissafin SCCs. `check:cycles:ratchet` (abin da CI ke gudana) yana toshe lokacin da ƙidayar ta zarce rufin `metrics.cycles` a cikin `quality-baseline.json` — a halin yanzu 14, `direction: down`, don haka yana iya faɗuwa kawai (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da (rasa)                              |
| `check:boundary`                  | Haɗin `open-sse → src` : keɓaɓɓen shigo da fayil-zuwa-fayil daga injin zuwa cikin app (`scripts/quality/measure-boundary.mjs`; jerin gefen shine v4 core/module-split remediation backlog). Rahoton bare = na ba da shawara (daidai da `quality:boundary`). `check:boundary:ratchet` (abin da CI ke gudana, kuma a cikin madaidaicin madauki `quality.yml` fast-gates ratchet) toshe lokacin da ƙidayar ta wuce rufin `metrics.boundaryOpenSseToSrc` a cikin `quality-baseline.json` — da aka shuka a ma'aunin 771, `direction: down`; `--update` yana rage shi kawai; Dangin tushe akan PRs (`--base-ref`, duba ƙasa)                                                                                                                                                                                                                                                                                                                  | Da (rasa)                              |
| `check:route-validation:t06`      | Shirye-shiryen Zod suna nan akan duk hanyoyin (manufofin Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ee                                     |
| `check:any-budget:t11`            | Kidaya `@ts-expect-error // any` bai wuce kasafin kudi ba (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ee                                     |
| `check:provider-consistency`      | Kowane mai bayarwa a cikin `providers.ts` yana da madaidaicin shigarwa a cikin `providerRegistry.ts` (kuma akasin haka, cikin jerin izini)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ee                                     |
| `check:model-lifecycle`           | Teburan da aka kiyaye da hannu guda uku sun kasance daidai da hoton zagayowar rayuwa da aka bincika (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ba ta da id mai ritaya da `REGISTRY` zai iya bi; kowane maƙasudin `BUILT_IN_ALIASES` yana nan a cikin `REGISTRY` kuma baya nan daga hoton-id mai ritaya; kowane id mai ritaya har yanzu a cikin `REGISTRY` ana tura shi ko jera shi a cikin `allowedRetiredInCatalog`; kuma babu tushen `DEFAULT_DEGRADATION_MAP` ko manufa da ya bayyana wanda ya yi ritaya a wannan hoton. Wannan baya tabbatar da cewa a halin yanzu ana amfani da samfurin ta hanyar kai tsaye. — na kan layi yana kwatanta da `config/quality/model-lifecycle.json`, an wartsake da hannu tare da `npm run quality:refresh-model-lifecycle` (cibiyar sadarwa; ba a haɗa shi cikin CI). `allowedRetiredInCatalog` ratchet ne mai ƙonewa: ƙara shigarwa kawai tare da batun bin diddigi.                            | Ee                                     |
| `check:fetch-targets`             | Kowane `fetch("/api/...")` a cikin abokin ciniki-gefen `src/` yana warwarewa zuwa ainihin `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ee                                     |
| `check:deps`                      | Duk `npm install` -able deps a fadin kowane `package.json` a cikin repo suna cikin `dependency-allowlist.json`; sabbin fakitin da ba a lanƙwasa ko gangare masu tuta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ee                                     |
| `audit:deps`                      | npm duba duk fayilolin kulle masu zaman kansu guda biyar (tushen, Electron, OpenCode plugins v1/v2 da mai bayarwa). Mahimman shawarwari toshe; manyan shawarwari sun kasance gargaɗin bayyane. Binciken Missing/failed shine INCOMPLETE da toshe; Ana ajiye hashes na kulle kowane-ikon da rahotanni.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ee                                     |
| `check:lockfile`                  | Mutuncin `package-lock.json` — https rajista, hashes na gaskiya, babu mai watsa shiri                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ee                                     |
| `check:licenses`                  | Jerin izinin lasisi SPDX don dogaron samarwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ee                                     |
| `check:tracked-artifacts`         | Babu ginanniyar kayan tarihi / sadaukarwa `node_modules` symlinks (kuma yana gudana cikin husky pre-commit; pre-turawa yana da haske — #6716 da gangan)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ee                                     |
| `check:ai-attribution`            | Babu AI/bot `Co-Authored-By` tirela ko ƙafar AI-ƙarni a cikin PR da ke aikatawa, take ko jiki — Hard Rule #16 (a cikin madauki `quality.yml` sauri-ƙofofin madauki don PR→ `release/**` — yana karanta abubuwan biya na taron, babu-op kashe PRs — `main` mataki na `commit-msg` -kawai a cikin `ci.yml` lint don PR→; an yarda da mawallafa #14436                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:vitest-exclusions`         | Kowane keɓancewar Vitest suna suna batun bin diddigi kuma yana bayyana a cikin `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ee                                     |
| `check:file-size`                 | Fayilolin tushen (`.ts`/`.tsx` a cikin `src/`, `open-sse/`, `electron/`, `bin/`) zauna a cikin `cap` da fayilolin gwaji (`*.test.ts(x)`) a cikin `testCap`; Fayilolin da aka daskare a cikin `file-size-baseline.json` (`frozen` / `testFrozen`) dole ne su wuce girman da aka yi rikodin su                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ee                                     |
| `check:error-helper`              | Amsoshin Kuskure a cikin executors/handlers suna amfani da `buildErrorBody()` / `sanitizeErrorMessage()` (Hard Dokokin #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ee                                     |
| `check:migration-numbering`       | Fayilolin Hijira SQL ana ƙididdige su a jere, babu gibi ko kwafi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ee                                     |
| `check:public-creds`              | Babu ainihin OAuth `client_id`/`client_secret` ko maɓallan gidan yanar gizo na Firebase a waje da `publicCreds.ts` (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ee                                     |
| `check:db-rules`                  | Babu danyen SQL a waje da kayayyaki `src/lib/db/` ; babu ganga-shigo da ganga daga `localDb.ts` (Hard Dokokin #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ee                                     |
| `check:known-symbols`             | Masu aiwatar da masu ba da izini, dabaru, da masu fassarorin da aka yi rajista a cikin allunan aika aika sun dace da fayilolin da ke kan faifai — babu marayu ko alamomin da ba a bayyana ba.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ee                                     |
| `check:route-guard-membership`    | Kowace hanya da ke haifar da tsarin yaro ana rarraba ta `isLocalOnlyPath()` (Hard Dokokin #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ee                                     |
| `check:test-discovery`            | Kowane fayil `*.test.ts` / `*.spec.ts` a cikin repo ana tattara shi ta aƙalla mai gudu ɗaya na gwaji (ratchet: jerin marayu a cikin `test-discovery-baseline.json` na iya raguwa kawai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ee                                     |
| `check:test-tla-order`            | Babu fayil ɗin `node:test` a ƙarƙashin `tests/unit` da ya yi rijistar gwaji, ya sami babban matakin `await`, sannan ya yi ƙarin rajista (#18045; ratchet: `test-tla-order-allowlist.json` zai iya raguwa kawai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ee                                     |
| `check:agent-skills-sync`         | Ƙirƙirar ƙwararrun ƙwararrun wakilai-ƙwararrun kayan tarihi sun dace da kasidar tushen su (babu drift)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:provider-asset-provenance` | Mai bayarwa logos/assets yana ɗauke da shigarwar da aka yi rikodi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `lint:json`                       | Zazzage fayilolin JSON da kuma gamsar da ƙa'idodin repo lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `typecheck:core`                  | Tarin TypeScript ba tare da kurakurai ba ( gargaɗin shawara kawai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ee                                     |
| `typecheck:noimplicit:core`       | Tsananin `noImplicitAny` — mai hangen gaba; yawancin wuraren kiran da suka rigaya har yanzu suna buƙatar bayanai                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **Nasiha** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` da aka keɓe zuwa `src/app/(dashboard)/**` (#7033) — `typecheck:core`'s curated 27-file list allowance baya haɗa da kowane dashboard TSX, kuma `next build` bai taɓa buga shi ko ɗaya ba (`next.config.mjs` yana saita `ignoreBuildErrors: true`), don haka koma baya-bayyanai a wurin (#6625/#6909) sun kasance ga CI ganuwa. Ya bambanta da daskararren ƙidayar ƙidayar per-file/per-TS-code (`config/quality/dashboard-typecheck-baseline.json`, tsarin aiwatar da aiki iri ɗaya kamar `check:known-symbols`) — kurakurai NEW kawai fiye da ƙididdige ƙididdiga sun kasa ƙofar; ratchet saukar da `--update` lokacin da aka gyara kuskuren da ya gabata.                                                                                                                                                                                                                                                                        | Ee                                     |
| `check:build-typecheck`           | Nau'in samar da aikace-aikacen gabaɗaya duba `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), jerin izinin fayil 27 na saman `typecheck:core` da ƙofar dashboard ba sa rufe. Ya bambanta da `config/quality/build-typecheck-baseline.json`; sabo ko haɓaka kowane-- (fayil, code) ƙidaya ta gaza, ƙaramin ƙidayar yana tambayar ku don ratchet. `--update` ya ƙi yayin da gudu ya ƙunshi sabon ko ɗaga biyu sai dai idan an wuce `--force-regressions`, kuma ya ƙi sabon fayil ɗin shiru sai dai in an wuce `--force-nocheck`, don haka faɗaɗa tushen don samun kore da ba da shiru na dindindin ayyuka biyu ne na gangan. An ƙi `--force` maras tushe. Hakanan yana bincika ikon ginin `@ts-nocheck` akan `config/quality/ts-nocheck-baseline.json`, saboda fayil ɗin da ke amfani da shi yana ba da rahoton wani bincike ko kaɗan kuma in ba haka ba zai kasance ganuwa ga kowace kofa. | Ee                                     |

#### Shirye-shiryen nau'in nau'i biyu suna amsa daban-daban

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) da `check:build-typecheck` suna tattara shirye-shirye daban-daban a ƙarƙashin zaɓuɓɓuka daban-daban, kuma fayil iri ɗaya na iya zama mai tsabta a ɗayan kuma cike da kurakurai a ɗayan.

`tsconfig.build.json` yana saita `"strict": false`, don haka `noImplicitAny` a kashe. Babban saitin yana tattara jerin izinin fayil 27 da aka keɓe tare da zaɓuɓɓuka masu tsauri kuma suna bin kowane jadawali shigo da shi, don haka fayilolin da ba su bayyana a cikin shirin ginin har yanzu ana duba su a can.

Sakamakon yana da mahimmanci yayin yanke hukunci ko an buga fayil:**Binciken sifili a ƙarƙashin `check:build-typecheck` baya nufin sifili** . Cire `@ts-nocheck` daga fayilolin 26 ya nuna 23 daga cikinsu mai tsabta a cikin shirin ginawa; goma sha shida daga cikin wadanda suka bayyana kusan 120 a fakaice-kowane kurakurai a cikin tsauraran. Bincika duka biyun kafin kiran fayil mai tsabta.

### Aiki: `quality-gate`

Yana gudana bayan `test-coverage`. Tubalan sun haɗu akan gazawar.

| Rubutun                      | Yana tabbatarwa                                                                                                                                                                                             | Toshewa                 |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `quality:collect`            | Emits `quality-metrics.json` (ƙididdigar gargaɗin ESLint, ɗaukar hoto daga haɗewar rahoton shard)                                                                                                           | Ee (na sama na ratchet) |
| `quality:ratchet`            | Kowane ma'auni a cikin `quality-baseline.json` bai koma baya ba (Gagaɗin ESLint tushen tushen ≤ ; ɗaukar hoto tushe ≥ )                                                                                     | Ee                      |
| `check:duplication`          | Kwafin lamba (jscpd@4) baya wuce tushe a cikin `quality-baseline.json`                                                                                                                                      | Ee                      |
| `check:complexity`           | Matsalolin cyclomatic matakin-fayil baya wuce iyaka (zuriyar ESLint `complexity` + `max-lines-per-function`)                                                                                                | Ee                      |
| `check:cognitive-complexity` | Ƙwararren Ƙwararren Ƙwararren Ƙwararren Ƙwararren Ƙwararren Ƙwararren Ƙwararren ESLint — `eslint-plugin-sonarjs`; CI yana gudanar da duka biyun a hade azaman matakin `check:complexity-ratchets` guda ɗaya | Ee                      |
| `check:dead-code`            | Fitar da fayilolin da ba a yi amfani da su ba (knip) baya komawa baya vs asali                                                                                                                              | Ee                      |
| `check:compression-budget`   | Kasafin kasafin ma'auni na matsawa — kowace injin token-ajiye dole ne kada ya koma baya                                                                                                                     | Ee                      |
| `check:type-coverage`        | Kashi na ratchet (`type-coverage`) ba ya komawa baya; ya fi mayar da hankali ga `typecheck:noimplicit:core`                                                                                                 | Ee                      |

### Ayyuka: `codeql-scan` da `codeql-admission`

`codeql-scan` yana samar da duk nau'ikan bincike da aka tsara. Bayan wannan aikin ya yi nasara, `codeql-admission` yana tabbatar da ainihin abubuwan da aka ɗora shi da ɗan takarar faɗakarwar ratchet. Dukansu ana buƙatar abin dogaro na `Gate / CI`, gami da ƴan takara-docs kawai. An kwatanta kunnawar gudanarwa da buƙatun canary ƙarƙashin "CodeQL ratchet" a ƙasa.

| Rubutun                | Yana tabbatarwa                                                                                                                                                                                   | Toshewa |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:codeql-ratchet` | ref/SHA ɗan takara da duk nau'ikan bincike da aka tsara dole ne su kasance na yanzu kafin faɗakarwar faɗakarwa; rasa shaida tubalan. Ƙirar duniya ta kasance dabam — duba "CodeQL ratchet" a ƙasa | Ee      |

### Aiki: `quality-extended`

Aikin yana toshe masu neman aiki. Girman damfara, binciken sirri, binciken rauni, binciken aikin aiki da OpenAPI Ana duba canje-canje tare da ratsan da ake buƙata. Binciken dogara da madauwari ya kasance shawara. Ana buƙatar shigarwa na Scanner: `scripts/ci/install-quality-scanners.sh` provisions pinned versions and propagates installation failures. Rasa kayan aikin, rahotanni marasa inganci ko ɓataccen tushe suna barin ƙofar na'urar daukar hoto da ake buƙata INCOMPLETE.

| Rubutun                  | Yana tabbatarwa                                                                                                                                                                                                                                     | Toshewa                                                        |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `check:circular-deps`    | Babu abin dogara da'ira (dpdm)                                                                                                                                                                                                                      | **Nasiha**                                                     |
| `check:bundle-size`      | Girman damfara bai wuce hula ba; ma'aunin da ba ya samuwa ya gaza                                                                                                                                                                                   | **Toshewa tare da --ratchet**                                  |
| `check:secrets`          | Sakamakon Gitleaks baya komawa baya; sikanin da ake buƙata sun ƙi bacewar tools/source/baseline, binciken da ya gaza da kuma rahotanni marasa inganci                                                                                               | **Toshewa tare da --ratchet**                                  |
| `check:vuln-ratchet`     | Lalacewar dogaro ba sa komawa baya; sikanin da ake buƙata sun ƙi ɓarna kayan aikin, rahotanni marasa inganci ko rashin tushe                                                                                                                        | **Toshewa tare da --ratchet**                                  |
| `check:workflows`        | Gudun aiki lint (actionlint + zizmor); missing/broken na'urar daukar hotan takardu, rahotanni marasa inganci ko ɓataccen tushen ratchet sun kasa kamar yadda INCOMPLETE. Bincike mai inganci yana bin manufofin strict/advisory/ratchet da aka zaɓa | Ana buƙatar aiwatar da kisa; Zizmor ratchet toshewa a cikin CI |
| `check:openapi-breaking` | Kwangilar API na jama'a game da abubuwan da aka haɗa (PR merge-base, turawa kafin, tushen haɗin gwiwa; scheduled/manual wurin biya na farko iyaye); ma'aunin da ake buƙata ya kasa rufe                                                             | **Toshewa tare da --ratchet**                                  |

### Aiki: `docs-sync-strict`

Don buƙatun ja zuwa `main` ko `release/**`, wannan aikin yana gudana ne kawai don waɗanda ba daftari ba (ko amintaccen jerin gwano) waɗanda aka rarraba azaman takaddun takardu ko canje-canjen lamba. Hakanan yana gudana akan abubuwan da ba PR CI ba; Wannan tura turawar aikin yana rufe `main` kawai, ba `release/**` ba. Matakin da ya fita ba sifili ya toshe aikin; sakamakon rahoton-kawai da keɓancewar da aka rubuta a ƙasa ba sa.

| Rubutun                        | Yana tabbatarwa                                                                                                                                                                                                                                                                                                                                                                                                                                       | Toshewa                                                                                                                                            |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-gate wanda ke gudanar da ƙananan ƙofofin 7 a ƙasa a jere                                                                                                                                                                                                                                                                                                                                                                                         | Ee                                                                                                                                                 |
| ↳ `check:docs-sync`            | Daidaiton sigar Package/OpenAPI/CHANGELOG, madaidaicin madubin `llm.txt`, fassarar CHANGELOG section/size, da rashi na kwafin kwafi.                                                                                                                                                                                                                                                                                                                  | Ee                                                                                                                                                 |
| ↳ `check:docs-frontmatter`     | Shafukan da aka haɗa suna ɗauke da ingantattun taken gaba                                                                                                                                                                                                                                                                                                                                                                                             | Ee                                                                                                                                                 |
| ↳ `check:docs-counts`          | Ƙididdigar ƙididdiga masu ƙarfi suna da tsauri; Binciken ƙidayar fayil na heuristic yana gargaɗi kawai sai dai in rubutun ya karɓi `--strict` (ƙofa meta-ƙofa CI ba ta wuce shi ba)                                                                                                                                                                                                                                                                   | Ƙuntataccen toshe matakin; shawara mai laushi                                                                                                      |
| ↳ `check:env-doc-sync`         | Source env yana karantawa, `.env.example`, da `docs/reference/ENVIRONMENT.md` sun yarda bayan ƙyalli na zahiri, doc-kawai, da masu ba da izini kawai.                                                                                                                                                                                                                                                                                                 | Ee, a waje da lissafin izini                                                                                                                       |
| ↳ `check:deprecated-versions`  | Yana ba da rahoton yuwuwar juzu'an da ba su da tushe a waje da amintattun mahallin tarihi da tsayayyen kwanakin sabuntawa, ban da takaddun da ba a kula da su ba                                                                                                                                                                                                                                                                                      | Shawara a cikin wayoyi na CI na yanzu (ba a wuce `--strict` ba)                                                                                    |
| ↳ `check:doc-links`            | Hanyoyin haɗin alamar ciki a cikin docs suna warware fayiloli na ainihi (form `[text]`/`(path)` )                                                                                                                                                                                                                                                                                                                                                     | Ee                                                                                                                                                 |
| ↳ `check:fabricated-docs`      | Hanyoyi, env vars, umarnin CLI, sunayen ƙugiya, da hanyoyin fayil da aka ambata a cikin takaddun suna wanzu a cikin codebase. Ƙofa mai wuya ta hanyar `--strict`; taushi-kasa ba tare da tuta ba.                                                                                                                                                                                                                                                     | Ee (ta hanyar `--strict` a cikin CI)                                                                                                               |
| `check:cli-i18n`               | Ana amfani da maɓallan CLI `t()` a cikin `en`; `pt-BR` yana riƙe kowane sashe na sama; `zh-CN` da `zh-TW` sun ƙunshi kowane maɓalli daga `en`                                                                                                                                                                                                                                                                                                         | Ee                                                                                                                                                 |
| `check:openapi-coverage`       | OpenAPI spec yana rufe aƙalla bene mai ƙima na ainihin hanyoyi                                                                                                                                                                                                                                                                                                                                                                                        | Ee                                                                                                                                                 |
| `check:openapi-security-tiers` | Bayanin `x-loopback-only`/`x-always-protected` da aka ayyana dole ne a goyi bayan `routeGuard.ts`; toshewa da karkatar da rashin daidaituwa. Binciken baya don ɓacewar `x-loopback-only` a ƙarƙashin prefixes na gida-kawai yayi kashedin, kuma an cire hanyoyin-kawai-kawai daga waccan hanyar ta baya.                                                                                                                                              | Parser/forward dubawa tarewa; baya duba shawara                                                                                                    |
| `check:openapi-routes`         | Kowace hanyar `/api...` a cikin `openapi.yaml` tana warware ma'auni - ba tare da jin daɗi ba zuwa ainihin hanya bayan ingantacciyar jerin izini `KNOWN_STALE_SPEC` ; Shigar da jerin abubuwan ba da izini kuma sun gaza                                                                                                                                                                                                                               | Ee                                                                                                                                                 |
| `check:docs-symbols`           | Nassoshi na ciki `/api/...` URL a cikin littattafan canonical waɗanda ba madubi ba sun warware zuwa ga hanya ta gaske ko dangi; Nassoshi na proxy/upstream/placeholder/file da ingantattun shigarwar `KNOWN_STALE_DOC_REFS` ba a cire su, kuma shigar da jerin ba da izini sun gaza.                                                                                                                                                                  | Ee                                                                                                                                                 |
| `i18n translation drift`       | Cikakken shigar yana buƙatar tushen sifili, bacewar-manufa, zanta, fassarorin-fassara da rashin daidaiton sashe-sashe. Shirye-shiryen PR na yau da kullun na iya riƙe ainihin shaidar gada ko canjin Ingilishi-kawai da ke jira tare da cikakken yanayin da ba a canza ba da baiti na manufa; Rahotonta daban ya bayyana shirye-shiryen hadewa. Rasa hashes na manufa da kuma ƙaƙƙarfan toshe shaidar tushe. Sashin ma'ajin gado na baya baya gazawa. | Duk azuzuwan biyar sun toshe shigar queue/base ; Izinin shiri na yau da kullun kawai tabbataccen gado ko aikin Ingilishi-kawai wanda ke jiran aiki |

README SVGs goma sha biyu a karkashin `docs/diagrams/` an samar da su (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` yana sake farfado da su duka). Kowannensu yana da gwajin kwatankwacin byte-kwatanta (`tests/unit/docs/readme-*-svg.test.ts`, `test-unit` aiki) wanda ya kasa lokacin da fayil ɗin da aka yi ya ƙare, kuma `check:docs-counts` yana karanta lambobin canonical daga nodes `<text>` ɗin su — wanda shine dalilin da ya sa matakin fayyace yana kiyaye kowane kirtani da aka zayyana a cikin fayil ɗin azaman `<text>` marar ganuwa. Binciken lambobi na canonical SVG yana karanta fayilolin da aka jera a cikin `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, da `public/images/tier-flow-dark.svg` da `tier-flow-light.svg`; da free-har abada, katalogi-shigarwa, maimaituwa-pool da maki-da'awar da'awar kuma karanta `promise-pillars.svg`, `free-tier-budget.svg` da `strategies-grid.svg`. `free-tier-budget.svg` yana zana alkalummansa daga mai ɗaukar hoto mai rai, don haka canzawa zuwa `FREE_MODEL_BUDGETS` ko zuwa ga mai bada suna nuna ja CI har sai an sabunta fayil ɗin.

### Aiki: `i18n-ui-coverage`

| Rubutun                         | Yana tabbatarwa                                                                                                                                                                                     | Toshewa     |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (layi) | UI i18n key ɗaukar hoto shine ≥ 65%                                                                                                                                                                 | Ee          |
| `check-ui-value-drift` (layi)   | Turanci da aka sake rubuta **daraja** ba ya barin wani tsayayyen fassarar baya                                                                                                                      | Ee          |
| `check-new-key-coverage` (layi) | A **sabuwa** Ana fassara maɓalli na Ingilishi a kowane yanki — ana ƙi alamar `__MISSING__:`                                                                                                         | Ee          |
| `check-translation-ratio`       | Matsakaicin fassarar gaskiya a kowane yanki (daidai-zuwa-Turanci / mai riƙewa / bacewar ganye a waje da jerin izini) dole ne ya wuce rashin ƙarfi `config/quality/i18n-translation-baseline.json` + | **Toshewa** |

Yana buƙatar `fetch-depth: 0` — Ƙofar ɗigon ƙima ta bambanta `en.json` da tushen haɗin kai.

#### `check-ui-value-drift` — Ƙofar fassara

Ya kama koma bayan i18n da sauran ƙofofin ba za su iya gani ba: ana sake rubuta ƙimar Ingilishi kuma fassarorin da aka samo daga _previous_ turanci sun tsaya a baya, don haka masu amfani da Ingilishi ba su ci gaba da karantawa da tabbaci-kalmomi, kwafin yanzu ba daidai ba.

An aika wannan don gaske. An sake rubuta `oauthModal.googleOAuthWarning` lokacin da mai taimakon shiga Antigravity ya sauka (#5203);**39 daga cikin 43 yankuna** ya ci gaba da gaya wa masu aiki rubutu su "kwafi cikakken URL su liƙa a ƙasa" — kwararar da ba za ta iya cikawa ga mai ba da ita ba. Ba a lura da shi ba har zuwa #8463 saboda:

- `sync-ui-keys` yana mayar da maɓallan da suke **ba ya nan** , ba wanda suke **tsayayye** ;
- `check-ui-keys-coverage` yana ƙirga maɓalli _presence_, don haka dattijon fassarar maƙasudi kamar an rufe shi;
- `check-translation-drift` yana bin madubin takardun `docs/i18n/<locale>/**.md` — ba ya karanta `src/i18n/messages/*.json`. Toshewa a cikin aikin `docs-sync-strict` tun lokacin sake daidaitawa na 2026-09: gyara ainihin doc → `npm run i18n:run -- --files=<doc>` (matakin sashe, arha).

**Bambance-bambance, ba mai goyan bayan tushe ba.** Yana kwatanta `en.json` a gindin haɗin kai da itacen aiki; ga kowane maɓalli wanda ƙimar Ingilishi ya canza, duk wani yanki da har yanzu yana riƙe da fassarar da ba a taɓa taɓawa ba ya daɗe. Wannan da gangan **daskare bashin da ya kasance** — diff ba zai iya bayyana wane tsohon Turanci da aka daɗe da fassara ya fito ba, don haka ƙofar tana yin hukunci kawai abin da canjin yanzu ya taɓa. Madadin (maɓallin maɓalli na kowane maɓalli) zai kashe fayil ɗin ~ 600 KB da aka samar, 3 × mafi girman tushen tushen da ake da shi, yana kunna kowane i18n PR.

Hanyoyi biyu don gamsar da shi:

1. sabunta fassarorin da abin ya shafa, ko
2. saita su zuwa `__MISSING__:<new english>` — lokacin aiki sannan ku ba da ingantattun Ingilishi (`src/i18n/request.ts::deepMergeFallback`, #7258) da maɓallan layukan fassara.

Idan igiyar ta **ma'ana** canza, fi son **canza sunan maɓalli** : sabon maɓalli ba zai iya gadon juzu'in fassarar. Wannan shine tsarin #8463 da aka yi amfani da shi.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Ƙimar-daraja da sabbin ƙofofin maɓalli suna raba kwatancen da ba zai iya canzawa daga `scripts/i18n/resolve-ui-diff-base.mjs`. Gudun aikin yana wuce tushe iri ɗaya, tukwici da ɗan takara SHAs zuwa cak guda biyu. PR/base-retarget, turawa da ƙungiyoyin haɗin gwiwa suna amfani da mahallin taron su. Aika reshen ɗan takara yana buƙatar ainihin buɗaɗɗen PR ko shigar `i18n_base_sha` bayyane. Aika ko tsara lura na `main` ko `release/vX.Y.Z` ba tare da wannan shigar ba yana kwatanta alƙawarin ƙarshe da iyayensa na farko; ba bincike ba ne na duk bashin fassarar da aka gada. Kiran gida yana buƙatar ƙayyadadden tushe kwatanta, misali umarnin `BASE_REF` a sama.

Mahallin kwatancen da ba a iya karantawa ko mara kyau ba, katalojin da ba a iya karantawa ko mara inganci, da ɗan takara da aka canza ya samar da `INCOMPLETE` tare da lambar fita.**2** , gami da cikin yanayin gargaɗi. Catalog karanta amfani da `scripts/i18n/read-ui-catalog.mjs`; gazawar karatu ba a maye gurbinsu da komai. Babu tushe mara samuwa ko shigar da bai cika ba ya kafa PASS.

### Aiki: `i18n`

Cikakken matrix ingantaccen i18n (aiki ɗaya a kowane yanki). Gabaɗayan aikin shawara ne.

| Rubutun                         | Yana tabbatarwa                | Toshewa                                                 |
| ------------------------------- | ------------------------------ | ------------------------------------------------------- |
| `validate_translation.py quick` | Cikakken fassarar kowane yanki | **Nasiha** (`continue-on-error: true` a kan dukan aiki) |

### Aiki: `pr-test-policy`

Yana gudana akan buƙatun ja kawai.

| Rubutun                | Yana tabbatarwa                                                                                                                             | Toshewa |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:pr-test-policy` | PRs wanda ke canza lambar samarwa a cikin `src/`, `open-sse/`, `electron/`, ko `bin/` dole ne ya haɗa ko sabunta gwaje-gwaje (Hard Rule #8) | Ee      |
| `check:test-masking`   | Fayilolin gwaji da aka canza baya rage ƙididdige ƙididdigewa ko ƙara tautologies `assert.ok(true)`                                          | Ee      |
| `check:pr-evidence`    | Jikin PR ya kawo shaidar test/VPS don canji (masu sarrafa Hard Rule #18 ta hanyar grepping PR prose — mai rauni, duba Backlog)              | Ee      |

### Aiki: `test-vitest`

Yana buƙatar aikin rarraba `changes`. Shards matrix masu aiki suna toshe haɗuwa akan gazawar.

| Suite            | Yana tabbatarwa                                                 | Toshewa                                                                                                          |
| ---------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Sabar MCP (kayan aikin 110), autoCombo, cache — vitest mai gudu | Ee                                                                                                               |
| `test:vitest:ui` | Bangaren UI yana gwada mafi kyawun mai gudu na —                | **Toshewa** An cire gazawar — da ta kasance a bayyane a cikin `vitest.config.ts`; sababbin gazawar sun kasa aiki |

### Gudun aikin dare (tsara, shawara)

Waɗannan suna gudana akan jadawalin cron (da `workflow_dispatch`), ba akan PRs ba. Duk nasiha ne.

| Gudun aiki             | Yana tabbatarwa                                                                                                                                                                | Toshewa    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `nightly-property`     | gwaje-gwajen kadara da sauri-bincike tare da bazuwar iri + babban gudu                                                                                                         | **Nasiha** |
| `nightly-resilience`   | Ƙofar girma-girma, hargitsi laifin allura, k6 load/soak                                                                                                                        | **Nasiha** |
| `nightly-llm-security` | Mai gadin allura da gaggawa (yanayin toshe) + garak probes (an tsallake shi ba tare da sirrin mai bayarwa ba)                                                                  | **Nasiha** |
| `nightly-schemathesis` | OpenAPI kwangilar fuzzing (ƙirƙiri) a kan OmniRoute mai rai ta amfani da `docs/openapi.yaml` — saman fayyace takaitattun abubuwan keta haddi / 500s marasa kulawa (Fase 8 B.4) | **Nasiha** |
| `nightly-mutation`     | Makin gwajin maye gurbi na Stryker akan layin naúrar sauri — tsirar da mutants saman fage marasa ƙarfi.                                                                        | **Nasiha** |
| `nightly-compat`       | Matrix dacewa injin Node a cikin kewayon `engines.node` masu goyan baya                                                                                                        | **Nasiha** |

Abubuwan da aka yi amfani da su (tuni, TTFB, lokacin ginawa) ana rubuta su, ba gated: duba [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

### CodeQL ratchet: shigar da ɗan takara da kayan ajiya

CI ta mallaki izinin shiga CodeQL dan takara ta hanyar sarkar dogaro da kai: `codeql-scan` tana kiran matrix na harsuna hudu a cikin `codeql.yml`, sannan `codeql-admission` tana gudanar da `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` yana buƙatar duka sakamakon. Ingancin yana riƙe da nasa cak na lambobi amma baya tambayar na'urar daukar hotan takardu kafin mai ƙira ya gama; `Gate / Quality` kadai ba cikar shigar dan takara bane. CodeQL ya rage a kan ƴan takara-docs kawai.

Manufar a cikin `config/quality/codeql-admission-policy.json` tana zaɓar Ayyuka, C/C++, JavaScript/TypeScript da Python, tsohowar tambaya, ƙirar barazanar nesa da yanayin gini babu. Preflight mai samarwa ya ƙi rikodin kunnawa mai jiran aiki da rassa a waje da takamaiman lissafin manufa. Maƙasudin na yanzu sune manyan kuma gwaje-gwajen kwangila release/v3.8.54. sun kwatanta wannan jerin iyaka da abin da ake turawa na ci gaba tare da nau'in kunshin; sakin na gaba yana buƙatar sake dubawa akan jirgin. CI's data kasance mafi fa'idar sakin PR yana riƙe da shi, amma maƙasudin maƙasudin da ba a cikin allo yana ba da rahoton HOLD kafin a cire shi maimakon samun PASS mara aunawa.

Kowane aikin matrix yana rikodin ainihin SARIF upload ID, harshe, rukuni, gudu da ƙoƙari, ainihin aikin mai kira, taron ref/head/base/merge SHA da hash manufofin. Dogaran aikin zazzagewar ne kawai rasidun wannan gudu kuma yana tabbatar da narkar da kayan tarihi. Yana buƙatar dukkan nau'ikan nau'ikan guda huɗu, mai samarwa mai nasara da kammala sarrafa kowane ainihin lodawa. Yana amfani da tace sarif_id na API, ba sabon bincike da aka samu akan reshe ba. Sake yin sashe na iya sake yin amfani da nau'ikan nasara daga yunƙurin da aka yi a baya na wannan gudu da ɗan takara, yana kiyaye ƙoƙarin samarwa; mai ƙira na yanzu da ya gaza ba zai iya sake amfani da shaidar kore ta baya ba.

Ayyukan CodeQL yana jira don sarrafawa, amma aiwatar da shi na iya yin gargaɗi da ci gaba bayan gazawar karatun matsayi ko gajiyar jira. Shiga don haka yana sake tabbatar da aiki. Rukunin da suka ɓace, aiki masu jiran aiki, gazawa ko soke ayyukan yi, ainihin asali, rashin cikar pagination ko babu APIs suna samar da HOLD da fita 2. Babu tsayayyen jira don aikin na'urar daukar hotan takardu mai zaman kanta da ya rage. PR da ba a bincika ba ba zai iya wucewa ba saboda tambayar faɗakarwa ta dawo 0. Ƙididdigar da aka auna sama da `metrics.codeqlAlerts.value` ta fita 1; Ba a ɗaga tushen tushe don ɗaukar faɗakarwar wani reshe. [Sanya matsayi da binciken bincike](https://docs.github.com/en/rest/code-scanning/code-scanning).

Rasidin yana yin rikodin lodawa da bincike IDs, nau'ikan, nau'ikan kayan aiki, ref/SHA, tushe da lambobin faɗakarwa. Ƙididdigar SARIF identity/result, ƙididdiga mafi ƙanƙanta na ƙa'ida da ainihin yanayin faɗakarwa sun kasance wajibi. Ana sake bincika sunayen PR/analysis kafin karɓa. Waɗannan cak ɗin sun kafa ƙayyadaddun ɗaukar hoto, ba ƙira na kowane fayil ɗin tushen da aka fitar ba. C/C++ babu-gini hakar bai haɗa da lambar da aka samar yayin gina aikin ba. Cire tushen tushen har yanzu yana buƙatar bita, kuma ƙimar mai ba da gudummawa yana buƙatar kwatankwacin shaidar tushe daidai.

`codeql-maintenance.yml` yana ba da sikanin turawa-saki mai aiki da jadawalin mako-mako ba tare da kwafin masu kera PR/main ba. `nightly-codeql-inventory.yml` yana keɓance tushen tushen ma'ajiya, tare da `--strict-measurement` da gazawa lokacin da babu ma'auni. Kyakkyawar tsallake mai karɓar gado na gida ba shigar ɗan takara bane. Tsayawa ya kasance bayyananne `--update` bayan an tabbatar da ƙarancin ƙidayar duniya.

Ba dole ba ne a buga ɗimbin ayyukan aiki yayin da aka saita Saitin Default: GitHub ya ƙi wannan haɗin. Manufofin sa da aka siffanta ya kasance yana jiran har sai an sake karanta canjin gudanarwa da aka yi bita. Kafin bugawa, ma'aikacin ma'aikaci yana saka ma'ajin ajiya, head/base/tree, policy/patch/rollback hashes da yanayin saitin da aka lura; `node scripts/quality/codeql-producer.mjs verify-admin-readback` yana duba abubuwan da ake tsammani da kuma ainihin bayanan JSON. Wannan gadi ne na fasaha, ba amincewar ma'aikaci ba ko kuma maye gurbin sake dawo da sabbin abubuwan sake karantawa. Alamar PR ba ta buƙatar samun damar Gudanarwa. Fitar da duk wani canjin na'urar daukar hotan takardu yana buƙatar keɓancewar sake karantawa tare da ainihin PR, cokali mai yatsa da shaidar dacewar ƙungiyar.

Forks suna amfani da ƴan gudu da aka karɓa, dubawa ba tare da dagewar takaddun shaida ba, babu aikin install/build a cikin furodusoshi, kuma babu gadajen sirrin ma'ajiya. GitHub yana goyan bayan loda SARIF don taron pull_request tare da rage alamar cokali mai yatsa; amincewar aiwatar da gudunmawa ta farko ta kasance manufar GitHub. Kar a taɓa amfani da pull_request_target don aiwatar da lambar da ba a amince da ita ba. Tabbatar da haƙiƙanin izini na alama, analysis_key da duk mahallin rukuni a cikin canary mai sarrafawa kafin la'akari da kammala ƙaura. [Dokokin loda cokali mai yatsu](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [yanayin saitin saɓani](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Korarwa shine kiran mai aiki (Hard Rule #14)** — bai taɓa yin watsi da faɗakarwar CodeQL ba tare da yin rikodin hujjar fasaha a cikin sharhin korar: `won't fix` don buƙatun ƙa'idar aiki, `used in tests` don ƙayyadaddun gwaji, `false positive` don sanitizer CodeQL ba zai iya gani ba (wanda ya gabata: `docs/security/ERROR_SANITIZATION.md`).

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

**Waɗanda kuma ba a rubuta a sama ba** (na shawara, sigina kaɗan): aikin `docs-lint` (markdownlint + Vale, dukkan aikin `continue-on-error`) da workflow na scanner masu zaman kansu `semgrep.yml` / `scorecard.yml`. CodeQL yanzu yana da ayyukan samarwa da karɓa na dole ƙarƙashin `Gate / CI`, bisa buƙatun kunnawa da aka bayyana sama. `semgrepFindings: 0` yana cikin `quality-baseline.json` amma ba a haɗa shi da iyaka mai toshewa a `ci.yml` ba — wannan ma'auni yanzu ba shi da haɗin aiki.

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
