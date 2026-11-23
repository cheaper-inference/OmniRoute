# Resilience Guide (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute-এ তিনটি স্বতন্ত্র কিন্তু সম্পর্কিত স্থিতিস্থাপকতা ব্যবস্থা রয়েছে। প্রতিটির পরিধি ও উদ্দেশ্য আলাদা। রাউটিং আচরণ ডিবাগ করার সময় এগুলোকে পৃথক রাখুন।

![৩-স্তরবিশিষ্ট স্থিতিস্থাপকতা মডেল](../diagrams/exported/resilience-3layers.svg)

> উৎস: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. প্রোভাইডার সার্কিট ব্রেকার

**পরিধি:** সম্পূর্ণ প্রোভাইডার (যেমন, `glm`, `openai`, `anthropic`)।

**উদ্দেশ্য:** আপস্ট্রিম/সার্ভিস স্তরে বারবার ব্যর্থ হওয়া কোনো প্রোভাইডারের কাছে ট্রাফিক পাঠানো বন্ধ করা।

**বাস্তবায়ন:**

- মূল ক্লাস: `src/shared/utils/circuitBreaker.ts`
- সংযোগ: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- স্ট্যাটাস API: `GET /api/monitoring/health`
- রিসেট API: `POST /api/resilience/reset`
- র্যাপার: `open-sse/services/accountFallback.ts`
- DB টেবিল: `domain_circuit_breakers`

**অবস্থাসমূহ:**

- `CLOSED` — স্বাভাবিক ট্রাফিক অনুমোদিত
- `DEGRADED` — ট্রাফিক এখনও অনুমোদিত, তবে প্রোভাইডারের বর্ধিত ব্যর্থতাগুলো ট্র্যাক করা হয়; পর্যাপ্ত সফলতার পর, একটি বৈধ সংযোগ পরীক্ষার পর, অথবা নতুন কোনো ব্যর্থতা ছাড়াই সর্বশেষ ব্যর্থতার ধরনের জন্য দীর্ঘতম `OPEN` ধরে রাখার সময় (`cooldownByKind`-এর মান, অন্যথায় `resetTimeout`, × `maxBackoffMultiplier`, অন্তত একটি কুলডাউন) অতিক্রান্ত হলে `CLOSED` অবস্থায় ফিরে যায়
- `OPEN` — প্রোভাইডার সাময়িকভাবে অবরুদ্ধ; কম্বো রাউটিং এটি এড়িয়ে যায়
- `HALF_OPEN` — রিসেট টাইমআউট অতিক্রান্ত; প্রোব অনুরোধ অনুমোদিত

**কনফিগারযোগ্য ডিফল্ট (`open-sse/config/constants.ts`, Dashboard → Settings → Resilience-এ প্রদর্শিত):**

| শ্রেণি  | ডিগ্রেডেড হয়  | ওপেন হয়        | রিসেট টাইমআউট |
| ------- | -------------- | --------------- | ------------- |
| OAuth   | 5টি ব্যর্থতায় | 8টি ব্যর্থতায়  | 60s           |
| API-key | 7টি ব্যর্থতায় | 12টি ব্যর্থতায় | 30s           |
| লোকাল   | নির্ণীত        | 2টি ব্যর্থতায়  | 15s           |

কোনো প্রোভাইডার কখন `DEGRADED` অবস্থায় প্রবেশ করবে তা `degradationThreshold` নিয়ন্ত্রণ করে; এটি কখন ওপেন হবে এবং এড়িয়ে যাওয়া হবে তা `failureThreshold` নিয়ন্ত্রণ করে। লোকাল প্রোভাইডার প্রোফাইলগুলো এখনও Resilience সেটিংস পেজে প্রদর্শিত হয় না।

**ট্রিপ কোড:** শুধুমাত্র প্রোভাইডার-স্তরের স্ট্যাটাস `[408, 500, 502, 503, 504]`। অ্যাকাউন্ট-স্তরের ত্রুটির ক্ষেত্রে (অধিকাংশ 401/403/429 — এগুলো কুলডাউন বা লকআউটের অন্তর্ভুক্ত) ট্রিপ করবেন না।

**লেজি রিকভারি:** `OPEN`-এর মেয়াদ শেষ হলে `getStatus()`, `canExecute()`, `getRetryAfterMs()` অবস্থা রিফ্রেশ করে `HALF_OPEN` করে। একই রিডগুলো (এবং পরবর্তী ব্যর্থতা) একটি পুরোনো `DEGRADED` অবস্থাকে ক্ষয় করে `CLOSED`-এ ফিরিয়ে আনে। কোনো ব্যাকগ্রাউন্ড টাইমারের প্রয়োজন নেই।

---

### অপ্ট-ইন গ্লোবাল প্রোভাইডার কুলডাউন (উইন্ডো গেট)

একটি চতুর্থ, **অপ্ট-ইন** স্তর (`PROVIDER_COOLDOWN_ENABLED`, ডিফল্টভাবে **বন্ধ**)
`open-sse/services/providerCooldownTracker.ts`-এ ব্যর্থ প্রোভাইডারগুলোর একটি
ক্রস-রিকোয়েস্ট স্মৃতি ধরে রাখে, যা কম্বো টার্গেট নির্ধারণের সময় ব্যবহার করা হয়,
যাতে ধারাবাহিক কম্বো অনুরোধ এইমাত্র ব্যর্থ হওয়া কোনো প্রোভাইডারকে বারবার পরীক্ষা না করে।
প্রোভাইডার-স্তরের এন্ট্রিগুলো `PROVIDER_PROFILES` উইন্ডো গেট অনুসরণ করে:

| প্রোফাইল | যতবার ব্যর্থ হলে ট্রিপ করে (`providerFailureThreshold`) | যে সময়ের মধ্যে (`providerFailureWindowMs`) | যতক্ষণ কুলডাউনে থাকে (`providerCooldownMs`) |
| -------- | ------------------------------------------------------: | ------------------------------------------: | ------------------------------------------: |
| OAuth    |                                                    `10` |                                     `15min` |                                      `5min` |
| API key  |                                                    `15` |                                     `30min` |                                     `10min` |

থ্রেশহোল্ডের নিচে প্রোভাইডারটিকে **কুলডাউনে আছে** বলে গণ্য করা হয় না; একটি সফলতা
উইন্ডোটি মুছে দেয়। এর পরিবর্তে সংযোগ-স্তরের এন্ট্রিগুলো (`provider:connectionId`)
এক্সপোনেনশিয়াল `minRetryCooldownMs → maxRetryCooldownMs` ব্যাকঅফ বজায় রাখে। ওভাররাইড:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`।
রিগ্রেশন গার্ড: `tests/unit/provider-cooldown-window-gate.test.ts`।

## 2. সংযোগ কুলডাউন

**পরিধি:** একটি একক প্রোভাইডার সংযোগ/অ্যাকাউন্ট/কী।

**উদ্দেশ্য:** একই প্রোভাইডারের অন্যান্য সংযোগ সেবা প্রদান চালিয়ে যাওয়ার সময় একটি ত্রুটিপূর্ণ কী এড়িয়ে যাওয়া।

**বাস্তবায়ন:**

- অনুপলভ্য হিসেবে চিহ্নিত করা: `src/sse/services/auth.ts::markAccountUnavailable()`
- নির্বাচন: একই ফাইলে `getProviderCredentials*`
- কুলডাউন গণনা: `open-sse/services/accountFallback.ts::checkFallbackError()`
- সেটিংস: `src/lib/resilience/settings.ts`

**প্রতি সংযোগের ফিল্ড:**

- `rateLimitedUntil` — কুলডাউন শেষ হওয়া পর্যন্ত টাইমস্ট্যাম্প
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — এক্সপোনেনশিয়াল ব্যাকঅফ কাউন্টার

**ডিফল্ট কুলডাউন:**

- OAuth ভিত্তি: 5s
- API-key ভিত্তি: 3s
- API-key 429: আপস্ট্রিম `Retry-After`/রিসেট হেডার/পার্সযোগ্য রিসেট টেক্সটকে অগ্রাধিকার দেয়
- ব্যাকঅফ: `baseCooldownMs * 2 ** failureIndex`

**অ্যান্টি-থান্ডারিং-হার্ড সুরক্ষা:** সমসাময়িক ব্যর্থতাগুলোকে অতিরিক্তভাবে কুলডাউন বাড়ানো বা `backoffLevel` দুইবার বৃদ্ধি করা থেকে বিরত রাখে।

**কনকারেন্সি-লিমিট 429 ব্যাকঅফের ধাপ বাড়ায় না।** এমন একটি `429`, যার বডি কোনো
কনকারেন্সি সীমা ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) নির্দেশ করে, তার অর্থ হলো অ্যাকাউন্টটি সচল কিন্তু ব্যস্ত।
`checkFallbackError()` কারণ হিসেবে `concurrency_limited` ফেরত দেয়: এখনই পরবর্তী
সংযোগে ফেইলওভার করুন, এটিকে নির্দিষ্ট `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) সময়ের জন্য বা
আপস্ট্রিমের পুনরায় চেষ্টা-সংক্রান্ত ইঙ্গিত অনুযায়ী কুলডাউনে রাখুন, `backoffLevel` অপরিবর্তিত রাখুন এবং `skipProviderBreaker` সেট করুন।
স্পষ্ট কোনো কোটা বডি তবুও অগ্রাধিকার পায়, তাই কোটা প্যাটার্নের সঙ্গেও মিলে যায় এমন বডির
রায় কোটা হিসেবেই থাকে। শনাক্তকরণ: `src/shared/utils/classify429.ts`-এ `looksLikeConcurrencyLimit()`;
রায়: `open-sse/services/accountFallback/concurrencyLimit429.ts`। `classify429()`-এর (ব্রেকারের
`FailureKind`) আচরণ অপরিবর্তিত থাকে এবং এসব বডির জন্য এখনও `rate_limit` পড়ে।

**স্ট্রিম কনটেন্ট স্টল হলে অ্যাকাউন্ট কুলডাউনে যায় না।** নির্ধারিত সময়ের মধ্যে কোনো
মডেল আউটপুট না-পাঠানো স্ট্রিমের ক্ষেত্রে কনটেন্ট-স্টল ওয়াচডগ
(`open-sse/utils/streamHandler.ts`) হাল ছেড়ে দিলে, `markAccountUnavailable()` সংযোগটিতে
ত্রুটি রেকর্ড করে, কিন্তু কোনো কুলডাউন সেট করে না: স্টলটি ওই অনুরোধের সঙ্গে সম্পর্কিত,
যা অধিকাংশ ক্ষেত্রেই এমন একটি দীর্ঘ রিজনিং টার্ন যেখানে এখনও কোনো আউটপুট নেই।
অপারেটররা `resilienceSettings.streamStallCooldown.enabled` দিয়ে আবার এটি চালু করতে পারেন
(ডিফল্ট `false`)।

**রিজনিং ফ্রেম কনটেন্ট-স্টল বাজেট পুনরায় শুরু করে।** একটি রিজনিং মডেল তার প্রথম
দৃশ্যমান টোকেন দেওয়ার আগে কয়েক মিনিট ভাবতে পারে: Claude এমন `thinking_delta` ফ্রেম
স্ট্রিম করে, যেগুলোর থিংকিং টেক্সট খালি হতে পারে, আর Responses API একটির পর একটি
রিজনিং আইটেম স্ট্রিম করে। `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`)
এসব ফ্রেম শনাক্ত করে এবং টার্নটি বাতিল না করে প্রতিটির ক্ষেত্রে ওয়াচডগের বাজেট পুনরায়
শুরু করে। এগুলো তবুও মডেল আউটপুট নয়, তাই শুধু রিজনিং দিয়ে শেষ হওয়া কোনো টার্নকে
এখনও খালি হিসেবে রিপোর্ট করা হয়, এবং কোনো টার্ন রিজনিং বন্ধ করে শুধু হার্টবিট পাঠালে
তবুও ওয়াচডগ সক্রিয় হয়।

Kiro-এর নন-এম্পটি সিগনেচারসহ বাইনারি `reasoningContentEvent` ফ্রেমগুলো এক্সিকিউটরের
মধ্য দিয়ে এই রিজনিং কার্যকলাপকে একটি খালি `reasoning_content` ডেল্টা হিসেবে সংরক্ষণ করে।
সিগনেচারটি ফরোয়ার্ড করা হয় না। মেটাডেটা, অসম্পূর্ণ ফ্রেম এবং খালি সিগনেচার কনটেন্ট
বাজেট পুনরায় শুরু করে না; স্বতন্ত্র অ্যাক্টিভ-স্ট্রিম টাইমআউট এবং ক্লায়েন্ট বাতিলকরণ
তবুও প্রযোজ্য থাকে (`open-sse/executors/kiro/reasoning.ts`)।

**টার্মিনাল স্টেট (কুলডাউন নয়):**

- `banned` — নিষিদ্ধ-কীওয়ার্ড / অ্যাকাউন্ট-ব্যান শনাক্তকরণ (দেখুন [BAN_DETECTION](../security/BAN_DETECTION.md)) এবং পরপর তিনটি আপস্ট্রিম প্রতি-অনুরোধ প্রত্যাখ্যান (`request_rejected`, যেমন Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`) দ্বারা সেট হয়; একটি মাত্র প্রত্যাখ্যান শুধু সংযোগটিকে কুলডাউনে রাখে
- `expired` (সীমিতসংখ্যক পুনঃচেষ্টার পর টার্মিনাল অবস্থায় যায় — এক্সপোনেনশিয়াল ব্যাকঅফসহ `EXPIRED_RETRY_MAX = 3` — যাতে সাময়িক OAuth ত্রুটি অ্যাকাউন্টটি স্থায়ীভাবে নিষ্ক্রিয় হওয়ার আগে নিজে থেকেই সেরে উঠতে পারে)
- `credits_exhausted`

ক্রেডেনশিয়াল পরিবর্তন না হওয়া বা কোনো অপারেটর এগুলো রিসেট না করা পর্যন্ত এসব অবস্থা বজায় থাকে। সাময়িক কুলডাউন স্টেট দিয়ে টার্মিনাল স্টেট ওভাররাইট করবেন না।

**লেজি পুনরুদ্ধার:** `rateLimitedUntil` অতিক্রান্ত হলে সংযোগটি আবার ব্যবহারের যোগ্য হয়। সফলভাবে ব্যবহারের পর `clearAccountError()` সব ত্রুটি ফিল্ড পরিষ্কার করে।

### Claude OAuth ব্যবহারের সীমা: নিম্ন-অগ্রাধিকার লেন + সেশন-লিমিট রিসেট

**পরিধি:** একটি Claude সাবস্ক্রিপশন (OAuth) সংযোগ। উভয় ফিচারই **প্রতি সংযোগে অপ্ট-ইন
করতে হয়** (সংযোগ সম্পাদনা → Claude বিভাগ → `providerSpecificData`-এ `lowPriorityMode` /
`autoLimitReset`, উভয়ই ডিফল্টভাবে বন্ধ) এবং Claude Code-এর `/low-priority` ও
`/limit-reset` কমান্ডের অনুরূপ (ওয়্যার কনট্র্যাক্ট Claude Code 2.1.263 থেকে ধারণ করা হয়েছে)।

**বাস্তবায়ন:**

- স্টেট মেশিন + রেসপন্স শ্রেণিবিন্যাস: `open-sse/services/claudeLowPriority.ts`
- রিসেট স্ট্যাটাস/ক্লেইম ক্লায়েন্ট: `open-sse/services/claudeLimitReset.ts`
- এক্সিকিউটর হুক (হেডার ইনজেকশন + একই অ্যাকাউন্টে পুনঃচেষ্টা): `open-sse/executors/base.ts::execute()`
- অপ্ট-ইন পারসিস্টেন্স: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ট্রিগার:** ৫ ঘণ্টার ব্যবহারের সীমা — এমন একটি `429`, যার হেডারে
`anthropic-ratelimit-unified-status: rejected` এবং অ্যাকাউন্টটি যোগ্য হলে
`anthropic-ratelimit-unified-slow-offer: treatment` থাকে। প্রথমবার সীমায় পৌঁছে 429
না-আসা পর্যন্ত কিছুই পাঠানো হয় না; ইউনিফায়েড হেডারবিহীন কোনো বার্স্ট 429 স্বাভাবিক
কুলডাউন পাথ দিয়ে যায়।

**নিম্ন-অগ্রাধিকার লেন** (`lowPriorityMode`):

- ওয়াল 429-এ executor অফারটি গ্রহণ করে এবং সঙ্গে সঙ্গে **একই**
  অ্যাকাউন্টে `anthropic-usage-limit: slow` সহ পুনরায় চেষ্টা করে; ঘোষিত
  `anthropic-ratelimit-unified-reset` (+60s গ্রেস) পর্যন্ত lane সক্রিয় থাকে এবং ওই সময়সীমার প্রতিটি request-এ
  header-টি থাকে। intercept করা 429 কখনোই `handleChatCore`-এ পৌঁছায় না, তাই connection-টিকে
  cooldown-এ রাখা হয় **না** এবং অন্যত্র rotate-ও করা হয় না।
- পরবর্তী response-গুলোতে `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`
  lane-টি বজায় রাখে; `slot_busy` (429) বা একটি `529` server-এর
  `anthropic-ratelimit-unified-slow-retry-after` অনুযায়ী অপেক্ষা করে (default 20s, clamp 5–600s, ±30% jitter)
  এবং পুনরায় চেষ্টা করে, যা `anthropic-ratelimit-unified-slow-max-wait` দ্বারা সীমাবদ্ধ (default 20 min, clamp
  1 min–6 h) — তা অতিক্রম করলে lane শেষ হয় এবং 10-minute cool-off পুনরায় গ্রহণ block করে। অপেক্ষাটি
  অতিরিক্তভাবে request-এর নিজস্ব upstream-start timeout-এর অবশিষ্ট সময়
  (`resolveFetchStartTimeout`, default হিসেবে 10 min) থেকে 5 s margin বাদ দিয়ে সীমাবদ্ধ করা হয়: ওই cap ছাড়া
  default 20-minute max-wait request-এর আয়ুর চেয়ে বেশি হতো এবং sleep অপেক্ষার মাঝপথে abort হয়ে
  স্বাভাবিক `max_wait` সমাপ্তি + cool-off-এর বদলে একটি `TimeoutError` প্রকাশ করত।
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, একটি 5h-window rollover, অথবা
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (যা যেকোনো status-এ এটিকে
  `extra_usage` হিসেবে শেষ করে, কারণ paid overage এখন wall কভার করে) lane শেষ করে; এরপর
  response স্বাভাবিক cooldown path-এ প্রবাহিত হয়। `budget_exhausted` ঘোষিত budget reset পর্যন্ত
  (≤ 8 days) মনে রাখা হয়।
- wall check executor-এর নিজস্ব 400-চালিত intra-attempt retry-গুলোর পরে চলে (context
  editing, thinking/effort clamp, param auto-learn), তাই কেবল ওই retry-গুলোর একটিতে প্রকাশ পাওয়া wall 429-ও
  cooldown path-এ পৌঁছানোর পরিবর্তে intercept করা হয়।
- state প্রতি connection-এর জন্য in-memory থাকে (restart করলে পুনরায় গ্রহণ করতে একটি অতিরিক্ত wall 429 লাগে)।

**Session-limit reset** (`autoLimitReset`, দুটিই চালু থাকলে lane-এর আগে চেষ্টা করা হয়):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  block; যখন `arm: "reset"` এবং `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits`-এ
  `{ "program": "juniper_tide" }` সহ (organization UUID নেওয়া হয়
  `providerSpecificData.organizationUUID` থেকে, bootstrap fallback সহ)।
- `result: reset|not_limited` → request-টি পূর্ণ গতিতে পুনরায় চেষ্টা করা হয় (কোনো slow header ছাড়া)।
  `already_used` / `not_offered` `next_available_at` memoise করে (default এক সপ্তাহ); যেকোনো
  failure 15 minutes backoff করে। reset সপ্তাহে একবার এবং তবুও weekly limit-এর হিসাবে গণ্য হয়।

Regression guard: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`।

### Session affinity (#7274)

**Scope:** একটি client session (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header), **যেকোনো** provider-এর জন্য একটি connection-এ pin করা।

**উদ্দেশ্য:** request-গুলোর মধ্যে একটি multi-turn agent-কে (Claude Code, aider, custom agent) একই account-এ রাখা, যাতে cross-account context loss এবং per-account session state থাকা provider-গুলোতে বারবার cold-start 429 কমে।

**বাস্তবায়ন:**

- TTL resolution: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Header extraction (generic, any provider): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Persisted pin table: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Setting: `sessionAffinityTtlMs` (global TTL in ms, `0` করলে নিষ্ক্রিয় হয়) — `src/lib/db/settings.ts`। Codex-only `codexSessionAffinityTtlMs` থেকে migration `124_generic_session_affinity_ttl.sql` দ্বারা নাম পরিবর্তন করা হয়েছে, যা আগে configure করা যেকোনো Codex TTL-কে নতুন default হিসেবে বহন করে।

#7274-এর আগে, `resolveSessionAffinityTtlMs()` `codex` ছাড়া প্রতিটি provider-এর জন্য সরাসরি `0` return করত, ফলে pinning mechanism এবং header extraction আগে থেকেই provider-agnostic হলেও TTL setting (এবং session header-গুলো) অন্য কোথাও কোনো প্রভাব ফেলত না। fix-টি সেই early-return সরিয়ে দিয়েছে; globalভাবে `0`-এর বেশি সেট করা হলে TTL এখন প্রতিটি provider-এর ক্ষেত্রে সমানভাবে প্রযোজ্য হয়।

তিনটি session-affinity header কখনো upstream-এ forward করা হয় না — executor-গুলো client header pass-through না করে শুরু থেকে নিজেদের upstream header তৈরি করে, তাই এটি কেবল একটি internal correlation id হিসেবেই থাকে।

### একচেটিয়া managed session connection lease

**Scope:** একটি সক্রিয় managed HTTP client/session একটি eligible OmniRoute connection-এর মালিক হয়।

**উদ্দেশ্য:** যেসব client-এর request-জুড়ে একটি কঠোর routing
fence দরকার, তাদের জন্য টেকসই একচেটিয়া connection ownership প্রদান করা। এটি session affinity থেকে আলাদা, যা একটি soft continuity preference:
একটি exclusive lease SQLite-এ lifecycle state স্থায়ীভাবে সংরক্ষণ করে, global active-owner এবং
active-connection uniqueness প্রয়োগ করে এবং provider dispatch-এর আগে একটি stale generation প্রত্যাখ্যান করে।

feature-টি প্রতি API key-এর জন্য opt-in। একটি managed key-এর অবশ্যই `lease:exclusive` scope এবং একটি
স্পষ্ট non-empty `allowedConnections` list থাকতে হবে। যেকোনো HTTP client lifecycle endpoint ব্যবহার করতে পারে; কোনো
client name, user-agent, provider, OAuth method বা model প্রয়োজন হয় না। lease একটি connection-এর মালিক,
model-এর নয়, তাই connection সাধারণভাবে eligible থাকা অবস্থায় model পরিবর্তন হলেও binding বজায় থাকে।
স্বাভাবিক model, quota, health, cooldown এবং allowlist rule-গুলোই authoritative থাকে এবং একই
generation-কে অন্য একটি free eligible connection-এ স্থানান্তর করতে পারে।

লাইফসাইকেলটি হলো `POST /api/v1/session-leases`, যার JSON অ্যাকশনগুলো হলো `acquire`, `renew`, এবং `release`।
পরিচালিত ইনফারেন্স অনুরোধগুলো অস্বচ্ছ `X-OmniRoute-Lease-Owner` মান এবং হুবহু
`X-OmniRoute-Lease-Generation` উপস্থাপন করে। মালিকের মানে `vlo_`-এর পরে 43টি base64url অক্ষর থাকে; কেবল
এর SHA-256 হ্যাশ সংরক্ষণ করা হয়। প্রতিটি চূড়ান্ত ডিসপ্যাচ ফেন্স প্রমাণীকৃত API কী ID এবং
সক্রিয় সংযোগ ID-কেও আবদ্ধ করে। লিজ নিয়ন্ত্রণের হেডারগুলো লগ, সংরক্ষিত অনুরোধ স্ন্যাপশট, এবং
আপস্ট্রিম এক্সিকিউটর হেডার থেকে সরিয়ে ফেলা হয়।

যদি সাধারণ রাউটিংয়ে যোগ্য পরিচালিত প্রার্থী থাকে, কিন্তু প্রতিটি মুক্ত প্রার্থী কোনো
বিদেশি সক্রিয় লিজের অধীনে থাকে, তাহলে OmniRoute HTTP `429`, lease-capacity-unavailable কোড, একটি
waiting-for-capacity অবস্থা, এবং প্রাসঙ্গিক সবচেয়ে আগের মেয়াদোত্তীর্ণ হওয়ার সময় থেকে নির্ধারিত সীমাবদ্ধ `Retry-After` ফেরত দেয়।
সাধারণভাবে যোগ্যতার তালিকা খালি থাকা লিজ-বিরোধ নয় এবং এটি বিদ্যমান রাউটিং ত্রুটির অর্থবিজ্ঞান বজায় রাখে।

সংশ্লিষ্ট প্রক্রিয়াগুলো পৃথক থাকে:

- OAuth সেশন দখল OAuth অ্যাকাউন্টগুলোর জন্য প্রসেস-স্থানীয় সফট ডিস্ট্রিবিউশন।
- অ্যাকাউন্ট সেমাফোরগুলো অনুরোধ-সমকালীনতার পারমিট দেয় এবং একটি অনুরোধ সম্পন্ন হলে শেষ হয়।
- এক্সক্লুসিভ পরিচালিত সেশন লিজ হলো জেনারেশন ফেন্সসহ স্থায়ী লাইফসাইকেল মালিকানা।

---

## 3. মডেল লকআউট

**পরিধি:** provider + connection + model ট্রিপল।

**স্ট্যাটাস অনুযায়ী কী-এর পরিধি:** ব্যর্থতার স্ট্যাটাস নির্ধারণ করে কোন কী-তে লকআউট লেখা হবে
(`open-sse/services/accountFallback/exactModelLock.ts`-এর `resolveLockoutScope()`):

- `429` / `403` / `402` — quota বা entitlement সংকেত — **quota family** লক করে:
  codex-এর ক্ষেত্রে connection-এর সম্পূর্ণ `codex` / `spark` পরিধি (প্রতিটি `gpt-5*` model), অন্য provider-গুলোর ক্ষেত্রে `getQuotaScopedModelForProvider()`।
- `404` মূল model-টিকে লক করে (`getModelLockKey()` `not_found`-এর পরিধি সংকুচিত করে)।
- অন্য যেকোনো স্ট্যাটাস — `5xx` transport/server ব্যর্থতা এবং quality validation থেকে OmniRoute-এর নিজস্ব
  তৈরি করা `502` — কেবল সুনির্দিষ্ট
  provider/connection/model tuple-টিকেই লক করে। একটি model-এর খারাপ stream অ্যাকাউন্টটির quota সম্পর্কে প্রমাণ নয়;
  এই নিয়মের আগে `codex/gpt-5.6-luna`-তে একটি খালি response ওই connection-এর
  প্রতিটি `gpt-5*` model-কে 2–30 মিনিটের জন্য (ক্রমবর্ধমানভাবে) routing থেকে সরিয়ে দিত,
  যদিও এর quota অপরিবর্তিত থাকত।
- caller-এর স্পষ্ট `scope` option সর্বদা অগ্রাধিকার পায় (Antigravity `"exact"` পাঠায়)।

**উদ্দেশ্য:** কেবল একটি model অনুপলভ্য বা quota-সীমিত হলে সম্পূর্ণ connection নিষ্ক্রিয় করা এড়ানো।

**উদাহরণ:**

- প্রতি-model quota provider থেকে 429 ফেরত আসা
- একটি অনুপস্থিত model-এর জন্য local provider থেকে 404 ফেরত আসা
- Provider-নির্দিষ্ট mode/model permission ব্যর্থতা (যেমন, Grok mode)

**বাস্তবায়ন:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`।

### মডেল কুলডাউন ড্যাশবোর্ড (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

সক্রিয় lockout-গুলোকে নিম্নোক্ত তথ্যসহ তালিকাভুক্ত করে: provider, connection, model, কারণ, expiresAt। Operator-রা card থেকে কোনো model-কে ম্যানুয়ালি পুনরায় সক্রিয় করতে পারেন।

**REST API:**

- `GET /api/resilience/model-cooldowns` — সক্রিয় lockout-এর তালিকা
- `DELETE /api/resilience/model-cooldowns` — ম্যানুয়াল পুনঃসক্রিয়করণ। Body: `{provider, connection, model}`। Auth: management।

### কুলডাউন ম্যানেজার

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`)।

প্রতিটি provider page খোলার পরিবর্তে, সাময়িক কোনো কারণে routing-এর বাইরে থাকা প্রতিটি connection-এর জন্য একটি একক page। এটি connection cooldown, model lockout এবং terminal state তালিকাভুক্ত করে; প্রতিটি connection-এর জন্য, কোনো selection-এর জন্য, অথবা একটি provider-এর সব connection-এর জন্য সেগুলো clear করে; এবং সর্বাধিক সমন্বয় করা cooldown rule-গুলো সম্পাদনা করে: `streamStallCooldown.enabled` এবং OAuth / API-key
`connectionCooldown`-এর base cooldown ও সর্বোচ্চ backoff step (`PATCH /api/resilience`-এর মাধ্যমে সংরক্ষিত)।
Terminal state (`banned`, `expired`, `credits_exhausted`) তালিকাভুক্ত করা হয়, কিন্তু এখান থেকে কখনো clear করা হয় না।

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — status, অবশিষ্ট cooldown,
  backoff level, সর্বশেষ error type এবং model lockout-সহ connection-গুলো (কোনো credential নয়)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` অথবা
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` ফেরত দেয়

### লকআউট সেটিংস UI + সাকসেস-ডিকে রিকভারি (v3.8.23)

Model lockout সর্বদা সক্রিয় hardcoded আচরণ থেকে নিজস্ব settings card এবং self-healing recovery path-সহ সম্পূর্ণ configurable, opt-in feature-এ রূপান্তরিত হয়েছে।

**Settings card:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)।
এটি উপরের read-only `ModelCooldownsCard` থেকে **পৃথক** (যেটি কেবল সক্রিয় lockout _তালিকাভুক্ত_ করে) — নতুন card-টি _parameter-গুলো configure করে_। Default-গুলো
`DEFAULT_MODEL_LOCKOUT_SETTINGS`-এ রয়েছে
(`src/lib/resilience/modelLockoutSettings.ts`):

| Setting                 | Default                          | অর্থ                                                       |
| ----------------------- | -------------------------------- | ---------------------------------------------------------- |
| `enabled`               | `false`                          | Master toggle — model lockout **ডিফল্টভাবে বন্ধ**।         |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | যেসব upstream status model-scoped failure হিসেবে গণ্য হয়। |
| `baseCooldownMs`        | `120_000` (120 s)                | প্রথম ব্যর্থতার জন্য প্রাথমিক lockout-এর সময়কাল।          |
| `maxCooldownMs`         | `1_800_000` (30 min)             | ক্রমবর্ধমান cooldown-এর সর্বোচ্চ সীমা।                     |
| `maxBackoffSteps`       | `10`                             | Exponential-backoff বৃদ্ধির সর্বোচ্চ step সংখ্যা।          |
| `useExponentialBackoff` | `true`                           | পুনরাবৃত্ত ব্যর্থতায় cooldown exponentially বাড়বে কি না। |

Settings স্বাভাবিক settings store-এর মাধ্যমে persist হয় এবং resilience settings schema-এর মাধ্যমে validate হয়; card-টি `baseCooldownMs`/`maxCooldownMs`
(`maxCooldownMs ≥ baseCooldownMs` সহ) এবং `maxBackoffSteps`-এর সীমা নিয়ন্ত্রণ করে।

**সাকসেস-ডিকে রিকভারি:** recovery **শুধু** timer expiry-এর ওপর নির্ভরশীল নয়। একটি healthy
response model-এর failure count ধাপে ধাপে কমিয়ে দেয়, যাতে window-এর মাঝামাঝি recover করা model timer শেষ হওয়ার আগেই escalation বন্ধ করে (এবং clear হয়)। সফল
combo target-এ `open-sse/services/combo.ts`, `decayModelFailureCount()` কল করে
(`open-sse/services/accountFallback.ts`), যা সংরক্ষিত
`failureCount`-কে **অর্ধেক** করে (`Math.floor(failureCount / 2)`); এটি `0`-এ পৌঁছালে lockout
entry সম্পূর্ণভাবে মুছে ফেলা হয়। বিপরীত প্রক্রিয়ার `recordModelLockoutFailure()`
escalation window-এর মধ্যে ব্যর্থতা ঘটলে count বাড়ায় (এবং cooldown escalate করে)।
এই success-decay সাধারণ timer expiry-এর অতিরিক্ত — যেকোনো একটি path model-কে পুনরায় সক্রিয় করতে পারে।

**State:** lockout-গুলো **in-memory** রাখা হয় (প্রতি-process `Map`, যেখানে
`ModelLockoutEntry`-এর key হলো `provider:connectionId:model`, আর exact-scope lock-এর key
`provider:connectionId:exact:model`), DB-তে persist করা হয় না — restart হলে সেগুলো হারিয়ে যায়।
_settings_ persist করা হয়; সক্রিয় lockout _state_ ephemeral।

---

## 4. কোটা-শেয়ার সমসাময়িকতা নিয়ন্ত্রণ (v3.8.36)

সাবস্ক্রিপশন অ্যাকাউন্টগুলো (GLM, MiniMax ইত্যাদি) প্রায়ই কেবল ~1–3টি সমসাময়িক
অনুরোধ গ্রহণ করে; এর বেশি হলে 429 এবং কুলডাউন ট্রিগার হয়। **quota-share**
(`qtSd/…`) কম্বোতে এটি বিশেষভাবে তীব্র, কারণ সেখানে একাধিক API key একই upstream
অ্যাকাউন্ট শেয়ার করে। তিনটি স্তর একটি শেয়ার করা অ্যাকাউন্টকে অতিরিক্ত অনুরোধে প্লাবিত হওয়া থেকে রক্ষা করে।

### প্রতি-সংযোগ সমসাময়িকতা সীমা (`max_concurrent`)

প্রতিটি provider সংযোগ একটি `max_concurrent` সর্বোচ্চ সীমা ঘোষণা করতে পারে
(`provider_connections.max_concurrent`, যা connection modal / API / DB-তে সেট করা হয়)।
কোনো সীমা না রাখতে এটি খালি রাখুন। এটিই নিচের serialization
স্তরটি নিয়ন্ত্রণকারী একমাত্র সেটিং — এটিকে অ্যাকাউন্টের প্রকৃত সমসাময়িকতা অনুযায়ী সেট করুন (যেমন GLM ~1, MiniMax ~2)।

### প্রতি-মডেল সমসাময়িকতা সীমা (`modelConcurrency`)

একটি সংযোগ তার `rateLimitOverrides` map-এর মধ্যে অতিরিক্তভাবে প্রতিটি মডেলের জন্য নির্দিষ্ট সমসাময়িকতা সীমা
ঘোষণা করতে পারে:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

এটি connection modal-এ (**Rate limit overrides → Per-model
concurrency caps**, প্রতি লাইনে একটি `model=cap`) অথবা একই JSON কাঠামোসহ
`PATCH /api/providers/[id]`-এর মাধ্যমে সেট করুন। key-এর অর্থবিধি:

- **সংযোগব্যাপী বনাম মডেল-নির্দিষ্ট:** `maxConcurrent` শেয়ার করা
  সংযোগব্যাপী সর্বোচ্চ সীমা হিসেবেই থাকে। উভয়টি প্রযোজ্য হলে, উভয় gate একই composite gate-এ
  atomically অধিগ্রহণ করা হয়
  (`global → provider → account → model`); কার্যকর আচরণটি প্রযোজ্য সীমাগুলোর মধ্যে
  কঠোরতর সীমা অনুসরণ করে।
- **মডেল key-এর হুবহু মিল:** key হলো routing resolution-এর পর
  executor-এ পাঠানো model string — সাধারণত সরাসরি upstream model id
  (`glm-5`), client-side `provider/model` alias নয় (`zai/glm-5`,
  `glm-5`-এর সঙ্গে মেলে না)। মানগুলো হলো ধনাত্মক পূর্ণসংখ্যায় প্রকাশিত সমসাময়িক-অনুরোধের সর্বোচ্চ সীমা।
- **স্থানীয় সারিবদ্ধকরণ, কোনো আবিষ্কার নয়:** অতিরিক্ত অনুরোধ বিদ্যমান
  queue/timeout নিয়ম অনুযায়ী স্থানীয়ভাবে সারিতে অপেক্ষা করে (typed `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL` admission error)। OmniRoute upstream নীতি আবিষ্কার বা
  অনুমান করে না — এটি operator-এর কনফিগার করা হুবহু সীমাগুলোই প্রয়োগ করে।
  কোনো saturated model gate কখনো provider-কে নিষ্ক্রিয় করে না এবং কখনো
  স্থায়ী model lockout তৈরি করে না; upstream 429/cooldown/fallback আচরণ
  error backstop হিসেবেই বহাল থাকে।
- **প্রতি-সংযোগ, প্রতি-process scope:** সীমাগুলো প্রতিটি database connection-এর জন্য পৃথক
  এবং in-memory রাখা হয়, তাই একই upstream API key পুনরায় ব্যবহার করা দুটি connection
  একে অপরের সঙ্গে সমন্বয় করে না।
- **কনফিগার না করলে অপরিবর্তিত:** map বাদ দিলে (অথবা
  dashboard field খালি রাখলে) কোনো model gate যোগ হয় না। কোনো সার্বজনীন provider সীমা
  দাবি না করে উদাহরণ কনফিগারেশন:

```text
glm-5=1
glm-4.7=3
```

### কোটা-শেয়ার অনুরোধ serialization

কোনো quota-share dispatch যখন ধনাত্মক `max_concurrent` ঘোষণাকারী একটি connection-কে
লক্ষ্য করে, তখন সেই **account**-এ পাঠানো সমসাময়িক অনুরোধগুলো একটি
প্রতি-সংযোগ semaphore-এর (key `qsconn:<connectionId>`) মাধ্যমে serialize করা হয়: অতিরিক্ত অনুরোধ account-টিকে
প্লাবিত না করে **queue-তে অপেক্ষা করে**। এটি **fail-open** — কোনো saturated
queue বা timeout হলে dispatchযোগ্য অনুরোধ প্রত্যাখ্যান না করে slot ছাড়াই এগিয়ে যায়।
**Settings → Resilience → Quota-share per-connection
concurrency**-এ এটি চালু বা বন্ধ করুন (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ডিফল্টভাবে
চালু)। `max_concurrent` সীমা না থাকলে আচরণ অপরিবর্তিত থাকে।

> quota-share routing gate (`selectQuotaShareTarget`, DRR + P2C) নিজেও
> fail-open এবং at-cap connection-কে কেবল _কম অগ্রাধিকার দেয়_ — একটি
> single-connection pool-এ এটি hard-limit করতে পারে না, তাই এই semaphore-ই প্রকৃতপক্ষে
> অনুরোধের প্লাবন নিয়ন্ত্রণ করে।

### কম্বোর কুলডাউন-সচেতন retry

প্রতিটি combo strategy-এর ক্ষেত্রে (সক্রিয় থাকলে), কোনো অনুরোধ SHORT transient cooldown-এর জন্য
স্থায়ী 429 ফলাফল তৈরি করতে গেলে, 429 ফেরত দেওয়ার পরিবর্তে cooldown শেষ হওয়া পর্যন্ত অপেক্ষা করে
পুনরায় dispatch করা হয় — এটি multi-model combo-তে Gemini-শ্রেণির TPM/RPM window
(~60s retry-after) কভার করে, যেমন একটি 2-model combo-এর উভয় target-ই
প্রতি-মডেল rate limit-এ পৌঁছালে। এটি **Settings → Resilience**-এর
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) দ্বারা সীমাবদ্ধ। এটি কখনো `quota_exhausted`
(মধ্যরাত পর্যন্ত লক করা) অথবা auth/not-found কারণের জন্য অপেক্ষা করে না।

একই gate pre-dispatch পরিস্থিতিটিও (#16319) কভার করে: কোনো attempt করার আগেই
যখন combo-এর প্রতিটি target বাদ পড়ে, কারণ সংশ্লিষ্ট model একটি স্বল্পস্থায়ী
transient lockout-এ আছে, তখন zero-attempt path একই সীমার অধীনে lock শেষ হওয়া পর্যন্ত
অপেক্ষা করে এবং কোনো hint ছাড়া
`503 ALL_TARGETS_SKIPPED` উত্তর দেওয়ার পরিবর্তে পুনরায় dispatch করে। অপেক্ষা অনুমোদিত না হলে (সীমা, attempt বা budget
শেষ হয়ে গেলে, অথবা feature বন্ধ থাকলে), terminal response
`429 rate_limit_error`-এ উন্নীত হয় এবং সবচেয়ে আগে শেষ হতে যাওয়া
transient lock-এর `retry_after` / `reset_at` বহন করে; quota, auth এবং not-found lock-এর ক্ষেত্রে hint-বিহীন 503 বজায় থাকে।

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

## 5. রিকোয়েস্ট কিউ অ্যাডমিশন কন্ট্রোল (v3.8.49 · issue #6593)

**পরিধি**: স্থানীয়, প্রতি-provider+connection রেট-লিমিট কিউ (`open-sse/services/rateLimitManager.ts`,
যা Bottleneck দ্বারা সমর্থিত), উপরের তিনটি প্রক্রিয়ার এক স্তর নিচে।

**`maxWaitMs` কিউতে অপেক্ষার সীমা নির্ধারণ করে; `executionMaxWaitMs` এক্সিকিউশনের সীমা নির্ধারণ করে।**
দুটিকে ইচ্ছাকৃতভাবে আলাদা রাখা হয়েছে এবং কোনোটিই অন্যটিকে প্রভাবিত করে না।

`resilienceSettings.requestQueue.maxWaitMs` হলো **কিউতে অপেক্ষার বাজেট**: এটি
একটি provider স্লটের জন্য অপেক্ষা এবং তারপর QUEUED অবস্থায় থাকার সময়কে
অন্তর্ভুক্ত করে; জবটি QUEUED অবস্থা ছেড়ে এক্সিকিউশন শুরু করার মুহূর্তেই এর
টাইমার মুছে ফেলা হয় (`rateLimitManager.ts`, `wrappedFn`)। কোনো রিকোয়েস্ট এই
সীমা অতিক্রম করলে তা কখনোই upstream-এ পৌঁছায় না। ডিফল্ট 30000ms, যা
`src/lib/resilience/settings.ts`-এর `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` দ্বারা
সরবরাহ করা হয় এবং `tests/unit/ratelimit-admission-control-6593.test.ts` দ্বারা
স্থির করা আছে; ফলে এটি পরিবর্তন করলে এই অনুচ্ছেদটি নীরবে পুরোনো হয়ে থাকার
বদলে ওই টেস্টটি ব্যর্থ হবে।

`resilienceSettings.requestQueue.executionMaxWaitMs`-ই Bottleneck-এর কাছে জবের
`expiration` হিসেবে পাঠানো হয়, যার টাইমার dispatch-এর পরেই কেবল শুরু হয়। এটি
নিজস্ব upstream timeout নেই এমন executor-গুলোর জন্য একটি সুরক্ষা ব্যবস্থা,
এবং executor-এর নিজস্ব fetch-start timeout বেশি হলে এটিকে সেই মান পর্যন্ত
বাড়ানো হয়, যাতে এটি একটি সুস্থ in-flight response মাঝপথে বন্ধ করতে না পারে।
ডিফল্ট 600000ms (10 মিনিট)।

কিউ বাজেটকে `expiration`-এ পাঠানোর কারণেই আগে non-incremental gateway-গুলো
মাঝপথে বন্ধ হয়ে যেত—প্রথম byte পাঠানোর আগে সেগুলো বৈধভাবেই কয়েক মিনিট চলতে
পারে—এবং এ কারণেই expiration-কে `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) হিসেবে প্রকাশ করা হয়, যেখানে কিউ
বাজেট queue-timeout code বহন করে। যেকোনো একটি ওভাররাইড করুন
`RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (পরিবেশ চলক)
অথবা ড্যাশবোর্ডের (**Settings → Resilience**) মাধ্যমে। স্বাভাবিকীকরণের সময়
দুটিকেই 1ms–24h সীমার মধ্যে আবদ্ধ করা হয়।

**উভয়ের জন্য অগ্রাধিকার:** পরিবেশ চলকটি শুধু _ডিফল্ট_ মান সরবরাহ করে।
`resilienceSettings.requestQueue`-তে স্থায়ীভাবে সংরক্ষিত মান (ড্যাশবোর্ড / API
patch, `key_value`-এ সংরক্ষিত) এটিকে অগ্রাহ্য করে, এবং per-connection
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` সেটিকেও অগ্রাহ্য করে।
তাই ইতিমধ্যে স্থায়ীভাবে সংরক্ষিত মান আছে এমন deployment-এ পরিবেশ চলক সেট
করলে কিছুই পরিবর্তিত হয় না—পরিবর্তে স্থায়ীভাবে সংরক্ষিত সেটিংটি মুছুন বা
আপডেট করুন।

কিউতে অবস্থানের সময় `maxWaitMs` দ্বারা সীমাবদ্ধ; নিচের `maxQueueDepth` একই
সময়ে কতজন caller কিউতে থাকতে পারবে তা সীমাবদ্ধ করে।

**Body-তে উল্লিখিত retry: pacing বনাম lockout।** একটি 429 body নিজস্ব অপেক্ষার
সময় উল্লেখ করতে পারে (Gemini `RetryInfo.retryDelay`, "retry after Ns" টেক্সট),
যা `updateFromResponseBody` পড়ে। connection-এর `maxWaitMs`-এর মধ্যে থাকা
অপেক্ষা হলো pacing: limiter ওই সময়ের জন্য তার reservoir খালি করে এবং সেটি
পুনরায় পূর্ণ হলে কিউতে থাকা call-গুলো dispatch হয়। `maxWaitMs`-এর চেয়ে
দীর্ঘ অপেক্ষা কিউয়ের পক্ষে সহ্য করে বসে থাকার মতো নয়—Gemini নিঃশেষিত দৈনিক
কোটার জবাবে `retryDelay: "86399s"` দেয়। পুনর্গঠিত 429-এ relay করা
`Retry-After` (#16528) ইতিমধ্যেই fallback engine-কে ওই সময়ের জন্য model লক
করায়, কিন্তু এর জন্য limiter-কেও pause করলে key-তে আগেভাগে পৌঁছানো যেকোনো
call (যেমন resilience reset-এর পরে) সম্পূর্ণ `maxWaitMs` সময় ধরে আটকে থাকবে।
এমন অপেক্ষা যখন typed Google `RetryInfo` detail (`google_rpc_retry_info`
provenance) থেকে আসে এবং key-এর limiter ইতিমধ্যেই model অনুযায়ী scoped থাকে
(`getLimiterKey` দেখুন), তখন 429-টি ওই connection-এ model lockout-এ পরিণত হয়
(`open-sse/services/rateLimitManager/bodyRetryPause.ts`-এর
`lockModelForLongBodyRetry`, সর্বোচ্চ 24h), এবং limiter-টি unpaused অবস্থায়
রাখা হয়। Account selection `isModelLocked()`-এর মাধ্যমে ওই lock এড়িয়ে যায়,
এবং connection-এ pinned target-এর জন্য combo pre-dispatch gate-ও একই কাজ করে।
antigravity-তে, যার limiter প্রতি quota family অনুযায়ী, lock-টি তার অন্যান্য
quota lock-এর মতো নির্দিষ্ট model-এই প্রয়োগ হয়। alias-এর মাধ্যমে client-এর
চাওয়া নামটি ওই model-এ resolve হলে চাওয়া নামটিও lock করা হয়, কারণ ওই
check-গুলো requested name ব্যবহার করে; এটিকে নির্দিষ্টভাবেই lock করা হয়
(`lockExactModel`), তাই antigravity quota family বা codex scope অতিক্রমকারী
alias কখনো নিজেকে lock করে না। prose hint, untyped `retryDelay`, অথবা সম্পূর্ণ
connection দ্বারা shared limiter pause বজায় রাখে। 429 path এইমাত্র যে limiter
পুনর্গঠন করেছে সেটি pause হলে, pause শেষ হওয়ার আগেই যে caller-এর অবশিষ্ট
queue time শেষ হবে তাকে ওই সময় ধরে অপেক্ষা করানোর বদলে queue-timeout code
সহ তাৎক্ষণিকভাবে প্রত্যাখ্যান করা হয় (`checkLimiterPause`); রেকর্ড করা
সমাপ্তির সময়টি limiter তৈরি হওয়ার আগেই anchor করা হয়, যেখানে Bottleneck
তার refresh clock শুরু করে, এবং reservoir-এ পরবর্তী যেকোনো পরিবর্তন সেটি
ভুলে যায়। এটি `tests/unit/rate-limit-long-body-retry-lockout.test.ts` এবং
`tests/unit/rate-limit-body-retry-pause.test.ts` দ্বারা কভার করা হয়েছে।

**`maxQueueDepth` — ঐচ্ছিক admission cap (নতুন)।** `resilienceSettings.requestQueue.maxQueueDepth`
একটি provider+connection-এর জন্য একই সময়ে কতটি রিকোয়েস্ট কিউতে (এখনো
dispatch হয়নি) থাকতে পারবে তা সীমাবদ্ধ করে। কিউতে ইতিমধ্যেই
`maxQueueDepth`-সংখ্যক রিকোয়েস্ট থাকলে, নতুন রিকোয়েস্টটি typed
`code: "RATE_LIMIT_QUEUE_FULL"` error দিয়ে দ্রুত প্রত্যাখ্যান করা হয়,
`limiter.schedule()`-এ পৌঁছানোরও **আগে**—তাই প্রত্যাখ্যানটি কম ব্যয়বহুল এবং
ওই রিকোয়েস্টের জন্য যেকোনো downstream prompt-compression / translation কাজের
আগেই ঘটে। ডিফল্ট `0` = নিষ্ক্রিয়, যা বিদ্যমান সীমাহীন-কিউ আচরণ বজায় রাখে;
সীমা 0–100000। `RATE_LIMIT_MAX_QUEUE_DEPTH` (পরিবেশ চলক) অথবা
`resilienceSettings.requestQueue.maxQueueDepth` (ড্যাশবোর্ড/API patch) দিয়ে
ওভাররাইড করুন।

admission check-টি নিজেই একটি pure function
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), তাই
বাস্তব Bottleneck limiter ছাড়াই এটিকে unit test করা যায়।

> যে RFC-টি #6593 খুলেছিল, সেটিতে একটি `bypassCompressionOnRateLimit`
> ফ্ল্যাগেরও প্রস্তাব করা হয়েছিল। এই রিপোর `open-sse/services/compression/` পাইপলাইনটি
> বহির্গামী LLM অনুরোধে প্রম্পট/কনটেক্সট কম্প্রেশনের জন্য (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy` ব্লকের আশেপাশে),
> সংশ্লেষিত 429 বডিতে HTTP রেসপন্স কম্প্রেশনের জন্য নয়—তাই আক্ষরিক বাইপাস ফ্ল্যাগের
> সঙ্গে মেলে এমন কোনো কোড পাথ নেই। সেই প্রম্পট-কম্প্রেশন ধাপটিও বর্তমানে অনুরোধ
> পাইপলাইনে `withRateLimit()`-এর _আগে_ চলে, তাই কিউ-পূর্ণ প্রত্যাখ্যানের ক্ষেত্রে
> এটি এড়িয়ে যেতে ধাপগুলোর ক্রমবিন্যাস পরিবর্তন করা এই ইস্যুর পরিধির তুলনায় আলাদা
> ও বড় একটি পরিবর্তন; এখানে এটি ইচ্ছাকৃতভাবে **বাস্তবায়ন করা হয়নি**, এবং CPU
> সাশ্রয়ের সুবিধা ক্রমবিন্যাস পরিবর্তনের ঝুঁকির তুলনায় যথেষ্ট হলে পরবর্তী কাজ
> হিসেবে রেখে দেওয়া হয়েছে।

### রেট-লিমিট স্বয়ংক্রিয়-সক্রিয়করণ সুরক্ষা ব্যবস্থা ও সংযোগ সুরক্ষা (`rateLimitProtection`)

**স্বয়ংক্রিয়-সক্রিয়করণ সুরক্ষা ব্যবস্থা** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, ডিফল্ট `true`):
ডিফল্টভাবে, OmniRoute সব সক্রিয় API-কী প্রোভাইডার সংযোগের (`getProviderCategory(provider) === "apikey"`) জন্য রেট-লিমিট কিউ সুরক্ষা স্বয়ংক্রিয়ভাবে সক্রিয় করে। এটি নিশ্চিত করে যে রেট-সংবেদনশীল আপস্ট্রিম API কীগুলোর দিকে আসা অনুরোধগুলো আপস্ট্রিমে হঠাৎ প্রচুর 429 ত্রুটি সৃষ্টি করার পরিবর্তে Bottleneck-এর মাধ্যমে কিউবদ্ধ ও থ্রটল করা হয়। সুরক্ষা ব্যবস্থাটি `RATE_LIMIT_AUTO_ENABLE` এনভায়রনমেন্ট ভেরিয়েবলের মাধ্যমে ওভাররাইড করা যায় (`false`/`0`/`off` নিষ্ক্রিয় করে, `true`/`1`/`on` জোরপূর্বক সক্রিয় করে), যা সংরক্ষিত ড্যাশবোর্ড সেটিংয়ের (**Settings → Resilience** / `PATCH /api/resilience`) চেয়ে অগ্রাধিকার পায়।

**প্রতি-সংযোগ `rateLimitProtection`-এর অর্থ:**
প্রোভাইডার সংযোগগুলোর `rateLimitProtection` বুলিয়ান ফিল্ডের মাধ্যমে প্রতি-সংযোগ রেট-লিমিট সুরক্ষা ট্র্যাক করা হয় (SQLite-এ `rate_limit_protection` হিসেবে সংরক্ষিত):

- **স্পষ্টভাবে চালু (`rateLimitProtection === true`)**: প্রোভাইডারের বিভাগ বা স্বয়ংক্রিয়-সক্রিয়করণ সুরক্ষা ব্যবস্থা চালু আছে কি না, তা নির্বিশেষে এই সংযোগের জন্য রেট-লিমিট সুরক্ষা স্পষ্টভাবে সক্রিয় থাকে।
- **স্পষ্টভাবে বন্ধ (`rateLimitProtection === false`)**: স্পষ্ট সুরক্ষা নিষ্ক্রিয় করে, কিন্তু কোনো সক্রিয় API-কী সংযোগকে বৈশ্বিক স্বয়ংক্রিয়-সক্রিয়করণ সুরক্ষা ব্যবস্থার বাইরে **রাখে না**। `reconcileEnabledConnections`-এ (`open-sse/services/rateLimitManager.ts`) `false` এবং `undefined` সমতুল্য: কেবল `rateLimitProtection === true`-কেই স্পষ্ট ওভাররাইড হিসেবে বিবেচনা করা হয়। `rateLimitProtection` যদি `false` হয় (অথবা সেট করা না থাকে), তবুও একটি সক্রিয় API-কী সংযোগ স্বয়ংক্রিয়-সক্রিয়করণ শর্তের সঙ্গে মেলে এবং রেট-লিমিট দ্বারা সুরক্ষিত থাকে।
- **প্রতি-সংযোগ অপ্ট-আউট নেই**: অন্যগুলোর জন্য স্বয়ংক্রিয়-সক্রিয়করণ চালু রেখে কোনো অপারেটর বর্তমানে "এই একক সক্রিয় API-কী সংযোগটি অবশ্যই রেট-লিমিট কিউ সুরক্ষা ছাড়াই চলবে"—এটি নির্ধারণ করতে পারেন না। API-কী সংযোগগুলোকে রেট-লিমিট কিউ ছাড়া সম্পূর্ণভাবে চালাতে হলে সুরক্ষা ব্যবস্থাটি বৈশ্বিকভাবে বন্ধ করতে হবে (`RATE_LIMIT_AUTO_ENABLE=false` অথবা `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`)।

**সমর্থিত রাইট পাথ:**

- **`POST /api/rate-limits`**: কোনো সংযোগের `rateLimitProtection` টগল করার জন্য সমর্থিত ম্যানেজমেন্ট রাইট পাথ (`{ connectionId: string, enabled: boolean }`)। এটিকে `enabled: true` দিয়ে কল করলে স্পষ্ট সুরক্ষা চালু হয়; `enabled: false` দিয়ে কল করলে স্পষ্ট সুরক্ষা অপসারিত হয় (যদিও স্বয়ংক্রিয়-সক্রিয়করণ চালু থাকলে সক্রিয় API-কী সংযোগগুলো বৈশ্বিক সুরক্ষা ব্যবস্থার আওতায় থাকে)।
- **`PUT /api/providers/[id]`**: ইচ্ছাকৃতভাবে `rateLimitProtection` গ্রহণ বা পরিবর্তন করে **না** (#11278)। `PUT /api/providers/[id]`-এর মাধ্যমে প্রোভাইডার সংযোগের মেটাডেটা আপডেট করলে সংরক্ষিত রেট-লিমিট সুরক্ষার অবস্থা কখনোই পরিবর্তিত হবে না।

---

## 6. ধীর-স্ট্রিম থ্রুপুট ওয়াচডগ (#9709)

ঐচ্ছিক `resilienceSettings.streamRecovery.throughputWatchdog` গার্ড এমন একটি আপস্ট্রিম শনাক্ত করে, যা এখনও চাঙ্ক পাঠাচ্ছে কিন্তু কনফিগার করা ব্যবহারযোগ্য-আউটপুট হারের চেয়ে কম হারে অ্যাসিস্ট্যান্ট আউটপুট তৈরি করছে। এটি ইচ্ছাকৃতভাবে আইডল টাইমআউট থেকে স্বতন্ত্র: হার্টবিট ও মেটাডেটা কোনো টাইমারই রিসেট করে না এবং অগ্রগতি হিসেবেও গণ্য হয় না। এটি কঠোর অ্যাটেম্পট ডেডলাইন (#9153) থেকেও স্বতন্ত্র, যা আউটপুটের গুণমান নির্বিশেষে একটি পরম সুরক্ষা-সীমা হিসেবে বহাল থাকে।

ওয়াচডগ অ্যাবর্ট করতে পারার আগে একটি ওয়ার্ম-আপ সময়কাল এবং তার পর একটি সম্পূর্ণ রোলিং উইন্ডো প্রয়োজন। এটি Chat Completions এবং Responses API আউটপুট ইভেন্ট থেকে টেক্সট ডেল্টা গণনা করে (UTF-8 বাইটের একটি রক্ষণশীল প্রক্সি), শুধুমাত্র-ইউসেজ ও ফাঁকা ইভেন্ট উপেক্ষা করে এবং টুল-কল বা রিজনিং ইভেন্ট চলমান থাকা অবস্থায় মূল্যায়ন স্থগিত রাখে। এটি ডিফল্টভাবে নিষ্ক্রিয় এবং `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` দিয়ে সক্রিয় করা যায়; উইন্ডো, ওয়ার্ম-আপ, ন্যূনতম হার এবং ন্যূনতম পরিমাপযোগ্য আউটপুট স্বাভাবিক রেজিলিয়েন্স-সেটিংস নর্মালাইজেশন স্তর দ্বারা সীমাবদ্ধ থাকে।

সক্রিয় থাকলে, ওয়াচডগ অ্যাবর্ট কেবল সক্রিয় আপস্ট্রিম অ্যাটেম্পটের ওপর প্রয়োগ করা হয়। ক্লায়েন্টের কাছে দৃশ্যমান কোনো বাইট পাঠানোর আগে, বিদ্যমান একই-অ্যাকাউন্ট আর্লি-রিকভারি পাথ অ্যাটেম্পটটি পুনরায় খুলতে পারে। কমিটের পরে, স্ট্রিম কখনোই নির্বিচারে রিপ্লে করা হয় না; কেবল বিদ্যমান নিরাপদ মিড-স্ট্রিম কন্টিনিউয়েশন কনট্র্যাক্ট একটি সাফিক্স জোড়া দিতে পারে। ফাইনালাইজেশন একবারই সম্পন্ন হয়, তাই ইউসেজ অ্যাকাউন্টিং ও সেমাফোর রিলিজের পুনরাবৃত্তি হয় না।

---

## 7. আপস্ট্রিম স্ট্যাটাস পুনর্বিবৃতি (ভুলভাবে উল্লেখ করা কোটা এরর)

**পরিধি:** এমন একটি আপস্ট্রিম গেটওয়ে, যা ভুল HTTP স্ট্যাটাস দিয়ে সাময়িক কোটা নিঃশেষ হওয়ার কথা জানায়।

**উদ্দেশ্য:** শ্রেণিবিন্যাসের আগে একটি বিভ্রান্তিকর স্ট্যাটাস সংশোধন করা, যাতে ডাউনস্ট্রিম কনজিউমাররা (ফলব্যাক ইঞ্জিন, কম্বো অ্যাগ্রিগেশন, ক্লায়েন্ট-মুখী রেসপন্স) ব্যর্থতার প্রকৃত পুনঃচেষ্টাযোগ্য প্রকৃতি দেখতে পায়।

কিছু গেটওয়ে একটি পুনঃচেষ্টার অযোগ্য HTTP স্ট্যাটাস দিয়ে সাময়িক কোটা নিঃশেষ হওয়ার সংকেত দেয়। `agentrouter.org` স্ট্যান্ডার্ড `429`-এর পরিবর্তে একটি চীনা বডি (`用户额度不足` / `额度不足`) সহ `403` (কখনো কখনো `400`) ফেরত দেয়। Claude Code-এর মতো ক্লায়েন্ট `403`-কে স্থায়ী হিসেবে বিবেচনা করে এবং সেশন অ্যাবর্ট করে; আর সংশোধন না করা হলে ফলব্যাক ইঞ্জিন এটিকে কোটা ইভেন্টের পরিবর্তে `AUTH_ERROR` হিসেবে শ্রেণিবদ্ধ করবে।

**বাস্তবায়ন:**

- রেজিস্ট্রি + ম্যাচার: `open-sse/config/upstreamStatusRestatement.ts` — প্রোভাইডার-পিছু নিয়মের একটি তালিকা (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), যা `applyStatusRestatement()`-এর মাধ্যমে ম্যাচ করা হয়।
- কল সাইট: `open-sse/handlers/chatCore.ts`-এর `providerFailure:` ব্লক
  (প্রায় 3654 নম্বর লাইনে), যেখানে `parseUpstreamError()` একটি এরর HTTP স্ট্যাটাসযুক্ত (`!providerResponse.ok`) আপস্ট্রিম রেসপন্স পার্স করার ঠিক পরে এবং যেকোনো শ্রেণিবিন্যাস চালানোর আগে এটি থাকে, ফলে প্রত্যেক ডাউনস্ট্রিম কনজিউমার সংশোধিত স্ট্যাটাসটি দেখতে পায়। একটি `200` SSE স্ট্রিমের ভেতরে এমবেড করা এররগুলো একটি পৃথক, পরবর্তী স্ট্রিম-পার্সিং পাথ অনুসরণ করে এবং আজ এই হুক দ্বারা **কভার করা হয় না** — এটি একটি পরিচিত সীমাবদ্ধতা, যা agentrouter-এর ভুল স্ট্যাটাসের জন্য এখনও প্রয়োজন হয়নি (কারণ সেটি এরর HTTP স্ট্যাটাস হিসেবেই প্রকাশ পায়)।
- পুনঃচেষ্টার যোগ্যতা: `429`, `RETRY_AFTER_ELIGIBLE_STATUSES`-এ রয়েছে
  (`open-sse/services/combo/unavailableRetryGate.ts`), তাই পুনর্বিবৃত একটি এরর অকার্যকর `403` হিসেবে প্রকাশিত হওয়ার পরিবর্তে একটি প্রকৃত পুনঃচেষ্টা উইন্ডো বহন করে।
- সিনথেটিক `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) কেবল পুনর্বিবৃত রেসপন্সটি **ক্লায়েন্টকে** যা জানায়; এটি নিজে কানেকশনের অভ্যন্তরীণ কুলডাউন/লকআউটের সময়কাল নয় — সেটি আলাদাভাবে নির্ধারিত হয় পুনর্বিবৃত এররটি বাস্তবে যে মেকানিজম পরিচালনা করে তার দ্বারা (Connection Cooldown-এর ক্রমবর্ধমান ব্যাকঅফ, §2, API-কী প্রোভাইডারের জন্য বেস `3s`; অথবা agentrouter-এর মতো প্রতি-মডেল-কোটা প্রোভাইডারের জন্য Model Lockout, §3)। ক্লায়েন্টকে বিজ্ঞাপিত 60s উইন্ডোর আগেই রাউটার অভ্যন্তরীণভাবে পুনঃচেষ্টার যোগ্য হয়ে উঠতে পারে — এটি ইচ্ছাকৃত হেডরুম, কোনো বাগ নয়।

স্থায়ী এররগুলো (agentrouter-এর `无权访问模型` — এই মডেল অ্যাক্সেস করার অনুমতি নেই) কখনোই পুনর্বিবৃত হয় না: `textMarkers` ম্যাচ করলেও `excludeMarkers` নিয়মটি ভেটো করে, ফলে এররটি তার মূল স্ট্যাটাস ধরে রাখে এবং কোনো কিছুই অনন্তকাল সেটি পুনঃচেষ্টা করে না। সংশ্লিষ্ট প্রোভাইডার শ্রেণিবিন্যাসের নিয়মটি
(`open-sse/config/providerErrorRules.ts`-এর `agentrouter-model-access-denied`:
`reason: "auth_error"`, `scope: "model"`, ঘোষিত বেস কুলডাউন `6h`) `checkFallbackError` (`open-sse/services/accountFallback.ts`) দ্বারা জেনেরিক apikey-ক্যাটাগরির `FORBIDDEN` আর্লি-রিটার্নের _আগে_ বিবেচিত হয়, যা `honorsRuleLockScope(provider)` দ্বারা নিয়ন্ত্রিত (#10334 — বর্তমানে `providerErrorRules.ts`-এর `HONORS_RULE_LOCK_SCOPE_PROVIDERS` অ্যালাউলিস্টের মাধ্যমে শুধু agentrouter-এর জন্য প্রযোজ্য)। নিয়মটির ঘোষিত 6h কুলডাউন `fallbackResult.baseCooldownMs` হিসেবে প্রবাহিত হয়, কিন্তু এটি এখনও আগে থেকে বিদ্যমান প্রতি-মডেল-কোটা লকআউট পাথেই (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, কুলডাউনের উৎস ছাড়া #10334 দ্বারা অপরিবর্তিত) প্রবেশ করে: অন্য সব মডেল লকআউটের মতো এটিকেও অপারেটরের `mlSettings.maxCooldownMs` (ডিফল্ট `1_800_000ms` / 30min) পর্যন্ত কমিয়ে সীমাবদ্ধ করা হয় এবং _পারসিস্ট করা লকআউটের কারণ_ নিয়মটির `"auth_error"` নয়, বরং আগে থেকে বিদ্যমান হার্ডকোড করা `"forbidden"`-ই থাকে — শুধু কুলডাউনের সময়কাল শুরু থেকে শেষ পর্যন্ত মান্য করা হয়, কারণের স্ট্রিংটি নয়। কানেকশনটি নিজে সক্রিয় থাকে; একই কানেকশনের সিবলিং মডেলগুলো প্রভাবিত হয় না।

পুনর্ব্যক্ত করা কোটা ত্রুটি (`额度不足`) প্রোডাকশনে একটি প্রোভাইডার নিয়মের সঙ্গে মেলে
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, যার নিজস্ব কোনো ঘোষিত কুলডাউন নেই — পারসিস্টেন্স স্তরের
স্কেল করা ব্যাকঅফ ডিফল্ট প্রযোজ্য হয়)। #10334 থেকে,
`ProviderErrorRuleMatch`-এর `scope` শুরু থেকে শেষ পর্যন্ত ব্যবহৃত হয়, তবে
**শুধু** `HONORS_RULE_LOCK_SCOPE_PROVIDERS` অ্যালাওলিস্টে থাকা প্রোভাইডারগুলোর
জন্য (`providerErrorRules.ts` — বর্তমানে শুধু `"agentrouter"`,
`honorsRuleLockScope()`-এর মাধ্যমে গেট করা)। অন্য প্রতিটি প্রোভাইডারের জন্য
`scope` আগের মতোই কেবল তথ্যমূলক থাকে, ঠিক #10334-এর আগের আচরণের মতো।
`checkFallbackError` মিলে যাওয়া নিয়মটির স্কোপকে
`fallbackResult.ruleScope` হিসেবে প্রকাশ করে;
`isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) হলো শেয়ার করা গার্ড, যা নিশ্চিত করে যে একটি
`ruleScope`-কে সত্যিই সংযোগব্যাপী, স্বয়ংক্রিয়ভাবে পুনরুদ্ধারযোগ্য সংকেত হিসেবে
সম্মান করা নিরাপদ (স্কোপ `"connection"`, কারণ `quota_exhausted`, কখনোই
`permanent` নয়, কখনোই `creditsExhausted` নয় — ভবিষ্যতের কোনো নিয়মে
`"connection"` স্কোপকে একটি স্থায়ী অ্যাকাউন্ট অবস্থার সঙ্গে জোড়া লাগানোর
বিরুদ্ধে একটি সুরক্ষা)। দুইজন কনজিউমার এটি কল করে:

- **পারসিস্টেন্স** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  পাসথ্রু-প্রোভাইডারের **প্রতি-মডেল** লকআউট শাখায় যাওয়ার পরিবর্তে
  (agentrouter হলো `passthroughModels: true` → `hasPerModelQuota()`
  `true` রিটার্ন করে), এটি একটি **সাময়িক সংযোগ কুলডাউন** প্রয়োগ করে —
  `testStatus: "unavailable"` + `rateLimitedUntil`, কখনোই কোনো টার্মিনাল স্ট্যাটাস
  (`credits_exhausted`/`banned`/`expired`) নয় — ফলে কুলডাউনের মেয়াদ শেষ হলে
  সংযোগটি নিজে থেকেই পুনরুদ্ধার হয়, ম্যানুয়াল ক্রেডেনশিয়াল রিসেটের প্রয়োজন
  হয় না। `disableCooling: true`-সহ সংযোগগুলোর জন্য এটি এড়িয়ে যাওয়া হয়
  (#2997): সেই অপ্ট-আউটের ক্ষেত্রে পরিবর্তে প্রতি-মডেল লকআউট প্রযোজ্য হয়
  (এটি একটি নথিভুক্ত আপস — শাখাটির ওপরের কোড মন্তব্য দেখুন)।
- **একই-রিকোয়েস্ট কম্বো রাউটিং** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): একই গার্ড সংযোগটিকে
  ইন-মেমরি `exhaustedConnections` সেটে চিহ্নিত করে, যার কী
  `${provider}:${connectionId}`। এটি শুধু অবশিষ্ট কোনো SAME-REQUEST
  টার্গেটকে এড়িয়ে যায়, যার _নিজস্ব টার্গেট অবজেক্টেই ইতিমধ্যে ঠিক সেই
  `connectionId` রয়েছে_ (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` থাকে `exhaustedConnections` লুকআপের আগে) — একটি সাধারণ
  মডেল-লিস্ট কম্বোতে, যেখানে সিবলিং টার্গেটগুলোর নিজস্ব কোনো পিন করা
  `connectionId` থাকে না এবং প্রতিটি ডিসপ্যাচে রেসপন্সের
  `X-OmniRoute-Selected-Connection-Id` হেডার থেকে একটি আইডি রিজলভ করা হয়,
  সেই কী কখনোই মেলে না। সেই সাধারণ ক্ষেত্রে, অবশিষ্ট কোনো লেগকে সদ্য নিঃশেষিত
  অ্যাকাউন্টটি পুনরায় ব্যবহার করা থেকে রক্ষার প্রকৃত ব্যবস্থা এই Set **নয়** —
  সেটি হলো ওপরের পারসিস্টেন্স স্তর (সংযোগটির `rateLimitedUntil` এখন ভবিষ্যতের
  একটি সময় নির্দেশ করে), যার সঙ্গে একই গার্ডটি ব্যর্থতার জন্য
  `transientRateLimitedProviders` দমন করে (দেখুন "দুই-পর্যায়ের নকশা" এবং
  `targetExhaustion.ts`-এর `isAgentrouterConnectionQuotaScope` শাখায় থাকা
  কোড মন্তব্য): ওই Set-টি অচিহ্নিত রেখে দিলে, প্রোভাইডারের অবশিষ্ট লেগগুলোর
  জন্য `combo.ts`-এর `allowRateLimitedConnection` জোরপূর্বক অনুমোদন
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) সক্রিয় হয় **না**,
  ফলে ক্রেডেনশিয়াল নির্বাচনের `rateLimitedUntil` ফিল্টার
  (`src/sse/services/auth.ts:1238`) স্বাভাবিকভাবে মানা হয় এবং একটি অবশিষ্ট
  লেগ হয় অন্য কোনো, এখনও-যোগ্য agentrouter সংযোগ বেছে নেয়, নয়তো কোনো
  ক্রেডেনশিয়াল উপলভ্য না থাকায় ব্যর্থ হয় — এই শাখা যে সংযোগটিকে সদ্য
  কুলডাউনে রেখেছে, সেটিতে জোর করে ফিরে যায় না।

### দুই-পর্যায়ের নকশা: স্ট্যাটাস পুনর্ব্যক্তকরণ, তারপর শ্রেণিবিন্যাস

স্ট্যাটাস পুনর্ব্যক্তকরণ (`upstreamStatusRestatement.ts`) এবং প্রোভাইডার
শ্রেণিবিন্যাসের নিয়ম (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) পৃথক রেজিস্ট্রি; উভয়ই প্রোভাইডার আইডি ও টেক্সট
মার্কারকে কী হিসেবে ব্যবহার করে, তবে তারা ভিন্ন স্থানে চলে এবং ভিন্ন উদ্দেশ্য
পূরণ করে: পুনর্ব্যক্তকরণ `chatCore.ts`-এর শুরুর দিকেই HTTP স্ট্যাটাস পুনর্লিখন
করে; শ্রেণিবিন্যাসের নিয়মগুলো `checkFallbackError()`-এর ভেতরে
(`open-sse/services/accountFallback.ts`) ফলব্যাক `reason` এবং লক `scope`
(`model` / `provider` / `connection`) নির্ধারণ করে।

শ্রেণিবিন্যাসের নিয়মগুলো শুধু `providerErrorRules.ts`-এর
`FULL_TEXT_RULE_PROVIDERS` অ্যালাওলিস্টে থাকা প্রোভাইডারগুলোর জন্যই সম্পূর্ণ
ত্রুটির **টেক্সট** দেখতে পায় (`额度不足`-এর মতো বডি মার্কার মেলানোর জন্য এটি
প্রয়োজন) — বর্তমানে শুধু `"agentrouter"`। অন্য প্রতিটি **বিল্ট-ইন ক্যাটালগ**
প্রোভাইডারের ক্ষেত্রে, `checkFallbackError` `getProviderErrorRuleMatch`-কে
শুধু স্ট্রাকচার্ড ত্রুটি (`{code, type}`) দেয়, যা হেডার/স্ট্যাটাস/কোড-ভিত্তিক
নিয়মের জন্য যথেষ্ট, কিন্তু বডি-টেক্সট মার্কার দেখতে পায় না।
`resolveRuleMatchBody()` হেল্পারটি এই নির্বাচন সম্পন্ন করে: অ্যালাওলিস্টভুক্ত
প্রোভাইডারের জন্য সম্পূর্ণ ত্রুটির টেক্সট, অন্যথায় স্ট্রাকচার্ড ত্রুটি। কোনো
**বিল্ট-ইন** প্রোভাইডারকে `FULL_TEXT_RULE_PROVIDERS`-এ যোগ করা হলো স্পষ্ট
প্রতি-প্রোভাইডার অপ্ট-ইন — এটি রাখা হয়েছে যাতে তালিকায় না থাকা প্রতিটি
প্রোভাইডারের ডিফল্ট পাথ বাইট-ফর-বাইট অপরিবর্তিত থাকে।

কোনো নিয়মের `scope` (`model` / `provider` / `connection`) হলো
`FULL_TEXT_RULE_PROVIDERS` থেকে পৃথক একটি অপ্ট-ইন: `checkFallbackError` এটিকে
শুধু `fallbackResult.ruleScope` হিসেবে প্রকাশ করে, এবং ডাউনস্ট্রিম কনজিউমাররা
একই ফাইলের `HONORS_RULE_LOCK_SCOPE_PROVIDERS` অ্যালাওলিস্টে থাকা
প্রোভাইডারগুলোর ক্ষেত্রেই এটিকে নিছক তথ্যমূলক লেবেলের চেয়ে বেশি কিছু হিসেবে
সম্মান করে (`honorsRuleLockScope()`-এর মাধ্যমে গেট করা — বর্তমানে শুধু
`"agentrouter"`)। কোনো প্রোভাইডার ওই অ্যালাওলিস্টে থাকার পর
`scope: "connection"` ম্যাচটি বাস্তবে কী করে, তা জানতে ওপরের "পুনর্ব্যক্ত করা
কোটা ত্রুটি" অংশটি দেখুন।

**#11104 — অপারেটর-ঘোষিত নিয়ম উভয় allowlist-ই এড়িয়ে যায়।** কোনো অপারেটর
এই ফাইলটি সম্পাদনা না করেই `settings.providerErrorRules`-এর মাধ্যমে রানটাইমে
প্রতি-provider নিয়ম ঘোষণা করতে পারেন
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)।
কোনো অপারেটর নিয়মকে
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS`-এর পেছনে গেট করা — built-in catalog নিয়মগুলোর **ডিফল্ট** আচরণ সুরক্ষিত রাখার উদ্দেশ্যে তৈরি allowlist —
ইতিমধ্যে সেখানে তালিকাভুক্ত provider ছাড়া অন্য সব provider-এর জন্য
settings প্রক্রিয়াটিকে অকার্যকর করে দেবে, কারণ নিয়ম ঘোষণা করাটিই ইতিমধ্যে
অপারেটরের স্পষ্ট opt-in। `resolveRuleMatchBody()` এবং `honorsRuleLockScope()`
উভয়ই প্রথমে `hasOperatorRuleForProvider()` পরীক্ষা করে: কোনো provider-এর
অপারেটর নিয়ম থাকলে সেটি raw error text পায় এবং তার ঘোষিত `scope` সম্মানিত হয়,
provider-টি কোনো একটি allowlist-এ আছে কি না তা নির্বিশেষে।

**পরিচিত ঘাটতি — HTTP 400-এর ক্ষেত্রে `providerRuleRegistry` কখনোই পরামর্শ করা হয় না।**
`checkFallbackError`-এর `BAD_REQUEST` branch সম্পূর্ণভাবে নিজস্ব pattern array
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` ইত্যাদি,
`accountFallback.ts`-এ) ব্যবহার করে status 400 শ্রেণিবদ্ধ করে এবং তার আগেই return করে,
ফলে উপরের `configuredRule`/`getProviderErrorRuleMatch` branch-এ পৌঁছানো হয় না।
`status: 400`-সহ কোনো built-in catalog নিয়ম (বা অপারেটর নিয়ম)
সিনট্যাক্টিক্যালি বৈধ হলেও কখনোই কার্যকর হবে না। বর্তমানে কোনো বিদ্যমান নিয়ম
400-কে লক্ষ্য করে না, তাই production-এ কিছুই প্রভাবিত হচ্ছে না — তবে ভবিষ্যতের
কোনো 400 নিয়মের জন্য প্রথমে এই branch পরিবর্তন করতে হবে, যা একটি নিয়ম যোগ করার
চেয়ে বড় পরিবর্তন (এটি ইতিমধ্যে pattern-array আচরণের ওপর নির্ভরশীল প্রতিটি
provider-এর জন্য 400-কে পুনঃশ্রেণিবদ্ধ করে) এবং একক-provider নিয়ম সংযোজনের
পরিধির বাইরে।

### ভুল quota জানানো নতুন gateway যোগ করা

1. `statusRestatementRegistry`-তে একটি নিয়মের array নিবন্ধন করুন
   (`open-sse/config/upstreamStatusRestatement.ts`)। `textMarkers`-কে
   provider-নির্দিষ্ট রাখুন; `CREDITS_EXHAUSTED_SIGNALS`-এর সঙ্গে সংঘর্ষ হয় এমন
   generic English phrase কখনো পুনর্ব্যবহার করবেন না
   (`open-sse/services/accountFallback.ts`)।
2. সঠিক lock scope বেছে নিতে ঐচ্ছিকভাবে
   `open-sse/config/providerErrorRules.ts`-এ (`providerRuleRegistry`)
   classification নিয়ম নিবন্ধন করুন (account-wide quota-এর জন্য `connection`,
   per-model error-এর জন্য `model`)। যেসব provider-এর নিয়মে সম্পূর্ণ error text
   (body marker) প্রয়োজন, কেবল তাদের ক্ষেত্রেই এই ধাপটি production-এ কার্যকর হয়:
   একই ফাইলের `FULL_TEXT_RULE_PROVIDERS`-এ provider id যোগ করুন — অন্যথায়
   `checkFallbackError` নিয়মটিকে কেবল structured `{code, type}` error-ই দেয় এবং
   কোনো body-text নিয়ম কখনো live traffic-এর সঙ্গে match করবে না।
   যেসব নিয়ম কেবল `status`/`headers`-এর ওপর match করে (যেমন Opencode বা
   Minimax-এর), সেগুলোর এই opt-in প্রয়োজন নেই। আলাদাভাবে, যদি নিয়মটি
   `scope: "connection"` ঘোষণা করে এবং উদ্দেশ্যটি কেবল একটি informational label
   নয়, বরং প্রকৃত connection-wide cooldown এবং একই request-এ combo skip হয়,
   তবে একই ফাইলের `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-এ provider id যোগ করুন —
   এটিই `markAccountUnavailable()`-এ (`src/sse/services/auth.ts`) এবং
   `applyComboTargetExhaustion()`-এ
   (`open-sse/services/combo/targetExhaustion.ts`)
   `isAgentrouterConnectionQuotaScope()`-ধরনের consumption গেট করে; এটি ছাড়া
   `scope` এখনও `fallbackResult.ruleScope`-এর মধ্য দিয়ে প্রবাহিত হয়, কিন্তু
   কোনো কিছুই তার ভিত্তিতে কাজ করে না।
3. `tests/unit/upstream-status-restatement.test.ts` এবং
   `tests/unit/agentrouter-error-rules.test.ts` অনুসরণ করে unit test যোগ করুন
   (not-permanent / not-creditsExhausted guard-সহ এবং — provider-এর allowlist
   প্রয়োজন হলে — এমন একটি test-সহ যা নিশ্চিত করে যে `resolveRuleMatchBody()`
   কেবল সেই provider-এর জন্য full text return করে)।

`chatCore.ts`, `classifyError` বা combo-তে কোনো পরিবর্তন প্রয়োজন নেই।

#### Egress-bucketed lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`-এ থাকা provider-গুলোকে (opencode family)
IP-bucketed upstream হিসেবে বিবেচনা করা হয় (opencode free tier account-bucketed
নয়, বরং IP-bucketed — #9611 দেখুন): `quota_exhausted` **অথবা**
`rate_limit_exceeded` হিসেবে শ্রেণিবদ্ধ একটি status-429, rotation সেগুলো চেষ্টা
করার আগেই, ব্যর্থ connection-এর সর্বশেষ পরিচিত egress IP-এর সঙ্গে মিলে যায় এমন
প্রতিটি allowlisted-family connection-কে cooldown-এ পাঠায়
— ফলে নিশ্চিতভাবে ব্যর্থ হবে এমন N-1টি upstream call এড়ানো যায় (#10460/#10525-এর
মতো একই বিন্যাস)। `rate_limit_exceeded` ইচ্ছাকৃতভাবে অন্তর্ভুক্ত করা হয়েছে:
`markAccountUnavailable` path-এ opencode-নির্দিষ্ট নিয়মগুলো কখনো match করে না
(`checkFallbackError`-কে কোনো headers/body দেওয়া হয় না, opencode
`FULL_TEXT_RULE_PROVIDERS`-এ নেই), তাই subscription-quota text ("monthly usage
limit reached") বহনকারী body-সহ কোনো 429, `status_429` নিয়মে পৌঁছানোর আগেই
quota-text fallback (`buildSubscriptionQuotaFallback`, `accountFallback.ts`;
1h cooldown) দ্বারা `quota_exhausted` হিসেবে শ্রেণিবদ্ধ হয় — অন্যদিকে
quota-text-বিহীন কোনো 429 (সাধারণ rate limiting) `status_429` নিয়মের মাধ্যমে
`rate_limit_exceeded` হিসেবে শ্রেণিবদ্ধ হয় এবং তারপরও IP family-টিকে cooldown-এ
পাঠায়। allowlisted provider-এর ক্ষেত্রে IP-bucketed rate limit নিঃশেষিত quota-এর
সমতুল্য signal। স্বীকার্য সীমাবদ্ধতা:

- **সর্বোচ্চ প্রচেষ্টা**: লকটি `proxy_logs` থেকে সংযোগটির সর্বশেষ জানা `egress_ip`
  নির্ণয় করে (24h উইন্ডো, সিঙ্ক্রোনাস, কোনো ক্যাশ নেই)। কোল্ড ক্যাশ (egress
  IP কখনো যাচাই করা হয়নি) বা কোনো রো না থাকলে → ব্যর্থ সংযোগটি তবুও এই
  ব্রাঞ্চ দ্বারা কুলড হয় (বর্তমানের মতোই রেকর্ড করা হয়), শুধু কোনো সিবলিং লক করা হয় না।
- **কখনোই টার্মিনাল নয়**: কুলডাউনটি একটি নবায়নশীল কোটা উইন্ডো
  (`testStatus: "unavailable"`); কোনো IP-স্তরের সিগন্যাল থেকে কখনোই স্থায়ী
  অবস্থা নির্ধারণ করা হয় না। `disableCooling` সংযোগগুলো ব্রাঞ্চটি সম্পূর্ণ এড়িয়ে যায়।
- **অ্যালাওলিস্টেড ফ্যামিলির জন্য লকের গ্র্যানুলারিটি পরিবর্তিত হয়**: এটি একটি স্কোপ
  পরিবর্তন, শুধু সিবলিং অপ্টিমাইজেশন নয়। opencode হলো একটি `passthroughModels`
  প্রোভাইডার, তাই এই ব্রাঞ্চের আগে একটি 429 প্রতি-MODEL লকআউট তৈরি করত; এখন এটি
  একটি সংযোগ কুলডাউন তৈরি করে — এমনকি এমন কোনো অপারেটরের ক্ষেত্রেও, যিনি মাত্র
  একটি সংযোগ চালাচ্ছেন এবং যার কোনো সিবলিংই নেই। opencode রুল টেবিল ইতোমধ্যেই
  এই গ্র্যানুলারিটিকে সঠিক বলে ঘোষণা করেছে (`scope: "connection"`,
  `providerErrorRules.ts`), কিন্তু এখন পর্যন্ত তা কখনো কার্যকর হয়নি, কারণ opencode
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-এ নেই। সংযোগ-স্কোপড agentrouter ব্রাঞ্চকে
  অনুসরণ করে, এই ব্রাঞ্চ নিজেই ব্যর্থ সংযোগটির কুলডাউন + `backoffLevel` লেখে
  এবং রিটার্ন করে — নিচের প্রতি-মডেল ব্লক ও জেনেরিক পাথে কখনোই পৌঁছানো হয় না।
- **কম্বো অন্তর্ভুক্ত**: agentrouter ব্রাঞ্চের মতো, স্কোপটি ইচ্ছাকৃতভাবে সেই
  `persistUnavailableState`/`isCombo` ডাউনগ্রেড উপেক্ষা করে, যা কোনো কম্বো কলার
  একটি 429-এ প্রয়োগ করে। প্রতি-মডেল লকআউট এই স্কোপের কোনো দুর্বলতর রূপ নয়,
  বরং এটি ভুল ইউনিট: নিঃশেষিত IP সম্পর্কে এটি কিছুই জানায় না, ফলে কম্বো
  রোটেশন প্রতিটি সিবলিংয়ের জন্য নিশ্চিতভাবে ব্যর্থ একটি করে কল করতে থাকবে।
- **সিবলিং সুরক্ষা**: ইতোমধ্যে টার্মিনাল (banned/credits_exhausted) অবস্থায় থাকা
  বা ইতোমধ্যে দীর্ঘতর কুলডাউনে থাকা কোনো সিবলিং কখনোই ওভাররাইট করা হয় না।
- **এক্সক্লুসিভ অ্যালাওলিস্ট**: `EGRESS_BUCKETED_LOCK_PROVIDERS` প্রসারিত করা
  মালিকের একটি সুস্পষ্ট সিদ্ধান্ত; কোনো জেনেরিক ওয়্যারিং নয় (প্যাটার্ন
  #10334/#10419)। সিবলিং কোয়েরিটি SQL লিটারেল হিসেবে পুনরাবৃত্তি না করে একই
  অ্যালাওলিস্ট বাইন্ড করে, তাই এটি প্রসারিত করতে মাত্র এক লাইনের পরিবর্তনই যথেষ্ট।
- **Egress IP রোটেশন, উভয় দিকে**: লুকআপ উইন্ডোটি (24h) egress-IP ক্যাশ TTL-এর
  (5 min) চেয়ে অনেক বড়, তাই "সর্বশেষ জানা IP" হলো ইতিহাস, বর্তমান অবস্থা নয়।
  উইন্ডোর মধ্যে কোনো সংযোগের প্রক্সি রোটেট হয়ে থাকলে লকটি সত্যিকার অর্থে শেয়ার
  করা কোনো IP **বাদ দিতে** পারে (রেকর্ড করা IP-টি নতুন, অনিঃশেষিতটি) — এবং
  একইভাবে এটি এমন কোনো সিবলিংকে **কুল করতে পারে, যা ইতোমধ্যে রোটেট করে**
  নিঃশেষিত IP থেকে সরে গেছে। দ্বিতীয় ক্ষেত্রে সেই সিবলিংকে একটি কুলডাউন উইন্ডো
  মূল্য দিতে হয়; উভয়টিই ইতিহাস-ভিত্তিক লুকআপের সর্বোচ্চ-প্রচেষ্টাসাপেক্ষ সীমাবদ্ধতা
  হিসেবে গৃহীত।
- **খরচ**: `proxy_logs`-এর দুটি সীমাবদ্ধ স্ক্যান (`idx_pl_timestamp`-এর মাধ্যমে
  উইন্ডো-ফিল্টার করা), শুধু 429 ঘটার ফ্রিকোয়েন্সিতে। কোনো নতুন ইনডেক্স নেই
  (মাইগ্রেশন 134 YAGNI)। মাঝারি আকারের বাস্তব-ট্রাফিক DB কপিতে পরিমাপ করা হয়েছে;
  একটি উচ্চ-থ্রুপুট ইনস্ট্যান্স একই উইন্ডোতে আনুপাতিকভাবে বেশি রো ধারণ করে।

---

## অন্যান্য স্থিতিস্থাপকতা বৈশিষ্ট্য

- **২০টি রাউটিং কৌশল** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — দেখুন [AUTO-COMBO.md](../routing/AUTO-COMBO.md)।
- **রিসেট-সচেতন রাউটিং** (v3.8.0) — কোটা রিসেটের সময় অনুযায়ী সংযোগগুলোকে অগ্রাধিকার দেয়।
- **ব্যাকগ্রাউন্ড মোডের অবনমন** — Responses API-এর `background: true` সতর্কতাসহ সিঙ্ক মোডে অবনমিত হয়।
- **ডায়নামিক টুল সীমা শনাক্তকরণ** — টুলের সংখ্যার সীমা অতিক্রম করলে প্রোভাইডারগুলো থেকে পিছিয়ে আসে।
- **জরুরি ফলব্যাক** — `OMNIROUTE_EMERGENCY_FALLBACK` দ্বারা নিয়ন্ত্রিত; অপারেটররা রিস্টার্ট ছাড়াই Feature Flags পৃষ্ঠা থেকে এটি ওভাররাইড করতে পারেন।

---

## ডিবাগিং

- Weighted combo `503 all_targets_cooling_down` উত্তর দেয় (`Retry-After` সেট থাকে, `diagnostics.excluded`-এ প্রতিটি target-কে `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`-সহ তালিকাভুক্ত করা হয়) → pool কনফিগার ও সংযুক্ত আছে, তবে প্রতিটি target-ই একটি resilience timer দ্বারা বাদ পড়েছে; `[COMBO] Weighted selection: every target excluded before dispatch — …` সতর্কবার্তাটি কারণগুলো এবং অবশিষ্ট সেকেন্ড উল্লেখ করে। একই combo থেকে একটি `404 no_executable_targets` পাওয়ার অর্থ হলো কোনো resilience timer জড়িত ছিল না (চালানোর মতো কিছু নেই, অথবা প্রতিটি account availability probe-এ ব্যর্থ হয়েছে)। `targetResolution.ts`-এ সংগৃহীত exclusions থেকে `open-sse/services/combo/pinRecovery.ts`-এ এটি নির্মিত।
- কোনো provider-এর সব key এড়িয়ে যাওয়া হচ্ছে → circuit breaker-এর state এবং প্রতিটি connection-এর `rateLimitedUntil`/`testStatus`—উভয়ই পরীক্ষা করুন।
- reset window-এর পরেও provider স্থায়ীভাবে বাদ পড়ে আছে → code সম্ভবত `getStatus()`/`canExecute()`-এর পরিবর্তে কাঁচা `state` পড়ছে।
- একটি key ব্যর্থ হলেও অন্যগুলোর কাজ করা উচিত → circuit breaker-এর পরিবর্তে connection cooldown-কে অগ্রাধিকার দিন।
- শুধু একটি model ব্যর্থ হচ্ছে → connection cooldown-এর পরিবর্তে model lockout-কে অগ্রাধিকার দিন।
- state-এর স্বয়ংক্রিয়ভাবে পুনরুদ্ধার হওয়ার কথা, কিন্তু হচ্ছে না → ভবিষ্যতের timestamp এবং মেয়াদোত্তীর্ণ state refresh করে এমন read path পরীক্ষা করুন। স্থায়ী status-এর জন্য manual পরিবর্তন প্রয়োজন।

---

## TLS ফিঙ্গারপ্রিন্টিং ও স্টেলথ

প্রোভাইডার-নির্দিষ্ট স্টেলথ (JA3/JA4, CCH, obfuscation) আলাদাভাবে নথিভুক্ত করা হয়েছে — দেখুন `docs/security/STEALTH_GUIDE.md` (git-এ রয়েছে; `/docs`-এ কম্পাইল করা হয়নি)।

---

## স্থিতিস্থাপকতা পরীক্ষা (Phase 8 · Block C)

স্থিতিস্থাপকতা লজিকের ইউনিট টেস্টের পাশাপাশি, তিনটি পরীক্ষা বাস্তব
চাপ/ব্যর্থতার পরিস্থিতিতে রানটাইম যাচাই করে (সবগুলোই ইন্টিগ্রেশন/নাইটলি — কোনোটিই PR ব্লক করে না):

| পরীক্ষা     | যা যাচাই করে                                                                                                                                                                                           | চালানোর পদ্ধতি                          |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| Chaos       | নকল আপস্ট্রিম নোড বাস্তব ল্যাটেন্সি/রিসেট/টাইমআউট/503 ইনজেক্ট করে; সার্কিট ব্রেকার খোলে/পুনরুদ্ধার হয় এবং `checkFallbackError` যে 503-কে পুনরুদ্ধারযোগ্য ফলব্যাক হিসেবে শ্রেণিবদ্ধ করে, তা যাচাই করে। | `RUN_CHAOS_INT=1 npm run test:chaos`    |
| Heap-growth | `--expose-gc`-এর অধীনে প্রতিটি `createSSEStream`-এর জন্য ~500টি স্ট্রিম; হিপ নির্ধারিত সীমা ছাড়িয়ে বাড়লে ব্যর্থ হয় (OOM গার্ড #3069)।                                                              | `npm run test:heap`                     |
| k6 soak     | `/api/monitoring/health`-এর ওপর দীর্ঘস্থায়ী লোড; p95/ত্রুটি থ্রেশহোল্ড।                                                                                                                               | `k6 run tests/load/k6-soak.js` (নাইটলি) |

`.github/workflows/nightly-resilience.yml` (cron + dispatch) দ্বারা অর্কেস্ট্রেট করা হয়। ডিফল্ট
`test:integration`-এ chaos এবং heap নিজে থেকেই স্কিপ হয় (`RUN_CHAOS_INT`/`--expose-gc` ছাড়া)।

---

## আরও দেখুন

- [আর্কিটেকচার নির্দেশিকা](./ARCHITECTURE.md) — সিস্টেম আর্কিটেকচার ও অভ্যন্তরীণ কাঠামো
- [ব্যবহারকারী নির্দেশিকা](../guides/USER_GUIDE.md) — প্রোভাইডার, কম্বো, CLI ইন্টিগ্রেশন
- [অটো-কম্বো ইঞ্জিন](../routing/AUTO-COMBO.md) — ১৬-ফ্যাক্টর স্কোরিং, মোড প্যাক
