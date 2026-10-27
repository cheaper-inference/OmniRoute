# Guardrails (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Isi nke eziokwu:** `src/lib/guardrails/`
> **Emelitere ikpeazụ:** 2026-10-17 — v3.8.52 (tinyere [Nkuchi na oke](#coverage-and-limits):
> ụzọ na ụzọ response ndị hooks na-eru, headers disable e jikọtara ọnụ (#16412), ọnọdụ
> block nke injection dị ka ókè a manyere (#16413), na ihe na-ahụ response tupu post-call)

Guardrails na-amanye nchekwa, amụma, na mgbanwe ọdịnaya na ókè dị n'etiti
OmniRoute na ndị na-enye upstream. Guardrail ọ bụla nwere ike ịnyocha (ma
jụ, gbanwee, ma dee ntụaka n'ụzọ nhọrọ) payload request (`preCall`) na
response upstream (`postCall`).

System ahụ bụ **fail-open**: ọ bụrụ na guardrail wụpụ njehie (throw) mgbe ọ
na-arụ ọrụ, registry na-edekọ njehie ahụ ma gaa n'ihu na guardrail na-esote
kama ịme ka request ahụ daa. Ịgbochi (blocking) bụ mkpebi a kọpụtara n'ụzọ
doro anya (`block: true`), ọ bụghị ihe mberede. Otu ihe e wezụga bụ request a
kwụsịrị (aborted): mgbe `signal` nke onye na-akpọ kwụsịrị, guardrail na-ewụpụ
njehie na-ajụ ọgba ọsọ hook ahụ (reject) kama ịgafere ya.

Hooks **anaghị** agba ọsọ na route ọ bụla ma ọ bụ response ọ bụla. Gụọ
[Nkuchi na oke](#coverage-and-limits) tupu ị dabere na guardrail dị ka ihe
njikwa nchekwa (security control).

## Guardrails e wuru n'ime

Registry na-ebu guardrails isii na usoro mkpa (priority) mgbe e na-ebubata ya
(lee `registry.ts` → `registerDefaultGuardrails()`):

| Mkpa | Aha                 | Nzọụkwụ (stage) | Faịlụ                 |
| ---- | ------------------- | --------------- | --------------------- |
| `5`  | `vision-bridge`     | `preCall`       | `visionBridge.ts`     |
| `6`  | `audio-bridge`      | `preCall`       | `audioBridge.ts`      |
| `7`  | `video-bridge`      | `preCall`       | `videoBridge.ts`      |
| `10` | `pii-masker`        | `pre` + `post`  | `piiMasker.ts`        |
| `20` | `prompt-injection`  | `preCall`       | `promptInjection.ts`  |
| `95` | `credential-masker` | `pre` + `post`  | `credentialMasker.ts` |

Ọnụọgụgụ mkpa dị ala na-arụ ọrụ **bu ụzọ**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Ụdị isi GLM 5.3 na `glm-5.3-{low,high,max}` nwere metadata registry/spec
`supportsVision:false` a kọpụtara n'ụzọ doro anya. Ụdị GLM 5.3 Flash ka bụ
ụdị vision nke obodo (native-vision). Route `/v1/messages` nke Claude Code
na-abanye n'usoro guardrail pre-call `handleChat` a kesara **tupu** ntụgharị
Claude-gara-OpenAI; a ga-akọwa ma ọ bụ jikwa ihe oyiyi nsonaazụ ngwá ọrụ
`Read` dị n'ime (nested) tupu ntụgharị ahụ ebuli ha ka ọ bụrụ ọdịnaya
`image_url` nke OpenAI (#17069).

Ọ na-anọchite anya (intercept) request nwere ihe oyiyi ndị e lekwasịrị **ụdị
na-enweghị vision** ma gharia request ahụ dum gaa na ụdị nwere ike vision,
ma ọ bụ dochie akụkụ ihe oyiyi ahụ nkọwa ederede sitere na ụdị vision a
haziri (configurable) tupu oku upstream ahụ. Nke a na-eme ka ndị na-enye
ederede naanị jikwaa payload ọtụtụ ụdị (multimodal) n'ụzọ a na-adịghị ahụ
anya.

Usoro ọ na-eso:

1. Gafee ma ọ bụrụ na ụdị e lekwasịrị anya na-akwado vision (belụsọ na ọ
   pụtara na ndepụta forced-bridge `isVisionBridgeForcedModel`).
2. Wepụ akụkụ ihe oyiyi site na `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), nke na-enyefe ọrụ ahụ **unified media
   detector** `detectMediaParts()` dị na `open-sse/utils/mediaParts.ts` —
   otu isi eziokwu a na-ekekọrịta na ihe nzacha combo compatibility. A
   machibidoro ihe wepụ naanị na ụdị (shapes) `replaceImageParts` nwere ike
   itinyeghachi (nkwekọrịta extract↔replace): OpenAI `image_url`, Anthropic
   base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`, na
   Responses API `input_image`. A na-ewepụkwa ihe oyiyi kwekọrọ nke dị n'ime
   `tool_result.content` nke Claude Code na nsonaazụ ngwá ọrụ Responses, ma
   dochie ha na ụzọ ha mbụ; ụdị bụ naanị ihe ngosi (indicator-only) bụ ihe
   maka nzacha combo, anaghị epụ ha.
   Gafee ma ọ bụrụ na ọ nweghị ihe a hụrụ.
3. Dozie nhazi runtime site na `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): igodo nhazi
   `modalityBridge*` ọhụrụ na-eri; igodo oge ochie `visionBridge*` ka dị ka
   **fallback otu okirikiri** (windo ịlaghachi azụ). Gafee tupu a gafee media
   ọ bụla mgbe e gbanyụrụ bridge ahụ.
4. Ihe nhọrọ ọnọdụ (`modalityBridgeVisionMode`, lee tebụl dị n'okpuru)
   na-ekpebi ịgagharia (reroute) megide ịkọwa (describe). Reroute na-alọghachi
   `modifiedPayload` nke e gbanwere naanị `model`, gbakwụnye meta
   `{ rerouted, fromModel, toModel, imagesKept }`.
5. Ụzọ ịkọwa: machie ihe oyiyi na `maxImages`, mejupụta prompt maara ọrụ a
   na-arụ (task-aware), lelee cache nke ịkọwa, kpọọ ụdị vision ahụ **n'otu
   oge** (`Promise.allSettled`), ma tinye akụkụ ederede `[Image N]: <description>`
   n'ọnọdụ ha. Ịkọwa dara ada na-enye `null`: a na-echekwa ihe oyiyi ọhịa
   (raw) maka ebumnuche a maghị ma ọ bụ nwere ike vision (#4012), ma
   **ebumnuche ozugbo ederede naanị a kwadoro** ma ọ bụ combo na-enweghị
   vision na-enweta stub ederede doro anya
   `(unavailable — no vision-capable provider connected)` maka ihe oyiyi ọ
   bụla a kọwaghị, gụnyere ndịda n'akụkụ na ihe oyiyi gafere oke oku ịkọwa
   (#17069). Fallback ịkọwa combo nke dị adị mgbe ihe niile dara ka nọ n'ọnọdụ
   (#8430).
6. Lọghachi `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Ihe nhọrọ ọnọdụ (`modalityBridgeVisionMode`)

| Ọnọdụ      | Ndabara | Omume                                                                                                                                                                                                                                                                                        |
| ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | Heuristic ochie, a metụghị ya aka (#6640/#7204): ụdị ndị na-abụghị combo/`auto/` na-e reroute gaa n'ụdị vision kacha mma ma e wezụga ụdị mbụ enwerela nzere a na-eji arụ ọrụ (mgbe ahụ describe); lekwasịrị combo na-eme describe mgbe niile.                                                |
| `describe` |         | Describe mgbe niile — a na-awụlikwa ngọngọ reroute kpamkpam; ụdị onye ọrụ họọrọ ka na-aza mgbe niile.                                                                                                                                                                                        |
| `reroute`  |         | Manye reroute: a na-agafere nchebe nke ịdobe ụdị nwere nzere. Nchebe nzere nke **lekwasịrị** reroute ka na-arụ ọrụ — mgbe ọ dịghị lekwasịrị vision a na-eji arụ ọrụ dị, bridge na-egbochi site na njehie doro anya kama ịdescribe ma ọ bụ iziga oyiyo dị ọhụrụ na lekwasịrị bụ nanị ederede. |

Ọnọdụ a manyere na-akpagharị **tupu** heuristic auto agba ọsọ; omume `auto`
yiri nke guardrail dị ka ọ dị tupu PR-1 byte maka byte.

#### Oghere igodo API (`visionBridgeKeyScope.ts`)

Mgbe igodo API nke onye na-akpọ machibidoro `allowedConnections`, ìdé quota
(`allowedQuotas`) ma ọ bụ ụdị (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), bridge na-ahọrọ
nanị ụdị reroute na describe igodo ahụ nwere ike iji, na njikọ ndị igodo ahụ
nwere ike iji. Oku describe ahụ na-agafe mgbe niile site na self-loop
OmniRoute na isi `x-omniroute-self-loop-key-id`, ka arịrịọ chat nnata mee ka
amụma njikọ na ụdị nke igodo ahụ rụọ ọrụ ọzọ. `enforceApiKeyPolicy()`
na-anabata isi ahụ nanị tinyere bearer self-loop, ka ọ wee nwee ike ịmē nanị
ka ohere nweta dị warara, a na-ajụkwa id ọ bụla na-apụtaghị ìhè.

Ọ bụrụ na ọ dịghị ụdị vision a nabatara maka igodo ahụ, **lekwasịrị
nanị-ederede a kwadoro** na-ajụ arịrịọ oyiyo n'ebe ahụ site na HTTP 400 doro
anya kama iziga byte oyiyo na upstream na-enweghị ike (#17069). Maka
lekwasịrị nwere ikike vision amaghi ama ma ọ bụ nke omenala, ụzọ describe
na-edebe omume fail-open ya nke gara aga (meta
`{ skipped: true, reason: "no_permitted_vision_model" }`). Arịrịọ enweghị
igodo, na igodo enweghị mchịchi ndị a, na-eme ihe dị ka ọ dị na mbụ.

#### Prompt describe nke-ghọtara-ọrụ (`modalityBridgeVisionTaskAware`)

Ndabara **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`)
na-agbakwụnye ederede nke **ozi onye ọrụ ikpeazụ** (a bipụtara ruo
mkpụrụedemede 500) na prompt describe bụ isi, na-eduzi nkọwa ahụ gaa n'ihe
onye ọrụ jụrụ n'ezie (ụkpụrụ codex-vision-proxy) ma na-arịọ ụdị vision ka ọ
detụgharịa ederede a na-ahụ anya. Mgbe ọkọlọtọ ahụ gbanyụrụ — ma ọ bụ
enweghị ederede onye ọrụ — a na-eji prompt bụ isi ka ọ dị, a gbanweghị ya.

Arịrịọ OpenAI-compatible nke self-loop describe n'onwe ya
(`callVisionModelSingle()` na `visionBridgeHelpers.ts`) na-arịọ
`image_url.detail: "high"` mgbe niile — n'enweghị ọnọdụ ọ bụla, maka onye ọ
bụla na-akpọ/onye na-enye, ọ bụghị nke a machibidoro na ngosi client ọ bụla.
Nhọrọ ogo dị ala na-emebi izuike OCR maka kpọmkwem ọrụ ntụgharị ederede
prompt a na-arịọ, ya mere oku describe n'onwe ya na-arịọ ogo dị elu mgbe
niile n'agbanyeghị ọkwa ogo arịrịọ mbụ bataara jiri. Nke a na-emetụta nanị
ahụ arịrịọ describe dị n'ime; ọ gbanweghị otu OmniRoute si eziga
`image_url.detail` nke onye na-akpọ na arịrịọ bụ isi — a na-etinye ndabara
ahụ iche, nanịkwa maka client OpenCode a chọpụtara, na `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Alaka wire-format Anthropic
nke self-loop describe enweghị ubi `detail`, ndabara ọ bụla n'ime ha abụọ
anaghị emetụta ya.

#### Oke mmepụta describe (`modalityBridgeVisionMaxChars`)

| Igodo                          | Ndabara | Oke                   |
| ------------------------------ | ------- | --------------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` ma ọ bụ 100–50000 |

`0` (ndabara) pụtara **enweghị oke** — a na-ahapụ nkọwa `callVisionModel()`
wepụtara ka ọ gafee ka ọ dị, na-edebe omume dị ugbu a. Uru ọ bụla n'ọkwa
100–50000 na-ebipụ nkọwa ahụ na mmechaa `…` tupu a jikọta ya ọzọ dị ka
`[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` na
`src/lib/guardrails/visionBridge.ts`). Buliẹ nke a maka ọrụ OCR jupụtara na
nkọwa ebe ụdị dị n'ada chọrọ ntụgharị zuru oke; belata ya iji mekwa oke
ojiji token na ụdị vision na-ekwuchaghị. Ubi dashboard ahụ dị na panel
Advanced nke taabụ Vision (`modality-bridge-max-chars` na
`ModalityBridgeVisionTab.tsx`) ma na-amachi uru ọ bụla dị n'etiti 1 na 99 ruo
na ala nke 100 ma na-ahapụ `0` a kọwapụtara kpọmkwem ka ọ dị — `0` bụ uru
Zod ziri ezi n'onwe ya
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ọ bụghị
nanị ndabara "a hazighị".

#### Cache describe (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL nke dị na echekwa maka mmepụta describe, nke a kesara n'ụzọ
zuru usoro niile. Igodo =
`sha256(imageRef + composedPrompt + configuredBridgeModel)` na framing
length-prefix (enweghị mkpakọrịta na ókè ubi). Akụkụ ụdị ahụ bụ ụdị bridge
**ahaziri**, ọ bụghị ụdị zara n'ezie — `callVisionModel` nwere ike ịdaghachi
n'ime, iji mgbalị ọ bụla mee igodo ga-ekewa cache. A naghị echekwara describe
dara ada. Ntọala:

| Igodo                           | Ndabara | Oke     |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Nhazi ọdịnala onyonyo dị anya (nnyefe onwe-nkọwa/base64)

Mgbe bridge na-eweta onyonyo **dị anya** n'onwe ya — oku nkọwa Anthropic nke onwe
ya na ntụgharị base64 nke claude-wire-format
(`ensureBase64ImagesForClaudeWire`), abụọ niile site na
`fetchRemoteImageAsDataUri()` n'ime `visionBridgeHelpers.ts` — a na-agafe data
URI a na-enweta site na `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) tupu e tinye ya n'ime arịrị ọ bụla nke
vision-model. A na-eme obere onyonyo buru ibu ruo **ogologo nke 2048px** (kwekọrọ
na oke nke nhazi OpenAI/Anthropic na-etinye n'akụkụ sava), nke na-ebelata
bytes/ije ohere nke upload na-agaghị agbanwe ihe vision model na-ahụ. Nhazi
na-eji `sharp`, nke ebufe site na dynamic import: na ikpo ebe binary obodo ya
na-ada ịdọnye, `normalizeDataUri()` **anaghị atụpụta ụdịdị** — ọ na-atụgharị
na njirimara nke bytes mbụ, ka ụzọ nkọwa/ntụgharị-base64 na-arụ ọrụ mgbe
niile. A na-agafe bytes na-abụghị onyonyo (nnyefe na-adaghị onyonyo a
nwere ike ịgụ) ka ọ ghara ịmetụ ya. Nhazi a bụ naanị maka onyonyo bridge
na-eweta maka oku onwe ya — a naghị etinye ya na payload mbụ nke onye na-akpọ,
kwekọrọ na ụkpụrụ mgbanwe opt-in-naanị (Iwu Ike #20).

#### Schema Ntọala + ịkwaga

A na-enyocha igodo `modalityBridge*` ọhụrụ site na Zod n'ime `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, ndị atọ `modalityBridgeCache*`, na otu
`modalityBridgeAudio*` nke Audio Bridge na-eji. Ịkwaga
`141_modality_bridge_settings.sql` na-akọpụta ụkpụrụ `visionBridge*` ochie
dị ugbu a na igodo ọhụrụ kwekọrọ (idempotent, anaghị edeghari ụkpụrụ
`modalityBridge*` onye ọrụ setịpụrụ); a na-anabata igodo ochie ka ọ bụrụ
ngwụcha ọgụgụ maka otu okirikiri mwepụta.

#### Isiokwu nghọta + nọnọre

Azịza describe-transformed na-ebu
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(nke `buildModalityBridgeHeader()` n'ime `modalityBridge/bridgeStats.ts` wuru,
nke `withModalityBridgeHeader()` n'ime `src/sse/handlers/chatHelpers.ts` tinyere
akara). Arịrị ndị a gara ụzọ ọzọ anaghị enweta **isiokwu ọ bụla** — anghị
emetụ payload ahụ, ma mgbanwe ọnụ ọgụgụ ahụ na-egosipụta n'ọhịa `model` nke
ahụ azịza.

`GET /api/modality-bridge/stats` (nkwenye njikwa, otu ọkwa dị ka
`GET /api/settings`) na-alọghachi ọnụ ọgụgụ nke modality ọ bụla n'ime ebe nchekwa
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` maka `vision`, `audio`, na
`video`. `averageLatencyMs` na-eji `latencySamples`, ọ bụghị mbalite niile, dị ka
nkeji ya; ọrụ na-enweghị oge anaghị emepụta nlele zero-millisecond. `bridged`
ka bụ aha oyibo maka ntụgharị gara nke ọma; mbali ndị dara adaghị
abawanye ya. Ọnụ ọgụgụ na-amalitegharị na mmalite ọhụrụ nke usoro site na
nhazi (telemetry, ọ bụghị ọnụ).

#### Nhazi Dashboard

Peeji dashboard nke a kpọrọ bụ
`/dashboard/settings/modality-bridge`. Tab ya `Vision`, `Audio`,
na `Video` nke URL nwere ike ịchọpụta na-echekwa njirimara ajụjụ mgbe a na-agbanwe
ụkpụrụ `tab`. Tab Vision na-egosipụta ịkwalite, ọnụ ọgụgụ, nhọrọ ọnụ ọgụgụ
(gụnyere ndabere akpaaka), nkwalite nlele ọrụ, oke
timeout/onyonyo/ogologo nkọwa/cache dị elu, ọnụ ọgụgụ
oge ojiji, na arịrị nlele echekwara. Tab Audio dịkwa ndụ: ọ na-egosipụta
ịkwalite, onye nhọrọ ọnụ ọgụgụ STT-naanị nwere Auto, oke timeout/max-clip, ọnụ ọgụgụ
audio, na nlele nlele `input_audio`. Tab Video na-arụ ọrụ: ọ na-akọwa
ọnọdụ oge ọrụ FFmpeg/ffprobe — otu n'ime ọnọdụ UI anọ doro anya (`unknown` mgbe
nchọpụta na-aga n'ihu ma ọ bụ nweghị ike ịmecha, `restricted` na nnabata
dashboard na-abụghị loopback ebe a na-agafe nchọpụta n'akụkụ onye ahịa, `unavailable`
ozugbo achọpụtara ma gosi na ọ dịghị, ma ọ bụ `available` na ụdị FFmpeg/ffprobe)
— na-echekwa oke kwalite/ọnụ ọgụgụ/frem/video/timeout, na-achọpụta onye nhọrọ
ọnụ ọgụgụ na ọnụ ọgụgụ nwere ike ịhụ, ma na-egosipụta ọnụ ọgụgụ video.

Kaadị Vision Bridge ochie n'okpuru ntọala AI bụ njikọ kwenye na peeji
ọhụrụ; ọ naghịzi enwe otu akwụkwọ nke abụọ nke ụdị ahụ. Media Providers na-ejikọ
ọrụ Image-to-Text na Speech-to-Text na tab Modality Bridge kwekọrọ na-enweghị
iwepụ ebe egwuregwu Speech-to-Text dị ugbu a.

**Ịgafe nnabata self-loop:** mgbe oku describe na-agafe
self-loop `/v1` nke OmniRoute (ọnụ ọgụgụ na-abụghị nke ọkọlọtọ), arịrị nke
nkeji na-eziga `x-omniroute-admission-bypass: internal` ma jiri ihe nkwenye
self-loop a haziri nyocha — sentinel `sk_omniroute` nke mpaghara n'ọnọdụ mpaghara, ma ọ bụ
igodo env `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` onye ọrụ haziri (#1350) ka
usoro `REQUIRE_API_KEY=true` ka nwere ike ịgba oku describe. A na-anabata
ịgafe ahụ naanị maka ihe nkwenye ndị ahụ kpọmkwem, ka ndị ahịa dị na
n'èzí enweghị ike iji isiokwu ahụ gafee nnabata.

Ndabere ochie bi n'ime `src/shared/constants/visionBridgeDefaults.ts`; ndabere
ọnụ ọgụgụ/nlele ọrụ/cache ọhụrụ na onye nhazi ntọala bi n'ime
`src/shared/constants/modalityBridgeDefaults.ts`. Nchekwa na-egosipụta nhọrọ
onye nrụpụta `deps` ka nlele nwere ike itinye ụdị `getSettings` na
`callVisionModel` adịgboroja.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Ọ na-egbochi arịrị nkata na-ebu audio tupu ha ruo ebe a na-amaghị na ọ
na-anabata ntinye audio. Ọ naghị agbanwe ụzọ arịrị nkata: a na-agụpụta akụkụ
audio site na ọnụ ụzọ multipart na-arụkọrọ OpenAI dị adị, ma ọnụ ọgụgụ nkata
a họọrọ na-aga n'ihu na ederede a gụpụtara.

Ọnụ ụzọ:

1. Kpebie `supportsAudio` site na `getResolvedModelCapabilities()`. Metadata
   provider-registry e kwupụtara n'ụzọ doro anya na-ahụ mmeri, mgbe ahụ metadata
   model kwụsiri ike, mgbe ahụ `modalities_input` e sịnkrọnaịzara. Ndepụta input
   e kwupụtara nke na-enweghị `audio` bụ `false`; ọnọdụ enweghị ihe akaebe ikike
   na-anọgide `null`. Ma `false` ma `null` na-arụ ọrụ àkwà nchekwa (conservative
   bridge) ahụ, ebe `true` na-agafe ya.
2. Kpebie ntọala `modalityBridgeAudio*` wee wepụ akụkụ audio kacha elu nke nwere
   ike ijikọ n'ime ozi ọ bụla site na ihe nchọpụta `detectMediaParts()`
   ekekọrịtara. Ụdị wire a na-akwado bụ OpenAI `input_audio`, `audio_url`, na
   `source.media_type: "audio/*"`. A na-achọpụta audio etinyere n'ime (nested)
   maka routing, ma ụzọ ijikọ anaghị ewepụ ya. `modalityBridgeAudioMaxClips`
   na-amachịkwa ọrụ ahụ; akụkụ ndị so na ya ka na-anọgide n'onwe ha.
3. Rube isi na `provider/model` a haziri, ka ọ bụ hapụ ka
   `selectAudioBridgeModel()` gafee `AUDIO_TRANSCRIPTION_PROVIDERS` n'usoro
   katalọgụ kwụsiri ike wee họrọ model mbụ nwere nzere provider dị ọrụ nke nwere
   ike iji.
4. `callAudioTranscription()` na-atụgharị audio base64/data-URI ka ọ bụrụ `file`
   multipart, ma ọ bụ na-ebudata `audio_url` dị anya site na nche ịpụpụ nke
   naanị ọha (public-only) nwere DNS pinning na ókè 25 MB. Mgbe ahụ, ọ na-ezipu
   (POST) file ahụ na model ahọrọ ka ọ bụrụ self-loop mpaghara
   `/v1/audio/transcriptions`, e nyochasịrị ya site na `resolveSelfLoopBearer()`.
   Ụzọ transcription dị adị na-eme nchọpụta nzere nkịtị, njikwa
   cooldown/rate-limit, na nkesa provider.
5. Oku gara nke ọma na-anọchi akụkụ ha na `[Audio N]: <transcript>`. Oku na-agba
   ọsọ na `Promise.allSettled`: ọdịda nke otu oku na-echekwa akụkụ audio mbụ ahụ
   (nkwekọrịta #4012). Ọ bụrụ na oku ọ bụla dara ma e gosipụtara na lekwasịrị
   ahụ bụ `supportsAudio === false`, akụkụ ndị ahụ na-aghọ
   `[Audio N]: (unavailable — no STT provider connected)` (nkwekọrịta #8430).
   Maka lekwasịrị amaghi (`null`), nsonaazụ nke ọdịda niile na-anọgide n'onwe
   ya. Lekwasịrị naanị ederede e gosipụtara nke na-enweghị nzere STT nwere ike
   iji na-anata otu stub doro anya ahụ n'enweghị ịme oku netwọk.

Transcript gara nke ọma na-eji cache LRU/TTL nke Modality Bridge nke usoro
niile. Igodo ahụ na-ejikọta ntụaka audio, akara ọrụ `audio-transcription`
kwụsiri ike, na model STT ahọrọ; a naghị etinye ọdịda n'cache. Nnwa audio
na-emelite ọnụ ọgụgụ ekekọrịtara `bridged`, `cacheHits`, `failures`, na
`lastUsedAt`. Azịza a tụgharịrị na-ebu
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; arịrị
ametụghị anaghị anata nkeji (segment) Audio Bridge.

Ntọala oge ọrụ na DB na-akwado ma a na-eji Zod nyochaa ha:

| Igodo                         | Ndabere | Oke                        |
| ----------------------------- | ------- | -------------------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                          |
| `modalityBridgeAudioModel`    | `""`    | Akpaghị aka ma ọ bụ ID STT |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000                |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10                       |

Cache ekekọrịtara ahụ ka na-anọ n'okpuru njikwa nke `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, na `modalityBridgeCacheMaxEntries`.

### Àkwà Video (`videoBridge.ts`, `videoBridgePipeline.ts`)

Na-anọchite anya akụkụ video kacha elu n'ime `messages` nke Chat Completions na
`input` nke Responses API tupu a kpọọ lekwasịrị nke a maghị na ọ na-akwado video
n'ụzọ obodo. Ụdị a na-akwado bụ `input_video`, `video_url`, `video_source`, URL
HTTPS, na data URI `data:video/*;base64,...`. A naghị ele aha file nkịtị dị
n'ederede dị ka video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) bụ nwe njem arịrị ahụ, nyocha
ikike/amụma, mkpakọta nke arịrị ọ bụla, na payload azịza. A zobe ọrụ nke video ọ
bụla — inweta, cache nsonaazụ niile, ịkọwa usoro frame (nke na-agwakọta
transcript audio ọ bụla onye na-akpọ kwupụtara), na metrics/abort/cleanup nke
nnwa ọ bụla — n'azụ `processVideoPart` dị na `videoBridgePipeline.ts`, nke a
na-akpọ otu ugboro maka akụkụ video ọ bụla n'ime loop nke `preCall`. Modul ahụ
na-akọwakwa ókè ọnụ ọdụ (port) doro anya: `VideoMediaBrokerPort` (inweta bytes
na iwepụ frame a họpụtara), `VideoAudioTranscriptionPort` (ịgwakọta transcript
audio onye na-akpọ kwupụtara na ndepụta okwu a họpụtara), na
`VideoDrilldownPort` (ókè nchekwa drill-down frame; e jibeghị ya na
`processVideoPart` — naanị ụzọ dị iche `/api/modality-bridge/video/drilldown`
na-ede ndekọ drill-down taa).

Ụzọ arịrị ọha `/v1` adịghị ebubata ma ọ bụ kpọọ subprocess ọ bụla. A na-ebudata
video dị anya n'okpuru ókè 50 MiB; video base64 dị n'ahịrị nwere oke nchekwa nke
36 MiB a kọwapụtara maka video ọ bụla ka envelope nke model/messages/framing wee
nọgide n'ime oke nnabata arịrị JSON ọha nke 50 MiB. A na-enyocha ogologo dị
n'ahịrị na amụmanya nha a kọwapụtara tupu ekesa. Achọrọ HTTPS na URL dị anya mbụ
na redirect ọ bụla, na-eji nche ịpụpụ nke naanị ọha dị adị nwere DNS pinning.
Bytes ndị ahụ na-agafe ókè broker n'ime zuru oke
`POST /api/modality-bridge/video/extract`. Ụzọ ahụ bụ ma `LOCAL_ONLY` ma
`SPAWN_CAPABLE`, na-anabata naanị arịrị a nyochasịrị n'usoro ọ bụla, loopback a
tụkwasịrị obi, ma anaghị anabata URL, ụzọ filesystem, ihe ọrụ (executable), ma
ọ bụ ndepụta arụmụka. Pipeline nha ahụ nke API na ihe ọgụgụ ahụ na-abawanye nke
onye njikwa na-amanye oke input broker 50 MiB n'otu n'otu. Atụ ya nwere ókè
na-arụ otu wepụ (extraction) n'otu oge, na-anabata ọrụ anọ na-echere, ma na-amachị
input na-echere na 100 MiB.

N'ime broka ahụ, `ffprobe` na-agụ faịlụ mpaghara nkeonwe; ndepụta kwere ekwe nke usoro edobere
na-ewepụ usoro playlist na manifest. Maka konteena ndị ezinụlọ MOV
e kwere, ntụaka data MOV mpụga ka gbanyụrụ na ndabara, iwu
edobere anaghịkwa eme ka ha rụọ ọrụ. Ma `ffprobe` ma `ffmpeg` na-eji
ndepụta protokol naanị-`file`, otu thread, nhazi arụmụka edobere, enweghị shell,
yana faịlụ mmemme a na-achọta site na `PATH`. Stream mkpuchi nke bụ attached-picture abụghị
ndị a ga-ahọrọ maka ịkpọ. Stream niile a pụrụ ịkpọ ga-emezu oke ndị ahụ, a na-ahọrọkwa
stream ndabara akọwapụtara tupu nhọrọ ndabere deterministic nke nwere index
kacha ala. E debere oke vidio na sekọnd 600, pikselụ 8,192 n'akụkụ nke ọ bụla, na
pikselụ isi mmalite 33,554,432. FFmpeg na-ewepụta frame JPEG etiti 1–16, na-ebelata
akụkụ kacha ogologo ruo pikselụ 1,024 ma ọ bụ ihe na-erughị ya n'ebughị ntinye ndị pere mpe elu, ọ
dịghịkwa mgbe ọ na-anata URL. Sampling bụ `uniform` na ndabara. Iwu nhọrọ
`scene_aware` na `segment_aware` nke ka bụ nnwale na-eme otu nnyefe FFmpeg
edobere ọzọ n'elu stream mpaghara ahụ e kwadorola, họrọ timestamp scene
`showinfo` ndị nọ n'ime oke, ma laghachi n'ụzọ deterministic n'otu midpoint
uniform ahụ ma ọ bụrụ na detector ada, oge agwụ, mmepụta emebie, ma ọ bụ
setị ndị a ga-ahọrọ tọgbọ chakoo. Ọnọdụ segment-aware na-ekenye sample midpoint n'ogo kwekọrọ na
interval scene ndị a kwadoro; a kọwara ihe akaebe segment-aware na omume fallback
n'ụzọ zuru ezu n'okpuru. A na-etinye oke siri ike nke frame 16
mgbe emechara nhọrọ n'ime iwu ọ bụla. Mgbe arịrịọ scene-aware nwere naanị
mmefu otu frame, ọ na-eji midpoint uniform nke windo vidio zuru ezu ma ọ bụ focus
na-arụ ọrụ ma kọọ `policyEffective: uniform`: otu frame scene ahọpụtara
enweghị ike ichekwa nsọtụ oge abụọ ahụ. Onye na-akpọ ọrụ nwere ike, dịka nhọrọ, ịnye
windo focus nwere njedebe (`start`/`end` sekọnd); a na-adọnyere ókè ya n'ogologo oge media,
a na-ajụ windo tụgharịrị azụ ma ọ bụ nke na-abụghị finite, a na-emekwa iwu sampling
niile naanị n'ime interval emeziri ka ọ bụrụ nke ziri ezi. A na-etinye windo
pụtara na metadata sampling nakwa na prefix nkọwa a na-atụkwasịghị obi
ka model ndị na-esote nwee ike ịmata ọdịiche dị n'etiti akụkụ a lekwasịrị anya na timeline
zuru ezu.

Ilekwasị anya semantic nke caption bụ ntọala dị iche ma doo anya. Ọnọdụ nyocha `full`
nke ndabara na-echekwa prompt frame dịbu adị, ọ naghịkwa eziga ederede arịrịọ
na model caption. N'ọnọdụ `focused`, bridge na-agụ naanị `text`/`input_text`
kacha ọhụrụ nke onye ọrụ dere na nke na-adịghị efu site n'otu konteena Chat ma ọ bụ Responses ahụ,
na-eme ka ọ bụrụ NFC, na-achịkọta mkpụrụedemede njikwa na oghere ọcha,
ma na-amachi ya na code point Unicode 500. Nsonaazụ tọgbọ chakoo na-alaghachi na
prompt `full` ahụ kpọmkwem. A na-ahazi hint bara uru dịka JSON n'ime block
untrusted-user-context a raara nye ya, ọ nwekwara ike naanị ibute nkọwa ndị a pụrụ ịhụ ụzọ; ọ
nweghị ike ịkagbu ịdọ aka ná ntị dị iche nke machibidoro iso ntuziaka a na-ahụ
ma ọ bụ a na-anụ n'ime media. Focus ederede anaghị amata `start`/`end` n'onwe ya ma ọ bụ gbanwee
sampler oge.

#### Ihe akaebe nhazi segment FU-07

`segment_aware` na-eji otu nnyefe pre-analysis nwere oke n'elu
stream vidio mpaghara ahụ e kwadorola. Filter chain edobere na-ebu ụzọ belata obosara ruo
pikselụ 320 ma ọ bụ ihe na-erughị ya, chọpụta mgbanwe scene na interval jụrụ oyi, wee were sample
n'ogo frame 1 kwa sekọnd iji tụọ blur, nkezi luma, na ozi spatial/temporal. E debere
oke nnyefe ahụ na sample nhazi 600, otu thread FFmpeg/filter, otu ndepụta
protokol naanị-`file` na ndepụta konteena kwere ekwe, oke mmepụta process nke 1 MiB,
na sekọnd 30 kacha elu n'ime abort/deadline broka ahụ na-ekekọrịta. Ọ dịghị mgbe ọ
na-anabata iwu, filter, ụzọ faịlụ, ma ọ bụ URL sitere na arịrịọ ahụ.

Ụkpụrụ nhazi ndị ahụ bụ ihe akaebe sampling deterministic, ọ bụghị nghọta semantic
nke vidio. Ha anaghị amata subject, omume, caption, okwu ọnụ, ma ọ bụ ebumnuche
onye ọrụ. Ókè scene na freeze na-emepụta segment; mkpuchi freeze, blur,
exposure, nkọwa spatial, na mgbanwe temporal na-emetụta naanị otu esi ekenye
mmefu frame 1–16 dịbu adị. A na-amachi segment jụrụ oyi kpamkpam na otu frame,
ebe segment ndị na-ajụghị oyi na-asọ mpi maka mmefu fọdụrụ. Mgbe ókè
karịrị frame n'ọnụọgụ, a na-edobe mkpuchi timeline uniform ka mgbanwe ngwa ngwa
n'oge mbido ghara izochi segment ogologo dị n'azụ. A na-ejikọta ókè scene ndị dị n'ime
mkpebi nyocha otu sekọnd nke ókè freeze.

Filter na-efu, ihe akaebe emebiwo/tọgbọ chakoo, njehie detector, ma ọ bụ ngafe oge
pre-analysis ahụ nwere oke na-eme ka usoro ahụ laghachi na iwu midpoint uniform ahụ kpọmkwem.
Abort sitere n'aka onye na-akpọ ọrụ ma ọ bụ deadline broka anaghị eme ka ọ laghachi: ọ na-akwụsị
subprocess na-aga n'ihu, gbochie extraction frame ga-emecha, a na-ewepụkwa
osisi temporary nkeonwe n'ime `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` na-emepụta fixture FFmpeg ezigbo
na deterministic maka mbelata oku caption mgbe post-dedup gasịrị, nkesa mmefu
dense-motion, ihe akaebe blur/exposure/SI-TI, mgbanwe ngwa ngwa nwere ọdụ ogologo, na
false positive nke gradual-fade. Ọ na-edekọ oge mgbidi pre-analysis, ma ebe
`/usr/bin/time` dị, CPU child na RSS kacha elu. Nlele ogo ya bụ naanị oracle
nhazi. Ogo ezigbo model caption ka bụ `HOLD` n'ihi na harness a enweghị
endpoint enyere ikike ma ọ bụ judge edobere. Mbelata ego ka bụkwa `HOLD`
ọ gwụla ma `--caption-cost-per-call-usd` nyere atụmatụ ego kwa oku doro anya ma dị mma;
script ahụ anaghị echepụta nke ọ bụla n'ime nsonaazụ abụọ ahụ.

Fremu ọ bụla nwere oke 4 MiB, fremu raw niile n’otu nwere oke 23 MiB, ebe nzaghachi broker e mere serialize nwere oke 32 MiB. A na-ewepụ ndekọ nwa oge nke nzuzo n’ime `finally`. OmniRoute anaghị etinye FFmpeg n’ime ngwugwu ya, ọ naghịkwa anabata ụzọ executable ahaziri iche. Tupu e mepụta nkọwa, bridge ahụ na-eme usoro nlezianya iji wepụ oyiyi ndị yiri ibe ha: a na-ebelata JPEG ọ bụla ka ọ bụrụ buffer grayscale 16×16, wee jiri naanị fremu ikpeazụ e debere tụnyere ya. Maka oke nkọwa a rịọrọ nke karịrị otu fremu, extraction na-enye ọdọ candidate nwere oke ruru ugboro abụọ nke budget ahụ, ma ọ dịghị mgbe ọ ga-agafe fremu 16. A na-etinye oke a rịọrọ naanị mgbe e wepụchara oyiyi ndị yiri ibe ha; a na-echekwa candidate mbụ na nke ikpeazụ ahọpụtara mgbe a na-eme thinning ikpeazụ ma ọ bụrụ na budget ahụ dịkarịa ala abụọ. Policy nwere version
`grayscale-16x16-mean-cells-v2` na-eji nke ka ukwuu n’etiti mean luma delta na
ratio nke cell thumbnail ndị normalized delta ha dịkarịa ala 0.05. Threshold nke duplicate bụ constant 0.04, nke a họọrọ maka ịdị mfe ịkọ amụma kama ikpughe ya dịka setting runtime. Signal nke abụọ a nwere contrast dị elu na-echekwa obere mmegharị na mgbanwe ederede a na-ahụ anya nke ntụnyere dabere naanị na mean nwere ike izochi. Njehie comparator ma ọ bụ decoder anaghị egbochi usoro ahụ ma na-eme ka coverage dịgide. Metadata output na-ekewa candidate ndị e wepụtara, fremu ndị e jiri mee ihe nke ọma, na duplicate anya ndị a tụfuru.

Akụkụ vidiyo e kara akara n'ụzọ doro anya nwere ike ịrịọ contact sheet nwere timestamp. Bridge ahụ na-ewu grid JPEG nwere kọlụm kachasị 4 na fremu kachasị 16. Cell ọ bụla nke pikselụ 512 na-ebipụta timestamp nke source ya n’ime band ala nwere contrast dị elu, ebe otu timestamp ndị ahụ ka na-adịkwa na metadata ederede maka ijikọ ha na nyocha audit n’usoro downstream. JPEG zuru ezu ka nwere oke 32 MiB. Ọ bụrụ na `sharp` enweghị ike decode ma ọ bụ compose grid ahụ, bridge ahụ ga-alaghachi n’iji fremu JPEG nke ọ bụla; abort sitere n’aka client ka ga-agafe n’ọrụ sheet ahụ.

E kewapụrụ evidence maka promotion kpamkpam na microbenchmark nke synthetic composition. `scripts/perf/video-bridge-contact-sheet-eval.ts` na-akọwapụta harness A/B nwere version schema maka model vision dakọtara na OpenAI n’ezie. Ọ na-atụ token ndị provider kọrọ, wall latency site na mmalite ruo na njedebe (gụnyere composition nke sheet), ọnụọgụ model-call, na njigide eziokwu ndị manifest kọwara. A naghị ede nzaghachi raw nke model na report; naanị digest SHA-256 na ID eziokwu ndị dakọtara ka a na-edebe. Harness ahụ anaghị eme network call ma ọ bụ call model a na-akwụ ụgwọ ma ọ bụrụ na e nyeghị `--execute-real`, ma hazie `--model`, `OMNIROUTE_BASE_URL`, na `OMNIROUTE_API_KEY`. Na-enweghị real run ahụ e kwuru kpọmkwem, verdict ya nke igwe nwere ike ịgụ na-anọgide `HOLD`; nha synthetic nke payload/ọnụọgụ call naanị abụghị evidence maka promotion.

Ndị caller nwere ike itinye array `transcript.cues` nke nhọrọ na akụkụ vidiyo akwadoro mgbe ha nwere ederede e mekọrịtara oge ya. Cue ọ bụla ga-enwe `text`, interval `start`/`end` nwere finite value nke dị n’ime duration a nyochara, yana `source` dị na whitelist (`client`, `embedded`, ma ọ bụ `audio-bridge`); default nke `confidence` bụ `1`, ọ ga-adịkwa n’etiti `0` na `1`. A na-ejikọta cue ndị bụ exact duplicate ka ha bụrụ otu. OmniRoute anaghị ebido transcription site na metadata a: a na-edepụta cue ndị e nyochara ma kwado n’ime result a kọwara, tinyere source, confidence, na interval ha, ma gosipụta ha dịka observation a na-atụkwasịghị obi n’akụkụ caption fremu. A na-ajụ ederede na-adịghị valid, nke gafere range, ma ọ bụ nke na-enweghị provenance kama ịgwakọta ya n’ime stream caption. Channel transcript abụọ nke request body na-eme normalize provenance e nyere ka ọ bụrụ `client`, gụnyere label `embedded` ma ọ bụ `audio-bridge` onye zitere request kwupụtara n’onwe ya. Naanị adapter nke server nwe nwere ike ịnye label ndị ahụ a tụkwasịrị obi site na argument code-only `trustedSource`; field JSON dị na request enweghị ike iru argument ahụ. Ederede transcript ka bụ ọdịnaya sitere na media nke a na-atụkwasịghị obi, n’agbanyeghị provenance ya, ọ gaghịkwa ekpebi authorization ma ọlị.

Caller nwere ahụmịhe dị elu nwere ike ịnye track `audioTranscript` maka otu vidiyo ahụ; a na-ewere ya dịka ederede client nyere, ọ bụghị ihe akaebe na server mere transcription. Fusion seam na-agba observation anya na nke audio n’okpuru otu deadline na abort signal, na-ahazi ha n’otu timeline, na-ejikọta exact duplicate ka ha bụrụ otu, ma na-akọ partial result mgbe naanị otu akụkụ gara nke ọma. `audioTranscript` na-adịghị valid na-agbadata gaa na partial result ahụ — a na-edobe nkọwa anya, ebe branch audio na-edekọ failure code e mere sanitize — kama ime ka vidiyo niile daa. A na-echekwa availability nke branch ọ bụla, partial flag, na failure code ndị e mere sanitize n’ime result a kọwara, n’ime metadata guardrail (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), n’ime metadata result-cache, nakwa n’ime counter fusion nke bridge. Ụzọ default nke Video Bridge anaghị akpọ speech-to-text ma ọ bụ budata copy media nke abụọ; na-enweghị track ahụ e kwuru kpọmkwem, ọ na-anọgide video-only.

**Nchekwa transcript (#12150 P1).** Nke a na-emetụta onwe ya oge ọ bụla
Njikọ Vidio (nke a ga-ahọrọ iji ya n'onwe ya) gosipụtara akara transcript — enweghị ọkọlọtọ
nchekwa dị iche. Mgbe arịrịọ gosipụtara akara transcript ọ bụla (`transcript` nke
onye kpọrọ ọrụ kwupụtara ma ọ bụ `audioTranscript` ejikọtara ọnụ), usoro nchedo ahụ na-akara ya
`videoBridgeObserved` ma mepụta oyiri ezochiri nke nkọwa vidio ahụ —
ngosipụta yiri nke mbụ nke e ji
`[redacted-video-transcript]` dochie ederede nnwere onwe dị n'ahụ akara ọ bụla, site n'iji dochie oghere akara ahaziri
tupu e jikọta eriri ahụ (ọ bụghị site n'ịtụgharị ederede e mere ka ọ bụrụ otu larịị, ya mere ọdịnaya akara ọ bụla —
ma nke e ji ebuso usoro agha ma nke nkịtị, gụnyere ahụ nwere `]` dịka
`[inaudible]`/`[music]` — agaghị alanarị). Ahụ arịrịọ ndekọ oku a na-echekwa na-eji
oyiri ahụ ezochiri dochie akụkụ ederede ọ bụla sitere na vidio, site n'ịdakọ ha dịka
ọdịnaya si hà nhata; a na-agụgharị ntọala `fullText` site na payload usoro nchedo tupu oku
emechara, ka ndakọrịta ahụ ka nwee ihe ịga nke ọma mgbe usoro nchedo ndị ọzọ n'usoro gasịrị (ndị na-ekpuchi PII na
nzere, ndị nwere mkpa 10/95) degharịrị ederede nkọwa ahụ n'otu ebe, nakwa
mgbe ntinye system-prompt/handoff/memory gbanwere nhazi n'usoro ozi ahụ. Ahụ
e zigara n'elu usoro gaa na model anaghị agbanwe. Arịrịọ a hụrụ anaghịkwa etinye
ihe ọ bụla na-adịgide adịgide na Memory (a na-amafe mwepụta sitere na arịrịọ na nzaghachi),
ka nzaghachi nke model n'onwe ya ghara ikwughachi ederede transcript n'ime Memory.

**Oghere vidio raw (#12430).** Mgbe agbanyere njikọ ahụ ma amaghị ma ọ bụ enweghị nkwado vidio native, oghere `transcript`/`audioTranscript` akọwapụtara na-emekwa ka `videoBridgeObserved` rụọ ọrụ, ọbụna mgbe nkọwa dara ma ọ bụ mgbe oke `maxVideos` gasịrị. `null` na eriri efu na-agụnye; oghere na-anọghị na metadata na-abụghị nke vidio anaghị agụnye. Oyiri echekwara na-ezochi oghere ndị a ma ọ bụ hapụ arịrịọ ahụ kpamkpam, a na-agafekwa caches/Memory.

N'ụzọ fallback ndị ahụ, akara ziri ezi sitere n'aka onye kpọrọ ọrụ na-aghọ akụkụ `text`/`input_text`
a na-akwado kama ịbụ oghere provider na-abụghị ọkọlọtọ. Track abụọ ndị e nyere n'arịrịọ
ka bụ nleba `client` a na-apụghị ịtụkwasị obi, tinyere ịdọ aka ná ntị doro anya na akọwaghị vidio ahụ
nakwa na a kwadoghị timestamps ya site n'iji media tụnyere. Oke dị ugbu a nke
akara 256/64-KiB n'ozuzu ya na oke akara ọ bụla na-emetụta track abụọ ahụ ọnụ;
timestamps ga-adaba n'ókè sekọnd 600 nke broker na window elekwasị anya ọ bụla
e nyere. A na-atụfu track na-ezighi ezi, a naghị eziga ha dịka ederede nkịtị; enwere ike iji
track ibe ya ziri ezi ma ọ bụrụ na ngụkọta ha agafeghị oke ahụ. Oghere null/efu
anaghị etinye ederede ọ bụla. Fallback a anaghị agbakwunye nbudata media ma ọ bụ transcription.
A na-ewepụ oghere mgbatị transcript na akpa vidio fallback nakwa n'ihe
`video_url`/`source` ya. Allowlist wire OpenAI ka na-adị siri ike; akpa vidio
ndị amaghị nkwado native ha ka dị, ebe target ndị a maara na ha bụ naanị ederede na-ejigide akara nchebe.
Oyiri redaction ahaziri na-echebe ederede transcript agbakwunyere, ebe arịrịọ mbụ
nke onye kpọrọ ọrụ nwere ka na-adị otu ọ dị. Target nwere nkwado native na
njikọ agbanyụrụ na-ejigide omume bypass ha dị ugbu a.

Oyiri ndị ọzọ echekwara na-eji otu akara arịrịọ a hụrụ ahụ. Snapshot arịrịọ client raw
tupu usoro nchedo, arịrịọ pending dị na memory, na ndekọ arịrịọ a jụrụ n'oge
na-eji usoro dochie oghere transcript n'akụkụ vidio;
a na-ezochi string prompts nke ọkwa pipeline na context handoff mepụtara
n'ebe a na-edobe ahụ arịrịọ echekwara. Akara `video_content_removed`
echekwara na-eme ka continuation `previous_response_id` kwụsị n'ụzọ mechiri emechi kama iwughachi
ederede e kpachaara anya tụfuo. Ọ bụrụ na arịrịọ a hụrụ efunahụ oyiri redaction
nke akụkụ ya tupu logging, ma ọ bụ ọbụna otu n'ime ọtụtụ oyiri vidio adabaghị
mgbe mgbanwe arịrịọ ndị sochirinụ gasịrị, a na-ahapụ ahụ arịrịọ echekwara
kpamkpam kama ichekwa transcript e zoro naanị akụkụ ya.

Maka arịrịọ a hụrụ, nzaghachi model nwere ike ihota akụkụ ọ bụla nke
transcript na-enweghị ókè akara ahaziri. N'ihi ya, a na-eji akara nkwụsị dochie
`responseBody` nke ndekọ oku echekwara; anaghị echekwa artifact pipeline zuru ezu
(nke nwere ike ịgụnye ahụ upstream/client na stream chunks).
Semantic, idempotency, na reasoning-replay caches na-amafe ịgụ na ide
maka arịrịọ ahụ. Arịrịọ provider na nzaghachi client na-ahụ anaghị agbanwe.
A na-ewepụ bytes keepalive mbụ na buffer nwa oge mgbe a hapụrụ artifact zuru ezu.
Ịdọ aka ná ntị EventStream mebiri emebi nke Kiro na-akọ naanị ọnụ ọgụgụ payload byte,
ọ dịghị mgbe ọ na-akọ ọdịnaya ya ma ọ bụ raw error nke JSON parser.
Nke a anaghị ekwu na enyochala diagnostic provider/plugin ọ bụla na-enweghị njikọ;
a na-esochi nyocha sara mbara nke ebe nchekwa na #11658.

Lifecycle ime nke `/api/modality-bridge/video/drilldown` bụ cache substrate dị iche,
nke loopback/token na-enyocha njirimara. Ọrụ ọ bụla chọkwara
canonical opaque principal ID. Tupu enyere onye na-akpọ production ikike, ọ ga-
ewepụta ID ahụ site na tenant e nyere njirimara ma ghara mgbe ọ bụla iziga
uru client họọrọ. Cache keys na-ejikọta principal ahụ na canonical session na
video-reference IDs, na-echekwa naanị keys ha sitere na SHA-256, ma na-amachi ma ịgụ
ma ihichapụ n'otu principal ahụ. Cache na-echekwa ruo naanị JPEG frames 16
e wepụtara n'otu entry, na-eme ka ha kubie ume mgbe nkeji iri gasịrị, ma na-akwado
ọgụgụ `start`/`end` nwere oke ma ọ bụ ihichapụ session kpọmkwem.

Principal ọ bụla nwere oke entries 16 na 64 MiB nke canonical JPEG data. Oke ndị ahụ
dị iche na oke zuru ụwa ọnụ nke entries 64/256 MiB: nrụgide quota nke principal
na-achụpụ naanị entries principal ahụ ejighị ogologo oge tupu e leba anya na
global LRU eviction. A na-ekpochapụ entries kubie ume na ndekọ principal na
nke zuru ụwa ọnụ mgbe cache na-arụ ọrụ, ebe cancellation na validation failure
anaghị echekwa partial replacement.

Cache na-ajụ Base64 na-abụghị nke ọkọlọtọ, padding karịrị oke, mgbasa ozi na-abụghị JPEG, JPEG e mezuru n'ụzọ na-ezighi ezi ma ọ bụ e bipụtara, yana JPEG na-emepụta ịdọ aka ná ntị n'oge `sharp` decode nke onyonyo dum nke e nyere oke. Ọ na-encode onyonyo ọ bụla a nabatara ọzọ dị ka JPEG ọkọlọtọ, na-eweta obosara na elu site na bytes a decode kama ịtụkwasị obi na fields onye na-akpọ, ma na-atụfu bytes polyglot ọ bụla na-eso n'ikpeazụ kama ịdobe ha. Naanị buffer compressed ọkọlọtọ e nyere oke ka a na-agụ na quotas abụọ ahụ. Oke JSON wire gụnyere overhead Base64 maka oke elu nke input a decode nke ruru 32 MiB. Derivation ọ bụla a chekwara na-edekọ format/resolution JPEG ya a kwadoro, iwu sampling, version derivation, oge e kere ya, content hash nke server gbadoro, yana reference nne na nna a hash gbakwunyere parent-content hash nke onye na-akpọ a tụkwasịrị obi. A na-enyocha kagbuo n'etiti usoro decode/hash asynchronous tupu a mee cache commit atomic.

Tranche a ka ejibeghị producer production na route ma naghị enye nhọrọ variant multi-resolution. Ya mere, ụzọ arịrị Video Bridge doo anya anaghị ebute ọrụ ọzọ, ebe principal derivation ejikọtara na tenant na lifecycle multi-resolution FU-08 zuru oke ka dịrị dị ka ọrụ nọsọ a kpọtụrụ aha n'ụzọ doro anya kama a ga-ede ya dị ka omume zuru oke.

A na-ede captions na frames n'usoro usoro site na model Video a haziri. Video override dị ogboro na-anakwere ntọala Vision; ọ bụrụ na ha abụọ dị ogboro, Vision auto-router na-ahọrọ model nwere ike ịhụ ihe dị irè. Captions gara nke ọma na-edochi akụkụ mbụ site na prefix kwụsiri ike `[Video description:` nke na-akọwa ederede ahụ dị ka nchọpụta sitere na mgbasa ozi nke enweghị ntụkwasị obi ma na-agwa models downstream ka ha ghara iso ntụziaka ahụrụ n'ime mgbasa ozi. Keys cache frame-caption gụnyere bytes JPEG, prompt, timestamp, na model dị irè; naanị captions gara nke ọma ka a na-cache. Entries cache na-edobe model producer nke gara nke ọma n'ezie, gụnyere model fallback; bridge na-akọ `mixed` mgbe frames dị iche iche sitere n'aka models dị iche iche. Cache hit na-eji identity producer ahụ ọzọ kama ịnye ya aha ọzọ dị ka atụmatụ routing a rịọrụ. A na-eme key result cache nke vidiyo dum bụ isi na input ọ bụla na-agbanwe output — prompt, model dị irè, iwu sampling, ọnụ ọgụgụ frames, ọnọdụ nchọpụta semantic, fingerprint SHA-256 nke focus hint e mere ka ọ dị ọkọlọtọ, focus window, `transcript`, `audioTranscript`, na flag contact-sheet — ya mere ịgbanwe nke ọ bụla n'ime dimensions ahụ bụ cache miss, ọ bụghị mgbe ọ bụla iji nke ochie mee ihe ọzọ. Version iwu dedup anya, threshold, na ọnụ ọgụgụ candidate frames e nyere oke dịkwa doro anya na key result-cache na metadata; ya mere mgbanwe iwu enweghị ike iji nkọwa vidiyo dum nke ochie mee ihe ọzọ. Metadata result-cache v4 na-edobe ọnọdụ na fingerprint, ọ bụghị ọrụ raw nke onye ọrụ. Metadata guardrail na-akọ ọnọdụ nchọpụta a rịọrụ na nke dị irè; a na-akọ ọnọdụ `focused` a rịọrụ nke na-enweghị ederede onye ọrụ nwere ike iji dị ka `full` n'ezie.

Guardrail na-ewepụta akụkụ vidiyo ọ bụla a na-akwado ma naghị akọwa karịa `modalityBridgeVideoMaxVideos`. Maka lekwasịrị a gosipụtara na ọ bụ `supportsVideo === false`, vidiyo dara ada na nke karịrị oke na-aghọ ihe ịrịba ama ederede nchebe doro anya ka vidiyo raw ọ bụla ghara ịdịrị. Mgbe a maghị ike, akụkụ ahụ na-edobe carrier vidiyo ha; transcript fallback ọ bụla na-eso ntụgharị ederede e nyere oke a kọwara n'elu. Lekwasịrị nwere `supportsVideo === true` na-agafere bridge. Signal abort nke arịrị client na-agafe site na download, broker queue, subprocesses, na oku captions; aborts na-akwụsị n'etiti vidiyo ma naghị ada emeghe na mgbasa ozi raw.

Ntọala runtime bụ DB na-akwado ha ma a na-enyocha ha site na Zod:

| Igodo                               | Ndabara     | Oke / omume                                                                                                    |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime nhọrọ, opt-in                                                                                          |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` na-edobe captions nkịtị; `focused` na-eji context onye ọrụ ikpeazụ e nyere oke nke enweghị ntụkwasị obi |
| `modalityBridgeVideoModel`          | `""`        | Na-anakwere model Vision Bridge                                                                                |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                           |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, ma ọ bụ `segment_aware` proportional; ọdịda detector na-alaghachi na `uniform`       |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                            |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                 |

A na-agbaze ụkpụrụ timeout Vidiyo ochie a chekwara nke karịrị sekọndị 120 na oke oge broker; a na-ajụ ndekọ ntọala ọhụrụ karịa oke ahụ. `GET /api/modality-bridge/video/runtime` chọrọ locality loopback a tụkwasịrị obi nke a tụrụ akara tupu authentication ma ọ bụ nyocha runtime, mgbe ahụ ọ chọrọ management auth. Ọ na-alaghachi naanị `available`, versions FFmpeg/ffprobe e mere ka ọ dị ọcha, na ihe mere e ji kwụsiri ike mgbe runtime na-adịghị. Internal extraction endpoint abụghị public upload API: queue jupụtara na-alaghachi `503` gbakwunyere `Retry-After`, onye na-akpọ kwụsịrị njikọ na-alaghachi `499`, na oke oge broker kwụsiri ike na-alaghachi `504`. Azịza a tụgharịrị na-agbakwụnye `video->text;model=<visionModel>;parts=<videos>` na header etiti `x-omniroute-modality-bridge` na-ewepụghị akụkụ Vision ma ọ bụ Audio.

### PII Masker (`piiMasker.ts`)

Ọ na-arụ ọrụ na usoro **abụọ** ahụ.

- **`preCall`** na-eme clone nke payload, na-agagharị `system`, `messages`, `input`, na
  `prompt` (gụnyere ihe ndị bụ plain string), ma na-etinye `processPII()` (si
  `@/shared/utils/inputSanitizer`) na ọhịa `content`/`text` ndị bụ string. Mgbe
  `PII_REDACTION_ENABLED=true`, a na-ehichapụ PII a chọtara na payload
  na-aga. Nke a adabaghị na `INPUT_SANITIZER_MODE` (nke na-achịkwa naanị
  amụmọ prompt-injection). Mgbe redaction gbanyụrụ, oku ahụ na-edekọ ọnụ
  ọgụgụ nchọpụta n'enweghị idegharị ọdịnaya.
- **`postCall`** na-eme deep-clone nke nzaghachi, na-agba `sanitizePIIResponse()` gbakwunyere
  onye na-ekpuchi Responses-API-shape (`maskResponsesOutput` — nke na-ekpuchi
  `output_text` na `output[].content[].text`). Ọ bụrụ na redaction ọ bụla mee,
  nzaghachi emezigharịrị na-anọchi nke mbụ.

Guardrail ahụ anaghị egbochi; ọ na-eme naanị ntụ aka (`meta.detections`,
`meta.redacted`) ma ọ bụ idegharị.

#### Nhọrọ kwa-ụdị, ụkpụrụ omenala na ihe ọgụgụ nchọpụta

**Dashboard → Settings → Security → PII masking** na-ahọrọ _ihe_ a na-ekpuchi. Ọ
naghị agbanye masking: nke ahụ ka bụ `PII_REDACTION_ENABLED` (arịrị) na
`PII_RESPONSE_SANITIZATION` (nzaghachi + SSE), ha abụọ gbanyụrụ n'ụzọ dabara
adaba.

- **Nhọrọ kwa-ụdị** — a depụtara id ndị e wuru n'ime na
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Ọ bụrụ na a hazịghị
  ihe ọ bụla, ọ pụtara ụdị niile (omume ahụ dị ka ọ dị tupu ntọala a dịrị).
  Ụkpụrụ `ssn_us` nke engine arịrị na-ejikọta na `ssn`. Templates (Minimal,
  Standard, Financial, Brazilian, USA, Full) na-ejupụta naanị checkboxes na UI.
- **Ụkpụrụ omenala** — rụọ ụkpụrụ regex ma ọ bụ wildcard ruru 20 (`*` =
  mkpụrụedemede ndị na-abụghị whitespace ruru 64, `?` = otu). Ihe kwekọrọ
  na-aghọ `[CUSTOM_REDACTED]`. Ụkpụrụ ọ bụla na-agafe
  `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): karịa mkpụrụedemede 500, flags
  na-ejedebe na `g i m s u`, ga-akpile, ga-agafere `safe-regex` (catastrophic
  backtracking), ma ghaghị izere ịkwekọ na string efu ma ọ bụ ihe nnọchi ebe
  redaction. A na-ajụ ụkpụrụ dara ada mgbe e na-echekwa ya na mgbe a na-anwale
  ya, ma a na-amafegharị ahịrị echekwara nke dara ada n'oge ọrụ kama ịkpile ya.
  Ụkpụrụ omenala na-arụ ọrụ naanị mgbe masking na-arụ ọrụ.
- **Ihe ọgụgụ nchọpụta** — ọnụ ọgụgụ kwa-ụdị (ọ bụghị uru ndị kwekọrọ), e jide
  ha na ebe nchekwa (memory) ma a na-amalitegharị ha mgbe mmegharị ọhụrụ
  (`src/lib/pii/piiDetectionStats.ts`). Ha na-arịwanye naanị mgbe masking
  na-arụ ọrụ.

Ntọala ndị ahụ bi na tebulu `key_value` (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) ma a na-agụ ha site na cache sekọnd 1. API:

| Usoro  | Ụzọ                      | Ebumnuche                                                             |
| ------ | ------------------------ | --------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Ọnọdụ flag, `enabledTypes`, `customPatterns`, ihe ọgụgụ nchọpụta      |
| `PUT`  | `/api/settings/pii`      | Dochie `enabledTypes` (`null` = niile) na/ma ọ bụ `customPatterns`    |
| `POST` | `/api/settings/pii/test` | Na-agba ọrụ ule otu ụkpụrụ na nlele karịa 8 KB; ọ dịghị ihe echekwara |

Ha atọ chọrọ nkwenye njikwa ma na-enyocha ahụ arịrị ahụ site na Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Prompt Injection (`promptInjection.ts`)

Na-achọpụta usoro ndị na-emegide n'ime ọdịnaya onye ọrụ nyere ma na-amanye
amụmọ ahaziri. Variables gburugburu ebe na nhọrọ constructor na-akwalite
omume ya:

| Ntọala      | Env var                                                                                               | Dabara adaba | Mmetụta                                                                                                                                                                                      |
| ----------- | ----------------------------------------------------------------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Agbanyere   | `INPUT_SANITIZER_ENABLED`                                                                             | `true`       | Mgbe ọ bụ `false`, guardrail na-akwụsị ozugbo.                                                                                                                                               |
| Mode        | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`       | Amụmọ injection: `block`, `warn`, ma ọ bụ `log`. (A na-anabata `redact` maka back-compat ma ọ **anaghị** ewepụ ederede injection; idegharị PII arịrị ka `PII_REDACTION_ENABLED` na-achịkwa.) |
| Oke mgbochi | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`       | Ọkwa ike kacha nta a chọrọ iji gbochie. Medium bụ nlele naanị n'ụzọ dabara adaba.                                                                                                            |

**Usoro ebube Mode** (`getMode`): `options.mode` nke onye na-akpọ →
`INJECTION_GUARD_MODE` **nkwenye-karịa DB feature-flag** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. N'ihi ya, nkwenye-karịa dashboard na-emeri env vars, n'ihi ya ka UI
Feature Flags na-achịkwa onye nche ahụ dị ndụ (enweghị mmegharị ọhụrụ). Ịgụ DB
ahụ bụ fail-safe: ọ bụrụ na ọ daa, onye nche ahụ na-alaghachi na omume dabere
na env, ma mgbe a hazịbeghị nkwenye-karịa ọ bụla, omume ahụ yiri nke
env naanị.

Isi mmalite nchọpụta:

1. `sanitizeRequest()` si `@/shared/utils/inputSanitizer` (otu ngwa nchọpụta a
   na-eji ebe ndị ọzọ na pipeline).
2. `DEFAULT_GUARD_PATTERNS` e wuru n'ime (ugbu a `system_override_inline` na
   `markdown_system_block`, ha abụọ bụ ọkwa `high`).
3. `customPatterns` nhọrọ a gafere site na nhọrọ constructor (strings, regex,
   ma ọ bụ ndekọ `{ name, pattern, severity }`).

Mgbe `mode === "block"` **yana** opekata mpe otu nchọpụta ruru oke severity, `preCall` na-alọghachi `{ block: true, message: "Request rejected: suspicious content detected" }`. Na ọnọdụ `warn`/`log`, guardrail na-edebe ndekọ mana ọ na-ahapụ oku ahụ ka ọ gaa n'ihu. A na-ebupụkwa enyemaka a na-ekekọrịta `evaluatePromptInjection()` maka ndị na-akpọku chọrọ ịnyocha prompts n'enweghị ịga site na registry.

**Oke nyocha (v3.8.20):** onye nchọpụta na-enyocha naanị **16 KB mbụ** nke ederede prompt ejikọtara ọnụ — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) n'ime `src/shared/utils/inputSanitizer.ts`. Ma `detectInjection()` ma `evaluatePromptInjection()` abụọ na-eme `slice(0, MAX_INJECTION_SCAN_BYTES)` tupu ha agba pattern loop ọsọ. Ntuziaka injection na-anọkarị nso n'elu nke ntinye, n'ihi ya nke a na-eme ka regex CPU/GC nọrọ n'oke na payloads ruru ọtụtụ narị KB n'enweghị ibelata ike nchọpụta (cf. #3932, #4041).

### Ihe Nzobe Ihe Nzuzo (`credentialMasker.ts`)

Ọ na-arụ ọrụ na **ogbo abụọ** ahụ, nke ikpeazụ na yinye ndabara (usoro `95`). Ọ na-ehichapụ ụdị API-key / secret-token a ma ama site na payload na-apụ apụ (ọdịnaya ozi, arụmụka tool-call, nsonaazụ ngwọrọ) **yana** nzaghachi onye na-enye, ka a ghara ikwa akọ ihe nzuzo a mado n'ime prompt (ma ọ bụ nke nsonaazụ ngwọrọ weghachitere) nye onye na-enye upstream ma ọ bụ laghachi azụ nye onye ahịa.

- **Naanị opt-in**, otu usoro dị ka nchapụ PII (dị nso Hard Rule #20): a gbanyụrụ ya ma e wezụga `settings.credentialRedactionEnabled === true` **ma ọ bụ** `CREDENTIAL_REDACTION_ENABLED=true`. Mgbe a gbanyụrụ ya, guardrail ahụ bụ no-op — ọ naghị egbochi mgbe ọ bụla, ọ naghịkwa edegharị ihe ọ bụla.
- `redactCredentials()` na-agagharị n'osisi payload/response dum (`walkValue()`, nke echedoro megide prototype-pollution, nke echedoro megide cycle site na `WeakSet`) ma jiri ihe nnọchi ebe `[REDACTED:<type>]` dochie ihe dakọtara, na-akpịcha naanị alaka ndị gbanwere n'ezie.
- `CREDENTIAL_PATTERNS` na-ekpuchi igodo ndị na-enye LLM (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), token VCS/SaaS (GitHub, Slack, Linear, Notion, npm, Postman, Discord), igodo ịkwụ ụgwọ (Stripe, Square), igodo igwe ojii (AWS access key, Twilio, SendGrid, Mailgun), igodo nzuzo / JWTs, eriri njikọ na-ebu ihe nzuzo (`mongodb://user:pass@...`, wdg.), yana ụdị header-value nke `Authorization`/`x-api-key`/`api-key`/`apikey` izugbe. A na-ehichapụ igodo nke nwere ụdị header (`authorization`, `x-api-key`, `api-key`, `apikey`) n'ụzọ usoro (naanị uru, a na-echekwa scheme prefix dị ka `Bearer `/`Basic `) kama ịjị text regex izugbe.
- Guardrail ahụ anaghị egbochi mgbe ọ bụla; ọ na-edegharị naanị (`modifiedPayload` / `modifiedResponse`) ma na-agbakwụnye ntụpọ (`meta.credentialsRedacted`, `meta.count`).

Nchekwa regression: `tests/unit/credential-masker-guardrail.test.ts`.

## Nkwekọrịta Ntọala (`base.ts`)

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
  block?: boolean; // true na-akwụsị usoro ahụ ozugbo
  message?: string; // a na-egosi ya mgbe a na-egbochi
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // preCall na-alaghachite ya i dee arịrịọ ahụ ọzọ
  modifiedResponse?: TValue; // postCall na-alaghachite ya i dee nzaghachi ahụ ọzọ
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

Guardrail na-egosi "enweghị mgbanwe" site na ịlaghachite `void`, `{}`, ma ọ bụ
`{ block: false }`. Ịlaghachite `modifiedPayload`/`modifiedResponse` na-edochie
uru na-asọfe site n'usoro ahụ maka guardrails ndị na-eso n'ihu.
`signal?: AbortSignal` na-ebu ndụ okike nke onye na-akpọ n'ime guardrails. Ịkagbu
arịrịọ bụ ihe e wepụrụ n'echiche nke fail-open: ọhịa mgbasa ozi (media bridges)
na-akwụsị ọrụ ma na-ehicha n'enweghị iweghachi raw media nye ebumnuche a maara na
ọ naghị akwado ya.

## Ndebanye (`registry.ts`)

`guardrailRegistry` nke bụ singleton na-ekpughe:

- `register(guardrail)` — na-agbakwụnye (ma ọ bụ dochie site n'aha e mere ka dị
  n'ọkwa nkịtị) guardrail ma hazie ọzọ n'usoro `priority` na-arị elu.
- `clear()` / `list()` — ndị enyemaka nchịkwa.
- `runPreCallHooks(payload, context)` — na-agafe guardrails ndị na-arụ ọrụ,
  na-agafe payload site na `modifiedPayload`, ma na-akwụsị na `block: true` mbụ.
- `runPostCallHooks(response, context)` — usoro otu ahụ n'akụkụ nzaghachi.
- `resetGuardrailsForTests({ registerDefaults })` — na-ehicha ọnọdụ ma debanye
  ndị dabara adaba ọzọ ma ọ bụrụ na a chọrọ, maka nnwere onwe nke ule dị ọcha.

Ndị na-agba ọsọ abụọ ahụ na-alaghachite `{ blocked, payload|response, results, guardrail?, message? }`
ebe `results` bụ array nke ndekọ `GuardrailExecutionResult` nke gụnyere
`blocked`, `skipped`, `modified`, `error`, na `meta` nke guardrail ọ bụla, nke
bara uru maka ịchọso usoro (tracing).

### Ịgbanyụ Guardrails Maka Arịrịọ Ọ Bụla

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` na-anakọta ndepụta aha
guardrail e wepụrụ ndị yiri ya nke kwesịrị ịgafe maka arịrịọ dị ugbu a. Enwere
ọwa ise, nke a na-agụ n'usoro a ma jikọta n'otu ndepụta (nke mbụ a hụrụ ka mmeri
mgbe a na-ewepụ ndị yiri ya):

1. `apiKeyInfo.disabledGuardrails`
2. Ahụ arịrịọ `disabledGuardrails` (n'elu kasị elu)
3. Ahụ arịrịọ `metadata.disabledGuardrails` (naanị mgbe `metadata` bụ object)
4. Isiokwu `x-omniroute-disabled-guardrails`
5. Isiokwu ochie `x-disabled-guardrails`

E jikọtara ọwa ise ahụ ọnụ, gụnyere isiokwu abụọ ahụ: iziga
`x-omniroute-disabled-guardrails` na `x-disabled-guardrails` ha abụọ na-agafe
njikọta (union) nke ndepụta ha, na isiokwu ọgbara ọhụrụ dị efu anaghị ezo isiokwu
ochie ahụ ọzọ
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), edoziri na
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Uru nwere ike ịbụ array nke strings ma ọ bụ otu string nke kọma kewapụrụ; a
na-ekacha aha ndị ahụ ma mee ka ha rue ọkwa n'ụdị lowercase kebab-case
(`pii_masker` → `pii-masker`), ma na-atụfụ ndị dị efu. A na-agafe nsonaazụ ahụ
site na `context.disabledGuardrails` gaa na ndebanye ahụ, nke na-agafe guardrails
ndị dabara (`skipped: true` n'ime `results`).

Ndepụta mgbanyụ ahụ na-emetụta naanị **ndebanye** ahụ. Ọnọdụ `block` nke
prompt-injection bụ oke a chọrọ n'ike: injection-guard middleware
(`src/middleware/promptInjectionGuard.ts`) na-akpọ `evaluatePromptInjection()`
n'enweghị ndepụta mgbanyụ ọ bụla nke onye na-akpọ na-achịkwa (ewepụrụ oku nwụrụ
anwụ `resolveDisabledGuardrails({ body })` nke ọ na-akpọ mbụ na
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), yabụ a ka na-ajụ
arịrịọ nke gbanyụrụ `prompt-injection` n'ọnọdụ `block`. Nke a bụ ebumnuche. Ọwa
mgbanyụ ndị ahụ bụ nke onye na-akpọ na-achịkwa (ahụ arịrịọ, metadata, isiokwu),
na onye na-akpọ agaghị enwe ike ịgbanyụ njikwa nchekwa nke onye nchịkwa tinyere
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Njikọta
isiokwu sitere na
[#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412) na-agbanwe naanị
guardrails ndị ndebanye na-agafe; ọ naghị ekwe ka onye ahịa gafee middleware ahụ.
A na-esochi amụma guardrail ndị a chọrọ n'ike maka igodo ọ bụla na otu ọ bụla na
v4 RFC [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417). Lee
[Nkuchi na oke](#coverage-and-limits).

## Usoro ịrụ ọrụ

Maka arịrịọ ọ bụla na-eru `src/sse/handlers/chat.ts` na
`open-sse/handlers/chatCore.ts` (ụzọ ezinụlọ chat ndị depụtara n'okpuru
[Coverage and limits](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` na-ewu ndepụta ndị a ga-awụfe sitere na API key, body,
   na headers.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` na-agba ndị guardrails n'usoro
   priọrịti na-arịgo elu:
   - A na-edekọ ndị guardrails a gbanyụsịrị dị ka `skipped`.
   - `preCall` nke guardrail ọ bụla nwere ike ịdegharị payload site na `modifiedPayload`.
   - `block: true` mbụ na-akụsị usoro ahụ, handler ahụ anaghị
     azaghachi nzaghachi nju nke guardrail.
3. Payload ahụ (nke e nwere ike idegharị) na-asọ n'ime combo routing na
   mbupu upstream.
4. **Naanị ndị na-abụghị streaming:** mgbe e gbakọtara nzaghachi ahụ,
   `guardrailRegistry.runPostCallHooks(...)` na-agba otu usoro ahụ na
   nzaghachi ahụ. `block: true` ebe a na-atụfụ nzaghachi upstream wee weghachite HTTP 400. Nzaghachi ndị na-agba streaming na-awụfe nzọụkwụ a kpamkpam.

A na-edekọ guardrails ndị na-atụ mperi na `error: <message>` ma na-akọ ha site na
`logger.warn`, ma usoro ahụ na-aga n'ihu — fail-open n'echiche.

## Oke nchebe na oke ya

A jikọrọ registry nke guardrail naanị n'ime pipeline chat. Oke ndị a
bụ ihe `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` na
`tests/unit/guardrail-pipeline-characterization.test.ts` kwadoro; mee ka ule ndị ahụ
gbanwee n'otu e zubere mgbe omume ahụ gbanwere.

### Ebe hooks na-arụ ọrụ

| Hook / njikwa                      | Na-arụ ọrụ na                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                  | Arịrịọ ndị `handleChat` na-edozi (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (na `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*`, na proxy chat Telegram. Na endpoint ule dashboard `/api/guardrails/test` kwa. Mgbochi pre-call na-eweghachi HTTP 400. |
| `runPostCallHooks`                 | **Naanị** nzaghachi chat ndị **na-abụghị streaming** (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Nzaghachi ndị na-agba streaming anaghị eru ya.                                                                                                                                                                                                                                                               |
| Streaming PII                      | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), e jikọtara na `streamingPipeline.ts` mgbe `PII_RESPONSE_SANITIZATION` dị n'ọrụ. Ọ bụghị guardrail, ya mere ụzọ ndị gbanyụsịrị anaghị emetụta ya.                                                                                                                                                                                                            |
| Middleware injection-guard (ochie) | Ụzọ `/v1` ọ bụla na-ebu prompt, tinyere ezinụlọ chat (lee [route coverage](#injection-guard-route-coverage--red-team-phase-8--block-d)). Naanị prompt injection.                                                                                                                                                                                                                                                          |

### Ihe a naghị ekpuchi

- **Ụzọ mgbasa ozi, embeddings na data** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) anaghị eru registry. Enweghị
  PII masking, credential masking ma ọ bụ modality bridge na-arụ ọrụ ebe ahụ. Naanị
  nyocha ha bụ middleware injection-guard ochie ahụ.
- **Nzaghachi ndị na-agba streaming** enweghị guardrails post-call: enweghị `pii-masker` ma ọ bụ
  `credential-masker` post-call, enweghịkwa mgbochi post-call. Naanị transform PII
  streaming na-adị irè (mgbe `PII_RESPONSE_SANITIZATION` dị n'ọrụ). A naghị ehicha
  credential e gosipụtara n'azụ n'ime nzaghachi na-agba streaming.
- **Ụzọ gbanyụsịrị vs. middleware (n'echiche):** middleware na-enyocha
  prompt injection site na oku ya nke `evaluatePromptInjection()`, na-atụghị
  ndepụta gbanyụsịrị ọ bụla nke onye na-akpọ na-achịkwa. Ọnọdụ `block` bụ ókè
  amarala nke ndị gbanyụsịrị nke onye na-akpọ na-achịkwa enweghị ike ịgafere, tinyere na ụzọ ezinụlọ chat
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413). Ịgbanyụsị
  `prompt-injection` na-awụfe naanị guardrail nke registry.

### Ihe na-ahụ nzaghachi tupu post-call

Na ụzọ na-abụghị streaming, usoro ahụ bụ: mwepụta ebe nchekwa echeta → ịrụ ọrụ ngwá ọrụ
ewere n'ime → guardrails post-call → ịpụ mgbochi post-call → nchekwa semantic-cache.

- **Iwepụ echeta** na **ịgba ọrụ ngwaọrụ** na-ahụ nzaghachi ahụ tupu ndị nchekwa post-call enwe ike ịdegharị ya ọzọ ma ọ bụ gbochie ya. Kemgbe [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), iwepụ echeta na-agafe ederede a wepụrụ site na `sanitizePII` mgbe `PII_RESPONSE_SANITIZATION` nọ n'ọrụ (ma n'oge streaming na nke na-abụghị streaming), ma nzaghachi nke post-call mechara gbochiri ka enyeworị echeta na ngwaọrụ.
- **Cache semantic** na-echekwa nzaghachi ahụ mgbe post-call gasịrị, ya mere ọ na-echekwa nzaghachi edegharịrị ọzọ, ma a naghị echekwa nzaghachi agbochiri. A na-akpọ ndekọ cache ngodo dabere na API key ọ bụla.

## Nhazi

Ngbanwe gburugburu nke guardrails arụnyere n'ime na-agụ:

| Ngbanwe                               | E ji ya                      | Mmetụta                                                                                                        |
| ------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`           | Tinye `false` iji gbanyụọ nchọpụta kpamkpam.                                                                   |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`           | Amụma injection: `warn`, `block`, ma ọ bụ `log`. Uru oge ochie `redact` anaghị edegharị ederede injection ọzọ. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`           | Ụzọ maka nche injection; ọ bụkwa flag atụmatụ DB nke **na-akpochapụ** ngbanwe gburugburu (DB > ENV).           |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`           | Oke njọọ kacha nta nke `MODE=block` na-ajụ: `high` (ndabara), `medium`, ma ọ bụ `low`.                         |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`           | Aha ọzọ oge ochie maka `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                      |
| `PII_REDACTION_ENABLED`               | `pii-masker`                 | Mgbe ọ bụ `true`, a na-ehichapụ PII nke arịrị (na-adabereghị na ụzọ injection).                                |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (n'ihu n'usoro) | Na-achịkwa omume masker n'akụkụ nzaghachi.                                                                     |

Guardrails Modality Bridge na-agụ nhazi oge ọrụ site na ebe nchekwa ntọala nke DB na-akwado (`getSettings()`), ọ bụghị ngbanwe gburugburu. Igodo ndị bụ isi nke Vision bụ
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, na
`modalityBridgeCacheMaxEntries`. A na-anabata igodo oge ochie
`visionBridge*` naanị dị ka ụzọ ọzọ ọgụgụ otu okirikiri e dekọrọ
akwụkwọ; ihe edere na dashboard na-eji igodo ndị bụ isi. Ndabara na
resolver ụzọ ọzọ nọ na `src/shared/constants/modalityBridgeDefaults.ts`, ebe a na-edebe
constants oge ochie na `src/shared/constants/visionBridgeDefaults.ts`.

Audio na-eji `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, na `modalityBridgeAudioMaxClips`, tinyere ntọala
`modalityBridgeCache*` e kesara. Audio enweghị ụzọ ọzọ igodo oge ochie n'ihi na e
webatara igodo ndị a na schema Modality Bridge.

Video na-eji `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, na
`modalityBridgeVideoTimeout`, tinyere ntọala `modalityBridgeCache*` e kesara.
A gbanyụrụ ya n'ụzọ ndabara n'ihi na FFmpeg/ffprobe bụ dependencies ọrụ
nhọrọ, na ide ederede nkọwa frame na-agbakwụnya igbu oge na ọnụ ego model.

## Ndị nchebe ahaziri

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

Nzọụkwụ:

1. Mepụta `src/lib/guardrails/myGuardrail.ts` nke gbatịrị `BaseGuardrail`.
2. Tinye `preCall` na/ma ọ bụ `postCall` n'ọrụ.
3. Ma ọ bụ debanye aha n'oge mbubata (push si `registerDefaultGuardrails`) ma ọ bụ
   kpọọ `guardrailRegistry.register(...)` n'oge ọrụ — ndebanye aha na-anọchi
   nchebe ọ bụla gara aga nke nwere otu aha ehaziri.
4. Tinye ule n'okpuru `tests/unit/` (ịmụ atụ dị adị:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Nnwale

Jiri `resetGuardrailsForTests()` n'etiti ule iji malite site n'ọnọdụ a maara.
Nyefee `{ registerDefaults: false }` iji malite na ndebanye aha efu wee
debanye naanị ndị nchebe nọ n'ule. Vision Bridge na-anabata ntinye dabere na ya
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge na-egosipụta
oghere ndị hàatụ maka ntọala, ikike, nhọrọ ụdị STT, nlele nzere, na
ntụgharị ederede. N'ihi ya, ule nwere ike ịnwale ihe omume abụọ ahụ na-enweghị DB
ma ọ bụ ohere netwọk.

## Lee Kwukwa

- `src/lib/guardrails/` — ntinye n'ọrụ
- `src/shared/utils/inputSanitizer.ts` — nhụ̀ta a na-ekekọrịta nke na-akwalite
  prompt-injection na izochi PII
- `src/shared/constants/visionBridgeDefaults.ts` — ndabara Vision Bridge na
  ndepụta ụdị forced-bridge
- `src/shared/constants/modalityBridgeDefaults.ts` — ndabara ọrụ Vision/Audio a na-ekekọrịta
- `docs/architecture/RESILIENCE_GUIDE.md` — oyi kwụrụ onwe ya (circuit breaker, cooldowns)
- `docs/reference/ENVIRONMENT.md` — ntụaka zuru ezu maka mgbanwe gburugburu

## Nchekwa ụzọ injection-guard & red-team (Phase 8 · Block D)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) na-echebe ụzọ niile
na-anabata prompt onye ọrụ. Ọ na-erubere `INJECTION_GUARD_MODE` isi (ndabara `warn` = na-ede naanị ndekọ;
`block` = na-alọta HTTP 400 `SECURITY_001`).

| Ụdị              | Ụzọ                                                                                                                                                  | Ọnọdụ ndabara |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Ederede (dị adị) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn          |
| Nke na-emepụta   | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn          |
| Data             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn          |

Ntụpụ ederede (`extractMessageContents`) na-echebe `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (kwa abalị, `nightly-llm-security.yml`):** promptfoo na-ekwenye na ụzọ ọ bụla na-egbochi
OWASP-LLM corpus na `INJECTION_GUARD_MODE=block`; garak na-agba probes (na-awụfe n'enweghị nzuzo).
E tinyere `moderations` maka ịdị n'otu. Ọnọdụ block bụ oke amabara: `evaluatePromptInjection()`
na-eleghara ndepụta gbanyụrụ kwa arịrị anya nke middleware na-enyefe ya, ya mere `disabledGuardrails`
anaghị **ewepụ** ụzọ ọ bụla na ya ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Usoro ọrụ kwa abalị (`.github/workflows/nightly-llm-security.yml`, cron + ntinye
aka) nwere ọrụ abụọ:

- **`promptfoo-guard` (na-egbochi)** — na-agba `promptfoo eval -c promptfooconfig.yaml`
  na `INJECTION_GUARD_MODE=block`. Ọ bụla ikpe onye iro (dịka "ignore all
  previous instructions…", jailbreaks ụdị DAN) na-akwado na nzaghachi na-ebu
  `error.code === "SECURITY_001"`, ya bụ nchebe ahụ jụrụ arịrị ahụ n'ezie.
- **`garak` (ndụmọdụ)** — na-agba garak `--probes promptinject,dan,leakreplay`
  megide ihe atụ OmniRoute dị n'ime obodo (`http://localhost:20128/v1`). E gburu ya
  na nzuzo onye na-enye (`PROMPTFOO_PROVIDER_KEY`); na-awụfe n'ụzọ dị nro ma a na-agbakwụnye ya
  `|| true`, ya mere ọ na-akọ n'adaghịghị CI.

Nchekwa nke onye enyemaka nchebe (`createInjectionGuard` / `withInjectionGuard`)
na-agafe ụzọ `/v1` ọ bụla na-ebu prompt; a na-adọpụ ederede prompt site na
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` site na
`extractMessageContents()` na `src/shared/utils/inputSanitizer.ts`.
