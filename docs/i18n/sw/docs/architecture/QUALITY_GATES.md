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

## Hesabu ya lango na profaili za utekelezaji

### Kiingilio cha mgombea

Mitiririko ya kazi CI na Quality Gates kila moja inatoa uamuzi thabiti: `Gate / CI` na `Gate / Quality`. Sera yao ya uandikishaji iliyobadilishwa inaorodhesha kila kazi ya juu kama inavyohitajika au ushauri. Kazi inayohitajika lazima ifaulu: kukosa, kughairiwa, kurukwa, inasubiri na matokeo yasiyojulikana hayawezi kuanzisha PASS. Uainishaji halali wa hati pekee au katalogi pekee unaweza kufanya njia ya msimbo isitumike; rasimu ya PR si mgombeaji anayekubalika. Lebo `hotfix` haiondoi ushahidi.

Mitiririko yote miwili ya kazi hufunika PRs katika matawi ya main/release, inasukuma hadi `main`, utumaji wa mikono na matukio ya kuunganisha kikundi. Sukuma, tuma na unganisha kikundi endesha uteuzi kamili. Misukumo hadi `release/**` haianzi (2026-10-18): kila badiliko tayari liliendesha matrix kwenye PR yake na mchanganyiko uliounganishwa ni kazi ya Release-Green (`docs/ops/RUNNER_BOX.md` → host lane). Uma na vikundi vya kuunganisha hutumia wakimbiaji waliopangishwa kwa kazi ambazo vinginevyo huchagua wakimbiaji wanaojitegemea; uwezo wa kutosha uliopangishwa lazima uthibitishwe kabla ya kusambaza.

PR ya kawaida huendesha uteuzi wa haraka. Njia za `full-code` na `full-code-e2e` za sera ya uandikishaji (E2E, ushirikiano, vizalia vya programu vya kifurushi, moshi Electron, Bun SQLite, mfumo wa ikolojia na wateja wa itifaki) huendeshwa tu kwenye rasimu ya foleni ya Mergify au kwa kukimbia kamili: `gh workflow run ci.yml --ref <branch>`.

Kila risiti ya JSON inabainisha SHA iliyoangaliwa, mtiririko wa kazi na jaribio. CLI inakataa kutolingana kwa checkout/event SHA. Majaribio ya mtiririko wa kazi hufunga uanachama wa sera kwenye orodha `needs` ya kazi ya uamuzi ili njia mpya au iliyoondolewa haiwezi kutoweka kimya kimya. Stakabadhi hufunika mtiririko wao wa kazi, si uchapishaji, utumaji, au mambo ya ndani ya kichanganuzi kilichopo cha ushauri. Kuamilisha majina ya hundi zote mbili katika sheria za tawi ni mabadiliko tofauti ya kiutawala; kuongeza kazi hizi yenyewe hailindi tawi.

### Unganisha foleni

Lebo `queue` hutuma PR kwenye foleni ya Mergify (`.mergify.yml`). Mergify hufungua rasimu ya PR kwenye tawi la `mergify/merge-queue/`, CI huendesha uteuzi kamili hapo, na PR asili huunganishwa wakati `Gate / CI`, `Gate / Quality` na `Merge integrity (changelog + generated skills)` zinapita.

Mergify huandika muhtasari wake wa foleni katika maelezo ya rasimu, na programu zingine pia zinaweza kuihariri. Tukio la `pull_request` `edited` kwenye rasimu kama hiyo huchukua kundi lake la sarafu (`-queue-edit-<run_id>`) kwa hivyo haliwezi kughairi utendakazi halisi wa rasimu, na linaruka lango na tumbo. Ni `Merge integrity` pekee bado inaendelea. Kazi ya lango iliyorukwa hubeba jina tofauti la hundi, kwa sababu Mergify husoma `Gate / CI` iliyoruka kama hundi iliyofeli na kupanga PR.

Baada ya msururu, msukumo hauleti PR kila wakati. Toa maoni `@mergifyio queue` juu yake.

### Orodha ya skanning tuli

Orodha ya toleo la npm-alias na uanachama wa kuchanganua tuli huishi `config/quality/gate-manifest.json`. Endesha `npm run check:gate-manifest` ili kuthibitisha majina ya hati na amri kamili dhidi ya `package.json`; nyongeza, uondoaji na utelezi wa amri hushindwa ndoano za kawaida na kazi za uainishaji wa mabadiliko ndani CI. Lakabu si kazi ya mtiririko wa kazi, mfano wa matrix au kesi ya majaribio: hesabu hizi hazipaswi kuwasilishwa kama zinazoweza kubadilishana.

Tumia `npm run quality:scan -- --list` au `npm run quality:scan:fast -- --list` kukagua lakabu zilizochaguliwa bila kuzitekeleza. Mkimbiaji anaomba kiingilio cha npm, kwa hivyo wakati wake wa kukimbia (pamoja na Bun ambapo imesanidiwa) huhifadhiwa. Rekodi za faili ya maelezo lakabu nje ya wasifu huo kama zimeombwa kando, na amri za urekebishaji haziruhusiwi katika wasifu wa kuchanganua tu.

Profaili hizi hufunika utambazaji tuli pekee. Haziidhinishi majaribio ya bidhaa, chanjo, vifungashio, ukaguzi wa nje au kukubalika kwa toleo kamili la mtahiniwa. Uandikishaji wa mtiririko wa kazi hutumia `config/quality/admission-policy.json` na `scripts/quality/admission-verdict.mjs` zilizounganishwa. Wasifu wa waangalizi wa toleo hubaki tofauti; kagua hundi na risiti zao zinazotumika kwa kujitegemea. Hesabu ya nathari hapa chini ni marejeleo, sio uthibitisho kwamba lango liliendeshwa.

Hati huishi chini ya `scripts/check/` (milango ya sera) na `scripts/quality/` (injini ya ratchet). Chanzo cha ukweli cha CI ni `.github/workflows/ci.yml`.

### Toa njia ya haraka PR (`quality.yml`)

`.github/workflows/quality.yml` inakamilisha CI kwenye main/release PRs, inasukuma hadi `main`, kutuma na kuunganisha vikundi. PRs tumia ukaguzi wa haraka uliochujwa. Muundo wa nakala uliozimwa kabisa uliondolewa; hundi halisi build/package/boot zinabaki CI. Kitengo cha kitengo na vitest huendeshwa tu katika CI (`Unit Tests (N/8)` na `Vitest`).

| Kazi                                             | Upeo                                                                                                                                                   | Kuzuia              |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API refs na hati-zote                                                                                                                   | Ndiyo               |
| `Fast Quality Gates`                             | Kanuni PRs; ukaguzi tuli, angalia chapa, kikagua chapa ya dashibodi, majaribio ya vipimo vilivyoathiriwa, majaribio ya ndugu yaliyosahaulika (ushauri) |
| `No new ESLint warnings`                         | Kanuni PRs; suptions-aware pamba ulinzi                                                                                                                | Ndio, pamoja na uma |
| `Merge integrity (changelog + generated skills)` | PRs zisizo na rasimu; changelog na upatanishi wa ujuzi unaozalishwa                                                                                    | Ndio, pamoja na uma |

#### Ripoti ya majaribio ya ndugu waliosahau

`npm run check:forgotten-sibling-tests` huendesha kama hatua ya ushauri ya `Fast Quality Gates` na hutumia tena kisuluhishi cha uingizaji nyuma ya ramani ya athari ya majaribio. Kwa kila sehemu ya uzalishaji iliyobadilishwa, huripoti misururu ya `changed module/symbol -> static consumer -> candidate sibling test` bainifu wakati jaribio la mtahiniwa halipo kwenye tofauti ya ombi la kuvuta. Muhtasari wa Markdown na matokeo JSON huhifadhiwa kama vizalia vya utendakazi vya `forgotten-sibling-tests` kwa ajili ya kurekebishwa kabla ya uchapishaji wowote wa kuzuia.

Usafirishaji upya wa mapipa na uagizaji dhabiti ni uchunguzi wa azimio pekee; kamwe hazitengenezi ugunduzi wa kuzuia. Vighairi vilivyopitiwa vinapatikana katika `config/quality/forgotten-sibling-allowlist.json`. Kila ingizo lazima lipe jina la mtumiaji na jaribio la mgombea, litoe sababu mahususi, na liunganishe suala la GitHub au ombi la kuvuta. Maingizo yenye hitilafu yameshindwa kufungwa. Vighairi haviwezi kukandamiza jaribio la mtahiniwa lililofutwa au tofauti inayoongeza `.skip`/`.todo`; madai ya kudhoofisha na ufunikaji mwingine hubakia kumilikiwa na lango `check:test-masking` linalojizuia.

### Kazi: `lint`

Huendesha kila PR hadi `main`. Vitalu vinaunganishwa kwenye kushindwa.

| Hati (`npm run ...`)              | Inathibitisha                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Kuzuia                                  |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | toleo la Node.js liko ndani ya safu inayotumika                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ndiyo                                   |
| `check:cycles`                    | Uagizaji wa mduara kote katika `src/` + `open-sse/` (kulingana na AST, tsconfig `paths` imetatuliwa). Bare hutoka 1 wakati wowote mzunguko wowote upo (imeshindwa-imefungwa tangu #15281) na kuorodhesha SCCs. `check:cycles:ratchet` (kile CI inaendesha) huzuia hesabu inapozidi dari `metrics.cycles` katika `quality-baseline.json` — kwa sasa 14, `direction: down`, kwa hivyo inaweza tu kuanguka (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ndio (ratchet)                          |
| `check:boundary`                  | uunganishaji wa `open-sse → src` : uagizaji wa kipekee wa faili-kwa-faili kutoka kwa injini hadi kwenye programu (`scripts/quality/measure-boundary.mjs`; orodha ya ukingo ni urejeshaji wa v4 core/module-split ). Ripoti ya ushauri ya Bare = (sawa na `quality:boundary`). `check:boundary:ratchet` (nini CI inaendesha, pia katika kitanzi cha `quality.yml` cha milango ya haraka-haraka) huzuia wakati hesabu inapozidi dari `metrics.boundaryOpenSseToSrc` katika `quality-baseline.json` — iliyopandwa kwa kipimo cha 771, `direction: down`; `--update` hupunguza tu; jamaa-msingi kwenye PRs (`--base-ref`, tazama hapa chini)                                                                                                                                                                                                                                                                                                                                   | Ndio (ratchet)                          |
| `check:route-validation:t06`      | Zod schema zilizopo kwenye njia zote (Sera ya Kiwango cha 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ndiyo                                   |
| `check:any-budget:t11`            | hesabu `@ts-expect-error // any` haizidi bajeti (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ndiyo                                   |
| `check:provider-consistency`      | Kila mtoa huduma katika `providers.ts` ana ingizo linalolingana katika `providerRegistry.ts` (na kinyume chake, ndani ya orodha ya ruhusa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ndiyo                                   |
| `check:model-lifecycle`           | Majedwali matatu ya uelekezaji yanayodumishwa kwa mkono hukaa sawa na muhtasari wa mzunguko wa maisha uliowekwa (#11503): `FITNESS_TABLE` (`taskFitness.ts`) haipati kitambulisho kilichostaafu ambacho `REGISTRY` inaweza kuelekeza; kila lengo la `BUILT_IN_ALIASES` lipo katika `REGISTRY` na halipo kwenye muhtasari wa kitambulisho kilichostaafu; kila kitambulisho kilichostaafu bado katika `REGISTRY` kinatumwa au kuorodheshwa katika `allowedRetiredInCatalog`; na hakuna chanzo au shabaha `DEFAULT_DEGRADATION_MAP` inaonekana imestaafu katika muhtasari huo. Hii haithibitishi kuwa mtindo unahudumiwa kwa sasa na mkondo wa moja kwa moja wa juu. — ya nje ya mtandao inalinganishwa dhidi ya `config/quality/model-lifecycle.json`, iliyoonyeshwa upya kwa mkono na `npm run quality:refresh-model-lifecycle` (mtandao; haujaunganishwa kwenye CI). `allowedRetiredInCatalog` ni ratchet ya kuchoma-chini: ongeza kiingilio tu na suala la ufuatiliaji.   | Ndiyo                                   |
| `check:fetch-targets`             | Kila `fetch("/api/...")` katika `src/` ya upande wa mteja hutatua kuwa `route.ts` halisi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ndiyo                                   |
| `check:deps`                      | Sehemu zote za `npm install` -able katika kila `package.json` kwenye repo ziko `dependency-allowlist.json`; vifurushi vipya ambavyo havijabandikwa au vilivyotiwa alama kwenye alama                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ndiyo                                   |
| `audit:deps`                      | `npm audit` (mzizi + elektroni) — no high/critical mashauri (huingiliana osv `check:vuln-ratchet`; angalia Rejea ya Kusawazisha)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ndiyo                                   |
| `check:lockfile`                  | `package-lock.json` uadilifu — sajili ya https, heshi za uadilifu, hakuna ubatilishaji wa seva pangishi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ndiyo                                   |
| `check:licenses`                  | SPDX orodha ya vibali vya leseni kwa tegemezi za uzalishaji                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ndiyo                                   |
| `check:tracked-artifacts`         | Hakuna mabaki ya ujenzi / ulinganifu wa `node_modules` uliojitolea (pia huendeshwa kwa dhamira ya awali ya husky; kusukuma kabla ni nyepesi kwa makusudi — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ndiyo                                   |
| `check:ai-attribution`            | No AI/bot `Co-Authored-By` trailer or AI-generation footer in PR commits, title or body — Hard Rule #16 (in the `quality.yml` fast-gates loop for PR→`release/**` — reads the event payload, no-op off PRs — and a PR-only step in `ci.yml` lint for PR→`main`; also the husky `commit-msg` hook; human co-authors allowed; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:vitest-exclusions`         | Kila kutengwa kwa Vitest kunataja suala la ufuatiliaji na inaonekana katika `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ndiyo                                   |
| `check:file-size`                 | Chanzo faili (`.ts`/`.tsx` katika `src/`, `open-sse/`, `electron/`, `bin/`) hukaa ndani ya `cap` na faili za majaribio (`*.test.ts(x)`) ndani ya `testCap`; faili zilizogandishwa katika `file-size-baseline.json` (`frozen` / `testFrozen`) hazipaswi kupita ukubwa wao uliorekodiwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ndiyo                                   |
| `check:error-helper`              | Majibu ya makosa katika matumizi ya executors/handlers `buildErrorBody()` / `sanitizeErrorMessage()` ( Kanuni Ngumu #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ndiyo                                   |
| `check:migration-numbering`       | Faili SQL za uhamiaji zimeorodheshwa kwa mpangilio, hakuna mapungufu au nakala                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ndiyo                                   |
| `check:public-creds`              | Hakuna OAuth `client_id`/`client_secret` au funguo za Wavuti za Firebase nje ya `publicCreds.ts` (Kanuni Ngumu #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ndiyo                                   |
| `check:db-rules`                  | Hakuna SQL mbichi nje ya moduli `src/lib/db/` ; hakuna pipa-uagizaji kutoka `localDb.ts` (Kanuni Ngumu #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ndiyo                                   |
| `check:known-symbols`             | Watekelezaji watoa huduma, mikakati ya uelekezaji na watafsiri waliosajiliwa katika jedwali lao la kutuma hulingana na faili zilizo kwenye diski — hakuna alama za yatima au ambazo hazijatangazwa.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ndiyo                                   |
| `check:route-guard-membership`    | Kila njia inayozalisha mchakato wa mtoto imeainishwa na `isLocalOnlyPath()` (Kanuni Ngumu #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ndiyo                                   |
| `check:test-discovery`            | Kila faili ya `*.test.ts` / `*.spec.ts` kwenye repo inakusanywa na angalau mkimbiaji mmoja wa majaribio (ratchet: orodha ya watoto yatima katika `test-discovery-baseline.json` inaweza tu kupungua)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ndiyo                                   |
| `check:test-tla-order`            | Hakuna faili `node:test` iliyo chini ya `tests/unit` inayosajili jaribio, kufikia kiwango cha juu `await`, kisha kusajili zaidi (#18045; ratchet: `test-tla-order-allowlist.json` inaweza tu kupungua)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ndiyo                                   |
| `check:agent-skills-sync`         | Vizalia vya programu vya ujuzi wa mawakala vinalingana na katalogi yao ya chanzo (hakuna mteremko)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:provider-asset-provenance` | Mtoa huduma logos/assets kubeba ingizo la asili lililorekodiwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | JSON faili za usanidi huchanganua na kukidhi sheria za repo lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `typecheck:core`                  | TypeScript mkusanyiko bila makosa (maonyo ya ushauri tu)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ndiyo                                   |
| `typecheck:noimplicit:core`       | `noImplicitAny` — mtazamo wa mbele; tovuti nyingi za simu zilizokuwepo bado zinahitaji maelezo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **Ushauri** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` iliyopangwa hadi `src/app/(dashboard)/**` (#7033) — `typecheck:core`'s orodha ya ruhusa iliyoratibiwa ya faili 27 haijumuishi dashibodi yoyote TSX, na `next build` haiangazii kamwe (`next.config.mjs` seti `ignoreBuildErrors: true`), kwa hivyo urejeleaji wa vitambulisho vya yatima hapo (#6625/#6909CI. ) Hutofautiana dhidi ya hesabu ya msingi per-file/per-TS-code iliyogandishwa (`config/quality/dashboard-typecheck-baseline.json`, muundo wa utekelezaji wa zamani kama `check:known-symbols`) — hitilafu za NEW pekee zaidi ya hesabu ya msingi hushindwa lango; punguza na `--update` wakati kosa lililokuwepo limerekebishwa.                                                                                                                                                                                                                                                                                                                        | Ndiyo                                   |
| `check:build-typecheck`           | Aina ya uzalishaji wa programu nzima huangalia `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), orodha ya vibali vya faili 27 za uso wa `typecheck:core` na lango la dashibodi halifuniki. Inatofautiana dhidi ya `config/quality/build-typecheck-baseline.json`; hesabu mpya au iliyoinuliwa kwa-(faili, nambari) haifaulu, hesabu ya chini inakuuliza uchague. `--update` inakataa ilhali uendeshaji una jozi mpya au iliyoinuliwa isipokuwa `--force-regressions` ipitishwe, na inakataa faili mpya iliyonyamazishwa isipokuwa `--force-nocheck` haijapitishwa, kwa hivyo kupanua msingi ili kupata kijani kibichi na kutoa ukimya wa kudumu ni vitendo viwili tofauti vya kimakusudi. `--force` tupu imekataliwa. Pia huchanganua wigo wa ujenzi wa `@ts-nocheck` dhidi ya `config/quality/ts-nocheck-baseline.json`, kwa sababu faili inayoitumia huripoti uchunguzi wowote na vinginevyo isingeonekana kwa kila lango. | Ndiyo                                   |

#### Programu mbili za cheki hujibu tofauti

`typecheck:core` na `check:build-typecheck` hukusanya programu tofauti chini ya chaguo tofauti, na faili sawa inaweza kuwa safi katika moja na kamili ya makosa katika nyingine.

`tsconfig.build.json` inaweka `"strict": false`, kwa hivyo `noImplicitAny` imezimwa. Mipangilio ya msingi inakusanya orodha ya ruhusa ya faili 27 iliyoratibiwa na chaguo kali zaidi na hufuata grafu ya kila ingizo, kwa hivyo faili ambazo hazionekani kamwe kwenye mpango wa ujenzi bado huangaliwa hapo.

Matokeo ni muhimu wakati wa kuhukumu ikiwa faili imechapishwa:** utambuzi wa sifuri chini ya `check:build-typecheck` haimaanishi sifuri** . Kuondoa `@ts-nocheck` kutoka kwa faili 26 kulionyesha 23 kati yao safi kwenye programu ya ujenzi; kumi na sita kati ya hizo zilijitokeza kama makosa 120 - yoyote katika ile kali. Angalia zote mbili kabla ya kuita faili safi.

### Kazi: `quality-gate`

Hukimbia baada ya `test-coverage`. Vitalu vinaunganishwa kwenye kushindwa.

| Hati                         | Inathibitisha                                                                                                                                                                                   | Kuzuia                       |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `quality:collect`            | Hutoa `quality-metrics.json` ( hesabu ya onyo ESLint, chanjo kutoka kwa ripoti ya shard iliyounganishwa)                                                                                        | Ndio (mto wa juu wa ratchet) |
| `quality:ratchet`            | Kila kipimo katika `quality-baseline.json` hakijarudi nyuma (ESLint ≤ msingi; chanjo ≥ msingi)                                                                                                  | Ndiyo                        |
| `check:duplication`          | Urudiaji wa msimbo (jscpd@4) hauzidi msingi katika `quality-baseline.json`                                                                                                                      | Ndiyo                        |
| `check:complexity`           | Utata wa saiklomatiki ya kiwango cha faili hauzidi kikomo (msingi ESLint `complexity` + `max-lines-per-function`)                                                                               | Ndiyo                        |
| `check:cognitive-complexity` | Utambuzi wa utata ratchet (`eslint-plugin-sonarjs`) — tofauti ESLint kupita; CI inaendesha zote mbili zilizounganishwa kama hatua moja `check:complexity-ratchets`                              | Ndiyo                        |
| `check:dead-code`            | Uhamisho usiotumika / ratchet ya faili (knip) hairudi nyuma dhidi ya msingi                                                                                                                     | Ndiyo                        |
| `check:compression-budget`   | Bajeti ya kiwango cha mfinyazo — sakafu za akiba za tokeni kwa kila injini lazima zisirudi nyuma                                                                                                | Ndiyo                        |
| `check:type-coverage`        | Ratchet iliyoandikwa kwa asilimia (`type-coverage`) hairudi nyuma; kwa kiasi kikubwa inachukua `typecheck:noimplicit:core`                                                                      | Ndiyo                        |
| `check:codeql-ratchet`       | Fungua hesabu ya tahadhari ya CodeQL hairudi nyuma (husoma kupitia `gh api`; ruka kwa neema bila ishara) — onyesha upya mwanguko na kichochezi cha mwongozo: tazama "CodeQL ratchet" hapa chini | Ndiyo                        |

### Kazi: `quality-extended`

Kazi nzima ni ya ushauri (`continue-on-error: true`). Ratchets za msingi wa npm zinaendesha kwa kweli; vichanganuzi vya nje husakinisha kupitia `gh release download` na kujirusha (kutoka 0) wakati binary bado haipo.

| Hati                     | Inathibitisha                                                                                                                                                                                                                         | Kuzuia                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `check:circular-deps`    | Hakuna utegemezi wa mviringo (dpdm)                                                                                                                                                                                                   | **Ushauri**                                              |
| `check:bundle-size`      | Ukubwa wa kifungu hauzidi kofia                                                                                                                                                                                                       | **Ushauri**                                              |
| `check:secrets`          | Uchanganuzi wa siri (gitleaks) — huruka ikiwa binary haipo                                                                                                                                                                            | **Ushauri**                                              |
| `check:vuln-ratchet`     | Udhaifu wa utegemezi (osv-skana) usirudi nyuma — ruka ikiwa mfumo wa binary haupo                                                                                                                                                     | **Ushauri**                                              |
| `check:workflows`        | pamba ya mtiririko wa kazi (actionlint + zizmor); vichanganuzi vya missing/broken, ripoti batili au msingi unaokosekana wa ratchet hushindwa kama INCOMPLETE. Matokeo sahihi yanafuata sera ya strict/advisory/ratchet iliyochaguliwa | Utekelezaji unahitajika; zizmor ratchet kuzuia katika CI |
| `check:openapi-breaking` | Kuvunja mabadiliko kwa mkataba wa API wa umma (`openapi.yaml`) dhidi ya tawi la msingi (oasdiff) — hutoa `openapiBreaking=N`; ruka ikiwa oasdiff haipo au msingi hautatuliki                                                          | **Ushauri**                                              |

### Kazi: `docs-sync-strict`

Huendesha kila PR hadi `main`. Vitalu vinaunganishwa kwenye kushindwa.

| Hati                           | Inathibitisha                                                                                                                                                                      | Kuzuia                              |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `check:docs-all`               | Meta-lango linaloendesha milango midogo 6 hapa chini kwa mfuatano                                                                                                                  | Ndiyo                               |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt uthabiti wa toleo                                                                                                                                    | Ndiyo                               |
| ↳ `check:docs-counts`          | Hesabu katika nathari (idadi ya watoa huduma, hesabu ya uhamaji, n.k.) ziko ndani ya dirisha la hesabu la hesabu halisi.                                                           | Ndiyo                               |
| ↳ `check:env-doc-sync`         | Kila env var katika `.env.example` imeandikwa katika jedwali la hati, na kinyume chake                                                                                             | Ndiyo                               |
| ↳ `check:deprecated-versions`  | Hakuna mifuatano ya toleo iliyoacha kutumika katika hati                                                                                                                           | Ndiyo                               |
| ↳ `check:doc-links`            | Viungo vya alama za ndani katika hati hutatua kwa faili halisi ( fomu ya `[text]`/`(path)` )                                                                                       | Ndiyo                               |
| ↳ `check:fabricated-docs`      | Njia, env vars, amri za CLI, majina ya ndoano, na njia za faili zilizotajwa katika hati zipo kwenye msingi wa msimbo. Lango gumu kupitia `--strict`; laini-kushindwa bila bendera. | Ndio (kupitia `--strict` katika CI) |
| `check:cli-i18n`               | CLI amri zipo katika faili zote za eneo la i18n                                                                                                                                    | Ndiyo                               |
| `check:openapi-coverage`       | OpenAPI spec inashughulikia angalau sakafu iliyosawazishwa ya njia halisi                                                                                                          | Ndiyo                               |
| `check:openapi-security-tiers` | Ufafanuzi wa kiwango cha usalama katika `openapi.yaml` unalingana na uainishaji wa `routeGuard.ts`                                                                                 | **Ushauri**                         |
| `check:openapi-routes`         | Kila njia katika `openapi.yaml` hutatua hadi `route.ts` halisi (anti-hallucination)                                                                                                | Ndiyo                               |
| `check:docs-symbols`           | Kila marejeleo ya `/api/...` katika `docs/**/*.md` huamua kuwa `route.ts` halisi (anti-hallucination)                                                                              | Ndiyo                               |
| `i18n translation drift`       | Vifunguo ambavyo havijatafsiriwa katika faili za eneo la i18n — onya pekee                                                                                                         | **Ushauri**                         |

README SVGs kumi na mbili chini ya `docs/diagrams/` zinazalishwa (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` hutengeneza upya zote). Kila moja ina jaribio la kulinganisha la byte (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) ambalo halifaulu wakati faili iliyotumwa imechakaa, na `check:docs-counts` husoma nambari za kisheria kutoka kwa nodi zao `<text>` — ndiyo maana hatua ya kubainisha huweka kila kamba iliyoainishwa kwenye faili kama isiyoonekana `<text>`. Ukaguzi wa nambari za kanuni SVG husoma faili zilizoorodheshwa katika `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` na `tier-flow-light.svg`; madai ya bure-everever, catalog-entry, pool-recurring-pool na mambo ya bao pia yanasoma `promise-pillars.svg`, `free-tier-budget.svg` na `strategies-grid.svg`. `free-tier-budget.svg` huchota takwimu zake kutoka kwa kipakiaji cha katalogi cha moja kwa moja, kwa hivyo mabadiliko ya `FREE_MODEL_BUDGETS` au kwa jina la mtoa huduma linaonyesha reds CI hadi faili hiyo itengenezwe upya.

### Kazi: `i18n-ui-coverage`

| Hati                              | Inathibitisha                                                                                                                                                                                                | Kuzuia      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `check-ui-keys-coverage` (inline) | chanjo muhimu ya UI i18n ni ≥ 65%                                                                                                                                                                            | Ndiyo       |
| `check-ui-value-drift` (inline)   | Kiingereza kilichoandikwa upya** thamani** haiachi tafsiri ya zamani nyuma                                                                                                                                   | Ndiyo       |
| `check-new-key-coverage` (inline) | A** mpya** Kitufe cha Kiingereza kinatafsiriwa katika kila lugha — alama ya `__MISSING__:` imekataliwa                                                                                                       | Ndiyo       |
| `check-translation-ratio`         | Uwiano wa tafsiri halisi kwa kila lugha (sawa-kwa-Kiingereza / kishika nafasi / majani yanayokosekana nje ya orodha ya walioruhusiwa) lazima isizidi `config/quality/i18n-translation-baseline.json` + slack | **Ushauri** |

Inahitaji `fetch-depth: 0` — lango la thamani-drift hutofautiana `en.json` dhidi ya msingi wa kuunganisha.

#### `check-ui-value-drift` — mlango wa kutafsiri uliochakaa

Hukamata urejeo mmoja wa i18n ambao milango mingine kimuundo haiwezi kuona: thamani ya Kiingereza huandikwa upya na tafsiri zinazotokana na _previous_ Kiingereza hubaki nyuma, ili watumiaji wasio wa Kiingereza waendelee kusoma kwa kujiamini, nakala isiyo sahihi.

Hii imesafirishwa kwa kweli. `oauthModal.googleOAuthWarning` iliandikwa upya wakati msaidizi wa kuingia Antigravity alipotua (#5203);** 39 kati ya 43 za mitaa** iliweka maandishi kuwaambia waendeshaji "nakili URL kamili na kuibandika hapa chini" — mtiririko ambao hauwezi kukamilika kwa mtoaji huyo. Haikuonekana hadi #8463 kwa sababu:

- `sync-ui-keys` inajaza funguo tu ambazo ni** kutokuwepo** , kamwe wale walio** stale** ;
- `check-ui-keys-coverage` huhesabu ufunguo _uwepo_, kwa hivyo tafsiri ya zamani inapata alama kama ilivyofunikwa;
- `check-translation-drift` hufuatilia vioo vya nyaraka za `docs/i18n/<locale>/**.md` — haisomi kamwe `src/i18n/messages/*.json`. Kuzuia kazi `docs-sync-strict` tangu usawazishaji upya wa 2026-09: hariri msingi wa hati → `npm run i18n:run -- --files=<doc>` (kiwango cha sehemu, nafuu).

**Diff-aware, si msingi-backed.** Inalinganisha `en.json` kwenye msingi wa kuunganisha dhidi ya mti unaofanya kazi; kwa kila ufunguo ambao thamani yake ya Kiingereza ilibadilika, lugha yoyote ambayo bado ina tafsiri ambayo haijaguswa ni ya zamani. Hii kwa makusudi** kufungia deni lililokuwepo hapo awali** — a diff haiwezi kufichua ni Kiingereza kipi cha zamani ambacho tafsiri ya muda mrefu ilitoka, kwa hivyo lango huamua tu kile ambacho mabadiliko ya sasa yanagusa. Njia mbadala (msingi wa kila ufunguo wa heshi) ingegharimu faili inayozalishwa ~ 600 KB,× 3 msingi mkubwa uliopo, unaoendelea kwa kila i18n PR.

Njia mbili za kukidhi:

1. sasisha tafsiri zilizoathiriwa, au
2. ziweke kuwa `__MISSING__:<new english>` — wakati wa utekelezaji kisha utumie Kiingereza kilichosahihishwa (`src/i18n/request.ts::deepMergeFallback`, #7258) na foleni muhimu za tafsiri.

Ikiwa kamba ni** maana** iliyopita, pendelea** kubadilisha jina la ufunguo** : ufunguo mpya hauwezi kurithi tafsiri ya zamani. Huo ndio muundo #8463 uliotumika.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Inatoka 0 na `SKIP reason=base-unresolved` wakati katalogi ya msingi haiwezi kusomeka (kloni ya kina kifupi bila ref msingi), ikionyesha `check-openapi-breaking`.

### Kazi: `i18n`

Matrix kamili ya uthibitishaji wa i18n (kazi moja kwa kila eneo). Kazi nzima ni ya ushauri.

| Hati                            | Inathibitisha                      | Kuzuia                                                 |
| ------------------------------- | ---------------------------------- | ------------------------------------------------------ |
| `validate_translation.py quick` | Ukamilifu wa tafsiri kwa kila eneo | **Ushauri** (`continue-on-error: true` kwa kazi nzima) |

### Kazi: `pr-test-policy`

Huendesha ombi la kuvuta pekee.

| Hati                   | Inathibitisha                                                                                                                                        | Kuzuia |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `check:pr-test-policy` | PRs inayobadilisha msimbo wa uzalishaji katika `src/`, `open-sse/`, `electron/`, au `bin/` lazima ijumuishe au isasishe majaribio ( Kanuni Ngumu #8) | Ndiyo  |
| `check:test-masking`   | Faili za majaribio zilizobadilishwa hazipunguzi idadi ya madai halisi au kuongeza tautologies `assert.ok(true)`                                      | Ndiyo  |
| `check:pr-evidence`    | chombo PR kinataja ushahidi wa test/VPS wa mabadiliko (huandaa Kanuni Ngumu #18 kwa kuweka PR nathari — tete, angalia Backlog)                       | Ndiyo  |

### Kazi: `test-vitest`

Hukimbia baada ya `build`. Vitalu vinaunganishwa kwenye kushindwa.

| Suite            | Inathibitisha                                            | Kuzuia                                                                                                                       |
| ---------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP seva (zana 110), autoCombo, kache — vitest mkimbiaji | Ndiyo                                                                                                                        |
| `test:vitest:ui` | UI vipengele vipimo — vitest mkimbiaji                   | **Kuzuia** — mapungufu yaliyokuwepo hapo awali yametengwa kwa uwazi katika `vitest.config.ts`; kushindwa mpya kushindwa kazi |

### Mitiririko ya kazi ya kila usiku (iliyoratibiwa, ushauri)

Hizi zinaendeshwa kwa ratiba ya cron (na `workflow_dispatch`), kamwe PRs. Yote ni ya ushauri.

| Mtiririko wa kazi      | Inathibitisha                                                                                                                                                                | Kuzuia      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | angalia haraka vipimo vya mali na hesabu ya mbegu isiyo ya kawaida + ya juu ya kukimbia                                                                                      | **Ushauri** |
| `nightly-resilience`   | lango la ukuaji wa lundo, machafuko sindano ya kosa, k6 load/soak                                                                                                            | **Ushauri** |
| `nightly-llm-security` | ulinzi wa sindano ya promptfoo (hali ya kuzuia) + garak probes (iliruka bila siri ya mtoa huduma)                                                                            | **Ushauri** |
| `nightly-schemathesis` | Mkataba wa OpenAPI unachanganya (schemathesis) dhidi ya OmniRoute hai kwa kutumia `docs/openapi.yaml` — ukiukaji maalum wa nyuso / 500s zisizoshughulikiwa (Msimbo wa 8 B.4) | **Ushauri** |
| `nightly-mutation`     | Alama ya majaribio ya mabadiliko ya Stryker juu ya njia ya mwendo kasi — waliosalia wanaleta madai dhaifu                                                                    | **Ushauri** |
| `nightly-compat`       | Matrix ya uoanifu wa injini ya nodi katika safu za `engines.node` zinazotumika                                                                                               | **Ushauri** |

Misingi ya utendakazi (lundo, TTFB, muda wa kujenga) imerekodiwa, sio lango: tazama [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
