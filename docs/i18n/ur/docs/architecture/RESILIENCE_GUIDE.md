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

**`p2c` اکاؤنٹ کے انتخاب کے لیے آپٹ ان لیٹنسی سگنل۔** ہر بھیجی گئی کوشش اپنے ٹائم ٹو فرسٹ بائٹ اور نتیجہ فی کنکشن (اور فی کنکشن + ماڈل) ان میموری رولنگ ونڈو میں ریکارڈ کرتی ہے: آخری 20 نمونے 15 منٹ کے اندر (`open-sse/services/connectionLatencyTracker.ts`، `src/sse/handlers/chatHelpers.ts` میں `safeLogEvents()` سے ریکارڈ کیے گئے)۔ جب `resilienceSettings.p2cLatency.weight` `0` سے اوپر ہوتا ہے (حد 0-20، پہلے سے طے شدہ `0` = آف)، `src/sse/services/auth.ts` میں `compareP2CConnections()` جوڑے کے ہر امیدوار کے لیے `weight` پوائنٹس تک کا اضافہ کرتا ہے۔ اس میں سے نصف تاخیر سے تیزی سے امیدوار کے تناسب کے طور پر آتا ہے (دوگنا دھیرے سے پورا نصف لیتا ہے) اور آدھا رولنگ ایرر ریٹ سے۔ اصطلاح کا اطلاق صرف اس صورت میں ہوتا ہے جب دونوں امیدواروں کے پاس کم از کم 3 نمونے ہوں، اس لیے نئے اکاؤنٹس پر جرمانہ نہیں کیا جاتا، اور اس کی حد کوٹہ بلاک شدہ اور کوٹہ ختم ہونے والے جرمانے سے نیچے رہتی ہے۔ اس میں اپنا کوئی سرکٹ شامل نہیں کیا گیا ہے: ناکام اکاؤنٹس اب بھی کولڈاؤن، لاک آؤٹ اور بریکر لیئرز کے ذریعے ہینڈل کیے جاتے ہیں۔ اسے `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` کے ساتھ سیٹ کریں۔

**ریزننگ فریم مواد اسٹال بجٹ کو دوبارہ شروع کرتے ہیں۔** ایک استدلال ماڈل اپنے پہلے نظر آنے والے ٹوکن سے پہلے منٹوں تک سوچ سکتا ہے: Claude `thinking_delta` فریموں کو سٹریم کرتا ہے جن کا سوچنے والا متن خالی ہو سکتا ہے، اور جوابات API ایک کے بعد ایک استدلال کو جاری کرتا ہے۔ `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) ان فریموں کو پہچانتا ہے، اور واچ ڈاگ باری کو منسوخ کرنے کے بجائے ہر ایک پر اپنا بجٹ دوبارہ شروع کرتا ہے۔ وہ اب بھی ماڈل آؤٹ پٹ نہیں ہیں، لہذا ایک موڑ جو صرف استدلال کے ساتھ ختم ہوتا ہے اب بھی خالی بتایا جاتا ہے، اور ایک موڑ جو استدلال کو روکتا ہے اور صرف دل کی دھڑکنوں کو بھیجتا ہے پھر بھی واچ ڈاگ کو ٹرپ کرتا ہے۔

غیر خالی دستخط کے ساتھ Kiro کے بائنری `reasoningContentEvent` فریم ایک خالی `reasoning_content` ڈیلٹا کے طور پر ایگزیکٹو کے ذریعے اس استدلال کی سرگرمی کو محفوظ رکھتے ہیں۔ دستخط آگے نہیں بھیجے جاتے۔ میٹا ڈیٹا، نامکمل فریم اور خالی دستخط مواد کے بجٹ کو دوبارہ شروع نہیں کرتے ہیں۔ آزاد ایکٹو اسٹریم ٹائم آؤٹ اور کلائنٹ کی منسوخی اب بھی لاگو ہوتی ہے (`open-sse/executors/kiro/reasoning.ts`)۔

**ٹرمینل اسٹیٹس (NOT cooldowns):**

- `banned` — ممنوعہ مطلوبہ الفاظ / اکاؤنٹ پر پابندی کا پتہ لگانے کے ذریعہ ترتیب دیا گیا ہے (دیکھیں [BAN_DETECTION](../security/BAN_DETECTION.md) )۔ اپ اسٹریم فی درخواست سے انکار (`request_rejected`، مثال کے طور پر Anthropic OAuth 403 "درخواست کی اجازت نہیں ہے") اسے کبھی بھی سیٹ نہیں کرتے ہیں: وہ فی کنکشن اور ماڈل شمار کیے جاتے ہیں اور `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h) پر بڑھتے ہوئے کولڈاؤن کے ساتھ اس ماڈل کو گردش سے باہر لے جاتے ہیں، یا جب کوئی ماڈل — `open-sse/services/requestRejectedStreak.ts` معلوم نہ ہو تو کنکشن کو ٹھنڈا کریں۔
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

- وال 429 پر عمل درآمد کرنے والا پیشکش قبول کرتا ہے اور فوری طور پر دوبارہ کوشش کرتا ہے۔** ایک ہی** `anthropic-usage-limit: slow` کے ساتھ اکاؤنٹ؛ لین اس وقت تک فعال رہتی ہے جب تک کہ اعلان کردہ `anthropic-ratelimit-unified-reset` (+ 60s فضل) اور اس ونڈو میں ہر درخواست ہیڈر کو لے کر جاتی ہے۔ روکا ہوا 429 کبھی بھی `handleChatCore` تک نہیں پہنچتا، لہذا کنکشن ہے۔** نہیں** کولڈاؤن میں ڈال دیا اور دور نہیں گھمایا جاتا ہے.
- بعد کے جوابات پر `anthropic-ratelimit-unified-slow-status` : `active` / `not_needed` لین رکھیں؛ `slot_busy` (429) یا `529` سرور کے `anthropic-ratelimit-unified-slow-retry-after` انتظار کریں (پہلے سے طے شدہ 20s، کلیمپ 5–600s، ± 30% jitter) اور دوبارہ کوشش کریں، `anthropic-ratelimit-unified-slow-max-wait` کے ذریعے پابند ہوں (پہلے سے طے شدہ 20 منٹ، کلیمپ 1 منٹ–6 h) — گزرے اور ایک منٹ کے اختتام پر۔ دوبارہ قبولیت. انتظار کو اضافی طور پر درخواست کے اپنے اپ اسٹریم اسٹارٹ ٹائم آؤٹ (`resolveFetchStartTimeout`، 10 منٹ بذریعہ ڈیفالٹ) مائنس 5 s مارجن کے ذریعہ بھی محدود کیا جاتا ہے: اس کیپ کے بغیر 20 منٹ کا پہلے سے طے شدہ زیادہ سے زیادہ انتظار درخواست کو ختم کردے گا اور نیند کے درمیان انتظار کو ختم کردیا جائے گا، اس کی بجائے ایک `TimeoutError` `max_wait` endful + سرفیس کیا جائے گا۔
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`، ایک 5h-ونڈو رول اوور، یا `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (جو اسے کسی بھی حیثیت پر `extra_usage` کے طور پر ختم کرتا ہے، چونکہ ادائیگی کی زیادہ مقدار اب دیوار کو ڈھانپتی ہے) لین کو ختم کریں؛ جواب پھر عام کولڈاؤن پاتھ پر جاتا ہے۔ `budget_exhausted` اس وقت تک یاد رکھا جاتا ہے جب تک کہ اعلان کردہ بجٹ کو دوبارہ ترتیب نہیں دیا جاتا (≤ 8 دن)۔
- دیوار کی جانچ ایگزیکیوٹر کی اپنی 400 سے چلنے والی انٹرا ٹرمپٹ دوبارہ کوششوں (سیاق و سباق میں ترمیم، thinking/effort clamps، param auto-learn) کے بعد چلتی ہے، لہذا ایک دیوار 429 جو صرف ان کوششوں میں سے ایک پر ظاہر ہوتی ہے، کولڈاؤن پاتھ تک پہنچنے کے بجائے روکی جاتی ہے۔
- اسٹیٹ فی کنکشن میموری میں ہے (دوبارہ شروع کرنے پر دوبارہ قبول کرنے کے لیے ایک اضافی دیوار 429 لاگت آتی ہے)۔

**سیشن کی حد ری سیٹ** (`autoLimitReset`، لین سے پہلے کوشش کی جب دونوں آن ہوں):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` بلاک؛ جب `arm: "reset"` اور `available: true`، `{ "program": "juniper_tide" }` کے ساتھ `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` ( `providerSpecificData.organizationUUID` سے تنظیم UUID ، بوٹسٹریپ فال بیک)۔
- `result: reset|not_limited` → درخواست کی پوری رفتار سے دوبارہ کوشش کی جاتی ہے (کوئی سست ہیڈر نہیں)۔ `already_used` / `not_offered` memoise `next_available_at` (پہلے سے طے شدہ ایک ہفتہ)؛ کوئی بھی ناکامی 15 منٹ پر واپس آجاتی ہے۔ ری سیٹ ہفتے میں ایک بار ہوتا ہے اور پھر بھی ہفتہ وار حد میں شمار ہوتا ہے۔

ریگریشن گارڈز: `tests/unit/claude-low-priority-mode.test.ts`، `tests/unit/claude-limit-reset.test.ts`، `tests/unit/claude-low-priority-executor.test.ts`۔

### خودکار طور پر لاگو بینک شدہ ری سیٹس

**دائرہ کار:** Codex اور Claude سبسکرپشن (OAuth) کنکشن۔** آپٹ ان** : `bankedResetAutoApply` سیٹنگ آف ہے اور `dry-run` موڈ میں بذریعہ ڈیفالٹ (ترتیبات → AI → آٹو اپلائی بینکڈ ری سیٹس)۔

**مقصد:** جب کوئی اکاؤنٹ استعمال کی دیوار سے ٹکرا جاتا ہے تو آپریٹر کی جانب سے فراہم کنندہ کی حدود کے صفحہ پر "ریڈیم" کو دبانے کا انتظار کرنے کے بجائے خود ہی بینکڈ ری سیٹ خرچ کریں۔

| کریڈٹ کی قسم (`creditTypes`) | جو چھڑایا جاتا ہے۔                       | جہاں یہ چلتا ہے۔                                                        |
| ---------------------------- | ---------------------------------------- | ----------------------------------------------------------------------- |
| `codexCredits`               | Codex ری سیٹ کریڈٹس                      | پس منظر کا کام، ہر 60 سیکنڈ                                             |
| `claudeCredits`              | Claude بینکڈ گرانٹس (`GRANT` کریڈٹ)      | پس منظر کا کام، ہر 60 سیکنڈ                                             |
| `claudeSessionReset`         | Claude ہفتہ وار سیشن کی حد ری سیٹ (اوپر) | راہ کی درخواست کریں، اسی پالیسی کے ذریعے جس طرح فی اکاؤنٹ ٹوگل ہوتا ہے۔ |

**نفاذ:**

- خالص فیصلہ (دونوں راستوں کے لیے ایک اصول مقرر): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- پس منظر کا کام: `src/lib/services/bankedResetAutoApply.ts` ( `src/instrumentation-node.ts` میں شروع ہوا)
- Claude درخواست راستہ گیٹ: `src/lib/usage/claudeSessionResetPolicy.ts`، `open-sse/services/claudeLimitReset.ts` میں `setClaudeLimitResetPolicy()` کے ذریعے رجسٹرڈ
- تاریخ، ٹوپیاں اور ویب ہک: `src/lib/usage/bankedResetAudit.ts`
- تاریخ API: `GET /api/settings/banked-reset-auto/history?limit=50` (انتظامی تصنیف)

**فیصلہ کا حکم** (پہلا ناکام اصول ریکارڈ شدہ وجہ ہے):

1. فیچر آف، کریڈٹ ٹائپ آف، یا اکاؤنٹ آف سکوپ (`accountScope` `all` / `selected` پلس فی اکاؤنٹ `connections` نقشہ)۔
2. اختیاری UTC شیڈول سے باہر (`startHourUtc` > `endHourUtc` آدھی رات کو کراس کرتا ہے)۔
3. آخری 24 گھنٹے کے کیپس: `maxPerAccountPerDay` (1)، `maxPerDay` (3)، اور `minSpacingMinutes` (30) کسی بھی دو چھٹکارے کے درمیان۔
4. ٹرگر: ایک دیوار والی `session` یا `weekly` ونڈو ( `getQuotaWindowStatus().reachedThreshold` سے پڑھیں، `isAccountQuotaExhausted()` نہیں، جو صرف خرچ کی گئی ہر ونڈو کے ساتھ ایک اکاؤنٹ کی اطلاع دیتا ہے)، یا کسی اکاؤنٹ پر `expiringCreditHours` (24) کے اندر ختم ہونے والا کریڈٹ جس نے کم از کم `expiringCreditMinUsedPercent` (50) استعمال کیا ہو۔
5. نیچرل ری سیٹ گارڈ: جب دیوار والی 5 گھنٹے والی ونڈو `sessionResetGuardMinutes` (90) کے اندر دوبارہ سیٹ ہو جائے یا `weeklyResetGuardHours` (12) کے اندر دیوار والی ہفتہ وار ونڈو دوبارہ سیٹ ہو جائے تو اسے چھوڑ دیں۔
6. ہفتہ وار منزل: جب ہفتہ وار باقی `weeklyFloorPercent` (10) سے کم ہو تو 5 گھنٹے کا ری سیٹ چھوڑ دیں۔
7. `last-resort` موڈ: چھوڑیں جب کہ اسی فراہم کنندہ کے ایک اور ان اسکوپ اکاؤنٹ میں دونوں ونڈوز میں کم از کم `poolHeadroomPercent` (10) باقی ہے۔ ایکسپائرنگ کریڈٹ ٹرگرز اس کو نظرانداز کرتے ہیں۔
8. `dry-run` ایک قطار کو ریکارڈ کرتا ہے اور کچھ بھی نہیں چھڑاتا ہے۔ `last-resort` اور `eager` چھڑانا۔

گمشدہ کوٹہ ڈیٹا کبھی بھی چھٹکارے کو غیر مقفل نہیں کرتا ہے: دوبارہ ترتیب دینے کا نامعلوم وقت یا ہفتہ وار استعمال چھوڑ دیتا ہے۔

**Claude سیشن ری سیٹ:** فیچر آف، یا `claudeSessionReset` آف کے ساتھ، فی اکاؤنٹ `autoLimitReset` ٹوگل بالکل پہلے کی طرح فیصلہ کرتا ہے۔ دونوں آن کے ساتھ، فیچر فی اکاؤنٹ ٹوگلز کی جگہ لے لیتا ہے: ایک دائرہ کار اکاؤنٹ صرف اس صورت میں دعوی کر سکتا ہے جب پالیسی اس کی اجازت دیتی ہے، اور `dry-run` موڈ میں کوئی دعوی نہیں کیا جاتا ہے۔

**حفاظت:** جاب فی ٹک زیادہ سے زیادہ ایک کریڈٹ کو چھڑاتا ہے، کریڈٹ کی فہرست سے پہلے فیصلہ کرتا ہے (چھوڑ دیا گیا اکاؤنٹ کبھی بھی درج نہیں کیا جاتا ہے)، idempotency کیز `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` استعمال کرتا ہے، اور ناکام لسٹنگ یا چھٹکارے کے بعد اکاؤنٹ کو 1 گھنٹے کے لیے بند کر دیتا ہے۔ ہر چھٹکارا، ناکامی اور ڈرائی رن فیصلہ `audit_log` پر لکھا جاتا ہے (`action: "bankedReset.redeem"`، کوئی ٹوکن یا کریڈٹ آئی ڈی نہیں)؛ ٹوپیوں کو ان قطاروں سے شمار کیا جاتا ہے، لہذا وہ دوبارہ شروع ہونے سے بچ جاتے ہیں۔ کامیاب چھٹکارے `provider.reset_redeemed` ویب ہک کو بھی فائر کرتے ہیں۔

ریگریشن گارڈز: `tests/unit/banked-reset-policy.test.ts`، `tests/unit/banked-reset-auto-apply.test.ts`، `tests/unit/claude-limit-reset-policy-gate.test.ts`، `tests/unit/banked-reset-history-route.test.ts`۔

### سیشن وابستگی (#7274)

**دائرہ کار:** ایک کلائنٹ سیشن (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` ہیڈر) ایک کنکشن پر پن کیا گیا، کے لیے** کوئی بھی** فراہم کنندہ

**مقصد:** تمام درخواستوں میں ایک ہی اکاؤنٹ پر ملٹی ٹرن ایجنٹ (Claude کوڈ، ایڈر، کسٹم ایجنٹس) رکھیں، کراس اکاؤنٹ سیاق و سباق کے نقصان کو کم کریں اور فی اکاؤنٹ سیشن کی حالت والے فراہم کنندگان پر بار بار کولڈ اسٹارٹ 429s۔

**نفاذ:**

- TTL قرارداد: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- پن selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- ہیڈر نکالنا (عام، کوئی فراہم کنندہ): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- برقرار پن ٹیبل: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- ترتیب: `sessionAffinityTtlMs` (عالمی TTL ms میں، `0` غیر فعال کرتا ہے) — `src/lib/db/settings.ts`۔ ہجرت `124_generic_session_affinity_ttl.sql` کے ذریعے Codex-only `codexSessionAffinityTtlMs` سے نام تبدیل کر دیا گیا، جو پہلے سے تشکیل شدہ Codex TTL نئے ڈیفالٹ کے طور پر لے جاتا ہے۔

#7274 سے پہلے، `resolveSessionAffinityTtlMs()` `codex` کے علاوہ ہر فراہم کنندہ کے لیے `0` کے لیے سخت ضمانت دی گئی تھی، اس لیے TTL ترتیب (اور سیشن ہیڈرز) کا کہیں اور کوئی اثر نہیں ہوا حالانکہ پننگ میکانزم اور ہیڈر نکالنے والے پہلے سے ہی فراہم کنندہ کے علمی تھے۔ فکس نے اس ابتدائی واپسی کو ہٹا دیا۔ TTL اب ہر فراہم کنندہ پر یکساں طور پر لاگو ہوتا ہے ایک بار عالمی سطح پر `0` سے اوپر سیٹ کیا جاتا ہے۔

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
- خصوصی منظم سیشن لیز ایک نسل کی باڑ کے ساتھ پائیدار لائف سائیکل ملکیت ہیں۔

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

جب کوٹہ شیئر ڈسپیچ کسی ایسے کنکشن کو نشانہ بناتا ہے جو مثبت `max_concurrent` اعلان کرتا ہے تو اس کے لیے ہم آہنگی کی درخواستیں** اکاؤنٹ** فی کنکشن سیمفور (کلیدی `qsconn:<connectionId>`) کے ذریعے سیریلائز کیا جاتا ہے: اضافی درخواستیں** قطار میں انتظار کرو** اکاؤنٹ میں پانی بھرنے کے بجائے۔ یہ ہے** ناکام کھلا** — ایک سیر شدہ قطار یا ٹائم آؤٹ بغیر کسی سلاٹ کے آگے بڑھتا ہے بجائے اس کے کہ کبھی بھی بھیجی جانے والی درخواست کو مسترد کر دے۔ ٹوگل ان کریں۔** ترتیبات → لچکدار → کوٹہ شیئر فی کنکشن کنکرنسی** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`، ڈیفالٹ آن)۔ `max_concurrent` کیپ کے بغیر رویہ تبدیل نہیں ہوتا۔

> کوٹہ شیئر روٹنگ گیٹ (`selectQuotaShareTarget`, DRR + P2C) بذات خود فیل کھلا ہے اور صرف _deprioritizes_ ایک ایٹ-کیپ کنکشن — سنگل کنکشن پول کے ساتھ سخت حد تک محدود نہیں کر سکتا، لہذا یہ سیمفور وہ ہے جو دراصل سیلاب پر مشتمل ہے۔

### کومبو کولڈاؤن آگاہی کی دوبارہ کوشش کریں۔

ہر کومبو حکمت عملی کے لیے (جب فعال ہو)، ایک درخواست جو SHORT عارضی کولڈاؤن کے لیے 429 کو کرسٹالائز کرے گی، اس کا انتظار کرتی ہے اور 429 — واپس کرنے کے بجائے دوبارہ ڈسپیچ کرتی ہے جس میں Gemini-class TPM/RPM ونڈوز (~ 60s retry-after) کا احاطہ کیا گیا ہے فی ماڈل کی شرح کی حد `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) سے پابند** ترتیبات → لچک** . یہ کبھی بھی `quota_exhausted` (آدھی رات تک بند) یا auth/not-found وجوہات پر انتظار نہیں کرتا ہے۔ `comboTimeoutMs` سیٹ کے ساتھ، ایک انتظار جو اس آخری تاریخ سے پہلے ختم نہیں ہو سکتا شروع نہیں ہوتا ہے (#18998): کومبو `COMBO_TIMEOUT` 504 کی بجائے اپنے ٹرمینل جواب کے ساتھ ایک ساتھ جواب دیتا ہے۔

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

## دیگر لچکدار خصوصیات

- **22 روٹنگ کی حکمت عملی** (ترجیح، ویٹڈ، راؤنڈ رابن، سیاق و سباق سے متعلق ریلے، فل فرسٹ، p2c، بے ترتیب، کم سے کم استعمال شدہ، لاگت کے لیے موزوں، دوبارہ ترتیب دینے سے آگاہ، دوبارہ ترتیب دینے والی ونڈو، ایکسپائری فرسٹ، ہیڈ روم، کوٹہ-ویٹڈ، سخت-رینڈم، آٹو، lkgp، سیاق و سباق سے متعلق-آپٹمائزڈ، پائپ لائن، پائپ لائن، کیپٹمائزڈ) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) دیکھیں۔
- **واقف روٹنگ کو دوبارہ ترتیب دیں۔** (v3.8.0) — کوٹا ری سیٹ ٹائم کے لحاظ سے کنکشن کو ترجیح دیتا ہے۔
- **پس منظر موڈ کا انحطاط** — جوابات API `background: true` تنبیہ کے ساتھ مطابقت پذیر ہونے کے لیے کم ہو گیا۔
- **متحرک ٹول کی حد کا پتہ لگانا** جب ٹول کی گنتی کی حد لگ جاتی ہے تو — فراہم کنندگان کی پشت پناہی کرتا ہے۔
- **ایمرجنسی فال بیک** — `OMNIROUTE_EMERGENCY_FALLBACK` کے زیر کنٹرول آپریٹرز اسے دوبارہ شروع کیے بغیر فیچر فلیگز صفحہ سے اوور رائڈ کر سکتے ہیں۔

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
