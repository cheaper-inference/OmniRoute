# Guardrails (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Isi mmalite nke eziokwu:** `src/lib/guardrails/`
> **Emelitere ikpeazụ:** 2026-08-29 — v3.8.51 (Video Bridge transcript provenance bụ nke onye kpọrọ ọrụ kwupụtara,
> sava enyochabeghị ya — akọwapụtara nke ọma dịka #11661)

Guardrails na-amanye nchekwa, amụma, na mgbanwe ọdịnaya n'ókè dị
n'etiti OmniRoute na ndị na-eweta ọrụ upstream. Guardrail ọ bụla nwere ike inyocha (ma
ọ bụrụ na achọrọ, jụ, gbanwee, ma ọ bụ tinye nkọwa na) payload arịrịọ (`preCall`) na
nzaghachi upstream (`postCall`).

Sistemụ ahụ bụ **fail-open**: ọ bụrụ na guardrail atụpụta njehie mgbe ọ na-arụ ọrụ, registry
na-edekọ njehie ahụ ma gaa n'ihu na guardrail na-esote kama ime ka
arịrịọ ahụ daa. Igbochi bụ mkpebi doro anya (`block: true`), ọ bụghị ihe mberede.

## Nchedo Ndị E Wụnyere N'ime Sistemụ

Registry na-ebunye ihe nchedo isii na-akpaghị aka dịka usoro mkpa ha si dị mgbe a na-eme import
(lee `registry.ts` → `registerDefaultGuardrails()`):

| Mkpa | Aha                 | Ọkwa           | Faịlụ                 |
| ---- | ------------------- | -------------- | --------------------- |
| `5`  | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`  | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`  | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10` | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20` | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95` | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nọmba mkpa ndị dị ala na-arụ ọrụ **mbụ**.

### Njikọ Ọhụụ (`visionBridge.ts`) — Njikọ Ụdị Mgbasa Ozi PR-1

Ọ na-egbochi arịrịọ nwere onyonyo ndị ezubere maka **model ndị na-enweghị ikike ịhụ onyonyo**, wee zipụ arịrịọ ahụ dum ọzọ gaa na model nwere ikike ịhụ onyonyo, ma ọ bụ dochie akụkụ onyonyo ahụ na nkọwa ederede nke model ọhụụ a pụrụ ịhazi mepụtara tupu oku gaa n'ọrụ dị n'elu. Nke a na-enye ndị na-eweta ọrụ na-anabata naanị ederede ohere ijikwa payload nwere ọtụtụ ụdị mgbasa ozi n'ụzọ anaghị ahụ anya.

Usoro:

1. Mafere ma ọ bụrụ na model ebumnuche akwadolarị ọhụụ (ọ gwụla ma ọ pụtara na
   ndepụta njikọ-amanye `isVisionBridgeForcedModel`).
2. Wepụta akụkụ onyonyo site na `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), nke na-enyefe ọrụ ahụ n'aka **ngwa nchọpụta mgbasa ozi
   jikọtara ọnụ** `detectMediaParts()` dị na `open-sse/utils/mediaParts.ts` — ya bụ
   otu isi iyi nke eziokwu nke ya na nzacha ndakọrịta combo na-eji.
   A na-eji allowlist gbochie mmepụta ahụ ka ọ bụrụ naanị akụkụ dị n'elu nke ụdị
   `replaceImageParts` nwere ike ịtinyeghachi (nkwekọrịta extract↔replace): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"`, na Responses API `input_image`. Ihe achọpụtara n'ime
   akụkụ ndị ọzọ na ụdị ndị na-egosi naanị ihe bụ ihe nke nzacha combo, a naghị
   ewepụtakwa ha. Mafere ma ọ bụrụ na ahụghị nke ọ bụla.
3. Kpebie nhazi runtime site na `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): igodo nhazi ọhụrụ `modalityBridge*`
   na-ebute ụzọ; igodo ochie `visionBridge*` ka bụ **fallback nke otu cycle**
   (oge rollback). Mafere tupu ịgafe mgbasa ozi ọ bụla ma ọ bụrụ na agbanyụrụ
   bridge ahụ.
4. Onye nhọpụta mode (`modalityBridgeVisionMode`, lee tebụl dị n'okpuru) na-ekpebi
   ma a ga-eziga ọzọ ka a ga-akọwa. Reroute na-eweghachi `modifiedPayload` nke
   naanị `model` ka agbanwere, tinyere meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Ụzọ describe: kpachie onyonyo na `maxImages`, mepụta prompt maara ọrụ a na-arụ,
   lelee cache describe, kpọọ model ọhụụ ahụ **n'otu oge**
   (`Promise.allSettled`), ma tinye akụkụ ederede `[Image N]: <description>` n'ọnọdụ
   ha. Describe dara ada na-ewepụta `null`, a na-echekwa akụkụ onyonyo mbụ ahụ
   **ka ọ dị** (#4012) — belụsọ n'ụzọ combo describe mgbe describe niile dara,
   ebe upstream a kwadoro na ọ naghị akwado ọhụụ na-enweta stub
   `(unavailable — no vision-capable provider connected)` kama nke ahụ (#8430).
6. Weghachite `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Onye nhọpụta mode (`modalityBridgeVisionMode`)

| Mode       | Ndabara | Omume                                                                                                                                                                                                                                                                |
| ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | Heuristic ochie, agbanweghị ya (#6640/#7204): model ndị na-abụghị combo/`auto/` na-eziga ọzọ gaa na model ọhụụ kacha mma, belụsọ ma model mbụ ahụ enweela credential a pụrụ iji (mgbe ahụ, ọ ga-akọwa); ebumnuche combo na-akọwa mgbe niile.                         |
| `describe` |         | Na-akọwa mgbe niile — a na-amafere ngọngọ reroute kpamkpam; model onye ọrụ họọrọ na-aza mgbe niile.                                                                                                                                                                  |
| `reroute`  |         | Manye reroute: a na-agafe nchedo keep-credentialed-model. Nchedo credential nke **ebumnuche** reroute ka na-arụ ọrụ — mgbe enweghị ebumnuche ọhụụ a pụrụ iji, arịrịọ ahụ na-aga n'ihu na describe ka onyonyo raw ghara iru backend na-anabata naanị ederede (#8430). |

Mode ndị a manyere na-akwụsị ngwa ngwa **tupu** heuristic auto amalite; omume `auto`
bụ otu ihe kpọmkwem n'ọkwa byte na ihe nchedo dị tupu PR-1.

#### Oke API-key (`visionBridgeKeyScope.ts`)

Mgbe API key nke onye kpọrọ ọrụ machibidoro `allowedConnections`, ọdọ quota
(`allowedQuotas`) ma ọ bụ model (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), bridge ahụ na-ahọrọ
naanị model reroute na describe nke key ahụ nwere ike iji, n'elu connection ndị
key ahụ nwere ike iji. Oku describe ahụ na-agafe mgbe niile na OmniRoute self-loop
nwere header `x-omniroute-self-loop-key-id`, ka arịrịọ chat na-anata ya wee manye
amụma connection na model nke key ahụ ọzọ. `enforceApiKeyPolicy()`
na-asọpụrụ header ahụ naanị mgbe ọ nọnyere self-loop bearer, ya mere naanị
ibelata ohere ka ọ nwere ike ime, a ga-ajụkwa id a na-apụghị ịchọta.

Ọ bụrụ na enyeghị key ahụ ikike iji model ọhụụ ọ bụla, ụzọ describe na-ewepụ onwe ya,
arịrịọ ahụ agafekwa n'enweghị mgbanwe, nke bụ otu omume fail-open ahụ dị ka mgbe
agbanyụrụ ihe nchedo (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Arịrịọ ndị na-enweghị key, na key ndị na-enweghị mmachi ndị a, na-akpa otu o si dị
na mbụ.

#### Prompt describe maara ọrụ (`modalityBridgeVisionTaskAware`)

Ndabara bụ **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) na-agbakwụnye
ederede dị na **ozi ikpeazụ onye ọrụ zitere** (e belatara ruo mkpụrụedemede 500) na prompt
ntọala nke describe, na-eduzi nkọwa ahụ ka ọ lekwasị anya n'ihe onye ọrụ jụrụ n'ezie
(usoro codex-vision-proxy) ma na-arịọ vision model ka o depụta ederede a na-ahụ anya.
Mgbe flag ahụ gbanyụrụ — ma ọ bụ na ọ dịghị ederede onye ọrụ — a na-eji prompt ntọala ahụ
na-enweghị mgbanwe.

Arịrịọ OpenAI-compatible nke describe self-loop n'onwe ya (`callVisionModelSingle()`
n'ime `visionBridgeHelpers.ts`) na-arịọ `image_url.detail: "high"` mgbe niile —
n'enweghị ọnọdụ ọ bụla, maka caller/provider ọ bụla, ma ọ bụghị ihe mgbaàmà ọ bụla
sitere n'aka client na-achịkwa ya. Sampling nwere obere nkọwa na-ebelata izi ezi OCR
maka kpọmkwem ọrụ idegharị ederede prompt a na-arịọ, ya mere describe call n'onwe ya
na-arịọ nkọwa dị elu mgbe niile n'agbanyeghị ọkwa nkọwa arịrịọ mbụ batara jiri. Nke a
na-emetụta naanị body nke arịrịọ describe dị n'ime; ọ naghị agbanwe otu OmniRoute si
ezipụ `image_url.detail` nke caller n'onwe ya n'arịrịọ bụ isi — a na-etinye ndabara ahụ
iche, ma naanị maka OpenCode clients achọpụtara, n'ime `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Alaka Anthropic wire-format nke
describe self-loop enweghị field `detail`, ya mere ndabara abụọ ahụ anaghị emetụta ya.

#### Oke output nke describe (`modalityBridgeVisionMaxChars`)

| Key                            | Ndabara | Oke                   |
| ------------------------------ | ------- | --------------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` ma ọ bụ 100–50000 |

`0` (ndabara) pụtara **enweghị oke** — a na-ebufe nkọwa nke
`callVisionModel()` weghachiri n'enweghị mgbanwe, na-echekwa omume dị ugbu a.
Uru ọ bụla dị n'agbata 100–50000 na-eji suffix `…` belata nkọwa ahụ tupu etinyeghachi
ya dịka `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` n'ime
`src/lib/guardrails/visionBridge.ts`). Bulie nke a maka ọrụ OCR nwere ọtụtụ nkọwa
ebe downstream model chọrọ ederede niile e depụtara; wedata ya iji kpaara ojiji token
oke na vision models na-ekwu ọtụtụ okwu. Field dashboard ahụ dị na panel Advanced
nke taabụ Vision (`modality-bridge-max-chars` n'ime `ModalityBridgeVisionTab.tsx`)
ma na-ebuli uru ọ bụla dị n'agbata 1 na 99 ruo n'oke kacha nta 100, ebe ọ na-ahapụ
`0` e nyere kpọmkwem n'enweghị mgbanwe — `0` bụ uru Zod ziri ezi n'onwe ya
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ọ bụghị naanị
ndabara "unset".

#### Cache nke describe (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL dị na memory maka outputs nke describe, nke process niile na-ekekọrịta.
Key = `sha256(imageRef + composedPrompt + configuredBridgeModel)` nwere
length-prefix framing (enweghị nkukota n'ókè field). Akụkụ model bụ bridge model
**ahaziri**, ọ bụghị model zara n'ezie — `callVisionModel` nwere ike iji fallback
n'ime ya, ma iji key dị iche maka attempt ọ bụla ga-ekewa cache ahụ. A naghị echekwa
describe ndị dara ada na cache. Settings:

| Key                             | Ndabara | Oke     |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Nhazi onyonyo remote (self-loop describe/base64 fetch)

Mgbe bridge ahụ ji aka ya fetch **remote** image — Anthropic describe
self-call na claude-wire-format base64 conversion
(`ensureBase64ImagesForClaudeWire`), ha abụọ site na
`fetchRemoteImageAsDataUri()` n'ime `visionBridgeHelpers.ts` — a na-ebufe data
URI e mepụtara site na `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) tupu etinye ya n'arịrịọ vision-model.
A na-ebelata oversized images ruo **2048px n'akụkụ kachasị ogologo** (nke kwekọrọ
na resize cap OpenAI/Anthropic tinyelarị n'akụkụ server), nke na-ebelata
bytes/latency nke upload n'agbanweghị ihe vision model na-ahụ. Resizing na-eji
`sharp`, nke a na-ebunye site na dynamic import: n'elu platform ebe native binary
ya na-ajụ ịrụ ọrụ, `normalizeDataUri()` **anaghị atụpụ exception ma ọlị** — ọ na-eji
passthrough nke bytes mbụ dịka fallback, ka ụzọ describe/base64-conversion wee nọgide
na-arụ ọrụ mgbe niile. A na-ebufekwa bytes na-abụghị image (fetch nke na-eweghachighị
image enwere ike decode) n'enweghị mgbanwe. Nhazi a metụtara naanị images bridge
fetchere maka self-call nke ya — a naghị etinye ya ma ọlị na raw passthrough payload
nke caller, dịka ụkpụrụ mutation nke ga-eme naanị mgbe e mere opt-in si dị
(Hard Rule #20).

#### Schema settings + migration

A na-eji Zod enyocha keys ọhụrụ `modalityBridge*` n'ime `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trio `modalityBridgeCache*`, na group
`modalityBridgeAudio*` nke Audio Bridge na-eji. Migration
`141_modality_bridge_settings.sql` na-edegharị values ochie `visionBridge*`
gaa na keys ọhụrụ kwekọrọ na ha (ọ bụ idempotent, ọ naghị edegharị uru
`modalityBridge*` operator setịpụrụ); a ka na-anabata legacy keys dịka read fallback
maka otu release cycle.

#### Header nghọta doro anya + stats

Responses nke describe gbanwere nwere
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(nke `buildModalityBridgeHeader()` n'ime `modalityBridge/bridgeStats.ts` wuru,
ma `withModalityBridgeHeader()` n'ime `src/sse/handlers/chatHelpers.ts` tinyere).
Arịrịọ e reroute natara **enweghị** header — emetụghị payload ahụ aka, ma mgbanwe
model ahụ adịlarị anya na field `model` nke response body.

`GET /api/modality-bridge/stats` (nkwenye njikwa, otu ọkwa ahụ dị ka
`GET /api/settings`) na-eweghachi ọnụọgụ ndị a na-echekwa na ebe nchekwa maka modality ọ bụla
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` maka `vision`, `audio`, na
`video`. `averageLatencyMs` na-eji `latencySamples`, ọ bụghị mbọ niile, dịka
ọnụọgụ e ji ekewa; ọrụ na-enweghị nha oge anaghị emepụta nlele efu-millisecond
adịgboroja. `bridged` ka bụ aha nnọchi dakọtara na nsụgharị ochie maka ntụgharị
gara nke ọma; mbọ ndị dara ada anaghị abawanye ya.
A na-eweghachi ọnụọgụ ndị a na efu mgbe usoro malitegharịrị, dịka e siri hazie ya
(telemetry, ọ bụghị ndekọ ego).

#### Nhazi dashboard

Ihu dashboard pụrụ iche bụ
`/dashboard/settings/modality-bridge`. Taabụ `Vision`, `Audio`,
na `Video` ya ndị URL nwere ike ịkpọ kpọmkwem na-edobe query parameters mgbe a na-agbanwe uru `tab`.
Taabụ Vision na-egosi ikike ime ka ọ rụọ ọrụ, mode, nhọrọ model (gụnyere nke ndabara
akpaka), prompting dabere na ọrụ, oke timeout/image/description-length/cache
dị elu, ọnụọgụ oge ọrụ,
na arịrịọ nlele e chebere. Taabụ Audio dịkwa ndụ: ọ na-egosi
ikike ime ka ọ rụọ ọrụ, ihe-ahọrọ model naanị maka STT nke nwere Auto, oke timeout/max-clip, ọnụọgụ
audio, na ule nlele `input_audio`. Taabụ Video na-arụ ọrụ: ọ na-akọ
ọnọdụ oge ọrụ FFmpeg/ffprobe — otu n'ime ọnọdụ UI anọ akọwapụtara (`unknown` mgbe
probe ka na-aga n'ihu ma ọ bụ enweghị ike ịgwucha, `restricted` n'elu host dashboard
na-abụghị loopback ebe a na-amafere probe n'akụkụ client, `unavailable` mgbe e mechara probe
ma kwenye na ọ dịghị, ma ọ bụ `available` tinyere ụdị FFmpeg/ffprobe) — na-echekwa
oke enable/model/frame/video/timeout, na-enyocha ihe-ahọrọ model ka ọ gosi naanị model
nwere ikike vision, ma na-egosi ọnụọgụ video.

Kaadị Vision Bridge ochie dị n'okpuru ntọala AI bụ njikọ ndakọrịta gaa na
ihu ọhụrụ ahụ; ọ naghịzi enwe ụdị form nke abụọ. Media Providers na-ejikọkwa
usoro ọrụ Image-to-Text na Speech-to-Text na taabụ Modality
Bridge kwekọrọ na ha, n'ewepụghị playground Speech-to-Text dịbu adị.

**Mafere nnabata self-loop:** mgbe oku describe gafere n'ime
`/v1` self-loop nke OmniRoute n'onwe ya (model provider na-abụghị ọkọlọtọ), sub-request ahụ na-eziga
`x-omniroute-admission-bypass: internal` ma jiri credential self-loop
a chọpụtara mee nkwenye — sentinel `sk_omniroute` mpaghara na local mode, ma ọ bụ
env key `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` nke operator haziri (#1350), ka
deployment ndị nwere `REQUIRE_API_KEY=true` nwee ike ịgba oku describe ahụ. A na-anabata
bypass ahụ naanị maka credential ndị ahụ kpọmkwem, ya mere client ndị dị n'èzí enweghị ike iji
header ahụ mafere nnabata.

Ndabara ochie dị na `src/shared/constants/visionBridgeDefaults.ts`;
ndabara ọhụrụ maka mode/task-aware/cache na resolver ntọala dị na
`src/shared/constants/modalityBridgeDefaults.ts`. Guardrail ahụ na-egosi nhọrọ constructor
`deps` ka ule nwee ike itinye mmejuputa `getSettings` na
`callVisionModel` adịgboroja.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Ọ na-ejide arịrịọ nkata nwere audio tupu ha erute target a na-amaghị
na ọ na-anabata ntinye audio. Ọ dịghị mgbe ọ na-atụgharị ụzọ arịrịọ nkata ahụ: a na-edegharị
akụkụ audio ka ọ bụrụ ederede site na endpoint multipart dakọtara na OpenAI dịbu adị, model nkata
ahọpụtara na-aga n'ihu site na transcripts ederede.

Usoro:

1. Chọpụta `supportsAudio` site na `getResolvedModelCapabilities()`. Metadata
   provider-registry akọwapụtara doro anya na-ebute ụzọ, metadata model static esoro ya, emesịa
   `modalities_input` emekọrịtara. Ndepụta ntinye ekwuputara nke na-enweghị `audio` bụ `false`; ma ọ bụrụ na
   enweghị ihe akaebe capability, ọ na-anọgide `null`. Ma `false` ma `null` na-eme ka
   bridge nke na-akpachapụ anya rụọ ọrụ, ebe `true` na-agafeghị ya.
2. Chọpụta ntọala `modalityBridgeAudio*` ma wepụ akụkụ audio top-level
   ndị a pụrụ ịtinye n'ebe ọzọ site na message ọ bụla site n'iji detector `detectMediaParts()`
   nkekọrịta. Ụdị wire akwadoro bụ OpenAI `input_audio`, `audio_url`, na
   `source.media_type: "audio/*"`. A na-achọpụta audio nested maka routing mana anaghị
   ewepụ ya site n'ụzọ splice. `modalityBridgeAudioMaxClips` na-amachi ọrụ;
   akụkụ ndị na-esote na-anọgide na-agbanwebeghị.
3. Soro `provider/model` ahaziri, ma ọ bụ kwe ka `selectAudioBridgeModel()` gafee
   `AUDIO_TRANSCRIPTION_PROVIDERS` n'usoro catalog kwụsiri ike wee họrọ model mbụ
   nwere credential provider na-arụ ọrụ nke a pụrụ iji.
4. `callAudioTranscription()` na-atụgharị audio base64/data-URI ka ọ bụrụ multipart
   `file`, ma ọ bụ budata `audio_url` dị anya site na guard outbound naanị-ọha
   nke nwere DNS pinning na oke 25 MB. Ọ na-eziga faịlụ ahụ na model ahọpụtara site na POST
   gaa na self-loop `/v1/audio/transcriptions` mpaghara, jiri
   `resolveSelfLoopBearer()` mee nkwenye. Route transcription dịbu adị na-arụ ọrụ nkịtị
   nke ịchọ credential, ijikwa cooldown/rate-limit, na iziga ya na provider.
5. Oku gara nke ọma na-eji `[Audio N]: <transcript>` dochie akụkụ ha. Oku ndị ahụ
   na-eji `Promise.allSettled` arụ ọrụ: ọdịda nke otu oku na-edobe akụkụ audio
   mbụ ahụ (#4012 contract). Ọ bụrụ na oku niile ada ma egosipụta na target ahụ bụ
   `supportsAudio === false`, akụkụ ndị ahụ na-aghọ
   `[Audio N]: (unavailable — no STT provider connected)` (#8430 contract). Maka
   target a na-amaghị (`null`), nsonaazụ ebe ihe niile dara na-anọgide na-agbanwebeghị. Target
   egosipụtara na ọ bụ naanị-ederede nke na-enweghị credential STT a pụrụ iji na-enweta otu stub ahụ
   doro anya n'emeghị oku netwọk.

Transcripts gara nke ọma na-eji cache LRU/TTL Modality Bridge nke usoro niile. Key ahụ
na-ejikọta ntụaka audio, label ọrụ `audio-transcription` kwụsiri ike,
na model STT ahọpụtara; anaghị echekwa ọdịda na cache. Mbọ Audio na-emelite
ọnụọgụ `bridged`, `cacheHits`, `failures`, na `lastUsedAt` nkekọrịta.
Nzaghachi ndị a gbanwere na-ebu
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; arịrịọ
ndị a na-emetụghị anaghị enweta segment Audio Bridge.

Ntọala oge ọrụ dabere na DB ma Zod na-enyocha ha:

| Igodo                         | Ndabara | Oke                    |
| ----------------------------- | ------- | ---------------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                      |
| `modalityBridgeAudioModel`    | `""`    | Akpaaka ma ọ bụ ID STT |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000            |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10                   |

A ka na-ejikwa cache a na-ekekọrịta site na `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, na `modalityBridgeCacheMaxEntries`.

### Njikọ Vidiyo (`videoBridge.ts`, `videoBridgePipeline.ts`)

Ọ na-ejide akụkụ vidiyo ndị dị n'ọkwa kachasị elu na `messages` nke Chat Completions na
`input` nke Responses API tupu a kpọọ ebe ebumnuche na-enweghị nkwado vidiyo
nke e ji n'aka na ọ bụ nke ime ya. Ọdịdị ndị a na-akwado bụ `input_video`, `video_url`,
`video_source`, URL HTTPS, na URI data `data:video/*;base64,...`. Anaghị ewere
aha faịlụ nkịtị dị na ederede dịka vidiyo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) na-ahụ maka ịgafe arịrịọ ahụ,
nlele ikike/amụma, nchịkọta nke arịrịọ ọ bụla, na payload nzaghachi.
Ọrụ nke vidiyo ọ bụla — inweta ya, cache nke nsonaazụ niile, ịkọwa usoro frame
(nke na-ejikọta transcript ọdịyo ọ bụla onye kpọrọ ya kwupụtara), yana
metrik/nkwụsị/nchacha nke mbọ ọ bụla — zoro n'azụ `processVideoPart` n'ime
`videoBridgePipeline.ts`, nke a na-akpọ otu ugboro maka akụkụ vidiyo ọ bụla n'ime loop nke `preCall`.
Modul ahụ na-akọwakwa ókè port doro anya `VideoMediaBrokerPort`
(inweta bytes na iwepụta frame ndị e mere sample), `VideoAudioTranscriptionPort`
(ijikọta transcript ọdịyo onye kpọrọ ya kwupụtara na caption ndị e mere sample), na
`VideoDrilldownPort` (ókè nchekwa ịdịgide nke nyocha miri emi nke frame; ejikọbeghị ya
na `processVideoPart` — naanị route `/api/modality-bridge/video/drilldown` dị iche
na-ede ntinye nyocha miri emi ugbu a).

Ụzọ arịrịọ `/v1` ọha anaghị ebubata ma ọ bụ kpọọ subprocess.
A na-ebudata vidiyo ndị dịpụrụ adịpụ n'okpuru oke 50 MiB; vidiyo base64 inline nwere
oke nchekwa siri ike nke 36 MiB mgbe e dechara ya maka vidiyo ọ bụla ka envelopu
model/messages/framing wee nwee ike ịnọ n'ime oke nnabata arịrịọ JSON ọha nke 50 MiB.
A na-enyocha ogologo inline na atụmatụ nha mgbe e dechara ya tupu ekenye ebe nchekwa. A chọrọ
HTTPS na URL izizi dịpụrụ adịpụ nakwa na redirect ọ bụla, site n'iji guard ọpụpụ
nke ọha naanị dị adị nke nwere DNS pinning. Bytes ndị ahụ na-agafezie kpọmkwem ókè broker ime
`POST /api/modality-bridge/video/extract`. Route ahụ bụ ma
`LOCAL_ONLY` ma `SPAWN_CAPABLE`, ọ na-anabata naanị arịrịọ trusted-loopback
nke e ji nkwenye nke process ọ bụla chebe, ọ naghịkwa anabata URL, ụzọ filesystem, executable,
ma ọ bụ ndepụta argument. Pipeline nha body nke API na incremental body
reader nke handler na-amanye oke ntinye broker 50 MiB n'onwe ha. Queue ya nwere oke
na-eme otu extraction n'otu oge, na-enye ohere ọrụ anọ na-echere, ma na-etinye oke
100 MiB n'elu ntinye na-echere.

N'ime broker ahụ, `ffprobe` na-agụ faịlụ ime obodo nke onwe; ndepụta format
a kapịrị ọnụ anaghị etinye format playlist na manifest. Maka container ezinụlọ MOV
ndị e kwere, data reference MOV dị n'èzí ka gbanyụrụ na ndabara, command
a kapịrị ọnụ anaghịkwa ahọrọ ime ka ha rụọ ọrụ. Ma `ffprobe` na `ffmpeg` na-eji
ndepụta protocol nke `file` naanị, otu thread, array argument a kapịrị ọnụ, enweghị shell,
na executable ndị e si na `PATH` chọta. Stream mkpuchi attached-picture abụghị
ndị a ga-eji kpọọ vidiyo. Stream niile a ga-eji kpọọ vidiyo ga-emezu oke ndị ahụ, a na-ahọrọkwa
stream ndabara e kwuru kpọmkwem tupu fallback nke lowest-index a kara aka.
E debere oke vidiyo na sekọnd 600, pikselụ 8,192 n'akụkụ ọ bụla, na
pikselụ isi mmalite 33,554,432. FFmpeg na-eme sample frame JPEG midpoint 1–16, na-ebelata
akụkụ ogologo ruo pikselụ 1,024 kachasị elu n'emeghị ka input nta bawanye, ọ naghịkwa
anata URL ma ọlị. Sampling bụ `uniform` na ndabara. Amụma
`scene_aware` nke nhọrọ na `segment_aware` nke nnwale na-eme otu pass FFmpeg
a kapịrị ọnụ ọzọ n'elu stream ime obodo a kwadoro, họrọ timestamp scene `showinfo`
nwere oke, ma laghachi n'ụzọ a kara aka n'otu midpoint uniform ahụ ma detector daa,
oge agwụ, output adịghị n'ụdị ziri ezi, ma ọ bụ candidate set tọgbọ chakoo.
Ụdị segment-aware na-ekenye sample midpoint n'ụzọ kwekọrọ na interval scene
ndị a kwadoro; a kọwara ihe akaebe segment-aware na omume fallback
n'ụzọ zuru ezu n'okpuru. A na-etinye oke siri ike nke frame 16
mgbe ahọpụtara ha n'amụma ọ bụla. Mgbe arịrịọ scene-aware nwere naanị
mmefu otu frame, ọ na-eji midpoint uniform nke vidiyo zuru ezu nọ n'ọrụ ma ọ bụ focus
window wee kọọ `policyEffective: uniform`: otu frame scene ahọpụtara
enweghị ike idobe nsọtụ oge abụọ ahụ. Onye kpọrọ ya nwere ike ịnye
focus window nwere oke (`start`/`end` na sekọnd) dịka nhọrọ; a na-eme ka oke ya daba na duration media,
a na-ajụ window ndị atụgharịrị azụ ma ọ bụ ndị na-abụghị finite, a na-emekwa amụma sampling
niile naanị n'ime interval e mere normalize. A na-etinye window nke si na ya pụta
na metadata sampling nakwa na prefix nkọwa a na-apụghị ịtụkwasị obi
ka model ndị na-esote nwee ike ịmata ọdịiche dị n'etiti akụkụ elekwasịrị anya na timeline
zuru ezu.

Focus caption semantic bụ ntọala dị iche, nke e kwuru kpọmkwem. Ụdị nyocha `full`
nke ndabara na-edobe prompt frame dị adị, ọ naghịkwa ezigara model caption
ederede arịrịọ. N'ụdị `focused`, bridge ahụ na-agụ naanị `text`/`input_text`
kachasị ọhụrụ, na-adịghị efu, nke onye ọrụ dere site n'otu container Chat ma ọ bụ Responses ahụ,
na-eme ka ọ bụrụ NFC, na-ejikọta mkpụrụedemede njikwa na oghere,
ma na-amachi ya na code point Unicode 500. Nsonaazụ tọgbọ chakoo na-alaghachi na
prompt `full` kpọmkwem. A na-eme serialize hint bara uru dịka JSON n'ime block
untrusted-user-context pụrụ iche, ọ nwekwara ike naanị ibute nkọwa ndị a pụrụ ịhụ ụzọ;
ọ pụghị ịkagbu ịdọ aka ná ntị dị iche megide ịgbaso ntuziaka ndị a na-ahụ
ma ọ bụ ndị a na-anụ na media ahụ. Focus ederede anaghị echepụta `start`/`end` ma ọ bụ gbanwee
temporal sampler.

#### Ihe akaebe segment nhazi FU-07

`segment_aware` na-eji otu ngafe nyocha-mbụ nwere oke n'elu iyi vidiyo mpaghara a kwadoro
ugbua. Usoro nzacha a kapịrị ọnụ na-ebu ụzọ wedata obosara ya ruo pikselụ 320
kachasị, chọpụta mgbanwe ọnọdụ na oge onyonyo jụrụ akpụ, wee were nlele n'ogo fremụ 1 kwa
sekọnd maka nhụcha, nkezi luma, na ozi gbasara oghere/oge. E debere ngafe ahụ
n'ókè nlele nhazi 600, otu eri FFmpeg/nzacha, otu ndepụta ikike maka naanị
protokol `file` na containers, oke mmepụta usoro nke 1 MiB,
na sekọnd 30 kachasị n'ime nkwụsị/oge-ngwụcha nkekọrịta nke broker. Ọ dịghị mgbe ọ
na-anabata iwu, nzacha, ụzọ faịlụ, ma ọ bụ URL sitere na arịrịọ ahụ.

Ụkpụrụ nhazi ndị ahụ bụ ihe akaebe nlele a pụrụ ịmegharị otu ihe ahụ, ọ bụghị nghọta
pụtara ihe vidiyo. Ha anaghị achọpụta isiokwu, omume, nkọwa onyonyo, okwu ọnụ, ma ọ bụ ebumnuche
onye ọrụ. Ókè mgbanwe ọnọdụ na nkwụsị onyonyo na-emepụta ngalaba; mkpuchi nkwụsị, nhụcha,
ikpughe ọkụ, nkọwa oghere, na mgbanwe oge na-emetụta naanị otu esi ekenye
mmefu fremụ 1–16 dị ugbu a. A na-amachi ngalaba jụrụ akpụ kpamkpam na otu fremụ,
ebe ngalaba ndị na-ajụghị akpụ na-asọ mpi maka mmefu fọdụrụ. Mgbe ókè
karịrị fremụ n'ọnụọgụ, a na-edobe mkpuchi ahịrị oge nke kesara n'otu nha ka mgbanwe ọsọ ọsọ
n'isi mmalite ghara izochi ogologo ngalaba dị n'azụ. A na-ejikọta ókè ọnọdụ ndị dị n'ime
mkpebi nyocha nke sekọnd 1 site na ókè nkwụsị onyonyo.

Nzacha ndị na-efu, ihe akaebe ezighi ezi/efu, njehie ihe nchọpụta, ma ọ bụ ngafe oge nke
nnyocha-mbụ nwere oke na-emepe ka e jiri kpọmkwem iwu etiti nke kesara n'otu nha. Nkwụsị sitere n'aka
onye kpọrọ ọrụ ma ọ bụ oge-ngwụcha broker anaghị emepe ka a gaa n'ihu: ọ na-akwụsị subprocess
na-arụ ọrụ, gbochie iwepụta fremụ ọzọ, a na-ewepụkwa osisi faịlụ nwa oge nke nzuzo
na `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` na-emepụta fixtures FFmpeg ndị bụ ezigbo ma bụrụkwa
ndị a pụrụ ịmegharị otu ihe ahụ maka mbelata oku nkọwa mgbe dedup gasịrị, ikenye mmefu maka mmegharị juru,
ihe akaebe nhụcha/ikpughe/SI-TI, mgbanwe ọsọ ọsọ nwere ogologo ọdụ, na nsonaazụ ụgha
nke nchachapụ nwayọọ nwayọọ. Ọ na-edekọ oge mgbidi nke nyocha-mbụ, ma, ebe `/usr/bin/time`
dị, CPU nke usoro nwa na RSS kachasị elu. Nlele ogo ya bụ naanị oracles nhazi.
Ogo ezigbo model nkọwa ka bụ `HOLD` n'ihi na harness a enweghị
endpoint enyere ikike ma ọ bụ onyeikpe a kpọchiri. Nchekwa ego ka bụkwa `HOLD`
ọ gwụla ma `--caption-cost-per-call-usd` nyere atụmatụ doro anya dị mma nke ụgwọ kwa oku;
script ahụ anaghị echepụta nke ọ bụla n'ime nsonaazụ ndị ahụ.

A na-amachi fremụ ọ bụla na 4 MiB, fremụ raw niile ọnụ na 23 MiB, na
nzaghachi broker e mere serialized na 32 MiB. A na-ewepụ ndekọ nwa oge nke nzuzo
na `finally`. OmniRoute anaghị etinye FFmpeg n'ime ngwugwu ya ma ọ naghị anabata ụzọ
executable ahaziri iche. Tupu ịmepụta nkọwa, bridge ahụ na-etinye ngafe deduplication anya
dị nchekwube: a na-ebelata JPEG ọ bụla ka ọ bụrụ buffer grayscale 16×16, a na-atụnyere
ya naanị na fremụ ikpeazụ e debere. Maka mmefu nkọwa a rịọrọ nke karịrị otu fremụ,
iwepụta fremụ na-enye ọdọ candidates nwere oke ruo okpukpu abụọ nke mmefu ahụ ma ghara
ịkarị fremụ 16. A na-etinye oke a rịọrọ naanị mgbe deduplication gasịrị, ebe a na-echekwa
candidate mbụ na nke ikpeazụ ahọpụtara n'oge mbelata ikpeazụ mgbe mmefu ahụ dịkarịa ala
abụọ. Iwu nwere ụdị
`grayscale-16x16-mean-cells-v2` na-eji nke ka ukwuu n'etiti ọdịiche mean luma na
oke nke cells thumbnail nke normalized delta ha dịkarịa ala 0.05. Ọnụ ụzọ
duplicate bụ constant 0.04, a họọrọ ya maka ịdị mfe ịkọ amụma kama igosipụta ya dị ka
ntọala runtime. Mgbama nke abụọ a nwere nnukwu contrast na-echekwa obere mmegharị
na mgbanwe ederede a na-ahụ anya nke ntụnyere mean-naanị nwere ike izochi. Njehie
comparator ma ọ bụ decoder na-emepe ma debe mkpuchi. Metadata mmepụta na-ekewa
candidates ewepụtara, fremụ ejiri nke ọma, na visual duplicates ewepụrụ.

Akụkụ vidiyo e gosipụtara n'ụzọ doro anya nwere ike ịrịọ contact sheet nwere timestamp.
Bridge ahụ na-ewu grid JPEG nwere kọlụm 4 na fremụ 16 kachasị. Cell ọ bụla nke pikselụ 512
na-etinye timestamp isi mmalite ya n'ime eriri ala nwere nnukwu contrast, ebe otu timestamps
ahụ ka dị na metadata ederede maka njikọ na audit n'ọdịnihu. JPEG zuru ezu
ka nwere oke 32 MiB. Ọ bụrụ na `sharp` enweghị ike decode ma ọ bụ compose grid ahụ,
bridge ahụ na-alaghachi n'iji fremụ JPEG n'otu n'otu; nkwụsị client ka na-agafe
na ọrụ sheet ahụ.

A na-ekewapụ ihe akaebe promotion kpamkpam na microbenchmark composition
synthetic. `scripts/perf/video-bridge-contact-sheet-eval.ts` na-akọwa harness A/B
nwere schema-version maka ezigbo model ọhụụ kwekọrọ na OpenAI. Ọ na-atụ
tokens onye na-enye ọrụ kọrọ, latency mgbidi site na mmalite ruo na njedebe (gụnyere composition sheet),
ọnụọgụ oku model, na njigide eziokwu nke manifest kọwara. A naghị ede nzaghachi raw nke model
na report; naanị digests SHA-256 na ID eziokwu dabara adaba ka a na-edebe. Harness ahụ
anaghị akpọ netwọk ma ọ bụ model akwụ ụgwọ ọ gwụla ma e nyefere `--execute-real` ma
hazie `--model`, `OMNIROUTE_BASE_URL`, na `OMNIROUTE_API_KEY`. Enweghị
ngagharị ezigbo ahụ doro anya, verdict ya igwe nwere ike ịgụ ka bụ `HOLD`; nha
payload/ọnụọgụ-oku synthetic naanị abụghị ihe akaebe promotion.

Ndị na-akpọ ọrụ nwere ike itinye array `transcript.cues` nhọrọ na akụkụ vidiyo
a na-akwado mgbe ha nwere ederede ahaziri n'oge ugbua. Cue ọ bụla ga-enwerịrị `text`,
interval `start`/`end` nwere oke ma dị n'ime duration enyochara, na
`source` dị na whitelist (`client`, `embedded`, ma ọ bụ `audio-bridge`); `confidence`
na-eji `1` dị ka ndabara ma ga-adị n'etiti `0` na `1`. A na-ejikọta cues ndị bụ otu
kpọmkwem. OmniRoute anaghị amalite transcription site na metadata a: a na-edepụta cues
a kwadoro n'ime nsonaazụ akọwara tinyere source, confidence, na interval, a na-egosipụtakwa
ha dị ka nlele ndị a na-atụkwasịghị obi n'akụkụ nkọwa fremụ. A na-ajụ ederede na-adịghị mma,
gafere oke, ma ọ bụ na-enweghị provenance kama ịgwakọta ya n'ime iyi nkọwa.
Channels transcript abụọ nke request-body na-eme ka provenance enyere bụrụ `client`,
gụnyere labels `embedded` ma ọ bụ `audio-bridge` onye nyere arịrịọ kwuru n'onwe ya.
Naanị adapter nke server nwe nwere ike ikenye labels ndị ahụ a tụkwasịrị obi site na
argument naanị-koodu `trustedSource`; field JSON nke arịrịọ enweghị ike iru
argument ahụ. Ederede transcript ka bụ ọdịnaya sitere na media a na-atụkwasịghị obi,
n'agbanyeghị provenance ya, ọ gaghịkwa ekpebi authorization ma ọlị.

Onye ọkpụkpọ nwere ahụmịhe nwere ike ịnye track `audioTranscript` maka otu vidiyo ahụ;
a na-ewere ya dị ka ederede onye ahịa nyere, ọ bụghị ihe akaebe nke ntụgharị olu gaa na ederede nke sava.
Ebe njikọta ahụ na-eme ka nlele anya na nke ọdịyo rụọ ọrụ n'okpuru
otu oge ngwụcha na mgbaama ịkwụsị, na-ahazi ha n'otu usoro oge, na-ejikọta
oyiri zuru oke, ma na-akọ nsonaazụ ezughị ezu mgbe naanị otu akụkụ gara nke ọma.
`audioTranscript` na-adịghị irè na-eme ka ọ bụrụ nsonaazụ ahụ ezughị ezu — a na-edobe
nkọwa anya ahụ, ebe ngalaba ọdịyo na-edekọ koodu ọdịda e mere ka ọ ghara ikpughe ozi —
kama ime ka vidiyo ahụ dum daa. A na-echekwa nnweta nke ngalaba ọ bụla, akara ezughị ezu,
na koodu ọdịda e mere ka ha ghara ikpughe ozi n'ime nsonaazụ akọwara, n'ime
metadata guardrail (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), n'ime metadata cache nsonaazụ, nakwa n'ime ihe ngụkọ
njikọta nke bridge. Ụzọ ndabara Video Bridge anaghị akpọ ọrụ ntụgharị okwu gaa na ederede
ma ọ bụ budata oyiri mgbasa ozi nke abụọ; ma ọ bụrụ na e nyeghị track ahụ n'ụzọ doro anya, ọ ga-anọgide
na-arụ ọrụ naanị na vidiyo.

**Idobe transcript (#12150 P1).** Nke a na-emetụta na-akpaghị aka mgbe ọ bụla
Video Bridge (nke ya onwe ya bụ opt-in) gosipụtara cue transcript — enweghị
akara idobe ọzọ. Mgbe arịrịọ gosipụtara cue transcript ọ bụla (`transcript`
onye ọkpụkpọ kwupụtara ma ọ bụ `audioTranscript` e jikọtara), guardrail na-akara ya
`videoBridgeObserved` ma mepụta oyiri e kpuchiri nke nkọwa vidiyo —
ngosipụta yiri nke mbụ nke a gbanwere akụkụ ederede nweere onwe ya nke cue ọ bụla ka ọ bụrụ
`[redacted-video-transcript]`, site n'ịgbanwe field cue ahaziri ahazi
tupu a chịkọta string ahụ (ọ bụghị site n'ịtụgharị uche n'ederede e mere ka ọ dị larịị, ya mere ọdịnaya cue ọ bụla —
ma nke e ji ebuso usoro agha ma nke nkịtị, gụnyere body nwere `]` dịka
`[inaudible]`/`[music]` — agaghị alanarị). Body arịrịọ nke call-log echekwara na-agbanwe
akụkụ ederede ọ bụla sitere na vidiyo ka ọ bụrụ oyiri ahụ e kpuchiri, site n'ịdakọ ha
dabere n'ịha nhata nke ọdịnaya; a na-agụgharị anchor `fullText` site na payload guardrail
tupu oku emechara, ka ndakọ ahụ wee ka na-aga nke ọma mgbe guardrail ndị ọzọ dị n'usoro
(ndị na-ekpuchi PII na nzere, priorities 10/95) degharịrị ederede nkọwa ahụ ozugbo, na
mgbe ntinye system-prompt/handoff/memory gbanwere ọdịdị message array ahụ.
Body ezitere n'elu usoro gaa na model anaghị agbanwe. Arịrịọ a hụrụ na-emekwa ka
a ghara itinye ihe ọ bụla na Memory na-adịgide adịgide (a na-awụpụ mmịpụta sitere ma n'arịrịọ ma na nzaghachi),
ya mere nzaghachi nke model n'onwe ya enweghị ike ikwughachi ederede transcript n'ime Memory.

**Field vidiyo raw (#12430).** Mgbe bridge arụnyere ma nkwado vidiyo native amaghị ma ọ bụ adịghị, field `transcript`/`audioTranscript` akọwapụtara na-eme ka `videoBridgeObserved` rụọ ọrụ, ọbụna mgbe nkọwa dara ma ọ bụ mgbe e ruru oke `maxVideos`. `null` na string efu bara uru; field ndị na-anọghị na metadata na-abụghị nke vidiyo anaghị aba uru. Oyiri ndị e debere na-ekpuchi field ndị a ma ọ bụ hapụ arịrịọ ahụ kpamkpam, a na-agafekwa cache/Memory.

N'ụzọ fallback ndị ahụ, cue ziri ezi onye ọkpụkpọ nyere na-aghọ akụkụ `text`/`input_text`
akwadoro kama ịbụ field provider na-abụghị ọkọlọtọ. Track abụọ sitere n'arịrịọ
na-anọgide bụrụ nlele `client` a na-atụkwasịghị obi, tinyere ịdọ aka ná ntị doro anya na akọwaghị vidiyo ahụ
nakwa na enyochaghị timestamp megide mgbasa ozi ahụ. Oke dị adị nke cue 256/64-KiB n'ozuzu
na oke nke cue ọ bụla na-emetụta track abụọ ahụ ọnụ;
timestamp ga-adaba n'ime oke sekọnd 600 nke broker nakwa windo focus ọ bụla enyere.
A na-atụfu track na-adịghị irè, anaghị eziga ha dị ka ederede nkịtị; a ka nwere ike iji
track ibe ya ziri ezi ma ọ bụrụ na ngụkọta ha agafeghị oke. Field null/efu anaghị
agbakwunye ederede ọ bụla. Fallback a anaghị agbakwunye mbubata mgbasa ozi ma ọ bụ transcription.
A na-ewepụ field mgbakwunye transcript na ihe e ji ebu vidiyo fallback nakwa n'ime object
`video_url`/`source` ya. Allowlist wire nke OpenAI na-anọgide sie ike; ihe e ji ebu vidiyo
nke ikike native ya amaghị na-anọgide dị, ebe target ndị a maara na ha bụ naanị ederede na-edobe marker nchekwa.
Oyiri redaction ahaziri ahazi na-echebe ederede transcript agbakwunyere, ebe
arịrịọ mbụ nke onye ọkpụkpọ nwere na-anọgide agbanweghị. Target nwere nkwado native na
bridge ndị agbanyụrụ na-edobe omume bypass ha dị ugbu a.

Oyiri ndị ọzọ e debere na-eji otu mgbaama arịrịọ a hụrụ. Snapshot arịrịọ client raw
tupu guardrail, arịrịọ pending dị na memory, na log arịrịọ a jụrụ n'oge na-anọchi
field transcript n'ime akụkụ vidiyo n'ụzọ ahaziri ahazi;
a na-ekpuchi string prompt nke pipeline stage na context handoff mepụtara
n'ebe nnata body arịrịọ echekwara. Marker `video_content_removed` echekwara
na-eme ka continuation `previous_response_id` kwụsị n'ụzọ nchekwa kama iwughachi
ederede e kpachapụrụ anya tụfuo. Ọ bụrụ na arịrịọ a hụrụ atụfuo
oyiri redaction nke akụkụ ya tupu logging, ma ọ bụ ọbụna otu n'ime ọtụtụ oyiri vidiyo
adabaghị mgbe mgbanwe arịrịọ ndị mechara gasịrị, a na-ahapụ body arịrịọ a ga-edebe
kpamkpam kama idobe transcript e kpuchiri naanị n'akụkụ ụfọdụ.

Maka arịrịọ a hụrụ, nzaghachi model nwere ike ihota akụkụ ọ bụla nke
transcript na-enweghị oke cue ahaziri ahazi. N'ihi ya, a na-eji marker nke na-egosi mwepụ
dochie `responseBody` nke call-log echekwara; anaghị edobe artifact pipeline zuru ezu
(nke nwere ike ịgụnye body upstream/client na stream chunk).
Cache semantic, idempotency, na reasoning-replay na-agafe ma ọgụgụ ma ide maka arịrịọ ahụ.
Arịrịọ provider na nzaghachi client na-ahụ na-anọgide agbanweghị.
A na-ekpochapụ byte keepalive mbụ site na buffer nwa oge mgbe ewepụrụ artifact zuru ezu.
Ịdọ aka ná ntị EventStream mebiri emebi nke Kiro na-akọ naanị ọnụ ọgụgụ byte payload,
ọ dịghị mgbe ọ na-akọ ọdịnaya ya ma ọ bụ njehie raw nke JSON parser.
Nke a anaghị ekwu na enyochala diagnostic provider/plugin ọ bụla ọzọ na-enweghị njikọ;
a na-esochi nyocha sara mbara nke ebe nnata echekwara na #11658.

Usoro ndụ ime `/api/modality-bridge/video/drilldown` bụ mkpụrụ nchekwa cache dị iche nke loopback/nkwenye-token na-echebe. Ọrụ ọ bụla chọkwara ID principal opaque canonical. Tupu enyere onye na-akpọ ọrụ production ikike, ọ ga-ewepụta ID ahụ site na tenant enyochara njirimara ya, ọ gaghịkwa eziga uru nke client họpụtara. Igodo cache na-ejikọta principal ahụ na ID session na video-reference canonical, na-echekwa naanị igodo ha ewepụtara site na SHA-256, ma na-amachi ma ọgụgụ ma nhichapụ n'otu principal ahụ. Cache ahụ na-echekwa karịa frame JPEG 16 ewepụtara maka entry ọ bụla, na-eme ka ha kubie ume mgbe nkeji iri gachara, ma na-akwado ọgụgụ `start`/`end` nwere oke ma ọ bụ nhichapụ session kpọmkwem.

A na-amachi principal ọ bụla na entry 16 na data JPEG canonical dị 64 MiB. Oke ndị ahụ nọọrọ onwe ha pụọ na oke zuru ụwa ọnụ nke entry 64/256 MiB: nrụgide quota principal na-achụpụ naanị entry nke principal ahụ ejighị kemgbe ogologo oge tupu e tụlee nchụpụ LRU zuru ụwa ọnụ. A na-ekpochapụ entry ndị kubiela ume na ndekọ principal na nke zuru ụwa ọnụ mgbe ọrụ cache mere, ebe ịkagbu ọrụ na ọdịda validation anaghị echekwa nnọchi ezughị ezu.

Cache ahụ na-ajụ Base64 na-abụghị canonical, padding karịrị akarị, media na-abụghị JPEG, JPEG mebiri emebi ma ọ bụ ebipụrụ, yana JPEG ndị na-ewepụta ịdọ aka ná ntị n'oge decode onyonyo zuru ezu nke `sharp` nwere oke. Ọ na-emegharị encoding nke onyonyo ọ bụla a nabatara ka ọ bụrụ JPEG canonical, na-ewepụta obosara na ịdị elu site na byte ndị e mere decode kama ịtụkwasị field onye na-akpọ ọrụ obi, ma na-atụfu byte polyglot ọ bụla dị n'azụ kama idowe ha. Ọ bụ naanị buffer compressed canonical nwere oke ka a na-agụnye na quota abụọ ahụ. Oke JSON wire na-agụnye overhead Base64 maka oke decoded-input nke 32 MiB. Derivation ọ bụla echekwara na-edekọ format/resolution JPEG ya a nyochara, sampling policy, derivation version, oge e kere ya, content hash server gbakọrọ, na parent reference e mere hash tinyere parent-content hash nke onye na-akpọ ọrụ a tụkwasịrị obi. A na-enyocha ịkagbu ọrụ n'etiti phase decode/hash asynchronous tupu atomic cache commit.

Akụkụ ọrụ a ejikọbeghị producer production na route ahụ, ọ naghịkwa enye nhọrọ variant multi-resolution. Ya mere, ụzọ arịrịọ Video Bridge doro anya anaghị ebute ọrụ agbakwunyere, ebe tenant-bound principal derivation na usoro ndụ FU-08 multi-resolution zuru ezu ka bụ ọrụ ndị a ga-eme n'ọdịnihu n'ụzọ doro anya kama ịkọwa ha dịka omume arụcharala.

A na-enye frame caption n'usoro site na model Video ahaziri. Override Video efu na-eketa ntọala Vision; ọ bụrụ na ha abụọ tọgbọ chakoo, auto-router Vision na-ahọrọ model nwere ikike vision nke a ga-eji. Caption gara nke ọma na-eji prefix `[Video description:` kwụsie ike dochie part mbụ ahụ; prefix ahụ na-akakwa text ahụ dịka nlebara anya sitere na media a na-atụkwasịghị obi ma na-agwa model ndị na-esote ka ha ghara iso ntuziaka achọpụtara na media ahụ. Igodo cache frame-caption na-agụnye byte JPEG, prompt, timestamp, na model a na-eji n'ezie; ọ bụ naanị caption gara nke ọma ka a na-echekwa na cache. Entry cache na-edowe model producer mere nke ọma n'ezie, gụnyere fallback model; bridge ahụ na-akọ `mixed` mgbe model dị iche iche mepụtara frame dị iche iche. Cache hit na-eji njirimara producer ahụ ọzọ kama ịgbanwe aha ya ka ọ bụrụ routing plan a rịọrọ. A na-eme igodo cache nsonaazụ vidio niile site na input ọ bụla na-agbanwe output — prompt, model a na-eji n'ezie, sampling policy, ọnụọgụ frame, semantic analysis mode, fingerprint SHA-256 nke focus hint e mere normalize, focus window, `transcript`, `audioTranscript`, na flag contact-sheet — yabụ ịgbanwe nke ọ bụla n'ime akụkụ ndị ahụ bụ cache miss, ọ bụghị iji data ochie eme ihe ọzọ. Visual dedup policy version, threshold, na ọnụọgụ candidate-frame nwere oke sokwa bụrụ ihe doro anya na igodo na metadata nke result-cache; ya mere mgbanwe policy enweghị ike iji nkọwa vidio niile ochie ọzọ. Metadata result-cache v4 na-edowe mode na fingerprint, ọ dịghị mgbe ọ na-edowe raw user task. Metadata guardrail na-akọ ma analysis mode a rịọrọ ma nke a na-eji n'ezie; a na-akọ mode `focused` a rịọrọ nke na-enweghị user text bara uru dịka `full` n'ezie.

Guardrail ahụ na-ewepụta video part niile akwadoro mana ọ naghị akọwa ihe karịrị `modalityBridgeVideoMaxVideos`. Maka target e gosipụtara na o nwere `supportsVideo === false`, vidio dara ada na ndị gafere oke na-aghọ safe text marker doro anya ka raw video ọ bụla ghara ịlanarị. Mgbe amaghị capability, part ndị ahụ na-edowe video carrier ha; fallback transcript ọ bụla na-eso bounded text conversion dị n'elu. Target ndị nwere `supportsVideo === true` na-agafe bridge ahụ. Client request abort signal na-aga n'ihu site na download, broker queue, subprocess, na oku caption; abort na-akwụsị n'etiti vidio ma ọ dịghị mgbe ọ na-ahapụ raw media ka ọ gafere mgbe ọrụ dara.

A na-akwado runtime setting site na DB ma na-eme validation ha site na Zod:

| Igodo                               | Ndabara     | Oke / omume                                                                                                            |
| ----------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime nhọrọ, a na-eji ya naanị ma a họrọ ya                                                                          |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` na-echekwa nkọwa izugbe; `focused` na-eji ọnọdụ onye ọrụ kacha ọhụrụ, nke nwere oke na nke a na-atụkwasịghị obi |
| `modalityBridgeVideoModel`          | `""`        | Nweta model Vision Bridge site na nketa                                                                                |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                   |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, ma ọ bụ `segment_aware` nke dabara n'ogo; ọdịda detector na-alaghachi na `uniform`           |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                    |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                         |

A na-amachi ụkpụrụ timeout Video ochie echekwara nke karịrị sekọnd 120 ruo na
deadline nke broker; a na-ajụ ide ntọala ọhụrụ karịrị oke ahụ.
`GET /api/modality-bridge/video/runtime` chọrọ locality loopback a tụkwasịrị obi
nke e tinyere stamp tupu authentication ma ọ bụ nyocha runtime, emesịa ọ chọrọ
auth njikwa. Ọ na-eweghachi naanị `available`, ụdị FFmpeg/ffprobe e sachara, na
otu ihe kpatara edobere mgbe runtime adịghị. Endpoint extraction nke ime abụghị
API ọha maka upload: njupụta queue na-eweghachi `503` tinyere `Retry-After`,
mwepụ njikọ nke onye kpọrọ ya na-eweghachi `499`, ebe deadline broker edobere
na-eweghachi `504`. Nzaghachi ndị a gbanwere na-agbakwunye
`video->text;model=<visionModel>;parts=<videos>` na header etiti
`x-omniroute-modality-bridge` n'enweghị iwepụ ngalaba Vision ma ọ bụ Audio.

### Ihe Nzobe PII (`piiMasker.ts`)

Ọ na-arụ ọrụ na stage **abụọ ahụ**.

- **`preCall`** na-eme clone nke payload, na-agafe `system`, `messages`, `input`,
  na `prompt` (gụnyere ihe ndị bụ plain string), ma na-etinye `processPII()`
  (site na `@/shared/utils/inputSanitizer`) n'ubi string `content`/`text`. Mgbe
  `PII_REDACTION_ENABLED=true`, a na-ezochi PII achọpụtara n'ime payload a na-ezipụ.
  Nke a anaghị adabere na `INPUT_SANITIZER_MODE` (nke na-achịkwa naanị iwu
  prompt-injection). Mgbe redaction gbanyụrụ, oku ahụ na-edekọ ọnụọgụ nchọpụta
  n'agbanweghị ọdịnaya.
- **`postCall`** na-eme deep-clone nke nzaghachi, na-agba `sanitizePIIResponse()`
  tinyere masker nke ọdịdị Responses-API (`maskResponsesOutput` — na-ekpuchi
  `output_text` na `output[].content[].text`). Ọ bụrụ na redaction ọ bụla emee,
  nzaghachi a gbanwere ga-anọchi nke mbụ.

Guardrail ahụ anaghị egbochi ihe ọ bụla; ọ na-eme naanị annotation
(`meta.detections`, `meta.redacted`) ma ọ bụ na-edegharị.

#### Nhọrọ dabere n'ụdị, ụkpụrụ ahaziri iche na counter nchọpụta

**Dashboard → Settings → Security → PII masking** na-ahọrọ _ihe_ a ga-ezochi. Ọ
naghị agbanye masking: nke ahụ ka bụ `PII_REDACTION_ENABLED` (request) na
`PII_RESPONSE_SANITIZATION` (response + SSE), ma agbanyụrụ ha abụọ na ndabara.

- **Nhọrọ dabere n'ụdị** — e depụtara id ndị arụnyere n'ime na
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Ọ bụrụ na edoghị ya,
  ọ pụtara ụdị niile (omume dị tupu ntọala a adị). Pattern `ssn_us` nke engine
  request na-map gaa na `ssn`. Template (Minimal, Standard, Financial,
  Brazilian, USA, Full) na-ejupụta naanị checkbox ndị dị na UI.
- **Ụkpụrụ ahaziri iche** — ruo regex ma ọ bụ wildcard pattern 20 (`*` = ruo
  mkpụrụedemede 64 na-abụghị whitespace, `?` = otu). Ihe dabara na-aghọ
  `[CUSTOM_REDACTED]`. Pattern ọ bụla na-agafe `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): ọ kachasị mkpụrụedemede 500, flags
  nwere oke na `g i m s u`, ọ ga-enwerịrị ike compile, ọ ga-agafe `safe-regex`
  (catastrophic backtracking), ma ọ gaghị adaba na string efu ma ọ bụ placeholder
  redaction. A na-ajụ pattern dara ada mgbe a na-echekwa ya na mgbe a na-anwale
  ya, a na-amafekwa row echekwara nke dara ada n'oge runtime kama ime compile
  ya. Pattern ahaziri iche na-arụ ọrụ naanị mgbe masking dị ọkụ.
- **Counter nchọpụta** — ọnụọgụ maka ụdị ọ bụla (ọ bụghị uru ndị dabara),
  echekwara na memory ma na-eme reset mgbe e bidoghachiri
  (`src/lib/pii/piiDetectionStats.ts`). Ha na-abawanye naanị mgbe masking dị ọkụ.

Ntọala ndị ahụ dị na table `key_value` (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) ma a na-agụ ha site na cache nke 1 s. API:

| Usoro  | Path                     | Ebumnuche                                                                            |
| ------ | ------------------------ | ------------------------------------------------------------------------------------ |
| `GET`  | `/api/settings/pii`      | Ọnọdụ flag, `enabledTypes`, `customPatterns`, counter nchọpụta                       |
| `PUT`  | `/api/settings/pii`      | Dochie `enabledTypes` (`null` = niile) na/ma ọ bụ `customPatterns`                   |
| `POST` | `/api/settings/pii/test` | Mee dry-run nke otu pattern megide sample nke kachasị 8 KB; ọ dịghị ihe a na-echekwa |

Ha atọ niile chọrọ auth njikwa ma na-eji Zod enyocha body
(`src/shared/validation/schemas/piiSettings.ts`).

### Ntinye Prompt (`promptInjection.ts`)

Ọ na-achọpụta nhazi mmegide n'ime ọdịnaya onye ọrụ nyere ma na-amanye iwu
ahaziri. Omume ya na-adabere na environment variables na nhọrọ constructor:

| Ntọala      | Env var                                                                                                | Ndabara | Mmetụta                                                                                                                                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Agbanyere   | `INPUT_SANITIZER_ENABLED`                                                                              | `true`  | Mgbe ọ bụ `false`, guardrail na-akwụsị ozugbo.                                                                                                                                                              |
| Ọnọdụ       | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                        | `warn`  | Iwu injection: `block`, `warn`, ma ọ bụ `log`. (A na-anabata `redact` maka ndakọrịta na ụdị ochie, mana ọ **naghị** ewepụ ederede injection; `PII_REDACTION_ENABLED` na-achịkwa idegharị PII dị na arịrịọ.) |
| Oke mgbochi | Nhọrọ `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (aha ọzọ `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Opekempe ogo ịdị njọ achọrọ iji gbochie. N'ọnọdụ ndabara, a na-elele Medium naanị.                                                                                                                          |

**Usoro mkpa ọnọdụ** (`getMode`): `options.mode` nke onye na-akpọ nyere →
`INJECTION_GUARD_MODE` **nchịkwa feature-flag sitere na DB** (Dashboard → Settings →
Feature Flags) → env `INJECTION_GUARD_MODE` → env `INPUT_SANITIZER_MODE` →
`warn`. Ya mere, nchịkwa sitere na dashboard na-emeri env vars, nke pụtara na UI
Feature Flags na-achịkwa guard na-arụ ọrụ ozugbo (enweghị ịmalitegharị). Ọgụgụ DB ahụ nwere nchekwa ma ọdịda emee:
ọ bụrụ na njehie emee, guard na-alaghachi n'omume dabere na env, ma mgbe e nweghị
nchịkwa edobere, omume ya na mkpebi dabere naanị na env bụ otu.

Isi mmalite nchọpụta:

1. `sanitizeRequest()` sitere na `@/shared/utils/inputSanitizer` (usoro detector
   a na-ejikọ ọnụ nke a na-eji n'ebe ndị ọzọ na pipeline).
2. `DEFAULT_GUARD_PATTERNS` arụnyere n'ime ya (`system_override_inline` na
   `markdown_system_block` ugbu a, ha abụọ nwere ogo ịdị njọ `high`).
3. `customPatterns` nhọrọ nke a na-ebufe site na nhọrọ constructor (strings, regex,
   ma ọ bụ ndekọ `{ name, pattern, severity }`).

Mgbe `mode === "block"` **ma** opekata mpe otu nchọpụta ruru oke
ogo ịdị njọ, `preCall` na-eweghachi `{ block: true, message: "Request rejected:
suspicious content detected" }`. N'ọnọdụ `warn`/`log`, guardrail na-edekọ ihe ahụ mana
na-ekwe ka oku ahụ gaa n'ihu. A na-ebupụkwa helper `evaluatePromptInjection()` a na-ekekọrịta
maka ndị na-akpọ chọrọ ịtụle prompts n'agaghị site na registry.

**Oke nyocha (v3.8.20):** detector na-enyocha naanị **16 KB mbụ** nke
ederede prompt ejikọtara ọnụ — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) n'ime
`src/shared/utils/inputSanitizer.ts`. Ma `detectInjection()` ma
`evaluatePromptInjection()` na-eme `slice(0, MAX_INJECTION_SCAN_BYTES)` tupu ha amalite
pattern loop. Ntụziaka injection na-anọkarị nso n'elu input, ya mere nke a
na-etinye oke na regex CPU/GC maka payloads nwere ọtụtụ narị KB n'ebelataghị ike nchọpụta (lee
#3932, #4041).

### Ihe Na-ekpuchi Ozi Nnweta (`credentialMasker.ts`)

Ọ na-arụ ọrụ na **ma** stages abụọ, dị ka nke ikpeazụ na chain ndabara (priority `95`). Ọ na-ekpuchi
patterns API-key / secret-token ndị a maara nke ọma n'ime payload a na-ezipụ (ọdịnaya
ozi, arguments nke tool-call, nsonaazụ tools) **nakwa** nzaghachi provider, ka
credential e tinyere na prompt (ma ọ bụ nke nsonaazụ tool weghachiri) ghara ịpụ
gakwuru provider dị n'elu ma ọ bụ laghachikwuru client.

- **A ga-ahọrọrịrị ịgbanye ya**, otu ụkpụrụ ahụ dị ka PII redaction (n'akụkụ Hard Rule #20):
  ọ na-agbanyụghị belụsọ ma `settings.credentialRedactionEnabled === true` **ma ọ bụ**
  `CREDENTIAL_REDACTION_ENABLED=true`. Mgbe ọ gbanyụrụ, guardrail anaghị eme ihe ọ bụla —
  ọ naghị egbochi ma ọ bụ degharịa ihe ọ bụla.
- `redactCredentials()` na-agafe payload/response tree niile (`walkValue()`,
  nke echekwara pụọ na prototype pollution, ma jiri `WeakSet` chebe pụọ na cycles) ma jiri
  placeholder `[REDACTED:<type>]` dochie matches, na-emepụtaghachi naanị branches ndị
  gbanwere n'ezie.
- `CREDENTIAL_PATTERNS` na-ekpuchi keys nke LLM providers (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokens VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), keys ịkwụ ụgwọ (Stripe, Square), keys
  cloud (AWS access key, Twilio, SendGrid, Mailgun), private keys / JWTs,
  connection strings nwere credentials (`mongodb://user:pass@...`, wdg.), yana
  pattern izugbe maka uru header `Authorization`/`x-api-key`/`api-key`/`apikey`.
  A na-ekpuchi keys yiri header (`authorization`, `x-api-key`, `api-key`,
  `apikey`) dịka nhazi ha si dị (naanị uru ahụ, ebe a na-echekwa prefix scheme dịka
  `Bearer `/`Basic `) kama iji generic text regex.
- Guardrail anaghị egbochi ihe ọ bụla; ọ na-edegharị naanị (`modifiedPayload` /
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
  modifiedPayload?: TValue; // preCall na-eweghachi ya iji degharịa arịrịọ ahụ
  modifiedResponse?: TValue; // postCall na-eweghachi ya iji degharịa nzaghachi ahụ
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

Guardrail na-egosi “enweghị mgbanwe” site n'ịweghachi `void`, `{}`, ma ọ bụ
`{ block: false }`. Iweghachi `modifiedPayload`/`modifiedResponse` na-eji uru ahụ
dochie uru na-agafe n'usoro ahụ maka guardrail ndị na-esote.
`signal?: AbortSignal` na-ebunye usoro ndụ onye kpọrọ ọrụ ahụ n'ime guardrail. Ịkwụsị arịrịọ bụ ọnọdụ pụrụ iche fail-open e kpachapụrụ anya: àkwà mmiri mgbasa ozi na-akwụsị ọrụ ma na-ehichapụ ihe ndị fọdụrụ n'enweghị iweghachi mgbasa ozi raw n'ebe a maara na ọ naghị akwado ya.

## Ndebanye (`registry.ts`)

Singleton `guardrailRegistry` na-enye:

- `register(guardrail)` — na-agbakwụnye guardrail (ma ọ bụ jiri aha ahaziri dochie nke dị adị) ma
  hazie ha ọzọ dịka `priority` na-arịgo.
- `clear()` / `list()` — ngwa enyemaka nchịkwa.
- `runPreCallHooks(payload, context)` — na-agafe guardrail ndị na-arụ ọrụ, na-ebufe
  payload ahụ site na `modifiedPayload`, ma kwụsị na `block: true` mbụ.
- `runPostCallHooks(response, context)` — otu usoro ahụ n'akụkụ nzaghachi.
- `resetGuardrailsForTests({ registerDefaults })` — na-ehichapụ ọnọdụ ma, ma ọ bụrụ na ahọrọ ya,
  debanyeghachi ntọala ndabara iji kewapụ ule nke ọma.

Ndị na-agba ọsọ abụọ ahụ na-eweghachi `{ blocked, payload|response, results, guardrail?, message? }`
ebe `results` bụ n'usoro ndekọ `GuardrailExecutionResult` nke gụnyere mpaghara
`blocked`, `skipped`, `modified`, `error`, na `meta` maka guardrail ọ bụla,
nke bara uru maka nsuso.

### Ịgbanyụ Guardrail Maka Arịrịọ Ọ Bụla

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` na-achịkọta ndepụta
aha guardrail na-enweghị oyiri nke a ga-awụli maka arịrịọ dị ugbu a. Isi mmalite
(ha niile bụ nhọrọ, a na-ejikọta ha niile):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` dị n'ahụ arịrịọ (n'ọkwa kachasị elu)
- `metadata.disabledGuardrails` dị n'ahụ arịrịọ
- Header `x-omniroute-disabled-guardrails` (ma ọ bụ nke ochie
  `x-disabled-guardrails`)

Uru nwere ike ịbụ n'usoro string ma ọ bụ string nke rikoma kewara; a na-ahazi
aha ka ha bụrụ lowercase kebab-case (`pii_masker` → `pii-masker`). A na-ebufe
nsonaazụ ahụ site na `context.disabledGuardrails` gaa na ndebanye ahụ, nke na-awụli
guardrail ndị dabara (`skipped: true` n'ime `results`).

## Usoro Mmezu

Maka arịrịọ ọ bụla na-agafe na `src/sse/handlers/chat.ts` na
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` na-emepụta ndepụta ihe a ga-amafe site na API key, body,
   na headers.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` na-eme guardrails n'usoro priority
   na-arị elu:
   - A na-edekọ guardrails ndị agbanyụrụ dịka `skipped`.
   - `preCall` nke guardrail ọ bụla nwere ike idegharị payload site na `modifiedPayload`.
   - `block: true` mbụ na-akwụsị usoro ahụ ozugbo, handler ahụ wee weghachite
     nzaghachi ọjụjụ guardrail.
3. Payload ahụ (nke enwere ike idegharị) na-abanye na combo routing na upstream
   dispatch.
4. Mgbe ahaziri nzaghachi ahụ, `guardrailRegistry.runPostCallHooks(...)`
   na-eme otu usoro ahụ na nzaghachi ahụ. `block: true` n'ebe a na-ewepụ nzaghachi
   upstream ahụ.

A na-edekọ guardrails ndị tụbara mperi na `error: <message>`, a na-edekwa ha na log site na
`logger.warn`, mana usoro ahụ na-aga n'ihu — nke a bụ nhazi fail-open e mere ụma.

## Nhazi

Environment variables ndị guardrails arụnyere n'ime sistemụ na-agụ:

| Variable                              | Ihe na-eji ya             | Mmetụta                                                                                                 |
| ------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Tọọ ya ka ọ bụrụ `false` iji gbanyụọ nchọpụta kpamkpam.                                                 |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Iwu injection: `warn`, `block`, ma ọ bụ `log`. Legacy value `redact` anaghị edegharị ederede injection. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Mode maka injection guard; ọ bụkwa DB feature flag nke **na-akagbu** env vars (DB > ENV).               |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Severity kacha nta nke `MODE=block` na-ajụ: `high` (ndabara), `medium`, ma ọ bụ `low`.                  |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Legacy alias maka `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                    |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Mgbe ọ bụ `true`, a na-ekpuchi PII dị na request (n'adabereghị na injection mode).                      |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Na-achịkwa omume masker n'akụkụ response.                                                               |

Guardrails nke Modality Bridge na-agụ runtime config site na settings store
nke DB na-akwado (`getSettings()`), ọ bụghị env vars. Primary keys nke Vision bụ
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, na
`modalityBridgeCacheMaxEntries`. A na-anabata legacy
`visionBridge*` keys naanị dịka documented one-cycle read
fallback; ihe dashboard na-ede na-eji primary keys. Defaults na fallback
resolver dị na `src/shared/constants/modalityBridgeDefaults.ts`, ebe a ka na-edobe legacy
constants na `src/shared/constants/visionBridgeDefaults.ts`.

Audio na-eji `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, na `modalityBridgeAudioMaxClips`, tinyere settings
`modalityBridgeCache*` ndị a na-ekekọrịta. Audio enweghị legacy-key fallback n'ihi na e
webatara keys ndị a na schema nke Modality Bridge.

Video na-eji `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, na
`modalityBridgeVideoTimeout`, tinyere settings `modalityBridgeCache*` ndị a na-ekekọrịta.
A na-agbanyụ ya na ndabara n'ihi na FFmpeg/ffprobe bụ operational
dependencies ndị nhọrọ, na frame captioning na-agbakwunye latency na model cost.

## Guardrail Ahaziri

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

1. Mepụta `src/lib/guardrails/myGuardrail.ts` nke na-agbatị `BaseGuardrail`.
2. Mejuputa `preCall` na/ma ọ bụ `postCall`.
3. Debanye ya n'oge mbubata (tinye site na `registerDefaultGuardrails`) ma ọ bụ
   kpọọ `guardrailRegistry.register(...)` n'oge sistemụ na-arụ ọrụ — ndekọ ahụ na-eji
   guardrail ọhụrụ dochie nke ọ bụla dịbu nke nwere otu aha ahaziri ahazi.
4. Tinye ule n'okpuru `tests/unit/` (ihe atụ ndị dị ugbu a:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Nnwale

Jiri `resetGuardrailsForTests()` n'etiti ule iji malite site n'ọnọdụ a maara.
Nyefee `{ registerDefaults: false }` iji malite na ndekọ efu ma
debanye naanị guardrail ndị a na-anwale. Vision Bridge na-anabata ntinye
ndabere (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge na-ekpughe
ebe ntinye yiri ya maka ntọala, ike, nhọrọ ụdị STT, nyocha
nzere, na ntụgharị okwu ọdịyo gaa na ederede. Ya mere, ule nwere ike ịnwale usoro abụọ ahụ na-enweghị ohere
ịnweta DB ma ọ bụ netwọkụ.

## Hụkwa

- `src/lib/guardrails/` — mmejuputa
- `src/shared/utils/inputSanitizer.ts` — ihe nchọpụta a na-ekekọrịta nke na-akwado
  igbochi ntinye prompt na ikpuchi PII
- `src/shared/constants/visionBridgeDefaults.ts` — ndabara Vision Bridge na
  ndepụta ụdị nke a na-amanye iji bridge
- `src/shared/constants/modalityBridgeDefaults.ts` — ndabara runtime Vision/Audio a na-ekekọrịta
- `docs/architecture/RESILIENCE_GUIDE.md` — oyi akwa kwụụrụ onwe ya (circuit breaker, oge nchere)
- `docs/reference/ENVIRONMENT.md` — ntụaka zuru ezu nke env var

## Mkpuchi route nke injection-guard & red-team (Oge 8 · Blọk D)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) na-ekpuchi route niile
na-anabata prompt ndị ọrụ. Ọ na-asọpụrụ `INJECTION_GUARD_MODE` (ndabara `warn` = naanị dekọọ;
`block` = weghachite HTTP 400 `SECURITY_001`).

| Ụdị                 | Route                                                                                                                                                | Ọnọdụ ndabara |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Ederede (dị ugbu a) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn          |
| Mmepụta             | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn          |
| Data                | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn          |

Mwepụta ederede (`extractMessageContents`) na-ekpuchi `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (kwa abalị, `nightly-llm-security.yml`):** promptfoo na-akwado na route ọ bụla na-egbochi
corpus OWASP-LLM mgbe `INJECTION_GUARD_MODE=block`; garak na-agba probes (ọ na-awụfe ma ọ bụrụ na secret adịghị).
Agụnyere `moderations` maka ịdị n'otu — ndị na-ahụ maka sistemụ nọ na block-mode nwere ike iwepụ ya site na
`resolveDisabledGuardrails`.

Workflow nke abalị (`.github/workflows/nightly-llm-security.yml`, cron + iji aka
malite) nwere ọrụ abụọ:

- **`promptfoo-guard` (na-egbochi)** — na-agba `promptfoo eval -c promptfooconfig.yaml`
  na `INJECTION_GUARD_MODE=block`. Ọnọdụ mmegide ọ bụla (dịka "leghara
  ntuziaka niile gara aga anya…", jailbreak ụdị DAN) na-akwado na nzaghachi ahụ nwere
  `error.code === "SECURITY_001"`, ya bụ, na guard ahụ jụrụ arịrịọ ahụ n'ezie.
- **`garak` (ndụmọdụ)** — na-agba garak `--probes promptinject,dan,leakreplay`
  megide instance OmniRoute mpaghara (`http://localhost:20128/v1`). A na-achịkwa ya site na
  secret onye na-eweta (`PROMPTFOO_PROVIDER_KEY`); ọ na-awụfe n'enweghị nsogbu ma tinye
  `|| true` na njedebe, ya mere ọ na-enye akụkọ na-emeghị ka CI daa.

Mkpuchi nke ihe enyemaka guard (`createInjectionGuard` / `withInjectionGuard`)
na-erute route `/v1` ọ bụla nwere prompt; a na-ewepụta ederede prompt site na
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` site na
`extractMessageContents()` dị na `src/shared/utils/inputSanitizer.ts`.
