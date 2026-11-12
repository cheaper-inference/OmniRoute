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

### Àkwà Video (`videoBridge.ts`, `videoBridgePipeline.ts`)

Ọ na-ejide akụkụ video ndị dị n’elu ọkwa na Chat Completions `messages` na Responses
API `input` tupu akpọọ target na-enweghị nkwado video native a maara. Ụdị ndị akwadoro bụ `input_video`, `video_url`, `video_source`, HTTPS URLs, na data URI `data:video/*;base64,...`. A naghị ewere aha faịlụ nkịtị dị na text dị ka video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) na-ahụ maka traversal arịrịọ, nyocha capability/policy, nchịkọta kwa-arịrịọ, na payload nzaghachi. Ọrụ kwa-video — inweta data, cache nsonaazụ niile, ịkọwa usoro frame (nke na-ejikọta transcript audio ọ bụla caller kwupụtara), yana metrics/abort/cleanup nke mgbalị ọ bụla — zoro n’azụ `processVideoPart` na `videoBridgePipeline.ts`, nke a na-akpọ otu ugboro maka akụkụ video ọ bụla n’ime loop nke `preCall`.
Module ahụ na-akọwakwa oke port doro anya `VideoMediaBrokerPort` (inweta bytes na iwepụta frame ndị a họpụtara), `VideoAudioTranscriptionPort` (ijikọta transcript audio caller kwupụtara na captions ndị a sample), na `VideoDrilldownPort` (ụdị legacy raw-store). A na-ahazi production STT na njide frame gburugburu port nkọwa ahụ site na `createVideoSttAdapter` na `createVideoDrilldownAdapter`; nke ikpeazụ na-eji lifecycle opaque-handle a na-ekekọrịta.

Ụzọ arịrịọ public `/v1` anaghị ebubata ma ọ bụ kpọọ subprocess. A na-ebudata video ndị dịpụrụ adịpụ n’okpuru oke 50 MiB; video inline base64 nwere oke conservative nke 36 MiB decoded kwa-video ka envelope model/messages/framing nwee ike ịnọ n’ime oke nnabata public JSON request nke 50 MiB. A na-enyocha atụmatụ inline length na decoded-size tupu allocation. A chọrọ HTTPS na remote URL mbụ na redirect ọ bụla, site na outbound guard dị ugbu a nke naanị public URL kwere, tinyere DNS pinning. Bytes ndị ahụ na-agafe oke broker internal `POST /api/modality-bridge/video/extract` kpọmkwem. Route ahụ bụ ma `LOCAL_ONLY` ma `SPAWN_CAPABLE`, na-anabata naanị arịrịọ trusted-loopback nke authenticated kwa-process, ma ọ naghị anabata URL, filesystem path, executable, ma ọ bụ ndepụta argument. Pipeline body-size API na onye handler na-agụ body nwayọọ nwayọọ na-amanye onwe ha n’onwe ha oke broker input nke 50 MiB. Queue ya nwere oke na-arụ extraction otu n’otu, na-ahapụ jobs anọ na-echere, ma na-egbochi pending input na 100 MiB.

N’ime broker, `ffprobe` na-agụ faịlụ mpaghara nkeonwe; ndepụta ụdị ndị ekwenyere nke edoziri anaghị etinye ụdị playlist na manifest. Maka akpa MOV-family ndị ekwenyere, ntụaka data MOV dị na mpụga ka na-anọgide na-agbanyụghị na ndabara, iwu edoziri ahụ anaghịkwa ahọrọ ịgbanye ha. Ma `ffprobe` ma `ffmpeg` na-eji ndepụta ikike protocol naanị `file`, otu thread, nhazi arụmụka edoziri, enweghị shell, yana executable ndị a na-achọpụta site na `PATH`. Stream mkpuchi attached-picture abụghị ndị a ga-egwu. Stream niile a ga-egwu ga-agbaso oke ndị a, a na-ahọrọ stream ndabara doro anya tupu fallback deterministic nke nwere index kacha ala. A na-amachibido vidio ruo sekọnd 600, pikselụ 8,192 n’akụkụ ọ bụla, na pikselụ isi iyi 33,554,432. FFmpeg na-sample fremu JPEG dị n’etiti 1–16, na-eme ka akụkụ ogologo daa ruo kacha 1,024 pikselụ n’enweghị ịkwalite obere input, ọ naghịkwa anata URL. Sampling bụ `uniform` na ndabara. Atụmatụ nhọrọ `scene_aware` na `segment_aware` nke ka nọ na nnwale na-eme otu pass FFmpeg ọzọ edoziri n’elu stream mpaghara a nyochalararịrị, họrọ timestamps scene `showinfo` ndị nwere oke, ma daa n’ụzọ deterministic laghachi na midpoint `uniform` ndị ahụ ma detector daa, timeout mee, mmepụta bụrụ nke na-adịghị mma, ma ọ bụ set nke ndị ga-abụrịrị efu. Ụdị segment-aware na-ekesa samples midpoint n’usoro kwekọrọ na scene intervals ndị e nyochalararịrị; a kọwara ihe akaebe segment-aware na omume fallback n’okpuru. A na-etinye oke siri ike nke fremu 16 mgbe nhọrọ gachara n’atụmatụ ọ bụla. Mgbe arịrịọ scene-aware nwere naanị mmefu otu fremu, ọ na-eji midpoint `uniform` nke windo vidio niile nọ n’ọrụ ma ọ bụ windo focus, ma kọọ `policyEffective: uniform`: otu fremu scene ahọpụtara enweghị ike ichekwa nsọtụ oge abụọ ahụ. Onye na-akpọ ọrụ nwere ike ịnye windo focus nwere oke (`start`/`end` sekọnd); a na-akpụ oke ndị ahụ ka ha daba n’ogologo media, a na-ajụ windo ndị gbanwere ntụzịaka ma ọ bụ ndị na-abụghị finite, a na-emekwa atụmatụ sampling niile naanị n’ime interval a haziri nke ọma. A na-etinye windo pụtapụtara na metadata sampling na prefix nkọwa a na-atụkwasịghị obi ka ụdị ndị na-esote nwee ike ịmata excerpt a lekwasịrị anya na timeline zuru ezu.

Focus semantic caption bụ ntọala dị iche, nke a na-akọwapụta n’ụzọ doro anya. Ụdị nyocha `full` nke ndabara na-echekwa frame prompt dị adị ma ọ dịghị mgbe ọ na-ebufe ederede arịrịọ gaa n’ebe caption model nọ. N’ụdị `focused`, bridge na-agụ naanị `text`/`input_text` kacha ọhụrụ nke onye ọrụ dere, nke na-abụghị efu, site n’otu Chat ma ọ bụ Responses container ahụ, na-eme ka ọ bụrụ NFC, na-achịkọta control characters na whitespace, ma kpachie ya ruo mkpụrụedemede Unicode 500. Nsonaazụ efu na-alaghachi na prompt `full` ahụ kpọmkwem. A na-ahazi hint bara uru ka ọ bụrụ JSON n’ime ngọngọ untrusted-user-context raara nye, ọ pụkwara naanị ibute nkọwa ndị a na-ahụ anya ụzọ; ọ nweghị ike ịkagbu ịdọ aka ná ntị dị iche megide iso ntuziaka ndị a na-ahụ ma ọ bụ na-anụ n’ime media. Focus ederede anaghị atụpụta `start`/`end` ma ọ bụ gbanwee temporal sampler.

#### FU-07 ihe akaebe segment nhazi

`segment_aware` na-eji otu bounded pre-analysis pass n’elu stream vidio mpaghara a nyochalararịrị. Filter chain edoziri na-ebu ụzọ belata obosara ruo kacha 320 pikselụ, chọpụta mgbanwe scene na oge vidio kwụsịrị, wee sample na fremu 1 kwa sekọnd maka blur, nkezi luma, na ozi spatial/temporal. A na-amachibido pass ahụ ruo structural samples 600, otu FFmpeg/filter thread, otu protocol na container allowlists nke `file` naanị, oke mmepụta process 1 MiB, na kacha sekọnd 30 n’ime shared abort/deadline nke broker. Ọ dịghị mgbe ọ na-anabata command, filter, path, ma ọ bụ URL site n’arịrịọ ahụ.

Ụkpụrụ structural ndị ahụ bụ ihe akaebe sampling deterministic, ọ bụghị nghọta semantic nke vidio. Ha anaghị atụpụta subjects, omume, captions, okwu, ma ọ bụ ebumnuche onye ọrụ. Scene na freeze boundaries na-emepụta segments; freeze coverage, blur, exposure, spatial detail, na temporal change na-emetụta naanị otú e si ekesa mmefu fremu 1–16 dị adị. A na-amachibido segment nke jụrụ kpamkpam ruo otu fremu, ebe segments na-adịghị ajụ na-asọmpi maka mmefu fọdụrụ. Mgbe boundaries karịrị ọnụ ọgụgụ fremu, a na-echekwa uniform timeline coverage ka cuts ndị dị ngwa n’oge mmalite ghara izobe segment ogologo nke na-esote. A na-ejikọta scene boundaries ndị dị n’ime mkpebi analysis nke otu sekọnd site na freeze boundary.

Filters na-efu, evidence na-adịghị mma ma ọ bụ efu, njehie detector, ma ọ bụ pre-analysis timeout nwere oke na-eme ka usoro ahụ daa n’ụzọ fail-open gaa na iwu midpoint `uniform` ahụ kpọmkwem. Abort nke onye na-akpọ ọrụ ma ọ bụ deadline broker anaghị eme fail-open: ọ na-akwụsị subprocess dị n’ọrụ, gbochie mwepụta fremu e mesịrị, ma wepụ private temporary tree n’ime `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` na-emepụta fixtures FFmpeg n’ezie ma deterministic maka nchekwa oku caption mgbe dedup gachara, nkesa mmefu maka motion dị ukwuu, evidence blur/exposure/SI-TI, cuts dị ngwa nwere tail ogologo, na false positives nke gradual-fade. Ọ na-edekọ wall time nke pre-analysis na, ebe `/usr/bin/time` dị, CPU nwa na peak RSS. Nlele ogo ya bụ structural oracles naanị. Ogo caption-model n’ezie ka bụ `HOLD` n’ihi na harness a enweghị endpoint enyere ikike ma ọ bụ judge jụrụ oyi. Nchekwa ego kwa oku ka bụkwa `HOLD` belụsọ ma `--caption-cost-per-call-usd` nye atụmatụ doro anya nke dị mma karịa efu maka oku ọ bụla; script ahụ anaghị emepụta nsonaazụ ọ bụla n’ụgha.

Fremu ọ bụla nwere oke 4 MiB, fremu raw niile jikọtara ọnụ nwere oke 23 MiB, azịza broker a serialized nwekwara oke 32 MiB. A na-ewepụ ndekọ nwa oge nkeonwe na `finally`. OmniRoute anaghị etinye FFmpeg n’ime ngwugwu ya, ọ naghị anabatakwa ụzọ executable omenala. Tupu ịmepụta nkọwa, bridge ahụ na-eme usoro mwepụ oyiri anya nke nwere nchekwa: a na-ebelata JPEG ọ bụla ka ọ bụrụ buffer grayscale 16×16, wee jiri naanị fremu ikpeazụ echekwara tụnyere ya. Maka mmefu ego nkọwa a rịọrọ nke karịrị otu fremu, extraction na-enye ọdọ mmiri kandideti nwere oke ruru okpukpu abụọ nke mmefu ego ahụ, ma ọ dịghị akarị fremu 16. A na-etinye oke a rịọrọ naanị mgbe mwepụ oyiri gachara, ebe a na-echekwa kandideti mbụ na nke ikpeazụ ahọpụtara n’oge mbelata ikpeazụ mgbe mmefu ego ahụ dịkarịa ala abụọ. Amụma `grayscale-16x16-mean-cells-v2` nke nwere ụdị ya na-eji nke ka ukwuu n’etiti ọdịiche mean luma na oke sel thumbnail ndị delta ha normalized ruru opekata mpe 0.05. Ọnụ ụzọ oyiri bụ constant 0.04, nke a họọrọ maka amụma doro anya kama ikpughe ya dịka ntọala runtime. Ihe mgbaàmà high-contrast nke abụọ a na-echekwa obere mmegharị na mgbanwe ederede a na-ahụ anya nke ntụnyere mean naanị nwere ike zoo. Mmejọ comparator ma ọ bụ decoder na-eme ka usoro ahụ “fail open” ma na-echekwa coverage. Metadata mmepụta na-ekewa kandideti ewepụtara, fremu ejiri nke ọma, na oyiri anya a tụfuru.

Akụkụ vidiyo e nyere akara n’ụzọ doro anya nwere ike ịrịọ contact sheet nwere timestamps. Bridge ahụ na-ewu grid JPEG nwere kọlụm kacha 4 na fremu kacha 16. Sel ọ bụla nke pikselụ 512 na-etinye timestamp isi iyi ya n’ime band dị n’ala nke nwere high contrast, ebe timestamps ndị ahụ ka nọkwa na metadata ederede maka njikọ na nyocha downstream. JPEG zuru ezu ka nwere oke 32 MiB. Ọ bụrụ na `sharp` enweghị ike decode ma ọ bụ compose grid ahụ, bridge ahụ na-alaghachi na fremu JPEG ndị nke ọ bụla; abort nke client ka na-agafe n’ime ọrụ sheet ahụ.

A na-edobe ihe akaebe promotion iche na microbenchmark composition synthetic. `scripts/perf/video-bridge-contact-sheet-eval.ts` na-akọwapụta A/B harness nwere schema version maka ezigbo ụdị vision ndị OpenAI-compatible. Ọ na-atụ tokens ndị provider kọrọ, latency wall end-to-end (gụnyere composition sheet), ọnụọgụ oku model, na njide fact ndị manifest kọwara. A naghị ede nzaghachi raw model na report; naanị digests SHA-256 na matched fact IDs ka a na-echekwa. Harness ahụ anaghị eme oku netwọk ma ọ bụ oku model akwụ ụgwọ ọ bụla ma ọ bụrụ na e nyefeeghị `--execute-real` ma hazie `--model`, `OMNIROUTE_BASE_URL`, na `OMNIROUTE_API_KEY`. Enweghị run real ahụ a kpọmkwem nyere iwu, verdict nke machine-readable ya na-anọgide `HOLD`; measurements synthetic nke payload/call-count naanị abụghị ihe akaebe promotion.

Ndị na-akpọ nwere ike itinye array nhọrọ `transcript.cues` na akụkụ vidiyo akwadoro mgbe ha nwere ederede kwekọrọ n’ahịrị. Cue ọ bụla ga-enwerịrị `text`, interval `start`/`end` nwere uru finite nke dị n’ime ogologo oge a nyochara, yana `source` nke nọ na whitelist (`client`, `embedded`, ma ọ bụ `audio-bridge`); `confidence` na-amalite na `1` ma ga-anọrịrị n’etiti `0` na `1`. A na-ejikọta cue ndị bụ kpọmkwem oyiri. OmniRoute anaghị amalite transcription site na metadata a: a na-edepụta cue ndị a kwadoro n’ime nsonaazụ akọwara, tinyere source, confidence, na interval, ma na-egosipụta ha dịka nlele ndị a na-atụkwasịghị obi n’akụkụ nkọwa fremu. A na-ajụ ederede na-adịghị mma, nke karịrị oke, ma ọ bụ nke na-enweghị provenance kama ịgwakọta ya n’ime iyi nkọwa. Ọwa transcript abụọ dị n’ime request body na-eme ka provenance e nyere bụrụ `client`, gụnyere labels `embedded` ma ọ bụ `audio-bridge` onye ọrụ kwupụtara n’onwe ya. Naanị adapter nke server nwe ya nwere ike inye labels ndị a tụkwasịrị obi site n’arụmụka `trustedSource` nke code-only; ubi JSON dị na request enweghị ike iru arụmụka ahụ. Ederede transcript ka bụ ọdịnaya sitere na media nke a na-atụkwasịghị obi, n’agbanyeghị provenance ya, ọ gaghịkwa ekpebi authorization.

Onye na-akpọ n’ọkwa dị elu nwere ike inye track `audioTranscript` maka otu vidiyo ahụ; a na-emeso ya dịka ederede client nyere, ọ bụghị ihe akaebe nke transcription server. Seam fusion na-agba nlele visual na audio n’okpuru otu deadline na abort signal, na-ahazi ha n’usoro timeline jikọtara ọnụ, na-ejikọta oyiri kpọmkwem, ma na-akọ nsonaazụ partial mgbe naanị otu akụkụ gara nke ọma. `audioTranscript` na-adịghị mma na-eme ka ọ daa n’ụdị nsonaazụ partial ahụ — a na-echekwa nkọwa visual, alaka audio na-edekwa failure code a sachara — kama ime ka vidiyo niile daa. A na-echekwa availability nke alaka ọ bụla, flag partial, na failure codes ndị a sachara n’ime nsonaazụ akọwara, na metadata guardrail (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), na metadata result-cache, nakwa na counters fusion nke bridge. Ụzọ Video Bridge nke ndabara anaghị akpọ speech-to-text ma ọ bụ budata oyiri media nke abụọ; na-enweghị track ahụ a kpọmkwem nyere, ọ na-anọgide bụrụ naanị vidiyo.

**Njidebe transcript (#12150 P1).** Nke a na-arụ ọrụ na-akpaghị aka mgbe ọ bụla
Video Bridge (nke ya onwe ya chọrọ opt-in) na-egosipụta cue transcript — enweghị
flag njidebe dị iche. Mgbe arịrịọ gosipụtara cue transcript ọ bụla (ma ọ bụ
`transcript` nke onye na-akpọ kwuru, ma ọ bụ `audioTranscript` jikọtara), guardrail
na-akara ya `videoBridgeObserved` ma mepụta onyinyo e kpochapụrụ nke nkọwa vidiyo —
ngosipụta yiri nke mbụ ebe a dochiri free-text body nke cue ọ bụla na
`[redacted-video-transcript]`, site n'ịgbanwe structured cue field tupu ejikọta
eriri ahụ (ọ bụghị site n'ịtụgharị flattened text, ya mere ọdịnaya cue ọ bụla —
nke nwere ike ịbụ nke iro ma ọ bụ nke nkịtị, gụnyere bodies nwere `]` dịka
`[inaudible]`/`[music]` — enweghị ike ịlanarị). Body arịrịọ dị na call-log
e debere na-agbanwe akụkụ ederede ọ bụla sitere na vidiyo ka ọ bụrụ onyinyo
e kpochapụrụ ahụ, dabere na nha ọdịnaya; a na-agụgharị anchor `fullText` site na
payload guardrail agwụchara tupu oku, ya mere match ahụ ka na-aga nke ọma mgbe
chain guardrails ndị ọzọ mechara (PII na credential maskers, priorities 10/95)
gbanwere ederede nkọwa ahụ n’ebe ahụ nakwa mgbe system-prompt/handoff/memory
injection gbanwere nhazi message array. Body a zigara n’elu gaa na model
anaghị agbanwe. Arịrịọ a hụrụ adịghị etinye Memory na-adịgide adịgide ọ bụla
(ma request- ma response-derived extraction na-amapụ ya), ya mere azịza model
onwe ya enweghị ike ịkpọghachite ederede transcript n’ime Memory.

**Raw video fields (#12430).** Mgbe bridge dị irè ma nkwado vidiyo native
amaghị ma ọ bụ na-adịghị, fields `transcript`/`audioTranscript` akọwapụtara
na-akpalikwa `videoBridgeObserved`, ọbụna mgbe nkọwa dara ma ọ bụ mgbe e ruru
oke `maxVideos`. `null` na empty strings na-agụnye; fields na-adịghị na metadata
na-abụghị nke vidiyo anaghị agụnye. Mpịakọta ndị e debere na-ewepụ ederede
fields ndị a ma ọ bụ hapụ arịrịọ ahụ, a na-agafekwa caches/Memory.

N’ụzọ fallback ndị ahụ, cues ziri ezi nke onye na-akpọ na-aghọ akụkụ
`text`/`input_text` a kwadoro kama ịbụ fields provider na-abụghị ọkọlọtọ.
Tracks abụọ sitere n’arịrịọ ka bụ observations `client` a na-atụkwasịghị obi,
tinyere ịdọ aka ná ntị doro anya na a kọwaghị vidiyo ahụ nakwa na e nyochaghị
timestamps megide media. Budget ngụkọta na nke cue ọ bụla nke
256-cue/64-KiB dị ugbu a na-arụ ọrụ n’otu n’elu tracks abụọ ahụ; timestamps
ga-adịrị n’ime oke broker nke 600-second na focus window ọ bụla e nyere.
A na-atụfu tracks na-adịghị mma, a naghị ezigara ha dị ka arbitrary text;
sibling ziri ezi ka nwere ike iji ma ọ bụrụ na budget ha jikọtara agafeghị oke.
Fields null/empty anaghị etinye ederede. Fallback a anaghị etinye media fetch
ma ọ bụ transcription. A na-ewepụ transcript extension fields na fallback video
carrier na `video_url`/`source` objects ya. OpenAI wire allowlist ka siri ike;
unknown-native video carriers ka dị, ebe targets ndị a maara na-akwalite naanị
text ka na-edobe safe markers. Structured redaction shadows na-echekwa ederede
transcript agbakwunyere, ebe arịrịọ onye na-akpọ nwere ka dị unchanged. Targets
nwere nkwado native na bridges ndị a kwụsịrị na-edobe omume bypass ha dị ugbu a.

Mpịakọta ndị ọzọ e debere na-eji otu observed-request signal ahụ. Raw
pre-guardrail client-request snapshot, pending request dị na memory, na early
rejected-request log na-eji usoro dochie transcript fields dị na video parts;
string prompts nke pipeline stages na context handoff mepụtara na-ekpochapụ
ha n’ebe a na-edebe persisted-request-body. Marker `video_content_removed` e
debere na-eme ka continuation `previous_response_id` mechie n’enweghị ụzọ,
kama iwughachi ederede a tụfuru n’amaghị ama. Ọ bụrụ na arịrịọ a hụrụ tufuo
per-part redaction shadow ya tupu logging, ma ọ bụ ọbụna otu n’ime ọtụtụ video
shadows adabaghị mgbe mgbanwe arịrịọ mechara, a na-ahapụ body arịrịọ ahụ kpamkpam
kama idebe transcript e kpochapụrụ n’akụkụ ụfọdụ.

Maka arịrịọ a hụrụ, azịza model nwere ike ihota akụkụ ọ bụla nke transcript
na-enweghị ókè structured cue. Ya mere a na-eji omission marker dochie
`responseBody` ya dị na call-log e debere; a naghị edebe pipeline artifact
zuru ezu (nke nwere ike ịgụnye bodies upstream/client na stream chunks).
Semantic, idempotency, na reasoning-replay caches na-amapụ reads na writes
maka arịrịọ ahụ. Arịrịọ provider na azịza onye ahịa hụrụ ka dị unchanged.
A na-agbapụta early keepalive bytes site na temporary buffer mgbe a hapụrụ
artifact zuru ezu. Ịdọ aka ná ntị Kiro banyere malformed EventStream na-akọ
naanị payload byte count, ọ dịghị mgbe ọ na-akọ ọdịnaya ya ma ọ bụ raw error
nke JSON parser.
Nke a apụtaghị na a nyochala diagnostic provider/plugin ọ bụla na-abụghị nke a;
a na-esochi nyocha retained-sink sara mbara na #11658.

Usoro ndụ nke `/api/modality-bridge/video/drilldown` dị n’ime bụ cache substrate
dị iche, nke loopback/token-authenticated. Ọrụ ọ bụla na-achọkwa canonical opaque
principal ID. Tupu emee ka onye na-akpọ production rụọ ọrụ, ọ ga-esite na tenant
authenticated nweta ID ahụ, ọ dịghịkwa mgbe ọ ga-ebuga uru onye ahịa họpụtara.
Cache keys na-ejikọta principal ahụ na canonical session na video-reference IDs,
na-echekwa naanị keys sitere na SHA-256, ma na-amachi ma reads na deletion na
otu principal ahụ. Cache na-echekwa ihe karịrị derived JPEG frames 16 kwa entry
anaghị ekwe, na-eme ka ha gwụ mgbe nkeji iri gachara, ma na-akwado reads
`start`/`end` nwere oke ma ọ bụ session deletion doro anya.

Principal ọ bụla nwere oke entries 16 na canonical JPEG data 64 MiB. Oke ndị a
dị iche na global ceiling nke 64-entry/256 MiB: nrụgide quota nke principal na
ewepụ naanị entries least-recently-used nke principal ahụ tupu atụlee global
LRU eviction. A na-asachapụ entries gwụchara site na principal na global
accounting abụọ ahụ mgbe cache na-arụ ọrụ, ebe cancellation na validation
failure anaghị edebanye replacement akụkụ ya.

Cache ahụ na-ajụ Base64 na-abụghị canonical, padding karịrị akarị, media na-abụghị JPEG, JPEG ndị mebiri emebi ma ọ bụ ebipụchara, yana JPEG ndị na-emepụta ịdọ aka ná ntị n’oge bounded full-image `sharp`
decode. Ọ na-edeghachi onyonyo ọ bụla a nabatara ka ọ bụrụ JPEG canonical, na-enweta obosara na ịdị elu site na bytes ndị a decode-rịrị kama ịtụkwasị obi n’ubi caller nyere, ma na-atụfu bytes polyglot ọ bụla dị n’azụ kama idowe ha. Naanị bounded canonical compressed buffer ka a na-agụnye na quotas abụọ ahụ. Oke JSON wire gụnyere Base64 overhead maka oke decoded-input nke 32 MiB. Ihe
derivation ọ bụla echekwara na-edekọ JPEG format/resolution a kwadoro, iwu sampling,
ụdị derivation, oge e kere ya, content hash nke server gbakọrọ, yana parent reference a hash-rịrị tinyere parent-content hash nke caller tụkwasịrị obi. A na-enyocha cancellation n’etiti usoro decode/hash asynchronous tupu cache commit atomic.

Producer nke production na-eji broker frames e mepụtalarị eme ihe ọzọ naanị mgbe visual analysis gachara nke ọma, na-enweghị nbudata ma ọ bụ iwepụta vidiyo ọzọ. Ọ chọrọ operator
`modalityBridgeVideoDrilldownEnabled=true`, `drilldown: true` siri ike n’akụkụ ọ bụla, yana authenticated API-key record ID. Principal/session values nke client kwupụtara anaghị eguzobe ownership. Ọ bụrụ na otu n’ime ọnọdụ atọ ahụ adịghị, ọ naghị hash, resize ma ọ bụ debe frames ndị ọzọ. Ọ bụrụ na retention ada, a ka na-echekwa visual response a pụrụ iji.

JSON na SSE responses ndị gara nke ọma na-egosi opaque handles ruru anọ kachasị n’ime header
`x-omniroute-video-drilldown` a kpara ókè. Browser origins ndị e nyere ikike nwere ike ịgụ header ahụ n’enweghị ịgbasa iwu CORS origin. Handles ọhụrụ na-eji `v1.<32-byte random base64url
token>`, registry ahụ na-edobekwa naanị SHA-256 hashes ha. Reader/header parser na-anabatakwa tokens legacy 64-hex. Public consumer authenticated bụ
`GET /api/v1/video-bridge/drilldown?handle=...`, a na-achịkwa ya iche site na
`modalityBridgeVideoDrilldownRemoteEnabled=true`. Persisted false doro anya na-ewepụ ohere ọbụna mgbe legacy `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env
fallback dị. Production retention nwere fallback legacy yiri ya
`OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED`. Fallback abụọ ahụ na-amalite n’ọnọdụ off.

Consumer ahụ na-enweta ownership site na authenticated key ma na-etinye iwu key:
ma GET ma DELETE so n’ụdị endpoint `video`, tinyere aliases `/v1`
na `/api/v1`. Keys nwere endpoint allowlist na-abụghị efu ga-enwerịrị `video`;
keys na-enweghị mmachi ka na-arụkọ ọrụ n’ụzọ kwekọrọ. Consumer ahụ
na-eweghachi 404 otu ahụ maka handles a na-amaghị, ndị kubie ume, na nke key ọzọ. Ọ na-anabata
`variant=preview|standard|detail` (oke JPEG dimension 320/640/1280, ọ dịghị mgbe a na-upscale),
`limit=1..8` (ma ọ bụ legacy `frames` alias, ọ dịghị mgbe ha abụọ), `page` sitere na zero, na `start`/`end` focus seconds ndị nhọrọ. A na-ajụ query keys ugboro abụọ na focus windows tụgharịrị. Variant ọ bụla a weghachiri nwere hash nke actual content ya na metadata actual resolution ya, jikọtara na source echekwara. A na-emepụta variants mgbe a na-agụ ha kama idowe ha dịka copies ndị ọzọ echekwara. JSON response, tinyere Base64/envelope, nwere oke 32 MiB; page karịrị oke na-eweghachi 413, client ga-arịọ frames ole na ole. Reads na-enyocha cancellation gburugburu resize ọ bụla ma na-enyochakwa ịdị irè handle tupu iweghachi. `DELETE` nke owner na-eme idempotent; nhichapụ ma ọ bụ TTL expiry na-ahapụ source echekwara ma wepụ ya na usage accounting.

Shared store bụ process-local: handles na-ekubi ume mgbe restart gasịrị, a pụghịkwa ịnyefe ha n’etiti OmniRoute processes nọọrọ onwe ha. Management stats na-egosi retention/
remote policy dị irè yana ọnụ ọgụgụ jikọtara nke entries/bytes echekwara naanị, ọ dịghị mgbe media, references, principal IDs ma ọ bụ handles. Video settings panel na-egosi ụkpụrụ ndị ahụ ma nwee ike ichekwa consent switches abụọ ahụ. Akwụkwọ nkọwa implementation a abụghị ihe àmà nke live deployment ma ọ bụ promotion; a na-edekọ nnabata real-model iche.

A na-caption frames n’usoro n’iji Video model ahaziri. Video override efu na-eketa ntọala Vision; ọ bụrụ na ha abụọ efu, Vision
auto-router na-ahọrọ model vision-capable dị irè. Captions gara nke ọma na-edochi akụkụ mbụ site na prefix kwụsie ike `[Video description:` nke na-akakwa ederede ahụ dị ka observation sitere na media na-enweghị ntụkwasị obi ma na-agwa downstream
models ka ha ghara iso ntụziaka ndị a hụrụ n’ime media. Frame-caption cache keys gụnyere JPEG bytes, prompt, timestamp, na effective model; naanị captions gara nke ọma ka a na-cache. Cache entries na-echekwa actual successful producer model, gụnyere fallback model; bridge na-akọ `mixed` mgbe models dị iche iche mepụtara frames dị iche iche. Cache hit na-eji producer identity ahụ ọzọ kama ịkpọ ya aha dịka requested routing plan. Whole-video result
cache na-eji input ọ bụla na-agbanwe output eme key — prompt, effective
model, sampling policy, frame count, semantic analysis mode, SHA-256
fingerprint nke normalized focus hint, focus window, `transcript`,
`audioTranscript`, na contact-sheet flag — ya mere ịgbanwe akụkụ ọ bụla n’ime ha bụ cache miss, ọ bụghị stale reuse. Visual dedup policy
version, threshold, na bounded candidate-frame count bụkwa ihe doro anya n’ime result-cache key na metadata; ya mere mgbanwe policy enweghị ike iji whole-video description ochie ọzọ. Result-cache v4 metadata na-edobe mode na
fingerprint, ọ dịghị mgbe raw user task. Guardrail metadata na-akọ ma requested ma effective analysis modes; requested `focused` mode na-enweghị user text a pụrụ iji na-akọ dị ka effectively `full`.

Guardrail ahụ na-ewepụta akụkụ vidiyo niile akwadoro mana ọ naghị akọwa karịa
`modalityBridgeVideoMaxVideos`. Maka target e gosipụtara na
`supportsVideo === false`, vidiyo dara ada na nke gafere oke na-aghọ akara ederede
doro anya ma dị nchebe ka vidiyo raw ghara ịlanarị. Mgbe amaghị ikike ahụ, akụkụ ndị
ahụ na-ejigide video carrier ha; transcript fallback ọ bụla na-agbaso ntụgharị ederede
nwere oke nke a kọwara n’elu. Targets nwere `supportsVideo === true` na-agafe bridge ahụ.
Client request abort signal na-agafe n’ime nbudata, broker queue, subprocesses, na caption
calls; aborts na-akwụsị n’etiti vidiyo ma ghara ịda n’ụzọ na-ahapụ raw media.

A na-echekwa runtime settings n’ime DB ma Zod na-enyocha ha:

| Key                                 | Default     | Range / behavior                                                                                         |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime nhọrọ, a ga-ahọrọ iji tinye ya                                                                   |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` na-echekwa captions izugbe; `focused` na-eji bounded, untrusted latest-user context               |
| `modalityBridgeVideoModel`          | `""`        | Keta Vision Bridge model                                                                                 |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                     |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, ma ọ bụ proportional `segment_aware`; ọdịda detector na-alaghachi na `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                      |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                           |

A na-amachi ụkpụrụ Video timeout ochie ndị echekwara karịrị sekọnd 120 n’ogo broker
deadline; a na-ajụ settings writes ọhụrụ karịrị oke ahụ.
`GET /api/modality-bridge/video/runtime` chọrọ trusted stamped loopback locality tupu
authentication ma ọ bụ runtime probing, ma mesịa chọọ management auth. Ọ na-eweghachite
naanị `available`, nsụgharị FFmpeg/ffprobe a sachara, na ihe kpatara ya nke e doziri mgbe
runtime adịghị. Internal extraction endpoint abụghị public upload API: queue saturation
na-eweghachite `503` tinyere `Retry-After`, caller disconnect na-eweghachite `499`, ma
broker deadline a doziri na-eweghachite `504`. Converted responses na-agbakwunye
`video->text;model=<visionModel>;parts=<videos>` na central
`x-omniroute-modality-bridge` header n’enweghị iwepụ Vision ma ọ bụ Audio segments.

### Ihe nkpuchi PII (`piiMasker.ts`)

Na-agba ọsọ **ha abụọ** ogbo.

- **`preCall`** na-ekpuchi ụgwọ ọrụ, na-ejegharị `system`, `messages`, `input`, na `prompt` (gụnyere ihe ndị dị larịị), ma tinye `processPII()` (site na `@/shared/utils/inputSanitizer`) na eriri `content`/`text` ubi. Mgbe `PII_REDACTION_ENABLED=true`, achọpụtara PII na-agbazigharị na nkwụ ụgwọ ọpụpụ. Nke a nọọrọ onwe ya na `INPUT_SANITIZER_MODE` (nke na-ejikwa naanị amụma ịgbanye ngwa ngwa). Mgbe mweghachi ahụ gbanyụrụ, nchọpụta ndekọ ndekọ oku na-agụta na-enweghị idegharị ọdịnaya.
- **`postCall`** miri-clones nzaghachi, na-agba `sanitizePIIResponse()` gbakwunyere azịza-API-ụdị masker (`maskResponsesOutput` — na-ekpuchi `output_text` na `output[].content[].text`). Ọ bụrụ na mmegharị ọ bụla emee, nzaghachi gbanwetụrụ na-anọchi nke mbụ.

Ụzọ nche adịghị egbochi; ọ na-akọwa naanị (`meta.detections`, `meta.redacted`) ma ọ bụ degharịa.

#### Nhọrọ ụdị ọ bụla, usoro omenala na ọnụọgụ nchọpụta

**Ntọala → Dashboard → Nchekwa → PII masking** na-ahọrọ _ihe_ mkpuchi. Ọ naghị agbanye nkpuchi: nke ahụ ka bụ `PII_REDACTION_ENABLED` (arịrịọ) na `PII_RESPONSE_SANITIZATION` (azịza + SSE), ha abụọ na-agbanyụ na ndabara.

- **Nhọrọ nke ụdị ọ bụla** — e depụtara ids arụnyere na `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Etughari pụtara ụdị ọ bụla (omume tupu ntọala a adị). Maapụ ụkpụrụ `ssn_us` nke injin arịrịọ ahụ gaa na `ssn`. Templates (Opekempe, Ọkọlọtọ, Financial, Brazil, USA, GDPR, POPIA, Full) na-eju naanị igbe nrịbama dị na UI.
- **GDPR na POPIA nchọpụta** — iri na abụọ ejiri arụnyere ID na-ekpuchi EU na South Africa njirimara onwe onye (okpokoro dị n'okpuru). Ha regexes, validators na ikike mkpado na-ebi n'otu tebụl, `src/shared/utils/piiPatterns.ts`, nke ma nzaghachi sanitizer (`src/lib/piiSanitizer.ts`) na arịrịọ masker (`src/shared/utils/inputSanitizer.ts`) na-eri. A na-emegharị egwuregwu naanị mgbe onye nkwado ya nabatara ya; a iferi ọsọ nke digits mgbe ezuru. Onye na-arụ ọrụ nke chekwaa nhọrọ warara tupu id ndị a adị adị na-edobe omume o nwere ruo mgbe akara ọhụrụ ahụ ga-enweta akara.
- **Usoro omenala** — ruo 20 regex ma ọ bụ ụdị kaadị ọhịa (`*` = ruo mkpụrụedemede 64 na-abụghị ndị ọcha, `?` = otu). Egwuregwu na-aghọ `[CUSTOM_REDACTED]`. Usoro ọ bụla na-aga site na `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): na kacha 500 mkpụrụedemede, ọkọlọtọ na-ejedebe na `g i m s u`, ga-achịkọta, ga-agafe `safe-regex` (azụmazụ ọdachi), ma ghara ikwekọ na eriri efu ma ọ bụ ebe nchekwa redaction. A na-ajụ ụkpụrụ nke dara mgbe echekwara na mgbe a nwalere ya, a na-amafe ahịrị echekwara na-adaghị n'oge ọsọ kama achịkọta ya. Ụdị omenala na-agba naanị mgbe a na-ekpuchi ihe mkpuchi.
- **Ọnụ ọgụgụ nchọpụta** — n'ụdị ọ bụla agụta (ụkpụrụ anaghị adabara), ejidere na ebe nchekwa wee malitegharịa na ịmalitegharị (`src/lib/pii/piiDetectionStats.ts`). Ha na-abawanye naanị mgbe masking na-agbanye.

Ntọala ahụ na-ebi na tebụl `key_value` (aha oghere `pii_settings`, `src/lib/db/piiSettings.ts`) ma na-agụ ya site na cache 1 s. API:

| Usoro  | Ụzọ                      | Ebumnuche                                                                  |
| ------ | ------------------------ | -------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Ọnọdụ flag, `enabledTypes`, `customPatterns`, ọnụọgụ nchọpụta              |
| `PUT`  | `/api/settings/pii`      | Dochie `enabledTypes` (`null` = niile) na/ma ọ bụ `customPatterns`         |
| `POST` | `/api/settings/pii/test` | Nnwale otu ụkpụrụ megide sample kacha elu 8 KB; a naghị echekwa ihe ọ bụla |

Ha atọ chọrọ nyocha njikwa ma kwado ahụ ya na Zod (`src/shared/validation/schemas/piiSettings.ts`). Site na nbanye nwere nkwarụ (`requireLogin=false`) `GET` na njedebe ule emeghere, mana `PUT` ka chọrọ nnọkọ dashboard, igodo `manage` -scope API, akara ohere `oma_` nwere oke ederede ma ọ bụ karịa, ma ọ bụ akara CLI ma ọ bụ akara ọrụ ime ezitere site na loopback.

#### GDPR (EU) na POPIA (South Africa) nchọpụta

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

N'ihi na usoro naanị nke digit na-adaba na nọmba usoro, wuo nọmba na akara oge, ndị na-adịghị ike (`za_vat`, `za_tax_ref`) chọrọ akara okwu, na ọnụọgụ `0..` nke nwere ọnụọgụ iri adịghị emeso dị ka nọmba ekwentị South Africa. IBANs oghere (`GB29 NWBK ...`) adabaghị. N'ụzọ nkwanye ugwu a na-ele anya elu n'ime mkpọ dị ugbu a naanị. Id ndị ahụ na-anọdụ n'ihu usoro ekwentị ọnyà, yabụ ihe njiri mara nke ọma na-edobe ebe ya (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Ụdị `gdpr` na `popia` na-ahọrọ ids EU na South Africa n'otu n'otu. Ikpuchi n'onwe ya na-anọgide na-abanye (Hard Rule #20): ọ nweghị ihe ebe a na-agbanwe ndabara ọkọlọtọ-flag.

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
