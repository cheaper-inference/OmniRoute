# Guardrails (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **မူရင်းအမှန်တရား၏ ရင်းမြစ်:** `src/lib/guardrails/`
> **နောက်ဆုံးမွမ်းမံသည့်ရက်:** 2026-10-17 — v3.8.52 ([လွှမ်းခြုံမှုနှင့် ကန့်သတ်ချက်များ](#coverage-and-limits) ကို ထည့်သွင်းခဲ့သည်-
> hooks များ လက်လှမ်းမီသည့် routes နှင့် response paths များ၊ ပေါင်းစည်းထားသော disable headers (#16412)၊ မဖြစ်မနေလိုအပ်သည့် နယ်နိမိတ်အဖြစ် injection
> block mode (#16413) နှင့် post-call မတိုင်မီ response ကို မြင်ရသည့်အရာများ)

Guardrails များသည် OmniRoute နှင့် upstream providers များကြားရှိ နယ်နိမိတ်တွင်
ဘေးကင်းလုံခြုံရေး၊ မူဝါဒနှင့် content transformations များကို အတည်ပြုကျင့်သုံးသည်။
guardrail တစ်ခုစီသည် request payloads (`preCall`) နှင့် upstream responses
(`postCall`) များကို စစ်ဆေးနိုင်ပြီး (လိုအပ်ပါက ငြင်းပယ်ခြင်း၊ ပြောင်းလဲခြင်း သို့မဟုတ်
မှတ်ချက်ထည့်ခြင်းတို့ကို ပြုလုပ်နိုင်သည်)။

စနစ်သည် **fail-open** ဖြစ်သည်- guardrail တစ်ခုကို လုပ်ဆောင်နေစဉ် exception ဖြစ်ပေါ်ပါက registry သည်
အမှားကို မှတ်တမ်းတင်ပြီး request ကို fail လုပ်မည့်အစား နောက် guardrail ဖြင့်
ဆက်လက်လုပ်ဆောင်သည်။ ပိတ်ဆို့ခြင်းသည် မတော်တဆဖြစ်ရပ်မဟုတ်ဘဲ ရည်ရွယ်ချက်ရှိရှိ ဆုံးဖြတ်ချက် (`block: true`) ဖြစ်သည်။
တစ်ခုတည်းသော ခြွင်းချက်မှာ ရပ်ဆိုင်းထားသော request ဖြစ်သည်- caller ၏ `signal` ကို ရပ်ဆိုင်းလိုက်သောအခါ
exception ဖြစ်ပေါ်သော guardrail ကို ကျော်သွားမည့်အစား hook run ကို ငြင်းပယ်သည်။

hooks များသည် route တိုင်း သို့မဟုတ် response တိုင်းတွင် **မလုပ်ဆောင်ပါ**။ guardrail တစ်ခုကို
လုံခြုံရေးထိန်းချုပ်မှုအဖြစ် အားကိုးအသုံးမပြုမီ [လွှမ်းခြုံမှုနှင့် ကန့်သတ်ချက်များ](#coverage-and-limits) ကို
ဖတ်ပါ။

## ထည့်သွင်းပါရှိသော Guardrails

Registry သည် import လုပ်ချိန်တွင် priority အစဉ်အတိုင်း guardrails ခြောက်ခုကို အလိုအလျောက် load လုပ်သည်\
(`registry.ts` → `registerDefaultGuardrails()` ကိုကြည့်ပါ)။

| Priority | Name                | Stage(s)       | File                  |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Priority နံပါတ် နိမ့်သည့်အရာများသည် **အရင်** လုပ်ဆောင်သည်။

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

GLM 5.3 base model နှင့် `glm-5.3-{low,high,max}` တို့တွင် `supportsVision:false` registry/spec metadata ကို အတိအလင်း သတ်မှတ်ထားသည်။ GLM 5.3 Flash variants များမှာ native-vision models အဖြစ် ဆက်လက်ရှိနေသည်။ Claude Code ၏ `/v1/messages` route သည် Claude-to-OpenAI ဘာသာပြန်ခြင်း မပြုမီ shared `handleChat` pre-call guardrail chain ထဲသို့ ဝင်ရောက်သည်။ ထို့ကြောင့် nested `Read` tool-result images များကို OpenAI `image_url` content အဖြစ် မြှင့်တင်မပြမီ ဖော်ပြပေးရန် သို့မဟုတ် ကိုင်တွယ်ပေးရန် လိုအပ်သည် (#17069)။

**vision မထောက်ပံ့သော models** များထံ ပို့မည့် image ပါဝင်သော requests များကို ကြားဖြတ်ယူပြီး request တစ်ခုလုံးကို vision-capable model သို့ ပြန်လည်လမ်းကြောင်းပို့ခြင်း သို့မဟုတ် upstream call မပြုမီ configurable vision model မှ ထုတ်လုပ်သည့် စာသားဖော်ပြချက်များဖြင့် image parts များကို အစားထိုးခြင်းတို့ကို ပြုလုပ်သည်။ ထိုသို့ဖြင့် text-only providers များသည် multimodal payloads များကို ပွင့်လင်းမြင်သာစွာ ကိုင်တွယ်နိုင်သည်။

လုပ်ဆောင်စီးဆင်းပုံ:

1. ပစ်မှတ် model သည် vision ကို ထောက်ပံ့ပြီးသားဖြစ်ပါက ကျော်သွားသည် (`isVisionBridgeForcedModel` forced-bridge list ထဲတွင် ပါဝင်နေပါက ချွင်းချက်ဖြစ်သည်)။
2. `extractImageParts(messages)` (`visionBridgeHelpers.ts`) မှ image parts များကို ထုတ်ယူသည်။ ၎င်းသည် combo compatibility filter နှင့် မျှဝေသုံးသည့် တစ်ခုတည်းသော အမှန်တရားရင်းမြစ်ဖြစ်သော **unified media detector** `detectMediaParts()` in `open-sse/utils/mediaParts.ts` ကို delegate လုပ်သည်။ Extraction သည် `replaceImageParts` က ပြန်လည် splice လုပ်နိုင်သည့် shapes များကိုသာ ခွင့်ပြုထားသော allowlist အဖြစ် သတ်မှတ်ထားသည် (extract↔replace contract)။ ထို shapes များမှာ OpenAI `image_url`၊ Anthropic base64 `source.type:"base64"`၊ Anthropic URL `source.type:"url"` နှင့် Responses API `input_image` တို့ဖြစ်သည်။ Claude Code `tool_result.content` နှင့် Responses tool outputs အတွင်းတွင် nested ဖြစ်နေသော ကိုက်ညီသည့် images များကိုလည်း မူလ paths များတွင် ထုတ်ယူပြီး အစားထိုးသည်။ indicator-only shapes များမှာ combo-filter material ဖြစ်သောကြောင့် ထုတ်ယူခြင်းမပြုပါ။ မည်သည့် image မျှ မတွေ့ပါက ကျော်သွားသည်။
3. `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`) မှ runtime config ကို ဖြေရှင်းသည်။ အသစ်ဖြစ်သော `modalityBridge*` settings keys များသည် ဦးစားပေးရရှိပြီး၊ legacy `visionBridge*` keys များသည် **one-cycle fallback** (rollback window) အဖြစ် ဆက်လက်ရှိနေသည်။ Bridge ကို ပိတ်ထားပါက media traversal တစ်စုံတစ်ရာ မပြုလုပ်မီ ကျော်သွားသည်။
4. Mode selector (`modalityBridgeVisionMode`၊ အောက်ပါဇယားကိုကြည့်ပါ) သည် reroute သို့မဟုတ် describe ကို ဆုံးဖြတ်သည်။ Reroute သည် `model` တစ်ခုတည်းကိုသာ ပြောင်းထားသည့် `modifiedPayload` နှင့် `{ rerouted, fromModel, toModel, imagesKept }` meta ကို ပြန်ပေးသည်။
5. Describe path တွင် images များကို `maxImages` အထိ ကန့်သတ်၍ task-aware prompt ကို ဖွဲ့စည်းသည်၊ describe cache ကို အသုံးပြုသည်၊ vision model ကို **အပြိုင်** (`Promise.allSettled`) ခေါ်ဆိုပြီး ၎င်းတို့၏နေရာတွင် `[Image N]: <description>` text parts များကို ထည့်သွင်းသည်။ Describe မအောင်မြင်ပါက `null` ရရှိသည်။ ထိုအခါ raw image ကို မသိရသေးသော/vision-capable targets များအတွက် ထိန်းသိမ်းထားသည် (#4012)။ သို့သော် **အတည်ပြုထားသော text-only direct target** သို့မဟုတ် zero-vision combo ဖြစ်ပါက မဖော်ပြနိုင်သည့် image တိုင်းအတွက် `(unavailable — no vision-capable provider connected)` ဟူသော text stub ကို ထည့်သွင်းသည်။ ၎င်းတွင် partial failures နှင့် describe-call cap ထက် ကျော်လွန်နေသော images များလည်း ပါဝင်သည် (#17069)။ အားလုံးမအောင်မြင်သော combo describe fallback အဟောင်းကိုလည်း ဆက်လက်အသုံးပြုနေသည် (#8430)။
6. `modifiedPayload` နှင့် meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`) ကို ပြန်ပေးသည်။

#### Mode selector (`modalityBridgeVisionMode`)

| Mode       | Default | Behavior                                                                                                                                                                                                                                                                                                                           |
| ---------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | Legacy heuristic ကို မပြောင်းလဲဘဲ အသုံးပြုသည် (#6640/#7204)။ non-combo/`auto/` models များသည် မူလ model တွင် အသုံးပြုနိုင်သော credentials ရှိပြီးသားဖြစ်ပါက describe လုပ်ပြီး၊ မရှိပါက အကောင်းဆုံး vision model သို့ reroute လုပ်သည်။ combo targets များသည် အမြဲ describe လုပ်သည်။                                                 |
| `describe` |         | အမြဲ describe လုပ်သည် — reroute block ကို လုံးဝကျော်သွားပြီး အသုံးပြုသူရွေးချယ်ထားသော model ကသာ အဖြေပေးသည်။                                                                                                                                                                                                                        |
| `reroute`  |         | Reroute ကို အတင်းအကျပ်လုပ်သည် — keep-credentialed-model guard ကို ကျော်သွားသည်။ Reroute-**target** credential guard ကိုမူ ဆက်လက်အသုံးပြုသည်။ အသုံးပြုနိုင်သော vision target မရှိပါက bridge သည် ရှင်းလင်းသော error ဖြင့် block လုပ်ပြီး describe လုပ်ခြင်း သို့မဟုတ် raw images များကို text-only target သို့ ပို့ခြင်း မပြုလုပ်ပါ။ |

Forced modes များသည် auto heuristic မလုပ်ဆောင်မီ တိုက်ရိုက်အကျိုးသက်ရောက်သည်။ `auto` behavior သည် PR-1 မတိုင်မီ guardrail နှင့် byte-identical ဖြစ်သည်။

#### API-key scope (`visionBridgeKeyScope.ts`)

ခေါ်ဆိုသူ၏ API key က `allowedConnections`၊ quota pool များ
(`allowedQuotas`) သို့မဟုတ် မော်ဒယ်များ (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`) ကို ကန့်သတ်ထားပါက bridge သည်
ထို key အသုံးပြုခွင့်ရှိသော connection များပေါ်တွင် ထို key အသုံးပြုခွင့်ရှိသည့်
reroute နှင့် describe မော်ဒယ်များကိုသာ ရွေးချယ်သည်။ ထို့နောက် describe ခေါ်ဆိုမှုသည်
`x-omniroute-self-loop-key-id` header ပါဝင်သော OmniRoute self-loop မှတစ်ဆင့် အမြဲသွားပြီး
လက်ခံသည့် chat request က ထို key ၏ connection နှင့် model policy ကို ထပ်မံအတည်ပြုသည်။
`enforceApiKeyPolicy()` သည် ထို header ကို self-loop bearer နှင့်အတူရှိမှသာ လက်ခံသဖြင့်
ဝင်ရောက်ခွင့်ကို ပိုမိုကျဉ်းမြောင်းစေနိုင်သော်လည်း ချဲ့ထွင်မပေးနိုင်ပါ။ ထို့အပြင် ဖြေရှင်း၍
မရသော id ကိုလည်း ပယ်ချသည်။

key အတွက် vision model တစ်ခုမျှ ခွင့်ပြုထားခြင်းမရှိပါက **အတည်ပြုပြီးသား
text-only target** သည် image request ကို လုပ်ဆောင်နိုင်စွမ်းမရှိသော upstream သို့
image bytes များ မပို့ဘဲ ရှင်းလင်းသော HTTP 400 ဖြင့် locally ပယ်ချသည် (#17069)။
vision စွမ်းရည် မသိရှိရသေးသော သို့မဟုတ် native vision စွမ်းရည်ရှိသော target များအတွက်
describe လမ်းကြောင်းသည် ယခင် fail-open အပြုအမူကို ဆက်လက်ထိန်းသိမ်းထားသည်
(meta `{ skipped: true, reason: "no_permitted_vision_model" }`)။
key မပါသော request များနှင့် ဤကန့်သတ်ချက်များမရှိသော key များသည် ယခင်အတိုင်း
အတိအကျ လုပ်ဆောင်သည်။

#### လုပ်ငန်းတာဝန်နှင့် ကိုက်ညီသော describe prompt (`modalityBridgeVisionTaskAware`)

ပုံမှန်တန်ဖိုးမှာ **true** ဖြစ်သည်။ `composeVisionPrompt()` (`visionBridgeHelpers.ts`) သည်
အခြေခံ describe prompt ၏နောက်တွင် **နောက်ဆုံး user message** ၏ စာသားကို
(အက္ခရာ 500 အထိ ဖြတ်တောက်ပြီး) ထည့်ပေးသည်။ ထိုသို့ဖြင့် အသုံးပြုသူက အမှန်တကယ်
တောင်းဆိုထားသည့်အရာအပေါ် အခြေခံကာ ဖော်ပြချက်ပေးရန် လမ်းညွှန်ပြီး မြင်ရသောစာသားကို
စာလုံးဖော်ရန် vision model ကို တောင်းဆိုသည် (codex-vision-proxy pattern)။ flag ကို
ပိတ်ထားပါက — သို့မဟုတ် user text မရှိပါက — အခြေခံ prompt ကို မပြောင်းလဲဘဲ
အသုံးပြုသည်။

Describe self-loop ၏ ကိုယ်ပိုင် OpenAI-compatible request
(`visionBridgeHelpers.ts` ထဲရှိ `callVisionModelSingle()`) သည်
`image_url.detail: "high"` ကို အမြဲတမ်း တောင်းဆိုသည် — client signal တစ်စုံတစ်ရာပေါ်
မူတည်ခြင်းမရှိဘဲ caller/provider တိုင်းအတွက် သတ်မှတ်ထားသည်။ Low-detail sampling သည်
ဤ prompt က တောင်းဆိုထားသည့် စာသားဖော်ထုတ်ခြင်းလုပ်ငန်းအတွက် OCR တိကျမှုကို
လျော့ကျစေသောကြောင့် မူလဝင်လာသော request တွင် အသုံးပြုထားသည့် detail level မည်သို့ပင်
ဖြစ်စေ describe call ကိုယ်တိုင်က high detail ကို အမြဲတောင်းဆိုသည်။ ၎င်းသည် အတွင်းပိုင်း
describe request body ကိုသာ သက်ရောက်ပြီး primary request တွင် OmniRoute က caller ၏
ကိုယ်ပိုင် `image_url.detail` ကို forward လုပ်ပုံကို မပြောင်းလဲပါ — ထို default ကို
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`) တွင် သီးခြား
အသုံးချပြီး detected OpenCode clients များအတွက်သာ ဖြစ်သည်။ Describe self-loop ၏
Anthropic wire-format branch တွင် `detail` field မရှိသဖြင့် default နှစ်မျိုးစလုံး၏
သက်ရောက်မှု မရှိပါ။

#### Describe output အကန့်အသတ် (`modalityBridgeVisionMaxChars`)

| Key                            | Default | Range            |
| ------------------------------ | ------- | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` or 100–50000 |

`0` (ပုံမှန်တန်ဖိုး) သည် **အကန့်အသတ်မရှိခြင်း** ကို ဆိုလိုသည် — `callVisionModel()` က
ပြန်ပေးသော description ကို မပြုပြင်ဘဲ တိုက်ရိုက်ပေးပို့သဖြင့် ရှိပြီးသားအပြုအမူကို
ထိန်းသိမ်းထားသည်။ 100–50000 အတွင်းရှိ မည်သည့်တန်ဖိုးမဆို description ကို
`…` suffix ဖြင့် ဖြတ်တောက်ပြီး `[Image N]: <description>` အဖြစ် ပြန်လည်ထည့်သွင်းသည်
(`src/lib/guardrails/visionBridge.ts` ထဲရှိ `VisionBridgeGuardrail.preCall()` တွင်)။
နောက်ဆက်တွဲ model က စာသားအပြည့်အစုံ လိုအပ်သော အသေးစိတ်များပြားသည့် OCR လုပ်ငန်းများ
အတွက် ဤတန်ဖိုးကို မြှင့်ပါ။ စကားများသော vision model များတွင် token အသုံးပြုမှုကို
ကန့်သတ်ရန် လျှော့ချပါ။

Dashboard field သည် Vision tab ၏ Advanced panel ထဲတွင် ရှိသည်
(`ModalityBridgeVisionTab.tsx` ထဲရှိ `modality-bridge-max-chars`)။ 1 မှ 99 အတွင်းရှိ
မည်သည့်တန်ဖိုးကိုမဆို 100 အနိမ့်ဆုံးအထိ မြှင့်တင်ပေးသော်လည်း explicit `0` ကိုမူ
မပြောင်းလဲဘဲ ထားသည် — `0` သည် သီးခြား Zod value အဖြစ် တရားဝင်ပြီး
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`) “မသတ်မှတ်ထားသော”
ပုံမှန်တန်ဖိုးမျှသာ မဟုတ်ပါ။

#### Describe cache (`modalityBridge/bridgeCache.ts`)

Describe output များအတွက် process တစ်ခုလုံးအနှံ့ မျှဝေသုံးစွဲသော memory အတွင်းရှိ
LRU + TTL cache ဖြစ်သည်။ Key = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
ဖြစ်ပြီး length-prefix framing ကို အသုံးပြုသဖြင့် field boundary များ ထပ်တိုက်မှု
မဖြစ်ပါ။ model component သည် အမှန်တကယ် အဖြေပေးခဲ့သည့် model မဟုတ်ဘဲ
**သတ်မှတ်ထားသော** bridge model ဖြစ်သည် — `callVisionModel` သည် အတွင်းပိုင်းတွင်
fallback ပြုလုပ်နိုင်သောကြောင့် attempt တစ်ခုချင်းစီအလိုက် key ပြုလုပ်ပါက cache
အပိုင်းစိတ်များစွာ ကွဲထွက်သွားမည်ဖြစ်သည်။ မအောင်မြင်သော describe များကို မည်သည့်အခါမျှ
cache မလုပ်ပါ။ ဆက်တင်များမှာ —

| Key                             | Default | Range   |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Remote image normalization (self-loop describe/base64 fetch)

Bridge က **remote** image တစ်ခုကို ကိုယ်တိုင် fetch လုပ်သည့်အခါ — Anthropic describe
self-call နှင့် claude-wire-format base64 conversion
(`ensureBase64ImagesForClaudeWire`) နှစ်မျိုးလုံးသည်
`visionBridgeHelpers.ts` ထဲရှိ `fetchRemoteImageAsDataUri()` ကို အသုံးပြုကြပြီး —
ရရှိလာသော data URI ကို vision-model request ထဲ မထည့်သွင်းမီ
`normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) မှတစ်ဆင့် ပေးပို့သည်။
အရွယ်အစားလွန်ကဲသော image များကို **2048px long edge** အထိ အရွယ်လျှော့ချသည်
(OpenAI/Anthropic က server-side တွင် အသုံးပြုထားပြီးသား resize cap နှင့် ကိုက်ညီသည်)။
ထိုသို့ပြုလုပ်ခြင်းဖြင့် vision model မြင်ရသည့်အရာကို မပြောင်းလဲဘဲ upload bytes နှင့်
latency ကို လျှော့ချပေးသည်။

Resize ပြုလုပ်ရန် `sharp` ကို dynamic import မှတစ်ဆင့် load လုပ်သည်။ Native binary
load မအောင်မြင်သော platform တစ်ခုတွင် `normalizeDataUri()` သည် **မည်သည့်အခါမျှ
throw မလုပ်ပါ** — မူလ bytes များကို passthrough ပြုလုပ်ခြင်းသို့ fallback လုပ်သဖြင့်
describe/base64-conversion လမ်းကြောင်းသည် အမြဲအလုပ်လုပ်နေမည်ဖြစ်သည်။ Non-image bytes
(fetch ပြုလုပ်ထားသော်လည်း decode လုပ်၍ရသော image မဟုတ်သည့်အရာများ) ကိုလည်း
မပြောင်းလဲဘဲ passthrough ပြုလုပ်သည်။ ဤ normalization သည် bridge က ကိုယ်ပိုင်
self-call အတွက် fetch ပြုလုပ်သော image များတွင်သာ သက်ရောက်ပြီး caller ၏ raw
passthrough payload တွင် မည်သည့်အခါမျှ အသုံးမချပါ။ ၎င်းသည် opt-in-only mutation
principle (Hard Rule #20) နှင့် ကိုက်ညီသည်။

#### Settings schema + migration

`modalityBridge*` ကီးအသစ်များကို `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`) တွင် Zod ဖြင့် အတည်ပြုထားသည်။
`modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`၊ `modalityBridgeCache*` သုံးမျိုးနှင့်
Audio Bridge က အသုံးပြုသည့် `modalityBridgeAudio*` အုပ်စုတို့ ပါဝင်သည်။
Migration `141_modality_bridge_settings.sql` သည် ရှိပြီးသား
`visionBridge*` တန်ဖိုးများကို ကိုက်ညီသည့် ကီးအသစ်များသို့ ကူးယူပေးသည်
(idempotent ဖြစ်ပြီး operator က သတ်မှတ်ထားသော `modalityBridge*` တန်ဖိုးကို
မည်သည့်အခါမျှ ထပ်ရေးမည်မဟုတ်ပါ)။ Legacy ကီးများကို release cycle တစ်ကြိမ်အတွက်
read fallback အဖြစ် ဆက်လက်လက်ခံထားသည်။

#### ပွင့်လင်းမြင်သာမှု ခေါင်းစီး + စာရင်းအင်းများ

Describe-transformed တုံ့ပြန်မှုများတွင်
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(`modalityBridge/bridgeStats.ts` ရှိ `buildModalityBridgeHeader()` က
တည်ဆောက်ပြီး `src/sse/handlers/chatHelpers.ts` ရှိ
`withModalityBridgeHeader()` က ထည့်သွင်းပေးသည်) ပါဝင်သည်။
Rerouted တောင်းဆိုမှုများတွင် ခေါင်းစီးမပါပါ — payload ကို မပြောင်းလဲထားသည့်အပြင်
model ပြောင်းလဲမှုကို တုံ့ပြန်မှု body ရှိ `model` field တွင် မြင်နိုင်ပြီးဖြစ်သည်။

`GET /api/modality-bridge/stats` (management auth၊
`GET /api/settings` နှင့် တူညီသော tier) သည် `vision`၊ `audio` နှင့် `video`
တို့အတွက် memory အတွင်းရှိ modality တစ်ခုချင်းစီ၏ ကောင်တာများကို
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` ပုံစံဖြင့် ပြန်ပေးသည်။
`averageLatencyMs` သည် denominator အဖြစ် ကြိုးစားမှုအားလုံးကို မသုံးဘဲ
`latencySamples` ကို အသုံးပြုသည်။ အချိန်တိုင်းတာမှုမရှိသော operation အတွက်
သုညမီလီစက္ကန့် sample ကို အတုဖန်တီးမည်မဟုတ်ပါ။
`bridged` သည် အောင်မြင်သော conversion များအတွက် backward-compatible alias
အဖြစ် ဆက်ရှိနေသည်။ မအောင်မြင်သော ကြိုးစားမှုများသည် ၎င်းကို တိုးမပေးပါ။
ဒီဇိုင်းအရ process ပြန်စသည့်အခါ ကောင်တာများကို reset လုပ်သည်
(စာရင်းအင်းစောင့်ကြည့်မှုသာဖြစ်ပြီး accounting မဟုတ်ပါ)။

#### Dashboard configuration

သီးခြား dashboard စာမျက်နှာသည်
`/dashboard/settings/modality-bridge` ဖြစ်သည်။ URL ဖြင့် ရည်ညွှန်းနိုင်သော
`Vision`၊ `Audio` နှင့် `Video` tabs များသည် `tab` တန်ဖိုးကို ပြောင်းလဲစဉ်
query parameters များကို ထိန်းသိမ်းထားသည်။ Vision tab တွင် enablement၊ mode၊
model ရွေးချယ်မှု (အလိုအလျောက် default အပါအဝင်)၊ task-aware prompting၊
အဆင့်မြင့် timeout/image/description-length/cache limits၊ runtime
ကောင်တာများနှင့် ကာကွယ်ထားသော sample request တို့ကို ဖော်ပြပေးသည်။ Audio tab
သည်လည်း live ဖြစ်ပြီး enablement၊ Auto ပါဝင်သော STT-only model picker၊
timeout/max-clip limits၊ audio ကောင်တာများနှင့် `input_audio` sample test တို့ကို
ဖော်ပြပေးသည်။ Video tab သည် လုပ်ဆောင်နိုင်သောအခြေအနေရှိပြီး FFmpeg/ffprobe
runtime အခြေအနေကို အစီရင်ခံသည် — တိကျစွာ သတ်မှတ်ထားသော UI အခြေအနေ လေးမျိုးထဲမှ
တစ်မျိုးဖြစ်သည် (`unknown` သည် probe လုပ်ဆောင်နေဆဲ သို့မဟုတ် ပြီးဆုံးအောင်
မလုပ်နိုင်သေးချိန်၊ `restricted` သည် loopback မဟုတ်သော dashboard host တွင်
client-side probe ကို ကျော်သွားချိန်၊ `unavailable` သည် probe လုပ်ပြီး
မရှိကြောင်း အတည်ပြုပြီးချိန်၊ `available` သည် FFmpeg/ffprobe versions များနှင့်
အတူ ရရှိနိုင်ချိန်)။ ထို့အပြင် video အတွက် enable/model/frame/video/timeout
limits များကို သိမ်းဆည်းပေးသည်၊ model picker ကို vision-capable models များဖြင့်
စစ်ထုတ်ပေးသည်၊ video ကောင်တာများကိုလည်း ဖော်ပြပေးသည်။

AI settings အောက်ရှိ ယခင် Vision Bridge card သည် စာမျက်နှာအသစ်သို့
compatibility link တစ်ခုဖြစ်ပြီး form ၏ ဒုတိယမိတ္တူကို မပိုင်ဆိုင်တော့ပါ။
Media Providers သည် Image-to-Text နှင့် Speech-to-Text workflows များကို
သက်ဆိုင်ရာ Modality Bridge tabs များသို့လည်း လင့်ခ်ချိတ်ပေးသည်။ သို့သော်
ရှိပြီးသား Speech-to-Text playground ကို မဖယ်ရှားပါ။

**Self-loop ဝင်ခွင့်စစ်ဆေးမှု ကျော်လွှားခြင်း:** describe call သည် OmniRoute ၏
ကိုယ်ပိုင် `/v1` self-loop (စံမဟုတ်သော provider model) မှတစ်ဆင့် route လုပ်သည့်အခါ
sub-request သည် `x-omniroute-admission-bypass: internal` ကို ပို့ပြီး
ဖြေရှင်းထားသော self-loop credential ဖြင့် authenticate လုပ်သည် — local mode
တွင် local `sk_omniroute` sentinel သို့မဟုတ် operator က သတ်မှတ်ထားသော
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env key (#1350) ကို အသုံးပြုသည်။ ထို့ကြောင့်
`REQUIRE_API_KEY=true` deployments များတွင်လည်း describe call ကို ဆက်လက်
လုပ်ဆောင်နိုင်သည်။ ထို bypass ကို အတိအကျ သတ်မှတ်ထားသော credential များအတွက်သာ
လက်ခံသဖြင့် external clients များသည် admission ကို ကျော်ရန် header ကို
အသုံးပြု၍ မရပါ။

Legacy defaults များသည် `src/shared/constants/visionBridgeDefaults.ts` တွင်
ရှိပြီး mode/task-aware/cache defaults အသစ်များနှင့် settings resolver သည်
`src/shared/constants/modalityBridgeDefaults.ts` တွင် ရှိသည်။ Guardrail သည်
tests များက fake `getSettings` နှင့် `callVisionModel` implementations များကို
ထည့်သွင်းနိုင်ရန် `deps` constructor option ကို ဖော်ပြပေးသည်။

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Audio ပါဝင်သော chat requests များကို audio input လက်ခံနိုင်ကြောင်း မသေချာသော
target တစ်ခုသို့ မရောက်မီ ကြားဖြတ်ယူသည်။ ၎င်းသည် chat request ကို reroute
မလုပ်ဘဲ audio parts များကို ရှိပြီးသား OpenAI-compatible multipart endpoint
မှတစ်ဆင့် စာသားအဖြစ် ပြောင်းလဲပြီး ရွေးချယ်ထားသော chat model သည် text
transcripts များဖြင့် ဆက်လက်လုပ်ဆောင်သည်။

Flow:

1. `supportsAudio` ကို `getResolvedModelCapabilities()` မှတစ်ဆင့် ဖြေရှင်းပါ။ သတ်မှတ်ထားသော provider-registry metadata ကို ဦးစားပေးပြီး၊ ထို့နောက် static model metadata၊ ထို့နောက် synced `modalities_input` ကို အသုံးပြုပါ။ သတ်မှတ်ထားသော input list တွင် `audio` မပါဝင်ပါက `false` ဖြစ်ပြီး၊ capability အထောက်အထား မရှိတော့ပါက `null` ဖြစ်သည်။ `false` နှင့် `null` နှစ်မျိုးစလုံးသည် conservative bridge ကို အသုံးပြုစေပြီး `true` ဖြစ်ပါက ၎င်းကို ကျော်သွားသည်။
2. `modalityBridgeAudio*` ဆက်တင်များကို ဖြေရှင်းပြီး shared `detectMediaParts()` detector မှတစ်ဆင့် message တိုင်းမှ splice ပြုလုပ်နိုင်သော top-level audio parts များကို ထုတ်ယူပါ။ ထောက်ပံ့ထားသော wire shape များမှာ OpenAI `input_audio`၊ `audio_url` နှင့် `source.media_type: "audio/*"` တို့ဖြစ်သည်။ Nested audio ကို routing အတွက် ရှာဖွေတွေ့ရှိသော်လည်း splice လမ်းကြောင်းမှ ဖယ်ရှားမည်မဟုတ်ပါ။ လုပ်ဆောင်မှုကို `modalityBridgeAudioMaxClips` ဖြင့် ကန့်သတ်ထားပြီး နောက်ပိုင်း parts များကို မပြောင်းလဲဘဲ ထားရှိသည်။
3. သတ်မှတ်ထားသော `provider/model` ကို အသုံးပြုပါ၊ သို့မဟုတ် `selectAudioBridgeModel()` က `AUDIO_TRANSCRIPTION_PROVIDERS` ကို တည်ငြိမ်သော catalog အစီအစဉ်အတိုင်း လှည့်လည်ပြီး အသုံးပြုနိုင်သော active provider credential ရှိသည့် ပထမဆုံး model ကို ရွေးချယ်ပါ။
4. `callAudioTranscription()` သည် base64/data-URI audio ကို multipart `file` အဖြစ် ပြောင်းလဲပေးသည်၊ သို့မဟုတ် remote `audio_url` ကို DNS pinning နှင့် 25 MB ကန့်သတ်ချက်ပါသော public-only outbound guard မှတစ်ဆင့် ဒေါင်းလုဒ်လုပ်သည်။ ထို့နောက် file နှင့် ရွေးချယ်ထားသော model ကို `resolveSelfLoopBearer()` ဖြင့် authentication ပြုလုပ်ထားသော local `/v1/audio/transcriptions` self-loop သို့ POST လုပ်သည်။ ရှိပြီးသား transcription route သည် ပုံမှန် credential lookup၊ cooldown/rate-limit ကိုင်တွယ်မှုနှင့် provider dispatch ကို လုပ်ဆောင်သည်။
5. အောင်မြင်သော calls များသည် ၎င်းတို့၏ parts များကို `[Audio N]: <transcript>` ဖြင့် အစားထိုးသည်။ Calls များကို `Promise.allSettled` ဖြင့် လုပ်ဆောင်သောကြောင့် တစ်ခုချင်းစီ မအောင်မြင်ပါက မူရင်း audio part ကို ထိန်းသိမ်းထားသည် (#4012 contract)။ Calls အားလုံး မအောင်မြင်ဘဲ target ၏ `supportsAudio === false` ဖြစ်ကြောင်း အတည်ပြုနိုင်ပါက parts များကို\
   `[Audio N]: (unavailable — no STT provider connected)` (#8430 contract)\
   အဖြစ် ပြောင်းလဲသည်။ မသေချာသော target (`null`) အတွက် calls အားလုံး မအောင်မြင်သည့် ရလဒ်တွင် မူရင်းအတိုင်း ထားရှိသည်။ အတည်ပြုထားသော text-only target တွင် အသုံးပြုနိုင်သော STT credential မရှိပါက network call မပြုလုပ်ဘဲ အလားတူ explicit stub ကို ထည့်ပေးသည်။

အောင်မြင်သော transcripts များသည် process တစ်ခုလုံးအတွက် အသုံးပြုသည့် Modality Bridge LRU/TTL cache ကို အသုံးပြုသည်။ Key တွင် audio reference၊ တည်ငြိမ်သော `audio-transcription` operation label နှင့် ရွေးချယ်ထားသော STT model တို့ ပါဝင်သည်။ မအောင်မြင်မှုများကို cache ထဲတွင် မသိမ်းဆည်းပါ။ Audio attempts များသည် shared `bridged`၊ `cacheHits`၊ `failures` နှင့် `lastUsedAt` counters များကို update လုပ်သည်။ ပြောင်းလဲထားသော responses များတွင် `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` ပါဝင်ပြီး၊ မပြောင်းလဲသော requests များတွင် Audio Bridge segment မပါဝင်ပါ။

Runtime settings များကို DB တွင် သိမ်းဆည်းပြီး Zod ဖြင့် validate လုပ်ထားသည်-

| Key                           | Default | Range          |
| ----------------------------- | ------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —              |
| `modalityBridgeAudioModel`    | `""`    | Auto or STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10           |

Shared cache ကို `modalityBridgeCacheEnabled`၊
`modalityBridgeCacheTtlMinutes` နှင့် `modalityBridgeCacheMaxEntries` တို့က ဆက်လက်ထိန်းချုပ်သည်။

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Chat Completions `messages` နှင့် Responses API `input` ထဲရှိ top-level video parts များကို native video support မည်မသိသေးသော target တစ်ခုကို မခေါ်ဆိုမီ ကြားဖြတ်လုပ်ဆောင်သည်။ ပံ့ပိုးထားသော ပုံစံများမှာ `input_video`၊ `video_url`၊ `video_source`၊ HTTPS URLs နှင့် `data:video/*;base64,...` data URIs တို့ဖြစ်သည်။ Text ထဲရှိ ရိုးရိုးဖိုင်အမည်များကို video အဖြစ် မသတ်မှတ်ပါ။

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) သည် request traversal၊ capability/policy စစ်ဆေးမှု၊ request တစ်ခုချင်းစီအလိုက် aggregation နှင့် response payload တို့ကို တာဝန်ယူသည်။ Video တစ်ခုချင်းစီအတွက် လုပ်ဆောင်ရမည့် အလုပ်များဖြစ်သည့် acquisition၊ whole-result cache၊ frame sequence ကို ဖော်ပြခြင်း (caller က သတ်မှတ်ထားသော audio transcript ကို ပေါင်းစပ်ပေးသည်) နှင့် attempt တစ်ခုချင်းစီ၏ metrics/abort/cleanup တို့ကို `videoBridgePipeline.ts` ရှိ `processVideoPart` နောက်ကွယ်တွင် ဖုံးကွယ်ထားပြီး `preCall` ၏ loop အတွင်း video part တစ်ခုစီအတွက် တစ်ကြိမ်ခေါ်ဆိုသည်။ ထို module သည် ရှင်းလင်းစွာ သတ်မှတ်ထားသော port နယ်နိမိတ်များဖြစ်သည့် `VideoMediaBrokerPort` (bytes ရယူခြင်းနှင့် sampled frames ထုတ်ယူခြင်း)၊ `VideoAudioTranscriptionPort` (caller က သတ်မှတ်ထားသော audio transcript ကို sampled captions နှင့် ပေါင်းစပ်ခြင်း) နှင့် `VideoDrilldownPort` (legacy raw-store ပုံစံ) တို့ကိုလည်း သတ်မှတ်ပေးသည်။ Production STT နှင့် frame retention တို့ကို `createVideoSttAdapter` နှင့် `createVideoDrilldownAdapter` မှတစ်ဆင့် describing port ပတ်ဝန်းကျင်တွင် ပေါင်းစပ်ထားပြီး၊ နောက်ဆုံးတစ်ခုသည် shared opaque-handle lifecycle ကို အသုံးပြုသည်။

Public `/v1` request path သည် subprocess တစ်ခုကို မည်သည့်အခါမျှ import သို့မဟုတ် invoke မပြုလုပ်ပါ။ Remote video များကို 50 MiB ကန့်သတ်ချက်အောက်တွင် download ပြုလုပ်ပြီး၊ inline base64 video များအတွက် model/messages/framing envelope ကို 50 MiB public JSON request admission limit အတွင်း ဆက်လက်ထားရှိနိုင်ရန် conservative 36 MiB decoded per-video cap ကို အသုံးပြုသည်။ Inline length နှင့် decoded-size ခန့်မှန်းချက်များကို allocation မပြုလုပ်မီ စစ်ဆေးသည်။ HTTPS ကို ကနဦး remote URL နှင့် redirect တစ်ခုချင်းစီတွင် မဖြစ်မနေ အသုံးပြုရပြီး၊ DNS pinning ပါသော ရှိပြီးသား public-only outbound guard ကို အသုံးပြုသည်။ ထို့နောက် bytes များသည် တိကျသော internal `POST /api/modality-bridge/video/extract` broker boundary ကို ဖြတ်သန်းသည်။ ထို route သည် `LOCAL_ONLY` နှင့် `SPAWN_CAPABLE` နှစ်မျိုးစလုံးဖြစ်ပြီး process တစ်ခုချင်းစီအလိုက် authenticated ဖြစ်သော trusted-loopback request ကိုသာ လက်ခံသည်။ URL၊ filesystem path၊ executable သို့မဟုတ် argument list များကို မည်သည့်အခါမျှ လက်မခံပါ။ API body-size pipeline နှင့် handler ၏ incremental body reader တို့သည် 50 MiB broker input cap ကို သီးခြားစီ enforce ပြုလုပ်သည်။ ၎င်း၏ bounded queue သည် တစ်ကြိမ်လျှင် extraction တစ်ခုကိုသာ လုပ်ဆောင်ပြီး pending jobs လေးခုအထိ ခွင့်ပြုကာ pending input ကို 100 MiB အထိ ကန့်သတ်ထားသည်။

Broker အတွင်းတွင် `ffprobe` သည် သီးသန့် local ဖိုင်ကို ဖတ်ရှုသည်။ fixed format allowlist သည် playlist နှင့် manifest format များကို ဖယ်ထုတ်ထားသည်။ ခွင့်ပြုထားသော MOV-family container များအတွက် external MOV data reference များကို ပုံမှန်အားဖြင့် ဆက်လက်ပိတ်ထားပြီး၊ fixed command သည် ၎င်းတို့ကို ဖွင့်ရန် opt in မလုပ်ပါ။ `ffprobe` နှင့် `ffmpeg` နှစ်ခုစလုံးသည် `file`-only protocol whitelist၊ thread တစ်ခု၊ fixed argument array များ၊ shell မသုံးခြင်းနှင့် `PATH` မှ executable များကို ဖြေရှင်းအသုံးပြုခြင်းတို့ကို အသုံးပြုသည်။ Attached-picture cover stream များသည် ဖွင့်ကြည့်နိုင်သော candidate များ မဟုတ်ပါ။ ဖွင့်ကြည့်နိုင်သော stream အားလုံးသည် သတ်မှတ်ထားသော ကန့်သတ်ချက်များနှင့် ကိုက်ညီရမည်ဖြစ်ပြီး၊ တိကျစွာ သတ်မှတ်ထားသော default stream ကို ဦးစားပေးပြီးနောက် deterministic အနိမ့်ဆုံး index fallback ကို အသုံးပြုသည်။ ဗီဒီယိုများကို 600 စက္ကန့်၊ dimension တစ်ခုလျှင် 8,192 pixels နှင့် source pixels 33,554,432 အထိ ကန့်သတ်ထားသည်။ FFmpeg သည် midpoint JPEG frame 1–16 ခုကို sample ပြုလုပ်ပြီး၊ input သေးငယ်များကို upscaling မလုပ်ဘဲ long edge ကို အများဆုံး 1,024 pixels အထိ လျှော့ချကာ၊ URL ကို မည်သည့်အခါမျှ လက်ခံရရှိခြင်း မရှိပါ။ Sampling သည် ပုံမှန်အားဖြင့် `uniform` ဖြစ်သည်။ ရွေးချယ်နိုင်သော `scene_aware` နှင့် စမ်းသပ်ဆဲ `segment_aware` policy များသည် အတည်ပြုပြီးသား local stream ပေါ်တွင် fixed FFmpeg pass တစ်ကြိမ် ထပ်မံလုပ်ဆောင်ပြီး၊ ကန့်သတ်ထားသော `showinfo` scene timestamp များကို ရွေးချယ်သည်။ Detector ပျက်ကွက်မှု၊ timeout၊ ပုံစံမမှန်သော output သို့မဟုတ် candidate set အလွတ်ဖြစ်မှုတို့ ဖြစ်ပါက deterministic အတိုင်း အဆိုပါ uniform midpoint များသို့ fallback ပြုလုပ်သည်။ Segment-aware mode သည် အတည်ပြုပြီးသော scene interval များအတိုင်း midpoint sample များကို အချိုးကျ ခွဲဝေသတ်မှတ်သည်။ Segment-aware evidence နှင့် fallback အပြုအမူများကို အောက်တွင် အသေးစိတ် ဖော်ပြထားသည်။ Hard 16-frame cap ကို policy အားလုံးတွင် selection ပြီးနောက် အသုံးပြုသည်။ Scene-aware request တစ်ခုတွင် one-frame budget သာရှိပါက active full-video သို့မဟုတ် focus window ၏ uniform midpoint ကို အသုံးပြုပြီး `policyEffective: uniform` ဟု report ပြုလုပ်သည်။ ရွေးချယ်ထားသော scene frame တစ်ခုတည်းဖြင့် temporal အစွန်းနှစ်ဖက်စလုံးကို ထိန်းသိမ်းထားနိုင်မည် မဟုတ်ပါ။ Caller သည် finite focus window (`start`/`end` စက္ကန့်) ကို ရွေးချယ်၍ ပေးနိုင်သည်။ Bounds များကို media duration အတွင်းသို့ clamp ပြုလုပ်ပြီး၊ ပြောင်းပြန်ဖြစ်သော သို့မဟုတ် finite မဟုတ်သော window များကို ပယ်ချသည်။ Sampling policy အားလုံးကို normalize ပြုလုပ်ထားသော interval အတွင်းတွင်သာ ဆောင်ရွက်သည်။ ထွက်ပေါ်လာသော window ကို sampling metadata နှင့် untrusted description prefix တို့တွင် ထည့်သွင်းပေးပြီး၊ downstream model များက focused excerpt နှင့် full timeline ကို ခွဲခြားသိရှိနိုင်စေသည်။

Semantic caption focus သည် သီးခြား၊ အတိအကျ သတ်မှတ်နိုင်သော setting တစ်ခု ဖြစ်သည်။ ပုံမှန် `full` analysis mode သည် ရှိပြီးသား frame prompt ကို ထိန်းသိမ်းထားပြီး request text ကို caption model ထံသို့ မည်သည့်အခါမျှ forward မလုပ်ပါ။ `focused` mode တွင် bridge သည် တူညီသော Chat သို့မဟုတ် Responses container ထဲမှ နောက်ဆုံး non-empty user-authored `text`/`input_text` ကိုသာ ဖတ်ရှုကာ NFC သို့ normalize ပြုလုပ်သည်၊ control character နှင့် whitespace များကို စုစည်းလျှော့ချသည်၊ ထို့နောက် Unicode code point 500 အထိ ကန့်သတ်သည်။ ရလဒ်အလွတ်ဖြစ်ပါက တိကျသော `full` prompt သို့ fallback ပြုလုပ်သည်။ အသုံးပြုနိုင်သော hint ကို သီးခြား untrusted-user-context block အတွင်း JSON အဖြစ် serialize ပြုလုပ်ပြီး observable detail များကိုသာ ဦးစားပေးနိုင်သည်။ Media အတွင်း မြင်ရသော သို့မဟုတ် ကြားရသော instruction များကို လိုက်နာခြင်းမပြုရန် သီးခြားသတိပေးချက်ကို override မလုပ်နိုင်ပါ။ Textual focus သည် `start`/`end` ကို မည်သည့်အခါမျှ ခန့်မှန်းခြင်းမပြုသကဲ့သို့ temporal sampler ကိုလည်း မပြောင်းလဲပါ။

#### FU-07 ဖွဲ့စည်းပုံဆိုင်ရာ segment အထောက်အထား

`segment_aware` သည် အတည်ပြုပြီးသား local video stream ပေါ်တွင် ကန့်သတ်ထားသော pre-analysis pass တစ်ကြိမ်ကို အသုံးပြုသည်။ Fixed filter chain သည် ပထမဦးစွာ အကျယ် 320 pixels အထိ scale ပြုလုပ်ပြီး၊ scene change နှင့် frozen interval များကို detect လုပ်ကာ blur၊ average luma နှင့် spatial/temporal information အတွက် တစ်စက္ကန့်လျှင် frame တစ်ခုနှုန်းဖြင့် sample ပြုလုပ်သည်။ အဆိုပါ pass ကို structural sample 600 ခု၊ FFmpeg/filter thread တစ်ခု၊ တူညီသော `file`-only protocol နှင့် container allowlist များ၊ process-output 1 MiB ကန့်သတ်ချက်နှင့် broker ၏ shared abort/deadline အတွင်း အများဆုံး 30 စက္ကန့်အထိသာ ကန့်သတ်ထားသည်။ Request ထံမှ command၊ filter၊ path သို့မဟုတ် URL တစ်ခုခုကို မည်သည့်အခါမျှ လက်မခံပါ။

Structural value များသည် deterministic sampling evidence ဖြစ်ပြီး semantic video understanding မဟုတ်ပါ။ ၎င်းတို့သည် subject၊ action၊ caption၊ speech သို့မဟုတ် user intent များကို မခန့်မှန်းပါ။ Scene နှင့် freeze boundary များသည် segment များကို ဖွဲ့စည်းပေးသည်။ Freeze coverage၊ blur၊ exposure၊ spatial detail နှင့် temporal change တို့သည် ရှိပြီးသား 1–16 frame budget ကို မည်သို့ခွဲဝေမည်ကိုသာ လွှမ်းမိုးသည်။ အပြည့်အဝ frozen ဖြစ်သော segment ကို frame တစ်ခုအထိသာ ကန့်သတ်ပြီး၊ မfrozen segment များသည် ကျန်ရှိသော budget အတွက် ယှဉ်ပြိုင်ကြသည်။ Boundary များသည် frame အရေအတွက်ထက် များပြားသည့်အခါ rapid early cut များကြောင့် အဆုံးပိုင်းရှိ ရှည်လျားသော segment ကို ဖုံးကွယ်မသွားစေရန် uniform timeline coverage ကို ထိန်းသိမ်းထားသည်။ Freeze boundary ၏ 1-second analysis resolution အတွင်းရှိ scene boundary များကို ပေါင်းစည်းသည်။

Filter များပျောက်ဆုံးခြင်း၊ ပုံစံမမှန်သော/အလွတ် evidence၊ detector error သို့မဟုတ် ကန့်သတ်ထားသော pre-analysis timeout ဖြစ်ပါက တိကျသော uniform midpoint policy သို့ fail open ပြုလုပ်သည်။ Caller abort သို့မဟုတ် broker deadline ဖြစ်ပါက fail open မလုပ်ပါ။ လုပ်ဆောင်နေဆဲ subprocess ကို ရပ်တန့်ပြီး၊ နောက်ပိုင်း frame extraction ကို တားဆီးကာ private temporary tree ကို `finally` အတွင်း ဖယ်ရှားသည်။

`scripts/perf/video-bridge-fu07-eval.ts` သည် post-dedup caption-call savings၊ dense-motion budget allocation၊ blur/exposure/SI-TI evidence၊ rapid cut များနှင့် long tail၊ gradual-fade false positive များအတွက် deterministic real FFmpeg fixture များကို ထုတ်လုပ်သည်။ ၎င်းသည် pre-analysis wall time ကို မှတ်တမ်းတင်ပြီး `/usr/bin/time` ရရှိနိုင်ပါက child CPU နှင့် peak RSS ကိုလည်း မှတ်တမ်းတင်သည်။ ၎င်း၏ quality check များသည် structural oracle များသာ ဖြစ်သည်။ ဤ harness တွင် ခွင့်ပြုထားသော endpoint သို့မဟုတ် frozen judge မရှိသဖြင့် အမှန်တကယ် caption-model quality သည် `HOLD` အဖြစ် ဆက်လက်ရှိနေသည်။ `--caption-cost-per-call-usd` က explicit positive per-call estimate ကို ပေးမထားပါက monetary savings သည်လည်း `HOLD` အဖြစ် ဆက်လက်ရှိနေသည်။ Script သည် ရလဒ်နှစ်မျိုးစလုံးကို မည်သည့်အခါမျှ လုပ်ကြံဖန်တီးခြင်း မပြုပါ။

ဖရိမ်တစ်ခုစီကို 4 MiB အထိ၊ raw ဖရိမ်အားလုံးကို စုစုပေါင်း 23 MiB အထိ၊
serialize ပြုလုပ်ထားသော broker response ကို 32 MiB အထိသာ ကန့်သတ်ထားသည်။ သီးသန့်
ယာယီ directory ကို `finally` အတွင်း ဖျက်ပစ်သည်။ OmniRoute သည် FFmpeg ကို
ထည့်သွင်းမပေးသည့်အပြင် စိတ်ကြိုက် executable path ကိုလည်း လက်မခံပါ။ Caption
ပြုလုပ်ခြင်းမတိုင်မီ bridge သည် ထိန်းချုပ်မှုရှိသော visual deduplication အဆင့်ကို
အသုံးပြုသည်။ JPEG တစ်ခုစီကို 16×16 grayscale buffer သို့ လျှော့ချပြီး နောက်ဆုံး
ထိန်းသိမ်းထားသော ဖရိမ်နှင့်သာ နှိုင်းယှဉ်သည်။ တောင်းဆိုထားသော caption budget သည်
ဖရိမ်တစ်ခုထက်ပိုပါက extraction သည် ထို budget ၏ နှစ်ဆအထိ၊ သို့သော် ဖရိမ် 16 ခုထက်
မပိုသော ကန့်သတ်ထားသည့် candidate pool ကို ပေးသည်။ တောင်းဆိုထားသော cap ကို
deduplication ပြီးနောက်မှသာ အသုံးချပြီး budget သည် အနည်းဆုံး နှစ်ခုဖြစ်ပါက နောက်ဆုံး
လျှော့ချရွေးချယ်စဉ် ပထမနှင့် နောက်ဆုံးရွေးချယ်ထားသော candidate များကို
ထိန်းသိမ်းထားသည်။ Versioned
`grayscale-16x16-mean-cells-v2` policy သည် mean luma delta နှင့် normalized
delta အနည်းဆုံး 0.05 ရှိသော thumbnail cell များ၏ အချိုးအစားတို့အနက် ပိုကြီးသော
တန်ဖိုးကို အသုံးပြုသည်။ Duplicate threshold သည် runtime setting အဖြစ်
ဖော်ထုတ်ထားခြင်းထက် ကြိုတင်ခန့်မှန်းနိုင်မှုအတွက် ရွေးချယ်ထားသော constant 0.04
ဖြစ်သည်။ ဤ secondary
high-contrast signal သည် mean-only comparison ဖြင့် ဖုံးကွယ်သွားနိုင်သော
သေးငယ်သည့် လှုပ်ရှားမှုနှင့် မြင်နိုင်သောစာသားပြောင်းလဲမှုများကို ထိန်းသိမ်းပေးသည်။
Comparator သို့မဟုတ် decoder အမှားများဖြစ်ပါက fail open ပြုလုပ်ပြီး coverage ကို
ဆက်လက်ထိန်းသိမ်းသည်။ Output metadata သည် extracted candidates၊ အောင်မြင်စွာ
အသုံးပြုထားသော ဖရိမ်များနှင့် ဖယ်ရှားထားသော visual duplicates များကို
သီးခြားခွဲပြထားသည်။

အတိအလင်း အမှတ်အသားပြုထားသော video part တစ်ခုသည် timestamp ပါဝင်သော contact
sheet တစ်ခုကို တောင်းဆိုနိုင်သည်။ Bridge သည် အများဆုံး 4-column၊ ဖရိမ် 16 ခုပါ
JPEG grid တစ်ခုကို တည်ဆောက်သည်။ 512-pixel cell တစ်ခုစီ၏ အောက်ခြေရှိ
high-contrast band တွင် ၎င်း၏ source timestamp ကို ထည့်သွင်းထားပြီး၊ အဆိုပါ
timestamp များကို downstream association နှင့် audit အတွက် textual metadata
ထဲတွင်လည်း ဆက်လက်ထိန်းသိမ်းထားသည်။ JPEG အပြည့်အစုံကို 32 MiB အထိသာ
ကန့်သတ်ထားသည်။ `sharp` သည် grid ကို decode သို့မဟုတ် compose မပြုလုပ်နိုင်ပါက
bridge သည် တစ်ခုချင်းစီသော JPEG ဖရိမ်များသို့ fallback ပြုလုပ်သည်။ client abort
ဖြစ်ပါက sheet operation မှတစ်ဆင့် ဆက်လက်ပျံ့နှံ့စေသည်။

Promotion အတွက် အထောက်အထားကို synthetic composition
microbenchmark နှင့် ရည်ရွယ်ချက်ရှိရှိ သီးခြားခွဲထားသည်။
`scripts/perf/video-bridge-contact-sheet-eval.ts` သည် အမှန်တကယ်
OpenAI-compatible vision models များအတွက် schema-versioned A/B harness ကို
သတ်မှတ်ပေးသည်။ ၎င်းသည် provider က report ပြုလုပ်သော tokens၊ sheet composition
အပါအဝင် end-to-end wall latency၊ model-call အရေအတွက်နှင့် manifest က
သတ်မှတ်ထားသော fact retention တို့ကို တိုင်းတာသည်။ Raw model responses များကို
report ထဲတွင် မရေးသားဘဲ SHA-256 digests နှင့် ကိုက်ညီသော fact IDs များကိုသာ
ထိန်းသိမ်းသည်။ `--execute-real` ကို ဖြတ်သန်းပေးပြီး `--model`၊
`OMNIROUTE_BASE_URL` နှင့် `OMNIROUTE_API_KEY` တို့ကို configure ပြုလုပ်ထားမှသာ
harness သည် network သို့မဟုတ် အခကြေးငွေပေးရသော model call ကို ပြုလုပ်သည်။
ထိုအတိအလင်း real run မရှိပါက machine-readable verdict သည် `HOLD` အဖြစ်
ဆက်လက်ရှိပြီး synthetic payload/call-count measurements များတစ်ခုတည်းသည်
promotion အတွက် အထောက်အထားမဟုတ်ပါ။

Caller များသည် aligned text ကို ရှိပြီးသားဖြစ်ပါက support ပြုထားသော video
part တစ်ခုသို့ optional `transcript.cues` array ကို ပူးတွဲပေးနိုင်သည်။ Cue
တစ်ခုစီတွင် `text`၊ probed duration အတွင်းရှိ finite `start`/`end` interval
နှင့် whitelist ပြုထားသော `source` (`client`၊ `embedded` သို့မဟုတ်
`audio-bridge`) တို့ ပါဝင်ရမည်။ `confidence` သည် မူလတန်ဖိုးအဖြစ် `1` ဖြစ်ပြီး
`0` နှင့် `1` ကြားတွင် ရှိရမည်။ အတိအကျတူညီသော cue များကို တစ်ခုတည်းအဖြစ်
ပေါင်းစည်းသည်။ OmniRoute သည် ဤ metadata မှ transcription ကို မစတင်ပါ။
အတည်ပြုပြီးသော cue များကို source၊ confidence နှင့် interval တို့နှင့်အတူ
ဖော်ပြထားသော result ထဲသို့ ကူးယူပြီး frame captions များနှင့်အတူ
ယုံကြည်စိတ်ချ၍မရသော observations များအဖြစ် render ပြုလုပ်သည်။ မမှန်ကန်သော၊
အကန့်အသတ်ကျော်လွန်သော သို့မဟုတ် provenance မရှိသော text ကို caption stream
ထဲသို့ ရောနှောမည့်အစား ပယ်ချသည်။ Request-body transcript channel နှစ်ခုလုံးသည်
ပေးထားသော provenance ကို `client` အဖြစ် normalize ပြုလုပ်ပြီး
ကိုယ်တိုင်သတ်မှတ်ထားသော `embedded` သို့မဟုတ် `audio-bridge` label များလည်း
ပါဝင်သည်။ Server ပိုင် adapter တစ်ခုတည်းသာ code-only `trustedSource`
argument မှတစ်ဆင့် ထိုယုံကြည်စိတ်ချရသော label များကို သတ်မှတ်နိုင်သည်။ Request
JSON field တစ်ခုသည် ထို argument သို့ ရောက်ရှိနိုင်ခြင်းမရှိပါ။ Transcript text
သည် ၎င်း၏ provenance မည်သို့ပင်ဖြစ်စေ untrusted media-derived content အဖြစ်
ဆက်လက်ရှိပြီး authorization ကို မည်သည့်အခါမျှ မဆုံးဖြတ်ရပါ။

အဆင့်မြင့် caller တစ်ခုသည် ထို video အတွက် `audioTranscript` track ကို
ပေးနိုင်သည်။ ၎င်းကို server transcription ၏ အထောက်အထားမဟုတ်ဘဲ client က
ပေးထားသော text အဖြစ် သတ်မှတ်သည်။ Fusion seam သည် visual နှင့် audio
observations များကို deadline နှင့် abort signal တစ်ခုတည်းအောက်တွင်
လုပ်ဆောင်ပြီး common timeline ပေါ်တွင် အစီအစဉ်ချသည်၊ အတိအကျတူညီသော duplicate
များကို ပေါင်းစည်းသည်၊ တစ်ဖက်တည်း အောင်မြင်ပါက partial result ကို report
ပြုလုပ်သည်။ မမှန်ကန်သော `audioTranscript` သည် video တစ်ခုလုံးကို fail
မဖြစ်စေဘဲ partial result သို့ လျော့ကျစေသည် — visual description ကို
ထိန်းသိမ်းထားပြီး audio branch သည် sanitized failure code ကို မှတ်တမ်းတင်သည်။
Branch တစ်ခုစီ၏ availability၊ partial flag နှင့် sanitized failure codes များကို
ဖော်ပြထားသော result ထဲတွင်၊ guardrail metadata
(`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`) ထဲတွင်၊
result-cache metadata ထဲတွင်နှင့် bridge fusion counters ထဲတွင်
ထိန်းသိမ်းထားသည်။ မူလ Video Bridge လမ်းကြောင်းသည် speech-to-text ကို
မခေါ်ယူသည့်အပြင် media copy ဒုတိယတစ်စောင်ကိုလည်း download မပြုလုပ်ပါ။
ထိုအတိအလင်း track မရှိပါက video-only အဖြစ် ဆက်လက်ရှိသည်။

**Transcript retention (#12150 P1)။** Video Bridge (ကိုယ်တိုင် opt-in လုပ်ထားရမည့်) က transcript cue တစ်ခုကို render လုပ်သည့်အခါတိုင်း ဤအချက်သည် အလိုအလျောက် သက်ရောက်သည် — သီးခြား retention flag မရှိပါ။ Request တစ်ခုက transcript cue တစ်ခုခု (`transcript` ဟု caller က ကြေညာထားသော cue သို့မဟုတ် ပေါင်းစပ်ထားသော `audioTranscript`) ကို render လုပ်သည့်အခါ guardrail သည် ၎င်းကို `videoBridgeObserved` ဟု မှတ်သားပြီး video description ၏ redacted shadow တစ်ခုကို ထုတ်ပေးသည် — cue တစ်ခုချင်းစီ၏ free-text body အားလုံးကို `[redacted-video-transcript]` ဖြင့် အစားထိုးထားသော တူညီသည့် rendering ဖြစ်သည်။ ၎င်းကို string မတည်ဆောက်မီ structured cue field ကို အစားထိုးခြင်းဖြင့် တည်ဆောက်သည် (flattened text ကို parse လုပ်ခြင်းဖြင့် မဟုတ်ပါ)။ ထို့ကြောင့် `]` ပါဝင်သော body များဖြစ်သည့် `[inaudible]`/`[music]` အပါအဝင် adversarial သို့မဟုတ် ပုံမှန် cue content မည်သည့်အရာမျှ ကျန်ရစ်နိုင်မည်မဟုတ်ပါ။ သိမ်းဆည်းထားသော call-log request body သည် video မှရသော text part တစ်ခုချင်းစီကို content equality ဖြင့် ကိုက်ညီစေကာ ထို redacted shadow ဖြင့် အစားထိုးသည်။ `fullText` anchor ကို call မတိုင်မီ ပြီးစီးထားသော guardrail payload မှ ပြန်လည်ဖတ်ယူသောကြောင့် နောက်ပိုင်း chain guardrail များ (priority 10/95 ရှိသော PII နှင့် credential masker များ) က description text ကို နေရာတစ်ခုတည်းတွင် ပြန်လည်ရေးသားပြီးနောက်နှင့် system-prompt/handoff/memory injection က message array ကို ပြန်လည်ဖွဲ့စည်းပြီးနောက်တွင်ပင် match အောင်မြင်နေဆဲဖြစ်သည်။ Model သို့ upstream ပို့သော body သည် မပြောင်းလဲပါ။ Observed request တစ်ခုသည် durable Memory ကို မည်သည့်အရာမျှ ထပ်မံဖြည့်စွက်ခြင်းမရှိပါ (request- နှင့် response-derived extraction နှစ်မျိုးလုံးကို ကျော်သွားသည်)။ ထို့ကြောင့် model ၏ ကိုယ်ပိုင် reply သည် transcript text ကို Memory ထဲသို့ ပြန်လည်ထည့်သွင်းနိုင်မည်မဟုတ်ပါ။

**Raw video fields (#12430)။** Bridge ကို ဖွင့်ထားပြီး native video support သည် မသိရှိရသေးခြင်း သို့မဟုတ် မရှိခြင်းဖြစ်ပါက သတ်မှတ်ထားသော `transcript`/`audioTranscript` fields များသည် description မအောင်မြင်ပြီးနောက် သို့မဟုတ် `maxVideos` limit သို့ ရောက်ရှိပြီးနောက်တွင်ပင် `videoBridgeObserved` ကို အသက်သွင်းသည်။ `null` နှင့် empty strings တို့ကို ရေတွက်သည်။ မရှိသော fields များနှင့် video မဟုတ်သော metadata များကိုမူ မရေတွက်ပါ။ သိမ်းဆည်းထားသော copy များသည် ဤ fields များကို redaction ပြုလုပ်သည် သို့မဟုတ် request ကို ချန်လှပ်သည်။ caches/Memory များကိုလည်း ကျော်သွားသည်။

ထို fallback လမ်းကြောင်းများတွင် မှန်ကန်သော caller cue များသည် စံမဟုတ်သော provider fields များအဖြစ် မဟုတ်ဘဲ support လုပ်ထားသော `text`/`input_text` parts များအဖြစ် ပြောင်းလဲသွားသည်။ Request က ပေးပို့ထားသော track နှစ်ခုလုံးသည် မယုံကြည်ရသေးသော `client` observations များအဖြစ် ဆက်လက်ရှိနေပြီး video ကို မဖော်ပြနိုင်ခဲ့ကြောင်းနှင့် timestamps များကို media နှင့် တိုက်ဆိုင်စစ်ဆေးထားခြင်း မရှိကြောင်း အတိအလင်း သတိပေးထားသည်။ ရှိပြီးသား cue 256 ခု/စုစုပေါင်း 64-KiB budget နှင့် cue တစ်ခုချင်းစီ budget များသည် track နှစ်ခုလုံးအပေါ် ပေါင်းစည်းသက်ရောက်သည်။ timestamps များသည် broker ၏ 600-second ceiling နှင့် ပေးထားသည့် focus window အတွင်း ဝင်ဆံ့ရမည်။ မမှန်ကန်သော track များကို ဖယ်ရှားပြီး arbitrary text အဖြစ် forward မလုပ်ပါ။ ပေါင်းစပ်ထားသော budget မကျော်လွန်သရွေ့ မှန်ကန်သော sibling တစ်ခုကို အသုံးပြုနိုင်သေးသည်။ Null/empty fields များသည် text မထည့်ပါ။ ဤ fallback ကြောင့် media fetch သို့မဟုတ် transcription မည်သည့်အရာမျှ ထပ်မံမလုပ်ဆောင်ပါ။ Transcript extension fields များကို fallback video carrier နှင့် ၎င်း၏ `video_url`/`source` objects များမှ ဖယ်ရှားသည်။ OpenAI wire allowlist သည် တင်းကျပ်စွာ ဆက်လက်ရှိနေသည်။ unknown-native video carriers များကို အသုံးပြုနိုင်ဆဲဖြစ်ပြီး သိရှိထားသော text-only targets များသည် safe markers များကို ဆက်လက်ထိန်းသိမ်းထားသည်။ Structured redaction shadows များသည် ထပ်ပေါင်းထားသော transcript text ကို ကာကွယ်ပေးပြီး မူရင်း caller-owned request သည် မပြောင်းလဲပါ။ Native-supported targets နှင့် disabled bridges များသည် ၎င်းတို့၏ ရှိပြီးသား bypass အပြုအမူကို ဆက်လက်ထိန်းသိမ်းထားသည်။

ထပ်မံသိမ်းဆည်းထားသော copy များသည် တူညီသော observed-request signal ကို အသုံးပြုသည်။ Raw pre-guardrail client-request snapshot၊ memory အတွင်းရှိ pending request နှင့် အစောပိုင်းပယ်ချထားသော request log တို့သည် video parts အတွင်းရှိ transcript fields များကို structure အတိုင်း အစားထိုးသည်။ Pipeline stages နှင့် context handoff တို့က ဖန်တီးသော string prompt များကို persisted-request-body sink တွင် redaction ပြုလုပ်သည်။ သိမ်းဆည်းထားသော `video_content_removed` marker ကြောင့် ရည်ရွယ်ချက်ရှိရှိ ဖယ်ရှားထားသော text ကို ပြန်လည်တည်ဆောက်မည့်အစား `previous_response_id` continuation သည် fail closed ဖြစ်သည်။ Observed request တစ်ခုသည် logging မပြုမီ ၎င်း၏ per-part redaction shadow ကို ဆုံးရှုံးသွားပါက သို့မဟုတ် နောက်ပိုင်း request mutation များအပြီး video shadow များစွာထဲမှ တစ်ခုတည်းပင် match မဖြစ်ပါက partially redacted transcript ကို သိမ်းဆည်းမည့်အစား retained request body တစ်ခုလုံးကို ချန်လှပ်သည်။

Observed request တစ်ခုအတွက် model response သည် structured cue boundary မရှိဘဲ transcript ၏ မည်သည့်အပိုင်းကိုမဆို ကိုးကားနိုင်သည်။ ထို့ကြောင့် ၎င်း၏ သိမ်းဆည်းထားသော call-log `responseBody` ကို omission marker ဖြင့် အစားထိုးသည်။ upstream/client bodies နှင့် stream chunks များ ပါဝင်နိုင်သည့် အသေးစိတ် pipeline artifact ကို မသိမ်းဆည်းပါ။ ထို request အတွက် Semantic၊ idempotency နှင့် reasoning-replay caches များသည် reads နှင့် writes နှစ်မျိုးလုံးကို ကျော်သွားသည်။ Provider request နှင့် client မြင်ရသော response တို့သည် မပြောင်းလဲပါ။ အသေးစိတ် artifact ကို ချန်လှပ်သည့်အခါ အစောပိုင်း keepalive bytes များကို ယာယီ buffer မှ ဖယ်ရှားသည်။ Kiro ၏ malformed EventStream warning သည် payload byte count ကိုသာ ဖော်ပြပြီး ၎င်း၏ contents သို့မဟုတ် JSON parser ၏ raw error ကို မည်သည့်အခါမျှ မဖော်ပြပါ။
ဤအချက်သည် ဆက်စပ်မှုမရှိသော provider/plugin diagnostic အားလုံးကို audit ပြုလုပ်ပြီးကြောင်း မဆိုလိုပါ။ ပိုမိုကျယ်ပြန့်သော retained-sink sweep ကို #11658 တွင် ခြေရာခံထားသည်။

Internal `/api/modality-bridge/video/drilldown` lifecycle သည် သီးခြား loopback/token-authenticated cache substrate တစ်ခုဖြစ်သည်။ Operation တစ်ခုချင်းစီသည် canonical opaque principal ID တစ်ခုကိုလည်း လိုအပ်သည်။ Production caller တစ်ဦးကို enable မလုပ်မီ ထို ID ကို authenticated tenant မှ derive လုပ်ရမည်ဖြစ်ပြီး client က ရွေးချယ်ပေးသော value ကို မည်သည့်အခါမျှ forward မလုပ်ရပါ။ Cache key များသည် ထို principal ကို canonical session နှင့် video-reference IDs များနှင့် ချိတ်ဆက်ပြီး ၎င်းတို့၏ SHA-256-derived key များကိုသာ သိမ်းဆည်းသည်။ Reads နှင့် deletion နှစ်မျိုးလုံးကို ထို principal တစ်ခုတည်းအတွင်းသာ ကန့်သတ်ထားသည်။ Cache သည် entry တစ်ခုလျှင် derived JPEG frame အများဆုံး 16 ခုကိုသာ သိမ်းဆည်းပြီး ဆယ်မိနစ်အကြာတွင် expire လုပ်သည်။ ကန့်သတ်ထားသော `start`/`end` reads သို့မဟုတ် explicit session deletion ကို support လုပ်သည်။

Principal တစ်ခုချင်းစီကို entry 16 ခုနှင့် canonical JPEG data 64 MiB အထိသာ ခွင့်ပြုသည်။ ထို limits များသည် global 64-entry/256 MiB ceiling နှင့် သီးခြားဖြစ်သည်။ Principal quota ဖိအားရှိသည့်အခါ global LRU eviction ကို မစဉ်းစားမီ ထို principal ၏ least-recently-used entries များကိုသာ ဖယ်ရှားသည်။ Cache activity ဖြစ်သည့်အခါ principal နှင့် global accounting နှစ်ခုလုံးမှ expired entries များကို sweep လုပ်သည်။ Cancellation နှင့် validation failure တို့သည် partial replacement ကို commit မလုပ်ပါ။

ကက်ရှ်သည် canonical မဟုတ်သော Base64၊ ပိုလျှံသော padding၊ JPEG မဟုတ်သော မီဒီယာ၊ ပုံစံမမှန်သော သို့မဟုတ် ဖြတ်တောက်ခံထားရသော JPEG များနှင့် bounded full-image `sharp`
decode အတွင်း warning ဖြစ်ပေါ်စေသော JPEG များကို လက်မခံပါ။ လက်ခံထားသော ပုံတစ်ပုံချင်းစီကို canonical JPEG အဖြစ် ပြန်လည် encode ပြုလုပ်ပြီး၊ ခေါ်ဆိုသူပေးထားသော field များကို ယုံကြည်မည့်အစား decode ပြုလုပ်ထားသော bytes များမှ width နှင့် height ကို ရယူသည်။ ထို့အပြင် နောက်တွဲပါ polyglot bytes များကို ဆက်လက်သိမ်းဆည်းမည့်အစား ဖယ်ရှားသည်။ bounded canonical compressed buffer တစ်ခုတည်းကိုသာ quota နှစ်ခုလုံးအတွက် အသုံးပြုမှုပမာဏအဖြစ် တွက်ချက်သည်။ JSON wire limit တွင် 32 MiB decoded-input ceiling အတွက် Base64 overhead ပါဝင်သည်။ သိမ်းဆည်းထားသော derivation တစ်ခုချင်းစီတွင် အတည်ပြုပြီးသော JPEG format/resolution၊ sampling policy၊ derivation version၊ ဖန်တီးချိန်၊ server မှတွက်ချက်ထားသော content hash၊ hashed parent reference နှင့် ယုံကြည်ရသော ခေါ်ဆိုသူ၏ parent-content hash တို့ကို မှတ်တမ်းတင်ထားသည်။ atomic cache commit မပြုမီ asynchronous decode/hash အဆင့်များကြားတွင် cancellation ကို စစ်ဆေးသည်။

ထုတ်လုပ်ရေး producer သည် အောင်မြင်သော visual analysis ပြုလုပ်ပြီးမှသာ ရှိနှင့်ပြီးသော broker frames များကို ပြန်လည်အသုံးပြုသည်။ ဒုတိယအကြိမ် video download/extraction မပြုလုပ်ပါ။ ၎င်းအတွက် operator
`modalityBridgeVideoDrilldownEnabled=true`၊ အပိုင်းတစ်ခုချင်းစီအလိုက် တိကျသော `drilldown: true` နှင့် အတည်ပြုထားသော API-key record ID တို့ လိုအပ်သည်။ Client က ကြေညာသော principal/session တန်ဖိုးများသည် ownership ကို မသတ်မှတ်ပေးနိုင်ပါ။ အခြေအနေသုံးရပ်လုံး မပြည့်မီပါက ထပ်ဆောင်း frames များကို hash မပြုလုပ်၊ resize မပြုလုပ်၊ ထိန်းသိမ်းမထားပါ။ Retention မအောင်မြင်ပါက အသုံးပြုနိုင်သော visual response ကို ဆက်လက်ထိန်းသိမ်းထားသည်။ Consent ပေးထားသော request များသည် whole-video result cache ကို ကျော်သွားသဖြင့် cached result များက handles များကို ပြန်လည်ပေးပို့ခြင်း မရှိပါ။

အောင်မြင်သော JSON နှင့် SSE response များသည် bounded
`x-omniroute-video-drilldown` header ထဲတွင် opaque handles အများဆုံး လေးခုအထိသာ ဖော်ပြသည်။ ခွင့်ပြုထားသော browser origins များသည် CORS origin policy ကို ပိုမိုကျယ်ပြန့်စေခြင်းမရှိဘဲ ထို header ကို ဖတ်နိုင်သည်။ Handle အသစ်များသည် `v1.<32-byte random base64url
token>` ပုံစံကို အသုံးပြုပြီး registry သည် ၎င်းတို့၏ SHA-256 hash များကိုသာ ထိန်းသိမ်းသည်။ Reader/header parser သည် legacy 64-hex token များကိုလည်း လက်ခံသည်။ အတည်ပြုထားသော public consumer သည်
`GET /api/v1/video-bridge/drilldown?handle=...` ဖြစ်ပြီး၊ `modalityBridgeVideoDrilldownRemoteEnabled=true` ဖြင့် သီးခြားစီ ခွင့်ပြုထားသည်။ အတိအလင်းသိမ်းဆည်းထားသော false တန်ဖိုးသည် legacy `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env fallback ကို ဖွင့်ထားသော်လည်း access ကို ရုပ်သိမ်းသည်။ ထုတ်လုပ်ရေး retention တွင်လည်း အလားတူ legacy
`OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` fallback ရှိသည်။ Fallback နှစ်ခုလုံး၏ မူလတန်ဖိုးမှာ off ဖြစ်သည်။

Consumer သည် authenticated key မှ ownership ကို ရယူပြီး key policy ကို အသုံးချသည်-
GET နှင့် DELETE နှစ်ခုလုံးသည် `/v1` နှင့် `/api/v1` alias များအပါအဝင် `video` endpoint category အောက်တွင် ပါဝင်သည်။ endpoint allowlist မဟုတ်သော empty တန်ဖိုးမရှိသော key များတွင် `video` ပါဝင်ရမည်၊ ကန့်သတ်မထားသော key များမှာ ယခင်အတိုင်း အသုံးပြုနိုင်သည်။ Consumer သည် မသိသော၊ သက်တမ်းကုန်သောနှင့် အခြား key တစ်ခု၏ handles များအတွက် တူညီသော 404 ကို ပြန်ပေးသည်။ `variant=preview|standard|detail` (အများဆုံး JPEG dimension 320/640/1280၊ အရွယ်အစားကို အထက်သို့ မချဲ့ပါ)၊ `limit=1..8` (သို့မဟုတ် legacy `frames` alias၊ နှစ်ခုလုံးကို တစ်ပြိုင်နက် အသုံးမပြုရ)၊ သုညမှစသော `page` နှင့် ရွေးချယ်နိုင်သော `start`/`end` focus seconds များကို လက်ခံသည်။ ထပ်နေသော query keys နှင့် ပြောင်းပြန်ဖြစ်နေသော focus windows များကို ပယ်ချသည်။ ပြန်ပေးသော variant တစ်ခုချင်းစီတွင် ၎င်း၏ အမှန်တကယ် content အတွက် hash နှင့် အမှန်တကယ် resolution metadata ပါဝင်ပြီး ထိန်းသိမ်းထားသော source နှင့် ချိတ်ဆက်ထားသည်။ Variant များကို ထပ်မံထိန်းသိမ်းထားသော copy များအဖြစ် သိမ်းဆည်းမည့်အစား read ပြုလုပ်ချိန်တွင်သာ derive လုပ်သည်။ Base64/envelope အပါအဝင် JSON response ကို 32 MiB အထိသာ ကန့်သတ်ထားသည်။ အရွယ်အစားကျော်လွန်သော page သည် 413 ပြန်ပေးပြီး client သည် frames အနည်းငယ်သာ ထပ်မံတောင်းဆိုရမည်။ Read ပြုလုပ်စဉ် resize တစ်ခုချင်းစီအနီးတွင် cancellation ကို စစ်ဆေးပြီး ပြန်မပေးမီ handle validity ကို ထပ်မံစစ်ဆေးသည်။ Owner က ပြုလုပ်သော `DELETE` သည် idempotent ဖြစ်သည်။ ဖျက်ခြင်း သို့မဟုတ် TTL ကုန်ဆုံးခြင်းသည် ထိန်းသိမ်းထားသော source နှင့် usage accounting ကို ပြန်လည်လွတ်မြောက်စေသည်။

မျှဝေသုံး store သည် process-local ဖြစ်သည်။ ထို့ကြောင့် restart ပြုလုပ်ပြီးနောက် handles များ သက်တမ်းကုန်ပြီး သီးခြား OmniRoute process များအကြား လွှဲပြောင်းအသုံးပြု၍ မရပါ။ Management stats များတွင် ထိရောက်စွာ အသုံးပြုနေသော retention/remote policy နှင့် ထိန်းသိမ်းထားသော entries/bytes စုစုပေါင်းကိုသာ ဖော်ပြပြီး media၊ references၊ principal IDs သို့မဟုတ် handles များကို မည်သည့်အခါမျှ မဖော်ပြပါ။ Video settings panel တွင် ထိုတန်ဖိုးများကို ပြသပြီး consent switches နှစ်ခုလုံးကို ဆက်လက်သိမ်းဆည်းနိုင်သည်။ ဤ implementation documentation သည် live deployment သို့မဟုတ် promotion evidence မဟုတ်ပါ။ real-model acceptance ကို သီးခြားစီ မှတ်တမ်းတင်ထားသည်။

Frames များကို သတ်မှတ်ထားသော Video model ဖြင့် အစဉ်လိုက် caption ပြုလုပ်သည်။ Video override သည် empty ဖြစ်ပါက Vision setting ကို အမွေဆက်ခံသည်။ နှစ်ခုလုံး empty ဖြစ်ပါက Vision auto-router က ထိရောက်သော vision-capable model ကို ရွေးချယ်သည်။ အောင်မြင်သော caption များသည် မူရင်း part ကို တည်ငြိမ်သော `[Video description:` prefix ဖြင့် အစားထိုးသည်။ ထို prefix သည် စာသားကို ယုံကြည်၍မရသော media-derived observation အဖြစ်လည်း သတ်မှတ်ပေးပြီး media ထဲတွင် တွေ့ရသော instructions များကို downstream models များ မလိုက်နာရန် အသိပေးသည်။ Frame-caption cache key များတွင် JPEG bytes၊ prompt၊ timestamp နှင့် effective model တို့ ပါဝင်သည်။ အောင်မြင်သော caption များကိုသာ cache ပြုလုပ်သည်။ Cache entry များတွင် fallback model အပါအဝင် အမှန်တကယ် အောင်မြင်စွာ ထုတ်လုပ်ခဲ့သော producer model ကို ထိန်းသိမ်းထားသည်။ Frames များကို မတူညီသော model များဖြင့် ထုတ်လုပ်ထားပါက bridge သည် `mixed` ကို ပြန်လည်ဖော်ပြသည်။ Cache hit ဖြစ်သောအခါ ထို producer identity ကို ပြန်လည်အသုံးပြုပြီး requested routing plan အဖြစ် ပြန်လည်တံဆိပ်မကပ်ပါ။ Whole-video result cache သည် output ကို ပြောင်းလဲစေသော input တစ်ခုချင်းစီအပေါ် key ပြုလုပ်ထားသည် — prompt၊ effective model၊ sampling policy၊ frame count၊ semantic analysis mode၊ normalized focus hint ၏ SHA-256 fingerprint၊ focus window၊ `transcript`၊ `audioTranscript` နှင့် contact-sheet flag — ထို့ကြောင့် ထိုအချက်များထဲမှ တစ်ခုခု ပြောင်းလဲပါက cache miss ဖြစ်ပြီး stale reuse မဖြစ်ပါ။ Visual dedup policy version၊ threshold နှင့် bounded candidate-frame count တို့ကိုလည်း result-cache key နှင့် metadata ထဲတွင် အတိအလင်း ထည့်သွင်းထားသည်။ ထို့ကြောင့် policy ပြောင်းလဲပါက stale whole-video description ကို ပြန်လည်အသုံးပြု၍ မရပါ။ Result-cache v4 metadata သည် mode နှင့် fingerprint ကို ထိန်းသိမ်းသော်လည်း raw user task ကို မထိန်းသိမ်းပါ။ Guardrail metadata တွင် requested နှင့် effective analysis modes နှစ်ခုလုံးကို ဖော်ပြသည်။ အသုံးပြုနိုင်သော user text မရှိဘဲ requested `focused` mode ဖြစ်ပါက effective အားဖြင့် `full` ဖြစ်ကြောင်း ဖော်ပြသည်။

Guardrail သည် ပံ့ပိုးထားသော ဗီဒီယိုအစိတ်အပိုင်းတိုင်းကို ထုတ်ယူသော်လည်း
`modalityBridgeVideoMaxVideos` ထက်ပို၍ ဖော်ပြမည်မဟုတ်ပါ။ `supportsVideo === false`
ဖြစ်ကြောင်း အတည်ပြုထားသော target အတွက် မအောင်မြင်သော ဗီဒီယိုများနှင့်
ကန့်သတ်ချက်ကျော်လွန်သော ဗီဒီယိုများသည် raw video မကျန်ရှိစေရန်
ရှင်းလင်းပြတ်သားသော safe text marker များအဖြစ် ပြောင်းလဲခံရသည်။ စွမ်းရည်ကို
မသိရသေးသောအခါ အဆိုပါအစိတ်အပိုင်းများသည် ၎င်းတို့၏ video carrier ကို
ဆက်လက်ထိန်းသိမ်းထားသည်။ fallback transcript ရှိပါက အထက်တွင်ဖော်ပြထားသော
ကန့်သတ်ထားသည့် text conversion ကို လိုက်နာသည်။ `supportsVideo === true`
ဖြစ်သော target များသည် bridge ကို ကျော်သွားသည်။
Client request abort signal သည် download၊ broker queue၊ subprocess များနှင့်
caption call များအတွင်း ပျံ့နှံ့သွားသည်။ abort ဖြစ်ပါက ဗီဒီယိုများကြားတွင်
ရပ်တန့်ပြီး raw media သို့ fail open မလုပ်ပါ။

Runtime settings များသည် DB-backed ဖြစ်ပြီး Zod ဖြင့် အတည်ပြုထားသည်။

| Key                                 | Default     | Range / behavior                                                                                                                    |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Optional runtime၊ opt-in                                                                                                            |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` သည် generic captions များကို ထိန်းသိမ်းသည်; `focused` သည် ကန့်သတ်ထားပြီး မယုံကြည်ရသော နောက်ဆုံး user context ကို အသုံးပြုသည် |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge model ကို အမွေဆက်ခံသည်                                                                                                |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                                |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`၊ `scene_aware` သို့မဟုတ် အချိုးကျ `segment_aware`; detector မအောင်မြင်ပါက `uniform` သို့ fallback လုပ်သည်                 |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                                 |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                                      |

အမွေဆက်ခံထားသော Video timeout တန်ဖိုးများသည် 120 စက္ကန့်ထက်ကျော်လွန်ပါက
broker deadline အထိ ကန့်သတ်သည်။ setting အသစ်များကို ရေးသားရာတွင် ထိုကန့်သတ်ချက်
ထက်ကျော်လွန်ပါက ငြင်းပယ်သည်။
`GET /api/modality-bridge/video/runtime` သည် authentication သို့မဟုတ် runtime
စစ်ဆေးခြင်း မပြုမီ trusted stamped loopback locality လိုအပ်ပြီး၊ ထို့နောက်
management auth လိုအပ်သည်။ ၎င်းသည် `available`၊ သန့်စင်ထားသော FFmpeg/ffprobe
version များနှင့် runtime မရရှိနိုင်သည့်အခါ သတ်မှတ်ထားသော reason တစ်ခုကိုသာ
ပြန်ပေးသည်။ အတွင်းပိုင်း extraction endpoint သည် အများပြည်သူသုံး upload API
မဟုတ်ပါ။ queue ပြည့်နေပါက `503` နှင့် `Retry-After` ကို ပြန်ပေးသည်၊ caller
ချိတ်ဆက်မှု ပြတ်တောက်ပါက `499` ကို ပြန်ပေးသည်၊ သတ်မှတ်ထားသော broker deadline
ရောက်ပါက `504` ကို ပြန်ပေးသည်။ ပြောင်းလဲပြီးသော response များသည်
Vision သို့မဟုတ် Audio segment များကို မဖယ်ရှားဘဲ အလယ်ဗဟို
`x-omniroute-modality-bridge` header တွင်
`video->text;model=<visionModel>;parts=<videos>` ကို ထပ်ပေါင်းသည်။

### PII Masker (`piiMasker.ts`)

လည်ပတ်နေသည်။**နှစ်ခုလုံး** အဆင့်များ။

- **`preCall`** ဝန်ဆောင်ခကို ပုံတူပွားခြင်း၊ `system`၊ `messages`၊ `input` နှင့် `prompt` (ရိုးရိုးကြိုးတန်းအရာများ အပါအဝင်) နှင့် `processPII()` ( `@/shared/utils/inputSanitizer` မှ) ကို `content`/`text` အကွက်များသို့ လျှောက်သွားပါသည်။ `PII_REDACTION_ENABLED=true` တွင် တွေ့ရှိသောအခါ PII outbound payload တွင် ပြန်လည်ပြင်ဆင်သည်။ ၎င်းသည် `INPUT_SANITIZER_MODE` မှ သီးခြားဖြစ်သည် (အချက်ပြထိုးသွင်းခြင်းမူဝါဒကို ထိန်းချုပ်သည့်သာ)။ ပြန်လည်ပြင်ဆင်ခြင်းကို ပိတ်ထားသောအခါ၊ ခေါ်ဆိုမှုမှတ်တမ်းသည် အကြောင်းအရာကို ပြန်လည်ရေးသားခြင်းမပြုဘဲ ထောက်လှမ်းမှုရေတွက်သည်။
- **`postCall`** တုံ့ပြန်မှုကို နက်ရှိုင်းစွာ ပေါင်းစပ်ဖန်တီးပြီး `sanitizePIIResponse()` နှင့် တုံ့ပြန်မှု-API-ပုံသဏ္ဍာန်မျက်နှာဖုံးကို လုပ်ဆောင်သည် (`maskResponsesOutput` — `output_text` နှင့် `output[].content[].text` အကျုံးဝင်သည် )။ တုံ့ပြန်မှု တစ်စုံတစ်ရာ ဖြစ်ပေါ်ပါက၊ ပြုပြင်ထားသော တုံ့ပြန်မှုသည် မူရင်းကို အစားထိုးသည်။

အကာအရံသည် ဘယ်သောအခါမှ မပိတ်ဆို့၊ ၎င်းသည် (`meta.detections`၊ `meta.redacted`) ကိုသာ မှတ်စုများ သို့မဟုတ် ပြန်ရေးသည်။

#### အမျိုးအစားအလိုက် ရွေးချယ်မှု၊ စိတ်ကြိုက်ပုံစံများနှင့် ထောက်လှမ်းမှုကောင်တာများ

**ဒက်ရှ်ဘုတ် → ဆက်တင်များ → လုံခြုံရေး → PII မျက်နှာဖုံးစွပ်ခြင်း။** _what_ masked ကို ရွေးသည်။ ၎င်းသည် မျက်နှာဖုံးစွပ်ခြင်းကို ဖွင့်မထားပါ- ၎င်းသည် `PII_REDACTION_ENABLED` (တောင်းဆိုချက်) နှင့် `PII_RESPONSE_SANITIZATION` (တုံ့ပြန်မှု + SSE) နှစ်ခုလုံးကို မူရင်းအတိုင်း ပိတ်ထားသည်။

- **အမျိုးအစားအလိုက် ရွေးချယ်မှု** — ၏ built-in အိုင်ဒီများကို `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`) တွင် ဖော်ပြထားပါသည်။ Unset ဆိုသည်မှာ အမျိုးအစားတိုင်း (ဤဆက်တင်မတိုင်မီရှိခဲ့သည့် အပြုအမူ) ကို ဆိုလိုသည်။ တောင်းဆိုချက်အင်ဂျင်၏ `ssn_us` ပုံစံသည် `ssn` သို့ မြေပုံများဖြစ်သည်။ နမူနာပုံစံများ (အနည်းဆုံး၊ စံနှုန်း၊ ငွေကြေး၊ ဘရာဇီး၊ USA၊ GDPR၊ POPIA၊ အပြည့်အစုံ) သည် UI တွင် အမှန်ခြစ်ကွက်များကိုသာ ဖြည့်ပါ။
- **GDPR နှင့် POPIA ခွဲခြားသတ်မှတ်မှုများ** — EU နှင့် တောင်အာဖရိက ကိုယ်ရေးကိုယ်တာ အထောက်အထားများကို ဖုံးအုပ်ထားသော built-in ID ၁၂ ခု (အောက်ပါဇယား)။ ၎င်းတို့၏ regexes၊ validators နှင့် jurisdiction tags များသည် response sanitizer (`src/lib/piiSanitizer.ts`) နှင့် request masker (`src/shared/utils/inputSanitizer.ts`) နှစ်မျိုးလုံးစားသုံးသည့် `src/shared/utils/piiPatterns.ts` ဇယားတစ်ခုတွင်နေထိုင်ပါသည်။ ၎င်း၏တရားဝင်သူမှ လက်ခံသည့်အခါမှသာ ကိုက်ညီမှုရှိ၊ ကိန်းဂဏာန်းတွေ ပြေးတာက ဘယ်တော့မှ မလုံလောက်ဘူး။ အိုင်ဒီများ မတည်ရှိမီ ကျဉ်းမြောင်းသော ရွေးချယ်မှုတစ်ခုကို သိမ်းဆည်းထားသည့် အော်ပရေတာတစ်ခုသည် အိုင်ဒီအသစ်များကို အမှန်ခြစ်မခံရမီအထိ ၎င်းတွင်ရှိသည့် အပြုအမူကို သိမ်းဆည်းထားသည်။
- **စိတ်ကြိုက်ပုံစံများ** — regex သို့မဟုတ် wildcard ပုံစံ 20 အထိ (`*` = အထိ အဖြူရောင်မဟုတ်သော စာလုံး 64 လုံး၊ `?` = တစ်ခု)။ ပွဲစဉ်များသည် `[CUSTOM_REDACTED]` ဖြစ်လာသည်။ ပုံစံတိုင်းသည် `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`) မှတဆင့် ဖြတ်သန်းသွားသည် : စာလုံးရေ 500 အများဆုံး၊ `g i m s u` တွင် ကန့်သတ်ထားသော အလံများ၊ စုစည်းရမည်ဖြစ်ပြီး၊ `safe-regex` (ဘေးဥပဒ်ဖြစ်စေသော နောက်ကြောင်းပြန်လှည့်ခြင်း) ကို ကျော်သွားရမည်၊ နှင့် ဗလာစာကြောင်း သို့မဟုတ် အစားထိုးခြင်းနေရာယူထားသည့်နေရာနှင့် မကိုက်ညီရပါ။ သိမ်းဆည်းပြီး စမ်းသပ်သည့်အခါတွင် ပျက်ကွက်သည့်ပုံစံကို ငြင်းဆိုလိုက်ပြီး မအောင်မြင်သည့် အတန်းကို စုစည်းထားမည့်အစား runtime တွင် ကျော်သွားပါသည်။ မျက်နှာဖုံးစွပ်ခြင်းကို ဖွင့်ထားချိန်တွင် စိတ်ကြိုက်ပုံစံများသာ လုပ်ဆောင်သည်။
- **ထောက်လှမ်းကောင်တာများ** — အမျိုးအစားအလိုက် ရေတွက်ခြင်း (ဘယ်တော့မှ မတူညီသောတန်ဖိုးများ)၊ မှတ်ဉာဏ်တွင် သိမ်းဆည်းထားပြီး ပြန်လည်စတင်ချိန်တွင် ပြန်လည်သတ်မှတ်ပါ (`src/lib/pii/piiDetectionStats.ts`)။ ၎င်းတို့သည် မျက်နှာဖုံးများကို ဖွင့်ထားစဉ်တွင်သာ တိုးများလာသည်။

ဆက်တင်များကို `key_value` ဇယား (namespace `pii_settings`၊ `src/lib/db/piiSettings.ts`) တွင်နေထိုင်ပြီး 1 s ကက်ရှ်တစ်ခုမှတဆင့်ဖတ်သည်။ API

| နည်းလမ်း | လမ်းကြောင်း              | ရည်ရွယ်ချက်                                                                                             |
| -------- | ------------------------ | ------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/settings/pii`      | Flag အခြေအနေ၊ `enabledTypes`၊ `customPatterns`၊ detection counter များ                                  |
| `PUT`    | `/api/settings/pii`      | `enabledTypes` (`null` = အားလုံး) နှင့်/သို့မဟုတ် `customPatterns` ကို အစားထိုးခြင်း                    |
| `POST`   | `/api/settings/pii/test` | နမူနာစာသား အများဆုံး ၈ KB အပေါ် pattern တစ်ခုကို dry-run စမ်းသပ်ခြင်း၊ မည်သည့်အရာမျှ သိမ်းဆည်းမထားခြင်း |

သုံးခုစလုံးသည် စီမံခန့်ခွဲမှုစစ်မှန်ကြောင်း လိုအပ်ပြီး Zod (`src/shared/validation/schemas/piiSettings.ts`) ဖြင့် ခန္ဓာကိုယ်ကို မှန်ကန်ကြောင်း အတည်ပြုသည်။ အကောင့်ဝင်ခြင်းကိုပိတ်ထားသဖြင့် (`requireLogin=false`) `GET` နှင့် စမ်းသပ်မှုအဆုံးမှတ်ကို ဖွင့်ထားသော်လည်း `PUT` ဒက်ရှ်ဘုတ်စက်ရှင်တစ်ခု၊ `manage` -scope API သော့၊ စာရေးစကေးနှင့်အထက်ရှိသော `oma_` ဝင်ရောက်နိုင်သော တိုကင်တစ်ခု သို့မဟုတ် CLI တိုကင် သို့မဟုတ် စက်တွင်း-ဝန်ဆောင်မှု တိုကင်ကို လှည့်ပတ်မှ ပေးပို့လိုက်ပါသည်။

#### GDPR (EU) နှင့် POPIA (တောင်အာဖရိက) ခွဲခြားသတ်မှတ်မှုများ

| Id                  | Identifier               | Validation                                                                                                 |
| ------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                     | သိရှိထားသော နိုင်ငံ၊ ထိုနိုင်ငံအတွက် အတိအကျကိုက်ညီသော အရှည်၊ ISO 13616 MOD-97-10                           |
| `eu_vat`            | EU VAT number            | သိရှိထားသော member-state prefix နှင့် ထိုပြည်နယ်၏ number format (VIES lookup မပါဝင်)                       |
| `es_dni_nie`        | Spanish DNI / NIE        | Control letter (တန်ဖိုး mod 23)၊ NIE သည် `X/Y/Z` + ဂဏန်း ၇ လုံး                                            |
| `it_codice_fiscale` | Italian Codice Fiscale   | odd/even position table များမှ control letter                                                              |
| `pl_pesel`          | ပိုလန် PESEL             | အလေးပေး checksum နှင့် encoded လုပ်ထားသော မွေးလ/ရက်၏ ယုတ္တိရှိသောအပိုင်းအခြားများ                          |
| `nl_bsn`            | Dutch BSN                | 11-proof (weights 9..2, -1)                                                                                |
| `de_steuer_id`      | German Steuer-ID         | ISO 7064 Mod 11,10 နှင့် digit-structure rule များ (ရှေ့ဆုံး 0 မဖြစ်ရ)                                     |
| `se_personnummer`   | Swedish personnummer     | နောက်ဆုံး ဂဏန်း ၁၀ လုံးအပေါ် Luhn နှင့် ဖြစ်နိုင်ဖွယ်ရှိသော မွေးသက္ကရာဇ် (ဂဏန်း ၁၀ လုံး သို့မဟုတ် ၁၂ လုံး) |
| `za_id`             | South African ID number  | ဂဏန်း ၁၃ လုံးအားလုံးအပေါ် Luhn၊ မှန်ကန်သော မွေးလနှင့် မွေးရက်၊ citizenship digit 0 သို့မဟုတ် 1             |
| `za_phone`          | South African phone      | `+27` / `27` prefix သို့မဟုတ် space သို့မဟုတ် hyphen ဖြင့် ရေးထားသော national `0..` ပုံစံ                  |
| `za_vat`            | South African VAT number | `4` ဖြင့်စသော ဂဏန်း ၁၀ လုံး **နှင့်** ရှေ့ရှိ အက္ခရာ ၄၈ လုံးအတွင်း "VAT" / "BTW" ပါဝင်ခြင်း                |
| `za_tax_ref`        | South African tax ref.   | `0`-`3` ဖြင့်စသော ဂဏန်း ၁၀ လုံး၊ Luhn၊ **နှင့်** ရှေ့ရှိ အက္ခရာ ၄၈ လုံးအတွင်း "tax" / "SARS" ပါဝင်ခြင်း    |

ဂဏန်းသီးသန့်ဖော်မတ်များသည် အမှာစာနံပါတ်များ၊ တည်ဆောက်သည့်နံပါတ်များနှင့် အချိန်တံဆိပ်တုံးများနှင့် တိုက်မိသောကြောင့်၊ အညံ့ဆုံးများ (`za_vat`၊ `za_tax_ref`) သည် အဓိကစကားလုံး cue လိုအပ်ပြီး ဂဏန်းဆယ်လုံးပါ `0..` နံပါတ်ကို တောင်အာဖရိကဖုန်းနံပါတ်အဖြစ် သဘောထားမည်မဟုတ်ပါ။ ခွဲထားသော IBANs (`GB29 NWBK ...`) သည် မကိုက်ညီပါ။ တိုက်ရိုက်ထုတ်လွှင့်သည့်လမ်းကြောင်းတွင် လက်ရှိအပိုင်းအတွင်း၌သာ ကွင်းဆက်ကို ကြည့်ရှုသည်။ ids များသည် ယေဘူယျဖုန်းပုံစံများထက် ရှေ့တွင်ရှိနေသောကြောင့် တရားဝင်သတ်မှတ်ထားသော identifier သည် ၎င်း၏ကိုယ်ပိုင်နေရာယူထားသည် (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ... ) ကို သိမ်းဆည်းထားသည်။ `gdpr` နှင့် `popia` နမူနာများသည် EU နှင့် တောင်အာဖရိက အိုင်ဒီများကို အသီးသီး ရွေးချယ်သည်။ မျက်နှာဖုံးစွပ်ခြင်းတွင် ကိုယ်တိုင်ပါဝင်ခွင့်ရှိမည် (Hard Rule #20) : ဤနေရာတွင် အင်္ဂါရပ်အလံပုံသေကို မည်သည့်အရာမှ မပြောင်းလဲပါ။

### Prompt Injection (`promptInjection.ts`)

အသုံးပြုသူပေးပို့သော အကြောင်းအရာအတွင်းရှိ တိုက်ခိုက်မှုဆန်သော ဖွဲ့စည်းပုံများကို
ရှာဖွေပြီး သတ်မှတ်ထားသော policy ကို အကောင်အထည်ဖော်သည်။ လုပ်ဆောင်ပုံကို
environment variable များနှင့် constructor options များက ထိန်းချုပ်သည်-

| သတ်မှတ်ချက်     | Env var                                                                                               | မူလတန်ဖိုး | အကျိုးသက်ရောက်မှု                                                                                                                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ဖွင့်ထားခြင်း   | `INPUT_SANITIZER_ENABLED`                                                                             | `true`     | `false` ဖြစ်ပါက guardrail သည် ချက်ချင်းရပ်တန့်သည်။                                                                                                                                                     |
| Mode            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`     | Injection policy: `block`, `warn`, သို့မဟုတ် `log`။ (`redact` ကို back-compat အတွက် လက်ခံသော်လည်း injection စာသားကို **မဖယ်ရှားပါ**။ request PII rewrite ကို `PII_REDACTION_ENABLED` က ထိန်းချုပ်သည်။) |
| Block threshold | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`     | block လုပ်ရန် လိုအပ်သော အနည်းဆုံး severity။ မူလသတ်မှတ်ချက်တွင် Medium ကို စောင့်ကြည့်ရုံသာ လုပ်သည်။                                                                                                    |

**Mode precedence** (`getMode`) မှာ caller `options.mode` →
`INJECTION_GUARD_MODE` **DB feature-flag override** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn` ဖြစ်သည်။ ထို့ကြောင့် dashboard override သည် env vars များထက် ဦးစားပေးပြီး
Feature Flags UI က လုပ်ဆောင်နေသော guard ကို restart မလုပ်ဘဲ တိုက်ရိုက်ထိန်းချုပ်နိုင်သည်။
DB ဖတ်ရှုမှုသည် fail-safe ဖြစ်သည်- အမှားဖြစ်ပါက guard သည် env-based လုပ်ဆောင်ပုံသို့
ပြန်လည်ကျဆင်းမည်ဖြစ်ပြီး override သတ်မှတ်မထားပါက env-only resolution နှင့်
လုပ်ဆောင်ပုံတူညီသည်။

ရှာဖွေသည့် အရင်းအမြစ်များ-

1. `@/shared/utils/inputSanitizer` မှ `sanitizeRequest()` (pipeline အတွင်း အခြားနေရာများတွင် အသုံးပြုသည့် shared detector set)။
2. Built-in `DEFAULT_GUARD_PATTERNS` (`system_override_inline` နှင့်
   `markdown_system_block` တို့ဖြစ်ပြီး နှစ်ခုစလုံးသည် `high` severity ဖြစ်သည်)။
3. Constructor options မှတစ်ဆင့် ပေးပို့နိုင်သော optional `customPatterns`
   (strings၊ regex၊ သို့မဟုတ် `{ name, pattern, severity }` records)။

`mode === "block"` ဖြစ်ပြီး severity threshold ကို ဖြည့်မီသော detection အနည်းဆုံး
တစ်ခုရှိပါက `preCall` သည် `{ block: true, message: "Request rejected:
suspicious content detected" }` ကို ပြန်ပေးသည်။ `warn`/`log` modes များတွင်
guardrail သည် log မှတ်တမ်းတင်သော်လည်း call ကို ခွင့်ပြုသည်။ Shared helper
`evaluatePromptInjection()` ကို registry မှတစ်ဆင့် မဖြတ်သန်းဘဲ prompt များကို
အကဲဖြတ်လိုသော caller များအတွက်လည်း export လုပ်ထားသည်။

**Scan bound (v3.8.20):** detector သည် ပေါင်းစည်းထားသော prompt စာသား၏
**ပထမ 16 KB** ကိုသာ စစ်ဆေးသည် — `MAX_INJECTION_SCAN_BYTES = 16 * 1024`
(16 384 bytes) ကို `src/shared/utils/inputSanitizer.ts` တွင် သတ်မှတ်ထားသည်။
`detectInjection()` နှင့် `evaluatePromptInjection()` နှစ်ခုစလုံးသည် pattern loop
မလုပ်ဆောင်မီ `slice(0, MAX_INJECTION_SCAN_BYTES)` ကို အသုံးပြုသည်။ Injection
ညွှန်ကြားချက်များသည် input ၏ အပေါ်ပိုင်းအနီးတွင် ရှိသောကြောင့် multi-hundred-KB
payload များတွင် regex CPU/GC အသုံးပြုမှုကို ကန့်သတ်ပေးပြီး detection ကို
အားနည်းစေခြင်းမရှိပါ (#3932, #4041 ကိုကြည့်ပါ)။

### Credential Masker (`credentialMasker.ts`)

အဆင့်နှစ်ခုစလုံးတွင် လုပ်ဆောင်ပြီး default chain ၏ နောက်ဆုံးနေရာ (priority `95`) တွင်
ရှိသည်။ အပြင်သို့ပို့မည့် payload (message content၊ tool-call arguments၊ tool
results) **နှင့်** provider response ထဲရှိ လူသိများသော API-key / secret-token pattern
များကို redact လုပ်ပေးသောကြောင့် prompt ထဲသို့ ထည့်သွင်းထားသော credential တစ်ခု
(သို့မဟုတ် tool result က ပြန်လည်ထည့်သွင်းပေးသော credential တစ်ခု) သည် upstream
provider ထံသို့ဖြစ်စေ client ထံသို့ဖြစ်စေ ပေါက်ကြားမည်မဟုတ်ပါ။

- **Opt-in သာဖြစ်သည်**၊ PII redaction နှင့် တူညီသော convention ဖြစ်သည်
  (Hard Rule #20-adjacent)- `settings.credentialRedactionEnabled === true`
  **သို့မဟုတ်** `CREDENTIAL_REDACTION_ENABLED=true` ဖြစ်မှသာ ဖွင့်သည်။ ၎င်းကို
  ပိတ်ထားပါက guardrail သည် no-op ဖြစ်ပြီး မည်သည့်အခါမျှ block မလုပ်သကဲ့သို့
  rewrite လည်း မလုပ်ပါ။
- `redactCredentials()` သည် payload/response tree တစ်ခုလုံးကို
  (`walkValue()`၊ prototype-pollution-safe၊ `WeakSet` မှတစ်ဆင့် cycle-safe)
  လှည့်လည်စစ်ဆေးပြီး ကိုက်ညီမှုများကို `[REDACTED:<type>]` placeholder ဖြင့်
  အစားထိုးသည်။ အမှန်တကယ်ပြောင်းလဲသွားသော branch များကိုသာ clone လုပ်သည်။
- `CREDENTIAL_PATTERNS` တွင် LLM provider key များ (OpenAI၊ OpenAI-proj၊
  Anthropic၊ Google၊ Hugging Face၊ Replicate)၊ VCS/SaaS token များ (GitHub၊
  Slack၊ Linear၊ Notion၊ npm၊ Postman၊ Discord)၊ payment key များ (Stripe၊
  Square)၊ cloud key များ (AWS access key၊ Twilio၊ SendGrid၊ Mailgun)၊ private
  key / JWT များ၊ credential ပါဝင်သော connection string များ
  (`mongodb://user:pass@...` စသည်) နှင့် ယေဘုယျ
  `Authorization`/`x-api-key`/`api-key`/`apikey` header-value pattern တို့
  ပါဝင်သည်။ Header ပုံစံ key များ (`authorization`, `x-api-key`, `api-key`,
  `apikey`) ကို ယေဘုယျ text regex ဖြင့်မဟုတ်ဘဲ ဖွဲ့စည်းပုံအရ (value ကိုသာ)
  redact လုပ်သည်။ ထိုသို့လုပ်ရာတွင် `Bearer `/`Basic ` ကဲ့သို့ scheme prefix ကို
  ထိန်းသိမ်းထားသည်။
- Guardrail သည် မည်သည့်အခါမျှ block မလုပ်ပါ။ ၎င်းသည် rewrite
  (`modifiedPayload` / `modifiedResponse`) လုပ်ပြီး annotation
  (`meta.credentialsRedacted`, `meta.count`) များကိုသာ ထည့်သွင်းသည်။

ပြန်လည်ပျက်ယွင်းမှု ကာကွယ်ရေး: `tests/unit/credential-masker-guardrail.test.ts`

## အခြေခံစာချုပ် (`base.ts`)

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
  block?: boolean; // true ဖြစ်ပါက chain ကို short-circuit လုပ်သည်
  message?: string; // block လုပ်သည့်အခါ ပြသသည်
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // request ကို ပြင်ဆင်ရေးသားရန် preCall မှ return လုပ်သည်
  modifiedResponse?: TValue; // response ကို ပြင်ဆင်ရေးသားရန် postCall မှ return လုပ်သည်
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

Guardrail တစ်ခုသည် `void`၊ `{}` သို့မဟုတ် `{ block: false }` ကို return လုပ်ခြင်းဖြင့် "ပြောင်းလဲမှုမရှိ" ဟု အချက်ပြသည်။ `modifiedPayload`/`modifiedResponse` ကို return လုပ်ခြင်းက နောက်ဆက်တွဲ guardrail များအတွက် chain တစ်လျှောက် စီးဆင်းနေသော တန်ဖိုးကို အစားထိုးသည်။ `signal?: AbortSignal` သည် caller lifecycle ကို guardrail များအတွင်းသို့ သယ်ဆောင်သွားသည်။ Request abort သည် ရည်ရွယ်ချက်ရှိရှိ fail-open ခြွင်းချက်ဖြစ်သည်- media bridge များသည် raw media ကို ၎င်းကို မပံ့ပိုးကြောင်း သိရှိထားသော target သို့ ပြန်လည်မထားရှိဘဲ အလုပ်ကို ရပ်တန့်ကာ ရှင်းလင်းရေးကို ဆောင်ရွက်သည်။

## Registry (`registry.ts`)

Singleton `guardrailRegistry` သည် အောက်ပါတို့ကို ထုတ်ပေးသည်-

- `register(guardrail)` — guardrail တစ်ခုကို ထည့်သွင်းသည် (သို့မဟုတ် normalized name ဖြင့် အစားထိုးသည်) ပြီးနောက် `priority` အလိုက် တက်စဉ်အစဉ် ပြန်လည်စီသည်။
- `clear()` / `list()` — စီမံခန့်ခွဲမှုဆိုင်ရာ အကူပညီ function များ။
- `runPreCallHooks(payload, context)` — active guardrail များကို တစ်ခုချင်းစီ လုပ်ဆောင်ပြီး၊ payload ကို `modifiedPayload` မှတစ်ဆင့် ချိတ်ဆက်သယ်ဆောင်ကာ ပထမဆုံး `block: true` တွင် ရပ်တန့်သည်။
- `runPostCallHooks(response, context)` — response ဘက်ခြမ်းတွင်လည်း အလားတူ flow ဖြစ်သည်။
- `resetGuardrailsForTests({ registerDefaults })` — state ကို ရှင်းလင်းပြီး သန့်ရှင်းသော test isolation ရရှိရန် defaults များကို ရွေးချယ်စွာ ပြန်လည်မှတ်ပုံတင်သည်။

Runner နှစ်ခုလုံးသည် `{ blocked, payload|response, results, guardrail?, message? }` ကို return လုပ်ပြီး၊ ၎င်းတို့အနက် `results` သည် tracing အတွက် အသုံးဝင်သော guardrail တစ်ခုချင်းစီအတွက် `blocked`၊ `skipped`၊ `modified`၊ `error` နှင့် `meta` field များ ပါဝင်သည့် `GuardrailExecutionResult` record များ၏ array ဖြစ်သည်။

### Request တစ်ခုချင်းစီအလိုက် Guardrail များ ပိတ်ထားခြင်း

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` သည် လက်ရှိ request အတွက် ကျော်လွှားသင့်သော guardrail အမည်များ၏ de-duplicated စာရင်းကို စုစည်းပေးသည်။ Channel ငါးခု ရှိပြီး၊ ဤအစဉ်အတိုင်း ဖတ်ရှု၍ စာရင်းတစ်ခုတည်းသို့ ပေါင်းစည်းသည် (de-duplicate လုပ်သည့်အခါ ပထမဆုံး တွေ့ရှိမှုက အသားရသည်)-

1. `apiKeyInfo.disabledGuardrails`
2. Request body `disabledGuardrails` (top-level)
3. Request body `metadata.disabledGuardrails` (`metadata` သည် object ဖြစ်မှသာလျှင်)
4. Header `x-omniroute-disabled-guardrails`
5. Legacy header `x-disabled-guardrails`

Channel ငါးခုလုံးကို ပေါင်းစည်းထားပြီး header နှစ်ခုလုံး ပါဝင်သည်- `x-omniroute-disabled-guardrails` နှင့် `x-disabled-guardrails` နှစ်ခုလုံးကို ပေးပို့ခြင်းက ၎င်းတို့စာရင်းများ၏ union ကို ကျော်လွှားစေပြီး၊ ခေတ်သစ် header အလွတ်က legacy header ကို ထပ်မံဖုံးကွယ်ခြင်း မရှိတော့ပါ ([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412) — [#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805) တွင် ပြင်ဆင်ပြီး)။

တန်ဖိုးများသည် string များ၏ array များ သို့မဟုတ် ကော်မာခွဲထားသော string ဖြစ်နိုင်သည်။ အမည်များကို trim လုပ်ပြီး lowercase kebab-case သို့ normalized လုပ်သည် (`pii_masker` → `pii-masker`)။ ဗလာ entry များကို ဖယ်ထုတ်သည်။ ရလဒ်ကို `context.disabledGuardrails` မှတစ်ဆင့် registry သို့ ပေးပို့ပြီး၊ registry က ကိုက်ညီသော guardrail များကို ကျော်လွှားသည် (`results` အတွင်းတွင် `skipped: true`)။

ပိတ်ထားသည့်စာရင်းက **registry** ကိုသာ သက်ရောက်စေသည်။ Prompt-injection `block` mode သည် မဖြစ်မနေ လိုက်နာရမည့် နယ်စပ်မျဉ်းဖြစ်သည်- injection-guard middleware (`src/middleware/promptInjectionGuard.ts`) သည် caller-controlled ပိတ်ထားစာရင်း မရှိဘဲ `evaluatePromptInjection()` ကို ခေါ်ဆိုသည် (၎င်းအသုံးပြုခဲ့ဖူးသော အသုံးမကျတော့သော `resolveDisabledGuardrails({ body })` ခေါ်ဆိုမှုကို [#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934) တွင် ဖယ်ရှားလိုက်သည်)။ ထို့ကြောင့် `prompt-injection` ကို ပိတ်ထားသော request သည် `block` mode တွင် ဆက်လက် ငြင်းပယ်ခံရမည်။ ဤသည်မှာ ဒီဇိုင်းရည်ရွယ်ချက်အတိုင်းဖြစ်သည်။ ပိတ်ထားသည့် channel များသည် caller-controlled (request body၊ metadata၊ headers) ဖြစ်ပြီး၊ caller တစ်ဦးက operator သတ်မှတ်ထားသော လုံခြုံရေးထိန်းချုပ်မှုကို ပိတ်နိုင်ခြင်း မရှိရပါ ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413))။ [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412) မှ header union သည် မည်သည့် registry guardrail များ ကျော်လွှားခံရမည်ကိုသာ ပြောင်းလဲစေပြီး client ကို middleware ကို ကျော်ဖြတ်ခွင့် မပေးပါ။ မဖြစ်မနေ per-key နှင့် per-group guardrail မူဝါဒများကို v4 RFC [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417) တွင် ခြေရာခံထားသည်။ [လွှမ်းခြုံမှုနှင့် ကန့်သတ်ချက်များ](#coverage-and-limits) ကို ကြည့်ပါ။

## ဆောင်ရွက်မှု အစဉ်

`src/sse/handlers/chat.ts` နှင့် `open-sse/handlers/chatCore.ts` မှတဆင့် ဖြတ်သန်းသွားသော request တစ်ခုချင်းစီအတွက် ([လွှမ်းခြုံမှုနှင့် ကန့်သတ်ချက်များ](#coverage-and-limits) အောက်တွင် ဖော်ပြထားသော chat-family route များ):

1. `resolveDisabledGuardrails(...)` သည် API key၊ body နှင့် headers များမှ skip list ကို တည်ဆောက်သည်။
2. `guardrailRegistry.runPreCallHooks(body, ctx)` သည် guardrail များကို priority အစဉ်အလိုက် (အနိမ့်မှ အမြင့်) run သည်:
   - ပိတ်ထားသော guardrail များကို `skipped` အဖြစ် မှတ်တမ်းတင်သည်။
   - Guardrail တစ်ခုချင်းစီ၏ `preCall` သည် `modifiedPayload` မှတဆင့် payload ကို ပြင်ဆင်ရေးသားနိုင်သည်။
   - ပထမဆုံး `block: true` သည် chain ကို short-circuit လုပ်ပြီး handler သည် guardrail ပယ်ချမှု response ကို ပြန်ပေးသည်။
3. (ပြင်ဆင်ရေးသားထားနိုင်သော) payload သည် combo routing နှင့် upstream dispatch ဆီသို့ စီးဝင်သည်။
4. **Non-streaming သီးသန့်:** response ကို စုစည်းပြီးနောက်၊ `guardrailRegistry.runPostCallHooks(...)` သည် response ပေါ်တွင် အတူတူ chain ကို run သည်။ ဤနေရာတွင် `block: true` သည် upstream response ကို ပယ်ပြီး HTTP 400 ကို ပြန်ပေးသည်။ Streamed response များသည် ဤအဆင့်ကို လုံးဝ ကျော်သွားသည်။

Throw လုပ်သော guardrail များကို `error: <message>` ဖြင့် မှတ်တမ်းတင်ပြီး `logger.warn` မှတဆင့် log ထုတ်သည်၊ သို့သော် chain သည် ဆက်လက်လုပ်ဆောင်သည် — ဒီဇိုင်းအရ fail-open ဖြစ်သည်။

## လွှမ်းခြုံမှုနှင့် ကန့်သတ်ချက်များ

Guardrail registry သည် chat pipeline တွင်သာ ချိတ်ဆက်ထားသည်။ ဤကန့်သတ်ချက်များကို `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` နှင့် `tests/unit/guardrail-pipeline-characterization.test.ts` တို့က pin ထားသည်။ အပြုအမူ ပြောင်းလဲသည့်အခါ ၎င်း test များကို ရည်ရွယ်ချက်ရှိရှိ update လုပ်ပါ။

### Hook များ run ရာနေရာ

| Hook / ထိန်းချုပ်မှု                | Run ရာနေရာ                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                   | `handleChat` (`src/sse/handlers/chat.ts`) က ကိုင်တွယ်သော request များ: `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (နှင့် `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` နှင့် Telegram chat proxy။ ထို့ပြင် dashboard test endpoint `/api/guardrails/test`။ Pre-call block သည် HTTP 400 ကို ပြန်ပေးသည်။ |
| `runPostCallHooks`                  | **Non-streaming** chat response များသာ (`open-sse/handlers/chatCore/nonStreamingResponse.ts`)။ Streamed response များ ဘယ်တော့မှ မရောက်ပါ။                                                                                                                                                                                                                                                                                                     |
| Streaming PII                       | `PII_RESPONSE_SANITIZATION` ဖွင့်ထားသောအခါ `streamingPipeline.ts` တွင် pipe လုပ်ထားသော `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`)။ ၎င်းသည် guardrail မဟုတ်သဖြင့် disable channel များက ၎င်းကို သက်ရောက်စေခြင်း မရှိပါ။                                                                                                                                                                                                      |
| Injection-guard middleware (legacy) | Prompt ပါဝင်သော `/v1` route တိုင်း၊ chat-family အပါအဝင် ([route လွှမ်းခြုံမှု](#injection-guard-route-coverage--red-team-phase-8--block-d) ကို ကြည့်ပါ)။ Prompt injection သီးသန့်သာ။                                                                                                                                                                                                                                                          |

### လွှမ်းခြုံခံ မရသော အရာများ

- **Media, embeddings နှင့် data route များ** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) သည် registry ဆီ ဘယ်တော့မှ
  မရောက်ပါ။ PII masking၊ credential masking သို့မဟုတ် modality bridge
  မည်သည်ကမှ အဲဒီမှာ run ခြင်း မရှိပါ။ ၎င်းတို့၏ တစ်ခုတည်းသော စစ်ဆေးမှုမှာ
  legacy injection-guard middleware သာဖြစ်သည်။
- **Streamed response များ**သည် post-call guardrail များ မရရှိပါ။ `pii-masker`
  သို့မဟုတ် `credential-masker` post-call မရှိပါ၊ post-call block လည်း
  မရှိပါ။ Streaming PII transform သာ အသုံးချသည် (`PII_RESPONSE_SANITIZATION`
  ဖွင့်ထားသောအခါ)။ Streamed response တွင် ပြန်လည်တုန့်ပြန်သော credential ကို
  redact လုပ်ခြင်း မရှိပါ။
- **Disable channel များနှင့် middleware (ဒီဇိုင်းအရ):** middleware သည်
  `evaluatePromptInjection()` သို့ ၎င်း၏ကိုယ်ပိုင် call ဖြင့် prompt injection ကို
  အကဲဖြတ်ပြီး caller ထိန်းချုပ်နိုင်သော disable list မည်သည်ကိုမျှ မပေးပို့ပါ။
  `block` mode သည် caller ထိန်းချုပ်နိုင်သော disable များ ကျော်လွှားနိုင်ခြင်း
  မရှိသော မဖြစ်မနေ နယ်စပ်ဖြစ်ပြီး chat-family route များတွင်လည်း
  အပါအဝင်ဖြစ်သည်
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413))။
  `prompt-injection` ကို ပိတ်ခြင်းက registry guardrail ကိုသာ ကျော်သွားစေသည်။

### Post-call မတိုင်မီ response ကို မြင်တွေ့ရသော အရာများ

Non-streaming path တွင် အစဉ်မှာ: memory ထုတ်ယူမှု → built-in tool
ဆောင်ရွက်မှု → post-call guardrail များ → post-call block ထွက်ခွာမှု →
semantic-cache သိမ်းဆည်းမှု ဖြစ်သည်။

- **မှတ်ဉာဏ် ထုတ်ယူခြင်း (Memory extraction)** နှင့် **tool လုပ်ဆောင်ခြင်း (tool execution)** တို့သည် post-call
  guardrails များက ပြင်ဆင်ရေးသားခြင်း သို့မဟုတ် ပိတ်ဆို့ခြင်း မပြုလုပ်မီ
  response ကို မြင်တွေ့ရသည်။
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) စတင်ပြီးနောက်၊
  `PII_RESPONSE_SANITIZATION` ကို ဖွင့်ထားသောအခါ (streaming ဖြစ်စေ non-streaming ဖြစ်စေ နှစ်မျိုးလုံးတွင်)
  မှတ်ဉာဏ် ထုတ်ယူခြင်းက ထုတ်ယူထားသော စာသားကို `sanitizePII` မှတဆင့် လုပ်ဆောင်ပေးသော်လည်း၊
  post-call မှ နောက်ပိုင်းတွင် ပိတ်ဆို့လိုက်သော response တစ်ခုမှာ
  မှတ်ဉာဏ်နှင့် tool များထံ ရောက်ရှိပေးပို့ပြီးသား ဖြစ်နေဆဲဖြစ်သည်။
- **Semantic cache** သည် post-call ပြီးဆုံးပြီးနောက်မှသာ response ကို သိမ်းဆည်းသောကြောင့်
  ပြင်ဆင်ရေးသားပြီးသား response ကိုသာ သိမ်းဆည်းပြီး၊ ပိတ်ဆို့ခံထားရသော response ကို
  လုံးဝ cache လုပ်ခြင်းမရှိပါ။ Cache entry များကို API key တစ်ခုချင်းစီအလိုက်
  key ချိတ်ထားသည်။

## ဖော်ပြချက်များ

Built-in guardrail များမှ ဖတ်ရှုသော environment variable များ:

| Variable                              | အသုံးပြုသည့်နေရာ          | အကျိုးသက်ရောက်မှု                                                                                                            |
| ------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | ရှာဖွေဖော်ထုတ်မှုကို လုံးဝပိတ်လိုက်ရန် `false` ဟု သတ်မှတ်ပါ။                                                                 |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Injection မူဝါဒ: `warn`, `block`, သို့မဟုတ် `log`။ Legacy တန်ဖိုး `redact` သည် injection စာသားကို ပြင်ဆင်ရေးသားခြင်း မပြုပါ။ |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Injection guard ၏ mode; ထို့ပြင် env var များကို **အစားထိုး**သော DB feature flag လည်း ဖြစ်သည် (DB > ENV)။                    |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | `MODE=block` က ငြင်းပယ်မည့် အနည်းဆုံး ပြင်းထန်မှုအဆင့်: `high` (ပုံသေ), `medium`, သို့မဟုတ် `low`။                           |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | `INPUT_SANITIZER_BLOCK_THRESHOLD` ၏ legacy alias ဖြစ်သည်။                                                                    |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | `true` ဖြစ်သောအခါ request ထဲရှိ PII ကို ဖုံးကွယ်ဖျက်ပစ်သည် (injection mode နှင့် သက်ဆိုင်မှုမရှိဘဲ)။                         |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Response ဘက်ခြမ်း masker ၏ လုပ်ဆောင်ပုံကို ထိန်းချုပ်သည်။                                                                    |

Modality Bridge guardrail များသည် runtime config ကို env var များမှ မဟုတ်ဘဲ DB-backed settings store (`getSettings()`) မှ ဖတ်ရှုသည်။ Vision ၏ primary key များမှာ `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` နှင့် `modalityBridgeCacheMaxEntries` တို့ ဖြစ်သည်။ Legacy `visionBridge*` key များကို စာရွက်စာတမ်းတွင် ဖော်ပြထားသည့် one-cycle read fallback အဖြစ်သာ လက်ခံပြီး dashboard ရေးသားမှုများတွင် primary key များကို အသုံးပြုသည်။ Default များနှင့် fallback resolver သည် `src/shared/constants/modalityBridgeDefaults.ts` တွင် ရှိပြီး legacy constant များကို `src/shared/constants/visionBridgeDefaults.ts` တွင် ဆက်လက်ထားရှိထားသည်။

Audio သည် `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`, `modalityBridgeAudioTimeout` နှင့် `modalityBridgeAudioMaxClips` တို့အပြင် shared `modalityBridgeCache*` setting များကိုပါ အသုံးပြုသည်။ ဤ key များကို Modality Bridge schema နှင့်အတူ မိတ်ဆက်ခဲ့ခြင်း ဖြစ်သောကြောင့် Audio တွင် legacy-key fallback မရှိပါ။

Video သည် `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`, `modalityBridgeVideoModel`, `modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`, `modalityBridgeVideoMaxVideos` နှင့် `modalityBridgeVideoTimeout` တို့အပြင် shared `modalityBridgeCache*` setting များကိုပါ အသုံးပြုသည်။ FFmpeg/ffprobe များသည် optional operational dependency များဖြစ်ပြီး frame captioning က latency နှင့် model ကုန်ကျစရိတ်ကို တိုးစေသောကြောင့် ၎င်းကို default အဖြစ် ပိတ်ထားသည်။

## စိတ်ကြိုက် Guardrail များ

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

အဆင့်များ:

1. `BaseGuardrail` ကို extend လုပ်ထားသော `src/lib/guardrails/myGuardrail.ts` ကို ဖန်တီးပါ။
2. `preCall` နှင့်/သို့မဟုတ် `postCall` ကို implement လုပ်ပါ။
3. import လုပ်သည့်အချိန်တွင် register လုပ်ပါ (`registerDefaultGuardrails` မှ push လုပ်ခြင်း) သို့မဟုတ်
   runtime တွင် `guardrailRegistry.register(...)` ကို ခေါ်ပါ — registry သည်
   normalized name တူညီသော ယခင် guardrail ကို အစားထိုးလိမ့်မည်။
4. `tests/unit/` အောက်တွင် test များ ထည့်ပါ (လက်ရှိ ဥပမာများ:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`)။

## စမ်းသပ်ခြင်း

သိရှိပြီးသား အခြေအနေတစ်ခုမှ စတင်ရန် test များအကြားတွင် `resetGuardrailsForTests()` ကို အသုံးပြုပါ။
registry အလွတ်ဖြင့် စတင်ကာ စမ်းသပ်နေသော guardrail များကိုသာ register လုပ်ရန်
`{ registerDefaults: false }` ကို ပေးပါ။ Vision Bridge သည် dependency
injection ကို လက်ခံပါသည် (`deps.getSettings`, `deps.callVisionModel`)။ Audio Bridge သည်လည်း
settings၊ capabilities၊ STT model ရွေးချယ်မှု၊ credential စစ်ဆေးမှုများနှင့်
transcription အတွက် ညီမျှသော seam များကို ထုတ်ပေးထားပါသည်။ ထို့ကြောင့် test များသည် DB သို့မဟုတ်
network access မလိုအပ်ဘဲ flow နှစ်ခုလုံးကို လေ့ကျင့်စမ်းသပ်နိုင်ပါသည်။

## ဆက်စပ်ကြည့်ရှုရန်

- `src/lib/guardrails/` — အကောင်အထည်ဖော်မှု
- `src/shared/utils/inputSanitizer.ts` — prompt-injection နှင့် PII masking
  ကို မောင်းနှင်ပေးသော အသုံးချ detector
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge default များနှင့်
  forced-bridge model စာရင်း
- `src/shared/constants/modalityBridgeDefaults.ts` — အသုံးချ Vision/Audio runtime default များ
- `docs/architecture/RESILIENCE_GUIDE.md` — သီးခြားလွတ်လပ်သော layer (circuit breaker, cooldown များ)
- `docs/reference/ENVIRONMENT.md` — env var reference အပြည့်အစုံ

## Injection-guard route လွှမ်းခြုံမှုနှင့် red-team (Phase 8 · Block D)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) သည် user prompt များကို
လက်ခံသည့် route အားလုံးကို လွှမ်းခြုံပါသည်။ ၎င်းသည် `INJECTION_GUARD_MODE` ကို လေးစားလိုက်နာပါသည်
(default `warn` = log သာထားခြင်း၊ `block` = HTTP 400 `SECURITY_001` ပြန်ပေးခြင်း)။

| အမျိုးအစား             | Routes                                                                                                                                               | ပုံသေ mode |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| စာသား (လက်ရှိ)         | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn       |
| ဖန်တီးမှု (Generative) | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn       |
| ဒေတာ                   | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn       |

စာသားထုတ်ယူခြင်း (`extractMessageContents`) သည် `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` ကို လွှမ်းခြုံပါသည်။

**Red-team (ညအခါ, `nightly-llm-security.yml`):** promptfoo သည် `INJECTION_GUARD_MODE=block`
အတွင်းတွင် route တစ်ခုချင်းစီက OWASP-LLM corpus ကို ပိတ်ဆို့ကြောင်း အတည်ပြုပေးပါသည်။ garak သည်
probe များကို လုပ်ဆောင်ပါသည် (secret မပါပါက ကျော်သွားပါသည်)။ `moderations` ကို
တသမတ်တည်းဖြစ်စေရန် ထည့်သွင်းထားပါသည်။ Block mode သည် မဖြစ်မနေလိုက်နာရမည့် နယ်စပ်မျဉ်းဖြစ်ပါသည်-
`evaluatePromptInjection()` သည် middleware က ပေးပို့သော request-တစ်ခုချင်းစီ၏ disable
list ကို လျစ်လျူရှုပါသည်၊ ထို့ကြောင့် `disabledGuardrails` သည် route ကို ၎င်းမှ လွတ်ကင်းခွင့်
**မပေးနိုင်ပါ** ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413))။

Nightly workflow (`.github/workflows/nightly-llm-security.yml`၊ cron + manual
dispatch) တွင် job နှစ်ခု ရှိပါသည်-

- **`promptfoo-guard` (ပိတ်ဆို့သည့်)** — `INJECTION_GUARD_MODE=block` ဖြင့်
  `promptfoo eval -c promptfooconfig.yaml` ကို လုပ်ဆောင်ပါသည်။ တိုက်ခိုက်မှုဆိုင်ရာ case
  တစ်ခုချင်းစီ (ဥပမာ "ignore all previous instructions…"၊ DAN-ပုံစံ jailbreak များ) သည်
  response တွင် `error.code === "SECURITY_001"` ပါဝင်ကြောင်း စစ်ဆေးအတည်ပြုပါသည်၊
  ဆိုလိုသည်မှာ guard က request ကို အမှန်တကယ် ငြင်းပယ်ခဲ့သည်ဟူခြင်းဖြစ်ပါသည်။
- **`garak` (အကြံပြု)** — local OmniRoute instance (`http://localhost:20128/v1`) အပေါ်တွင်
  garak `--probes promptinject,dan,leakreplay` ကို လုပ်ဆောင်ပါသည်။ provider secret
  (`PROMPTFOO_PROVIDER_KEY`) ပေါ်တွင် gate လုပ်ထားပါသည်။ ချောမွေ့စွာ ကျော်သွားပြီး
  `|| true` ဖြင့် နောက်ဆက်တွဲထားသောကြောင့် CI ကို မအောင်မြင်စေဘဲ report သာ ပေးပါသည်။

Guard helper (`createInjectionGuard` / `withInjectionGuard`) ၏ လွှမ်းခြုံမှုသည်
prompt ပါဝင်သည့် `/v1` route အားလုံးကို ကျယ်ပြန့်ပါသည်။ prompt စာသားကို
`src/shared/utils/inputSanitizer.ts` ရှိ `extractMessageContents()` မှ
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` ထဲမှ ဆွဲထုတ်ပါသည်။
