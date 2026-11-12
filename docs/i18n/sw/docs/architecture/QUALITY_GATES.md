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

Kila risiti ya JSON inabainisha SHA iliyoangaliwa, mtiririko wa kazi na jaribio. CLI inakataa kutolingana kwa checkout/event SHA. Majaribio ya mtiririko wa kazi hufunga uanachama wa sera kwenye orodha ya `needs` ya kazi ya uamuzi ili njia mpya au iliyoondolewa haiwezi kutoweka kimya kimya. Stakabadhi hufunika mtiririko wao wa kazi, si uchapishaji, utumaji, au mambo ya ndani ya kichanganuzi kilichopo cha ushauri. Kufanya ukaguzi unaotumika unaohitajika katika sheria za tawi ni mabadiliko tofauti ya kiutawala; kufafanua kazi zao hakulindi tawi.

`API Route Typecheck` ni ukaguzi huru wa mtiririko wa kazi, nje ya uamuzi wa jumla na wasifu wa tuli wa mwangalizi wa karibu. Kagua matokeo yake kando kwa mgombea halisi. `.github/workflows/api-route-typecheck.yml` huendesha PRs hadi `main` au `release/**`, inasukuma kwa familia ya tawi, utumaji wa mikono, na matukio ya `merge_group` ya aina `checks_requested`. Haina kichujio cha njia. Unganisha vikundi angalia `merge_group.head_sha`; matukio mengine angalia `github.sha`. Matukio yote hutumia lango la uchunguzi API na vipimo vya kitengo cha lango. Walengwa wa msingi wa PR wanaomba hundi mpya; Uhariri wa body/title hutumia jina la uchunguzi pekee `Admission not requested / API Route Typecheck` na hauwezi kuchukua nafasi ya ukaguzi wa uandikishaji.

### Ushahidi uliohifadhiwa katika kipunguzaji cha ukubalifu

`scripts/quality/validate-release-acceptance.mjs` hupunguza mpango uliotolewa na manifest zake;
haithibitishi kuwa mpango huo unashughulikia pipeline kamili ya toleo. Ripoti zake huweka waziwazi
`releaseAcceptance: false`, hata wakati mpango huo ni
`VERIFIED`. Mtiririko wa kazi wa `release-acceptance.yml` bado hutumia fixture za kivuli, si
risiti halisi za build, package, boot au promotion.

CLI huhitaji `--evidence-root` ili kuthibitisha ushahidi uliohifadhiwa. Faili hutatuliwa
kama `<evidence-root>/<artifact_id>/<member>` na kupewa hash ya SHA-256. Rekodi ya PASS
isiyo na ushahidi, faili inayokosekana au iliyobadilishwa, njia isiyo salama au symlink huzuia
uthibitishaji. Faili zinazokosekana si sawa na logi tupu zilizofanikiwa. Ukaguzi uliopo
wa SHA/run/attempt hubaki huru: byte zinazolingana haziwezi kuokoa risiti iliyopitwa na wakati.
Uadilifu wa faili si uthibitisho wa uhalisi wa utekelezaji au promotion ya artifact.

### DAST hutumia build ya CI iliyothibitishwa

Kazi ya lazima ya CI `dast-smoke` huita `.github/workflows/dast-smoke.yml` baada ya `build`. Hufuata uteuzi uleule wa msimbo/rasimu kama build, pamoja na PR za fork zinazoungwa mkono, PR zinazolenga release na vikundi vya kuunganisha. Kazi ya DAST inayokosekana, kushindwa, kufutwa au kurukwa bila kutarajiwa huzuia `Gate / CI`. Mtiririko unaotumika tena hauna kichochezi huru cha PR/dispatch; uthibitishaji wa mkono hutumia dispatch ya CI ili build na mtumiaji wake zibaki katika utekelezaji mmoja.

`scripts/ci/next-build-provenance.mjs` hufunga artefakti kamili ya Next kwa hashi yake ya tar, hazina/tukio/utekelezaji, jaribio la mzalishaji, head/base/checkout/tree, vitambulisho vya mitiririko, lockfile, toleo sahihi la Node/ABI, jukwaa na bundler. DAST huchagua ID ya artefakti isiyobadilika kutoka `needs.build.outputs`, huhitaji uthibitishaji wa hashi ya upakuaji, na huhesabu hashi ya ZIP yenyewe kuilinganisha na hashi ya mzalishaji kabla ya kutoa vipengele viwili vilivyoruhusiwa kupitia `scripts/ci/unpack-ci-build.py`. Manifesti na kumbukumbu ya tar lazima pia zilingane na matokeo huru ya mzalishaji kabla ya kutoa mti wa Next. Haitafuti kamwe build ya mwisho iliyofaulu kwenye tawi. Utekelezaji wa kurudia sehemu unaweza kutumia jaribio lilelile la mzalishaji ikiwa ID na ingizo lote bado vinalingana; rekodi ya ushahidi huhifadhi majaribio yote mawili.

Mtumiaji hubaki kwenye runner ya Linux inayohostiwa, yenye ruhusa ya kusoma hazina tu na bila siri za hazina. Husakinisha toleo sahihi la Node la mzalishaji, kisha huunda CLI kwa `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` hukataa seva ya standalone inayokosekana kabla ya build yoyote ya akiba; build za kawaida za CLI za ndani huhifadhi njia yao ya akiba. Utayari wa seva, Schemathesis na promptfoo vyote lazima vifaulu ndani ya kikomo kisichobadilishwa cha dakika 25 cha kazi. Rekodi ya asili huthibitisha utambulisho na baiti za ingizo, si mafanikio ya uchanganuzi wa DAST. Kuisha kwa muda wa artefakti, kukatizwa kwa runner au kushindwa kwa skana hubaki ushahidi usiokamilika au ulioshindwa; kifungashio cha ushauri hakiwezi kuugeuza kuwa PASS.

### Uwezo wa utekelezaji wa UI

CI huendesha orodha kamili ya UI kama shard nne za matrix ya `test-vitest`, kila moja ikiwa na idadi isiyozidi
worker mbili kwa kila shard na kikomo cha muda kilichopo cha dakika 15 kwa kazi. Shard ya kwanza pia huendesha
suite ya Vitest ya MCP/autoCombo. Matokeo ya kazi ya lazima hushughulikia kila sehemu ya matrix; kushindwa
au kughairiwa kwa shard moja hakuwezi kuthibitisha uidhinishaji wa mgombea.

Observer ya kila usiku huhifadhi risiti tofauti inayohusishwa na mgombea huyo huyo (exact-candidate) kwa kila shard ya UI,
ikiwemo utekelezaji wa MCP katika risiti ya kwanza. Risiti zote nne, logi na vitambulisho vya utekelezaji
vinavyolingana vinahitajika. `npm run test:vitest:ui` ya ndani bado huchagua
suite kamili; utekelezaji mmoja wa `--shard` ni ushahidi wa sehemu tu.

### Ukusanyaji wa coverage ya unit

Shard kumi na mbili za unit hukusanya coverage ya V8 wakati wa utekelezaji wao uliopo wa majaribio. Shard
iliyofanikiwa huendesha `scripts/ci/compact-v8-coverage.mjs` ili kubana faili asili bila kuzalisha
ripoti ya kati ya Istanbul. Kazi ya mwisho ya Coverage huthibitisha manifest zote kumi na mbili dhidi
ya SHA ya mgombea, runtime, mzizi wa source na hash za data, kisha huendesha reporter za c8 na vizingiti
vilivyopo vya coverage. Input huhifadhi mpangilio wa kimataifa wa majina ya faili wa c8; kuunganisha mapema
kwa kila shard si salama kwa coverage mchanganyiko ya function/block. Shard zinazokosekana, zenye muundo mbovu
au zisizooana husababisha uidhinishaji kushindwa. Shard za majaribio zilizoshindwa huhifadhi coverage ghafi
ya uchunguzi kando; haiwezi kuingia katika muunganisho wa mwisho.

### Risiti za maendeleo ya utekelezaji wa majaribio ya kitengo

Amri ya pamoja ya `test:unit:ci:shard` hurekodi awamu za `primary`, `dashboard` na `serial`
kupitia `scripts/ci/unit-progress-reporter.mjs`. Ripoti ya kawaida ya majaribio bado
inapatikana. Risiti tofauti yenye metadata pekee hurekodi kuanza na kukamilika kwa kila faili,
na mapigo ya moyo ya kila sekunde 30 huorodhesha faili ambazo bado zinaendelea pamoja na muda
uliopita. Hurekodi metadata ya utekelezaji iliyo kwenye orodha ya ruhusa pekee; maelezo ya
majaribio, matokeo, maudhui ya hitilafu na mazingira kamili hayahifadhiwi katika muundo wa mfululizo.

CI huhifadhi faili za JSONL kama `unit-progress-ci-<run>-<attempt>-<shard>`. Kuisha kwa muda wa kazi kunaweza kuzuia
upakiaji unaofuata; mapigo ya moyo ambayo tayari yametolewa hubaki kuwa ushahidi wa uchunguzi.
Kutokuwepo kwa mapigo ya moyo kunaweza pia kuashiria mchakato wa runner uliozuiwa au kusitishwa.
Risiti hizi huhifadhi uteuzi uliopo wa majaribio, utekelezaji sawia, makataa na hali ya kuondoka;
si maamuzi ya kuidhinisha vipengee vinavyopendekezwa.

### Orodha ya scan tuli

Orodha yenye matoleo ya alias za npm na uanachama wa static-scan zipo katika
`config/quality/gate-manifest.json`. Endesha `npm run check:gate-manifest` ili kuthibitisha
majina ya script na command halisi dhidi ya `package.json`; nyongeza, uondoaji na
mkengeuko wa command husababisha hook ya ndani na kazi za uainishaji wa mabadiliko katika CI kushindwa.
Alias si kazi ya mtiririko wa kazi, instance ya matrix au test case: idadi hizi
hazipaswi kuwasilishwa kama zinazoweza kubadilishana.

Tumia `npm run quality:scan -- --list` au `npm run quality:scan:fast -- --list`
kukagua alias zilizochaguliwa bila kuzitekeleza. Runner huanzisha
entrypoint ya npm, kwa hiyo runtime yake (ikiwemo Bun pale iliposanidiwa) huhifadhiwa.
Manifest hurekodi alias zilizo nje ya wasifu huo kama zinazoanzishwa kando, na
command za matengenezo zimepigwa marufuku katika wasifu wa scan wa kusoma pekee.

Wasifu huu hushughulikia static scan pekee. Haithibitishi majaribio ya bidhaa,
coverage, packaging, ukaguzi wa nje au ukubalifu kamili wa toleo la mgombea.
Uidhinishaji wa mtiririko wa kazi hutumia `config/quality/admission-policy.json` iliyounganishwa na
`scripts/quality/admission-verdict.mjs`. Wasifu wa release-observer hubaki tofauti;
kagua ukaguzi na risiti zake zinazotumika kwa kujitegemea. Command tuli za observer kamili
zinatangazwa katika `config/quality/release-green-static-profile.json`, zikiwemo
`audit:deps`, uteuzi wa mutation-test na ukaguzi wa tafsiri. Loader huthibitisha command za npm
dhidi ya package.json na matamko yaliyoundwa ya CI/Quality; hukataa mkengeuko
badala ya kutekeleza tokeni za shell kama hoja. Output ya SKIP/INCOMPLETE kutoka kwa scanner inayohitajika
haiwezi kuthibitisha PASS. Wasifu hurekodi vizuizi vyake vya nje na hauchukui nafasi ya
coverage ya hosted, matrix za majaribio, ushahidi wa package au deployment. Orodha ya maelezo iliyo hapa chini
ni rejeleo, si uthibitisho kwamba gate ilitekelezwa kweli.

Script zipo chini ya `scripts/check/` (gate za sera) na `scripts/quality/` (injini ya ratchet).
Chanzo cha ukweli cha CI ni `.github/workflows/ci.yml`.

### Afya ya hati iliyochapishwa

`.github/workflows/i18n-base-health.yml` inachunguza afya ya uhifadhi baada ya misukumo iliyochaguliwa kwenda `main` na `release/v*`, na kwa utumaji wa mikono. Vichujio vyake hufunika hati, mzizi Markdown, `llm.txt`, tafsiri state/configuration na zana husika ya i18n. Kazi moja `Published base documentation health` hutumia Ubuntu mwenyeji na tarehe ya mwisho ya dakika tano. Hufanya uthibitishaji wa kusoma pekee na huandika risiti ya uchunguzi bila usakinishaji wa utegemezi, tafsiri au kupitishwa kwa serikali.

`scripts/i18n/check-base-health.mjs` inahitaji zero source-heshi, kukosa-lengwa, lengwa-heshi, tafsiri-stale na kutofautiana kwa akiba ya sehemu. Pia inathibitisha upeo wa sasa wa msingi document/locale na asili yake iliyorekodiwa. Muktadha batili, chanjo isiyokamilika au kikagua kilichoingiliwa hutoa `INCOMPLETE`; alithibitisha drift inazalisha `FAIL`. Zote mbili hurejesha hali ya kuondoka isiyofanikiwa. Stakabadhi italazimika kulipa SHA, mtiririko wa kazi, endesha na kujaribu, na huhifadhiwa kama `i18n-base-health-<sha>-<run>-<attempt>`.

Huu ni uchunguzi huru wa msingi uliochapishwa. Haiongezi tukio la PR au unganisha kikundi, cheki cha PR kinachohitajika, lakabu ya npm au mwanachama wa wasifu wa skanning tuli. Kikagua msingi pia huzuia madarasa yote matano katika hali kamili. Maandalizi ya kawaida PR yanabaki tofauti na kiingilio. Upakiaji uliofaulu hauwezi kugeuza matokeo ya afya ambayo hayakufaulu kuwa PASS.

PR ya kawaida hutumia `--preflight` yenye ripoti ya msingi iliyotolewa na `--baseline-evidence`. Inaweza kuacha chanzo cha Kiingereza kikisubiri tu wakati rekodi kamili ya tafsiri na baiti halisi lengwa hazijabadilishwa kutoka msingi huo. Lengo jipya au kutolingana kwa akiba ya sehemu bado kunazuia, na ushahidi usio kamili hauwezi kuidhinisha maandalizi. Ripoti inafichua `preparationPending` na `mergeReady` tofauti: utayarishaji uliofaulu haufanyi tafsiri zinazosubiri kuwa tayari kuunganishwa. Onyesha upya vioo vilivyoathiriwa katika mgombea aliyetungwa kabla ya kuandikishwa. Mgombea anayeaminika wa foleni ya Mergify, `merge_group`, misukumo ya tawi na uendeshaji wa mwongozo CI hutumia kikagua kabisa, bila `--warn` au msamaha wa kurithi wa kutofaulu. Ukosefu wa heshi lengwa na upeo uliopunguzwa na faili za msingi zilizorekodiwa hauwezi kutoa uamuzi kamili.

### Toa njia ya haraka PR (`quality.yml`)

`.github/workflows/quality.yml` inakamilisha CI kwenye main/release PRs, inasukuma hadi `main`, kutuma na kuunganisha vikundi. PRs tumia ukaguzi wa haraka uliochujwa. Muundo wa nakala uliozimwa kabisa uliondolewa; ukaguzi halisi build/package/boot unabaki katika CI.

| Kazi                                             | Upeo                                                                                                                                                                                                                        | Kuzuia              |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API refs na hati-zote                                                                                                                                                                                        | Ndiyo               |
| `Fast Quality Gates`                             | Kanuni PRs; ukaguzi tuli, angalia aina, ukaguzi wa aina ya dashibodi, majaribio ya vitengo vilivyoathiriwa                                                                                                                  | Ndiyo               |
| `Forgotten sibling tests`                        | Kanuni PRs; moduli zilizobadilishwa zilizofuatiliwa kwa watumiaji tuli na majaribio ya ndugu wa mgombea; mapipa na njia za kuingiza-nguvu zinaripotiwa kama uchunguzi wa ushauri, isipokuwa orodha ya ruhusa iliyorejelewa. | **Ushauri**         |
| `No new ESLint warnings`                         | Kanuni PRs; suptions-aware pamba ulinzi                                                                                                                                                                                     | Ndio, pamoja na uma |
| `Merge integrity (changelog + generated skills)` | PRs zisizo na rasimu; changelog na upatanishi wa ujuzi unaozalishwa                                                                                                                                                         | Ndio, pamoja na uma |

#### Ripoti ya majaribio ya ndugu waliosahau

`npm run check:forgotten-sibling-tests` hutumia tena kisuluhishi cha uingizaji nyuma ya ramani ya athari ya majaribio. Kwa kila sehemu ya uzalishaji iliyobadilishwa, huripoti misururu ya kubainisha `changed module/symbol -> static consumer -> candidate sibling test` wakati jaribio la mtahiniwa halipo kwenye tofauti ya ombi la kuvuta. Muhtasari wa Markdown na matokeo ya JSON huhifadhiwa kama vizalia vya utendakazi `forgotten-sibling-tests` kwa ajili ya kurekebishwa kabla ya uchapishaji wowote wa kuzuia.

Usafirishaji upya wa mapipa na uagizaji dhabiti ni uchunguzi wa azimio pekee; kamwe hazitengenezi ugunduzi wa kuzuia. Vighairi vilivyokaguliwa vinaishi katika `config/quality/forgotten-sibling-allowlist.json`. Kila ingizo lazima lipe jina la mtumiaji na jaribio la mgombea, litoe sababu mahususi, na liunganishe suala la GitHub au ombi la kuvuta. Maingizo yenye hitilafu yameshindwa kufungwa. Vighairi haviwezi kukandamiza jaribio la mtahiniwa lililofutwa au tofauti inayoongeza `.skip`/`.todo`; madai kudhoofika na masking nyingine kubaki inamilikiwa na kujitegemea kuzuia mlango `check:test-masking`.

### Job: `lint`

Huendeshwa kwenye kila PR kwenda `main`. Huzuia uunganishaji inaposhindwa.

| Hati (`npm run ...`)              | Huthibitisha                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Inazuia                                 |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | Toleo la Node.js liko ndani ya masafa yanayotumika                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ndiyo                                   |
| `check:cycles`                    | Uingizaji wa mzunguko katika `src/` + `open-sse/` yote (unategemea AST, `paths` za tsconfig zimetatuliwa). Hali ya kawaida hutoka kwa msimbo 1 wakati wowote ambapo kuna mzunguko wowote (hufeli kwa usalama tangu #15281) na huorodhesha SCC. `check:cycles:ratchet` (ambayo CI huendesha) huzuia wakati idadi inapozidi kiwango cha juu cha `metrics.cycles` katika `quality-baseline.json` — kwa sasa ni 14, `direction: down`, kwa hivyo inaweza kupungua pekee (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ndiyo (ratchet)                         |
| `check:boundary`                  | Muunganisho wa `open-sse → src`: uingizaji wa kipekee kutoka faili hadi faili kutoka kwenye injini kwenda kwenye programu (`scripts/quality/measure-boundary.mjs`; orodha ya miunganiko ni orodha ya kazi zinazodai urekebishaji wa mgawanyo wa msingi/moduli wa v4). Hali ya kawaida = ripoti ya ushauri (sawa na `quality:boundary`). `check:boundary:ratchet` (ambayo CI huendesha, pia katika mzunguko wa ratchet wa vizuizi vya haraka vya `quality.yml`) huzuia wakati idadi inapozidi kiwango cha juu cha `metrics.boundaryOpenSseToSrc` katika `quality-baseline.json` — kilianzishwa kwa kipimo cha 771, `direction: down`; `--update` hukipunguza pekee; huhusishwa na msingi kwenye PR (`--base-ref`, tazama hapa chini)                                                                                                                                                                                                                                                                                                                                     | Ndiyo (ratchet)                         |
| `check:route-validation:t06`      | Skima za Zod zipo kwenye njia zote (sera ya Daraja la 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ndiyo                                   |
| `check:any-budget:t11`            | Idadi ya `@ts-expect-error // any` haizidi kiwango kilichotengwa (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ndiyo                                   |
| `check:provider-consistency`      | Kila mtoa huduma katika `providers.ts` ana ingizo linalolingana katika `providerRegistry.ts` (na kinyume chake, ndani ya orodha inayoruhusiwa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ndiyo                                   |
| `check:model-lifecycle`           | Majedwali matatu ya uelekezaji yanayotunzwa mwenyewe yanaendelea kuwiana na muhtasari wa mzunguko wa maisha uliohifadhiwa (#11503): `FITNESS_TABLE` (`taskFitness.ts`) haitoi alama kwa kitambulisho chochote kilichostaafishwa ambacho `REGISTRY` inaweza kuelekeza; kila lengwa la `BUILT_IN_ALIASES` lipo katika `REGISTRY` na halipo katika muhtasari wa vitambulisho vilivyostaafishwa; kila kitambulisho kilichostaafishwa ambacho bado kipo katika `REGISTRY` kinaelekezwa kwingine au kimeorodheshwa katika `allowedRetiredInCatalog`; na hakuna chanzo au lengwa la `DEFAULT_DEGRADATION_MAP` linaloonekana kuwa limestaafishwa katika muhtasari huo. Hii haithibitishi kwamba modeli inahudumiwa kwa sasa na chanzo hai cha juu. Nje ya mtandao — hulinganisha dhidi ya `config/quality/model-lifecycle.json`, inayosasishwa mwenyewe kwa kutumia `npm run quality:refresh-model-lifecycle` (mtandao; haijaunganishwa kwenye CI). `allowedRetiredInCatalog` ni utaratibu wa kupunguza idadi hatua kwa hatua: ongeza ingizo tu likiwa na suala la ufuatiliaji. | Ndiyo                                   |
| `check:fetch-targets`             | Kila `fetch("/api/...")` katika `src/` ya upande wa mteja huelekezwa kwenye `route.ts` halisi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ndiyo                                   |
| `check:deps`                      | Vitegemezi vyote vinavyoweza kusakinishwa kwa `npm install` katika kila `package.json` ndani ya hazina vipo katika `dependency-allowlist.json`; vifurushi vipya visivyofungwa kwenye toleo maalum au vilivyoathiriwa na slopsquatting huwekewa alama                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ndiyo                                   |
| `audit:deps`                      | Ukaguzi wa npm wa faili zote tano huru za kufunga matoleo (mzizi, Electron, programu-jalizi za OpenCode v1/v2 na mtoa huduma). Tahadhari muhimu huzuia; tahadhari za kiwango cha juu huendelea kuonekana kama maonyo. Ukaguzi unaokosekana/ulioshindwa hupewa hali ya INCOMPLETE na huzuia; hashes za faili za kufunga matoleo na ripoti za kila wigo huhifadhiwa.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ndiyo                                   |
| `check:lockfile`                  | Uadilifu wa `package-lock.json` — sajili ya https, hashi za uadilifu, hakuna ubatilishaji wa seva pangishi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ndiyo                                   |
| `check:licenses`                  | Orodha ya leseni za SPDX zinazoruhusiwa kwa vitegemezi vya uzalishaji                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ndiyo                                   |
| `check:tracked-artifacts`         | Hakuna mabaki ya ujenzi / viungo vya kiishara vya `node_modules` vilivyowekwa kwenye hazina (pia huendeshwa katika husky pre-commit; pre-push imefanywa nyepesi kimakusudi — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ndiyo                                   |
| `check:ai-attribution`            | Hakuna trela ya AI/boti ya `Co-Authored-By` wala kijachini cha uzalishaji wa AI katika commit, kichwa au maudhui ya PR — Kanuni Ngumu #16 (katika kitanzi cha ukaguzi wa haraka cha `quality.yml` kwa PR→`release/**` — husoma data ya tukio, hakifanyi chochote nje ya PR — na hatua ya PR pekee katika ukaguzi wa lint wa `ci.yml` kwa PR→`main`; pia hook ya husky ya `commit-msg`; waandishi wenza binadamu wanaruhusiwa; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:vitest-exclusions`         | Kila uondoaji wa Vitest hutaja suala la ufuatiliaji na huonekana katika `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ndiyo                                   |
| `check:file-size`                 | Faili za msimbo chanzo (`.ts`/`.tsx` katika `src/`, `open-sse/`, `electron/`, `bin/`) zibaki ndani ya `cap` na faili za majaribio (`*.test.ts(x)`) ndani ya `testCap`; faili zilizofungiwa katika `file-size-baseline.json` (`frozen` / `testFrozen`) hazipaswi kukua na kuvuka ukubwa wake uliorekodiwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ndiyo                                   |
| `check:error-helper`              | Majibu ya hitilafu katika vitekelezaji/vishughulikiaji hutumia `buildErrorBody()` / `sanitizeErrorMessage()` (Kanuni Ngumu #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ndiyo                                   |
| `check:migration-numbering`       | Faili za SQL za uhamishaji zimepewa nambari kwa mfuatano, bila mapengo au nambari zinazojirudia                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ndiyo                                   |
| `check:public-creds`              | Hakuna thamani halisi za OAuth `client_id`/`client_secret` au funguo za Firebase Web nje ya `publicCreds.ts` (Kanuni Ngumu #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ndiyo                                   |
| `check:db-rules`                  | Hakuna SQL ghafi nje ya moduli za `src/lib/db/`; hakuna uingizaji wa pamoja kutoka `localDb.ts` (Kanuni Ngumu #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ndiyo                                   |
| `check:known-symbols`             | Vitekelezaji vya watoa huduma, mikakati ya uelekezaji, na vitafsiri vilivyosajiliwa katika majedwali yao ya usambazaji vinalingana na faili zilizopo kwenye diski—hakuna alama zilizoachwa bila kutumika au ambazo hazijatangazwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ndiyo                                   |
| `check:route-guard-membership`    | Kila njia inayoanzisha mchakato mtoto imeainishwa na `isLocalOnlyPath()` (Kanuni Ngumu #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ndiyo                                   |
| `check:test-discovery`            | Kila faili la `*.test.ts` / `*.spec.ts` katika repo hukusanywa na angalau kiendesha majaribio kimoja (ratchet: orodha ya faili yatima katika `test-discovery-baseline.json` inaweza kupungua pekee)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ndiyo                                   |
| `check:test-tla-order`            | Hakuna faili la `node:test` chini ya `tests/unit` linalosajili jaribio, kufikia `await` ya kiwango cha juu, kisha kusajili mengine (#18045; ratchet: `test-tla-order-allowlist.json` inaweza kupungua pekee)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ndiyo                                   |
| `check:agent-skills-sync`         | Vipengee vya agent-skills vilivyozalishwa vinalingana na katalogi yao chanzo (hakuna tofauti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:provider-asset-provenance` | Nembo/vipengee vya watoa huduma vina ingizo la asili lililorekodiwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `lint:json`                       | Faili za usanidi za JSON huchanganuliwa na kutimiza kanuni za lint za repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `typecheck:core`                  | Ukusanyaji wa TypeScript bila hitilafu (maonyo ya ushauri pekee)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ndiyo                                   |
| `typecheck:noimplicit:core`       | `noImplicitAny` kali — inayolenga siku zijazo; maeneo mengi ya matumizi yaliyokuwepo awali bado yanahitaji maelezo ya aina                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **Ushauri** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` iliyowekewa mawanda ya `src/app/(dashboard)/**` (#7033) — orodha iliyoruhusiwa ya faili 27 iliyoteuliwa ya `typecheck:core` haijumuishi TSX yoyote ya dashibodi, na `next build` pia haikagui aina zake kamwe (`next.config.mjs` huweka `ignoreBuildErrors: true`), kwa hivyo hitilafu za utambulishi yatima huko (#6625/#6909) hazikuonekana na CI. Hulinganisha tofauti dhidi ya msingi uliogandishwa wa idadi kwa kila faili/kwa kila msimbo wa TS (`config/quality/dashboard-typecheck-baseline.json`, muundo uleule wa utekelezaji dhidi ya uchakavu kama `check:known-symbols`) — ni hitilafu MPYA pekee zinazozidi idadi iliyowekwa kwenye msingi ndizo zinazosababisha kizuizi kishindwe; punguza msingi hatua kwa hatua ukitumia `--update` wakati hitilafu iliyokuwepo awali inaporekebishwa.                                                                                                                                                                                                                                                           | Ndiyo                                   |
| `check:build-typecheck`           | Ukaguzi wa aina wa uzalishaji wa programu nzima kupitia `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), ambao haujashughulikiwi na orodha ya faili 27 ya `typecheck:core` wala lango la dashboard. Tofauti hukaguliwa dhidi ya `config/quality/build-typecheck-baseline.json`; idadi mpya au iliyoongezeka kwa kila jozi ya (faili, kodi) husababisha kushindwa, huku idadi iliyopungua ikikuomba upunguze kiwango. `--update` hukataa wakati utekelezaji una jozi mpya au iliyoongezeka isipokuwa `--force-regressions` itumike, na hukataa faili iliyonyamazishwa upya isipokuwa `--force-nocheck` itumike, hivyo kupanua msingi ili kupata mafanikio na kutoa ukimya wa kudumu ni vitendo viwili tofauti vinavyokusudiwa. `--force` pekee hukataliwa. Pia hukagua `@ts-nocheck` katika eneo la ujenzi dhidi ya `config/quality/ts-nocheck-baseline.json`, kwa sababu faili inayotumia hiyo hairipoti uchunguzi wowote kabisa na vinginevyo isingeonekana na lango lolote.                                             | Ndiyo                                   |

#### Programu mbili za ukaguzi wa aina hujibu kwa njia tofauti

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) na `check:build-typecheck` hukusanya programu tofauti kwa chaguo
tofauti, na faili lilelile linaweza kuwa safi katika moja na kujawa na hitilafu katika nyingine.

`tsconfig.build.json` huweka `"strict": false`, kwa hiyo `noImplicitAny` imezimwa. Mipangilio
ya msingi hukusanya orodha ya faili 27 iliyoratibiwa kwa chaguo kali zaidi na kufuata
grafu ya uagizaji ya kila ingizo, hivyo faili ambazo hazijawahi kuonekana katika programu
ya ujenzi bado hukaguliwa humo.

Matokeo yake ni muhimu unapohukumu ikiwa faili imewekewa aina: **sifuri ya uchunguzi
chini ya `check:build-typecheck` haimaanishi sifuri**. Kuondoa `@ts-nocheck` kutoka faili 26
kulionyesha kuwa 23 kati yazo zilikuwa safi katika programu ya ujenzi; kumi na sita kati
ya hizo zilionyesha takriban hitilafu 120 za `implicit-any` katika programu kali. Kagua zote
mbili kabla ya kusema kuwa faili ni safi.

### Kazi: `quality-gate`

Huendeshwa baada ya `test-coverage`. Huzuia uunganishaji ikishindwa.

| Skripti                      | Huthibitisha                                                                                                                                                                     | Inazuia                  |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | Hutoa `quality-metrics.json` (idadi ya maonyo ya ESLint, ufunikaji kutoka kwenye ripoti iliyounganishwa ya sehemu)                                                               | Ndiyo (kabla ya ratchet) |
| `quality:ratchet`            | Kila kipimo katika `quality-baseline.json` hakijarudi nyuma (maonyo ya ESLint ≤ msingi; ufunikaji ≥ msingi)                                                                      | Ndiyo                    |
| `check:duplication`          | Urudiaji wa msimbo (jscpd@4) hauzidi msingi katika `quality-baseline.json`                                                                                                       | Ndiyo                    |
| `check:complexity`           | Utata wa kisiklomati katika kiwango cha faili hauzidi kikomo (`complexity` ya msingi ya ESLint + `max-lines-per-function`)                                                       | Ndiyo                    |
| `check:cognitive-complexity` | Ratchet ya utata wa kiutambuzi (`eslint-plugin-sonarjs`) — utekelezaji tofauti wa ESLint; CI huendesha zote zikiwa zimeunganishwa kama hatua moja ya `check:complexity-ratchets` | Ndiyo                    |
| `check:dead-code`            | Ratchet ya faili / uhamishaji usiotumika (knip) hairudi nyuma ikilinganishwa na msingi                                                                                           | Ndiyo                    |
| `check:compression-budget`   | Bajeti ya kipimo cha utendaji wa ubanaji — viwango vya chini vya uokoaji wa tokeni kwa kila injini havipaswi kurudi nyuma                                                        | Ndiyo                    |
| `check:type-coverage`        | Ratchet ya asilimia ya msimbo wenye aina (`type-coverage`) hairudi nyuma; kwa kiasi kikubwa hujumuisha `typecheck:noimplicit:core`                                               | Ndiyo                    |

### Kazi: `codeql-scan` na `codeql-admission`

`codeql-scan` hutoa kategoria zote za uchanganuzi zilizosanidiwa. Kazi hiyo ikifaulu, `codeql-admission` huthibitisha upakiaji wake halisi na kikomo kisichoruhusu ongezeko la tahadhari za mgombea. Zote ni vitegemezi vya lazima vya `Gate / CI`, hata kwa wagombea wanaobadili nyaraka pekee. Masharti ya uanzishaji wa kiutawala na canary yameelezwa chini ya "Kikomo cha CodeQL" hapa chini.

| Skripti                | Inathibitisha                                                                                                                                                                                                 | Inazuia |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:codeql-ratchet` | Ref/SHA ya mgombea na kategoria zote zilizosanidiwa lazima ziwe za sasa kabla ya kupima kikomo cha tahadhari; ukosefu wa ushahidi huzuia. Orodha ya jumla hubaki tofauti — ona "Kikomo cha CodeQL" hapa chini | Ndiyo   |

### Kazi: `quality-extended`

Kazi hii huzuia waombaji wanaohusika. Ukubwa wa kifurushi, ugunduzi wa siri, ugunduzi wa udhaifu,
ugunduzi wa mtiririko wa kazi na mabadiliko ya OpenAPI hukaguliwa kwa kutumia ratchet zinazohitajika.
Uchunguzi wa utegemezi wa mzunguko unabaki kuwa wa ushauri. Usakinishaji wa vichanganuzi unahitajika:
`scripts/ci/install-quality-scanners.sh` huandaa matoleo yaliyobandikwa na kueneza
hitilafu za usakinishaji. Zana zinazokosekana, ripoti batili au misingi inayokosekana huacha
kizuizi kinachohitajika cha kichanganuzi katika hali ya INCOMPLETE.

| Skripti                  | Huthibitisha                                                                                                                                                                                                                              | Uzuiaji                                                  |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `check:circular-deps`    | Hakuna vitegemezi vinavyozungukana (dpdm)                                                                                                                                                                                                 | **Ushauri**                                              |
| `check:bundle-size`      | Ukubwa wa bundle hauzidi kikomo; kutopatikana kwa kipimo husababisha kushindwa                                                                                                                                                            | **Huzuia ikiwa na --ratchet**                            |
| `check:secrets`          | Matokeo ya Gitleaks hayarudi nyuma; skani zinazohitajika hukataa zana/chanzo/baseline inayokosekana, skani zilizoshindwa na ripoti batili                                                                                                 | **Huzuia ikiwa na --ratchet**                            |
| `check:vuln-ratchet`     | Udhaifu wa vitegemezi haurudi nyuma; skani zinazohitajika hukataa zana zinazokosekana, ripoti batili au baseline zinazokosekana                                                                                                           | **Huzuia ikiwa na --ratchet**                            |
| `check:workflows`        | Ukaguzi wa workflow (actionlint + zizmor); skana zinazokosekana/mbovu, ripoti batili au ratchet baseline inayokosekana hushindwa kama INCOMPLETE. Matokeo halali hufuata sera iliyochaguliwa ya strict/advisory/ratchet                   | Utekelezaji unahitajika; zizmor ratchet huzuia katika CI |
| `check:openapi-breaking` | Mkataba wa API ya umma dhidi ya commit za tukio zilizobandikwa (merge-base ya PR, hali ya kabla ya push, base ya merge-group; checkout iliyoratibiwa/ya mikono ya mzazi wa kwanza); kipimo kinachohitajika hushindwa kwa hali iliyofungwa | **Huzuia ikiwa na --ratchet**                            |

### Kazi: `docs-sync-strict`

Kwa maombi ya kuvuta kwa `main` au `release/**`, kazi hii inatumika kwa watahiniwa wasio wa rasimu (au foleni inayoaminika) walioainishwa kama hati au mabadiliko ya msimbo. Pia inaendesha matukio yasiyo ya PR CI ; kichochezi cha mtiririko wa kazi hii kinashughulikia `main` pekee, sio `release/**`. Hatua inayotoka isiyo ya sifuri huzuia kazi; matokeo ya ripoti pekee na misamaha iliyoandikwa hapa chini haifanyi hivyo.

| Skripti                        | Huthibitisha                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Uzuiaji                                                                                                                                                          |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Lango kuu linaloendesha malango madogo 7 yaliyo hapa chini kwa mfuatano                                                                                                                                                                                                                                                                                                                                                                                               | Ndiyo                                                                                                                                                            |
| ↳ `check:docs-sync`            | Uthabiti wa toleo la Package/OpenAPI/CHANGELOG, vioo kamili `llm.txt`, vibadilishi vya CHANGELOG section/size vilivyotafsiriwa, na kutokuwepo kwa nakala rudufu za hati.                                                                                                                                                                                                                                                                                              | Ndiyo                                                                                                                                                            |
| ↳ `check:docs-frontmatter`     | Kurasa zilizokusanywa za hati huwa na mada halali ya mada ya mbele                                                                                                                                                                                                                                                                                                                                                                                                    | Ndiyo                                                                                                                                                            |
| ↳ `check:docs-counts`          | Vigezo vya hesabu ya juu-kujiamini ni kali; ukaguzi wa kuhesabu faili unaonya tu isipokuwa hati itapokea `--strict` (lango la meta CI haliipiti)                                                                                                                                                                                                                                                                                                                      | Uzuiaji mkali wa tier; ushauri wa ngazi laini                                                                                                                    |
| ↳ `check:env-doc-sync`         | Chanzo env kinasoma, `.env.example`, na `docs/reference/ENVIRONMENT.md` wanakubali baada ya orodha za wazi za kupuuza, hati pekee na za env pekee                                                                                                                                                                                                                                                                                                                     | Ndiyo, nje ya orodha za ruhusa zilizorekodiwa                                                                                                                    |
| ↳ `check:deprecated-versions`  | Huripoti matoleo yanayoweza kuwa ya zamani nje ya miktadha salama ya kihistoria na tarehe za kusasisha zilizopitwa na wakati, bila kujumuisha hati zilizopuuzwa                                                                                                                                                                                                                                                                                                       | Ushauri katika wiring wa sasa CI (`--strict` haijapitishwa)                                                                                                      |
| ↳ `check:doc-links`            | Viungo vya alama za ndani katika hati huamua faili halisi ( fomu ya `[text]`/`(path)` )                                                                                                                                                                                                                                                                                                                                                                               | Ndiyo                                                                                                                                                            |
| ↳ `check:fabricated-docs`      | Njia, env vars, amri za CLI, majina ya ndoano, na njia za faili zilizotajwa katika hati zipo kwenye msingi wa msimbo. Lango gumu kupitia `--strict`; laini-kushindwa bila bendera.                                                                                                                                                                                                                                                                                    | Ndio (kupitia `--strict` katika CI)                                                                                                                              |
| `check:cli-i18n`               | Funguo za `t()` zinazotumiwa na CLI zipo katika `en`; `pt-BR` huhifadhi kila sehemu ya ngazi ya juu; `zh-CN` na `zh-TW` zina kila ufunguo kutoka `en`                                                                                                                                                                                                                                                                                                                 | Ndiyo                                                                                                                                                            |
| `check:openapi-coverage`       | Uainishaji wa OpenAPI unajumuisha angalau kiwango cha chini kilichowekwa kwa ratchet cha routes halisi                                                                                                                                                                                                                                                                                                                                                                | Ndiyo                                                                                                                                                            |
| `check:openapi-security-tiers` | Maelezo yaliyotangazwa ya `x-loopback-only`/`x-always-protected` lazima yaungwe mkono na `routeGuard.ts`; makosa ya kichanganuzi na kutolingana katika ukaguzi wa mbele huzuia. Ukaguzi wa kinyume wa `x-loopback-only` inayokosekana chini ya viambishi awali vya ufikiaji wa ndani pekee hutoa maonyo, na routes zinazofafanuliwa kwa muundo pekee hazijumuishwi katika ukaguzi huo wa kinyume.                                                                     | Ukaguzi wa kichanganuzi na wa mbele huzuia; ukaguzi wa kinyume ni wa ushauri                                                                                     |
| `check:openapi-routes`         | Kila njia `/api...` katika `openapi.yaml` hulingana na route halisi bila kutegemea tofauti za vigezo baada ya kutumia orodha ya misamaha yenye sababu `KNOWN_STALE_SPEC`; vipengee vya zamani kwenye orodha hiyo pia husababisha kushindwa                                                                                                                                                                                                                            | Ndiyo                                                                                                                                                            |
| `check:docs-symbols`           | Marejeleo ya URL za ndani `/api/...` katika nyaraka kuu ambazo si nakala za kioo hulingana na route halisi au familia ya routes; marejeleo ya proxy/upstream/kishikilia nafasi/faili na vipengee vyenye sababu vya `KNOWN_STALE_DOC_REFS` hayajumuishwi, na vipengee vya zamani kwenye orodha ya misamaha husababisha kushindwa                                                                                                                                       | Ndiyo                                                                                                                                                            |
| `i18n translation drift`       | Kukubalika kabisa kunahitaji chanzo sifuri, lengwa lisilopo, lengwa-heshi, tafsiri ya zamani na kutofautiana kwa akiba ya sehemu. Maandalizi ya kawaida PR yanaweza kuhifadhi ushahidi kamili wa kurithi au mabadiliko yanayosubiri ya Kiingereza pekee na hali kamili isiyobadilika na baiti lengwa; ripoti yake tofauti inatangaza utayari wa kuunganisha. Ukosefu wa heshi lengwa na kizuizi cha msingi cha ushahidi usio kamili. Akiba ya sehemu ya urithi haipo. | Madarasa yote matano yanazuia uandikishaji queue/base ; vibali vya maandalizi ya kawaida tu vilivyothibitishwa kurithiwa au kazi inayosubiri ya Kiingereza pekee |

README SVGs kumi na mbili chini ya `docs/diagrams/` zinazalishwa (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` inazitengeneza upya zote). Kila moja ina jaribio la kitengo cha kulinganisha baiti (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) ambalo halifaulu wakati faili iliyotumwa imechakaa, na `check:docs-counts` husoma nambari za kisheria kutoka kwa nodi zao za `<text>` — ndiyo maana hatua ya kubainisha huweka kila mfuatano ulioainishwa kwenye faili kama `<text>` isiyoonekana. Ukaguzi wa nambari za kanuni SVG husoma faili zilizoorodheshwa katika `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, pamoja na `public/images/tier-flow-dark.svg` na `tier-flow-light.svg`; madai ya bure-forever, catalog-entry, pool-recurring-pool na mambo ya bao pia yanasoma `promise-pillars.svg`, `free-tier-budget.svg` na `strategies-grid.svg`. `free-tier-budget.svg` huchota takwimu zake kutoka kwa kipakiaji cha orodha cha moja kwa moja, kwa hivyo mabadiliko hadi `FREE_MODEL_BUDGETS` au kwa jina la mtoa huduma linaonyesha rangi nyekundu CI hadi faili hiyo itengenezwe upya.

### Job: `i18n-ui-coverage`

| Skripti                                   | Huthibitisha                                                                                                                                                                                                                     | Inazuia     |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (ndani ya faili) | Ufunikaji wa vitufe vya i18n vya UI ni ≥ 65%                                                                                                                                                                                     | Ndiyo       |
| `check-ui-value-drift` (ndani ya faili)   | **Thamani** ya Kiingereza iliyoandikwa upya haiachi tafsiri yoyote iliyopitwa na wakati                                                                                                                                          | Ndiyo       |
| `check-new-key-coverage` (ndani ya faili) | Kitufe **kipya** cha Kiingereza kimetafsiriwa katika kila lugha — alama ya `__MISSING__:` inakataliwa                                                                                                                            | Ndiyo       |
| `check-translation-ratio`                 | Uwiano wa tafsiri halisi kwa kila lugha (zinazofanana na Kiingereza / vishikilia nafasi / majani yanayokosekana nje ya orodha iliyoruhusiwa) haupaswi kuzidi `config/quality/i18n-translation-baseline.json` + kiwango cha ziada | **Inazuia** |

Inahitaji `fetch-depth: 0` — kizuizi cha mabadiliko ya thamani hulinganisha `en.json` dhidi ya msingi wa uunganishaji.

#### `check-ui-value-drift` — gate ya tafsiri zilizopitwa na wakati

Hunasa dosari moja ya i18n ambayo vizuizi vingine haviwezi kuiona kimuundo: thamani ya Kiingereza
inaandikwa upya huku tafsiri zilizotokana na Kiingereza cha _awali_ zikibaki, hivyo
watumiaji wasiotumia Kiingereza wanaendelea kusoma maandishi yenye uhakika lakini ambayo sasa si sahihi.

Hili lilitolewa katika toleo halisi. `oauthModal.googleOAuthWarning` iliandikwa upya wakati kisaidizi cha
kuingia cha Antigravity kilipoanzishwa (#5203); **lugha 39 kati ya 43** zilibaki na maandishi yaliyowaambia waendeshaji "kunakili
URL nzima na kuibandika hapa chini" — mtiririko ambao hauwezi kukamilika kwa mtoa huduma huyo. Hili
halikugunduliwa hadi #8463 kwa sababu:

- `sync-ui-keys` hujaza tu vitufe ambavyo **havipo**, kamwe si vile **vilivyopitwa na wakati**;
- `check-ui-keys-coverage` huhesabu _uwepo_ wa kitufe, kwa hivyo tafsiri iliyopitwa na wakati huhesabiwa kuwa imefunikwa;
- `check-translation-drift` hufuatilia nakala za nyaraka za `docs/i18n/<locale>/**.md` —
  haisomi kamwe `src/i18n/messages/*.json`. Inazuia katika kazi ya `docs-sync-strict` tangu
  usawazishaji upya wa 2026-09: hariri waraka msingi → `npm run i18n:run -- --files=<doc>` (kwa kiwango cha sehemu, nafuu).

**Huzingatia tofauti, haitegemei msingi.** Hulinganisha `en.json` kwenye msingi wa uunganishaji dhidi ya
mti wa kazi; kwa kila kitufe ambacho thamani yake ya Kiingereza ilibadilika, lugha yoyote ambayo bado ina
tafsiri ambayo haijaguswa imepitwa na wakati. Hili kwa makusudi **hufungia deni lililokuwepo tayari** — tofauti
haiwezi kufichua tafsiri ya muda mrefu ilitokana na Kiingereza kipi cha zamani, kwa hivyo kizuizi
huhukumu tu kile ambacho badiliko la sasa linagusa. Njia mbadala (msingi wa heshi kwa kila kitufe) ingegharimu
faili iliyozalishwa ya takriban KB 600, mara 3 ya msingi mkubwa zaidi uliopo, na kubadilika katika kila PR ya i18n.

Kuna njia mbili za kukidhi sharti hili:

1. sasisha tafsiri zilizoathiriwa, au
2. ziweke kuwa `__MISSING__:<new english>` — wakati wa utekelezaji ndipo Kiingereza kilichosahihishwa hutolewa
   (`src/i18n/request.ts::deepMergeFallback`, #7258) na kitufe huwekwa kwenye foleni ya kutafsiriwa.

Ikiwa **maana** ya tungo ilibadilika, ni bora **kubadilisha jina la kitufe**: kitufe kipya hakiwezi kurithi
tafsiri iliyopitwa na wakati. Huo ndio mtindo uliotumiwa na #8463.

```bash
npm run i18n:check-value-drift          # kali (hiki ndicho CI huendesha)
npm run i18n:check-value-drift:warn     # toa ripoti pekee
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Vichujio vya mabadiliko ya thamani na funguo mpya vinashiriki ulinganisho mmoja usiobadilika kutoka
`scripts/i18n/resolve-ui-diff-base.mjs`. Mtiririko wa kazi hupitisha SHA zilezile za msingi, ncha ya msingi na
mgombea kwa ukaguzi wote. Utekelezaji wa PR/ulengaji upya wa msingi, push na merge-group hutumia muktadha wa tukio lao.
Kutuma tawi la mgombea kunahitaji PR yake halisi iliyo wazi au ingizo bayana la
`i18n_base_sha`. Utumaji au uchunguzi ulioratibiwa wa `main` au `release/vX.Y.Z`
bila ingizo hilo hulinganisha commit ya mwisho na mzazi wake wa kwanza; huu si ukaguzi wa
deni lote la tafsiri lililorithiwa. Utekelezaji wa ndani unahitaji msingi bayana wa ulinganisho,
kwa mfano amri ya `BASE_REF` iliyo hapo juu.

Muktadha wa ulinganisho unaokosekana au wenye utata, katalogi inayohitajika isiyosomeka au batili, na
mgombea aliyebadilishwa huzalisha `INCOMPLETE` kwa msimbo wa kutoka **2**, hata katika hali ya onyo.
Usomaji wa katalogi hutumia `scripts/i18n/read-ui-catalog.mjs`; hitilafu za usomaji hazibadilishwi
na vipengee tupu. Kutopatikana kwa msingi wala ingizo lisilokamilika hakuthibitishi PASS.

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

Inahitaji job ya uainishaji ya `changes`. Vigawanyo husika vya matriksi huzuia uunganishaji vikishindwa.

| Kifurushi        | Huthibitisha                                                      | Kuzuia                                                                                                                             |
| ---------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Seva ya MCP (zana 110), autoCombo, akiba — kiendeshaji cha vitest | Ndiyo                                                                                                                              |
| `test:vitest:ui` | Majaribio ya vijenzi vya UI — kiendeshaji cha vitest              | **Inazuia** — hitilafu zilizokuwepo tayari zimeondolewa bayana katika `vitest.config.ts`; hitilafu mpya husababisha kazi kushindwa |

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
