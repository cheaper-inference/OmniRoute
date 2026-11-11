# Quality Gates Reference (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Ang dokumentong ito ang awtoritatibong sanggunian para sa lahat ng CI quality gate sa OmniRoute.
Inilalarawan nito ang bawat gate, kung ano ang bine-validate nito, kung saang CI job ito tumatakbo, kung gumagamit ito
ng ratchet baseline o patakarang pass/fail, at kung hinaharangan nito ang build o nagsisilbi lamang bilang abiso.

Para sa maikling buod at patakaran sa allowlist, tingnan ang seksyong "Quality Gates & Ratchets"
sa `AGENTS.md`. Para sa kritikal na pagtatasa, klasipikasyon ng maturity, at tool-agnostic na
plano ng replikasyon ng parehong sistema, tingnan ang
[Playbook ng Quality Gate](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Gate imbentaryo at mga profile ng pagpapatupad

### Pagpasok ng kandidato

Ang mga workflow ng CI at Quality Gates ay naglalabas ng matatag na hatol: `Gate / CI` at `Gate / Quality`. Ang kanilang bersyon na patakaran sa pagpasok ay nagsasaad ng bawat upstream na trabaho ayon sa kinakailangan o pagpapayo. Ang isang naaangkop na kinakailangang trabaho ay dapat magtagumpay: nawawala, nakansela, nilaktawan, nakabinbin at hindi alam na mga resulta ay hindi makakapagtatag PASS. Ang isang wastong docs-only o catalog-only na pag-uuri ay maaaring gawing hindi naaangkop ang isang code lane; ang isang ordinaryong draft PR ay hindi isang tinatanggap na kandidato. Ang isang `hotfix` label ay hindi nag-aalis ng ebidensya.

Ang parehong daloy ng trabaho ay sumasaklaw sa PRs sa mga sangay ng main/release, nagtutulak sa `main`, manu-manong pagpapadala at mga kaganapan sa pagsasanib-grupo. I-push, dispatch at merge-group ang buong seleksyon. Ang isang pinagkakatiwalaang draft ng pila ng Mergify ay nagpapatakbo din ng mga naaangkop na `full-code`/`full-code-e2e` na trabaho; laktawan sila ng ordinaryong PRs. Bago ang isang manu-manong pagsasama, magpatakbo ng isang buong dispatch sa eksaktong kandidato. Hindi sinisimulan ng mga push sa `release/**` ang mga workflow na ito; Ang Release-Green ay nagmamasid sa pinagsanib na base nang hiwalay (`docs/ops/RUNNER_BOX.md` → Hosted lane). Gumagamit ang mga forks at merge na grupo ng mga naka-host na runner para sa mga trabahong pumipili ng mga self-hosted na runner; dapat ma-verify ang sapat na naka-host na kapasidad bago ilunsad.

Isang ordinaryong PR ang nagpapatakbo ng mabilis na pagpili. Ang mga linya ng `full-code` at `full-code-e2e` ng patakaran sa pagpasok (E2E, integration, package artifact, Electron smoke, Bun SQLite, ecosystem at mga protocol na kliyente) ay tumatakbo lamang sa isang draft ng pila ng Mergify o sa isang buong pagtakbo: `gh workflow run ci.yml --ref <branch>`.

Tinutukoy ng bawat resibo JSON ang naka-check-out SHA, pagtakbo at pagtatangka ng daloy ng trabaho. Ang CLI ay tinatanggihan ang isang checkout/event SHA mismatch. Ang mga pagsubok sa daloy ng trabaho ay nagbubuklod sa membership ng patakaran sa listahan ng `needs` ng trabaho ng hatol upang ang isang bago o inalis na linya ay hindi maaaring tahimik na mawala. Sinasaklaw ng mga resibo ang sarili nilang daloy ng trabaho, hindi ang paglalathala, pag-deploy, o ang mga panloob ng isang umiiral nang advisory scanner. Ang paggawa ng naaangkop na mga pagsusuri na kinakailangan sa mga tuntunin ng sangay ay isang hiwalay na pagbabagong administratibo; ang pagtukoy sa kanilang mga trabaho ay hindi mismo nagpoprotekta sa isang sangay.

`API Route Typecheck` ay isang independiyenteng pagsusuri sa daloy ng trabaho, sa labas ng parehong pinagsama-samang mga hatol at static na profile ng lokal na buong tagamasid. Siyasatin nang hiwalay ang resulta nito para sa eksaktong kandidato. Gumagana `.github/workflows/api-route-typecheck.yml` sa PRs sa `main` o `release/**`, itinutulak ang alinman sa pamilya ng sangay, manu-manong dispatch, at `merge_group` na mga kaganapan ng uri `checks_requested`. Wala itong filter ng landas. Pagsamahin ang mga grupo tingnan ang `merge_group.head_sha`; iba pang mga kaganapan tingnan ang `github.sha`. Ang lahat ng mga kaganapan ay gumagamit ng parehong API diagnostic gate at gate unit test. Ang mga base retarget PR ay humihiling ng bagong tseke; Ginagamit ng mga pag-edit body/title ang pangalang `Admission not requested / API Route Typecheck` lamang sa pagmamasid at hindi maaaring palitan ang pagsusuri sa pagpasok.

### Napanatili ang ebidensya sa reducer ng pagtanggap

Binabawasan `scripts/quality/validate-release-acceptance.mjs` ang isang ibinigay na plano at ang mga manifest nito; hindi nito itinatag na ang plano ay sumasaklaw sa kumpletong release pipeline. Ang mga ulat nito ay tahasang nagtatakda ng `releaseAcceptance: false`, kahit na ang planong iyon ay `VERIFIED`. Gumagamit pa rin ang workflow `release-acceptance.yml` ng mga shadow fixture, hindi totoong build, package, boot o mga resibo ng promosyon.

Ang CLI ay nangangailangan ng `--evidence-root` na i-verify ang napanatili na ebidensya. Naresolba ang mga file bilang `<evidence-root>/<artifact_id>/<member>` at na-hash bilang SHA-256. Pinipigilan ng PASS record na walang ebidensya, nawawala o binagong file, hindi ligtas na landas o symlink ang pag-verify. Ang mga nawawalang file ay hindi katumbas ng walang laman na matagumpay na mga log. Ang mga kasalukuyang pagsusuri SHA/run/attempt ay nananatiling independiyente: ang pagtutugma ng mga byte ay hindi makakapagligtas ng isang lipas na resibo. Ang integridad ng file ay hindi patunay ng pagiging tunay ng pagpapatupad o pag-promote ng artifact.

### Ginagamit DAST ang na-verify na CI build

Ang kinakailangang `dast-smoke` CI na trabaho ay tumatawag `.github/workflows/dast-smoke.yml` pagkatapos `build`. Sinusundan nito ang parehong pagpili ng code/draft bilang ang build, kabilang ang suportadong tinidor PRs, release-target PRs at pinagsamang mga grupo. Isang nawawala, nabigo, nakansela, o hindi inaasahang nalaktawan ang DAST na humaharang `Gate / CI`. Ang reusable workflow ay walang independiyenteng PR/dispatch trigger; Ang manual validation ay gumagamit ng CI's dispatch para ang build at consumer ay manatili sa isang run.

Tinatakan ng `scripts/ci/next-build-provenance.mjs` ang buong Next artifact kasama ang tar digest nito, repository/event/run, pagtatangka ng producer, head/base/checkout/tree, mga pagkakakilanlan ng workflow, lockfile, eksaktong Node version/ABI, platform at bundler. Pinipili DAST ang immutable artifact ID mula sa `needs.build.outputs`, nangangailangan ng pag-verify ng download digest, at independyenteng hina-hash ang ZIP laban sa producer digest bago kunin ang dalawang pinapahintulutang miyembro nito sa pamamagitan ng `scripts/ci/unpack-ci-build.py`. Dapat ding tumugma ang manifest at tar archive sa mga independiyenteng output ng producer bago ma-extract ang Next tree. Hindi ito kailanman naghahanap ng pinakabagong matagumpay na pagbuo ng sangay. Maaaring gamitin muli ng isang bahagyang muling pagpapatakbo ang parehong pagtatangka ng producer kapag tumutugma pa rin ID nito at lahat ng input; ang resibo ay nagtatala ng parehong mga pagtatangka.

Ang mamimili ay nananatili sa isang naka-host Linux runner na may read-only na pahintulot sa repository at walang mga sikreto sa repository. Ini-install nito ang eksaktong bersyon ng Node ng producer, pagkatapos ay i-assemble ang CLI sa `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. Tinatanggihan `scripts/build/standaloneInput.mjs` ang isang nawawalang standalone na server bago ang anumang fallback build; Ang mga normal na lokal CLI build ay nagpapanatili ng kanilang kasalukuyang fallback. Ang pagiging handa ng server, Schemathesis at promptfoo ay dapat magtagumpay lahat sa loob ng hindi nabagong 25 minutong limitasyon sa trabaho. Ang isang provenance receipt ay nagpapatunay ng input identity at bytes, hindi isang matagumpay DAST scan. Ang pag-expire ng artifact, pagkaantala ng runner o isang nabigong scanner ay nananatiling hindi kumpleto o nabigong ebidensya; hindi ito maaaring maging PASS sa pamamagitan ng advisory wrapper.

### kapasidad ng pagpapatupad UI

Pinapatakbo CI ang buong imbentaryo UI bilang apat na `test-vitest` matrix shards, bawat isa ay may hindi hihigit sa dalawang manggagawa bawat shard at ang umiiral na 15 minutong deadline ng trabaho. Ang unang shard ay nagpapatakbo din ng MCP/autoCombo Vitest suite. Ang kinakailangang resulta ng trabaho ay sumasaklaw sa bawat matrix leg; Ang pagkabigo o pagkansela ng isang shard ay hindi makapagtatag ng pagpasok ng kandidato.

Ang gabi-gabing tagamasid ay nagpapanatili ng isang hiwalay na eksaktong-kandidato na resibo para sa bawat UI shard, kasama ang MCP execution sa unang resibo. Kinakailangan ang lahat ng apat na resibo, log at magkatugmang pagkakakilanlan ng pagpapatupad. Pinipili pa rin ng Lokal `npm run test:vitest:ui` ang kumpletong suite; ang isang `--shard` run ay bahagyang ebidensya lamang.

### Pagkolekta ng saklaw ng yunit

Kinokolekta ng labindalawang unit shards ang saklaw ng V8 sa panahon ng kanilang kasalukuyang pagpapatupad ng pagsubok. Ang isang matagumpay na shard ay nagpapatakbo ng `scripts/ci/compact-v8-coverage.mjs` upang i-compress ang mga orihinal na file nang hindi bumubuo ng isang intermediate na ulat sa Istanbul. Bine-verify ng huling trabaho sa Coverage ang lahat ng labindalawang manifest laban sa kandidatong SHA, runtime, source root at mga hash ng data, pagkatapos ay pinapatakbo ang mga reporter ng c8 at kasalukuyang mga limitasyon sa saklaw. Pinapanatili ng mga input ang pandaigdigang pagkakasunud-sunod ng filename ng c8; Ang per-shard pre-merging ay hindi ligtas para sa halo-halong saklaw function/block. Ang mga nawawala, malformed o hindi magkatugma na mga shards ay nabigo sa pagpasok. Ang mga nabigong test shards ay nagpapanatili ng hilaw na diagnostic coverage nang hiwalay; hindi ito makapasok sa huling pagsasama.

### Mga resibo ng progreso ng pagpapatupad ng unit

Itinatala ng nakabahaging utos ng `test:unit:ci:shard` ang mga yugto ng `primary`, `dashboard` at `serial` sa pamamagitan ng `scripts/ci/unit-progress-reporter.mjs`. Nananatiling available ang normal na ulat ng pagsubok. Ang isang hiwalay na metadata-only na resibo ay nagtatala ng pagsisimula at pagkumpleto ng bawat file, at ang 30 segundong tibok ng puso ay naglilista ng mga file na aktibo pa rin at ang kanilang lumipas na oras. Itinatala lamang nito ang pinapahintulutang metadata ng pagpapatupad; Ang mga paglalarawan ng pagsubok, output, mga error na katawan at ang buong kapaligiran ay hindi serialized.

Pinapanatili CI ang mga JSONL file bilang `unit-progress-ci-<run>-<attempt>-<shard>`. Maaaring pigilan ng timeout ng trabaho ang pag-upload sa ibang pagkakataon; Ang mga tibok ng puso na nailabas na ay nananatiling diagnostic na ebidensya. Ang mga nawawalang tibok ng puso ay maaari ding sumasalamin sa isang na-block o natapos na proseso ng runner. Ang mga resibong ito ay nagpapanatili ng umiiral na pagpili ng pagsubok, kasabay, mga deadline at katayuan sa paglabas; hindi sila mga hatol sa pagpasok ng kandidato.

### Pagsamahin ang pila

Ang `queue` label ay nagpapadala ng PR sa Megify queue (`.mergify.yml`). Binubuksan ng Mergify ang isang draft PR sa isang sangay `mergify/merge-queue/`, pinapatakbo CI ang buong seleksyon doon, at nagsasama ang orihinal PR kapag pumasa ang `Gate / CI`, `Gate / Quality` at `Merge integrity (changelog + generated skills)`.

Isinulat ng Mergify ang buod ng queue nito sa paglalarawan ng draft. Gumagamit ang mga event ng Body/title-only `pull_request` `edited` ng isang run-specific na concurrency na grupo at hindi muling pinapatakbo ang pag-uuri, pagsubok ng mga matrice, pagsasama-sama ng integridad o ang hatol sa pagpasok. Hindi maaaring palitan ng mga pangalan ng Observation-only check `Gate / CI` o `Gate / Quality`. Ang isang pag-edit na nagbabago sa target na base ay humihiling ng bagong pagpapatunay ng kandidato.

Pagkatapos ng isang dequeue, ang isang push ay hindi palaging requeue ang PR. Magkomento ng `@mergifyio queue` dito.

### Static scan na imbentaryo

Ang bersyon na npm-alias na imbentaryo at static-scan na membership ay nakatira sa `config/quality/gate-manifest.json`. Patakbuhin ang `npm run check:gate-manifest` upang patunayan ang mga pangalan ng script at eksaktong mga utos laban sa `package.json`; ang mga karagdagan, pag-aalis at command drift ay nabigo sa parehong lokal na kawit at mga trabaho sa pag-uuri ng pagbabago sa CI. Ang isang alias ay hindi isang workflow na trabaho, matrix instance o test case: ang mga bilang na ito ay hindi dapat ipakita bilang mapagpapalit.

Gamitin `npm run quality:scan -- --list` o `npm run quality:scan:fast -- --list` upang siyasatin ang mga napiling alias nang hindi isinasagawa ang mga ito. Ang runner ay gumagamit ng npm entrypoint, kaya ang runtime nito (kabilang Bun kung saan naka-configure) ay napanatili. Itinatala ng manifest ang mga alias sa labas ng mga profile na iyon bilang hiwalay na ginagamit, at ipinagbabawal ang mga command sa pagpapanatili sa mga read-only scan na profile.

Sinasaklaw ng mga profile na ito ang static scan lamang. Hindi nila pinatutunayan ang mga pagsusuri sa produkto, saklaw, packaging, mga panlabas na pagsusuri o ganap na pagtanggap ng isang kandidato. Ang pagpasok sa daloy ng trabaho ay gumagamit ng naka-link na `config/quality/admission-policy.json` at `scripts/quality/admission-verdict.mjs`. Ang mga profile ng release-observer ay nananatiling hiwalay; siyasatin ang kanilang mga naaangkop na tseke at resibo nang nakapag-iisa. Ang mga static na utos ng buong tagamasid ay idineklara sa `config/quality/release-green-static-profile.json`, kabilang ang `audit:deps`, mutation-test selection at translation checks. Ang loader ay nagpapatunay ng mga utos ng npm laban sa package.json at mga modelong deklarasyon CI/Quality ; tinatanggihan nito ang drift sa halip na magsagawa ng mga token ng shell bilang mga argumento. Ang kinakailangang scanner SKIP/INCOMPLETE output ay hindi makapagtatag PASS. Itinatala ng profile ang mga panlabas na pagbubukod nito at hindi pinapalitan ang naka-host na saklaw, mga test matrice, pakete o ebidensya sa pag-deploy. Ang imbentaryo ng prose sa ibaba ay isang sanggunian, hindi patunay na talagang tumakbo ang isang gate.

Ang mga script ay nakatira sa ilalim ng `scripts/check/` (mga gate ng patakaran) at `scripts/quality/` (ratchet engine). Ang CI na pinagmumulan ng katotohanan ay `.github/workflows/ci.yml`.

### kalusugan ng dokumentasyong naka-publish na base

Sinusubaybayan `.github/workflows/i18n-base-health.yml` ang kalusugan ng dokumentasyon pagkatapos ng mga napiling push sa `main` at `release/v*`, at sa manu-manong pagpapadala. Sinasaklaw ng mga filter nito ang dokumentasyon, root Markdown, `llm.txt`, pagsasalin state/configuration at ang nauugnay na tool ng i18n. Ang nag-iisang `Published base documentation health` na trabaho ay gumagamit ng naka-host na Ubuntu at limang minutong deadline. Nagsasagawa ito ng read-only na pagpapatunay at nagsusulat ng diagnostic na resibo nang walang pag-install ng dependency, pagsasalin o pag-aampon ng estado.

`scripts/i18n/check-base-health.mjs` ay nangangailangan ng zero source-hash, missing-target, target-hash, stale-translation at hindi pagkakapare-pareho ng section-cache. Pinapatunayan din nito ang kasalukuyang pangunahing saklaw document/locale at ang naitalang pinagmulan nito. Ang di-wastong konteksto, hindi kumpletong saklaw o isang nagambalang checker ay gumagawa ng `INCOMPLETE`; ang nakumpirma na drift ay gumagawa ng `FAIL`. Parehong nagbabalik ng bagsak na katayuan sa paglabas. Ang resibo ay nakasalalay sa pag-checkout SHA, daloy ng trabaho, pagtakbo at pagtatangka, at pananatilihin bilang `i18n-base-health-<sha>-<run>-<attempt>`.

Ito ay isang independiyenteng obserbasyon ng nai-publish na base. Hindi ito nagdaragdag ng PR o merge-group na kaganapan, isang kinakailangang PR check, isang npm alias o isang static-scan na miyembro ng profile. Hinaharangan din ng pinagbabatayan na checker ang lahat ng limang klase sa absolute mode. Ang ordinaryong paghahanda PR ay nananatiling hiwalay sa pagpasok. Ang isang matagumpay na pag-upload ay hindi maaaring gawing PASS ang isang nabigong resulta sa kalusugan.

Ang isang ordinaryong PR ay gumagamit `--preflight` na may base na ulat na nabuo ng `--baseline-evidence`. Maaari itong mag-iwan ng English source na nakabinbin lamang kapag ang kumpletong record ng pagsasalin at ang aktwal na target na mga byte ay hindi nabago mula sa eksaktong base na iyon. Ang mga bagong target o hindi pagkakapare-pareho ng section-cache ay humaharang pa rin, at hindi maaaring pahintulutan ng hindi kumpletong ebidensya ang paghahanda. Ang ulat ay naglalantad ng `preparationPending` at `mergeReady` nang magkahiwalay: ang matagumpay na paghahanda ay hindi naghahanda ng mga nakabinbing pagsasalin upang pagsamahin. I-refresh ang mga apektadong salamin sa binubuong kandidato bago tanggapin. Ang pinagkakatiwalaang kandidato ng pila ng Mergify, `merge_group`, mga branch push at manual na pagpapatakbo CI ay gumagamit ng absolute checker, nang walang `--warn` o minana-pagkabigong pagpapatawad. Ang mga nawawalang target na hash at isang saklaw na binabawasan ng mga tinanggal na naitala na mga pangunahing file ay hindi makakagawa ng matagumpay na ganap na hatol.

### Ilabas ang PR fast-path (`quality.yml`)

Kinukumpleto `.github/workflows/quality.yml` CI sa main/release PRs, itinutulak sa `main`, dispatch at pagsamahin ang mga grupo. Gumagamit PRs ng mga mabilis na pagsusuri na na-filter ng landas. Inalis ang permanenteng hindi pinagana na duplicate na build; mananatili sa CI ang totoong build/package/boot checks. Ang unit suite at vitest ay tumatakbo lamang sa CI (`Unit Tests (N/12)` at `Vitest`).

| Trabaho                                          | Saklaw                                                                                                                                                                                                                                              | Hinaharang                 |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs ref at docs-all                                                                                                                                                                                                             | Oo                         |
| `Fast Quality Gates`                             | Code PRs; mga static na check, typecheck, dashboard typecheck, mga naapektuhang unit test                                                                                                                                                           | Oo                         |
| `Forgotten sibling tests`                        | Code PRs; binago ang mga module na nasubaybayan sa mga static na mamimili at mga pagsubok sa kapatid na kandidato; Ang mga path ng barrel at dynamic-import ay iniuulat bilang advisory diagnostics, na may mga reference na allowlist na exception | **Advisory**               |
| `No new ESLint warnings`                         | Code PRs; suppressions-aware lint guard                                                                                                                                                                                                             | Oo, kasama ang mga tinidor |
| `Merge integrity (changelog + generated skills)` | Non-draft PRs; changelog at nabuong pag-sync ng kasanayan                                                                                                                                                                                           | Oo, kasama ang mga tinidor |

#### Nakalimutang ulat ng mga pagsubok sa kapatid

Gumagana `npm run check:forgotten-sibling-tests` bilang isang hakbang sa pagpapayo ng `Fast Quality Gates` at muling ginagamit ang solver ng pag-import sa likod ng mapa ng test-impact. Para sa bawat binagong module ng produksyon, nag-uulat ito ng mga deterministikong `changed module/symbol -> static consumer -> candidate sibling test` chain kapag ang pagsusulit ng kandidato ay wala sa pull-request diff. Ang buod ng Markdown at resulta JSON ay pinananatili bilang artifact ng workflow `forgotten-sibling-tests` para sa pag-calibrate bago ang anumang pag-block ng rollout.

Ang mga re-export ng barrel at dynamic na pag-import ay mga diagnostic ng resolusyon lamang; hindi sila kailanman gumagawa ng pagharang sa paghahanap. Live sa `config/quality/forgotten-sibling-allowlist.json` ang mga nasuri na exception. Dapat pangalanan ng bawat entry ang pagsubok ng consumer at kandidato, magbigay ng isang partikular na katwiran, at mag-link ng isyu GitHub o pull request. Hindi naisara ang mga maling porma. Ang mga pagbubukod ay hindi maaaring sugpuin ang isang tinanggal na pagsubok ng kandidato o isang pagkakaiba na nagdaragdag ng `.skip`/`.todo`; Ang pagpapahina ng assertion at iba pang masking ay nananatiling pag-aari ng independiyenteng humaharang `check:test-masking` gate.

### Trabaho: `lint`

Tumatakbo sa bawat PR hanggang `main`. Ang mga bloke ay nagsasama sa kabiguan.

| Script (`npm run ...`)            | Pinapatunayan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Hinaharang                               |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`              | Ang bersyon Node.js ay nasa loob ng sinusuportahang hanay                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Oo                                       |
| `check:cycles`                    | Circular import sa lahat ng `src/` + `open-sse/` (AST-based, tsconfig `paths` naresolba). Bare exits 1 sa tuwing mayroong anumang cycle (nabigo sarado mula noong #15281) at naglilista ng SCCs. `check:cycles:ratchet` (kung ano ang pinapatakbo CI ) ay humaharang kapag ang bilang ay lumampas sa `metrics.cycles` ceiling sa `quality-baseline.json` — kasalukuyang 14, `direction: down`, kaya maaari lamang itong mahulog (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Oo (ratchet)                             |
| `check:boundary`                  | `open-sse → src` coupling: natatanging pag-import ng file-to-file mula sa engine papunta sa app (`scripts/quality/measure-boundary.mjs`; ang gilid na listahan ay ang v4 core/module-split remediation backlog). Bare = advisory report (katulad ng `quality:boundary`). `check:boundary:ratchet` (kung ano ang pinapatakbo CI, gayundin sa `quality.yml` fast-gates ratchet loop) ay humaharang kapag ang bilang ay lumampas sa `metrics.boundaryOpenSseToSrc` ceiling sa `quality-baseline.json` — na seeded sa sinusukat na 771, `direction: down`; Ibinababa lamang ito ng `--update` ; base-relative sa PRs (`--base-ref`, tingnan sa ibaba)                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oo (ratchet)                             |
| `check:route-validation:t06`      | Ang mga Zod schema ay nasa lahat ng ruta (Tier 6 na patakaran)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Oo                                       |
| `check:any-budget:t11`            | Ang bilang ng `@ts-expect-error // any` ay hindi lalampas sa badyet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Oo                                       |
| `check:provider-consistency`      | Ang bawat provider sa `providers.ts` ay may katugmang entry sa `providerRegistry.ts` (at vice-versa, sa loob ng allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Oo                                       |
| `check:model-lifecycle`           | Ang tatlong talahanayan ng pagruruta na pinapanatili ng kamay ay nananatiling pare-pareho sa naka-check-in na lifecycle snapshot (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ay walang marka ng retiradong id na maaaring iruta `REGISTRY` ; bawat `BUILT_IN_ALIASES` target ay naroroon sa `REGISTRY` at wala sa retired-id snapshot; bawat retiradong id na nasa `REGISTRY` pa rin ay ipinapasa o nakalista sa `allowedRetiredInCatalog`; at walang `DEFAULT_DEGRADATION_MAP` source o target na lumalabas na hindi na sa snapshot na iyon. Hindi ito nagpapatunay na ang isang modelo ay kasalukuyang inihahatid ng isang live upstream. Ang offline — ay naghahambing laban sa `config/quality/model-lifecycle.json`, na ni-refresh sa pamamagitan ng kamay gamit ang `npm run quality:refresh-model-lifecycle` (network; hindi naka-wire sa CI). `allowedRetiredInCatalog` ay isang burn-down ratchet: magdagdag lamang ng entry na may isyu sa pagsubaybay.                                                                                                                                             | Oo                                       |
| `check:fetch-targets`             | Ang bawat `fetch("/api/...")` sa client-side `src/` ay nagre-resolve sa isang tunay `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Oo                                       |
| `check:deps`                      | Ang lahat ng `npm install` -able deps sa bawat `package.json` sa repo ay nasa `dependency-allowlist.json`; na-flag ang mga bagong naka-unpin o slopsquatted na pakete                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Oo                                       |
| `audit:deps`                      | npm audit ng lahat ng limang independiyenteng lockfiles (root, Electron, OpenCode plugins v1/v2 at provider). Ang mga kritikal na advisories block; nananatiling nakikitang mga babala ang matataas na payo. Ang mga Missing/failed audit ay INCOMPLETE at block; Ang mga hash at ulat ng lock sa bawat saklaw ay pinapanatili.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Oo                                       |
| `check:lockfile`                  | `package-lock.json` integrity — https registry, integrity hash, walang host overrides                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Oo                                       |
| `check:licenses`                  | SPDX license allowlist para sa production dependencies                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Oo                                       |
| `check:tracked-artifacts`         | Walang build artifact / naka-commit na `node_modules` symlink (gumagamit din sa husky na pre-commit; ang pre-push ay sadyang magaan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Oo                                       |
| `check:ai-attribution`            | Walang AI/bot `Co-Authored-By` trailer o AI-generation footer sa PR commits, title o body — Hard Rule #16 (sa `quality.yml` fast-gates loop para sa PR→ `release/**` — ang nagbabasa ng event payload, walang-op off PRs — at isang PR-only na hakbang sa `ci.yml` `main` din para sa PR→; ang ZQsky `commit-msg` ; pinapayagan ang mga kapwa may-akda #14436                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:vitest-exclusions`         | Ang bawat pagbubukod Vitest ay nagpapangalan ng isang isyu sa pagsubaybay at lumalabas sa `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Oo                                       |
| `check:file-size`                 | Ang mga source file (`.ts`/`.tsx` sa `src/`, `open-sse/`, `electron/`, `bin/`) ay mananatili sa loob ng `cap` at mga test file (`*.test.ts(x)`) sa loob ng `testCap`; Ang mga file na naka-freeze sa `file-size-baseline.json` (`frozen` / `testFrozen`) ay hindi dapat lumampas sa kanilang naitala na laki                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Oo                                       |
| `check:error-helper`              | Ang mga tugon ng error sa executors/handlers ay gumagamit ng `buildErrorBody()` / `sanitizeErrorMessage()` (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Oo                                       |
| `check:migration-numbering`       | Ang mga migration SQL file ay sunud-sunod na binibilang, walang gaps o duplicate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Oo                                       |
| `check:public-creds`              | Walang literal na OAuth `client_id`/`client_secret` o Firebase Web key sa labas ng `publicCreds.ts` (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Oo                                       |
| `check:db-rules`                  | Walang raw SQL sa labas ng `src/lib/db/` modules; walang barrel-import mula sa `localDb.ts` (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Oo                                       |
| `check:known-symbols`             | Ang mga tagapagpatupad ng provider, mga diskarte sa pagruruta, at mga tagasalin na nakarehistro sa kanilang mga talahanayan ng dispatch ay tumutugma sa mga file sa disk — walang mga naulila o hindi ipinahayag na mga simbolo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Oo                                       |
| `check:route-guard-membership`    | Ang bawat ruta na nagdudulot ng proseso ng bata ay inuri ayon sa `isLocalOnlyPath()` (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Oo                                       |
| `check:test-discovery`            | Ang bawat `*.test.ts` / `*.spec.ts` file sa repo ay kinokolekta ng hindi bababa sa isang test runner (ratchet: orphan list sa `test-discovery-baseline.json` ay maaari lamang lumiit)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Oo                                       |
| `check:test-tla-order`            | Walang `node:test` file sa ilalim ng `tests/unit` ang nagrerehistro ng pagsubok, tumama sa pinakamataas na antas `await`, pagkatapos ay nagrerehistro ng higit pa (#18045; ratchet: `test-tla-order-allowlist.json` ay maaari lamang lumiit)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Oo                                       |
| `check:agent-skills-sync`         | Ang mga nabuong artifact na may kasanayan sa ahente ay tumutugma sa kanilang source catalog (walang drift)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:provider-asset-provenance` | Ang tagapagbigay ng logos/assets ay nagdadala ng isang naitala na entry ng pinanggalingan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `lint:json`                       | Ang mga file JSON config ay nag-parse at nasiyahan ang mga panuntunan sa repo lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `typecheck:core`                  | TypeScript compilation na walang mga error (advisory warnings only)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Oo                                       |
| `typecheck:noimplicit:core`       | Mahigpit na `noImplicitAny` — na naghahanap sa hinaharap; kailangan pa rin ng mga anotasyon ng maraming dati nang mga call site                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **Advisory** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ay sumasaklaw sa `src/app/(dashboard)/**` (#7033) — `typecheck:core`'s curated 27-file allowlist ay hindi kasama ang anumang dashboard TSX, at `next build` ay hindi kailanman nag-type-check ito alinman (`next.config.mjs` sets `ignoreBuildErrors: true`), kaya orphaned-identifier regressions doon (#6625/#6909) ay hindi nakikita ng CI. Nag-iiba laban sa isang nakapirming per-file/per-TS-code na baseline ng bilang (`config/quality/dashboard-typecheck-baseline.json`, parehong lipas na pattern ng pagpapatupad ng `check:known-symbols`) — lamang ang mga NEW na error na lampas sa baselined na bilang ay nabigo sa gate; ratchet down gamit ang `--update` kapag naayos ang isang dati nang error.                                                                                                                                                                                                                                                                                                                                                                                       | Oo                                       |
| `check:build-typecheck`           | Suriin ang uri ng produksyon ng buong app sa `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), ang 27-file na allowlist ng `typecheck:core` sa ibabaw at hindi sakop ng gate ng dashboard. Mga pagkakaiba laban sa `config/quality/build-typecheck-baseline.json`; nabigo ang isang bago o itinaas na per-(file, code), isang mas mababang bilang ang humihiling sa iyo na mag-ratchet. `--update` ay tumanggi habang ang run ay naglalaman ng bago o nakataas na pares maliban kung `--force-regressions` ay naipasa, at tinatanggihan ang isang bagong pinatahimik na file maliban kung `--force-nocheck` ay naipasa, kaya ang pagpapalawak sa baseline upang maging berde at ang pagbibigay ng permanenteng katahimikan ay dalawang magkahiwalay na sinasadyang pagkilos. Ang isang hubad `--force` ay tinanggihan. Ini-scan din ang saklaw ng build para sa `@ts-nocheck` laban sa `config/quality/ts-nocheck-baseline.json`, dahil ang isang file na gumagamit nito ay nag-uulat ng walang mga diagnostic at kung hindi man ay hindi nakikita ng bawat gate. | Oo                                       |

#### Magkaiba ang sagot ng dalawang typecheck program

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) at `check:build-typecheck` ay nag-compile ng iba't ibang mga programa sa ilalim ng magkakaibang mga opsyon, at ang parehong file ay maaaring malinis sa isa at puno ng mga error sa isa pa.

Itinakda ng `tsconfig.build.json` `"strict": false`, kaya naka-off `noImplicitAny`. Ang core config ay nag-compile ng isang na-curate na 27-file na allowlist na may mas mahigpit na mga opsyon at sumusunod sa import graph ng bawat entry, kaya ang mga file na hindi kailanman lumalabas sa build program ay sinusuri pa rin doon.

Ang kahihinatnan ay mahalaga kapag hinuhusgahan kung ang isang file ay nai-type:**Ang zero diagnostics sa ilalim ng `check:build-typecheck` ay hindi nangangahulugang zero** . Ang pagtanggal ng `@ts-nocheck` mula sa 26 na file ay nagpakita ng 23 sa kanila na malinis sa build program; labing-anim sa mga iyon ang lumitaw ng humigit-kumulang 120 implicit-anumang mga error sa mahigpit na isa. Suriin ang pareho bago tumawag sa isang file na malinis.

### Trabaho: `quality-gate`

Tumatakbo pagkatapos `test-coverage`. Ang mga bloke ay nagsasama sa kabiguan.

| Script                       | Pinapatunayan                                                                                                                                            | Hinaharang               |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | Naglalabas ng `quality-metrics.json` ( Bilang ng babala ESLint, saklaw mula sa pinagsanib na ulat ng shard)                                              | Oo (sa itaas ng ratchet) |
| `quality:ratchet`            | Ang bawat sukatan sa `quality-baseline.json` ay hindi umuurong (ESLint babala ≤ baseline; saklaw ng ≥ baseline)                                          | Oo                       |
| `check:duplication`          | Ang pagdoble ng code (jscpd@4) ay hindi lalampas sa baseline sa `quality-baseline.json`                                                                  | Oo                       |
| `check:complexity`           | Ang cyclomatic complexity sa antas ng file ay hindi lalampas sa cap (core ESLint `complexity` + `max-lines-per-function`)                                | Oo                       |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — hiwalay na ESLint pass; Parehong pinagsama CI bilang iisang hakbang `check:complexity-ratchets` | Oo                       |
| `check:dead-code`            | Ang mga hindi nagamit na pag-export / file ratchet (knip) ay hindi bumabalik laban sa baseline                                                           | Oo                       |
| `check:compression-budget`   | Ang compression benchmark na badyet — per-engine token-savings floors ay hindi dapat bumabalik                                                           | Oo                       |
| `check:type-coverage`        | Ang porsyentong na-type na ratchet (`type-coverage`) ay hindi bumabalik; higit sa lahat ay sumasakop `typecheck:noimplicit:core`                         | Oo                       |

### Mga Trabaho: `codeql-scan` at `codeql-admission`

Ginagawa `codeql-scan` ang lahat ng naka-configure na kategorya ng pagsusuri. Pagkatapos magtagumpay ang trabahong iyon, pinapatunayan ng `codeql-admission` ang eksaktong mga pag-upload nito at ang ratchet ng alerto ng kandidato. Parehong kinakailangang dependency ng `Gate / CI`, kabilang ang mga docs-only na kandidato. Ang administrative activation at mga kinakailangan sa canary ay inilarawan sa ilalim ng "CodeQL ratchet" sa ibaba.

| Script                 | Pinapatunayan                                                                                                                                                                                                                                            | Hinaharang |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:codeql-ratchet` | Ang kandidatong ref/SHA at lahat ng naka-configure na kategorya ng pagsusuri ay dapat na bago bago ang alert ratchet; nawawalang mga bloke ng ebidensya. Ang pandaigdigang imbentaryo ay nananatiling hiwalay na — tingnan ang "CodeQL ratchet" sa ibaba | Oo         |

### Trabaho: `quality-extended`

Hinaharang ng trabaho ang mga naaangkop na kandidato. Ang laki ng bundle, mga lihim na natuklasan, mga natuklasan sa kahinaan, mga natuklasan sa daloy ng trabaho at mga pagbabago OpenAPI ay sinusuri gamit ang mga kinakailangang ratchet. Ang mga diagnostic ng circular-dependency ay nananatiling advisory. Kinakailangan ang pag-install ng scanner: `scripts/ci/install-quality-scanners.sh` ay naglalaan ng mga naka-pin na bersyon at nagpapalaganap ng mga pagkabigo sa pag-install. Ang mga nawawalang tool, invalid na ulat o nawawalang baseline ay umalis sa kinakailangang scanner gate INCOMPLETE.

| Script                   | Pinapatunayan                                                                                                                                                                                                                          | Hinaharang                                                    |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `check:circular-deps`    | Walang circular dependencies (dpdm)                                                                                                                                                                                                    | **Advisory**                                                  |
| `check:bundle-size`      | Ang laki ng bundle ay hindi lalampas sa takip; nabigo ang isang hindi magagamit na pagsukat                                                                                                                                            | **Pag-block gamit ang --ratchet**                             |
| `check:secrets`          | Ang mga natuklasan sa Gitleaks ay hindi umuurong; tinatanggihan ng mga kinakailangang pag-scan ang nawawalang tools/source/baseline, mga nabigong pag-scan at mga di-wastong ulat                                                      | **Pag-block gamit ang --ratchet**                             |
| `check:vuln-ratchet`     | Ang mga kahinaan sa dependency ay hindi bumabalik; tinatanggihan ng mga kinakailangang pag-scan ang mga nawawalang tool, di-wastong ulat, o nawawalang baseline                                                                        | **Pag-block gamit ang --ratchet**                             |
| `check:workflows`        | Workflow lint (actionlint + zizmor); Nabigo ang mga missing/broken scanner, mga invalid na ulat o nawawalang ratchet baseline bilang INCOMPLETE. Ang mga wastong natuklasan ay sumusunod sa napiling patakaran strict/advisory/ratchet | Kinakailangan ang pagpapatupad; zizmor ratchet blocking sa CI |
| `check:openapi-breaking` | Pampublikong kontrata API laban sa mga naka-pin na event na ginawa (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); hindi naisara ang kinakailangang pagsukat                                   | **Pag-block gamit ang --ratchet**                             |

### Trabaho: `docs-sync-strict`

Para sa mga pull request sa `main` o `release/**`, ang trabahong ito ay tumatakbo lamang para sa mga hindi draft (o pinagkakatiwalaang pila) na mga kandidato na inuri bilang dokumentasyon o pagbabago ng code. Tumatakbo din ito sa mga kaganapang hindi PR CI ; Sinasaklaw ng push trigger ng workflow na ito `main` lamang, hindi `release/**`. Ang isang hakbang na lumalabas sa non-zero ay humaharang sa trabaho; ang mga natuklasan lamang na ulat at mga dokumentadong exemption sa ibaba ay hindi.

| Script                         | Pinapatunayan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Hinaharang                                                                                                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `check:docs-all`               | Meta-gate na nagpapatakbo ng 7 sub-gate sa ibaba nang sunud-sunod                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Oo                                                                                                                                                                 |
| ↳ `check:docs-sync`            | Ang pagkakapare-pareho ng bersyon Package/OpenAPI/CHANGELOG, mga eksaktong `llm.txt` na salamin, isinalin na mga invariant CHANGELOG section/size, at kawalan ng pinalitan na mga duplicate na dokumento                                                                                                                                                                                                                                                                                                                                                    | Oo                                                                                                                                                                 |
| ↳ `check:docs-frontmatter`     | Ang mga pinagsama-samang pahina ng dokumentasyon ay naglalaman ng mga wastong pamagat ng frontmatter                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Oo                                                                                                                                                                 |
| ↳ `check:docs-counts`          | Mahigpit ang mga invariant sa bilang ng mataas na kumpiyansa; Ang heuristic file-count checks ay nagbabala lamang maliban kung ang script ay tumatanggap ng `--strict` (ang CI meta-gate ay hindi pumasa dito)                                                                                                                                                                                                                                                                                                                                              | Mahigpit na tier blocking; malambot na tier advisory                                                                                                               |
| ↳ `check:env-doc-sync`         | Sumasang-ayon ang source env reads, `.env.example`, at `docs/reference/ENVIRONMENT.md` pagkatapos ng tahasang pagbalewala, doc-only, at env-only allowlists                                                                                                                                                                                                                                                                                                                                                                                                 | Oo, sa labas ng mga dokumentadong allowlist                                                                                                                        |
| ↳ `check:deprecated-versions`  | Nag-uulat ng mga potensyal na lipas na bersyon sa labas ng ligtas na makasaysayang konteksto at lipas na petsa ng pag-update, hindi kasama ang mga binalewalang doc                                                                                                                                                                                                                                                                                                                                                                                         | Advisory sa kasalukuyang CI wiring (`--strict` ay hindi naipasa)                                                                                                   |
| ↳ `check:doc-links`            | Ang mga panloob na link ng markdown sa mga doc ay nagre-resolve sa mga totoong file (`[text]`/`(path)` form)                                                                                                                                                                                                                                                                                                                                                                                                                                                | Oo                                                                                                                                                                 |
| ↳ `check:fabricated-docs`      | Ang mga ruta, env vars, CLI command, hook name, at file path na binanggit sa mga doc ay umiiral sa codebase. Hard gate sa pamamagitan ng `--strict`; soft-fail na walang bandila.                                                                                                                                                                                                                                                                                                                                                                           | Oo (sa pamamagitan ng `--strict` sa CI)                                                                                                                            |
| `check:cli-i18n`               | Ang mga ginamit na CLI `t()` key ay umiiral sa `en`; Pinapanatili ng `pt-BR` ang bawat top-level na seksyon; `zh-CN` at `zh-TW` ay naglalaman ng bawat susi mula sa `en`                                                                                                                                                                                                                                                                                                                                                                                    | Oo                                                                                                                                                                 |
| `check:openapi-coverage`       | Sinasaklaw ng spec OpenAPI ang hindi bababa sa isang ratcheted floor ng mga totoong ruta                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Oo                                                                                                                                                                 |
| `check:openapi-security-tiers` | Ang mga idineklarang `x-loopback-only`/`x-always-protected` annotation ay dapat na sinusuportahan ng `routeGuard.ts`; parser at forward mismatches block. Ang reverse check para sa nawawalang `x-loopback-only` sa ilalim ng local-only prefix ay nagbabala, at ang pattern-only na mga ruta ay hindi kasama sa reverse pass na iyon.                                                                                                                                                                                                                      | Sinusuri Parser/forward ang pagharang; reverse check advisory                                                                                                      |
| `check:openapi-routes`         | Ang bawat `/api...` path sa `openapi.yaml` ay nagre-resolve ng parameter-insensitively sa isang tunay na ruta pagkatapos ng justified `KNOWN_STALE_SPEC` allowlist; nabigo rin ang mga stale allowlist entries                                                                                                                                                                                                                                                                                                                                              | Oo                                                                                                                                                                 |
| `check:docs-symbols`           | Ang mga panloob `/api/...` URL na mga sanggunian sa mga canonical na non-mirror doc ay nagreresulta sa isang tunay na ruta o pamilya ng ruta; Ang mga sanggunian proxy/upstream/placeholder/file at nabigyang-katwiran na mga entry `KNOWN_STALE_DOC_REFS` ay hindi kasama, at nabigo ang mga lipas na allowlist na entry                                                                                                                                                                                                                                   | Oo                                                                                                                                                                 |
| `i18n translation drift`       | Ang ganap na pagpasok ay nangangailangan ng zero source, missing-target, target-hash, stale-translation at section-cache inconsistencies. Ang karaniwang paghahanda PR ay maaaring magpanatili ng eksaktong minanang ebidensya o isang English-only na nakabinbing pagbabago na may hindi nabagong kumpletong estado at mga target na byte; ang ulat nito ay hiwalay na nagdedeklara ng kahandaang pagsamahin. Nawawalang target na mga hash at hindi kumpletong base evidence block. Ang isang walang legacy na cache ng seksyon ay hindi isang pagkabigo. | Lahat ng limang klase ay humaharang sa queue/base admission; ang mga ordinaryong permit sa paghahanda ay napatunayang minana o English-only na nakabinbing trabaho |

Binubuo ang labindalawang README SVGs sa ilalim ng `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` regenerates lahat ng mga ito). Ang bawat isa ay may byte-compare unit test (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) na nabigo kapag ang naka-commit na file ay lipas na, at `check:docs-counts` ay nagbabasa ng mga canonical na numero mula sa kanilang mga `<text>` node — kaya naman pinapanatili ng outlining na hakbang ang bawat nakabalangkas na string sa file bilang invisible `<text>`. Binabasa ng SVG canonical-numbers check ang mga file na nakalista sa `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` at `tier-flow-light.svg`; ang free-forever, catalog-entry, recurring-pool at scoring-factor claims ay nagbabasa rin ng `promise-pillars.svg`, `free-tier-budget.svg` at `strategies-grid.svg`. Kinukuha ng `free-tier-budget.svg` ang mga numero nito mula sa live na catalog loader, kaya ang pagbabago sa `FREE_MODEL_BUDGETS` o sa isang display name ng provider ay magpapapula CI hanggang sa mabuo muli ang file na iyon.

### Trabaho: `i18n-ui-coverage`

| Script                            | Pinapatunayan                                                                                                                                                                                                        | Hinaharang     |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | Ang pangunahing saklaw ng UI i18n ay ≥ 65%                                                                                                                                                                           | Oo             |
| `check-ui-value-drift` (inline)   | Isang muling isinulat na Ingles **halaga** walang naiwang lipas na pagsasalin                                                                                                                                        | Oo             |
| `check-new-key-coverage` (inline) | A **bago** Ang English key ay isinalin sa bawat lokal na — isang `__MISSING__:` marker ay tinanggihan                                                                                                                | Oo             |
| `check-translation-ratio`         | Ang ratio ng totoong pagsasalin sa bawat lokal (magkapareho-sa-Ingles / placeholder / nawawalang mga dahon sa labas ng allowlist) ay hindi dapat lumampas sa `config/quality/i18n-translation-baseline.json` + slack | **Hinaharang** |

Kailangan ng `fetch-depth: 0` — ang value-drift gate na naiiba `en.json` laban sa merge base.

#### `check-ui-value-drift` — stale-translation gate

Nahuhuli ang isang i18n regression na hindi nakikita ng ibang mga gate sa istruktura: ang isang English na value ay muling isinulat at ang mga pagsasalin na nagmula sa _previous_ English ay nananatili, kaya ang mga hindi English na user ay patuloy na nagbabasa ng may kumpiyansa na mga salita, ngayon-maling kopya.

Ito ay ipinadala para sa tunay. `oauthModal.googleOAuthWarning` ay muling isinulat nang ang Antigravity login helper ay lumapag (#5203);**39 sa 43 na lokal** pinananatiling text na nagsasabi sa mga operator na "kopyahin ang buong URL at i-paste ito sa ibaba" — ang isang daloy na hindi makukumpleto para sa provider na iyon. Hindi ito napansin hanggang sa #8463 dahil:

- Bina-backfill lang `sync-ui-keys` ang mga key na iyon **wala** , hindi kailanman ang mga iyon **lipas na** ;
- Binibilang ng `check-ui-keys-coverage` ang susi _presence_, kaya ang isang lipas na marka ng pagsasalin ay nasasaklaw;
- Sinusubaybayan `check-translation-drift` ang `docs/i18n/<locale>/**.md` documentation mirrors — hindi nito binabasa `src/i18n/messages/*.json`. Pag-block sa `docs-sync-strict` sa trabaho mula noong 2026-09 muling pag-sync: mag-edit ng core doc → `npm run i18n:run -- --files=<doc>` (section-level, mura).

**Diff-aware, hindi baseline-backed.** Inihahambing nito `en.json` sa merge base laban sa working tree; para sa bawat susi na nagbago ang halaga sa Ingles, ang anumang lokal na may hawak pa ring hindi nagalaw na pagsasalin ay lipas na. Ito ay sadyang **nag-freeze ng dati nang utang** Hindi maibubunyag — a diff kung saang lumang Ingles nagmula ang isang matagal nang pagsasalin, kaya hinuhusgahan lamang ng gate kung ano ang naaapektuhan ng kasalukuyang pagbabago. Ang kahalili (isang per-key hash baseline) ay magkakahalaga ng ~ 600 KB na nabuong file, 3 × ang pinakamalaking umiiral na baseline, na umuusad sa bawat i18n PR.

Dalawang paraan upang masiyahan ito:

1. i-update ang mga apektadong pagsasalin, o
2. itakda ang mga ito sa `__MISSING__:<new english>` — ang runtime pagkatapos ay ihahatid ang naitama na English (`src/i18n/request.ts::deepMergeFallback`, #7258) at ang mga pangunahing pila para sa pagsasalin.

Kung ang string ay **ibig sabihin** nagbago, mas gusto **pagpapalit ng pangalan ng susi** : ang isang bagong susi ay hindi maaaring magmana ng lipas na pagsasalin. Iyan ang pattern na ginamit #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Ang value-drift at new-key gate ay nagbabahagi ng isang hindi nababagong paghahambing mula sa `scripts/i18n/resolve-ui-diff-base.mjs`. Ang daloy ng trabaho ay pumasa sa parehong base, base-tip at kandidatong SHAs sa parehong mga pagsusuri. Ginagamit ng PR/base-retarget, push at merge-group run ang kanilang konteksto ng kaganapan. Ang pagpapadala ng kandidatong sangay ay nangangailangan ng eksaktong bukas na PR o ang tahasang `i18n_base_sha` input. Ang pagpapadala o naka-iskedyul na pagmamasid sa `main` o `release/vX.Y.Z` nang walang input na iyon ay inihahambing ang huling commit sa unang magulang nito; hindi ito isang pag-audit ng lahat ng minanang utang sa pagsasalin. Ang lokal na invocation ay nangangailangan ng isang tahasang base ng paghahambing, halimbawa ang `BASE_REF` command sa itaas.

Nawawala o hindi maliwanag na konteksto ng paghahambing, isang hindi nababasa o hindi wastong kinakailangang catalog, at isang binagong kandidato ay gumagawa `INCOMPLETE` na may exit code **2** , kasama sa mode ng babala. Gumagamit ng `scripts/i18n/read-ui-catalog.mjs` ang pagbabasa ng katalogo; Ang mga pagkabigo sa pagbasa ay hindi pinapalitan ng mga walang laman na bagay. Wala alinman sa hindi magagamit na base o hindi kumpletong input ang nagtatatag ng PASS.

### Trabaho: `i18n`

Buong i18n validation matrix (isang trabaho bawat locale). Ang buong trabaho ay pagpapayo.

| Script                          | Pinapatunayan                         | Hinaharang                                                |
| ------------------------------- | ------------------------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | Pagkumpleto ng pagsasalin bawat lokal | **Advisory** (`continue-on-error: true` sa buong trabaho) |

### Trabaho: `pr-test-policy`

Gumagana sa mga pull request lang.

| Script                 | Pinapatunayan                                                                                                                                                         | Hinaharang |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PRs na nagbabago ng code ng produksyon sa `src/`, `open-sse/`, `electron/`, o `bin/` ay dapat magsama o mag-update ng mga pagsubok (Hard Rule #8)                     | Oo         |
| `check:test-masking`   | Ang mga binagong test file ay hindi nakakabawas sa bilang ng net assert o nagdaragdag ng mga tautologie `assert.ok(true)`                                             | Oo         |
| `check:pr-evidence`    | Binanggit ng katawan PR ang katibayan test/VPS para sa pagbabago (ginagawa ang Hard Rule #18 sa pamamagitan ng pagkuha ng PR prose — na marupok, tingnan ang Backlog) | Oo         |

### Trabaho: `test-vitest`

Kailangan ang `changes` classification job. Naaangkop na matrix shards block merge kapag nabigo.

| Suite            | Pinapatunayan                                           | Hinaharang                                                                                                                                      |
| ---------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 tool), autoCombo, cache — vitest runner | Oo                                                                                                                                              |
| `test:vitest:ui` | Ang bahagi ng UI ay sumusubok — vitest runner           | **Hinaharang** Ang mga pre-existing na pagkabigo — ay tahasang hindi kasama sa `vitest.config.ts`; ang mga bagong kabiguan ay nabigo sa trabaho |

### Gabi-gabing daloy ng trabaho (naka-iskedyul, advisory)

Ang mga ito ay tumatakbo sa isang cron schedule (at `workflow_dispatch`), hindi kailanman sa PRs. Lahat ay payo.

| Daloy ng trabaho       | Pinapatunayan                                                                                                                                                   | Hinaharang   |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | mabilis na suriin ang mga pagsubok sa ari-arian na may random na seed + na mataas na bilang ng pagtakbo                                                         | **Advisory** |
| `nightly-resilience`   | heap-growth gate, chaos fault-injection, k6 load/soak                                                                                                           | **Advisory** |
| `nightly-llm-security` | promptfoo injection guard (block mode) + garak probe (nilaktawan nang walang lihim ng provider)                                                                 | **Advisory** |
| `nightly-schemathesis` | OpenAPI contract fuzzing (schemathesis) laban sa isang live na OmniRoute gamit ang `docs/openapi.yaml` — surfaces spec violations / unhandled 500s (Fase 8 B.4) | **Advisory** |
| `nightly-mutation`     | Stryker mutation-testing score sa fast unit lane — surviving mutants surface weak asserts                                                                       | **Advisory** |
| `nightly-compat`       | Node engine compatibility matrix sa mga sinusuportahang hanay `engines.node`                                                                                    | **Advisory** |

Ang mga baseline ng performance (heap, TTFB, build time) ay naitala, hindi naka-gate: tingnan [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Yugto ng velocity (2026-08-30 → v4.0 LTS): niluwagan nang 20% ang bawat baseline

Desisyon ng may-ari (2026-08-30): hanggang sa modularization ng v4.0, mas mahalaga ang bilis ng
pag-release kaysa sa pagpigil sa pagdami ng debt. Ang bawat **numeric** na ratchet baseline ay
niluwagan nang 20% sa isang auditable na pagpapatakbo, at idineklara ang yugto sa
`config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Ano ang nagbago                                                                                                                                                                                                                                              | Saan                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — mga bilang na mas mababa ang mas mainam ×1.2, mga porsiyentong mas mataas ang mas mainam ÷1.2 (pinanatili ang coverage floor na 60, nananatiling 0 ang `eslintErrors`, `eslintWarnings` 0 → 20% ng naka-freeze na bilang ng suppression) | `quality-baseline.json` (inililista ng tala na `_relax_velocity_2026_08_30` ang bawat bago → pagkatapos) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                                             | `complexity-baseline.json`, `duplication-baseline.json`                                                  |
| `cap`, `testCap`, bawat line cap na `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                                                       | `file-size-baseline.json`                                                                                |
| mga bilang kada file / kada TS code ×1.2                                                                                                                                                                                                                     | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`   |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                                          | `scripts/check/check-openapi-coverage.mjs`                                                               |
| nagiging advisory ang `--require-tighten` habang `_policy.requireTighten === false`                                                                                                                                                                          | `scripts/quality/check-quality-ratchet.mjs`                                                              |
| pansamantalang ihihinto ang nightly na `bank-ratchet-shrinks` (iba-bank nito ang nasukat na pagliit at mawawala ang headroom)                                                                                                                                | `.github/workflows/nightly-release-green.yml`                                                            |

Ang mga allowlist (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) ay **hindi** mga budget at hindi binago. Hindi nagbago ang mga pass/fail policy gate (mga secret,
mga panuntunan sa SQL, kontrata ng docs/env, pagkakapantay-pantay ng i18n, mga unit test) — ang
pulang test ay nananatiling pulang test.

**Tooling**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — ang
  minsanang pagluluwag (`scripts/quality/relax-baselines.mjs`); tatanggi itong tumakbo nang
  dalawang beses gamit ang parehong tala.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  sinusukat ang bawat numeric gate sa paraang ginagawa ng CI at ipinapakita ang natitirang
  headroom kada gate (`scripts/quality/baseline-headroom.mjs`). Inilalathala ng nightly na
  `baseline-headroom` job ang talahanayan sa buod ng workflow run at ina-upload ang JSON/Markdown
  report nito bilang `baseline-headroom-<run_id>`, na pinananatili sa loob ng 90 araw. Tinutukoy
  ng mga warning at critical na row ang mga gate na nasa loob ng 10% ng kanilang cap o lumampas
  na rito. Suriin ang mga report na ito bilang maagang babala na nauubos na ang mga budget;
  siyasatin ang mga tala na `_rebaseline_*` ng gate na may problema. Hindi na gumagawa o
  nag-a-update ang job ng permanenteng issue; pinapanatili ng #12149 ang naunang kasaysayan ng report.

**New-code mode (Clean-as-You-Code) — mula 2026-08-30, para lamang sa PR fast-path**

Sa mga event na `pull_request`, ipinapasa ng `quality.yml` ang `--base-ref <PR base SHA>` sa
`check:file-size`, `check:complexity-ratchets` at `check:dead-code`. Para sa
`check:complexity-ratchets` at `check:dead-code`, inihahambing ng gate ang HEAD sa merge-base
na **nililimitahan sa mga file na binago ng PR** (`scripts/check/newCodeMode.mjs`: minamaterialisa
ang merge-base sa isang pansamantalang `git worktree`, pinapatakbo roon at sa HEAD ang ESLint/knip,
at kinukuha ang diff ng mga bilang kada file):

- **blocking** — nagdagdag ang PR ng mga cyclomatic/cognitive violation o dead export sa mga file
  na binago nito (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` sa log);
- **advisory** — ang pandaigdigang kabuuan kumpara sa naka-freeze na baseline. Hindi kailanman
  ginagawang pula ng minanang drift ang isang inosenteng PR; sinusubaybayan ang drift para ayusin
  sa release reconciliation at binabantayan ng headroom job.

Ginagamit ng `check:file-size` ang base ref ayon sa sarili nitong mga tuntunin
(`scripts/check/check-file-size.mjs`, #8522): sinusuri nito ang bawat source at test file sa tree,
binabasa ang line count ng bawat isa sa PR base gamit ang `git show`, at ibinabagsak lamang ang
isang file kapag lumampas ang paglaki nito sa mas mataas sa baseline ceiling nito (`frozen` /
`testFrozen`, o `cap` / `testCap` para sa file na wala sa baseline) at sa base size nito.
Samakatuwid, ang file na nag-drift na sa base ay hindi kailanman nagpapapula sa isang
walang-salang PR.

Ang `check:boundary:ratchet` ay naglalapat ng parehong panuntunan sa nag-iisang numero nito
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): sa mga PR event, kapwa
ipinapasa ng mga fast gate ng `quality.yml` at ng lint job ng `ci.yml` ang base SHA ng PR, sinusukat
ang base commit mula sa isang `git archive` export, at mabibigo lamang ang PR kapag ang bilang ng
mga `open-sse → src` edge nito ay lumampas sa mas mataas sa `metrics.boundaryOpenSseToSrc` at sa
bilang sa base. Iniuulat ang base drift na mas mataas sa ceiling (`base drift herdado`) ngunit hindi
nito kailanman pinababagsak ang isang inosenteng PR; pinananatili ng push → main ang absolute
ceiling, at kapag hindi malutas ang base SHA, babalik dito nang may babala.

Walang PR base ang mga `workflow_dispatch` run, ang release-green sweep, at ang nightly headroom
job, kaya pinananatili ng mga ito ang absolute (global) na paghahambing. Nananatiling global sa
ngayon ang coverage, duplication, at type-coverage (hindi murang makagawa ang mga tool ng mga ito
ng per-file diff) — mga kandidato ang mga ito para sa kaparehong pagtrato.

**Pagsasara ng yugto sa v4.0 (LTS = mas mahigpit kaysa dati, hindi "balik sa normal")**

1. Sa purong tip ng `release/v4.0.0`: patakbuhin ang `npm run quality:headroom --json` para sa
   rekord, pagkatapos ay ang `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, at ang `--update` ng bawat
   typecheck gate — ibababa ang bawat baseline sa nasukat na value.
2. Tanggalin ang `_policy` mula sa `quality-baseline.json` (muling ina-arm ang `--require-tighten`
   at ang nightly banking), at ibalik ang `THRESHOLD = 36` (o mas mataas) sa
   `check-openapi-coverage.mjs`.
3. Higpitan nang lampas sa nasukat kung saan naging kapaki-pakinabang ang modularization: ibalik
   sa 1000 (o 800) ang `cap` ng file-size, dagdagan nang 5 ang mga coverage floor, at gawing 0 ang
   mga dead export para sa mga modularized package.

## Ratchet Baseline (`quality-baseline.json`)

Binabasa ng ratchet engine (`scripts/quality/check-quality-ratchet.mjs`) ang `quality-baseline.json`
at inihahambing ito sa bagong nakolektang `quality-metrics.json`. Anumang metric na lumala
nang lampas sa epsilon nito ay magpapabagsak sa build.

Mga kasalukuyang sinusubaybayang metric:

| Metric                | Direksyon | Kahulugan                                   |
| --------------------- | --------- | ------------------------------------------- |
| `eslintWarnings`      | `down`    | Hindi dapat dumami ang mga babala ng ESLint |
| `coverage.statements` | `up`      | Hindi dapat bumaba ang statement coverage   |
| `coverage.lines`      | `up`      | Hindi dapat bumaba ang line coverage        |
| `coverage.functions`  | `up`      | Hindi dapat bumaba ang function coverage    |
| `coverage.branches`   | `up`      | Hindi dapat bumaba ang branch coverage      |

Upang i-update ang baseline pagkatapos ng tunay na pagpapabuti:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Isinusulat ng `--update` flag ang kasalukuyang mga nasukat na value sa `quality-baseline.json`.
I-commit ang file na ito kasama ng pagbabagong nagpahusay sa metric. Ang isang PR na nagpapahusay
sa isang metric nang hindi ina-update ang baseline ay matutukoy ng `--require-tighten` (Yugto 6A.5,
nakabinbin ang implementasyon).

### CodeQL ratchet: pagpasok ng kandidato at imbentaryo ng repositoryo

CI ay nagmamay-ari ng kandidatong CodeQL admission sa pamamagitan ng isang tahasang dependency chain: Tinatawag ng `codeql-scan` ang four-language matrix sa `codeql.yml`, pagkatapos ay `codeql-admission` ang nagpapatakbo `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` ay nangangailangan ng parehong mga resulta. Ang kalidad ay nagpapanatili ng sarili nitong mga numeric na pagsusuri ngunit hindi nagtatanong sa scanner bago matapos ang producer; `Gate / Quality` lamang ay hindi kumpletong pagpasok ng kandidato. CodeQL ay nananatiling kinakailangan sa mga docs-only na kandidato.

Pinipili ng patakaran sa `config/quality/codeql-admission-policy.json` ang Actions, C/C++, JavaScript/TypeScript at Python, query suite default, remote threat model at build mode none. Tinatanggihan ng producer preflight ang isang nakabinbing tala ng pag-activate at mga sangay sa labas ng tahasang listahan ng target. Ang kasalukuyang mga target ay pangunahing at ang mga pagsubok sa Kontrata release/v3.8.54. ay inihambing ang finite list na ito at ang maintenance push trigger sa bersyon ng package; ang susunod na release ay nangangailangan ng pagsusuri sa onboarding. Ang kasalukuyang mas malawak na release ng PR trigger ng CI ay nananatili, ngunit ang isang hindi naka-onboard na target ay nag-uulat ng HOLD bago ang pagkuha sa halip na makakuha ng hindi nasusukat PASS.

Itinatala ng bawat matrix job ang aktwal nitong SARIF upload ID, wika, kategorya, run at attempt, pagkakakilanlan ng workflow ng tumatawag, event ref/head/base/merge SHA at policy hash. Ang umaasang trabaho ay nagda-download lamang ng mga resibo ng pagpapatakbong ito at nagpapatunay ng mga artifact digest. Nangangailangan ito ng lahat ng apat na kategorya, isang matagumpay na producer at nakumpletong pagproseso ng bawat eksaktong pag-upload. Ginagamit nito ang sarif_id filter ng API, hindi ang pinakabagong pagsusuri na natagpuan sa isang sangay. Maaaring muling gamitin ng mga bahagyang muling pagpapatakbo ang mga matagumpay na kategorya mula sa naunang pagtatangka ng parehong pagtakbo at kandidato, na pinapanatili ang pagtatangka sa paggawa; hindi maaaring gamitin muli ng isang nabigong kasalukuyang producer ang dating berdeng ebidensya.

Ang pagkilos CodeQL ay naghihintay para sa pagpoproseso, ngunit ang naka-pin na pagpapatupad nito ay maaaring magbigay ng babala at magpatuloy pagkatapos ng pagkabigo sa pagbabasa ng status o pagod na paghihintay. Ang pagpasok samakatuwid ay nagpapatunay na muli ang pagproseso. Ang mga nawawalang kategorya, nakabinbing pagpoproseso, nabigo o nakanselang mga trabaho, lipas na pagkakakilanlan, hindi kumpletong pagination o hindi available na APIs ay gumagawa ng HOLD at exit 2. Walang nananatiling nakapirming paghihintay para sa isang independiyenteng daloy ng trabaho ng scanner. Ang isang hindi na-scan na PR ay hindi makapasa dahil ang isang query ng alerto ay nagbalik ng 0. Ang isang nasusukat na bilang sa itaas ng `metrics.codeqlAlerts.value` ay lumabas sa 1; ang baseline ay hindi itinaas upang makuha ang mga alerto ng isa pang sangay. [Mag-upload ng katayuan at paghahanap ng pagsusuri](https://docs.github.com/en/rest/code-scanning/code-scanning).

Ang mga talaan ng resibo ay nag-upload at nagsusuri ng IDs, mga kategorya, mga bersyon ng tool, ref/SHA, baseline at mga alertong numero. Ang bilang ng SARIF identity/result, mga bilang ng minimum na panuntunan at mga eksaktong pagkakataon ng alerto ay nananatiling mandatory. Ang mga pagkakakilanlan PR/analysis ay muling sinusuri bago tanggapin. Ang mga pagsusuring ito ay nagtatatag ng naka-configure na saklaw ng kategorya, hindi isang imbentaryo ng bawat na-extract na source file. C/C++ no-build extraction ay hindi kasama ang code na nabuo sa panahon ng pagbuo ng proyekto. Ang mga pagbubukod ng pinagmulan ay nangangailangan pa rin ng pagsusuri, at ang pagpapatungkol ng tagapag-ambag ay nangangailangan ng maihahambing na eksaktong-base na ebidensya.

Nagbibigay `codeql-maintenance.yml` ng mga aktibong-release na push scan at ang lingguhang iskedyul nang hindi kino-duplicate ang mga producer PR/main. Pinapanatili `nightly-codeql-inventory.yml` na hiwalay ang baseline sa buong imbakan, na may `--strict-measurement` at isang pagkabigo kapag hindi available ang pagsukat. Ang magandang paglaktaw ng lokal na legacy collector ay hindi pagpasok ng kandidato. Ang paghihigpit ay nananatiling isang tahasang `--update` pagkatapos ng na-verify na mas mababang pandaigdigang bilang.

Hindi dapat ma-publish ang Advanced na daloy ng trabaho habang naka-configure ang Default na Setup: Tinatanggihan GitHub ang kumbinasyong iyon. Ang naka-bersyon na patakaran nito ay nananatiling nakabinbin hanggang sa ang nasuri na administratibong transition ay basahin muli. Bago ang publikasyon, ang isang operator ay nagpi-pin ng repository, head/base/tree, policy/patch/rollback hash at naobserbahang estado ng pag-setup; Sinusuri `node scripts/quality/codeql-producer.mjs verify-admin-readback` ang ibinigay na inaasahan at aktwal na mga tala JSON. Isa itong teknikal na bantay, hindi pag-apruba ng operator o kapalit para sa pagkuha ng mga bagong readback. Ang PR token ay hindi kailanman humihiling ng access sa Administrasyon. Ang rollout at anumang pagbabago sa scanner ay nangangailangan ng hiwalay na readback kasama ang totoong PR, fork at merge-group compatibility evidence.

Gumagamit ang mga fork ng mga naka-host na runner, pag-checkout nang walang mga patuloy na kredensyal, walang proyektong install/build sa producer, at walang minanang mga lihim ng repositoryo. Sinusuportahan ng GitHub ang pag-upload ng SARIF para sa kaganapang pull_request kasama ang pinababang fork token nito; Ang pag-apruba sa pagpapatupad ng kontribusyon sa unang pagkakataon ay nananatiling patakaran GitHub. Huwag kailanman gumamit ng pull_request_target upang magsagawa ng hindi pinagkakatiwalaang code. Kumpirmahin ang aktwal na mga pahintulot ng token, analysis_key at lahat ng environment ng kategorya sa kinokontrol na canary bago isaalang-alang na kumpleto ang paglipat. [Mga panuntunan sa pag-upload ng tinidor](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [magkasalungat na mga mode ng pag-setup](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Ang mga dismissal ay tawag ng operator (Hard Rule #14)** — ay hindi kailanman nag-dismiss ng CodeQL alert nang hindi nagre-record ng teknikal na katwiran sa dismissal na komento: `won't fix` para sa upstream-protocol na kinakailangan, `used in tests` para sa isang test fixture, `false positive` para sa isang sanitizer CodeQL ay hindi makita (precedent: `docs/security/ERROR_SANITIZATION.md`).

---

## Patakaran sa Muling Pagsubok (WS5.4, v3.8.49)

Ang muling pagsubok ay para sa bawat runner, at hindi kailanman pangkalahatang patakaran — ang pangkalahatang muling pagsubok ay ginagawang
mga hindi nakikitang flake ang mga tunay na regression:

| Runner           | Patakaran                                                                                                                                                            | Bakit                                                                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` sa CI lamang, na may `trace: on-first-retry`                                                                                                            | Talagang hindi deterministiko ang timing ng browser/network; ginagawang masusuring artifact ng isang muling pagsubok na may trace ang isang flake |
| Vitest           | WALANG pangkalahatang muling pagsubok. Ang isang napatunayang flaky na test ay nakakakuha ng tahasang per-test na muling pagsubok (nakikita sa diff, sinusuri sa PR) | Pinananatiling nasa repo at hindi malabo ang listahan ng quarantine                                                                               |
| node:test (unit) | WALANG muling pagsubok, kailanman                                                                                                                                    | Ang flaky na unit test ay bug sa test — ayusin ito, huwag itong muling ipatakbo nang umaasa sa ibang resulta                                      |

Mga target na SLO kapag nailunsad na ang flake telemetry (WS5.2/5.3): <1% flake rate bawat test
(threshold na "ayusin ngayon"), ≥95% pass rate bawat pipeline. Mga pamantayang halaga mula sa industriya —
muling i-calibrate batay sa sarili nating mga sukat.

## Paglihis ng Ratchet sa Antas ng Release (WS5.5, v3.8.49)

Kapag nag-regress ang isang ratchet (laki ng file, complexity, mga babala ng eslint) sa PURONG release
tip — ibig sabihin, ang KOMBINASYON ng mga merge ang nagdulot ng regression, at walang iisang PR na nakakagawa
muli ng regression sa sarili nitong branch — ang pag-aayos ay responsibilidad ng **release captain, nang isang beses, sa
release branch**: unahin ang extraction/refactor; mag-rebaseline lamang kapag may nakatalang
justification entry. Huwag kailanman ipasa ang combination drift sa PR ng isang contributor, at huwag kailanman
mag-rebaseline sa bawat PR (itinatago nito ang mga tunay na regression). Tukuyin muna: gawin muli ang
red na resulta laban sa purong tip sa isang probe worktree bago ipalagay na ang iyong PR ang sanhi nito.

## Pagba-bank ng mga Pagliit ng Ratchet — ang pababang direksyon (#8584)

Kalahati lamang ang awtomatiko sa ratchet, at iyon pa ang maling kalahati. Ang **pagtataas** ng cap ay isang
manu-manong pag-edit sa JSON na tumatagal ng sampung segundo at siyang pinakamabilis na paraan upang ma-unblock ang isang red na PR.
Ang **pagpapababa** nito ay nangangailangan na may magpatakbo ng `--update` at mag-commit ng resulta — at hanggang
sa nailunsad ang job na `bank-ratchet-shrinks`, walang workflow na nagpapatakbo nito. Ang nasukat na resulta
(2026-07-25): 18 frozen na file ang nasa o mas mababa na sa 800-line na cap para sa bagong file, kung saan ang pinakamalala
ay nasa 132× (`src/shared/validation/schemas.ts`, 19 na linyang may cap na 2,523); ang
complexity ceiling ay umakyat mula `1794 → 2169` sa humigit-kumulang 37 rebaseline note na may eksaktong isang
pagbaba (−1); at ang "higpitan sa pamamagitan ng `--update` sa susunod na cycle" ay isinulat nang 31 beses at sinunod
nang isang beses. Ang cap na nananatili kahit wala na ang code na naging dahilan nito ay tahimik na ginagawang
growth allowance ang bawat natapos na decomposition para sa susunod na mag-e-edit ng file.

Isinasara ng `nightly-release-green.yml` → job na **`bank-ratchet-shrinks`** ang loop na iyon:

|              |                                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------- |
| Tumatakbo sa | `schedule` (3×/araw) + `workflow_dispatch` — sadyang **hindi** sa `push`                                      |
| Sinusukat    | ang pinakamataas na `release/vX.Y.Z`, na may parehong resolution + injection guard gaya ng `release-green`    |
| Isinusulat   | `check:file-size --update` at `check:complexity-ratchets --update` (parehong shrink-only ayon sa pagkakagawa) |
| Bine-verify  | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                      |
| Ipinapadala  | isang palaging kasalukuyang PR laban sa release branch — force-updated, hindi kailanman inuulit bilang spam   |

Ginagawa nang batch ang pagba-bank sa halip na sa bawat push dahil wala itong kinakailangan sa latency (katanggap-tanggap
ang shrink na na-bank sa loob ng 8h), samantalang paulit-ulit na ire-rebuild ng per-merge na pagtakbo ang PR branch
sa panahon ng mga merge campaign at babayaran ang buong ESLint walk sa bawat pagkakataon. Nananatili sa
push (`release-green`) ang detection; ang pagba-bank lamang ang ginagawa nang batch.

### Ang safety verifier

Sumusulat ang job sa mga baseline nang hindi binabantayan, kaya ang `verify-ratchet-bank.mjs` ang dahilan kung bakit
katanggap-tanggap iyon. Dini-diff nito ang tree pagkatapos ng `--update` laban sa `HEAD` at **ina-abort ang job
bago magkaroon ng anumang commit** — nang hindi nagbubukas ng PR — maliban kung ang bawat pagbabago ay isa sa mga sumusunod:

- isang numeric na entry na `frozen` / `testFrozen` na **ibinaba** o **inalis**
- `complexity-baseline.json` → `count` na **ibinaba**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` na **ibinaba**

Nabibigo ang anumang iba pa: pagtataas ng numero, pagdaragdag ng entry, pagbabago sa `cap`/`testCap`, o
pag-delete/pagsulat muli ng `_rebaseline_*` note (ang mga note na iyon ang audit trail kung bakit umiiral ang bawat
ceiling at nakaimbak sa loob ng parehong `frozen` object gaya ng mga entry ng file).
Ang bot na makapagtataas ng cap ay magiging mas masama kaysa sa status quo. Regression
guard: `tests/unit/verify-ratchet-bank.test.ts`.

Hindi kailanman nagpu-push ang job sa `release/*` — isang tao ang nagme-merge ng PR, kaya hindi
maaaring mailunsad nang hindi nasusuri ang maling sukat.

## Patakaran sa Allowlist

Ang bawat gate na hindi maaaring mabigo dahil sa mga dati nang paglabag ay gumagamit ng nakapirming allowlist
(hal., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Ang patakaran ay:

**Ayusin ang pangunahing sanhi; gamitin lamang ang allowlist kapag dati nang umiiral ang paglabag at
hindi ito maaayos sa parehong PR.**

Kapag nagdaragdag ng entry sa isang allowlist:

1. Magsama ng komento na naglalaman ng katwiran.
2. Tukuyin ang tracking issue (hal., `// #3498 — Phase 2 feature, not yet implemented`).
3. Alisin ang entry sa parehong PR na nag-aayos sa paglabag — ang lumang entry na hindi na
   pumipigil sa isang aktibong paglabag ay isa ring depekto (ibabagsak ng 6A.3 stale-enforcement ang
   gate dahil sa isang naulilang entry sa allowlist kapag naipatupad na ito).

**Huwag** magdagdag ng mga entry sa allowlist para lamang mas mabilis na pumasa ang mga test. Ang pumapasang
gate na may lumalaking allowlist ay nagbibigay ng maling pakiramdam ng kalidad.

### Kapag bumagsak ang isang gate sa iyong PR

1. **Basahing mabuti ang output ng gate** — eksaktong ipinapakita nito kung aling file o symbol ang lumabag
   sa panuntunan.
2. **Ayusin ang paglabag** — karamihan sa mga gate ay mga deterministikong pagsusuri sa filesystem na papasa agad
   kapag tama na ang code.
3. **Kung dati nang umiiral ang paglabag** (ibig sabihin, hindi ikaw ang nagpasok nito ngunit sakop na ito ngayon
   ng gate): magdagdag ng entry sa allowlist na may komentong nagbibigay ng katwiran at isang tracking issue.
4. **Kung ratchet ang gate** (coverage, mga babala ng ESLint, duplication, complexity):
   pinalala ng iyong pagbabago ang metric. Ayusin ang pinagbabatayang problema, o (sa bihirang pagkakataon) patakbuhin ang
   `npm run quality:ratchet -- --update` kung sinadya ang pagbabago at katanggap-tanggap ang
   pagbaba ng metric — ngunit idokumento ang dahilan sa paglalarawan ng PR.
5. **Mga advisory gate** (`continue-on-error: true`) ay nagbibigay lamang ng impormasyon — hindi hinaharang ng mga ito
   ang merge ngunit lumalabas ang mga ito sa buod ng CI. Ayusin pa rin ang mga ito.

---

## Pagdaragdag ng Bagong Gate

1. Gumawa ng `scripts/check/check-<name>.mjs` (o `.ts`). Ang mga policy gate ay nag-e-exit nang 0/1.
   Ang mga ratchet-style gate ay naglalabas ng metric sa `quality-metrics.json` sa pamamagitan ng `collect-metrics.mjs`.
2. Idagdag ang `"check:<name>": "node scripts/check/check-<name>.mjs"` sa `package.json`, at
   i-synchronize ang alias at ang eksaktong command nito sa `config/quality/gate-manifest.json`.
   Ilapat ang parehong pag-synchronize kapag binabago o inaalis ang isang umiiral na validation alias.
   Patakbuhin ang `npm run check:gate-manifest`; ipinapatupad ng pre-commit hook at klasipikasyon
   ng pagbabago sa CI ang kontratang ito.
3. Ikonekta ito sa `.github/workflows/ci.yml` sa ilalim ng naaangkop na job
   (policy → `lint` o `docs-sync-strict`; ratchet → `quality-gate`).
4. Kung mayroon itong allowlist, ilapat ang `reportStaleEntries()` mula sa
   `scripts/check/lib/allowlist.mjs` upang awtomatikong matukoy ang mga stale na entry.
5. Sumulat ng test sa `tests/unit/build/` na sumasaklaw sa detection logic ng gate.
6. I-update ang dokumentong ito (magdagdag ng row sa talahanayan ng nauugnay na job).

---

## Tooling ng agent: LSP-in-the-loop (opt-in)

Bukod sa mga CI gate, kasama sa OmniRoute ang isang **opt-in** na `agent-lsp` scaffold
(isang project-level na `.mcp.json`, Fase 7 Task 15). Gumawa ng `.mcp.json`
upang ilantad ang isang TypeScript language server sa mga coding agent, nang sa gayon ay maresolba nila ang mga simbolo /
diagnostic **bago** magsulat ng code — isang compile-before-claim na katuwang ng
`typecheck:core` na pumipigil sa mga error na "invented symbol" sa pinagmulan pa lamang. Sadyang
hindi ito awtomatikong nilo-load (ikaw ang pipili at magbe-verify ng MCP↔LSP bridge); ang sirang entry ay nagla-log lamang ng
connection error at hindi kailanman nakasisira ng mga session.

---

## Backlog ng Rasyonalisasyon (pagsusuri ng ROI — Yugto 9 Bugso 3)

Itinugma ang imbentaryong ito sa `ci.yml` noong 2026-06-17 (hindi naisama sa nakaraang bersyon ang
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Natukoy sa pagsusuri ng ROI sa itinugmang hanay
ang mga sumusunod na kandidatong maaaring rasyonalisahin. **Ang mga pagsasanib ay mekanikal na
pagbabago sa CI; ang mga pagpapalit/pag-aalis ay mga desisyon sa patakaran na nakalaan sa operator.** Wala pa
sa mga nasa ibaba ang inilalapat.

**Hindi rin dokumentado sa itaas** (payo lamang, mahinang signal): ang `docs-lint` job (markdownlint + Vale, buong job na `continue-on-error`) at ang hiwalay na mga scanner workflow na `semgrep.yml` / `scorecard.yml`. Mayroon na ngayong kinakailangang producer at acceptance job ang CodeQL sa ilalim ng `Gate / CI`, alinsunod sa mga kinakailangan sa activation na inilalarawan sa itaas. Nasa `quality-baseline.json` ang `semgrepFindings: 0` ngunit hindi ito nakakabit sa humaharang na ratchet sa `ci.yml` — kasalukuyang walang nagpapatupad na pagsusuri ang metric na ito.

### Pagsamahin / alisin ang duplikasyon (mekanikal, mas mababang panganib)

Pinatunayan ang bawat kandidato laban sa aktuwal na estado ng gate noong 2026-06-17 (magtiwala ngunit magberipika);
lumabas na may itinatagong utang ang ilang "halatang" pagsasanib at **hindi** ang mga ito maaaring direktang ipalit nang walang problema.

- **Dalawang beses tumatakbo ang `check:docs-sync`** — bilang standalone sa `lint` job at muli sa loob ng `check:docs-all` (`docs-sync-strict`) at sa husky pre-commit hook. ✅ **TAPOS NA** — inalis ang standalone na invocation sa `lint`.
- **Pag-scan ng CVE** — ❌ **HINDI malinis na pagsasanib.** Bina-block ng `audit:deps` ang mga kritikal na advisory at hindi kumpletong audit sa lahat ng limang lockfile, habang iniuulat bilang mga babala ang mga high advisory sa ilalim ng kasalukuyang patakaran; pumapalya lamang ang `check:vuln-ratchet` (osv) kapag may _regression_ kumpara sa naka-check-in na baseline at tinatanggihan nito ang mga nawawalang measurement kapag kinakailangan. Magkaiba ang mga semantika — mawawala ang absolute critical gate at ang mga hiwalay na resibo ng package audit kung aalisin ang `audit:deps`. Panatilihin ang dalawa.
- **Pagtukoy ng cycle** — ✅ **TAPOS NA** (#15159 G-01/G-02). Tinawag ng lumang teksto rito ang `check:cycles` na "the green, curated" gate at binigyang-katwiran ang pagpapanatili rito bilang blocking dahil nag-ulat ang `check:circular-deps` (dpdm) ng 91 cycle. Ang green na iyon ay isang **maling green**: 5 subdirectory (450 file) ang ini-scan ng `check:cycles`, tumutugma lamang ito sa static na `import|export … from`, at inaalis nito ang bawat `@/` at `@omniroute/open-sse/` specifier, kaya hindi nito makita ang mga dynamic-import + alias cycle na nangingibabaw sa repo. Naayos na: nilalakaran na ngayon ng gate ang `src` + `open-sse` (5023 file), nangongolekta ito ng mga specifier mula sa TypeScript AST (kaya binibilang ang `import("…")` ngunit hindi ang type-position na `typeof import("…")`), at nire-resolve nito ang tsconfig `paths`. Nakakakita ito ng **14** na cycle, hindi 0. Dahil hindi maaayos ang 14 na dati nang cycle sa isang gate PR, isa na ngayong **ratchet** ang `check:cycles` (`--ratchet`, ceiling na `metrics.cycles.value = 14` sa `quality-baseline.json`, `direction: down`) — bina-block nito ang anumang _regression_ at maaari lamang bumaba ang bilang. Pinapatakbo ng CI ang `npm run check:cycles:ratchet`. Isinasabay ang unti-unting pagbabawas sa **A-01**. Nananatiling advisory ang `check:circular-deps` (dpdm) bilang mas malawak na pangalawang opinyon.
- **Complexity** — ✅ **TAPOS NA** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): isang ESLint walk, nagbibilang ayon sa ruleId upang manatiling hiwalay ang mga cyclomatic+max-lines at cognitive baseline; nananatili ang indibidwal na `check:complexity` / `check:cognitive-complexity` para sa lokal na `--update`.
- **Anti-hallucination ng `/api`** — ✅ **TAPOS NA** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): isang FS inventory ng `src/app/api`, hiwalay pa ring nag-uulat ang openapi-routes + docs-symbols; nananatili ang mga indibidwal na check para sa mga lokal na pagpapatakbo.
- **Tumatakbo ang `check:node-runtime` sa 11 job** — ⚠️ **mababang ROI.** Magkakahiwalay na runner ang bawat isa at <1s ang check; ~10s ang kabuuang matitipid, kapalit ng pagkawala ng murang guard sa bawat job. Hindi sulit ang pagbabago.
- **`typecheck:noimplicit:core` sa CI lint** — ✅ **inalis sa lint job** (dating advisory na may `continue-on-error`); ang blocking type surface ay `typecheck:core` + `check:type-coverage`. Napanatili ang lokal na script.

### Palitan / pagpasiyahan (patakaran ng operator)

- `check:openapi-security-tiers` (advisory) — ❌ **HINDI maaaring malinis na gawing blocking.** Nag-e-exit ito nang 0 ngunit nagbababala na kulang sa annotation na `x-loopback-only: true` ang ilang `traffic-inspector` route sa ilalim ng `LOCAL_ONLY_API_PREFIXES`. Kailangang idagdag muna ang mga annotation na iyon sa `openapi.yaml` bago ito ipatupad.
- `typecheck:noimplicit:core` (advisory) — malawak nang nasasaklaw ng blocking na `check:type-coverage` ratchet. Gawin itong ratchet o alisin ang redundant na pangalawang `tsc` pass.
- `test:vitest:ui` (ngayon ay **blocking**) — tahasang hindi isinasama sa `vitest.config.ts` ang mga dati nang failure gamit ang `// #8618` tracking comments; pinapabagsak ng mga bagong failure ang job.
- `check:secrets` (gitleaks, blocking ratchet) — ang kasalukuyang ceiling ay `metrics.secretFindings` sa `quality-baseline.json`. Kailangan ng bawat exception ng makatwirang entry sa `.gitleaks.toml`; INCOMPLETE ang hindi available na measurement. Kinukumpleto ng scan ang native secret scanning ng GitHub at ang `check:public-creds`.
- `check:pr-evidence` (blocking, nagge-grep ng prose sa PR body) — mataas ang panganib ng false positive; hihina ang pagpapatupad ng Hard Rule #18 kung aalisin ito, kaya tunay itong desisyon sa patakaran.
- `semgrep` (standalone na advisory) — nag-o-overlap sa CodeQL para sa mga OWASP family; ikabit ang baseline nito sa isang ratchet o alisin ito.

---

## Kaugnay na Dokumentasyon

- Supply-chain (provenance, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — gate para sa pagkapantay ng hanay ng key

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, job na `i18n-ui-coverage`).
Inihahambing nito ang hanay ng mga leaf key ng bawat `src/i18n/messages/<locale>.json` sa `en.json` at nabibigo
kapag may nawawala o sobrang leaf, anuman ang petsa kung kailan idinagdag ang key. Ang mga placeholder na
`__MISSING__:` ay itinuturing na naroroon (ang nilalaman ng mga ito ay saklaw ng ratio gate). Ito ang ganap na
kapupunan ng dalawang gate na nakabatay sa diff/porsiyento: nagpapatupad ang `check-ui-keys-coverage` ng 80 % na
minimum sa bawat locale (ang 43 nawawalang key mula sa ~13,000 ay 99.7 % pa rin) at sinusuri lamang ng
`check-new-key-coverage` ang mga key na idinaragdag ng isang PR sa `en.json`. Binubuo ang isang locale batch mula
sa `en.json` noong araw na ginawa ang branch nito at nagsasalin ito nang ilang araw habang patuloy na nagdaragdag
ng mga key ang base; walang idinaragdag na key ang mismong batch PR, kaya parehong hindi nag-ulat ang dalawang
kaugnay na gate nang na-merge ang batch 1 (#13044) na kulang ng 43 key sa siyam na locale at ang batch 2 (#13660)
na kulang ng 10 key sa walo (2026-09-15). Ayusin ang pulang status gamit ang
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; ang isang `extra` na leaf ay
nangangahulugang inalis ito sa source — tanggalin ito sa locale. Nag-uulat ang `--warn` nang hindi nagdudulot ng
pagkabigo. Pinapatakbo ng `--catalog=cli` ang parehong paghahambing sa `bin/cli/locales`
(`npm run i18n:check-keys:cli`); nasa job na `i18n-ui-coverage` ang dalawang hakbang.

#### `check-new-key-coverage` — i18n gate para sa bagong key

Kaugnay na gate ng `check-ui-value-drift`. Nahuhuli ng nauna ang isang English value na **muling isinulat**
habang hindi binago ang mga salin nito; nahuhuli naman nito ang isang English key na **idinagdag**
habang hindi ito kailanman natanggap ng ilang locale.

Hindi matukoy ng `check-ui-keys-coverage` ang ganitong uri ng problema: nagpapatupad ito ng minimum na porsiyento
sa bawat locale, at pinananatili ng labing-isang nawawalang key mula sa ~13,000 leaf ang coverage sa 99.9%.
Hindi maipapahayag ng porsiyento bawat wika na "inilabas ang feature na ito nang hindi naisalin" — maaaring
mailabas ang isang buong feature sa bagong locale nang walang anumang teksto at hindi kailanman mabago ang numero.

Ang insidenteng kinakatawan nito: isinalin ng Phase 3 ng Orchestration Canvas ang labing-isang key nito sa
42 locale na umiiral noon. Makalipas ang ilang oras, tinaasan ng EU-language batch (#13044) ang bilang ng mga
locale sa repo sa 51, at hindi kailanman natanggap ng siyam na bagong locale (`el`, `et`, `ga`, `hr`, `lt`, `lv`,
`mt`, `sl`, `sr`) ang mga iyon. Pinapalitan ng `deepMergeFallback` ng English ang nawawalang key, kaya hindi
naisaling UI ang naging anyo ng pagkabigo sa halip na blangkong UI — tunay, at likas na tahimik.

Tulad ng kaugnay nitong gate, ito ay **diff-aware**, na naghahambing sa English sa merge base laban sa working
tree, kaya nananatiling hindi nagbabago ang mga dati nang puwang at hindi nangailangan ng migration ang gate
upang paganahin.

**Hindi ito natutugunan ng marker na `__MISSING__:<english>` (mula noong 2026-09-17).** Dati, ito ang
nakadokumentong paraan ng pagpapaliban — bumabalik ang runtime sa tamang English — hanggang sa magdagdag ang
walong feature PR noong 2026-09-16 ng 61 key at ilagay ang marker sa lahat ng 65 locale sa halip na magsalin:
tinanggap ng gate na ito ang bawat isa, walang humarang sa mga PR, at pagkatapos ay nabigo ang nakaharang na
ratio gate para sa tunay na salin sa release tip para sa lahat (pt-BR 3.2 % > 2.5 % + 0.5). Itinuturing na ngayon
ang marker bilang nawawalang salin. Ayusin ang pulang status gamit ang
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, o ang lahat ng locale
nang sabay-sabay gamit ang `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
ligtas kapag detached, at tumatangging magsimula nang wala ang `OMNIROUTE_TRANSLATION_*` env). Ang isang key na
dapat manatiling English (isang naka-pin na pangalan ng produkto/engine/flag) ay dapat ilagay sa
`scripts/i18n/untranslatable-keys.json`, at hindi kailanman itago sa likod ng marker. Ganap na ipinagbabawal ng
`vi` ang mga marker (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — gate para sa mga nakaparadang test

Ang isang file sa listahan ng `exclude` ng `vitest.config.ts` ay isang test na hindi tumatakbo, at nagmumukha
itong coverage sa sinumang sumusuri sa tree. Umabot sa animnapu't dalawang file ang naipon sa likod ng komentong
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Isinara ang issue #8618 noong
2026-08-11 habang lumaki mula 45 entry tungong 62 ang listahang sinusubaybayan nito, at minana ng bawat bagong
entry ang komentong tumutukoy sa isang saradong issue. Nang sa wakas ay sinukat ang listahan nang paisa-isang
file (#13204), **51 sa 62 ang pumasa sa kasalukuyang tree nang walang pagbabago sa source**.

Inaatasan ng gate ang bawat exclusion na tumutukoy sa isang tunay na file na (a) magbanggit ng tracking issue at
(b) lumitaw sa `config/quality/vitest-exclusions.json` kasama ang nasukat nitong status, upang ang pagdaragdag ng
isa ay maging isang nare-review na diff sa nakalaang file sa halip na isa pang linya sa isang array na may 60
entry. Sadyang hindi nito muling pinapatakbo ang mga ibinukod na test — umaabot iyon nang ~10 minuto at nararapat
sa isang pana-panahong job; itinatala ng inventory kung kailan huling sinukat ang bawat isa.
