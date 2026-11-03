# Quality Gates Reference (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Hati hii ndiyo rejeleo rasmi la vizuizi vyote vya ubora vya CI katika OmniRoute.
Inaeleza kila kizuizi, kile kinachothibitisha, kazi ya CI ambamo kinaendeshwa, iwapo kinatumia
msingi wa ratchet au sera ya kufaulu/kufeli, na iwapo kinazuia uundaji au ni cha ushauri.

Kwa muhtasari mfupi na sera ya orodha ya kuruhusu, angalia sehemu ya "Vizuizi vya Ubora na Ratchet"
katika `AGENTS.md`. Kwa tathmini ya kina, uainishaji wa ukomavu, na mpango usiotegemea zana mahususi
wa kuiga mfumo huo huo, angalia
[Mwongozo wa Vizuizi vya Ubora](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Orodha ya gates na wasifu wa utekelezaji

### Uandikishaji wa wagombea

Workflows za CI na Quality Gates kila moja hutoa uamuzi thabiti: `Gate / CI` na
`Gate / Quality`. Sera yao ya uandikishaji yenye matoleo huorodhesha kila kazi ya
juu kama ya lazima au ya ushauri. Kazi ya lazima inayotumika lazima ifanikiwe:
matokeo yaliyokosekana, yaliyoghairiwa, yaliyorukwa, yanayosubiri na yasiyojulikana
hayawezi kuthibitisha PASS. Uainishaji halali wa docs-only au catalog-only unaweza
kufanya njia ya msimbo isitumike; PR ya rasimu si mgombea anayekubalika. Lebo ya
`hotfix` haiwezi kuondoa hitaji la ushahidi.

Workflows zote mbili hushughulikia PR zinazoingia kwenye matawi ya main/release,
pushes kwenda `main`, dispatch za mikono na matukio ya merge-group. Push, dispatch
na merge-group huendesha uteuzi kamili. Pushes kwenda `release/**` hazizianzishi
(2026-10-18): kila mabadiliko tayari iliendesha matrix kwenye PR yake na mchanganyiko
ulio-merge ni kazi ya Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane).
Forks na merge groups hutumia hosted runners kwa kazi ambazo kwa kawaida huchagua
self-hosted runners; uwezo wa kutosha wa hosted lazima uthibitishwe kabla ya
uzinduzi.

Kila risiti ya JSON hutambua SHA iliyofanyiwa checkout, run ya workflow na jaribio.
CLI hukataa kutolingana kwa checkout/event SHA. Majaribio ya workflow hufunga
uanachama wa sera kwenye orodha ya `needs` ya kazi ya verdict ili lane mpya au
iliyoondolewa isiweze kutoweka kimya kimya. Risiti hushughulikia workflow yao
wenyewe, si uchapishaji, uwekaji, au mambo ya ndani ya scanner iliyopo ya ushauri.
Kuamilisha majina yote mawili ya check katika sheria za tawi ni mabadiliko tofauti
ya kiutawala; kuongeza kazi hizi pekee hakulindi tawi.

### Orodha ya static scan

Orodha yenye matoleo ya npm-alias na uanachama wa static-scan ziko katika
`config/quality/gate-manifest.json`. Endesha `npm run check:gate-manifest` ili
kuthibitisha majina ya script na amri kamili dhidi ya `package.json`; nyongeza,
uondoaji na mkengeuko wa amri husababisha kushindwa kwa hook ya ndani na kazi za
uainishaji wa mabadiliko katika CI. Alias si kazi ya workflow, mfano wa matrix au
kesi ya jaribio: hesabu hizi hazipaswi kuwasilishwa kama vitu vinavyoweza
kubadilishana.

Tumia `npm run quality:scan -- --list` au `npm run quality:scan:fast -- --list`
kukagua alias zilizochaguliwa bila kuzitekeleza. Runner huita npm entrypoint, hivyo
runtime yake (ikiwemo Bun pale iliposanidiwa) huhifadhiwa. Manifest huweka kumbukumbu
ya alias zilizo nje ya wasifu huo kama zinazoitwa kando, na amri za matengenezo
zimepigwa marufuku katika wasifu wa scan wa kusoma pekee.

Wasifu huu hushughulikia static scan pekee. Hauthibitishi majaribio ya bidhaa,
coverage, packaging, ukaguzi wa nje au ukubalifu kamili wa release wa mgombea.
Uandikishaji wa workflow hutumia `config/quality/admission-policy.json` na
`scripts/quality/admission-verdict.mjs`. Wasifu wa release-observer hubaki tofauti;
kagua checks na risiti zake zinazotumika kwa kujitegemea. Orodha ya maelezo hapa
chini ni rejeleo, si uthibitisho kwamba gate iliendeshwa.

Scripts ziko chini ya `scripts/check/` (policy gates) na `scripts/quality/` (ratchet
engine). Chanzo cha ukweli cha CI ni `.github/workflows/ci.yml`.

### Njia ya haraka ya Release PR (`quality.yml`)

`.github/workflows/quality.yml` inakamilisha CI kwenye PR za main/release, pushes
kwenda `main`, dispatch na merge groups. PR hutumia ukaguzi wa haraka unaochujwa
kwa njia. Build iliyorudiwa na kuzimwa kabisa iliondolewa; ukaguzi halisi wa
build/package/boot unabaki katika CI.

| Job                                              | Scope                                                                                                                                                                                                                                    | Blocking             |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | PR za docs/code; marejeo ya API docs na docs-all                                                                                                                                                                                         | Ndiyo                |
| `Fast Quality Gates`                             | PR za code; ukaguzi tuli, typecheck, typecheck ya dashboard, majaribio ya unit yaliyoathiriwa                                                                                                                                            | Ndiyo                |
| `Forgotten sibling tests`                        | PR za code; modules zilizobadilishwa zilizofuatiliwa hadi kwa watumiaji tuli na majaribio ya sibling ya mgombea; njia za barrel na dynamic-import huripotiwa kama uchunguzi wa ushauri, pamoja na vighairi vya allowlist vilivyorejelewa | **Ushauri**          |
| `Vitest (fast-path)`                             | PR za code; suite ya haraka ya vitest                                                                                                                                                                                                    | Ndiyo                |
| `Unit Tests fast-path`                           | PR za code; suite ya unit yenye shards 4                                                                                                                                                                                                 | Ndiyo                |
| `No new ESLint warnings`                         | PR za code; ulinzi wa lint unaozingatia suppressions                                                                                                                                                                                     | Ndiyo, ikiwemo forks |
| `Merge integrity (changelog + generated skills)` | PR zisizo za rasimu; ulandanishi wa changelog na generated skill                                                                                                                                                                         | Ndiyo, ikiwemo forks |

#### Ripoti ya Forgotten sibling tests

`npm run check:forgotten-sibling-tests` hutumia tena kisuluhishi cha uingizaji kilicho nyuma ya ramani ya athari za majaribio.
Kwa kila moduli ya uzalishaji iliyobadilika, huripoti minyororo bainifu ya
`changed module/symbol -> static consumer -> candidate sibling test` wakati jaribio
linalopendekezwa halipo kwenye tofauti ya pull request. Muhtasari wa Markdown na
matokeo ya JSON huhifadhiwa kama kifaa cha workflow cha
`forgotten-sibling-tests` kwa ajili ya urekebishaji kabla ya utekelezaji wowote wa kuzuia.

Uhamishaji upya wa Barrel na uingizaji unaobadilika ni uchunguzi wa utatuzi pekee; kamwe hauunde
hitimisho la kuzuia. Vighairi vilivyokaguliwa huhifadhiwa katika
`config/quality/forgotten-sibling-allowlist.json`. Kila ingizo lazima litaje mtumiaji na jaribio
linalopendekezwa, litoe sababu mahususi, na liunganishe suala au pull request ya GitHub. Maingizo yenye
muundo batili husababisha ukaguzi kukataa kwa usalama. Vighairi haviwezi kuficha jaribio linalopendekezwa lililofutwa au tofauti inayoongeza `.skip`/`.todo`;
kudhoofisha madai na njia nyingine za kuficha matatizo bado zinasimamiwa na lango la kuzuia kwa kujitegemea
`check:test-masking`.

### Kazi: `lint`

Huendeshwa kwenye kila PR kwenda `main`. Huzuia muunganisho iwapo itashindwa.

| Script (`npm run ...`)            | Huthibitisha                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Inazuia                                    |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Toleo la Node.js liko ndani ya masafa yanayotumika                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ndiyo                                      |
| `check:cycles`                    | Uagizaji wa mzunguko katika `src/` + `open-sse/` zote (unaotegemea AST, `paths` za tsconfig zimetatuliwa). Bila vigezo huondoka kwa msimbo 1 wakati wowote mzunguko wowote unapokuwepo (hufeli kwa usalama tangu #15281) na huorodhesha SCCs. `check:cycles:ratchet` (kile CI huendesha) huzuia wakati idadi inapozidi kikomo cha `metrics.cycles` katika `quality-baseline.json` — kwa sasa ni 14, `direction: down`, kwa hivyo inaweza tu kupungua (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ndiyo (ratchet)                            |
| `check:boundary`                  | Uunganishaji wa `open-sse → src`: uagizaji wa kipekee kutoka faili moja hadi nyingine kutoka injini kwenda kwenye programu (`scripts/quality/measure-boundary.mjs`; orodha ya miunganisho ndiyo orodha ya kazi zilizosalia za urekebishaji wa mgawanyo wa v4 core/module). Bila vigezo ni ripoti ya ushauri (sawa na `quality:boundary`). `check:boundary:ratchet` (kile CI huendesha, pia katika mzunguko wa ratchet wa fast-gates wa `quality.yml`) huzuia wakati idadi inapozidi kikomo cha `metrics.boundaryOpenSseToSrc` katika `quality-baseline.json` — kiliwekwa mwanzoni kuwa 771 iliyopimwa, `direction: down`; `--update` hupunguza tu; huhusiana na msingi kwenye PRs (`--base-ref`, tazama hapa chini)                                                                                                                                                                                                                                                                                 | Ndiyo (ratchet)                            |
| `check:route-validation:t06`      | Miundo ya Zod ipo kwenye njia zote (sera ya Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ndiyo                                      |
| `check:any-budget:t11`            | Hesabu ya `@ts-expect-error // any` haizidi bajeti (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ndiyo                                      |
| `check:provider-consistency`      | Kila provider katika `providers.ts` ina ingizo linalolingana katika `providerRegistry.ts` (na kinyume chake, ndani ya orodha ya zinazoruhusiwa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ndiyo                                      |
| `check:model-lifecycle`           | Majedwali matatu ya uelekezaji yanayotunzwa kwa mkono yanaendelea kuwa na ulinganifu na picha ya lifecycle iliyowekwa kwenye hifadhi (#11503): `FITNESS_TABLE` (`taskFitness.ts`) haipimi alama ya id yoyote iliyostaafu ambayo `REGISTRY` inaweza kuelekeza; kila lengwa la `BUILT_IN_ALIASES` linapatikana katika `REGISTRY` na halipo katika picha ya id zilizostaafu; kila id iliyostaafu ambayo bado iko katika `REGISTRY` inaelekezwa mbele au imeorodheshwa katika `allowedRetiredInCatalog`; na hakuna chanzo au lengwa la `DEFAULT_DEGRADATION_MAP` linaloonekana kuwa limestaafu katika picha hiyo. Hili halithibitishi kuwa modeli inatolewa kwa sasa na upstream inayofanya kazi. Nje ya mtandao — hulinganisha na `config/quality/model-lifecycle.json`, inayosasishwa kwa mkono kwa kutumia `npm run quality:refresh-model-lifecycle` (mtandao; haijaunganishwa katika CI). `allowedRetiredInCatalog` ni ratchet ya kupunguza madeni: ongeza ingizo tu ukiwa na issue ya ufuatiliaji. | Ndiyo                                      |
| `check:fetch-targets`             | Kila `fetch("/api/...")` katika `src/` ya upande wa mteja hutatuliwa kuwa `route.ts` halisi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ndiyo                                      |
| `check:deps`                      | Vitegemezi vyote vinavyoweza kusakinishwa kwa `npm install` katika kila `package.json` kwenye hifadhi viko katika `dependency-allowlist.json`; vifurushi vipya visivyobandikwa au vilivyoigizwa kwa ulaghai huripotiwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ndiyo                                      |
| `audit:deps`                      | `npm audit` (root + electron) — hakuna ushauri wa kiwango cha juu au muhimu (unaingiliana na `check:vuln-ratchet` ya osv; tazama Backlog ya Urekebishaji)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ndiyo                                      |
| `check:lockfile`                  | Uadilifu wa `package-lock.json` — sajili ya https, heshi za uadilifu, hakuna ubatilishaji wa seva pangishi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ndiyo                                      |
| `check:licenses`                  | Orodha ya leseni za SPDX zinazoruhusiwa kwa vitegemezi vya uzalishaji                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ndiyo                                      |
| `check:tracked-artifacts`         | Hakuna vizalia vya ujenzi / viunganishi vya mfano vya `node_modules` vilivyowekwa kwenye hifadhi (huendeshwa pia katika husky pre-commit; pre-push imekusudiwa kuwa nyepesi — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ndiyo                                      |
| `check:ai-attribution`            | Hakuna kijalizo cha `Co-Authored-By` cha AI/boti au kijachini cha uzalishaji wa AI katika mikabidhi ya PR, kichwa au kiini — Kanuni Kali #16 (katika mzunguko wa fast-gates wa `quality.yml` kwa PR→`release/**` — husoma mzigo wa tukio, haifanyi chochote nje ya PR — na hatua ya PR pekee katika lint ya `ci.yml` kwa PR→`main`; pia ndoano ya husky `commit-msg`; waandishi wenza binadamu wanaruhusiwa; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:vitest-exclusions`         | Kila kutengwa kwa Vitest hutaja suala la ufuatiliaji na huonekana katika `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ndiyo                                      |
| `check:file-size`                 | Faili za chanzo (`.ts`/`.tsx` katika `src/`, `open-sse/`, `electron/`, `bin/`) zisizidi `cap` na faili za majaribio (`*.test.ts(x)`) zisizidi `testCap`; faili zilizogandishwa katika `file-size-baseline.json` (`frozen` / `testFrozen`) hazipaswi kukua zaidi ya ukubwa uliorekodiwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ndiyo                                      |
| `check:error-helper`              | Majibu ya makosa katika vitekelezaji/vidhibiti hutumia `buildErrorBody()` / `sanitizeErrorMessage()` (Kanuni Kuu #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ndiyo                                      |
| `check:migration-numbering`       | Faili za SQL za uhamishaji zimepewa nambari kwa mfuatano, bila mapengo au marudio                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ndiyo                                      |
| `check:public-creds`              | Hakuna `client_id`/`client_secret` halisi za OAuth au funguo za Wavuti za Firebase nje ya `publicCreds.ts` (Kanuni Kuu #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ndiyo                                      |
| `check:db-rules`                  | Hakuna SQL ghafi nje ya moduli za `src/lib/db/`; hakuna uagizaji wa aina ya barrel kutoka `localDb.ts` (Kanuni Kuu #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ndiyo                                      |
| `check:known-symbols`             | Vitekelezaji vya watoa huduma, mikakati ya uelekezaji, na watafsiri waliosajiliwa katika majedwali yao ya usambazaji vinalingana na faili zilizo kwenye diski — hakuna alama zilizotelekezwa au ambazo hazijatangazwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ndiyo                                      |
| `check:route-guard-membership`    | Kila njia inayoanzisha mchakato wa mtoto inaainishwa na `isLocalOnlyPath()` (Kanuni Kuu #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ndiyo                                      |
| `check:test-discovery`            | Kila faili la `*.test.ts` / `*.spec.ts` katika hazina hukusanywa na angalau test runner mmoja (ratchet: orodha ya faili yatima katika `test-discovery-baseline.json` inaweza kupungua tu)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ndiyo                                      |
| `check:test-tla-order`            | Hakuna faili la `node:test` chini ya `tests/unit` linalosajili test, kufikia `await` ya kiwango cha juu, kisha kusajili nyingine (#18045; ratchet: `test-tla-order-allowlist.json` inaweza kupungua tu)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ndiyo                                      |
| `check:agent-skills-sync`         | Vifaa vilivyotengenezwa vya ujuzi wa mawakala vinalingana na katalogi yao ya chanzo (hakuna kutokulingana)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:provider-asset-provenance` | Nembo/vipengee vya mtoa huduma vina ingizo lililorekodiwa la asili                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `lint:json`                       | Faili za usanidi za JSON huchanganuliwa na kutimiza kanuni za lint za hazina                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `typecheck:core`                  | Ukusanyaji wa TypeScript bila makosa (maonyo ya ushauri pekee)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ndiyo                                      |
| `typecheck:noimplicit:core`       | `noImplicitAny` kali — kwa mwelekeo wa siku zijazo; sehemu nyingi za simu zilizokuwepo awali bado zinahitaji maelezo ya aina                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **Ya ushauri** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` iliyowekewa wigo kwa `src/app/(dashboard)/**` (#7033) — `typecheck:core`'s orodha teule ya faili 27 hairuhusu TSX yoyote ya dashboard, na `next build` pia haifanyi ukaguzi wa aina (`next.config.mjs` inaweka `ignoreBuildErrors: true`), hivyo regressions za vitambulisho vilivyoachwa kwenye sehemu hiyo (#6625/#6909) hazikuonekana kwenye CI. Tofauti hulinganishwa na msingi uliogandishwa wa idadi kwa kila faili/kila msimbo wa TS (`config/quality/dashboard-typecheck-baseline.json`, kwa muundo ule ule wa utekelezaji wa makosa ya zamani kama `check:known-symbols`) — ni makosa MAPYA pekee yanayozidi idadi ya msingi ndiyo husababisha lango kushindikana; punguza idadi kwa `--update` wakati kosa lililokuwepo awali linaporekebishwa.                                                                                                                                                                                                                                     | Ndiyo                                      |

### Kazi: `quality-gate`

Hutekelezwa baada ya `test-coverage`. Huzuia kuunganisha mabadiliko inaposhindwa.

| Script                       | Huthibitisha                                                                                                                                                                                         | Inazuia                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `quality:collect`            | Hutoa `quality-metrics.json` (idadi ya maonyo ya ESLint, coverage kutoka ripoti ya shard zilizounganishwa)                                                                                           | Ndiyo (juu ya ratchet) |
| `quality:ratchet`            | Kila kipimo katika `quality-baseline.json` hakijarudi nyuma (maonyo ya ESLint ≤ msingi; coverage ≥ msingi)                                                                                           | Ndiyo                  |
| `check:duplication`          | Urudiaji wa msimbo (jscpd@4) hauzidi msingi katika `quality-baseline.json`                                                                                                                           | Ndiyo                  |
| `check:complexity`           | Utata wa mzunguko wa kiwango cha faili hauzidi kikomo (ESLint ya msingi `complexity` + `max-lines-per-function`)                                                                                     | Ndiyo                  |
| `check:cognitive-complexity` | Ratchet ya utata wa kiutambuzi (`eslint-plugin-sonarjs`) — hupitisha ukaguzi tofauti wa ESLint; CI huendesha yote ikiwa yameunganishwa kama hatua moja ya `check:complexity-ratchets`                | Ndiyo                  |
| `check:dead-code`            | Ratchet ya exports / faili ambazo hazitumiki (knip) hairudi nyuma ikilinganishwa na msingi                                                                                                           | Ndiyo                  |
| `check:compression-budget`   | Bajeti ya kipimo cha ukandamizaji — viwango vya chini vya uokoaji wa tokeni kwa kila injini havipaswi kurudi nyuma                                                                                   | Ndiyo                  |
| `check:type-coverage`        | Ratchet ya asilimia iliyo na aina (`type-coverage`) hairudi nyuma; kwa kiasi kikubwa inachukua nafasi ya `typecheck:noimplicit:core`                                                                 | Ndiyo                  |
| `check:codeql-ratchet`       | Idadi ya arifa za CodeQL zilizo wazi hairudi nyuma (husoma kupitia `gh api`; huruka kwa utulivu bila tokeni) — ratiba ya kusasisha na kichochezi cha mwongozo: tazama "Ratchet ya CodeQL" hapa chini | Ndiyo                  |

### Kazi: `quality-extended`

Kazi nzima ni ya ushauri (`continue-on-error: true`). Ratchet zinazotumia npm huendeshwa
kwa kawaida; vichanganuzi vya nje husakinishwa kupitia `gh release download` na hujiruka vyenyewe (exit 0)
wakati binary bado haipo.

| Script                   | Huthibitisha                                                                                                                                                                                                                                 | Inazuia                                                      |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `check:circular-deps`    | Hakuna vitegemezi vya mzunguko (dpdm)                                                                                                                                                                                                        | **Ya ushauri**                                               |
| `check:bundle-size`      | Ukubwa wa bundle hauzidi kikomo                                                                                                                                                                                                              | **Ya ushauri**                                               |
| `check:secrets`          | Uchanganuzaji wa siri (gitleaks) — huruka ikiwa binary haipo                                                                                                                                                                                 | **Ya ushauri**                                               |
| `check:vuln-ratchet`     | Udhaifu wa vitegemezi (osv-scanner) haurudi nyuma — huruka ikiwa binary haipo                                                                                                                                                                | **Ya ushauri**                                               |
| `check:workflows`        | Linti ya workflows (actionlint + zizmor); vichanganuzi vilivyokosekana/vilivyoharibika, ripoti zisizo sahihi au msingi wa ratchet uliokosekana husababisha INCOMPLETE. Matokeo halali hufuata sera iliyochaguliwa ya strict/advisory/ratchet | Utekelezaji unahitajika; ratchet ya zizmor inazuia katika CI |
| `check:openapi-breaking` | Mabadiliko yanayovunja mkataba wa API ya umma (`openapi.yaml`) yakilinganishwa na branch ya msingi (oasdiff) — hutoa `openapiBreaking=N`; huruka ikiwa oasdiff haipo au spec ya msingi haiwezi kutatuliwa                                    | **Ya ushauri**                                               |

### Kazi: `docs-sync-strict`

Hutekelezwa kwenye kila PR kwenda `main`. Huzuia kuunganisha mabadiliko inaposhindwa.

| Script                         | Huthibitisha                                                                                                                                                                            | Inazuia                              |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `check:docs-all`               | Meta-gate inayoendesha sub-gate 6 zilizo hapa chini kwa mfuatano                                                                                                                        | Ndiyo                                |
| ↳ `check:docs-sync`            | Ulinganifu wa matoleo ya CHANGELOG / OpenAPI / llm.txt                                                                                                                                  | Ndiyo                                |
| ↳ `check:docs-counts`          | Hesabu katika maelezo (idadi ya watoa huduma, idadi ya uhamishaji, n.k.) ziko ndani ya dirisha la ratchet la hesabu halisi                                                              | Ndiyo                                |
| ↳ `check:env-doc-sync`         | Kila env var katika `.env.example` imeandikwa katika jedwali la nyaraka, na kinyume chake                                                                                               | Ndiyo                                |
| ↳ `check:deprecated-versions`  | Hakuna mifuatano ya matoleo yaliyopitwa na wakati katika nyaraka                                                                                                                        | Ndiyo                                |
| ↳ `check:doc-links`            | Viungo vya ndani vya Markdown katika nyaraka vinaelekeza kwenye faili halisi (`[text]`/`(path)` form)                                                                                   | Ndiyo                                |
| ↳ `check:fabricated-docs`      | Routes, env vars, amri za CLI, majina ya hooks, na njia za faili zilizotajwa katika nyaraka zipo kwenye codebase. Huzuia kupitia `--strict`; bila flag husababisha kushindwa kwa upole. | Ndiyo (kupitia `--strict` katika CI) |
| `check:cli-i18n`               | Mifuatano ya amri za CLI ipo katika faili zote za locale za i18n                                                                                                                        | Ndiyo                                |
| `check:openapi-coverage`       | Spec ya OpenAPI inashughulikia angalau kiwango cha chini kilichowekwa kwa ratchet cha routes halisi                                                                                     | Ndiyo                                |
| `check:openapi-security-tiers` | Maelezo ya viwango vya usalama katika `openapi.yaml` yanaendana na uainishaji wa `routeGuard.ts`                                                                                        | **Ushauri tu**                       |
| `check:openapi-routes`         | Kila path katika `openapi.yaml` inaelekeza kwenye `route.ts` halisi (kuzuia hallucination)                                                                                              | Ndiyo                                |
| `check:docs-symbols`           | Kila marejeo ya `/api/...` katika `docs/**/*.md` yanaelekeza kwenye `route.ts` halisi (kuzuia hallucination)                                                                            | Ndiyo                                |
| `i18n translation drift`       | Funguo ambazo hazijatafsiriwa katika faili za locale za i18n — ni onyo tu                                                                                                               | **Ushauri tu**                       |

SVG kumi na mbili za README zilizo chini ya `docs/diagrams/` zinatengenezwa (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` inazalisha zote upya). Kila moja ina jaribio la unit la kulinganisha byte
(`tests/unit/docs/readme-*-svg.test.ts`, kazi `test-unit`) ambalo hushindwa faili iliyowekwa ikiwa imepitwa na wakati,
na `check:docs-counts` husoma nambari za kanoni kutoka kwenye nodi zake za `<text>` — ndiyo maana hatua ya
kugeuza mistari kuwa outlines huweka kila mfuatano uliogeuzwa outline kwenye faili kama `<text>` isiyoonekana. Ukaguzi wa
nambari za kanoni za SVG husoma faili zilizoorodheshwa katika
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, pamoja na `public/images/tier-flow-dark.svg` na `tier-flow-light.svg`;
madai ya free-forever, catalog-entry, recurring-pool na scoring-factors pia husoma
`promise-pillars.svg`, `free-tier-budget.svg` na `strategies-grid.svg`. `free-tier-budget.svg`
huchora takwimu zake kutoka kwa kipakia catalog kinachotumika, kwa hiyo mabadiliko ya
`FREE_MODEL_BUDGETS` au jina la mtoa huduma linaloonyeshwa husababisha CI kushindwa hadi faili hiyo izalishwe upya.

### Kazi: `i18n-ui-coverage`

| Script                            | Huthibitisha                                                                                                                                                                                 | Inazuia        |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | Ufikiaji wa funguo za i18n za UI ni ≥ 65%                                                                                                                                                    | Ndiyo          |
| `check-ui-value-drift` (inline)   | **Value** ya Kiingereza iliyoandikwa upya haiwachi tafsiri ya zamani                                                                                                                         | Ndiyo          |
| `check-new-key-coverage` (inline) | Funguo **mpya** za Kiingereza zimetafsiriwa katika kila locale — alama ya `__MISSING__:` inakataliwa                                                                                         | Ndiyo          |
| `check-translation-ratio`         | Uwiano wa tafsiri halisi kwa kila locale (zilizo sawa na Kiingereza / placeholder / zilizokosekana nje ya allowlist) haupaswi kuzidi `config/quality/i18n-translation-baseline.json` + slack | **Ushauri tu** |

Inahitaji `fetch-depth: 0` — gate ya value-drift hulinganisha `en.json` na merge base.

#### `check-ui-value-drift` — gate ya tafsiri zilizopitwa na wakati

Inanasa regression moja ya i18n ambayo milango mingine haiwezi kuiona kimuundo: thamani ya Kiingereza
inaandikwa upya na tafsiri zilizotokana na _Kiingereza cha awali_ zinabaki nyuma, hivyo
watumiaji wasiotumia Kiingereza wanaendelea kusoma maandishi yenye kujiamini, lakini sasa yasiyo sahihi.

Hili lilitolewa kweli. `oauthModal.googleOAuthWarning` iliandikwa upya msaidizi wa kuingia
wa Antigravity ulipoletwa (#5203); **lokale 39 kati ya 43** ziliendelea kuwaambia waendeshaji "nakili
URL kamili na uibandike hapa chini" — mtiririko ambao hauwezi kukamilika kwa mtoa huduma huyo. Haikugunduliwa
hadi #8463 kwa sababu:

- `sync-ui-keys` hujaza tu funguo ambazo **hazipo**, kamwe zile ambazo ni **chakavu**;
- `check-ui-keys-coverage` huhesabu _uwepo_ wa ufunguo, hivyo tafsiri iliyochakaa huhesabiwa kuwa imefunikwa;
- `check-translation-drift` hufuatilia vioo vya nyaraka vya `docs/i18n/<locale>/**.md` —
  haisomi kamwe `src/i18n/messages/*.json`. Inazuia katika kazi `docs-sync-strict` tangu
  usawazishaji wa 2026-09: hariri hati kuu → `npm run i18n:run -- --files=<doc>` (kwa kiwango cha sehemu, nafuu).

**Inazingatia tofauti, si msingi.** Hulinganisha `en.json` katika sehemu ya kuunganisha dhidi ya
mti wa kazi; kwa kila ufunguo ambao thamani yake ya Kiingereza imebadilika, lokal yoyote ambayo bado ina
tafsiri ambayo haijaguswa inachukuliwa kuwa chakavu. Hii **hugandisha deni lililokuwepo awali** kwa makusudi — tofauti
haiwezi kufichua ni Kiingereza kipi cha zamani ambacho tafsiri ya muda mrefu ilitokana nacho, hivyo lango huamua
tu kuhusu kile ambacho mabadiliko ya sasa yamegusa. Mbadala wake (msingi wa heshi kwa kila ufunguo)
ungegharimu faili iliyozalishwa la ~600 KB, mara 3 ya msingi mkubwa zaidi uliopo, na kusababisha mabadiliko
kwa kila PR ya i18n.

Njia mbili za kuitimiza:

1. sasisha tafsiri zilizoathiriwa, au
2. ziweke kuwa `__MISSING__:<new english>` — wakati wa utekelezaji, Kiingereza kilichosahihishwa hutolewa
   (`src/i18n/request.ts::deepMergeFallback`, #7258) na ufunguo huwekwa kwenye foleni ya kutafsiri.

Ikiwa **maana** ya mfuatano imebadilika, pendelea **kubadilisha jina la ufunguo**: ufunguo mpya hauwezi kurithi
tafsiri iliyochakaa. Huo ndio mtindo uliotumiwa na #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Hutoka na 0 ikiwa na `SKIP reason=base-unresolved` wakati katalogi ya msingi haiwezi kusomwa (kloni isiyo na kina
bila rejeleo la msingi), kama inavyofanywa na `check-openapi-breaking`.

### Kazi: `i18n`

Mchanganyiko kamili wa uthibitishaji wa i18n (kazi moja kwa kila lokal). Kazi nzima ni ya ushauri.

| Script                          | Validates                           | Blocking                                                     |
| ------------------------------- | ----------------------------------- | ------------------------------------------------------------ |
| `validate_translation.py quick` | Ukamilifu wa tafsiri kwa kila lokal | **Ya ushauri** (`continue-on-error: true` kwenye kazi nzima) |

### Kazi: `pr-test-policy`

Huendeshwa kwenye maombi ya kuvuta pekee.

| Script                 | Validates                                                                                                                                                                 | Blocking |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | PR zinazobadilisha msimbo wa uzalishaji katika `src/`, `open-sse/`, `electron/`, au `bin/` lazima zijumuishe au zisasie majaribio (Kanuni Ngumu #8)                       | Ndiyo    |
| `check:test-masking`   | Faili za majaribio zilizobadilishwa hazipunguzi jumla ya hesabu ya madai wala kuongeza kauli za tautolojia za `assert.ok(true)`                                           | Ndiyo    |
| `check:pr-evidence`    | Mwili wa PR unanukuu ushahidi wa majaribio/VPS kwa mabadiliko hayo (huweka Kanuni Ngumu #18 katika utekelezaji kwa kutafuta maandishi ya PR — si thabiti, tazama Backlog) | Ndiyo    |

### Kazi: `test-vitest`

Huendeshwa baada ya `build`. Huzuia kuunganisha ikiwa itashindwa.

| Suite            | Validates                                                         | Blocking                                                                                                                   |
| ---------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Seva ya MCP (zana 110), autoCombo, akiba — kiendeshaji cha vitest | Ndiyo                                                                                                                      |
| `test:vitest:ui` | Majaribio ya vijenzi vya UI — kiendeshaji cha vitest              | **Inazuia** — kushindwa kulikokuwepo awali kumeondolewa wazi katika `vitest.config.ts`; kushindwa kupya kunashindisha kazi |

### Mitiririko ya usiku (imepangwa, ya ushauri)

Hii huendeshwa kwa ratiba ya cron (na `workflow_dispatch`), kamwe kwenye PR. Yote ni ya ushauri.

| Mtiririko              | Huthibitisha                                                                                                                                                                              | Zuio           |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | majaribio ya sifa ya fast-check yenye seed nasibu + idadi kubwa ya uendeshaji                                                                                                             | **Ya ushauri** |
| `nightly-resilience`   | kizuizi cha ukuaji wa heap, uingizaji wa hitilafu wa chaos, upakiaji/soak wa k6                                                                                                           | **Ya ushauri** |
| `nightly-llm-security` | ulinzi wa sindano wa promptfoo (hali ya kuzuia) + uchunguzi wa garak (unarukwa bila siri ya mtoa huduma)                                                                                  | **Ya ushauri** |
| `nightly-schemathesis` | fuzzing ya mkataba wa OpenAPI (schemathesis) dhidi ya OmniRoute inayotumika, kwa kutumia `docs/openapi.yaml` — huonyesha ukiukaji wa vipimo / 500 ambazo hazijashughulikiwa (Awamu 8 B.4) | **Ya ushauri** |
| `nightly-mutation`     | alama ya majaribio ya mabadiliko ya Stryker kwenye njia ya haraka ya unit — mutants zinazosalia huonyesha assert dhaifu                                                                   | **Ya ushauri** |
| `nightly-compat`       | matriki ya uoanifu wa injini ya Node katika safu za `engines.node` zinazotumika                                                                                                           | **Ya ushauri** |

Misingi ya utendaji (heap, TTFB, muda wa uundaji) inarekodiwa, si kuwekwa kama kizuizi: tazama [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Awamu ya kasi (2026-08-30 → v4.0 LTS): kila msingi umelegezwa kwa 20%

Uamuzi wa mmiliki (2026-08-30): hadi ugawanyaji wa v4.0 kuwa moduli, kasi ya kutoa matoleo ni muhimu zaidi
kuliko kudhibiti deni. Kila msingi wa ratchet wa **nambari** ulilegezwa kwa 20% katika zoezi moja
linaloweza kukaguliwa, na awamu imetangazwa katika `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Kilichobadilika                                                                                                                                                                                                                     | Mahali                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — idadi ambazo ndogo ni bora ×1.2, asilimia ambazo kubwa ni bora ÷1.2 (kiwango cha chini cha coverage cha 60 kimehifadhiwa, `eslintErrors` inabaki 0, `eslintWarnings` 0 → 20% ya idadi iliyogandishwa ya vizuio) | `quality-baseline.json` (dokezo la `_relax_velocity_2026_08_30` linaorodhesha kila kabla → baada)      |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                    | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, kila kikomo cha mistari cha `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                    | `file-size-baseline.json`                                                                              |
| idadi kwa kila faili / kwa kila msimbo wa TS ×1.2                                                                                                                                                                                   | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                 | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` inakuwa ya ushauri wakati `_policy.requireTighten === false`                                                                                                                                                    | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| `bank-ratchet-shrinks` ya kila usiku imesitishwa (ingehifadhi upungufu uliopimwa na kuondoa nafasi ya ziada)                                                                                                                        | `.github/workflows/nightly-release-green.yml`                                                          |

Orodha za ruhusa (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **si** bajeti na hazikuguswa. Vizuizi vya sera vya kupita/kufeli (siri, kanuni za SQL,
mkataba wa docs/env, usawa wa i18n, majaribio ya vipengele) havijabadilika — jaribio jekundu bado ni jaribio jekundu.

**Zana**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — ulegezaji
  wa mara moja (`scripts/quality/relax-baselines.mjs`); hukataa kuendeshwa mara mbili kwa
  dokezo lilelile.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  hupima kila kizuizi cha nambari kwa njia ileile inayotumiwa na CI na kuchapisha nafasi iliyosalia kwa kila kizuizi
  (`scripts/quality/baseline-headroom.mjs`). Job ya kila usiku ya `baseline-headroom` huchapisha
  jedwali katika muhtasari wa utekelezaji wa workflow na kupakia ripoti yake ya JSON/Markdown kama
  `baseline-headroom-<run_id>`, inayohifadhiwa kwa siku 90. Safu za onyo na hatari hubainisha vizuizi
  vilivyo ndani ya 10% ya kikomo chake au ambavyo tayari vimekizidi. Kagua ripoti hizi kama onyo la mapema kwamba
  bajeti zinatumika; kagua madokezo ya `_rebaseline_*` ya kizuizi husika. Job hiyo
  haiundi tena wala kusasisha issue ya kudumu; #12149 huhifadhi historia ya ripoti za awali.

**Hali ya msimbo mpya (Clean-as-You-Code) — tangu 2026-08-30, njia ya haraka ya PR pekee**

Kwenye matukio ya `pull_request`, `quality.yml` hupitisha `--base-ref <PR base SHA>` kwa `check:file-size`,
`check:complexity-ratchets` na `check:dead-code`. Kwa `check:complexity-ratchets` na
`check:dead-code`, kizuizi hulinganisha HEAD na merge-base **kwa kuzingatia faili ambazo PR
imegusa pekee** (`scripts/check/newCodeMode.mjs`: merge-base huwekwa katika
`git worktree` ya muda, ESLint/knip huendeshwa humo na kwenye HEAD, kisha idadi za kila faili hulinganishwa kwa tofauti):

- **kizuizi** — PR iliongeza ukiukaji wa cyclomatic/cognitive au exports zilizokufa katika faili ilizobadilisha
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` kwenye kumbukumbu);
- **ushauri** — jumla ya kimataifa dhidi ya msingi uliogandishwa. Mkengeuko uliorithiwa kamwe hausababishi
  PR isiyohusika kuwa nyekundu; mkengeuko hugandishwa upya wakati wa upatanishaji wa toleo na kufuatiliwa na job ya headroom.

`check:file-size` hutumia base ref kwa masharti yake yenyewe (`scripts/check/check-file-size.mjs`, #8522):
hukagua kila faili ya chanzo na ya majaribio katika tree, husoma idadi ya mistari ya kila moja kwenye msingi wa PR
kwa kutumia `git show`, na hufelisha faili tu inapokua na kuzidi kikomo kikubwa zaidi kati ya kikomo chake cha msingi
(`frozen` / `testFrozen`, au `cap` / `testCap` kwa faili iliyo nje ya msingi) na ukubwa wake wa msingi.
Kwa hiyo, faili ambayo tayari imekengeuka kwenye msingi kamwe haisababishi PR isiyohusika kuwa nyekundu.

`check:boundary:ratchet` hutumia kanuni hiyo hiyo kwa nambari yake moja
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): kwenye matukio ya PR, vizuizi vya haraka vya
`quality.yml` na jukumu la lint la `ci.yml` hupitisha SHA ya msingi ya PR, commit ya msingi
hupimwa kutoka kwenye toleo lililosafirishwa la `git archive`, na PR hushindwa tu wakati idadi ya miunganisho yake ya
`open-sse → src` inapozidi thamani kubwa zaidi kati ya `metrics.boundaryOpenSseToSrc` na idadi kwenye msingi. Mkengeuko wa msingi
ulio juu ya kikomo huripotiwa (`base drift herdado`) lakini kamwe hausababishi PR isiyo na kosa kushindwa; push → main
hudumisha kikomo kamili, na SHA ya msingi isiyoweza kutatuliwa hurudi kukitumia pamoja na onyo.

Uendeshaji wa `workflow_dispatch`, ukaguzi wa jumla wa release-green na jukumu la usiku la headroom havina msingi wa PR
na hudumisha ulinganisho kamili (wa kimataifa). Coverage, duplication na type-coverage zinasalia za kimataifa
kwa sasa (zana zake hazitoi diff ya kila faili kwa gharama ndogo) — ni wagombea wa kushughulikiwa vivyo hivyo.

**Kufunga awamu katika v4.0 (LTS = kali zaidi kuliko awali, si "kurudi katika hali ya kawaida")**

1. Kwenye ncha halisi ya `release/v4.0.0`: `npm run quality:headroom --json` kwa ajili ya kumbukumbu, kisha
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, na `--update` ya kila kizuizi cha typecheck
   — kila baseline hushuka hadi thamani iliyopimwa.
2. Futa `_policy` kutoka `quality-baseline.json` (huwasha tena `--require-tighten` na uwekaji akiba wa usiku),
   rejesha `THRESHOLD = 36` (au zaidi) katika `check-openapi-coverage.mjs`.
3. Kaza zaidi ya kiwango kilichopimwa pale ambapo umoduli ulileta manufaa: rejesha `cap` ya file-size hadi 1000
   (au 800), ongeza viwango vya chini vya coverage kwa 5, na weka dead exports kuwa 0 kwa packages zilizofanyiwa umoduli.

## Kiwango cha Msingi cha Ratchet (`quality-baseline.json`)

Injini ya ratchet (`scripts/quality/check-quality-ratchet.mjs`) husoma `quality-baseline.json`
na kuilinganisha na `quality-metrics.json` iliyokusanywa upya. Kipimo chochote kinachorudi nyuma
zaidi ya epsilon yake husababisha ujenzi kushindwa.

Vipimo vinavyofuatiliwa kwa sasa:

| Kipimo                | Mwelekeo | Maana                                        |
| --------------------- | -------- | -------------------------------------------- |
| `eslintWarnings`      | `down`   | Idadi ya maonyo ya ESLint lazima isiongezeke |
| `coverage.statements` | `up`     | Ufunikaji wa kauli lazima usipungue          |
| `coverage.lines`      | `up`     | Ufunikaji wa mistari lazima usipungue        |
| `coverage.functions`  | `up`     | Ufunikaji wa vitendaji lazima usipungue      |
| `coverage.branches`   | `up`     | Ufunikaji wa matawi lazima usipungue         |

Ili kusasisha kiwango cha msingi baada ya uboreshaji halisi:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Bendera ya `--update` huandika thamani zilizopimwa kwa sasa kwenye `quality-baseline.json`.
Commit faili hii pamoja na badiliko lililoboresha kipimo. PR inayoboresha
kipimo bila kusasisha kiwango cha msingi itagunduliwa na `--require-tighten` (Awamu ya 6A.5,
utekelezaji bado unasubiri).

### Ratchet ya CodeQL: marudio ya kuonyesha upya na kichochezi cha mikono

`check:codeql-ratchet` husoma **hali ya hazina, ambayo huonyeshwa upya kwa ratiba — si kwa kila PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` huripoti
`state: configured`, `schedule: weekly`: uchanganuzi wa default-setup wa GitHub, si uchanganuzi
wa kila push. Matokeo yake: baada ya PR INAYOREKEBISHA arifa kuunganishwa, ratchet huendelea kusoma
idadi ya zamani, iliyo juu zaidi hadi uchanganuzi unaofuata ulioratibiwa utekelezwe — kwa hivyo huripoti kurudi nyuma
kwenye kila PR iliyo wazi, ikiwemo PR za ufuatiliaji za PR yenye marekebisho, hadi uchanganuzi ufikie hali ya sasa.

**Kuonyesha upya kwa mikono**: `gh workflow run codeql.yml --ref release/vX.Y.Z` huendesha upya
uchanganuzi na kuchapisha tena arifa ndani ya dakika chache. Soma `.github/workflows/codeql.yml`
kwanza — kichwa chake kinaeleza kuwa ni ya `workflow_dispatch` pekee **kwa sababu inakinzana na
"default setup" ya GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Kurejesha vichochezi vya `push`/`pull_request`/
`schedule` kunahitaji **hatua ya mmiliki kwanza**: Settings → Code security →
CodeQL: Default → Advanced. Usiongeze kichochezi cha `schedule:` bila kubadilisha mpangilio huo — kitaishia
tu kuzalisha utekelezaji unaoshindwa.

**Kaza kiwango cha msingi baada ya idadi kupungua** — `node scripts/check/check-codeql-ratchet.mjs
--update` huandika idadi mpya iliyopimwa kwenye `quality-baseline.json` →
`metrics.codeqlAlerts.value`, ili ratchet isiruhusu kimyakimya kurudi nyuma hadi
kikomo cha zamani. Mfano uliotekelezwa (2026-09-02/03): PR #12502 ilirekebisha arifa 7 halisi
(13 → 6 zilipimwa kuwa wazi); PR #12530 ilikaza kiwango cha msingi kilichogandishwa kutoka 11 → 6 ili kilingane; arifa
6 zilizosalia zilikataliwa kwa uhalalishaji wa kila arifa hadi zikafikia 0 zilizo wazi.

**Kukataliwa kwa arifa ni uamuzi wa mwendeshaji (Kanuni Ngumu #14)** — usiwahi kukataa arifa ya CodeQL
bila kurekodi uhalalishaji wa kiufundi katika maoni ya kukataa: `won't fix` kwa
sharti la itifaki ya upstream, `used in tests` kwa fixture ya majaribio, `false positive`
kwa sanitizer ambayo CodeQL haiwezi kuona (mfano wa awali: `docs/security/ERROR_SANITIZATION.md`).

---

## Sera ya Kujaribu Tena Vipimo (WS5.4, v3.8.49)

Kujaribu tena hufanywa kwa kila runner, kamwe si kwa ujumla — kujaribu tena kwa ujumla hubadilisha hitilafu halisi
kuwa dosari za muda zisizoonekana:

| Runner           | Sera                                                                                                                                                                                         | Sababu                                                                                                                                         |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` katika CI pekee, pamoja na `trace: on-first-retry`                                                                                                                              | Muda wa kivinjari/mtandao kwa kweli hautabiriki; jaribio moja la ziada lenye trace hugeuza dosari ya muda kuwa artefakti inayoweza kuchunguzwa |
| Vitest           | HAKUNA kujaribu tena kwa ujumla. Kipimo kilichothibitishwa kuwa na dosari ya muda hupata jaribio la ziada lililobainishwa kwa kipimo hicho (linaonekana katika diff, linakaguliwa katika PR) | Huweka orodha ya karantini ndani ya repo, kamwe isiwe fiche                                                                                    |
| node:test (unit) | HAKUNA kujaribu tena, kamwe                                                                                                                                                                  | Kipimo cha unit chenye dosari ya muda ni hitilafu katika kipimo — kirekebishe, usikifanyie bahati nasibu tena                                  |

SLO lengwa pindi telemetria ya dosari za muda itakapopatikana (WS5.2/5.3): kiwango cha dosari za muda cha <1% kwa kila kipimo
(kizingiti cha "rekebisha sasa"), kiwango cha kufaulu cha ≥95% kwa kila pipeline. Thamani za marejeleo za sekta —
zisawazishe upya kulingana na vipimo vyetu wenyewe.

## Mkengeuko wa Ratchet katika Kiwango cha Toleo (WS5.5, v3.8.49)

Ratchet (ukubwa wa faili, uchangamano, maonyo ya eslint) inapodorora kwenye ncha HALISI ya toleo
— yaani, MCHANGANYIKO wa merge ndio ulioisababisha idorore, na hakuna PR moja inayoweza kuzalisha tena
dororo hilo kwenye branch yake yenyewe — jukumu la marekebisho ni la **nahodha wa toleo, mara moja, kwenye
branch ya toleo**: pendelea kutoa sehemu/refactor; weka baseline upya tu ukiwa na ingizo la sababu
lililoandikwa. Kamwe usimsukumie mchangiaji mkengeuko unaotokana na mchanganyiko kupitia PR yake, na kamwe
usiweke baseline upya kwa kila PR (hilo huficha dororo halisi). Tofautisha kwanza: zalisha tena hali
nyekundu dhidi ya ncha halisi katika worktree ya uchunguzi kabla ya kudhani PR yako ndiyo iliisababisha.

## Kuhifadhi Mapunguzo ya Ratchet — mwelekeo wa kushuka (#8584)

Ratchet ni nusu otomatiki tu, na ni nusu isiyofaa. **Kuongeza** kikomo ni uhariri wa JSON
wa mikono unaochukua sekunde kumi na ndiyo njia ya haraka zaidi ya kuondoa kizuizi kwenye PR nyekundu.
**Kupunguza** kikomo kunahitaji mtu aendeshe `--update` na aweke matokeo kwenye commit — na hadi
job ya `bank-ratchet-shrinks` ilipoanzishwa, hakuna workflow iliyokuwa ikifanya hivyo. Matokeo yaliyopimwa
(2026-07-25): faili 18 zilizogandishwa tayari zilikuwa na au chini ya kikomo cha faili mpya cha mistari 800, mbaya zaidi
ikiwa 132× (`src/shared/validation/schemas.ts`, mistari 19 ikiwa na kikomo cha 2,523); kiwango cha juu cha
uchangamano kilipanda `1794 → 2169` kupitia takribani madokezo 37 ya kuweka baseline upya huku kukiwa na punguzo moja tu
(−1); na "bana kupitia `--update` katika mzunguko unaofuata" iliandikwa mara 31 na kutekelezwa
mara moja. Kikomo kinachoendelea kuwepo baada ya msimbo uliokisababisha kuondolewa hubadilisha kimyakimya kila
utenganishaji uliokamilika kuwa ruhusa ya ukuaji kwa yeyote atakayehariri faili baadaye.

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** hufunga mzunguko huo:

|                   |                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------- |
| Huendeshwa kwenye | `schedule` (3×/siku) + `workflow_dispatch` — kimakusudi **si** `push`                                         |
| Hupima            | `release/vX.Y.Z` ya juu zaidi, kwa utatuzi sawa + kinga dhidi ya injection kama `release-green`               |
| Huandika          | `check:file-size --update` na `check:complexity-ratchets --update` (zote zimeundwa kupunguza pekee)           |
| Huthibitisha      | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                      |
| Husafirisha       | PR moja inayosasishwa kila wakati dhidi ya branch ya toleo — husasishwa kwa lazima, kamwe haitumiwi kwa wingi |

Uhifadhi hufanywa kwa mafungu badala ya kwa kila push kwa sababu hauna sharti la muda wa kusubiri (punguzo
linalohifadhiwa ndani ya saa 8 linatosha), ilhali kuendesha kwa kila merge kungejenga upya branch ya PR mara kwa mara
wakati wa kampeni za merge na kugharamia ukaguzi kamili wa ESLint kila mara. Ugunduzi hubaki kwenye
push (`release-green`); uhifadhi pekee ndio unaofanywa kwa mafungu.

### Kithibitishaji cha usalama

Job huandika kwenye baseline bila usimamizi, kwa hivyo `verify-ratchet-bank.mjs` ndicho kinachofanya
hilo likubalike. Hulinganisha tree ya baada ya `--update` dhidi ya `HEAD` na **husitisha job
kabla commit yoyote haijaundwa** — bila kufungua PR — isipokuwa kila badiliko ni mojawapo ya:

- ingizo la nambari la `frozen` / `testFrozen` **limepunguzwa** au **limeondolewa**
- `complexity-baseline.json` → `count` **imepunguzwa**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **imepunguzwa**

Kitu kingine chochote husababisha kushindwa: kuongeza nambari, kuongeza ingizo, kubadilisha `cap`/`testCap`, au
kufuta/kuandika upya dokezo la `_rebaseline_*` (madokezo hayo ndiyo rekodi ya ukaguzi inayoeleza kwa nini kila
kiwango cha juu kipo na yanahifadhiwa ndani ya object ileile ya `frozen` pamoja na maingizo ya faili).
Bot inayoweza kuongeza kikomo ingekuwa mbaya zaidi kuliko hali ya sasa. Kinga dhidi ya dororo:
`tests/unit/verify-ratchet-bank.test.ts`.

Job haisukumi kamwe kwenye `release/*` — binadamu huunganisha PR, kwa hivyo kipimo kibaya
hakiwezi kuingizwa bila kukaguliwa.

## Sera ya Orodha ya Ruhusa

Kila lango ambalo haliwezi kushindwa kwa ukiukaji uliokuwepo awali hutumia orodha ya ruhusa isiyobadilika
(k.m., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Sera ni:

**Rekebisha chanzo cha tatizo; tumia orodha ya ruhusa tu wakati ukiukaji ulikuwepo awali na
hauwezi kurekebishwa katika PR hiyo hiyo.**

Unapoongeza ingizo kwenye orodha ya ruhusa:

1. Jumuisha maoni yenye sababu.
2. Rejelea suala la ufuatiliaji (k.m., `// #3498 — Kipengele cha Awamu ya 2, bado hakijatekelezwa`).
3. Ondoa ingizo katika PR hiyo hiyo inayorekebisha ukiukaji — ingizo lililopitwa na wakati ambalo halizuii tena
   ukiukaji unaotumika lenyewe ni hitilafu (utekelezaji wa ukaguzi wa maingizo yaliyopitwa na wakati wa 6A.3
   utasababisha lango kushindwa kwa ingizo la orodha ya ruhusa lisilo na ukiukaji husika baada ya kutekelezwa).

**Usiongeze** maingizo kwenye orodha ya ruhusa ili kufanya majaribio yapite haraka zaidi. Lango linalofaulu huku
orodha ya ruhusa ikiongezeka hutoa hisia potofu ya ubora.

### Wakati lango linaposhindwa kwenye PR yako

1. **Soma matokeo ya lango kwa makini** — yanakuambia hasa faili au alama iliyokiuka
   sheria.
2. **Rekebisha ukiukaji** — malango mengi ni ukaguzi bainifu wa mfumo wa faili unaofaulu mara tu
   msimbo unapokuwa sahihi.
3. **Ikiwa ukiukaji ulikuwepo awali** (yaani, hukuusababisha lakini sasa lango
   linaukagua): ongeza ingizo kwenye orodha ya ruhusa likiwa na maoni ya sababu na suala la ufuatiliaji.
4. **Ikiwa lango ni la aina ya ratchet** (ufunikaji, maonyo ya ESLint, urudufu, uchangamano):
   badiliko lako limefanya kipimo kuwa kibaya zaidi. Rekebisha tatizo la msingi, au (mara chache) endesha
   `npm run quality:ratchet -- --update` ikiwa badiliko limekusudiwa na kushuka kwa
   kipimo kunakubalika — lakini eleza sababu katika maelezo ya PR.
5. **Malango ya ushauri** (`continue-on-error: true`) ni ya taarifa — hayazuii
   uunganishaji lakini yanaonekana katika muhtasari wa CI. Yarekebishe hata hivyo.

---

## Kuongeza Lango Jipya

1. Unda `scripts/check/check-<name>.mjs` (au `.ts`). Malango ya sera hutoka kwa 0/1.
   Malango ya aina ya ratchet hutoa kipimo kwenda `quality-metrics.json` kupitia `collect-metrics.mjs`.
2. Ongeza `"check:<name>": "node scripts/check/check-<name>.mjs"` kwenye `package.json`.
3. Liunganishe katika `.github/workflows/ci.yml` chini ya kazi inayofaa
   (sera → `lint` au `docs-sync-strict`; ratchet → `quality-gate`).
4. Ikiwa lina orodha ya ruhusa, tumia `reportStaleEntries()` kutoka
   `scripts/check/lib/allowlist.mjs` ili maingizo yaliyopitwa na wakati yatambuliwe kiotomatiki.
5. Andika jaribio katika `tests/unit/build/` linaloshughulikia mantiki ya utambuzi ya lango.
6. Sasisha hati hii (ongeza safu kwenye jedwali la kazi husika).

---

## Zana za wakala: LSP-in-the-loop (hiari)

Zaidi ya malango ya CI, OmniRoute huja na kiunzi cha **hiari** cha `agent-lsp`
(`.mcp.json` ya kiwango cha mradi, Awamu ya 7 Jukumu la 15). Unda `.mcp.json`
ili kutoa seva ya lugha ya TypeScript kwa mawakala wa uandishi wa msimbo, ili watambue alama /
uchunguzi **kabla** ya kuandika msimbo — nyenzo ya kukamilisha `typecheck:core` inayotekeleza ukusanyaji kabla ya madai
na kupunguza makosa ya "alama zilizobuniwa" kuanzia kwenye chanzo. Kwa makusudi
haipakuliwi kiotomatiki (unachagua na kuthibitisha daraja la MCP↔LSP); ingizo lenye hitilafu hurekodi tu
kosa la muunganisho na kamwe halivunji vipindi.

---

## Orodha ya Maboresho Yanayosubiri (mapitio ya ROI — Awamu ya 9 Wimbi la 3)

Orodha hii ilioanishwa na `ci.yml` tarehe 2026-06-17 (toleo la awali liliacha
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Mapitio ya ROI ya seti iliyoanishwa
yalibaini yafuatayo kuwa mambo yanayoweza kurahisishwa. **Miunganisho hiyo ni mabadiliko
ya kimakanika ya CI; mabadiliko ya hali/ufutaji ni maamuzi ya sera yaliyohifadhiwa kwa
mwendeshaji.** Hakuna kilicho hapa chini ambacho kimetekelezwa bado.

**Pia hayajaandikwa hapo juu** (ya ushauri, ishara dhaifu): kazi ya `docs-lint`
(markdownlint + Vale, kazi nzima ikiwa na `continue-on-error`) na mitiririko huru ya kazi
ya uchanganuzi `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` ipo
katika `quality-baseline.json` lakini haijaunganishwa na ratchet inayozuia katika `ci.yml` — kipimo hicho
kwa sasa hakijaunganishwa na chochote.

### Unganisha / ondoa urudufu (kimakanika, hatari ndogo)

Kila kipengele kilithibitishwa dhidi ya hali halisi ya vizuizi tarehe 2026-06-17 (amini-lakini-thibitisha);
miunganisho kadhaa "iliyo dhahiri" ilibainika kuficha deni na **si** vibadala safi vinavyoweza kuwekwa moja kwa moja.

- **`check:docs-sync` huendeshwa mara mbili** — kivyake katika kazi ya `lint` na tena ndani ya `check:docs-all` (`docs-sync-strict`) na hook ya husky ya pre-commit. ✅ **IMEKAMILIKA** — mwito wa pekee wa `lint` umeondolewa.
- **Uchanganuzi wa CVE** — ❌ **SI muunganisho safi.** `audit:deps` hushindwa moja kwa moja kwa CVE yoyote ya kiwango cha juu/muhimu; `check:vuln-ratchet` (osv) hushindwa tu kunapokuwa na _kurudi nyuma_ ikilinganishwa na baseline (kwa sasa 1 MODERATE). Maana zake ni tofauti — kuondoa `audit:deps` kungeondoa kizuizi kamili cha kiwango cha juu/muhimu. Zihifadhi zote mbili.
- **Ugunduzi wa mizunguko** — ✅ **IMEKAMILIKA** (#15159 G-01/G-02). Maandishi ya zamani hapa yaliita `check:cycles` kizuizi "cha kijani, kilichoratibiwa" na kuhalalisha kukiweka kama kizuizi kwa sababu `check:circular-deps` (dpdm) iliripoti mizunguko 91. Hali hiyo ya kijani ilikuwa **hali ya kijani ya uongo**: `check:cycles` ilichanganua saraka ndogo 5 (faili 450), ililinganisha tu `import|export … from` tuli, na ilitupilia mbali kila kibainishi cha `@/` na `@omniroute/open-sse/`, kwa hivyo haikuweza kuona mizunguko ya dynamic-import + alias iliyotawala repo. Imerekebishwa: kizuizi sasa hupitia `src` + `open-sse` (faili 5023), hukusanya vibainishi kutoka TypeScript AST (kwa hivyo `import("…")` huhesabiwa lakini `typeof import("…")` ya nafasi ya aina haihesabiwi), na hutatua `paths` za tsconfig. Kinapata mizunguko **14**, si 0. Kwa kuwa mizunguko 14 iliyokuwepo awali haiwezi kurekebishwa katika PR ya kizuizi, `check:cycles` sasa ni **ratchet** (`--ratchet`, kikomo `metrics.cycles.value = 14` katika `quality-baseline.json`, `direction: down`) — huzuia _kurudi nyuma_ kokote na idadi inaweza kupungua tu. CI huendesha `npm run check:cycles:ratchet`. Upunguzaji wa hatua kwa hatua unaendelea pamoja na **A-01**. `check:circular-deps` (dpdm) inabaki kuwa ya ushauri kama maoni mapana ya pili.
- **Uchangamani** — ✅ **IMEKAMILIKA** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): mpito mmoja wa ESLint, huhesabu kwa ruleId ili baseline za cyclomatic+max-lines na cognitive zibaki huru; `check:complexity` / `check:cognitive-complexity` binafsi zinabaki kwa `--update` ya ndani.
- **Kuzuia uzushi wa `/api`** — ✅ **IMEKAMILIKA** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): orodha moja ya FS ya `src/app/api`, openapi-routes + docs-symbols bado huripoti kivyake; kila moja inabaki kwa utekelezaji wa ndani.
- **`check:node-runtime` huendeshwa katika kazi 11** — ⚠️ **ROI ndogo.** Kila moja ni runner tofauti na ukaguzi ni <1s; jumla ya muda unaookolewa ni ~10s, dhidi ya kupoteza ulinzi nafuu wa kila kazi. Haifai usumbufu wa mabadiliko.
- **`typecheck:noimplicit:core` kwenye lint ya CI** — ✅ **imeondolewa kwenye kazi ya lint** (ilikuwa ya ushauri ikiwa na `continue-on-error`); sehemu ya aina inayozuia ni `typecheck:core` + `check:type-coverage`. Script ya ndani imehifadhiwa.

### Badilisha hali / amua (sera ya mwendeshaji)

- `check:openapi-security-tiers` (ya ushauri) — ❌ **HAIWEZI kubadilishwa hali kwa usafi.** Hutoka kwa 0 lakini huonya kuwa routes kadhaa za `traffic-inspector` chini ya `LOCAL_ONLY_API_PREFIXES` hazina anoteshini ya `x-loopback-only: true`. Kuilazimisha kunahitaji kwanza kuongeza anoteshini hizo kwenye `openapi.yaml`.
- `typecheck:noimplicit:core` (ya ushauri) — kwa kiasi kikubwa imejumuishwa na ratchet inayozuia ya `check:type-coverage`. Ibadilishe kuwa ratchet au ondoa mpito wa pili wa `tsc` unaojirudia.
- `test:vitest:ui` (sasa **inazuia**) — hitilafu zilizokuwepo awali zimeondolewa waziwazi katika `vitest.config.ts` kwa maoni ya ufuatiliaji ya `// #8618`; hitilafu mpya husababisha kazi kushindwa.
- `check:secrets` (gitleaks, ratchet inayozuia iliyogandishwa katika false-positive 3 zilizoandikwa) — ziweke hizo 3 kwenye allowlist ili kufikia 0, au ishushe kuwa ya ushauri. Inaingiliana na uchanganuzi asilia wa siri wa GitHub + `check:public-creds`.
- `check:pr-evidence` (inazuia, hutafuta maandishi ya mwili wa PR kwa grep) — hatari kubwa ya false-positive; kuiondoa kunadhoofisha utekelezaji wa Hard Rule #18, kwa hivyo hili ni chaguo halisi la sera.
- `semgrep` (huru na ya ushauri) — inaingiliana na CodeQL kwa familia za OWASP; unganisha baseline yake na ratchet au iondoe.

---

## Nyaraka Husika

- Mnyororo wa ugavi (asili, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — kizuizi cha ulinganifu wa seti za funguo

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, kazi `i18n-ui-coverage`).
Hulinganisha seti ya funguo za mwisho ya kila `src/i18n/messages/<locale>.json` na `en.json` na hushindwa
ikiwa kuna funguo zozote za mwisho zinazokosekana au za ziada, bila kujali ufunguo uliongezwa lini. Vishikilia nafasi vya
`__MISSING__:` huhesabiwa kuwa vipo (maudhui yake yanahusika na kizuizi cha uwiano). Hiki ndicho kikamilisho kamili
cha vizuizi viwili vinavyotegemea tofauti/asilimia: `check-ui-keys-coverage` hulazimisha kiwango cha chini cha 80 % kwa
kila lugha (funguo 43 zinazokosekana kati ya ~13,000 bado huonyesha 99.7 %) na `check-new-key-coverage` hutathmini
funguo ambazo PR huongeza kwenye `en.json` pekee. Kundi la lugha hutengenezwa kutoka kwa `en.json` ya siku
tawi lake linapoundwa na hutafsiriwa kwa siku kadhaa huku msingi ukiendelea kuongeza funguo; PR ya kundi lenyewe haiongezi
ufunguo wowote, kwa hivyo vizuizi vyote viwili havikutoa tahadhari wakati kundi la 1 (#13044) lilipounganishwa likiwa na upungufu wa funguo 43 katika lugha tisa
na kundi la 2 (#13660) likiwa na upungufu wa funguo 10 katika lugha nane (2026-09-15). Rekebisha hali nyekundu kwa
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; ufunguo wa mwisho wa `extra`
unamaanisha chanzo kiliuondoa — ufute kutoka kwenye lugha hiyo. `--warn` hutoa ripoti bila kusababisha kushindwa.
`--catalog=cli` huendesha ulinganisho uleule kwenye `bin/cli/locales` (`npm run i18n:check-keys:cli`);
hatua zote mbili zimo katika kazi `i18n-ui-coverage`.

#### `check-new-key-coverage` — kizuizi cha i18n cha funguo mpya

Kizuizi kinachofanana na `check-ui-value-drift`. Hicho hugundua thamani ya Kiingereza ambayo **iliandikwa upya**
huku tafsiri zake zikiachwa bila kubadilishwa; hiki hugundua ufunguo wa Kiingereza ambao **uliongezwa**
huku baadhi ya lugha zikiwa hazijaupokea kamwe.

`check-ui-keys-coverage` haiwezi kuona hali hii: hulazimisha kiwango cha chini cha asilimia kwa kila lugha, na
funguo kumi na moja zinazokosekana kati ya ~13,000 huacha ufunikaji ukiwa 99.9%. Asilimia kwa kila lugha haiwezi
kueleza "kipengele hiki kilitolewa bila kutafsiriwa" — kipengele kizima kinaweza kuingizwa katika lugha mpya bila
maandishi yoyote na bila kubadilisha kamwe nambari hiyo.

Tukio linalowakilishwa nayo: Awamu ya 3 ya Orchestration Canvas ilitafsiri funguo zake kumi na moja katika
lugha 42 zilizokuwapo wakati huo. Saa chache baadaye kundi la lugha za EU (#13044) lilifikisha hazina
kwenye lugha 51, na lugha tisa mpya (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) hazikuzipokea
kamwe. `deepMergeFallback` huweka Kiingereza badala ya ufunguo unaokosekana, kwa hivyo hali ya hitilafu ilikuwa
UI isiyotafsiriwa badala ya UI tupu — tatizo halisi, na ambalo halitoi ishara kwa muundo wake.

Kama kizuizi kinachofanana nacho, hiki **hutambua tofauti**, kikilinganisha Kiingereza katika msingi wa muunganisho na mti
wa kazi, kwa hivyo mapengo yaliyokuwapo awali hubaki bila kubadilika na kizuizi hakikuhitaji uhamishaji ili kuwashwa.

**Alama ya `__MISSING__:<english>` haikidhi sharti hili (tangu 2026-09-17).** Hapo awali ilikuwa njia
iliyoandikwa ya kuahirisha — wakati wa utekelezaji hurudi kwenye Kiingereza sahihi — hadi PR nane za vipengele za
2026-09-16 zilipoongeza funguo 61 na kuweka alama hiyo katika lugha zote 65 badala ya kutafsiri: kizuizi hiki
kilikubali kila moja, hakuna kilichozuia PR hizo, na kisha kizuizi cha lazima cha uwiano wa tafsiri halisi
kilishindwa kwenye ncha ya toleo kwa kila mtu (pt-BR 3.2 % > 2.5 % + 0.5). Sasa alama hutathminiwa
kama tafsiri inayokosekana. Rekebisha hali nyekundu kwa
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, au
lugha zote kwa sambamba kwa `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
salama ikiwa imetenganishwa, hukataa kuanza bila mazingira ya `OMNIROUTE_TRANSLATION_*`). Ufunguo ambao lazima ubaki
kwa Kiingereza (jina la bidhaa/injini/bendera lililowekwa lisibadilike) unapaswa kuwa katika `scripts/i18n/untranslatable-keys.json`,
kamwe usifiche nyuma ya alama. `vi` hupiga marufuku alama kabisa (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — kizuizi cha majaribio yaliyowekwa kando

Faili iliyo katika orodha ya `exclude` ya `vitest.config.ts` ni jaribio ambalo haliendeshwi, na huonekana kama
ufunikaji kwa yeyote anayesoma mti. Faili sitini na mbili zilikusanyika nyuma ya maoni
`// #8618 — hitilafu iliyokuwapo awali; ondoa utengaji huu ikirekebishwa`. Suala #8618 lilifungwa tarehe
2026-08-11 huku orodha iliyokuwa ikifuatilia ikikua kutoka vipengee 45 hadi 62, kila kipya kikurithi maoni
yanayoelekeza kwenye suala lililokufa. Hatimaye orodha ilipopimwa faili moja baada ya nyingine (#13204), **faili 51 kati ya 62
zilifaulu dhidi ya mti wa sasa bila mabadiliko yoyote ya msimbo chanzo**.

Kizuizi kinahitaji kila utengaji unaolingana na faili halisi (a) utaje suala la ufuatiliaji na
(b) uonekane katika `config/quality/vitest-exclusions.json` pamoja na hali yake iliyopimwa, ili kuongeza mmoja kuwe
tofauti inayoweza kukaguliwa katika faili mahususi badala ya kuwa mstari mwingine katika safu yenye vipengee 60. Kwa makusudi,
hakiendeshi tena majaribio yaliyotengwa — hilo huchukua ~dakika 10 na linapaswa kuwa katika kazi ya mara kwa mara;
orodha hiyo hurekodi wakati kila moja lilipopimwa mara ya mwisho.
