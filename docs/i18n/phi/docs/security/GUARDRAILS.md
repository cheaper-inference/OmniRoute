# Guardrails (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Pinagmulan ng katotohanan:** `src/lib/guardrails/`

Ang mga guardrail ay nagpapatupad ng mga pagbabago sa kaligtasan, patakaran, at nilalaman sa hangganan sa pagitan OmniRoute at upstream na mga provider. Ang bawat guardrail ay maaaring suriin (at opsyonal na tanggihan, ibahin ang anyo, o i-annotate) humiling ng mga payload (`preCall`) at upstream na mga tugon (`postCall`).

Ang sistema ay** mabibigo-bukas** : kung ang isang guardrail ay humahagis habang nagpapatupad, ang registry ay nagtatala ng error at magpapatuloy sa susunod na guardrail sa halip na mabigo ang kahilingan. Ang pagharang ay isang tahasang desisyon (`block: true`), hindi kailanman isang aksidente. Ang isang pagbubukod ay isang na-abort na kahilingan: kapag ang `signal` ng tumatawag ay na-abort, tinatanggihan ng ibinabato na guardrail ang hook run sa halip na laktawan.

Ginagawa ng mga kawit** hindi** tumakbo sa bawat ruta o bawat tugon. Basahin [ang Saklaw at mga limitasyon](#coverage-and-limits) bago umasa sa isang guardrail bilang kontrol sa seguridad.

## Mga Built-in na Guardrail

Awtomatikong nilo-load ng registry ang mga guardrail na ito sa priority order sa pag-import (tingnan `registry.ts` → `registerDefaultGuardrails()`):

| Priyoridad | Pangalan            | (mga) yugto    | file                      |
| ---------- | ------------------- | -------------- | ------------------------- |
| `1`        | `agent-guard`       | `preCall`      | `agentGuard/guardrail.ts` |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`         |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`          |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`          |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`            |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`      |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts`     |

Ang mga numero ng mas mababang priyoridad ay tumatakbo** una** .

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Ang GLM 5.3 base na modelo at `glm-5.3-{low,high,max}` ay may tahasang `supportsVision:false` registry/spec metadata. Ang mga variant GLM 5.3 Flash ay nananatiling mga modelo ng native-vision. `/v1/messages` na ruta ng Claude Code ay pumapasok sa nakabahaging `handleChat` pre-call guardrail chain** dati** Pagsasalin ng Claude-to-OpenAI; Ang mga nested `Read` tool-result na larawan ay dapat ilarawan o pangasiwaan bago ang pagsasalin na iyon ay iangat ang mga ito sa OpenAI `image_url` na nilalaman (#17069).

Hinaharang ang mga kahilingang nagdadala ng imahe na nilalayon** mga modelong hindi nakikita** at maaaring i-rerouting ang buong kahilingan sa isang modelong may kakayahang pangitain o palitan ang mga bahagi ng larawan ng mga paglalarawan ng teksto na ginawa ng isang na-configure na modelo ng paningin bago ang upstream na tawag. Nagbibigay-daan ito sa mga text-only na provider na malinaw na pangasiwaan ang mga multimodal na payload.

Daloy:

1. Laktawan kung sinusuportahan na ng target na modelo ang paningin (maliban kung ito ay lalabas sa forced-bridge list `isVisionBridgeForcedModel`).
2. I-extract ang mga bahagi ng larawan sa pamamagitan ng `extractImageParts(messages)` (`visionBridgeHelpers.ts`), na nagde-delegate sa** pinag-isang media detector** `detectMediaParts()` sa `open-sse/utils/mediaParts.ts` — ang nag-iisang pinagmulan ng katotohanan na ibinahagi sa combo compatibility filter. Ang pagkuha ay pinahihintulutan sa mga hugis na maaaring i-splice ng `replaceImageParts` pabalik (ang extract ↔ replace contract): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`, at Mga Tugon API `input_image`. Ang mga tumutugmang larawan na naka-nest sa loob ng Claude Code `tool_result.content` at mga output ng tool ng Mga Tugon ay kinukuha at pinapalitan din sa kanilang mga orihinal na landas; Ang mga hugis na indicator lang ay combo-filter na materyal at hindi kinukuha. Laktawan kung walang nahanap.
3. Resolve runtime config sa pamamagitan ng `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): panalo ang mga bagong `modalityBridge*` settings keys; Ang mga legacy `visionBridge*` key ay nananatiling a** one-cycle fallback** (rollback window). Laktawan bago ang anumang media traversal kapag ang tulay ay hindi pinagana.
4. Ang tagapili ng mode (`modalityBridgeVisionMode`, tingnan ang talahanayan sa ibaba) ay nagpapasya sa pag-reroute kumpara sa paglalarawan. Ang reroute ay nagbabalik `modifiedPayload` na may lamang `model` na napalitan, kasama ang meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Ilarawan ang landas: i-cap ang mga larawan sa `maxImages`, buuin ang task-aware prompt, kumonsulta sa paglalarawan ng cache, tawagan ang vision model** sa parallel** (`Promise.allSettled`), at mag-inject ng mga bahagi ng teksto `[Image N]: <description>` sa kanilang lugar. Ang isang nabigong paglalarawan ay nagbubunga ng `null`: ang raw na imahe ay pinapanatili para sa mga unknown/vision-capable na target (#4012), ngunit isang** nakumpirma na text-only na direktang target** o zero-vision combo ay nakakakuha ng tahasang `(unavailable — no vision-capable provider connected)` text stub para sa bawat hindi inilarawang larawan, kabilang ang mga bahagyang pagkabigo at mga larawang lampas sa paglalarawan-tawag na cap (#17069). Ang umiiral na all-failed combo na naglalarawan ng fallback ay nananatili sa lugar (#8430).
6. Ibalik `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Tagapili ng mode (`modalityBridgeVisionMode`)

| Mode       | Default | Pag-uugali                                                                                                                                                                                                                                                                                                   |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔       | Legacy heuristic, untouched (#6640/#7204): non-combo/`auto/` models reroute to the best vision model maliban kung ang orihinal na modelo ay mayroon nang magagamit na mga kredensyal (pagkatapos ay ilarawan); Ang mga combo target ay palaging naglalarawan.                                                |
| `describe` |         | Palaging ilarawan — ang reroute block ay ganap na nilaktawan; palaging sumasagot ang napiling modelo ng user.                                                                                                                                                                                                |
| `reroute`  |         | Force reroute: ang keep-credentialed-model guard ay na-bypass. Ang reroute-** target** Inilalapat pa rin ng credential guard — kapag walang magagamit na vision target, hinaharangan ng tulay ang isang malinaw na error sa halip na ilarawan o ipadala ang mga raw na larawan sa isang text-only na target. |

Mga sapilitang mode short-circuit** dati** ang auto heuristic ay tumatakbo; Ang gawi `auto` ay byte-pareho sa pre-PR-1 guardrail.

#### Saklaw ng API-key (`visionBridgeKeyScope.ts`)

Kapag pinaghihigpitan ng API key ng tumatawag `allowedConnections`, mga quota pool (`allowedQuotas`) o mga modelo (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`), pipili lang ang tulay na i-reroute at ilarawan ang mga modelong maaaring gamitin ng susi, sa mga koneksyon na maaaring gamitin ng susi. Ang naglalarawan na tawag pagkatapos ay palaging dumadaan sa OmniRoute self-loop gamit ang `x-omniroute-self-loop-key-id` header, kaya ipinapatupad muli ng pagtanggap ng kahilingan sa chat ang koneksyon at patakaran ng modelo ng key na iyon. Pinarangalan lang `enforceApiKeyPolicy()` ang header na iyon kasama ng self-loop bearer, kaya maaari lamang itong paliitin ang pag-access, at ang isang id na hindi nalulutas ay tinatanggihan.

Kung walang vision model ang pinahihintulutan para sa susi, a** nakumpirmang text-only na target** tinatanggihan ang kahilingan ng imahe nang lokal na may malinaw na HTTP 400 sa halip na ipasa ang mga byte ng imahe sa isang hindi kayang upstream (#17069). Para sa mga target na may hindi alam o katutubong kakayahan sa paningin, ang naglalarawan na landas ay nagpapanatili ng dati nitong hindi nakabukas na gawi (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Ang mga kahilingan na walang susi, at mga susi na walang mga paghihigpit na ito, ay gumagana nang eksakto tulad ng dati.

#### prompt ng paglalarawan ng task-aware (`modalityBridgeVisionTaskAware`)

Default** totoo** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) idinaragdag ang teksto ng** huling mensahe ng user** (pinutol sa 500 char) sa base na naglalarawan ng prompt, na nagtutulak sa paglalarawan patungo sa kung ano talaga ang itinanong ng user (codex-vision-proxy pattern) at humihiling sa vision model na i-transcribe ang nakikitang text. Gamit ang flag off — o walang user text — ang base prompt ay ginagamit nang hindi nagbabago.

Ang naglalarawan ng sariling OpenAI-compatible na kahilingan ng self-loop (`callVisionModelSingle()` in `visionBridgeHelpers.ts`) ay palaging humihiling `image_url.detail: "high"` — nang walang kondisyon, para sa bawat caller/provider, hindi naka-gate sa anumang signal ng kliyente. Ang mababang-detalye na sampling ay nagpapababa sa katumpakan OCR para sa eksaktong gawain ng text-transcription na hinihiling ng prompt na ito, kaya ang mismong paglalarawan ng tawag ay palaging humihingi ng mataas na detalye anuman ang antas ng detalye na ginamit ng orihinal na papasok na kahilingan. Naaapektuhan lang nito ang panloob na paglalarawan ng kahilingan sa katawan; hindi nito binabago kung paano ipinapasa ng OmniRoute ang sariling `image_url.detail` ng tumatawag sa pangunahing kahilingan — na ang default ay inilapat nang hiwalay, at para lamang sa mga natukoy OpenCode na kliyente, sa `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Ang Anthropic wire-format na sangay ng paglalarawan ng self-loop ay walang `detail` na field at hindi naaapektuhan ng alinman sa default.

#### Ilarawan ang output cap (`modalityBridgeVisionMaxChars`)

| Susi                           | Default | Saklaw          |
| ------------------------------ | ------- | --------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` o 100–50000 |

ibig sabihin ng `0` (default).** walang takip** — ang paglalarawan na ibinalik ng `callVisionModel()` ay ipinapasa sa hindi binago, na pinapanatili ang umiiral na pag-uugali. Ang anumang halaga sa hanay na 100–50000 ay pinuputol ang paglalarawan gamit ang isang `…` suffix bago ito i-splice pabalik bilang `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` sa `src/lib/guardrails/visionBridge.ts`). Itaas ito para sa mga detalyadong gawaing OCR kung saan kailangan ng downstream na modelo ang buong transkripsyon; ibaba ito sa bound na paggamit ng token sa mga chatty vision models. Nakatira ang field ng dashboard sa Advanced na panel ng tab na Vision (`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) at ikinakapit ang anumang value sa pagitan ng 1 at 99 hanggang sa 100 palapag habang nag-iiwan ng tahasang `0` na hindi nagalaw — `0` ay isang wastong halaga Zod sa sarili nitong karapatan (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), hindi lamang ang "unset" na default.

#### Ilarawan ang cache (`modalityBridge/bridgeCache.ts`)

In-memory LRU + TTL cache para sa paglalarawan ng mga output, ibinahagi sa buong proseso. Key = `sha256(imageRef + composedPrompt + configuredBridgeModel)` na may length-prefix framing (walang banggaan sa field-boundary). Ang bahagi ng modelo ay ang** naka-configure** modelo ng tulay, hindi ang modelo na aktwal na sumagot — `callVisionModel` ay maaaring bumalik sa loob, at ang pag-key sa bawat pagtatangka ay maghahati sa cache. Ang mga nabigong paglalarawan ay hindi kailanman na-cache. Mga Setting:

| Susi                            | Default | Saklaw  |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Remote na pag-normalize ng imahe (self-loop describe/base64 fetch)

Kapag ang tulay ay kumukuha ng a** remote** mismong larawan — ang Anthropic ay naglalarawan sa self-call at ang claude-wire-format base64 conversion (`ensureBase64ImagesForClaudeWire`), parehong sa pamamagitan `fetchRemoteImageAsDataUri()` sa `visionBridgeHelpers.ts` — ang nagreresultang data URI ay ipinapasa sa `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) bago i-embed sa kahilingan ng vision-model. Ang malalaking larawan ay ibinababa sa a** 2048px mahabang gilid** (ang tumutugma sa resize cap OpenAI/Anthropic ay nalalapat na sa server-side), na nagbabawas sa pag-upload ng bytes/latency nang hindi binabago ang nakikita ng modelo ng paningin. Gumagamit ang pagbabago ng laki `sharp`, na na-load sa pamamagitan ng dynamic na pag-import: sa isang platform kung saan nabigong mag-load ang native binary nito, `normalizeDataUri()`** hindi kailanman nagtatapon** — ito ay bumabalik sa isang passthrough ng orihinal na byte, kaya ang describe/base64-conversion path ay palaging gumagana. Ang mga byte na hindi larawan (isang pagkuha na hindi nagbalik ng isang decodable na larawan) ay dinadaan din nang hindi nagalaw. Ang normalization na ito ay saklaw sa mga larawang kinukuha ng tulay para sa sarili nitong self-call — na hindi kailanman inilalapat sa raw passthrough payload ng tumatawag, na naaayon sa opt-in-only na mutation na prinsipyo (Hard Rule #20).

#### Mga setting ng schema + migration

Ang mga bagong `modalityBridge*` key ay Zod-validated sa `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, ang `modalityBridgeCache*` trio, at ang `modalityBridgeAudio*` group na ginagamit ng Audio Bridge. Kinokopya ng migration `141_modality_bridge_settings.sql` ang mga umiiral nang legacy na halaga `visionBridge*` sa mga tumutugmang bagong key (idempotent, hindi kailanman na-overwrite ang isang `modalityBridge*` value na itinakda ng operator); mananatiling tinatanggap ang mga legacy key bilang read fallback para sa isang ikot ng paglabas.

#### Transparency header + stats

Ang mga describe-transformed na tugon ay nagdadala ng `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (binuo ng `buildModalityBridgeHeader()` sa `modalityBridge/bridgeStats.ts`, naselyohang `withModalityBridgeHeader()` sa `src/sse/handlers/chatHelpers.ts`). Nakukuha ang mga na-rerouting na kahilingan** hindi** header — ang payload ay hindi nagalaw at ang model swap ay nakikita na sa `model` field ng response body.

ibinabalik ng `GET /api/modality-bridge/stats` (management auth, parehong tier bilang `GET /api/settings`) ang mga in-memory per-modality counter `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` para sa `vision`, `audio`, at `video`. `averageLatencyMs` ay gumagamit ng `latencySamples`, hindi lahat ng pagtatangka, bilang denominator nito; ang isang operasyon na walang timing ay hindi gumagawa ng zero-millisecond sample. `bridged` ay nananatiling backward-compatible na alias para sa matagumpay na mga conversion; Ang mga nabigong pagtatangka ay hindi nadaragdagan ito. Nagre-reset ang mga counter sa proseso ng pag-restart ayon sa disenyo (telemetry, hindi accounting).

#### Pag-configure ng dashboard

The dedicated dashboard page is `/dashboard/settings/modality-bridge`. Its URL-addressable `Vision`, `Audio`, and `Video` tabs preserve query parameters while switching the `tab` value. The Vision tab exposes enablement, mode, model selection (including the automatic default), task-aware prompting, advanced timeout/image/description-length/cache limits, runtime counters, and a guarded sample request. The Audio tab is also live: it exposes enablement, an STT-only model picker with Auto, timeout/max-clip limits, audio counters, and an `input_audio` sample test. The Video tab is functional: it reports the FFmpeg/ffprobe runtime state — one of four explicit UI states (`unknown` while the probe is in flight or could not complete, `restricted` on a non-loopback dashboard host where the probe is skipped client-side, `unavailable` once probed and confirmed missing, or `available` with the FFmpeg/ffprobe versions) — persists enable/model/frame/video/timeout limits, filters the model picker to vision-capable models, and exposes video counters.

Ang dating Vision Bridge card sa ilalim ng AI settings ay isang compatibility link sa bagong page; hindi na ito nagmamay-ari ng pangalawang kopya ng form. Iniuugnay din ng Mga Media Provider ang mga workflow ng Image-to-Text at Speech-to-Text sa kaukulang mga tab ng Modality Bridge nang hindi inaalis ang umiiral na Speech-to-Text na palaruan.

**Self-loop admission bypass:** kapag naglalarawan ng mga ruta ng tawag sa pamamagitan ng sariling `/v1` self-loop ng OmniRoute(hindi karaniwang modelo ng provider), ang sub-request ay nagpapadala ng `x-omniroute-admission-bypass: internal` at na-authenticate gamit ang naresolbang self-loop na kredensyal — ang lokal `sk_omniroute` sentinel sa lokal na mode, o ang `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env key na na-configure ng operator (#1350) kaya magagawa pa rin `REQUIRE_API_KEY=true` ang mga pag-deploy ng tawag. Ang bypass ay pinarangalan lamang para sa mga eksaktong kredensyal na iyon, kaya hindi magagamit ng mga panlabas na kliyente ang header upang laktawan ang pagpasok.

Ang mga legacy default ay live sa `src/shared/constants/visionBridgeDefaults.ts`; ang bagong mode/task-aware/cache default at ang settings resolver ay nakatira sa `src/shared/constants/modalityBridgeDefaults.ts`. Ang guardrail ay naglalantad ng `deps` constructor na opsyon upang ang mga pagsubok ay makapag-inject ng pekeng `getSettings` at `callVisionModel` na pagpapatupad.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Hinaharang ang mga kahilingan sa chat na may audio-bearing bago nila maabot ang isang target na hindi kilalang tumatanggap ng audio input. Hinding-hindi nito inuulit ang kahilingan sa chat: ang mga bahagi ng audio ay na-transcribe sa pamamagitan ng umiiral nang OpenAI-compatible na multipart endpoint at ang napiling modelo ng chat ay nagpapatuloy sa mga text transcript.

Daloy:

1. Lutasin `supportsAudio` sa pamamagitan ng `getResolvedModelCapabilities()`. Panalo ang tahasang metadata ng provider-registry, pagkatapos ay metadata ng static na modelo, pagkatapos ay naka-sync ang `modalities_input`. Ang ipinahayag na listahan ng input na walang `audio` ay `false`; walang katibayan ng kakayahan ang nananatiling `null`. Parehong pinagana `false` at `null` ang konserbatibong tulay, habang nilalampasan ito `true`.
2. Lutasin ang mga setting `modalityBridgeAudio*` at i-extract ang mga spliceable na top-level na bahagi ng audio mula sa bawat mensahe sa pamamagitan ng nakabahaging `detectMediaParts()` detector. Ang mga sinusuportahang hugis wire ay OpenAI `input_audio`, `audio_url`, at `source.media_type: "audio/*"`. Natukoy ang nested audio para sa pagruruta ngunit hindi inalis ng splice path. Ang trabaho ay nililimitahan ng `modalityBridgeAudioMaxClips`; ang mga huling bahagi ay mananatiling hindi nagalaw.
3. Parangalan ang isang naka-configure na `provider/model`, o hayaan ang `selectAudioBridgeModel()` na maglakad `AUDIO_TRANSCRIPTION_PROVIDERS` sa stable na pagkakasunud-sunod ng catalog at piliin ang unang modelo na may magagamit na aktibong kredensyal ng provider.
4. Kino-convert `callAudioTranscription()` base64/data-URI audio sa isang multipart `file`, o nagda-download ng remote `audio_url` sa pamamagitan ng public-only outbound guard na may DNS pinning at 25 MB bound. Pagkatapos ay POSTs nito ang file at napiling modelo sa lokal na `/v1/audio/transcriptions` self-loop, na napatotohanan gamit ang `resolveSelfLoopBearer()`. Ang kasalukuyang ruta ng transkripsyon ay nagsasagawa ng normal na paghahanap ng kredensyal, paghawak ng cooldown/rate-limit, at pagpapadala ng provider.
5. Pinapalitan ng mga matagumpay na tawag ang kanilang mga bahagi ng `[Audio N]: <transcript>`. Tumatakbo ang mga tawag gamit ang `Promise.allSettled`: pinapanatili ng isang indibidwal na kabiguan ang orihinal na bahagi ng audio na iyon ( kontrata #4012 ). Kung ang bawat tawag ay nabigo at ang target ay napatunayang `supportsAudio === false`, ang mga bahagi ay magiging `[Audio N]: (unavailable — no STT provider connected)` (#8430 contract). Para sa hindi kilalang target (`null`), mananatiling hindi nagagalaw ang isang resulta ng lahat ng pagkabigo. Ang isang napatunayang text-only na target na walang magagamit na kredensyal STT ay tumatanggap ng parehong tahasang stub nang hindi nagbibigay ng isang tawag sa network.

Ginagamit ng mga matagumpay na transcript ang buong proseso ng Modality Bridge LRU/TTL cache. Pinagsasama ng key ang audio reference, ang stable `audio-transcription` operation label, at ang napiling STT model; ang mga pagkabigo ay hindi kailanman naka-cache. I-update ng mga pagsubok sa audio ang mga nakabahaging `bridged`, `cacheHits`, `failures`, at `lastUsedAt` counter. Ang mga binagong tugon ay nagdadala ng `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; Ang mga hindi nagalaw na kahilingan ay hindi nakakatanggap ng segment ng Audio Bridge.

Ang mga setting ng runtime ay DB-backed at Zod-validated:

| Susi                          | Default | Saklaw        |
| ----------------------------- | ------- | ------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —             |
| `modalityBridgeAudioModel`    | `""`    | Auto o STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000   |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10          |

Ang nakabahaging cache ay nananatiling kontrolado ng `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, at `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Hinaharang ang mga nangungunang bahagi ng video sa Mga Pagkumpleto ng Chat `messages` at Mga Tugon API `input` bago tawagin ang isang target na walang kilalang suporta sa native na video. Ang mga sinusuportahang hugis ay `input_video`, `video_url`, `video_source`, HTTPS URLs, at `data:video/*;base64,...` data URIs. Ang mga simpleng filename sa text ay hindi itinuturing bilang video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) ay nagmamay-ari ng request traversal, ang capability/policy check, per-request aggregation, at ang response payload. Per-video work — acquisition, ang buong resultang cache, na naglalarawan ng isang frame sequence (na nagsasama ng anumang caller-declared audio transcript), at per-attempt metrics/abort/cleanup — ay nakatago sa likod `processVideoPart` sa `videoBridgePipeline.ts`, na tinatawag nang isang beses sa bawat bahagi ng video sa loob ng loop ni `preCall`. Tinutukoy din ng module na iyon ang tahasang port boundaries `VideoMediaBrokerPort` (pagkuha ng mga byte at pag-extract ng mga sample na frame), `VideoAudioTranscriptionPort` (pagsasama ng audio transcript na idineklara ng tumatawag sa mga naka-sample na caption), at `VideoDrilldownPort` (ang legacy na raw-store na hugis). Binubuo ang production STT at frame retention sa paligid ng naglalarawang port sa pamamagitan ng `createVideoSttAdapter` at `createVideoDrilldownAdapter`; ang huli ay gumagamit ng nakabahaging opaque-handle na lifecycle.

Ang landas ng kahilingan ng pampublikong `/v1` ay hindi kailanman nag-i-import o humihiling ng subprocess. Ang mga malalayong video ay dina-download sa ilalim ng 50 MiB bound; Ang mga inline na base64 na video ay may konserbatibong 36 MiB na decoded per-video cap upang ang model/messages/framing envelope ay maaaring manatili sa loob ng pampublikong JSON request admission limit na 50 MiB. Ang mga pagtatantya sa haba ng inline at na-decode na laki ay sinusuri bago ang paglalaan. Kinakailangan ang HTTPS sa paunang remote URL at bawat pag-redirect, gamit ang umiiral na pampubliko lang na outbound na bantay na may DNS pinning. Ang mga byte ay tumawid sa eksaktong panloob na hangganan ng `POST /api/modality-bridge/video/extract` broker. Ang rutang iyon ay parehong `LOCAL_ONLY` at `SPAWN_CAPABLE`, tumatanggap lamang ng per-process na na-authenticate, trusted-loopback na kahilingan, at hindi kailanman tumatanggap ng URL, filesystem path, executable, o listahan ng argumento. Ang API body-size na pipeline at ang incremental body reader ng handler ay malayang nagpapatupad ng 50 MiB broker input cap. Ang bounded queue nito ay nagpapatakbo ng isang pagkuha sa isang pagkakataon, nagbibigay-daan sa apat na nakabinbing trabaho, at nililimitahan ang nakabinbing input sa 100 MiB.

Sa loob ng broker, nagbabasa `ffprobe` ng pribadong lokal na file; ibinubukod ng fixed format allowlist ang mga format ng playlist at manifest. Para sa mga pinapayagang MOV-family container, ang mga external na sanggunian ng data MOV ay nananatiling hindi pinagana bilang default, at ang nakapirming command ay hindi nag-o-opt in sa mga ito. Parehong ginagamit `ffprobe` at `ffmpeg` ang `file` -only protocol whitelist, isang thread, fixed argument arrays, walang shell, at mga executable na naresolba mula sa `PATH`. Ang mga stream ng pabalat na may kasamang larawan ay hindi mga kandidatong puwedeng laruin. Dapat matugunan ng lahat ng puwedeng i-play na stream ang mga limitasyon, at mas gusto ang isang tahasang default na stream bago ang deterministic na lowest-index fallback. Ang mga video ay limitado sa 600 segundo, 8,192 pixels bawat dimensyon, at 33,554,432 source pixels. FFmpeg sample 1–16 midpoint JPEG frames, pinababa ang mahabang gilid hanggang sa hindi hihigit sa 1,024 pixels nang hindi nag-upscale ng mas maliliit na input, at hindi nakakatanggap ng URL. Ang sampling ay `uniform` bilang default. Ang opsyonal na mga patakaran ng `scene_aware` at pang-eksperimentong `segment_aware` ay nagsasagawa ng isang karagdagang nakapirming FFmpeg pass sa na-validate nang lokal na stream, pumili ng mga bounded `showinfo` scene timestamp, at bumabalik nang deterministiko sa parehong magkatulad na midpoint sa detector failure, timeout, malformed na output, o isang walang laman na hanay ng kandidato. Ang segment-aware mode ay naglalaan ng mga sample ng midpoint nang proporsyonal sa mga napatunayang agwat ng eksena; Nakadetalye sa ibaba ang katibayan na may kamalayan sa segment at pag-uugali ng fallback. Ang hard 16-frame cap ay inilalapat pagkatapos ng pagpili sa bawat patakaran. Kapag ang isang kahilingang may alam sa eksena ay mayroon lamang isang frame na badyet, ginagamit nito ang pare-parehong midpoint ng aktibong full-video o focus window at nag-uulat ng `policyEffective: uniform`: hindi mapapanatili ng isang napiling frame ng eksena ang parehong temporal na dulo. Ang isang tumatawag ay maaaring opsyonal na magbigay ng isang may hangganang window ng focus (`start`/`end` segundo); bounds ay clamped sa tagal ng media, reversed o non-finite window ay tinatanggihan, at lahat ng sampling patakaran ay isinasagawa lamang sa loob ng normalized na pagitan. Ang resultang window ay kasama sa sampling metadata at sa hindi pinagkakatiwalaang prefix ng paglalarawan upang makilala ng mga downstream na modelo ang isang nakatutok na sipi mula sa buong timeline.

Ang semantic caption focus ay isang hiwalay at tahasang setting. Pinapanatili ng default `full` analysis mode ang kasalukuyang frame prompt at hindi kailanman nagpapasa ng text ng kahilingan sa modelo ng caption. Sa `focused` mode, binabasa lang ng tulay ang pinakabagong hindi walang laman `text`/`input_text` na isinulat ng user mula sa parehong lalagyan ng Chat o Mga Tugon, ine-normalize ito sa NFC, kino-collapse ang mga control character at whitespace, at nililimitahan ito sa 500 Unicode code point. Ang isang walang laman na resulta ay bumabalik sa eksaktong `full` prompt. Ang isang magagamit na pahiwatig ay naka-serialize bilang JSON sa isang nakalaang untrusted-user-context block at maaari lamang unahin ang mga nakikitang detalye; hindi nito maaaring i-override ang hiwalay na babala laban sa pagsunod sa mga tagubilin na nakikita o naririnig sa media. Ang textual focus ay hindi kailanman naghihinuha ng `start`/`end` o nagbabago sa temporal na sampler.

#### FU-07 structural segment na ebidensya

Gumagamit `segment_aware` ng isang bounded pre-analysis pass sa na-validate nang lokal na video stream. Ang nakapirming filter chain ay unang sumusukat sa hindi hihigit sa 320 pixels ang lapad, nakakakita ng mga pagbabago sa eksena at nag-freeze na pagitan, pagkatapos ay nagsa-sample sa 1 frame bawat segundo para sa blur, average na luma, at spatial/temporal na impormasyon. Ang pass ay limitado sa 600 structural sample, isang FFmpeg/filter thread, ang parehong `file` -only protocol at container allowlists, isang 1 MiB process-output bound, at hindi hihigit sa 30 segundo sa loob ng nakabahaging abort/deadline. ng broker Hindi ito tumatanggap ng command, filter, path, o URL mula sa kahilingan.

Ang mga structural value ay deterministic sampling evidence, hindi semantic video understanding. Hindi sila naghihinuha ng mga paksa, aksyon, caption, pananalita, o layunin ng user. Ang mga hangganan ng eksena at pag-freeze ay bumubuo ng mga segment; Ang freeze coverage, blur, exposure, spatial na detalye, at temporal na pagbabago ay nakakaimpluwensya lamang kung paano inilalaan ang kasalukuyang 1–16 frame budget. Ang isang ganap na naka-freeze na segment ay nililimitahan sa isang frame, habang ang mga hindi naka-frozen na segment ay nakikipagkumpitensya para sa natitirang badyet. Kapag ang mga hangganan ay lumampas sa bilang ng mga frame, ang pare-parehong saklaw ng timeline ay pananatilihin kaya ang mabilis na maagang pagbawas ay hindi makapagtago ng isang mahabang trailing na segment. Pinagsasama-sama ang mga hangganan ng eksena sa loob ng 1 segundong resolusyon ng pagsusuri ng isang hangganan ng pag-freeze.

Ang mga nawawalang filter, katibayan malformed/empty, error sa detector, o ang limitadong timeout bago ang pagsusuri ay hindi nakabukas sa eksaktong pare-parehong patakaran sa midpoint. Ang isang caller abort o broker deadline ay hindi mabibigo bukas: ito wawakasan ang in-flight subprocess, pinipigilan mamaya frame extraction, at ang pribadong pansamantalang puno ay aalisin sa `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` ay bumubuo ng mga deterministikong real FFmpeg fixtures para sa post-dedup caption-call savings, dense-motion na paglalaan ng badyet, blur/exposure/SI-TI evidence, mabilis na pagbawas na may mahabang buntot, at unti-unting pagkupas ng mga false positive. Itinatala nito ang pre-analysis wall time at, kung saan available ang `/usr/bin/time`, child CPU at peak RSS. Ang mga pagsusuri sa kalidad nito ay mga structural oracle lamang. Ang tunay na kalidad ng modelo ng caption ay nananatiling `HOLD` dahil ang harness na ito ay walang awtorisadong endpoint o nakapirming judge. Ang mga pagtitipid sa pera ay nananatiling `HOLD` maliban kung `--caption-cost-per-call-usd` ay nagbibigay ng tahasang positibong pagtatantya sa bawat tawag; ang script ay hindi kailanman gumagawa ng alinmang resulta.

Ang bawat frame ay limitado sa 4 MiB, lahat ng mga raw frame ay magkakasama sa 23 MiB, at ang serialized na tugon ng broker sa 32 MiB. Ang isang pribadong pansamantalang direktoryo ay tinanggal sa `finally`. OmniRoute ay hindi nagbu-bundle ng FFmpeg at hindi tumatanggap ng custom na executable path. Bago mag-caption, ang tulay ay naglalapat ng konserbatibong visual deduplication pass: bawat JPEG ay binabawasan sa isang 16 × 16 grayscale buffer at inihahambing lamang sa huling frame na napanatili. Para sa hiniling na badyet ng caption sa itaas ng isang frame, nagbibigay ang extraction ng bounded candidate pool na hanggang dalawang beses sa badyet na iyon at hindi hihigit sa 16 na frame. Ang hiniling na takip ay inilalapat lamang pagkatapos ng pag-deduplikasyon, kung saan ang una at huling napiling mga kandidato ay napanatili sa panahon ng huling pagnipis kapag ang badyet ay hindi bababa sa dalawa. Ginagamit ng may bersyong `grayscale-16x16-mean-cells-v2` policy ang mas malaki sa mean luma delta at ang ratio ng mga thumbnail cell na ang normalized na delta ay hindi bababa sa 0.05. Ang duplicate na threshold ay ang pare-parehong 0.04, na pinili para sa predictability sa halip na ilantad bilang isang setting ng runtime. Ang pangalawang high-contrast na signal na ito ay nagpapanatili ng maliit na paggalaw at nakikitang mga pagbabago sa text na maaaring itago ng isang mean-only na paghahambing. Ang mga error sa comparator o decoder ay hindi nakabukas at nagpapanatili ng coverage. Ang output metadata ay naghihiwalay sa mga na-extract na kandidato, matagumpay na nagamit na mga frame, at mga visual na duplicate na na-drop.

Ang isang tahasang minarkahang bahagi ng video ay maaaring humiling ng timestamped na contact sheet. Ang tulay ay bumubuo ng hindi hihigit sa isang 4-column, 16-frame JPEG grid. Ang bawat 512-pixel na cell ay sinusunog ang source timestamp nito sa isang high-contrast na banda sa ibaba, habang ang parehong mga timestamp ay nananatili sa textual metadata para sa downstream na asosasyon at pag-audit. Ang kumpletong JPEG ay nananatiling may limitasyon sa 32 MiB. Kung hindi ma-decode o ma-compose ng `sharp` ang grid, babalik ang tulay sa mga indibidwal JPEG frame; kumakalat pa rin ang isang client abort sa pamamagitan ng sheet operation.

Ang katibayan ng promosyon ay sadyang hiwalay sa microbenchmark ng synthetic na komposisyon. Tinutukoy `scripts/perf/video-bridge-contact-sheet-eval.ts` ang isang schema-versioned A/B harness para sa mga totoong OpenAI-compatible vision models. Sinusukat nito ang mga token na iniulat ng provider, end-to-end na wall latency (kabilang ang komposisyon ng sheet), bilang ng tawag sa modelo, at pagpapanatili ng katotohanan na tinukoy ng manifest. Ang mga sagot sa raw na modelo ay hindi nakasulat sa ulat; tanging SHA-256 digest at katugmang katotohanang IDs ang pinananatili. Ang harness ay hindi gumagawa ng network o binabayarang modelong tawag maliban kung `--execute-real` ay naipasa at `--model`, `OMNIROUTE_BASE_URL`, at `OMNIROUTE_API_KEY` ay na-configure. Kung wala ang tahasang tunay na pagtakbo, ang hatol na nababasa ng makina ay mananatiling `HOLD`; Ang mga synthetic na sukat payload/call-count lamang ay hindi katibayan ng promosyon.

Ang hiwalay `scripts/perf/video-bridge-promotion-eval.ts` ay gumagamit ng FU-07 o FU-09 na mga obserbasyon. Nangangailangan ang admission ng promosyon ng lahat ng walong synthetic na uri ng scenario kasama ang isang sanitized real clip, hindi bababa sa tatlong sinusukat na pag-uulit bawat role at case, lahat ng sampung idineklara na sukatan, mga nakapirming media/prompt/expected-fact/settings digest, natatanging observation IDs at na-verify na seeded A/B order. Ang resibo ng pagpapatupad ay nagbubuklod sa corpus digest, eksaktong kandidatong SHA at rebisyon ng modelo. Ang mga nawawala o di-wastong sukat ay nananatiling `HOLD`, kabilang ang CPU sa itaas ng 30 s, ang peak na RSS sa itaas 512 MiB o pre-analysis na higit sa 30 s. Ito ay mga limitasyon sa pagpasok ng ebidensya, hindi isang bagong garantiya sa pagpapatupad RSS ng runtime.

Nangangailangan FU-07 ng hindi bababa sa 98% na pagpapanatili ng kalidad at p95 latency na hindi hihigit sa 1.2x baseline, kasama ang alinman sa 0.05 absolute case-balanced na mean recall na pagpapahusay sa katumbas na mean na mga tawag sa caption, o hindi bababa sa 10% na mas kaunting mean na post-dedup na mga caption na tawag. Nangangailangan FU-09 ng hindi bababa sa 0.85 na kalidad, 95% retention, 20% median latency reduction at 10% token reduction. Ang pagkawala ng kritikal na katotohanan, pagsunod sa iniksyon o nawawalang paggamit ay humahadlang sa promosyon. Ang isang pagpapatupad ay hindi makakapag-promote ng anuman: Kinukumpirma ng `--previous-report` ang dalawang magkaibang, hindi magkakapatong, magkasunod na karapat-dapat na pagpapatupad ng parehong policy/model revision/candidate/corpus. Hindi makumpirma ng isang sampling na eksperimento ang isang eksperimento sa contact-sheet.

Ang mga collectors ay dapat mag-iskor ng mga tugon sa memorya at mag-save ng `responseDigest` plus metrics at observation bindings, hindi kailanman text response. Binabasa rin ng consumer ang mga legacy na hilaw na obserbasyon ngunit hindi kailanman kinokopya ang text na iyon sa mga ulat nito. Eksaktong isa sa `responseDigest` o `rawResponseText` ang tinatanggap para sa bawat pagmamasid. Nananatiling walang laman ang may bersyon na allowlist na may hindi nababagong default na `hold`. Ang isang karapat-dapat na entry ay nangangailangan ng sanggunian ng ebidensya, patakaran, rebisyon ng modelo, eksaktong kandidato SHA, manifest digest at dalawang natatanging run IDs; tinatanggihan ang magkasalungat na konteksto. Ang metadata na ito ay isang kontrata sa pag-audit, hindi patunay na ang isang isinangguni na file ay naglalaman ng mga tunay na sukat. Suriin ang aktwal na mga resibo bago magdagdag ng anumang entry. Inilalantad ng endpoint ng mga istatistika ng pamamahala at dashboard ng Video ang konserbatibong kahandaan. Ang isang naka-configure na alyas ng modelo lamang ay hindi nagtatatag ng rebisyon nito o ang tumatakbong kandidato SHA, kaya ang kasalukuyang dashboard ay nag-uulat ng `HOLD` sa halip na muling gamitin ang pagiging kwalipikado mula sa isa pang konteksto ng pagpapatupad. Ang tahasang pang-eksperimentong pagpili ay nananatiling hiwalay sa promosyon; walang default na awtomatikong nababago.

Maaaring mag-attach ang mga tumatawag ng opsyonal `transcript.cues` array sa isang sinusuportahang bahagi ng video kapag mayroon na silang naka-align na text. Ang bawat cue ay dapat may `text`, isang may hangganang `start`/`end` interval sa loob ng probed duration, at isang naka-whitelist na `source` (`client`, `embedded`, o `audio-bridge`); Nagde-default `confidence` sa `1` at dapat manatili sa pagitan `0` at `1`. Na-collapse ang mga eksaktong duplicate na cue. OmniRoute ay hindi magsisimula ng transkripsyon mula sa metadata na ito: ang mga napatunayang cue ay kinokopya sa inilarawang resulta na may pinagmulan, kumpiyansa, at agwat, at ibinibigay bilang hindi pinagkakatiwalaang mga obserbasyon kasama ng mga caption ng frame. Ang di-wasto, out-of-range, o provenance-free na text ay tinatanggihan sa halip na ihalo sa stream ng caption. Ang parehong request-body transcript channel ay nag-normalize ng ibinigay na provenance sa `client`, kasama ang self-asserted `embedded` o `audio-bridge` label. Tanging isang adapter na pagmamay-ari ng server ang maaaring magtalaga ng mga pinagkakatiwalaang label na iyon sa pamamagitan ng code-only `trustedSource` argument; hindi maabot ng isang patlang ng kahilingan JSON ang argumentong iyon. Ang transcript text ay nananatiling hindi pinagkakatiwalaang nilalamang hango sa media, anuman ang pinagmulan nito, at hindi dapat matukoy ang pahintulot.

Ang isang advanced na tumatawag ay maaaring magbigay ng `audioTranscript` track para sa parehong video; ito ay itinuturing bilang text na ibinigay ng kliyente, hindi patunay ng transkripsyon ng server. Ang fusion seam ay nagpapatakbo ng mga visual at audio na obserbasyon sa ilalim ng isang deadline at nag-abort ng signal, nag-uutos sa kanila sa isang karaniwang timeline, nagko-collapse ng mga eksaktong duplicate, at nag-uulat ng bahagyang resulta kapag isang panig lang ang nagtagumpay. Ang isang di-wastong `audioTranscript` ay bumababa sa bahagyang resulta na iyon — ang visual na paglalarawan ay pinapanatili at ang audio branch ay nagtatala ng isang sanitized na failure code — sa halip na mabigo ang buong video. Ang availability sa bawat branch, ang bahagyang flag, at ang mga na-sanitize na failure code ay pinapanatili sa inilarawang resulta, sa guardrail metadata (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), sa resulta-cache metadata, at sa bridge fusion counter. Ang default na Video Bridge path ay hindi gumagamit ng speech-to-text o nagda-download ng pangalawang kopya ng media; kung wala ang tahasang track na iyon, nananatili itong video-only.

**Pagpapanatili ng transcript (#12150 P1).** Awtomatikong nalalapat ito sa tuwing ang Video Bridge (ang mismong nag-opt-in) ay nag-render ng transcript cue — na walang hiwalay na retention flag. Kapag ang isang kahilingan ay nag-render ng anumang transcript cue (isang caller-declared `transcript` o a fused `audioTranscript`), ang guardrail ay minarkahan ito `videoBridgeObserved` at naglalabas ng redacted shadow ng paglalarawan ng video — isang magkaparehong rendering kung saan ang bawat cue ng free-text body ay pinapalitan ng `[redacted-video-transcript]`, na binuo sa pamamagitan ng pagpapalit ng string sa pamamagitan ng paglalagay ng patlang ng cue bago ang structured. cue content — adversarial o ordinary, kabilang ang mga katawan na naglalaman ng `]` tulad ng `[inaudible]`/`[music]` — ay maaaring mabuhay). Pinapalitan ng paulit-ulit na katawan ng kahilingan sa call-log ang bawat bahagi ng text na nagmula sa video para sa na-redact na anino na iyon, na itinutugma ng pagkakapantay-pantay ng nilalaman; ang `fullText` anchor ay muling binabasa mula sa natapos na pre-call na guardrail payload, kaya ang laban ay nagtagumpay pa rin pagkatapos ng mga chain guardrails (ang PII at mga kredensyal na maskara, mga priyoridad 10/95) muling isulat ang teksto ng paglalarawan sa lugar at pagkatapos ng system-prompt/handoff/memory injection ay muling hinubog ang array ng mensahe. Ang katawan na ipinadala sa itaas ng agos sa modelo ay hindi nagbabago. Ang isang naobserbahang kahilingan ay hindi rin napupuno ng matibay na Memory (parehong hiling at nakuhang tugon na pagkuha ay nilaktawan), kaya ang sariling tugon ng modelo ay hindi maaaring mag-echo ng transcript text sa Memory.

**Mga raw na field ng video (#12430).** Kapag pinagana ang tulay at hindi alam o wala ang suporta sa native na video, ang tinukoy na mga patlang na `transcript`/`audioTranscript` ay nag-a-activate din `videoBridgeObserved`, kahit na matapos ang pagkabigo sa paglalarawan o isang limitasyon `maxVideos`. `null` at walang laman na mga string ay binibilang; wala ang mga field at hindi video metadata. Ang mga nananatiling kopya ay nag-redact sa mga field na ito o tinanggal ang kahilingan, at caches/Memory ay na-bypass.

Sa mga fallback na path na iyon, ang mga valid na caller cue ay nagiging suportadong mga bahagi `text`/`input_text` kaysa sa mga hindi karaniwang field ng provider. Ang parehong mga track na ibinigay ng kahilingan ay nananatiling hindi pinagkakatiwalaang mga obserbasyon `client`, na may tahasang babala na hindi inilarawan ang video at hindi na-verify ang mga timestamp laban sa media. Ang kasalukuyang 256-cue/64-KiB total at per-cue na badyet ay nalalapat sa dalawang track nang magkasama; Ang mga timestamp ay dapat magkasya sa 600 segundong kisame ng broker at anumang ibinigay na window ng focus. Ang mga di-wastong track ay itinatapon, hindi ipinapasa bilang arbitrary na teksto; ang isang wastong kapatid ay maaari pa ring gamitin maliban kung ang kanilang pinagsamang badyet ay lumampas. Ang mga patlang Null/empty ay hindi magdagdag ng teksto. Walang media fetch o transkripsyon ang idinagdag ng fallback na ito. Ang mga field ng extension ng transcript ay inalis mula sa fallback na video carrier at ang mga `video_url`/`source` object nito. Ang OpenAI wire allowlist ay nananatiling mahigpit; Ang mga hindi kilalang katutubong video carrier ay nananatiling available at ang mga kilalang text-only na target ay nagpapanatili ng mga ligtas na marker. Pinoprotektahan ng mga structured redaction shadow ang nakadugtong na transcript text, habang nananatiling hindi nagbabago ang orihinal na kahilingang pagmamay-ari ng tumatawag. Ang mga target na sinusuportahan ng katutubong at may kapansanan na tulay ay nagpapanatili ng kanilang umiiral na gawi sa bypass.

Ang mga karagdagang napanatili na kopya ay gumagamit ng parehong signal ng naobserbahang kahilingan. Ang raw pre-guardrail client-request snapshot, in-memory na nakabinbing kahilingan, at maagang tinanggihan-request log ay istrukturang pinapalitan ang mga field ng transcript sa mga bahagi ng video; Ang mga string prompt na na-synthesize ng mga yugto ng pipeline at handoff ng konteksto ay ine-redact sa persisted-request-body sink. Ang patuloy na `video_content_removed` marker ay ginagawang hindi naisara ang pagpapatuloy `previous_response_id` sa halip na buuin muli ang teksto na sadyang itinapon. Kung ang isang naobserbahang kahilingan ay nawalan ng anino ng bawat bahagi nito bago mag-log, o kahit na ang isa sa ilang mga anino ng video ay hindi tumugma pagkatapos ng paghiling ng mga mutasyon sa ibang pagkakataon, ang napanatili na nilalaman ng kahilingan ay ganap na aalisin sa halip na panatilihin ang isang bahagyang na-redact na transcript.

Para sa isang naobserbahang kahilingan, maaaring sumipi ang isang tugon ng modelo sa anumang bahagi ng transcript na walang nakabalangkas na hangganan ng cue. Ang patuloy na call-log `responseBody` nito ay pinapalitan ng isang omission marker; hindi pinanatili ang detalyadong pipeline artifact (na maaaring magsama ng mga upstream/client body at stream chunks). Semantic, idempotency, at reasoning-replay caches bypass reads and writes para sa kahilingang iyon. Ang kahilingan ng provider at tugon na nakikita ng kliyente ay nananatiling hindi nagbabago. Ang mga maagang keepalive byte ay na-drain mula sa pansamantalang buffer kapag ang detalyadong artifact ay tinanggal. Ang malformed EventStream warning ng Kiro ay nag-uulat lamang ng bilang ng payload byte, hindi kailanman ang mga nilalaman nito o ang raw error ng JSON parser. Hindi nito inaangkin na ang bawat hindi nauugnay provider/plugin diagnostic ay na-audit; ang mas malawak na retained-sink sweep ay sinusubaybayan sa #11658.

Ang panloob `/api/modality-bridge/video/drilldown` lifecycle ay isang hiwalay, loopback/token-authenticated cache substrate. Ang bawat operasyon ay nangangailangan din ng canonical opaque principal ID. Bago paganahin ang isang production caller, dapat nitong makuha ang ID na iyon mula sa na-authenticate na nangungupahan at hindi kailanman dapat magpasa ng value na pinili ng kliyente. Ang mga cache key ay nagbibigkis sa principal na iyon sa canonical session at video-reference IDs, nag-iimbak lamang ng kanilang mga SHA-256-derived key, at sumasaklaw sa parehong pagbabasa at pagtanggal sa parehong principal. Ang cache ay nag-iimbak ng hindi hihigit sa 16 na derived JPEG frame sa bawat entry, mag-e-expire ang mga ito pagkatapos ng sampung minuto, at sumusuporta sa bounded `start`/`end` reads o tahasang pagtanggal ng session.

Ang bawat punong-guro ay limitado sa 16 na entry at 64 MiB ng canonical JPEG data. Ang mga limitasyong iyon ay independiyente sa global 64-entry/256 MiB ceiling: ang presyur sa quota ng punong-guro ay nagpapalayas lamang sa mga entry na hindi gaanong nagamit kamakailan ng punong-guro bago isaalang-alang ang global LRU eviction. Ang mga nag-expire na entry ay winalis mula sa principal at global accounting sa cache activity, habang ang pagkansela at pagpapatunay ay hindi gumagawa ng bahagyang kapalit.

Tinatanggihan ng cache ang non-canonical Base64, sobrang padding, non-JPEG media, malformed o truncated JPEGs, at JPEGs na gumagawa ng babala sa panahon ng bounded full-image `sharp` decode. Muling ine-encode nito ang bawat tinatanggap na larawan bilang isang canonical JPEG, nakukuha ang lapad at taas mula sa mga na-decode na byte sa halip na magtiwala sa mga field ng tumatawag, at itinatapon ang anumang sumusunod na polyglot byte sa halip na panatilihin ang mga ito. Tanging ang bounded canonical compressed buffer lang ang sisingilin sa parehong quota. Kasama sa limitasyon ng JSON wire ang Base64 overhead para sa 32 MiB decoded-input na kisame. Itinatala ng bawat nakaimbak na derivation ang na-validate na JPEG format/resolution, patakaran sa pag-sample, bersyon ng derivation, oras ng paggawa, hash ng content na na-compute ng server, at reference ng hash na magulang kasama ang hash ng parent-content ng pinagkakatiwalaang tumatawag. Sinusuri ang pagkansela sa pagitan ng mga asynchronous decode/hash phase bago ang atomic cache commit.

Ang producer ng produksyon ay muling gumagamit ng nakuha nang mga frame ng broker pagkatapos lamang ng matagumpay na visual na pagsusuri, na walang pangalawang video download/extraction. Nangangailangan ito ng operator `modalityBridgeVideoDrilldownEnabled=true`, mahigpit na per-part `drilldown: true`, at isang napatotohanan na API-key record ID. Ang mga halaga principal/session na idineklara ng kliyente ay hindi kailanman nagtatag ng pagmamay-ari. Kung wala ang lahat ng tatlong kundisyon, hindi ito nagha-hash, nagbabago ng laki o nagpapanatili ng mga karagdagang frame. Ang pagkabigo sa pagpapanatili ay nagpapanatili ng magagamit na visual na tugon. Ang mga pinahintulutang kahilingan ay lumalampas sa cache ng resulta ng buong video upang hindi mahawakan ang mga naka-cache na resulta.

Ang matagumpay na mga tugon JSON at SSE ay naglalantad ng hindi hihigit sa apat na opaque na handle sa bounded `x-omniroute-video-drilldown` header. Maaaring basahin ng mga awtorisadong pinagmulan ng browser ang header na iyon nang hindi pinapalawak ang patakaran sa pinagmulan CORS. Ang mga bagong handle ay gumagamit `v1.<32-byte random base64url token>`, at ang registry ay nagpapanatili lamang ng kanilang mga SHA-256 hash. Tumatanggap din ang reader/header parser ng mga legacy na 64-hex na token. Ang authenticated pampublikong consumer ay `GET /api/v1/video-bridge/drilldown?handle=...`, independiyenteng gated sa pamamagitan ng `modalityBridgeVideoDrilldownRemoteEnabled=true`. Ang tahasang patuloy na false ay binawi ang access kahit na ang legacy `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env fallback ay pinagana. Ang pagpapanatili ng produksyon ay may kahalintulad na legacy `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` fallback. Parehong naka-off ang mga fallback.

Nakukuha ng consumer ang pagmamay-ari mula sa na-authenticate na key at inilalapat ang pangunahing patakaran: parehong nabibilang GET at DELETE sa `video` endpoint na kategorya, kabilang ang `/v1` at `/api/v1` alias. Dapat may kasamang `video` ang mga key na may walang laman na endpoint allowlist; nananatiling magkatugma ang mga hindi pinaghihigpitang key. Ibinabalik ng consumer ang parehong 404 para sa hindi alam, nag-expire at mga handle ng isa pang susi. Tumatanggap ito ng `variant=preview|standard|detail` (maximum JPEG na dimensyon 320/640/1280, hindi kailanman na-upscale), `limit=1..8` (o ang legacy `frames` alias, hindi kailanman pareho), zero-based `page`, at opsyonal `start`/`end` focus seconds. Ang mga duplicate na query key at reversed focus window ay tinatanggihan. Ang bawat ibinalik na variant ay may hash ng aktwal na nilalaman nito at aktwal na metadata ng resolusyon, na naka-link sa napanatili na pinagmulan. Ang mga variant ay hinango sa nabasa sa halip na nakaimbak bilang mga karagdagang napanatili na kopya. Ang tugon JSON, kasama ang Base64/envelope, ay nililimitahan sa 32 MiB; ang isang napakalaking pahina ay nagbabalik ng 413 at ang kliyente ay dapat humiling ng mas kaunting mga frame. Binabasa ang pagkansela ng check sa bawat pagbabago ng laki at muling suriin ang validity ng handle bago bumalik. `DELETE` ng may-ari ay idempotent; Ang pagtanggal o pag-expire TTL ay naglalabas ng nananatiling pinagmulan at accounting ng paggamit.

Ang nakabahaging tindahan ay lokal na proseso: mag-e-expire ang mga handle sa pag-restart at hindi maililipat sa pagitan ng mga independiyenteng proseso OmniRoute. Inilalantad ng mga istatistika ng pamamahala ang epektibong pagpapanatili/malayuang patakaran at pinagsama-samang napapanatili entries/bytes lamang, hindi kailanman media, mga sanggunian, punong-guro IDs o mga hawakan. Ipinapakita ng panel ng mga setting ng Video ang mga halagang iyon at maaaring magpatuloy sa parehong mga switch ng pahintulot. Ang dokumentasyon ng pagpapatupad na ito ay hindi live na deployment o ebidensya ng promosyon; Ang pagtanggap sa tunay na modelo ay sinusubaybayan nang hiwalay.

Ang mga frame ay naka-caption nang sunud-sunod gamit ang naka-configure na modelo ng Video. Ang isang walang laman na pag-override ng Video ay namamana ng setting ng Vision; kung parehong walang laman, pipiliin ng Vision auto-router ang epektibong modelong may kakayahang makita. Pinapalitan ng mga matagumpay na caption ang orihinal na bahagi ng isang stable `[Video description:` prefix na nagmamarka rin sa text bilang isang hindi pinagkakatiwalaang pagmamasid na hango sa media at nagsasabi sa mga downstream na modelo na huwag sundin ang mga tagubiling makikita sa media. Kasama sa mga key ng cache ng frame-caption ang mga JPEG byte, prompt, timestamp, at epektibong modelo; ang mga matagumpay na caption lamang ang naka-cache. Ang mga entry sa cache ay nagpapanatili ng aktwal na matagumpay na modelo ng producer, kabilang ang isang fallback na modelo; ang tulay ay nag-uulat ng `mixed` kapag ang iba't ibang mga frame ay ginawa ng iba't ibang mga modelo. Ginagamit muli ng cache hit ang pagkakakilanlan ng producer na iyon sa halip na muling lagyan ng label ito bilang hiniling na plano sa pagruruta. Ang cache ng resulta ng buong video ay naka-key sa bawat input na nagbabago sa output — prompt, epektibong modelo, sampling policy, frame count, semantic analysis mode, ang SHA-256 fingerprint ng normalized focus hint, focus window, `transcript`, `audioTranscript`, at ang contact-sheet flag — kaya ang pagbabago sa alinman sa mga dimensyong iyon ay isang cache miss, hindi kailanman isang stale reuse. Ang bersyon ng patakaran sa visual na pag-de-dep, threshold, at bounded na candidate-frame count ay tahasan din sa result-cache key at metadata; ang isang pagbabago sa patakaran samakatuwid ay hindi maaaring muling gamitin ang isang lipas na buong-video na paglalarawan. Pinapanatili ng metadata ng resulta-cache v4 ang mode at fingerprint, hindi ang hilaw na gawain ng user. Iniuulat ng metadata ng Guardrail ang hinihiling at epektibong mga mode ng pagsusuri; ang isang hiniling na `focused` mode na walang magagamit na teksto ng user ay iniulat bilang epektibong `full`.

Kinukuha ng guardrail ang bawat sinusuportahang bahagi ng video ngunit naglalarawan ng hindi hihigit sa `modalityBridgeVideoMaxVideos`. Para sa isang target na napatunayang may `supportsVideo === false`, ang mga video na nabigo at labis na limitasyon ay nagiging tahasang ligtas na mga text marker kaya walang raw na video na nananatili. Kapag hindi alam ang kakayahan, pinapanatili ng mga bahaging iyon ang kanilang video carrier; anumang fallback transcript ay sumusunod sa bounded text conversion sa itaas. Mga target na may `supportsVideo === true` bypass ang tulay. Ang kahilingan ng kliyente na i-abort ang signal ay kumakalat sa pamamagitan ng pag-download, pila ng broker, mga subprocess, at mga tawag sa caption; huminto ang mga abort sa pagitan ng mga video at hindi kailanman nabigo na bukas sa raw media.

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

Ang mga value ng timeout ng video na nanatili sa legacy na higit sa 120 segundo ay naka-clamp sa deadline ng broker; ang mga bagong setting ay nagsusulat sa itaas ng limitasyong iyon ay tinanggihan. Nangangailangan ang `GET /api/modality-bridge/video/runtime` ng pinagkakatiwalaang lokalidad na naselyohang loopback bago ang pagpapatunay o runtime probing, pagkatapos ay nangangailangan ng pagpapatunay ng pamamahala. Nagbabalik lang ito `available`, mga sanitized FFmpeg/ffprobe na bersyon, at isang nakapirming dahilan kapag hindi available ang runtime. Ang internal extraction endpoint ay hindi isang pampublikong upload API: queue saturation returns `503` plus `Retry-After`, isang caller disconnect returns `499`, at ang fixed broker deadline returns `504`. Ang mga na-convert na tugon ay nagdaragdag ng `video->text;model=<visionModel>;parts=<videos>` sa gitnang `x-omniroute-modality-bridge` header nang hindi inaalis ang mga segment ng Vision o Audio.

### PII Masker (`piiMasker.ts`)

Tumatakbo sa** pareho** mga yugto.

- **`preCall`** kino-clone ang payload, nilalakad `system`, `messages`, `input`, at `prompt` (kabilang ang mga plain string item), at inilalapat ang `processPII()` (mula sa `@/shared/utils/inputSanitizer`) sa mga string na `content`/`text` na field. Kapag `PII_REDACTION_ENABLED=true`, ang natukoy na PII ay na-redact sa papalabas na payload. Ito ay independiyente sa `INPUT_SANITIZER_MODE` (na kumokontrol lamang sa prompt-injection policy). Kapag naka-off ang redaction, binibilang ang pagtuklas ng mga talaan ng tawag nang hindi muling isinusulat ang nilalaman.
- **`postCall`** deep-clone ang tugon, nagpapatakbo ng `sanitizePIIResponse()` kasama ang Responses-API-shape masker (`maskResponsesOutput` — sumasaklaw sa `output_text` at `output[].content[].text`). Kung may nangyaring redaction, papalitan ng binagong tugon ang orihinal.

Ang guardrail ay hindi kailanman nakaharang; ito ay nag-annotate lamang (`meta.detections`, `meta.redacted`) o muling nagsusulat.

**Reversible vault (`PII_REVERSIBLE_VAULT_ENABLED`, default `false`).** Kapag parehong naka-on `PII_REDACTION_ENABLED` at `PII_REVERSIBLE_VAULT_ENABLED` (DB override > env > default, basahin nang isang beses bawat kahilingan), magbubukas `handleChat` ng isang vault bawat kahilingan ng kliyente (`src/lib/pii/requestTokenVaultScope.ts`) at ipapasa ito sa pre-call pass bilang `GuardrailContext.tokenVault`. Pagkatapos ay isusulat ng masker ang mga surrogate na token gaya ng `<<PII_EMAIL_QWERTYUI_1>>` sa halip na `[EMAIL_REDACTED]`, para sa built-in, validated (GDPR/POPIA) at custom na mga panuntunan. Ang nonce ay 8 random na malalaking titik sa bawat kahilingan, at ang parehong halaga ay nakakakuha ng parehong token sa loob ng kahilingan. Tanging ang masker mints: ang prompt-injection guard at `/api/guardrails/test` ay tumatakbo nang walang vault at pinapanatili ang mga placeholder.

- Ang provider, bawat combo leg, muling subukan, miyembro ng fusion panel at ang fusion judge ay nakakakita lamang ng mga token. Ang mga token ay nire-restore nang isang beses, sa 2xx na tugon na nag-iiwan ng `handleChat`: bawat field sa na-parse SSE (nare-resolve pa rin ang isang token split sa mga kaganapan; ang mga argumento ng tool-call ay JSON-escaped) o bawat field sa isang JSON body, na may recomputed `Content-Length`. Ang nilalaman at pangangatwiran na teksto at mga argumento ng tool-call ay naibalik. Pinapanatili ng mga error body (4xx/5xx) ang mga token.
- Ang mga pagkabigo ay mananatiling pribado: kung nabigo ang paggawa o ang vault ay tumanggi sa isang halaga (1000 entry, 256 character bawat halaga, 64 KB sa kabuuan), ang placeholder ang isusulat sa halip; isang token na hindi malulutas ng vault, o isang pagbabalik na nabigo, ay mananatiling literal at isang bilang lamang ang naka-log. Ang vault ay walang mga timer at walang pandaigdigang estado; na-clear ito kapag natapos ang stream ng tugon, nakansela, o mga error.
- Kapag ang isang kahilingan ay gumawa ng mga token, memory extraction, ang pag-save ng idempotency at parehong semantic-cache na pagsusulat ay nilaktawan, dahil walang kahilingan sa ibang pagkakataon ang makakapagresolba sa mga token na iyon. Sa mga log ng tawag, ang kahilingan at tugon ng provider ay nagdadala ng mga token; ang naka-log na katawan ng kahilingan ng kliyente ay ang hilaw na input ng kliyente, tulad ng sa simpleng redaction.
- Gumagamit ang mga token ng per-request na random na nonce, kaya nagbabago ang prompt prefix sa bawat pagliko: hindi tumama ang pag-cache ng prompt sa panig ng provider para sa mga naka-mask na pagliko, at ang token na babalik sa ibang pagkakataon (halimbawa sa pamamagitan `previous_response_id`) ay kabilang sa isang lumang kahilingan at nananatiling literal.

#### Per-type na seleksyon, custom na pattern at detection counter

**Dashboard → Mga Setting → Seguridad → PII masking** pinipili ang _ano_ ang nakamaskara. Hindi nito inililipat ang masking sa: iyon ay pa rin `PII_REDACTION_ENABLED` (kahilingan) at `PII_RESPONSE_SANITIZATION` (tugon + SSE), parehong naka-off bilang default.

- **Pagpili sa bawat uri** — ang mga built-in na id ay nakalista sa `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Ang ibig sabihin ng unset ay bawat uri (ang gawi bago umiral ang setting na ito). Ang `ssn_us` pattern ng request engine ay nagmamapa sa `ssn`. Ang mga template (Minimal, Standard, Financial, Brazilian, USA, GDPR, POPIA, Full) ay punan lamang ang mga checkbox sa UI.
- **mga identifier GDPR at POPIA** — labindalawang built-in na id na sumasaklaw sa EU at mga personal na identifier ng South Africa (talahanayan sa ibaba). Ang kanilang mga regexe, validator, at jurisdiction tag ay nakatira sa isang table, `src/shared/utils/piiPatterns.ts`, na parehong ginagamit ng response sanitizer (`src/lib/piiSanitizer.ts`) at ang request masker (`src/shared/utils/inputSanitizer.ts`) . Ang isang tugma ay na-redact lamang kapag tinanggap ito ng validator nito; hindi sapat ang isang hubad na bilang ng mga numero. Ang isang operator na nag-save ng isang pinaliit na seleksyon bago umiral ang mga id na ito ay nagpapanatili ng pag-uugali na mayroon ito hanggang sa mamarkahan ang mga bagong id.
- **Mga custom na pattern** — hanggang 20 regex o wildcard pattern (`*` = hanggang 64 na hindi whitespace na character, `?` = isa). Ang mga tugma ay nagiging `[CUSTOM_REDACTED]`. Ang bawat pattern ay dumadaan sa `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): hindi hihigit sa 500 character, ang mga flag ay limitado sa `g i m s u`, dapat mag-compile, dapat pumasa sa `safe-regex` (catastrophic backtracking), at hindi dapat tumugma sa isang walang laman na string o isang redaction placeholder. Ang isang pattern na nabigo ay tinatanggihan kapag nai-save at kapag sinubukan, at ang isang naka-imbak na row na nabigo ay nilaktawan sa runtime sa halip na i-compile. Gumagana lang ang mga custom na pattern habang naka-on ang masking.
- **Mga counter ng pagtuklas** — per-type na bilang (hindi kailanman tumugma sa mga halaga), hawak sa memorya at i-reset sa pag-restart (`src/lib/pii/piiDetectionStats.ts`). Dumarami lamang sila habang naka-mask.

Nakatira ang mga setting sa `key_value` table (namespace `pii_settings`, `src/lib/db/piiSettings.ts`) at binabasa sa pamamagitan ng 1 s cache. API:

| Pamamaraan | Daan                     | Layunin                                                                                    |
| ---------- | ------------------------ | ------------------------------------------------------------------------------------------ |
| `GET`      | `/api/settings/pii`      | Flag state, `enabledTypes`, `customPatterns`, detection counters                           |
| `PUT`      | `/api/settings/pii`      | Palitan ang `enabledTypes` (`null` = lahat) and/or `customPatterns`                        |
| `POST`     | `/api/settings/pii/test` | Dry-run ang isang pattern laban sa isang sample na hindi hihigit sa 8 KB; walang nakaimbak |

Lahat ng tatlo ay nangangailangan ng pagpapatunay ng pamamahala at patunayan ang katawan gamit ang Zod (`src/shared/validation/schemas/piiSettings.ts`). Kung hindi pinagana ang pag-log in (`requireLogin=false`) `GET` at bukas ang endpoint ng pagsubok, ngunit kailangan pa rin ng `PUT` ang isang session ng dashboard, isang `manage` -scope API key, isang `oma_` access token na may write scope o mas mataas, o ang CLI token o internal-service token na ipinadala mula sa loopback.

#### mga identifier ng GDPR (EU) at POPIA (South Africa).

| Id                  | Identifier                     | Pagpapatunay                                                                                   |
| ------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                           | Kilalang bansa, eksaktong haba para sa bansang iyon, ISO 13616 MOD-97-10                       |
| `eu_vat`            | EU VAT na numero               | Kilalang prefix ng member-state at ang format ng numero ng estado na iyon (walang VIES lookup) |
| `es_dni_nie`        | Espanyol DNI / NIE             | Control letter (value mod 23); NIE ay `X/Y/Z` + 7 digit                                        |
| `it_codice_fiscale` | Italian Codece Fiscale         | Control letter mula sa mga talahanayan ng posisyon odd/even                                    |
| `pl_pesel`          | Polish PESEL                   | Weighted checksum at isang naka-encode na petsa ng kapanganakan na umiiral                     |
| `nl_bsn`            | Dutch BSN                      | 11-proof (weights 9..2, -1)                                                                    |
| `de_steuer_id`      | German Steuer-ID               | ISO 7064 Mod 11,10 kasama ang mga panuntunan sa digit-structure (walang nangungunang 0)        |
| `se_personnummer`   | Swedish personnummer           | Luhn sa huling sampung digit at isang posibleng petsa ng kapanganakan (10 o 12 digit)          |
| `za_id`             | ID number sa Timog Aprika      | Luhn sa lahat ng 13 digit, valid birth month/day, citizenship digit 0 o 1                      |
| `za_phone`          | Telepono sa Timog Aprika       | `+27` / `27` prefix, o ang pambansang `0..` form na nakasulat na may puwang o gitling          |
| `za_vat`            | VAT number sa Timog Aprika     | 10 digit na nagsisimula sa `4`** at** "VAT" / "BTW" sa 48 characters dati                      |
| `za_tax_ref`        | Ref. ng buwis sa Timog Aprika. | 10 digit simula `0`-`3`, Luhn,** at** "tax" / "SARS" sa 48 na character bago                   |

Dahil ang mga digit-only na format ay sumasalungat sa mga numero ng order, bumuo ng mga numero at timestamp, ang pinakamahina (`za_vat`, `za_tax_ref`) ay nangangailangan ng keyword cue, at ang isang walang laman na sampung digit `0..` na numero ay hindi itinuturing bilang isang South African na numero ng telepono. Ang spaced IBANs (`GB29 NWBK ...`) ay hindi tugma. Sa streaming path ang cue ay tinitingnan sa loob ng kasalukuyang tipak lamang. Nauuna ang mga id sa mga generic na pattern ng telepono, kaya pinapanatili ng isang validated identifier ang sarili nitong placeholder (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Ang `gdpr` at `popia` template ay pipili ng EU at South African id ayon sa pagkakabanggit. Ang pag-mask mismo ay nananatiling opt-in (Hard Rule #20): wala dito ang nagbabago sa default na feature-flag.

### Prompt Injection (`promptInjection.ts`)

Nakikita ang mga istrukturang kalaban sa content na ibinigay ng user at ipinapatupad ang naka-configure na patakaran. Ang pag-uugali ay hinihimok ng mga variable ng kapaligiran at mga pagpipilian sa constructor:

| Setting               | Env var                                                                                               | Default | Epekto                                                                                                                                                                                                                        |
| --------------------- | ----------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pinagana              | `INPUT_SANITIZER_ENABLED`                                                                             | `true`  | Kapag `false`, guardrail short-circuits.                                                                                                                                                                                      |
| Mode                  | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`  | Patakaran sa pag-injection: `block`, `warn`, o `log`. (`redact` ay tinatanggap para sa back-compat ngunit ginagawa** hindi** strip ng iniksyon na teksto; ang request PII rewrite ay kinokontrol ng `PII_REDACTION_ENABLED`.) |
| I-block ang threshold | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Minimum na kalubhaan na kinakailangan upang harangan. Ang medium ay observe-only sa default.                                                                                                                                  |

**Pangunahin sa mode** (`getMode`): tumatawag `options.mode` → `INJECTION_GUARD_MODE`**DB feature-flag override** (Dashboard → Settings → Feature Flag) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. Ang isang dashboard override samakatuwid ay nanalo sa mga env vars, kaya kinokontrol ng Feature Flags UI ang tumatakbong bantay nang live (walang restart). Ang DB read ay fail-safe: kung ito ay mali, ang bantay ay babalik sa env-based na gawi, at kapag walang override ang nakatakdang pag-uugali ay kapareho ng env-only na resolution.

Mga mapagkukunan ng pagtuklas:

1. `sanitizeRequest()` mula sa `@/shared/utils/inputSanitizer` (nakabahaging set ng detector na ginagamit sa ibang lugar sa pipeline).
2. Built-in na `DEFAULT_GUARD_PATTERNS` (kasalukuyang `system_override_inline` at `markdown_system_block`, parehong `high` severity).
3. Ang opsyonal `customPatterns` ay ipinasa sa pamamagitan ng mga opsyon sa constructor (mga string, regex, o `{ name, pattern, severity }` na tala).

Kapag `mode === "block"`** at** hindi bababa sa isang pagtuklas ang nakakatugon sa threshold ng kalubhaan, ibinabalik ng `preCall` `{ block: true, message: "Request rejected: suspicious content detected" }`. Sa `warn`/`log` mode, ang guardrail ay nag-log ngunit pinapayagan ang tawag. Ang nakabahaging helper `evaluatePromptInjection()` ay na-export din para sa mga tumatawag na kailangang suriin ang mga prompt nang hindi dumadaan sa registry.

**Scan bound (v3.8.20):** ang detector ay nag-iinspeksyon lamang sa** unang 16 KB** ng sinalihang prompt text — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) sa `src/shared/utils/inputSanitizer.ts`. Parehong `detectInjection()` at `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` bago patakbuhin ang pattern loop. Ang mga direktiba sa pag-injection ay matatagpuan malapit sa tuktok ng isang input, kaya nililimitahan nito ang regex CPU/GC sa mga multi-hundred-KB na payload nang hindi humihina ang detection (cf. #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Tumatakbo sa** pareho** yugto, huling sa default na chain (priority `95`). Nag-redact ng mga kilalang API-key / secret-token pattern mula sa papalabas na payload (nilalaman ng mensahe, mga argumento ng tool-call, mga resulta ng tool)** at** ang tugon ng provider, kaya ang isang kredensyal na na-paste sa isang prompt (o na-echo pabalik ng isang resulta ng tool) ay hindi na-leak sa upstream provider o pabalik sa kliyente.

- **Mag-opt-in lang** , parehong convention bilang PII redaction (Hard Rule #20-adjacent): hindi pinagana maliban kung `settings.credentialRedactionEnabled === true`** o** `CREDENTIAL_REDACTION_ENABLED=true`. Kapag naka-off ito, ang guardrail ay isang no-op — na hinding-hindi nito naba-block at hindi na muling nagsusulat.
- Nilalakad `redactCredentials()` ang buong puno payload/response (`walkValue()`, prototype-pollution-safe, cycle-safe sa pamamagitan ng `WeakSet`) at pinapalitan ang mga tugma ng isang `[REDACTED:<type>]` placeholder, na nag-clone lang ng mga sanga na aktwal na nagbago.
- `CREDENTIAL_PATTERNS` covers LLM provider keys (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokens (GitHub, Slack, Linear, Notion, npm, Postman, Discord), payment keys (Stripe, Square), cloud keys (AWS access key, Twilio, SendGrid, Mailgun), private keys / JWTs, credential-bearing connection strings (`mongodb://user:pass@...`, etc.), and a generic `Authorization`/`x-api-key`/`api-key`/`apikey` header-value pattern. Header-shaped keys (`authorization`, `x-api-key`, `api-key`, `apikey`) are redacted structurally (value only, scheme prefix like `Bearer `/`Basic ` preserved) rather than via the generic text regex.
- Naka-mask ang isang value sa likod ng isang label kahit na wala itong prefix ng provider: `DB_PASSWORD=…`, `AWS_SECRET_ACCESS_KEY=…`, `client_secret: …`, `?api_key=…` (mga label: `password`, `passwd`, `secret`, `secret_key`, `secret_access_key`, `api_key`, `access_token`, `refresh_token`, `auth_token`, na may anumang prefix gaya ng `DB_`). Ang label at separator ay nananatili at ang halaga ay nagiging `[REDACTED:secret]`. Ang halaga ay nangangailangan ng 12 o higit pang mga character, kaya ang prosa gaya ng `password: required` ay mananatiling nababasa; ang isang halaga na nagsisimula sa `$` o `%` (isang variable na sanggunian) ay naiwan.
- Ang guardrail ay hindi kailanman nakaharang; nagre-rewrite lang ito (`modifiedPayload` / `modifiedResponse`) at nag-annotate (`meta.credentialsRedacted`, `meta.count`).

Regression guard: `tests/unit/credential-masker-guardrail.test.ts`.

### Ahente Guard (`agentGuard/`)

Inuuri ng ahenteng bantay ang kliyente sa likod ng isang kahilingan sa `claude` o `anthropic` provider mula sa mga header nito. `AGENT_GUARD_MODE` ay tumatagal ng tatlong halaga: `off` (default), `monitor` at `block`. Sa `off`, walang nabasang header at walang naka-log.

Ang mga opisyal na ahente ay kinikilala ng mga header na ito (kumpara case-insensitively):

- Claude Code: isang `User-Agent` na nagsisimula sa `claude-cli/` o `claude-code/`, o `x-app: cli` kasama ng isang `anthropic-beta` header o isang `User-Agent` na naglalaman ng `claude`.
- Anthropic SDKs: isang `User-Agent` na nagsisimula sa `Anthropic/`, `AsyncAnthropic/`, `anthropic-typescript/` o `anthropic-python/`.

Ang default na antas ng logger sa produksyon (`info`) ay nagpapakita ng parehong uri ng linya. Sa `APP_LOG_LEVEL=warn` lamang ang kilalang mga third-party na linya ang nananatili.

Mga field ng log: `agent`, `thirdParty`, `provider`, `model`, `apiKeyId`, `userAgent`, `xApp`, `anthropicBeta`, `xTitle`, `referer`, `stainless`. Ang mga halaga ng header at ang string ng modelo ay nililimitahan sa 200 character. Ang referer ay naka-log nang walang query string, fragment at userinfo nito. Ang API key, `Authorization`, `x-api-key` at cookies ay hindi kailanman nababasa.

Mga file: `src/lib/guardrails/agentGuard/classifier.ts`, `src/lib/guardrails/agentGuard/policy.ts`, `src/lib/guardrails/agentGuard/guardrail.ts`, `src/lib/guardrails/agentGuard/settings.ts`, `src/lib/guardrails/agentGuard/logLine.ts`, `src/lib/guardrails/agentGuard/enforcement.ts`, `src/sse/handlers/chat/agentGuardGate.ts`.

**Mga limitasyon sa pag-uuri (parehong mga mode):**

- Ang isang ahente na binuo sa isang opisyal SDK na hindi nagpapadala `X-Title`, `HTTP-Referer` o sariling `User-Agent` ay kamukha ng SDK. Ang mga header `x-stainless-*` lamang ay hindi ginagawang opisyal ang isang kliyente.
- Ang mga ahente ng third-party ay tinutugma ng mga token ng buong salita sa `User-Agent`, `X-Title` at `HTTP-Referer` (o `Referer`). Lumalabas ang mga hindi nakalistang kliyente bilang `unknown`.
- Ang mga kahilingan mula sa mga kliyenteng nakabatay sa browser ay nagdadala ng sariling `User-Agent` ng browser at lumalabas bilang hindi nakikilala, maliban kung `X-Title` o ang referer ay nagdadala ng kilalang third-party na token.
- Isang linya ng log sa bawat naobserbahang kahilingan: asahan ang dami sa mga abalang pagkakataon.

#### Subaybayan

Sa `AGENT_GUARD_MODE=monitor`, ang mga kahilingan kung saan ang string ng modelo ay pinangalanan ang `claude` o `anthropic` provider ay inuuri ayon sa mga header ng kanilang kliyente. Kapag ang kliyente ay hindi isang opisyal na ahente, isang log line na may `tag: "AGENT_GUARD"` ang nakasulat. Ito ay `warn` para sa isang kilalang third-party na ahente at `info` para sa isang hindi kilalang kliyente. Priority `1`: ang guardrail ay nagbabasa lamang ng mga header at hindi kailanman binabago ang payload, kaya ito ay tumatakbo bago ang media bridge. `monitor` ay hindi kailanman humaharang.

**Mga limitasyon ng `monitor`:**

- Ang bawat signal ay isang header na kinokontrol ng kliyente. Ito ay pagmamasid, hindi kontrol sa pag-access.
- Binabasa ang provider mula sa string ng modelo bago malutas ang modelo: `provider/model`, isang alias ng provider tulad ng `cc/…`, at mga quota-share id (`qtSd/<group>/<provider>/<model>`). Hindi sinusunod ang mga bare model id, model alias, combo at pag-normalize sa pagruruta sa ibang pagkakataon. Ang mga kahilingang iyon ay hindi sinusunod.
- Maaaring laktawan ito ng isang tumatawag sa bawat kahilingan sa pamamagitan ng mga channel sa pag-disable ng registry (tingnan ang [Pag-disable sa Guardrails Per-Request](#disabling-guardrails-per-request) ). Ang mga nilaktawan na kahilingan ay hindi sinusunod.
- Gumagana lamang ito kung saan tumatakbo `runPreCallHooks` (tingnan [ang Saklaw at mga limitasyon](#coverage-and-limits) ).

#### I-block

Sa `AGENT_GUARD_MODE=block`, walang ginagawa ang pre-call guardrail. Ang tagapangasiwa ng chat ang gumagawa ng desisyon:

1. Ang desisyon ay ginawa kapag ang isang target ay malapit nang ipadala, sa provider kung saan nalutas ang kahilingan. Saklaw ang mga alias ng provider, hubad na modelong id, quota-share id at bawat combo target.
2. Hindi ito tumatakbo sa registry ng guardrail, kaya hindi nalalapat dito ang per-request disable channels.
3. Ang isang kilalang ahente ng third-party ay tinanggihan. Ang isang hindi kilalang kliyente ay naka-log bilang sa `monitor`, at tinanggihan lamang gamit ang `AGENT_GUARD_STRICT=true`. Claude Code at ang opisyal Anthropic SDKs ay hindi kailanman tinatanggihan.
4. Ang pagtanggi ay HTTP 403 na may `error.type` `permission_error` at `error.code` `client_agent_not_allowed`. Ang katawan ay isang OpenAI-style na error. Sa mga kahilingan sa format na Anthropic, nagdadala din ito `type: "error"` sa pinakamataas na antas. Walang `Retry-After` header, at ibinalik ang pagtanggi bago magsimula ang anumang stream.
5. Ang pagtanggi ay hindi pagkabigo ng provider. Hindi nito ginagalaw ang circuit breaker ng provider, mga cooldown ng koneksyon o mga lockout ng modelo.
6. Sa isang combo, ang isang tinanggihang target ay nilaktawan at ang natitirang mga target ay tumatakbo. Nabigo ang kahilingan sa error sa patakaran nang hindi bababa sa isang target ang tinanggihan at walang target na nakalampas sa guard. Pinapanatili ng combo ang sarili nitong error kapag pinangalanan ng isang top-level na entry ang isa pang kilalang provider, sa pamamagitan ng prefix o ng provider id ng hakbang. Ang tinanggihang target na priyoridad na may `fallbackOnlyOnQuotaExhaustion` ay nilaktawan sa parehong paraan at hindi humihinto sa combo. Ang isang shadow target ay sinusuri at naka-log, ngunit hindi ito binibilang bilang isang target na nakalampas sa guard.
7. Nabigo ang `fusion` combo bago tumakbo ang panel kapag tinanggihan ang judge na gagamitin ng fusion service. Ang judge na iyon ay nagmula sa configuration ng combo o mula sa mga global combo default. Ang parehong check ay tumatakbo kapag ang isang fusion combo ay naabot sa pamamagitan ng safety-net redirect.
8. Isang log line bawat kahilingan at provider, na may `tag: "AGENT_GUARD"`, `warn` para sa pagtanggi, at parehong mga field bilang `monitor`.
9. Sa isang panloob na error ang bantay ay nabigo sa pagbukas. Nagpapatuloy ang kahilingan at naka-log ang isang `warn` line na `agent guard failed open`.

**Mga limitasyon ng `block`:**

- Ang bawat signal ay isang header na kinokontrol ng kliyente. Ang isang kliyente na nagpapadala ng `User-Agent: claude-cli/…` ay itinuturing bilang Claude Code. pinipigilan `block` ang mga hindi nabagong ahente ng third-party. Hindi ito access control.
- Ang isang proxy na nag-aalis ng mga nagpapakilalang header ay ginagawa ang sinumang kliyente sa isang hindi nakikilalang isa. Ang nasabing kliyente ay pinaglilingkuran nang walang `AGENT_GUARD_STRICT` at tumanggi kasama nito. Patakbuhin ang bantay sa instance na nakaharap sa mga kliyente. Ang pangalawang OmniRoute na instance sa likod ng una ay nakikita ang mga header ng una.
- tinatanggihan `AGENT_GUARD_STRICT` ang bawat kliyente sa mga provider na iyon na hindi Claude Code o isang opisyal SDK. Kasama rito ang mga kliyenteng nakabatay sa browser at ang dashboard playground. Ang dashboard combo live test ay exempt, sa pamamagitan din ng safety-net redirect.
- Ang ilang mga tampok ay bumubuo ng kanilang sariling kahilingan sa chat sa halip na ipasa ang kahilingan ng kliyente. Apat sa kanila ang nagpapadala nito pabalik sa mga ruta ng `/v1/...` ni OmniRoute:
  - mga batch na trabaho (`src/lib/batches/dispatch.ts`)
  - ang MCP inference tools (`open-sse/mcp-server/tools/inferenceTools.ts`)
  - A2A smart routing (`src/lib/a2a/skills/smartRouting.ts`)
  - ang tulay ng paningin kapag naglalarawan ito ng isang imahe sa pamamagitan ng OmniRoute (`src/lib/guardrails/visionBridgeHelpers.ts`)
- Binubuo ng Telegram chat proxy (`src/lib/telegram/chatProxy.ts`) ang kahilingan nito sa proseso at direktang tinatawagan ang tagapangasiwa ng chat.
- Ang mga panloob na kahilingang iyon ay nagdadala ng sariling mga header ni OmniRoute, hindi ang mga header ng kliyente na nagsimula sa kanila. Inuri sila ng guwardiya bilang mga hindi kilalang kliyente.
- Kung walang `AGENT_GUARD_STRICT`, ang mga panloob na kahilingan ay ihahatid sa mga binabantayang provider kung sino man ang orihinal na kliyente. Ang isang third-party na ahente na umabot sa Claude sa pamamagitan nila ay hindi tinatanggihan.
- Sa `AGENT_GUARD_STRICT`, ang mga panloob na kahilingan ay tinatanggihan sa mga binabantayang provider kung sino man ang nagsimula sa kanila, kasama ang Claude Code.
- Tanging ang mga kahilingan na dumaan sa chat handler ang naka-gate. Direktang tinatawag ng model validation (`src/lib/modelValidation/runner.ts`) ang request core at hindi naka-gate.
- Tanging ang mga tagapagbigay ng `claude` at `anthropic` ang saklaw. Ang mga modelong Claude na inihahatid ng isa pang provider ay hindi saklaw, at gayundin ang `claude-web` provider.
- Pinangalanan ng ilang combo ang kanilang mga natitirang target nang walang prefix ng provider, bilang mga bare model id o nested combo. Kapag hindi available ang mga target na iyon para sa hindi nauugnay na dahilan (open breaker, cooldown, lockout), nabigo ang kahilingan na may error sa patakaran.
- Ang isang nilaktawan na combo target ay nagki-clear sa huling kilalang-mahusay na pin ng target, gaya ng ginagawa ng anumang nilaktawan na target.
- Ang isang fusion judge na pinangalanang may guarded provider prefix ay tinanggihan bago tumakbo ang panel. Sinasaklaw nito `anthropic/…`, `claude/…`, isang alias gaya ng `cc/…`, isang context suffix gaya ng `[1m]`, at mga pangalan ng pagbabahagi ng quota sa mga provider na iyon.
- Ang isang fusion judge na isinulat bilang isang hubad na modelong id, o bilang isang modelong alyas na nagresolba sa isang binabantayang provider, ay tatanggihan lamang kapag ito ay ipinadala. Ang panel ay tumakbo na noon. Ang pagbibigay ng pangalan sa hukom gamit ang prefix ng provider nito ay maiiwasan iyon. Walang nakarating na spelling ng judge sa isang binabantayang provider na hindi tinatanggihan.
- Ang pre-check ay tumatanggi sa isang naka-configure Claude judge kahit na ang fusion service ay i-drop ang judge na iyon sa oras ng pagtakbo. Ibinaba ng serbisyo ang isang hukom na itinago ng operator, at isang hukom na hindi maaaring kumuha ng media ng kahilingan. Ang pangalawang kaso ay sumasaklaw sa hindi kumpirmadong suporta sa paningin at iba pang media na hindi tinatanggap ng hukom. Ang parehong combo path ay kumikilos sa ganitong paraan.
- Sa safety-net redirect, ang combo service ay tumatanggap ng mga walang laman na setting. Ang isang hukom na itinakda lamang sa mga global combo default ay hindi kailanman ginagamit doon.
- Habang naka-on ang `block`, ang isang kliyente na tatanggihan ng guard sa isang binabantayang provider ay hindi gumagamit ng sidecar fast path, para sa anumang modelo. Sa ilalim ng `AGENT_GUARD_STRICT` iyon ay ang bawat hindi kilalang kliyente. Pagkatapos ng relay token check nito, sinasagot `POST /v1/relay/chat/completions/bifrost` ang mga kahilingang iyon gamit ang 503 at `X-Bifrost-Fallback` header.
- `POST /v1/messages/count_tokens` ay nagbibigay ng lokal na pagtatantya sa isang kliyente na tatanggihan ng guard sa provider kung saan niresolba ang modelo.
- Walang per-key exemption.

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

Inilalantad ng singleton `guardrailRegistry` :

- `register(guardrail)` — ay nagdaragdag (o pinapalitan ng normalized na pangalan) ng isang guardrail at muling nag-uuri sa pamamagitan ng pataas `priority`.
- `clear()` / `list()` — administrative helpers.
- `runPreCallHooks(payload, context)` — ay umuulit ng mga aktibong guardrail, nilalagay ang payload sa `modifiedPayload`, at humihinto sa unang `block: true`.
- `runPostCallHooks(response, context)` — parehong daloy sa gilid ng tugon.
- Nililinis ng `resetGuardrailsForTests({ registerDefaults })` — ang estado at opsyonal na muling irehistro ang mga default para sa malinis na pagsubok na paghihiwalay.

Ang parehong runner ay nagbabalik `{ blocked, payload|response, results, guardrail?, message? }` kung saan `results` ay isang hanay ng mga `GuardrailExecutionResult` record na may kasamang per-guardrail `blocked`, `skipped`, `modified`, `error`, at `meta` na mga field, na kapaki-pakinabang para sa pagsubaybay.

### Hindi pagpapagana ng Guardrails Bawat Kahilingan

Pinagsasama-sama `resolveDisabledGuardrails({ apiKeyInfo, body, headers })` ang isang de-duplicated na listahan ng mga pangalan ng guardrail na dapat laktawan para sa kasalukuyang kahilingan. Mayroong limang channel, basahin sa ganitong pagkakasunud-sunod at pinagsama sa isang listahan (panalo ang unang pangyayari kapag nagde-de-duplicate):

1. `apiKeyInfo.disabledGuardrails`
2. Humiling ng body `disabledGuardrails` (nangungunang antas)
3. Humiling ng body `metadata.disabledGuardrails` (lamang kapag `metadata` ay isang bagay)
4. Header `x-omniroute-disabled-guardrails`
5. Legacy na header `x-disabled-guardrails`

Pinagsama ang lahat ng limang channel, kasama ang dalawang header: nilaktawan ng pagpapadala ng parehong `x-omniroute-disabled-guardrails` at `x-disabled-guardrails` ang pagsasama ng kanilang mga listahan, at hindi na itinatago ng isang walang laman na modernong header ang legacy ( [#16412](https://github.com/cheaper-inference/OmniRoute/issues/16412), fixed sa [#16805](https://github.com/cheaper-inference/OmniRoute/pull/16805) ).

Ang mga value ay maaaring mga array ng mga string o isang comma-separated string; ang mga pangalan ay pinuputol at na-normalize sa lowercase na kebab-case (`pii_masker` → `pii-masker`), at ang mga walang laman na entry ay ibinabagsak. Ang resulta ay ipinapasa sa `context.disabledGuardrails` sa registry, na lumalaktaw sa pagtutugma ng mga guardrail (`skipped: true` in `results`).

Ang listahan ng hindi paganahin ay nakakaapekto lamang sa** pagpapatala** . Ang prompt-injection `block` mode ay isang mandatoryong hangganan: ang injection-guard middleware (`src/middleware/promptInjectionGuard.ts`) ay tumatawag `evaluatePromptInjection()` nang walang anumang caller-controlled disable list (ang patay `resolveDisabledGuardrails({ body })` na tawag na ginamit nito ay inalis sa [#16934](https://github.com/cheaper-inference/OmniRoute/pull/16934) ), kaya ang isang kahilingan na nagdi-disable `prompt-injection` ay tinatanggihan pa rin sa `block` mode. Ito ay sa pamamagitan ng disenyo. Ang mga channel na hindi paganahin ay kinokontrol ng tumatawag (katawan ng kahilingan, metadata, mga header), at hindi dapat ma-off ng tumatawag ang isang kontrol sa seguridad na itinakda ng operator ( [#16413](https://github.com/cheaper-inference/OmniRoute/issues/16413) ). Binabago lang ng unyon ng header mula sa [#16412](https://github.com/cheaper-inference/OmniRoute/issues/16412) kung aling mga registry guardrail ang nilalaktawan; hindi nito hinahayaan ang isang kliyente na lampasan ang middleware. Ang mga ipinag-uutos na patakaran sa bawat key at per-group na guardrail ay sinusubaybayan sa v4 RFC [#16417](https://github.com/cheaper-inference/OmniRoute/issues/16417). Tingnan [ang Saklaw at mga limitasyon](#coverage-and-limits).

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

## Saklaw at limitasyon

Ang registry ng guardrail ay naka-wire sa pipeline ng chat lamang. Ang mga limitasyong ito ay naka-pin ng `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` at `tests/unit/guardrail-pipeline-characterization.test.ts`; i-update ang mga pagsubok na iyon nang kusa kapag nagbago ang gawi.

### Kung saan tumatakbo ang mga kawit

| Hook / kontrol                         | Tumatakbo sa                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                      | Mga kahilingang pinangangasiwaan ng `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (at `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*`, at ang Telegram chat proxy. Gayundin ang dashboard test endpoint `/api/guardrails/test`. Nagbabalik ng HTTP 400 ang pre-call block. |
| `runPostCallHooks`                     | **Non-streaming** mga tugon sa chat lamang (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Ang mga naka-stream na tugon ay hindi makakarating dito.                                                                                                                                                                                                                                                                                             |
| Nag-stream PII                         | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), ipinapa-pipe sa `streamingPipeline.ts` kapag naka-on ang `PII_RESPONSE_SANITIZATION`. Hindi ito isang guardrail, kaya hindi ito naaapektuhan ng mga channel na hindi pinagana.                                                                                                                                                                                                            |
| Nababaligtad na PII vault              | Ang mga kahilingan ay hinahawakan ng `handleChat` lamang, kapag naka-on `PII_REDACTION_ENABLED` at `PII_REVERSIBLE_VAULT_ENABLED`. Ang mga token ay mined ng `pii-masker` pre-call at ibinalik sa `handleChat` exit (`src/lib/pii/requestTokenVaultScope.ts`). Ang hindi pagpapagana `pii-masker` para sa isang kahilingan ay nangangahulugan na walang na-minted.                                                                                      |
| middleware ng injection-guard (legacy) | Bawat mabilis na may dalang `/v1` na ruta, kasama ang chat-family (tingnan [ang saklaw ng ruta](#injection-guard-route-coverage--red-team-phase-8--block-d) ). Prompt injection lang.                                                                                                                                                                                                                                                                   |

### Ano ang hindi sakop

- **Mga ruta ng media, pag-embed at data** (`/v1/images/*`, `/v1/embeddings`, `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/rerank`, `/v1/search`, `/v1/moderations`) hindi kailanman maabot ang registry. Walang PII masking, credential masking o modality bridge na tumatakbo doon. Ang kanilang tanging tseke ay ang legacy injection-guard middleware.
- **Mga naka-stream na tugon** huwag kumuha ng post-call guardrails: walang `pii-masker` o `credential-masker` post-call, at walang post-call block. Ang streaming PII transform lang ang nalalapat (kapag naka-on ang `PII_RESPONSE_SANITIZATION` ). Ang isang kredensyal na na-echo pabalik sa isang naka-stream na tugon ay hindi na-redact.
- **Huwag paganahin ang mga channel kumpara sa middleware (ayon sa disenyo):** sinusuri ng middleware ang agarang pag-iniksyon gamit ang sarili nitong tawag sa `evaluatePromptInjection()`, nang hindi nagpapasa ng anumang listahan ng hindi paganahin na kinokontrol ng tumatawag. `block` mode ay isang ipinag-uutos na hangganan na hindi maaaring lampasan ng kontrolado ng tumatawag, kasama ang mga ruta ng chat-family ( [#16413](https://github.com/cheaper-inference/OmniRoute/issues/16413) ). Ang hindi pagpapagana `prompt-injection` ay nilalaktawan lamang ang registry guardrail.

### Ano ang nakikitang tugon bago ang post-call

Sa non-streaming path ang order ay: memory extraction → built-in tool execution → post-call guardrails → post-call block exit → semantic-cache store.

- **Pagkuha ng memorya** at** pagpapatupad ng tool** tingnan ang tugon bago ito maisulat muli o ma-block ng mga post-call guardrails. Dahil [#16401](https://github.com/cheaper-inference/OmniRoute/pull/16401), pinapatakbo ng memory extraction ang na-extract na text sa pamamagitan ng `sanitizePII` kapag naka-on ang `PII_RESPONSE_SANITIZATION` (parehong streaming at non-streaming), ngunit isang tugon na hinaharangan pagkatapos ng tawag sa ibang pagkakataon ay iniaalok pa rin sa memorya at mga tool.
- **Ang semantic cache** Iniimbak ang tugon pagkatapos ng post-call, kaya iniimbak nito ang muling isinulat na tugon, at ang isang naka-block na tugon ay hindi kailanman na-cache. Ang mga entry sa cache ay naka-key sa bawat API key.

## Configuration

Mga variable ng kapaligiran na binabasa ng mga built-in na guardrail:

| Variable                              | Ginamit ng                 | Epekto                                                                                                                                 |
| ------------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Itakda ang `false` upang ganap na huwag paganahin ang pagtuklas.                                                                       |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Patakaran sa pag-injection: `warn`, `block`, o `log`. Ang legacy na halaga `redact` ay hindi muling isinusulat ang teksto ng iniksyon. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Mode para sa bantay ng iniksyon; din ng isang DB tampok na bandila na** overrides** ang env vars (DB > ENV).                           |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Minimum na kalubhaan na tinatanggihan `MODE=block` : `high` (default), `medium`, o `low`.                                              |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | Legacy alias para sa `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                                |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Kapag `true`, ang hiling na PII ay na-redact (independiyente sa injection mode).                                                       |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | Sa `PII_REDACTION_ENABLED`, mint reversible token at i-restore ang mga ito sa 2xx na tugon.                                            |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (pababa)      | Kinokontrol ang response-side mask na gawi.                                                                                            |
| `AGENT_GUARD_MODE`                    | `agent-guard`              | `off` (default), `monitor` o `block`. Gayundin isang DB feature flag (DB > ENV).                                                       |
| `AGENT_GUARD_STRICT`                  | `agent-guard`              | `false` (default) o `true`. Sa `block`, tinatanggihan din ang mga hindi kilalang kliyente. Gayundin isang DB feature flag (DB > ENV).  |

Binabasa ng mga guardrail ng Modality Bridge ang runtime config mula sa DB-backed settings store (`getSettings()`), hindi env vars. Ang mga pangunahing key ng Vision ay `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, at `modalityBridgeCacheMaxEntries`. Ang mga legacy `visionBridge*` key ay tinatanggap lamang bilang ang dokumentadong one-cycle read fallback; Ang mga pagsusulat ng dashboard ay gumagamit ng mga pangunahing key. Ang mga default at ang fallback na solver ay nakatira sa `src/shared/constants/modalityBridgeDefaults.ts`, na may mga legacy na constant na nananatili sa `src/shared/constants/visionBridgeDefaults.ts`.

Gumagamit ang audio `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`, `modalityBridgeAudioTimeout`, at `modalityBridgeAudioMaxClips`, kasama ang mga nakabahaging setting `modalityBridgeCache*`. Walang legacy-key fallback ang audio dahil ang mga key na ito ay ipinakilala sa schema ng Modality Bridge.

Gumagamit ang video `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`, `modalityBridgeVideoModel`, `modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`, `modalityBridgeVideoMaxVideos`, at `modalityBridgeVideoTimeout`, kasama ang mga nakabahaging setting `modalityBridgeCache*`. Ito ay hindi pinagana bilang default dahil FFmpeg/ffprobe ay mga opsyonal na dependency sa pagpapatakbo at ang frame captioning ay nagdaragdag ng latency at gastos ng modelo.

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

Sinasaklaw ng injection-guard (`createInjectionGuard` / `withInjectionGuard`) ang lahat ng ruta na tumatanggap ng mga senyas ng user. Iginagalang nito `INJECTION_GUARD_MODE` (default `warn` = log lamang; `block` = ay nagbabalik HTTP 400 `SECURITY_001`).

| Uri              | Mga Ruta                                                                                                                                             | Default na mode |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| Teksto (umiiral) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | babala          |
| Generative       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | babala          |
| Data             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | babala          |

Ang pagkuha ng teksto (`extractMessageContents`) ay sumasaklaw sa `messages`/`input`/`prompt`/`query` + `documents`/`instructions`/`system`.

**Red-team (gabi-gabi, `nightly-llm-security.yml`):** pinapatunayan ng promptfoo na hinaharangan ng bawat ruta ang OWASP-LLM corpus sa `INJECTION_GUARD_MODE=block`; si garak ay nagpapatakbo ng mga pagsisiyasat (lumalaktaw nang walang lihim). `moderations` ay kasama para sa pagkakapare-pareho. Ang block mode ay isang mandatoryong hangganan: hindi pinapansin `evaluatePromptInjection()` ang per-request na disable list na ipinapasa ito ng middleware, kaya ginagawa ito `disabledGuardrails`** hindi** exempt ang isang ruta mula dito ( [#16413](https://github.com/cheaper-inference/OmniRoute/issues/16413) ).

Ang nightly workflow (`.github/workflows/nightly-llm-security.yml`, cron + manual dispatch) ay may dalawang trabaho:

- **`promptfoo-guard` (pagharang)** — ay nagpapatakbo ng `promptfoo eval -c promptfooconfig.yaml` na may `INJECTION_GUARD_MODE=block`. Ang bawat adversarial case (hal. "balewala ang lahat ng naunang tagubilin...", DAN-style jailbreaks) ay nagsasaad na ang tugon ay nagdadala ng `error.code === "SECURITY_001"`, ibig sabihin, tinanggihan ng guard ang kahilingan.
- **`garak` (advisory)** — ay nagpapatakbo ng garak `--probes promptinject,dan,leakreplay` laban sa isang lokal OmniRoute instance (`http://localhost:20128/v1`). Gated sa isang lihim ng provider (`PROMPTFOO_PROVIDER_KEY`); lumalaktaw nang maganda at may suffix na `|| true`, kaya nag-uulat ito nang hindi nabigo CI.

Ang saklaw ng guard helper (`createInjectionGuard` / `withInjectionGuard`) ay sumasaklaw sa bawat agarang rutang `/v1` ; Ang prompt na text ay kinukuha mula sa `messages`/`input`/`prompt`/`query` + `documents`/`instructions`/`system` ng `extractMessageContents()` sa `src/shared/utils/inputSanitizer.ts`.
