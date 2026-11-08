# Guardrails (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Chanzo cha kweli:** `src/lib/guardrails/`
> **Imesasishwa mwisho:** 2026-10-17 — v3.8.52 (imeongeza [Ufunikaji na mipaka](#coverage-and-limits):
> ni routes gani na njia za majibu ambazo hooks hufikia, vichwa vya kuzima vilivyounganishwa (#16412),
> hali ya kuzuia injection kama mpaka wa lazima (#16413), na nini kinaona jibu kabla ya post-call)

Guardrails hutekeleza usalama, sera, na mabadiliko ya maudhui kwenye mpaka
kati ya OmniRoute na watoa huduma wa upstream. Kila guardrail inaweza kukagua
(na kwa hiari kukataa, kubadilisha, au kutia maelezo) payloads za maombi
(`preCall`) na majibu ya upstream (`postCall`).

Mfumo ni **fail-open**: ikiwa guardrail itatupia hitilafu wakati wa utekelezaji,
registry hurekodi kosa na kuendelea na guardrail inayofuata badala ya kufeli
ombi. Kuzuia ni uamuzi wa wazi (`block: true`), kamwe si ajali. Ubaguzi mmoja
ni ombi lililositishwa: wakati `signal` ya mwitaji imesitishwa, guardrail
inayotupia hitilafu hukataa utekelezaji wa hook badala ya kurukwa.

Hooks **hazifanyi** kazi kwenye kila route au kila jibu. Soma
[Ufunikaji na mipaka](#coverage-and-limits) kabla ya kutegemea guardrail kama
udhibiti wa usalama.

## Walinzi Waliojengwa Ndani

Usajili hupakia kiotomatiki nguzo sita kwa mpangilio wa kipaumbele wa uingizaji (ona `registry.ts` → `registerDefaultGuardrails()`):

| Kipaumbele | Jina                | Hatua          | Faili                 |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nambari za kipaumbele cha chini zinaendeshwa** kwanza** .

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Muundo wa msingi wa GLM 5.3 na `glm-5.3-{low,high,max}` una metadata `supportsVision:false` registry/spec dhahiri. Vibadala vya GLM 5.3 vya Flash vinasalia kuwa vielelezo vya maono asilia. Njia ya `/v1/messages` ya Msimbo wa Claude inaingia kwenye mnyororo wa ulinzi wa `handleChat` ulioshirikiwa** kabla** tafsiri ya Claude-to-OpenAI; nested `Read` tool-tokeo picha lazima zifafanuliwe au zishughulikiwe kabla ya tafsiri hiyo kuziinua hadi katika maudhui ya OpenAI `image_url` (#17069).

Huingilia maombi yenye picha yanayolengwa** mifano isiyo ya maono** na ama kuelekeza ombi lote kwa kielelezo chenye uwezo wa kuona au kubadilisha sehemu za picha kwa maelezo ya maandishi yanayotolewa na muundo wa maono unaoweza kusanidiwa kabla ya simu ya juu. Hii huruhusu watoa huduma wa maandishi pekee kushughulikia kwa uwazi upakiaji wa aina nyingi.

Mtiririko:

1. Ruka ikiwa muundo unaolengwa tayari unaauni maono (isipokuwa inaonekana kwenye orodha ya daraja la kulazimishwa `isVisionBridgeForcedModel`).
2. Chambua sehemu za picha kupitia `extractImageParts(messages)` (`visionBridgeHelpers.ts`), ambayo hutuma wajumbe kwa** kigunduzi cha umoja cha media** `detectMediaParts()` katika `open-sse/utils/mediaParts.ts` — chanzo kimoja cha ukweli kilichoshirikiwa na kichujio cha uoanifu cha mseto. Uchimbaji umeorodheshwa kwa maumbo ambayo `replaceImageParts` inaweza kugawanya nyuma (dondoo ↔ badala ya mkataba): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`, na Majibu API `input_image`. Picha zinazolingana zilizowekwa ndani ya Claude Code `tool_result.content` na matokeo ya zana za Majibu pia hutolewa na kubadilishwa katika njia zao asili; maumbo ya viashirio pekee ni nyenzo ya kichujio cha mseto na haijatolewa. Ruka ikiwa haijapatikana.
3. Tatua usanidi wa wakati wa kukimbia kupitia `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): vitufe vipya vya mipangilio `modalityBridge*` vimeshinda; funguo `visionBridge*` urithi zimebakia** kurudi nyuma kwa mzunguko mmoja** (dirisha la kurudi nyuma). Ruka kabla ya utiririshaji wa maudhui yoyote wakati daraja limezimwa.
4. Kiteuzi cha modi (`modalityBridgeVisionMode`, tazama jedwali hapa chini) huamua kubadilisha njia dhidi ya kuelezea. Njia mbadala hurejesha `modifiedPayload` ikiwa imebadilishwa `model` pekee, pamoja na meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Eleza njia: picha za kofia kwenye `maxImages`, tunga arifa ya kufahamu kazi, wasiliana na akiba ya maelezo, piga simu mfano wa maono** sambamba** (`Promise.allSettled`), na chonga sehemu za maandishi `[Image N]: <description>` mahali pake. Ufafanuzi ulioshindwa unatoa `null`: picha mbichi imehifadhiwa kwa malengo ya unknown/vision-capable (#4012), lakini a** lengwa la moja kwa moja la maandishi pekee lililothibitishwa** au mseto wa sifuri hupata maandishi dhahiri `(unavailable — no vision-capable provider connected)` kwa kila picha ambayo haijabainishwa, ikijumuisha mapungufu na picha zaidi ya kikomo cha kuelezea-simu (#17069). Mchanganyiko uliopo ambao haujafaulu kuelezea njia mbadala unabaki kuwa mahali pake (#8430).
6. Rejesha `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Kiteuzi cha modi (`modalityBridgeVisionMode`)

| Hali       | Chaguomsingi | Tabia                                                                                                                                                                                                                                                                                               |
| ---------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔            | Urithi wa urithi, ambao haujaguswa (#6640/#7204): miundo isiyo ya combo/`auto/` inapitia upya hadi kwa muundo bora wa maono isipokuwa muundo asili tayari una vitambulisho vinavyoweza kutumika (kisha eleza); malengo ya combo huelezea kila wakati.                                               |
| `describe` |              | Daima eleza — kizuizi cha njia nyingine kimerukwa kabisa; mfano uliochaguliwa na mtumiaji hujibu kila wakati.                                                                                                                                                                                       |
| `reroute`  |              | Lazimisha upitie njia nyingine: mlinzi wa kielelezo-chezesha amepitwa. Njia ya pili-** lengo** mlinzi wa kitambulisho bado anatumika — wakati hakuna lengo linaloweza kutumika la maono, daraja huzuia kwa hitilafu dhahiri badala ya kuelezea au kutuma picha mbichi kwa lengo la maandishi pekee. |

Njia za kulazimishwa za mzunguko mfupi** kabla** auto heuristic inaendesha; tabia ya `auto` ni sawa na pre-PR-1 guardrail.

#### Upeo wa ufunguo wa API (`visionBridgeKeyScope.ts`)

Wakati ufunguo wa API wa mpigaji simu unazuia `allowedConnections`, madimbwi ya kiasi (`allowedQuotas`) au miundo (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`), daraja huchagua tu njia nyingine na kuelezea miundo ambayo ufunguo unaweza kutumia, kwenye miunganisho ambayo ufunguo unaweza kutumia. Simu ya kuelezea basi kila wakati hupitia kitanzi cha OmniRoute chenye kichwa cha `x-omniroute-self-loop-key-id`, kwa hivyo ombi la gumzo linalopokea hutekeleza muunganisho wa ufunguo huo na sera ya muundo tena. `enforceApiKeyPolicy()` huheshimu kichwa hicho pamoja na kibeba kitanzi cha kibinafsi, kwa hivyo kinaweza kupunguza ufikiaji tu, na kitambulisho ambacho hakitatui kinakataliwa.

Ikiwa hakuna mfano wa maono unaoruhusiwa kwa ufunguo, a** lengwa la maandishi pekee lililothibitishwa** hukataa ombi la picha ndani ya nchi kwa kutumia HTTP 400 wazi badala ya kusambaza baiti za picha kwenye mkondo wa juu usio na uwezo (#17069). Kwa shabaha zilizo na uwezo wa kuona usiojulikana au asilia, njia ya kuelezea huhifadhi tabia yake ya hapo awali ya kutofaulu (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Maombi bila ufunguo, na funguo bila vizuizi hivi, hufanya kama hapo awali.

#### eleza arifa ya kufahamu kazi (`modalityBridgeVisionTaskAware`)

Chaguomsingi** kweli** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) inaambatanisha maandishi ya** ujumbe wa mwisho wa mtumiaji** (imepunguzwa hadi herufi 500) hadi msingi eleza kidokezo, ukielekeza maelezo kuelekea kile ambacho mtumiaji aliuliza (mchoro wa kiwakilishi-codex-vision) na kuuliza muundo wa maono kunakili maandishi yanayoonekana. Bendera ikiwa imezimwa — au hakuna maandishi ya mtumiaji — kidokezo cha msingi kinatumika bila kubadilika.

Ombi la ombi linalooana la OpenAI-loop lenyewe (`callVisionModelSingle()` in `visionBridgeHelpers.ts`) daima huomba `image_url.detail: "high"` — bila masharti, kwa kila caller/provider, sio lango kwenye mawimbi yoyote ya mteja. Sampuli za maelezo ya chini hudhoofisha usahihi wa OCR kwa kazi haswa ya unukuzi wa maandishi ambayo kidokezo hiki kinauliza, kwa hivyo simu inayoelezea yenyewe huuliza kila wakati maelezo ya juu bila kujali kiwango cha kina cha ombi la asili linalotumiwa. Hii inaathiri tu shirika la ombi la maelezo ya ndani; haibadilishi jinsi OmniRoute inavyopeleka mbele `image_url.detail` ya mpigaji kwenye ombi la msingi — kwamba chaguo-msingi inatumika kando, na kwa wateja wa OpenCode waliogunduliwa, katika `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Tawi la umbizo la waya Anthropic la kitanzi cha kuelezea halina uga `detail` na haliathiriwi na chaguo-msingi.

#### Eleza kikomo cha pato (`modalityBridgeVisionMaxChars`)

| Ufunguo                        | Chaguomsingi | Masafa           |
| ------------------------------ | ------------ | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`          | `0` au 100-50000 |

`0` (chaguo-msingi) maana yake** hakuna kofia** — maelezo yaliyorejeshwa na `callVisionModel()` yanapitishwa bila kubadilishwa, kuhifadhi tabia iliyopo. Thamani yoyote katika safu ya 100–50000 inapunguza maelezo kwa kiambishi tamati cha `…` kabla ya kuunganishwa tena kama `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` katika `src/lib/guardrails/visionBridge.ts`). Inua hii kwa kazi nzito OCR ambapo muundo wa mkondo wa chini unahitaji unukuzi kamili; ipunguze ili utumie ishara kwenye mifano ya maono ya gumzo. Sehemu ya dashibodi huishi kwenye paneli ya hali ya juu ya kichupo cha Vision (`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) na hubana thamani yoyote kati ya 1 na 99 hadi ghorofa ya 100 huku ikiacha `0` dhahiri bila kuguswa — `0` ni thamani halali Zod katika haki yake yenyewe (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), si tu chaguo-msingi "isiyowekwa".

#### Eleza akiba (`modalityBridge/bridgeCache.ts`)

Akiba ya LRU + TTL kumbukumbu kwa matokeo ya kuelezea, mchakato ulioshirikiwa kote. Ufunguo = `sha256(imageRef + composedPrompt + configuredBridgeModel)` wenye kutunga kiambishi awali cha urefu (hakuna migongano ya mipaka ya uga). Sehemu ya mfano ni** imesanidiwa** modeli ya daraja, sio mfano ambao ulijibu — `callVisionModel` unaweza kurudi nyuma ndani, na kuweka kwa kila jaribio kunaweza kugawanya kashe. Ufafanuzi ulioshindwa hauhifadhiwi kamwe. Mipangilio:

| Ufunguo                         | Chaguomsingi | Masafa  |
| ------------------------------- | ------------ | ------- |
| `modalityBridgeCacheEnabled`    | `true`       | —       |
| `modalityBridgeCacheTtlMinutes` | `60`         | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`        | 10–5000 |

#### Urekebishaji wa picha ya mbali (kuchota kitanzi cha kibinafsi describe/base64 )

Wakati daraja linachota a** kijijini** taswira yenyewe — the Anthropic inaelezea kujiita binafsi na ubadilishaji wa fomati ya claude-waya-base64 (`ensureBase64ImagesForClaudeWire`), zote mbili kupitia `fetchRemoteImageAsDataUri()` katika `visionBridgeHelpers.ts` — data inayotokana URI hupitishwa `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) kabla ya kupachikwa katika ombi la mfano wa maono. Picha kubwa zimepunguzwa hadi a** Ukingo mrefu wa 2048px** (kulingana na kikomo cha kubadilisha ukubwa OpenAI/Anthropic tayari kinatumika upande wa seva), ambayo hupunguza upakiaji bytes/latency bila kubadilisha kile mtindo wa maono unaona. Kubadilisha ukubwa hutumia `sharp`, iliyopakiwa kupitia uingizaji wa nguvu: kwenye jukwaa ambalo mfumo wake wa binary wa asili unashindwa kupakia, `normalizeDataUri()`** kamwe hurusha** — inarudi kwenye upitishaji wa baiti asili, kwa hivyo njia describe/base64-conversion huendelea kufanya kazi kila wakati. Baiti zisizo za picha (uchoraji ambao haukurudisha picha inayoweza kusimbuwa) pia hupitishwa bila kuguswa. Urekebishaji huu unatokana na picha ambazo daraja huchota kwa — yake ya kujiita haitumiki kamwe kwa malipo ghafi ya mpigaji simu, kulingana na kanuni ya ugeuzaji ya kuchagua kuingia pekee (Kanuni Ngumu #20).

#### Mipangilio ya schema + uhamiaji

Vifunguo vipya `modalityBridge*` vimethibitishwa Zod katika `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` trio na kundi la `modalityBridgeAudio*` linalotumiwa na Daraja la Sauti. Uhamiaji `141_modality_bridge_settings.sql` unakili thamani za `visionBridge*` urithi kwa vitufe vipya vinavyolingana (idempotent, kamwe haibatilishi thamani `modalityBridge*` iliyowekwa na opereta); funguo za urithi zinasalia kukubaliwa kama njia mbadala ya kusoma kwa mzunguko mmoja wa toleo.

#### Uwazi header + takwimu

Majibu yaliyobadilishwa ya kueleza hubeba `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (iliyojengwa na `buildModalityBridgeHeader()` katika `modalityBridge/bridgeStats.ts`, iliyopigwa mhuri na `withModalityBridgeHeader()` katika `src/sse/handlers/chatHelpers.ts`). Maombi yaliyoelekezwa kwingine** hapana** kichwa — upakiaji haujaguswa na ubadilishaji wa muundo tayari unaonekana katika sehemu ya `model` ya shirika la majibu.

`GET /api/modality-bridge/stats` (management auth, the same tier as `GET /api/settings`) hurejesha kaunta za kumbukumbu kwa kila namna `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` kwa `vision`, `audio`, na `video`. `averageLatencyMs` hutumia `latencySamples`, sio majaribio yote, kama kiashiria chake; operesheni bila kuweka muda haitengenezi sampuli ya sifuri-millisekunde. `bridged` inasalia kuwa lakabu inayolingana na kurudi nyuma kwa uongofu uliofaulu; majaribio yaliyoshindwa usiiongezee. Vihesabu vimewekwa upya wakati mchakato unaanza tena kwa muundo (telemetry, sio uhasibu).

#### Usanidi wa dashibodi

Ukurasa maalum wa dashibodi ni `/dashboard/settings/modality-bridge`. Vichupo vyake vinavyoweza kushughulikiwa na URL `Vision`, `Audio`, na `Video` huhifadhi vigezo vya hoja huku ukibadilisha thamani ya `tab`. Kichupo cha Maono hufichua kuwezesha, modi, uteuzi wa modeli (pamoja na chaguo-msingi otomatiki), uhamasishaji wa kufahamu kazi, vikomo vya juu timeout/image/description-length/cache, vihesabio vya muda wa kukimbia, na ombi la sampuli lililolindwa. Kichupo cha Sauti pia kinapatikana: kinaonyesha uwezeshaji, kiteua muundo cha STT pekee chenye Auto, vikomo vya timeout/max-clip, vihesabio vya sauti na sampuli ya jaribio la `input_audio`. Kichupo cha Video kinafanya kazi: kinaripoti hali ya wakati wa utekelezaji wa FFmpeg/ffprobe — mojawapo ya majimbo manne UI (`unknown` wakati uchunguzi unaendelea au haukuweza kukamilika, `restricted` kwenye seva pangishi ya dashibodi isiyo na nyuma ambapo uchunguzi umerukwa upande wa mteja, `unavailable` mara moja kuchunguzwa na kuthibitishwa kukosa, au `available` limiters — toleo la FFmpeg/ffprobe enable/model/frame/video/timeout vichujio kiteua kielelezo kwa vielelezo vinavyoweza kuona, na kufichua vihesabio vya video.

Kadi ya zamani ya Vision Bridge chini ya mipangilio AI ni kiungo cha upatanifu kwa ukurasa mpya; haimiliki tena nakala ya pili ya fomu. Watoa Huduma za Vyombo vya Habari pia huunganisha utiririshaji wa Picha-kwa-Maandishi na Utiririshaji wa Hotuba-kwa-Maandishi kwa vichupo sambamba vya Modality Bridge bila kuondoa uwanja wa michezo uliopo wa Usemi-kwa-Maandishi.

**Njia ya uidhinishaji wa kitanzi cha kibinafsi:** wakati njia za kupiga simu zinapopitia OmniRoute mwenyewe kitanzi `/v1` (mfano wa mtoa huduma usio wa kawaida), ombi dogo hutuma `x-omniroute-admission-bypass: internal` na kuthibitishwa na kitambulisho kilichosuluhishwa cha kitanzi cha kibinafsi — mtumwa wa `sk_omniroute` wa ndani katika hali ya ndani, au `OMNIROUTE_API_KEY` iliyosanidiwa `REQUIRE_API_KEY=true` opereta env bado inaelezea kitufe cha `ROUTER_API_KEY` (#1). Njia ya kupita inaheshimiwa tu kwa vitambulisho hivyo kamili, kwa hivyo wateja wa nje hawawezi kutumia kichwa kuruka kiingilio. (#1350)

Chaguo-msingi za urithi huishi `src/shared/constants/visionBridgeDefaults.ts`; chaguo-msingi mpya za mode/task-aware/cache na kisuluhishi cha mipangilio huishi ndani `src/shared/constants/modalityBridgeDefaults.ts`. Njia ya ulinzi inafichua chaguo la mjenzi wa `deps` ili vipimo viweze kuingiza `getSettings` bandia na utekelezaji wa `callVisionModel`.

### Daraja la Sauti (`audioBridge.ts`) — Modality Bridge PR-3

Hukubali maombi ya gumzo yenye sauti kabla ya kufikia lengo ambalo halijulikani kukubali kuingiza sauti. Kamwe haipitishi njia ombi la gumzo: sehemu za sauti hunakiliwa kupitia sehemu nyingi za mwisho zinazooana na OpenAI na mtindo uliochaguliwa wa gumzo unaendelea na manukuu ya maandishi.

Mtiririko:

1. Tatua `supportsAudio` kupitia `getResolvedModelCapabilities()`. Metadata dhahiri ya usajili wa mtoaji hushinda, kisha metadata ya muundo tuli, kisha kusawazishwa `modalities_input`. Orodha ya ingizo iliyotangazwa bila `audio` ni `false`; hakuna ushahidi wa uwezo unaobaki `null`. Zote `false` na `null` huwezesha daraja la kihafidhina, wakati `true` huipita.
2. Tatua mipangilio `modalityBridgeAudio*` na utoe sehemu za sauti za kiwango cha juu zinazoweza kugawanywa kutoka kwa kila ujumbe kupitia kigunduzi cha `detectMediaParts()` kilichoshirikiwa. Maumbo ya waya yanayotumika ni OpenAI `input_audio`, `audio_url`, na `source.media_type: "audio/*"`. Sauti iliyopachikwa imegunduliwa kwa kuelekeza lakini haiondolewi na njia ya kuunganisha. Kazi imefungwa na `modalityBridgeAudioMaxClips`; sehemu za baadaye hukaa bila kuguswa.
3. Heshimu `provider/model` iliyosanidiwa, au acha `selectAudioBridgeModel()` itembee `AUDIO_TRANSCRIPTION_PROVIDERS` kwa mpangilio thabiti wa katalogi na uchague muundo wa kwanza wenye kitambulisho kinachotumika cha mtoa huduma.
4. `callAudioTranscription()` hubadilisha sauti ya base64/data-URI hadi `file` ya sehemu nyingi , au kupakua `audio_url` ya mbali kupitia walinzi wa nje wa umma pekee wenye pini DNS na MB 25 inayofunga. Kisha POSTs faili na modeli iliyochaguliwa kwa kitanzi cha ndani `/v1/audio/transcriptions`, iliyothibitishwa na `resolveSelfLoopBearer()`. Njia iliyopo ya unukuzi hufanya uchunguzi wa kawaida wa kitambulisho, ushughulikiaji wa cooldown/rate-limit, na utumaji wa mtoa huduma.
5. Simu zilizofanikiwa hubadilisha sehemu zao na `[Audio N]: <transcript>`. Simu huendeshwa na `Promise.allSettled`: kutofaulu kwa mtu binafsi huhifadhi sehemu hiyo asili ya sauti (mkataba wa #4012). Ikiwa kila simu itashindwa na lengo limethibitishwa `supportsAudio === false`, sehemu zinakuwa `[Audio N]: (unavailable — no STT provider connected)` (#8430 mkataba). Kwa lengo lisilojulikana (`null`), matokeo ya kutofaulu yote hukaa bila kuguswa. Lengo lililothibitishwa la maandishi pekee lisilo na kitambulisho cha STT kinachoweza kutumika hupokea dondoo sawa bila kutoa simu ya mtandao.

Nakala zilizofanikiwa hutumia kashe LRU/TTL ya Modality Bridge ya mchakato mzima. Ufunguo unachanganya rejeleo la sauti, lebo thabiti ya operesheni `audio-transcription`, na modeli STT iliyochaguliwa; kushindwa kamwe hazihifadhiwi. Majaribio ya sauti husasisha vihesabio vya `bridged`, `cacheHits`, `failures` na `lastUsedAt` vilivyoshirikiwa. Majibu yaliyobadilishwa hubeba `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; maombi ambayo hayajaguswa hayapokei sehemu ya Daraja la Sauti.

Mipangilio ya muda wa utekelezaji inaungwa mkono na DB na imethibitishwa Zod:

| Ufunguo                       | Chaguomsingi | Masafa              |
| ----------------------------- | ------------ | ------------------- |
| `modalityBridgeAudioEnabled`  | `true`       | —                   |
| `modalityBridgeAudioModel`    | `""`         | Otomatiki au STT ID |
| `modalityBridgeAudioTimeout`  | `60000`      | 1000–300000         |
| `modalityBridgeAudioMaxClips` | `3`          | 1–10                |

Akiba iliyoshirikiwa inasalia kudhibitiwa na `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, na `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Huingilia sehemu za video za kiwango cha juu katika Ukamilishaji wa Gumzo `messages` na Majibu API `input` kabla ya lengo bila usaidizi wa video asili kuitwa. Maumbo yanayotumika ni `input_video`, `video_url`, `video_source`, HTTPS URLs, na data `data:video/*;base64,...` URIs. Majina matupu ya faili katika maandishi hayachukuliwi kama video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) inamiliki upitishaji wa ombi, hundi capability/policy, ujumlisho wa kila ombi, na mzigo wa majibu. Upataji wa — kwa kila video, akiba ya matokeo yote, inayoelezea mfuatano wa fremu (ambao huunganisha manukuu yoyote ya sauti yaliyotangazwa na mpigaji), na kwa kila jaribio metrics/abort/cleanup — hufichwa nyuma ya `processVideoPart` katika `videoBridgePipeline.ts`, inayoitwa mara moja kwa kila sehemu ya video ndani ya kitanzi cha `preCall`. Sehemu hiyo pia inafafanua mipaka ya mlango dhahiri `VideoMediaBrokerPort` (kupata baiti na kutoa sampuli za fremu), `VideoAudioTranscriptionPort` (kuunganisha manukuu ya sauti iliyotangazwa na mpigaji simu na manukuu yaliyotolewa sampuli), na `VideoDrilldownPort` (mpaka wa uendelevu wa fremu; bado haijaunganishwa kwenye `processVideoPart` — njia tofauti za kuandika leo). `/api/modality-bridge/video/drilldown`

Njia ya ombi la `/v1` hadharani kamwe haiagizi wala haitumii mchakato mdogo. Video za mbali hupakuliwa chini ya MiB 50; video za inline base64 zina kikomo cha kihafidhina MiB 36 kilichosimbwa kwa kila video ili bahasha model/messages/framing ibaki ndani ya kikomo cha ombi la JSON la umma cha MiB 50 . Urefu wa ndani na makadirio ya ukubwa uliobainishwa huangaliwa kabla ya ugawaji. HTTPS inahitajika kwenye URL ya awali ya mbali na kila kuelekezwa kwingine, kwa kutumia walinzi wa nje wa umma pekee wenye ubandiko wa DNS. Baiti kisha huvuka mpaka kamili wa ndani wa wakala `POST /api/modality-bridge/video/extract`. Njia hiyo ni `LOCAL_ONLY` na `SPAWN_CAPABLE`, inakubali ombi la kila mchakato lililothibitishwa, linaloaminika-kitanzi-kitanzi, na haikubali kamwe URL, njia ya mfumo wa faili, inayoweza kutekelezwa, au orodha ya hoja. Bomba la ukubwa wa mwili API na kisoma mwili cha nyongeza cha kidhibiti hutekelezea kwa uhuru kikomo cha uingizaji wa wakala wa MiB 50. Foleni yake iliyo na mipaka huendesha uchimbaji mmoja kwa wakati mmoja, inaruhusu kazi nne ambazo hazijashughulikiwa, na vifuniko vinavyosubiri pembejeo kwa 100 MiB.

Ndani ya wakala, `ffprobe` inasoma faili ya kibinafsi ya ndani; orodha ya vibali vya umbizo thabiti haijumuishi orodha ya kucheza na fomati za faili ya maelezo. Kwa vyombo vinavyoruhusiwa vya MOV-familia, marejeleo ya data MOV ya nje yanasalia kuwa yamelemazwa kwa chaguomsingi, na amri isiyobadilika haijumui kuvipokea. Zote `ffprobe` na `ffmpeg` hutumia orodha iliyoidhinishwa ya itifaki ya `file` -only, uzi mmoja, safu za hoja zisizobadilika, hakuna ganda, na utekelezo uliotatuliwa kutoka `PATH`. Mitiririko ya jalada la picha iliyoambatishwa si wagombeaji wanaoweza kucheza. Mitiririko yote inayoweza kuchezwa lazima itimize vikomo, na mtiririko chaguomsingi dhahiri unapendekezwa kabla ya urejesho wa faharasa ya chini kabisa. Video zina kikomo kwa sekunde 600, pikseli 8,192 kwa kila kipimo, na pikseli chanzo 33,554,432. FFmpeg sampuli 1-16 za fremu JPEG za katikati, huteremsha chini ukingo mrefu hadi isiyozidi pikseli 1,024 bila kuongeza viingizi vidogo, na kamwe haipokei URL. Sampuli ni `uniform` kwa chaguo-msingi. Sera za `scene_aware` za hiari na `segment_aware` za majaribio hutekeleza pasi moja ya ziada isiyobadilika FFmpeg juu ya mtiririko wa ndani uliothibitishwa tayari, kuchagua mihuri ya eneo `showinfo` iliyo na mipaka, na kurudi nyuma kwa kubainishwa kwa pointi sawa za katikati juu ya kushindwa kwa kigunduzi, kuisha kwa muda, matokeo yenye hitilafu, au seti tupu ya mgombea. Hali ya ufahamu wa sehemu hutenga sampuli za pointi za katikati sawia na vipindi vilivyoidhinishwa vya eneo; ushahidi wa sehemu na tabia mbadala zimefafanuliwa hapa chini. Kofia ngumu ya fremu 16 inatumika baada ya uteuzi katika kila sera. Wakati ombi la kujua tukio lina bajeti ya fremu moja pekee, hutumia sehemu sawa ya katikati ya video kamili au dirisha la kuzingatia na kuripoti `policyEffective: uniform`: fremu moja ya tukio iliyochaguliwa haiwezi kuhifadhi ncha zote mbili za muda. Mpigaji simu anaweza kutoa kwa hiari kidirisha chenye kikomo cha kulenga ( sekunde `start`/`end` ); mipaka imebanwa kwa muda wa maudhui, madirisha yaliyogeuzwa nyuma au yasiyo na kikomo yamekataliwa, na sera zote za sampuli zinatekelezwa ndani ya muda uliorekebishwa pekee. Dirisha linalotokana limejumuishwa katika metadata ya sampuli na katika kiambishi awali cha maelezo kisichoaminika ili miundo ya mkondo wa chini iweze kutofautisha dondoo lililolengwa kutoka kwa rekodi kamili ya matukio.

Uzingatiaji wa nukuu ya kisemantiki ni mpangilio tofauti, ulio wazi. Hali chaguo-msingi ya uchanganuzi `full` huhifadhi kidokezo cha fremu iliyopo na kamwe haipelekei mbele maandishi ya ombi kwa muundo wa maelezo mafupi. Katika hali ya `focused`, daraja husoma tu `text`/`input_text` iliyoandikwa na mtumiaji ya hivi punde zaidi isiyo tupu kutoka kwa chombo kile kile cha Gumzo au Majibu, kuirejesha hadi NFC, kukunja vibambo vya kudhibiti na nafasi nyeupe, na kuiwekea kikomo hadi pointi 500 za msimbo wa Unicode. Matokeo tupu hurudi nyuma kwa haraka ya `full`. Kidokezo kinachoweza kutumika kinasawazishwa kama JSON katika uzuiaji wa muktadha-wa mtumiaji-usioaminika na kinaweza kutanguliza tu maelezo yanayoonekana; haiwezi kubatilisha onyo tofauti dhidi ya kufuata maagizo yanayoonekana au kusikika kwenye vyombo vya habari. Ulengaji wa maandishi hauwahi kuathiri `start`/`end` au kubadilisha sampuli ya muda.

#### FU-07 ushahidi wa sehemu ya kimuundo

`segment_aware` hutumia pasi moja ya uchambuzi wa awali iliyo na mipaka juu ya mtiririko wa video wa ndani ambao tayari umethibitishwa. Msururu wa kichujio kisichobadilika huwa na mizani isiyozidi pikseli 320 kwa upana, hutambua mabadiliko ya eneo na vipindi vilivyogandishwa, kisha sampuli kwa fremu 1 kwa sekunde kwa maelezo ya ukungu, wastani wa luma na spatial/temporal. Pasi ni sampuli 600 za muundo, uzi mmoja FFmpeg/filter, itifaki sawa `file` -only na orodha za ruhusa za kontena, MiB 1 inayofungamana na mchakato, na isizidi sekunde 30 ndani ya abort/deadline. iliyoshirikiwa ya wakala Haikubali kamwe amri, kichujio, njia, au URL kutoka kwa ombi.

Thamani za miundo ni ushahidi bainifu wa sampuli, si uelewaji wa video wa kimaana. Hazizingatii mada, vitendo, maelezo mafupi, hotuba au dhamira ya mtumiaji. Scene na kufungia mipaka kuunda makundi; kufungia ufunikaji, ukungu, kufichua, maelezo ya anga, na mabadiliko ya muda huathiri tu jinsi bajeti iliyopo ya fremu 1-16 inavyotolewa. Sehemu iliyogandishwa kikamilifu imewekwa kwenye fremu moja, huku sehemu zisizogandishwa zikishindana kwa bajeti iliyosalia. Mipaka inapozidi idadi ya fremu, ufunikaji sare wa kalenda ya matukio huhifadhiwa ili upunguzaji wa haraka usiweze kuficha sehemu ndefu inayofuata. Mipaka ya eneo ndani ya azimio la uchanganuzi wa sekunde 1 la mpaka wa kufungia imeunganishwa.

Vichujio vinavyokosekana, ushahidi malformed/empty, hitilafu ya kigunduzi, au muda uliowekwa wa uchanganuzi wa mapema haujafunguliwa kwa sera inayofanana ya sehemu ya katikati. Mpigaji simu au tarehe ya mwisho ya wakala haishindwi kufunguliwa: hukatisha mchakato wa ndani ya ndege, huzuia uchimbaji wa fremu baadaye, na mti wa muda wa kibinafsi huondolewa katika `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` hutengeneza mipangilio bainifu FFmpeg halisi kwa akiba ya manukuu baada ya kukatwa, mgao wa bajeti ya mwendo mnene, ushahidi blur/exposure/SI-TI, upunguzaji wa haraka wenye mkia mrefu, na chanya za uwongo zinazofifia taratibu. Hurekodi muda wa ukuta wa uchambuzi wa awali na, ambapo `/usr/bin/time` inapatikana, mtoto CPU na kilele RSS. Ukaguzi wake wa ubora ni maneno ya kimuundo pekee. Ubora halisi wa muundo wa maelezo mafupi unasalia kuwa `HOLD` kwa sababu waya hii haina ncha iliyoidhinishwa au hakimu iliyosimamishwa. Akiba ya fedha pia inasalia kuwa `HOLD` isipokuwa `--caption-cost-per-call-usd` itoe makadirio chanya ya kila simu; hati haitoi matokeo yoyote.

Kila fremu imezuiwa kwa MiB 4 , fremu zote mbichi kwa pamoja hadi MiB 23 , na majibu ya wakala wa mfululizo hadi 32 MiB. Saraka ya muda ya kibinafsi imeondolewa `finally`. OmniRoute haijumuishi FFmpeg na haikubali njia maalum inayoweza kutekelezeka. Kabla ya kuandika manukuu, daraja hutumia kibali cha kurudisha nyuma mwonekano wa kihafidhina: kila JPEG imepunguzwa hadi bafa ya 16 × 16 ya rangi ya kijivu na inalinganishwa tu na fremu ya mwisho iliyobaki. Kwa bajeti ya maelezo mafupi iliyoombwa juu ya fremu moja, uchimbaji hutoa mkusanyiko wa wagombeaji wenye mipaka wa hadi mara mbili ya bajeti hiyo na si zaidi ya fremu 16. Kikomo kilichoombwa kinatumika tu baada ya kupunguzwa, na watahiniwa wa kwanza na wa mwisho waliochaguliwa huhifadhiwa wakati wa upunguzaji wa mwisho wakati bajeti ni angalau mbili. Sera `grayscale-16x16-mean-cells-v2` iliyotolewa hutumia kubwa zaidi ya delta ya wastani ya luma na uwiano wa seli za vijipicha ambazo delta yake iliyosawazishwa ni angalau 0.05. Kiwango cha rudufu ni 0.04 ya mara kwa mara, iliyochaguliwa kwa ajili ya kutabirika badala ya kufichuliwa kama mpangilio wa wakati wa utekelezaji. Ishara hii ya pili ya utofautishaji wa juu huhifadhi mwendo mdogo na mabadiliko ya maandishi yanayoonekana ambayo ulinganisho wa maana pekee unaweza kuficha. Hitilafu za kilinganishi au avkodare hazifunguki na weka chanjo. Metadata ya matokeo hutenganisha watahiniwa waliotolewa, fremu zilizotumiwa kwa mafanikio na nakala za taswira zimeachwa.

Sehemu ya video iliyo na alama dhahiri inaweza kuomba laha ya mawasiliano iliyo na muhuri wa muda. Daraja huunda zaidi ya safu wima 4, gridi JPEG yenye fremu 16. Kila kisanduku cha pikseli 512 huchoma muhuri wake wa wakati wa chanzo na kuwa mkanda wa chini wa utofautishaji wa hali ya juu, huku mihuri ile ile ya saa inasalia katika metadata ya maandishi kwa ajili ya uhusiano na ukaguzi wa mkondo wa chini. JPEG kamili imesalia kuwa 32 MiB. Ikiwa `sharp` haiwezi kusimbua au kutunga gridi ya taifa, daraja hurejea kwenye fremu za JPEG binafsi; mimba ya mteja bado inaeneza kupitia operesheni ya laha.

Ushahidi wa ukuzaji umetenganishwa kimakusudi na alama ndogo ya utunzi sintetiki. `scripts/perf/video-bridge-contact-sheet-eval.ts` inafafanua uunganisho wa A/B uliobadilishwa kwa schema kwa miundo halisi ya maono inayooana na OpenAI. Hupima tokeni zinazoripotiwa na mtoa huduma, muda wa kusubiri wa ukuta kutoka mwanzo hadi mwisho (ikiwa ni pamoja na muundo wa laha), hesabu ya simu za kielelezo, na uhifadhi wa ukweli uliobainishwa. Majibu ghafi ya mfano hayajaandikwa kwa ripoti; muhtasari wa SHA-256 tu na IDs ya ukweli unaolingana ndio huhifadhiwa. Kuunganisha hakuna simu ya mtandao au ya kulipia isipokuwa `--execute-real` imepitishwa na `--model`, `OMNIROUTE_BASE_URL`, na `OMNIROUTE_API_KEY` zimesanidiwa. Bila utendakazi huo wa wazi, hukumu yake inayoweza kusomeka kwa mashine inabaki `HOLD`; vipimo vya syntetisk payload/call-count pekee sio ushahidi wa kukuza.

Wapigaji simu wanaweza kuambatisha safu ya hiari `transcript.cues` kwenye sehemu ya video inayotumika wakati tayari wana maandishi yaliyopangiliwa. Kila alama lazima iwe na `text`, muda wa `start`/`end` ndani ya muda uliochunguzwa, na `source` iliyoidhinishwa (`client`, `embedded`, au `audio-bridge`); `confidence` hubadilika kuwa `1` na lazima ibaki kati ya `0` na `1`. Vidokezo halisi vinavyorudiwa vimekunjwa. OmniRoute huwa haiwanzishi unukuzi kutoka kwa metadata hii: viashiria vilivyoidhinishwa vinanakiliwa kwenye matokeo yaliyoelezwa kwa chanzo, uhakika, na muda, na hutolewa kama uchunguzi usioaminika pamoja na manukuu ya fremu. Maandishi batili, yaliyo nje ya masafa, au yasiyo na asilia yamekataliwa badala ya kuchanganywa katika mtiririko wa manukuu. Vituo vyote viwili vya manukuu ya mwili hurekebisha asilia iliyotolewa kwa `client`, ikijumuisha lebo za `embedded` au `audio-bridge` zinazojidai. Adapta inayomilikiwa na seva pekee ndiyo inayoweza kukabidhi lebo hizo zinazoaminika kupitia hoja ya `trustedSource` msimbo pekee; sehemu ya ombi JSON haiwezi kufikia hoja hiyo. Maandishi ya maandishi yanasalia kuwa maudhui yasiyoaminika yanayotokana na media, bila kujali asili yake, na haipaswi kamwe kubainisha uidhinishaji.

Mpigaji simu mahiri anaweza kutoa wimbo `audioTranscript` kwa video sawa; inachukuliwa kama maandishi yaliyotolewa na mteja, sio uthibitisho wa unukuzi wa seva. Mshono wa muunganisho huendesha uchunguzi wa picha na sauti chini ya tarehe moja ya mwisho na ishara ya kuacha, huamuru kwa rekodi ya matukio ya kawaida, hukunja nakala kamili, na kuripoti matokeo kidogo wakati upande mmoja tu utafaulu. `audioTranscript` batili inashusha hadhi hadi matokeo hayo kiasi — maelezo yanayoonekana yanawekwa na tawi la sauti hurekodi msimbo wa kushindwa uliosafishwa — badala ya kushindwa video nzima. Upatikanaji wa kila tawi, bendera kiasi, na misimbo ya kushindwa iliyosafishwa huhifadhiwa katika matokeo yaliyoelezwa, katika metadata ya guardrail (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), katika metadata ya akiba ya matokeo, na katika kaunta za kuunganisha daraja. Njia chaguomsingi ya Daraja la Video haitumii matamshi-kwa-maandishi au kupakua nakala ya midia ya pili; bila wimbo huo wazi, itasalia kuwa video pekee.

**Uhifadhi wa manukuu (#12150 P1).** Hii inatumika kiotomatiki wakati wowote Daraja la Video ( lenyewe likichagua kuingia) linatoa alama ya manukuu — hakuna bendera tofauti ya uhifadhi. Wakati ombi linatoa kiashiria chochote cha manukuu ( `transcript` iliyotangazwa na mpigaji simu au `audioTranscript` iliyounganishwa ), mlinzi huweka alama `videoBridgeObserved` na kutoa kivuli kilichorudiwa cha maelezo ya video — uwasilishaji sawa ambapo kila kipengele cha maandishi-huru cha cue hubadilishwa na `[redacted-video-transcript]`, iliyojengwa kwa kubadilisha kamba kabla ya kuunganisha muundo. maandishi bapa, kwa hivyo hakuna maudhui ya kidokezo — ya kiadui au ya kawaida, ikiwa ni pamoja na miili iliyo na `]` kama vile `[inaudible]`/`[music]` — inaweza kudumu). Mwili wa ombi la kumbukumbu ya simu unaoendelea hubadilisha kila sehemu ya maandishi inayotokana na video kwa kivuli hicho kilichorekebishwa, kinacholingana na usawa wa maudhui; nanga `fullText` inasomwa tena kutoka kwa malipo ya awali ya simu ya awali ya guardrail, kwa hivyo mechi bado inafaulu baada ya misururu ya ulinzi ya baadaye (vifuniko vya PII na sifa, vipaumbele 10/95) andika upya maandishi ya maelezo mahali pake na baada ya system-prompt/handoff/memory kudunga upya safu ya ujumbe. Mwili uliotumwa juu ya mkondo kwa mfano haujabadilika. Ombi linalozingatiwa pia halijaza Kumbukumbu isiyodumu (wote ombi- na uchimbaji unaotokana na jibu haurukwa), kwa hivyo jibu la kielelezo mwenyewe haliwezi kutoa mwangwi wa maandishi kwenye Kumbukumbu.

**Sehemu mbichi za video (#12430).** Wakati daraja limewashwa na usaidizi wa video asili haujulikani au haupo, sehemu za `transcript`/`audioTranscript` zilizobainishwa pia huwasha `videoBridgeObserved`, hata baada ya kushindwa kwa maelezo au kikomo cha `maxVideos`. `null` na kamba tupu huhesabu; sehemu ambazo hazipo na metadata zisizo za video hazifanyi. Nakala zilizohifadhiwa hurekebisha sehemu hizi au kuacha ombi, na caches/Memory hupitwa.

Kwenye njia hizo mbadala, vidokezo halali vya mpigaji simu vinatumika sehemu za `text`/`input_text` badala ya sehemu zisizo za kawaida za mtoa huduma. Nyimbo zote mbili zilizotolewa na ombi zinasalia kuwa uchunguzi wa `client` usioaminika, kukiwa na onyo la wazi kwamba video haikuelezwa na mihuri ya muda haikuthibitishwa dhidi ya vyombo vya habari. Bajeti zilizopo za jumla 256-cue/64-KiB na kila-cue zinatumika katika nyimbo mbili kwa pamoja; mihuri ya muda lazima ilingane na dari ya wakala ya sekunde 600 na dirisha lolote la kuzingatia lililotolewa. Nyimbo batili hutupwa, si kusambazwa kama maandishi ya kiholela; ndugu halali bado anaweza kutumika isipokuwa bajeti yao ya pamoja imepitwa. Null/empty sehemu haziongezi maandishi. Hakuna uletaji wa maudhui au unukuzi unaoongezwa na njia mbadala hii. Sehemu za upanuzi wa nakala huondolewa kutoka kwa mtoa huduma wa video mbadala na vipengee vyake vya `video_url`/`source`. Orodha ya ruhusa ya waya OpenAI inakaa kali; watoa huduma za video wasiojulikana wanaendelea kupatikana na walengwa wanaojulikana wa maandishi pekee huweka alama salama. Vivuli vya urekebishaji vilivyoundwa hulinda maandishi yaliyoambatishwa, ilhali ombi asili linalomilikiwa na mpigaji bado halijabadilika. Malengo yanayoauniwa na wenyeji na madaraja yaliyozimwa huhifadhi tabia yao iliyopo ya kupita.

Nakala za ziada zilizobakiwa hutumia ishara sawa ya ombi. Picha mbichi ya ombi la mteja wa kabla ya ulinzi, ombi linalosubiri kuhifadhiwa kwenye kumbukumbu, na kumbukumbu ya ombi lililokataliwa mapema hubadilisha kimuundo sehemu za nakala katika sehemu za video; Vidokezo vya mfuatano vilivyosanifiwa kwa hatua za bomba na makabidhiano ya muktadha yanarekebishwa kwenye sinki ya ombi-mwili inayoendelea. Alama `video_content_removed` inayoendelezwa hufanya mwendelezo wa `previous_response_id` kushindwa kufungwa badala ya kuunda upya maandishi ambayo yalitupwa kimakusudi. Ikiwa ombi lililozingatiwa litapoteza kivuli chake cha urekebishaji wa kila sehemu kabla ya kuingia, au hata mojawapo ya vivuli kadhaa vya video hutalingana baada ya mabadiliko ya ombi la baadaye, mwili wa ombi lililobakizwa huondolewa kabisa badala ya kuhifadhi nakala iliyorekebishwa kwa kiasi.

Kwa ombi linalozingatiwa, jibu la kielelezo linaweza kunukuu sehemu yoyote ya manukuu bila mpaka wa alama uliopangwa. Kwa hivyo `responseBody` yake inayoendelea ya logi inabadilishwa na alama ya kuacha; kisanii cha kina cha bomba (ambacho kinaweza kujumuisha miili upstream/client na vipande vya mtiririko) hakijahifadhiwa. Akiba za kisemantiki, kutokuwa na uwezo, na urejeshaji wa hoja husomwa na kuandika kwa ombi hilo. Ombi la mtoa huduma na majibu yanayoonekana kwa mteja hayajabadilika. Baiti za awali za keepalive hutolewa kutoka kwa bafa ya muda wakati vizalia vya programu vya kina vimeachwa. Onyo la Kiro lenye EventStream huripoti hesabu ya baiti ya upakiaji pekee, kamwe maudhui yake au hitilafu ghafi ya mchanganuzi wa JSON. Hii haidai kwamba kila uchunguzi wa provider/plugin usiohusiana umekaguliwa; ufagiaji mpana zaidi wa kuzama unafuatiliwa katika #11658.

Mzunguko wa maisha `/api/modality-bridge/video/drilldown` wa ndani ni sehemu ndogo ya kache ya loopback/token-authenticated tofauti. Kila operesheni pia inahitaji kanuni opaque kuu ID. Kabla ya mpigaji simu wa uzalishaji kuwezeshwa, ni lazima ipate ID hiyo kutoka kwa mpangaji aliyeidhinishwa na haipaswi kamwe kusambaza thamani iliyochaguliwa na mteja. Vifunguo vya akiba humfunga mkuu huyo kwa kipindi cha kisheria na marejeleo ya video IDs, kuhifadhi vitufe vyao SHA-256-derived pekee, na upeo wa usomaji na ufutaji kwa mkuu sawa. Akiba huhifadhi zaidi ya fremu 16 zinazotokana na JPEG kwa kila ingizo, huisha muda wake baada ya dakika kumi, na kutumia `start`/`end` zilizo na mipaka ya usomaji au ufutaji wa kipindi wazi.

Kila mkuu ni mdogo kwa maingizo 16 na MiB 64 za data ya kisheria JPEG. Vikomo hivyo ni huru kutoka kwa kiwango cha kimataifa 64-entry/256 MiB : shinikizo la sehemu kuu huondoa tu maingizo ya mkuu ambayo hayakutumika hivi majuzi zaidi kabla ya kuondolewa kwa LRU duniani kuzingatiwa. Maingizo yaliyoisha muda wake yamefagiliwa kutoka kwa uhasibu mkuu na wa kimataifa kwenye shughuli za akiba, huku kughairiwa na kutofaulu kwa uthibitishaji kusiwe na uingizwaji wa sehemu.

Akiba inakataa Base64 isiyo ya kisheria, pedi za ziada, media zisizo za JPEG, zilizoharibika au zilizopunguzwa JPEGs, na JPEGs ambazo hutoa onyo wakati wa kusimbua `sharp` yenye picha kamili. Husimba tena kila picha inayokubalika kama kanuni JPEG, hupata upana na urefu kutoka kwa baiti zilizobainishwa badala ya kuamini sehemu za mpigaji simu, na hutupa baiti zozote za polyglot zinazofuata badala ya kuzihifadhi. Ni bafa iliyobanwa ya kisheria pekee ndiyo inachajiwa kwa viwango vyote viwili. Kikomo cha waya JSON kinajumuisha sehemu ya juu ya Base64 kwa dari ya 32 MiB ya kuingiza msimbo. Kila toleo lililohifadhiwa hurekodi JPEG format/resolution, sera ya sampuli iliyoidhinishwa, toleo la toleo, wakati wa kuunda, rejeleo la mzazi lililoharakishwa pamoja na rejeleo la maudhui ya mzazi la mpiga simu anayeaminika. Ughairi huangaliwa kati ya awamu decode/hash zisizolingana kabla ya ahadi ya kache ya atomiki.

Sehemu hii bado haiunganishi mzalishaji wa uzalishaji kwenye njia na haitoi uteuzi wa lahaja wenye maazimio mengi. Kwa hivyo, njia ya uwazi ya ombi la Daraja la Video haileti kazi ya ziada, ilhali uasiliaji mkuu wa mpangaji na mzunguko kamili wa maisha FU-08 wenye maazimio mengi hubakia kuwa kazi ya ufuatiliaji badala ya kurekodiwa kama tabia kamili.

Fremu zimepewa manukuu kwa kufuatana na muundo wa Video uliosanidiwa. Ubatilishaji wa Video tupu hurithi mpangilio wa Maono; ikiwa zote mbili ni tupu, kipanga njia otomatiki cha Vision huchagua kielelezo chenye uwezo wa kuona. Manukuu yaliyofanikiwa yanabadilisha sehemu ya asili na kiambishi awali `[Video description:` ambacho pia huashiria maandishi kama uchunguzi unaotokana na media usioaminika na huambia miundo ya chini ya mkondo isifuate maagizo yanayopatikana kwenye media. Vifunguo vya akiba ya fremu-nukuu ni pamoja na baiti za JPEG, papo hapo, muhuri wa muda, na muundo bora; manukuu yaliyofaulu pekee ndiyo yamehifadhiwa. Maingizo ya akiba huhifadhi muundo halisi wa mzalishaji aliyefaulu, ikijumuisha muundo mbadala; daraja linaripoti `mixed` wakati muafaka tofauti ulitolewa na miundo tofauti. Akiba iliyogonga hutumia tena kitambulisho hicho cha mtayarishaji badala ya kukipa jina jipya kama mpango wa uelekezaji ulioombwa. Akiba ya matokeo ya video nzima huwekwa kwenye kila ingizo ambalo hubadilisha kidokezo cha — cha kutoa, muundo faafu, sera ya sampuli, hesabu ya fremu, hali ya uchanganuzi wa kisemantiki, alama ya vidole SHA-256 ya kidokezo cha kawaida cha kulenga, dirisha la kuzingatia, `transcript`, `audioTranscript`, na alamisho ya laha ya mwasiliani — kwa hivyo kubadilisha vipimo vyovyote kati ya hivyo si kosa tena. Toleo la sera ya ujumuishaji unaoonekana, kiwango cha juu, na hesabu ya fremu ya mtahiniwa yenye mipaka pia ni bayana katika ufunguo wa akiba ya matokeo na metadata; kwa hivyo mabadiliko ya sera hayawezi kutumia tena maelezo ya zamani ya video nzima. Metadata ya akiba ya matokeo ya v4 huweka modi na alama ya vidole, kamwe sio kazi ghafi ya mtumiaji. Metadata ya Guardrail inaripoti aina zote mbili za uchanganuzi zilizoombwa na madhubuti; hali ya `focused` iliyoombwa bila maandishi ya mtumiaji inayoweza kutumika inaripotiwa kwa ufanisi `full`.

guardrail hutoa kila sehemu ya video inayotumika lakini haielezei zaidi ya `modalityBridgeVideoMaxVideos`. Kwa lengo lililothibitishwa kuwa na `supportsVideo === false`, video ambazo hazijafaulu na zilizo na kikomo kupita kiasi huwa alama za maandishi salama kwa hivyo hakuna video ghafi iliyosalia. Wakati uwezo haujulikani, sehemu hizo huhifadhi mtoa huduma wao wa video; nakala yoyote mbadala inafuata ubadilishaji wa maandishi ulio na mipaka hapo juu. Malengo na `supportsVideo === true` bypass daraja. Ombi la mteja la mawimbi ya kughairi hueneza kupitia upakuaji, foleni ya wakala, michakato midogo, na simu manukuu; abortions kuacha kati ya video na kamwe kushindwa wazi kwa vyombo vya habari ghafi.

Mipangilio ya muda wa utekelezaji inaungwa mkono na DB na imethibitishwa Zod:

| Ufunguo                             | Chaguomsingi | Aina / tabia                                                                                                        |
| ----------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`      | Wakati wa hiari wa kutekeleza, jijumuishe                                                                           |
| `modalityBridgeVideoAnalysisMode`   | `"full"`     | `full` huhifadhi maelezo mafupi; `focused` hutumia muktadha wa watumiaji wa hivi karibuni wenye mipaka, usioaminika |
| `modalityBridgeVideoModel`          | `""`         | Kurithi modeli ya Vision Bridge                                                                                     |
| `modalityBridgeVideoFrameCount`     | `8`          | 1–16                                                                                                                |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`  | `uniform`, `scene_aware`, au `segment_aware` sawia ; kushindwa kwa kigunduzi kunarudi kwa `uniform`                 |
| `modalityBridgeVideoMaxVideos`      | `1`          | 1–4                                                                                                                 |
| `modalityBridgeVideoTimeout`        | `120000`     | 1000-120000 ms                                                                                                      |

Urithi uliendelea Thamani za muda wa kuisha kwa Video zaidi ya sekunde 120 zimebanwa hadi tarehe ya mwisho ya wakala; mipangilio mipya inaandika juu ya kikomo hicho imekataliwa. `GET /api/modality-bridge/video/runtime` inahitaji eneo linaloaminika la kurudi nyuma kwa mhuri kabla ya uthibitishaji au uchunguzi wa wakati wa utekelezaji, kisha inahitaji uthibitishaji wa usimamizi. Hurejesha tu `available`, matoleo ya FFmpeg/ffprobe yaliyosafishwa, na sababu maalum wakati muda wa utekelezaji haupatikani. Mwisho wa uchimbaji wa ndani sio upakiaji wa umma API: uenezaji wa foleni hurejesha `503` pamoja na `Retry-After`, mpigaji simu hukatwa hurejesha `499`, na tarehe ya mwisho ya wakala isiyobadilika hurejesha `504`. Majibu yaliyogeuzwa huongeza `video->text;model=<visionModel>;parts=<videos>` kwenye kichwa cha kati `x-omniroute-modality-bridge` bila kuondoa sehemu za Maono au Sauti.

### PII Masker (`piiMasker.ts`)

Huendelea** zote mbili** hatua.

- **`preCall`** hufunga mzigo wa malipo, hutembea `system`, `messages`, `input`, na `prompt` (pamoja na vipengee vya kamba wazi), na kutumia `processPII()` (kutoka `@/shared/utils/inputSanitizer`) hadi sehemu za `content`/`text`. Wakati `PII_REDACTION_ENABLED=true`, PII inayotambuliwa inarekebishwa katika upakiaji wa nje. Hii haitegemei `INPUT_SANITIZER_MODE` (ambayo inadhibiti sera ya udungaji wa papo hapo). Wakati urejeshaji umezimwa, utambuzi wa rekodi za simu huhesabiwa bila kuandika upya maudhui.
- **`postCall`** kina-clones majibu, huendesha `sanitizePIIResponse()` pamoja na masker ya umbo la Responses-API (`maskResponsesOutput` — inashughulikia `output_text` na `output[].content[].text`). Ikiwa urekebishaji wowote utatokea, jibu lililobadilishwa litachukua nafasi ya asili.

Njia ya ulinzi haizuii kamwe; inabainisha tu (`meta.detections`, `meta.redacted`) au inaandika upya.

#### Uteuzi wa kila aina, mifumo maalum na vihesabio vya kutambua

**Dashibodi → Mipangilio → → PII masking** huchagua _nini_ kimefunikwa. Haiwashi ufunikaji: hiyo bado ni `PII_REDACTION_ENABLED` (ombi) na `PII_RESPONSE_SANITIZATION` (jibu + SSE), zote zimezimwa kwa chaguo-msingi.

- **Uchaguzi wa kila aina** — vitambulisho vilivyojengwa vimeorodheshwa katika `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Kutowekwa kunamaanisha kila aina (tabia kabla ya mpangilio huu kuwepo). Ramani za muundo wa `ssn_us` za injini ya ombi hadi `ssn`. Violezo (Kidogo, Kawaida, Kifedha, Kibrazili, USA, GDPR, POPIA, Kamili) tu kujaza visanduku vya kuteua katika UI.
- **vitambulishi vya GDPR na POPIA** — vitambulisho kumi na viwili vilivyojengewa ndani vinavyofunika EU na vitambulisho vya kibinafsi vya Afrika Kusini (jedwali hapa chini). Regexes zao, vithibitishaji na vitambulisho vya mamlaka huishi katika jedwali moja, `src/shared/utils/piiPatterns.ts`, ambayo kisafishaji cha majibu (`src/lib/piiSanitizer.ts`) na masker ya ombi (`src/shared/utils/inputSanitizer.ts`) hutumia. Ulinganifu unafanywa upya tu wakati mthibitishaji wake anakubali; kukimbia wazi kwa tarakimu haitoshi kamwe. Opereta aliyehifadhi uteuzi finyu kabla ya vitambulisho hivi kuwepo huweka tabia aliyokuwa nayo hadi vitambulisho vipya viweke tiki.
- **Mitindo maalum** — hadi ruwaza 20 za regex au kadi-mwitu (`*` = hadi herufi 64 zisizo za nafasi nyeupe, `?` = moja). Mechi zinakuwa `[CUSTOM_REDACTED]`. Kila mchoro hupitia `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): isizidi herufi 500, bendera pekee `g i m s u`, lazima zijumuishwe, lazima zipitishe `safe-regex` (nyuma ya janga), na zisilingane na mfuatano tupu au kishikilia nafasi cha urekebishaji. Mchoro ambao haufaulu hukataliwa unapohifadhiwa na unapojaribiwa, na safu mlalo iliyohifadhiwa ambayo itashindwa kurukwa wakati wa utekelezaji badala ya kukusanywa. Miundo maalum huendeshwa tu wakati ufunikaji umewashwa.
- **Vihesabio vya kugundua** — kwa kila aina hesabu (thamani ambazo hazijalinganishwa kamwe), zilizohifadhiwa kwenye kumbukumbu na kuweka upya wakati wa kuanza tena (`src/lib/pii/piiDetectionStats.ts`). Zinaongezeka tu wakati masking imewashwa.

Mipangilio inaishi katika jedwali la `key_value` (nafasi ya jina `pii_settings`, `src/lib/db/piiSettings.ts`) na inasomwa kupitia kache ya 1 s. API:

| Mbinu  | Njia                     | Kusudi                                                                            |
| ------ | ------------------------ | --------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Hali ya bendera, `enabledTypes`, `customPatterns`, kaunta za kutambua             |
| `PUT`  | `/api/settings/pii`      | Badilisha `enabledTypes` (`null` = zote) and/or `customPatterns`                  |
| `POST` | `/api/settings/pii/test` | Kausha mchoro mmoja dhidi ya sampuli isiyozidi KB 8; hakuna kitu kinachohifadhiwa |

Zote tatu zinahitaji uthibitisho wa usimamizi na kuhalalisha mwili kwa Zod (`src/shared/validation/schemas/piiSettings.ts`).

#### vitambulishi vya GDPR (EU) na POPIA (Afrika Kusini).

| Kitambulisho        | Kitambulisho                        | Uthibitishaji                                                                                                    |
| ------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                                | Nchi inayojulikana, urefu kamili wa nchi hiyo, ISO 13616 MOD-97-10                                               |
| `eu_vat`            | nambari VAT EU                      | Kiambishi awali cha jimbo-mwanachama kinachojulikana na umbizo la nambari ya jimbo hilo (hakuna utafutaji VIES ) |
| `es_dni_nie`        | Kihispania DNI / NIE                | Barua ya kudhibiti (thamani mod 23); NIE ni `X/Y/Z` + tarakimu 7                                                 |
| `it_codice_fiscale` | Fiscale ya Codice ya Italia         | Barua ya udhibiti kutoka kwa meza za nafasi odd/even                                                             |
| `pl_pesel`          | PESEL ya Kipolishi                  | Cheki iliyopimwa na tarehe ya kuzaliwa iliyosimbwa ambayo ipo                                                    |
| `nl_bsn`            | Kiholanzi BSN                       | 11-ushahidi (uzito 9..2, -1)                                                                                     |
| `de_steuer_id`      | Kijerumani Steuer-ID                | ISO 7064 Mod 11,10 pamoja na sheria za muundo wa tarakimu (hakuna uongozi 0)                                     |
| `se_personnummer`   | Mtu wa Kiswidi                      | Luhn zaidi ya tarakimu kumi za mwisho na tarehe ya kuzaliwa inayokubalika (tarakimu 10 au 12)                    |
| `za_id`             | Nambari ya ID ya Afrika Kusini      | Luhn juu ya tarakimu zote 13, kuzaliwa halali month/day, tarakimu ya uraia 0 au 1                                |
| `za_phone`          | Simu ya Afrika Kusini               | `+27` / `27` kiambishi awali, au fomu ya kitaifa `0..` iliyoandikwa kwa nafasi au kistari                        |
| `za_vat`            | Nambari ya VAT ya Afrika Kusini     | tarakimu 10 zinazoanza na `4`** na** "VAT" / "BTW" katika herufi 48 zilizotangulia                               |
| `za_tax_ref`        | rejeleo la ushuru la Afrika Kusini. | tarakimu 10 kuanzia `0`-`3`, Luhn,** na** "tax" / "SARS" katika herufi 48 zilizotangulia                         |

Kwa sababu miundo ya tarakimu pekee inagongana na nambari za kuagiza, kuunda nambari na mihuri ya muda, iliyo dhaifu zaidi (`za_vat`, `za_tax_ref`) inahitaji cue ya neno kuu, na nambari ya `0..` yenye tarakimu kumi haichukuliwi kama nambari ya simu ya Afrika Kusini. IBANs zilizowekwa nafasi (`GB29 NWBK ...`) hazilingani. Kwenye njia ya utiririshaji kidokezo hutazamwa ndani ya chunk ya sasa pekee. Vitambulisho hukaa mbele ya mifumo ya simu za kawaida, kwa hivyo kitambulishi kilichoidhinishwa huweka kishikilia nafasi chake (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Violezo vya `gdpr` na `popia` huchagua EU na vitambulisho vya Afrika Kusini mtawalia. Kuficha yenyewe hubakia kuchagua kuingia (Kanuni Ngumu #20): hakuna kitu hapa kinachobadilisha chaguo-msingi la kipengele cha bendera.

### Sindano ya Haraka (`promptInjection.ts`)

Hugundua miundo pinzani katika maudhui yaliyotolewa na mtumiaji na kutekeleza sera iliyosanidiwa. Tabia inaendeshwa na anuwai za mazingira na chaguzi za wajenzi:

| Mpangilio        | Env var                                                                                             | Chaguomsingi | Athari                                                                                                                                                                                                                |
| ---------------- | --------------------------------------------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Imewashwa        | `INPUT_SANITIZER_ENABLED`                                                                           | `true`       | Wakati `false`, guardrail short-circuits.                                                                                                                                                                             |
| Hali             | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                     | `warn`       | Sera ya sindano: `block`, `warn`, au `log`. (`redact` inakubaliwa kwa back-compat lakini inafanya hivyo** sivyo** maandishi ya sindano ya strip; Ombi la kuandika upya PII linadhibitiwa na `PII_REDACTION_ENABLED`.) |
| Kuzuia kizingiti | chaguo `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (pak `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`       | Kiwango cha chini cha ukali kinachohitajika ili kuzuia. Ya kati ni ya kuangalia tu kwa chaguomsingi.                                                                                                                  |

**Utangulizi wa modi** (`getMode`): mpigaji simu `options.mode` → `INJECTION_GUARD_MODE`**DB kipengele cha kubatilisha bendera** (Dashibodi → Mipangilio → Bendera za Vipengele) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. Kwa hivyo ubatilishaji wa dashibodi unashinda vifurushi vya env, kwa hivyo Alama za Vipengee UI hudhibiti mlinzi anayeendesha moja kwa moja (hakuna kuanzisha upya). Kusomwa kwa DB ni kutofaulu-salama: ikiwa itakosea, mlinzi hurejea kwenye tabia inayotokana na env, na wakati hakuna ubatilishaji uliowekwa tabia ni sawa na azimio la env-tu.

Vyanzo vya ugunduzi:

1. `sanitizeRequest()` kutoka `@/shared/utils/inputSanitizer` (seti ya kigunduzi iliyoshirikiwa inayotumika mahali pengine kwenye bomba).
2. `DEFAULT_GUARD_PATTERNS` iliyojengwa ndani (kwa sasa `system_override_inline` na `markdown_system_block`, ukali wa `high` ).
3. `customPatterns` ya hiari hupitishwa kupitia chaguzi za mjenzi (kamba, regex, au rekodi za `{ name, pattern, severity }` ).

Wakati `mode === "block"`** na** angalau ugunduzi mmoja hukutana na kizingiti cha ukali, `preCall` hurejesha `{ block: true, message: "Request rejected: suspicious content detected" }`. Katika njia za `warn`/`log` kumbukumbu za walinzi lakini inaruhusu simu. `evaluatePromptInjection()` ya msaidizi iliyoshirikiwa pia inasafirishwa kwa wapigaji simu wanaohitaji kutathmini vidokezo bila kupitia sajili.

**Imefungwa (v3.8.20):** detector inakagua tu** kwanza 16 KB** ya maandishi ya haraka yaliyounganishwa — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (baiti 16 384) katika `src/shared/utils/inputSanitizer.ts`. Zote `detectInjection()` na `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` kabla ya kuendesha kitanzi cha muundo. Maagizo ya sindano hukaa karibu na sehemu ya juu ya ingizo, kwa hivyo hii hufunika regex CPU/GC kwenye upakiaji wa KB mamia nyingi bila kudhoofisha ugunduzi (cf. #3932, #4041).

### Kiweka Kitambulisho (`credentialMasker.ts`)

Huendelea** zote mbili** hatua, mwisho katika mnyororo chaguo-msingi (kipaumbele `95`). Hurekebisha mifumo inayojulikana ya ufunguo wa API / ishara za siri kutoka kwa upakiaji wa nje (maudhui ya ujumbe, mabishano ya simu ya zana, matokeo ya zana)** na** majibu ya mtoa huduma, kwa hivyo kitambulisho kilichobandikwa kwenye dodoso (au kilichorejelewa na tokeo la zana) hakivujishwi kwa mtoa huduma wa juu au kurudi kwa mteja.

- **Jijumuishe pekee** , mkusanyiko sawa na urekebishaji PII (Kanuni Ngumu #20-karibu): imezimwa isipokuwa `settings.credentialRedactionEnabled === true`** au** `CREDENTIAL_REDACTION_ENABLED=true`. Ikiwa imezimwa, safu ya ulinzi ni — isiyo ya kawaida ambayo haizuii na haiandiki tena.
- `redactCredentials()` hutembea mti kamili payload/response (`walkValue()`, prototype-pollution-safe, cycle-safe via `WeakSet`) na kubadilisha mechi na kishika nafasi `[REDACTED:<type>]`, na kutengeneza matawi pekee ambayo yalibadilika.
- `CREDENTIAL_PATTERNS` inashughulikia funguo za mtoa huduma za LLM (OpenAI, OpenAI-proj, Anthropic, Google, Uso wa Kukumbatia, Unakili), tokeni VCS/SaaS (GitHub, Slack, Linear, Notion, npm, Postman, Discord), funguo za malipo ( Ufikiaji wa ufunguo wa Stripe AWS, lq funguo, SendGrid Mailgun), funguo za kibinafsi / JWTs, kamba za uunganisho zenye sifa (`mongodb://user:pass@...`, n.k.), na muundo wa jumla wa thamani ya `Authorization`/`x-api-key`/`api-key`/`apikey`. Vifunguo vyenye umbo la kichwa (`authorization`, `x-api-key`, `api-key`, `apikey`) vinarekebishwa kimuundo (thamani pekee, kiambishi awali cha mpango kama `Bearer `/`Basic ` kimehifadhiwa) badala ya kupitia regex ya maandishi ya jumla.
- Njia ya ulinzi haizuii kamwe; inaandika tu (`modifiedPayload` / `modifiedResponse`) na kufafanua (`meta.credentialsRedacted`, `meta.count`).

Mlinzi wa kurudi nyuma: `tests/unit/credential-masker-guardrail.test.ts`.

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
  block?: boolean; // true hufupisha mnyororo mara moja
  message?: string; // huonyeshwa wakati wa kuzuia
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // hurudishwa na preCall kuandika upya ombi
  modifiedResponse?: TValue; // hurudishwa na postCall kuandika upya jibu
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

Guardrail huonyesha "hakuna mabadiliko" kwa kurudisha aidha `void`, `{}`, au
`{ block: false }`. Kurudisha `modifiedPayload`/`modifiedResponse` hubadilisha
thamani inayopitishwa kwenye mnyororo kwa guardrails zinazofuata.
`signal?: AbortSignal` huingiza mzunguko wa maisha wa mwitaji ndani ya guardrails. Kuahirishwa kwa ombi ni ubaguzi wa makusudi wa fail-open: madaraja ya media huacha kazi na kusafisha bila kurejesha media ghafi kwenye lengo linalojulikana kutokuunga mkono.

## Rejesta (`registry.ts`)

`guardrailRegistry` ya singleton hufichua:

- `register(guardrail)` — huongeza (au kubadilisha kwa jina lililosanifishwa) guardrail na
  kupanga upya kwa `priority` inayopanda.
- `clear()` / `list()` — vitendaji vya usimamizi.
- `runPreCallHooks(payload, context)` — hupitia guardrails zilizo hai, huunganisha
  payload kupitia `modifiedPayload`, na kusimama kwenye `block: true` ya kwanza.
- `runPostCallHooks(response, context)` — mtiririko sawa upande wa jibu.
- `resetGuardrailsForTests({ registerDefaults })` — hufuta hali na kwa hiari
  kusajili upya chaguo-msingi kwa ajili ya kutengwa safi kwa majaribio.

Waendeshaji wote hurejesha `{ blocked, payload|response, results, guardrail?, message? }`
ambapo `results` ni safu ya rekodi za `GuardrailExecutionResult` zinazojumuisha
sehemu za `blocked`, `skipped`, `modified`, `error`, na `meta` kwa kila guardrail,
muhimu kwa ufuatiliaji.

### Kuzima Guardrails kwa Kila Ombi

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` hukusanya orodha
iliyondolewa marudio ya majina ya guardrail ambayo yanapaswa kurukwa kwa ombi
la sasa. Kuna njia tano, zinazosomeka kwa mpangilio huu na kuunganishwa kuwa
orodha moja (tukio la kwanza linashinda wakati wa kuondoa marudio):

1. `apiKeyInfo.disabledGuardrails`
2. `disabledGuardrails` ya mwili wa ombi (ngazi ya juu)
3. `metadata.disabledGuardrails` ya mwili wa ombi (tu wakati `metadata` ni object)
4. Kichwa `x-omniroute-disabled-guardrails`
5. Kichwa cha zamani `x-disabled-guardrails`

Njia zote tano huunganishwa, vichwa vyote viwili vikijumuishwa: kutuma vyote
`x-omniroute-disabled-guardrails` na `x-disabled-guardrails` huruka muungano wa
orodha zao, na kichwa cha kisasa kisicho na kitu hakifichi tena kile cha zamani
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), kilichorekebishwa katika
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Thamani zinaweza kuwa safu za herufi au mfuatano uliotenganishwa kwa mkato; majina
hupunguzwa nafasi na kusawazishwa kuwa kebab-case ya herufi ndogo (`pii_masker` → `pii-masker`), na
maingizo yasiyo na kitu hutupwa. Matokeo hupitishwa kupitia `context.disabledGuardrails`
kwenda kwenye rejesta, ambayo huruka guardrails zinazolingana (`skipped: true` katika `results`).

Orodha ya kuzima huathiri **rejesta** pekee. Hali ya `block` ya prompt-injection ni
mpaka wa lazima: middleware ya injection-guard
(`src/middleware/promptInjectionGuard.ts`) huita `evaluatePromptInjection()`
bila orodha yoyote ya kuzima inayodhibitiwa na mwitaji (mwito uliokufa wa
`resolveDisabledGuardrails({ body })` ambao ulizoea kufanywa uliondolewa katika
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), hivyo ombi
linalozima `prompt-injection` bado linakataliwa katika hali ya `block`. Hii ni
kwa makusudi. Njia za kuzima zinadhibitiwa na mwitaji (mwili wa ombi,
metadata, vichwa), na mwitaji hapaswi kuweza kuzima udhibiti wa usalama
uliowekwa na mtendaji
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Muungano wa
vichwa kutoka [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)
hubadilisha tu ni guardrails zipi za rejesta zinazorukwa; haumruhusu mteja
kupita middleware. Sera za lazima za guardrail kwa kila ufunguo na kwa kila kikundi
zinafuatiliwa katika v4 RFC [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Angalia [Ufunikaji na mipaka](#coverage-and-limits).

## Mpangilio wa Utekelezaji

Kwa kila ombi linalopitia `src/sse/handlers/chat.ts` na
`open-sse/handlers/chatCore.ts` (njia za familia ya chat zilizoorodheshwa chini ya
[Ufunikaji na mipaka](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` hutengeneza orodha ya kuruka kutoka kwa ufunguo wa API, mwili (body),
   na vichwa vya ombi (headers).
2. `guardrailRegistry.runPreCallHooks(body, ctx)` huendesha guardrails kwa mpangilio
   wa kupanda wa kipaumbele:
   - Guardrails zilizozimwa hurekodiwa kama `skipped`.
   - `preCall` ya kila guardrail inaweza kuandika upya mzigo (payload) kupitia `modifiedPayload`.
   - `block: true` ya kwanza hukatiza mnyororo na kishikizi hurejesha
     jibu la kukataliwa na guardrail.
3. Mzigo (ambao huenda umeandikwa upya) huingia katika uelekezaji wa combo na usambazaji
   wa upstream.
4. **Kwa non-streaming pekee:** baada ya jibu kukusanywa,
   `guardrailRegistry.runPostCallHooks(...)` huendesha mnyororo huo huo kwenye
   jibu. `block: true` hapa huachilia jibu la upstream na kurejesha HTTP 400. Majibu ya stream huruka hatua hii kabisa.

Guardrails zinazotoa hitilafu (throw) hurekodiwa na `error: <message>` na kuandikwa kwenye logi kupitia
`logger.warn`, lakini mnyororo unaendelea — fail-open kwa makusudi.

## Ufunikaji na mipaka

Rejesta ya guardrail imeunganishwa kwenye bomba la chat pekee. Mipaka hii
imewekwa imara na `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` na
`tests/unit/guardrail-pipeline-characterization.test.ts`; sasisha majaribio hayo
kwa makusudi pale tabia inapobadilika.

### Mahali hooks zinapoendeshwa

| Hook / udhibiti                           | Inaendeshwa kwenye                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                         | Maombi yanayoshughulikiwa na `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (na `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*`, na proxy ya chat ya Telegram. Pia sehemu ya mwisho ya jaribio ya dashibodi `/api/guardrails/test`. Zuio la pre-call hurejesha HTTP 400. |
| `runPostCallHooks`                        | Majibu ya chat yasiyo ya **stream** pekee (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Majibu ya stream hayafiki hapo kamwe.                                                                                                                                                                                                                                                                                                              |
| Streaming PII                             | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), imewekwa kwenye bomba katika `streamingPipeline.ts` wakati `PII_RESPONSE_SANITIZATION` imewashwa. Sio guardrail, hivyo njia za kuzima haziathiri.                                                                                                                                                                                                                                      |
| Middleware ya injection-guard (ya zamani) | Kila njia ya `/v1` inayobeba prompt, ikijumuisha familia ya chat (tazama [ufunikaji wa njia](#injection-guard-route-coverage--red-team-phase-8--block-d)). Prompt injection pekee.                                                                                                                                                                                                                                                                   |

### Nini hakijafunikwa

- **Njia za media, embeddings na data** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) hazifiki rejesta kamwe. Hakuna
  ufichaji wa PII, ufichaji wa vitambulisho au daraja la modality linaloendeshwa hapo. Ukaguzi
  wao pekee ni middleware ya zamani ya injection-guard.
- **Majibu ya stream** hayapati guardrails za post-call: hakuna `pii-masker` wala
  `credential-masker` ya post-call, wala zuio la post-call. Ni ubadilishaji wa PII wa stream
  tu unaotumika (wakati `PII_RESPONSE_SANITIZATION` imewashwa). Kitambulisho
  kinachorudishwa katika jibu la stream hakiufichwi.
- **Njia za kuzima dhidi ya middleware (kwa makusudi):** middleware hutathmini
  prompt injection kwa wito wake mwenyewe wa `evaluatePromptInjection()`, bila
  kupitisha orodha yoyote ya kuzima inayodhibitiwa na mwitaji. Hali ya `block` ni mpaka
  wa lazima ambao ulemavu unaodhibitiwa na mwitaji hauwezi kupita, ikijumuisha kwenye njia za
  familia ya chat
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Kuzima
  `prompt-injection` kunaruka tu guardrail ya rejesta.

### Nini huona jibu kabla ya post-call

Kwenye njia isiyo ya stream mpangilio ni: uchimbaji wa kumbukumbu → utekelezaji
wa zana zilizojengewa ndani → guardrails za post-call → utoaji wa zuio la post-call → uhifadhi
wa semantic-cache.

- **Uchimbaji wa kumbukumbu** na **utekelezaji wa zana** huona jibu kabla ya kinga za baada ya wito kuliandika upya au kulizuia. Kuanzia
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), uchimbaji
  wa kumbukumbu hupitisha maandishi yaliyochimbuliwa kupitia `sanitizePII`
  wakati `PII_RESPONSE_SANITIZATION` imewashwa (kwa utiririshaji na bila
  utiririshaji), lakini jibu ambalo hatua za baada ya wito hulizuia baadaye
  bado limekwishatolewa kwa kumbukumbu na zana.
- **Kache ya kisemantiki** huhifadhi jibu baada ya hatua za baada ya wito, kwa
  hivyo huhifadhi jibu lililoandikwa upya, na jibu lililozuiwa halihifadhiwi
  kamwe. Vingilio vya kache vinatofautishwa kwa kila ufunguo wa API.

## Usanidi

Vigeuzi vya mazingira vinavyosomwa na guardrails zilizojengewa ndani:

| Kigeuzi                               | Inatumiwa na                   | Athari                                                                                                              |
| ------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`             | Weka `false` ili kuzima utambuzi kabisa.                                                                            |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`             | Sera ya injection: `warn`, `block`, au `log`. Thamani ya zamani `redact` haiandiki upya maandishi ya injection.     |
| `INJECTION_GUARD_MODE`                | `prompt-injection`             | Hali ya ulinzi wa injection; pia ni bendera ya kipengele ya DB inayo**batilisha** vigeuzi vya mazingira (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`             | Kiwango cha chini cha ukali ambacho `MODE=block` hukataa: `high` (chaguomsingi), `medium`, au `low`.                |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`             | Jina mbadala la zamani la `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                        |
| `PII_REDACTION_ENABLED`               | `pii-masker`                   | Ikiwa `true`, PII ya ombi hufichwa (bila kutegemea hali ya injection).                                              |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (mkondo wa chini) | Inadhibiti tabia ya masker upande wa majibu.                                                                        |

Guardrails za Modality Bridge husoma usanidi wa runtime kutoka kwenye
hifadhi ya mipangilio inayotegemea DB (`getSettings()`), sio vigeuzi vya
mazingira. Funguo kuu za Vision ni
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, na
`modalityBridgeCacheMaxEntries`. Funguo za zamani za
`visionBridge*` zinakubaliwa tu kama njia mbadala ya kusoma ya mzunguko
mmoja iliyowekwa katika nyaraka; maandishi ya dashibodi hutumia funguo kuu.
Chaguomsingi na mtatuzi wa njia mbadala viko katika
`src/shared/constants/modalityBridgeDefaults.ts`, huku thabiti za zamani
zikihifadhiwa katika `src/shared/constants/visionBridgeDefaults.ts`.

Audio hutumia `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, na `modalityBridgeAudioMaxClips`, pamoja na
mipangilio ya pamoja ya `modalityBridgeCache*`. Audio haina njia mbadala ya
funguo za zamani kwa sababu funguo hizi zilianzishwa pamoja na skima ya
Modality Bridge.

Video hutumia `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, na
`modalityBridgeVideoTimeout`, pamoja na mipangilio ya pamoja ya
`modalityBridgeCache*`. Imezimwa kwa chaguomsingi kwa sababu FFmpeg/ffprobe ni
vitegemezi vya hiari vya uendeshaji na uwekaji wa maelezo ya fremu huongeza
ucheleweshaji na gharama ya modeli.

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

1. Unda `src/lib/guardrails/myGuardrail.ts` ukiirithi `BaseGuardrail`.
2. Tekeleza `preCall` na/au `postCall`.
3. Sajili wakati wa kuagiza (sukuma kutoka `registerDefaultGuardrails`) au
   ita `guardrailRegistry.register(...)` wakati wa utekelezaji — rejista
   hubadilisha kizuizi chochote cha awali chenye jina sawa lililosawazishwa.
4. Ongeza majaribio chini ya `tests/unit/` (mifano iliyopo:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Kupima

Tumia `resetGuardrailsForTests()` kati ya majaribio ili kuanza kutoka hali
inayojulikana. Pitisha `{ registerDefaults: false }` ili kuanza na rejista tupu
na kusajili tu vizuizi vinavyopimwa. Vision Bridge inakubali uingizaji wa
utegemezi (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge inaweka
wazi viunganishi vinavyolingana vya mipangilio, uwezo, uchaguzi wa mfano wa
STT, ukaguzi wa hati, na kunakili. Kwa hivyo majaribio yanaweza kutekeleza
mitiririko yote miwili bila ufikiaji wa DB au mtandao.

## Angalia Pia

- `src/lib/guardrails/` — utekelezaji
- `src/shared/utils/inputSanitizer.ts` — kikaguzi cha pamoja kinachoendesha
  ulinzi wa prompt-injection na kuficha PII
- `src/shared/constants/visionBridgeDefaults.ts` — chaguomsingi za Vision
  Bridge na orodha ya modeli zenye daraja lililolazimishwa
- `src/shared/constants/modalityBridgeDefaults.ts` — chaguomsingi za pamoja za
  wakati wa utekelezaji za Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — safu huru (kivunja-mzunguko, mapumziko)
- `docs/reference/ENVIRONMENT.md` — rejeo kamili la vigezo vya mazingira

## Ufunikaji wa njia za injection-guard na red-team (Awamu ya 8 · Kitalu D)

Kizuizi cha kuingizia (injection-guard) (`createInjectionGuard` /
`withInjectionGuard`) kinafunika njia zote zinazokubali maelekezo ya mtumiaji.
Kinaheshimu `INJECTION_GUARD_MODE` (chaguomsingi `warn` = kurekodi tu; `block`
= hurejesha HTTP 400 `SECURITY_001`).

| Aina                 | Njia                                                                                                                                                 | Hali ya chaguomsingi |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Maandishi (yaliyopo) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn                 |
| Uzalishaji           | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn                 |
| Data                 | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn                 |

Uchimbaji wa maandishi (`extractMessageContents`) unafunika
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (kila usiku, `nightly-llm-security.yml`):** promptfoo huthibitisha
kuwa kila njia inazuia mkusanyiko wa OWASP-LLM katika
`INJECTION_GUARD_MODE=block`; garak huendesha vipimo vya uchunguzi (huruka bila
siri). `moderations` imejumuishwa kwa ajili ya uthabiti. Hali ya kuzuia ni
mpaka wa lazima: `evaluatePromptInjection()` hupuuza orodha ya kuzima kwa kila
ombi ambayo middleware huipitisha, kwa hivyo `disabledGuardrails` **haitoi**
njia yoyote msamaha dhidi yake
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Mtiririko wa kazi wa kila usiku (`.github/workflows/nightly-llm-security.yml`,
cron + uanzishaji wa mwongozo) una kazi mbili:

- **`promptfoo-guard` (inayozuia)** — huendesha `promptfoo eval -c
promptfooconfig.yaml` na `INJECTION_GUARD_MODE=block`. Kila kesi ya
  kishambulizi (k.m. "puuza maelekezo yote yaliyotangulia…", jailbreak za
  mtindo wa DAN) inathibitisha kwamba jibu lina
  `error.code === "SECURITY_001"`, yaani kizuizi kimekataa ombi kwa kweli.
- **`garak` (ya ushauri)** — huendesha garak `--probes
promptinject,dan,leakreplay` dhidi ya nakala ya ndani ya OmniRoute
  (`http://localhost:20128/v1`). Inadhibitiwa na siri ya mtoa huduma
  (`PROMPTFOO_PROVIDER_KEY`); huruka kwa utulivu na huongezewa kiambishi
  `|| true`, kwa hivyo huripoti bila kuifanya CI kushindwa.

Ufunikaji wa kisaidizi cha kizuizi (`createInjectionGuard` /
`withInjectionGuard`) unafikia kila njia ya `/v1` inayobeba maelekezo;
maandishi ya maelekezo huchotwa kutoka
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` na
`extractMessageContents()` katika `src/shared/utils/inputSanitizer.ts`.
