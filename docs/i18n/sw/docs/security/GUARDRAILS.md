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

## Guardrails Zilizojengwa Ndani

Registry hupakia kiotomatiki guardrails sita kwa mpangilio wa kipaumbele wakati
wa import (tazama `registry.ts` → `registerDefaultGuardrails()`):

| Kipaumbele | Jina                | Hatua          | Faili                 |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nambari ndogo za kipaumbele hutekelezwa **kwanza**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Modeli ya msingi ya GLM 5.3 na `glm-5.3-{low,high,max}` zina metadata ya wazi
ya `supportsVision:false` kwenye registry/spec. Vilembo vya GLM 5.3 Flash
vinabaki kuwa modeli za native-vision. Njia ya `/v1/messages` ya Claude Code
huingia kwenye mnyororo wa guardrail wa kabla-ya-mwito wa `handleChat`
**kabla** ya tafsiri ya Claude-kwenda-OpenAI; picha za matokeo-ya-zana `Read`
zilizowekwa ndani lazima zielezwe au kushughulikiwa kabla ya tafsiri hiyo
kuziinua kuwa maudhui ya OpenAI `image_url` (#17069).

Hukatiza maombi yenye picha yanayolenga **modeli zisizo za kuona** na ama
kuelekeza upya ombi zima kwa modeli yenye uwezo wa kuona au kubadilisha
sehemu za picha na maelezo ya maandishi yanayotengenezwa na modeli ya kuona
inayoweza kusanidiwa kabla ya mwito wa upstream. Hii huruhusu watoa huduma
wa maandishi-pekee kushughulikia payloads za multimodal kwa uwazi.

Mtiririko:

1. Ruka ikiwa modeli lengwa tayari inaunga mkono kuona (isipokuwa ikiwa
   inaonekana kwenye orodha ya forced-bridge `isVisionBridgeForcedModel`).
2. Toa sehemu za picha kupitia `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), ambayo hukabidhi kwa **kikaguzi cha media
   kilichounganishwa** `detectMediaParts()` katika `open-sse/utils/mediaParts.ts`
   — chanzo kimoja cha kweli kinachoshirikiwa na kichujio cha utangamano wa
   combo. Utoaji umewekwa kwenye orodha-ya-kuruhusiwa kwa maumbo ambayo
   `replaceImageParts` inaweza kudunga tena (mkataba wa extract↔replace):
   OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"`, na Responses API `input_image`. Picha zinazolingana
   zilizowekwa ndani ya `tool_result.content` ya Claude Code na matokeo ya
   zana za Responses pia hutolewa na kubadilishwa kwenye njia zao za awali;
   maumbo ya viashiria-pekee ni nyenzo za kichujio cha combo na hayatolewi.
   Ruka ikiwa hakuna iliyopatikana.
3. Tatua usanidi wa runtime kupitia `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): funguo mpya za usanidi
   `modalityBridge*` hushinda; funguo za zamani za `visionBridge*` zinabaki
   kama **fallback ya mzunguko mmoja** (dirisha la rollback). Ruka kabla ya
   kuvinjari media yoyote wakati bridge imezimwa.
4. Kiteuzi cha hali (`modalityBridgeVisionMode`, tazama jedwali hapa chini)
   huamua reroute dhidi ya describe. Reroute hurejesha `modifiedPayload` yenye
   `model` pekee imebadilishwa, pamoja na meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Njia ya describe: weka kikomo cha picha kwa `maxImages`, tunga prompt
   inayozingatia kazi, shauriana na cache ya describe, ita modeli ya kuona
   **sambamba** (`Promise.allSettled`), na uingize sehemu za maandishi
   `[Image N]: <description>` badala ya picha hizo. Describe iliyoshindwa
   hutoa `null`: picha ghafi huhifadhiwa kwa malengo yasiyojulikana/yanayoweza
   kuona (#4012), lakini **lengo la moja kwa moja la maandishi-pekee
   lililothibitishwa** au combo yenye kuona-sufuri hupata kipande cha maandishi
   cha wazi `(unavailable — no vision-capable provider connected)` kwa kila
   picha isiyoelezwa, ikijumuisha kushindwa kwa sehemu na picha zinazozidi
   kikomo cha mwito wa describe (#17069). Fallback iliyopo ya describe ya
   combo iliyoshindwa-kabisa inabaki mahali pake (#8430).
6. Rejesha `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Kiteuzi cha hali (`modalityBridgeVisionMode`)

| Hali       | Chaguomsingi | Tabia                                                                                                                                                                                                                                                                              |
| ---------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔            | Heuristic ya urithi, haijagusiwa (#6640/#7204): miodeli isiyo ya combo/`auto/` huelekezwa upya kwa modeli bora zaidi ya kuona isipokuwa modeli asili tayari ina hati zinazotumika (kisha inaelezea); malengo ya combo huelezea kila mara.                                          |
| `describe` |              | Huelezea kila mara — kizuizi cha kuelekeza upya hurukwa kabisa; modeli aliyochagua mtumiaji hujibu kila mara.                                                                                                                                                                      |
| `reroute`  |              | Lazimisha kuelekeza upya: ulinzi wa kuweka modeli yenye hati hupitwa. Ulinzi wa hati ya **lengo** la kuelekeza upya bado unatumika — wakati hakuna lengo la kuona linalotumika, daraja huzuia kwa kosa wazi badala ya kuelezea au kutuma picha ghafi kwa lengo la maandishi pekee. |

Hali za kulazimishwa hufanya mzunguko mfupi **kabla** heuristic ya auto kuanza; tabia ya `auto` ni sawa kabisa kwa byte na ulinzi wa kabla ya PR-1.

#### Wigo wa ufunguo wa API (`visionBridgeKeyScope.ts`)

Wakati ufunguo wa API wa mwitaji unazuia `allowedConnections`, makundi ya quota
(`allowedQuotas`) au miodeli (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), daraja huchagua tu
miodeli ya kuelekeza upya na ya kuelezea ambayo ufunguo unaweza kutumia, kwenye
miunganisho ambayo ufunguo unaweza kutumia. Mwito wa kuelezea kisha hupitia
kila mara kupitia kitanzi-cha-yenyewe cha OmniRoute na kichwa cha
`x-omniroute-self-loop-key-id`, ili ombi la gumzo linalopokea liwezeshe tena
sera ya muunganisho na ya modeli ya ufunguo huo. `enforceApiKeyPolicy()`
hutii kichwa hicho tu pamoja na bearer ya kitanzi-cha-yenyewe, kwa hivyo
inaweza tu kupunguza ufikiaji, na kitambulisho kisichotatuliwa hukataliwa.

Ikiwa hakuna modeli ya kuona inayoruhusiwa kwa ufunguo, **lengo la maandishi
pekee lililothibitishwa** hukataa ombi la picha ndani kwa HTTP 400 wazi badala
ya kusambaza byte za picha kwa upstream isiyoweza (#17069). Kwa malengo yenye
uwezo wa kuona usiojulikana au wa asili, njia ya kuelezea huhifadhi tabia yake
ya awali ya kushindwa-wazi (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Maombi bila ufunguo, na funguo bila vizuizi hivi, hufanya kazi sawa kabisa kama
awali.

#### Kidokezo cha kuelezea chenye ufahamu wa kazi (`modalityBridgeVisionTaskAware`)

Chaguomsingi **kweli**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`)
huongeza maandishi ya **ujumbe wa mwisho wa mtumiaji** (yaliyokatwa hadi herufi 500) kwenye kidokezo cha msingi cha kuelezea, ikielekeza maelezo kuelekea kile
mtumiaji alichouliza kweli (muundo wa codex-vision-proxy) na kumwomba modeli ya
kuona inakili maandishi yanayoonekana. Bendera ikizimwa — au hakuna maandishi
ya mtumiaji — kidokezo cha msingi hutumika bila mabadiliko.

Ombi la kitanzi-cha-yenyewe cha kuelezea lenyeo linalooana na OpenAI
(`callVisionModelSingle()` katika `visionBridgeHelpers.ts`) daima huomba
`image_url.detail: "high"` — bila masharti, kwa kila mwitaji/mtoa huduma, bila
kuzuiliwa na ishara yoyote ya mteja. Sampuli ya kiwango cha chini hupunguza
usahihi wa OCR kwa kazi halisi ya unakili wa maandishi ambayo kidokezo hiki
kinaomba, kwa hivyo mwito wa kuelezea wenyewe daima huomba kiwango cha juu cha
maelezo bila kujali kiwango gani cha maelezo ombi asili la kuingia lililotumia.
Hii huathiri tu mwili wa ombi la ndani la kuelezea; haibadiliki jinsi OmniRoute
inavyosambaza `image_url.detail` ya mwitaji mwenyewe kwenye ombi kuu —
chaguomsingi hilo hutumika tofauti, na tu kwa wateja wa OpenCode
waliogunduliwa, katika `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Tawi la muundo wa waya la
Anthropic la kitanzi-cha-yenyewe cha kuelezea halina uga wa `detail` na
haliathiriwi na chaguomsingi yoyote kati ya hizo.

#### Kikomo cha pato la kuelezea (`modalityBridgeVisionMaxChars`)

| Kifunguo                       | Chaguomsingi | Safu             |
| ------------------------------ | ------------ | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`          | `0` au 100–50000 |

`0` (chaguomsingi) ina maana ya **hakuna kikomo** — maelezo yaliyorejeshwa na
`callVisionModel()` hupitishwa bila kurekebishwa, yakihifadhi tabia iliyopo.
Thamani yoyote katika safu ya 100–50000 hukata maelezo kwa kiambishi cha `…`
kabla ya kuunganishwa tena kama `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` katika `src/lib/guardrails/visionBridge.ts`).
Iinue thamani hii kwa kazi za OCR zenye maelezo makubwa ambapo modeli ya
downstream inahitaji unakili kamili; ipunguze ili kuweka kikomo cha matumizi ya
tokeni kwenye miodeli ya kuona yenye maneno mengi. Uga wa dashibodi uko kwenye
paneli ya Kina ya kichupo cha Vision (`modality-bridge-max-chars` katika
`ModalityBridgeVisionTab.tsx`) na hunyakua thamani yoyote kati ya 1 na 99 hadi
kiwango cha chini cha 100 huku ikiacha `0` halisi bila kuguswa — `0` ni thamani
halali ya Zod kwa haki yake mwenyewe
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), si tu
chaguomsingi ya "haijawekwa".

#### Hifadhi ya kuelezea (`modalityBridge/bridgeCache.ts`)

Hifadhi ya LRU + TTL katika kumbukumbu kwa matokeo ya kuelezea,
inayoshirikiwa katika mchakato mzima. Kifunguo =
`sha256(imageRef + composedPrompt + configuredBridgeModel)` kwa fremu ya
kiambishi-awali cha urefu (hakuna migongano ya mipaka ya uga). Kipengele cha
modeli ni modeli ya daraja **iliyosanidiwa**, si modeli iliyojibu kweli —
`callVisionModel` inaweza kurudi nyuma ndani, na kufunga kwa kila jaribio
kungevunja hifadhi. Maelezo yaliyoshindwa hayawahi kuhifadhiwa. Mipangilio:

| Kifunguo                        | Chaguomsingi | Safu    |
| ------------------------------- | ------------ | ------- |
| `modalityBridgeCacheEnabled`    | `true`       | —       |
| `modalityBridgeCacheTtlMinutes` | `60`         | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`        | 10–5000 |

#### Uwekaji sawa wa picha za mbali (kupata kueleza/base64 ya self-loop)

Pale daraja linapochukua picha ya **mbali** lenyewe — kuita kueleza kwa
Anthropic (self-call) na ubadilishaji wa base64 wa claude-wire-format
(`ensureBase64ImagesForClaudeWire`), zote mbili kupitia
`fetchRemoteImageAsDataUri()` katika `visionBridgeHelpers.ts` — data URI
inayotokana hupitishwa kupitia `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) kabla ya kuingizwa katika ombi la
modeli ya vision. Picha kubwa mno hupunguzwa hadi **upana mrefu wa pikseli 2048**
(kulingana na kikomo cha kupunguza ukubwa ambacho OpenAI/Anthropic tayari
hukitumia upande wa seva), jambo linalopunguza baiti/ucheleweshaji wa kupakia
bila kubadilisha kile modeli ya vision inachokiona. Kupunguza ukubwa
hutumia `sharp`, iliyopakiwa kupitia dynamic import: kwenye jukwaa ambapo
binary yake ya asili haifanikiwi kupakiwa, `normalizeDataUri()` **haitupi kosa kamwe**
— inarudisha baiti za asili kama zilivyo, hivyo njia ya
kueleza/ubadilishaji wa base64 inaendelea kufanya kazi kila wakati. Baiti ambazo
si picha (fetch ambayo haikurudisha picha inayoweza kusimbuliwa) pia hupitishwa
bila kuguswa. Uwekaji huu sawa umezingatiwa kwa picha ambazo daraja huchukua kwa
ajili ya self-call yake — hauwahi kutumika kwa payload ya mwitaji wa
passthrough, kwa mujibu wa kanuni ya ubadilishaji wa opt-in pekee (Kanuni
Ngumu #20).

#### Skima ya mipangilio + uhamishaji

Funguo mpya za `modalityBridge*` zinathibitishwa kwa Zod katika
`updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`):
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, tatizo la
`modalityBridgeCache*`, na kundi la `modalityBridgeAudio*` linalotumiwa na
Audio Bridge. Uhamishaji `141_modality_bridge_settings.sql` unakili thamani za
zamani za `visionBridge*` kwa funguo mpya zinazolingana (idempotent,
haitandikwi kamwe thamani ya `modalityBridge*` iliyowekwa na mwendeshaji);
funguo za zamani zinaendelea kukubalika kama fallback ya kusoma kwa mzunguko
mmoja wa toleo.

#### Kichwa cha uwazi + takwimu

Majibu yaliyobadilishwa kwa kueleza hubeba
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(yanayojengwa na `buildModalityBridgeHeader()` katika
`modalityBridge/bridgeStats.ts`, yanayopigwa muhuri na
`withModalityBridgeHeader()` katika `src/sse/handlers/chatHelpers.ts`).
Maombi yaliyoelekezwa upya hayapati kichwa chochote — payload haikuguswa na
uabadilishaji wa modeli tayari unaonekana katika uga wa `model` wa mwili wa
jibu.

`GET /api/modality-bridge/stats` (uthibitishaji wa usimamizi, ngazi sawa na
`GET /api/settings`) hurudisha vihesabuji vya kumbukumbu kwa kila modality
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` kwa `vision`, `audio`, na
`video`. `averageLatencyMs` hutumia `latencySamples`, si majaribio yote, kama
kigawanyo chake; operesheni bila muda haibuni sampuli ya milisekunde sifuri.
`bridged` hubaki kama jina la utani linalooana kwa ubadilishaji uliofanikiwa;
majaribio yaliyoshindwa hayaiongezei. Vihesabuji huanzishwa upya wakati wa
kuanzisha upya mchakato kwa makusudi (telemetry, si uhasibu).

#### Usanidi wa dashibodi

Ukurasa maalum wa dashibodi ni
`/dashboard/settings/modality-bridge`. Tabo zake zinazoweza kufikiwa kwa URL
za `Vision`, `Audio`, na `Video` huhifadhi vigezo vya query wakati wa
kubadilisha thamani ya `tab`. Tabo ya Vision inaonesha uwezeshaji, hali,
uchaguzi wa modeli (ikijumuisha chaguo-msingi la kiotomatiki), uandishi wa
maelekezo unaojali kazi, vikomo vya juu vya muda/picha/urefu wa
maelezo/cache, vihesabuji vya runtime, na ombi la sampuli lililolindwa. Tabo ya
Audio pia iko hai: inaonesha uwezeshaji, kichaguzi cha modeli cha STT-pekee
chenye Auto, vikomo vya muda/urefu wa klipu, vihesabuji vya sauti, na jaribio la
sampuli ya `input_audio`. Tabo ya Video inafanya kazi: inaripoti hali ya
runtime ya FFmpeg/ffprobe — moja ya hali nne wazi za UI (`unknown` wakati
uchunguzi unaendelea au haukuweza kukamilika, `restricted` kwenye mwenyeji wa
dashibodi ambao si loopback ambapo uchunguzi hurukwa upande wa mteja,
`unavailable` baada ya kuchunguzwa na kuthibitishwa kukosekana, au `available`
pamoja na matoleo ya FFmpeg/ffprobe) — huhifadhi vikomo vya
uwezeshaji/modeli/fremu/video/muda, huchuja kichaguzi cha modeli kwa modeli
zenye uwezo wa vision, na kuonyesha vihesabuji vya video.

Kadi ya zamani ya Vision Bridge chini ya mipangilio ya AI ni kiungo cha
uoanifu kuelekea ukurasa mpya; haimiliki tena nakala ya pili ya fomu. Media
Providers pia huunganisha mtiririko wa kazi wa Image-to-Text na Speech-to-Text
kwa tabo zinazolingana za Modality Bridge bila kuondoa uwanja wa majaribio
uliopo wa Speech-to-Text.

**Kuruka kuingizwa kwa self-loop:** pale wito wa kueleza unapopitishwa kupitia
self-loop ya `/v1` ya OmniRoute yenyewe (modeli ya mtoa huduma isiyo ya
kawaida), ombi ndogo hutuma `x-omniroute-admission-bypass: internal` na
huthibitishwa kwa utambulisho wa self-loop uliotatuliwa — sentinel ya ndani
`sk_omniroute` katika hali ya ndani, au ufunguo wa env
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` uliosanidiwa na mwendeshaji (#1350) ili
usambazaji wa `REQUIRE_API_KEY=true` bado uweze kuendesha wito wa kueleza.
Kuruka hukubaliwa tu kwa utambulisho huo halisi, hivyo wateja wa nje
hawawezi kutumia kichwa hicho kuruka uingizwaji.

Chaguo-msingi za zamani zipo katika `src/shared/constants/visionBridgeDefaults.ts`;
chaguo-msingi mpya za hali/task-aware/cache na mtatuzi wa mipangilio zipo
katika `src/shared/constants/modalityBridgeDefaults.ts`. Mlinzi wa guardrail
unaonesha chaguo la kijenzi `deps` ili majaribio yaweze kuingiza utekelezaji wa
bandia wa `getSettings` na `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Hukatiza maombi ya chat yenye sauti kabla hayajafika kwenye lengo ambalo
halijulikani kukubali ingizo la sauti. Haielekezi upya ombi la chat kamwe:
sehemu za sauti hunukuliwa kupitia sehemu ya mwisho ya multipart inayooana na
OpenAI iliyopo na modeli iliyochaguliwa ya chat inaendelea na manukuu ya maandishi.

Mtiririko:

1. Tatua `supportsAudio` kupitia `getResolvedModelCapabilities()`. Metadata
   wazi ya provider-registry hushinda, kisha metadata tuli ya modeli, kisha
   `modalities_input` iliyosawazishwa. Orodha ya ingizo iliyotangazwa bila
   `audio` ni `false`; kutokuwepo kwa ushahidi wa uwezo hubaki `null`. Zote
   `false` na `null` huamsha daraja la kihafidhina, ilhali `true` huliruka.
2. Tatua mipangilio ya `modalityBridgeAudio*` na kutoa sehemu za sauti za
   ngazi ya juu zinazoweza kutenganishwa kutoka kwa kila ujumbe kupitia
   kichunguzi cha pamoja `detectMediaParts()`. Maumbo ya waya yanayoungwa
   mkono ni `input_audio` ya OpenAI, `audio_url`, na
   `source.media_type: "audio/*"`. Sauti iliyojikita ndani hugunduliwa kwa
   ajili ya urutaji lakini haiondolewi na njia ya kutenganisha. Kazi hupunguzwa
   na `modalityBridgeAudioMaxClips`; sehemu zinazofuata hubaki zisizoguswa.
3. Heshimu `provider/model` iliyosanidiwa, au acha `selectAudioBridgeModel()`
   ipite kwenye `AUDIO_TRANSCRIPTION_PROVIDERS` kwa mpangilio imara wa
   katalogi na kuchagua modeli ya kwanza yenye hati sahihi ya mtoa huduma
   inayotumika.
4. `callAudioTranscription()` hubadilisha sauti ya base64/data-URI kuwa
   `file` ya multipart, au kupakua `audio_url` ya mbali kupitia ulinzi wa
   nje unaoruhusu anuwai za umma pekee wenye kupenya DNS na kikomo cha
   25 MB. Kisha hutuma kwa POST faili na modeli iliyochaguliwa kwenda kwenye
   kitanzi cha ndani `/v1/audio/transcriptions`, ikithibitishwa kwa
   `resolveSelfLoopBearer()`. Njia iliyopo ya unukuzi hufanya utafutaji wa
   kawaida wa hati, usimamizi wa cooldown/rate-limit, na usambazaji kwa mtoa
   huduma.
5. Mito maulizo mafanikio hubadilisha sehemu zao na `[Audio N]: <transcript>`.
   Maulizo huendeshwa kwa `Promise.allSettled`: kushindwa kwa moja kwa moja
   huhifadhi sehemu hiyo ya sauti asilia (mkataba wa #4012). Ikiwa kila
   mwito unashindwa na lengo limethibitishwa `supportsAudio === false`,
   sehemu hizo hugeuka
   `[Audio N]: (unavailable — no STT provider connected)` (mkataba wa #8430).
   Kwa lengo lisilojulikana (`null`), matokeo ya kushindwa kwa zote hubaki
   hayajaguswa. Lengo lililothibitishwa kuwa la maandishi pekee bila hati
   ya STT inayotumika hupokea kizio hicho hicho wazi bila kutoa mwito wa
   mtandao.

Manukuu yaliyofanikiwa hutumia kache ya LRU/TTL ya Modality Bridge inayogawanywa
na mchakato mzima. Ufunguo huunganisha kirejeo cha sauti, lebo imara ya
operesheni `audio-transcription`, na modeli ya STT iliyochaguliwa; kushindwa
hakuhifadhiwi kamwe kwenye kache. Majaribio ya sauti husasisha vikwazo vya
pamoja `bridged`, `cacheHits`, `failures`, na `lastUsedAt`. Majibu
yaliyobadilishwa hubeba
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; maombi
yasiyoguswa hayapokei sehemu ya Audio Bridge.

Mipangilio ya wakati wa utekelezaji huingizwa kwenye DB na kuthibitishwa kwa Zod:

| Key                           | Default | Range          |
| ----------------------------- | ------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —              |
| `modalityBridgeAudioModel`    | `""`    | Auto or STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10           |

Kache ya pamoja hubaki ikidhibitiwa na `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, na `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Huingilia sehemu za video za kiwango cha juu katika Ukamilishaji wa Gumzo `messages` na Majibu API `input` kabla ya lengo bila usaidizi wa video asili kuitwa. Maumbo yanayotumika ni `input_video`, `video_url`, `video_source`, HTTPS URLs, na data `data:video/*;base64,...` URIs. Majina matupu ya faili katika maandishi hayachukuliwi kama video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) inamiliki upitishaji wa ombi, hundi capability/policy, ujumlisho wa kila ombi, na mzigo wa majibu. Upataji wa — kwa kila video, akiba ya matokeo yote, inayoelezea mfuatano wa fremu (ambao huunganisha manukuu yoyote ya sauti yaliyotangazwa na mpigaji), na kwa kila jaribio metrics/abort/cleanup — hufichwa nyuma ya `processVideoPart` katika `videoBridgePipeline.ts`, inayoitwa mara moja kwa kila sehemu ya video ndani ya kitanzi cha `preCall`. Sehemu hiyo pia inafafanua mipaka ya mlango dhahiri `VideoMediaBrokerPort` (kupata baiti na kutoa sampuli za fremu), `VideoAudioTranscriptionPort` (kuunganisha manukuu ya sauti iliyotangazwa na mpigaji simu na manukuu yaliyotolewa sampuli), na `VideoDrilldownPort` (umbo la hifadhi ghafi lililorithiwa). STT ya uzalishaji na uhifadhi wa fremu huundwa kuzunguka lango inayoelezea kupitia `createVideoSttAdapter` na `createVideoDrilldownAdapter`; ya mwisho hutumia mzunguko wa maisha wa kipini opaque kilichoshirikiwa.

Njia ya ombi la `/v1` hadharani kamwe haiagizi nje au kuitisha mchakato mdogo. Video za mbali hupakuliwa chini ya MiB 50; video za inline base64 zina kikomo cha kihafidhina MiB 36 kilichosimbwa kwa kila video ili bahasha model/messages/framing ibaki ndani ya kikomo cha ombi la JSON la umma cha MiB 50 . Urefu wa ndani na makadirio ya ukubwa uliobainishwa huangaliwa kabla ya ugawaji. HTTPS inahitajika kwenye URL ya awali ya mbali na kila kuelekezwa kwingine, kwa kutumia walinzi wa nje wa umma pekee wenye ubandiko wa DNS. Baiti kisha huvuka mpaka kamili wa ndani wa wakala `POST /api/modality-bridge/video/extract`. Njia hiyo ni `LOCAL_ONLY` na `SPAWN_CAPABLE`, inakubali ombi la kila mchakato lililothibitishwa, linaloaminika-kitanzi-kitanzi, na haikubali kamwe URL, njia ya mfumo wa faili, inayoweza kutekelezwa, au orodha ya hoja. Bomba la ukubwa wa mwili API na kisoma mwili cha nyongeza cha kidhibiti hutekeleza kwa uhuru kofia ya kuingiza dalali ya MiB 50. Foleni yake iliyo na mipaka huendesha uchimbaji mmoja kwa wakati mmoja, inaruhusu kazi nne ambazo hazijashughulikiwa, na vifuniko vinavyosubiri kuingizwa kwa 100 MiB.

Ndani ya wakala, `ffprobe` inasoma faili ya kibinafsi ya ndani; orodha ya ruhusa ya umbizo isiyobadilika haijumuishi orodha ya kucheza na fomati za faili ya maelezo. Kwa vyombo vinavyoruhusiwa vya MOV-familia, marejeleo ya data MOV ya nje yanasalia kuwa yamelemazwa kwa chaguomsingi, na amri isiyobadilika haijumui kuvipokea. Zote `ffprobe` na `ffmpeg` hutumia orodha iliyoidhinishwa ya itifaki ya `file` -only, uzi mmoja, safu za hoja zisizobadilika, hakuna ganda, na utekelezo uliotatuliwa kutoka `PATH`. Mitiririko ya jalada la picha iliyoambatishwa si wagombeaji wanaoweza kucheza. Mitiririko yote inayoweza kuchezwa lazima itimize vikomo, na mtiririko chaguomsingi dhahiri unapendekezwa kabla ya urejesho wa faharasa ya chini kabisa. Video zina kikomo kwa sekunde 600, pikseli 8,192 kwa kila kipimo, na pikseli chanzo 33,554,432. FFmpeg sampuli 1-16 za fremu JPEG za katikati, huteremsha chini ukingo mrefu hadi isiyozidi pikseli 1,024 bila kuongeza viingizi vidogo, na kamwe haipokei URL. Sampuli ni `uniform` kwa chaguo-msingi. Sera za `scene_aware` za hiari na `segment_aware` za majaribio hutekeleza pasi moja ya ziada isiyobadilika FFmpeg juu ya mtiririko wa ndani uliothibitishwa tayari, kuchagua mihuri ya eneo `showinfo` iliyo na mipaka, na kurudi nyuma kwa kubainishwa kwa pointi sawa za katikati juu ya kushindwa kwa kigunduzi, kuisha kwa muda, matokeo yenye hitilafu, au seti tupu ya mgombea. Hali ya ufahamu wa sehemu hutenga sampuli za pointi za katikati sawia na vipindi vilivyoidhinishwa vya eneo; ushahidi wa sehemu na tabia mbadala zimefafanuliwa hapa chini. Kofia ngumu ya fremu 16 inatumika baada ya uteuzi katika kila sera. Wakati ombi la kujua tukio lina bajeti ya fremu moja pekee, hutumia sehemu sawa ya katikati ya video kamili au dirisha la kuzingatia na kuripoti `policyEffective: uniform`: fremu moja ya tukio iliyochaguliwa haiwezi kuhifadhi ncha zote mbili za muda. Mpigaji simu anaweza kutoa kwa hiari kidirisha chenye kikomo cha kulenga ( sekunde `start`/`end` ); mipaka imebanwa kwa muda wa maudhui, madirisha yaliyogeuzwa nyuma au yasiyo na kikomo yamekataliwa, na sera zote za sampuli zinatekelezwa ndani ya muda uliorekebishwa pekee. Dirisha linalotokana limejumuishwa katika metadata ya sampuli na katika kiambishi awali cha maelezo kisichoaminika ili miundo ya mkondo wa chini iweze kutofautisha dondoo lililolengwa kutoka kwa rekodi kamili ya matukio.

Uzingatiaji wa nukuu ya kisemantiki ni mpangilio tofauti, ulio wazi. Hali chaguo-msingi ya uchanganuzi `full` huhifadhi kidokezo cha fremu iliyopo na kamwe haipelekei mbele maandishi ya ombi kwa muundo wa maelezo mafupi. Katika hali ya `focused`, daraja husoma tu `text`/`input_text` iliyoandikwa na mtumiaji ya hivi punde zaidi isiyo tupu kutoka kwa chombo kile kile cha Gumzo au Majibu, kuirejesha hadi NFC, kukunja vibambo vya kudhibiti na nafasi nyeupe, na kuiwekea kikomo hadi pointi 500 za msimbo wa Unicode. Matokeo tupu hurudi nyuma kwa haraka ya `full`. Kidokezo kinachoweza kutumika kinasawazishwa kama JSON katika uzuiaji wa muktadha-wa mtumiaji-usioaminika na kinaweza kutanguliza tu maelezo yanayoonekana; haiwezi kubatilisha onyo tofauti dhidi ya kufuata maagizo yanayoonekana au kusikika kwenye vyombo vya habari. Ulengaji wa maandishi hauwahi kuathiri `start`/`end` au kubadilisha sampuli ya muda.

#### FU-07 ushahidi wa sehemu ya kimuundo

`segment_aware` hutumia pasi moja ya uchambuzi wa awali iliyo na mipaka juu ya mtiririko wa video wa ndani ambao tayari umethibitishwa. Msururu wa kichujio kisichobadilika huwa na mizani isiyozidi pikseli 320 kwa upana, hutambua mabadiliko ya eneo na vipindi vilivyogandishwa, kisha sampuli kwa fremu 1 kwa sekunde kwa maelezo ya ukungu, wastani wa luma na spatial/temporal. Pasi ni sampuli 600 za muundo, uzi mmoja FFmpeg/filter, itifaki sawa `file` -only na orodha za ruhusa za kontena, MiB 1 inayofungamana na mchakato, na isizidi sekunde 30 ndani ya abort/deadline. iliyoshirikiwa ya wakala Haikubali kamwe amri, kichujio, njia, au URL kutoka kwa ombi.

Thamani za miundo ni ushahidi bainifu wa sampuli, si uelewaji wa video wa kimaana. Hazizingatii mada, vitendo, manukuu, hotuba au dhamira ya mtumiaji. Scene na kufungia mipaka kuunda makundi; kufungia ufunikaji, ukungu, kufichua, maelezo ya anga, na mabadiliko ya muda huathiri tu jinsi bajeti iliyopo ya fremu 1-16 inavyotolewa. Sehemu iliyogandishwa kikamilifu imewekwa kwenye fremu moja, huku sehemu zisizogandishwa zikishindana kwa bajeti iliyosalia. Mipaka inapozidi idadi ya fremu, ufunikaji sare wa kalenda ya matukio huhifadhiwa ili upunguzaji wa haraka usiweze kuficha sehemu ndefu inayofuata. Mipaka ya eneo ndani ya azimio la uchanganuzi wa sekunde 1 la mpaka wa kufungia imeunganishwa.

Vichujio vinavyokosekana, ushahidi malformed/empty, hitilafu ya kigunduzi, au muda uliowekwa wa uchanganuzi wa mapema haujafunguliwa kwa sera inayofanana ya sehemu ya katikati. Mpigaji simu au tarehe ya mwisho ya wakala haishindwi kufunguliwa: hukatisha mchakato wa ndani ya ndege, huzuia uchimbaji wa fremu baadaye, na mti wa muda wa kibinafsi huondolewa katika `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` hutengeneza mipangilio bainifu FFmpeg halisi kwa akiba ya manukuu baada ya kukatwa, mgao wa bajeti ya mwendo mnene, ushahidi blur/exposure/SI-TI, upunguzaji wa haraka wenye mkia mrefu, na chanya za uwongo zinazofifia taratibu. Hurekodi muda wa ukuta wa uchambuzi wa awali na, ambapo `/usr/bin/time` inapatikana, mtoto CPU na kilele RSS. Ukaguzi wake wa ubora ni maneno ya kimuundo pekee. Ubora halisi wa muundo wa maelezo mafupi unasalia kuwa `HOLD` kwa sababu waya hii haina ncha iliyoidhinishwa au hakimu iliyosimamishwa. Akiba ya fedha pia inasalia kuwa `HOLD` isipokuwa `--caption-cost-per-call-usd` itoe makadirio chanya ya kila simu; hati haitoi matokeo yoyote.

Kila fremu imezuiwa kwa MiB 4 , fremu zote mbichi kwa pamoja hadi MiB 23 , na majibu ya wakala wa mfululizo hadi 32 MiB. Saraka ya muda ya kibinafsi imeondolewa `finally`. OmniRoute haijumuishi FFmpeg na haikubali njia maalum inayoweza kutekelezeka. Kabla ya kuandika manukuu, daraja hutumia kibali cha kurudisha nyuma mwonekano wa kihafidhina: kila JPEG imepunguzwa hadi bafa ya 16 × 16 ya rangi ya kijivu na inalinganishwa tu na fremu ya mwisho iliyobaki. Kwa bajeti ya maelezo mafupi iliyoombwa juu ya fremu moja, uchimbaji hutoa mkusanyiko wa wagombeaji wenye mipaka wa hadi mara mbili ya bajeti hiyo na si zaidi ya fremu 16. Kikomo kilichoombwa kinatumika tu baada ya kupunguzwa, na watahiniwa wa kwanza na wa mwisho waliochaguliwa huhifadhiwa wakati wa upunguzaji wa mwisho wakati bajeti ni angalau mbili. Sera `grayscale-16x16-mean-cells-v2` iliyotolewa hutumia kubwa zaidi ya delta ya wastani ya luma na uwiano wa seli za vijipicha ambazo delta yake iliyosawazishwa ni angalau 0.05. Kiwango cha rudufu ni 0.04 ya mara kwa mara, iliyochaguliwa kwa ajili ya kutabirika badala ya kufichuliwa kama mpangilio wa wakati wa utekelezaji. Ishara hii ya pili ya utofautishaji wa juu huhifadhi mwendo mdogo na mabadiliko ya maandishi yanayoonekana ambayo ulinganisho wa maana pekee unaweza kuficha. Hitilafu za kilinganishi au avkodare hazifunguki na weka chanjo. Metadata ya matokeo hutenganisha watahiniwa waliotolewa, fremu zilizotumiwa kwa mafanikio na nakala za taswira zimeachwa.

Sehemu ya video iliyo na alama dhahiri inaweza kuomba laha ya mawasiliano iliyo na muhuri wa muda. Daraja huunda zaidi ya safu wima 4, gridi JPEG yenye fremu 16. Kila kisanduku cha pikseli 512 huchoma muhuri wake wa wakati wa chanzo na kuwa mkanda wa chini wa utofautishaji wa hali ya juu, huku mihuri ile ile ya saa inasalia katika metadata ya maandishi kwa ajili ya uhusiano na ukaguzi wa mkondo wa chini. JPEG kamili imesalia kuwa 32 MiB. Ikiwa `sharp` haiwezi kusimbua au kutunga gridi ya taifa, daraja hurejea kwenye fremu za JPEG binafsi; mimba ya mteja bado inaeneza kupitia operesheni ya laha.

Ushahidi wa ukuzaji umetenganishwa kimakusudi na alama ndogo ya utunzi sintetiki. `scripts/perf/video-bridge-contact-sheet-eval.ts` inafafanua uunganisho wa A/B uliobadilishwa kwa schema kwa miundo halisi ya maono inayooana na OpenAI. Hupima tokeni zinazoripotiwa na mtoa huduma, muda wa kusubiri wa ukuta kutoka mwanzo hadi mwisho (ikiwa ni pamoja na muundo wa laha), hesabu ya simu za kielelezo, na uhifadhi wa ukweli uliobainishwa. Majibu ghafi ya mfano hayajaandikwa kwa ripoti; muhtasari wa SHA-256 tu na IDs ya ukweli unaolingana ndio huhifadhiwa. Kuunganisha hakuna simu ya mtandao au ya kulipia isipokuwa `--execute-real` imepitishwa na `--model`, `OMNIROUTE_BASE_URL`, na `OMNIROUTE_API_KEY` zimesanidiwa. Bila utendakazi huo wa wazi, hukumu yake inayoweza kusomeka kwa mashine inabaki `HOLD`; vipimo vya syntetisk payload/call-count pekee sio ushahidi wa kukuza.

Wapigaji simu wanaweza kuambatisha safu ya hiari `transcript.cues` kwenye sehemu ya video inayotumika wakati tayari wana maandishi yaliyopangiliwa. Kila alama lazima iwe na `text`, muda wa `start`/`end` ndani ya muda uliochunguzwa, na `source` iliyoidhinishwa (`client`, `embedded`, au `audio-bridge`); `confidence` hubadilika kuwa `1` na lazima ibaki kati ya `0` na `1`. Vidokezo halisi vinavyorudiwa vimekunjwa. OmniRoute huwa haiwanzishi unukuzi kutoka kwa metadata hii: viashiria vilivyoidhinishwa vinanakiliwa kwenye matokeo yaliyoelezwa kwa chanzo, uhakika, na muda, na hutolewa kama uchunguzi usioaminika pamoja na manukuu ya fremu. Maandishi batili, yaliyo nje ya masafa, au yasiyo na asilia yamekataliwa badala ya kuchanganywa katika mtiririko wa manukuu. Vituo vyote viwili vya manukuu ya mwili hurekebisha asilia iliyotolewa kwa `client`, ikijumuisha lebo za `embedded` au `audio-bridge` zinazojidai. Adapta inayomilikiwa na seva pekee ndiyo inayoweza kukabidhi lebo hizo zinazoaminika kupitia hoja ya `trustedSource` msimbo pekee; sehemu ya ombi JSON haiwezi kufikia hoja hiyo. Maandishi ya maandishi yanasalia kuwa maudhui yasiyoaminika yanayotokana na media, bila kujali asili yake, na haipaswi kamwe kubainisha uidhinishaji.

Mpigaji simu mahiri anaweza kutoa wimbo `audioTranscript` kwa video sawa; inachukuliwa kama maandishi yaliyotolewa na mteja, sio uthibitisho wa unukuzi wa seva. Mshono wa muunganisho huendesha uchunguzi wa picha na sauti chini ya tarehe moja ya mwisho na ishara ya kuacha, huamuru kwa rekodi ya matukio ya kawaida, hukunja nakala kamili, na kuripoti matokeo kidogo wakati upande mmoja tu utafaulu. `audioTranscript` batili inashusha hadhi hadi matokeo hayo kiasi — maelezo yanayoonekana yanawekwa na tawi la sauti hurekodi msimbo wa kushindwa uliosafishwa — badala ya kushindwa video nzima. Upatikanaji wa kila tawi, bendera kiasi, na misimbo ya kushindwa iliyosafishwa huhifadhiwa katika matokeo yaliyoelezwa, katika metadata ya guardrail (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), katika metadata ya akiba ya matokeo, na katika kaunta za kuunganisha daraja. Njia chaguomsingi ya Daraja la Video haitumii matamshi-kwa-maandishi au kupakua nakala ya midia ya pili; bila wimbo huo wazi, itasalia kuwa video pekee.

**Uhifadhi wa nakala (#12150 P1).** Hii inatumika kiotomatiki wakati wowote Daraja la Video (lenyewe likichagua kuingia) linatoa alama ya manukuu — hakuna bendera tofauti ya uhifadhi. Wakati ombi linatoa kielelezo chochote cha manukuu ( `transcript` iliyotangazwa na mpigaji simu au `audioTranscript` iliyounganishwa ), mlinzi huweka alama `videoBridgeObserved` na kutoa kivuli kilichowekwa upya cha maelezo ya video — uwasilishaji sawa ambapo kila kipengele cha maandishi-huru cha cue kinabadilishwa na `[redacted-video-transcript]`, kilichojengwa kwa kubadilisha kamba kabla ya kuunganisha muundo. maandishi bapa, kwa hivyo hakuna maudhui ya kidokezo — ya kiadui au ya kawaida, ikiwa ni pamoja na miili iliyo na `]` kama vile `[inaudible]`/`[music]` — inaweza kudumu). Mwili wa ombi la kumbukumbu ya simu unaoendelea hubadilisha kila sehemu ya maandishi inayotokana na video kwa kivuli hicho kilichorekebishwa, kinacholingana na usawa wa maudhui; nanga ya `fullText` inasomwa tena kutoka kwa malipo ya awali ya simu ya awali ya guardrail, kwa hivyo mechi bado inafaulu baada ya misururu ya ulinzi ya baadaye (vifuniko vya PII na sifa, vipaumbele 10/95) andika upya maandishi ya maelezo mahali pake na baada ya sindano ya system-prompt/handoff/memory kuunda upya safu ya ujumbe. Mwili uliotumwa juu ya mkondo kwa mfano haujabadilika. Ombi linalozingatiwa pia halijaza Kumbukumbu isiyodumu (wote ombi- na uchimbaji unaotokana na jibu haurukwa), kwa hivyo jibu la kielelezo mwenyewe haliwezi kutoa mwangwi wa maandishi kwenye Kumbukumbu.

**Sehemu mbichi za video (#12430).** Wakati daraja limewashwa na usaidizi wa video asili haujulikani au haupo, sehemu za `transcript`/`audioTranscript` zilizobainishwa pia huwasha `videoBridgeObserved`, hata baada ya kushindwa kwa maelezo au kikomo cha `maxVideos`. `null` na kamba tupu huhesabu; sehemu ambazo hazipo na metadata zisizo za video hazifanyi. Nakala zilizohifadhiwa hurekebisha sehemu hizi au kuacha ombi, na caches/Memory hupitwa.

Kwenye njia hizo mbadala, vidokezo halali vya mpigaji simu vinatumika sehemu za `text`/`input_text` badala ya sehemu zisizo za kawaida za mtoa huduma. Nyimbo zote mbili zilizotolewa na ombi zinasalia kuwa uchunguzi wa `client` usioaminika, kukiwa na onyo la wazi kwamba video haikuelezwa na mihuri ya muda haikuthibitishwa dhidi ya vyombo vya habari. Bajeti zilizopo za jumla 256-cue/64-KiB na kila-cue zinatumika katika nyimbo mbili kwa pamoja; mihuri ya muda lazima ilingane na dari ya wakala ya sekunde 600 na dirisha lolote la kuzingatia lililotolewa. Nyimbo batili hutupwa, si kusambazwa kama maandishi ya kiholela; ndugu halali bado anaweza kutumika isipokuwa bajeti yao ya pamoja imepitwa. Null/empty sehemu haziongezi maandishi. Hakuna uletaji wa maudhui au unukuzi unaoongezwa na njia mbadala hii. Sehemu za upanuzi wa nakala huondolewa kutoka kwa mtoa huduma wa video mbadala na vipengee vyake vya `video_url`/`source`. Orodha ya ruhusa ya waya OpenAI inakaa kali; watoa huduma za video wasiojulikana wanaendelea kupatikana na walengwa wanaojulikana wa maandishi pekee huweka alama salama. Vivuli vya urekebishaji vilivyoundwa hulinda maandishi yaliyoambatishwa, ilhali ombi asili linalomilikiwa na mpigaji bado halijabadilika. Malengo yanayoauniwa na wenyeji na madaraja yaliyozimwa huhifadhi tabia yao iliyopo ya kupita.

Nakala za ziada zilizobakiwa hutumia ishara sawa ya ombi. Picha mbichi ya ombi la mteja wa kabla ya ulinzi, ombi linalosubiri kuhifadhiwa kwenye kumbukumbu, na kumbukumbu ya ombi lililokataliwa mapema hubadilisha kimuundo sehemu za nakala katika sehemu za video; Vidokezo vya mfuatano vilivyosanifiwa kwa hatua za bomba na makabidhiano ya muktadha yanarekebishwa kwenye sinki ya ombi-mwili inayoendelea. Alama `video_content_removed` inayoendelezwa hufanya mwendelezo wa `previous_response_id` kushindwa kufungwa badala ya kuunda upya maandishi ambayo yalitupwa kimakusudi. Ikiwa ombi lililozingatiwa litapoteza kivuli chake cha urekebishaji wa kila sehemu kabla ya kuingia, au hata mojawapo ya vivuli kadhaa vya video hutalingana baada ya mabadiliko ya ombi la baadaye, mwili wa ombi lililobakizwa huondolewa kabisa badala ya kuhifadhi nakala iliyorekebishwa kwa kiasi.

Kwa ombi linalozingatiwa, jibu la kielelezo linaweza kunukuu sehemu yoyote ya manukuu bila mpaka wa alama uliopangwa. Kwa hivyo `responseBody` yake inayoendelea ya logi inabadilishwa na alama ya kuacha; kisanii cha kina cha bomba (ambacho kinaweza kujumuisha miili upstream/client na vipande vya mtiririko) hakijahifadhiwa. Akiba za kisemantiki, kutokuwa na uwezo, na urejeshaji wa hoja husomwa na kuandika kwa ombi hilo. Ombi la mtoa huduma na majibu yanayoonekana kwa mteja hayajabadilika. Baiti za awali za keepalive hutolewa kutoka kwa bafa ya muda wakati vizalia vya programu vya kina vimeachwa. Onyo la Kiro lenye EventStream huripoti hesabu ya baiti ya upakiaji pekee, kamwe maudhui yake au hitilafu ghafi ya mchanganuzi wa JSON. Hii haidai kwamba kila uchunguzi wa provider/plugin usiohusiana umekaguliwa; ufagiaji mpana zaidi wa kuzama unafuatiliwa katika #11658.

Mzunguko wa maisha `/api/modality-bridge/video/drilldown` wa ndani ni sehemu ndogo ya kache ya loopback/token-authenticated tofauti. Kila operesheni pia inahitaji kanuni opaque kuu ID. Kabla ya mpigaji simu wa uzalishaji kuwezeshwa, ni lazima ipate ID hiyo kutoka kwa mpangaji aliyeidhinishwa na haipaswi kamwe kusambaza thamani iliyochaguliwa na mteja. Vifunguo vya akiba humfunga mkuu huyo kwa kipindi cha kisheria na marejeleo ya video IDs, kuhifadhi vitufe vyao SHA-256-derived pekee, na upeo wa usomaji na ufutaji kwa mkuu sawa. Akiba huhifadhi zaidi ya fremu 16 zinazotokana na JPEG kwa kila ingizo, huisha muda wake baada ya dakika kumi, na kutumia `start`/`end` zilizo na mipaka ya usomaji au ufutaji wa kipindi wazi.

Kila mkuu ni mdogo kwa maingizo 16 na MiB 64 za data ya kisheria JPEG. Vikomo hivyo ni huru kutoka kwa kiwango cha kimataifa 64-entry/256 MiB : shinikizo la sehemu kuu huondoa tu maingizo ya mkuu ambayo hayakutumika hivi majuzi zaidi kabla ya kuondolewa kwa LRU duniani kuzingatiwa. Maingizo yaliyoisha muda wake yamefagiliwa kutoka kwa uhasibu mkuu na wa kimataifa kwenye shughuli za akiba, huku kughairiwa na kutofaulu kwa uthibitishaji kusiwe na uingizwaji wa sehemu.

Akiba inakataa Base64 isiyo ya kisheria, pedi za ziada, media zisizo za JPEG, zilizoharibika au zilizopunguzwa JPEGs, na JPEGs ambazo hutoa onyo wakati wa kusimbua `sharp` yenye picha kamili. Husimba tena kila picha inayokubalika kama kanuni JPEG, hupata upana na urefu kutoka kwa baiti zilizobainishwa badala ya kuamini sehemu za mpigaji simu, na hutupa baiti zozote za polyglot zinazofuata badala ya kuzihifadhi. Ni bafa iliyobanwa ya kisheria pekee ndiyo inachajiwa kwa viwango vyote viwili. Kikomo cha waya JSON kinajumuisha sehemu ya juu ya Base64 kwa dari ya 32 MiB ya kuingiza msimbo. Kila toleo lililohifadhiwa hurekodi JPEG format/resolution, sera ya sampuli iliyoidhinishwa, toleo la toleo, wakati wa kuunda, rejeleo la mzazi lililoharakishwa pamoja na rejeleo la maudhui ya mzazi la mpiga simu anayeaminika. Ughairi huangaliwa kati ya awamu decode/hash zisizolingana kabla ya ahadi ya kache ya atomiki.

Mtayarishaji hutumia tena fremu za wakala zilizokwishatolewa baada ya uchanganuzi wa taswira uliofaulu, bila download/extraction. ya pili ya video Inahitaji opereta `modalityBridgeVideoDrilldownEnabled=true`, kali kwa kila sehemu `drilldown: true`, na rekodi ya ufunguo wa API iliyothibitishwa ID. Thamani principal/session zilizotangazwa na mteja hazianzishi umiliki kamwe. Bila masharti yote matatu haibadilishi ukubwa wa fremu, kubadilisha ukubwa au kubakiza. Kushindwa kwa uhifadhi huhifadhi jibu la kuona linaloweza kutumika. Maombi yaliyoidhinishwa hukwepa akiba ya matokeo ya video nzima ili matokeo yaliyohifadhiwa yasicheze tena vishikizo.

Majibu ya JSON na SSE yaliyofaulu yanafichua angalau vishikizo vinne visivyo na alama kwenye kichwa kilicho na mipaka `x-omniroute-video-drilldown`. Asili za kivinjari zilizoidhinishwa zinaweza kusoma kichwa hicho bila kupanua sera ya asili ya CORS. Ncha mpya hutumia `v1.<32-byte random base64url token>`, na sajili hubakiza tu heshi zao SHA-256. Kichanganuzi reader/header pia kinakubali tokeni za urithi 64-hex. Mtumiaji wa umma aliyeidhinishwa ni `GET /api/v1/video-bridge/drilldown?handle=...`, iliyowekwa kwa uhuru na `modalityBridgeVideoDrilldownRemoteEnabled=true`. Uongo dhahiri unaoendelea hubatilisha ufikiaji hata wakati mfumo mbadala `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env umewashwa. Uhifadhi wa uzalishaji una urithi unaofanana wa `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED`. Njia zote mbili chaguo-msingi zimezimwa.

Mtumiaji hupata umiliki kutoka kwa ufunguo ulioidhinishwa na kutumia sera muhimu: GET na DELETE zote ni za kategoria ya ncha `video`, ikijumuisha lakabu za `/v1` na `/api/v1`. Vifunguo vilivyo na orodha ya vibali vya mwisho visivyo na utupu lazima vijumuishe `video`; funguo zisizo na kikomo zinasalia sambamba. Mtumiaji anarudi 404 sawa kwa haijulikani, muda wake umeisha na vipini vya ufunguo mwingine. Inakubali `variant=preview|standard|detail` (kiwango cha juu zaidi cha JPEG 320/640/1280, haijapandishwa daraja), `limit=1..8` (au lakabu `frames` ya urithi, kamwe zote mbili), `page` yenye sifuri, na sekunde za kulenga `start`/`end` hiari. Vifunguo vya hoja vinavyorudiwa na madirisha yaliyoelekezwa kinyume yamekataliwa. Kila kibadala kilichorejeshwa kina heshi ya maudhui yake halisi na metadata halisi ya azimio, iliyounganishwa na chanzo kilichohifadhiwa. Lahaja hutolewa kwa kusomwa badala ya kuhifadhiwa kama nakala za ziada zilizohifadhiwa. Jibu la JSON, ikiwa ni pamoja na Base64/envelope, limefungwa kwa MiB 32; ukurasa mkubwa unarudisha 413 na mteja lazima aombe fremu chache. Husoma kughairiwa kwa hundi karibu na kila kubadilisha ukubwa na kukagua upya uhalali wa kipini kabla ya kurejea. `DELETE` kwa mmiliki haina nguvu; ufutaji au kuisha kwa TTL kunatoa chanzo kilichobakishwa na uhasibu wa matumizi.

Duka la pamoja ni la mchakato wa ndani: muda wa vishikio huisha wakati wa kuanzishwa upya na hauwezi kuhamishwa kati ya michakato huru OmniRoute. Takwimu za usimamizi hufichua sera madhubuti ya uhifadhi/udhibiti wa mbali na jumla ya entries/bytes iliyohifadhiwa pekee, si midia, marejeleo, IDs kuu au vishikio. Paneli ya mipangilio ya Video inaonyesha thamani hizo na inaweza kuendelea na swichi zote mbili za idhini. Hati hizi za utekelezaji si ushahidi wa usambazaji wa moja kwa moja au utangazaji; kukubalika kwa mfano halisi hufuatiliwa kando.

Fremu zimepewa manukuu kwa kufuatana na muundo wa Video uliosanidiwa. Ubatilishaji wa Video tupu hurithi mpangilio wa Maono; ikiwa zote mbili ni tupu, kipanga njia otomatiki cha Vision huchagua kielelezo chenye uwezo wa kuona. Manukuu yaliyofanikiwa yanabadilisha sehemu ya asili na kiambishi awali `[Video description:` ambacho pia huashiria maandishi kama uchunguzi unaotokana na media usioaminika na huambia miundo ya chini ya mkondo isifuate maagizo yanayopatikana kwenye media. Vifunguo vya akiba ya fremu-nukuu ni pamoja na baiti za JPEG, papo hapo, muhuri wa muda, na muundo bora; manukuu yaliyofaulu pekee ndiyo yamehifadhiwa. Maingizo ya akiba huhifadhi muundo halisi wa mzalishaji aliyefaulu, ikijumuisha muundo mbadala; daraja linaripoti `mixed` wakati muafaka tofauti ulitolewa na miundo tofauti. Akiba iliyogonga hutumia tena kitambulisho hicho cha mtayarishaji badala ya kukipa jina jipya kama mpango wa uelekezaji ulioombwa. Akiba ya matokeo ya video nzima huwekwa kwenye kila ingizo ambalo hubadilisha kidokezo cha — cha kutoa, muundo faafu, sera ya sampuli, hesabu ya fremu, hali ya uchanganuzi wa kisemantiki, alama ya vidole SHA-256 ya kidokezo cha kawaida cha kulenga, dirisha la kuzingatia, `transcript`, `audioTranscript`, na alamisho ya laha ya mwasiliani — kwa hivyo kubadilisha vipimo vyovyote kati ya hivyo si kosa tena. Toleo la sera ya ujumuishaji unaoonekana, kiwango cha juu, na hesabu ya fremu ya mtahiniwa yenye mipaka pia ni bayana katika ufunguo wa akiba ya matokeo na metadata; kwa hivyo mabadiliko ya sera hayawezi kutumia tena maelezo ya zamani ya video nzima. Metadata ya akiba ya matokeo ya v4 huweka modi na alama ya vidole, kamwe sio kazi ghafi ya mtumiaji. Metadata ya Guardrail inaripoti aina zote mbili za uchanganuzi zilizoombwa na madhubuti; hali ya `focused` iliyoombwa bila maandishi ya mtumiaji inayoweza kutumika inaripotiwa kwa ufanisi `full`.

guardrail hutoa kila sehemu ya video inayotumika lakini haielezei zaidi ya `modalityBridgeVideoMaxVideos`. Kwa lengo lililothibitishwa kuwa na `supportsVideo === false`, video ambazo hazijafaulu na zilizo na kikomo kupita kiasi huwa alama za maandishi salama kwa hivyo hakuna video ghafi iliyosalia. Wakati uwezo haujulikani, sehemu hizo huhifadhi mtoa huduma wao wa video; nakala yoyote mbadala inafuata ubadilishaji wa maandishi ulio na mipaka hapo juu. Malengo na `supportsVideo === true` bypass daraja. Ombi la mteja la mawimbi ya kuacha mimba hueneza kupitia upakuaji, foleni ya wakala, michakato midogo, na manukuu; abortions kuacha kati ya video na kamwe kushindwa wazi kwa vyombo vya habari ghafi.

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

### PII Maker (`piiMasker.ts`)

Huendelea **zote mbili** hatua.

- **`preCall`** hufunga mzigo wa malipo, hutembea `system`, `messages`, `input`, na `prompt` (pamoja na vipengee vya kamba wazi), na kutumia `processPII()` (kutoka `@/shared/utils/inputSanitizer`) hadi sehemu za `content`/`text` za kamba. Wakati `PII_REDACTION_ENABLED=true`, PII imetambuliwa inarekebishwa katika upakiaji wa nje. Hii haitegemei `INPUT_SANITIZER_MODE` (ambayo inadhibiti sera ya udungaji wa papo hapo). Wakati urejeshaji umezimwa, utambuzi wa rekodi za simu huhesabiwa bila kuandika upya maudhui.
- **`postCall`** kina-clones majibu, huendesha `sanitizePIIResponse()` pamoja na masker ya umbo la Responses-API (`maskResponsesOutput` — inashughulikia `output_text` na `output[].content[].text`). Ikiwa urekebishaji wowote utatokea, jibu lililobadilishwa litachukua nafasi ya asili.

Njia ya ulinzi haizuii kamwe; inabainisha tu (`meta.detections`, `meta.redacted`) au inaandika upya.

#### Uteuzi wa kila aina, mifumo maalum na vihesabio vya kutambua

**Mipangilio ya Dashibodi ya → → ya → PII** huchagua _nini_ kimefunikwa. Haiwashi ufunikaji: hiyo bado ni `PII_REDACTION_ENABLED` (ombi) na `PII_RESPONSE_SANITIZATION` (jibu + SSE), zote zimezimwa kwa chaguo-msingi.

- **Uchaguzi wa kila aina** — vitambulisho vilivyojengwa vimeorodheshwa katika `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Kutowekwa kunamaanisha kila aina (tabia kabla ya mpangilio huu kuwepo). Ramani za muundo wa `ssn_us` za injini ya ombi hadi `ssn`. Violezo (Kidogo, Kawaida, Kifedha, Kibrazili, USA, GDPR, POPIA, Kamili) hujaza visanduku vya kuteua katika UI pekee.
- **Vitambulisho vya GDPR na POPIA** Vitambulisho kumi na viwili — vilivyojengewa ndani vinavyofunika EU na vitambulisho vya kibinafsi vya Afrika Kusini (jedwali hapa chini). Regexes zao, vithibitishaji na vitambulisho vya mamlaka huishi katika jedwali moja, `src/shared/utils/piiPatterns.ts`, ambayo kisafishaji cha majibu (`src/lib/piiSanitizer.ts`) na kinyago ombi (`src/shared/utils/inputSanitizer.ts`) hutumia. Ulinganifu unafanywa upya tu wakati mthibitishaji wake anakubali; kukimbia wazi kwa tarakimu haitoshi kamwe. Opereta aliyehifadhi uteuzi finyu kabla ya vitambulisho hivi kuwepo huweka tabia aliyokuwa nayo hadi vitambulisho vipya viweke tiki.
- **Mitindo maalum** — hadi ruwaza 20 za regex au kadi-mwitu (`*` = hadi herufi 64 zisizo za anga, `?` = moja). Mechi zinakuwa `[CUSTOM_REDACTED]`. Kila mchoro hupitia `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): isizidi herufi 500, bendera pekee `g i m s u`, lazima zijumuishwe, lazima zipitishe `safe-regex` (nyuma ya janga), na zisilingane na mfuatano tupu au kishikilia nafasi cha urekebishaji. Mchoro ambao haufaulu hukataliwa unapohifadhiwa na unapojaribiwa, na safu mlalo iliyohifadhiwa ambayo itashindwa kurukwa wakati wa utekelezaji badala ya kukusanywa. Miundo maalum huendeshwa tu wakati ufunikaji umewashwa.
- **Vihesabio vya kugundua** Hesabu za — kwa kila aina (thamani ambazo hazijalinganishwa kamwe), zilizohifadhiwa kwenye kumbukumbu na kuweka upya wakati wa kuanza tena (`src/lib/pii/piiDetectionStats.ts`). Zinaongezeka tu wakati masking imewashwa.

Mipangilio inaishi katika jedwali la `key_value` (nafasi ya jina `pii_settings`, `src/lib/db/piiSettings.ts`) na inasomwa kupitia kache ya 1 s. API:

| Mbinu  | Njia                     | Madhumuni                                                                             |
| ------ | ------------------------ | ------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Hali ya bendera, `enabledTypes`, `customPatterns`, vihesabia vya utambuzi             |
| `PUT`  | `/api/settings/pii`      | Badilisha `enabledTypes` (`null` = zote) na/au `customPatterns`                       |
| `POST` | `/api/settings/pii/test` | Jaribio la kavu la ruwaza moja dhidi ya sampuli ya hadi KB 8; hakuna kinachohifadhiwa |

Zote tatu zinahitaji uthibitisho wa usimamizi na kuhalalisha shirika kwa Zod (`src/shared/validation/schemas/piiSettings.ts`). Ikiwa kuingia kumezimwa (`requireLogin=false`) `GET` na mwisho wa jaribio umefunguliwa, lakini `PUT` bado inahitaji kipindi cha dashibodi, kitufe cha `manage` -scope API, tokeni ya ufikiaji `oma_` yenye upeo wa kuandika au juu zaidi, au tokeni ya CLI au tokeni ya huduma ya ndani iliyotumwa kutoka kwenye loopback.

#### Vitambulishi vya GDPR (EU) na POPIA (Afrika Kusini).

| Id                  | Kitambulisho                   | Uthibitishaji                                                                                    |
| ------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------ |
| `iban`              | IBAN                           | Nchi inayojulikana, urefu kamili wa nchi hiyo, ISO 13616 MOD-97-10                               |
| `eu_vat`            | Namba ya VAT ya EU             | Kiambishi cha nchi mwanachama kinachojulikana na muundo wa namba wa nchi hiyo (bila VIES lookup) |
| `es_dni_nie`        | DNI / NIE ya Hispania          | Herufi ya ukaguzi (thamani mod 23); NIE ni `X/Y/Z` + tarakimu 7                                  |
| `it_codice_fiscale` | Codice Fiscale ya Italia       | Herufi ya ukaguzi kutoka jedwali la nafasi witiri/shufwa                                         |
| `pl_pesel`          | PESEL ya Poland                | Checksum yenye uzito na masafa yanayowezekana ya mwezi/siku ya kuzaliwa yaliyosimbwa             |
| `nl_bsn`            | BSN ya Uholanzi                | Jaribio la 11 (uzito 9..2, -1)                                                                   |
| `de_steuer_id`      | Steuer-ID ya Ujerumani         | ISO 7064 Mod 11,10 na kanuni za muundo wa tarakimu (bila 0 mwanzoni)                             |
| `se_personnummer`   | personnummer ya Uswidi         | Luhn kwenye tarakimu kumi za mwisho na tarehe ya kuzaliwa inayowezekana (tarakimu 10 au 12)      |
| `za_id`             | Namba ya ID ya Afrika Kusini   | Luhn kwenye tarakimu zote 13, mwezi/siku ya kuzaliwa halali, tarakimu ya uraia 0 au 1            |
| `za_phone`          | Simu ya Afrika Kusini          | Kiambishi `+27` / `27`, au umbo la kitaifa `0..` lililoandikwa kwa nafasi au kistari             |
| `za_vat`            | Namba ya VAT ya Afrika Kusini  | Tarakimu 10 zinazoanza na `4` **na** "VAT" / "BTW" katika herufi 48 zilizotangulia               |
| `za_tax_ref`        | Rejeo la kodi la Afrika Kusini | Tarakimu 10 zinazoanza `0`-`3`, Luhn, **na** "tax" / "SARS" katika herufi 48 zilizotangulia      |

Kwa sababu miundo ya tarakimu pekee inagongana na nambari za kuagiza, nambari za kujenga na mihuri ya muda, zile dhaifu zaidi (`za_vat`, `za_tax_ref`) zinahitaji cue ya neno kuu, na nambari ya `0..` yenye tarakimu kumi haichukuliwi kama nambari ya simu ya Afrika Kusini. IBANs zilizowekwa nafasi (`GB29 NWBK ...`) hazilingani. Kwenye njia ya utiririshaji kidokezo hutazamwa ndani ya chunk ya sasa pekee. Vitambulisho hukaa mbele ya mifumo ya simu ya kawaida, kwa hivyo kitambulishi kilichoidhinishwa huweka kishikilia nafasi chake (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Violezo vya `gdpr` na `popia` huchagua vitambulisho vya EU na vya Afrika Kusini mtawalia. Kuficha yenyewe husalia kuchagua kuingia ( Kanuni Ngumu #20): hakuna kitu hapa kinachobadilisha chaguo-msingi la kipengele cha bendera.

### Uingizaji wa Prompt (`promptInjection.ts`)

Hutambua miundo ya kishambulizi katika maudhui yanayotolewa na mtumiaji na
kutekeleza sera iliyosanidiwa. Tabia inaendeshwa na vigezo vya mazingira na
machaguo ya kizalishaji (constructor):

| Mpangilio            | Kigezo cha mazingira                                                                                     | Chaguo-msingi | Athari                                                                                                                                                                                                        |
| -------------------- | -------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Imewashwa            | `INPUT_SANITIZER_ENABLED`                                                                                | `true`        | Wakati ni `false`, kizuizi hupitishwa moja kwa moja (short-circuit).                                                                                                                                          |
| Hali                 | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                          | `warn`        | Sera ya uingizaji: `block`, `warn`, au `log`. (`redact` hukubaliwa kwa utangamano wa nyuma lakini **haiondoi** maandishi ya uingizaji; uandishi upya wa PII wa ombi unadhibitiwa na `PII_REDACTION_ENABLED`.) |
| Kizingiti cha kuzuia | chaguo la `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`        | Ukali wa chini kabisa unaohitajika ili kuzuia. Ukali wa kati ni uangalizi tu kwa chaguo-msingi.                                                                                                               |

**Kipaumbele cha hali** (`getMode`): `options.mode` ya mwitaji →
**mbadilishaji wa bendera ya kipengele kutoka DB** wa `INJECTION_GUARD_MODE`
(Dashboard → Settings → Feature Flags) → env `INJECTION_GUARD_MODE` → env
`INPUT_SANITIZER_MODE` → `warn`. Kwa hivyo mbadilishaji wa dashibodi hushinda
vigezo vya mazingira, na kwa hivyo UI ya Feature Flags hudhibiti kizuizi
kinachoendeshwa moja kwa moja (bila kuanzisha upya). Usomaji wa DB ni salama
kushindwa (fail-safe): ikikosea, kizuizi hurudi kwenye tabia inayotegemea env,
na wakati hakuna mbadilishaji uliowekwa tabia ni sawa na utatuzi wa env pekee.

Vyanzo vya utambuzi:

1. `sanitizeRequest()` kutoka `@/shared/utils/inputSanitizer` (seti ya vitanuzi
   vinavyoshirikishwa inayotumika mahali pengine katika pipeline).
2. `DEFAULT_GUARD_PATTERNS` za ndani (kwa sasa `system_override_inline` na
   `markdown_system_block`, zote mbili za ukali `high`).
3. `customPatterns` za hiari zinazopitishwa kupitia machaguo ya kizalishaji
   (strings, regex, au rekodi za `{ name, pattern, severity }`).

Wakati `mode === "block"` **na** angalau utambuzi mmoja unafikia
kizingiti cha ukali, `preCall` hurudisha `{ block: true, message: "Request rejected:
suspicious content detected" }`. Katika hali za `warn`/`log` kingalizi hurekodi
lakini huruhusu wito. Kisaidizi shiriki `evaluatePromptInjection()` pia
huagizwa nje (exported) kwa ajili ya waito wanaohitaji kutathmini vidokezo bila
kupitia rejistri.

**Kikomo cha uchanganuzi (v3.8.20):** kigunduzi hukagua **KB 16 za kwanza** tu
za maandishi ya kidokezo yaliyounganishwa — `MAX_INJECTION_SCAN_BYTES = 16 * 1024`
(baitsi 16 384) katika `src/shared/utils/inputSanitizer.ts`. Zote mbili
`detectInjection()` na `evaluatePromptInjection()` hutekeleza
`slice(0, MAX_INJECTION_SCAN_BYTES)` kabla ya kuendesha kitanzi cha ruwaza.
Maagizo ya uingizaji hupatikana karibu na mwanzo wa ingizo, kwa hivyo hili
huweka kikomo cha matumizi ya CPU/GC ya regex kwenye mizigo yenye mamia-mia ya
KB bila kudhoofisha utambuzi (taz. #3932, #4041).

### Kifichaji cha Hati za Uthibitishaji (`credentialMasker.ts`)

Hufanya kazi katika hatua **zote mbili**, wa mwisho katika mnyororo wa
chaguo-msingi (kipaumbele `95`). Huficha ruwaza maarufu za funguo za API /
tokeni za siri kutoka kwenye mzigo unaotoka (maudhui ya ujumbe, hoja za wito wa
zana, matokeo ya zana) **na** jibu la mtoaji, ili hati iliyobandikwa kwenye
kidokezo (au kurudishwa na matokeo ya zana) isivuze kwa mtoaji wa juu wala
kurudi kwa mteja.

- **Kwa kujisajili tu (opt-in)**, kwa kanuni ile ile kama ufichaji wa PII
  (inayogusana na Kanuni Ngumu #20): imezimwa isipokuwa
  `settings.credentialRedactionEnabled === true` **au**
  `CREDENTIAL_REDACTION_ENABLED=true`. Ikizimwa, kingalizi ni no-op —
  hakizuii kamwe wala hakibadilishi chochote.
- `redactCredentials()` hupitia mti mzima wa mzigo/jibu (`walkValue()`,
  salama dhidi ya uchafuzi wa prototype, salama dhidi ya mizunguko kupitia
  `WeakSet`) na kubadilisha mechi kwa kishika-nafasi `[REDACTED:<type>]`,
  huku ikinakili tu matawi yaliyobadilika kweli kweli.
- `CREDENTIAL_PATTERNS` hushughulikia funguo za watoa huduma za LLM (OpenAI,
  OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), tokeni za VCS/SaaS
  (GitHub, Slack, Linear, Notion, npm, Postman, Discord), funguo za malipo
  (Stripe, Square), funguo za wingu (AWS access key, Twilio, SendGrid,
  Mailgun), funguo binafsi / JWT, nyuzi za muunganisho zenye hati
  (`mongodb://user:pass@...`, n.k.), na ruwaza ya jumla ya thamani ya kichwa
  `Authorization`/`x-api-key`/`api-key`/`apikey`. Funguo zenye umbo la kichwa
  (`authorization`, `x-api-key`, `api-key`, `apikey`) hufichwa kwa muundo
  (thamani pekee, kiambishi cha mpango kama `Bearer `/`Basic ` kikihifadhiwa)
  badala ya kutumia regex ya maandishi ya jumla.
- Kingalizi hakizuii kamwe; kinabadilisha tu (`modifiedPayload` /
  `modifiedResponse`) na kuweka maelezo (`meta.credentialsRedacted`,
  `meta.count`).

Ulinzi dhidi ya regression: `tests/unit/credential-masker-guardrail.test.ts`.

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
