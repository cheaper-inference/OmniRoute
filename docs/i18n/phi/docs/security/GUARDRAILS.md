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

Awtomatikong nilo-load ng registry ang anim na guardrail ayon sa pagkakasunod-sunod ng priority kapag nag-i-import
(tingnan ang `registry.ts` → `registerDefaultGuardrails()`):

| Priority | Pangalan            | (Mga) Stage    | File                  |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Ang mga priority number na mas mababa ay **unang tumatakbo**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Ang GLM 5.3 base model at `glm-5.3-{low,high,max}` ay may tahasang
`supportsVision:false` na registry/spec metadata. Ang mga GLM 5.3 Flash variant
ay nananatiling mga native-vision model. Ang `/v1/messages` route ng Claude Code ay pumapasok sa shared
`handleChat` pre-call guardrail chain **bago** ang pagsasalin mula Claude patungong OpenAI; kailangang ilarawan o pangasiwaan ang mga image ng nested na resulta ng tool na `Read`
bago iangat ng pagsasaling iyon ang mga ito bilang OpenAI na `image_url` content (#17069).

Sinasala nito ang mga request na may image na nakalaan para sa **mga model na walang vision** at alinman ay nire-reroute ang buong request sa isang model na may kakayahang vision o pinapalitan ang mga bahagi ng image ng mga text description na ginawa ng isang configurable na vision model bago ang upstream call. Pinahihintulutan nito ang mga text-only provider na transparent na pangasiwaan ang mga multimodal payload.

Daloy:

1. Laktawan kung sinusuportahan na ng target model ang vision (maliban kung lumilitaw ito sa forced-bridge list na `isVisionBridgeForcedModel`).
2. I-extract ang mga image part sa pamamagitan ng `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), na nagde-delegate sa **unified media
   detector** na `detectMediaParts()` sa `open-sse/utils/mediaParts.ts` — ang nag-iisang source of truth na ibinabahagi sa combo compatibility filter.
   Nililimitahan ang extraction sa mga shape na pinapayagang i-splice pabalik ng `replaceImageParts` (ang extract↔replace contract): OpenAI `image_url`, Anthropic base64
   `source.type:"base64"`, Anthropic URL na `source.type:"url"`, at Responses
   API `input_image`. Ang mga tumutugmang image na naka-nest sa loob ng
   `tool_result.content` ng Claude Code at mga output ng Responses tool ay ine-extract at pinapalitan din sa orihinal na mga path ng mga ito; ang mga shape na indicator-only ay materyal para sa combo-filter at hindi ine-extract.
   Laktawan kung walang nahanap.
3. I-resolve ang runtime config sa pamamagitan ng `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): mananaig ang mga bagong `modalityBridge*`
   settings key; mananatili ang mga legacy na `visionBridge*` key bilang **one-cycle
   fallback** (rollback window). Laktawan bago ang anumang media traversal kapag naka-disable ang bridge.
4. Ang mode selector (`modalityBridgeVisionMode`, tingnan ang talahanayan sa ibaba) ang nagpapasya kung reroute o describe. Ibinabalik ng reroute ang `modifiedPayload` na ang `model`
   lang ang pinalitan, kasama ang meta na `{ rerouted, fromModel, toModel, imagesKept }`.
5. Describe path: lilimitahan ang mga image sa `maxImages`, bubuuin ang task-aware prompt,
   susuriin ang describe cache, tatawagin ang vision model **nang parallel**
   (`Promise.allSettled`), at mag-i-inject ng mga text part na `[Image N]: <description>` sa kanilang kinalalagyan. Ang bigong describe ay nagbubunga ng `null`: pinananatili ang raw image para sa mga unknown/vision-capable target (#4012), ngunit ang isang **nakumpirmang text-only direct
   target** o zero-vision combo ay bibigyan ng tahasang
   `(unavailable — no vision-capable provider connected)` text stub para sa
   bawat image na hindi nailarawan, kabilang ang mga partial failure at mga image na lampas sa describe-call cap (#17069). Nananatili ang umiiral na all-failed combo describe fallback (#8430).
6. Ibalik ang `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Mode selector (`modalityBridgeVisionMode`)

| Mode       | Default | Gawi                                                                                                                                                                                                                                                                                                                  |
| ---------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | Legacy heuristic, hindi binago (#6640/#7204): ang mga non-combo/`auto/` model ay nire-reroute sa pinakamahusay na vision model maliban kung ang orihinal na model ay mayroon nang usable credentials (kung gayon ay nagde-describe); ang mga combo target ay laging nagde-describe.                                   |
| `describe` |         | Laging mag-describe — ganap na nilalaktawan ang reroute block; ang model na pinili ng user ang laging sasagot.                                                                                                                                                                                                        |
| `reroute`  |         | Piliting mag-reroute: nilalaktawan ang keep-credentialed-model guard. Nananatiling umiiral ang credential guard ng reroute-**target** — kapag walang available na usable na vision target, bina-block ng bridge gamit ang malinaw na error sa halip na mag-describe o magpadala ng mga raw image sa text-only target. |

Ang mga forced mode ay nagsho-short-circuit **bago** tumakbo ang auto heuristic; ang gawi ng `auto` ay byte-identical sa guardrail bago ang PR-1.

#### Saklaw ng API key (`visionBridgeKeyScope.ts`)

Kapag nililimitahan ng API key ng tumatawag ang `allowedConnections`, mga quota pool
(`allowedQuotas`) o mga modelo (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), pumipili lamang ang bridge
ng mga reroute at describe model na maaaring gamitin ng key, sa mga connection na
maaari ring gamitin ng key. Ang describe call ay palaging dumadaan sa OmniRoute
self-loop gamit ang header na `x-omniroute-self-loop-key-id`, kaya muling ipinapatupad ng
tumatanggap na chat request ang connection at model policy ng key na iyon.
Iginagalang ng `enforceApiKeyPolicy()` ang header na iyon kapag kasama lamang ang
self-loop bearer, kaya maaari lamang nitong paliitin ang access, at tinatanggihan ang id
na hindi mahanap.

Kung walang vision model na pinahihintulutan para sa key, lokal na tinatanggihan ng
**nakumpirmang text-only na target** ang image request gamit ang malinaw na HTTP 400 sa
halip na ipasa ang image bytes sa upstream na hindi kayang magproseso nito (#17069).
Para sa mga target na hindi alam o native ang vision capability, pinananatili ng describe
path ang dati nitong fail-open na gawi (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Ang mga request na walang key, at mga key na walang ganitong mga restriction, ay
gumagana nang eksaktong gaya ng dati.

#### Describe prompt na nakaayon sa task (`modalityBridgeVisionTaskAware`)

Default na **true**. Idinaragdag ng `composeVisionPrompt()` (`visionBridgeHelpers.ts`) ang
teksto ng **huling mensahe ng user** (pinaikli sa 500 character) sa base describe
prompt, upang ituon ang paglalarawan sa aktuwal na hinihiling ng user
(pattern ng codex-vision-proxy) at hilingin sa vision model na i-transcribe ang nakikitang
teksto. Kapag naka-off ang flag — o walang text mula sa user — ginagamit ang base prompt
nang walang pagbabago.

Ang sariling OpenAI-compatible request ng describe self-loop
(`callVisionModelSingle()` sa `visionBridgeHelpers.ts`) ay palaging humihiling ng
`image_url.detail: "high"` — walang kondisyon, para sa bawat caller/provider, at hindi
nakabatay sa anumang signal mula sa client. Pinapababa ng low-detail sampling ang
katumpakan ng OCR para sa mismong text-transcription task na hinihiling ng prompt na
ito, kaya ang describe call mismo ay palaging humihiling ng high detail anuman ang
detail level na ginamit ng orihinal na inbound request. Ang internal describe request
body lamang ang naaapektuhan nito; hindi nito binabago kung paano ipinapasa ng OmniRoute
ang sariling `image_url.detail` ng caller sa primary request — hiwalay na inilalapat ang
default na iyon, at para lamang sa mga natukoy na OpenCode client, sa
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Walang `detail`
field ang Anthropic wire-format branch ng describe self-loop at hindi ito naaapektuhan
ng alinman sa mga default na ito.

#### Limitasyon sa output ng describe (`modalityBridgeVisionMaxChars`)

| Key                            | Default | Range           |
| ------------------------------ | ------- | --------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` o 100–50000 |

Ang `0` (default) ay nangangahulugang **walang limitasyon** — ipinapasa ang paglalarawang
ibinalik ng `callVisionModel()` nang walang pagbabago, kaya napapanatili ang umiiral na
gawi. Ang anumang value sa saklaw na 100–50000 ay nagpapaikli sa paglalarawan gamit ang
suffix na `…` bago ito ibalik bilang `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` sa `src/lib/guardrails/visionBridge.ts`).
Taasan ito para sa mga OCR task na nangangailangan ng maraming detalye at kung saan
kailangan ng downstream model ang buong transcription; babaan ito upang limitahan ang
paggamit ng token sa mga madaldal na vision model.
Ang field sa dashboard ay nasa Advanced panel ng Vision tab
(`modality-bridge-max-chars` sa `ModalityBridgeVisionTab.tsx`) at inaakyat ang anumang
value sa pagitan ng 1 at 99 sa minimum na 100 habang hinahayaang manatiling 0 ang
tahasang `0` — ang `0` ay valid na Zod value sa sarili nito
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), hindi lamang ang
default na “hindi itinakda.”

#### Describe cache (`modalityBridge/bridgeCache.ts`)

In-memory na LRU + TTL cache para sa mga output ng describe, na ibinabahagi sa buong
process. Ang key ay `sha256(imageRef + composedPrompt + configuredBridgeModel)` na may
length-prefix framing (walang banggaan sa hangganan ng field). Ang bahagi ng model ay ang
**naka-configure** na bridge model, hindi ang model na aktuwal na sumagot —
maaaring mag-fallback sa loob ang `callVisionModel`, at ang pag-key sa bawat pagtatangka
ay maghahati-hati sa cache. Hindi kailanman naka-cache ang mga nabigong describe.
Mga setting:

| Key                             | Default | Range   |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Normalisasyon ng remote image (self-loop describe/base64 fetch)

Kapag ang bridge mismo ang kumukuha ng **remote** image — ang Anthropic describe
self-call at ang claude-wire-format base64 conversion
(`ensureBase64ImagesForClaudeWire`), na parehong gumagamit ng
`fetchRemoteImageAsDataUri()` sa `visionBridgeHelpers.ts` — ipinapasa ang nagresultang
data URI sa `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) bago ito i-embed sa
vision-model request. Ang mga oversized na image ay binababaan ang sukat sa
**2048px na mahabang gilid** (katumbas ng resize cap na inilalapat na ng OpenAI/Anthropic
sa server-side), na nagpapababa sa upload bytes/latency nang hindi binabago ang nakikita
ng vision model. Gumagamit ang pag-resize ng `sharp`, na nilo-load sa pamamagitan ng
dynamic import: sa platform kung saan hindi ma-load ang native binary nito,
**hindi kailanman nagti-throw** ang `normalizeDataUri()` — nagfa-fallback ito sa
pagpasa sa orihinal na bytes, kaya palaging gumagana ang describe/base64-conversion
path. Ang mga byte na hindi image (isang fetch na walang naibalik na nade-decode na
image) ay ipinapasa rin nang hindi binabago. Nakalaan ang normalisasyong ito sa mga
image na kinukuha ng bridge para sa sarili nitong self-call — hindi ito kailanman
inilalapat sa raw passthrough payload ng caller, alinsunod sa prinsipyo ng
opt-in-only mutation (Hard Rule #20).

#### Schema ng settings + migration

Ang mga bagong `modalityBridge*` key ay vine-validate ng Zod sa `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, ang trio na `modalityBridgeCache*`, at ang
pangkat na `modalityBridgeAudio*` na ginagamit ng Audio Bridge. Kinokopya ng
migration na `141_modality_bridge_settings.sql` ang mga kasalukuyang legacy
`visionBridge*` value sa katumbas na bagong key (idempotent at hindi kailanman
o-overwrite ng value na itinakda ng operator para sa `modalityBridge*`); mananatiling
tinatanggap ang mga legacy key bilang read fallback sa loob ng isang release cycle.

#### Header ng transparency + mga istatistika

Ang mga response na may describe-transformation ay naglalaman ng
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(na binubuo ng `buildModalityBridgeHeader()` sa `modalityBridge/bridgeStats.ts`,
at nilalagyan ng `withModalityBridgeHeader()` sa `src/sse/handlers/chatHelpers.ts`).
Walang header ang mga ni-reroute na request — hindi ginalaw ang payload at
nakikita na ang pagpapalit ng model sa field na `model` ng response body.

Ang `GET /api/modality-bridge/stats` (may management auth, kaparehong tier ng
`GET /api/settings`) ay nagbabalik ng mga in-memory per-modality counter na
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` para sa `vision`, `audio`, at
`video`. Ginagamit ng `averageLatencyMs` ang `latencySamples`, hindi lahat ng
attempt, bilang denominator nito; ang operasyong walang timing ay hindi lumilikha
ng pekeng zero-millisecond sample. Ang `bridged` ay nananatiling backward-compatible
alias para sa mga matagumpay na conversion; hindi ito dinaragdagan ng mga nabigong
attempt.
Nire-reset ang mga counter kapag nag-restart ang proseso ayon sa disenyo
(telemetry, hindi accounting).

#### Configuration ng dashboard

Ang nakalaang dashboard page ay
`/dashboard/settings/modality-bridge`. Pinananatili ng mga tab na `Vision`, `Audio`,
at `Video`, na naa-address sa pamamagitan ng URL, ang mga query parameter habang
pinapalitan ang value ng `tab`. Ipinapakita ng Vision tab ang enablement, mode,
pagpili ng model (kasama ang automatic default), task-aware prompting, mga advanced
na limitasyon sa timeout/image/haba ng description/cache, mga runtime
counter, at isang protektadong sample request. Live na rin ang Audio tab:
ipinapakita nito ang enablement, isang STT-only model picker na may Auto,
mga limitasyon sa timeout/max-clip, mga audio counter, at isang
`input_audio` sample test. Functional ang Video tab: iniuulat nito ang runtime
state ng FFmpeg/ffprobe — isa sa apat na tahasang UI state (`unknown` habang
isinasagawa ang probe o kapag hindi ito nakumpleto, `restricted` sa dashboard
host na hindi loopback kung saan nilalaktawan ang probe sa client-side,
`unavailable` kapag na-probe na at nakumpirmang wala, o `available` kasama ang
mga bersyon ng FFmpeg/ffprobe) — sine-save nito ang mga limitasyon sa
enable/model/frame/video/timeout, sinasala ang model picker para sa mga
model na may kakayahan sa vision, at ipinapakita ang mga video counter.

Ang dating Vision Bridge card sa ilalim ng AI settings ay isang compatibility
link papunta sa bagong page; hindi na ito nagmamay-ari ng pangalawang kopya ng
form. Nagli-link din ang Media Providers sa mga workflow ng Image-to-Text at
Speech-to-Text papunta sa katumbas na mga tab ng Modality Bridge nang hindi
inaalis ang kasalukuyang Speech-to-Text playground.

**Bypass sa self-loop admission:** kapag dumadaan ang describe call sa sariling
`/v1` self-loop ng OmniRoute (non-standard provider model), ipinapadala ng
sub-request ang `x-omniroute-admission-bypass: internal` at ina-authenticate ito
gamit ang na-resolve na self-loop credential — ang lokal na `sk_omniroute`
sentinel sa local mode, o ang operator-configured na
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env key (#1350), upang makapagpatakbo
pa rin ng describe call ang mga deployment na may `REQUIRE_API_KEY=true`.
Ang bypass ay kinikilala lamang para sa eksaktong mga credential na iyon, kaya
hindi magagamit ng mga external client ang header upang laktawan ang admission.

Nasa `src/shared/constants/visionBridgeDefaults.ts` ang mga legacy default;
nasa `src/shared/constants/modalityBridgeDefaults.ts` ang mga bagong
mode/task-aware/cache default at ang settings resolver. Naglalantad ang
guardrail ng constructor option na `deps` upang makapag-inject ang mga test ng
mga pekeng implementasyon ng `getSettings` at `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Ini-intercept nito ang mga chat request na may audio bago makarating ang mga ito
sa target na hindi kilalang tumatanggap ng audio input. Hindi nito nire-reroute
ang chat request: tina-transcribe ang mga audio part sa pamamagitan ng umiiral
na OpenAI-compatible multipart endpoint, at nagpapatuloy ang napiling chat model
gamit ang mga text transcript.

Daloy:

1. I-resolve ang `supportsAudio` sa pamamagitan ng `getResolvedModelCapabilities()`. Nangunguna ang tahasang metadata mula sa provider registry, kasunod ang static model metadata, at pagkatapos ang naka-sync na `modalities_input`. Kapag may idineklarang input list na walang `audio`, ang resulta ay `false`; kapag wala nang natitirang ebidensiya ng capability, `null` ang resulta. Parehong ina-activate ng `false` at `null` ang conservative bridge, habang nilalampasan naman ito ng `true`.
2. I-resolve ang mga setting ng `modalityBridgeAudio*` at kunin ang mga top-level audio part na maaaring i-splice mula sa bawat mensahe sa pamamagitan ng shared na `detectMediaParts()` detector. Ang mga sinusuportahang wire shape ay OpenAI `input_audio`, `audio_url`, at `source.media_type: "audio/*"`. Natutukoy ang nested audio para sa routing ngunit hindi ito inaalis ng splice path. Nililimitahan ng `modalityBridgeAudioMaxClips` ang gawain; hindi ginagalaw ang mga susunod na part.
3. Sundin ang naka-configure na `provider/model`, o hayaang lakarin ng `selectAudioBridgeModel()` ang `AUDIO_TRANSCRIPTION_PROVIDERS` sa stable catalog order at piliin ang unang model na may usable na aktibong provider credential.
4. Kino-convert ng `callAudioTranscription()` ang audio na base64/data-URI tungo sa multipart `file`, o nagda-download ng remote `audio_url` sa pamamagitan ng public-only outbound guard na may DNS pinning at limitasyong 25 MB. Pagkatapos, ipinapadala nito sa pamamagitan ng POST ang file at napiling model sa lokal na self-loop na `/v1/audio/transcriptions`, na authenticated gamit ang `resolveSelfLoopBearer()`. Isinasagawa ng kasalukuyang transcription route ang karaniwang credential lookup, cooldown/rate-limit handling, at provider dispatch.
5. Pinapalitan ng mga matagumpay na tawag ang kanilang mga part ng `[Audio N]: <transcript>`. Tumatakbo ang mga tawag gamit ang `Promise.allSettled`: kapag indibidwal na nabigo, pinananatili ang orihinal na audio part (#4012 contract). Kung mabigo ang lahat ng tawag at napatunayang `supportsAudio === false` ang target, magiging
   `[Audio N]: (unavailable — no STT provider connected)` ang mga part (#8430 contract). Para sa hindi kilalang target (`null`), mananatiling hindi nagagalaw ang resulta kapag lahat ay nabigo. Ang napatunayang text-only na target na walang usable na STT credential ay makatatanggap ng kaparehong tahasang stub nang hindi nagsasagawa ng network call.

Ginagamit ng mga matagumpay na transcript ang process-wide Modality Bridge LRU/TTL cache. Pinagsasama ng key ang audio reference, ang stable na `audio-transcription` operation label, at ang napiling STT model; hindi kailanman naka-cache ang mga failure. Ina-update ng mga audio attempt ang shared na `bridged`, `cacheHits`, `failures`, at `lastUsedAt` counters. Ang mga transformed response ay nagdadala ng
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; hindi nakatatanggap ng Audio Bridge segment ang mga request na hindi binago.

Ang runtime settings ay naka-back sa DB at vine-validate gamit ang Zod:

| Key                           | Default | Range          |
| ----------------------------- | ------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —              |
| `modalityBridgeAudioModel`    | `""`    | Auto or STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10           |

Patuloy na kinokontrol ang shared cache ng
`modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, at `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Ini-intercept nito ang mga top-level video part sa Chat Completions `messages` at Responses API `input` bago tawagin ang target na walang kilalang native video support. Ang mga sinusuportahang shape ay `input_video`, `video_url`, `video_source`, HTTPS URLs, at `data:video/*;base64,...` data URI. Hindi itinuturing na video ang mga plain filename na nasa text.

Ang `VideoBridgeGuardrail.preCall` (`videoBridge.ts`) ang namamahala sa request traversal, capability/policy check, per-request aggregation, at response payload. Ang bawat-video na gawain — acquisition, whole-result cache, paglalarawan ng frame sequence (na nagsasama ng anumang audio transcript na idineklara ng caller), at per-attempt metrics/abort/cleanup — ay nakatago sa likod ng `processVideoPart` sa `videoBridgePipeline.ts`, na tinatawag nang isang beses para sa bawat video part sa loob ng loop ng `preCall`. Tinutukoy rin ng module na iyon ang mga tahasang port boundary na `VideoMediaBrokerPort` (pagkuha ng bytes at pag-extract ng mga na-sample na frame), `VideoAudioTranscriptionPort` (pagsasama ng idineklarang audio transcript ng caller sa mga na-sample na caption), at `VideoDrilldownPort` (ang legacy raw-store shape). Binubuo ang production STT at frame retention sa paligid ng describing port sa pamamagitan ng `createVideoSttAdapter` at `createVideoDrilldownAdapter`; ginagamit ng huli ang shared opaque-handle lifecycle.

Hindi kailanman nag-i-import o nagpapatakbo ng subprocess ang public `/v1` request path. Dina-download ang mga remote video sa ilalim ng limitasyong 50 MiB; ang mga inline base64 video ay may conservative na 36 MiB decoded per-video cap upang manatili sa loob ng public JSON request admission limit na 50 MiB ang model/messages/framing envelope. Sinusuri ang inline length at decoded-size estimate bago ang allocation. Kinakailangan ang HTTPS sa unang remote URL at sa bawat redirect, gamit ang umiiral na public-only outbound guard na may DNS pinning. Pagkatapos ay tumatawid ang bytes sa eksaktong internal na `POST /api/modality-bridge/video/extract` broker boundary. Ang route na iyon ay parehong `LOCAL_ONLY` at `SPAWN_CAPABLE`, tumatanggap lamang ng per-process authenticated at trusted-loopback request, at hindi kailanman tumatanggap ng URL, filesystem path, executable, o argument list. Malayang ipinapatupad ng API body-size pipeline at ng incremental body reader ng handler ang 50 MiB broker input cap. Isang extraction lamang ang pinoproseso ng bounded queue sa bawat pagkakataon, pinahihintulutan ang apat na pending job, at nililimitahan sa 100 MiB ang pending input.

Sa loob ng broker, binabasa ng `ffprobe` ang isang pribadong lokal na file; hindi kasama sa nakapirming format
allowlist ang mga format ng playlist at manifest. Para sa mga container na kabilang sa pamilya ng MOV na pinapayagan,
nananatiling hindi pinagana bilang default ang mga panlabas na sanggunian ng data ng MOV, at hindi ito ina-enable ng
nakapirming command. Parehong gumagamit ang `ffprobe` at `ffmpeg` ng whitelist ng protocol na `file` lamang, isang
thread, mga nakapirming array ng argumento, walang shell, at mga executable na nire-resolve mula sa `PATH`. Hindi mga
playable candidate ang mga stream ng cover na may attached picture. Dapat matugunan ng lahat ng playable stream ang mga
limitasyon, at mas pinipili ang isang tahasang default stream bago ang deterministic na fallback na may pinakamababang
index. Nililimitahan ang mga video sa 600 segundo, 8,192 pixel bawat dimensyon, at 33,554,432 source pixel. Nagsa-sample
ang FFmpeg ng 1–16 JPEG frame sa midpoint, binababaan ang sukat ng mahabang edge sa hindi hihigit sa 1,024 pixel nang
hindi pinapalaki ang mas maliliit na input, at hindi kailanman tumatanggap ng URL. Ang sampling ay `uniform` bilang
default. Ang opsyonal na mga policy na `scene_aware` at eksperimental na `segment_aware` ay nagsasagawa ng isang
karagdagang nakapirming FFmpeg pass sa dati nang na-validate na lokal na stream, pumipili ng mga bounded na timestamp ng
scene na nakukuha mula sa `showinfo`, at deterministically na bumabalik sa kaparehong uniform midpoint kapag nagkaroon ng
kabiguan ng detector, timeout, malformed na output, o walang laman na candidate set. Sa segment-aware mode, naglalaan ng
midpoint samples nang proporsyonal sa mga na-validate na pagitan ng scene; nakadetalye sa ibaba ang ebidensiya at
fallback behavior ng segment-aware. Ipinapatupad ang hard cap na 16 frame pagkatapos ng pagpili sa bawat policy. Kapag
ang scene-aware na request ay may budget na isang frame lamang, ginagamit nito ang uniform midpoint ng aktibong buong
video o focus window at iniuulat ang `policyEffective: uniform`: hindi mapapanatili ng isang napiling scene frame ang
parehong dulo ng temporal na saklaw. Maaaring magbigay ang caller ng isang opsyonal na finite focus window (`start`/`end`
seconds); kino-clamp ang mga bound sa tagal ng media, tinatanggihan ang mga window na baligtad o non-finite, at
isinasagawa lamang ang lahat ng sampling policy sa loob ng normalized interval. Isinasama ang nagresultang window sa
sampling metadata at sa untrusted description prefix upang matukoy ng mga downstream model ang nakapokus na excerpt mula
sa buong timeline.

Hiwalay at tahasang setting ang semantic caption focus. Pinananatili ng default na `full` analysis mode ang umiiral na
frame prompt at hindi kailanman ipinapasa ang text ng request sa caption model. Sa `focused` mode, binabasa ng bridge
lamang ang pinakabagong hindi walang-lamang `text`/`input_text` na isinulat ng user mula sa parehong Chat o Responses
container, nino-normalize ito sa NFC, kino-collapse ang mga control character at whitespace, at nililimitahan ito sa 500
Unicode code point. Kapag walang laman ang resulta, bumabalik ito sa eksaktong `full` prompt. Isine-serialize ang isang
magagamit na hint bilang JSON sa isang nakatalagang untrusted-user-context block at maaari lamang nitong unahin ang mga
nakikitang detalye; hindi nito maaaring i-override ang hiwalay na babala laban sa pagsunod sa mga instruction na nakikita
o naririnig sa media. Hindi kailanman nanghuhula ang textual focus ng `start`/`end` o binabago ang temporal sampler.

#### `FU-07` ebidensiyang istruktural ng segment

Gumagamit ang `segment_aware` ng isang bounded na pre-analysis pass sa dati nang na-validate na lokal na video stream.
Una, bina-bago ng nakapirming filter chain ang sukat hanggang sa hindi hihigit sa 320 pixel ang lapad, nagde-detect ng
mga pagbabago ng scene at mga frozen interval, pagkatapos ay nagsa-sample ng 1 frame bawat segundo para sa blur,
average luma, at spatial/temporal na impormasyon. Nililimitahan ang pass sa 600 structural sample, isang
FFmpeg/filter thread, kaparehong `file`-only protocol at container allowlist, 1 MiB na limitasyon sa output ng proseso,
at hindi hihigit sa 30 segundo sa loob ng shared abort/deadline ng broker. Hindi ito kailanman tumatanggap ng command,
filter, path, o URL mula sa request.

Ang mga structural value ay deterministic sampling evidence, hindi semantic na pag-unawa sa video. Hindi nito hinuhulaan
ang mga subject, aksyon, caption, speech, o layunin ng user. Bumubuo ng mga segment ang mga boundary ng scene at freeze;
ang freeze coverage, blur, exposure, spatial detail, at temporal change ay nakaaapekto lamang sa paraan ng paglalaan ng
umiiral na budget na 1–16 frame. Nililimitahan sa isang frame ang isang ganap na frozen na segment, habang
nagpapaligsahan ang mga non-frozen na segment para sa natitirang budget. Kapag mas marami ang boundary kaysa sa mga frame,
pinananatili ang uniform na saklaw ng timeline upang hindi maitago ng mabilis na mga cut sa simula ang isang mahabang
segment sa dulo. Pinagsasama ang mga boundary ng scene na nasa loob ng 1-segundong resolution ng pagsusuri ng isang
freeze boundary.

Ang nawawalang filter, malformed o walang-lamang evidence, error ng detector, o bounded na timeout ng pre-analysis ay
nagbubukas ng fallback sa eksaktong uniform midpoint policy. Ang abort ng caller o deadline ng broker ay hindi nagbubukas
ng fallback: tinatapos nito ang kasalukuyang subprocess, pinipigilan ang kasunod na pagkuha ng frame, at inaalis ang
pribadong temporary tree sa `finally`.

Gumagawa ang `scripts/perf/video-bridge-fu07-eval.ts` ng deterministic na mga totoong FFmpeg fixture para sa post-dedup
caption-call savings, paglalaan ng budget sa dense motion, blur/exposure/SI-TI evidence, mabilis na mga cut na may
mahabang tail, at mga false positive ng unti-unting fade. Itinatala nito ang wall time ng pre-analysis at, kapag
available ang `/usr/bin/time`, ang child CPU at peak RSS. Structural oracle lamang ang mga quality check nito. Nananatiling
`HOLD` ang tunay na kalidad ng caption model dahil walang awtorisadong endpoint o frozen judge ang harness na ito.
Nananatili ring `HOLD` ang monetary savings maliban kung nagbibigay ang `--caption-cost-per-call-usd` ng tahasang positibong
tantya ng halaga bawat call; hindi kailanman gumagawa ang script ng alinman sa mga resultang ito nang walang batayan.

Ang bawat frame ay nililimitahan sa 4 MiB, ang lahat ng raw frame ay sama-sama
sa 23 MiB, at ang serialized na tugon ng broker sa 32 MiB. Inaalis ang isang
pribadong pansamantalang direktoryo sa `finally`. Hindi nagbu-bundle ang
OmniRoute ng FFmpeg at hindi tumatanggap ng custom na executable path. Bago ang
captioning, naglalapat ang bridge ng konserbatibong visual deduplication pass:
binabawasan ang bawat JPEG sa isang 16×16 grayscale buffer at inihahambing
lamang sa huling frame na pinanatili. Para sa hinihinging caption budget na
higit sa isang frame, nagbibigay ang extraction ng isang bounded candidate pool
na hanggang dalawang beses ng budget na iyon at hindi kailanman lalampas sa 16
na frame. Inilalapat lamang ang hinihinging cap pagkatapos ng deduplication,
at pinananatili ang unang at huling napiling candidate sa final thinning kapag
hindi bababa sa dalawa ang budget. Ginagamit ng versioned
`grayscale-16x16-mean-cells-v2` policy ang mas malaki sa mean luma delta at sa
ratio ng mga thumbnail cell na ang normalized delta ay hindi bababa sa 0.05.
Ang duplicate threshold ay ang constant na 0.04, na pinili para sa
predictability sa halip na ilantad bilang runtime setting. Pinananatili ng
pangalawang high-contrast signal na ito ang maliliit na pagbabago sa galaw at
mga pagbabago sa nakikitang text na maaaring hindi makita ng paghahambing na
mean-only. Kapag nagkaroon ng comparator o decoder error, nagfa-fail open ito
at pinananatili ang coverage. Hinihiwalay ng output metadata ang mga na-extract
na candidate, mga frame na matagumpay na nagamit, at mga visual duplicate na
inalis.

Maaaring humiling ang isang video part na tahasang minarkahan ng timestamped
contact sheet. Bumubuo ang bridge ng JPEG grid na may pinakamarami nang 4 na
column at 16 na frame. Sa bawat 512-pixel cell, inilalagay ang source timestamp
sa isang high-contrast na bandang nasa ibaba, habang nananatili ang parehong
timestamp sa textual metadata para sa downstream association at audit. Ang
kumpletong JPEG ay nananatiling may cap na 32 MiB. Kung hindi ma-decode o
ma-compose ng `sharp` ang grid, bumabalik ang bridge sa mga indibidwal na JPEG
frame; ipinapasa pa rin ng sheet operation ang client abort.

Sadyang hiwalay ang promotion evidence sa synthetic composition
microbenchmark. Tinutukoy ng `scripts/perf/video-bridge-contact-sheet-eval.ts`
ang isang schema-versioned A/B harness para sa mga real OpenAI-compatible vision
model. Sinusukat nito ang mga token na iniulat ng provider, end-to-end wall
latency (kasama ang sheet composition), bilang ng model call, at pagpapanatili
ng fact na tinukoy ng manifest. Hindi isinusulat sa report ang raw model
responses; SHA-256 digest at mga katugmang fact ID lamang ang pinananatili.
Walang network o paid model call na ginagawa ang harness maliban kung ipinasa
ang `--execute-real` at na-configure ang `--model`,
`OMNIROUTE_BASE_URL`, at `OMNIROUTE_API_KEY`. Kung walang tahasang real run,
nananatiling `HOLD` ang machine-readable verdict nito; hindi sapat na promotion
evidence ang mga synthetic payload/call-count measurement lamang.

Ginagamit ng hiwalay na `scripts/perf/video-bridge-promotion-eval.ts` ang mga
observation mula sa FU-07 o FU-09. Para matanggap sa promotion, kinakailangan
ang lahat ng walong synthetic scenario kind kasama ang isang sanitized real
clip, hindi bababa sa tatlong nasukat na repetition bawat role at case, lahat
ng sampung dineklarang metric, mga naka-freeze na digest ng
media/prompt/expected-fact/settings, mga natatanging observation ID, at
na-verify na seeded A/B order. Itinatali ng execution receipt ang corpus digest,
eksaktong candidate SHA, at model revision. Nananatiling `HOLD` ang mga
nawawala o hindi valid na measurement, kabilang ang CPU na higit sa 30 s, peak
RSS na higit sa 512 MiB, o pre-analysis na higit sa 30 s. Ang mga ito ay
evidence-admission cap, hindi bagong garantiya ng runtime RSS enforcement.

Kinakailangan ng FU-07 ang hindi bababa sa 98% quality retention at p95 latency
na hindi hihigit sa 1.2x ng baseline, bukod pa sa alinman sa 0.05 na absolute
case-balanced mean recall improvement sa katumbas na mean caption calls, o hindi
bababa sa 10% na mas kaunting mean post-dedup caption calls. Kinakailangan ng
FU-09 ang hindi bababa sa 0.85 quality, 95% retention, 20% median latency
reduction, at 10% token reduction. Pinipigilan ng pagkawala ng critical fact,
injection compliance, o nawawalang usage ang promotion. Walang isang execution
na makakapag-promote ng anuman:
Tinitiyak ng `--previous-report` ang dalawang magkahiwalay, hindi
nag-o-overlap, at magkakasunod na eligible execution ng parehong
policy/model revision/candidate/corpus. Hindi makapagpapatunay ang isang
sampling experiment ng isang contact-sheet experiment.

Dapat i-score ng collectors ang mga response sa memory at i-save ang
`responseDigest` kasama ang metrics at observation bindings, at hindi kailanman
ang response text. Binabasa rin ng consumer ang legacy raw observations ngunit
hindi kailanman kinokopya ang text na iyon sa mga report nito. Eksaktong isa sa
`responseDigest` o `rawResponseText` ang tinatanggap para sa bawat observation.
Nananatiling walang laman ang versioned allowlist na may immutable na `hold`
default. Kinakailangan ng isang eligible entry ang evidence reference, policy,
model revision, eksaktong candidate SHA, manifest digest, at dalawang
magkahiwalay na run ID; tinatanggihan ang magkakasalungat na context. Ang mga
metadata na ito ay audit contract, hindi patunay na naglalaman ang isang
nireferensiyang file ng tunay na measurement. Suriin ang aktuwal na mga receipt
bago magdagdag ng anumang entry. Naglalantad ang management stats endpoint at
Video dashboard ng konserbatibong readiness. Hindi sapat ang naka-configure na
model alias lamang para maitatag ang revision nito o ang tumatakbong candidate
SHA, kaya `HOLD` ang iniuulat ng kasalukuyang dashboard sa halip na gamitin
muli ang eligibility mula sa ibang execution context. Nananatiling hiwalay sa
promotion ang tahasang experimental selection; walang default na awtomatikong
binabago.

Maaaring mag-attach ang mga caller ng opsyonal na `transcript.cues` array sa isang sinusuportahang
video part kapag mayroon na silang naka-align na teksto. Dapat maglaman ang bawat cue ng
`text`, isang finite na `start`/`end` interval sa loob ng na-probe na duration, at isang pinapahintulutang
`source` (`client`, `embedded`, o `audio-bridge`); ang default ng `confidence` ay
`1` at dapat manatili sa pagitan ng `0` at `1`. Pinagsasama sa iisang entry ang eksaktong magkakaparehong cue.
Hindi kailanman nagsisimula ang OmniRoute ng transcription mula sa metadata na ito: ang mga na-validate na cue ay kinokopya sa inilarawang resulta kasama ang source, confidence, at interval, at nire-render bilang mga obserbasyong hindi pinagkakatiwalaan kasabay ng mga caption ng frame. Tinatanggihan ang invalid, lampas-sa-range, o walang-provenance na teksto sa halip na ihalo ito sa caption stream. Parehong nino-normalize ng dalawang transcript channel sa request body ang ibinigay na provenance bilang `client`, kabilang ang mga label na sariling nagdeklara bilang `embedded` o `audio-bridge`. Tanging isang adapter na pagmamay-ari ng server ang maaaring magtalaga ng mga pinagkakatiwalaang label na iyon sa pamamagitan ng code-only na argumentong `trustedSource`; hindi makararating sa argumentong iyon ang isang field sa request JSON. Nananatiling hindi pinagkakatiwalaang content na hinango mula sa media ang transcript text, anuman ang provenance nito, at hindi ito kailanman dapat tumukoy ng authorization.

Maaaring magbigay ang isang advanced caller ng `audioTranscript` track para sa parehong video;
itinuturing ito bilang text na ibinigay ng client, hindi patunay ng transcription mula sa server.
Pinapatakbo ng fusion seam ang mga visual at audio observation gamit ang
iisang deadline at abort signal, inaayos ang mga ito sa iisang timeline, pinagsasama ang
eksaktong magkakapareho, at nag-uulat ng partial result kapag isa lamang sa dalawang panig ang nagtagumpay.
Ang invalid na `audioTranscript` ay nagiging partial result — pinananatili ang visual
description at nagtatala ang audio branch ng sanitized failure code —
sa halip na pabagsakin ang buong video. Pinananatili ang availability ng bawat branch, ang partial flag,
at ang mga sanitized failure code sa inilarawang resulta, sa guardrail metadata
(`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), sa result-cache metadata, at sa bridge fusion counters. Hindi tumatawag ang default na Video Bridge path ng speech-to-text o nagda-download ng ikalawang kopya ng media; kung walang tahasang track na iyon, nananatili itong video-only.

**Pagpapanatili ng transcript (#12150 P1).** Awtomatikong nalalapat ito kapag nag-render ang Video Bridge (na opt-in mismo) ng transcript cue — walang hiwalay na retention flag. Kapag nag-render ang isang request ng anumang transcript cue (isang caller-declared na `transcript` o isang fused na `audioTranscript`), minamarkahan ito ng guardrail bilang `videoBridgeObserved` at gumagawa ito ng redacted shadow ng video description — isang kaparehong rendering kung saan pinapalitan ang free-text body ng bawat cue ng `[redacted-video-transcript]`, sa pamamagitan ng pagpapalit sa structured cue field bago buuin ang string (hindi kailanman sa pamamagitan ng pag-parse sa flattened text, kaya walang cue content — adversarial man o ordinaryo, kabilang ang mga body na may `]` gaya ng `[inaudible]`/`[music]` — ang maaaring manatili). Pinapalitan ng persisted call-log request body ang bawat text part na hinango sa video ng redacted shadow na iyon, na itinutugma batay sa pagkakapantay ng content; muling binabasa ang `fullText` anchor mula sa natapos na pre-call guardrail payload, kaya nananatiling matagumpay ang pagtutugma kahit baguhin sa ibang pagkakataon ng mga chain guardrail (ang PII at credential masker, na may priorities 10/95) ang description text nang nasa lugar na ito at kahit baguhin ng system-prompt/handoff/memory injection ang pagkakaayos ng message array. Hindi nagbabago ang body na ipinapadala upstream sa modelo. Ang isang naobserbahang request ay hindi rin nagpo-populate ng durable Memory (nilalaktawan ang parehong request- at response-derived extraction), kaya hindi maaaring ma-echo ng sariling reply ng modelo ang transcript text papunta sa Memory.

**Mga raw video field (#12430).** Kapag naka-enable ang bridge at hindi alam o wala ang native video support, ina-activate din ng mga tinukoy na `transcript`/`audioTranscript` field ang `videoBridgeObserved`, kahit matapos ang pagkabigo ng description o maabot ang limitasyon ng `maxVideos`. Binibilang ang `null` at mga empty string; hindi binibilang ang mga field na wala at ang metadata na hindi video. Nirere-dact ng mga retained copy ang mga field na ito o inaalis ang request, at nilalampasan ang caches/Memory.

Sa mga fallback path na iyon, nagiging mga sinusuportahang `text`/`input_text`
part ang mga valid na caller cue sa halip na mga hindi standard na field ng provider. Parehong nananatiling hindi pinagkakatiwalaang `client` observation ang mga track na ibinigay ng request, na may tahasang babala na hindi inilarawan ang video at hindi na-verify ang mga timestamp laban sa media. Nalalapat nang magkakasama sa dalawang track ang kasalukuyang 256-cue/64-KiB na kabuuan at mga budget sa bawat cue;
dapat magkasya ang mga timestamp sa 600-second ceiling ng broker at sa anumang ibinigay na focus
window. Itinatapon ang mga invalid na track, hindi ipinapasa bilang arbitrary text; maaari pa ring gamitin ang valid na sibling maliban kung lumampas sa pinagsamang budget. Walang idinadagdag na media fetch o transcription ang fallback na ito.
Inaalis ang mga transcript extension field mula sa fallback video carrier at sa mga
`video_url`/`source` object nito. Nananatiling mahigpit ang OpenAI wire allowlist; nananatiling available ang mga unknown-native video carrier at pinananatili ng mga kilalang text-only target ang mga ligtas na marker. Pinoprotektahan ng structured redaction shadow ang idinadagdag na transcript text, habang nananatiling hindi nagbabago ang request na pagmamay-ari ng caller. Pinananatili ng mga target na may native support at mga bridge na naka-disable ang dati nilang bypass behavior.

Gumagamit ang mga karagdagang retained copy ng parehong observed-request signal. Sa raw
pre-guardrail client-request snapshot, in-memory pending request, at early rejected-request log, istruktural na pinapalitan ang mga transcript field sa mga video part; nire-redact sa persisted-request-body sink ang mga string prompt na binuo ng mga pipeline stage at context handoff. Tinitiyak ng persisted na `video_content_removed` marker na magfa-fail closed ang pagpapatuloy gamit ang `previous_response_id` sa halip na buuin muli ang text na sadyang itinapon. Kung mawalan ang isang observed request ng per-part redaction shadow bago ang pag-log, o kahit isa sa maraming video shadow ay hindi maitutugma matapos ang mga susunod na pagbabago sa request, ganap na inaalis ang retained request body sa halip na magpanatili ng transcript na bahagyang na-redact.

Para sa isang naobserbahang request, maaaring magbanggit ang isang model response ng anumang bahagi ng transcript nang walang structured cue boundary. Kaya ang persisted call-log na `responseBody` ay pinapalitan ng omission marker; hindi pinananatili ang detalyadong pipeline artifact (na maaaring maglaman ng upstream/client bodies at stream chunks). Nilalampasan ng semantic, idempotency, at reasoning-replay caches ang mga read at write para sa request na iyon. Nanatiling hindi nagbabago ang provider request at response na nakikita ng client. Inaalis ang mga maagang keepalive byte mula sa temporary buffer kapag hindi isinama ang detalyadong artifact. Ang malformed EventStream warning ng Kiro ay nag-uulat lamang ng bilang ng payload byte, at hindi kailanman ng mga nilalaman nito o ng raw error ng JSON parser.
Hindi nito sinasabing na-audit na ang bawat diagnostic ng hiwalay na provider/plugin; sinusubaybayan ang mas malawak na retained-sink sweep sa #11658.

Ang lifecycle ng internal na `/api/modality-bridge/video/drilldown` ay hiwalay na loopback/token-authenticated cache substrate. Nangangailangan din ang bawat operation ng canonical opaque principal ID. Bago paganahin ang isang production caller, dapat nitong i-derive ang ID na iyon mula sa authenticated tenant at hindi kailanman mag-forward ng value na pinili ng client. Iniuugnay ng mga cache key ang principal na iyon sa canonical session at video-reference IDs, iniimbak lamang ang mga key na derived mula sa SHA-256, at nililimitahan ang parehong mga read at deletion sa principal na iyon. Nag-iimbak ang cache ng hanggang 16 derived JPEG frame bawat entry, ine-expire ang mga ito makalipas ang sampung minuto, at sumusuporta sa bounded na `start`/`end` reads o tahasang session deletion.

Nililimitahan ang bawat principal sa 16 entry at 64 MiB ng canonical JPEG data. Hiwalay ang mga limitasyong ito sa global na 64-entry/256 MiB ceiling: ang pressure sa quota ng principal ay nag-e-evict lamang ng least-recently-used entry ng principal na iyon bago isaalang-alang ang global LRU eviction. Nililinis ang mga expired entry mula sa principal at global accounting kapag may cache activity, habang hindi nagko-commit ng partial replacement ang cancellation at validation failure.

Tinatanggihan ng cache ang non-canonical Base64, sobrang padding, non-JPEG media, malformed o truncated JPEG, at mga JPEG na naglalabas ng warning sa bounded full-image `sharp` decode. Nire-re-encode nito ang bawat tinanggap na image bilang canonical JPEG, dini-derive ang width at height mula sa decoded bytes sa halip na umasa sa caller fields, at itinatapon ang anumang trailing polyglot bytes sa halip na panatilihin ang mga ito. Ang bounded canonical compressed buffer lamang ang sinisingil sa parehong quota. Kasama sa JSON wire limit ang Base64 overhead para sa 32 MiB decoded-input ceiling. Itinatala ng bawat nakaimbak na derivation ang validated JPEG format/resolution nito, sampling policy, derivation version, creation time, server-computed content hash, at hashed parent reference kasama ang parent-content hash ng pinagkakatiwalaang caller. Sinusuri ang cancellation sa pagitan ng asynchronous decode/hash phase bago ang atomic cache commit.

Muling ginagamit ng production producer ang mga dati nang derived broker frame lamang pagkatapos ng matagumpay na visual analysis, nang walang ikalawang video download/extraction. Kinakailangan nito ang operator na `modalityBridgeVideoDrilldownEnabled=true`, mahigpit na `drilldown: true` bawat part, at isang authenticated API-key record ID. Hindi kailanman nagtatatag ng ownership ang mga principal/session value na idineklara ng client. Kung wala ang lahat ng tatlong kondisyon, hindi ito nagha-hash, nagre-resize, o nag-iingat ng karagdagang frame. Pinananatili ng retention failure ang magagamit na visual response. Nilalampasan ng mga consented request ang buong-video result cache upang hindi kailanman mag-replay ng mga handle ang mga naka-cache na result.

Naglalantad ang matagumpay na JSON at SSE response ng hanggang apat na opaque handle sa bounded na `x-omniroute-video-drilldown` header. Maaaring basahin ng mga awtorisadong browser origin ang header na iyon nang hindi pinalalawak ang CORS origin policy. Ginagamit ng mga bagong handle ang `v1.<32-byte random base64url
token>`, at mga SHA-256 hash lamang ng mga ito ang pinananatili ng registry. Tumatanggap din ang reader/header parser ng mga legacy na 64-hex token. Ang authenticated public consumer ay
`GET /api/v1/video-bridge/drilldown?handle=...`, na hiwalay na kinokontrol ng
`modalityBridgeVideoDrilldownRemoteEnabled=true`. Binabawi ng tahasang persisted false ang access kahit naka-enable ang legacy na `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env fallback. May katumbas na legacy na `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` fallback ang production retention. Parehong naka-off bilang default ang dalawang fallback.

Dini-derive ng consumer ang ownership mula sa authenticated key at ipinapatupad ang key policy: kapwa kabilang ang GET at DELETE sa kategoryang `video` endpoint, kabilang ang mga alias na `/v1` at `/api/v1`. Dapat isama ng mga key na may nonempty endpoint allowlist ang `video`; nananatiling compatible ang mga unrestricted key. Ibinabalik ng consumer ang parehong 404 para sa unknown, expired, at mga handle ng ibang key. Tumatanggap ito ng `variant=preview|standard|detail` (maximum JPEG dimension na 320/640/1280, at hindi kailanman pina-uunat), `limit=1..8` (o ang legacy na `frames` alias, ngunit hindi pareho), zero-based `page`, at opsyonal na `start`/`end` focus seconds. Tinatanggihan ang duplicate query key at mga reversed focus window. Ang bawat ibinalik na variant ay may hash ng aktuwal nitong content at metadata ng aktuwal na resolution, na naka-link sa retained source. Dini-derive ang mga variant sa read sa halip na itago bilang karagdagang retained copy. Nililimitahan sa 32 MiB ang JSON response, kasama ang Base64/envelope; nagbabalik ng 413 ang sobrang laking page at dapat humiling ang client ng mas kaunting frame. Sinusuri ng mga read ang cancellation sa paligid ng bawat resize at muling sinusuri ang validity ng handle bago magbalik. Idempotent ang `DELETE` ng owner; ang deletion o TTL expiry ay nagpapalaya sa retained source at usage accounting.

Process-local ang shared store: nag-e-expire ang mga handle sa restart at hindi naililipat sa pagitan ng magkakahiwalay na OmniRoute process. Inilalantad ng management stats ang effective retention/remote policy at pinagsama-samang retained entries/bytes lamang, at hindi kailanman ang media, reference, principal ID, o handle. Ipinapakita ng Video settings panel ang mga value na iyon at maaaring mag-persist ng parehong consent switch. Ang implementation documentation na ito ay hindi katibayan ng live deployment o promotion; hiwalay na sinusubaybayan ang real-model acceptance.

Ang mga frame ay binibigyan ng caption nang sunod-sunod gamit ang naka-configure na Video model. Ang walang laman na
Video override ay gumagamit ng setting ng Vision; kung parehong walang laman, pinipili ng Vision
auto-router ang aktuwal na model na may kakayahang magproseso ng vision. Pinapalitan ng matagumpay na mga caption
ang orihinal na bahagi gamit ang stable na prefix na `[Video description:` na nagmamarka rin sa teksto bilang obserbasyong nagmula sa media na hindi dapat pagkatiwalaan at nagsasabi sa mga downstream model na huwag sundin ang mga instruksyong matatagpuan sa media. Kasama sa mga susi ng frame-caption cache ang mga JPEG byte, prompt, timestamp, at aktuwal na model; naka-cache lamang ang matagumpay na mga caption. Pinananatili ng mga cache entry ang aktuwal na matagumpay na producer model, kabilang ang fallback model; nag-uulat ang bridge ng `mixed` kapag magkakaibang model ang gumawa ng iba't ibang frame. Sa cache hit, ginagamit muli ang identity ng producer sa halip na lagyan ito ng label batay sa hiniling na routing plan. Ang result cache para sa buong video ay gumagamit bilang susi ng bawat input na nagbabago sa output — prompt, aktuwal na model, sampling policy, bilang ng mga frame, semantic analysis mode, SHA-256 fingerprint ng normalized focus hint, focus window, `transcript`,
`audioTranscript`, at contact-sheet flag — kaya ang pagbabago sa alinman sa mga dimensyong iyon ay cache miss, at hindi kailanman muling paggamit ng lipas na resulta. Tahasang kasama rin sa result-cache key at metadata ang bersyon ng visual dedup policy, threshold, at limitadong bilang ng candidate frame; kaya hindi maaaring gamitin ng pagbabago sa policy ang lipas na paglalarawan ng buong video. Pinananatili ng Result-cache v4 metadata ang mode at fingerprint, at hindi kailanman ang raw user task. Iniuulat ng guardrail metadata ang parehong hiniling at aktuwal na analysis mode; ang hiniling na `focused` mode na walang magagamit na text mula sa user ay iniuulat bilang epektibong `full`.

Kinukuha ng guardrail ang bawat sinusuportahang bahagi ng video ngunit hindi naglalarawan ng higit sa
`modalityBridgeVideoMaxVideos`. Para sa target na napatunayang may
`supportsVideo === false`, nagiging tahasang ligtas na mga text marker ang mga nabigo at lumampas sa limitasyong video upang walang raw video na manatili. Kapag hindi alam ang capability, pinananatili ng mga bahaging iyon ang kanilang video carrier; anumang fallback transcript ay sumusunod sa limitadong text conversion sa itaas. Nilalampasan ng mga target na may `supportsVideo === true` ang bridge.
Naipapasa ang client request abort signal sa download, broker queue,
subprocess, at mga caption call; humihinto ang mga abort sa pagitan ng mga video at hindi kailanman awtomatikong gumagamit ng raw media kapag nabigo ang guardrail.

Ang mga runtime setting ay naka-back sa DB at bine-validate gamit ang Zod:

| Key                                 | Default     | Range / behavior                                                                                                                                       |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`     | Opsyonal na runtime, kailangang hayagang i-opt in                                                                                                      |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | Pinananatili ng `full` ang mga generic na caption; gumagamit ang `focused` ng limitado at hindi mapagkakatiwalaang pinakabagong konteksto mula sa user |
| `modalityBridgeVideoModel`          | `""`        | Namamana ang model ng Vision Bridge                                                                                                                    |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                                                   |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, o proportional na `segment_aware`; kapag nabigo ang detector, gumagamit ng `uniform`                                         |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                                                    |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                                                         |

Ang mga legacy na naka-persist na Video timeout value na higit sa 120 segundo ay nililimitahan sa
deadline ng broker; tinatanggihan ang mga bagong write ng setting na lalampas sa limitasyong iyon.
Ang `GET /api/modality-bridge/video/runtime` ay nangangailangan muna ng pinagkakatiwalaang stamped loopback
locality bago ang authentication o runtime probing, at pagkatapos ay nangangailangan ng management
auth. Ibinabalik lamang nito ang `available`, mga sanitized na bersyon ng FFmpeg/ffprobe, at isang nakapirming
reason kapag hindi available ang runtime. Ang internal extraction endpoint ay hindi isang public upload API: kapag puno ang queue, nagbabalik ito ng `503` kasama ang `Retry-After`, ang pagdiskonekta ng caller ay nagbabalik ng `499`, at ang nakapirming deadline ng broker ay nagbabalik ng `504`. Nagdaragdag ang mga converted response ng
`video->text;model=<visionModel>;parts=<videos>` sa sentral na
`x-omniroute-modality-bridge` header nang hindi inaalis ang mga segment ng Vision o Audio.

### PII Masker (`piiMasker.ts`)

Tumatakbo sa **parehong** stage.

- Ang **`preCall`** ay nagko-clone ng payload, binabagtas ang `system`, `messages`, `input`, at
  `prompt` (kabilang ang mga plain string item), at inilalapat ang `processPII()` (mula sa
  `@/shared/utils/inputSanitizer`) sa mga string na field na `content`/`text`. Kapag
  `PII_REDACTION_ENABLED=true`, nire-redact ang natukoy na PII sa outbound
  payload. Hiwalay ito sa `INPUT_SANITIZER_MODE` (na kumokontrol lamang sa policy para sa prompt injection). Kapag naka-off ang redaction, itinatala ng call ang bilang ng mga detection nang hindi binabago ang content.
- Ang **`postCall`** ay nagsasagawa ng deep clone sa response, nagpapatakbo ng `sanitizePIIResponse()` kasama ang Responses-API-shape masker (`maskResponsesOutput` — sumasaklaw sa
  `output_text` at `output[].content[].text`). Kung may naganap na redaction, pinapalitan ng binagong response ang orihinal.

Hindi kailanman nagba-block ang guardrail; nag-a-annotate lamang ito (`meta.detections`,
`meta.redacted`) o nagsusulat muli.

**Nababaliktad na vault (`PII_REVERSIBLE_VAULT_ENABLED`, default na `false`).** Kapag parehong naka-enable ang
`PII_REDACTION_ENABLED` at `PII_REVERSIBLE_VAULT_ENABLED` (DB override >
env > default, binabasa nang isang beses bawat request), nagbubukas ang
`handleChat` ng isang vault bawat client
request (`src/lib/pii/requestTokenVaultScope.ts`) at ipinapasa ito sa pre-call
pass bilang `GuardrailContext.tokenVault`. Sa halip na `[EMAIL_REDACTED]`,
nagsusulat ang masker ng mga surrogate token gaya ng
`<<PII_EMAIL_QWERTYUI_1>>`, para sa built-in, validated (GDPR/POPIA), at custom
rules. Ang nonce ay 8 random na uppercase na letra bawat request, at ang
parehong value ay nakakakuha ng parehong token sa loob ng request. Ang masker
lamang ang gumagawa ng mga token: tumatakbo ang prompt-injection guard at
`/api/guardrails/test` nang walang vault at pinananatili ang mga placeholder.

- Mga token lamang ang nakikita ng provider, bawat combo leg, retry, fusion panel member at fusion judge. Isang beses lamang ibinabalik ang mga token, sa 2xx response na lumalabas mula sa `handleChat`: bawat field sa na-parse na SSE (nalulutas pa rin ang token na nahati sa magkakaibang event; JSON-escaped ang mga tool-call argument) o bawat field sa isang JSON body, na muling kinukuwenta ang `Content-Length`. Ibinabalik ang content at reasoning text at mga tool-call argument. Pinananatili ng mga error body (4xx/5xx) ang mga token.
- Nananatiling pribado ang mga failure: kung mabigo ang paggawa ng token o tanggihan ng vault ang isang value (1000 entry, 256 character bawat value, 64 KB sa kabuuan), placeholder ang isinusulat; ang token na hindi malutas ng vault, o ang restore na mabigo, ay nananatiling literal at bilang lamang ang nilala-log. Walang timer at global state ang vault; nililinis ito kapag natapos, nakansela o nag-error ang response stream.
- Kapag gumawa ng mga token ang isang request, nilalaktawan ang memory extraction, idempotency save at parehong semantic-cache write, dahil walang susunod na request na makalulutas sa mga token na iyon. Sa mga call log, may mga token ang provider request at response; raw client input pa rin ang naka-log na client request body, gaya ng plain redaction.
- Gumagamit ang mga token ng random na nonce bawat request, kaya nagbabago ang prompt prefix sa bawat turn: hindi nagkakaroon ng hit ang provider-side prompt caching para sa mga masked turn, at ang token na bumalik sa susunod na turn (halimbawa sa pamamagitan ng `previous_response_id`) ay pagmamay-ari ng lumang request at nananatiling literal.

#### Pagpili ayon sa uri, mga custom pattern at detection counter

**Dashboard → Settings → Security → PII masking** ang pumipili kung _ano_ ang nami-mask. Hindi nito ine-enable ang masking: ang mga iyon ay `PII_REDACTION_ENABLED` (request) at `PII_RESPONSE_SANITIZATION` (response + SSE) pa rin, at parehong naka-off bilang default.

- **Pagpili ayon sa uri** — nakalista ang mga built-in id sa
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Ang hindi pagtatakda ay nangangahulugang bawat uri (ang asal bago magkaroon ng setting na ito). Ang `ssn_us` pattern ng request engine ay tumutugma sa `ssn`. Ang mga template (Minimal, Standard, Financial, Brazilian, USA, GDPR, POPIA, Full) ay naglalagay lamang ng mga checkbox sa UI.
- **Mga identifier ng GDPR at POPIA** — labindalawang built-in id na sumasaklaw sa mga personal identifier ng EU at South Africa (talahanayan sa ibaba). Nasa iisang table ang mga regex, validator at jurisdiction tag ng mga ito, `src/shared/utils/piiPatterns.ts`, na ginagamit ng response sanitizer (`src/lib/piiSanitizer.ts`) at request masker (`src/shared/utils/inputSanitizer.ts`). Nare-redact lamang ang isang match kapag tinanggap ito ng validator; hindi kailanman sapat ang simpleng magkakasunod na digit. Ang operator na nag-save ng pinakitid na selection bago pa umiral ang mga id na ito ay nagpapanatili sa dating asal nito hanggang sa ma-tick ang mga bagong id.
- **Mga custom pattern** — hanggang 20 regex o wildcard pattern (`*` = hanggang 64 character na hindi whitespace, `?` = isa). Nagiging `[CUSTOM_REDACTED]` ang mga match. Dumaraan ang bawat pattern sa `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): hanggang 500 character lamang, limitado ang mga flag sa `g i m s u`, kailangang ma-compile, kailangang pumasa sa `safe-regex` (catastrophic backtracking), at hindi dapat tumugma sa walang laman na string o redaction placeholder. Tinatanggihan ang pattern na pumalya kapag sine-save at kapag tine-test, at nilalaktawan sa runtime ang naka-store na row na pumalya sa halip na i-compile. Tumatakbo lamang ang mga custom pattern kapag naka-on ang masking.
- **Mga detection counter** — mga bilang ayon sa uri (hindi kailanman ang mga value na na-match), na itinatago sa memory at nire-reset sa restart (`src/lib/pii/piiDetectionStats.ts`). Nadadagdagan lamang ang mga ito kapag naka-on ang masking.

Nasa `key_value` table ang mga setting (namespace na `pii_settings`,
`src/lib/db/piiSettings.ts`) at binabasa sa pamamagitan ng 1 s cache. API:

| Paraan | Path                     | Layunin                                                                     |
| ------ | ------------------------ | --------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Kalagayan ng flag, `enabledTypes`, `customPatterns`, mga detection counter  |
| `PUT`  | `/api/settings/pii`      | Palitan ang `enabledTypes` (`null` = lahat) at/o `customPatterns`           |
| `POST` | `/api/settings/pii/test` | Dry-run ng isang pattern laban sa sample na hanggang 8 KB; walang sine-save |

Lahat ng tatlo ay nangangailangan ng management auth at vine-validate ang body
gamit ang Zod (`src/shared/validation/schemas/piiSettings.ts`). Kapag naka-disable
ang login (`requireLogin=false`), bukas ang `GET` at test endpoint, ngunit kailangan
pa rin ng `PUT` ng dashboard session, API key na may `manage` scope, `oma_` access token
na may write scope o mas mataas, o CLI token o internal-service token na ipinadala
mula sa loopback.

#### Mga identifier ng GDPR (EU) at POPIA (South Africa)

| Id                  | Identifier                    | Pagpapatunay                                                                                  |
| ------------------- | ----------------------------- | --------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                          | Kilalang bansa, eksaktong haba para sa bansang iyon, ISO 13616 MOD-97-10                      |
| `eu_vat`            | Numero ng VAT sa EU           | Kilalang prefix ng estado sa EU at format ng numero ng estadong iyon (walang VIES lookup)     |
| `es_dni_nie`        | Spanish DNI / NIE             | Control letter (value mod 23); ang NIE ay `X/Y/Z` + 7 digit                                   |
| `it_codice_fiscale` | Italian Codice Fiscale        | Control letter mula sa mga talahanayan ng odd/even position                                   |
| `pl_pesel`          | Polish PESEL                  | Weighted checksum at naka-encode na petsa ng kapanganakan na umiiral                          |
| `nl_bsn`            | Dutch BSN                     | 11-proof (weights 9..2, -1)                                                                   |
| `de_steuer_id`      | German Steuer-ID              | ISO 7064 Mod 11,10 kasama ang mga panuntunan sa estruktura ng digit (walang nauunang 0)       |
| `se_personnummer`   | Swedish personnummer          | Luhn sa huling sampung digit at kapani-paniwalang petsa ng kapanganakan (10 o 12 digit)       |
| `za_id`             | Numero ng ID sa South Africa  | Luhn sa lahat ng 13 digit, wastong buwan/araw ng kapanganakan, citizenship digit na 0 o 1     |
| `za_phone`          | Telepono sa South Africa      | Prefix na `+27` / `27`, o pambansang anyong `0..` na isinulat na may space o hyphen           |
| `za_vat`            | Numero ng VAT sa South Africa | 10 digit na nagsisimula sa `4` **at** may "VAT" / "BTW" sa 48 character bago nito             |
| `za_tax_ref`        | Tax ref. sa South Africa      | 10 digit na nagsisimula sa `0`-`3`, Luhn, **at** may "tax" / "SARS" sa 48 character bago nito |

Dahil nagkakabanggaan ang mga format na puro digit sa mga order number, build
number at timestamp, kailangan ng keyword cue ang mga pinakamahina
(`za_vat`, `za_tax_ref`), at hindi itinuturing na numero ng telepono sa South Africa
ang isang sampung-digit na numerong `0..` lamang. Hindi tumutugma ang mga IBAN na
may pagitan (`GB29 NWBK ...`). Sa streaming path, sa kasalukuyang chunk lamang
hinahanap ang cue. Nauuna ang mga id sa mga generic na pattern ng telepono, kaya
pinananatili ng isang napatunayang identifier ang sarili nitong placeholder
(`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Pinipili ng mga template na
`gdpr` at `popia` ang mga EU at South African id ayon sa pagkakabanggit. Nananatiling
opt-in ang mismong masking (Hard Rule #20): walang binabago rito sa default ng
feature flag.

### Prompt Injection (`promptInjection.ts`)

Tumatukoy ng mga kalabang estruktura sa content na ibinigay ng user at ipinapatupad
ang naka-configure na policy. Ang pag-uugali ay kinokontrol ng mga environment
variable at opsyon ng constructor:

| Setting            | Env var                                                                                               | Default | Epekto                                                                                                                                                                                                                |
| ------------------ | ----------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Naka-enable        | `INPUT_SANITIZER_ENABLED`                                                                             | `true`  | Kapag `false`, agad na humihinto ang guardrail.                                                                                                                                                                       |
| Mode               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`  | Patakaran sa injection: `block`, `warn`, o `log`. (Tinatanggap ang `redact` para sa back-compat ngunit **hindi** nito inaalis ang injection text; kinokontrol ng `PII_REDACTION_ENABLED` ang rewrite ng request PII.) |
| Threshold ng block | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Pinakamababang severity na kinakailangan para mag-block. Observe-only ang Medium sa default.                                                                                                                          |

**Precedence ng mode** (`getMode`): `options.mode` ng caller →
`INJECTION_GUARD_MODE` **DB feature-flag override** (Dashboard → Mga Setting →
Mga Feature Flag) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Kaya nauuna ang dashboard override sa mga env var, at kinokontrol ng
Feature Flags UI nang live ang tumatakbong guard (walang restart). Fail-safe ang
DB read: kung magkamali ito, babalik ang guard sa behavior na batay sa env, at kapag
walang override, kapareho ang behavior ng env-only resolution.

Mga pinagmumulan ng detection:

1. `sanitizeRequest()` mula sa `@/shared/utils/inputSanitizer` (shared detector
   set na ginagamit sa ibang bahagi ng pipeline).
2. Built-in na `DEFAULT_GUARD_PATTERNS` (kasalukuyang `system_override_inline` at
   `markdown_system_block`, parehong may `high` severity).
3. Opsyonal na `customPatterns` na ipinapasa sa mga opsyon ng constructor (mga string,
   regex, o mga record na `{ name, pattern, severity }`).

Kapag `mode === "block"` **at** may kahit isang detection na umabot sa threshold
ng severity, ibinabalik ng `preCall` ang `{ block: true, message: "Request rejected:
suspicious content detected" }`. Sa mga mode na `warn`/`log`, nagla-log ang
guardrail ngunit pinapayagan ang call. Ini-export din ang shared helper na
`evaluatePromptInjection()` para sa mga caller na kailangang mag-evaluate ng mga
prompt nang hindi dumadaan sa registry.

**Saklaw ng pag-scan (v3.8.20):** sinusuri lamang ng detector ang **unang 16 KB** ng
pinagdugtong na prompt text — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) sa
`src/shared/utils/inputSanitizer.ts`. Parehong nagsasagawa ang
`detectInjection()` at `evaluatePromptInjection()` ng `slice(0, MAX_INJECTION_SCAN_BYTES)`
bago patakbuhin ang pattern loop. Ang mga injection directive ay karaniwang nasa itaas ng
input, kaya nililimitahan nito ang regex CPU/GC sa mga payload na daan-daang KB ang laki
nang hindi pinapahina ang detection (tingnan ang #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Tumatakbo sa **parehong** stage, at huli sa default chain (priority `95`). Nire-redact nito
ang mga kilalang pattern ng API key / secret token mula sa outbound payload (nilalaman ng
mensahe, mga argumento ng tool-call, mga resulta ng tool) **at** sa tugon ng provider, upang
ang credential na nai-paste sa prompt (o naibalik ng resulta ng tool) ay hindi ma-leak sa
upstream provider o pabalik sa client.

- **Opt-in lamang**, kapareho ng convention para sa PII redaction (malapit sa Hard Rule #20):
  naka-disable maliban kung `settings.credentialRedactionEnabled === true` **o**
  `CREDENTIAL_REDACTION_ENABLED=true`. Kapag naka-off ito, walang ginagawa ang guardrail —
  hindi ito kailanman nagba-block at hindi kailanman nagre-rewrite.
- Binabagtas ng `redactCredentials()` ang buong payload/response tree (`walkValue()`,
  ligtas laban sa prototype pollution, at ligtas sa cycle sa pamamagitan ng `WeakSet`) at
  pinapalitan ang mga tumugmang value ng placeholder na `[REDACTED:<type>]`, habang kino-clone
  lamang ang mga branch na aktuwal na nagbago.
- Saklaw ng `CREDENTIAL_PATTERNS` ang mga key ng LLM provider (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), mga token ng VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), mga payment key (Stripe, Square), mga cloud key
  (AWS access key, Twilio, SendGrid, Mailgun), mga private key / JWT,
  mga connection string na may credential (`mongodb://user:pass@...`, atbp.), at isang
  generic na pattern para sa header-value ng `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Ang mga key na hugis-header (`authorization`, `x-api-key`, `api-key`, `apikey`) ay
  nire-redact ayon sa structure (value lamang, pinapanatili ang scheme prefix gaya ng
  `Bearer `/`Basic `) sa halip na sa pamamagitan ng generic text regex.
- Hindi kailanman nagba-block ang guardrail; nagre-rewrite lamang ito
  (`modifiedPayload` / `modifiedResponse`) at nag-a-annotate
  (`meta.credentialsRedacted`, `meta.count`).

Regression guard: `tests/unit/credential-masker-guardrail.test.ts`.

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

## Pagkakasunod-sunod ng Pagpapatupad

Para sa bawat kahilingang dumadaan sa `src/sse/handlers/chat.ts` at
`open-sse/handlers/chatCore.ts` (mga route ng chat-family na nakalista sa
[Coverage and limits](#coverage-and-limits)):

1. Binubuo ng `resolveDisabledGuardrails(...)` ang listahan ng lalaktawan mula sa API key, body,
   at mga header.
2. Pinapatakbo ng `guardrailRegistry.runPreCallHooks(body, ctx)` ang mga guardrail sa pataas na ayos
   ng prayoridad:
   - Itinatala bilang `skipped` ang mga hindi pinaganang guardrail.
   - Maaaring muling isulat ng `preCall` ng bawat guardrail ang payload sa pamamagitan ng `modifiedPayload`.
   - Kapag naging `block: true` ang unang guardrail, agad na itinitigil ang chain at nagbabalik ang handler ng tugon sa pagtanggi ng guardrail.
3. Dumadaloy ang (posibleng muling naisulat na) payload sa combo routing at upstream
   dispatch.
4. **Non-streaming lang:** kapag nabuo na ang tugon,
   pinapatakbo ng `guardrailRegistry.runPostCallHooks(...)` ang parehong chain sa tugon. Kapag naging `block: true` ito, itinatapon ang upstream response at nagbabalik ng HTTP 400. Ganap na nilalaktawan ng mga streamed response ang hakbang na ito.
5. **Reversible vault lang:** kapag gumawa ng mga token ang kahilingan, ibinabalik ng `handleChat`
   ang mga ito sa 2xx response na ibinabalik nito, pagkatapos ng post-call hooks at ng streaming PII transform, kaya nakikita ng `PII_RESPONSE_SANITIZATION` ang mga token at PII na ginawa ng modelo, ngunit hindi kailanman ang orihinal na naibalik.

Ang mga guardrail na nag-throw ay itinatala bilang `error: <message>` at nilalagyan ng log sa pamamagitan ng
`logger.warn`, ngunit nagpapatuloy ang chain — fail-open ito ayon sa disenyo.

## Saklaw at mga limitasyon

Nakakabit lamang ang guardrail registry sa pipeline ng chat. Ang mga limitasyong ito ay
itinakda ng `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` at
`tests/unit/guardrail-pipeline-characterization.test.ts`; sadyang i-update ang
mga test na iyon kapag nagbago ang behavior.

### Kung saan tumatakbo ang mga hook

| Hook / control                      | Tumatakbo sa                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                   | Mga request na pinoproseso ng `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (at `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*`, at ang Telegram chat proxy. Kasama rin ang dashboard test endpoint na `/api/guardrails/test`. Ang pre-call block ay nagbabalik ng HTTP 400. |
| `runPostCallHooks`                  | Mga **non-streaming** na tugon ng chat lamang (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Hindi ito naaabot ng mga streamed response.                                                                                                                                                                                                                                                                                                         |
| Streaming PII                       | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), na ipinapasa sa `streamingPipeline.ts` kapag naka-on ang `PII_RESPONSE_SANITIZATION`. Hindi ito guardrail, kaya hindi ito naaapektuhan ng mga disable channel.                                                                                                                                                                                                                              |
| Reversible PII vault                | Mga request na pinoproseso lamang ng `handleChat`, kapag naka-on ang `PII_REDACTION_ENABLED` at `PII_REVERSIBLE_VAULT_ENABLED`. Ang mga token ay ginagawa ng pre-call na `pii-masker` at nire-restore sa paglabas ng `handleChat` (`src/lib/pii/requestTokenVaultScope.ts`). Kapag na-disable ang `pii-masker` para sa isang request, walang ginagawa na token.                                                                                           |
| Injection-guard middleware (legacy) | Lahat ng `/v1` route na naglalaman ng prompt, kasama ang chat-family (tingnan ang [saklaw ng route](#injection-guard-route-coverage--red-team-phase-8--block-d)). Mga prompt injection lamang.                                                                                                                                                                                                                                                            |

### Ano ang hindi saklaw

- **Mga route para sa media, embedding at data** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) ay hindi kailanman umaabot sa registry. Walang
  PII masking, credential masking o modality bridge na tumatakbo roon. Ang
  tanging pagsusuri sa mga ito ay ang legacy injection-guard middleware.
- **Ang mga streamed response** ay walang post-call guardrail: walang
  `pii-masker` o `credential-masker` na post-call, at walang post-call block. Ang streaming PII
  transform lamang ang inilalapat (kapag naka-on ang `PII_RESPONSE_SANITIZATION`). Ang credential
  na isinama pabalik sa isang streamed response ay hindi nire-redact.
- **Mga disable channel kumpara sa middleware (ayon sa disenyo):** sinusuri ng middleware ang prompt injection gamit ang sarili nitong tawag sa `evaluatePromptInjection()`, nang hindi ipinapasa ang anumang listahan ng disable na kontrolado ng tumatawag. Ang `block` mode ay isang mandatoryong boundary na hindi maaaring lampasan ng mga disable na kontrolado ng tumatawag, kabilang ang mga route ng chat-family
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Ang pag-disable sa
  `prompt-injection` ay nilalaktawan lamang ang registry guardrail.

### Ano ang nakakakita sa isang response bago ang post-call

Sa non-streaming path, ang pagkakasunod-sunod ay: memory extraction → built-in tool
execution → post-call guardrails → post-call block exit → semantic-cache store.

- **Nakikita ng memory extraction** at **tool execution** ang response bago ito
  ma-rewrite o ma-block ng mga post-call guardrail. Mula noong
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), ipinapadaan ng memory
  extraction ang na-extract na text sa `sanitizePII` kapag naka-on ang
  `PII_RESPONSE_SANITIZATION` (sa streaming at non-streaming), ngunit ang response na
  bina-block kalaunan ng post-call ay naialok pa rin sa memory at mga tool.
- **Ini-store ng semantic cache** ang response pagkatapos ng post-call, kaya ini-store
  nito ang na-rewrite na response, at hindi kailanman naka-cache ang naka-block na response. Ang mga
  cache entry ay naka-key bawat API key.

## Configuration

Mga environment variable na binabasa ng mga built-in na guardrail:

| Variable                              | Ginagamit ng               | Epekto                                                                                                                     |
| ------------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Itakda sa `false` upang ganap na i-disable ang detection.                                                                  |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Patakaran sa injection: `warn`, `block`, o `log`. Hindi nire-rewrite ng legacy value na `redact` ang injection text.       |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Mode para sa injection guard; isa rin itong DB feature flag na **nino-override** ang mga env var (DB > ENV).               |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Pinakamababang severity na nire-reject ng `MODE=block`: `high` (default), `medium`, o `low`.                               |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | Legacy alias para sa `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                    |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Kapag `true`, nire-redact ang PII ng request (hiwalay sa injection mode).                                                  |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | Kapag kasama ng `PII_REDACTION_ENABLED`, gumagawa ng mga reversible token at nire-restore ang mga ito sa mga 2xx response. |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream)  | Kinokontrol ang behavior ng masker sa panig ng response.                                                                   |

Binabasa ng mga guardrail ng Modality Bridge ang runtime config mula sa DB-backed settings
store (`getSettings()`), hindi mula sa mga env var. Ang mga pangunahing key ng Vision ay
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, at
`modalityBridgeCacheMaxEntries`. Tinatanggap lamang ang mga legacy
`visionBridge*` key bilang nakadokumentong one-cycle read
fallback; ginagamit ng mga pagsusulat mula sa dashboard ang mga pangunahing key. Nasa
`src/shared/constants/modalityBridgeDefaults.ts` ang mga default at ang fallback
resolver, habang pinananatili ang mga legacy constant sa `src/shared/constants/visionBridgeDefaults.ts`.

Ginagamit ng Audio ang `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, at `modalityBridgeAudioMaxClips`, kasama ang mga shared
`modalityBridgeCache*` setting. Walang legacy-key fallback ang Audio dahil ipinakilala ang mga key na ito kasama ng schema ng Modality Bridge.

Ginagamit ng Video ang `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, at
`modalityBridgeVideoTimeout`, kasama ang mga shared `modalityBridgeCache*` setting.
Naka-disable ito bilang default dahil mga opsyonal na operational dependency ang FFmpeg/ffprobe at nagdaragdag ng latency at gastos sa model ang pag-caption ng mga frame.

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
