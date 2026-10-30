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

## Orodha ya malango na profaili za utekelezaji

### Kukubaliwa kwa mgombea

Mitiririko ya kazi ya CI na Quality Gates kila mmoja hutoa uamuzi thabiti: `Gate / CI` na
`Gate / Quality`. Sera yake ya kukubali yenye matoleo huorodhesha kila kazi ya awali
kuwa ya lazima au ya ushauri. Kazi husika ya lazima lazima ifaulu: matokeo
yanayokosekana, yaliyoghairiwa, yaliyorukwa, yanayosubiri na yasiyojulikana hayawezi kuthibitisha PASS. Uainishaji halali
wa nyaraka pekee au katalogi pekee unaweza kufanya mkondo wa msimbo usihusike;
PR ya rasimu si mgombea anayekubalika. Lebo ya `hotfix` haiondoi hitaji la ushahidi.

Mitiririko yote miwili ya kazi inashughulikia PR zinazoingia katika matawi ya main/release, misukumo kwenda `main`, utekelezaji
wa kuanzishwa kwa mkono na matukio ya vikundi vya uunganishaji. Msukumo, utekelezaji wa kuanzishwa kwa mkono na kikundi cha uunganishaji hutekeleza uteuzi kamili. Misukumo kwenda
`release/**` haiianzishi (2026-10-18): kila badiliko tayari lilitekeleza matriki kwenye PR yake
na mchanganyiko uliounganishwa ni jukumu la Release-Green (`docs/ops/RUNNER_BOX.md` → Mkondo unaohostiwa). Fork
na vikundi vya uunganishaji hutumia vitekelezaji vinavyohostiwa kwa kazi ambazo vinginevyo huchagua vitekelezaji
vinavyojitegemea; uwezo wa kutosha unaohostiwa lazima uthibitishwe kabla ya usambazaji.

Kila risiti ya JSON hutambulisha SHA iliyotolewa, utekelezaji wa mtiririko wa kazi na jaribio.
CLI hukataa kutolingana kwa SHA ya toleo lililotolewa/tukio. Majaribio ya mtiririko wa kazi hufungamanisha ushiriki wa sera
na orodha ya `needs` ya kazi ya uamuzi ili mkondo mpya au ulioondolewa usiweze kutoweka kimyakimya.
Stakabadhi zinahusu mtiririko wao wenyewe wa kazi, si uchapishaji, upelekaji, au utendaji wa ndani
wa kichanganuzi kilichopo kinachotoa ushauri. Kufanya ukaguzi unaotumika kuwa wa lazima katika sheria za tawi
ni mabadiliko tofauti ya kiutawala; kufafanua kazi zake pekee hakulindi tawi.

`API Route Typecheck` ni ukaguzi huru wa mtiririko wa kazi, ulio nje ya maamuzi yote mawili ya jumla
na wasifu tuli wa mwangalizi kamili wa ndani. Kagua matokeo yake kando kwa kandidati husika.
`.github/workflows/api-route-typecheck.yml` huendeshwa kwenye PR zinazoelekezwa kwa `main` au
`release/**`, misukumo kwenda kwa mojawapo ya familia hizo za matawi, na uanzishaji wa mwenyewe. Haina kichujio cha njia.
Kubadilisha tawi lengwa la msingi la PR huomba ukaguzi mpya; uhariri wa maudhui/kichwa hutumia jina la uchunguzi pekee
`Admission not requested / API Route Typecheck` na hauwezi kuchukua nafasi ya ukaguzi wa uidhinishaji.
Mtiririko wa kazi hautangazi kichochezi cha kikundi cha uunganishaji. Uanzishaji wowote wa foleni ya uunganishaji unaohitaji
ukaguzi huu lazima kwanza uthibitishe utekelezaji wake kwa tukio hilo.

### Uwezo wa utekelezaji wa UI

CI hutekeleza orodha kamili ya UI kama vipande vinne vya matriki ya `test-vitest`, kila kimoja kikiwa na kiwango cha juu
cha wafanyakazi wawili na kikomo cha muda kilichopo cha dakika 15 kwa kazi. Kipande cha kwanza pia hutekeleza
mkusanyiko wa majaribio wa MCP/autoCombo Vitest. Tokeo la kazi ya lazima linahusisha kila sehemu ya matriki; kushindwa
au kughairiwa kwa kipande kimoja hakuwezi kuthibitisha kukubaliwa kwa mgombea.

Mwangalizi wa kila usiku huhifadhi risiti tofauti ya mgombea halisi kwa kila kipande cha UI,
ikiwemo utekelezaji wa MCP katika risiti ya kwanza. Risiti zote nne, kumbukumbu na vitambulisho
vya utekelezaji vinavyolingana vinahitajika. `npm run test:vitest:ui` ya ndani bado huchagua
mkusanyiko kamili; utekelezaji mmoja wa `--shard` ni ushahidi usiokamilika tu.

### Ukusanyaji wa ufikiaji wa majaribio ya kitengo

Vipande kumi na viwili vya kitengo hukusanya ufikiaji wa V8 wakati wa utekelezaji wake wa majaribio uliopo. Kipande
kilichofaulu hutekeleza `scripts/ci/compact-v8-coverage.mjs` ili kubana faili asili bila kutengeneza
ripoti ya kati ya Istanbul. Kazi ya mwisho ya Coverage huthibitisha manifesti zote kumi na mbili dhidi
ya SHA ya mgombea, mazingira ya utekelezaji, mzizi wa chanzo na heshi za data, kisha hutekeleza viripoti vya c8 na vizingiti
vilivyopo vya ufikiaji. Ingizo huhifadhi mpangilio wa jumla wa majina ya faili wa c8; kuunganisha mapema kwa kila kipande si salama
kwa ufikiaji mchanganyiko wa vitendakazi/vitalu. Vipande vinavyokosekana, vyenye hitilafu au visivyooana husababisha kukataliwa.
Vipande vya majaribio vilivyoshindwa huhifadhi ufikiaji ghafi wa uchunguzi kando; hauwezi kuingizwa katika muunganisho wa mwisho.

### Risiti za maendeleo ya utekelezaji wa majaribio ya kitengo

Amri ya pamoja ya `test:unit:ci:shard` hurekodi awamu za `primary`, `dashboard` na `serial`
kupitia `scripts/ci/unit-progress-reporter.mjs`. Ripoti ya kawaida ya majaribio bado
inapatikana. Risiti tofauti yenye metadata pekee hurekodi kuanza na kukamilika kwa kila faili,
na mapigo ya moyo ya kila sekunde 30 huorodhesha faili ambazo bado zinaendelea pamoja na muda
uliopita. Hurekodi metadata ya utekelezaji iliyo kwenye orodha ya ruhusa pekee; maelezo ya
majaribio, matokeo, maudhui ya hitilafu na mazingira kamili hayahifadhiwi katika muundo wa mfululizo.

CI na Quality huhifadhi faili za JSONL kama `unit-progress-ci-<run>-<attempt>-<shard>` na
`unit-progress-quality-<run>-<attempt>-<shard>`. Kuisha kwa muda wa kazi kunaweza kuzuia
upakiaji unaofuata; mapigo ya moyo ambayo tayari yametolewa hubaki kuwa ushahidi wa uchunguzi.
Kutokuwepo kwa mapigo ya moyo kunaweza pia kuashiria mchakato wa runner uliozuiwa au kusitishwa.
Risiti hizi huhifadhi uteuzi uliopo wa majaribio, utekelezaji sawia, makataa na hali ya kuondoka;
si maamuzi ya kuidhinisha vipengee vinavyopendekezwa.

### Ushahidi uliohifadhiwa katika moduli ya kujumlisha matokeo ya kukubali

`scripts/quality/validate-release-acceptance.mjs` hujumlisha mpango uliotolewa na manifest zake; haithibitishi kwamba mpango unahusisha mchakato mzima wa kutoa toleo. Ripoti zake huweka wazi `releaseAcceptance: false`, hata wakati mpango ni `VERIFIED`. Mtiririko wa kazi wa `release-acceptance.yml` bado hutumia data za majaribio za shadow, si risiti halisi za build, package, boot au promotion.

CLI inahitaji `--evidence-root` ili kuthibitisha ushahidi uliohifadhiwa. Faili hupatikana katika `<evidence-root>/<artifact_id>/<member>` na hash zao huhesabiwa kwa SHA-256. Rekodi ya PASS bila ushahidi, faili inayokosekana au iliyobadilika, njia isiyo salama au kiungo cha ishara huzuia uthibitishaji. Faili zinazokosekana si sawa na log tupu za utekelezaji uliofaulu. Ukaguzi uliopo wa SHA/run/attempt unabaki huru: bytes zinazolingana haziwezi kufanya risiti iliyopitwa na wakati kuwa halali. Uadilifu wa faili si uthibitisho wa uhalisi wa utekelezaji au promotion ya artifact.

### Orodha ya uchanganuzi tuli

Orodha ya lakabu za npm yenye matoleo na ushiriki wa uchanganuzi tuli vinapatikana katika
`config/quality/gate-manifest.json`. Tekeleza `npm run check:gate-manifest` ili kuthibitisha
majina ya hati na amri halisi dhidi ya `package.json`; nyongeza, uondoaji na
mabadiliko ya amri husababisha hook ya ndani na kazi za uainishaji wa mabadiliko katika CI kushindwa.
Lakabu si kazi ya mtiririko wa kazi, tukio la matriki wala kesi ya jaribio: idadi hizi
hazipaswi kuwasilishwa kana kwamba zinaweza kubadilishana.

Tumia `npm run quality:scan -- --list` au `npm run quality:scan:fast -- --list`
kukagua lakabu zilizochaguliwa bila kuzitekeleza. Kitekelezaji huita
sehemu ya kuingilia ya npm, kwa hivyo mazingira yake ya utekelezaji (ikiwemo Bun inaposanidiwa) huhifadhiwa.
Manifesti hurekodi lakabu zilizo nje ya profaili hizo kuwa zimeitwa kando, na
amri za matengenezo zimepigwa marufuku katika profaili za uchanganuzi wa kusoma pekee.

Profaili hizi zinahusisha uchanganuzi tuli pekee. Hazithibitishi majaribio ya bidhaa,
ufikiaji, ufungashaji, ukaguzi wa nje wala kukubaliwa kikamilifu kwa toleo la mgombea.
Ukubali wa mtiririko wa kazi hutumia `config/quality/admission-policy.json` iliyounganishwa na
`scripts/quality/admission-verdict.mjs`. Profaili za mwangalizi wa toleo hubaki tofauti;
kagua ukaguzi na risiti zake husika kivyake. Amri tuli za mwangalizi kamili
zimetangazwa katika `config/quality/release-green-static-profile.json`, ikiwemo
`audit:deps`, uteuzi wa majaribio ya mabadiliko na ukaguzi wa tafsiri. Kipakiaji huthibitisha amri za npm
dhidi ya package.json na matamko yaliyoigwa ya CI/Quality; hukataa mabadiliko
badala ya kutekeleza tokeni za shell kama hoja. Tokeo la SKIP/INCOMPLETE la kichanganuzi kinachohitajika
haliwezi kuthibitisha PASS. Profaili hurekodi vitu vyake vya nje vilivyoondolewa na haibadilishi
ushahidi wa ufikiaji unaohostiwa, matriki za majaribio, kifurushi au upelekaji. Orodha ya maelezo iliyo hapa chini
ni marejeleo, si uthibitisho kwamba lango lilitekelezwa.

Hati zinapatikana chini ya `scripts/check/` (malango ya sera) na `scripts/quality/` (injini ya ratchet).
Chanzo cha ukweli cha CI ni `.github/workflows/ci.yml`.

### Hali ya nyaraka za msingi zilizochapishwa

`.github/workflows/i18n-base-health.yml` huchunguza hali ya nyaraka baada ya misukumo iliyochaguliwa
kwenda `main` na `release/v*`, na wakati wa uanzishaji wa mikono. Vichujio vyake vinajumuisha nyaraka,
Markdown ya mzizi, `llm.txt`, hali/usanidi wa tafsiri na zana husika za i18n.
Kazi pekee ya `Published base documentation health` hutumia Ubuntu inayopangishwa na kikomo cha
dakika tano. Hufanya uthibitishaji wa kusoma pekee na huandika risiti ya uchunguzi bila
kusakinisha vitegemezi, kutafsiri au kuasili hali.

`scripts/i18n/check-base-health.mjs` inahitaji kutokuwepo kwa hitilafu za hash ya chanzo, lengo linalokosekana, hash ya lengo,
tafsiri iliyopitwa na wakati na akiba ya sehemu. Pia huthibitisha upeo wa sasa wa
hati/lugha ya msingi na asili yake iliyorekodiwa. Muktadha batili, ushughulikiaji usiokamilika
au kikagua kilichokatizwa huzalisha `INCOMPLETE`; mkengeuko uliothibitishwa huzalisha `FAIL`. Zote mbili
hurejesha hali ya kutoka inayoashiria kutofaulu. Risiti hufungamanishwa na SHA ya checkout, mtiririko wa kazi, utekelezaji na
jaribio, na huhifadhiwa kama `i18n-base-health-<sha>-<run>-<attempt>`.

Huu ni uchunguzi huru wa msingi uliochapishwa. Hauongezi tukio la PR au
kikundi cha kuunganisha, ukaguzi wa PR unaohitajika, lakabu ya npm au mshiriki wa wasifu wa uchanganuzi tuli.
Sera iliyopo ya PR ya kulinganisha tofauti na uainishaji wa ushauri wa kikagua cha msingi
hubaki tofauti. Upakiaji uliofanikiwa hauwezi kubadilisha matokeo ya hali yaliyofeli kuwa PASS.

### Njia ya haraka ya PR ya toleo (`quality.yml`)

`.github/workflows/quality.yml` hukamilisha CI kwenye PR za main/release, misukumo kwenda `main`,
utekelezaji wa kuanzishwa kwa mkono na vikundi vya uunganishaji. PR hutumia ukaguzi wa haraka uliochujwa kwa njia. Ujenzi rudufu
uliozimwa kabisa uliondolewa; ukaguzi halisi wa ujenzi/kifurushi/uanzishaji unabaki katika CI.

| Kazi                                             | Wigo                                                                                                                                                                                                                                        | Inazuia                  |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `Docs Gates (fast-path)`                         | PR za nyaraka/msimbo; marejeleo ya nyaraka za API na docs-all                                                                                                                                                                               | Ndiyo                    |
| `Fast Quality Gates`                             | PR za msimbo; ukaguzi tuli, ukaguzi wa aina, ukaguzi wa aina wa dashibodi, majaribio ya kitengo yaliyoathiriwa                                                                                                                              | Ndiyo                    |
| `Forgotten sibling tests`                        | PR za msimbo; moduli zilizobadilishwa hufuatiliwa hadi kwa watumiaji tuli na majaribio ndugu yanayowezekana; njia za barrel na dynamic-import huripotiwa kama uchunguzi wa ushauri, pamoja na vighairi vinavyorejelewa vya orodha ya ruhusa | **Ushauri**              |
| `Vitest (fast-path)`                             | PR za msimbo; mkusanyiko wa haraka wa vitest                                                                                                                                                                                                | Ndiyo                    |
| `Unit Tests fast-path`                           | PR za msimbo; mkusanyiko wa majaribio ya kitengo uliogawanywa katika sehemu 4                                                                                                                                                               | Ndiyo                    |
| `No new ESLint warnings`                         | PR za msimbo; ulinzi wa lint unaozingatia vizuizi vya ukaguzi                                                                                                                                                                               | Ndiyo, ikijumuisha forks |
| `Merge integrity (changelog + generated skills)` | PR zisizo rasimu; ulandanishaji wa changelog na skills zilizozalishwa                                                                                                                                                                       | Ndiyo, ikijumuisha forks |

#### Ripoti ya majaribio ndugu yaliyosahaulika

`npm run check:forgotten-sibling-tests` hutumia tena kitatuzi cha uingizaji kinachotumiwa na ramani ya athari za majaribio.
Kwa kila moduli ya uzalishaji iliyobadilishwa, huripoti minyororo bainifu ya
`changed module/symbol -> static consumer -> candidate sibling test` wakati jaribio linalowezekana
halipo katika tofauti ya pull request. Muhtasari wa Markdown na matokeo ya JSON huhifadhiwa kama
artifact ya mtiririko wa kazi wa `forgotten-sibling-tests` kwa ajili ya urekebishaji kabla ya utekelezaji wowote wa kuzuia.

Uhamishaji upya wa barrel na uingizaji unaobadilika ni uchunguzi wa utatuzi pekee; kamwe hausababishi
ugunduzi unaozuia. Vighairi vilivyokaguliwa hupatikana katika
`config/quality/forgotten-sibling-allowlist.json`. Kila ingizo lazima litaje mtumiaji na jaribio
linalowezekana, litoe sababu mahususi, na liunganishe na suala au pull request ya GitHub. Maingizo yenye
hitilafu hukataliwa moja kwa moja. Vighairi haviwezi kuficha jaribio linalowezekana lililofutwa au tofauti inayoongeza `.skip`/`.todo`;
udhoofishaji wa madai na ufichaji mwingine unasalia kuwa jukumu la lango la
`check:test-masking` linalozuia kwa kujitegemea.

### Kazi: `lint`

Huendeshwa kwenye kila PR kwenda `main`. Huzuia uunganishaji ikishindwa.

| Hati (`npm run ...`)              | Huthibitisha                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Huzuia                                  |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | Toleo la Node.js liko ndani ya masafa yanayotumika                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ndiyo                                   |
| `check:test-tla-order`            | Hakuna faili la `node:test` chini ya `tests/unit` linalosajili jaribio, kufikia `await` ya kiwango cha juu, kisha kusajili mengine (#18045; ratchet: `test-tla-order-allowlist.json` inaweza kupungua tu)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ndiyo                                   |
| `check:cycles`                    | Uingizaji wa mzunguko katika `src/` + `open-sse/` yote (kulingana na AST, `paths` za tsconfig zimetatuliwa). Ikitekelezwa peke yake, hutoka kwa msimbo 1 wakati wowote mzunguko wowote unapokuwepo (hufeli kwa usalama tangu #15281) na huorodhesha SCC. `check:cycles:ratchet` (ambayo CI huendesha) huzuia wakati idadi inapozidi kikomo cha `metrics.cycles` katika `quality-baseline.json` — kwa sasa ni 14, `direction: down`, kwa hivyo inaweza kupungua tu (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ndiyo (ratchet)                         |
| `check:boundary`                  | Uunganishaji wa `open-sse → src`: uingizaji wa kipekee kutoka faili moja hadi nyingine kutoka kwenye injini hadi kwenye programu (`scripts/quality/measure-boundary.mjs`; orodha ya miunganisho ndiyo orodha ya kazi iliyosalia ya marekebisho ya kugawanya kiini/moduli ya v4). Ikitekelezwa peke yake = ripoti ya ushauri (sawa na `quality:boundary`). `check:boundary:ratchet` (ambayo CI huendesha, pia ikiwa katika kitanzi cha ratchet cha ukaguzi wa haraka cha `quality.yml`) huzuia wakati idadi inapozidi kikomo cha `metrics.boundaryOpenSseToSrc` katika `quality-baseline.json` — thamani ya kuanzia imewekwa kuwa 771 iliyopimwa, `direction: down`; `--update` huipunguza tu; hulinganishwa na msingi kwenye PR (`--base-ref`, tazama hapa chini)                                                                                                                                                                                                                                                                                                                | Ndiyo (ratchet)                         |
| `check:route-validation:t06`      | Skimu za Zod zipo kwenye njia zote (sera ya Daraja la 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ndiyo                                   |
| `check:any-budget:t11`            | Idadi ya `@ts-expect-error // any` haizidi kiwango kilichowekwa (kizuizi cha Daraja la 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ndiyo                                   |
| `check:provider-consistency`      | Kila mtoa huduma katika `providers.ts` ana ingizo linalolingana katika `providerRegistry.ts` (na kinyume chake, ndani ya orodha ya ruhusa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ndiyo                                   |
| `check:model-lifecycle`           | Majedwali matatu ya uelekezaji yanayotunzwa kwa mikono yanaendelea kuendana na picha ya hali ya mzunguko wa maisha iliyohifadhiwa (#11503): `FITNESS_TABLE` (`taskFitness.ts`) haitoi alama kwa kitambulisho chochote kilichostaafishwa ambacho `REGISTRY` inaweza kuelekeza; kila lengo la `BUILT_IN_ALIASES` lipo katika `REGISTRY` na halipo kwenye picha ya hali ya vitambulisho vilivyostaafishwa; kila kitambulisho kilichostaafishwa ambacho bado kipo katika `REGISTRY` kinaelekezwa kwingine au kimeorodheshwa katika `allowedRetiredInCatalog`; na hakuna chanzo au lengo la `DEFAULT_DEGRADATION_MAP` linaloonekana kuwa limestaafishwa katika picha hiyo ya hali. Hii haithibitishi kwamba muundo unatolewa kwa sasa na huduma hai ya upstream. Nje ya mtandao — hulinganisha dhidi ya `config/quality/model-lifecycle.json`, inayosasishwa kwa mkono kwa kutumia `npm run quality:refresh-model-lifecycle` (mtandao; haijaunganishwa na CI). `allowedRetiredInCatalog` ni utaratibu wa kupunguza hatua kwa hatua: ongeza ingizo ikiwa tu kuna suala la ufuatiliaji. | Ndiyo                                   |
| `check:fetch-targets`             | Kila `fetch("/api/...")` katika `src/` ya upande wa mteja huelekezwa kwenye `route.ts` halisi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ndiyo                                   |
| `check:deps`                      | Vitegemezi vyote vinavyoweza kusakinishwa kwa `npm install` katika kila `package.json` ndani ya hazina vipo katika `dependency-allowlist.json`; vifurushi vipya visivyofungwa kwenye toleo mahususi au vya slopsquatting huwekewa alama                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ndiyo                                   |
| `audit:deps`                      | Ukaguzi wa npm wa lockfile zote tano zinazojitegemea (mzizi, Electron, programu-jalizi za OpenCode v1/v2 na mtoa huduma). Tahadhari muhimu huzuia; tahadhari za kiwango cha juu hubaki kama maonyo yanayoonekana. Ukaguzi unaokosekana/ulioshindwa ni INCOMPLETE na huzuia; heshi za lock za kila upeo na ripoti huhifadhiwa.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ndiyo                                   |
| `check:lockfile`                  | Uadilifu wa `package-lock.json` — sajili ya https, heshi za uadilifu, hakuna ubatilishaji wa seva pangishi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ndiyo                                   |
| `check:licenses`                  | Orodha ya leseni za SPDX zinazoruhusiwa kwa vitegemezi vya uzalishaji                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ndiyo                                   |
| `check:tracked-artifacts`         | Hakuna mabaki ya uundaji / viungo vya ishara vya `node_modules` vilivyowekwa kwenye hazina (pia huendeshwa katika husky kabla ya commit; kabla ya push kumeachwa kuwa kwepesi kimakusudi — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ndiyo                                   |
| `check:ai-attribution`            | Hakuna trela ya AI/boti ya `Co-Authored-By` wala kijachini cha uzalishaji wa AI katika commit za PR, kichwa au maudhui — Kanuni Ngumu #16 (katika kitanzi cha ukaguzi wa haraka cha `quality.yml` kwa PR→`release/**` — husoma data ya tukio, hakifanyi chochote nje ya PR — na hatua ya PR pekee katika ukaguzi wa lint wa `ci.yml` kwa PR→`main`; pia hook ya husky ya `commit-msg`; waandishi wenza wa kibinadamu wanaruhusiwa; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:vitest-exclusions`         | Kila kutengwa kwa Vitest hutaja suala la ufuatiliaji na huonekana katika `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ndiyo                                   |
| `check:file-size`                 | Faili za chanzo (`.ts`/`.tsx` katika `src/`, `open-sse/`, `electron/`, `bin/`) zisizidi `cap` na faili za majaribio (`*.test.ts(x)`) zisizidi `testCap`; faili zilizofungiwa katika `file-size-baseline.json` (`frozen` / `testFrozen`) hazipaswi kukua na kuvuka ukubwa wake uliorekodiwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ndiyo                                   |
| `check:error-helper`              | Majibu ya hitilafu katika vitekelezaji/vishughulikiaji yatumie `buildErrorBody()` / `sanitizeErrorMessage()` (Kanuni Kali #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ndiyo                                   |
| `check:migration-numbering`       | Faili za SQL za uhamishaji zimepewa nambari kwa mfuatano, bila mapengo wala nambari zinazojirudia                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ndiyo                                   |
| `check:public-creds`              | Hakuna OAuth `client_id`/`client_secret` halisi au funguo za Firebase Web nje ya `publicCreds.ts` (Kanuni Kali #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ndiyo                                   |
| `check:db-rules`                  | Hakuna SQL ghafi nje ya moduli za `src/lib/db/`; hakuna uletaji wa pamoja kutoka `localDb.ts` (Kanuni Kali #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ndiyo                                   |
| `check:known-symbols`             | Vitekelezaji vya watoa huduma, mikakati ya uelekezaji, na watafsiri waliosajiliwa katika majedwali yao ya usambazaji wanalingana na faili zilizopo kwenye diski—hakuna alama yatima au ambazo hazijatangazwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ndiyo                                   |
| `check:route-guard-membership`    | Kila route inayoanzisha mchakato mtoto imeainishwa na `isLocalOnlyPath()` (Kanuni Kali #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ndiyo                                   |
| `check:test-discovery`            | Kila faili ya `*.test.ts` / `*.spec.ts` katika repo inakusanywa na angalau test runner moja (ratchet: orodha ya faili yatima katika `test-discovery-baseline.json` inaweza kupungua tu)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ndiyo                                   |
| `check:agent-skills-sync`         | Artefakti zilizozalishwa za agent-skills zinalingana na katalogi yake chanzo (hakuna mkengeuko)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:provider-asset-provenance` | Nembo/rasilimali za mtoa huduma zina ingizo la asili lililorekodiwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `lint:json`                       | Faili za usanidi za JSON zinachanganuliwa na zinakidhi kanuni za lint za repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `typecheck:core`                  | Ukompilishaji wa TypeScript bila hitilafu (maonyo ya ushauri pekee)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ndiyo                                   |
| `typecheck:noimplicit:core`       | `noImplicitAny` kali — kwa matumizi ya baadaye; maeneo mengi ya mwito yaliyokuwepo tayari bado yanahitaji ufafanuzi wa aina                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **Ushauri** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` inayolenga `src/app/(dashboard)/**` (#7033) — orodha iliyoratibiwa ya ruhusa ya faili 27 ya `typecheck:core` haijumuishi TSX yoyote ya dashibodi, na `next build` pia haikagui aina zake kamwe (`next.config.mjs` huweka `ignoreBuildErrors: true`), kwa hivyo hitilafu za utambulisho yatima humo (#6625/#6909) hazikuonekana na CI. Hulinganisha tofauti dhidi ya msingi uliogandishwa wa idadi kwa kila faili/kwa kila msimbo wa TS (`config/quality/dashboard-typecheck-baseline.json`, muundo uleule wa utekelezaji dhidi ya data iliyopitwa na wakati kama `check:known-symbols`) — ni hitilafu MPYA pekee zinazozidi idadi ya msingi ambazo hufanya lango lishindwe; punguza msingi hatua kwa hatua kwa kutumia `--update` wakati hitilafu iliyokuwepo awali inaporekebishwa.                                                                                                                                                                                                                                                                                       | Ndiyo                                   |

### Kazi: `quality-gate`

Huendeshwa baada ya `test-coverage`. Huzuia uunganishaji inaposhindwa.

| Hati                         | Huthibitisha                                                                                                                                                                                                | Huzuia                   |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | Hutoa `quality-metrics.json` (idadi ya maonyo ya ESLint, ufunikaji kutoka kwenye ripoti iliyounganishwa ya sehemu)                                                                                          | Ndiyo (kabla ya ratchet) |
| `quality:ratchet`            | Kila kipimo katika `quality-baseline.json` hakijarudi nyuma (maonyo ya ESLint ≤ msingi; ufunikaji ≥ msingi)                                                                                                 | Ndiyo                    |
| `check:duplication`          | Urudiaji wa msimbo (jscpd@4) hauzidi msingi katika `quality-baseline.json`                                                                                                                                  | Ndiyo                    |
| `check:complexity`           | Utata wa mizunguko katika kiwango cha faili hauzidi kikomo (`complexity` ya msingi ya ESLint + `max-lines-per-function`)                                                                                    | Ndiyo                    |
| `check:cognitive-complexity` | Ratchet ya utata wa kiutambuzi (`eslint-plugin-sonarjs`) — ukaguzi tofauti wa ESLint; CI huendesha zote zikiwa zimeunganishwa kama hatua moja ya `check:complexity-ratchets`                                | Ndiyo                    |
| `check:dead-code`            | Ratchet ya uhamishaji/faili zisizotumika (knip) hairudi nyuma ikilinganishwa na msingi                                                                                                                      | Ndiyo                    |
| `check:compression-budget`   | Bajeti ya kipimo cha utendaji wa mgandamizo — viwango vya chini vya uokoaji wa tokeni kwa kila injini lazima visirudi nyuma                                                                                 | Ndiyo                    |
| `check:type-coverage`        | Ratchet ya asilimia iliyopewa aina (`type-coverage`) hairudi nyuma; kwa kiasi kikubwa inajumuisha `typecheck:noimplicit:core`                                                                               | Ndiyo                    |
| `check:codeql-ratchet`       | Idadi ya tahadhari wazi za CodeQL hairudi nyuma (husoma kupitia `gh api`; huruka kwa utaratibu bila tokeni) — kwa marudio ya uonyeshaji upya na uanzishaji wa mikono: tazama "Ratchet ya CodeQL" hapa chini | Ndiyo                    |

### Kazi: `quality-extended`

Kazi hii huzuia wagombea wanaohusika. Ukubwa wa kifurushi, ugunduzi wa siri, ugunduzi wa
udhaifu, ugunduzi wa mtiririko wa kazi na mabadiliko ya OpenAPI hukaguliwa kwa ratchet
zinazohitajika. Uchunguzi wa utegemezi wa mzunguko hubaki kuwa wa ushauri. Usakinishaji
wa vichanganuzi unahitajika: `scripts/ci/install-quality-scanners.sh` huandaa matoleo
yaliyobainishwa na kusambaza hitilafu za usakinishaji. Zana zinazokosekana, ripoti batili
au misingi inayokosekana huacha lango linalohitajika la kichanganuzi katika hali ya
INCOMPLETE.

| Skripti                  | Huthibitisha                                                                                                                                                                                                                                       | Uzuiaji                                                      |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `check:circular-deps`    | Hakuna utegemezi wa mzunguko (dpdm)                                                                                                                                                                                                                | **Ushauri**                                                  |
| `check:bundle-size`      | Ukubwa wa kifurushi hauzidi kikomo; kutopatikana kwa kipimo husababisha kushindwa                                                                                                                                                                  | **Inazuia kwa --ratchet**                                    |
| `check:secrets`          | Matokeo ya Gitleaks hayarudi nyuma; uchanganuzi unaohitajika hukataa zana/chanzo/msingi unaokosekana, uchanganuzi ulioshindwa na ripoti batili                                                                                                     | **Inazuia kwa --ratchet**                                    |
| `check:vuln-ratchet`     | Udhaifu wa utegemezi haurudi nyuma; uchanganuzi unaohitajika hukataa zana zinazokosekana, ripoti batili au misingi inayokosekana                                                                                                                   | **Inazuia kwa --ratchet**                                    |
| `check:workflows`        | Ukaguzi wa mtiririko wa kazi (actionlint + zizmor); vichanganuzi vinavyokosekana/vilivyoharibika, ripoti batili au msingi wa ratchet unaokosekana hushindwa kama INCOMPLETE. Matokeo halali hufuata sera iliyochaguliwa ya strict/advisory/ratchet | Utekelezaji unahitajika; ratchet ya zizmor inazuia katika CI |
| `check:openapi-breaking` | Mkataba wa API ya umma dhidi ya commit za tukio zilizobainishwa (merge-base ya PR, before ya push, msingi wa merge-group; kwa ratiba/kwa mikono, mzazi wa kwanza wa checkout); kipimo kinachohitajika hushindwa kwa hali salama                    | **Inazuia kwa --ratchet**                                    |

### Kazi: `docs-sync-strict`

Kwa pull request kwenda `main` au `release/**`, kazi hii huendeshwa tu kwa wagombea ambao si rasimu (au walio katika foleni inayoaminika) na wameainishwa kama mabadiliko ya nyaraka au msimbo. Pia huendeshwa kwenye matukio ya CI ambayo si PR; kichocheo cha push cha mtiririko huu wa kazi kinahusu `main` pekee, si `release/**`. Hatua inayomalizika na msimbo wa kutoka usio sifuri huzuia kazi; matokeo yanayoripotiwa tu na misamaha iliyoandikwa hapa chini haiizuii.

| Skripti                        | Huthibitisha                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Uzuiaji                                                                                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Lango kuu linaloendesha malango madogo 7 yaliyo hapa chini kwa mfuatano                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ndiyo                                                                                                                                           |
| ↳ `check:docs-sync`            | Ulinganifu wa matoleo ya kifurushi/OpenAPI/CHANGELOG, nakala za kioo za `llm.txt` zinazolingana kikamilifu, masharti yasiyobadilika ya sehemu na ukubwa wa CHANGELOG iliyotafsiriwa, na kutokuwepo kwa nyaraka rudufu ambazo tayari zimebadilishwa na nyingine                                                                                                                                                                                                                                                                                        | Ndiyo                                                                                                                                           |
| ↳ `check:docs-frontmatter`     | Kurasa za nyaraka zilizokusanywa zina vichwa halali vya frontmatter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ndiyo                                                                                                                                           |
| ↳ `check:docs-counts`          | Masharti yasiyobadilika ya idadi yenye uhakika wa juu hutekelezwa kwa ukali; ukaguzi wa makadirio ya idadi ya faili hutoa maonyo tu isipokuwa skripti ipokee `--strict` (lango kuu la CI haliipitishi)                                                                                                                                                                                                                                                                                                                                                | Ngazi kali huzuia; ngazi laini ni ya ushauri                                                                                                    |
| ↳ `check:env-doc-sync`         | Usomaji wa vigezo vya mazingira katika msimbo chanzo, `.env.example` na `docs/reference/ENVIRONMENT.md` hulingana baada ya kutumia orodha wazi za misamaha kwa vipengee vya kupuuzwa, vya nyaraka pekee na vya mazingira pekee                                                                                                                                                                                                                                                                                                                        | Ndiyo, nje ya orodha za misamaha zilizoandikwa                                                                                                  |
| ↳ `check:deprecated-versions`  | Huripoti matoleo yanayoweza kuwa yamepitwa na wakati nje ya miktadha salama ya kihistoria na tarehe za masasisho zilizopitwa na wakati, bila kujumuisha nyaraka zinazopuuzwa                                                                                                                                                                                                                                                                                                                                                                          | Ya ushauri katika usanidi wa sasa wa CI (`--strict` haipitishwi)                                                                                |
| ↳ `check:doc-links`            | Viungo vya ndani vya markdown katika nyaraka vinaelekeza kwenye faili halisi (muundo wa `[text]`/`(path)`)                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ndiyo                                                                                                                                           |
| ↳ `check:fabricated-docs`      | Routes, env vars, amri za CLI, majina ya hook, na njia za faili zilizotajwa katika nyaraka zipo kwenye codebase. Lango gumu kupitia `--strict`; hushindwa kwa upole bila flag.                                                                                                                                                                                                                                                                                                                                                                        | Ndiyo (kupitia `--strict` katika CI)                                                                                                            |
| `check:cli-i18n`               | Funguo za `t()` zinazotumiwa na CLI zipo katika `en`; `pt-BR` huhifadhi kila sehemu ya ngazi ya juu; `zh-CN` na `zh-TW` zina kila ufunguo kutoka `en`                                                                                                                                                                                                                                                                                                                                                                                                 | Ndiyo                                                                                                                                           |
| `check:openapi-coverage`       | Uainishaji wa OpenAPI unajumuisha angalau kiwango cha chini kilichowekwa kwa ratchet cha routes halisi                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ndiyo                                                                                                                                           |
| `check:openapi-security-tiers` | Maelezo yaliyotangazwa ya `x-loopback-only`/`x-always-protected` lazima yaungwe mkono na `routeGuard.ts`; makosa ya kichanganuzi na kutolingana katika ukaguzi wa mbele huzuia. Ukaguzi wa kinyume wa `x-loopback-only` inayokosekana chini ya viambishi awali vya ufikiaji wa ndani pekee hutoa maonyo, na routes zinazofafanuliwa kwa muundo pekee hazijumuishwi katika ukaguzi huo wa kinyume.                                                                                                                                                     | Ukaguzi wa kichanganuzi na wa mbele huzuia; ukaguzi wa kinyume ni wa ushauri                                                                    |
| `check:openapi-routes`         | Kila njia `/api...` katika `openapi.yaml` hulingana na route halisi bila kutegemea tofauti za vigezo baada ya kutumia orodha ya misamaha yenye sababu `KNOWN_STALE_SPEC`; vipengee vya zamani kwenye orodha hiyo pia husababisha kushindwa                                                                                                                                                                                                                                                                                                            | Ndiyo                                                                                                                                           |
| `check:docs-symbols`           | Marejeleo ya URL za ndani `/api/...` katika nyaraka kuu ambazo si nakala za kioo hulingana na route halisi au familia ya routes; marejeleo ya proxy/upstream/kishikilia nafasi/faili na vipengee vyenye sababu vya `KNOWN_STALE_DOC_REFS` hayajumuishwi, na vipengee vya zamani kwenye orodha ya misamaha husababisha kushindwa                                                                                                                                                                                                                       | Ndiyo                                                                                                                                           |
| `i18n translation drift`       | Hukagua hash za chanzo/lengwa za hati kuu na asili ya tafsiri. Ulinganisho wa PR huruhusu tu hitilafu zilizorithiwa zinazofanana kabisa; kutolingana kupya au kusikothibitishwa kwa chanzo, lengwa linalokosekana, hash ya lengwa, tafsiri iliyopitwa na wakati au akiba ya sehemu huzuia. Nje ya ulinganisho wa PR, hitilafu za chanzo/lengwa linalokosekana/hash ya lengwa huzuia, huku tafsiri zilizopitwa na wakati na akiba za sehemu zisizolingana zikibaki kuwa maonyo tu. Kutokuwepo kwa akiba ya sehemu katika muundo wa zamani si hitilafu. | Mkengeuko mpya/usiohakikishwa katika PR huzuia; mkengeuko uliorithiwa unaofanana kabisa ni onyo tu; kanuni nje ya PR hutegemea aina ya hitilafu |

### Kazi: `i18n-ui-coverage`

| Hati                             | Inathibitisha                                                                                                                                                                                                                      | Inazuia     |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (ndani) | Ufunikaji wa vitufe vya UI i18n ni ≥ 65%                                                                                                                                                                                           | Ndiyo       |
| `check-ui-value-drift` (ndani)   | **Thamani** ya Kiingereza iliyoandikwa upya haiachi tafsiri yoyote iliyopitwa na wakati                                                                                                                                            | Ndiyo       |
| `check-new-key-coverage` (ndani) | Kitufe **kipya** cha Kiingereza kimetafsiriwa katika kila lugha — kiashiria cha `__MISSING__:` kinakataliwa                                                                                                                        | Ndiyo       |
| `check-translation-ratio`        | Uwiano wa tafsiri halisi kwa kila lugha (zinazofanana na Kiingereza / vishikilia nafasi / sehemu zinazokosekana zilizo nje ya orodha ya kuruhusu) lazima usizidi `config/quality/i18n-translation-baseline.json` + nafasi ya ziada | **Inazuia** |

Inahitaji `fetch-depth: 0` — kizuizi cha mabadiliko ya thamani hulinganisha tofauti za `en.json` dhidi ya msingi wa uunganishaji.

#### `check-ui-value-drift` — kizuizi cha tafsiri zilizopitwa na wakati

Hunasa hitilafu moja ya i18n ambayo vizuizi vingine haviwezi kuiona kimuundo: thamani ya Kiingereza
inaandikwa upya huku tafsiri zilizotokana na Kiingereza cha _awali_ zikisalia, hivyo
watumiaji wasiotumia Kiingereza wanaendelea kusoma maandishi yenye kauli ya uhakika lakini ambayo sasa si sahihi.

Hili lilitolewa katika toleo halisi. `oauthModal.googleOAuthWarning` iliandikwa upya wakati kisaidizi cha kuingia cha Antigravity
kilipoongezwa (#5203); **lugha 39 kati ya 43** ziliendelea kuwa na maandishi yaliyowaambia waendeshaji "kunakili
URL kamili na kuibandika hapa chini" — mtiririko ambao hauwezi kukamilika kwa mtoa huduma huyo. Hili
halikugunduliwa hadi #8463 kwa sababu:

- `sync-ui-keys` hujaza tu vitufe ambavyo **havipo**, kamwe si vile ambavyo **vimepitwa na wakati**;
- `check-ui-keys-coverage` huhesabu _uwepo_ wa kitufe, hivyo tafsiri iliyopitwa na wakati huhesabiwa kuwa imefunikwa;
- `check-translation-drift` hufuatilia nakala za nyaraka za `docs/i18n/<locale>/**.md` —
  haisomi kamwe `src/i18n/messages/*.json`. Imezuia katika kazi ya `docs-sync-strict` tangu usawazishaji upya wa
  2026-09: hariri waraka wa msingi → `npm run i18n:run -- --files=<doc>` (kwa kiwango cha sehemu, gharama nafuu).

**Huzingatia tofauti, haitegemei msingi.** Hulinganisha `en.json` kwenye msingi wa uunganishaji dhidi ya
mti wa kazi; kwa kila kitufe ambacho thamani yake ya Kiingereza imebadilika, lugha yoyote ambayo bado ina
tafsiri ambayo haijaguswa imepitwa na wakati. Hii kwa makusudi **hufungia deni lililokuwepo tayari** — tofauti
haiwezi kufichua tafsiri ya muda mrefu ilitokana na Kiingereza gani cha zamani, hivyo kizuizi hutathmini
tu kile kinachoguswa na mabadiliko ya sasa. Njia mbadala (msingi wa hashi kwa kila kitufe) ingehitaji
faili iliyozalishwa ya takriban KB 600, mara 3 ya msingi mkubwa zaidi uliopo, na ingebadilika katika kila PR ya i18n.

Kuna njia mbili za kuitimiza:

1. sasisha tafsiri zilizoathiriwa, au
2. ziweke kuwa `__MISSING__:<new english>` — mfumo wakati wa utekelezaji kisha hutoa Kiingereza kilichosahihishwa
   (`src/i18n/request.ts::deepMergeFallback`, #7258) na kitufe huwekwa kwenye foleni ya kutafsiriwa.

Ikiwa **maana** ya tungo imebadilika, ni vyema zaidi **kubadilisha jina la kitufe**: kitufe kipya hakiwezi kurithi
tafsiri iliyopitwa na wakati. Huo ndio mtindo uliotumiwa na #8463.

```bash
npm run i18n:check-value-drift          # hali madhubuti (ambayo CI huendesha)
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

Jedwali kamili la uthibitishaji wa i18n (kazi moja kwa kila lugha). Kazi nzima ni ya ushauri.

| Hati                            | Inathibitisha                       | Inazuia                                                   |
| ------------------------------- | ----------------------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | Ukamilifu wa tafsiri kwa kila lugha | **Ushauri** (`continue-on-error: true` kwenye kazi nzima) |

### Kazi: `pr-test-policy`

Huendeshwa kwenye maombi ya kuvuta pekee.

| Hati                   | Inathibitisha                                                                                                                                             | Inazuia |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:pr-test-policy` | PR zinazobadilisha msimbo wa uzalishaji katika `src/`, `open-sse/`, `electron/`, au `bin/` lazima zijumuishe au zisasisha majaribio (Kanuni Ngumu #8)     | Ndiyo   |
| `check:test-masking`   | Faili za majaribio zilizobadilishwa hazipunguzi jumla halisi ya idadi ya uthibitisho wala kuongeza kauli dhahiri za `assert.ok(true)`                     | Ndiyo   |
| `check:pr-evidence`    | Maelezo ya PR yanataja ushahidi wa jaribio/VPS kwa mabadiliko hayo (hutekeleza Kanuni Ngumu #18 kwa kuchuja maandishi ya PR — ni dhaifu, angalia Backlog) | Ndiyo   |

### Kazi: `test-vitest`

Inahitaji job ya uainishaji ya `changes`. Vigawanyo husika vya matriksi huzuia uunganishaji vikishindwa.

| Kundi            | Huthibitisha                                                      | Kuzuia                                                                                                                            |
| ---------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Seva ya MCP (zana 110), autoCombo, akiba — kiendeshaji cha vitest | Ndiyo                                                                                                                             |
| `test:vitest:ui` | Majaribio ya vijenzi vya UI — kiendeshaji cha vitest              | **Huzuia** — hitilafu zilizokuwepo awali zimeondolewa waziwazi katika `vitest.config.ts`; hitilafu mpya husababisha kazi ishindwe |

### Mitiririko ya kazi ya kila usiku (iliyoratibiwa, ya ushauri)

Hii huendeshwa kwa ratiba ya cron (na `workflow_dispatch`), kamwe si kwenye PR. Yote ni ya ushauri.

| Mtiririko wa kazi      | Huthibitisha                                                                                                                                                                                                    | Kuzuia         |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | Majaribio ya sifa ya fast-check kwa kutumia mbegu nasibu + idadi kubwa ya uendeshaji                                                                                                                            | **Ya ushauri** |
| `nightly-resilience`   | Kigezo cha ukuaji wa heap, uingizaji wa hitilafu za vurugu, mzigo/udumishaji wa k6                                                                                                                              | **Ya ushauri** |
| `nightly-llm-security` | Kinga ya promptfoo dhidi ya uingizaji (hali ya kuzuia) + uchunguzi wa garak (hurukwa bila siri ya mtoa huduma)                                                                                                  | **Ya ushauri** |
| `nightly-schemathesis` | Upimaji nasibu wa mkataba wa OpenAPI (schemathesis) dhidi ya OmniRoute inayotumika kwa kutumia `docs/openapi.yaml` — hubainisha ukiukaji wa vipimo / hitilafu za 500 ambazo hazijashughulikiwa (Awamu ya 8 B.4) | **Ya ushauri** |
| `nightly-mutation`     | Alama ya majaribio ya mabadiliko ya Stryker kwenye njia ya haraka ya majaribio ya vitengo — mabadiliko yanayonusurika hubainisha uthibitishaji dhaifu                                                           | **Ya ushauri** |
| `nightly-compat`       | Jedwali la uoanifu wa injini ya Node katika masafa yanayotumika ya `engines.node`                                                                                                                               | **Ya ushauri** |

Viwango vya msingi vya utendaji (heap, TTFB, muda wa kujenga) hurekodiwa, lakini havitumiki kama vizuizi: angalia [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

**Pia haijaandikwa hapo juu** (ya ushauri, ishara hafifu): job ya `docs-lint`
(markdownlint + Vale, job nzima ikiwa na `continue-on-error`) na mtiririko huru ya kazi ya vikagua
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` imo katika
`quality-baseline.json` lakini haijaunganishwa na ratchet inayozuia katika `ci.yml` — kipimo hiki
kwa sasa hakina muunganisho.

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
