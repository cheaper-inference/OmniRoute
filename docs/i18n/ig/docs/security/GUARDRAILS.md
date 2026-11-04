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

## Ihe mgbochi arụnyere n’ime

Registry na-ebunye ihe mgbochi isii na-akpaghị aka n’usoro mkpa mgbe a na-ebubata ya
(le `registry.ts` → `registerDefaultGuardrails()`):

| Mkpa | Aha                 | Oge (Stage)    | Faịlụ                 |
| ---- | ------------------- | -------------- | --------------------- |
| `5`  | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`  | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`  | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10` | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20` | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95` | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nọmba mkpa dị ala na-agba ọsọ **mbụ**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Ụdị ntọala GLM 5.3 na `glm-5.3-{low,high,max}` nwere metadata registry/spec doro anya nke
`supportsVision:false`. Ụdị GLM 5.3 Flash ka bụ ụdị nwere native vision. Ụzọ Claude Code `/v1/messages` na-abanye n’usoro ihe mgbochi pre-call `handleChat` a na-ekekọrịta **tupu** ntụgharị Claude-to-OpenAI; a ghaghị ịkọwa ma ọ bụ dozie onyonyo `Read` tool-result ndị dị n’ime tupu ntụgharị ahụ ebuli ha gaa n’ihe dị n’ime OpenAI `image_url` (#17069).

Ọ na-ejide arịrịọ nwere onyonyo ndị ezubere maka **ụdị na-enweghị vision**, ma ọ na-eme otu n’ime ihe ndị a: na-ebugharị arịrịọ ahụ dum gaa n’ụdị nwere ike vision, ma ọ bụ dochie akụkụ onyonyo ndị ahụ na nkọwa ederede nke ụdị vision a na-ahazi na-emepụta tupu oku upstream. Nke a na-eme ka ndị na-enye ọrụ ederede naanị nwee ike ijikwa payload multimodal n’enweghị mgbanwe pụtara ìhè.

Usoro:

1. Mafere ma ụdị ezubere iche na-akwado vision (belụsọ ma ọ pụtara na ndepụta a manyere `isVisionBridgeForcedModel`).
2. Wepụ akụkụ onyonyo site na `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), nke na-enyefe ọrụ ahụ n’aka **unified media detector**
   `detectMediaParts()` dị na `open-sse/utils/mediaParts.ts` — ọ bụ naanị otu ebe eziokwu a na-ekekọrịta na combo compatibility filter.
   Nwepụ ahụ bụ naanị maka ọdịdị ndị `replaceImageParts` nwere ike ịtinyeghachi (nkwekọrịta extract↔replace): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`, na Responses API `input_image`. A na-ewepụkwa ma dochie onyonyo dakọtara ndị dị n’ime Claude Code
   `tool_result.content` na Responses tool outputs n’ụzọ mbụ ha dị; ọdịdị ndị bụ naanị ihe na-egosi bụ nke combo-filter, a naghị ewepụ ha.
   Mafee ma ọ nweghị nke a hụrụ.
3. Dozie nhazi runtime site na `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): igodo ntọala `modalityBridge*` ọhụrụ na-enwe mmeri; igodo `visionBridge*` ochie ka bụ **ndabere otu-cycle** (oge rollback). Mafee tupu njem media ọ bụla ma bridge ahụ agbanyụọla.
4. Onye họrọ mode (`modalityBridgeVisionMode`, lee tebụl dị n’okpuru) na-ekpebi reroute ma ọ bụ describe. Reroute na-alọghachi na `modifiedPayload` nke gbanwere naanị `model`, tinyekwara meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Ụzọ Describe: kpachie onyonyo ruo `maxImages`, chịkọta prompt dabara n’ọrụ ahụ, lelee describe cache, kpọọ ụdị vision ahụ **n’otu oge**
   (`Promise.allSettled`), ma tinye akụkụ ederede `[Image N]: <description>` n’ebe ha nọ. Describe dara ada na-eweta `null`: a na-echekwa onyonyo mbụ maka targets a na-amaghị/ndị nwere ike vision (#4012), mana **target kpọmkwem nke a kwadoro na ọ bụ ederede naanị** ma ọ bụ combo na-enweghị vision na-enweta stub ederede doro anya
   `(unavailable — no vision-capable provider connected)` maka onyonyo ọ bụla a na-akọwaghị, gụnyere ọdịda akụkụ ụfọdụ na onyonyo ndị karịrị oke oku describe (#17069). Fallback describe combo nke ọdịda ha niile dị adị ka na-aga n’ihu (#8430).
6. Weghachite `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Onye họrọ mode (`modalityBridgeVisionMode`)

| Mode       | Ndabara | Omume                                                                                                                                                                                                                                                                             |
| ---------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | Heuristic ochie, agbanwebeghị (#6640/#7204): ụdị na-abụghị combo/`auto/` na-ebugharị gaa n’ụdị vision kacha mma belụsọ ma ụdị mbụ ahụ nwere nzere ndị nwere ike iji (n’ọnọdụ ahụ ọ na-eme describe); targets combo na-eme describe mgbe niile.                                    |
| `describe` |         | Na-eme describe mgbe niile — a na-amapụ ngọngọ reroute kpamkpam; ụdị onye ọrụ họọrọ bụ ya na-aza mgbe niile.                                                                                                                                                                      |
| `reroute`  |         | Na-amanye reroute: a na-agafe nchedo keep-credentialed-model. Nchedo nzere nke **target** reroute ka na-arụ ọrụ — mgbe target vision nwere ike iji adịghị, bridge na-egbochi ya site na njehie doro anya kama ịme describe ma ọ bụ iziga onyonyo mbụ gaa na target ederede naanị. |

Ụdị ndị a manyere na-agafe ozugbo **tupu** heuristic auto amalite; omume `auto` bụ otu byte-for-byte na ihe mgbochi tupu PR-1.

#### Oke API key (`visionBridgeKeyScope.ts`)

Mgbe igodo API onye na-akpọ machibidoro `allowedConnections`, ọdọ mmiri oke ojiji
(`allowedQuotas`) ma ọ bụ ụdị ( `allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), bridge ahụ na-ahọrọ naanị
ụdị reroute na describe nke igodo ahụ nwere ike iji, na njikọ ndị igodo ahụ nwere ike
iji. Kpọọ describe na-agafe mgbe niile na self-loop OmniRoute site na isiokwu
`x-omniroute-self-loop-key-id`, ya mere arịrịọ chat na-anata na-amanye iwu njikọ na
ụdị nke igodo ahụ ọzọ. `enforceApiKeyPolicy()` na-asọpụrụ isiokwu ahụ naanị mgbe ya na
self-loop bearer nọkọrọ, ya mere ọ nwere ike ibelata ohere naanị, a na-ajụkwa id nke
na-adịghị edozi.

Ọ bụrụ na ekweghị ka igodo ahụ jiri ụdị vision ọ bụla, **target ederede naanị a
kwadoro** na-ajụ arịrịọ ihe oyiyi n'ime mpaghara site na HTTP 400 doro anya kama
iziga bytes ihe oyiyi ahụ na upstream na-enweghị ike (#17069). Maka targets nwere
ikike vision a na-amaghị ma ọ bụ nke native, ụzọ describe na-ejigide omume
fail-open ya gara aga (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Arịrịọ na-enweghị igodo, na igodo na-enweghị mmachi ndị a, na-eme kpọmkwem dịka
ọ dị na mbụ.

#### Mkpali describe maara ọrụ (`modalityBridgeVisionTaskAware`)

Nke ndabara bụ **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) na-agbakwunye
ederede nke **ozi onye ọrụ ikpeazụ** (e belatara ya ruo mkpụrụedemede 500) na mkpali
describe bụ isi, na-eduzi nkọwa ahụ n'ihe onye ọrụ jụrụ n'ezie
(pattern codex-vision-proxy) ma na-arịọ ụdị vision ka o depụta ederede a na-ahụ anya.
Mgbe agbanyụrụ flag ahụ — ma ọ bụ mgbe ederede onye ọrụ adịghị — a na-eji mkpali bụ
isi emeghị mgbanwe.

Arịrịọ OpenAI-compatible nke self-loop describe n'onwe ya
(`callVisionModelSingle()` na `visionBridgeHelpers.ts`) na-arịọ mgbe niile
`image_url.detail: "high"` — n'enweghị ọnọdụ, maka onye na-akpọ/provider ọ bụla, na-enweghị
ịdabere na mgbaama client ọ bụla. Nlele low-detail na-ebelata izi ezi OCR kpọmkwem
maka ọrụ idegharị ederede nke mkpali a na-arịọ, ya mere call describe n'onwe ya na-arịọ
high detail mgbe niile n'agbanyeghị ọkwa detail nke arịrịọ inbound mbụ jiri. Nke a na-emetụta
naanị request body describe nke ime; ọ naghị agbanwe otú OmniRoute si ebufe
`image_url.detail` nke onye na-akpọ n'onwe ya na arịrịọ bụ isi — a na-etinye ndabara ahụ
iche iche, naanị maka clients OpenCode achọpụtara, na
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Alaka
Anthropic wire-format nke self-loop describe enweghị mpaghara `detail`, ndabara ọ bụla
adịghịkwa emetụta ya.

#### Oke nsonaazụ describe (`modalityBridgeVisionMaxChars`)

| Igodo                          | Ndabara | Oke                   |
| ------------------------------ | ------- | --------------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` ma ọ bụ 100–50000 |

`0` (ndabara) pụtara **enweghị oke** — a na-ebufe nkọwa nke
`callVisionModel()` weghachiri n'enweghị mgbanwe, na-echekwa omume dị adị. Uru ọ bụla
dị n'oke 100–50000 na-ebipụ nkọwa ahụ site na suffix `…` tupu etinyeghachi ya dịka
`[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` na `src/lib/guardrails/visionBridge.ts`).
Bulie nke a maka ọrụ OCR chọrọ nkọwa zuru ezu ebe ụdị downstream chọrọ transcript
zuru ezu; belata ya iji kpachie ojiji token na ụdị vision na-ekwu ọtụtụ okwu.
Mpaghara dashboard dị na Advanced panel nke Vision tab
(`modality-bridge-max-chars` na `ModalityBridgeVisionTab.tsx`) ma na-ebuli uru ọ bụla
dị n'etiti 1 na 99 ruo n'ala 100, ebe ọ na-ahapụ `0` e nyere n'ụzọ doro anya ka ọ
dịgide — `0` bụ uru Zod ziri ezi n'onwe ya
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ọ bụghị naanị
ndabara “edobebeghị”.

#### Cache describe (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL dị na ebe nchekwa maka nsonaazụ describe, nke usoro niile na-ekerịta.
Igodo = `sha256(imageRef + composedPrompt + configuredBridgeModel)` nwere framing
length-prefix (enweghị nkukota oke ubi). Akụkụ model bụ ụdị bridge **ahaziri**, ọ bụghị ụdị
zara n'ezie — `callVisionModel` nwere ike ịda n'ime fallback, ịkpakọ igodo site na
mgbalị ọ bụla ga-ekewasị cache. A naghị echekwa describes dara ada. Ntọala:

| Igodo                           | Ndabara | Oke     |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Nhazi onyonyo dịpụrụ adịpụ (self-loop describe/base64 fetch)

Mgbe bridge ahụ na-ebudata onyonyo **dịpụrụ adịpụ** n'onwe ya — self-call Anthropic
describe na ntụgharị base64 claude-wire-format
(`ensureBase64ImagesForClaudeWire`), ha abụọ site na
`fetchRemoteImageAsDataUri()` na `visionBridgeHelpers.ts` — a na-ebufe data URI
nke dapụtara na `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) tupu etinye ya n'arịrịọ ụdị vision. A na-ebelata
onyonyo buru oke ibu ruo **2048px n'akụkụ kachasị ogologo** (na-adaba na resize cap
OpenAI/Anthropic na-etinye n'akụkụ server), nke na-ebelata bytes/latency nke upload
na-enweghị ịgbanwe ihe ụdị vision na-ahụ. Resize na-eji `sharp`, nke a na-ebudata site
na dynamic import: n'elu platform ebe binary native ya na-ada ịbudata,
`normalizeDataUri()` **anaghị atụfu njehie ma ọlị** — ọ na-alaghachi na passthrough nke
bytes mbụ, ya mere ụzọ describe/base64-conversion na-aga n'ihu na-arụ ọrụ mgbe niile.
A na-ahapụkwa bytes na-abụghị onyonyo (fetch na-alọtaghị onyonyo enwere ike decode)
ka ha gafee n'enweghị mgbanwe. Nhazi a metụtara naanị onyonyo bridge na-ebudata maka
self-call nke ya — a naghị etinye ya na payload raw passthrough nke onye na-akpọ,
nke kwekọrọ n'ụkpụrụ mgbanwe opt-in-only (Hard Rule #20).

#### Schema ntọala + mbugharị

A na-enyocha igodo `modalityBridge*` ọhụrụ site na Zod n’ime `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, atọ ndị dị na `modalityBridgeCache*`, na
otu `modalityBridgeAudio*` nke Audio Bridge na-eji. Migration
`141_modality_bridge_settings.sql` na-ebufe ụkpụrụ `visionBridge*` ochie dị
n’ime sistemụ gaa na igodo ọhụrụ kwekọrọ na ha (ọ na-arụ ọrụ ugboro ugboro n’enweghị
mmetụta, ọ dịghịkwa mgbe ọ na-edegharị ụkpụrụ `modalityBridge*` nke onye ọrụ
tọọla); a ka na-anabata igodo ochie dị ka ndabere ọgụgụ maka otu okirikiri
ntọhapụ.

#### Isi nghọta + ọnụ ọgụgụ

Azịza ndị a kọwara ma gbanwee na-ebu
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(`buildModalityBridgeHeader()` na-ewu ya na `modalityBridge/bridgeStats.ts`,
`withModalityBridgeHeader()` na-etinye ya na `src/sse/handlers/chatHelpers.ts`).
Arịrịọ ndị ebugharịrị anaghị enweta header — agbanwebeghị payload ahụ, mgbanwe
model ahụkwa apụtalarị n’ubi `model` nke ahụ azịza.

`GET /api/modality-bridge/stats` (nkwenye njikwa, otu ọkwa ikike ahụ na
`GET /api/settings`) na-eweghachite counter ndị dị n’ebe nchekwa maka modality
ọ bụla `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` maka `vision`, `audio`, na
`video`. `averageLatencyMs` na-eji `latencySamples`, ọ bụghị attempts niile, dị
ka denominator ya; ọrụ na-enweghị oge e tụrụ anaghị emepụta sample efu nke
millisecond. `bridged` ka bụ aha ndakọrịta azụ maka mgbanwe ndị gara nke ọma;
attempt ndị dara ada anaghị abawanye ya.
A na-emegharị counter ndị a mgbe usoro malitegharịrị dịka e si chepụta ya
(telemetry, ọ bụghị ndekọ ego).

#### Nhazi dashboard

Ibe dashboard raara onwe ya nye bụ
`/dashboard/settings/modality-bridge`. Taabụ `Vision`, `Audio`, na `Video` ndị
URL na-egosi na ha na-echekwa query parameters mgbe ha na-agbanwe uru `tab`.
Taabụ Vision na-egosi ịgbanye/ịkwụsị ọrụ, ọnọdụ, nhọrọ model (gụnyere
ndabara akpaka), prompting maara ọrụ, oke timeout/image/ogologo nkọwa/cache
dị elu, counter oge ịgba ọsọ, na arịrịọ sample e chebere. Taabụ Audio dịkwa
ọrụ ugbu a: ọ na-egosi ịgbanye/ịkwụsị ọrụ, onye họrọ model STT naanị nke nwere
Auto, oke timeout/max-clip, counter audio, na ule sample `input_audio`. Taabụ
Video na-arụ ọrụ: ọ na-akọwa ọnọdụ oge ịgba ọsọ FFmpeg/ffprobe — otu n’ime
ọnọdụ UI anọ doro anya (`unknown` mgbe probe ka na-aga ma ọ bụ enweghị ike
imecha, `restricted` n’ebe dashboard host na-abụghị loopback nke a na-awụpụ
probe n’akụkụ client, `unavailable` ozugbo a nyochachara ma kwado na ọ dịghị,
ma ọ bụ `available` ya na nsụgharị FFmpeg/ffprobe) — na-echekwa oke
enable/model/frame/video/timeout, na-eme ka onye họrọ model gosipụta naanị
model ndị nwere ikike vision, ma na-egosikwa counter video.

Kaadị Vision Bridge mbụ dị n’okpuru ntọala AI bụ njikọ ndakọrịta gaa na ibe
ọhụrụ; ọ bụghịzi onye nwe ụdị form nke abụọ. Media Providers na-ejikwa
workflows Image-to-Text na Speech-to-Text na taabụ Modality Bridge kwekọrọ na
ha, n’enweghị iwepụ playground Speech-to-Text dị adị.

**Mwepụ admission maka self-loop:** mgbe describe call na-agafe na self-loop
`/v1` nke OmniRoute n’onwe ya (model provider na-abụghị ọkọlọtọ), sub-request
na-eziga `x-omniroute-admission-bypass: internal`, a na-ejikwa credential
self-loop ahụ a chọpụtara akwadọba ya — sentinel `sk_omniroute` mpaghara n’ọnọdụ
local, ma ọ bụ igodo env `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` nke onye ọrụ
haziri (#1350), ka deployments nwere `REQUIRE_API_KEY=true` wee nwee ike ịrụ
describe call. A na-asọpụrụ bypass naanị maka credential ndị ahụ kpọmkwem, ya
mere clients mpụga enweghị ike iji header ahụ gafere admission.

Ndabara ochie dị na `src/shared/constants/visionBridgeDefaults.ts`; ndabara
mode/task-aware/cache ọhụrụ na resolver ntọala dị na
`src/shared/constants/modalityBridgeDefaults.ts`. Guardrail na-enye nhọrọ
constructor `deps` ka ule nwee ike itinye mmejuputa `getSettings` na
`callVisionModel` adịgboroja.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Ọ na-ejide arịrịọ nkata nwere audio tupu ha erute target a na-amaghị ma ọ
na-anabata input audio. Ọ naghị ebugharị arịrịọ nkata ahụ ọzọ: a na-edegharị
akụkụ audio site na multipart endpoint kwekọrọ na OpenAI dị adị, model nkata
ahọpụtara na-aga n’ihu na transcript ederede.

Usoro:

1. Kpebie `supportsAudio` site na `getResolvedModelCapabilities()`. Metadata sitere na ndekọ ndị na-eweta ọrụ nke akọwapụtara nke ọma na-emeri, soro ya metadata static nke model, ma mesịa `modalities_input` nke emekọrịtara. Ndepụta ntinye e kwupụtara nke na-enweghị `audio` bụ `false`; ọ bụrụ na enweghị ihe akaebe gbasara ikike, ọ na-adị `null`. Ma `false` ma `null` na-eme ka bridge nchekwa rụọ ọrụ, ebe `true` na-agafe ya.
2. Kpebie ntọala `modalityBridgeAudio*` ma wepụta akụkụ audio dị n’ogo elu nke a pụrụ itinye n’ọnọdụ site na ozi ọ bụla site na detector `detectMediaParts()` nke a na-ekerịta. Ụdị wire a na-akwado bụ OpenAI `input_audio`, `audio_url`, na `source.media_type: "audio/*"`. A na-achọpụta audio dị n’ime maka nhazi ụzọ, mana ụzọ splice anaghị ewepụ ya. Ọrụ a nwere oke nke `modalityBridgeAudioMaxClips`; akụkụ ndị na-esote na-adị otu ha dị.
3. Sọpụrụ `provider/model` e haziri, ma ọ bụ kwe ka `selectAudioBridgeModel()` gafee `AUDIO_TRANSCRIPTION_PROVIDERS` n’usoro katalọgụ kwụsie ike ma họrọ model mbụ nwere nzere onye na-eweta ọrụ nọ n’ọrụ nke a pụrụ iji.
4. `callAudioTranscription()` na-agbanwe audio base64/data-URI ka ọ bụrụ `file` multipart, ma ọ bụ budata `audio_url` dịpụrụ adịpụ site na nche outbound nke naanị public URL kwere, yana DNS pinning na oke 25 MB. Mgbe ahụ ọ na-eme POST nke file na model ahọpụtara gaa na self-loop `/v1/audio/transcriptions` dị n’obodo, nke `resolveSelfLoopBearer()` na-akwado. Route transcription dị ugbu a na-arụ nyocha nzere nkịtị, njikwa cooldown/rate-limit, na iziga arịrịọ n’aka onye na-eweta ọrụ.
5. Oku gara nke ọma na-eji `[Audio N]: <transcript>` dochie akụkụ ha. Oku na-agba site na `Promise.allSettled`: ọdịda nke otu oku na-echekwa akụkụ audio mbụ ahụ (#4012 contract). Ọ bụrụ na oku niile ada ma e gosipụta na target bụ `supportsAudio === false`, akụkụ ndị ahụ na-aghọ
   `[Audio N]: (unavailable — no STT provider connected)` (#8430 contract). Maka target a na-amaghị (`null`), nsonaazụ ọdịda niile na-anọgide otu ha dị. Target a gosipụtara na ọ bụ naanị text, nke na-enweghị nzere STT a pụrụ iji, na-enweta stub doro anya ahụ n’enweghị ịkpọ netwọk.

Transcript ndị gara nke ọma na-eji cache LRU/TTL nke Modality Bridge zuru usoro niile. Igodo ahụ na-ejikọta ntụaka audio, akara ọrụ kwụsie ike `audio-transcription`, na model STT ahọpụtara; a naghị echekwa ọdịda. Mgbalị audio na-emelite counters `bridged`, `cacheHits`, `failures`, na `lastUsedAt` ndị a na-ekerịta. Nzaghachi a gbanwere na-ebu
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; arịrịọ a na-emetụghị aka anaghị enweta akụkụ Audio Bridge.

Ntọala runtime sitere na DB ma Zod na-enyocha ha:

| Igodo                         | Ndabara | Oke                 |
| ----------------------------- | ------- | ------------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                   |
| `modalityBridgeAudioModel`    | `""`    | Auto ma ọ bụ STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000         |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10                |

Cache a na-ekerịta ka na-anọgide n’okpuru njikwa
`modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, na `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Ọ na-ejide akụkụ video dị n’ogo elu n’ime `messages` nke Chat Completions na `input` nke Responses API tupu akpọọ target na-enweghị nkwado video native a maara. Ụdị ndị a na-akwado bụ `input_video`, `video_url`, `video_source`, URL HTTPS, na data URI `data:video/*;base64,...`. A naghị ele aha faịlụ nkịtị dị na text anya dị ka video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) bụ onye nwe njem n’ime arịrịọ, nlele ikike/policy, nchịkọta nke arịrịọ ọ bụla, na payload nzaghachi. Ọrụ maka video ọ bụla — inweta ya, cache nke nsonaazụ niile, ịkọwa usoro frame (nke na-ejikọta transcript audio ọ bụla onye kpọrọ ọrụ kwupụtara), na metrics/abort/cleanup nke mbọ ọ bụla — zoro n’azụ `processVideoPart` dị na `videoBridgePipeline.ts`, nke a na-akpọ otu ugboro maka akụkụ video ọ bụla n’ime loop `preCall`. Module ahụ na-akọwakwa oke ọdụ ụgbọ mmiri ndị doro anya `VideoMediaBrokerPort` (inweta bytes na iwepụta frame ndị a họpụtara), `VideoAudioTranscriptionPort` (ijikọta transcript audio onye kpọrọ ọrụ kwupụtara na captions ndị e nwetara site na frame ndị a họpụtara), na `VideoDrilldownPort` (oke persistence maka frame drill-down; ejikọbeghị ya na `processVideoPart` — naanị route dị iche `/api/modality-bridge/video/drilldown` na-ede entries drill-down ugbu a).

Ụzọ arịrịọ public `/v1` anaghị ebubata ma ọ bụ kpọọ subprocess. A na-ebudata video dịpụrụ adịpụ n’okpuru oke 50 MiB; video inline base64 nwere oke nchekwa nke 36 MiB a dekọdụrụ maka video ọ bụla ka envelope model/messages/framing nwee ike ịnọ n’ime oke nnabata arịrịọ JSON public nke 50 MiB. A na-enyocha atụmatụ ogologo inline na nha a tụrụ anya mgbe dekọdụrụ tupu ekenye ebe nchekwa. A chọrọ HTTPS na URL dịpụrụ adịpụ mbụ na redirect ọ bụla, site na nche outbound dị ugbu a nke naanị public URL kwere yana DNS pinning. Mgbe ahụ bytes ahụ gafere oke broker internal kpọmkwem `POST /api/modality-bridge/video/extract`. Route ahụ bụ `LOCAL_ONLY` na `SPAWN_CAPABLE` abụọ, na-anabata naanị arịrịọ loopback a tụkwasịrị obi nke onye ọ bụla n’ime process kwadoro, ọ naghị anabata URL, ụzọ filesystem, executable, ma ọ bụ ndepụta arụmụka. Pipeline nha ahụ nke API na onye na-agụ body incremental nke handler na-etinye oke ntinye broker nke 50 MiB n’onwe ha. Queue ya nwere oke na-arụ otu extraction n’otu oge, na-ekwe ka jobs anọ chere, ma na-etinye oke 100 MiB n’input ndị na-eche.

N’ime broker, `ffprobe` na-agụ faịlụ mpaghara nzuzo; allowlist usoro a doziri anaghị etinye usoro playlist na manifest. Maka container ezinụlọ MOV ndị a kwadoro, ntụaka data MOV dị na mpụga ka na-enwe nkwarụ na ndabara, command a doziri anaghịkwa ahọrọ ha. Ma `ffprobe` ma `ffmpeg` na-eji whitelist protocol nke naanị `file` nwere, thread otu, arrays arụmụka a doziri, enweghị shell, yana executable ndị a na-achọpụta site na `PATH`. Stream cover attached-picture abụghị ndị ga-egwu egwu. Stream niile a ga-egwu ga-agbasorịrị oke ndị a, a na-ahọrọ stream ndabara akọwapụtara nke ọma tupu fallback deterministic nke index kacha nta. A na-amachi vidio ruo sekọnd 600, pikselụ 8,192 n’otu akụkụ, na pikselụ isi mmalite 33,554,432. FFmpeg na-sample JPEG frames 1–16 dị n’etiti, na-ebelata akụkụ ogologo ruo kacha 1,024 pikselụ n’enweghị ịkwalite inputs ndị pere mpe, ọ dịghịkwa mgbe ọ na-enweta URL. Sampling bụ `uniform` na ndabara. Atụmatụ nhọrọ `scene_aware` na nke nnwale `segment_aware` na-eme otu pass FFmpeg ọzọ a doziri n’elu stream mpaghara a kwadorolarị, họrọ timestamp scene `showinfo` ndị nwere oke, ma laghachi n’ụzọ deterministic na midpoint `uniform` ndị ahụ mgbe detector dara, oge gafere, output mebiri emebi, ma ọ bụ candidate set tọgbọ chakoo. Ọnọdụ segment-aware na-ekesa samples midpoint dabere n’oke nke scene intervals ndị a kwadoro; a kọwara ihe akaebe segment-aware na omume fallback n’okpuru. A na-etinye oke siri ike nke frames 16 mgbe nhọrọ gasịrị na policy niile. Mgbe arịrịọ scene-aware nwere naanị mmefu frame otu, ọ na-eji midpoint `uniform` nke full-video ma ọ bụ focus window na-arụ ọrụ ma kọọ `policyEffective: uniform`: otu scene frame a họọrọ enweghị ike ichekwa nsọtụ oge abụọ ahụ. Onye na-akpọ nwere ike inye focus window nwere oke (`start`/`end` sekọnd); a na-amachi oke ndị ahụ n’ogologo media, a na-ajụ window ndị tụgharịrị ma ọ bụ ndị na-abụghị finite, a na-emekwa sampling policy niile naanị n’ime interval ahaziri. A na-etinye window pụta na sampling metadata nakwa na prefix nkọwa a na-atụkwasịghị obi ka ụdị ndị na-arụ ọrụ n’azụ nwee ike ịmata excerpt a lekwasịrị anya na timeline zuru ezu.

Semantic caption focus bụ ntọala dị iche ma doo anya. Ọnọdụ nyocha `full` nke ndabara na-echekwa frame prompt dị adị ma ọ dịghị mgbe ọ na-eziga request text na caption model. N’ọnọdụ `focused`, bridge na-agụ naanị `text`/`input_text` kacha ọhụrụ nke onye ọrụ dere ma na-adịghị空 n’ime otu Chat ma ọ bụ Responses container ahụ, na-eme ka ọ bụrụ NFC, na-akpakọba control characters na whitespace, ma na-amachi ya ruo Unicode code points 500. Nsonaazụ tọgbọ chakoo na-alaghachi na prompt `full` kpọmkwem. A na-serialize hint bara uru dị ka JSON n’ime block `untrusted-user-context` pụrụ iche, ọ pụkwara naanị ibute nkọwa a pụrụ ịhụ ụzọ; ọ nweghị ike ịkagbu ịdọ aka ná ntị dị iche nke machibidoro ịgbaso ntụziaka ndị a na-ahụ ma ọ bụ na-anụ na media. Textual focus anaghị atụpụta `start`/`end` ma ọ bụ gbanwee temporal sampler.

#### FU-07 ihe akaebe segment nhazi

`segment_aware` na-eji otu bounded pre-analysis pass n’elu stream vidio mpaghara a kwadorolarị. Filter chain a doziri na-ebu ụzọ belata obosara ruo kacha 320 pikselụ, chọpụta mgbanwe scene na oge ndị vidio jụrụ oyi, mesịa sample na frame 1 kwa sekọnd maka blur, average luma, na ozi spatial/temporal. Pass ahụ nwere oke samples structural 600, otu FFmpeg/filter thread, otu protocol `file`-only na container allowlists ahụ, oke process-output 1 MiB, na kacha sekọnd 30 n’ime shared abort/deadline nke broker. Ọ dịghị mgbe ọ na-anabata command, filter, path, ma ọ bụ URL site na request.

Ụkpụrụ structural ndị a bụ ihe akaebe sampling deterministic, ọ bụghị nghọta semantic nke vidio. Ha anaghị atụpụta subjects, actions, captions, speech, ma ọ bụ ebumnuche onye ọrụ. Scene na freeze boundaries na-emepụta segments; freeze coverage, blur, exposure, spatial detail, na temporal change na-emetụta naanị otu esi ekesa mmefu frame 1–16 dị adị. A na-amachi segment jụrụ oyi kpamkpam ruo frame otu, ebe segments na-adịghị jụrụ oyi na-asọ mpi maka mmefu fọdụrụ. Mgbe boundaries karịrị frames, a na-echekwa uniform timeline coverage ka cuts ndị na-eme ngwa ngwa n’isi ghara izobe segment ogologo dị n’azụ. A na-ejikọta scene boundaries dị n’ime mkpebi nyocha nke sekọnd 1 nke freeze boundary.

Filter ndị na-efu, evidence mebiri emebi ma ọ bụ tọgbọ chakoo, njehie detector, ma ọ bụ timeout pre-analysis nwere oke na-eme ka usoro ahụ daa n’ụzọ kwere nkwa gaa na policy midpoint `uniform` kpọmkwem. Abort onye na-akpọ ma ọ bụ deadline broker anaghị ada n’ụzọ a: ọ na-akwụsị subprocess nọ n’ọrụ, gbochie iwepụta frame ndị ọzọ, ma wepụ private temporary tree n’ime `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` na-emepụta fixtures FFmpeg n’ezie ma deterministic maka nchekwa caption-call mgbe dedup gasịrị, nkesa mmefu maka dense motion, evidence blur/exposure/SI-TI, cuts ngwa ngwa nwere tail ogologo, na false positives nke gradual-fade. Ọ na-edekọ wall time nke pre-analysis na, mgbe `/usr/bin/time` dị, child CPU na peak RSS. Quality checks ya bụ structural oracles naanị. Àgwà caption-model n’ezie ka bụ `HOLD` n’ihi na harness a enweghị endpoint enyere ikike ma ọ bụ judge frozen. Nchekwa ego na-anọkwa `HOLD` ma ọ bụrụ na `--caption-cost-per-call-usd` enyeghị atụmatụ ọnụahịa oku ọ bụla doro anya nke dị mma; script ahụ anaghị emepụta nsonaazụ ọ bụla n’ụgha.

Fremụ ọ bụla nwere oke 4 MiB, fremụ raw niile ọnụ nwere oke 23 MiB, azịza broker a serialize-rịrị nwekwara oke 32 MiB. A na-ewepụ ndekọ nwa oge nkeonwe na `finally`. OmniRoute anaghị etinye FFmpeg n’ime ngwugwu ya, ọ naghị anabatakwa ụzọ executable omenala. Tupu ịmepụta nkọwa, bridge na-eme usoro iwepụ oyiri onyonyo nke na-akpachapụ anya: a na-ebelata JPEG ọ bụla ka ọ bụrụ buffer grayscale 16×16, a na-atụlekwa ya naanị na fremụ ikpeazụ echekwara. Ọ bụrụ na mmefu ego nkọwa a rịọrọ karịrị otu fremụ, extraction na-enye ọdọ mmiri kandidet nwere oke ruru mmefu ego ahụ okpukpu abụọ, ma ọ dịghị agafe fremụ 16. A na-etinye oke a rịọrọ naanị mgbe e wepụsịrị oyiri, ebe a na-echekwa kandidet mbụ na nke ikpeazụ ahọpụtara n’oge ibelata ikpeazụ mgbe mmefu ego ahụ dịkarịa ala abụọ. Atụmatụ nwere ụdị
`grayscale-16x16-mean-cells-v2` na-eji nnukwu uru n’etiti mgbanwe luma nke nkezi na oke sel thumbnail ndị mgbanwe ha haziri ahazi ruru opekata mpe 0.05. Ọnụ ụzọ oyiri bụ constant 0.04, nke a họọrọ maka amụma dị mfe kama imeghe ya dịka ntọala runtime. Ihe mgbaàmà nke abụọ a nwere nnukwu ọdịiche na-echekwa obere mmegharị na mgbanwe ederede a na-ahụ anya nke ntụnyere dabere naanị na nkezi nwere ike izochi. Njehie comparator ma ọ bụ decoder anaghị emechi usoro ahụ, kama ọ na-ahapụ ọdịnaya ka ọ gaa n’ihu ma na-echekwa coverage. Metadata mmepụta na-ekewa kandidet ewepụtara, fremụ ejiri nke ọma, na oyiri onyonyo ewepụrụ.

Akụkụ vidiyo e mere akara n’ụzọ doro anya nwere ike ịrịọ contact sheet nwere timestamp. Bridge na-emepụta grid JPEG nwere kọlụm kacha 4 na fremụ kacha 16. Sel 512-pixel ọ bụla na-etinye timestamp isi iyi ya n’ime eriri ala nwere nnukwu ọdịiche, ebe timestamp ndị ahụ ka na-adịkwa na metadata ederede maka njikọ na nyocha nke usoro ndị ọzọ. JPEG zuru ezu ka nwere oke 32 MiB. Ọ bụrụ na `sharp` enweghị ike ịkọwa ma ọ bụ chịkọta grid ahụ, bridge na-alaghachi na fremụ JPEG nke ọ bụla; nkwụsị nke client ka na-agafe n’ọrụ sheet ahụ.

Ihe akaebe maka ịkwalite dị iche kpamkpam na microbenchmark nke synthetic composition. `scripts/perf/video-bridge-contact-sheet-eval.ts` na-akọwapụta A/B harness nwere ụdị schema maka ụdị vision OpenAI-compatible ndị dị adị. Ọ na-atụ tokens ndị provider kọrọ, oge latency wall site na mmalite ruo ọgwụgwụ (gụnyere nhazi sheet), ọnụọgụ oku model, na idebe fact ndị manifest kọwara. A naghị ede azịza raw nke model n’ime report; naanị digest SHA-256 na ID fact ndị dabara ka a na-echekwa. Harness ahụ anaghị eme oku netwọk ma ọ bụ oku model akwụ ụgwọ ọ bụla ma ọ bụrụ na e nyefeeghị `--execute-real`, ma hazieghị `--model`, `OMNIROUTE_BASE_URL`, na `OMNIROUTE_API_KEY`. Enweghị run real ahụ doro anya, verdict ya nwere ike ịgụ site na igwe ka na-abụ `HOLD`; nha synthetic nke payload/ọnụọgụ oku naanị abụghị ihe akaebe maka ịkwalite.

Ndị na-akpọ nwere ike itinye array `transcript.cues` nhọrọ n’akụkụ vidiyo a kwadoro mgbe ha nwere ederede kwekọrọ n’oge. Cue ọ bụla ga-eburu `text`, interval `start`/`end` nwere oke ma dị n’ime duration a nyochara, yana `source` dị na ndepụta a kwadoro (`client`, `embedded`, ma ọ bụ `audio-bridge`); `confidence` na-adị na `1` na ndabara, ọ ga-anọkwa n’etiti `0` na `1`. A na-achịkọta cue ndị bụ oyiri zuru oke ọnụ. OmniRoute anaghị amalite transcription site na metadata a: a na-ebufe cue ndị a kwadoro n’ime nsonaazụ a kọwara, tinyere source, confidence, na interval, a na-egosikwa ha dịka nlele a na-atụkwasịghị obi n’akụkụ nkọwa fremụ. A na-ajụ ederede na-adịghị mma, nke gafere oke, ma ọ bụ nke na-enweghị provenance kama ịgwakọta ya n’ime iyi nkọwa. Ọwa transcript abụọ dị na request body na-ahazi provenance niile e nyere ka ọ bụrụ `client`, gụnyere labels `embedded` ma ọ bụ `audio-bridge` onye zitere n’onwe ya kwuru. Naanị adapter server nwe ya nwere ike inye labels ndị a tụkwasịrị obi site na argument `trustedSource` nke bụ naanị maka code; ubi JSON nke request enweghị ike iru argument ahụ. Ederede transcript ka bụ ọdịnaya sitere na media nke a na-atụkwasịghị obi, n’agbanyeghị provenance ya, ọ gaghịkwa ekpebi ikike ịnweta.

Caller dị elu nwere ike inye track `audioTranscript` maka otu vidiyo ahụ; a na-ewere ya dịka ederede client nyere, ọ bụghị ihe akaebe na server mere transcription. Ebe njikọ fusion na-arụ nlele visual na audio n’okpuru otu deadline na abort signal, hazie ha n’usoro timeline nkịtị, chịkọta oyiri zuru oke, ma kọọ nsonaazụ akụkụ mgbe naanị otu akụkụ gara nke ọma. `audioTranscript` na-adịghị mma na-eme ka ọ daa ruo na nsonaazụ akụkụ ahụ — a na-echekwa nkọwa visual, alaka audio na-edekọ koodu ọdịda a sachara — kama ime ka vidiyo niile daa. A na-echekwa availability nke alaka ọ bụla, ọkọlọtọ partial, na koodu ọdịda a sachara n’ime nsonaazụ a kọwara, na metadata guardrail (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), na metadata result-cache, nakwa na counters fusion nke bridge. Ụzọ Video Bridge ndabara anaghị akpọ speech-to-text ma ọ bụ budata oyiri media nke abụọ; na-enweghị track ahụ doro anya, ọ na-anọgide bụrụ naanị vidiyo.

**Nchekwa transcript (#12150 P1).** Nke a na-arụ ọrụ na-akpaghị aka mgbe ọ bụla
Video Bridge (nke chọrọ nkwenye onye ọrụ n'onwe ya) gosipụtara cue transcript — ọ
dịghị flag nchekwa ọzọ dị iche. Mgbe arịrịọ gosipụtara cue transcript ọ bụla (ma ọ
bụ `transcript` nke onye kpọrọ arịrịọ kwupụtara ma ọ bụ `audioTranscript` jikọtara),
guardrail na-akara ya `videoBridgeObserved` ma mepụta onyinyo e kpuchiri nke
nkọwa vidiyo — rendering yiri nke mbụ ebe a na-eji `[redacted-video-transcript]`
dochie free-text body nke cue ọ bụla, site n'ịgbanwe structured cue field tupu
achịkọta string ahụ (ọ bụghị site n'ịgụgharị flattened text, ka ọdịnaya cue ọ bụla
— nke na-emegide iwu ma ọ bụ nke nkịtị, gụnyere body nwere `]` dịka
`[inaudible]`/`[music]` — ghara ịlanarị). Body arịrịọ call-log a na-echekwa na ya
na-eji onyinyo ahụ kpuchiri dochie akụkụ ederede ọ bụla sitere na vidiyo, dabere
na nhata ọdịnaya; a na-agụgharị anchor `fullText` site na payload guardrail
emechara tupu oku, ya mere match ahụ ka na-aga nke ọma mgbe chain guardrails ndị
na-esote (PII na credential maskers, priorities 10/95) gbanwere ederede nkọwa
n'ebe ahụ na mgbe system-prompt/handoff/memory injection hazigharịrị message
array. Body a na-eziga n'elu gaa na model anaghị agbanwe. Arịrịọ a hụrụ anaghị
etinye Memory na-adịgide adịgide (a na-amapụ extraction sitere ma arịrịọ ma
nzaghachi), ya mere azịza model n'onwe ya enweghị ike ịtinye ederede transcript
n'ime Memory.

**Raw video fields (#12430).** Mgbe bridge enabled na nkwado vidiyo native
amaghị ma ọ bụ adịghị, fields `transcript`/`audioTranscript` ndị akọwapụtara na
-arụkwa ọrụ `videoBridgeObserved`, ọbụlagodi mgbe nkọwa dara ma ọ bụ mgbe
`maxVideos` ruru oke. `null` na empty strings na-agụta; fields na-adịghị adị na
metadata na-abụghị nke vidiyo anaghị agụta. Copies a na-echekwa na-ewepụ ihe
ndị a n'anya ma ọ bụ hapụ arịrịọ ahụ, a na-agafekwa caches/Memory.

N'okporo ụzọ fallback ndị ahụ, cues ziri ezi nke onye kpọrọ arịrịọ na-aghọ akụkụ
`text`/`input_text` ndị a kwadoro kama ịbụ provider fields na-abụghị ọkọlọtọ.
Tracks abụọ sitere n'arịrịọ ka na-abụ observations `client` ndị a na-atụkwasịghị
obi, tinyere ịdọ aka ná ntị doro anya na a kọwaghị vidiyo ahụ nakwa na a
enyochaghị timestamps megide media. Mmefu 256-cue/64-KiB dị ugbu a, ma nke
ngụkọta ma nke cue ọ bụla, na-emetụta tracks abụọ ahụ ọnụ; timestamps ga-adaba
n'ime oke broker nke sekọnd 600 na focus window ọ bụla e nyere. A na-atụfu tracks
na-adịghị mma, ọ bụghị iziga ha dị ka arbitrary text; sibling ziri ezi ka nwere
ike iji mee ihe ma ọ bụrụ na mmefu ha jikọtara agafeghị oke. Fields null/empty
anaghị etinye ederede. Fallback a anaghị etinye media fetch ma ọ bụ
transcription. A na-ewepụ transcript extension fields na fallback video carrier
na objects `video_url`/`source` ya. OpenAI wire allowlist ka siri ike; unknown-native
video carriers ka dị, ebe targets ndị a maara na-anata naanị ederede na-edobe
markers nchekwa. Structured redaction shadows na-echekwa transcript text a
gbakwunyere, ebe arịrịọ mbụ nke onye kpọrọ oku nwere ka ọ dị unchanged. Targets
nwere nkwado native na bridges disabled na-edobe omume bypass ha dị ugbu a.

Copies ndị ọzọ a na-echekwa na-eji otu observed-request signal ahụ. Raw
pre-guardrail client-request snapshot, in-memory pending request, na early
rejected-request log na-eji structurally dochie transcript fields n'ime video
parts; string prompts nke pipeline stages na context handoff mepụtara na-akpuchi
n'ebe persisted-request-body sink. Marker `video_content_removed` a na-echekwa
na-eme ka continuation `previous_response_id` daa closed, kama iwughachi ederede
a tụfuru n'ebumnuche. Ọ bụrụ na arịrịọ a hụrụ efunahụ per-part redaction shadow
ya tupu logging, ma ọ bụ ọbụna otu n'ime ọtụtụ video shadows adabaghị mgbe
request mutations ndị sochirinụ gasịrị, a na-ahapụ body arịrịọ ahụ kpamkpam kama
ịchekwa transcript nke e kpuchiri naanị akụkụ ụfọdụ.

Maka arịrịọ a hụrụ, nzaghachi model nwere ike ihota akụkụ ọ bụla nke transcript
na-enweghị structured cue boundary. Ya mere a na-eji omission marker dochie
`responseBody` nke call-log ya a na-echekwa; detailed pipeline artifact (nke nwere
ike ịgụnye upstream/client bodies na stream chunks) anaghị echekwa. Semantic,
idempotency, na reasoning-replay caches na-amapụ reads na writes maka arịrịọ ahụ.
Arịrịọ provider na nzaghachi onye ahịa hụrụ anaghị agbanwe. A na-ekpochapụ early
keepalive bytes na temporary buffer mgbe a hapụrụ detailed artifact. Ịdọ aka ná
ntị Kiro banyere malformed EventStream na-akọ naanị payload byte count, ọ dịghị
mgbe ọ bụla ọdịnaya ya ma ọ bụ raw error nke JSON parser.
Nke a anaghị ekwu na a nyochala diagnostics provider/plugin ọ bụla na-abụghị
nke metụtara; a na-esochi nyocha retained-sink sara mbara na #11658.

Lifecycle `/api/modality-bridge/video/drilldown` nke dị n'ime bụ cache substrate
dị iche, nke loopback/token-authenticated. Ọrụ ọ bụla chọkwara canonical opaque
principal ID. Tupu enyere production caller ikike, ọ ghaghị ịmepụta ID ahụ site
na authenticated tenant, ọ gaghịkwa ebuga uru client họpụtara. Cache keys na-ejikọta
principal ahụ na canonical session na video-reference IDs, na-echekwa naanị keys
e sitere na SHA-256, ma na-amachi ma reads ma deletion na principal ahụ. Cache na-
echekwa ihe karịrị frames JPEG 16 a mepụtara kwa entry, na-eme ka ha kwụsị ịdị
ire mgbe nkeji iri gasịrị, ma na-akwado reads `start`/`end` nwere oke ma ọ bụ
nhichapụ session doro anya.

Principal ọ bụla nwere oke entries 16 na canonical JPEG data 64 MiB. Oke ndị a
dị iche na global 64-entry/256 MiB ceiling: nrụgide quota nke principal na-achụpụ
naanị entries least-recently-used nke principal ahụ tupu atụlee global LRU
eviction. A na-ekpochapụ entries kubie ume site na principal na global accounting
ma cache na-arụ ọrụ, ebe cancellation na validation failure anaghị commit partial
replacement.

Cache ahụ na-ajụ Base64 na-abụghị canonical, padding karịrị akarị, media na-abụghị JPEG, JPEG ndị mebiri emebi ma ọ bụ ebipụchara, na JPEG ndị na-emepụta ịdọ aka ná ntị n’oge bounded full-image `sharp` decode. Ọ na-edegharị onyonyo ọ bụla a nabatara dị ka JPEG canonical, na-enweta obosara na ịdị elu site na bytes ndị a decode-rịrị kama ịtụkwasị obi n’ubi caller, ma na-atụfu bytes polyglot ọ bụla sochirinụ kama idobe ha. Naanị bounded canonical compressed buffer ka a na-agụta n’ime quotas abụọ ahụ. Oke JSON wire gụnyere Base64 overhead maka oke decoded-input nke 32 MiB. Derivation ọ bụla echekwara na-edekọ JPEG format/resolution a kwadoro, sampling policy, derivation version, oge e kere ya, content hash nke server gbakọtara, na parent reference a hash-rịrị tinyere parent-content hash nke caller tụkwasịrị obi. A na-enyocha cancellation n’etiti asynchronous decode/hash phases tupu atomic cache commit.

Tranche a ejikọbeghị producer nke production na route ma ọ naghị enye nhọrọ variant nwere ọtụtụ resolution. Ya mere, ụzọ arịrịọ Video Bridge nke na-apụtachaghị ìhè anaghị enweta ọrụ agbakwunyere, ebe tenant-bound principal derivation na lifecycle zuru ezu nke FU-08 multi-resolution ka bụ ọrụ sochirinụ a kọwara nke ọma kama ịkọwa ha dị ka omume emechara.

A na-caption frames n’usoro site na Video model ahaziri. Video override efu na-eketa ntọala Vision; ọ bụrụ na ha abụọ efu, Vision auto-router na-ahọrọ model vision-capable dị irè. Captions gara nke ọma na-anọchi akụkụ mbụ site na prefix kwụsiri ike `[Video description:` nke na-akakwa ederede ahụ dị ka observation sitere na media na-adịghị atụkwasị obi ma na-agwa downstream models ka ha ghara iso ntuziaka a hụrụ n’ime media. Frame-caption cache keys gụnyere JPEG bytes, prompt, timestamp, na model dị irè; naanị captions gara nke ọma ka a na-echekwa. Cache entries na-ejigide producer model ahụ gara nke ọma n’ezie, gụnyere fallback model; bridge na-akọ `mixed` mgbe frames dị iche iche sitere na models dị iche iche. Cache hit na-eji producer identity ahụ eme ihe ọzọ kama ịkpọgharị ya aha dị ka routing plan a rịọrọ. Whole-video result cache na-eji input ọ bụla na-agbanwe output eme key — prompt, model dị irè, sampling policy, frame count, semantic analysis mode, SHA-256 fingerprint nke normalized focus hint, focus window, `transcript`, `audioTranscript`, na contact-sheet flag — ya mere ịgbanwe akụkụ ọ bụla n’ime ha na-ebute cache miss, ọ bụghị stale reuse. Visual dedup policy version, threshold, na bounded candidate-frame count bụkwa ihe doro anya n’ime result-cache key na metadata; ya mere mgbanwe policy enweghị ike iji stale whole-video description ọzọ. Result-cache v4 metadata na-edobe mode na fingerprint, ọ dịghị edobe raw user task. Guardrail metadata na-akọ ma requested analysis mode ma effective analysis mode; requested `focused` mode na-enweghị usable user text ka a na-akọ dị ka `full` nke dị irè.

Guardrail ahụ na-ewepụta video part ọ bụla a kwadoro mana ọ naghị akọwa ihe karịrị `modalityBridgeVideoMaxVideos`. Maka target e gosipụtara na `supportsVideo === false`, videos dara ada na ndị gafere oke na-aghọ safe text markers doro anya ka raw video ghara ịlanarị. Mgbe capability amachaghị, akụkụ ndị ahụ na-edobe video carrier ha; transcript fallback ọ bụla na-eso bounded text conversion dị n’elu. Targets nwere `supportsVideo === true` na-agafe bridge. Client request abort signal na-agafe download, broker queue, subprocesses, na caption calls; aborts na-akwụsị n’etiti videos, ha anaghị ada open gaa raw media.

Runtime settings sitere na DB ma Zod na-akwado ha:

| Igodo                               | Ndabara     | Oke / omume                                                                                              |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime nhọrọ, a ga-enwerịrị opt-in                                                                      |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` na-echekwa captions izugbe; `focused` na-eji bounded, untrusted latest-user context               |
| `modalityBridgeVideoModel`          | `""`        | Keta Vision Bridge model                                                                                 |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                     |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, ma ọ bụ proportional `segment_aware`; ọdịda detector na-alaghachi na `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                      |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                           |

A na-akpọchi Legacy persisted Video timeout values karịrị sekọnd 120 na broker deadline; a na-ajụ settings writes ọhụrụ karịrị oke ahụ. `GET /api/modality-bridge/video/runtime` chọrọ trusted stamped loopback locality tupu authentication ma ọ bụ runtime probing, ma emesịa ọ chọrọ management auth. Ọ na-eweghachi naanị `available`, nsụgharị FFmpeg/ffprobe e sachara, na reason a kapịrị ọnụ mgbe runtime adịghị. Internal extraction endpoint ahụ abụghị public upload API: queue saturation na-eweghachi `503` tinyere `Retry-After`, caller disconnect na-eweghachi `499`, broker deadline a kapịrị ọnụ na-eweghachi `504`. Converted responses na-agbakwunye `video->text;model=<visionModel>;parts=<videos>` na central `x-omniroute-modality-bridge` header, na-ewepụghị Vision ma ọ bụ Audio segments.

### Onye na-ekpuchi PII (`piiMasker.ts`)

Ọ na-agba ọsọ n’akụkụ abụọ ahụ.

- **`preCall`** na-eme clone nke payload, na-agafe `system`, `messages`, `input`, na
  `prompt` (gụnyere ihe ndị bụ plain string), ma tinye `processPII()` (site na
  `@/shared/utils/inputSanitizer`) n'ọhịa `content`/`text` ndị bụ string. Mgbe
  `PII_REDACTION_ENABLED=true` dị, a na-ewepụ PII a chọpụtara n'ime payload a
  na-eziga. Nke a nọọrọ onwe ya na `INPUT_SANITIZER_MODE` (nke na-achịkwa naanị
  iwu prompt-injection). Mgbe redaction gbanyụrụ, oku ahụ na-edekọ ọnụọgụ
  nchọpụta n'ebughị idegharị ọdịnaya.
- **`postCall`** na-eme deep clone nke nzaghachi, na-agba
  `sanitizePIIResponse()` yana masker nke ọdịdị Responses-API
  (`maskResponsesOutput` — ọ na-ekpuchi `output_text` na
  `output[].content[].text`). Ọ bụrụ na redaction ọ bụla mere, nzaghachi a
  gbanwere na-anọchi nke mbụ.

Guardrail ahụ anaghị egbochi ihe ọ bụla; naanị ihe ọ na-eme bụ itinye akara
(`meta.detections`, `meta.redacted`) ma ọ bụ idegharị ya.

#### Nhọrọ kwa-ụdị, ụkpụrụ omenala na ọnụọgụ nchọpụta

**Dashboard → Settings → Security → PII masking** na-ahọrọ _ihe a ga-ekpuchi_. Ọ
dịghị agbanye masking: nke ahụ ka bụ `PII_REDACTION_ENABLED` (arịrịọ) na
`PII_RESPONSE_SANITIZATION` (nzaghachi + SSE), ha abụọ na-agbanyụghị na mbụ.

- **Nhọrọ kwa-ụdị** — e depụtara ids ndị e wuru n'ime ya na
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Ọ bụrụ na edoghị ya,
  ọ pụtara ụdị niile (omume dị tupu ntọala a apụta). Ụkpụrụ `ssn_us` nke request
  engine na-aga na `ssn`. Templates (Minimal, Standard, Financial, Brazilian,
  USA, GDPR, POPIA, Full) na-ejupụta naanị checkbox ndị dị na UI.
- **Nchọpụta GDPR na POPIA** — ids iri na abụọ e wuru n'ime ya na-ekpuchi
  nchọpụta onwe onye nke EU na South Africa (lee tebụl dị n'okpuru). Regex,
  validators na jurisdiction tags ha niile dị n'otu tebụl,
  `src/shared/utils/piiPatterns.ts`, nke ma response sanitizer
  (`src/lib/piiSanitizer.ts`) na request masker
  (`src/shared/utils/inputSanitizer.ts`) na-eji. A na-ewepụ match naanị mgbe
  validator ya kwadoro ya; naanị usoro digits enweghị isi zuru ezu. Onye ọrụ
  nke chekwara nhọrọ e belatara tupu ids ndị a adị ga-aga n'ihu na omume ahụ ruo
  mgbe ọ họọrọ ids ọhụrụ ndị ahụ.
- **Ụkpụrụ omenala** — ruru ụkpụrụ regex ma ọ bụ wildcard 20 (`*` = ruo na
  mkpụrụedemede 64 na-abụghị whitespace, `?` = otu). Matches na-abụ
  `[CUSTOM_REDACTED]`. Ụkpụrụ ọ bụla na-agafe
  `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): kacha
  elu bụ mkpụrụedemede 500, flags nwere naanị `g i m s u`, ọ ga-enwerịrị ike
  ịcompile, ọ ga-agafe `safe-regex` (catastrophic backtracking), ma ghara
  match empty string ma ọ bụ redaction placeholder. A na-ajụ ụkpụrụ dara ada
  mgbe a na-echekwa ya na mgbe a na-anwale ya, ebe row echekwara nke dara ada
  na-amapụ n'oge runtime kama ịcompile ya. Ụkpụrụ omenala na-agba naanị mgbe
  masking dị.
- **Ọnụọgụ nchọpụta** — a na-edekọ ọnụọgụ kwa-ụdị (ọ bụghị ụkpụrụ ndị a
  match), debe ha na memory ma tọgharịa ha mgbe a malitegharịrị usoro
  (`src/lib/pii/piiDetectionStats.ts`). Ha na-abawanye naanị mgbe masking dị.

Ntọala ndị ahụ dị na tebụl `key_value` (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) ma a na-agụ ha site na cache nke 1 s. API:

| Usoro  | Ụzọ                      | Ebumnuche                                                                  |
| ------ | ------------------------ | -------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Ọnọdụ flag, `enabledTypes`, `customPatterns`, ọnụọgụ nchọpụta              |
| `PUT`  | `/api/settings/pii`      | Dochie `enabledTypes` (`null` = niile) na/ma ọ bụ `customPatterns`         |
| `POST` | `/api/settings/pii/test` | Nnwale otu ụkpụrụ megide sample kacha elu 8 KB; a naghị echekwa ihe ọ bụla |

Ha atọ chọrọ management auth ma jiri Zod kwado body
(`src/shared/validation/schemas/piiSettings.ts`).

#### Nchọpụta GDPR (EU) na POPIA (South Africa)

| Id                  | Nchọpụta                    | Nkwado                                                                                           |
| ------------------- | --------------------------- | ------------------------------------------------------------------------------------------------ |
| `iban`              | IBAN                        | Mba a maara, ogologo ziri ezi maka mba ahụ, ISO 13616 MOD-97-10                                  |
| `eu_vat`            | Nọmba VAT nke EU            | Prefix nke mba so na ndị otu a maara na usoro nọmba nke steeti ahụ (enweghị nyocha VIES)         |
| `es_dni_nie`        | DNI / NIE nke Spain         | Akwụkwọ ozi njikwa (value mod 23); NIE bụ `X/Y/Z` + digits 7                                     |
| `it_codice_fiscale` | Codice Fiscale nke Italy    | Akwụkwọ ozi njikwa sitere na tebụl ọnọdụ odd/even                                                |
| `pl_pesel`          | PESEL Poland                | Weighted checksum na oke ọnwa/ụbọchị ọmụmụ e encode nwere ezi uche                               |
| `nl_bsn`            | BSN nke Netherlands         | 11-proof (weights 9..2, -1)                                                                      |
| `de_steuer_id`      | Steuer-ID nke Germany       | ISO 7064 Mod 11,10 yana iwu nhazi digits (enweghị 0 n'isi)                                       |
| `se_personnummer`   | personnummer nke Sweden     | Luhn n'elu digits iri ikpeazụ na ụbọchị ọmụmụ nwere ezi uche (digits 10 ma ọ bụ 12)              |
| `za_id`             | Nọmba ID nke South Africa   | Luhn n'elu digits 13 niile, ọnwa/ụbọchị ọmụmụ ziri ezi, citizenship digit 0 ma ọ bụ 1            |
| `za_phone`          | Ekwentị South Africa        | Prefix `+27` / `27`, ma ọ bụ ụdị mba `0..` nke e dere na oghere ma ọ bụ hyphen                   |
| `za_vat`            | Nọmba VAT nke South Africa  | digits 10 na-amalite na `4` **yana** "VAT" / "BTW" n'ime mkpụrụedemede 48 ndị bu ya ụzọ          |
| `za_tax_ref`        | Ntụaka ụtụ isi South Africa | digits 10 na-amalite `0`-`3`, Luhn, **yana** "tax" / "SARS" n'ime mkpụrụedemede 48 ndị bu ya ụzọ |

N’ihi na ụdị ndị nwere naanị ọnụọgụ na-adakọ na nọmba iwu, nọmba owuwu na akara oge, ndị kacha adịghị ike (`za_vat`, `za_tax_ref`) chọrọ ihe na-egosi isiokwu, a naghị ewerekwa nọmba nwere ọnụọgụ iri nke na-amalite na `0..` naanị ya dị ka nọmba ekwentị South Africa. A naghị amata IBAN ndị nwere oghere (`GB29 NWBK ...`). N’ụzọ streaming, a na-achọ ihe na-egosi isiokwu naanị n’ime chunk dị ugbu a. Id ndị ahụ dị n’ihu usoro ekwentị izugbe, ya mere njirimara a kwadoro na-edobe placeholder nke ya
(`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Template `gdpr` na `popia` na-ahọrọ id nke EU na nke South Africa n’otu n’otu. Masking n’onwe ya ka bụ nke a na-ahọrọ ịgbalite (Iwu Siri Ike #20): ọ nweghị ihe dị ebe a na-agbanwe ndabara feature-flag.

### Prompt Injection (`promptInjection.ts`)

Ọ na-achọpụta nhazi ndị iro n’ime ọdịnaya onye ọrụ nyere ma na-amanye iwu a haziri. Environment variables na nhọrọ constructor na-achịkwa omume ya:

| Nhazi       | Env var                                                                                                | Ndabara | Mmetụta                                                                                                                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Agbanyere   | `INPUT_SANITIZER_ENABLED`                                                                              | `true`  | Mgbe ọ bụ `false`, guardrail na-akwụsị ozugbo.                                                                                                                                                      |
| Ọnọdụ       | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                        | `warn`  | Iwu injection: `block`, `warn`, ma ọ bụ `log`. (`redact` ka a na-anabata maka ndakọrịta azụ, mana ọ **dịghị** ewepụ ederede injection; `PII_REDACTION_ENABLED` na-achịkwa idegharị PII nke arịrịọ.) |
| Oke igbochi | Nhọrọ `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (aha ọzọ `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Ogo kacha nta achọrọ iji gbochie. Na ndabara, a na-ele Medium naanị anya.                                                                                                                           |

**Usoro ụzọ maka ọnọdụ** (`getMode`): `options.mode` nke onye kpọrọ ọrụ →
`INJECTION_GUARD_MODE` **DB feature-flag override** (Dashboard → Settings →
Feature Flags) → env `INJECTION_GUARD_MODE` → env `INPUT_SANITIZER_MODE` →
`warn`. Ya mere override nke dashboard na-emeri env vars, nke pụtara na UI
Feature Flags na-achịkwa guard na-agba ọsọ ozugbo (enweghị restart). Ọgụgụ DB na-adabere na nchekwa:
ọ bụrụ na ọ daa, guard na-alaghachi n’omume dabere na env, ma mgbe
enweghị override, omume ahụ na-adị otu ihe ahụ na mkpebi sitere na env naanị.

Ebe nchọpụta si abịa:

1. `sanitizeRequest()` sitere na `@/shared/utils/inputSanitizer` (otu set nke
   detector ndị ọzọ na pipeline na-eji).
2. `DEFAULT_GUARD_PATTERNS` nke dị n’ime ya (ugbu a bụ `system_override_inline` na
   `markdown_system_block`, ha abụọ nwere ogo `high`).
3. `customPatterns` nhọrọ nke a na-enye site na constructor (strings, regex,
   ma ọ bụ ndekọ `{ name, pattern, severity }`).

Mgbe `mode === "block"` **na** opekata mpe otu nchọpụta ruru oke ogo ahụ,
`preCall` na-eweghachi `{ block: true, message: "Request rejected:
suspicious content detected" }`. Na ọnọdụ `warn`/`log`, guardrail na-edekọ log
mana ọ na-ahapụ oku ahụ ka ọ gaa n’ihu. A na-ebupụkwa helper nkekọrịta
`evaluatePromptInjection()` maka ndị na-akpọ ọrụ chọrọ inyocha prompts na-agaghị
site na registry.

**Oke nyocha (v3.8.20):** detector na-enyocha naanị **16 KB mbụ** nke ederede prompt
ejikọtara — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) dị na
`src/shared/utils/inputSanitizer.ts`. Ma `detectInjection()` ma
`evaluatePromptInjection()` na-eme `slice(0, MAX_INJECTION_SCAN_BYTES)` tupu ha agbaa
pattern loop. Ntuziaka injection na-adịkarị nso n’elu input, ya mere nke a na-egbochi CPU/GC nke regex
na payload ndị karịrị ọtụtụ narị KB n’enweghị ime ka nchọpụta daa mbà (lee
#3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Ọ na-agba ọsọ na stages **abụọ**, bụrụ nke ikpeazụ n’ime default chain (priority `95`). Ọ na-ezobe
ụdị API-key / secret-token ndị a ma ama site na payload a na-ezipụ (ọdịnaya ozi,
arụmụka tool-call, nsonaazụ tool) **na** nzaghachi provider, nke mere na credential
e tinyere na prompt (ma ọ bụ nsonaazụ tool weghachiri ya) agaghị agbapụta
nye upstream provider ma ọ bụ laghachi nye client.

- **Ọ bụ naanị opt-in**, otu usoro ahụ na PII redaction si arụ ọrụ (nke metụtara Iwu Siri Ike #20):
  ọ na-enwe nkwarụ belụsọ ma `settings.credentialRedactionEnabled === true` **ma ọ bụ**
  `CREDENTIAL_REDACTION_ENABLED=true`. Mgbe ọ kwụsịrị, guardrail bụ no-op — ọ dịghị mgbe ọ na-egbochi ma ọ bụ na-edegharị.
- `redactCredentials()` na-agafe osisi payload/response dum (`walkValue()`,
  nke na-echebe megide prototype pollution ma na-echekwa megide cycle site na `WeakSet`) ma dochie
  matches na placeholder `[REDACTED:<type>]`, na-clone naanị alaka ndị gbanwere n’ezie.
- `CREDENTIAL_PATTERNS` na-ekpuchi igodo LLM provider (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), token VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), igodo ịkwụ ụgwọ (Stripe, Square), igodo
  igwe ojii (AWS access key, Twilio, SendGrid, Mailgun), private keys / JWTs,
  connection strings nwere credential (`mongodb://user:pass@...`, wdg.), na
  pattern uru header izugbe nke `Authorization`/`x-api-key`/`api-key`/`apikey`.
  A na-ezobe igodo ndị yiri header (`authorization`, `x-api-key`, `api-key`,
  `apikey`) n’ụzọ nhazi (uru naanị, na-echekwa scheme prefix dị ka
  `Bearer `/`Basic `) kama iji generic text regex.
- Guardrail anaghị egbochi ma ọlị; ọ na-edegharị naanị (`modifiedPayload` /
  `modifiedResponse`) ma tinye nkọwa (`meta.credentialsRedacted`, `meta.count`).

Nchedo regression: `tests/unit/credential-masker-guardrail.test.ts`.

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
