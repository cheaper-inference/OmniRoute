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

### වීඩියෝ පාලම (`videoBridge.ts`, `videoBridgePipeline.ts`)

දන්නා දේශීය වීඩියෝ සහාය නොමැතිව ඉලක්කයක් හැඳින්වීමට පෙර කතාබස් සම්පූර්ණ කිරීම් `messages` සහ ප්‍රතිචාර API `input` හි ඉහළ මට්ටමේ වීඩියෝ කොටස් බාධා කරයි. සහාය දක්වන හැඩතල වන්නේ `input_video`, `video_url`, `video_source`, HTTPS URLs, සහ `data:video/*;base64,...` දත්ත URIs. පෙළෙහි ඇති සරල ගොනු නාම වීඩියෝ ලෙස සලකන්නේ නැත.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) සතුව ඉල්ලීම් ගමන් කිරීම, capability/policy චෙක්පත, එක් ඉල්ලීමකට එකතු කිරීම සහ ප්‍රතිචාර ගෙවීමේ භාරය හිමි වේ. එක්-වීඩියෝ වැඩ — අත්පත් කර ගැනීම, සම්පූර්ණ ප්‍රතිඵල හැඹිලිය, රාමු අනුපිළිවෙලක් විස්තර කරයි (ඕනෑම ඇමතුම්කරු විසින් ප්‍රකාශ කරන ලද ශ්‍රව්‍ය පිටපතක් ඒකාබද්ධ කරයි), සහ එක් උත්සාහයක metrics/abort/cleanup — `videoBridgePipeline.ts` හි `processVideoPart` පිටුපස සැඟවී ඇත, `preCall` ගේ ලූපය තුළ එක් වීඩියෝ කොටසකට වරක් හැඳින්වේ. එම මොඩියුලය පැහැදිලි තොට මායිම් `VideoMediaBrokerPort` (බයිට් ලබා ගැනීම සහ සාම්පල රාමු උපුටා ගැනීම), `VideoAudioTranscriptionPort` (නියැදි සිරස්තල සමඟ ඇමතුම්කරු විසින් ප්‍රකාශ කරන ලද ශ්‍රව්‍ය පිටපතක් ඒකාබද්ධ කිරීම) සහ `VideoDrilldownPort` (පරම්පරාගත අමු-වෙළඳසැලේ හැඩය) ද නිර්වචනය කරයි. නිෂ්පාදන STT සහ රාමු රඳවා ගැනීම `createVideoSttAdapter` සහ `createVideoDrilldownAdapter` හරහා විස්තර කරන වරාය වටා සම්පාදනය කර ඇත; දෙවැන්න හවුල් පාරාන්ධ-හැන්ඩ්ල් ජීවන චක්‍රය භාවිතා කරයි.

පොදු `/v1` ඉල්ලීම් මාර්ගය කිසිවිටෙක උපක්‍රියාවලියක් ආයාත නොකරයි හෝ ආයාචනය නොකරයි. දුරස්ථ වීඩියෝ 50 MiB සීමාවක් යටතේ බාගත කර ඇත; inline base64 වීඩියෝ වල ගතානුගතික 36 MiB විකේතනය කරන ලද එක් වීඩියෝ ආවරණයක් ඇති බැවින් model/messages/framing ලියුම් කවරය 50 MiB හි පොදු JSON ඉල්ලීම් ඇතුළත් වීමේ සීමාව තුළ පැවතිය හැක. වෙන් කිරීමට පෙර පේළිගත දිග සහ විකේතනය කළ ප්‍රමාණයේ ඇස්තමේන්තු පරීක්ෂා කරනු ලැබේ. ආරම්භක දුරස්ථ URL සහ සෑම යළි-යොමුවීමකදීම HTTPS අවශ්‍ය වේ, DNS පින් කිරීම සමඟ පවතින පොදු-පමණක් පිටතට යන ආරක්ෂකය භාවිතා කරයි. බයිට පසුව නියම අභ්‍යන්තර `POST /api/modality-bridge/video/extract` තැරැව්කාර සීමාව ඉක්මවා යයි. එම මාර්ගය `LOCAL_ONLY` සහ `SPAWN_CAPABLE` යන දෙකම වේ, එක් ක්‍රියාවලියකට සත්‍යාපනය කරන ලද, විශ්වාසදායක-ලූප්බැක් ඉල්ලීමක් පමණක් පිළිගන්නා අතර, කිසිවිටෙක URL, ගොනු පද්ධති මාර්ගයක්, ක්‍රියාත්මක කළ හැකි, හෝ තර්ක ලැයිස්තුවක් පිළිගන්නේ නැත. API ශරීර ප්‍රමාණයේ නල මාර්ගය සහ හසුරුවන්නාගේ වර්ධක ශරීර කියවනය ස්වාධීනව 50 MiB තැරැව්කාර ආදාන ආවරණයක් බලාත්මක කරයි. එහි සීමා වූ පෝලිම වරකට එක් නිස්සාරණයක් ධාවනය කරයි, පොරොත්තු රැකියා හතරකට ඉඩ සලසයි, සහ 100 MiB හි පොරොත්තු ආදානය සීමා කරයි.

තැරැව්කරු තුළ, `ffprobe` පුද්ගලික දේශීය ගොනුවක් කියවයි; ස්ථාවර ආකෘතිය අවසර ලැයිස්තුව ධාවන ලැයිස්තුව සහ මැනිෆෙස්ට් ආකෘති බැහැර කරයි. අවසර ලත් MOV-පවුලේ බහාලුම් සඳහා, බාහිර MOV දත්ත යොමු පෙරනිමියෙන් අක්‍රියව පවතින අතර, ස්ථාවර විධානය ඒවාට ඇතුළත් නොවේ. `ffprobe` සහ `ffmpeg` යන දෙකම `file` -only ප්‍රොටෝකෝලය සුදු ලැයිස්තුව, එක් නූල්, ස්ථාවර තර්ක අරා, කවච නොමැති, සහ `PATH` වෙතින් විසඳා ඇති ක්‍රියාත්මක කළ හැකි භාවිතා කරයි. අමුණා ඇති පින්තූර ආවරණ ප්‍රවාහයන් වාදනය කළ හැකි අපේක්ෂකයින් නොවේ. සියලුම වාදනය කළ හැකි ප්‍රවාහයන් සීමාවන් සපුරාලිය යුතු අතර, නිර්ණායක අඩුම-දර්ශක පසුබැසීමට පෙර පැහැදිලි පෙරනිමි ප්‍රවාහයක් වඩාත් කැමති වේ. වීඩියෝ තත්පර 600කට, මානයකට පික්සල 8,192කට සහ මූලාශ්‍ර පික්සල 33,554,432කට සීමා වේ. FFmpeg සාම්පල 1-16 මධ්‍ය ලක්ෂ්‍ය JPEG රාමු, කුඩා ආදාන ඉහළ නැංවීමකින් තොරව දිගු දාරය උපරිම වශයෙන් පික්සල 1,024 දක්වා පරිමාණය කරන අතර කිසි විටෙකත් URL නොලැබේ. නියැදීම පෙරනිමියෙන් `uniform` වේ. විකල්ප `scene_aware` සහ පර්යේෂණාත්මක `segment_aware` ප්‍රතිපත්ති මඟින් දැනටමත් වලංගු කර ඇති දේශීය ප්‍රවාහය හරහා එක් අමතර ස්ථාවර FFmpeg සමත්වීමක් සිදු කරයි, සීමා සහිත `showinfo` දර්ශන කාල මුද්‍රා තෝරන්න, සහ අනාවරක අසමත් වීම, කල් ඉකුත්වීම, වැරදි ප්‍රතිදානය හෝ හිස් අපේක්ෂක කට්ටලයක් මත එකම ඒකාකාර මධ්‍ය ලක්ෂ්‍යයන් වෙත නියත වශයෙන්ම ආපසු වැටේ. ඛණ්ඩ-දැනුවත් මාදිලිය වලංගු දර්ශන කාල පරතරයන්ට සමානුපාතිකව මධ්‍ය ලක්ෂ්‍ය සාම්පල වෙන් කරයි; කොටස-දැනුවත් සාක්ෂි සහ පසුබැසීමේ හැසිරීම පහත විස්තර කෙරේ. සෑම ප්‍රතිපත්තියකම තේරීමෙන් පසු දෘඩ රාමු 16 තොප්පිය යොදනු ලැබේ. දර්ශන-දැනුවත් ඉල්ලීමකට ඇත්තේ එක් රාමු අයවැයක් පමණක් වන විට, එය ක්‍රියාකාරී පූර්ණ-වීඩියෝවේ හෝ නාභිගත කවුළුවේ ඒකාකාර මධ්‍ය ලක්ෂ්‍යය භාවිතා කර `policyEffective: uniform` වාර්තා කරයි : තෝරාගත් තනි දර්ශන රාමුවකට තාවකාලික අන්ත දෙකම සුරැකිය නොහැක. අමතන්නෙකුට විකල්ප වශයෙන් සීමිත නාභිගත කිරීමේ කවුළුවක් සැපයිය හැකිය (`start`/`end` තත්පර); මායිම් මාධ්‍ය කාලසීමාවට තද කර ඇත, ප්‍රතිලෝම හෝ පරිමිත නොවන කවුළු ප්‍රතික්ෂේප කරනු ලැබේ, සහ සියලුම නියැදීම් ප්‍රතිපත්ති සාමාන්‍යකරණය කරන ලද පරතරය තුළ පමණක් සිදු කෙරේ. ප්‍රතිඵලයක් ලෙස ලැබෙන කවුළුව නියැදි පාර-දත්ත තුළ සහ විශ්වාස නොකළ විස්තර උපසර්ගය තුළ ඇතුළත් කර ඇති බැවින් පහළ මාදිලිවලට නාභිගත උද්ධෘතයක් සම්පූර්ණ කාලරේඛාවෙන් වෙන්කර හඳුනාගත හැකිය.

අර්ථකථන සිරස්තල නාභිගත කිරීම යනු වෙනම, පැහැදිලි සැකසුමකි. පෙරනිමි `full` විශ්ලේෂණ මාදිලිය පවතින රාමු විමසුම ආරක්ෂා කරන අතර කිසිවිටක ඉල්ලීම් පෙළ සිරස්තල ආකෘතියට යොමු නොකරයි. `focused` ප්‍රකාරයේදී, පාලම එකම Chat හෝ Responses කන්ටේනරයෙන් නවතම හිස්-නොවන පරිශීලක-කර්තෘ `text`/`input_text` පමණක් කියවයි, එය NFC වෙත සාමාන්‍යකරණය කරයි, පාලන අක්ෂර සහ සුදු අවකාශය බිඳ දමයි, සහ යුනිකෝඩ් කේත ලක්ෂ්‍ය 500කට සීමා කරයි. හිස් ප්‍රතිඵලයක් නැවත නියම `full` ප්‍රේරකයට වැටේ. භාවිත කළ හැකි ඉඟියක් කැප වූ විශ්වාස නොකළ-පරිශීලක-සන්දර්භ කොටසක JSON ලෙස අනුක්‍රමික කර ඇති අතර නිරීක්ෂණය කළ හැකි තොරතුරුවලට පමණක් ප්‍රමුඛත්වය දිය හැකිය; මාධ්‍යයේ දෘශ්‍යමාන හෝ ශ්‍රවණය කළ හැකි උපදෙස් අනුගමනය කිරීමට එරෙහිව වෙන වෙනම අනතුරු ඇඟවීම එයට ප්‍රතික්ෂේප කළ නොහැක. පාඨමය අවධානය කිසිවිටෙක `start`/`end` අනුමාන නොකරයි හෝ තාවකාලික නියැදිය වෙනස් නොකරයි.

#### FU-07 ව්‍යුහාත්මක කොටස සාක්ෂි

`segment_aware` දැනටමත් වලංගු දේශීය වීඩියෝ ප්‍රවාහය හරහා එක් සීමා සහිත පූර්ව විශ්ලේෂණ අවසර පත්‍රයක් භාවිතා කරයි. ස්ථාවර පෙරහන් දාමය පළමුව පික්සල 320ක් පළලින් පරිමාණය කරයි, දර්ශන වෙනස්වීම් සහ ශීත කළ කාල අන්තරයන් හඳුනා ගනී, පසුව බොඳවීම, සාමාන්‍ය ලුමා සහ spatial/temporal තොරතුරු සඳහා තත්පරයට රාමු 1 බැගින් සාම්පල ලබා ගනී. අවසර පත්‍රය ව්‍යුහාත්මක සාම්පල 600කට, FFmpeg/filter නූල් එකකට, එකම `file` -only ප්‍රොටෝකෝලය සහ බහාලුම් අවසර ලැයිස්තුවකට, 1 MiB ක්‍රියාවලි-ප්‍රතිදානයකට බැඳී ඇති අතර, තැරැව්කරුගේ හවුල් abort/deadline. ඇතුළත උපරිම වශයෙන් තත්පර 30ක් එය කිසිවිටක ඉල්ලීමකින් විධානයක්, පෙරහනක්, මාර්ගයක් හෝ URL පිළිගන්නේ නැත.

ව්‍යුහාත්මක අගයන් යනු නියතිවාදී නියැදි සාක්ෂි මිස අර්ථකථන වීඩියෝ අවබෝධය නොවේ. ඔවුන් විෂයයන්, ක්‍රියා, සිරස්තල, කථනය හෝ පරිශීලක අභිප්‍රාය අනුමාන නොකරයි. දර්ශනය සහ කැටි මායිම් කොටස් සාදයි; කැටි ආවරණය, නොපැහැදිලි, නිරාවරණය, අවකාශීය විස්තර සහ තාවකාලික වෙනස්වීම් බලපාන්නේ පවතින රාමු 1-16 අයවැය වෙන් කරන ආකාරය පමණි. සම්පූර්ණ ශීත කළ කොටස එක් රාමුවකට සීමා කර ඇති අතර, ශීත කළ නොවන කොටස් ඉතිරි අයවැය සඳහා තරඟ කරයි. මායිම් රාමු සංඛ්‍යාව ඉක්මවා ගිය විට, ඒකාකාර කාලරාමු ආවරණයක් රඳවා තබා ගන්නා බැවින් වේගවත් මුල් කප්පාදුවලට දිගු පසුපස ඛණ්ඩයක් සැඟවිය නොහැක. අධිශීත මායිමක තත්පර 1 විශ්ලේෂණ විභේදනය තුළ දර්ශන මායිම් එකලස් කර ඇත.

අස්ථානගත වූ පෙරහන්, malformed/empty සාක්ෂි, අනාවරක දෝෂයක් හෝ සීමා වූ පූර්ව විශ්ලේෂණ කල් ඉකුත්වීම නිශ්චිත ඒකාකාර මධ්‍ය ලක්ෂ්‍ය ප්‍රතිපත්තියට විවෘත නොවේ. ඇමතුම් ගබ්සා කිරීම හෝ තැරැව්කාර කාලසීමාව විවෘත නොවේ: එය පියාසර උපක්‍රියාවලිය අවසන් කරයි, පසුව රාමු නිස්සාරණය වළක්වයි, සහ පුද්ගලික තාවකාලික ගස `finally` වලින් ඉවත් කරනු ලැබේ.

`scripts/perf/video-bridge-fu07-eval.ts` විසින් පශ්චාත්-ඩෙඩප් කැප්ෂන්-ඇමතුම් ඉතුරුම්, ඝන-චලන අයවැය වෙන් කිරීම, blur/exposure/SI-TI සාක්ෂි, දිගු වලිගයක් සහිත වේගවත් කැපීම් සහ ක්‍රමානුකූලව මැකී යන ව්‍යාජ ධනාත්මක සඳහා තීරණාත්මක සැබෑ FFmpeg සවිකිරීම් ජනනය කරයි. එය පූර්ව විශ්ලේෂණ බිත්ති කාලය සහ, `/usr/bin/time` ලබා ගත හැකි, ළමා CPU සහ උපරිම RSS වාර්තා කරයි. එහි තත්ත්ව පරීක්ෂාවන් ව්‍යුහාත්මක ඔරකල් පමණි. මෙම පටිවලට බලයලත් අන්ත ලක්ෂ්‍යයක් හෝ ශීත කළ විනිශ්චයක් නොමැති නිසා සැබෑ සිරස්තල-ආකෘති ගුණත්වය `HOLD` ලෙස පවතී. `--caption-cost-per-call-usd` එක් ඇමතුමකට පැහැදිලි ධනාත්මක ඇස්තමේන්තුවක් සපයන්නේ නම් මිස මුදල් ඉතුරුම් `HOLD` ලෙස පවතී. තිර රචනය කිසි විටෙකත් ප්‍රතිඵලයක් නිර්මාණය නොකරයි.

සෑම රාමුවක්ම MiB 4 කටද, සියලු අමු රාමු 23 MiB දක්වාද, අනුක්‍රමික තැරැව්කරු ප්‍රතිචාරය 32 MiB දක්වාද සීමා වේ. පුද්ගලික තාවකාලික නාමාවලියක් `finally` වලින් ඉවත් කරනු ලැබේ. OmniRoute FFmpeg බණ්ඩල් නොකරන අතර අභිරුචි ක්‍රියාත්මක කළ හැකි මාර්ගයක් පිළිගන්නේ නැත. සිරස්තල දැමීමට පෙර, පාලම ගතානුගතික දෘශ්‍ය අඩුකිරීමේ අවසර පත්‍රයක් යොදයි: සෑම JPEG ක්ම 16 × 16 අළු පරිමාණ බෆරයක් දක්වා අඩු කර ඇති අතර එය රඳවා තබා ඇති අවසාන රාමුව සමඟ පමණක් සංසන්දනය කෙරේ. එක් රාමුවකට ඉහලින් ඉල්ලන ලද සිරස්තල අයවැයක් සඳහා, නිස්සාරණය අයවැයෙන් දෙගුණයක් දක්වා සීමා වූ අපේක්ෂක සංචිතයක් සපයන අතර රාමු 16කට වඩා වැඩි නොවේ. ඉල්ලුම් කරන ලද තොප්පිය යොදනු ලබන්නේ අඩුකිරීමෙන් පසුව පමණි, අයවැය අවම වශයෙන් දෙකක් වන විට අවසාන තුනී කිරීමේදී පළමු සහ අවසාන තෝරාගත් අපේක්ෂකයන් සංරක්ෂණය කෙරේ. අනුවාදිත `grayscale-16x16-mean-cells-v2` ප්‍රතිපත්තිය සාමාන්‍ය ලුමා ඩෙල්ටාවේ විශාල ප්‍රමාණය සහ සාමාන්‍යකරණය කළ ඩෙල්ටාව අවම වශයෙන් 0.05ක් වන සිඟිති රූ සෛලවල අනුපාතය භාවිතා කරයි. අනුපිටපත් එළිපත්ත යනු නියත 0.04, ධාවන කාල සැකසුම ලෙස නිරාවරණය වීමට වඩා අනාවැකි සඳහා තෝරාගෙන ඇත. මෙම ද්විතියික අධි-විපරීත සංඥාව කුඩා චලිතය සහ මධ්‍යස්ථ-පමණක් සැසඳීමකින් සැඟවිය හැකි දෘශ්‍ය-පෙළ වෙනස්කම් ආරක්ෂා කරයි. සංසන්දක හෝ විකේතක දෝෂ විවෘතව තබා ගැනීමට අසමත් වේ. ප්‍රතිදාන පාර-දත්ත උපුටා ගත් අපේක්ෂකයින්, සාර්ථකව භාවිතා කළ රාමු සහ දෘශ්‍ය අනුපිටපත් පහත හෙළයි.

පැහැදිලිව සලකුණු කරන ලද වීඩියෝ කොටසක් වේලා මුද්‍රා තැබූ සම්බන්ධතා පත්‍රයක් ඉල්ලා සිටිය හැක. පාලම උපරිම වශයෙන් 4-තීරු, 16-රාමු JPEG ජාලයක් ගොඩනඟයි. සෑම පික්සල් 512 සෛලයක්ම එහි ප්‍රභව වේලා මුද්‍රාව ඉහළ ප්‍රතිවිරෝධතා පහළ කලාපයකට පුළුස්සා දමන අතර, එම වේලා මුද්‍රා පහළ ප්‍රවාහ ආශ්‍රය සහ විගණනය සඳහා පාඨමය පාර-දත්ත තුළ පවතී. සම්පූර්ණ JPEG සීමාව 32 MiB ලෙස පවතී. `sharp` හට ජාලකය විකේතනය කිරීමට හෝ රචනා කිරීමට නොහැකි නම්, පාලම නැවත එක් එක් JPEG රාමු වෙත වැටේ; සේවාලාභී ගබ්සාව තවමත් පත්‍ර ක්‍රියාකාරිත්වය හරහා ප්‍රචාරණය කරයි.

ප්‍රවර්ධන සාක්ෂි කෘත්‍රිම සංයුතිය ක්ෂුද්‍ර තලයෙන් හිතාමතාම වෙන් කර ඇත. `scripts/perf/video-bridge-contact-sheet-eval.ts` නියම OpenAI-අනුකූල දර්ශන ආකෘති සඳහා schema-versioned A/B පටි නිර්වචනය කරයි. එය සපයන්නා-වාර්තා කරන ලද ටෝකන, අන්තයේ සිට අවසානය දක්වා බිත්ති ප්‍රමාදය (පත්‍ර සංයුතිය ඇතුළුව), ආදර්ශ-ඇමතුම් ගණන සහ ප්‍රකාශිත-නිර්වචනය කළ කරුණු රඳවා තබා ගැනීම මැන බලයි. අමු ආදර්ශ ප්‍රතිචාර වාර්තාවට ලියා නැත; SHA-256 digests සහ ගැලපෙන fact IDs පමණක් රඳවා ඇත. `--execute-real` සම්මත කර `--model`, `OMNIROUTE_BASE_URL`, සහ `OMNIROUTE_API_KEY` වින්‍යාස කර ඇත්නම් මිස පටි ජාලයක් හෝ ගෙවූ මාදිලි ඇමතුමක් සිදු නොකරයි. එම පැහැදිලි සැබෑ ධාවනය නොමැතිව, එහි යන්ත්‍රයෙන් කියවිය හැකි තීන්දුව `HOLD` පවතී; කෘතිම payload/call-count මිනුම් පමණක් ප්‍රවර්ධන සාක්ෂි නොවේ.

ඇමතුම්කරුවන්ට දැනටමත් පෙළගැස්වූ පෙළ ඇති විට සහාය දක්වන වීඩියෝ කොටසකට විකල්ප `transcript.cues` අරාවක් ඇමිණිය හැක. සෑම ඉඟියක්ම `text`, පරිමිත කාල සීමාව තුළ සීමිත `start`/`end` පරතරයක් සහ සුදු ලැයිස්තුගත කළ `source` (`client`, `embedded`, හෝ `audio-bridge`) රැගෙන යා යුතුය ; `confidence` `1` වෙත පෙරනිමි වන අතර `0` සහ `1` අතර පැවතිය යුතුය. නිශ්චිත අනුපිටපත් ඉඟි හකුළයි. OmniRoute කිසිවිටෙක මෙම පාර-දත්තෙන් පිටපත් කිරීම ආරම්භ නොකරයි: වලංගු කරන ලද ඉඟි විස්තර කරන ලද ප්‍රතිඵලයට මූලාශ්‍රය, විශ්වාසය සහ අන්තරය සමඟ පිටපත් කර රාමු සිරස්තල සමඟ විශ්වාස නොකළ නිරීක්ෂණ ලෙස ලබා දේ. සිරස්තල ප්‍රවාහයට මිශ්‍ර කරනවාට වඩා වලංගු නොවන, පරාසයෙන් පිටත, හෝ ප්‍රභව රහිත පෙළ ප්‍රතික්ෂේප කෙරේ. ඉල්ලීම්-ශරීර පිටපත් නාලිකා දෙකම ස්වයං-උත්සාහගත `embedded` හෝ `audio-bridge` ලේබල ඇතුළුව, `client` වෙත සපයන ලද ප්‍රභවය සාමාන්‍යකරණය කරයි. කේත-පමණක් `trustedSource` තර්කය හරහා එම විශ්වාසනීය ලේබල පැවරිය හැක්කේ සේවාදායකය සතු ඇඩැප්ටරයකට පමණි; ඉල්ලීමක් JSON ක්ෂේත්‍රයට එම තර්කයට ළඟා විය නොහැක. පිටපත් පෙළ එහි ප්‍රභවය කුමක් වුවත්, විශ්වාස නොකළ මාධ්‍ය-ව්‍යුත්පන්න අන්තර්ගතය ලෙස පවතින අතර, කිසිවිටක අවසරය තීරණය නොකළ යුතුය.

උසස් ඇමතුම්කරුවෙකු එම වීඩියෝව සඳහා `audioTranscript` ධාවන පථයක් සැපයිය හැකිය; එය සේවාදායකයා විසින් සපයන ලද පෙළ ලෙස සලකනු ලැබේ, සේවාදායක පිටපත් කිරීමේ සාක්ෂියක් නොවේ. විලයන මැහුම් එක් කාල සීමාවක් යටතේ දෘශ්‍ය සහ ශ්‍රව්‍ය නිරීක්ෂණ ධාවනය කර සංඥාව ගබ්සා කරයි, ඒවා පොදු කාලරාමුවක් මත ඇණවුම් කරයි, නිශ්චිත අනුපිටපත් කඩා දමයි, සහ එක් පැත්තක් පමණක් සාර්ථක වූ විට අර්ධ ප්‍රතිඵලයක් වාර්තා කරයි. වලංගු නොවන `audioTranscript` එම අර්ධ ප්‍රතිඵලය — ට පිරිහෙන අතර දෘශ්‍ය විස්තරය තබා ඇති අතර ශ්‍රව්‍ය ශාඛාව සම්පූර්ණ වීඩියෝවම අසාර්ථක වීම වෙනුවට — සනීපාරක්ෂක අසාර්ථක කේතයක් වාර්තා කරයි. එක් ශාඛාවකට ලබා ගත හැකි බව, අර්ධ ධජය සහ සනීපාරක්‍ෂක අසාර්ථක කේත විස්තර කරන ලද ප්‍රතිඵලය තුළ, ගාර්ඩ්‍රේල් පාරදත්ත (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), ප්‍රතිඵල-හැඹිලි පාරදත්ත තුළ සහ පාලම් විලයන කවුන්ටරවල සංරක්ෂණය කර ඇත. පෙරනිමි වීඩියෝ පාලම් මාර්ගය කථනයෙන් පෙළට ආරාධනා කිරීම හෝ දෙවන මාධ්‍ය පිටපතක් බාගත නොකරයි; එම පැහැදිලි ධාවන පථයකින් තොරව, එය වීඩියෝ-පමණක් පවතී.

**පිටපත් රඳවා තබා ගැනීම (#12150 P1).** වීඩියෝ පාලම (තමන් විසින්ම තෝරා ගැනීම) — පිටපතක් ලබා දෙන විට වෙනම රඳවා ගැනීමේ ධජයක් නොමැති විට මෙය ස්වයංක්‍රීයව අදාළ වේ. ඉල්ලීමක් කිසියම් පිටපතක් ඉඟියක් (ඇමතුම්කරු විසින් ප්‍රකාශ කරන ලද `transcript` හෝ ෆියුස් කළ `audioTranscript`) ලබා දෙන විට, ආරක්ෂක වැට එය `videoBridgeObserved` ලෙස සලකුණු කර, වීඩියෝ විස්තරයේ — හි නැවත සකස් කරන ලද සෙවනැල්ලක් නිපදවයි, එහි සෑම ඉඟියකම නිදහස්-පෙළ ශරීරයක් `[redacted-video-transcript]` ක්ෂේත්‍රය මඟින් ප්‍රතිස්ථාපනය කරනු ලැබේ. එකලස් කරන ලදී (කිසිවිටෙක සමතලා කළ පෙළ විග්‍රහ කිරීමෙන් නොවේ, එබැවින් `[inaudible]`/`[music]` — වැනි `]` අඩංගු ශරීර ඇතුළුව — විරුද්ධවාදී හෝ සාමාන්‍ය ඉඟි අන්තර්ගතයක් නොනැසී පැවතිය නොහැක). දිගටම පවතින ඇමතුම්-ලොග් ඉල්ලීම් අන්තර්ගතය අන්තර්ගත සමානාත්මතාවයෙන් ගැළපෙන, නැවත සකස් කරන ලද සෙවනැල්ල සඳහා එක් එක් වීඩියෝ-ව්‍යුත්පන්න පෙළ කොටසක් මාරු කරයි; `fullText` නැංගුරම නිමි පෙර-ඇමතුම් ගාඩ්රේල් පේලෝඩ් එකෙන් නැවත කියවා ඇත, එබැවින් පසුව දාම ආරක්ෂක වැටවල් ( PII සහ අක්තපත්‍ර ආවරණ, ප්‍රමුඛතා 10/95) විස්තර පෙළ නැවත ලිවීමෙන් පසුව සහ system-prompt/handoff/memory එන්නත් කිරීමෙන් පසු පණිවිඩ අරාව නැවත සකස් කිරීමෙන් පසුව තරගය තවමත් සාර්ථක වේ. ආකෘතියට උඩුගං බලා යවන ලද ශරීරය නොවෙනස්ව පවතී. නිරීක්ෂණය කරන ලද ඉල්ලීමක් කල් පවතින මතකයක් ද ජනනය නොකරයි (ඉල්ලීම- සහ ප්‍රතිචාර-ව්‍යුත්පන්න නිස්සාරණය යන දෙකම මඟ හරිනු ලැබේ), එබැවින් ආකෘතියේ පිළිතුරට පිටපත් පෙළ මතකයට ප්‍රතිරාවය කළ නොහැක.

**අමු වීඩියෝ ක්ෂේත්‍ර (#12430).** පාලම සක්‍රීය කර ඇති විට සහ ස්වදේශීය වීඩියෝ සහාය නොදන්නා විට හෝ නොමැති විට, විස්තරය අසාර්ථක වීමෙන් හෝ `maxVideos` සීමාවකින් පසුව පවා, අර්ථ දක්වා ඇති `transcript`/`audioTranscript` ක්ෂේත්‍ර `videoBridgeObserved` සක්‍රිය කරයි. `null` සහ හිස් නූල් ගණන්; නොමැති ක්ෂේත්‍ර සහ වීඩියෝ නොවන පාරදත්ත එසේ නොවේ. රඳවා ගත් පිටපත් මෙම ක්ෂේත්‍ර නැවත සකස් කිරීම හෝ ඉල්ලීම මඟහරියි, සහ caches/Memory මඟ හැරේ.

එම පසුබැසීමේ මාර්ගවල, වලංගු ඇමතුම් ඉඟි සම්මත නොවන සැපයුම් ක්ෂේත්‍රවලට වඩා සහාය දක්වන `text`/`input_text` කොටස් බවට පත්වේ. ඉල්ලීම්-සැපයූ පීලි දෙකම විශ්වාස නොකළ `client` නිරීක්ෂණ ලෙස පවතී, වීඩියෝව විස්තර කර නොමැති බවට සහ වේලා මුද්දර මාධ්‍යයට එරෙහිව සත්‍යාපනය කර නොමැති බවට පැහැදිලි අනතුරු ඇඟවීමක් ඇත. පවතින 256-cue/64-KiB මුළු සහ එක්-කියු අයවැය එක්ව ධාවන පථ දෙක හරහා අදාළ වේ; වේලා මුද්දර තැරැව්කරුගේ තත්පර 600 සිවිලිමට සහ සපයන ලද ඕනෑම නාභිගත කවුළුවකට ගැලපේ. අවලංගු පීලි ඉවත දමනු ලැබේ, අත්තනෝමතික පෙළ ලෙස යොමු නොකෙරේ; ඔවුන්ගේ ඒකාබද්ධ අයවැය ඉක්මවා ඇත්නම් මිස වලංගු සහෝදරයෙකු තවමත් භාවිතා කළ හැක. Null/empty ක්ෂේත්‍ර කිසිදු පෙළක් එක් නොකරයි. මෙම පසුබැසීම මගින් මාධ්‍ය ලබා ගැනීමක් හෝ පිටපත් කිරීමක් එක් නොකෙරේ. පිටපත් විස්තාරණ ක්ෂේත්‍ර ෆෝල්බැක් වීඩියෝ වාහකයෙන් සහ එහි `video_url`/`source` වස්තුවලින් ඉවත් කෙරේ. OpenAI වයර් අවසර ලැයිස්තුව දැඩිව පවතී; නොදන්නා-ස්වදේශීය වීඩියෝ වාහකයන් පවතින අතර දන්නා පෙළ-පමණක් ඉලක්ක ආරක්ෂිත සලකුණු තබා ගනී. ව්‍යුහගත ප්‍රතිනිර්මාණ සෙවනැලි අමුණා ඇති පිටපත් පෙළ ආරක්ෂා කරන අතර මුල් ඇමතුම්කරු සතු ඉල්ලීම නොවෙනස්ව පවතී. ස්වදේශික ආධාරක ඉලක්ක සහ ආබාධිත පාලම් ඔවුන්ගේ පවතින බයිපාස් හැසිරීම රඳවා තබා ගනී.

අමතර රඳවා ගත් පිටපත් එකම නිරීක්ෂිත ඉල්ලීම් සංඥාව භාවිතා කරයි. raw pre-guardrail client-request snapshot, in-memory pending request, සහ ඉක්මනින් ප්‍රතික්ෂේප කරන ලද-ඉල්ලීම් ලොගය වීඩියෝ කොටස්වල පිටපත් ක්ෂේත්‍ර ව්‍යුහාත්මකව ප්‍රතිස්ථාපනය කරයි; නල මාර්ග අවධීන් සහ සන්දර්භය භාර දීම මගින් සංස්ලේෂණය කරන ලද තන්තු විමසුම් දිගටම පවතින-ඉල්ලීම-බොඩි සින්ක්හිදී නැවත සකස් කරනු ලැබේ. දිගටම පවතින `video_content_removed` සලකුණ හිතාමතාම ඉවත දැමූ පෙළ ප්‍රතිනිර්මාණය කරනවා වෙනුවට `previous_response_id` අඛණ්ඩව අසාර්ථක කරයි. නිරීක්ෂණය කරන ලද ඉල්ලීමක් ලොග් වීමට පෙර එහි එක් කොටසකට නැවත සකස් කිරීමේ සෙවනැල්ල නැති වුවහොත් හෝ පසුව ඉල්ලීම් විකෘති කිරීමෙන් පසුව වීඩියෝ සෙවනැලි කිහිපයකින් එකක්වත් ගැළපීමට අපොහොසත් වුවහොත්, අර්ධ වශයෙන් ප්‍රතිනිර්මාණය කරන ලද පිටපතක් රඳවා තබා ගැනීම වෙනුවට රඳවා ගත් ඉල්ලීම් අන්තර්ගතය සම්පූර්ණයෙන්ම ඉවත් කරනු ලැබේ.

නිරීක්ෂිත ඉල්ලීමක් සඳහා, ආකෘති ප්‍රතිචාරයක් ව්‍යුහගත ඉඟි සීමාවකින් තොරව පිටපතේ ඕනෑම කොටසක් උපුටා දැක්විය හැක. එහි ස්ථීර ඇමතුම්-ලොග් `responseBody` එම නිසා අතපසු කිරීමේ සලකුණකින් ප්‍රතිස්ථාපනය වේ; සවිස්තරාත්මක නල මාර්ග කෞතුක වස්තුව ( upstream/client ශරීර සහ ප්‍රවාහ කුට්ටි ඇතුළත් විය හැක) රඳවා නොමැත. Semantic, idempotency, සහ reasoning-replay caches bypass the reads and writes for that request. සපයන්නාගේ ඉල්ලීම සහ සේවාලාභියාට පෙනෙන ප්‍රතිචාරය නොවෙනස්ව පවතී. සවිස්තරාත්මක කෞතුක වස්තු ඉවත් කළ විට තාවකාලික බෆරයෙන් මුල් තබා ගැනීමේ බයිට් ඉවත් වේ. Kiro's malformed EventStream අනතුරු ඇඟවීම වාර්තා කරන්නේ ගෙවීම් බයිට් ගණන පමණක් වන අතර, කිසිවිටෙක එහි අන්තර්ගතය හෝ JSON විග්‍රහයේ අමු දෝෂය නොවේ. මෙය අසම්බන්ධිත සෑම provider/plugin රෝග විනිශ්චයක්ම විගණනය කර ඇති බව නොකියයි; පුළුල් රඳවාගත්-සින්ක් ස්වීප් #11658 හි නිරීක්ෂණය කෙරේ.

අභ්‍යන්තර `/api/modality-bridge/video/drilldown` ජීවන චක්‍රය වෙනම, loopback/token-authenticated හැඹිලි උපස්ථරයකි. සෑම මෙහෙයුමකටම කැනොනිකල් පාරාන්ධ ප්‍රධාන ID අවශ්‍ය වේ. නිෂ්පාදන ඇමතුම්කරුවෙකු සක්‍රීය කිරීමට පෙර, එය සත්‍යාපනය කළ කුලී නිවැසියාගෙන් එම ID ව්‍යුත්පන්න කළ යුතු අතර සේවාදායකයා-තෝරාගත් අගයක් කිසිවිටෙක යොමු නොකළ යුතුය. හැඹිලි යතුරු එම ප්‍රධානය කැනොනිකල් සැසියට සහ වීඩියෝ-යොමු IDs වෙත බන්ධනය කරයි, ඒවායේ SHA-256-derived යතුරු පමණක් ගබඩා කරයි, සහ එකම ප්‍රින්සිපල් වෙත කියවීම් සහ මකා දැමීම යන දෙකම විෂය පථය කරයි. හැඹිලිය එක් ප්‍රවේශයකට ව්‍යුත්පන්න JPEG රාමු 16ක් ගබඩා කරයි, මිනිත්තු දහයකට පසු ඒවා කල් ඉකුත් වේ, සහ සීමා කළ `start`/`end` කියවීම් හෝ පැහැදිලි සැසි මකාදැමීම සඳහා සහය දක්වයි.

එක් එක් විදුහල්පති ඇතුළත් කිරීම් 16 කට සහ කැනොනිකල් JPEG දත්ත 64 MiB වලට සීමා වේ. එම සීමාවන් ගෝලීය 64-entry/256 MiB සීමාවෙන් ස්වාධීන වේ: ප්‍රධාන කෝටා පීඩනය ඉවත් කරන්නේ ගෝලීය LRU නෙරපා හැරීමට පෙර විදුහල්පතිගේ අවම වශයෙන්-මෑතකදී භාවිතා කළ ඇතුළත් කිරීම් සලකා බැලීම පමණි. කල් ඉකුත් වූ ඇතුළත් කිරීම් හැඹිලි ක්‍රියාකාරකම් මත ප්‍රධාන සහ ගෝලීය ගිණුම්කරණයෙන් අතුගා දමනු ලබන අතර, අවලංගු කිරීම සහ වලංගු කිරීමේ අසාර්ථකත්වය අර්ධ ප්‍රතිස්ථාපනයක් සිදු නොකරයි.

හැඹිලිය කැනොනිකල් නොවන Base64, අතිරික්ත පිරවුම්, JPEG නොවන මාධ්‍ය, විකෘති වූ හෝ කපා හරින ලද JPEGs, සහ සීමා කරන ලද පූර්ණ-පින්තූර `sharp` විකේතනයකදී අනතුරු ඇඟවීමක් නිකුත් කරන JPEGs ප්‍රතික්ෂේප කරයි. එය පිළිගත් සෑම රූපයක්ම කැනොනිකල් JPEG ලෙස නැවත-කේතනය කරයි, ඇමතුම් ක්ෂේත්‍ර විශ්වාස කරනවා වෙනුවට විකේතනය කරන ලද බයිට් වලින් පළල සහ උස ලබා ගනී, සහ ඒවා රඳවා තබා ගැනීමට වඩා පසුපසින් ඇති බහුභාෂා බයිට් ඉවත දමයි. සීමා සහිත කැනොනිකල් සම්පීඩිත බෆරය පමණක් කෝටා දෙකටම අය කෙරේ. JSON වයර් සීමාවට 32 MiB විකේතනය කරන ලද ආදාන සිවිලිම සඳහා Base64 උඩින් ඇතුළත් වේ. සෑම ගබඩා කළ ව්‍යුත්පන්නයක්ම එහි වලංගු JPEG format/resolution, නියැදි ප්‍රතිපත්තිය, ව්‍යුත්පන්න අනුවාදය, නිර්මාණ කාලය, සේවාදායක-පරිගණක අන්තර්ගත හැෂ්, සහ හැෂ් මාපිය යොමු සහ විශ්වාසවන්ත ඇමතුම්කරුගේ මාපිය-අන්තර්ගත හෑෂ් වාර්තා කරයි. පරමාණුක හැඹිලි කැපවීමට පෙර අසමමුහුර්ත decode/hash අදියර අතර අවලංගු කිරීම පරීක්ෂා කෙරේ.

නිෂ්පාදන නිෂ්පාදකයා විසින් දැනටමත් ව්‍යුත්පන්න කර ඇති තැරැව්කාර රාමු නැවත භාවිතා කරන්නේ සාර්ථක දෘශ්‍ය විශ්ලේෂණයකින් පසුව පමණි, දෙවන වීඩියෝ download/extraction. එයට ක්‍රියාකරු `modalityBridgeVideoDrilldownEnabled=true`, දැඩි එක්-කොටස `drilldown: true`, සහ සත්‍යාපිත API-key වාර්තා ID අවශ්‍ය වේ. සේවාලාභියා විසින් ප්‍රකාශ කරන ලද principal/session අගයන් කිසිවිටෙක හිමිකාරිත්වය ස්ථාපිත නොකරයි. කොන්දේසි තුනම නොමැතිව එය අතිරේක රාමු හැෂ් කිරීම, ප්‍රමාණය වෙනස් කිරීම හෝ රඳවා නොගනී. රඳවා තබා ගැනීමේ අසාර්ථකත්වය භාවිතා කළ හැකි දෘශ්‍ය ප්‍රතිචාරය ආරක්ෂා කරයි. එකඟ වූ ඉල්ලීම් සම්පූර්ණ-වීඩියෝ ප්‍රතිඵල හැඹිලිය මඟ හරින බැවින් හැඹිලිගත ප්‍රතිඵල කිසිවිටෙක නැවත ධාවනය නොවේ.

සාර්ථක JSON සහ SSE ප්‍රතිචාර මායිම් කරන ලද `x-omniroute-video-drilldown` ශීර්ෂයේ ඇති පාරාන්ධ හසුරු හතරක් නිරාවරණය කරයි. CORS මූලාරම්භ ප්‍රතිපත්තිය පුළුල් නොකර බලයලත් බ්‍රවුසර මූලාරම්භයන්ට එම ශීර්ෂකය කියවිය හැක. නව හැන්ඩ්ල් `v1.<32-byte random base64url token>` භාවිතා කරයි, සහ රෙජිස්ට්‍රිය ඔවුන්ගේ SHA-256 හැෂ් පමණක් රඳවා ගනී. reader/header විග්‍රහකය ද උරුම 64-හෙක්ස් ටෝකන පිළිගනී. සත්‍යාපිත පොදු පාරිභෝගිකයා `GET /api/v1/video-bridge/drilldown?handle=...` වේ, ස්වාධීනව `modalityBridgeVideoDrilldownRemoteEnabled=true` විසින් දොරටු වේ. ලෙගසි `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env Fallback සක්‍රීය කර ඇති විට පවා පැහැදිලි දිගටම පවතින අසත්‍ය ප්‍රවේශය අවලංගු කරයි. නිෂ්පාදන රඳවා ගැනීමට සමාන උරුමය `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` පසුබෑමක් ඇත. වැටීම් දෙකම පෙරනිමියෙන් ක්‍රියාවිරහිතයි.

පාරිභෝගිකයා සත්‍යාපනය කළ යතුරෙන් හිමිකාරිත්වය ලබා ගන්නා අතර ප්‍රධාන ප්‍රතිපත්තිය අදාළ කරයි: GET සහ DELETE යන දෙකම `/v1` සහ `/api/v1` අන්වර්ථ ඇතුළුව `video` අන්ත ලක්ෂ්‍ය කාණ්ඩයට අයත් වේ. හිස් නොවන අන්ත ලක්ෂ්‍ය අවසර ලැයිස්තුවක් සහිත යතුරුවල `video` ඇතුළත් විය යුතුය; සීමා නොකළ යතුරු අනුකූලව පවතී. පාරිභෝගිකයා නොදන්නා, කල් ඉකුත් වූ සහ වෙනත් යතුරක හැසිරවීම් සඳහා එම 404 ආපසු ලබා දෙයි. එය `variant=preview|standard|detail` (උපරිම JPEG මානය 320/640/1280, කිසි විටෙක ඉහළට නොයනු ඇත), `limit=1..8` (හෝ ලෙගසි `frames` අන්වර්ථය, කිසි විටෙකත් දෙකම නොවේ), ශුන්‍ය පදනම් වූ `page`, සහ විකල්ප `start`/`end` නාභිගත තත්පර පිළිගනී. අනුපිටපත් විමසුම් යතුරු සහ ප්‍රතිලෝම නාභිගත කවුළු ප්‍රතික්ෂේප වේ. සෑම ආපසු ප්‍රභේදයකටම එහි සත්‍ය අන්තර්ගතයේ හෑෂ් සහ සත්‍ය විභේදන පාර-දත්ත, රඳවා ගත් ප්‍රභවයට සම්බන්ධ කර ඇත. අමතර රඳවා ගත් පිටපත් ලෙස ගබඩා කරනවාට වඩා කියවීමේදී ප්‍රභේද ව්‍යුත්පන්න වේ. Base64/envelope ඇතුළුව JSON ප්‍රතිචාරය 32 MiB ට සීමා කර ඇත; විශාල පිටුවක් 413 ලබා දෙන අතර සේවාදායකයා අඩු රාමු ඉල්ලා සිටිය යුතුය. ආපසු පැමිණීමට පෙර එක් එක් ප්‍රමාණය වෙනස් කිරීම සහ හසුරුවල වලංගුභාවය නැවත පරීක්ෂා කිරීම වටා චෙක්පත් අවලංගු කිරීම කියවා බලයි. හිමිකරු විසින් `DELETE` idempotent වේ; මකාදැමීම හෝ TTL කල් ඉකුත්වීම රඳවාගත් මූලාශ්‍රය සහ භාවිත ගිණුම්කරණය මුදාහරියි.

හවුල් ගබඩාව ක්‍රියාවලි-දේශීය වේ: හැන්ඩ්ල් නැවත ආරම්භයේදී කල් ඉකුත් වන අතර ස්වාධීන OmniRoute ක්‍රියාවලි අතර මාරු කළ නොහැක. කළමනාකරණ සංඛ්‍යාලේඛන මගින් ඵලදායි රඳවාගැනීම්/දුරස්ථ ප්‍රතිපත්තියක් හෙළිදරව් කරන අතර සමස්ථ රඳවාගත් entries/bytes පමණක්, කිසිවිටෙක මාධ්‍ය, යොමු කිරීම්, ප්‍රධාන IDs හෝ හැසිරවීම් නොවේ. වීඩියෝ සිටුවම් පැනලය එම අගයන් පෙන්වන අතර කැමැත්ත ස්විච දෙකම පැවතිය හැක. මෙම ක්‍රියාත්මක කිරීමේ ලියකියවිලි සජීවී යෙදවීම හෝ ප්‍රවර්ධන සාක්ෂි නොවේ; සැබෑ මාදිලියේ පිළිගැනීම වෙන වෙනම නිරීක්ෂණය කරනු ලැබේ.

වින්‍යාස කළ වීඩියෝ ආකෘතිය සමඟ රාමු අනුක්‍රමිකව සිරස්තල කර ඇත. හිස් වීඩියෝ අභිබවා යාමක් විෂන් සැකසුම උරුම කරයි; දෙකම හිස් නම්, Vision ස්වයංක්‍රීය රවුටරය ඵලදායි දර්ශන හැකියාව ඇති ආකෘතිය තෝරා ගනී. සාර්ථක සිරස්තල මුල් කොටස ස්ථායී `[Video description:` උපසර්ගයක් සමඟ ප්‍රතිස්ථාපනය කරන අතර එය පාඨය විශ්වාස නොකළ මාධ්‍ය ව්‍යුත්පන්න නිරීක්‍ෂණයක් ලෙස සලකුණු කරන අතර මාධ්‍යයේ ඇති උපදෙස් අනුගමනය නොකරන ලෙස පහළ මාදිලිවලට කියයි. Frame-caption cache keys JPEG bytes, prompt, timestamp, and effective model; සාර්ථක සිරස්තල පමණක් හැඹිලිගත කර ඇත. හැඹිලි ඇතුළත් කිරීම් ෆෝල්බැක් ආකෘතියක් ඇතුළුව සැබෑ සාර්ථක නිෂ්පාදක මාදිලිය රඳවා තබා ගනී; විවිධ මාදිලි මගින් විවිධ රාමු නිපදවන විට පාලම `mixed` වාර්තා කරයි. හැඹිලි පහරක් එම නිෂ්පාදක අනන්‍යතාවය ඉල්ලා සිටින මාර්ගගත කිරීමේ සැලැස්ම ලෙස නැවත ලේබල් කිරීම වෙනුවට නැවත භාවිත කරයි. ප්‍රතිදාන — ප්‍රොම්ප්ට්, ඵලදායි ආකෘතිය, නියැදි ප්‍රතිපත්තිය, රාමු ගණන, අර්ථ විශ්ලේෂණ මාදිලිය, සාමාන්‍යකරණය වූ නාභිගත ඉඟියේ SHA-256 ඇඟිලි සලකුණ, නාභිගත කවුළුව, `transcript`, `audioTranscript`, සහ සම්බන්ධතා පත්‍ර ධජය — වෙනස් කරන සෑම ආදානයකටම සම්පූර්ණ-වීඩියෝ ප්‍රතිඵල හැඹිලිය යතුරු කර ඇත. දෘශ්‍ය ප්‍රතිපත්ති අනුවාදය, එළිපත්ත සහ සීමා වූ අපේක්ෂක රාමු ගණන ප්‍රතිඵල-හැඹිලි යතුර සහ පාර-දත්ත තුළ ද පැහැදිලි වේ; ප්‍රතිපත්තිමය වෙනසක් නිසා පරණ වූ සම්පූර්ණ වීඩියෝ විස්තරයක් නැවත භාවිත කළ නොහැක. ප්‍රතිඵල-හැඹිලි v4 පාර-දත්ත මාදිලිය සහ ඇඟිලි සලකුණ තබා ගනී, කිසි විටෙකත් අමු පරිශීලක කාර්යය නොවේ. Guardrail පාරදත්ත ඉල්ලන ලද සහ ඵලදායී විශ්ලේෂණ ක්‍රම දෙකම වාර්තා කරයි; භාවිතා කළ හැකි පරිශීලක පාඨයක් නොමැතිව ඉල්ලා සිටින `focused` මාදිලිය ඵලදායී ලෙස `full` ලෙස වාර්තා වේ.

Guardrail මඟින් සහය දක්වන සෑම වීඩියෝ කොටසක්ම උපුටා ගන්නා නමුත් `modalityBridgeVideoMaxVideos` ට වඩා විස්තර නොකරයි. `supportsVideo === false` ඇති බවට ඔප්පු කර ඇති ඉලක්කයක් සඳහා, අසාර්ථක වූ සහ සීමාව ඉක්මවා ඇති වීඩියෝ පැහැදිලි ආරක්ෂිත පෙළ සලකුණු බවට පත් වන නිසා කිසිදු අමු වීඩියෝවක් නොනැසී පවතී. හැකියාව නොදන්නා විට, එම කොටස් ඔවුන්ගේ වීඩියෝ වාහකය රඳවා තබා ගනී; ඕනෑම පසුබැසීමේ පිටපතක් ඉහත සීමා කළ පෙළ පරිවර්තනය අනුගමනය කරයි. `supportsVideo === true` සමඟ ඉලක්ක පාලම මඟ හරියි. සේවාලාභියාගේ ඉල්ලීම අත්හිටුවීමේ සංඥාව බාගත කිරීම, තැරැව්කාර පෝලිම, උපක්‍රියාවලි සහ සිරස්තල ඇමතුම් හරහා ප්‍රචාරණය කරයි; ගබ්සා කිරීම් වීඩියෝ අතර නතර වන අතර කිසි විටෙක අමු මාධ්‍යයට විවෘත නොවේ.

ධාවන කාල සැකසීම් DB-ආපසු සහ Zod වලංගු වේ:

| යතුර                                | පෙරනිමිය    | පරාසය / හැසිරීම                                                                                          |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | විකල්ප ධාවන කාලය, තේරීම                                                                                  |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` සාමාන්‍ය සිරස්තල ආරක්ෂා කරයි; `focused` සීමා සහිත, විශ්වාස නොකළ නවතම පරිශීලක සන්දර්භය භාවිතා කරයි |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge ආකෘතිය උරුම කර ගන්න                                                                        |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                     |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, හෝ සමානුපාතික `segment_aware`; අනාවරක අසමත් වීම නැවත `uniform` වෙත වැටේ        |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                      |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000-120000 ms                                                                                           |

Legacy persisted තත්පර 120 ට වැඩි වීඩියෝ කල් ඉකුත්වීමේ අගයන් තැරැව්කාර කාලසීමාවට තද කර ඇත; එම සීමාවට ඉහලින් ලියන නව සැකසුම් ප්‍රතික්ෂේප වේ. `GET /api/modality-bridge/video/runtime` සත්‍යාපනයට හෝ ධාවන කාල පරීක්‍ෂණයට පෙර විශ්වාසනීය මුද්දර සහිත loopback ප්‍රදේශය අවශ්‍ය වේ, පසුව කළමනාකරණ සත්‍යාපනය අවශ්‍ය වේ. එය ආපසු ලබා දෙන්නේ `available`, සනීපාරක්ෂක කළ FFmpeg/ffprobe අනුවාද සහ ධාවන කාලය නොමැති විට ස්ථිර හේතුවක් පමණි. අභ්‍යන්තර නිස්සාරණ අන්ත ලක්ෂ්‍යය පොදු උඩුගත කිරීමක් නොවේ API: පෝලිම් සන්තෘප්තිය `503` සහ `Retry-After` ලබා දෙයි, ඇමතුමක් විසන්ධි කරන්නෙකු `499` ආපසු ලබා දෙයි, සහ ස්ථාවර තැරැව්කරු අවසාන දිනය `504` ලබා දෙයි. පරිවර්තනය කරන ලද ප්‍රතිචාර මගින් විෂන් හෝ ශ්‍රව්‍ය කොටස් ඉවත් නොකර මධ්‍යම `x-omniroute-modality-bridge` ශීර්ෂයට `video->text;model=<visionModel>;parts=<videos>` එක් කරයි.

### PII Masker (`piiMasker.ts`)

ක්රියාත්මක වේ**දෙකම** අදියර.

- **`preCall`** ගෙවීමේ බර ක්ලෝන කරයි, `system`, `messages`, `input`, සහ `prompt` (සරල තන්තු අයිතම ඇතුළුව) ඇවිදිමින්, `processPII()` ( `@/shared/utils/inputSanitizer` සිට ) තන්තු `content`/`text` ක්ෂේත්‍ර වෙත යොදයි. `PII_REDACTION_ENABLED=true` විට, අනාවරණය කරගත් PII පිටතට යන ගෙවීමේදී නැවත සකස් කෙරේ. මෙය `INPUT_SANITIZER_MODE` වලින් ස්වායත්ත වේ (ඉක්මන් එන්නත් ප්‍රතිපත්තිය පමණක් පාලනය කරයි). නැවත සකස් කිරීම ක්‍රියාවිරහිත වූ විට, අන්තර්ගතය නැවත ලිවීමකින් තොරව ඇමතුම් වාර්තා හඳුනාගැනීම් ගණන් කරයි.
- **`postCall`** ප්‍රතිචාරය ගැඹුරින් ක්ලෝන කරයි, `sanitizePIIResponse()` සහ ප්‍රතිචාර-API හැඩැති ආවරණ (`maskResponsesOutput` — `output_text` සහ `output[].content[].text` ආවරණය කරයි). කිසියම් අඩු කිරීමක් සිදු වුවහොත්, නවීකරණය කරන ලද ප්‍රතිචාරය මුල් පිටපත ප්‍රතිස්ථාපනය කරයි.

ආරක්ෂක වැට කිසි විටෙකත් අවහිර නොවේ; එය විවරණ (`meta.detections`, `meta.redacted`) හෝ නැවත ලියයි.

#### එක්-වර්ගය තේරීම, අභිරුචි රටා සහ හඳුනාගැනීමේ කවුන්ටර

**උපකරණ පුවරුව → සැකසුම් → ආරක්ෂාව → PII ආවරණ** වසන ලද_දේ_තෝරා ගනී. එය මාස්ක් කිරීම සක්‍රිය නොකරයි: එය තවමත් `PII_REDACTION_ENABLED` (ඉල්ලීම) සහ `PII_RESPONSE_SANITIZATION` (ප්‍රතිචාර + SSE), පෙරනිමියෙන් ක්‍රියා විරහිත වේ.

- **එක් වර්ගයේ තේරීම** — ගොඩනඟන ලද ids `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`) හි ලැයිස්තුගත කර ඇත. නොසැකසීම යනු සෑම වර්ගයකම (මෙම සැකසීමට පෙර පැවති හැසිරීම) යන්නයි. ඉල්ලීම් එන්ජිමෙහි `ssn_us` රටාව `ssn` වෙත සිතියම්ගත කරයි. සැකිලි (අවම, සම්මත, මූල්‍ය, බ්‍රසීලියානු, USA, GDPR, POPIA, සම්පූර්ණ) UI හි පිරික්සුම් කොටු පමණක් පුරවයි.
- **GDPR සහ POPIA හඳුනාගැනීම්** EU සහ දකුණු අප්‍රිකානු පුද්ගලික හැඳුනුම්කාරක ආවරණය වන — දොළොස් ID (පහත වගුව). ඔවුන්ගේ regexes, Validators සහ අධිකරණ බලය ටැග් එක වගුවක ජීවත් වේ, `src/shared/utils/piiPatterns.ts`, ප්‍රතිචාර සනීපාරක්ෂක (`src/lib/piiSanitizer.ts`) සහ ඉල්ලීම් ආවරණ (`src/shared/utils/inputSanitizer.ts`) යන දෙකම පරිභෝජනය කරයි. ගැලපීමක් නැවත සකස් කරනු ලබන්නේ එහි වලංගුකරු එය පිළිගත් විට පමණි; ඉලක්කම්වල හිස් ධාවනය කිසි විටෙකත් ප්‍රමාණවත් නොවේ. මෙම හැඳුනුම්පත් පැවතීමට පෙර පටු තේරීමක් සුරකින ලද ක්‍රියාකරුවෙකු නව හැඳුනුම්පත් සලකුණු කරන තෙක් එහි පැවති හැසිරීම තබා ගනී.
- **අභිරුචි රටා** — 20 දක්වා regex හෝ Wildcard රටා (`*` = දක්වා 64-සුදු අවකාශ නොවන අක්ෂර, `?` = එකක් දක්වා). තරඟ `[CUSTOM_REDACTED]` බවට පත් වේ. සෑම රටාවක්ම `compilePiiCustomPattern()` හරහා යයි (`src/shared/utils/piiCustomPatterns.ts`): වැඩිම අක්ෂර 500ක්, `g i m s u` වලට සීමා වූ කොඩි, සම්පාදනය කළ යුතුය, `safe-regex` (ව්‍යසනකාරී පසුබැසීම) සමත් විය යුතුය, සහ හිස් තන්තුවකට හෝ නැවත සකස් කිරීමේ ස්ථාන රඳවනයකට නොගැලපේ. අසමත් වන රටාවක් සුරැකීමේදී සහ පරීක්ෂා කිරීමේදී ප්‍රතික්ෂේප කරනු ලබන අතර, අසමත් වන ගබඩා කර ඇති පේළියක් සම්පාදනය කරනවා වෙනුවට ධාවන වේලාවේදී මඟ හරිනු ලැබේ. අභිරුචි රටා ධාවනය වන්නේ මාස්ක් කිරීම ක්‍රියාත්මක වන විට පමණි.
- **හඳුනාගැනීමේ කවුන්ටර** — per-type ගණන් (කවදාවත් නොගැලපෙන අගයන්), මතකයේ රඳවා තබා ඇති අතර නැවත ආරම්භ කිරීමේදී යළි පිහිටුවන්න (`src/lib/pii/piiDetectionStats.ts`). මාස්ක් කිරීම ක්‍රියාත්මක වන විට පමණක් ඒවා වැඩි වේ.

සැකසීම් `key_value` වගුවේ (නාම අවකාශය `pii_settings`, `src/lib/db/piiSettings.ts`) සජීවී වන අතර තත්පර 1 හැඹිලියක් හරහා කියවනු ලැබේ. API:

| Method | Path                     | Purpose                                                                    |
| ------ | ------------------------ | -------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Flag state, `enabledTypes`, `customPatterns`, detection counters           |
| `PUT`  | `/api/settings/pii`      | `enabledTypes` (`null` = all) සහ/හෝ `customPatterns` ප්රතිස්ථාපනය කිරීම    |
| `POST` | `/api/settings/pii/test` | උපරිම 8 KB sample එකකට එක් pattern එකක් dry-run කිරීම; කිසිවක් ගබඩා නොකෙරේ |

තුනටම කළමනාකාරිත්වය අවශ්‍ය වන අතර Zod (`src/shared/validation/schemas/piiSettings.ts`) සමඟ ශරීරය වලංගු කරයි. පුරනය වීම අබල කර ඇති (`requireLogin=false`) `GET` සහ පරීක්ෂණ අන්ත ලක්ෂ්‍යය විවෘතව ඇත, නමුත් `PUT` තවමත් උපකරණ පුවරු සැසියක්, `manage` -scope API යතුරක්, ලිවීමේ විෂය පථය හෝ ඊට වැඩි `oma_` ප්‍රවේශ ටෝකනයක් හෝ ලූප්බැක් වෙතින් එවන ලද CLI ටෝකනය හෝ අභ්‍යන්තර සේවා ටෝකනය අවශ්‍ය වේ.

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

ඉලක්කම්-පමණක් ආකෘති ඇණවුම් අංක සමඟ ගැටෙන නිසා, අංක ගොඩනඟන සහ වේලා මුද්දර, දුර්වලම ඒවාට (`za_vat`, `za_tax_ref`) මූල පද ඉඟිය අවශ්‍ය වන අතර ඉලක්කම් දහයේ `0..` අංකයක් දකුණු අප්‍රිකානු දුරකථන අංකයක් ලෙස නොසලකයි. පරතරය IBANs (`GB29 NWBK ...`) නොගැලපේ. ප්‍රවාහ මාර්ගයේ ඉඟිය වත්මන් කොටස තුළ පමණක් ඉහළට බලයි. ids සාමාන්‍ය දුරකථන රටා වලට වඩා ඉදිරියෙන් පිහිටා ඇත, එබැවින් වලංගු හැඳුනුම්කාරකයක් තමන්ගේම තැන් දරණුවක් තබා ගනී (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). `gdpr` සහ `popia` සැකිලි පිළිවෙලින් EU සහ දකුණු අප්‍රිකානු id තෝරා ගනී. මාස්ක් කිරීම තෝරා ගැනීමේදී පවතී (Hard Rule #20): මෙහි කිසිවක් විශේෂාංග-ධජ පෙරනිමියක් වෙනස් නොකරයි.

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
