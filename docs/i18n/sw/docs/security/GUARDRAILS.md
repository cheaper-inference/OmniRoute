# Guardrails (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Chanzo rasmi:** `src/lib/guardrails/`
> **Ilisasishwa mwisho:** 2026-08-29 — v3.8.51 (asili ya nakala ya Video Bridge hutangazwa na mpigaji,
> bado haijathibitishwa na seva — imefafanuliwa kulingana na #11661)

Vizuizi vya ulinzi hutekeleza usalama, sera na mageuzi ya maudhui kwenye mpaka
kati ya OmniRoute na watoa huduma wa ngazi ya juu. Kila kizuizi cha ulinzi kinaweza kukagua (na
kwa hiari kukataa, kubadilisha au kuweka ufafanuzi kwenye) data za ombi (`preCall`) na
majibu ya mtoa huduma wa ngazi ya juu (`postCall`).

Mfumo ni wa **fail-open**: ikiwa kizuizi cha ulinzi kitatupa hitilafu kinapotekelezwa, sajili
hurekodi hitilafu hiyo na kuendelea na kizuizi kinachofuata badala ya kusababisha
ombi lishindwe. Kuzuia ni uamuzi wa moja kwa moja (`block: true`), kamwe si ajali.

## Vizuizi Vilivyojengewa Ndani

Rejesta hupakia kiotomatiki vizuizi sita kwa mpangilio wa kipaumbele wakati wa kuingiza
(tazama `registry.ts` → `registerDefaultGuardrails()`):

| Kipaumbele | Jina                | Hatua          | Faili                 |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nambari ndogo za kipaumbele hutekelezwa **kwanza**.

### Daraja la Maono (`visionBridge.ts`) — Daraja la Namna PR-1

Huzuia maombi yenye picha yanayolenga **modeli zisizo na uwezo wa kuona** na ama
huelekeza upya ombi lote kwa modeli yenye uwezo wa kuona au hubadilisha sehemu
za picha kwa maelezo ya maandishi yanayotolewa na modeli ya maono inayoweza
kusanidiwa kabla ya ombi la mfumo wa juu. Hii huwezesha watoa huduma wa maandishi
pekee kushughulikia data yenye namna nyingi kwa uwazi.

Mtiririko:

1. Ruka ikiwa modeli lengwa tayari ina uwezo wa kuona (isipokuwa ikiwa imo kwenye
   orodha ya kulazimisha daraja `isVisionBridgeForcedModel`).
2. Toa sehemu za picha kupitia `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), ambayo hukabidhi kazi kwa **kitambuzi kilichounganishwa
   cha midia** `detectMediaParts()` katika `open-sse/utils/mediaParts.ts` — chanzo
   kimoja cha ukweli kinachotumiwa pia na kichujio cha uoanifu cha combo.
   Utoaji unatumia orodha-ruksa kwa sehemu za kiwango cha juu zenye miundo ambayo
   `replaceImageParts` inaweza kuunganisha tena (mkataba wa kutoa↔kubadilisha): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, URL ya Anthropic
   `source.type:"url"`, na Responses API `input_image`. Vipengele vinavyopatikana
   ndani ya vingine na miundo ya viashiria pekee ni nyenzo za kichujio cha combo
   na kamwe havitolewi. Ruka ikiwa hakuna kilichopatikana.
3. Tatua usanidi wa wakati wa utekelezaji kupitia `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): vitufe vipya vya mipangilio
   vya `modalityBridge*` vinatangulia; vitufe vya zamani vya `visionBridge*`
   vinaendelea kuwa **mbadala wa mzunguko mmoja** (dirisha la kurejesha nyuma).
   Ruka kabla ya kupitia midia yoyote wakati daraja limezimwa.
4. Kiteuzi cha modi (`modalityBridgeVisionMode`, tazama jedwali hapa chini) huamua
   kuelekeza upya au kuelezea. Kuelekeza upya hurejesha `modifiedPayload` huku
   `model` pekee ikiwa imebadilishwa, pamoja na metadata `{ rerouted, fromModel, toModel, imagesKept }`.
5. Njia ya kuelezea: punguza picha hadi `maxImages`, unda kidokezo kinachozingatia
   kazi, kagua kache ya maelezo, ita modeli ya maono **kwa sambamba**
   (`Promise.allSettled`), na uweke sehemu za maandishi za
   `[Image N]: <description>` mahali pake. Maelezo yaliyoshindikana hutoa `null`
   na sehemu asili ya picha **huhifadhiwa** (#4012) — isipokuwa kwenye njia ya
   kuelezea ya combo wakati maelezo yote yameshindwa, ambapo mfumo wa juu
   uliothibitishwa kutokuwa na uwezo wa kuona hupokea kibadala cha
   `(unavailable — no vision-capable provider connected)` badala yake (#8430).
6. Rejesha `modifiedPayload` + metadata (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Kiteuzi cha modi (`modalityBridgeVisionMode`)

| Modi       | Chaguomsingi | Tabia                                                                                                                                                                                                                                                                                                                     |
| ---------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔            | Mbinu ya zamani ya uamuzi, haijabadilishwa (#6640/#7204): modeli zisizo za combo/`auto/` huelekezwa upya kwa modeli bora ya maono isipokuwa modeli asili tayari ina vitambulisho vinavyoweza kutumika (kisha huelezea); malengo ya combo daima huelezea.                                                                  |
| `describe` |              | Elezea kila wakati — sehemu ya kuelekeza upya inarukwa kabisa; modeli iliyochaguliwa na mtumiaji daima hujibu.                                                                                                                                                                                                            |
| `reroute`  |              | Lazimisha kuelekeza upya: kinga ya kuhifadhi modeli yenye vitambulisho inapitiwa. Kinga ya vitambulisho vya **lengo** la kuelekeza upya bado inatumika — wakati hakuna lengo la maono linaloweza kutumika, ombi huendelea hadi kwenye kuelezea ili picha ghafi zisifikie kamwe mfumo wa nyuma wa maandishi pekee (#8430). |

Modi zilizolazimishwa hukatisha mchakato **kabla** ya mbinu ya kiotomatiki kuanza;
tabia ya `auto` inafanana baiti kwa baiti na kizuizi cha kabla ya PR-1.

#### Upeo wa ufunguo wa API (`visionBridgeKeyScope.ts`)

Wakati ufunguo wa API wa mwitaji unazuia `allowedConnections`, hifadhi za mgao
(`allowedQuotas`) au modeli (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), daraja huchagua
modeli za kuelekeza upya na kuelezea ambazo ufunguo huo unaruhusiwa kutumia,
kwenye miunganisho ambayo ufunguo huo unaruhusiwa kutumia. Kisha ombi la
kuelezea daima hupitia kitanzi-binafsi cha OmniRoute chenye kichwa cha
`x-omniroute-self-loop-key-id`, ili ombi la gumzo linalopokea litekeleze tena
sera ya muunganisho na modeli ya ufunguo huo. `enforceApiKeyPolicy()`
huheshimu kichwa hicho tu pamoja na bearer ya kitanzi-binafsi, hivyo kinaweza
tu kupunguza ufikiaji, na kitambulisho ambacho hakiwezi kupatikana hukataliwa.

Ikiwa hakuna modeli ya maono inayoruhusiwa kwa ufunguo huo, njia ya kuelezea
hujiondoa na ombi hupita bila kubadilishwa, ikiwa ni tabia ileile ya kuruhusu
ombi lipite wakati kuna hitilafu kama kizuizi kilichozimwa (metadata
`{ skipped: true, reason: "no_permitted_vision_model" }`). Maombi yasiyo na
ufunguo, na funguo zisizo na vizuizi hivi, hufanya kazi kama hapo awali.

#### Kidokezo cha kuelezea kinachozingatia kazi (`modalityBridgeVisionTaskAware`)

Chaguomsingi ni **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) huongeza
maandishi ya **ujumbe wa mwisho wa mtumiaji** (yaliyofupishwa hadi vibambo 500) kwenye kidokezo
cha msingi cha maelezo, ikielekeza maelezo kwenye kile ambacho mtumiaji aliuliza hasa
(muundo wa codex-vision-proxy) na kuiomba modeli ya kuona kunakili maandishi
yanayoonekana. Bendera ikiwa imezimwa — au ikiwa hakuna maandishi ya mtumiaji — kidokezo cha msingi hutumiwa bila kubadilishwa.

Ombi binafsi la describe self-loop linalooana na OpenAI (`callVisionModelSingle()`
katika `visionBridgeHelpers.ts`) huomba kila wakati `image_url.detail: "high"` —
bila masharti, kwa kila mwitaji/mtoa huduma, na halitegemei ishara yoyote ya kiteja.
Sampuli zenye maelezo machache hupunguza usahihi wa OCR kwa kazi hii hasa ya kunakili
maandishi ambayo kidokezo hiki huomba, kwa hivyo mwito wa describe wenyewe huomba maelezo ya
juu kila wakati bila kujali kiwango cha maelezo kilichotumiwa na ombi asili lililoingia. Hili
huathiri tu kiini cha ombi la ndani la describe; halibadilishi jinsi
OmniRoute inavyosambaza `image_url.detail` ya mwitaji mwenyewe kwenye ombi la msingi —
chaguomsingi hilo hutumika kando, na kwa viteja vya OpenCode vilivyotambuliwa pekee, katika
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Tawi la
umbizo la waya la Anthropic la describe self-loop halina uga wa `detail`
na haliathiriwi na chaguomsingi lolote kati ya hayo.

#### Kikomo cha matokeo ya describe (`modalityBridgeVisionMaxChars`)

| Ufunguo                        | Chaguomsingi | Masafa           |
| ------------------------------ | ------------ | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`          | `0` au 100–50000 |

`0` (chaguomsingi) humaanisha **hakuna kikomo** — maelezo yanayorejeshwa na
`callVisionModel()` hupitishwa bila kubadilishwa, na hivyo kuhifadhi tabia
iliyopo. Thamani yoyote katika masafa ya 100–50000 hufupisha maelezo kwa
kiambishi `…` kabla ya kuingizwa tena kama `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` katika `src/lib/guardrails/visionBridge.ts`).
Ongeza thamani hii kwa kazi za OCR zenye maelezo mengi ambapo modeli ya hatua inayofuata inahitaji
nakala kamili; ipunguze ili kudhibiti matumizi ya tokeni kwenye modeli za kuona zenye maelezo mengi.
Uga wa dashibodi upo kwenye paneli ya Advanced ya kichupo cha Vision
(`modality-bridge-max-chars` katika `ModalityBridgeVisionTab.tsx`) na huongeza thamani
yoyote kati ya 1 na 99 hadi kiwango cha chini cha 100 huku ukiacha `0` iliyobainishwa
bila kuguswa — `0` ni thamani halali ya Zod yenyewe
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), si tu
chaguomsingi la "unset".

#### Akiba ya describe (`modalityBridge/bridgeCache.ts`)

Akiba ya LRU + TTL ya ndani ya kumbukumbu kwa matokeo ya describe, inayoshirikiwa katika mchakato mzima.
Ufunguo = `sha256(imageRef + composedPrompt + configuredBridgeModel)` wenye
uundaji wa fremu kwa kutumia kiambishi cha urefu (hakuna migongano ya mipaka ya uga). Kipengele cha modeli ni
modeli ya daraja **iliyosanidiwa**, si modeli ambayo ilijibu kwa hakika —
`callVisionModel` inaweza kutumia mbadala ndani, na kuweka ufunguo kwa kila jaribio
kungegawanya akiba. Describe zilizoshindwa hazihifadhiwi kamwe. Mipangilio:

| Ufunguo                         | Chaguomsingi | Masafa  |
| ------------------------------- | ------------ | ------- |
| `modalityBridgeCacheEnabled`    | `true`       | —       |
| `modalityBridgeCacheTtlMinutes` | `60`         | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`        | 10–5000 |

#### Urekebishaji sanifu wa picha za mbali (describe ya self-loop/uchotaji wa base64)

Daraja linapochota picha ya **mbali** lenyewe — mwito binafsi wa describe wa Anthropic
na ubadilishaji wa base64 wa umbizo la waya la claude
(`ensureBase64ImagesForClaudeWire`), yote kupitia
`fetchRemoteImageAsDataUri()` katika `visionBridgeHelpers.ts` — URI ya data inayotokana
hupitishwa kwenye `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) kabla ya kupachikwa katika ombi la modeli
ya kuona. Picha kubwa kupita kiasi hupunguzwa hadi **ukingo mrefu wa 2048px** (sawa na
kikomo cha kubadilisha ukubwa ambacho OpenAI/Anthropic tayari hutumia upande wa seva), jambo linalopunguza
baiti za upakiaji/ucheleweshaji bila kubadilisha kile ambacho modeli ya kuona huona. Kubadilisha ukubwa
hutumia `sharp`, inayopakiwa kupitia uingizaji wenye nguvu: kwenye jukwaa ambapo faili yake asilia ya
binary inashindwa kupakiwa, `normalizeDataUri()` **haitoi hitilafu kamwe** — hurudi
kwenye upitishaji wa baiti asili bila kubadilishwa, ili njia ya describe/ubadilishaji wa base64
iendelee kufanya kazi kila wakati. Baiti ambazo si picha (uchotaji ambao haukurejesha picha
inayoweza kusimbuliwa) pia hupitishwa bila kuguswa. Urekebishaji huu unatumika tu kwa
picha ambazo daraja huchota kwa ajili ya mwito wake binafsi — hautumiki kamwe
kwa payload ghafi inayopitishwa ya mwitaji, sambamba na kanuni ya mabadiliko
kwa uamuzi wa kujiunga pekee (Hard Rule #20).

#### Skima ya mipangilio + uhamishaji

Vifunguo vipya vya `modalityBridge*` huthibitishwa na Zod katika `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, utatu wa `modalityBridgeCache*`, na kundi la
`modalityBridgeAudio*` linalotumiwa na Audio Bridge. Uhamishaji
`141_modality_bridge_settings.sql` hunakili thamani zilizopo za zamani za
`visionBridge*` kwenda kwenye vifunguo vipya vinavyolingana (unaweza kutekelezwa mara nyingi bila athari, na haubatilishi kamwe
thamani ya `modalityBridge*` iliyowekwa na mwendeshaji); vifunguo vya zamani vinaendelea kukubaliwa kama
mbadala wa usomaji kwa mzunguko mmoja wa toleo.

#### Kichwa cha uwazi + takwimu

Majibu yaliyobadilishwa na describe hubeba
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(kimeundwa na `buildModalityBridgeHeader()` katika `modalityBridge/bridgeStats.ts`,
na kuwekwa na `withModalityBridgeHeader()` katika `src/sse/handlers/chatHelpers.ts`).
Maombi yaliyoelekezwa upya hayapati kichwa — payload haikuguswa na ubadilishaji wa modeli
tayari unaonekana katika uga wa `model` wa kiini cha jibu.

`GET /api/modality-bridge/stats` (uthibitishaji wa usimamizi, kiwango sawa na
`GET /api/settings`) hurejesha vihesabu vya kila aina ya modali vilivyo kwenye kumbukumbu
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` kwa `vision`, `audio`, na
`video`. `averageLatencyMs` hutumia `latencySamples`, si majaribio yote, kama
kigawanyaji chake; operesheni isiyo na kipimo cha muda haitengenezi sampuli bandia
ya milisekunde sifuri. `bridged` hubaki kuwa lakabu inayooana na matoleo ya awali
kwa ubadilishaji uliofanikiwa; majaribio yaliyofeli hayakiongezi.
Vihesabu huwekwa upya mchakato unapoanzishwa upya kwa makusudi
(telemetria, si uhasibu).

#### Usanidi wa dashibodi

Ukurasa mahususi wa dashibodi ni
`/dashboard/settings/modality-bridge`. Vichupo vyake vya `Vision`, `Audio`,
na `Video` vinavyoweza kufikiwa kupitia URL huhifadhi vigezo vya hoja wakati wa kubadilisha thamani ya `tab`.
Kichupo cha Vision huonyesha uwezeshaji, hali, uteuzi wa modeli (ikiwemo chaguo-msingi
la kiotomatiki), uundaji wa maelekezo unaozingatia jukumu, vikomo vya kina vya muda wa kuisha/picha/urefu wa maelezo/akiba,
vihesabu vya wakati wa utekelezaji, na ombi la mfano lenye ulinzi. Kichupo cha Audio pia kinafanya kazi: huonyesha
uwezeshaji, kiteua modeli za STT pekee chenye Auto, vikomo vya muda wa kuisha/urefu wa juu wa klipu, vihesabu vya
sauti, na jaribio la mfano la `input_audio`. Kichupo cha Video kinafanya kazi: huripoti
hali ya wakati wa utekelezaji ya FFmpeg/ffprobe — mojawapo ya hali nne dhahiri za UI (`unknown` wakati
uchunguzi unaendelea au haukuweza kukamilika, `restricted` kwenye seva pangishi ya dashibodi isiyo ya loopback
ambapo uchunguzi unarukwa upande wa mteja, `unavailable` baada ya kuchunguzwa
na kuthibitishwa kutokuwepo, au `available` pamoja na matoleo ya FFmpeg/ffprobe) — huhifadhi
vikomo vya uwezeshaji/modeli/fremu/video/muda wa kuisha, huchuja kiteua modeli hadi modeli
zinazoweza kuchakata picha, na huonyesha vihesabu vya video.

Kadi ya zamani ya Vision Bridge chini ya mipangilio ya AI ni kiungo cha uoanifu kwenda kwenye
ukurasa mpya; haimiliki tena nakala ya pili ya fomu. Media Providers pia
huunganisha mitiririko ya kazi ya Image-to-Text na Speech-to-Text na vichupo husika vya Modality
Bridge bila kuondoa eneo la majaribio lililopo la Speech-to-Text.

**Upitaji wa ukaguzi wa ruhusa kwa mzunguko binafsi:** simu ya kuelezea inapopitishwa kupitia
mzunguko binafsi wa `/v1` wa OmniRoute (modeli isiyo ya kawaida ya mtoa huduma), ombi dogo hutuma
`x-omniroute-admission-bypass: internal` na huthibitishwa kwa kitambulisho kilichotatuliwa
cha mzunguko binafsi — kiashiria cha ndani cha `sk_omniroute` katika hali ya ndani, au
ufunguo wa mazingira wa `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` uliosanidiwa na mwendeshaji (#1350) ili
mifumo iliyosambazwa yenye `REQUIRE_API_KEY=true` bado iweze kutekeleza simu ya kuelezea. Upitaji huo
unakubaliwa kwa vitambulisho hivyo kamili pekee, kwa hivyo wateja wa nje hawawezi kutumia
kichwa hicho kuruka ukaguzi wa ruhusa.

Chaguo-msingi za zamani zipo katika `src/shared/constants/visionBridgeDefaults.ts`;
chaguo-msingi mpya za hali/uzingatiaji wa jukumu/akiba na kitatuzi cha mipangilio zipo katika
`src/shared/constants/modalityBridgeDefaults.ts`. Kizuizi cha usalama hutoa chaguo la konstrukta la
`deps` ili majaribio yaweze kuingiza utekelezaji bandia wa `getSettings` na
`callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Hunasa maombi ya gumzo yenye sauti kabla hayajafikia lengwa lisilojulikana
kukubali ingizo la sauti. Kamwe haielekezi upya ombi la gumzo: sehemu za sauti
hunukuliwa kupitia endpoint iliyopo ya multipart inayooana na OpenAI na
modeli ya gumzo iliyochaguliwa huendelea kwa kutumia nakala za maandishi.

Mtiririko:

1. Tatua `supportsAudio` kupitia `getResolvedModelCapabilities()`. Metadata dhahiri
   ya sajili ya mtoa huduma hutangulia, ikifuatiwa na metadata tuli ya modeli, kisha
   `modalities_input` iliyosawazishwa. Orodha iliyotangazwa ya ingizo isiyo na `audio` ni `false`;
   kutokuwepo kwa ushahidi wa uwezo hubaki `null`. `false` na `null` zote huamilisha
   daraja la tahadhari, huku `true` ikilipita.
2. Tatua mipangilio ya `modalityBridgeAudio*` na utoe sehemu za sauti za kiwango cha juu
   zinazoweza kuunganishwa kutoka kila ujumbe kupitia kigunduzi cha pamoja cha `detectMediaParts()`.
   Miundo ya waya inayotumika ni `input_audio` ya OpenAI, `audio_url`, na
   `source.media_type: "audio/*"`. Sauti iliyopachikwa ndani hugunduliwa kwa ajili ya uelekezaji lakini
   haiondolewi na njia ya uunganishaji. Kazi huwekewa kikomo na `modalityBridgeAudioMaxClips`;
   sehemu zinazofuata huachwa bila kubadilishwa.
3. Tumia `provider/model` iliyosanidiwa, au ruhusu `selectAudioBridgeModel()` ipitie
   `AUDIO_TRANSCRIPTION_PROVIDERS` kwa mpangilio thabiti wa katalogi na kuchagua
   modeli ya kwanza yenye kitambulisho halali na amilifu cha mtoa huduma.
4. `callAudioTranscription()` hubadilisha sauti ya base64/data-URI kuwa `file` ya multipart,
   au hupakua `audio_url` ya mbali kupitia ulinzi wa miunganisho ya nje inayoruhusu anwani za umma pekee,
   pamoja na ubandikaji wa DNS na kikomo cha MB 25. Kisha hutuma faili na modeli iliyochaguliwa
   kwa POST kwenda kwenye mzunguko binafsi wa ndani wa `/v1/audio/transcriptions`, uliothibitishwa kwa
   `resolveSelfLoopBearer()`. Njia iliyopo ya unukuzi hutekeleza utafutaji wa kawaida
   wa vitambulisho, ushughulikiaji wa muda wa kusubiri/kikomo cha kasi, na uelekezaji kwa mtoa huduma.
5. Simu zilizofanikiwa hubadilisha sehemu zake kuwa `[Audio N]: <transcript>`. Simu
   hutekelezwa kwa `Promise.allSettled`: kushindwa kwa simu moja huhifadhi sehemu hiyo asili
   ya sauti (mkataba wa #4012). Ikiwa simu zote zitafeli na imethibitishwa kuwa lengwa lina
   `supportsAudio === false`, sehemu hizo huwa
   `[Audio N]: (unavailable — no STT provider connected)` (mkataba wa #8430). Kwa
   lengwa lisilojulikana (`null`), matokeo ambayo yote yamefeli huachwa bila kubadilishwa. Lengwa
   lililothibitishwa kuwa la maandishi pekee lisilo na kitambulisho halali cha STT hupokea
   ujumbe huo huo dhahiri wa mbadala bila kutuma simu ya mtandao.

Nakala zilizofanikiwa hutumia akiba ya LRU/TTL ya Modality Bridge inayoshirikiwa na mchakato mzima.
Ufunguo huunganisha rejeleo la sauti, lebo thabiti ya operesheni ya `audio-transcription`,
na modeli ya STT iliyochaguliwa; kushindwa kamwe hakuwekwi kwenye akiba. Majaribio ya sauti husasisha
vihesabu vya pamoja vya `bridged`, `cacheHits`, `failures`, na `lastUsedAt`.
Majibu yaliyobadilishwa hubeba
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; maombi
yasiyobadilishwa hayapokei sehemu ya Audio Bridge.

Mipangilio ya wakati wa utekelezaji huhifadhiwa kwenye DB na kuthibitishwa kwa Zod:

| Ufunguo                       | Chaguo-msingi | Masafa                            |
| ----------------------------- | ------------- | --------------------------------- |
| `modalityBridgeAudioEnabled`  | `true`        | —                                 |
| `modalityBridgeAudioModel`    | `""`          | Otomatiki au Kitambulisho cha STT |
| `modalityBridgeAudioTimeout`  | `60000`       | 1000–300000                       |
| `modalityBridgeAudioMaxClips` | `3`           | 1–10                              |

Akiba ya pamoja inaendelea kudhibitiwa na `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, na `modalityBridgeCacheMaxEntries`.

### Daraja la Video (`videoBridge.ts`, `videoBridgePipeline.ts`)

Huzuia sehemu za video za kiwango cha juu katika `messages` za Chat Completions na `input` ya
API ya Responses kabla ya kuita lengo lisilo na uwezo wa asili wa video
unaojulikana. Miundo inayotumika ni `input_video`, `video_url`, `video_source`, URL za HTTPS,
na URI za data za `data:video/*;base64,...`. Majina ya kawaida ya faili katika maandishi hayachukuliwi
kuwa video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) inasimamia upitiaji wa ombi,
ukaguzi wa uwezo/sera, ujumlishaji wa kila ombi, na payload ya jibu.
Kazi ya kila video — upataji, akiba ya matokeo yote, ufafanuzi wa mfuatano wa fremu
(ambao huunganisha nakala yoyote ya sauti iliyotangazwa na mwitaji), pamoja na
vipimo/ukatishaji/usafishaji wa kila jaribio — imefichwa nyuma ya `processVideoPart` katika
`videoBridgePipeline.ts`, inayoitwa mara moja kwa kila sehemu ya video ndani ya kitanzi cha `preCall`.
Moduli hiyo pia hufafanua mipaka bayana ya milango `VideoMediaBrokerPort`
(upataji wa baiti na uchimbaji wa fremu zilizochukuliwa kama sampuli), `VideoAudioTranscriptionPort`
(uunganishaji wa nakala ya sauti iliyotangazwa na mwitaji na maelezo ya fremu zilizochukuliwa kama sampuli), na
`VideoDrilldownPort` (mpaka wa uhifadhi wa uchunguzi wa kina wa fremu; bado haujaunganishwa
kwenye `processVideoPart` — ni njia tofauti ya `/api/modality-bridge/video/drilldown`
pekee inayoandika maingizo ya uchunguzi wa kina kwa sasa).

Njia ya umma ya ombi ya `/v1` haiingizi wala kuanzisha mchakato mdogo kamwe. Video za mbali
hupakuliwa chini ya kikomo cha 50 MiB; video za base64 za ndani zina kikomo kihafidhina
cha 36 MiB baada ya kusimbuliwa kwa kila video ili bahasha ya modeli/ujumbe/uundaji wa fremu
iweze kubaki ndani ya kikomo cha umma cha 50 MiB cha kukubali maombi ya JSON. Urefu wa data ya ndani
na makadirio ya ukubwa baada ya kusimbuliwa hukaguliwa kabla ya kutenga kumbukumbu. HTTPS
inahitajika kwenye URL ya kwanza ya mbali na kila uelekezaji upya, kwa kutumia kinga iliyopo
ya mawasiliano ya nje ya umma pekee yenye ubandikaji wa DNS. Kisha baiti huvuka mpaka halisi wa ndani wa dalali wa
`POST /api/modality-bridge/video/extract`. Njia hiyo ni `LOCAL_ONLY` na
`SPAWN_CAPABLE`, inakubali tu ombi lililothibitishwa kwa kila mchakato kutoka kwa
loopback inayoaminika, na haikubali kamwe URL, njia ya mfumo wa faili, faili tekelezi,
au orodha ya hoja. Mfululizo wa kikomo cha ukubwa wa mwili wa API na kisomaji cha nyongeza cha mwili
cha kishughulikiaji hutekeleza kila kimoja kwa kujitegemea kikomo cha 50 MiB cha ingizo la dalali. Foleni yake yenye mipaka
huendesha uchimbaji mmoja kwa wakati mmoja, huruhusu kazi nne zinazosubiri, na huweka kikomo cha ingizo
linalosubiri kuwa 100 MiB.

Ndani ya dalali, `ffprobe` husoma faili binafsi ya ndani; orodha maalumu isiyobadilika ya
miundo inayoruhusiwa haijumuishi miundo ya orodha za uchezaji na manifesti. Kwa kontena zinazoruhusiwa za familia ya MOV,
marejeleo ya data ya nje ya MOV yanaendelea kulemazwa kwa chaguo-msingi, na
amri isiyobadilika haiyawezeshi. `ffprobe` na `ffmpeg` zote hutumia
orodha ya itifaki inayoruhusu `file` pekee, thread moja, safu zisizobadilika za hoja, bila shell,
na faili tekelezi zinazotafutwa kutoka `PATH`. Mitiririko ya picha za jalada iliyoambatishwa si
wagombea wanaoweza kuchezwa. Mitiririko yote inayoweza kuchezwa lazima itimize vikomo, na
mtiririko bayana wa chaguo-msingi hupendelewa kabla ya mbadala wa kudumu wenye faharasa ya chini zaidi.
Video zina kikomo cha sekunde 600, pikseli 8,192 kwa kila kipimo, na
pikseli chanzo 33,554,432. FFmpeg huchukua sampuli za fremu 1–16 za JPEG za katikati, hupunguza
ukingo mrefu hadi usiozidi pikseli 1,024 bila kukuza ingizo dogo, na
haipokei URL kamwe. Uchukuaji sampuli ni `uniform` kwa chaguo-msingi. Sera za hiari za
`scene_aware` na za majaribio za `segment_aware` hufanya pitio moja la ziada
lisilobadilika la FFmpeg juu ya mtiririko wa ndani ambao tayari umehakikiwa, huchagua mihuri ya muda yenye mipaka ya mandhari ya
`showinfo`, na hurudi kwa njia thabiti kwenye pointi zilezile za katikati zilizosambazwa sawasawa iwapo kitambuzi kitashindwa,
muda ukaisha, matokeo yakawa na muundo mbaya, au seti ya wagombea ikawa tupu.
Hali inayozingatia sehemu hutenga sampuli za pointi za katikati kwa uwiano wa
vipindi vya mandhari vilivyohakikiwa; ushahidi wa hali inayozingatia sehemu na tabia ya kurudi kwenye chaguo mbadala
zimefafanuliwa hapa chini. Kikomo kisichoweza kuzidi cha fremu 16
hutumika baada ya uteuzi katika kila sera. Ombi linalozingatia mandhari likiwa na
bajeti ya fremu moja pekee, hutumia pointi ya katikati iliyosambazwa sawasawa ya video nzima inayotumika au dirisha la
kulenga na huripoti `policyEffective: uniform`: fremu moja ya mandhari iliyochaguliwa
haiwezi kuhifadhi ncha zote mbili za muda. Mwitaji anaweza kwa hiari kutoa
dirisha lenye ukomo la kulenga (`start`/`end` kwa sekunde); mipaka hubanwa ili ilingane na muda wa media,
madirisha yaliyogeuzwa au yasiyo na kikomo hukataliwa, na sera zote za uchukuaji sampuli
hutekelezwa ndani ya kipindi kilichorekebishwa pekee. Dirisha linalotokana
hujumuishwa katika metadata ya uchukuaji sampuli na katika kiambishi awali kisichoaminika cha maelezo
ili modeli za baadaye ziweze kutofautisha dondoo iliyolengwa na ratiba kamili ya muda.

Ulengaji wa kisemantiki wa maelezo ya fremu ni mpangilio tofauti na bayana. Hali ya chaguo-msingi ya uchanganuzi ya `full`
huhifadhi kidokezo kilichopo cha fremu na kamwe haipitishi maandishi ya ombi
kwa modeli ya maelezo ya fremu. Katika hali ya `focused`, daraja husoma tu
`text`/`input_text` ya hivi karibuni isiyo tupu iliyoandikwa na mtumiaji kutoka kwenye kontena lilelile la Chat au Responses,
huisawazisha kuwa NFC, hukusanya herufi dhibiti na nafasi tupu,
na huiwekea kikomo cha pointi 500 za msimbo wa Unicode. Matokeo tupu hurudi kwenye
kidokezo halisi cha `full`. Dokezo linaloweza kutumika hubadilishwa kuwa JSON katika sehemu maalumu
ya muktadha usioaminika wa mtumiaji na linaweza tu kutanguliza maelezo yanayoweza kuonekana; haliwezi
kubatilisha onyo tofauti dhidi ya kufuata maagizo yanayoonekana
au kusikika katika media. Ulengaji wa kimaandishi haukisi `start`/`end` wala kubadilisha
kichukua sampuli cha muda.

#### Ushahidi wa kimuundo wa sehemu wa FU-07

`segment_aware` hutumia pitio moja la awali lenye mipaka kwenye mtiririko wa video wa ndani ambao tayari umehalalishwa. Msururu thabiti wa vichujio kwanza hupunguza ukubwa hadi upana usiozidi pikseli 320, hugundua mabadiliko ya mandhari na vipindi vilivyoganda, kisha huchukua sampuli kwa kasi ya fremu 1 kwa sekunde ili kupima ukungu, luma wastani, na taarifa za anga/muda. Pitio hilo lina kikomo cha sampuli 600 za kimuundo, uzi mmoja wa FFmpeg/kichujio, itifaki ileile ya `file` pekee na orodha za ruhusa za kontena, kikomo cha MiB 1 cha matokeo ya mchakato, na muda usiozidi sekunde 30 ndani ya usitishaji/muda wa mwisho unaoshirikiwa wa dalali. Halikubali kamwe amri, kichujio, njia, au URL kutoka kwenye ombi.

Thamani za kimuundo ni ushahidi wa sampuli unaoweza kurudiwa kwa uthabiti, si uelewa wa kisemantiki wa video. Hazibashiri wahusika, vitendo, manukuu, mazungumzo, au dhamira ya mtumiaji. Mipaka ya mandhari na kuganda huunda sehemu; kiwango cha kuganda, ukungu, mwangaza, maelezo ya anga, na mabadiliko ya muda huathiri tu jinsi bajeti iliyopo ya fremu 1–16 inavyogawiwa. Sehemu iliyoganda kabisa huwekewa kikomo cha fremu moja, huku sehemu zisizoganda zikishindania bajeti iliyobaki. Mipaka inapozidi idadi ya fremu, ufunikaji sawia wa ratiba ya muda hudumishwa ili mikato mingi ya haraka ya mapema isifiche sehemu ndefu ya mwisho. Mipaka ya mandhari iliyo ndani ya azimio la uchanganuzi la sekunde 1 kutoka kwenye mpaka wa kuganda huunganishwa.

Vichujio vinavyokosekana, ushahidi wenye hitilafu/ulio tupu, hitilafu ya kigunduzi, au kuisha kwa muda wa uchanganuzi wa awali wenye mipaka husababisha mfumo kurudi kwenye sera halisi ya sehemu za kati zilizosambazwa sawia. Usitishaji wa mpigaji au muda wa mwisho wa dalali hausababishi urejeaji huo: husitisha mchakato mdogo unaoendelea, huzuia uchimbaji wa fremu unaofuata, na mti wa muda wa faragha huondolewa katika `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` huzalisha vielelezo halisi vya FFmpeg vinavyoweza kurudiwa kwa uthabiti kwa ajili ya kupima upunguzaji wa miito ya manukuu baada ya uondoaji wa nakala, ugawaji wa bajeti kwa mwendo mwingi, ushahidi wa ukungu/mwangaza/SI-TI, mikato ya haraka yenye sehemu ndefu ya mwisho, na matokeo chanya ya uongo kutokana na kufifia taratibu. Hurekodi muda halisi uliopita wa uchanganuzi wa awali na, pale ambapo `/usr/bin/time` inapatikana, CPU ya mchakato-toto na kiwango cha juu cha RSS. Ukaguzi wake wa ubora ni vipimo rejea vya kimuundo pekee. Ubora wa modeli halisi ya manukuu hubaki `HOLD` kwa sababu mfumo huu wa majaribio hauna endpoint iliyoidhinishwa wala mwamuzi aliyefungiwa. Uokoaji wa kifedha pia hubaki `HOLD` isipokuwa `--caption-cost-per-call-usd` itoe makadirio dhahiri chanya ya gharama kwa kila mwito; hati hii haibuni kamwe mojawapo ya matokeo hayo.

Kila fremu ina kikomo cha MiB 4, fremu zote ghafi kwa pamoja zina kikomo cha MiB 23, na jibu la dalali lililofululizwa lina kikomo cha MiB 32. Saraka ya muda ya faragha huondolewa katika `finally`. OmniRoute haiji na FFmpeg na haikubali njia maalumu ya faili tekelezi. Kabla ya kuunda manukuu, daraja hutekeleza pitio la tahadhari la uondoaji wa nakala za picha: kila JPEG hupunguzwa kuwa bafa ya kijivu ya 16×16 na hulinganishwa tu na fremu ya mwisho iliyohifadhiwa. Kwa bajeti ya manukuu iliyoombwa inayozidi fremu moja, uchimbaji hutoa mkusanyiko wenye mipaka wa fremu teule usiozidi mara mbili ya bajeti hiyo na usiozidi kamwe fremu 16. Kikomo kilichoombwa hutumika tu baada ya uondoaji wa nakala, huku fremu teule ya kwanza na ya mwisho zikihifadhiwa wakati wa upunguzaji wa mwisho ikiwa bajeti ni angalau mbili. Sera yenye toleo la
`grayscale-16x16-mean-cells-v2` hutumia thamani kubwa zaidi kati ya tofauti ya luma wastani na uwiano wa seli za kijipicha ambazo tofauti yake iliyosawazishwa ni angalau 0.05. Kizingiti cha nakala ni thamani thabiti 0.04, iliyochaguliwa kwa ajili ya uwezo wa kutabirika badala ya kutolewa kama mpangilio wa wakati wa utekelezaji. Ishara hii ya pili yenye utofautishaji mkubwa huhifadhi mwendo mdogo na mabadiliko ya maandishi yanayoonekana ambayo ulinganisho wa wastani pekee unaweza kuficha. Hitilafu za kilinganishi au kisimbuzi-fumbuzi huruhusu mfumo kuendelea na kuhifadhi ufunikaji. Metadata ya matokeo hutenganisha fremu teule zilizochimbwa, fremu zilizotumiwa kwa mafanikio, na nakala za picha zilizoondolewa.

Sehemu ya video iliyowekewa alama wazi inaweza kuomba laha ya mawasiliano yenye mihuri ya muda. Daraja huunda gridi ya JPEG yenye safu wima zisizozidi 4 na fremu zisizozidi 16. Kila seli ya pikseli 512 huchapisha muhuri wa muda wa chanzo chake kwenye ukanda wa chini wenye utofautishaji mkubwa, huku mihuri hiyo ya muda ikiendelea kuwepo katika metadata ya maandishi kwa ajili ya uhusishaji na ukaguzi wa hatua zinazofuata. JPEG kamili hudumisha kikomo cha MiB 32. Ikiwa `sharp` haiwezi kusimbua au kuunda gridi, daraja hurudi kutumia fremu binafsi za JPEG; usitishaji wa mteja bado huenezwa kupitia operesheni ya laha.

Ushahidi wa kuidhinisha hatua inayofuata umetenganishwa kimakusudi na kipimo kidogo cha utendaji cha utungaji sanisi. `scripts/perf/video-bridge-contact-sheet-eval.ts` hufafanua mfumo wa majaribio wa A/B wenye schema yenye matoleo kwa modeli halisi za kuona zinazooana na OpenAI. Hupima tokeni zilizoripotiwa na mtoa huduma, ucheleweshaji wa mwanzo hadi mwisho kulingana na muda halisi (ikijumuisha utungaji wa laha), idadi ya miito ya modeli, na uhifadhi wa hoja uliobainishwa na manifest. Majibu ghafi ya modeli hayaandikwi kwenye ripoti; ni muhtasari wa SHA-256 na vitambulisho vya hoja vilivyolingana pekee vinavyohifadhiwa. Mfumo wa majaribio hautekelezi mwito wowote wa mtandao au wa modeli inayolipiwa isipokuwa `--execute-real` ipitishwe na `--model`, `OMNIROUTE_BASE_URL`, na `OMNIROUTE_API_KEY` ziwe zimesanidiwa. Bila utekelezaji huo halisi ulioidhinishwa wazi, uamuzi wake unaosomeka na mashine hubaki `HOLD`; vipimo vya mzigo sanisi/idadi ya miito pekee si ushahidi wa kuidhinisha hatua inayofuata.

Wapigaji wanaweza kuambatisha safu ya hiari ya `transcript.cues` kwenye sehemu ya video inayotumika wakati tayari wana maandishi yaliyopangiliwa kwa muda. Kila kidokezo lazima kiwe na `text`, kipindi chenye kikomo cha `start`/`end` kilicho ndani ya muda uliopimwa, na `source` iliyo kwenye orodha ya ruhusa (`client`, `embedded`, au `audio-bridge`); thamani chaguo-msingi ya `confidence` ni `1` na lazima ibaki kati ya `0` na `1`. Vidokezo vinavyofanana kabisa huunganishwa. OmniRoute haianzishi kamwe unukuzi kutoka kwenye metadata hii: vidokezo vilivyohalalishwa hunakiliwa kwenye matokeo yaliyoelezwa pamoja na chanzo, kiwango cha uhakika, na kipindi, kisha huwasilishwa kama uchunguzi usioaminika sambamba na manukuu ya fremu. Maandishi batili, yaliyo nje ya masafa, au yasiyo na asili inayothibitishwa hukataliwa badala ya kuchanganywa kwenye mtiririko wa manukuu. Njia zote mbili za nakala katika mwili wa ombi husawazisha asili iliyotolewa kuwa `client`, ikijumuisha lebo za `embedded` au `audio-bridge` ambazo mtumiaji amejitambulishia mwenyewe. Ni adapta inayomilikiwa na seva pekee inayoweza kuweka lebo hizo zinazoaminika kupitia hoja ya msimbo pekee ya `trustedSource`; uga wa JSON wa ombi hauwezi kufikia hoja hiyo. Maandishi ya nakala hubaki kuwa maudhui yasiyoaminika yaliyotokana na midia, bila kujali asili yake, na hayapaswi kamwe kuamua uidhinishaji.

Mpigaji wa hali ya juu anaweza kutoa njia ya `audioTranscript` kwa video hiyo hiyo;
huchukuliwa kama maandishi yaliyotolewa na mteja, si uthibitisho wa unukuzi wa seva.
Kiunganishi cha muunganisho huendesha uchunguzi wa picha na sauti chini ya
kikomo kimoja cha muda na ishara moja ya kusitisha, huupanga kwenye ratiba ya pamoja, huunganisha
nakala zinazofanana kabisa, na huripoti matokeo ya sehemu wakati upande mmoja pekee unapofaulu.
`audioTranscript` batili hushushwa hadi matokeo hayo ya sehemu — maelezo ya
picha huhifadhiwa na tawi la sauti hurekodi msimbo wa hitilafu uliosafishwa —
badala ya kusababisha video nzima ishindwe. Upatikanaji wa kila tawi, alama ya matokeo ya sehemu,
na misimbo ya hitilafu iliyosafishwa huhifadhiwa katika matokeo yaliyofafanuliwa, katika
metadata ya vizuizi vya usalama (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), katika metadata ya akiba ya matokeo, na katika vihesabio vya
muunganisho vya daraja. Njia chaguo-msingi ya Video Bridge haiiti ubadilishaji wa matamshi kuwa maandishi
wala kupakua nakala ya pili ya midia; bila njia hiyo iliyobainishwa wazi, hubaki
ya video pekee.

**Uhifadhi wa nakala ya maneno (#12150 P1).** Hii hutumika kiotomatiki wakati wowote
Video Bridge (ambayo yenyewe ni ya kuchagua) inapowasilisha kidokezo cha nakala ya maneno — hakuna
alama tofauti ya uhifadhi. Ombi linapowasilisha kidokezo chochote cha nakala ya maneno (iwe `transcript`
iliyotangazwa na mpigaji au `audioTranscript` iliyounganishwa), kizuizi cha usalama hukitia alama ya
`videoBridgeObserved` na kuunda kivuli kilichofichwa cha maelezo ya video —
uwasilishaji unaofanana ambapo sehemu ya maandishi huria ya kila kidokezo hubadilishwa na
`[redacted-video-transcript]`, iliyoundwa kwa kubadilisha uga wa kidokezo uliopangiliwa
kabla ya tungo kuundwa (kamwe si kwa kuchanganua maandishi yaliyosawazishwa, hivyo hakuna maudhui ya
kidokezo — ya kihasama au ya kawaida, ikijumuisha sehemu zilizo na `]` kama vile
`[inaudible]`/`[music]` — yanayoweza kubaki). Mwili wa ombi wa kumbukumbu ya simu unaohifadhiwa hubadilisha
kila sehemu ya maandishi inayotokana na video kwa kivuli hicho kilichofichwa, kwa kulinganisha
usawa wa maudhui; nanga ya `fullText` husomwa upya kutoka kwenye payload iliyokamilika ya
kizuizi cha usalama cha kabla ya simu, ili ulinganishaji bado ufaulu baada ya vizuizi vya usalama vya baadaye
katika mnyororo (vifichaji vya PII na vitambulisho vya siri, vipaumbele 10/95) kuandika upya
maandishi ya maelezo papo hapo na baada ya udungaji wa kidokezo cha mfumo/makabidhiano/kumbukumbu
kubadilisha umbo la safu ya ujumbe. Mwili unaotumwa juu hadi kwa modeli haubadilishwi.
Ombi lililotazamwa pia halijazi Kumbukumbu yoyote ya kudumu (uchimbaji unaotokana na ombi
na jibu hurukwa), hivyo jibu la modeli yenyewe haliwezi kurudia maandishi ya nakala hiyo
kwenye Kumbukumbu.

**Nyuga ghafi za video (#12430).** Daraja linapowashwa na usaidizi asilia wa video haujulikani au haupo, nyuga zilizofafanuliwa za `transcript`/`audioTranscript` pia huwasha `videoBridgeObserved`, hata baada ya kushindwa kwa maelezo au kikomo cha `maxVideos`. `null` na tungo tupu huhesabiwa; nyuga ambazo hazipo na metadata isiyo ya video hazihesabiwi. Nakala zinazohifadhiwa huficha nyuga hizi au huacha ombi, na akiba/Kumbukumbu hupitwa.

Kwenye njia hizo mbadala, vidokezo halali vya mpigaji hubadilika kuwa sehemu zinazotumika za `text`/`input_text`
badala ya nyuga zisizo za kawaida za mtoa huduma. Njia zote mbili zilizotolewa na ombi
hubaki uchunguzi wa `client` usioaminika, zikiwa na onyo la wazi kwamba video
haikufafanuliwa na mihuri ya muda haikuthibitishwa dhidi ya midia. Vikomo vilivyopo vya
vidokezo 256/jumla ya 64-KiB na vya kila kidokezo hutumika kwa njia hizo mbili kwa pamoja;
mihuri ya muda lazima itoshee ndani ya ukomo wa sekunde 600 wa wakala na dirisha lolote la
kulenga lililotolewa. Njia batili hutupwa, hazipitishwi kama maandishi holela; njia
halali sambamba bado inaweza kutumiwa isipokuwa bajeti yao ya pamoja imezidiwa. Nyuga za
null/tupu haziongezi maandishi. Hakuna uletaji wa midia au unukuzi unaoongezwa na njia hii mbadala.
Nyuga za kiendelezi cha nakala ya maneno huondolewa kutoka kwenye kibebaji cha video cha njia mbadala na
vitu vyake vya `video_url`/`source`. Orodha ya ruhusa ya waya ya OpenAI hubaki kali; vibebaji vya video
ambavyo usaidizi wake asilia haujulikani hubaki vinapatikana na malengo yanayojulikana kuwa ya maandishi pekee huhifadhi viashiria salama.
Vivuli vya ufichaji vilivyopangiliwa hulinda maandishi ya nakala yaliyoongezwa, huku
ombi asilia linalomilikiwa na mpigaji likibaki bila kubadilishwa. Malengo yenye usaidizi asilia na
madaraja yaliyozimwa hudumisha tabia yao iliyopo ya kupita moja kwa moja.

Nakala za ziada zinazohifadhiwa hutumia ishara ileile ya ombi lililotazamwa. Taswira ghafi
ya ombi la mteja kabla ya kizuizi cha usalama, ombi linalosubiri kwenye kumbukumbu, na kumbukumbu ya
ombi lililokataliwa mapema hubadilisha nyuga za nakala ya maneno kimuundo katika sehemu za video;
vidokezo vya tungo vilivyoundwa na hatua za pipeline na makabidhiano ya muktadha hufichwa
kwenye mwisho wa mwili wa ombi unaohifadhiwa. Kiashiria cha `video_content_removed`
kinachohifadhiwa husababisha mwendelezo wa `previous_response_id` kufungwa kwa usalama badala ya kuunda upya
maandishi yaliyotupwa kimakusudi. Ikiwa ombi lililotazamwa litapoteza
kivuli chake cha ufichaji cha kila sehemu kabla ya kurekodiwa, au hata kivuli kimoja kati ya vivuli kadhaa vya video
kishindwe kulingana baada ya mabadiliko ya baadaye ya ombi, mwili wa ombi unaohifadhiwa
huachwa kabisa badala ya kuhifadhi nakala ya maneno iliyofichwa kwa sehemu tu.

Kwa ombi lililotazamwa, jibu la modeli linaweza kunukuu sehemu yoyote ya
nakala ya maneno bila mpaka wa kidokezo uliopangiliwa. Kwa hiyo, `responseBody` yake ya
kumbukumbu ya simu inayohifadhiwa hubadilishwa na kiashiria cha kuachwa; artefakti ya kina ya
pipeline (ambayo inaweza kujumuisha miili ya upstream/mteja na vipande vya mtiririko)
haihifadhiwi. Akiba za kisemantiki, uthibitishaji wa kutorudia, na uchezaji-upya wa hoja
hupitisha usomaji na uandishi kwa ombi hilo. Ombi la mtoa huduma na jibu linaloonekana kwa
mteja hubaki bila kubadilishwa. Baiti za mapema za keepalive huondolewa kutoka kwenye bafa ya muda
wakati artefakti ya kina inapoachwa. Onyo la EventStream yenye hitilafu la Kiro
huripoti idadi ya baiti za payload pekee, kamwe si maudhui yake wala hitilafu ghafi ya
kichanganuzi cha JSON.
Hii haidai kwamba kila uchunguzi mwingine usiohusiana wa mtoa huduma/plugin
umekaguliwa; ukaguzi mpana zaidi wa sehemu zinazohifadhi data unafuatiliwa katika #11658.

Mzunguko wa maisha wa ndani wa `/api/modality-bridge/video/drilldown` ni safu tofauti ya akiba inayotumia loopback/uthibitishaji wa tokeni. Kila operesheni pia inahitaji kitambulisho rasmi kisichoeleweka cha mhusika mkuu. Kabla mpigaji wa uzalishaji hajawashwa, lazima atoe kitambulisho hicho kutoka kwa mpangaji aliyethibitishwa na kamwe asipeleke thamani iliyochaguliwa na mteja. Vifunguo vya akiba humfunga mhusika huyo mkuu kwa vitambulisho rasmi vya kipindi na marejeleo ya video, huhifadhi tu vifunguo vyake vilivyotolewa kwa SHA-256, na huweka usomaji na ufutaji katika upeo wa mhusika mkuu huyo huyo. Akiba huhifadhi fremu zisizozidi 16 za JPEG zilizotolewa kwa kila ingizo, huzifuta baada ya dakika kumi, na inaruhusu usomaji wenye mipaka wa `start`/`end` au ufutaji wa kipindi uliobainishwa wazi.

Kila mhusika mkuu anawekewa kikomo cha maingizo 16 na MiB 64 za data rasmi ya JPEG. Vikomo hivyo vinajitegemea kutoka kwa kikomo cha jumla cha maingizo 64/MiB 256: shinikizo la kiwango cha mhusika mkuu huondoa tu maingizo ya mhusika huyo ambayo hayajatumiwa kwa muda mrefu zaidi kabla ya uondoaji wa jumla wa LRU kuzingatiwa. Maingizo yaliyoisha muda wake huondolewa katika hesabu za mhusika mkuu na za jumla wakati wa shughuli za akiba, huku kughairi na kushindwa kwa uthibitishaji kutowasilisha mbadala usiokamilika.

Akiba hukataa Base64 isiyo rasmi, padding iliyozidi, midia isiyo JPEG, JPEG zilizoharibika au zilizokatwa, na JPEG zinazosababisha onyo wakati wa usimbuaji wenye mipaka wa picha nzima kwa `sharp`. Husimba upya kila picha iliyokubaliwa kuwa JPEG rasmi, hupata upana na urefu kutoka kwa baiti zilizosimbuliwa badala ya kuamini sehemu za mpigaji, na hutupa baiti zozote za ziada za polyglot badala ya kuzihifadhi. Ni bafa iliyobanwa rasmi yenye mipaka pekee inayohesabiwa katika viwango vyote viwili. Kikomo cha JSON kwenye njia ya mawasiliano kinajumuisha gharama ya ziada ya Base64 kwa kikomo cha ingizo lililosimbuliwa cha MiB 32. Kila
utoaji uliohifadhiwa hurekodi umbizo/azimio lake la JPEG lililothibitishwa, sera ya sampuli, toleo la utoaji, muda wa kuundwa, hashi ya maudhui iliyokokotolewa na seva, pamoja na rejeleo kuu lililohashiwa na hashi ya maudhui kuu ya mpigaji anayeaminika. Ughairi hukaguliwa kati ya awamu zisawazishaji za usimbuaji na hashing kabla ya uwasilishaji atomiki kwenye akiba.

Awamu hii bado haiunganishi mzalishaji wa uzalishaji kwenye route na haitoi uteuzi wa vibadala vya maazimio mengi. Kwa hiyo, njia ya maombi ya Video Bridge iliyo wazi haiongezi kazi yoyote, huku utoaji wa mhusika mkuu unaofungamanishwa na mpangaji na mzunguko kamili wa maisha wa FU-08 wa maazimio mengi vikisalia kuwa kazi za ufuatiliaji zilizobainishwa wazi badala ya kuandikwa kuwa tabia iliyokamilika.

Fremu huwekewa maelezo mafupi kwa mfuatano kwa kutumia modeli ya Video iliyosanidiwa. Ubatilishaji tupu wa Video hurithi mpangilio wa Vision; ikiwa zote mbili ni tupu, kisambaza-kiotomatiki cha Vision huchagua modeli inayofaa yenye uwezo wa kuona. Maelezo mafupi yaliyofaulu hubadilisha sehemu asili kwa kiambishi awali thabiti cha `[Video description:` ambacho pia huashiria maandishi hayo kuwa uchunguzi usioaminika uliotokana na midia na kuziambia modeli za hatua zinazofuata kutofuata maagizo yaliyopatikana kwenye midia. Vifunguo vya akiba ya maelezo mafupi ya fremu hujumuisha baiti za JPEG, kidokezo, muhuri wa muda na modeli inayotumika; ni maelezo mafupi yaliyofaulu pekee yanayohifadhiwa kwenye akiba. Maingizo ya akiba huhifadhi modeli halisi ya mzalishaji iliyofaulu, ikiwa ni pamoja na modeli mbadala; bridge huripoti `mixed` wakati fremu tofauti zilitolewa na modeli tofauti. Upatikanaji kutoka kwenye akiba hutumia tena utambulisho huo wa mzalishaji badala ya kuupa upya lebo kama mpango wa uelekezaji ulioombwa. Akiba ya matokeo ya video nzima huwekewa ufunguo kulingana na kila ingizo linalobadilisha tokeo — kidokezo, modeli inayotumika, sera ya sampuli, idadi ya fremu, hali ya uchanganuzi wa kisemantiki, alama ya SHA-256 ya kidokezo cha lengo kilichosawazishwa, dirisha la lengo, `transcript`, `audioTranscript`, na bendera ya contact-sheet — kwa hivyo kubadilisha kipengele chochote kati ya hivyo husababisha kutopatikana kwenye akiba, wala si kutumia tena data ya zamani. Toleo la sera ya uondoaji wa nakala rudufu zinazoonekana, kizingiti na idadi yenye mipaka ya fremu teule pia hubainishwa wazi katika ufunguo na metadata ya akiba ya matokeo; hivyo, badiliko la sera haliwezi kutumia tena maelezo ya zamani ya video nzima. Metadata ya v4 ya akiba ya matokeo huhifadhi hali na alama, kamwe si jukumu ghafi la mtumiaji. Metadata ya vizuizi vya usalama huripoti hali za uchanganuzi zilizoombwa na zinazotumika; hali ya `focused` iliyoombwa bila maandishi ya mtumiaji yanayoweza kutumika huripotiwa kuwa `full` kwa ufanisi.

Kizuizi cha usalama hutoa kila sehemu ya video inayotumika lakini hakielezi zaidi ya `modalityBridgeVideoMaxVideos`. Kwa lengo lililothibitishwa kuwa na
`supportsVideo === false`, video zilizoshindwa na zilizozidi kikomo hubadilishwa kuwa viashiria salama vya maandishi ili hakuna video ghafi inayosalia. Uwezo unapokuwa haujulikani, sehemu hizo huhifadhi kibebeo chake cha video; nakala yoyote mbadala ya mazungumzo hufuata ubadilishaji wenye mipaka wa maandishi ulioelezwa hapo juu. Malengo yenye `supportsVideo === true` hupita bridge bila kuchakatwa. Ishara ya kughairi ombi la mteja huenezwa kupitia upakuaji, foleni ya broker, subprocesses na miito ya maelezo mafupi; ughairi husimamisha uchakataji kati ya video na kamwe hauruhusu midia ghafi kupita inaposhindwa.

Mipangilio ya runtime huhifadhiwa kwenye DB na kuthibitishwa kwa Zod:

| Ufunguo                             | Chaguo-msingi | Masafa / tabia                                                                                                                  |
| ----------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`       | Mazingira ya utekelezaji ya hiari, yanayowashwa kwa uamuzi wa mtumiaji                                                          |
| `modalityBridgeVideoAnalysisMode`   | `"full"`      | `full` huhifadhi maelezo mafupi ya jumla; `focused` hutumia muktadha wa hivi karibuni wa mtumiaji ulio na mipaka na usioaminika |
| `modalityBridgeVideoModel`          | `""`          | Hurithi modeli ya Vision Bridge                                                                                                 |
| `modalityBridgeVideoFrameCount`     | `8`           | 1–16                                                                                                                            |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`   | `uniform`, `scene_aware`, au `segment_aware` ya uwiano; hitilafu ya kitambuzi hurudi kwa `uniform`                              |
| `modalityBridgeVideoMaxVideos`      | `1`           | 1–4                                                                                                                             |
| `modalityBridgeVideoTimeout`        | `120000`      | 1000–120000 ms                                                                                                                  |

Thamani za zamani zilizohifadhiwa za muda wa kuisha wa Video zinazozidi sekunde 120 hubanwa hadi
kikomo cha muda cha wakala; majaribio mapya ya kuandika mipangilio yanayozidi kikomo hicho hukataliwa.
`GET /api/modality-bridge/video/runtime` huhitaji eneo la loopback la kuaminika
lililotiwa muhuri kabla ya uthibitishaji au uchunguzi wa mazingira ya utekelezaji, kisha huhitaji
uthibitishaji wa usimamizi. Hurejesha tu `available`, matoleo yaliyosafishwa ya FFmpeg/ffprobe, na sababu
isiyobadilika wakati mazingira ya utekelezaji hayapatikani. Endpoint ya ndani ya uchimbaji si
API ya umma ya upakiaji: kujaa kwa foleni hurejesha `503` pamoja na `Retry-After`, kukatika kwa muunganisho
wa mpigaji simu hurejesha `499`, na kikomo kisichobadilika cha muda cha wakala hurejesha `504`. Majibu yaliyobadilishwa huongeza
`video->text;model=<visionModel>;parts=<videos>` kwenye header kuu ya
`x-omniroute-modality-bridge` bila kuondoa sehemu za Vision au Audio.

### Kificha PII (`piiMasker.ts`)

Hufanya kazi katika hatua **zote mbili**.

- **`preCall`** hunakili payload, hupitia `system`, `messages`, `input`, na
  `prompt` (ikiwemo vipengee vya string wazi), na hutumia `processPII()` (kutoka
  `@/shared/utils/inputSanitizer`) kwenye sehemu za string za `content`/`text`. Wakati
  `PII_REDACTION_ENABLED=true`, PII iliyotambuliwa hufichwa katika payload
  inayotumwa. Hii haitegemei `INPUT_SANITIZER_MODE` (ambayo hudhibiti tu
  sera ya prompt-injection). Wakati ufichaji umezimwa, ombi hurekodi idadi
  ya utambuzi bila kuandika upya maudhui.
- **`postCall`** hunakili jibu kwa kina, huendesha `sanitizePIIResponse()` pamoja
  na kificha cha muundo wa Responses-API (`maskResponsesOutput` — hushughulikia
  `output_text` na `output[].content[].text`). Ikiwa ufichaji wowote unatokea,
  jibu lililorekebishwa huchukua nafasi ya la awali.

Kizuizi kamwe hakizuii; huweka tu maelezo (`meta.detections`,
`meta.redacted`) au huandika upya.

#### Uchaguzi kulingana na aina, ruwaza maalum na vihesabu vya utambuzi

**Dashibodi → Mipangilio → Usalama → Ufichaji wa PII** huchagua _nini_ kifichwe. Hakiwashi
ufichaji: hilo bado hudhibitiwa na `PII_REDACTION_ENABLED` (ombi) na
`PII_RESPONSE_SANITIZATION` (jibu + SSE), ambazo zote zimezimwa kwa chaguo-msingi.

- **Uchaguzi kulingana na aina** — id zilizojengewa ndani zimeorodheshwa katika
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Kutoweka kwa thamani humaanisha kila
  aina (tabia iliyokuwepo kabla ya mpangilio huu). Ruwaza ya injini ya ombi ya
  `ssn_us` huunganishwa na `ssn`. Violezo (Minimal, Standard, Financial,
  Brazilian, USA, Full) hujaza tu visanduku vya kuteua katika UI.
- **Ruwaza maalum** — hadi ruwaza 20 za regex au wildcard (`*` = hadi herufi 64
  zisizo nafasi tupu, `?` = moja). Ulinganifu hubadilishwa kuwa `[CUSTOM_REDACTED]`.
  Kila ruwaza hupitia `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): isizidi herufi 500, flags zimewekewa kikomo
  cha `g i m s u`, lazima ikubalike wakati wa compilation, lazima ipite `safe-regex` (urejeaji
  wa nyuma wenye madhara makubwa), na lazima isilingane na string tupu au kishikilia-nafasi cha ufichaji.
  Ruwaza inayoshindwa hukataliwa wakati wa kuhifadhiwa na kujaribiwa, na safu iliyohifadhiwa
  inayoshindwa hurukwa wakati wa utekelezaji badala ya kufanyiwa compilation. Ruwaza maalum
  huendeshwa tu wakati ufichaji umewashwa.
- **Vihesabu vya utambuzi** — idadi kwa kila aina (kamwe si thamani zilizolingana), huhifadhiwa
  kwenye kumbukumbu na kuwekwa upya mfumo unapoanzishwa upya (`src/lib/pii/piiDetectionStats.ts`). Huongezeka tu
  wakati ufichaji umewashwa.

Mipangilio huhifadhiwa katika jedwali la `key_value` (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) na husomwa kupitia cache ya sekunde 1. API:

| Mbinu  | Njia                     | Kusudi                                                                             |
| ------ | ------------------------ | ---------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Hali ya flag, `enabledTypes`, `customPatterns`, vihesabu vya utambuzi              |
| `PUT`  | `/api/settings/pii`      | Badilisha `enabledTypes` (`null` = zote) na/au `customPatterns`                    |
| `POST` | `/api/settings/pii/test` | Jaribio kavu la ruwaza moja dhidi ya sampuli ya hadi KB 8; hakuna kinachohifadhiwa |

Zote tatu huhitaji uthibitishaji wa usimamizi na huthibitisha body kwa kutumia Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Uingizaji wa Prompt (`promptInjection.ts`)

Hutambua miundo hasidi katika maudhui yaliyotolewa na mtumiaji na kutekeleza
sera iliyosanidiwa. Tabia huamuliwa na environment variables na options za constructor:

| Mpangilio            | Kibadilika cha mazingira                                                                                  | Chaguo-msingi | Athari                                                                                                                                                                                                          |
| -------------------- | --------------------------------------------------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Imewashwa            | `INPUT_SANITIZER_ENABLED`                                                                                 | `true`        | Ikiwa `false`, safu ya ulinzi hukatisha mchakato mapema.                                                                                                                                                        |
| Modi                 | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                           | `warn`        | Sera ya uingizaji: `block`, `warn`, au `log`. (`redact` inakubaliwa kwa uoanifu wa nyuma lakini **haiondoi** maandishi ya uingizaji; uandishi upya wa PII katika ombi unadhibitiwa na `PII_REDACTION_ENABLED`.) |
| Kizingiti cha kuzuia | chaguo la `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (lakabu `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`        | Kiwango cha chini cha ukali kinachohitajika ili kuzuia. Kiwango cha kati ni cha uchunguzi pekee kwa chaguo-msingi.                                                                                              |

**Kipaumbele cha modi** (`getMode`): `options.mode` ya mwitaji →
ubatilishaji wa **alama ya kipengele ya DB** ya `INJECTION_GUARD_MODE` (Dashibodi → Mipangilio →
Alama za Vipengele) → env ya `INJECTION_GUARD_MODE` → env ya `INPUT_SANITIZER_MODE` →
`warn`. Kwa hivyo, ubatilishaji wa dashibodi una kipaumbele kuliko vibadilika vya mazingira, hivyo UI ya Alama za
Vipengele hudhibiti ulinzi unaoendeshwa moja kwa moja (bila kuwasha upya). Usomaji wa DB ni salama unaposhindwa:
ukipata hitilafu, ulinzi hurudi kwenye tabia inayotegemea mazingira, na wakati hakuna
ubatilishaji uliowekwa, tabia hufanana na utatuzi unaotegemea mazingira pekee.

Vyanzo vya utambuzi:

1. `sanitizeRequest()` kutoka `@/shared/utils/inputSanitizer` (seti ya kigunduzi inayoshirikiwa
   na kutumika kwingineko kwenye mfululizo wa uchakataji).
2. `DEFAULT_GUARD_PATTERNS` zilizojengewa ndani (kwa sasa `system_override_inline` na
   `markdown_system_block`, zote zikiwa na ukali wa `high`).
3. `customPatterns` za hiari zinazopitishwa kupitia machaguo ya kijenzi (mifuatano, regex,
   au rekodi za `{ name, pattern, severity }`).

Wakati `mode === "block"` **na** angalau utambuzi mmoja unafikia kizingiti cha
ukali, `preCall` hurejesha `{ block: true, message: "Request rejected:
suspicious content detected" }`. Katika modi za `warn`/`log`, safu ya ulinzi huandika kumbukumbu lakini
inaruhusu mwito. Kisaidizi kinachoshirikiwa `evaluatePromptInjection()` pia husafirishwa
kwa waitaji wanaohitaji kutathmini vidokezo bila kupitia sajili.

**Kikomo cha uchanganuzi (v3.8.20):** kigunduzi hukagua tu **KB 16 za kwanza** za
maandishi ya kidokezo yaliyounganishwa — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (baiti 16 384) katika
`src/shared/utils/inputSanitizer.ts`. `detectInjection()` na
`evaluatePromptInjection()` zote hutumia `slice(0, MAX_INJECTION_SCAN_BYTES)` kabla ya kuendesha
kitanzi cha ruwaza. Maelekezo ya uingizaji huwa karibu na mwanzo wa ingizo, kwa hivyo hii
huwekea kikomo matumizi ya CPU/GC ya regex kwenye mizigo yenye mamia ya KB bila kudhoofisha utambuzi (ling.
#3932, #4041).

### Kificha Vitambulisho (`credentialMasker.ts`)

Huendeshwa katika hatua **zote mbili**, ikiwa ya mwisho katika mnyororo chaguo-msingi (kipaumbele `95`). Huficha
ruwaza zinazojulikana za funguo za API / tokeni za siri kutoka kwenye mzigo unaotoka (maudhui ya
ujumbe, hoja za miito ya zana, matokeo ya zana) **na** jibu la mtoa huduma, ili
kitambulisho kilichobandikwa kwenye kidokezo (au kurudiwa na matokeo ya zana) kisivujishwe
kwa mtoa huduma wa juu au kurudishwa kwa mteja.

- **Huwashwa kwa kuchagua pekee**, kwa kufuata kanuni sawa na ufichaji wa PII (karibu na Kanuni Ngumu #20):
  imezimwa isipokuwa `settings.credentialRedactionEnabled === true` **au**
  `CREDENTIAL_REDACTION_ENABLED=true`. Ikiwa imezimwa, safu ya ulinzi haifanyi chochote —
  haizuii kamwe wala kuandika upya.
- `redactCredentials()` hupitia mti mzima wa mzigo/jibu (`walkValue()`,
  salama dhidi ya uchafuzi wa prototype, salama dhidi ya mizunguko kupitia `WeakSet`) na hubadilisha ulinganifu kwa
  kishikilia nafasi cha `[REDACTED:<type>]`, huku ikinakili matawi yaliyobadilika
  pekee.
- `CREDENTIAL_PATTERNS` hushughulikia funguo za watoa huduma wa LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokeni za VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), funguo za malipo (Stripe, Square), funguo za
  wingu (funguo ya ufikiaji ya AWS, Twilio, SendGrid, Mailgun), funguo binafsi / JWT,
  mifuatano ya miunganisho yenye vitambulisho (`mongodb://user:pass@...`, n.k.), na
  ruwaza ya jumla ya thamani ya kichwa cha `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Funguo zenye muundo wa vichwa (`authorization`, `x-api-key`, `api-key`,
  `apikey`) hufichwa kimuundo (thamani pekee, huku kiambishi awali cha skimu kama
  `Bearer `/`Basic ` kikihifadhiwa) badala ya kupitia regex ya jumla ya maandishi.
- Safu ya ulinzi haizuii kamwe; huandika upya pekee (`modifiedPayload` /
  `modifiedResponse`) na kuongeza maelezo (`meta.credentialsRedacted`, `meta.count`).

Kizuizi cha kurudi nyuma: `tests/unit/credential-masker-guardrail.test.ts`.

## Mkataba wa Msingi (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true husitisha mnyororo mara moja
  message?: string; // huonyeshwa wakati wa kuzuia
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // hurejeshwa na preCall ili kuandika upya ombi
  modifiedResponse?: TValue; // hurejeshwa na postCall ili kuandika upya jibu
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Kizuizi huashiria "hakuna mabadiliko" kwa kurejesha mojawapo ya `void`, `{}`, au
`{ block: false }`. Kurejesha `modifiedPayload`/`modifiedResponse` hubadilisha
thamani inayopita kwenye mnyororo kwenda kwenye vizuizi vinavyofuata.
`signal?: AbortSignal` hubeba mzunguko wa maisha wa mpigaji hadi kwenye vizuizi. Kughairi ombi ni hali maalumu ya kimakusudi ya kuendelea licha ya hitilafu: madaraja ya midia husimamisha kazi na kufanya usafishaji bila kurejesha midia ghafi kwa lengo linalojulikana kuwa halitumii muundo huo.

## Sajili (`registry.ts`)

`guardrailRegistry` ya singleton hutoa:

- `register(guardrail)` — huongeza kizuizi (au kukibadilisha kulingana na jina lililosawazishwa) na
  kupanga upya kwa `priority` ya kupanda.
- `clear()` / `list()` — zana saidizi za usimamizi.
- `runPreCallHooks(payload, context)` — hupitia vizuizi amilifu, hupitisha
  payload kupitia `modifiedPayload`, na kusimama inapokutana na `block: true` ya kwanza.
- `runPostCallHooks(response, context)` — mtiririko huohuo upande wa jibu.
- `resetGuardrailsForTests({ registerDefaults })` — hufuta hali na kwa hiari
  kusajili upya chaguo-msingi ili kutenga majaribio kwa usafi.

Viendeshaji vyote viwili hurejesha `{ blocked, payload|response, results, guardrail?, message? }`
ambapo `results` ni safu ya rekodi za `GuardrailExecutionResult` zinazojumuisha
sehemu za `blocked`, `skipped`, `modified`, `error`, na `meta` kwa kila kizuizi,
ambazo ni muhimu kwa ufuatiliaji.

### Kuzima Vizuizi kwa Kila Ombi

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` hukusanya orodha
isiyorudiwa ya majina ya vizuizi ambavyo vinapaswa kurukwa kwa ombi la sasa.
Vyanzo (vyote ni vya hiari, vyote vinaunganishwa):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` katika mwili wa ombi (kiwango cha juu)
- `metadata.disabledGuardrails` katika mwili wa ombi
- Kichwa `x-omniroute-disabled-guardrails` (au cha zamani
  `x-disabled-guardrails`)

Thamani zinaweza kuwa safu za mifuatano au mfuatano uliotenganishwa kwa koma; majina
husawazishwa kuwa herufi ndogo za kebab-case (`pii_masker` → `pii-masker`). Tokeo
hupitishwa kupitia `context.disabledGuardrails` hadi kwenye sajili, ambayo huruka
vizuizi vinavyolingana (`skipped: true` katika `results`).

## Mpangilio wa Utekelezaji

Kwa kila ombi linalopitia `src/sse/handlers/chat.ts` na
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` huunda orodha ya kurukwa kutokana na ufunguo wa API, mwili wa ombi,
   na vichwa.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` huendesha vizuizi kwa mpangilio wa kipaumbele
   kuanzia cha chini kwenda juu:
   - Vizuizi vilivyozimwa hurekodiwa kama `skipped`.
   - `preCall` ya kila kizuizi inaweza kuandika upya data ya ombi kupitia `modifiedPayload`.
   - `block: true` ya kwanza husitisha mfuatano mara moja na kishughulikiaji hurejesha
     jibu la kukataliwa na kizuizi.
3. Data ya ombi (ambayo huenda imeandikwa upya) hupelekwa kwenye uelekezaji wa mchanganyiko na
   utumaji kwa huduma ya juu.
4. Baada ya jibu kuundwa, `guardrailRegistry.runPostCallHooks(...)`
   huendesha mfuatano huo huo kwenye jibu. `block: true` hapa huondoa jibu la
   huduma ya juu.

Vizuizi vinavyotupa hitilafu hurekodiwa kwa `error: <message>` na kuandikwa kwenye kumbukumbu kupitia
`logger.warn`, lakini mfuatano huendelea — kwa muundo, mfumo huruhusu ombi kuendelea hitilafu ikitokea.

## Usanidi

Vigeu vya mazingira vinavyosomwa na vizuizi vilivyojengewa ndani:

| Kigeu                                 | Kinachokitumia            | Athari                                                                                                                                     |
| ------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Weka `false` ili kuzima utambuzi kabisa.                                                                                                   |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Sera ya udungaji: `warn`, `block`, au `log`. Thamani ya zamani `redact` haiandiki upya maandishi ya udungaji.                              |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Hali ya kizuizi cha udungaji; pia ni alama ya kipengele katika DB ambayo **hupuuza na kuchukua nafasi ya** vigeu vya mazingira (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Kiwango cha chini cha ukali kinachokataliwa na `MODE=block`: `high` (chaguo-msingi), `medium`, au `low`.                                   |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Jina mbadala la zamani la `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                               |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Ikiwa `true`, PII katika ombi hufichwa (bila kutegemea hali ya udungaji).                                                                  |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Hudhibiti tabia ya kifichaji kwenye upande wa jibu.                                                                                        |

Vizuizi vya Modality Bridge husoma usanidi wa wakati wa utekelezaji kutoka kwenye hifadhi ya mipangilio
inayotegemea DB (`getSettings()`), si vigeu vya mazingira. Funguo kuu za Vision ni
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, na
`modalityBridgeCacheMaxEntries`. Funguo za zamani za
`visionBridge*` zinakubaliwa tu kama mbadala wa usomaji wa mzunguko mmoja ulioandikwa
kwenye nyaraka; uandishi kutoka dashibodi hutumia funguo kuu. Chaguo-msingi na kitatuzi cha mbadala
vinapatikana katika `src/shared/constants/modalityBridgeDefaults.ts`, huku konstanti za zamani
zikihifadhiwa katika `src/shared/constants/visionBridgeDefaults.ts`.

Sauti hutumia `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, na `modalityBridgeAudioMaxClips`, pamoja na mipangilio ya pamoja ya
`modalityBridgeCache*`. Sauti haina mbadala wa funguo za zamani kwa sababu funguo hizi
zilianzishwa pamoja na skima ya Modality Bridge.

Video hutumia `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, na
`modalityBridgeVideoTimeout`, pamoja na mipangilio ya pamoja ya `modalityBridgeCache*`.
Imezimwa kwa chaguo-msingi kwa sababu FFmpeg/ffprobe ni vitegemezi vya hiari vya
uendeshaji, na uundaji wa maelezo ya fremu huongeza muda wa kusubiri na gharama ya modeli.

## Vizuizi Maalum

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Hatua:

1. Unda `src/lib/guardrails/myGuardrail.ts` inayopanua `BaseGuardrail`.
2. Tekeleza `preCall` na/au `postCall`.
3. Ama isajili wakati wa kuingiza (isukume kutoka `registerDefaultGuardrails`) au
   uite `guardrailRegistry.register(...)` wakati wa utekelezaji — sajili hubadilisha
   kizuizi chochote cha awali chenye jina lilelile lililosawazishwa.
4. Ongeza majaribio chini ya `tests/unit/` (mifano iliyopo:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Majaribio

Tumia `resetGuardrailsForTests()` kati ya majaribio ili kuanza kutoka hali inayojulikana.
Pitisha `{ registerDefaults: false }` ili kuanza na sajili tupu na
kusajili tu vizuizi vinavyojaribiwa. Vision Bridge inakubali uingizaji wa vitegemezi
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge hutoa sehemu
sawa za mipangilio, uwezo, uteuzi wa modeli ya STT, ukaguzi wa vitambulisho,
na unukuzi. Kwa hivyo, majaribio yanaweza kutekeleza mitiririko yote miwili bila ufikiaji wa DB
au mtandao.

## Angalia Pia

- `src/lib/guardrails/` — utekelezaji
- `src/shared/utils/inputSanitizer.ts` — kigunduzi kinachoshirikiwa kinachowezesha
  ugunduzi wa udukuzi wa prompt na ufichaji wa PII
- `src/shared/constants/visionBridgeDefaults.ts` — chaguomsingi za Vision Bridge na
  orodha ya modeli zinazolazimishwa kutumia bridge
- `src/shared/constants/modalityBridgeDefaults.ts` — chaguomsingi za pamoja za wakati wa utekelezaji za Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — safu huru (kivunja mzunguko, vipindi vya kusubiri)
- `docs/reference/ENVIRONMENT.md` — rejeleo kamili la vigeu vya mazingira

## Ufikivu wa njia wa kizuizi cha udukuzi na red-team (Awamu ya 8 · Sehemu D)

Kizuizi cha udukuzi (`createInjectionGuard` / `withInjectionGuard`) kinashughulikia njia zote
zinazokubali prompt za watumiaji. Kinaheshimu `INJECTION_GUARD_MODE` (chaguomsingi `warn` = kumbukumbu pekee;
`block` = hurudisha HTTP 400 `SECURITY_001`).

| Aina                 | Njia                                                                                                                                                 | Hali chaguomsingi |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| Maandishi (zilizopo) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn              |
| Uzalishaji           | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn              |
| Data                 | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn              |

Uchimbaji wa maandishi (`extractMessageContents`) hushughulikia `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (kila usiku, `nightly-llm-security.yml`):** promptfoo huthibitisha kuwa kila njia huzuia
mkusanyiko wa OWASP-LLM katika `INJECTION_GUARD_MODE=block`; garak huendesha uchunguzi (huruka bila siri).
`moderations` imejumuishwa kwa ajili ya uthabiti — waendeshaji katika hali ya kuzuia wanaweza kuiondoa kupitia
`resolveDisabledGuardrails`.

Mtiririko wa kazi wa kila usiku (`.github/workflows/nightly-llm-security.yml`, cron + uanzishaji wa
mkono) una kazi mbili:

- **`promptfoo-guard` (inayozuia)** — huendesha `promptfoo eval -c promptfooconfig.yaml`
  pamoja na `INJECTION_GUARD_MODE=block`. Kila tukio hasidi (k.m. "puuza
  maagizo yote ya awali…", uvunjaji wa vizuizi wa mtindo wa DAN) huhakikisha kuwa jibu lina
  `error.code === "SECURITY_001"`, yaani, kizuizi kilikataa ombi hilo kwa hakika.
- **`garak` (ya ushauri)** — huendesha garak `--probes promptinject,dan,leakreplay`
  dhidi ya instansi ya ndani ya OmniRoute (`http://localhost:20128/v1`). Hudhibitiwa na
  siri ya mtoa huduma (`PROMPTFOO_PROVIDER_KEY`); huruka kwa utaratibu bila hitilafu na huongezewa
  `|| true`, kwa hivyo huripoti bila kusababisha CI ishindwe.

Ufikivu wa kisaidizi cha kizuizi (`createInjectionGuard` / `withInjectionGuard`)
unahusisha kila njia ya `/v1` yenye prompt; maandishi ya prompt huchukuliwa kutoka
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` na
`extractMessageContents()` katika `src/shared/utils/inputSanitizer.ts`.
