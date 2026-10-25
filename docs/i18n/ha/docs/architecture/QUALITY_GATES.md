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

## Ƙidayar ƙofofi da bayanan aiwatarwa

### Karɓar ɗan takara

Tsarukan aikin CI da Quality Gates kowannensu yana fitar da hukunci tabbatacce: `Gate / CI` da
`Gate / Quality`. Manufar karɓa da aka sanya mata siga tana lissafa kowanne aikin sama
a matsayin wajibi ko na shawara. Dole ne aikin wajibi da ya shafi ya yi nasara: sakamako
da ya ɓace, an soke, an tsallake, yana jira ko ba a sani ba ba zai iya kafa PASS ba.
Rarrabawa mai inganci na takardu-kawai ko katalog-kawai na iya sa layin lambar ya zama
mara aiki; daftarin PR ba ɗan takara da aka karɓa ba ne. Alamar `hotfix` ba ta soke shaida ba.

Dukkan tsarukan aiki suna rufe PRs zuwa rassan main/release, turawa zuwa `main`, aikawa
da hannu da abubuwan ƙungiyar haɗawa. Turawa, aikawa da ƙungiyar haɗawa suna gudanar da
cikakken zaɓi. Turawa zuwa `release/**` ba ya fara su (2026-10-18): kowanne canji ya riga
ya gudanar da matrix akan PR nasa kuma haɗuwar da aka hada aikin Release-Green ne
(`docs/ops/RUNNER_BOX.md` → layin Hosted). Forks da ƙungiyoyin haɗawa suna amfani da
hosted runners don ayyukan da in ba haka ba suna zaɓin self-hosted runners; dole ne a
tabbatar da isashen ƙarfin hosted kafin ƙaddamarwa.

Kowanne rasit na JSON yana gano SHA da aka checkout, gudun tsarin aiki da ƙoƙari.
CLI yana ƙin karɓar rashin dacewar SHA na checkout/event. Gwaje-gwajen tsarin aiki
suna ɗaure membobin manufofi zuwa jerin `needs` na aikin hukunci don layin sabo ko
da aka cire ba zai iya ɓacewa a ɓoye ba. Rasit ɗin suna rufe tsarin aikinsu, ba
wallafawa, tura zuwa yanar, ko cikin wani mai binciken shawara da ya riga ya wanzu ba.
Kunna sunayen dubawa guda biyu a cikin dokokin reshe canji ne na gudanarwa daban;
ƙarin waɗannan ayyukan da kansu ba ya kare reshe.

### Ƙidayar binciken tsaye

Ƙidayar npm-alias da aka sanya siga da membobin binciken-tsaye suna cikin
`config/quality/gate-manifest.json`. Gudanar da `npm run check:gate-manifest` don
tabbatar da sunayen script da umarni ainihi akan `package.json`; ƙari, cirewa da
karkacewar umarni suna sa gazawa a duka ƙugiyar gida da ayyukan rarraba-canji a CI.
Alias ba aikin tsarin aiki ba ne, misalin matrix ko lamarin gwaji: kada a gabatar da
waɗannan ƙidaya a matsayin abubuwan da za a iya musanya juna.

Yi amfani da `npm run quality:scan -- --list` ko `npm run quality:scan:fast -- --list`
don duba aliases da aka zaɓa ba tare da aiwatar da su ba. Mai gudanarwa yana kiran
ƙofar shiga ta npm, don haka ana adana runtime nasa (ciki har da Bun inda aka sanya).
Manifest yana rubuta aliases da ke wajen waɗannan bayanan a matsayin waɗanda aka kira
daban, kuma an haramta umarnin kulawa a cikin bayanan bincike na karantawa-kawai.

Waɗannan bayanan suna rufe binciken tsaye kawai. Ba su tabbatar da gwaje-gwajen samfur,
rufewa, kunshawa, dubawa na waje ko cikakken karɓar fitarwa na ɗan takara.
Karɓar tsarin aiki yana amfani da `config/quality/admission-policy.json` da
`scripts/quality/admission-verdict.mjs` da aka haɗa. Bayanan mai-kallon-fitarwa suna
ci gaba da kasancewa daban; duba dubawa da rasit nasu da suka shafa da zaman kansu.
Ƙidayar rubutu a ƙasa ambato ce, ba hujja ba ce cewa ƙofa ta yi aiki da gaske.

Scripts suna ƙarƙashin `scripts/check/` (ƙofofin manufofi) da `scripts/quality/` (injin ratchet).
Tushen gaskiya na CI shine `.github/workflows/ci.yml`.

### Hanyar gaggawa ta PR na fitarwa (`quality.yml`)

`.github/workflows/quality.yml` yana cika CI akan PRs na main/release, turawa zuwa `main`,
aikawa da ƙungiyoyin haɗawa. PRs suna amfani da dubawa masu sauri da aka tace ta hanya.
An cire ginin kwafi da aka kashe har abada; dubawa na gaskiya na gini/kunshi/boot suna ci gaba a CI.

| Aiki                                             | Fangali                                                                                                                                                                                                                                            | Toshewa               |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `Docs Gates (fast-path)`                         | PRs na takardu/lambar; nassoshin takardun API da docs-all                                                                                                                                                                                          | Eh                    |
| `Fast Quality Gates`                             | PRs na lambar; dubawa na tsaye, typecheck, typecheck na dashboard, gwaje-gwajen unit da canjin ya shafa                                                                                                                                            | Eh                    |
| `Forgotten sibling tests`                        | PRs na lambar; an bi diddigin modules da aka canza zuwa masu amfani na tsaye da gwaje-gwajen 'yan'uwa na ɗan takara; ana ba da rahoton hanyoyin barrel da dynamic-import a matsayin bincike na shawara, tare da keɓancewar allowlist da aka ambata | **Shawara**           |
| `Vitest (fast-path)`                             | PRs na lambar; jerin vitest mai sauri                                                                                                                                                                                                              | Eh                    |
| `Unit Tests fast-path`                           | PRs na lambar; jerin unit na shard 4                                                                                                                                                                                                               | Eh                    |
| `No new ESLint warnings`                         | PRs na lambar; mai tsaron lint mai sanin murkushewa                                                                                                                                                                                                | Eh, ciki har da forks |
| `Merge integrity (changelog + generated skills)` | PRs marasa daftari; daidaitawar changelog da ƙwarewa da aka samar                                                                                                                                                                                  | Eh, ciki har da forks |

#### Rahoton gwaje-gwajen 'yan'uwa da aka manta

`npm run check:forgotten-sibling-tests` yana sake amfani da mai warware import da ke bayan taswirar tasirin gwaji.
Don kowane module na samarwa da ya canza, yana ba da rahoton sarƙoƙi masu tabbas na
`changed module/symbol -> static consumer -> candidate sibling test` idan gwajin da ake la'akari da shi
bai kasance a cikin diff na pull-request ba. Ana adana taƙaitaccen Markdown da sakamakon JSON
a matsayin artifact na workflow na `forgotten-sibling-tests` don daidaitawa kafin a fara duk wani tura toshewa.

Barrel re-exports da dynamic imports don binciken warwarewa ne kawai; ba su taɓa samar da
rahoto na toshewa. Keɓancewar da aka duba suna cikin
`config/quality/forgotten-sibling-allowlist.json`. Kowane shigarwa dole ne ya ambaci mai amfani da gwajin
da ake la'akari da shi, ya bayar da dalili na musamman, kuma ya haɗa da GitHub issue ko pull request.
Shigarwar marasa tsari tana gazawa a yanayin rufe. Keɓancewa ba za ta iya ɓoye gwajin da ake la'akari da shi da aka goge
ko diff wanda ya ƙara `.skip`/`.todo` ba; raunana assertion da sauran ɓoyewa suna ci gaba da
kasancewa a ƙarƙashin ƙofar `check:test-masking` da ke toshewa da kanta.

### Aiki: `lint`

Yana gudana a kowane PR zuwa `main`. Yana toshe haɗawa idan ya gaza.

| Script (`npm run ...`)            | Tabbatarwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Toshewa                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| `check:node-runtime`              | Sigar Node.js tana cikin kewayon da ake goyon baya                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Eh                                      |
| `check:cycles`                    | Shigo da abubuwa na madauki a fadin duk `src/` + `open-sse/` (bisa AST, an warware `paths` na tsconfig). Yanayin bare yana fita da 1 a duk lokacin da wani zagaye ya wanzu (fail-closed tun #15281) kuma yana lissafa SCCs. `check:cycles:ratchet` (abin da CI ke gudanarwa) yana toshewa idan adadin ya wuce iyakar `metrics.cycles` a cikin `quality-baseline.json` — a yanzu 14, `direction: down`, don haka yana iya raguwa kawai (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Eh (ratchet)                            |
| `check:boundary`                  | Hadin `open-sse → src`: shigo da abubuwa na musamman fayil-zuwa-fayil daga injin zuwa cikin aikace-aikacen (`scripts/quality/measure-boundary.mjs`; jerin edge shine jerin ayyukan gyaran v4 core/module-split da suka rage). Bare = rahoton shawara (kamar `quality:boundary`). `check:boundary:ratchet` (abin da CI ke gudanarwa, kuma yana cikin madaukar ratchet na fast-gates na `quality.yml`) yana toshewa idan adadin ya wuce iyakar `metrics.boundaryOpenSseToSrc` a cikin `quality-baseline.json` — an dasa shi a kan 771 da aka auna, `direction: down`; `--update` yana saukake shi kawai; dangane da tushe a kan PRs (`--base-ref`, duba kasa)                                                                                                                                                                                                                                                                                                                                | Eh (ratchet)                            |
| `check:route-validation:t06`      | Akwai schemas na Zod a kan duk hanyoyi (manufar Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Eh                                      |
| `check:any-budget:t11`            | Ƙidayar `@ts-expect-error // any` ba ta wuce kasafin ba (Tier 11 ratchet)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Eh                                      |
| `check:provider-consistency`      | Kowane provider a cikin `providers.ts` yana da shigarwa da ta dace da shi a cikin `providerRegistry.ts` (kuma baya-gaba, a cikin allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Eh                                      |
| `check:model-lifecycle`           | Teburori uku na routing da ake kula da su da hannu suna ci gaba da dacewa da hoton daukar lifecycle da aka shigar (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ba ta ba da maki ga wani id da aka janye wanda `REGISTRY` zai iya routing ba; kowane target na `BUILT_IN_ALIASES` yana nan a cikin `REGISTRY` kuma baya cikin hoton id da aka janye; kowane id da aka janye wanda har yanzu yake cikin `REGISTRY` an tura shi ko kuma an jera shi a cikin `allowedRetiredInCatalog`; kuma babu wani source ko target na `DEFAULT_DEGRADATION_MAP` da ya bayyana a matsayin wanda aka janye a cikin wannan hoton. Wannan bai tabbatar da cewa a halin yanzu ana hidimar model daga upstream mai rai ba. Offline — yana kwatanta shi da `config/quality/model-lifecycle.json`, wanda ake sabuntawa da hannu ta `npm run quality:refresh-model-lifecycle` (network; ba a haɗa shi cikin CI ba). `allowedRetiredInCatalog` ratchet ne na burn-down: ƙara shigarwa kawai tare da tracking issue. | Eh                                      |
| `check:fetch-targets`             | Kowane `fetch("/api/...")` a cikin `src/` na gefen client yana warwarewa zuwa ainihin `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Eh                                      |
| `check:deps`                      | Duk deps da za a iya shigarwa da `npm install` a kowane `package.json` a cikin repo suna cikin `dependency-allowlist.json`; an yi wa sabbin packages marasa pin ko slopsquatted alama                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Eh                                      |
| `audit:deps`                      | `npm audit` (root + electron) — babu shawarwari na high/critical (yana yi karo da osv `check:vuln-ratchet`; duba Rationalization Backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Eh                                      |
| `check:lockfile`                  | Cikakken `package-lock.json` — rajistar https, hashes na integrity, babu overrides na host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Eh                                      |
| `check:licenses`                  | Jerin lasisin SPDX da aka ƙyale don dependencies na production                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Eh                                      |
| `check:tracked-artifacts`         | Babu build artifacts / `node_modules` symlinks da aka commit (yana gudana ne kuma a husky pre-commit; an yi pre-push mai sauƙi da gangan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Eh                                      |
| `check:ai-attribution`            | Babu `Co-Authored-By` trailer na AI/bot ko footer na ƙirar AI a cikin PR commits, take ko jiki — Doka Mai Tsauri #16 (a cikin madauki na fast-gates na `quality.yml` don PR→`release/**` — yana karanta event payload, ba ya aiki a waje da PRs — kuma mataki na PR-kawai a cikin `ci.yml` lint don PR→`main`; har da husky `commit-msg` hook; an ƙyale masu haɗin rubutu na ɗan adam; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:vitest-exclusions`         | Kowace keɓewa ta Vitest tana ambaton issue na bibiya kuma tana bayyana a cikin `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Eh                                      |
| `check:file-size`                 | Fayilolin tushe (`.ts`/`.tsx` a cikin `src/`, `open-sse/`, `electron/`, `bin/`) su kasance a cikin `cap` kuma fayilolin gwaji (`*.test.ts(x)`) a cikin `testCap`; fayilolin da aka daskare a cikin `file-size-baseline.json` (`frozen` / `testFrozen`) bai kamata su girma su wuce girman da aka rubuta ba                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Eh                                      |
| `check:error-helper`              | Amsoshin kuskure a cikin executors/handlers suna amfani da `buildErrorBody()` / `sanitizeErrorMessage()` (Ɗoka Mai Ƙarfi #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ee                                      |
| `check:migration-numbering`       | An ba fayilolin SQL na migration lambobi a jere, babu gibi ko kwafi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ee                                      |
| `check:public-creds`              | Babu `client_id`/`client_secret` na OAuth da aka rubuta kai tsaye ko makullan Firebase Web a wajen `publicCreds.ts` (Ɗoka Mai Ƙarfi #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ee                                      |
| `check:db-rules`                  | Babu SQL na kai tsaye a wajen modules na `src/lib/db/`; babu barrel-imports daga `localDb.ts` (Ɗokoki Masu Ƙarfi #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ee                                      |
| `check:known-symbols`             | Executors na provider, dabarun routing, da masu fassara da aka yi rijista a cikin teburorin dispatch nasu sun dace da fayilolin da ke kan disk — babu alamomi maraya ko waɗanda ba a bayyana ba                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ee                                      |
| `check:route-guard-membership`    | Kowace hanya da ke ƙirƙirar child process ana rarraba ta ta hanyar `isLocalOnlyPath()` (Ɗokoki Masu Ƙarfi #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ee                                      |
| `check:test-discovery`            | Ana tattara kowane fayil na `*.test.ts` / `*.spec.ts` a cikin repo da aƙalla mai gudanar da gwaji ɗaya (ratchet: jerin marayu a cikin `test-discovery-baseline.json` na iya raguwa kawai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Eh                                      |
| `check:agent-skills-sync`         | Abubuwan agent-skills da aka samar sun dace da katalog ɗin tushensu (babu bambanci)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:provider-asset-provenance` | Tambarin/kayayyakin mai samarwa suna ɗauke da shigarwar asali da aka rubuta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `lint:json`                       | Fayilolin daidaiton JSON suna fassarawa kuma suna cika dokokin lint na repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | Tattarawar TypeScript ba tare da kurakurai ba (gargaɗi na shawara kawai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Eh                                      |
| `typecheck:noimplicit:core`       | `noImplicitAny` mai tsauri — mai duban gaba; yawancin wuraren kira da suka rigaya suna har yanzu buƙatar bayanan kula                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **Shawara** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` wanda aka ƙuntata zuwa `src/app/(dashboard)/**` (#7033) — jerin ƙyalewar fayiloli 27 da aka zuba na `typecheck:core` baya haɗa da kowane TSX na dashboard, kuma `next build` baya taba yin binciken nau'i kansa (`next.config.mjs` yana saita `ignoreBuildErrors: true`), don haka ragowar orphaned-identifier a can (#6625/#6909) ba a iya ganinsu ga CI. Bambancewa da tushen ƙidaya da aka daskare a kowane fayil/kowace lambar TS (`config/quality/dashboard-typecheck-baseline.json`, wannan tsarin aiwatar da tsohon abu kamar na `check:known-symbols`) — kurakurai SABABBI kawai fiye da ƙidayar tushe ne ke sa ƙofar ta gaza; rage shi da `--update` idan an gyara kuskuren da ya rigaya.                                                                                                                                                                                                                                                                                   | Eh                                      |

### Aiki: `quality-gate`

Yana gudana bayan `test-coverage`. Yana toshe merge idan ya gaza.

| Script                       | Abin da yake tabbatarwa                                                                                                                                                                                 | Toshewa              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `quality:collect`            | Yana fitar da `quality-metrics.json` (ƙidayar gargadin ESLint, coverage daga rahoton shard da aka haɗa)                                                                                                 | Eh (a saman ratchet) |
| `quality:ratchet`            | Kowane ma'auni a cikin `quality-baseline.json` bai koma baya ba (gargadin ESLint ≤ baseline; coverage ≥ baseline)                                                                                       | Eh                   |
| `check:duplication`          | Maimaita lamba (jscpd@4) ba ta wuce baseline a cikin `quality-baseline.json` ba                                                                                                                         | Eh                   |
| `check:complexity`           | Rikitarwa mai madauki ta matakin fayil ba ta wuce iyakar ba (`complexity` na ainihin ESLint + `max-lines-per-function`)                                                                                 | Eh                   |
| `check:cognitive-complexity` | Ratchet na rikitarwa ta hankali (`eslint-plugin-sonarjs`) — wata tafiya ta ESLint daban; CI yana gudanar da dukansu a haɗe a matsayin mataki guda na `check:complexity-ratchets`                        | Eh                   |
| `check:dead-code`            | Ratchet na exports / fayiloli da ba a amfani da su ba (knip) bai koma baya ba idan aka kwatanta da baseline                                                                                             | Eh                   |
| `check:compression-budget`   | Kasafin gwajin matsawa — ƙananan matakan tanadin token na kowane inji bai kamata su koma baya ba                                                                                                        | Eh                   |
| `check:type-coverage`        | Ratchet na kashi ɗariya da aka bai wa nau'i (`type-coverage`) bai koma baya ba; galibi yana rufe `typecheck:noimplicit:core`                                                                            | Eh                   |
| `check:codeql-ratchet`       | Ƙidayar sanarwar CodeQL da suka buɗe ba ta koma baya ba (yana karantawa ta `gh api`; yana tsallakawa cikin sauƙi ba tare da token ba) — mitar sabuntawa da kunna ta hannu: duba "CodeQL ratchet" a ƙasa | Eh                   |

### Aiki: `quality-extended`

Dukan aikin mai ba da shawara ne (`continue-on-error: true`). Ratchet ɗin da suka dogara kan npm suna gudana da gaske; masu duba na waje suna shigarwa ta `gh release download` kuma suna tsallakawa da kansu (exit 0) idan har binary ba ya nan tukuna.

| Script                   | Abin da yake tabbatarwa                                                                                                                                                                                                                   | Toshewa                                               |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `check:circular-deps`    | Babu dogaro mai madauki (dpdm)                                                                                                                                                                                                            | **Mai ba da shawara**                                 |
| `check:bundle-size`      | Girman bundle bai wuce iyakar ba                                                                                                                                                                                                          | **Mai ba da shawara**                                 |
| `check:secrets`          | Binciken asiri (gitleaks) — yana tsallakewa idan binary ba ya nan                                                                                                                                                                         | **Mai ba da shawara**                                 |
| `check:vuln-ratchet`     | Raunukan dogaro (osv-scanner) ba su koma baya ba — yana tsallakewa idan binary ba ya nan                                                                                                                                                  | **Mai ba da shawara**                                 |
| `check:workflows`        | Duba workflow (actionlint + zizmor); masu duba da suka ɓace/lalace, rahotanni marasa inganci ko ratchet baseline da ya ɓace suna gazawa a matsayin INCOMPLETE. Sakamako masu inganci suna bin manufar strict/advisory/ratchet da aka zaɓa | An buƙaci aiwatarwa; zizmor ratchet yana toshewa a CI |
| `check:openapi-breaking` | Canje-canje masu karyawa ga kwangilar API na jama'a (`openapi.yaml`) idan aka kwatanta da reshen tushe (oasdiff) — yana fitar da `openapiBreaking=N`; yana tsallakewa idan oasdiff ba ya nan ko ba a iya warware spec na tushe ba         | **Mai ba da shawara**                                 |

### Aiki: `docs-sync-strict`

Yana gudana a kan kowane PR zuwa `main`. Yana toshe merge idan ya gaza.

| Script                         | Tabbatarwa                                                                                                                                                                                         | Toshewa                 |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `check:docs-all`               | Ƙofar meta da ke gudanar da ƙananan ƙofofin 6 da ke ƙasa a jere                                                                                                                                    | Eh                      |
| ↳ `check:docs-sync`            | Daidaituwar sigar CHANGELOG / OpenAPI / llm.txt                                                                                                                                                    | Eh                      |
| ↳ `check:docs-counts`          | Ƙidayoyin da ke cikin rubutu (ƙididdigar masu samarwa, ƙididdigar ƙaura, da sauransu) suna cikin tagar ratchet ta ainihin ƙidayoyin                                                                | Eh                      |
| ↳ `check:env-doc-sync`         | An rubuta kowace canjin muhalli a `.env.example` a cikin teburin takardun, kuma maimaikuwar haka                                                                                                   | Eh                      |
| ↳ `check:deprecated-versions`  | Babu kalmomin siga da aka yi watsi da su a cikin takardun                                                                                                                                          | Eh                      |
| ↳ `check:doc-links`            | Hanyoyin haɗin markdown na ciki a cikin takardun suna nufin ainihin fayiloli (sigar `[text]`/`(path)`)                                                                                             | Eh                      |
| ↳ `check:fabricated-docs`      | Hanyoyi, canjin muhalli, umarnin CLI, sunayen hook, da hanyoyin fayil da aka ambata a takardun suna wanzu a cikin tushen lambar. Ƙofa mai ƙarfi ta `--strict`; kasa mai laushi ba tare da tuta ba. | Eh (ta `--strict` a CI) |
| `check:cli-i18n`               | Kalmomin umarnin CLI suna cikin duk fayilolin yare na i18n                                                                                                                                         | Eh                      |
| `check:openapi-coverage`       | Takardar ƙayyadaddun OpenAPI tana rufe aƙalla matakin ƙasa na ratchet na ainihin hanyoyi                                                                                                           | Eh                      |
| `check:openapi-security-tiers` | Bayanan matakan tsaro a `openapi.yaml` suna dacewa da rarrabuwar `routeGuard.ts`                                                                                                                   | **Shawara**             |
| `check:openapi-routes`         | Kowace hanya a `openapi.yaml` tana nufin ainihin `route.ts` (hanaginin ƙarya)                                                                                                                      | Eh                      |
| `check:docs-symbols`           | Kowace nuni na `/api/...` a `docs/**/*.md` yana nufin ainihin `route.ts` (hanaginin ƙarya)                                                                                                         | Eh                      |
| `i18n translation drift`       | Maɓallan da ba a fassara ba a cikin fayilolin yare na i18n — gargaɗi kawai                                                                                                                         | **Shawara**             |

### Aiki: `i18n-ui-coverage`

| Script                            | Tabbatarwa                                                                                                                                                                                   | Toshewa     |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (inline) | Rufin maɓallan i18n na UI ya kai ≥ 65%                                                                                                                                                       | Eh          |
| `check-ui-value-drift` (inline)   | Sake rubuta **ƙimar** Turanci ba ya barin wata fassara ɓatacciya a baya                                                                                                                      | Eh          |
| `check-new-key-coverage` (inline) | Ana fassara **sabuwar** maɓallin Turanci a kowane yare — ana ƙin alamar `__MISSING__:`                                                                                                       | Eh          |
| `check-translation-ratio`         | Rabin ainihin fassara ga kowane yare (barin da ya yi daidai da Turanci / matsayi / ɓace a wajen jerin izini) bai kamata ya wuce `config/quality/i18n-translation-baseline.json` + ƙarin fili | **Shawara** |

Yana buƙatar `fetch-depth: 0` — ƙofar value-drift tana kwatanta `en.json` da tushen haɗawa.

#### `check-ui-value-drift` — ƙofar fassara ɓatacciya

Tana kama ɗaya tilas bacin i18n da sauran ƙofofin ba za su iya gani ba ta fuskar tsari: an sake rubuta ƙimar Turanci kuma fassarorin da aka samo daga Turanci na _dā_ suna zama a baya, don haka masu amfani waɗanda ba na Turanci ba suna ci gaba da karanta rubutu mai cike da kwarin gwiwa wanda yanzu ya zama kuskure.

Wannan ya faru da gaske. An sake rubuta `oauthModal.googleOAuthWarning` lokacin da mai taimakon shiga na Antigravity ya isa (#5203); **yare 39 daga cikin 43** sun ci gaba da riƙe rubutun da ke gaya wa masu aiki su "kwafa cikakken URL kuma su liƙa shi a ƙasa" — wani tsari da ba zai iya kammalawa ba ga wannan mai samarwa. Ba a lura da shi ba har zuwa #8463 saboda:

- `sync-ui-keys` yana cika maɓallan da **ba su nan** kawai, ba ma waɗanda suka **ɓaci** ba;
- `check-ui-keys-coverage` yana ƙidaya _kasancewar_ maɓalli, don haka fassara ɓatacciya tana samun maki a matsayin rufaffiya;
- `check-translation-drift` yana bin diddigin madubin takardun `docs/i18n/<locale>/**.md` —
  ba ya taɓa karanta `src/i18n/messages/*.json`. Yana toshewa a aikin `docs-sync-strict` tun daga
  sake daidaituwar 2026-09: gyara ainihin takarda → `npm run i18n:run -- --files=<doc>` (matakin sashe, mai araha).

**Mai kula da bambancewa (diff-aware), ba mai dogaro da baseline ba.** Yana kwatanta `en.json` a merge base da working tree; ga kowane key wanda ƙimar Turancinsa ta canza, kowane locale da har yanzu yana riƙe da fassara da ba a taɓa ba tana da tsufa. Wannan yana **daskare bashin da ya riga ya wanzu** da gangan — diff ba ya iya bayyana wane tsohon Turanci dogon fassara ta fito daga gare shi, don haka ƙofar tana hukunta abin da canjin na yanzu ya taɓa kawai. Madadin (baseline na hash ga kowane key) zai yi kuɗin fayil da aka samar na ~600 KB, sau 3 na mafi girman baseline da ya wanzu, yana juyawa a kowane i18n PR.

Hanyoyi biyu na cika shi:

1. sabunta fassarorin da lamarin ya shafa, ko
2. sa su zuwa `__MISSING__:<new english>` — runtime sai yana ba da Turancin da aka gyara
   (`src/i18n/request.ts::deepMergeFallback`, #7258) kuma key ɗin yana shiga jerin jira don fassara.

Idan **ma'anar** string ɗin ta canza, fi son **canza sunan key**: sabon key ba ya iya gādon fassara mai tsufa. Wannan shine tsarin da #8463 ya yi amfani da shi.

```bash
npm run i18n:check-value-drift          # tsantsani (abin da CI ke gudanarwa)
npm run i18n:check-value-drift:warn     # rahoto kawai
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Yana fita da 0 tare da `SKIP reason=base-unresolved` lokacin da ba za a iya karanta catalog ɗin tushe ba (shallow clone marar base ref), yana kwaikwayon `check-openapi-breaking`.

### Aiki: `i18n`

Cikakken tsarin tabbatarwa na i18n (aiki ɗaya ga kowane locale). Dukkan aikin mai shawara ne.

| Script                          | Yana tabbatar da                  | Mai toshewa                                                |
| ------------------------------- | --------------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | Cikakken fassara ga kowane locale | **Mai shawara** (`continue-on-error: true` a dukkan aikin) |

### Aiki: `pr-test-policy`

Yana gudana ne kawai a kan pull requests.

| Script                 | Yana tabbatar da                                                                                                                              | Mai toshewa |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check:pr-test-policy` | PRs da ke canza lambar samarwa a `src/`, `open-sse/`, `electron/`, ko `bin/` dole su ƙunshi ko sabunta gwaje-gwaje (Ƙa'ida Mai Ɗaurewa #8)    | Eh          |
| `check:test-masking`   | Fayilolin gwaji da aka canza ba sa rage jimillar assert ko ƙara tautologies na `assert.ok(true)`                                              | Eh          |
| `check:pr-evidence`    | Jikin PR yana ambaton shaidar gwaji/VPS don canjin (yana sarrafa Ƙa'ida Mai Ɗaurewa #18 ta hanyar neman rubutun PR — mai rauni, duba Backlog) | Eh          |

### Aiki: `test-vitest`

Yana gudana bayan `build`. Yana toshe merge idan ya kasa.

| Suite            | Yana tabbatar da                                             | Mai toshewa                                                                                                                  |
| ---------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (kayayyaki 110), autoCombo, cache — vitest runner | Eh                                                                                                                           |
| `test:vitest:ui` | Gwaje-gwajen abubuwan UI — vitest runner                     | **Mai toshewa** — an keɓance gazawar da ta riga ta wanzu a sarra a `vitest.config.ts`; sababbin gazawa suna sa aikin ya kasa |

### Ayyukan dare (tsararrun, masu shawara)

Waɗannan suna gudana a kan jadawalin cron (da `workflow_dispatch`), ba taba a kan PRs ba. Dukansu masu shawara ne.

| Tsarin aiki            | Yana tabbatar da                                                                                                                                                          | Mai toshewa     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | gwaje-gwajen kaddarorin fast-check tare da random seed + babban adadin gudu                                                                                               | **Mai shawara** |
| `nightly-resilience`   | ƙofar heap-growth, shigar da kuskuren chaos, k6 load/soak                                                                                                                 | **Mai shawara** |
| `nightly-llm-security` | tsaron injection na promptfoo (yanayin toshewa) + garak probes (ana tsallake su ba tare da secret na mai samarwa ba)                                                      | **Mai shawara** |
| `nightly-schemathesis` | fuzzing na kwantiragin OpenAPI (schemathesis) a kan OmniRoute mai rai ta amfani da `docs/openapi.yaml` — yana bayyana keta ka'idojin spec / 500s marasa kula (Fase 8 B.4) | **Mai shawara** |
| `nightly-mutation`     | maki na gwajin juyin halitta na Stryker a kan hanar unit mai sauri — mutants da suka tsira suna bayyana asserts masu rauni                                                | **Mai shawara** |
| `nightly-compat`       | tsarin dacewar injin Node a kan jerin `engines.node` da ake tallafawa                                                                                                     | **Mai shawara** |

Ana rubuta baselines na aiki (heap, TTFB, lokacin gini) kawai, ba a toshe su: duba [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
