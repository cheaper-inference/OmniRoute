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

## සවිකෘත Guardrails

Registry එක import කිරීමේදී ප්රමුඛතා අනුපිළිවෙළින් guardrails හයක් ස්වයංක්රීයව පූරණය කරයි (බලන්න `registry.ts` → `registerDefaultGuardrails()`):

| ප්රමුඛතාව | නම                  | අදියර(ය)       | ගොනුව                 |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

අඩු ප්රමුඛතා අංක **පළමුව** ක්රියාත්මක වේ.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

GLM 5.3 මූලික model එක සහ `glm-5.3-{low,high,max}` සඳහා පැහැදිලි `supportsVision:false` registry/spec metadata ඇත. GLM 5.3 Flash ප්රභේද native-vision models ලෙස පවතී. Claude Code හි `/v1/messages` route එක, Claude-to-OpenAI පරිවර්තනයට **පෙර** හවුල් `handleChat` pre-call guardrail දාමයට ඇතුළු වේ; කිඳවූ `Read` tool-result images, එම පරිවර්තනය ඒවා OpenAI `image_url` අන්තර්ගතයට ඔසවා තැබීමට පෙර විස්තර කළ යුතු හෝ හැසිරවිය යුතු ය (#17069).

**non-vision models** වෙත යොමු කර ඇති image ඇතුළත් requests අත්තනෝමතිකව හසුකරගෙන, සම්පූර්ණ request එක vision-හැකි model එකකට නැවත යොමු කරයි හෝ upstream call එකට පෙර වින්යාසගත කළ හැකි vision model එකක් මඟින් ජනනය කරන ලද පෙළ විස්තර සමඟ image කොටස් ප්රතිස්ථාපනය කරයි. මෙය text-only providers වලට multimodal payloads විනිවිද පෙනෙන ආකාරයට හැසිරවීමට ඉඩ සලසයි.

ප්රවාහය:

1. ඉලක්ක model එක දැනටමත් vision සඳහා සහය දක්වන්නේ නම් මඟ හරින්න (එය බලහත්කාර bridge ලැයිස්තුව `isVisionBridgeForcedModel` තුළ දිස්වන්නේ නම් මිස).
2. `extractImageParts(messages)` (`visionBridgeHelpers.ts`) හරහා image කොටස් උපදවා ගන්න — එය `open-sse/utils/mediaParts.ts` හි **ඒකීය media detector** වන `detectMediaParts()` වෙත භාර දෙයි; එය combo අනුකූලතා පෙරහන සමඟ බෙදාගන්නා සත්යයේ ඒකම මූලාශ්රයයි. උපදවා ගැනීම, `replaceImageParts` නැවත splice කළ හැකි හැඩතල වලට පමණක් allowlist කර ඇත (extract↔replace කොන්ත්රාත්තුව): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`, සහ Responses API `input_image`. Claude Code `tool_result.content` සහ Responses tool outputs තුළ කිඳවූ ගැලපෙන images ද ඒවායේ මුල් මාවත්වලදී උපදවා ප්රතිස්ථාපනය කෙරේ; indicator-only හැඩතල combo-filter ද්රව්ය වන අතර ඒවා උපදවා නොගැනේ. කිසිවක් හමු නොවුවහොත් මඟ හරින්න.
3. `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`) හරහා runtime config නිරාකරණය කරන්න: නව `modalityBridge*` settings යතුරු ජය ගනී; පැරණි `visionBridge*` යතුරු **එක්-චක්ර fallback** එකක් ලෙස පවතී (rollback කවුළුව). bridge එක අක්රිය කර ඇති විට ඕනෑම media traversal එකකට පෙර මඟ හරින්න.
4. මාදිලි තේරීම්කාරකය (`modalityBridgeVisionMode`, පහත වගුව බලන්න) reroute එද describe ද යන්න තීරණය කරයි. Reroute මඟින් `model` පමණක් මාරු කළ `modifiedPayload` එකක් සමඟ, meta `{ rerouted, fromModel, toModel, imagesKept }` යනුවෙන් ආපසු ලබා දෙයි.
5. Describe මාවත: images `maxImages` දක්වා සීමා කර, task-aware prompt එක සකසා, describe cache එක විමසා, vision model එක **සමාන්තරව** (`Promise.allSettled`) අමතා, ඒවා වෙනුවට `[Image N]: <description>` පෙළ කොටස් එන්නත් කරයි. අසාර්ථක describe එකක් `null` ලබා දෙයි: නොදන්නා/vision-හැකි ඉලක්ක සඳහා අමු image එක සුරක්ෂිත කෙරේ (#4012), නමුත් **තහවුරු කළ text-only direct ඉලක්කයක්** හෝ zero-vision combo එකක් සඳහා සෑම විස්තර නොකළ image එකකටම පැහැදිලි `(unavailable — no vision-capable provider connected)` පෙළ stub එකක් ලැබේ — අර්ධ අසාර්ථකත්වයන් සහ describe-call සීමාවෙන් ඔබ්බෙන් ඇති images ද ඇතුළුව (#17069). දැනට පවතින සියල්ල-අසාර්ථක combo describe fallback එක ඉදිරියටත් පවතී (#8430).
6. `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`) ආපසු ලබා දෙන්න.

#### මාදිලි තේරීම්කාරකය (`modalityBridgeVisionMode`)

| ක්රමය      | පෙරනිමි | හැසිරීම                                                                                                                                                                                                                                                           |
| ---------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | පැරණි heuristic, ස්පර්ශ නොකළ (#6640/#7204): non-combo/`auto/` ආකෘති හොඳම vision ආකෘතියට නැවත මාර්ගගත වේ, මුල් ආකෘතියට දැනටමත් භාවිත කළ හැකි අක්තපත්ර තිබේ නම් මිසක් (එවිට describe); combo ඉලක්ක සෑම විටම describe කරයි.                                          |
| `describe` |         | සෑම විටම describe කරයි — reroute වාරණය සම්පූර්ණයෙන්ම මඟහරිනු ලැබේ; පරිශීලකයා තෝරාගත් ආකෘතිය සෑම විටම පිළිතුරු දෙයි.                                                                                                                                               |
| `reroute`  |         | බලහත්කාර reroute: keep-credentialed-model ආරක්ෂකය මඟහරිනු ලැබේ. reroute-**ඉලක්ක** අක්තපත්ර ආරක්ෂකය තවමත් අදාළ වේ — භාවිත කළ හැකි vision ඉලක්කයක් නොමැති විට, bridge එක describe කිරීමට හෝ text-only ඉලක්කයකට අමු රූප යැවීම වෙනුවට පැහැදිලි දෝෂයක් සමඟ අවහිර කරයි. |

බලාත්මක කළ ක්රම auto heuristic එක ක්රියාත්මක වීමට **පෙර** කෙටි-පරipථ වේ; `auto` හැසිරීම
pre-PR-1 guardrail එකට බයිට්-අනුව සමාන වේ.

#### API-යතුර විෂය පථය (`visionBridgeKeyScope.ts`)

ඇමතුම්කරුගේ API යතුර `allowedConnections`, quota තටාක
(`allowedQuotas`) හෝ ආකෘති (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`) සීමා කරන විට, bridge එක
යතුරට භාවිත කළ හැකි reroute සහ describe ආකෘති පමණක්, යතුරට භාවිත කළ හැකි
සම්බන්ධතා මත තෝරයි. describe ඇමතුම පසුව සෑම විටම
`x-omniroute-self-loop-key-id` ශීර්ෂකය සමඟ OmniRoute self-loop හරහා යන නිසා, ලැබෙන
chat ඉල්ලීම එම යතුරේ සම්බන්ධතා සහ ආකෘති ප්රතිපත්තිය නැවත බලාත්මක කරයි. `enforceApiKeyPolicy()`
එම ශීර්ෂකය self-loop bearer එක සමඟ පමණක් ගෞරව කරයි, එබැවින් එයට ප්රවේශය
පටු කළ හැකි පමණක් වන අතර, resolve නොවන id එකක් ප්රතික්ෂේප වේ.

යතුර සඳහා කිසිදු vision ආකෘතියක් අවසර නොලැබේ නම්, **තහවුරු කළ text-only
ඉලක්කයක්** රූප බයිට්ස් නොහැකි upstream එකකට යොමු කිරීම වෙනුවට පැහැදිලි
HTTP 400 සමඟ රූප ඉල්ලීම දේශීයව ප්රතික්ෂේප කරයි (#17069). නොදන්නා හෝ
ස්වදේශීය vision හැකියාව ඇති ඉලක්ක සඳහා, describe මාවත එහි පෙර
fail-open හැසිරීම රඳවා ගනී (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
යතුරක් නොමැති ඉල්ලීම්, සහ මෙම සීමාවන් නොමැති යතුරු, පෙර පරිදිම හැසිරේ.

#### කාර්ය-දැනුම් describe prompt (`modalityBridgeVisionTaskAware`)

පෙරනිමි **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) **අවසාන පරිශීලක
පණිවිඩයේ** පෙළ (අක්ෂර 500කට කපා දමා) මූලික describe prompt එකට එකතු කරයි,
විස්තරය පරිශීලකයා සැබවින්ම ඇසූ දේ කරා යොමු කරමින් (codex-vision-proxy
රටාව) සහ දෘශ්යමාන පෙළ පිටපත් කරන ලෙස vision ආකෘතියෙන් ඉල්ලයි.
කොඩිය අක්රිය කළ විට — හෝ පරිශීලක පෙළක් නොමැති විට — මූලික prompt එක වෙනස් නොකර භාවිත කරයි.

describe self-loop එකේම OpenAI-ගැළපෙන ඉල්ලීම (`visionBridgeHelpers.ts` හි `callVisionModelSingle()`)
සෑම විටම `image_url.detail: "high"` ඉල්ලයි — නිසිකොන්දේසිකව, සෑම
ඇමතුම්කරු/සැපයුම්කරු සඳහාම, කිසිදු client signal එකකට බැඳී නැත.
අඩු-විස්තර sampling මෙම prompt එක ඉල්ලා සිටින පෙළ-පිටපත්
කාර්යය සඳහාම OCR නිරවද්යතාවය අඩු කරන නිසා, මුල් inbound ඉල්ලීම භාවිත කළ
විස්තර මට්ටම කුමක් වුවත් describe ඇමතුම සෑම විටම ඉහළ විස්තර ඉල්ලයි. මෙය
බලපාන්නේ අභ්යන්තර describe ඉල්ලීමේ body එකට පමණි; OmniRoute මුල් ඉල්ලීමේ
ඇමතුම්කරුගේම `image_url.detail` යොමු කරන ආකාරය එය වෙනස් නොකරයි —
එම පෙරනිමිය වෙනම, සහ හඳුනාගත් OpenCode clients සඳහා පමණක්,
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`) හි යොදනු ලැබේ.
describe self-loop එකේ Anthropic wire-format ශාඛාවට `detail` ක්ෂේත්රයක් නැති අතර
කිසිදු පෙරනිමියකට බලපෑම් නොවේ.

#### Describe ප්රතිදාන සීමාව (`modalityBridgeVisionMaxChars`)

| යතුර                           | පෙරනිමි | පරාසය            |
| ------------------------------ | ------- | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` හෝ 100–50000 |

`0` (පෙරනිමි) යනු **සීමාවක් නැත** — `callVisionModel()` මඟින් ලබා දෙන
විස්තරය වෙනස් නොකර යොමු කරයි, පවතින හැසිරීම රඳවා ගනිමින්.
100–50000 පරාසයේ ඕනෑම අගයක් විස්තරය `…` ප්රත්යයක් සමඟ කපා දමයි, එය
`[Image N]: <description>` ලෙස නැවත ඇතුළු කිරීමට පෙර
(`src/lib/guardrails/visionBridge.ts` හි `VisionBridgeGuardrail.preCall()`).
downstream ආකෘතියට සම්පූර්ණ පිටපත අවශ්ය වන විස්තර-බහුල OCR කාර්ය සඳහා
මෙය ඉහළ නැංවන්න; කතාබහ බහුල vision ආකෘති මත token භාවිතය සීමා කිරීමට අඩු කරන්න.
dashboard ක්ෂේත්රය Vision ටැබයේ Advanced පැනලයේ
(`ModalityBridgeVisionTab.tsx` හි `modality-bridge-max-chars`) පවතින අතර, 1 සහ 99
අතර ඕනෑම අගයක් 100 තලයට ඔසවා තබයි, නමුත් පැහැදිලි `0` ක් ස්පර්ශ නොකර තබයි —
`0` යනු ස්වයං-වලංගු Zod අගයකි
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), හුදෙක්
"unset" පෙරනිමිය නොවේ.

#### Describe කැෂේ (`modalityBridge/bridgeCache.ts`)

describe ප්රතිදාන සඳහා මතක-අභ්යන්තර LRU + TTL කැෂේ, ක්රියාවලිය-පුරා බෙදා ගැනේ.
යතුර = `sha256(imageRef + composedPrompt + configuredBridgeModel)` දිග-උපසර්ග
රාමුකරණය සමඟ (ක්ෂේත්ර-මායිම් ගැටීම් නැත). ආකෘති සංරචකය වන්නේ **වින්යාසගත කළ**
bridge ආකෘතිය, සැබවින්ම පිළිතුරු දුන් ආකෘතිය නොවේ — `callVisionModel`
අභ්යන්තරව fall back විය හැකි අතර, උත්සාහයකට යතුරු ගැලපීම කැෂේ කැබලි කරනු ඇත.
අසාර්ථක describes කිසිවිටෙක cache නොකෙරේ. සැකසීම්:

| යතුර                            | පෙරනිමි | පරාසය   |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### දුරස්ථ රූප සාමාන්යකරණය (self-loop describe/base64 ලබාගැනීම)

බ්රිජ් එක **දුරස්ථ** රූපයක් තමා විසින්ම ලබාගන්නා විට — Anthropic describe
ස්වයං-ඇමතුම සහ claude-wire-format base64 පරිවර්තනය
(`ensureBase64ImagesForClaudeWire`), දෙකම
`visionBridgeHelpers.ts` හි `fetchRemoteImageAsDataUri()` හරහා — එලැබෙන data
URI එක vision-ආකෘති ඉල්ලීම තුළට කාවැදීමට පෙර `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) හරහා යවනු ලැබේ. ප්රමාණයෙන් විශාල රූප
**2048px දිගු දාරයකට** කුඩා-පරිමාණය කරනු ලැබේ (OpenAI/Anthropic
සේවාදායක-පැත්තෙන් දැනටමත් යොදන resize සීමාවට ගැලපෙන පරිදි), එමඟින් vision
ආකෘතිය දකින දේ වෙනස් නොවී upload බයිට්/ප්රමාදය අඩු වේ. ප්රමාණ-වෙනස්
කිරීම `sharp` භාවිතා කරයි, dynamic import හරහා පූරණය කෙරේ: එහි native
binary එක පූරණය වීමට අසමත් වන වේදිකාවකදී, `normalizeDataUri()` **කිසිවිටෙක
throw නොකරයි** — එය මුල් බයිට්වල passthrough එකකට යළි යයි, එබැවින්
describe/base64-පරිවර්තන මාර්ගය සෑම විටම ක්රියාත්මක වේ. රූප-නොවන බයිට්
(කේත-විසුරුවා හැකි රූපයක් ලබා නොදුන් ලබාගැනීමක්) ද ස්පර්ශ නොකළ ලෙස
යවනු ලැබේ. මෙම සාමාන්යකරණය බ්රිජ් එක තම ස්වයං-ඇමතුම සඳහා ලබාගන්නා
රූපවලට පමණක් සීමා වී ඇත — එය කිසිවිටෙක අමතන්නාගේ අමු passthrough payload
එකට යොදනු නොලැබේ, opt-in-only විකෘතිකරණ මූලධර්මයට (Hard Rule #20)
අනුකූලව.

#### සැකසුම් schema + සංක්රමණය

නව `modalityBridge*` යතුරු `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`) තුළ Zod-වලංගු කරනු ලැබේ:
`modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, `modalityBridgeCache*` ත්රිත්වය, සහ
Audio Bridge විසින් භාවිතා කරන `modalityBridgeAudio*` කණ්ඩායම. සංක්රමණ
`141_modality_bridge_settings.sql` පවතින පැරණි
`visionBridge*` අගයන් අදාළ නව යතුරු වෙත පිටපත් කරයි (idempotent, ක්රියාකරු
විසින් සකසන ලද `modalityBridge*` අගයක් කිසිවිටෙක නැවත ලියනු නොලැබේ);
පැරණි යතුරු එක් නිකුතු චක්රයක් සඳහා කියවීමේ fallback ලෙස පිළිගැනේ.

#### පාරදෘශ්යතා ශීර්ෂකය + සංඛ්යාලේඛන

Describe-පරිවර්තනය වූ ප්රතිචාර
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
දරයි (`modalityBridge/bridgeStats.ts` හි `buildModalityBridgeHeader()`
මඟින් තනන ලද, `src/sse/handlers/chatHelpers.ts` හි
`withModalityBridgeHeader()` මඟින් සටහන් කරන ලද). Reroute කළ ඉල්ලීම් වලට
ශීර්ෂකයක් **නොලැබේ** — payload එක ස්පර්ශ නොකළ අතර ආකෘති මාරුව දැනටමත්
ප්රතිචාර බොඩියේ `model` ක්ෂේත්රයේ පෙනේ.

`GET /api/modality-bridge/stats` (management සත්යාපනය,
`GET /api/settings` ට සමාන මට්ටම) `vision`, `audio`, සහ
`video` සඳහා මතක-අභ්යන්තර per-modality ගණන්
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` ලබා දෙයි.
`averageLatencyMs` එහි හරය ලෙස සියලු උත්සාහයන් නොව `latencySamples`
භාවිතා කරයි; කාල-මැනීමක් නොමැති මෙහෙයුමක් බිංදු-මිලිතත්පර නියැදියක්
නිර්මාණය නොකරයි. `bridged` සාර්ථක පරිවර්තන සඳහා පසුගාමී-අනුකූල
අන්වර්ථය ලෙස පවතී; අසාර්ථක උත්සාහයන් එය වැඩි නොකරයි.
ගණන් සැලසුම් අනුව ක්රියාවලිය නැවත-ආරම්භයේදී යළි-සකසනු ලැබේ
(ගිණුම්කරණය නොව, telemetry).

#### උපකරණ පුවරු වින්යාසය

විශේෂිත උපකරණ-පුවරු පිටුව
`/dashboard/settings/modality-bridge` වේ. එහි URL-ලිපිනීය `Vision`, `Audio`,
සහ `Video` ටැබ `tab` අගය මාරු කරන අතරතුර query පරාමිතීන් ආරක්ෂා කරයි.
Vision ටැබය සබල-කිරීම, ආකාරය, ආකෘති තේරීම (ස්වයංක්රීය
පෙරනිමිය ඇතුළුව), task-aware prompting, උසස්
timeout/රූප/විස්තර-දිග/cache සීමා, ධාවන-කාලීන
ගණන්, සහ ආරක්ෂිත නියැදි ඉල්ලීමක් හෙළි කරයි. Audio ටැබය ද සජීවී ය: එය
සබල-කිරීම, Auto සහිත STT-පමණ ආකෘති තේරීම්කරුවෙක්, timeout/උපරිම-ක්ලිප් සීමා, ශ්රව්ය
ගණන්, සහ `input_audio` නියැදි පරීක්ෂණයක් හෙළි කරයි. Video ටැබය ක්රියාකාරී ය: එය
FFmpeg/ffprobe ධාවන-කාලීන තත්ත්වය වාර්තා කරයි — පැහැදිලි UI තත්ත්ව හතරෙන්
එකක් (probe එක ගමනේ තිබියදී හෝ සම්පූර්ණ කළ නොහැකි විට `unknown`,
probe එක client-පැත්තෙන් මඟහරින loopback නොවන උපකරණ-පුවරු
සත්කාරකයකදී `restricted`, probe කර නොමැති බව තහවුරු වූ පසු `unavailable`,
හෝ FFmpeg/ffprobe අනුවාද සමඟ `available`) — සබල/ආකෘති/රාමු/වීඩියෝ/timeout
සීමා ස්ථිර කරයි, ආකෘති තේරීම්කරු vision-හැකියාව ඇති ආකෘතිවලට
පෙරහන් කරයි, සහ වීඩියෝ ගණන් හෙළි කරයි.

AI සැකසුම් යටතේ තිබූ පෙර Vision Bridge කාඩ්පත නව පිටුවට ඇති
අනුකූලතා සබැඳියකි; එය තවදුරටත් ෆෝරමයේ දෙවන පිටපතක් හිමි නොවේ. Media
Providers ද Image-to-Text සහ Speech-to-Text වැඩප්රවාහ අදාළ Modality
Bridge ටැබ වලට සම්බන්ධ කරයි, පවතින Speech-to-Text ක්රීඩාංගනය
ඉවත් නොකර.

**Self-loop admission මඟහැරීම:** describe ඇමතුම OmniRoute හි තම `/v1`
self-loop (සම්මත-නොවන provider ආකෘතිය) හරහා යොමු වන විට, උප-ඉල්ලීම
`x-omniroute-admission-bypass: internal` යවන අතර විසඳන ලද self-loop
අක්තපත්රයෙන් සත්යාපනය වේ — local ආකාරයේදී දේශීය `sk_omniroute`
sentinel එක, හෝ ක්රියාකරු-වින්යාස `OMNIROUTE_API_KEY` / `ROUTER_API_KEY`
env යතුර (#1350), එබැවින් `REQUIRE_API_KEY=true` deployments වලට තවමත්
describe ඇමතුම ක්රියාත්මක කළ හැක. මඟහැරීම ගෞරවනය කරන්නේ එම නිශ්චිත
අක්තපත්ර සඳහා පමණක් බැවින්, බාහිර සේවාදායකයන්ට admission මඟහැරීමට
ශීර්ෂකය භාවිතා කළ නොහැක.

පැරණි පෙරනිමි `src/shared/constants/visionBridgeDefaults.ts` හි පවතී;
නව ආකාර/task-aware/cache පෙරනිමි සහ සැකසුම් විසඳුම
`src/shared/constants/modalityBridgeDefaults.ts` හි පවතී. Guardrail එක
`deps` constructor විකල්පයක් හෙළි කරයි, එබැවින් පරීක්ෂණ වලට ව්යාජ
`getSettings` සහ `callVisionModel` ක්රියාත්මක කිරීම් එන්නත් කළ හැක.

### ශ්රව්ය Bridge (`audioBridge.ts`) — Modality Bridge PR-3

ශ්රව්ය-අඩංගු chat ඉල්ලීම්, ශ්රව්ය ආදානය පිළිගන්නා බව දන්නා ඉලක්කයකට
ළඟා වීමට පෙර ඇණහිටවයි. එය කිසිවිටෙක chat ඉල්ලීම reroute නොකරයි: ශ්රව්ය
කොටස් පවතින OpenAI-අනුකූල multipart endpoint එක හරහා ශබ්දලේඛනය කරනු ලබන
අතර තෝරාගත් chat ආකෘතිය පෙළ ශබ්දපිටපත් සමඟ ඉදිරියට යයි.

ප්රවාහය:

1. `supportsAudio` යනු `getResolvedModelCapabilities()` හරහා නිරාකරණය කරයි. පැහැදිලි
   provider-registry පාර-දත්ත පළමු වැනි වේ, පසුව ස්ථිර ආකෘති පාර-දත්ත, පසුව සමමුහුර්ත කළ
   `modalities_input`. `audio` නොමැති ප්රකාශිත ආදාන ලැයිස්තුවක් `false` වේ;
   හැකියාව සාක්ෂි නොමැති විට `null` ලෙස පවතී. `false` සහ `null` දෙකම
   සංරක්ෂණශීලී බ්රිජ් එක සක්රිය කරයි, `true` එය මගහරින්නේය.
2. `modalityBridgeAudio*` සැකසුම් නිරාකරණය කර, බෙදාහැර ඇති `detectMediaParts()`
   අනිවාර්යයෙන්ම සෑම පණිවිඩයකින්ම ඉහළ මට්ටමේ ශ්රව්ය කොටස් උද්ධරණය කරයි. සහාය දක්වන
   wire හැඩතල OpenAI `input_audio`, `audio_url`, සහ
   `source.media_type: "audio/*"` වේ. කූඩු ශ්රව්ය කොටස් මාර්ග කිරීම සඳහා හඳුනාගෙන ඇති නමුත්
   splice මාර්ගයෙන් ඉවත් නොකෙරේ. වැඩ `modalityBridgeAudioMaxClips` මගින් සීමා කර ඇත;
   පසුව කොටස් නොසලකා හැරේ.
3. වින්යාසගත කළ `provider/model` එකක් ගෞරව කරන්න, නැත්නම් `selectAudioBridgeModel()`
   `AUDIO_TRANSCRIPTION_PROVIDERS` හි ස්ථිර නාමාවලි අනුපිළිවෙලින් ගමන් කර,
   භාවිතා කළ හැකි සක්රිය සැපයුම්කරු අක්තපත්රයක් ඇති පළමු ආකෘතිය තෝරා ගැනීමට ඉඩ දෙන්න.
4. `callAudioTranscription()` base64/data-URI ශ්රව්ය දත්ත multipart
   `file` බවට පරිවර්තනය කරයි, නැත්නම් දුරස්ථ `audio_url` එකක් පොදු-පමණක්
   පිටත යන ආරක්ෂාව හරහා DNS pinning සහ 25 MB සීමාවක් සමඟ බාගනී. ඉන්පසු එය ගොනුව සහ තෝරාගත්
   ආකෘතිය `resolveSelfLoopBearer()` සමඟ සත්යාපනය කරන ලද දේශීය `/v1/audio/transcriptions`
   self-loop වෙත POST කරයි. පවතින පිටුවහල් මාර්ගය සාමාන්ය අක්තපත්ර සෙවීම,
   cooldown/අනුපාත-සීමා හැසිරවීම, සහ සැපයුම්කරු යැවීම සිදු කරයි.
5. සාර්ථක ඇමතුම් ඒවායේ කොටස් `[Audio N]: <transcript>` ලෙස ප්රතිස්ථාපනය කරයි. ඇමතුම්
   `Promise.allSettled` සමඟ ක්රියාත්මක වේ: තනි අසාර්ථකත්වයක් එම මුල් ශ්රව්ය
   කොටස ආරක්ෂා කරයි (#4012 කොන්ත්රාත්තුව). සෑම ඇමතුමක්ම අසාර්ථක වූ විට සහ ඉලක්කය
   `supportsAudio === false` බව ඔප්පු වූ විට, කොටස්
   `[Audio N]: (unavailable — no STT provider connected)` බවට පත් වේ (#8430 කොන්ත්රාත්තුව).
   නොදන්නා ඉලක්කයක් සඳහා (`null`), සියලු-අසාර්ථක ප්රතිඵලයක් නොසලකා හැරේ.
   භාවිතා කළ හැකි STT අක්තපත්රයක් නොමැති ඔප්පු වූ පෙළ-පමණක් ඉලක්කයක්
   ජාල ඇමතුමක් නොකර එම පැහැදිලි stub ලැබේ.

සාර්ථක පිටපත් කිරීම් ක්රියාවලිය-පුරා Modality Bridge LRU/TTL කැෂ් එක භාවිතා කරයි. යතුර
ශ්රව්ය සඳහන, ස්ථිර `audio-transcription` මෙහෙයුම් ලේබලය, සහ තෝරාගත් STT ආකෘතිය එකතු කරයි;
අසාර්ථකත්වයන් කිසිවිටෙක කැෂ් නොකෙරේ. ශ්රව්ය උත්සාහයන් බෙදාගත් `bridged`, `cacheHits`,
`failures`, සහ `lastUsedAt` ගණන් යාවත්කාලීන කරයි. පරිවර්තනය කළ ප්රතිචාර
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` රැගෙන යයි;
නොසලකා හැරූ ඉල්ලීම්වලට Audio Bridge කොටසක් නොලැබේ.

ධාවන කාල සැකසුම් DB-පදනම් වූ සහ Zod-වලංගු කළ:

| යතුර                          | පෙරනිමිය | පරාසය                |
| ----------------------------- | -------- | -------------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                    |
| `modalityBridgeAudioModel`    | `""`     | ස්වයංක්රීය හෝ STT ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000          |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10                 |

බෙදාගත් කැෂ් එක `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`,
සහ `modalityBridgeCacheMaxEntries` මගින් පාලනය වේ.

### වීඩියෝ බ්රිජ් (`videoBridge.ts`, `videoBridgePipeline.ts`)

දේශීය වීඩියෝ සහාය නොදන්නා ඉලක්කයක් ඇමතීමට පෙර Chat Completions `messages` සහ Responses
API `input` හි ඉහළ මට්ටමේ වීඩියෝ කොටස් අත්හදා බලයි. සහාය දක්වන හැඩතල `input_video`,
`video_url`, `video_source`, HTTPS URLs, සහ `data:video/*;base64,...` data URIs වේ.
පෙළෙහි සාමාන්ය ගොනු නම් වීඩියෝ ලෙස සැලකෙන්නේ නැත.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) ඉල්ලීම් ගමන් කිරීම,
හැකියාව/ප්රතිපත්ති පරීක්ෂාව, එක් ඉල්ලීමකට එකතු කිරීම, සහ ප්රතිචාර දත්ත පැටවීම දරයි.
එක් වීඩියෝවකට වැඩ — ලබාගැනීම, සම්පූර්ණ-ප්රතිඵල කැෂ්, රාමු අනුක්රමයක් විස්තර කිරීම
(එය ඕනෑම ඇමතුම්කරු-ප්රකාශිත ශ්රව්ය පිටපතක් ඒකාබද්ධ කරයි), සහ එක් උත්සාහයකට
මිනුම්/නැවැත්වීම/පිරිසිදු කිරීම — `preCall` හි ලූපය තුළ එක් වීඩියෝ කොටසකට වරක් ඇමතෙන
`videoBridgePipeline.ts` හි `processVideoPart` පිටුපස සැඟවී ඇත.
එම මොඩියුලය පැහැදිලි port මායිම් `VideoMediaBrokerPort`
(බයිට් ලබාගැනීම සහ නියැදි රාමු උද්ධරණය), `VideoAudioTranscriptionPort`
(ඇමතුම්කරු-ප්රකාශිත ශ්රව්ය පිටපතක් නියැදි ශීර්ෂ පාඨ සමඟ ඒකාබද්ධ කිරීම), සහ
`VideoDrilldownPort` (රාමු drill-down අඛණ්ඩතා මායිම; තවම
`processVideoPart` තුළට සම්බන්ධ කර නැත — අද වන විට වෙනම `/api/modality-bridge/video/drilldown`
මාර්ගය පමණක් drill-down සළකුණු ලියයි) ද අර්ථ දක්වයි.

පොදු `/v1` ඉල්ලීම් මාර්ගය කිසිවිටෙක subprocess එකක් ආයාත නොකරයි හෝ ක්රියාත්මක නොකරයි. දුරස්ථ
වීඩියෝ 50 MiB සීමාවක් යටතේ බාගනී; inline base64 වීඩියෝවලට ආකෘතිය/පණිවිඩ/රාමු කවළුව
පොදු JSON ඉල්ලීම් පිළිගැනීමේ සීමාව වන 50 MiB තුළ රැඳී සිටිය හැකි වන පරිදි සංරක්ෂණශීලී 36 MiB
විකේතනය කළ එක් වීඩියෝවකට සීමාවක් ඇත. Inline දිග සහ විකේතනය කළ-ප්රමාණ ඇස්තමේන්තු
වෙන් කිරීමට පෙර පරීක්ෂා කෙරේ. HTTPS ආරම්භක දුරස්ථ URL සහ සෑම යළි-යොමුවීමකදීම අවශ්ය වේ,
DNS pinning සහිත පවතින පොදු-පමණක් පිටත යන ආරක්ෂාව භාවිතා කරයි. ඉන්පසු බයිට් නිශ්චිත අභ්යන්තර
`POST /api/modality-bridge/video/extract` බ්රෝකර් මායිම හරහා යයි. එම මාර්ගය
`LOCAL_ONLY` සහ `SPAWN_CAPABLE` දෙකම වේ, එක් ක්රියාවලියකට සත්යාපිත,
විශ්වාසදායක-loopback ඉල්ලීමක් පමණක් පිළිගනී, සහ කිසිවිටෙක URL, ගොනු පද්ධති මාර්ගය, ක්රියාත්මක කළ හැකි,
හෝ තර්ක ලැයිස්තුවක් පිළිගන්නේ නැත. API body-size නල මාර්ගය සහ හැසිරවුම්කරුගේ ක්රමානුකූල
body කියවන්නා ස්වාධීනව 50 MiB බ්රෝකර් ආදාන සීමාවක් බලාත්මක කරයි. එහි සීමිත පෝලිම
එක් වරකට එක් උද්ධරණයක් ක්රියාත්මක කරයි, පොරොත්තු රැකියා හතරක් ඉඩ දෙයි, සහ පොරොත්තු ආදානය
100 MiB දක්වා සීමා කරයි.

බ්රෝකරය තුළ, `ffprobe` පුද්ගලික දේශීය ගොනුවක් කියවයි; ස්ථාවර ආකෘති
අවසර ලැයිස්තුවෙන් ධාවන ලැයිස්තු සහ මැනිෆෙස්ට් ආකෘති බැහැර කර ඇත. අවසර දී ඇති MOV-පවුලේ
කන්ටේනර් සඳහා, බාහිර MOV දත්ත යොමු පෙරනිමියෙන් අක්රියව පවතින අතර,
ස්ථාවර විධානය ඒවා සක්රිය නොකරයි. `ffprobe` සහ `ffmpeg` යන දෙකම
`file`-පමණක් වන ප්රොටෝකෝල අවසර ලැයිස්තුව, එක් ත්රෙඩයක්, ස්ථාවර තර්ක අරාවන්, shell එකක් නොමැතිව,
සහ `PATH` වෙතින් සොයාගත් ක්රියාත්මක කළ හැකි ගොනු භාවිත කරයි. අමුණා ඇති-පින්තූර කවර ප්රවාහ
ධාවනය කළ හැකි අපේක්ෂකයන් නොවේ. ධාවනය කළ හැකි සියලුම ප්රවාහ සීමාවන් සපුරාලිය යුතු අතර,
නිශ්චිත ලෙස නියම කළ පෙරනිමි ප්රවාහයක්, නියතවාදී අවම-දර්ශක
පසුබැසීමට පෙර වරණය කරනු ලැබේ. වීඩියෝ තත්පර 600කට, එක් එක් මානයකට පික්සල 8,192කට, සහ
මූලාශ්ර පික්සල 33,554,432කට සීමා වේ. FFmpeg මධ්ය ලක්ෂ්ය JPEG රාමු 1–16ක් නියැදිගත කර,
කුඩා ආදාන ඉහළ පරිමාණගත නොකර දිගු දාරය උපරිම පික්සල 1,024ක් වන පරිදි පහළ පරිමාණගත කරන අතර,
කිසිවිටෙක URL එකක් නොලබයි. නියැදිගත කිරීම පෙරනිමියෙන් `uniform` වේ. විකල්ප
`scene_aware` සහ පර්යේෂණාත්මක `segment_aware` ප්රතිපත්ති, දැනටමත් වලංගු කර ඇති
දේශීය ප්රවාහය මත තවත් එක් ස්ථාවර FFmpeg වාරයක් ක්රියාත්මක කර, සීමා කරන ලද
`showinfo` දර්ශන කාලමුද්රා තෝරා, අනාවරක අසමත් වීමක්, කාලසීමාව ඉක්මවීමක්, විකෘති ප්රතිදානයක්, හෝ හිස්
අපේක්ෂක කට්ටලයක් ඇති විට එම ඒකාකාර මධ්ය ලක්ෂ්ය වෙත නියතවාදීව
පසුබසී. කොටස්-සංවේදී ප්රකාරය වලංගු කළ දර්ශන අන්තරවලට සමානුපාතිකව මධ්ය ලක්ෂ්ය නියැදි
වෙන් කරයි; කොටස්-සංවේදී සාක්ෂි සහ පසුබැසීමේ හැසිරීම
පහත විස්තර කර ඇත. සෑම ප්රතිපත්තියකදීම තේරීමෙන් පසු
රාමු 16ක දැඩි සීමාව යොදනු ලැබේ. දර්ශන-සංවේදී ඉල්ලීමකට ඇත්තේ
එක්-රාමු අයවැයක් පමණක් නම්, එය සක්රිය පූර්ණ-වීඩියෝ හෝ නාභිගත කවුළුවේ ඒකාකාර මධ්ය ලක්ෂ්යය
භාවිත කර `policyEffective: uniform` ලෙස වාර්තා කරයි: තෝරාගත් තනි දර්ශන රාමුවකට
කාලානුක්රමික අන්ත දෙකම පවත්වාගත නොහැක. කැඳවුම්කරුට විකල්පයක් ලෙස
සීමිත නාභිගත කවුළුවක් (`start`/`end` තත්පර) සැපයිය හැක; සීමා මාධ්ය
කාලසීමාවට ගැළපෙන ලෙස සීමා කෙරේ, ප්රතිලෝම හෝ සීමිත නොවන කවුළු ප්රතික්ෂේප කෙරේ, සහ සියලුම නියැදිගත කිරීමේ
ප්රතිපත්ති ක්රියාත්මක වන්නේ සාමාන්යකරණය කළ අන්තරය තුළ පමණි. ප්රතිඵලයක් ලෙස ලැබෙන
කවුළුව නියැදිගත කිරීමේ පාරදත්ත සහ විශ්වාස නොකළ විස්තර
උපසර්ගය තුළ ඇතුළත් කෙරෙන බැවින්, පහළ ප්රවාහයේ ආකෘතිවලට නාභිගත උපුටනයක් සම්පූර්ණ
කාලරේඛාවෙන් වෙන්කර හඳුනාගත හැක.

අර්ථමය ශීර්ෂපාඨ නාභිගත කිරීම වෙනම, පැහැදිලි සැකසුමකි. පෙරනිමි `full`
විශ්ලේෂණ ප්රකාරය පවතින රාමු ප්රේරකය ආරක්ෂා කරන අතර කිසිවිටෙක ඉල්ලීම්
පෙළ ශීර්ෂපාඨ ආකෘතියට යොමු නොකරයි. `focused` ප්රකාරයේදී, පාලම එම Chat හෝ Responses
කන්ටේනරයෙන් පරිශීලකයා විසින් ලියන ලද නවතම හිස් නොවන `text`/`input_text` පමණක්
කියවා, එය NFC වෙත සාමාන්යකරණය කර, පාලන අක්ෂර සහ හිස් ඉඩ
සංකෝචනය කර, Unicode කේත ලක්ෂ්ය 500කට සීමා කරයි. හිස් ප්රතිඵලයක්
හරියටම `full` ප්රේරකය වෙත පසුබසී. භාවිත කළ හැකි ඉඟියක් වෙන් කළ
විශ්වාස නොකළ-පරිශීලක-සන්දර්භ කොටසක JSON ලෙස අනුක්රමිකකරණය කරන අතර, එයට ප්රමුඛත්වය දිය හැක්කේ
නිරීක්ෂණය කළ හැකි විස්තරවලට පමණි; මාධ්යය තුළ දෘශ්යමාන
හෝ ශ්රව්ය උපදෙස් අනුගමනය නොකිරීම පිළිබඳ වෙනම අනතුරු ඇඟවීම එයට අභිබවා යා නොහැක.
පෙළමය නාභිගත කිරීම කිසිවිටෙක `start`/`end` අනුමාන නොකරන අතර
කාලානුක්රමික නියැදිකරුව වෙනස් නොකරයි.

#### FU-07 ව්යුහාත්මක කොටස් සාක්ෂි

`segment_aware` දැනටමත් වලංගු කර ඇති දේශීය වීඩියෝ ප්රවාහය මත සීමා කරන ලද එක් පූර්ව-විශ්ලේෂණ
වාරයක් භාවිත කරයි. ස්ථාවර පෙරහන් දාමය පළමුව පළල උපරිම පික්සල 320ක් වන ලෙස
පරිමාණගත කර, දර්ශන වෙනස්කම් සහ නිශ්චල අන්තර හඳුනාගෙන, අනතුරුව බොඳ බව, සාමාන්ය දීප්තිය,
සහ අවකාශීය/කාලානුක්රමික තොරතුරු සඳහා තත්පරයකට රාමු 1 බැගින් නියැදිගත කරයි. එම වාරය
ව්යුහාත්මක නියැදි 600කට, එක් FFmpeg/පෙරහන් ත්රෙඩයකට, එම
`file`-පමණක් වන ප්රොටෝකෝල සහ කන්ටේනර් අවසර ලැයිස්තුවලට, 1 MiB ක්රියාවලි-ප්රතිදාන සීමාවකට,
සහ බ්රෝකරයේ හවුල් අත්හැරීමේ/අවසන් කාලසීමාව තුළ උපරිම තත්පර 30කට සීමා වේ. එය කිසිවිටෙක
ඉල්ලීමෙන් විධානයක්, පෙරහනක්, මාර්ගයක්, හෝ URL එකක් පිළිගන්නේ නැත.

ව්යුහාත්මක අගයන් නියතවාදී නියැදිගත කිරීමේ සාක්ෂි මිස අර්ථමය වීඩියෝ
අවබෝධයක් නොවේ. ඒවා විෂයයන්, ක්රියා, ශීර්ෂපාඨ, කථනය, හෝ පරිශීලක
අභිප්රාය අනුමාන නොකරයි. දර්ශන සහ නිශ්චල සීමාවන් කොටස් සාදයි; නිශ්චල ආවරණය, බොඳ බව,
නිරාවරණය, අවකාශීය විස්තර, සහ කාලානුක්රමික වෙනස්කම් බලපාන්නේ පවතින
රාමු 1–16 අයවැය වෙන් කරන ආකාරයට පමණි. සම්පූර්ණයෙන් නිශ්චල කොටසක් එක් රාමුවකට සීමා කරන අතර,
නිශ්චල නොවන කොටස් ඉතිරි අයවැය සඳහා තරග කරයි. සීමා ගණන
රාමු ගණන ඉක්මවන විට, වේගවත් මුල් කැපුම් නිසා දිගු අවසන් කොටසක්
සැඟවී නොයන පරිදි ඒකාකාර කාලරේඛා ආවරණය පවත්වා ගනී. නිශ්චල සීමාවක තත්පර 1ක
විශ්ලේෂණ විභේදනය තුළ ඇති දර්ශන සීමා ඒකාබද්ධ කරයි.

පෙරහන් නොමැති වීම, විකෘති/හිස් සාක්ෂි, අනාවරක දෝෂයක්, හෝ සීමා කළ
පූර්ව-විශ්ලේෂණ කාලසීමාව ඉක්මවීම, හරියටම ඒකාකාර මධ්ය ලක්ෂ්ය ප්රතිපත්තිය වෙත විවෘතව පසුබසී. කැඳවුම්කරුගේ
අත්හැරීමක් හෝ බ්රෝකරයේ අවසන් කාලසීමාවක් විවෘතව පසුබසින්නේ නැත: එය ක්රියාත්මක වෙමින් පවතින
උපක්රියාවලිය අවසන් කර, පසුකාලීන රාමු නිස්සාරණය වළක්වන අතර, පුද්ගලික තාවකාලික ගොනු වෘක්ෂය
`finally` තුළ ඉවත් කරයි.

`scripts/perf/video-bridge-fu07-eval.ts` අනුපිටපත් ඉවත් කිරීමෙන් පසු ශීර්ෂපාඨ-ඇමතුම් ඉතිරි කිරීම්,
ඝන-චලන අයවැය වෙන් කිරීම, බොඳ බව/නිරාවරණය/SI-TI සාක්ෂි, දිගු අවසානයක් සහිත වේගවත් කැපුම්,
සහ ක්රමික-වියැකීමේ ව්යාජ ධනාත්මක සඳහා නියතවාදී සැබෑ FFmpeg
පරීක්ෂණ දත්ත ජනනය කරයි. එය පූර්ව-විශ්ලේෂණ සැබෑ ගත වූ කාලය සහ, `/usr/bin/time`
ලබාගත හැකි විට, උප ක්රියාවලියේ CPU සහ උපරිම RSS සටහන් කරයි. එහි තත්ත්ව පරීක්ෂා
ව්යුහාත්මක ඔරකල් පමණි. මෙම පරීක්ෂණ පද්ධතියට බලයලත්
අන්ත ලක්ෂ්යයක් හෝ ස්ථාවර කළ විනිශ්චයකරුවෙකු නොමැති බැවින්, සැබෑ ශීර්ෂපාඨ-ආකෘති තත්ත්වය `HOLD` ලෙස පවතී. එක් ඇමතුමකට
පැහැදිලි ධනාත්මක පිරිවැය ඇස්තමේන්තුවක් `--caption-cost-per-call-usd` මඟින් සපයන්නේ නම් හැර,
මූල්යමය ඉතිරි කිරීම් ද `HOLD` ලෙස පවතී; ස්ක්රිප්ටය කිසිවිටෙක එම ප්රතිඵල දෙකෙන් එකක්වත්
කෘත්රිමව නිර්මාණය නොකරයි.

සෑම ෆ්රේම් එකක්ම 4 MiB දක්වා සීමා කර ඇති අතර, සියලුම අමු ෆ්රේම් එකතුව 23 MiB දක්වාත්, serialized බ්රෝකර් ප්රතිචාරය 32 MiB දක්වාත් සීමා කර ඇත. පුද්ගලික තාවකාලික නාමාවලියක් `finally` තුළ ඉවත් කරනු ලැබේ. OmniRoute විසින් FFmpeg ඇසුරුම් කර නොමැති අතර අභිරුචි executable path එකක් පිළිගන්නේ නැත. කැප්ෂනිං වලට පෙර, බ්රිජ් එක කොන්දොස්තරාත්මක දෘශ්ය අනුපිටපත්-ඉවත්කිරීමේ පාස් එකක් යොදයි: සෑම JPEG එකක්ම 16×16 අළුපැහැ buffer එකකට අඩු කරනු ලබන අතර අවසන් වරට රඳවාගත් ෆ්රේම් එක සමඟ පමණක් සංසන්දනය කරනු ලැබේ. එක් ෆ්රේම් එකකට වඩා ඉහළ ඉල්ලා ඇති කැප්ෂන් අයවැය සඳහා, extraction එක එම අයවැයේ දෙගුණයක් දක්වා සහ කිසිවිටෙක ෆ්රේම් 16 කට වඩා නොවන සීමිත candidate pool එකක් සපයයි. ඉල්ලා ඇති සීමාව අනුපිටපත් ඉවත්කිරීමෙන් පසුව පමණක් යොදනු ලැබේ; අයවැය අවම වශයෙන් දෙකක් වූ විට අවසාන thinning එක අතරතුර පළමු සහ අවසාන තෝරාගත් candidates ආරක්ෂා කරනු ලැබේ. අනුවාදිත
`grayscale-16x16-mean-cells-v2` ප්රතිපත්තිය mean luma delta සහ normalized delta අගය අවම වශයෙන් 0.05 වන thumbnail cells වල අනුපාතයෙන් විශාලතම එක භාවිතා කරයි. අනුපිටපත් සීමාව නියතය 0.04 වන අතර, runtime සැකසුමක් ලෙස නිරාවරණය කිරීම වෙනුවට පුරෝකථනය කළ හැකි බව සඳහා තෝරාගෙන ඇත. මෙම ද්විතීයික
ඉහළ-විරෝධී සංකේතය mean-පමණක් සංසන්දනයකට සැඟවිය හැකි කුඩා චලනයන් සහ දෘශ්යමාන-පෙළ වෙනස්කම් ආරක්ෂා කරයි. Comparator හෝ decoder දෝෂ fail-open ලෙස හැසිරී ආවරණය රඳවා තබයි. ප්රතිදාන මෙටාඩේටා විසින් උපුටාගත් candidates, සාර්ථකව භාවිතා කළ ෆ්රේම් සහ අතහැර දැමූ දෘශ්ය අනුපිටපත් වෙනම වෙන් කරයි.

පැහැදිලිව සලකුණු කළ video part එකකට timestamped contact sheet එකක් ඉල්ලිය හැක. බ්රිජ් එක උපරිමයෙන් 4-තීරු, ෆ්රේම්-16 JPEG ජාලයක් සාදයි. සෑම 512-පික්සල් cell එකක්ම එහි මූලාශ්ර timestamp එක ඉහළ-විරෝධී පහළ කලාපයකට පුළුස්සා දමන අතර, එමම timestamps downstream සම්බන්ධතා සහ විගණන සඳහා පෙළ මෙටාඩේටා තුළ පවතී. සම්පූර්ණ JPEG එක 32 MiB දක්වා සීමා කර ඇති ලෙසම පවතී. `sharp` හට ජාලය decode හෝ compose කළ නොහැකි නම්, බ්රිජ් එක තනි JPEG ෆ්රේම් වෙත ආපසු යයි; client abort එකක් තවමත් sheet operation එක හරහා පතිරවයි.

Promotion සාක්ෂි අභිප්රේරිතවම synthetic composition microbenchmark එකෙන් වෙන් කර ඇත.
`scripts/perf/video-bridge-contact-sheet-eval.ts` සැබෑ OpenAI-අනුකූල vision models සඳහා schema-අනුවාදිත A/B harness එකක් නිර්වචනය කරයි. එය provider-වාර්තාකළ ටෝකන, end-to-end wall ප්රමාදය (sheet composition ඇතුළුව), model-call ගණන සහ manifest-නිර්වචිත fact retention මනියි. අමු model ප්රතිචාර වාර්තාවට ලියනු නොලැබේ; SHA-256 digests සහ ගැලපෙන fact IDs පමණක් රඳවා තබාගැනේ. `--execute-real` යැවූ විට සහ `--model`, `OMNIROUTE_BASE_URL`, සහ `OMNIROUTE_API_KEY` configure කර ඇති විට මිසක් harness එක network හෝ ගෙවන ලද model call නොකරයි. එම පැහැදිලි සැබෑ run එක නොමැතිව, එහි යන්ත්ර-කියවිය හැකි නිගමනය `HOLD` ලෙස පවතී; synthetic payload/call-count මිනුම් පමණක් promotion සාක්ෂි නොවේ.

Callers හට දැනටමත් පෙළගැස්වූ පෙළ ඇති විට සහාය දක්වන video part එකකට විකල්ප `transcript.cues` array එකක් අමුණා යොදිය හැක. සෑම cue එකක්ම `text`, probe කළ කාලසීමාව තුළ සීමිත `start`/`end` කාල පරාසයක්, සහ whitelisted `source` එකක් (`client`, `embedded`, හෝ `audio-bridge`) රැගෙන යා යුතුය; `confidence` පෙරනිමි ලෙස `1` වන අතර `0` සහ `1` අතරම තිබිය යුතුය. හරියටම අනුපිටපත් cues හකුළා දමනු ලැබේ. OmniRoute කිසිවිටෙක මෙම මෙටාඩේටා වලින් transcription ආරම්භ නොකරයි: වලංගු කළ cues, source, confidence සහ interval සමඟ විස්තර කළ ප්රතිඵලයට පිටපත් කරනු ලබන අතර ෆ්රේම් කැප්ෂන් සමඟින් අවිශ්වාසදායක නිරීක්ෂණ ලෙස render කරනු ලැබේ. අවලංගු, පරාසයෙන් පිටත, හෝ මූලෝත්පත්තියක් නැති පෙළ කැප්ෂන් ප්රවාහයට මිශ්ර කිරීම වෙනුවට ප්රතික්ෂේප කරනු ලැබේ. request-body transcript නාලිකා දෙකම සැපයූ මූලෝත්පත්තිය `client` වෙත normalize කරයි, ස්වයං-ඉදිරිපත්කළ `embedded` හෝ `audio-bridge` labels ද ඇතුළුව. server-හිමි adapter එකකට පමණක් code-පමණක් `trustedSource` argument එක හරහා එම විශ්වාසදායක labels පැවරිය හැක; request JSON field එකකට එම argument එකට ළඟා විය නොහැක. Transcript පෙළ, එහි මූලෝත්පත්තිය නොසලකා, අවිශ්වාසදායක media-ව්යුත්පන්න අන්තර්ගතය ලෙස පවතින අතර කිසිවිටෙක බලයලත්කම තීරණය නොකළ යුතුය.

උසස් caller කෙනෙකුට එම video එක සඳහා `audioTranscript` track එකක් සැපයිය හැක; එය client-සැපයූ පෙළ ලෙස සලකනු ලබන අතර server transcription එකේ සාක්ෂියක් නොවේ. fusion seam එක එක් deadline සහ abort signal එකක් යටතේ දෘශ්ය සහ ශ්රව්ය නිරීක්ෂණ ක්රියාත්මක කර, පොදු timeline එකක පිළිවෙළකට සකසා, හරියටම අනුපිටපත් හකුළා දමා, එක් පැත්තක් පමණක් සාර්ථක වූ විට partial ප්රතිඵලයක් වාර්තා කරයි. අවලංගු `audioTranscript` එකක් සම්පූර්ණ video එක අසාර්ථක කිරීම වෙනුවට එම partial ප්රතිඵලයට පහත වැටේ — දෘශ්ය විස්තරය රඳවා තබාගෙන audio ශාඛාව sanitized failure code එකක් සටහන් කරයි. ශාඛා-එකකට ලබාගත හැකිබව, partial flag එක සහ sanitized failure codes විස්තර කළ ප්රතිඵලයේ, guardrail මෙටාඩේටා (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), result-cache මෙටාඩේටා සහ බ්රිජ් fusion counters හි ආරක්ෂා කර ඇත. පෙරනිමි Video Bridge path එක speech-to-text නොකැඳවන අතර දෙවන media පිටපතක් download නොකරයි; එම පැහැදිලි track එක නොමැතිව, එය video-පමණක් ලෙස පවතී.

**ට්රාන්ස්ක්රිප්ට් රඳවා තබා ගැනීම (#12150 P1).** Video Bridge (එයම opt-in වූ) transcript cue එකක් render කරන සෑම විටෙකම මෙය ස්වයංක්රීයව අදාළ වේ — වෙනම retention flag එකක් නොමැත. Request එකක් යම් transcript cue එකක් render කරන විට (caller විසින් declare කරන ලද `transcript` එකක් හෝ ඒකාබද්ධ කරන ලද `audioTranscript` එකක්), guardrail එය `videoBridgeObserved` ලෙස සලකුණු කර, video description එකේ redact කරන ලද shadow එකක් ජනනය කරයි — සෑම cue එකකම free-text body එක `[redacted-video-transcript]` මගින් ප්රතිස්ථාපනය කරන ලද සමාන rendering එකක් වන අතර, එය string එක එකලස් කිරීමට පෙර structured cue field එක ආදේශ කිරීමෙන් ගොඩනගනු ලැබේ (flattened text එක parse කිරීමෙන් කිසිවිටෙක නොව, එබැවින් කිසිදු cue අන්තර්ගතයක් — adversarial හෝ සාමාන්ය, `]` අඩංගු `[inaudible]`/`[music]` වැනි bodies ඇතුළුව — ඉතිරි විය නොහැක). Persist කරන ලද call-log request body එක එක් එක් video-derived text part එක එම redact කරන ලද shadow එක සමඟ මාරු කරයි, අන්තර්ගත සමානාත්මතාවයෙන් ගැලපේ; `fullText` anchor එක අවසන් වූ pre-call guardrail payload එකෙන් නැවත කියවනු ලැබේ, එබැවින් පසුකාලීන chain guardrails (PII සහ credential maskers, ප්රමුඛතා 10/95) description text එක ස්ථානයේම නැවත ලිවීමෙන් පසුවත් system-prompt/handoff/memory injection එක message array එක නැවත හැඩගැස්වීමෙන් පසුවත් ගැලපීම තවමත් සාර්ථක වේ. Model එකට upstream යවන body එක වෙනස් නොවේ. Observed request එකක් කිසිදු durable Memory එකක් පුරවන්නේ නැත (request- සහ response-derived extraction දෙකම මඟ හරිනු ලැබේ), එබැවින් model එකේම පිළිතුරට transcript text එක Memory එකට echo කළ නොහැක.

**අමු video fields (#12430).** Bridge එක සක්රීය කර ඇති අතර native video support නොදන්නා හෝ නොමැති විට, define කරන ලද `transcript`/`audioTranscript` fields ද `videoBridgeObserved` සක්රීය කරයි, description අසාර්ථකත්වයකට හෝ `maxVideos` සීමාවකට පසුව පවා. `null` සහ හිස් strings ගණන් ගැනේ; නොමැති fields සහ non-video metadata ගණන් නොගැනේ. Retain කරන ලද පිටපත් මෙම fields redact කරයි හෝ request එක මඟ හරින අතර, caches/Memory bypass කෙරේ.

එම fallback paths මත, වලංගු caller cues nonstandard provider fields වෙනුවට support කරන ලද `text`/`input_text` parts බවට පත් වේ. Request-supplied tracks දෙකම untrusted `client` observations ලෙස පවතින අතර, video එක describe කර නොමැති බවට සහ timestamps media එකට එරෙහිව verify කර නොමැති බවට පැහැදිලි අනතුරු ඇඟවීමක් සමඟ. පවතින 256-cue/64-KiB සමස්ත සහ per-cue budgets tracks දෙක එකට හරහා අදාළ වේ; timestamps broker ගේ තත්පර-600 ceiling එකට සහ සපයන ලද ඕනෑම focus window එකකට ගැලපිය යුතුය. Invalid tracks ඉවතලනු ලැබේ, arbitrary text ලෙස forward නොකෙරේ; ඒවායේ ඒකාබද්ධ budget එක ඉක්මවා නොගියේ නම් වලංගු sibling එකක් තවමත් භාවිතා කළ හැක. Null/empty fields කිසිදු text එකක් එකතු නොකරයි. මෙම fallback මගින් media fetch හෝ transcription එකක් එකතු නොකෙරේ. Transcript extension fields fallback video carrier එකෙන් සහ එහි `video_url`/`source` objects වලින් ඉවත් කරනු ලැබේ. OpenAI wire allowlist දැඩි ලෙස පවතී; unknown-native video carriers ලබාගත හැකි ලෙස පවතින අතර known text-only targets ආරක්ෂිත markers රඳවා ගනී. Structured redaction shadows එකතු කරන ලද transcript text ආරක්ෂා කරන අතර, මුල් caller-owned request එක වෙනස් නොවී පවතී. Native-supported targets සහ disabled bridges ඒවායේ පවතින bypass හැසිරීම රඳවා ගනී.

අමතර retain කරන ලද පිටපත් එකම observed-request signal එක භාවිතා කරයි. Raw pre-guardrail client-request snapshot, in-memory pending request, සහ early rejected-request log යන ඒවා video parts වල transcript fields ව්යුහාත්මකව ප්රතිස්ථාපනය කරයි; pipeline stages සහ context handoff මගින් synthesize කරන ලද string prompts persisted-request-body sink එකේදී redact කෙරේ. Persist කරන ලද `video_content_removed` marker එක, හිතාමතා ඉවතලන ලද text නැවත ගොඩනැගීම වෙනුවට, `previous_response_id` continuation එක fail closed වීමට සලස්වයි. Observed request එකක් logging ට පෙර එහි per-part redaction shadow එක අහිමි වුවහොත්, හෝ පසුකාලීන request mutations වලට පසු video shadows කිහිපයකින් එකක් හෝ ගැලපීමට අසාර්ථක වුවහොත්, අර්ධ ලෙස redact කරන ලද transcript එකක් රඳවා තබා ගැනීම වෙනුවට retained request body එක සම්පූර්ණයෙන්ම මඟ හරිනු ලැබේ.

Observed request එකක් සඳහා, model response එකක් structured cue boundary එකක් නොමැතිව transcript එකේ ඕනෑම කොටසක් quote කළ හැක. එහි persist කරන ලද call-log `responseBody` ඒ නිසා omission marker එකකින් ප්රතිස්ථාපනය කෙරේ; සවිස්තරාත්මක pipeline artifact (upstream/client bodies සහ stream chunks ඇතුළත් විය හැක) retain නොකෙරේ. Semantic, idempotency, සහ reasoning-replay caches එම request එක සඳහා reads සහ writes bypass කරයි. Provider request සහ client-visible response වෙනස් නොවී පවතී. සවිස්තරාත්මක artifact එක මඟ හරින විට early keepalive bytes temporary buffer එකෙන් drain කෙරේ. Kiro ගේ malformed EventStream warning payload byte count එක පමණක් වාර්තා කරයි, එහි අන්තර්ගතය හෝ JSON parser එකේ raw error කිසිවිටෙක නොව. අසම්බන්ධ සෑම provider/plugin diagnostic එකක්ම audit කර ඇති බව මෙය ප්රකාශ නොකරයි; පුළුල් retained-sink sweep එක #11658 හි track කෙරේ.

අභ්යන්තර `/api/modality-bridge/video/drilldown` lifecycle එක වෙනම, loopback/token-authenticated cache substrate එකකි. සෑම operation එකකටම canonical opaque principal ID එකක්ද අවශ්ය වේ. Production caller එකක් සක්රීය කිරීමට පෙර, එය එම ID එක authenticated tenant එකෙන් derive කළ යුතු අතර client-selected value එකක් කිසිවිටෙක forward නොකළ යුතුය. Cache keys එම principal එක canonical session සහ video-reference IDs වලට බැඳ තබයි, ඒවායේ SHA-256-derived keys පමණක් ගබඩා කරයි, සහ reads සහ deletion දෙකම එකම principal එකට scope කරයි. Cache එක entry එකකට උපරිමය වශයෙන් derived JPEG frames 16 ක් ගබඩා කරයි, මිනිත්තු දහයකට පසු ඒවා expire කරයි, සහ bounded `start`/`end` reads හෝ explicit session deletion සඳහා සහාය දක්වයි.

සෑම principal එකක්ම entries 16 කට සහ canonical JPEG දත්ත MiB 64 කට සීමා වේ. එම සීමා global 64-entry/256 MiB ceiling එකෙන් ස්වාධීන වේ: global LRU eviction සලකා බැලීමට පෙර principal quota පීඩනය එම principal එකේ least-recently-used entries පමණක් evict කරයි. Expired entries cache ක්රියාකාරීත්වය මත principal සහ global accounting දෙකෙන්ම ඉවත් කරනු ලැබේ, නමුත් cancellation සහ validation අසාර්ථකත්වය අර්ධ replacement එකක් commit නොකරයි.

කෑෂ් එක non-canonical Base64, අතිරික්ත padding, JPEG නොවන මාධ්ය, දෝෂ සහිත හෝ කපා දමන ලද (truncated) JPEG, සහ සීමිත සම්පූර්ණ-රූප `sharp` විකේතනයක් අතරතුර අවවාදයක් ජනනය කරන JPEG ප්රතික්ෂේප කරයි. එය පිළිගත් සෑම රූපයක්ම canonical JPEG ලෙස නැවත කේතනය කරයි, caller ක්ෂේත්ර විශ්වාස කිරීම වෙනුවට විකේතනය කළ බයිට් වලින් පළල සහ උස ලබා ගනී, සහ ඒවා රඳවා තබා ගැනීම වෙනුවට පසුපස පැමිණෙන (trailing) polyglot බයිට් ඉවත දමයි. සීමිත canonical සම්පීඩිත buffer එක පමණක් කෝටා දෙකටම ගණන් ගැනේ. JSON wire සීමාවට 32 MiB විකේතනය-කළ-ආදාන උපරිමය සඳහා Base64 overhead ද ඇතුළත් වේ. ගබඩා කරන ලද සෑම
derivation එකක්ම එහි වලංගු කළ JPEG ආකෘතිය/විභේදනය, sampling policy,
derivation version, නිර්මාණ වේලාව, සේවාදායකය විසින් ගණනය කළ content hash, සහ hash කළ parent reference — ඊට අමතරව විශ්වාසදායක caller ගේ parent-content hash — සටහන් කරයි. atomic cache commit එකට පෙර අසමමුහුර්ත decode/hash අදියර අතර අවලංගු කිරීම (cancellation) පරීක්ෂා කෙරේ.

මෙම කොටස (tranche) තවම route එකට production producer එකක් සම්බන්ධ නොකරයි, සහ බහු-විභේදන variant තේරීමක් ලබා නොදෙයි. එබැවින් විනිවිද පෙනෙන Video Bridge ඉල්ලීම් මාවතට අමතර වැඩක් එකතු නොවේ, අතර tenant-bound principal derivation සහ සම්පූර්ණ FU-08 බහු-විභේදන ජීවන චක්රය සම්පූර්ණ හැසිරීමක් ලෙස ලේඛනගත කිරීම වෙනුවට පැහැදිලි පසුවිපරම් වැඩ ලෙස පවතී.

රාමු (frames) වින්යාසගත Video ආකෘතියෙන් අනුක්රමිකව caption කරනු ලැබේ. හිස් Video override එකක් Vision සැකසුම උරුමයෙන් ලබා ගනී; දෙකම හිස් නම්, Vision auto-router එක සක්රීය vision-හැකි ආකෘතිය තෝරයි. සාර්ථක captions මුල් part එක ස්ථාවර `[Video description:` උපසර්ගයකින් ප්රතිස්ථාපනය කරයි; එය පාඨය විශ්වාස-නොකළ මාධ්ය-ව්යුත්පන්න නිරීක්ෂණයක් ලෙසත් සලකුණු කරයි, සහ මාධ්යයේ ඇති උපදෙස් අනුගමනය නොකරන ලෙස downstream ආකෘති වලට කියයි. රාමු-caption cache යතුරු වලට JPEG බයිට්, prompt, timestamp, සහ සක්රීය ආකෘතිය ඇතුළත් වේ; සාර්ථක captions පමණක් cache කෙරේ. Cache entries සත්ය සාර්ථක producer ආකෘතිය — fallback ආකෘතියක් ඇතුළුව — රඳවා තබයි; විවිධ රාමු විවිධ ආකෘති වලින් නිපදවූ විට bridge එක `mixed` ලෙස වාර්තා කරයි. cache hit එකකදී එම producer අනන්යතාව ඉල්ලූ routing plan ලෙස නැවත ලේබල් කිරීම වෙනුවට නැවත භාවිතා කරයි. සම්පූර්ණ-වීඩියෝ ප්රතිඵල cache එක ප්රතිදානය වෙනස් කරන සෑම ආදානයකින්ම යතුරු කර ඇත — prompt, සක්රීය ආකෘතිය, sampling policy, frame ගණන, semantic analysis mode, සාමාන්යකරණය කළ focus hint එකේ SHA-256 fingerprint, focus window, `transcript`, `audioTranscript`, සහ contact-sheet flag — එබැවින් එම මානයන්ගෙන් එකක් වෙනස් කිරීම cache miss එකකි, කිසිවිටෙක මිහිරි (stale) නැවත-භාවිතයක් නොවේ. visual dedup policy version, threshold, සහ සීමිත candidate-frame ගණන ද result-cache යතුරේ සහ metadata හි පැහැදිලිය; එබැවින් policy වෙනසක් මඟින් මිහිරි සම්පූර්ණ-වීඩියෝ විස්තරයක් නැවත භාවිතා කළ නොහැක. Result-cache v4 metadata මඟින් mode සහ fingerprint පමණක් තබා ගනී, කිසිවිටෙක අමු user task එක නොවේ. Guardrail metadata ඉල්ලූ සහ සක්රීය analysis modes දෙකම වාර්තා කරයි; භාවිතා කළ හැකි user text නොමැතිව ඉල්ලූ `focused` mode එක සක්රීයව `full` ලෙස වාර්තා වේ.

guardrail එක සහාය දක්නා සෑම video part එකක්ම උපුටා ගනී, නමුත්
`modalityBridgeVideoMaxVideos` ට වැඩි ගණනක් විස්තර නොකරයි.
`supportsVideo === false` බව ඔප්පු වූ target එකක් සඳහා, අසාර්ථක සහ සීමාව ඉක්මවූ videos පැහැදිලි ආරක්ෂිත text markers බවට පත් වේ, එවිට කිසිදු අමු video එකක් ඉතිරි නොවේ. හැකියාව නොදන්නා විට, එම parts ඒවායේ video carrier එක රඳවා තබයි; ඕනෑම fallback transcript එකක් ඉහත සීමිත text පරිවර්තනය අනුගමනය කරයි. `supportsVideo === true` සහිත targets bridge එක මඟ හරිනු ලැබේ. client ඉල්ලීම් abort signal එක බාගැනීම, broker queue, subprocesses, සහ caption calls හරහා පැතිරේ; aborts videos අතර නතර වේ සහ කිසිවිටෙක අමු මාධ්ය වෙත fail open නොවේ.

Runtime settings DB-පදනම් වූ සහ Zod-වලංගුකරණය කළ ඒවාය:

| Key                                 | Default     | Range / behavior                                                                                        |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | විකල්ප runtime, opt-in                                                                                  |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` සාමාන්ය captions ආරක්ෂා කරයි; `focused` සීමිත, විශ්වාස-නොකළ නවතම-user සන්දර්භය භාවිතා කරයි       |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge ආකෘතිය උරුමයෙන් ලබා ගනී                                                                   |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                    |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, හෝ සමානුපාතික `segment_aware`; detector අසාර්ථකත්වය `uniform` වෙත fallback වේ |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                     |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                          |

තත්පර 120 ට වැඩි පැරණි (legacy) ගබඩා කළ Video timeout අගයන් broker deadline එකට clamp කෙරේ; එම සීමාව ඉක්මවන නව settings ලිවීම් ප්රතික්ෂේප කෙරේ.
`GET /api/modality-bridge/video/runtime` සඳහා authentication හෝ runtime probing ට පෙර විශ්වාසදායක stamped loopback locality අවශ්ය වේ, ඉන්පසු management auth අවශ්ය වේ. එය `available`, සනීපාරක්ෂිත (sanitized) FFmpeg/ffprobe අනුවාද, සහ runtime එක ලබා ගත නොහැකි විට ස්ථාවර හේතුවක් පමණක් ලබා දෙයි. අභ්යන්තර extraction endpoint එක පොදු upload API එකක් නොවේ: queue තෘප්තිය `503` සහ `Retry-After` ලබා දෙයි, caller විසන්ධි වීමක් `499` ලබා දෙයි, සහ ස්ථාවර broker deadline එක `504` ලබා දෙයි. පරිවර්තනය කළ responses Vision හෝ Audio segments ඉවත් නොකර මධ්යගත
`x-omniroute-modality-bridge` header එකට `video->text;model=<visionModel>;parts=<videos>` එකතු කරයි.

### PII Masker (`piiMasker.ts`)

අදියර **දෙකේම** ක්රියාත්මක වේ.

- **`preCall`** payload එක clone කර, `system`, `messages`, `input`, සහ
  `prompt` (plain string items ඇතුළුව) හරහා ගොස්, string `content`/`text`
  fields වලට `processPII()` (`@/shared/utils/inputSanitizer` වෙතින්) යොදයි.
  `PII_REDACTION_ENABLED=true` විට, හඳුනාගත් PII outbound payload එකේ redact
  කෙරේ. මෙය `INPUT_SANITIZER_MODE` වෙතින් ස්වාධීන වේ (එය prompt-injection
  policy පමණක් පාලනය කරයි). Redaction අක්රිය විට, call එක content නැවත
  ලිවීමෙන් තොරව detection counts සටහන් කරයි.
- **`postCall`** response එක deep-clone කර, `sanitizePIIResponse()` සමඟ
  Responses-API-shape masker එක (`maskResponsesOutput` — `output_text` සහ
  `output[].content[].text` ආවරණය කරයි) ධාවනය කරයි. යම් redaction එකක් සිදු
  වූවහොත්, වෙනස් කළ response එක මුල් එක වෙනුවට ආදේශ වේ.

Guardrail එක කවදාවත් block නොකරයි; එය annotate (`meta.detections`,
`meta.redacted`) හෝ rewrite පමණක් කරයි.

#### වර්ගය අනුව තේරීම, custom patterns සහ detection counters

**Dashboard → Settings → Security → PII masking** මඟින් mask කරන්නේ _කුමක්ද_
යන්න තෝරයි. එය masking සක්රිය නොකරයි: එය තවමත් `PII_REDACTION_ENABLED`
(request) සහ `PII_RESPONSE_SANITIZATION` (response + SSE) වන අතර, දෙකම
පෙරනිමියෙන් අක්රියයි.

- **වර්ගය අනුව තේරීම** — built-in ids `src/shared/constants/piiTypes.ts`
  (`PII_BUILTIN_TYPES`) හි ලැයිස්තුගත කර ඇත. Unset යනු සෑම වර්ගයක්ම (මෙම
  setting පැවතීමට පෙර හැසිරීම). Request engine එකේ `ssn_us` pattern එක `ssn`
  වෙත map වේ. Templates (Minimal, Standard, Financial, Brazilian, USA, Full)
  UI හි checkboxes පුරවනු පමණක් ලබයි.
- **Custom patterns** — regex හෝ wildcard patterns 20ක් දක්වා (`*` =
  non-whitespace අක්ෂර 64ක් දක්වා, `?` = එකක්). Matches `[CUSTOM_REDACTED]`
  බවට පත්වේ. සෑම pattern එකක්ම `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`) හරහා යයි: උපරිමයෙන් අක්ෂර 500ක්,
  flags `g i m s u` ට සීමා වේ, compile විය යුතුය, `safe-regex` (catastrophic
  backtracking) pass විය යුතුය, සහ empty string එකක් හෝ redaction placeholder
  එකක් match නොකළ යුතුය. අසමත් වන pattern එකක් save කිරීමේදී සහ test කිරීමේදී
  ප්රතික්ෂේප වේ, සහ අසමත් වන stored row එකක් runtime හිදී compile වෙනුවට
  මඟහරිනු ලැබේ. Custom patterns ධාවනය වන්නේ masking සක්රිය වී ඇති අවස්ථාවේ
  පමණි.
- **Detection counters** — per-type counts (matched values නොවේ), memory හි
  තබා restart මත reset වේ (`src/lib/pii/piiDetectionStats.ts`). ඒවා වැඩි වන්නේ
  masking සක්රිය වී ඇති අවස්ථාවේ පමණි.

Settings `key_value` table එකේ (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) තබා ඇති අතර 1 s cache එකක් හරහා කියවනු ලැබේ. API:

| ක්රමය  | මාර්ගය                   | අරමුණ                                                                     |
| ------ | ------------------------ | ------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Flag තත්ත්වය, `enabledTypes`, `customPatterns`, detection counters        |
| `PUT`  | `/api/settings/pii`      | `enabledTypes` (`null` = සියල්ල) සහ/හෝ `customPatterns` ආදේශ කරයි         |
| `POST` | `/api/settings/pii/test` | උපරිම 8 KB ක sample එකකට එක් pattern එකක් dry-run කරයි; කිසිවක් ගබඩා නොවේ |

තුනටම management auth අවශ්ය වන අතර body එක Zod
(`src/shared/validation/schemas/piiSettings.ts`) සමඟ validate කරයි.

### Prompt Injection (`promptInjection.ts`)

User-supplied content හි adversarial structures හඳුනාගෙන configured policy එක
බලාත්මක කරයි. Behavior එක environment variables සහ constructor options මඟින්
පාලනය වේ:

| සැකසීම      | Env var                                                                                               | පෙරනිමිය | බලපෑම                                                                                                                                                                               |
| ----------- | ----------------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| සක්රිය      | `INPUT_SANITIZER_ENABLED`                                                                             | `true`   | `false` විට, guardrail එක short-circuit වේ.                                                                                                                                         |
| Mode        | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`   | Injection policy: `block`, `warn`, හෝ `log`. (`redact` back-compat සඳහා පිළිගැනේ නමුත් injection text ඉවත් **නොකරයි**; request PII rewrite `PII_REDACTION_ENABLED` මඟින් පාලනය වේ.) |
| Block සීමාව | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Block කිරීමට අවශ්ය අවම severity එක. පෙරනිමියේදී Medium යනු observe-only ය.                                                                                                          |

**Mode ප්රමුඛතාව** (`getMode`): caller `options.mode` →
`INJECTION_GUARD_MODE` **DB feature-flag override** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. ඒ අනුව dashboard override එක env vars ට ඉහළින් ජය ගන්නා බැවින්,
Feature Flags UI ධාවනය වන guard එක සජීවීව (restart නොමැතිව) පාලනය කරයි. DB read
එක fail-safe ය: එය error වුවහොත්, guard එක env-based behavior වෙත ආපසු යන අතර,
override එකක් සකසා නොමැති විට behavior env-only resolution ට සමාන වේ.

Detection මූලාශ්ර:

1. `@/shared/utils/inputSanitizer` වෙතින් `sanitizeRequest()` (pipeline එකේ
   වෙනත් තැන්වල භාවිත වන shared detector කට්ටලය).
2. Built-in `DEFAULT_GUARD_PATTERNS` (දැනට `system_override_inline` සහ
   `markdown_system_block`, දෙකම `high` severity).
3. Constructor options හරහා ලබා දෙන Optional `customPatterns` (strings,
   regex, හෝ `{ name, pattern, severity }` records).

`mode === "block"` වන විට **සහ** අවම වශයෙන් එක් detection එකක් severity
threshold එක සපුරාලන විට, `preCall` විසින් `{ block: true, message: "Request rejected:
suspicious content detected" }` ආපසු ලබා දෙයි. `warn`/`log` modes වලදී guardrail එක
log කරන නමුත් call එකට ඉඩ දෙයි. Registry එක හරහා නොගොස් prompts ඇගයීමට අවශ්ය
callers සඳහා shared helper `evaluatePromptInjection()` ද export කර ඇත.

**ස්කෑන් සීමාව (v3.8.20):** detector එක එකතු කළ prompt පෙළෙන් **පළමු KB 16** පමණක්
පරීක්ෂා කරයි — `src/shared/utils/inputSanitizer.ts` හි `MAX_INJECTION_SCAN_BYTES = 16 * 1024`
(බයිට් 16 384). Pattern loop එක ධාවනය කිරීමට පෙර `detectInjection()` සහ
`evaluatePromptInjection()` යන දෙකම `slice(0, MAX_INJECTION_SCAN_BYTES)` කරයි. Injection
directives input එකක මුල අසලින්ම පිහිටා ඇති බැවින්, detection දුර්වල නොකරමින් KB සිය
ගණනක් ප්රමාණයේ payloads මත regex CPU/GC භාවිතය සීමා කරයි (බලන්න
#3932, #4041).

### අක්තපත්ර සැඟවුම්කරු (`credentialMasker.ts`)

Default chain එකේ අවසානයට (priority `95`) **stages දෙකෙහිම** ක්රියාත්මක වේ. Outbound
payload එකෙන් (පණිවිඩ අන්තර්ගතය, tool-call arguments, tool results) **සහ** provider
response එකෙන් ප්රසිද්ධ API-key / secret-token patterns සඟවයි, එබැවින් prompt එකකට
ඇලවූ (හෝ tool result එකක් මඟින් ආපසු echo කළ) අක්තපත්රයක් upstream provider වෙතට හෝ
client වෙත ආපසු කාන්දු නොවේ.

- **Opt-in පමණි**, PII සැඟවීමේ සම්ප්රදායටම සමාන (Hard Rule #20-ට ආසන්න):
  `settings.credentialRedactionEnabled === true` **හෝ**
  `CREDENTIAL_REDACTION_ENABLED=true` නොවේ නම් අක්රිය කර ඇත. එය අක්රිය විට, guardrail
  එක no-op එකකි — එය කිසිවිටෙක block නොකරයි සහ කිසිවිටෙක rewrite නොකරයි.
- `redactCredentials()` සම්පූර්ණ payload/response ගස (`walkValue()`,
  prototype-pollution-වලින් ආරක්ෂිත, `WeakSet` හරහා cycle-වලින් ආරක්ෂිත) ගවේෂණය කර,
  ගැලපීම් `[REDACTED:<type>]` placeholder එකකින් ප්රතිස්ථාපනය කරයි, සැබවින්ම වෙනස් වූ
  ශාඛා පමණක් clone කරමින්.
- `CREDENTIAL_PATTERNS` LLM provider keys (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokens (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), ගෙවීම් keys (Stripe, Square), cloud
  keys (AWS access key, Twilio, SendGrid, Mailgun), private keys / JWTs,
  අක්තපත්ර-සහිත connection strings (`mongodb://user:pass@...`, ආදී), සහ සාමාන්ය
  `Authorization`/`x-api-key`/`api-key`/`apikey` header-value pattern එක ආවරණය කරයි.
  Header-හැඩැති keys (`authorization`, `x-api-key`, `api-key`,
  `apikey`) සාමාන්ය text regex එක වෙනුවට ව්යුහාත්මකව (value එක පමණක්, `Bearer `/`Basic `
  වැනි scheme prefix එක සුරක්ෂිතව තබමින්) සඟවනු ලැබේ.
- Guardrail එක කිසිවිටෙක block නොකරයි; එය rewrite (`modifiedPayload` /
  `modifiedResponse`) සහ annotate (`meta.credentialsRedacted`, `meta.count`) කිරීම පමණක්
  කරයි.

Regression ආරක්ෂාව: `tests/unit/credential-masker-guardrail.test.ts`.

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
