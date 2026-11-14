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

Ang CI at ang mga daloy ng trabaho ng Quality Gates ay naglalabas ng isang matatag na hatol: `Gate / CI` at `Gate / Quality`. Ang kanilang naka-bersyon na patakaran sa pagpasok ay nagsasaad ng bawat upstream na trabaho bilang kinakailangan o advisory. Ang isang naaangkop na kinakailangang trabaho ay dapat magtagumpay: nawawala, nakansela, nilaktawan, nakabinbin at hindi alam na mga resulta ay hindi makakapagtatag PASS. Ang isang wastong docs-only o catalog-only na pag-uuri ay maaaring gawing hindi naaangkop ang isang code lane; ang draft PR ay hindi tinatanggap na kandidato. Ang isang `hotfix` label ay hindi nag-aalis ng ebidensya.

Sinasaklaw ng parehong workflow PRs sa mga sanga main/release, itinutulak sa `main`, manu-manong pagpapadala at mga kaganapan sa pagsasama-sama ng pangkat. Push, dispatch at merge-group ang buong seleksyon. Ang mga push sa `release/**` ay huwag simulan ang mga ito (2026-10-18): ang bawat pagbabago ay nagpatakbo na ng matrix sa PR nito at ang pinagsamang kumbinasyon ay ang Release-Green's job (`docs/ops/RUNNER_BOX.md` → Hosted lane). Gumagamit ang mga forks at merge na grupo ng mga naka-host na runner para sa mga trabahong pumipili ng mga self-hosted na runner; dapat ma-verify ang sapat na naka-host na kapasidad bago ilunsad.

Isang ordinaryong PR ang nagpapatakbo ng mabilis na pagpili. Ang `full-code` at `full-code-e2e` lane ng patakaran sa pagpasok (E2E, integration, package artifact, Electron smoke, Bun SQLite, ecosystem at mga protocol na kliyente) ay tumatakbo lamang sa isang draft ng pila ng Mergify o sa isang buong pagtakbo: `gh workflow run ci.yml --ref <branch>`.

Tinutukoy ng bawat resibo JSON ang na-check out SHA, pagtakbo at pagtatangka ng daloy ng trabaho. Ang CLI ay tinatanggihan ang isang checkout/event SHA mismatch. Ang mga pagsubok sa daloy ng trabaho ay nagbubuklod ng membership sa patakaran sa listahan ng `needs` ng trabaho ng hatol upang ang isang bago o inalis na linya ay hindi maaaring tahimik na mawala. Sinasaklaw ng mga resibo ang sarili nilang daloy ng trabaho, hindi ang paglalathala, pag-deploy, o ang panloob ng isang umiiral nang advisory scanner. Ang pag-activate ng parehong mga pangalan ng tseke sa mga panuntunan ng sangay ay isang hiwalay na pagbabagong administratibo; Ang pagdaragdag ng mga trabahong ito ay hindi mismo nagpoprotekta sa isang sangay.

### Pagsamahin ang pila

Ang `queue` label ay nagpapadala ng PR sa Megify queue (`.mergify.yml`). Binubuksan ng Mergify ang draft PR sa isang `mergify/merge-queue/` branch, pinapatakbo CI ang buong seleksyon doon, at nagsasama ang orihinal PR kapag pumasa `Gate / CI`, `Gate / Quality` at `Merge integrity (changelog + generated skills)`.

Isinulat ng Mergify ang buod ng queue nito sa paglalarawan ng draft, at maaaring i-edit din ito ng ibang mga app. Ang isang `pull_request` `edited` na kaganapan sa naturang draft ay tumatagal ng sarili nitong concurrency group (`-queue-edit-<run_id>`) kaya hindi nito makansela ang totoong pagtakbo ng draft, at nilalaktawan nito ang gate at ang matrix. Tanging `Merge integrity` lang ang tumatakbo. Ang nilaktawan na trabaho sa gate ay nagdadala ng ibang pangalan ng tseke, dahil binabasa ng Mergify ang isang nilaktawan na `Gate / CI` bilang isang nabigong tseke at na-dequeu ang PR.

Pagkatapos ng isang dequeue, ang isang push ay hindi palaging requeue ang PR. Comment `@mergifyio queue` dito.

### Napanatili ang ebidensya sa reducer ng pagtanggap

binabawasan ng `scripts/quality/validate-release-acceptance.mjs` ang isang ibinigay na plano at ang mga manifest nito; hindi nito itinatag na ang plano ay sumasaklaw sa kumpletong release pipeline. Ang mga ulat nito ay tahasang nagtatakda ng `releaseAcceptance: false`, kahit na ang planong iyon ay `VERIFIED`. Gumagamit pa rin ang `release-acceptance.yml` workflow ng mga shadow fixture, hindi tunay na build, package, boot o mga resibo ng promosyon.

Ang CLI ay nangangailangan ng `--evidence-root` upang i-verify ang napanatili na ebidensya. Naresolba ang mga file bilang `<evidence-root>/<artifact_id>/<member>` at na-hash bilang SHA-256. Pinipigilan ng PASS record na walang ebidensya, nawawala o binagong file, hindi ligtas na landas o symlink ang pag-verify. Ang mga nawawalang file ay hindi katumbas ng walang laman na matagumpay na mga log. Ang mga kasalukuyang SHA/run/attempt check ay nananatiling independiyente: ang pagtutugma ng mga byte ay hindi makakapagligtas ng isang lipas na resibo. Ang integridad ng file ay hindi patunay ng pagiging tunay ng pagpapatupad o pag-promote ng artifact.

### Static scan na imbentaryo

Ang bersyon na npm-alias na imbentaryo at static-scan na membership ay nakatira sa `config/quality/gate-manifest.json`. Patakbuhin ang `npm run check:gate-manifest` upang patunayan ang mga pangalan ng script at eksaktong mga utos laban sa `package.json`; nabigo ang mga karagdagan, pag-aalis at command drift sa parehong lokal na hook at sa mga trabaho sa change-classification sa CI. Ang isang alias ay hindi isang workflow na trabaho, matrix instance o test case: ang mga bilang na ito ay hindi dapat ipakita bilang mapagpapalit.

Gamitin `npm run quality:scan -- --list` o `npm run quality:scan:fast -- --list` upang siyasatin ang mga napiling alias nang hindi isinasagawa ang mga ito. Ang runner ay tinatawag ang npm entrypoint, kaya ang runtime nito (kabilang Bun kung saan naka-configure) ay napanatili. Itinatala ng manifest ang mga alias sa labas ng mga profile na iyon bilang hiwalay na ginagamit, at ipinagbabawal ang mga command sa pagpapanatili sa mga read-only na scan profile.

Sinasaklaw ng mga profile na ito ang static scan lamang. Hindi nila pinatutunayan ang mga pagsusuri sa produkto, saklaw, packaging, mga panlabas na pagsusuri o ganap na pagtanggap ng isang kandidato. Ang pagpasok sa daloy ng trabaho ay gumagamit ng naka-link na `config/quality/admission-policy.json` at `scripts/quality/admission-verdict.mjs`. Ang mga profile ng release-observer ay nananatiling hiwalay; siyasatin ang kanilang mga naaangkop na tseke at resibo nang nakapag-iisa. Ang mga static na command ng buong observer ay idineklara sa `config/quality/release-green-static-profile.json`, kasama ang `audit:deps`, mutation-test selection at translation checks. Ang loader ay nagpapatunay ng mga utos ng npm laban sa package.json at mga modelong deklarasyon CI/Quality ; tinatanggihan nito ang drift sa halip na magsagawa ng mga token ng shell bilang mga argumento. Ang kinakailangang scanner SKIP/INCOMPLETE output ay hindi makapagtatag PASS. Itinatala ng profile ang mga panlabas na pagbubukod nito at hindi pinapalitan ang naka-host na saklaw, mga test matrice, pakete o ebidensya sa pag-deploy. Ang imbentaryo ng prose sa ibaba ay isang sanggunian, hindi patunay na talagang tumakbo ang isang gate.

Ang mga script ay nakatira sa ilalim ng `scripts/check/` (mga gate ng patakaran) at `scripts/quality/` (ratchet engine). Ang CI na pinagmumulan ng katotohanan ay `.github/workflows/ci.yml`.

### Bitawan ang PR fast-path (`quality.yml`)

Kinukumpleto ng `.github/workflows/quality.yml` CI sa main/release PRs, tinutulak sa `main`, dispatch at pagsamahin ang mga grupo. Gumagamit PRs ng mga mabilis na pagsusuri na na-filter ng landas. Inalis ang permanenteng hindi pinagana na duplicate na build; ang tunay build/package/boot check ay nananatili sa CI. Ang unit suite at vitest ay tumatakbo lamang sa CI (`Unit Tests (N/8)` at `Vitest`).

| Trabaho                                          | Saklaw                                                                                                                                         | Hinaharang                 |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs ref at docs-all                                                                                                        | Oo                         |
| `Fast Quality Gates`                             | Code PRs; mga static na pagsusuri, typecheck, dashboard typecheck, mga naapektuhang unit test, mga nakalimutang pagsubok sa kapatid (advisory) |
| `No new ESLint warnings`                         | Code PRs; suppressions-aware lint guard                                                                                                        | Oo, kasama ang mga tinidor |
| `Merge integrity (changelog + generated skills)` | Non-draft PRs; changelog at nabuong pag-sync ng kasanayan                                                                                      | Oo, kasama ang mga tinidor |

#### Nakalimutang ulat ng mga pagsubok sa kapatid

Tumatakbo `npm run check:forgotten-sibling-tests` bilang advisory step ng `Fast Quality Gates` at muling ginagamit ang import resolver sa likod ng test-impact map. Para sa bawat binagong module ng produksyon, nag-uulat ito ng mga deterministikong `changed module/symbol -> static consumer -> candidate sibling test` chain kapag wala ang pagsusulit ng kandidato sa pull-request diff. Ang Markdown summary at JSON na resulta ay pinananatili bilang `forgotten-sibling-tests` workflow artifact para sa pag-calibrate bago ang anumang blocking rollout.

Ang mga re-export ng barrel at dynamic na pag-import ay mga diagnostic ng resolusyon lamang; hindi sila kailanman gumagawa ng pagharang sa paghahanap. Naka-live sa `config/quality/forgotten-sibling-allowlist.json` ang mga nasuri na exception. Dapat pangalanan ng bawat entry ang pagsubok ng consumer at kandidato, magbigay ng partikular na katwiran, at mag-link ng GitHub issue o pull request. Hindi naisara ang mga maling porma. Ang mga pagbubukod ay hindi maaaring sugpuin ang isang tinanggal na pagsubok ng kandidato o isang pagkakaiba na nagdaragdag ng `.skip`/`.todo`; Ang pagpapahina ng assertion at iba pang masking ay nananatiling pag-aari ng independiyenteng humaharang `check:test-masking` gate.

### Trabaho: `lint`

Tumatakbo sa bawat PR hanggang `main`. Ang mga bloke ay nagsasama sa kabiguan.

| Script (`npm run ...`)            | Pinapatunayan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Hinaharang                               |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`              | Ang bersyon Node.js ay nasa loob ng sinusuportahang hanay                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Oo                                       |
| `check:cycles`                    | Mga pabilog na pag-import sa lahat ng `src/` + `open-sse/` (batay sa AST, nalutas ang tsconfig `paths` ). Bare exits 1 sa tuwing mayroong anumang cycle (fail-closed since #15281) at inililista ang SCCs. `check:cycles:ratchet` (kung ano ang pinapatakbo CI ) ay hinaharangan kapag ang bilang ay lumampas sa `metrics.cycles` ceiling sa `quality-baseline.json` — sa kasalukuyan 14, `direction: down`, kaya maaari lamang itong mahulog (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Oo (ratchet)                             |
| `check:boundary`                  | `open-sse → src` coupling: natatanging pag-import ng file-to-file mula sa engine papunta sa app (`scripts/quality/measure-boundary.mjs`; ang edge list ay ang v4 core/module-split remediation backlog). Bare = advisory report (katulad ng `quality:boundary`). `check:boundary:ratchet` (kung ano ang pinapatakbo CI, gayundin sa `quality.yml` fast-gates ratchet loop) ay humaharang kapag ang bilang ay lumampas sa `metrics.boundaryOpenSseToSrc` ceiling sa `quality-baseline.json` — na seeded sa sinusukat na 771, `direction: down`; ibinababa lamang ito `--update` ; base-relative sa PRs (`--base-ref`, tingnan sa ibaba)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Oo (ratchet)                             |
| `check:route-validation:t06`      | naroroon ang mga Zod schema sa lahat ng ruta (patakaran sa Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Oo                                       |
| `check:any-budget:t11`            | Ang bilang ng `@ts-expect-error // any` ay hindi lalampas sa badyet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Oo                                       |
| `check:provider-consistency`      | Ang bawat provider sa `providers.ts` ay may katugmang entry sa `providerRegistry.ts` (at vice-versa, sa loob ng allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oo                                       |
| `check:model-lifecycle`           | Ang tatlong talahanayan ng pagruruta na pinapanatili ng kamay ay nananatiling pare-pareho sa naka-check-in na lifecycle snapshot (#11503): `FITNESS_TABLE` (`taskFitness.ts`) scores walang retired id na `REGISTRY` maaaring ruta; bawat `BUILT_IN_ALIASES` target ay naroroon sa `REGISTRY` at wala sa snapshot ng retired-id; bawat retiradong id na nasa `REGISTRY` pa rin ay ipinapasa o nakalista sa `allowedRetiredInCatalog`; at walang `DEFAULT_DEGRADATION_MAP` source o target na lumilitaw na nagretiro sa snapshot na iyon. Hindi ito nagpapatunay na ang isang modelo ay kasalukuyang inihahatid ng isang live upstream. Ang offline — ay naghahambing laban sa `config/quality/model-lifecycle.json`, nire-refresh sa pamamagitan ng kamay gamit ang `npm run quality:refresh-model-lifecycle` (network; hindi naka-wire sa CI). `allowedRetiredInCatalog` ay isang burn-down ratchet: magdagdag lamang ng entry na may isyu sa pagsubaybay.                                                                                                                                                             | Oo                                       |
| `check:fetch-targets`             | Ang bawat `fetch("/api/...")` sa client-side `src/` ay lumulutas sa isang tunay `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oo                                       |
| `check:deps`                      | Ang lahat `npm install` -able deps sa bawat `package.json` sa repo ay nasa `dependency-allowlist.json`; na-flag ang mga bagong naka-unpin o slopsquatted na pakete                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Oo                                       |
| `audit:deps`                      | npm audit ng lahat ng limang independiyenteng lockfiles (root, Electron, OpenCode plugins v1/v2 at provider). Ang mga kritikal na advisories block; nananatiling nakikitang mga babala ang matataas na payo. Missing/failed audit ay INCOMPLETE at block; Ang mga hash at ulat ng lock sa bawat saklaw ay pinapanatili.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Oo                                       |
| `check:lockfile`                  | `package-lock.json` integrity — https registry, integrity hash, walang host overrides                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Oo                                       |
| `check:licenses`                  | SPDX license allowlist para sa mga dependency sa produksyon                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Oo                                       |
| `check:tracked-artifacts`         | Walang build artifact / naka-commit na `node_modules` symlink (gumagamit din sa husky na pre-commit; ang pre-push ay sadyang magaan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Oo                                       |
| `check:ai-attribution`            | No AI/bot `Co-Authored-By` trailer or AI-generation footer in PR commits, title or body — Hard Rule #16 (in the `quality.yml` fast-gates loop for PR→`release/**` — reads the event payload, no-op off PRs — and a PR-only step in `ci.yml` lint for PR→`main`; also the husky `commit-msg` hook; human co-authors allowed; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:vitest-exclusions`         | Ang bawat pagbubukod Vitest ay nagpapangalan ng isang isyu sa pagsubaybay at lumalabas sa `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oo                                       |
| `check:file-size`                 | Ang mga source file (`.ts`/`.tsx` sa `src/`, `open-sse/`, `electron/`, `bin/`) ay manatili sa loob ng `cap` at mga test file (`*.test.ts(x)`) sa loob ng `testCap`; Ang mga file na naka-freeze sa `file-size-baseline.json` (`frozen` / `testFrozen`) ay hindi dapat lumampas sa kanilang naitala na laki                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oo                                       |
| `check:error-helper`              | Ang mga tugon ng error sa executors/handlers ay gumagamit ng `buildErrorBody()` / `sanitizeErrorMessage()` (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oo                                       |
| `check:migration-numbering`       | Ang mga migration SQL file ay sunud-sunod na binibilang, walang gaps o duplicate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Oo                                       |
| `check:public-creds`              | Walang literal OAuth `client_id`/`client_secret` o Firebase Web key sa labas ng `publicCreds.ts` (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Oo                                       |
| `check:db-rules`                  | Walang hilaw na SQL sa labas ng mga module `src/lib/db/` ; walang barrel-import mula sa `localDb.ts` (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Oo                                       |
| `check:known-symbols`             | Ang mga tagapagpatupad ng provider, mga diskarte sa pagruruta, at mga tagasalin na nakarehistro sa kanilang mga talahanayan ng dispatch ay tumutugma sa mga file sa disk — walang naulila o hindi nadeklarang mga simbolo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Oo                                       |
| `check:route-guard-membership`    | Ang bawat ruta na nagbubunga ng proseso ng bata ay inuri ayon sa `isLocalOnlyPath()` (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Oo                                       |
| `check:test-discovery`            | Ang bawat `*.test.ts` / `*.spec.ts` file sa repo ay kinokolekta ng hindi bababa sa isang test runner (ratchet: orphan list sa `test-discovery-baseline.json` ay maaari lamang lumiit)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Oo                                       |
| `check:test-tla-order`            | Walang `node:test` file sa ilalim ng `tests/unit` ang nagrerehistro ng pagsubok, tumama sa isang top-level `await`, pagkatapos ay nagrerehistro ng higit pa (#18045; ratchet: `test-tla-order-allowlist.json` ay maaari lamang lumiit)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Oo                                       |
| `check:agent-skills-sync`         | Ang mga nabuong artifact na may kasanayan sa ahente ay tumutugma sa kanilang source catalog (walang drift)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:provider-asset-provenance` | Ang provider na logos/assets ay nagdadala ng isang naitala na provenance entry                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lint:json`                       | JSON config files parse at masiyahan ang repo lint rules                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | TypeScript compilation na walang mga error (advisory warning lang)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Oo                                       |
| `typecheck:noimplicit:core`       | Strict `noImplicitAny` — forward-looking; nangangailangan pa rin ng mga anotasyon ang maraming dati nang mga call site                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | **Advisory** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` scoped to `src/app/(dashboard)/**` (#7033) — `typecheck:core`'s curated 27-file allowlist ay hindi kasama ang anumang dashboard TSX, at `next build` ay hindi kailanman nag-type-check nito alinman (`next.config.mjs` sets `ignoreBuildErrors: true`), kaya ang orphaned-identifier regressions doon (#6625/#6909) ay hindi nakikita ng CI. Nag-iiba laban sa nakapirming per-file/per-TS-code count baseline (`config/quality/dashboard-typecheck-baseline.json`, parehong stale-enforcement pattern bilang `check:known-symbols`) — lang ang NEW errors na lampas sa baselined na bilang ay nabigo sa gate; ratchet down gamit ang `--update` kapag naayos ang isang dati nang error.                                                                                                                                                                                                                                                                                                                                                                                                                          | Oo                                       |
| `check:build-typecheck`           | Suriin ang buong uri ng produksyon ng app sa `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), ang 27-file na allowlist ng `typecheck:core` sa ibabaw at ang gate ng dashboard ay hindi sakop. Mga pagkakaiba laban sa `config/quality/build-typecheck-baseline.json`; nabigo ang isang bago o itinaas na per-(file, code), isang mas mababang bilang ang humihiling sa iyo na mag-ratchet. `--update` ay tumatanggi habang ang run ay naglalaman ng bago o nakataas na pares maliban kung `--force-regressions` ay naipasa, at tinatanggihan ang isang bagong pinatahimik na file maliban kung `--force-nocheck` ay naipasa, kaya ang pagpapalawak ng baseline upang maging berde at ang pagbibigay ng permanenteng katahimikan ay dalawang magkahiwalay na sinasadyang pagkilos. Ang isang hubad na `--force` ay tinanggihan. Ini-scan din ang saklaw ng build para sa `@ts-nocheck` laban sa `config/quality/ts-nocheck-baseline.json`, dahil ang isang file na gumagamit nito ay nag-uulat ng walang mga diagnostic at kung hindi man ay hindi nakikita ng bawat gate. | Oo                                       |

#### Magkaiba ang sagot ng dalawang typecheck program

`typecheck:core` at `check:build-typecheck` ay nag-compile ng iba't ibang mga programa sa ilalim ng magkakaibang mga opsyon, at ang parehong file ay maaaring malinis sa isa at puno ng mga error sa isa pa.

itinakda ng `tsconfig.build.json` `"strict": false`, kaya naka-off `noImplicitAny`. Ang core config ay nag-compile ng isang na-curate na 27-file na allowlist na may mas mahigpit na mga opsyon at sumusunod sa import graph ng bawat entry, kaya ang mga file na hindi kailanman lumalabas sa build program ay sinusuri pa rin doon.

Ang kahihinatnan ay mahalaga kapag hinuhusgahan kung ang isang file ay nai-type:** Ang zero diagnostic sa ilalim ng `check:build-typecheck` ay hindi nangangahulugang zero** . Ang pagtanggal ng `@ts-nocheck` mula sa 26 na file ay nagpakita ng 23 sa kanila na malinis sa build program; labing-anim sa mga iyon ang lumitaw ng humigit-kumulang 120 implicit-anumang mga error sa mahigpit na isa. Suriin ang pareho bago tumawag sa isang file na malinis.

### Trabaho: `quality-gate`

Tinatakbuhan si `test-coverage`. Ang mga bloke ay nagsasama sa kabiguan.

| Script                       | Pinapatunayan                                                                                                                                                                                                 | Hinaharang               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | Naglalabas ng `quality-metrics.json` ( bilang ng babala ESLint, saklaw mula sa pinagsanib na ulat ng shard)                                                                                                   | Oo (sa itaas ng ratchet) |
| `quality:ratchet`            | Ang bawat sukatan sa `quality-baseline.json` ay hindi umuurong (ESLint babala ≤ baseline; saklaw ≥ baseline)                                                                                                  | Oo                       |
| `check:duplication`          | Ang pagdoble ng code (jscpd@4) ay hindi lalampas sa baseline sa `quality-baseline.json`                                                                                                                       | Oo                       |
| `check:complexity`           | Ang cyclomatic complexity sa antas ng file ay hindi lalampas sa cap (core ESLint `complexity` + `max-lines-per-function`)                                                                                     | Oo                       |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — hiwalay na ESLint pass; CI ay tumatakbong parehong pinagsama bilang ang solong `check:complexity-ratchets` na hakbang                                | Oo                       |
| `check:dead-code`            | Ang mga hindi nagamit na pag-export / file ratchet (knip) ay hindi bumabalik laban sa baseline                                                                                                                | Oo                       |
| `check:compression-budget`   | Ang compression benchmark budget — per-engine token-savings floors ay hindi dapat bumabalik                                                                                                                   | Oo                       |
| `check:type-coverage`        | Ang porsyentong na-type na ratchet (`type-coverage`) ay hindi bumabalik; higit sa lahat ay sumasakop `typecheck:noimplicit:core`                                                                              | Oo                       |
| `check:codeql-ratchet`       | Ang bukas na bilang ng alerto CodeQL ay hindi bumabalik (nagbabasa sa pamamagitan ng `gh api`; maganda-laktawan nang walang token) — refresh cadence at manual trigger: tingnan ang "CodeQL ratchet" sa ibaba | Oo                       |

### Trabaho: `quality-extended`

Ang buong trabaho ay advisory (`continue-on-error: true`). Ang npm-based na ratchet ay tumatakbo nang totoo; ang mga panlabas na scanner ay nag-i-install sa pamamagitan ng `gh release download` at self-skip (exit 0) kapag ang isang binary ay wala pa rin.

| Script                   | Pinapatunayan                                                                                                                                                                                                                          | Hinaharang                                                    |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `check:circular-deps`    | Walang circular dependencies (dpdm)                                                                                                                                                                                                    | **Advisory**                                                  |
| `check:bundle-size`      | Ang laki ng bundle ay hindi lalampas sa takip                                                                                                                                                                                          | **Advisory**                                                  |
| `check:secrets`          | Lihim na pag-scan (gitleaks) — lumalaktaw kung binary absent                                                                                                                                                                           | **Advisory**                                                  |
| `check:vuln-ratchet`     | Ang mga kahinaan sa dependency (osv-scanner) ay hindi bumabalik — `--ratchet` na nabigo bilang INCOMPLETE (exit 2) kung hindi nasusukat                                                                                                | **Advisory**                                                  |
| `check:workflows`        | Workflow lint (actionlint + zizmor); nabigo ang mga missing/broken scanner, mga di-wastong ulat o nawawalang ratchet baseline bilang INCOMPLETE. Ang mga wastong natuklasan ay sumusunod sa napiling patakaran strict/advisory/ratchet | Kinakailangan ang pagpapatupad; zizmor ratchet blocking sa CI |
| `check:openapi-breaking` | Pampublikong kontrata API laban sa mga naka-pin na event na ginawa (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); hindi naisara ang kinakailangang pagsukat                                   | **Hinaharang gamit ang --ratchet**                            |

### Trabaho: `docs-sync-strict`

Tumatakbo sa bawat PR hanggang `main`. Ang mga bloke ay nagsasama sa kabiguan.

| Script                         | Pinapatunayan                                                                                                                                                                           | Hinaharang                              |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:docs-all`               | Meta-gate na nagpapatakbo ng 6 na sub-gate sa ibaba nang sunud-sunod                                                                                                                    | Oo                                      |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt na pagkakapare-pareho ng bersyon                                                                                                                          | Oo                                      |
| ↳ `check:docs-counts`          | Ang mga bilang sa prosa (bilang ng provider, bilang ng paglipat, atbp.) ay nasa loob ng ratchet window ng mga tunay na bilang                                                           | Oo                                      |
| ↳ `check:env-doc-sync`         | Ang bawat env var sa `.env.example` ay nakadokumento sa isang docs table, at vice versa                                                                                                 | Oo                                      |
| ↳ `check:deprecated-versions`  | Walang hindi na ginagamit na mga string ng bersyon sa docs                                                                                                                              | Oo                                      |
| ↳ `check:doc-links`            | Ang mga panloob na link ng markdown sa mga doc ay nalutas sa mga totoong file (`[text]`/`(path)` form)                                                                                  | Oo                                      |
| ↳ `check:fabricated-docs`      | Ang mga ruta, env vars, CLI command, hook name, at file path na binanggit sa mga doc ay umiiral sa codebase. Matigas na gate sa pamamagitan ng `--strict`; soft-fail na walang bandila. | Oo (sa pamamagitan ng `--strict` sa CI) |
| `check:cli-i18n`               | Ang mga string ng utos CLI ay naroroon sa lahat ng mga lokal na file ng i18n                                                                                                            | Oo                                      |
| `check:openapi-coverage`       | Sinasaklaw ng OpenAPI spec ang hindi bababa sa isang ratcheted floor ng mga totoong ruta                                                                                                | Oo                                      |
| `check:openapi-security-tiers` | Ang mga anotasyon ng tier ng seguridad sa `openapi.yaml` ay pare-pareho sa mga klasipikasyon `routeGuard.ts`                                                                            | **Advisory**                            |
| `check:openapi-routes`         | Ang bawat landas sa `openapi.yaml` ay lumulutas sa isang tunay na `route.ts` (anti-hallucination)                                                                                       | Oo                                      |
| `check:docs-symbols`           | Ang bawat `/api/...` reference sa `docs/**/*.md` ay nagre-resolve sa isang real `route.ts` (anti-hallucination)                                                                         | Oo                                      |
| `i18n translation drift`       | Ang mga hindi na-translate na key sa i18n locale file — ng babala lamang                                                                                                                | **Advisory**                            |

Ang labindalawang README SVGs sa ilalim `docs/diagrams/` ay nabuo (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` ay muling buuin ang lahat ng ito). Ang bawat isa ay may byte-compare unit test (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) na nabigo kapag ang naka-commit na file ay lipas na, at `check:docs-counts` ay nagbabasa ng mga canonical na numero mula sa kanilang mga `<text>` node — kaya naman pinapanatili ng outlining na hakbang ang bawat nakabalangkas na string sa file bilang invisible `<text>`. Binabasa ng SVG canonical-numbers check ang mga file na nakalista sa `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` at `tier-flow-light.svg`; ang free-forever, catalog-entry, recurring-pool at scoring-factor claims ay nagbabasa rin ng `promise-pillars.svg`, `free-tier-budget.svg` at `strategies-grid.svg`. Kinukuha ng `free-tier-budget.svg` ang mga numero nito mula sa live na catalog loader, kaya ang pagbabago sa `FREE_MODEL_BUDGETS` o sa isang display name ng provider ay magpapapula CI hanggang sa mabuo muli ang file na iyon.

### Trabaho: `i18n-ui-coverage`

| Script                            | Pinapatunayan                                                                                                                                                                                                     | Hinaharang   |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check-ui-keys-coverage` (inline) | UI i18n key coverage ay ≥ 65%                                                                                                                                                                                     | Oo           |
| `check-ui-value-drift` (inline)   | Isang muling isinulat na Ingles** halaga** walang naiwang lipas na pagsasalin                                                                                                                                     | Oo           |
| `check-new-key-coverage` (inline) | A** bago** Ang English key ay isinalin sa bawat lokal na — isang `__MISSING__:` marker ay tinanggihan                                                                                                             | Oo           |
| `check-translation-ratio`         | Ang ratio ng totoong pagsasalin sa bawat lokal (magkapareho-sa-Ingles / placeholder / nawawalang mga dahon sa labas ng allowlist) ay hindi dapat lumampas `config/quality/i18n-translation-baseline.json` + slack | **Advisory** |

Kailangan ng `fetch-depth: 0` — ang value-drift gate ay naiiba `en.json` laban sa merge base.

#### `check-ui-value-drift` — stale-translation gate

Nahuhuli ang isang i18n regression na hindi nakikita ng ibang mga gate sa istruktura: ang isang English na value ay muling isinulat at ang mga pagsasalin na nagmula sa _previous_ English ay nananatili, kaya ang mga hindi English na user ay patuloy na nagbabasa ng may kumpiyansa na mga salita, ngayon-maling kopya.

Ito ay ipinadala para sa tunay. `oauthModal.googleOAuthWarning` ay muling isinulat nang ang Antigravity login helper ay lumapag (#5203);** 39 sa 43 na lokal** pinananatiling text na nagsasabi sa mga operator na "kopyahin ang buong URL at i-paste ito sa ibaba" — isang daloy na hindi makumpleto para sa provider na iyon. Hindi ito napansin hanggang #8463 dahil:

- `sync-ui-keys` ay nag-backfill lamang ng mga susi** wala** , hindi kailanman ang mga iyon** lipas na** ;
- binibilang ng `check-ui-keys-coverage` ang susi _presence_, kaya ang isang lipas na marka ng pagsasalin ay nasasakop;
- Sinusubaybayan `check-translation-drift` ang dokumentasyon `docs/i18n/<locale>/**.md` na sumasalamin — hindi ito nagbabasa `src/i18n/messages/*.json`. Pag-block sa `docs-sync-strict` ng trabaho mula noong 2026-09 muling pag-sync: mag-edit ng core doc → `npm run i18n:run -- --files=<doc>` (section-level, mura).

**Diff-aware, hindi baseline-backed.** Inihahambing nito `en.json` sa merge base laban sa working tree; para sa bawat susi na nagbago ang halaga sa Ingles, ang anumang lokal na may hawak pa ring hindi ginalaw na pagsasalin ay lipas na. Ito ay sadyang** nag-freeze ng dati nang utang** Hindi maihayag — a diff kung saang lumang Ingles nagmula ang isang matagal nang pagsasalin, kaya hinuhusgahan lamang ng gate kung ano ang naaapektuhan ng kasalukuyang pagbabago. Ang kahalili (isang per-key hash baseline) ay magkakahalaga ng ~ 600 KB na nabuong file, 3 × ang pinakamalaking umiiral na baseline, na umuusad sa bawat i18n PR.

Dalawang paraan upang masiyahan ito:

1. i-update ang mga apektadong pagsasalin, o
2. itakda ang mga ito sa `__MISSING__:<new english>` — ang runtime pagkatapos ay ihahatid ang naitama na English (`src/i18n/request.ts::deepMergeFallback`, #7258) at ang mga pangunahing pila para sa pagsasalin.

Kung ang string ay** ibig sabihin** nagbago, mas gusto** pagpapalit ng pangalan ng susi** : ang isang bagong susi ay hindi maaaring magmana ng lipas na pagsasalin. Iyan ang pattern na ginamit #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Lumalabas sa 0 na may `SKIP reason=base-unresolved` kapag hindi mababasa ang base catalog (mababaw na clone na walang base ref), nagmi-mirror ng `check-openapi-breaking`.

### Trabaho: `i18n`

Buong i18n validation matrix (isang trabaho bawat lokal). Ang buong trabaho ay pagpapayo.

| Script                          | Pinapatunayan                         | Hinaharang                                                |
| ------------------------------- | ------------------------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | Pagkumpleto ng pagsasalin bawat lokal | **Advisory** (`continue-on-error: true` sa buong trabaho) |

### Trabaho: `pr-test-policy`

Gumagana sa mga pull request lang.

| Script                 | Pinapatunayan                                                                                                                                                   | Hinaharang |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PRs na nagbabago ng code ng produksyon sa `src/`, `open-sse/`, `electron/`, o `bin/` ay dapat magsama o mag-update ng mga pagsubok (Hard Rule #8)               | Oo         |
| `check:test-masking`   | Ang mga binagong test file ay hindi nakakabawas sa bilang ng net assert o nagdaragdag ng `assert.ok(true)` tautologies                                          | Oo         |
| `check:pr-evidence`    | PR body ay nagbanggit test/VPS na ebidensya para sa pagbabago (ginagawa ang Hard Rule #18 sa pamamagitan ng pagkuha ng PR prose — fragile, tingnan ang Backlog) | Oo         |

### Trabaho: `test-vitest`

Tinatakbuhan si `build`. Ang mga bloke ay nagsasama sa kabiguan.

| Suite            | Pinapatunayan                                           | Hinaharang                                                                                                                                   |
| ---------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 tool), autoCombo, cache — vitest runner | Oo                                                                                                                                           |
| `test:vitest:ui` | UI component tests — vitest runner                      | **Hinaharang** — dati nang umiiral na pagkabigo ay tahasang hindi kasama sa `vitest.config.ts`; ang mga bagong kabiguan ay nabigo sa trabaho |

### Mga daloy ng trabaho sa gabi (naka-iskedyul, advisory)

Ang mga ito ay tumatakbo sa isang cron schedule (at `workflow_dispatch`), hindi kailanman sa PRs. Lahat ay payo.

| Daloy ng trabaho       | Pinapatunayan                                                                                                                                                | Hinaharang   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| `nightly-property`     | mabilis na suriin ang mga pagsubok sa ari-arian na may random na seed + mataas na bilang ng pagtakbo                                                         | **Advisory** |
| `nightly-resilience`   | heap-growth gate, chaos fault-injection, k6 load/soak                                                                                                        | **Advisory** |
| `nightly-llm-security` | promptfoo injection guard (block mode) + garak probes (nilaktawan nang walang lihim ng provider)                                                             | **Advisory** |
| `nightly-schemathesis` | OpenAPI contract fuzzing (schemathesis) laban sa isang live OmniRoute gamit ang `docs/openapi.yaml` — surfaces spec violations / unhandled 500s (Fase 8 B.4) | **Advisory** |
| `nightly-mutation`     | Stryker mutation-testing score sa fast unit lane — surviving mutants surface weak asserts                                                                    | **Advisory** |
| `nightly-compat`       | Node engine compatibility matrix sa mga sinusuportahang hanay `engines.node`                                                                                 | **Advisory** |

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
- **advisory** — ang kabuuang global kumpara sa naka-freeze na baseline. Hindi kailanman
  nagpapapula sa isang walang-salang PR ang minanang drift; muling fini-freeze ang drift sa
  release reconciliation at sinusubaybayan ng headroom job.

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

Ang bawat gate na hindi mabibigo sa mga umiiral nang paglabag ay gumagamit ng nakapirming allowlist (hal., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Ang patakaran ay:

**Ayusin ang ugat na sanhi; gamitin lang ang allowlist kapag ang paglabag ay dati nang umiiral at hindi maaayos sa parehong PR.**

Kapag nagdaragdag ng entry sa isang allowlist:

1. Magsama ng komento na may katwiran.
2. Sanggunian ang isyu sa pagsubaybay (hal., `// #3498 — Phase 2 feature, not yet implemented`).
3. Alisin ang entry sa parehong PR na nag-aayos ng paglabag — isang lipas na entry na hindi na pinipigilan ang isang aktibong paglabag ay isang depekto mismo (6A.3 lipas na-pagpapatupad ay mabibigo ang gate sa isang ulila allowlist entry kapag ipinatupad).

Gawin** hindi** magdagdag ng mga entry sa allowlist para mas mabilis na makapasa ang mga pagsusulit. Ang isang berdeng gate na may lumalagong allowlist ay isang maling kahulugan ng kalidad.

### Kapag nabigo ang isang gate sa iyong PR

1. **Basahing mabuti ang output ng gate** — ito ay nagsasabi sa iyo nang eksakto kung aling file o simbolo ang lumabag sa panuntunan.
2. **Ayusin ang paglabag** — karamihan sa mga gate ay deterministic filesystem checks na pumasa sa sandaling tama ang code.
3. **Kung ang paglabag ay dati nang umiiral** (ibig sabihin, hindi mo ito ipinakilala ngunit nasasakop na ito ngayon ng gate): magdagdag ng entry ng allowlist na may komento sa pagbibigay-katwiran at isyu sa pagsubaybay.
4. **Kung ang gate ay kalansing** (saklaw, mga babala ESLint, pagdoble, pagiging kumplikado): pinalala ng iyong pagbabago ang sukatan. Ayusin ang pinagbabatayan na isyu, o (bihirang) patakbuhin `npm run quality:ratchet -- --update` kung ang pagbabago ay sinadya at ang pagbabawas ng sukatan ay katanggap-tanggap — ngunit idokumento kung bakit sa paglalarawan PR.
5. **Advisory gate** (`continue-on-error: true`) ay nagbibigay-kaalaman — hindi nila hinaharangan ang pagsasama ngunit lumalabas sa buod CI. Ayusin mo pa rin sila.

---

## Pagdaragdag ng Bagong Gate

1. Gumawa ng `scripts/check/check-<name>.mjs` (o `.ts`). Ang mga policy gate ay nag-e-exit nang 0/1.
   Ang mga ratchet-style gate ay naglalabas ng metric sa `quality-metrics.json` sa pamamagitan ng `collect-metrics.mjs`.
2. Idagdag ang `"check:<name>": "node scripts/check/check-<name>.mjs"` sa `package.json`.
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

## Rationalization Backlog (ROI review — Fase 9 Onda 3)

Nakipagkasundo ang imbentaryo na ito laban sa `ci.yml` noong 2026-06-17 (inalis sa naunang bersyon `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence`). Tinukoy ng isang ROI review ng reconciled set ang mga sumusunod na kandidato sa rasyonalisasyon.** Ang mga pagsasanib ay mekanikal na pagbabago CI ; ang flips/drops ay mga desisyon sa patakaran na nakalaan para sa operator.** Wala pang nalalapat sa ibaba.

**Hindi rin dokumentado sa itaas** (advisory, mababang signal): ang `docs-lint` job (markdownlint + Vale, whole job `continue-on-error`) at ang standalone scanner workflows `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` ay nasa `quality-baseline.json` ngunit hindi naka-wire sa isang nakaharang na ratchet sa `ci.yml` — ang sukatan ay kasalukuyang naulila.

### Pagsamahin / pagtanggal (mekanikal, mas mababang panganib)

Ang bawat kandidato ay napatunayan laban sa live gate state noong 2026-06-17 (trust-but-verify); ilang "halatang" pagsasanib pala ang nagtago ng utang at ay** hindi** malinis na drop-in.

- **dalawang beses tumakbo `check:docs-sync`** — standalone sa `lint` job at muli sa loob `check:docs-all` (`docs-sync-strict`) at ang husky pre-commit hook. ✅**DONE** — standalone `lint` invocation inalis.
- **CVE pag-scan** — ❌**NOT isang malinis na pagsasama.** Hinaharangan ng `audit:deps` ang mga kritikal na advisory at hindi kumpletong pag-audit sa lahat ng limang lockfile, habang nag-uulat ng matataas na advisory bilang mga babala sa ilalim ng kasalukuyang patakaran; `check:vuln-ratchet` (osv) ay nabigo lamang sa isang _regression_ vs sa naka-check-in na baseline at tinatanggihan ang mga nawawalang sukat kapag kinakailangan. Ang iba't ibang semantics — dropping `audit:deps` ay mawawala ang ganap na kritikal na gate at ang mga independent package audit na resibo. Panatilihin pareho.
- **Pagtuklas ng ikot** — ✅**DONE** (#15159 G-01/G-02). Tinawag ng lumang text dito `check:cycles` na "ang berde, na-curate" na gate at nabigyang-katwiran na panatilihin itong naka-block dahil nag-ulat ang `check:circular-deps` (dpdm) ng 91 na cycle. Ang berdeng iyon ay a** maling berde** : Nag-scan `check:cycles` ng 5 subdirectory (450 file), tumugma lang sa static `import|export … from`, at ibinaba ang bawat `@/` at `@omniroute/open-sse/` specifier, kaya hindi nito makita ang mga dynamic-import na + alias cycle na nangibabaw sa repo. Naayos: ang gate ay lumalakad na ngayon `src` + `open-sse` (5023 na mga file), nangongolekta ng mga specifier mula sa TypeScript AST (kaya `import("…")` ay binibilang at ang uri-posisyon `typeof import("…")` ay hindi), at niresolba ang tsconfig `paths`. Nahanap nito** 14** cycle, hindi 0. Dahil hindi maaayos ang 14 na dati nang cycle sa isang gate PR, `check:cycles` ay isa na ngayong** kalansing** (`--ratchet`, ceiling `metrics.cycles.value = 14` in `quality-baseline.json`, `direction: down`) — hinaharangan nito ang anumang _regression_ at ang bilang ay maaari lamang mahulog. CI tumatakbo `npm run check:cycles:ratchet`. Burn-down rides na may**A-01** . `check:circular-deps` (dpdm) ay nananatiling advisory bilang mas malawak na pangalawang opinyon.
- **Pagiging kumplikado** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): isang ESLint walk, binibilang ng ruleId kaya ang cyclomatic + max-lines at cognitive baselines ay mananatiling independent; indibidwal `check:complexity` / `check:cognitive-complexity` ay nananatili para sa lokal na `--update`.
- **`/api` anti-hallucination** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): isang FS na imbentaryo ng `src/app/api`, independiyenteng nag-uulat pa rin ang mga openapi-ruta + docs-symbols; ang mga indibidwal ay nananatili para sa mga lokal na pagtakbo.
- **`check:node-runtime` ay tumatakbo sa 11 mga trabaho** — ⚠️** mababang ROI.** Ang bawat isa ay isang hiwalay na runner at ang tseke ay < 1s; kabuuang ipon ~ 10s, laban sa pagkawala ng murang per-job guard. Hindi katumbas ng halaga ang churn.
- **`typecheck:noimplicit:core` sa CI lint** — ✅** tinanggal mula sa lint job** (ay advisory `continue-on-error`); uri ng pagharang sa ibabaw ay `typecheck:core` + `check:type-coverage`. Napanatili ang lokal na script.

### I-flip / magpasya (patakaran ng operator)

- `check:openapi-security-tiers` (advisory) — ❌**NOT malinis na flippable.** Lumalabas ito sa 0 ngunit nagbabala na maraming mga ruta `traffic-inspector` sa ilalim ng `LOCAL_ONLY_API_PREFIXES` ay kulang sa `x-loopback-only: true` annotation. Ang pagpapatupad nito ay nangangailangan ng pagdaragdag ng mga anotasyong iyon sa `openapi.yaml` muna.
- `typecheck:noimplicit:core` (advisory) — na higit sa lahat ay napapailalim sa nakaharang `check:type-coverage` ratchet. I-flip sa isang kalansing o i-drop ang paulit-ulit na pangalawang `tsc` pass.
- `test:vitest:ui` (ngayon** pagharang** ) — pre-existing failure ay tahasang ibinukod sa `vitest.config.ts` na may mga komento sa pagsubaybay ng `// #8618` ; ang mga bagong kabiguan ay nabigo sa trabaho.
- `check:secrets` (gitleaks, blocking ratchet frozen sa 3 dokumentadong false-positive) — allowlist ang 3 para umabot sa 0, o i-demote sa advisory. Nag-o-overlap GitHub native na secret-scanning + `check:public-creds`.
- `check:pr-evidence` (pagharang, greps PR-body prose) — mataas na false-positive na panganib; nagpapahina sa pagpapatupad ng Hard Rule #18 kung ibinaba, kaya ito ay isang tunay na tawag sa patakaran.
- `semgrep` (nag-iisang advisory) — ay pumapatong sa CodeQL para sa mga pamilyang OWASP ; i-wire ang baseline nito sa isang ratchet o drop.

---

## Kaugnay na Dokumentasyon

- Supply-chain (provenance, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — key-set parity gate

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, trabaho `i18n-ui-coverage`). Ikinukumpara ang leaf key set ng bawat `src/i18n/messages/<locale>.json` sa `en.json` at nabigo sa anumang absent o dagdag na leaf, kahit kailan idinagdag ang key. Ang mga placeholder `__MISSING__:` ay binibilang bilang kasalukuyan (ang kanilang nilalaman ay ang negosyo ng gate ng ratio). Ito ang ganap na komplemento ng dalawang gate diff-based/percentage : nagpapatupad `check-ui-keys-coverage` ng 80 % floor bawat locale (43 absent keys mula sa ~ 13,000 ay 99.7 %) pa rin ang nababasa at `check-new-key-coverage` ay naghuhusga lamang ng mga key na idinaragdag ng PR sa `en.json`. Ang isang lokal na batch ay nabuo mula sa `en.json` ng araw na ang sangay nito ay pinutol at nagsasalin ng ilang araw habang ang base ay patuloy na nagdaragdag ng mga susi; ang batch PR ay hindi nagdaragdag ng susi mismo, kaya ang magkapatid ay nanatiling tahimik nang ang batch 1 (#13044) ay nakakuha ng 43 keys short sa siyam na lokal at batch 2 (#13660) 10 keys short sa walo (2026-09-15). Ayusin ang isang pula na may `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; ang isang dahon `extra` ay nangangahulugan na ang pinagmulan ay naghulog nito — tanggalin ito mula sa lokal. `--warn` na nag-uulat nang hindi nabigo. `--catalog=cli` ay nagpapatakbo ng parehong paghahambing sa `bin/cli/locales` (`npm run i18n:check-keys:cli`); parehong mga hakbang ay nakatira sa trabaho `i18n-ui-coverage`.

#### `check-new-key-coverage` — bagong-key i18n gate

Kapatid ni `check-ui-value-drift`. Ang isang iyon ay nakakakuha ng halaga sa Ingles noon** muling isinulat** habang ang mga salin nito ay naiwan; ang isang ito ay nakakakuha ng isang English key noon** idinagdag** habang ang ilang mga lokal ay hindi kailanman nakatanggap nito.

Hindi nakikita `check-ui-keys-coverage` ang klase na ito: nagpapatupad ito ng porsyentong palapag sa bawat lokal, at labing-isang absent key sa ~ 13,000 ang nag-iiwan ng coverage sa 99.9%. Ang isang porsyento sa bawat wika ay hindi maaaring magpahayag ng "ang tampok na ito na naipadala na hindi naisalin" — ang isang buong tampok ay maaaring mapunta sa isang bagong lokal na walang teksto at hindi kailanman ilipat ang numero.

Ang insidente na ine-encode nito: Isinalin ng Phase 3 ng Orchestration Canvas ang labing-isang key nito sa 42 lokal na umiiral noong panahong iyon. Pagkalipas ng ilang oras, dinala ng batch ng EU-language (#13044) ang repo sa 51 na lokal, at hindi natanggap ng siyam na bagong dating (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ang mga ito. Pinapalitan ng `deepMergeFallback` ang English para sa isang absent na key, kaya ang failure mode ay hindi naisalin na UI sa halip na blangko UI — real, at tahimik sa pamamagitan ng pagbuo.

Katulad ng kapatid nito** diff-aware** , ang paghahambing ng English sa merge base laban sa working tree, kaya ang mga dati nang gaps ay mananatiling frozen at ang gate ay hindi nangangailangan ng paglipat upang i-on.

**Hindi ito natutugunan ng marker `__MISSING__:<english>` (mula noong 2026-09-17).** Dati itong dokumentadong deferral — ang runtime ay bumabalik upang itama ang English — hanggang sa walong feature PRs noong 2026-09-16 ay nagdagdag ng 61 na susi at itinatak ang marker sa lahat ng 65 lokal na lugar sa halip na isalin: tinanggap ng gate na ito ang bawat isa, walang nakaharang sa PRs, at ang pag-block sa bawat real-translation ratio na gate ay nabigo pagkatapos 3BR. > 2.5 % + 0.5). Ang isang marker ay hinuhusgahan na ngayon bilang isang walang pagsasalin. Ayusin ang pula na may `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, o lahat ng lokal na kahanay ng `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`, detached-safe, tumangging magsimula nang wala ang `OMNIROUTE_TRANSLATION_*` env). Ang isang susi na dapat manatili sa Ingles (isang naka-pin na product/engine/flag na pangalan) ay nasa `scripts/i18n/untranslatable-keys.json`, hindi kailanman nasa likod ng isang marker. tahasan na ipinagbabawal `vi` ang mga marker (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — parked-test gate

Ang isang file sa `exclude` list ni `vitest.config.ts` ay isang pagsubok na hindi tumatakbo, at mukhang saklaw ito sa sinumang nagbabasa ng puno. Animnapu't dalawang file ang naipon sa likod ng komento `// #8618 — pre-existing failure; remove this exclusion when fixed`. Ang isyung #8618 ay isinara noong 2026-08-11 habang ang listahan na sinusubaybayan nito ay lumago mula 45 entry hanggang 62, bawat isa ay nagmana ng komentong tumuturo sa isang patay na isyu. Kapag ang listahan ay sa wakas nasusukat file sa pamamagitan ng file (#13204),** 51 sa 62 ay pumasa laban sa kasalukuyang puno na walang pagbabago sa pinagmulan** .

Ang gate ay nangangailangan ng bawat pagbubukod na lumulutas sa isang tunay na file upang (a) pangalanan ang isang isyu sa pagsubaybay at (b) lumabas sa `config/quality/vitest-exclusions.json` kasama ang nasusukat na katayuan nito, kaya ang pagdaragdag ng isa ay isang nasusuri na pagkakaiba sa isang nakatalagang file sa halip na isa pang linya sa isang 60-entry array. Sinadya nitong hindi muling patakbuhin ang mga ibinukod na pagsusulit — na nagkakahalaga ng ~ 10 minuto at kabilang sa isang pana-panahong trabaho; ang mga talaan ng imbentaryo kung kailan huling sinukat ang bawat isa.
