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

## Built-in Guardrails

တင်သွင်းချိန်တွင် registry သည် guardrail ခြောက်ခုကို ဦးစားပေးအစီအစဉ်အတိုင်း အလိုအလျောက်
တင်ပေးသည် (`registry.ts` → `registerDefaultGuardrails()` ကို ကြည့်ပါ)။

| Priority | Name                | Stage(s)       | File                  |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

ဦးစားပေးနံပါတ် နိမ့်သောအရာများသည် **ပထမဆုံး** လုပ်ဆောင်သည်။

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

GLM 5.3 base model နှင့် `glm-5.3-{low,high,max}` တို့တွင်
`supportsVision:false` registry/spec metadata ကို တိကျစွာ သတ်မှတ်ထားသည်။ GLM 5.3 Flash မူကွဲများသည်
native-vision model များအဖြစ် ဆက်လက်ရှိနေသည်။ Claude Code ၏ `/v1/messages` route သည် Claude-to-OpenAI
ဘာသာပြန်ခြင်းမပြုမီ shared `handleChat` pre-call guardrail chain ထဲသို့ ဝင်ရောက်သည်။ ထို့ကြောင့် Claude Code
`Read` tool-result အတွင်းရှိ image များကို OpenAI `image_url` content အဖြစ် ပြောင်းလဲမတင်မီ ဖော်ပြခြင်း သို့မဟုတ်
ကိုင်တွယ်ခြင်း ပြုလုပ်ရမည် (#17069)။

**vision** မပံ့ပိုးသော model များထံ ပေးပို့မည့် image ပါ request များကို ကြားဖြတ်ယူပြီး request တစ်ခုလုံးကို
vision-capable model သို့ ပြန်လည်လမ်းညွှန်ခြင်း သို့မဟုတ် upstream call မပြုမီ configurable vision model မှ
ထုတ်ပေးသော စာသားဖော်ပြချက်များဖြင့် image အပိုင်းများကို အစားထိုးခြင်း ပြုလုပ်သည်။ ထိုသို့ဖြင့်
text-only provider များသည် multimodal payload များကို ပွင့်လင်းမြင်သာစွာ ကိုင်တွယ်နိုင်သည်။

လုပ်ဆောင်စီးဆင်းပုံမှာ—

1. ရည်ရွယ်ထားသော model သည် vision ကို ပံ့ပိုးပြီးသားဖြစ်ပါက ကျော်သွားသည်
   (သို့သော် အတင်း bridge ပြုလုပ်ရန် စာရင်း `isVisionBridgeForcedModel` ထဲတွင် ပါဝင်ပါက မကျော်ပါ)။
2. `extractImageParts(messages)` (`visionBridgeHelpers.ts`) မှတစ်ဆင့် image အပိုင်းများကို ထုတ်ယူသည်။
   ၎င်းသည် **unified media detector** `detectMediaParts()` ကို
   `open-sse/utils/mediaParts.ts` တွင် အသုံးပြုပြီး combo compatibility filter နှင့် မျှဝေသုံးစွဲသည့်
   တစ်ခုတည်းသော အမှန်တရားရင်းမြစ် ဖြစ်သည်။
   ထုတ်ယူခြင်းသည် `replaceImageParts` မှ ပြန်လည်ထည့်သွင်းနိုင်သော ပုံစံများကိုသာ ခွင့်ပြုစာရင်းသွင်းထားသည်
   (extract↔replace contract)။ ထိုပုံစံများမှာ OpenAI `image_url`၊ Anthropic base64
   `source.type:"base64"`၊ Anthropic URL `source.type:"url"` နှင့် Responses API `input_image` တို့ ဖြစ်သည်။
   Claude Code `tool_result.content` နှင့် Responses tool outputs အတွင်း နက်ရှိုင်းစွာ ထည့်သွင်းထားသော
   ကိုက်ညီသည့် image များကိုလည်း ၎င်းတို့၏ မူလလမ်းကြောင်းများအတိုင်း ထုတ်ယူပြီး ပြန်လည်အစားထိုးသည်။
   indicator-only ပုံစံများသည် combo-filter အတွက်သာ ဖြစ်ပြီး ထုတ်ယူခြင်း မပြုပါ။
   မတွေ့ရှိပါက ကျော်သွားသည်။
3. `resolveVisionBridgeRuntimeSettings()` မှတစ်ဆင့် runtime config ကို ဖြေရှင်းသည်
   (`src/shared/constants/modalityBridgeDefaults.ts`)။ `modalityBridge*` settings key အသစ်များသည်
   အကျုံးဝင်ပြီး legacy `visionBridge*` key များသည် **one-cycle fallback** (rollback window) အဖြစ်
   ဆက်လက်ရှိသည်။ bridge ကို ပိတ်ထားပါက media traversal မပြုမီ ကျော်သွားသည်။
4. Mode selector (`modalityBridgeVisionMode`၊ အောက်ပါဇယားကို ကြည့်ပါ) က reroute သို့မဟုတ် describe ကို
   ဆုံးဖြတ်သည်။ Reroute သည် `model` တစ်ခုတည်းကိုသာ ပြောင်းထားသော `modifiedPayload` နှင့်
   `{ rerouted, fromModel, toModel, imagesKept }` meta ကို ပြန်ပေးသည်။
5. Describe လမ်းကြောင်းတွင် image အရေအတွက်ကို `maxImages` ဖြင့် ကန့်သတ်သည်၊ task-aware prompt ကို
   ဖွဲ့စည်းသည်၊ describe cache ကို စစ်ဆေးသည်၊ vision model ကို **parallel** ဖြင့် ခေါ်သည်
   (`Promise.allSettled`)၊ ထို့နောက် ၎င်းတို့၏ နေရာတွင် `[Image N]: <description>` စာသားအပိုင်းများကို
   ထည့်သွင်းသည်။ Describe မအောင်မြင်ပါက `null` ကို ရရှိသည်။ ထိုအခါ raw image ကို မသိရသေးသော သို့မဟုတ်
   vision-capable target များအတွက် ထိန်းသိမ်းထားသည် (#4012)။ သို့သော် **အတည်ပြုထားသော text-only direct
   target** သို့မဟုတ် zero-vision combo ဖြစ်ပါက describe မပြုနိုင်သည့် image တိုင်းအတွက်
   `(unavailable — no vision-capable provider connected)` ဟူသော စာသား placeholder ကို ထည့်ပေးသည်။
   ၎င်းတွင် partial failure များနှင့် describe-call cap ထက် ကျော်လွန်သည့် image များလည်း ပါဝင်သည် (#17069)။
   ယခင်ရှိပြီးသား all-failed combo describe fallback ကိုလည်း ဆက်လက်ထားရှိသည် (#8430)။
6. `modifiedPayload` နှင့် meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`) ကို ပြန်ပေးသည်။

#### Mode selector (`modalityBridgeVisionMode`)

| Mode       | Default | Behavior                                                                                                                                                                                                                                                                                                                             |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔       | ယခင် heuristic ကို မပြောင်းလဲဘဲ အသုံးပြုသည် (#6640/#7204)။ combo မဟုတ်သော/`auto/` model များကို မူလ model တွင် အသုံးပြုနိုင်သော credential ရှိပြီးသားဖြစ်ပါက describe ပြုလုပ်ပြီး၊ မရှိပါက အကောင်းဆုံး vision model သို့ reroute ပြုလုပ်သည်။ combo target များကို အမြဲ describe ပြုလုပ်သည်။                                          |
| `describe` |         | အမြဲ describe ပြုလုပ်သည် — reroute block ကို လုံးဝကျော်သွားပြီး အသုံးပြုသူရွေးချယ်ထားသော model ကသာ အဖြေပေးသည်။                                                                                                                                                                                                                       |
| `reroute`  |         | Reroute ကို အတင်းပြုလုပ်သည်။ keep-credentialed-model guard ကို ကျော်သွားသည်။ သို့သော် reroute-**target** credential guard သည် ဆက်လက်သက်ရောက်သည် — အသုံးပြုနိုင်သော vision target မရှိပါက bridge သည် ရှင်းလင်းသော error ဖြင့် တားဆီးပြီး describe ပြုလုပ်ခြင်း သို့မဟုတ် raw image များကို text-only target သို့ ပေးပို့ခြင်း မပြုပါ။ |

အတင်းသတ်မှတ်ထားသော mode များသည် auto heuristic မလုပ်ဆောင်မီ တိုက်ရိုက်ဆုံးဖြတ်သည်။ `auto` အပြုအမူသည်
PR-1 မတိုင်မီ guardrail နှင့် byte-identical ဖြစ်သည်။

#### API-key scope (`visionBridgeKeyScope.ts`)

Caller ၏ API key က `allowedConnections`၊ quota pool များ (`allowedQuotas`) သို့မဟုတ် model များ (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`) ကို ကန့်သတ်ထားပါက bridge သည် key အသုံးပြုခွင့်ရှိသည့် connection များပေါ်တွင် key အသုံးပြုခွင့်ရှိသည့် reroute နှင့် describe model များကိုသာ ရွေးချယ်သည်။ ထို့နောက် describe call သည် `x-omniroute-self-loop-key-id` header ပါသော OmniRoute self-loop မှတစ်ဆင့် အမြဲသွားပြီး၊ လက်ခံသည့် chat request သည် ထို key ၏ connection နှင့် model policy ကို ထပ်မံအတည်ပြုသည်။ `enforceApiKeyPolicy()` သည် ထို header ကို self-loop bearer နှင့်အတူရှိသည့်အခါမှသာ အသိအမှတ်ပြုသောကြောင့် access ကို ပိုမိုကန့်သတ်နိုင်သော်လည်း တိုးချဲ့၍မရပါ။ ထို့အပြင် resolve မဖြစ်သော id ကိုလည်း ငြင်းပယ်သည်။

Key အတွက် vision model တစ်ခုမျှ ခွင့်ပြုမထားပါက **အတည်ပြုထားသော text-only target** သည် image request ကို incapable upstream သို့ image bytes မပို့ဘဲ ရှင်းလင်းသော HTTP 400 ဖြင့် locally ငြင်းပယ်သည် (#17069)။ Vision capability မသိရသေးသော သို့မဟုတ် native vision capability ရှိသော target များအတွက် describe path သည် ယခင် fail-open behavior ကို ဆက်လက်ထားရှိသည် (meta `{ skipped: true, reason: "no_permitted_vision_model" }`)။ Key မပါသော request များနှင့် ဤကန့်သတ်ချက်များမရှိသော key များသည် ယခင်အတိုင်း အတိအကျ အလုပ်လုပ်သည်။

#### Task-aware describe prompt (`modalityBridgeVisionTaskAware`)

မူလတန်ဖိုးမှာ **true** ဖြစ်သည်။ `composeVisionPrompt()` (`visionBridgeHelpers.ts`) သည် base describe prompt ထဲသို့ **နောက်ဆုံး user message** ၏ စာသားကို (စာလုံး 500 အထိ ဖြတ်တောက်၍) ထည့်သွင်းသည်။ ထိုသို့ဖြင့် user အမှန်တကယ် မေးမြန်းထားသည့်အရာနှင့် ကိုက်ညီအောင် description ကို ဦးတည်ပေးပြီး (codex-vision-proxy pattern) မြင်ရသောစာသားများကို transcription ပြုလုပ်ရန် vision model ကို တောင်းဆိုသည်။ Flag ကိုပိတ်ထားပါက — သို့မဟုတ် user text မရှိပါက — base prompt ကို မပြောင်းလဲဘဲ အသုံးပြုသည်။

Describe self-loop ၏ ကိုယ်ပိုင် OpenAI-compatible request (`visionBridgeHelpers.ts` ရှိ `callVisionModelSingle()`) သည် caller/provider အားလုံးအတွက် `image_url.detail: "high"` ကို အမြဲတမ်း တောင်းဆိုသည် — client signal တစ်ခုခုရှိမှသာ ပြုလုပ်ခြင်းမဟုတ်ပါ။ Low-detail sampling သည် ဤ prompt က တောင်းဆိုထားသည့် text-transcription task အတွက် အထူးသဖြင့် OCR accuracy ကို လျော့ကျစေသောကြောင့် မူရင်း inbound request တွင် အသုံးပြုထားသည့် detail level မည်သို့ပင်ဖြစ်စေ describe call ကိုယ်တိုင်က high detail ကို အမြဲတောင်းဆိုသည်။ ၎င်းသည် internal describe request body ကိုသာ သက်ရောက်ပြီး၊ primary request တွင် OmniRoute က caller ၏ ကိုယ်ပိုင် `image_url.detail` ကို forward ပြုလုပ်ပုံကို မပြောင်းလဲပါ — ထို default ကို `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`) တွင် သီးခြားအသုံးပြုပြီး၊ တွေ့ရှိထားသော OpenCode client များအတွက်သာ အသုံးချသည်။ Describe self-loop ၏ Anthropic wire-format branch တွင် `detail` field မပါဝင်သဖြင့် default နှစ်မျိုးလုံး၏ သက်ရောက်မှုမရှိပါ။

#### Describe output cap (`modalityBridgeVisionMaxChars`)

| Key                            | မူလတန်ဖိုး | အပိုင်းအခြား            |
| ------------------------------ | ---------- | ----------------------- |
| `modalityBridgeVisionMaxChars` | `0`        | `0` သို့မဟုတ် 100–50000 |

`0` (မူလတန်ဖိုး) သည် **ကန့်သတ်ချက်မရှိခြင်း** ကို ဆိုလိုသည် — `callVisionModel()` မှ ပြန်လာသော description ကို မပြင်ဆင်ဘဲ တိုက်ရိုက်ပေးပို့ကာ ရှိပြီးသား behavior ကို ထိန်းသိမ်းသည်။ 100–50000 အပိုင်းအခြားအတွင်းရှိ မည်သည့်တန်ဖိုးမဆို description ကို `…` suffix ဖြင့် ဖြတ်တောက်ပြီး `[Image N]: <description>` အဖြစ် ပြန်လည်ထည့်သွင်းသည် (`src/lib/guardrails/visionBridge.ts` ရှိ `VisionBridgeGuardrail.preCall()`)။ Downstream model က transcription အပြည့်အစုံ လိုအပ်သည့် detail-heavy OCR task များအတွက် ဤတန်ဖိုးကို မြှင့်ပါ။ စကားများသော vision model များတွင် token အသုံးပြုမှုကို ကန့်သတ်ရန် လျှော့ချပါ။ Dashboard field သည် Vision tab ၏ Advanced panel တွင် ရှိသည် (`ModalityBridgeVisionTab.tsx` ရှိ `modality-bridge-max-chars`)။ 1 နှင့် 99 ကြားရှိ မည်သည့်တန်ဖိုးကိုမဆို 100 အထိ မြှင့်သတ်မှတ်ပေးသော်လည်း explicit `0` ကို မပြောင်းလဲထားသည် — `0` သည် ကိုယ်ပိုင်အနေဖြင့် မှန်ကန်သော Zod value ဖြစ်ပြီး (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`) “unset” default သက်သက်မဟုတ်ပါ။

#### Describe cache (`modalityBridge/bridgeCache.ts`)

Describe output များအတွက် process-wide မျှဝေသုံးစွဲသော in-memory LRU + TTL cache ဖြစ်သည်။ Key = `sha256(imageRef + composedPrompt + configuredBridgeModel)` ဖြစ်ပြီး length-prefix framing ကို အသုံးပြုထားသောကြောင့် field boundary collision မဖြစ်နိုင်ပါ။ Model component သည် အမှန်တကယ်ဖြေဆိုခဲ့သော model မဟုတ်ဘဲ **configured** bridge model ဖြစ်သည် — `callVisionModel` သည် အတွင်းပိုင်းတွင် fallback ပြုလုပ်နိုင်သောကြောင့် attempt တစ်ခုစီအလိုက် key သတ်မှတ်ပါက cache အပိုင်းအစများ ကွဲပြားသွားမည်ဖြစ်သည်။ မအောင်မြင်သော describe များကို မည်သည့်အခါမျှ cache မလုပ်ပါ။ Settings များမှာ —

| Key                             | မူလတန်ဖိုး | အပိုင်းအခြား |
| ------------------------------- | ---------- | ------------ |
| `modalityBridgeCacheEnabled`    | `true`     | —            |
| `modalityBridgeCacheTtlMinutes` | `60`       | 1–1440       |
| `modalityBridgeCacheMaxEntries` | `200`      | 10–5000      |

#### Remote image normalization (self-loop describe/base64 fetch)

Bridge က **remote** image ကို ကိုယ်တိုင် fetch ပြုလုပ်သည့်အခါ — Anthropic describe self-call နှင့် claude-wire-format base64 conversion (`ensureBase64ImagesForClaudeWire`) နှစ်ခုစလုံးသည် `visionBridgeHelpers.ts` ရှိ `fetchRemoteImageAsDataUri()` မှတစ်ဆင့် လုပ်ဆောင်သည် — ရရှိလာသော data URI ကို vision-model request ထဲသို့ ထည့်သွင်းမည့်အရင် `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) မှတစ်ဆင့် ဖြတ်သန်းသည်။ အရွယ်အစားကြီးသော image များကို **2048px long edge** အထိ downscale ပြုလုပ်သည် (OpenAI/Anthropic က server-side တွင် အသုံးပြုပြီးသား resize cap နှင့် ကိုက်ညီသည်)။ ထို့ကြောင့် vision model မြင်ရသည့်အရာကို မပြောင်းလဲဘဲ upload bytes နှင့် latency ကို လျှော့ချနိုင်သည်။ Resizing အတွက် `sharp` ကို dynamic import ဖြင့် load ပြုလုပ်သည်။ Native binary load မအောင်မြင်သည့် platform တွင် `normalizeDataUri()` သည် **မည်သည့်အခါမျှ throw မပြုလုပ်ဘဲ** မူရင်း bytes ကို passthrough ပြန်လုပ်သည်။ ထို့ကြောင့် describe/base64-conversion path သည် အမြဲအလုပ်လုပ်နေမည်ဖြစ်သည်။ Non-image bytes (fetch ပြုလုပ်ပြီးနောက် decodable image မဟုတ်ကြောင်း သိရှိရသောအရာ) များကိုလည်း မပြောင်းလဲဘဲ passthrough ပြုလုပ်သည်။ ဤ normalization သည် bridge က ကိုယ်ပိုင် self-call အတွက် fetch ပြုလုပ်သော image များတွင်သာ သက်ရောက်ပြီး caller ၏ raw passthrough payload တွင် မည်သည့်အခါမျှ အသုံးမပြုပါ။ ၎င်းသည် opt-in-only mutation principle (Hard Rule #20) နှင့် ကိုက်ညီသည်။

#### Settings schema + migration

`modalityBridge*` keys အသစ်များကို `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`) တွင် Zod ဖြင့် အတည်ပြုထားသည်:
`modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, `modalityBridgeCache*` သုံးခုနှင့်
Audio Bridge က အသုံးပြုသည့် `modalityBridgeAudio*` အုပ်စုတို့ ဖြစ်သည်။
Migration `141_modality_bridge_settings.sql` သည် ရှိပြီးသား `visionBridge*`
တန်ဖိုးများကို ကိုက်ညီသည့် key အသစ်များသို့ ကူးယူပေးသည် (idempotent ဖြစ်ပြီး
operator က သတ်မှတ်ထားသော `modalityBridge*` တန်ဖိုးကို မည်သည့်အခါမျှ
အစားမထိုးပါ); release cycle တစ်ခုအတွင်း legacy key များကို read fallback
အဖြစ် ဆက်လက်လက်ခံထားသည်။

#### Transparency header + stats

Describe-transformed response များတွင်
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
ပါဝင်သည် (`modalityBridge/bridgeStats.ts` ရှိ `buildModalityBridgeHeader()`
က တည်ဆောက်ပြီး `src/sse/handlers/chatHelpers.ts` ရှိ
`withModalityBridgeHeader()` က ထည့်သွင်းသည်)။
Reroute လုပ်ထားသော request များတွင် header **လုံးဝမပါပါ** — payload ကို
မပြောင်းလဲထားဘဲ model swap သည် response body ရှိ `model` field တွင်
မြင်ရပြီးသား ဖြစ်သည်။

`GET /api/modality-bridge/stats` (management auth၊
`GET /api/settings` နှင့် တူညီသော tier) က `vision`, `audio` နှင့် `video`
တို့အတွက် memory အတွင်းရှိ modality တစ်ခုချင်းစီ၏ counter များကို
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` ပုံစံဖြင့် ပြန်ပေးသည်။
`averageLatencyMs` သည် attempts အားလုံးကို denominator အဖြစ် မသုံးဘဲ
`latencySamples` ကို အသုံးပြုသည်; timing မရှိသော operation အတွက်
သုညမီလီစက္ကန့် sample ကို ဖန်တီးသတ်မှတ်မထားပါ။ `bridged` သည်
အောင်မြင်သော conversion များအတွက် backward-compatible alias အဖြစ်
ဆက်ရှိနေပြီး၊ မအောင်မြင်သော attempt များက ၎င်းကို တိုးမပေးပါ။
Counter များသည် process restart ဖြစ်သည့်အခါ ဒီဇိုင်းအရ reset ဖြစ်သည်
(စာရင်းအင်းတွက်ချက်မှု မဟုတ်ဘဲ telemetry ဖြစ်သည်)။

#### Dashboard configuration

သီးခြား dashboard စာမျက်နှာမှာ
`/dashboard/settings/modality-bridge` ဖြစ်သည်။ URL ဖြင့် သတ်မှတ်နိုင်သော
`Vision`, `Audio` နှင့် `Video` tab များသည် `tab` တန်ဖိုးကို ပြောင်းသည့်အခါ
query parameter များကို ထိန်းသိမ်းထားသည်။ Vision tab တွင် enablement၊ mode၊
model ရွေးချယ်မှု (အလိုအလျောက် default အပါအဝင်)၊ task-aware prompting၊
အဆင့်မြင့် timeout/image/description-length/cache ကန့်သတ်ချက်များ၊ runtime
counter များနှင့် ကာကွယ်ထားသော sample request တို့ကို ဖော်ပြထားသည်။
Audio tab သည်လည်း အသုံးပြုနိုင်ပြီဖြစ်ပြီး enablement၊ Auto ပါဝင်သော
STT-only model picker၊ timeout/max-clip ကန့်သတ်ချက်များ၊ audio counter များနှင့်
`input_audio` sample test တို့ကို ဖော်ပြထားသည်။ Video tab သည် အပြည့်အဝ
အလုပ်လုပ်ပြီး FFmpeg/ffprobe runtime အခြေအနေကို အတိအလင်းသတ်မှတ်ထားသော
UI state လေးမျိုးအနက် တစ်မျိုးဖြင့် ပြသသည် (`unknown` သည် probe လုပ်ဆောင်နေစဉ်
သို့မဟုတ် ပြီးဆုံးအောင် မလုပ်နိုင်သည့်အချိန်၊ `restricted` သည် loopback မဟုတ်သော
dashboard host တွင် probe ကို client-side မှ skip လုပ်သည့်အချိန်၊ `unavailable`
သည် probe လုပ်ပြီး မရှိကြောင်း အတည်ပြုပြီးသည့်အချိန်၊ သို့မဟုတ် FFmpeg/ffprobe
version များနှင့်အတူ `available` ဖြစ်သည်) — enable/model/frame/video/timeout
ကန့်သတ်ချက်များကို သိမ်းဆည်းပေးပြီး၊ model picker ကို vision-capable model များ
အတွက်သာ စစ်ထုတ်ပေးကာ video counter များကို ဖော်ပြသည်။

AI settings အောက်ရှိ ယခင် Vision Bridge card သည် စာမျက်နှာအသစ်သို့
compatibility link တစ်ခုသာ ဖြစ်ပြီး form ၏ ဒုတိယမိတ္တူကို မပိုင်ဆိုင်တော့ပါ။
Media Providers သည်လည်း Image-to-Text နှင့် Speech-to-Text workflow များကို
သက်ဆိုင်ရာ Modality Bridge tab များသို့ ချိတ်ဆက်ပေးသည်၊ သို့သော် ရှိပြီးသား
Speech-to-Text playground ကို မဖယ်ရှားပါ။

**Self-loop admission bypass:** describe call သည် OmniRoute ၏ ကိုယ်ပိုင်
`/v1` self-loop (စံမဟုတ်သော provider model) မှတစ်ဆင့် route လုပ်သည့်အခါ
sub-request သည် `x-omniroute-admission-bypass: internal` ကို ပို့ပြီး
ဖြေရှင်းထားသော self-loop credential ဖြင့် authenticate လုပ်သည် — local mode
တွင် local `sk_omniroute` sentinel ကို အသုံးပြုပြီး၊ သို့မဟုတ် operator က
သတ်မှတ်ထားသော `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env key (#1350) ကို
အသုံးပြုသည်၊ ထို့ကြောင့် `REQUIRE_API_KEY=true` deployment များတွင်လည်း
describe call ကို ဆက်လက်လုပ်ဆောင်နိုင်သည်။ Bypass ကို ထိုတိကျသော credential
များအတွက်သာ ခွင့်ပြုထားသဖြင့် external client များက admission ကိုကျော်ရန်
header ကို အသုံးမပြုနိုင်ပါ။

Legacy default များသည် `src/shared/constants/visionBridgeDefaults.ts` တွင်
ရှိပြီး၊ mode/task-aware/cache default အသစ်များနှင့် settings resolver သည်
`src/shared/constants/modalityBridgeDefaults.ts` တွင် ရှိသည်။ Guardrail တွင်
`deps` constructor option ကို ဖော်ထုတ်ထားသဖြင့် test များက fake
`getSettings` နှင့် `callVisionModel` implementation များကို ထည့်သွင်းနိုင်သည်။

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Audio ပါဝင်သော chat request များကို audio input လက်ခံနိုင်ကြောင်း မသေချာသော
target သို့ မရောက်မီ ကြားဝင်ဖမ်းယူသည်။ Chat request ကို မည်သည့်အခါမျှ
reroute မလုပ်ပါ: audio part များကို ရှိပြီးသား OpenAI-compatible multipart
endpoint မှတစ်ဆင့် transcription ပြုလုပ်ပြီး၊ ရွေးချယ်ထားသော chat model သည်
text transcript များဖြင့် ဆက်လက်လုပ်ဆောင်သည်။

Flow:

1. `getResolvedModelCapabilities()` မှတစ်ဆင့် `supportsAudio` ကို ဖြေရှင်းပါ။ သတ်မှတ်ထားသော provider-registry metadata သည် အရင်ဦးစားပေးခံရပြီး၊ ထို့နောက် static model metadata၊ ထို့နောက် synced `modalities_input` ကို အသုံးပြုပါသည်။ သတ်မှတ်ထားသော input list တွင် `audio` မပါဝင်ပါက `false` ဖြစ်ပြီး၊ capability အထောက်အထားမရှိပါက `null` ဖြစ်ပါသည်။ `false` နှင့် `null` နှစ်မျိုးစလုံးသည် conservative bridge ကို အသက်သွင်းပြီး `true` ဖြစ်ပါက ၎င်းကို ကျော်သွားပါသည်။
2. `modalityBridgeAudio*` settings များကို ဖြေရှင်းပြီး shared `detectMediaParts()` detector မှတစ်ဆင့် message တိုင်းထဲရှိ splice ပြုလုပ်နိုင်သော top-level audio parts များကို ထုတ်ယူပါ။ ထောက်ပံ့ထားသော wire shape များမှာ OpenAI `input_audio`၊ `audio_url` နှင့် `source.media_type: "audio/*"` တို့ဖြစ်ပါသည်။ Routing အတွက် nested audio ကို ရှာဖွေနိုင်သော်လည်း splice path မှ ဖယ်ရှားမည်မဟုတ်ပါ။ လုပ်ဆောင်မှုကို `modalityBridgeAudioMaxClips` ဖြင့် ကန့်သတ်ထားပြီး နောက်ပိုင်း parts များကို မပြောင်းလဲထားပါ။
3. သတ်မှတ်ထားသော `provider/model` ကို အသုံးပြုပါ၊ သို့မဟုတ် `selectAudioBridgeModel()` က `AUDIO_TRANSCRIPTION_PROVIDERS` ကို တည်ငြိမ်သော catalog အစီအစဉ်အတိုင်း လှည့်လည်စစ်ဆေးပြီး အသုံးပြုနိုင်သော active provider credential ရှိသည့် ပထမဆုံး model ကို ရွေးချယ်စေပါ။
4. `callAudioTranscription()` သည် base64/data-URI audio ကို multipart `file` အဖြစ် ပြောင်းလဲပေးမည်၊ သို့မဟုတ် remote `audio_url` ကို DNS pinning နှင့် 25 MB ကန့်သတ်ချက်ပါသော public-only outbound guard မှတစ်ဆင့် download လုပ်မည်။ ထို့နောက် file နှင့် ရွေးချယ်ထားသော model ကို `resolveSelfLoopBearer()` ဖြင့် authentication ပြုလုပ်ထားသည့် local `/v1/audio/transcriptions` self-loop သို့ POST လုပ်မည်။ ရှိပြီးသား transcription route သည် ပုံမှန် credential lookup၊ cooldown/rate-limit ကိုင်တွယ်မှုနှင့် provider dispatch တို့ကို ဆောင်ရွက်ပါသည်။
5. အောင်မြင်သော call များသည် ၎င်းတို့၏ parts များကို `[Audio N]: <transcript>` ဖြင့် အစားထိုးပါသည်။ Call များကို `Promise.allSettled` ဖြင့် လုပ်ဆောင်သောကြောင့် တစ်ခုချင်းစီ၏ failure သည် မူရင်း audio part ကို ထိန်းသိမ်းထားပါသည် (#4012 contract)။ Call အားလုံးပျက်ကွက်ပြီး target တွင် `supportsAudio === false` ဖြစ်ကြောင်း သက်သေပြနိုင်ပါက parts များကို
   `[Audio N]: (unavailable — no STT provider connected)` ဖြင့် အစားထိုးပါသည် (#8430 contract)။ မသေချာသေးသော target (`null`) အတွက် call အားလုံးပျက်ကွက်ပါက မူရင်းအတိုင်း မပြောင်းလဲထားပါ။ သက်သေပြနိုင်သော text-only target တွင် အသုံးပြုနိုင်သည့် STT credential မရှိပါက network call မပြုလုပ်ဘဲ အလားတူ တိကျသော stub ကို ထည့်ပေးပါသည်။

အောင်မြင်သော transcript များသည် process-wide Modality Bridge LRU/TTL cache ကို အသုံးပြုပါသည်။ Key တွင် audio reference၊ တည်ငြိမ်သော `audio-transcription` operation label နှင့် ရွေးချယ်ထားသော STT model တို့ ပါဝင်ပါသည်။ Failure များကို မည်သည့်အခါမျှ cache မလုပ်ပါ။ Audio ကြိုးပမ်းမှုများသည် shared `bridged`၊ `cacheHits`၊ `failures` နှင့် `lastUsedAt` counters များကို update လုပ်ပါသည်။ ပြောင်းလဲထားသော response များတွင်
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` ပါဝင်ပြီး၊ မပြောင်းလဲထားသော request များတွင် Audio Bridge segment မပါဝင်ပါ။

Runtime settings များသည် DB-backed ဖြစ်ပြီး Zod ဖြင့် validate လုပ်ထားပါသည်။

| Key                           | Default | Range          |
| ----------------------------- | ------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —              |
| `modalityBridgeAudioModel`    | `""`    | Auto or STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10           |

Shared cache ကို `modalityBridgeCacheEnabled`၊
`modalityBridgeCacheTtlMinutes` နှင့် `modalityBridgeCacheMaxEntries` တို့ဖြင့် ဆက်လက်ထိန်းချုပ်ထားပါသည်။

### ဗီဒီယို Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Native video support မသိရှိရသေးသော target ကို ခေါ်ဆိုခြင်းမပြုမီ Chat Completions `messages` နှင့် Responses
API `input` တို့အတွင်းရှိ top-level video parts များကို ကြားဖြတ်ကိုင်တွယ်ပါသည်။
ထောက်ပံ့ထားသော shape များမှာ `input_video`၊ `video_url`၊ `video_source`၊ HTTPS URLs နှင့်
`data:video/*;base64,...` data URIs တို့ဖြစ်ပါသည်။ Text ထဲရှိ ရိုးရိုး filename များကို
video အဖြစ် မသတ်မှတ်ပါ။

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) သည် request traversal၊
capability/policy စစ်ဆေးမှု၊ request တစ်ခုချင်းစီအလိုက် aggregation နှင့် response payload တို့ကို
တာဝန်ယူပါသည်။ Video တစ်ခုချင်းစီအတွက် acquisition၊ whole-result cache၊ frame sequence ကို
ဖော်ပြခြင်း (caller က သတ်မှတ်ထားသော audio transcript ကို ပေါင်းစပ်ခြင်းအပါအဝင်) နှင့်
attempt တစ်ခုချင်းစီ၏ metrics/abort/cleanup တို့ကို `videoBridgePipeline.ts` ရှိ
`processVideoPart` နောက်ကွယ်တွင် ဖုံးကွယ်ထားပြီး `preCall` ၏ loop အတွင်း video part တစ်ခုစီအတွက်
တစ်ကြိမ်ခေါ်ဆိုပါသည်။ ထို module တွင် explicit port boundary များဖြစ်သော
`VideoMediaBrokerPort` (bytes ရယူခြင်းနှင့် sampled frames ထုတ်ယူခြင်း)၊
`VideoAudioTranscriptionPort` (caller က သတ်မှတ်ထားသော audio transcript ကို sampled captions
နှင့် ပေါင်းစပ်ခြင်း) နှင့် `VideoDrilldownPort` (legacy raw-store shape) တို့ကိုလည်း
သတ်မှတ်ထားပါသည်။ Production STT နှင့် frame retention တို့ကို describing port ပတ်လည်တွင်
`createVideoSttAdapter` နှင့် `createVideoDrilldownAdapter` တို့ဖြင့် ပေါင်းစပ်ထားပြီး၊
နောက်ဆုံးတစ်ခုသည် shared opaque-handle lifecycle ကို အသုံးပြုပါသည်။

Public `/v1` request path သည် subprocess တစ်ခုကို မည်သည့်အခါမျှ import သို့မဟုတ် invoke
မလုပ်ပါ။ Remote video များကို 50 MiB ကန့်သတ်ချက်အောက်တွင် download လုပ်ပြီး၊ inline base64
video များအတွက် decoded per-video cap ကို 36 MiB အထိ conservative ကန့်သတ်ထားပါသည်။ ထိုသို့
ပြုလုပ်ခြင်းဖြင့် model/messages/framing envelope သည် public JSON request admission limit
50 MiB အတွင်း ဆက်လက်ရှိနေနိုင်ပါသည်။ Allocation မပြုလုပ်မီ inline length နှင့် decoded-size
ခန့်မှန်းချက်များကို စစ်ဆေးပါသည်။ ကနဦး remote URL နှင့် redirect တိုင်းတွင် HTTPS လိုအပ်ပြီး၊
ရှိပြီးသား public-only outbound guard ကို DNS pinning နှင့်အတူ အသုံးပြုပါသည်။ ထို့နောက် bytes
များသည် အတိအကျ internal `POST /api/modality-bridge/video/extract` broker boundary ကို
ဖြတ်သန်းပါသည်။ ထို route သည် `LOCAL_ONLY` နှင့် `SPAWN_CAPABLE` နှစ်မျိုးစလုံးဖြစ်ပြီး၊
process တစ်ခုချင်းစီအလိုက် authentication ပြုလုပ်ထားသော trusted-loopback request ကိုသာ
လက်ခံပါသည်။ URL၊ filesystem path၊ executable သို့မဟုတ် argument list တစ်ခုမျှကို
လက်မခံပါ။ API body-size pipeline နှင့် handler ၏ incremental body reader တို့သည်
50 MiB broker input cap ကို သီးခြားစီ enforce လုပ်ပါသည်။ ၎င်း၏ bounded queue သည်
တစ်ကြိမ်လျှင် extraction တစ်ခုသာ လုပ်ဆောင်ပြီး pending job လေးခုကို ခွင့်ပြုကာ pending input
ကို 100 MiB အထိ ကန့်သတ်ထားပါသည်။

ဘရိုကာအတွင်းတွင် `ffprobe` သည် သီးသန့် local ဖိုင်ကို ဖတ်ရှုသည်။ ပုံသေ format
allowlist တွင် playlist နှင့် manifest format များ မပါဝင်ပါ။ ခွင့်ပြုထားသော MOV-family
container များအတွက် ပြင်ပ MOV data reference များကို ပုံသေအားဖြင့် ဆက်လက်ပိတ်ထားပြီး၊
ပုံသေ command သည် ၎င်းတို့ကို ဖွင့်ရန် opt in မလုပ်ပါ။ `ffprobe` နှင့် `ffmpeg` နှစ်ခုစလုံးသည်
`file`-only protocol whitelist၊ thread တစ်ခု၊ ပုံသေ argument array များ၊ shell မသုံးခြင်းနှင့်
`PATH` မှ executable များကို ဖြေရှင်းအသုံးပြုခြင်းတို့ကို အသုံးပြုသည်။ Attached-picture cover
stream များသည် ဖွင့်နိုင်သည့် candidate များ မဟုတ်ပါ။ ဖွင့်နိုင်သည့် stream အားလုံးသည်
သတ်မှတ်ထားသော ကန့်သတ်ချက်များကို ဖြည့်ဆည်းရမည်ဖြစ်ပြီး၊ တိကျစွာ သတ်မှတ်ထားသော default
stream ကို ဦးစားပေးကာ နောက်တွင် deterministic lowest-index fallback ကို အသုံးပြုသည်။ ဗီဒီယိုများကို
စက္ကန့် 600၊ dimension တစ်ခုလျှင် 8,192 pixels နှင့် source pixels 33,554,432 အထိ ကန့်သတ်ထားသည်။
FFmpeg သည် midpoint JPEG frame 1–16 ခုကို sample ပြုလုပ်ပြီး၊ သေးငယ်သော input များကို
upscale မလုပ်ဘဲ long edge ကို အများဆုံး 1,024 pixels အထိ လျှော့ချကာ URL ကို မည်သည့်အခါမျှ
လက်ခံရရှိခြင်း မရှိပါ။ Sampling သည် ပုံသေအားဖြင့် `uniform` ဖြစ်သည်။ ရွေးချယ်နိုင်သော
`scene_aware` နှင့် စမ်းသပ်ဆဲ `segment_aware` policy များသည် အတည်ပြုပြီးသား local stream
အပေါ်တွင် ပုံသေ FFmpeg pass တစ်ကြိမ် ထပ်မံလုပ်ဆောင်ကာ၊ ကန့်သတ်ထားသော `showinfo` scene
timestamp များကို ရွေးချယ်ပြီး detector အမှား၊ timeout၊ ပုံစံမမှန်သော output သို့မဟုတ် candidate
set အလွတ် ဖြစ်ပေါ်ပါက တူညီသော uniform midpoint များသို့ deterministic fallback ပြုလုပ်သည်။
Segment-aware mode သည် အတည်ပြုပြီးသား scene interval များအတိုင်း midpoint sample များကို
အချိုးကျ ခွဲဝေပေးသည်။ Segment-aware evidence နှင့် fallback အပြုအမူများကို အောက်တွင်
အသေးစိတ်ဖော်ပြထားသည်။ Hard 16-frame cap ကို policy တိုင်းတွင် ရွေးချယ်ပြီးနောက်
အသုံးချသည်။ Scene-aware request တွင် one-frame budget သာရှိပါက active full-video သို့မဟုတ်
focus window ၏ uniform midpoint ကို အသုံးပြုပြီး `policyEffective: uniform` ကို report
ပြုလုပ်သည်။ ရွေးချယ်ထားသော scene frame တစ်ခုတည်းဖြင့် အချိန်ပိုင်းအစွန်းနှစ်ဖက်စလုံးကို
ထိန်းသိမ်းနိုင်မည် မဟုတ်သောကြောင့် ဖြစ်သည်။ Caller သည် ရွေးချယ်နိုင်သည့် finite focus window
(`start`/`end` seconds) ကို ပေးနိုင်သည်။ Bounds များကို media duration အတွင်း clamp ပြုလုပ်ပြီး၊
ပြောင်းပြန်ဖြစ်နေသော သို့မဟုတ် non-finite window များကို ပယ်ချသည်။ Sampling policy အားလုံးကို
normalize ပြုလုပ်ထားသော interval အတွင်း၌သာ လုပ်ဆောင်သည်။ ရလဒ် window ကို sampling
metadata နှင့် untrusted description prefix နှစ်ခုစလုံးတွင် ထည့်သွင်းထားသောကြောင့်
downstream model များသည် focused excerpt နှင့် full timeline တို့ကို ခွဲခြားနိုင်သည်။

Semantic caption focus သည် သီးခြား၊ အတိအလင်း သတ်မှတ်ရသော setting ဖြစ်သည်။ ပုံသေ `full`
analysis mode သည် ရှိပြီးသား frame prompt ကို ထိန်းသိမ်းထားပြီး request text ကို caption model
ထံသို့ မည်သည့်အခါမျှ forward မလုပ်ပါ။ `focused` mode တွင် bridge သည် တူညီသော Chat သို့မဟုတ်
Responses container မှ နောက်ဆုံး non-empty user-authored `text`/`input_text` ကိုသာ ဖတ်ယူပြီး၊
၎င်းကို NFC သို့ normalize ပြုလုပ်ကာ control character နှင့် whitespace များကို စုစည်းပြီး
Unicode code point 500 အထိ ကန့်သတ်သည်။ ရလဒ်သည် အလွတ်ဖြစ်ပါက အတိအကျ `full` prompt သို့
fallback ပြုလုပ်သည်။ အသုံးပြုနိုင်သော hint ကို သီးခြား untrusted-user-context block
အတွင်း JSON အဖြစ် serialize ပြုလုပ်ပြီး မြင်နိုင်သည့် သို့မဟုတ် ကြားနိုင်သည့် media အတွင်းမှ
instruction များကို လိုက်နာရန် သီးခြားသတိပေးချက်ကို override မလုပ်နိုင်ဘဲ၊ လေ့လာတွေ့ရှိနိုင်သော
အသေးစိတ်အချက်များကိုသာ ဦးစားပေးနိုင်သည်။ Textual focus သည် `start`/`end` ကို မည်သည့်အခါမျှ
ခန့်မှန်းမထားသကဲ့သို့ temporal sampler ကိုလည်း မပြောင်းလဲပါ။

#### FU-07 structural segment evidence

`segment_aware` သည် အတည်ပြုပြီးသား local video stream အပေါ်တွင် bounded pre-analysis pass
တစ်ကြိမ် အသုံးပြုသည်။ ပုံသေ filter chain သည် ပထမဦးစွာ အကျယ် 320 pixels အထိ scale ပြုလုပ်ပြီး၊
scene change နှင့် frozen interval များကို detect လုပ်ကာ blur၊ average luma နှင့်
spatial/temporal information အတွက် တစ်စက္ကန့်လျှင် frame တစ်ခုနှုန်းဖြင့် sample ပြုလုပ်သည်။
ထို pass ကို structural sample 600 ခု၊ FFmpeg/filter thread တစ်ခု၊ တူညီသော `file`-only
protocol နှင့် container allowlist များ၊ process-output bound 1 MiB နှင့် broker ၏ shared
abort/deadline အတွင်း အများဆုံး စက္ကန့် 30 အထိသာ ကန့်သတ်ထားသည်။ Request ထံမှ command၊
filter၊ path သို့မဟုတ် URL ကို မည်သည့်အခါမျှ လက်မခံပါ။

Structural value များသည် semantic video understanding မဟုတ်ဘဲ deterministic sampling
evidence များသာ ဖြစ်သည်။ ၎င်းတို့သည် subject၊ action၊ caption၊ speech သို့မဟုတ် user intent
တို့ကို မခန့်မှန်းပါ။ Scene နှင့် freeze boundary များသည် segment များကို ဖွဲ့စည်းပြီး၊ freeze
coverage၊ blur၊ exposure၊ spatial detail နှင့် temporal change တို့သည် ရှိပြီးသား
1–16 frame budget ကို မည်သို့ခွဲဝေမည်ကိုသာ သက်ရောက်စေသည်။ အပြည့်အဝ frozen ဖြစ်သော segment
တစ်ခုကို frame တစ်ခုအထိသာ ကန့်သတ်ပြီး non-frozen segment များသည် ကျန်ရှိသော budget အတွက်
ယှဉ်ပြိုင်ကြသည်။ Boundary များသည် frame အရေအတွက်ထက် များပြားသောအခါ rapid early cut များက
ရှည်လျားသော trailing segment ကို ဖုံးကွယ်မသွားနိုင်စေရန် uniform timeline coverage ကို
ထိန်းသိမ်းထားသည်။ Freeze boundary ၏ 1-second analysis resolution အတွင်းရှိ scene boundary
များကို တစ်စုတစ်စည်းတည်း ပြုလုပ်သည်။

ပျောက်ဆုံးနေသော filter များ၊ ပုံစံမမှန်သော သို့မဟုတ် အလွတ် evidence၊ detector error သို့မဟုတ်
bounded pre-analysis timeout ဖြစ်ပေါ်ပါက အတိအကျ uniform midpoint policy သို့ fail open
ပြုလုပ်သည်။ Caller abort သို့မဟုတ် broker deadline ဖြစ်ပေါ်ပါက fail open မပြုလုပ်ပါ။ ၎င်းသည်
လုပ်ဆောင်နေဆဲ subprocess ကို ရပ်တန့်စေပြီး၊ နောက်ပိုင်း frame extraction ကို တားဆီးကာ
သီးသန့် temporary tree ကို `finally` အတွင်း ဖယ်ရှားသည်။

`scripts/perf/video-bridge-fu07-eval.ts` သည် post-dedup caption-call savings၊ dense-motion
budget allocation၊ blur/exposure/SI-TI evidence၊ rapid cuts with a long tail နှင့်
gradual-fade false positives တို့အတွက် deterministic real FFmpeg fixture များကို
ထုတ်လုပ်သည်။ ၎င်းသည် pre-analysis wall time ကို မှတ်တမ်းတင်ပြီး `/usr/bin/time` ရရှိပါက
child CPU နှင့် peak RSS ကိုလည်း မှတ်တမ်းတင်သည်။ ၎င်း၏ quality check များသည် structural
oracle များသာ ဖြစ်သည်။ ဤ harness တွင် ခွင့်ပြုထားသော endpoint သို့မဟုတ် frozen judge
မရှိသောကြောင့် အမှန်တကယ် caption-model quality သည် `HOLD` အဖြစ် ဆက်လက်ရှိသည်။
`--caption-cost-per-call-usd` က အတိအကျ အပြုသဘောဆောင်သော per-call estimate ကို ပေးမထားပါက
ငွေကြေးချွေတာမှုသည်လည်း `HOLD` အဖြစ် ဆက်လက်ရှိသည်။ Script သည် ရလဒ်နှစ်မျိုးစလုံးကို
မည်သည့်အခါမျှ ဖန်တီးဟန်ဆောင်မည် မဟုတ်ပါ။

ဘောင်တစ်ခုစီကို 4 MiB၊ raw ဘောင်အားလုံးကို စုပေါင်း 23 MiB နှင့်
serialized broker response ကို 32 MiB အထိသာ ကန့်သတ်ထားသည်။ Private temporary
directory ကို `finally` အတွင်း ဖျက်ပစ်သည်။ OmniRoute သည် FFmpeg ကို ထည့်သွင်း
ပေးမထားသလို custom executable path ကိုလည်း လက်မခံပါ။ Caption မပြုလုပ်မီ bridge
သည် အမြင်အာရုံအရ ထပ်နေမှုများကို ဖယ်ရှားသည့် conservative pass တစ်ခုကို
အသုံးပြုသည်။ JPEG တစ်ခုစီကို 16×16 grayscale buffer အဖြစ် လျှော့ချပြီး
နောက်ဆုံးထိန်းသိမ်းထားသော frame နှင့်သာ နှိုင်းယှဉ်သည်။ တောင်းဆိုထားသော caption
budget သည် frame တစ်ခုထက်ပိုပါက extraction သည် ထို budget ၏ နှစ်ဆအထိ၊ သို့သော်
frame 16 ခုထက် မပိုသော candidate pool ကို ပံ့ပိုးပေးသည်။ တောင်းဆိုထားသော cap ကို
deduplication ပြီးနောက်မှသာ အသုံးချပြီး budget သည် အနည်းဆုံး နှစ်ခုဖြစ်ပါက
နောက်ဆုံး thinning ပြုလုပ်ချိန်တွင် ပထမနှင့် နောက်ဆုံးရွေးချယ်ထားသော candidates
များကို ထိန်းသိမ်းထားသည်။ Version ပြောင်းလဲထားသော
`grayscale-16x16-mean-cells-v2` policy သည် mean luma delta နှင့် normalized
delta အနည်းဆုံး 0.05 ရှိသော thumbnail cells များ၏ အချိုးအစားတို့အနက် ပိုကြီးသော
တန်ဖိုးကို အသုံးပြုသည်။ Duplicate threshold သည် runtime setting အဖြစ်
ဖော်ထုတ်ထားခြင်းမဟုတ်ဘဲ ကြိုတင်ခန့်မှန်းနိုင်မှုအတွက် ရွေးချယ်ထားသော constant
0.04 ဖြစ်သည်။ ဤ secondary high-contrast signal သည် mean-only comparison ဖြင့်
ဖုံးကွယ်သွားနိုင်သော သေးငယ်သည့် လှုပ်ရှားမှုများနှင့် မြင်နိုင်သောစာသား
ပြောင်းလဲမှုများကို ထိန်းသိမ်းပေးသည်။ Comparator သို့မဟုတ် decoder အမှားများ
ဖြစ်ပါက fail open ပြုလုပ်ပြီး coverage ကို ဆက်လက်ထိန်းသိမ်းသည်။ Output metadata
သည် extracted candidates၊ အောင်မြင်စွာ အသုံးပြုထားသော frames နှင့် ဖယ်ရှားလိုက်သော
visual duplicates များကို သီးခြားခွဲခြားဖော်ပြသည်။

အထူးအမှတ်အသားပြုထားသော video part တစ်ခုသည် timestamp ပါဝင်သော contact sheet
ကို တောင်းဆိုနိုင်သည်။ Bridge သည် အများဆုံး column 4 ခုနှင့် frame 16 ခုပါသော
JPEG grid တစ်ခုကို တည်ဆောက်သည်။ 512-pixel cell တစ်ခုစီ၏ အောက်ခြေ high-contrast
band ထဲတွင် ၎င်း၏ မူရင်း timestamp ကို ထည့်သွင်းရေးသားပေးပြီး၊ downstream
association နှင့် audit အတွက် timestamp တူများကို textual metadata ထဲတွင်လည်း
ဆက်လက်ထားရှိသည်။ JPEG အပြည့်အစုံကို 32 MiB အထိသာ ကန့်သတ်ထားသည်။ `sharp` သည်
grid ကို decode သို့မဟုတ် compose မလုပ်နိုင်ပါက bridge သည် တစ်ခုချင်းစီသော JPEG
frames များသို့ fallback ပြုလုပ်သည်။ Client abort ဖြစ်ပါက sheet operation
တစ်လျှောက် ဆက်လက်ဖြန့်ချိသည်။

Promotion evidence ကို synthetic composition microbenchmark မှ ရည်ရွယ်ချက်ရှိရှိ
သီးခြားခွဲထားသည်။ `scripts/perf/video-bridge-contact-sheet-eval.ts` သည်
အမှန်တကယ် OpenAI-compatible vision models များအတွက် schema-versioned A/B
harness ကို သတ်မှတ်ပေးသည်။ ၎င်းသည် provider မှ report ပြုလုပ်သော tokens၊
sheet composition အပါအဝင် end-to-end wall latency၊ model-call အရေအတွက်နှင့်
manifest က သတ်မှတ်ထားသော fact retention တို့ကို တိုင်းတာသည်။ Raw model
responses များကို report ထဲတွင် မရေးသားဘဲ SHA-256 digests နှင့် ကိုက်ညီသော fact
IDs များကိုသာ ထိန်းသိမ်းသည်။ `--execute-real` ကို ဖြတ်သန်းပေးပြီး `--model`၊
`OMNIROUTE_BASE_URL` နှင့် `OMNIROUTE_API_KEY` တို့ကို configure လုပ်ထားမှသာ
harness သည် network သို့မဟုတ် အခကြေးငွေပေးရသော model call ကို ပြုလုပ်သည်။
ထို explicit real run မရှိပါက ၎င်း၏ machine-readable verdict သည် `HOLD` အဖြစ်
ဆက်လက်ရှိပြီး synthetic payload/call-count တိုင်းတာချက်များတင်ဖြင့်
promotion evidence မဖြစ်နိုင်ပါ။

သီးခြားဖြစ်သော `scripts/perf/video-bridge-promotion-eval.ts` သည် FU-07 သို့မဟုတ်
FU-09 observations များကို အသုံးပြုသည်။ Promotion admission အတွက် synthetic
scenario kinds ရှစ်မျိုးလုံးနှင့် sanitized real clip တစ်ခု၊ role နှင့် case
တစ်ခုစီအတွက် တိုင်းတာထားသော repetitions အနည်းဆုံး သုံးကြိမ်၊ ကြေညာထားသော
metrics ဆယ်မျိုးလုံး၊ frozen media/prompt/expected-fact/settings digests များ၊
ထူးခြားသော observation IDs များနှင့် အတည်ပြုပြီးသော seeded A/B order တို့
လိုအပ်သည်။ Execution receipt သည် corpus digest၊ အတိအကျ candidate SHA နှင့်
model revision တို့ကို ချိတ်ဆက်ထားသည်။ CPU 30 s ကျော်ခြင်း၊ peak RSS 512 MiB
ကျော်ခြင်း သို့မဟုတ် pre-analysis 30 s ကျော်ခြင်းအပါအဝင် ပျောက်ဆုံးနေသော သို့မဟုတ်
မမှန်ကန်သော measurements များသည် `HOLD` အဖြစ် ဆက်လက်ရှိသည်။ ဤအရာများသည်
evidence-admission caps များသာဖြစ်ပြီး runtime RSS enforcement အတွက် အာမခံချက်
အသစ်မဟုတ်ပါ။

FU-07 အတွက် quality retention အနည်းဆုံး 98% နှင့် p95 latency သည် baseline ၏
1.2x ထက် မပိုရန် လိုအပ်သည်။ ထို့အပြင် equivalent mean caption calls အောက်တွင်
case-balanced mean recall ကို absolute 0.05 တိုးတက်စေခြင်း သို့မဟုတ် mean
post-dedup caption calls ကို အနည်းဆုံး 10% လျှော့ချခြင်းတို့အနက် တစ်ခုလိုအပ်သည်။
FU-09 အတွက် quality အနည်းဆုံး 0.85၊ retention 95%၊ median latency 20%
လျှော့ချမှုနှင့် token 10% လျှော့ချမှုတို့ လိုအပ်သည်။ Critical-fact loss၊
injection compliance သို့မဟုတ် missing usage ဖြစ်ပါက promotion မပြုနိုင်ပါ။
Execution တစ်ကြိမ်တည်းဖြင့် မည်သည့်အရာကိုမျှ promote မလုပ်နိုင်ပါ။
`--previous-report` သည် policy/model revision/candidate/corpus တူညီပြီး
အရည်အချင်းပြည့်မီသော execution နှစ်ကြိမ်သည် သီးခြားဖြစ်ကာ အပြန်အလှန်
မထပ်နေဘဲ ဆက်တိုက်ရှိကြောင်း အတည်ပြုသည်။ Sampling experiment တစ်ခုက
contact-sheet experiment တစ်ခုကို အတည်မပြုနိုင်ပါ။

Collectors များသည် responses များကို memory အတွင်း score ပြုလုပ်ပြီး
`responseDigest` နှင့် metrics၊ observation bindings များကိုသာ သိမ်းဆည်းသင့်ကာ
response text ကို မသိမ်းဆည်းသင့်ပါ။ Consumer သည် legacy raw observations များကို
ဖတ်ရှုနိုင်သော်လည်း ထို text ကို ၎င်း၏ reports များထဲသို့ မည်သည့်အခါမျှ
ကူးယူမထားပါ။ Observation တစ်ခုစီအတွက် `responseDigest` သို့မဟုတ်
`rawResponseText` တို့အနက် တစ်ခုတည်းကိုသာ လက်ခံသည်။ Versioned allowlist သည်
immutable `hold` default ဖြင့် အလွတ်အဖြစ် ဆက်လက်ရှိသည်။ Eligible entry တစ်ခုတွင်
၎င်း၏ evidence reference၊ policy၊ model revision၊ အတိအကျ candidate SHA၊
manifest digest နှင့် run IDs နှစ်ခု ပါဝင်ရမည်။ Context မကိုက်ညီမှုများကို
ပယ်ချသည်။ ဤ metadata များသည် audit contract ဖြစ်ပြီး ရည်ညွှန်းထားသော file
တစ်ခုတွင် အမှန်တကယ် measurements များ ပါဝင်ကြောင်း သက်သေမပြပါ။ Entry တစ်ခုခု
မထည့်သွင်းမီ အမှန်တကယ် receipts များကို စစ်ဆေးပါ။ Management stats endpoint နှင့်
Video dashboard တို့သည် conservative readiness ကို ဖော်ပြပေးသည်။ Configured
model alias တစ်ခုတည်းဖြင့် ၎င်း၏ revision သို့မဟုတ် လက်ရှိလုပ်ဆောင်နေသော
candidate SHA ကို သတ်မှတ်မပေးနိုင်သဖြင့် လက်ရှိ dashboard သည် အခြား execution
context တစ်ခုမှ eligibility ကို ပြန်လည်အသုံးမပြုဘဲ `HOLD` ဟု report ပြုလုပ်သည်။
Explicit experimental selection သည် promotion နှင့် သီးခြားဖြစ်ပြီး default ကို
အလိုအလျောက် ပြောင်းလဲမထားပါ။

ခေါ်ဆိုသူများသည် ကိုက်ညီအောင် ချိန်ညှိထားသော စာသားကို ရရှိထားပြီးဖြစ်ပါက ပံ့ပိုးထားသော ဗီဒီယို
အစိတ်အပိုင်းတစ်ခုတွင် ရွေးချယ်နိုင်သော `transcript.cues` array ကို ပူးတွဲနိုင်သည်။ Cue တစ်ခုစီတွင် `text`၊
စစ်ဆေးထားသော ကြာချိန်အတွင်း ပါဝင်သည့် finite `start`/`end` ကြားကာလနှင့် ခွင့်ပြုထားသော
`source` (`client`၊ `embedded` သို့မဟုတ် `audio-bridge`) တစ်ခု ပါဝင်ရမည်။ `confidence` ၏ ပုံသေတန်ဖိုးမှာ
`1` ဖြစ်ပြီး `0` နှင့် `1` ကြားတွင် ရှိရမည်။ အတိအကျတူညီသော cue များကို တစ်ခုတည်းအဖြစ် ပေါင်းစည်းသည်။
OmniRoute သည် ဤ metadata မှ transcription ကို မည်သည့်အခါမျှ စတင်မလုပ်ပါ။ အတည်ပြုပြီးသော cue များကို
ဖော်ပြထားသော ရလဒ်ထဲသို့ source၊ confidence နှင့် interval တို့နှင့်အတူ ကူးထည့်ပြီး frame caption များနှင့်
အတူ ယုံကြည်စိတ်ချမရသော observation များအဖြစ် ဖော်ပြသည်။ မမှန်ကန်သော၊ အကန့်အသတ်ကျော်လွန်သော သို့မဟုတ်
မူလရင်းမြစ်အထောက်အထားမရှိသော စာသားကို caption stream ထဲသို့ ရောနှောမည့်အစား ပယ်ချသည်။ Request body ထဲရှိ
transcript channel နှစ်ခုလုံးသည် ပေးထားသော provenance ကို `client` အဖြစ် normalize လုပ်သည်။ မိမိကိုယ်တိုင်
သတ်မှတ်ထားသော `embedded` သို့မဟုတ် `audio-bridge` label များပင် ပါဝင်သည်။ Server က ပိုင်ဆိုင်သော adapter
တစ်ခုတည်းသာ code-only `trustedSource` argument မှတစ်ဆင့် ယုံကြည်ရသော label များကို သတ်မှတ်နိုင်သည်။
Request JSON field တစ်ခုက ထို argument ထံ ရောက်ရှိနိုင်ခြင်းမရှိပါ။ Transcript စာသားသည် provenance မည်သို့ပင်
ဖြစ်စေ မယုံကြည်ရသော media-derived content အဖြစ် ဆက်လက်ရှိနေပြီး authorization ကို မည်သည့်အခါမျှ
ဆုံးဖြတ်စေခြင်း မပြုရ။

အဆင့်မြင့်ခေါ်ဆိုသူတစ်ဦးသည် ထိုဗီဒီယိုအတွက် `audioTranscript` track ကိုလည်း ပေးနိုင်သည်။ ၎င်းကို
client က ပေးသော စာသားအဖြစ်သာ သတ်မှတ်ပြီး server transcription ပြုလုပ်ထားကြောင်း သက်သေအဖြစ် မသတ်မှတ်ပါ။
Fusion seam သည် visual နှင့် audio observation များကို deadline နှင့် abort signal တစ်ခုတည်းအောက်တွင်
လုပ်ဆောင်ကာ ဘုံ timeline ပေါ်တွင် အစီအစဉ်ချသည်၊ အတိအကျတူညီသော duplicate များကို ပေါင်းစည်းသည်၊
တစ်ဖက်တည်း အောင်မြင်သောအခါ partial result ကို တင်ပြသည်။ မမှန်ကန်သော `audioTranscript` သည် ဗီဒီယိုတစ်ခုလုံး
ပျက်ကွက်စေမည့်အစား partial result သို့ ကျဆင်းသွားသည် — visual description ကို ထိန်းသိမ်းထားပြီး audio
branch တွင် သန့်စင်ထားသော failure code ကို မှတ်တမ်းတင်သည်။ Branch တစ်ခုစီ၏ ရရှိနိုင်မှု၊ partial flag နှင့်
သန့်စင်ထားသော failure code များကို ဖော်ပြထားသော result၊ guardrail metadata
(`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`)၊ result-cache metadata နှင့် bridge
fusion counter များတွင် ထိန်းသိမ်းထားသည်။ မူလ Video Bridge လမ်းကြောင်းသည် speech-to-text ကို ခေါ်ယူခြင်း
သို့မဟုတ် media copy ဒုတိယ份ကို download လုပ်ခြင်း မပြုပါ။ ထို explicit track မရှိပါက video-only အဖြစ်
ဆက်လက်ရှိနေသည်။

**Transcript retention (#12150)။** Video Bridge (ကိုယ်တိုင် opt-in ပြုလုပ်ထားရသော) က transcript cue တစ်ခုကို
ဖော်ပြသည့်အခါတိုင်း ဤအချက်သည် အလိုအလျောက် သက်ရောက်သည် — သီးခြား retention flag မရှိပါ။ Request တစ်ခုက
transcript cue တစ်ခုခု (`transcript` သို့မဟုတ် fused `audioTranscript`) ကို ဖော်ပြသောအခါ guardrail သည်
၎င်းကို `videoBridgeObserved` ဟု မှတ်သားပြီး ဗီဒီယိုဖော်ပြချက်၏ redacted shadow တစ်ခုကို ထုတ်လုပ်သည် —
cue တစ်ခုစီ၏ free-text body ကို `[redacted-video-transcript]` ဖြင့် အစားထိုးထားသော တူညီသည့် rendering
တစ်ခုဖြစ်သည်။ ၎င်းကို flattened text ကို parse လုပ်ခြင်းဖြင့် မဟုတ်ဘဲ string မတည်ဆောက်မီ structured cue
field ကို အစားထိုးခြင်းဖြင့် တည်ဆောက်သည်။ ထို့ကြောင့် `]` ပါဝင်သော body များဖြစ်သည့်
`[inaudible]`/`[music]` အပါအဝင် adversarial သို့မဟုတ် သာမန် cue content မည်သည့်အရာမျှ ကျန်ရှိမနေနိုင်ပါ။
သိမ်းဆည်းထားသော call-log request body သည် video-derived text part တစ်ခုစီကို ထို redacted shadow ဖြင့်
အစားထိုးပြီး content equality ဖြင့် ကိုက်ညီစေသည်။ `fullText` anchor ကို call မပြုမီ ပြီးစီးထားသော guardrail
payload မှ ပြန်လည်ဖတ်ယူသဖြင့် နောက်ပိုင်း chain guardrail များ (priority 10/95 ရှိသော PII နှင့် credential
masker များ) က description text ကို နေရာတစ်ခုတည်းတွင် ပြန်လည်ရေးသားပြီးနောက်နှင့်
system-prompt/handoff/memory injection က message array ကို ပြန်လည်ဖွဲ့စည်းပြီးနောက်တွင်ပင် match သည်
အောင်မြင်နေဆဲဖြစ်သည်။ Upstream model ထံ ပေးပို့သော body သည် မပြောင်းလဲပါ။ Observed request တစ်ခုသည်
durable Memory ကို မည်သည့်အရာမျှ ထပ်မံဖြည့်စွက်ခြင်းမရှိပါ (request- နှင့် response-derived extraction နှစ်ခုလုံး
ကျော်သွားသည်)။ ထို့ကြောင့် model ၏ ကိုယ်ပိုင် reply သည် transcript စာသားကို Memory ထဲသို့ ပြန်လည်ထည့်သွင်း
မနိုင်ပါ။

**Raw video fields (#12430)။** Bridge ကို ဖွင့်ထားပြီး native video support သည် မသိရှိရသေးခြင်း သို့မဟုတ်
မရှိခြင်းဖြစ်ပါက သတ်မှတ်ထားသော `transcript`/`audioTranscript` field များသည် description မအောင်မြင်ပြီးနောက်
သို့မဟုတ် `maxVideos` ကန့်သတ်ချက် ရောက်ရှိပြီးနောက်တွင်ပင် `videoBridgeObserved` ကို activate လုပ်သည်။
`null` နှင့် empty string များကိုလည်း ထည့်သွင်းတွက်ချက်သည်။ မရှိသော field များနှင့် video မဟုတ်သော metadata
များကို မထည့်သွင်းတွက်ချက်ပါ။ သိမ်းဆည်းထားသော copy များသည် ထို field များကို redact လုပ်ခြင်း သို့မဟုတ်
request ကို ချန်လှပ်ခြင်းပြုလုပ်ပြီး caches/Memory ကို ကျော်သွားသည်။

ထို fallback လမ်းကြောင်းများတွင် မှန်ကန်သော caller cue များသည် စံမဟုတ်သော provider field များအဖြစ်မဟုတ်ဘဲ
ပံ့ပိုးထားသော `text`/`input_text` part များ ဖြစ်လာသည်။ Request မှ ပေးထားသော track နှစ်ခုလုံးသည်
မယုံကြည်ရသော `client` observation များအဖြစ် ဆက်လက်ရှိနေပြီး ဗီဒီယိုကို ဖော်ပြမထားကြောင်းနှင့် timestamp
များကို media နှင့် ကိုက်ညီကြောင်း အတည်မပြုထားကြောင်း ရှင်းလင်းသော warning တစ်ခု ပါဝင်သည်။ ရှိပြီးသား
256-cue/64-KiB စုစုပေါင်းနှင့် cue တစ်ခုချင်းစီဆိုင်ရာ budget များသည် track နှစ်ခုလုံးအပေါ် ပေါင်းစပ်
သက်ရောက်သည်။ Timestamp များသည် broker ၏ 600-second ceiling နှင့် ပေးထားသည့် focus window အတွင်း
ကိုက်ညီရမည်။ မမှန်ကန်သော track များကို arbitrary text အဖြစ် forward မလုပ်ဘဲ ပယ်ဖျက်သည်။ ၎င်းတို့၏
ပေါင်းစပ် budget မကျော်လွန်သရွေ့ မှန်ကန်သော sibling တစ်ခုကို အသုံးပြုနိုင်သည်။ Null/empty field များသည်
စာသားမထည့်ပါ။ ဤ fallback ကြောင့် media fetch သို့မဟုတ် transcription မည်သည့်အရာမျှ ထပ်မံမဖြစ်ပေါ်ပါ။
Transcript extension field များကို fallback video carrier နှင့် ၎င်း၏ `video_url`/`source` object များမှ
ဖယ်ရှားသည်။ OpenAI wire allowlist သည် တင်းကျပ်စွာ ဆက်လက်ရှိနေပြီး unknown-native video carrier များကို
ဆက်လက်အသုံးပြုနိုင်သကဲ့သို့ သိရှိထားသော text-only target များသည် လုံခြုံသော marker များကို ထိန်းသိမ်းထားသည်။
ဖွဲ့စည်းပုံအခြေပြု redaction shadow များသည် ထည့်သွင်းထားသော transcript စာသားကို ကာကွယ်ပေးပြီး မူလ
caller ပိုင် request ကို မပြောင်းလဲစေပါ။ Native-supported target များနှင့် disabled bridge များသည် ၎င်းတို့၏
လက်ရှိ bypass အပြုအမူကို ဆက်လက်ထိန်းသိမ်းထားသည်။

ထပ်မံသိမ်းဆည်းထားသော copy များသည် observed-request signal တစ်ခုတည်းကို အသုံးပြုသည်။ Guardrail မတိုင်မီ
raw client-request snapshot၊ memory အတွင်းရှိ pending request နှင့် အစောပိုင်းပယ်ချခံရသော request log တို့သည်
video part များထဲရှိ transcript field များကို ဖွဲ့စည်းပုံအရ အစားထိုးသည်။ Pipeline stage များနှင့် context
handoff က ဖန်တီးသော string prompt များကို persisted-request-body sink တွင် redact လုပ်သည်။
သိမ်းဆည်းထားသော `video_content_removed` marker သည် ရည်ရွယ်ချက်ရှိရှိ ဖယ်ရှားထားသော စာသားကို
ပြန်လည်တည်ဆောက်မည့်အစား `previous_response_id` continuation ကို fail closed ဖြစ်စေသည်။ Observed request
တစ်ခုသည် logging မပြုမီ ၎င်း၏ per-part redaction shadow ကို ပျောက်ဆုံးသွားပါက သို့မဟုတ် နောက်ပိုင်း request
mutation များအပြီးတွင် video shadow အများအပြားထဲမှ တစ်ခုတည်းပင် match မဖြစ်ပါက transcript ကို တစ်စိတ်တစ်ပိုင်း
redact လုပ်ထားသည့် request body ကို သိမ်းဆည်းမည့်အစား request body တစ်ခုလုံးကို ချန်လှပ်သည်။

စောင့်ကြည့်ထားသော request တစ်ခုအတွက် model response သည် ဖွဲ့စည်းပုံပါ cue boundary မရှိဘဲ transcript ၏ မည်သည့်အပိုင်းကိုမဆို ကိုးကားနိုင်သည်။ ထို့ကြောင့် ၎င်း၏ သိမ်းဆည်းထားသော call-log `responseBody` ကို omission marker ဖြင့် အစားထိုးထားပြီး၊ upstream/client bodies နှင့် stream chunks များ ပါဝင်နိုင်သည့် အသေးစိတ် pipeline artifact ကို မသိမ်းဆည်းထားပါ။ ထို request အတွက် semantic၊ idempotency နှင့် reasoning-replay cache များသည် read နှင့် write နှစ်မျိုးလုံးကို ကျော်သွားသည်။ Provider request နှင့် client မြင်ရသော response တို့မှာ မပြောင်းလဲပါ။ အသေးစိတ် artifact ကို ဖယ်ရှားသည့်အခါ အစောပိုင်း keepalive bytes များကို ယာယီ buffer မှ drain လုပ်သည်။ Kiro ၏ ပုံစံမမှန်သော EventStream warning သည် payload byte အရေအတွက်ကိုသာ ဖော်ပြပြီး၊ ၎င်း၏အကြောင်းအရာ သို့မဟုတ် JSON parser ၏ raw error ကို မည်သည့်အခါမျှ မဖော်ပြပါ။
၎င်းသည် ဆက်စပ်မှုမရှိသော provider/plugin diagnostic အားလုံးကို စစ်ဆေးပြီးပြီဟု မဆိုလိုပါ။ ပိုမိုကျယ်ပြန့်သော retained-sink sweep ကို #11658 တွင် ခြေရာခံထားသည်။

အတွင်းပိုင်း `/api/modality-bridge/video/drilldown` lifecycle သည် သီးခြားဖြစ်သော loopback/token-authenticated cache substrate တစ်ခုဖြစ်သည်။ Operation တစ်ခုစီတွင် canonical opaque principal ID တစ်ခုလည်း လိုအပ်သည်။ Production caller ကို enable မလုပ်မီ၊ authenticated tenant ထံမှ ထို ID ကို derive လုပ်ရမည်ဖြစ်ပြီး client က ရွေးချယ်ပေးသော value ကို မည်သည့်အခါမျှ forward မလုပ်ရပါ။ Cache key များသည် ထို principal ကို canonical session နှင့် video-reference ID များနှင့် ချိတ်ဆက်ထားပြီး၊ ၎င်းတို့၏ SHA-256-derived key များကိုသာ သိမ်းဆည်းသည်။ Read နှင့် deletion နှစ်မျိုးလုံးကိုလည်း ထို principal တစ်ခုတည်းအတွက်သာ scope လုပ်ထားသည်။ Cache သည် entry တစ်ခုလျှင် derived JPEG frame အများဆုံး 16 ခုကိုသာ သိမ်းဆည်းပြီး၊ ဆယ်မိနစ်အကြာတွင် expire လုပ်ကာ bounded `start`/`end` read သို့မဟုတ် explicit session deletion ကို ပံ့ပိုးသည်။

Principal တစ်ခုစီကို entry 16 ခုနှင့် canonical JPEG data 64 MiB အထိသာ ခွင့်ပြုသည်။ ထို limit များသည် global 64-entry/256 MiB ceiling နှင့် သီးခြားဖြစ်သည်။ Principal quota ဖိအားရှိလာပါက global LRU eviction ကို မစဉ်းစားမီ ထို principal ၏ least-recently-used entry များကိုသာ ဖယ်ရှားသည်။ Cache activity ဖြစ်တိုင်း principal နှင့် global accounting နှစ်ခုစလုံးမှ expired entry များကို sweep လုပ်သည်။ ထို့အပြင် cancellation နှင့် validation failure တို့သည် partial replacement ကို commit မလုပ်စေပါ။

Cache သည် canonical မဟုတ်သော Base64၊ padding ပိုလျှံမှု၊ JPEG မဟုတ်သော media၊ ပုံစံမမှန်သော သို့မဟုတ် မပြည့်စုံသော JPEG များနှင့် bounded full-image `sharp` decode ပြုလုပ်စဉ် warning ထွက်ပေါ်သော JPEG များကို ငြင်းပယ်သည်။ လက်ခံထားသော image တစ်ခုစီကို canonical JPEG အဖြစ် ပြန်လည် encode လုပ်ပြီး၊ caller fields ကို ယုံကြည်မည့်အစား decoded bytes မှ width နှင့် height ကို derive လုပ်သည်။ ထို့အပြင် trailing polyglot bytes များကို သိမ်းဆည်းမည့်အစား ဖယ်ရှားသည်။ Bounded canonical compressed buffer ကိုသာ quota နှစ်မျိုးစလုံးတွင် ထည့်သွင်းတွက်ချက်သည်။ JSON wire limit တွင် 32 MiB decoded-input ceiling အတွက် Base64 overhead ပါဝင်သည်။ သိမ်းဆည်းထားသော derivation တစ်ခုစီတွင် validated JPEG format/resolution၊ sampling policy၊ derivation version၊ creation time၊ server-computed content hash နှင့် hashed parent reference တို့အပြင် trusted caller ၏ parent-content hash ကို မှတ်တမ်းတင်ထားသည်။ Atomic cache commit မပြုလုပ်မီ asynchronous decode/hash phase များအကြားတွင် cancellation ကို စစ်ဆေးသည်။

Production producer သည် အောင်မြင်သော visual analysis ပြီးနောက်မှသာ ရှိပြီးသား derived broker frame များကို ပြန်လည်အသုံးပြုပြီး၊ video ကို ဒုတိယအကြိမ် download/extraction မလုပ်ပါ။ ၎င်းတွင် operator `modalityBridgeVideoDrilldownEnabled=true`၊ strict per-part `drilldown: true` နှင့် authenticated API-key record ID တို့ လိုအပ်သည်။ Client က ကြေညာထားသော principal/session value များသည် ownership ကို မသတ်မှတ်နိုင်ပါ။ အခြေအနေသုံးရပ်လုံး မပြည့်စုံပါက ထပ်ဆောင်း frame များကို hash လုပ်ခြင်း၊ resize လုပ်ခြင်း သို့မဟုတ် သိမ်းဆည်းခြင်း မပြုပါ။ Retention failure ဖြစ်ပါက အသုံးပြုနိုင်သော visual response ကို ဆက်လက်ထိန်းသိမ်းပေးသည်။ သဘောတူညီထားသော request များသည် whole-video result cache ကို ကျော်သွားသောကြောင့် cached result များက handle များကို ပြန်လည်မပေးနိုင်ပါ။

အောင်မြင်သော JSON နှင့် SSE response များသည် bounded `x-omniroute-video-drilldown` header ထဲတွင် opaque handle အများဆုံး လေးခုအထိ ဖော်ပြသည်။ ခွင့်ပြုထားသော browser origin များသည် CORS origin policy ကို ပိုမိုကျယ်ပြန့်စေခြင်းမရှိဘဲ ထို header ကို ဖတ်ရှုနိုင်သည်။ Handle အသစ်များသည် `v1.<32-byte random base64url token>` ပုံစံကို အသုံးပြုပြီး registry သည် ၎င်းတို့၏ SHA-256 hash များကိုသာ သိမ်းဆည်းသည်။ Reader/header parser သည် legacy 64-hex token များကိုလည်း လက်ခံသည်။ Authenticated public consumer သည်
`GET /api/v1/video-bridge/drilldown?handle=...` ဖြစ်ပြီး၊ `modalityBridgeVideoDrilldownRemoteEnabled=true` ဖြင့် သီးခြား gate လုပ်ထားသည်။ Persisted false ကို အတိအလင်း သတ်မှတ်ထားပါက legacy `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env fallback ကို enable လုပ်ထားသော်လည်း access ကို revoke လုပ်သည်။ Production retention တွင်လည်း အလားတူ legacy `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` fallback ရှိသည်။ Fallback နှစ်ခုစလုံး၏ default သည် off ဖြစ်သည်။

Consumer သည် authenticated key ထံမှ ownership ကို derive လုပ်ပြီး key policy ကို အသုံးချသည်။ GET နှင့် DELETE နှစ်မျိုးစလုံးသည် `/v1` နှင့် `/api/v1` alias များအပါအဝင် `video` endpoint category တွင် ပါဝင်သည်။ Endpoint allowlist သည် အလွတ်မဟုတ်သော key များတွင် `video` ပါဝင်ရမည်။ ကန့်သတ်မထားသော key များသည် ယခင်အတိုင်း compatible ဖြစ်သည်။ Consumer သည် မသိသော၊ expire ဖြစ်ပြီးသော၊ သို့မဟုတ် အခြား key တစ်ခု၏ handle များအတွက် 404 တစ်မျိုးတည်းကို ပြန်ပေးသည်။ ၎င်းသည် `variant=preview|standard|detail` (အမြင့်ဆုံး JPEG dimension 320/640/1280၊ upscaled လုံးဝမလုပ်ပါ)၊ `limit=1..8` (သို့မဟုတ် legacy `frames` alias၊ နှစ်ခုလုံးကို တစ်ပြိုင်နက် မသုံးရ)၊ zero-based `page` နှင့် optional `start`/`end` focus seconds တို့ကို လက်ခံသည်။ ထပ်တူ query key များနှင့် ပြောင်းပြန်ဖြစ်နေသော focus window များကို ငြင်းပယ်သည်။ ပြန်ပေးသည့် variant တစ်ခုစီတွင် ၎င်း၏ အမှန်တကယ် content ၏ hash နှင့် အမှန်တကယ် resolution metadata ပါဝင်ပြီး retained source နှင့် ချိတ်ဆက်ထားသည်။ Variant များကို ထပ်ဆောင်း retained copy အဖြစ် သိမ်းဆည်းမည့်အစား read ပြုလုပ်ချိန်တွင် derive လုပ်သည်။ Base64/envelope အပါအဝင် JSON response ကို 32 MiB အထိသာ ကန့်သတ်ထားသည်။ အရွယ်အစားကျော်လွန်သော page သည် 413 ပြန်ပေးပြီး client သည် frame အနည်းငယ်သာ ထပ်မံတောင်းဆိုရမည်။ Read တစ်ခုစီသည် resize ပြုလုပ်စဉ် cancellation ကို စစ်ဆေးပြီး၊ ပြန်မပေးမီ handle validity ကို ထပ်မံစစ်ဆေးသည်။ Owner က ပြုလုပ်သော `DELETE` သည် idempotent ဖြစ်သည်။ Deletion သို့မဟုတ် TTL expiry ဖြစ်ပါက retained source နှင့် usage accounting တို့ကို လွှတ်ပေးသည်။

Shared store သည် process-local ဖြစ်သောကြောင့် restart ပြုလုပ်ပြီးနောက် handle များ expire ဖြစ်ပြီး သီးခြား OmniRoute process များအကြား လွှဲပြောင်းအသုံးပြု၍ မရပါ။ Management stats များသည် effective retention/remote policy နှင့် စုစုပေါင်း retained entries/bytes များကိုသာ ဖော်ပြပြီး media၊ references၊ principal ID သို့မဟုတ် handle များကို မည်သည့်အခါမျှ မဖော်ပြပါ။ Video settings panel သည် ထို value များကို ပြသပြီး consent switch နှစ်ခုစလုံးကို persist လုပ်နိုင်သည်။ ဤ implementation documentation သည် live deployment သို့မဟုတ် promotion evidence မဟုတ်ပါ။ Real-model acceptance ကို သီးခြားခြေရာခံထားသည်။

ဖရိမ်များကို သတ်မှတ်ထားသော Video မော်ဒယ်ဖြင့် အစဉ်လိုက် caption ပြုလုပ်သည်။ Video override သည် ဗလာဖြစ်ပါက Vision setting ကို အမွေဆက်ခံသည်။ နှစ်ခုစလုံး ဗလာဖြစ်ပါက Vision auto-router သည် အမှန်တကယ် အသုံးပြုမည့် vision-capable မော်ဒယ်ကို ရွေးချယ်သည်။ အောင်မြင်စွာ caption ပြုလုပ်ပြီးသောအခါ မူရင်း part ကို တည်ငြိမ်သော `[Video description:` prefix ဖြင့် အစားထိုးသည်။ ထို prefix သည် စာသားကို ယုံကြည်၍မရသော media မှ ဆင်းသက်လာသည့် observation အဖြစ်လည်း သတ်မှတ်ပေးပြီး media အတွင်းတွေ့ရသော ညွှန်ကြားချက်များကို downstream မော်ဒယ်များက မလိုက်နာရန် အသိပေးသည်။ Frame-caption cache key များတွင် JPEG bytes၊ prompt၊ timestamp နှင့် အမှန်တကယ်အသုံးပြုသော မော်ဒယ်တို့ ပါဝင်သည်။ အောင်မြင်သော caption များကိုသာ cache ပြုလုပ်သည်။ Cache entry များတွင် fallback မော်ဒယ်အပါအဝင် အမှန်တကယ် အောင်မြင်စွာ ထုတ်လုပ်ပေးခဲ့သည့် မော်ဒယ်ကို ထိန်းသိမ်းထားသည်။ မတူညီသော frame များကို မတူညီသော မော်ဒယ်များက ထုတ်လုပ်ထားပါက bridge သည် `mixed` ကို ပြန်လည်ပေးသည်။ Cache hit ဖြစ်သောအခါ ထုတ်လုပ်ပေးခဲ့သည့် မော်ဒယ်အချက်အလက်ကို ပြန်လည်အသုံးပြုပြီး တောင်းဆိုထားသော routing plan အဖြစ် ပြန်လည်သတ်မှတ်မည်မဟုတ်ပါ။ ဗီဒီယိုတစ်ခုလုံး၏ result cache key သည် output ကို ပြောင်းလဲစေနိုင်သည့် input အားလုံး—prompt၊ အမှန်တကယ်အသုံးပြုသော မော်ဒယ်၊ sampling policy၊ frame အရေအတွက်၊ semantic analysis mode၊ normalized focus hint ၏ SHA-256 fingerprint၊ focus window၊ `transcript`၊ `audioTranscript` နှင့် contact-sheet flag—အပေါ် အခြေခံထားသည်။ ထို့ကြောင့် ထိုအချက်များထဲမှ တစ်ခုခု ပြောင်းလဲပါက cache miss ဖြစ်ပြီး stale result ကို ပြန်လည်အသုံးပြုမည်မဟုတ်ပါ။ Visual dedup policy version၊ threshold နှင့် ကန့်သတ်ထားသော candidate-frame အရေအတွက်တို့ကိုလည်း result-cache key နှင့် metadata တွင် တိကျစွာ ထည့်သွင်းထားသည်။ ထို့ကြောင့် policy ပြောင်းလဲပါက stale whole-video description ကို ပြန်လည်အသုံးပြုနိုင်မည်မဟုတ်ပါ။ Result-cache v4 metadata သည် mode နှင့် fingerprint ကို ထိန်းသိမ်းထားပြီး raw user task ကို မည်သည့်အခါမျှ မသိမ်းဆည်းပါ။ Guardrail metadata သည် requested analysis mode နှင့် effective analysis mode နှစ်ခုစလုံးကို ဖော်ပြသည်။ အသုံးပြုနိုင်သော user text မရှိဘဲ `focused` mode ကို တောင်းဆိုထားပါက ထိရောက်စွာ `full` mode အဖြစ် ဖော်ပြသည်။

Guardrail သည် ပံ့ပိုးထားသော video part အားလုံးကို ထုတ်ယူသော်လည်း `modalityBridgeVideoMaxVideos` ထက် ပိုမိုသော video များကို ဖော်ပြမည်မဟုတ်ပါ။ `supportsVideo === false` ဖြစ်ကြောင်း သေချာသည့် target အတွက် failed ဖြစ်သော သို့မဟုတ် ကန့်သတ်ချက်ကျော်လွန်သော video များကို raw video မကျန်ရှိစေရန် တိကျသော safe text marker များအဖြစ် ပြောင်းလဲသည်။ Capability ကို မသိရှိသေးပါက ထို part များသည် ၎င်းတို့၏ video carrier ကို ဆက်လက်ထိန်းသိမ်းထားသည်။ ထိုအခြေအနေတွင် fallback transcript ရှိပါက အထက်ဖော်ပြပါ ကန့်သတ်ထားသော text conversion ကို လိုက်နာသည်။ `supportsVideo === true` ဖြစ်သော target များသည် bridge ကို ကျော်သွားသည်။ Client request ၏ abort signal သည် download၊ broker queue၊ subprocess များနှင့် caption call များအထိ ဆက်လက်ပျံ့နှံ့သည်။ Abort ဖြစ်ပါက video များအကြားတွင် ရပ်တန့်ပြီး raw media သို့ fail open မဖြစ်စေရ။

Runtime setting များသည် DB-backed ဖြစ်ပြီး Zod ဖြင့် validation ပြုလုပ်ထားသည်။

| Key                                 | Default     | Range / behavior                                                                                                                    |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | ရွေးချယ်အသုံးပြုနိုင်သော runtime၊ opt-in                                                                                            |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` သည် အထွေထွေ caption များကို ထိန်းသိမ်းသည်။ `focused` သည် ကန့်သတ်ထားပြီး ယုံကြည်၍မရသော နောက်ဆုံး user context ကို အသုံးပြုသည် |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge မော်ဒယ်ကို အမွေဆက်ခံသည်                                                                                               |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                                |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`၊ `scene_aware` သို့မဟုတ် အချိုးကျ `segment_aware`၊ detector မအောင်မြင်ပါက `uniform` သို့ fallback ပြုလုပ်သည်              |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                                 |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                                      |

ယခင်က သိမ်းဆည်းထားသော Video timeout တန်ဖိုးများသည် 120 စက္ကန့်ထက် ကျော်လွန်ပါက broker deadline အထိ လျှော့ချသတ်မှတ်သည်။ အသစ်ရေးသားသော setting များတွင် ထိုကန့်သတ်ချက်ထက် ကျော်လွန်သော တန်ဖိုးများကို ငြင်းပယ်သည်။ `GET /api/modality-bridge/video/runtime` သည် authentication သို့မဟုတ် runtime probing မပြုလုပ်မီ trusted stamped loopback locality ကို လိုအပ်ပြီး ထို့နောက် management auth ကို လိုအပ်သည်။ ၎င်းသည် `available`၊ သန့်စင်ထားသော FFmpeg/ffprobe version များနှင့် runtime မရရှိနိုင်သည့်အခါ သတ်မှတ်ထားသော reason တစ်ခုကိုသာ ပြန်လည်ပေးသည်။ Internal extraction endpoint သည် public upload API မဟုတ်ပါ။ Queue ပြည့်နေပါက `503` နှင့် `Retry-After` ကို ပြန်လည်ပေးသည်။ Caller ချိတ်ဆက်မှု ဖြုတ်သွားပါက `499` ကို ပြန်လည်ပေးသည်။ သတ်မှတ်ထားသော broker deadline ရောက်ရှိပါက `504` ကို ပြန်လည်ပေးသည်။ ပြောင်းလဲထားသော response များသည် Vision သို့မဟုတ် Audio segment များကို မဖယ်ရှားဘဲ central `x-omniroute-modality-bridge` header ထဲသို့ `video->text;model=<visionModel>;parts=<videos>` ကို ပေါင်းထည့်သည်။

### PII Masker (`piiMasker.ts`)

အဆင့်နှစ်ခုစလုံးတွင် လုပ်ဆောင်သည်။

- **`preCall`** သည် payload ကို clone ပြုလုပ်ပြီး `system`၊ `messages`၊ `input` နှင့် `prompt` တို့အတွင်းရှိ plain string item များအပါအဝင် အချက်အလက်များကို လိုက်လံစစ်ဆေးကာ string `content`/`text` field များအပေါ် `processPII()` (from `@/shared/utils/inputSanitizer`) ကို အသုံးပြုသည်။ `PII_REDACTION_ENABLED=true` ဖြစ်ပါက တွေ့ရှိသော PII ကို outbound payload ထဲတွင် ဖုံးကွယ်ပြင်ဆင်သည်။ ၎င်းသည် `INPUT_SANITIZER_MODE` နှင့် သီးခြားဖြစ်သည် (`INPUT_SANITIZER_MODE` သည် prompt-injection policy ကိုသာ ထိန်းချုပ်သည်)။ Redaction ပိတ်ထားပါက call သည် content ကို မပြင်ဆင်ဘဲ detection count များကို မှတ်တမ်းတင်သည်။
- **`postCall`** သည် response ကို deep-clone ပြုလုပ်ပြီး `sanitizePIIResponse()` နှင့် Responses-API-shape masker (`maskResponsesOutput` — `output_text` နှင့် `output[].content[].text` တို့ကို ဖုံးကွယ်ပြင်ဆင်သည်) ကို လုပ်ဆောင်သည်။ Redaction တစ်စုံတစ်ရာ ဖြစ်ပေါ်ပါက ပြင်ဆင်ထားသော response သည် မူရင်း response ကို အစားထိုးသည်။

Guardrail သည် မည်သည့်အခါမျှ block မလုပ်ပါ။ ၎င်းသည် annotation (`meta.detections`၊ `meta.redacted`) ထည့်ခြင်း သို့မဟုတ် rewrite ပြုလုပ်ခြင်းကိုသာ လုပ်ဆောင်သည်။

**ပြန်လည်ပြောင်းနိုင်သော vault (`PII_REVERSIBLE_VAULT_ENABLED`, မူလတန်ဖိုး `false`)။**  
`PII_REDACTION_ENABLED` နှင့် `PII_REVERSIBLE_VAULT_ENABLED` နှစ်ခုလုံး ဖွင့်ထားသောအခါ (DB override >
env > default၊ request တစ်ကြိမ်စီတွင် တစ်ကြိမ်သာဖတ်သည်) `handleChat` သည် client
request တစ်ခုစီအတွက် vault တစ်ခုကို ဖွင့်ပေးသည်
(`src/lib/pii/requestTokenVaultScope.ts`)။ ထို့နောက် ၎င်းကို pre-call
pass သို့ `GuardrailContext.tokenVault` အဖြစ် ပေးပို့သည်။ ထို့နောက် masker သည်
built-in၊ validated (GDPR/POPIA) နှင့် custom rules အားလုံးအတွက်
`[EMAIL_REDACTED]` အစား `<<PII_EMAIL_QWERTYUI_1>>` ကဲ့သို့သော အစားထိုး token များကို
ရေးသားသည်။ nonce သည် request တစ်ကြိမ်စီအတွက် ကျပန်းရွေးထားသော အကြီးစာလုံး ၈ လုံးဖြစ်ပြီး
request တစ်ခုအတွင်း တန်ဖိုးတူညီပါက token တူညီသည်။ Token ကို mint ပြုလုပ်သူမှာ masker
တစ်ခုတည်းသာဖြစ်သည်။ prompt-injection guard နှင့် `/api/guardrails/test` တို့သည် vault
မပါဘဲ run လုပ်ပြီး placeholder များကိုသာ ဆက်လက်အသုံးပြုသည်။

- Provider၊ combo leg တစ်ခုစီ၊ retry၊ fusion panel member နှင့် fusion judge တို့သည်
  token များကိုသာ မြင်ရသည်။ Token များကို `handleChat` မှ ထွက်သွားသော 2xx response တွင်
  တစ်ကြိမ်သာ ပြန်လည်ထည့်သွင်းသည်။ ၎င်းကို parsed SSE တွင် field တစ်ခုစီအလိုက် ပြုလုပ်သည်
  (event များအကြား token ပြတ်တောက်နေသော်လည်း ဖြေရှင်းနိုင်ပြီး tool-call arguments များကို
  JSON-escaped ပြုလုပ်ထားသည်) သို့မဟုတ် JSON body တွင် field တစ်ခုစီအလိုက် ပြုလုပ်သည်။
  ထို့နောက် `Content-Length` ကို ပြန်လည်တွက်ချက်သည်။ Content နှင့် reasoning text များ၊
  tool-call arguments များကို ပြန်လည်ထည့်သွင်းသည်။ Error body များ (4xx/5xx) တွင် token
  များကို ဆက်လက်ထားရှိသည်။
- ပျက်ကွက်မှုများသည် သီးသန့်ဖြစ်နေသည်။ Mint ပြုလုပ်ခြင်း ပျက်ကွက်ပါက သို့မဟုတ် vault က
  တန်ဖိုးတစ်ခုကို လက်မခံပါက (entries 1000 ခု၊ တန်ဖိုးတစ်ခုလျှင် စာလုံး 256 လုံး၊ စုစုပေါင်း
  64 KB) placeholder ကိုသာ ရေးသားသည်။ Vault က ဖြေရှင်းမပေးနိုင်သော token သို့မဟုတ်
  ပျက်ကွက်သော restore သည် literal အတိုင်းသာ ကျန်ရှိပြီး count တစ်ခုတည်းကိုသာ log
  လုပ်သည်။ Vault တွင် timer များနှင့် global state မရှိပါ။ Response stream ပြီးဆုံးသောအခါ၊
  cancel လုပ်ခံရသောအခါ သို့မဟုတ် error ဖြစ်သောအခါ ၎င်းကို ရှင်းလင်းသည်။
- Request တစ်ခုက token များကို mint ပြုလုပ်ခဲ့ပါက memory extraction၊ idempotency save နှင့်
  semantic-cache writes နှစ်ခုစလုံးကို ကျော်သွားသည်။ အကြောင်းမှာ နောက်ပိုင်း request
  တစ်ခုက ထို token များကို ဖြေရှင်းနိုင်မည်မဟုတ်သောကြောင့် ဖြစ်သည်။ Call logs များတွင်
  provider request နှင့် response တို့၌ token များ ပါဝင်သည်။ သို့သော် logged client
  request body သည် plain redaction ကဲ့သို့ပင် client ထံမှ ရရှိသော raw input ဖြစ်နေဆဲဖြစ်သည်။
- Token များသည် request တစ်ခုစီအတွက် ကျပန်း nonce ကို အသုံးပြုသောကြောင့် turn တစ်ခုစီတွင်
  prompt prefix ပြောင်းလဲသည်။ ထို့ကြောင့် provider-side prompt caching သည် masked turn
  များအတွက် hit မဖြစ်ပါ။ နောက် turn တစ်ခုတွင် ပြန်လည်ပါလာသော token (ဥပမာ
  `previous_response_id` မှတစ်ဆင့်) သည် ယခင် request အဟောင်းတစ်ခုနှင့် သက်ဆိုင်သောကြောင့်
  literal အတိုင်းသာ ကျန်ရှိသည်။

#### အမျိုးအစားအလိုက် ရွေးချယ်မှု၊ custom pattern များနှင့် detection counter များ

**Dashboard → Settings → Security → PII masking** သည် _မည်သည့်အရာကို_ mask ပြုလုပ်မည်ကို
ရွေးချယ်သည်။ ၎င်းသည် masking ကို ဖွင့်ပေးခြင်းမဟုတ်ပါ။ Masking ကို
`PII_REDACTION_ENABLED` (request) နှင့် `PII_RESPONSE_SANITIZATION` (response + SSE)
တို့က ထိန်းချုပ်ပြီး နှစ်ခုစလုံးသည် မူလအတိုင်း ပိတ်ထားသည်။

- **အမျိုးအစားအလိုက် ရွေးချယ်မှု** — Built-in id များကို
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`) တွင် စာရင်းပြုစုထားသည်။
  မသတ်မှတ်ထားပါက အမျိုးအစားအားလုံးကို အသုံးပြုသည် (ဤ setting မရှိမီက အပြုအမူအတိုင်း)။
  Request engine ၏ `ssn_us` pattern သည် `ssn` သို့ map လုပ်သည်။ Template များ
  (Minimal, Standard, Financial, Brazilian, USA, GDPR, POPIA, Full) သည် UI ရှိ checkbox
  များကိုသာ ဖြည့်ပေးသည်။
- **GDPR နှင့် POPIA identifier များ** — EU နှင့် South African ကိုယ်ရေးအချက်အလက်
  identifier များကို လွှမ်းခြုံထားသော built-in id ဆယ့်နှစ်ခု (အောက်ပါ table) ရှိသည်။
  ၎င်းတို့၏ regex၊ validator နှင့် jurisdiction tag များသည် table တစ်ခုတည်းဖြစ်သော
  `src/shared/utils/piiPatterns.ts` တွင် ရှိပြီး response sanitizer
  (`src/lib/piiSanitizer.ts`) နှင့် request masker
  (`src/shared/utils/inputSanitizer.ts`) နှစ်ခုစလုံးက အသုံးပြုသည်။ Validator က
  လက်ခံမှသာ match ကို redact ပြုလုပ်သည်။ ဂဏန်းများကို သီးခြားစီ ဆက်တိုက်ရေးထားခြင်းမျှဖြင့်
  မလုံလောက်ပါ။ ဤ id များ မရှိမီက narrowed selection ကို သိမ်းဆည်းထားသော operator သည်
  id အသစ်များကို ရွေးမထားသေးသရွေ့ ယခင်အပြုအမူအတိုင်း ဆက်လက်အသုံးပြုမည်။
- **Custom pattern များ** — regex သို့မဟုတ် wildcard pattern အများဆုံး 20 ခု
  (`*` = whitespace မဟုတ်သော စာလုံး 64 လုံးအထိ၊ `?` = တစ်လုံး) ထည့်နိုင်သည်။ Match များသည်
  `[CUSTOM_REDACTED]` ဖြစ်လာသည်။ Pattern တစ်ခုစီသည်
  `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`) ကို ဖြတ်သန်းရသည်။
  စာလုံးရေ အများဆုံး 500 လုံးဖြစ်ရမည်၊ flags များသည် `g i m s u` သို့သာ ကန့်သတ်ထားရမည်၊
  compile လုပ်နိုင်ရမည်၊ `safe-regex` (catastrophic backtracking) စစ်ဆေးမှုကို ဖြတ်ကျော်ရမည်၊
  empty string သို့မဟုတ် redaction placeholder ကို match မလုပ်ရပါ။ မအောင်မြင်သော pattern ကို
  သိမ်းဆည်းချိန်နှင့် စမ်းသပ်ချိန်တွင် ငြင်းပယ်သည်။ သိမ်းဆည်းထားသော row တစ်ခုက မအောင်မြင်ပါက
  runtime တွင် compile မလုပ်ဘဲ ကျော်သွားသည်။ Custom pattern များသည် masking ဖွင့်ထားချိန်တွင်
  သာ run လုပ်သည်။
- **Detection counter များ** — အမျိုးအစားအလိုက် count များ (match ဖြစ်သည့် တန်ဖိုးများကို
  မသိမ်းပါ) ကို memory ထဲတွင် ထားရှိပြီး restart လုပ်သောအခါ reset လုပ်သည်
  (`src/lib/pii/piiDetectionStats.ts`)။ Masking ဖွင့်ထားချိန်တွင်သာ တိုးလာသည်။

Setting များကို `key_value` table (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) တွင် သိမ်းဆည်းပြီး 1 s cache မှတစ်ဆင့် ဖတ်သည်။ API:

| Method | Path                     | Purpose                                                                                                   |
| ------ | ------------------------ | --------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Flag အခြေအနေ၊ `enabledTypes`၊ `customPatterns`၊ detection counter များ                                    |
| `PUT`  | `/api/settings/pii`      | `enabledTypes` (`null` = အားလုံး) နှင့်/သို့မဟုတ် `customPatterns` ကို အစားထိုးခြင်း                      |
| `POST` | `/api/settings/pii/test` | 8 KB ထက်မပိုသော sample တစ်ခုအပေါ် pattern တစ်ခုကို dry-run ပြုလုပ်ခြင်း၊ မည်သည့်အရာမျှ သိမ်းဆည်းခြင်းမရှိ |

သုံးခုစလုံးသည် management auth လိုအပ်ပြီး body ကို Zod
(`src/shared/validation/schemas/piiSettings.ts`) ဖြင့် validate လုပ်သည်။ Login ပိတ်ထားပါက
(`requireLogin=false`) `GET` နှင့် test endpoint တို့ကို ဖွင့်ထားသည်။ သို့သော် `PUT` အတွက်
dashboard session၊ `manage`-scope API key၊ write scope သို့မဟုတ် ထို့ထက်မြင့်သော
`oma_` access token၊ သို့မဟုတ် loopback မှ ပေးပို့သော CLI token သို့မဟုတ် internal-service
token တစ်ခု လိုအပ်သည်။

#### GDPR (EU) နှင့် POPIA (South Africa) identifier များ

| အိုင်ဒီ             | သတ်မှတ်အမည်                      | အတည်ပြုစစ်ဆေးမှု                                                                                               |
| ------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                             | သိရှိထားသောနိုင်ငံ၊ ထိုနိုင်ငံအတွက် တိကျသောအရှည်၊ ISO 13616 MOD-97-10                                          |
| `eu_vat`            | EU VAT နံပါတ်                    | သိရှိထားသော အဖွဲ့ဝင်နိုင်ငံ၏ ရှေ့ဆက်ကုဒ်နှင့် ထိုနိုင်ငံ၏ နံပါတ်ပုံစံ (VIES ရှာဖွေစစ်ဆေးမှု မပြုလုပ်ပါ)        |
| `es_dni_nie`        | စပိန် DNI / NIE                  | ထိန်းချုပ်အက္ခရာ (တန်ဖိုး mod 23); NIE သည် `X/Y/Z` + ဂဏန်း 7 လုံး ဖြစ်ရမည်                                     |
| `it_codice_fiscale` | အီတလီ Codice Fiscale             | မ odd/even အနေအထားဇယားများမှ ထိန်းချုပ်အက္ခရာ                                                                  |
| `pl_pesel`          | ပိုလန် PESEL                     | အလေးချိန်ပေး checksum နှင့် တကယ်ရှိသော မွေးသက္ကရာဇ်ကို ကုဒ်သွင်းထားခြင်း                                       |
| `nl_bsn`            | ဒတ်ခ်ျ BSN                       | 11-proof (အလေးချိန် 9..2၊ -1)                                                                                  |
| `de_steuer_id`      | ဂျာမန် Steuer-ID                 | ISO 7064 Mod 11,10 နှင့် ဂဏန်းဖွဲ့စည်းပုံ စည်းမျဉ်းများ (ရှေ့ဆုံး 0 မဖြစ်ရ)                                    |
| `se_personnummer`   | ဆွီဒင် personnummer              | နောက်ဆုံးဂဏန်း 10 လုံးအပေါ် Luhn နှင့် ဖြစ်နိုင်ဖွယ်ရှိသော မွေးသက္ကရာဇ် (ဂဏန်း 10 လုံး သို့မဟုတ် 12 လုံး)      |
| `za_id`             | တောင်အာဖရိက ID နံပါတ်            | ဂဏန်း 13 လုံးလုံးအပေါ် Luhn၊ မှန်ကန်သော မွေးလနှင့် မွေးရက်၊ နိုင်ငံသားဖြစ်မှုဂဏန်း 0 သို့မဟုတ် 1               |
| `za_phone`          | တောင်အာဖရိက ဖုန်းနံပါတ်          | `+27` / `27` ရှေ့ဆက်ကုဒ်၊ သို့မဟုတ် space သို့မဟုတ် hyphen ဖြင့် ရေးထားသော နိုင်ငံတွင်း `0..` ပုံစံ            |
| `za_vat`            | တောင်အာဖရိက VAT နံပါတ်           | `4` ဖြင့် စတင်သော ဂဏန်း 10 လုံး **နှင့်** အရှေ့ဘက်ရှိ စာလုံး 48 လုံးအတွင်း "VAT" / "BTW" ပါဝင်ရမည်             |
| `za_tax_ref`        | တောင်အာဖရိက အခွန်ရည်ညွှန်းနံပါတ် | `0`-`3` ဖြင့် စတင်သော ဂဏန်း 10 လုံး၊ Luhn၊ **နှင့်** အရှေ့ဘက်ရှိ စာလုံး 48 လုံးအတွင်း "tax" / "SARS" ပါဝင်ရမည် |

ဂဏန်းများသာပါသော ပုံစံများသည် အော်ဒါနံပါတ်များ၊ build နံပါတ်များနှင့်
timestamp များနှင့် ထပ်တူကျနိုင်သောကြောင့် အားနည်းဆုံးဖြစ်သော
(`za_vat`, `za_tax_ref`) များအတွက် keyword အချက်ပြမှု လိုအပ်ပြီး၊
ဂဏန်းဆယ်လုံးပါသော `0..` နံပါတ်သက်သက်ကို တောင်အာဖရိကဖုန်းနံပါတ်အဖြစ်
မသတ်မှတ်ပါ။ Space ခြားထားသော IBAN များ (`GB29 NWBK ...`) ကို ကိုက်ညီသည်ဟု
မသတ်မှတ်ပါ။ Streaming လမ်းကြောင်းတွင် အချက်ပြ keyword ကို လက်ရှိ chunk
အတွင်း၌သာ ရှာဖွေသည်။ ID များသည် ယေဘုယျဖုန်းနံပါတ်ပုံစံများထက် ရှေ့တွင်
ရှိသောကြောင့် အတည်ပြုထားသော သတ်မှတ်အမည်သည် မိမိ၏ placeholder ကို
(`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...) ဆက်လက်အသုံးပြုသည်။ `gdpr` နှင့်
`popia` template များသည် EU နှင့် တောင်အာဖရိက ID များကို အသီးသီး
ရွေးချယ်သည်။ Masking ကိုယ်တိုင်မှာ opt-in အဖြစ် ဆက်လက်ရှိနေသည် (တင်းကျပ်သော
စည်းမျဉ်း #20) — ဤနေရာရှိအရာများက feature-flag ၏ မူလသတ်မှတ်ချက်ကို
မပြောင်းလဲပါ။

### Prompt Injection (`promptInjection.ts`)

အသုံးပြုသူထည့်သွင်းသော အကြောင်းအရာအတွင်းရှိ ရန်လိုသောဖွဲ့စည်းပုံများကို
ရှာဖွေပြီး သတ်မှတ်ထားသော မူဝါဒကို အကောင်အထည်ဖော်သည်။ လုပ်ဆောင်ပုံကို
environment variable များနှင့် constructor option များက ထိန်းချုပ်သည်။

| သတ်မှတ်ချက်            | Env var                                                                                               | မူလတန်ဖိုး | အကျိုးသက်ရောက်မှု                                                                                                                                                                                                 |
| ---------------------- | ----------------------------------------------------------------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ဖွင့်ထားခြင်း          | `INPUT_SANITIZER_ENABLED`                                                                             | `true`     | `false` ဖြစ်ပါက guardrail သည် ချက်ချင်းရပ်တန့်သည်။                                                                                                                                                                |
| မုဒ်                   | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`     | Injection မူဝါဒ: `block`, `warn`, သို့မဟုတ် `log`။ (`redact` ကို နောက်ပြန်လိုက်ဖက်မှုအတွက် လက်ခံသော်လည်း injection စာသားကို မဖယ်ရှားပါ၊ request PII ပြန်လည်ရေးသားမှုကို `PII_REDACTION_ENABLED` က ထိန်းချုပ်သည်။) |
| Block အဆင့်သတ်မှတ်ချက် | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`     | Block ပြုလုပ်ရန် လိုအပ်သော အနည်းဆုံး ပြင်းထန်မှုအဆင့်။ မူလသတ်မှတ်ချက်အရ Medium ကို စောင့်ကြည့်ရုံသာ ပြုလုပ်သည်။                                                                                                   |

**မုဒ် ဦးစားပေးအစီအစဉ်** (`getMode`): ခေါ်ဆိုသူ၏ `options.mode` →
`INJECTION_GUARD_MODE` **DB feature-flag override** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`။ ထို့ကြောင့် dashboard override သည် env vars များထက် ဦးစားပေးပြီး
Feature Flags UI က လုပ်ဆောင်နေသော guard ကို restart မပြုဘဲ တိုက်ရိုက်
ထိန်းချုပ်နိုင်သည်။ DB ဖတ်ရှုမှုသည် fail-safe ဖြစ်သည် — အမှားဖြစ်ပါက guard သည်
env အခြေပြု လုပ်ဆောင်ပုံသို့ ပြန်လည်ကျဆင်းပြီး၊ override မသတ်မှတ်ထားပါက
လုပ်ဆောင်ပုံသည် env-only resolution နှင့် တူညီသည်။

ရှာဖွေသည့် ရင်းမြစ်များမှာ-

1. `@/shared/utils/inputSanitizer` မှ `sanitizeRequest()` (pipeline အတွင်း အခြားနေရာများတွင်လည်း အသုံးပြုသော shared detector set)။
2. Built-in `DEFAULT_GUARD_PATTERNS` (လက်ရှိတွင် `system_override_inline` နှင့် `markdown_system_block`၊ နှစ်ခုလုံး `high` severity ဖြစ်သည်)။
3. Constructor options မှတစ်ဆင့် ပေးပို့နိုင်သော optional `customPatterns` (စာကြောင်းများ၊ regex များ၊ သို့မဟုတ် `{ name, pattern, severity }` records)။

`mode === "block"` ဖြစ်ပြီး အနည်းဆုံး ရှာဖွေတွေ့ရှိချက်တစ်ခုက severity
threshold နှင့် ကိုက်ညီပါက `preCall` သည် `{ block: true, message: "Request rejected:
suspicious content detected" }` ကို ပြန်ပေးသည်။ `warn`/`log` မုဒ်များတွင်
guardrail သည် မှတ်တမ်းတင်သော်လည်း ခေါ်ဆိုမှုကို ခွင့်ပြုသည်။ Shared helper
`evaluatePromptInjection()` ကိုလည်း registry မှတစ်ဆင့် မဖြတ်သန်းဘဲ prompt များကို
အကဲဖြတ်လိုသော ခေါ်ဆိုသူများအတွက် export ပြုလုပ်ထားသည်။

**စကန်အကန့်အသတ် (v3.8.20):** detector သည် ပေါင်းစပ်ထားသော prompt စာသား၏ **ပထမ 16 KB** ကိုသာ စစ်ဆေးသည် — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) ကို `src/shared/utils/inputSanitizer.ts` တွင် သတ်မှတ်ထားသည်။ `detectInjection()` နှင့် `evaluatePromptInjection()` နှစ်ခုစလုံးသည် pattern loop မလုပ်ဆောင်မီ `slice(0, MAX_INJECTION_SCAN_BYTES)` ကို အသုံးပြုသည်။ Injection ညွှန်ကြားချက်များသည် input ၏ အပေါ်ပိုင်းအနီးတွင် ရှိသောကြောင့်၊ ၎င်းသည် detection ကို မလျော့ပါးစေဘဲ ရာနှင့်ချီသော KB အရွယ် payload များတွင် regex CPU/GC အသုံးပြုမှုကို ကန့်သတ်ပေးသည် (cf. #3932, #4041)။

### Credential Masker (`credentialMasker.ts`)

Default chain တွင် နောက်ဆုံးအဖြစ် (priority `95`) အဆင့်နှစ်ခုစလုံးတွင် လုပ်ဆောင်သည်။ အပြင်သို့ပို့မည့် payload (message content၊ tool-call arguments၊ tool results) **နှင့်** provider response ထဲမှ လူသိများသော API-key / secret-token ပုံစံများကို ဖုံးကွယ်ပေးသောကြောင့် prompt ထဲသို့ ထည့်သွင်းထားသော credential (သို့မဟုတ် tool result မှ ပြန်လည်ထည့်သွင်းပေးသော credential) သည် upstream provider ထံသို့ဖြစ်စေ client ထံသို့ဖြစ်စေ မပေါက်ကြားနိုင်ပါ။

- **Opt-in သာဖြစ်သည်**၊ PII redaction နှင့် တူညီသော သတ်မှတ်ချက်ကို အသုံးပြုသည် (Hard Rule #20-adjacent) — `settings.credentialRedactionEnabled === true` **သို့မဟုတ်** `CREDENTIAL_REDACTION_ENABLED=true` ဖြစ်မှသာ ဖွင့်ထားသည်။ ၎င်းကို ပိတ်ထားပါက guardrail သည် လုပ်ဆောင်မှုမရှိပါ — မည်သည့်အရာကိုမျှ ပိတ်ပင်ခြင်းမရှိသလို ပြန်လည်ရေးသားခြင်းလည်း မပြုလုပ်ပါ။
- `redactCredentials()` သည် payload/response tree တစ်ခုလုံးကို (`walkValue()`၊ prototype-pollution-safe၊ `WeakSet` အသုံးပြု၍ cycle-safe) လှည့်လည်စစ်ဆေးပြီး ကိုက်ညီမှုများကို `[REDACTED:<type>]` placeholder ဖြင့် အစားထိုးသည်။ အမှန်တကယ် ပြောင်းလဲသွားသော branch များကိုသာ clone ပြုလုပ်သည်။
- `CREDENTIAL_PATTERNS` တွင် LLM provider key များ (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate)၊ VCS/SaaS token များ (GitHub, Slack, Linear, Notion, npm, Postman, Discord)၊ payment key များ (Stripe, Square)၊ cloud key များ (AWS access key, Twilio, SendGrid, Mailgun)၊ private key / JWT များ၊ credential ပါဝင်သော connection string များ (`mongodb://user:pass@...` စသည်) နှင့် ယေဘုယျ `Authorization`/`x-api-key`/`api-key`/`apikey` header-value pattern တို့ ပါဝင်သည်။ Header ပုံစံ key များ (`authorization`, `x-api-key`, `api-key`, `apikey`) ကို ယေဘုယျ text regex ဖြင့်မဟုတ်ဘဲ ဖွဲ့စည်းပုံအရ (value ကိုသာ၊ `Bearer `/`Basic ` ကဲ့သို့သော scheme prefix ကို ထိန်းသိမ်း၍) ဖုံးကွယ်သည်။
- Guardrail သည် မည်သည့်အရာကိုမျှ ပိတ်ပင်ခြင်းမရှိဘဲ ပြန်လည်ရေးသားခြင်း (`modifiedPayload` / `modifiedResponse`) နှင့် မှတ်ချက်ထည့်သွင်းခြင်း (`meta.credentialsRedacted`, `meta.count`) ကိုသာ ပြုလုပ်သည်။

Regression guard: `tests/unit/credential-masker-guardrail.test.ts`။

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

## လုပ်ဆောင်မှု အစီအစဉ်

`src/sse/handlers/chat.ts` နှင့်
`open-sse/handlers/chatCore.ts` မှတစ်ဆင့် ဖြတ်သန်းသွားသော တောင်းဆိုချက်တစ်ခုချင်းစီအတွက်
([Coverage and limits](#coverage-and-limits) အောက်တွင် ဖော်ပြထားသော chat-family လမ်းကြောင်းများ):

1. `resolveDisabledGuardrails(...)` သည် API key၊ body နှင့် headers တို့မှ skip list ကို တည်ဆောက်သည်။
2. `guardrailRegistry.runPreCallHooks(body, ctx)` သည် guardrail များကို priority အစဉ်လိုက် အနိမ့်မှ အမြင့်သို့ လုပ်ဆောင်သည်-
   - ပိတ်ထားသော guardrail များကို `skipped` အဖြစ် မှတ်တမ်းတင်သည်။
   - guardrail တစ်ခုချင်းစီ၏ `preCall` သည် `modifiedPayload` မှတစ်ဆင့် payload ကို ပြန်လည်ရေးသားနိုင်သည်။
   - ပထမဆုံး `block: true` ဖြစ်သည့်အခါ chain ကို ချက်ချင်းရပ်ပြီး handler သည် guardrail ပယ်ချမှု response ကို ပြန်ပေးသည်။
3. (ပြန်လည်ရေးသားထားနိုင်သော) payload သည် combo routing နှင့် upstream dispatch သို့ ဆက်လက်စီးဆင်းသည်။
4. **Non-streaming only:** response ကို စုစည်းပြီးနောက်
   `guardrailRegistry.runPostCallHooks(...)` သည် response ပေါ်တွင် အလားတူ chain ကို လုပ်ဆောင်သည်။ ဤနေရာတွင် `block: true` ဖြစ်ပါက upstream response ကို ဖယ်ရှားပြီး HTTP 400 ကို ပြန်ပေးသည်။ Streamed response များသည် ဤအဆင့်ကို လုံးဝကျော်သွားသည်။
5. **Reversible vault only:** တောင်းဆိုချက်က token များကို mint လုပ်ထားသည့်အခါ `handleChat` သည် ၎င်းက ပြန်ပေးသော 2xx response ပေါ်တွင် token များကို post-call hooks နှင့် streaming PII transform ပြီးနောက် ပြန်လည်ထားရှိသည်။ ထို့ကြောင့် `PII_RESPONSE_SANITIZATION` သည် token များနှင့် model က ထုတ်လုပ်သော PII ကိုသာ မြင်ရပြီး မူလပြန်လည်ထားရှိထားသော တန်ဖိုးကို မမြင်ရပါ။

throw လုပ်သော guardrail များကို `error: <message>` ဖြင့် မှတ်တမ်းတင်ပြီး `logger.warn` မှတစ်ဆင့် log မှတ်တမ်းတင်သည်။ သို့သော် chain သည် ဆက်လက်လုပ်ဆောင်သည် — ဒီဇိုင်းအရ fail-open ဖြစ်သည်။

## လွှမ်းခြုံမှုနှင့် ကန့်သတ်ချက်များ

Guardrail registry ကို chat pipeline ထဲတွင်သာ ချိတ်ဆက်ထားသည်။ ဤကန့်သတ်ချက်များကို
`tests/unit/guardrail-pipeline-wiring-characterization.test.ts` နှင့်
`tests/unit/guardrail-pipeline-characterization.test.ts` တို့က သတ်မှတ်ထားသောကြောင့်
အပြုအမူပြောင်းလဲသည့်အခါ ထို tests များကို ရည်ရွယ်ချက်ရှိရှိ update လုပ်ပါ။

### Hook များ လုပ်ဆောင်သည့်နေရာ

| Hook / ထိန်းချုပ်မှု                | လုပ်ဆောင်သည့်အရာ                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                   | `handleChat` (`src/sse/handlers/chat.ts`) က ကိုင်တွယ်သော requests များ — `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (နှင့် `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` နှင့် Telegram chat proxy တို့ ဖြစ်သည်။ ထို့အပြင် dashboard test endpoint `/api/guardrails/test` လည်း ပါဝင်သည်။ Pre-call block ဖြစ်ပါက HTTP 400 ပြန်ပေးသည်။ |
| `runPostCallHooks`                  | **Non-streaming** chat responses များအတွက်သာ (`open-sse/handlers/chatCore/nonStreamingResponse.ts`)။ Streamed responses များသည် ၎င်းထံသို့ မရောက်ပါ။                                                                                                                                                                                                                                                                                                                        |
| Streaming PII                       | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`) ဖြစ်ပြီး `PII_RESPONSE_SANITIZATION` ဖွင့်ထားသည့်အခါ `streamingPipeline.ts` တွင် pipe လုပ်ထားသည်။ ၎င်းသည် guardrail မဟုတ်သောကြောင့် disable channels များက ၎င်းအပေါ် သက်ရောက်မှုမရှိပါ။                                                                                                                                                                                                                        |
| Reversible PII vault                | `PII_REDACTION_ENABLED` နှင့် `PII_REVERSIBLE_VAULT_ENABLED` တို့ ဖွင့်ထားသည့်အခါ `handleChat` က ကိုင်တွယ်သော requests များအတွက်သာ ဖြစ်သည်။ Tokens များကို pre-call `pii-masker` က mint လုပ်ပြီး `handleChat` ထွက်ချိန်တွင် restore လုပ်သည် (`src/lib/pii/requestTokenVaultScope.ts`)။ Request တစ်ခုအတွက် `pii-masker` ကို disable လုပ်ပါက မည်သည့် token မျှ mint လုပ်မည်မဟုတ်ပါ။                                                                                           |
| Injection-guard middleware (legacy) | Chat-family အပါအဝင် prompt ပါသော `/v1` routes အားလုံးတွင် လုပ်ဆောင်သည် ([route coverage](#injection-guard-route-coverage--red-team-phase-8--block-d) ကိုကြည့်ပါ)။ Prompt injection အတွက်သာ ဖြစ်သည်။                                                                                                                                                                                                                                                                         |

### မည်သည့်အရာများ မလွှမ်းခြုံထားသနည်း

- **Media၊ embeddings နှင့် data routes** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) သည် registry ထံသို့ မည်သည့်အခါမျှ
  မရောက်ပါ။ ထိုနေရာများတွင် PII masking၊ credential masking သို့မဟုတ် modality bridge
  မလုပ်ဆောင်ပါ။ ၎င်းတို့၏ တစ်ခုတည်းသော စစ်ဆေးမှုမှာ legacy injection-guard middleware
  ဖြစ်သည်။
- **Streamed responses** များသည် post-call guardrails မရရှိပါ — `pii-masker` သို့မဟုတ်
  `credential-masker` post-call မရှိသကဲ့သို့ post-call block လည်း မရှိပါ။ `PII_RESPONSE_SANITIZATION`
  ဖွင့်ထားသည့်အခါ streaming PII transform တစ်ခုတည်းသာ အကျုံးဝင်သည်။ Streamed response
  ထဲတွင် credential တစ်ခု ပြန်ပါလာပါက redacted လုပ်မည်မဟုတ်ပါ။
- **Disable channels နှင့် middleware (ဒီဇိုင်းအရ):** middleware သည် caller-controlled disable list
  တစ်ခုခုကို မပေးပို့ဘဲ `evaluatePromptInjection()` ကို သီးခြားခေါ်ဆိုကာ prompt injection ကို
  အကဲဖြတ်သည်။ `block` mode သည် caller-controlled disables များက ကျော်လွှား၍မရသော
  မဖြစ်မနေ boundary တစ်ခုဖြစ်ပြီး chat-family routes များတွင်လည်း အကျုံးဝင်သည်
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413))။ `prompt-injection` ကို
  disable လုပ်ခြင်းသည် registry guardrail ကိုသာ ကျော်သွားစေသည်။

### Post-call မတိုင်မီ response ကို မည်သည့်အရာများက မြင်သနည်း

Non-streaming လမ်းကြောင်းတွင် အစီအစဉ်မှာ — memory extraction → built-in tool
execution → post-call guardrails → post-call block exit → semantic-cache store ဖြစ်သည်။

- **Memory extraction** နှင့် **tool execution** တို့သည် post-call guardrails များက response ကို
  ပြန်လည်ရေးသားခြင်း သို့မဟုတ် block လုပ်ခြင်း မပြုမီ response ကို မြင်တွေ့သည်။
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) နောက်ပိုင်းတွင်
  `PII_RESPONSE_SANITIZATION` ဖွင့်ထားပါက memory extraction သည် extracted text ကို
  `sanitizePII` မှတစ်ဆင့် လုပ်ဆောင်သည် (streaming နှင့် non-streaming နှစ်မျိုးစလုံးတွင်)။
  သို့သော် post-call တွင် နောက်ပိုင်းမှ block လုပ်မည့် response တစ်ခုကိုပင် memory နှင့် tools
  ထံသို့ ပေးအပ်ပြီးဖြစ်သည်။
- **Semantic cache** သည် post-call ပြီးနောက် response ကို သိမ်းဆည်းသောကြောင့်
  ပြန်လည်ရေးသားထားသည့် response ကို သိမ်းဆည်းပြီး block လုပ်ထားသော response ကိုမူ
  မည်သည့်အခါမျှ cache မလုပ်ပါ။ Cache entries များကို API key တစ်ခုချင်းစီအလိုက်
  သတ်မှတ်ထားသည်။

## ပြင်ဆင်သတ်မှတ်ခြင်း

Built-in guardrails မှ ဖတ်ရှုသည့် environment variables များ:

| Variable                              | အသုံးပြုသည့်နေရာ           | အကျိုးသက်ရောက်မှု                                                                                                             |
| ------------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | detection ကို လုံးဝပိတ်ရန် `false` သတ်မှတ်ပါ။                                                                                 |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Injection policy: `warn`, `block`, သို့မဟုတ် `log`။ Legacy တန်ဖိုး `redact` သည် injection စာသားကို ပြန်လည်ရေးသားခြင်း မပြုပါ။ |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Injection guard အတွက် mode ဖြစ်ပြီး DB feature flag လည်း ဖြစ်သည်။ env vars များကို **အစားထိုး** သတ်မှတ်သည် (DB > ENV)။        |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | `MODE=block` က ပယ်ချမည့် အနည်းဆုံး severity: `high` (ပုံသေ), `medium`, သို့မဟုတ် `low`။                                       |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | `INPUT_SANITIZER_BLOCK_THRESHOLD` အတွက် Legacy alias ဖြစ်သည်။                                                                 |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | `true` ဖြစ်ပါက request PII ကို redacted ပြုလုပ်သည် (injection mode နှင့် သီးခြားဖြစ်သည်)။                                     |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | `PII_REDACTION_ENABLED` နှင့်အတူ ပြန်လည်ပြောင်းနိုင်သော tokens များကို ထုတ်ပေးပြီး 2xx responses များတွင် ပြန်လည်ရယူသည်။      |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream)  | Response-side masker ၏ အပြုအမူကို ထိန်းချုပ်သည်။                                                                              |

Modality Bridge guardrails များသည် env vars များမှ မဟုတ်ဘဲ DB-backed settings
store (`getSettings()`) မှ runtime config ကို ဖတ်ရှုသည်။ Vision ၏ primary keys များမှာ
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` နှင့်
`modalityBridgeCacheMaxEntries` တို့ ဖြစ်သည်။ Legacy
`visionBridge*` keys များကို မှတ်တမ်းတင်ထားသည့် one-cycle read fallback အဖြစ်သာ လက်ခံသည်။
dashboard မှ ရေးသားမှုများသည် primary keys များကို အသုံးပြုသည်။ Defaults နှင့် fallback
resolver တို့သည် `src/shared/constants/modalityBridgeDefaults.ts` တွင် ရှိပြီး၊ legacy
constants များကို `src/shared/constants/visionBridgeDefaults.ts` တွင် ဆက်လက်ထိန်းသိမ်းထားသည်။

Audio သည် `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` နှင့် `modalityBridgeAudioMaxClips` တို့အပြင် shared
`modalityBridgeCache*` settings များကို အသုံးပြုသည်။ အဆိုပါ keys များသည် Modality Bridge
schema နှင့်အတူ စတင်မိတ်ဆက်ခဲ့ခြင်းကြောင့် Audio တွင် legacy-key fallback မရှိပါ။

Video သည် `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` နှင့်
`modalityBridgeVideoTimeout` တို့အပြင် shared `modalityBridgeCache*` settings များကို
အသုံးပြုသည်။ FFmpeg/ffprobe များသည် ရွေးချယ်နိုင်သော operational dependencies များဖြစ်ပြီး
frame captioning သည် latency နှင့် model cost ကို တိုးစေသောကြောင့် ၎င်းကို ပုံသေအားဖြင့်
ပိတ်ထားသည်။

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
