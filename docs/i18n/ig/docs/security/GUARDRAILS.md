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

## Ihe Mgbochi Arụnyere N'ime

Registry na-ebudata ihe mgbochi isii na-akpaghị aka n'usoro mkpa mgbe a na-ebubata ya
(lee `registry.ts` → `registerDefaultGuardrails()`):

| Mkpa | Aha                 | Oge (stage)    | Faịlụ                 |
| ---- | ------------------- | -------------- | --------------------- |
| `5`  | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`  | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`  | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10` | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20` | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95` | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Ọnụọgụ mkpa dị ala na-agba ọsọ **mbụ**.

### Àkwà Ọhụụ (`visionBridge.ts`) — Modality Bridge PR-1

Ụdị isi GLM 5.3 na `glm-5.3-{low,high,max}` nwere metadata registry/spec doro anya nke
`supportsVision:false`. Ụdị GLM 5.3 Flash ka bụ ụdị nwere ọhụụ nke ala ha. Ụzọ Claude Code `/v1/messages` na-abanye n'agbụ ihe mgbochi pre-call nkekọrịta `handleChat` **tupu** ntụgharị Claude-na-OpenAI; a ga-akọwa ma ọ bụ hazie onyonyo nsonaazụ ngwa `Read` ndị dị n'ime tupu ntụgharị ahụ ebuli ha gaa n'ime ọdịnaya OpenAI `image_url` (#17069).

Ọ na-ejide arịrịọ nwere onyonyo ezubere maka **ụdị na-enweghị ọhụụ**, ma ọ na-eme otu n'ime ihe ndị a: tụgharịa arịrịọ ahụ dum gaa n'ụdị nwere ike ịhụ ụzọ, ma ọ bụ dochie akụkụ onyonyo ahụ site na nkọwa ederede nke ụdị ọhụụ a na-ahazi wepụtara tupu oku upstream. Nke a na-eme ka ndị na-enye ọrụ ederede naanị nwee ike ijikwa payload multimodal n'ụzọ a na-adịghị ahụ anya.

Usoro:

1. Mafee ma ọ bụrụ na ụdị a chọrọ na-akwado ọhụụ ugbua (ọ gwụla ma ọ pụtara na ndepụta a manyere `isVisionBridgeForcedModel`).
2. Wepụ akụkụ onyonyo site na `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), nke na-enyefe ọrụ ahụ n'aka **onye nchọpụta media jikọtara ọnụ** `detectMediaParts()` dị na `open-sse/utils/mediaParts.ts` — ọ bụ naanị ebe eziokwu nke a na-ekekọrịta na ihe nzacha ndakọrịta combo.
   A na-ahapụ naanị ụdị nhazi nke `replaceImageParts` nwere ike ịkpụnyeghachi (nkwekọrịta extract↔replace): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`, na Responses API `input_image`.
   A na-ewepụ ma dochie onyonyo dakọtara ndị dị n'ime `tool_result.content` Claude Code na nsonaazụ ngwa Responses n'okporo ụzọ mbụ ha; ụdị na-egosi naanị ọnụnọ bụ naanị ihe combo-filter na-eji, a naghị ewepụ ha.
   Mafee ma ọ bụrụ na ahụghị nke ọ bụla.
3. Kpebie nhazi oge ọsọ site na `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): igodo ntọala `modalityBridge*` ọhụrụ na-emeri; igodo `visionBridge*` ochie ka bụ **ndabere otu okirikiri** (oge rollback). Mafee tupu ịgafe media ọ bụla ma ọ bụrụ na agbanyụrụ àkwà ahụ.
4. Onye họpụtara ọnọdụ (`modalityBridgeVisionMode`, lee tebụl dị n'okpuru) na-ekpebi ntụgharị ma ọ bụ nkọwa. Ntụgharị na-eweghachi `modifiedPayload` nke naanị `model` gbanwere, tinyere meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Ụzọ nkọwa: kpachie onyonyo na `maxImages`, hazie mkpali maara ọrụ ahụ, lelee cache nkọwa, kpọọ ụdị ọhụụ ahụ **n'otu oge**
   (`Promise.allSettled`), ma tinye akụkụ ederede `[Image N]: <description>` n'ebe ha dị.
   Nkọwa dara ada na-enye `null`: a na-echekwa onyonyo raw maka targets a na-amaghị ama/nwere ike ịhụ ụzọ (#4012), mana **target ederede naanị a kwadoro ozugbo** ma ọ bụ combo na-enweghị ọhụụ na-enweta stub ederede doro anya
   `(unavailable — no vision-capable provider connected)` maka onyonyo ọ bụla a na-akọwaghị, gụnyere ọdịda ụfọdụ na onyonyo gafere oke oku nkọwa (#17069).
   Ndabere nkọwa combo nke ọdịda ha niile dị adị ka dịkwa (#8430).
6. Weghachite `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Onye họpụtara ọnọdụ (`modalityBridgeVisionMode`)

| Ọnọdụ      | Ndabara | Omume                                                                                                                                                                                                                                                       |
| ---------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | Heuristic ochie, agbanwebeghị (#6640/#7204): ụdị na-abụghị combo/`auto/` na-atụgharị gaa n'ụdị ọhụụ kacha mma ọ gwụla ma ụdị mbụ ahụ enweelarị nzere enwere ike iji (mgbe ahụ ọ na-akọwa); targets combo na-akọwa mgbe niile.                               |
| `describe` |         | Na-akọwa mgbe niile — a na-awụpụ ngọngọ ntụgharị kpamkpam; ụdị onye ọrụ họọrọ bụ ya na-aza mgbe niile.                                                                                                                                                      |
| `reroute`  |         | Manye ntụgharị: a na-awụpụ nchedo ụdị nwere nzere. Nchedo nzere nke **target** ntụgharị ka na-arụ ọrụ — mgbe enweghị target ọhụụ enwere ike iji, àkwà ahụ na-egbochi site na njehie doro anya kama ịkọwa ma ọ bụ iziga onyonyo raw na target ederede naanị. |

Ọnọdụ ndị a manyere na-akwụsị usoro **tupu** heuristic `auto` agba ọsọ; omume `auto` bụ otu byte na byte na ihe mgbochi ahụ nwere tupu PR-1.

#### Oke igodo API (`visionBridgeKeyScope.ts`)

Mgbe igodo API onye na-akpọ na-amachibido `allowedConnections`, ọdọ quota
(`allowedQuotas`) ma ọ bụ ụdị model (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), bridge na-ahọrọ
naanị reroute na describe models nke igodo ahụ nwere ike iji, na connections
igodo ahụ nwere ike iji. Kpọọ describe ahụ na-agafe mgbe niile na OmniRoute
self-loop site na isiokwu `x-omniroute-self-loop-key-id`, ya mere arịrịọ chat
na-anata na-amanye iwu connection na model nke igodo ahụ ọzọ.
`enforceApiKeyPolicy()` na-asọpụrụ isiokwu ahụ naanị mgbe ejikọtara ya na
self-loop bearer, ya mere ọ nwere ike ibelata ohere naanị, a na-ajụkwa id
na-adịghị edozi.

Ọ bụrụ na e kweghị ka igodo ahụ jiri vision model ọ bụla, **target ederede naanị
e kwadoro** na-ajụ arịrịọ onyonyo ahụ n'ime obodo site na HTTP 400 doro anya kama
iziga bytes onyonyo ahụ na upstream na-enweghị ike (#17069). Maka targets nwere
ike vision a na-amaghị ma ọ bụ nke ha nwere n'onwe ha, ụzọ describe na-edobe
omume fail-open ya gara aga (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Arịrịọ na-enweghị igodo, na igodo na-enweghị mmachi ndị a, na-akpa àgwà kpọmkwem
dị ka ọ dị na mbụ.

#### Nkọwa prompt nke maara ọrụ (`modalityBridgeVisionTaskAware`)

Ndabara bụ **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) na-agbakwunye
ederede nke **ozi onye ọrụ ikpeazụ** (e belatara ya ruo mkpụrụedemede 500) na
describe prompt ntọala, na-eduzi nkọwa ahụ n'ihe onye ọrụ jụrụ n'ezie
(pattern codex-vision-proxy) ma na-arịọ vision model ka ọ depụtaghachi ederede
a na-ahụ anya. Mgbe agbanyụrụ flag ahụ — ma ọ bụ mgbe ederede onye ọrụ adịghị —
a na-eji prompt ntọala ahụ emeghị mgbanwe.

Arịrịọ OpenAI-compatible nke describe self-loop n'onwe ya
(`callVisionModelSingle()` na `visionBridgeHelpers.ts`) na-arịọ `image_url.detail: "high"`
mgbe niile — n'enweghị ọnọdụ, maka caller/provider ọ bụla, ọ naghị adabere na
client signal ọ bụla. Sampling nke detail dị ala na-ebelata izi ezi OCR kpọmkwem
maka ọrụ transcribe ederede nke prompt a na-arịọ, ya mere describe call n'onwe ya
na-arịọ detail dị elu mgbe niile n'agbanyeghị ọkwa detail nke arịrịọ inbound mbụ
jiri. Nke a na-emetụta naanị request body nke describe dị n'ime; ọ naghị agbanwe
otu OmniRoute si ebufe `image_url.detail` nke arịrịọ caller n'onwe ya na primary
request — a na-etinye ndabara ahụ iche, naanị maka clients OpenCode achọpụtara, na
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Alaka
Anthropic wire-format nke describe self-loop enweghị ubi `detail`, ma ndabara
ọ bụla adịghị emetụta ya.

#### Oke mmepụta describe (`modalityBridgeVisionMaxChars`)

| Igodo                          | Ndabara | Oke                   |
| ------------------------------ | ------- | --------------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` ma ọ bụ 100–50000 |

`0` (ndabara) pụtara **enweghị oke** — a na-ebufe nkọwa nke
`callVisionModel()` weghachiri n'enweghị mgbanwe, na-echekwa omume dị adị. Uru
ọ bụla dị n'etiti 100–50000 na-ebipụ nkọwa ahụ site na suffix `…` tupu e tinye ya
azụ dịka `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` na `src/lib/guardrails/visionBridge.ts`).
Welie nke a maka ọrụ OCR chọrọ detail dị ukwuu ebe model downstream chọrọ
transcription zuru ezu; belata ya iji kpachie ojiji token na vision models na-ekwu
okwu ogologo.

Ubi dashboard ahụ dị na panel Advanced nke taabụ Vision
(`modality-bridge-max-chars` na `ModalityBridgeVisionTab.tsx`) ma na-ebuli uru
ọ bụla dị n'etiti 1 na 99 ruo n'ogo ala 100, ebe ọ na-ahapụ `0` doro anya ka ọ
ghara ịgbanwe — `0` bụ uru Zod ziri ezi n'onwe ya
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ọ bụghị naanị
ndabara “edobeghị”.

#### Cache describe (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL dị n'ime ebe nchekwa maka outputs describe, nke usoro process
dum na-ekerịta. Igodo = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
nke na-eji length-prefix framing (enweghị esemokwu oke ubi). Akụkụ model bụ bridge
model **ahaziri**, ọ bụghị model zara n'ezie —
`callVisionModel` nwere ike ịdaba n'ime ya, ma iji keying kwa attempt ga-ekewa
cache n'ime akụkụ. A naghị echekwa describes dara ada. Ntọala:

| Igodo                           | Ndabara | Oke     |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Nhazi onyonyo remote (self-loop describe/base64 fetch)

Mgbe bridge n'onwe ya na-ebudata onyonyo **remote** — Anthropic describe
self-call na mgbanwe base64 nke claude-wire-format
(`ensureBase64ImagesForClaudeWire`), ha abụọ site na
`fetchRemoteImageAsDataUri()` na `visionBridgeHelpers.ts` — a na-ebufe data URI
pụtara site na `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) tupu etinye ya n'arịrịọ vision-model.
A na-ebelata onyonyo buru ibu ruo **2048px n'akụkụ ogologo** (nke kwekọrọ na oke
resize OpenAI/Anthropic na-etinyelarị n'akụkụ server), nke na-ebelata bytes/latency
mbulite n'enweghị ịgbanwe ihe vision model na-ahụ. Resize na-eji `sharp`, nke a
na-ebunye site na dynamic import: n'elu platform ebe binary obodo ya na-ada
ịkwado, `normalizeDataUri()` **anaghị atụba njehie ma ọlị** — ọ na-alaghachi n'ibufe
bytes mbụ agbanwebeghị, ya mere ụzọ describe/base64-conversion na-aga n'ihu mgbe
niile. A na-ebufekwa bytes na-abụghị onyonyo (fetch nke weghachighị onyonyo a
decode-gara nke ọma) n'enweghị mgbanwe. Nhazi a metụtara naanị onyonyo bridge
na-ebudata maka self-call nke ya — a naghị etinye ya na payload raw passthrough
nke caller, dịka ụkpụrụ mgbanwe opt-in-only si dị (Hard Rule #20).

#### Atụmatụ ntọala + mbugharị

A na-akwado igodo `modalityBridge*` ọhụrụ site na nkwado Zod n’ime `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, otu `modalityBridgeCache*` nke nwere atọ, na
otu `modalityBridgeAudio*` nke Audio Bridge na-eji. Migration
`141_modality_bridge_settings.sql` na-edepụtagharị ụkpụrụ `visionBridge*` ochie
dị adị gaa na igodo ọhụrụ kwekọrọ (ọ naghị eme mgbanwe ugboro abụọ, ọ dịghịkwa
edegharị ụkpụrụ `modalityBridge*` onye na-ahụ maka sistemụ debere); a ka na-anabata
igodo ochie dị ka ndabere ịgụ maka otu okirikiri mwepụta.

#### Isi nghọta + ọnụ ọgụgụ

Azịza ndị a kọwara ma gbanwee na-ebu
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(`buildModalityBridgeHeader()` na `modalityBridge/bridgeStats.ts` na-ewu ya,
`withModalityBridgeHeader()` dị na `src/sse/handlers/chatHelpers.ts` na-etinye ya).
Arịrịọ ndị a zigharịrị anaghị enweta isi a — emetụtaghị payload ahụ, mgbanwe
model ahụkwa apụtalarị n’ubi `model` nke ahụ azịza.

`GET /api/modality-bridge/stats` (ikikere nchịkwa, n’otu ọkwa ahụ na
`GET /api/settings`) na-eweghachi counters dị n’ime ebe nchekwa maka modality
ọ bụla `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` maka `vision`, `audio`, na
`video`. `averageLatencyMs` na-eji `latencySamples`, ọ bụghị mbọ niile, dị ka
denominator ya; ọrụ na-enweghị oge a tụrụ anaghị emepụta sample efu nke
milliseconds. `bridged` ka bụ aha ndakọrịta azụ maka ntụgharị gara nke ọma;
mbọ dara ada anaghị abawanye ya.
A na-emegharị counters mgbe usoro malitegharịrị site na imewe
(telemetry, ọ bụghị ndekọ ego).

#### Nhazi dashboard

Peeji dashboard raara nye bụ
`/dashboard/settings/modality-bridge`. Taabụ `Vision`, `Audio`, na `Video` nke
URL nwere ike ịkpọ aha na-echekwa query parameters mgbe ha na-agbanwe uru
`tab`. Taabụ Vision na-egosi ịgbanye ya, ọnọdụ, nhọrọ model (gụnyere ndabara
akpaaka), prompting maara ọrụ, oke oge/image/nkọwa-ogologo/cache dị elu,
counters oge ọsọ, na arịrịọ sample e chebere. Taabụ Audio dịkwa ndụ: ọ na-egosi
ịgbanye ya, nhọrọ model STT naanị nke nwere Auto, oke oge/clip kachasị, counters
audio, na ule sample `input_audio`. Taabụ Video na-arụ ọrụ: ọ na-akọ ọnọdụ oge
FFmpeg/ffprobe — otu n’ime ọnọdụ UI anọ doro anya (`unknown` mgbe probe ka na-eme
ma ọ bụ na ọ nweghị ike imecha, `restricted` n’elu host dashboard na-abụghị
loopback ebe a na-amapụ probe n’akụkụ client, `unavailable` mgbe probe mechara ma
kwado na ọ dịghị ya, ma ọ bụ `available` ya na ụdị FFmpeg/ffprobe) — na-echekwa
oke enable/model/frame/video/timeout, na-ahazi nhọrọ model ka ọ bụrụ naanị
model ndị nwere ike vision, ma na-egosikwa counters video.

Kaadị Vision Bridge mbụ dị n’okpuru ntọala AI bụ njikọ ndakọrịta gaa na peeji
ọhụrụ; ọ bụghịzi onye nwe oyiri nke abụọ nke fọm ahụ. Media Providers nwekwara
njikọ maka usoro Image-to-Text na Speech-to-Text gaa na taabụ Modality Bridge
kwekọrọ ekwekọ, n’enweghị iwepụ playground Speech-to-Text dịbu.

**Mwepụ ihe mgbochi nnabata self-loop:** mgbe arịrịọ describe na-agafe na
self-loop `/v1` nke OmniRoute n’onwe ya (model provider na-abụghị ọkọlọtọ),
sub-request ahụ na-eziga `x-omniroute-admission-bypass: internal`, a na-akwadokwa
ya site na credential self-loop e kpebiri — sentinel `sk_omniroute` mpaghara
n’ọnọdụ local, ma ọ bụ igodo gburugburu `OMNIROUTE_API_KEY` /
`ROUTER_API_KEY` nke onye ọrụ haziri (#1350), ka deployments
`REQUIRE_API_KEY=true` wee nwee ike ịrụ arịrịọ describe. A na-asọpụrụ bypass ahụ
naanị maka credentials ndị ahụ kpọmkwem, ya mere clients mpụga enweghị ike iji
isi ahụ gafee admission.

Ndabara ochie dị na `src/shared/constants/visionBridgeDefaults.ts`; mode ọhụrụ,
task-aware, na cache defaults yana settings resolver dị na
`src/shared/constants/modalityBridgeDefaults.ts`. Guardrail na-ekpughe nhọrọ
constructor `deps` ka ule wee nwee ike itinye mmejuputa `getSettings` na
`callVisionModel` adịgboroja.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Ọ na-ejide arịrịọ nkata nwere audio tupu ha erute target a na-amaghị na ọ na-anabata
ntinye audio. Ọ naghị ezigharị arịrịọ nkata ahụ ma ọlị: a na-atụgharị akụkụ audio
site na multipart endpoint dakọtara na OpenAI dịbu, model nkata a họpụtara na-aga
n’ihu site na transcript ederede.

Usoro:

1. Dozie `supportsAudio` site na `getResolvedModelCapabilities()`. Metadata sitere na ndekọ ndị na-eweta ọrụ nwere nkwupụta doro anya na-emeri, soro metadata static nke model, ma mesịa `modalities_input` a synced. Ndepụta input e kwupụtara nke na-enweghị `audio` bụ `false`; ọ bụrụ na enweghị ihe akaebe capability fọdụrụ, ọ bụ `null`. Ma `false` ma `null` na-eme ka conservative bridge rụọ ọrụ, ebe `true` na-agafe ya.
2. Dozie ntọala `modalityBridgeAudio*`, ma wepụta akụkụ audio ndị dị n’ogo elu a pụrụ ịgbakwunye site na ozi ọ bụla site na detector `detectMediaParts()` nkekọrịta. Ụdị wire ndị akwadoro bụ OpenAI `input_audio`, `audio_url`, na `source.media_type: "audio/*"`. A na-achọpụta audio dị n’ime maka routing, mana ụzọ splice anaghị ewepụ ya. A na-amachi ọrụ site na `modalityBridgeAudioMaxClips`; akụkụ ndị na-abịa mgbe e mesịrị na-anọgide otú ha dị.
3. Soro `provider/model` ahaziri, ma ọ bụ kwe ka `selectAudioBridgeModel()` gafee `AUDIO_TRANSCRIPTION_PROVIDERS` n’usoro catalog kwụsiri ike wee họrọ model mbụ nwere nzere provider na-arụ ọrụ ma dị irè.
4. `callAudioTranscription()` na-agbanwe audio base64/data-URI ka ọ bụrụ multipart `file`, ma ọ bụ budata `audio_url` dịpụrụ adịpụ site na nche outbound nke naanị public kwere, tinyere DNS pinning na oke 25 MB. Mgbe ahụ ọ na-eme POST nke file na model ahọpụtara gaa na self-loop `/v1/audio/transcriptions` dị n’obodo, jiri `resolveSelfLoopBearer()` mee authentication. Route transcription dị ugbu a na-eme nchọta nzere nkịtị, njikwa cooldown/rate-limit, na izipu arịrịọ na provider.
5. Oku gara nke ọma na-eji `[Audio N]: <transcript>` dochie akụkụ ha. Oku na-eji `Promise.allSettled` arụ ọrụ: ọdịda nke otu oku na-echekwa akụkụ audio mbụ ahụ (#4012 contract). Ọ bụrụ na oku niile daa ma a gosipụta na target `supportsAudio === false`, akụkụ ndị ahụ na-aghọ
   `[Audio N]: (unavailable — no STT provider connected)` (#8430 contract). Maka target a na-amaghị (`null`), nsonaazụ ọdịda niile na-anọgide n’enweghị mgbanwe. Target a gosipụtara na ọ bụ naanị text, ma enweghị nzere STT bara uru, na-enweta stub doro anya ahụ n’enweghị ịkpọ netwọk.

Transcript ndị gara nke ọma na-eji cache Modality Bridge LRU/TTL nke usoro dum. Igodo ahụ na-ejikọta ntụaka audio, aha ọrụ kwụsiri ike `audio-transcription`, na model STT ahọpụtara; a naghị echekwa ọdịda. Mgbalị audio na-emelite counters `bridged`, `cacheHits`, `failures`, na `lastUsedAt` ndị a na-ekekọrịta. Nzaghachi a gbanwere na-ebu
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; arịrịọ ndị a na-emetụghị aka anaghị enweta segment Audio Bridge.

Ntọala runtime sitere na DB ma Zod na-enyocha ha:

| Igodo                         | Ndabara | Oke                 |
| ----------------------------- | ------- | ------------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                   |
| `modalityBridgeAudioModel`    | `""`    | Auto ma ọ bụ STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000         |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10                |

Cache a na-ekekọrịta ka nọ n’okpuru njikwa `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, na `modalityBridgeCacheMaxEntries`.

### Àkwà Mmiri Vidio (`videoBridge.ts`, `videoBridgePipeline.ts`)

Ọ na-ejide akụkụ vidio ndị dị n’ogo elu n’ime Chat Completions `messages` na Responses
API `input` tupu a kpọọ target na-enweghị nkwado vidio native a maara.
Ụdị ndị akwadoro bụ `input_video`, `video_url`, `video_source`, HTTPS URLs,
na data URI `data:video/*;base64,...`. A naghị ewere aha faịlụ nkịtị dị na text dị ka vidio.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) bụ onye nwe traversal arịrịọ, nlele capability/policy, nchịkọta kwa-arịrịọ, na payload nzaghachi.
Ọrụ kwa-vidio — inweta data, cache nsonaazụ dum, ịkọwa usoro frames
(nke na-ejikọta transcript audio onye kpọrọ nyere), na metrics/abort/cleanup kwa-mgbalị — zoro n’azụ `processVideoPart` dị na
`videoBridgePipeline.ts`, nke a na-akpọ otu ugboro maka akụkụ vidio ọ bụla n’ime loop nke `preCall`.
Module ahụ na-akọwakwa ókè port doro anya `VideoMediaBrokerPort`
(inweta bytes na iwepụta frames a sampled), `VideoAudioTranscriptionPort`
(ijikọta transcript audio onye kpọrọ nyere na captions ndị a sampled), na
`VideoDrilldownPort` (ụdị legacy raw-store). A na-ejikọta production STT na nchekwa frame gburugburu port na-akọwa site na
`createVideoSttAdapter` na `createVideoDrilldownAdapter`; nke ikpeazụ na-eji lifecycle opaque-handle a na-ekekọrịta.

Ụzọ arịrịọ `/v1` nke ọha anaghị ebubata ma ọ bụ kpọọ subprocess. A na-ebudata vidio ndị dịpụrụ adịpụ n’okpuru oke 50 MiB; vidio inline base64 nwere oke conservative nke 36 MiB decoded kwa-vidio ka envelope model/messages/framing wee nọrọ n’ime oke nnabata arịrịọ JSON nke ọha bụ 50 MiB. A na-enyocha ogologo inline na atụmatụ decoded-size tupu allocation. A chọrọ HTTPS na remote URL mbụ na redirect ọ bụla, jiri nche outbound nke naanị public kwere dị ugbu a tinyere DNS pinning. Bytes ndị ahụ na-agafe kpọmkwem ókè broker `POST /api/modality-bridge/video/extract` dị n’ime. Route ahụ bụ ma `LOCAL_ONLY` ma `SPAWN_CAPABLE`, na-anabata naanị arịrịọ loopback a tụkwasịrị obi nke nwere authentication kwa-process, ọ naghị anabatakwa URL, filesystem path, executable, ma ọ bụ ndepụta argument. Pipeline body-size API na onye handler na-agụ body nwayọọ nwayọọ na-amachibido onwe ha, nke ọ bụla, input broker ka ọ bụrụ 50 MiB. Queue ya nwere oke na-eme extraction otu n’otu, na-ekwe ka jobs anọ chere, ma na-amachibido input na-eche ka ọ bụrụ 100 MiB.

N’ime broker ahụ, `ffprobe` na-agụ faịlụ mpaghara nkeonwe; ndepụta ụdịdị ndị a na-anabata na-ewepụ ụdị playlist na manifest. Maka containers ezinụlọ MOV ndị a na-anabata, ntụaka data MOV dị n’èzí ka na-anọgide na-enwe nkwarụ na ndabara, iwu a kapịrị ọnụ anaghịkwa enyere ha aka. Ma `ffprobe` ma `ffmpeg` na-eji whitelist protocol naanị `file`, otu thread, arrays arụmụka a kapịrị ọnụ, enweghị shell, yana executable ndị a na-achọta site na `PATH`. Stream cover nke bụ attached-picture abụghị ndị ga-egwu egwu. Stream niile nwere ike igwu egwu ga-agbaso oke ndị a; a na-ahọrọ stream ndabara e kwuru n’ụzọ doro anya tupu fallback deterministic nke index kacha nta. A na-amachi vidiyo ruo sekọnd 600, pikselụ 8,192 n’otu akụkụ ọ bụla, na pikselụ isi iyi 33,554,432. FFmpeg na-enyocha frames JPEG midpoint 1–16, na-ebelata akụkụ ogologo ruo ihe kachasị 1,024 pikselụ n’enweghị ịmụba obere input, ọ dịghịkwa mgbe ọ na-anata URL. Sampling bụ `uniform` na ndabara. Amụma nhọrọ `scene_aware` na `segment_aware` nke ka nọ na nnwale na-eme otu pass FFmpeg ọzọ a kapịrị ọnụ n’elu stream mpaghara a kwadoro ugbua, na-ahọrọ timestamp scene `showinfo` ndị nọ n’oke, ma na-alaghachi n’ụzọ deterministic na midpoint `uniform` ndị ahụ mgbe detector dara, oge gafere, output adịghị n’usoro, ma ọ bụ mgbe candidate set tọgbọ chakoo. Ụdị segment-aware na-ekesa samples midpoint n’usoro dabere na scene intervals ndị a kwadoro; a kọwara ihe akaebe segment-aware na omume fallback n’okpuru. A na-etinye oke frames 16 siri ike mgbe nhọrọ gachara n’amụma ọ bụla. Mgbe arịrịọ scene-aware nwere naanị mmefu frame otu, ọ na-eji midpoint `uniform` nke full-video window ma ọ bụ focus window nọ n’ọrụ, ma kọọ `policyEffective: uniform`: otu scene frame a họọrọ enweghị ike ichekwa njedebe temporal abụọ ahụ. Onye na-akpọ nwere ike inye focus window nwere oke (`start`/`end` sekọnd); a na-akụda oke ndị ahụ ka ha nọrọ n’ime ogologo oge media, a na-ajụ windows gbanwere usoro ma ọ bụ ndị na-abụghị finite, a na-emekwa amụma sampling niile naanị n’ime interval a haziri nke ọma. A na-etinye window pụta na metadata sampling na prefix nkọwa na-enweghị ntụkwasị obi ka ụdị ndị na-esote nwee ike ịmata excerpt lekwasịrị anya na timeline zuru ezu.

Semantic caption focus bụ ntọala dị iche, nke a na-akọwapụta n’ụzọ doro anya. `full` analysis mode nke ndabara na-echekwa frame prompt dị adị ma ọ dịghị mgbe ọ na-ebuga ederede arịrịọ na caption model. Na `focused` mode, bridge ahụ na-agụ naanị `text`/`input_text` kacha ọhụrụ nke onye ọrụ dere ma na-adịghị atọgbọ n’ime otu Chat ma ọ bụ Responses container ahụ, na-eme ka ọ bụrụ NFC, na-ejikọta control characters na whitespace, ma na-amachi ya ruo Unicode code points 500. Nsonaazụ tọgbọ chakoo na-alaghachi na `full` prompt kpọmkwem. A na-serialize hint bara uru dị ka JSON n’ime dedicated untrusted-user-context block, ọ pụkwara naanị ibute nkọwa a na-ahụ ma ọ bụ nụ ụzọ; ọ gaghị emeri ịdọ aka ná ntị dị iche megide ịgbaso ntuziaka ndị pụtara ìhè ma ọ bụ ndị a na-anụ na media. Textual focus anaghị atụpụta `start`/`end` ma ọ bụ gbanwee temporal sampler.

#### FU-07 akaebe segment nke nhazi

`segment_aware` na-eji otu bounded pre-analysis pass n’elu stream vidiyo mpaghara a kwadoro ugbua. Filter chain a kapịrị ọnụ na-ebu ụzọ belata obosara ruo pikselụ 320 kachasị, chọpụta mgbanwe scene na intervals oyi kpọnwụrụ, ma mesịa sample na frame 1 kwa sekọnd maka blur, average luma, na ozi spatial/temporal. A na-amachi pass ahụ ruo structural samples 600, otu FFmpeg/filter thread, otu protocol na container allowlists nke naanị `file`, oke process-output 1 MiB, yana kacha sekọnd 30 n’ime shared abort/deadline nke broker. Ọ dịghị mgbe ọ na-anabata command, filter, path, ma ọ bụ URL site na request.

Ụkpụrụ structural bụ ihe akaebe sampling deterministic, ọ bụghị nghọta semantic nke vidiyo. Ha anaghị atụpụta subjects, omume, captions, okwu, ma ọ bụ ebumnuche onye ọrụ. Scene na freeze boundaries na-emepụta segments; freeze coverage, blur, exposure, spatial detail, na temporal change na-emetụta naanị otu esi ekesa mmefu frame 1–16 dị adị. A na-amachi segment nke jụrụ kpamkpam ruo otu frame, ebe segments na-abụghị frozen na-asọ mpi maka mmefu fọdụrụ. Mgbe boundaries karịrị frames, a na-echekwa uniform timeline coverage ka cuts ngwa ngwa nke mmalite ghara izochi segment ọdụ dị ogologo. A na-ejikọta scene boundaries ndị dị n’ime mkpebi analysis nke sekọnd 1 site na freeze boundary.

Filters na-efu, evidence na-adịghị n’usoro ma ọ bụ tọgbọ chakoo, njehie detector, ma ọ bụ timeout pre-analysis a bounded na-eme ka usoro ahụ laghachi na uniform midpoint policy kpọmkwem. Abort nke onye na-akpọ ma ọ bụ deadline broker anaghị eme fallback: ọ na-akwụsị subprocess na-agba ugbu a, gbochie extraction frame nke mechara, ma wepụ private temporary tree n’ime `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` na-emepụta fixtures FFmpeg n’ezie ma deterministic maka nchekwa caption-call mgbe dedup gasịrị, nkesa budget dense-motion, akaebe blur/exposure/SI-TI, cuts ngwa ngwa nwere ọdụ dị ogologo, na false positives nke gradual-fade. Ọ na-edekọ wall time nke pre-analysis na, mgbe `/usr/bin/time` dị, CPU child na peak RSS. Quality checks ya bụ structural oracles naanị. Quality nke caption-model n’ezie ka bụ `HOLD` n’ihi na harness a enweghị authorized endpoint ma ọ bụ frozen judge. Ego a na-echekwa ka bụ `HOLD` ọ gwụla ma `--caption-cost-per-call-usd` nyere atụmatụ ego doro anya ma dị mma maka oku ọ bụla; script ahụ anaghị emepụta nsonaazụ ọ bụla n’ime ha n’ụzọ ụgha.

Fremu ọ bụla nwere oke 4 MiB, fremu raw niile jikọtara nwekwara oke 23 MiB, ebe nzaghachi broker a serialize-rịrị nwere oke 32 MiB. A na-ewepụ ndekọ nwa oge nkeonwe na
`finally`. OmniRoute anaghị etinye FFmpeg n’ime ngwugwu ya, ọ naghị anabatakwa ụzọ executable omenala. Tupu ịmepụta caption, bridge ahụ na-eme usoro visual deduplication nwere nlezianya: a na-ebelata JPEG ọ bụla ka ọ bụrụ buffer grayscale nke 16×16, ma jiri naanị fremu ikpeazụ echekwara tụnyere ya. Maka mmefu caption a rịọrọ nke karịrị otu fremu, extraction na-enye ọdọ mmiri candidate nwere oke ruru ugboro abụọ nke mmefu ahụ, ma ghara ịgafe fremu 16. A na-etinye oke a rịọrọ naanị mgbe deduplication gachara; mgbe mmefu ahụ dịkarịa ala abụọ, a na-echekwa candidate mbụ na nke ikpeazụ ahọpụtara n’oge thinning ikpeazụ. Iwu a nwere ụdị
`grayscale-16x16-mean-cells-v2` na-eji nke ka ukwuu n’etiti mean luma delta na ratio nke sel thumbnail ndị normalized delta ha ruru opekata mpe 0.05. Threshold maka duplicate bụ constant 0.04, nke ahọpụtara maka ịdị mfe ịkọ amụma kama ime ya runtime setting a na-ahụ anya. Ihe ngosi high-contrast nke abụọ a na-echekwa obere mmegharị na mgbanwe ederede a na-ahụ anya nke ntụnyere dabere naanị na mean nwere ike izochi. Njehie comparator ma ọ bụ decoder anaghị emechi usoro ahụ, kama ọ na-ahapụ coverage ka ọ dịrị. Metadata mmepụta na-ekewa candidates e wepụtara, fremu ejiri nke ọma, na duplicates anya a tụfuru.

Akụkụ vidiyo e ji akara doo anya nwere ike ịrịọ contact sheet nwere timestamps. Bridge ahụ na-ewu grid JPEG nwere kọlụm ruru 4 na fremu ruru 16. Sel ọ bụla nke pikselụ 512 na-etinye timestamp sitere na ya n’ime band dị elu-contrast dị n’okpuru, ebe timestamps ndị ahụ ka na-adịkwa na metadata ederede maka njikọ na nyocha downstream. JPEG zuru ezu ka nwere oke 32 MiB. Ọ bụrụ na `sharp` enweghị ike decode ma ọ bụ compose grid ahụ, bridge ahụ na-alaghachi na fremu JPEG nke ọ bụla; abort nke client ka na-agafe n’ọrụ sheet ahụ.

Ihe akaebe maka promotion dị iche kpamkpam na microbenchmark nke synthetic composition. `scripts/perf/video-bridge-contact-sheet-eval.ts` na-akọwa A/B harness nwere schema version maka ụdị vision model ndị dabara na OpenAI. Ọ na-atụ tokens ndị provider kọrọ, wall latency site na mmalite ruo ọgwụgwụ (gụnyere composition nke sheet), ọnụ ọgụgụ model-call, na idebe fact nke manifest kọwara. A naghị ede nzaghachi raw nke model n’ime report; naanị digests SHA-256 na fact IDs dakọtara ka a na-echekwa. Harness ahụ anaghị eme network call ma ọ bụ paid model call ọ bụla ma ọ bụrụ na e nyefeeghị `--execute-real`, ma hazie `--model`, `OMNIROUTE_BASE_URL`, na `OMNIROUTE_API_KEY`. Enweghị real run doro anya dị otú ahụ, verdict ya nke machine nwere ike ịgụ ka na-anọgide `HOLD`; nha synthetic payload/call-count naanị ya abụghị ihe akaebe promotion.

`scripts/perf/video-bridge-promotion-eval.ts` dị iche na-anakọta observations FU-07 ma ọ bụ FU-09. Ịnabata promotion chọrọ ụdị synthetic scenario asatọ niile tinyere clip real a sachara, repetitions atọ a tụrụ opekata mpe maka role na case ọ bụla, metrics iri niile ekwupụtara, digests media/prompt/expected-fact/settings ndị e kpochiri, observation IDs pụrụ iche, na usoro A/B seeded nke a nyochara. Receipt nke execution na-ejikọta corpus digest, candidate SHA kpọmkwem, na model revision. Nha na-efu ma ọ bụ na-adịghị mma ka na-anọgide `HOLD`, gụnyere CPU karịrị 30 s, peak RSS karịrị 512 MiB, ma ọ bụ pre-analysis karịrị 30 s. Ndị a bụ oke nnabata ihe akaebe, ọ bụghị nkwa ọhụrụ na runtime RSS ga-amanye oke.

FU-07 chọrọ idebe quality opekata mpe 98% na p95 latency nke na-agaghị akarị 1.2x baseline, tinyere otu n’ime ihe abụọ: mmụba 0.05 absolute n’ime case-balanced mean recall mgbe mean caption calls ha nhata, ma ọ bụ mbelata mean post-dedup caption calls nke opekata mpe 10%. FU-09 chọrọ quality opekata mpe 0.85, retention 95%, mbelata median latency 20%, na mbelata tokens 10%. Ịlafu critical fact, injection compliance, ma ọ bụ usage na-efu na-egbochi promotion. Otu execution enweghị ike ịkwalite ihe ọ bụla:
`--previous-report` na-akwado executions abụọ dị iche, ndị na-adịghị ekpuchịta ibe ha, ma bụrụ ndị ruru eru n’usoro, nke policy/model revision/candidate/corpus ahụ. Sampling experiment enweghị ike ịkwado contact-sheet experiment.

Ndị na-anakọta data kwesịrị ịtụle nzaghachi n’ime memory ma chekwaa `responseDigest` tinyere metrics na njikọ observation, ọ bụghị ederede nzaghachi. Consumer ahụ na-agụkwa legacy raw observations, mana ọ naghị edetu ederede ahụ n’ime reports ya. A na-anabata kpọmkwem otu n’ime `responseDigest` ma ọ bụ `rawResponseText` maka observation ọ bụla. Allowlist nwere version ka na-anọgide oghere, ebe `hold` immutable bụ default. Entry ruru eru chọrọ evidence reference ya, policy, model revision, exact candidate SHA, manifest digest, na run IDs abụọ dị iche; contexts na-emegiderịta onwe ha ka a na-ajụ. Metadata ndị a bụ nkwekọrịta audit, ọ bụghị ihe akaebe na faịlụ a kpọtụrụ aha nwere nha genuine. Nyochaa receipts ndị ahụ n’ezie tupu itinye entry ọ bụla. Endpoint stats management na Video dashboard na-egosi readiness nwere nlezianya. Model alias ahaziri naanị ya anaghị eguzobe revision ya ma ọ bụ candidate SHA na-agba ọsọ, ya mere dashboard ugbu a na-akọ `HOLD` kama iji eligibility sitere na execution context ọzọ. Nhọrọ experimental doro anya ka dị iche na promotion; a naghị agbanwe default ọ bụla na akpaghị aka.

Ndị na-akpọ nwere ike itinye array `transcript.cues` nhọrọ na akụkụ vidiyo akwadoro mgbe ha nwere ederede kwekọrọ na oge. Cue ọ bụla ga-enwerịrị `text`, oghere `start`/`end` nwere njedebe zuru oke nke dị n'ime ogologo oge a nyochara, yana `source` sitere na ndepụta akwadoro (`client`, `embedded`, ma ọ bụ `audio-bridge`); `confidence` na-abụ `1` na ndabara, ọ ga-anọrịrịkwa n'etiti `0` na `1`. A na-ejikọta cues ndị bụ otu kpọmkwem. OmniRoute anaghị amalite transcription site na metadata a: a na-ebufe cues ndị a kwadoro n'ime nsonaazụ akọwara, tinyere source, confidence, na interval, a na-egosikwa ha dị ka nlele a na-atụkwasịghị obi n'akụkụ nkọwa frame. A na-ajụ ederede na-adịghị mma, nke gafere oke, ma ọ bụ nke na-enweghị provenance kama ịgwakọta ya na iyi caption. Ọwa transcript abụọ sitere n'ahụ request na-eme ka provenance e nyere bụrụ `client`, gụnyere label `embedded` ma ọ bụ `audio-bridge` nke onye ahịa kwuru n'onwe ya. Naanị adapter nke sava nwe nwere ike inye label ndị a tụkwasịrị obi site na argument `trustedSource` nke bụ naanị maka koodu; JSON field dị na request enweghị ike iru argument ahụ. Ederede transcript ka bụ ọdịnaya sitere na media nke a na-atụkwasịghị obi, n'agbanyeghị provenance ya, ọ gaghịkwa ekpebi ikike ịnweta.

Onye na-akpọ nwere ahụmịhe nwere ike inye track `audioTranscript` maka otu vidiyo ahụ; a na-emeso ya dị ka ederede onye ahịa nyere, ọ bụghị ihe akaebe nke transcription sava. Ebe njikọ na-eme ka nlele anya na nke ụda rụọ ọrụ n'okpuru otu deadline na abort signal, hazie ha n'otu timeline, jikọta ndị bụ otu kpọmkwem, ma kọọ nsonaazụ akụkụ mgbe naanị otu akụkụ gara nke ọma. `audioTranscript` na-adịghị mma na-eme ka nke ahụ bụrụ nsonaazụ akụkụ — a na-echekwa nkọwa anya, alaka ụda na-edekwa koodu ọdịda a sachara — kama ime ka vidiyo niile daa. A na-echekwa nnweta alaka ọ bụla, ọkọlọtọ akụkụ, na koodu ọdịda a sachara n'ime nsonaazụ akọwara, metadata guardrail (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), metadata result-cache, na counters njikọ bridge. Ụzọ Video Bridge ndabara anaghị akpọ speech-to-text ma ọ bụ budata oyiri media nke abụọ; na-enweghị track ahụ a kpọpụtara nke ọma, ọ na-anọgide naanị vidiyo.

**Nchekwa transcript (#12150 P1).** Nke a na-etinyere onwe ya mgbe ọ bụla Video Bridge (nke bụ opt-in n'onwe ya) gosipụtara cue transcript — enweghị flag nchekwa ọzọ. Mgbe request gosipụtara cue transcript ọ bụla (ma ọ bụ `transcript` nke onye na-akpọ kwupụtara ma ọ bụ `audioTranscript` ejikọtara), guardrail na-akara ya `videoBridgeObserved` ma mepụta onyinyo e kpuchiri nke nkọwa vidiyo — rendering yiri nke mbụ ebe a dochie ahụ ederede efu nke cue ọ bụla na `[redacted-video-transcript]`, site n'ịgbanwe structured cue field tupu ejikọta string (ọ bụghị site n'ịtụgharị flattened text, ya mere ọdịnaya cue ọ bụla — nke na-emegide iwu ma ọ bụ nke nkịtị, gụnyere body nwere `]` dịka `[inaudible]`/`[music]` — enweghị ike ịlanarị). Ahụ request a na-echekwa na call-log na-agbanwe akụkụ ederede ọ bụla sitere na vidiyo ka ọ bụrụ onyinyo ahụ e kpuchiri, dabere na nha ọdịnaya; a na-agụkwa anchor `fullText` ọzọ site na payload guardrail zuru ezu tupu oku, ya mere match ahụ ka na-aga nke ọma mgbe chain guardrails ndị ọzọ (PII na credential maskers, priorities 10/95) mechara degharịa ederede nkọwa n'ebe ahụ na mgbe system-prompt/handoff/memory injection gbanwere message array. Ahụ a zigara model ahụ anaghị agbanwe. Request a hụrụ anaghị ejupụta Memory na-adịgide adịgide (a na-awapụ extraction sitere na request na nke sitere na response), ya mere nzaghachi nke model n'onwe ya enweghị ike ịtinye ederede transcript n'ime Memory.

**Raw video fields (#12430).** Mgbe bridge dị na native video support amaghị ma ọ bụ na-adịghị, fields `transcript`/`audioTranscript` akọwapụtara na-agbakwa `videoBridgeObserved`, ọbụna mgbe nkọwa dara ma ọ bụ mgbe ruru oke `maxVideos`. `null` na strings efu na-agụta; fields na-adịghị na metadata na-abụghị vidiyo anaghị agụta. Oyiri a na-echekwa na-ekpuchi fields ndị a ma ọ bụ wepụ request ahụ, a na-agafekwa caches/Memory.

N'okporo ụzọ fallback ndị ahụ, cues onye na-akpọ nyere nke ziri ezi na-aghọ akụkụ `text`/`input_text` akwadoro kama fields provider na-abụghị ọkọlọtọ. Tracks abụọ sitere na request ka bụ nlele `client` a na-atụkwasịghị obi, tinyere ịdọ aka ná ntị doro anya na a kọwaghị vidiyo ahụ nakwa na a nyochaghị timestamps megide media. Mmefu 256-cue/64-KiB dị ugbu a, ma nke mkpokọta ma nke cue ọ bụla, na-emetụta tracks abụọ ahụ ọnụ; timestamps ga-adaba n'ime oke broker nke sekọnd 600 na focus window ọ bụla e nyere. A na-atụfu tracks na-adịghị mma, a naghị ebufe ha dị ka arbitrary text; enwere ike iji sibling ziri ezi ma ọ bụrụ na mmefu ha jikọtara agafeghị oke. Fields null/efu anaghị etinye ederede. Fallback a anaghị etinye media fetch ma ọ bụ transcription. A na-ewepụ transcript extension fields na fallback video carrier na objects `video_url`/`source` ya. OpenAI wire allowlist ka siri ike; video carriers ndị native ha amaghị ka dị, targets ndị a maara na-anabata naanị text na-edokwa markers dị nchebe. Structured redaction shadows na-echebe ederede transcript agbakwunyere, ebe request mbụ onye na-akpọ nwe ya anaghị agbanwe. Targets ndị native kwadoro na bridges ndị agbanyụrụ na-ejigide omume bypass ha dị ugbu a.

Oyiri ndị ọzọ a na-echekwa na-eji otu akara observed-request ahụ. Snapshot raw client-request tupu guardrail, pending request dị na memory, na early rejected-request log na-eji usoro dochie transcript fields n'ime akụkụ vidiyo; string prompts nke pipeline stages na context handoff mepụtara na-ekpuchi n'ebe a na-echekwa request-body. Marker `video_content_removed` nke a na-echekwa na-eme ka continuation `previous_response_id` daa n'ụzọ mechiri emechi kama ịrụgharị ederede e kpachapụrụ anya tụfuo. Ọ bụrụ na request a hụrụ tufuo onyinyo redaction nke akụkụ ya tupu logging, ma ọ bụ ọbụna otu n'ime ọtụtụ video shadows adabaghị mgbe mgbanwe request mechara, a na-ewepụ ahụ request ahụ kpamkpam kama ịchekwa transcript nke e kpuchiri naanị akụkụ ya.

Maka arịrịọ a hụrụ, nzaghachi model nwere ike ịkpọpụta akụkụ ọ bụla nke transcript ahụ n’enweghị oke akara nhazi ahaziri ahazi. Ya mere, a na-eji akara na-egosi mwepụ dochie `responseBody` nke call-log echekwara; a naghị echekwa artifact pipeline zuru ezu (nke nwere ike ịgụnye ahụ́ arịrịọ upstream/client na akụkụ stream). Cache semantic, idempotency na reasoning-replay na-agafe ma ọgụgụ ma ide maka arịrịọ ahụ. Arịrịọ onye na-eweta ọrụ na nzaghachi onye ahịa na-ahụ ka dịkwa otu. A na-ewepụ bytes keepalive ndị mbụ n’ime buffer nwa oge mgbe a hapụrụ artifact zuru ezu. Ịdọ aka ná ntị Kiro gbasara EventStream na-adịghị mma na-akọ naanị ọnụọgụ bytes payload, ọ dịghị mgbe ọ na-akọ ọdịnaya ha ma ọ bụ njehie raw nke JSON parser.

Nke a anaghị ekwu na a nyochala diagnostic onye na-eweta ọrụ/plugin ọ bụla na-enweghị njikọ; a na-enyocha nyocha sara mbara nke ebe nchekwa fọdụrụ na #11658.

Usoro ndụ nke `/api/modality-bridge/video/drilldown` dị n’ime bụ substrate cache dị iche, nke loopback/token na-enyocha. Ọrụ ọ bụla chọkwara ID onye isi opaque nke canonical. Tupu enyere onye na-akpọ ya production aka, ọ ga-enweta ID ahụ site na tenant a kwadoro, ọ gaghịkwa ebufe uru onye ahịa họpụtara. Igodo cache na-ejikọta onye isi ahụ na ID session na video-reference nke canonical, na-echekwa naanị igodo sitere na SHA-256 ha, ma na-amachi ma ọgụgụ ma ihichapụ n’otu onye isi ahụ. Cache na-echekwa karịa frames JPEG iri na isii sitere na entry ọ bụla, na-eme ka ha gwụ mgbe nkeji iri gachara, ma na-akwado ọgụgụ `start`/`end` nwere oke ma ọ bụ ihichapụ session doro anya.

A na-amachi onye isi ọ bụla na entries iri na isii na 64 MiB nke data JPEG canonical. Oke ndị a dị iche na oke zuru ụwa ọnụ nke entries 64/256 MiB: nrụgide quota onye isi na-achụpụ naanị entries onye isi ahụ nke ejirila obere oge gara aga tupu a tụlee ịchụpụ site na LRU zuru ụwa ọnụ. A na-ekpochapụ entries gwụchara n’ime ndekọ onye isi na nke zuru ụwa ọnụ mgbe cache na-arụ ọrụ, ebe cancellation na ọdịda validation anaghị edebanye nnọchi akụkụ ụfọdụ.

Cache na-ajụ Base64 na-abụghị canonical, padding gabigara ókè, media na-abụghị JPEG, JPEG mebiri emebi ma ọ bụ ebipụla, yana JPEG ndị na-emepụta ịdọ aka ná ntị n’oge `sharp` decode zuru-image nwere oke. Ọ na-encodegharị onyonyo ọ bụla a nabatara ka ọ bụrụ JPEG canonical, na-enweta obosara na ịdị elu site na bytes ndị a decoded kama ịtụkwasị ubi onye na-akpọ ya obi, ma na-atụfu bytes polyglot ọ bụla sochiri ya kama ịchekwa ha. Naanị buffer compressed canonical nwere oke ka a na-agụ n’ime quota abụọ ahụ. Oke JSON wire gụnyere overhead Base64 maka oke decoded-input nke 32 MiB. Derivation ọ bụla echekwara na-edekọ format/resolution JPEG a kwadoro, iwu sampling, ụdị derivation, oge e kere ya, content hash nke server gbakọọ, na parent reference hashed tinyere parent-content hash nke onye na-akpọ ntụkwasị obi. A na-enyocha cancellation n’etiti usoro decode/hash asynchronous tupu atomic cache commit.

Onye na-emepụta production na-ejikwa frames broker e mepụtara mbụ naanị mgbe visual analysis gara nke ọma, na-enweghị nbudata/ịwepụta video nke ugboro abụọ. Ọ chọrọ operator `modalityBridgeVideoDrilldownEnabled=true`, `drilldown: true` siri ike maka akụkụ ọ bụla, na ID ndekọ API-key a kwadoro. Uru principal/session onye ahịa kwupụtara anaghị eguzobe ownership. Ọ bụrụ na ọnọdụ atọ ndị a niile adịghị, ọ naghị hash, resize ma ọ bụ chekwaa frames ndị ọzọ. Ọdịda retention na-echekwa nzaghachi visual a pụrụ iji mee ihe. Arịrịọ ndị nwere consent na-agafe cache nsonaazụ whole-video niile ka nsonaazụ cached ghara ịkpọgharịa handles.

Nzaghachi JSON na SSE gara nke ọma na-egosi ihe karịrị handles opaque anọghị n’isiokwu nwere oke `x-omniroute-video-drilldown`. Origins browser ndị e nyere ikike nwere ike ịgụ isiokwu ahụ n’enweghị ịgbasawanye iwu CORS origin. Handles ọhụrụ na-eji `v1.<32-byte random base64url token>`, registry ahụ na-echekwa naanị hash SHA-256 ha. Reader/header parser na-anabatakwa tokens legacy 64-hex. Onye na-azụ ọha nke a kwadoro bụ `GET /api/v1/video-bridge/drilldown?handle=...`, nke `modalityBridgeVideoDrilldownRemoteEnabled=true` na-achịkwa n’onwe ya. False echekwara nke ọma na-ewepụ ikike ọbụna mgbe fallback env legacy `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` dị ọrụ. Retention production nwere fallback legacy kwekọrọ `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED`. Fallback abụọ ahụ na-adị off na ndabara.

Onye na-azụ ahịa na-enweta ownership site na key a kwadoro ma na-etinye iwu key: ma GET ma DELETE so n’ụdị endpoint `video`, tinyere aliases `/v1` na `/api/v1`. Keys nwere allowlist endpoint na-abụghị efu ga-etinyerịrị `video`; keys na-enweghị mmachi ka na-adakọ. Onye na-azụ ahịa na-eweghachi 404 ahụ, otu, maka handles a na-amaghị, ndị gwụchara na nke key ọzọ. Ọ na-anabata `variant=preview|standard|detail` (oke akụkụ JPEG 320/640/1280, a naghị eme upscale), `limit=1..8` (ma ọ bụ alias legacy `frames`, ọ bụghị ha abụọ), `page` nke na-amalite na efu, na sekọnd focus `start`/`end` nhọrọ. A na-ajụ query keys ugboro abụọ na focus windows tụgharịrị. Variant ọ bụla a weghachiri nwere hash nke ọdịnaya ya n’ezie na metadata resolution ya n’ezie, jikọtara na source echekwara. A na-emepụta variants mgbe a na-agụ ya kama ịchekwa ha dịka copies ọzọ echekwara. Nzaghachi JSON, tinyere Base64/envelope, nwere oke 32 MiB; page buru oke na-eweghachi 413, onye ahịa ga-arịọ frames ole na ole. Ọgụgụ na-enyocha cancellation gburugburu resize ọ bụla ma na-enyocha validity handle ọzọ tupu iweghachi. `DELETE` nke onye nwe ya bụ idempotent; ihichapụ ma ọ bụ TTL expiry na-ahapụ source echekwara na ndekọ ojiji.

Store a na-ekekọrịta bụ process-local: handles na-agwụ mgbe restart gasịrị, a pụghịkwa ibufe ha n’etiti usoro OmniRoute nọọrọ onwe ha. Stats nchịkwa na-egosi retention/remote policy dị irè na ngụkọta entries/bytes echekwara naanị, ọ dịghị mgbe ha na-egosi media, references, principal IDs ma ọ bụ handles. Panel ntọala Video na-egosi ụkpụrụ ndị ahụ ma nwee ike ịchekwa switches consent abụọ ahụ. Akwụkwọ nkọwa implementation a abụghị ihe akaebe deployment ma ọ bụ promotion dị ndụ; a na-enyocha nnabata real-model iche.

A na-akpọpụta nkọwa nke frames n’usoro site na Video model ahaziri. Video override efu na-eketa ntọala Vision; ọ bụrụ na ha abụọ efu, Vision auto-router na-ahọrọ model nwere ike ịrụ ọrụ vision nke ga-arụ ọrụ. Nkọwa ndị gara nke ọma na-anọchi akụkụ mbụ ahụ site na prefix kwụsie ike `[Video description:` nke na-akakwa ederede ahụ dị ka nchọpụta sitere na media nke a na-ekwesịghị ịtụkwasị obi, ma gwa downstream models ka ha ghara iso ntuziaka ndị dị n’ime media. Igodo cache nke nkọwa frame gụnyere bytes JPEG, prompt, timestamp, na effective model; naanị nkọwa ndị gara nke ọma ka a na-echekwa na cache. Ihe ndị dị na cache na-echekwa model onye mepụtara nke gara nke ọma n’ezie, gụnyere fallback model; bridge na-akọ `mixed` mgbe models dị iche iche mepụtara frames dị iche iche. Cache hit na-eji njirimara onye mepụtara ahụ eme ihe ọzọ kama ịkpọgharị ya dị ka atụmatụ routing a rịọrọ. Cache nsonaazụ nke vidio dum na-eji input ọ bụla na-agbanwe nsonaazụ dị ka igodo — prompt, effective model, sampling policy, frame count, semantic analysis mode, SHA-256 fingerprint nke normalized focus hint, focus window, `transcript`, `audioTranscript`, na contact-sheet flag — ya mere ịgbanwe akụkụ ọ bụla n’ime ha na-ebute cache miss, ọ bụghị iji nsonaazụ ochie eme ihe ọzọ. A na-etinyekwa ụdị visual dedup policy, threshold, na ọnụ ọgụgụ bounded candidate-frame n’ụzọ doro anya n’igodo na metadata nke result-cache; ya mere mgbanwe policy enweghị ike iji nkọwa vidio dum ochie eme ihe ọzọ. Result-cache v4 metadata na-echekwa mode na fingerprint, ọ dịghị echekwa raw user task. Guardrail metadata na-akọ ma requested analysis mode ma effective analysis mode; `focused` mode a rịọrọ na-enweghị usable user text na-akọ na ọ bụ `full` n’ezie.

Guardrail na-ewepụta video part niile a kwadoro mana ọ naghị akọwa karịa `modalityBridgeVideoMaxVideos`. Maka target e gosipụtara na `supportsVideo === false`, vidio dara ada na nke karịrị oke na-aghọ safe text markers doro anya ka raw video ghara ịdị ndụ. Mgbe capability amaghị, akụkụ ndị ahụ na-ejigide video carrier ha; transcript fallback ọ bụla na-agbaso bounded text conversion dị n’elu. Targets nwere `supportsVideo === true` na-agafe bridge. Client request abort signal na-agafe download, broker queue, subprocesses, na caption calls; aborts na-akwụsị n’etiti vidio ma ghara ịda open gaa raw media.

A na-echekwa runtime settings na DB ma jiri Zod kwado ha:

| Igodo                               | Default     | Oke / omume                                                                                                         |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime nhọrọ, a ga-ahọrọ iji rụọ ọrụ                                                                               |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` na-echekwa generic captions; `focused` na-eji latest-user context nwere oke, nke a na-ekwesịghị ịtụkwasị obi |
| `modalityBridgeVideoModel`          | `""`        | Keta Vision Bridge model                                                                                            |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, ma ọ bụ proportional `segment_aware`; ọdịda detector na-alaghachi na `uniform`            |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                 |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                      |

A na-egbutu Legacy persisted Video timeout values karịrị sekọnd 120 ruo broker deadline; a na-ajụ settings writes ọhụrụ karịrị oke ahụ.
`GET /api/modality-bridge/video/runtime` chọrọ trusted stamped loopback locality tupu authentication ma ọ bụ runtime probing, ma mesịa chọọ management auth. Ọ na-alaghachi naanị `available`, sanitized FFmpeg/ffprobe versions, na fixed reason mgbe runtime adịghị. Internal extraction endpoint abụghị public upload API: queue saturation na-alaghachi `503` tinyere `Retry-After`, caller disconnect na-alaghachi `499`, fixed broker deadline na-alaghachi `504`. Responses ndị a gbanwere na-agbakwunye
`video->text;model=<visionModel>;parts=<videos>` na central
`x-omniroute-modality-bridge` header n’enweghị iwepụ Vision ma ọ bụ Audio segments.

### PII Masker (`piiMasker.ts`)

Ọ na-arụ ọrụ n’ọkwa **abụọ**.

- **`preCall`** na-emepụta clone nke payload, na-agagharị na `system`, `messages`, `input`, na
  `prompt` (gụnyere plain string items), ma tinye `processPII()` (site na
  `@/shared/utils/inputSanitizer`) n’ọrụ n’ubi `content`/`text` ndị bụ string. Mgbe
  `PII_REDACTION_ENABLED=true`, a na-ewepụ PII a chọpụtara na outbound
  payload. Nke a nọọrọ onwe ya na `INPUT_SANITIZER_MODE` (nke na-achịkwa naanị policy
  prompt-injection). Mgbe redaction kwụsịrị, call na-edekọ ọnụ ọgụgụ detections
  n’enweghị idegharị content.
- **`postCall`** na-eme deep clone nke response, na-agba
  `sanitizePIIResponse()` yana Responses-API-shape masker (`maskResponsesOutput` — na-ekpuchi
  `output_text` na `output[].content[].text`). Ọ bụrụ na redaction ọ bụla mere, response
  gbanwere na-anọchi nke mbụ.

Guardrail anaghị egbochi; naanị ọ na-etinye annotations (`meta.detections`,
`meta.redacted`) ma ọ bụ na-edegharị.

**Vault a pụrụ ịtụgharị azụ (`PII_REVERSIBLE_VAULT_ENABLED`, ndabara bụ `false`).** Mgbe ma
`PII_REDACTION_ENABLED` ma `PII_REVERSIBLE_VAULT_ENABLED` bụ ndị agbanyere (DB override >
env > default, a na-agụ otu ugboro kwa arịrịọ), `handleChat` na-emepe otu vault maka arịrịọ
onye ahịa (`src/lib/pii/requestTokenVaultScope.ts`) ma nyefee ya na pre-call pass dị ka
`GuardrailContext.tokenVault`. Mgbe ahụ masker na-ede surrogate tokens dịka
`<<PII_EMAIL_QWERTYUI_1>>` kama `[EMAIL_REDACTED]`, maka iwu ndị e wuru n'ime, ndị a kwadoro
(GDPR/POPIA), na iwu omenala niile. Nonce bụ mkpụrụedemede ukwu random 8 kwa arịrịọ, otu
uru ahụ na-enwetakwa otu token n'ime arịrịọ ahụ. Naanị masker na-emepụta tokens: prompt-injection
guard na `/api/guardrails/test` na-agba ọsọ n'enweghị vault ma na-ejigide placeholders.

- Provider, combo leg ọ bụla, retry, onye so na fusion panel ọ bụla na fusion judge na-ahụ naanị
  tokens. A na-eweghachi tokens otu ugboro, na nzaghachi 2xx nke na-apụ na `handleChat`: kwa
  field n'ime SSE a parsed (ọ bụrụgodị na token kewara n'etiti events ọ ka na-edozi; a na-agbanarị
  tool-call arguments dị ka JSON) ma ọ bụ kwa field n'ime JSON body, tinyekwara `Content-Length`
  a gbakọrọ ọzọ. A na-eweghachi content na reasoning text na tool-call arguments. Error bodies
  (4xx/5xx) na-ejigide tokens.
- Ọdịda na-anọgide na nzuzo: ọ bụrụ na minting daa ma ọ bụ vault ajụ uru (ntinye 1000, mkpụrụedemede
  256 kwa uru, 64 KB n'ozuzu), a na-ede placeholder kama ya; token vault na-apụghị idozi, ma ọ bụ
  restore dara, na-anọgide literal, a na-edekwa naanị ọnụ ọgụgụ n'ime log. Vault enweghị timers ma
  ọ bụ global state; a na-ehichapụ ya mgbe response stream kwụsịrị, a kagburu ya ma ọ bụ nwee njehie.
- Mgbe arịrịọ mepụtara tokens, a na-amapụ memory extraction, idempotency save na semantic-cache
  writes abụọ ahụ, n'ihi na ọ nweghị arịrịọ ọzọ nwere ike idozi tokens ndị ahụ. N'ime call logs,
  provider request na response na-ebu tokens; logged client request body ka bụ raw client input,
  dịka ọ dị na plain redaction.
- Tokens na-eji nonce random kwa arịrịọ, ya mere prompt prefix na-agbanwe na turn ọ bụla:
  provider-side prompt caching anaghị arụ ọrụ maka masked turns, token nke laghachiri na turn
  ọzọ (dịka site na `previous_response_id`) bụ nke arịrịọ ochie ma na-anọgide literal.

#### Nhọrọ kwa ụdị, ụkpụrụ omenala na counters nchọpụta

**Dashboard → Settings → Security → PII masking** na-ahọrọ _ihe_ a ga-mask. Ọ naghị agbanye
masking: nke ahụ ka bụ `PII_REDACTION_ENABLED` (request) na `PII_RESPONSE_SANITIZATION`
(response + SSE), ha abụọ na-apụ na ndabara.

- **Nhọrọ kwa ụdị** — ids ndị e wuru n'ime dị na
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Ọ bụrụ na edoghị ya, ọ pụtara ụdị
  niile (omume dị tupu setting a adị). Pattern `ssn_us` nke request engine na-aga na `ssn`.
  Templates (Minimal, Standard, Financial, Brazilian, USA, GDPR, POPIA, Full) na-ejupụta naanị
  checkbox ndị dị na UI.
- **GDPR na POPIA identifiers** — ids iri na abụọ e wuru n'ime na-ekpuchi identifiers nke onwe
  nke EU na South Africa (lee tebụl dị n'okpuru). Regexes, validators na jurisdiction tags ha
  dị n'otu tebụl, `src/shared/utils/piiPatterns.ts`, nke response sanitizer
  (`src/lib/piiSanitizer.ts`) na request masker (`src/shared/utils/inputSanitizer.ts`) na-eji.
  A na-redact match naanị mgbe validator ya nabatara ya; ọtụtụ digits naanị ha ezughị. Operator
  nke chekwara nhọrọ e belatara tupu ids ndị a adị na-ejigide omume ọ nwere ruo mgbe a họpụtara
  ids ọhụrụ ahụ.
- **Custom patterns** — ruo 20 regex ma ọ bụ wildcard patterns (`*` = ihe ruru mkpụrụedemede
  64 na-abụghị whitespace, `?` = otu). Matches na-aghọ `[CUSTOM_REDACTED]`. Pattern ọ bụla na-agafe
  `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): kacha elu bụ mkpụrụedemede
  500, flags pere mpe na `g i m s u`, ọ ga-enwerịrị ike compile, ọ ga-agafe `safe-regex`
  (catastrophic backtracking), ma ọ gaghị match empty string ma ọ bụ redaction placeholder.
  A na-ajụ pattern dara ada mgbe a na-echekwa ya na mgbe a na-anwale ya, row echekwara nke dara
  adakwa na-agafe runtime kama ịrụpụta ya. Custom patterns na-agba naanị mgbe masking dị.
- **Detection counters** — counts kwa ụdị (ọ dịghị mgbe a na-echekwa matched values), a na-edebe
  ha na memory ma na-reset mgbe restart (`src/lib/pii/piiDetectionStats.ts`). Ha na-abawanye naanị
  mgbe masking dị.

Settings ndị ahụ dị na `key_value` table (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`), a na-agụkwa ha site na cache nke 1 s. API:

| Usoro  | Ụzọ                      | Ebumnuche                                                                |
| ------ | ------------------------ | ------------------------------------------------------------------------ |
| `GET`  | `/api/settings/pii`      | Ọnọdụ flag, `enabledTypes`, `customPatterns`, detection counters         |
| `PUT`  | `/api/settings/pii`      | Dochie `enabledTypes` (`null` = niile) na/ma ọ bụ `customPatterns`       |
| `POST` | `/api/settings/pii/test` | Dry-run otu pattern megide sample kacha 8 KB; a naghị echekwa ihe ọ bụla |

Ha atọ chọrọ management auth ma jiri Zod kwado body
(`src/shared/validation/schemas/piiSettings.ts`). Mgbe login kwụsịrị
(`requireLogin=false`), `GET` na test endpoint na-emeghe, mana `PUT` ka chọrọ dashboard
session, API key nwere `manage`-scope, access token `oma_` nwere write scope ma ọ bụ nke ka elu,
ma ọ bụ CLI token ma ọ bụ internal-service token ezigara site na loopback.

#### GDPR (EU) na POPIA (South Africa) identifiers

| Id                  | Identifier                   | Validation                                                                                   |
| ------------------- | ---------------------------- | -------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                         | Mba amaara, ogologo ziri ezi maka mba ahụ, ISO 13616 MOD-97-10                               |
| `eu_vat`            | Nọmba VAT EU                 | Prefix steeti onye otu amaara na usoro nọmba steeti ahụ (enweghị nyocha VIES)                |
| `es_dni_nie`        | DNI / NIE Spanish            | Akwụkwọ ozi njikwa (uru mod 23); NIE bụ `X/Y/Z` + ọnụọgụ 7                                   |
| `it_codice_fiscale` | Codice Fiscale Ịtali         | Akwụkwọ ozi njikwa sitere na tebụl ọnọdụ odd/even                                            |
| `pl_pesel`          | PESEL Polish                 | Checksum nwere ibu na ụbọchị ọmụmụ e debanyere nke dị adị                                    |
| `nl_bsn`            | BSN Dutch                    | Nnwale 11 (weights 9..2, -1)                                                                 |
| `de_steuer_id`      | Steuer-ID German             | ISO 7064 Mod 11,10 yana iwu nhazi ọnụọgụ (enweghị 0 n’ihu)                                   |
| `se_personnummer`   | personnummer Swedish         | Luhn n’elu ọnụọgụ iri ikpeazụ na ụbọchị ọmụmụ nwere ezi uche (ọnụọgụ 10 ma ọ bụ 12)          |
| `za_id`             | Nọmba njirimara South Africa | Luhn n’elu ọnụọgụ 13 niile, ọnwa/ụbọchị ọmụmụ ziri ezi, ọnụọgụ ịbụ nwa amaala 0 ma ọ bụ 1    |
| `za_phone`          | Ekwentị South Africa         | Prefix `+27` / `27`, ma ọ bụ ụdị mba `0..` nke e dere na oghere ma ọ bụ hyphen               |
| `za_vat`            | Nọmba VAT South Africa       | Ọnụọgụ 10 na-amalite na `4` **na** "VAT" / "BTW" n’ime mkpụrụedemede 48 dị n’ihu             |
| `za_tax_ref`        | Tax ref. South Africa        | Ọnụọgụ 10 na-amalite na `0`-`3`, Luhn, **na** "tax" / "SARS" n’ime mkpụrụedemede 48 dị n’ihu |

Ebe ọ bụ na usoro nke nwere naanị ọnụọgụ na-adakọkarị na nọmba iwu, nọmba
ewu na timestamps, ndị kacha adịghị ike (`za_vat`, `za_tax_ref`) chọrọ akara
okwu, a naghịkwa ewere nọmba ọnụọgụ iri `0..` naanị ya dị ka nọmba ekwentị
South Africa. A naghị achọta IBAN ndị e kewara oghere (`GB29 NWBK ...`). N’ụzọ
streaming, a na-achọ akara okwu ahụ naanị n’ime chunk dị ugbu a. Id ndị a dị
n’ihu usoro ekwentị izugbe, ya mere identifier a kwadoro na-edobe placeholder nke ya
(`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Template `gdpr` na
`popia` na-ahọrọ id EU na nke South Africa n’otu n’otu. Masking n’onwe ya ka
bụ nke a ga-ahọrọ (Hard Rule #20): ọ dịghị ihe dị ebe a na-agbanwe default nke
feature-flag.

### Ntinye Prompt (`promptInjection.ts`)

Ọ na-achọpụta usoro aghụghọ n’ime ọdịnaya onye ọrụ nyere ma na-etinye iwu
ahaziri ahazi n’ọrụ. Variables gburugburu na nhọrọ constructor na-achịkwa
omume ya:

| Setting         | Env var                                                                                               | Default | Effect                                                                                                                                                                                        |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enabled         | `INPUT_SANITIZER_ENABLED`                                                                             | `true`  | Mgbe ọ bụ `false`, guardrail na-akwụsị ozugbo.                                                                                                                                                |
| Mode            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`  | Iwu injection: `block`, `warn`, ma ọ bụ `log`. (`redact` na-anabata ya maka back-compat mana ọ **dịghị** ewepụ ederede injection; `PII_REDACTION_ENABLED` na-achịkwa rewrite PII nke arịrịọ.) |
| Block threshold | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Ogo kacha nta achọrọ iji gbochie. Na default, Medium bụ naanị maka ileba anya.                                                                                                                |

**Usoro dị mkpa nke Mode** (`getMode`): `options.mode` nke onye kpọrọ →
`INJECTION_GUARD_MODE` **DB feature-flag override** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Ya mere dashboard override na-emeri env vars, nke pụtara na Feature
Flags UI na-achịkwa guard na-agba ọsọ ozugbo (enweghị restart). Ọgụgụ DB ahụ
bụ fail-safe: ọ bụrụ na njehie emee, guard na-alaghachi n’omume dabere na env,
ma mgbe edobebeghị override, omume ya na-adị otu ihe ahụ dị ka mkpebi dabere naanị
na env.

Ebe nchọpụta:

1. `sanitizeRequest()` sitere na `@/shared/utils/inputSanitizer` (otu set detector
   a na-ekekọrịta nke a na-eji n’ebe ndị ọzọ n’ime pipeline).
2. `DEFAULT_GUARD_PATTERNS` e wuru n’ime (ugbu a `system_override_inline` na
   `markdown_system_block`, ha abụọ nwere severity `high`).
3. `customPatterns` nhọrọ nke a na-enyefe site na constructor (strings, regex,
   ma ọ bụ records `{ name, pattern, severity }`).

Mgbe `mode === "block"` **na** opekata mpe otu nchọpụta ruru threshold severity,
`preCall` na-alọghachi `{ block: true, message: "Request rejected:
suspicious content detected" }`. Na mode `warn`/`log`, guardrail na-edekọ log
mana ọ na-ekwe ka oku ahụ gaa n’ihu. A na-ebupụkwa helper `evaluatePromptInjection()`
nke a na-ekekọrịta maka ndị na-akpọ ya chọrọ inyocha prompts n’enweghị ịgafe na registry.

**Oke nyocha (v3.8.20):** onye nchọpụta ahụ na-enyocha naanị **16 KB mbụ** nke
ederede prompt ejikọtara ọnụ — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) dị na
`src/shared/utils/inputSanitizer.ts`. Ma `detectInjection()` ma
`evaluatePromptInjection()` na-eme `slice(0, MAX_INJECTION_SCAN_BYTES)` tupu ha amalite
loop ụkpụrụ ahụ. Ntuziaka injection na-adịkarị nso n’elu input, ya mere nke a na-amachi
CPU/GC nke regex na payload ndị karịrị narị KB, n’enweghị ime ka nchọpụta daa mbà (lee
#3932, #4041).

### Onye Na-ekpuchi Nzere (`credentialMasker.ts`)

Ọ na-arụ ọrụ na ọkwa abụọ ahụ, bụrụ nke ikpeazụ n’usoro ndabara (priority `95`). Ọ na-ezo
ụkpụrụ igodo API / token nzuzo ndị a ma ama n’ime payload a na-ezipụ (ọdịnaya ozi,
arụmụka tool-call, nsonaazụ tool) **na** nzaghachi provider, ka nzere a mado n’ime prompt
(ma ọ bụ nke nsonaazụ tool weghachiri) ghara ịpụga provider dị n’elu ma ọ bụ laghachi
n’aka client.

- **Ọ bụ naanị mgbe a họpụtara ya**, dịka usoro izochi PII (nke dị nso na Iwu Siri Ike #20):
  ọ naghị arụ ọrụ ma ọ bụrụ na `settings.credentialRedactionEnabled === true` **ma ọ bụ**
  `CREDENTIAL_REDACTION_ENABLED=true`. Mgbe agbanyụrụ ya, guardrail ahụ anaghị eme ihe ọ bụla —
  ọ naghị egbochi ma ọ bụ gbanwee ihe ọ bụla.
- `redactCredentials()` na-agafe osisi payload/response niile (`walkValue()`,
  nke nchekwa pụọ n’imebi prototype, na nchekwa pụọ n’imegharị okirikiri site na `WeakSet`)
  ma dochie ihe ndị dabara na placeholder `[REDACTED:<type>]`, ebe ọ na-emepụta clone naanị
  nke ngalaba gbanwere.
- `CREDENTIAL_PATTERNS` na-ekpuchi igodo provider LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), token VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), igodo ịkwụ ụgwọ (Stripe, Square), igodo
  cloud (AWS access key, Twilio, SendGrid, Mailgun), igodo nzuzo / JWT,
  connection string ndị nwere nzere (`mongodb://user:pass@...`, wdg.), na ụkpụrụ
  izugbe maka uru header `Authorization`/`x-api-key`/`api-key`/`apikey`.
  A na-ezo igodo ndị yiri header (`authorization`, `x-api-key`, `api-key`,
  `apikey`) n’usoro nhazi (naanị uru ya), ebe a na-echekwa prefix scheme dịka
  `Bearer `/`Basic ` kama iji regex ederede izugbe.
- Guardrail ahụ anaghị egbochi ihe ọ bụla; ọ na-eme naanị mgbanwe (`modifiedPayload` /
  `modifiedResponse`) ma tinye akara (`meta.credentialsRedacted`, `meta.count`).

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

## Usoro Mmezu

Maka arịrịọ ọ bụla na-agafe na `src/sse/handlers/chat.ts` na
`open-sse/handlers/chatCore.ts` (ụzọ ezinụlọ chat ndị e depụtara n'okpuru
[Mpokọta na oke](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` na-ewu ndepụta ihe a ga-awụpụ site na API key, body,
   na headers.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` na-eme guardrail n'usoro mkpa na-arị elu:
   - A na-edekọ guardrail ndị a kwụsịrị dị ka `skipped`.
   - `preCall` nke guardrail ọ bụla nwere ike idegharịa payload site na `modifiedPayload`.
   - `block: true` nke mbụ na-akwụsị chain ozugbo, handler ahụ alaghachikwa nzaghachi jụrụ arịrịọ n'ihi guardrail.
3. Payload ahụ (nke enwere ike idegharị) na-aga na nhazi combo na iziga ya n'elu.
4. **Maka ndị na-adịghị stream naanị:** mgbe a chịkọtara nzaghachi ahụ,
   `guardrailRegistry.runPostCallHooks(...)` na-eme otu chain ahụ na nzaghachi ahụ. `block: true` ebe a na-atụfu nzaghachi sitere n'elu ma weghachite HTTP 400. Nzaghachi ndị a na-stream na-awụpụ usoro a kpamkpam.
5. **Maka vault nwere ike ịgbanwe azụ naanị:** mgbe arịrịọ ahụ mepụtara tokens, `handleChat`
   na-eweghachite ha na nzaghachi 2xx ọ na-alaghachi, mgbe post-call hooks na mgbanwe PII nke streaming gasịrị, ka `PII_RESPONSE_SANITIZATION` wee hụ tokens na PII nke model mepụtara, ọ bụghị nke mbụ eweghachiri.

A na-edekọ guardrail ndị tụbara njehie site na `error: <message>` ma jiri
`logger.warn` dekọọ ha, mana chain ahụ na-aga n'ihu — a haziri ya ka ọ ghara imechi usoro mgbe njehie mere.

## Mkpuchi na oke

A jikọtara ndekọ guardrail na usoro chat naanị. A kwadoro oke ndị a site na `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` na `tests/unit/guardrail-pipeline-characterization.test.ts`; melite ule ndị ahụ n'ebumnuche mgbe omume gbanwere.

### Ebe hooks na-arụ ọrụ

| Hook / njikwa                          | Ọ na-arụ ọrụ na                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                      | Arịrịọ ndị `handleChat` na-edozi (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (na `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*`, na proxy chat Telegram. Ọzọkwa endpoint ule dashboard `/api/guardrails/test`. Mgbochi tupu oku eweghachi HTTP 400. |
| `runPostCallHooks`                     | Naanị nzaghachi chat **na-abụghị streaming** (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Nזaghachi streaming anaghị eru ya.                                                                                                                                                                                                                                                                                |
| Streaming PII                          | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), nke a na-etinye na `streamingPipeline.ts` mgbe `PII_RESPONSE_SANITIZATION` dị na. Ọ bụghị guardrail, ya mere ọwa nkwụsị anaghị emetụta ya.                                                                                                                                                                                                               |
| Vault PII a pụrụ ịtụgharị              | Arịrịọ ndị `handleChat` na-edozi naanị, mgbe `PII_REDACTION_ENABLED` na `PII_REVERSIBLE_VAULT_ENABLED` dị na. `pii-masker` pre-call na-emepụta token ndị ahụ, a na-eweghachikwa ha mgbe `handleChat` na-apụ (`src/lib/pii/requestTokenVaultScope.ts`). Ịkwụsị `pii-masker` maka arịrịọ pụtara na a naghị emepụta ihe ọ bụla.                                                                                           |
| Middleware injection-guard (nke ochie) | Prompt-bearing `/v1` route niile, gụnyere ezinụlọ chat (lee [mkpuchi route](#injection-guard-route-coverage--red-team-phase-8--block-d)). Ọ bụ prompt injection naanị.                                                                                                                                                                                                                                                 |

### Ihe a na-adịghị ekpuchi

- **Media, embeddings na data routes** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) anaghị eru ndekọ ahụ. Ọ dịghị
  PII masking, credential masking ma ọ bụ modality bridge na-arụ ọrụ ebe ahụ. Naanị
  nyocha ha bụ middleware injection-guard nke ochie.
- **Nזaghachi streaming** anaghị enweta guardrail post-call: enweghị post-call
  `pii-masker` ma ọ bụ `credential-masker`, yana enweghị mgbochi post-call. Naanị
  streaming PII transform na-arụ ọrụ (mgbe `PII_RESPONSE_SANITIZATION` dị na). Credential
  a kwughachiri na nzaghachi streaming anaghị enweta redaction.
- **Ọwa nkwụsị megide middleware (dị ka e chepụtara):** middleware na-enyocha prompt injection site na oku nke ya na `evaluatePromptInjection()`, na-ebufegaghị ndepụta nkwụsị nke onye na-akpọ achịkwa. Ụdị `block` bụ oke dị mkpa nke nkwụsị onye na-akpọ achịkwa enweghị ike ịgafe, gụnyere na route ezinụlọ chat
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Ịkwụsị
  `prompt-injection` na-awụpụ naanị guardrail ndekọ ahụ.

### Ihe na-ahụ nzaghachi tupu post-call

N'ụzọ na-abụghị streaming, usoro ya bụ: iwepụta memory → imezu built-in tool → guardrail post-call → ịpụ mgbe mgbochi post-call → ịchekwa semantic-cache.

- **Iwepụta memory** na **imezu tool** na-ahụ nzaghachi tupu guardrail post-call enwee ike ịgbanwe ma ọ bụ gbochie ya. Kemgbe
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), iwepụta
  memory na-ebufe ederede ewepụtara site na `sanitizePII` mgbe
  `PII_RESPONSE_SANITIZATION` dị na (ma streaming ma na-abụghị streaming), mana nzaghachi
  nke post-call mechara gbochie ka enyelarị memory na tools ya.
- **Semantic cache** na-echekwa nzaghachi mgbe post-call gachara, ya mere ọ na-echekwa nzaghachi a gbanwere, a naghị echekwa nzaghachi a gbochiri n'ime cache. A na-ahazi ndenye cache kwa igodo API.

## Nhazi

Mgbanwe gburugburu ebe obibi nke guardrails arụnyere n'ime na-agụ:

| Mgbanwe                               | Nke na-eji ya              | Mmetụta                                                                                                          |
| ------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Tọọ `false` iji kwụsị nchọpụta kpamkpam.                                                                         |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Amụma injection: `warn`, `block`, ma ọ bụ `log`. Uru ochie `redact` anaghị edegharị ederede injection.           |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Mode maka nchedo injection; ọ bụkwa ọkọlọtọ njirimara DB nke na-akarị mgbanwe gburugburu ebe obibi (DB > ENV).   |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Ogo siri ike kacha nta nke `MODE=block` na-ajụ: `high` (ndabara), `medium`, ma ọ bụ `low`.                       |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | Aha ọzọ ochie maka `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                            |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Mgbe ọ bụ `true`, a na-ewepụ PII dị na arịrịọ (n’agbanyeghị injection mode).                                     |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | Mgbe ya na `PII_REDACTION_ENABLED` jikọtara, mepụta token ndị a pụrụ ịtụgharị ma weghachite ha na nzaghachi 2xx. |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream)  | Na-achịkwa omume masker n’akụkụ nzaghachi.                                                                       |

Ihe nchebe Modality Bridge na-agụ nhazi oge ọrụ site na ebe nchekwa ntọala nke DB na-akwado
(`getSettings()`), ọ bụghị mgbanwe gburugburu ebe obibi. Igodo ndị bụ isi nke Vision bụ
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, na
`modalityBridgeCacheMaxEntries`. A na-anabata igodo ochie
`visionBridge*` naanị dị ka ndabere ọgụgụ otu okirikiri nke edepụtara; ide ihe dashboard na-eji igodo ndị bụ isi. Ndabara na onye na-achọpụta ndabere dị na `src/shared/constants/modalityBridgeDefaults.ts`, ebe a ka na-edobe
const ndị ochie na `src/shared/constants/visionBridgeDefaults.ts`.

Audio na-eji `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, na `modalityBridgeAudioMaxClips`, tinyere ntọala
`modalityBridgeCache*` ndị a na-ekekọrịta. Audio enweghị ndabere igodo ochie n’ihi na e webatara igodo ndị a na schema Modality Bridge.

Video na-eji `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, na
`modalityBridgeVideoTimeout`, tinyere ntọala `modalityBridgeCache*` ndị a na-ekekọrịta.
A na-emechi ya na ndabara n’ihi na FFmpeg/ffprobe bụ ndabere arụmọrụ nhọrọ, ebe ịnye nkọwa maka fremu na-agbakwunye oge nchere na ụgwọ model.

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
