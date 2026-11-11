# Resilience Guide (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute တွင် ကွဲပြားသော်လည်း ဆက်စပ်ခံနိုင်ရည်ရှိမှု ယန္တရားသုံးခုရှိသည်။ တစ်ခုစီတွင် မတူညီသော နယ်ပယ်နှင့် ရည်ရွယ်ချက်ရှိသည်။ လမ်းကြောင်းရှာဖွေခြင်းအပြုအမူကို အမှားရှာပြင်သည့်အခါ ၎င်းတို့ကို သီးခြားထားပါ။

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> အရင်းအမြစ်: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **ခံနိုင်ရည်ရှိမှု toggles အတွက် Env-vs-dashboard ဦးစားပေး။** ရွေးချယ်မှုတွင် ခံနိုင်ရည်ရှိမှုသည် ပတ်ဝန်းကျင်မှ ဆင်းသက်လာသော — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`) ကိုသာ ထောက်ပံ့ပေးသည်။ ဘူလီယန်သည် `resilienceSettings` တွင် ဆက်ရှိနေသည် (ဒက်ရှ်ဘုတ် →** ဆက်တင်များ → ခံနိုင်ရည်အား** / `PATCH /api/resilience`၊ `key_value` တွင်သိမ်းထားသော ) သည် env တန်ဖိုးထက် အနိုင်ရသည်- normalization (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) သည် တစ်ခုရှိသည့်အခါတိုင်း boolean ကို သိမ်းဆည်းသည်။ ဒက်ရှ်ဘုတ်မှ `false` သိမ်းဆည်းပြီးသော ဖြန့်ကျက်မှုတစ်ခုတွင် ထိုသို့သော env var ကို `true` ကို သတ်မှတ်ခြင်း ၊ ထို့ကြောင့် — toggle ကိုလှန်၍ ဘာမှမပြောင်းလဲပါ။** ဆက်တင်များ → ခံနိုင်ရည်အား** အစား (သို့မဟုတ် သိမ်းဆည်းထားသော အကွက်) ကို ရှင်းလင်းပါ။

## 1. Provider Circuit Breaker

**အကျယ်အဝန်း (Scope):** provider တစ်ခုလုံး (ဥပမာ `glm`, `openai`, `anthropic`)။

**ရည်ရွယ်ချက်:** upstream/service အဆင့်တွင် ထပ်ခါတလဲလဲ ပျက်ကွက်နေသည့် provider ဆီသို့ traffic ပေးပို့ခြင်းကို ရပ်တန့်ရန်။

**အကောင်အထည်ဖော်မှု:**

- အဓိက class: `src/shared/utils/circuitBreaker.ts`
- ချိတ်ဆက်မှု (Wiring): `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- အခြေအနေ API: `GET /api/monitoring/health`
- ပြန်လည်သတ်မှတ်ရေး API: `POST /api/resilience/reset`
- Wrapper များ: `open-sse/services/accountFallback.ts`
- DB ဇယား: `domain_circuit_breakers`

**အခြေအနေများ:**

- `CLOSED` — ပုံမှန် traffic ကို ခွင့်ပြုထားသည်
- `DEGRADED` — traffic ကို ဆက်လက်ခွင့်ပြုထားသော်လည်း တိုးပွားလာသော provider ပျက်ကွက်မှုများကို ခြေရာခံနေသည်; အောင်မြင်မှု အလုံအလောက်ရရှိသောအခါ၊ connection test မှန်ကန်သောအခါ၊ သို့မဟုတ် နောက်ဆုံး ပျက်ကွက်မှုအမျိုးအစားအတွက် အရှည်ဆုံး `OPEN` ဆုပ်ကိုင်ချိန် (၎င်း၏ `cooldownByKind` တန်ဖိုး၊ မရှိပါက `resetTimeout`၊ × `maxBackoffMultiplier`၊ အနည်းဆုံး cooldown တစ်ခု) ကြာပြီးနောက် ပျက်ကွက်မှုအသစ် မရှိဘဲ `CLOSED` သို့ ပြန်ရောက်သည်
- `OPEN` — provider ကို ခေတ္တပိတ်ဆို့ထားသည်; combo routing က ၎င်းကို ကျော်သွားသည်
- `HALF_OPEN` — reset timeout ကုန်ဆုံးသွားပြီး; probe request ကို ခွင့်ပြုထားသည်

**စိတ်ကြိုက်သတ်မှတ်နိုင်သော default တန်ဖိုးများ (`open-sse/config/constants.ts`၊ Dashboard → Settings → Resilience တွင် ဖော်ပြထားသည်):**

| အမျိုးအစား | Degraded ဖြစ်မှတ် | Open ဖြစ်မှတ်     | Reset timeout |
| ---------- | ----------------- | ----------------- | ------------- |
| OAuth      | ပျက်ကွက်မှု 5 ခု  | ပျက်ကွက်မှု 8 ခု  | 60s           |
| API-key    | ပျက်ကွက်မှု 7 ခု  | ပျက်ကွက်မှု 12 ခု | 30s           |
| Local      | တွက်ချက်ထားသော    | ပျက်ကွက်မှု 2 ခု  | 15s           |

`degradationThreshold` က provider တစ်ခု `DEGRADED` သို့ ဘယ်အချိန်ဝင်ရောက်မည်ကို ထိန်းချုပ်ပေးသည်; `failureThreshold` က ၎င်း ဘယ်အချိန် open ဖြစ်ပြီး ကျော်သတ်ခံရမည်ကို ထိန်းချုပ်သည်။ Local provider profile များကို Resilience settings စာမျက်နှာတွင် မဖော်ပြရသေးပါ။

**Trip ကုဒ်များ:** provider-အဆင့် status `[408, 500, 502, 503, 504]` များသာ။ account-အဆင့် error များအတွက် trip မလုပ်ပါနှင့် (401/403/429 အများစု — ၎င်းတို့သည် cooldown သို့မဟုတ် lockout နှင့် သက်ဆိုင်သည်)။

**Lazy recovery:** `OPEN` သက်တမ်းကုန်သောအခါ `getStatus()`၊ `canExecute()`၊ `getRetryAfterMs()` များ အခြေအနေကို `HALF_OPEN` သို့ ပြန်လည်အသစ်ပြုပေးသည်။ ထိုဖတ်ရှုမှုများပင်လျှင် (နှင့် နောက်ထပ်ပျက်ကွက်မှု) က ရှေးကျနေသော `DEGRADED` ကို `CLOSED` သို့ ပြန်လည်လျှော့ချပေးသည်။ နောက်ခံ timer မလိုအပ်ပါ။

---

### ရွေးချယ်ဖွင့်နိုင်သော (opt-in) global Provider Cooldown (window gate)

စတုတ္ထမြောက် **opt-in** အလွှာ (`PROVIDER_COOLDOWN_ENABLED`၊ default မှာ **ပိတ်**) သည် `open-sse/services/providerCooldownTracker.ts` တွင် ပျက်ကွက်နေသော provider များ၏ cross-request မှတ်ဉာဏ်ကို သိမ်းထားပြီး၊ combo target resolution က ၎င်းကို ရည်ညွှန်းသုံးစွဲသဖြင့် အဆက်တိုက်လာလာသော combo request များ မကြာသေးမီက ပျက်ကွက်ခဲ့သော provider ကို ထပ်မံရှာဖွေခြင်းမှ ရပ်တန့်စေသည်။ Provider-အဆင့် entry များသည် `PROVIDER_PROFILES` window gate ကို လိုက်နာသည်:

| Profile | trip ဖြစ်စေသော ပျက်ကွက်မှုအရေအတွက် (`providerFailureThreshold`) | ဤကာလအတွင်း (`providerFailureWindowMs`) | cooldown ကြာချိန် (`providerCooldownMs`) |
| ------- | --------------------------------------------------------------: | -------------------------------------: | ---------------------------------------: |
| OAuth   |                                                            `10` |                                `15min` |                                   `5min` |
| API key |                                                            `15` |                                `30min` |                                  `10min` |

threshold အောက်တွင် provider ကို cooldown အဖြစ်အတွက် **မ** မှတ်ယူပါ; အောင်မြင်မှုတစ်ခုက window ကို ရှင်းလင်းပစ်သည်။ Connection-အဆင့် entry များ (`provider:connectionId`) က အဲဒီအစား exponential `minRetryCooldownMs → maxRetryCooldownMs` backoff ကို ဆက်လက်အသုံးပြုသည်။ Override များ: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`။ Regression ကာကွယ်စစ်ဆေးမှု: `tests/unit/provider-cooldown-window-gate.test.ts`။

## ၂။ ချိတ်ဆက်မှု Cooldown

**အကျုံးဝင်မှု:** provider connection/account/key တစ်ခုတည်းအတွက်။

**ရည်ရွယ်ချက်:** provider တစ်ခုတည်းအတွက် အခြား connection များက ဝန်ဆောင်မှုပေးနေစဉ် မကောင်းသော key တစ်ခုကို ကျော်သွားရန်။

**အကောင်အထည်ဖော်မှု:**

- မရရှိနိုင်ဟု သတ်မှတ်ခြင်း: `src/sse/services/auth.ts::markAccountUnavailable()`
- ရွေးချယ်ခြင်း: တူညီသောဖိုင်ရှိ `getProviderCredentials*`
- Cooldown တွက်ချက်ခြင်း: `open-sse/services/accountFallback.ts::checkFallbackError()`
- ဆက်တင်များ: `src/lib/resilience/settings.ts`

**Connection တစ်ခုစီအတွက် fields များ:**

- `rateLimitedUntil` — cooldown သက်တမ်းကုန်ဆုံးမည့် timestamp
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — exponential backoff ကောင်တာ

**မူလ cooldown များ:**

- OAuth အခြေခံတန်ဖိုး: 5s
- API-key အခြေခံတန်ဖိုး: 3s
- API-key 429: upstream `Retry-After`/reset headers/parse လုပ်နိုင်သော reset စာသားကို ဦးစားပေးသည်
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Provider တစ်ခုစီအလိုက် retry delay။** Provider detail စာမျက်နှာတွင် **Retry delay** select တစ်ခုရှိပြီး (Auto၊
15s မှ 1h အထိ) `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600၊ `PATCH /api/resilience` မှတစ်ဆင့်) တွင် သိမ်းဆည်းသည်။ Rate-limit error တွင် upstream retry
hint မပါပါက ထိုတန်ဖိုးသည် provider အတွက် scaled backoff အစား အသုံးပြုမည်ဖြစ်ပြီး
`backoffLevel` ကို 0 သို့ ပြန်သတ်မှတ်သည် (`open-sse/services/rotationConfig.ts::overrideFor`)။ Rate-limited error
အတွက် ဦးစားပေးအစီအစဉ်မှာ အမြင့်ဆုံးမှစ၍: upstream retry hint၊ ထို့နောက် connection တစ်ခုချင်းစီ၏
`providerSpecificData.rotationOverrides.rateLimitResetSeconds`၊ ထို့နောက် provider တစ်ခုချင်းစီအလိုက် retry delay၊ ထို့နောက်
env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`၊ နောက်ဆုံး scaled backoff ဖြစ်သည်။ Auto သည် field ကို
ဖယ်ရှားသည်။ ၎င်းသည် rate-limit reason ကိုသာ သက်ရောက်ပြီး terminal states များကို မသက်ရောက်ပါ။

**Anti-thundering-herd guard:** တစ်ပြိုင်နက်ဖြစ်ပေါ်သော failure များကြောင့် cooldown ကို အလွန်အကျွံ
တိုးချဲ့ခြင်း သို့မဟုတ် `backoffLevel` ကို နှစ်ကြိမ်တိုးခြင်း မဖြစ်စေရန် ကာကွယ်သည်။

**Concurrency-limit 429 များသည် backoff ladder ပေါ်သို့ မတက်ပါ။** Body တွင် concurrency limit
("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) ဟု ဖော်ပြထားသော `429` သည် account ကောင်းမွန်သော်လည်း အလုပ်များနေသည်ဟု ဆိုလိုသည်။
`checkFallbackError()` သည် reason `concurrency_limited` ကို ပြန်ပေးသည်။ ထို့ကြောင့် နောက် connection သို့
ချက်ချင်း fail over လုပ်ပြီး၊ ဤ connection ကို သတ်မှတ်ထားသော `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) သို့မဟုတ်
upstream retry hint အတိုင်း cooldown ပြုလုပ်ကာ `backoffLevel` ကို မပြောင်းလဲဘဲ `skipProviderBreaker` ကို
သတ်မှတ်သည်။ သတ်မှတ်ပြတ်သားသော quota body က ဦးစားပေးနေဆဲဖြစ်သောကြောင့် quota pattern နှင့်လည်း ကိုက်ညီသော
body သည် quota verdict အဖြစ် ဆက်လက်ရှိသည်။ Detection: `src/shared/utils/classify429.ts` ရှိ
`looksLikeConcurrencyLimit()`; verdict: `open-sse/services/accountFallback/concurrencyLimit429.ts`။
`classify429()` (breaker ၏ `FailureKind`) သည် မပြောင်းလဲဘဲ ဤ body များအတွက် `rate_limit` ကို ဆက်လက်ဖတ်သည်။

**Stream content stall များသည် account ကို cooldown မပြုလုပ်ပါ။** Content-stall watchdog
(`open-sse/utils/streamHandler.ts`) သည် အချိန်အတွင်း model output မပို့သော stream ကို လက်လျှော့လိုက်သောအခါ
`markAccountUnavailable()` သည် connection ပေါ်တွင် error ကို မှတ်တမ်းတင်သော်လည်း cooldown မသတ်မှတ်ပါ။ Stall သည်
ထို request နှင့်သာ သက်ဆိုင်ပြီး အများအားဖြင့် output မထွက်သေးသော ရှည်လျားသည့် reasoning turn ဖြစ်သည်။
Operator များသည် `resilienceSettings.streamStallCooldown.enabled` (မူလ `false`) ဖြင့် ပြန်လည်ဖွင့်နိုင်သည်။

**`p2c` account ရွေးချယ်မှုအတွက် ရွေးချယ်ဖွင့်နိုင်သော latency signal။** Dispatch လုပ်ထားသော attempt တစ်ခုစီ၏
time-to-first-byte နှင့် outcome ကို connection တစ်ခုချင်းစီအလိုက် (connection + model အလိုက်လည်း) in-memory
rolling window တစ်ခုတွင် မှတ်တမ်းတင်သည်: 15 မိနစ်အတွင်း နောက်ဆုံး sample 20 ခု
(`open-sse/services/connectionLatencyTracker.ts`၊ `src/sse/handlers/chatHelpers.ts` ရှိ
`safeLogEvents()` မှ မှတ်တမ်းတင်သည်)။ `resilienceSettings.p2cLatency.weight` သည် `0`
အထက်ဖြစ်ပါက (အကွာအဝေး 0-20၊ မူလ `0` = ပိတ်ထားသည်) `src/sse/services/auth.ts` ရှိ
`compareP2CConnections()` သည် pair ၏ candidate တစ်ခုစီသို့ အများဆုံး `weight` points အထိ ပေါင်းထည့်သည်။
ထိုအမှတ်များ၏ တစ်ဝက်သည် ပိုမြန်သော candidate နှင့် နှိုင်းယှဉ်ထားသော latency ratio မှ ရရှိပြီး (နှစ်ဆနှေးပါက
တစ်ဝက်အပြည့် ရရှိသည်) ကျန်တစ်ဝက်သည် rolling error rate မှ ရရှိသည်။ Candidate နှစ်ခုစလုံးတွင် sample
အနည်းဆုံး 3 ခုရှိမှသာ ဤ term ကို အသုံးပြုသောကြောင့် account အသစ်များကို အပြစ်ပေးမည်မဟုတ်ပါ။ ထို့အပြင်
၎င်း၏ အမြင့်ဆုံးတန်ဖိုးသည် quota-blocked နှင့် quota-exhausted penalties များထက် နိမ့်နေဆဲဖြစ်သည်။
၎င်းသည် ကိုယ်ပိုင် circuit တစ်ခုကို မဖန်တီးပါ: failure ဖြစ်သော account များကို cooldown၊ lockout နှင့် breaker
အလွှာများက ဆက်လက်ကိုင်တွယ်သည်။ `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` ဖြင့် သတ်မှတ်ပါ။

**Reasoning frames များသည် content-stall budget ကို ပြန်လည်စတင်စေသည်။** Reasoning model တစ်ခုသည်
ပထမဆုံး မြင်ရသော token မထွက်မီ မိနစ်များစွာ စဉ်းစားနိုင်သည်: Claude သည် thinking စာသားအလွတ်ဖြစ်နိုင်သော
`thinking_delta` frames များကို stream လုပ်ပြီး Responses API သည် reasoning item တစ်ခုနောက်တစ်ခုကို stream
လုပ်သည်။ `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) သည် ဤ frames များကို
အသိအမှတ်ပြုပြီး watchdog သည် turn ကို cancel မလုပ်ဘဲ frame တစ်ခုစီတိုင်းတွင် ၎င်း၏ budget ကို ပြန်စသည်။
၎င်းတို့သည် model output မဟုတ်သေးသောကြောင့် reasoning သာဖြင့် အဆုံးသတ်သော turn ကို empty အဖြစ် ဆက်လက်
report လုပ်မည်ဖြစ်ပြီး reasoning ရပ်တန့်ကာ heartbeats များသာ ပို့သော turn သည် watchdog ကို ဆက်လက်
ဖြစ်ပေါ်စေမည်ဖြစ်သည်။

Kiro ၏ binary `reasoningContentEvent` frames များတွင် non-empty signature ပါရှိပါက executor မှတစ်ဆင့်
ဤ reasoning activity ကို empty `reasoning_content` delta အဖြစ် ထိန်းသိမ်းပေးသည်။ Signature ကို
forward မလုပ်ပါ။ Metadata၊ မပြည့်စုံသော frames နှင့် empty signatures များသည် content budget ကို
ပြန်မစပါ။ သီးခြား active-stream timeout နှင့် client cancellation များသည် ဆက်လက်သက်ရောက်သည်
(`open-sse/executors/kiro/reasoning.ts`)။

**Terminal states (cooldown မဟုတ်ပါ):**

- `banned` — banned-keyword / account-ban detection ဖြင့် သတ်မှတ်သည် ([BAN_DETECTION](../security/BAN_DETECTION.md) ကို ကြည့်ပါ)။ Upstream per-request refusals (`request_rejected`၊ ဥပမာ Anthropic OAuth 403 "Request not allowed") သည် ၎င်းကို မသတ်မှတ်ပါ: ၎င်းတို့ကို connection နှင့် model တစ်စုံစီအလိုက် ရေတွက်ပြီး တိုးပွားသော cooldown ဖြင့် ထို model ကို rotation မှ ဖယ်ရှားသည်။ Cooldown သည် `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h) ဖြင့် ကန့်သတ်ထားသည်။ Model မသိရှိပါက connection ကို cooldown ပြုလုပ်သည် — `open-sse/services/requestRejectedStreak.ts`
- `expired` (bounded retries ပြီးနောက် terminal သို့ ကူးပြောင်းသည် — exponential backoff ပါသော `EXPIRED_RETRY_MAX = 3` ဖြစ်သောကြောင့် ယာယီ OAuth errors များသည် account ကို အပြီးတိုင် deactivate မလုပ်မီ ကိုယ်တိုင် ပြန်လည်ကောင်းမွန်နိုင်သည်)
- `credits_exhausted`

ဤအခြေအနေများသည် credentials များပြောင်းလဲခြင်း သို့မဟုတ် operator တစ်ဦးက reset ပြုလုပ်ခြင်း မရှိမချင်း ဆက်လက်တည်ရှိနေမည်ဖြစ်သည်။ terminal states များကို ယာယီ cooldown state ဖြင့် မ overwrite ပြုလုပ်ပါနှင့်။

**Lazy recovery:** `rateLimitedUntil` အချိန်ကျော်လွန်သွားပါက connection သည် ပြန်လည်အသုံးပြုနိုင်သော အခြေအနေသို့ ရောက်ရှိလာမည်ဖြစ်သည်။ အောင်မြင်စွာအသုံးပြုပြီးနောက် `clearAccountError()` သည် error fields အားလုံးကို ရှင်းလင်းပေးသည်။

### Claude OAuth usage wall: ဦးစားပေးနိမ့် lane + session-limit reset

**Scope:** Claude subscription (OAuth) connection တစ်ခု။ Feature နှစ်ခုလုံးသည် **connection တစ်ခုချင်းစီအလိုက် opt-in** ပြုလုပ်ရသည် (Edit connection → Claude section → `lowPriorityMode` / `autoLimitReset` in `providerSpecificData`, နှစ်ခုစလုံး၏ မူလတန်ဖိုးမှာ off ဖြစ်သည်)။ ထို့အပြင် Claude Code ၏ `/low-priority` နှင့် `/limit-reset` commands များကို mirror ပြုလုပ်ထားသည် (wire contract ကို Claude Code 2.1.263 မှ ရယူထားသည်)။

**Implementation:**

- State machine + response classification: `open-sse/services/claudeLowPriority.ts`
- Reset status/claim client: `open-sse/services/claudeLimitReset.ts`
- Executor hook (header injection + same-account retry): `open-sse/executors/base.ts::execute()`
- Opt-in persistence: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Trigger:** 5-hour usage wall — headers များတွင် `anthropic-ratelimit-unified-status: rejected` ပါဝင်သော `429` ဖြစ်ပြီး၊ account သည် အသုံးပြုခွင့်ရှိသည့်အခါ `anthropic-ratelimit-unified-slow-offer: treatment` ပါဝင်ခြင်း။ ပထမဆုံး wall
429 မဖြစ်မချင်း မည်သည့်အရာမျှ ပေးပို့မည်မဟုတ်ပါ။ unified headers မပါသော burst 429 သည် ပုံမှန် cooldown path မှတစ်ဆင့် ဆက်လက်လုပ်ဆောင်မည်ဖြစ်သည်။

**ဦးစားပေးနိမ့် lane** (`lowPriorityMode`):

- wall 429 ဖြစ်သောအခါ executor သည် offer ကို လက်ခံပြီး **တူညီသော**
  account ဖြင့် `anthropic-usage-limit: slow` ထည့်ကာ ချက်ချင်း retry ပြုလုပ်သည်။ ကြေညာထားသော `anthropic-ratelimit-unified-reset` (+60s grace) အထိ lane သည် active ဖြစ်နေပြီး ထိုအချိန်အတွင်း request တိုင်းတွင် header ပါဝင်မည်ဖြစ်သည်။ ကြားဖြတ်ဖမ်းယူထားသော 429 သည် `handleChatCore` သို့ မရောက်ရှိသောကြောင့် connection ကို cooldown ထဲသို့ မထည့်သွင်းဘဲ အခြား connection သို့လည်း မလှည့်ပြောင်းပါ။
- နောက်ပိုင်း response များရှိ `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed` သည် lane ကို ဆက်လက်ထားရှိသည်။ `slot_busy` (429) သို့မဟုတ် `529` ဖြစ်ပါက server ၏ `anthropic-ratelimit-unified-slow-retry-after` ကို စောင့်ဆိုင်းပြီး (မူလ 20s၊ 5–600s အတွင်း clamp ပြုလုပ်ပြီး ±30% jitter ထည့်သည်) retry ပြုလုပ်သည်။ ဤလုပ်ဆောင်ချက်ကို `anthropic-ratelimit-unified-slow-max-wait` ဖြင့် ကန့်သတ်ထားသည် (မူလ 20 min၊ 1 min–6 h အတွင်း clamp ပြုလုပ်သည်) — ထိုအချိန်ကျော်လွန်ပါက lane ပိတ်သွားပြီး 10-minute cool-off သည် ပြန်လည်လက်ခံခြင်းကို တားဆီးမည်ဖြစ်သည်။ ထို့အပြင် စောင့်ဆိုင်းချိန်ကို request ၏ ကိုယ်ပိုင် upstream-start timeout (`resolveFetchStartTimeout`၊ မူလ 10 min) မှ 5 s margin နှုတ်ပြီး ကျန်ရှိသောအချိန်ထက် မပိုစေရန် ကန့်သတ်ထားသည်။ ထိုကန့်သတ်ချက်မရှိပါက မူလ 20-minute max-wait သည် request ထက် ပိုမိုကြာမြင့်နိုင်ပြီး စောင့်ဆိုင်းနေစဉ် sleep ကို အလယ်တွင် ရပ်တန့်စေကာ သင့်လျော်စွာ `max_wait` အဆုံးသတ်ခြင်းနှင့် cool-off ဖြစ်မည့်အစား `TimeoutError` ကို ပြသစေနိုင်သည်။
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`၊ 5h-window rollover သို့မဟုတ် `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (paid overage က wall ကို ယခုကာမိသောကြောင့် မည်သည့် status တွင်မဆို `extra_usage` အဖြစ် lane ကို အဆုံးသတ်သည်) တို့သည် lane ကို အဆုံးသတ်မည်ဖြစ်သည်။ ထို့နောက် response သည် ပုံမှန် cooldown path သို့ ဆက်လက်စီးဆင်းမည်ဖြစ်သည်။ `budget_exhausted` ကို ကြေညာထားသော budget reset အထိ (≤ 8 days) မှတ်သားထားမည်ဖြစ်သည်။
- Wall စစ်ဆေးမှုသည် executor ၏ ကိုယ်ပိုင် 400-driven intra-attempt retries (context editing၊ thinking/effort clamps၊ param auto-learn) ပြီးနောက် လုပ်ဆောင်သည်။ ထို့ကြောင့် ထို retry များအနက် တစ်ခုတွင်သာ ပေါ်လာသော wall 429 ကိုပင် cooldown path သို့ မရောက်ရှိစေဘဲ ကြားဖြတ်ဖမ်းယူနိုင်သည်။
- State သည် connection တစ်ခုချင်းစီအလိုက် memory ထဲတွင်သာ ရှိသည် (restart ပြုလုပ်ပါက ပြန်လည်လက်ခံရန် wall 429 တစ်ကြိမ် ထပ်မံလိုအပ်မည်)။

**Session-limit reset** (`autoLimitReset`၊ နှစ်ခုစလုံးဖွင့်ထားပါက lane မတိုင်မီ စမ်းသပ်သည်):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  block; `arm: "reset"` ဖြစ်ပြီး `available: true` ဖြစ်သည့်အခါ
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` ဖြင့်
  `{ "program": "juniper_tide" }` ကို ပေးပို့သည် (`providerSpecificData.organizationUUID` မှ organization UUID ကို ရယူပြီး bootstrap fallback အသုံးပြုသည်)။
- `result: reset|not_limited` ဖြစ်ပါက request ကို full speed ဖြင့် (slow header မပါဘဲ) retry ပြုလုပ်သည်။
  `already_used` / `not_offered` ဖြစ်ပါက `next_available_at` ကို memoise ပြုလုပ်သည် (မူလတန်ဖိုး တစ်ပတ်)။ Failure ဖြစ်ပါက မည်သည့်အခြေအနေမဆို 15 မိနစ် back off ပြုလုပ်သည်။ Reset ကို တစ်ပတ်လျှင်တစ်ကြိမ်သာ ပြုလုပ်နိုင်ပြီး weekly limit ထဲတွင် ဆက်လက်တွက်ချက်မည်ဖြစ်သည်။

Regression guards: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### ဘဏ်စနစ်ဖြင့် ပြန်လည်သတ်မှတ်မှုများကို အလိုအလျောက် အသုံးချပါ။

**နယ်ပယ်-** Codex နှင့် Claude စာရင်းသွင်းခြင်း (OAuth) ချိတ်ဆက်မှုများ။**ပါဝင်ရန်** − `bankedResetAutoApply` ဆက်တင်ကို ပုံမှန်အားဖြင့် `dry-run` မုဒ်တွင် ပိတ်ထားပြီး (ဆက်တင်များ → AI → အလိုအလျောက် ဘဏ်စနစ်ဖြင့် ပြန်လည်သတ်မှတ်မှုများကို အသုံးပြုသည်)။

**ရည်ရွယ်ချက်-** ဝန်ဆောင်မှုပေးသူကန့်သတ်ချက်များ စာမျက်နှာရှိ အော်ပရေတာအား စောင့်မျှော်နေမည့်အစား အကောင့်တစ်ခုသည် အသုံးပြုမှုနံရံကို ထိသောအခါ ဘဏ်စနစ်ဖြင့် ပြန်လည်သတ်မှတ်ခြင်းကို ၎င်းတို့ကိုယ်တိုင် သုံးစွဲပါ။

| ခရက်ဒစ်အမျိုးအစား (`creditTypes`) | ရွေးနှုတ်ခြင်းဟူသည် အဘယ်နည်း                                     | ဘယ်ကပြေးလဲ။                                                                     |
| --------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `codexCredits`                    | Codex ခရက်ဒစ်များကို ပြန်လည်သတ်မှတ်ပါ။                           | 60s တိုင်း၊ နောက်ခံအလုပ်                                                        |
| `claudeCredits`                   | Claude ဘဏ်ချေးငွေများ (`GRANT` ခရက်ဒစ်များ)                      | 60s တိုင်း၊ နောက်ခံအလုပ်                                                        |
| `claudeSessionReset`              | Claude အပတ်စဉ် စက်ရှင်-ကန့်သတ်ချက်ကို ပြန်လည်သတ်မှတ်ခြင်း (အထက်) | အကောင့်တစ်ခုချင်းဖွင့်ခြင်းကဲ့သို့ တူညီသောမူဝါဒအားဖြင့် တောင်းဆိုမှုလမ်းကြောင်း |

**အကောင်အထည်ဖော်ခြင်း-**

- သန့်ရှင်းသောဆုံးဖြတ်ချက် (လမ်းကြောင်းနှစ်ခုလုံးအတွက် သတ်မှတ်ထားသော စည်းမျဉ်းတစ်ခု)- `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- နောက်ခံအလုပ်- `src/lib/services/bankedResetAutoApply.ts` ( `src/instrumentation-node.ts` တွင်စတင်ခဲ့သည်)
- Claude တောင်းဆိုချက်-လမ်းကြောင်းဂိတ်- `src/lib/usage/claudeSessionResetPolicy.ts`၊ `setClaudeLimitResetPolicy()` မှတစ်ဆင့် `open-sse/services/claudeLimitReset.ts` တွင် စာရင်းသွင်းထားသည်။
- မှတ်တမ်း၊ စာထုပ်များနှင့် webhook- `src/lib/usage/bankedResetAudit.ts`
- API သမိုင်း : `GET /api/settings/banked-reset-auto/history?limit=50` (စီမံခန့်ခွဲမှု အထောက်အထား)

**ဆုံးဖြတ်ချက်အမိန့်** (ပထမပျက်ကွက်သော စည်းမျဉ်းသည် မှတ်တမ်းတင်ထားသော အကြောင်းရင်းဖြစ်သည်)။

1. လုပ်ဆောင်ချက် ပိတ်ခြင်း၊ ခရက်ဒစ်အမျိုးအစားပိတ်ခြင်း သို့မဟုတ် နယ်ပယ်ပြင်ပတွင် အကောင့် (`accountScope` `all` / `selected` နှင့် အကောင့်တစ်ခုချင်း `connections` မြေပုံ)။
2. ရွေးချယ်နိုင်သော UTC အချိန်ဇယားအပြင်ဘက် (`startHourUtc` > `endHourUtc` သန်းခေါင်ကျော်)။
3. ပြီးခဲ့သော 24 နာရီအတွင်း စာလုံးကြီး- `maxPerAccountPerDay` (1)၊ `maxPerDay` (3)၊ နှင့် `minSpacingMinutes` (30) မည်သည့် ရွေးနှုတ်မှုနှစ်ခုကြားတွင်မဆို။
4. အစပျိုး- နံရံကပ် `session` သို့မဟုတ် `weekly` ဝင်းဒိုးတစ်ခု ( `getQuotaWindowStatus().reachedThreshold` မှဖတ်သည်၊ `isAccountQuotaExhausted()` မဟုတ်ဘဲ၊ အသုံးပြုပြီးတိုင်းနှင့် အကောင့်တစ်ခုအား အစီရင်ခံသည့်) သို့မဟုတ် အနည်းဆုံး `expiringCreditMinUsedPercent` (50) အသုံးပြုထားသော အကောင့်တစ်ခုတွင် `expiringCreditHours` (24) အတွင်း သက်တမ်းကုန်ဆုံးသည့် ခရက်ဒစ်တစ်ခု။
5. သဘာဝအတိုင်း ပြန်လည်သတ်မှတ်ခြင်း- ကာရံထားသော 5 နာရီကြာတင်းပေါက်ကို `sessionResetGuardMinutes` (90) အတွင်း ပြန်လည်သတ်မှတ်သည့်အခါ သို့မဟုတ် `weeklyResetGuardHours` (12) အတွင်းရှိ ပတ်ပတ်လည်ဝင်းဒိုးများကို ပြန်လည်သတ်မှတ်သည့်အခါ ကျော်သွားပါ။
6. အပတ်စဉ်ကြမ်းပြင်- `weeklyFloorPercent` (10) အောက်ရှိ အပတ်စဉ်လက်ကျန်သည် 5 နာရီပြန်လည်သတ်မှတ်ခြင်းကို ကျော်ပါ။
7. `last-resort` မုဒ်- တူညီသောဝန်ဆောင်မှုပေးသူ၏ အခြားနယ်ပယ်တွင်းအကောင့်တွင် အနည်းဆုံး `poolHeadroomPercent` (10) ကျန်နေချိန်တွင် ကျော်သွားပါ။ သက်တမ်းကုန်ဆုံးခြင်း- ခရက်ဒစ်အစပျိုးမှုများသည် ၎င်းကို ကျော်ဖြတ်သည်။
8. `dry-run` အတန်းတစ်ခုကို မှတ်တမ်းတင်ပြီး မည်သည့်အရာကိုမျှ ရွေးနှုတ်မည်မဟုတ်ပါ။ `last-resort` နှင့် `eager` ကို ရွေးပါ။

ခွဲတမ်းဒေတာ ပျောက်ဆုံးနေသော ကူတာဝယ်ယူမှုအား မည်သည့်အခါမှ လော့ခ်ဖွင့်မည်မဟုတ်ပါ- အမည်မသိ ပြန်လည်သတ်မှတ်ချိန် သို့မဟုတ် အပတ်စဉ်အသုံးပြုမှု ကျော်လွန်သွားပါသည်။

**Claude စက်ရှင်ကို ပြန်လည်သတ်မှတ်သည်-** အင်္ဂါရပ်ကို ပိတ်ခြင်း သို့မဟုတ် `claudeSessionReset` ပိတ်ခြင်းဖြင့်၊ အကောင့်တစ်ခုချင်း `autoLimitReset` ခလုတ်သည် ယခင်ကဲ့သို့ အတိအကျ ဆုံးဖြတ်သည်။ နှစ်ခုလုံးကိုဖွင့်ထားခြင်းဖြင့်၊ အင်္ဂါရပ်သည် အကောင့်တစ်ခုချင်းခလုတ်များကို အစားထိုးပေးသည်- နယ်ပယ်အတွင်းအကောင့်တစ်ခုက ၎င်းကိုမူဝါဒခွင့်ပြုသည့်အခါမှသာ တောင်းဆိုနိုင်ပြီး `dry-run` မုဒ်တွင် မည်သည့်အရေးဆိုမှုမျှ ပြုလုပ်မည်မဟုတ်ပါ။

**ဘေးကင်းရေး-** အလုပ်သည် အမှတ်အသားတစ်ခုလျှင် ခရက်ဒစ်အများဆုံးကို ရွေးယူသည်၊ ခရက်ဒစ်များစာရင်းမသွင်းမီ ဆုံးဖြတ်သည် (ကျော်သွားသောအကောင့်ကို ဘယ်တော့မှ မဖော်ပြထားပါ)၊ idempotency keys `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` အသုံးပြုကာ စာရင်းမအောင်မြင်သော သို့မဟုတ် ရွေးနုတ်ပြီးနောက် အကောင့်တစ်ခုကို 1 နာရီကြာ ပိတ်ထားသည်။ ရွေးနုတ်ခြင်း၊ ကျရှုံးခြင်းနှင့် ခြောက်သွေ့သောဆုံးဖြတ်ချက်တိုင်းကို `audit_log` (`action: "bankedReset.redeem"`၊ တိုကင်များ သို့မဟုတ် ခရက်ဒစ် ID များမရှိပါ ) ဦးထုပ်များကို ထိုအတန်းများမှ ရေတွက်ထားသောကြောင့် ၎င်းတို့သည် ပြန်လည်စတင်ခြင်းများကို ရှင်သန်စေသည်။ အောင်မြင်သော ရွေးနုတ်ခြင်းများသည် `provider.reset_redeemed` webhook ကို ဖျက်ပေးပါသည်။

ဆုတ်ယုတ်မှုအစောင့်များ- `tests/unit/banked-reset-policy.test.ts`၊ `tests/unit/banked-reset-auto-apply.test.ts`၊ `tests/unit/claude-limit-reset-policy-gate.test.ts`၊ `tests/unit/banked-reset-history-route.test.ts`။

### Session affinity (#7274)

**Scope:** client session တစ်ခု (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) ကို provider မည်သည့်အမျိုးအစားမဆို connection တစ်ခုတည်းသို့ ချိတ်ဆက်ထားခြင်း။

**ရည်ရွယ်ချက်:** multi-turn agent (Claude Code၊ aider၊ custom agents) ကို request များအကြား account တစ်ခုတည်းတွင် ဆက်လက်ထားရှိရန်ဖြစ်သည်။ ထိုသို့ပြုလုပ်ခြင်းဖြင့် per-account session state ရှိသော provider များတွင် cross-account context ပျောက်ဆုံးခြင်းနှင့် ထပ်ခါတလဲလဲ ဖြစ်ပေါ်သော cold-start 429 များကို လျှော့ချပေးသည်။

**Implementation:**

- TTL resolution: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Header extraction (generic, any provider): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Persisted pin table: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Setting: `sessionAffinityTtlMs` (global TTL in ms, `0` disables) — `src/lib/db/settings.ts`. Codex-only `codexSessionAffinityTtlMs` မှ migration `124_generic_session_affinity_ttl.sql` ဖြင့် အမည်ပြောင်းထားခြင်းဖြစ်ပြီး ယခင်သတ်မှတ်ထားသော Codex TTL ရှိပါက အသစ် default အဖြစ် ဆက်လက်သုံးစွဲသည်။

#7274 မတိုင်မီ `resolveSessionAffinityTtlMs()` သည် `codex` မှလွဲ၍ provider အားလုံးအတွက် `0` သို့ ချက်ချင်းရပ်တန့်သွားသဖြင့် TTL setting (နှင့် session headers) သည် အခြားနေရာများတွင် မည်သည့်အကျိုးသက်ရောက်မှုမျှ မရှိခဲ့ပါ။ သို့သော် pinning mechanism နှင့် header extraction တို့မှာ provider-agnostic ဖြစ်ပြီးသား ဖြစ်သည်။ ပြင်ဆင်ချက်အနေဖြင့် ထို early-return ကို ဖယ်ရှားလိုက်သောကြောင့် global အနေဖြင့် `0` ထက်ကြီးသော တန်ဖိုးသတ်မှတ်ပြီးသည်နှင့် TTL သည် provider အားလုံးတွင် တစ်ပြေးညီ သက်ရောက်မည်ဖြစ်သည်။

Session-affinity headers သုံးခုကို upstream သို့ မည်သည့်အခါမျှ forward မပြုလုပ်ပါ။ အကြောင်းမှာ executors များသည် client headers များကို တိုက်ရိုက်မပို့ဘဲ ကိုယ်ပိုင် upstream headers များကို အစမှ ပြန်လည်တည်ဆောက်သောကြောင့် ဖြစ်သည်။ ထို့ကြောင့် ၎င်းသည် internal correlation id တစ်ခုအဖြစ်သာ ဆက်လက်ရှိမည်ဖြစ်သည်။

### သီးသန့်စီမံခန့်ခွဲထားသော session connection leases

**အကျုံးဝင်မှု:** လက်ရှိအသုံးပြုနေသော managed HTTP client/session တစ်ခုသည် အသုံးပြုနိုင်သော OmniRoute connection တစ်ခုကို ပိုင်ဆိုင်သည်။

**ရည်ရွယ်ချက်:** request များတစ်လျှောက် တင်းကျပ်သော routing ကန့်သတ်ချက် လိုအပ်သည့် client များအတွက် တည်မြဲသော သီးသန့် connection ပိုင်ဆိုင်မှုကို ပေးရန် ဖြစ်သည်။ ၎င်းသည် ပျော့ပြောင်းသော ဆက်လက်အသုံးပြုမှု ဦးစားပေးချက်ဖြစ်သည့် session affinity နှင့် ကွာခြားသည်။
သီးသန့် lease သည် lifecycle state ကို SQLite တွင် ဆက်လက်သိမ်းဆည်းထားပြီး၊ ကမ္ဘာလုံးဆိုင်ရာ active-owner နှင့်
active-connection တစ်ခုတည်းသာရှိမှုကို အတည်ပြုကာ provider သို့ dispatch မလုပ်မီ မသက်ဆိုင်တော့သော generation ကို
ငြင်းပယ်သည်။

ဤ feature ကို API key တစ်ခုချင်းစီအလိုက် ရွေးချယ်အသုံးပြုနိုင်သည်။ managed key တစ်ခုတွင် `lease:exclusive` scope နှင့်
အလွတ်မဟုတ်သော `allowedConnections` စာရင်းကို အတိအလင်း သတ်မှတ်ထားရမည်။ မည်သည့် HTTP client မဆို lifecycle endpoint ကို အသုံးပြုနိုင်ပြီး၊
client name၊ user-agent၊ provider၊ OAuth method သို့မဟုတ် model တစ်ခုမျှ မလိုအပ်ပါ။ lease သည် model ကို မဟုတ်ဘဲ connection ကို ပိုင်ဆိုင်သောကြောင့်
connection သည် ပုံမှန်အတိုင်း အသုံးပြုနိုင်နေသရွေ့ model ပြောင်းလဲခြင်းက binding ကို ထိခိုက်စေမည် မဟုတ်ပါ။ ပုံမှန် model၊ quota၊ health၊ cooldown နှင့် allowlist စည်းမျဉ်းများသည် ဆက်လက်အာဏာရှိပြီး
တူညီသော generation ကို အခြား လွတ်လပ်၍ အသုံးပြုနိုင်သော connection တစ်ခုသို့ ပြောင်းရွှေ့နိုင်သည်။

Lifecycle သည် JSON actions `acquire`၊ `renew` နှင့် `release` ပါဝင်သော `POST /api/v1/session-leases` ဖြစ်သည်။
Managed inference requests များတွင် opaque `X-OmniRoute-Lease-Owner` တန်ဖိုးနှင့် အတိအကျကိုက်ညီသော
`X-OmniRoute-Lease-Generation` ကို ထည့်သွင်းပေးရမည်။ owner သည် `vlo_` ဖြင့် စတင်ပြီး base64url အက္ခရာ 43 လုံး ပါဝင်သည်။ ၎င်း၏ SHA-256 hash ကိုသာ သိမ်းဆည်းသည်။
Lease ထိန်းချုပ်ရေး headers များကို logs၊ သိမ်းဆည်းထားသော request snapshots နှင့် upstream executor headers များမှ ဖယ်ရှားထားသည်။

ပုံမှန် routing တွင် အသုံးပြုနိုင်သော managed candidates များ ရှိသော်လည်း လွတ်လပ်သော candidate အားလုံးကို အခြားသူ၏ active lease က ပိုင်ဆိုင်နေပါက
OmniRoute သည် HTTP `429`၊ lease-capacity-unavailable code၊ waiting-for-capacity state နှင့် သက်ဆိုင်ရာ အစောဆုံး expiry မှ ဆင်းသက်တွက်ချက်ထားသော အကန့်အသတ်ရှိ
`Retry-After` တန်ဖိုးကို ပြန်ပေးသည်။ ပုံမှန်အတိုင်း အသုံးပြုနိုင်သော candidate မရှိခြင်းသည် lease contention မဟုတ်သောကြောင့်
ရှိပြီးသား routing error semantics ကို ဆက်လက်အသုံးပြုသည်။

ဆက်စပ်သည့် mechanisms များသည် သီးခြားစီ ဆက်လက်ရှိနေသည် -

- OAuth session occupancy သည် OAuth accounts များအတွက် process-local soft distribution ဖြစ်သည်။
- Account semaphores များသည် request-concurrency permits များကို ခွင့်ပြုပေးပြီး request ပြီးဆုံးချိန်တွင် အဆုံးသတ်သည်။
- Exclusive managed session leases များသည် generation fence ပါဝင်သော တည်မြဲသည့် lifecycle ပိုင်ဆိုင်မှု ဖြစ်သည်။

## ၃။ မော်ဒယ် လော့ခ်ချခြင်း

**သက်ဆိုင်ရာအတိုင်းအတာ:** provider + connection + model သုံးခုတွဲ။

**အခြေအနေအလိုက် scope:** လော့ခ်ချမှုရေးသားမည့် key ကို အမှားဖြစ်စေသော status က ဆုံးဖြတ်သည်
(`open-sse/services/accountFallback/exactModelLock.ts` ရှိ `resolveLockoutScope()`):

- `429` / `403` / `402` — quota သို့မဟုတ် entitlement အချက်ပြမှုဖြစ်သောကြောင့် **quota family** ကို လော့ခ်ချသည်:
  codex အတွက် connection ၏ `gpt-5*` မော်ဒယ်အားလုံးပါဝင်သည့် `codex` / `spark` scope တစ်ခုလုံးကို လော့ခ်ချပြီး၊
  အခြား provider များအတွက် `getQuotaScopedModelForProvider()` ကို အသုံးပြုသည်။
- `404` သည် bare model ကို လော့ခ်ချသည် (`getModelLockKey()` က `not_found` ကို ပိုမိုကျဉ်းမြောင်းသတ်မှတ်သည်)။
- အခြား status များ — `5xx` transport/server အမှားများနှင့် quality validation မှ OmniRoute ကိုယ်တိုင်
  ဖန်တီးသော `502` — သည် provider/connection/model အတိအကျ သုံးခုတွဲကိုသာ လော့ခ်ချသည်။
  မော်ဒယ်တစ်ခုတွင် stream မကောင်းခြင်းသည် account ၏ quota နှင့်ပတ်သက်သော အထောက်အထားမဟုတ်ပါ;
  ဤစည်းမျဉ်းမတိုင်မီက `codex/gpt-5.6-luna` တွင် response အလွတ်တစ်ခုရုံဖြင့် ထို connection ၏
  `gpt-5*` မော်ဒယ်အားလုံးကို routing မှ ၂–၃၀ မိနစ်အထိ (အဆင့်မြင့်လာသည်နှင့်အမျှ ကြာချိန်တိုး၍)
  ဖယ်ရှားခဲ့သော်လည်း ၎င်း၏ quota သည် မထိခိုက်ခဲ့ပါ။
- Caller ၏ သတ်မှတ်ပေးထားသော `scope` option သည် အမြဲတမ်း ဦးစားပေးအနိုင်ရသည် (Antigravity က `"exact"` ကို ပေးပို့သည်)။

**ရည်ရွယ်ချက်:** မော်ဒယ်တစ်ခုတည်း မရရှိနိုင်ခြင်း သို့မဟုတ် quota ကန့်သတ်ခံရခြင်းဖြစ်သည့်အခါ
connection တစ်ခုလုံးကို ပိတ်မထားစေရန်။

**ဥပမာများ:**

- 429 ပြန်ပေးသော per-model quota provider များ
- မရှိသော မော်ဒယ်တစ်ခုအတွက် 404 ပြန်ပေးသော local provider များ
- Provider သီးခြား mode/model ခွင့်ပြုချက် အမှားများ (ဥပမာ Grok modes)

**အကောင်အထည်ဖော်မှု:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`။

### မော်ဒယ် Cooldown Dashboard (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

လက်ရှိအသက်ဝင်နေသော lockout များကို provider၊ connection၊ model၊ အကြောင်းပြချက်၊ expiresAt တို့ဖြင့် စာရင်းပြသည်။
Operator များသည် card မှ မော်ဒယ်တစ်ခုကို ကိုယ်တိုင် ပြန်လည်အသုံးပြုနိုင်အောင် ဖွင့်ပေးနိုင်သည်။

**REST API:**

- `GET /api/resilience/model-cooldowns` — လက်ရှိအသက်ဝင်နေသော lockout များကို စာရင်းပြသည်
- `DELETE /api/resilience/model-cooldowns` — ကိုယ်တိုင် ပြန်လည်အသုံးပြုနိုင်အောင် ဖွင့်ပေးသည်။ Body: `{provider, connection, model}`။ Auth: management။

### Cooldown Manager

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`)။

ယာယီအကြောင်းပြချက်ကြောင့် routing မှ ဖယ်ထားရသော connection တစ်ခုချင်းစီအတွက် provider စာမျက်နှာတစ်ခုချင်းစီကို
ဖွင့်စရာမလိုဘဲ စာမျက်နှာတစ်ခုတည်းတွင် စီမံနိုင်သည်။ ၎င်းသည် connection cooldown များ၊ model lockout များနှင့်
terminal state များကို စာရင်းပြပြီး၊ connection တစ်ခုချင်းစီအလိုက်၊ ရွေးချယ်ထားသည့်အစုအတွက် သို့မဟုတ် provider
တစ်ခု၏ connection အားလုံးအတွက် ရှင်းလင်းနိုင်သည်။ ထို့အပြင် အများဆုံးချိန်ညှိအသုံးပြုသည့် cooldown စည်းမျဉ်းများဖြစ်သော
`streamStallCooldown.enabled` နှင့် OAuth / API-key `connectionCooldown` ၏ အခြေခံ cooldown နှင့်
အများဆုံး backoff အဆင့်များကို တည်းဖြတ်နိုင်သည် (`PATCH /api/resilience` မှတစ်ဆင့် သိမ်းဆည်းသည်)။
Terminal state များ (`banned`, `expired`, `credits_exhausted`) ကို စာရင်းပြသော်လည်း ဤနေရာမှ မည်သည့်အခါမျှ
ရှင်းလင်းမည်မဟုတ်ပါ။

ထိုစာမျက်နှာတစ်ခုတည်းရှိ **Error cooldown rules** card သည် operator error rules
(`settings.providerErrorRules`) နှင့် provider တစ်ခုချင်းစီအတွက် catch-all defaults
(`settings.providerErrorDefaults`) ကို `PATCH /api/settings` မှတစ်ဆင့် တည်းဖြတ်သည် — ၎င်းတို့
ကိုက်ညီပုံအတွက် §7 အောက်ရှိ "Operator-declared rules" ကို ကြည့်ပါ။ ကြာချိန်များမှာ Default (အတိအကျ
cooldown မသတ်မှတ်ထားခြင်း)၊ ၃၀ မိနစ်၊ ၁ နာရီ၊ ၅ နာရီ၊ ၂၄ နာရီ သို့မဟုတ် ၁ မိနစ်မှ ၄၃,၂၀၀ မိနစ်
(ရက် ၃၀) အထိ စိတ်ကြိုက်သတ်မှတ်နိုင်သည်။

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — status၊ ကျန်ရှိသော cooldown၊ backoff အဆင့်၊ နောက်ဆုံးအမှားအမျိုးအစားနှင့်
  model lockout များပါဝင်သော connection များ (အထောက်အထားများမပါ)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` သို့မဟုတ်
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` ကို ပြန်ပေးသည်

### Lockout settings UI + အောင်မြင်မှုအလိုက် လျော့ကျပြန်လည်ရယူခြင်း (v3.8.23)

Model lockout သည် အမြဲဖွင့်ထားသော hardcoded အပြုအမူမှ ကိုယ်ပိုင် settings card နှင့်
မိမိကိုယ်တိုင် ပြန်လည်ကောင်းမွန်နိုင်သည့် recovery လမ်းကြောင်းပါဝင်သော အပြည့်အဝချိန်ညှိနိုင်သည့်
opt-in feature အဖြစ် ပြောင်းလဲလာသည်။

**Settings card:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)။
၎င်းသည် အထက်တွင်ဖော်ပြထားသော ဖတ်ရန်သာ `ModelCooldownsCard` နှင့် **သီးခြား** ဖြစ်သည်
(၎င်းသည် လက်ရှိ lockout များကိုသာ _စာရင်းပြ_ သည်) — card အသစ်သည် _parameter များကို
ချိန်ညှိသတ်မှတ်_ ပေးသည်။ Default များကို
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) တွင် သတ်မှတ်ထားသည်။

| Setting                 | Default                          | Meaning                                                           |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------- |
| `enabled`               | `false`                          | Master toggle — model lockout သည် **ပုံမှန်အားဖြင့် ပိတ်ထားသည်**။ |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | model-scoped failure အဖြစ် သတ်မှတ်မည့် upstream status များ။      |
| `baseCooldownMs`        | `120_000` (120 s)                | ပထမဆုံးအမှားအတွက် ကနဦး lockout ကြာချိန်။                          |
| `maxCooldownMs`         | `1_800_000` (30 min)             | အဆင့်မြင့်လာသော cooldown အတွက် အများဆုံးကန့်သတ်ချက်။              |
| `maxBackoffSteps`       | `10`                             | exponential-backoff အဆင့်မြှင့်မှုအတွက် အများဆုံးအဆင့်များ။       |
| `useExponentialBackoff` | `true`                           | ထပ်ခါတလဲလဲဖြစ်သော အမှားများတွင် cooldown ကို အဆင့်လိုက်တိုးမတိုး။ |

Settings များကို ပုံမှန် settings store မှတစ်ဆင့် သိမ်းဆည်းပြီး resilience settings schema ဖြင့်
စစ်ဆေးအတည်ပြုသည်။ ထို့အပြင် card သည် `baseCooldownMs`/`maxCooldownMs`
(`maxCooldownMs ≥ baseCooldownMs` ဖြစ်ရမည်) နှင့် `maxBackoffSteps` တို့၏ တန်ဖိုးများကို
ခွင့်ပြုနိုင်သည့်အကန့်အသတ်အတွင်း ထိန်းညှိပေးသည်။

**အောင်မြင်မှုအလိုက် လျော့ကျပြန်လည်ရယူခြင်း:** recovery သည် timer ကုန်ဆုံးခြင်းတစ်ခုတည်းအပေါ်
မူတည်သည်မဟုတ်ပါ။ ကောင်းမွန်သော response တစ်ခုရရှိပါက model ၏ failure count ကို တဖြည်းဖြည်း
လျှော့ချပေးသဖြင့် အလယ်ပိုင်းတွင် ပြန်လည်ကောင်းမွန်လာသော model သည် escalation ကို ဆက်လက်မဖြစ်စေတော့ဘဲ
timer မကုန်ဆုံးမီပင် ရပ်တန့်ပြီး ရှင်းလင်းနိုင်သည်။ အောင်မြင်သော combo target တစ်ခုရရှိသည့်အခါ
`open-sse/services/combo.ts` သည် `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) ကို ခေါ်ဆိုပြီး သိမ်းဆည်းထားသော
`failureCount` ကို **တစ်ဝက်လျှော့ချ** သည် (`Math.floor(failureCount / 2)`)။ ၎င်းသည် `0` သို့
ရောက်ရှိသောအခါ lockout entry ကို လုံးဝဖျက်ပစ်သည်။ ဆန့်ကျင်ဘက်ဖြစ်သော
`recordModelLockoutFailure()` သည် escalation window အတွင်း အမှားများဖြစ်ပေါ်ပါက count ကို
တိုးမြှင့်ပြီး cooldown ကို အဆင့်မြှင့်သည်။ ဤအောင်မြင်မှုအလိုက် လျော့ကျမှုသည် ပုံမှန် timer
ကုန်ဆုံးမှုအပြင် ထပ်ဆောင်းလုပ်ဆောင်မှုဖြစ်ပြီး — မည်သည့်လမ်းကြောင်းမဆို model ကို
ပြန်လည်အသုံးပြုနိုင်အောင် ဖွင့်ပေးနိုင်သည်။

**အခြေအနေ:** lockout များကို **မှတ်ဉာဏ်အတွင်း** ထိန်းသိမ်းထားသည် (`Map`s များကို လုပ်ငန်းစဉ်တစ်ခုချင်းစီအလိုက် `ModelLockoutEntry` ဖြင့် `provider:connectionId:model` အပေါ် အညွှန်းပြုထားပြီး၊ exact-scope lock များကို `provider:connectionId:exact:model` ဖြင့် အညွှန်းပြုထားသည်)။ DB သို့ မသိမ်းဆည်းထားသောကြောင့် ပြန်လည်စတင်သည့်အခါ ပျောက်ဆုံးသွားသည်။ _ဆက်တင်များ_ ကို သိမ်းဆည်းထားသော်လည်း လက်ရှိအသုံးပြုနေသော lockout _အခြေအနေ_ မှာ ယာယီသာဖြစ်သည်။

---

## 4. Quota-Share Concurrency Control (v3.8.36)

စာရင်းသွင်းအကောင့်များ (GLM၊ MiniMax စသည်ဖြင့်) သည် ~ 1-3 တစ်ပြိုင်နက် တောင်းဆိုမှုများကိုသာ လက်ခံလေ့ရှိသည်။ ၎င်းထက်ကျော်လွန်ပါက 429s နှင့် cooldowns တို့ကို အစပြုသည်။ ဤသည် စူးရှသောအော**ခွဲတမ်းခွဲတမ်း** (`qtSd/…`) ပေါင်းစပ်မှုများ၊ API သော့အများအပြားသည် အထက်ရေစီးကြောင်းအကောင့်တစ်ခုအား မျှဝေသည်။ အလွှာသုံးလွှာသည် မျှဝေထားသောအကောင့်ကို ရေလွှမ်းမိုးခြင်းမှ ကင်းဝေးစေသည်။

### ချိတ်ဆက်မှုတစ်ခုချင်း ပေါင်းစပ်ငွေကြေးထုပ် (`max_concurrent`)

ပံ့ပိုးသူချိတ်ဆက်မှုတစ်ခုစီသည် `max_concurrent` မျက်နှာကျက်တစ်ခု (`provider_connections.max_concurrent`၊ ချိတ်ဆက်မှုပုံစံ / API / DB) တွင် သတ်မှတ်ထားသည်။ အကန့်အသတ်မရှိ အလွတ်ထားလိုက်ပါ။ ၎င်းသည် — အောက်ရှိ အမှတ်စဉ်အလွှာကို အကောင့်၏ တူညီသောငွေကြေးအဖြစ် သတ်မှတ်ပေးသည့် တစ်ခုတည်းသော ခလုတ်ဖြစ်သည် (ဥပမာ GLM ~ 1၊ MiniMax ~ 2)။

### မော်ဒယ်အလိုက် တွဲဖက်ငွေထုပ်များ (`modelConcurrency`)

ချိတ်ဆက်မှုတစ်ခုသည် ၎င်း၏ `rateLimitOverrides` မြေပုံအတွင်း၌ မော်ဒယ်အလိုက် တူညီသော ငွေကြေးမျက်နှာကျက်များကို ထပ်မံကြေငြာနိုင်သည်-

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

၎င်းကို ချိတ်ဆက်မှုပုံစံတွင် သတ်မှတ်ပါ (**နှုန်းကန့်သတ်ချက်သည် → မော်ဒယ်တစ်ခုချင်း ပေါင်းစပ်ငွေကြေးထုပ်များကို လွှမ်းမိုးသည်။** တစ်ကြောင်းလျှင် `model=cap` တစ်ခု) သို့မဟုတ် တူညီသော JSON ပုံသဏ္ဍာန်ဖြင့် `PATCH /api/providers/[id]` မှတဆင့်။ အဓိက ဝေါဟာရ-

- **ချိတ်ဆက်မှု ကျယ်ပြန့်ခြင်းနှင့် မော်ဒယ်အလိုက် ချိတ်ဆက်မှု-** `maxConcurrent` မျှဝေထားသော ချိတ်ဆက်မှု ကျယ်ပြန့်သော မျက်နှာကျက်အဖြစ် ကျန်ရှိနေပါသည်။ နှစ်ခုစလုံးကို အသုံးချသောအခါ၊ တံခါးနှစ်ခုစလုံးသည် တူညီသောပေါင်းစပ်ဂိတ် (`global → provider → account → model`) တွင် အက်တမ်ဖြင့် ရရှိသည်။ ထိရောက်သော အပြုအမူသည် ပြင်းထန်သော ကန့်သတ်ချက်ဖြစ်သည်။
- **မော်ဒယ်-ကီး အတိအကျ ကိုက်ညီမှု-** သော့ချက်မှာ လမ်းကြောင်းဖြေရှင်းချက် — လမ်းကြောင်းပြောင်းပြီးနောက် ပုံမှန်အားဖြင့် မော်ဒယ်လ် အိုင်ဒီ (`glm-5`) မဟုတ်ဘဲ ကလိုင်းယင့်ဘက်ခြမ်း `provider/model` alias မဟုတ်ပါ (`zai/glm-5` `glm-5` နှင့် မကိုက်ညီပါ)။ တန်ဖိုးများသည် အပေါင်း-ကိန်းပြည့် တစ်ပြိုင်တည်း-တောင်းဆိုမှု မျက်နှာကျက်များဖြစ်သည်။
- **ဒေသတွင်း တန်းစီစောင့်ဆိုင်းခြင်း၊ ရှာဖွေတွေ့ရှိခြင်းမရှိပါ** ရှိပြီးသား queue/timeout ဝေါဟာရများ ( `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` ရိုက်ထည့်ထားသော ဝန်ခံချက်အမှားများ) ဖြင့် ပြည်တွင်းတွင် ပိုလျှံသော တောင်းဆိုမှုများ တန်းစီနေသည်။ OmniRoute ရေစီးကြောင်းပေါ်လစီကို — ရှာဖွေတွေ့ရှိခြင်း သို့မဟုတ် ကောက်ချက်မချပါ ပြည့်နှက်နေသော မော်ဒယ်လ်ဂိတ်သည် ဝန်ဆောင်မှုပေးသူကို ဘယ်သောအခါမှ မပိတ်ဘဲ အမြဲတမ်း မော်ဒယ်လော့ခ်ချခြင်းကို ဘယ်တော့မှ မဖန်တီးနိုင်ပါ။ အထက်စီးကြောင်း 429/cooldown/fallback အပြုအမူသည် အမှားအယွင်းဖြစ်နေဆဲဖြစ်သည်။
- **ချိတ်ဆက်မှုတစ်ခု၊ လုပ်ငန်းစဉ်တစ်ခုစီ နယ်ပယ်-** ထုပ်များသည် ဒေတာဘေ့စ်ချိတ်ဆက်မှုတစ်ခုဖြစ်ပြီး မှတ်ဉာဏ်တွင် သိမ်းဆည်းထားသောကြောင့် တူညီသောအထက်ပိုင်း API သော့ကို ပြန်လည်အသုံးပြုသည့် ချိတ်ဆက်မှုနှစ်ခုသည် တစ်ခုနှင့်တစ်ခု မပူးပေါင်းနိုင်ပါ။
- **Unconfigured ဆိုသည်မှာ မပြောင်းလဲသော၊** မြေပုံကို ချန်လှပ်ခြင်း (သို့မဟုတ် ဒက်ရှ်ဘုတ်အကွက်ကို ကွက်လပ်ချန်ထား) သည် မော်ဒယ်ဂိတ်ကို မထည့်ပါ။ universal provider limit ကို အတည်မပြုဘဲ နမူနာပုံစံဖွဲ့စည်းခြင်း-

```text
glm-5=1
glm-4.7=3
```

### Quota-share တောင်းဆိုမှု အမှတ်စဉ်

ခွဲတမ်းမျှဝေမှု ဖြန့်ဝေမှုသည် အပြုသဘော `max_concurrent` ကြေငြာသည့် ချိတ်ဆက်မှုတစ်ခုအား ပစ်မှတ်ထားသောအခါ၊ ၎င်းကို တစ်ပြိုင်တည်း တောင်းဆိုမှုများ၊**အကောင့်** per-connection semaphore (သော့ `qsconn:<connectionId>`) : ပိုလျှံတောင်းဆိုမှုများမှတဆင့် အမှတ်စဉ်များ**တန်းစီစောင့်ဆိုင်းပါ။** အကောင့်ကိုရေလျှံမယ့်အစား။ အဲဒါ**ပျက်ကွက်-ဖွင့်** — ပေးပို့နိုင်သော တောင်းဆိုချက်ကို ငြင်းပယ်ခြင်းထက် အထိုင်မပါပဲ အချိန်ကုန်သွားပါသည်။ အဖွင့်အပိတ်လုပ်ပါ။**ဆက်တင်များ → Resilience → Quota-share per-connection concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`၊ ပုံသေဖွင့်ထားသည်)။ `max_concurrent` ဦးထုပ်မပါရင် အပြုအမူက မပြောင်းလဲပါဘူး။

> quota-share routing gate (`selectQuotaShareTarget`၊ DRR + P2C) သည် သူ့အလိုလို ပျက်ကွက်နေပြီး _deprioritizes_ single-connection pool ဖြင့် — တွင်သာ _deprioritizes_ ၎င်းသည် hard-limit မရနိုင်သောကြောင့် ဤ semaphore သည် အမှန်တကယ်တွင် ရေလွှမ်းမိုးခြင်းပါ၀င်ပါသည်။

### Combo cooldown-aware ထပ်စမ်းကြည့်ပါ။

ပေါင်းစပ်နည်းဗျူဟာတိုင်းအတွက် (ဖွင့်ထားသည့်အခါ) SHORT ယာယီ cooldown တစ်ခုအတွက် 429 ကို ပုံဆောင်ခဲဖြစ်စေမည့် တောင်းဆိုချက်သည် ၎င်းကို စောင့်ဆိုင်းပြီး 429 — ကို ပြန်မပေးဘဲ ၎င်းသည် Gemini-class TPM/RPM windows (~ 60s ပြန်လည်ကြိုးစားပြီးနောက်) တွင် အကျုံးဝင်ပါသည်၊ ဥပမာ- မော်ဒယ် ကွန်ဘိုများ နှစ်ခုစလုံးကို ကန့်သတ်နှုန်းတစ်ခုလျှင် del 2 နှစ်ခုစလုံးကို ထိမှန်ပါသည်။ `comboCooldownWait` (`enabled`၊ `maxWaitMs`၊ `maxAttempts`၊ `budgetMs`) ဖြင့် ကန့်သတ်ထားသည်**ဆက်တင်များ → ခံနိုင်ရည်အား** . ၎င်းသည် `quota_exhausted` (သန်းခေါင်အထိသော့ခတ်ထားသည်) သို့မဟုတ် auth/not-found အကြောင်းပြချက်များကို မည်သည့်အခါမျှ မစောင့်ပါ။ `comboTimeoutMs` သတ်မှတ်ခြင်းဖြင့်၊ ထိုနောက်ဆုံးရက်မတိုင်မီ မပြီးဆုံးနိုင်သော စောင့်ဆိုင်းခြင်း (#18998) : ပေါင်းစပ်သည် `COMBO_TIMEOUT` 504 အစား ၎င်း၏ terminal တုံ့ပြန်မှုဖြင့် ချက်ခြင်း အဖြေပေးသည်။

ပေါင်းစပ်တစ်ခုသည် `config.comboCooldownWaitEnabled: false` ဖြင့် ထွက်နိုင်သည်။ ပကတိ `false` သာလျှင် ဤမျှဝေထားသော ပေါင်းစပ်စောင့်ဆိုင်းမှုများ (post-dispatch cooldown နှင့် pre-dispatch circuit-open/model-lock waits) နှင့် ၎င်းတို့၏ wait-budget timeout-floor extension ကို ပိတ်သည်။ ပျောက်ဆုံးနေသည် သို့မဟုတ် `true` ကမ္ဘာလုံးဆိုင်ရာမူဝါဒကို ထိန်းသိမ်းသည်။ `true` စောင့်ဆိုင်းခြင်းကို တစ်ကမ္ဘာလုံး ပိတ်ထား၍မရပါ။ ပြတ်သားသော `targetTimeoutMs` နိုင်ဆဲဖြစ်သည်။ ဤဖယ်ထုတ်ခြင်းသည် သီးခြားဇာတိ-Codex turn-pin ကြိုတင်ပေးပို့မှုစောင့်ဆိုင်းခြင်းကို မပြောင်းလဲပါ။

တူညီသောတံခါးသည် ကြိုတင်ပေးပို့ခြင်းကိစ္စ (#16319) : ၎င်း၏မော်ဒယ်သည် ခေတ္တခဏသော့ပိတ်မှုတွင်ရှိနေသောကြောင့် ကြိုးပမ်းမှုတစ်စုံတစ်ရာမပြုလုပ်မီ combo တစ်ခု၏ပစ်မှတ်တိုင်းကို ကျော်သွားသည့်အခါ၊ သုညကြိုးစားမှုလမ်းကြောင်းသည် အရိပ်အမြွက်နည်းပါးသော `503 ALL_TARGETS_SKIPPED` ဖြေဆိုမည့်အစား တူညီသောမျက်နှာကျက်အောက်တွင်သော့ခတ်ပြီး ပြန်လည်ပေးပို့သည်။ စောင့်ဆိုင်းခြင်းကို ခွင့်မပြုသောအခါ (မျက်နှာကျက်၊ ကြိုးပမ်းမှု သို့မဟုတ် ဘတ်ဂျက်ကုန်သွားသောအခါ သို့မဟုတ် အင်္ဂါရပ်ကို ပိတ်ထားသည်)၊ အစောဆုံးသော့ခတ်မှု သက်တမ်းကုန်ဆုံးချိန်မှ `retry_after` `reset_at` `429 rate_limit_error` သို့ terminal တုံ့ပြန်မှု အဆင့်မြှင့်တင်မှု အဆင့်မြှင့်တင်သည်။ ခွဲတမ်း၊ အထောက်အထားနှင့် မတွေ့ရှိရသောသော့ခလောက်များသည် အရိပ်အမြွက်နည်း 503 ကို ဆက်ထားသည်။

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. တောင်းဆိုမှုတန်းစီစာရင်း ဝင်ခွင့်ထိန်းချုပ်မှု (v3.8.49 · issue #6593)

**သက်ရောက်မှုနယ်ပယ်**: အထက်ပါ ယန္တရားသုံးခု၏ အောက်တစ်ဆင့်တွင်ရှိသော local per-provider+connection rate-limit queue (`open-sse/services/rateLimitManager.ts`,
Bottleneck ဖြင့် ပံ့ပိုးထားသည်)။

**`maxWaitMs` သည် တန်းစီစာရင်းစောင့်ချိန်ကို ကန့်သတ်ပြီး၊ `executionMaxWaitMs` သည် လုပ်ဆောင်ချိန်ကို ကန့်သတ်သည်။**
ဤနှစ်ခုကို ရည်ရွယ်ချက်ရှိရှိ သီးခြားခွဲထားပြီး တစ်ခု၏တန်ဖိုးကို အခြားတစ်ခုထံ မပေးပို့ပါ။

`resilienceSettings.requestQueue.maxWaitMs` သည် **တန်းစီစာရင်းစောင့်ဆိုင်းမှု အချိန်ခွဲတမ်း** ဖြစ်သည်။ ၎င်းတွင် provider slot တစ်ခုကို စောင့်ဆိုင်းခြင်းနှင့် ထို့နောက် QUEUED အခြေအနေတွင် ရှိနေခြင်းတို့ ပါဝင်ပြီး၊ job သည် QUEUED မှ ထွက်၍ စတင်လုပ်ဆောင်သည့်အချိန်တွင် ၎င်း၏ timer ကို ချက်ချင်းရှင်းလင်းသည်
(`rateLimitManager.ts`, `wrappedFn`)။ ထိုအချိန်ကို ကျော်လွန်သည့် တောင်းဆိုမှုသည် upstream သို့ လုံးဝမရောက်ပါ။ မူလတန်ဖိုးမှာ 30000ms ဖြစ်ပြီး `src/lib/resilience/settings.ts` ရှိ `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
က ပံ့ပိုးကာ `tests/unit/ratelimit-admission-control-6593.test.ts` ဖြင့် သတ်မှတ်အတည်ပြုထားသည်။ ထို့ကြောင့် ၎င်းတန်ဖိုးကို ပြောင်းလဲပါက ဤစာပိုဒ်ကို သတိမပြုဘဲ ခေတ်နောက်ကျကျန်ရစ်စေမည့်အစား ထိုစမ်းသပ်မှု ပျက်ကွက်မည်ဖြစ်သည်။

`resilienceSettings.requestQueue.executionMaxWaitMs` သည် job ၏ `expiration` အဖြစ် Bottleneck ထံ ပေးပို့သည့်တန်ဖိုးဖြစ်ပြီး ၎င်း၏ timer သည် dispatch လုပ်ပြီးနောက်မှသာ စတင်သည်။ ၎င်းသည် ကိုယ်ပိုင် upstream timeout မရှိသော executor များအတွက် နောက်ဆုံးအကာအကွယ်ဖြစ်ပြီး executor ၏ ကိုယ်ပိုင် fetch-start timeout က ပိုကြာပါက ထိုအချိန်အထိ တိုးမြှင့်ပေးသည်။ ထို့ကြောင့် ကောင်းမွန်စွာ လည်ပတ်နေသည့် in-flight response ကို အလယ်တွင် ဖြတ်တောက်မည်မဟုတ်ပါ။ မူလတန်ဖိုးမှာ 600000ms (10 မိနစ်) ဖြစ်သည်။

တန်းစီစာရင်းအချိန်ခွဲတမ်းကို `expiration` ထဲသို့ ထည့်ပေးခဲ့ခြင်းသည် ယခင်က non-incremental gateway များကို လုပ်ဆောင်နေစဉ် အလယ်တွင် ရပ်တန့်စေခဲ့သည့် အကြောင်းရင်းဖြစ်သည် — ၎င်းတို့သည် ပထမဆုံး byte များ မရောက်မီ မိနစ်အတော်ကြာ လုပ်ဆောင်နိုင်ခြင်းမှာ တရားဝင်ဖြစ်သည် — ထို့ကြောင့် expiration တစ်ခုကို `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) အဖြစ် ဖော်ပြသော်လည်း တန်းစီစာရင်းအချိန်ခွဲတမ်းတွင် queue-timeout code ပါရှိသည်။ တစ်ခုခုကို `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) သို့မဟုတ် dashboard
(**Settings → Resilience**) မှတစ်ဆင့် အစားထိုးသတ်မှတ်နိုင်သည်။ နှစ်ခုစလုံးကို normalise လုပ်သည့်အခါ 1ms–24h အတွင်း ကန့်သတ်ထားသည်။

**နှစ်ခုစလုံးအတွက် ဦးစားပေးအစီအစဉ်:** env var သည် _မူလတန်ဖိုး_ ကိုသာ ပံ့ပိုးသည်။ `resilienceSettings.requestQueue` တွင် သိမ်းဆည်းထားသောတန်ဖိုး (dashboard / API patch မှ သတ်မှတ်ပြီး `key_value` တွင် သိမ်းထားသည့်တန်ဖိုး) သည် ၎င်းထက် ဦးစားပေးပြီး၊ per-connection
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` သည် ထိုတန်ဖိုးထက် ထပ်မံဦးစားပေးသည်။ ထို့ကြောင့် သိမ်းဆည်းထားသောတန်ဖိုး ရှိပြီးသား deployment တစ်ခုတွင် env var ကို သတ်မှတ်ခြင်းသည် မည်သည့်အရာကိုမျှ မပြောင်းလဲစေပါ — ယင်းအစား သိမ်းဆည်းထားသော setting ကို ရှင်းလင်းပါ သို့မဟုတ် အပ်ဒိတ်လုပ်ပါ။

တန်းစီစာရင်းတွင် ရှိနေသည့်အချိန်ကို `maxWaitMs` ဖြင့် ကန့်သတ်ပြီး၊ အောက်ပါ `maxQueueDepth` က တစ်ပြိုင်နက်တည်း တန်းစီနိုင်သည့် caller အရေအတွက်ကို ကန့်သတ်သည်။

**Body တွင် ဖော်ပြထားသော ပြန်လည်ကြိုးစားမှုများ: အရှိန်ထိန်းခြင်းနှင့် လော့ခ်ချခြင်း။** 429 body တစ်ခုက ၎င်း၏ ကိုယ်ပိုင်စောင့်ချိန်ကို သတ်မှတ်နိုင်သည်
(Gemini `RetryInfo.retryDelay`, "retry after Ns" စာသား)၊ ၎င်းကို
`updateFromResponseBody` က ဖတ်သည်။ Connection ၏ `maxWaitMs` အတွင်း ဝင်ဆံ့သည့် စောင့်ချိန်သည် အရှိန်ထိန်းခြင်းဖြစ်သည်။ Limiter သည် ထိုကြာချိန်အတွက် ၎င်း၏ reservoir ကို လွတ်အောင်လုပ်ပြီး၊ တန်းစီထားသော call များသည် reservoir ပြန်လည်ဖြည့်သည့်အခါ dispatch လုပ်သည်။ `maxWaitMs` ထက် ပိုကြာသော စောင့်ချိန်ကို တန်းစီစာရင်းက စောင့်ဆိုင်းကျော်ဖြတ်၍ မရပါ — Gemini သည် တစ်ရက်စာ quota ကုန်ဆုံးနေပါက
`retryDelay: "86399s"` ဖြင့် တုံ့ပြန်သည်။ ပြန်လည်တည်ဆောက်ထားသော 429 (#16528) ပေါ်ရှိ relay လုပ်ထားသည့် `Retry-After` က fallback engine အား ထိုအချိန်ကာလအတွက် model ကို လော့ခ်ချစေပြီးသားဖြစ်သော်လည်း၊ limiter ကိုပါ ထိုအချိန်အတွက် ရပ်နားခြင်းသည် key ကို စောစီးစွာ ရောက်လာသည့် call တစ်ခုခုကို
(ဥပမာ resilience reset တစ်ခုပြီးနောက်) `maxWaitMs` တစ်လျှောက်လုံး ရပ်တန့်နေစေဦးမည်ဖြစ်သည်။ ထိုကဲ့သို့သော စောင့်ချိန်သည် typed Google `RetryInfo`
detail (`google_rpc_retry_info` provenance) မှ လာပြီး key ၏ limiter ကို model အဆင့်အထိ သတ်မှတ်ထားပြီးသားဖြစ်ပါက (`getLimiterKey` ကို ကြည့်ပါ) 429 သည် ယင်းအစား ထို connection ပေါ်ရှိ model lockout တစ်ခု ဖြစ်လာသည် (`open-sse/services/rateLimitManager/bodyRetryPause.ts` ရှိ
`lockModelForLongBodyRetry`၊ အများဆုံး 24h အထိ ကန့်သတ်ထားသည်)၊ limiter ကိုမူ ရပ်နားမထားပါ။ Account ရွေးချယ်မှုသည် `isModelLocked()` မှတစ်ဆင့် ထို lock ကို ကျော်သွားပြီး၊ connection နှင့် ချိတ်သတ်မှတ်ထားသော target များအတွက် combo pre-dispatch gate ကလည်း အလားတူ ကျော်သွားသည်။ Limiter ကို quota family တစ်ခုစီအလိုက် သတ်မှတ်ထားသည့် antigravity တွင် lock သည် ၎င်း၏ အခြား quota lock များကဲ့သို့ model အတိအကျပေါ်တွင် ရှိသည်။ Alias တစ်ခုက client တောင်းဆိုသည့်အမည်ကို ထို model သို့ resolve လုပ်ပေးထားပါက ထိုတောင်းဆိုထားသောအမည်ကိုလည်း လော့ခ်ချသည်၊ အဘယ်ကြောင့်ဆိုသော် ထိုစစ်ဆေးမှုများသည် တောင်းဆိုထားသောအမည်ကို အသုံးပြုသောကြောင့်ဖြစ်သည်။ ၎င်းကို အတိအကျ လော့ခ်ချသည် (`lockExactModel`) ဖြစ်သောကြောင့် antigravity quota family သို့မဟုတ် codex scope ကို ဖြတ်ကျော်သည့် alias တစ်ခုသည် ၎င်းကိုယ်တိုင်ကို မည်သည့်အခါမျှ လော့ခ်မချပါ။ စာသားဖြင့် ရေးသားထားသော အရိပ်အမြွက်တစ်ခု၊ typed မလုပ်ထားသော `retryDelay` တစ်ခု သို့မဟုတ်
connection တစ်ခုလုံးက မျှဝေသုံးစွဲသော limiter တစ်ခုဖြစ်ပါက pause ကို ဆက်လက်ထားရှိသည်။ 429 path က ယခုတင် ပြန်လည်တည်ဆောက်ထားသော limiter သည် pause လုပ်သောအခါ caller တစ်ခု၏ လက်ကျန်တန်းစီချိန်သည် pause မပြီးဆုံးမီ ကုန်ဆုံးမည်ဆိုပါက ထိုအချိန်တစ်လျှောက် စောင့်စေမည့်အစား queue-timeout code
(`checkLimiterPause`) ဖြင့် ချက်ချင်း ငြင်းပယ်သည်။ မှတ်တမ်းတင်ထားသော အဆုံးသတ်အချိန်ကို Bottleneck က ၎င်း၏ refresh clock စတင်သည့် limiter မတည်ဆောက်မီ အချိန်၌ အခြေပြုသတ်မှတ်ထားပြီး၊ နောက်ပိုင်း reservoir ကို ပြောင်းလဲမှုတစ်ခုခု ပြုလုပ်ပါက ၎င်းကို မေ့ပျောက်သည်။ ဤအပြုအမူများကို
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` နှင့်
`tests/unit/rate-limit-body-retry-pause.test.ts` တို့ဖြင့် လွှမ်းခြုံစမ်းသပ်ထားသည်။

**`maxQueueDepth` — ရွေးချယ်ဖွင့်နိုင်သော ဝင်ခွင့်ကန့်သတ်ချက် (အသစ်)။** `resilienceSettings.requestQueue.maxQueueDepth`
သည် provider+connection တစ်ခုအတွက် တစ်ပြိုင်နက်တည်း တန်းစီနေနိုင်သည့် (dispatch မလုပ်ရသေးသော) တောင်းဆိုမှုအရေအတွက်ကို ကန့်သတ်သည်။ တန်းစီစာရင်းတွင် `maxQueueDepth`
တောင်းဆိုမှုများ ရှိနှင့်ပြီးဖြစ်ပါက တောင်းဆိုမှုအသစ်ကို typed
`code: "RATE_LIMIT_QUEUE_FULL"` error ဖြင့် `limiter.schedule()` ထံ မရောက်မီ **ကြိုတင်** ချက်ချင်းငြင်းပယ်သည် — ထို့ကြောင့် ငြင်းပယ်မှု၏ ကုန်ကျစရိတ်နည်းပြီး ထိုတောင်းဆိုမှုအတွက် downstream
prompt-compression / translation အလုပ်တစ်ခုခု မစတင်မီ ဖြစ်ပေါ်သည်။ မူလတန်ဖိုး `0` =
ပိတ်ထားခြင်းဖြစ်ပြီး ရှိပြီးသား ကန့်သတ်မထားသည့် တန်းစီစာရင်းအပြုအမူကို ဆက်လက်ထိန်းသိမ်းထားသည်။ ခွင့်ပြုအကွာအဝေးမှာ 0–100000 ဖြစ်သည်။
`RATE_LIMIT_MAX_QUEUE_DEPTH` (env) သို့မဟုတ်
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch) မှတစ်ဆင့် အစားထိုးသတ်မှတ်နိုင်သည်။

ဝင်ခွင့်စစ်ဆေးမှုကိုယ်တိုင်သည် pure function တစ်ခုဖြစ်သည်
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) ဖြစ်သောကြောင့် အမှန်တကယ် Bottleneck limiter မရှိဘဲ unit test လုပ်နိုင်သည်။

> #6593 ကို ဖွင့်ခဲ့သော RFC သည် `bypassCompressionOnRateLimit`
> flag ကိုလည်း တင်ပြခဲ့သည်။ ဤ repo ၏ `open-sse/services/compression/` pipeline သည်
> synthesized 429 body များအပေါ်ရှိ HTTP response compression မဟုတ်ဘဲ၊ outbound LLM
> request (`chatCore.ts`, `resolveCompressionSettings`/`selectCompressionStrategy`
> block အနီးတွင်) ပေါ်ရှိ prompt/context compression ဖြစ်သည် — literal bypass flag
> အတွက် ကိုက်ညီသော code path မရှိပါ။ ထို prompt-compression အဆင့်သည်လည်း လက်ရှိတွင်
> request pipeline အတွင်းရှိ `withRateLimit()` _မတိုင်မီ_ run နေသောကြောင့်၊ queue-full
> rejection တွင် ၎င်းကို ကျော်ရန် အစီအစဉ်ပြင်ဆင်ခြင်းသည် ဤ issue ၏ scope ထက် ပို၍
> ကြီးမားပြီး သီးခြားသော ပြောင်းလဲမှုတစ်ခုဖြစ်သည်။ ၎င်းကို ဤနေရာတွင်
> ရည်ရွယ်ချက်ရှိရှိ implement **မလုပ်ခဲ့ပါ** နှင့် CPU-saving ရရှိမှုသည် reordering risk
> ကို တန်ဖိုးရှိပါက follow-up အဖြစ် ချန်ထားခဲ့သည်။

### Rate-Limit အလိုအလျောက်ဖွင့်ပေးမှု Safety Net နှင့် Connection ကာကွယ်မှု (`rateLimitProtection`)

**အလိုအလျောက်ဖွင့်ပေးမှု safety net** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, ပုံသေ `true`):
ပုံသေအတိုင်း OmniRoute သည် active API-key provider connection အားလုံး (`getProviderCategory(provider) === "apikey"`) အတွက် rate-limit queue ကာကွယ်မှုကို အလိုအလျောက်ဖွင့်ပေးသည်။ ၎င်းသည် rate limit ကို ထိခိုက်လွယ်သော upstream API key များသို့ ဝင်လာသော request များကို upstream 429 error များ ဖြစ်ပေါ်အောင် burst ဝင်ရောက်ခြင်းအစား Bottleneck မှတစ်ဆင့် queue ထဲသို့ထည့်ပြီး throttle လုပ်ခံရစေသည်။ ဤ safety net ကို `RATE_LIMIT_AUTO_ENABLE` environment variable ဖြင့် override လုပ်နိုင်သည် (`false`/`0`/`off` သည် ပိတ်ပစ်သည်၊ `true`/`1`/`on` သည် အတင်းအကျပ်ဖွင့်သည်)၊ ၎င်းသည် persist လုပ်ထားသော dashboard setting (**Settings → Resilience** / `PATCH /api/resilience`) ထက် ဦးစားပေးသည်။

**Connection တစ်ခုချင်းစီ၏ `rateLimitProtection` အဓိပ္ပာယ်ဖွင့်ဆိုချက်:**
Connection တစ်ခုချင်းစီ၏ rate-limit ကာကွယ်မှုကို provider connection များပေါ်ရှိ `rateLimitProtection` boolean field ဖြင့် ခြေရာခံထားသည် (SQLite တွင် `rate_limit_protection` အဖြစ် persist လုပ်ထားသည်):

- **တိကျစွာဖွင့်ထားခြင်း (`rateLimitProtection === true`)**: Provider category ဖြစ်စေ၊ auto-enable safety net ဖွင့်ထားခြင်း ရှိမရှိဖြစ်စေ မဆိုင်ဘဲ ဤ connection အတွက် rate-limit ကာကွယ်မှုကို တိကျစွာ ဖွင့်ထားသည်။
- **တိကျစွာပိတ်ထားခြင်း (`rateLimitProtection === false`)**: တိကျသော ကာကွယ်မှုကို ပိတ်ပစ်သော်လည်း active API-key connection တစ်ခုကို global auto-enable safety net မှ opt-out **မလုပ်ပေးပါ**။ `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) အတွင်းတွင် `false` နှင့် `undefined` သည် တူညီသည်: `rateLimitProtection === true` ကိုသာ တိကျသော override အဖြစ် သတ်မှတ်သည်။ `rateLimitProtection` သည် `false` (သို့မဟုတ် မသတ်မှတ်ထားခြင်း) ဖြစ်ပါက active API-key connection သည် auto-enable အခြေအနေနှင့် ဆက်လက်ကိုက်ညီနေပြီး rate-limit ကာကွယ်မှု ရရှိနေဆဲဖြစ်သည်။
- **Connection တစ်ခုချင်းစီ opt-out မရှိပါ**: Operator တစ်ဦးသည် အခြား connection များအတွက် auto-enable ကို active ထားရင်းဖြင့် "ဤ active API-key connection တစ်ခုတည်းသည် rate-limit queue ကာကွယ်မှုမရှိဘဲ run ရမည်" ဟု လက်ရှိတွင် ဖော်ပြနိုင်ခြင်း မရှိပါ။ API-key connection များကို rate-limit queue လုံးဝမရှိဘဲ run လိုပါက safety net ကို global အားဖြင့် ပိတ်ရမည် (`RATE_LIMIT_AUTO_ENABLE=false` သို့မဟုတ် `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`)။

**ပံ့ပိုးထားသော write path များ:**

- **`POST /api/rate-limits`**: Connection တစ်ခုအတွက် `rateLimitProtection` ကို toggle လုပ်ရန် ပံ့ပိုးထားသော management write path (`{ connectionId: string, enabled: boolean }`)။ ၎င်းကို `enabled: true` ဖြင့် ခေါ်ဆိုပါက တိကျသော ကာကွယ်မှုကို ဖွင့်ပေးပြီး၊ `enabled: false` ဖြင့် ခေါ်ဆိုပါက တိကျသော ကာကွယ်မှုကို ဖယ်ရှားပေးသည် (သို့သော် auto-enable ဖွင့်ထားပါက active API-key connection များသည် global safety net အောက်တွင် ဆက်လက်ပါဝင်နေမည်)။
- **`PUT /api/providers/[id]`**: ရည်ရွယ်ချက်ရှိရှိ `rateLimitProtection` ကို လက်ခံခြင်း သို့မဟုတ် flip လုပ်ခြင်း **မလုပ်ပါ** (#11278)။ `PUT /api/providers/[id]` မှတစ်ဆင့် provider connection metadata ကို update လုပ်ခြင်းသည် persist လုပ်ထားသော rate-limit ကာကွယ်မှုအခြေအနေကို ဘယ်တော့မှ မပြောင်းလဲပါ။

---

## 6. Slow-stream throughput စောင့်ကြည့်ရေးစက် (#9709)

ရွေးချယ်နိုင်သော `resilienceSettings.streamRecovery.throughputWatchdog` အစောင့်သည် အပိုင်းများကို ပို့နေသေးသော်လည်း စီစဉ်သတ်မှတ်ထားသော အသုံးဝင်သော-ထွက်နှုန်းအောက်ရှိ လက်ထောက်အထွက်နှုန်းကို ထုတ်လုပ်ပေးနေသည့် အထက်ရေစီးကြောင်းကို ရှာဖွေတွေ့ရှိသည်။ ၎င်းသည် မလှုပ်မရှား အချိန်ကုန်ခြင်းနှင့် တမင်တကာ ခြားနားသည်- နှလုံးခုန်ခြင်းနှင့် မက်တာဒေတာကို အချိန်တိုင်းကိရိယာအဖြစ် မသတ်မှတ်ဘဲ တိုးတက်မှုအဖြစ် ထည့်မတွက်ပါ။ ၎င်းသည် အထွက်အရည်အသွေးမခွဲခြားဘဲ ပကတိဘေးကင်းလုံခြုံရေးမျက်နှာကျက်အဖြစ် ကျန်ရှိနေသော ပြင်းထန်သောကြိုးစားမှုနောက်ဆုံးရက် (#9153) နှင့်လည်း ကွဲပြားပါသည်။

သားလျှောခြင်းမပြုမီ ပြီးပြည့်စုံသော လှိမ့်ဝင်ဝင်းဒိုးဖြင့် နောက်တွင် သွေးပူချိန် လိုအပ်သည်။ ၎င်းသည် Chat Completions and Responses API output events (ရှေးရိုးစွဲ UTF-8 byte proxy) မှ စာသား deltas များကို ရေတွက်ပြီး tool-call သို့မဟုတ် ကျိုးကြောင်းဆင်ခြင်ခြင်း ဖြစ်ရပ်များ ပျံသန်းနေချိန်တွင် စီရင်ချက်ကို ဆိုင်းငံ့ထားသည်။ ၎င်းကို ပုံသေအားဖြင့် ပိတ်ထားပြီး `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` ဖြင့် ဖွင့်ထားနိုင်သည် (ထို env တန်ဖိုးသည် မူရင်း — သိမ်းဆည်းထားသော `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean အနိုင်ရရှိမှုများကိုသာ စေ့စပ်ထားသည်။ ဤလမ်းညွှန်၏ ထိပ်ရှိ env-vs-dashboard ရှေ့နည်းကျ မှတ်စုကို ကြည့်ပါ)။ ပြတင်းပေါက်၊ သွေးပူ၊ အနိမ့်ဆုံးနှုန်းနှင့် အနိမ့်ဆုံး တိုင်းတာနိုင်သော အထွက်အားကို ပုံမှန် ခံနိုင်ရည်ရှိမှု-ဆက်တင်များ ပုံမှန်ပြုလုပ်သည့် အလွှာဖြင့် ကန့်သတ်ထားသည်။

ဖွင့်ထားသည့်အခါတွင်၊ စောင့်ကြည့်စစ်ဆေးမှုကို ဖျက်ပစ်ခြင်းသည် လက်ရှိရေစီးကြောင်းပေါ် ကြိုးပမ်းမှုတွင်သာ သက်ရောက်မှုရှိသည်။ ကလိုင်းယင့်မြင်နိုင်သောဘိုက်များ မပြုမီ၊ ရှိပြီးသား အကောင့်တစ်ခုတည်းကို စောစီးစွာ ပြန်လည်ရယူရေးလမ်းကြောင်းက ကြိုးစားမှုကို ပြန်ဖွင့်နိုင်သည်။ ကတိပြုပြီးနောက်၊ စမ်းချောင်းကို မျက်စိစုံမှိတ်ပြီး ဘယ်တော့မှ ပြန်မကစားပါ။ ရှိပြီးသား လုံခြုံသော အလယ်အလတ်ဆက်ကြောင်း စာချုပ်မှသာလျှင် နောက်ဆက်တွဲကို ချုပ်နိုင်မည်ဖြစ်သည်။ Finalization သည် တစ်ချက်တည်းသာ ကျန်ရှိတော့သည်၊ ထို့ကြောင့် အသုံးပြုမှုစာရင်းအင်းနှင့် semaphore ထုတ်ဝေမှုကို ထပ်တူထပ်မျှမလုပ်ပါ။

---

## ၇။ Upstream အခြေအနေ ပြန်လည်သတ်မှတ်ခြင်း (မှားယွင်းဖော်ပြထားသော quota အမှားများ)

**အကျုံးဝင်သည့်အတိုင်းအတာ:** ယာယီ quota ကုန်ဆုံးမှုကို မှားယွင်းသော HTTP status ဖြင့် အစီရင်ခံသည့် upstream gateway တစ်ခု။

**ရည်ရွယ်ချက်:** downstream consumer များ (fallback engine၊ combo aggregation၊ client-facing response) က အမှန်တကယ် ပြန်လည်ကြိုးစားနိုင်သော အမှားဖြစ်ကြောင်း သိရှိနိုင်ရန် classification မပြုလုပ်မီ လွဲမှားစေသော status ကို ပြင်ဆင်ရန်။

Gateway အချို့သည် TEMPORARY quota ကုန်ဆုံးမှုကို ပြန်လည်ကြိုးစား၍မရသော HTTP
status ဖြင့် အချက်ပြကြသည်။ `agentrouter.org` သည် standard `429` အစား တရုတ်စာသား
(`用户额度不足` / `额度不足`) ပါသော `403` (တစ်ခါတစ်ရံ `400`) ကို ပြန်ပေးသည်။ Claude
Code ကဲ့သို့သော client များသည် `403` ကို အမြဲတမ်းဖြစ်သော အမှားအဖြစ် သတ်မှတ်ပြီး session ကို
ရပ်တန့်ကြသည်။ ပြင်ဆင်မှုမရှိပါက fallback engine သည် ၎င်းကို quota
ဖြစ်ရပ်အစား `AUTH_ERROR` အဖြစ် သတ်မှတ်မည်ဖြစ်သည်။

**အကောင်အထည်ဖော်မှု:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — provider တစ်ခုချင်းစီအလိုက် rules စာရင်း (`{id, fromStatuses, toStatus, textMarkers, excludeMarkers, defaultRetryAfterMs}`) ဖြစ်ပြီး `applyStatusRestatement()` မှတစ်ဆင့် ကိုက်ညီသော rule ကို ရွေးချယ်သည်။
- Call site: `open-sse/handlers/chatCore.ts` ရှိ `providerFailure:` block (လိုင်း 3654 ဝန်းကျင်) တွင် upstream response တစ်ခုကို error HTTP status (`!providerResponse.ok`) ဖြင့် `parseUpstreamError()` က parse ပြုလုပ်ပြီး ချက်ချင်းနောက်၊ မည်သည့် classification မဆို မလုပ်ဆောင်မီ ဖြစ်သည်။ ထို့ကြောင့် downstream consumer အားလုံးသည် ပြင်ဆင်ပြီးသော status ကို မြင်ရသည်။ `200` SSE stream အတွင်း ထည့်သွင်းထားသော အမှားများသည် နောက်ပိုင်း သီးခြား stream-parsing လမ်းကြောင်းအတိုင်း လိုက်ကြပြီး ယနေ့တွင် ဤ hook ၏ အကျုံးဝင်မှု မရှိပါ — ၎င်းသည် သိရှိထားသော ကန့်သတ်ချက်ဖြစ်ပြီး agentrouter ၏ misstatus အတွက် လက်ရှိ မလိုအပ်သေးပါ (ထိုအမှားသည် error HTTP status အဖြစ် ပေါ်လာသောကြောင့်)။
- Retry eligibility: `429` သည် `RETRY_AFTER_ELIGIBLE_STATUSES` (`open-sse/services/combo/unavailableRetryGate.ts`) ထဲတွင် ပါဝင်သောကြောင့် restated error သည် အသုံးမဝင်သော `403` အဖြစ် ပေါ်လာမည့်အစား အမှန်တကယ် retry window ကို သယ်ဆောင်သည်။
- Synthetic `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) သည် restated response က **client** ထံ ပြောပြသည့် တန်ဖိုးသာ ဖြစ်သည်။ ၎င်းသည် connection ၏ အတွင်းပိုင်း cooldown/lockout ကြာချိန် ကိုယ်တိုင် မဟုတ်ပါ — ထိုကြာချိန်ကို restated error ကို အမှန်တကယ် ကိုင်တွယ်သည့် ယန္တရားက သီးခြားစီ ထိန်းချုပ်သည် (Connection Cooldown ၏ တဖြည်းဖြည်းတိုးသော backoff၊ §2 တွင် ဖော်ပြထားသည့် API-key provider များအတွက် အခြေခံ `3s`၊ သို့မဟုတ် agentrouter ကဲ့သို့ per-model-quota provider များအတွက် Model Lockout၊ §3)။ Router သည် client ထံ ကြော်ငြာထားသော 60s window မတိုင်မီ အတွင်းပိုင်း retry အတွက် အရည်အချင်းပြည့်မီလာနိုင်သည် — ၎င်းသည် ရည်ရွယ်ထားသော headroom ဖြစ်ပြီး bug မဟုတ်ပါ။

အမြဲတမ်းဖြစ်သော အမှားများ (agentrouter ၏ `无权访问模型` — ဤ model ကို အသုံးပြုခွင့်မရှိခြင်း) ကို
မည်သည့်အခါမျှ restate မလုပ်ပါ။ `textMarkers` ကိုက်ညီသည့်အခါတွင်ပင် `excludeMarkers` က rule ကို
ပယ်ချသောကြောင့် အမှားသည် မူလ status ကို ဆက်လက်ထိန်းသိမ်းပြီး ၎င်းကို အမြဲပြန်လည်ကြိုးစားနေမည် မဟုတ်ပါ။
ကိုက်ညီသော provider classification rule
(`open-sse/config/providerErrorRules.ts` ထဲရှိ `agentrouter-model-access-denied`:
`reason: "auth_error"`, `scope: "model"`, သတ်မှတ်ထားသော အခြေခံ cooldown `6h`) ကို
generic apikey-category `FORBIDDEN` early-return မတိုင်မီ
`checkFallbackError` (`open-sse/services/accountFallback.ts`) က စစ်ဆေးသည်။ ၎င်းကို
`honorsRuleLockScope(provider)` (#10334 — လက်ရှိတွင်
`providerErrorRules.ts` ထဲရှိ `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist မှတစ်ဆင့် agentrouter တစ်ခုတည်းအတွက်သာ) ဖြင့် ထိန်းချုပ်ထားသည်။ Rule တွင် သတ်မှတ်ထားသော 6h cooldown သည်
`fallbackResult.baseCooldownMs` အဖြစ် ဖြတ်သန်းသွားသော်လည်း ၎င်းသည် ရှိပြီးသား
per-model-quota lockout လမ်းကြောင်း (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`) ကိုပင် ဆက်လက်အသုံးပြုသည် (#10334 ကြောင့် cooldown ရင်းမြစ်မှလွဲ၍
အခြားအရာများ မပြောင်းလဲပါ)။ ၎င်းကို operator ၏
`mlSettings.maxCooldownMs` (ပုံသေ `1_800_000ms` / 30min) အထိ လျှော့ချကန့်သတ်သည်။
အခြား model lockout အားလုံးကဲ့သို့ပင်၊ _သိမ်းဆည်းထားသော lockout reason_ သည် ရှိပြီးသား hardcoded
`"forbidden"` အတိုင်းသာ ကျန်ရှိမည်ဖြစ်ပြီး rule ၏ `"auth_error"` မဟုတ်ပါ — cooldown ကြာချိန်ကိုသာ
အဆုံးမှအဆုံးအထိ လိုက်နာပြီး reason string ကို မလိုက်နာပါ။ Connection ကိုယ်တိုင်သည် active အဖြစ် ဆက်ရှိမည်ဖြစ်ပြီး၊ တူညီသော connection ပေါ်ရှိ sibling model များကို ထိခိုက်မည်မဟုတ်ပါ။

Restated quota error (`额度不足`) များသည် production တွင် provider rule တစ်ခုသို့ ရောက်ရှိသည်
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, ကိုယ်ပိုင်သတ်မှတ်ထားသော cooldown မရှိပါ — persistence layer ၏ scaled backoff ပုံသေတန်ဖိုးကို အသုံးပြုသည်)။ #10334 နောက်ပိုင်းတွင်
`ProviderErrorRuleMatch` ရှိ `scope` ကို end-to-end အသုံးပြုနေသော်လည်း
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist (`providerErrorRules.ts` — ယနေ့တွင် `"agentrouter"` တစ်ခုတည်း၊ `honorsRuleLockScope()` မှတစ်ဆင့် ထိန်းချုပ်ထားသည်) ထဲရှိ provider များအတွက်သာ ဖြစ်သည်။ အခြား provider အားလုံးအတွက် `scope` သည် #10334 မတိုင်မီကဲ့သို့ informational အဖြစ်သာ ဆက်ရှိသည်။
`checkFallbackError` သည် ကိုက်ညီသော rule ၏ scope ကို
`fallbackResult.ruleScope` အဖြစ် ဖော်ပြသည်။ `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) သည် `ruleScope` ကို connection-wide၊ ကိုယ်တိုင်ပြန်လည်ကောင်းမွန်နိုင်သော signal အဖြစ် အမှန်တကယ် လုံခြုံစွာ လိုက်နာနိုင်ကြောင်း အတည်ပြုသည့် shared guard ဖြစ်သည် (scope `"connection"` ဖြစ်ရမည်၊ reason `quota_exhausted` ဖြစ်ရမည်၊ `permanent` မဖြစ်ရ၊ `creditsExhausted` မဖြစ်ရ — နောင်တွင် scope `"connection"` ကို permanent account state နှင့် တွဲဖက်သတ်မှတ်မိနိုင်ခြင်းမှ ကာကွယ်ရန်)။ ၎င်းကို consumer နှစ်ခုက ခေါ်ဆိုသည်:

- **တည်မြဲသိမ်းဆည်းခြင်း** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provider ၏ **မော်ဒယ်အလိုက်** lockout
  branch ထဲသို့ ဝင်သွားမည့်အစား (agentrouter တွင် `passthroughModels: true` ဖြစ်သဖြင့်
  `hasPerModelQuota()` က `true` ပြန်ပေးသည်) **ယာယီချိတ်ဆက်မှု cooldown** ကို
  အသုံးပြုသည် — `testStatus: "unavailable"` + `rateLimitedUntil` ဖြစ်ပြီး
  terminal status (`credits_exhausted`/`banned`/`expired`) ကို မသတ်မှတ်ပါ —
  ထို့ကြောင့် ကိုယ်ရေးအထောက်အထားများကို ကိုယ်တိုင် reset လုပ်ရန် မလိုဘဲ
  cooldown ကာလကုန်ဆုံးသည်နှင့် ချိတ်ဆက်မှုသည် အလိုအလျောက် ပြန်လည်အသုံးပြုနိုင်သည်။
  `disableCooling: true` ပါသော ချိတ်ဆက်မှုများအတွက် ကျော်သွားသည် (#2997) —
  ထို opt-out သည် per-model lockout သို့ ဆက်လက်ဝင်သွားသည် (မှတ်တမ်းတင်ထားသော
  trade-off တစ်ခုဖြစ်ပြီး branch အပေါ်ရှိ code comment ကို ကြည့်ပါ)။
- **တူညီသော request အတွင်း combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): အဆိုပါ guard သည်
  `${provider}:${connectionId}` ဖြင့် key လုပ်ထားသော in-memory
  `exhaustedConnections` set ထဲသို့ ချိတ်ဆက်မှုကို ထည့်သွင်းမှတ်သားသည်။ ၎င်းသည်
  မိမိ၏ target object တွင် ထိုတိကျသော `connectionId` ကိုယ်တိုင် ပါရှိပြီးသား
  SAME-REQUEST target ကိုသာ ကျော်နိုင်သည်
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`,
  `if (provider &&
connectionId)` သည် `exhaustedConnections` lookup မလုပ်မီ ဖြစ်သည်) — ရိုးရိုး
  model-list combo တစ်ခုတွင် sibling target များ၌ ကိုယ်ပိုင် pinned `connectionId`
  မပါရှိဘဲ response ၏ `X-OmniRoute-Selected-Connection-Id` header မှ
  dispatch တစ်ကြိမ်ချင်းစီတွင်သာ တစ်ခုကို ဖြေရှင်းသတ်မှတ်သောကြောင့် ထို key
  match ကို မရရှိပါ။ ထိုအများဆုံးတွေ့ရသောအခြေအနေတွင် ကျန်ရှိနေသော leg က
  ယခုလေးတင် exhausted ဖြစ်သွားသော account ကို ပြန်လည်အသုံးပြုခြင်းမှ
  တားဆီးပေးသည့် အမှန်တကယ်ကာကွယ်မှုသည် ဤ Set မဟုတ်ဘဲ အထက်ပါ
  persistence layer (`rateLimitedUntil` သည် ယခုအချိန်ထက် နောက်ကျသောအချိန်တွင်
  ရှိနေသည်) နှင့် failure အတွက် `transientRateLimitedProviders` ကို
  suppress လုပ်ပေးသည့် ဤ guard တို့ ပေါင်းစပ်ထားခြင်း ဖြစ်သည်
  (`targetExhaustion.ts` ရှိ "Two-stage design" နှင့်
  `isAgentrouterConnectionQuotaScope` branch အပေါ်ရှိ code comment ကို ကြည့်ပါ)။
  ထို Set တွင် mark မလုပ်ထားသောကြောင့် `combo.ts` ၏
  `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) သည် provider ၏
  ကျန်ရှိသော leg များအတွက် အသက်မဝင်ပါ။ ထို့ကြောင့် credential selection ၏
  `rateLimitedUntil` filter (`src/sse/services/auth.ts:1238`) ကို ပုံမှန်အတိုင်း
  လိုက်နာပြီး ကျန်ရှိသော leg သည် အခြားသော အသုံးပြုနိုင်ဆဲ agentrouter
  ချိတ်ဆက်မှုကို ရွေးချယ်မည် သို့မဟုတ် credentials မရရှိနိုင်သဖြင့်
  fail ဖြစ်မည် — ဤ branch က ယခုလေးတင် cooldown ချထားသော ချိတ်ဆက်မှုထံသို့
  အတင်းပြန်ဝင်သွားမည် မဟုတ်ပါ။

### အဆင့်နှစ်ဆင့်ဒီဇိုင်း: status ပြန်လည်ဖော်ပြခြင်း၊ ထို့နောက် အမျိုးအစားခွဲခြားခြင်း

Status ပြန်လည်ဖော်ပြခြင်း (`upstreamStatusRestatement.ts`) နှင့် provider
အမျိုးအစားခွဲခြားခြင်း စည်းမျဉ်းများ (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) သည် provider id နှင့် စာသားအမှတ်အသားများကို အခြေခံ၍
နှစ်ခုစလုံး registry ခွဲများအဖြစ် လုပ်ဆောင်သော်လည်း နေရာကွဲပြားစွာ လည်ပတ်ပြီး
ရည်ရွယ်ချက်လည်း ကွဲပြားသည်။ restatement သည် `chatCore.ts` တွင် HTTP status ကို
အစောပိုင်း၌ ပြန်လည်ရေးသားသည်။ classification rules များက
`checkFallbackError()` (`open-sse/services/accountFallback.ts`) အတွင်း
fallback `reason` နှင့် lock `scope`
(`model` / `provider` / `connection`) ကို ရွေးချယ်သည်။

Classification rules များသည် `providerErrorRules.ts` ရှိ
`FULL_TEXT_RULE_PROVIDERS` allowlist တွင် ဖော်ပြထားသော provider များအတွက်သာ
အပြည့်အစုံသော error **စာသား** ကို မြင်နိုင်သည် (body marker များဖြစ်သည့်
`额度不足` ကို ကိုက်ညီစေရန် လိုအပ်သည်) — လက်ရှိတွင် `"agentrouter"` တစ်ခုတည်းသာ
ရှိသည်။ အခြား **built-in catalog** provider အားလုံးအတွက်
`checkFallbackError` သည် `getProviderErrorRuleMatch` ထံသို့ structured error
(`{code, type}`) ကိုသာ ပေးပို့သည်။ ၎င်းသည် header/status/code အခြေပြု rules
များအတွက် လုံလောက်သော်လည်း body-text marker များကို မမြင်နိုင်ပါ။
`resolveRuleMatchBody()` helper သည် ဤရွေးချယ်မှုကို လုပ်ဆောင်သည် —
allowlist ပါ provider များအတွက် error စာသားအပြည့်အစုံ၊ အခြား provider များအတွက်
structured error ကို အသုံးပြုသည်။ **built-in** provider တစ်ခုကို
`FULL_TEXT_RULE_PROVIDERS` ထဲ ထည့်ခြင်းသည် provider တစ်ခုချင်းစီအလိုက်
အတိအလင်း opt-in လုပ်ခြင်းဖြစ်သည် — list ထဲ မပါသော provider အားလုံးအတွက်
မူရင်းလမ်းကြောင်းသည် byte-for-byte မပြောင်းလဲဘဲ ဆက်ရှိစေရန် ဤအရာကို
သတ်မှတ်ထားခြင်း ဖြစ်သည်။

Rule တစ်ခု၏ `scope` (`model` / `provider` / `connection`) သည်
`FULL_TEXT_RULE_PROVIDERS` မှ သီးခြား opt-in တစ်ခုဖြစ်သည်။
`checkFallbackError` သည် ၎င်းကို `fallbackResult.ruleScope` အဖြစ်သာ
ဖော်ပြပေးပြီး downstream consumer များကလည်း ထို scope ကို သတင်းအချက်အလက်
label တစ်ခုထက်ပို၍ အသုံးချရန်အတွက် ထိုဖိုင်တစ်ခုတည်းရှိ
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist တွင် ပါဝင်သော provider များအတွက်သာ
လက်ခံသည် (`honorsRuleLockScope()` မှတစ်ဆင့် စစ်ဆေးသည် — ယနေ့တွင်
`"agentrouter"` တစ်ခုတည်းသာ)။ provider တစ်ခုသည် ထို allowlist ထဲ ပါဝင်လာပြီးနောက်
`scope: "connection"` match က အမှန်တကယ် ဘာလုပ်ဆောင်သည်ကို အထက်ရှိ
"Restated quota errors" ကို ကြည့်ပါ။

**#11104 — operator က ကြေညာထားသော rules များသည် allowlist နှစ်ခုစလုံးကို
ကျော်လွန်သည်။** Operator သည် ဤဖိုင်ကို ပြင်ဆင်ခြင်းမပြုဘဲ
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) မှတစ်ဆင့်
runtime တွင် provider တစ်ခုချင်းစီအလိုက် rule ကို ကြေညာနိုင်သည်။
Operator rule တစ်ခုကို `FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS`
၏ gating အောက်တွင် ထားပါက — အဆိုပါ allowlist များသည် **default**
built-in catalog rules များ၏ အပြုအမူကို ကာကွယ်ရန် ရည်ရွယ်ထားခြင်းဖြစ်သော်လည်း —
ထို settings mechanism သည် ထို allowlist များတွင် ရှိပြီးသား provider များမှလွဲ၍
အခြား provider အားလုံးအတွက် အလုပ်မလုပ်တော့မည် ဖြစ်သည်။ အကြောင်းမှာ rule ကို
ကြေညာခြင်းသည် operator ၏ အတိအလင်း opt-in ဖြစ်ပြီးသား ဖြစ်သောကြောင့် ဖြစ်သည်။
`resolveRuleMatchBody()` နှင့် `honorsRuleLockScope()` နှစ်ခုစလုံးသည်
`hasOperatorRuleForProvider()` ကို ဦးစွာ စစ်ဆေးသည်။ ထို့ကြောင့် operator rule
ရှိသော provider သည် မည်သည့် allowlist တွင် ပါဝင်သည်ဖြစ်စေ၊ မပါဝင်သည်ဖြစ်စေ
raw error text ကို ရရှိပြီး ၎င်းတွင် ကြေညာထားသော `scope` ကိုလည်း လက်ခံသည်။

**Operator က ကြေညာထားသော rules** (`OperatorProviderErrorRule`): rule တစ်ခုစီတွင်
ရွေးချယ်နိုင်သော `status` တစ်ခုနှင့် ရွေးချယ်နိုင်သော `match` တစ်ခု ရှိသည်။
`match` သည် error စာသားအတွင်းရှိ ရိုးရိုး case-insensitive substring တစ်ခုသာ
ဖြစ်ရမည်။ RegExp မဖြစ်နိုင်သောကြောင့် ReDoS ဖြစ်စေနိုင်ခြင်း မရှိပါ။ ထိုနှစ်ခုအနက်
အနည်းဆုံးတစ်ခုကို သတ်မှတ်ထားရမည်။ နှစ်ခုစလုံး သတ်မှတ်ထားပါက AND ဖြင့်
ကိုက်ညီရမည်။ မသတ်မှတ်ထားသော field သည် မည်သည့်အရာနှင့်မဆို ကိုက်ညီသည်။
ထို့ကြောင့် `{match: "insufficient_quota"}` သည် ထို code ပါရှိသော မည်သည့်
status ကိုမဆို ကိုက်ညီသည်။ ပထမဆုံး ကိုက်ညီသော rule ကို အသုံးပြုသည်။
`cooldownMs` သည် အများဆုံး 30 ရက်အထိ လက်ခံပြီး စုစုပေါင်း rules အရေအတွက်မှာ
အများဆုံး 50 ခု ဖြစ်သည်။

**Catch-all defaults** (`settings.providerErrorDefaults`, opt-in, set through
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
အတွင်းရှိ `cooldownMs` သည် ၁ မိနစ်မှ ၃၀ ရက်အထိ ဖြစ်ရမည်။ Operator rule နှင့်
built-in catalog rule နှစ်မျိုးလုံး မကိုက်ညီသည့်အခါတွင်သာ default သည် အကျုံးဝင်ပြီး၊
402, 403, 408, 429 နှင့် 5xx errors များအတွက်သာ အကျုံးဝင်သည်။ Request-shape errors
(400, 404, 409, 413, 422) နှင့် သီးခြား 401 များသည် မိမိတို့၏ handling ကို ဆက်လက်
အသုံးပြုမည်။ `reason` ကို အတိအလင်း မသတ်မှတ်ထားပါက `classifyError` ပြုလုပ်သည့်
နည်းအတိုင်း status မှ reason ကို ရယူမည်။ Default တစ်ခုကို ကြေညာခြင်းသည်
`hasOperatorRuleForProvider()` အတွက် operator rule တစ်ခုအဖြစ် သတ်မှတ်ခံရသဖြင့်
၎င်း၏ `scope` (ပုံမှန်မှာ `"connection"`) ကို လိုက်နာမည်။ Default တစ်ခု၏
အကျုံးဝင်သော cooldown သည် ၎င်း၏ `cooldownMs` နှင့် provider ၏ ကိုယ်ပိုင် retry hint
(`Retry-After`, `x-ratelimit-reset` သို့မဟုတ် body ထဲရှိ reset hint — connection-cooldown
setting "use upstream retry hints" ကို ဖွင့်ထားသည့်အခါ engine က လိုက်နာသည့် hint တူညီသည်)
တို့အနက် ပိုရှည်သည့်တန်ဖိုး ဖြစ်မည်။ ထို့ကြောင့် default သည် upstream hint တိုနေပါက
ပိုရှည်အောင် တိုးနိုင်သော်လည်း အမှန်တကယ်ရှိသော reset ကို မည်သည့်အခါမျှ တိုတောင်းအောင်
မပြုလုပ်နိုင်ပါ။ Explicit operator rule သည် ၎င်း၏ `cooldownMs` အတိအကျကို
ဆက်လက်အသုံးပြုမည်။ Rule ဖြစ်စေ default ဖြစ်စေ `markAccountUnavailable` ရှိ
connection-cooldown guards များကို ကျော်လွှားနိုင်မည်မဟုတ်ပါ — ပိုရှည်သော active
cooldown ကို မည်သည့်အခါမျှ တိုတောင်းအောင် မပြုလုပ်နိုင်သကဲ့သို့ terminal status ကိုလည်း
ပြန်လည်ရေးသားမည်မဟုတ်ပါ။ `checkFallbackError` တွင် အစောပိုင်းက လုပ်ဆောင်သည့်
built-in text detectors (credits exhausted, daily quota, account deactivated) များသည်
၎င်းတို့၏ သက်ဆိုင်ရာ phrase များအတွက် ဦးစားပေးအဖြစ် ဆက်လက်တည်ရှိမည်။

**သိရှိထားသော ကွာဟချက် — `providerRuleRegistry` ကို HTTP 400 အတွက် မည်သည့်အခါမျှ
မတိုင်ပင်ပါ။** `checkFallbackError` ၏ `BAD_REQUEST` branch သည် status 400 ကို
၎င်း၏ကိုယ်ပိုင် pattern arrays (`accountFallback.ts` ထဲရှိ
`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` စသည်) မှတစ်ဆင့်
အပြည့်အဝ classify ပြုလုပ်ပြီး၊ ၎င်းအပေါ်ရှိ `configuredRule`/`getProviderErrorRuleMatch`
branch သို့ မရောက်မီ return ပြုလုပ်သည်။ `status: 400` ပါဝင်သော built-in catalog rule
(သို့မဟုတ် operator rule) သည် syntax အရ မှန်ကန်သော်လည်း မည်သည့်အခါမျှ
အလုပ်လုပ်မည်မဟုတ်ပါ။ ယနေ့တွင် 400 ကို target လုပ်ထားသည့် ရှိပြီးသား rule မရှိသဖြင့်
production တွင် မည်သည့်အရာမျှ ထိခိုက်မည်မဟုတ်ပါ — သို့သော် အနာဂတ် 400 rule တစ်ခုအတွက်
ဤ branch ကို ဦးစွာ ပြင်ဆင်ရန် လိုအပ်မည်ဖြစ်ပြီး၊ provider တိုင်းက လက်ရှိ
pattern-array behavior ကို အားကိုးနေသည့် 400 ကို ပြန်လည်အမျိုးအစားခွဲခြားစေမည်ဖြစ်သောကြောင့်
rule တစ်ခု ထည့်ခြင်းထက် ပိုကြီးမားသော ပြောင်းလဲမှု ဖြစ်သည်။ ထို့ကြောင့် provider တစ်ခုတည်း
အတွက် rule ထည့်ခြင်း၏ scope အပြင်ဘက်တွင် ရှိသည်။

### quota-misstating gateway အသစ် ထည့်ခြင်း

1. `statusRestatementRegistry` (`open-sse/config/upstreamStatusRestatement.ts`) တွင်
   rule array တစ်ခုကို register ပြုလုပ်ပါ။ `textMarkers` များကို provider-specific
   ဖြစ်အောင် ထားပါ။ `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`) နှင့် တိုက်မိနိုင်သော generic English
   phrases များကို မည်သည့်အခါမျှ ပြန်လည်အသုံးမပြုပါနှင့်။
2. Lock scope မှန်ကန်စွာ ရွေးချယ်နိုင်ရန် `open-sse/config/providerErrorRules.ts`
   (`providerRuleRegistry`) တွင် classification rules များကို လိုအပ်ပါက
   register ပြုလုပ်ပါ (`connection` သည် account-wide quota အတွက်၊ `model` သည်
   per-model errors အတွက်)။ ဤအဆင့်သည် full error text (body markers) လိုအပ်သော
   provider များအတွက် production တွင်သာ အကျိုးသက်ရောက်မည် — ထို provider id ကို
   အဆိုပါ file ထဲရှိ `FULL_TEXT_RULE_PROVIDERS` သို့ ထည့်ပါ။ ထိုသို့မလုပ်ပါက
   `checkFallbackError` သည် structured `{code, type}` error ကိုသာ rule ထံ ပေးပို့မည်ဖြစ်ပြီး
   body-text rule သည် live traffic တွင် မည်သည့်အခါမျှ match ဖြစ်မည်မဟုတ်ပါ။
   `status`/`headers` ပေါ်တွင်သာ match ပြုလုပ်သော rules (Opencode သို့မဟုတ် Minimax
   rules များကဲ့သို့) သည် ဤ opt-in ကို မလိုအပ်ပါ။ ထို့အပြင် rule က
   `scope: "connection"` ကို ကြေညာထားပြီး ရည်ရွယ်ချက်မှာ အမှန်တကယ်
   connection-wide cooldown နှင့် same-request combo skip ကို ရရှိရန်ဖြစ်ပါက
   (သတင်းအချက်အလက် label တစ်ခုသာ မဟုတ်ပါက) provider id ကို အဆိုပါ file ထဲရှိ
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` သို့ ထည့်ပါ — ၎င်းသည်
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) နှင့်
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) တို့တွင်
   `isAgentrouterConnectionQuotaScope()`-style consumption ကို ထိန်းချုပ်သော
   အရာဖြစ်သည်။ ၎င်းမပါဝင်ပါက `scope` သည် `fallbackResult.ruleScope` မှတစ်ဆင့်
   ဆက်လက်စီးဆင်းမည်ဖြစ်သော်လည်း ၎င်းအပေါ် မည်သည့်လုပ်ဆောင်မှုမျှ ပြုလုပ်မည်မဟုတ်ပါ။
3. `tests/unit/upstream-status-restatement.test.ts` နှင့်
   `tests/unit/agentrouter-error-rules.test.ts` တို့ကို နမူနာယူ၍ unit tests များ
   ထည့်ပါ (`not-permanent` / `not-creditsExhausted` guards များအပါအဝင်၊ provider က
   allowlist လိုအပ်ပါက `resolveRuleMatchBody()` သည် ထို provider အတွက်သာ full text
   ပြန်ပေးကြောင်း အတည်ပြုသည့် test ကိုပါ ထည့်ပါ)။

`chatCore.ts`, `classifyError` သို့မဟုတ် combo တွင် ပြောင်းလဲမှုများ မလိုအပ်ပါ။

#### Egress-bucketed lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode family) ထဲရှိ provider များကို
IP-bucketed upstream အဖြစ် သတ်မှတ်သည် (opencode free tier သည် account-bucketed
မဟုတ်ဘဲ IP-bucketed ဖြစ်သည် — #9611 ကို ကြည့်ပါ)။ status-429 ကို
`quota_exhausted` **သို့မဟုတ်** `rate_limit_exceeded` အဖြစ် classify ပြုလုပ်ပါက
failing connection ၏ နောက်ဆုံးသိရှိထားသော egress IP နှင့် ကိုက်ညီသည့်
allowlisted-family connection အားလုံးကို rotation က ၎င်းတို့ကို စမ်းသပ်နိုင်မီ
cool down ပြုလုပ်သည်
— N-1 ကြိမ် အာမခံထားသကဲ့သို့ မအောင်မြင်မည့် upstream calls များကို ရှောင်ရှားရန်
ဖြစ်သည် (#10460/#10525 နှင့် ပုံစံတူ)။ `rate_limit_exceeded` ကို ရည်ရွယ်ချက်ရှိရှိ
ထည့်သွင်းထားခြင်းဖြစ်သည်။ `markAccountUnavailable` လမ်းကြောင်းတွင် opencode-specific
rules များသည် match မဖြစ်နိုင်ပါ (headers/body ကို `checkFallbackError` ထံ မပေးပို့ဘဲ
opencode သည် `FULL_TEXT_RULE_PROVIDERS` ထဲတွင် မပါဝင်သောကြောင့်)။ ထို့ကြောင့်
subscription-quota text ("monthly usage limit reached") ပါဝင်သော 429 ၏ body ကို
quota-text fallback (`buildSubscriptionQuotaFallback`, `accountFallback.ts`;
1h cooldown) က `quota_exhausted` အဖြစ် classify ပြုလုပ်ပြီး `status_429` rule သို့
မရောက်မီ အဆုံးသတ်မည်ဖြစ်သည် — quota-text မပါဝင်သော 429 (ရိုးရိုး rate limiting)
သည် `status_429` rule မှတစ်ဆင့် `rate_limit_exceeded` အဖြစ် classify ပြုလုပ်ကာ
IP family တစ်ခုလုံးကို ဆက်လက် cool down ပြုလုပ်မည်ဖြစ်သည်။ Allowlisted provider
တစ်ခုအတွက် IP-bucketed rate limit သည် exhausted quota နှင့် အချက်ပြမှုတူညီသည်။ ရိုးသားသော
ကန့်သတ်ချက်များမှာ:

- **အတတ်နိုင်ဆုံး**: lock သည် `proxy_logs` မှ connection ၏ နောက်ဆုံးသိရှိထားသော `egress_ip` ကို ဖြေရှင်းယူသည် (24h window၊ synchronous၊ cache မရှိ)။ Cold cache (`egress_ip` ကို တစ်ခါမျှ probe မလုပ်ရသေးခြင်း) သို့မဟုတ် row မရှိခြင်း ဖြစ်ပါက failing connection ကို branch က ဆက်လက် cooldown ပြုလုပ်သည် (ယနေ့ကဲ့သို့ မှတ်တမ်းတင်သည်)၊ sibling ကိုသာ lock မလုပ်ပါ။
- **အမြဲတမ်း terminal မဖြစ်ပါ**: cooldown သည် သက်တမ်းတိုးနိုင်သော quota window (`testStatus: "unavailable"`) ဖြစ်ပြီး IP-level signal မှ permanent state ကို မည်သည့်အခါမျှ derive မလုပ်ပါ။ `disableCooling` connections များသည် branch ကို လုံးဝကျော်သွားသည်။
- **allowlisted family အတွက် lock granularity ပြောင်းလဲသည်**: ၎င်းသည် sibling optimization သက်သက်မဟုတ်ဘဲ scope ပြောင်းလဲမှုဖြစ်သည်။ opencode သည် `passthroughModels` provider ဖြစ်သောကြောင့် ဤ branch မတိုင်မီ 429 သည် per-MODEL lockout ကို ဖြစ်စေခဲ့သည်။ ယခုတွင်မူ sibling လုံးဝမရှိသော connection တစ်ခုတည်းကို operator က run နေသည့်အခြေအနေအပါအဝင် connection cooldown ကို ဖြစ်စေသည်။ ၎င်းသည် opencode rule table တွင် မှန်ကန်သည်ဟု ကြေညာထားပြီးသား granularity (`scope: "connection"`၊ `providerErrorRules.ts`) ဖြစ်သော်လည်း opencode သည် `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ထဲတွင် မပါဝင်သဖြင့် ယခုအချိန်အထိ မည်သည့်အခါမျှ အသုံးမပြုခဲ့ပါ။ branch သည် failing connection ၏ cooldown + `backoffLevel` ကို ကိုယ်တိုင်ရေးသားပြီး connection-scoped agentrouter branch ကို အတုယူကာ return ပြုလုပ်သည် — ထို့ကြောင့် အောက်ရှိ per-model block နှင့် generic path များကို မည်သည့်အခါမျှ မရောက်ရှိပါ။
- **Combo ပါဝင်သည်**: agentrouter branch ကဲ့သို့ပင် ဤ scope သည် combo caller က 429 အတွက် အသုံးပြုသည့် `persistUnavailableState`/`isCombo` downgrade ကို ရည်ရွယ်ချက်ရှိရှိ လျစ်လျူရှုသည်။ per-model lockout သည် ဤ scope ၏ ပိုမိုပျော့ပြောင်းသောပုံစံမဟုတ်ဘဲ unit မှားယွင်းခြင်းဖြစ်သည်။ အဘယ်ကြောင့်ဆိုသော် ၎င်းသည် ကုန်ခမ်းသွားသော IP အကြောင်း မည်သည့်အချက်မျှ မပြောသောကြောင့် combo rotation သည် sibling တစ်ခုစီအတွက် အောင်မြင်နိုင်မည်မဟုတ်ကြောင်း သေချာပြီးသား call တစ်ကြိမ်စီကို ဆက်လက်အသုံးပြုနေမည်ဖြစ်သည်။
- **Sibling ဘေးကင်းရေး**: terminal အခြေအနေ (banned/credits_exhausted) သို့မဟုတ် ပိုရှည်သော cooldown ထဲတွင် ရှိနေပြီးသား sibling ကို မည်သည့်အခါမျှ overwrite မလုပ်ပါ။
- **သီးသန့် allowlist**: `EGRESS_BUCKETED_LOCK_PROVIDERS` ကို ချဲ့ထွင်ခြင်းသည် owner ၏ အတိအလင်းဆုံးဖြတ်ချက်ဖြစ်သည်။ generic wiring (pattern #10334/#10419) မပြုလုပ်ပါ။ sibling query သည် ထို allowlist တစ်ခုတည်းကို bind လုပ်ပြီး SQL literal အဖြစ် ထပ်မရေးထားသဖြင့် ၎င်းကို ချဲ့ထွင်ရန် တစ်ကြောင်းတည်း ပြောင်းလဲရုံဖြင့် ရသည်။
- **Egress IP rotation၊ ဦးတည်ချက်နှစ်ဖက်စလုံး**: lookup window (24h) သည် egress-IP cache TTL (5 min) ထက် များစွာကျယ်သောကြောင့် “last known IP” သည် လက်ရှိအခြေအနေမဟုတ်ဘဲ history ဖြစ်သည်။ connection တစ်ခု၏ proxy သည် window အတွင်း rotate ဖြစ်ခဲ့ပါက lock သည် အမှန်တကယ် shared ဖြစ်သော IP ကို **မတွေ့နိုင်** ပါ (မှတ်တမ်းတင်ထားသော IP သည် အသစ်ဖြစ်ပြီး မကုန်ခမ်းသေးသော IP ဖြစ်နေသောကြောင့်) — ထိုနည်းတူပင် exhausted IP မှ **လှည့်ထွက်သွားပြီးသား** sibling ကိုလည်း cooldown ပြုလုပ်မိနိုင်သည်။ ဒုတိယအခြေအနေတွင် ထို sibling သည် cooldown window တစ်ခုစာ ကုန်ကျမည်ဖြစ်ပြီး နှစ်မျိုးစလုံးသည် history-based lookup ၏ အတတ်နိုင်ဆုံး ကန့်သတ်ချက်များအဖြစ် လက်ခံထားသည်။
- **ကုန်ကျစရိတ်**: `proxy_logs` ကို bounded scan နှစ်ကြိမ် ပြုလုပ်သည် (`idx_pl_timestamp` မှတစ်ဆင့် window-filtered)၊ 429 ဖြစ်ပွားသည့်အကြိမ်ရေတွင်သာ လုပ်ဆောင်သည်။ Index အသစ် မလိုအပ်ပါ (migration 134 YAGNI)။ အလယ်အလတ်အရွယ်အစားရှိ real-traffic DB copy ပေါ်တွင် တိုင်းတာထားပြီး high-throughput instance သည် တူညီသော window အတွင်း row များကို အချိုးကျ ပိုမိုကိုင်ထားမည်ဖြစ်သည်။

## အခြား Resilience Feature များ

- **20 routing strategies** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) ကို ကြည့်ပါ။
- **Reset-aware routing** (v3.8.0) — quota reset အချိန်အရ connections များကို ဦးစားပေးသည်။
- **Background mode degradation** — Responses API `background: true` ကို သတိပေးချက်ဖြင့် sync သို့ လျှော့ချပေးသည်။
- **Dynamic tool limit detection** — tool အရေအတွက် ကန့်သတ်ချက်များ ရောက်ရှိသောအခါ providers များကို back off လုပ်စေသည်။
- **Emergency fallback** — `OMNIROUTE_EMERGENCY_FALLBACK` ဖြင့် ထိန်းချုပ်ထားသည်; operators များသည် restart မလုပ်ဘဲ Feature Flags စာမျက်နှာမှ ၎င်းကို override လုပ်နိုင်သည်။

---

## အမှားရှာဖွေခြင်း

- Weighted combo သည် `503 all_targets_cooling_down` ကို ပြန်ပေးသည် (`Retry-After` သတ်မှတ်ထားပြီး၊ `diagnostics.excluded` က target တိုင်းကို `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` ဖြင့် စာရင်းပြသည်) → pool သည် configure လုပ်ပြီး ချိတ်ဆက်ပြီးဖြစ်ကာ၊ target တိုင်းကို resilience timer တစ်ခုခုကသာ ဖယ်ထုတ်ထားခြင်းဖြစ်သည်; `[COMBO] Weighted selection: every target excluded before dispatch — …` warning သည် အကြောင်းရင်းများနှင့် ကျန်ရှိနေသော seconds များကို ဖော်ပြသည်။ Combo တစ်ခုတည်းမှ လာသော `404 no_executable_targets` ဆိုလျှင် resilience timer ဘာမှ ပါဝင်ခြင်းမရှိဟု ဆိုလိုသည် (လည်ပတ်စရာအရာ မရှိခြင်း၊ သို့မဟုတ် account တိုင်းသည် availability probe ကို မအောင်မြင်ခြင်း)။ `targetResolution.ts` တွင် စုဆောင်းထားသော exclusions များကို အခြေခံ၍ `open-sse/services/combo/pinRecovery.ts` တွင် တည်ဆောက်ထားသည်။
- Provider တစ်ခုအတွက် key အားလုံး ကျော်ခံသွားပါက → circuit breaker အခြေအနေ **နှင့်** connection တစ်ခုချင်းစီ၏ `rateLimitedUntil`/`testStatus` နှစ်ခုလုံးကို စစ်ဆေးပါ။
- Reset window ပြီးနောက် provider ကို အမြဲတမ်း ဖယ်ထုတ်ထားပါက → `getStatus()`/`canExecute()` အစား raw `state` ကို ဖတ်နေသော code ဖြစ်နေခြင်းဖြစ်သည်။
- Key တစ်ခု ပျက်ကွက်ပြီး အခြားအရာများ အလုပ်လုပ်သင့်ပါက → circuit breaker အစား connection cooldown ကို ဦးစားပေးပါ။
- Model တစ်ခုသာ ပျက်ကွက်ပါက → connection cooldown အစား model lockout ကို ဦးစားပေးပါ။
- အခြေအနေသည် အလိုအလျောက် ပြန်လည်ကောင်းသင့်သော်လည်း မဖြစ်ပါက → အနာဂတ် timestamp ရှိမရှိ နှင့် သက်တမ်းကုန်ဆုံးသွားသော အခြေအနေကို refresh လုပ်ပေးသော read path ရှိမရှိ စစ်ဆေးပါ။ Permanent statuses များသည် manual ပြောင်းလဲမှုများ လိုအပ်သည်။

---

## Runtime အခြေအနေ — agent အမြန် ရည်ညွှန်း

> agent လမ်းညွှန်သည် 40k context budget အောက်တွင် ဆက်လက်ရှိနေစေရန်
> `AGENTS.md` → "Resilience Runtime State" (PR #12743) မှ verbatim အတိုင်း ရွှေ့ပြောင်းထားခြင်း ဖြစ်သည်။
> ၎င်းသည် အပေါ်ရှိ ကဏ္ဍများ၏ အကျဉ်းချုပ်၊ agent-facing ရှုထောင့်ဖြစ်ပြီး;
> နံပါတ်ရှိသော ကဏ္ဍများမှာ အပြည့်အစုံ ရည်ညွှန်းချက်အဖြစ် ဆက်လက်တည်ရှိသည်။

OmniRoute တွင် ဆက်စပ်သော်လည်း ကွဲပြားသော temporary-failure ယန္တရား သုံးခု ရှိသည်။ routing
အပြုအမူကို debug လုပ်သည့်အခါ ၎င်းတို့၏ scope ကို သပ်သပ်စီ ခွဲထားပါ။
တစ်ချက်ကြည့်လျှင် မြင်နိုင်သော မြေပုံတစ်ခုအတွက်
[3-အလွှာ resilience diagram](../diagrams/exported/resilience-3layers.svg)
(source: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
ကို ကြည့်ပါ။

### Provider Circuit Breaker

**အကျယ်အဝန်း**: provider တစ်ခုလုံး၊ ဥပမာ `glm`, `openai`, `anthropic`။

**ရည်ရွယ်ချက်**: upstream/service အဆင့်တွင် ထပ်ခါထပ်ခါ ပျက်ကွက်နေသော provider သို့ traffic ပေးပို့ခြင်းကို
ရပ်တန့်စေရန်၊ ထိုသို့ဖြင့် ကျန်းမာရေးမကောင်းသော provider တစ်ခုတည်းက တောင်းဆိုမှုတိုင်းကို
နှေးကွေးစေမည် မဟုတ်ပေ။

**အကောင်အထည်ဖော်မှု**:

- အဓိက class: `src/shared/utils/circuitBreaker.ts`
- Chat gate/execution ချိတ်ဆက်မှု: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Runtime status API: `src/app/api/monitoring/health/route.ts`
- မျှဝေအသုံးပြုသော wrappers: `open-sse/services/accountFallback.ts`
- သိမ်းဆည်းထားသော state ဇယား: `domain_circuit_breakers`

**အခြေအနေများ** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: ပုံမှန် traffic ကို ခွင့်ပြုထားသည်။
- `DEGRADED`: အစောပိုင်း သတိပေးချက် အပိုင်း — ပျက်ကွက်မှုများသည် degradation threshold ကို
  ကျော်သွားသော်လည်း breaker threshold ကို မကျော်ရသေးပါ; traffic ဆက်လက်စီးဆင်းနေပြီး၊
  dashboards များတွင် သတိပေးချက်ကို ပြသသည်။ မှန်ကန်သော connection test တစ်ခု သို့မဟုတ်
  ပျက်ကွက်မှုအသစ်မရှိသော တည်ငြိမ်သော window တစ်ခုက ၎င်းကို `CLOSED` သို့ ပြန်လည်ရောက်ရှိစေသည်
  (window ကို `docs/architecture/RESILIENCE_GUIDE.md` တွင် ဖော်ပြထားသည်)။
- `OPEN`: provider ကို ခေတ္တ ပိတ်ဆို့ထားသည်; callers များသည် provider-circuit-open
  တုံ့ပြန်ချက်ကို ရရှိမည်ဖြစ်ပြီး၊ သို့မဟုတ် combo routing သည် အခြား target တစ်ခုသို့ ကျော်သွားမည်ဖြစ်သည်။
- `HALF_OPEN`: reset timeout ကုန်ဆုံးသွားပြီ ဖြစ်သည်; probe request တစ်ခုကို ခွင့်ပြုပါ။
  အောင်မြင်ပါက breaker ပိတ်သွားပြီး၊ ပျက်ကွက်ပါက ပြန်ဖွင့်သွားမည်ဖြစ်သည်။

**ပုံသေတန်ဖိုးများ** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`,
`src/lib/resilience/settings.ts` ရှိ `DEFAULT_RESILIENCE_SETTINGS.providerBreaker` မှတစ်ဆင့်
အသုံးပြုသည် → `src/sse/handlers/chatHelpers.ts` ရှိ `getCircuitBreaker(provider, …)`)။
Provider တစ်ခုလုံး breaker သည် `circuitBreakerThreshold` / `circuitBreakerReset` ပေါ်တွင်
လည်ပတ်သည်:

| Profile |    degrade အဆင့် | open အဆင့် (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| ------- | ---------------: | -------------------------------------: | ----------------------------: |
| OAuth   |              `5` |                                    `8` |                         `60s` |
| API key |              `7` |                                   `12` |                         `30s` |
| Local   | (ဆင်းသက်တွက်ထား) |                                    `2` |                         `15s` |

`PROVIDER_PROFILES` သည် `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 မိနစ်) နှင့် `providerCooldownMs` (5/10/1 မိနစ်) ကိုလည်း
သတ်မှတ်ပေးသည်: ၎င်းတို့သည် **opt-in global Provider Cooldown ၏ window gate** ကို
မောင်းနှင်စေသည် (`PROVIDER_COOLDOWN_ENABLED`, ပုံသေအဖြစ် ပိတ်ထား) —
`open-sse/services/providerCooldownTracker.ts` ရှိ provider-level entry တစ်ခုသည်
`providerFailureWindowMs` အတွင်း `providerFailureThreshold` ကြိမ် ပျက်ကွက်ပြီးနောက်သာ
cooldown အဖြစ် ရေတွက်ခံရပြီး၊ ထို့နောက် `providerCooldownMs` ကြာအောင် cooldown ဖြစ်သည်။
၎င်းတို့သည် လက်ရှိ breaker ၏ thresholds များ **မဟုတ်ပါ** — breaker အပြုအမူကို
မျှော်လင့်ပြီး ၎င်းတို့ကို မညှိနှိုင်းပါနှင့်။ ပုံသေတန်ဖိုးတိုင်းကို
`OMNIROUTE_PROVIDER_BREAKER_*` နှင့် `OMNIROUTE_CIRCUIT_BREAKER_*` env vars များမှတစ်ဆင့်
override လုပ်နိုင်ပြီး; runtime-အတိုင်း တိကျသော ရည်ညွှန်းဇယားသည်
`docs/architecture/RESILIENCE_GUIDE.md` တွင် ရှိသည်။

Provider-level ပျက်ကွက်မှု statuses များသာ provider breaker ကို trip လုပ်သင့်သည်:

```ts
(408, 500, 502, 503, 504);
```

ပုံမှန် account/key/model အမှားများ (ဥပမာ `401`, `403`, သို့မဟုတ် `429` cases အများစု) အတွက်
provider တစ်ခုလုံး breaker ကို trip မလုပ်ပါနှင့်။ ၎င်းတို့သည် ပုံမှန်အားဖြင့် connection
cooldown သို့မဟုတ် model lockout ၏ ကဏ္ဍဖြစ်သည်။ Generic API-key provider `403` တစ်ခုသည်
terminal provider/account error အဖြစ် ခွဲခြားသတ်မှတ်ခံရခြင်း မရှိပါက ပြန်လည်ကောင်းမွန်နိုင်သင့်သည်။

Breaker သည် background timer မဟုတ်ဘဲ lazy recovery ကို အသုံးပြုသည်။ `OPEN` သက်တမ်းကုန်သွားသောအခါ၊ `getStatus()`၊ `canExecute()` နှင့် `getRetryAfterMs()` ကဲ့သို့သော read များက state ကို `HALF_OPEN` သို့ ပြန်လည်သစ်စေသောကြောင့်၊ dashboard များနှင့် combo candidate builder များသည် သက်တမ်းကုန်သွားသော provider ကို အဆုံးအဖြတ် ချန်လှပ်ထားခြင်း မရှိတော့ပါ။

### Connection Cooldown

**အကျုံးဝင်ပိုင်နက်**: provider connection/account/key တစ်ခု။

**ရည်ရွယ်ချက်**: တူညီသော provider ၏ အခြား connection များ ဆက်လက် request များ ဝန်ဆောင်မှုပေးနေစဉ်၊ ညံ့ဖျင်းနေသော key/account တစ်ခုကို ခေတ္တကျော်လွှားရန်။

**အကောင်အထည်ဖော်ပုံ**:

- ရေးသား/အပ်ဒိတ်လုပ်ရန် လမ်းကြောင်း: `src/sse/services/auth.ts::markAccountUnavailable()`
- Account ရွေးချယ်မှု/စစ်ထုတ်မှု: `src/sse/services/auth.ts::getProviderCredentials...`
- Cooldown တွက်ချက်မှု: `open-sse/services/accountFallback.ts::checkFallbackError()`
- ဆက်တင်များ: `src/lib/resilience/settings.ts`

Provider connection များပေါ်ရှိ အရေးကြီးသော field များ:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Account ရွေးချယ်စဉ်တွင်၊ အောက်ပါအခြေအနေဖြစ်နေချိန် connection တစ်ခုကို ကျော်လွှားပါသည်:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldown များသည်လည်း lazy ဖြစ်သည်: `rateLimitedUntil` သည် အတိတ်ကာလသို့ ရောက်သွားသောအခါ connection သည် ပြန်လည်အသုံးပြုနိုင်အဆင့်သို့ ရောက်ရှိသွားသည်။ အောင်မြင်စွာအသုံးပြုပြီးနောက် `clearAccountError()` က `testStatus`၊ `rateLimitedUntil`၊ error field များနှင့် `backoffLevel` ကို ရှင်းလင်းပေးသည်။

မူရင်းသတ်မှတ်ထားသော connection cooldown အပြုအမူ:

- OAuth အခြေခံ cooldown: `5s`။
- API-key အခြေခံ cooldown: `3s`။
- API-key `429` အတွက် ရရှိနိုင်သောအခါ upstream retry အကြံပြုချက်များ (`Retry-After`၊ reset header များ သို့မဟုတ် parse လုပ်နိုင်သော reset စာသား) ကို ဦးစားပေးသင့်သည်။
- ထပ်ခါတလဲလဲဖြစ်သော ပြန်လည်ကုစားနိုင်သော ချို့ယွင်းချက်များသည် exponential backoff ကို အသုံးပြုသည်:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Anti-thundering-herd guard သည် တူညီသော connection ပေါ်တွင် တပြိုင်နက်တည်း ဖြစ်ပေါ်သော ချို့ယွင်းချက်များမှ cooldown ကို ထပ်ခါတလဲလဲ တိုးချဲ့ခြင်း သို့မဟုတ် `backoffLevel` ကို နှစ်ဆတိုးခြင်းမှ တားဆီးပေးသည်။

Terminal state များသည် cooldown များ မဟုတ်ပါ။ `banned`၊ `expired` (`EXPIRED_RETRY_MAX` မှတဆင့် ကန့်သတ်ထားသော retry N ကြိမ်ပြီးမှသာ terminal ဖြစ်သွားသည်) နှင့် `credits_exhausted` တို့သည် credentials/settings ပြောင်းလဲမှု သို့မဟုတ် operator ၏ ပြန်လည်သတ်မှတ်မှု မရှိမချင်း မရရှိနိုင်ဘဲ ဆက်လက်နေထိုင်ရန် ရည်ရွယ်ထားသည်။ Terminal state များကို ခေတ္တ cooldown state ဖြင့် အစားထိုးရေးသားခြင်း မပြုပါနှင့်။

### Model Lockout

**အကျုံးဝင်ပိုင်နက်**: provider + connection + မော်ဒယ်။

**ရည်ရွယ်ချက်**: ၎င်း connection အတွက် မော်ဒယ်တစ်ခုတည်းသာ မရရှိနိုင်ခြင်း သို့မဟုတ် quota ကန့်သတ်ခံရခြင်း ဖြစ်စဉ်၊ connection တစ်ခုလုံးကို ပိတ်ထားခြင်းမှ ရှောင်ကြဉ်ရန်။

ဥပမာများ:

- `429` ပြန်ပေးသော မော်ဒယ်လိုက် quota provider များ။
- ပျောက်ဆုံးနေသော မော်ဒယ်တစ်ခုအတွက် `404` ပြန်ပေးသော local provider များ။
- ရွေးချယ်ထားသော Grok mode များကဲ့သို့သော provider သီးခြား mode/model ခွင့်ပြုချက် ချို့ယွင်းမှုများ။

Model lockout သည် `open-sse/services/accountFallback.ts` တွင် တည်ရှိပြီး၊ တူညီသော connection မှ အခြားမော်ဒယ်များကို ဆက်လက်ဝန်ဆောင်မှုပေးနိုင်စေသည်။

### Debugging လမ်းညွှန်ချက်များ

- Provider တစ်ခု၏ key အားလုံး ကျော်လွှားခံနေရပါက၊ provider breaker state နှင့် connection တစ်ခုချင်းစီ၏ `rateLimitedUntil`/`testStatus` နှစ်ခုလုံးကို စစ်ဆေးပါ။
- Reset window ပြီးနောက် provider တစ်ခုကို အမြဲတမ်း ချန်လှပ်ထားသကဲ့သို့ တွေ့ရပါက၊ code သည် `getStatus()`/`canExecute()` ကို အသုံးမပြုဘဲ raw `state` ကို ဖတ်နေသည်ရှိမရှိ စစ်ဆေးပါ။
- Provider key တစ်ခု ချို့ယွင်းသော်လည်း အခြားသော key များ အလုပ်လုပ်သင့်ပါက၊ provider breaker ထက် connection cooldown ကို ဦးစားပေးပါ။
- မော်ဒယ်တစ်ခုတည်းသာ ချို့ယွင်းပါက၊ connection cooldown ထက် model lockout ကို ဦးစားပေးပါ။
- State တစ်ခု ကိုယ်တိုင်ပြန်လည်ကောင်းမွန်သင့်ပါက၊ ၎င်းတွင် အနာဂတ် timestamp/reset timeout နှင့် သက်တမ်းကုန်သွားသော state ကို ပြန်လည်သစ်စေသော read path ရှိသင့်သည်။ အမြဲတမ်း status များအတွက်မှာ manual credential သို့မဟုတ် config ပြောင်းလဲမှုများ လိုအပ်သည်။

---

## TLS Fingerprinting နှင့် Stealth

Provider အလိုက် stealth (JA3/JA4, CCH, obfuscation) ကို သီးခြားစီ မှတ်တမ်းတင်ထားပါသည် — `docs/security/STEALTH_GUIDE.md` ကို ကြည့်ပါ (git တွင်သာရှိပြီး `/docs` အတွင်းသို့ compile လုပ်မထားပါ)။

---

## ခံနိုင်ရည် စမ်းသပ်ခြင်း (Phase 8 · Block C)

Resilience logic အတွက် unit test များအပြင်၊ test သုံးခုက runtime ကို အစစ်အမှန် stress/ပျက်စီးမှုအခြေအနေများအောက်တွင် စမ်းသပ်ပါသည် (အားလုံးသည် integration/nightly ဖြစ်ပြီး — PR များကို block လုပ်ခြင်း မရှိပါ):

| Test        | ဘာကို စမ်းသပ်သနည်း                                                                                                                                                                                                                      | Run                                      |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Fake-upstream node က အစစ်အမှန် latency/reset/timeout/503 ကို ထည့်သွင်းစမ်းသပ်ပြီး circuit breaker ဖွင့်ခြင်း/ပြန်လည်ကောင်းမွန်လာခြင်းနှင့် `checkFallbackError` က 503 ကို recoverable fallback အဖြစ် ခွဲခြားသတ်မှတ်မှုကို အတည်ပြုပါသည်။ | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | `--expose-gc` အောက်တွင် `createSSEStream` တစ်ခုလျှင် stream ခန ၅၀၀; heap သည် သတ်မှတ်ထားသော ceiling ကျော်လွန်ကြီးထွားလာပါက fail ဖြစ်ပါသည် (OOM guard #3069)။                                                                             | `npm run test:heap`                      |
| k6 soak     | `/api/monitoring/health` သို့ ဆက်တိုက်ဝန်ပေါစေခြင်း; p95/error thresholds များ။                                                                                                                                                         | `k6 run tests/load/k6-soak.js` (nightly) |

`.github/workflows/nightly-resilience.yml` (cron + dispatch) မှ စီစဉ်ဆောင်ရွက်ပါသည်။ Default `test:integration` တွင် chaos နှင့် heap ကို ကိုယ်တိုင် skip လုပ်ပါသည် (`RUN_CHAOS_INT`/`--expose-gc` မပါဝင်ပါက)။

---

## ဆက်စပ်ကြည့်ရှုရန်

- [Architecture Guide](./ARCHITECTURE.md) — စနစ်တည်ဆောက်ပုံနှင့် အတွင်းပိုင်းဆိုင်ရာ အသေးစိတ်များ
- [အသုံးပြုသူလမ်းညွှန်](../guides/USER_GUIDE.md) — Provider များ၊ combo များ၊ CLI integration
- [Auto-Combo Engine](../routing/AUTO-COMBO.md) — အချက် ၁၆ ခု scoring၊ mode pack များ
