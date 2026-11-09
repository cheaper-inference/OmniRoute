# Guardrails (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **සත්යයේ මූලාශ්රය:** `src/lib/guardrails/`
> **අවසන් යාවත්කාලීන කිරීම:** 2026-10-17 — v3.8.52 (එක් කළේ [ආවරණය සහ සීමාවන්](#coverage-and-limits):
> hooks ළඟා වන routes සහ response paths, ඒකාබද්ධ කළ අක්රිය කිරීමේ headers (#16412), අනිවාර්ය
> මායිමක් ලෙස injection අවහිර කිරීමේ මාදිලිය (#16413), සහ post-call ට පෙර ප්රතිචාරයක් දකින්නේ කුමක් ද යන්න)

Guardrails විසින් OmniRoute සහ upstream providers අතර මායිමේදී ආරක්ෂාව, ප්රතිපත්ති සහ අන්තර්ගත පරිවර්තනයන් බලාත්මක කරයි. සෑම guardrail එකක්ම request payloads (`preCall`) සහ upstream responses (`postCall`) පරීක්ෂා කළ හැක (සහ අවශ්යයෙන් ප්රතික්ෂේප කළ හැක, පරිවර්තනය කළ හැක, හෝ සටහන් කළ හැක).

මෙම පද්ධතිය **fail-open** වේ: guardrail එකක් ක්රියාත්මක වන අතරතුර දෝෂයක් විසි කළහොත්, registry එක request එක අසාර්ථක කරනවා වෙනුවට දෝෂය සටහන් කර ඊළඟ guardrail එක සමඟ ඉදිරියට යයි. අවහිර කිරීම පැහැදිලි තීරණයකි (`block: true`), කිසිවිටෙක අහම්බයක් නොවේ. එකම ව්යතිරේකය අත්හිටුවන ලද request එකකි: අමතන්නාගේ `signal` අත්හිටුවන විට, දෝෂයක් විසි කරන guardrail එකක් මඟහරිනු වෙනුවට hook ධාවනය ප්රතික්ෂේප කරයි.

Hooks සෑම route එකකදීම හෝ සෑම response එකකදීම ක්රියාත්මක **නොවේ**. Guardrail එකක් ආරක්ෂක පාලනයක් ලෙස විශ්වාසයට ගැනීමට පෙර [ආවරණය සහ සීමාවන්](#coverage-and-limits) කියවන්න.

## අන්තර්ගත ආරක්ෂණ

ආනයනය කරන අවස්ථාවේදී registry එක priority අනුපිළිවෙළට ආරක්ෂණ හයක් ස්වයංක්රීයව load කරයි
(`registry.ts` → `registerDefaultGuardrails()` බලන්න):

| Priority | Name                | Stage(s)       | File                  |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

අඩු priority අංක සහිත ඒවා **පළමුව** ක්රියාත්මක වේ.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

GLM 5.3 මූලික model එකට සහ `glm-5.3-{low,high,max}` වෙත පැහැදිලි
`supportsVision:false` registry/spec metadata ඇත. GLM 5.3 Flash variants
native-vision models ලෙස පවතී. Claude Code හි `/v1/messages` route එක
Claude-to-OpenAI පරිවර්තනයට පෙර, හවුල්
`handleChat` pre-call guardrail chain එකට ඇතුළු වේ; එබැවින් nested
`Read` tool-result images OpenAI `image_url` content බවට පරිවර්තනය වීමට පෙර
විස්තර කළ යුතු හෝ වෙනත් ආකාරයකින් හසුරුවිය යුතුය (#17069).

**vision නොසපයන models** වෙත යොමු කර ඇති image-bearing requests අතුරුග්රහණය කර,
සම්පූර්ණ request එක vision-capable model එකකට නැවත යොමු කරයි හෝ upstream call එකට පෙර
configurable vision model එකක් මඟින් නිපදවන text descriptions සමඟ image parts
ප්රතිස්ථාපනය කරයි. මෙය text-only providers හට multimodal payloads
පාරදෘශ්යව හැසිරවීමට ඉඩ සලසයි.

ප්රවාහය:

1. ඉලක්ක model එක දැනටමත් vision සඳහා සහාය දක්වන්නේ නම් skip කරයි
   (එය බලහත්කාර bridge ලැයිස්තුව `isVisionBridgeForcedModel` තුළ පෙනී සිටින්නේ නම්
   හැර).
2. `extractImageParts(messages)` හරහා image parts උපුටා ගනී
   (`visionBridgeHelpers.ts`), එය **ඒකාබද්ධ media detector** එක වන
   `open-sse/utils/mediaParts.ts` හි `detectMediaParts()` වෙත delegation කරයි —
   combo compatibility filter සමඟ බෙදාගන්නා එකම සත්ය මූලාශ්රය මෙයයි.
   උපුටා ගැනීම, `replaceImageParts` හට නැවත splice කළ හැකි shapes වෙත පමණක්
   allowlist කර ඇත (extract↔replace contract): OpenAI `image_url`,
   Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`,
   සහ Responses API `input_image`. Claude Code
   `tool_result.content` සහ Responses tool outputs තුළ nested වී ඇති matching
   images ද ඒවායේ මුල් paths වලින් උපුටා ගෙන ප්රතිස්ථාපනය කරයි; indicator-only
   shapes combo-filter material වන අතර උපුටා නොගනී.
   කිසිවක් හමු නොවන්නේ නම් skip කරයි.
3. `resolveVisionBridgeRuntimeSettings()` හරහා runtime config විසඳයි
   (`src/shared/constants/modalityBridgeDefaults.ts`): නව `modalityBridge*`
   settings keys ප්රමුඛ වන අතර; legacy `visionBridge*` keys
   **එක් cycle එකක fallback** එකක් ලෙස පවතී (rollback window). bridge එක
   disabled නම් media traversal එකකට පෙරම skip කරයි.
4. Mode selector (`modalityBridgeVisionMode`, පහත වගුව බලන්න) reroute ද
   describe ද යන්න තීරණය කරයි. Reroute මඟින් `model` පමණක් මාරු කළ
   `modifiedPayload` එකක් සහ `{ rerouted, fromModel, toModel, imagesKept }`
   meta එකක් ආපසු ලබා දෙයි.
5. Describe path: `maxImages` මඟින් images සීමා කර, task-aware prompt එක
   සකස් කර, describe cache එක පරීක්ෂා කර, vision model එකට **සමාන්තරව**
   (`Promise.allSettled`) call කර, ඒවා තිබූ ස්ථානයේ
   `[Image N]: <description>` text parts ඇතුළත් කරයි. Describe එකක් අසාර්ථක වූ විට
   `null` ලැබේ: unknown/vision-capable targets සඳහා raw image එක
   සංරක්ෂණය කරයි (#4012), නමුත් **තහවුරු කළ text-only direct target** එකකට
   හෝ zero-vision combo එකකට, describe නොකළ සෑම image එකක් සඳහාම, describe-call cap
   ඉක්මවන images සහ partial failures ඇතුළුව, පැහැදිලි
   `(unavailable — no vision-capable provider connected)` text stub එකක් ලබා දෙයි
   (#17069). සියල්ල අසාර්ථක වූ combo describe fallback එක දැනටමත් පවතී (#8430).
6. `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`) ආපසු ලබා දෙයි.

#### Mode selector (`modalityBridgeVisionMode`)

| Mode       | Default | Behavior                                                                                                                                                                                                                                                                                          |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | පැරණි heuristic එක, වෙනසක් නොමැතිව (#6640/#7204): non-combo/`auto/` models මුල් model එකට භාවිත කළ හැකි credentials දැනටමත් තිබේ නම් (එවිට describe කරයි) හැර, හොඳම vision model වෙත reroute කරයි; combo targets සෑම විටම describe කරයි.                                                          |
| `describe` |         | සෑම විටම describe කරයි — reroute block එක සම්පූර්ණයෙන්ම skip කරයි; පරිශීලකයා තෝරාගත් model එක සෑම විටම පිළිතුරු සපයයි.                                                                                                                                                                            |
| `reroute`  |         | Reroute බලහත්කාරයෙන් සිදු කරයි: keep-credentialed-model guard එක bypass කරයි. Reroute-**target** credential guard එක තවමත් අදාළ වේ — භාවිත කළ හැකි vision target එකක් නොමැති විට, bridge එක පැහැදිලි දෝෂයක් සමඟ අවහිර කරයි; describe කිරීම හෝ raw images text-only target එකකට යැවීම සිදු නොකරයි. |

බලහත්කාර modes, auto heuristic එක ක්රියාත්මක වීමට පෙරම එය short-circuit කරයි;
`auto` හැසිරීම PR-1ට පෙර guardrail එකට byte-identical වේ.

#### API-key scope (`visionBridgeKeyScope.ts`)

අමතන්නාගේ API යතුර `allowedConnections`, quota pool
(`allowedQuotas`) හෝ model (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`) සීමා කරන විට, bridge එක
තෝරා ගන්නේ යතුරට භාවිත කළ හැකි connections මත, යතුරට භාවිත කළ හැකි reroute සහ
describe models පමණි. එවිට describe call එක සැමවිටම
`x-omniroute-self-loop-key-id` header සමඟ OmniRoute self-loop හරහා යන බැවින්,
ලැබෙන chat request එක එම යතුරේ connection සහ model ප්රතිපත්තිය නැවතත් බලගන්වයි.
`enforceApiKeyPolicy()` එම header එක සැලකිල්ලට ගන්නේ self-loop bearer එක සමඟ පමණක්
වන බැවින්, එයට කළ හැක්කේ ප්රවේශය තවදුරටත් සීමා කිරීම පමණි. resolve නොවන id එකක්
ප්රතික්ෂේප කරනු ලැබේ.

යතුර සඳහා vision model එකක්වත් අවසර ලත් එකක් නොමැති නම්, **තහවුරු කළ
text-only target** එකක් image request එක upstream එකට යැවීම වෙනුවට පැහැදිලි HTTP
400 එකක් සමඟ locally ප්රතික්ෂේප කරයි (#17069). Unknown හෝ native vision
capability සහිත targets සඳහා describe path එක පෙර fail-open හැසිරීමම තබා ගනී
(meta `{ skipped: true, reason: "no_permitted_vision_model" }`). යතුරක් නොමැති
requests සහ මෙම සීමා නොමැති keys පෙර මෙන්ම ක්රියා කරයි.

#### Task-aware describe prompt (`modalityBridgeVisionTaskAware`)

පෙරනිමි අගය **true** වේ. `composeVisionPrompt()` (`visionBridgeHelpers.ts`)
මූලික describe prompt එකට **අවසන් user message** එකේ පෙළ (අක්ෂර 500කට සීමා කර)
එක් කරයි. මෙය පරිශීලකයා සැබවින්ම ඉල්ලා ඇති දේ වෙත විස්තරය යොමු කරයි
(codex-vision-proxy pattern) සහ පෙනෙන පෙළ transcribe කරන ලෙස vision model එකෙන්
ඉල්ලා සිටී. Flag එක off කළ විට — හෝ user text නොමැති විට — මූලික prompt එක
වෙනස් නොකර භාවිත කරයි.

Describe self-loop එකේම OpenAI-compatible request එක
(`visionBridgeHelpers.ts` හි `callVisionModelSingle()`) සැමවිටම
`image_url.detail: "high"` ඉල්ලා සිටී — කිසිදු caller/provider කෙනෙකු සඳහා
කොන්දේසිගත නොව, සෑම විටම. අඩු-detail sampling මඟින් මෙම prompt එක ඉල්ලා සිටින
නිශ්චිත text-transcription task එකේ OCR නිරවද්යතාව අඩු වන බැවින්, මුල් inbound
request එකේ භාවිත කළ detail මට්ටම කුමක් වුවත් describe call එකම සැමවිටම high
detail ඉල්ලා සිටී. මෙය බලපාන්නේ අභ්යන්තර describe request body එකට පමණි;
ප්රධාන request එකේ caller ගේම `image_url.detail` OmniRoute forward කරන ආකාරය
එය වෙනස් නොකරයි — එම පෙරනිමිය වෙනම, හඳුනාගත් OpenCode clients සඳහා පමණක්
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`) තුළ යෙදේ.
Describe self-loop හි Anthropic wire-format branch එකේ `detail` field එකක්
නොමැති බැවින්, එයට මෙම පෙරනිමි දෙකෙන් කිසිවක් බලපාන්නේ නැත.

#### Describe output cap (`modalityBridgeVisionMaxChars`)

| Key                            | Default | Range            |
| ------------------------------ | ------- | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` හෝ 100–50000 |

`0` (පෙරනිමි අගය) යනු **සීමාවක් නොමැති බවයි** — `callVisionModel()` මඟින් ආපසු
ලබා දෙන description එක වෙනස් නොකර pass through කරයි. එමඟින් පවතින හැසිරීම
සුරැකේ. 100–50000 පරාසයේ ඕනෑම අගයක් description එක `…` suffix එකක් සමඟ truncate
කර, එය `[Image N]: <description>` ලෙස නැවත ඇතුළත් කිරීමට පෙර යොදයි
(`src/lib/guardrails/visionBridge.ts` හි `VisionBridgeGuardrail.preCall()`). Downstream
model එකට සම්පූර්ණ transcription එක අවශ්ය වන detail-heavy OCR tasks සඳහා මෙය
වැඩි කරන්න; බොහෝ දේ කියන vision models මත token භාවිතය සීමා කිරීමට මෙය අඩු
කරන්න. Dashboard field එක Vision tab එකේ Advanced panel එකේ ඇත
(`ModalityBridgeVisionTab.tsx` හි `modality-bridge-max-chars`). එය 1 සහ 99 අතර
ඕනෑම අගයක් 100 floor එක දක්වා ඉහළට clamp කරන අතර, explicit `0` එක නොවෙනස්ව
තබා ගනී — `0` යනු තමන්ගේම වලංගු Zod අගයකි
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), හුදෙක්
"unset" පෙරනිමියක් නොවේ.

#### Describe cache (`modalityBridge/bridgeCache.ts`)

Describe outputs සඳහා process-wide ලෙස හවුල් වන in-memory LRU + TTL cache එකකි.
Key එක = length-prefix framing සහිත
`sha256(imageRef + composedPrompt + configuredBridgeModel)` (එමඟින් field-boundary
collisions නොමැත). Model component එක වන්නේ ඇත්ත වශයෙන් පිළිතුරු දුන් model එක
නොව, **configured** bridge model එකයි —
`callVisionModel` අභ්යන්තරව fallback විය හැකි බැවින්, එක් එක් attempt එක අනුව
key සෑදීමෙන් cache එක කොටස්වලට බෙදී යනු ඇත. අසාර්ථක describes කිසිවිටෙක cache
කරන්නේ නැත. Settings:

| Key                             | Default | Range   |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Remote image normalization (self-loop describe/base64 fetch)

Bridge එක **remote** image එකක් තමන් විසින්ම fetch කරන විට — Anthropic describe
self-call එක සහ claude-wire-format base64 conversion එක
(`ensureBase64ImagesForClaudeWire`) යන දෙකම
`visionBridgeHelpers.ts` හි `fetchRemoteImageAsDataUri()` හරහා — ලැබෙන data URI එක
vision-model request එකට embed කිරීමට පෙර `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) හරහා යවනු ලැබේ. විශාල images
**2048px දිගු edge** දක්වා downscale කරනු ලැබේ (OpenAI/Anthropic දැනටමත්
server-side යොදන resize cap එකට සමානයි). එමඟින් vision model එක දකින දේ
වෙනස් නොකර upload bytes/latency අඩු කරයි. Resizing සඳහා dynamic import හරහා
`sharp` load කරයි: එහි native binary එක load වීමට අසමත් වන platform එකකදී,
`normalizeDataUri()` **කිසිවිටෙක throw නොකරයි** — එය මුල් bytes passthrough
කරයි. එබැවින් describe/base64-conversion path එක සැමවිටම ක්රියා කරයි.
Non-image bytes (decodable image එකක් ආපසු නොදුන් fetch එකක්) ද වෙනස් නොකර
passthrough කරයි. මෙම normalization යෙදෙන්නේ bridge එක තමන්ගේ self-call එක
සඳහා fetch කරන images සඳහා පමණි — opt-in-only mutation principle (Hard Rule #20)
සමඟ අනුකූලව caller ගේ raw passthrough payload එකට එය කිසිවිටෙක යොදන්නේ නැත.

#### Settings schema + migration

නව `modalityBridge*` යතුරු `updateSettingsSchema` තුළ Zod මගින් වලංගු කෙරේ
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, `modalityBridgeCache*` ත්රිත්වය සහ
Audio Bridge විසින් භාවිත කරන `modalityBridgeAudio*` සමූහය. Migration
`141_modality_bridge_settings.sql` දැනට පවතින පැරණි
`visionBridge*` අගයන් ගැළපෙන නව යතුරු වෙත පිටපත් කරයි (idempotent වන අතර,
ක්රියාකරු විසින් සකසා ඇති `modalityBridge*` අගයක් කිසිවිටෙක උඩින් ලියන්නේ
නැත); පැරණි යතුරු එක් release cycle එකක් සඳහා කියවීමේ fallback එකක් ලෙස
තවදුරටත් පිළිගැනේ.

#### පාරදෘශ්යතා ශීර්ෂකය + සංඛ්යාලේඛන

Describe-transformed ප්රතිචාරවල
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
අඩංගු වේ (`modalityBridge/bridgeStats.ts` හි `buildModalityBridgeHeader()`
මගින් සාදන ලද අතර, `src/sse/handlers/chatHelpers.ts` හි
`withModalityBridgeHeader()` මගින් එක් කරයි). නැවත මාර්ගගත කළ ඉල්ලීම්වලට
**ශීර්ෂකයක් නොමැත** — payload එක වෙනස් කර නොමැති අතර, model මාරුව
ප්රතිචාර body හි `model` ක්ෂේත්රයෙන් දැනටමත් පෙනේ.

`GET /api/modality-bridge/stats` (management auth, `GET /api/settings` හා
එකම tier) මඟින් `vision`, `audio` සහ `video` සඳහා මතකයේ පවතින එක් එක්
modality counters
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` ලබා දෙයි.
`averageLatencyMs` හි denominator ලෙස සියලු attempts නොව
`latencySamples` භාවිත වේ; timing නොමැති operation එකක් ශුන්ය
මිලි-තත්පර sample එකක් කෘත්රිමව සාදන්නේ නැත. සාර්ථක conversions සඳහා
පසුගාමී-අනුකූල alias එක ලෙස `bridged` තවදුරටත් පවතී; අසාර්ථක attempts
එය වැඩි නොකරයි. Process එක restart වූ විට counters reset වේ
(නිර්මාණාත්මකව telemetry මිස accounting නොවේ).

#### Dashboard වින්යාසය

විශේෂිත dashboard පිටුව
`/dashboard/settings/modality-bridge` වේ. URL-addressable වන `Vision`,
`Audio` සහ `Video` tabs, `tab` අගය මාරු කරන විට query parameters
සුරකිති. Vision tab මඟින් enablement, mode, model තේරීම
(automatic default එකද ඇතුළුව), task-aware prompting, උසස්
timeout/image/description-length/cache limits, runtime
counters සහ ආරක්ෂිත sample request එකක් ඉදිරිපත් කරයි. Audio tab ද
ක්රියාත්මක වන අතර: enablement, Auto සමඟ STT-only model picker එකක්,
timeout/max-clip limits, audio counters සහ `input_audio` sample test එකක්
ඉදිරිපත් කරයි. Video tab ක්රියාකාරී වේ: එය FFmpeg/ffprobe runtime
තත්ත්වය වාර්තා කරයි — පැහැදිලි UI states හතරෙන් එකක්
(`unknown`, probe එක සිදුවෙමින් පවතින විට හෝ සම්පූර්ණ කළ නොහැකි වූ විට,
probe එක client-side ලෙස මඟහරින non-loopback dashboard host එකක
`restricted`, probe කර නොමැති බව තහවුරු කළ පසු `unavailable`, හෝ
FFmpeg/ffprobe versions සමඟ `available`) — enable/model/frame/video/timeout
limits සුරකියි, model picker එක vision-capable models වෙත සීමා කරයි,
සහ video counters ඉදිරිපත් කරයි.

AI settings යටතේ තිබූ පැරණි Vision Bridge card එක නව පිටුවට
compatibility link එකකි; එය තවදුරටත් form එකේ දෙවන පිටපතක් පාලනය නොකරයි.
Media Providers දැනට පවතින Speech-to-Text playground එක ඉවත් නොකර,
Image-to-Text සහ Speech-to-Text workflows අදාළ Modality Bridge tabs වෙත
සම්බන්ධ කරයි.

**Self-loop admission bypass:** describe call එක OmniRoute හිම
`/v1` self-loop එක හරහා routes වන විට (non-standard provider model),
sub-request එක `x-omniroute-admission-bypass: internal` යවයි සහ
resolved self-loop credential මගින් authenticate කරයි — local mode හි
local `sk_omniroute` sentinel එක හෝ operator-configured
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env key (#1350) භාවිත කරයි. එබැවින්
`REQUIRE_API_KEY=true` deployments හටද describe call එක ක්රියාත්මක කළ හැක.
එම bypass එක පිළිගනු ලබන්නේ ඒ නිශ්චිත credentials සඳහා පමණක් බැවින්,
external clients හට admission මඟහැරීමට මෙම header එක භාවිත කළ නොහැක.

Legacy defaults `src/shared/constants/visionBridgeDefaults.ts` හි
පවතින අතර, නව mode/task-aware/cache defaults සහ settings resolver
`src/shared/constants/modalityBridgeDefaults.ts` හි පවතී. Guardrail මඟින්
`deps` constructor option එකක් ඉදිරිපත් කරන බැවින්, tests සඳහා ව්යාජ
`getSettings` සහ `callVisionModel` implementations inject කළ හැක.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Audio අඩංගු chat requests, audio input පිළිගන්නා බවට දැන නොමැති target එකක්
වෙත ළඟා වීමට පෙර intercept කරයි. එය chat request එක කිසිවිටෙක reroute
නොකරයි: audio parts පවතින OpenAI-compatible multipart endpoint එක හරහා
transcribe කර, තෝරාගත් chat model එක text transcripts සමඟ දිගටම
ක්රියා කරයි.

ප්රවාහය:

1. `supportsAudio` සඳහා `getResolvedModelCapabilities()` හරහා අගය නිර්ණය කරන්න. පැහැදිලි provider-registry metadata පළමුව බලපාන අතර, ඉන්පසු static model metadata සහ අවසානයේ synchronized `modalities_input` බලපායි. ප්රකාශිත input ලැයිස්තුවක `audio` නොමැති නම් අගය `false` වේ; හැකියාව පිළිබඳ කිසිදු සාක්ෂියක් නොමැති නම් `null` වේ. `false` සහ `null` දෙකම conservative bridge එක සක්රීය කරන අතර, `true` එය මඟහරියි.
2. `modalityBridgeAudio*` සැකසුම් සඳහා අගයන් නිර්ණය කර, shared `detectMediaParts()` detector හරහා සෑම පණිවිඩයකින්ම splice කළ හැකි ඉහළම මට්ටමේ audio කොටස් උපුටා ගන්න. සහාය දක්වන wire shapes වන්නේ OpenAI `input_audio`, `audio_url`, සහ `source.media_type: "audio/*"` ය. routing සඳහා nested audio හඳුනාගත්තද, splice path මඟින් එය ඉවත් නොකෙරේ. කාර්යය `modalityBridgeAudioMaxClips` මඟින් සීමා කෙරේ; පසුව ඇති කොටස් නොවෙනස්ව තබයි.
3. වින්යාස කළ `provider/model` එකකට ප්රමුඛත්වය දෙන්න, නැතහොත් `selectAudioBridgeModel()` හට `AUDIO_TRANSCRIPTION_PROVIDERS` ස්ථාවර catalog අනුපිළිවෙළින් පරීක්ෂා කර, භාවිත කළ හැකි සක්රීය provider credential එකක් සහිත පළමු model එක තෝරා ගැනීමට ඉඩ දෙන්න.
4. `callAudioTranscription()` මඟින් base64/data-URI audio එක multipart `file` එකක් බවට පරිවර්තනය කරයි, නැතහොත් DNS pinning සහ 25 MB සීමාවක් සහිත public-only outbound guard හරහා දුරස්ථ `audio_url` එක බාගත කරයි. ඉන්පසු එය file එක සහ තෝරාගත් model එක local `/v1/audio/transcriptions` self-loop වෙත POST කරයි; authentication සඳහා `resolveSelfLoopBearer()` භාවිතා කරයි. පවතින transcription route එක සාමාන්ය credential lookup, cooldown/rate-limit handling සහ provider dispatch සිදු කරයි.
5. සාර්ථක calls මඟින් ඒවායේ කොටස් `[Audio N]: <transcript>` ලෙස ප්රතිස්ථාපනය කරයි. Calls `Promise.allSettled` සමඟ ක්රියාත්මක වේ: තනි failure එකක් එම මුල් audio කොටසම තබා ගනී (#4012 contract). සියලු calls අසාර්ථක වී target එකට `supportsAudio === false` බව ඔප්පු වී ඇත්නම්, කොටස් `[Audio N]: (unavailable — no STT provider connected)` බවට පත් වේ (#8430 contract). නොදන්නා target එකක් (`null`) සඳහා සියලු calls අසාර්ථක වුවද ප්රතිඵලය නොවෙනස්ව පවතී. භාවිත කළ හැකි STT credential එකක් නොමැති බවට ඔප්පු වූ text-only target එකකට network call එකක් සිදු නොකර එම explicit stub එකම ලැබේ.

සාර්ථක transcripts process-wide Modality Bridge LRU/TTL cache එක භාවිතා කරයි. key එක audio reference එක, ස්ථාවර `audio-transcription` operation label එක සහ තෝරාගත් STT model එක ඒකාබද්ධ කරයි; failures කිසිවිටෙක cache නොකෙරේ. Audio attempts මඟින් shared `bridged`, `cacheHits`, `failures` සහ `lastUsedAt` counters යාවත්කාලීන කරයි. පරිවර්තනය කළ responses තුළ `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` අඩංගු වේ; නොවෙනස් requests සඳහා Audio Bridge segment එකක් එක් නොකෙරේ.

Runtime settings DB-backed වන අතර Zod මඟින් validate කරනු ලැබේ:

| Key                           | Default | Range          |
| ----------------------------- | ------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —              |
| `modalityBridgeAudioModel`    | `""`    | Auto හෝ STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10           |

Shared cache එක `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` සහ `modalityBridgeCacheMaxEntries` මඟින් පාලනය වේ.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Native video support එක පිළිබඳ දැනුමක් නොමැති target එකක් ඇමතීමට පෙර, Chat Completions `messages` සහ Responses API `input` තුළ ඇති ඉහළම මට්ටමේ video කොටස් intercept කරයි. සහාය දක්වන shapes වන්නේ `input_video`, `video_url`, `video_source`, HTTPS URLs සහ `data:video/*;base64,...` data URIs ය. සාමාන්ය text තුළ ඇති filenames video ලෙස සලකනු නොලැබේ.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) request traversal, capability/policy check, එක් request එකකට අදාළ aggregation සහ response payload හිමිකර ගනී. එක් video එකකට අදාළ acquisition, whole-result cache, frame sequence එක විස්තර කිරීම (caller විසින් ප්රකාශ කළ audio transcript එකක් තිබේ නම් එයද ඒකාබද්ධ කරමින්), සහ එක් attempt එකකට අදාළ metrics/abort/cleanup යන කාර්යයන් `videoBridgePipeline.ts` හි ඇති `processVideoPart` පිටුපස සඟවා ඇති අතර, `preCall` හි loop එක තුළ සෑම video කොටසකටම එක් වරක් එය කැඳවයි. එම module එක පැහැදිලි port සීමාද නිර්වචනය කරයි: `VideoMediaBrokerPort` (bytes ලබාගැනීම සහ sampled frames උපුටා ගැනීම), `VideoAudioTranscriptionPort` (caller විසින් ප්රකාශ කළ audio transcript එක sampled captions සමඟ ඒකාබද්ධ කිරීම) සහ `VideoDrilldownPort` (frame drill-down persistence boundary එක; එය තවමත් `processVideoPart` වෙත සම්බන්ධ කර නොමැති අතර, අද drill-down entries ලියන්නේ වෙනම `/api/modality-bridge/video/drilldown` route එක පමණි).

Public `/v1` request path එක කිසිවිටෙක subprocess එකක් import හෝ invoke නොකරයි. Remote videos 50 MiB සීමාවක් යටතේ බාගත කෙරේ; inline base64 videos සඳහා decoded එක් video එකකට conservative 36 MiB සීමාවක් යොදා ගනී, එවිට model/messages/framing envelope එක 50 MiB public JSON request admission limit එක තුළ පවතී. Inline length සහ decoded-size estimates allocation කිරීමට පෙර පරීක්ෂා කෙරේ. ආරම්භක remote URL එකටත් සෑම redirect එකකටමත් HTTPS අවශ්ය වන අතර, DNS pinning සහිත පවතින public-only outbound guard එක භාවිතා කරයි. ඉන්පසු bytes නිශ්චිත අභ්යන්තර `POST /api/modality-bridge/video/extract` broker boundary එක හරහා යවනු ලැබේ. එම route එක `LOCAL_ONLY` සහ `SPAWN_CAPABLE` දෙකම වන අතර, එක් process එකකට සීමා වූ authenticated, trusted-loopback request එකක් පමණක් පිළිගනී; URL එකක්, filesystem path එකක්, executable එකක් හෝ argument list එකක් කිසිවිටෙක පිළිගන්නේ නැත. API body-size pipeline එක සහ handler හි incremental body reader එක ස්වාධීනව 50 MiB broker input cap එක ක්රියාත්මක කරයි. එහි bounded queue එක වරකට එක් extraction එකක් සිදු කරයි, pending jobs හතරකට ඉඩ දෙයි, සහ pending input 100 MiB දක්වා සීමා කරයි.

බ්රෝකර් එක තුළ, `ffprobe` පුද්ගලික දේශීය ගොනුවක් කියවයි; ස්ථාවර ආකෘති අවසර ලැයිස්තුවෙන් playlist සහ manifest ආකෘති බැහැර කරයි. අවසරලත් MOV-පවුලේ container සඳහා, බාහිර MOV දත්ත යොමු පෙරනිමියෙන් අක්රීයව පවතින අතර, ස්ථාවර විධානය ඒවාට අවසර නොදෙයි. `ffprobe` සහ `ffmpeg` දෙකම `file`-පමණක් protocol whitelist එක, එක් thread එකක්, ස්ථාවර argument array, shell නොමැති ක්රියාත්මක කිරීම, සහ `PATH` වෙතින් විසඳන executables භාවිත කරයි. Attached-picture cover streams වාදනය කළ හැකි candidates නොවේ. වාදනය කළ හැකි සියලු streams සීමාවන් සපුරාලිය යුතු අතර, deterministic අඩුම-index fallback එකට පෙර පැහැදිලි default stream එකට ප්රමුඛත්වය දෙනු ලැබේ. වීඩියෝ තත්පර 600කට, එක් මානයකට pixels 8,192කට, සහ මූලාශ්ර pixels 33,554,432කට සීමා වේ. FFmpeg මධ්ය ලක්ෂ්ය JPEG frames 1–16ක් sample කරයි, කුඩා input විශාල නොකර දිගු දාරය උපරිම pixels 1,024කට අඩු කරයි, සහ කිසිවිටෙක URL එකක් ලබා නොගනී. Sampling පෙරනිමියෙන් `uniform` වේ. විකල්ප `scene_aware` සහ පරීක්ෂණාත්මක `segment_aware` policies මඟින් දැනටමත් වලංගු කර ඇති දේශීය stream එක මත අමතර ස්ථාවර FFmpeg pass එකක් සිදු කර, සීමා කළ `showinfo` scene timestamps තෝරා ගනී; detector අසමත් වීම, timeout, විකෘති output, හෝ හිස් candidate set එකකදී deterministic ලෙස එම `uniform` මධ්ය ලක්ෂ්ය වෙත fallback වේ. Segment-aware mode මඟින් වලංගු කළ scene intervals අනුව midpoint samples සමානුපාතිකව වෙන් කරයි; segment-aware evidence සහ fallback හැසිරීම පහත විස්තර කර ඇත. දෘඩ 16-frame සීමාව සෑම policy එකකදීම selection කිරීමෙන් පසුව යොදනු ලැබේ. Scene-aware request එකකට එක්-frame budget එකක් පමණක් ඇති විට, එය සක්රීය සම්පූර්ණ වීඩියෝ හෝ focus window එකේ uniform midpoint භාවිත කර `policyEffective: uniform` වාර්තා කරයි: තනිව තෝරාගත් scene frame එකකට කාලානුක්රමික අන්ත දෙකම ආරක්ෂා කළ නොහැක. Caller කෙනෙකුට විකල්ප වශයෙන් සීමිත focus window එකක් (`start`/`end` seconds) සැපයිය හැක; bounds media duration එකට clamp කරනු ලැබේ, ප්රතිලෝම හෝ non-finite windows ප්රතික්ෂේප කරනු ලැබේ, සහ සියලු sampling policies සාමාන්යකරණය කළ interval එක තුළ පමණක් ක්රියාත්මක වේ. ලැබෙන window එක sampling metadata තුළත්, untrusted description prefix තුළත් ඇතුළත් වන බැවින්, downstream models හට focused excerpt එකක් සහ සම්පූර්ණ timeline එකක් අතර වෙනස හඳුනාගත හැක.

Semantic caption focus යනු වෙනම, පැහැදිලි setting එකකි. පෙරනිමි `full` analysis mode මඟින් පවතින frame prompt එක ආරක්ෂා කරන අතර request text එක caption model වෙත කිසිවිටෙක යොමු නොකරයි. `focused` mode තුළ, bridge එක එම Chat හෝ Responses container එකෙන් නවතම හිස් නොවන user-authored `text`/`input_text` පමණක් කියවා, එය NFC වෙත normalize කර, control characters සහ whitespace එකට සංකෝචනය කර, Unicode code points 500කට සීමා කරයි. හිස් ප්රතිඵලයක් ලැබුණහොත්, හරියටම `full` prompt වෙත fallback වේ. භාවිත කළ හැකි hint එකක් dedicated untrusted-user-context block එකක JSON ලෙස serialize කරනු ලබන අතර, එයට observable details සඳහා පමණක් ප්රමුඛත්වය දිය හැක; media තුළ දෘශ්ය හෝ ශ්රව්ය ලෙස පෙනෙන උපදෙස් අනුගමනය නොකළ යුතුය යන වෙනම අනතුරු ඇඟවීම එයට override කළ නොහැක. Textual focus මඟින් `start`/`end` අනුමාන නොකරන අතර temporal sampler එක වෙනස් නොකරයි.

#### FU-07 ව්යුහාත්මක segment සාක්ෂි

`segment_aware` මඟින් දැනටමත් වලංගු කර ඇති දේශීය video stream එක මත සීමා කළ pre-analysis pass එකක් භාවිත කරයි. ස්ථාවර filter chain එක පළමුව උපරිම පළල pixels 320කට scale කර, scene changes සහ frozen intervals හඳුනාගෙන, පසුව blur, average luma, සහ spatial/temporal information සඳහා තත්පරයකට frame 1ක් ලෙස sample කරයි. මෙම pass එක structural samples 600කට, එක් FFmpeg/filter thread එකකට, එම `file`-පමණක් protocol සහ container allowlists සඳහා, process-output සීමාව 1 MiBකට, සහ broker හි shared abort/deadline ඇතුළත උපරිම තත්පර 30කට සීමා වේ. එය request එකෙන් command, filter, path, හෝ URL කිසිවක් පිළිගන්නේ නැත.

ව්යුහාත්මක අගයන් deterministic sampling evidence වන අතර semantic video understanding නොවේ. ඒවා subjects, actions, captions, speech, හෝ user intent අනුමාන නොකරයි. Scene සහ freeze boundaries segments සාදයි; freeze coverage, blur, exposure, spatial detail, සහ temporal change බලපාන්නේ පවතින 1–16 frame budget එක වෙන් කරන ආකාරයට පමණි. සම්පූර්ණයෙන් frozen segment එකක් එක් frame එකකට සීමා කරන අතර, non-frozen segments ඉතිරි budget සඳහා තරග කරයි. Boundaries ගණන frames ගණන ඉක්මවන විට, වේගවත් මුල් cuts මඟින් දිගු අවසාන segment එකක් සැඟවිය නොහැකි වන පරිදි uniform timeline coverage ආරක්ෂා කරයි. Freeze boundary එකක 1-second analysis resolution ඇතුළත ඇති scene boundaries එකට ඒකාබද්ධ කරනු ලැබේ.

Filters නොමැති වීම, විකෘති/හිස් evidence, detector දෝෂයක්, හෝ සීමා කළ pre-analysis timeout එකක් නිශ්චිත uniform midpoint policy වෙත fail open වේ. Caller abort එකක් හෝ broker deadline එකක් fail open නොවේ: එය ක්රියාත්මක වෙමින් පවතින subprocess එක අවසන් කර, පසුව frame extraction වැළැක්වීමෙන්, private temporary tree එක `finally` තුළ ඉවත් කරයි.

`scripts/perf/video-bridge-fu07-eval.ts` මඟින් post-dedup caption-call savings, dense-motion budget allocation, blur/exposure/SI-TI evidence, දිගු tail එකක් සහිත rapid cuts, සහ gradual-fade false positives සඳහා deterministic real FFmpeg fixtures ජනනය කරයි. එය pre-analysis wall time වාර්තා කරන අතර, `/usr/bin/time` ලබා ගත හැකි විට child CPU සහ peak RSS ද වාර්තා කරයි. එහි quality checks structural oracles පමණි. මෙම harness එකට authorized endpoint එකක් හෝ frozen judge එකක් නොමැති බැවින්, සැබෑ caption-model quality තවමත් `HOLD` වේ. `--caption-cost-per-call-usd` මඟින් පැහැදිලි ධනාත්මක එක්-call estimate එකක් සපයන්නේ නැතිනම්, monetary savings ද `HOLD` ලෙස පවතී; script එක කිසිදු ප්රතිඵලයක් කෘත්රිමව නිපදවන්නේ නැත.

සෑම රාමුවක්ම 4 MiBකට සීමා වන අතර, සියලුම raw රාමු එකතුව 23 MiBකටත්,
serialized broker ප්රතිචාරය 32 MiBකටත් සීමා වේ. පුද්ගලික තාවකාලික
නාමාවලියක් `finally` තුළ ඉවත් කරනු ලැබේ. OmniRoute FFmpeg ඇතුළත් කර
නොදෙන අතර අභිරුචි executable මාර්ගයක්ද පිළිගන්නේ නැත. captioning කිරීමට
පෙර, bridge එක සංරක්ෂණාත්මක දෘශ්ය deduplication පියවරක් යොදයි: සෑම JPEG
එකක්ම 16×16 grayscale buffer එකකට අඩු කර, රඳවාගෙන ඇති අවසන් රාමුව සමඟ
පමණක් සසඳනු ලැබේ. ඉල්ලා ඇති caption budget එක රාමුවකට වඩා වැඩි නම්,
extraction මඟින් එම budget එක මෙන් දෙගුණයක් දක්වා වූ, එහෙත් රාමු 16කට
වඩා නොවැඩි, සීමා කළ candidate pool එකක් සපයයි. ඉල්ලා ඇති cap එක
deduplication කිරීමෙන් පසුව පමණක් යොදන අතර, budget එක අවම වශයෙන් දෙකක්
වන විට අවසන් thinning කිරීමේදී පළමු සහ අවසන් තෝරාගත් candidates
රඳවා ගනී. අනුවාදගත
`grayscale-16x16-mean-cells-v2` ප්රතිපත්තිය mean luma delta එක සහ
normalized delta එක අවම වශයෙන් 0.05ක් වන thumbnail cells අනුපාතය යන
දෙකෙන් විශාල අගය භාවිත කරයි. duplicate threshold එක 0.04 යන
ස්ථිර අගය වන අතර, එය runtime setting එකක් ලෙස නිරාවරණය කිරීම වෙනුවට
පුරෝකථනය කළ හැකි බව සඳහා තෝරාගෙන ඇත. මෙම ද්විතීයික
high-contrast signal එක mean-only comparison එකකට සැඟවිය හැකි කුඩා
චලනය සහ පෙනෙන-පෙළ වෙනස්කම් රඳවා ගනී. Comparator හෝ decoder දෝෂ
fail open වී coverage එක රඳවා ගනී. Output metadata මඟින් extracted
candidates, සාර්ථකව භාවිත කළ frames, සහ ඉවත් කළ visual duplicates
වෙන් වෙන්ව දක්වයි.

පැහැදිලිව සලකුණු කළ video part එකකට timestamp සහිත contact sheet එකක්
ඉල්ලා සිටිය හැක. bridge එක උපරිම වශයෙන් columns 4ක් සහ frames 16ක්
සහිත JPEG grid එකක් සාදයි. සෑම 512-pixel cell එකක්ම එහි source
timestamp එක high-contrast පහළ band එකකට burn කරන අතර, downstream
association සහ audit සඳහා එම timestamps textual metadata තුළද
රඳවා ගනී. සම්පූර්ණ JPEG එක 32 MiB සීමාව තුළ පවතී. `sharp` හට grid එක
decode කිරීමට හෝ compose කිරීමට නොහැකි නම්, bridge එක individual JPEG
frames වෙත fallback වේ; client abort එක තවදුරටත් sheet operation
හරහා propagate වේ.

Promotion evidence එක synthetic composition microbenchmark එකෙන්
හිතාමතාම වෙන් කර ඇත. `scripts/perf/video-bridge-contact-sheet-eval.ts`
මඟින් සැබෑ OpenAI-compatible vision models සඳහා schema-versioned A/B
harness එකක් නිර්වචනය කරයි. එය provider-reported tokens,
end-to-end wall latency (sheet composition ද ඇතුළුව), model-call count,
සහ manifest-defined fact retention මනිනු ලබයි. Raw model responses
report එකට ලියා නොදමන අතර, රඳවා ගන්නේ SHA-256 digests සහ matched fact
IDs පමණි. `--execute-real` යොදවා, `--model`, `OMNIROUTE_BASE_URL`, සහ
`OMNIROUTE_API_KEY` වින්යාස කර ඇති විට පමණක් harness එක network හෝ
ගෙවීම් සහිත model call එකක් සිදු කරයි. එම පැහැදිලි real run එක නොමැති
විට, එහි machine-readable verdict එක `HOLD` ලෙස පවතී; synthetic
payload/call-count measurements පමණක් promotion evidence නොවේ.

සමපාත වූ පෙළ දැනටමත් සතු නම්, callers හට supported video part එකකට
විකල්ප `transcript.cues` array එකක් එක් කළ හැක. සෑම cue එකක්ම `text`,
probed duration තුළ පවතින finite `start`/`end` interval එකක්, සහ
whitelisted `source` (`client`, `embedded`, හෝ `audio-bridge`) රැගෙන
යා යුතුය; `confidence` හි පෙරනිමි අගය `1` වන අතර එය `0` සහ `1` අතර
පවතින්නට යුතුය. සම්පූර්ණයෙන්ම සමාන cues එකට ඒකාබද්ධ කරනු ලැබේ.
OmniRoute කිසි විටෙකත් මෙම metadata මඟින් transcription ආරම්භ
නොකරයි: validate කළ cues, source, confidence, සහ interval සමඟ
විස්තර කළ result එකට පිටපත් කර, frame captions අසල untrusted
observations ලෙස render කරයි. අවලංගු, සීමාවෙන් පිටත, හෝ provenance
නොමැති පෙළ caption stream එකට මිශ්ර කිරීම වෙනුවට ප්රතික්ෂේප කරයි.
Request-body transcript channels දෙකම සපයන provenance `client` ලෙස
normalize කරයි; self-asserted `embedded` හෝ `audio-bridge` labels ද
ඊට ඇතුළත් වේ. එම trusted labels පවරිය හැක්කේ code-only
`trustedSource` argument එක හරහා server-owned adapter එකකට පමණි;
request JSON field එකකට එම argument වෙත ළඟා විය නොහැක. Transcript
text එකේ provenance කුමක් වුවත් එය untrusted media-derived content
ලෙසම පවතින අතර, authorization තීරණය කිරීමට කිසි විටෙකත් භාවිත නොකළ
යුතුය.

උසස් caller කෙනෙකුට එම video එක සඳහා `audioTranscript` track එකක්
සැපයිය හැක; එය server transcription සඳහා සාක්ෂියක් නොව client-provided
text ලෙස සලකනු ලැබේ. Fusion seam එක එකම deadline සහ abort signal
යටතේ visual සහ audio observations ක්රියාත්මක කර, ඒවා common timeline
එකක් මත අනුපිළිවෙලට සකසා, සම්පූර්ණයෙන් සමාන duplicates එකට ඒකාබද්ධ
කර, එක් පැත්තක් පමණක් සාර්ථක වූ විට partial result එකක් වාර්තා කරයි.
අවලංගු `audioTranscript` එකක් එම partial result වෙත degrade වේ —
visual description එක රඳවාගෙන audio branch එක sanitized failure code
එකක් වාර්තා කරයි — සම්පූර්ණ video එක අසාර්ථක කරනවා වෙනුවට. Per-branch
availability, partial flag එක, සහ sanitized failure codes විස්තර කළ
result එකේ, guardrail metadata
(`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`) තුළ,
result-cache metadata තුළ, සහ bridge fusion counters තුළ රඳවා ගනී.
පෙරනිමි Video Bridge path එක speech-to-text invoke කිරීමක් හෝ දෙවන
media copy එකක් download කිරීමක් සිදු නොකරයි; එම පැහැදිලි track එක
නොමැති විට එය video-only ලෙස පවතී.

**Transcript retention (#12150 P1).** මෙය ස්වයංක්රීයව ක්රියාත්මක වන්නේ
Video Bridge (එයද opt-in වේ) transcript cue එකක් render කරන සෑම අවස්ථාවකමය —
වෙනම retention flag එකක් නොමැත. Request එකක් transcript cue එකක් (caller විසින්
ප්රකාශ කළ `transcript` එකක් හෝ ඒකාබද්ධ කළ `audioTranscript` එකක්) render කරන
විට, guardrail එක එය `videoBridgeObserved` ලෙස සලකුණු කර වීඩියෝ විස්තරයේ
redacted shadow එකක් නිපදවයි — සෑම cue එකකම free-text body එක
`[redacted-video-transcript]` මගින් ප්රතිස්ථාපනය කළ සමාන rendering එකක් ලෙස,
string එක assemble කිරීමට පෙර structured cue field එක substitute කිරීමෙන්
සාදනු ලබන අතර (flattened text එක parse කිරීමෙන් කිසිවිටෙක නොවේ; එබැවින්
adversarial හෝ සාමාන්ය ඕනෑම cue content එකක් — `]` අඩංගු bodies වන
`[inaudible]`/`[music]` ඇතුළුව — ඉතිරි විය නොහැක). Persist කරන call-log request
body එක content equality මගින් ගැළපෙන සෑම video-derived text part එකක්ම එම
redacted shadow එකෙන් ප්රතිස්ථාපනය කරයි; `fullText` anchor එක call-යට පෙර
නිම කළ guardrail payload එකෙන් නැවත කියවනු ලබන බැවින්, පසුව chain guardrails
(PII සහ credential maskers, priorities 10/95) description text එක එම ස්ථානයේම
නැවත ලිවීමෙන් පසුවත්, system-prompt/handoff/memory injection මගින් message
array එකේ හැඩය වෙනස් කළ පසුවත්, match එක සාර්ථක වේ. Model එක වෙත upstream
යවන body එක වෙනස් නොවේ. Observed request එකක් durable Memory එකක්ද පුරවන්නේ
නැත (request- සහ response-derived extraction දෙකම මඟ හරිනු ලැබේ), එබැවින්
model එකේම reply එකට transcript text එක Memory වෙත echo කළ නොහැක.

**Raw video fields (#12430).** Bridge එක සක්රීය කර ඇති විටත් native video
support එක නොදන්නා හෝ නොමැති විටත්, නිර්වචනය කර ඇති `transcript`/
`audioTranscript` fields `videoBridgeObserved` සක්රීය කරයි — description
අසාර්ථක වීමෙන් හෝ `maxVideos` සීමාවකින් පසුව වුවද. `null` සහ හිස් strings
ගණනය වේ; නොමැති fields සහ video නොවන metadata ගණනය නොවේ. රඳවාගත් copies
මෙම fields redact කරයි හෝ request එක ඉවත් කරයි, caches/Memory මඟ හරිනු ලැබේ.

මෙම fallback paths මත, වලංගු caller cues nonstandard provider fields වෙනුවට
සහාය දක්වන `text`/`input_text` parts බවට පත්වේ. Request මගින් සපයන tracks
දෙකම විශ්වාස නොකළ යුතු `client` observations ලෙස පවතින අතර, video එක
describe කර නොමැති බවත් timestamps media එකට එරෙහිව verify කර නොමැති බවත්
පැහැදිලි warning එකක් සමඟය. පවතින 256-cue/64-KiB total සහ per-cue budgets
tracks දෙක පුරා එකට අදාළ වේ; timestamps broker හි 600-second ceiling එකටත්
සපයා ඇති focus window එකටත් ගැළපිය යුතුය. වලංගු නොවන tracks ඉවත දමනු ලැබේ,
අත්තනෝමතික text ලෙස forward නොකරයි; ඒවායේ ඒකාබද්ධ budget එක ඉක්මවා නොයන්නේ
නම් වලංගු sibling එකක් තවමත් භාවිත කළ හැක. Null/empty fields කිසිදු text
එකතු නොකරයි. මෙම fallback එකෙන් media fetch හෝ transcription එකක් එකතු
නොවේ. Transcript extension fields fallback video carrier එකෙන් සහ එහි
`video_url`/`source` objects වලින් ඉවත් කරනු ලැබේ. OpenAI wire allowlist එක
දැඩිව පවතී; unknown-native video carriers තවමත් ලබාගත හැකි අතර known
text-only targets ආරක්ෂිත markers තබා ගනී. Structured redaction shadows
එකතු කළ transcript text ආරක්ෂා කරන අතර, මුල් caller-owned request එක වෙනස්
නොවේ. Native-supported targets සහ disabled bridges ඔවුන්ගේ පවතින bypass
behavior එක තබා ගනී.

අමතර retained copies එකම observed-request signal එක භාවිත කරයි. Raw
pre-guardrail client-request snapshot එක, in-memory pending request එක සහ
early rejected-request log එක video parts තුළ ඇති transcript fields
structurally replace කරයි; pipeline stages සහ context handoff මගින්
සංස්ලේෂණය කරන string prompts persisted-request-body sink එකේදී redact කරනු
ලැබේ. Persist කරන `video_content_removed` marker එක
`previous_response_id` continuation එක fail closed කරවයි; එමගින් හිතාමතා
ඉවත දැමූ text එක නැවත reconstruct කිරීම වළක්වයි. Observed request එකක
per-part redaction shadow එක logging කිරීමට පෙර නැති වුවහොත්, හෝ පසුව සිදු වූ
request mutations පසු video shadows කිහිපයකින් එකක් හෝ match වීමට අසමත්
වුවහොත්, අර්ධ වශයෙන් redacted transcript එකක් රඳවා තබනවා වෙනුවට retained
request body එක සම්පූර්ණයෙන්ම ඉවත් කරනු ලැබේ.

Observed request එකක් සඳහා, model response එකක් structured cue boundary එකකින්
තොරව transcript එකේ ඕනෑම කොටසක් quote කළ හැක. එබැවින් එහි persisted
call-log `responseBody` එක omission marker එකකින් ප්රතිස්ථාපනය කරනු ලැබේ;
detailed pipeline artifact එක (upstream/client bodies සහ stream chunks ඇතුළත්
විය හැකි) රඳවා නොගනී. Semantic, idempotency සහ reasoning-replay caches එම
request එක සඳහා reads සහ writes දෙකම bypass කරයි. Provider request එක සහ
client-visible response එක වෙනස් නොවේ. Detailed artifact එක ඉවත් කරන විට
early keepalive bytes temporary buffer එකෙන් drain කරනු ලැබේ. Kiro හි
malformed EventStream warning එක වාර්තා කරන්නේ payload byte count එක පමණක්
වන අතර, එහි contents හෝ JSON parser හි raw error එක කිසිවිටෙක වාර්තා නොකරයි.
සම්බන්ධයක් නොමැති සෑම provider/plugin diagnostic එකක්ම audit කර ඇති බව මෙයින්
ප්රකාශ නොවේ; පුළුල් retained-sink sweep එක #11658 යටතේ track කරනු ලැබේ.

අභ්යන්තර `/api/modality-bridge/video/drilldown` lifecycle එක වෙනම,
loopback/token-authenticated cache substrate එකකි. සෑම operation එකකටම
canonical opaque principal ID එකක්ද අවශ්ය වේ. Production caller එකක්
සක්රීය කිරීමට පෙර, එය authenticated tenant එකෙන් එම ID එක derive කළ යුතු
අතර client-selected value එකක් කිසිවිටෙක forward නොකළ යුතුය. Cache keys එම
principal එක canonical session සහ video-reference IDs වෙත bind කර, ඒවායේ
SHA-256-derived keys පමණක් ගබඩා කරයි; reads සහ deletion දෙකම එම principal
එකේ scope එකට සීමා කරයි. Cache එක entry එකකට derived JPEG frames උපරිම 16ක්
ගබඩා කර, මිනිත්තු දහයකට පසු ඒවා expire කරයි, සහ සීමා කළ `start`/`end`
reads හෝ explicit session deletion සඳහා සහාය දක්වයි.

සෑම principal එකකටම entries 16ක් සහ canonical JPEG data 64 MiBක් දක්වා
පමණක් සීමා වේ. එම සීමා global 64-entry/256 MiB ceiling එකෙන් ස්වාධීන වේ:
principal quota pressure ඇති විට global LRU eviction සලකා බැලීමට පෙර එම
principal එකේ least-recently-used entries පමණක් evict කරයි. Cache activity
අතරතුර expired entries principal සහ global accounting දෙකෙන්ම sweep කරනු
ලැබේ; cancellation සහ validation failure මඟින් partial replacement එකක්
commit නොකරයි.

කැෂය non-canonical Base64, අතිරික්ත padding, JPEG නොවන මාධ්ය, විකෘති හෝ අසම්පූර්ණ JPEG, සහ සීමා කළ පූර්ණ-රූප `sharp` decode කිරීමකදී අනතුරු ඇඟවීමක් ජනනය කරන JPEG ප්රතික්ෂේප කරයි. පිළිගත් සෑම රූපයක්ම canonical JPEG ලෙස නැවත encode කරයි, caller fields විශ්වාස කිරීම වෙනුවට decoded bytes වලින් පළල සහ උස ලබා ගනී, සහ රඳවා තබා ගැනීම වෙනුවට පසුපස ඇති polyglot bytes සියල්ල ඉවත් කරයි. Quotas දෙකටම ගණනය කරන්නේ සීමා කළ canonical compressed buffer එක පමණි. 32 MiB decoded-input ceiling සඳහා JSON wire limit එකට Base64 overhead ද ඇතුළත් වේ. සෑම stored derivation එකක්ම එහි validate කළ JPEG format/resolution, sampling policy, derivation version, creation time, server විසින් ගණනය කළ content hash, සහ hashed parent reference එක සමඟ trusted callerගේ parent-content hash එකද සටහන් කරයි. Atomic cache commit කිරීමට පෙර asynchronous decode/hash අදියර අතර cancellation පරීක්ෂා කරයි.

මෙම tranche එක production producer එකක් route එකට සම්බන්ධ නොකරන අතර multi-resolution variant selection ද සපයන්නේ නැත. එබැවින් transparent Video Bridge request path එකට අමතර කාර්යයක් නොපැවරෙන අතර, tenant-bound principal derivation සහ සම්පූර්ණ FU-08 multi-resolution lifecycle යන දෙකම සම්පූර්ණ කළ හැසිරීමක් ලෙස ලේඛනගත නොකර, පැහැදිලි follow-up වැඩ ලෙස තවමත් පවතී.

Frames වින්යාස කළ Video model එක සමඟ අනුක්රමිකව caption කරනු ලැබේ. හිස් Video override එක Vision setting එක උරුම කර ගනී; දෙකම හිස් නම්, Vision auto-router එක effective vision-capable model එක තෝරයි. සාර්ථක captions මුල් part එක ස්ථාවර `[Video description:` prefix එකකින් ප්රතිස්ථාපනය කරයි. එම prefix එක text එක විශ්වාස නොකළ යුතු media-derived observation එකක් ලෙසද සලකුණු කරන අතර, media තුළ සොයාගත් instructions අනුගමනය නොකරන ලෙස downstream models වෙත දන්වයි. Frame-caption cache keys තුළ JPEG bytes, prompt, timestamp, සහ effective model ඇතුළත් වේ; cache කරන්නේ සාර්ථක captions පමණි. Cache entries සැබෑ සාර්ථක producer model එක රඳවා ගනී; fallback model එකක් වුවද එයට ඇතුළත් වේ. විවිධ frames විවිධ models මගින් නිෂ්පාදනය කර ඇත්නම් bridge එක `mixed` වාර්තා කරයි. Cache hit එකක් එම producer identity එක නැවත භාවිත කරන අතර එය ඉල්ලා සිටි routing plan එක ලෙස නැවත label නොකරයි. සම්පූර්ණ video result cache එක output එක වෙනස් කරන සෑම input එකක් මතම key කර ඇත — prompt, effective model, sampling policy, frame count, semantic analysis mode, normalized focus hint හි SHA-256 fingerprint එක, focus window, `transcript`, `audioTranscript`, සහ contact-sheet flag — එබැවින් එම dimensions වලින් කිසිවක් වෙනස් කිරීම cache miss එකක් වන අතර, කිසිවිටෙක stale reuse එකක් නොවේ. Visual dedup policy version, threshold, සහ bounded candidate-frame count ද result-cache key සහ metadata තුළ පැහැදිලිව ඇතුළත් වේ; එබැවින් policy වෙනසකට stale whole-video description එකක් නැවත භාවිත කළ නොහැක. Result-cache v4 metadata mode සහ fingerprint රඳවා ගන්නා නමුත් raw user task එක කිසිවිටෙක රඳවා නොගනී. Guardrail metadata මඟින් requested සහ effective analysis modes දෙකම වාර්තා කරයි; භාවිත කළ හැකි user text නොමැති requested `focused` mode එකක් effectively `full` ලෙස වාර්තා කරයි.

Guardrail එක සහාය දක්වන සෑම video part එකක්ම extract කරන නමුත් `modalityBridgeVideoMaxVideos` ගණනට වඩා විස්තර නොකරයි. `supportsVideo === false` බව සනාථ කළ target එකක් සඳහා, failed සහ over-limit videos explicit safe text markers බවට පත් කර raw video කිසිවක් ඉතිරි නොකරයි. Capability එක නොදන්නා විට, එම parts තම video carrier එක රඳවා ගනී; ඕනෑම fallback transcript එකක් ඉහත bounded text conversion එක අනුගමනය කරයි. `supportsVideo === true` සහිත targets bridge එක මඟ හරී. Client request abort signal එක download, broker queue, subprocesses, සහ caption calls හරහා propagate වේ; aborts videos අතර නවතින අතර raw media වෙත fail open වන්නේ කිසිවිටෙක නොවේ.

Runtime settings DB-backed වන අතර Zod-validated වේ:

| Key                                 | Default     | Range / behavior                                                                                         |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Optional runtime, opt-in                                                                                 |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` generic captions රඳවා ගනී; `focused` සීමා කළ, විශ්වාස නොකළ latest-user context භාවිත කරයි         |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge model එක උරුම කර ගනී                                                                       |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                     |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, හෝ proportional `segment_aware`; detector failure එක `uniform` වෙත fallback වේ |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                      |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                           |

තත්පර 120 ඉක්මවන legacy persisted Video timeout values broker deadline එකට clamp කරනු ලැබේ; එම සීමාව ඉක්මවන නව settings writes ප්රතික්ෂේප කරනු ලැබේ. `GET /api/modality-bridge/video/runtime` සඳහා authentication හෝ runtime probing කිරීමට පෙර trusted stamped loopback locality අවශ්ය වන අතර, ඉන්පසු management auth අවශ්ය වේ. එය ලබා දෙන්නේ `available`, sanitized FFmpeg/ffprobe versions, සහ runtime එක unavailable වූ විට භාවිත කරන ස්ථාවර reason එක පමණි. Internal extraction endpoint එක public upload API එකක් නොවේ: queue saturation මඟින් `503` සහ `Retry-After` යවයි, caller disconnect එකක් `499` යවයි, සහ ස්ථාවර broker deadline එක `504` යවයි. Converted responses මධ්යම `x-omniroute-modality-bridge` header එකට `video->text;model=<visionModel>;parts=<videos>` එක් කරන නමුත් Vision හෝ Audio segments ඉවත් නොකරයි.

### PII Masker (`piiMasker.ts`)

අදියර **දෙකෙහිම** ක්රියාත්මක වේ.

- **`preCall`** payload එක clone කර, `system`, `messages`, `input`, සහ
  `prompt` හරහා (සාමාන්ය string items ද ඇතුළුව) ගමන් කර, string
  `content`/`text` fields සඳහා
  `@/shared/utils/inputSanitizer` වෙතින් ලැබෙන `processPII()` යොදයි.
  `PII_REDACTION_ENABLED=true` වූ විට, හඳුනාගත් PII outbound payload තුළ
  redacted කරයි. මෙය `INPUT_SANITIZER_MODE` වෙතින් ස්වාධීන වේ (එය
  prompt-injection policy පමණක් පාලනය කරයි). Redaction අක්රිය විට, content
  නැවත ලිවීමකින් තොරව detection counts සටහන් කරයි.
- **`postCall`** response එක deep-clone කර, `sanitizePIIResponse()` සහ
  Responses-API හැඩයේ masker එක (`maskResponsesOutput` —
  `output_text` සහ `output[].content[].text` ආවරණය කරයි) ක්රියාත්මක කරයි.
  කිසියම් redaction එකක් සිදු වුවහොත්, වෙනස් කළ response එක මුල් response එක
  වෙනුවට යොදයි.

Guardrail එක කිසි විටෙක block නොකරයි; එය annotations පමණක් එක් කරයි
(`meta.detections`, `meta.redacted`) හෝ නැවත ලියයි.

#### එක් වර්ගයකට තේරීම, අභිරුචි patterns සහ detection counters

**Dashboard → Settings → Security → PII masking** මඟින් mask කළ යුතු දේ
තෝරයි. එය masking ක්රියාත්මක නොකරයි: එය තවමත්
`PII_REDACTION_ENABLED` (request) සහ `PII_RESPONSE_SANITIZATION`
(response + SSE) මඟින් පාලනය වේ; දෙකම පෙරනිමියෙන් අක්රියය.

- **Per-type selection** — built-in ids
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`) තුළ ලැයිස්තුගත කර
  ඇත. නොසකසා තිබීමෙන් සියලු වර්ග අදහස් වේ (මෙම setting එක පැමිණීමට පෙර තිබූ
  හැසිරීම). Request engine හි `ssn_us` pattern එක `ssn` වෙත map වේ.
  Templates (Minimal, Standard, Financial, Brazilian, USA, GDPR, POPIA, Full)
  UI හි checkboxes පමණක් පුරවයි.
- **GDPR සහ POPIA identifiers** — EU සහ දකුණු අප්රිකානු පුද්ගලික
  identifiers ආවරණය කරන built-in ids දොළහක් ඇත (පහත වගුව). ඒවායේ regexes,
  validators සහ jurisdiction tags එක් වගුවක,
  `src/shared/utils/piiPatterns.ts`, තිබෙන අතර response sanitizer එක
  (`src/lib/piiSanitizer.ts`) සහ request masker එක
  (`src/shared/utils/inputSanitizer.ts`) දෙකම එය භාවිත කරයි. Match එකක්
  redacted කරන්නේ එහි validator එක එය පිළිගත් විට පමණි; හිස් digits
  අනුක්රමයක් කිසි විටෙක ප්රමාණවත් නොවේ. මෙම ids පැමිණීමට පෙර සීමා කළ
  selection එකක් save කළ operator කෙනෙකුට, නව ids තෝරන තුරු තිබූ හැසිරීමම
  පවතී.
- **Custom patterns** — regex හෝ wildcard patterns 20ක් දක්වා (`*` = උපරිම
  whitespace නොවන characters 64ක්, `?` = එකක්). Matches
  `[CUSTOM_REDACTED]` බවට පත්වේ. සෑම pattern එකක්ම
  `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`)
  හරහා යයි: උපරිම characters 500ක්, flags `g i m s u` වෙත පමණක් සීමා විය
  යුතුය, compile විය යුතුය, `safe-regex` පරීක්ෂාව (catastrophic
  backtracking) සමත් විය යුතුය, සහ empty string එකකට හෝ redaction
  placeholder එකකට match නොවිය යුතුය. අසමත් pattern එකක් save කරන විට සහ
  test කරන විට ප්රතික්ෂේප කරයි; අසමත් වන stored row එකක් compile කිරීම වෙනුවට
  runtime හි skip කරයි. Custom patterns ක්රියාත්මක වන්නේ masking on විට
  පමණි.
- **Detection counters** — එක් එක් වර්ගයට අදාළ counts (කිසි විටෙක matched
  values නොවේ), memory තුළ තබාගෙන restart එකකදී reset කරයි
  (`src/lib/pii/piiDetectionStats.ts`). ඒවා වැඩි වන්නේ masking on විට
  පමණි.

Settings `key_value` table එකේ (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) තබා ඇති අතර, 1 s cache එකක් හරහා කියවනු ලැබේ.
API:

| Method | Path                     | Purpose                                                                    |
| ------ | ------------------------ | -------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Flag state, `enabledTypes`, `customPatterns`, detection counters           |
| `PUT`  | `/api/settings/pii`      | `enabledTypes` (`null` = all) සහ/හෝ `customPatterns` ප්රතිස්ථාපනය කිරීම    |
| `POST` | `/api/settings/pii/test` | උපරිම 8 KB sample එකකට එක් pattern එකක් dry-run කිරීම; කිසිවක් ගබඩා නොකෙරේ |

මේ තුනටම management auth අවශ්ය වන අතර, body එක Zod මඟින් validate කරයි
(`src/shared/validation/schemas/piiSettings.ts`).

#### GDPR (EU) සහ POPIA (දකුණු අප්‍රිකාව) හඳුනාගැනීම්

| ID                  | හඳුනාගැනීම                     | වලංගුකරණය                                                                          |
| ------------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| `iban`              | IBAN                           | දන්නා රට, එම රට සඳහා නිශ්චිත දිග, ISO 13616 MOD-97-10                              |
| `eu_vat`            | EU VAT අංකය                    | දන්නා සාමාජික රටේ prefix සහ එම රටේ අංක ආකෘතිය (VIES lookup නැත)                    |
| `es_dni_nie`        | ස්පාඤ්ඤ DNI / NIE              | පරීක්ෂක අකුර (අගය mod 23); NIE යනු `X/Y/Z` + ඉලක්කම් 7 කි                          |
| `it_codice_fiscale` | ඉතාලි Codice Fiscale           | ඔත්තේ/ඉරට්ටේ ස්ථාන වගුවලින් පරීක්ෂක අකුර                                           |
| `pl_pesel`          | පෝලන්ත PESEL                   | බර යෙදූ checksum සහ encode කළ උපන් මාසය/දිනයේ සාධාරණ පරාස                          |
| `nl_bsn`            | ලන්දේසි BSN                    | 11 පරීක්ෂාව (බර 9..2, -1)                                                          |
| `de_steuer_id`      | ජර්මානු Steuer-ID              | ISO 7064 Mod 11,10 සහ ඉලක්කම් ව්‍යුහ නීති (මුලට 0 නැත)                             |
| `se_personnummer`   | ස්වීඩන් personnummer           | අවසන් ඉලක්කම් දහය සඳහා Luhn සහ සාධාරණ උපන් දිනයක් (ඉලක්කම් 10 හෝ 12)               |
| `za_id`             | දකුණු අප්‍රිකානු ID අංකය       | සියලු ඉලක්කම් 13 සඳහා Luhn, වලංගු උපන් මාසය/දිනය, පුරවැසි ඉලක්කම 0 හෝ 1            |
| `za_phone`          | දකුණු අප්‍රිකානු දුරකථනය       | `+27` / `27` prefix, හෝ space/hyphen සහිත ජාතික `0..` ආකෘතිය                       |
| `za_vat`            | දකුණු අප්‍රිකානු VAT අංකය      | `4` න් ආරම්භ වන ඉලක්කම් 10 ක් **සහ** ඊට පෙර අකුරු 48 තුළ "VAT" / "BTW"             |
| `za_tax_ref`        | දකුණු අප්‍රිකානු tax reference | `0`-`3` න් ආරම්භ වන ඉලක්කම් 10 ක්, Luhn, **සහ** ඊට පෙර අකුරු 48 තුළ "tax" / "SARS" |

ඉලක්කම් පමණක් ඇති ආකෘති order number, build number සහ timestamp සමඟ ගැටෙන බැවින් දුර්වලම ඒවාට (`za_vat`, `za_tax_ref`) keyword ඉඟිය අවශ්‍යය; ඉලක්කම් දහයක `0..` අංකයක් පමණක් දකුණු අප්‍රිකානු phone number ලෙස නොසලකයි. Space සහිත IBAN (`GB29 NWBK ...`) match නොවේ. Streaming මාර්ගයේ ඉඟිය සොයන්නේ වත්මන් chunk ඇතුළත පමණි. ID පිහිටන්නේ generic phone pattern වලට පෙර බැවින් වලංගු කළ හඳුනාගැනීම තමන්ගේ placeholder රඳවාගනී (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). `gdpr` සහ `popia` template පිළිවෙළින් EU සහ දකුණු අප්‍රිකානු ID තෝරයි. Masking තවමත් කැමැත්තෙන් සක්‍රිය කළ යුතුය (Hard Rule #20): මෙහි කිසිවක් feature-flag පෙරනිමිය වෙනස් නොකරයි.

### Prompt Injection (`promptInjection.ts`)

පරිශීලකයා සපයන අන්තර්ගතයේ විරුද්ධවාදී ව්යුහ හඳුනාගෙන, සකසා ඇති ප්රතිපත්තිය බලාත්මක කරයි. හැසිරීම environment variables සහ constructor options මඟින් පාලනය වේ:

| Setting         | Env var                                                                                               | Default | Effect                                                                                                                                                                              |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enabled         | `INPUT_SANITIZER_ENABLED`                                                                             | `true`  | `false` වූ විට guardrail එක වහාම අවසන් වේ.                                                                                                                                          |
| Mode            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`  | Injection policy: `block`, `warn`, හෝ `log`. (`redact` back-compat සඳහා පිළිගන්නා නමුත් injection text ඉවත් නොකරයි; request PII rewrite එක `PII_REDACTION_ENABLED` මඟින් පාලනය වේ.) |
| Block threshold | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | block කිරීමට අවශ්ය අවම severity මට්ටම. Default එකේදී Medium මට්ටම observe-only වේ.                                                                                                  |

**Mode precedence** (`getMode`): caller `options.mode` →
`INJECTION_GUARD_MODE` **DB feature-flag override** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. එබැවින් dashboard override එක env vars අභිබවා යන අතර, Feature
Flags UI මඟින් ධාවනය වන guard එක live ලෙස පාලනය කරයි (restart එකක් අවශ්ය නොවේ). DB කියවීම fail-safe වේ:
එය දෝෂයකට ලක් වුවහොත්, guard එක env මත පදනම් වූ හැසිරීමට ආපසු යන අතර, override එකක් සකසා නොමැති විට හැසිරීම env-only resolution එකට සමාන වේ.

හඳුනාගැනීමේ මූලාශ්ර:

1. `@/shared/utils/inputSanitizer` වෙතින් `sanitizeRequest()` (pipeline එකේ වෙනත් ස්ථානවලද භාවිත වන shared detector set එක).
2. Built-in `DEFAULT_GUARD_PATTERNS` (`system_override_inline` සහ `markdown_system_block` යන දෙකම දැනට `high` severity වේ).
3. Constructor options හරහා ලබාදෙන විකල්ප `customPatterns` (strings, regex, හෝ `{ name, pattern, severity }` records).

`mode === "block"` සහ අවම වශයෙන් එක් detection එකක් severity threshold එක සපුරාලන විට, `preCall` මඟින් `{ block: true, message: "Request rejected:
suspicious content detected" }` ආපසු ලබා දෙයි. `warn`/`log` modes වලදී guardrail එක log කරන නමුත් call එකට ඉඩ දෙයි. Registry එක හරහා නොගොස් prompts ඇගයීමට අවශ්ය callers සඳහා shared helper `evaluatePromptInjection()` ද export කර ඇත.

**Scan bound (v3.8.20):** detector එක එක් කළ prompt text එකේ **පළමු 16 KB** පමණක් පරීක්ෂා කරයි — `src/shared/utils/inputSanitizer.ts` තුළ
`MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) වේ. Pattern loop එක ධාවනය කිරීමට පෙර `detectInjection()` සහ
`evaluatePromptInjection()` දෙකම `slice(0, MAX_INJECTION_SCAN_BYTES)` සිදු කරයි. Injection directives input එකේ ඉහළ ආසන්නයේ ඇති බැවින්, මෙය multi-hundred-KB payloads වල regex CPU/GC සීමා කරන්නේ detection දුර්වල නොකරමිනි (cf.
#3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Default chain එකේ අවසන් ස්ථානයේ (priority `95`) stages **දෙකෙහිම** ක්රියා කරයි. Outbound payload එකේ (message content, tool-call arguments, tool results) **සහ** provider response එකේ ඇති ප්රසිද්ධ API-key / secret-token රටා redact කරයි. එබැවින් prompt එකකට අලවා ඇති credential එකක් (හෝ tool result එකකින් නැවත ලබා දුන් credential එකක්) upstream provider වෙත හෝ client වෙත කාන්දු නොවේ.

- **Opt-in පමණි**, PII redaction හා සමාන convention එකක් (Hard Rule #20-adjacent):
  `settings.credentialRedactionEnabled === true` **හෝ**
  `CREDENTIAL_REDACTION_ENABLED=true` වූ විට පමණක් සක්රිය වේ. එය අක්රිය නම් guardrail එක no-op එකක් වේ —
  කිසිවිටෙක block නොකරන අතර කිසිවිටෙක rewrite නොකරයි.
- `redactCredentials()` සම්පූර්ණ payload/response tree එක හරහා ගමන් කරයි (`walkValue()`,
  prototype-pollution-safe, `WeakSet` හරහා cycle-safe) සහ matches `[REDACTED:<type>]` placeholder එකකින් ප්රතිස්ථාපනය කරයි. වෙනස් වූ branches පමණක් clone කරයි.
- `CREDENTIAL_PATTERNS` තුළ LLM provider keys (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokens (GitHub, Slack, Linear, Notion, npm, Postman, Discord), payment keys (Stripe, Square), cloud
  keys (AWS access key, Twilio, SendGrid, Mailgun), private keys / JWTs,
  credential-bearing connection strings (`mongodb://user:pass@...`, ආදිය), සහ සාමාන්ය
  `Authorization`/`x-api-key`/`api-key`/`apikey` header-value
  pattern එක ආවරණය කරයි. Header-හැඩැති keys (`authorization`, `x-api-key`, `api-key`,
  `apikey`) generic text regex එක හරහා නොව, ව්යුහාත්මකව (value එක පමණක්, `Bearer `/`Basic ` වැනි
  scheme prefix එක තබාගෙන) redact කරයි.
- Guardrail එක කිසිවිටෙක block නොකරයි; එය rewrite පමණක් සිදු කරයි (`modifiedPayload` /
  `modifiedResponse`) සහ annotations එක් කරයි (`meta.credentialsRedacted`, `meta.count`).

ප්රතිගමන ආරක්ෂණය: `tests/unit/credential-masker-guardrail.test.ts`.

## මූලික ගිවිසුම (`base.ts`)

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
  block?: boolean; // true නම් දාමය කෙටිමං කරයි
  message?: string; // අවහිර කරන විට ප්රදර්ශනය වේ
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // ඉල්ලීම නැවත ලිවීමට preCall විසින් ආපසු ලබා දේ
  modifiedResponse?: TValue; // ප්රතිචාරය නැවත ලිවීමට postCall විසින් ආපසු ලබා දේ
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

ගාර්ඩ්රේල් එකක් `void`, `{}`, හෝ `{ block: false }` ආපසු ලබා දීමෙන් "වෙනසක් නැත" බව සංකේත කරයි.
`modifiedPayload`/`modifiedResponse` ආපසු ලබා දීම, downstream ගාර්ඩ්රේල් සඳහා දාමය හරහා
ගලා යන අගය ප්රතිස්ථාපනය කරයි.
`signal?: AbortSignal` ඇමතුම්කරුගේ ජීවන චක්රය ගාර්ඩ්රේල් තුළට ගෙන එයි. ඉල්ලීමක් abort කිරීම යනු හිතාමතා ඇති fail-open ව්යතිරේකයයි: media bridges වැඩ නවත්වා, අමු මාධ්ය එයට සහාය නොදක්වන බව දන්නා ඉලක්කයකට ප්රතිස්ථාපනය නොකරමින් cleanup සිදු කරයි.

## රෙජිස්ට්රිය (`registry.ts`)

singleton `guardrailRegistry` මෙය නිරාවරණය කරයි:

- `register(guardrail)` — ගාර්ඩ්රේල් එකක් එක් කරයි (හෝ සාමාන්යකළ නම අනුව ප්රතිස්ථාපනය කරයි)
  සහ `priority` ආරෝහණ අනුපිළිවෙළින් නැවත වර්ග කරයි.
- `clear()` / `list()` — පරිපාලන උපකාරක.
- `runPreCallHooks(payload, context)` — සක්රීය ගාර්ඩ්රේල් හරහා යමින්, payload එක
  `modifiedPayload` හරහා දමා යවන අතර, පළමු `block: true` හිදී නවතී.
- `runPostCallHooks(response, context)` — ප්රතිචාර පැත්තෙන් එම ගලායාමම.
- `resetGuardrailsForTests({ registerDefaults })` — තත්ත්වය හිස් කර, පිරිසිදු පරීක්ෂණ
  හුදෙකලාවක් සඳහා අවශ්ය නම් පෙරනිමි නැවත ලියාපදිංචි කරයි.

ධාවක දෙකම `{ blocked, payload|response, results, guardrail?, message? }` ආපසු ලබා දෙන අතර,
`results` යනු එක් එක් ගාර්ඩ්රේල් සඳහා `blocked`, `skipped`, `modified`, `error`, සහ `meta`
ක්ෂේත්ර ඇතුළත් `GuardrailExecutionResult` වාර්තා මාලාවක් වන අතර, එය tracing සඳහා
ප්රයෝජනවත් වේ.

### ඉල්ලීම අනුව ගාර්ඩ්රේල් අක්රීය කිරීම

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` වත්මන් ඉල්ලීම සඳහා මඟහැරිය යුතු
ගාර්ඩ්රේල් නම්වල අනුපිටපත් ඉවත්කළ ලැයිස්තුවක් එකතු කරයි. නාලිකා පහක් ඇත; ඒවා මෙම
අනුපිළිවෙළින් කියවා එකම ලැයිස්තුවකට ඒකාබද්ධ කෙරේ (අනුපිටපත් ඉවත් කිරීමේදී පළමු සිදුවීම ජය ගනී):

1. `apiKeyInfo.disabledGuardrails`
2. ඉල්ලීම් body හි `disabledGuardrails` (ඉහළ මට්ටම)
3. ඉල්ලීම් body හි `metadata.disabledGuardrails` (`metadata` වස්තුවක් වන විට පමණක්)
4. `x-omniroute-disabled-guardrails` ශීර්ෂකය
5. පැරණි `x-disabled-guardrails` ශීර්ෂකය

නාලිකා පහම ඒකාබද්ධ වේ — ශීර්ෂක දෙකත් ඇතුළුව:
`x-omniroute-disabled-guardrails` සහ `x-disabled-guardrails` දෙකම යැවීමෙන් ඒවායේ ලැයිස්තුවල
සංයෝගය මඟහැරෙන අතර, හිස් නවීන ශීර්ෂකයක් තවදුරටත් පැරණි එක සඟවන්නේ නැත
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), සවි කරන ලද්දේ
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805) හි).

අගයන් string arrays හෝ කොමාවෙන් වෙන්කළ string එකක් විය හැක; නම් trim කර
lowercase kebab-case වලට සාමාන්යකරණය කෙරේ (`pii_masker` → `pii-masker`), සහ හිස්
අයිතම ඉවතලයි. ප්රතිඵලය `context.disabledGuardrails` හරහා රෙජිස්ට්රියට යවන අතර,
එය ගැලපෙන ගාර්ඩ්රේල් මඟහරී (`results` තුළ `skipped: true`).

අක්රීය ලැයිස්තුව බලපාන්නේ **රෙජිස්ට්රියට** පමණි. Prompt-injection `block` මාදිලිය
අනිවාර්ය මායිමකි: injection-guard middleware
(`src/middleware/promptInjectionGuard.ts`) කිසිදු ඇමතුම්කරු-පාලිත අක්රීය ලැයිස්තුවක්
නොමැතිව `evaluatePromptInjection()` අමතයි (එය කලින් සිදුකළ නිෂ්ඵල
`resolveDisabledGuardrails({ body })` ඇමතුම
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934) හි ඉවත් කරන ලදී), එබැවින්
`prompt-injection` අක්රීය කරන ඉල්ලීමක් `block` මාදිලියේ තවමත් ප්රතික්ෂේප වේ. මෙය
අභිප්රායෙන් සැලසුම් කර ඇති දෙයකි. අක්රීය නාලිකා ඇමතුම්කරු-පාලිත වේ (ඉල්ලීම් body,
metadata, ශීර්ෂක), සහ operator විසින් සකසන ලද ආරක්ෂක පාලනයක්
ඇමතුම්කරුවෙකුට අක්රීය කිරීමට නොහැකි විය යුතුය
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).
[#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412) හි ශීර්ෂක
සංයෝගය වෙනස් කරන්නේ මඟහැරෙන registry ගාර්ඩ්රේල් මොනවාද යන්න පමණි; එය සේවාලාභියෙකුට
middleware මඟහැර යාමට ඉඩ නොදෙයි. අනිවාර්ය per-key සහ per-group ගාර්ඩ්රේල් ප්රතිපත්ති
v4 RFC [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417) හි නිරීක්ෂණය කෙරේ.
[ආවරණය සහ සීමාවන්](#coverage-and-limits) බලන්න.

## ක්රියාත්මක කිරීමේ අනුපිළිවෙල

`src/sse/handlers/chat.ts` සහ `open-sse/handlers/chatCore.ts` හරහා ගලා යන සෑම ඉල්ලීමක් සඳහාම ([ආවරණය සහ සීමාවන්](#coverage-and-limits) යටතේ ලැයිස්තුගත කර ඇති chat-පවුලේ මාර්ග):

1. `resolveDisabledGuardrails(...)` API key, body සහ headers වලින් skip ලැයිස්තුව සාදයි.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` ආරක්ෂක මාර්ග (guardrails) ඉහළ යන ප්රමුඛතා අනුපිළිවෙලින් ක්රියාත්මක කරයි:
   - අක්රීය කරන ලද ආරක්ෂක මාර්ග `skipped` ලෙස සටහන් වේ.
   - සෑම ආරක්ෂක මාර්ගයකම `preCall` හරහා `modifiedPayload` මඟින් payload එක නැවත ලිවිය හැක.
   - පළමු `block: true` එක දාමය short-circuit කරයි, එවිට handler එක ආරක්ෂක මාර්ග ප්රතික්ෂේප ප්රතිචාරයක් ලබා දෙයි.
3. (නැවත ලියන ලද විය හැකි) payload එක combo routing සහ upstream dispatch වෙත ගලා යයි.
4. **Non-streaming පමණි:** ප්රතිචාරය එකලස් කළ පසු, `guardrailRegistry.runPostCallHooks(...)` ප්රතිචාරය මත එම දාමයම ක්රියාත්මක කරයි. මෙහි `block: true` එකක් upstream ප්රතිචාරය ඉවතලා HTTP 400 ලබා දෙයි. Stream කරන ලද ප්රතිචාර මෙම පියවර සම්පූර්ණයෙන්ම මඟහරියි.

දෝෂයක් විසි කරන ආරක්ෂක මාර්ග `error: <message>` සමඟ සටහන් කර `logger.warn` හරහා log කෙරේ, නමුත් දාමය දිගටම පවතී — සැලසුම අනුව fail-open ය.

## ආවරණය සහ සීමාවන්

ආරක්ෂක මාර්ග registry එක chat pipeline එකට පමණක් සම්බන්ධ කර ඇත. මෙම සීමාවන් `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` සහ `tests/unit/guardrail-pipeline-characterization.test.ts` මගින් pin කර ඇත; හැසිරීම වෙනස් වන විට එම පරීක්ෂණ හිතාමතාම යාවත්කාලීන කරන්න.

### Hook ක්රියාත්මක වන ස්ථාන

| Hook / පාලනය                        | ක්රියාත්මක වන්නේ                                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                   | `handleChat` (`src/sse/handlers/chat.ts`) මගින් හැසිරවෙන ඉල්ලීම්: `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (සහ `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*`, සහ Telegram chat proxy. එසේම dashboard test endpoint `/api/guardrails/test`. Pre-call block එකක් HTTP 400 ලබා දෙයි. |
| `runPostCallHooks`                  | **Non-streaming** chat ප්රතිචාර පමණක් (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Stream කරන ලද ප්රතිචාර කිසි විටෙක එයට ළඟා නොවේ.                                                                                                                                                                                                                                                                              |
| Streaming PII                       | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), `PII_RESPONSE_SANITIZATION` සක්රිය විට `streamingPipeline.ts` තුළ pipe කර ඇත. එය ආරක්ෂක මාර්ගයක් නොවේ, එබැවින් අක්රීය කිරීමේ නාලිකා එයට බලපාන්නේ නැත.                                                                                                                                                                                                        |
| Injection-guard middleware (legacy) | Prompt-අඩංගු සෑම `/v1` මාර්ගයක්ම, chat-පවුල ද ඇතුළුව (බලන්න [මාර්ග ආවරණය](#injection-guard-route-coverage--red-team-phase-8--block-d)). Prompt injection පමණි.                                                                                                                                                                                                                                                             |

### ආවරණය නොවන දේ

- **මාධ්ය, embeddings සහ දත්ත මාර්ග** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) කිසි විටෙක registry එකට ළඟා නොවේ. එහි
  PII masking, credential masking හෝ modality bridge ක්රියාත්මක නොවේ. ඒවායේ එකම
  පරීක්ෂාව legacy injection-guard middleware එකයි.
- **Stream කරන ලද ප්රතිචාර** post-call ආරක්ෂක මාර්ග කිසිවක් නොලබයි: `pii-masker` හෝ
  `credential-masker` post-call නැත, post-call block එකක්ද නැත. අදාළ වන්නේ streaming PII
  transform එක පමණි (`PII_RESPONSE_SANITIZATION` සක්රිය විට). Stream කරන ලද
  ප්රතිචාරයක නැවත echo වන credential එකක් redact නොකෙරේ.
- **අක්රීය නාලිකා vs. middleware (සැලසුම අනුව):** middleware එක caller-පාලනය කරන
  අක්රීය ලැයිස්තුවක් නොයවමින්, `evaluatePromptInjection()` වෙත තමාගේම call එකකින්
  prompt injection ඇගයීම කරයි. `block` mode එක caller-පාලනය කළ හැකි අක්රීය කිරීම්වලට
  මඟහැර යා නොහැකි අනිවාර්ය සීමාවකි, chat-පවුලේ මාර්ග මතද
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). `prompt-injection`
  අක්රීය කිරීමෙන් මඟහැරෙන්නේ registry ආරක්ෂක මාර්ගය පමණි.

### Post-call ට පෙර ප්රතිචාරයක් දකින්නේ කුමක්ද

Non-streaming මාවතේ අනුපිළිවෙල: memory extraction → built-in tool
execution → post-call ආරක්ෂක මාර්ග → post-call block පිටවීම → semantic-cache ගබඩා කිරීම.

- **මතක නිස්සාරණය** සහ **මෙවලම් ක්රියාත්මක කිරීම** post-call
  guardrails මඟින් එය නැවත ලිවීමට හෝ අවහිර කිරීමට පෙර ප්රතිචාරය දකිති.
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) සිට, මතක
  නිස්සාරණය `PII_RESPONSE_SANITIZATION` සක්රිය කර ඇති විට (streaming සහ
  non-streaming දෙකෙහිම) නිස්සාරණය කළ පෙළ `sanitizePII` හරහා යවයි, නමුත්
  post-call පසුව අවහිර කරන ප්රතිචාරයක් දැනටමත් මතකයට සහ මෙවලම්වලට ලබා දී ඇත.
- **අර්ථාත්මක හැඹිලිය** post-call වලට පසුව ප්රතිචාරය ගබඩා කරයි, එබැවින් එය
  නැවත ලියන ලද ප්රතිචාරය ගබඩා කරයි, සහ අවහිර කළ ප්රතිචාරයක් කිසිවිටෙක
  හැඹිලිගත නොවේ. හැඹිලි සටහන් API යතුර අනුව යතුරුකරණය කර ඇත.

## වින්යාසය

සවිකර ඇති ආරක්ෂකයන් (guardrails) විසින් කියවන පරිසර විචල්යයන්:

| විචල්යය                               | භාවිත කරන්නේ        | බලපෑම                                                                                         |
| ------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`  | හඳුනාගැනීම සම්පූර්ණයෙන්ම අක්රීය කිරීමට `false` ලෙස සකසන්න.                                    |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`  | එන්නත් ප්රතිපත්තිය: `warn`, `block`, හෝ `log`. පරණ අගය `redact` එන්නත් පාඨය නැවත ලියන්නේ නැත. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`  | එන්නත් ආරක්ෂකය සඳහා මාදිලිය; එසේම env විචල්යයන් **අභිබවා** යන DB විශේෂාංග ධජයකි (DB > ENV).   |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`  | `MODE=block` විසින් ප්රතික්ෂේප කරන අවම බරපතළභාවය: `high` (පෙරනිමි), `medium`, හෝ `low`.       |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`  | `INPUT_SANITIZER_BLOCK_THRESHOLD` සඳහා පරණ අන්වර්ථ නාමයකි.                                    |
| `PII_REDACTION_ENABLED`               | `pii-masker`        | `true` වූ විට, ඉල්ලීමේ PII මකා දමනු ලැබේ (එන්නත් මාදිලියෙන් ස්වාධීනව).                        |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (පහළට) | ප්රතිචාර-පැත්තෙහි masker හැසිරීම පාලනය කරයි.                                                  |

Modality Bridge ආරක්ෂකයන් ධාවන-කාල වින්යාසය env විචල්යයන්ගෙන් නොව, DB-පසුබිම් සැකසුම් ගබඩාවෙන් (`getSettings()`) කියවයි. Vision හි ප්රාථමික යතුරු වන්නේ
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, සහ
`modalityBridgeCacheMaxEntries` යනුවෙනි. පරණ
`visionBridge*` යතුරු පිළිගැනෙන්නේ ලේඛනගත එක්-චක්ර කියවීමේ fallback ලෙස පමණි; dashboard ලිවීම්වලදී ප්රාථමික යතුරු භාවිත කෙරේ. පෙරනිමි අගයන් සහ fallback විසඳකය `src/shared/constants/modalityBridgeDefaults.ts` හි ඇති අතර, පරණ නියතයන් `src/shared/constants/visionBridgeDefaults.ts` හි රඳවා තබා ඇත.

Audio විසින් `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, සහ `modalityBridgeAudioMaxClips` භාවිත කරයි, මීට අමතරව බෙදාගත්
`modalityBridgeCache*` සැකසුම් ද. මෙම යතුරු Modality Bridge schema සමඟ හඳුන්වා දෙන ලද බැවින් Audio සඳහා පරණ-යතුරු fallback නොමැත.

Video විසින් `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, සහ
`modalityBridgeVideoTimeout` භාවිත කරයි, මීට අමතරව බෙදාගත් `modalityBridgeCache*` සැකසුම් ද.
FFmpeg/ffprobe විකල්ප මෙහෙයුම් යැපීම් වන අතර රාමු ශීර්ෂකගත කිරීම ප්රමාදය සහ ආකෘති පිරිවැය එකතු කරන බැවින් එය පෙරනිමියෙන් අක්රීය කර ඇත.

## අභිරුචි Guardrails

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

පියවර:

1. `BaseGuardrail` දීර්ඝ කරමින් `src/lib/guardrails/myGuardrail.ts` සාදන්න.
2. `preCall` සහ/හෝ `postCall` ක්රියාත්මක කරන්න.
3. import වන විට ලියාපදිංචි කරන්න (`registerDefaultGuardrails` වෙතින් push කිරීමෙන්) හෝ
   runtime තුළ `guardrailRegistry.register(...)` අමතන්න — registry එක
   එකම සාමාන්යකරණය කළ නමක් ඇති පෙර guardrail එකක් ප්රතිස්ථාපනය කරයි.
4. `tests/unit/` යටතේ පරීක්ෂණ එක් කරන්න (පවතින උදාහරණ:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## පරීක්ෂණ

දන්නා තත්ත්වයකින් ආරම්භ කිරීමට පරීක්ෂණ අතර `resetGuardrailsForTests()` භාවිතා කරන්න.
හිස් registry එකකින් ආරම්භ කර පරීක්ෂණයට යටත් guardrails පමණක් ලියාපදිංචි කිරීමට
`{ registerDefaults: false }` යොදන්න. Vision Bridge dependency injection පිළිගනී
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge සැකසුම්, හැකියාවන්,
STT ආකෘති තේරීම, අක්තපත්ර පරීක්ෂණ සහ පිටපත් කිරීම (transcription) සඳහා සමාන
seams හෙළි කරයි. එබැවින් පරීක්ෂණවලට DB හෝ ජාල ප්රවේශයක් නොමැතිව ගලායාම්
දෙකම ක්රියාත්මක කළ හැක.

## මෙයද බලන්න

- `src/lib/guardrails/` — ක්රියාත්මක කිරීම
- `src/shared/utils/inputSanitizer.ts` — prompt-injection සහ PII masking සඳහා
  බලය සපයන හවුල් අනාවරකය
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge පෙරනිමි සහ
  forced-bridge ආකෘති ලැයිස්තුව
- `src/shared/constants/modalityBridgeDefaults.ts` — හවුල් Vision/Audio runtime පෙරනිමි
- `docs/architecture/RESILIENCE_GUIDE.md` — orthogonal ස්ථරය (circuit breaker, cooldowns)
- `docs/reference/ENVIRONMENT.md` — සම්පූර්ණ env විචල්ය යොමුව

## Injection-guard මාර්ග ආවරණය සහ red-team (අදියර 8 · කොට්ඨාසය D)

injection-guard (`createInjectionGuard` / `withInjectionGuard`) පරිශීලක prompt
භාරගන්නා සියලුම මාර්ග ආවරණය කරයි. එය `INJECTION_GUARD_MODE` අනුගමනය කරයි
(පෙරනිමි `warn` = ලොග් කිරීම පමණයි; `block` = HTTP 400 `SECURITY_001` ආපසු දෙයි).

| වර්ගය       | මාර්ග                                                                                                                                                | පෙරනිමි ආකාරය |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| පෙළ (පවතින) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn          |
| උත්පාදනීය   | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn          |
| දත්ත        | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn          |

පෙළ උපුටාගැනීම (`extractMessageContents`) `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` ආවරණය කරයි.

**Red-team (රාත්රී, `nightly-llm-security.yml`):** promptfoo සෑම මාර්ගයක්ම
`INJECTION_GUARD_MODE=block` තුළ OWASP-LLM corpus එක අවහිර කරන බව තහවුරු කරයි;
garak probes ධාවනය කරයි (secret නොමැතිව මඟ හරිනු ලැබේ). `moderations` අනුකූලතාව
සඳහා ඇතුළත් කර ඇත. Block ආකාරය අනිවාර්ය සීමාවකි: `evaluatePromptInjection()`
middleware එක එයට යවන ඉල්ලීම-එකකට (per-request) අක්රිය කිරීමේ ලැයිස්තුව නොසලකා
හරින නිසා, `disabledGuardrails` මාර්ගයක් එයින් නිදහස් **නොකරයි**
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

රාත්රී workflow එකට (`.github/workflows/nightly-llm-security.yml`, cron + අතින්
dispatch) කාර්යයන් දෙකක් ඇත:

- **`promptfoo-guard` (අවහිර කරන සුළු)** — `INJECTION_GUARD_MODE=block` සමඟ
  `promptfoo eval -c promptfooconfig.yaml` ධාවනය කරයි. සෑම adversarial නඩුවක්ම
  (උදා. "ignore all previous instructions…", DAN-ශෛලීය jailbreaks) ප්රතිචාරයේ
  `error.code === "SECURITY_001"` අඩංගු බව තහවුරු කරයි, එනම් guard එක
  සැබවින්ම ඉල්ලීම ප්රතික්ෂේප කළ බව.
- **`garak` (උපදේශාත්මක)** — දේශීය OmniRoute සිද්ධියක් (`http://localhost:20128/v1`)
  ඉලක්ක කර garak `--probes promptinject,dan,leakreplay` ධාවනය කරයි. provider
  secret එකකින් (`PROMPTFOO_PROVIDER_KEY`) gated වේ; සුමටව මඟ හරිනු ලබන අතර
  `|| true` ලෙස අවසන් වන නිසා, CI අසාර්ථක නොකර වාර්තා කරයි.

guard helper (`createInjectionGuard` / `withInjectionGuard`) හි ආවරණය prompt-දරන
සෑම `/v1` මාර්ගයක්ම පුරා විහිදේ; prompt පෙළ
`src/shared/utils/inputSanitizer.ts` හි `extractMessageContents()` මඟින්
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` වෙතින්
ලබාගනු ලැබේ.
