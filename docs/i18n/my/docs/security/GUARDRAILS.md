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

## အသင့်ပါ Guardrails များ

import ပြုလုပ်ချိန်တွင် registry သည် priority အစဉ်လိုက် guardrails ခြောက်ခုကို အလိုအလျောက် load လုပ်သည်
(`registry.ts` → `registerDefaultGuardrails()` ကို ကြည့်ပါ)-

| Priority | အမည်                | အဆင့်(များ)    | ဖိုင်                 |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Priority နံပါတ် ပိုနိမ့်သည့်အရာများကို **ဦးစွာ** လုပ်ဆောင်သည်။

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

GLM 5.3 base model နှင့် `glm-5.3-{low,high,max}` တွင် တိကျရှင်းလင်းသော
`supportsVision:false` registry/spec metadata ရှိသည်။ GLM 5.3 Flash variants များသည်
native-vision models များအဖြစ် ဆက်ရှိနေသည်။ Claude Code ၏ `/v1/messages` route သည်
Claude-to-OpenAI translation **မတိုင်မီ** မျှဝေထားသော `handleChat` pre-call guardrail chain ထဲသို့
ဝင်ရောက်သည်။ အတွင်းအဆင့်ဆင့်ရှိ `Read` tool-result images များကို ထို translation က
OpenAI `image_url` content အဖြစ် မြှင့်တင်မပေးမီ ဖော်ပြခြင်း သို့မဟုတ် ကိုင်တွယ်ခြင်း
ပြုလုပ်ရမည် (#17069)။

**non-vision models** များသို့ ရည်ရွယ်ထားသော ပုံပါဝင်သည့် requests များကို ကြားဖြတ်ပြီး
request တစ်ခုလုံးကို vision-capable model တစ်ခုဆီ ပြန်လည်လမ်းကြောင်းသတ်မှတ်ပေးသည် သို့မဟုတ်
upstream call မတိုင်မီ ပုံအစိတ်အပိုင်းများကို စိတ်ကြိုက်ပြင်ဆင်နိုင်သော vision model ဖြင့်
ထုတ်လုပ်ထားသည့် စာသားဖော်ပြချက်များဖြင့် အစားထိုးသည်။ ထို့ကြောင့် text-only providers များသည်
multimodal payloads များကို သိသာထင်ရှားသည့် အပြောင်းအလဲမရှိဘဲ ကိုင်တွယ်နိုင်သည်။

လုပ်ဆောင်မှုအစဉ်-

1. Target model သည် vision ကို support လုပ်ပြီးသားဖြစ်ပါက ကျော်သွားသည်
   (ထို model သည် forced-bridge list `isVisionBridgeForcedModel` တွင် ပါဝင်နေလျှင် မကျော်ပါ)။
2. `extractImageParts(messages)` မှတစ်ဆင့် ပုံအစိတ်အပိုင်းများကို ထုတ်ယူသည်
   (`visionBridgeHelpers.ts`)။ ၎င်းသည် `open-sse/utils/mediaParts.ts` အတွင်းရှိ
   **တစ်စုတစ်စည်းတည်းဖြစ်သော media detector** `detectMediaParts()` သို့ လွှဲပေးသည်။ ၎င်းသည်
   combo compatibility filter နှင့် မျှဝေအသုံးပြုသော တစ်ခုတည်းသော မူရင်းအမှန်တရား၏ ရင်းမြစ်ဖြစ်သည်။
   Extraction ကို `replaceImageParts` က ပြန်လည်ထည့်သွင်းနိုင်သည့် shapes များသာ ပါဝင်စေရန် allowlist လုပ်ထားသည်
   (extract↔replace contract)- OpenAI `image_url`၊ Anthropic base64
   `source.type:"base64"`၊ Anthropic URL `source.type:"url"` နှင့် Responses
   API `input_image` တို့ဖြစ်သည်။ Claude Code
   `tool_result.content` နှင့် Responses tool outputs အတွင်း အဆင့်ဆင့်ထည့်သွင်းထားသော ကိုက်ညီသည့် ပုံများကိုလည်း
   ထုတ်ယူပြီး ၎င်းတို့၏ မူလ paths များ၌ ပြန်လည်အစားထိုးသည်။ indicator-only shapes များသည် combo-filter
   material ဖြစ်သောကြောင့် မထုတ်ယူပါ။
   တစ်ခုမျှ မတွေ့ပါက ကျော်သွားသည်။
3. `resolveVisionBridgeRuntimeSettings()` မှတစ်ဆင့် runtime config ကို ဖြေရှင်းသည်
   (`src/shared/constants/modalityBridgeDefaults.ts`)- `modalityBridge*`
   settings keys အသစ်များကို ဦးစားပေးသည်။ အဟောင်း `visionBridge*` keys များသည် **တစ်စက်ဝန်းစာ
   fallback** (rollback window) အဖြစ် ဆက်ရှိနေသည်။ Bridge ကို ပိတ်ထားပါက
   မည်သည့် media traversal မဆို မလုပ်ဆောင်မီ ကျော်သွားသည်။
4. Mode selector (`modalityBridgeVisionMode`၊ အောက်ပါဇယားကို ကြည့်ပါ) က
   reroute သို့မဟုတ် describe ကို ဆုံးဖြတ်သည်။ Reroute သည် `model` ကိုသာ
   လဲထားသည့် `modifiedPayload` နှင့် meta `{ rerouted, fromModel, toModel, imagesKept }` ကို ပြန်ပေးသည်။
5. Describe path- ပုံအရေအတွက်ကို `maxImages` ဖြင့် ကန့်သတ်သည်၊ task-aware prompt ကို ပေါင်းစပ်ဖန်တီးသည်၊
   describe cache ကို စစ်ဆေးသည်၊ vision model ကို **တစ်ပြိုင်နက်တည်း**
   (`Promise.allSettled`) ခေါ်ဆိုပြီး ၎င်းတို့၏နေရာတွင် `[Image N]: <description>` စာသားအစိတ်အပိုင်းများကို
   ထည့်သွင်းသည်။ Describe မအောင်မြင်ပါက `null` ကို ရရှိသည်- unknown/vision-capable targets များအတွက်
   မူရင်းပုံကို ဆက်လက်ထိန်းသိမ်းထားသော်လည်း (#4012) **text-only ဖြစ်ကြောင်း အတည်ပြုထားသော direct
   target** သို့မဟုတ် zero-vision combo အတွက် ဖော်ပြချက်မရရှိသည့် ပုံတိုင်းကို
   `(unavailable — no vision-capable provider connected)` စာသား stub ဖြင့် တိတိကျကျ အစားထိုးသည်။
   ၎င်းတွင် တစ်စိတ်တစ်ပိုင်း မအောင်မြင်မှုများနှင့် describe-call cap ကို ကျော်လွန်သော ပုံများလည်း
   ပါဝင်သည် (#17069)။ ရှိပြီးသား all-failed combo describe fallback ကို
   ဆက်လက်ထားရှိသည် (#8430)။
6. `modifiedPayload` နှင့် meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`) ကို ပြန်ပေးသည်။

#### Mode selector (`modalityBridgeVisionMode`)

| မုဒ်       | မူရင်းတန်ဖိုး | အပြုအမူ                                                                                                                                                                                                                                                                                                                                          |
| ---------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔             | မပြောင်းလဲထားသော အစဉ်အလာ heuristic (#6640/#7204) — combo မဟုတ်သော/`auto/` မော်ဒယ်များသည် မူရင်းမော်ဒယ်တွင် အသုံးပြုနိုင်သော credentials ရှိပြီးသား မဟုတ်ပါက အကောင်းဆုံး vision မော်ဒယ်သို့ reroute လုပ်သည် (ရှိပြီးသားဖြစ်ပါက describe)။ combo target များကမူ အမြဲတမ်း describe လုပ်သည်။                                                         |
| `describe` |               | အမြဲတမ်း describe လုပ်သည် — reroute block ကို လုံးဝ ကျော်လွှားသွားသည်။ အသုံးပြုသူ ရွေးချယ်ထားသော မော်ဒယ်က အမြဲတမ်း ဖြေကြားသည်။                                                                                                                                                                                                                   |
| `reroute`  |               | reroute ကို အတင်းအကျပ် လုပ်ဆောင်သည် — keep-credentialed-model guard ကို ကျော်လွှားသွားသည်။ reroute-**target** credential guard ကမူ ဆက်လက် အကျုံးဝင်ဆဲဖြစ်သည် — အသုံးပြုနိုင်သော vision target မရှိသောအခါ၊ bridge သည် describe လုပ်ခြင်း သို့မဟုတ် raw image များကို text-only target သို့ ပေးပို့ခြင်းအစား ရှင်းလင်းသော error ဖြင့် ပိတ်ဆို့သည်။ |

Forced mode များသည် auto heuristic မအလည်မီ **အရင်တွင်** short-circuit ဖြစ်သွားပြီး၊ `auto`
အပြုအမူသည် PR-1 မတိုင်မီ guardrail နှင့် byte-identical ဖြစ်သည်။

#### API-key အကျုံးဝင်ပတ် (`visionBridgeKeyScope.ts`)

ခေါ်ဆိုသူ၏ API key က `allowedConnections`၊ quota pool များ (`allowedQuotas`)
သို့မဟုတ် မော်ဒယ်များ (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`) ကို ကန့်သတ်ထားသောအခါ၊
bridge သည် key အသုံးပြုခွင့်ရသော connection များပေါ်တွင် key
အသုံးပြုနိုင်သော reroute နှင့် describe မော်ဒယ်များကိုသာ ရွေးချယ်သည်။
ပြီးနောက် describe call သည် `x-omniroute-self-loop-key-id` header ဖြင့်
OmniRoute self-loop မှတဆင့် အမြဲတမ်း ဖြတ်သန်းသွားသောကြောင့်၊ လက်ခံရသော
chat request က ထို key ၏ connection နှင့် model policy ကို နောက်တစ်ဖန်
enforce လုပ်သည်။ `enforceApiKeyPolicy()` သည် ထို header ကို self-loop
bearer နှင့် အတူတကွရှိမှသာ လေးစားလိုက်နာသောကြောင့်၊ ၎င်းက ဝင်ရောက်ခွင့်ကို
ကျဉ်းစေနိုင်ရုံသာဖြစ်ပြီး၊ resolve မလုပ်နိုင်သော id ကို ပယ်ချသည်။

key အတွက် ခွင့်ပြုထားသော vision model မရှိပါက၊ **အတည်ပြုပြီး text-only
target** သည် image byte များကို စွမ်းဆောင်နိုင်စွမ်းမရှိသော upstream သို့
ပေးပို့ခြင်းအစား ရှင်းလင်းသော HTTP 400 ဖြင့် image request ကို local
တွင်ပင် ပယ်ချသည် (#17069)။ မသိရသ သို့မဟုတ် native vision capability ရှိသော
target များအတွက်ကမူ၊ describe path သည် ယခင်က fail-open အပြုအမူကို
ထိန်းထားဆဲဖြစ်သည် (meta `{ skipped: true, reason: "no_permitted_vision_model" }`)။
key မပါသော request များနှင့် ဤကန့်သတ်ချက်များ မရှိသော key များသည်
ယခင်ကအတိုင်း တိတိကျကျ အပြုအမူဆက်သည်။

#### task ကို ထည့်စဉ်းစားသော describe prompt (`modalityBridgeVisionTaskAware`)

မူရင်းတန်ဖိုး **true**။ `composeVisionPrompt()` (`visionBridgeHelpers.ts`) သည်
base describe prompt သို့ **နောက်ဆုံး user message** ၏ စာသားကို
(500 လုံးသို့ ဖြတ်တောက်၍) ပူးတွဲထည့်ကာ၊ ဖော်ပြချက်ကို အသုံးပြုသူ
အမှန်တကယ် မေးမြန်းခဲ့သည့်အရာဆီသို့ ဦးတည်စေပြီး (codex-vision-proxy ပုံစံ)
vision model အား မြင်နိုင်သော စာသားကို စာဖြင့်ကူးယူရန် (transcribe)
တောင်းဆိုသည်။ flag ပိတ်ထားသောအခါ — သို့မဟုတ် user စာသား မရှိသောအခါ —
base prompt ကို မပြောင်းလဲဘဲ အသုံးပြုသည်။

describe self-loop ၏ ကိုယ်ပိုင် OpenAI-compatible request
(`visionBridgeHelpers.ts` ရှိ `callVisionModelSingle()`) သည်
`image_url.detail: "high"` ကို အမြဲတမ်း တောင်းဆိုသည် — အခြေအနေမရွေး၊
caller/provider တိုင်းအတွက်၊ မည်သည့် client signal ပေါ်တွင်မျှ
မှီတင်းထားခြင်းမရှိပါ။ Low-detail sampling သည် ဤ prompt တောင်းဆိုသော
စာသား ကူးယူဖတ်ခြင်း (text-transcription) task အတွက်ပင် OCR တိကျမှုကို
လျှော့ချစေသောကြောင့်၊ မူရင်း inbound request က မည်သည့် detail level ကို
အသုံးပြုခဲ့ပါစေ describe call ကိုယ်တိုင်က အမြဲတမ်း high detail ကို
တောင်းဆိုသည်။ ဤအရာသည် internal describe request body ကိုသာ
သက်ရောက်စေသည်။ primary request ပေါ်တွင် OmniRoute က caller ၏ ကိုယ်ပိုင်
`image_url.detail` ကို forward လုပ်ပုံကို မပြောင်းလဲပါ — ထို default ကို
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`) တွင်
သီးခြားစီ၊ တွေ့ရှိထားသော OpenCode client များအတွက်သာ အသုံးချသည်။
describe self-loop ၏ Anthropic wire-format branch တွင် `detail` field
မရှိသောကြောင့် default နှစ်ခုစလုံးမှ သက်ရောက်မှုမခံရပါ။

#### Describe output ကန့်သတ်ချက် (`modalityBridgeVisionMaxChars`)

| Key                            | မူရင်းတန်ဖိုး | အပိုင်းအခြား            |
| ------------------------------ | ------------- | ----------------------- |
| `modalityBridgeVisionMaxChars` | `0`           | `0` သို့မဟုတ် 100–50000 |

`0` (မူရင်းတန်ဖိုး) ဆိုသည်မှာ **ကန့်သတ်ချက် မရှိ** ဟု ဆိုလိုသည် —
`callVisionModel()` မှ ပြန်ပေးသော ဖော်ပြချက်ကို မပြောင်းလဲဘဲ
ဖြတ်သန်းပေးပြီး၊ ရှိပြီးသား အပြုအမူကို ထိန်းသိမ်းထားသည်။ 100–50000
အပိုင်းအခြားရှိ မည်သည့်တန်ဖိုးမဆိုက `[Image N]: <description>` အဖြစ်
ပြန်လည် ချိတ်ဆက်ထည့်သွင်းမီ ဖော်ပြချက်ကို `…` နောက်ဆက်ဖြင့် ဖြတ်တောက်သည်
(`src/lib/guardrails/visionBridge.ts` ရှိ `VisionBridgeGuardrail.preCall()`)။
downstream model က transcription အပြည့်အစုံ လိုအပ်သော အသေးစိတ်များပြားသော
OCR task များအတွက် ဤတန်ဖိုးကို မြှင့်တင်ပါ။ စကားများပြားသော vision model
များတွင် token အသုံးပြုမှုကို ကန့်သတ်ရန် လျှော့ချပါ။ dashboard field သည်
Vision tab ၏ Advanced panel (`ModalityBridgeVisionTab.tsx` ရှိ
`modality-bridge-max-chars`) ပေါ်တွင် တည်ရှိပြီး၊ 1 နှင့် 99 ကြားရှိ
မည်သည့်တန်ဖိုးမဆိုကို 100 အနိမ့်ဆုံး (floor) အထိ clamp လုပ်ပေးသော်လည်း၊
အသိအမှတ်ပြု ဖော်ပြထားသော `0` ကိုမူ မထိခိုက်စေပါ — `0` သည် "unset" default
သာမကဘဲ ၎င်းကိုယ်တိုင် မှန်ကန်သော Zod တန်ဖိုး
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`) ဖြစ်သည်။

#### Describe cache (`modalityBridge/bridgeCache.ts`)

describe output များအတွက် in-memory LRU + TTL cache ဖြစ်ပြီး၊ process
တစ်ခုလုံး မျှဝေအသုံးပြုသည်။ Key = length-prefix framing ဖြင့်
`sha256(imageRef + composedPrompt + configuredBridgeModel)`
(field-နယ်စပ် collision များ မရှိ)။ model အစိတ်အပိုင်းသည် အမှန်တကယ်
ဖြေကြားခဲ့သော model မဟုတ်ဘဲ **configure လုပ်ထားသော** bridge model ဖြစ်သည်
— `callVisionModel` သည် internally fallback ဖြစ်နိုင်ပြီး၊ attempt
တစ်ခုချင်းစီအလိုက် key ဆင်းပါက cache ကို ပဲ့ကြဲစေလိမ့်မည်။ ပျက်ကွက်သော
describe များကို ဘယ်သောအခါမျှ cache မလုပ်ပါ။ ဆက်တင်များ —

| Key                             | မူရင်းတန်ဖိုး | အပိုင်းအခြား |
| ------------------------------- | ------------- | ------------ |
| `modalityBridgeCacheEnabled`    | `true`        | —            |
| `modalityBridgeCacheTtlMinutes` | `60`          | 1–1440       |
| `modalityBridgeCacheMaxEntries` | `200`         | 10–5000      |

#### Remote image ပုံမှန်ပြောင်းလဲခြင်း (self-loop describe/base64 fetch)

Bridge က **remote** image ကို ကိုယ်တိုင် fetch လုပ်သောအခါ — Anthropic describe
self-call နှင့် claude-wire-format base64 ပြောင်းလဲမှု
(`ensureBase64ImagesForClaudeWire`) နှစ်ခုလုံးက `visionBridgeHelpers.ts` ရှိ
`fetchRemoteImageAsDataUri()` မှတဆင့် — ရလာသော data
URI ကို vision-model တောင်းဆိုမှုထဲ မထည့်သွင်းမီ `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) မှတဆင့် ပုံမှန်ပြောင်းလဲခြင်း ခံရသည်။ အရွယ်အစားကျော်လွန်နေသော
image များကို **2048px အရှည်ဆုံးအစွန်း** သို့ downscale လုပ်သည် (OpenAI/Anthropic
က server-side တွင် အသုံးပြုပြီးသား resize cap နှင့် ကိုက်ညီသည်)။ ၎င်းက
upload bytes/latency ကို လျှော့ချပေးပြီး vision model မြင်ရသည်ကို မပြောင်းလဲစေပါ။ Resize
လုပ်ရန်အတွက် dynamic import ဖြင့် load လုပ်သော `sharp` ကို အသုံးပြုသည်။ ၎င်း၏ native
binary load မရနိုင်သော platform တစ်ခုတွင် `normalizeDataUri()` က **ဘယ်တော့မျှ throw မလုပ်ပါ** —
မူရင်း bytes များ၏ passthrough သို့ fallback လုပ်သွားသောကြောင့် describe/base64 ပြောင်းလဲမှု
လမ်းကြောင်းက အမြဲတမ်း ဆက်လက်အလုပ်လုပ်နိုင်သည်။ Image မဟုတ်သော bytes များ (decode လုပ်နိုင်သော
image ကို return မပေးသော fetch တစ်ခု) ကိုလည်း မထိခိုက်ဘဲ passthrough လုပ်သည်။ ဤပုံမှန်ပြောင်းလဲမှုသည်
bridge က ကိုယ်ပိုင် self-call အတွက် fetch လုပ်သော image များသို့သာ ကန့်သတ်ထားသည် —
caller ၏ raw passthrough payload သို့ ဘယ်တော့မျှ အသုံးမပြုပါ၊
opt-in-only mutation မူဝါဒ (Hard Rule #20) နှင့် ကိုက်ညီသည်။

#### Settings schema + migration

`modalityBridge*` key အသစ်များကို `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`) တွင် Zod ဖြင့် စစ်ဆေးအတည်ပြုသည်။ `modalityBridgeVisionEnabled`၊
`modalityBridgeVisionMode`၊ `modalityBridgeVisionModel`၊
`modalityBridgeVisionTaskAware`၊ `modalityBridgeVisionPrompt`၊
`modalityBridgeVisionTimeout`၊ `modalityBridgeVisionMaxImages`၊
`modalityBridgeVisionMaxChars`၊ `modalityBridgeCache*` သုံးခုစုံ၊ နှင့် Audio Bridge
အသုံးပြုသော `modalityBridgeAudio*` အဖွဲ့ တို့ ဖြစ်ကြသည်။ Migration
`141_modality_bridge_settings.sql` က ရှိပြီးသား legacy
`visionBridge*` တန်ဖိုးများကို ကိုက်ညီသော key အသစ်များသို့ ကူးယူသည် (idempotent ဖြစ်ပြီး
operator သတ်မှတ်ထားသော `modalityBridge*` တန်ဖိုးကို ဘယ်တော့မျှ ပြင်မရေးပါ)။ legacy key
များကို release cycle တစ်ခုအတွက် read fallback အဖြစ် ဆက်လက်လက်ခံပေးထားသည်။

#### Transparency header + stats

Describe ပြောင်းလဲပြီးသော response များတွင်
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
ပါဝင်သည် (`modalityBridge/bridgeStats.ts` ရှိ `buildModalityBridgeHeader()` က တည်ဆောက်ပြီး
`src/sse/handlers/chatHelpers.ts` ရှိ `withModalityBridgeHeader()` က ချိတ်ဆက်သည်)။
Reroute လုပ်ခံထားရသော request များတွင် header **လုံးဝမပါပါ** — payload ကို မထိခိုက်ဘဲရှိပြီး
model ပြောင်းလဲမှုကို response body ၏ `model` field တွင်လည်း တွေ့မြင်နိုင်ပါပြီ။

`GET /api/modality-bridge/stats` (management auth၊
`GET /api/settings` နှင့် တူညီသော tier) က modality အလိုက် in-memory counter
များ `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` ကို `vision`၊ `audio`၊ နှင့်
`video` အတွက် ပြန်ပေးသည်။ `averageLatencyMs` က denominator အဖြစ် attempt အားလုံးကို မဟုတ်ဘဲ
`latencySamples` ကို အသုံးပြုသည်။ timing မပါဝင်သော operation တစ်ခုက zero-millisecond
sample ကို စိတ်ကူးတည်ဆောက်ခြင်း မပြုပါ။ `bridged` သည် အောင်မြင်သော
ပြောင်းလဲမှုများအတွက် backward-compatible alias အဖြစ် ဆက်လက်တည်ရှိသည်။ ပျက်ကွက်သော attempt
များက ၎င်းကို မတိုးစေပါ။ Counter များကို process ပြန်စတင်ခြင်းဖြင့် reset
လုပ်ရန် ဒီဇိုင်းထားထားသည် (accounting မဟုတ်ဘဲ telemetry ဖြစ်သည်)။

#### Dashboard configuration

အထူးသီးသန့် dashboard စာမျက်နှာမှာ
`/dashboard/settings/modality-bridge` ဖြစ်သည်။ ၎င်း၏ URL ဖြင့် ရရှိနိုင်သော `Vision`၊ `Audio`
နှင့် `Video` tab များက `tab` တန်ဖိုး ပြောင်းလဲစဉ် query parameter များကို ထိန်းသိမ်းထားသည်။
Vision tab က enablement၊ mode၊ model ရွေးချယ်မှု (automatic
default အပါအဝင်)၊ task-aware prompting၊ အဆင့်မြင့် timeout/image/description-length/cache
limit များ၊ runtime
counter များ၊ နှင့် ကာကွယ်ထားသော sample request ကို ပြသသည်။ Audio tab လည်း လက်တွေ့အသုံးချပြီးဖြစ်သည်။ ၎င်းက
enablement၊ Auto ပါဝင်သော STT-only model picker၊ timeout/max-clip limit များ၊ audio
counter များ၊ နှင့် `input_audio` sample စမ်းသပ်မှုကို ပြသသည်။ Video tab သည်လည်း အလုပ်လုပ်သည်။ ၎င်းက
FFmpeg/ffprobe runtime အခြေအနေ — UI state လေးခုထဲက တစ်ခု (probe လုပ်ဆောင်နေစဉ် သို့မဟုတ်
ပြီးမြောက်နိုင်ခြင်းမရှိစဉ် `unknown`၊ probe ကို client-side မှ ကျော်လွန်ထားသော non-loopback
dashboard host တွင် `restricted`၊ probe လုပ်ပြီးနောက် ပျက်ကွက်ကြောင်း အတည်ပြုပြီးနောက်
`unavailable`၊ သို့မဟုတ် FFmpeg/ffprobe version များဖြင့် `available`) — ကို အစီရင်ခံပြီး
enable/model/frame/video/timeout limit များကို ထိန်းသိမ်းပေးပြီး model picker ကို vision-capable
model များသို့ စစ်ထုတ်ပေးကာ video counter များကို ပြသသည်။

AI settings အောက်ရှိ ယခင် Vision Bridge card သည် စာမျက်နှာအသစ်သို့ compatibility
link သာ ဖြစ်သည်။ ၎င်းက form ၏ ဒုတိယပုံစာကို ပိုင်ဆိုင်ခြင်း မရှိတော့ပါ။ Media Providers က
Image-to-Text နှင့် Speech-to-Text workflow များကို သက်ဆိုင်ရာ Modality
Bridge tab များနှင့် ချိတ်ဆက်ပေးပြီး ရှိပြီးသား Speech-to-Text playground ကို မဖယ်ရှားပါ။

**Self-loop admission bypass:** describe call က OmniRoute ၏
ကိုယ်ပိုင် `/v1` self-loop (non-standard provider model) မှတဆင့် route လုပ်သောအခါ sub-request က
`x-omniroute-admission-bypass: internal` ကို ပေးပို့ပြီး ဖြေရှင်းထားသော
self-loop credential ဖြင့် authentication လုပ်ခံရသည် — local mode တွင် local `sk_omniroute`
sentinel ဖြစ်ပြီး၊ သို့မဟုတ် operator သတ်မှတ်ထားသော `OMNIROUTE_API_KEY` / `ROUTER_API_KEY`
env key (#1350) ဖြစ်ပြီး `REQUIRE_API_KEY=true` deployment များကလည်း describe call ကို
ဆက်လက်လုပ်ဆောင်နိုင်စေသည်။ Bypass ကို ထို credential အတိအကျများအတွက်သာ လက်ခံသောကြောင့်
ပြင်ပ client များက admission ကို ကျော်လွန်ရန် header ကို အသုံးမပြုနိုင်ပါ။

Legacy default များကို `src/shared/constants/visionBridgeDefaults.ts` တွင် ရှိသည်။
mode/task-aware/cache default အသစ်များနှင့် settings resolver ကို
`src/shared/constants/modalityBridgeDefaults.ts` တွင် ရှိသည်။ Guardrail က
`deps` constructor option ကို ပြသထားပြီး test များက fake `getSettings` နှင့်
`callVisionModel` implementation များကို ထည့်သွင်းနိုင်စေသည်။

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Audio ပါဝင်သော chat request များကို audio input လက်ခံသည်ဟု သိရှိထားခြင်း မရှိသော
target သို့ မရောက်မီ ကာကွယ်ဆု့က်ဖြတ်သည်။ ၎င်းက chat request ကို ဘယ်တော့မျှ reroute
မလုပ်ပါ။ audio part များကို ရှိပြီးသား OpenAI-compatible multipart endpoint မှတဆင့်
transcribe လုပ်ပြီး ရွေးချယ်ထားသော chat model က text transcript များဖြင့် ဆက်လက်လုပ်ဆောင်သည်။

အဆင့်များ:

1. `supportsAudio` ကို `getResolvedModelCapabilities()` မှတစ်ဆင့် ဆုံးဖြတ်သည်။ Explicit provider-registry metadata က ဦးစားပေးခံရပြီး၊ ထို့နောက် static model metadata၊ ထို့နောက် sync လုပ်ထားသော `modalities_input` အစဉ်လိုက် ဖြစ်သည်။ `audio` မပါဝင်သော ကြေညာထားသော input စာရင်းတစ်ခုမှာ `false` ဖြစ်ပြီး; capability အထောက်အထား လုံးဝမရှိလျှင် `null` အဖြစ်ကျန်ရှိသည်။ `false` နှင့် `null` နှစ်မျိုးလုံးက conservative bridge ကို ဖွင့်ပေးပြီး၊ `true` က ၎င်းကို ကျော်ဖြတ်သွားသည်။
2. `modalityBridgeAudio*` settings များကို ဆုံးဖြတ်ပြီး၊ shared `detectMediaParts()` detector မှတစ်ဆင့် message တိုင်းထဲမှ splice လုပ်နိုင်သော top-level audio part များကို ထုတ်ယူသည်။ Support လုပ်ထားသော wire shape များမှာ OpenAI `input_audio`၊ `audio_url` နှင့် `source.media_type: "audio/*"` ဖြစ်သည်။ Nested audio ကို routing အတွက် detect လုပ်သော်လည်း splice path ဖြင့် ဖယ်ရှားခြင်းမပြုပါ။ အလုပ်ကို `modalityBridgeAudioMaxClips` ဖြင့် ကန့်သတ်ထားပြီး; နောက်ပိုင်း part များမှာ မထိခိုက်ဘဲ ကျန်ရှိသည်။
3. Configure လုပ်ထားသော `provider/model` ကို လေးစားလိုက်နာသည်၊ သို့မဟုတ် `selectAudioBridgeModel()` က stable catalog အစဉ်လိုက်ဖြင့် `AUDIO_TRANSCRIPTION_PROVIDERS` ကို လှည့်လည်ရှာဖွေပြီး အသုံးပြုနိုင်သော active provider credential ရှိသော ပထမဆုံး model ကို ရွေးချယ်စေသည်။
4. `callAudioTranscription()` က base64/data-URI audio ကို multipart `file` အဖြစ်သို့ ပြောင်းလဲပေးသည်၊ သို့မဟုတ် DNS pinning နှင့် 25 MB ကန့်သတ်ချက်ပါဝင်သော public-only outbound guard မှတစ်ဆင့် remote `audio_url` ကို download လုပ်သည်။ ထို့နောက် file နှင့် ရွေးချယ်ထားသော model ကို `resolveSelfLoopBearer()` ဖြင့် authenticate လုပ်ထားသော local `/v1/audio/transcriptions` self-loop သို့ POST လုပ်သည်။ ရှိပြီးသား transcription route က ပုံမှန် credential ရှာဖွေမှု၊ cooldown/rate-limit ကိုင်တွယ်မှုနှင့် provider dispatch ကို ဆောင်ရွက်သည်။
5. အောင်မြင်သော call များက ၎င်းတို့၏ part များကို `[Audio N]: <transcript>` ဖြင့် အစားထိုးသည်။ Call များကို `Promise.allSettled` ဖြင့် run လုပ်သည်- တစ်ခုချင်းစီ၏ ပျက်ကွက်မှုက မူရင်း audio part ကို ထိန်းသိမ်းထားသည် (#4012 contract)။ Call အားလုံး ပျက်ကွက်ပြီး target သည် `supportsAudio === false` ဖြစ်ကြောင်း သက်သေပြနိုင်ပါက၊ part များသည် `[Audio N]: (unavailable — no STT provider connected)` ဖြစ်သွားသည် (#8430 contract)။ မသိရှိရသော target (`null`) အတွက်ဆိုလျှင် အားလုံးပျက်ကွက်သော ရလဒ်မှာ မထိခိုက်ဘဲ ကျန်ရှိသည်။ အသုံးပြုနိုင်သော STT credential မရှိသော သက်သေပြထားပြီးသား text-only target တစ်ခုအတွက်ဆိုလျှင် network call မပြုလုပ်ဘဲ အလားတူ explicit stub ကို ရရှိသည်။

အောင်မြင်သော transcript များသည် process-wide Modality Bridge LRU/TTL cache ကို အသုံးပြုသည်။ Key က audio reference၊ stable `audio-transcription` operation label နှင့် ရွေးချယ်ထားသော STT model တို့ကို ပေါင်းစပ်ထားသည်; ပျက်ကွက်မှုများကို ဘယ်တော့မှ cache လုပ်ခြင်းမပြုပါ။ Audio ကြိုးပမ်းမှုများက shared `bridged`၊ `cacheHits`၊ `failures` နှင့် `lastUsedAt` counter များကို update လုပ်သည်။ ပြောင်းလဲထားသော response များတွင် `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` ပါဝင်သည်; မထိခိုက်သော request များတွင် Audio Bridge segment မရရှိပါ။

Runtime settings များသည် DB-backed ဖြစ်ပြီး Zod ဖြင့် validate လုပ်ထားသည်-

| ကီး                           | မူရင်းတန်ဖိုး | ကန့်သတ်အကွာအဝေး              |
| ----------------------------- | ------------- | ---------------------------- |
| `modalityBridgeAudioEnabled`  | `true`        | —                            |
| `modalityBridgeAudioModel`    | `""`          | အလိုအလျောက် သို့မဟုတ် STT ID |
| `modalityBridgeAudioTimeout`  | `60000`       | 1000–300000                  |
| `modalityBridgeAudioMaxClips` | `3`           | 1–10                         |

Shared cache ကို `modalityBridgeCacheEnabled`၊ `modalityBridgeCacheTtlMinutes` နှင့် `modalityBridgeCacheMaxEntries` တို့ဖြင့် ဆက်လက်ထိန်းချုပ်သည်။

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Native video support ရှိကြောင်း အသိမရှိသော target ကို ခေါ်ဆိုခြင်းမပြုမီ၊ Chat Completions `messages` နှင့် Responses API `input` များအတွင်းရှိ top-level video part များကို ဆillegal်ဖြတ်သည်။ Support လုပ်ထားသော shape များမှာ `input_video`၊ `video_url`၊ `video_source`၊ HTTPS URL များနှင့် `data:video/*;base64,...` data URI များ ဖြစ်သည်။ Text ထဲရှိ ရိုးရိုး filename များကို video အဖြစ် မသတ်မှတ်ပါ။

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) သည် request traversal၊ capability/policy စစ်ဆေးမှု၊ per-request aggregation နှင့် response payload ကို ပိုင်ဆိုင်သည်။ Per-video အလုပ် — acquisition၊ whole-result cache၊ frame sequence ဖော်ပြခြင်း (caller ကြေညာထားသော audio transcript ကိုပါ ပေါင်းစည်းပေးသည်)၊ နှင့် per-attempt metrics/abort/cleanup — ကို `preCall` ၏ loop အတွင်းတွင် video part တစ်ခုချင်းစီအတွက် တစ်ကြိမ်စီ ခေါ်ဆိုသော `videoBridgePipeline.ts` ထဲရှိ `processVideoPart` နောက်ကွယ်တွင် ဖျောက်ထားသည်။ ထို module သည် explicit port boundary များဖြစ်သော `VideoMediaBrokerPort` (bytes များ ရယူခြင်းနှင့် sample လုပ်ထားသော frame များ ထုတ်ယူခြင်း)၊ `VideoAudioTranscriptionPort` (caller ကြေညာထားသော audio transcript ကို sample လုပ်ထားသော caption များနှင့် ပေါင်းစည်းခြင်း) နှင့် `VideoDrilldownPort` (frame drill-down persistence boundary; `processVideoPart` ထဲသို့ မချိတ်ဆက်ရသေးပါ — ယနေ့တွင် ခွဲထုတ်ထားသော `/api/modality-bridge/video/drilldown` route သာ drill-down entry များကို ရေးသားသည်) ကိုလည်း သတ်မှတ်ပေးသည်။

Public `/v1` request path သည် subprocess ကို import လုပ်ခြင်း သို့မဟုတ် invoke လုပ်ခြင်း လုံးဝမပြုပါ။ Remote video များကို 50 MiB ကန့်သတ်ချက်အောက်တွင် download လုပ်သည်; inline base64 video များအတွက်မူ model/messages/framing envelope သည် 50 MiB ဖြစ်သော public JSON request admission limit အတွင်းတွင် ဆက်လက်ရှိနေနိုင်စေရန် conservative decoded per-video cap 36 MiB ကို သတ်မှတ်ထားသည်။ Inline length နှင့် decoded-size ခန့်မှန်းချက်များကို allocation မပြုလုပ်မီ စစ်ဆေးသည်။ ကနဦး remote URL နှင့် redirect တိုင်းတွင် HTTPS ကို လိုအပ်ပြီး၊ DNS pinning ပါဝင်သော ရှိပြီးသား public-only outbound guard ကို အသုံးပြုသည်။ ထို့နောက် bytes များသည် မှန်ကန်သော internal `POST /api/modality-bridge/video/extract` broker boundary ကို ဖြတ်သန်းသွားသည်။ ထို route သည် `LOCAL_ONLY` နှင့် `SPAWN_CAPABLE` နှစ်မျိုးလုံးဖြစ်ပြီး၊ per-process authenticated, trusted-loopback request သာ လက်ခံပြီး၊ URL၊ filesystem path၊ executable သို့မဟုတ် argument list ကို လုံးဝလက်ခံခြင်းမပြုပါ။ API body-size pipeline နှင့် handler ၏ incremental body reader တို့က 50 MiB broker input cap ကို သီးခြားစီ အတင်းအကျပ် enforce လုပ်သည်။ ၎င်း၏ bounded queue သည် တစ်ကြိမ်လျှင် extraction တစ်ခုသာ run ပြီး၊ pending job လေးခုအထိ ခွင့်ပြုထားကာ၊ pending input ကို 100 MiB တွင် ကန့်သတ်ထားသည်။

broker အတွင်းတွင် `ffprobe` က private local file ကို ဖတ်သည်။ fixed format allowlist က playlist နှင့် manifest format များကို ချန်လှပ်ထားသည်။ ခွင့်ပြုထားသော MOV-family container များအတွက် external MOV data reference များကို default အလျောက် ပိတ်ထားဆဲဖြစ်ပြီး fixed command က ၎င်းတို့ကို enable လုပ်ခြင်း မပြုပါ။ `ffprobe` နှင့် `ffmpeg` နှစ်ခုလုံးသည် `file`-only protocol whitelist၊ thread တစ်ခု၊ fixed argument array များ၊ shell မရှိခြင်း၊ `PATH` မှ resolve လုပ်ထားသော executable များကို အသုံးပြုသည်။ Attached-picture cover stream များသည် playable candidate မဟုတ်ပါ။ Playable stream အားလုံးသည် limit များနှင့် ကိုက်ညီရပြီး၊ deterministic lowest-index fallback မတိုင်မီ explicit default stream ကို ဦးစားပေးသည်။ Video များကို စက္ကန့် ၆၀၀၊ တစ်ဖက်လျှင် pixel ၈,၁၉၂ နှင့် source pixel ၃၃,၅၅၄,၄၃၂ အထိ ကန့်သတ်ထားသည်။ FFmpeg သည် midpoint JPEG frame ၁–၁၆ ကို sample ယူပြီး၊ ပိုသေးငယ်သော input များကို upscale မလုပ်ဘဲ ရှည်သော edge ကို အများဆုံး pixel ၁,၀၂၄ အထိ ချုံ့သည်။ မည့်သည့် URL ကိုမှ လည်း လက်ခံမရပါ။ Sampling သည် default အလျောက် `uniform` ဖြစ်သည်။ Optional ဖြစ်သော `scene_aware` နှင့် experimental `segment_aware` policy များက validate ပြီးသား local stream ပေါ်တွင် fixed FFmpeg pass နောက်ထပ် တစ်ခေါက် လုပ်ဆောင်ပြီး၊ bound လုပ်ထားသော `showinfo` scene timestamp များကို ရွေးချယ်ကာ၊ detector ပျက်ကွက်ခြင်း၊ timeout၊ ပုံစံမှားယွင်းသော output၊ သို့မဟုတ် candidate set ဗလာဖြစ်ခြင်း တို့တွင် တူညီသော uniform midpoint များသို့ deterministic ဖြင့် fallback ပြန်သည်။ Segment-aware mode သည် validate ပြီးသော scene interval များအလိုက် midpoint sample များကို အချိုးကျ ခွဲဝေသည်။ segment-aware evidence နှင့် fallback အပြုအမူကို အောက်တွင် အသေးစိတ် ဖော်ပြထားသည်။ Hard 16-frame cap ကို policy တိုင်းတွင် selection ပြီးနောက် applied လုပ်သည်။ Scene-aware request တစ်ခုတွင် frame တစ်ခုသာသော budget ရှိသည့်အခါ၊ ၎င်းသည် active full-video သို့မဟုတ် focus window ၏ uniform midpoint ကို အသုံးပြုပြီး `policyEffective: uniform` ဟု report လုပ်သည်။ ရွေးချယ်ထားသော scene frame တစ်ခုတည်းက temporal အစွန်နှစ်ဖက်လုံးကို ထိန်းသိမ်း၍ မရပါ။ Caller တစ်ဦးက finite focus window (`start`/`end` စက္ကန့်) ကို optional အနေဖြင့် ပေးနိုင်သည်။ bound များကို media duration သို့ clamp လုပ်ပြီး၊ ပြောင်းပြန် သို့မဟုတ် non-finite window များကို ငြင်းပယ်ကာ၊ sampling policy အားလုံးကို normalize လုပ်ပြီးသော interval အတွင်းတွင်သာ လုပ်ဆောင်သည်။ ရလာသော window ကို sampling metadata ထဲတွင်လည်းကောင်း၊ downstream model များက focused excerpt ကို timeline အပြည့်အစုံနှင့် ခွဲခြားနိုင်စေရန် untrusted description prefix ထဲတွင်လည်းကောင်း ထည့်သွင်းထားသည်။

Semantic caption focus သည် ခွဲထွက်ထားသော explicit setting တစ်ခု ဖြစ်သည်။ Default `full` analysis mode သည် ရှိပြီးသား frame prompt ကို ထိန်းသိမ်းထားပြီး request text ကို caption model ဆီသို့ ဘယ်အခါမျှ မပေးပို့ပါ။ `focused` mode တွင် bridge က တူညီသော Chat သို့မဟုတ် Responses container ထဲမှ နောက်ဆုံး non-empty user-authored `text`/`input_text` ကိုသာ ဖတ်ပြီး၊ ၎င်းကို NFC သို့ normalize လုပ်ကာ၊ control character နှင့် whitespace များကို collapse လုပ်ပြီး Unicode code point ၅၀၀ အထိ ကန့်သတ်သည်။ ရလဒ် ဗလာဖြစ်နေပါက `full` prompt အတိုင်းအတာတူညီစွာသို့ fallback ပြန်သည်။ အသုံးဝင်သော hint ကို သီးသန့် untrusted-user-context block တွင် JSON အဖြစ် serialize လုပ်ပြီး လေ့လာတွေ့ရှိရသော အသေးစိတ်များကိုသာ ဦးစားပေး နိုင်သည်။ ၎င်းက media အတွင်း မြင်ရ သို့မဟုတ် ကြားရသော instruction များကို လိုက်နာရန် ဆန့်ကျင်သတိပေးထားသော သီးခြား warning ကို override လုပ်၍ မရပါ။ Textual focus က `start`/`end` ကို ဘယ်အခါမျှ ခန့်မှန်းခြင်း မပြုပါဘဲ temporal sampler ကိုလည်း မပြောင်းလဲပါ။

#### FU-07 structural segment evidence

`segment_aware` သည် validate ပြီးသား local video stream ပေါ်တွင် bounded pre-analysis pass တစ်ခေါက်ကို အသုံးပြုသည်။ Fixed filter chain က ပထမဆုံး အများဆုံး pixel ၃၂၀ အကျယ်သို့ scale လုပ်ပြီး၊ scene ပြောင်းလဲမှုများနှင့် frozen interval များကို detect လုပ်ကာ၊ ထို့နောက် blur၊ average luma နှင့် spatial/temporal information အတွက် စက္ကန့်လျှင် frame ၁ ခုနှုန်းဖြင့် sample ယူသည်။ ဤ pass ကို structural sample ၆၀၀၊ FFmpeg/filter thread တစ်ခု၊ အလားတူ `file`-only protocol နှင့် container allowlist များ၊ 1 MiB process-output bound နှင့် broker ၏ shared abort/deadline အတွင်း အများဆုံး စက္ကန့် ၃၀ အထိ ကန့်သတ်ထားသည်။ ၎င်းက request မှ command၊ filter၊ path သို့မဟုတ် URL ကို ဘယ်အခါမျှ လက်ခံမယူပါ။

Structural value များသည် semantic video နားလည်မှု မဟုတ်ဘဲ deterministic sampling evidence ဖြစ်သည်။ ၎င်းတို့က subject၊ action၊ caption၊ speech သို့မဟုတ် user ရည်ရွယ်ချက်ကို ခန့်မှန်းခြင်း မပြုပါ။ Scene နှင့် freeze boundary များက segment များကို ဖွဲ့စည်းသည်။ freeze coverage၊ blur၊ exposure၊ spatial detail နှင့် temporal change များက ရှိပြီးသား frame budget ၁–၁၆ ကို မည်သို့ခွဲဝေမည်ကိုသာ သက်ရောက်စေသည်။ အပြည့်အဝ frozen ဖြစ်နေသော segment ကို frame တစ်ခုအထိ ကန့်သတ်ထားပြီး၊ frozen မဟုတ်သော segment များက ကျန်သော budget အတွက် ပြိုင်ဆိုင်ကြသည်။ Boundary များက frame များထက် ပိုများနေသောအခါ၊ uniform timeline coverage ကို ဆက်လက် ထိန်းသိမ်းထားသဖြင့် အစောပိုင်း rapid cut များက ရှည်လျားသော နောက်ပိုင်း segment ကို ဖုံးကွယ်၍ မရပါ။ Freeze boundary ၏ ၁-စက္ကန့် analysis resolution အတွင်းရှိ scene boundary များကို coalesce လုပ်သည်။

Filter ပျောက်ဆုံးခြင်း၊ ပုံစံမှား/ဗလာဖြစ်သော evidence၊ detector error သို့မဟုတ် bounded pre-analysis timeout တို့သည် `uniform` midpoint policy အတိုင်းအတာတူညီစွာသို့ fail open ဖြစ်သည်။ Caller abort သို့မဟုတ် broker deadline ကမူ fail open မဖြစ်ပါ။ ၎င်းက လည်ပတ်နေသော subprocess ကို ရပ်တန့်စေပြီး၊ နောက်ပိုင်း frame extraction ကို တားဆီးကာ၊ private temporary tree ကို `finally` တွင် ဖျက်သိမ်းသည်။

`scripts/perf/video-bridge-fu07-eval.ts` သည် post-dedup caption-call savings၊ dense-motion budget allocation၊ blur/exposure/SI-TI evidence၊ ရှည်လျားသော tail ပါသော rapid cut များနှင့် gradual-fade false positive များအတွက် deterministic real FFmpeg fixture များကို ထုတ်လုပ်ပေးသည်။ ၎င်းက pre-analysis wall time ကို မှတ်တမ်းတင်ပြီး၊ `/usr/bin/time` ရရှိနိုင်သော နေရာများတွင် child CPU နှင့် peak RSS ကိုလည်း မှတ်တမ်းတင်သည်။ ၎င်း၏ quality check များသည် structural oracle များသာ ဖြစ်သည်။ ဤ harness တွင် authorized endpoint သို့မဟုတ် frozen judge မရှိသဖြင့် real caption-model quality သည် `HOLD` အဖြစ် ဆက်လက်တည်ရှိနေသည်။ `--caption-cost-per-call-usd` က explicit positive per-call estimate ကို မပေးရပေမယ့် ငွေပိုက်ချဆိုင်ရာ savings များလည်း `HOLD` အဖြစ် ဆက်လက်တည်ရှိနေပြီး၊ script က နှစ်မျိုးလုံးအနက် တစ်ခုကိုမျှ လுப்பမ invented ဖန်တီးခြင်း မပြုပါ။

Frame တစ်ခုချင်းစီသည် 4 MiB အထိသာလျှင် ကန့်သတ်ခံထားရပြီး၊ raw frame အားလုံးပေါင်းသည် 23 MiB အထိ၊ serialized broker response သည် 32 MiB အထိ ကန့်သတ်ခံထားရသည်။ Private ခေတ္တ directory ကို `finally` အတွင်းတွင် ဖျက်လိုက်သည်။ OmniRoute သည် FFmpeg ကို အတူအစုပါဝင်စေခြင်း မပြုပါ၊ စိတ်ကြိုက် executable path ကိုလည်း လက်ခံခြင်း မပြုပါ။ Caption ချခြင်း မပြုမီ bridge သည် သတိထားသ_selectionသော visual deduplication pass တစ်ခုကို အသုံးပြုသည်။ JPEG တစ်ခုချင်းစီကို 16×16 grayscale buffer သို့ လျှော့ချပြီး နောက်ဆုံး retain လုပ်ထားသော frame နှင့်သာ နှိုင်းယှဉ်သည်။ Frame တစ်ခုထက် ပိုသော caption budget ကို တောင်းဆိုပါက extraction သည် ထို budget ၏ နှစ်ဆအထိရှိပြီး 16 frame ထက် ဘယ်သောအခါမျှ မကျော်လွန်သော ကန့်သတ်ထားသော candidate pool ကို ထောက်ပံ့သည်။ တောင်းဆိုထားသော cap ကို deduplication ပြီးမှသာ အသုံးပြုပြီး၊ budget သည် အနည်းဆုံး နှစ်ခုရှိပါက နောက်ဆုံး thinning အဆင့်တွင် ပထမဦးဆုံးနှင့် နောက်ဆုံး ရွေးချယ်ထားသော candidate များကို ထိန်းသိမ်းထားသည်။ Version သတ်မှတ်ထားသော
`grayscale-16x16-mean-cells-v2` policy သည် mean luma delta နှင့် normalized delta အနည်းဆုံး 0.05 ရှိသော thumbnail cell များ၏ ratio တို့အနက် ပိုကြီးသော တန်ဖိုးကို အသုံးပြုသည်။ Duplicate threshold သည် constant 0.04 ဖြစ်ပြီး runtime setting အဖြစ် မဖော်ထုတ်ဘဲ ခန့်မှန်းနိုင်စွမ်းအတွက် ရွေးချယ်ထားခြင်း ဖြစ်သည်။ ဤ ဒုတိယ high-contrast signal သည် mean-only နှိုင်းယှဉ်ချက်က ဖုံးကွယ်နိုင်သော အလှုပ်အရှားငယ်များနှင့် မြင်နိုင်သော text ပြောင်းလဲမှုများကို ထိန်းသိမ်းပေးသည်။ Comparator သို့မဟုတ် decoder error များသည် fail open ဖြစ်စေပြီး coverage ကို ဆက်လက်ထိန်းသိမ်းသည်။ Output metadata သည် extract လုပ်ထားသော candidate များ၊ အောင်မြင်စွာ အသုံးပြုထားသော frame များနှင့် ဖယ်ထုတ်လိုက်သော visual duplicate များကို ခွဲခြားဖော်ပြသည်။

အထင်းအရှား မှတ်သားထားသော video part သည် timestamp ပါသော contact sheet ကို တောင်းဆိုနိုင်သည်။ Bridge သည် အများဆုံး 4-column, 16-frame JPEG grid ကို တည်ဆောက်သည်။ 512-pixel cell တိုင်းသည် ၎င်း၏ source timestamp ကို high-contrast အောက်ခြေ band အတွင်းသို့ ထည်စိုက်ထားပြီး၊ ထို timestamp အတူတူပင်သည် downstream association နှင့် audit အတွက် textual metadata အတွင်းတွင် ဆက်လက်ရှိနေသည်။ JPEG အပြည့်အစုံသည် 32 MiB အထိသာ ကန့်သတ်ထားဆဲ ဖြစ်သည်။ `sharp` က grid ကို decode သို့မဟုတ် compose လုပ် မနိုင်ပါက bridge သည် JPEG frame ခွဲတိုက်များသို့ fallback ရောက်ရှိသွားပြီး၊ client abort သည် sheet operation မှတဆင့် ဆက်လက်ဖြတ်ကျော်သွားသည်။

Promotion evidence သည် synthetic composition microbenchmark မှ ရည်ရွယ်ချက်ရှိရှိ ခွဲခြားထားသည်။
`scripts/perf/video-bridge-contact-sheet-eval.ts` သည် OpenAI-compatible vision model အစစ်အမှန်များအတွက် schema-version သတ်မှတ်ထားသော A/B harness ကို သတ်မှတ်သည်။ ၎င်းသည် provider မှအစီရင်ခံသော token များ၊ end-to-end wall latency (sheet composition အပါအဝင်)၊ model-call အကြိမ်ရေနှင့် manifest သတ်မှတ်ထားသော fact retention ကို တိုင်းတာသည်။ Raw model response များကို report ထဲသို့ မရေးထည့်ပါ။ SHA-256 digest များနှင့် ကိုက်ညီသော fact ID များကိုသာ သိမ်းဆည်းထားသည်။ Harness သည် `--execute-real` ကို pass လုပ်ပြီး `--model`၊ `OMNIROUTE_BASE_URL` နှင့် `OMNIROUTE_API_KEY` တို့ကို configure လုပ်ထားမှသာ network သို့မဟုတ် ငွေပေးချေရသော model call ကို ပြုလုပ်သည်။ ထို အထင်းအရှား real run မရှိဘဲနှင့် ၎င်း၏ machine-readable verdict သည် `HOLD` ဖြစ်နေဆဲဖြစ်သည်။ Synthetic payload/call-count တိုင်းတာချက်များတည်းဟူသည် promotion evidence မဟုတ်ပါ။

Caller များသည် aligned text ကို ရပြီးဖြစ်ပါက supported video part တစ်ခုသို့ ရွေးချယ်နိုင်သော `transcript.cues` array ကို ပူးတွဲနိုင်သည်။ Cue တစ်ခုချင်းစီသည် `text`၊ probe လုပ်ထားသော duration အတွင်းရှိ ကန့်သတ်ချက်ရှိသော `start`/`end` interval နှင့် whitelist လုပ်ထားသော `source` (`client`၊ `embedded` သို့မဟုတ် `audio-bridge`) တို့ကို ပါရှိရမည်။ `confidence` သည် `1` သို့ default ဖြစ်ပြီး `0` နှင့် `1` ကြားတွင် ရှိနေရမည်။ အတိအကျ တူနေသော duplicate cue များကို ပေါင်းစပ်ဖျက်သိမ်းသည်။ OmniRoute သည် ဤ metadata မှ transcription ကို ဘယ်သောအခါမျှ မစတင်ပါ။ Validated cue များကို source၊ confidence နှင့် interval တို့နှင့်အတူ ဖော်ပြထားသော result ထဲသို့ ကူးထည့်ပြီး frame caption များနှင့်အတူ ယုံကြည်စိတ်ချရခြင်းမရှိသော observation များအဖြစ် ပြသသည်။ မမှန်ကန်သော၊ ကန့်သတ်ချက်ကျော်လွန်သော သို့မဟုတ် provenance မရှိသော text ကို caption stream ထဲသို့ ရောစပ်ခြင်းမပြုဘဲ ပယ်ချသည်။ Request-body transcript channel နှစ်ခုလုံးသည် ကိုယ်တိုင်အခိုင်အမာဖော်ပြသော `embedded` သို့မဟုတ် `audio-bridge` label များအပါအဝင် ထောက်ပံ့ပေးထားသော provenance ကို `client` သို့ normalize လုပ်သည်။ Server ပိုင် adapter မှသာ code-only `trustedSource` argument မှတဆင့် ထို ယုံကြည်ရသော label များကို သတ်မှတ်နိုင်သည်။ Request JSON field သည် ထို argument သို့ မရောက်ရှိနိုင်ပါ။ Transcript text သည် ၎င်း၏ provenance မည်သို့ပင်ဖြစ်စေ ယုံကြည်စိတ်ချရခြင်းမရှိသော media မှဆင်းသက်လာသော content ဖြစ်နေဆဲဖြစ်ပြီး authorization ကို ဘယ်သောအခါမျှ ဆုံးဖြတ်ခြင်း မပြုရပါ။

အဆင့်မြင့် caller သည် တူညီသော video အတွက် `audioTranscript` track ကို ပေးနိုင်သည်။ ၎င်းကို client မှထောက်ပံ့သော text အဖြစ် သဘောထားပြီး server transcription ၏ အထောက်အထားအဖြစ် မသဘောထားပါ။ Fusion seam သည် visual နှင့် audio observation များကို deadline တစ်ခုနှင့် abort signal တစ်ခုတည်း အောက်တွင် လည်ပတ်စေပြီး၊ ၎င်းတို့ကို timeline တစ်ခုတည်းပေါ်တွင် အစဉ်လိုက်စီစဉ်ကာ၊ အတိအကျ တူညီသော duplicate များကို ပေါင်းစပ်ဖျက်သိမ်းပြီး တစ်ဖက်တည်းသာ အောင်မြင်ပါက partial result ကို အစီရင်ခံသည်။ မမှန်ကန်သော `audioTranscript` သည် video တစ်ခုလုံး မအောင်မြင်စေဘဲ ထို partial result သို့ လျှော့ချသွားသည်။ Visual description ကို ထိန်းသိမ်းထားပြီး audio branch သည် sanitize လုပ်ထားသော failure code ကို မှတ်တမ်းတင်သည်။ Branch တစ်ခုချင်းစီ၏ availability၊ partial flag နှင့် sanitize လုပ်ထားသော failure code များကို ဖော်ပြထားသော result ထဲတွင်၊ guardrail metadata (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`) ထဲတွင်၊ result-cache metadata ထဲတွင် နှင့် bridge fusion counter များထဲတွင် ထိန်းသိမ်းထားသည်။ Default Video Bridge path သည် speech-to-text ကို ခေါ်ယူခြင်းမပြုဘဲ ဒုတိယ media မိတ္တူကို download လုပ်ခြင်းလည်း မပြုပါ။ ထို အထင်းအရှား track မရှိဘဲ ၎င်းသည် video-only ဖြစ်နေဆဲဖြစ်သည်။

**Transcript ထိန်းသိမ်းမှု (#12150 P1).** ၎င်းသည် Video Bridge (၎င်းကိုယ်တိုင်က opt-in ဖြစ်သော) က transcript cue ကို render လုပ်သောအခါတိုင်း အလိုအလျောက် သက်ရောက်သည် — သီးခြား retention flag မရှိပါ။ request တစ်ခုက transcript cue တစ်ခုခု (caller က ကြေညာထားသော `transcript` သို့မဟုတ် ပေါင်းစပ်ထားသော `audioTranscript`) ကို render လုပ်သောအခါ၊ guardrail က ၎င်းကို `videoBridgeObserved` ဟု အမှတ်အသားပြုကာ video description ၏ redacted shadow ကို ဖန်တီးပေးသည် — string ကို စုဆောင်းတည်ဆောက်မီ structured cue field ကို အစားထိုးခြင်းဖြင့် တည်ဆောက်ထားပြီး (flattened text ကို parsing လုပ်ခြင်းဖြင့် လုံးဝမဟုတ်ပါ၊ ထို့ကြောင့် cue content မည်သည့်အရာမျှ — adversarial ဖြစ်စေ သာမန်ဖြစ်စေ၊ `[inaudible]`/`[music]` ကဲ့သို့ `]` ပါဝင်သော body များအပါအဝင် — ကျန်ရစ်နိုင်မည်မဟုတ်ပါ) cue တိုင်း၏ free-text body ကို `[redacted-video-transcript]` ဖြင့် အစားထိုးထားသော အတိအကျတူညီသော ပုံသဏ္ဍာန်တစ်ခု ဖြစ်သည်။ ထိန်းသိမ်းထားသော call-log request body က video-derived text part တိုင်းကို အဆိုပါ redacted shadow ဖြင့် လဲလှယ်ထားပြီး content တူညီမှုဖြင့် ကိုက်ညီစစ်ဆေးသည်။ `fullText` anchor ကို ပြီးစီးသွားသော pre-call guardrail payload မှ ပြန်လည်ဖတ်ရှုထားသောကြောင့်၊ နောက်ပိုင်း chain guardrail များ (PII နှင့် credential masker များ၊ priority 10/95) က description text ကို မူလနေရာတွင် ပြင်ဆင်ရေးသားပြီးနောက်ဖြစ်စေ၊ system-prompt/handoff/memory injection က message array ကို ပုံစံပြောင်းလဲပြီးနောက်ဖြစ်စေ ကိုက်ညီမှု ဆက်လက်အောင်မြင်နေဆဲဖြစ်သည်။ model သို့ upstream ပေးပို့သော body မှာ မပြောင်းလဲပါ။ observed request တစ်ခုက durable Memory အတွင်းသို့လည်း ဘာမှမဖြည့်စွက်ပါ (request-derived နှင့် response-derived extraction နှစ်ခုလုံးကို ကျော်လွန်ထားသည်)၊ ထို့ကြောင့် model ၏ ကိုယ်ပိုင် reply က transcript text ကို Memory အတွင်းသို့ echo ပြန်၍မရနိုင်ပါ။

**Raw video field များ (#12430).** bridge ကို enable လုပ်ထားပြီး native video support က မသိရှိရ သို့မဟုတ် မရှိသောအခါ၊ သတ်မှတ်ထားသော `transcript`/`audioTranscript` field များကလည်း `videoBridgeObserved` ကို activate လုပ်သည် — description ပျက်ကွက်ပြီးနောက်ဖြစ်စေ `maxVideos` limit ရောက်ပြီးနောက်ဖြစ်စေ။ `null` နှင့် empty string များ ထည့်တွက်သည်။ မရှိသော field များနှင့် video-မဟုတ်သော metadata များက မထည့်တွက်ပါ။ ထိန်းသိမ်းထားသော မိတ္တူများက ဤ field များကို ဖုံးကွယ်သည် သို့မဟုတ် request ကို ချန်လှပ်ထားပြီး၊ cache များနှင့် Memory ကို bypass လုပ်ထားသည်။

ဤ fallback လမ်းကြောင်းများပေါ်တွင်၊ မှန်ကန်သော caller cue များသည် nonstandard provider field များ မဟုတ်ဘဲ ထောက်ခံထားသော `text`/`input_text` part များ ဖြစ်သွားသည်။ request-ပေးထားသော track နှစ်ခုလုံးသည် ယုံကြည်စိတ်ချရခြင်းမရှိသော `client` observation များအဖြစ် ဆက်လက်တည်ရှိပြီး၊ video ကို ဖော်ပြထားခြင်းမပြုခဲ့ပေနှင့် timestamp များကို media နှင့် စစ်ဆေးအတည်ပြုခဲ့ခြင်းမရှိပေဟူသော ရှင်းလင်းသော သတိပေးချက်တစ်ခု ပါဝင်သည်။ ရှိပြီးသား 256-cue/64-KiB စုစုပေါင်းနှင့် per-cue budget များသည် track နှစ်ခုလုံးကို အတူတကွ သက်ရောက်စေသည်။ timestamp များသည် broker ၏ 600-second ceiling နှင့် ပေးထားသော focus window မည်သည်ဖြစ်စေ အတွင်းကျစွာ ကိုက်ညီရမည်။ မှန်ကန်မှုမရှိသော track များကို စွန့်ပစ်ပြီး arbitrary text အဖြစ် forward မလုပ်ပါ။ ၎င်းတို့၏ ပေါင်းစပ် budget ကျော်လွန်ခြင်းမရှိသေးသရွေ့ မှန်ကန်သော sibling ကို ဆက်လက်အသုံးပြုနိုင်ဆဲဖြစ်သည်။ Null/empty field များက text မည်မျှမထည့်ပါ။ ဤ fallback က media fetch သို့မဟုတ် transcription ကို မထည့်စွက်ပါ။ Transcript extension field များကို fallback video carrier နှင့် ၎င်း၏ `video_url`/`source` object များမှ ဖယ်ရှားထားသည်။ OpenAI wire allowlist မှာ တင်းကျပ်စွာ ဆက်လက်တည်ရှိသည်။ unknown-native video carrier များ ဆက်လက်ရရှိနိုင်ပြီး သိရှိပြီးသား text-only target များက လုံခြုံသော marker များကို ဆက်လက်ထိန်းသိမ်းထားသည်။ Structured redaction shadow များက ပူးတွဲထည့်ထားသော transcript text ကို ကာကွယ်ပေးပြီး၊ မူလ caller-ပိုင် request မှာ မပြောင်းလဲပါ။ Native-supported target များနှင့် disable လုပ်ထားသော bridge များက ၎င်းတို့၏ ရှိပြီးသား bypass အပြုအမူကို ဆက်လက်ထိန်းသိမ်းထားသည်။

နောက်ထပ် ထိန်းသိမ်းထားသော မိတ္တူများက အတူတူသော observed-request signal ကို အသုံးပြုသည်။ raw pre-guardrail client-request snapshot၊ in-memory pending request နှင့် early rejected-request log တို့က video part များအတွင်းရှိ transcript field များကို ဖွဲ့စည်းပုံအရ အစားထိုးသည်။ pipeline stage များနှင့် context handoff က synthesized လုပ်ထားသော string prompt များကို persisted-request-body sink တွင် ဖုံးကွယ်ထားသည်။ ထိန်းသိမ်းထားသော `video_content_removed` marker က `previous_response_id` ဆက်လက်လုပ်ဆောင်မှုကို ရည်ရွယ်ချက်ရှိရှိ စွန့်ပစ်ခဲ့သော text ကို ပြန်လည်တည်ဆောက်ခြင်းအစား fail closed ဖြစ်စေသည်။ observed request တစ်ခုက logging မပြုလုပ်မီ ၎င်း၏ per-part redaction shadow ကို ဆုံးရှုံးသွားပါက၊ သို့မဟုတ် နောက်ပိုင်း request ပြောင်းလဲမှုများပြီးနောက် video shadow အများအပြားအနက်မှ တစ်ခုတည်းပင် ကိုက်ညီမှုမဖြစ်ပါက၊ တစိတ်တပိုင်း ဖုံးကွယ်ထားသော transcript ကို ထိန်းသိမ်းထားခြင်းအစား ထိန်းသိမ်းထားသော request body ကို လုံးဝချန်လှပ်ထားသည်။

observed request တစ်ခုအတွက်၊ model response တစ်ခုက structured cue boundary မရှိဘဲ transcript ၏ မည်သည့်အပိုင်းကိုမဆို ကိုးကားနိုင်သည်။ ထို့ကြောင့် ၎င်း၏ ထိန်းသိမ်းထားသော call-log `responseBody` ကို omission marker ဖြင့် အစားထိုးထားသည်။ အသေးစိတ် pipeline artifact (upstream/client body များနှင့် stream chunk များ ပါဝင်နိုင်သော) ကို မထိန်းသိမ်းပါ။ Semantic၊ idempotency နှင့် reasoning-replay cache များက အဆိုပါ request အတွက် ဖတ်ခြင်းနှင့် ရေးခြင်းကို bypass လုပ်သည်။ provider request နှင့် client-မြင်နိုင်သော response များ မပြောင်းလဲပါ။ အသေးစိတ် artifact ကို ချန်လှပ်သောအခါ early keepalive byte များကို ယာယီ buffer မှ စီးထုတ်ပစ်သည်။ Kiro ၏ ပုံစံမှားနေသော EventStream သတိပေးချက်က payload byte အရေအတွက်ကိုသာ အစီရင်ခံပြီး၊ ၎င်း၏ content များ သို့မဟုတ် JSON parser ၏ raw error ကို ဘယ်တော့မျှ အစီရင်ခံမည်မဟုတ်ပါ။ ဆက်စပ်မှုမရှိသော provider/plugin diagnostic တိုင်းကို audit လုပ်ပြီးကြောင်းကို ဤအရာက မဆိုလိုပါ။ ပိုကျယ်ပြန့်သော retained-sink ရှင်းလင်းရေးကို #11658 တွင် ခြေရာခံထားသည်။

internal `/api/modality-bridge/video/drilldown` lifecycle သည် သီးခြား၊ loopback/token-အတည်ပြုထားသော cache substrate တစ်ခု ဖြစ်သည်။ operation တိုင်းက canonical opaque principal ID ကိုလည်း လိုအပ်သည်။ production caller တစ်ခုကို enable မလုပ်မီ၊ ၎င်းက အဆိုပါ ID ကို အတည်ပြုပြီး tenant မှ ဆင်းသက်ရယူရမည်ဖြစ်ပြီး client-ရွေးချယ်ထားသော တန်ဖိုးကို ဘယ်တော့မျှ forward မလုပ်ရပါ။ Cache key များက အဆိုပါ principal ကို canonical session နှင့် video-reference ID များနှင့် ချည်နှောင်ထားပြီး၊ ၎င်းတို့၏ SHA-256-ဆင်းသက်သော key များကိုသာ သိမ်းဆည်းကာ ဖတ်ခြင်းနှင့် ဖျက်ခြင်းနှစ်ခုလုံးကို principal တူအတွင်း ကန့်သတ်ထားသည်။ Cache က entry တစ်ခုလျှင် derived JPEG frame အများဆုံး 16 ခုကို သိမ်းဆည်းပြီး၊ ဆယ်မိနစ်ကြာပြီးနောက် ၎င်းတို့ကို သက်တမ်းကုန်စေကာ ကန့်သတ်ထားသော `start`/`end` ဖတ်ရှုမှုများ သို့မဟုတ် ရှင်းလင်းသော session ဖျက်ခြင်းကို ထောက်ခံသည်။

principal တစ်ခုချင်းစီသည် entry 16 ခုနှင့် canonical JPEG data 64 MiB သို့ ကန့်သတ်ထားသည်။ ဤကန့်သတ်ချက်များသည် global 64-entry/256 MiB ceiling မှ လွတ်လပ်စွာတည်ရှိသည်။ global LRU eviction ကို စဉ်းစားခြင်းမပြုမီ principal quota ဖိအားက ၎င်း principal ၏ least-recently-used entry များကိုသာ evict လုပ်သည်။ သက်တမ်းကုန်သော entry များကို cache လှုပ်ရှားမှုအခါ principal နှင့် global accounting နှစ်ခုလုံးမှ ရှင်းလင်းပစ်ပြီး၊ ပယ်ဖျက်ခြင်းနှင့် validation ပျက်ကွက်ခြင်းတို့က တစိတ်တပိုင်း အစားထိုးမှုကို commit မလုပ်ပါ။

Cache သည် canonical မဟုတ်သော Base64၊ ပုံမှန်ထက် ပိုလွန်သော padding၊ JPEG မဟုတ်သော media၊ ချို့ယွင်းသော သို့မဟုတ် ပြတ်တောက်နေသော JPEG များနှင့် ကန့်သတ်ထားသော full-image `sharp` decode အတွင်း warning ထွက်ပေါ်စေသော JPEG များကို ပယ်ချသည်။ ၎င်းသည် လက်ခံထားသော image တစ်ခုစီကို canonical JPEG အဖြစ် ပြန်လည် encode လုပ်ပြီး၊ caller field များကို ယုံကြည်မည်အစား decoded byte များမှ width နှင့် height ကို ဆက်လက်ထုတ်ယူကာ၊ ထိန်းသိမ်းထားမည်အစား နောက်ဆက်တွဲ polyglot byte များကို စွန့်ပစ်သည်။ ကန့်သတ်ထားသော canonical compressed buffer ကိုသာ quota နှစ်ခုလုံးတွင် တွက်ချက်သည်။ JSON wire limit တွင် 32 MiB decoded-input ceiling အတွက် Base64 overhead ပါဝင်သည်။ သိမ်းဆည်းထားသော derivation တိုင်းသည် ၎င်း၏ အတည်ပြုပြီး JPEG format/resolution၊ sampling policy၊ derivation version၊ ဖန်တီးချိန်၊ server-မှတွက်ချက်သော content hash နှင့် hashed parent reference အပြင် trusted caller ၏ parent-content hash ကိုပါ မှတ်တမ်းတင်သည်။ Atomic cache commit မပြုလုပ်မီ asynchronous decode/hash phase များကြားတွင် cancellation ကို စစ်ဆေးသည်။

ဤ tranche သည် production producer ကို route သို့ မချိတ်ဆက်ရသေးပဲ multi-resolution variant selection ကိုလည်း မပေးအပ်သေးပါ။ ထို့ကြောင့် transparent Video Bridge request path တွင် ထပ်ပေါင်းအလုပ် မရှိသကဲ့သို့၊ tenant-bound principal derivation နှင့် FU-08 multi-resolution lifecycle အပြည့်အဝတို့သည် ပြီးမြောက်ပြီးသောအပြုအမူအဖြစ် စာရွက်စာတမ်းချပြထားခြင်းမဟုတ်ဘဲ ရှင်းလင်းသော ဆက်လက်လုပ်ဆောင်ရမည့်အလုပ်များအဖြစ် ကျန်ရှိနေပါသည်။

Frame များကို သတ်မှတ်ထားသော Video model ဖြင့် အစဉ်လိုက် caption ချသည်။ ဗလာဖြစ်နေသော Video override သည် Vision setting ကို ဆက်ခံသည်။ နှစ်ခုလုံး ဗလာဖြစ်ပါက၊ Vision auto-router သည် ထိရောက်သော vision-capable model ကို ရွေးချယ်သည်။ အောင်မြင်သော caption များသည် မူရင်း part ကို တည်ငြိမ်သော `[Video description:` prefix ဖြင့် အစားထိုးပြီး၊ ထို prefix သည် စာသားကို ယုံကြည်စိတ်ချမရသော media-မှရရှိသော observation အဖြစ် မှတ်သားပေးကာ၊ media အတွင်းတွင်တွေ့ရသော instruction များကို မလိုက်နာရန် downstream model များအား ပြောဆိုသည်။ Frame-caption cache key များတွင် JPEG byte များ၊ prompt၊ timestamp နှင့် effective model ပါဝင်ပြီး၊ အောင်မြင်သော caption များကိုသာ cache လုပ်သည်။ Cache entry များသည် fallback model အပါအဝင် အမှန်တကယ် အောင်မြင်ခဲ့သော producer model ကို ထိန်းသိမ်းထားသည်။ မတူညီသော model များမှ မတူညီသော frame များ ထွက်ပေါ်ခဲ့ပါက bridge သည် `mixed` ဟု အစီရင်ခံသည်။ Cache hit တစ်ခုသည် ထို producer identity ကို တောင်းဆံထားသော routing plan အဖြစ် label ပြန်ပေးမည်အစား ပြန်လည်အသုံးပြုသည်။ Whole-video result cache ကို output ကို ပြောင်းလဲစေသော input တိုင်းပေါ်တွင် key သတ်မှတ်ထားသည် — prompt၊ effective model၊ sampling policy၊ frame အရေအတွက်၊ semantic analysis mode၊ normalized focus hint ၏ SHA-256 fingerprint၊ focus window၊ `transcript`၊ `audioTranscript` နှင့် contact-sheet flag — ထို့ကြောင့် ထို dimension များထဲမှ တစ်ခုခု ပြောင်းလဲခြင်းသည် cache miss ဖြစ်စေပြီး၊ stale reuse ဘယ်တော့မျှ မဖြစ်နိုင်ပါ။ Visual dedup policy version၊ threshold နှင့် ကန့်သတ်ထားသော candidate-frame အရေအတွက်တို့ကိုလည်း result-cache key နှင့် metadata တွင် ရှင်းလင်းစွာဖော်ပြထားသည်။ ထို့ကြောင့် policy ပြောင်းလဲမှုသည် stale whole-video description ကို ပြန်လည်အသုံးပြု၍ မရပါ။ Result-cache v4 metadata သည် mode နှင့် fingerprint ကိုသာ ထိန်းသိမ်းပြီး၊ raw user task ကို ဘယ်တော့မျှ မထိန်းသိမ်းပါ။ Guardrail metadata သည် တောင်းဆံထားသော နှင့် ထိရောက်သော analysis mode နှစ်ခုလုံးကို အစီရင်ခံသည်။ အသုံးပြုနိုင်သော user text မရှိဘဲ တောင်းဆံထားသော `focused` mode ကို ထိရောက်မှုအရ `full` ဟု အစီရင်ခံသည်။

Guardrail သည် ပံ့ပိုးထားသော video part တိုင်းကို extract လုပ်သော်လည်း `modalityBridgeVideoMaxVideos` ထက်ပို၍ ဖော်ပြခြင်း မပြုပါ။ `supportsVideo === false` ရှိသည်ဟု သက်သေပြထားသော target အတွက်၊ မအောင်မြင်သော နှင့် ကန့်သတ်ချက်ကျော်လွန်သော video များသည် ရှင်းလင်းသော လုံခြုံသော text marker များဖြစ်သွားပြီး raw video မကျန်ရှိစေပါ။ Capability ကို မသိရှိသေးပါက၊ ထို part များသည် ၎င်းတို့၏ video carrier ကို ဆက်လက်ထိန်းသိမ်းထားပြီး၊ မည်သည့် fallback transcript မဆို အထက်ပါ ကန့်သတ်ထားသော text conversion ကို လိုက်နာသည်။ `supportsVideo === true` ရှိသော target များသည် bridge ကို bypass လုပ်သည်။ Client request abort signal သည် download၊ broker queue၊ subprocess များနှင့် caption call များမှတစ်ဆင့် ပျံ့နှံ့သွားပြီး၊ abort များသည် video များအကြားတွင် ရပ်တန့်ကာ raw media သို့ fail open ဖြစ်စေခြင်း ဘယ်တော့မျှ မရှိပါ။

Runtime setting များသည် DB-backed ဖြစ်ပြီး Zod ဖြင့် validate လုပ်ထားသည် —

| Key                                 | ပုံမှန်     | အပိုင်းအခြား / အပြုအမူ                                                                                                                   |
| ----------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Optional runtime, opt-in                                                                                                                 |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` သည် generic caption များကို ထိန်းသိမ်းသည်၊ `focused` သည် ကန့်သတ်ထားသော၊ ယုံကြည်စိတ်ချမရသော နောက်ဆုံး user context ကို အသုံးပြုသည် |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge model ကို ဆက်ခံသည်                                                                                                         |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                                     |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`၊ `scene_aware`၊ သို့မဟုတ် အချိုးကျ `segment_aware`။ detector ပျက်ကွက်မှုသည် `uniform` သို့ fallback ပြန်သွားသည်                |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                                      |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                                           |

စက္ကုန် 120 ကျော်သော legacy persisted Video timeout တန်ဖိုးများကို broker deadline သို့ clamp လုပ်ပြီး၊ ထိုကန့်သတ်ချက်ထက် ကျော်လွန်သော setting ရေးသားမှုအသစ်များကို ပယ်ချသည်။
`GET /api/modality-bridge/video/runtime` သည် authentication သို့မဟုတ် runtime probing မပြုလုပ်မီ trusted stamped loopback locality ကို လိုအပ်ပြီး၊ ထို့နောက် management auth ကို လိုအပ်သည်။ ၎င်းသည် `available`၊ သန့်စင်ထားသော FFmpeg/ffprobe version များနှင့် runtime မရနိုင်ပါက သတ်မှတ်ထားသော အကြောင်းပြချက်တစ်ခုကိုသာ ပြန်ပေးသည်။ Internal extraction endpoint သည် public upload API မဟုတ်ပါ — queue saturation သည် `503` နှင့် `Retry-After` ကို ပြန်ပေးပြီး၊ caller disconnect သည် `499` ကို ပြန်ပေးကာ၊ သတ်မှတ်ထားသော broker deadline သည် `504` ကို ပြန်ပေးသည်။ ပြောင်းလဲပြီးသော response များသည် Vision သို့မဟုတ် Audio segment များကို မဖယ်ရှားဘဲ ဗဟို `x-omniroute-modality-bridge` header သို့ `video->text;model=<visionModel>;parts=<videos>` ကို ထပ်ပေါင်းထည့်သည်။

### PII Masker (`piiMasker.ts`)

Stage **နှစ်ခုလုံး**တွင် run လုပ်သည်။

- **`preCall`** သည် payload ကို clone လုပ်ကာ `system`၊ `messages`၊ `input` နှင့်
  `prompt` (ရိုးရိုး string item များအပါအဝင်) များကို လှည့်လည်စစ်ဆေးပြီး string
  `content`/`text` field များအပေါ် `processPII()` (`@/shared/utils/inputSanitizer`
  မှ) ကို အသုံးချသည်။ `PII_REDACTION_ENABLED=true` ဖြစ်သောအခါ တွေ့ရှိထားသော
  PII ကို outbound payload တွင် ဖျက်ဖျောက်လိမ့်မည်။ ၎င်းသည်
  `INPUT_SANITIZER_MODE` (prompt-injection မူဝါဒကိုသာ ထိန်းချုပ်သည်) နှင့်
  လုံးဝသီးခြားဖြစ်သည်။ Redaction ပိတ်ထားသောအခါ ထို call သည် content ကို
  ပြင်ဆင်ပြန်ရေးခြင်းမပြုဘဲ detection အရေအတွက်များကိုသာ မှတ်သားလိမ့်မည်။
- **`postCall`** သည် response ကို deep-clone လုပ်ပြီး `sanitizePIIResponse()`
  ကို Responses-API-shape masker (`maskResponsesOutput` — `output_text` နှင့်
  `output[].content[].text` ကို လွှမ်းခြုံသည်) နှင့်အတူ run လုပ်သည်။
  မည်သည့် redaction မဆို ဖြစ်ပေါ်ပါက ပြင်ဆင်လိုက်သော response သည် မူရင်း
  response ကို အစားထိုးလိမ့်မည်။

Guardrail သည် ဘယ်တော့မှ block မလုပ်ပါ၊ မှတ်ချက်ချခြင်း (`meta.detections`၊
`meta.redacted`) သို့မဟုတ် ပြင်ဆင်ပြန်ရေးခြင်းကိုသာ ပြုလုပ်သည်။

#### အမျိုးအစားအလိုက် ရွေးချယ်မှု၊ စိတ်ကြိုက် pattern များနှင့် detection ကောင်တာများ

**Dashboard → Settings → Security → PII masking** သည် _မည်သည့်အရာကို_ mask
လုပ်မည်ကို ရွေးချယ်ပေးသည်။ ၎င်းသည် masking ကို ဖွင့်ပေးခြင်း မဟုတ်ပါ။
၎င်းမှာ `PII_REDACTION_ENABLED` (request) နှင့် `PII_RESPONSE_SANITIZATION`
(response + SSE) ဖြစ်ပြီး နှစ်ခုလုံးသည် default အနေဖြင့် ပိတ်ထားသည်။

- **အမျိုးအစားအလိုက် ရွေးချယ်မှု** — built-in id များကို
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`) တွင် ဖော်ပြထားသည်။
  မသတ်မှတ်ထားခြင်းသည် အမျိုးအစားအားလုံးကို ဆိုလိုသည် (ဤ setting မရှိခင်က
  အပြုအမှု)။ Request engine ၏ `ssn_us` pattern သည် `ssn` သို့ map လုပ်သည်။
  Templates (Minimal, Standard, Financial, Brazilian, USA, Full) များသည် UI ရှိ
  checkbox များကိုသာ ဖြည့်သွင်းပေးသည်။
- **စိတ်ကြိုက် pattern များ** — regex သို့မဟုတ် wildcard pattern အများဆုံး
  ၂၀ ခု (`*` = whitespace မဟုတ်သော စာလုံး အများဆုံး ၆၄ လုံး၊ `?` = တစ်လုံး)။
  ကိုက်ညီမှုများသည် `[CUSTOM_REDACTED]` ဖြစ်သွားမည်။ Pattern တိုင်းသည်
  `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`)
  မှတစ်ဆင့် ဖြတ်သန်းရမည်။ အများဆုံး စာလုံး ၅၀၀၊ flags များကို `g i m s u`
  သို့ ကန့်သတ်ထားခြင်း၊ compile လုပ်နိုင်ရမည်၊ `safe-regex` (catastrophic
  backtracking) ကို အောင်မြင်ရမည်၊ နှင့် empty string သို့မဟုတ် redaction
  placeholder ကို မကိုက်ညီရပါ။ မအောင်မြင်သော pattern တစ်ခုကို သိမ်းဆည်းစဉ်နှင့်
  စမ်းသပ်စဉ်တွင် ငြင်းပယ်လိမ့်မည်ဖြစ်ပြီး၊ မအောင်မြင်သော သိမ်းဆည်းထားသော row
  ကို runtime တွင် compile လုပ်ခြင်းအစား ကျော်လွန်လိမ့်မည်။ စိတ်ကြိုက် pattern
  များသည် masking ဖွင့်ထားစဉ်တွင်သာ run လုပ်သည်။
- **Detection ကောင်တာများ** — အမျိုးအစားအလိုက် အရေအတွက်များ (ကိုက်ညီသော
  တန်ဖိုးများ ဘယ်တော့မှ မဟုတ်ပါ)၊ memory တွင် ထားရှိပြီး restart လုပ်သောအခါ
  reset ဖြစ်လိမ့်မည် (`src/lib/pii/piiDetectionStats.ts`)။ ၎င်းတို့သည် masking
  ဖွင့်ထားစဉ်တွင်သာ တိုးပွားလိမ့်မည်။

Settings များသည် `key_value` table (namespace `pii_settings`၊
`src/lib/db/piiSettings.ts`) တွင် ရှိနေပြီး ၁ စက္ကန့် cache မှတစ်ဆင့်
ဖတ်ရှုလိမ့်မည်။ API:

| Method | Path                     | ရည်ရွယ်ချက်                                                                                           |
| ------ | ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Flag အခြေအနေ၊ `enabledTypes`၊ `customPatterns`၊ detection ကောင်တာများ                                 |
| `PUT`  | `/api/settings/pii`      | `enabledTypes` (`null` = အားလုံး) နှင့်/သို့ `customPatterns` ကို အစားထိုးသည်                         |
| `POST` | `/api/settings/pii/test` | အများဆုံး 8 KB ရှိသော sample တစ်ခုအပေါ် pattern တစ်ခုကို dry-run လုပ်သည်၊ ဘာမျှ သိမ်းဆည်းခြင်း မပြုပါ |

သုံးခုလုံးသည် management auth လိုအပ်ပြီး body ကို Zod
(`src/shared/validation/schemas/piiSettings.ts`) ဖြင့် validate လုပ်သည်။

### Prompt Injection (`promptInjection.ts`)

အသုံးပြုသူ ပေးထားသော content ရှိ adversarial တည်ဆောက်ပုံများကို
ရှာဖွေတွေ့ရှိပြီး ပြင်ဆင်ထားသော မူဝါဒကို ကျင့်သုံးစေသည်။ အပြုအမှုကို
environment variables များနှင့် constructor options များက မောင်းနှင်သည်။

| Setting         | Env var                                                                                               | Default | သက်ရောက်မှု                                                                                                                                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ဖွင့်ခြင်း      | `INPUT_SANITIZER_ENABLED`                                                                             | `true`  | `false` ဖြစ်သောအခါ၊ guardrail သည် short-circuit ဖြစ်သွားသည်။                                                                                                                                                    |
| Mode            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`  | Injection မူဝါဒ: `block`၊ `warn` သို့မဟုတ် `log`။ (`redact` ကို back-compat အတွက် လက်ခံသော်လည်း injection text ကို **မဖယ်ထုတ်ပါ**၊ request PII ပြင်ဆင်ပြန်ရေးခြင်းကို `PII_REDACTION_ENABLED` က ထိန်းချုပ်သည်။) |
| Block threshold | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Block လုပ်ရန် လိုအပ်သော အနိမ့်ဆုံး severity။ Medium သည် default တွင် observe-only ဖြစ်သည်။                                                                                                                      |

**Mode ဦးစားပေးမှု** (`getMode`): caller `options.mode` →
`INJECTION_GUARD_MODE` **DB feature-flag override** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`။ ထို့ကြောင့် dashboard override သည် env vars များအပေါ် အနိုင်ရပြီး
Feature Flags UI သည် run နေသော guard ကို တိုက်ရိုက် (restart မလိုအပ်ဘဲ)
ထိန်းချုပ်နိုင်သည်။ DB ဖတ်ရှုမှုသည် fail-safe ဖြစ်သည်။ error ဖြစ်ပေါ်ပါက
guard သည် env-based အပြုအမှုသို့ ပြန်လည်ကျရောက်ပြီး override မသတ်မှတ်ထားပါက
အပြုအမှုသည် env-only resolution နှင့် အလုံးစုံတူညီသည်။

Detection ရင်းမြစ်များ:

1. `@/shared/utils/inputSanitizer` မှ `sanitizeRequest()` (pipeline ၏
   အခြားနေရာများတွင် အသုံးပြုသော shared detector set)။
2. Built-in `DEFAULT_GUARD_PATTERNS` (လက်ရှိအချိန်တွင် `system_override_inline`
   နှင့် `markdown_system_block`၊ နှစ်ခုလုံး `high` severity)။
3. Constructor options များမှတစ်ဆင့် ပေးပို့သော optional `customPatterns`
   (strings၊ regex သို့မဟုတ် `{ name, pattern, severity }` records)။

`mode === "block"` **ဖြစ်ပြီး** severity threshold ကို ဖြည့်စက်သော detection အနည်းဆုံး တစ်ခု ရှိနေပါက၊ `preCall` သည် `{ block: true, message: "Request rejected: suspicious content detected" }` ကို ပြန်ပေးပါသည်။ `warn`/`log` mode များတွင် guardrail သည် log မှတ်သောလည်း call ကို ခွင့်ပြုပါသည်။ registry ကို မဖြတ်ဘဲ prompts များကို evaluate လုပ်ရန် လိုအပ်သော callers များအတွက် shared helper `evaluatePromptInjection()` ကိုလည်း export လုပ်ထားပါသည်။

**စကင်န် ကန့်သတ်ချက် (v3.8.20):** detector သည် joined prompt text ၏ **ပထမဆုံး 16 KB** ကိုသာ စစ်ဆေးပါသည် — `src/shared/utils/inputSanitizer.ts` ရှိ `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) ဖြစ်ပါသည်။ `detectInjection()` နှင့် `evaluatePromptInjection()` နှစ်ခုလုံးသည် pattern loop ကို မစတင်ဆောင်ရွက်မီ `slice(0, MAX_INJECTION_SCAN_BYTES)` ကို အသုံးပြုပါသည်။ Injection directives များသည် input ၏ အပေါ်ပိုင်းအနီးတွင် ရှိနေတတ်သောကြောင့်၊ detection အား အားနည်းစေခြင်းမရှိဘဲ KB ရာချီရှိသော payloads များအပေါ်တွင် regex CPU/GC ကို ကန့်သတ်ပေးပါသည် (cf. #3932, #4041)။

### Credential Masker (`credentialMasker.ts`)

default chain တွင် နောက်ဆုံးအဆင့်အဖြစ် (priority `95`)၊ stage **နှစ်ခုလုံးတွင်** run ပါသည်။ outbound payload (message content, tool-call arguments, tool results) **နှင့်** provider response မှ လူသိများသော API-key / secret-token patterns များကို redact လုပ်ပါသည်။ ထို့ကြောင့် prompt ထဲသို့ paste ထားသော credential (သို့မဟုတ် tool result က ပြန်လည်တုံ့ပြန်သော credential) သည် upstream provider သို့မဟုတ် client ဆီသို့ ယိုစိမ့်မသွားစေရပါ။

- **Opt-in ဖြင့်သာ**၊ PII redaction နှင့် တူညီသော convention (Hard Rule #20-adjacent): `settings.credentialRedactionEnabled === true` **သို့မဟုတ်** `CREDENTIAL_REDACTION_ENABLED=true` ဖြစ်မှသာ ဖွင့်နိုင်ပါသည်။ ပိတ်ထားပါက guardrail သည် no-op ဖြစ်ပါသည် — ဘယ်တစ်ခါမှ block မလုပ်ပါ၊ rewrite လည်း မလုပ်ပါ။
- `redactCredentials()` သည် payload/response tree တစ်ခုလုံးကို လှည့်လည်စစ်ဆေးပြီး (`walkValue()`၊ prototype-pollution-safe၊ `WeakSet` ဖြင့် cycle-safe) ကိုက်ညီမှုများကို `[REDACTED:<type>]` placeholder ဖြင့် အစားထိုးပါသည်။ တကယ့်ပြောင်းလဲသွားသော branches များကိုသာ clone လုပ်ပါသည်။
- `CREDENTIAL_PATTERNS` သည် LLM provider keys (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokens (GitHub, Slack, Linear, Notion, npm, Postman, Discord), payment keys (Stripe, Square), cloud keys (AWS access key, Twilio, SendGrid, Mailgun), private keys / JWTs, credential ပါဝင်သော connection strings (`mongodb://user:pass@...` စသည်တို့) နှင့် generic `Authorization`/`x-api-key`/`api-key`/`apikey` header-value pattern တို့ကို လွှမ်းခြုံပါသည်။ Header ပုံသဏ္ဌာန် keys (`authorization`, `x-api-key`, `api-key`, `apikey`) များကို generic text regex ဖြင့် မဟုတ်ဘဲ structurally (တန်ဖိုးကိုသာ၊ `Bearer `/`Basic ` ကဲ့သို့သော scheme prefix ကို ထိန်းသိမ်းထား၍) redact လုပ်ပါသည်။
- guardrail သည် ဘယ်တစ်ခါမှ block မလုပ်ပါ။ rewrite (`modifiedPayload` / `modifiedResponse`) နှင့် annotate (`meta.credentialsRedacted`, `meta.count`) များကိုသာ ပြုလုပ်ပါသည်။

Regression ကာကွယ်မှု: `tests/unit/credential-masker-guardrail.test.ts`။

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
