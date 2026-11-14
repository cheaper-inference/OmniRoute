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

## 2. সংযোগ Cooldown

**সুযোগ:** একক প্রদানকারী connection/account/key.

**উদ্দেশ্য:** একই প্রদানকারীর জন্য অন্যান্য সংযোগগুলি পরিবেশন করা চালিয়ে যাওয়ার সময় একটি খারাপ কী এড়িয়ে যান।

**বাস্তবায়ন:**

- অনুপলব্ধ চিহ্নিত করুন: `src/sse/services/auth.ts::markAccountUnavailable()`
- নির্বাচন: একই ফাইলে `getProviderCredentials*`
- কুলডাউন ক্যালক: `open-sse/services/accountFallback.ts::checkFallbackError()`
- সেটিংস: `src/lib/resilience/settings.ts`

**সংযোগ প্রতি ক্ষেত্র:**

- কুলডাউনের মেয়াদ শেষ না হওয়া পর্যন্ত `rateLimitedUntil` — টাইমস্ট্যাম্প
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — সূচকীয় ব্যাকঅফ কাউন্টার

**ডিফল্ট কুলডাউন:**

- OAuth ভিত্তি: 5s
- API-কী বেস: 3s
- API-কী 429: আপস্ট্রিম `Retry-After`/reset headers/parseable রিসেট টেক্সট পছন্দ করে
- ব্যাকঅফ: `baseCooldownMs * 2 ** failureIndex`

**প্রতি-প্রদানকারী পুনরায় চেষ্টা করতে বিলম্ব।** প্রদানকারীর বিস্তারিত পৃষ্ঠাটিতে একটি রয়েছে** বিলম্ব পুনরায় চেষ্টা করুন** নির্বাচন করুন (স্বয়ংক্রিয়, 15 সেকেন্ড পর্যন্ত 1 ঘন্টা)। এটি `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` সংরক্ষণ করে (1-21600, `PATCH /api/resilience` এর মাধ্যমে)। যখন একটি হার-সীমা ত্রুটি কোনো আপস্ট্রিম পুনরায় চেষ্টা করার ইঙ্গিত বহন করে না, তখন সেই মানটি প্রদানকারীর জন্য স্কেল করা ব্যাকঅফকে প্রতিস্থাপন করে এবং `backoffLevel` 0 (`open-sse/services/rotationConfig.ts::overrideFor`) এ পুনরায় সেট করে। একটি হার-সীমিত ত্রুটির জন্য অগ্রাধিকার, সর্বোচ্চ প্রথমে: আপস্ট্রিম পুনরায় চেষ্টা করার ইঙ্গিত, তারপর প্রতি-সংযোগ `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, তারপর প্রতি-প্রদানকারী পুনরায় চেষ্টা করার বিলম্ব, তারপর env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, তারপর স্কেল করা ব্যাকঅফ৷ অটো ক্ষেত্রটি সরিয়ে দেয়। এটি শুধুমাত্র হার-সীমা কারণকে প্রভাবিত করে, কখনই টার্মিনাল স্টেট নয়।

**এন্টি-থান্ডারিং-হার্ড গার্ড:** অতিরিক্ত-প্রসারিত কুলডাউন বা দ্বিগুণ-বর্ধিত `backoffLevel` থেকে সমবর্তী ব্যর্থতা প্রতিরোধ করে।

**সঙ্গতি-সীমা 429s ব্যাকঅফ মই আরোহণ না.** একটি `429` যার শরীর একটি সমবর্তী সীমা রিপোর্ট করে ("অত্যধিক সমবর্তী অনুরোধ", "সঙ্গতি সীমা", "সমান্তরাল অনুরোধের সীমা", GLM `并发数过高`) মানে অ্যাকাউন্টটি সুস্থ কিন্তু ব্যস্ত। `checkFallbackError()` রিটার্ন করে কারণ `concurrency_limited`: এখনই পরবর্তী সংযোগে ব্যর্থ হন, একটি নির্দিষ্ট `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) বা আপস্ট্রিম পুনরায় চেষ্টা করার ইঙ্গিতের জন্য এটিকে ঠান্ডা করুন, `backoffLevel` অপরিবর্তিত রাখুন এবং `skipProviderBreaker` সেট করুন। একটি সুস্পষ্ট কোটা সংস্থা এখনও জিতেছে, তাই কোটার প্যাটার্নের সাথে মেলে এমন একটি সংস্থা কোটার রায় থেকে যায়৷ সনাক্তকরণ: `looksLikeConcurrencyLimit()` in `src/shared/utils/classify429.ts`; রায়: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (ব্রেকারের `FailureKind`) অপরিবর্তিত এবং এখনও এই দেহগুলির জন্য `rate_limit` পড়ে।

**স্ট্রিম কন্টেন্ট স্টল অ্যাকাউন্ট ঠান্ডা না.** যখন কন্টেন্ট-স্টল ওয়াচডগ (`open-sse/utils/streamHandler.ts`) একটি স্ট্রীম ছেড়ে দেয় যা সময়মতো কোনো মডেল আউটপুট পাঠায়নি, তখন `markAccountUnavailable()` সংযোগে ত্রুটি রেকর্ড করে কিন্তু কোনো কুলডাউন সেট করে না: স্টলটি সেই অনুরোধের অন্তর্গত, প্রায়শই একটি দীর্ঘ যুক্তির পালা হয় যার কোনো আউটপুট নেই। অপারেটররা `resilienceSettings.streamStallCooldown.enabled` (ডিফল্ট `false`) এর সাথে ফিরে আসতে পারে।

**`p2c` অ্যাকাউন্ট নির্বাচনের জন্য অপ্ট-ইন লেটেন্সি সিগন্যাল।** প্রতিটি প্রেরিত প্রচেষ্টা তার টাইম-টু-ফার্স্ট-বাইট এবং সংযোগ প্রতি ফলাফল (এবং সংযোগ প্রতি + মডেল) একটি ইন-মেমরি রোলিং উইন্ডোতে রেকর্ড করে: 15 মিনিটের মধ্যে শেষ 20টি নমুনা (`open-sse/services/connectionLatencyTracker.ts`, `src/sse/handlers/chatHelpers.ts` তে `safeLogEvents()` থেকে রেকর্ড করা হয়েছে)। যখন `resilienceSettings.p2cLatency.weight` `0` উপরে থাকে (পরিসীমা 0-20, ডিফল্ট `0` = বন্ধ), `src/sse/services/auth.ts` এ `compareP2CConnections()` জোড়ার প্রতিটি প্রার্থীর জন্য `weight` পয়েন্ট পর্যন্ত যোগ করে। এর অর্ধেক লেটেন্সি থেকে আসে দ্রুত প্রার্থীর অনুপাত হিসাবে (যত দ্বিগুণ ধীর পূর্ণ অর্ধেক নেয়) এবং অর্ধেক রোলিং ত্রুটির হার থেকে। শব্দটি শুধুমাত্র তখনই প্রযোজ্য যখন উভয় প্রার্থীর কমপক্ষে 3টি নমুনা থাকে, তাই নতুন অ্যাকাউন্টগুলিকে জরিমানা করা হয় না এবং এর সর্বোচ্চ সীমা কোটা-অবরুদ্ধ এবং কোটা-নিঃশেষিত জরিমানাগুলির নীচে থাকে৷ এটি নিজস্ব কোনো সার্কিট যোগ করে না: ব্যর্থ অ্যাকাউন্টগুলি এখনও কুলডাউন, লকআউট এবং ব্রেকার স্তর দ্বারা পরিচালিত হয়। এটি `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` দিয়ে সেট করুন।

**যুক্তিযুক্ত ফ্রেমগুলি সামগ্রী-স্টল বাজেট পুনরায় চালু করে।** একটি যুক্তি মডেল তার প্রথম দৃশ্যমান টোকেনের আগে কয়েক মিনিটের জন্য চিন্তা করতে পারে: Claude `thinking_delta` ফ্রেমগুলিকে স্ট্রিম করে যার চিন্তার পাঠ্য খালি হতে পারে, এবং প্রতিক্রিয়া API একের পর এক যুক্তি আইটেম স্ট্রিম করে। `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) এই ফ্রেমগুলিকে স্বীকৃতি দেয় এবং ওয়াচডগ পালা বাতিল না করে প্রতিটিতে তার বাজেট পুনরায় চালু করে। তারা এখনও মডেল আউটপুট নয়, তাই একটি পালা যা শুধুমাত্র যুক্তি দিয়ে শেষ হয় তা এখনও খালি হিসাবে রিপোর্ট করা হয়, এবং একটি পালা যা যুক্তি বন্ধ করে এবং শুধুমাত্র হৃদস্পন্দন পাঠায় তা এখনও ওয়াচডগকে ভ্রমণ করে।

একটি অ-খালি স্বাক্ষর সহ Kiro এর বাইনারি `reasoningContentEvent` ফ্রেমগুলি নির্বাহকের মাধ্যমে একটি খালি `reasoning_content` ডেল্টা হিসাবে এই যুক্তি কার্যকলাপকে সংরক্ষণ করে। স্বাক্ষর ফরোয়ার্ড করা হয় না. মেটাডেটা, অসম্পূর্ণ ফ্রেম এবং খালি স্বাক্ষর বিষয়বস্তু বাজেট পুনরায় আরম্ভ করে না; স্বাধীন সক্রিয়-প্রবাহের সময়সীমা এবং ক্লায়েন্ট বাতিলকরণ এখনও প্রযোজ্য (`open-sse/executors/kiro/reasoning.ts`)।

**টার্মিনাল স্টেটস (NOT cooldowns):**

- `banned` — নিষিদ্ধ-কীওয়ার্ড / অ্যাকাউন্ট-ব্যান সনাক্তকরণ দ্বারা সেট করা হয়েছে ( [BAN_DETECTION](../security/BAN_DETECTION.md) দেখুন)। আপস্ট্রিম প্রতি-অনুরোধ প্রত্যাখ্যান (`request_rejected`, যেমন Anthropic OAuth 403 "অনুরোধ অনুমোদিত নয়") এটি কখনই সেট করে না: এগুলি সংযোগ এবং মডেলের প্রতি গণনা করা হয় এবং `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h) এ ক্রমবর্ধমান কুলডাউন ক্যাপড দিয়ে সেই মডেলটিকে ঘূর্ণনের বাইরে নিয়ে যায়, বা যখন কোনও মডেল — `open-sse/services/requestRejectedStreak.ts` জানা না থাকে তখন সংযোগটি শীতল করে।
- `expired` (বাউন্ডেড পুনঃপ্রচারের পর টার্মিনালে ট্রানজিশন — `EXPIRED_RETRY_MAX = 3` সাথে এক্সপোনেনশিয়াল ব্যাকঅফ — যাতে অ্যাকাউন্টটি স্থায়ীভাবে নিষ্ক্রিয় হওয়ার আগে ক্ষণস্থায়ী OAuth ত্রুটিগুলি স্ব-নিরাময় করতে পারে)
- `credits_exhausted`

শংসাপত্রগুলি পরিবর্তন না হওয়া পর্যন্ত বা অপারেটর সেগুলি পুনরায় সেট না করা পর্যন্ত এগুলি বজায় থাকে৷ ক্ষণস্থায়ী কুলডাউন অবস্থা দিয়ে টার্মিনাল স্টেট ওভাররাইট করবেন না।

**অলস পুনরুদ্ধার:** যখন `rateLimitedUntil` অতীত হয়, সংযোগ আবার যোগ্য হয়ে ওঠে। সফল ব্যবহারে, `clearAccountError()` সমস্ত ত্রুটি ক্ষেত্র সাফ করে।

### Claude OAuth ব্যবহার প্রাচীর: নিম্ন-অগ্রাধিকার লেন + সেশন-সীমা রিসেট

**সুযোগ:** একটি Claude সাবস্ক্রিপশন (OAuth) সংযোগ। উভয় বৈশিষ্ট্য হল** সংযোগ প্রতি অপ্ট-ইন** ( `providerSpecificData` এ সংযোগ → Claude বিভাগ → `lowPriorityMode` / `autoLimitReset` সম্পাদনা করুন, উভয়ই ডিফল্ট বন্ধ) এবং মিরর Claude কোডের `/low-priority` এবং `/limit-reset` কমান্ড (তারের চুক্তি Claude কোড 2.1.263 থেকে ক্যাপচার করা হয়েছে)।

**বাস্তবায়ন:**

- স্টেট মেশিন + প্রতিক্রিয়া শ্রেণীবিভাগ: `open-sse/services/claudeLowPriority.ts`
- status/claim ক্লায়েন্ট রিসেট করুন: `open-sse/services/claudeLimitReset.ts`
- এক্সিকিউটর হুক (হেডার ইনজেকশন + একই-অ্যাকাউন্ট পুনরায় চেষ্টা): `open-sse/executors/base.ts::execute()`
- অপ্ট-ইন অধ্যবসায়: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ট্রিগার:** 5-ঘন্টা ব্যবহারের ওয়াল — a `429` যার শিরোনাম `anthropic-ratelimit-unified-status: rejected` বহন করে এবং, যখন অ্যাকাউন্টটি যোগ্য হয়, `anthropic-ratelimit-unified-slow-offer: treatment`। প্রথম দেয়ালের আগে কিছুই পাঠানো হয় না 429; ইউনিফাইড হেডার ছাড়া একটি বিস্ফোরণ 429 স্বাভাবিক কুলডাউন পথের মধ্য দিয়ে যায়।

**নিম্ন অগ্রাধিকার লেন** (`lowPriorityMode`):

- প্রাচীর 429-এ নির্বাহক অফারটি গ্রহণ করে এবং অবিলম্বে পুনরায় চেষ্টা করে** একই** `anthropic-usage-limit: slow` এর সাথে অ্যাকাউন্ট; ঘোষিত `anthropic-ratelimit-unified-reset` (+ 60s গ্রেস) না হওয়া পর্যন্ত লেনটি সক্রিয় থাকে এবং সেই উইন্ডোর প্রতিটি অনুরোধ শিরোনাম বহন করে। বাধাপ্রাপ্ত 429 কখনই `handleChatCore` পৌঁছায় না, তাই সংযোগটি হল** না** ঠান্ডা করা এবং দূরে ঘোরানো হয় না.
- পরবর্তী প্রতিক্রিয়াগুলিতে`anthropic-ratelimit-unified-slow-status` : `active` / `not_needed` লেনটি রাখুন; `slot_busy` (429) বা একটি `529` সার্ভারের `anthropic-ratelimit-unified-slow-retry-after` অপেক্ষা করুন (ডিফল্ট 20s, ক্ল্যাম্প 5–600s, ± 30% জিটার) এবং পুনরায় চেষ্টা করুন, `anthropic-ratelimit-unified-slow-max-wait` দ্বারা আবদ্ধ (ডিফল্ট 20 মিনিট, ক্ল্যাম্প 1 মিনিট–6 ঘন্টা) — শেষ হয়ে গেছে এবং 1-মিনিট শেষ হয়েছে পুনরায় গ্রহণ অপেক্ষাটি অতিরিক্তভাবে অনুরোধের নিজস্ব আপস্ট্রিম-স্টার্ট টাইমআউট (`resolveFetchStartTimeout`, ডিফল্টভাবে 10 মিনিট) বিয়োগ একটি 5 সেকেন্ড মার্জিন দ্বারা সীমাবদ্ধ করা হয়: এই ক্যাপ ছাড়া 20-মিনিটের ডিফল্ট সর্বোচ্চ-অপেক্ষা অনুরোধটি শেষ হয়ে যাবে এবং ঘুমের মধ্য-অপেক্ষা বাতিল করা হবে, একটি `TimeoutError` `max_wait` + অফের পরিবর্তে সারফেস করা হবে।
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, একটি 5h-উইন্ডো রোলওভার, বা `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (যেকোন স্ট্যাটাসে এটিকে `extra_usage` হিসাবে শেষ করে, যেহেতু পেড ওভারেজ এখন প্রাচীরকে ঢেকে দেয়) লেনটি শেষ করুন; প্রতিক্রিয়া তারপর স্বাভাবিক কুলডাউন পথে প্রবাহিত হয়। ঘোষিত বাজেট রিসেট না হওয়া পর্যন্ত `budget_exhausted` মনে রাখা হয় (≤ 8 দিন)।
- ওয়াল চেকটি নির্বাহকের নিজস্ব 400-চালিত আন্তঃ-প্রচেষ্টার (প্রসঙ্গ সম্পাদনা, thinking/effort ক্ল্যাম্প, প্যারাম অটো-লার্ন) এর পরে চলে, তাই একটি ওয়াল 429 যেটি শুধুমাত্র সেই পুনঃপ্রচারগুলির মধ্যে একটির উপর দেখা যায় তা এখনও কুলডাউন পথে পৌঁছানোর পরিবর্তে বাধা দেওয়া হয়।
- প্রতি সংযোগে স্টেট ইন-মেমরি রয়েছে (পুনরায় চালু হলে পুনরায় গ্রহণ করতে একটি অতিরিক্ত ওয়াল 429 খরচ হয়)।

**সেশন-সীমা রিসেট** (`autoLimitReset`, লেনের আগে চেষ্টা করা হয়েছে যখন উভয়ই চালু থাকে):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` ব্লক; যখন `arm: "reset"` এবং `available: true`, `{ "program": "juniper_tide" }` এর সাথে `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` ( `providerSpecificData.organizationUUID` থেকে UUID, বুটস্ট্র্যাপ ফলব্যাক)।
- `result: reset|not_limited` → অনুরোধটি সম্পূর্ণ গতিতে পুনরায় চেষ্টা করা হয় (কোন ধীর শিরোনাম নেই)। `already_used` / `not_offered` memoise `next_available_at` (ডিফল্ট এক সপ্তাহ); কোন ব্যর্থতা 15 মিনিট বন্ধ ফিরে. রিসেট সপ্তাহে একবার হয় এবং এখনও সাপ্তাহিক সীমার দিকে গণনা করা হয়।

রিগ্রেশন গার্ড: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`।

### ব্যাঙ্কড রিসেট স্বয়ংক্রিয়ভাবে প্রয়োগ করুন

**সুযোগ:** Codex এবং Claude সাবস্ক্রিপশন (OAuth) সংযোগ।** অপ্ট-ইন** : `bankedResetAutoApply` সেটিং বন্ধ এবং ডিফল্টভাবে `dry-run` মোডে আছে (সেটিংস → AI → স্বয়ংক্রিয়ভাবে ব্যাঙ্কড রিসেট প্রয়োগ করুন)।

**উদ্দেশ্য:** কোনো অপারেটর প্রদানকারীর সীমা পৃষ্ঠায় "রিডিম" চাপার জন্য অপেক্ষা না করে, যখন কোনো অ্যাকাউন্ট কোনো ব্যবহারের দেয়ালে আঘাত করে তখন ব্যাঙ্কড রিসেটগুলি নিজেরাই খরচ করে।

| ক্রেডিট প্রকার (`creditTypes`) | কি খালাস হয়                               | যেখানে চলে                                               |
| ------------------------------ | ------------------------------------------ | -------------------------------------------------------- |
| `codexCredits`                 | Codex রিসেট ক্রেডিট                        | ব্যাকগ্রাউন্ড জব, প্রতি 60 সেকেন্ডে                      |
| `claudeCredits`                | Claude ব্যাংককৃত অনুদান (`GRANT` ক্রেডিট)  | ব্যাকগ্রাউন্ড জব, প্রতি 60 সেকেন্ডে                      |
| `claudeSessionReset`           | Claude সাপ্তাহিক অধিবেশন-সীমা রিসেট (উপরে) | প্রতি-অ্যাকাউন্ট টগলের মতো একই নীতির মাধ্যমে অনুরোধের পথ |

**বাস্তবায়ন:**

- বিশুদ্ধ সিদ্ধান্ত (উভয় পথের জন্য একটি নিয়ম সেট): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- পটভূমির কাজ: `src/lib/services/bankedResetAutoApply.ts` ( `src/instrumentation-node.ts` এ শুরু হয়েছে)
- Claude অনুরোধ-পথ গেট: `src/lib/usage/claudeSessionResetPolicy.ts`, `open-sse/services/claudeLimitReset.ts` এ `setClaudeLimitResetPolicy()` এর মাধ্যমে নিবন্ধিত
- ইতিহাস, ক্যাপস এবং ওয়েবহুক: `src/lib/usage/bankedResetAudit.ts`
- ইতিহাস API: `GET /api/settings/banked-reset-auto/history?limit=50` (ম্যানেজমেন্ট অথ)

**সিদ্ধান্তের আদেশ** (প্রথম ব্যর্থ নিয়মটি রেকর্ড করা কারণ):

1. ফিচার অফ, ক্রেডিট টাইপ অফ, অথবা অ্যাকাউন্ট অফ স্কোপ (`accountScope` `all` / `selected` প্লাস প্রতি-অ্যাকাউন্ট `connections` মানচিত্র)।
2. ঐচ্ছিক UTC সময়সূচীর বাইরে (`startHourUtc` > `endHourUtc` মধ্যরাত অতিক্রম করে)।
3. গত 24 ঘন্টার ক্যাপস: `maxPerAccountPerDay` (1), `maxPerDay` (3), এবং `minSpacingMinutes` (30) যেকোনো দুটি রিডিমশনের মধ্যে।
4. ট্রিগার: একটি প্রাচীরযুক্ত `session` বা `weekly` উইন্ডো ( `getQuotaWindowStatus().reachedThreshold` থেকে পড়ুন, `isAccountQuotaExhausted()` নয়, যা কেবলমাত্র প্রতিটি উইন্ডোতে ব্যয় করা একটি অ্যাকাউন্টের রিপোর্ট করে), বা `expiringCreditHours` (24) এর মধ্যে একটি ক্রেডিট মেয়াদ শেষ হয়ে গেছে এমন একটি অ্যাকাউন্টে যা কমপক্ষে `expiringCreditMinUsedPercent` (50) ব্যবহার করেছে৷
5. ন্যাচারাল-রিসেট গার্ড: `sessionResetGuardMinutes` (90) এর মধ্যে প্রাচীরযুক্ত 5-ঘন্টা উইন্ডো রিসেট হলে এড়িয়ে যান, অথবা `weeklyResetGuardHours` (12) এর মধ্যে প্রাচীরযুক্ত সাপ্তাহিক উইন্ডো পুনরায় সেট হয়।
6. সাপ্তাহিক ফ্লোর: 5-ঘন্টা রিসেট এড়িয়ে যান যখন সাপ্তাহিক বাকি `weeklyFloorPercent` (10) এর নিচে থাকে।
7. `last-resort` মোড: এড়িয়ে যান যখন একই প্রদানকারীর অন্য একটি ইন-স্কোপ অ্যাকাউন্টের উভয় উইন্ডোতে কমপক্ষে `poolHeadroomPercent` (10) বাকি থাকে। মেয়াদোত্তীর্ণ-ক্রেডিট ট্রিগার এটিকে বাইপাস করে।
8. `dry-run` একটি সারি রেকর্ড করে এবং কিছুই খালাস করে না; `last-resort` এবং `eager` খালাস।

অনুপস্থিত কোটা ডেটা কখনই একটি রিডেম্পশন আনলক করে না: একটি অজানা রিসেট সময় বা সাপ্তাহিক ব্যবহার এড়িয়ে যায়।

**Claude সেশন রিসেট:** ফিচার বন্ধ বা `claudeSessionReset` বন্ধ থাকলে, প্রতি-অ্যাকাউন্ট `autoLimitReset` টগল ঠিক আগের মতোই সিদ্ধান্ত নেয়। উভয় চালু থাকার সাথে, বৈশিষ্ট্যটি প্রতি-অ্যাকাউন্ট টগলগুলিকে প্রতিস্থাপন করে: একটি ইন-স্কোপ অ্যাকাউন্ট শুধুমাত্র তখনই দাবি করতে পারে যখন নীতি অনুমতি দেয় এবং `dry-run` মোডে কোনও দাবি করা হয় না।

**নিরাপত্তা:** চাকরিটি প্রতি টিক সর্বাধিক একটি ক্রেডিট রিডিম করে, ক্রেডিট তালিকাভুক্ত করার আগে সিদ্ধান্ত নেয় (একটি এড়িয়ে যাওয়া অ্যাকাউন্ট কখনও তালিকাভুক্ত করা হয় না), idempotency কী `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` ব্যবহার করে এবং ব্যর্থ তালিকা বা রিডেমশনের পরে 1 ঘন্টার জন্য একটি অ্যাকাউন্ট বন্ধ করে দেয়। প্রতিটি খালাস, ব্যর্থতা এবং ড্রাই-রান সিদ্ধান্ত `audit_log` এ লেখা হয় (`action: "bankedReset.redeem"`, কোন টোকেন বা ক্রেডিট আইডি নেই); ক্যাপগুলি সেই সারিগুলি থেকে গণনা করা হয়, তাই তারা পুনরায় আরম্ভ করে বেঁচে থাকে। সফল রিডেমশনগুলি `provider.reset_redeemed` ওয়েবহুককেও ফায়ার করে।

রিগ্রেশন গার্ড: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`।

### সেশন অ্যাফিনিটি (#7274)

**সুযোগ:** একটি ক্লায়েন্ট সেশন (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` হেডার) একটি সংযোগে পিন করা হয়েছে, এর জন্য** যেকোনো** প্রদানকারী

**উদ্দেশ্য:** অনুরোধ জুড়ে একই অ্যাকাউন্টে একটি মাল্টি-টার্ন এজেন্ট (Claude কোড, aider, কাস্টম এজেন্ট) রাখুন, ক্রস-অ্যাকাউন্ট প্রসঙ্গ ক্ষতি হ্রাস করুন এবং প্রতি-অ্যাকাউন্ট সেশন স্টেট সহ প্রদানকারীদের উপর বারবার কোল্ড-স্টার্ট 429।

**বাস্তবায়ন:**

- TTL রেজোলিউশন: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- পিন selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- হেডার নিষ্কাশন (জেনারিক, যেকোনো প্রদানকারী): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- স্থায়ী পিন টেবিল: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- সেটিং: `sessionAffinityTtlMs` (গ্লোবাল TTL ms, `0` নিষ্ক্রিয় করে) — `src/lib/db/settings.ts`। মাইগ্রেশন `124_generic_session_affinity_ttl.sql` দ্বারা কোডেক্স-শুধু `codexSessionAffinityTtlMs` থেকে নামকরণ করা হয়েছে, যা নতুন ডিফল্ট হিসাবে পূর্বে কনফিগার করা Codex TTL বহন করে।

#7274 এর আগে, `0` `codex` প্রতিটি প্রদানকারীর জন্য `resolveSessionAffinityTtlMs()` হার্ড-বেইল্ড ছিল, তাই TTL সেটিং (এবং সেশন হেডার) অন্য কোথাও কোনো প্রভাব ফেলেনি যদিও পিনিং মেকানিজম এবং হেডার নিষ্কাশন ইতিমধ্যেই প্রদানকারী-অজ্ঞেয়বাদী ছিল। ফিক্স যে তাড়াতাড়ি-রিটার্ন সরানো; TTL এখন `0` উপরে বিশ্বব্যাপী সেট করা প্রতিটি প্রদানকারীর জন্য সমানভাবে প্রযোজ্য।

তিনটি সেশন-অ্যাফিনিটি হেডার কখনই ফরওয়ার্ড করা হয় না আপস্ট্রিম — এক্সিকিউটররা ক্লায়েন্ট হেডারগুলিকে পাস করার পরিবর্তে স্ক্র্যাচ থেকে তাদের নিজস্ব আপস্ট্রিম হেডার তৈরি করে, তাই এটি শুধুমাত্র একটি অভ্যন্তরীণ পারস্পরিক সম্পর্ক আইডি থেকে যায়।

### একচেটিয়া পরিচালিত সেশন সংযোগ ইজারা

**সুযোগ:** একজন সক্রিয় পরিচালিত HTTP client/session একটি যোগ্য OmniRoute সংযোগের মালিক।

**উদ্দেশ্য:** অনুরোধ জুড়ে একটি হার্ড রাউটিং বেড়া প্রয়োজন যে ক্লায়েন্টদের জন্য টেকসই একচেটিয়া সংযোগ মালিকানা প্রদান. এটি সেশন অ্যাফিনিটি থেকে আলাদা, যা একটি নরম ধারাবাহিকতা পছন্দ: একটি একচেটিয়া ইজারা SQLite তে জীবনচক্রের অবস্থা বজায় রাখে, বিশ্বব্যাপী সক্রিয়-মালিক এবং সক্রিয়-সংযোগ স্বতন্ত্রতা প্রয়োগ করে এবং প্রদানকারী প্রেরণের আগে একটি বাসি প্রজন্মকে প্রত্যাখ্যান করে।

বৈশিষ্ট্যটি API কী প্রতি অপ্ট-ইন। একটি পরিচালিত কী-এর অবশ্যই `lease:exclusive` স্কোপ এবং একটি স্পষ্ট নন-খালি `allowedConnections` তালিকা থাকতে হবে। যেকোনো HTTP ক্লায়েন্ট লাইফসাইকেল এন্ডপয়েন্ট ব্যবহার করতে পারে; কোনো ক্লায়েন্টের নাম, ব্যবহারকারী-এজেন্ট, প্রদানকারী, OAuth পদ্ধতি বা মডেলের প্রয়োজন নেই। ইজারা একটি সংযোগের মালিক, একটি মডেল নয়, তাই একটি মডেল পরিবর্তন বাঁধাই ধরে রাখে যখন সংযোগটি সাধারণত যোগ্য থাকে। সাধারণ মডেল, কোটা, স্বাস্থ্য, কুলডাউন এবং অনুমোদিত তালিকার নিয়মগুলি কর্তৃত্বপূর্ণ থাকে এবং একই প্রজন্মকে অন্য বিনামূল্যের যোগ্য সংযোগে স্থানান্তর করতে পারে।

জীবনচক্র হল `POST /api/v1/session-leases` এবং JSON ক্রিয়া `acquire`, `renew`, এবং `release`। পরিচালিত অনুমান অনুরোধগুলি অস্বচ্ছ `X-OmniRoute-Lease-Owner` মান এবং সঠিক `X-OmniRoute-Lease-Generation` উপস্থাপন করে। মালিক 43 base64url অক্ষর অনুসরণ করে `vlo_` ব্যবহার করে; শুধুমাত্র এর SHA-256 হ্যাশ সংরক্ষণ করা হয়। প্রতিটি চূড়ান্ত প্রেরণের বেড়াও প্রমাণীকৃত API কী ID এবং সক্রিয় সংযোগ ID আবদ্ধ করে। ইজারা নিয়ন্ত্রণ শিরোনামগুলি লগ থেকে সরানো হয়, অনুরোধের স্ন্যাপশটগুলি এবং আপস্ট্রিম নির্বাহক শিরোনামগুলি ধরে রাখা হয়৷

যদি সাধারণ রাউটিং-এ যোগ্য পরিচালিত প্রার্থী থাকে কিন্তু প্রতিটি মুক্ত প্রার্থী একটি বিদেশী সক্রিয় ইজারা দ্বারা দখল করা হয়, OmniRoute HTTP `429`, ইজারা-ক্ষমতা-অনুপলব্ধ কোড, একটি অপেক্ষার জন্য-ক্ষমতার অবস্থা, এবং একটি আবদ্ধ `Retry-After` ফেরত দেয় যা প্রাসঙ্গিক মেয়াদ শেষ হওয়ার আগে থেকে প্রাপ্ত হয়। সাধারণ খালি যোগ্যতা ইজারা বিবাদ নয় এবং এর বিদ্যমান রাউটিং ত্রুটি শব্দার্থিকতা রাখে।

সম্পর্কিত প্রক্রিয়া পৃথক থাকে:

- OAuth সেশন অকুপেন্সি হল OAuth অ্যাকাউন্টের জন্য প্রক্রিয়া-স্থানীয় সফট ডিস্ট্রিবিউশন।
- অ্যাকাউন্টের সেমাফোরস অনুরোধ-সহযোগীতার অনুমতি দেয় এবং একটি অনুরোধ সম্পূর্ণ হলে শেষ হয়।
- একচেটিয়া পরিচালিত সেশন লিজ একটি প্রজন্মের বেড়া সঙ্গে টেকসই জীবনচক্র মালিকানা হয়.

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

## 4. কোটা-শেয়ার কনকারেন্সি কন্ট্রোল (v3.8.36)

সাবস্ক্রিপশন অ্যাকাউন্ট (GLM, MiniMax, ইত্যাদি) প্রায়ই শুধুমাত্র ~ 1-3 সমবর্তী অনুরোধ গ্রহণ করে; অতিক্রম করলে 429 এবং কুলডাউন ট্রিগার হয়। এই অধীন তীব্র** কোটা ভাগ** (`qtSd/…`) কম্বোস, যেখানে একাধিক API কী একটি আপস্ট্রিম অ্যাকাউন্ট শেয়ার করে। তিনটি স্তর প্লাবিত হওয়া থেকে একটি ভাগ করা অ্যাকাউন্ট রাখে।

### প্রতি-সংযোগ সঙ্গতি ক্যাপ (`max_concurrent`)

প্রতিটি প্রদানকারী সংযোগ একটি `max_concurrent` সিলিং ঘোষণা করতে পারে (`provider_connections.max_concurrent`, সংযোগ মোডালে সেট করা / API / DB)। কোন সীমা জন্য এটি খালি ছেড়ে দিন. এটি একটি একক গাঁট যা — নীচের ক্রমিককরণ স্তরটিকে চালিত করে এটিকে অ্যাকাউন্টের আসল একত্রে সেট করে (যেমন GLM ~ 1, MiniMax ~ 2)।

### প্রতি মডেল কনকারেন্সি ক্যাপস (`modelConcurrency`)

একটি সংযোগ অতিরিক্তভাবে তার `rateLimitOverrides` মানচিত্রের মধ্যে সঠিক প্রতি-মডেল কনকারেন্সি সিলিং ঘোষণা করতে পারে:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

এটি সংযোগ মোডেলে সেট করুন (** হারের সীমা → প্রতি মডেল কনকারেন্সি ক্যাপ ওভাররাইড করে** , প্রতি লাইনে এক `model=cap` ) অথবা একই JSON আকার সহ `PATCH /api/providers/[id]` মাধ্যমে। মূল শব্দার্থবিদ্যা:

- **সংযোগ-বিস্তৃত বনাম মডেল-নির্দিষ্ট:** `maxConcurrent` শেয়ার্ড কানেকশন-ওয়াইড সিলিং রয়ে গেছে। যখন উভয়ই প্রযোজ্য হয়, উভয় গেট একই যৌগিক গেটে পারমাণবিকভাবে অর্জিত হয় (`global → provider → account → model`); কার্যকর আচরণ হল কঠোর প্রযোজ্য সীমা।
- **সঠিক মডেল-কী মিল:** চাবি হল মডেল স্ট্রিং যা — রাউটিং রেজোলিউশনের পরে নির্বাহকের কাছে পাস করা হয় সাধারণত বেয়ার আপস্ট্রিম মডেল আইডি (`glm-5`), ক্লায়েন্ট-সাইড `provider/model` alias নয় (`zai/glm-5` `glm-5` সাথে মেলে না)। মান হল ধনাত্মক-পূর্ণসংখ্যা সমবর্তী-অনুরোধ সিলিং।
- **স্থানীয় সারিবদ্ধ, কোন আবিষ্কার নেই:** অতিরিক্ত অনুরোধ স্থানীয়ভাবে বিদ্যমান queue/timeout শব্দার্থবিদ্যা (টাইপ করা `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` ভর্তি ত্রুটি) সঙ্গে সারিবদ্ধ. OmniRoute আপস্ট্রিম পলিসি আবিষ্কার বা অনুমান করে না — এটি অপারেটর কনফিগার করা সঠিক সিলিং প্রয়োগ করে। একটি স্যাচুরেটেড মডেল গেট কখনই প্রদানকারীকে নিষ্ক্রিয় করে না এবং একটি স্থায়ী মডেল লকআউট তৈরি করে না; আপস্ট্রিম 429/cooldown/fallback আচরণ ত্রুটি ব্যাকস্টপ থেকে যায়।
- **প্রতি-সংযোগ, প্রতি-প্রক্রিয়ার সুযোগ:** ক্যাপগুলি ডাটাবেস সংযোগ প্রতি এবং মেমরিতে রাখা হয়, তাই একই আপস্ট্রিম API কী পুনরায় ব্যবহার করে দুটি সংযোগ একে অপরের সাথে সমন্বয় করে না।
- **অপরিবর্তিত মানে অপরিবর্তিত:** মানচিত্রটি বাদ দিলে (বা ড্যাশবোর্ড ক্ষেত্রটি ফাঁকা রেখে) কোনো মডেল গেট যোগ করে না। কোনো সার্বজনীন প্রদানকারীর সীমা জাহির না করে উদাহরণ কনফিগারেশন:

```text
glm-5=1
glm-4.7=3
```

### কোটা-শেয়ার অনুরোধ ক্রমিককরণ

যখন একটি কোটা-শেয়ার প্রেরন একটি সংযোগকে লক্ষ্য করে যা একটি ইতিবাচক `max_concurrent` ঘোষণা করে, তখন সেটির সমবর্তী অনুরোধ** অ্যাকাউন্ট** প্রতি-সংযোগ সেমাফোর (কী `qsconn:<connectionId>`) এর মাধ্যমে ক্রমিক করা হয় : অতিরিক্ত অনুরোধ** সারিতে অপেক্ষা করুন** পরিবর্তে অ্যাকাউন্ট বন্যা. এটা** ব্যর্থ-খোলা** — একটি স্যাচুরেটেড কিউ বা টাইমআউট একটি স্লট ছাড়াই অগ্রসর হয় বরং একটি প্রেরণযোগ্য অনুরোধ প্রত্যাখ্যান করার পরিবর্তে। টগল ইন** সেটিংস → স্থিতিস্থাপকতা → কোটা-শেয়ার প্রতি-সংযোগ সহযোগিতা** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ডিফল্ট অন)। একটি `max_concurrent` ক্যাপ ছাড়া আচরণ অপরিবর্তিত।

> কোটা-শেয়ার রাউটিং গেট (`selectQuotaShareTarget`, DRR + P2C) নিজেই ব্যর্থ-খোলা এবং শুধুমাত্র _deprioritizes_ একটি অ্যাট-ক্যাপ সংযোগ — একটি একক-সংযোগ পুলের সাথে এটি হার্ড-লিমিট করতে পারে না, তাই এই সেমাফোরই আসলে বন্যা ধারণ করে।

### কম্বো কুলডাউন-সচেতন পুনরায় চেষ্টা করুন

প্রতিটি কম্বো কৌশলের জন্য (যখন সক্রিয় করা হয়), একটি অনুরোধ যা একটি 429 কে স্ফটিক করে একটি SHORT ক্ষণস্থায়ী কুলডাউনের জন্য অপেক্ষা করে এবং 429 — ফেরত দেওয়ার পরিবর্তে পুনরায় প্রেরণ করে এটি জেমিনি-শ্রেণির TPM/RPM উইন্ডো (~ 60s retry-after) কভার করে একটি মাল্টি-মডেল উভয় কম্বো-এর টার্গেট-2 কম্বোতে প্রতি মডেল হার সীমা। `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) দ্বারা আবদ্ধ** সেটিংস → স্থিতিস্থাপকতা** . এটি কখনই `quota_exhausted` (মধ্যরাত পর্যন্ত লক) বা auth/not-found কারণে অপেক্ষা করে না। `comboTimeoutMs` সেটের সাথে, একটি অপেক্ষা যা শেষ করতে পারে না সেই সময়সীমার আগে শুরু হয় না (#18998): কম্বো `COMBO_TIMEOUT` 504 এর পরিবর্তে তার টার্মিনাল প্রতিক্রিয়া সহ একবারে উত্তর দেয়।

একটি কম্বো `config.comboCooldownWaitEnabled: false` এর সাথে অপ্ট আউট করতে পারে। শুধুমাত্র আক্ষরিক `false` এই শেয়ার করা কম্বো ওয়েট (পোস্ট-ডিসপ্যাচ কুলডাউন এবং প্রি-ডিসপ্যাচ circuit-open/model-lock অপেক্ষা) এবং তাদের অপেক্ষা-বাজেট টাইমআউট-ফ্লোর এক্সটেনশনকে নিষ্ক্রিয় করে। অনুপস্থিত বা `true` বিশ্বব্যাপী নীতি সংরক্ষণ করে; `true` বিশ্বব্যাপী অক্ষম অপেক্ষা সক্ষম করতে পারে না। একটি স্পষ্ট `targetTimeoutMs` এখনও জয়ী হয়। এই অপ্ট-আউট পৃথক নেটিভ-কোডেক্স টার্ন-পিন প্রি-ডিসপ্যাচ অপেক্ষা পরিবর্তন করে না।

একই গেটটি প্রি-ডিসপ্যাচ কেস (#16319) কভার করে : যখন একটি কম্বোর প্রতিটি টার্গেট কোনো চেষ্টা করার আগে এড়িয়ে যায় কারণ এর মডেলটি একটি সংক্ষিপ্ত ক্ষণস্থায়ী লকআউটে বসে থাকে, তখন শূন্য-প্রয়াস পথটি একই সিলিং-এর নিচে লক আউটের জন্য অপেক্ষা করে এবং ইঙ্গিতহীন `503 ALL_TARGETS_SKIPPED` উত্তর না দিয়ে পুনরায় প্রেরণ করে। যখন কোন অপেক্ষার অনুমতি দেওয়া হয় না (সিলিং, প্রচেষ্টা বা বাজেট শেষ, বা বৈশিষ্ট্য বন্ধ), টার্মিনাল রেসপন্স `429 rate_limit_error` তে আপগ্রেড হয় যা `retry_after` / `reset_at` বহন করে ক্ষণস্থায়ী লক মেয়াদ শেষ হওয়ার পর থেকে; কোটা, প্রমাণীকরণ এবং পাওয়া না পাওয়া লকগুলি ইঙ্গিত-কম 503 রাখে।

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

## অন্যান্য স্থিতিস্থাপকতা বৈশিষ্ট্য

- **22 রাউটিং কৌশল** (অগ্রাধিকার, ওজনযুক্ত, রাউন্ড-রবিন, প্রসঙ্গ-রিলে, ফিল-ফার্স্ট, p2c, র্যান্ডম, কম-ব্যবহৃত, খরচ-অপ্টিমাইজ করা, রিসেট-সচেতন, রিসেট-উইন্ডো, মেয়াদ-প্রথম, হেডরুম, কোটা-ওয়েটেড, কঠোর-এলোমেলো, অটো, lkgp, প্রসঙ্গ-অপ্টিমাইজ করা, পাইপলাইন, ক্যাপটিমাইজড, ক্যাপলাইন — দেখুন [AUTO-COMBO.md](../routing/AUTO-COMBO.md)
- **রিসেট-সচেতন রাউটিং** (v3.8.0) — কোটা রিসেট সময় দ্বারা সংযোগগুলিকে অগ্রাধিকার দেয়৷
- **পটভূমি মোড অবক্ষয়** — প্রতিক্রিয়া API `background: true` সতর্কতার সাথে সিঙ্ক করার জন্য অবনমিত।
- **গতিশীল টুল সীমা সনাক্তকরণ** টুল গণনা সীমা আঘাত করা হলে — প্রদানকারীদের পিছিয়ে দেয়।
- **জরুরী ফলব্যাক** — `OMNIROUTE_EMERGENCY_FALLBACK` দ্বারা নিয়ন্ত্রিত; অপারেটররা এটিকে ফিচার ফ্ল্যাগ পৃষ্ঠা থেকে রিস্টার্ট না করে ওভাররাইড করতে পারে।

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
