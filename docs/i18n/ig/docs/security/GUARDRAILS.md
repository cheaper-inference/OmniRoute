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

## Ihe mgbochi arụnyere n'ime

Registry ahụ na-ebudata ihe mgbochi isii na akpaghị aka n'usoro mkpa mgbe a na-ebubata ya
(hụ `registry.ts` → `registerDefaultGuardrails()`):

| Mkpa | Aha                 | Oge (Stages)   | Faịlụ                 |
| ---- | ------------------- | -------------- | --------------------- |
| `5`  | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`  | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`  | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10` | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20` | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95` | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nọmba mkpa dị ala na-agba ọsọ **mbụ**.

### Àkwà Vision (`visionBridge.ts`) — Modality Bridge PR-1

Ụdị ntọala GLM 5.3 na `glm-5.3-{low,high,max}` nwere metadata registry/spec doro anya nke bụ
`supportsVision:false`. Ụdị GLM 5.3 Flash ka bụ ụdị nwere native vision. Ụzọ Claude Code `/v1/messages` na-abanye n'usoro ihe mgbochi `handleChat` nke shared pre-call **tupu** ntụgharị Claude-to-OpenAI; a ghaghị ịkọwa ma ọ bụ hazie onyonyo `Read` tool-result ndị dị n'ime tupu ntụgharị ahụ ebuli ha ka ọ bụrụ ọdịnaya OpenAI `image_url` (#17069).

Ọ na-ejide arịrịọ nwere onyonyo ndị e zigara na **ụdị na-enweghị vision**, ma ọ na-ebugharị arịrịọ niile gaa n'ụdị nwere vision ma ọ bụ dochie akụkụ onyonyo ahụ na nkọwa ederede nke ụdị vision a na-ahazi nwere mepụtara tupu oku upstream. Nke a na-eme ka ndị na-enye ọrụ ederede naanị nwee ike ijikwa payload multimodal n'ụzọ na-apụtaghị ìhè.

Usoro ahụ:

1. Mafere ma ọ bụrụ na ụdị e lekwasịrị anya na-akwado vision ugbua (ọ gwụla ma ọ dị na ndepụta mmanye `isVisionBridgeForcedModel`).
2. Wepụ akụkụ onyonyo site na `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), nke na-enyefe ọrụ ahụ n'aka **unified media detector** `detectMediaParts()` dị na `open-sse/utils/mediaParts.ts` — nke a bụ naanị ebe a na-enweta eziokwu nke ọtụtụ ụdị a na-ekerịta na combo compatibility filter.
   A na-ekwe ka extraction mee naanị n'ụdị `replaceImageParts` nwere ike itinyeghachi azụ (extract↔replace contract): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`, na Responses API `input_image`. A na-ewepụkwa ma dochie onyonyo dakọtara ndị dị n'ime Claude Code `tool_result.content` na Responses tool outputs n'okporo ụzọ mbụ ha; ụdị ndị bụ naanị ihe ngosi bụ nke combo-filter ji eme ihe, a naghị ewepụkwa ha.
   Mafere ma ọ bụrụ na ahụghị nke ọ bụla.
3. Kpebie nhazi runtime site na `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): igodo nhazi `modalityBridge*` ọhụrụ na-emeri; igodo `visionBridge*` ochie ka na-adị ka **one-cycle fallback** (rollback window). Mafere tupu njem media ọ bụla ma ọ bụrụ na agbanyụrụ bridge ahụ.
4. Onye họrọ mode (`modalityBridgeVisionMode`, lee tebụl dị n'okpuru) na-ekpebi reroute ma ọ bụ describe. Reroute na-eweghachite `modifiedPayload` nke gbanwere naanị `model`, tinyere meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Ụzọ describe: kpachie onyonyo na `maxImages`, jikọta prompt dabara n'ọrụ ahụ, lelee describe cache, kpọọ ụdị vision ahụ **n'otu oge**
   (`Promise.allSettled`), ma tinye akụkụ ederede `[Image N]: <description>` n'ebe ha nọ. Describe dara ada na-enye `null`: a na-echekwa onyonyo raw maka targets a na-amaghị ma ọ bụ ndị nwere vision (#4012), mana **direct target** text-only a kwadoro ma ọ bụ combo na-enweghị vision na-enweta stub ederede doro anya
   `(unavailable — no vision-capable provider connected)` maka onyonyo ọ bụla a na-akọwaghị, gụnyere ọdịda akụkụ ụfọdụ na onyonyo gafere oke describe-call (#17069). All-failed combo describe fallback dị ugbu a ka na-adị (#8430).
6. Weghachite `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Onye họrọ mode (`modalityBridgeVisionMode`)

| Mode       | Ndabara | Omume                                                                                                                                                                                                                                                                   |
| ---------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | Heuristic ochie, agbanwebeghị (#6640/#7204): ụdị na-abụghị combo/ụdị `auto/` na-ebugharị gaa n'ụdị vision kacha mma, ọ gwụla ma ụdị mbụ ahụ nwere nzere eji arụ ọrụ (mgbe ahụ a na-eme describe); targets combo na-eme describe mgbe niile.                             |
| `describe` |         | Na-eme describe mgbe niile — a na-awụpụ reroute block kpamkpam; ụdị onye ọrụ họọrọ ka na-aza mgbe niile.                                                                                                                                                                |
| `reroute`  |         | Na-amanye reroute: a na-awụpụ nchedo keep-credentialed-model. Nchedo nzere nke reroute-**target** ka na-arụ ọrụ — mgbe target vision eji arụ ọrụ adịghị, bridge na-egbochi ya site na njehie doro anya kama ịme describe ma ọ bụ iziga onyonyo raw na target text-only. |

Ụdị a manyere na-akwụsị usoro ahụ **tupu** auto heuristic agba ọsọ; omume `auto` bụ otu byte-for-byte na guardrail tupu PR-1.

#### Oke igodo API (`visionBridgeKeyScope.ts`)

Mgbe igodo API nke onye na-akpọ machibidoro `allowedConnections`, ọdọ mmiri oke
(`allowedQuotas`) ma ọ bụ ụdịdị (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), bridge ahụ na-ahọrọ naanị
ụdịdị reroute na describe nke igodo ahụ nwere ike iji, n’elu njikọ ndị igodo ahụ nwere
ike iji. Kpọọ describe na-agafe mgbe niile na self-loop OmniRoute ya na nkụnye `x-omniroute-self-loop-key-id`,
ya mere arịrịọ nkata na-anata na-amanye iwu njikọ na ụdịdị nke igodo ahụ ọzọ.
`enforceApiKeyPolicy()` na-asọpụrụ nkụnye ahụ naanị mgbe ejikọtara ya na self-loop bearer,
ya mere ọ nwere ike ibelata ohere naanị, a na-ajụkwa id na-enweghị mkpebi.

Ọ bụrụ na enweghị ụdịdị vision ọ bụla igodo ahụ kwere, **target ederede naanị ekwenyesiri ike**
na-ajụ arịrịọ onyonyo ahụ n’ime obodo site na HTTP 400 doro anya kama iziga bytes onyonyo
na upstream na-enweghị ike ya (#17069). Maka targets nwere ikike vision a na-amaghị ma ọ bụ
nke ha nwere n’ala nna, ụzọ describe na-edobe omume fail-open ya gara aga
(meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Arịrịọ na-enweghị igodo, na igodo ndị na-enweghị mmachi ndị a, na-eme omume kpọmkwem dịka ọ dị na mbụ.

#### Nkọwa prompt maara ọrụ (`modalityBridgeVisionTaskAware`)

Nke ndabara bụ **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) na-agbakwunye
ederede nke **ozi onye ọrụ ikpeazụ** (a kpara ya ruo mkpụrụedemede 500) na prompt describe
isi, na-eduzi nkọwa ahụ n’ihe onye ọrụ jụrụ n’ezie
(ụkpụrụ codex-vision-proxy) ma na-arịọ ụdịdị vision ka o depụta ederede a na-ahụ anya.
Mgbe agbanyụrụ flag ahụ — ma ọ bụ mgbe enweghị ederede onye ọrụ — a na-eji prompt isi ahụ
emeghị mgbanwe.

Arịrịọ OpenAI-compatible nke self-loop describe n’onwe ya
(`callVisionModelSingle()` na `visionBridgeHelpers.ts`) na-arịọ `image_url.detail: "high"`
mgbe niile — n’enweghị ọnọdụ, maka caller/provider niile, na-enweghị ịdabere na mgbaama client
ọ bụla. Nlele nkọwa dị ala na-ebelata izi ezi OCR kpọmkwem maka ọrụ idegharị ederede nke
prompt a na-arịọ, ya mere oku describe n’onwe ya na-arịọ nkọwa dị elu mgbe niile n’agbanyeghị
ọkwa nkọwa arịrịọ inbound mbụ jiri. Nke a na-emetụta naanị ahụ arịrịọ describe nke ime;
ọ naghị agbanwe otú OmniRoute si ebufe `image_url.detail` nke caller na arịrịọ isi —
a na-etinye ndabara ahụ iche, naanị maka clients OpenCode a chọpụtara, na
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Alaka
Anthropic wire-format nke self-loop describe enweghị mpaghara `detail`, ndabara ọ bụla adịghịkwa emetụta ya.

#### Oke mmepụta describe (`modalityBridgeVisionMaxChars`)

| Key                            | Default | Range            |
| ------------------------------ | ------- | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` or 100–50000 |

`0` (ndabara) pụtara **enweghị oke** — a na-ebufe nkọwa `callVisionModel()` weghachiri
na-enweghị mgbanwe, na-echekwa omume dị adị. Uru ọ bụla dị n’agbata 100–50000 na-akpụ
nkọwa ahụ site na suffix `…` tupu etinyeghachi ya dịka `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` na `src/lib/guardrails/visionBridge.ts`).
Bulie nke a maka ọrụ OCR chọrọ nkọwa zuru ezu ebe ụdịdị downstream chọrọ transcript zuru ezu;
belata ya iji kpachie ojiji token n’ụdịdị vision na-ekwu ọtụtụ okwu.
Mpaghara dashboard dị na panel Advanced nke taabụ Vision
(`modality-bridge-max-chars` na `ModalityBridgeVisionTab.tsx`) ma na-ebuli uru ọ bụla dị
n’agbata 1 na 99 ruo n’ala 100, ebe ọ na-ahapụ `0` akọwapụtara nke ọma ka ọ ghara ịgbanwe —
`0` bụ uru Zod ziri ezi n’onwe ya
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ọ bụghị naanị ndabara
“unset”.

#### Cache describe (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL dị na ebe nchekwa maka mmepụta describe, nke usoro niile na-ekekọrịta.
Igodo = `sha256(imageRef + composedPrompt + configuredBridgeModel)` nwere framing prefix ogologo
(ọ dịghị nkukota ókè ubi). Akụkụ ụdịdị ahụ bụ ụdịdị bridge **ahaziri**, ọ bụghị ụdịdị zara
n’ezie — `callVisionModel` nwere ike ịdaba n’ime ya, ma ịhazi igodo kwa mbọ ga-ekewa cache.
A naghị echekwa describes dara ada. Ntọala:

| Key                             | Default | Range   |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Nhazi onyonyo dịpụrụ adịpụ (self-loop describe/base64 fetch)

Mgbe bridge ahụ n’onwe ya na-ebudata onyonyo **dịpụrụ adịpụ** — oku Anthropic describe
n’onwe ya na ntụgharị base64 nke claude wire-format
(`ensureBase64ImagesForClaudeWire`), ha abụọ na-eji
`fetchRemoteImageAsDataUri()` na `visionBridgeHelpers.ts` — a na-agafe data URI dapụtara
na `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) tupu etinye ya n’arịrịọ
ụdịdị vision. A na-ebelata onyonyo buru ibu ruo **2048px n’akụkụ ogologo**
(dakọtara oke resize OpenAI/Anthropic na-etinyelarị n’akụkụ server), nke na-ebelata bytes/latency
mbulite na-enweghị ịgbanwe ihe ụdịdị vision na-ahụ. Resize na-eji `sharp`, nke a na-ebubata
site na dynamic import: n’elu ikpo okwu ebe binary obodo ya dara ibudata,
`normalizeDataUri()` **anaghị atụfu njehie mgbe ọ bụla** — ọ na-alaghachi n’ịfefe bytes mbụ
na-enweghị mgbanwe, ya mere ụzọ describe/base64-conversion na-aga n’ihu mgbe niile.
Bytes na-abụghị onyonyo (fetch nke weghachighị onyonyo a pụrụ ịkọwa) na-agafekwa na-enweghị
mgbanwe. Nhazi a metụtara naanị onyonyo bridge na-ebudata maka self-call nke ya — a naghị
etinye ya n’ime raw passthrough payload nke caller, dịka ụkpụrụ mgbanwe opt-in-only si kwekọọ
(Hard Rule #20).

#### Atụmatụ schema ntọala + mbugharị

A na-enyocha igodo `modalityBridge*` ọhụrụ site na Zod n’ime `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, otu atọ nke `modalityBridgeCache*`, na
otu `modalityBridgeAudio*` nke Audio Bridge na-eji. Migration
`141_modality_bridge_settings.sql` na-edepụta ụkpụrụ `visionBridge*` ochie ndị dị
adị na igodo ọhụrụ kwekọrọ (ọ naghị eme mgbanwe ugboro abụọ, ọ naghịkwa
edochi ụkpụrụ `modalityBridge*` onye ọrụ setịpụrụ); a ka na-anabata igodo ochie
dị ka ụzọ fallback ọgụgụ maka otu okirikiri mwepụta.

#### Isi transparency + ọnụ ọgụgụ

Nzaghachi ndị a kọwara ma gbanwee na-ebu
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(a na-ewu ya site na `buildModalityBridgeHeader()` na `modalityBridge/bridgeStats.ts`,
`withModalityBridgeHeader()` nke dị na `src/sse/handlers/chatHelpers.ts` na-etinyekwa ya).
Arịrịọ ndị ebugharịrị anaghị enweta header ọ bụla — a metụghị payload ahụ aka,
ngbanwe model ahụkwa apụtalarị n’ubi `model` dị n’ime ahụ nzaghachi.

`GET /api/modality-bridge/stats` (nkwenye njikwa, n’otu tier ahụ na
`GET /api/settings`) na-eweghachite counters ndị dị n’ime ebe nchekwa maka modality
ọ bụla `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` maka `vision`, `audio`, na
`video`. `averageLatencyMs` na-eji `latencySamples`, ọ bụghị attempts niile, dị ka
denominator ya; ọrụ na-enweghị oge e tụrụ anaghị emepụta sample efu nke
milliseconds. `bridged` ka bụ alias dakọtara azụ maka ntụgharị gara nke ọma;
attempts dara ada anaghị abawanye ya.
A na-emegharị counters mgbe process malitegharịrị dịka e si hazie ya
(telemetry, ọ bụghị ndekọ ego).

#### Nhazi dashboard

Peeji dashboard raara nye bụ
`/dashboard/settings/modality-bridge`. Taabụ `Vision`, `Audio`, na `Video` nke URL
na-achịkwa na-echekwa query parameters mgbe ha na-agbanwe uru `tab`.
Taabụ Vision na-egosi ịgbalite, mode, nhọrọ model (gụnyere default akpaghị aka),
prompting maara ọrụ, oke timeout/image/ogologo nkọwa/cache ndị dị elu, counters
oge ọsọ, na arịrịọ sample nwere nchebe. Taabụ Audio dịkwa ndụ: ọ na-egosi
ịgbalite, onye ahọrọ model STT naanị nke nwere Auto, oke timeout/max-clip, counters
audio, na ule sample `input_audio`. Taabụ Video na-arụ ọrụ: ọ na-akọ ọnọdụ oge ọsọ
FFmpeg/ffprobe — otu n’ime ọnọdụ UI anọ akọwapụtara (`unknown` mgbe probe ka na-eme
ma ọ bụ enweghị ike ịmecha, `restricted` na host dashboard na-abụghị loopback ebe
a na-amapụ probe n’akụkụ client, `unavailable` mgbe probe mechara ma kwado na ọ
dịghị, ma ọ bụ `available` tinyere nsụgharị FFmpeg/ffprobe) — ọ na-echekwa oke
enable/model/frame/video/timeout, na-ahazi onye ahọrọ model ka ọ bụrụ naanị
models nwere ike vision, ma na-egosikwa counters video.

Kaadị Vision Bridge mbụ dị n’okpuru ntọala AI bụ njikọ ndakọrịta gaa na peeji ọhụrụ;
ọ bụghịzi onye nwe ụdị ahụ nke abụọ. Media Providers na-ejikwa workflows
Image-to-Text na Speech-to-Text na taabụ Modality Bridge kwekọrọ, n’ebughị
playground Speech-to-Text dị adị.

**Mwepụ ihe mgbochi nnabata self-loop:** mgbe arịrịọ describe gafere na self-loop
`/v1` nke OmniRoute n’onwe ya (model provider na-abụghị ọkọlọtọ), sub-request ahụ
na-eziga `x-omniroute-admission-bypass: internal` ma jiri credential self-loop a
kpebiri kwenye ya — sentinel `sk_omniroute` dị n’ime local mode, ma ọ bụ igodo env
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` onye ọrụ haziri (#1350) ka deployments
`REQUIRE_API_KEY=true` nwee ike ịme arịrịọ describe ahụ. A na-asọpụrụ bypass ahụ
naanị maka credentials ndị ahụ kpọmkwem, ya mere clients ndị si n’èzí enweghị ike
iji header ahụ gafee admission.

Default ochie dị na `src/shared/constants/visionBridgeDefaults.ts`; mode ọhụrụ,
task-aware/cache defaults na settings resolver dị na
`src/shared/constants/modalityBridgeDefaults.ts`. Guardrail ahụ na-ekpughe
nhọrọ constructor `deps` ka tests nwee ike itinye implementations `getSettings`
na `callVisionModel` adịgboroja.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Ọ na-ejide arịrịọ chat nwere audio tupu ha erute target a na-amaghị na ọ na-anabata
audio input. Ọ naghị ebugharị arịrịọ chat ahụ n’ụzọ ọzọ: a na-edegharị akụkụ audio
site na multipart endpoint OpenAI-compatible dị adị, model chat a họọrọ na-aga
n’ihu na transcripts ederede.

Usoro:

1. Kpebie `supportsAudio` site na `getResolvedModelCapabilities()`. Metadata `provider-registry` nke akọwapụtara nke ọma na-emeri, soro metadata static model, ma mesịa `modalities_input` nke emekọrịtara. Ndepụta input e kwupụtara nke na-enweghị `audio` bụ `false`; ọ bụrụ na enweghị ihe akaebe capability fọdụrụ, ọ bụ `null`. Ma `false` ma `null` na-arụ ọrụ conservative bridge, ebe `true` na-agafe ya.
2. Kpebie ntọala `modalityBridgeAudio*`, ma wepụta akụkụ `audio` ndị dị n’elu ọkwa, nke a pụrụ ịtinye n’etiti, site na ozi ọ bụla site na onye nchọpụta `detectMediaParts()` a na-ekekọrịta. Ụdị wire ndị akwadoro bụ OpenAI `input_audio`, `audio_url`, na `source.media_type: "audio/*"`. A na-achọpụta audio dị n’ime maka routing, mana splice path anaghị ewepụ ya. Ọrụ ahụ nwere oke `modalityBridgeAudioMaxClips`; akụkụ ndị na-abịa mgbe e mesịrị na-adị ka ha dị.
3. Soro `provider/model` a haziri, ma ọ bụ kwe ka `selectAudioBridgeModel()` gafee `AUDIO_TRANSCRIPTION_PROVIDERS` n’usoro catalog kwụsiri ike ma họrọ model mbụ nwere nzere provider na-arụ ọrụ nke a pụrụ iji.
4. `callAudioTranscription()` na-agbanwe audio base64/data-URI ka ọ bụrụ `file` multipart, ma ọ bụ budata `audio_url` dịpụrụ adịpụ site na outbound guard nke naanị public URL kwere, tinyere DNS pinning na oke 25 MB. Mgbe ahụ ọ na-eziga file ahụ na model a họọrọ site na POST gaa na self-loop mpaghara `/v1/audio/transcriptions`, jiri `resolveSelfLoopBearer()` mee authentication. Route transcription dị ugbu a na-arụ lookup nzere nkịtị, njikwa cooldown/rate-limit, na dispatch gaa provider.
5. Oku ndị gara nke ọma na-eji `[Audio N]: <transcript>` dochie akụkụ ha. Oku ndị ahụ na-agba site na `Promise.allSettled`: ọdịda nke otu oku na-echekwa akụkụ audio mbụ ahụ (#4012 contract). Ọ bụrụ na oku niile daa ma e gosipụta na target ahụ nwere `supportsAudio === false`, akụkụ ndị ahụ na-abụ
   `[Audio N]: (unavailable — no STT provider connected)` (#8430 contract). Maka target a na-amaghị (`null`), nsonaazụ ọdịda niile na-anọgide na-agbanwebeghị. Target a gosipụtara na ọ bụ naanị text, nke na-enweghị nzere STT a pụrụ iji, na-enweta stub doro anya ahụ n’enweghị oku network.

Transcript ndị gara nke ọma na-eji cache Modality Bridge LRU/TTL nke usoro niile na-ekekọrịta. Key ahụ na-ejikọta ntụaka audio, label operation `audio-transcription` kwụsiri ike, na model STT a họọrọ; a naghị echekwa ọdịda. Mgbalị audio na-emelite counter `bridged`, `cacheHits`, `failures`, na `lastUsedAt` ndị a na-ekekọrịta. Nzaghachi ndị a gbanwere na-ebu
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; arịrịọ ndị a na-emetụghị aka anaghị enweta akụkụ Audio Bridge.

Ntọala runtime sitere na DB ma Zod na-enyocha ha:

| Igodo                         | Ndabara | Oke                 |
| ----------------------------- | ------- | ------------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                   |
| `modalityBridgeAudioModel`    | `""`    | Auto ma ọ bụ STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000         |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10                |

Cache a na-ekekọrịta ka `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, na `modalityBridgeCacheMaxEntries` na-achịkwa ya.

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

### PII Masker (`piiMasker.ts`)

Ọ na-agba n’ime stages **abụọ**.

- **`preCall`** na-eme clone nke payload, na-agafe `system`, `messages`, `input`, na
  `prompt` (gụnyere plain string items), ma tinye `processPII()` (site na
  `@/shared/utils/inputSanitizer`) n’ọrụ n’elu string `content`/`text` fields. Mgbe
  `PII_REDACTION_ENABLED=true`, a na-ezo PII a chọpụtara n’ime outbound
  payload. Nke a nọọrọ onwe ya na `INPUT_SANITIZER_MODE` (nke na-achịkwa naanị
  prompt-injection policy). Mgbe redaction gbanyụrụ, call ahụ na-edekọ ọnụọgụ
  detections n’enweghị idegharị content.
- **`postCall`** na-eme deep clone nke response, na-agba
  `sanitizePIIResponse()` tinyere Responses-API-shape masker (`maskResponsesOutput` — na-ekpuchi
  `output_text` na `output[].content[].text`). Ọ bụrụ na redaction ọ bụla mere, response
  ahụ gbanwere na-anọchi nke mbụ.

Guardrail ahụ anaghị egbochi; ọ na-etinye naanị annotations (`meta.detections`,
`meta.redacted`) ma ọ bụ degharịa.

#### Nhọrọ kwa ụdị, custom patterns na detection counters

**Dashboard → Settings → Security → PII masking** na-ahọrọ _ihe_ a ga-ezo. Ọ
gaghị agbanye masking: nke ahụ ka bụ `PII_REDACTION_ENABLED` (request) na
`PII_RESPONSE_SANITIZATION` (response + SSE), ha abụọ na-agbanyụ na ndabara.

- **Per-type selection** — built-in ids dị na
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Ọ bụrụ na edozighị ya, ọ
  pụtara ụdị niile (omume dị tupu setting a adị). Pattern `ssn_us` nke request engine
  na-map gaa na `ssn`. Templates (Minimal, Standard, Financial, Brazilian, USA, GDPR,
  POPIA, Full) na-emeju naanị checkboxes dị na UI.
- **GDPR na POPIA identifiers** — built-in ids iri na abụọ na-ekpuchi personal
  identifiers nke EU na South Africa (lee tebụl dị n’okpuru). Regexes, validators na
  jurisdiction tags ha bi n’otu tebụl, `src/shared/utils/piiPatterns.ts`, nke ma
  response sanitizer (`src/lib/piiSanitizer.ts`) na request masker
  (`src/shared/utils/inputSanitizer.ts`) na-eji. A na-ezo match naanị mgbe validator
  ya nabatara ya; ọnụọgụ gbara ọtọ abụghị ihe zuru ezu. Operator nke chekwara narrowed
  selection tupu ids ndị a adị ga-ejigide omume o nwere ruo mgbe a họpụtara ids ọhụrụ ahụ.
- **Custom patterns** — regex ma ọ bụ wildcard patterns ruru 20 (`*` = ruo na mkpụrụedemede
  64 na-abụghị whitespace, `?` = otu). Matches na-aghọ `[CUSTOM_REDACTED]`.
  Pattern ọ bụla na-agafe `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): kacha ukwuu bụ characters 500, flags bụ naanị
  `g i m s u`, ọ ga-enwerịrị ike compile, ọ ga-agafe `safe-regex` (catastrophic
  backtracking), ma ghara ịmatch empty string ma ọ bụ redaction placeholder.
  A na-ajụ pattern dara ada mgbe a na-echekwa ya na mgbe a na-anwale ya, ebe stored row
  dara ada na-awụpụ ya n’oge runtime kama ịcompile ya. Custom patterns na-agba naanị
  mgbe masking gbanyere.
- **Detection counters** — a na-edekọ counts kwa ụdị (ọ dịghị mgbe a na-echekwa values ndị
  matches), n’ime memory ma na-reset mgbe restart (`src/lib/pii/piiDetectionStats.ts`).
  Ha na-abawanye naanị mgbe masking gbanyere.

Settings ndị a dị na `key_value` table (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) ma a na-agụ ha site na cache nke sekọnd 1. API:

| Method | Path                     | Purpose                                                                                |
| ------ | ------------------------ | -------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Ọnọdụ ọkọlọtọ, `enabledTypes`, `customPatterns`, ọnụọgụ nchọpụta                       |
| `PUT`  | `/api/settings/pii`      | Dochie `enabledTypes` (`null` = niile) na/ma ọ bụ `customPatterns`                     |
| `POST` | `/api/settings/pii/test` | Nwalee otu ụkpụrụ n’enweghị idebe ya megide sample ruru 8 KB; ọ dịghị ihe a na-echekwa |

Ha atọ chọrọ njirimara njikwa ma jiri Zod nyochaa body
(`src/shared/validation/schemas/piiSettings.ts`). Mgbe agbanyụrụ nbanye
(`requireLogin=false`), `GET` na njedebe test ghe oghe, mana `PUT` ka chọrọ
nnọkọ dashboard, igodo API nwere scope `manage`, token nnweta `oma_`
nwere write scope ma ọ bụ nke dị elu, ma ọ bụ token CLI ma ọ bụ token
ọrụ-ime dị n’ime ezigara site na loopback.

#### Ihe njirimara GDPR (EU) na POPIA (South Africa)

| Id                  | Identifier               | Validation                                                                                     |
| ------------------- | ------------------------ | ---------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                     | Mba a maara, ogologo ziri ezi maka mba ahụ, ISO 13616 MOD-97-10                                |
| `eu_vat`            | EU VAT number            | Prefix nke steeti otu a maara na usoro nọmba steeti ahụ (enweghị nchọpụta VIES)                |
| `es_dni_nie`        | Spanish DNI / NIE        | Akwụkwọ ozi njikwa (uru mod 23); NIE bụ `X/Y/Z` + mkpụrụedemede 7                              |
| `it_codice_fiscale` | Italian Codice Fiscale   | Akwụkwọ ozi njikwa sitere na tebụl ọnọdụ odd/even                                              |
| `pl_pesel`          | Polish PESEL             | Checksum nwere ibu na ụbọchị ọmụmụ etinyere n’ime ya nke dị adị                                |
| `nl_bsn`            | Dutch BSN                | Ihe akaebe 11 (weights 9..2, -1)                                                               |
| `de_steuer_id`      | German Steuer-ID         | ISO 7064 Mod 11,10 tinyere iwu nhazi digit (ọ dịghị 0 n’ihu)                                   |
| `se_personnummer`   | Swedish personnummer     | Luhn n’elu digits iri ikpeazụ na ụbọchị ọmụmụ nwere ezi uche (digits 10 ma ọ bụ 12)            |
| `za_id`             | South African ID number  | Luhn n’elu digits 13 niile, ọnwa/ụbọchị ọmụmụ ziri ezi, digit ịbụ nwa amaala 0 ma ọ bụ 1       |
| `za_phone`          | South African phone      | Prefix `+27` / `27`, ma ọ bụ ụdị mba `0..` nke e dere na oghere ma ọ bụ hyphen                 |
| `za_vat`            | South African VAT number | Digits 10 na-amalite na `4` **na** "VAT" / "BTW" n’ime mkpụrụedemede 48 dị tupu ya             |
| `za_tax_ref`        | South African tax ref.   | Digits 10 na-amalite na `0`-`3`, Luhn, **na** "tax" / "SARS" n’ime mkpụrụedemede 48 dị tupu ya |

N’ihi na usoro ndị nwere digits naanị nwere ike ịdakọ na nọmba iwu, nọmba
build na timestamps, ndị kacha adịghị ike (`za_vat`, `za_tax_ref`) chọrọ
okwu nduzi, a naghị ewerekwa nọmba digits iri nkịtị nke `0..` dị ka nọmba
ekwentị South Africa. A naghị amata IBAN ndị nwere oghere (`GB29 NWBK ...`).
N’ụzọ streaming, a na-achọ cue ahụ naanị n’ime chunk dị ugbu a. Id ndị a dị
n’ihu usoro phone izugbe, ya mere identifier a kwadoro na-edobe placeholder
nke ya
(`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Templates `gdpr` na
`popia` na-ahọrọ id EU na South Africa n’otu n’otu. Masking n’onwe ya ka bụ
ihe a ga-ahọrọ (Hard Rule #20): ọ dịghị ihe dị ebe a na-agbanwe ndabara
feature-flag.

### Ntinye Prompt (`promptInjection.ts`)

Ọ na-achọpụta nhazi ndị iro dị n’ime ọdịnaya onye ọrụ nyere ma na-amanye
amụma ahaziri. Ọdịdị ya na-agbaso environment variables na nhọrọ constructor:

| Setting         | Env var                                                                                               | Default | Effect                                                                                                                                                                                                |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enabled         | `INPUT_SANITIZER_ENABLED`                                                                             | `true`  | Mgbe ọ bụ `false`, guardrail na-akwụsị ozugbo.                                                                                                                                                        |
| Mode            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`  | Amụma injection: `block`, `warn`, ma ọ bụ `log`. (`redact` ka a na-anabata maka ndakọrịta azụ, mana ọ **adịghị** ewepụ ederede injection; `PII_REDACTION_ENABLED` na-achịkwa rewrite PII nke arịrịọ.) |
| Block threshold | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Opekempe ogo siri ike achọrọ iji gbochie. Na ndabara, Medium bụ naanị ihe a na-ahụ anya.                                                                                                              |

**Ịdị elu nke Mode** (`getMode`): `options.mode` nke onye kpọrọ →
`INJECTION_GUARD_MODE` **DB feature-flag override** (Dashboard → Settings →
Feature Flags) → env `INJECTION_GUARD_MODE` → env `INPUT_SANITIZER_MODE` →
`warn`. Ya mere override dashboard na-emeri env vars, nke pụtara na UI Feature
Flags na-achịkwa guard na-agba ọsọ ozugbo (enweghị restart). Ọgụgụ DB ahụ bụ
fail-safe: ọ bụrụ na ọ daa, guard na-alaghachi n’omume dabere na env, ma mgbe
edobebeghị override, omume ya na-adị ka mkpebi sitere na env naanị.

Ebe nchọpụta:

1. `sanitizeRequest()` sitere na `@/shared/utils/inputSanitizer` (nhazi detector
   nkekọrịta a na-eji ebe ọzọ na pipeline).
2. `DEFAULT_GUARD_PATTERNS` nke e wuru n'ime (ugbu a bụ
   `system_override_inline` na `markdown_system_block`, ha abụọ nwere ogo
   ịdị njọ `high`).
3. `customPatterns` nhọrọ a na-ebufe site na nhọrọ constructor (strings, regex,
   ma ọ bụ ndekọ `{ name, pattern, severity }`).

Mgbe `mode === "block"` **na opekata mpe otu nchọpụta ruru ogo ịdị njọ achọrọ**, `preCall` na-eweghachi `{ block: true, message: "Request rejected:
suspicious content detected" }`. Na ụdị `warn`/`log`, guardrail na-edekọ ozi mana ọ na-ekwe ka oku ahụ gaa n'ihu. A na-ebupụkwa helper nkekọrịta `evaluatePromptInjection()` maka ndị na-akpọ ya chọrọ inyocha prompts n’enweghị ịgafe registry.

**Oke nyocha (v3.8.20):** detector na-enyocha naanị **16 KB mbụ** nke ederede prompt jikọtara — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) dị na
`src/shared/utils/inputSanitizer.ts`. Ma `detectInjection()` ma
`evaluatePromptInjection()` na-eme `slice(0, MAX_INJECTION_SCAN_BYTES)` tupu ha amalite
pattern loop. Ntuziaka injection na-adịkarị n’akụkụ elu nke input, ya mere nke a na-egbochi CPU/GC nke regex n’elu payload ndị nwere narị KB, n’enweghị ime ka nchọpụta daa mbà (lee #3932, #4041).

### Onye Na-ekpuchi Akwụkwọ Nzuzo (`credentialMasker.ts`)

Ọ na-arụ ọrụ na stages **ma abụọ**, bụrụ nke ikpeazụ n’ime default chain (priority `95`). Ọ na-ezochi ụdị API-key / secret-token ndị a ma ama na payload na-apụ apụ (ọdịnaya ozi, arụmụka tool-call, nsonaazụ tool) **na** nzaghachi provider, ka credential e tinyere n’ime prompt (ma ọ bụ nke nsonaazụ tool weghachiri) ghara ịpụ n’aka provider dị n’elu ma ọ bụ laghachi n’aka client.

- **A na-agbanye ya naanị site na nhọrọ**, dịka mgbakọ PII (Hard Rule #20-dị nso): ọ naghị arụ ọrụ ma ọ bụrụ na `settings.credentialRedactionEnabled === true` **ma ọ bụ**
  `CREDENTIAL_REDACTION_ENABLED=true`. Mgbe ọ gbanyụrụ, guardrail bụ no-op — ọ naghị egbochi ma ọ bụ gbanwee ihe ọ bụla.
- `redactCredentials()` na-agafe osisi payload/response dum (`walkValue()`,
  nke na-echebe pụọ na prototype pollution, ma na-echekwa nchekwa megide cycles site na `WeakSet`) wee dochie matches na placeholder `[REDACTED:<type>]`, na-eme clone naanị nke alaka gbanwere.
- `CREDENTIAL_PATTERNS` na-ekpuchi igodo LLM provider (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), token VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), igodo ịkwụ ụgwọ (Stripe, Square), igodo cloud
  (AWS access key, Twilio, SendGrid, Mailgun), private keys / JWTs,
  connection strings nwere credential (`mongodb://user:pass@...`, wdg.), na
  pattern uru header izugbe `Authorization`/`x-api-key`/`api-key`/`apikey`.
  A na-ezochi igodo nwere ọdịdị header (`authorization`, `x-api-key`, `api-key`,
  `apikey`) n’usoro nhazi (uru naanị, ebe a na-echekwa prefix scheme dịka
  `Bearer `/`Basic `) kama iji generic text regex.
- Guardrail ahụ anaghị egbochi mgbe ọ bụla; ọ na-eme naanị mgbanwe (`modifiedPayload` /
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
