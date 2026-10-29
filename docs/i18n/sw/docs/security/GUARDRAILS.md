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

Hukamata sehemu za video za ngazi ya juu katika Chat Completions `messages`
na Responses API `input` kabla ya kuita lengo lisilo na usaidizi wa asili
wa video unaojulikana. Maumbo yanayoungwa mkono ni `input_video`,
`video_url`, `video_source`, URL za HTTPS, na URI za data
`data:video/*;base64,...`. Majina ya faili ya kawaida katika maandishi
hayachukuliwi kama video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) inamiliki upitaji wa
ombi, ukaguzi wa uwezo/sera, ujumuishaji wa kila ombi, na mzigo wa jibu.
Kazi ya kila video — upatikanaji, kache ya matokeo kamili, kuelezea mlolongo
wa fremu (ambao huunganisha nakala yoyote ya sauti iliyotangazwa na mwitaji),
na vipimo/kusitisha/usafishaji wa kila jaribio — imefichwa nyuma ya
`processVideoPart` katika `videoBridgePipeline.ts`, inayoitwa mara moja kwa
kila sehemu ya video ndani ya kitanzi cha `preCall`. Moduli hiyo pia
hufafanua mipaka wazi ya bandari `VideoMediaBrokerPort` (kupata baiti na
kutoa fremu zilizosampuliwa), `VideoAudioTranscriptionPort` (kuunganisha
nakala ya sauti iliyotangazwa na mwitaji na maelezo yaliyosampuliwa), na
`VideoDrilldownPort` (mpaka wa kudumu wa uchimbaji wa fremu; bado
haujaunganishwa kwenye `processVideoPart` — ni njia tofauti ya
`/api/modality-bridge/video/drilldown` pekee ndiyo inayoandika maingizo ya
uchimbaji kwa sasa).

Njia ya ombi ya umma `/v1` haitaingiza wala kuita subprosesi. Video za mbali
hupakuliwa chini ya kikomo cha 50 MiB; video za ndani za base64 zina kikomo
cha kihafidhina cha 36 MiB kilichosimbuliwa kwa kila video ili bahasha ya
modeli/ujumbe/uwekaji fremu iweze kubaki ndani ya kikomo cha kukubali ombi
la JSON la umma la 50 MiB. Urefu wa ndani na makadirio ya ukubwa
uliovunjwa hupimwa kabla ya ugawaji. HTTPS inahitajika kwenye URL ya mwanzo
ya mbali na kila uelekezaji upya, kwa kutumia ulinzi uliopo wa nje
unaoruhusu anuwai za umma pekee wenye kupenya DNS. Baiti kisha huvuka
mpaka halisi wa ndani wa broker `POST /api/modality-bridge/video/extract`.
Njia hiyo ni `LOCAL_ONLY` na `SPAWN_CAPABLE` kwa pamoja, hukubali tu ombi
lililothibitishwa kwa kila mchakato la trusted-loopback, na haikubali
kamwe URL, njia ya mfumo wa faili, kifao kinachoweza kutekelezwa, au orodha
ya hoja. Mfereji wa ukubwa wa mwili wa API na kisomaji cha mwili kinachoongezeka
cha kishughulikiaji hugöteza kwa kujitegemea kikomo cha ingizo la broker la
50 MiB. Foleni yake yenye mipaka huendesha uchimbaji mmoja kwa wakati,
huruhusu kazi nne zinazosubiri, na kuweka kikomo cha ingizo linalosubiri
kwa 100 MiB.

Ndani ya broker, `ffprobe` husoma faili ya ndani ya kibinafsi; orodha ruhusa ya miundo iliyobainishwa hutenga miundo ya playlist na manifest. Kwa vikasha (containers) vya familia ya MOV vilivyoruhusiwa, marejeleo ya data ya MOV ya nje hubaki yamezimwa kwa chaguo-msingi, na amri iliyobainishwa haichagui kuyawezesha. `ffprobe` na `ffmpeg` zote hutumia orodha ruhusa ya itifaki ya `file` pekee, thread moja, safu za hoja zilizobainishwa, bila shell, na programu-tekelezi zinazotatuliwa kutoka `PATH`. Mito ya jalada ya picha zilizoambatishwa si wagombea wa kuchezeshwa. Mito yote inayoweza kuchezeshwa lazima itimize vikwazo, na mkondo wa chaguo-msingi ulio bayana hupendelewa kabla ya njia mbadala ya kiamua ya kielezo cha chini kabisa. Video zimekomeshwa kwa sekunde 600, pikseli 8,192 kwa kila kipimo, na pikseli 33,554,432 za chanzo. FFmpeg huchukua sampuli ya fremu 1–16 za JPEG za katikati, hupunguza upande mrefu hadi pikseli 1,024 kwa zaidi bila kuongeza ukubwa wa ingizo ndogo, na haipokei URL kamwe. Usampulishaji ni `uniform` kwa chaguo-msingi. Sera za hiari za `scene_aware` na ya majaribio ya `segment_aware` hufanya mzunguko mmoja wa ziada wa FFmpeg uliobainishwa juu ya mkondo wa ndani uliothibitishwa tayari, huchagua alama za muda za scene za `showinfo` zenye kikomo, na hurejea kwa njia ya kiamua kwenye pointi za katikati za sare zile zile kigunduzi kikishindwa, muda ukikwisha, tokeo likiwa limepotoka, au seti ya wagombea ikiwa tupu. Hali inayozingatia sehemu hugawa sampuli za katikati kwa uwiano na vipindi vya scene vilivyothibitishwa; ushahidi wa hali inayozingatia sehemu na tabia ya njia mbadala vimeelezwa kwa undani hapa chini. Kikomo cha lazima cha fremu 16 hutumika baada ya uteuzi katika kila sera. Wakati ombi linalozingatia scene lina bajeti ya fremu moja tu, hutumia pointi ya katikati ya sare ya video kamili inayotumika au ya dirisha la lengwa na kuripoti `policyEffective: uniform`: fremu moja ya scene iliyochaguliwa haiwezi kuhifadhi ncha zote mbili za muda. Mwitaji anaweza kwa hiari kutoa dirisha la lengwa lenye kikomo (sekunde za `start`/`end`); mipaka hupigwa kikomo ndani ya muda wa media, madirisha yaliyogeuzwa au yasiyo na kikomo hukataliwa, na sera zote za usampulishaji hufanywa ndani tu ya kipindi kilichosawazishwa. Dirisha linalotokana hujumuishwa katika metadata ya usampulishaji na katika kiambishi awali cha maelezo yasiyoaminika ili modeli za mbele ziweze kutofautisha dondoo lililolengwa na ratiba kamili ya wakati.

Lengo la caption la kisemantiki ni mpangilio tofauti na bayana. Hali ya uchanganuzi ya chaguo-msingi `full` huhifadhi prompt ya fremu iliyopo na haipitishi kamwe maandishi ya ombi kwa modeli ya caption. Katika hali ya `focused`, daraja husoma tu `text`/`input_text` ya hivi karibuni iliyoandikwa na mtumiaji na isiyo tupu kutoka kwenye kontena lile lile la Chat au Responses, huisawazisha hadi NFC, hukunja herufi za udhibiti na nafasi tupu, na kuikomesha kwa pointi 500 za msimbo za Unicode. Matokeo yakiwa tupu, hurejea kwenye prompt halisi ya `full`. Kidokezo kinachoweza kutumika hupangwa mfululizo kama JSON katika kizuizi maalum cha muktadha wa mtumiaji asiyeaminika na kinaweza tu kuipa kipaumbele maelezo yanayoonekana; hakiwezi kubatilisha onyo tofauti dhidi ya kufuata maagizo yanayoonekana au yanayosikika katika media. Lengo la kimandishi halibaini kamwe `start`/`end` wala halibadilishi kisampuli cha kimuda.

#### Ushahidi wa kimuundo wa sehemu za FU-07

`segment_aware` hutumia mzunguko mmoja wenye kikomo wa uchanganuzi wa awali juu ya mkondo wa video wa ndani uliothibitishwa tayari. Mlolongo wa vichujio uliobainishwa kwanza hupunguza hadi upana wa pikseli 320 kwa zaidi, hugundua mabadiliko ya scene na vipindi vilivyoganda, kisha huchukua sampuli kwa fremu 1 kwa sekunde kwa ajili ya ukungu, luma ya wastani, na taarifa za kianafasi na kimuda. Mzunguko huo umekomeshwa kwa sampuli 600 za kimuundo, thread moja ya FFmpeg/kichujio, orodha ruhusa zile zile za itifaki ya `file` pekee na za vikasha, kikomo cha 1 MiB cha tokeo la mchakato, na sekunde 30 kwa zaidi ndani ya ukomo wa pamoja wa kusitisha/muda wa mwisho wa broker. Haukubali kamwe amri, kichujio, njia, au URL kutoka kwenye ombi.

Thamani za kimuundo ni ushahidi wa kiamua wa usampulishaji, si uelewa wa kisemantiki wa video. Hazibaini wahusika, vitendo, captions, usemi, au nia ya mtumiaji. Mipaka ya scene na ya kuganda hutengeneza sehemu; ufunikaji wa kuganda, ukungu, mwangaza, undani wa kianafasi, na mabadiliko ya kimuda huathiri tu jinsi bajeti iliyopo ya fremu 1–16 inavyogawiwa. Sehemu iliyoganda kabisa huwekewa kikomo cha fremu moja, wakati sehemu zisizoganda hushindania bajeti iliyobaki. Wakati mipaka inapozidi fremu idadi, ufunikaji sare wa ratiba ya wakati huhifadhiwa ili makato ya haraka ya mwanzoni yasiweze kuficha sehemu ndefu inayofuata. Mipaka ya scene iliyo ndani ya upeo wa uchanganuzi wa sekunde 1 kutoka mpaka wa kuganda huunganishwa kuwa moja.

Vichujio kukosekana, ushahidi ulioharibika/tupu, hitilafu ya kigunduzi, au muda wa uchanganuzi wa awali wenye kikomo kukwisha husababisha kufeli-wazi kuelekea sera halisi ya pointi za katikati za sare. Kusitishwa na mwitaji au muda wa mwisho wa broker hakufeli-wazi: huzima mchakato mdogo unaoendelea, huzuia uondolewaji wa fremu wa baadaye, na mti wa muda wa kibinafsi huondolewa katika `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` hutengeneza fixtures halisi za FFmpeg za kiamua kwa ajili ya akiba za miito ya caption baada ya kuondoa rudufu, ugawaji wa bajeti wa mwendo mnene, ushahidi wa ukungu/mwangaza/SI-TI, makato ya haraka yenye mkia mrefu, na matokeo chanya ya uongo ya kufifia kwa taratibu. Hurekodi muda halisi (wall time) wa uchanganuzi wa awali na, pale `/usr/bin/time` inapopatikana, CPU ya mchakato mtoto na kilele cha RSS. Vikaguzi vyake vya ubora ni oracles za kimuundo tu. Ubora halisi wa modeli ya caption hubaki `HOLD` kwa sababu mfumo huu wa kupima hauna endpoint iliyoidhinishwa wala mhakimu aliyegandishwa. Akiba za kifedha pia hubaki `HOLD` isipokuwa `--caption-cost-per-call-usd` itoe makadirio bayana na chanya kwa kila mwito; hati haitabuni kamwe matokeo yoyote kati ya hayo mawili.

Kila fremu imewekewa kikomo cha 4 MiB, fremu zote ghafi kwa pamoja zimewekewa
kikomo cha 23 MiB, na jibu la broker lililoserialishwa limewekewa kikomo cha 32 MiB.
Saraka binafsi ya muda huondolewa katika `finally`. OmniRoute haijumuishi FFmpeg
na haikubali njia maalum ya faili tekelezi. Kabla ya kuweka maelezo, bridge hutekeleza
hatua ya kihafidhina ya kuondoa nakala rudufu za mwonekano: kila JPEG hupunguzwa
kuwa bafa ya kijivu ya 16×16 na hulinganishwa tu na fremu ya mwisho iliyohifadhiwa.
Kwa bajeti ya maelezo iliyoombwa inayozidi fremu moja, uchopozi hutoa mkusanyiko
wenye kikomo wa fremu teule usiozidi mara mbili ya bajeti hiyo na kamwe usiozidi
fremu 16. Kikomo kilichoombwa hutumika tu baada ya kuondoa nakala rudufu, huku
fremu teule ya kwanza na ya mwisho zikihifadhiwa wakati wa upunguzaji wa mwisho
ikiwa bajeti ni angalau fremu mbili. Sera yenye toleo la
`grayscale-16x16-mean-cells-v2` hutumia thamani kubwa kati ya tofauti ya wastani
wa luma na uwiano wa seli za kijipicha ambazo tofauti yake iliyosawazishwa ni
angalau 0.05. Kizingiti cha nakala rudufu ni thamani isiyobadilika ya 0.04,
iliyochaguliwa kwa ajili ya kutabirika badala ya kufichuliwa kama mpangilio wa
wakati wa utekelezaji. Ishara hii ya pili yenye utofautishaji wa juu huhifadhi
mwendo mdogo na mabadiliko ya maandishi yanayoonekana ambayo ulinganisho wa
wastani pekee unaweza kuficha. Hitilafu za kilinganishi au kisimbuaji hufanya
mchakato uendelee bila kuzuia na huhifadhi ufunikaji. Metadata ya matokeo
hutenganisha fremu teule zilizochopolewa, fremu zilizotumiwa kwa mafanikio, na
nakala rudufu za mwonekano zilizoondolewa.

Sehemu ya video iliyowekwa alama wazi inaweza kuomba laha ya mawasiliano yenye
mihuri ya muda. Bridge huunda gridi ya JPEG yenye safu wima zisizozidi 4 na
fremu zisizozidi 16. Kila seli ya pikseli 512 hupachika muhuri wa muda wa chanzo
chake katika ukanda wa chini wenye utofautishaji wa juu, huku mihuri hiyo hiyo
ya muda ikibaki katika metadata ya maandishi kwa ajili ya uhusianishaji na
ukaguzi wa baadaye. JPEG kamili hubaki na kikomo cha 32 MiB. Ikiwa `sharp`
haiwezi kusimbua au kuunda gridi, bridge hurudi kutumia fremu binafsi za JPEG;
kusitisha kwa mteja bado huenezwa kupitia operesheni ya laha.

Ushahidi wa kupeleka kwenye uzalishaji umetenganishwa kimakusudi na kipimo kidogo
cha utendaji cha uundaji sanisi. `scripts/perf/video-bridge-contact-sheet-eval.ts`
hufafanua mfumo wa majaribio wa A/B wenye toleo la schema kwa ajili ya modeli
halisi za kuona zinazooana na OpenAI. Hupima tokeni zilizoripotiwa na mtoa huduma,
muda wa mwisho hadi mwisho wa saa halisi (ikiwemo uundaji wa laha), idadi ya miito
ya modeli, na uhifadhi wa taarifa za ukweli uliofafanuliwa na manifest. Majibu
ghafi ya modeli hayaandikwi kwenye ripoti; ni digesti za SHA-256 na vitambulisho
vya taarifa za ukweli vilivyolingana pekee vinavyohifadhiwa. Mfumo huo hautekelezi
mwito wowote wa mtandao au wa modeli ya kulipiwa isipokuwa `--execute-real`
ipitishwe na `--model`, `OMNIROUTE_BASE_URL`, na `OMNIROUTE_API_KEY` ziwe
zimesanidiwa. Bila utekelezaji huo halisi ulioombwa waziwazi, uamuzi wake
unaosomeka na mashine hubaki `HOLD`; vipimo sanisi vya data ya ombi/idadi ya
miito pekee si ushahidi wa kupeleka kwenye uzalishaji.

Wapigaji wanaweza kuambatisha safu hiari ya `transcript.cues` kwenye sehemu ya
video inayotumika ikiwa tayari wana maandishi yaliyosawazishwa. Kila kidokezo
lazima kiwe na `text`, muda wenye mwisho wa `start`/`end` ulio ndani ya muda
uliobainishwa wa video, na `source` iliyo kwenye orodha iliyoruhusiwa (`client`,
`embedded`, au `audio-bridge`); thamani chaguo-msingi ya `confidence` ni `1` na
lazima ibaki kati ya `0` na `1`. Vidokezo vinavyofanana kabisa huunganishwa.
OmniRoute kamwe haianzi unukuzi kutoka kwenye metadata hii: vidokezo
vilivyothibitishwa hunakiliwa kwenye matokeo yaliyoelezwa pamoja na chanzo,
kiwango cha uhakika na kipindi, na huwasilishwa kama uchunguzi usioaminika
pamoja na maelezo ya fremu. Maandishi batili, yaliyo nje ya kipindi, au yasiyo
na uthibitisho wa asili hukataliwa badala ya kuchanganywa kwenye mtiririko wa
maelezo. Njia zote mbili za nakala katika mwili wa ombi husawazisha uthibitisho
wa asili uliotolewa kuwa `client`, ikijumuisha lebo za `embedded` au
`audio-bridge` zilizodaiwa na mtumaji mwenyewe. Adapta inayomilikiwa na seva
pekee ndiyo inayoweza kuweka lebo hizo zinazoaminika kupitia hoja ya msimbo
pekee ya `trustedSource`; sehemu ya JSON ya ombi haiwezi kufikia hoja hiyo.
Maandishi ya nakala hubaki kuwa maudhui yasiyoaminika yanayotokana na media,
bila kujali uthibitisho wake wa asili, na hayapaswi kamwe kuamua uidhinishaji.

Mpigaji wa kiwango cha juu anaweza kutoa wimbo wa `audioTranscript` kwa video
hiyo hiyo; huchukuliwa kuwa maandishi yaliyotolewa na mteja, wala si ushahidi
wa unukuzi wa seva. Kiunganishi cha muunganiko huendesha uchunguzi wa mwonekano
na sauti chini ya tarehe moja ya mwisho na ishara moja ya kusitisha, huupanga
kwenye ratiba moja ya muda, huunganisha nakala zinazofanana kabisa, na huripoti
matokeo ya sehemu ikiwa upande mmoja pekee utafanikiwa. `audioTranscript` batili
husababisha kushuka hadi kwenye matokeo hayo ya sehemu — maelezo ya mwonekano
huhifadhiwa na tawi la sauti hurekodi msimbo wa hitilafu uliosafishwa — badala
ya kusababisha video nzima ishindwe. Upatikanaji wa kila tawi, alama ya sehemu,
na misimbo ya hitilafu iliyosafishwa huhifadhiwa katika matokeo yaliyoelezwa,
katika metadata ya vizuizi vya usalama (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), katika metadata ya akiba ya matokeo, na katika
vihesabio vya muunganiko vya bridge. Njia chaguo-msingi ya Video Bridge haiiti
ubadilishaji wa sauti kuwa maandishi wala kupakua nakala ya pili ya media; bila
wimbo huo uliotolewa waziwazi, hubaki kuwa ya video pekee.

**Uhifadhi wa nakala (#12150 P1).** Hili hutumika kiotomatiki kila
Daraja la Video (ambalo lenyewe linahitaji kuwashwa kwa hiari) linapoonyesha kidokezo cha nakala — hakuna alama tofauti
ya uhifadhi. Ombi linapoonyesha kidokezo chochote cha nakala (iwe `transcript` iliyobainishwa na mpigaji
au `audioTranscript` iliyounganishwa), kinga hulitia alama ya
`videoBridgeObserved` na kutengeneza nakala iliyofichwa ya maelezo ya video —
uonyeshaji unaofanana ambapo sehemu ya maandishi huru ya kila kidokezo hubadilishwa na
`[redacted-video-transcript]`, iliyoundwa kwa kubadilisha sehemu ya kidokezo yenye muundo
kabla ya tungo kuunganishwa (kamwe si kwa kuchanganua maandishi yaliyosawazishwa, hivyo hakuna maudhui ya kidokezo
— ya kihasama au ya kawaida, ikiwemo sehemu zenye `]` kama
`[inaudible]`/`[music]` — yanayoweza kusalia). Sehemu ya ombi katika kumbukumbu ya simu inayohifadhiwa hubadilisha
kila sehemu ya maandishi iliyotokana na video na nakala hiyo iliyofichwa, kwa kulinganisha usawa wa
maudhui; kiunganishi cha `fullText` husomwa upya kutoka kwenye mzigo uliokamilika wa kinga
kabla ya simu, hivyo ulinganishaji bado hufaulu baada ya kinga za baadaye kwenye mnyororo (vifichaji vya PII na
vitambulisho vya siri, vipaumbele 10/95) kuandika upya maandishi ya maelezo papo hapo na
baada ya udungaji wa kidokezo cha mfumo/makabidhiano/Kumbukumbu kubadilisha muundo wa safu ya ujumbe. Sehemu
inayotumwa kwenda juu kwa modeli haibadilishwi. Ombi lililoonekana pia halijazi
Kumbukumbu yoyote ya kudumu (uchimbaji unaotokana na ombi na jibu hurukwa),
hivyo jibu la modeli haliwezi kunakili maandishi ya nakala hadi kwenye Kumbukumbu.

**Sehemu ghafi za video (#12430).** Daraja linapowashwa na usaidizi asilia wa video haujulikani au haupo, sehemu zilizofafanuliwa za `transcript`/`audioTranscript` pia huwasha `videoBridgeObserved`, hata baada ya kushindwa kwa maelezo au kikomo cha `maxVideos`. `null` na tungo tupu huhesabiwa; sehemu ambazo hazipo na metadata isiyo ya video hazihesabiwi. Nakala zinazohifadhiwa huficha sehemu hizi au huacha ombi, na akiba/Kumbukumbu hupitwa.

Kwenye njia hizo mbadala, vidokezo halali vya mpigaji hugeuka kuwa sehemu zinazotumika za `text`/`input_text`
badala ya sehemu zisizo za kawaida za mtoa huduma. Mikondo yote miwili iliyotolewa na ombi
hubaki uchunguzi usioaminika wa `client`, pamoja na onyo bayana kwamba video
haikuelezwa na mihuri ya muda haikuthibitishwa dhidi ya media. Vikomo vilivyopo vya
vidokezo 256/KiB 64 kwa jumla na kwa kila kidokezo hutumika kwa mikondo hiyo miwili kwa pamoja;
mihuri ya muda lazima itoshee ndani ya kikomo cha sekunde 600 cha dalali na dirisha lolote la
kulenga lililotolewa. Mikondo batili hutupwa, si kutumwa kama maandishi ya kiholela; mkondo mwenza
halali bado unaweza kutumika isipokuwa bajeti yao ya pamoja imezidiwa. Sehemu tupu/zenye thamani batili
haziongezi maandishi. Uletaji wa media au unakili hauongezwi na njia hii mbadala.
Sehemu za upanuzi wa nakala huondolewa kutoka kwenye kibebaji mbadala cha video na vipengee vyake vya
`video_url`/`source`. Orodha ruhusu ya waya ya OpenAI hubaki madhubuti; vibebaji vya video
visivyojulikana kuwa vya asili hubaki vinapatikana na malengo yanayojulikana kuwa ya maandishi pekee huhifadhi alama salama.
Nakala zilizofichwa zenye muundo hulinda maandishi ya nakala yaliyoongezwa, huku
ombi asili linalomilikiwa na mpigaji likibaki bila kubadilishwa. Malengo yenye usaidizi asilia na
madaraja yaliyozimwa huhifadhi tabia yao iliyopo ya kupita pembeni.

Nakala nyingine zinazohifadhiwa hutumia ishara hiyo hiyo ya ombi lililoonekana. Taswira ghafi
ya ombi la mteja kabla ya kinga, ombi linalosubiri ndani ya kumbukumbu, na kumbukumbu ya mapema
ya ombi lililokataliwa hubadilisha kwa muundo sehemu za nakala katika sehemu za video;
vidokezo vya tungo vinavyoundwa na hatua za mchakato na makabidhiano ya muktadha hufichwa
kwenye mwisho wa sehemu ya ombi inayohifadhiwa. Alama inayohifadhiwa ya `video_content_removed`
husababisha mwendelezo wa `previous_response_id` kufungwa kwa usalama badala ya kuunda upya
maandishi yaliyotupwa kimakusudi. Ombi lililoonekana likipoteza nakala yake ya ufichaji
kwa kila sehemu kabla ya kurekodiwa, au hata moja kati ya nakala kadhaa za video ikishindwa
kulingana baada ya mabadiliko ya baadaye ya ombi, sehemu ya ombi inayohifadhiwa
huachwa kabisa badala ya kuhifadhi nakala iliyofichwa kwa sehemu tu.

Kwa ombi lililoonekana, jibu la modeli linaweza kunukuu sehemu yoyote ya
nakala bila mpaka wa kidokezo wenye muundo. Kwa hivyo `responseBody` yake katika kumbukumbu ya simu
inayohifadhiwa hubadilishwa na alama ya kuachwa; zao la kina la
mchakato (ambalo linaweza kujumuisha sehemu za mfumo wa juu/mteja na vipande vya mtiririko)
halihifadhiwi. Akiba za kisemantiki, za kutorudia operesheni, na za urudiaji wa mchakato wa kufikiri
hupita usomaji na uandikaji kwa ombi hilo. Ombi la mtoa huduma na jibu
linaloonekana kwa mteja hubaki bila kubadilishwa. Baiti za mapema za kudumisha muunganisho huondolewa kutoka kwenye bafa
ya muda zao la kina linapoachwa. Onyo la EventStream yenye hitilafu la Kiro
huripoti tu idadi ya baiti za mzigo, kamwe si maudhui yake au hitilafu ghafi ya
kichanganuzi cha JSON.
Hili halidai kuwa kila uchunguzi usiohusiana wa mtoa huduma/programu-jalizi
umekaguliwa; ukaguzi mpana zaidi wa sehemu zinazohifadhi data unafuatiliwa katika #11658.

Mzunguko wa ndani wa `/api/modality-bridge/video/drilldown` ni msingi tofauti wa akiba,
uliothibitishwa kwa loopback/tokeni. Kila operesheni pia huhitaji
ID kanoni isiyoeleza chochote ya mhusika mkuu. Kabla ya mpigaji wa uzalishaji kuwashwa, lazima
itoe ID hiyo kutoka kwa mpangaji aliyethibitishwa na kamwe isipeleke thamani
iliyochaguliwa na mteja. Funguo za akiba humfunga mhusika mkuu huyo kwa ID kanoni za kipindi na
marejeleo ya video, huhifadhi tu funguo zao zinazotokana na SHA-256, na huweka usomaji
pamoja na ufutaji ndani ya wigo wa mhusika mkuu huyo huyo. Akiba huhifadhi kwa kiwango cha juu fremu 16 za JPEG
zilizotokana kwa kila ingizo, huziondoa baada ya dakika kumi, na hutumia usomaji wenye mipaka wa
`start`/`end` au ufutaji bayana wa kipindi.

Kila mhusika mkuu ana kikomo cha maingizo 16 na MiB 64 za data kanoni ya JPEG. Vikomo hivyo
havitegemei dari ya jumla ya maingizo 64/MiB 256: shinikizo la mgao wa mhusika mkuu
huondoa tu maingizo ya mhusika huyo ambayo hayajatumiwa kwa muda mrefu zaidi kabla ya uondoaji wa jumla wa
LRU kuzingatiwa. Maingizo yaliyokwisha muda huondolewa kutoka kwenye hesabu za mhusika mkuu na
za jumla wakati wa shughuli za akiba, huku kughairi na kushindwa kwa uthibitishaji
kukiwa hakuhifadhi badilisho lisilokamilika.

Kache hukataa Base64 isiyo ya kawaida (non-canonical), padding ya ziada, media zisizo za JPEG, JPEG zilizo haribika au zilizokatizwa, na JPEG zinazozalisha onyo wakati wa usimbuaji wa picha kamili wenye mipaka kwa kutumia `sharp`. Inasimba upya kila picha iliyokubaliwa kama JPEG ya kawaida, inapata upana na urefu kutoka kwenye baiti zilizosimbuliwa badala ya kutegemea sehemu za mwitaji, na hutupa baiti zozote za polyglot zinazofuata mwishoni badala ya kuzihifadhi. Ni buffer tu iliyobanwa ya kawaida yenye mipaka ndiyo inayochajiwa kwenye vikwazo vyote viwili. Kikomo cha JSON kwenye wire kinajumuisha mzigo wa Base64 kwa kikomo cha ingizo lililosimbuliwa cha 32 MiB. Kila derivation iliyohifadhiwa hurekodi umbizo/upaa wa JPEG uliothibitishwa, sera ya sampuli, toleo la derivation, wakati wa kuundwa, hash ya maudhui iliyokokotolewa na seva, na rejea ya mzazi iliyohashwa pamoja na hash ya maudhui ya mzazi ya mwitaji anayeaminika. Ughairi huchunguzwa kati ya hatua za usimbuaji/hash zisizo za usawazishaji kabla ya commit ya atomiki ya kache.

Awamu hii bado haijaunganisha producer ya uzalishaji kwenye njia na haitoi uchaguzi wa toleo la upaa mwingi. Kwa hivyo njia ya ombi ya Video Bridge isiyoguswa haiongezi kazi yoyote, wakati derivation ya principal iliyofungwa na tenant na mzunguko kamili wa maisha wa upaa mwingi wa FU-08 hubaki kazi za ufuatiliaji zilizo wazi badala ya kuelezewa kama tabia iliyokamilika.

Fremu hupatiwa maelezo kwa mpangilio kwa kutumia modeli ya Video iliyosanidiwa. Badiliko tupu la Video hupokea mpangilio wa Vision; ikiwa zote mbili ni tupu, auto-router ya Vision huchagua modeli inayofaa yenye uwezo wa kuona. Maelezo yaliyofanikiwa hubadilisha sehemu asilia na kiambishi awali imara cha `[Video description:` ambacho pia hualika maandishi kama uchunguzi usioaminika uliotokana na media na kuwaambia modeli za downstream kutofuata maagizo yanayopatikana kwenye media. Funguo za kache za maelezo ya fremu zinajumuisha baiti za JPEG, prompt, alama ya muda, na modeli inayofaa; ni maelezo yaliyofanikiwa tu ndiyo yanayohifadhiwa kwenye kache. Viingizo vya kache vihifadhi modeli halisi ya producer iliyofanikiwa, ikiwa ni pamoja na modeli ya dharura; daraja huripoti `mixed` wakati fremu tofauti zilizozalishwa na modeli tofauti. Hit ya kache hutumia tena utambulisho huo wa producer badala ya kuulebisha upya kama mpango wa routing uliombwa. Kache ya matokeo ya video nzima inategemea kila ingizo linalobadilisha pato — prompt, modeli inayofaa, sera ya sampuli, idadi ya fremu, hali ya uchanganuzi wa semantiki, alama ya kidole ya SHA-256 ya kidokezo cha lengo kilichosanifishwa, dirisha la lengo, `transcript`, `audioTranscript`, na bendera ya contact-sheet — hivyo kubadilisha mojawapo ya vipimo hivyo ni miss ya kache, kamwe si matumizi tena yaliyochakaa. Toleo la sera ya kuondoa nakala za kuona (dedup), kizingiti, na idadi yenye mipaka ya fremu zinazowezekana pia ni wazi katika ufunguo wa kache ya matokeo na metadata; mabadiliko ya sera kwa hivyo hayawezi kutumia tena maelezo ya video nzima yaliyochakaa. Metadata ya v4 ya kache ya matokeo huhifadhi hali na alama ya kidole, kamwe si kazi ghafi ya mtumiaji. Metadata ya kinga huripoti hali zote mbili za uchanganuzi zilizoombwa na zinazotumika; hali ya `focused` iliyoombwa bila maandishi ya mtumiaji yanayoweza kutumika huripotiwa kama `full` kwa kweli.

Kinga hutoa kila sehemu ya video inayoungwa mkono lakini haielezi zaidi ya `modalityBridgeVideoMaxVideos`. Kwa lengo lililothibitishwa kuwa na `supportsVideo === false`, video zilizoshindwa na zilizozidi kikomo hugeuka kuwa alama salama za maandishi zilizo wazi ili hakuna video ghafi inayosalia. Uwezo unapojulikana, sehemu hizo huhifadhi kibebaji chao cha video; maandishi yoyote ya dharura hufuata ubadilishaji wa maandishi wenye mipaka hapo juu. Malengo yenye `supportsVideo === true` huruka daraja. Ishara ya kusitisha ombi la mteja huenea kupitia upakuaji, foleni ya broker, michakato midogo, na wito wa maelezo; kusitishwa husimama kati ya video na kamwe hakufungui njia kwa media ghafi.

Mipangilio ya wakati wa utekelezaji inayotegemea hifadhidata na kuthibitishwa na Zod:

| Key                                 | Default     | Range / behavior                                                                                                       |
| ----------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Ya hiari wakati wa utekelezaji, kwa kujiunga                                                                           |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` huhifadhi maelezo ya jumla; `focused` hutumia muktadha wa mtumiaji wa hivi karibuni wenye mipaka na usioaminika |
| `modalityBridgeVideoModel`          | `""`        | Rithi modeli ya Vision Bridge                                                                                          |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                   |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, au `segment_aware` ya uwiano; kushindwa kwa kigunduzi hurudi kwa `uniform`                   |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                    |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                         |

Thamani za zamani zilizohifadhiwa za muda wa Video zinazozidi sekunde 120 hupunguzwa hadi kikomo cha broker; maandishi mapya ya mipangilio yanayozidi kikomo hicho yanakataliwa. `GET /api/modality-bridge/video/runtime` inahitaji uthibitisho wa mahali pa loopback uliopigwa chapa unaotegemewa kabla ya uthibitishaji au uchunguzi wa runtime, kisha inahitaji uthibitishaji wa usimamizi. Inarudisha tu `available`, matoleo ya FFmpeg/ffprobe yaliyosafishwa, na sababu iliyowekwa wakati runtime haipatikani. Sehemu ya mwisho ya utoaji wa ndani si API ya upakiaji wa umma: kujaa kwa foleni kurudisha `503` pamoja na `Retry-After`, mwitaji kukatwa kurudisha `499`, na kikomo cha muda cha broker kilichowekwa kurudisha `504`. Majibu yaliyobadilishwa huongeza `video->text;model=<visionModel>;parts=<videos>` kwenye kichwa cha kati cha `x-omniroute-modality-bridge` bila kuondoa sehemu za Vision au Audio.

### PII Masker (`piiMasker.ts`)

Inafanya kazi katika hatua **zote mbili**.

- **`preCall`** hutengeneza nakala ya payload, hupitia `system`, `messages`, `input`, na
  `prompt` (ikiwemo vipengee vya herufi za kawaida), na kutumia `processPII()` (kutoka
  `@/shared/utils/inputSanitizer`) kwenye sehemu za `content`/`text` za aina ya string.
  Wakati `PII_REDACTION_ENABLED=true`, PII iliyogunduliwa hufichwa katika payload
  inayotoka. Hii ni huru na `INPUT_SANITIZER_MODE` (ambayo inadhibiti tu sera ya
  prompt-injection). Wakati ufichaji umefungwa, wito hurekodi idadi za utambuzi
  bila kuandika upya maudhui.
- **`postCall`** hutengeneza nakala kamili (deep clone) ya jibu, huendesha
  `sanitizePIIResponse()` pamoja na kifichaji cha umbo la Responses-API
  (`maskResponsesOutput` — kinashughulikia `output_text` na
  `output[].content[].text`). Ikiwa ufichaji wowote unafanyika, jibu
  lililorekebishwa huchukua nafasi ya jibu la awali.

Kizuizi kamwe hakizui; kinaongeza tu maelezo (`meta.detections`,
`meta.redacted`) au kuandika upya.

#### Uchaguzi kwa aina, ruwaza maalum na vihesabia vya utambuzi

**Dashboard → Settings → Security → PII masking** huchagua _nini_ kinachofichwa.
Haiziwashi ufichaji: hilo bado ni `PII_REDACTION_ENABLED` (ombi) na
`PII_RESPONSE_SANITIZATION` (jibu + SSE), zote mbili zimezimwa kwa chaguo-msingi.

- **Uchaguzi kwa aina** — vitambulisho vya ndani vimeorodheshwa katika
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Kutowekwa kunamaanisha
  kila aina (tabia kabla ya mpangilio huu kuwepo). Ruwaza `ssn_us` ya injini ya
  ombi huwekwa kwenye `ssn`. Violezo (Minimal, Standard, Financial, Brazilian,
  USA, Full) hujaza tu visanduku vya kuteua katika UI.
- **Ruwaza maalum** — hadi ruwaza 20 za regex au wildcard (`*` = hadi herufi 64
  zisizo nafasi, `?` = moja). Mechi hubadilishwa kuwa `[CUSTOM_REDACTED]`. Kila
  ruwaza hupitia `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): kwa zaidi herufi 500, flags zimezuiwa
  kwa `g i m s u`, lazima iweze ku-compile, lazima ipite `safe-regex` (kurudi
  nyuma kuharibu — catastrophic backtracking), na haipaswi kulingana na herufi
  tupu au kishikilia-nafasi cha ufichaji. Ruwaza inayoshindwa hukataliwa
  inapohifadhiwa na inapojaribiwa, na safu iliyohifadhiwa inayoshindwa hurukwa
  wakati wa utekelezaji badala ya ku-compiled. Ruwaza maalum huendeshwa tu wakati
  ufichaji umewashwa.
- **Vihesabia vya utambuzi** — idadi kwa aina (kamwe si thamani zilizolingana),
  zinahifadhiwa katika kumbukumbu na huwekwa upya inapowashwa upya
  (`src/lib/pii/piiDetectionStats.ts`). Zinaongezeka tu wakati ufichaji
  umewashwa.

Mipangilio inahifadhiwa katika jedwali la `key_value` (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) na husomwa kupitia cache ya sekunde 1. API:

| Mbinu  | Njia                     | Madhumuni                                                                             |
| ------ | ------------------------ | ------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Hali ya bendera, `enabledTypes`, `customPatterns`, vihesabia vya utambuzi             |
| `PUT`  | `/api/settings/pii`      | Badilisha `enabledTypes` (`null` = zote) na/au `customPatterns`                       |
| `POST` | `/api/settings/pii/test` | Jaribio la kavu la ruwaza moja dhidi ya sampuli ya hadi KB 8; hakuna kinachohifadhiwa |

Zote tatu zinahitaji uthibitishaji wa usimamizi na kuthibitisha mwili kwa Zod
(`src/shared/validation/schemas/piiSettings.ts`).

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
