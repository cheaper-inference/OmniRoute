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

Hinaharang nito ang mga top-level na video part sa Chat Completions `messages` at
Responses API `input` bago tawagan ang isang target na walang kilalang native na
suporta sa video. Ang mga sinusuportahang shape ay `input_video`, `video_url`,
`video_source`, mga HTTPS URL, at mga `data:video/*;base64,...` data URI. Ang mga
simpleng filename sa text ay hindi itinuturing na video.

Ang `VideoBridgeGuardrail.preCall` (`videoBridge.ts`) ang may-ari ng request
traversal, pagsusuri ng kakayahan/patakaran, aggregation bawat request, at ang
response payload. Ang trabaho bawat video — acquisition, ang whole-result na cache,
paglalarawan ng isang frame sequence (na pinagsasanib ang anumang transcript ng audio
na dineklara ng caller), at mga metrics/abort/cleanup bawat attempt — ay nakatago sa
likod ng `processVideoPart` sa `videoBridgePipeline.ts`, na tinatawag minsan bawat
video part sa loob ng loop ng `preCall`. Ang module na iyon ay nagdedefine rin ng mga
explicit na port boundary na `VideoMediaBrokerPort` (pagkuha ng mga byte at pag-extract
ng mga sampled frame), `VideoAudioTranscriptionPort` (pagsasanib ng transcript ng
audio na dineklara ng caller sa mga sampled caption), at `VideoDrilldownPort` (ang
persistence boundary ng frame drill-down; hindi pa nakakabit sa `processVideoPart` —
tanging ang hiwalay na `/api/modality-bridge/video/drilldown` route ang nagsusulat ng
mga drill-down entry sa kasalukuyan).

Ang pampublikong `/v1` request path ay hindi kailanman nag-i-import o nag-i-invoke ng
subprocess. Ang mga remote na video ay dinidownload sa ilalim ng 50 MiB na hangganan;
ang mga inline base64 na video ay may conservative na 36 MiB decoded na cap bawat
video upang ang model/messages/framing envelope ay manatiling nasa loob ng
pampublikong JSON request admission limit na 50 MiB. Ang inline na haba at mga
pagtataya ng decoded-size ay sinusuri bago ang allocation. Ang HTTPS ay kinakailangan
sa inisyal na remote URL at bawat redirect, gamit ang umiiral na public-only na
outbound guard na may DNS pinning. Ang mga byte ay tumatawid pagkatapos sa eksaktong
panloob na `POST /api/modality-bridge/video/extract` broker boundary. Ang route na
iyon ay parehong `LOCAL_ONLY` at `SPAWN_CAPABLE`, tumatanggap lamang ng per-process
authenticated, trusted-loopback na request, at hindi kailanman tumatanggap ng URL,
filesystem path, executable, o argument list. Ang API body-size pipeline at ang
incremental body reader ng handler ay hiwalay na nagpapatupad ng 50 MiB na broker
input cap. Ang bounded queue nito ay nagpapatakbo ng isang extraction sa isang
pagkakataon, nagpapahintulot ng apat na pending na trabaho, at naglalagay ng cap sa
pending input na 100 MiB.

Sa loob ng broker, binabasa ng `ffprobe` ang isang pribadong lokal na file; ang nakapirming allowlist ng format ay hindi kasama ang mga format ng playlist at manifest. Para sa mga pinapayagang container ng MOV-family, ang mga panlabas na MOV data reference ay nananatiling naka-disable bilang default, at hindi nag-o-opt in ang nakapirming command sa mga ito. Ang parehong `ffprobe` at `ffmpeg` ay gumagamit ng `file`-only na protocol whitelist, isang thread, nakapirming mga argument array, walang shell, at mga executable na nire-resolve mula sa `PATH`. Ang mga attached-picture cover stream ay hindi mga playable na kandidato. Ang lahat ng playable na stream ay dapat sumunod sa mga limitasyon, at mas pinipili ang isang tahasang default na stream bago ang deterministic na lowest-index fallback. Ang mga video ay limitado sa 600 segundo, 8,192 pixel bawat dimensyon, at 33,554,432 na source pixel. Ang FFmpeg ay kumukuha ng 1–16 midpoint JPEG frame, binabawasan ang mahabang gilid hanggang sa pinakamaraming 1,024 pixel nang hindi pinalalaki ang mas maliliit na input, at hindi kailanman tumatanggap ng URL. Ang sampling ay `uniform` bilang default. Ang opsyonal na `scene_aware` at eksperimental na `segment_aware` na mga patakaran ay nagsasagawa ng isang karagdagang nakapirming FFmpeg pass sa na-validate nang lokal na stream, pumipili ng mga bounded `showinfo` scene timestamp, at deterministic na bumabalik sa parehong uniform midpoint kapag may pagkabigo ng detector, timeout, malformed na output, o walang laman na set ng kandidato. Ang segment-aware na mode ay naglalaan ng mga midpoint sample nang proporsyonal sa mga na-validate na scene interval; ang segment-aware na ebidensya at fallback na pag-uugali ay detalyado sa ibaba. Ang mahigpit na 16-frame na cap ay inilalapat pagkatapos ng seleksyon sa bawat patakaran. Kapag ang isang scene-aware na request ay may isang-frame na budget lamang, ginagamit nito ang uniform midpoint ng aktibong full-video o focus window at iniulat ang `policyEffective: uniform`: ang isang napiling scene frame ay hindi kayang panatilihin ang parehong temporal na dulo. Maaaring opsyonal na magbigay ang caller ng isang may hangganang focus window (`start`/`end` segundo); ang mga hangganan ay kinaklamp sa tagal ng media, tinatanggihan ang mga baliktad o hindi may hangganang window, at lahat ng sampling na patakaran ay isinasagawa lamang sa loob ng na-normalize na interval. Ang resultang window ay kasama sa sampling metadata at sa untrusted na description prefix upang makapagpakilala ang mga downstream na modelo ng focused na excerpt mula sa buong timeline.

Ang semantic caption focus ay isang hiwalay at tahasang setting. Ang default na `full` na analysis mode ay pinapanatili ang umiiral na frame prompt at hindi kailanman nagpapasa ng request text sa caption na modelo. Sa `focused` na mode, binabasa lamang ng bridge ang pinakabagong hindi walang laman na `text`/`input_text` na gawa ng user mula sa parehong Chat o Responses na container, nire-normalize ito sa NFC, pinagsasama ang mga control character at whitespace, at nililimitahan ito sa 500 Unicode code point. Ang walang laman na resulta ay bumabalik sa eksaktong `full` na prompt. Ang isang magagamit na hint ay nire-serialize bilang JSON sa isang nakatalagang untrusted-user-context na block at maaari lamang magbigay-priyoridad sa mga observable na detalye; hindi nito maaaring i-override ang hiwalay na babala laban sa pagsunod sa mga tagubiling nakikita o naririnig sa media. Ang textual focus ay hindi kailanman naghinuha ng `start`/`end` o nagbabago ng temporal sampler.

#### FU-07 structural na ebidensya ng segment

Ang `segment_aware` ay gumagamit ng isang bounded na pre-analysis pass sa na-validate nang lokal na video stream. Ang nakapirming filter chain ay unang nag-scale sa pinakamaraming 320 pixel ang lapad, tumutukoy ng mga pagbabago ng scene at mga frozen na interval, pagkatapos ay kumukuha ng sample sa 1 frame bawat segundo para sa blur, average na luma, at spatial/temporal na impormasyon. Ang pass ay limitado sa 600 structural na sample, isang FFmpeg/filter thread, parehong `file`-only na protocol at mga container allowlist, 1 MiB na hangganan ng process-output, at pinakamaraming 30 segundo sa loob ng shared abort/deadline ng broker. Hindi ito kailanman tumatanggap ng command, filter, path, o URL mula sa request.

Ang mga structural na halaga ay deterministic na ebidensya ng sampling, hindi semantic na pag-unawa sa video. Hindi nito hinuhulaan ang mga paksa, aksyon, caption, pananalita, o intensyon ng user. Ang mga hangganan ng scene at freeze ay bumubuo ng mga segment; ang freeze coverage, blur, exposure, spatial na detalye, at temporal na pagbabago ay nakakaapekto lamang sa kung paano inilalaan ang umiiral na 1–16 frame na budget. Ang isang ganap na frozen na segment ay nililimitahan sa isang frame, habang ang mga hindi frozen na segment ay nakikipagkumpetensya para sa natitirang budget. Kapag mas marami ang mga hangganan kaysa sa mga frame, pinapanatili ang uniform na timeline coverage upang hindi maitago ng mabilis na maagang mga cut ang isang mahabang trailing segment. Ang mga hangganan ng scene na nasa loob ng 1-segundong analysis resolution ng isang freeze boundary ay pinagsasama.

Ang mga nawawalang filter, malformed o walang laman na ebidensya, error ng detector, o ang bounded na pre-analysis timeout ay nag-fail open sa eksaktong uniform midpoint na patakaran. Ang caller abort o broker deadline ay hindi nag-fail open: tinatapos nito ang in-flight na subprocess, pinipigilan ang susunod na frame extraction, at ang pribadong temporary tree ay tinatanggal sa `finally`.

Ang `scripts/perf/video-bridge-fu07-eval.ts` ay bumubuo ng mga deterministic na tunay na FFmpeg fixture para sa post-dedup caption-call na pagtitipid, dense-motion na alokasyon ng budget, blur/exposure/SI-TI na ebidensya, mabilis na mga cut na may mahabang buntot, at gradual-fade na mga false positive. Nire-record nito ang pre-analysis na wall time at, kung saan available ang `/usr/bin/time`, ang child CPU at peak RSS. Ang mga quality check nito ay mga structural oracle lamang. Ang tunay na kalidad ng caption-model ay nananatiling `HOLD` dahil walang awtorisadong endpoint o frozen na judge ang harness na ito. Ang salaping pagtitipid ay nananatili ring `HOLD` maliban kung ang `--caption-cost-per-call-usd` ay nagbibigay ng tahasang positibong per-call na tantiya; ang script ay hindi kailanman nag-iimbento ng alinmang resulta.

Ang bawat frame ay limitado sa 4 MiB, ang lahat ng raw na frame nang sama-sama ay 23 MiB, at ang serialized na tugon ng broker ay 32 MiB. Ang isang pribadong pansamantalang direktoryo ay inaalis sa `finally`. Ang OmniRoute ay hindi nagba-bundle ng FFmpeg at hindi tumatanggap ng custom na executable path. Bago ang captioning, naglalapat ang bridge ng konserbatibong visual na deduplication pass: ang bawat JPEG ay binabawasan sa isang 16×16 grayscale buffer at inihahambing lamang sa huling frame na pinanatili. Para sa hinihinging caption budget na higit sa isang frame, ang extraction ay nagbibigay ng isang may hangganang candidate pool na hanggang dalawang beses ng budget na iyon at hindi kailanman hihigit sa 16 na frame. Ang hinihinging cap ay inilalapat lamang pagkatapos ng deduplication, na ang una at huling napiling mga kandidato ay pinapanatili sa huling thinning kapag ang budget ay hindi bababa sa dalawa. Ang may-bersyong patakarang `grayscale-16x16-mean-cells-v2` ay gumagamit ng mas malaki sa mean luma delta at ng ratio ng mga thumbnail cell na ang normalized delta ay hindi bababa sa 0.05. Ang duplicate threshold ay ang pare-parehong 0.04, na pinili para sa predictability sa halip na ilantad bilang isang runtime setting. Ang pangalawahing high-contrast signal na ito ay nagpapanatili ng maliliit na galaw at mga pagbabago sa nakikitang teksto na maaaring itago ng mean-only na paghahambing. Ang mga error ng comparator o decoder ay nag-fail open at pinapanatili ang coverage. Hinihiwalay ng output metadata ang mga na-extract na kandidato, ang mga matagumpay na nagamit na frame, at ang mga visual duplicate na itinapon.

Ang isang tahasang minarkahang video part ay maaaring humiling ng timestamped na contact sheet. Bumubuo ang bridge ng hindi hihigit sa 4-kolum, 16-frame na JPEG grid. Ang bawat 512-pixel na cell ay nagba-burn ng timestamp ng pinagmulan nito sa isang high-contrast na banda sa ibaba, habang ang mga parehong timestamp ay nananatili sa textual metadata para sa downstream na pag-uugnay at audit. Ang kumpletong JPEG ay nananatiling may cap na 32 MiB. Kung hindi ma-decode o mabuod ng `sharp` ang grid, ang bridge ay nagfa-fallback sa mga indibidwal na JPEG frame; ang client abort ay kumakalat pa rin sa buong sheet operation.

Ang promotion evidence ay sadyang hiwalay mula sa synthetic na composition microbenchmark. Ang `scripts/perf/video-bridge-contact-sheet-eval.ts` ay nagtatakda ng isang schema-versioned na A/B harness para sa mga tunay na OpenAI-compatible na vision model. Sinusukat nito ang mga token na iniulat ng provider, end-to-end na wall latency (kabilang ang sheet composition), bilang ng mga model call, at manifest-defined na fact retention. Ang mga raw na tugon ng model ay hindi isinusulat sa ulat; tanging mga SHA-256 digest at tumugmang mga fact ID ang pinanatili. Ang harness ay hindi gumagawa ng network o bayad na model call maliban kung ipasa ang `--execute-real` at naka-configure ang `--model`, `OMNIROUTE_BASE_URL`, at `OMNIROUTE_API_KEY`. Kung walang tahasang tunay na pagpapatakbo, ang machine-readable na verdict nito ay nananatiling `HOLD`; ang mga synthetic na sukat ng payload/call-count lamang ay hindi promotion evidence.

Ang mga caller ay maaaring mag-attach ng opsyonal na `transcript.cues` array sa isang sinusuportahang video part kapag mayroon na silang nakahanay na teksto. Ang bawat cue ay dapat magdala ng `text`, isang may hangganang `start`/`end` interval sa loob ng na-probe na tagal, at isang whitelisted na `source` (`client`, `embedded`, o `audio-bridge`); ang `confidence` ay nagde-default sa `1` at dapat manatili sa pagitan ng `0` at `1`. Ang mga eksaktong duplicate na cue ay pini-collapse. Ang OmniRoute ay hindi kailanman nagsisimula ng transcription mula sa metadata na ito: ang mga na-validate na cue ay kinokopya sa inilarawang resulta kasama ang source, confidence, at interval, at ire-re-render bilang mga untrusted na obserbasyon kasabay ng mga caption ng frame. Ang hindi wasto, lampas-sa-saklaw, o walang-provenance na teksto ay tinatanggihan sa halip na ihalo sa caption stream. Parehong ini-normalize ng dalawang request-body transcript channel ang ibinigay na provenance sa `client`, kabilang ang mga self-asserted na `embedded` o `audio-bridge` na label. Tanging isang server-owned na adapter ang makapagtatalaga ng mga trusted na label na iyon sa pamamagitan ng code-only na `trustedSource` argument; ang isang request JSON field ay hindi maaaring umabot sa argument na iyon. Ang teksto ng transcript ay nananatiling untrusted na nilalaman na nagmula sa media, anuman ang provenance nito, at hindi kailanman dapat magtakda ng awtorisasyon.

Ang isang advanced na caller ay maaaring magbigay ng `audioTranscript` track para sa parehong video; ito ay itinuturing na tekstong ibinigay ng kliyente, hindi patunay ng transcription ng server. Ang fusion seam ay nagpapatakbo ng mga visual at audio na obserbasyon sa ilalim ng isang deadline at abort signal, inaayos ang mga ito sa isang karaniwang timeline, pini-collapse ang mga eksaktong duplicate, at nag-uulat ng partial na resulta kapag isang panig lamang ang nagtagumpay. Ang isang hindi wastong `audioTranscript` ay nag-de-degrade sa partial na resultang iyon — ang visual na paglalarawan ay pinanatili at ang audio branch ay nagtatala ng isang sanitized na failure code — sa halip na i-fail ang buong video. Ang per-branch na availability, ang partial flag, at ang mga sanitized na failure code ay pinapanatili sa inilarawang resulta, sa guardrail metadata (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), sa result-cache metadata, at sa mga bridge fusion counter. Ang default na Video Bridge path ay hindi nag-i-invoke ng speech-to-text o nagda-download ng pangalawang kopya ng media; kung wala ang tahasang track na iyon, ito ay nananatiling video-only.

**Pagpapanatili ng transcript (#12150 P1).** Awtomatikong nalalapat ito tuwing ang
Video Bridge (na opt-in din) ay nagre-render ng isang transcript cue — walang
hiwalay na flag ng pagpapanatili. Kapag ang isang request ay nag-render ng anumang
transcript cue (isang `transcript` na idineklara ng caller o isang pinagsamang
`audioTranscript`), minamarkahan ito ng guardrail bilang `videoBridgeObserved` at
gumagawa ng isang na-redact na anino ng paglalarawan ng video — isang eksaktong
katulad na rendering kung saan ang free-text na katawan ng bawat cue ay
pinapalitan ng `[redacted-video-transcript]`, na binuo sa pamamagitan ng
pagpapalit ng structured na cue field bago binubuo ang string (hindi kailanman
sa pamamagitan ng pag-parse ng na-flatten na teksto, kaya walang nilalaman ng cue —
mapa-adversarial man o ordinaryo, kabilang ang mga katawang naglalaman ng `]`
tulad ng `[inaudible]`/`[music]` — ang makaliligtas). Ang na-persist na katawan ng
request sa call-log ay nagpapalit ng bawat text part na nagmula sa video sa
na-redact na aninong iyon, na itinugma batay sa pagkakapantay ng nilalaman; ang
anchor na `fullText` ay muling binabasa mula sa natapos na payload ng pre-call
guardrail, kaya ang pagtugma ay nagtatagumpay pa rin matapos i-rewrite nang
in-place ng mga sumunod na chain guardrail (ang mga PII at credential masker,
mga priyoridad 10/95) ang teksto ng paglalarawan at matapos i-reshape ng
system-prompt/handoff/memory injection ang array ng mga mensahe. Ang katawang
ipinapadala paitaas sa modelo ay hindi nagbabago. Ang isang observed na request
ay hindi rin naglalagay ng anumang durable na Memory (parehong nilalaktawan ang
extraction na nagmula sa request at sa response), kaya ang sariling tugon ng
modelo ay hindi makaka-echo ng teksto ng transcript papasok sa Memory.

**Mga raw na field ng video (#12430).** Kapag naka-enable ang bridge at ang native
na suporta sa video ay hindi alam o wala, ang mga `transcript`/`audioTranscript`
field na may laman ay nag-a-activate din ng `videoBridgeObserved`, kahit matapos
ang kabiguan sa paglalarawan o isang limitasyong `maxVideos`. Ang `null` at mga
walang-laman na string ay binibilang; ang mga absent na field at metadata na hindi
video ay hindi. Ang mga nire-retain na kopya ay nagre-redact ng mga field na ito
o inaalis ang request, at nilalaktawan ang mga cache/Memory.

Sa mga fallback path na iyon, ang mga valid na cue ng caller ay nagiging mga
suportadong `text`/`input_text` part sa halip na mga nonstandard na field ng
provider. Ang parehong mga track na ibinigay ng request ay nananatiling mga hindi
pinagkakatiwalaang obserbasyong `client`, na may tahasang babala na ang video ay
hindi inilarawan at ang mga timestamp ay hindi na-verify laban sa media. Ang
umiiral na kabuuang badyet na 256-cue/64-KiB at ang mga badyet na bawat cue ay
nalalapat sa dalawang track nang magkasama; ang mga timestamp ay dapat kasya sa
600-segundong kisame ng broker at sa anumang ibinigay na focus window. Ang mga
invalid na track ay itinatapon, hindi ipinapasa bilang arbitraryong teksto; ang
isang valid na kapatid na track ay maaari pa ring gamitin maliban kung lumampas
ang kanilang pinagsamang badyet. Ang mga null/walang-laman na field ay hindi
nagdadagdag ng teksto. Walang media fetch o transcription na idinaragdag ng
fallback na ito. Ang mga transcript extension field ay inaalis mula sa fallback
na carrier ng video at sa mga object nitong `video_url`/`source`. Ang OpenAI wire
allowlist ay nananatiling mahigpit; ang mga unknown-native na carrier ng video ay
nananatiling available at ang mga kilalang text-only na target ay nagpapanatili
ng mga ligtas na marker. Ang mga structured na anino ng redaction ay
nagpoprotekta sa idinagdag na teksto ng transcript, habang ang orihinal na
request na pagmamay-ari ng caller ay nananatiling hindi nagbabago. Ang mga target
na may native na suporta at mga naka-disable na bridge ay nagpapanatili ng
kanilang umiiral na bypass na pag-uugali.

Ang mga karagdagang nire-retain na kopya ay gumagamit ng parehong signal ng
observed na request. Ang raw na snapshot ng client-request bago ang guardrail,
ang in-memory na pending na request, at ang maagang log ng tinanggihang request
ay estruktural na nagpapalit ng mga transcript field sa mga video part; ang mga
string prompt na binuo ng mga pipeline stage at ng context handoff ay nire-redact
sa sink ng na-persist na katawan ng request. Ang na-persist na marker na
`video_content_removed` ay nagpapamahalagang ang continuation ng
`previous_response_id` ay mabibigo nang sarado sa halip na muling buuin ang
tekstong sinadyang itinapon. Kung ang isang observed na request ay mawalan ng
per-part na anino ng redaction nito bago ang logging, o kahit isa lamang sa ilang
anino ng video ang hindi tumugma matapos ang mga sumunod na pagbabago sa request,
ang nire-retain na katawan ng request ay lubos na inaalis sa halip na mag-retain
ng bahagyang na-redact na transcript.

Para sa isang observed na request, maaaring banggitin ng tugon ng modelo ang
anumang bahagi ng transcript nang walang structured na hangganan ng cue. Ang
na-persist nitong `responseBody` sa call-log ay samakatuwid pinapalitan ng isang
marker ng pag-alis; ang detalyadong pipeline artifact (na maaaring maglaman ng
mga katawan ng upstream/kliyente at mga stream chunk) ay hindi nire-retain. Ang
mga semantic, idempotency, at reasoning-replay na cache ay lumalaktaw sa mga
pagbasa at pagsulat para sa request na iyon. Ang request sa provider at ang tugon
na nakikita ng kliyente ay nananatiling hindi nagbabago. Ang mga maagang
keepalive byte ay tinatanggal mula sa pansamantalang buffer kapag ang detalyadong
artifact ay inaalis. Ang babala ng Kiro tungkol sa malformed na EventStream ay
nag-uulat lamang ng bilang ng byte ng payload, hindi kailanman ang nilalaman nito
o ang raw na error ng JSON parser. Hindi nito inaangkin na ang bawat hindi
kaugnay na provider/plugin diagnostic ay na-audit; ang mas malawak na pagwawalis
ng retained sink ay sinusubaybayan sa #11658.

Ang panloob na lifecycle ng `/api/modality-bridge/video/drilldown` ay isang
hiwalay na substrate ng cache na may loopback/token authentication. Ang bawat
operasyon ay nangangailangan din ng isang canonical na opaque na principal ID.
Bago i-enable ang isang production caller, dapat nitong hanguin ang ID na iyon
mula sa authenticated na tenant at hindi ito dapat kailanman mag-forward ng
halagang pinili ng kliyente. Ang mga cache key ay nagbubuklod sa principal na
iyon sa mga canonical na session at video-reference ID, nag-iimbak lamang ng mga
key na hinango sa SHA-256, at nilalagay sa saklaw ang parehong pagbasa at
pagtanggal sa parehong principal. Ang cache ay nag-iimbak ng hindi hihigit sa 16
na derived na JPEG frame bawat entry, nag-e-expire ng mga ito pagkatapos ng
sampung minuto, at sumusuporta sa mga may hangganang pagbasang `start`/`end` o sa
tahasang pagtanggal ng session.

Ang bawat principal ay limitado sa 16 na entry at 64 MiB ng canonical na JPEG
data. Ang mga limitasyong iyon ay independyente sa pandaigdigang kisameng
64-entry/256 MiB: ang presyur ng quota ng principal ay nag-e-evict lamang ng mga
least-recently-used na entry ng principal na iyon bago isaalang-alang ang
pandaigdigang LRU eviction. Ang mga nag-expire na entry ay winawalis mula sa
parehong accounting ng principal at pandaigdigan tuwing may aktibidad ang cache,
habang ang pagkansela at kabiguan sa validation ay hindi nagko-commit ng
bahagyang pagpapalit.

Tinatangihan ng cache ang hindi kanonikal na Base64, labis na padding, hindi JPEG na media, malformed o pinutol na mga JPEG, at mga JPEG na naglalabas ng babala sa panahon ng may hangganang full-image na `sharp` decode. Muling ini-encode nito ang bawat tinanggap na imahe bilang kanonikal na JPEG, hinuhugot ang lapad at taas mula sa mga na-decode na byte sa halip na magtiwala sa mga field ng caller, at itinatapon ang anumang mga kasunod na polyglot byte sa halip na panatilihin ang mga ito. Tanging ang may hangganang kanonikal na compressed buffer ang ibinibilang sa parehong quota. Kasama sa JSON wire limit ang Base64 overhead para sa 32 MiB na hangganan ng decoded-input. Ang bawat nakaimbak na derivation ay nagtatala ng sarili nitong napatunayang JPEG format/resolution, sampling policy, bersyon ng derivation, oras ng paglikha, content hash na kalkulado ng server, at naka-hash na parent reference kasama ang parent-content hash ng pinagkakatiwalaang caller. Sinusuri ang pagkansela sa pagitan ng mga asynchronous na yugto ng decode/hash bago ang atomic na cache commit.

Ang tranche na ito ay hindi pa nagkakonekta ng production producer sa route at hindi nagbibigay ng multi-resolution variant selection. Ang transparent na request path ng Video Bridge ay samakatuwid ay walang idinadagdag na trabaho, habang ang tenant-bound na principal derivation at ang buong FU-08 multi-resolution lifecycle ay nananatiling tahasang follow-up na trabaho sa halip na idokumento bilang kumpletong pag-uugali.

Ang mga frame ay binibigyan ng caption nang sunud-sunod gamit ang na-configure na Video model. Ang walang laman na Video override ay nagmamana ng Vision setting; kung parehong walang laman, ang Vision auto-router ang pumipili ng epektibong vision-capable na modelo. Ang mga matagumpay na caption ay pumapalit sa orihinal na bahagi na may matatag na `[Video description:` prefix na nagmamarka rin sa teksto bilang hindi pinagkakatiwalaang obserbasyong hango sa media at nagsasabi sa mga downstream na modelo na huwag sundin ang mga tagubiling matatagpuan sa media. Kasama sa mga cache key ng frame-caption ang mga JPEG byte, prompt, timestamp, at epektibong modelo; tanging ang mga matagumpay na caption ang naka-cache. Pinapanatili ng mga cache entry ang aktwal na matagumpay na producer model, kasama ang fallback model; iniulat ng bridge ang `mixed` kapag ang iba't ibang frame ay ginawa ng iba't ibang modelo. Muling ginagamit ng cache hit ang producer identity na iyon sa halip na muling labelan ito bilang hiniling na routing plan. Ang result cache ng buong video ay naka-key sa bawat input na nagbabago sa output — prompt, epektibong modelo, sampling policy, bilang ng frame, semantic analysis mode, ang SHA-256 fingerprint ng na-normalize na focus hint, focus window, `transcript`, `audioTranscript`, at ang contact-sheet flag — kaya ang pagbabago sa alinman sa mga dimensyong iyon ay isang cache miss, hindi kailanman isang stale na muling paggamit. Ang bersyon ng visual dedup policy, threshold, at may hangganang bilang ng candidate-frame ay tahasan ding nasa result-cache key at metadata; samakatuwid, ang pagbabago ng policy ay hindi maaaring muling gumamit ng stale na paglalarawan ng buong video. Pinapanatili ng metadata ng result-cache v4 ang mode at fingerprint, hindi kailanman ang hilaw na gawain ng user. Iniulat ng metadata ng guardrail ang parehong hiniling at epektibong analysis mode; ang hiniling na `focused` mode na walang magagamit na teksto ng user ay iniulat bilang epektibong `full`.

Kinukuha ng guardrail ang bawat suportadong bahagi ng video ngunit naglalarawan ng hindi hihigit sa `modalityBridgeVideoMaxVideos`. Para sa target na napatunayang may `supportsVideo === false`, ang mga nabigo at lampas sa limit na video ay nagiging tahasang ligtas na text marker upang walang hilaw na video ang manatili. Kapag hindi alam ang kakayahan, pinapanatili ng mga bahaging iyon ang kanilang video carrier; ang anumang fallback transcript ay sumusunod sa may hangganang text conversion sa itaas. Nilalaktawan ng mga target na may `supportsVideo === true` ang bridge.
Ang abort signal ng client request ay kumakalat sa download, broker queue, mga subprocess, at mga caption call; ang mga abort ay humihinto sa pagitan ng mga video at hindi kailanman nagfa-fail open sa hilaw na media.

Ang mga runtime setting ay naka-back sa DB at na-validate ng Zod:

| Susi                                | Default     | Saklaw / pag-uugali                                                                                                                                         |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Opsyonal na runtime, opt-in                                                                                                                                 |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | Ang `full` ay nagpapanatili ng mga generic na caption; ang `focused` ay gumagamit ng may hangganan, hindi pinagkakatiwalaang konteksto ng pinakabagong user |
| `modalityBridgeVideoModel`          | `""`        | Manahin ang modelo ng Vision Bridge                                                                                                                         |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                                                        |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, o proporsyonal na `segment_aware`; ang pagkabigo ng detector ay nagfa-fallback sa `uniform`                                       |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                                                         |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                                                              |

Ang mga legacy na naitagong halaga ng Video timeout na higit sa 120 segundo ay kina-clamp sa broker deadline; ang mga bagong pagsulat ng setting na higit sa limit na iyon ay tinatangihan. Ang `GET /api/modality-bridge/video/runtime` ay nangangailangan ng pinagkakatiwalaang naka-stamp na loopback locality bago ang authentication o runtime probing, pagkatapos ay nangangailangan ng management auth. Nagbabalik lamang ito ng `available`, mga sanitized na bersyon ng FFmpeg/ffprobe, at isang nakatakdang dahilan kapag hindi available ang runtime. Ang internal na extraction endpoint ay hindi pampublikong upload API: ang queue saturation ay nagbabalik ng `503` kasama ang `Retry-After`, ang pagdiskonekta ng caller ay nagbabalik ng `499`, at ang nakatakdang broker deadline ay nagbabalik ng `504`. Ang mga na-convert na tugon ay nagdaragdag ng `video->text;model=<visionModel>;parts=<videos>` sa sentral na `x-omniroute-modality-bridge` header nang hindi inaalis ang mga segment ng Vision o Audio.

### PII Masker (`piiMasker.ts`)

Tumatakbo sa **parehong** yugto.

- **`preCall`** — nagko-clone ng payload, dinadaanan ang `system`, `messages`,
  `input`, at `prompt` (kabilang ang mga plain string item), at ina-apply ang
  `processPII()` (mula sa `@/shared/utils/inputSanitizer`) sa mga string field
  na `content`/`text`. Kapag `PII_REDACTION_ENABLED=true`, ni-reredact ang
  natukoy na PII sa outbound payload. Hindi ito nakadepende sa
  `INPUT_SANITIZER_MODE` (na kumokontrol lang ng prompt-injection policy).
  Kapag naka-off ang redaction, itinatala ng call ang mga detection count nang
  hindi nire-rewrite ang content.
- **`postCall`** — gumagawa ng deep clone ng response, pinapatakbo ang
  `sanitizePIIResponse()` kasama ang masker ng hugis Responses-API
  (`maskResponsesOutput` — sumasaklaw sa `output_text` at
  `output[].content[].text`). Kung may naganap na anumang redaction, papalitan
  ng binagong response ang orihinal.

Hindi kailanman bumoblock ang guardrail; nag-a-annotate lang ito
(`meta.detections`, `meta.redacted`) o nagre-rewrite.

#### Pagpili kada uri, mga custom pattern, at mga detection counter

Ang **Dashboard → Settings → Security → PII masking** ang pumipili kung _ano_
ang ima-mask. Hindi nito binubuksan ang masking: ang `PII_REDACTION_ENABLED`
(request) at `PII_RESPONSE_SANITIZATION` (response + SSE) pa rin ang
nagpapagana nito, parehong naka-off bilang default.

- **Pagpili kada uri** — nakalista ang mga built-in id sa
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Ang unset ay
  nangangahulugang lahat ng uri (ang pag-uugali bago pa nagkaroon ng setting
  na ito). Ang `ssn_us` pattern ng request engine ay nagma-map sa `ssn`. Ang
  mga template (Minimal, Standard, Financial, Brazilian, USA, Full) ay
  pumupuno lang sa mga checkbox sa UI.
- **Mga custom pattern** — hanggang 20 regex o wildcard pattern (`*` =
  hanggang 64 na non-whitespace na character, `?` = isa). Ang mga match ay
  nagiging `[CUSTOM_REDACTED]`. Bawat pattern ay dumadaan sa
  `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`):
  pinakamaraming 500 character, mga flag na limitado sa `g i m s u`, dapat
  ma-compile, dapat pumasa sa `safe-regex` (catastrophic backtracking), at
  hindi dapat mag-match sa empty string o sa placeholder ng redaction. Ang
  pattern na hindi pumasa ay tinatanggihan kapag sine-save at kapag tine-test,
  at ang naka-store na row na hindi pumasa ay nilalaktawan sa runtime sa halip
  na i-compile. Tumatakbo lang ang mga custom pattern habang naka-on ang
  masking.
- **Mga detection counter** — mga count kada uri (hindi kailanman ang mga
  na-match na value), nasa memory at nire-reset kapag nag-restart
  (`src/lib/pii/piiDetectionStats.ts`). Tumataas lang ang mga ito habang
  naka-on ang masking.

Naka-store ang mga setting sa `key_value` table (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) at binabasa sa pamamagitan ng 1 s na cache. API:

| Method | Path                     | Layunin                                                                       |
| ------ | ------------------------ | ----------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Estado ng mga flag, `enabledTypes`, `customPatterns`, mga detection counter   |
| `PUT`  | `/api/settings/pii`      | Palitan ang `enabledTypes` (`null` = lahat) at/o `customPatterns`             |
| `POST` | `/api/settings/pii/test` | I-dry-run ang isang pattern laban sa sample na hanggang 8 KB; walang iniimbak |

Ang tatlo ay nangangailangan ng management auth at nagva-validate ng body
gamit ang Zod (`src/shared/validation/schemas/piiSettings.ts`).

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
