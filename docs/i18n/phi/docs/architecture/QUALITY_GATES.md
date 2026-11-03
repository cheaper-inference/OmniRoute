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

Ang mga workflow na CI at Quality Gates ay parehong naglalabas ng matatag na hatol: `Gate / CI` at
`Gate / Quality`. Itinatala ng patakaran sa pagtanggap na may bersyon ang bawat upstream
job bilang kinakailangan o advisory. Dapat magtagumpay ang isang naaangkop na kinakailangang
job: hindi makapagtatatag ng PASS ang mga nawawala, nakansela, nalaktawan, nakabinbin at
hindi kilalang resulta. Maaaring gawing hindi naaangkop ang isang code lane ng wastong
docs-only o catalog-only na klasipikasyon; hindi tinatanggap na kandidato ang draft PR.
Hindi isinasantabi ng label na `hotfix` ang kinakailangang ebidensya.

Sinasaklaw ng parehong workflow ang mga PR papunta sa main/release branch, mga push sa
`main`, manual dispatch at mga merge-group event. Isinasagawa ng push, dispatch at
merge-group ang buong selection. Hindi sinisimulan ng mga push sa `release/**` ang mga ito
(2026-10-18): tumakbo na ang bawat pagbabago sa matrix sa PR nito, at trabaho ng Release-Green
ang pinagsamang resulta (`docs/ops/RUNNER_BOX.md` → Hosted lane). Gumagamit ang mga fork
at merge group ng hosted runner para sa mga job na karaniwang pumipili ng self-hosted
runner; dapat beripikahin ang sapat na hosted capacity bago ang rollout.

Tinutukoy ng bawat JSON receipt ang SHA na na-check out, workflow run at pagtatangka.
Tinatanggihan ng CLI ang hindi pagtutugmang checkout/event SHA. Itinatali ng mga workflow
test ang pagiging kabilang sa policy sa listahan ng `needs` ng verdict job upang hindi
tahimik na mawala ang isang bago o tinanggal na lane. Sinasaklaw ng mga receipt ang
kanilang sariling workflow, hindi ang publication, deployment, o mga panloob na bahagi
ng isang umiiral na advisory scanner. Hiwalay na administratibong pagbabago ang pag-activate
ng parehong pangalan ng check sa mga panuntunan ng branch; hindi awtomatikong pinoprotektahan
ng pagdaragdag ng mga job na ito ang isang branch.

### Imbentaryo ng static scan

Nasa `config/quality/gate-manifest.json` ang versioned npm-alias inventory at membership
ng static scan. Patakbuhin ang `npm run check:gate-manifest` upang mapatunayan ang mga pangalan
ng script at eksaktong command laban sa `package.json`; nagdudulot ng pagkabigo sa local hook
at sa mga change-classification job sa CI ang mga pagdaragdag, pagtanggal at paglihis ng
command. Ang alias ay hindi workflow job, matrix instance o test case: hindi dapat ilahad
ang mga bilang na ito na para bang napagpapalit.

Gamitin ang `npm run quality:scan -- --list` o `npm run quality:scan:fast -- --list`
upang siyasatin ang mga napiling alias nang hindi isinasagawa ang mga ito. Tinatawag ng
runner ang npm entrypoint, kaya napapanatili ang runtime nito (kabilang ang Bun kung
nakasaad ang configuration). Itinatala ng manifest ang mga alias na nasa labas ng mga
profile na iyon bilang hiwalay na tinatawag, at ipinagbabawal ang mga maintenance command
sa mga read-only scan profile.

Ang mga profile na ito ay para lamang sa static scan. Hindi nila pinatutunayan ang mga
product test, coverage, packaging, external check o buong release acceptance ng isang
kandidato. Ginagamit ng workflow admission ang naka-link na
`config/quality/admission-policy.json` at `scripts/quality/admission-verdict.mjs`.
Hiwalay ang mga release-observer profile; siyasatin nang magkahiwalay ang mga naaangkop
nitong check at receipt. Ang imbentaryong prose sa ibaba ay sanggunian lamang, hindi patunay
na aktuwal na tumakbo ang isang gate.

Nasa ilalim ng `scripts/check/` ang mga script (mga policy gate), at nasa
`scripts/quality/` ang mga ito (ratchet engine). Ang pinagmumulan ng katotohanan para sa CI
ay `.github/workflows/ci.yml`.

### Mabilis na landas para sa Release PR (`quality.yml`)

Kinukumpleto ng `.github/workflows/quality.yml` ang CI sa mga main/release PR, mga push sa `main`,
dispatch at mga merge group. Gumagamit ang mga PR ng mga fast check na sinala ayon sa path.
Inalis na ang permanenteng hindi pinaganang duplicate build; nananatili sa CI ang aktuwal na
build/package/boot check.

| Job                                              | Saklaw                                                                                                                                                                                                                            | Nakakaharang              |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `Docs Gates (fast-path)`                         | Mga docs/code PR; mga ref ng API docs at docs-all                                                                                                                                                                                 | Oo                        |
| `Fast Quality Gates`                             | Mga code PR; static check, typecheck, dashboard typecheck, mga naapektuhang unit test                                                                                                                                             | Oo                        |
| `Forgotten sibling tests`                        | Mga code PR; mga binagong module na sinusundan patungo sa mga static consumer at candidate sibling test; iniuulat bilang advisory diagnostic ang mga barrel at dynamic-import path, kasama ang mga tinukoy na allowlist exception | **Advisory**              |
| `Vitest (fast-path)`                             | Mga code PR; mabilis na vitest suite                                                                                                                                                                                              | Oo                        |
| `Unit Tests fast-path`                           | Mga code PR; unit suite na may 4 na shard                                                                                                                                                                                         | Oo                        |
| `No new ESLint warnings`                         | Mga code PR; lint guard na may kamalayan sa mga suppression                                                                                                                                                                       | Oo, kabilang ang mga fork |
| `Merge integrity (changelog + generated skills)` | Mga hindi-draft na PR; pag-sync ng changelog at generated skill                                                                                                                                                                   | Oo, kabilang ang mga fork |

#### Ulat ng Forgotten sibling tests

Muling ginagamit ng `npm run check:forgotten-sibling-tests` ang import resolver na nasa likod ng test-impact map.
Para sa bawat binagong production module, nag-uulat ito ng mga deterministic na chain na
`changed module/symbol -> static consumer -> candidate sibling test` kapag wala ang candidate
test sa diff ng pull request. Pinananatili ang buod na Markdown at resulta sa JSON bilang
artifact ng workflow na `forgotten-sibling-tests` para sa calibration bago ang anumang rollout na magba-block.

Ang mga barrel re-export at dynamic import ay diagnostic lamang para sa resolution; hindi sila kailanman lumilikha ng
blocking finding. Ang mga nasuring exception ay nasa
`config/quality/forgotten-sibling-allowlist.json`. Dapat pangalanan ng bawat entry ang consumer at candidate
test, magbigay ng partikular na rationale, at mag-link sa isang GitHub issue o pull request. Ang mga entry na mali ang format ay nagfa-fail closed. Hindi maaaring gamitin ang mga exception upang supilin ang isang tinanggal na candidate test o isang diff na nagdaragdag ng `.skip`/`.todo`;
ang pagpapahina ng mga assertion at iba pang masking ay saklaw ng hiwalay at nagba-block na
`check:test-masking` gate.

### Job: `lint`

Tumatakbo sa bawat PR papunta sa `main`. Hinaharangan ang merge kapag nabigo.

| Script (`npm run ...`)            | Nagbe-validate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Nagba-block                                                |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `check:node-runtime`              | Ang bersyon ng Node.js ay nasa loob ng sinusuportahang saklaw                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Oo                                                         |
| `check:cycles`                    | Mga circular import sa lahat ng `src/` + `open-sse/` (batay sa AST, nira-resolve ang `paths` ng tsconfig). Ang bare ay lumalabas na may exit code 1 kapag may anumang cycle (fail-closed mula pa sa #15281) at inililista ang mga SCC. Ang `check:cycles:ratchet` (ang pinapagana ng CI) ay nagba-block kapag lumampas ang bilang sa ceiling ng `metrics.cycles` sa `quality-baseline.json` — kasalukuyang 14, `direction: down`, kaya maaari lamang itong bumaba (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Oo (ratchet)                                               |
| `check:boundary`                  | Coupling ng `open-sse → src`: mga natatanging file-to-file import mula sa engine papunta sa app (`scripts/quality/measure-boundary.mjs`; ang listahan ng mga edge ay backlog ng remediation para sa v4 core/module-split). Ang bare ay advisory report (kapareho ng `quality:boundary`). Ang `check:boundary:ratchet` (ang pinapagana ng CI, kasama rin sa ratchet loop ng mga fast-gate ng `quality.yml`) ay nagba-block kapag lumampas ang bilang sa ceiling ng `metrics.boundaryOpenSseToSrc` sa `quality-baseline.json` — sinimulan sa nasukat na 771, `direction: down`; ibinababa lamang ito ng `--update`; base-relative sa mga PR (`--base-ref`, tingnan sa ibaba)                                                                                                                                                                                                                                                                                                  | Oo (ratchet)                                               |
| `check:route-validation:t06`      | May mga Zod schema sa lahat ng route (patakaran para sa Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Oo                                                         |
| `check:any-budget:t11`            | Hindi lalampas sa budget ang bilang ng `@ts-expect-error // any` (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Oo                                                         |
| `check:provider-consistency`      | Ang bawat provider sa `providers.ts` ay may katugmang entry sa `providerRegistry.ts` (at gayundin ang kabaligtaran, ayon sa allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Oo                                                         |
| `check:model-lifecycle`           | Nananatiling pare-pareho ang tatlong routing table na mano-manong pinapanatili kumpara sa naka-check-in na lifecycle snapshot (#11503): ang `FITNESS_TABLE` (`taskFitness.ts`) ay hindi nag-iiskor ng retiradong id na maaaring i-route ng `REGISTRY`; ang bawat target ng `BUILT_IN_ALIASES` ay nasa `REGISTRY` at wala sa snapshot ng mga retiradong id; ang bawat retiradong id na nasa `REGISTRY` pa rin ay ipinapasa o nakalista sa `allowedRetiredInCatalog`; at walang source o target ng `DEFAULT_DEGRADATION_MAP` ang lumilitaw na retirado sa snapshot na iyon. Hindi nito pinatutunayang kasalukuyang inihahatid ang isang modelo ng isang aktibong upstream. Offline — naghahambing sa `config/quality/model-lifecycle.json`, na mano-manong nire-refresh gamit ang `npm run quality:refresh-model-lifecycle` (network; hindi ikinokonekta sa CI). Ang `allowedRetiredInCatalog` ay isang burn-down ratchet: magdagdag lamang ng entry kung may tracking issue. | Oo                                                         |
| `check:fetch-targets`             | Ang bawat `fetch("/api/...")` sa client-side na `src/` ay tumutukoy sa isang aktuwal na `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Oo                                                         |
| `check:deps`                      | Ang lahat ng dependency na maaaring i-`npm install` sa bawat `package.json` sa repository ay nasa `dependency-allowlist.json`; ifa-flag ang mga bagong package na walang pinning o slopsquatted                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Oo                                                         |
| `audit:deps`                      | `npm audit` (root + electron) — walang high/critical na advisory (nagkakapatong sa osv na `check:vuln-ratchet`; tingnan ang Backlog ng Rationalization)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Oo                                                         |
| `check:lockfile`                  | Integridad ng `package-lock.json` — https registry, mga integrity hash, walang override ng host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Oo                                                         |
| `check:licenses`                  | SPDX license allowlist para sa mga production dependency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Oo                                                         |
| `check:tracked-artifacts`         | Walang build artifact / naka-commit na `node_modules` symlink (tumatakbo rin sa husky pre-commit; sadyang magaan ang pre-push — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Oo                                                         |
| `check:ai-attribution`            | Walang AI/bot na `Co-Authored-By` trailer o AI-generation footer sa mga PR commit, pamagat, o katawan — Hard Rule #16 (nasa `quality.yml` fast-gates loop para sa PR→`release/**` — binabasa ang event payload, walang ginagawa sa labas ng mga PR — at isang PR-only step sa `ci.yml` lint para sa PR→`main`; pati sa husky `commit-msg` hook; pinapayagan ang mga human co-author; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:vitest-exclusions`         | Ang bawat Vitest exclusion ay tumutukoy sa isang tracking issue at lumilitaw sa `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Oo                                                         |
| `check:file-size`                 | Ang mga source file (`.ts`/`.tsx` sa `src/`, `open-sse/`, `electron/`, `bin/`) ay dapat manatili sa loob ng `cap`, at ang mga test file (`*.test.ts(x)`) sa loob ng `testCap`; ang mga file na naka-freeze sa `file-size-baseline.json` (`frozen` / `testFrozen`) ay hindi dapat lumampas sa naitalang laki ng mga ito                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Oo                                                         |
| `check:error-helper`              | Gumagamit ang mga error response sa mga executor/handler ng `buildErrorBody()` / `sanitizeErrorMessage()` (Mahigpit na Panuntunan #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Oo                                                         |
| `check:migration-numbering`       | Sunod-sunod ang pagnumero sa mga migration SQL file, walang puwang o mga duplicate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Oo                                                         |
| `check:public-creds`              | Walang literal na OAuth na `client_id`/`client_secret` o mga Firebase Web key sa labas ng `publicCreds.ts` (Mahigpit na Panuntunan #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Oo                                                         |
| `check:db-rules`                  | Walang raw SQL sa labas ng mga module sa `src/lib/db/`; walang barrel import mula sa `localDb.ts` (Mahigpit na mga Panuntunan #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Oo                                                         |
| `check:known-symbols`             | Ang mga provider executor, routing strategy, at translator na nakarehistro sa kanilang mga dispatch table ay tumutugma sa mga file sa disk — walang mga naiwang orphan o hindi naideklarang symbol                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Oo                                                         |
| `check:route-guard-membership`    | Ang bawat route na naglulunsad ng child process ay inuri ng `isLocalOnlyPath()` (Mahigpit na mga Panuntunan #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Oo                                                         |
| `check:test-discovery`            | Ang bawat `*.test.ts` / `*.spec.ts` na file sa repo ay nakokolekta ng kahit isang test runner (ratchet: maaari lamang lumiit ang orphan list sa `test-discovery-baseline.json`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Oo                                                         |
| `check:test-tla-order`            | Walang `node:test` file sa ilalim ng `tests/unit` na nagrerehistro ng test, tumatama sa isang top-level na `await`, at pagkatapos ay nagrerehistro pa ng iba (#18045; ratchet: maaari lamang lumiit ang `test-tla-order-allowlist.json`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Oo                                                         |
| `check:agent-skills-sync`         | Ang mga nabuong artifact ng agent-skills ay tumutugma sa kanilang source catalog (walang drift)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:provider-asset-provenance` | Ang mga logo/asset ng provider ay may nakatalang entry ng provenance                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `lint:json`                       | Napo-parse ang mga JSON config file at nakatutugon ang mga ito sa mga panuntunan ng lint ng repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `typecheck:core`                  | TypeScript compilation na walang error (mga babalang para sa impormasyon lamang)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Oo                                                         |
| `typecheck:noimplicit:core`       | Mahigpit na `noImplicitAny` — para sa hinaharap; marami pa ring dati nang call site ang nangangailangan ng mga annotation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **Para sa impormasyon lamang** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` na limitado sa `src/app/(dashboard)/**` (#7033) — hindi kasama ng curated na 27-file allowlist ng `typecheck:core` ang anumang dashboard TSX, at hindi rin ito tina-type-check ng `next build` (`next.config.mjs` ay nagse-set ng `ignoreBuildErrors: true`), kaya hindi nakikita ng CI ang mga regression ng orphaned identifier doon (#6625/#6909). Kinukumpara ang mga diff sa isang nakapirming baseline ng bilang bawat file/bawat TS code (`config/quality/dashboard-typecheck-baseline.json`, kapareho ng stale-enforcement pattern ng `check:known-symbols`) — mga BAGONG error lamang na lampas sa naka-baseline na bilang ang magpapabagsak sa gate; ibaba ang ratchet gamit ang `--update` kapag naayos ang isang dati nang error.                                                                                                                                                                                                                         | Oo                                                         |

### Job: `quality-gate`

Tumatakbo pagkatapos ng `test-coverage`. Hinaharangan ang merge kapag nabigo.

| Script                       | Vine-validate                                                                                                                                                                                                                     | Humaharang                  |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `quality:collect`            | Naglalabas ng `quality-metrics.json` (bilang ng babala sa ESLint, coverage mula sa pinagsamang shard report)                                                                                                                      | Oo (nasa unahan ng ratchet) |
| `quality:ratchet`            | Hindi nag-regress ang bawat metric sa `quality-baseline.json` (mga babala sa ESLint ≤ baseline; coverage ≥ baseline)                                                                                                              | Oo                          |
| `check:duplication`          | Hindi lumalampas sa baseline sa `quality-baseline.json` ang code duplication (jscpd@4)                                                                                                                                            | Oo                          |
| `check:complexity`           | Hindi lumalampas sa cap ang cyclomatic complexity sa antas ng file (core ESLint `complexity` + `max-lines-per-function`)                                                                                                          | Oo                          |
| `check:cognitive-complexity` | Ratchet ng cognitive complexity (`eslint-plugin-sonarjs`) — hiwalay na ESLint pass; pinapatakbo ng CI ang pareho bilang iisang hakbang na `check:complexity-ratchets`                                                             | Oo                          |
| `check:dead-code`            | Hindi nagre-regress kumpara sa baseline ang ratchet ng mga hindi ginagamit na export / file (knip)                                                                                                                                | Oo                          |
| `check:compression-budget`   | Badyet sa benchmark ng compression — hindi dapat mag-regress ang mga floor ng natipid na token bawat engine                                                                                                                       | Oo                          |
| `check:type-coverage`        | Hindi nagre-regress ang ratchet ng porsiyentong may type (`type-coverage`); higit na sinasaklaw nito ang `typecheck:noimplicit:core`                                                                                              | Oo                          |
| `check:codeql-ratchet`       | Hindi nagre-regress ang bilang ng bukas na CodeQL alert (binabasa sa pamamagitan ng `gh api`; maayos na nag-skip kapag walang token) — para sa cadence ng pag-refresh at manual trigger: tingnan ang “ratchet ng CodeQL” sa ibaba | Oo                          |

### Job: `quality-extended`

Buong job ay advisory (`continue-on-error: true`). Tumatakbo talaga ang mga ratchet na nakabatay sa npm; nag-i-install ang mga external scanner sa pamamagitan ng `gh release download` at kusang nag-skip (exit 0) kapag wala pa ang binary.

| Script                   | Vine-validate                                                                                                                                                                                                                                          | Humaharang                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| `check:circular-deps`    | Walang circular dependency (dpdm)                                                                                                                                                                                                                      | **Advisory**                                                     |
| `check:bundle-size`      | Hindi lumalampas sa cap ang laki ng bundle                                                                                                                                                                                                             | **Advisory**                                                     |
| `check:secrets`          | Pag-scan ng mga lihim (gitleaks) — nag-skip kapag wala ang binary                                                                                                                                                                                      | **Advisory**                                                     |
| `check:vuln-ratchet`     | Hindi nagre-regress ang mga kahinaan sa dependency (osv-scanner) — nag-skip kapag wala ang binary                                                                                                                                                      | **Advisory**                                                     |
| `check:workflows`        | Lint ng workflow (actionlint + zizmor); ang nawawala/sirang scanner, mga hindi valid na report, o nawawalang baseline ng ratchet ay nabibigo bilang INCOMPLETE. Ang mga valid na finding ay sumusunod sa piniling patakaran na strict/advisory/ratchet | Kinakailangan ang execution; humaharang ang zizmor ratchet sa CI |
| `check:openapi-breaking` | Mga breaking change sa pampublikong API contract (`openapi.yaml`) kumpara sa base branch (oasdiff) — naglalabas ng `openapiBreaking=N`; nag-skip kapag wala ang oasdiff o hindi maresolba ang base spec                                                | **Advisory**                                                     |

### Job: `docs-sync-strict`

Tumatakbo sa bawat PR patungo sa `main`. Hinaharangan ang merge kapag nabigo.

| Script                         | Nagva-validate                                                                                                                                                               | Nagba-block                     |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `check:docs-all`               | Meta-gate na sunod-sunod na nagpapatakbo sa 6 na sub-gate sa ibaba                                                                                                           | Oo                              |
| ↳ `check:docs-sync`            | Pagkakatugma ng bersyon sa CHANGELOG / OpenAPI / llm.txt                                                                                                                     | Oo                              |
| ↳ `check:docs-counts`          | Ang mga bilang sa prose (bilang ng provider, bilang ng migration, atbp.) ay nasa loob ng ratchet window ng aktuwal na mga bilang                                             | Oo                              |
| ↳ `check:env-doc-sync`         | Ang bawat env var sa `.env.example` ay nakadokumento sa isang docs table, at vice versa                                                                                      | Oo                              |
| ↳ `check:deprecated-versions`  | Walang deprecated na string ng bersyon sa docs                                                                                                                               | Oo                              |
| ↳ `check:doc-links`            | Ang mga internal na markdown link sa docs ay tumutukoy sa mga aktuwal na file (`[text]`/`(path)` form)                                                                       | Oo                              |
| ↳ `check:fabricated-docs`      | Umiiral sa codebase ang mga route, env var, CLI command, pangalan ng hook, at file path na binabanggit sa docs. Hard gate gamit ang `--strict`; soft-fail kapag walang flag. | Oo (gamit ang `--strict` sa CI) |
| `check:cli-i18n`               | Ang mga string ng CLI command ay nasa lahat ng i18n locale file                                                                                                              | Oo                              |
| `check:openapi-coverage`       | Saklaw ng OpenAPI spec ang hindi bababa sa isang ratcheted floor ng mga aktuwal na route                                                                                     | Oo                              |
| `check:openapi-security-tiers` | Ang mga security tier annotation sa `openapi.yaml` ay naaayon sa mga classification ng `routeGuard.ts`                                                                       | **Pampayo**                     |
| `check:openapi-routes`         | Ang bawat path sa `openapi.yaml` ay tumutukoy sa isang aktuwal na `route.ts` (anti-hallucination)                                                                            | Oo                              |
| `check:docs-symbols`           | Ang bawat `/api/...` reference sa `docs/**/*.md` ay tumutukoy sa isang aktuwal na `route.ts` (anti-hallucination)                                                            | Oo                              |
| `i18n translation drift`       | Mga key na hindi naisalin sa mga i18n locale file — babala lamang                                                                                                            | **Pampayo**                     |

Ang labindalawang README SVG sa ilalim ng `docs/diagrams/` ay binubuo bilang generated files (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` ang muling bumubuo sa lahat ng ito). Ang bawat isa ay may byte-compare unit test
(`tests/unit/docs/readme-*-svg.test.ts`, job na `test-unit`) na nagfa-fail kapag luma na ang naka-commit na file, at binabasa ng `check:docs-counts` ang mga canonical number mula sa kanilang `<text>` nodes — kaya pinananatili ng outlining step ang bawat outlined string sa file bilang invisible na `<text>`. Binabasa ng SVG canonical-numbers check ang mga file na nakalista sa
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, pati ang `public/images/tier-flow-dark.svg` at `tier-flow-light.svg`; binabasa rin ng mga claim na free-forever, catalog-entry, recurring-pool at scoring-factors
ang `promise-pillars.svg`, `free-tier-budget.svg` at `strategies-grid.svg`. Kinukuha ng `free-tier-budget.svg`
ang mga numero nito mula sa live catalog loader, kaya ang pagbabago sa `FREE_MODEL_BUDGETS` o sa display name ng provider ay nagpapabagsak sa CI hanggang sa muling mabuo ang file.

### Job: `i18n-ui-coverage`

| Script                            | Nagva-validate                                                                                                                                                                                                       | Nagba-block |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (inline) | Ang coverage ng UI i18n key ay ≥ 65%                                                                                                                                                                                 | Oo          |
| `check-ui-value-drift` (inline)   | Walang naiiwang lumang translation kapag muling isinulat ang English na **halaga**                                                                                                                                   | Oo          |
| `check-new-key-coverage` (inline) | Ang isang **bagong** English key ay isinalin sa bawat locale — tinatanggihan ang isang `__MISSING__:` marker                                                                                                         | Oo          |
| `check-translation-ratio`         | Ang ratio ng tunay na translation sa bawat locale (magkapareho sa English / placeholder / nawawalang leaves na wala sa allowlist) ay hindi dapat lumampas sa `config/quality/i18n-translation-baseline.json` + slack | **Pampayo** |

Nangangailangan ito ng `fetch-depth: 0` — ikinukumpara ng value-drift gate ang `en.json` sa merge base.

#### `check-ui-value-drift` — gate para sa lumang translation

Nahuhuli nito ang isang i18n regression na hindi nakikita ng iba pang structurally na gate: nire-rewrite ang isang English value at naiiwan ang mga translation na hinango mula sa _naunang_ English, kaya patuloy na nagbabasa ang mga non-English user ng may kumpiyansang pananalita ngunit mali nang copy.

Nangyari talaga ito sa production. Ni-rewrite ang `oauthModal.googleOAuthWarning` nang idagdag ang Antigravity
login helper (#5203); **39 sa 43 locale** ang nagpanatili ng tekstong nagsasabi sa mga operator na “kopyahin ang
buong URL at i-paste ito sa ibaba” — isang flow na hindi makukumpleto para sa provider na iyon. Hindi ito napansin hanggang #8463 dahil:

- Ang `sync-ui-keys` ay nagba-backfill lamang ng mga key na **wala**, hindi ng mga **luma**;
- Binibilang ng `check-ui-keys-coverage` ang _pagkakaroon_ ng key, kaya nakukuwenta bilang covered ang isang lumang translation;
- Sinusubaybayan ng `check-translation-drift` ang mga documentation mirror na `docs/i18n/<locale>/**.md` —
  hindi nito binabasa ang `src/i18n/messages/*.json`. Nagba-block sa job na `docs-sync-strict` mula sa
  2026-09 re-sync: mag-edit ng core doc → `npm run i18n:run -- --files=<doc>` (antas ng seksyon, mura).

**Nakabatay sa diff, hindi sa baseline.** Inihahambing nito ang `en.json` sa merge base laban sa
working tree; para sa bawat key na nagbago ang English value, stale ang anumang locale na may hawak pa ring
translation na hindi ginalaw. Sinasadya nitong **i-freeze ang dati nang utang** — hindi matutukoy ng diff kung saang
lumang English nagmula ang isang matagal nang translation, kaya hinuhusgahan lamang ng gate ang kasalukuyang pagbabago. Ang alternatibo (isang per-key hash baseline) ay mangangailangan ng ~600 KB na generated file, 3× na mas malaki kaysa sa pinakamalaking umiiral na baseline, at magdudulot ng pagbabago sa bawat i18n PR.

Dalawang paraan para makasunod dito:

1. i-update ang mga apektadong translation, o
2. itakda ang mga ito sa `__MISSING__:<new english>` — ihahatid ng runtime ang naiwastong English
   (`src/i18n/request.ts::deepMergeFallback`, #7258) at ilalagay ang key sa queue para sa translation.

Kung nagbago ang **kahulugan** ng string, mas mainam na **palitan ang pangalan ng key**: hindi maaaring
magmana ang isang bagong key ng stale translation. Ito ang pattern na ginamit ng #8463.

```bash
npm run i18n:check-value-drift          # mahigpit (pinapatakbo ng CI)
npm run i18n:check-value-drift:warn     # ulat lamang
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Lumalabas na 0 na may `SKIP reason=base-unresolved` kapag hindi mabasa ang base catalog (shallow
clone na walang base ref), na tumutulad sa `check-openapi-breaking`.

### Job: `i18n`

Buong validation matrix ng i18n (isang job bawat locale). Buong job ay advisory.

| Script                          | Vinavalidate                                  | Blocking                                              |
| ------------------------------- | --------------------------------------------- | ----------------------------------------------------- |
| `validate_translation.py quick` | Pagiging kumpleto ng translation bawat locale | **Advisory** (`continue-on-error: true` sa buong job) |

### Job: `pr-test-policy`

Tumatakbo lamang sa mga pull request.

| Script                 | Vinavalidate                                                                                                                                                             | Blocking |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `check:pr-test-policy` | Ang mga PR na nagbabago ng production code sa `src/`, `open-sse/`, `electron/`, o `bin/` ay dapat maglaman o mag-update ng mga test (Hard Rule #8)                       | Oo       |
| `check:test-masking`   | Hindi binabawasan ng mga binagong test file ang net assert count o nagdaragdag ng mga tautology na `assert.ok(true)`                                                     | Oo       |
| `check:pr-evidence`    | Ang PR body ay bumabanggit ng test/VPS evidence para sa pagbabago (minimekanisa ang Hard Rule #18 sa pamamagitan ng pag-grep sa PR prose — marupok, tingnan ang Backlog) | Oo       |

### Job: `test-vitest`

Tumatakbo pagkatapos ng `build`. Nagba-block ng merge kapag nabigo.

| Suite            | Vinavalidate                                             | Blocking                                                                                                                         |
| ---------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 tools), autoCombo, cache — vitest runner | Oo                                                                                                                               |
| `test:vitest:ui` | Mga UI component test — vitest runner                    | **Blocking** — tahasang hindi isinama ang mga dati nang failure sa `vitest.config.ts`; ibinabagsak ng mga bagong failure ang job |

### Mga nightly workflow (naka-schedule, advisory)

Tumatakbo ang mga ito ayon sa cron schedule (at `workflow_dispatch`), hindi kailanman sa mga PR. Lahat ay advisory.

| Workflow               | Vine-validate                                                                                                                                                                          | Pag-block       |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | Mga property test ng fast-check na may random seed + mataas na bilang ng pagtakbo                                                                                                      | **Payo lamang** |
| `nightly-resilience`   | heap-growth gate, chaos fault-injection, k6 load/soak                                                                                                                                  | **Payo lamang** |
| `nightly-llm-security` | promptfoo injection guard (block mode) + garak probes (nilalaktawan kung walang provider secret)                                                                                       | **Payo lamang** |
| `nightly-schemathesis` | OpenAPI contract fuzzing (schemathesis) laban sa isang live na OmniRoute gamit ang `docs/openapi.yaml` — inilalantad ang mga paglabag sa spec / mga hindi nahawakang 500s (Fase 8 B.4) | **Payo lamang** |
| `nightly-mutation`     | Stryker mutation-testing score sa fast unit lane — inilalantad ng mga mutant na nakaligtas ang mahihinang assert                                                                       | **Payo lamang** |
| `nightly-compat`       | Matrix ng compatibility ng Node engine sa mga sinusuportahang saklaw ng `engines.node`                                                                                                 | **Payo lamang** |

Itinatala ang mga performance baseline (heap, TTFB, oras ng build), ngunit hindi ito ginagamit bilang gate: tingnan ang [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

Ang bawat gate na hindi maaaring mabigo dahil sa mga dati nang paglabag ay gumagamit ng isang nakapirming allowlist
(hal., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Ang patakaran ay:

**Ayusin ang ugat ng problema; gamitin lamang ang allowlist kapag dati nang umiiral ang paglabag at
hindi ito maaayos sa parehong PR.**

Kapag nagdaragdag ng entry sa isang allowlist:

1. Magsama ng komento na nagpapaliwanag ng dahilan.
2. Tukuyin ang tracking issue (hal., `// #3498 — Feature ng Phase 2, hindi pa naipapatupad`).
3. Alisin ang entry sa parehong PR na nag-aayos sa paglabag — ang stale na entry na hindi na
   pumipigil sa isang aktibong paglabag ay isa ring depekto (ang stale-enforcement ng 6A.3 ay
   magpapabagsak sa gate dahil sa isang naulilang allowlist entry kapag naipatupad na ito).

**Huwag** magdagdag ng mga allowlist entry para lamang mas mabilis pumasa ang mga test. Ang berdeng gate na may lumalaking
allowlist ay nagbibigay ng maling pakiramdam ng kalidad.

### Kapag nabigo ang isang gate sa iyong PR

1. **Basahing mabuti ang output ng gate** — eksakto nitong sinasabi kung aling file o simbolo ang lumabag
   sa panuntunan.
2. **Ayusin ang paglabag** — karamihan sa mga gate ay mga deterministikong pagsusuri sa filesystem na papasa sa sandaling
   tama na ang code.
3. **Kung dati nang umiiral ang paglabag** (ibig sabihin, hindi ikaw ang nagpasok nito ngunit saklaw na ito ngayon
   ng gate): magdagdag ng allowlist entry na may komentong nagpapaliwanag ng dahilan at isang tracking issue.
4. **Kung ratchet ang gate** (coverage, mga babala ng ESLint, duplication, complexity):
   pinalala ng iyong pagbabago ang metric. Ayusin ang pinagbabatayang problema, o (bihira lamang) patakbuhin ang
   `npm run quality:ratchet -- --update` kung sinadya ang pagbabago at katanggap-tanggap ang
   pagbaba ng metric — ngunit idokumento ang dahilan sa paglalarawan ng PR.
5. **Ang mga advisory gate** (`continue-on-error: true`) ay nagbibigay lamang ng impormasyon — hindi nila hinaharangan
   ang merge ngunit lumalabas ang mga ito sa buod ng CI. Ayusin pa rin ang mga ito.

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

## Backlog ng Rasyonalisasyon (pagsusuri ng ROI — Fase 9 Onda 3)

Itinugma ang imbentaryong ito sa `ci.yml` noong 2026-06-17 (hindi naisama sa nakaraang bersyon ang
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Natukoy sa pagsusuri ng ROI sa itinugmang hanay
ang mga sumusunod na kandidato para sa rasyonalisasyon. **Ang mga pagsasanib ay mga mekanikal na
pagbabago sa CI; ang mga paglipat/pag-aalis ay mga desisyon sa patakaran na nakalaan para sa operator.** Wala pa
sa mga nasa ibaba ang nailalapat.

**Hindi rin nakadokumento sa itaas** (advisory, mahinang signal): ang `docs-lint` job
(markdownlint + Vale, buong job ay `continue-on-error`) at ang mga nakahiwalay na scanner workflow na
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. Nasa
`quality-baseline.json` ang `semgrepFindings: 0` ngunit hindi ito nakakabit sa isang blocking ratchet sa `ci.yml` — ang metric ay
kasalukuyang walang kaugnay na pagpapatupad.

### Pagsasanib / pag-aalis ng duplikasyon (mekanikal, mas mababang panganib)

Bawat kandidato ay pinatunayan laban sa aktuwal na estado ng gate noong 2026-06-17 (magtiwala ngunit magsuri);
lumabas na may nakatagong debt ang ilang "halatang" pagsasanib at ang mga ito ay **hindi** malinis na pamalit.

- **Dalawang beses tumatakbo ang `check:docs-sync`** — nakahiwalay sa `lint` job at muli sa loob ng `check:docs-all` (`docs-sync-strict`) at sa husky pre-commit hook. ✅ **TAPOS NA** — inalis ang nakahiwalay na `lint` invocation.
- **Pag-scan ng CVE** — ❌ **HINDI malinis na pagsasanib.** Agad na nabibigo ang `audit:deps` sa anumang high/critical na CVE; nabibigo lamang ang `check:vuln-ratchet` (osv) kapag may _regression_ kumpara sa baseline (kasalukuyang 1 MODERATE). Magkaiba ang semantics — mawawala ang absolute high/critical gate kapag inalis ang `audit:deps`. Panatilihin ang dalawa.
- **Pagtukoy ng cycle** — ✅ **TAPOS NA** (#15159 G-01/G-02). Tinawag ng lumang teksto rito ang `check:cycles` na "ang green, curated" gate at binigyang-katwiran ang pagpapanatili rito bilang blocking dahil nag-ulat ang `check:circular-deps` (dpdm) ng 91 cycle. Ang pagiging green na iyon ay isang **false green**: nag-scan ang `check:cycles` ng 5 subdirectory (450 file), itinugma lamang ang static na `import|export … from`, at inalis ang bawat `@/` at `@omniroute/open-sse/` specifier, kaya hindi nito makita ang mga dynamic-import + alias cycle na nangingibabaw sa repo. Naayos na: nilalakbay na ngayon ng gate ang `src` + `open-sse` (5023 file), kinokolekta ang mga specifier mula sa TypeScript AST (kaya binibilang ang `import("…")` ngunit hindi ang type-position na `typeof import("…")`), at nire-resolve ang `paths` ng tsconfig. Nakakahanap ito ng **14** na cycle, hindi 0. Dahil hindi maaayos ang 14 na dati nang cycle sa isang gate PR, isa na ngayong **ratchet** ang `check:cycles` (`--ratchet`, ceiling na `metrics.cycles.value = 14` sa `quality-baseline.json`, `direction: down`) — bina-block nito ang anumang _regression_ at maaari lamang bumaba ang bilang. Pinapatakbo ng CI ang `npm run check:cycles:ratchet`. Kasabay ng **A-01** ang burn-down. Nananatiling advisory ang `check:circular-deps` (dpdm) bilang mas malawak na pangalawang opinyon.
- **Complexity** — ✅ **TAPOS NA** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): isang ESLint walk, nagbibilang ayon sa ruleId upang manatiling magkahiwalay ang cyclomatic+max-lines at cognitive baseline; nananatili ang indibidwal na `check:complexity` / `check:cognitive-complexity` para sa lokal na `--update`.
- **`/api` anti-hallucination** — ✅ **TAPOS NA** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): isang FS inventory ng `src/app/api`, patuloy na magkahiwalay ang pag-uulat ng openapi-routes + docs-symbols; nananatili ang mga indibidwal na check para sa mga lokal na pagpapatakbo.
- **Tumatakbo ang `check:node-runtime` sa 11 job** — ⚠️ **mababang ROI.** Hiwalay na runner ang bawat isa at <1s ang check; kabuuang matitipid ay ~10s, kapalit ng pagkawala ng murang guard sa bawat job. Hindi sulit ang pagbabago.
- **`typecheck:noimplicit:core` sa CI lint** — ✅ **inalis sa lint job** (dating advisory na `continue-on-error`); ang blocking type surface ay `typecheck:core` + `check:type-coverage`. Pinanatili ang lokal na script.

### Ilipat / pagpasiyahan (patakaran ng operator)

- `check:openapi-security-tiers` (advisory) — ❌ **HINDI malinis na maililipat.** Nag-e-exit ito nang 0 ngunit nagbababala na walang `x-loopback-only: true` annotation ang ilang `traffic-inspector` route sa ilalim ng `LOCAL_ONLY_API_PREFIXES`. Kailangang idagdag muna ang mga annotation na iyon sa `openapi.yaml` bago ito ipatupad.
- `typecheck:noimplicit:core` (advisory) — halos saklaw na ng blocking na `check:type-coverage` ratchet. Ilipat sa isang ratchet o alisin ang kalabisan na pangalawang `tsc` pass.
- `test:vitest:ui` (ngayon ay **blocking**) — tahasang ibinukod sa `vitest.config.ts` ang mga dati nang failure gamit ang `// #8618` tracking comment; pinababagsak ng mga bagong failure ang job.
- `check:secrets` (gitleaks, blocking ratchet na naka-freeze sa 3 nakadokumentong false-positive) — i-allowlist ang 3 upang umabot sa 0, o ibaba sa advisory. Nag-o-overlap sa native secret-scanning ng GitHub + `check:public-creds`.
- `check:pr-evidence` (blocking, nagge-grep ng prose sa PR body) — mataas ang panganib ng false-positive; pinahihina ang pagpapatupad ng Hard Rule #18 kapag inalis, kaya isa itong tunay na desisyon sa patakaran.
- `semgrep` (nakahiwalay na advisory) — nag-o-overlap sa CodeQL para sa mga OWASP family; ikabit ang baseline nito sa isang ratchet o alisin.

---

## Kaugnay na Dokumentasyon

- Supply-chain (provenance, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — gate para sa pagkakapareho ng key set

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, job na `i18n-ui-coverage`).
Inihahambing nito ang hanay ng mga leaf key ng bawat `src/i18n/messages/<locale>.json` sa `en.json` at nabibigo
kapag may anumang nawawala o ekstrang leaf, anuman ang oras kung kailan idinagdag ang key. Ang mga placeholder na
`__MISSING__:` ay itinuturing na naroroon (ang nilalaman ng mga ito ay saklaw ng ratio gate). Ito ang ganap na katapat
ng dalawang gate na nakabatay sa diff/porsiyento: ipinapatupad ng `check-ui-keys-coverage` ang minimum na 80 % bawat
locale (43 nawawalang key mula sa ~13,000 ay lalabas pa ring 99.7 %) at sinusuri ng `check-new-key-coverage`
ang mga key lamang na idinaragdag ng isang PR sa `en.json`. Binubuo ang isang locale batch mula sa `en.json` sa araw
na ginawa ang branch nito at nagsasalin nang ilang araw habang patuloy na nagdaragdag ng mga key ang base; walang
key na idinaragdag ang batch PR mismo, kaya nanatiling tahimik ang parehong kapatid na gate nang pumasok ang batch 1
(#13044) na kulang ng 43 key sa siyam na locale at ang batch 2 (#13660) na kulang ng 10 key sa walo (2026-09-15).
Ayusin ang pulang status gamit ang
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; ang isang `extra` na leaf
ay nangangahulugang inalis ito ng source — tanggalin ito sa locale. Nag-uulat ang `--warn` nang hindi nabibigo.
Pinapatakbo ng `--catalog=cli` ang parehong paghahambing sa `bin/cli/locales` (`npm run i18n:check-keys:cli`);
parehong nasa job na `i18n-ui-coverage` ang mga hakbang.

#### `check-new-key-coverage` — i18n gate para sa bagong key

Kapatid ng `check-ui-value-drift`. Nahuhuli ng huli ang isang English value na **muling isinulat**
habang naiwan ang mga salin nito; nahuhuli naman nito ang isang English key na **idinagdag**
habang hindi ito natanggap ng ilang locale.

Hindi nakikita ng `check-ui-keys-coverage` ang uring ito: ipinapatupad nito ang minimum na porsiyento bawat locale, at
ang labing-isang nawawalang key mula sa ~13,000 ay nag-iiwan sa coverage na 99.9%. Hindi maipapahayag ng isang
porsiyento bawat wika na "inilabas ang feature na ito nang hindi naisalin" — maaaring maidagdag ang isang buong feature
sa isang bagong locale nang walang anumang text at hindi kailanman mabago ang numero.

Ang insidenteng kinakatawan nito: isinalin ng Phase 3 ng Orchestration Canvas ang labing-isang key nito sa
42 locale na umiiral noong panahong iyon. Makalipas ang ilang oras, dinala ng EU-language batch (#13044) ang repo
sa 51 locale, at hindi kailanman natanggap ng siyam na bagong dating (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`)
ang mga iyon. Ipinapalit ng `deepMergeFallback` ang English para sa isang nawawalang key, kaya ang naging anyo ng
pagkabigo ay UI na hindi naisalin sa halip na blangkong UI — tunay, at likas na tahimik.

Tulad ng kapatid nito, **diff-aware** ito, na inihahambing ang English sa merge base laban sa working
tree, kaya nananatiling hindi nagbabago ang mga dati nang puwang at hindi nangailangan ang gate ng migration upang i-on.

**Hindi ito natutugunan ng isang marker na `__MISSING__:<english>` (mula 2026-09-17).** Dati, ito ang
nakadokumentong paraan ng pagpapaliban — bumabalik ang runtime sa tamang English — hanggang sa walong feature PR noong
2026-09-16 ang nagdagdag ng 61 key at naglagay ng marker sa lahat ng 65 locale sa halip na magsalin: tinanggap ng
gate na ito ang bawat isa, walang humarang sa mga PR, at pagkatapos ay nabigo sa release tip para sa lahat ang
naka-block na gate para sa ratio ng tunay na salin (pt-BR 3.2 % > 2.5 % + 0.5). Itinuturing na ngayong nawawalang
salin ang isang marker. Ayusin ang pulang status gamit ang
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, o
ang lahat ng locale nang magkakasabay gamit ang `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
ligtas kapag detached, at tumatangging magsimula nang wala ang `OMNIROUTE_TRANSLATION_*` env). Ang isang key na
kailangang manatiling English (isang naka-pin na pangalan ng product/engine/flag) ay dapat ilagay sa
`scripts/i18n/untranslatable-keys.json`, at hindi kailanman sa likod ng marker. Ganap na ipinagbabawal ng `vi` ang
mga marker (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — gate para sa mga nakaparadang test

Ang isang file sa listahang `exclude` ng `vitest.config.ts` ay isang test na hindi tumatakbo, at nagmumukha itong
coverage sa sinumang bumabasa sa tree. Animnapu't dalawang file ang naipon sa likod ng komentong
`// #8618 — dati nang pagkabigo; alisin ang exclusion na ito kapag naayos na`. Isinara ang issue #8618 noong
2026-08-11 habang lumaki mula 45 entry hanggang 62 ang listahang sinusubaybayan nito, at minana ng bawat bagong entry
ang isang komentong tumutukoy sa saradong issue. Nang sa wakas ay sinukat ang listahan file bawat file (#13204),
**51 sa 62 ang pumasa laban sa kasalukuyang tree nang walang pagbabago sa source**.

Inaatasan ng gate ang bawat exclusion na tumutukoy sa isang tunay na file na (a) magbanggit ng tracking issue at
(b) lumitaw sa `config/quality/vitest-exclusions.json` kasama ang nasukat na status nito, upang ang pagdaragdag nito ay
maging isang diff na masusuri sa isang nakalaang file sa halip na isa pang linya sa array na may 60 entry. Sadyang
hindi nito muling pinapatakbo ang mga excluded na test — nagkakahalaga iyon ng ~10 minuto at nararapat sa isang
periodic job; itinatala ng inventory kung kailan huling sinukat ang bawat isa.
