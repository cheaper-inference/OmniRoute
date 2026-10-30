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

## Imbentaryo ng gate at mga profile ng pagpapatupad

### Pagtanggap ng kandidato

Ang mga workflow ng CI at Quality Gates ay parehong naglalabas ng matatag na hatol: `Gate / CI` at
`Gate / Quality`. Itinatala ng kanilang may-bersyong patakaran sa pagtanggap ang bawat upstream na job
bilang kinakailangan o advisory. Dapat magtagumpay ang isang naaangkop na kinakailangang job: ang mga
resultang nawawala, kinansela, nilaktawan, nakabinbin, at hindi alam ay hindi makapagtatatag ng PASS. Maaaring
gawing hindi naaangkop ng isang wastong klasipikasyong docs-only o catalog-only ang isang code lane;
ang draft na PR ay hindi tinatanggap na kandidato. Hindi inaalis ng label na `hotfix` ang pangangailangan sa ebidensya.

Saklaw ng parehong workflow ang mga PR papunta sa mga branch na main/release, mga push sa `main`, manual dispatch,
at mga merge-group event. Pinapatakbo ng push, dispatch, at merge-group ang buong seleksyon. Hindi sinisimulan ng
mga push sa `release/**` ang mga ito (2026-10-18): naisagawa na ng bawat pagbabago ang matrix sa PR nito
at ang pinagsamang resulta pagkatapos ng merge ay trabaho ng Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane). Gumagamit
ang mga fork at merge group ng mga hosted runner para sa mga job na kung hindi ay pipili ng mga self-hosted
runner; dapat beripikahin ang sapat na hosted capacity bago ang rollout.

Tinutukoy ng bawat JSON receipt ang na-checkout na SHA, workflow run, at attempt.
Tinatanggihan ng CLI ang hindi pagtutugma ng checkout/event SHA. Inuugnay ng mga workflow test ang pagiging miyembro sa patakaran
sa listahan ng `needs` ng verdict job upang hindi tahimik na mawala ang bago o inalis na lane.
Saklaw ng mga resibo ang sarili nilang workflow, hindi ang paglalathala, deployment, o ang mga internal
ng isang umiiral na advisory scanner. Ang pagtatakda sa mga naaangkop na pagsusuri bilang required sa mga branch rule
ay isang hiwalay na administratibong pagbabago; ang pagtukoy sa kanilang mga job ay hindi mismo nagpoprotekta sa isang branch.

Ang `API Route Typecheck` ay isang independiyenteng pagsusuri ng workflow, sa labas ng parehong pinagsama-samang verdict
at ng static profile ng lokal na full observer. Siyasatin nang hiwalay ang resulta nito para sa eksaktong
candidate. Tumatakbo ang `.github/workflows/api-route-typecheck.yml` sa mga PR papunta sa `main` o
`release/**`, sa mga push sa alinmang pamilya ng branch, at sa manual dispatch. Wala itong path filter.
Humihiling ang mga retarget ng PR base ng bagong pagsusuri; ginagamit ng mga pag-edit sa body/title ang pangalan na para lamang sa obserbasyon na
`Admission not requested / API Route Typecheck` at hindi maaaring pumalit sa admission check.
Hindi nagdedeklara ang workflow ng merge-group trigger. Dapat munang tiyakin ng anumang rollout ng merge queue na nangangailangan
ng pagsusuring ito ang pagpapatakbo nito para sa event na iyon.

### Kapasidad sa pagpapatupad ng UI

Pinapatakbo ng CI ang buong imbentaryo ng UI bilang apat na `test-vitest` matrix shard, bawat isa ay may hindi hihigit sa
dalawang worker at ang umiiral na 15-minutong deadline ng job. Pinapatakbo rin ng unang shard ang
MCP/autoCombo Vitest suite. Sinasaklaw ng kinakailangang resulta ng job ang bawat matrix leg; ang pagkabigo
o pagkansela ng isang shard ay hindi makapagtatatag ng pagtanggap sa kandidato.

Nagpapanatili ang gabi-gabing observer ng hiwalay na exact-candidate receipt para sa bawat UI shard,
kabilang ang pagpapatupad ng MCP sa unang receipt. Kinakailangan ang lahat ng apat na receipt, log, at katugmang
pagkakakilanlan ng pagpapatupad. Pinipili pa rin ng lokal na `npm run test:vitest:ui` ang
kumpletong suite; bahagyang ebidensya lamang ang isang `--shard` run.

### Pangongolekta ng unit coverage

Kinokolekta ng labindalawang unit shard ang V8 coverage habang isinasagawa ang kanilang mga umiiral na test. Ang matagumpay na
shard ay nagpapatakbo ng `scripts/ci/compact-v8-coverage.mjs` upang i-compress ang mga orihinal na file nang hindi bumubuo
ng pansamantalang Istanbul report. Bineberipika ng panghuling Coverage job ang lahat ng labindalawang manifest laban
sa candidate SHA, runtime, source root, at mga data hash, pagkatapos ay pinapatakbo ang mga reporter ng c8 at ang mga umiiral na
coverage threshold. Pinananatili ng mga input ang global na pagkakasunod-sunod ng filename ng c8; hindi ligtas ang paunang pag-merge
sa bawat shard para sa magkahalong function/block coverage. Ang mga nawawala, malformed, o hindi tugmang shard ay nagpapabigo sa pagtanggap.
Hiwalay na pinananatili ng mga nabigong test shard ang raw diagnostic coverage; hindi ito maaaring isama sa panghuling merge.

### Mga tala ng progreso ng pagpapatupad ng unit

Itinatala ng nakabahaging command na `test:unit:ci:shard` ang mga yugto ng `primary`, `dashboard`, at `serial`
sa pamamagitan ng `scripts/ci/unit-progress-reporter.mjs`. Nananatiling available ang karaniwang ulat ng pagsubok.
Itinatala ng hiwalay at metadata-only na tala ang pagsisimula at pagkumpleto ng bawat file,
at inililista ng 30-segundong heartbeat ang mga file na aktibo pa rin at ang lumipas na oras ng mga ito. Tanging
ang allowlisted na metadata ng pagpapatupad ang itinatala nito; hindi sine-serialize ang mga paglalarawan ng pagsubok,
output, nilalaman ng error, at ang buong environment.

Pinapanatili ng CI at Quality ang mga JSONL file bilang `unit-progress-ci-<run>-<attempt>-<shard>` at
`unit-progress-quality-<run>-<attempt>-<shard>`. Maaaring pigilan ng timeout ng job ang kasunod na pag-upload;
nananatiling ebidensiyang diagnostic ang mga heartbeat na naipadala na. Maaari ding mangahulugan ang mga nawawalang heartbeat
na na-block o itinigil ang proseso ng runner. Pinapanatili ng mga talang ito ang kasalukuyang pagpili ng pagsubok,
concurrency, mga deadline, at exit status; hindi ito mga pasya sa pagtanggap ng kandidato.

### Napanatiling ebidensiya sa tagapagbuod ng mga resulta ng pagtanggap

Pinagsasama ng `scripts/quality/validate-release-acceptance.mjs` ang ibinigay na plano at mga manifest nito; hindi nito pinatutunayang saklaw ng plano ang buong release pipeline. Tahasang itinatakda ng mga ulat nito ang `releaseAcceptance: false`, kahit `VERIFIED` ang plano. Gumagamit pa rin ang workflow na `release-acceptance.yml` ng mga shadow test fixture, hindi ng totoong mga resibo ng build, package, boot o promotion.

Kailangan ng CLI ang `--evidence-root` upang maberipika ang napanatiling ebidensiya. Hinahanap ang mga file sa `<evidence-root>/<artifact_id>/<member>` at kinukuwenta ang kanilang SHA-256 hash. Pinipigilan ang beripikasyon ng PASS record na walang ebidensiya, nawawala o nagbago na file, hindi ligtas na path o symlink. Ang mga nawawalang file ay hindi katumbas ng mga walang-lamang log mula sa matagumpay na pagtakbo. Nananatiling magkahiwalay ang mga kasalukuyang SHA/run/attempt check: hindi nagiging balido ang lumang resibo dahil lamang magkatugma ang mga byte. Ang integridad ng file ay hindi patunay ng pagiging tunay ng pagpapatakbo o ng promotion ng artifact.

### Imbentaryo ng static scan

Makikita sa `config/quality/gate-manifest.json` ang may-bersyong imbentaryo ng npm-alias at pagiging miyembro sa static scan.
Patakbuhin ang `npm run check:gate-manifest` upang patunayan ang
mga pangalan ng script at eksaktong command laban sa `package.json`; ang mga pagdaragdag, pag-aalis, at
paglihis ng command ay nagpapabigo sa lokal na hook at sa mga job ng pag-uuri ng pagbabago sa CI.
Ang alias ay hindi workflow job, matrix instance, o test case: hindi dapat
ipakita ang mga bilang na ito na para bang maaaring pagpalitin ang mga ito.

Gamitin ang `npm run quality:scan -- --list` o `npm run quality:scan:fast -- --list`
upang suriin ang mga napiling alias nang hindi isinasagawa ang mga ito. Tinatawag ng runner ang
npm entrypoint, kaya napapanatili ang runtime nito (kabilang ang Bun kung saan naka-configure).
Itinatala ng manifest ang mga alias sa labas ng mga profile na iyon bilang hiwalay na tinatawag, at
ipinagbabawal ang mga maintenance command sa mga read-only na scan profile.

Static scan lamang ang saklaw ng mga profile na ito. Hindi nila sine-certify ang mga product test,
coverage, packaging, external check, o buong pagtanggap ng isang kandidato para sa release.
Ginagamit ng workflow admission ang naka-link na `config/quality/admission-policy.json` at
`scripts/quality/admission-verdict.mjs`. Nananatiling hiwalay ang mga profile ng release-observer;
suriin nang magkahiwalay ang kanilang mga naaangkop na check at receipt. Idinedeklara sa
`config/quality/release-green-static-profile.json` ang mga static command ng buong observer, kabilang ang
`audit:deps`, seleksyon ng mutation-test, at mga translation check. Bineberipika ng loader ang mga npm
command laban sa package.json at mga nakamodelong deklarasyon ng CI/Quality; tinatanggihan nito ang paglihis
sa halip na isagawa ang mga shell token bilang mga argument. Hindi makapagtatatag ng PASS ang kinakailangang
SKIP/INCOMPLETE na output ng scanner. Itinatala ng profile ang mga external exclusion nito at hindi nito pinapalitan
ang hosted coverage, mga test matrix, package, o ebidensya ng deployment. Sanggunian lamang ang imbentaryo sa prosa sa ibaba,
hindi patunay na talagang naisagawa ang isang gate.

Makikita ang mga script sa ilalim ng `scripts/check/` (mga policy gate) at `scripts/quality/` (ratchet engine).
Ang source of truth ng CI ay `.github/workflows/ci.yml`.

### Kalagayan ng dokumentasyon ng na-publish na base

Sinusubaybayan ng `.github/workflows/i18n-base-health.yml` ang kalagayan ng dokumentasyon pagkatapos ng mga piling
push sa `main` at `release/v*`, at sa manu-manong dispatch. Saklaw ng mga filter nito ang dokumentasyon,
root Markdown, `llm.txt`, estado/configuration ng pagsasalin, at ang nauugnay na i18n tooling.
Gumagamit ang nag-iisang `Published base documentation health` job ng hosted Ubuntu at limang minutong
palugit. Nagsasagawa ito ng read-only na pagpapatunay at nagsusulat ng diagnostic receipt nang walang
pag-install ng dependency, pagsasalin, o paggamit ng estado.

Inaatasan ng `scripts/i18n/check-base-health.mjs` na walang source-hash, missing-target, target-hash,
stale-translation, at section-cache na hindi pagkakatugma. Pinapatunayan din nito ang kasalukuyang saklaw ng pangunahing
dokumento/locale at ang nakatalang provenance nito. Ang di-wastong konteksto, di-kumpletong coverage,
o isang naantalang checker ay nagbubunga ng `INCOMPLETE`; ang nakumpirmang drift ay nagbubunga ng `FAIL`. Kapwa
nagbabalik ang mga ito ng failing exit status. Ang receipt ay nakatali sa checkout SHA, workflow, run, at
attempt, at pinananatili bilang `i18n-base-health-<sha>-<run>-<attempt>`.

Isa itong independiyenteng obserbasyon sa na-publish na base. Hindi ito nagdaragdag ng PR o
merge-group event, kinakailangang PR check, npm alias, o miyembro ng static-scan profile.
Nananatiling magkahiwalay ang umiiral na differential PR policy at ang advisory classifications
ng pinagbabatayang checker. Hindi maaaring gawing PASS ng matagumpay na upload ang isang nabigong resulta ng pagsusuri sa kalagayan.

### Mabilis na landas ng Release PR (`quality.yml`)

Kinukumpleto ng `.github/workflows/quality.yml` ang CI sa mga main/release PR, mga push sa `main`,
dispatch, at merge group. Gumagamit ang mga PR ng mga path-filtered na mabilis na check. Inalis ang permanenteng
naka-disable na duplicate build; nananatili sa CI ang mga tunay na check para sa build/package/boot.

| Trabaho                                          | Saklaw                                                                                                                                                                                                                                                       | Humaharang                |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `Docs Gates (fast-path)`                         | Mga PR ng docs/code; mga reference ng API docs at docs-all                                                                                                                                                                                                   | Oo                        |
| `Fast Quality Gates`                             | Mga PR ng code; mga static check, typecheck, dashboard typecheck, at mga apektadong unit test                                                                                                                                                                | Oo                        |
| `Forgotten sibling tests`                        | Mga PR ng code; sinusubaybayan ang mga binagong module hanggang sa mga static consumer at mga posibleng sibling test; iniuulat bilang mga advisory diagnostic ang mga barrel at dynamic-import path, kasama ang mga naka-reference na exception sa allowlist | **Advisory**              |
| `Vitest (fast-path)`                             | Mga PR ng code; mabilis na vitest suite                                                                                                                                                                                                                      | Oo                        |
| `Unit Tests fast-path`                           | Mga PR ng code; 4-shard na unit suite                                                                                                                                                                                                                        | Oo                        |
| `No new ESLint warnings`                         | Mga PR ng code; suppression-aware na lint guard                                                                                                                                                                                                              | Oo, kabilang ang mga fork |
| `Merge integrity (changelog + generated skills)` | Mga hindi draft na PR; pag-sync ng changelog at mga nabuong skill                                                                                                                                                                                            | Oo, kabilang ang mga fork |

#### Ulat sa mga nakaligtaang sibling test

Muling ginagamit ng `npm run check:forgotten-sibling-tests` ang import resolver sa likod ng test-impact map.
Para sa bawat binagong production module, nag-uulat ito ng mga deterministic na
`changed module/symbol -> static consumer -> candidate sibling test` chain kapag wala sa diff ng pull request
ang posibleng test. Pinananatili ang buod na Markdown at resultang JSON bilang
workflow artifact na `forgotten-sibling-tests` para sa calibration bago ang anumang blocking rollout.

Mga resolution diagnostic lamang ang mga barrel re-export at dynamic import; hindi kailanman lumilikha ang mga ito ng
blocking finding. Matatagpuan ang mga nasuring exception sa
`config/quality/forgotten-sibling-allowlist.json`. Dapat tukuyin ng bawat entry ang consumer at posibleng
test, magbigay ng partikular na katwiran, at mag-link sa isang GitHub issue o pull request. Ang mga malformed na entry ay
fail closed. Hindi maaaring i-suppress ng mga exception ang isang tinanggal na posibleng test o isang diff na nagdaragdag ng `.skip`/`.todo`;
ang pagpapahina ng assertion at iba pang masking ay nananatiling saklaw ng hiwalay at blocking na
`check:test-masking` gate.

### Trabaho: `lint`

Tumatakbo sa bawat PR patungo sa `main`. Hinaharang ang merge kapag nabigo.

| Script (`npm run ...`)            | Bineberipika                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Nakakaharang                             |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`              | Ang bersyon ng Node.js ay nasa loob ng sinusuportahang saklaw                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Oo                                       |
| `check:test-tla-order`            | Walang `node:test` file sa ilalim ng `tests/unit` na nagrerehistro ng test, nakakarating sa isang top-level na `await`, at pagkatapos ay nagrerehistro pa ng iba (#18045; ratchet: maaari lamang lumiit ang `test-tla-order-allowlist.json`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Oo                                       |
| `check:cycles`                    | Mga circular import sa buong `src/` + `open-sse/` (nakabatay sa AST, ni-resolve ang `paths` ng tsconfig). Lalabas ang bare na may 1 tuwing may anumang cycle (fail-closed mula noong #15281) at inililista ang mga SCC. Humaharang ang `check:cycles:ratchet` (ang pinapatakbo ng CI) kapag lumampas ang bilang sa ceiling na `metrics.cycles` sa `quality-baseline.json` — kasalukuyang 14, `direction: down`, kaya maaari lamang itong bumaba (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Oo (ratchet)                             |
| `check:boundary`                  | Coupling na `open-sse → src`: mga natatanging file-to-file import mula sa engine papunta sa app (`scripts/quality/measure-boundary.mjs`; ang edge list ang backlog ng remediation para sa v4 core/module split). Bare = advisory na ulat (katulad ng `quality:boundary`). Humaharang ang `check:boundary:ratchet` (ang pinapatakbo ng CI, kasama rin sa ratchet loop ng mga fast gate ng `quality.yml`) kapag lumampas ang bilang sa ceiling na `metrics.boundaryOpenSseToSrc` sa `quality-baseline.json` — sinimulan sa nasukat na 771, `direction: down`; pinabababa lamang ito ng `--update`; base-relative sa mga PR (`--base-ref`, tingnan sa ibaba)                                                                                                                                                                                                                                                                                               | Oo (ratchet)                             |
| `check:route-validation:t06`      | May mga Zod schema sa lahat ng route (patakaran ng Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oo                                       |
| `check:any-budget:t11`            | Hindi lumalampas sa badyet ang bilang ng `@ts-expect-error // any` (catraca ng Tier 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Oo                                       |
| `check:provider-consistency`      | Ang bawat provider sa `providers.ts` ay may katugmang entry sa `providerRegistry.ts` (at kabaliktaran, sa loob ng allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Oo                                       |
| `check:model-lifecycle`           | Nananatiling magkakatugma ang tatlong routing table na mano-manong pinapanatili at ang naka-check-in na lifecycle snapshot (#11503): walang retired id na maaaring i-route ng `REGISTRY` ang binibigyan ng score ng `FITNESS_TABLE` (`taskFitness.ts`); nasa `REGISTRY` at wala sa retired-id snapshot ang bawat target ng `BUILT_IN_ALIASES`; ipinapasa o nakalista sa `allowedRetiredInCatalog` ang bawat retired id na nasa `REGISTRY` pa rin; at walang source o target ng `DEFAULT_DEGRADATION_MAP` na lumalabas bilang retired sa snapshot na iyon. Hindi nito pinatutunayan na kasalukuyang inihahatid ng isang live upstream ang isang modelo. Offline — inihahambing sa `config/quality/model-lifecycle.json`, na mano-manong nire-refresh gamit ang `npm run quality:refresh-model-lifecycle` (network; hindi naka-wire sa CI). Ang `allowedRetiredInCatalog` ay isang burn-down ratchet: magdagdag lamang ng entry kapag may tracking issue. | Oo                                       |
| `check:fetch-targets`             | Ang bawat `fetch("/api/...")` sa client-side na `src/` ay tumutukoy sa isang tunay na `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Oo                                       |
| `check:deps`                      | Ang lahat ng dependency na maaaring i-`npm install` sa bawat `package.json` sa repo ay nasa `dependency-allowlist.json`; mina-flag ang mga bagong package na hindi naka-pin o na-slopsquat                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oo                                       |
| `audit:deps`                      | npm audit ng lahat ng limang magkakahiwalay na lockfile (root, Electron, OpenCode plugins v1/v2 at provider). Hinaharang ng mga kritikal na advisory; nananatiling nakikitang mga babala ang matataas na advisory. Ang mga nawawala/nabigong audit ay INCOMPLETE at humaharang; pinananatili ang mga lock hash at ulat para sa bawat saklaw.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Oo                                       |
| `check:lockfile`                  | Integridad ng `package-lock.json` — https registry, mga integrity hash, walang mga host override                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Oo                                       |
| `check:licenses`                  | Allowlist ng lisensyang SPDX para sa mga production dependency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Oo                                       |
| `check:tracked-artifacts`         | Walang mga build artifact / naka-commit na `node_modules` symlink (tumatakbo rin sa husky pre-commit; sinadyang magaan ang pre-push — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Oo                                       |
| `check:ai-attribution`            | Walang AI/bot na `Co-Authored-By` trailer o footer ng pagbuo ng AI sa mga commit, pamagat, o body ng PR — Mahigpit na Panuntunan #16 (sa fast-gates loop ng `quality.yml` para sa PR→`release/**` — binabasa ang event payload, walang ginagawa kapag hindi PR — at isang hakbang na para lamang sa PR sa lint ng `ci.yml` para sa PR→`main`; pati na rin ang husky `commit-msg` hook; pinapayagan ang mga taong co-author; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:vitest-exclusions`         | Ang bawat Vitest exclusion ay tumutukoy ng tracking issue at lumalabas sa `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oo                                       |
| `check:file-size`                 | Ang mga source file (`.ts`/`.tsx` sa `src/`, `open-sse/`, `electron/`, `bin/`) ay nananatili sa loob ng `cap` at ang mga test file (`*.test.ts(x)`) ay nasa loob ng `testCap`; ang mga file na naka-freeze sa `file-size-baseline.json` (`frozen` / `testFrozen`) ay hindi dapat lumampas sa naitalang laki ng mga ito                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Oo                                       |
| `check:error-helper`              | Ginagamit ng mga error response sa mga executor/handler ang `buildErrorBody()` / `sanitizeErrorMessage()` (Mahigpit na Panuntunan #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Oo                                       |
| `check:migration-numbering`       | Ang mga migration SQL file ay sunod-sunod ang pagkakanumero, nang walang puwang o duplikado                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Oo                                       |
| `check:public-creds`              | Walang literal na OAuth `client_id`/`client_secret` o mga Firebase Web key sa labas ng `publicCreds.ts` (Mahigpit na Panuntunan #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Oo                                       |
| `check:db-rules`                  | Walang raw SQL sa labas ng mga module ng `src/lib/db/`; walang mga barrel import mula sa `localDb.ts` (Mahihigpit na Panuntunan #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Oo                                       |
| `check:known-symbols`             | Ang mga provider executor, routing strategy, at translator na nakarehistro sa kani-kanilang dispatch table ay tumutugma sa mga file sa disk—walang mga naulila o hindi idineklarang symbol                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oo                                       |
| `check:route-guard-membership`    | Ang bawat route na naglulunsad ng child process ay inuuri ng `isLocalOnlyPath()` (Mahihigpit na Panuntunan #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Oo                                       |
| `check:test-discovery`            | Ang bawat `*.test.ts` / `*.spec.ts` file sa repo ay kinokolekta ng kahit isang test runner (ratchet: maaari lamang lumiit ang listahan ng mga orphan sa `test-discovery-baseline.json`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Oo                                       |
| `check:agent-skills-sync`         | Tumutugma ang mga nabuong artifact ng agent-skills sa kanilang source catalog (walang paglihis)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:provider-asset-provenance` | Ang mga logo/asset ng provider ay may nakatalang provenance entry                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `lint:json`                       | Nape-parse ang mga JSON config file at sumusunod ang mga ito sa mga panuntunan sa lint ng repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `typecheck:core`                  | Pag-compile ng TypeScript nang walang mga error (mga advisory warning lamang)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Oo                                       |
| `typecheck:noimplicit:core`       | Mahigpit na `noImplicitAny` — nakatuon sa hinaharap; marami sa mga dati nang call site ang nangangailangan pa rin ng mga annotation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **Advisory** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` na nakatuon sa `src/app/(dashboard)/**` (#7033) — hindi kasama sa piniling 27-file allowlist ng `typecheck:core` ang anumang dashboard TSX, at hindi rin ito tine-type-check ng `next build` (`next.config.mjs` ay nagtatakda ng `ignoreBuildErrors: true`), kaya hindi nakikita ng CI ang mga regression ng naulilang identifier doon (#6625/#6909). Inihahambing ang mga diff sa isang nakapirming baseline ng bilang kada file/kada TS code (`config/quality/dashboard-typecheck-baseline.json`, kaparehong pattern ng pagpapatupad para sa stale na gaya ng `check:known-symbols`) — mga BAGONG error lamang na lampas sa naka-baseline na bilang ang magpapabagsak sa gate; unti-unting ibaba gamit ang `--update` kapag naayos ang dati nang error.                                                                                                                                                                                         | Oo                                       |

### Trabaho: `quality-gate`

Tumatakbo pagkatapos ng `test-coverage`. Hinaharang ang merge kapag nabigo.

| Script                       | Bineberipika                                                                                                                                                                                                                          | Humaharang               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | Gumagawa ng `quality-metrics.json` (bilang ng babala ng ESLint, coverage mula sa pinagsamang ulat ng shard)                                                                                                                           | Oo (upstream ng ratchet) |
| `quality:ratchet`            | Hindi nag-regress ang bawat metric sa `quality-baseline.json` (mga babala ng ESLint ≤ baseline; coverage ≥ baseline)                                                                                                                  | Oo                       |
| `check:duplication`          | Hindi lumalampas sa baseline sa `quality-baseline.json` ang pagdodoble ng code (jscpd@4)                                                                                                                                              | Oo                       |
| `check:complexity`           | Hindi lumalampas sa cap ang cyclomatic complexity sa antas ng file (pangunahing `complexity` ng ESLint + `max-lines-per-function`)                                                                                                    | Oo                       |
| `check:cognitive-complexity` | Ratchet ng cognitive complexity (`eslint-plugin-sonarjs`) — hiwalay na pagpapatakbo ng ESLint; parehong pinagsasama ng CI bilang iisang hakbang na `check:complexity-ratchets`                                                        | Oo                       |
| `check:dead-code`            | Hindi nag-regress kumpara sa baseline ang ratchet ng mga hindi ginagamit na export / file (knip)                                                                                                                                      | Oo                       |
| `check:compression-budget`   | Badyet ng benchmark sa compression — hindi dapat mag-regress ang minimum na matitipid na token para sa bawat engine                                                                                                                   | Oo                       |
| `check:type-coverage`        | Hindi nag-regress ang ratchet ng porsiyento ng naka-type na code (`type-coverage`); malaking bahagi nito ay sumasaklaw sa `typecheck:noimplicit:core`                                                                                 | Oo                       |
| `check:codeql-ratchet`       | Hindi nag-regress ang bilang ng bukas na alerto ng CodeQL (binabasa sa pamamagitan ng `gh api`; maayos na nilalaktawan kapag walang token) — para sa dalas ng pag-refresh at manual na trigger: tingnan ang "CodeQL ratchet" sa ibaba | Oo                       |

### Trabaho: `quality-extended`

Hinaharang ng trabaho ang mga naaangkop na candidate. Sinusuri ang laki ng bundle, mga natuklasang secret, mga natuklasang vulnerability, mga natuklasan sa workflow, at mga pagbabago sa OpenAPI gamit ang mga kinakailangang ratchet. Nananatiling advisory ang mga diagnostic ng circular dependency. Kinakailangan ang pag-install ng scanner: ang `scripts/ci/install-quality-scanners.sh` ay naglalaan ng mga naka-pin na bersyon at nagpapalaganap ng mga pagkabigo sa pag-install. Kapag may nawawalang tool, invalid na ulat, o nawawalang baseline, mananatiling INCOMPLETE ang kinakailangang scanner gate.

| Script                   | Pinapatunayan                                                                                                                                                                                                                          | Pagharang                                                           |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `check:circular-deps`    | Walang mga circular dependency (dpdm)                                                                                                                                                                                                  | **Payo lamang**                                                     |
| `check:bundle-size`      | Hindi lumalampas sa itinakdang limitasyon ang laki ng bundle; mabibigo kapag hindi available ang pagsukat                                                                                                                              | **Nakaharang kapag may --ratchet**                                  |
| `check:secrets`          | Hindi dumarami ang mga finding ng Gitleaks; tinatanggihan ng mga kinakailangang scan ang mga nawawalang tool/source/baseline, nabigong scan, at invalid na report                                                                      | **Nakaharang kapag may --ratchet**                                  |
| `check:vuln-ratchet`     | Hindi dumarami ang mga vulnerability ng dependency; tinatanggihan ng mga kinakailangang scan ang mga nawawalang tool, invalid na report, o nawawalang baseline                                                                         | **Nakaharang kapag may --ratchet**                                  |
| `check:workflows`        | Workflow lint (actionlint + zizmor); ang mga nawawala/sirang scanner, invalid na report, o nawawalang ratchet baseline ay nabibigo bilang INCOMPLETE. Ang mga valid na finding ay sumusunod sa napiling strict/advisory/ratchet policy | Kinakailangan ang pagpapatakbo; nakaharang ang zizmor ratchet sa CI |
| `check:openapi-breaking` | Pampublikong kontrata ng API laban sa mga naka-pin na event commit (PR merge-base, push before, merge-group base; unang parent ng scheduled/manual checkout); saradong nabibigo ang kinakailangang pagsukat                            | **Nakaharang kapag may --ratchet**                                  |

### Trabaho: `docs-sync-strict`

Para sa mga pull request patungo sa `main` o `release/**`, tumatakbo lamang ang trabahong ito para sa mga kandidatong hindi draft (o mula sa pinagkakatiwalaang pila) at nauuri bilang mga pagbabago sa dokumentasyon o code. Tumatakbo rin ito sa mga pangyayari sa CI na hindi PR; ang trigger ng push sa workflow na ito ay para lamang sa `main`, hindi sa `release/**`. Hinaharang ng isang hakbang na nagtatapos sa exit code na hindi zero ang trabaho; hindi ito hinaharang ng mga natuklasang iniuulat lamang at ng mga eksepsiyong nakadokumento sa ibaba.

| Script                         | Pinapatunayan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Pagharang                                                                                                                                                                           |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-gate na sunod-sunod na nagpapatakbo sa 7 sub-gate sa ibaba                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oo                                                                                                                                                                                  |
| ↳ `check:docs-sync`            | Pagkakatugma ng mga bersyon ng pakete/OpenAPI/CHANGELOG, eksaktong mga salaming kopya ng `llm.txt`, mga di-nagbabagong tuntunin sa mga seksiyon at laki ng isinaling CHANGELOG, at kawalan ng mga dobleng dokumentong napalitan na                                                                                                                                                                                                                                                                                                                                                                                                                           | Oo                                                                                                                                                                                  |
| ↳ `check:docs-frontmatter`     | May mga valid na pamagat sa frontmatter ang mga na-compile na pahina ng dokumentasyon                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Oo                                                                                                                                                                                  |
| ↳ `check:docs-counts`          | Mahigpit na ipinapatupad ang mga di-nagbabagong tuntunin sa bilang na may mataas na katiyakan; babala lamang ang ibinibigay ng mga pagsusuri ng bilang ng file na batay sa pagtatantiya, maliban kung ibinigay sa script ang `--strict` (hindi ito ipinapasa ng meta-gate ng CI)                                                                                                                                                                                                                                                                                                                                                                             | Nanghaharang ang mahigpit na antas; payo lamang ang maluwag na antas                                                                                                                |
| ↳ `check:env-doc-sync`         | Magkatugma ang mga pagbasa ng environment variable sa source code, `.env.example`, at `docs/reference/ENVIRONMENT.md` matapos ilapat ang tahasang mga listahan ng eksepsiyon para sa mga hindi isinasama, nasa dokumentasyon lamang, at nasa environment lamang                                                                                                                                                                                                                                                                                                                                                                                              | Oo, sa labas ng mga nakadokumentong listahan ng eksepsiyon                                                                                                                          |
| ↳ `check:deprecated-versions`  | Iniuulat ang mga posibleng lumang bersyon sa labas ng ligtas na kontekstong pangkasaysayan at mga lumang petsa ng pag-update, maliban sa mga dokumentong hindi isinasama                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Payo lamang sa kasalukuyang pagkakakabit ng CI (hindi ipinapasa ang `--strict`)                                                                                                     |
| ↳ `check:doc-links`            | Ang mga internal na markdown link sa docs ay tumutukoy sa mga totoong file (`[text]`/`(path)` form)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Oo                                                                                                                                                                                  |
| ↳ `check:fabricated-docs`      | Umiiral sa codebase ang mga route, env var, CLI command, pangalan ng hook, at path ng file na binanggit sa docs. Mahigpit na gate sa pamamagitan ng `--strict`; soft-fail kapag walang flag.                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Oo (sa pamamagitan ng `--strict` sa CI)                                                                                                                                             |
| `check:cli-i18n`               | Umiiral sa `en` ang mga key ng `t()` na ginagamit ng CLI; pinananatili ng `pt-BR` ang bawat seksiyon sa pinakamataas na antas; `zh-CN` at `zh-TW` ay naglalaman ng bawat key ng `en`                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Oo                                                                                                                                                                                  |
| `check:openapi-coverage`       | Sinasaklaw ng OpenAPI spec ang hindi bababa sa isang ratcheted floor ng mga totoong route                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Oo                                                                                                                                                                                  |
| `check:openapi-security-tiers` | Dapat may katumbas na suporta sa `routeGuard.ts` ang mga idineklarang anotasyong `x-loopback-only`/`x-always-protected`; nanghaharang ang mga error ng parser at mga hindi pagtutugma sa pasulong na pagsusuri. Nagbibigay ng babala ang pabalik na pagsusuri para sa nawawalang `x-loopback-only` sa ilalim ng mga prefix na para lamang sa lokal na pag-access, at hindi kasama sa pabalik na pagsusuring iyon ang mga route na tinutukoy lamang gamit ang pattern.                                                                                                                                                                                        | Nanghaharang ang mga pagsusuri ng parser at ang pasulong na pagsusuri; payo lamang ang pabalik na pagsusuri                                                                         |
| `check:openapi-routes`         | Ang bawat path na `/api...` sa `openapi.yaml` ay tumutugma sa isang totoong route nang hindi isinasaalang-alang ang mga pagkakaiba sa parameter, matapos ilapat ang listahan ng makatwirang eksepsiyong `KNOWN_STALE_SPEC`; nagdudulot din ng kabiguan ang mga lipas na entry sa listahan                                                                                                                                                                                                                                                                                                                                                                    | Oo                                                                                                                                                                                  |
| `check:docs-symbols`           | Ang mga panloob na sanggunian sa URL na `/api/...` sa mga kanonikal na dokumentong hindi salaming kopya ay tumutugma sa isang totoong route o pamilya ng mga route; hindi kasama ang mga sanggunian sa proxy, upstream, placeholder, at file at ang mga entry sa `KNOWN_STALE_DOC_REFS` na may sapat na dahilan, at nagdudulot ng kabiguan ang mga lipas na entry sa listahan ng eksepsiyon                                                                                                                                                                                                                                                                  | Oo                                                                                                                                                                                  |
| `i18n translation drift`       | Sinusuri ang mga hash ng pinagmulan/patutunguhan ng mga pangunahing dokumento at ang pinanggalingan ng salin. Pinapayagan lamang ng paghahambing sa PR ang mga minanang pagkabigong eksaktong magkakapareho; humaharang ang bago o hindi pa napatunayang hindi pagtutugma ng pinagmulan, nawawalang patutunguhan, hash ng patutunguhan, lipas na salin o cache ng seksiyon. Sa labas ng paghahambing sa PR, humaharang ang mga pagkabigo sa pinagmulan/nawawalang patutunguhan/hash ng patutunguhan, samantalang babala lamang ang mga lipas na salin at hindi tugmang cache ng seksiyon. Hindi pagkabigo ang kawalan ng cache ng seksiyon sa lumang format. | Humaharang ang bago/hindi pa napatunayang paglihis sa PR; babala lamang ang eksaktong kaparehong minanang paglihis; nakadepende sa uri ng pagkabigo ang mga tuntunin sa labas ng PR |

### Trabaho: `i18n-ui-coverage`

| Script                            | Bine-validate                                                                                                                                                                                                | Humahadlang    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `check-ui-keys-coverage` (inline) | Ang saklaw ng UI i18n key ay ≥ 65%                                                                                                                                                                           | Oo             |
| `check-ui-value-drift` (inline)   | Walang naiiwang lipas na salin kapag muling isinulat ang isang English na **value**                                                                                                                          | Oo             |
| `check-new-key-coverage` (inline) | Isinasalin ang isang **bagong** English key sa bawat locale — tinatanggihan ang marker na `__MISSING__:`                                                                                                     | Oo             |
| `check-translation-ratio`         | Ang ratio ng tunay na salin sa bawat locale (kapareho-ng-English / placeholder / nawawalang leaves sa labas ng allowlist) ay hindi dapat lumampas sa `config/quality/i18n-translation-baseline.json` + slack | **Humaharang** |

Kailangan ang `fetch-depth: 0` — dini-diff ng value-drift gate ang `en.json` laban sa merge base.

#### `check-ui-value-drift` — gate para sa lipas na salin

Nahuhuli nito ang isang i18n regression na hindi nakikita ng ibang gate ayon sa estruktura:
muling isinulat ang isang English value ngunit nananatili ang mga saling nagmula sa
_nakaraang_ English, kaya patuloy na nakakabasa ang mga hindi English na user ng
may-kumpiyansang pagkakasulat ngunit mali na ngayong kopya.

Nailabas talaga ito. Muling isinulat ang `oauthModal.googleOAuthWarning` nang maidagdag ang
Antigravity login helper (#5203); **39 sa 43 locale** ang nanatiling may tekstong nagsasabi
sa mga operator na "kopyahin ang buong URL at i-paste ito sa ibaba" — isang flow na hindi
makukumpleto para sa provider na iyon. Hindi ito napansin hanggang #8463 dahil:

- nagba-backfill lang ang `sync-ui-keys` ng mga key na **wala**, at hindi kailanman ng mga
  **lipas na**;
- binibilang ng `check-ui-keys-coverage` ang _presensya_ ng key, kaya itinuturing na saklaw
  ang isang lipas na salin;
- sinusubaybayan ng `check-translation-drift` ang mga mirror ng dokumentasyong
  `docs/i18n/<locale>/**.md` — hindi nito kailanman binabasa ang
  `src/i18n/messages/*.json`. Humahadlang ito sa job na `docs-sync-strict` mula noong
  muling pag-sync noong 2026-09: mag-edit ng pangunahing doc →
  `npm run i18n:run -- --files=<doc>` (ayon sa seksyon, mura).

**Nakabatay sa diff, hindi sa baseline.** Inihahambing nito ang `en.json` sa merge base
laban sa working tree; para sa bawat key na nagbago ang English value, lipas na ang
anumang locale na mayroon pa ring hindi nabagong salin. Sinasadya nitong **i-freeze ang
umiiral nang utang** — hindi maipapakita ng isang diff kung saang lumang English nagmula
ang isang matagal nang salin, kaya ang sinusuri lang ng gate ay ang naaapektuhan ng
kasalukuyang pagbabago. Ang alternatibo (isang per-key hash baseline) ay mangangailangan
ng ~600 KB na generated file, 3× ng pinakamalaking umiiral na baseline, at magbabago sa
bawat i18n PR.

Dalawang paraan upang makapasa rito:

1. i-update ang mga apektadong salin, o
2. itakda ang mga ito sa `__MISSING__:<new english>` — pagkatapos ay ihahatid ng runtime
   ang naitama nang English (`src/i18n/request.ts::deepMergeFallback`, #7258) at ipipila
   ang key para sa pagsasalin.

Kung nagbago ang **kahulugan** ng string, mas mainam na **palitan ang pangalan ng key**:
hindi maaaring magmana ng lipas na salin ang isang bagong key. Iyon ang pattern na ginamit
ng #8463.

```bash
npm run i18n:check-value-drift          # mahigpit (ito ang pinapatakbo ng CI)
npm run i18n:check-value-drift:warn     # ulat lamang
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Ang mga gate para sa value-drift at new-key ay gumagamit ng iisang immutable na paghahambing mula sa
`scripts/i18n/resolve-ui-diff-base.mjs`. Ipinapasa ng workflow ang parehong base, base-tip, at
candidate SHA sa parehong pagsusuri. Ginagamit ng mga run para sa PR/base-retarget, push, at merge-group ang kani-kanilang event
context. Ang pag-dispatch ng isang candidate branch ay nangangailangan ng eksaktong bukas na PR nito o ng tahasang
`i18n_base_sha` input. Ang dispatch o nakaiskedyul na pagmamasid sa `main` o `release/vX.Y.Z`
nang wala ang input na iyon ay naghahambing sa huling commit at sa first parent nito; hindi ito pag-audit ng
lahat ng minanang translation debt. Ang lokal na invocation ay nangangailangan ng tahasang comparison base,
halimbawa, ang `BASE_REF` command sa itaas.

Ang nawawala o malabong comparison context, hindi mabasa o invalid na kinakailangang catalog, at
nagbagong candidate ay nagreresulta sa `INCOMPLETE` na may exit code na **2**, kabilang ang warn mode.
Ginagamit ng mga pagbasa sa catalog ang `scripts/i18n/read-ui-catalog.mjs`; ang mga read failure ay hindi
pinapalitan ng mga empty object. Hindi nagtatakda ng PASS ang unavailable na base o incomplete na input.

### Job: `i18n`

Buong matrix ng pag-validate ng i18n (isang job sa bawat locale). Payo lamang ang buong
job.

| Script                          | Bine-validate                          | Humahadlang                                              |
| ------------------------------- | -------------------------------------- | -------------------------------------------------------- |
| `validate_translation.py quick` | Pagkakumpleto ng salin sa bawat locale | **Payo lamang** (`continue-on-error: true` sa buong job) |

### Job: `pr-test-policy`

Tumatakbo lamang sa mga pull request.

| Script                 | Bine-validate                                                                                                                                                                    | Humahadlang |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check:pr-test-policy` | Ang mga PR na nagbabago ng production code sa `src/`, `open-sse/`, `electron/`, o `bin/` ay dapat magsama o mag-update ng mga test (Hard Rule #8)                                | Oo          |
| `check:test-masking`   | Hindi binabawasan ng mga binagong test file ang net assert count o nagdaragdag ng mga tautology na `assert.ok(true)`                                                             | Oo          |
| `check:pr-evidence`    | Binabanggit ng PR body ang test/VPS evidence para sa pagbabago (ginagawang mekanikal ang Hard Rule #18 sa pamamagitan ng pag-grep sa prose ng PR — marupok, tingnan ang Backlog) | Oo          |

### Job: `test-vitest`

Kailangan ang job sa klasipikasyong `changes`. Hinaharangan ng mga naaangkop na matrix shard ang pag-merge kapag nabigo.

| Suite            | Bine-validate                                           | Blocking                                                                                                                  |
| ---------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 tool), autoCombo, cache — vitest runner | Oo                                                                                                                        |
| `test:vitest:ui` | Mga test ng UI component — vitest runner                | **Blocking** — tahasang ibinukod sa `vitest.config.ts` ang mga dati nang failure; ibabagsak ng mga bagong failure ang job |

### Mga nightly workflow (naka-iskedyul, advisory)

Tumatakbo ang mga ito ayon sa cron schedule (at `workflow_dispatch`), at hindi kailanman sa mga PR. Advisory ang lahat ng ito.

| Workflow               | Bine-validate                                                                                                                                                               | Blocking     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | Mga fast-check property test na may random seed + mataas na bilang ng run                                                                                                   | **Advisory** |
| `nightly-resilience`   | Heap-growth gate, chaos fault-injection, k6 load/soak                                                                                                                       | **Advisory** |
| `nightly-llm-security` | Promptfoo injection guard (block mode) + mga garak probe (nilalaktawan kapag walang provider secret)                                                                        | **Advisory** |
| `nightly-schemathesis` | OpenAPI contract fuzzing (schemathesis) laban sa live na OmniRoute gamit ang `docs/openapi.yaml` — inilalantad ang mga paglabag sa spec / hindi nahawakang 500 (Fase 8 B.4) | **Advisory** |
| `nightly-mutation`     | Stryker mutation-testing score sa mabilis na unit lane — inilalantad ng mga nakaligtas na mutant ang mahihinang assert                                                      | **Advisory** |
| `nightly-compat`       | Node engine compatibility matrix sa lahat ng sinusuportahang saklaw ng `engines.node`                                                                                       | **Advisory** |

Itinatala ang mga performance baseline (heap, TTFB, build time), ngunit hindi ginagamit bilang gate: tingnan ang [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

### CodeQL ratchet: dalas ng pag-refresh at manual na pag-trigger

Binabasa ng `check:codeql-ratchet` ang **estado ng repo, na nire-refresh ayon sa iskedyul — hindi sa bawat PR.**
Iniuulat ng `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` ang
`state: configured`, `schedule: weekly`: ang default-setup scan ng GitHub, hindi isang pagsusuri sa bawat push.
Bunga nito: pagkatapos ma-merge ang isang PR na NAG-AAYOS ng mga alert, patuloy na binabasa ng ratchet
ang luma at mas mataas na bilang hanggang sa tumakbo ang susunod na nakaiskedyul na scan — kaya nag-uulat ito
ng regression sa bawat bukas na PR, kabilang ang mga follow-up ng mismong nag-ayos na PR, hanggang makahabol ang scan.

**Manual na pag-refresh**: Muling pinapatakbo ng `gh workflow run codeql.yml --ref release/vX.Y.Z` ang
pagsusuri at muling inilalathala ang mga alert sa loob ng ilang minuto. Basahin muna ang `.github/workflows/codeql.yml`
— ipinapaliwanag ng header nito na `workflow_dispatch`-only ito **dahil sumasalungat ito sa
"default setup" ng GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Ang pagpapanumbalik sa mga trigger na `push`/`pull_request`/
`schedule` ay nangangailangan muna ng **pagkilos ng owner**: Settings → Code security →
CodeQL: Default → Advanced. Huwag magdagdag ng `schedule:` trigger nang hindi ginagawa ang pagbabagong iyon — mga bigong run
lamang ang magiging resulta nito.

**Higpitan ang baseline pagkatapos bumaba ang bilang** — isinusulat ng `node scripts/check/check-codeql-ratchet.mjs
--update` ang bagong nasukat na bilang sa `quality-baseline.json` →
`metrics.codeqlAlerts.value`, upang hindi tahimik na pahintulutan ng ratchet ang regression pabalik
sa lumang pinakamataas na limitasyon. Halimbawang isinagawa (2026-09-02/03): inayos ng PR #12502 ang 7 tunay na alert
(13 → 6 na nasukat na bukas); hinigpitan ng PR #12530 ang naka-freeze na baseline mula 11 → 6 upang tumugma; ang
natitirang 6 ay pagkatapos ay na-dismiss na may hiwalay na katwiran para sa bawat alert hanggang maging 0 ang bukas.

**Ang mga dismissal ay pagpapasya ng operator (Mahigpit na Panuntunan #14)** — huwag kailanman mag-dismiss ng CodeQL alert
nang hindi itinatala ang teknikal na katwiran sa dismissal comment: `won't fix` para sa
isang kinakailangan ng upstream protocol, `used in tests` para sa isang test fixture, `false positive`
para sa isang sanitizer na hindi nakikita ng CodeQL (naunang halimbawa: `docs/security/ERROR_SANITIZATION.md`).

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

**Hindi rin nakadokumento sa itaas** (advisory, mababang signal): ang `docs-lint` job
(markdownlint + Vale, may `continue-on-error` ang buong job) at ang mga standalone scanner workflow na
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. Nasa
`quality-baseline.json` ang `semgrepFindings: 0` ngunit hindi ito nakakabit sa isang blocking ratchet sa `ci.yml` — kasalukuyang
ulila ang metric.

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
