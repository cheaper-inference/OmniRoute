# Resilience Guide (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute میں تین الگ لیکن متعلقہ لچکدار میکانزم ہیں۔ ہر ایک کا الگ دائرہ اور مقصد ہے۔ روٹنگ رویے کو ڈیبگ کرتے وقت انہیں الگ رکھیں۔

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> ماخذ: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **لچکدار ٹوگلز کے لیے Env-vs- ڈیش بورڈ کی ترجیح۔** آپٹ ان لچکدار ماحول — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — صرف _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`) فراہم کرتا ہے۔ ایک بولین `resilienceSettings` میں برقرار رہا (ڈیش بورڈ →** ترتیبات → لچک** / `PATCH /api/resilience`، `key_value` میں ذخیرہ شدہ ) env قدر پر جیت جاتا ہے: نارملائزیشن (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) ذخیرہ شدہ بولین کو برقرار رکھتی ہے جب بھی کوئی موجود ہو۔ ایسی env var کو ایک تعیناتی پر `true` پر سیٹ کرنا جہاں ڈیش بورڈ نے پہلے سے ہی `false` محفوظ کیا ہوا ہے لہذا کچھ بھی نہیں بدلتا — ٹوگل کو پلٹائیں** ترتیبات → لچک** (یا ذخیرہ شدہ فیلڈ کو صاف کریں) اس کے بجائے۔

## 1. پرووائیڈر سرکٹ بریکر

**دائرہ کار:** پورا پرووائیڈر (مثلاً `glm`، `openai`، `anthropic`)۔

**مقصد:** ایسے پرووائیڈر کو ٹریفک بھیجنا روکنا جو اپ اسٹریم/سروس کی سطح پر بار بار ناکام ہو رہا ہو۔

**عمل درآمد:**

- بنیادی کلاس: `src/shared/utils/circuitBreaker.ts`
- وائرنگ: `src/sse/handlers/chatHelpers.ts`، `src/sse/handlers/chat.ts`
- اسٹیٹس API: `GET /api/monitoring/health`
- ری سیٹ API: `POST /api/resilience/reset`
- ریپرز: `open-sse/services/accountFallback.ts`
- ڈیٹابیس ٹیبل: `domain_circuit_breakers`

**حالتیں:**

- `CLOSED` — عام ٹریفک کی اجازت ہے
- `DEGRADED` — ٹریفک اب بھی جاری ہے، لیکن پرووائیڈر کی بڑھتی ہوئی ناکامیوں کو ٹریک کیا جا رہا ہے؛ کافی کامیابیوں پر، کسی درست کنکشن ٹیسٹ پر، یا آخری ناکامی کی قسم کے لیے سب سے طویل `OPEN` ہولڈ (اس کی `cooldownByKind` قیمت، ورنہ `resetTimeout`، × `maxBackoffMultiplier`، کم از کم ایک کول ڈاؤن) کے بعد بغیر کسی نئی ناکامی کے `CLOSED` پر واپس آ جاتا ہے
- `OPEN` — پرووائیڈر عارضی طور پر بلاک؛ کومبو روٹنگ اسے نظرانداز کر دیتی ہے
- `HALF_OPEN` — ری سیٹ ٹائم آؤٹ پورا ہو چکا؛ جانچ (probe) کی درخواست کی اجازت ہے

**قابلِ ترتیب ڈیفالٹ اقدار (`open-sse/config/constants.ts`، ڈیش بورڈ → ترتیبات → لچک میں ظاہر شدہ):**

| کلاس    | DEGRADED ہونے کی حد | OPEN ہونے کی حد | ری سیٹ ٹائم آؤٹ |
| ------- | ------------------- | --------------- | --------------- |
| OAuth   | 5 ناکامیاں          | 8 ناکامیاں      | 60s             |
| API-key | 7 ناکامیاں          | 12 ناکامیاں     | 30s             |
| Local   | اخذ شدہ             | 2 ناکامیاں      | 15s             |

`degradationThreshold` یہ طے کرتا ہے کہ پرووائیڈر کب `DEGRADED` میں داخل ہوتا ہے؛ `failureThreshold` یہ طے کرتا ہے کہ وہ کب `OPEN` ہو کر نظرانداز ہوتا ہے۔ مقامی (Local) پرووائیڈر پروفائلز ابھی لچک کی ترتیبات کے صفحے پر ظاہر نہیں کیے گئے۔

**ٹرپ کوڈز:** صرف پرووائیڈر سطح کے اسٹیٹس `[408, 500, 502, 503, 504]`۔ اکاؤنٹ سطح کی خرابیوں (زیادہ تر 401/403/429 — وہ کول ڈاؤن یا لاک آؤٹ سے متعلق ہیں) پر ٹرپ نہ ہوں۔

**لیزی ریکوری:** جب `OPEN` کی مدت ختم ہو جاتی ہے تو `getStatus()`، `canExecute()`، `getRetryAfterMs()` حالت کو `HALF_OPEN` پر تازہ کر دیتے ہیں۔ یہی ریڈز (اور اگلی ناکامی) باسی `DEGRADED` کو آہستہ آہستہ `CLOSED` پر لوٹا دیتی ہیں۔ کسی بیک گراؤنڈ ٹائمر کی ضرورت نہیں۔

---

### اختیاری (opt-in) عالمی پرووائیڈر کول ڈاؤن (ونڈو گیٹ)

ایک چوتھی، **اختیاری** پرت (`PROVIDER_COOLDOWN_ENABLED`، ڈیفالٹ **آف**) ناکام ہوتے پرووائیڈرز کی درخواستوں کے درمیانی یادداشت `open-sse/services/providerCooldownTracker.ts` میں محفوظ رکھتی ہے، جس سے کومبو ٹارگٹ ریزولوشن رجوع کرتی ہے تاکہ مسلسل کومبو درخواستیں کسی حال ہی میں ناکام ہوئے پرووائیڈر کو بار بار دوبارہ نہ آزمائیں۔ پرووائیڈر سطح کی انٹریاں `PROVIDER_PROFILES` ونڈو گیٹ کی پابند ہوتی ہیں:

| پروفائل | کتنی ناکامیوں کے بعد ٹرپ (`providerFailureThreshold`) | کس ونڈو کے اندر (`providerFailureWindowMs`) | کتنی دیر کول ڈاؤن (`providerCooldownMs`) |
| ------- | ----------------------------------------------------: | ------------------------------------------: | ---------------------------------------: |
| OAuth   |                                                  `10` |                                     `15min` |                                   `5min` |
| API key |                                                  `15` |                                     `30min` |                                  `10min` |

حد سے کم رہنے پر پرووائیڈر کو کول ڈاؤن میں **نہیں** سمجھا جاتا؛ ایک کامیابی ونڈو کو صاف کر دیتی ہے۔ کنکشن سطح کی انٹریاں (`provider:connectionId`) اس کے بجائے ایکسپونینشل `minRetryCooldownMs → maxRetryCooldownMs` بیک آف برقرار رکھتی ہیں۔ اووررائیڈز: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`۔ ریگریشن گارڈ: `tests/unit/provider-cooldown-window-gate.test.ts`۔

## 2. کنکشن کول ڈاؤن

**دائرۂ کار:** واحد provider کنکشن/اکاؤنٹ/کلید۔

**مقصد:** ایک خراب کلید کو نظرانداز کرنا، جبکہ اسی provider کے دیگر کنکشن سروس فراہم کرتے رہیں۔

**عمل درآمد:**

- دستیاب نہ ہونے کی نشان دہی: `src/sse/services/auth.ts::markAccountUnavailable()`
- انتخاب: اسی فائل میں `getProviderCredentials*`
- کول ڈاؤن کا حساب: `open-sse/services/accountFallback.ts::checkFallbackError()`
- ترتیبات: `src/lib/resilience/settings.ts`

**ہر کنکشن کے لیے فیلڈز:**

- `rateLimitedUntil` — وہ ٹائم اسٹیمپ جس تک کول ڈاؤن ختم ہو جائے گا
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — ایکسپونینشل بیک آف کاؤنٹر

**پہلے سے طے شدہ کول ڈاؤنز:**

- OAuth کی بنیادی مدت: 5s
- API-key کی بنیادی مدت: 3s
- API-key 429: ترجیح upstream `Retry-After`/ری سیٹ ہیڈرز/قابلِ تجزیہ ری سیٹ متن کو دی جاتی ہے
- بیک آف: `baseCooldownMs * 2 ** failureIndex`

**فی-provider دوبارہ کوشش کا وقفہ۔** Provider کی تفصیلی صفحہ پر **Retry delay** سلیکٹ موجود ہے (Auto، 15s سے 1h تک)۔ یہ `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` کو محفوظ کرتا ہے (1–21600، `PATCH /api/resilience` کے ذریعے)۔ جب rate-limit خرابی میں upstream دوبارہ کوشش کا کوئی اشارہ موجود نہ ہو، تو یہ قدر provider کے لیے scaled backoff کی جگہ لے لیتی ہے اور `backoffLevel` کو 0 پر ری سیٹ کر دیتی ہے (`open-sse/services/rotationConfig.ts::overrideFor`)۔ Rate-limited خرابی کے لیے ترجیح کی ترتیب، زیادہ سے کم، یہ ہے: upstream دوبارہ کوشش کا اشارہ، پھر فی کنکشن `providerSpecificData.rotationOverrides.rateLimitResetSeconds`، پھر فی-provider دوبارہ کوشش کا وقفہ، پھر env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`، اور آخر میں scaled backoff۔ Auto فیلڈ کو ہٹا دیتا ہے۔ یہ صرف rate-limit وجہ پر اثر انداز ہوتا ہے، terminal states پر کبھی نہیں۔

**Anti-thundering-herd حفاظتی بندوبست:** بیک وقت ہونے والی خرابیوں کو کول ڈاؤن میں حد سے زیادہ اضافہ کرنے یا `backoffLevel` کو دو بار بڑھانے سے روکتا ہے۔

**Concurrency-limit 429s بیک آف کی سیڑھی پر نہیں بڑھتے۔** ایسا `429` جس کی body concurrency limit رپورٹ کرے ("too many concurrent requests"، "concurrency limit"، "parallel request limit"، GLM `并发数过高`)، اس کا مطلب ہے کہ اکاؤنٹ درست ہے لیکن مصروف ہے۔
`checkFallbackError()` وجہ `concurrency_limited` واپس کرتا ہے: فوراً اگلے کنکشن پر منتقل ہو جائیں، اس کنکشن کو ایک مقررہ `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) یا upstream دوبارہ کوشش کے اشارے کے لیے ٹھنڈا کریں، `backoffLevel` کو برقرار رکھیں، اور `skipProviderBreaker` سیٹ کریں۔
واضح quota body کو اب بھی ترجیح حاصل ہے، اس لیے ایسی body جو quota pattern سے بھی مطابقت رکھتی ہو، quota کا فیصلہ ہی برقرار رکھتی ہے۔ شناخت: `src/shared/utils/classify429.ts` میں `looksLikeConcurrencyLimit()`؛ فیصلہ: `open-sse/services/accountFallback/concurrencyLimit429.ts`۔ `classify429()` (breaker کا `FailureKind`) تبدیل نہیں ہوتا اور ایسی bodies کے لیے اب بھی `rate_limit` پڑھتا ہے۔

**Stream content stalls اکاؤنٹ کو ٹھنڈا نہیں کرتے۔** جب content-stall watchdog (`open-sse/utils/streamHandler.ts`) ایسے stream کو ترک کر دیتا ہے جس نے مقررہ وقت میں کوئی model output نہیں بھیجا، تو `markAccountUnavailable()` کنکشن پر خرابی ریکارڈ کرتا ہے لیکن کوئی کول ڈاؤن سیٹ نہیں کرتا: stall اسی request سے متعلق ہوتا ہے، عموماً ایک طویل reasoning turn سے جس کا output ابھی نہیں آیا ہوتا۔ آپریٹرز `resilienceSettings.streamStallCooldown.enabled` (پہلے سے طے شدہ `false`) کے ذریعے اسے اختیاری طور پر فعال کر سکتے ہیں۔

**`p2c` اکاؤنٹ انتخاب کے لیے اختیاری latency signal۔** ہر dispatched کوشش ہر کنکشن (اور ہر کنکشن + model) کے لیے وقتِ تاخیر تا اوّلین بائٹ اور نتیجہ ایک in-memory rolling window میں ریکارڈ کرتی ہے: 15 منٹ کے اندر آخری 20 نمونے (`open-sse/services/connectionLatencyTracker.ts`، `src/sse/handlers/chatHelpers.ts` میں `safeLogEvents()` سے ریکارڈ کیے جاتے ہیں)۔ جب `resilienceSettings.p2cLatency.weight` `0` سے زیادہ ہو (حد 0-20، پہلے سے طے شدہ `0` = بند)، تو `src/sse/services/auth.ts` میں `compareP2CConnections()` جوڑے کے ہر امیدوار کو زیادہ سے زیادہ `weight` پوائنٹس دیتا ہے۔ ان میں نصف تیز تر امیدوار کے مقابلے میں latency کے تناسب سے آتے ہیں (دو گنا سست ہونے پر پورے نصف پوائنٹس) اور نصف rolling error rate سے۔ یہ جزو صرف اس وقت لاگو ہوتا ہے جب دونوں امیدواروں کے پاس کم از کم 3 نمونے ہوں، تاکہ نئے اکاؤنٹس کو سزا نہ ملے، اور اس کی زیادہ سے زیادہ حد quota-blocked اور quota-exhausted penalties سے کم رہتی ہے۔ یہ اپنا کوئی circuit شامل نہیں کرتا: ناکام اکاؤنٹس کو اب بھی کول ڈاؤن، lockout اور breaker layers سنبھالتی ہیں۔ اسے `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` کے ذریعے سیٹ کریں۔

**Reasoning frames content-stall بجٹ کو دوبارہ شروع کرتے ہیں۔** ایک reasoning model اپنے پہلے ظاہر ہونے والے token سے پہلے کئی منٹ تک سوچ سکتا ہے: Claude ایسے `thinking_delta` frames stream کرتا ہے جن کا thinking text خالی ہو سکتا ہے، اور Responses API یکے بعد دیگرے reasoning item stream کرتی ہے۔ `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) ان frames کو پہچانتا ہے، اور watchdog ہر frame پر turn منسوخ کرنے کے بجائے اپنا بجٹ دوبارہ شروع کرتا ہے۔ یہ اب بھی model output نہیں ہوتے، اس لیے صرف reasoning پر ختم ہونے والا turn اب بھی empty رپورٹ ہوتا ہے، اور جو turn reasoning روک کر صرف heartbeats بھیجتا ہے وہ اب بھی watchdog کو متحرک کرتا ہے۔

غیر خالی signature والے Kiro کے binary `reasoningContentEvent` frames اس reasoning activity کو executor کے ذریعے خالی `reasoning_content` delta کے طور پر برقرار رکھتے ہیں۔ signature آگے منتقل نہیں کیا جاتا۔ Metadata، نامکمل frames اور خالی signatures content budget کو دوبارہ شروع نہیں کرتے؛ آزاد active-stream timeout اور client cancellation اب بھی لاگو رہتے ہیں (`open-sse/executors/kiro/reasoning.ts`)۔

**Terminal states (کول ڈاؤن نہیں ہیں):**

- `banned` — banned-keyword / account-ban detection کے ذریعے سیٹ ہوتا ہے ([BAN_DETECTION](../security/BAN_DETECTION.md) دیکھیں)۔ Upstream فی-request refusals (`request_rejected`، مثلاً Anthropic OAuth 403 "Request not allowed") اسے کبھی سیٹ نہیں کرتیں: انہیں فی کنکشن اور model شمار کیا جاتا ہے اور بڑھتے ہوئے کول ڈاؤن کے ساتھ اس model کو rotation سے خارج کر دیا جاتا ہے، جس کی زیادہ سے زیادہ حد `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h) ہے، یا جب کوئی model معلوم نہ ہو تو کنکشن کو ٹھنڈا کر دیا جاتا ہے — `open-sse/services/requestRejectedStreak.ts`
- `expired` (محدود retries کے بعد terminal میں منتقل ہوتا ہے — exponential backoff کے ساتھ `EXPIRED_RETRY_MAX = 3` — تاکہ عارضی OAuth errors اکاؤنٹ کو مستقل طور پر غیر فعال کرنے سے پہلے خود بحال ہو سکیں)
- `credits_exhausted`

یہ اس وقت تک برقرار رہتے ہیں جب تک credentials تبدیل نہ کیے جائیں یا کوئی operator انہیں reset نہ کرے۔ terminal states کو transient cooldown state سے overwrite نہ کریں۔

**Lazy recovery:** جب `rateLimitedUntil` گزر جائے تو connection دوبارہ eligible ہو جاتا ہے۔ کامیاب استعمال پر `clearAccountError()` تمام error fields صاف کر دیتا ہے۔

### Claude OAuth استعمال کی حد: کم ترجیحی لین + session-limit reset

**دائرۂ کار:** ایک Claude subscription (OAuth) connection۔ دونوں features **ہر connection کے لیے opt-in** ہیں (Edit connection → Claude section → `lowPriorityMode` / `autoLimitReset` in `providerSpecificData`، دونوں بطور default off ہیں) اور Claude Code کے `/low-priority` اور `/limit-reset` commands کی عکاسی کرتے ہیں (wire contract، Claude Code 2.1.263 سے حاصل کیا گیا ہے)۔

**Implementation:**

- State machine + response classification: `open-sse/services/claudeLowPriority.ts`
- Reset status/claim client: `open-sse/services/claudeLimitReset.ts`
- Executor hook (header injection + same-account retry): `open-sse/executors/base.ts::execute()`
- Opt-in persistence: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Trigger:** 5-hour usage wall — ایسا `429` جس کے headers میں
`anthropic-ratelimit-unified-status: rejected` ہو اور، جب account eligible ہو،
`anthropic-ratelimit-unified-slow-offer: treatment` موجود ہو۔ اس پہلے wall
429 سے پہلے کچھ بھی نہیں بھیجا جاتا؛ unified headers کے بغیر burst 429 معمول کے cooldown path سے گزرتا ہے۔

**کم ترجیحی لین** (`lowPriorityMode`):

- wall 429 پر executor offer قبول کرتا ہے اور فوراً **اسی** account پر
  `anthropic-usage-limit: slow` کے ساتھ دوبارہ کوشش کرتا ہے؛ اعلان کردہ
  `anthropic-ratelimit-unified-reset` (+60s grace) تک لین فعال رہتی ہے اور اس window میں ہر request header لے کر جاتی ہے۔ intercept کیا گیا 429 کبھی `handleChatCore` تک نہیں پہنچتا، اس لیے connection کو cooldown میں نہیں ڈالا جاتا اور نہ ہی اسے rotate کر کے ہٹایا جاتا ہے۔
- بعد کے responses میں `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`
  لین کو برقرار رکھتے ہیں؛ `slot_busy` (429) یا `529` پر server کے
  `anthropic-ratelimit-unified-slow-retry-after` کا انتظار کیا جاتا ہے (default 20s، clamp 5–600s، ±30% jitter)
  اور دوبارہ کوشش کی جاتی ہے، جس کی حد `anthropic-ratelimit-unified-slow-max-wait` سے مقرر ہوتی ہے (default 20 min، clamp
  1 min–6 h) — اس حد کے بعد لین ختم ہو جاتی ہے اور 10-minute cool-off دوبارہ قبول کیے جانے کو روکتا ہے۔ انتظار کو request کے اپنے upstream-start timeout
  (`resolveFetchStartTimeout`، default طور پر 10 min) میں باقی وقت، منفی 5 s margin، سے بھی محدود کیا جاتا ہے: اس cap کے بغیر
  20-minute default max-wait request سے زیادہ دیر تک چلتا اور sleep دورانِ انتظار abort ہو جاتی، جس سے graceful
  `max_wait` end + cool-off کے بجائے `TimeoutError` ظاہر ہوتا۔
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`، 5h-window rollover، یا
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (جو اسے کسی بھی status پر
  `extra_usage` کے طور پر ختم کرتا ہے، کیونکہ اب paid overage wall کو cover کرتا ہے) لین ختم کر دیتے ہیں؛ اس کے بعد response معمول کے cooldown path سے گزرتا ہے۔ `budget_exhausted` کو اعلان کردہ budget reset (≤ 8 days) تک یاد رکھا جاتا ہے۔
- wall check executor کی اپنی 400-driven intra-attempt retries (context
  editing، thinking/effort clamps، param auto-learn) کے بعد چلتا ہے، اس لیے اگر wall 429 صرف ان retries میں سے کسی ایک پر ظاہر ہو تو بھی اسے cooldown path تک پہنچنے کے بجائے intercept کیا جاتا ہے۔
- State ہر connection کے لیے memory میں ہوتی ہے (restart کے بعد دوبارہ قبول کرنے کے لیے ایک اضافی wall 429 درکار ہوتا ہے)۔

**Session-limit reset** (`autoLimitReset`، دونوں فعال ہونے پر لین سے پہلے آزمایا جاتا ہے):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  block؛ جب `arm: "reset"` اور `available: true` ہوں،
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` کے ساتھ
  `{ "program": "juniper_tide" }` (organization UUID، `providerSpecificData.organizationUUID` سے؛ bootstrap fallback)۔
- `result: reset|not_limited` → request کو پوری رفتار پر دوبارہ آزمایا جاتا ہے (slow header کے بغیر)۔
  `already_used` / `not_offered`، `next_available_at` کو memoise کرتے ہیں (default one week)؛ کسی بھی failure پر 15 minutes کا backoff ہوتا ہے۔ reset ہفتے میں ایک بار ہوتا ہے اور پھر بھی weekly limit میں شمار ہوتا ہے۔

Regression guards: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### خودکار طور پر لاگو بینک شدہ ری سیٹس

**دائرہ کار:** Codex اور Claude سبسکرپشن (OAuth) کنکشنز۔**آپٹ ان** : `bankedResetAutoApply` سیٹنگ آف ہے اور `dry-run` موڈ میں بذریعہ ڈیفالٹ (ترتیبات → AI → آٹو اپلائی بینکڈ ری سیٹس)۔

**مقصد:** جب کوئی اکاؤنٹ استعمال کی دیوار سے ٹکرا جاتا ہے تو آپریٹر کی جانب سے فراہم کنندہ کی حدود کے صفحہ پر "ریڈیم" کو دبانے کا انتظار کرنے کے بجائے خود ہی بینکڈ ری سیٹ خرچ کریں۔

| کریڈٹ کی قسم (`creditTypes`) | جو چھڑایا جاتا ہے۔                       | جہاں یہ چلتا ہے۔                                                        |
| ---------------------------- | ---------------------------------------- | ----------------------------------------------------------------------- |
| `codexCredits`               | Codex ری سیٹ کریڈٹس                      | پس منظر کا کام، ہر 60 سیکنڈ                                             |
| `claudeCredits`              | Claude بینکڈ گرانٹس (`GRANT` کریڈٹ)      | پس منظر کا کام، ہر 60 سیکنڈ                                             |
| `claudeSessionReset`         | Claude ہفتہ وار سیشن کی حد ری سیٹ (اوپر) | راہ کی درخواست کریں، اسی پالیسی کے ذریعے جس طرح فی اکاؤنٹ ٹوگل ہوتا ہے۔ |

**نفاذ:**

- خالص فیصلہ (دونوں راستوں کے لیے ایک اصول مقرر): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- پس منظر کا کام: `src/lib/services/bankedResetAutoApply.ts` ( `src/instrumentation-node.ts` میں شروع ہوا)
- Claude ریکوسٹ پاتھ گیٹ: `src/lib/usage/claudeSessionResetPolicy.ts`، `open-sse/services/claudeLimitReset.ts` میں `setClaudeLimitResetPolicy()` کے ذریعے رجسٹرڈ
- تاریخ، کیپس اور ویب ہک: `src/lib/usage/bankedResetAudit.ts`
- ہسٹری API: `GET /api/settings/banked-reset-auto/history?limit=50` (انتظام کی توثیق)

**فیصلہ کا حکم** (پہلا ناکام اصول ریکارڈ شدہ وجہ ہے):

1. فیچر آف، کریڈٹ ٹائپ آف، یا اکاؤنٹ آف سکوپ (`accountScope` `all` / `selected` پلس فی اکاؤنٹ `connections` نقشہ)۔
2. اختیاری UTC شیڈول سے باہر (`startHourUtc` > `endHourUtc` آدھی رات کو کراس کرتا ہے)۔
3. آخری 24 گھنٹوں کے دوران کیپس: `maxPerAccountPerDay` (1) `maxPerDay` (3) اور `minSpacingMinutes` (30) کسی بھی دو چھٹکارے کے درمیان۔
4. ٹرگر: ایک دیوار والی `session` یا `weekly` ونڈو ( `getQuotaWindowStatus().reachedThreshold` سے پڑھیں، `isAccountQuotaExhausted()` سے نہیں، جو صرف خرچ کی گئی ہر ونڈو کے ساتھ ایک اکاؤنٹ کی اطلاع دیتا ہے)، یا `expiringCreditHours` (24) کے اندر ختم ہونے والا کریڈٹ ایسے اکاؤنٹ پر جس نے کم از کم `expiringCreditMinUsedPercent` (50) استعمال کیا ہو۔
5. قدرتی ری سیٹ گارڈ: جب دیوار والی 5 گھنٹے والی ونڈو `sessionResetGuardMinutes` (90) کے اندر دوبارہ سیٹ ہو جائے، یا `weeklyResetGuardHours` (12) کے اندر دیوار والی ہفتہ وار ونڈو دوبارہ سیٹ ہو جائے تو اسے چھوڑ دیں۔
6. ہفتہ وار منزل: جب ہفتہ وار باقی `weeklyFloorPercent` (10) سے کم ہو تو 5 گھنٹے کا ری سیٹ چھوڑ دیں۔
7. `last-resort` موڈ: چھوڑیں جب کہ اسی فراہم کنندہ کے ایک اور ان اسکوپ اکاؤنٹ میں دونوں ونڈوز میں کم از کم `poolHeadroomPercent` (10) باقی ہے۔ ایکسپائرنگ کریڈٹ ٹرگرز اس کو نظرانداز کرتے ہیں۔
8. `dry-run` ایک قطار کو ریکارڈ کرتا ہے اور کچھ بھی نہیں چھڑاتا ہے۔ `last-resort` اور `eager` چھڑانا۔

گمشدہ کوٹہ ڈیٹا کبھی بھی چھٹکارے کو غیر مقفل نہیں کرتا ہے: دوبارہ ترتیب دینے کا نامعلوم وقت یا ہفتہ وار استعمال چھوڑ دیتا ہے۔

**Claude سیشن ری سیٹ:** فیچر آف، یا `claudeSessionReset` آف کے ساتھ، فی اکاؤنٹ `autoLimitReset` ٹوگل بالکل پہلے کی طرح فیصلہ کرتا ہے۔ دونوں کے آن ہونے کے ساتھ، فیچر فی اکاؤنٹ ٹوگلز کی جگہ لے لیتا ہے: ایک دائرہ کار اکاؤنٹ صرف اس وقت دعویٰ کر سکتا ہے جب پالیسی اس کی اجازت دیتی ہے، اور `dry-run` موڈ میں کوئی دعوی نہیں کیا جاتا ہے۔

**حفاظت:** جاب فی ٹک زیادہ سے زیادہ ایک کریڈٹ کو چھڑاتا ہے، کریڈٹ کی فہرست سے پہلے فیصلہ کرتا ہے (چھوڑ دیا گیا اکاؤنٹ کبھی بھی درج نہیں ہوتا ہے)، idempotency کیز `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` استعمال کرتا ہے، اور ناکام لسٹنگ یا چھٹکارے کے بعد اکاؤنٹ کو 1 گھنٹے کے لیے بند کر دیتا ہے۔ ہر چھٹکارا، ناکامی اور ڈرائی رن فیصلہ `audit_log` کو لکھا جاتا ہے (`action: "bankedReset.redeem"`، کوئی ٹوکن یا کریڈٹ آئی ڈی نہیں)؛ ٹوپیوں کو ان قطاروں سے شمار کیا جاتا ہے، لہذا وہ دوبارہ شروع ہونے سے بچ جاتے ہیں۔ کامیاب چھٹکارے `provider.reset_redeemed` ویب ہک کو بھی فائر کر دیتے ہیں۔

ریگریشن گارڈز: `tests/unit/banked-reset-policy.test.ts`، `tests/unit/banked-reset-auto-apply.test.ts`، `tests/unit/claude-limit-reset-policy-gate.test.ts`، `tests/unit/banked-reset-history-route.test.ts`۔

### Session affinity (#7274)

**دائرۂ کار:** ایک client session (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) کو کسی ایک connection کے ساتھ pin کرنا، **کسی بھی** provider کے لیے۔

**مقصد:** multi-turn agent (Claude Code، aider، custom agents) کو requests کے دوران اسی account پر برقرار رکھنا، تاکہ per-account session state رکھنے والے providers پر cross-account context loss اور بار بار آنے والے cold-start 429s کم ہوں۔

**Implementation:**

- TTL resolution: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Header extraction (generic, any provider): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Persisted pin table: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Setting: `sessionAffinityTtlMs` (global TTL in ms، `0` اسے disable کرتا ہے) — `src/lib/db/settings.ts`. Codex-only `codexSessionAffinityTtlMs` سے migration `124_generic_session_affinity_ttl.sql` کے ذریعے نام تبدیل کیا گیا، جو پہلے سے configured Codex TTL کو نئے default کے طور پر منتقل کرتی ہے۔

#7274 سے پہلے، `resolveSessionAffinityTtlMs()` ہر ایسے provider کے لیے جو `codex` نہیں تھا، براہِ راست `0` واپس کر دیتا تھا؛ اس لیے TTL setting (اور session headers) کہیں اور مؤثر نہیں تھے، حالانکہ pinning mechanism اور header extraction پہلے ہی provider-agnostic تھے۔ fix نے یہ early-return ہٹا دیا؛ اب TTL عالمی سطح پر `0` سے زیادہ مقرر کیے جانے کے بعد ہر provider پر یکساں لاگو ہوتا ہے۔

تینوں session-affinity headers کبھی upstream کو forward نہیں کیے جاتے — executors اپنے upstream headers ابتدا سے خود بناتے ہیں، client headers کو آگے منتقل نہیں کرتے؛ اس لیے یہ صرف ایک internal correlation id رہتا ہے۔

### Exclusive managed session connection leases

**دائرۂ کار:** ایک فعال منظم HTTP کلائنٹ/سیشن ایک اہل OmniRoute کنکشن کا مالک ہوتا ہے۔

**مقصد:** ایسے کلائنٹس کے لیے پائیدار خصوصی کنکشن ملکیت فراہم کرنا جنہیں درخواستوں کے دوران سخت روٹنگ حد درکار ہوتی ہے۔ یہ سیشن وابستگی سے مختلف ہے، جو تسلسل کی ایک نرم ترجیح ہے: ایک خصوصی لیز لائف سائیکل کی حالت SQLite میں برقرار رکھتی ہے، فعال مالکان اور فعال کنکشنز کی عالمی انفرادیت نافذ کرتی ہے، اور فراہم کنندہ کو بھیجنے سے پہلے باسی جنریشن کو مسترد کرتی ہے۔

یہ خصوصیت ہر API key کے لیے اختیاری ہے۔ کسی منظم key کے پاس `lease:exclusive` scope اور واضح، غیر خالی `allowedConnections` فہرست ہونا ضروری ہے۔ کوئی بھی HTTP کلائنٹ لائف سائیکل اینڈ پوائنٹ استعمال کر سکتا ہے؛ کلائنٹ کا نام، user-agent، provider، OAuth طریقہ، یا model درکار نہیں ہے۔ لیز کسی model کی نہیں بلکہ کنکشن کی مالک ہوتی ہے، اس لیے کنکشن کے عام طور پر اہل رہنے تک model کی تبدیلی ربط برقرار رکھتی ہے۔ عام model، quota، health، cooldown، اور allowlist کے قواعد بدستور حتمی حیثیت رکھتے ہیں اور اسی generation کو کسی دوسرے آزاد، اہل کنکشن میں منتقل کر سکتے ہیں۔

لائف سائیکل `POST /api/v1/session-leases` ہے، جس میں JSON actions `acquire`، `renew`، اور `release` شامل ہیں۔ منظم inference requests غیر شفاف `X-OmniRoute-Lease-Owner` قدر اور عین `X-OmniRoute-Lease-Generation` پیش کرتی ہیں۔ مالک `vlo_` کے بعد 43 base64url حروف استعمال کرتا ہے؛ صرف اس کا SHA-256 hash محفوظ کیا جاتا ہے۔ ہر حتمی dispatch fence تصدیق شدہ API key ID اور فعال connection ID کو بھی ربط دیتا ہے۔ لیز کنٹرول headers کو logs، محفوظ کردہ request snapshots، اور upstream executor headers سے ہٹا دیا جاتا ہے۔

اگر عام روٹنگ میں اہل managed امیدوار موجود ہوں، لیکن ہر آزاد امیدوار کسی غیر ملکی فعال لیز کے قبضے میں ہو، تو OmniRoute HTTP `429`، lease-capacity-unavailable code، waiting-for-capacity state، اور قدری پابندی والی `Retry-After` واپس کرتا ہے، جو متعلقہ میعاد ختم ہونے کے سب سے پہلے وقت سے اخذ کی جاتی ہے۔ عام طور پر اہلیت کا خالی ہونا لیز کے تصادم کے برابر نہیں ہے اور اس کی موجودہ routing error semantics برقرار رہتی ہیں۔

متعلقہ طریقہ کار الگ رہتے ہیں:

- OAuth session occupancy، OAuth accounts کے لیے process-local نرم تقسیم ہے۔
- Account semaphores، request-concurrency permits دیتے ہیں اور request مکمل ہونے پر ختم ہو جاتے ہیں۔
- Exclusive managed session leases، جنریشن fence کے ساتھ پائیدار لائف سائیکل ملکیت فراہم کرتی ہیں۔

---

## 3. ماڈل لاک آؤٹ

**دائرۂ کار:** فراہم کنندہ + کنکشن + ماڈل کا مجموعہ۔

**اسٹیٹس کے لحاظ سے کلیدی دائرۂ کار:** ناکام ہونے والا اسٹیٹس طے کرتا ہے کہ لاک آؤٹ کس کلید میں لکھا جائے گا
(`resolveLockoutScope()` in `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — کوٹا یا استحقاق کا سگنل — **کوٹا فیملی** کو لاک کریں:
  codex کے لیے پورا `codex` / `spark` دائرۂ کار (کنکشن کے ہر `gpt-5*` ماڈل کے لیے)،
  جبکہ دیگر فراہم کنندگان کے لیے `getQuotaScopedModelForProvider()`۔
- `404` بنیادی ماڈل کو لاک کرتا ہے (`getModelLockKey()`، `not_found` کو محدود کرتا ہے)۔
- کوئی بھی دیگر اسٹیٹس — `5xx` ٹرانسپورٹ/سرور کی ناکامیاں اور کوالٹی کی توثیق سے OmniRoute کا خود تیار کردہ
  `502` — صرف فراہم کنندہ/کنکشن/ماڈل کے **بالکل درست** مجموعے کو لاک کرتا ہے۔ ایک ماڈل پر خراب اسٹریم
  اکاؤنٹ کے کوٹے کے بارے میں ثبوت نہیں ہوتی؛ اس اصول سے پہلے `codex/gpt-5.6-luna` پر ایک خالی جواب
  اس کنکشن کے ہر `gpt-5*` ماڈل کو 2–30 منٹ (بتدریج اضافہ کے ساتھ) روٹنگ سے ہٹا دیتا تھا، جبکہ اس کا کوٹا
  غیر متاثر رہتا تھا۔
- کالر کا واضح `scope` آپشن ہمیشہ ترجیح رکھتا ہے (Antigravity `"exact"` پاس کرتا ہے)۔

**مقصد:** پورے کنکشن کو اس وقت غیر فعال ہونے سے بچانا جب صرف ایک ماڈل دستیاب نہ ہو یا کوٹے کی حد میں ہو۔

**مثالیں:**

- فی ماڈل کوٹا رکھنے والے فراہم کنندگان جو 429 واپس کرتے ہیں
- مقامی فراہم کنندگان جو ایک غیر موجود ماڈل کے لیے 404 واپس کرتے ہیں
- فراہم کنندہ کے مخصوص موڈ/ماڈل اجازت کی ناکامیاں (مثلاً Grok موڈز)

**عمل درآمد:** `open-sse/services/accountFallback.ts` — `lockModel()`، `clearModelLock()`، `getAllModelLockouts()`۔

### ماڈل کول ڈاؤنز ڈیش بورڈ (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

فعال لاک آؤٹس کی فہرست دکھاتا ہے: فراہم کنندہ، کنکشن، ماڈل، وجہ، expiresAt۔ آپریٹرز کارڈ سے کسی ماڈل کو دستی طور پر دوبارہ فعال کر سکتے ہیں۔

**REST API:**

- `GET /api/resilience/model-cooldowns` — فعال لاک آؤٹس کی فہرست
- `DELETE /api/resilience/model-cooldowns` — دستی طور پر دوبارہ فعال کرنا۔ باڈی: `{provider, connection, model}`۔ تصدیق: management۔

### کول ڈاؤن مینیجر

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`)۔

ہر ایسے کنکشن کے لیے ایک صفحہ جو عارضی وجہ سے روٹنگ سے باہر ہو، بجائے اس کے کہ ہر فراہم کنندہ کا صفحہ الگ کھولا جائے۔
یہ کنکشن کول ڈاؤنز، ماڈل لاک آؤٹس اور ٹرمینل اسٹیٹس کی فہرست دکھاتا ہے، انہیں ہر کنکشن، منتخب کنکشنز،
یا کسی فراہم کنندہ کے تمام کنکشنز کے لیے صاف کرتا ہے، اور سب سے زیادہ ٹیون کی جانے والی کول ڈاؤن قواعد میں ترمیم کرتا ہے:
`streamStallCooldown.enabled` اور OAuth / API-key `connectionCooldown` کا بنیادی کول ڈاؤن اور زیادہ سے زیادہ
بیک آف مراحل (یہ `PATCH /api/resilience` کے ذریعے محفوظ ہوتے ہیں)۔ ٹرمینل اسٹیٹس (`banned`, `expired`, `credits_exhausted`)
فہرست میں دکھائے جاتے ہیں، لیکن یہاں کبھی صاف نہیں کیے جاتے۔

اسی صفحے پر موجود **Error cooldown rules** کارڈ آپریٹر کی خرابی کے قواعد
(`settings.providerErrorRules`) اور فی فراہم کنندہ catch-all ڈیفالٹس
(`settings.providerErrorDefaults`) میں `PATCH /api/settings` کے ذریعے ترمیم کرتا ہے — یہ دیکھیں §7 کے تحت
"Operator-declared rules" کہ یہ کیسے مطابقت رکھتے ہیں۔ دورانیے Default (کوئی واضح کول ڈاؤن نہیں)، 30 منٹ،
1 گھنٹہ، 5 گھنٹے، 24 گھنٹے، یا 1 سے 43,200 منٹ (30 دن) کا حسب ضرورت دورانیہ ہو سکتے ہیں۔

**REST API** (`src/lib/resilience/cooldownManager.ts`، تصدیق: management):

- `GET /api/resilience/cooldowns[?provider=]` — اسٹیٹس، باقی ماندہ کول ڈاؤن،
  بیک آف لیول، آخری خرابی کی قسم اور ماڈل لاک آؤٹس والے کنکشنز (اسناد کے بغیر)
- `POST /api/resilience/cooldowns` — باڈی `{connectionIds: string[]}` یا
  `{all: true, provider?}`؛ واپس کرتا ہے `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### لاک آؤٹ سیٹنگز UI + کامیابی کے ساتھ بتدریج کمی کے ذریعے بحالی (v3.8.23)

ماڈل لاک آؤٹ ہمیشہ فعال، ہارڈ کوڈ شدہ رویے سے ایک مکمل طور پر قابلِ تشکیل، اختیاری فیچر بن گیا ہے،
جس کے اپنے سیٹنگز کارڈ اور خود بحال ہونے والے ریکوری راستے ہیں۔

**سیٹنگز کارڈ:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)۔
یہ اوپر موجود صرف پڑھنے کے لیے `ModelCooldownsCard` سے **الگ** ہے (جو صرف فعال لاک آؤٹس کی
_فہرست_ دکھاتا ہے) — نیا کارڈ _پیرامیٹرز کی تشکیل_ کرتا ہے۔ ڈیفالٹس
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) میں موجود ہیں:

| Setting                 | Default                          | Meaning                                                                |
| ----------------------- | -------------------------------- | ---------------------------------------------------------------------- |
| `enabled`               | `false`                          | ماسٹر ٹوگل — ماڈل لاک آؤٹ **ڈیفالٹ طور پر بند** ہے۔                    |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | اپ اسٹریم اسٹیٹس جو ماڈل کے دائرۂ کار والی ناکامی شمار ہوتے ہیں۔       |
| `baseCooldownMs`        | `120_000` (120 s)                | پہلی ناکامی کے لیے ابتدائی لاک آؤٹ کا دورانیہ۔                         |
| `maxCooldownMs`         | `1_800_000` (30 min)             | بڑھائے گئے کول ڈاؤن کی زیادہ سے زیادہ حد۔                              |
| `maxBackoffSteps`       | `10`                             | ایکسپونینشل بیک آف میں اضافے کے زیادہ سے زیادہ مراحل۔                  |
| `useExponentialBackoff` | `true`                           | آیا بار بار ہونے والی ناکامیاں کول ڈاؤن میں ایکسپونینشل اضافہ کریں گی۔ |

سیٹنگز معمول کے سیٹنگز اسٹور کے ذریعے محفوظ ہوتی ہیں اور resilience settings schema کے ذریعے توثیق کی جاتی ہیں؛
کارڈ `baseCooldownMs`/`maxCooldownMs` کو محدود کرتا ہے
(`maxCooldownMs ≥ baseCooldownMs`) اور `maxBackoffSteps` کو بھی محدود کرتا ہے۔

**کامیابی کے ساتھ بتدریج کمی کے ذریعے بحالی:** بحالی صرف ٹائمر کے ختم ہونے تک محدود نہیں ہے۔ صحت مند
جواب ماڈل کی ناکامیوں کی گنتی کو بتدریج کم کرتا ہے، تاکہ جو ماڈل درمیان میں بحال ہو گیا ہو وہ
اضافہ جاری نہ رکھے (اور لاک آؤٹ صاف ہو جائے) اور اس کا ٹائمر ختم ہونے کا انتظار نہ کرنا پڑے۔ کامیاب
combo ہدف پر `open-sse/services/combo.ts`،
`decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) کو کال کرتا ہے، جو محفوظ شدہ
`failureCount` کو آدھا کر دیتا ہے (`Math.floor(failureCount / 2)`)، اور جب یہ `0` تک پہنچتا ہے تو
لاک آؤٹ کا اندراج مکمل طور پر حذف کر دیا جاتا ہے۔ اس کے مقابل `recordModelLockoutFailure()`
اضافے کی ونڈو کے اندر ناکامیوں پر گنتی میں اضافہ کرتا ہے (اور کول ڈاؤن میں اضافہ کرتا ہے)۔ کامیابی کے ساتھ
یہ بتدریجی کمی محض ٹائمر ختم ہونے کے علاوہ ہے — دونوں میں سے کوئی بھی راستہ ماڈل کو دوبارہ فعال کر سکتا ہے۔

**حالت:** لاک آؤٹس **میموری میں** رکھے جاتے ہیں (فی پراسیس `Map`s، جن میں `ModelLockoutEntry` کو
`provider:connectionId:model` کی بنیاد پر کلید بنایا جاتا ہے، جبکہ عین دائرۂ کار کے لاکس کے لیے
`provider:connectionId:exact:model` استعمال ہوتا ہے)، ڈیٹا بیس میں محفوظ نہیں کیے جاتے —
دوبارہ شروع ہونے پر یہ ضائع ہو جاتے ہیں۔ _ترتیبات_ محفوظ رہتی ہیں؛ فعال لاک آؤٹ _حالت_ عارضی ہے۔

---

## 4. کوٹا-شیئر کنکرنسی کنٹرول (v3.8.36)

سبسکرپشن اکاؤنٹس (GLM، MiniMax وغیرہ) اکثر صرف تقریباً 1–3 بیک وقت
درخواستیں قبول کرتے ہیں؛ اس حد سے تجاوز کرنے پر 429s اور کول ڈاؤنز متحرک ہو جاتے ہیں۔ یہ مسئلہ
**quota-share** (`qtSd/…`) کومبو کے تحت شدید ہو جاتا ہے، جہاں متعدد API کیز ایک ہی اپ اسٹریم
اکاؤنٹ شیئر کرتی ہیں۔ تین پرتیں مشترکہ اکاؤنٹ کو حد سے زیادہ درخواستوں سے بھرنے سے روکتی ہیں۔

### فی کنکشن کنکرنسی حد (`max_concurrent`)

ہر پرووائیڈر کنکشن `max_concurrent` کی زیادہ سے زیادہ حد بیان کر سکتا ہے
(`provider_connections.max_concurrent`، جو کنکشن موڈل / API / DB میں سیٹ ہوتی ہے)۔
بغیر حد کے لیے اسے خالی چھوڑ دیں۔ یہی واحد نوب نیچے بیان کردہ سیریلائزیشن
پرت کو کنٹرول کرتا ہے — اسے اکاؤنٹ کی حقیقی کنکرنسی کے مطابق سیٹ کریں
(مثلاً GLM تقریباً 1، MiniMax تقریباً 2)۔

### فی ماڈل کنکرنسی حدیں (`modelConcurrency`)

ایک کنکشن اپنی `rateLimitOverrides` میپ کے اندر عین فی ماڈل کنکرنسی حدیں بھی
بیان کر سکتا ہے:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

اسے کنکشن موڈل (**Rate limit overrides → Per-model
concurrency caps**، ہر لائن میں ایک `model=cap`) یا
`PATCH /api/providers/[id]` کے ذریعے اسی JSON ساخت کے ساتھ سیٹ کریں۔ کلیدی مفاہیم:

- **کنکشن-وائیڈ بمقابلہ ماڈل-مخصوص:** `maxConcurrent` مشترکہ
  کنکشن-وائیڈ حد برقرار رکھتا ہے۔ جب دونوں لاگو ہوں تو دونوں گیٹس ایک ہی کمپوزٹ گیٹ
  (`global → provider → account → model`) میں ایٹمی طور پر حاصل کیے جاتے ہیں؛ مؤثر
  رویہ لاگو ہونے والی زیادہ سخت حد کے مطابق ہوتا ہے۔
- **عین ماڈل-کی میچ:** کی ماڈل اسٹرنگ ہوتی ہے جو روٹنگ حل ہونے کے بعد executor کو دی جاتی ہے —
  عموماً صرف اپ اسٹریم ماڈل آئی ڈی (`glm-5`)، نہ کہ کلائنٹ کی طرف کا
  `provider/model` عرف (`zai/glm-5`، `glm-5` سے میچ نہیں کرتا)۔ قدریں مثبت صحیح اعداد پر مشتمل
  بیک وقت درخواستوں کی حدیں ہوتی ہیں۔
- **مقامی قطار بندی، کوئی دریافت نہیں:** اضافی درخواستیں موجودہ قطار/ٹائم آؤٹ کے مفاہیم کے تحت
  مقامی طور پر قطار میں شامل ہوتی ہیں (ٹائپ شدہ `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL` ایڈمیشن ایررز)۔ OmniRoute اپ اسٹریم پالیسی دریافت یا اخذ نہیں کرتا —
  یہ آپریٹر کی جانب سے تشکیل دی گئی عین حدیں نافذ کرتا ہے۔ بھرا ہوا ماڈل گیٹ کبھی پرووائیڈر
  کو غیر فعال نہیں کرتا اور نہ ہی مستقل ماڈل لاک آؤٹ بناتا ہے؛ اپ اسٹریم 429/کول ڈاؤن/فال بیک
  رویہ ایرر بیک اسٹاپ کے طور پر برقرار رہتا ہے۔
- **فی کنکشن، فی پراسیس دائرۂ کار:** حدیں فی ڈیٹابیس کنکشن ہوتی ہیں اور میموری میں رکھی جاتی ہیں،
  اس لیے ایک ہی اپ اسٹریم API کی دوبارہ استعمال کرنے والے دو کنکشن ایک دوسرے کے ساتھ ہم آہنگ
  نہیں ہوتے۔
- **غیر تشکیل شدہ کا مطلب ہے کوئی تبدیلی نہیں:** میپ حذف کرنے (یا ڈیش بورڈ فیلڈ خالی چھوڑنے)
  سے کوئی ماڈل گیٹ شامل نہیں ہوتا۔ کسی عالمگیر پرووائیڈر حد کا دعویٰ کیے بغیر مثال:

```text
glm-5=1
glm-4.7=3
```

### کوٹا-شیئر درخواست سیریلائزیشن

جب کوٹا-شیئر ڈسپیچ کسی ایسے کنکشن کو ہدف بناتا ہے جو مثبت
`max_concurrent` بیان کرتا ہو، تو اس **اکاؤنٹ** کو بھیجی جانے والی بیک وقت
درخواستیں فی کنکشن سیمفور (کی `qsconn:<connectionId>`) کے ذریعے سیریلائز کی جاتی ہیں:
اضافی درخواستیں اکاؤنٹ کو بھرنے کے بجائے **قطار میں انتظار** کرتی ہیں۔ یہ
**fail-open** ہے — بھری ہوئی قطار یا ٹائم آؤٹ کسی قابلِ ڈسپیچ درخواست کو کبھی مسترد کرنے کے
بجائے بغیر سلاٹ کے آگے بڑھتا ہے۔ اسے **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`، پہلے سے فعال) میں ٹوگل کریں۔
`max_concurrent` کیپ کے بغیر رویہ تبدیل نہیں ہوتا۔

> کوٹا-شیئر روٹنگ گیٹ (`selectQuotaShareTarget`، DRR + P2C) خود بھی
> fail-open ہے اور صرف حد تک پہنچنے والے کنکشن کی ترجیح کم کرتا ہے — ایک
> واحد کنکشن والے پول کے ساتھ یہ سخت حد نافذ نہیں کر سکتا، اس لیے یہ سیمفور ہی ہے جو
> حقیقتاً سیلاب کو قابو میں رکھتا ہے۔

### کومبو کول ڈاؤن سے باخبر ریٹری

ہر کومبو حکمتِ عملی کے لیے (جب فعال ہو)، اگر کوئی درخواست 429 کو حتمی شکل دینے والی ہو
اور کول ڈاؤن SHORT عارضی ہو تو وہ 429 واپس کرنے کے بجائے کول ڈاؤن ختم ہونے تک انتظار
کرتی اور دوبارہ ڈسپیچ ہوتی ہے — یہ ملٹی ماڈل کومبو پر Gemini-کلاس TPM/RPM ونڈوز
(تقریباً 60 سیکنڈ کا retry-after) کا احاطہ کرتا ہے، مثلاً جب 2-ماڈل کومبو کے دونوں اہداف
فی ماڈل ریٹ لمٹ سے متاثر ہوں۔ یہ **Settings → Resilience** میں
`comboCooldownWait` (`enabled`، `maxWaitMs`، `maxAttempts`،
`budgetMs`) کے ذریعے محدود ہے۔ یہ کبھی `quota_exhausted`
(آدھی رات تک مقفل) یا تصدیق/نہ ملنے کی وجوہات پر انتظار نہیں کرتا۔

کوئی کومبو `config.comboCooldownWaitEnabled: false` کے ذریعے اس سے الگ ہو سکتا ہے۔ صرف لفظی
`false` ان مشترکہ کومبو انتظاروں (پوسٹ-ڈسپیچ کول ڈاؤن اور پری-ڈسپیچ سرکٹ-اوپن/ماڈل-لاک
انتظار) اور ان کے wait-budget timeout-floor توسیع کو غیر فعال کرتا ہے۔
غائب یا `true` عالمی پالیسی برقرار رکھتا ہے؛ `true` عالمی طور پر غیر فعال انتظار کو فعال نہیں کر سکتا۔
واضح `targetTimeoutMs` پھر بھی غالب رہتا ہے۔ یہ opt-out الگ مقامی-Codex turn-pin پری-ڈسپیچ انتظار
کو تبدیل نہیں کرتا۔

یہی گیٹ پری-ڈسپیچ صورتِ حال (#16319) کا بھی احاطہ کرتا ہے: جب کومبو کے ہر ہدف کو کسی بھی
کوشش سے پہلے اس لیے چھوڑ دیا جائے کہ اس کا ماڈل مختصر عارضی لاک آؤٹ میں ہے، تو صفر-کوشش والا
راستہ اسی حدود کے تحت لاک آؤٹ ختم ہونے تک انتظار کرتا اور دوبارہ ڈسپیچ ہوتا ہے، بجائے اس کے کہ
بغیر hint کے `503 ALL_TARGETS_SKIPPED` کا جواب دے۔ جب انتظار کی اجازت نہ ہو (حد، کوشش یا بجٹ
ختم ہو چکا ہو، یا فیچر غیر فعال ہو)، تو حتمی جواب `429 rate_limit_error` میں اپ گریڈ ہو جاتا ہے
اور اس میں ابتدائی عارضی لاک کے ختم ہونے سے `retry_after` / `reset_at` شامل ہوتے ہیں؛ کوٹا،
تصدیق اور نہ ملنے والے لاکس hint کے بغیر 503 برقرار رکھتے ہیں۔

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

## 5. درخواست کی قطار کے داخلے کا کنٹرول (v3.8.49 · issue #6593)

**دائرہ**: مقامی فی-پرووائیڈر+کنکشن ریٹ-لمٹ قطار (`open-sse/services/rateLimitManager.ts`، جو Bottleneck پر مبنی ہے)، اوپر بیان کردہ تین میکانزمز سے ایک پرت نیچے۔

**`maxWaitMs` قطار کے انتظار کی حد مقرر کرتا ہے؛ `executionMaxWaitMs` عمل درآمد کی حد مقرر کرتا ہے۔**
یہ دونوں جان بوجھ کر الگ الگ ہیں، اور ان میں سے کوئی بھی دوسرے کو فیڈ نہیں کرتا۔

`resilienceSettings.requestQueue.maxWaitMs` **قطار-انتظار کا بجٹ** ہے: یہ پرووائیڈر سلاٹ کے انتظار اور پھر QUEUED حالت میں بیٹھے رہنے کا احاطہ کرتا ہے، اور اس کا ٹائمر اسی لمحے صاف کر دیا جاتا ہے جس لمحے جاب QUEUED سے نکل کر عمل درآمد شروع کرتا ہے (`rateLimitManager.ts`، `wrappedFn`)۔ جو درخواست اس حد سے تجاوز کر جائے وہ کبھی اپ اسٹریم تک نہیں پہنچتی۔ ڈیفالٹ 30000ms، جو `src/lib/resilience/settings.ts` میں `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` فراہم کرتا ہے اور `tests/unit/ratelimit-admission-control-6593.test.ts` اسے مقرر رکھتا ہے، لہذا اس میں کوئی تبدیلی اس ٹیسٹ کو ناکام (سرخ) کر دے گی بجائے اس کے کہ یہ پیراگراف خاموشی سے پرانا ہوتا رہے۔

`resilienceSettings.requestQueue.executionMaxWaitMs` وہ قیمت ہے جو Bottleneck کو جاب `expiration` کے طور پر موصول ہوتی ہے، جس کا ٹائمر صرف ڈسپیچ کے بعد شروع ہوتا ہے۔ یہ ان ایگزیکیوٹرز کے لیے ایک آخری حفاظتی تدبیر ہے جن کا اپنا اپ اسٹریم ٹائم آؤٹ نہیں ہوتا، اور جب ایگزیکیوٹر کا اپنا fetch-start ٹائم آؤٹ اس سے لمبا ہو تو اسے اُس تک بڑھا دیا جاتا ہے، تاکہ یہ کسی صحت مند، جاری (in-flight) جواب کو منقطع نہ کر سکے۔ ڈیفالٹ 600000ms (10 منٹ)۔

قطار کے بجٹ کو `expiration` میں ڈالنا وہی چیز تھی جو غیر-تدریجی (non-incremental) گیٹ ویز کو درمیانِ پرواز مار دیا کرتی تھی — یہ بجائے خود پہلے بائٹس آنے سے پہلے منٹوں تک چلتے ہیں — اور یہی وجہ ہے کہ expiration `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) کے طور پر ظاہر ہوتی ہے جبکہ قطار کا بجٹ قطار-ٹائم آؤٹ کوڈ رکھتا ہے۔ دونوں میں سے کسی کو بھی `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) یا ڈیش بورڈ (**ترتیبات → لچک**) کے ذریعے اووررائیڈ کیا جا سکتا ہے۔ نارملائز کیے جانے پر دونوں کو 1ms–24h کے درمیان محدود (کلیمپ) کیا جاتا ہے۔

**ترجیح، دونوں کے لیے:** env متغیر صرف _ڈیفالٹ_ فراہم کرتا ہے۔ `resilienceSettings.requestQueue` میں محفوظ شدہ قیمت (ڈیش بورڈ / API patch، جو `key_value` میں ذخیرہ ہوتی ہے) اس پر غالب آتی ہے، اور فی-کنکشن `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` اس پر غالب آتی ہے۔ لہذا ایسی ڈیپلائیمنٹ پر env متغیر سیٹ کرنا جس میں پہلے سے محفوظ شدہ قیمت موجود ہو، کچھ بھی تبدیل نہیں کرتا — اس کے بجائے محفوظ شدہ سیٹنگ کو صاف یا اپڈیٹ کریں۔

قطار میں قیام کی حد `maxWaitMs` سے مقرر ہے؛ نیچے بیان شدہ `maxQueueDepth` اس بات کی حد مقرر کرتا ہے کہ ایک وقت میں کتنے کالرز قطار میں ہو سکتے ہیں۔

**باڈی میں بتائی گئی ریٹرائز: پیسنگ بمقابلہ لاک آؤٹ۔** 429 کی باڈی اپنا انتظار خود بتا سکتی ہے (Gemini `RetryInfo.retryDelay`، "retry after Ns" متن)، جسے `updateFromResponseBody` پڑھتا ہے۔ جو انتظار کنکشن کے `maxWaitMs` میں سما جائے وہ پیسنگ ہے: لیمیٹر اتنے عرصے کے لیے اپنا ریزروائر خالی کر دیتا ہے اور قطار میں موجود کالز اس کے دوبارہ بھرنے پر ڈسپیچ ہوتی ہیں۔ `maxWaitMs` سے لمبا انتظار ایسی چیز نہیں جسے قطار گزار سکے — Gemini ختم شدہ روزانہ کوٹے کا جواب `retryDelay: "86399s"` کے ساتھ دیتا ہے۔ دوبارہ بنائے گئے 429 پر منتقل شدہ `Retry-After` (#16528) پہلے ہی فال بیک انجن سے اس مدت کے لیے ماڈل لاک کروا دیتا ہے، لیکن لیمیٹر کو بھی اس کے لیے روک دینا اس بات کا سبب بنتا کہ کوئی بھی کال جو کلید (key) تک جلدی پہنچ جائے (مثلاً resilience ری سیٹ کے بعد) پورے `maxWaitMs` کے لیے رک جائے۔ جب ایسا انتظار کسی ٹائپ شدہ Google `RetryInfo` تفصیل سے آتا ہے (`google_rpc_retry_info` ماخذ) اور کلید کا لیمیٹر پہلے ہی ماڈل تک محدود (scoped) ہو (دیکھیں `getLimiterKey`)، تو 429 اس کے بجائے اس کنکشن پر ماڈل لاک آؤٹ بن جاتا ہے (`open-sse/services/rateLimitManager/bodyRetryPause.ts` میں `lockModelForLongBodyRetry`، زیادہ سے زیادہ 24h)، اور لیمیٹر غیر-متوقف چھوڑ دیا جاتا ہے۔ اکاؤنٹ انتخاب اس لاک پر `isModelLocked()` کے ذریعے نظرانداز (skip) کرتا ہے، اور کنکشن سے پِن کردہ اہداف کے لیے کومبو پری-ڈسپیچ گیٹ بھی ایسا ہی کرتا ہے۔ antigravity پر، جہاں لیمیٹر فی کوٹہ خاندان ہوتا ہے، لاک عین ماڈل پر ہوتا ہے، بالکل اس کے دیگر کوٹہ لاکس کی طرح۔ کلائنٹ نے جو نام مانگا تھا وہ بھی لاک ہو جاتا ہے جب کوئی alias اسے اس ماڈل پر حل کرے، کیونکہ یہ جانچیں مطلوبہ نام استعمال کرتی ہیں؛ یہ عین مطابق لاک ہوتا ہے (`lockExactModel`)، لہذا ایسا alias جو antigravity کوٹہ خاندان یا codex اسکوپ کو عبور کرے، کبھی اپنے آپ کو لاک نہیں کرتا۔ نثری اشارہ (prose hint)، غیر-ٹائپ شدہ `retryDelay`، یا پورے کنکشن میں مشترک لیمیٹر، توقف (pause) کو برقرار رکھتے ہیں۔ جب وہ لیمیٹر جسے 429 پاتھ نے ابھی دوبارہ بنایا ہے واقعی متوقف ہوتا ہے، تو ایسا کالر جس کا باقی قطار کا وقت توقف کے ختم ہونے سے پہلے ختم ہو جاتا ہے، اسے فوراً قطار-ٹائم آؤٹ کوڈ (`checkLimiterPause`) کے ساتھ لوٹا دیا جاتا ہے بجائے اس کے کہ وہ وقت پورا ہونے کا انتظار کرے؛ ریکارڈ شدہ اختتام لیمیٹر بننے سے پہلے لنگر انداز (anchor) کیا جاتا ہے، جہاں Bottleneck اپنی ریفریش گھڑی شروع کرتا ہے، اور ریزروائر میں بعد کی کوئی تبدیلی اسے بھلا دیتی ہے۔ اس کا احاطہ `tests/unit/rate-limit-long-body-retry-lockout.test.ts` اور `tests/unit/rate-limit-body-retry-pause.test.ts` کرتے ہیں۔

**`maxQueueDepth` — اختیاری (opt-in) داخلے کی حد (نئی)۔** `resilienceSettings.requestQueue.maxQueueDepth` اس بات کی حد مقرر کرتا ہے کہ ایک پرووائیڈر+کنکشن کے لیے ایک وقت میں کتنی درخواستیں قطار میں (ابھی ڈسپیچ نہیں ہوئیں) رہ سکتی ہیں۔ جب قطار میں پہلے ہی `maxQueueDepth` درخواستیں موجود ہوں، تو نئی درخواست کو ٹائپ شدہ `code: "RATE_LIMIT_QUEUE_FULL"` ایرر کے ساتھ فوری طور پر مسترد کر دیا جاتا ہے **اس سے پہلے** کہ وہ کبھی `limiter.schedule()` تک پہنچے — لہذا مسترد ہونا کم لاگت کا ہوتا ہے اور اس درخواست کے لیے کسی بھی بعد کے پرامپٹ-کمپریشن / ترجمے کے کام سے پہلے ہو جاتا ہے۔ ڈیفالٹ `0` = غیر فعال، جو موجودہ غیر-محدود قطار کے رویے کو برقرار رکھتا ہے؛ حد 0–100000۔ `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) یا `resilienceSettings.requestQueue.maxQueueDepth` (ڈیش بورڈ/API patch) کے ذریعے اووررائیڈ کریں۔

داخلے کی جانچ خود ایک خالص فنکشن (pure function) ہے (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) لہذا اسے حقیقی Bottleneck لیمیٹر کے بغیر یونٹ-ٹیسٹ کیا جا سکتا ہے۔

> وہ RFC جس نے #6593 کھولا تھا، اس نے ایک `bypassCompressionOnRateLimit`
> فلیگ بھی تجویز کیا تھا۔ اس ریپو کی `open-sse/services/compression/` پائپ لائن
> آؤٹ باؤنڈ LLM درخواست پر پرامپٹ/کانٹیکسٹ کمپریشن ہے (`chatCore.ts`،
> `resolveCompressionSettings`/`selectCompressionStrategy` بلاک کے گرد)،
> نہ کہ بنائی گئی 429 باڈیز پر HTTP رسپانس کمپریشن — لہٰذا کسی لفظی bypass فلیگ
> کے لیے کوئی مماثل کوڈ پاتھ موجود نہیں ہے۔ یہ پرامپٹ-کمپریشن مرحلہ بھی فی الحال
> درخواست کی پائپ لائن میں `withRateLimit()` سے _پہلے_ چلتا ہے، لہٰذا
> قطار بھر جانے پر ردّ ہونے والے موقع پر اسے نظرانداز کرنے کے لیے دوبارہ ترتیب دینا
> اس ایشو کے دائرے سے الگ اور بڑی تبدیلی ہے؛ اسے یہاں جان بوجھ کر **نہیں**
> لاگو کیا گیا اور اگر CPU کی بچت کا فائدہ دوبارہ ترتیب دینے کے خطرے کے
> برابر ہو تو اسے بعد کے کام (follow-up) کے طور پر چھوڑ دیا گیا ہے۔

### Rate-Limit خودکار فعال سازی سیفٹی نیٹ اور کنکشن پروٹیکشن (`rateLimitProtection`)

**خودکار فعال سازی سیفٹی نیٹ** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`، ڈیفالٹ `true`):
ڈیفالٹ کے مطابق، OmniRoute تمام فعال API-key پرووائیڈر کنکشنز (`getProviderCategory(provider) === "apikey"`) کے لیے rate-limit قطار پروٹیکشن خودکار طور پر فعال کر دیتا ہے۔ اس سے یہ یقینی بنتا ہے کہ rate-sensitive اپ اسٹریم API keys کو بھیجی جانے والی درخواستیں Bottleneck کے ذریعے قطار میں لگائی اور تھروٹل کی جائیں، بجائے اس کے کہ وہ اچانک اپ اسٹریم 429 ایررز میں تبدیل ہو جائیں۔ اس سیفٹی نیٹ کو `RATE_LIMIT_AUTO_ENABLE` انوائرنمنٹ ویری ایبل کے ذریعے اوور رائڈ کیا جا سکتا ہے (`false`/`0`/`off` غیر فعال کرتا ہے، `true`/`1`/`on` جبراً فعال کرتا ہے)، جو محفوظ شدہ ڈیش بورڈ سیٹنگ (**ترتیبات → استحکام** / `PATCH /api/resilience`) پر فوقیت رکھتا ہے۔

**فی-کنکشن `rateLimitProtection` کی سیمینٹکس:**
فی-کنکشن rate-limit پروٹیکشن کو پرووائیڈر کنکشنز پر موجود `rateLimitProtection` بولین فیلڈ کے ذریعے ٹریک کیا جاتا ہے (SQLite میں `rate_limit_protection` کے نام سے محفوظ):

- **واضح فعال (`rateLimitProtection === true`)**: اس کنکشن کے لیے rate-limit پروٹیکشن واضح طور پر فعال ہے، قطع نظر اس کے کہ پرووائیڈر کیٹیگری کیا ہے یا خودکار فعال سازی سیفٹی نیٹ چالو ہے یا نہیں۔
- **واضح غیر فعال (`rateLimitProtection === false`)**: واضح پروٹیکشن کو غیر فعال کرتا ہے، لیکن کسی فعال API-key کنکشن کو گلوبل خودکار فعال سازی سیفٹی نیٹ سے آپٹ-آؤٹ **نہیں** کراتا۔ `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) میں، `false` اور `undefined` مترادف ہیں: صرف `rateLimitProtection === true` کو واضح اوور رائڈ کے طور پر شمار کیا جاتا ہے۔ اگر `rateLimitProtection` کی قیمت `false` ہو (یا سیٹ نہ ہو)، تو ایک فعال API-key کنکشن پھر بھی خودکار فعال سازی کی شرط پر پورا اترتا ہے اور rate-limit سے محفوظ رہتا ہے۔
- **کوئی فی-کنکشن آپٹ-آؤٹ نہیں**: کوئی آپریٹر فی الحال یہ بات بیان نہیں کر سکتا کہ "یہ واحد فعال API-key کنکشن rate-limit قطار پروٹیکشن کے بغیر چلے" جبکہ دیگر کنکشنز کے لیے خودکار فعال سازی فعال رہے۔ API-key کنکشنز کو مکمل طور پر rate-limit قطاروں کے بغیر چلانے کے لیے، سیفٹی نیٹ کو گلوبل طور پر بند کرنا ضروری ہے (`RATE_LIMIT_AUTO_ENABLE=false` یا `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`)۔

**تعاون یافتہ تحریری راستے:**

- **`POST /api/rate-limits`**: کسی کنکشن کے لیے `rateLimitProtection` ٹوگل کرنے کا تعاون یافتہ انتظامی تحریری راستہ (`{ connectionId: string, enabled: boolean }`)۔ اسے `enabled: true` کے ساتھ کال کرنے سے واضح پروٹیکشن فعال ہو جاتی ہے؛ اسے `enabled: false` کے ساتھ کال کرنے سے واضح پروٹیکشن ہٹ جاتی ہے (حالانکہ اگر خودکار فعال سازی چالو ہو تو فعال API-key کنکشنز گلوبل سیفٹی نیٹ کے دائرے میں ہی رہتے ہیں)۔
- **`PUT /api/providers/[id]`**: جان بوجھ کر `rateLimitProtection` کو قبول یا پلٹتا **نہیں** ہے (#11278)۔ `PUT /api/providers/[id]` کے ذریعے پرووائیڈر کنکشن میٹا ڈیٹا اپڈیٹ کرنے سے محفوظ شدہ rate-limit پروٹیکشن اسٹیٹ کبھی تبدیل نہیں ہوگی۔

---

## 6. سلو-سٹریم تھرو پٹ واچ ڈاگ (#9709)

اختیاری `resilienceSettings.streamRecovery.throughputWatchdog` گارڈ ایک اپ اسٹریم کا پتہ لگاتا ہے جو اب بھی ٹکڑوں کو بھیج رہا ہے لیکن کنفیگر شدہ مفید آؤٹ پٹ ریٹ سے نیچے اسسٹنٹ آؤٹ پٹ تیار کر رہا ہے۔ یہ جان بوجھ کر بیکار ٹائم آؤٹ سے الگ ہے: دل کی دھڑکنیں اور میٹا ڈیٹا نہ تو ٹائمر کو ری سیٹ کرتے ہیں اور نہ ہی اسے پیش رفت کے طور پر شمار کرتے ہیں۔ یہ سخت کوشش کی آخری تاریخ (#9153) سے بھی الگ ہے، جو آؤٹ پٹ کوالٹی سے قطع نظر ایک مکمل حفاظت کی حد بنی ہوئی ہے۔

واچ ڈاگ کو اسقاط حمل کرنے سے پہلے ایک وارم اپ پیریڈ کی ضرورت ہوتی ہے جس کے بعد ایک مکمل رولنگ ونڈو ہوتی ہے۔ یہ چیٹ کی تکمیل اور جوابات API آؤٹ پٹ ایونٹس (ایک قدامت پسند UTF-8 بائٹ پراکسی) سے ٹیکسٹ ڈیلٹا شمار کرتا ہے، صرف استعمال اور خالی واقعات کو نظر انداز کرتا ہے، اور جب ٹول کال یا استدلال کے واقعات پرواز میں ہوتے ہیں تو فیصلے کو معطل کرتا ہے۔ یہ ڈیفالٹ طور پر غیر فعال ہے اور اسے `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` کے ساتھ فعال کیا جا سکتا ہے (یہ env ویلیو صرف ڈیفالٹ — a محفوظ شدہ `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean wins کو سیڈ کرتی ہے۔ ونڈو، وارم اپ، کم از کم شرح، اور کم از کم قابل پیمائش آؤٹ پٹ عام لچک کی ترتیبات کی نارملائزیشن پرت سے منسلک ہیں۔

فعال ہونے پر، واچ ڈاگ اسقاط کا اطلاق صرف فعال اپ اسٹریم کوشش پر ہوتا ہے۔ کسی بھی کلائنٹ کے نظر آنے والے بائٹس سے پہلے، موجودہ ایک ہی اکاؤنٹ کی ابتدائی بحالی کا راستہ کوشش کو دوبارہ کھول سکتا ہے۔ کمٹ کے بعد، سلسلہ کو کبھی آنکھ بند کرکے دوبارہ نہیں چلایا جاتا ہے۔ صرف موجودہ محفوظ وسط دھارے کے تسلسل کا معاہدہ لاحقہ سلائی کر سکتا ہے۔ فائنلائزیشن سنگل شاٹ رہتا ہے، لہذا استعمال کا حساب کتاب اور سیمفور ریلیز ڈپلیکیٹ نہیں کیا جاتا ہے۔

---

## 7. اپ اسٹریم اسٹیٹس کی ازسرنو تعیین (غلط بیان کردہ کوٹا کی خرابیوں کے لیے)

**دائرۂ کار:** ایک اپ اسٹریم گیٹ وے جو عارضی کوٹا ختم ہونے کی اطلاع غلط HTTP اسٹیٹس کے ساتھ دیتا ہے۔

**مقصد:** درجہ بندی سے **پہلے** گمراہ کن اسٹیٹس کو درست کرنا، تاکہ ڈاؤن اسٹریم صارفین (فال بیک انجن، کومبو ایگریگیشن، کلائنٹ کو واپس کیا جانے والا جواب) ناکامی کی حقیقی قابلِ دوبارہ کوشش نوعیت دیکھ سکیں۔

کچھ گیٹ ویز عارضی کوٹا ختم ہونے کی اطلاع ایسے HTTP اسٹیٹس کے ساتھ دیتے ہیں جو دوبارہ کوشش کے قابل نہیں ہوتا۔ `agentrouter.org` معیاری `429` کے بجائے چینی متن (`用户额度不足` / `额度不足`) کے ساتھ `403` (کبھی کبھار `400`) واپس کرتا ہے۔ Claude
Code جیسے کلائنٹس `403` کو مستقل خرابی سمجھ کر سیشن ختم کر دیتے ہیں، اور اصلاح کے بغیر فال بیک انجن اسے کوٹا ایونٹ کے بجائے `AUTH_ERROR` کے طور پر درجہ بند کرتا۔

**عمل درآمد:**

- رجسٹری + میچر: `open-sse/config/upstreamStatusRestatement.ts` — فی فراہم کنندہ قواعد کی فہرست (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`)، جن کا اطلاق `applyStatusRestatement()` کے ذریعے ہوتا ہے۔
- کال سائٹ: `open-sse/handlers/chatCore.ts` کے `providerFailure:` بلاک میں
  (تقریباً لائن 3654)، عین اس وقت جب `parseUpstreamError()` کسی اپ اسٹریم جواب کو
  خرابی والے HTTP اسٹیٹس (`!providerResponse.ok`) کے ساتھ پارس کر لیتا ہے، اور کسی بھی درجہ بندی کے چلنے سے پہلے، تاکہ ہر ڈاؤن اسٹریم صارف کو درست شدہ اسٹیٹس نظر آئے۔ `200` SSE اسٹریم کے اندر شامل خرابیاں ایک الگ، بعد کے اسٹریم پارسنگ راستے سے گزرتی ہیں اور آج اس ہک کے دائرے میں **شامل نہیں** ہیں — یہ ایک معلوم حد ہے، جس کی فی الحال ضرورت نہیں، کیونکہ agentrouter کی غلط اسٹیٹس والی خرابی HTTP اسٹیٹس کے ساتھ ظاہر ہوتی ہے۔
- دوبارہ کوشش کی اہلیت: `429`، `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`) میں شامل ہے، اس لیے ازسرنو متعین کردہ خرابی مردہ `403` کے طور پر ظاہر ہونے کے بجائے حقیقی دوبارہ کوشش کی مدت رکھتی ہے۔
- مصنوعی `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  صرف وہ مدت ہے جو ازسرنو متعین شدہ جواب **کلائنٹ** کو بتاتا ہے؛ یہ خود کنکشن کی اندرونی کول ڈاؤن/لاک آؤٹ مدت نہیں ہے — اس کا تعین الگ سے اس طریقۂ کار کے ذریعے ہوتا ہے جو حقیقتاً ازسرنو متعین شدہ خرابی کو سنبھالتا ہے (کنکشن کول ڈاؤن کا بتدریج بڑھتا ہوا بیک آف، §2، API-key فراہم کنندگان کے لیے بنیادی `3s`؛ یا Model Lockout، §3، فی ماڈل کوٹا والے فراہم کنندگان جیسے agentrouter کے لیے)۔ روٹر اندرونی طور پر کلائنٹ کو بتائی گئی 60 سیکنڈ کی مدت سے پہلے دوبارہ کوشش کے لیے اہل ہو سکتا ہے — یہ دانستہ اضافی گنجائش ہے، بگ نہیں۔

مستقل خرابیاں (agentrouter کی `无权访问模型` — اس ماڈل تک رسائی نہیں) **کبھی بھی** ازسرنو متعین نہیں کی جاتیں: `excludeMarkers`، `textMarkers` کے مماثل ہونے پر بھی قاعدے کو ویٹو کرتا ہے، اس لیے خرابی اپنا اصل اسٹیٹس برقرار رکھتی ہے اور کوئی چیز اسے ہمیشہ کے لیے دوبارہ کوشش نہیں کرواتی۔ مماثل فراہم کنندہ درجہ بندی کا قاعدہ
(`open-sse/config/providerErrorRules.ts` میں `agentrouter-model-access-denied`:
`reason: "auth_error"`، `scope: "model"`، اعلان کردہ بنیادی کول ڈاؤن `6h`) کو `checkFallbackError` (`open-sse/services/accountFallback.ts`)
عام apikey-زمرے کے `FORBIDDEN` ابتدائی واپسی سے _پہلے_ دیکھتا ہے، اور یہ
`honorsRuleLockScope(provider)` (#10334 — فی الحال
`providerErrorRules.ts` میں موجود `HONORS_RULE_LOCK_SCOPE_PROVIDERS` کی اجازت یافتہ فہرست کے ذریعے صرف agentrouter تک محدود) پر منحصر ہے۔ قاعدے کا اعلان کردہ 6h کول ڈاؤن `fallbackResult.baseCooldownMs` کے ذریعے آگے منتقل ہوتا ہے، لیکن یہ پھر بھی پہلے سے موجود فی ماڈل کوٹا لاک آؤٹ راستے (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`، جسے #10334 نے کول ڈاؤن کے ماخذ کے علاوہ تبدیل نہیں کیا) کو استعمال کرتا ہے: اسے آپریٹر کی `mlSettings.maxCooldownMs`
(پہلے سے طے شدہ `1_800_000ms` / 30min) تک کم کیا جاتا ہے، بالکل ہر دوسرے ماڈل لاک آؤٹ کی طرح، اور _مستقل کیے گئے لاک آؤٹ کی وجہ_ پہلے سے موجود ہارڈ کوڈ شدہ `"forbidden"` ہی رہتی ہے، قاعدے کی `"auth_error"` نہیں — آخر تا آخر صرف کول ڈاؤن کی مدت کو تسلیم کیا جاتا ہے، وجہ کے متن کو نہیں۔ کنکشن خود فعال رہتا ہے؛ اسی کنکشن پر موجود ہم رتبہ ماڈلز متاثر نہیں ہوتے۔

ازسرنو متعین شدہ کوٹا کی خرابیاں (`额度不足`) پروڈکشن میں ایک فراہم کنندہ کے قاعدے تک پہنچتی ہیں
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`، `scope:
"connection"`، اپنے طور پر کوئی اعلان کردہ کول ڈاؤن نہیں — پرسیسٹنس لیئر کا اسکیل شدہ بیک آف ڈیفالٹ لاگو ہوتا ہے)۔ #10334 کے بعد،
`ProviderErrorRuleMatch` پر موجود `scope` کو آخر تا آخر استعمال کیا جاتا ہے، لیکن **صرف** `HONORS_RULE_LOCK_SCOPE_PROVIDERS` کی اجازت یافتہ فہرست میں موجود فراہم کنندگان کے لیے (`providerErrorRules.ts` — آج صرف `"agentrouter"`، `honorsRuleLockScope()` کے ذریعے مشروط)۔ ہر دوسرے فراہم کنندہ کے لیے `scope` معلوماتی ہی رہتا ہے، بالکل #10334 سے پہلے کی طرح۔
`checkFallbackError` مماثل قاعدے کا scope بطور `fallbackResult.ruleScope` فراہم کرتا ہے؛
`isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) مشترکہ گارڈ ہے جو تصدیق کرتا ہے کہ `ruleScope` کو واقعی کنکشن-سطح کے، خود بحال ہونے والے سگنل کے طور پر محفوظ طریقے سے استعمال کیا جا سکتا ہے (scope `"connection"`، reason `quota_exhausted`، کبھی `permanent` نہیں، کبھی `creditsExhausted` نہیں — یہ مستقبل میں scope `"connection"` کو مستقل اکاؤنٹ کی حالت کے ساتھ جوڑنے کے خلاف حفاظتی اقدام ہے)۔ اسے دو صارفین کال کرتے ہیں:

- **پائیداری** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provider کے **فی ماڈل** لاک آؤٹ برانچ میں جانے کے بجائے (agentrouter میں `passthroughModels: true` ہے → `hasPerModelQuota()`، `true` واپس کرتا ہے)، یہ **عارضی کنکشن کول ڈاؤن** نافذ کرتا ہے —
  `testStatus: "unavailable"` + `rateLimitedUntil`، کبھی بھی کوئی حتمی اسٹیٹس نہیں
  (`credits_exhausted`/`banned`/`expired`) — تاکہ کول ڈاؤن ختم ہونے کے بعد کنکشن خود بحال ہو جائے، بجائے اس کے کہ دستی کریڈینشل ری سیٹ درکار ہو۔
  `disableCooling: true` والے کنکشنز کے لیے اسے چھوڑ دیا جاتا ہے (#2997): یہ آپٹ آؤٹ اس کے بجائے فی ماڈل لاک آؤٹ میں چلا جاتا ہے (ایک دستاویزی trade-off —
  برانچ کے اوپر موجود کوڈ کمنٹ دیکھیں)۔
- **اسی درخواست کی کومبو روٹنگ** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): یہی گارڈ کنکشن کو میموری میں موجود `exhaustedConnections` سیٹ میں شامل کرتا ہے، جس کی کلید
  `${provider}:${connectionId}` ہے۔ یہ صرف اسی SAME-REQUEST ہدف کو چھوڑتا ہے جو _خود اپنے ہدف آبجیکٹ_ میں وہی عین `connectionId` رکھتا ہو
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`، `exhaustedConnections` lookup سے پہلے `if (provider &&
connectionId)`) — ایک سادہ
  model-list combo، جس کے sibling targets میں اپنا کوئی pinned `connectionId` نہیں ہوتا اور ہر dispatch پر صرف response کے
  `X-OmniRoute-Selected-Connection-Id` header سے ایک کو resolve کیا جاتا ہے، کبھی اس key match تک نہیں پہنچتا۔ اس عام صورت میں کسی باقی leg کے ابھی ابھی exhausted اکاؤنٹ کو دوبارہ استعمال کرنے سے اصل تحفظ یہ Set نہیں ہے — بلکہ اوپر کی persistence layer ہے (کنکشن کا `rateLimitedUntil` اب مستقبل میں ہے)، اس کے ساتھ یہ same guard failure کے لیے `transientRateLimitedProviders` کو suppress کرتا ہے (دیکھیں "Two-stage design" اور `targetExhaustion.ts` میں
  `isAgentrouterConnectionQuotaScope` branch پر موجود کوڈ کمنٹ): چونکہ Set کو mark نہیں کیا گیا، اس لیے
  `combo.ts` کا `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) provider کی باقی legs کے لیے فعال نہیں ہوتا، لہٰذا credential selection کا `rateLimitedUntil`
  filter (`src/sse/services/auth.ts:1238`) معمول کے مطابق نافذ رہتا ہے اور باقی leg یا تو کسی دوسرے، اب بھی اہل agentrouter
  کنکشن کو منتخب کرتی ہے یا کوئی credentials دستیاب نہ ہونے کی صورت میں ناکام ہو جاتی ہے — یہ اس کنکشن پر زبردستی واپس نہیں جاتی جسے اس برانچ نے ابھی cool down کیا ہے۔

### دو مرحلوں کا ڈیزائن: اسٹیٹس کی ازسرنو وضاحت، پھر درجہ بندی

اسٹیٹس کی ازسرنو وضاحت (`upstreamStatusRestatement.ts`) اور provider
درجہ بندی کے قواعد (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) الگ الگ registries ہیں جو دونوں provider id
اور متنی markers کی بنیاد پر کام کرتی ہیں، لیکن مختلف مقامات پر چلتی ہیں اور مختلف مقاصد پورے کرتی ہیں: restatement، `chatCore.ts` میں HTTP status کو ابتدائی مرحلے میں دوبارہ لکھتا ہے؛
classification rules، `checkFallbackError()` (`open-sse/services/accountFallback.ts`) کے اندر fallback `reason` منتخب کرتے اور `scope`
(`model` / `provider` / `connection`) کو lock کرتے ہیں۔

Classification rules صرف مکمل error **text** دیکھتے ہیں (body
markers جیسے `额度不足` سے match کرنے کے لیے ضروری) ان providers کے لیے جو
`providerErrorRules.ts` میں موجود `FULL_TEXT_RULE_PROVIDERS`
allowlist میں درج ہیں — فی الحال صرف `"agentrouter"`۔ ہر دوسرے **built-in catalog** provider کے لیے، `checkFallbackError`،
`getProviderErrorRuleMatch` کو صرف structured error (`{code, type}`) دیتا ہے، جو header/status/code پر مبنی rules کے لیے کافی ہے لیکن body-text markers سے بے خبر رہتا ہے۔
helper `resolveRuleMatchBody()` یہ انتخاب کرتا ہے: allowlisted providers کے لیے مکمل error text، اور باقی کے لیے structured error۔ کسی **built-in** provider کو `FULL_TEXT_RULE_PROVIDERS` میں شامل کرنا ایک واضح per-provider opt-in ہے — یہ اس لیے موجود ہے کہ فہرست میں شامل نہ ہونے والے ہر provider کا default path byte-for-byte غیر تبدیل شدہ رہے۔

کسی rule کا `scope` (`model` / `provider` / `connection`)، `FULL_TEXT_RULE_PROVIDERS` سے الگ opt-in ہے: `checkFallbackError` اسے صرف `fallbackResult.ruleScope` کے طور پر ظاہر کرتا ہے، اور downstream consumers اسے informational label کے علاوہ کسی اور چیز کے طور پر صرف ان providers کے لیے تسلیم کرتے ہیں جو اسی file کی
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist میں درج ہیں (یہ `honorsRuleLockScope()` کے ذریعے gated ہے — آج صرف `"agentrouter"`)۔ یہ جاننے کے لیے کہ provider کے اس allowlist میں شامل ہونے کے بعد
`scope: "connection"` match حقیقت میں کیا کرتا ہے، اوپر "Restated quota
errors" دیکھیں۔

**#11104 — operator کے ذریعے بیان کردہ rules دونوں allowlists کو bypass کرتے ہیں۔** کوئی operator runtime پر
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
کے ذریعے فی provider rule بیان کر سکتا ہے، اس file میں ترمیم کیے بغیر۔ کسی operator rule کو
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — ایسی allowlists جو **default** built-in catalog rules کے رویے کو محفوظ رکھنے کے لیے ہیں — کے پیچھے رکھنا settings mechanism کو پہلے سے درج providers کے علاوہ ہر provider کے لیے بے اثر بنا دے گا، کیونکہ rule کا اعلان خود operator کا واضح opt-in ہے۔ `resolveRuleMatchBody()` اور `honorsRuleLockScope()` دونوں پہلے
`hasOperatorRuleForProvider()` کو check کرتے ہیں: operator rule والے provider کو raw error text ملتا ہے اور اس کا بیان کردہ `scope` تسلیم کیا جاتا ہے، چاہے وہ دونوں میں سے کسی allowlist میں شامل ہو یا نہ ہو۔

**Operator کے ذریعے بیان کردہ rules** (`OperatorProviderErrorRule`): ہر rule میں اختیاری
`status` اور اختیاری `match` ہوتا ہے (error text کا سادہ، case-insensitive substring، کبھی RegExp نہیں، اس لیے یہ ReDoS کا سبب نہیں بن سکتا)، اور اسے دونوں میں سے کم از کم ایک مقرر کرنا ضروری ہے۔ جب دونوں مقرر ہوں تو انہیں AND کے ساتھ ملایا جاتا ہے؛ حذف شدہ field کسی بھی چیز سے match کرتا ہے، اس لیے `{match: "insufficient_quota"}` کسی بھی ایسے status سے match کرتا ہے جس میں وہ code موجود ہو۔ پہلی matching rule کامیاب ہوتی ہے۔ `cooldownMs` زیادہ سے زیادہ 30 دن قبول کرتا ہے؛ کل زیادہ سے زیادہ 50 rules۔

**تمام صورتوں کے لیے ڈیفالٹس** (`settings.providerErrorDefaults`, اختیاری، `setOperatorProviderErrorDefaults` کے ذریعے سیٹ کیا جاتا ہے): `{[provider]: {cooldownMs, scope?, reason?}}`
جس میں `cooldownMs` کی حد 1 منٹ سے 30 دن تک ہے۔ ڈیفالٹ صرف اس وقت لاگو ہوتا ہے جب کوئی آپریٹر رول اور کوئی بلٹ اِن کیٹلاگ رول مماثل نہ ہو، اور صرف 402، 403، 408، 429 اور 5xx خرابیوں پر لاگو ہوتا ہے۔ درخواست کی ساخت سے متعلق خرابیاں (400، 404، 409، 413، 422) اور سادہ 401 اپنی مخصوص ہینڈلنگ برقرار رکھتے ہیں۔ واضح `reason` نہ ہونے کی صورت میں وجہ اسٹیٹس سے اخذ کی جاتی ہے، بالکل اسی طرح جیسے `classifyError` میں ہوتا ہے۔ ڈیفالٹ کا اعلان `hasOperatorRuleForProvider()` کے لیے آپریٹر رول شمار ہوتا ہے، لہٰذا اس کا `scope` (ڈیفالٹ `"connection"`) نافذ کیا جاتا ہے۔ ڈیفالٹ کا مؤثر کول ڈاؤن اس کے `cooldownMs` اور فراہم کنندہ کے اپنے ریٹری اشارے (`Retry-After`، `x-ratelimit-reset` یا باڈی میں موجود ری سیٹ اشارہ، یعنی وہی اشارہ جسے انجن اس وقت تسلیم کرتا ہے جب کنکشن کول ڈاؤن کی ترتیب "use upstream retry hints" فعال ہو) میں سے زیادہ طویل ہوگا؛ چنانچہ ڈیفالٹ مختصر upstream اشارے کو بڑھا سکتا ہے، مگر حقیقی ری سیٹ کو کبھی مختصر نہیں کر سکتا۔ واضح آپریٹر رول اپنا عین `cooldownMs` برقرار رکھتا ہے۔ نہ کوئی رول اور نہ کوئی ڈیفالٹ `markAccountUnavailable` میں موجود کنکشن کول ڈاؤن گارڈز کو نظرانداز کرتا ہے: فعال اور زیادہ طویل کول ڈاؤن کو کبھی مختصر نہیں کیا جاتا، اور ٹرمینل اسٹیٹس کو کبھی اوور رائٹ نہیں کیا جاتا۔ `checkFallbackError` میں پہلے چلنے والے بلٹ اِن ٹیکسٹ ڈیٹیکٹرز (کریڈٹس ختم، یومیہ کوٹا، اکاؤنٹ غیر فعال) اپنے مخصوص فقروں کے لیے بدستور ترجیح رکھتے ہیں۔

**معلوم خلا — `providerRuleRegistry` کو HTTP 400 کے لیے کبھی استعمال نہیں کیا جاتا۔**
`checkFallbackError` کی `BAD_REQUEST` برانچ اسٹیٹس 400 کو مکمل طور پر اپنی پیٹرن ارےز (`MODEL_ACCESS_DENIED_PATTERNS`، `CONTEXT_OVERFLOW_PATTERNS` وغیرہ، `accountFallback.ts` میں) کے ذریعے درجہ بند کرتی ہے اور اس سے پہلے واپس آ جاتی ہے کہ اوپر موجود `configuredRule`/`getProviderErrorRuleMatch` برانچ تک رسائی ہو۔ `status: 400` والا بلٹ اِن کیٹلاگ رول (یا آپریٹر رول) نحوی طور پر درست ہے، مگر کبھی فعال نہیں ہوگا۔ آج کوئی موجودہ رول 400 کو ہدف نہیں بناتا، اس لیے پروڈکشن میں کچھ متاثر نہیں ہوتا — لیکن مستقبل کے 400 رول کے لیے پہلے اس برانچ میں تبدیلی درکار ہوگی، جو صرف رول شامل کرنے سے کہیں بڑی تبدیلی ہے (کیونکہ اس سے ہر اس فراہم کنندہ کے لیے 400 کی درجہ بندی دوبارہ متعین ہوگی جو پہلے ہی پیٹرن ارے کے رویے پر انحصار کرتا ہے) اور ایک واحد فراہم کنندہ رول شامل کرنے کے دائرۂ کار سے باہر ہے۔

### نیا کوٹا غلط بیان کرنے والا گیٹ وے شامل کرنا

1. `statusRestatementRegistry` میں ایک رول ارے رجسٹر کریں
   (`open-sse/config/upstreamStatusRestatement.ts`)۔ `textMarkers` کو فراہم کنندہ کے لیے مخصوص رکھیں؛ کبھی بھی ایسے عمومی انگریزی فقروں کو دوبارہ استعمال نہ کریں جو
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`) سے متصادم ہوں۔
2. درست لاک اسکوپ منتخب کرنے کے لیے اختیاری طور پر
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) میں درجہ بندی کے رول رجسٹر کریں
   (اکاؤنٹ بھر کے کوٹے کے لیے `connection`، فی ماڈل خرابیوں کے لیے `model`)۔ یہ مرحلہ پروڈکشن میں صرف ان فراہم کنندگان کے لیے مؤثر ہوتا ہے جن کے رولز کو مکمل خرابی کا متن درکار ہو (باڈی مارکرز): اسی فائل میں فراہم کنندہ کی id کو `FULL_TEXT_RULE_PROVIDERS` میں شامل کریں — بصورتِ دیگر `checkFallbackError` رول کو صرف ساختی
   `{code, type}` خرابی فراہم کرتا ہے اور باڈی-ٹیکسٹ رول لائیو ٹریفک میں کبھی مماثل نہیں ہوگا۔
   ایسے رولز جو صرف `status`/`headers` پر مماثل ہوتے ہیں (جیسے Opencode یا Minimax کے رولز) کو اس opt-in کی ضرورت نہیں۔
   الگ طور پر، اگر رول `scope: "connection"` بیان کرتا ہے اور مقصد حقیقی طور پر کنکشن-وائیڈ کول ڈاؤن کے ساتھ اسی درخواست کا کومبو اسکیپ ہے (صرف معلوماتی لیبل نہیں)، تو اسی فائل میں فراہم کنندہ کی id کو `HONORS_RULE_LOCK_SCOPE_PROVIDERS` میں شامل کریں — یہی چیز `isAgentrouterConnectionQuotaScope()` طرز کے استعمال کو
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) اور
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) میں فعال یا غیر فعال کرتی ہے؛ اس کے بغیر `scope`
   پھر بھی `fallbackResult.ruleScope` کے ذریعے آگے منتقل ہوتا ہے، مگر اس پر کوئی عمل نہیں ہوتا۔
3. `tests/unit/upstream-status-restatement.test.ts`
   اور `tests/unit/agentrouter-error-rules.test.ts` کی طرز پر یونٹ ٹیسٹس شامل کریں (ان میں
   not-permanent / not-creditsExhausted گارڈز بھی شامل ہوں، اور — اگر فراہم کنندہ کو allowlist درکار ہو — ایسا ٹیسٹ بھی شامل کریں جو ثابت کرے کہ `resolveRuleMatchBody()` صرف اسی فراہم کنندہ کے لیے مکمل متن واپس کرتا ہے)۔

`chatCore.ts`، `classifyError` یا combo میں کسی تبدیلی کی ضرورت نہیں۔

#### ایگریس-بکٹڈ لاک (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode فیملی) میں شامل فراہم کنندگان کو
IP-bucketed upstream سمجھا جاتا ہے (opencode کا مفت درجہ IP-bucketed ہے، اکاؤنٹ-bucketed نہیں — #9611 ملاحظہ کریں): status-429 کو `quota_exhausted`
**یا** `rate_limit_exceeded` کے طور پر درجہ بند کیے جانے پر، اس کنکشن کے آخری معلوم ایگریس IP سے مماثل آخری معلوم ایگریس IP رکھنے والے ہر allowlisted-family کنکشن کو ٹھنڈا کیا جاتا ہے، اس سے پہلے کہ روٹیشن انہیں آزما سکے
— یوں N-1 یقینی طور پر ناکام ہونے والی upstream کالز سے بچا جاتا ہے (#10460/#10525 جیسی ہی صورت)۔
`rate_limit_exceeded` کو دانستہ طور پر شامل کیا گیا ہے: `markAccountUnavailable` کے راستے پر opencode کے مخصوص رولز کبھی مماثل نہیں ہوتے (کوئی headers/body `checkFallbackError` کو فراہم نہیں کیے جاتے، اور opencode `FULL_TEXT_RULE_PROVIDERS` میں شامل نہیں ہے)، لہٰذا ایسی 429 جس کی باڈی میں سبسکرپشن-کوٹا متن ("monthly usage limit reached") ہو، `status_429` رول تک پہنچنے سے پہلے کوٹا-ٹیکسٹ فال بیک (`buildSubscriptionQuotaFallback`، `accountFallback.ts`؛ 1 گھنٹے کا کول ڈاؤن) کے ذریعے `quota_exhausted` کے طور پر درجہ بند ہوتی ہے — جبکہ کوٹا-ٹیکسٹ سے خالی 429 (سادہ ریٹ لمٹنگ) `status_429` رول کے ذریعے `rate_limit_exceeded` کے طور پر درجہ بند ہوتی ہے اور پھر بھی IP فیملی کو ٹھنڈا کرتی ہے۔ کسی allowlisted فراہم کنندہ کے لیے IP-bucketed ریٹ لمٹ، ختم شدہ کوٹے کے برابر ہی اشارہ ہے۔ حقیقی حدود:

- **بہترین کوشش**: لاک، `proxy_logs` سے کنکشن کے آخری معلوم `egress_ip` کو حل کرتا ہے (24 گھنٹے کی ونڈو، ہم وقت، بغیر کیش کے)۔ کولڈ کیش (`egress_ip` کی کبھی جانچ نہ ہوئی ہو) یا کوئی قطار نہ ملنے کی صورت میں → ناکام کنکشن کو برانچ کے ذریعے پھر بھی کول ڈاؤن کیا جاتا ہے (آج کی طرح ریکارڈ کیا جاتا ہے)، صرف کسی ہم رتبہ کنکشن کو لاک نہیں کیا جاتا۔
- **کبھی حتمی نہیں**: کول ڈاؤن ایک تجدید پذیر کوٹا ونڈو ہے (`testStatus: "unavailable"`)، اور IP-سطح کے سگنل سے کبھی مستقل حالت اخذ نہیں کی جاتی۔ `disableCooling` کنکشن اس برانچ کو مکمل طور پر چھوڑ دیتے ہیں۔
- **اجازت یافتہ فیملی کے لیے لاک کی سطح تبدیل ہوتی ہے**: یہ صرف ہم رتبہ کنکشن کی اصلاح نہیں بلکہ دائرۂ کار میں تبدیلی ہے۔ opencode ایک `passthroughModels` فراہم کنندہ ہے، اس لیے اس برانچ سے پہلے 429 فی-MODEL لاک آؤٹ پیدا کرتا تھا؛ اب یہ کنکشن کول ڈاؤن پیدا کرتا ہے — حتیٰ کہ ایسے آپریٹر کے لیے بھی جو صرف ایک کنکشن چلا رہا ہو اور اس کا کوئی ہم رتبہ کنکشن نہ ہو۔ یہی وہ سطح ہے جسے opencode کے اصولوں کی جدول پہلے ہی درست قرار دیتی ہے (`scope: "connection"`, `providerErrorRules.ts`)، مگر اب تک اس کا احترام نہیں کیا گیا کیونکہ opencode، `HONORS_RULE_LOCK_SCOPE_PROVIDERS` میں شامل نہیں ہے۔ یہ برانچ ناکام کنکشن کا کول ڈاؤن اور `backoffLevel` خود لکھتی ہے، connection-scoped agentrouter برانچ کی نقل کرتی ہے، اور واپس ہو جاتی ہے — فی-ماڈل بلاک اور نیچے دیا گیا عمومی راستہ کبھی نہیں پہنچتے۔
- **کمبو بھی شامل ہے**: agentrouter برانچ کی طرح، دائرۂ کار جان بوجھ کر `persistUnavailableState`/`isCombo` کی وہ تنزلی نظرانداز کرتا ہے جو کمبو کالر 429 پر لاگو کرتا ہے۔ فی-ماڈل لاک آؤٹ اس دائرۂ کار کی کمزور شکل نہیں بلکہ غلط اکائی ہے: یہ ختم ہو چکے IP کے بارے میں کچھ نہیں بتاتا، اس لیے کمبو روٹیشن ہر ہم رتبہ کنکشن کے لیے ایک یقینی طور پر ناکام کال ضائع کرتی رہے گی۔
- **ہم رتبہ کنکشن کی حفاظت**: جو ہم رتبہ کنکشن پہلے ہی حتمی حالت (banned/credits_exhausted) میں ہو یا پہلے ہی زیادہ طویل کول ڈاؤن میں ہو، اسے کبھی اوور رائٹ نہیں کیا جاتا۔
- **اختصاصی اجازت فہرست**: `EGRESS_BUCKETED_LOCK_PROVIDERS` کو وسیع کرنا مالک کا واضح فیصلہ ہے؛ کوئی عمومی وائرنگ نہیں (pattern #10334/#10419)۔ ہم رتبہ کنکشن کی کوئری اسی اجازت فہرست کو بائنڈ کرتی ہے، اسے SQL literal کے طور پر دوبارہ نہیں لکھتی، اس لیے اسے وسیع کرنا ایک سطری تبدیلی ہی رہتا ہے۔
- **دونوں سمتوں میں Egress IP روٹیشن**: تلاش کی ونڈو (24 گھنٹے) egress-IP کیش TTL (5 منٹ) سے کہیں زیادہ وسیع ہے، اس لیے "آخری معلوم IP" تاریخ ہے، موجودہ حالت نہیں۔ اگر ونڈو کے دوران کسی کنکشن کا پراکسی روٹیٹ ہو گیا ہو تو لاک حقیقی طور پر مشترک IP کو **نظرانداز کر سکتا ہے** (ریکارڈ شدہ IP نیا اور غیر ختم شدہ ہے) — اور اسی طرح یہ ایسے ہم رتبہ کنکشن کو **کول ڈاؤن کر سکتا ہے جو اس کے بعد ختم شدہ IP سے روٹیٹ ہو چکا ہو**۔ دوسری صورت میں اس ہم رتبہ کنکشن کو ایک کول ڈاؤن ونڈو کی لاگت برداشت کرنی پڑتی ہے؛ دونوں تاریخ پر مبنی تلاش کی منظور شدہ بہترین کوشش کی حدود ہیں۔
- **لاگت**: `proxy_logs` کے دو محدود اسکین (جو `idx_pl_timestamp` کے ذریعے ونڈو کے مطابق فلٹر کیے جاتے ہیں)، صرف 429 کی فریکوئنسی پر۔ کوئی نیا انڈیکس نہیں (migration 134 YAGNI)۔ پیمائش حقیقی ٹریفک کے درمیانے حجم کے DB کےپی پر کی گئی؛ زیادہ تھروپٹ رکھنے والی انسٹنس اسی ونڈو میں متناسب طور پر زیادہ قطاریں رکھتی ہے۔

## لچک کی دیگر خصوصیات

- **20 روٹنگ حکمت عملیاں** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — دیکھیے [AUTO-COMBO.md](../routing/AUTO-COMBO.md)۔
- **ری سیٹ سے آگاہ روٹنگ** (v3.8.0) — کنکشنز کو کوٹہ ری سیٹ وقت کے مطابق ترجیح دیتی ہے۔
- **بیک گراؤنڈ موڈ ڈیگریڈیشن** — Responses API کی `background: true` کو انتباہ کے ساتھ سنک موڈ پر ڈیگریڈ کر دیا جاتا ہے۔
- **متحرک ٹول حد کی شناخت** — ٹولوں کی تعداد کی حد لگنے پر پرووائیڈرز سے بیک آف کرتی ہے۔
- **ایمرجنسی فال بیک** — `OMNIROUTE_EMERGENCY_FALLBACK` سے کنٹرول ہوتا ہے؛ آپریٹرز اسے دوبارہ اسٹارٹ کیے بغیر فیچر فلیگز صفحے سے اوور رائیڈ کر سکتے ہیں۔

---

## ڈیبگنگ

- ویٹڈ کومبو `503 all_targets_cooling_down` کا جواب دیتا ہے (`Retry-After` سیٹ ہوتا ہے، `diagnostics.excluded` ہر ٹارگٹ کو `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` کے ساتھ فہرست میں دکھاتا ہے) → پول کنفیگر اور منسلک ہے، ہر ٹارگٹ صرف کسی لچک ٹائمر کی وجہ سے خارج ہے؛ `[COMBO] Weighted selection: every target excluded before dispatch — …` انتباہ وجوہات اور باقی سیکنڈز بتاتا ہے۔ اسی کومبو سے `404 no_executable_targets` کا مطلب ہے کہ کوئی لچک ٹائمر شامل نہیں تھا (چلانے کے لیے کچھ نہیں، یا ہر اکاؤنٹ دستیابی پروب میں ناکام ہو گیا)۔ یہ `targetResolution.ts` میں جمع کی گئی خارج شدگیوں سے `open-sse/services/combo/pinRecovery.ts` میں بنایا گیا ہے۔
- کسی پرووائیڈر کی تمام کیز نظر انداز ہو رہی ہیں → سرکٹ بریکر اسٹیٹ اور ہر کنکشن کا `rateLimitedUntil`/`testStatus` دونوں چیک کریں۔
- ری سیٹ ونڈو کے بعد پرووائیڈر مستقل طور پر خارج → کوڈ `getStatus()`/`canExecute()` کے بجائے خام `state` پڑھ رہا ہے۔
- ایک کی ناکام ہو، باقی کو چلنا چاہیے → سرکٹ بریکر کے بجائے کنکشن کول ڈاؤن کو ترجیح دیں۔
- صرف ایک ماڈل ناکام ہو → کنکشن کول ڈاؤن کے بجائے ماڈل لاک آؤٹ کو ترجیح دیں۔
- اسٹیٹ کو خود بحال ہو جانا چاہیے مگر نہیں ہوتی → مستقبل کا ٹائم اسٹیمپ اور وہ ریڈ پاتھ چیک کریں جو میعاد ختم شدہ اسٹیٹ کو تازہ کرتی ہو۔ مستقل اسٹیٹسز کے لیے دستی تبدیلی درکار ہوتی ہے۔

---

## رن ٹائم اسٹیٹ — ایجنٹ کے لیے فوری حوالہ

> `AGENTS.md` سے لفظ بہ لفظ منتقل کیا گیا → "Resilience Runtime State" (PR #12743) تاکہ ایجنٹ
> گائیڈ 40k کانٹیکسٹ بجٹ کے اندر رہے۔ یہ اوپر والے سیکشنز کا مختصر، ایجنٹ کے لیے بنا ہوا
> منظر ہے؛ نمبر دار سیکشنز مکمل حوالہ کے طور پر رہتے ہیں۔

OmniRoute میں عارضی ناکامی کے تین باہم مربوط مگر الگ الگ میکانزم ہیں۔ روٹنگ رویے کی ڈیبگنگ
کرتے وقت ان کے دائرہ کار کو الگ رکھیں۔ ایک نظر میں سمجھ آنے والے نقشے کے لیے
[3-لیئر ریزیلینس ڈایاگرام](../diagrams/exported/resilience-3layers.svg)
(ماخذ: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
دیکھیں۔

### پرووائیڈر سرکٹ بریکر

**دائرہ کار**: پورا پرووائیڈر، مثلاً `glm`، `openai`، `anthropic`۔

**مقصد**: ایسے پرووائیڈر کو ٹریفک بھیجنا بند کرنا جو اپ اسٹریم/سروس کی سطح پر بار بار
ناکام ہو رہا ہو، تاکہ ایک خراب پرووائیڈر ہر درخواست کو سست نہ کرے۔

**عمل درآمد**:

- بنیادی کلاس: `src/shared/utils/circuitBreaker.ts`
- چیٹ گیٹ/ایگزیکیوشن وائرنگ: `src/sse/handlers/chatHelpers.ts`، `src/sse/handlers/chat.ts`
- رن ٹائم اسٹیٹس API: `src/app/api/monitoring/health/route.ts`
- مشترک ریپرز: `open-sse/services/accountFallback.ts`
- مستقل محفوظ شدہ اسٹیٹ ٹیبل: `domain_circuit_breakers`

**اسٹیٹس** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: عام ٹریفک کی اجازت ہے۔
- `DEGRADED`: ابتدائی انتباہی حد — ناکامیاں ڈیگریڈیشن کی حد پار کر چکی ہیں مگر ابھی
  بریکر کی حد نہیں؛ ٹریفک اب بھی جاری رہتی ہے، ڈیش بورڈز انتباہ دکھاتے ہیں۔ کوئی درست کنکشن
  ٹیسٹ یا نئی ناکامی کے بغیر پرسکون ونڈو اسے واپس `CLOSED` کر دیتی ہے
  (`docs/architecture/RESILIENCE_GUIDE.md` میں ونڈو موجود ہے)۔
- `OPEN`: پرووائیڈر عارضی طور پر بلاک ہے؛ کالرز کو provider-circuit-open جواب ملتا ہے
  یا کومبو روٹنگ کسی دوسرے ٹارگٹ پر چلی جاتی ہے۔
- `HALF_OPEN`: ری سیٹ ٹائم آؤٹ گزر چکا ہے؛ ایک پروب درخواست کی اجازت دیں۔ کامیابی بریکر
  بند کر دیتی ہے، ناکامی اسے دوبارہ کھول دیتی ہے۔

**ڈیفالٹس** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`، جو
`src/lib/resilience/settings.ts` میں `DEFAULT_RESILIENCE_SETTINGS.providerBreaker` کے ذریعے استعمال ہوتی ہے →
`src/sse/handlers/chatHelpers.ts` میں `getCircuitBreaker(provider, …)`)۔ پورے پرووائیڈر کا
بریکر `circuitBreakerThreshold` / `circuitBreakerReset` پر چلتا ہے:

| پروفائل | ڈیگریڈ ہونے کی حد | کھلنے کی حد (`circuitBreakerThreshold`) | ری سیٹ (`circuitBreakerReset`) |
| ------- | ----------------: | --------------------------------------: | -----------------------------: |
| OAuth   |               `5` |                                     `8` |                          `60s` |
| API key |               `7` |                                    `12` |                          `30s` |
| مقامی   |         (اخذ شدہ) |                                     `2` |                          `15s` |

`PROVIDER_PROFILES` `providerFailureThreshold` (10/15/2)،
`providerFailureWindowMs` (15/30/5 منٹ) اور `providerCooldownMs` (5/10/1 منٹ) بھی متعین کرتی ہے: یہ
**آپٹ اِن عالمی پرووائیڈر کول ڈاؤن کی ونڈو گیٹ** کو چلاتے ہیں (`PROVIDER_COOLDOWN_ENABLED`، ڈیفالٹ
بند) — `open-sse/services/providerCooldownTracker.ts` میں پرووائیڈر سطح کا اندراج صرف اس وقت
کولنگ شمار ہوتا ہے جب `providerFailureWindowMs` کے اندر `providerFailureThreshold` ناکامیاں ہو جائیں، اور پھر
وہ `providerCooldownMs` کے لیے کول ہوتا ہے۔ یہ لائیو بریکر کی حدیں نہیں ہیں — انہیں
بریکر کے رویے کی توقع رکھتے ہوئے ٹیون نہ کریں۔ ہر ڈیفالٹ کو
`OMNIROUTE_PROVIDER_BREAKER_*` اور `OMNIROUTE_CIRCUIT_BREAKER_*` ماحول متغیرات کے ذریعے اوور رائیڈ کیا جا سکتا ہے؛
رن ٹائم کے مطابق درست حوالہ ٹیبل `docs/architecture/RESILIENCE_GUIDE.md` میں موجود ہے۔

صرف پرووائیڈر سطح کی ناکامی اسٹیٹسز ہی پرووائیڈر بریکر کو ٹرپ کریں:

```ts
(408, 500, 502, 503, 504);
```

عام اکاؤنٹ/کی/ماڈل غلطیوں — جیسے زیادہ تر
`401`، `403` یا `429` کے معاملات — پر پورے پرووائیڈر کا بریکر ٹرپ نہ کریں۔ یہ عموماً کنکشن کول ڈاؤن یا ماڈل
لاک آؤٹ سے تعلق رکھتے ہیں۔ کسی عمومی API کی پرووائیڈر کی `403` قابلِ بحال ہونی چاہیے جب تک
اسے حتمی پرووائیڈر/اکاؤنٹ خرابی کے طور پر درجہ بند نہ کیا جائے۔

بریکر بیک گراؤنڈ ٹائمر کے بجائے سست (lazy) بحالی استعمال کرتا ہے۔ جب `OPEN` کی مدت ختم ہو جائے، تو `getStatus()`، `canExecute()`، اور `getRetryAfterMs()` جیسے ریڈ آپریشنز اسٹیٹ کو `HALF_OPEN` میں تازہ کر دیتے ہیں، تاکہ ڈیش بورڈز اور کومبو امیدوار بنانے والے ٹولز میعاد ختم شدہ پرووائیڈر کو ہمیشہ کے لیے خارج نہ کرتے رہیں۔

### کنکشن کول ڈاؤن

**دائرہ**: ایک پرووائیڈر کنکشن/اکاؤنٹ/کی۔

**مقصد**: ایک خراب کی/اکاؤنٹ کو عارضی طور پر نظر انداز کرنا جبکہ اسی پرووائیڈر کے دیگر کنکشنز کو درخواستیں فراہم کرتے رہنے دینا۔

**نفاذ**:

- لکھنے/اپڈیٹ کرنے کا راستہ: `src/sse/services/auth.ts::markAccountUnavailable()`
- اکاؤنٹ کا انتخاب/فلٹرنگ: `src/sse/services/auth.ts::getProviderCredentials...`
- کول ڈاؤن کا حساب: `open-sse/services/accountFallback.ts::checkFallbackError()`
- ترتیبات: `src/lib/resilience/settings.ts`

پرووائیڈر کنکشنز پر اہم فیلڈز:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

اکاؤنٹ کے انتخاب کے دوران، ایک کنکشن کو اس وقت تک نظر انداز کیا جاتا ہے جب تک:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

کول ڈاؤن بھی سست (lazy) ہوتے ہیں: جب `rateLimitedUntil` ماضی میں ہو جائے، تو کنکشن دوبارہ اہل ہو جاتا ہے۔ کامیاب استعمال پر، `clearAccountError()` فیلڈ `testStatus`، `rateLimitedUntil`، ایرر فیلڈز، اور `backoffLevel` کو صاف کر دیتا ہے۔

پہلے سے طے شدہ کنکشن کول ڈاؤن طرزِ عمل:

- OAuth بنیادی کول ڈاؤن: `5s`۔
- API-key بنیادی کول ڈاؤن: `3s`۔
- API-key `429` کو دستیاب ہونے پر اپ اسٹریم دوبارہ کوشش کے اشارے (`Retry-After`، ری سیٹ ہیڈرز، یا قابلِ تجزیہ ری سیٹ متن) کو ترجیح دینی چاہیے۔
- بار بار ہونے والی قابلِ بحالی ناکامیاں ایکسپونینشل بیک آف استعمال کرتی ہیں:

```ts
baseCooldownMs * 2 ** failureIndex;
```

اینٹی تھنڈرنگ ہرڈ گارڈ ایک ہی کنکشن پر بیک وقت ناکامیوں کو کول ڈاؤن کو بار بار بڑھانے یا `backoffLevel` کو دو دفعہ بڑھانے سے روکتا ہے۔

حتمی اسٹیٹس کول ڈاؤن نہیں ہوتیں۔ `banned`، `expired` (جو صرف `EXPIRED_RETRY_MAX` کے ذریعے N محدود دوبارہ کوششوں کے بعد حتمی بنتا ہے)، اور `credits_exhausted` کا مقصد یہ ہے کہ وہ اس وقت تک غیر دستیاب رہیں جب تک کہ اسناد/ترتیبات تبدیل نہ ہوں یا کوئی آپریٹر انہیں ری سیٹ نہ کرے۔ حتمی اسٹیٹس کو عارضی کول ڈاؤن اسٹیٹ سے اوور رائٹ نہ کریں۔

### ماڈل لاک آؤٹ

**دائرہ**: پرووائیڈر + کنکشن + ماڈل۔

**مقصد**: پورے کنکشن کو غیر فعال کرنے سے بچنا جب اس کنکشن کے لیے صرف ایک ماڈل غیر دستیاب یا کوٹہ کی حد تک محدود ہو۔

مثالیں:

- فی-ماڈل کوٹہ والے پرووائیڈرز جو `429` واپس کریں۔
- مقامی پرووائیڈرز جو ایک غائب ماڈل کے لیے `404` واپس کریں۔
- پرووائیڈر سے مخصوص موڈ/ماڈل اجازت کی ناکامیاں جیسے منتخب Grok موڈز۔

ماڈل لاک آؤٹ `open-sse/services/accountFallback.ts` میں موجود ہے اور یہ اسی کنکشن کو دوسرے ماڈلز کی خدمت جاری رکھنے دیتا ہے۔

### ڈیبگنگ رہنمائی

- اگر کسی پرووائیڈر کی تمام کیز نظر انداز ہو رہی ہوں، تو پرووائیڈر بریکر اسٹیٹ اور ہر کنکشن کے `rateLimitedUntil`/`testStatus` دونوں کا جائزہ لیں۔
- اگر ری سیٹ ونڈو کے بعد کوئی پرووائیڈر مستقل طور پر خارج نظر آئے، تو چیک کریں کہ آیا کوڈ `getStatus()`/`canExecute()` استعمال کرنے کے بجائے خام `state` پڑھ رہا ہے۔
- اگر ایک پرووائیڈر کی ناکام ہو جائے لیکن باقی کیز کو کام کرنا چاہیے، تو پرووائیڈر بریکر کے بجائے کنکشن کول ڈاؤن کو ترجیح دیں۔
- اگر صرف ایک ماڈل ناکام ہو، تو کنکشن کول ڈاؤن کے بجائے ماڈل لاک آؤٹ کو ترجیح دیں۔
- اگر کسی اسٹیٹ کو خود بحال ہونا چاہیے، تو اس کے پاس مستقبل کا ٹائم اسٹیمپ/ری سیٹ ٹائم آؤٹ اور ایک ایسا ریڈ پاتھ ہونا چاہیے جو میعاد ختم شدہ اسٹیٹ کو تازہ کرے۔ مستقل اسٹیٹس کے لیے دستی اسناد یا کنفگریشن میں تبدیلی درکار ہوتی ہے۔

---

## TLS فنگرپرنٹنگ اور اسٹیلتھ

پرووائیڈر مخصوص اسٹیلتھ (JA3/JA4, CCH, ابفسکیشن) الگ سے دستاویز کی گئی ہے — دیکھیے `docs/security/STEALTH_GUIDE.md` (git؛ `/docs` میں کمپائل نہیں ہوتی)۔

---

## لچکداری جانچ (فیز 8 · بلاک C)

لچکداری منطق کے لیے یونٹ ٹیسٹس کے علاوہ، تین ٹیسٹ رن ٹائم کو حقیقی دباؤ/ناکامی کی حالتوں میں آزماتے ہیں (تمام انٹیگریشن/نائٹلی — ان میں سے کوئی بھی PRs کو بلاک نہیں کرتا):

| ٹیسٹ      | کیا                                                                                                                                                                                                   | چلانے کا طریقہ                          |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| کیاؤس     | جعلی اپ سٹریم نوڈ حقیقی لیٹینسی/ری سیٹ/ٹائم آؤٹ/503 انجیکٹ کرتا ہے؛ تصدیق کرتا ہے کہ سرکٹ بریکر کھلتا/بحال ہوتا ہے اور `checkFallbackError` 503 کو قابلِ بازیابی فال بیک کے طور پر درجہ بندی کرتا ہے۔ | `RUN_CHAOS_INT=1 npm run test:chaos`    |
| ہیپ گروتھ | `--expose-gc` کے تحت ہر `createSSEStream` کے لیے ~500 اسٹریمز؛ اگر ہیپ حد سے بڑھ جائے تو ناکام ہوتا ہے (OOM گارڈ #3069)۔                                                                              | `npm run test:heap`                     |
| k6 سوک    | `/api/monitoring/health` کے خلاف مسلسل بوجھ؛ p95/ایرر تھریشولڈز۔                                                                                                                                      | `k6 run tests/load/k6-soak.js` (نائٹلی) |

`.github/workflows/nightly-resilience.yml` کے ذریعے آرکیسٹریٹ شدہ (cron + dispatch)۔ ڈیفالٹ `test:integration` میں، کیاؤس اور ہیپ خودکار طور پر اسکپ ہو جاتے ہیں (`RUN_CHAOS_INT`/`--expose-gc` کے بغیر)۔

---

## مزید دیکھیے

- [آرکیٹیکچر گائیڈ](./ARCHITECTURE.md) — سسٹم آرکیٹیکچر اور اندرونی کام
- [صارف گائیڈ](../guides/USER_GUIDE.md) — پرووائیڈرز، کمبوز، CLI انٹیگریشن
- [آٹو کمبو انجن](../routing/AUTO-COMBO.md) — 16 فیٹر اسکورنگ، موڈ پیکس
