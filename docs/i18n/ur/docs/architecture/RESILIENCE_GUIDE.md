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

## 2. کنکشن کولڈاؤن

**دائرہ کار:** واحد فراہم کنندہ connection/account/key.

**مقصد:** ایک خراب کلید کو چھوڑ دیں جب کہ اسی فراہم کنندہ کے دوسرے کنکشنز پیش کرتے رہیں۔

**نفاذ:**

- غیر دستیاب نشان: `src/sse/services/auth.ts::markAccountUnavailable()`
- انتخاب: اسی فائل میں `getProviderCredentials*`
- کولڈاؤن کیلک: `open-sse/services/accountFallback.ts::checkFallbackError()`
- ترتیبات: `src/lib/resilience/settings.ts`

**فی کنکشن فیلڈز:**

- کولڈاؤن کی میعاد ختم ہونے تک `rateLimitedUntil` — ٹائم اسٹیمپ
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — ایکسپونینشل بیک آف کاؤنٹر

**پہلے سے طے شدہ کولڈاؤنز:**

- OAuth بیس: 5s
- API کلیدی بنیاد: 3s
- API-key 429: upstream `Retry-After`/reset headers/parseable ری سیٹ ٹیکسٹ کو ترجیح دیتا ہے۔
- پیچھے ہٹنا: `baseCooldownMs * 2 ** failureIndex`

**فی فراہم کنندہ دوبارہ کوشش میں تاخیر۔** فراہم کنندہ کی تفصیل کے صفحے پر a ہے۔** تاخیر کی دوبارہ کوشش کریں۔** منتخب کریں (آٹو، 15 سے 1h تک)۔ یہ `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600، بذریعہ `PATCH /api/resilience`) بچاتا ہے۔ جب شرح کی حد کی خرابی میں کوئی اپ اسٹریم دوبارہ کوشش کا اشارہ نہیں ہوتا ہے، تو وہ قدر فراہم کنندہ کے لیے اسکیلڈ بیک آف کو بدل دیتی ہے اور `backoffLevel` کو 0 (`open-sse/services/rotationConfig.ts::overrideFor`) پر ری سیٹ کرتی ہے۔ شرح محدود غلطی کے لیے ترجیح، سب سے پہلے: اپ اسٹریم دوبارہ کوشش کا اشارہ، پھر فی کنکشن `providerSpecificData.rotationOverrides.rateLimitResetSeconds`، پھر فی فراہم کنندہ دوبارہ کوشش میں تاخیر، پھر env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`، پھر اسکیلڈ بیک آف۔ آٹو فیلڈ کو ہٹاتا ہے۔ یہ صرف شرح کی حد کی وجہ پر اثر انداز ہوتا ہے، کبھی بھی ٹرمینل اسٹیٹس نہیں ہوتا۔

**اینٹی تھنڈرنگ-ریوڑ گارڈ:** ہم آہنگی کی ناکامیوں کو زیادہ توسیع کولڈاؤن یا `backoffLevel` دوگنا بڑھانے سے روکتا ہے۔

**Concurrency-limit 429s بیک آف سیڑھی پر نہیں چڑھتے ہیں۔** ایک `429` جس کا جسم ہم آہنگی کی حد کی اطلاع دیتا ہے ("بہت زیادہ ہم آہنگی کی درخواستیں"، "کنکرنسی کی حد"، "متوازی درخواست کی حد"، GLM `并发数过高`) کا مطلب ہے کہ اکاؤنٹ صحت مند لیکن مصروف ہے۔ `checkFallbackError()` وجہ `concurrency_limited` واپس کرتا ہے : ابھی اگلے کنکشن میں ناکام ہو جائیں، اسے ایک فکسڈ `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) یا اپ اسٹریم دوبارہ کوشش کرنے کے اشارے کے لیے ٹھنڈا کریں، `backoffLevel` کوئی تبدیلی نہ کریں، اور `skipProviderBreaker` سیٹ کریں۔ ایک واضح کوٹہ باڈی اب بھی جیت جاتی ہے، لہذا ایک باڈی جو کوٹہ کے پیٹرن سے بھی میل کھاتی ہے وہ کوٹہ کا فیصلہ برقرار رہتا ہے۔ پتہ لگانا: `looksLikeConcurrencyLimit()` میں `src/shared/utils/classify429.ts`; فیصلہ : `open-sse/services/accountFallback/concurrencyLimit429.ts`۔ `classify429()` (توڑنے والے کا `FailureKind`) کوئی تبدیلی نہیں ہے اور پھر بھی ان لاشوں کے لیے `rate_limit` پڑھتا ہے۔

**اسٹریم مواد کے اسٹال اکاؤنٹ کو ٹھنڈا نہیں کرتے ہیں۔** جب کنٹینٹ اسٹال واچ ڈاگ (`open-sse/utils/streamHandler.ts`) اس سلسلے کو ترک کرتا ہے جس نے وقت پر کوئی ماڈل آؤٹ پٹ نہیں بھیجا تھا، `markAccountUnavailable()` کنکشن پر غلطی کو ریکارڈ کرتا ہے لیکن کوئی کولڈاؤن سیٹ نہیں کرتا ہے: اسٹال اس درخواست سے تعلق رکھتا ہے، اکثر اوقات ایک طویل استدلال موڑ ہوتا ہے جس میں کوئی آؤٹ پٹ نہیں ہوتا ہے۔ آپریٹرز `resilienceSettings.streamStallCooldown.enabled` (پہلے سے طے شدہ `false`) کے ساتھ آپٹ ان کر سکتے ہیں۔

**`p2c` اکاؤنٹ کے انتخاب کے لیے آپٹ ان لیٹنسی سگنل۔** ہر بھیجی گئی کوشش اپنے ٹائم ٹو فرسٹ بائٹ اور نتیجہ فی کنکشن (اور فی کنکشن + ماڈل) ان میموری رولنگ ونڈو میں ریکارڈ کرتی ہے: آخری 20 نمونے 15 منٹ کے اندر (`open-sse/services/connectionLatencyTracker.ts`، `src/sse/handlers/chatHelpers.ts` میں `safeLogEvents()` سے ریکارڈ کیے گئے)۔ جب `resilienceSettings.p2cLatency.weight` `0` سے اوپر ہوتا ہے (حد 0-20، پہلے سے طے شدہ `0` = آف)، `src/sse/services/auth.ts` میں `compareP2CConnections()` جوڑے کے ہر امیدوار کے لیے `weight` پوائنٹس تک کا اضافہ کرتا ہے۔ اس میں سے نصف تاخیر سے تیزی سے امیدوار کے تناسب کے طور پر آتا ہے (دوگنا دھیرے سے پورا نصف لیتا ہے) اور آدھا رولنگ ایرر ریٹ سے۔ اصطلاح کا اطلاق صرف اس صورت میں ہوتا ہے جب دونوں امیدواروں کے پاس کم از کم 3 نمونے ہوں، اس لیے نئے اکاؤنٹس پر جرمانہ نہیں کیا جاتا، اور اس کی حد کوٹہ بلاک شدہ اور کوٹہ ختم ہونے والے جرمانے سے نیچے رہتی ہے۔ یہ اپنا کوئی سرکٹ نہیں جوڑتا ہے: ناکام ہونے والے اکاؤنٹس کو ابھی بھی کول ڈاؤن، لاک آؤٹ اور بریکر لیئرز کے ذریعے ہینڈل کیا جاتا ہے۔ اسے `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` کے ساتھ سیٹ کریں۔

**ریزننگ فریم مواد اسٹال بجٹ کو دوبارہ شروع کرتے ہیں۔** ایک استدلال ماڈل اپنے پہلے نظر آنے والے ٹوکن سے پہلے منٹوں تک سوچ سکتا ہے: Claude `thinking_delta` فریموں کو سٹریم کرتا ہے جن کا سوچنے والا متن خالی ہو سکتا ہے، اور جوابات API ایک کے بعد ایک استدلال کو جاری کرتا ہے۔ `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) ان فریموں کو پہچانتا ہے، اور واچ ڈاگ باری کو منسوخ کرنے کے بجائے ہر ایک پر اپنا بجٹ دوبارہ شروع کرتا ہے۔ وہ اب بھی ماڈل آؤٹ پٹ نہیں ہیں، لہذا ایک موڑ جو صرف استدلال کے ساتھ ختم ہوتا ہے اب بھی خالی بتایا جاتا ہے، اور ایک موڑ جو استدلال کو روکتا ہے اور صرف دل کی دھڑکنوں کو بھیجتا ہے پھر بھی واچ ڈاگ کو ٹرپ کرتا ہے۔

غیر خالی دستخط کے ساتھ Kiro کے بائنری `reasoningContentEvent` فریم ایک خالی `reasoning_content` ڈیلٹا کے طور پر ایگزیکٹو کے ذریعے اس استدلال کی سرگرمی کو محفوظ رکھتے ہیں۔ دستخط آگے نہیں بھیجے جاتے۔ میٹا ڈیٹا، نامکمل فریم اور خالی دستخط مواد کے بجٹ کو دوبارہ شروع نہیں کرتے ہیں۔ آزاد ایکٹو اسٹریم ٹائم آؤٹ اور کلائنٹ کی منسوخی اب بھی لاگو ہوتی ہے (`open-sse/executors/kiro/reasoning.ts`)۔

**ٹرمینل اسٹیٹس (NOT cooldowns):**

- `banned` — ممنوعہ مطلوبہ الفاظ / اکاؤنٹ پر پابندی کا پتہ لگانے کے ذریعہ مقرر کیا گیا ہے (دیکھیں [BAN_DETECTION](../security/BAN_DETECTION.md) )، اور مسلسل تین اپ اسٹریم فی درخواست سے انکار (`request_rejected`، مثال کے طور پر Anthropic OAuth 403 "درخواست کی اجازت نہیں ہے" — `open-sse/services/requestRejectedStreak.ts`); صرف ایک انکار کنکشن کو ٹھنڈا کرتا ہے۔
- `expired` (باؤنڈڈ دوبارہ کوششوں کے بعد ٹرمینل میں منتقلی — `EXPIRED_RETRY_MAX = 3` کے ساتھ ایکسپونینشل بیک آف — تاکہ اکاؤنٹ کے مستقل طور پر غیر فعال ہونے سے پہلے عارضی OAuth غلطیاں خود ٹھیک ہو جائیں)
- `credits_exhausted`

یہ اس وقت تک برقرار رہتے ہیں جب تک کہ اسناد تبدیل نہ ہو جائیں یا کوئی آپریٹر انہیں دوبارہ ترتیب نہ دے دے۔ عارضی کول ڈاؤن حالت کے ساتھ ٹرمینل اسٹیٹس کو اوور رائٹ نہ کریں۔

**سست بحالی:** جب `rateLimitedUntil` گزر جاتا ہے، کنکشن دوبارہ اہل ہو جاتا ہے۔ کامیاب استعمال پر، `clearAccountError()` تمام ایرر فیلڈز کو صاف کرتا ہے۔

### Claude OAuth استعمال کی دیوار: کم ترجیحی لین + سیشن کی حد کو دوبارہ ترتیب دیں

**دائرہ کار:** ایک Claude سبسکرپشن (OAuth) کنکشن۔ دونوں خصوصیات ہیں۔** آپٹ ان فی کنکشن** (کنکشن → Claude سیکشن → `lowPriorityMode` / `autoLimitReset` میں `providerSpecificData` میں ترمیم کریں، دونوں ڈیفالٹ آف) اور Claude کوڈ کے `/low-priority` اور `/limit-reset` کمانڈز (وائر کنٹریکٹ Claude کوڈ 2.1.263 سے حاصل کیا گیا)۔

**نفاذ:**

- ریاستی مشین + ردعمل کی درجہ بندی: `open-sse/services/claudeLowPriority.ts`
- status/claim کلائنٹ کو دوبارہ ترتیب دیں: `open-sse/services/claudeLimitReset.ts`
- ایگزیکیوٹر ہک (ہیڈر انجیکشن + اسی اکاؤنٹ کی دوبارہ کوشش): `open-sse/executors/base.ts::execute()`
- آپٹ ان استقامت: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**محرک:** 5 گھنٹے کے استعمال کی دیوار — a `429` جس کے ہیڈرز میں `anthropic-ratelimit-unified-status: rejected` ہوتا ہے اور، جب اکاؤنٹ اہل ہوتا ہے، `anthropic-ratelimit-unified-slow-offer: treatment`۔ اس پہلی دیوار سے پہلے کچھ نہیں بھیجا جاتا 429; یونیفائیڈ ہیڈر کے بغیر برسٹ 429 عام کولڈاؤن پاتھ سے گزرتا ہے۔

**کم ترجیحی لین** (`lowPriorityMode`):

- وال 429 پر عملدرآمد کرنے والا پیشکش قبول کرتا ہے اور فوری طور پر دوبارہ کوشش کرتا ہے۔** ایک ہی** `anthropic-usage-limit: slow` کے ساتھ اکاؤنٹ؛ لین اس وقت تک فعال رہتی ہے جب تک کہ اعلان کردہ `anthropic-ratelimit-unified-reset` (+ 60s فضل) اور اس ونڈو میں ہر درخواست ہیڈر کے ساتھ نہ ہو۔ روکا ہوا 429 کبھی بھی `handleChatCore` تک نہیں پہنچتا، لہذا کنکشن ہے۔** نہیں** کولڈاؤن میں ڈال دیا اور دور نہیں گھمایا جاتا ہے.
- بعد کے جوابات پر `anthropic-ratelimit-unified-slow-status` : `active` / `not_needed` لین رکھیں؛ `slot_busy` (429) یا `529` سرور کے `anthropic-ratelimit-unified-slow-retry-after` انتظار کریں (پہلے سے طے شدہ 20s، کلیمپ 5–600s، ± 30% jitter) اور دوبارہ کوشش کریں، `anthropic-ratelimit-unified-slow-max-wait` کے ذریعے پابند ہوں (پہلے سے طے شدہ 20 منٹ، کلیمپ 1 منٹ–6 h) — گزرے اور ایک منٹ کے اختتام پر۔ دوبارہ قبولیت. انتظار کو اضافی طور پر درخواست کے اپنے اپ اسٹریم اسٹارٹ ٹائم آؤٹ (`resolveFetchStartTimeout`، 10 منٹ بذریعہ ڈیفالٹ) مائنس 5 s مارجن کے ذریعہ بھی محدود کیا جاتا ہے: اس کیپ کے بغیر 20 منٹ کا پہلے سے طے شدہ زیادہ سے زیادہ انتظار درخواست کو ختم کردے گا اور نیند کے درمیان انتظار کو ختم کردیا جائے گا، اس کی بجائے ایک `TimeoutError` `max_wait` endful + سرفیس کیا جائے گا۔
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`، ایک 5h-ونڈو رول اوور، یا `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (جو اسے کسی بھی حیثیت پر `extra_usage` کے طور پر ختم کرتا ہے، چونکہ ادائیگی کی زیادہ مقدار اب دیوار کو ڈھانپتی ہے) لین کو ختم کریں؛ جواب پھر عام کولڈاؤن پاتھ پر جاتا ہے۔ `budget_exhausted` اس وقت تک یاد رکھا جاتا ہے جب تک کہ اعلان کردہ بجٹ کو دوبارہ ترتیب نہیں دیا جاتا (≤ 8 دن)۔
- دیوار کی جانچ ایگزیکیوٹر کی اپنی 400 سے چلنے والی انٹرا ٹرمپٹ دوبارہ کوششوں (سیاق و سباق میں ترمیم، thinking/effort clamps، param auto-learn) کے بعد چلتی ہے، لہذا ایک دیوار 429 جو صرف ان کوششوں میں سے ایک پر ظاہر ہوتی ہے، کولڈاؤن پاتھ تک پہنچنے کے بجائے روکی جاتی ہے۔
- اسٹیٹ فی کنکشن میموری میں ہے (دوبارہ شروع کرنے پر دوبارہ قبول کرنے کے لیے ایک اضافی دیوار 429 لاگت آتی ہے)۔

**سیشن کی حد ری سیٹ** (`autoLimitReset`، لین سے پہلے کوشش کی جب دونوں آن ہوں):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` بلاک؛ جب `arm: "reset"` اور `available: true`، `{ "program": "juniper_tide" }` کے ساتھ `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` ( `providerSpecificData.organizationUUID` سے تنظیم UUID ، بوٹسٹریپ فال بیک)۔
- `result: reset|not_limited` → درخواست کی پوری رفتار سے دوبارہ کوشش کی جاتی ہے (کوئی سست ہیڈر نہیں)۔ `already_used` / `not_offered` memoise `next_available_at` (پہلے سے طے شدہ ایک ہفتہ)؛ کوئی بھی ناکامی 15 منٹ پر واپس آجاتی ہے۔ ری سیٹ ہفتے میں ایک بار ہوتا ہے اور پھر بھی ہفتہ وار حد میں شمار ہوتا ہے۔

ریگریشن گارڈز: `tests/unit/claude-low-priority-mode.test.ts`، `tests/unit/claude-limit-reset.test.ts`، `tests/unit/claude-low-priority-executor.test.ts`۔

### سیشن وابستگی (#7274)

**دائرہ کار:** ایک کلائنٹ سیشن (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` ہیڈر) ایک کنکشن پر پن کیا گیا، کے لیے** کوئی بھی** فراہم کنندہ

**مقصد:** تمام درخواستوں میں ایک ہی اکاؤنٹ پر ملٹی ٹرن ایجنٹ (Claude کوڈ، ایڈر، کسٹم ایجنٹس) رکھیں، کراس اکاؤنٹ سیاق و سباق کے نقصان کو کم کریں اور فی اکاؤنٹ سیشن کی حالت والے فراہم کنندگان پر بار بار کولڈ اسٹارٹ 429s۔

**نفاذ:**

- TTL قرارداد: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- پن selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- ہیڈر نکالنا (عام، کوئی فراہم کنندہ): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- برقرار پن ٹیبل: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- ترتیب: `sessionAffinityTtlMs` (عالمی TTL ms میں، `0` غیر فعال کرتا ہے) — `src/lib/db/settings.ts`۔ ہجرت `124_generic_session_affinity_ttl.sql` کے ذریعے Codex-only `codexSessionAffinityTtlMs` سے نام تبدیل کر دیا گیا، جو پہلے سے تشکیل شدہ Codex TTL نئے ڈیفالٹ کے طور پر لے جاتا ہے۔

#7274 سے پہلے، `resolveSessionAffinityTtlMs()` `codex` کے علاوہ ہر فراہم کنندہ کے لیے `0` کو سخت ضمانت دی، اس لیے TTL ترتیب (اور سیشن ہیڈرز) کا کہیں اور کوئی اثر نہیں ہوا حالانکہ پننگ میکانزم اور ہیڈر نکالنے والے پہلے سے ہی فراہم کنندہ کے علمی تھے۔ فکس نے اس ابتدائی واپسی کو ہٹا دیا۔ TTL اب ہر ایک فراہم کنندہ پر یکساں طور پر لاگو ہوتا ہے ایک بار عالمی سطح پر `0` سے اوپر سیٹ کیا جاتا ہے۔

تین سیشن-ایفینیٹی ہیڈرز کو کبھی بھی اپ اسٹریم — ایگزیکیوٹرز کو آگے نہیں بڑھایا جاتا ہے بجائے اس کے کہ وہ کلائنٹ ہیڈرز کو منتقل کرنے کے بجائے اپنے اپ اسٹریم ہیڈرز بناتا ہے، اس لیے یہ صرف ایک اندرونی ارتباطی شناخت رہتا ہے۔

### خصوصی منظم سیشن کنکشن لیز

**دائرہ کار:** ایک فعال زیر انتظام HTTP client/session ایک اہل OmniRoute کنکشن کا مالک ہے۔

**مقصد:** ان کلائنٹس کے لیے پائیدار خصوصی کنکشن کی ملکیت فراہم کریں جنہیں درخواستوں پر سخت روٹنگ کی باڑ کی ضرورت ہے۔ یہ سیشن وابستگی سے مختلف ہے، جو کہ ایک نرم تسلسل کی ترجیح ہے: ایک خصوصی لیز SQLite میں لائف سائیکل حالت کو برقرار رکھتی ہے، عالمی فعال-مالک اور فعال-کنکشن کی انفرادیت کو نافذ کرتی ہے، اور فراہم کنندہ کی ترسیل سے پہلے ایک باسی نسل کو مسترد کرتی ہے۔

فیچر آپٹ ان فی API کلید ہے۔ ایک منظم کلید میں `lease:exclusive` دائرہ کار اور ایک واضح غیر خالی `allowedConnections` فہرست ہونی چاہیے۔ کوئی بھی HTTP کلائنٹ لائف سائیکل اینڈ پوائنٹ استعمال کر سکتا ہے۔ کسی کلائنٹ کا نام، صارف ایجنٹ، فراہم کنندہ، OAuth طریقہ، یا ماڈل کی ضرورت نہیں ہے۔ لیز ایک کنکشن کی مالک ہے، ماڈل کی نہیں، لہذا ماڈل کی تبدیلی بائنڈنگ کو برقرار رکھتی ہے جب کہ کنکشن عام طور پر اہل رہتا ہے۔ عام ماڈل، کوٹہ، صحت، کولڈاؤن، اور اجازت کی فہرست کے قواعد مستند رہتے ہیں اور اسی نسل کو دوسرے مفت اہل کنکشن میں منتقل کر سکتے ہیں۔

لائف سائیکل `POST /api/v1/session-leases` ہے JSON ایکشنز `acquire`، `renew`، اور `release` کے ساتھ۔ منظم اندازے کی درخواستیں مبہم `X-OmniRoute-Lease-Owner` قدر اور عین مطابق `X-OmniRoute-Lease-Generation` پیش کرتی ہیں۔ مالک 43 base64url حروف کے بعد `vlo_` استعمال کرتا ہے۔ صرف اس کی SHA-256 ہیش محفوظ ہے۔ ہر حتمی ڈسپیچ باڑ تصدیق شدہ API کلید ID اور فعال کنکشن ID بھی پابند کرتی ہے۔ لیز کنٹرول ہیڈرز لاگز سے ہٹا دیے جاتے ہیں، درخواست کے اسنیپ شاٹس کو برقرار رکھا جاتا ہے، اور اپ اسٹریم ایگزیکیوٹر ہیڈرز۔

اگر عام روٹنگ میں اہل منظم امیدوار ہیں لیکن ہر آزاد امیدوار غیر ملکی فعال لیز پر قابض ہے، OmniRoute واپس کرتا ہے HTTP `429`، لیز-کیپیسٹی-غیر دستیاب کوڈ، ایک انتظار کی صلاحیت کی حالت، اور جلد سے جلد متعلقہ میعاد ختم ہونے سے اخذ کردہ ایک پابند `Retry-After` ۔ عام خالی اہلیت لیز کا تنازعہ نہیں ہے اور اس کی موجودہ روٹنگ ایرر سیمنٹکس کو برقرار رکھتی ہے۔

متعلقہ میکانزم الگ الگ رہتے ہیں:

- OAuth سیشن قبضے OAuth اکاؤنٹس کے لیے مقامی نرم تقسیم کا عمل ہے۔
- اکاؤنٹ کے سیمفورس درخواست کے موافق اجازت نامہ فراہم کرتے ہیں اور درخواست مکمل ہونے پر ختم ہو جاتے ہیں۔
- خصوصی انتظام شدہ سیشن لیز ایک نسل کی باڑ کے ساتھ پائیدار لائف سائیکل ملکیت ہیں۔

---

## 3. ماڈل لاک آؤٹ

**دائرہ کار:** پرووائیڈر + کنکشن + ماڈل کا ثلاثی امتزاج۔

**حیثیت کے لحاظ سے کلیدی دائرہ کار:** ناکام ہونے والی حیثیت طے کرتی ہے کہ لاک آؤٹ کس کلید پر لکھا جائے گا (`resolveLockoutScope()` میں `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — کوٹہ یا استحقاق کا اشارہ — **quota family** کو لاک کرتے ہیں:
  codex کے لیے پورا `codex` / `spark` دائرہ کار (اس کنکشن کے ہر `gpt-5*` ماڈل)،
  دیگر پرووائیڈرز کے لیے `getQuotaScopedModelForProvider()`۔
- `404` صرف بنیادی ماڈل کو لاک کرتا ہے (`getModelLockKey()` `not_found` کو محدود کرتا ہے)۔
- کوئی بھی دیگر حیثیت — `5xx` ٹرانسپورٹ/سرور ناکامیاں اور OmniRoute کی جانب سے کوالٹی توثیق سے تیار کردہ `502` — صرف **exact**
  پرووائیڈر/کنکشن/ماڈل امتزاج کو لاک کرتی ہے۔ ایک ماڈل پر خراب اسٹریم اس اکاؤنٹ کے کوٹہ کے بارے میں ثبوت نہیں ہے؛ اس اصول سے پہلے
  `codex/gpt-5.6-luna` پر ایک خالی جواب نے اس کنکشن کے ہر `gpt-5*` ماڈل کو 2–30 منٹ (بڑھتے ہوئے) تک روٹنگ سے ہٹا دیا تھا
  جبکہ اس کا کوٹہ اچھوتا تھا۔
- کال کرنے والے کا واضح `scope` آپشن ہمیشہ غالب رہتا ہے (Antigravity `"exact"` پاس کرتا ہے)۔

**مقصد:** جب صرف ایک ماڈل دستیاب نہ ہو یا کوٹہ محدود ہو تو پورے کنکشن کو غیر فعال کرنے سے بچنا۔

**مثالیں:**

- فی ماڈل کوٹہ فراہم کرنے والے پرووائیڈرز کا 429 واپس کرنا
- لوکل پرووائیڈرز کا ایک غائب ماڈل کے لیے 404 واپس کرنا
- پرووائیڈر کے مخصوص موڈ/ماڈل اجازت کی ناکامیاں (مثلاً، Grok موڈز)

**عمل درآمد:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`۔

### ماڈل کول ڈاؤنز ڈیش بورڈ (v3.8.0)

UI: سیٹنگز → ماڈل کول ڈاؤنز (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

فعال لاک آؤٹس کی فہرست دیتا ہے، ساتھ: پرووائیڈر، کنکشن، ماڈل، وجہ، expiresAt۔ آپریٹرز کارڈ سے کسی ماڈل کو دستی طور پر دوبارہ فعال کر سکتے ہیں۔

**REST API:**

- `GET /api/resilience/model-cooldowns` — فعال لاک آؤٹس کی فہرست
- `DELETE /api/resilience/model-cooldowns` — دستی طور پر دوبارہ فعال کرنا۔ باڈی: `{provider, connection, model}`۔ تصدیق: management۔

### کول ڈاؤن مینیجر

UI: مانیٹرنگ → کول ڈاؤن مینیجر (`src/app/(dashboard)/dashboard/resilience/cooldowns/`)۔

ہر اس کنکشن کے لیے ایک صفحہ جو کسی عارضی وجہ سے روٹنگ سے باہر ہے، بجائے اس کے کہ
ہر پرووائیڈر کا صفحہ کھولا جائے۔ یہ کنکشن کول ڈاؤنز، ماڈل لاک آؤٹس اور ٹرمینل
حالات کی فہرست دیتا ہے، انہیں فی کنکشن، کسی انتخاب کے لیے، یا کسی پرووائیڈر کے تمام کنکشنز کے لیے صاف کرتا ہے،
اور سب سے زیادہ ایڈجسٹ کیے جانے والے کول ڈاؤن اصولوں میں ترمیم کرتا ہے: `streamStallCooldown.enabled` اور OAuth / API-key
`connectionCooldown` بنیادی کول ڈاؤن اور زیادہ سے زیادہ بیک آف مراحل (جو `PATCH /api/resilience` کے ذریعے محفوظ ہوتے ہیں)۔ ٹرمینل حالات (`banned`, `expired`, `credits_exhausted`)
کی فہرست دی جاتی ہے لیکن یہاں کبھی صاف نہیں کیے جاتے۔

**REST API** (`src/lib/resilience/cooldownManager.ts`، تصدیق: management):

- `GET /api/resilience/cooldowns[?provider=]` — حیثیت، باقی کول ڈاؤن،
  بیک آف لیول، آخری ایرر قسم اور ماڈل لاک آؤٹس کے ساتھ کنکشنز (کوئی اسناد نہیں)
- `POST /api/resilience/cooldowns` — باڈی `{connectionIds: string[]}` یا
  `{all: true, provider?}`؛ واپس کرتا ہے `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### لاک آؤٹ سیٹنگز UI + success-decay بحالی (v3.8.23)

ماڈل لاک آؤٹ ہمیشہ فعال رہنے والے ہارڈ کوڈڈ رویے سے ایک مکمل طور پر قابلِ ترتیب،
اختیاری فیچر بن گیا ہے، جس کا اپنا سیٹنگز کارڈ اور خود سے بحال ہونے والا راستہ ہے۔

**سیٹنگز کارڈ:** سیٹنگز → ماڈل لاک آؤٹ
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)۔
یہ اوپر دیے گئے صرف پڑھنے کے قابل `ModelCooldownsCard` سے **الگ** ہے (جو صرف
فعال لاک آؤٹس کی _فہرست دیتا ہے_) — نیا کارڈ _پیرامیٹرز ترتیب دیتا ہے_۔ ڈیفالٹس
`DEFAULT_MODEL_LOCKOUT_SETTINGS` میں موجود ہیں
(`src/lib/resilience/modelLockoutSettings.ts`):

| سیٹنگ                   | ڈیفالٹ                           | مطلب                                                            |
| ----------------------- | -------------------------------- | --------------------------------------------------------------- |
| `enabled`               | `false`                          | ماسٹر ٹوگل — ماڈل لاک آؤٹ **ڈیفالٹ طور پر بند** ہے۔             |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | اپ اسٹریم حیثیتیں جو ماڈل کے دائرہ کار کی ناکامی شمار ہوتی ہیں۔ |
| `baseCooldownMs`        | `120_000` (120 سیکنڈ)            | پہلی ناکامی کے لیے ابتدائی لاک آؤٹ دورانیہ۔                     |
| `maxCooldownMs`         | `1_800_000` (30 منٹ)             | بڑھتے ہوئے کول ڈاؤن پر حد۔                                      |
| `maxBackoffSteps`       | `10`                             | زیادہ سے زیادہ exponential-backoff بڑھنے کے مراحل۔              |
| `useExponentialBackoff` | `true`                           | آیا بار بار ناکامیاں کول ڈاؤن کو exponentially بڑھاتی ہیں۔      |

سیٹنگز عام سیٹنگز اسٹور کے ذریعے محفوظ ہوتی ہیں اور
resilience سیٹنگز اسکیما کے ذریعے توثیق ہوتی ہیں؛ کارڈ `baseCooldownMs`/`maxCooldownMs`
(بشرطیکہ `maxCooldownMs ≥ baseCooldownMs`) اور `maxBackoffSteps` کو محدود کرتا ہے۔

**success-decay بحالی:** بحالی **صرف** ٹائمر کے ختم ہونے پر نہیں ہوتی۔ ایک صحت مند
جواب ماڈل کی ناکامیوں کی گنتی کو بتدریج کم کرتا ہے تاکہ جو ماڈل درمیانی وقفے میں بحال ہو گیا ہو،
وہ اپنے ٹائمر سے پہلے بڑھنا روک دے (اور صاف ہو جائے)۔ کامیاب
کومبو ہدف پر، `open-sse/services/combo.ts` `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) کو کال کرتا ہے، جو محفوظ `failureCount` کو **آدھا** کرتا ہے
(`Math.floor(failureCount / 2)`)؛ جب یہ `0` تک پہنچ جائے تو لاک آؤٹ اندراج مکمل طور پر حذف ہو جاتا ہے۔ اس کا ہم منصب `recordModelLockoutFailure()`
بڑھنے کی ونڈو کے اندر ناکامیوں پر گنتی بڑھاتا ہے (اور کول ڈاؤن کو بڑھاتا ہے)۔ یہ success-decay سادہ ٹائمر ختم ہونے کے علاوہ ہے —
دونوں میں سے کوئی بھی راستہ ماڈل کو دوبارہ فعال کر سکتا ہے۔

**حالت:** لاک آؤٹس **in-memory** رکھے جاتے ہیں (فی پروسیس `Map`s برائے
`ModelLockoutEntry` جن کی کلید `provider:connectionId:model` ہے، exact-scope لاک کے لیے
`provider:connectionId:exact:model`)، DB میں محفوظ نہیں ہوتے — ری اسٹارٹ پر ضائع ہو جاتے ہیں۔ _سیٹنگز_ محفوظ رہتی ہیں؛ فعال
لاک آؤٹ _حالت_ عارضی ہے۔

---

## 4. کوٹا شیئر کنکرنسی کنٹرول (v3.8.36)

سبسکرپشن اکاؤنٹس (GLM، MiniMax، وغیرہ) اکثر صرف ~ 1–3 سمورتی درخواستیں قبول کرتے ہیں۔ اس سے تجاوز کرنا 429s اور کولڈاؤن کو متحرک کرتا ہے۔ اس کے تحت شدید ہے** کوٹہ کا حصہ** (`qtSd/…`) combos، جہاں متعدد API کیز ایک اپ اسٹریم اکاؤنٹ کا اشتراک کرتی ہیں۔ تین پرتیں ایک مشترکہ اکاؤنٹ کو سیلاب سے بچاتی ہیں۔

### فی کنکشن کنکرنسی کیپ (`max_concurrent`)

ہر فراہم کنندہ کنکشن `max_concurrent` سیلنگ کا اعلان کر سکتا ہے (`provider_connections.max_concurrent`، کنکشن موڈل / API / DB میں سیٹ کیا گیا ہے)۔ بغیر کسی حد کے اسے خالی چھوڑ دیں۔ یہ واحد نوب ہے جو — کے نیچے سیریلائزیشن پرت کو چلاتا ہے اسے اکاؤنٹ کی حقیقی ہم آہنگی پر سیٹ کرتا ہے (جیسے GLM ~ 1، MiniMax ~ 2)۔

### فی ماڈل کنکرنسی کیپس (`modelConcurrency`)

ایک کنکشن اضافی طور پر اپنے `rateLimitOverrides` نقشے کے اندر عین مطابق فی ماڈل کنکرنسی سیلنگ کا اعلان کر سکتا ہے:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

اسے کنکشن موڈل میں سیٹ کریں (** شرح کی حد → فی ماڈل کنکرنسی کیپس کو اوور رائیڈ کرتی ہے۔** ، ایک `model=cap` فی لائن) یا اسی JSON شکل کے ساتھ `PATCH /api/providers/[id]` کے ذریعے۔ کلیدی الفاظ:

- **کنکشن وسیع بمقابلہ ماڈل مخصوص:** `maxConcurrent` مشترکہ کنکشن کی وسیع چھت ہے۔ جب دونوں لاگو ہوتے ہیں، دونوں گیٹ ایک ہی جامع گیٹ (`global → provider → account → model`) میں ایٹمی طور پر حاصل کیے جاتے ہیں۔ مؤثر رویہ سخت قابل اطلاق حد ہے۔
- **عین مطابق ماڈل کلید میچ:** کلید وہ ماڈل سٹرنگ ہے جو ریزولوشن — کو روٹنگ کرنے کے بعد ایگزیکیوٹر کو بھیجی جاتی ہے عام طور پر ننگی اپ اسٹریم ماڈل آئی ڈی (`glm-5`)، نہ کہ کلائنٹ سائیڈ `provider/model` عرف (`zai/glm-5` `glm-5` سے مماثل نہیں ہے)۔ اقدار مثبت-انٹیجر سمورتی-درخواست کی چھتیں ہیں۔
- **مقامی قطار، کوئی دریافت نہیں:** اضافی درخواستیں مقامی طور پر موجودہ queue/timeout سیمنٹکس (ٹائپ شدہ `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` داخلے کی غلطیاں) کے ساتھ قطار میں ہیں۔ OmniRoute اپ اسٹریم پالیسی کو دریافت یا اندازہ نہیں لگاتا ہے — یہ آپریٹر کی ترتیب کردہ عین مطابق حدوں کو نافذ کرتا ہے۔ ایک سیر شدہ ماڈل گیٹ کبھی بھی فراہم کنندہ کو غیر فعال نہیں کرتا ہے اور کبھی بھی مستقل ماڈل لاک آؤٹ نہیں بناتا ہے۔ upstream 429/cooldown/fallback برتاؤ غلطی کا بیک اسٹاپ رہتا ہے۔
- **فی کنکشن، فی عمل کی گنجائش:** caps فی ڈیٹا بیس کنکشن ہوتے ہیں اور میموری میں رکھے جاتے ہیں، لہذا ایک ہی upstream API کلید کو دوبارہ استعمال کرنے والے دو کنکشن ایک دوسرے کے ساتھ ہم آہنگ نہیں ہوتے ہیں۔
- **غیر ترتیب شدہ کا مطلب غیر تبدیل شدہ:** نقشہ کو چھوڑنا (یا ڈیش بورڈ فیلڈ کو خالی چھوڑنا) کوئی ماڈل گیٹ نہیں ڈالتا ہے۔ کسی بھی آفاقی فراہم کنندہ کی حد کو ظاہر کیے بغیر ترتیب کی مثال:

```text
glm-5=1
glm-4.7=3
```

### کوٹہ شیئر کی درخواست سیریلائزیشن

جب کوٹہ شیئر ڈسپیچ کسی ایسے کنکشن کو نشانہ بناتا ہے جو مثبت `max_concurrent` اعلان کرتا ہے تو اس کے لیے ہم آہنگ درخواستیں** اکاؤنٹ** فی کنکشن سیمفور (کلیدی `qsconn:<connectionId>`) کے ذریعے سیریلائز کیا جاتا ہے: اضافی درخواستیں** قطار میں انتظار کرو** اکاؤنٹ میں پانی بھرنے کے بجائے۔ یہ ہے** ناکام کھلا** — ایک سیر شدہ قطار یا ٹائم آؤٹ بغیر کسی سلاٹ کے آگے بڑھتا ہے بجائے اس کے کہ کبھی بھی بھیجی جانے والی درخواست کو مسترد کر دے۔ ٹوگل ان کریں۔** ترتیبات → لچکدار → کوٹہ شیئر فی کنکشن کنکرنسی** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`، ڈیفالٹ آن)۔ `max_concurrent` کیپ کے بغیر رویہ تبدیل نہیں ہوتا۔

> کوٹہ شیئر روٹنگ گیٹ (`selectQuotaShareTarget`, DRR + P2C) بذات خود فیل کھلا ہے اور صرف _deprioritizes_ ایک ایٹ-کیپ کنکشن — سنگل کنکشن پول کے ساتھ سخت حد تک محدود نہیں کر سکتا، لہذا یہ سیمفور وہ ہے جو دراصل سیلاب پر مشتمل ہے۔

### کومبو کولڈاؤن آگاہی کی دوبارہ کوشش کریں۔

ہر کومبو حکمت عملی کے لیے (جب فعال ہو)، ایک درخواست جو SHORT عارضی کولڈاؤن کے لیے 429 کو کرسٹالائز کرے گی، اس کا انتظار کرتی ہے اور 429 — واپس کرنے کے بجائے دوبارہ ڈسپیچ کرتی ہے جس میں Gemini-class TPM/RPM ونڈوز (~ 60s retry-after) کا احاطہ کیا گیا ہے فی ماڈل کی شرح کی حد `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) سے پابند** ترتیبات → لچک** . یہ کبھی بھی `quota_exhausted` (آدھی رات تک بند) یا auth/not-found وجوہات پر انتظار نہیں کرتا ہے۔

ایک کومبو `config.comboCooldownWaitEnabled: false` کے ساتھ آپٹ آؤٹ کر سکتا ہے۔ صرف لفظی `false` ان مشترکہ کومبو انتظاروں کو غیر فعال کرتا ہے (پوسٹ ڈسپیچ کول ڈاؤن اور پری ڈسپیچ circuit-open/model-lock انتظار) اور ان کے انتظار کے بجٹ کے ٹائم آؤٹ فلور ایکسٹینشن کو۔ غائب یا `true` عالمی پالیسی کو محفوظ رکھتا ہے۔ `true` عالمی سطح پر معذور انتظار کو فعال نہیں کر سکتا۔ ایک واضح `targetTimeoutMs` اب بھی جیتتا ہے۔ یہ آپٹ آؤٹ علیحدہ مقامی کوڈیکس ٹرن پن پری ڈسپیچ انتظار کو تبدیل نہیں کرتا ہے۔

وہی گیٹ پری ڈسپیچ کیس (#16319) کا احاطہ کرتا ہے: جب کسی بھی کوشش سے پہلے کسی کامبو کے ہر ہدف کو چھوڑ دیا جاتا ہے کیونکہ اس کا ماڈل ایک مختصر عارضی لاک آؤٹ میں بیٹھتا ہے، صفر کی کوشش کا راستہ اسی چھتوں کے نیچے لاک آؤٹ کا انتظار کرتا ہے اور بغیر اشارے کے `503 ALL_TARGETS_SKIPPED` جواب دینے کے بجائے دوبارہ ڈسپیچ کرتا ہے۔ جب کسی انتظار کی اجازت نہ ہو (چھت، کوشش یا بجٹ ختم ہو جائے، یا فیچر آف ہو جائے)، ٹرمینل رسپانس `429 rate_limit_error` میں اپ گریڈ ہو جاتا ہے جو `retry_after` / `reset_at` کو لے جانے والے عارضی لاک ایکسپائری سے شروع ہو جاتا ہے۔ کوٹہ، تصدیق اور نہ ملے تالے اشارہ سے کم 503 کو برقرار رکھتے ہیں۔

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

## 7. اپ اسٹریم اسٹیٹس کی دوبارہ وضاحت (غلط بیان کردہ کوٹہ کی خرابیاں)

**دائرہ کار:** ایک اپ اسٹریم گیٹ وے جو عارضی کوٹہ ختم ہونے کی اطلاع غلط HTTP اسٹیٹس کے ساتھ دیتا ہے۔

**مقصد:** کلاسیفیکیشن سے پہلے گمراہ کن اسٹیٹس کی اصلاح کرنا، تاکہ ڈاؤن اسٹریم صارفین (فال بیک انجن، کومبو ایگریگیشن، کلائنٹ کو بھیجا جانے والا ریسپانس) ناکامی کی حقیقی قابلِ دوبارہ کوشش (retryable) نوعیت کو دیکھ سکیں۔

کچھ گیٹ وے عارضی کوٹہ ختم ہونے کا اشارہ غیر قابلِ دوبارہ کوشش HTTP اسٹیٹس کے ساتھ دیتے ہیں۔ `agentrouter.org` معیاری `429` کے بجائے `403` (کبھی کبھی `400`) واپس کرتا ہے جس میں چینی متن (`用户额度不足` / `额度不足`) ہوتا ہے۔ Claude Code جیسے کلائنٹس `403` کو مستقل سمجھ کر سیشن ختم کر دیتے ہیں، اور اصلاح کے بغیر فال بیک انجن اسے کوٹہ ایونٹ کے بجائے `AUTH_ERROR` کے طور پر درجہ بند کر دے گا۔

**نفاذ (Implementation):**

- رجسٹری + میچر: `open-sse/config/upstreamStatusRestatement.ts` — فی پرووائیڈر اصولوں کی فہرست (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`)، جنہیں `applyStatusRestatement()` کے ذریعے ملایا جاتا ہے۔
- کال سائٹ: `open-sse/handlers/chatCore.ts` میں `providerFailure:` بلاک (تقریباً لائن 3654)، بالکل اس وقت جب `parseUpstreamError()` کسی ایسے اپ اسٹریم ریسپانس کو پارس کر لیتا ہے جس میں HTTP ایرر اسٹیٹس ہو (`!providerResponse.ok`)، اور کسی بھی کلاسیفیکیشن کے چلنے سے پہلے، تاکہ ہر ڈاؤن اسٹریم صارف درست شدہ اسٹیٹس دیکھے۔ کسی `200` SSE اسٹریم کے اندر شامل خرابیاں ایک الگ، بعد والی اسٹریم-پارسنگ راہ سے گزرتی ہیں اور آج اس ہک میں **شامل نہیں** ہیں — یہ ایک معلوم حد بندی ہے، جو agentrouter کے غلط اسٹیٹس کے لیے ابھی درکار بھی نہیں (جو HTTP ایرر اسٹیٹس کی صورت میں ظاہر ہوتا ہے)۔
- دوبارہ کوشش کی اہلیت: `429`، `RETRY_AFTER_ELIGIBLE_STATUSES` میں شامل ہے (`open-sse/services/combo/unavailableRetryGate.ts`)، اس لیے دوبارہ بیان کردہ (restated) خرابی ایک مردہ `403` کے طور پر ظاہر ہونے کے بجائے ایک حقیقی retry ونڈو رکھتی ہے۔
- مصنوعی `60s` کی `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) صرف وہی ہے جو دوبارہ بیان کردہ ریسپانس **کلائنٹ** کو بتاتا ہے؛ یہ خود کنکشن کا اندرونی cooldown/lockout دورانیہ نہیں ہے — وہ الگ سے اس میکانزم کے ذریعے کنٹرول ہوتا ہے جو اصل میں دوبارہ بیان کردہ خرابی کو ہینڈل کرتا ہے (Connection Cooldown کا بڑھتا ہوا backoff، §2، API-key پرووائیڈرز کے لیے بنیادی `3s`؛ یا Model Lockout، §3، agentrouter جیسے per-model-quota پرووائیڈرز کے لیے)۔ روٹر اندرونی طور پر اس 60s ونڈو سے پہلے بھی دوبارہ کوشش کے اہل ہو سکتا ہے جو وہ کلائنٹ کو ظاہر کرتا ہے — یہ جان بوجھ کر رکھا گیا اضافی مارجن ہے، کوئی بگ نہیں۔

مستقل خرابیوں (agentrouter کی `无权访问模型` — اس ماڈل تک رسائی نہیں) کو کبھی بھی دوبارہ بیان نہیں کیا جاتا: `excludeMarkers` اس اصول کو ویٹو کر دیتا ہے باوجود اس کے کہ `textMarkers` میچ کر جائیں، لہٰذا خرابی اپنا اصل اسٹیٹس برقرار رکھتی ہے اور کوئی چیز اسے ہمیشہ کے لیے دوبارہ نہیں چلاتی۔ متعلقہ پرووائیڈر کلاسیفیکیشن اصول (`open-sse/config/providerErrorRules.ts` میں `agentrouter-model-access-denied`: `reason: "auth_error"`، `scope: "model"`، ایک `6h` کا declared بنیادی cooldown) کو `checkFallbackError` (`open-sse/services/accountFallback.ts`) عمومی apikey کیٹیگری `FORBIDDEN` کی early-return سے _پہلے_ دیکھتا ہے، اور یہ `honorsRuleLockScope(provider)` پر مشروط ہے (#10334 — فی الحال صرف agentrouter کے لیے، `providerErrorRules.ts` میں `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist کے ذریعے)۔ اصول کا declared 6h cooldown `fallbackResult.baseCooldownMs` کے طور پر آگے بہتا ہے، لیکن یہ پھر بھی پہلے سے موجود per-model-quota lockout راستے کو ہی کھلتا ہے (`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`، #10334 سے غیر متاثر سوائے cooldown کے ماخذ کے): یہ ہر دوسرے model lockout کی طرح آپریٹر کی `mlSettings.maxCooldownMs` (ڈیفالٹ `1_800_000ms` / 30 منٹ) تک گھٹا دیا جاتا ہے، اور _محفوظ شدہ lockout کی وجہ_ پہلے سے موجود ہارڈ کوڈ شدہ `"forbidden"` ہی رہتی ہے، اصول کی `"auth_error"` نہیں — صرف cooldown کا دورانیہ سرتسریم (end-to-end) لاگو ہوتا ہے، وجہ کا سٹرنگ نہیں۔ خود کنکشن فعال رہتا ہے؛ اسی کنکشن پر موجود دیگر ماڈلز غیر متاثر رہتے ہیں۔

دوبارہ بیان کردہ کوٹہ خرابیاں (`额度不足`) پروڈکشن میں کسی پرووائیڈر اصول تک پہنچتی ہیں (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`، `scope: "connection"`، اپنا کوئی declared cooldown نہیں — persistence لیئر کا scaled backoff ڈیفالٹ لاگو ہوتا ہے)۔ #10334 کے بعد سے، `ProviderErrorRuleMatch` پر موجود `scope` کو سرتسریم استعمال کیا جاتا ہے، لیکن **صرف** ان پرووائیڈرز کے لیے جو `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist میں ہیں (`providerErrorRules.ts` — آج صرف `"agentrouter"`، `honorsRuleLockScope()` کے ذریعے گیٹ شدہ)۔ ہر دوسرے پرووائیڈر کے لیے `scope` محض معلوماتی رہتا ہے، بالکل جیسا کہ #10334 سے پہلے تھا۔ `checkFallbackError` میچ شدہ اصول کے scope کو `fallbackResult.ruleScope` کے طور پر ظاہر کرتا ہے؛ `isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) وہ مشترک گارڈ ہے جو تصدیق کرتا ہے کہ کوئی `ruleScope` واقعی کنکشن وائیڈ، خود بازیاب ہونے والے سگنل کے طور پر ماننے کے لیے محفوظ ہے (scope `"connection"`، وجہ `quota_exhausted`، کبھی `permanent` نہیں، کبھی `creditsExhausted` نہیں — یہ اس مستقبل کے اصول کے خلاف دفاع ہے جو scope `"connection"` کو کسی مستقل اکاؤنٹ حالت کے ساتھ جوڑے)۔ دو صارفین اسے کال کرتے ہیں:

- **پرسسٹنس** (`markAccountUnavailable()`، `src/sse/services/auth.ts`):
  passthrough پرووائیڈر کی **فی-ماڈل** لاک آؤٹ برانچ میں گرنے کے بجائے
  (agentrouter میں `passthroughModels: true` ہے → `hasPerModelQuota()`
  قدر `true` لوٹاتا ہے)، یہ ایک **عارضی کنکشن کول ڈاؤن** لاگو کرتا ہے —
  `testStatus: "unavailable"` + `rateLimitedUntil`، کبھی بھی کوئی حتمی اسٹیٹس نہیں
  (`credits_exhausted`/`banned`/`expired`) — تاکہ کنکشن کول ڈاؤن ختم ہوتے ہی
  خود بحال ہو جائے، بجائے اس کے کہ دستی کریڈینشل ری سیٹ کی ضرورت پڑے۔
  `disableCooling: true` والے کنکشنز کے لیے اسے چھوڑ دیا جاتا ہے (#2997): وہ آپٹ آؤٹ
  اس کے بجائے فی-ماڈل لاک آؤٹ میں چلا جاتا ہے (یہ ایک دستاویزی سمجھوتہ ہے —
  برانچ کے اوپر والا کوڈ کمنٹ دیکھیں)۔
- **اسی درخواست کی کومبو روٹنگ** (`applyComboTargetExhaustion()`،
  `open-sse/services/combo/targetExhaustion.ts`): وہی گارڈ کنکشن کو
  اِن-میموری `exhaustedConnections` سیٹ میں نشان زد کرتا ہے، جس کی کلید
  `${provider}:${connectionId}` ہوتی ہے۔ یہ صرف اس باقی SAME-REQUEST ٹارگٹ کو نظرانداز کرتا ہے جو _خود پہلے سے اپنے ٹارگٹ آبجیکٹ پر بالکل وہی `connectionId` اٹھائے ہوئے ہو_
  (`getExhaustedTargetSkipReason()`،
  `open-sse/services/combo/comboPredicates.ts`، `exhaustedConnections` کی تلاش سے پہلے `if (provider &&
connectionId)`) — ایک سادہ model-list کومبو، جہاں ساتھی ٹارگٹس اپنے پاس کوئی پن شدہ `connectionId` نہیں رکھتے اور ایک صرف فی-ڈسپیچ رسپانس کے
  `X-OmniRoute-Selected-Connection-Id` ہیڈر سے حل ہوتا ہے، اس کلیدی مماثلت کو کبھی نہیں پاتا۔ اس
  عام صورت میں، کسی باقی لیگ کے ابھی-ابھی ختم شدہ اکاؤنٹ کو دوبارہ استعمال کرنے کے خلاف
  اصل تحفظ یہ Set نہیں ہے — یہ اوپر والا پرسسٹنس لیئر ہے
  (کنکشن کا `rateLimitedUntil` اب مستقبل میں ہے) ساتھ ہی اسی گارڈ کا اس ناکامی کے لیے `transientRateLimitedProviders` کو دبانا
  ("دو-مرحلہ ڈیزائن" اور
  `targetExhaustion.ts` میں `isAgentrouterConnectionQuotaScope` برانچ پر کوڈ کمنٹ دیکھیں): اس Set کو غیر نشان زد چھوڑے جانے کے ساتھ،
  `combo.ts` کا `allowRateLimitedConnection` فورس-الاؤ
  (`open-sse/services/combo.ts:1005-1013`، `:2734-2738`) پرووائیڈر کی باقی لیگز کے لیے متحرک نہیں ہوتا،
  اس لیے کریڈینشل سلیکشن کا `rateLimitedUntil`
  فلٹر (`src/sse/services/auth.ts:1238`) معمول کے مطابق مانا جاتا ہے اور کوئی باقی لیگ یا تو کوئی مختلف، ابھی بھی اہل agentrouter
  کنکشن منتخب کرتی ہے یا کوئی کریڈینشل دستیاب نہ ہونے کی وجہ سے ناکام ہو جاتی ہے — یہ اس
  کنکشن پر زبردستی واپس نہیں گھستی جسے اس برانچ نے ابھی کول ڈاؤن کیا ہے۔

### دو-مرحلہ ڈیزائن: اسٹیٹس ری-اسٹیٹمنٹ، پھر کلاسیفیکیشن

اسٹیٹس ری-اسٹیٹمنٹ (`upstreamStatusRestatement.ts`) اور پرووائیڈر
کلاسیفیکیشن رولز (`open-sse/config/providerErrorRules.ts`،
`providerRuleRegistry`) الگ الگ رجسٹریاں ہیں جو دونوں پرووائیڈر آئی ڈی
اور ٹیکسٹ مارکرز پر کلید بند ہوتی ہیں، لیکن یہ مختلف جگہوں پر چلتی ہیں اور مختلف
مقاصد پورا کرتی ہیں: ری-اسٹیٹمنٹ `chatCore.ts` میں جلد HTTP اسٹیٹس کو دوبارہ لکھتی ہے؛
کلاسیفیکیشن رولز `checkFallbackError()`
(`open-sse/services/accountFallback.ts`) کے اندر فال بیک `reason` منتخب کرتے ہیں اور `scope`
(`model` / `provider` / `connection`) کو لاک کرتے ہیں۔

کلاسیفیکیشن رولز صرف `providerErrorRules.ts` میں `FULL_TEXT_RULE_PROVIDERS`
الاؤ لسٹ میں درج پرووائیڈرز کے لیے مکمل ایرر **ٹیکسٹ** دیکھتے ہیں (جو `额度不足` جیسے باڈی
مارکرز سے میل کھانے کے لیے درکار ہے) — فی الحال صرف `"agentrouter"`۔ ہر دوسرے
**بلٹ اِن کیٹلاگ** پرووائیڈر کے لیے، `checkFallbackError`
`getProviderErrorRuleMatch` کے حوالے صرف سٹرکچرڈ ایرر (`{code, type}`) کرتا ہے، جو
ہیڈر/اسٹیٹس/کوڈ پر مبنی رولز کے لیے کافی ہے مگر باڈی-ٹیکسٹ مارکرز کے لیے اندھا ہے۔
ہیلپر `resolveRuleMatchBody()` یہ انتخاب انجام دیتا ہے: الاؤ لسٹڈ پرووائیڈرز کے لیے مکمل ایرر ٹیکسٹ،
ورنہ سٹرکچرڈ ایرر۔ `FULL_TEXT_RULE_PROVIDERS` میں کوئی
**بلٹ اِن** پرووائیڈر شامل کرنا ایک واضح فی-پرووائیڈر آپٹ اِن ہے —
یہ اس لیے موجود ہے تاکہ فہرست میں نہ ہونے والے ہر پرووائیڈر کا ڈیفالٹ راستہ بائٹ بہ بائٹ غیر تبدیل شدہ رہے۔

کسی رول کا `scope` (`model` / `provider` / `connection`)
`FULL_TEXT_RULE_PROVIDERS` سے الگ آپٹ اِن ہے: `checkFallbackError` اسے صرف
`fallbackResult.ruleScope` کے طور پر ظاہر کرتا ہے، اور ڈاؤن اسٹریم کنسیومرز اسے
معلوماتی لیبل کے سوا کسی چیز کے طور پر صرف انہی پرووائیڈرز کے لیے مانتے ہیں جو اسی فائل میں
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` الاؤ لسٹ میں ہوں (`honorsRuleLockScope()` کے ذریعے گیٹڈ — فی الحال صرف `"agentrouter"`)۔ اس بات کے لیے کہ `scope: "connection"` میچ اصل میں کیا کرتا ہے
جب کوئی پرووائیڈر اس الاؤ لسٹ پر آ جائے، اوپر "دوبارہ بیان شدہ کوٹہ ایررز" دیکھیں۔

**#11104 — آپریٹر کے متعین کردہ رولز دونوں الاؤ لسٹس کو بائی پاس کرتے ہیں۔** کوئی آپریٹر
اس فائل میں ترمیم کیے بغیر رن ٹائم پر `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) کے ذریعے فی-پرووائیڈر رول
متعین کر سکتا ہے۔ کسی آپریٹر رول کو
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` کے پیچھے گیٹ کرنا — ایسی الاؤ لسٹس
جو بلٹ اِن کیٹلاگ رولز کے **ڈیفالٹ** رویّے کی حفاظت کے لیے ہیں — سیٹنگز میکانزم کو ہر اس پرووائیڈر کے لیے غیر مؤثر بنا دے گا
سوائے ان کے جو پہلے سے وہاں درج ہیں، کیونکہ رول متعین کرنا بذاتِ خود
آپریٹر کا واضح آپٹ اِن ہے۔ `resolveRuleMatchBody()` اور
`honorsRuleLockScope()` دونوں پہلے `hasOperatorRuleForProvider()` چیک کرتے ہیں: جس پرووائیڈر کے پاس آپریٹر رول ہو، اسے
خام ایرر ٹیکسٹ ملتا ہے اور اس کا متعین کردہ `scope` مانا جاتا ہے، قطع نظر اس کے کہ
وہ کسی الاؤ لسٹ میں بھی ہے یا نہیں۔

**معروف خامی — HTTP 400 کے لیے `providerRuleRegistry` سے کبھی رجوع نہیں کیا جاتا۔**
`checkFallbackError` کی `BAD_REQUEST` برانچ اسٹیٹس 400 کی درجہ بندی مکمل طور پر
اپنے ہی پیٹرن اریز (`MODEL_ACCESS_DENIED_PATTERNS`،
`CONTEXT_OVERFLOW_PATTERNS` وغیرہ، `accountFallback.ts` میں) کے ذریعے کرتی ہے اور اس سے پہلے واپس آ جاتی ہے کہ
اوپر والی `configuredRule`/`getProviderErrorRuleMatch` برانچ تک پہنچا جائے۔
`status: 400` والا کوئی بلٹ اِن کیٹلاگ رول (یا آپریٹر رول)
نحوی طور پر درست ہے مگر کبھی فائر نہیں ہوگا۔ آج کوئی موجودہ رول 400 کو ہدف نہیں بناتا،
اس لیے پروڈکشن میں کچھ متاثر نہیں ہوتا — مگر مستقبل کے کسی 400 رول کے لیے
پہلے اس برانچ کو چھونا ضروری ہوگا، جو رول شامل کرنے سے کہیں بڑی تبدیلی ہے (یہ
ان تمام پرووائیڈرز کے لیے 400 کی دوبارہ درجہ بندی کرتی ہے جو پہلے سے
پیٹرن-اری رویّے پر انحصار کر رہے ہیں) اور واحد-پرووائیڈر رول اضافے کے دائرے سے باہر ہے۔

### نیا quota-misstating گیٹ وے شامل کرنا

1. `statusRestatementRegistry` میں ایک rule array رجسٹر کریں
   (`open-sse/config/upstreamStatusRestatement.ts`)۔ `textMarkers` کو
   provider-specific رکھیں؛ عمومی انگریزی فقرے کبھی دوبارہ استعمال نہ کریں جو
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`) سے ٹکرائیں۔
2. اختیاری طور پر `open-sse/config/providerErrorRules.ts`
   (`providerRuleRegistry`) میں classification rules رجسٹر کریں تاکہ درست lock
   scope منتخب ہو سکے (اکاؤنٹ-wide quota کے لیے `connection`، per-model
   errors کے لیے `model`)۔ یہ مرحلہ production میں صرف ان providers کے لیے
   اثر انداز ہوتا ہے جن کے rules کو مکمل error text (body markers) درکار ہوتا ہے:
   provider id کو اسی فائل میں `FULL_TEXT_RULE_PROVIDERS` میں شامل کریں — ورنہ
   `checkFallbackError` rule کو ہمیشہ صرف structured `{code, type}` error دیتا
   ہے اور body-text rule live traffic پر کبھی match نہیں کرے گا۔ وہ rules جو
   خالصتاً `status`/`headers` پر match کرتے ہیں (جیسے Opencode کے یا Minimax
   کے) کو اس opt-in کی ضرورت نہیں۔ الگ سے، اگر rule میں `scope: "connection"`
   declared ہے اور مقصد حقیقی connection-wide cooldown اور same-request combo
   skip ہے (صرف ایک informational label نہیں)، تو provider id کو اسی فائل میں
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` میں شامل کریں — یہی چیز
   `isAgentrouterConnectionQuotaScope()`-طرز کی consumption کو
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) اور
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) میں gate کرتی ہے؛ اس کے بغیر
   `scope` اب بھی `fallbackResult.ruleScope` سے ہوکر گزرتا ہے مگر کوئی چیز اس
   پر عمل نہیں کرتی۔
3. `tests/unit/upstream-status-restatement.test.ts` اور
   `tests/unit/agentrouter-error-rules.test.ts` کے طرز پر unit tests شامل کریں
   (not-permanent / not-creditsExhausted guards سمیت، اور — اگر provider کو
   allowlist درکار ہو — ایک ایسا test جو یہ ثابت کرے کہ `resolveRuleMatchBody()`
   مکمل text صرف اسی provider کے لیے واپس کرتا ہے)۔

`chatCore.ts`، `classifyError`، یا combo میں کسی تبدیلی کی ضرورت نہیں۔

#### Egress-bucketed lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` میں موجود providers (opencode فیملی) کو
IP-bucketed upstream سمجھا جاتا ہے (opencode کا free tier IP-bucketed ہے،
account-bucketed نہیں — دیکھیں #9611): status-429 کے ذریعے classified
`quota_exhausted` **یا** `rate_limit_exceeded` ہر اس allowlisted-family
connection کو cooldown کر دیتا ہے جس کا آخری معلوم egress IP ناکام connection
سے میل کھاتا ہو، اس سے پہلے کہ rotation انہیں آزمائے — اس طرح N-1 یقینی طور
پر ناکام upstream calls سے بچا جاتا ہے (اسی طرز جیسے #10460/#10525)۔
`rate_limit_exceeded` کو جان بوجھ کر شامل کیا گیا ہے: `markAccountUnavailable`
path پر opencode-specific rules کبھی match نہیں کرتے (کوئی headers/body
`checkFallbackError` کو نہیں دیے جاتے، opencode `FULL_TEXT_RULE_PROVIDERS`
میں نہیں ہے)، اس لیے وہ 429 جس کے body میں subscription-quota text ہوتا ہے
("monthly usage limit reached") quota-text fallback کے ذریعے
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`؛ 1h cooldown)
`quota_exhausted` classify ہو جاتا ہے، اس سے پہلے کہ `status_429` rule تک
پہنچا جائے — جبکہ quota-text-free 429 (سادہ rate limiting) `status_429` rule
کے ذریعے `rate_limit_exceeded` classify ہوتا ہے اور پھر بھی IP فیملی کو
cooldown کر دیتا ہے۔ کسی allowlisted provider کے لیے IP-bucketed rate limit
اسی سگنل کے مترادف ہے جو exhausted quota ہے۔ دیانتدارانہ حدود:

- **بہترین کوشش کی بنیاد پر**: لاک کنکشن کے آخری معلوم `egress_ip` کو
  `proxy_logs` سے حل کرتا ہے (24 گھنٹے کی ونڈو، ہم وقت ساز، بغیر کیشے کے)۔ ٹھنڈا
  کیشے (egress IP کبھی probe ہی نہیں ہوا) یا کوئی قطار نہ ہو → ناکام کنکشن کو
  برانچ پھر بھی کول کرتی ہے (آج کی طرح ریکارڈ کیا جاتا ہے)، صرف کوئی sibling
  لاک نہیں ہوتا۔
- **کبھی حتمی نہیں**: کول ڈاؤن ایک تجدید ہوتی رہنے والی کوٹہ ونڈو ہے
  (`testStatus: "unavailable"`)؛ IP کی سطح کے سگنل سے کبھی کوئی مستقل حالت اخذ
  نہیں کی جاتی۔ `disableCooling` والے کنکشن اس برانچ کو مکمل طور پر نظرانداز
  کر دیتے ہیں۔
- **اجازت یافتہ خاندان کے لیے لاک کی گرینولیریٹی تبدیل ہوتی ہے**: یہ دائرہ کار
  کی تبدیلی ہے، صرف sibling کی بہتری نہیں۔ opencode ایک `passthroughModels`
  فراہم کنندہ ہے، اس لیے اس برانچ سے پہلے 429 فی-MODEL لاک آؤٹ پیدا کرتا تھا؛
  اب یہ کنکشن کول ڈاؤن پیدا کرتا ہے — اس آپریٹر کے لیے بھی جو بغیر کسی
  sibling کے صرف ایک کنکشن چلا رہا ہو۔ یہ وہی گرینولیریٹی ہے جسے opencode کے
  اصولوں کی جدول پہلے سے درست قرار دیتی ہے (`scope: "connection"`،
  `providerErrorRules.ts`)، جو اب تک کبھی لاگو نہیں ہوئی کیونکہ opencode
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` میں شامل نہیں ہے۔ برانچ ناکام کنکشن کا
  کول ڈاؤن + `backoffLevel` خود لکھتی ہے، کنکشن کے دائرے والی agentrouter
  برانچ کی عکسی کرتی ہے، اور واپس آ جاتی ہے — فی-ماڈل بلاک اور نیچے والا عمومی
  راستہ کبھی نہیں پہنچتا۔
- **Combo شامل ہے**: agentrouter برانچ کی طرح، یہ دائرہ جان بوجھ کر اس
  `persistUnavailableState`/`isCombo` ڈاؤن گریڈ کو نظرانداز کرتا ہے جو combo
  کالر 429 پر لگاتا ہے۔ فی-ماڈل لاک آؤٹ اس دائرے کی کمزور شکل نہیں، یہ غلط
  اکائی ہے: یہ ختم شدہ IP کے بارے میں کچھ نہیں بتاتی، اس لیے combo روٹیشن ہر
  sibling کے لیے ایک یقینی ناکام کال ضائع کرتا رہے گا۔
- **Sibling کی حفاظت**: وہ sibling جو پہلے سے حتمی حالت میں ہو
  (banned/credits_exhausted) یا پہلے سے کسی طویل کول ڈاؤن میں ہو، کبھی اوور
  رائٹ نہیں ہوتا۔
- **خصوصی اجازت فہرست**: `EGRESS_BUCKETED_LOCK_PROVIDERS` کو وسیع کرنا مالک
  کا واضح فیصلہ ہے؛ کوئی عمومی وائرنگ نہیں (پیٹرن #10334/#10419)۔ sibling کا
  استفسار اسی اجازت فہرست کو بائنڈ کرتا ہے بجائے اسے SQL لِیٹرل کے طور پر
  دہرانے کے، اس لیے اسے وسیع کرنا ایک سطر کی تبدیلی ہی رہتا ہے۔
- **Egress IP کی گردش، دونوں سمتیں**: تلاش کی ونڈو (24 گھنٹے) egress-IP کیشے
  TTL (5 منٹ) سے کہیں زیادہ وسیع ہے، اس لیے "آخری معلوم IP" سرگزشت ہے، موجودہ
  حالت نہیں۔ اگر کسی کنکشن کا proxy ونڈو کے اندر بدل چکا ہو تو لاک کسی حقیقی
  مشترک IP سے **چوک** سکتا ہے (ریکارڈ شدہ IP نیا، غیر ختم شدہ ہے) — اور اسی کے
  بالمقابل یہ کسی ایسے sibling کو **کول** بھی کر سکتا ہے جو اس دوران ختم شدہ
  IP سے ہٹ چکا ہو۔ دوسری صورت میں اس sibling کو ایک کول ڈاؤن ونڈو کی قیمت ادا
  کرنی پڑتی ہے؛ دونوں سرگزشت پر مبنی تلاش کی قبول شدہ بہترین کوشش کی حدود
  ہیں۔
- **لاگت**: `proxy_logs` کے دو محدود اسکین (`idx_pl_timestamp` کے ذریعے ونڈو
  فلٹر شدہ)، صرف 429 کی تعدد پر۔ کوئی نیا انڈیکس نہیں (مائیگریشن 134
  YAGNI)۔ معتدل سائز کی حقیقی ٹریفک DB کاپی پر ماپا گیا؛ زیادہ تھروپٹ والا
  انسٹینس اسی ونڈو میں متناسب طور پر زیادہ قطاریں رکھتا ہے۔

---

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
