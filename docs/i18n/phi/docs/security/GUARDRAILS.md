# Guardrails (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Batayan ng katotohanan:** `src/lib/guardrails/`
> **Huling na-update:** 2026-10-17 — v3.8.52 (idinagdag ang [Saklaw at mga limitasyon](#coverage-and-limits):
> kung aling mga ruta at response path ang naabot ng mga hook, ang pinagsamang mga disable header (#16412), ang injection
> block mode bilang sapilitang hangganan (#16413), at kung ano ang nakakakita ng response bago ang post-call)

Ang mga guardrail ay nagpapatupad ng kaligtasan, patakaran, at mga transformation ng nilalaman sa hangganan
sa pagitan ng OmniRoute at ng mga upstream provider. Bawat guardrail ay maaaring magsuri (at opsyonal na
tumanggi, mag-transform, o mag-annotate) ng mga request payload (`preCall`) at mga upstream response
(`postCall`).

Ang sistema ay **fail-open**: kapag nag-throw ang isang guardrail habang nag-eexecute, itatala ng registry
ang error at magpapatuloy ito sa susunod na guardrail sa halip na i-fail ang request. Ang pag-block ay
isang tahasang desisyon (`block: true`), hindi kailanman aksidente. Ang iisang eksepsiyon ay ang na-abort
na request: kapag na-abort ang `signal` ng tumatawag, ang nag-throw na guardrail ay magre-reject ng hook
run sa halip na laktawan ito.

**Hindi** tumatakbo ang mga hook sa bawat ruta o bawat response. Basahin ang
[Saklaw at mga limitasyon](#coverage-and-limits) bago umasa sa isang guardrail bilang security control.

## Mga Built-in na Guardrail

Awtomatikong naglo-load ang registry ng anim na guardrail ayon sa pagkakasunud-sunod ng priority sa pag-import
(tingnan ang `registry.ts` → `registerDefaultGuardrails()`):

| Priority | Pangalan            | (Mga) Stage    | File                  |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Ang mas mababang mga numero ng priority ay tumatakbo nang **una**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Ang GLM 5.3 base model at `glm-5.3-{low,high,max}` ay may tahasang
`supportsVision:false` na registry/spec metadata. Ang mga GLM 5.3 Flash variant
ay nananatiling mga native-vision model. Ang `/v1/messages` route ng Claude Code
ay pumapasok sa shared `handleChat` pre-call guardrail chain **bago** ang
Claude-to-OpenAI translation; ang mga naka-nest na `Read` tool-result image ay
dapat ma-describe o ma-handle bago iangat ng translation na iyon ang mga ito sa
OpenAI `image_url` content (#17069).

Hinaharang nito ang mga request na may dalang imahe na patungo sa mga **non-vision
model** at maaaring i-reroute ang buong request sa isang vision-capable na model,
o palitan ang mga image part ng mga text description na ginawa ng isang
nako-configure na vision model bago ang upstream call. Pinapayagan nito ang mga
text-only provider na transparent na mag-handle ng mga multimodal payload.

Daloy:

1. Laktawan kung ang target model ay sumusuporta na sa vision (maliban kung
   lumalabas ito sa forced-bridge list na `isVisionBridgeForcedModel`).
2. I-extract ang mga image part sa pamamagitan ng `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), na nagde-delegate sa **unified media
   detector** na `detectMediaParts()` sa `open-sse/utils/mediaParts.ts` — ang
   iisang batayan ng katotohanan na ibinahagi sa combo compatibility filter.
   Ang extraction ay naka-allowlist sa mga shape na kayang i-splice pabalik ng
   `replaceImageParts` (ang extract↔replace contract): OpenAI `image_url`,
   Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`, at
   Responses API `input_image`. Ang mga tumutugmang imaheng naka-nest sa loob ng
   `tool_result.content` ng Claude Code at ng mga tool output ng Responses ay
   ini-extract din at pinapalitan sa kanilang mga orihinal na path; ang mga
   indicator-only na shape ay materyal ng combo filter at hindi ini-extract.
   Laktawan kung walang nahanap.
3. I-resolve ang runtime config sa pamamagitan ng
   `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): panalo ang mga bagong
   `modalityBridge*` settings key; ang mga legacy `visionBridge*` key ay
   nananatiling **one-cycle fallback** (rollback window). Laktawan bago ang
   anumang media traversal kapag naka-disable ang bridge.
4. Ang tagapili ng mode (`modalityBridgeVisionMode`, tingnan ang talahanayan sa
   ibaba) ang nagpapasya kung reroute o describe. Ang reroute ay nagbabalik ng
   `modifiedPayload` na may `model` lamang na pinalitan, kasama ang meta na
   `{ rerouted, fromModel, toModel, imagesKept }`.
5. Ang describe path: limitahan ang mga imahe sa `maxImages`, buuin ang
   task-aware na prompt, tiningnan ang describe cache, tawagan ang vision model
   **nang parallel** (`Promise.allSettled`), at mag-inject ng mga text part na
   `[Image N]: <description>` bilang kapalit ng mga ito. Ang nabigong describe ay
   nagbubunga ng `null`: pinapanatili ang raw na imahe para sa mga hindi kilala
   o vision-capable na target (#4012), ngunit ang isang **nakumpirmahang
   text-only na direktang target** o isang combo na walang vision ay tumatanggap
   ng tahasang text stub na
   `(unavailable — no vision-capable provider connected)` para sa bawat imaheng
   hindi na-describe, kabilang ang mga bahagyang pagkabigo at mga imaheng lampas
   sa limit ng describe call (#17069). Ang umiiral na all-failed combo describe
   fallback ay nananatili sa lugar nito (#8430).
6. Ibalik ang `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Tagapili ng mode (`modalityBridgeVisionMode`)

| Mode       | Default | Pag-uugali                                                                                                                                                                                                                                                                                                         |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔       | Legacy na heuristic, hindi ginalaw (#6640/#7204): ang mga non-combo/`auto/` model ay nagre-reroute sa pinakamahusay na vision model maliban kung ang orihinal na model ay may magagamit nang credentials (pagkatapos ay describe); ang mga combo target ay laging nagde-describe.                                  |
| `describe` |         | Laging describe — ang reroute block ay lubos na nilalaktawan; ang piniling model ng user ang laging sasagot.                                                                                                                                                                                                       |
| `reroute`  |         | Pilit na reroute: binabypass ang keep-credentialed-model na guard. Ang reroute-**target** credential guard ay nananatiling umaandar — kapag walang magagamit na vision target, hinaharang ng bridge na may malinaw na error sa halip na mag-describe o magpadala ng mga raw na imahe sa isang text-only na target. |

Ang mga forced mode ay nag-short-circuit **bago** tumakbo ang auto heuristic; ang `auto` na pag-uugali
ay byte-identical sa pre-PR-1 guardrail.

#### Saklaw ng API key (`visionBridgeKeyScope.ts`)

Kapag ang API key ng tumatawag ay naghihigpit sa `allowedConnections`, mga quota pool
(`allowedQuotas`) o mga model (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), ang bridge ay pumipili lamang
ng mga reroute at describe na model na maaaring gamitin ng key, sa mga koneksyon na maaaring
gamitin ng key. Ang describe call ay laging dadaan sa OmniRoute self-loop kasama ang
`x-omniroute-self-loop-key-id` header, kaya ang tumatanggap na chat request
ay muling nagpapatupad ng connection at model policy ng key na iyon. Ang `enforceApiKeyPolicy()`
ay iginagalang lamang ang header na iyon kasama ang self-loop bearer, kaya maaari lamang
nitong higpitan ang access, at ang isang id na hindi ma-resolve ay tinatanggihan.

Kung walang vision model na pinapayagan para sa key, ang isang **nakumpirmang text-only
na target** ay tumatanggi sa image request nang lokal na may malinaw na HTTP 400 sa halip na
i-forward ang mga byte ng imahe sa isang hindi kayang upstream (#17069). Para sa mga target na
may hindi alam o katutubong vision capability, ang describe path ay nagpapanatili ng dating
fail-open na pag-uugali (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Ang mga request na walang key, at mga key na walang mga paghihigpit na ito, ay kumikilos nang
eksaktong tulad ng dati.

#### Describe prompt na may kamalayan sa gawain (`modalityBridgeVisionTaskAware`)

Default na **true**. Idinaragdag ng `composeVisionPrompt()` (`visionBridgeHelpers.ts`) ang
teksto ng **huling mensahe ng user** (pinutol sa 500 karakter) sa base
describe prompt, na nag-aakay ng paglalarawan tungo sa kung ano talaga ang itinanong ng
user (codex-vision-proxy pattern) at hinihiling sa vision model na i-transcribe ang nakikitang
teksto. Kapag naka-off ang flag — o walang teksto ang user — ang base prompt ay
gagamitin nang hindi binabago.

Ang sariling OpenAI-compatible na request ng describe self-loop (`callVisionModelSingle()`
sa `visionBridgeHelpers.ts`) ay laging humihiling ng `image_url.detail: "high"` —
walang kondisyon, para sa bawat tumatawag/provider, hindi nakadepende sa anumang signal ng kliyente.
Ang low-detail na sampling ay nagpapababa ng katumpakan ng OCR para mismo sa gawain ng pag-transcribe
ng teksto na hinihiling ng prompt na ito, kaya ang describe call mismo ay laging humihiling ng mataas na
detalye anuman ang antas ng detalye na ginamit ng orihinal na papasok na request.
Naaapektuhan lamang nito ang panloob na describe request body; hindi nito binabago kung paano
ipinapasa ng OmniRoute ang sariling `image_url.detail` ng tumatawag sa pangunahing request —
ang default na iyon ay inilalapat nang hiwalay, at para lamang sa mga natukoy na OpenCode na kliyente, sa
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Ang
Anthropic wire-format na branch ng describe self-loop ay walang `detail` na field
at hindi apektado ng alinmang default.

#### Hangganan ng output ng describe (`modalityBridgeVisionMaxChars`)

| Susi                           | Default | Saklaw          |
| ------------------------------ | ------- | --------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` o 100–50000 |

Ang `0` (default) ay nangangahulugang **walang hangganan** — ang paglalarawan na ibinalik ng
`callVisionModel()` ay ipinapasa nang hindi binabago, na nagpapanatili ng umiiral na
pag-uugali. Ang anumang halaga sa saklaw na 100–50000 ay nagpuputol ng paglalarawan na may
`…` na suffix bago ito isingit pabalik bilang `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` sa `src/lib/guardrails/visionBridge.ts`).
Itaas ito para sa mga gawain ng OCR na mabigat sa detalye kung saan kailangan ng downstream
model ang buong transcription; ibaba ito upang hangganan ang paggamit ng token sa mga
madaldal na vision model.
Ang field ng dashboard ay matatagpuan sa Advanced panel ng Vision tab
(`modality-bridge-max-chars` sa `ModalityBridgeVisionTab.tsx`) at inaayos ang anumang
halaga sa pagitan ng 1 at 99 papunta sa 100 na floor habang hindi ginagalaw ang tahasang `0`
— ang `0` ay isang wastong Zod na halaga sa sarili nitong karapatan
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), hindi lamang
ang "unset" na default.

#### Cache ng describe (`modalityBridge/bridgeCache.ts`)

In-memory na LRU + TTL cache para sa mga output ng describe, na ibinabahagi sa buong proseso.
Susi = `sha256(imageRef + composedPrompt + configuredBridgeModel)` na may
length-prefix framing (walang mga pagbanggaan ng hangganan ng field). Ang bahagi ng model ay
ang **na-configure** na bridge model, hindi ang model na aktuwal na sumagot —
maaaring mag-fall back ang `callVisionModel` nang panloob, at ang pag-key bawat pagtatangka ay
magkakahiwa-hiwalay ng cache. Ang mga nabigong describe ay hindi kailanman naka-cache. Mga setting:

| Susi                            | Default | Saklaw  |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Normalisasyon ng remote na imahe (self-loop describe/base64 fetch)

Kapag ang bridge mismo ang kumukuha ng **remote** na imahe — ang Anthropic
describe self-call at ang claude-wire-format na base64 conversion
(`ensureBase64ImagesForClaudeWire`), parehong dumadaan sa
`fetchRemoteImageAsDataUri()` sa `visionBridgeHelpers.ts` — ang resultang data
URI ay ipinapasa sa `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) bago i-embed sa request ng vision model.
Ang mga sobrang laking imahe ay dinadaan sa downscale hanggang **2048px na long edge**
(tumutugma sa resize cap na inilalapat na ng OpenAI/Anthropic sa server-side), na
nagpapababa ng upload bytes/latency nang hindi binabago ang nakikita ng vision
model. Ang resizing ay gumagamit ng `sharp`, na nilo-load gamit ang dynamic
import: sa platform kung saan hindi naglo-load ang native binary nito, ang
`normalizeDataUri()` ay **hindi kailanman nagta-throw** — bumabalik ito sa
passthrough ng orihinal na bytes, kaya palaging gumagana ang
describe/base64-conversion path. Ang mga hindi-imaheng bytes (isang fetch na
hindi nagbalik ng ma-de-decode na imahe) ay ipinapasa ring hindi
hinahawakan. Ang normalisasyong ito ay nakatakda lamang sa mga imaheng
kinukuha ng bridge para sa sarili nitong self-call — hindi ito kailanman
inilalapat sa raw passthrough payload ng caller, naaayon sa
opt-in-only na prinsipyo ng mutasyon (Hard Rule #20).

#### Settings schema + migration

Ang mga bagong `modalityBridge*` key ay Zod-validated sa `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, ang tatlong `modalityBridgeCache*`, at ang
`modalityBridgeAudio*` na grupo na ginagamit ng Audio Bridge. Kinokopya ng
migration na `141_modality_bridge_settings.sql` ang mga umiiral na legacy na
`visionBridge*` na halaga papunta sa mga katumbas na bagong key (idempotent,
hindi kailanman nag-o-overwrite ng halagang itinakda ng operator sa
`modalityBridge*`); ang mga legacy key ay nananatiling tinatanggap bilang
read fallback sa loob ng isang release cycle.

#### Transparency header + stats

Ang mga response na dumaan sa describe-transform ay may dalang
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(binuo ng `buildModalityBridgeHeader()` sa `modalityBridge/bridgeStats.ts`,
ini-stamp ng `withModalityBridgeHeader()` sa `src/sse/handlers/chatHelpers.ts`).
Ang mga rerouted na request ay **walang** header — ang payload ay hindi
hinawakan at ang model swap ay nakikita na sa `model` field ng response body.

Ang `GET /api/modality-bridge/stats` (management auth, kaparehong tier ng
`GET /api/settings`) ay nagbabalik ng in-memory na per-modality na mga counter
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` para sa `vision`, `audio`, at
`video`. Ang `averageLatencyMs` ay gumagamit ng `latencySamples`, hindi lahat
ng attempts, bilang denominator nito; ang operasyong walang timing ay hindi
nag-imbento ng zero-millisecond na sample. Ang `bridged` ay nananatiling
backward-compatible na alias para sa mga matagumpay na conversion; ang mga
nabigong attempt ay hindi nag-i-increment nito.
Ang mga counter ay nire-reset sa process restart alinsunod sa disenyo
(telemetry, hindi accounting).

#### Konfigurasyon ng dashboard

Ang dedikadong dashboard page ay
`/dashboard/settings/modality-bridge`. Ang mga URL-addressable na tab nitong
`Vision`, `Audio`, at `Video` ay nagpapanatili ng mga query parameter habang
pinalitan ang `tab` na halaga. Ang Vision tab ay naglalantad ng enablement,
mode, model selection (kasama ang automatic na default), task-aware prompting,
mga advanced na limitasyon sa timeout/image/description-length/cache, mga
runtime counter, at isang guarded na sample na request. Ang Audio tab ay live
rin: naglalantad ito ng enablement, isang STT-only na model picker na may
Auto, mga limitasyon sa timeout/max-clip, mga audio counter, at isang
`input_audio` na sample test. Ang Video tab ay functional: iniulat nito ang
FFmpeg/ffprobe runtime state — isa sa apat na explicit na UI state (`unknown`
habang nasa paglipad pa ang probe o hindi ito nakumpleto, `restricted` sa isang
non-loopback na dashboard host kung saan nilalaktawan ang probe sa client-side,
`unavailable` kapag na-probe na at nakumpirmang wala, o `available` kasama ang
mga bersyon ng FFmpeg/ffprobe) — pinananatili ang mga limitasyon sa
enable/model/frame/video/timeout, fini-filter ang model picker sa mga
vision-capable na model, at naglalantad ng mga video counter.

Ang dating Vision Bridge card sa ilalim ng AI settings ay isang compatibility
link patungo sa bagong page; hindi na ito nagmamay-ari ng pangalawang kopya ng
form. Ang Media Providers ay nagli-link din ng mga Image-to-Text at
Speech-to-Text workflow sa mga katumbas na Modality Bridge tab nang hindi
inaalis ang umiiral na Speech-to-Text playground.

**Self-loop admission bypass:** kapag ang describe call ay dumaan sa sariling
`/v1` self-loop ng OmniRoute (non-standard na provider model), ang sub-request
ay nagpapadala ng `x-omniroute-admission-bypass: internal` at
naa-authenticate gamit ang na-resolve na self-loop credential — ang lokal na
`sk_omniroute` sentinel sa local mode, o ang operator-configured na
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` na env key (#1350) upang ang mga
deployment na may `REQUIRE_API_KEY=true` ay makapagpatakbo pa rin ng describe
call. Ang bypass ay pinapansin lamang para sa mismong mga credential na iyon,
kaya ang mga external client ay hindi makakagamit ng header para laktawan ang
admission.

Ang mga legacy default ay nasa `src/shared/constants/visionBridgeDefaults.ts`;
ang mga bagong mode/task-aware/cache na default at ang settings resolver ay
nasa `src/shared/constants/modalityBridgeDefaults.ts`. Ang guardrail ay
naglalantad ng `deps` constructor option upang ang mga test ay makapag-inject
ng mga pekeng `getSettings` at `callVisionModel` na implementation.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Hinaharang ang mga chat request na may kalakip na audio bago ito umabot sa
target na hindi kilalang tumatanggap ng audio input. Hindi nito kailanman
nire-reroute ang chat request: ang mga audio part ay tinatranscribe sa pamamagitan
ng umiiral na OpenAI-compatible na multipart endpoint at ang napiling chat
model ay nagpapatuloy gamit ang mga text transcript.

Daloy:

1. I-resolve ang `supportsAudio` sa pamamagitan ng `getResolvedModelCapabilities()`. Ang explicit
   na metadata ng provider-registry ang mananaig, kasunod ang static na metadata ng
   modelo, tapos ang naka-sync na `modalities_input`. Ang isang dineklarang input list
   na walang `audio` ay `false`; kapag walang ebidensya ng kakayahan, nananatiling
   `null`. Parehong nag-a-activate ang `false` at `null` ng conservative na bridge,
   habang nilalampasan ito ng `true`.
2. I-resolve ang mga setting ng `modalityBridgeAudio*` at i-extract ang mga nasa-splice
   na top-level na audio part mula sa bawat mensahe sa pamamagitan ng shared na
   `detectMediaParts()` detector. Ang mga sinusuportahang wire shape ay OpenAI
   `input_audio`, `audio_url`, at `source.media_type: "audio/*"`. Ang nested na audio
   ay natutukoy para sa routing ngunit hindi inaalis ng splice path. Ang trabaho ay
   may limitasyong `modalityBridgeAudioMaxClips`; ang mga sumunod na part ay
   nananatiling hindi nagagalaw.
3. Sundin ang naka-configure na `provider/model`, o hayaang dumaan ang
   `selectAudioBridgeModel()` sa `AUDIO_TRANSCRIPTION_PROVIDERS` sa stable na
   pagkakasunud-sunod ng katalogo at piliin ang unang modelo na may magagamit na
   aktibong kredensyal ng provider.
4. Kinokonvert ng `callAudioTranscription()` ang base64/data-URI na audio sa isang
   multipart na `file`, o dinidownload ang isang remote na `audio_url` sa pamamagitan
   ng public-only na outbound guard na may DNS pinning at 25 MB na hangganan.
   Pagkatapos nito, ipo-POST ang file at ang napiling modelo sa lokal na
   `/v1/audio/transcriptions` self-loop, na may authentication gamit ang
   `resolveSelfLoopBearer()`. Ang umiiral na transcription route ay nagsasagawa ng
   normal na paghahanap ng kredensyal, paghawak ng cooldown/rate-limit, at dispatch
   sa provider.
5. Ang mga matagumpay na tawag ay pinapalitan ang kanilang mga part ng
   `[Audio N]: <transcript>`. Tumatakbo ang mga tawag gamit ang `Promise.allSettled`:
   ang indibidwal na kabiguan ay nagpapanatili ng orihinal na audio part na iyon
   (kontrata ng #4012). Kung bumagsak ang bawat tawag at napatunayan na ang target ay
   `supportsAudio === false`, ang mga part ay magiging
   `[Audio N]: (unavailable — no STT provider connected)` (kontrata ng #8430). Para sa
   isang hindi kilalang target (`null`), ang resultang lahat-nabigo ay nananatiling
   hindi nagagalaw. Ang isang napatunayang text-only na target na walang magagamit na
   STT na kredensyal ay tumatanggap ng parehong explicit na stub nang hindi naglalabas
   ng network call.

Ang mga matagumpay na transcript ay gumagamit ng process-wide na Modality Bridge
LRU/TTL cache. Pinagsasama ng key ang audio reference, ang stable na
`audio-transcription` na label ng operasyon, at ang napiling STT na modelo; ang mga
kabiguan ay hindi kailanman naka-cache. Ang mga audio attempt ay nag-a-update ng mga
shared na counter na `bridged`, `cacheHits`, `failures`, at `lastUsedAt`. Ang mga
na-transform na response ay nagdadala ng
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; ang mga hindi
nagalaw na request ay hindi tumatanggap ng Audio Bridge segment.

Ang mga runtime setting ay nakabatay sa DB at na-validate ng Zod:

| Susi                          | Default | Saklaw        |
| ----------------------------- | ------- | ------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —             |
| `modalityBridgeAudioModel`    | `""`    | Auto o STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000   |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10          |

Ang shared na cache ay nananatiling kontrolado ng `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, at `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Hinaharang ang mga nangungunang bahagi ng video sa Mga Pagkumpleto ng Chat `messages` at Mga Tugon API `input` bago tawagin ang isang target na walang kilalang suporta sa native na video. Ang mga sinusuportahang hugis ay `input_video`, `video_url`, `video_source`, HTTPS URLs, at `data:video/*;base64,...` data URIs. Ang mga simpleng filename sa text ay hindi itinuturing bilang video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) ay nagmamay-ari ng request traversal, ang capability/policy check, per-request aggregation, at ang response payload. Per-video work — acquisition, ang buong resultang cache, na naglalarawan ng isang frame sequence (na nagsasama ng anumang caller-declared audio transcript), at per-attempt metrics/abort/cleanup — ay nakatago sa likod `processVideoPart` sa `videoBridgePipeline.ts`, na tinatawag nang isang beses sa bawat bahagi ng video sa loob ng loop ni `preCall`. Tinutukoy din ng module na iyon ang tahasang port boundaries `VideoMediaBrokerPort` (pagkuha ng mga byte at pag-extract ng mga sample na frame), `VideoAudioTranscriptionPort` (pagsasama ng audio transcript na idineklara ng tumatawag sa mga naka-sample na caption), at `VideoDrilldownPort` (ang legacy na raw-store na hugis). Binubuo ang production STT at frame retention sa paligid ng naglalarawang port sa pamamagitan ng `createVideoSttAdapter` at `createVideoDrilldownAdapter`; ang huli ay gumagamit ng nakabahaging opaque-handle na lifecycle.

Ang landas ng kahilingan ng pampublikong `/v1` ay hindi kailanman nag-i-import o humihiling ng subprocess. Ang mga malalayong video ay dina-download sa ilalim ng 50 MiB bound; Ang mga inline na base64 na video ay may konserbatibong 36 MiB na decoded per-video cap upang ang model/messages/framing envelope ay maaaring manatili sa loob ng pampublikong JSON request admission limit na 50 MiB. Ang mga pagtatantya sa haba ng inline at na-decode na laki ay sinusuri bago ang paglalaan. Kinakailangan ang HTTPS sa paunang remote URL at bawat pag-redirect, gamit ang umiiral na pampubliko lang na outbound na bantay na may DNS pinning. Ang mga byte ay tumawid sa eksaktong panloob na hangganan ng `POST /api/modality-bridge/video/extract` broker. Ang rutang iyon ay parehong `LOCAL_ONLY` at `SPAWN_CAPABLE`, tumatanggap lamang ng per-process na na-authenticate, trusted-loopback na kahilingan, at hindi kailanman tumatanggap ng URL, filesystem path, executable, o listahan ng argumento. Ang API body-size na pipeline at ang incremental body reader ng handler ay malayang nagpapatupad ng 50 MiB broker input cap. Ang bounded queue nito ay nagpapatakbo ng isang pagkuha sa isang pagkakataon, nagbibigay-daan sa apat na nakabinbing trabaho, at nililimitahan ang nakabinbing input sa 100 MiB.

Inside the broker, `ffprobe` reads a private local file; ibinubukod ng fixed format allowlist ang mga format ng playlist at manifest. For allowed MOV-family containers, external MOV data references remain disabled by default, and the fixed command does not opt in to them. Both `ffprobe` and `ffmpeg` use the `file` -only protocol whitelist, one thread, fixed argument arrays, no shell, and executables resolved from `PATH`. Ang mga stream ng pabalat na may kasamang larawan ay hindi mga kandidatong puwedeng laruin. Dapat matugunan ng lahat ng puwedeng i-play na stream ang mga limitasyon, at mas gusto ang isang tahasang default na stream bago ang deterministic na lowest-index fallback. Ang mga video ay limitado sa 600 segundo, 8,192 pixels bawat dimensyon, at 33,554,432 source pixels. FFmpeg samples 1–16 midpoint JPEG frames, scales down the long edge to at most 1,024 pixels without upscaling smaller inputs, and never receives a URL. Sampling is `uniform` by default. The optional `scene_aware` and experimental `segment_aware` policies perform one additional fixed FFmpeg pass over the already validated local stream, select bounded `showinfo` scene timestamps, and fall back deterministically to the same uniform midpoints on detector failure, timeout, malformed output, or an empty candidate set. Ang segment-aware mode ay naglalaan ng mga sample ng midpoint nang proporsyonal sa mga napatunayang agwat ng eksena; Nakadetalye sa ibaba ang katibayan na may kamalayan sa segment at pag-uugali ng fallback. Ang hard 16-frame cap ay inilalapat pagkatapos ng pagpili sa bawat patakaran. When a scene-aware request has only a one-frame budget, it uses the uniform midpoint of the active full-video or focus window and reports `policyEffective: uniform`: a single selected scene frame cannot preserve both temporal ends. A caller may optionally provide a finite focus window (`start`/`end` seconds); bounds ay clamped sa tagal ng media, reversed o non-finite window ay tinatanggihan, at lahat ng sampling patakaran ay isinasagawa lamang sa loob ng normalized na pagitan. Ang resultang window ay kasama sa sampling metadata at sa hindi pinagkakatiwalaang prefix ng paglalarawan upang makilala ng mga downstream na modelo ang isang nakatutok na sipi mula sa buong timeline.

Ang semantic caption focus ay isang hiwalay at tahasang setting. Pinapanatili ng default `full` analysis mode ang kasalukuyang frame prompt at hindi kailanman nagpapasa ng text ng kahilingan sa modelo ng caption. Sa `focused` mode, binabasa lang ng tulay ang pinakabagong hindi walang laman `text`/`input_text` na isinulat ng user mula sa parehong lalagyan ng Chat o Mga Tugon, ine-normalize ito sa NFC, kino-collapse ang mga control character at whitespace, at nililimitahan ito sa 500 Unicode code point. Ang isang walang laman na resulta ay bumabalik sa eksaktong `full` prompt. Ang isang magagamit na pahiwatig ay naka-serialize bilang JSON sa isang nakalaang untrusted-user-context block at maaari lamang unahin ang mga nakikitang detalye; hindi nito maaaring i-override ang hiwalay na babala laban sa pagsunod sa mga tagubilin na nakikita o naririnig sa media. Ang textual focus ay hindi kailanman naghihinuha ng `start`/`end` o nagbabago sa temporal na sampler.

#### FU-07 structural segment na ebidensya

Gumagamit `segment_aware` ng isang bounded pre-analysis pass sa na-validate nang lokal na video stream. Ang nakapirming filter chain ay unang sumusukat sa hindi hihigit sa 320 pixels ang lapad, nakakakita ng mga pagbabago sa eksena at nag-freeze na pagitan, pagkatapos ay nagsa-sample sa 1 frame bawat segundo para sa blur, average na luma, at spatial/temporal na impormasyon. Ang pass ay limitado sa 600 structural sample, isang FFmpeg/filter thread, ang parehong `file` -only protocol at container allowlists, isang 1 MiB process-output bound, at hindi hihigit sa 30 segundo sa loob ng nakabahaging abort/deadline. ng broker Hindi ito tumatanggap ng command, filter, path, o URL mula sa kahilingan.

Ang mga structural value ay deterministic sampling evidence, hindi semantic video understanding. Hindi sila naghihinuha ng mga paksa, aksyon, caption, pananalita, o layunin ng user. Ang mga hangganan ng eksena at pag-freeze ay bumubuo ng mga segment; Ang freeze coverage, blur, exposure, spatial na detalye, at temporal na pagbabago ay nakakaimpluwensya lamang kung paano inilalaan ang kasalukuyang 1–16 frame budget. Ang isang ganap na naka-freeze na segment ay nililimitahan sa isang frame, habang ang mga hindi naka-frozen na segment ay nakikipagkumpitensya para sa natitirang badyet. Kapag ang mga hangganan ay lumampas sa bilang ng mga frame, ang pare-parehong saklaw ng timeline ay pananatilihin kaya ang mabilis na maagang pagbawas ay hindi makapagtago ng isang mahabang trailing na segment. Pinagsasama-sama ang mga hangganan ng eksena sa loob ng 1 segundong resolusyon ng pagsusuri ng isang hangganan ng pag-freeze.

Ang mga nawawalang filter, katibayan malformed/empty, error sa detector, o ang limitadong timeout bago ang pagsusuri ay hindi nakabukas sa eksaktong pare-parehong patakaran sa midpoint. Ang isang caller abort o broker deadline ay hindi mabibigo bukas: ito wawakasan ang in-flight subprocess, pinipigilan mamaya frame extraction, at ang pribadong pansamantalang puno ay aalisin sa `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` ay bumubuo ng mga deterministikong real FFmpeg fixtures para sa post-dedup caption-call savings, dense-motion na paglalaan ng badyet, blur/exposure/SI-TI evidence, mabilis na pagbawas na may mahabang buntot, at unti-unting pagkupas ng mga false positive. Itinatala nito ang pre-analysis wall time at, kung saan available ang `/usr/bin/time`, child CPU at peak RSS. Ang mga pagsusuri sa kalidad nito ay mga structural oracle lamang. Ang tunay na kalidad ng modelo ng caption ay nananatiling `HOLD` dahil ang harness na ito ay walang awtorisadong endpoint o nakapirming judge. Ang mga pagtitipid sa pera ay nananatiling `HOLD` maliban kung `--caption-cost-per-call-usd` ay nagbibigay ng tahasang positibong pagtatantya sa bawat tawag; hindi kailanman gumagawa ang script ng alinmang resulta.

Ang bawat frame ay limitado sa 4 MiB, lahat ng mga raw frame ay magkakasama sa 23 MiB, at ang serialized na tugon ng broker sa 32 MiB. Ang isang pribadong pansamantalang direktoryo ay tinanggal sa `finally`. OmniRoute ay hindi nagbu-bundle ng FFmpeg at hindi tumatanggap ng custom na executable path. Bago mag-caption, ang tulay ay naglalapat ng konserbatibong visual deduplication pass: bawat JPEG ay binabawasan sa isang 16 × 16 grayscale buffer at inihahambing lamang sa huling frame na napanatili. Para sa hiniling na badyet ng caption sa itaas ng isang frame, nagbibigay ang extraction ng bounded candidate pool na hanggang dalawang beses sa badyet na iyon at hindi hihigit sa 16 na frame. Ang hiniling na takip ay inilalapat lamang pagkatapos ng pag-deduplikasyon, kung saan ang una at huling napiling mga kandidato ay napanatili sa panahon ng huling pagnipis kapag ang badyet ay hindi bababa sa dalawa. Ginagamit ng may bersyong patakarang `grayscale-16x16-mean-cells-v2` ang mas malaki sa mean luma delta at ang ratio ng mga thumbnail cell na ang normalized na delta ay hindi bababa sa 0.05. Ang duplicate na threshold ay ang pare-parehong 0.04, na pinili para sa predictability sa halip na ilantad bilang isang setting ng runtime. Ang pangalawang high-contrast na signal na ito ay nagpapanatili ng maliit na paggalaw at nakikitang mga pagbabago sa text na maaaring itago ng isang mean-only na paghahambing. Ang mga error sa comparator o decoder ay hindi nakabukas at nagpapanatili ng saklaw. Ang output metadata ay naghihiwalay sa mga na-extract na kandidato, matagumpay na nagamit na mga frame, at mga visual na duplicate na na-drop.

Ang isang tahasang minarkahang bahagi ng video ay maaaring humiling ng timestamped na contact sheet. Ang tulay ay bumubuo ng hindi hihigit sa isang 4-column, 16-frame JPEG grid. Ang bawat 512-pixel na cell ay sinusunog ang source timestamp nito sa isang high-contrast na banda sa ibaba, habang ang parehong mga timestamp ay nananatili sa textual metadata para sa downstream na asosasyon at pag-audit. Ang kumpletong JPEG ay nananatiling may limitasyon sa 32 MiB. Kung hindi ma-decode o ma-compose ng `sharp` ang grid, babalik ang tulay sa mga indibidwal JPEG frame; kumakalat pa rin ang isang client abort sa pamamagitan ng sheet operation.

Ang katibayan ng promosyon ay sadyang hiwalay sa microbenchmark ng synthetic na komposisyon. Tinutukoy `scripts/perf/video-bridge-contact-sheet-eval.ts` ang isang schema-versioned A/B harness para sa mga totoong OpenAI-compatible vision models. Sinusukat nito ang mga token na iniulat ng provider, end-to-end na wall latency (kabilang ang komposisyon ng sheet), bilang ng tawag sa modelo, at pagpapanatili ng katotohanan na tinukoy ng manifest. Ang mga tugon ng raw na modelo ay hindi nakasulat sa ulat; tanging SHA-256 digest at katugmang katotohanang IDs ang pinananatili. Ang harness ay hindi gumagawa ng network o binabayarang modelong tawag maliban kung `--execute-real` ay naipasa at `--model`, `OMNIROUTE_BASE_URL`, at `OMNIROUTE_API_KEY` ay na-configure. Kung wala ang tahasang tunay na pagtakbo, ang hatol na nababasa ng makina ay mananatiling `HOLD`; Ang mga synthetic na sukat payload/call-count lamang ay hindi katibayan ng promosyon.

Maaaring mag-attach ang mga tumatawag ng opsyonal `transcript.cues` array sa isang sinusuportahang bahagi ng video kapag mayroon na silang naka-align na text. Ang bawat cue ay dapat may `text`, isang may hangganang `start`/`end` interval sa loob ng probed duration, at isang naka-whitelist na `source` (`client`, `embedded`, o `audio-bridge`); Nagde-default `confidence` sa `1` at dapat manatili sa pagitan `0` at `1`. Na-collapse ang mga eksaktong duplicate na cue. OmniRoute ay hindi magsisimula ng transkripsyon mula sa metadata na ito: ang mga napatunayang cue ay kinokopya sa inilarawang resulta na may pinagmulan, kumpiyansa, at agwat, at ibinibigay bilang hindi pinagkakatiwalaang mga obserbasyon kasama ng mga caption ng frame. Ang di-wasto, out-of-range, o provenance-free na text ay tinatanggihan sa halip na ihalo sa stream ng caption. Ang parehong request-body transcript channel ay nag-normalize ng ibinigay na provenance sa `client`, kasama ang self-asserted `embedded` o `audio-bridge` label. Tanging isang adapter na pagmamay-ari ng server ang maaaring magtalaga ng mga pinagkakatiwalaang label na iyon sa pamamagitan ng code-only `trustedSource` argument; hindi maabot ng isang patlang ng kahilingan JSON ang argumentong iyon. Ang transcript text ay nananatiling hindi pinagkakatiwalaang nilalamang hango sa media, anuman ang pinagmulan nito, at hindi dapat matukoy ang pahintulot.

Ang isang advanced na tumatawag ay maaaring magbigay ng `audioTranscript` track para sa parehong video; ito ay itinuturing bilang text na ibinigay ng kliyente, hindi patunay ng transkripsyon ng server. Ang fusion seam ay nagpapatakbo ng mga visual at audio na obserbasyon sa ilalim ng isang deadline at nag-abort ng signal, nag-uutos sa kanila sa isang karaniwang timeline, nagko-collapse ng mga eksaktong duplicate, at nag-uulat ng bahagyang resulta kapag isang panig lang ang nagtagumpay. Ang isang di-wastong `audioTranscript` ay bumababa sa bahagyang resulta na iyon — ang visual na paglalarawan ay pinapanatili at ang audio branch ay nagtatala ng isang sanitized na failure code — sa halip na mabigo ang buong video. Ang availability sa bawat branch, ang bahagyang flag, at ang mga na-sanitize na failure code ay pinapanatili sa inilarawang resulta, sa guardrail metadata (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), sa resulta-cache metadata, at sa bridge fusion counter. Ang default na Video Bridge path ay hindi gumagamit ng speech-to-text o nagda-download ng pangalawang kopya ng media; kung wala ang tahasang track na iyon, nananatili itong video-only.

**Pagpapanatili ng transcript (#12150 P1).** Awtomatikong nalalapat ito sa tuwing ang Video Bridge (ang mismong nag-opt-in) ay nag-render ng transcript cue — na walang hiwalay na retention flag. Kapag ang isang kahilingan ay nag-render ng anumang transcript cue (isang caller-declared `transcript` o a fused `audioTranscript`), ang guardrail ay minarkahan ito `videoBridgeObserved` at naglalabas ng redacted shadow ng paglalarawan ng video — isang magkaparehong rendering kung saan ang bawat cue ng free-text body ay pinapalitan ng `[redacted-video-transcript]`, na binuo sa pamamagitan ng pagpapalit ng string sa pamamagitan ng paglalagay ng patlang ng cue bago ang structured. cue content — adversarial o ordinary, kabilang ang mga katawan na naglalaman ng `]` tulad ng `[inaudible]`/`[music]` — ay maaaring mabuhay). Pinapalitan ng paulit-ulit na katawan ng kahilingan sa call-log ang bawat bahagi ng text na nagmula sa video para sa na-redact na anino na iyon, na itinutugma ng pagkakapantay-pantay ng nilalaman; ang `fullText` anchor ay muling binabasa mula sa natapos na pre-call na guardrail payload, kaya ang laban ay nagtagumpay pa rin pagkatapos ng mga chain guardrails (ang PII at mga kredensyal na maskara, mga priyoridad 10/95) muling isulat ang teksto ng paglalarawan sa lugar at pagkatapos ng system-prompt/handoff/memory injection ay muling hinubog ang array ng mensahe. Ang katawan na ipinadala sa itaas ng agos sa modelo ay hindi nagbabago. Ang isang naobserbahang kahilingan ay hindi rin napupuno ng matibay na Memory (parehong hiling at nakuhang tugon na pagkuha ay nilaktawan), kaya ang sariling tugon ng modelo ay hindi maaaring mag-echo ng transcript text sa Memory.

**Mga raw na field ng video (#12430).** Kapag pinagana ang tulay at hindi alam o wala ang suporta sa native na video, ang tinukoy na mga patlang na `transcript`/`audioTranscript` ay nag-a-activate din `videoBridgeObserved`, kahit na matapos ang pagkabigo sa paglalarawan o isang limitasyon `maxVideos`. `null` at walang laman na mga string ay binibilang; wala ang mga field at hindi video metadata. Ang mga napanatili na kopya ay nag-redact sa mga field na ito o tinanggal ang kahilingan, at caches/Memory ay na-bypass.

Sa mga fallback na path na iyon, ang mga valid na caller cue ay nagiging suportadong mga bahagi `text`/`input_text` kaysa sa mga hindi karaniwang field ng provider. Ang parehong mga track na ibinigay ng kahilingan ay nananatiling hindi pinagkakatiwalaang mga obserbasyon `client`, na may tahasang babala na hindi inilarawan ang video at hindi na-verify ang mga timestamp laban sa media. Ang kasalukuyang 256-cue/64-KiB total at per-cue na badyet ay nalalapat sa dalawang track nang magkasama; Ang mga timestamp ay dapat magkasya sa 600 segundong kisame ng broker at anumang ibinigay na window ng focus. Ang mga di-wastong track ay itinatapon, hindi ipinapasa bilang arbitrary na teksto; ang isang wastong kapatid ay maaari pa ring gamitin maliban kung ang kanilang pinagsamang badyet ay lumampas. Ang mga patlang Null/empty ay hindi magdagdag ng teksto. Walang media fetch o transkripsyon ang idinagdag ng fallback na ito. Ang mga field ng extension ng transcript ay inalis mula sa fallback na video carrier at ang mga `video_url`/`source` object nito. Ang OpenAI wire allowlist ay nananatiling mahigpit; Ang mga hindi kilalang katutubong video carrier ay nananatiling available at ang mga kilalang text-only na target ay nagpapanatili ng mga ligtas na marker. Pinoprotektahan ng mga structured redaction shadow ang nakadugtong na transcript text, habang nananatiling hindi nagbabago ang orihinal na kahilingang pagmamay-ari ng tumatawag. Ang mga target na sinusuportahan ng katutubong at may kapansanan na tulay ay nagpapanatili ng kanilang umiiral na gawi sa bypass.

Ang mga karagdagang napanatili na kopya ay gumagamit ng parehong signal ng naobserbahang kahilingan. Ang raw pre-guardrail client-request snapshot, in-memory na nakabinbing kahilingan, at maagang tinanggihan-request log ay istrukturang pinapalitan ang mga field ng transcript sa mga bahagi ng video; Ang mga string prompt na na-synthesize ng mga yugto ng pipeline at handoff ng konteksto ay ine-redact sa persisted-request-body sink. Ang patuloy na marker `video_content_removed` ay ginagawang hindi naisara ang pagpapatuloy `previous_response_id` sa halip na buuin muli ang teksto na sadyang itinapon. Kung ang isang naobserbahang kahilingan ay nawalan ng anino ng bawat bahagi nito bago mag-log, o kahit na ang isa sa ilang mga anino ng video ay hindi tumugma pagkatapos ng paghiling ng mga mutasyon sa ibang pagkakataon, ang napanatili na nilalaman ng kahilingan ay ganap na aalisin sa halip na panatilihin ang isang bahagyang na-redact na transcript.

Para sa isang naobserbahang kahilingan, maaaring sumipi ang isang tugon ng modelo sa anumang bahagi ng transcript na walang nakabalangkas na hangganan ng cue. Ang patuloy na call-log `responseBody` nito ay pinapalitan ng isang omission marker; hindi pinanatili ang detalyadong pipeline artifact (na maaaring magsama ng mga upstream/client body at stream chunks). Semantic, idempotency, at reasoning-replay caches bypass reads and writes para sa kahilingang iyon. Ang kahilingan ng provider at tugon na nakikita ng kliyente ay nananatiling hindi nagbabago. Ang mga maagang keepalive byte ay na-drain mula sa pansamantalang buffer kapag ang detalyadong artifact ay tinanggal. Ang malformed EventStream warning ng Kiro ay nag-uulat lamang ng bilang ng payload byte, hindi kailanman ang mga nilalaman nito o ang raw error ng JSON parser. Hindi nito inaangkin na ang bawat hindi nauugnay provider/plugin diagnostic ay na-audit; ang mas malawak na retained-sink sweep ay sinusubaybayan sa #11658.

Ang panloob `/api/modality-bridge/video/drilldown` lifecycle ay isang hiwalay, loopback/token-authenticated cache substrate. Ang bawat operasyon ay nangangailangan din ng canonical opaque principal ID. Bago paganahin ang isang production caller, dapat nitong makuha ang ID na iyon mula sa na-authenticate na nangungupahan at hindi kailanman dapat magpasa ng value na pinili ng kliyente. Ang mga cache key ay nagbibigkis sa principal na iyon sa canonical session at video-reference IDs, nag-iimbak lamang ng kanilang mga SHA-256-derived key, at sumasaklaw sa parehong pagbabasa at pagtanggal sa parehong principal. Ang cache ay nag-iimbak ng hindi hihigit sa 16 na derived JPEG frame sa bawat entry, mag-e-expire ang mga ito pagkatapos ng sampung minuto, at sumusuporta sa bounded `start`/`end` reads o tahasang pagtanggal ng session.

Ang bawat punong-guro ay limitado sa 16 na entry at 64 MiB ng canonical JPEG data. Ang mga limitasyong iyon ay independiyente sa global 64-entry/256 MiB ceiling: ang presyur sa quota ng punong-guro ay nagpapalayas lamang sa mga entry na hindi gaanong nagamit kamakailan ng punong-guro bago isaalang-alang ang global LRU eviction. Ang mga nag-expire na entry ay winalis mula sa principal at global accounting sa cache activity, habang ang pagkansela at pagpapatunay ay hindi gumagawa ng bahagyang kapalit.

Tinatanggihan ng cache ang non-canonical Base64, sobrang padding, non-JPEG media, malformed o truncated JPEGs, at JPEGs na gumagawa ng babala sa panahon ng bounded full-image `sharp` decode. Muling ine-encode nito ang bawat tinatanggap na larawan bilang isang canonical JPEG, nakukuha ang lapad at taas mula sa mga na-decode na byte sa halip na magtiwala sa mga field ng tumatawag, at itinatapon ang anumang sumusunod na polyglot byte sa halip na panatilihin ang mga ito. Tanging ang bounded canonical compressed buffer lang ang sisingilin sa parehong quota. Kasama sa limitasyon ng JSON wire ang Base64 overhead para sa 32 MiB decoded-input na kisame. Itinatala ng bawat nakaimbak na derivation ang na-validate na JPEG format/resolution, patakaran sa pag-sample, bersyon ng derivation, oras ng paggawa, hash ng content na na-compute ng server, at reference ng hash na magulang kasama ang hash ng parent-content ng pinagkakatiwalaang tumatawag. Sinusuri ang pagkansela sa pagitan ng mga asynchronous decode/hash phase bago ang atomic cache commit.

Ang producer ng produksyon ay muling gumagamit ng nakuha nang mga frame ng broker pagkatapos lamang ng matagumpay na visual na pagsusuri, na walang pangalawang video download/extraction. Nangangailangan ito ng operator `modalityBridgeVideoDrilldownEnabled=true`, mahigpit na per-part `drilldown: true`, at isang napatotohanan na API-key record ID. Ang mga halaga principal/session na idineklara ng kliyente ay hindi kailanman nagtatag ng pagmamay-ari. Kung wala ang lahat ng tatlong kundisyon, hindi ito nagha-hash, nagbabago ng laki o nagpapanatili ng mga karagdagang frame. Ang pagkabigo sa pagpapanatili ay nagpapanatili ng magagamit na visual na tugon. Ang mga pinahintulutang kahilingan ay lumalampas sa cache ng resulta ng buong video upang hindi mahawakan ang mga naka-cache na resulta.

Ang matagumpay na mga tugon JSON at SSE ay naglalantad ng hindi hihigit sa apat na opaque na handle sa bounded `x-omniroute-video-drilldown` header. Maaaring basahin ng mga awtorisadong pinagmulan ng browser ang header na iyon nang hindi pinapalawak ang patakaran sa pinagmulan CORS. Ang mga bagong handle ay gumagamit `v1.<32-byte random base64url token>`, at ang registry ay nagpapanatili lamang ng kanilang mga SHA-256 hash. Tumatanggap din ang reader/header parser ng mga legacy na 64-hex na token. Ang authenticated pampublikong consumer ay `GET /api/v1/video-bridge/drilldown?handle=...`, independiyenteng gated sa pamamagitan ng `modalityBridgeVideoDrilldownRemoteEnabled=true`. Ang tahasang patuloy na false ay binawi ang access kahit na ang legacy `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env fallback ay pinagana. Ang pagpapanatili ng produksyon ay may kahalintulad na legacy `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` fallback. Parehong naka-off ang mga fallback.

Nakukuha ng consumer ang pagmamay-ari mula sa na-authenticate na key at inilalapat ang pangunahing patakaran: parehong nabibilang GET at DELETE sa `video` endpoint na kategorya, kabilang ang `/v1` at `/api/v1` alias. Dapat may kasamang `video` ang mga key na may walang laman na endpoint allowlist; nananatiling magkatugma ang mga hindi pinaghihigpitang key. Ibinabalik ng consumer ang parehong 404 para sa hindi alam, nag-expire at mga handle ng isa pang susi. Tumatanggap ito ng `variant=preview|standard|detail` (maximum JPEG na dimensyon 320/640/1280, hindi kailanman na-upscale), `limit=1..8` (o ang legacy `frames` alias, hindi kailanman pareho), zero-based `page`, at opsyonal `start`/`end` focus seconds. Ang mga duplicate na query key at reversed focus window ay tinatanggihan. Ang bawat ibinalik na variant ay may hash ng aktwal na nilalaman nito at aktwal na metadata ng resolusyon, na naka-link sa napanatili na pinagmulan. Ang mga variant ay hinango sa nabasa sa halip na nakaimbak bilang mga karagdagang napanatili na kopya. Ang tugon JSON, kasama ang Base64/envelope, ay nililimitahan sa 32 MiB; ang isang napakalaking pahina ay nagbabalik ng 413 at ang kliyente ay dapat humiling ng mas kaunting mga frame. Binabasa ang pagkansela ng check sa bawat pagbabago ng laki at muling suriin ang validity ng handle bago bumalik. `DELETE` ng may-ari ay idempotent; Ang pagtanggal o pag-expire TTL ay naglalabas ng napanatili na pinagmulan at accounting ng paggamit.

Ang nakabahaging tindahan ay lokal na proseso: ang mga handle ay mag-e-expire sa pag-restart at hindi maililipat sa pagitan ng mga independiyenteng proseso OmniRoute. Inilalantad ng mga istatistika ng pamamahala ang epektibong pagpapanatili/malayuang patakaran at pinagsama-samang napanatili entries/bytes lamang, hindi kailanman media, mga sanggunian, punong-guro IDs o mga hawakan. Ipinapakita ng panel ng mga setting ng Video ang mga halagang iyon at maaaring magpatuloy sa parehong mga switch ng pahintulot. Ang dokumentasyon ng pagpapatupad na ito ay hindi live na deployment o ebidensya ng promosyon; Ang pagtanggap sa tunay na modelo ay sinusubaybayan nang hiwalay.

Ang mga frame ay naka-caption nang sunud-sunod gamit ang naka-configure na modelo ng Video. Ang isang walang laman na pag-override ng Video ay namamana ng setting ng Vision; kung parehong walang laman, pipiliin ng Vision auto-router ang epektibong modelong may kakayahang makita. Pinapalitan ng mga matagumpay na caption ang orihinal na bahagi ng isang stable `[Video description:` prefix na nagmamarka rin sa text bilang isang hindi pinagkakatiwalaang pagmamasid na hango sa media at nagsasabi sa mga downstream na modelo na huwag sundin ang mga tagubiling makikita sa media. Kasama sa mga key ng cache ng frame-caption ang mga JPEG byte, prompt, timestamp, at epektibong modelo; ang mga matagumpay na caption lamang ang naka-cache. Ang mga entry sa cache ay nagpapanatili ng aktwal na matagumpay na modelo ng producer, kabilang ang isang fallback na modelo; ang tulay ay nag-uulat ng `mixed` kapag ang iba't ibang mga frame ay ginawa ng iba't ibang mga modelo. Ginagamit muli ng cache hit ang pagkakakilanlan ng producer na iyon sa halip na muling lagyan ng label ito bilang hiniling na plano sa pagruruta. Ang cache ng resulta ng buong video ay naka-key sa bawat input na nagbabago sa output — prompt, epektibong modelo, sampling policy, frame count, semantic analysis mode, ang SHA-256 fingerprint ng normalized focus hint, focus window, `transcript`, `audioTranscript`, at ang contact-sheet flag — kaya ang pagbabago sa alinman sa mga dimensyong iyon ay isang cache miss, hindi kailanman isang stale reuse. Ang bersyon ng patakaran sa visual na pag-de-dep, threshold, at bounded na candidate-frame count ay tahasan din sa result-cache key at metadata; ang isang pagbabago sa patakaran samakatuwid ay hindi maaaring muling gamitin ang isang lipas na buong-video na paglalarawan. Pinapanatili ng metadata ng resulta-cache v4 ang mode at fingerprint, hindi ang hilaw na gawain ng user. Iniuulat ng metadata ng Guardrail ang hinihiling at epektibong mga mode ng pagsusuri; ang isang hiniling na `focused` mode na walang magagamit na teksto ng user ay iniulat bilang epektibong `full`.

Kinukuha ng guardrail ang bawat sinusuportahang bahagi ng video ngunit naglalarawan ng hindi hihigit sa `modalityBridgeVideoMaxVideos`. Para sa isang target na napatunayang may `supportsVideo === false`, ang mga video na nabigo at labis na limitasyon ay nagiging tahasang ligtas na mga text marker kaya walang raw na video ang nananatili. Kapag hindi alam ang kakayahan, pinapanatili ng mga bahaging iyon ang kanilang video carrier; anumang fallback transcript ay sumusunod sa bounded text conversion sa itaas. Mga target na may `supportsVideo === true` bypass ang tulay. Ang kahilingan ng kliyente na i-abort ang signal ay kumakalat sa pamamagitan ng pag-download, pila ng broker, mga subprocess, at mga tawag sa caption; huminto ang mga abort sa pagitan ng mga video at hindi kailanman nabigo na bukas sa raw media.

Ang mga setting ng runtime ay DB-backed at Zod-validated:

| Susi                                | Default     | Saklaw / pag-uugali                                                                                                                          |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Opsyonal na runtime, opt-in                                                                                                                  |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | pinapanatili `full` ang mga generic na caption; `focused` ay gumagamit ng hangganan, hindi pinagkakatiwalaang konteksto ng pinakabagong user |
| `modalityBridgeVideoModel`          | `""`        | Manahin ang modelo ng Vision Bridge                                                                                                          |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                                         |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, o proporsyonal na `segment_aware`; Ang pagkabigo ng detector ay bumabalik sa `uniform`                             |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                                          |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                                               |

Ang mga value ng timeout ng Legacy na lumampas sa 120 segundo ay naka-clamp sa deadline ng broker; ang mga bagong setting ay nagsusulat sa itaas ng limitasyong iyon ay tinanggihan. Nangangailangan ang `GET /api/modality-bridge/video/runtime` ng pinagkakatiwalaang lokalidad na naselyohang loopback bago ang pagpapatunay o runtime probing, pagkatapos ay nangangailangan ng pagpapatunay ng pamamahala. Ibinabalik lamang nito `available`, mga sanitized FFmpeg/ffprobe na bersyon, at isang nakapirming dahilan kapag hindi available ang runtime. Ang internal extraction endpoint ay hindi isang pampublikong upload API: queue saturation returns `503` plus `Retry-After`, isang caller disconnect returns `499`, at ang fixed broker deadline returns `504`. Ang mga na-convert na tugon ay nagdaragdag ng `video->text;model=<visionModel>;parts=<videos>` sa gitnang `x-omniroute-modality-bridge` header nang hindi inaalis ang mga segment ng Vision o Audio.

### PII Masker (`piiMasker.ts`)

Tumatakbo sa **pareho** mga yugto.

- **`preCall`** kino-clone ang payload, nilalakad `system`, `messages`, `input`, at `prompt` (kabilang ang mga plain string na item), at inilalapat `processPII()` (mula sa `@/shared/utils/inputSanitizer`) sa mga string ng `content`/`text` na field. Kapag `PII_REDACTION_ENABLED=true`, ang nakitang PII ay na-redact sa papalabas na payload. Ito ay independiyente sa `INPUT_SANITIZER_MODE` (na kumokontrol lamang sa patakarang prompt-injection). Kapag naka-off ang redaction, binibilang ang pagtuklas ng mga talaan ng tawag nang hindi muling isinusulat ang nilalaman.
- **`postCall`** deep-clone ang tugon, nagpapatakbo ng `sanitizePIIResponse()` kasama ang Responses-API-shape masker (`maskResponsesOutput` — ay sumasaklaw sa `output_text` at `output[].content[].text`). Kung may nangyaring redaction, papalitan ng binagong tugon ang orihinal.

Ang guardrail ay hindi kailanman nakaharang; ito ay nag-annotate lamang (`meta.detections`, `meta.redacted`) o muling nagsusulat.

#### Per-type na seleksyon, custom na pattern at detection counter

**Dashboard Mga Setting ng → → Security → PII masking** pinipili ang _ano_ ang nakamaskara. Hindi nito binubuksan ang masking: iyon pa rin ang `PII_REDACTION_ENABLED` (kahilingan) at `PII_RESPONSE_SANITIZATION` (tugon + SSE), parehong naka-off bilang default.

- **Pagpili sa bawat uri** — ang mga built-in na id ay nakalista sa `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Ang ibig sabihin ng unset ay bawat uri (ang gawi bago umiral ang setting na ito). Ang `ssn_us` pattern ng request engine ay nagmamapa sa `ssn`. Ang mga template (Minimal, Standard, Financial, Brazilian, USA, GDPR, POPIA, Full) ay pinupunan lamang ang mga checkbox sa UI.
- **Mga identifier ng GDPR at POPIA** — labindalawang built-in na id na sumasaklaw sa EU at South African personal identifier (talahanayan sa ibaba). Ang kanilang mga regexe, validator at jurisdiction tag ay nakatira sa isang talahanayan, `src/shared/utils/piiPatterns.ts`, na parehong ginagamit ng response sanitizer (`src/lib/piiSanitizer.ts`) at request masker (`src/shared/utils/inputSanitizer.ts`). Ang isang tugma ay na-redact lamang kapag tinanggap ito ng validator nito; hindi sapat ang isang hubad na bilang ng mga numero. Ang isang operator na nag-save ng isang pinaliit na seleksyon bago umiral ang mga id na ito ay nagpapanatili ng pag-uugali na mayroon ito hanggang sa mamarkahan ang mga bagong id.
- **Mga custom na pattern** — hanggang 20 regex o wildcard pattern (`*` = hanggang 64 na hindi whitespace na character, `?` = isa). Ang mga laban ay nagiging `[CUSTOM_REDACTED]`. Ang bawat pattern ay dumadaan sa `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): hindi hihigit sa 500 character, ang mga flag ay limitado sa `g i m s u`, dapat mag-compile, dapat pumasa sa `safe-regex` (catastrophic backtracking), at hindi dapat tumugma sa isang walang laman na string o isang redaction na placeholder. Ang isang pattern na nabigo ay tinatanggihan kapag nai-save at kapag sinubukan, at ang isang naka-imbak na row na nabigo ay nilaktawan sa runtime sa halip na i-compile. Gumagana lang ang mga custom na pattern habang naka-on ang masking.
- **Mga counter ng pagtuklas** — per-type na bilang (hindi kailanman tumugma sa mga halaga), hawak sa memorya at i-reset sa pag-restart (`src/lib/pii/piiDetectionStats.ts`). Dumarami lamang sila habang naka-mask.

Ang mga setting ay nakatira sa `key_value` table (namespace `pii_settings`, `src/lib/db/piiSettings.ts`) at binabasa sa pamamagitan ng 1 s cache. API:

| Method | Path                     | Layunin                                                                       |
| ------ | ------------------------ | ----------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Estado ng mga flag, `enabledTypes`, `customPatterns`, mga detection counter   |
| `PUT`  | `/api/settings/pii`      | Palitan ang `enabledTypes` (`null` = lahat) at/o `customPatterns`             |
| `POST` | `/api/settings/pii/test` | I-dry-run ang isang pattern laban sa sample na hanggang 8 KB; walang iniimbak |

Lahat ng tatlo ay nangangailangan ng pagpapatunay ng pamamahala at pagpapatunay ng katawan gamit ang Zod (`src/shared/validation/schemas/piiSettings.ts`). Kung hindi pinagana ang pag-login (`requireLogin=false`) `GET` at bukas ang endpoint ng pagsubok, ngunit kailangan pa rin ng `PUT` ng session ng dashboard, isang `manage` -scope API key, isang `oma_` access token na may write scope o mas mataas, o ang CLI token o internal-service token na ipinadala mula sa loopback.

#### Mga identifier ng GDPR (EU) at POPIA (South Africa).

| Id                  | Identifier                  | Pag-validate                                                                              |
| ------------------- | --------------------------- | ----------------------------------------------------------------------------------------- |
| `iban`              | IBAN                        | Kilalang bansa, eksaktong haba para sa bansang iyon, ISO 13616 MOD-97-10                  |
| `eu_vat`            | EU VAT number               | Kilalang prefix ng kasaping bansa at number format nito (walang VIES lookup)              |
| `es_dni_nie`        | Spanish DNI / NIE           | Control letter (halaga mod 23); ang NIE ay `X/Y/Z` + 7 digit                              |
| `it_codice_fiscale` | Italian Codice Fiscale      | Control letter mula sa mga talahanayan ng odd/even na posisyon                            |
| `pl_pesel`          | Polish PESEL                | Weighted checksum at makatwirang saklaw ng naka-encode na buwan/araw ng kapanganakan      |
| `nl_bsn`            | Dutch BSN                   | Pagsubok na 11 (mga timbang na 9..2, -1)                                                  |
| `de_steuer_id`      | German Steuer-ID            | ISO 7064 Mod 11,10 at mga tuntunin sa digit structure (walang 0 sa simula)                |
| `se_personnummer`   | Swedish personnummer        | Luhn sa huling sampung digit at makatwirang petsa ng kapanganakan (10 o 12 digit)         |
| `za_id`             | South African ID number     | Luhn sa lahat ng 13 digit, wastong buwan/araw ng kapanganakan, citizenship digit na 0 o 1 |
| `za_phone`          | Telepono sa South Africa    | Prefix na `+27` / `27`, o pambansang anyong `0..` na isinulat na may espasyo o gitling    |
| `za_vat`            | South African VAT number    | 10 digit na nagsisimula sa `4` **at** "VAT" / "BTW" sa 48 character bago nito             |
| `za_tax_ref`        | South African tax reference | 10 digit na nagsisimula sa `0`-`3`, Luhn, **at** "tax" / "SARS" sa 48 character bago nito |

Dahil ang mga digit-only na format ay sumasalungat sa mga numero ng order, bumuo ng mga numero at timestamp, ang pinakamahina (`za_vat`, `za_tax_ref`) ay nangangailangan ng keyword cue, at ang isang walang laman na sampung digit `0..` na numero ay hindi itinuturing bilang isang South African na numero ng telepono. Ang spaced IBANs (`GB29 NWBK ...`) ay hindi tugma. Sa streaming path ang cue ay tinitingnan sa loob ng kasalukuyang tipak lamang. Nauuna ang mga id sa mga generic na pattern ng telepono, kaya pinapanatili ng validated identifier ang sarili nitong placeholder (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Ang `gdpr` at `popia` na mga template ay pipili ng EU at South African id ayon sa pagkakabanggit. Ang pag-mask mismo ay nananatiling opt-in (Hard Rule #20): wala dito ang nagbabago sa default na feature-flag.

### Prompt Injection (`promptInjection.ts`)

Nag-detect ng mga adversarial na istruktura sa content na ibinigay ng user at
ipinapatupad ang naka-configure na policy. Ang pag-uugali ay hinihimok ng mga
environment variable at constructor option:

| Setting                | Env var                                                                                               | Default | Epekto                                                                                                                                                                                                            |
| ---------------------- | ----------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pinagana               | `INPUT_SANITIZER_ENABLED`                                                                             | `true`  | Kapag `false`, nag-short-circuit ang guardrail.                                                                                                                                                                   |
| Mode                   | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`  | Injection policy: `block`, `warn`, o `log`. (Tinatanggap ang `redact` para sa back-compat ngunit **hindi** nito inaalis ang injection text; ang PII rewrite ng request ay kontrolado ng `PII_REDACTION_ENABLED`.) |
| Threshold ng pag-block | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Minimum severity na kailangan para mag-block. Observe-only ang Medium sa default.                                                                                                                                 |

**Precedence ng mode** (`getMode`): `options.mode` ng caller →
`INJECTION_GUARD_MODE` **override ng feature flag sa DB** (Dashboard →
Settings → Feature Flags) → env na `INJECTION_GUARD_MODE` → env na
`INPUT_SANITIZER_MODE` → `warn`. Kaya nananaig ang dashboard override sa mga
env var, at ang UI ng Feature Flags ang kumokontrol sa tumatakbong guard nang
live (walang restart). Fail-safe ang pagbasa sa DB: kung magka-error ito,
babalik ang guard sa env-based na pag-uugali, at kapag walang naka-set na
override, magkakapareho ang pag-uugali sa env-only resolution.

Mga source ng detection:

1. `sanitizeRequest()` mula sa `@/shared/utils/inputSanitizer` (shared na
   detector set na ginagamit din sa ibang bahagi ng pipeline).
2. Mga built-in na `DEFAULT_GUARD_PATTERNS` (kasalukuyang
   `system_override_inline` at `markdown_system_block`, parehong may `high`
   severity).
3. Opsyonal na `customPatterns` na ipinapasa sa pamamagitan ng mga constructor
   option (mga string, regex, o mga record na `{ name, pattern, severity }`).

Kapag `mode === "block"` **at** may kahit isang detection na umabot sa severity
threshold, ang `preCall` ay nagbabalik ng `{ block: true, message: "Request rejected:
suspicious content detected" }`. Sa mga mode na `warn`/`log` nagla-log ang guardrail
pero pinapayagan ang tawag. Ang shared helper na `evaluatePromptInjection()` ay
naka-export din para sa mga caller na kailangang mag-evaluate ng mga prompt nang
hindi dumadaan sa registry.

**Hangganan ng scan (v3.8.20):** sinusuri lamang ng detector ang **unang 16 KB**
ng pinagsamang teksto ng prompt — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) sa
`src/shared/utils/inputSanitizer.ts`. Parehong nag-`slice(0, MAX_INJECTION_SCAN_BYTES)`
ang `detectInjection()` at `evaluatePromptInjection()` bago patakbuhin ang
pattern loop. Ang mga injection directive ay nasa malapit sa itaas ng isang input,
kaya nililimitahan nito ang regex CPU/GC sa mga payload na may daan-daang KB nang
hindi hinihina ang detection (cf. #3932, #4041).

### Pantakip ng mga Kredensyal (`credentialMasker.ts`)

Tumatakbo sa **parehong** stage, pinakahuli sa default na chain (priority `95`).
Nire-redact nito ang mga kilalang pattern ng API-key / secret-token mula sa
papalabas na payload (nilalaman ng mensahe, mga argumento ng tool-call, mga
resulta ng tool) **at** sa tugon ng provider, upang ang kredensyal na naipaste sa
isang prompt (o ibinalik ng isang resulta ng tool) ay hindi mailabas sa upstream
provider o pabalik sa kliyente.

- **Opt-in lamang**, parehong kombensiyon sa PII redaction (katabi ng Hard Rule
  #20): naka-disable maliban kung `settings.credentialRedactionEnabled === true`
  **o** `CREDENTIAL_REDACTION_ENABLED=true`. Kapag naka-off ito, ang guardrail ay
  isang no-op — hindi ito kailanman nagba-block at hindi kailanman nagre-rewrite.
- Tinatahak ng `redactCredentials()` ang buong tree ng payload/response
  (`walkValue()`, ligtas sa prototype pollution, ligtas sa cycle sa pamamagitan ng
  `WeakSet`) at pinapalitan ang mga tugma ng placeholder na `[REDACTED:<type>]`,
  na kino-clone lamang ang mga sanga na talagang nagbago.
- Sinasaklaw ng `CREDENTIAL_PATTERNS` ang mga key ng LLM provider (OpenAI,
  OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), mga VCS/SaaS token
  (GitHub, Slack, Linear, Notion, npm, Postman, Discord), mga payment key
  (Stripe, Square), mga cloud key (AWS access key, Twilio, SendGrid, Mailgun),
  mga private key / JWT, mga connection string na nagdadala ng kredensyal
  (`mongodb://user:pass@...`, atbp.), at isang generic na pattern ng header-value
  na `Authorization`/`x-api-key`/`api-key`/`apikey`. Ang mga key na may hugis-header
  (`authorization`, `x-api-key`, `api-key`, `apikey`) ay nire-redact nang
  structural (ang value lamang, pinananatili ang scheme prefix tulad ng
  `Bearer `/`Basic `) sa halip na gamitin ang generic na text regex.
- Hindi kailanman nagba-block ang guardrail; nagre-rewrite lamang ito
  (`modifiedPayload` / `modifiedResponse`) at nag-a-annotate
  (`meta.credentialsRedacted`, `meta.count`).

Pananggalang sa regression: `tests/unit/credential-masker-guardrail.test.ts`.

## Batayang Kontrata (`base.ts`)

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
  block?: boolean; // ang true ay nag-short-circuit ng chain
  message?: string; // lumalabas kapag nagba-block
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // ibinabalik ng preCall para muling isulat ang request
  modifiedResponse?: TValue; // ibinabalik ng postCall para muling isulat ang response
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

Nagpapahiwatig ang guardrail ng "walang pagbabago" sa pamamagitan ng pagbabalik ng alinman sa `void`, `{}`, o `{ block: false }`. Ang pagbabalik ng `modifiedPayload`/`modifiedResponse` ay pumapalit sa halagang dumadaloy sa chain para sa mga guardrail sa downstream. Dinadala ng `signal?: AbortSignal` ang lifecycle ng caller papasok sa mga guardrail. Ang pag-abort ng request ang sinadyang fail-open na pagbubukod: ititigil ng mga media bridge ang trabaho at maglilinis nang hindi ibinabalik ang raw media sa isang target na alam na hindi ito sinusuportahan.

## Registry (`registry.ts`)

Ibinibigay ng singleton na `guardrailRegistry` ang:

- `register(guardrail)` — nagdaragdag (o pumapalit batay sa normalize na pangalan) ng guardrail at muling inaayos ang pagkakasunud-sunod ayon sa pataas na `priority`.
- `clear()` / `list()` — mga pantulong na administrative.
- `runPreCallHooks(payload, context)` — dinaanan nang paisa-isa ang mga aktibong guardrail, ipinapasa ang payload sa pamamagitan ng `modifiedPayload`, at humihinto sa unang `block: true`.
- `runPostCallHooks(response, context)` — parehong daloy sa panig ng response.
- `resetGuardrailsForTests({ registerDefaults })` — nililinis ang state at opsyonal na muling nirerehistro ang mga default para sa malinis na test isolation.

Parehong nagbabalik ang dalawang runner ng `{ blocked, payload|response, results, guardrail?, message? }` kung saan ang `results` ay isang array ng mga record na `GuardrailExecutionResult` na naglalaman ng mga field na `blocked`, `skipped`, `modified`, `error`, at `meta` para sa bawat guardrail, na kapaki-pakinabang para sa tracing.

### Pag-disable ng mga Guardrail Bawat Request

Pinagsasama-sama ng `resolveDisabledGuardrails({ apiKeyInfo, body, headers })` ang isang listahang walang duplicate ng mga pangalan ng guardrail na dapat laktawan para sa kasalukuyang request. May limang channel, na binabasa sa ganitong pagkakasunud-sunod at pinagsasama sa isang listahan (ang unang paglitaw ang mananalo kapag nag-aalis ng mga duplicate):

1. `apiKeyInfo.disabledGuardrails`
2. `disabledGuardrails` ng request body (top-level)
3. `metadata.disabledGuardrails` ng request body (kapag ang `metadata` ay isang object lamang)
4. Header na `x-omniroute-disabled-guardrails`
5. Legacy na header na `x-disabled-guardrails`

Pinagsasama ang lahat ng limang channel, kasama ang dalawang header: ang pagpapadala ng parehong `x-omniroute-disabled-guardrails` at `x-disabled-guardrails` ay naglalaktawan ng pinagsamang union ng kanilang mga listahan, at ang isang walang-lamang modernong header ay hindi na nagtatago sa legacy na isa
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), naayos sa
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Ang mga halaga ay maaaring mga array ng mga string o isang string na pinaghihiwalay ng kuwit; ang mga pangalan ay tini-trim at nina-normalize sa lowercase kebab-case (`pii_masker` → `pii-masker`), at inaalis ang mga walang-lamang entry. Ang resulta ay ipinapasa sa pamamagitan ng `context.disabledGuardrails` papunta sa registry, na naglalaktawan ng mga tumutugmang guardrail (`skipped: true` sa `results`).

Ang disable list ay nakakaapekto lamang sa **registry**. Ang prompt-injection na `block` mode ay isang sapilitang hangganan: tinatawag ng injection-guard middleware
(`src/middleware/promptInjectionGuard.ts`) ang `evaluatePromptInjection()` nang walang anumang caller-controlled na disable list (ang dead na tawag sa `resolveDisabledGuardrails({ body })` na dating ginagawa nito ay inalis sa
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), kaya ang isang request na nagdi-disable ng `prompt-injection` ay tinatanggi pa rin sa `block` mode. Sinadya ito. Ang mga disable channel ay kontrolado ng caller (request body, metadata, mga header), at hindi dapat payagan ang isang caller na patayin ang isang security control na itinakda ng operator
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Ang header union mula sa [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412) ay nagbabago lamang kung aling mga guardrail ng registry ang nilalaktawan; hindi nito hinahayaan ang isang client na i-bypass ang middleware. Ang mga sapilitang per-key at per-group na patakaran ng guardrail ay sinusubaybayan sa v4 RFC [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Tingnan ang [Saklaw at mga limitasyon](#coverage-and-limits).

## Pagkakasunod-sunod ng Pagpapatakbo

Para sa bawat request na dumadaloy sa `src/sse/handlers/chat.ts` at
`open-sse/handlers/chatCore.ts` (ang mga chat-family na route na nakalista sa
[Saklaw at mga limitasyon](#coverage-and-limits)):

1. Bumubuo ang `resolveDisabledGuardrails(...)` ng skip list mula sa API key, body,
   at mga header.
2. Pinapatakbo ng `guardrailRegistry.runPreCallHooks(body, ctx)` ang mga guardrail sa pataas na
   pagkakasunod-sunod ng priyoridad:
   - Ang mga naka-disable na guardrail ay itinatala bilang `skipped`.
   - Maaaring baguhin ng `preCall` ng bawat guardrail ang payload sa pamamagitan ng `modifiedPayload`.
   - Ang unang `block: true` ay nagpa-short-circuit sa chain at ang handler ay nagbabalik
     ng response ng pagtanggi ng guardrail.
3. Ang (posibleng nabagong) payload ay dumadaloy sa combo routing at upstream
   dispatch.
4. **Non-streaming lamang:** pagkatapos mabuo ang response,
   pinapatakbo ng `guardrailRegistry.runPostCallHooks(...)` ang parehong chain sa
   response. Ang `block: true` dito ay nagtatapon ng upstream response at nagbabalik ng HTTP 400. Ang mga streamed response ay lubos na nilalaktawan ang hakbang na ito.

Ang mga guardrail na nagta-throw ay itinatala na may `error: <message>` at naka-log sa pamamagitan ng
`logger.warn`, ngunit nagpapatuloy ang chain — fail-open ayon sa disenyo.

## Saklaw at mga limitasyon

Ang guardrail registry ay nakakabit lamang sa chat pipeline. Ang mga limitasyong ito ay
naka-pin ng `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` at
`tests/unit/guardrail-pipeline-characterization.test.ts`; sadyang i-update ang mga test na iyon
kapag nagbago ang behavior.

### Saan tumatakbo ang mga hook

| Hook / control                      | Tumatakbo sa                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `runPreCallHooks`                   | Mga request na hinahandle ng `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (at `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*`, at ang Telegram chat proxy. Gayundin ang dashboard test endpoint na `/api/guardrails/test`. Ang pre-call block ay nagbabalik ng HTTP 400. |
| `runPostCallHooks`                  | Mga **non-streaming** na chat response lamang (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Ang mga streamed response ay hindi kailanman umaabot dito.                                                                                                                                                                                                                                                                                       |
| Streaming PII                       | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), na naka-pipe sa `streamingPipeline.ts` kapag naka-on ang `PII_RESPONSE_SANITIZATION`. Hindi ito isang guardrail, kaya hindi ito apektado ng mga disable channel.                                                                                                                                                                                                                         |
| Injection-guard middleware (legacy) | Bawat `/v1` route na may dalang prompt, kasama ang chat-family (tingnan ang [saklaw ng route](#injection-guard-route-coverage--red-team-phase-8--block-d)). Prompt injection lamang.                                                                                                                                                                                                                                                                   |

### Ano ang hindi saklaw

- **Mga media, embeddings at data route** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) ay hindi kailanman umaabot sa
  registry. Walang PII masking, credential masking o modality bridge na tumatakbo
  doon. Ang tanging pagsusuri nila ay ang legacy injection-guard middleware.
- **Mga streamed response** ay walang post-call guardrails: walang `pii-masker` o
  `credential-masker` post-call, at walang post-call block. Tanging ang streaming PII
  transform ang umaangkop (kapag naka-on ang `PII_RESPONSE_SANITIZATION`). Ang
  credential na i-echo pabalik sa isang streamed response ay hindi nire-redact.
- **Mga disable channel vs. ang middleware (ayon sa disenyo):** sinusuri ng
  middleware ang prompt injection gamit ang sarili nitong tawag sa
  `evaluatePromptInjection()`, nang hindi nagpapasa ng anumang caller-controlled na
  disable list. Ang `block` mode ay isang mandatory na hangganan na hindi
  malalampasan ng mga caller-controlled na disable, kasama sa mga chat-family route
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Ang pag-disable
  sa `prompt-injection` ay nilalaktawan lamang ang registry guardrail.

### Ano ang nakakakita ng response bago ang post-call

Sa non-streaming path, ang pagkakasunod-sunod ay: pag-extract ng memory → pagpapatakbo
ng built-in na tool → post-call guardrails → exit sa post-call block → pag-save sa
semantic cache.

- Nakikita ng **pag-extract ng memory** at **pagpapatakbo ng tool** ang
  response bago ito mabago o maharang ng mga post-call guardrail. Mula noong
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), ipinapasa ng
  pag-extract ng memory ang na-extract na teksto sa `sanitizePII` kapag naka-on
  ang `PII_RESPONSE_SANITIZATION` (parehong streaming at non-streaming), ngunit
  ang isang response na kalaunang hinarang ng post-call ay naibigay pa rin sa
  memory at mga tool.
- **Ang semantic cache** ay nag-iimbak ng response pagkatapos ng post-call, kaya
  iniimbak nito ang nabagong response, at ang hinarang na response ay hindi
  kailanman naka-cache. Ang mga cache entry ay naka-key kada API key.

## Konpigurasyon

Mga environment variable na binabasa ng mga built-in na guardrail:

| Variable                              | Ginagamit ng              | Epekto                                                                                                                      |
| ------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Itakda sa `false` upang ganap na i-disable ang detection.                                                                   |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Patakaran ng injection: `warn`, `block`, o `log`. Ang legacy na halagang `redact` ay hindi nagre-rewrite ng injection text. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Mode para sa injection guard; isa ring DB feature flag na **nag-o-override** sa mga env var (DB > ENV).                     |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Pinakamababang severity na tinatanggihan ng `MODE=block`: `high` (default), `medium`, o `low`.                              |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Legacy alias para sa `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                     |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Kapag `true`, ang PII ng request ay nire-redact (independyente sa injection mode).                                          |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Kumokontrol sa behavior ng masker sa panig ng response.                                                                     |

Ang mga guardrail ng Modality Bridge ay nagbabasa ng runtime config mula sa
DB-backed na settings store (`getSettings()`), hindi mula sa mga env var. Ang mga
pangunahing key ng Vision ay
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, at
`modalityBridgeCacheMaxEntries`. Ang mga legacy na
`visionBridge*` key ay tinatanggap lamang bilang ang dokumentadong one-cycle
na read fallback; ang mga dashboard write ay gumagamit ng mga pangunahing key.
Ang mga default at ang fallback resolver ay matatagpuan sa
`src/shared/constants/modalityBridgeDefaults.ts`, na may mga legacy na
constant na pinanatili sa `src/shared/constants/visionBridgeDefaults.ts`.

Ang Audio ay gumagamit ng `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, at `modalityBridgeAudioMaxClips`, kasama ang mga
shared na `modalityBridgeCache*` na setting. Ang Audio ay walang legacy-key
na fallback dahil ang mga key na ito ay ipinakilala kasabay ng Modality Bridge
schema.

Ang Video ay gumagamit ng `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, at
`modalityBridgeVideoTimeout`, kasama ang mga shared na `modalityBridgeCache*`
na setting. Ito ay naka-disable bilang default dahil ang FFmpeg/ffprobe ay mga
opsyonal na operational na dependency at ang frame captioning ay nagdaragdag ng
latency at gastos sa modelo.

## Pasadyang mga Guardrail

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

Mga hakbang:

1. Gumawa ng `src/lib/guardrails/myGuardrail.ts` na nag-eextend ng `BaseGuardrail`.
2. I-implement ang `preCall` at/o `postCall`.
3. Mag-register sa import time (push mula sa `registerDefaultGuardrails`) o
   tawagan ang `guardrailRegistry.register(...)` sa runtime — pinalitan ng
   registry ang anumang nakaraang guardrail na may parehong normalized na pangalan.
4. Magdagdag ng mga test sa ilalim ng `tests/unit/` (mga kasalukuyang halimbawa:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Pagsusuri

Gamitin ang `resetGuardrailsForTests()` sa pagitan ng mga test upang magsimula mula sa isang kilalang estado.
Ipasa ang `{ registerDefaults: false }` upang magsimula sa isang walang laman na registry at
i-register lamang ang mga guardrail na sinususuri. Tinatanggap ng Vision Bridge ang dependency
injection (`deps.getSettings`, `deps.callVisionModel`); ibinubunyag ng Audio Bridge ang
katumbas na mga seam para sa settings, capabilities, pagpili ng STT model, mga pagsusuri ng
kredensyal, at transcription. Kaya't masisubukan ng mga test ang parehong daloy nang walang DB
o network access.

## Tingnan Din

- `src/lib/guardrails/` — implementasyon
- `src/shared/utils/inputSanitizer.ts` — pinagsamang detector na nagpapagana sa
  prompt-injection at PII masking
- `src/shared/constants/visionBridgeDefaults.ts` — mga default ng Vision Bridge at
  listahan ng mga forced-bridge na modelo
- `src/shared/constants/modalityBridgeDefaults.ts` — pinagsamang mga runtime default ng Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — orthogonal na layer (circuit breaker, mga cooldown)
- `docs/reference/ENVIRONMENT.md` — buong sanggunian ng env var

## Saklaw ng ruta ng injection-guard at red-team (Phase 8 · Block D)

Sinasaklaw ng injection-guard (`createInjectionGuard` / `withInjectionGuard`) ang lahat ng ruta
na tumatanggap ng mga user prompt. Iginalang nito ang `INJECTION_GUARD_MODE` (default `warn` = log lamang;
`block` = nagbabalik ng HTTP 400 `SECURITY_001`).

| Uri              | Mga Ruta                                                                                                                                             | Default na mode |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| Teksto (umiiral) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn            |
| Generative       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn            |
| Data             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn            |

Ang pagkuha ng teksto (`extractMessageContents`) ay sumasaklaw sa `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (nightly, `nightly-llm-security.yml`):** vini-validate ng promptfoo na bawat ruta ay nagba-block
ng OWASP-LLM corpus sa `INJECTION_GUARD_MODE=block`; nagpapatakbo ang garak ng mga probe (lumalaktaw kapag walang secret).
Kasama ang `moderations` para sa pagkakapare-pareho. Ang block mode ay isang mandatory na hangganan: hindi pinapansin ng
`evaluatePromptInjection()` ang per-request na disable list na ipinapasa ng middleware dito, kaya ang `disabledGuardrails` ay
**hindi** nag-eexempt sa isang ruta mula dito ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Ang nightly workflow (`.github/workflows/nightly-llm-security.yml`, cron + manual
dispatch) ay may dalawang job:

- **`promptfoo-guard` (blocking)** — nagpapatakbo ng `promptfoo eval -c promptfooconfig.yaml`
  na may `INJECTION_GUARD_MODE=block`. Ang bawat adversarial case (hal. "balewalain ang lahat ng
  nakaraang tagubilin…", mga DAN-style na jailbreak) ay nag-aassert na ang tugon ay nagdadala ng
  `error.code === "SECURITY_001"`, ibig sabihin, talagang tinanggihan ng guard ang request.
- **`garak` (advisory)** — nagpapatakbo ng garak `--probes promptinject,dan,leakreplay`
  laban sa isang lokal na instance ng OmniRoute (`http://localhost:20128/v1`). Nakasalalay sa isang
  provider secret (`PROMPTFOO_PROVIDER_KEY`); lumalaktaw nang maayos at may suffix na
  `|| true`, kaya nag-uulat ito nang hindi pinapabagsak ang CI.

Ang saklaw ng guard helper (`createInjectionGuard` / `withInjectionGuard`)
ay sumasaklaw sa bawat `/v1` na ruta na may prompt; ang teksto ng prompt ay kinukuha mula sa
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` ng
`extractMessageContents()` sa `src/shared/utils/inputSanitizer.ts`.
