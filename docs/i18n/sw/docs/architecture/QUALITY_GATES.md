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

Mitiririko ya kazi ya CI na Quality Gates kila moja inatoa uamuzi thabiti: `Gate / CI` na `Gate / Quality`. Sera yao ya uandikishaji iliyobadilishwa inaorodhesha kila kazi ya juu kama inavyohitajika au ushauri. Kazi inayohitajika lazima ifanikiwe: kukosa, kughairiwa, kuruka, kusubiri na matokeo yasiyojulikana hayawezi kuanzisha PASS. Uainishaji halali wa hati pekee au katalogi pekee unaweza kufanya njia ya msimbo isitumike; rasimu ya PR ya kawaida si mgombea anayekubalika. Lebo `hotfix` haiondoi ushahidi.

Mitiririko yote miwili ya kazi hufunika PRs katika matawi ya main/release, inasukuma hadi `main`, utumaji wa mikono na matukio ya kuunganisha kikundi. Sukuma, tuma na unganisha kikundi endesha uteuzi kamili. Rasimu inayoaminika ya foleni ya Mergify pia huendesha kazi zinazotumika za `full-code`/`full-code-e2e` ; PRs ya kawaida ruka yao. Kabla ya kuunganisha mwenyewe, tuma utumaji kamili kwa mgombea kamili. Kusukuma kwa `release/**` kusianzishe mtiririko huu wa kazi; Release-Green hutazama msingi uliounganishwa kando ( Njia ya Upangishaji ya `docs/ops/RUNNER_BOX.md` → ). Uma na vikundi vya kuunganisha hutumia wakimbiaji waliopangishwa kwa kazi ambazo vinginevyo huchagua wakimbiaji wanaojitegemea; uwezo wa kutosha uliopangishwa lazima uthibitishwe kabla ya kusambaza.

PR ya kawaida huendesha uteuzi wa haraka. Njia za `full-code` na `full-code-e2e` za sera ya uandikishaji (E2E, ushirikiano, mabaki ya kifurushi, moshi Electron, Bun SQLite, mfumo wa ikolojia na wateja wa itifaki) huendesha tu kwenye rasimu ya foleni ya Mergify au kwa kukimbia kamili: `gh workflow run ci.yml --ref <branch>`.

Kila risiti ya JSON inabainisha SHA iliyoangaliwa, mtiririko wa kazi na jaribio. CLI inakataa kutolingana kwa checkout/event SHA. Majaribio ya mtiririko wa kazi hufunga uanachama wa sera kwenye orodha ya `needs` ya kazi ya uamuzi ili njia mpya au iliyoondolewa haiwezi kutoweka kimya kimya. Stakabadhi hufunika mtiririko wao wa kazi, si uchapishaji, utumaji, au mambo ya ndani ya kichanganuzi kilichopo cha ushauri. Kufanya ukaguzi unaotumika unaohitajika katika sheria za tawi ni mabadiliko tofauti ya kiutawala; kufafanua kazi zao hakulindi tawi.

`API Route Typecheck` ni ukaguzi huru wa mtiririko wa kazi, nje ya uamuzi wa jumla na wasifu wa tuli wa mwangalizi wa karibu. Kagua matokeo yake kando kwa mgombea halisi. `.github/workflows/api-route-typecheck.yml` huendesha PRs hadi `main` au `release/**`, inasukuma kwa familia ya tawi, utumaji wa mikono, na matukio ya `merge_group` ya aina `checks_requested`. Haina kichujio cha njia. Unganisha vikundi angalia `merge_group.head_sha`; matukio mengine angalia `github.sha`. Matukio yote hutumia lango la uchunguzi API na vipimo vya kitengo cha lango. Walengwa wa msingi wa PR wanaomba hundi mpya; Uhariri wa body/title hutumia jina la uchunguzi pekee `Admission not requested / API Route Typecheck` na hauwezi kuchukua nafasi ya ukaguzi wa uandikishaji.

### Ushahidi uliobaki katika kipunguza kukubalika

`scripts/quality/validate-release-acceptance.mjs` inapunguza mpango uliotolewa na maonyesho yake; haithibitishi kuwa mpango huo unashughulikia bomba kamili la kutolewa. Ripoti zake zimeweka wazi `releaseAcceptance: false`, hata kama mpango huo ni `VERIFIED`. Mtiririko wa kazi `release-acceptance.yml` bado unatumia urekebishaji wa vivuli, sio muundo halisi, kifurushi, risiti za kuwasha au ukuzaji.

CLI inahitaji `--evidence-root` kuthibitisha ushahidi uliobaki. Faili hutatuliwa kama `<evidence-root>/<artifact_id>/<member>` na kuharakishwa kama SHA-256. Rekodi ya PASS bila ushahidi, faili iliyokosekana au iliyobadilishwa, njia isiyo salama au ulinganifu huzuia uthibitishaji. Faili zinazokosekana si sawa na kumbukumbu tupu zilizofanikiwa. Hundi zilizopo za SHA/run/attempt zinasalia kuwa huru: baiti zinazolingana haziwezi kuokoa risiti ya zamani. Uadilifu wa faili si uthibitisho wa uhalali wa utekelezaji au ukuzaji wa vizalia vya programu.

### DAST hutumia muundo CI uliothibitishwa

Kazi inayohitajika ya `dast-smoke` CI inaita `.github/workflows/dast-smoke.yml` baada ya `build`. Inafuata uteuzi sawa code/draft kama muundo, ikiwa ni pamoja na uma unaotumika PRs, PRs inayolengwa kutolewa na kuunganisha vikundi. Kukosekana, kushindwa, kughairiwa au kuruka bila kutarajia vizuizi vya kazi DAST `Gate / CI`. Mtiririko wa kazi unaoweza kutumika tena hauna kichochezi huru PR/dispatch ; uthibitishaji wa mwongozo hutumia utumaji wa CI ili mjenzi na mtumiaji kubaki kwa muda mmoja.

`scripts/ci/next-build-provenance.mjs` hutia muhuri vizalia vya programu kamili Inayofuata na tar digest yake, repository/event/run, jaribio la mtayarishaji, head/base/checkout/tree, vitambulisho vya mtiririko wa kazi, faili ya kufunga, Nodi halisi version/ABI, jukwaa na kifurushi. DAST huchagua vizalia vya programu visivyobadilika ID kutoka `needs.build.outputs`, inahitaji uthibitishaji wa upakuaji wa muhtasari, na kuharakisha ZIP kwa uhuru dhidi ya muhtasari wa mtayarishaji kabla ya kutoa wanachama wake wawili walioorodheshwa kupitia `scripts/ci/unpack-ci-build.py`. Faili ya maelezo na kumbukumbu ya lami lazima pia ilingane na matokeo ya mzalishaji huru kabla ya mti Ufuatao kutolewa. Haitafuti muundo wa hivi punde wa tawi uliofaulu. Rudia kwa sehemu inaweza kutumia tena jaribio hilohilo la mzalishaji wakati ID yake na ingizo zote bado zinalingana; risiti inarekodi majaribio yote mawili.

Mtumiaji hukaa kwenye mkimbiaji wa Linux aliyepangishwa na ruhusa ya hifadhi ya kusoma tu na hakuna siri za hazina. Inasakinisha toleo halisi la Nodi ya mtayarishaji, kisha inakusanya CLI na `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` inakataa seva ya kujitegemea inayokosekana kabla ya muundo wowote mbadala; miundo ya kawaida ya ndani CLI huhifadhi mrejesho wao uliopo. Utayari wa seva, Schemathesis na promptfoo lazima zote zifanikiwe ndani ya kikomo cha kazi cha dakika 25 ambacho hakijabadilika. Stakabadhi ya awali inathibitisha utambulisho wa pembejeo na baiti, si uchanganuzi wa DAST uliofaulu. Kuisha kwa muda wa vipengee vya programu, kukatizwa kwa kiendeshaji au kichanganuzi kilichofeli kinasalia kuwa ushahidi usio kamili au ulioshindwa; haiwezi kuwa PASS kupitia kanga ya ushauri.

### Uwezo wa utekelezaji UI

CI inaendesha hesabu kamili UI kama vipande vinne vya matrix ya `test-vitest`, kila kimoja kikiwa na wafanyakazi wasiopungua wawili kwa kila shard na tarehe ya mwisho ya kazi ya dakika 15 iliyopo. Shard ya kwanza pia inaendesha Suite MCP/autoCombo Vitest. Matokeo ya kazi inayohitajika inashughulikia kila mguu wa tumbo; kushindwa au kughairi shard moja hakuwezi kuanzisha uandikishaji wa mgombea.

Mtazamaji wa kila usiku anakuwa na risiti tofauti ya mgombea kamili kwa kila kipande cha UI, ikiwa ni pamoja na utekelezaji wa MCP katika risiti ya kwanza. Risiti zote nne, kumbukumbu na vitambulisho vinavyolingana vya utekelezaji vinahitajika. `npm run test:vitest:ui` ya ndani bado inachagua Suite kamili; kukimbia moja kwa `--shard` ni ushahidi wa sehemu tu.

### Mkusanyiko wa chanjo ya kitengo

Vitengo kumi na viwili vinakusanya ufunikaji wa V8 wakati wa utekelezaji wao wa jaribio uliopo. Shard iliyofaulu huendesha `scripts/ci/compact-v8-coverage.mjs` kubana faili asili bila kutoa ripoti ya kati ya Istanbul. Kazi ya mwisho ya Chanjo inathibitisha maonyesho yote kumi na mawili dhidi ya mgombea SHA, muda wa utekelezaji, chanzo cha chanzo na heshi za data, kisha huendesha waandishi wa c8 na vizingiti vilivyopo vya utangazaji. Ingizo huhifadhi agizo la kimataifa la jina la faili la c8; kuunganisha awali kwa kila shard si salama kwa ufunikaji mchanganyiko function/block. Vipande vilivyokosekana, vilivyoharibika au visivyolingana vinashindwa kupokelewa. Vipande vya majaribio vilivyoshindwa huhifadhi chanjo ghafi ya uchunguzi kando; haiwezi kuingia muunganisho wa mwisho.

### Stakabadhi za maendeleo ya utekelezaji wa kitengo

Amri ya pamoja `test:unit:ci:shard` inarekodi awamu za `primary`, `dashboard` na `serial` kupitia `scripts/ci/unit-progress-reporter.mjs`. Ripoti ya kawaida ya mtihani bado inapatikana. Risiti tofauti ya metadata pekee hurekodi kuanza na kukamilika kwa kila faili, na mpigo wa moyo wa sekunde 30 huorodhesha faili ambazo bado zinatumika na wakati wao uliopita. Hurekodi metadata ya utekelezaji iliyoruhusiwa pekee; maelezo ya mtihani, matokeo, miili ya makosa na mazingira kamili hayajasasishwa.

CI huhifadhi faili JSONL kama `unit-progress-ci-<run>-<attempt>-<shard>`. Muda wa kazi unaweza kuzuia upakiaji wa baadaye; mapigo ya moyo ambayo tayari yametolewa yanasalia kuwa ushahidi wa uchunguzi. Mapigo ya moyo yanayokosekana yanaweza pia kuonyesha mchakato wa kukimbia uliozuiwa au uliokatishwa. Stakabadhi hizi huhifadhi uteuzi uliopo wa jaribio, ulinganifu, tarehe za mwisho na hali ya kuondoka; si hukumu za uandikishaji mgombea.

### Unganisha foleni

Lebo ya `queue` hutuma PR kwenye foleni ya Mergify (`.mergify.yml`). Mergify inafungua rasimu ya PR kwenye tawi la `mergify/merge-queue/`, CI huendesha uteuzi kamili hapo, na PR asili huunganisha `Gate / CI`, `Gate / Quality` na `Merge integrity (changelog + generated skills)` zinapopita.

Mergify huandika muhtasari wake wa foleni katika maelezo ya rasimu. Matukio ya Body/title-only `pull_request` `edited` hutumia kikundi cha fedha kinachoendeshwa mahususi na hayarudishi uainishaji, majaribio ya hesabu, kuunganisha uadilifu au uamuzi wa kukubaliwa. Majina ya hundi ya uchunguzi pekee hayawezi kuchukua nafasi `Gate / CI` au `Gate / Quality`. Mabadiliko ambayo hubadilisha msingi lengwa huomba uthibitishaji mpya wa mgombea.

Baada ya foleni, msukumo hauendi foleni PR kila wakati. Toa maoni `@mergifyio queue` juu yake.

### Orodha ya skanning tuli

Orodha ya toleo la npm-alias na uanachama wa kuchanganua tuli huishi `config/quality/gate-manifest.json`. Endesha `npm run check:gate-manifest` ili kuthibitisha majina ya hati na amri kamili dhidi ya `package.json`; nyongeza, uondoaji na uelekezaji wa amri hushindwa ndoano za ndani na kazi za uainishaji wa mabadiliko katika CI. Lakabu si kazi ya mtiririko wa kazi, mfano wa matrix au kesi ya jaribio: hesabu hizi hazipaswi kuwasilishwa kama zinazoweza kubadilishana.

Tumia `npm run quality:scan -- --list` au `npm run quality:scan:fast -- --list` kukagua lakabu zilizochaguliwa bila kuzitekeleza. Mkimbiaji anaomba kiingilio cha npm, kwa hivyo wakati wake wa kukimbia (pamoja na Bun ambapo imesanidiwa) huhifadhiwa. Rekodi za faili ya maelezo lakabu nje ya wasifu huo kama zimeombwa kando, na amri za urekebishaji haziruhusiwi katika wasifu wa kuchanganua tu.

Profaili hizi hufunika utambazaji tuli pekee. Haziidhinishi majaribio ya bidhaa, chanjo, vifungashio, ukaguzi wa nje au kukubalika kwa toleo kamili la mtahiniwa. Uandikishaji wa mtiririko wa kazi hutumia `config/quality/admission-policy.json` na `scripts/quality/admission-verdict.mjs` zilizounganishwa. Wasifu wa waangalizi wa toleo hubaki tofauti; kagua hundi na risiti zao zinazotumika kwa kujitegemea. Amri tuli za mwangalizi kamili zinatangazwa katika `config/quality/release-green-static-profile.json`, ikijumuisha `audit:deps`, uteuzi wa jaribio la mabadiliko na ukaguzi wa tafsiri. Kipakiaji huidhinisha amri za npm dhidi ya package.json na matamko ya CI/Quality yaliyoundwa; inakataa kuteleza badala ya kutekeleza tokeni za ganda kama hoja. Kichanganuzi kinachohitajika pato la SKIP/INCOMPLETE haliwezi kuanzisha PASS. Wasifu hurekodi uondoaji wake wa nje na hauchukui nafasi ya chanjo iliyopangishwa, alama za majaribio, kifurushi au ushahidi wa matumizi. Hesabu ya nathari hapa chini ni marejeleo, sio uthibitisho kwamba lango liliendeshwa.

Hati huishi chini ya `scripts/check/` (milango ya sera) na `scripts/quality/` (injini ya ratchet). Chanzo cha ukweli cha CI ni `.github/workflows/ci.yml`.

### Afya ya hati iliyochapishwa

`.github/workflows/i18n-base-health.yml` inachunguza afya ya uhifadhi baada ya misukumo iliyochaguliwa kwenda `main` na `release/v*`, na kwa utumaji wa mikono. Vichujio vyake hufunika hati, mzizi Markdown, `llm.txt`, tafsiri state/configuration na zana husika ya i18n. Kazi moja `Published base documentation health` hutumia Ubuntu mwenyeji na tarehe ya mwisho ya dakika tano. Hufanya uthibitishaji wa kusoma pekee na huandika risiti ya uchunguzi bila usakinishaji wa utegemezi, tafsiri au kupitishwa kwa serikali.

`scripts/i18n/check-base-health.mjs` inahitaji zero source-heshi, kukosa-lengwa, lengwa-heshi, tafsiri-stale na kutofautiana kwa akiba ya sehemu. Pia inathibitisha upeo wa sasa wa msingi document/locale na asili yake iliyorekodiwa. Muktadha batili, chanjo isiyokamilika au kikagua kilichoingiliwa hutoa `INCOMPLETE`; alithibitisha drift inazalisha `FAIL`. Zote mbili hurejesha hali ya kuondoka isiyoweza kushindwa. Stakabadhi italazimika kulipa SHA, mtiririko wa kazi, endesha na kujaribu, na huhifadhiwa kama `i18n-base-health-<sha>-<run>-<attempt>`.

Huu ni uchunguzi huru wa msingi uliochapishwa. Haiongezi tukio la PR au unganisha kikundi, cheki cha PR kinachohitajika, lakabu ya npm au mwanachama wa wasifu wa skanning tuli. Kikagua msingi pia huzuia madarasa yote matano katika hali kamili. Maandalizi ya kawaida PR yanabaki tofauti na kiingilio. Upakiaji uliofaulu hauwezi kugeuza matokeo ya afya ambayo hayakufaulu kuwa PASS.

PR ya kawaida hutumia `--preflight` yenye ripoti ya msingi iliyotolewa na `--baseline-evidence`. Inaweza kuacha chanzo cha Kiingereza kikisubiri tu wakati rekodi kamili ya tafsiri na baiti halisi lengwa hazijabadilishwa kutoka msingi huo. Lengo jipya au kutolingana kwa akiba ya sehemu bado kunazuia, na ushahidi usio kamili hauwezi kuidhinisha maandalizi. Ripoti inafichua `preparationPending` na `mergeReady` tofauti: utayarishaji uliofaulu haufanyi tafsiri zinazosubiri kuwa tayari kuunganishwa. Onyesha upya vioo vilivyoathiriwa katika mgombea aliyetungwa kabla ya kuandikishwa. Mgombea anayeaminika wa foleni ya Mergify, `merge_group`, misukumo ya tawi na uendeshaji wa mwongozo CI hutumia kikagua kabisa, bila `--warn` au msamaha wa kurithi wa kutofaulu. Ukosefu wa heshi lengwa na upeo uliopunguzwa na faili za msingi zilizorekodiwa hauwezi kutoa uamuzi kamili.

### Toa njia ya haraka PR (`quality.yml`)

`.github/workflows/quality.yml` inakamilisha CI kwenye main/release PRs, inasukuma hadi `main`, kutuma na kuunganisha vikundi. PRs tumia ukaguzi wa haraka uliochujwa. Muundo wa nakala uliozimwa kabisa uliondolewa; ukaguzi halisi build/package/boot unabaki katika CI. Kitengo cha kitengo na vitest huendeshwa tu katika CI (`Unit Tests (N/12)` na `Vitest`).

| Kazi                                             | Upeo                                                                                                                                                                                                                        | Kuzuia              |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; Hati za API ref na hati-zote                                                                                                                                                                                 | Ndiyo               |
| `Fast Quality Gates`                             | Kanuni PRs; ukaguzi tuli, angalia aina, ukaguzi wa aina ya dashibodi, majaribio ya vitengo vilivyoathiriwa                                                                                                                  | Ndiyo               |
| `Forgotten sibling tests`                        | Kanuni PRs; moduli zilizobadilishwa zilizofuatiliwa kwa watumiaji tuli na majaribio ya ndugu wa mgombea; mapipa na njia za kuingiza-nguvu zinaripotiwa kama uchunguzi wa ushauri, isipokuwa orodha ya ruhusa iliyorejelewa. | **Ushauri**         |
| `No new ESLint warnings`                         | Kanuni PRs; suppressions-fahamu pamba ulinzi                                                                                                                                                                                | Ndio, pamoja na uma |
| `Merge integrity (changelog + generated skills)` | PRs isiyo na rasimu; changelog na upatanishi wa ujuzi unaozalishwa                                                                                                                                                          | Ndio, pamoja na uma |

#### Ripoti ya majaribio ya ndugu waliosahau

`npm run check:forgotten-sibling-tests` huendesha kama hatua ya ushauri ya `Fast Quality Gates` na hutumia tena kisuluhishi cha kuagiza kilicho nyuma ya ramani ya athari ya majaribio. Kwa kila sehemu ya uzalishaji iliyobadilishwa, huripoti misururu ya kubainisha `changed module/symbol -> static consumer -> candidate sibling test` wakati jaribio la mtahiniwa halipo kwenye tofauti ya ombi la kuvuta. Muhtasari wa Markdown na matokeo ya JSON huhifadhiwa kama vizalia vya utendakazi `forgotten-sibling-tests` kwa ajili ya kurekebishwa kabla ya uchapishaji wowote wa kuzuia.

Usafirishaji upya wa mapipa na uagizaji dhabiti ni uchunguzi wa azimio pekee; kamwe hazitengenezi ugunduzi wa kuzuia. Vighairi vilivyokaguliwa vinaishi katika `config/quality/forgotten-sibling-allowlist.json`. Kila ingizo lazima lipe jina la mtumiaji na jaribio la mgombea, litoe sababu mahususi, na liunganishe suala la GitHub au ombi la kuvuta. Maingizo yenye hitilafu yameshindwa kufungwa. Vighairi haviwezi kukandamiza jaribio la mtahiniwa lililofutwa au tofauti inayoongeza `.skip`/`.todo`; madai kudhoofika na masking nyingine kubaki inamilikiwa na kujitegemea kuzuia mlango `check:test-masking`.

### Kazi: `lint`

Huendesha kila PR hadi `main`. Vitalu vinaunganishwa kwenye kushindwa.

| Hati (`npm run ...`)              | Inathibitisha                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Kuzuia                                  |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | Toleo la Node.js liko ndani ya safu inayotumika                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ndiyo                                   |
| `check:cycles`                    | Uagizaji wa mduara kote katika `src/` + `open-sse/` (kulingana na AST, tsconfig `paths` imetatuliwa). Bare inatoka 1 wakati wowote mzunguko wowote upo (imeshindwa-kufungwa tangu #15281) na kuorodhesha SCCs. `check:cycles:ratchet` (kile CI inaendesha) huzuia hesabu inapozidi dari ya `metrics.cycles` katika `quality-baseline.json` — kwa sasa 14, `direction: down`, kwa hivyo inaweza kuanguka tu (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ndio (ratchet)                          |
| `check:boundary`                  | Uunganishaji wa `open-sse → src` : uagizaji wa kipekee wa faili-kwa-faili kutoka kwa injini hadi kwenye programu (`scripts/quality/measure-boundary.mjs`; orodha ya ukingo ni kumbukumbu ya v4 ya urekebishaji core/module-split ). Ripoti ya ushauri wa = (sawa na `quality:boundary`). `check:boundary:ratchet` (nini CI inaendesha, pia katika kitanzi cha ratchet cha milango ya haraka `quality.yml` ) huzuia wakati hesabu inapozidi dari `metrics.boundaryOpenSseToSrc` katika `quality-baseline.json` — iliyopandwa kwa kipimo cha 771, `direction: down`; `--update` inaishusha tu; jamaa-msingi kwenye PRs (`--base-ref`, tazama hapa chini)                                                                                                                                                                                                                                                                                                                            | Ndio (ratchet)                          |
| `check:route-validation:t06`      | Miradi ya Zod iliyopo kwenye njia zote (Sera ya Kiwango cha 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ndiyo                                   |
| `check:any-budget:t11`            | Idadi ya `@ts-expect-error // any` haizidi bajeti (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ndiyo                                   |
| `check:provider-consistency`      | Kila mtoaji huduma katika `providers.ts` ana ingizo linalolingana katika `providerRegistry.ts` (na kinyume chake, ndani ya orodha ya vibali)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ndiyo                                   |
| `check:model-lifecycle`           | Majedwali matatu ya uelekezaji yaliyodumishwa kwa mkono hukaa sawa na muhtasari wa mzunguko wa maisha uliowekwa (#11503): `FITNESS_TABLE` (`taskFitness.ts`) haipati kitambulisho kilichostaafu ambacho `REGISTRY` inaweza kutumia; kila lengo la `BUILT_IN_ALIASES` lipo katika `REGISTRY` na halipo kwenye picha ya kitambulisho kilichostaafu; kila kitambulisho kilichostaafu ambacho bado katika `REGISTRY` kinatumwa au kuorodheshwa katika `allowedRetiredInCatalog`; na hakuna chanzo au shabaha `DEFAULT_DEGRADATION_MAP` inaonekana ikiwa imestaafu katika muhtasari huo. Hii haithibitishi kuwa mtindo unahudumiwa kwa sasa na mkondo wa moja kwa moja wa juu. — ya nje ya mtandao inalinganishwa dhidi ya `config/quality/model-lifecycle.json`, iliyoonyeshwa upya kwa mkono na `npm run quality:refresh-model-lifecycle` (mtandao; haujaunganishwa kwenye CI). `allowedRetiredInCatalog` ni ratchet ya kuchoma-chini: ongeza ingizo kwa suala la ufuatiliaji pekee. | Ndiyo                                   |
| `check:fetch-targets`             | Kila `fetch("/api/...")` katika `src/` ya upande wa mteja inaazimia kwa `route.ts` halisi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ndiyo                                   |
| `check:deps`                      | Vituo vyote vya `npm install` -able katika kila `package.json` kwenye repo viko `dependency-allowlist.json`; vifurushi vipya ambavyo havijabandikwa au vilivyotiwa alama kwenye alama                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ndiyo                                   |
| `audit:deps`                      | ukaguzi wa npm wa faili zote tano za kufuli zinazojitegemea (mizizi, Electron, programu jalizi za OpenCode v1/v2 na mtoaji). Ushauri muhimu kuzuia; ushauri wa juu unabaki kuwa maonyo yanayoonekana. Ukaguzi wa Missing/failed ni INCOMPLETE na kuzuia; heshi na ripoti za kufuli kwa kila wigo huhifadhiwa.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ndiyo                                   |
| `check:lockfile`                  | Uadilifu wa `package-lock.json` — sajili ya https, heshi za uadilifu, hakuna ubatilishaji wa seva pangishi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ndiyo                                   |
| `check:licenses`                  | Orodha ya ruhusa ya leseni SPDX kwa tegemezi za uzalishaji                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ndiyo                                   |
| `check:tracked-artifacts`         | Hakuna mabaki ya muundo / ulinganifu wa `node_modules` uliojitolea (pia huendesha kwa dhamira ya awali ya husky; msukumo wa awali ni mwepesi kimakusudi — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ndiyo                                   |
| `check:ai-attribution`            | Hakuna trela ya AI/bot `Co-Authored-By` au kijachini cha kizazi cha AI katika PR kinachofanya, jina au chombo cha — Kanuni Ngumu #16 (katika kitanzi cha `quality.yml` cha milango ya haraka ya PR→ `release/**` — inasoma malipo ya tukio, bila kuacha PRs — na hatua ya PR-pekee katika `main` `commit-msg` `ci.yml` PR→#14436                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:vitest-exclusions`         | Kila kutengwa kwa Vitest hutaja suala la ufuatiliaji na inaonekana katika `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ndiyo                                   |
| `check:file-size`                 | Chanzo faili (`.ts`/`.tsx` katika `src/`, `open-sse/`, `electron/`, `bin/`) hukaa ndani ya `cap` na faili za majaribio (`*.test.ts(x)`) ndani ya `testCap`; faili zilizogandishwa katika `file-size-baseline.json` (`frozen` / `testFrozen`) hazipaswi kupita ukubwa wao uliorekodiwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ndiyo                                   |
| `check:error-helper`              | Majibu ya makosa katika executors/handlers hutumia `buildErrorBody()` / `sanitizeErrorMessage()` (Sheria Ngumu #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ndiyo                                   |
| `check:migration-numbering`       | Faili za Uhamiaji SQL zimeorodheshwa kwa mpangilio, hakuna mapungufu au nakala                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ndiyo                                   |
| `check:public-creds`              | Hakuna funguo halisi za OAuth `client_id`/`client_secret` au Firebase Web nje ya `publicCreds.ts` (Kanuni Ngumu #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ndiyo                                   |
| `check:db-rules`                  | Hakuna SQL mbichi nje ya moduli `src/lib/db/` ; hakuna pipa-kuagiza kutoka `localDb.ts` (Kanuni Ngumu #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ndiyo                                   |
| `check:known-symbols`             | Watekelezaji watoa huduma, mikakati ya uelekezaji, na watafsiri waliosajiliwa katika jedwali lao la kutuma hulingana na faili kwenye diski — hakuna alama za yatima au ambazo hazijatangazwa.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ndiyo                                   |
| `check:route-guard-membership`    | Kila njia inayozalisha mchakato wa mtoto imeainishwa na `isLocalOnlyPath()` (Kanuni Ngumu #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ndiyo                                   |
| `check:test-discovery`            | Kila faili ya `*.test.ts` / `*.spec.ts` kwenye repo inakusanywa na angalau mkimbiaji mmoja wa majaribio (ratchet: orodha ya watoto yatima katika `test-discovery-baseline.json` inaweza tu kupungua)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ndiyo                                   |
| `check:test-tla-order`            | Hakuna faili `node:test` chini ya `tests/unit` inayosajili jaribio, kugonga `await` ya kiwango cha juu, kisha kusajili zaidi (#18045; ratchet: `test-tla-order-allowlist.json` inaweza tu kupungua)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ndiyo                                   |
| `check:agent-skills-sync`         | Vizalia vya programu vya ujuzi wa mawakala vinalingana na katalogi yao ya chanzo (hakuna mteremko)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:provider-asset-provenance` | Mtoa huduma logos/assets hubeba ingizo la asili lililorekodiwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `lint:json`                       | Faili za usanidi wa JSON huchanganua na kukidhi sheria za repo lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `typecheck:core`                  | Mkusanyiko wa TypeScript bila makosa (maonyo ya ushauri tu)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ndiyo                                   |
| `typecheck:noimplicit:core`       | Mtazamo mkali `noImplicitAny` — ; tovuti nyingi za simu zilizokuwepo bado zinahitaji maelezo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **Ushauri** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` inalenga `src/app/(dashboard)/**` (#7033) Orodha ya ruhusa ya — `typecheck:core` iliyoratibiwa ya faili 27 haijumuishi dashibodi yoyote TSX, na `next build` haiangazii kamwe (`next.config.mjs` seti `ignoreBuildErrors: true`), kwa hivyo urejeleaji wa vitambulisho vya yatima hapo (#6625/#6909) haukuonekana kwa CI. Inatofautiana dhidi ya msingi wa hesabu ya per-file/per-TS-code iliyogandishwa (`config/quality/dashboard-typecheck-baseline.json`, muundo wa utekelezaji wa zamani kama `check:known-symbols`) — tu makosa NEW zaidi ya hesabu ya msingi hushindwa lango; rekebisha na `--update` wakati kosa lililokuwepo limerekebishwa.                                                                                                                                                                                                                                                                                                                       | Ndiyo                                   |
| `check:build-typecheck`           | Angalia aina ya toleo la programu nzima kwenye `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), orodha ya vibali vya faili 27 ya uso wa `typecheck:core` na lango la dashibodi halifuniki. Tofauti dhidi ya `config/quality/build-typecheck-baseline.json`; hesabu mpya au iliyoinuliwa kwa-(faili, nambari) haifaulu, hesabu ya chini inakuuliza uchague. `--update` inakataa wakati mbio ina jozi mpya au iliyoinuliwa isipokuwa `--force-regressions` imepitishwa, na inakataa faili mpya iliyonyamazishwa isipokuwa `--force-nocheck` haijapitishwa, hivyo kupanua msingi wa kupata kijani na kutoa ukimya wa kudumu ni vitendo viwili tofauti vya makusudi. `--force` tupu imekataliwa. Pia huchanganua wigo wa ujenzi wa `@ts-nocheck` dhidi ya `config/quality/ts-nocheck-baseline.json`, kwa sababu faili inayoitumia huripoti hakuna uchunguzi wowote na vinginevyo isingeonekana kwa kila lango.                          | Ndiyo                                   |

#### Programu mbili za cheki hujibu tofauti

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) na `check:build-typecheck` hukusanya programu tofauti chini ya chaguo tofauti, na faili sawa inaweza kuwa safi katika moja na kamili ya makosa katika nyingine.

`tsconfig.build.json` huweka `"strict": false`, kwa hivyo `noImplicitAny` imezimwa. Mipangilio ya msingi inakusanya orodha ya ruhusa ya faili 27 iliyoratibiwa na chaguo kali zaidi na hufuata grafu ya kila ingizo, kwa hivyo faili ambazo hazionekani kamwe kwenye mpango wa ujenzi bado huangaliwa hapo.

Matokeo ni muhimu wakati wa kuhukumu ikiwa faili imechapishwa:**utambuzi wa sifuri chini ya `check:build-typecheck` haimaanishi sifuri** . Kuondoa `@ts-nocheck` kutoka faili 26 kulionyesha 23 kati yao safi katika mpango wa ujenzi; kumi na sita kati ya hizo zilijitokeza kama makosa 120 - yoyote katika ile kali. Angalia zote mbili kabla ya kuita faili safi.

### Kazi: `quality-gate`

Hukimbia baada ya `test-coverage`. Vitalu vinaunganishwa kwenye kushindwa.

| Hati                         | Inathibitisha                                                                                                                                                    | Kuzuia                       |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `quality:collect`            | Inatoa `quality-metrics.json` (hesabu ya onyo ESLint, chanjo kutoka kwa ripoti ya shard iliyounganishwa)                                                         | Ndio (mto wa juu wa ratchet) |
| `quality:ratchet`            | Kila kipimo katika `quality-baseline.json` hakijarudi nyuma (ESLint onyo ≤ msingi; chanjo msingi ≥ )                                                             | Ndiyo                        |
| `check:duplication`          | Urudiaji wa msimbo (jscpd@4) hauzidi msingi katika `quality-baseline.json`                                                                                       | Ndiyo                        |
| `check:complexity`           | Utata wa mzunguko wa kiwango cha faili hauzidi kikomo (msingi ESLint `complexity` + `max-lines-per-function`)                                                    | Ndiyo                        |
| `check:cognitive-complexity` | Utambuzi utata ratchet (`eslint-plugin-sonarjs`) — tofauti kupita ESLint ; CI inaendesha zote mbili zilizounganishwa kama hatua moja `check:complexity-ratchets` | Ndiyo                        |
| `check:dead-code`            | Uhamisho usiotumika / ratchet ya faili (knip) hairudi nyuma dhidi ya msingi                                                                                      | Ndiyo                        |
| `check:compression-budget`   | Bajeti ya kiwango cha ukandamizaji cha — sakafu za akiba za tokeni kwa kila injini lazima zisirudi nyuma                                                         | Ndiyo                        |
| `check:type-coverage`        | Ratchet iliyoandikwa kwa asilimia (`type-coverage`) hairudi nyuma; kwa kiasi kikubwa inachukua `typecheck:noimplicit:core`                                       | Ndiyo                        |

### Kazi: `codeql-scan` na `codeql-admission`

`codeql-scan` hutoa kategoria zote za uchanganuzi zilizosanidiwa. Baada ya kazi hiyo kufaulu, `codeql-admission` inathibitisha upakiaji wake halisi na ratchet ya tahadhari ya mgombea. Zote ni tegemezi zinazohitajika za `Gate / CI`, ikijumuisha watahiniwa wa hati pekee. Mahitaji ya uanzishaji wa kiutawala na canary yamefafanuliwa chini ya "CodeQL ratchet" hapa chini.

| Hati                   | Inathibitisha                                                                                                                                                                                           | Kuzuia |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `check:codeql-ratchet` | ref/SHA ya mgombea na kategoria zote za uchanganuzi zilizosanidiwa lazima ziwe za sasa kabla ya arifa; kukosa ushahidi vitalu. Hesabu ya kimataifa inabaki tofauti — tazama "CodeQL ratchet" hapa chini | Ndiyo  |

### Kazi: `quality-extended`

Kazi inazuia wagombea wanaotumika. Ukubwa wa kifurushi, matokeo ya siri, matokeo ya uwezekano wa kuathiriwa, matokeo ya mtiririko wa kazi na mabadiliko OpenAPI huangaliwa kwa ratchets zinazohitajika. Uchunguzi wa utegemezi wa mviringo unasalia kuwa ushauri. Usakinishaji wa skana unahitajika: Masharti ya `scripts/ci/install-quality-scanners.sh` yamebandikwa matoleo na kueneza hitilafu za usakinishaji. Zana zinazokosekana, ripoti batili au misingi inayokosekana huacha lango la kichanganuzi linalohitajika INCOMPLETE.

| Hati                     | Inathibitisha                                                                                                                                                                                                                      | Kuzuia                                                   |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `check:circular-deps`    | Hakuna utegemezi wa mviringo (dpdm)                                                                                                                                                                                                | **Ushauri**                                              |
| `check:bundle-size`      | Ukubwa wa kifungu hauzidi kofia; kipimo kisichopatikana kinashindwa                                                                                                                                                                | **Kuzuia na --ratchet**                                  |
| `check:secrets`          | Matokeo ya Gitleaks hayarudi nyuma; scans zinazohitajika kataa tools/source/baseline iliyokosekana , scanning imeshindwa na ripoti batili                                                                                          | **Kuzuia na --ratchet**                                  |
| `check:vuln-ratchet`     | Udhaifu wa utegemezi haurudi nyuma; scans zinazohitajika kukataa zana zinazokosekana, ripoti batili au kukosa misingi                                                                                                              | **Kuzuia na --ratchet**                                  |
| `check:workflows`        | pamba ya mtiririko wa kazi (kitendo + zizmor); Vichanganuzi vya missing/broken, ripoti batili au msingi unaokosekana wa ratchet hushindwa kama INCOMPLETE. Matokeo halali yanafuata sera ya strict/advisory/ratchet iliyochaguliwa | Utekelezaji unahitajika; zizmor ratchet kuzuia katika CI |
| `check:openapi-breaking` | Mkataba wa umma API dhidi ya ahadi za tukio zilizobandikwa (PR unganisha-msingi, sukuma kabla, unganisha msingi wa kikundi; scheduled/manual Checkout mzazi wa kwanza); kipimo kinachohitajika kinashindwa kufungwa                | **Kuzuia na --ratchet**                                  |

### Kazi: `docs-sync-strict`

Kwa maombi ya kuvuta kwa `main` au `release/**`, kazi hii inatumika kwa watahiniwa wasio wa rasimu (au foleni inayoaminika) walioainishwa kama hati au mabadiliko ya msimbo. Pia inaendesha matukio yasiyo ya PR CI ; kichochezi cha mtiririko wa kazi hii kinashughulikia `main` pekee, sio `release/**`. Hatua inayotoka isiyo ya sifuri huzuia kazi; matokeo ya ripoti pekee na misamaha iliyoandikwa hapa chini haifanyi hivyo.

| Hati                           | Inathibitisha                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Kuzuia                                                                                                                                                           |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-lango ambalo huendesha milango midogo 7 hapa chini kwa mfuatano                                                                                                                                                                                                                                                                                                                                                                                                  | Ndiyo                                                                                                                                                            |
| ↳ `check:docs-sync`            | Uthabiti wa toleo la Package/OpenAPI/CHANGELOG, vioo kamili `llm.txt`, vibadilishi vya CHANGELOG section/size vilivyotafsiriwa, na kutokuwepo kwa nakala rudufu za hati.                                                                                                                                                                                                                                                                                              | Ndiyo                                                                                                                                                            |
| ↳ `check:docs-frontmatter`     | Kurasa zilizokusanywa za hati huwa na mada halali ya mada ya mbele                                                                                                                                                                                                                                                                                                                                                                                                    | Ndiyo                                                                                                                                                            |
| ↳ `check:docs-counts`          | Vigezo vya hesabu ya juu-kujiamini ni kali; ukaguzi wa kuhesabu faili unaonya tu isipokuwa hati itapokea `--strict` (lango la meta CI haliipiti)                                                                                                                                                                                                                                                                                                                      | Uzuiaji mkali wa tier; ushauri wa ngazi laini                                                                                                                    |
| ↳ `check:env-doc-sync`         | Chanzo env kinasoma, `.env.example`, na `docs/reference/ENVIRONMENT.md` wanakubali baada ya orodha za wazi za kupuuza, hati pekee na za env pekee                                                                                                                                                                                                                                                                                                                     | Ndiyo, nje ya orodha za ruhusa zilizorekodiwa                                                                                                                    |
| ↳ `check:deprecated-versions`  | Huripoti matoleo yanayowezekana ya zamani nje ya miktadha salama ya kihistoria na tarehe za kusasisha zilizopitwa na wakati, bila kujumuisha hati zilizopuuzwa                                                                                                                                                                                                                                                                                                        | Ushauri katika wiring wa sasa CI (`--strict` haijapitishwa)                                                                                                      |
| ↳ `check:doc-links`            | Viungo vya alama za ndani katika hati huamua faili halisi ( fomu ya `[text]`/`(path)` )                                                                                                                                                                                                                                                                                                                                                                               | Ndiyo                                                                                                                                                            |
| ↳ `check:fabricated-docs`      | Njia, env vars, amri za CLI, majina ya ndoano, na njia za faili zilizotajwa katika hati zipo kwenye msingi wa msimbo. Lango gumu kupitia `--strict`; laini-kushindwa bila bendera.                                                                                                                                                                                                                                                                                    | Ndio (kupitia `--strict` katika CI)                                                                                                                              |
| `check:cli-i18n`               | Vifunguo vya CLI `t()` vilivyotumika vipo katika `en`; `pt-BR` huhifadhi kila sehemu ya kiwango cha juu; `zh-CN` na `zh-TW` zina kila funguo kutoka `en`                                                                                                                                                                                                                                                                                                              | Ndiyo                                                                                                                                                            |
| `check:openapi-coverage`       | OpenAPI spec inashughulikia angalau sakafu iliyopangwa ya njia halisi                                                                                                                                                                                                                                                                                                                                                                                                 | Ndiyo                                                                                                                                                            |
| `check:openapi-security-tiers` | Maelezo ya `x-loopback-only`/`x-always-protected` yaliyotangazwa lazima yaungwe mkono na `routeGuard.ts`; kizuizi cha vichanganuzi na vya mbele visivyolingana. Ukaguzi wa kinyume wa kukosa `x-loopback-only` chini ya viambishi awali vya ndani pekee unaonya, na njia za muundo pekee hazijajumuishwa kwenye kipita hicho cha kinyume.                                                                                                                             | Parser/forward hundi kuzuia; badilisha ushauri wa ukaguzi                                                                                                        |
| `check:openapi-routes`         | Kila njia `/api...` katika `openapi.yaml` hutatua bila kujali kigezo kwa njia halisi baada ya orodha ya ruhusa `KNOWN_STALE_SPEC` iliyohalalishwa; maingizo ya orodha ya ruhusa yaliyochakaa pia yameshindwa                                                                                                                                                                                                                                                          | Ndiyo                                                                                                                                                            |
| `check:docs-symbols`           | Marejeleo ya ndani ya `/api/...` URL katika hati za kisheria zisizo za kioo hutatua kwa njia halisi au familia ya njia; Marejeleo ya proxy/upstream/placeholder/file na maingizo yaliyohalalishwa `KNOWN_STALE_DOC_REFS` hayajajumuishwa, na maingizo ya orodha ya ruhusa yaliyochakaa yameshindwa.                                                                                                                                                                   | Ndiyo                                                                                                                                                            |
| `i18n translation drift`       | Kukubalika kabisa kunahitaji chanzo sifuri, lengwa lisilopo, lengwa-heshi, tafsiri ya zamani na kutofautiana kwa akiba ya sehemu. Maandalizi ya kawaida PR yanaweza kuhifadhi ushahidi kamili wa kurithi au mabadiliko yanayosubiri ya Kiingereza pekee na hali kamili isiyobadilika na baiti lengwa; ripoti yake tofauti inatangaza utayari wa kuunganisha. Ukosefu wa heshi lengwa na kizuizi cha msingi cha ushahidi usio kamili. Akiba ya sehemu ya urithi haipo. | Madarasa yote matano yanazuia uandikishaji queue/base ; vibali vya maandalizi ya kawaida tu vilivyothibitishwa kurithiwa au kazi inayosubiri ya Kiingereza pekee |

README SVGs kumi na mbili chini ya `docs/diagrams/` zinazalishwa (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` inazitengeneza upya zote). Kila moja ina jaribio la kitengo cha kulinganisha baiti (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) ambalo halifaulu wakati faili iliyotumwa imechakaa, na `check:docs-counts` husoma nambari za kisheria kutoka kwa nodi zao za `<text>` — ndiyo maana hatua ya kubainisha huweka kila mfuatano ulioainishwa kwenye faili kama `<text>` isiyoonekana. Ukaguzi wa nambari za kanuni SVG husoma faili zilizoorodheshwa katika `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, pamoja na `public/images/tier-flow-dark.svg` na `tier-flow-light.svg`; madai ya bure-forever, catalog-entry, pool-recurring-pool na mambo ya bao pia yanasoma `promise-pillars.svg`, `free-tier-budget.svg` na `strategies-grid.svg`. `free-tier-budget.svg` huchota takwimu zake kutoka kwa kipakiaji cha orodha cha moja kwa moja, kwa hivyo mabadiliko hadi `FREE_MODEL_BUDGETS` au kwa jina la mtoa huduma linaonyesha rangi nyekundu CI hadi faili hiyo itengenezwe upya.

### Kazi: `i18n-ui-coverage`

| Hati                              | Inathibitisha                                                                                                                                                                                                        | Kuzuia     |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check-ui-keys-coverage` (inline) | Utoaji muhimu UI i18n ni ≥ 65%                                                                                                                                                                                       | Ndiyo      |
| `check-ui-value-drift` (inline)   | Kiingereza kilichoandikwa upya **thamani** haiachi tafsiri ya zamani nyuma                                                                                                                                           | Ndiyo      |
| `check-new-key-coverage` (inline) | A **mpya** Kitufe cha Kiingereza kinatafsiriwa katika kila lugha — alama ya `__MISSING__:` imekataliwa                                                                                                               | Ndiyo      |
| `check-translation-ratio`         | Uwiano wa tafsiri halisi kwa kila eneo (kinafanana-kwa-Kiingereza / kishika nafasi / majani yanayokosekana nje ya orodha ya wanaoruhusiwa) lazima usizidi slack ya `config/quality/i18n-translation-baseline.json` + | **Kuzuia** |

Inahitaji `fetch-depth: 0` — lango la kushuka kwa thamani hutofautisha `en.json` dhidi ya msingi wa kuunganisha.

#### `check-ui-value-drift` — lango la kutafsiri lililochakaa

Hukamata urejeo mmoja wa i18n ambao milango mingine kimuundo haiwezi kuona: thamani ya Kiingereza huandikwa upya na tafsiri zinazotokana na _previous_ Kiingereza hubaki nyuma, ili watumiaji wasio wa Kiingereza waendelee kusoma kwa kujiamini, nakala isiyo sahihi.

Hii imesafirishwa kwa kweli. `oauthModal.googleOAuthWarning` iliandikwa upya wakati msaidizi wa kuingia Antigravity alipotua (#5203);**39 kati ya 43 za mitaa** iliweka maandishi kuwaambia waendeshaji "nakili URL kamili na kuibandika hapa chini" — mtiririko ambao hauwezi kukamilisha kwa mtoaji huyo. Haikuonekana hadi #8463 kwa sababu:

- `sync-ui-keys` inajaza funguo tu ambazo ni **kutokuwepo** , kamwe wale walio **stale** ;
- `check-ui-keys-coverage` huhesabu ufunguo _uwepo_, kwa hivyo tafsiri ya zamani inapata alama kama ilivyofunikwa;
- `check-translation-drift` inafuatilia vioo vya nyaraka vya `docs/i18n/<locale>/**.md` — haisomi kamwe `src/i18n/messages/*.json`. Kuzuia `docs-sync-strict` ya kazi tangu usawazishaji upya wa 2026-09: hariri hati ya msingi → `npm run i18n:run -- --files=<doc>` (kiwango cha sehemu, nafuu).

**Diff-aware, si msingi-backed.** Inalinganisha `en.json` kwenye msingi wa kuunganisha dhidi ya mti unaofanya kazi; kwa kila ufunguo ambao thamani yake ya Kiingereza ilibadilika, lugha yoyote ambayo bado ina tafsiri ambayo haijaguswa ni ya zamani. Hii kwa makusudi **kufungia deni lililokuwepo hapo awali** — a diff haiwezi kufichua ni Kiingereza kipi cha zamani ambacho tafsiri ya muda mrefu ilitoka, kwa hivyo lango huamua tu kile ambacho mabadiliko ya sasa yanagusa. Njia mbadala (msingi wa kila ufunguo wa heshi) ingegharimu faili inayozalishwa ya ~ 600 KB, 3 × msingi mkubwa zaidi uliopo, ikicheza kila i18n PR.

Njia mbili za kukidhi:

1. sasisha tafsiri zilizoathiriwa, au
2. ziweke kwa `__MISSING__:<new english>` — wakati wa utekelezaji kisha utumie Kiingereza kilichosahihishwa (`src/i18n/request.ts::deepMergeFallback`, #7258) na foleni muhimu za tafsiri.

Ikiwa kamba ni **maana** iliyopita, pendelea **kubadilisha jina la ufunguo** : ufunguo mpya hauwezi kurithi tafsiri ya zamani. Huo ndio muundo #8463 uliotumika.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Lango la kudondoshwa kwa thamani na lango la ufunguo-mpya hushiriki ulinganisho mmoja usiobadilika kutoka `scripts/i18n/resolve-ui-diff-base.mjs`. Mtiririko wa kazi hupitisha msingi sawa, ncha-msingi na SHAs ya mgombea kwa hundi zote mbili. PR/base-retarget, sukuma na unganisha uendeshaji wa kikundi hutumia muktadha wa tukio lao. Kutuma tawi la mgombea kunahitaji PR yake iliyo wazi kabisa au ingizo dhahiri `i18n_base_sha`. Kutuma au uchunguzi ulioratibiwa wa `main` au `release/vX.Y.Z` bila ingizo hilo unalinganisha ahadi ya mwisho na mzazi wake wa kwanza; sio ukaguzi wa deni zote za kurithi za tafsiri. Ombi la karibu linahitaji msingi wa kulinganisha wazi, kwa mfano amri ya `BASE_REF` hapo juu.

Muktadha wa kulinganisha unaokosekana au wenye utata, katalogi isiyoweza kusomeka au batili inayohitajika, na mgombeaji aliyebadilishwa hutoa `INCOMPLETE` na msimbo wa kuondoka.**2** , ikiwa ni pamoja na katika hali ya onyo. Usomaji wa katalogi tumia `scripts/i18n/read-ui-catalog.mjs`; makosa ya kusoma hayajabadilishwa na vitu tupu. Wala msingi usiopatikana au ingizo lisilokamilika huanzisha PASS.

### Kazi: `i18n`

Matrix kamili ya uthibitishaji wa i18n (kazi moja kwa kila eneo). Kazi nzima ni ya ushauri.

| Hati                            | Inathibitisha                      | Kuzuia                                                 |
| ------------------------------- | ---------------------------------- | ------------------------------------------------------ |
| `validate_translation.py quick` | Ukamilifu wa tafsiri kwa kila eneo | **Ushauri** (`continue-on-error: true` kwa kazi nzima) |

### Kazi: `pr-test-policy`

Huendesha ombi la kuvuta pekee.

| Hati                   | Inathibitisha                                                                                                                                        | Kuzuia |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `check:pr-test-policy` | PRs inayobadilisha msimbo wa uzalishaji katika `src/`, `open-sse/`, `electron/`, au `bin/` lazima ijumuishe au isasishe majaribio (Kanuni Ngumu #8)  | Ndiyo  |
| `check:test-masking`   | Faili za majaribio zilizobadilishwa hazipunguzi hesabu halisi ya madai au kuongeza tautologies za `assert.ok(true)`                                  | Ndiyo  |
| `check:pr-evidence`    | Chombo cha PR kinatoa ushahidi wa test/VPS wa mabadiliko hayo (huandaa Kanuni Ngumu #18 kwa kuweka nathari ya PR — kuwa tete, angalia Marudio nyuma) | Ndiyo  |

### Kazi: `test-vitest`

Inahitaji kazi ya uainishaji wa `changes`. Shadi za matrix zinazotumika huzuia kuunganishwa kwa kushindwa.

| Suite            | Inathibitisha                                               | Kuzuia                                                                                                                       |
| ---------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Seva ya MCP (zana 110), autoCombo, kache — vitest mkimbiaji | Ndiyo                                                                                                                        |
| `test:vitest:ui` | Sehemu ya UI hujaribu mkimbiaji wa vitest —                 | **Kuzuia** — mapungufu yaliyokuwepo hapo awali yametengwa kwa uwazi katika `vitest.config.ts`; kushindwa mpya kushindwa kazi |

### Mitiririko ya kazi ya kila usiku (iliyoratibiwa, ushauri)

Hizi zinaendeshwa kwa ratiba ya cron (na `workflow_dispatch`), kamwe PRs. Yote ni ya ushauri.

| Mtiririko wa kazi      | Inathibitisha                                                                                                                                                                            | Kuzuia      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | angalia haraka vipimo vya mali na hesabu ya juu ya kukimbia + mbegu                                                                                                                      | **Ushauri** |
| `nightly-resilience`   | lango la ukuaji wa lundo, machafuko sindano ya kosa, k6 load/soak                                                                                                                        | **Ushauri** |
| `nightly-llm-security` | ulinzi wa sindano ya promptfoo (hali ya kuzuia) vichunguzi vya + (zimerukwa bila siri ya mtoa huduma)                                                                                    | **Ushauri** |
| `nightly-schemathesis` | Mkataba wa OpenAPI unachanganya (schemathesis) dhidi ya OmniRoute hai kwa kutumia ukiukaji mahususi wa nyuso za `docs/openapi.yaml` — / miaka ya 500 isiyoshughulikiwa (Msingi wa 8 B.4) | **Ushauri** |
| `nightly-mutation`     | Alama ya majaribio ya mabadiliko ya Stryker juu ya njia ya kasi — waliosalia yanaonyesha madai dhaifu.                                                                                   | **Ushauri** |
| `nightly-compat`       | Matrix ya uoanifu wa injini ya nodi katika safu zinazotumika `engines.node`                                                                                                              | **Ushauri** |

Misingi ya msingi ya utendaji (lundo, TTFB, wakati wa kujenga) imerekodiwa, sio lango: tazama [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
- **ushauri** — jumla ya kimataifa dhidi ya msingi uliogandishwa. Mkengeuko uliorithiwa kamwe hauifanyi
  PR isiyo na kosa kuwa nyekundu; mkengeuko huo hufuatiliwa ili urekebishwe wakati wa upatanishaji wa toleo na kufuatiliwa na
  kazi ya headroom.

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

### Ratchet CodeQL : kiingilio cha mgombea na hesabu ya hazina

CI inamiliki kiingilio cha mgombea CodeQL kupitia msururu wa utegemezi ulio wazi: `codeql-scan` inaita matriki ya lugha nne katika `codeql.yml`, kisha `codeql-admission` inaendesha `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` inahitaji matokeo yote mawili. Ubora huhifadhi ukaguzi wake wa nambari lakini hauulizi kichanganuzi kabla ya mtayarishaji kumaliza; `Gate / Quality` pekee sio uandikishaji kamili wa mgombea. CodeQL bado inahitajika kwa watahiniwa wa hati pekee.

Sera katika `config/quality/codeql-admission-policy.json` huchagua Vitendo, C/C++, JavaScript/TypeScript na Python, chaguo-msingi la query suite, mtindo wa tishio la mbali na hakuna hali ya kujenga. Utangazaji wa awali wa mzalishaji unakataa rekodi inayosubiri ya kuwezesha na matawi nje ya orodha ya wazi ya lengwa. Malengo ya sasa ni makuu na majaribio ya Mkataba wa release/v3.8.54. yanalinganisha orodha hii yenye kikomo na kichochezi cha kusukuma cha matengenezo na toleo la kifurushi; toleo linalofuata linahitaji kukaguliwa ukiwa ndani. Kichochezi kikubwa cha CI kilichopo cha kutoa PR kinabakizwa, lakini walengwa ambao hawajabandika huripoti HOLD kabla ya uchimbaji badala ya kupata PASS ambayo haijapimwa.

Kila kazi ya matrix inarekodi upakiaji wake halisi wa SARIF ID, lugha, kategoria, kukimbia na jaribio, utambulisho wa mtiririko wa kazi wa mpigaji simu, tukio ref/head/base/merge SHA na heshi ya sera. Kazi tegemezi hupakua tu risiti za uendeshaji huu na kuthibitisha muhtasari wa vizalia vya programu. Inahitaji kategoria zote nne, mzalishaji aliyefaulu na usindikaji uliokamilika wa kila upakiaji kamili. Inatumia kichujio cha sarif_id cha API, si uchanganuzi wa hivi punde unaopatikana kwenye tawi. Rudia kiasi inaweza kutumia tena kategoria zilizofaulu kutoka kwa jaribio la awali la kukimbia sawa na mgombea, kuhifadhi jaribio la kuzalisha; mzalishaji wa sasa aliyeshindwa hawezi kutumia tena ushahidi wa awali wa kijani.

Kitendo cha CodeQL kinasubiri kuchakatwa, lakini utekelezaji wake uliobandikwa unaweza kuonya na kuendelea baada ya kushindwa kusoma hali au kusubiri kwa muda mrefu. Kwa hivyo uandikishaji huthibitisha uchakataji tena. Kategoria zinazokosekana, uchakataji unaosubiri, kazi zilizofeli au kughairiwa, utambulisho wa zamani, utambulisho usiokamilika au kutopatikana APIs itazalisha HOLD na uondoke 2. Hakuna kusubiri kwa kudumu kwa mtiririko wa kazi wa skana huru iliyosalia. PR ambayo haijachanganuliwa haiwezi kupita kwa sababu hoja ya tahadhari ilirejesha 0. Hesabu iliyopimwa juu ya `metrics.codeqlAlerts.value` inatoka 1; msingi haujainuliwa ili kuchukua arifa za tawi lingine. [Hali ya upakiaji na uchunguzi wa uchanganuzi](https://docs.github.com/en/rest/code-scanning/code-scanning).

Rekodi za risiti za upakiaji na uchanganuzi IDs, kategoria, matoleo ya zana, ref/SHA, nambari za msingi na za arifa. Hesabu ya SARIF identity/result, hesabu za chini zaidi za sheria na matukio kamili ya tahadhari yanasalia kuwa ya lazima. Vitambulisho vya PR/analysis huangaliwa upya kabla ya kukubaliwa. Ukaguzi huu huanzisha huduma ya kategoria iliyosanidiwa, si orodha ya kila faili ya chanzo iliyotolewa. Uchimbaji wa C/C++ bila kujenga haujumuishi msimbo uliotolewa wakati wa ujenzi wa mradi. Kutojumuishwa kwa chanzo bado kunahitaji kukaguliwa, na maelezo ya mchangiaji yanahitaji ushahidi wa msingi unaolinganishwa.

`codeql-maintenance.yml` hutoa skana za kusukuma zinazotolewa na ratiba ya kila wiki bila kunakili wazalishaji wa PR/main. `nightly-codeql-inventory.yml` hutenga msingi wa hazina nzima, na `--strict-measurement` na kushindwa wakati kipimo hakipatikani. Kuruka kwa uzuri kwa mkusanyaji wa urithi wa eneo si kuandikishwa kwa mgombea. Kukaza kunasalia kuwa `--update` dhahiri baada ya hesabu ya chini ya kimataifa iliyothibitishwa.

Mtiririko wa kazi wa Kina lazima usichapishwe huku Uwekaji Chaguo-msingi ukisanidiwa: GitHub inakataa mseto huo. Sera yake iliyotolewa inasalia kusubiri hadi mabadiliko ya kiutawala yaliyokaguliwa yasomwe tena. Kabla ya kuchapishwa, opereta hubandika hazina, head/base/tree, policy/patch/rollback heshi na kuona hali ya usanidi; `node scripts/quality/codeql-producer.mjs verify-admin-readback` hukagua rekodi zinazotarajiwa na halisi JSON. Huyu ni mlinzi wa kiufundi, sio idhini ya waendeshaji au mbadala wa kutafuta usomaji mpya. Tokeni PR haiombi kamwe ufikiaji wa Utawala. Utoaji na mabadiliko yoyote ya kichanganuzi huhitaji urejeshaji upya tofauti pamoja na PR halisi , ushahidi wa uoanifu wa uma na unganisha kikundi.

Uma hutumia wakimbiaji waliopangishwa, hulipa bila stakabadhi zinazoendelea, hakuna mradi wa install/build katika mzalishaji, na hakuna siri za hazina zilizorithiwa. GitHub inasaidia upakiaji wa SARIF kwa tukio la pull_request na tokeni yake ya uma iliyopunguzwa; idhini ya utekelezaji wa mchango wa mara ya kwanza inasalia kuwa sera ya GitHub. Usiwahi kutumia pull_request_target kutekeleza nambari isiyoaminika. Thibitisha ruhusa halisi za tokeni, uchanganuzi_ufunguo na mazingira yote ya kategoria kwenye kari inayodhibitiwa kabla ya kuzingatia uhamishaji kukamilika. [Sheria za upakiaji wa uma](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [njia za usanidi zinazokinzana](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Kuachishwa kazi ni simu ya mwendeshaji (Hard Rule #14)** — kamwe haitupi tahadhari ya CodeQL bila kurekodi uhalali wa kiufundi katika maoni ya kufukuzwa: `won't fix` kwa hitaji la itifaki ya juu ya mkondo, `used in tests` kwa muundo wa majaribio, `false positive` kwa sanitizer CodeQL haiwezi kuona (mfano: `docs/security/ERROR_SANITIZATION.md`).

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

Kila lango ambalo haliwezi kushindwa kwa ukiukaji uliokuwepo awali hutumia orodha ya ruhusa iliyogandishwa
(k.m., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Sera ni:

**Rekebisha chanzo kikuu; tumia orodha ya ruhusa tu wakati ukiukaji ulikuwepo awali na
hauwezi kurekebishwa katika PR hiyo hiyo.**

Unapoongeza ingizo kwenye orodha ya ruhusa:

1. Jumuisha maoni yenye uhalalisho.
2. Rejelea suala la ufuatiliaji (k.m., `// #3498 — Phase 2 feature, not yet implemented`).
3. Ondoa ingizo katika PR hiyo hiyo inayorekebisha ukiukaji — ingizo lililopitwa na wakati ambalo halizuii tena
   ukiukaji unaoendelea ni kasoro pia (utekelezaji wa sheria dhidi ya hali zilizopitwa na wakati wa 6A.3
   utasababisha lango kushindwa kwa ingizo la orodha ya ruhusa lisilohusishwa mara tu utakapotekelezwa).

**Usiongeze** maingizo kwenye orodha ya ruhusa ili kufanya majaribio yapite haraka. Lango la kijani lenye orodha ya ruhusa inayokua
hutoa hisia potofu ya ubora.

### Wakati lango linaposhindwa kwenye PR yako

1. **Soma matokeo ya lango kwa makini** — yanakuambia hasa ni faili au alama ipi iliyokiuka
   sheria.
2. **Rekebisha ukiukaji** — malango mengi ni ukaguzi bainifu wa mfumo wa faili ambao hupita mara tu
   msimbo unapokuwa sahihi.
3. **Ikiwa ukiukaji ulikuwepo awali** (yaani, hukuusababisha, lakini sasa lango
   linaujumuisha): ongeza ingizo kwenye orodha ya ruhusa lenye maoni ya uhalalisho na suala la ufuatiliaji.
4. **Ikiwa lango ni ratchet** (coverage, maonyo ya ESLint, urudiaji, uchangamano):
   mabadiliko yako yamefanya kipimo kuwa kibaya zaidi. Rekebisha tatizo la msingi, au (mara chache) endesha
   `npm run quality:ratchet -- --update` ikiwa mabadiliko yalifanywa kwa makusudi na kuzorota kwa
   kipimo kunakubalika — lakini eleza sababu katika maelezo ya PR.
5. **Malango ya ushauri** (`continue-on-error: true`) ni ya kutoa taarifa — hayazuii
   uunganishaji, lakini huonekana katika muhtasari wa CI. Yarekebishe hata hivyo.

---

## Kuongeza Lango Jipya

1. Unda `scripts/check/check-<name>.mjs` (au `.ts`). Malango ya sera hutoka kwa 0/1.
   Malango ya aina ya ratchet hutoa kipimo kwenda `quality-metrics.json` kupitia `collect-metrics.mjs`.
2. Ongeza `"check:<name>": "node scripts/check/check-<name>.mjs"` kwenye `package.json`, na
   sawazisha jina mbadala na amri yake halisi katika `config/quality/gate-manifest.json`.
   Tekeleza usawazishaji huohuo unapobadilisha au kuondoa jina mbadala lililopo la uthibitishaji.
   Endesha `npm run check:gate-manifest`; hook ya kabla ya commit na uainishaji wa mabadiliko wa CI
   hutekeleza masharti haya.
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

## Orodha ya Marekebisho Yanayosubiri (mapitio ya ROI — Awamu ya 9 Wimbi la 3)

Orodha hii ilipatanishwa na `ci.yml` tarehe 2026-06-17 (toleo la awali liliacha
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Mapitio ya ROI ya seti iliyopatanishwa
yalibainisha wagombea wafuatao wa marekebisho. **Miunganisho ni mabadiliko ya CI
ya kiufundi; ugeuzaji/uondoaji ni maamuzi ya sera yaliyohifadhiwa kwa mwendeshaji.** Hakuna chochote hapa chini
ambacho kimetekelezwa bado.

**Pia hazijaandikwa hapo juu** (za ushauri, zenye ishara dhaifu): kazi ya `docs-lint` (markdownlint + Vale, kazi nzima ni `continue-on-error`) na mitiririko huru ya skana `semgrep.yml` / `scorecard.yml`. CodeQL sasa ina kazi za lazima za mzalishaji na kukubali chini ya `Gate / CI`, kulingana na masharti ya uanzishaji yaliyoelezwa juu. `semgrepFindings: 0` ipo katika `quality-baseline.json` lakini haijaunganishwa na kikomo cha kuzuia katika `ci.yml` — kipimo hicho kwa sasa hakijaunganishwa.

### Unganisha / ondoa urudufu (kiufundi, hatari ndogo)

Kila mgombea alithibitishwa dhidi ya hali halisi ya gate tarehe 2026-06-17 (amini-lakini-thibitisha);
miunganisho kadhaa iliyoonekana kuwa "dhahiri" ilibainika kuficha deni na **si** vibadala safi vya moja kwa moja.

- **`check:docs-sync` huendeshwa mara mbili** — kivyake katika job ya `lint` na tena ndani ya `check:docs-all` (`docs-sync-strict`) na hook ya husky ya pre-commit. ✅ **IMEKAMILIKA** — mwito wa pekee wa `lint` umeondolewa.
- **Ukaguzi wa CVE** — ❌ **SI muunganisho safi.** `audit:deps` huzuia tahadhari hatari sana na ukaguzi usiokamilika katika lockfile zote tano, huku ikiripoti tahadhari za kiwango cha juu kama maonyo chini ya sera ya sasa; `check:vuln-ratchet` (osv) hushindwa tu ikiwa kuna _kurudi nyuma_ ikilinganishwa na baseline iliyowekwa kwenye hazina na hukataa vipimo vinavyokosekana vinapohitajika. Semantiki ni tofauti — kuondoa `audit:deps` kungepoteza gate kamili ya tahadhari hatari sana na stakabadhi huru za ukaguzi wa package. Zihifadhi zote mbili.
- **Ugunduzi wa mizunguko** — ✅ **IMEKAMILIKA** (#15159 G-01/G-02). Maandishi ya zamani hapa yaliita `check:cycles` gate "kijani, iliyochaguliwa kwa makini" na kuhalalisha kuiweka kuwa ya kuzuia kwa sababu `check:circular-deps` (dpdm) iliripoti mizunguko 91. Hali hiyo ya kijani ilikuwa **kijani bandia**: `check:cycles` ilikagua subdirectory 5 (file 450), ililinganisha tu `import|export … from` tuli, na ilitupilia mbali kila specifier ya `@/` na `@omniroute/open-sse/`, hivyo haikuweza kuona mizunguko ya dynamic-import + alias iliyotawala repo. Imerekebishwa: gate sasa hupitia `src` + `open-sse` (file 5023), hukusanya specifier kutoka TypeScript AST (hivyo `import("…")` huhesabiwa na `typeof import("…")` ya nafasi ya type haihesabiwi), na husuluhisha `paths` za tsconfig. Inapata mizunguko **14**, si 0. Kwa sababu mizunguko 14 iliyokuwepo haiwezi kurekebishwa katika PR ya gate, `check:cycles` sasa ni **ratchet** (`--ratchet`, kikomo `metrics.cycles.value = 14` katika `quality-baseline.json`, `direction: down`) — huzuia _kurudi nyuma_ kokote na idadi inaweza kupungua tu. CI huendesha `npm run check:cycles:ratchet`. Upunguzaji unaenda pamoja na **A-01**. `check:circular-deps` (dpdm) inabaki ya ushauri kama maoni ya pili yenye wigo mpana zaidi.
- **Utata** — ✅ **IMEKAMILIKA** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): mzunguko mmoja wa ESLint, huhesabu kwa ruleId ili baseline za cyclomatic+max-lines na cognitive zibaki huru; `check:complexity` / `check:cognitive-complexity` za kibinafsi zinabaki kwa `--update` ya ndani.
- **Uzuiaji wa uzushi wa `/api`** — ✅ **IMEKAMILIKA** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): orodha moja ya FS ya `src/app/api`, openapi-routes + docs-symbols bado huripoti kivyake; ukaguzi wa kibinafsi unabaki kwa uendeshaji wa ndani.
- **`check:node-runtime` huendeshwa katika job 11** — ⚠️ **ROI ya chini.** Kila moja ni runner tofauti na ukaguzi ni <1s; jumla ya uokoaji ni ~10s, dhidi ya kupoteza kinga nafuu ya kila job. Haifai msukosuko huo.
- **`typecheck:noimplicit:core` kwenye lint ya CI** — ✅ **imeondolewa kwenye job ya lint** (ilikuwa ya ushauri `continue-on-error`); uso wa type unaozuia ni `typecheck:core` + `check:type-coverage`. Script ya ndani imehifadhiwa.

### Geuza / amua (sera ya mwendeshaji)

- `check:openapi-security-tiers` (ya ushauri) — ❌ **HAIWEZI kugeuzwa kwa usafi.** Hutoka kwa 0 lakini huonya kwamba route kadhaa za `traffic-inspector` chini ya `LOCAL_ONLY_API_PREFIXES` hazina annotation ya `x-loopback-only: true`. Kuilazimisha kunahitaji kwanza kuongeza annotation hizo kwenye `openapi.yaml`.
- `typecheck:noimplicit:core` (ya ushauri) — kwa kiasi kikubwa imechukuliwa nafasi na ratchet inayozuia ya `check:type-coverage`. Igeuze kuwa ratchet au ondoa upitishaji wa pili unaojirudia wa `tsc`.
- `test:vitest:ui` (sasa **inazuia**) — hitilafu zilizokuwepo zimeondolewa waziwazi katika `vitest.config.ts` kwa maoni ya ufuatiliaji ya `// #8618`; hitilafu mpya husababisha job ishindwe.
- `check:secrets` (gitleaks, ratchet inayozuia) — kikomo cha sasa ni `metrics.secretFindings` katika `quality-baseline.json`. Isipokuwa yoyote inahitaji ingizo lenye sababu katika `.gitleaks.toml`; kipimo kisichopatikana ni INCOMPLETE. Ukaguzi huu hukamilisha ukaguzi asilia wa siri wa GitHub na `check:public-creds`.
- `check:pr-evidence` (inazuia, hutafuta maandishi ya kawaida ya PR-body kwa grep) — ina hatari kubwa ya false-positive; kuiondoa kunadhoofisha utekelezaji wa Hard Rule #18, kwa hivyo hili ni chaguo halisi la sera.
- `semgrep` (ya ushauri na huru) — ina mwingiliano na CodeQL kwa familia za OWASP; unganisha baseline yake na ratchet au iondoe.

---

## Nyaraka Zinazohusiana

- Mnyororo wa ugavi (asili, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — kizuizi cha usawa wa seti za funguo

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, kazi `i18n-ui-coverage`).
Hulinganisha seti ya funguo za mwisho za kila `src/i18n/messages/<locale>.json` na `en.json` na hushindwa
ikiwa kuna jani lolote lisilokuwepo au la ziada, bila kujali ufunguo uliongezwa lini. Vishikilia nafasi vya `__MISSING__:`
huhesabiwa kuwa vipo (maudhui yake ni jukumu la kizuizi cha uwiano). Ni kikamilisho kamili
cha vizuizi viwili vinavyotegemea diff/asilimia: `check-ui-keys-coverage` hutekeleza kiwango cha chini cha 80 % kwa kila
lugha (funguo 43 zisizokuwepo kati ya ~13,000 bado huonekana kama 99.7 %) na `check-new-key-coverage` huhukumu
tu funguo ambazo PR huongeza kwenye `en.json`. Kundi la lugha hutengenezwa kutoka kwenye `en.json` ya siku
ambayo tawi lake linakatwa na hutafsiri kwa siku kadhaa huku msingi ukiendelea kuongeza funguo; PR ya kundi haiongezi
ufunguo wowote yenyewe, kwa hivyo vizuizi vyote viwili vinavyohusiana vilikaa kimya wakati kundi la 1 (#13044) liliunganishwa likiwa na upungufu wa funguo 43 katika
lugha tisa na kundi la 2 (#13660) likiwa na upungufu wa funguo 10 katika lugha nane (2026-09-15). Rekebisha hali nyekundu kwa
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; jani la `extra`
linamaanisha chanzo kililiondoa — lifute kutoka kwenye lugha hiyo. `--warn` huripoti bila kusababisha kushindwa.
`--catalog=cli` huendesha ulinganisho huo huo kwenye `bin/cli/locales` (`npm run i18n:check-keys:cli`);
hatua zote mbili zimo katika kazi `i18n-ui-coverage`.

#### `check-new-key-coverage` — kizuizi cha i18n cha funguo mpya

Kizuizi kinachohusiana na `check-ui-value-drift`. Hicho hunasa thamani ya Kiingereza ambayo **iliandikwa upya**
huku tafsiri zake zikiachwa nyuma; hiki hunasa ufunguo wa Kiingereza ambao **uliongezwa**
huku baadhi ya lugha zikiwa hazijaupokea kamwe.

`check-ui-keys-coverage` haiwezi kuona aina hii: hutekeleza kiwango cha chini cha asilimia kwa kila lugha, na
funguo kumi na moja zisizokuwepo kati ya ~13,000 huacha ufunikaji katika 99.9%. Asilimia kwa kila lugha haiwezi
kueleza "kipengele hiki kilitolewa bila kutafsiriwa" — kipengele kizima kinaweza kuingizwa katika lugha mpya bila
maandishi yoyote na idadi isibadilike kamwe.

Tukio inalowakilisha: Awamu ya 3 ya Turubai ya Uratibu ilitafsiri funguo zake kumi na moja katika
lugha 42 zilizokuwepo wakati huo. Saa kadhaa baadaye, kundi la lugha za EU (#13044) lilifanya hazina
iwe na lugha 51, na lugha tisa mpya (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) hazikuwahi
kuzipokea. `deepMergeFallback` hubadilisha ufunguo usiokuwepo kwa Kiingereza, kwa hivyo hali ya hitilafu ilikuwa
UI isiyotafsiriwa badala ya UI tupu — halisi, na kimya kimakusudi.

Kama kizuizi kinachohusiana nacho, hiki **hutambua diff**, kikilinganisha Kiingereza katika msingi wa uunganishaji na mti wa sasa
wa kazi, kwa hivyo mapengo yaliyokuwepo awali hubaki kama yalivyo na kizuizi hakikuhitaji uhamishaji ili kuwashwa.

**Alama ya `__MISSING__:<english>` haikidhi sharti hilo (tangu 2026-09-17).** Hapo awali ilikuwa
njia iliyoandikwa ya kuahirisha — wakati wa utekelezaji hurudi kwenye Kiingereza sahihi — hadi PR nane za vipengele za
2026-09-16 zilipoongeza funguo 61 na kuweka alama hiyo katika lugha zote 65 badala ya kutafsiri: kizuizi hiki
kilikubali zote, hakuna kilichozuia PR hizo, na kizuizi kinachozuia cha uwiano wa tafsiri halisi
kisha kikashindwa kwenye kilele cha toleo kwa kila mtu (pt-BR 3.2 % > 2.5 % + 0.5). Alama sasa huhukumiwa
kama tafsiri isiyokuwepo. Rekebisha hali nyekundu kwa
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, au
lugha zote sambamba kwa `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
salama ikiwa imetenganishwa, hukataa kuanza bila mazingira ya `OMNIROUTE_TRANSLATION_*`). Ufunguo ambao lazima ubaki
kwa Kiingereza (jina lisilobadilika la bidhaa/injini/bendera) unapaswa kuwekwa katika `scripts/i18n/untranslatable-keys.json`,
kamwe nyuma ya alama. `vi` hupiga marufuku alama kabisa (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — kizuizi cha majaribio yaliyowekwa kando

Faili iliyo katika orodha ya `exclude` ya `vitest.config.ts` ni jaribio ambalo haliendeshwi, na inaonekana kama
ufunikaji kwa yeyote anayesoma mti. Faili sitini na mbili zilikusanyika nyuma ya maoni
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Tatizo #8618 lilifungwa mnamo
2026-08-11 huku orodha iliyofuatiliwa nalo ikikua kutoka maingizo 45 hadi 62, kila jipya likirithi maoni
yanayoelekeza kwenye tatizo lililokufa. Hatimaye orodha ilipopimwa faili kwa faili (#13204), **faili 51 kati ya 62
zilifaulu dhidi ya mti wa sasa bila mabadiliko yoyote ya chanzo**.

Kizuizi kinahitaji kila hali ya kutengwa inayolingana na faili halisi (a) itaje tatizo la ufuatiliaji na
(b) ionekane katika `config/quality/vitest-exclusions.json` pamoja na hali yake iliyopimwa, ili kuongeza moja kuwe
diff inayoweza kukaguliwa katika faili maalum badala ya mstari mwingine mmoja katika safu yenye maingizo 60. Kwa makusudi,
hakiendeshi tena majaribio yaliyotengwa — hilo hugharimu ~dakika 10 na linapaswa kufanywa katika kazi ya mara kwa mara;
orodha hiyo hurekodi wakati kila moja lilipopimwa mara ya mwisho.
