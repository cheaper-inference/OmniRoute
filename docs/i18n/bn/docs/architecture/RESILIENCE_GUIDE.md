# Resilience Guide (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute এর তিনটি স্বতন্ত্র কিন্তু সম্পর্কিত স্থিতিস্থাপকতা প্রক্রিয়া রয়েছে। প্রতিটিরই আলাদা সুযোগ এবং উদ্দেশ্য রয়েছে। রাউটিং আচরণ ডিবাগ করার সময় তাদের আলাদা রাখুন।

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> সূত্র: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **স্থিতিস্থাপকতা টগলের জন্য Env-vs-ড্যাশবোর্ড অগ্রাধিকার।** অপ্ট-ইন স্থিতিস্থাপকতা — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — শুধুমাত্র _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`) সরবরাহ করে। একটি বুলিয়ান `resilienceSettings` (ড্যাশবোর্ড →** সেটিংস → স্থিতিস্থাপকতা** / `PATCH /api/resilience`, `key_value` এ সংরক্ষিত ) env মানের উপর জয়লাভ করে: স্বাভাবিকীকরণ (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) যখনই একটি বিদ্যমান থাকে তখনই সঞ্চিত বুলিয়ান রাখে। এমন একটি env var সেট করা একটি স্থাপনার উপর `true` এ সেট করা যেখানে ড্যাশবোর্ড ইতিমধ্যেই `false` সংরক্ষণ করেছে তাই — টগলটি ফ্লিপ করে কিছুই পরিবর্তন করে না** সেটিংস → স্থিতিস্থাপকতা** (বা সঞ্চিত ক্ষেত্র সাফ করুন) পরিবর্তে।

## ১. প্রোভাইডার সার্কিট ব্রেকার

**স্কোপ:** সম্পূর্ণ প্রোভাইডার (যেমন, `glm`, `openai`, `anthropic`)।

**উদ্দেশ্য:** আপস্ট্রিম/সার্ভিস লেভেলে বারবার ব্যর্থ হচ্ছে এমন প্রোভাইডারের কাছে ট্রাফিক পাঠানো বন্ধ করা।

**ইমপ্লিমেন্টেশন:**

- মূল ক্লাস: `src/shared/utils/circuitBreaker.ts`
- ওয়্যারিং: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- স্ট্যাটাস API: `GET /api/monitoring/health`
- রিসেট API: `POST /api/resilience/reset`
- র্যাপার: `open-sse/services/accountFallback.ts`
- ডিবি টেবিল: `domain_circuit_breakers`

**স্টেট:**

- `CLOSED` — স্বাভাবিক ট্রাফিক অনুমোদিত
- `DEGRADED` — ট্রাফিক এখনও অনুমোদিত, তবে বর্ধিত প্রোভাইডার ব্যর্থতা ট্র্যাক করা হচ্ছে; যথেষ্ট সফলতা হলে, কোনো বৈধ কানেকশন টেস্ট সফল হলে, অথবা শেষ ব্যর্থতার ধরনের জন্য দীর্ঘতম `OPEN` হোল্ডের পর (তার `cooldownByKind` মান, অন্যথায় `resetTimeout`, × `maxBackoffMultiplier`, কমপক্ষে একটি কুলডাউন) নতুন কোনো ব্যর্থতা ছাড়াই `CLOSED`-এ ফিরে আসে
- `OPEN` — প্রোভাইডার সাময়িকভাবে ব্লক করা; কম্বো রাউটিং এটি এড়িয়ে যায়
- `HALF_OPEN` — রিসেট টাইমআউট শেষ হয়েছে; প্রোব রিকোয়েস্ট অনুমোদিত

**কনফিগারযোগ্য ডিফল্ট (`open-sse/config/constants.ts`, Dashboard → Settings → Resilience-এ প্রকাশিত):**

| ক্লাস   | ডিগ্রেড হয়  | ওপেন হয়      | রিসেট টাইমআউট |
| ------- | ------------ | ------------- | ------------- |
| OAuth   | 5টি ব্যর্থতা | 8টি ব্যর্থতা  | 60s           |
| API-key | 7টি ব্যর্থতা | 12টি ব্যর্থতা | 30s           |
| Local   | উদ্ভূত       | 2টি ব্যর্থতা  | 15s           |

`degradationThreshold` নিয়ন্ত্রণ করে প্রোভাইডার কখন `DEGRADED`-এ প্রবেশ করে; `failureThreshold` নিয়ন্ত্রণ করে কখন এটি ওপেন হয় এবং এড়িয়ে যাওয়া হয়। লোকাল প্রোভাইডার প্রোফাইল এখনও Resilience সেটিংস পেজে প্রকাশ করা হয়নি।

**ট্রিপ কোড:** শুধুমাত্র প্রোভাইডার-লেভেল স্ট্যাটাস `[408, 500, 502, 503, 504]`। অ্যাকাউন্ট-লেভেল ত্রুটির জন্য ট্রিপ করবেন না (বেশিরভাগ 401/403/429 — সেগুলো কুলডাউন বা লকআউটের অন্তর্গত)।

**লেজি রিকভারি:** যখন `OPEN`-এর মেয়াদ শেষ হয়, `getStatus()`, `canExecute()`, `getRetryAfterMs()` স্টেটকে `HALF_OPEN`-এ রিফ্রেশ করে। একই রিডগুলো (এবং পরবর্তী ব্যর্থতা) পুরনো `DEGRADED`-কে আবার `CLOSED`-এ নামিয়ে আনে। কোনো ব্যাকগ্রাউন্ড টাইমারের প্রয়োজন নেই।

---

### অপ্ট-ইন গ্লোবাল প্রোভাইডার কুলডাউন (উইন্ডো গেট)

একটি চতুর্থ, **অপ্ট-ইন** স্তর (`PROVIDER_COOLDOWN_ENABLED`, ডিফল্ট **অফ**) `open-sse/services/providerCooldownTracker.ts`-এ ব্যর্থ প্রোভাইডারদের একটি ক্রস-রিকোয়েস্ট মেমরি রাখে, যা কম্বো টার্গেট রেজোলিউশন করার সময় পরামর্শ করা হয়, যাতে পরপর কম্বো রিকোয়েস্টগুলো এইমাত্র ব্যর্থ হওয়া কোনো প্রোভাইডারে পুনরায় যাওয়া বন্ধ করে। প্রোভাইডার-লেভেল এন্ট্রিগুলো `PROVIDER_PROFILES` উইন্ডো গেট মেনে চলে:

| প্রোফাইল | ট্রিপ হয় এর পরে (`providerFailureThreshold`) | এর মধ্যে (`providerFailureWindowMs`) | কুলডাউন সময় (`providerCooldownMs`) |
| -------- | --------------------------------------------: | -----------------------------------: | ----------------------------------: |
| OAuth    |                                          `10` |                              `15min` |                              `5min` |
| API key  |                                          `15` |                              `30min` |                             `10min` |

থ্রেশহোল্ডের নিচে প্রোভাইডারকে কুলিং হিসেবে ধরা হয় **না**; একটি সফলতা উইন্ডোটি মুছে দেয়। কানেকশন-লেভেল এন্ট্রিগুলো (`provider:connectionId`) এর পরিবর্তে এক্সপোনেনশিয়াল `minRetryCooldownMs → maxRetryCooldownMs` ব্যাকঅফ বজায় রাখে। ওভাররাইড: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`। রিগ্রেশন গার্ড: `tests/unit/provider-cooldown-window-gate.test.ts`।

## ২. সংযোগ কুলডাউন

**পরিধি:** একক provider connection/account/key।

**উদ্দেশ্য:** একই provider-এর অন্যান্য connection যেন সেবা চালিয়ে যেতে পারে, সে জন্য একটি অকার্যকর key বাদ দেওয়া।

**বাস্তবায়ন:**

- অপ্রাপ্য হিসেবে চিহ্নিতকরণ: `src/sse/services/auth.ts::markAccountUnavailable()`
- নির্বাচন: একই ফাইলে `getProviderCredentials*`
- কুলডাউন গণনা: `open-sse/services/accountFallback.ts::checkFallbackError()`
- সেটিংস: `src/lib/resilience/settings.ts`

**প্রতি connection-এর ফিল্ড:**

- `rateLimitedUntil` — কুলডাউন শেষ হওয়া পর্যন্ত timestamp
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — exponential backoff counter

**ডিফল্ট কুলডাউন:**

- OAuth base: 5s
- API-key base: 3s
- API-key 429: upstream `Retry-After`/reset headers/parseable reset text-কে অগ্রাধিকার দেয়
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Provider-ভিত্তিক retry delay।** Provider detail page-এ একটি **Retry delay** select রয়েছে (Auto,
15s থেকে 1h পর্যন্ত)। এটি
`resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600, `PATCH /api/resilience`-এর মাধ্যমে) সংরক্ষণ করে। যখন rate-limit error-এর সঙ্গে কোনো upstream retry
hint থাকে না, তখন এই মানটি provider-এর জন্য scaled backoff-এর পরিবর্তে ব্যবহৃত হয় এবং
`backoffLevel`-কে 0-তে reset করে (`open-sse/services/rotationConfig.ts::overrideFor`)। Rate-limited error-এর
জন্য অগ্রাধিকারের ক্রম, সর্বোচ্চ থেকে: upstream retry hint, এরপর প্রতি-connection
`providerSpecificData.rotationOverrides.rateLimitResetSeconds`, এরপর provider-ভিত্তিক retry delay, এরপর
env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, এবং সবশেষে scaled backoff। Auto ফিল্ডটি সরিয়ে দেয়।
এটি কেবল rate-limit reason-এ প্রভাব ফেলে, terminal state-এ কখনো নয়।

**Anti-thundering-herd guard:** সমসাময়িক failure-এর কারণে cooldown অতিরিক্ত বাড়ানো বা
`backoffLevel` দ্বিগুণ increment হওয়া প্রতিরোধ করে।

**Concurrency-limit 429 backoff ladder-এ বাড়ে না।** এমন একটি `429`, যার body-তে
concurrency limit ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) জানানো থাকে, তার অর্থ account সুস্থ, তবে ব্যস্ত।
`checkFallbackError()` reason `concurrency_limited` ফেরত দেয়: এখনই পরবর্তী
connection-এ fail over করে, এই connection-কে নির্দিষ্ট `CONCURRENCY_LIMIT_COOLDOWN_MS` cooldown (1s)
অথবা upstream retry hint অনুযায়ী cool করে, `backoffLevel` অপরিবর্তিত রাখে এবং
`skipProviderBreaker` সেট করে। Explicit quota body থাকলে সেটিই প্রাধান্য পায়, তাই এমন body যা
quota pattern-এর সঙ্গেও মেলে, সেটি quota verdict হিসেবেই থাকে। Detection:
`src/shared/utils/classify429.ts`-এর `looksLikeConcurrencyLimit()`;
verdict: `open-sse/services/accountFallback/concurrencyLimit429.ts`। `classify429()`-এর
(breaker-এর `FailureKind`) কোনো পরিবর্তন হয়নি এবং এই body-গুলোর জন্যও এটি এখনও `rate_limit` পড়ে।

**Stream content stall account-কে cool করে না।** যখন content-stall watchdog
(`open-sse/utils/streamHandler.ts`) এমন একটি stream-এ হাল ছেড়ে দেয়, যা নির্ধারিত সময়ের মধ্যে কোনো model output পাঠায়নি,
তখন `markAccountUnavailable()` connection-এ error রেকর্ড করে, কিন্তু কোনো cooldown সেট করে না: stall-টি
সেই request-এর, অধিকাংশ ক্ষেত্রে output আসার আগে দীর্ঘ reasoning turn চলার কারণে। Operator-রা
`resilienceSettings.streamStallCooldown.enabled` (ডিফল্ট `false`) দিয়ে এটি পুনরায় সক্রিয় করতে পারেন।

**`p2c` account selection-এর জন্য opt-in latency signal।** প্রতিটি dispatched attempt প্রতি connection
(এবং প্রতি connection + model) অনুযায়ী তার time-to-first-byte ও outcome একটি in-memory rolling window-তে রেকর্ড করে:
15 মিনিটের মধ্যে সর্বশেষ 20টি sample
(`open-sse/services/connectionLatencyTracker.ts`, `src/sse/handlers/chatHelpers.ts`-এর
`safeLogEvents()` থেকে রেকর্ড করা হয়)। যখন `resilienceSettings.p2cLatency.weight` `0`-এর বেশি
(range 0-20, ডিফল্ট `0` = বন্ধ), তখন `src/sse/services/auth.ts`-এর
`compareP2CConnections()` জোড়ার প্রতিটি candidate-কে সর্বোচ্চ `weight` পয়েন্ট যোগ করে। এর অর্ধেক আসে
দ্রুততর candidate-এর তুলনায় latency ratio থেকে (দুই গুণ ধীর হলে পূর্ণ অর্ধেক পাওয়া যায়), এবং অর্ধেক আসে
rolling error rate থেকে। উভয় candidate-এর কমপক্ষে 3টি sample থাকলেই এই term প্রযোজ্য হয়, ফলে নতুন
account-গুলো শাস্তি পায় না, এবং এর ceiling quota-blocked ও quota-exhausted penalty-এর নিচেই থাকে। এটি
নিজস্ব কোনো circuit যোগ করে না: ব্যর্থ account-গুলো এখনও cooldown, lockout এবং breaker layer দ্বারা
পরিচালিত হয়। এটি `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` দিয়ে সেট করুন।

**Reasoning frame content-stall budget পুনরায় চালু করে।** একটি reasoning model প্রথম দৃশ্যমান token পাঠানোর আগে
কয়েক মিনিট ধরে চিন্তা করতে পারে: Claude এমন `thinking_delta` frame stream করে যার thinking text খালি হতে পারে,
এবং Responses API একটির পর একটি reasoning item stream করে। `isReasoningProgressFrame()`
(`open-sse/utils/streamReadiness.ts`) এই frame-গুলো শনাক্ত করে, আর watchdog প্রতিটি frame-এ তার budget
পুনরায় শুরু করে, turn বাতিল করার পরিবর্তে। এগুলো এখনও model output নয়, তাই reasoning-only অবস্থায় শেষ হওয়া
turn এখনও empty হিসেবে report হয়, এবং reasoning থেমে শুধু heartbeat পাঠালে turn এখনও watchdog trigger করে।

Kiro-এর non-empty signature-সহ binary `reasoningContentEvent` frame-গুলো executor-এর মধ্য দিয়ে এই
reasoning activity-কে খালি `reasoning_content` delta হিসেবে সংরক্ষণ করে। Signature forward করা হয় না।
Metadata, incomplete frame এবং empty signature content budget পুনরায় চালু করে না; independent
active-stream timeout এবং client cancellation এখনও প্রযোজ্য (`open-sse/executors/kiro/reasoning.ts`)।

**Terminal state (কুলডাউন নয়):**

- `banned` — banned-keyword / account-ban detection দ্বারা সেট হয় (দেখুন [BAN_DETECTION](../security/BAN_DETECTION.md))। Upstream per-request refusal (`request_rejected`, যেমন Anthropic OAuth 403 "Request not allowed") কখনো এটি সেট করে না: এগুলো প্রতি connection ও model অনুযায়ী গণনা করা হয় এবং ক্রমবর্ধমান cooldown-সহ সেই model-কে rotation থেকে সরিয়ে নেয়, যা `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h)-এ সীমাবদ্ধ থাকে; অথবা কোনো model জানা না থাকলে connection-কে cool করে — `open-sse/services/requestRejectedStreak.ts`
- `expired` (সীমাবদ্ধ retry-এর পর terminal-এ রূপান্তরিত হয় — exponential backoff-সহ `EXPIRED_RETRY_MAX = 3` — যাতে transient OAuth error account স্থায়ীভাবে deactivated হওয়ার আগে নিজে থেকে ঠিক হতে পারে)
- `credits_exhausted`

এগুলো ক্রেডেনশিয়াল পরিবর্তন করা বা কোনো অপারেটর রিসেট না করা পর্যন্ত বহাল থাকে। টার্মিনাল অবস্থাগুলোকে ক্ষণস্থায়ী কুলডাউন অবস্থার মাধ্যমে ওভাররাইট করবেন না।

**অলস পুনরুদ্ধার:** `rateLimitedUntil` অতিক্রান্ত হলে সংযোগটি আবার যোগ্য হয়ে যায়। সফল ব্যবহারের পর, `clearAccountError()` সব ত্রুটি-ক্ষেত্র পরিষ্কার করে।

### Claude OAuth ব্যবহারের সীমা: নিম্ন-অগ্রাধিকার লেন + সেশন-সীমা রিসেট

**পরিসর:** একটি Claude সাবস্ক্রিপশন (OAuth) সংযোগ। উভয় বৈশিষ্ট্যই **প্রতি সংযোগে opt-in** (Edit connection → Claude section → `lowPriorityMode` / `autoLimitReset` in `providerSpecificData`, উভয়টির ডিফল্ট বন্ধ) এবং Claude Code-এর `/low-priority` ও `/limit-reset` কমান্ডের প্রতিরূপ (Claude Code 2.1.263 থেকে নেওয়া wire contract)।

**বাস্তবায়ন:**

- State machine + response classification: `open-sse/services/claudeLowPriority.ts`
- Reset status/claim client: `open-sse/services/claudeLimitReset.ts`
- Executor hook (header injection + same-account retry): `open-sse/executors/base.ts::execute()`
- Opt-in persistence: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ট্রিগার:** ৫ ঘণ্টার ব্যবহারের সীমা — এমন একটি `429` যার হেডারে
`anthropic-ratelimit-unified-status: rejected` এবং, অ্যাকাউন্ট যোগ্য হলে,
`anthropic-ratelimit-unified-slow-offer: treatment` থাকে। প্রথম সীমা-সংক্রান্ত
`429`-এর আগে কিছুই পাঠানো হয় না; unified header ছাড়া burst `429` সাধারণ কুলডাউন পথে যায়।

**নিম্ন-অগ্রাধিকার লেন** (`lowPriorityMode`):

- সীমা-সংক্রান্ত `429`-এ executor অফারটি গ্রহণ করে এবং অবিলম্বে একই
  অ্যাকাউন্টে `anthropic-usage-limit: slow` সহ পুনরায় চেষ্টা করে; ঘোষিত
  `anthropic-ratelimit-unified-reset` (+৬০ সেকেন্ড grace) পর্যন্ত লেন সক্রিয় থাকে এবং
  ওই সময়সীমার প্রতিটি রিকোয়েস্টে হেডারটি থাকে। আটকানো `429` কখনো `handleChatCore`-এ পৌঁছায় না, তাই সংযোগটি
  কুলডাউনে যায় না এবং অন্য সংযোগে ঘোরানো হয় না।
- পরবর্তী প্রতিক্রিয়ায় `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`
  লেনটি চালু রাখে; `slot_busy` (429) অথবা `529` সার্ভারের
  `anthropic-ratelimit-unified-slow-retry-after` অনুযায়ী অপেক্ষা করে (ডিফল্ট ২০ সেকেন্ড, সীমা ৫–৬০০ সেকেন্ড, ±৩০% jitter)
  এবং পুনরায় চেষ্টা করে; `anthropic-ratelimit-unified-slow-max-wait` দ্বারা সীমাবদ্ধ (ডিফল্ট ২০ মিনিট, সীমা
  ১ মিনিট–৬ ঘণ্টা)—এর পরে লেন শেষ হয় এবং ১০ মিনিটের cool-off পুনরায় গ্রহণে বাধা দেয়। অপেক্ষার সময়টি
  রিকোয়েস্টের নিজস্ব upstream-start timeout-এর অবশিষ্ট সময়
  (`resolveFetchStartTimeout`, ডিফল্ট ১০ মিনিট) থেকে ৫ সেকেন্ড বাদ দিয়ে আরও সীমিত হয়: এই সীমা না থাকলে
  ২০ মিনিটের ডিফল্ট max-wait রিকোয়েস্টের সময়সীমা অতিক্রম করত এবং ঘুমন্ত অপেক্ষাটি মাঝপথে বাতিল হয়ে
  `TimeoutError` প্রকাশ পেত, graceful `max_wait` সমাপ্তি + cool-off-এর পরিবর্তে।
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, ৫ ঘণ্টার উইন্ডো পুনরায় শুরু হওয়া, অথবা
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (যা যেকোনো স্ট্যাটাসে এটিকে
  `extra_usage` হিসেবে শেষ করে, কারণ এখন paid overage সীমাটি কভার করে)—এসব লেন শেষ করে; এরপর
  প্রতিক্রিয়াটি সাধারণ কুলডাউন পথে যায়। `budget_exhausted` ঘোষিত বাজেট রিসেট (≤ ৮ দিন) পর্যন্ত মনে রাখা হয়।
- executor-এর নিজস্ব 400-চালিত intra-attempt পুনঃচেষ্টাগুলোর (context editing, thinking/effort clamps, param auto-learn)
  পরে সীমা যাচাই চলে, তাই ওই পুনঃচেষ্টাগুলোর একটিতে দেখা দেওয়া wall `429`-ও কুলডাউন পথে যাওয়ার বদলে আটকানো হয়।
- অবস্থা সংযোগ-প্রতি মেমরিতে থাকে (রিস্টার্ট হলে পুনরায় গ্রহণের জন্য একটি অতিরিক্ত সীমা-সংক্রান্ত `429` লাগে)।

**সেশন-সীমা রিসেট** (`autoLimitReset`, উভয়টি চালু থাকলে লেনের আগে চেষ্টা করা হয়):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  ব্লক; যখন `arm: "reset"` এবং `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` সহ
  `{ "program": "juniper_tide" }` (organization UUID `providerSpecificData.organizationUUID` থেকে,
  bootstrap fallback)।
- `result: reset|not_limited` → রিকোয়েস্টটি পূর্ণ গতিতে পুনরায় চেষ্টা করা হয় (slow header ছাড়া)।
  `already_used` / `not_offered` `next_available_at` মনে রাখে (ডিফল্ট এক সপ্তাহ); যেকোনো ব্যর্থতা
  ১৫ মিনিটের জন্য back off করে। রিসেটটি সপ্তাহে একবার এবং সাপ্তাহিক সীমার অংশ হিসেবেই গণনা হয়।

Regression guards: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### সেশন অ্যাফিনিটি (#7274)

**পরিসর:** একটি ক্লায়েন্ট সেশন (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` হেডার)
যেকোনো provider-এর জন্য একটি সংযোগে পিন করা হয়।

**উদ্দেশ্য:** বহু-টার্নের agent (Claude Code, aider, custom agents)-কে রিকোয়েস্টগুলোর
মধ্যে একই অ্যাকাউন্টে রাখা, যাতে cross-account context loss এবং প্রতি-অ্যাকাউন্ট session state থাকা
provider-গুলোতে বারবার cold-start 429 কমে।

**বাস্তবায়ন:**

- TTL resolution: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Header extraction (generic, any provider): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Persisted pin table: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Setting: `sessionAffinityTtlMs` (global TTL in ms, `0` disables) — `src/lib/db/settings.ts`. Codex-only
  `codexSessionAffinityTtlMs` থেকে `124_generic_session_affinity_ttl.sql` migration-এর মাধ্যমে নাম পরিবর্তন করা হয়েছে;
  আগে কনফিগার করা যেকোনো Codex TTL নতুন ডিফল্ট হিসেবে বহাল থাকে।

#7274-এর আগে, `resolveSessionAffinityTtlMs()` `codex` ছাড়া প্রতিটি provider-এর জন্য
`0` রিটার্ন করে সরাসরি থেমে যেত, ফলে TTL setting (এবং session headers) অন্য কোথাও কার্যকর হতো না,
যদিও pinning mechanism এবং header extraction ইতিমধ্যেই provider-agnostic ছিল। এই সংশোধনে সেই
early-return সরানো হয়েছে; একবার বিশ্বব্যাপী TTL `0`-এর ওপরে সেট হলে এটি এখন প্রতিটি provider-এর
জন্য সমানভাবে প্রযোজ্য।

তিনটি session-affinity header কখনো upstream-এ ফরোয়ার্ড করা হয় না — executors ক্লায়েন্টের
হেডার সরাসরি পাঠানোর পরিবর্তে শুরু থেকে নিজেদের upstream header তৈরি করে, তাই এটি কেবল অভ্যন্তরীণ
correlation id হিসেবে থাকে।

### একচেটিয়া managed session connection leases

**পরিধি:** একটি সক্রিয় managed HTTP client/session একটি উপযুক্ত OmniRoute connection-এর মালিক।

**উদ্দেশ্য:** যেসব client-এর অনুরোধগুলোর মধ্যে কঠোর routing
সীমা প্রয়োজন, তাদের জন্য স্থায়ী একচেটিয়া connection ownership প্রদান করা। এটি session affinity থেকে
ভিন্ন, যা একটি নরম ধারাবাহিকতা-পছন্দ: একটি exclusive lease জীবনচক্রের অবস্থা SQLite-তে
স্থায়ীভাবে সংরক্ষণ করে, সক্রিয় মালিক এবং সক্রিয় connection-এর বৈশ্বিক এককত্ব
প্রয়োগ করে, এবং provider dispatch-এর আগে একটি পুরোনো generation প্রত্যাখ্যান করে।

এই বৈশিষ্ট্যটি প্রতি API key-এর জন্য ঐচ্ছিক। একটি managed key-এর অবশ্যই `lease:exclusive` scope এবং
একটি স্পষ্ট, খালি নয় এমন `allowedConnections` তালিকা থাকতে হবে। যেকোনো HTTP client জীবনচক্র endpoint ব্যবহার করতে পারে; কোনো
client name, user-agent, provider, OAuth method, বা model প্রয়োজন নেই। lease একটি connection-এর
মালিক, model-এর নয়; তাই connection স্বাভাবিকভাবে উপযুক্ত থাকা অবস্থায় model পরিবর্তন binding বজায় রাখে। সাধারণ model, quota, health, cooldown, এবং allowlist নিয়মগুলোই কর্তৃত্বশীল থাকে এবং একই generation-কে অন্য কোনো মুক্ত উপযুক্ত connection-এ স্থানান্তর করতে পারে।

জীবনচক্রটি হলো `POST /api/v1/session-leases`, যেখানে JSON action হিসেবে `acquire`, `renew`, এবং `release` রয়েছে।
Managed inference অনুরোধগুলোতে opaque `X-OmniRoute-Lease-Owner` value এবং সঠিক
`X-OmniRoute-Lease-Generation` উপস্থাপন করতে হবে। owner `vlo_`-এর পরে 43টি base64url অক্ষর ব্যবহার করে; কেবল
এর SHA-256 hash সংরক্ষণ করা হয়। প্রতিটি চূড়ান্ত dispatch fence-এ authenticated API key ID এবং
সক্রিয় connection ID-ও আবদ্ধ থাকে। Lease control header-গুলো logs, সংরক্ষিত request snapshots, এবং
upstream executor headers থেকে সরিয়ে ফেলা হয়।

যদি সাধারণ routing-এ উপযুক্ত managed candidate থাকে, কিন্তু প্রতিটি মুক্ত candidate কোনো
ভিন্ন active lease দ্বারা দখল করা থাকে, তাহলে OmniRoute HTTP `429`, lease-capacity-unavailable code,
capacity-এর জন্য অপেক্ষার state, এবং প্রাসঙ্গিক প্রাচীনতম expiry থেকে নির্ধারিত সীমাবদ্ধ
`Retry-After` ফেরত দেয়। সাধারণভাবে কোনো eligible candidate না থাকা lease contention নয় এবং এর বিদ্যমান routing error semantics বজায় থাকে।

সম্পর্কিত mechanism-গুলো পৃথক থাকে:

- OAuth session occupancy হলো OAuth account-গুলোর জন্য process-local soft distribution।
- Account semaphore request-concurrency permit প্রদান করে এবং কোনো request সম্পন্ন হলে শেষ হয়।
- Exclusive managed session lease হলো generation fence-সহ স্থায়ী lifecycle ownership।

---

## ৩. মডেল লকআউট

**পরিধি:** provider + connection + model triple।

**স্ট্যাটাস অনুযায়ী কী-এর পরিধি:** ব্যর্থতার স্ট্যাটাস নির্ধারণ করে লকআউট কোন কী-তে লিখবে
(`open-sse/services/accountFallback/exactModelLock.ts`-এর `resolveLockoutScope()`):

- `429` / `403` / `402` — কোটা বা অধিকারসংক্রান্ত সংকেত — **quota family** লক করে:
  codex-এর ক্ষেত্রে পুরো `codex` / `spark` scope (connection-এর প্রতিটি
  `gpt-5*` model), অন্যান্য provider-এর ক্ষেত্রে `getQuotaScopedModelForProvider()`।
- `404` bare model-কে লক করে (`getModelLockKey()` `not_found` সংকুচিত করে)।
- অন্য যেকোনো স্ট্যাটাস — `5xx` transport/server ব্যর্থতা এবং quality validation থেকে
  OmniRoute-এর নিজস্ব synthesized `502` — শুধুমাত্র সঠিক
  provider/connection/model tuple-টি লক করে। একটি model-এর খারাপ stream account-এর
  quota সম্পর্কে কোনো প্রমাণ নয়; এই নিয়মের আগে `codex/gpt-5.6-luna`-তে একটি খালি
  response connection-এর প্রতিটি `gpt-5*` model-কে routing থেকে 2–30 মিনিটের জন্য
  (ক্রমবর্ধমানভাবে) সরিয়ে দিত, অথচ তার quota অপরিবর্তিত থাকত।
- কোনো caller-এর স্পষ্ট `scope` option সবসময় অগ্রাধিকার পায় (Antigravity `"exact"` পাঠায়)।

**উদ্দেশ্য:** শুধুমাত্র একটি model অনুপলব্ধ বা quota-সীমাবদ্ধ হলে পুরো connection নিষ্ক্রিয় না করা।

**উদাহরণ:**

- 429 ফেরত দেওয়া per-model quota provider
- একটি অনুপস্থিত model-এর জন্য 404 ফেরত দেওয়া local provider
- Provider-নির্দিষ্ট mode/model permission ব্যর্থতা (যেমন, Grok mode)

**বাস্তবায়ন:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`।

### Model Cooldowns Dashboard (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

সক্রিয় লকআউটের তালিকায় থাকে: provider, connection, model, কারণ, expiresAt। Operator-রা card থেকে ম্যানুয়ালি কোনো model পুনরায় সক্রিয় করতে পারেন।

**REST API:**

- `GET /api/resilience/model-cooldowns` — সক্রিয় লকআউটের তালিকা
- `DELETE /api/resilience/model-cooldowns` — ম্যানুয়ালি পুনরায় সক্রিয় করা। Body: `{provider, connection, model}`। Auth: management।

### Cooldown Manager

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`)।

সাময়িক কারণে routing-এর বাইরে থাকা প্রতিটি connection-এর জন্য একটি পৃষ্ঠা, প্রতিটি provider page আলাদাভাবে খোলার পরিবর্তে। এটি connection cooldown, model lockout এবং terminal state-এর তালিকা দেখায়; প্রতি connection, নির্বাচিত connection, অথবা কোনো provider-এর সব connection-এর জন্য এগুলো clear করে; এবং সর্বাধিক ব্যবহৃত cooldown rule-গুলো সম্পাদনা করে: `streamStallCooldown.enabled` এবং OAuth / API-key `connectionCooldown`-এর base cooldown ও maximum backoff steps (`PATCH /api/resilience`-এর মাধ্যমে সংরক্ষিত)। Terminal state (`banned`, `expired`, `credits_exhausted`) তালিকাভুক্ত হয়, কিন্তু এখানে কখনো clear করা হয় না।

একই পৃষ্ঠার **Error cooldown rules** card operator error rule (`settings.providerErrorRules`) এবং প্রতি-provider catch-all default (`settings.providerErrorDefaults`) `PATCH /api/settings`-এর মাধ্যমে সম্পাদনা করে — এগুলো কীভাবে match করে তা জানতে §7-এর "Operator-declared rules" দেখুন। Duration হতে পারে Default (কোনো explicit cooldown নেই), 30 min, 1 h, 5 h, 24 h, অথবা 1 থেকে 43,200 মিনিট (30 দিন)-এর একটি custom মান।

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — status, অবশিষ্ট cooldown, backoff level, সর্বশেষ error type এবং model lockout-সহ connection (কোনো credential নয়)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` অথবা `{all: true, provider?}`; ফেরত দেয় `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Lockout settings UI + success-decay recovery (v3.8.23)

Model lockout সবসময় চালু থাকা hardcoded আচরণ থেকে নিজস্ব settings card এবং self-healing recovery path-সহ সম্পূর্ণ configurable, opt-in feature-এ পরিণত হয়েছে।

**Settings card:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)।
এটি উপরের read-only `ModelCooldownsCard` থেকে **স্বতন্ত্র** (যেটি কেবল সক্রিয় lockout _তালিকাভুক্ত_ করে) — নতুন card-টি _parameter configure_ করে। Default থাকে `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`)-এ:

| Setting                 | Default                          | Meaning                                                       |
| ----------------------- | -------------------------------- | ------------------------------------------------------------- |
| `enabled`               | `false`                          | Master toggle — model lockout ডিফল্টভাবে **বন্ধ**।            |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Upstream status, যেগুলো model-scoped failure হিসেবে গণ্য হয়। |
| `baseCooldownMs`        | `120_000` (120 s)                | প্রথম failure-এর জন্য প্রাথমিক lockout duration।              |
| `maxCooldownMs`         | `1_800_000` (30 min)             | escalated cooldown-এর সর্বোচ্চ সীমা।                          |
| `maxBackoffSteps`       | `10`                             | exponential-backoff escalation step-এর সর্বোচ্চ সংখ্যা।       |
| `useExponentialBackoff` | `true`                           | repeated failure cooldown-কে exponential হারে বাড়াবে কি না।  |

Settings সাধারণ settings store-এর মাধ্যমে persist হয় এবং resilience settings schema-এর মাধ্যমে validate হয়; card `baseCooldownMs`/`maxCooldownMs`-কে সীমাবদ্ধ করে
(`maxCooldownMs ≥ baseCooldownMs` নিশ্চিত করে) এবং `maxBackoffSteps`-কেও সীমাবদ্ধ করে।

**Success-decay recovery:** recovery শুধুমাত্র timer expiry-নির্ভর নয়। একটি সুস্থ
response model-এর failure count কমিয়ে দেয়, ফলে mid-window-এ সেরে ওঠা কোনো model
আর escalation চালিয়ে যায় না এবং timer শেষ হওয়ার আগেই lockout clear হয়। কোনো সফল
combo target-এ `open-sse/services/combo.ts` `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) call করে, যা সংরক্ষিত
`failureCount`-কে অর্ধেক করে (`Math.floor(failureCount / 2)`); এটি `0` হলে lockout
entry সম্পূর্ণ মুছে ফেলা হয়। এর counterpart `recordModelLockoutFailure()`
escalation window-এর মধ্যে failure হলে count বাড়ায় (এবং cooldown escalate করে)। এই
success-decay সাধারণ timer expiry-এর অতিরিক্ত — যেকোনো একটি পথেই model পুনরায় সক্রিয় হতে পারে।

**অবস্থা:** লকআউটগুলি **মেমরিতে** রাখা হয় (প্রতি-প্রসেস `Map`-এ
`ModelLockoutEntry`, যার কী `provider:connectionId:model`, এবং সঠিক-স্কোপের
লকগুলোর কী `provider:connectionId:exact:model`), এগুলি
DB-তে পারসিস্ট করা হয় না — রিস্টার্ট হলে হারিয়ে যায়। _সেটিংস_ পারসিস্ট করা হয়; সক্রিয়
লকআউটের _অবস্থা_ ক্ষণস্থায়ী।

---

## ৪. কোটা-শেয়ার কনকারেন্সি নিয়ন্ত্রণ (v3.8.36)

সাবস্ক্রিপশন অ্যাকাউন্টগুলো (GLM, MiniMax ইত্যাদি) প্রায়ই কেবল ~1–3টি সমসাময়িক
রিকোয়েস্ট গ্রহণ করে; সীমা অতিক্রম করলে 429 এবং কুলডাউন ট্রিগার হয়। এটি
**কোটা-শেয়ার** (`qtSd/…`) কম্বোগুলোর ক্ষেত্রে বিশেষভাবে গুরুতর, যেখানে একাধিক API কী
একটি আপস্ট্রিম অ্যাকাউন্ট শেয়ার করে। তিনটি স্তর একটি শেয়ার করা অ্যাকাউন্টকে অতিরিক্ত
রিকোয়েস্টে প্লাবিত হওয়া থেকে রক্ষা করে।

### প্রতি-সংযোগ কনকারেন্সি সীমা (`max_concurrent`)

প্রতিটি প্রোভাইডার সংযোগ একটি `max_concurrent` সীমা ঘোষণা করতে পারে
(`provider_connections.max_concurrent`, সংযোগ মডাল / API / DB-তে সেট করা হয়)।
কোনো সীমা না চাইলে এটি ফাঁকা রাখুন। নিচের সিরিয়ালাইজেশন স্তরটি পরিচালনা করার জন্য এটিই
একমাত্র নিয়ন্ত্রণ — অ্যাকাউন্টের প্রকৃত কনকারেন্সি অনুযায়ী এটি সেট করুন
(যেমন GLM ~1, MiniMax ~2)।

### প্রতি-মডেল কনকারেন্সি সীমা (`modelConcurrency`)

একটি সংযোগ তার `rateLimitOverrides` ম্যাপের মধ্যে সঠিক প্রতি-মডেল কনকারেন্সি সীমাও
ঘোষণা করতে পারে:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

এটি সংযোগ মডালে (**Rate limit overrides → Per-model
concurrency caps**, প্রতি লাইনে একটি `model=cap`) অথবা একই JSON আকৃতি সহ
`PATCH /api/providers/[id]`-এর মাধ্যমে সেট করুন। মূল নিয়মগুলো হলো:

- **সংযোগ-ব্যাপী বনাম মডেল-নির্দিষ্ট:** `maxConcurrent` সংযোগ-ব্যাপী শেয়ার করা
  সীমা হিসেবে বহাল থাকে। উভয়টি প্রযোজ্য হলে, একই কম্পোজিট গেটে
  (`global → provider → account → model`) উভয় গেটই অ্যাটমিকভাবে অর্জিত হয়; কার্যকর আচরণ
  হবে প্রযোজ্য সীমাগুলোর মধ্যে অধিক কঠোরটি।
- **সঠিক মডেল-কী মেলানো:** রাউটিং সমাধানের পর এক্সিকিউটরের কাছে পাঠানো মডেল স্ট্রিংটিই
  কী হিসেবে ব্যবহৃত হয় — সাধারণত খালি আপস্ট্রিম মডেল আইডি
  (`glm-5`), ক্লায়েন্ট-সাইড `provider/model` অ্যালিয়াস নয়
  (`zai/glm-5` `glm-5`-এর সঙ্গে মেলে না)। মানগুলো ধনাত্মক পূর্ণসংখ্যার
  সমসাময়িক-রিকোয়েস্ট সীমা।
- **স্থানীয় কিউয়িং, কোনো ডিসকভারি নয়:** অতিরিক্ত রিকোয়েস্ট বিদ্যমান কিউ/টাইমআউট
  সেম্যান্টিকস অনুযায়ী স্থানীয়ভাবে কিউতে অপেক্ষা করে (টাইপযুক্ত
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` অ্যাডমিশন ত্রুটি)। OmniRoute
  আপস্ট্রিম নীতি আবিষ্কার বা অনুমান করে না — অপারেটর যে সঠিক সীমা কনফিগার করেছেন,
  সেটিই প্রয়োগ করে। কোনো স্যাচুরেটেড মডেল গেট কখনও প্রোভাইডার নিষ্ক্রিয় করে না এবং
  স্থায়ী মডেল লকআউটও তৈরি করে না; আপস্ট্রিম 429/কুলডাউন/ফলব্যাক আচরণ ত্রুটির
  ব্যাকস্টপ হিসেবে বহাল থাকে।
- **প্রতি-সংযোগ, প্রতি-প্রসেস স্কোপ:** সীমাগুলো প্রতি ডেটাবেস সংযোগভিত্তিক এবং
  মেমরিতে ধরে রাখা হয়, তাই একই আপস্ট্রিম API কী পুনরায় ব্যবহার করা দুটি সংযোগ
  একে অপরের সঙ্গে সমন্বয় করে না।
- **কনফিগার না করলে কোনো পরিবর্তন নেই:** ম্যাপ বাদ দিলে (অথবা ড্যাশবোর্ডের
  ফিল্ড ফাঁকা রাখলে) কোনো মডেল গেট যোগ হয় না। কোনো সার্বজনীন প্রোভাইডার সীমা
  ঘোষণা না করা একটি উদাহরণ কনফিগারেশন:

```text
glm-5=1
glm-4.7=3
```

### কোটা-শেয়ার রিকোয়েস্ট সিরিয়ালাইজেশন

যখন কোনো কোটা-শেয়ার ডিসপ্যাচ এমন একটি সংযোগকে লক্ষ্য করে, যেখানে ধনাত্মক
`max_concurrent` ঘোষণা করা আছে, তখন ওই **অ্যাকাউন্টে** সমসাময়িক রিকোয়েস্টগুলো
প্রতি-সংযোগ সেমাফোরের মাধ্যমে (`qsconn:<connectionId>` কী) সিরিয়ালাইজ করা হয়:
অতিরিক্ত রিকোয়েস্টগুলো অ্যাকাউন্টে প্লাবন ঘটানোর পরিবর্তে **কিউতে অপেক্ষা করে**।
এটি **ফেইল-ওপেন** — কোনো স্যাচুরেটেড কিউ বা টাইমআউট কখনও ডিসপ্যাচযোগ্য রিকোয়েস্ট
প্রত্যাখ্যান না করে স্লট ছাড়াই এগিয়ে যায়। **Settings → Resilience → Quota-share
per-connection concurrency**-তে টগল করুন
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ডিফল্টভাবে চালু)। কোনো
`max_concurrent` সীমা না থাকলে আচরণ অপরিবর্তিত থাকে।

> কোটা-শেয়ার রাউটিং গেট (`selectQuotaShareTarget`, DRR + P2C) নিজেও
> ফেইল-ওপেন এবং সীমায় থাকা সংযোগকে শুধু _কম অগ্রাধিকার_ দেয় — একক-সংযোগের পুলে
> এটি কঠোর সীমা আরোপ করতে পারে না, তাই এই সেমাফোরই আসলে প্লাবন নিয়ন্ত্রণ করে।

### কম্বো কুলডাউন-সচেতন রিট্রাই

প্রতিটি কম্বো কৌশলের ক্ষেত্রে (চালু থাকলে), কোনো রিকোয়েস্টে SHORT ট্রানজিয়েন্ট
কুলডাউনের জন্য 429 হওয়ার সম্ভাবনা থাকলে সেটি 429 ফেরত না দিয়ে কুলডাউন শেষ হওয়া পর্যন্ত
অপেক্ষা করে পুনরায় ডিসপ্যাচ হয় — এতে মাল্টি-মডেল কম্বোতে Gemini-শ্রেণির
TPM/RPM উইন্ডো (~60s retry-after) অন্তর্ভুক্ত, যেমন 2-মডেল কম্বোর উভয় টার্গেটেই
প্রতি-মডেল রেট সীমা অতিক্রম করা। এটি **Settings → Resilience**-এ
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) দ্বারা সীমাবদ্ধ। এটি কখনও `quota_exhausted`-এর জন্য অপেক্ষা করে না
(মধ্যরাত পর্যন্ত লক থাকা) অথবা auth/not-found কারণের জন্য অপেক্ষা করে না।

একটি কম্বো `config.comboCooldownWaitEnabled: false` দিয়ে অপ্ট-আউট করতে পারে।
শুধুমাত্র আক্ষরিক `false` এই শেয়ার করা কম্বো অপেক্ষাগুলো (ডিসপ্যাচ-পরবর্তী কুলডাউন
এবং ডিসপ্যাচ-পূর্ব সার্কিট-ওপেন/মডেল-লক অপেক্ষা) এবং তাদের অপেক্ষা-বাজেট
টাইমআউট-ফ্লোর বাড়ানো নিষ্ক্রিয় করে। অনুপস্থিত বা `true` থাকলে গ্লোবাল নীতি বজায়
থাকে; বিশ্বব্যাপী অপেক্ষা নিষ্ক্রিয় থাকলে `true` তা চালু করতে পারে না। একটি স্পষ্ট
`targetTimeoutMs` এখনও অগ্রাধিকার পায়। এই অপ্ট-আউট পৃথক নেটিভ-Codex
টার্ন-পিন ডিসপ্যাচ-পূর্ব অপেক্ষা পরিবর্তন করে না।

একই গেট ডিসপ্যাচ-পূর্ব ক্ষেত্রটিও (#16319) কভার করে: কোনো প্রচেষ্টা করার আগেই যদি
কোনো কম্বোর প্রতিটি টার্গেট এড়িয়ে যাওয়া হয়, কারণ তার মডেল একটি স্বল্পমেয়াদি
লকআউটে রয়েছে, তাহলে শূন্য-প্রচেষ্টা পথ একই সীমার অধীনে লকআউট শেষ হওয়া পর্যন্ত
অপেক্ষা করে এবং পুনরায় ডিসপ্যাচ করে, পরিবর্তে কোনো ইঙ্গিতবিহীন
`503 ALL_TARGETS_SKIPPED` উত্তর দেওয়ার। যখন কোনো অপেক্ষা অনুমোদিত নয় (সীমা,
প্রচেষ্টা বা বাজেট শেষ, অথবা ফিচারটি বন্ধ), তখন টার্মিনাল উত্তরটি
`429 rate_limit_error`-এ উন্নীত হয় এবং প্রাচীনতম ট্রানজিয়েন্ট লক মেয়াদ শেষ হওয়া
থেকে `retry_after` / `reset_at` বহন করে; কোটা, auth এবং not-found লকগুলো
ইঙ্গিতবিহীন 503 বজায় রাখে।

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

## 5. রিকোয়েস্ট কিউ অ্যাডমিশন কন্ট্রোল (v3.8.49 · ইস্যু #6593)

**পরিধি**: স্থানীয় প্রতি-প্রোভাইডার+কানেকশন রেট-লিমিট কিউ (`open-sse/services/rateLimitManager.ts`, Bottleneck দ্বারা চালিত), উপরের তিনটি মেকানিজমের এক স্তর নিচে।

**`maxWaitMs` কিউ-অপেক্ষার সীমা নির্ধারণ করে; `executionMaxWaitMs` এক্সিকিউশনের সীমা নির্ধারণ করে।**
এই দুটি ইচ্ছাকৃতভাবে আলাদা, এবং কোনোটিই অন্যটিকে ইনপুট দেয় না।

`resilienceSettings.requestQueue.maxWaitMs` হল **কিউ-অপেক্ষা বাজেট**: এটি প্রোভাইডার স্লটের জন্য অপেক্ষা এবং তারপর QUEUED অবস্থায় বসে থাকাকে কভার করে, এবং জবটি QUEUED ছেড়ে এক্সিকিউট হওয়া শুরু করার মুহূর্তেই এর টাইমার মুছে যায় (`rateLimitManager.ts`, `wrappedFn`)। যে রিকোয়েস্ট এটি অতিক্রম করে তা কখনই আপস্ট্রিমে পৌঁছায় না। ডিফল্ট 30000ms, যা `src/lib/resilience/settings.ts`-এ `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` দ্বারা সরবরাহ করা হয় এবং `tests/unit/ratelimit-admission-control-6593.test.ts` দ্বারা পিন করা হয়, তাই এটি পরিবর্তন করলে এই অনুচ্ছেদটি নীরবে পুরনো হয়ে না গিয়ে সেই টেস্টটি লাল হয়ে যাবে।

`resilienceSettings.requestQueue.executionMaxWaitMs` হল সেটি যা Bottleneck জব `expiration` হিসেবে পায়, যার টাইমার শুধুমাত্র ডিসপ্যাচের পরে শুরু হয়। এটি এমন এক্সিকিউটরদের জন্য একটি ব্যাকস্টপ যাদের নিজস্ব আপস্ট্রিম টাইমআউট নেই, এবং এক্সিকিউটরের নিজের fetch-শুরু টাইমআউট বেশি হলে এটি সেই পর্যন্ত বাড়ানো হয়, যাতে এটি কোনো সুস্থ ইন-ফ্লাইট রেসপন্সকে কেটে দিতে না পারে। ডিফল্ট 600000ms (10 মিনিট)।

কিউ বাজেটকে `expiration`-এ ফিড করার কারণেই অ-ইনক্রিমেন্টাল গেটওয়েগুলো মাঝপথে মারা যেত — সেগুলো প্রথম বাইটের আগে কয়েক মিনিট ধরে চলা যুক্তিসঙ্গত — এবং এই কারণেই একটি expiration `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) হিসেবে দেখায়, অথচ কিউ বাজেট কিউ-টাইমআউট কোড বহন করে। যেকোনো একটি ওভাররাইড করুন `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) অথবা ড্যাশবোর্ড
(**Settings → Resilience**) দিয়ে। নরমালাইজ করার সময় দুটোই 1ms–24h-এ ক্ল্যাম্প করা হয়।

**উভয়ের জন্য অগ্রাধিকার:** env ভেরিয়েবল শুধুমাত্র _ডিফল্ট_ সরবরাহ করে। `resilienceSettings.requestQueue`-এ সংরক্ষিত মান (ড্যাশবোর্ড / API patch, `key_value`-তে জমা থাকে) এর উপর জেতে, এবং প্রতি-কানেকশন
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` তার উপর জেতে। তাই এমন ডিপ্লয়মেন্টে env ভেরিয়েবল সেট করলে যেখানে ইতিমধ্যে সংরক্ষিত মান আছে, কিছুই পরিবর্তন হয় না — পরিবর্তে সংরক্ষিত সেটিংটি মুছে ফেলুন বা আপডেট করুন।

কিউতে অবস্থানের সময় `maxWaitMs` দ্বারা সীমাবদ্ধ; নিচের `maxQueueDepth` সীমা নির্ধারণ করে একসাথে কতজন কলার কিউতে থাকতে পারবে।

**বডি-উল্লেখিত রিট্রাই: পেসিং বনাম লকআউট।** একটি 429 বডি তার নিজের অপেক্ষার সময় উল্লেখ করতে পারে
(Gemini `RetryInfo.retryDelay`, "retry after Ns" টেক্সট), যা
`updateFromResponseBody` পড়ে। কানেকশনের `maxWaitMs`-এর মধ্যে মাপসই হওয়া অপেক্ষা হলো পেসিং: লিমিটার সেই সময়ের জন্য তার রিজার্ভয়ার খালি করে এবং এটি পুনর্ভর্তি হলে কিউতে থাকা কলগুলো ডিসপ্যাচ হয়। `maxWaitMs`-এর চেয়ে লম্বা অপেক্ষা এমন কিছু যা কিউ বসে কাটাতে পারে না — Gemini শেষ হয়ে যাওয়া দৈনিক কোটার উত্তরে
`retryDelay: "86399s"` দেয়। পুনর্নির্মিত 429-এ রিলে করা `Retry-After` (#16528)
ইতিমধ্যে ফলব্যাক ইঞ্জিনকে সেই সময়ের জন্য মডেলটি লক করিয়ে দেয়, কিন্তু এটির জন্য লিমিটারও পজ করলে তখনও কী-তে তাড়াতাড়ি পৌঁছে যাওয়া যেকোনো কল
(উদাহরণস্বরূপ, resilience রিসেটের পরে) পুরো `maxWaitMs` ধরে আটকে যেত। যখন এমন অপেক্ষা টাইপড Google `RetryInfo`
বিবরণ থেকে আসে (`google_rpc_retry_info` প্রোভেন্যান্স) এবং কী-এর লিমিটার
ইতিমধ্যে মডেল-স্কোপড হয় (দেখুন `getLimiterKey`), তখন 429 পরিবর্তে সেই কানেকশনে একটি মডেল
লকআউটে পরিণত হয় (`lockModelForLongBodyRetry` in
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, সর্বোচ্চ 24h পর্যন্ত), এবং
লিমিটারকে পজ না করেই রেখে দেওয়া হয়। অ্যাকাউন্ট নির্বাচন `isModelLocked()` দিয়ে সেই লকে এড়িয়ে যায়,
এবং কানেকশনে পিন করা টার্গেটের জন্য কম্বো প্রি-ডিসপ্যাচ গেটও তাই করে। antigravity-তে, যার লিমিটার প্রতি কোটা ফ্যামিলিতে, লকটি হুবহু মডেলের উপর থাকে, তার অন্যান্য কোটা লকের মতো। কোনো এলিয়াস যখন ক্লায়েন্টের চাওয়া নামটিকে সেই মডেলে রিজলভ করে, তখন সেই নামটিও লক হয়, কারণ সেই চেকগুলো অনুরোধ করা নাম ব্যবহার করে; এটি হুবহু লক হয় (`lockExactModel`), তাই এমন এলিয়াস যা কোনো antigravity কোটা ফ্যামিলি বা codex স্কোপ অতিক্রম করে, কখনই তার নিজেরটিকে লক করে না। একটি গদ্য ইঙ্গিত, টাইপহীন `retryDelay`, অথবা
পুরো কানেকশন দ্বারা ভাগ করা লিমিটার থাকলে পজটিই বজায় থাকে। যখন 429 পাথের সদ্য পুনর্নির্মিত লিমিটারটি পজ করে, তখন যে কলারের অবশিষ্ট কিউ সময় পজ শেষ হওয়ার আগেই শেষ হয়, তাকে সেই সময় অপেক্ষা না করিয়ে সঙ্গে সঙ্গে কিউ-টাইমআউট কোড
(`checkLimiterPause`) দিয়ে ফিরিয়ে দেওয়া হয়; রেকর্ড করা শেষ-সময় নোঙর করা হয় লিমিটার তৈরি হওয়ার আগে, যেখানে Bottleneck তার রিফ্রেশ
ঘড়ি শুরু করে, এবং রিজার্ভয়ারের পরবর্তী যেকোনো পরিবর্তন এটিকে ভুলে যায়। কভার করেছে
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` এবং
`tests/unit/rate-limit-body-retry-pause.test.ts`।

**`maxQueueDepth` — অপ্ট-ইন অ্যাডমিশন ক্যাপ (নতুন)।** `resilienceSettings.requestQueue.maxQueueDepth`
সীমা নির্ধারণ করে একটি প্রোভাইডার+কানেকশনের জন্য একসাথে কতগুলো রিকোয়েস্ট কিউতে বসে থাকতে পারবে (এখনো ডিসপ্যাচ হয়নি)। যখন কিউতে ইতিমধ্যে `maxQueueDepth` সংখ্যক রিকোয়েস্ট আছে, তখন নতুন রিকোয়েস্টটি টাইপড
`code: "RATE_LIMIT_QUEUE_FULL"` এরর দিয়ে দ্রুত-প্রত্যাখ্যান করা হয় **আগেই** সে `limiter.schedule()`-এ পৌঁছানোর
— তাই প্রত্যাখ্যানটি সস্তা এবং সেই রিকোয়েস্টের যেকোনো ডাউনস্ট্রিম
প্রম্পট-কম্প্রেশন / অনুবাদ কাজের আগেই ঘটে। ডিফল্ট `0` =
নিষ্ক্রিয়, বিদ্যমান সীমাহীন-কিউ আচরণ বজায় রাখে; সীমা 0–100000।
ওভাররাইড করুন `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) অথবা
`resilienceSettings.requestQueue.maxQueueDepth` (ড্যাশবোর্ড/API patch) দিয়ে।

অ্যাডমিশন চেকটি নিজেই একটি বিশুদ্ধ ফাংশন
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) তাই
এটি প্রকৃত Bottleneck লিমিটার ছাড়াই ইউনিট-টেস্টযোগ্য।

> যে RFC-টি #6593 খুলেছিল, সেটি একটি `bypassCompressionOnRateLimit`
> ফ্ল্যাগও প্রস্তাব করেছিল। এই রিপোজিটরির `open-sse/services/compression/` পাইপলাইন হলো
> আউটবাউন্ড LLM রিকোয়েস্টে প্রম্পট/কনটেক্সট কম্প্রেশন (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy` ব্লকের আশেপাশে),
> সিনথেসাইজ করা 429 বডিতে HTTP রেসপন্স কম্প্রেশন নয় — একটি লিটারেল বাইপাস ফ্ল্যাগের জন্য কোনো
> মিলে যাওয়া কোড পাথ নেই। সেই প্রম্পট-কম্প্রেশন ধাপটি বর্তমানে রিকোয়েস্ট পাইপলাইনে
> `withRateLimit()`-এর _আগে_ চলে, তাই কিউ-ফুল রিজেকশনে এটি এড়িয়ে যেতে
> পুনর্বিন্যাস করা এই ইস্যুর সুযোগের চেয়ে একটি আলাদা, বড় পরিবর্তন; এটি ইচ্ছাকৃতভাবে
> এখানে বাস্তবায়িত **হয়নি** এবং CPU-সাশ্রয়ের লাভ পুনর্বিন্যাসের ঝুঁকির
> তুলনায় সার্থক হলে ফলো-আপ হিসেবে রেখে দেওয়া হয়েছে।

### রেট-লিমিট অটো-এনেবল সেফটি নেট ও কানেকশন প্রোটেকশন (`rateLimitProtection`)

**অটো-এনেবল সেফটি নেট** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, ডিফল্ট `true`):
ডিফল্টরূপে, OmniRoute স্বয়ংক্রিয়ভাবে সমস্ত সক্রিয় API-কি প্রোভাইডার কানেকশনের জন্য রেট-লিমিট কিউ প্রোটেকশন চালু করে (`getProviderCategory(provider) === "apikey"`)। এটি নিশ্চিত করে যে রেট-সংবেদনশীল আপস্ট্রিম API কি-গুলোতে আগত রিকোয়েস্টগুলো আপস্ট্রিম 429 এররে বিস্ফোরিত না হয়ে Bottleneck-এর মাধ্যমে কিউ ও থ্রটল হয়। সেফটি নেটটি `RATE_LIMIT_AUTO_ENABLE` এনভায়রনমেন্ট ভেরিয়েবলের মাধ্যমে ওভাররাইড করা যায় (`false`/`0`/`off` বন্ধ করে, `true`/`1`/`on` জোরপূর্বক চালু করে), যা সংরক্ষিত ড্যাশবোর্ড সেটিংসের (**Settings → Resilience** / `PATCH /api/resilience`) চেয়ে অগ্রাধিকার পায়।

**প্রতি-কানেকশন `rateLimitProtection`-এর শব্দার্থ:**

প্রতি-কানেকশন রেট-লিমিট প্রোটেকশন প্রোভাইডার কানেকশনের `rateLimitProtection` বুলিয়ান ফিল্ডের মাধ্যমে ট্র্যাক করা হয় (SQLite-এ `rate_limit_protection` হিসেবে সংরক্ষিত):

- **স্পষ্টভাবে চালু (`rateLimitProtection === true`)**: এই কানেকশনের জন্য রেট-লিমিট প্রোটেকশন স্পষ্টভাবে চালু করা হয়েছে, প্রোভাইডার ক্যাটাগরি বা অটো-এনেবল সেফটি নেট চালু আছে কিনা তা নির্বিশেষে।
- **স্পষ্টভাবে বন্ধ (`rateLimitProtection === false`)**: স্পষ্ট প্রোটেকশন বন্ধ করে, কিন্তু একটি সক্রিয় API-কি কানেকশনকে গ্লোবাল অটো-এনেবল সেফটি নেট থেকে বাদ দেয় **না**। `reconcileEnabledConnections`-এ (`open-sse/services/rateLimitManager.ts`), `false` এবং `undefined` সমতুল্য: শুধুমাত্র `rateLimitProtection === true`-কে স্পষ্ট ওভাররাইড হিসেবে গণ্য করা হয়। যদি `rateLimitProtection` `false` হয় (বা সেট না করা থাকে), একটি সক্রিয় API-কি কানেকশন এখনও অটো-এনেবল শর্তের সাথে মিলে যায় এবং রেট-লিমিট প্রোটেক্টেড থেকে যায়।
- **কোনো প্রতি-কানেকশন অপ্ট-আউট নেই**: একজন অপারেটর বর্তমানে অন্যদের জন্য অটো-এনেবল সক্রিয় রেখে "এই একক সক্রিয় API-কি কানেকশনটি অবশ্যই রেট-লিমিট কিউ প্রোটেকশন ছাড়া চলবে" প্রকাশ করতে পারেন না। রেট-লিমিট কিউ ছাড়াই API-কি কানেকশন সম্পূর্ণরূপে চালাতে হলে, সেফটি নেটটি গ্লোবালি বন্ধ করতে হবে (`RATE_LIMIT_AUTO_ENABLE=false` বা `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`)।

**সমর্থিত রাইট পাথ:**

- **`POST /api/rate-limits`**: একটি কানেকশনের জন্য `rateLimitProtection` টগল করার সমর্থিত ম্যানেজমেন্ট রাইট পাথ (`{ connectionId: string, enabled: boolean }`)। এটি `enabled: true` দিয়ে কল করলে স্পষ্ট প্রোটেকশন চালু হয়; এটি `enabled: false` দিয়ে কল করলে স্পষ্ট প্রোটেকশন সরে যায় (যদিও অটো-এনেবল চালু থাকলে সক্রিয় API-কি কানেকশনগুলো গ্লোবাল সেফটি নেটের আওতায় থেকে যায়)।
- **`PUT /api/providers/[id]`**: ইচ্ছাকৃতভাবে `rateLimitProtection` গ্রহণ বা পরিবর্তন করে **না** (#11278)। `PUT /api/providers/[id]`-এর মাধ্যমে প্রোভাইডার কানেকশন মেটাডেটা আপডেট করলে সংরক্ষিত রেট-লিমিট প্রোটেকশন অবস্থা কখনোই পরিবর্তিত হবে না।

---

## 6. স্লো-স্ট্রিম থ্রুপুট ওয়াচডগ (#9709)

ঐচ্ছিক `resilienceSettings.streamRecovery.throughputWatchdog` গার্ড একটি আপস্ট্রিম সনাক্ত করে যেটি এখনও খণ্ড পাঠাচ্ছে কিন্তু কনফিগার করা দরকারী-আউটপুট হারের নীচে সহকারী আউটপুট তৈরি করছে। এটি ইচ্ছাকৃতভাবে নিষ্ক্রিয় টাইমআউট থেকে আলাদা: হার্টবিট এবং মেটাডেটা টাইমার রিসেট করে না এবং অগ্রগতি হিসাবে গণনা করে না। এটি কঠোর প্রচেষ্টার সময়সীমা (#9153) থেকেও আলাদা, যা আউটপুট গুণমান নির্বিশেষে একটি পরম নিরাপত্তা সিলিং রয়ে গেছে।

ওয়াচডগের জন্য একটি ওয়ার্ম-আপ পিরিয়ড প্রয়োজন যার পরে এটি গর্ভপাত করার আগে একটি সম্পূর্ণ ঘূর্ণায়মান উইন্ডো দ্বারা অনুসরণ করা হয়। এটি চ্যাট সমাপ্তি এবং প্রতিক্রিয়া থেকে টেক্সট ডেল্টা গণনা করে API আউটপুট ইভেন্ট (একটি রক্ষণশীল UTF-8 বাইট প্রক্সি), শুধুমাত্র-ব্যবহার এবং খালি ইভেন্টগুলিকে উপেক্ষা করে এবং টুল-কল বা যুক্তি ইভেন্টগুলি ফ্লাইটে থাকাকালীন রায় স্থগিত করে। এটি ডিফল্টরূপে নিষ্ক্রিয় এবং `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` দিয়ে সক্ষম করা যেতে পারে (এটি env মান শুধুমাত্র ডিফল্ট — একটি সংরক্ষিত `resilienceSettings.streamRecovery.throughputWatchdog.enabled` বুলিয়ান জয়ের বীজ দেয়; এই গাইডের শীর্ষে env-vs-ড্যাশবোর্ড অগ্রাধিকার নোটটি দেখুন); উইন্ডো, ওয়ার্ম-আপ, ন্যূনতম হার, এবং ন্যূনতম পরিমাপযোগ্য আউটপুট স্বাভাবিক স্থিতিস্থাপকতা-সেটিংস স্বাভাবিককরণ স্তর দ্বারা আবদ্ধ।

যখন সক্রিয় করা হয়, তখন একটি ওয়াচডগ অ্যাবর্ট শুধুমাত্র সক্রিয় আপস্ট্রিম প্রচেষ্টায় প্রয়োগ করা হয়। কোনো ক্লায়েন্ট-দৃশ্যমান বাইটের আগে, বিদ্যমান একই-অ্যাকাউন্টের প্রারম্ভিক-পুনরুদ্ধারের পথ চেষ্টাটি পুনরায় খুলতে পারে। কমিট করার পরে, স্ট্রীমটি কখনই অন্ধভাবে রিপ্লে করা হয় না; শুধুমাত্র বিদ্যমান নিরাপদ মধ্য-প্রবাহ অব্যাহত চুক্তি একটি প্রত্যয় সেলাই করতে পারে। চূড়ান্তকরণ একক-শট থেকে যায়, তাই ব্যবহার অ্যাকাউন্টিং এবং সেমাফোর রিলিজ নকল করা হয় না।

---

## ৭. আপস্ট্রিম স্ট্যাটাস পুনর্নির্ধারণ (ভুলভাবে জানানো কোটা ত্রুটি)

**পরিধি:** একটি আপস্ট্রিম গেটওয়ে, যা সাময়িক কোটা-শূন্যতার ক্ষেত্রে ভুল HTTP স্ট্যাটাস জানায়।

**উদ্দেশ্য:** শ্রেণিবিন্যাসের আগে একটি বিভ্রান্তিকর স্ট্যাটাস সংশোধন করা, যাতে ডাউনস্ট্রিম ভোক্তারা (ফলব্যাক ইঞ্জিন, কম্বো অ্যাগ্রিগেশন, ক্লায়েন্ট-সামনের রেসপন্স) ব্যর্থতার প্রকৃত পুনঃচেষ্টা-যোগ্য বৈশিষ্ট্য দেখতে পায়।

কিছু গেটওয়ে সাময়িক কোটা-শূন্যতার সংকেত একটি পুনঃচেষ্টা-অযোগ্য HTTP
স্ট্যাটাস দিয়ে দেয়। `agentrouter.org` স্ট্যান্ডার্ড `429`-এর পরিবর্তে একটি চীনা বডি
(`用户额度不足` / `额度不足`) সহ `403` (কখনও `400`) ফেরত দেয়। Claude
Code-এর মতো ক্লায়েন্ট `403`-কে স্থায়ী হিসেবে ধরে নিয়ে সেশন বাতিল করে, এবং সংশোধন
না করলে ফলব্যাক ইঞ্জিন এটিকে কোটা ইভেন্টের পরিবর্তে `AUTH_ERROR` হিসেবে
শ্রেণিবদ্ধ করবে।

**বাস্তবায়ন:**

- রেজিস্ট্রি + ম্যাচার: `open-sse/config/upstreamStatusRestatement.ts` — একটি
  প্রদানকারী-ভিত্তিক নিয়মের তালিকা (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), যা `applyStatusRestatement()`-এর মাধ্যমে
  ম্যাচ করা হয়।
- কল সাইট: `open-sse/handlers/chatCore.ts`-এর `providerFailure:` ব্লক
  (প্রায় 3654 নম্বর লাইনে), `parseUpstreamError()` কোনো ত্রুটিযুক্ত HTTP স্ট্যাটাসসহ
  আপস্ট্রিম রেসপন্স (`!providerResponse.ok`) পার্স করার ঠিক পরে এবং কোনো
  শ্রেণিবিন্যাস চালানোর আগে, যাতে প্রতিটি ডাউনস্ট্রিম ভোক্তা সংশোধিত স্ট্যাটাস দেখতে পায়। একটি
  `200` SSE স্ট্রিমের ভেতরে থাকা ত্রুটিগুলো পৃথক, পরবর্তী স্ট্রিম-পার্সিং পথ অনুসরণ করে এবং
  বর্তমানে এই হুকের আওতায় **নেই** — এটি একটি পরিচিত সীমাবদ্ধতা, তবে এখনও agentrouter-এর
  ভুল স্ট্যাটাসের জন্য প্রয়োজন হয়নি (যেটি ত্রুটিযুক্ত HTTP স্ট্যাটাস হিসেবে প্রকাশ পায়)।
- পুনঃচেষ্টার যোগ্যতা: `429` `RETRY_AFTER_ELIGIBLE_STATUSES`-এ রয়েছে
  (`open-sse/services/combo/unavailableRetryGate.ts`), তাই পুনর্নির্ধারিত ত্রুটিতে
  মৃত `403` হিসেবে প্রকাশ পাওয়ার পরিবর্তে একটি প্রকৃত পুনঃচেষ্টা-উইন্ডো থাকে।
- সিন্থেটিক `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  কেবল পুনর্নির্ধারিত রেসপন্সটি **ক্লায়েন্টকে** যা জানায় তা-ই; এটি সংযোগের
  অভ্যন্তরীণ কুলডাউন/লকআউটের সময়কাল নয় — সেটি পৃথকভাবে সেই ব্যবস্থার দ্বারা
  নিয়ন্ত্রিত হয়, যা প্রকৃতপক্ষে পুনর্নির্ধারিত ত্রুটিটি পরিচালনা করে
  (Connection Cooldown-এর ক্রমবর্ধমান ব্যাকঅফ, §2, API-key প্রদানকারীদের জন্য
  বেস `3s`; অথবা Model Lockout, §3, agentrouter-এর মতো প্রতি-মডেল-কোটা প্রদানকারীদের
  জন্য)। রাউটার ক্লায়েন্টকে জানানো 60s উইন্ডোর চেয়ে অভ্যন্তরীণভাবে আরও আগে
  পুনঃচেষ্টার জন্য যোগ্য হতে পারে — এটি ইচ্ছাকৃত অতিরিক্ত ব্যবধান, কোনো বাগ নয়।

স্থায়ী ত্রুটিগুলো (agentrouter-এর `无权访问模型` — এই মডেলে অ্যাক্সেস নেই) কখনও
পুনর্নির্ধারিত হয় না: `excludeMarkers` নিয়মটিকে বাতিল করে, এমনকি `textMarkers`
ম্যাচ করলেও, তাই ত্রুটিটি তার মূল স্ট্যাটাস বজায় রাখে এবং কোনো কিছুই অনন্তকাল ধরে
পুনঃচেষ্টা করে না। সংশ্লিষ্ট প্রদানকারী শ্রেণিবিন্যাস নিয়ম
(`open-sse/config/providerErrorRules.ts`-এ `agentrouter-model-access-denied`:
`reason: "auth_error"`, `scope: "model"`, ঘোষিত বেস কুলডাউন `6h`) `checkFallbackError`
(`open-sse/services/accountFallback.ts`) দ্বারা সাধারণ apikey-শ্রেণির
`FORBIDDEN` early-return-এর _আগে_ পরামর্শ করা হয়, যা
`honorsRuleLockScope(provider)` (#10334)-এর ওপর নির্ভরশীল — বর্তমানে
`providerErrorRules.ts`-এর `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist-এর মাধ্যমে
শুধু agentrouter-এর জন্য সক্রিয়। নিয়মটির ঘোষিত 6h কুলডাউন
`fallbackResult.baseCooldownMs` হিসেবে প্রবাহিত হয়, তবে এটি এখনও বিদ্যমান
প্রতি-মডেল-কোটা লকআউট পথ (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`) ব্যবহার করে (কুলডাউনের উৎস ছাড়া #10334-এর মাধ্যমে
অপরিবর্তিত): এটি অপারেটরের `mlSettings.maxCooldownMs`-এ
(ডিফল্ট `1_800_000ms` / 30min) নামিয়ে আনা হয়, অন্য সব মডেল লকআউটের মতোই, এবং
_সংরক্ষিত লকআউটের কারণ_ বিদ্যমান হার্ডকোড করা `"forbidden"`-ই থাকে, নিয়মটির
`"auth_error"` নয় — সম্পূর্ণ পথে কেবল কুলডাউনের সময়কাল মানা হয়, কারণের স্ট্রিংটি
নয়। সংযোগটি নিজে সক্রিয় থাকে; একই সংযোগের সহোদর মডেলগুলো প্রভাবিত হয় না।

পুনর্নির্ধারিত কোটা ত্রুটিগুলো (`额度不足`) প্রোডাকশনে একটি প্রদানকারী নিয়মে পৌঁছায়
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, নিজস্ব কোনো ঘোষিত কুলডাউন নেই — persistence layer-এর স্কেল করা
ডিফল্ট ব্যাকঅফ প্রযোজ্য)। #10334-এর পর থেকে `ProviderErrorRuleMatch`-এর
`scope` সম্পূর্ণ পথে ব্যবহৃত হয়, তবে **শুধু** `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
allowlist-এ থাকা প্রদানকারীদের জন্য (`providerErrorRules.ts` — বর্তমানে শুধু
`"agentrouter"`, `honorsRuleLockScope()`-এর মাধ্যমে নিয়ন্ত্রিত)। অন্য সব
প্রদানকারীর জন্য `scope` তথ্যমূলকই থাকে, #10334-এর আগের মতোই।
`checkFallbackError` মেলানো নিয়মের scope-কে `fallbackResult.ruleScope` হিসেবে
প্রকাশ করে; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) হলো যৌথ গার্ড, যা নিশ্চিত করে যে একটি
`ruleScope` সত্যিই সংযোগ-ব্যাপী, স্বয়ং-পুনরুদ্ধারযোগ্য সংকেত হিসেবে নিরাপদে মানা যায়
(scope `"connection"`, reason `quota_exhausted`, কখনও `permanent` নয়,
কখনও `creditsExhausted` নয় — ভবিষ্যতের কোনো নিয়ম যদি scope `"connection"`-কে
স্থায়ী অ্যাকাউন্ট অবস্থার সঙ্গে জুড়ে দেয়, তার বিরুদ্ধে প্রতিরক্ষা)। এটি দুটি
ভোক্তা ব্যবহার করে:

- **Persistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provider-এর **per-model** lockout
  branch-এ চলে যাওয়ার পরিবর্তে (agentrouter হল
  `passthroughModels: true` → `hasPerModelQuota()`
  `true` ফেরত দেয়), এটি একটি **temporary connection cooldown** প্রয়োগ করে —
  `testStatus: "unavailable"` + `rateLimitedUntil`, কখনোই কোনো terminal status
  (`credits_exhausted`/`banned`/`expired`) নয় — ফলে মেয়াদ শেষ হলে connection
  নিজে থেকেই পুনরুদ্ধার হয়, manual credential reset-এর প্রয়োজন হয় না।
  `disableCooling: true` থাকা connection-এর জন্য এটি এড়িয়ে যায় (#2997):
  সেই opt-out-এর ফলে পরিবর্তে per-model lockout কার্যকর হয় (এটি একটি নথিবদ্ধ
  trade-off — branch-এর উপরের code comment দেখুন)।
- **Same-request combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): একই guard connection-টিকে
  in-memory `exhaustedConnections` set-এ চিহ্নিত করে, যার key
  `${provider}:${connectionId}`। এটি কেবল সেই অবশিষ্ট SAME-REQUEST target-কে
  এড়িয়ে যায়, যার নিজের target object-এ ইতিমধ্যেই ঠিক ওই
  `connectionId` রয়েছে (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` before the `exhaustedConnections` lookup) — একটি সাধারণ
  model-list combo-তে sibling target-গুলোর নিজস্ব কোনো pinned `connectionId`
  থাকে না এবং প্রতিটি target শুধু response-এর
  `X-OmniRoute-Selected-Connection-Id` header থেকে প্রতি-dispatch-এ resolve হয়,
  তাই কখনোই ওই key match-এ পৌঁছায় না। এই সাধারণ ক্ষেত্রে, অবশিষ্ট কোনো leg যেন
  সদ্য-exhausted account পুনরায় ব্যবহার না করে, তার প্রকৃত সুরক্ষা এই Set নয় —
  বরং উপরের persistence layer (connection-এর `rateLimitedUntil` এখন ভবিষ্যতের
  সময়ে রয়েছে) এবং এই একই guard failure-এর জন্য
  `transientRateLimitedProviders` suppress করা ("
  Two-stage design" এবং `targetExhaustion.ts`-এর
  `isAgentrouterConnectionQuotaScope` branch-এর code comment দেখুন): Set-টিকে
  চিহ্নিত না রাখলে, `combo.ts`-এর `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) provider-এর
  অবশিষ্ট leg-গুলোর জন্য কার্যকর হয় না, ফলে credential selection-এর
  `rateLimitedUntil` filter (`src/sse/services/auth.ts:1238`) স্বাভাবিকভাবে
  মানা হয় এবং কোনো অবশিষ্ট leg হয় অন্য একটি এখনও-eligible agentrouter
  connection বেছে নেয়, নয়তো no credentials available দিয়ে ব্যর্থ হয় — এই
  branch যে connection-টিকে cooldown-এ পাঠিয়েছে, সেটিতে জোর করে ফিরে যায় না।

### Two-stage design: status restatement, then classification

Status restatement (`upstreamStatusRestatement.ts`) এবং provider
classification rules (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) হলো পৃথক registry, যেগুলো উভয়েই provider id এবং text
marker-এর ওপর key করে, কিন্তু ভিন্ন জায়গায় চলে এবং ভিন্ন উদ্দেশ্য পূরণ করে:
restatement `chatCore.ts`-এ HTTP status শুরুতেই পুনর্লিখে দেয়;
classification rules `checkFallbackError()`-এর ভিতরে fallback `reason` বেছে
নেয় এবং `scope` (`model` / `provider` / `connection`) lock করে
(`open-sse/services/accountFallback.ts`)।

Classification rules কেবল সম্পূর্ণ error **text** দেখতে পায় (body marker যেমন
`额度不足` মেলানোর জন্য প্রয়োজনীয়), এবং তা কেবল
`providerErrorRules.ts`-এর `FULL_TEXT_RULE_PROVIDERS` allowlist-এ তালিকাভুক্ত
provider-গুলোর ক্ষেত্রে — বর্তমানে শুধু `"agentrouter"`। অন্য প্রতিটি
**built-in catalog** provider-এর জন্য `checkFallbackError`
`getProviderErrorRuleMatch`-কে শুধু structured error (`{code, type}`) দেয়, যা
header/status/code-ভিত্তিক rule-এর জন্য যথেষ্ট, কিন্তু body-text marker সম্পর্কে
অজ্ঞ। Helper `resolveRuleMatchBody()` এই নির্বাচনটি করে: allowlisted
provider-এর জন্য সম্পূর্ণ error text, অন্যদের জন্য structured error।
`FULL_TEXT_RULE_PROVIDERS`-এ কোনো **built-in** provider যোগ করা একটি
স্পষ্ট per-provider opt-in — এর উদ্দেশ্য হলো তালিকায় না থাকা প্রতিটি
provider-এর default path byte-for-byte অপরিবর্তিত রাখা।

কোনো rule-এর `scope` (`model` / `provider` / `connection`) হলো
`FULL_TEXT_RULE_PROVIDERS` থেকে পৃথক একটি opt-in: `checkFallbackError` এটিকে
শুধু `fallbackResult.ruleScope` হিসেবে প্রকাশ করে, এবং downstream consumer-রা
এটিকে informational label ছাড়া অন্য কিছু হিসেবে কেবল একই file-এর
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist-এ থাকা provider-এর জন্যই মানে
(`honorsRuleLockScope()`-এর মাধ্যমে gated — বর্তমানে শুধু `"agentrouter"`)।
কোনো provider ওই allowlist-এ থাকার পর `scope: "connection"` match বাস্তবে কী
করে, তার জন্য উপরের "Restated quota errors" দেখুন।

**#11104 — operator-declared rules উভয় allowlist-ই bypass করে।** কোনো
operator এই file সম্পাদনা না করেই runtime-এ
`settings.providerErrorRules`-এর মাধ্যমে
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
per-provider rule ঘোষণা করতে পারেন। কোনো operator rule-কে
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS`-এর অধীনে
gating করলে — যেসব allowlist **default** built-in catalog rule-এর আচরণ
সুরক্ষিত রাখার জন্য তৈরি — ইতিমধ্যেই তালিকাভুক্ত provider ছাড়া অন্য সব
provider-এর জন্য settings mechanism নিষ্ক্রিয় হয়ে যেত, কারণ rule ঘোষণা
করাই operator-এর স্পষ্ট opt-in। `resolveRuleMatchBody()` এবং
`honorsRuleLockScope()` উভয়েই প্রথমে `hasOperatorRuleForProvider()` পরীক্ষা
করে: কোনো provider-এর operator rule থাকলে সেটি raw error text পায় এবং তার
ঘোষিত `scope` মানা হয়, provider-টি কোনো allowlist-এ থাকুক বা না থাকুক।

**Operator-declared rules** (`OperatorProviderErrorRule`): প্রতিটি rule-এর
একটি ঐচ্ছিক `status` এবং একটি ঐচ্ছিক `match` থাকে (`match` হলো error text-এর
সাধারণ, case-insensitive substring, কখনো RegExp নয়, তাই এটি ReDoS ঘটাতে
পারে না), এবং দুটির অন্তত একটিতে মান সেট করতেই হবে। উভয়টি সেট থাকলে
তাদের AND হিসেবে প্রয়োগ করা হয়; কোনো field বাদ থাকলে তা যেকোনো কিছুর সঙ্গে
match করে, তাই `{match: "insufficient_quota"}` ওই code বহনকারী যেকোনো status-এর
সঙ্গে match করে। প্রথম matching rule জয়ী হয়। `cooldownMs` সর্বোচ্চ 30 দিন
গ্রহণ করে; মোট rule-এর সংখ্যা সর্বোচ্চ 50টি।

**সর্বগ্রাহী ডিফল্ট** (`settings.providerErrorDefaults`, opt-in, `setOperatorProviderErrorDefaults`-এর মাধ্যমে সেট করা): `{[provider]: {cooldownMs, scope?, reason?}}`
যেখানে `cooldownMs` 1 মিনিট থেকে 30 দিন পর্যন্ত হতে পারে। কোনো operator rule এবং কোনো built-in catalog rule মিল না পেলেই কেবল একটি default প্রযোজ্য হয়, এবং শুধু 402, 403, 408, 429 ও 5xx ত্রুটির ক্ষেত্রে। Request-shape error (400, 404, 409, 413, 422) এবং bare 401 তাদের নিজস্ব handling বজায় রাখে। স্পষ্ট `reason` না থাকলে, `classifyError` যেভাবে করে, সেভাবেই status থেকে reason নেওয়া হয়। একটি default ঘোষণা করা `hasOperatorRuleForProvider()`-এর জন্য operator rule হিসেবে গণ্য হয়, তাই তার `scope` (ডিফল্ট `"connection"`) মানা হয়। কোনো default-এর কার্যকর cooldown হবে তার `cooldownMs` এবং provider-এর নিজস্ব retry hint (`Retry-After`, `x-ratelimit-reset` অথবা body-তে থাকা reset hint—connection-cooldown setting "use upstream retry hints" চালু থাকলে engine যে একই hint মানে) এর মধ্যে যেটি বেশি, ফলে একটি default স্বল্প upstream hint-কে দীর্ঘ করতে পারে, কিন্তু প্রকৃত reset-এর সময়কে কখনো কমাতে পারে না। একটি explicit operator rule তার নির্দিষ্ট `cooldownMs`-ই বজায় রাখে। কোনো rule বা default-ই `markAccountUnavailable`-এর connection-cooldown guard এড়িয়ে যায় না: সক্রিয়, দীর্ঘতর cooldown কখনো কমানো হয় না এবং terminal status কখনো overwrite করা হয় না। `checkFallbackError`-এ আগে চলা built-in text detector-গুলো (credits exhausted, daily quota, account deactivated) তাদের নিজস্ব phrase-এর ক্ষেত্রে এখনও অগ্রাধিকার পায়।

**পরিচিত সীমাবদ্ধতা — HTTP 400-এর জন্য `providerRuleRegistry` কখনো পরামর্শ করা হয় না।**
`checkFallbackError`-এর `BAD_REQUEST` branch status 400-কে সম্পূর্ণভাবে তার নিজস্ব pattern array (`accountFallback.ts`-এর `MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` ইত্যাদি) দিয়ে classify করে এবং তার উপরের `configuredRule`/`getProviderErrorRuleMatch` branch-এ পৌঁছানোর আগেই return করে।
`status: 400`-সহ একটি built-in catalog rule (অথবা operator rule) syntactically বৈধ হলেও কখনো কার্যকর হবে না। বর্তমানে কোনো বিদ্যমান rule 400-কে target করে না, তাই production-এ কিছু প্রভাবিত হয় না — তবে ভবিষ্যতের কোনো 400 rule-এর জন্য প্রথমে এই branch পরিবর্তন করতে হবে। এটি শুধু একটি rule যোগ করার চেয়ে বড় পরিবর্তন, কারণ এতে pattern-array behavior-এর ওপর ইতিমধ্যে নির্ভরশীল প্রতিটি provider-এর জন্য 400 পুনরায় classify হবে; তাই একটি single-provider rule addition-এর পরিধির বাইরে।

### নতুন quota-misstating gateway যোগ করা

1. `statusRestatementRegistry`-এ একটি rule array নিবন্ধন করুন
   (`open-sse/config/upstreamStatusRestatement.ts`)। `textMarkers`
   provider-specific রাখুন; `CREDITS_EXHAUSTED_SIGNALS`-এর সঙ্গে সংঘর্ষ হয় এমন generic English phrase কখনো পুনর্ব্যবহার করবেন না
   (`open-sse/services/accountFallback.ts`)।
2. সঠিক lock scope বাছাই করতে চাইলে classification rule নিবন্ধন করুন
   (`open-sse/config/providerErrorRules.ts`-এ `providerRuleRegistry`) — account-wide quota-র জন্য `connection`, per-model error-এর জন্য `model`। এই ধাপটি production-এ কেবল সেই provider-গুলোর ক্ষেত্রে কার্যকর হয় যাদের rule-এ সম্পূর্ণ error text প্রয়োজন (body marker): একই file-এ `FULL_TEXT_RULE_PROVIDERS`-এ provider id যোগ করুন — অন্যথায় `checkFallbackError` rule-কে কেবল structured
   `{code, type}` error দেবে এবং body-text rule কখনো live traffic-এ match করবে না।
   যেসব rule কেবল `status`/`headers`-এর ভিত্তিতে match করে (যেমন Opencode-এর বা Minimax-এর), সেগুলোর এই opt-in প্রয়োজন নেই। আলাদাভাবে, যদি rule `scope: "connection"` ঘোষণা করে এবং উদ্দেশ্য হয় প্রকৃত connection-wide cooldown ও একই request-এর combo skip (শুধু informational label নয়), তাহলে একই file-এ `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-এ provider id যোগ করুন — `markAccountUnavailable()`
   (`src/sse/services/auth.ts`)-এ `isAgentrouterConnectionQuotaScope()`-ধরনের consumption এবং
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`)-এর gating এটাই করে; এটি না থাকলে `scope`
   এখনও `fallbackResult.ruleScope`-এর মধ্য দিয়ে প্রবাহিত হবে, কিন্তু সেটি অনুযায়ী কোনো action নেওয়া হবে না।
3. `tests/unit/upstream-status-restatement.test.ts`
   এবং `tests/unit/agentrouter-error-rules.test.ts` অনুসরণ করে unit test যোগ করুন (এর মধ্যে
   not-permanent / not-creditsExhausted guard অবশ্যই থাকবে, এবং — provider-এর allowlist প্রয়োজন হলে — এমন একটি test থাকবে যাতে নিশ্চিত করা হয় যে `resolveRuleMatchBody()` কেবল সেই provider-এর জন্য full text ফেরত দেয়)।

`chatCore.ts`, `classifyError`, বা combo-তে কোনো পরিবর্তনের প্রয়োজন নেই।

#### Egress-bucketed lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`-এর provider-গুলো (opencode family) IP-bucketed upstream হিসেবে বিবেচিত হয় (opencode free tier account-bucketed নয়, IP-bucketed — #9611 দেখুন): `quota_exhausted`
**অথবা** `rate_limit_exceeded` হিসেবে classified status-429 failing connection-এর সর্বশেষ জানা egress IP-এর সঙ্গে মিলে যায় এমন allowlisted-family-এর প্রতিটি connection-কে cooldown করে, rotation সেগুলো চেষ্টা করার আগেই
— ফলে N-1টি নিশ্চিতভাবে ব্যর্থ upstream call এড়ানো যায় (#10460/#10525-এর মতো একই ধরন)।
`rate_limit_exceeded` ইচ্ছাকৃতভাবে অন্তর্ভুক্ত: `markAccountUnavailable` path-এ opencode-specific rule কখনো match করে না (`checkFallbackError`-কে কোনো header/body দেওয়া হয় না, opencode `FULL_TEXT_RULE_PROVIDERS`-এ নেই), তাই subscription-quota text ("monthly usage limit reached") থাকা 429-এর body quota-text fallback (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h cooldown) দ্বারা `quota_exhausted` হিসেবে classified হয়, `status_429` rule-এ পৌঁছানোর আগেই — আর quota-text-বিহীন 429 (সাধারণ rate limiting) `status_429` rule-এর মাধ্যমে `rate_limit_exceeded` হিসেবে classified হয় এবং IP family-কে cooldown করতেই থাকে। কোনো allowlisted provider-এর ক্ষেত্রে IP-bucketed rate limit exhausted quota-র সমতুল্য signal। সৎ সীমাবদ্ধতাগুলো হলো:

- **সর্বোত্তম-প্রচেষ্টা**: লকটি `proxy_logs` থেকে সংযোগের সর্বশেষ জানা `egress_ip`
  সমাধান করে (২৪ ঘণ্টার উইন্ডো, সিঙ্ক্রোনাস, কোনো ক্যাশ নেই)। ক্যাশ ঠান্ডা
  (কখনও egress IP probe করা হয়নি) বা কোনো row না থাকলে → ব্যর্থ সংযোগটি
  branch দ্বারা তবুও cooldown পায় (আজকের মতোই রেকর্ড করা হয়), শুধু কোনো
  sibling লক হয় না।
- **কখনও terminal নয়**: cooldown একটি নবায়নযোগ্য quota window
  (`testStatus: "unavailable"`) হিসেবে কাজ করে; IP-level signal থেকে কখনও
  permanent state নির্ণয় করা হয় না। `disableCooling` সংযোগগুলো branch-টি
  সম্পূর্ণ এড়িয়ে যায়।
- **allowlisted family-এর জন্য লকের granularity পরিবর্তিত হয়**: এটি শুধু
  sibling optimization নয়, scope পরিবর্তন। opencode একটি
  `passthroughModels` provider, তাই এই branch-এর আগে 429 একটি per-MODEL
  lockout তৈরি করত; এখন এটি একটি connection cooldown তৈরি করে — এমনকি এমন
  operator-এর ক্ষেত্রেও, যিনি কোনো sibling ছাড়াই কেবল একটি connection
  চালাচ্ছেন। opencode rule table ইতিমধ্যেই যে granularity-কে সঠিক ঘোষণা করে
  (`scope: "connection"`, `providerErrorRules.ts`), এটিই সেই granularity; এখন
  পর্যন্ত এটি কখনও মানা হয়নি, কারণ opencode
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-এ নেই। branch-টি ব্যর্থ connection-এর
  cooldown + `backoffLevel` নিজেই লেখে, connection-scoped agentrouter
  branch-এর অনুরূপ, এবং return করে — per-model block ও নিচের generic path-এ
  কখনও পৌঁছানো হয় না।
- **Combo অন্তর্ভুক্ত**: agentrouter branch-এর মতোই, scope ইচ্ছাকৃতভাবে কোনো
  combo caller 429-এর ক্ষেত্রে প্রয়োগ করা `persistUnavailableState`/`isCombo`
  downgrade উপেক্ষা করে। per-model lockout এই scope-এর দুর্বলতর রূপ নয়,
  এটি ভুল unit: exhausted IP সম্পর্কে এটি কিছুই বলে না, ফলে combo rotation
  প্রতিটি sibling-এর জন্য একটি নিশ্চিত-ব্যর্থ call চালিয়ে যেতে থাকবে।
- **Sibling নিরাপত্তা**: কোনো sibling ইতিমধ্যেই terminal
  (banned/credits_exhausted) অবস্থায় থাকলে বা ইতিমধ্যেই আরও দীর্ঘ cooldown-এ
  থাকলে, সেটিকে কখনও overwrite করা হয় না।
- **Exclusive allowlist**: `EGRESS_BUCKETED_LOCK_PROVIDERS` সম্প্রসারণ একটি
  explicit owner decision; কোনো generic wiring নেই (pattern #10334/#10419)।
  sibling query একই allowlist-এ bind করে, SQL literal হিসেবে সেটিকে আবার
  লেখে না, তাই এটি সম্প্রসারণ করতে এক লাইনের পরিবর্তনই যথেষ্ট।
- **Egress IP rotation, উভয় দিকেই**: lookup window (২৪ ঘণ্টা) egress-IP
  cache TTL (৫ মিনিট)-এর তুলনায় অনেক বেশি প্রশস্ত, তাই "last known IP" হলো
  history, current state নয়। কোনো connection-এর proxy যদি window-এর মধ্যে
  rotate করে থাকে, তাহলে lock সত্যিই shared কোনো IP-কে **মিস** করতে পারে
  (রেকর্ড করা IP-টি নতুন, এখনও exhausted নয়) — এবং বিপরীতভাবে, exhausted IP
  থেকে ইতিমধ্যে rotate away করে যাওয়া কোনো sibling-কে **cool** করতে পারে।
  দ্বিতীয় ক্ষেত্রে ওই sibling-এর একটি cooldown window খরচ হয়; history-based
  lookup-এর সর্বোত্তম-প্রচেষ্টার সীমা হিসেবে উভয় ঘটনাই গ্রহণযোগ্য।
- **খরচ**: `proxy_logs`-এর দুটি bounded scan (`idx_pl_timestamp` ব্যবহার করে
  window-filtered), শুধু 429 frequency-তে। নতুন কোনো index নেই (migration 134
  YAGNI)। মাঝারি আকারের real-traffic DB copy-তে পরিমাপ করা হয়েছে; একটি
  high-throughput instance একই window-তে আনুপাতিকভাবে বেশি row ধরে রাখে।

## অন্যান্য রেজিলিয়েন্স ফিচার

- **২০টি রাউটিং স্ট্র্যাটেজি** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — দেখুন [AUTO-COMBO.md](../routing/AUTO-COMBO.md)।
- **রিসেট-সচেতন রাউটিং** (v3.8.0) — কোটা রিসেট সময় অনুযায়ী কানেকশনগুলোকে অগ্রাধিকার দেয়।
- **ব্যাকগ্রাউন্ড মোড ডিগ্রেডেশন** — Responses API-এর `background: true` সতর্কতাসহ সিঙ্ক-এ ডিগ্রেড হয়।
- **ডাইনামিক টুল লিমিট ডিটেকশন** — টুল সংখ্যা সীমায় পৌঁছালে প্রোভাইডারদের ব্যাক অফ করে।
- **ইমার্জেন্সি ফলব্যাক** — `OMNIROUTE_EMERGENCY_FALLBACK` দ্বারা নিয়ন্ত্রিত; অপারেটররা রিস্টার্ট ছাড়াই Feature Flags পেজ থেকে এটি ওভাররাইড করতে পারেন।

---

## ডিবাগিং

- Weighted combo `503 all_targets_cooling_down` উত্তর দেয় (`Retry-After` সেট করা থাকে, `diagnostics.excluded`-এ প্রতিটি টার্গেট `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` সহ তালিকাভুক্ত থাকে) → পুলটি কনফিগার ও কানেক্টেড আছে, প্রতিটি টার্গেট কেবল একটি রেজিলিয়েন্স টাইমার দ্বারা বাদ পড়েছে; `[COMBO] Weighted selection: every target excluded before dispatch — …` ওয়ার্নিংটি কারণ ও অবশিষ্ট সেকেন্ড উল্লেখ করে। একই কম্বো থেকে `404 no_executable_targets` মানে কোনো রেজিলিয়েন্স টাইমার জড়িত ছিল না (চালানোর মতো কিছু নেই, অথবা প্রতিটি অ্যাকাউন্ট অ্যাভেইলেবিলিটি প্রোবে ব্যর্থ হয়েছে)। `targetResolution.ts`-এ সংগৃহীত এক্সক্লুশন থেকে `open-sse/services/combo/pinRecovery.ts`-এ তৈরি।
- একটি প্রোভাইডারের সবগুলো কী স্কিপ হয়ে গেছে → সার্কিট ব্রেকার স্টেট এবং প্রতিটি কানেকশনের `rateLimitedUntil`/`testStatus` উভয়ই চেক করুন।
- রিসেট উইন্ডোর পরে প্রোভাইডার স্থায়ীভাবে বাদ পড়ে গেছে → কোড `getStatus()`/`canExecute()`-এর বদলে কাঁচা `state` পড়ছে।
- একটি কী ব্যর্থ হলে অন্যগুলো কাজ করা উচিত → সার্কিট ব্রেকারের বদলে কানেকশন কুলডাউনকে অগ্রাধিকার দিন।
- শুধু একটি মডেল ব্যর্থ হয় → কানেকশন কুলডাউনের বদলে মডেল লকআউটকে অগ্রাধিকার দিন।
- স্টেটের স্বয়ংক্রিয়ভাবে রিকভার হওয়ার কথা কিন্তু হচ্ছে না → ভবিষ্যতের টাইমস্ট্যাম্প + মেয়াদোত্তীর্ণ স্টেট রিফ্রেশ করে এমন রিড পাথ আছে কিনা চেক করুন। স্থায়ী স্ট্যাটাসের জন্য ম্যানুয়াল পরিবর্তন প্রয়োজন।

---

## রানটাইম স্টেট — এজেন্ট দ্রুত রেফারেন্স

> `AGENTS.md` → "Resilience Runtime State" থেকে হুবহু সরানো হয়েছে (PR #12743) যাতে এজেন্ট
> গাইডটি 40k কনটেক্সট বাজেটের মধ্যে থাকে। এটি উপরের বিভাগগুলোর সংক্ষিপ্ত, এজেন্ট-মুখী সংস্করণ;
> সংখ্যাযুক্ত বিভাগগুলোই সম্পূর্ণ রেফারেন্স।

OmniRoute-এ তিনটি সম্পর্কিত কিন্তু স্বতন্ত্র অস্থায়ী-ব্যর্থতা মেকানিজম রয়েছে। রাউটিং আচরণ ডিবাগ করার সময়
এদের স্কোপ আলাদা রাখুন। এক নজরে দেখার জন্য
[3-স্তরের রেজিলিয়েন্স ডায়াগ্রাম](../diagrams/exported/resilience-3layers.svg)
(সোর্স: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
দেখুন।

### প্রোভাইডার সার্কিট ব্রেকার

**স্কোপ**: সম্পূর্ণ প্রোভাইডার, যেমন `glm`, `openai`, `anthropic`।

**উদ্দেশ্য**: আপস্ট্রিম/সার্ভিস স্তরে বারবার ব্যর্থ হচ্ছে এমন প্রোভাইডারের দিকে ট্রাফিক পাঠানো বন্ধ করা,
যাতে একটি অসুস্থ প্রোভাইডার প্রতিটি রিকোয়েস্টকে ধীর করে না দেয়।

**ইমপ্লিমেন্টেশন**:

- মূল ক্লাস: `src/shared/utils/circuitBreaker.ts`
- চ্যাট গেট/এক্সিকিউশন ওয়্যারিং: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- রানটাইম স্ট্যাটাস API: `src/app/api/monitoring/health/route.ts`
- শেয়ার্ড র্যাপার: `open-sse/services/accountFallback.ts`
- পার্সিস্টেড স্টেট টেবিল: `domain_circuit_breakers`

**স্টেট** (৪টি — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: স্বাভাবিক ট্রাফিক অনুমোদিত।
- `DEGRADED`: আর্লি-ওয়ার্নিং ব্যান্ড — ব্যর্থতা ডিগ্রেডেশন থ্রেশহোল্ড অতিক্রম করেছে কিন্তু এখনো
  ব্রেকার থ্রেশহোল্ডে পৌঁছায়নি; ট্রাফিক চলতে থাকে, ড্যাশবোর্ডে সতর্কতা দেখায়। একটি সফল কানেকশন
  টেস্ট বা নতুন ব্যর্থতা ছাড়া একটি শান্ত উইন্ডো এটিকে `CLOSED`-এ ফিরিয়ে আনে
  (উইন্ডোটি `docs/architecture/RESILIENCE_GUIDE.md`-এ আছে)।
- `OPEN`: প্রোভাইডার সাময়িকভাবে ব্লক করা; কলাররা প্রোভাইডার-সার্কিট-ওপেন রেসপন্স পায়
  অথবা কম্বো রাউটিং অন্য টার্গেটে চলে যায়।
- `HALF_OPEN`: রিসেট টাইমআউট শেষ হয়েছে; একটি প্রোব রিকোয়েস্ট অনুমোদন করুন। সফল হলে
  ব্রেকার বন্ধ হয়, ব্যর্থ হলে আবার খুলে যায়।

**ডিফল্ট** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, `src/lib/resilience/settings.ts`-এর
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` এর মাধ্যমে কনজিউম হয় →
`src/sse/handlers/chatHelpers.ts`-এ `getCircuitBreaker(provider, …)`)। সম্পূর্ণ-প্রোভাইডার
ব্রেকারটি `circuitBreakerThreshold` / `circuitBreakerReset`-এ চলে:

| প্রোফাইল | ডিগ্রেড হয় | ওপেন হয় (`circuitBreakerThreshold`) | রিসেট (`circuitBreakerReset`) |
| -------- | ----------: | -----------------------------------: | ----------------------------: |
| OAuth    |         `5` |                                  `8` |                         `60s` |
| API key  |         `7` |                                 `12` |                         `30s` |
| Local    |   (নির্ণীত) |                                  `2` |                         `15s` |

`PROVIDER_PROFILES` এছাড়াও `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 মিনিট) এবং `providerCooldownMs` (5/10/1 মিনিট) সংজ্ঞায়িত করে: এগুলো
**অপ্ট-ইন গ্লোবাল Provider Cooldown-এর উইন্ডো গেট** চালায় (`PROVIDER_COOLDOWN_ENABLED`, ডিফল্ট
অফ) — `open-sse/services/providerCooldownTracker.ts`-এ প্রোভাইডার-লেভেল এন্ট্রি কেবল তখনই
কুলিং হিসেবে গণ্য হয় যখন `providerFailureWindowMs`-এর মধ্যে `providerFailureThreshold` সংখ্যক ব্যর্থতা ঘটে, এবং তারপর
`providerCooldownMs` সময়ের জন্য কুল করে। এগুলো লাইভ ব্রেকারের থ্রেশহোল্ড নয় — ব্রেকার আচরণ
আশা করে এগুলো টিউন করবেন না। প্রতিটি ডিফল্ট
`OMNIROUTE_PROVIDER_BREAKER_*` এবং `OMNIROUTE_CIRCUIT_BREAKER_*` এনভ ভ্যার দিয়ে ওভাররাইড করা যায়;
রানটাইম-নির্ভুল রেফারেন্স টেবিলটি `docs/architecture/RESILIENCE_GUIDE.md`-এ রয়েছে।

শুধুমাত্র প্রোভাইডার-লেভেল ব্যর্থতা স্ট্যাটাসই প্রোভাইডার ব্রেকার ট্রিপ করবে:

```ts
(408, 500, 502, 503, 504);
```

অধিকাংশ `401`, `403` বা `429` ক্ষেত্রের মতো সাধারণ অ্যাকাউন্ট/কী/মডেল এররের জন্য সম্পূর্ণ-প্রোভাইডার
ব্রেকার ট্রিপ করবেন না। সেগুলো সাধারণত কানেকশন কুলডাউন বা মডেল
লকআউটের অন্তর্ভুক্ত। একটি জেনেরিক API-key প্রোভাইডারের `403` রিকভারেবল হওয়া উচিত, যদি না সেটি
টার্মিনাল প্রোভাইডার/অ্যাকাউন্ট এরর হিসেবে শ্রেণীবদ্ধ হয়।

ব্রেকারটি লেজি রিকভারি ব্যবহার করে, ব্যাকগ্রাউন্ড টাইমার নয়। যখন `OPEN`-এর মেয়াদ শেষ হয়, `getStatus()`, `canExecute()`, এবং `getRetryAfterMs()`-এর মতো রিড অপারেশনগুলো স্টেটটি `HALF_OPEN`-এ রিফ্রেশ করে, যাতে ড্যাশবোর্ড এবং কম্বো ক্যান্ডিডেট বিল্ডাররা মেয়াদোত্তীর্ণ প্রোভাইডারকে চিরকাল বাদ দিতে থাকে না।

### কানেকশন কুলডাউন

**সুযোগ**: একটি প্রোভাইডার কানেকশন/অ্যাকাউন্ট/কী।

**উদ্দেশ্য**: একই প্রোভাইডারের অন্যান্য কানেকশনগুলোকে রিকোয়েস্ট সার্ভ করা চালিয়ে যাওয়ার সুযোগ দেওয়ার পাশাপাশি একটি ত্রুটিপূর্ণ কী/অ্যাকাউন্টকে সাময়িকভাবে এড়িয়ে যাওয়া।

**বাস্তবায়ন**:

- রাইট/আপডেট পথ: `src/sse/services/auth.ts::markAccountUnavailable()`
- অ্যাকাউন্ট নির্বাচন/ফিল্টারিং: `src/sse/services/auth.ts::getProviderCredentials...`
- কুলডাউন হিসাব: `open-sse/services/accountFallback.ts::checkFallbackError()`
- সেটিংস: `src/lib/resilience/settings.ts`

প্রোভাইডার কানেকশনগুলোর গুরুত্বপূর্ণ ফিল্ড:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

অ্যাকাউন্ট নির্বাচনের সময়, একটি কানেকশনকে এড়িয়ে যাওয়া হয় যখন:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

কুলডাউনগুলোও লেজি: যখন `rateLimitedUntil` অতীতে চলে যায়, কানেকশনটি আবার যোগ্য হয়ে ওঠে। সফল ব্যবহারের পর, `clearAccountError()` `testStatus`, `rateLimitedUntil`, এরর ফিল্ডগুলো এবং `backoffLevel` মুছে দেয়।

ডিফল্ট কানেকশন কুলডাউন আচরণ:

- OAuth বেস কুলডাউন: `5s`।
- API-কী বেস কুলডাউন: `3s`।
- API-কী `429`-এর ক্ষেত্রে আপস্ট্রিম রিট্রাই ইঙ্গিতগুলোকে (`Retry-After`, রিসেট হেডার, অথবা পার্সযোগ্য রিসেট টেক্সট) উপলব্ধ থাকলে অগ্রাধিকার দেওয়া উচিত।
- বারবার পুনরুদ্ধারযোগ্য ব্যর্থতাগুলো এক্সপোনেনশিয়াল ব্যাকঅফ ব্যবহার করে:

```ts
baseCooldownMs * 2 ** failureIndex;
```

অ্যান্টি-থান্ডারিং-হার্ড গার্ড একই কানেকশনে সমবর্তী ব্যর্থতাগুলোকে বারবার কুলডাউন বাড়ানো বা `backoffLevel` ডাবল-ইনক্রিমেন্ট করা থেকে বাধা দেয়।

টার্মিনাল স্টেটগুলো কুলডাউন নয়। `banned`, `expired` (যা শুধুমাত্র `EXPIRED_RETRY_MAX`-এর মাধ্যমে N সংখ্যক সীমাবদ্ধ রিট্রাইয়ের পরে টার্মিনাল হয়ে যায়), এবং `credits_exhausted` ক্রেডেনশিয়াল/সেটিংস পরিবর্তন বা কোনো অপারেটর রিসেট না করা পর্যন্ত অনুপলব্ধ থাকার জন্য তৈরি। টার্মিনাল স্টেটগুলোকে ক্ষণস্থায়ী কুলডাউন স্টেট দিয়ে ওভাররাইট করবেন না।

### মডেল লকআউট

**সুযোগ**: প্রোভাইডার + কানেকশন + মডেল।

**উদ্দেশ্য**: যখন শুধুমাত্র একটি মডেল সেই কানেকশনের জন্য অনুপলব্ধ বা কোটা-সীমিত থাকে, তখন পুরো কানেকশনটি নিষ্ক্রিয় করা এড়ানো।

উদাহরণ:

- প্রতি-মডেল কোটা প্রোভাইডারদের `429` রিটার্ন করা।
- লোকাল প্রোভাইডারদের একটি অনুপস্থিত মডেলের জন্য `404` রিটার্ন করা।
- প্রোভাইডার-নির্দিষ্ট মোড/মডেল পারমিশন ব্যর্থতা, যেমন নির্বাচিত Grok মোডগুলো।

মডেল লকআউট `open-sse/services/accountFallback.ts`-এ থাকে এবং একই কানেকশনকে অন্যান্য মডেলগুলো সার্ভ করা চালিয়ে যেতে দেয়।

### ডিবাগিং নির্দেশনা

- যদি একটি প্রোভাইডারের সমস্ত কী এড়িয়ে যাওয়া হয়, তাহলে প্রোভাইডার ব্রেকার স্টেট এবং প্রতিটি কানেকশনের `rateLimitedUntil`/`testStatus` উভয়ই পরীক্ষা করুন।
- যদি রিসেট উইন্ডোর পরে একটি প্রোভাইডার স্থায়ীভাবে বাদ পড়ে যাওয়া মনে হয়, তাহলে দেখুন কোডটি `getStatus()`/`canExecute()` ব্যবহার না করে কাঁচা `state` পড়ছে কিনা।
- যদি একটি প্রোভাইডার কী ব্যর্থ হয় কিন্তু অন্যগুলোর কাজ করার কথা থাকে, তাহলে প্রোভাইডার ব্রেকারের পরিবর্তে কানেকশন কুলডাউনকে অগ্রাধিকার দিন।
- যদি শুধুমাত্র একটি মডেল ব্যর্থ হয়, তাহলে কানেকশন কুলডাউনের পরিবর্তে মডেল লকআউটকে অগ্রাধিকার দিন।
- যদি একটি স্টেটের স্বয়ং-পুনরুদ্ধার হওয়ার কথা থাকে, তাহলে এর একটি ভবিষ্যৎ টাইমস্ট্যাম্প/রিসেট টাইমআউট এবং এমন একটি রিড পথ থাকা উচিত যা মেয়াদোত্তীর্ণ স্টেট রিফ্রেশ করে। স্থায়ী স্ট্যাটাসগুলোর জন্য ম্যানুয়াল ক্রেডেনশিয়াল বা কনফিগ পরিবর্তন প্রয়োজন।

---

## TLS ফিঙ্গারপ্রিন্টিং ও স্টেলথ

প্রোভাইডার-নির্দিষ্ট স্টেলথ (JA3/JA4, CCH, অবফাসকেশন) আলাদাভাবে ডকুমেন্ট করা আছে — দেখুন `docs/security/STEALTH_GUIDE.md` (git; `/docs`-এ কম্পাইল করা হয়নি)।

---

## রেজিলিয়েন্স টেস্টিং (ফেজ 8 · ব্লক C)

রেজিলিয়েন্স লজিকের ইউনিট টেস্টের বাইরে, তিনটি টেস্ট বাস্তব
স্ট্রেস/ব্যর্থতার পরিস্থিতিতে রানটাইমকে পরীক্ষা করে (সবই ইন্টিগ্রেশন/নাইটলি — কোনোটিই PR ব্লক করে না):

| টেস্ট       | কী                                                                                                                                                                                         | চালানো                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| Chaos       | ফেক-আপস্ট্রিম নোড প্রকৃত ল্যাটেন্সি/রিসেট/টাইমআউট/503 ইনজেক্ট করে; যাচাই করে যে সার্কিট ব্রেকার খুলছে/রিকভার করছে এবং `checkFallbackError` 503-কে রিকভারেবল ফলব্যাক হিসেবে শ্রেণীবদ্ধ করে। | `RUN_CHAOS_INT=1 npm run test:chaos`    |
| Heap-growth | `--expose-gc`-এর অধীনে প্রতি `createSSEStream`-এ ~500টি স্ট্রিম; হিপ সীমার বাইরে বেড়ে গেলে ফেইল করে (OOM গার্ড #3069)।                                                                    | `npm run test:heap`                     |
| k6 soak     | `/api/monitoring/health`-এর বিরুদ্ধে টানা লোড; p95/এরর থ্রেশহোল্ড।                                                                                                                         | `k6 run tests/load/k6-soak.js` (নাইটলি) |

`.github/workflows/nightly-resilience.yml` দ্বারা অর্কেস্ট্রেটেড (cron + dispatch)।
ডিফল্ট `test:integration`-এ, chaos ও heap সেলফ-স্কিপ করে (`RUN_CHAOS_INT`/`--expose-gc` ছাড়া)।

---

## আরও দেখুন

- [আর্কিটেকচার গাইড](./ARCHITECTURE.md) — সিস্টেম আর্কিটেকচার ও অভ্যন্তরীণ বিষয়
- [ইউজার গাইড](../guides/USER_GUIDE.md) — প্রোভাইডার, কম্বো, CLI ইন্টিগ্রেশন
- [অটো-কম্বো ইঞ্জিন](../routing/AUTO-COMBO.md) — 16-ফ্যাক্টর স্কোরিং, মোড প্যাক
