# Resilience Guide (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute دارای سه مکانیسم انعطاف پذیری متمایز اما مرتبط است. هر کدام دامنه و هدف متفاوتی دارند. هنگام اشکال زدایی رفتار مسیریابی، آنها را از هم جدا نگه دارید.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> منبع: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **اولویت Env-vs-داشبورد برای جابجایی های انعطاف پذیری.** ضامنهای انعطافپذیری انتخابشده از محیط — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`، `PROVIDER_COOLDOWN_ENABLED`، `STREAM_RECOVERY_ENABLED`، `STREAM_RECOVERY_MIDSTREAM_ENABLED`، `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — فقط پیشفرض را تامین میکنند (`DEFAULT_RESILIENCE_SETTINGS`، `src/lib/resilience/settings.ts`). یک بولی در `resilienceSettings` باقی ماند (داشبورد →** تنظیمات → Resilience** / `PATCH /api/resilience`، ذخیره شده در `key_value`) بر مقدار env پیروز می شود: نرمال سازی (`toBoolean`، `src/lib/resilience/settings/normalize.ts`) هر زمان که وجود داشته باشد، Boolean ذخیره شده را حفظ می کند. تنظیم چنین env var به `true` در استقراری که داشبورد قبلاً `false` را ذخیره کرده است، بنابراین هیچ چیز تغییر نمیکند — کلید را تغییر دهید** تنظیمات → Resilience** (یا قسمت ذخیره شده را پاک کنید).

## ۱. قطعکنندهٔ مدار ارائهدهنده (Circuit Breaker)

**دامنه:** کل ارائهدهنده (مثلاً `glm`، `openai`، `anthropic`).

**هدف:** توقف ارسال ترافیک به ارائهدهندهای که بهطور مکرر در سطح آپاستریم/سرویس دچار خطا میشود.

**پیادهسازی:**

- کلاس اصلی: `src/shared/utils/circuitBreaker.ts`
- نقاط اتصال: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API وضعیت: `GET /api/monitoring/health`
- API بازنشانی: `POST /api/resilience/reset`
- Wrapperها: `open-sse/services/accountFallback.ts`
- جدول پایگاه داده: `domain_circuit_breakers`

**وضعیتها:**

- `CLOSED` — ترافیک عادی مجاز است
- `DEGRADED` — ترافیک همچنان مجاز است، اما خطاهای فزایندهٔ ارائهدهنده ردیابی میشوند؛ در صورت تعداد کافی موفقیت، یک تست اتصال معتبر، یا پس از سپری شدن طولانیترین مدت نگهداشت `OPEN` برای آخرین نوع خطا (مقدار `cooldownByKind` مربوط به آن، در غیر این صورت `resetTimeout`، × `maxBackoffMultiplier`، حداقل به اندازهٔ یک کولداون) بدون رخ دادن خطای جدید، به `CLOSED` بازمیگردد
- `OPEN` — ارائهدهنده بهطور موقت مسدود است؛ مسیریابی combo آن را رد میکند
- `HALF_OPEN` — مهلت بازنشانی سپری شده است؛ درخواست probe مجاز است

**مقادیر پیشفرض قابل پیکربندی (`open-sse/config/constants.ts`، در Dashboard → Settings → Resilience در دسترس است):**

| کلاس     | ورود به DEGRADED پس از | باز شدن پس از | مهلت بازنشانی |
| -------- | ---------------------- | ------------- | ------------- |
| OAuth    | ۵ خطا                  | ۸ خطا         | 60s           |
| کلید API | ۷ خطا                  | ۱۲ خطا        | 30s           |
| محلی     | مشتقشده                | ۲ خطا         | 15s           |

`degradationThreshold` تعیین میکند ارائهدهنده چه زمانی وارد `DEGRADED` شود؛ `failureThreshold` تعیین میکند چه زمانی باز شود و رد شود. پروفایلهای ارائهدهندهٔ محلی هنوز در صفحهٔ تنظیمات Resilience در دسترس نیستند.

**کدهای فعالسازی (trip):** فقط وضعیتهای سطح ارائهدهنده `[408, 500, 502, 503, 504]`. برای خطاهای سطح حساب فعال **نمیشود** (بیشتر 401/403/429 — آنها مربوط به کولداون یا قفلشدن (lockout) هستند).

**بازیابی تنبل (lazy):** وقتی `OPEN` منقضی میشود، `getStatus()`، `canExecute()`، `getRetryAfterMs()` وضعیت را به `HALF_OPEN` تازهسازی میکنند. همین خواندنها (و خطای بعدی) یک `DEGRADED` کهنه را به `CLOSED` بازمیگردانند. نیازی به تایمر پسزمینه نیست.

---

### کولداون سراسری اختیاری ارائهدهنده (دروازهٔ پنجره)

یک لایهٔ چهارم **اختیاری** (`PROVIDER_COOLDOWN_ENABLED`، پیشفرض **خاموش**) حافظهای بیندرخواستی از ارائهدهندگانِ خطاکار را در `open-sse/services/providerCooldownTracker.ts` نگه میدارد که هنگام تعیین مقصد combo به آن مراجعه میشود تا درخواستهای combo متوالی دیگر ارائهدهندهای را که هماکنون خطا داده است دوباره مرور نکنند. ورودیهای سطح ارائهدهنده از دروازهٔ پنجرهٔ `PROVIDER_PROFILES` پیروی میکنند:

| پروفایل  | فعالسازی پس از (`providerFailureThreshold`) | در بازهٔ (`providerFailureWindowMs`) | مدت کولداون (`providerCooldownMs`) |
| -------- | ------------------------------------------: | -----------------------------------: | ---------------------------------: |
| OAuth    |                                        `10` |                              `15min` |                             `5min` |
| کلید API |                                        `15` |                              `30min` |                            `10min` |

پایینتر از آستانه، ارائهدهنده در حال کولداون محسوب **نمیشود**؛ یک موفقیت پنجره را پاک میکند. ورودیهای سطح اتصال (`provider:connectionId`) در عوض همان عقبنشینی نمایی `minRetryCooldownMs → maxRetryCooldownMs` را حفظ میکنند. موارد بازنویسی: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. محافظ رگرسیون: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. دوره خنکسازی اتصال

**دامنه:** یک اتصال/حساب/کلید ارائهدهنده.

**هدف:** رد کردن یک کلید نامعتبر، در حالی که سایر اتصالهای همان ارائهدهنده به ارائه سرویس ادامه میدهند.

**پیادهسازی:**

- علامتگذاری بهعنوان در دسترس نبودن: `src/sse/services/auth.ts::markAccountUnavailable()`
- انتخاب: `getProviderCredentials*` در همان فایل
- محاسبه دوره خنکسازی: `open-sse/services/accountFallback.ts::checkFallbackError()`
- تنظیمات: `src/lib/resilience/settings.ts`

**فیلدهای هر اتصال:**

- `rateLimitedUntil` — زمانی که دوره خنکسازی در آن منقضی میشود
- `testStatus: "unavailable"`
- `lastError`، `lastErrorType`، `errorCode`
- `backoffLevel` — شمارنده بازگشت نمایی

**دورههای خنکسازی پیشفرض:**

- مبنای OAuth: 5s
- مبنای کلید API: 3s
- خطای 429 کلید API: در اولویت، از هدرهای upstream شامل `Retry-After`/reset یا متن قابل تجزیه برای reset استفاده میکند
- بازگشت: `baseCooldownMs * 2 ** failureIndex`

**تأخیر تلاش مجدد برای هر ارائهدهنده.** صفحه جزئیات ارائهدهنده یک انتخابگر **تأخیر تلاش مجدد** دارد (خودکار،
15s تا 1h). این مقدار در `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(محدوده 1–21600، از طریق `PATCH /api/resilience`) ذخیره میشود. وقتی خطای محدودیت نرخ فاقد
راهنمای تلاش مجدد upstream باشد، این مقدار جایگزین بازگشت مقیاسشده برای ارائهدهنده میشود و
`backoffLevel` را به 0 بازنشانی میکند (`open-sse/services/rotationConfig.ts::overrideFor`). اولویت
برای خطای دارای محدودیت نرخ، از بیشترین به کمترین، چنین است: راهنمای تلاش مجدد upstream، سپس
`providerSpecificData.rotationOverrides.rateLimitResetSeconds` برای هر اتصال، سپس تأخیر تلاش مجدد
ارائهدهنده، سپس `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` محیط، و در نهایت بازگشت مقیاسشده.
حالت خودکار این فیلد را حذف میکند. این تنظیم فقط بر دلیل محدودیت نرخ اثر میگذارد و هرگز بر
وضعیتهای نهایی تأثیر ندارد.

**محافظ جلوگیری از هجوم همزمان:** از افزایش بیشازحد دوره خنکسازی یا افزایش دوباره
`backoffLevel` در اثر خطاهای همزمان جلوگیری میکند.

**خطاهای 429 ناشی از محدودیت همزمانی، در نردبان بازگشت پیشروی نمیکنند.** یک `429` که بدنه آن
محدودیت همزمانی را گزارش میکند ("too many concurrent requests"، "concurrency limit"،
"parallel request limit"، `并发数过高`) به این معناست که حساب سالم است اما مشغول است.
`checkFallbackError()` دلیل `concurrency_limited` را برمیگرداند: فوراً به اتصال بعدی
سوییچ کنید، این اتصال را برای مدت ثابت `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) یا راهنمای تلاش
مجدد upstream خنک کنید، `backoffLevel` را بدون تغییر نگه دارید و `skipProviderBreaker` را تنظیم
کنید. بدنه صریح سهمیه همچنان اولویت دارد؛ بنابراین بدنهای که با الگوی سهمیه نیز مطابقت داشته
باشد، همچنان بهعنوان سهمیه تشخیص داده میشود. تشخیص: `looksLikeConcurrencyLimit()` در
`src/shared/utils/classify429.ts`؛ verdict: `open-sse/services/accountFallback/concurrencyLimit429.ts`.
`classify429()` (مقدار `FailureKind` مربوط به breaker) بدون تغییر باقی میماند و برای این بدنهها
همچنان `rate_limit` را میخواند.

**توقفهای محتوای جریان، حساب را خنک نمیکنند.** وقتی ناظر توقف محتوا
(`open-sse/utils/streamHandler.ts`) از جریانی که بهموقع هیچ خروجی مدلی ارسال نکرده است
دست میکشد، `markAccountUnavailable()` خطا را روی اتصال ثبت میکند اما هیچ دوره خنکسازیای
تنظیم نمیکند: این توقف به همان درخواست مربوط است و اغلب ناشی از یک نوبت طولانی استدلال است
که هنوز خروجی تولید نکرده است. اپراتورها میتوانند با
`resilienceSettings.streamStallCooldown.enabled` (پیشفرض `false`) این قابلیت را فعال کنند.

**سیگنال تأخیر اختیاری برای انتخاب حساب `p2c`.** هر تلاش ارسالشده، زمان تا اولین بایت و نتیجه
خود را برای هر اتصال (و برای هر اتصال + مدل) در یک پنجره چرخان درونحافظهای ثبت میکند: 20 نمونه
آخر در بازه 15 دقیقه
(`open-sse/services/connectionLatencyTracker.ts`، ثبتشده از `safeLogEvents()` در
`src/sse/handlers/chatHelpers.ts`). وقتی `resilienceSettings.p2cLatency.weight` بزرگتر از
`0` باشد (محدوده 0-20، پیشفرض `0` = خاموش)، `compareP2CConnections()` در
`src/sse/services/auth.ts` حداکثر تا `weight` امتیاز به هر نامزد جفت اضافه میکند. نیمی از این
امتیاز از تأخیر، بهصورت نسبتی نسبت به نامزد سریعتر، میآید (دو برابر کندتر بودن، نیمه کامل
امتیاز را میگیرد) و نیمه دیگر از نرخ خطای چرخان میآید. این عبارت فقط زمانی اعمال میشود که
هر دو نامزد حداقل 3 نمونه داشته باشند؛ بنابراین حسابهای جدید جریمه نمیشوند و سقف آن همچنان
کمتر از جریمههای مسدودشدن سهمیه و اتمام سهمیه باقی میماند. این قابلیت مدار مستقلی ایجاد
نمیکند: حسابهای دارای خطا همچنان توسط لایههای دوره خنکسازی، قفل و breaker مدیریت میشوند.
آن را با `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` تنظیم کنید.

**فریمهای استدلال، بودجه توقف محتوا را از نو آغاز میکنند.** یک مدل استدلال ممکن است پیش از
اولین توکن قابل مشاهده چند دقیقه فکر کند: Claude فریمهای `thinking_delta` را ارسال میکند که
متن تفکر آنها ممکن است خالی باشد، و Responses API نیز یک مورد استدلال را پس از دیگری ارسال
میکند. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) این فریمها را
تشخیص میدهد و ناظر بهجای لغو نوبت، بودجه خود را با هر فریم از نو آغاز میکند. این فریمها
هنوز خروجی مدل محسوب نمیشوند؛ بنابراین نوبتی که فقط با استدلال پایان یابد همچنان بهعنوان
خالی گزارش میشود و نوبتی که استدلال را متوقف کند و فقط heartbeat ارسال کند نیز همچنان ناظر
را فعال میکند.

فریمهای باینری `reasoningContentEvent` در Kiro که دارای امضای غیرخالی هستند، این فعالیت
استدلالی را از طریق executor بهصورت یک delta خالی `reasoning_content` حفظ میکنند. امضا
ارسال نمیشود. فراداده، فریمهای ناقص و امضاهای خالی، بودجه محتوا را از نو آغاز نمیکنند؛
timeout مستقل جریان فعال و لغو توسط کلاینت همچنان اعمال میشوند
(`open-sse/executors/kiro/reasoning.ts`).

**وضعیتهای نهایی (دوره خنکسازی نیستند):**

- `banned` — توسط تشخیص کلمه کلیدی ممنوع / مسدودشدن حساب تنظیم میشود (به [BAN_DETECTION](../security/BAN_DETECTION.md) مراجعه کنید). ردهای upstream در سطح هر درخواست (`request_rejected`، برای مثال 403 مربوط به Anthropic OAuth با متن "Request not allowed") هرگز آن را تنظیم نمیکنند: این موارد برای هر اتصال و مدل شمارش میشوند و آن مدل را با دوره خنکسازی افزایشی، با سقف `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h)، از چرخش خارج میکنند؛ یا وقتی مدلی شناختهشده نباشد، اتصال را خنک میکنند — `open-sse/services/requestRejectedStreak.ts`
- `expired` (پس از تلاشهای مجدد محدود به وضعیت نهایی منتقل میشود — `EXPIRED_RETRY_MAX = 3` با بازگشت نمایی — تا خطاهای موقت OAuth بتوانند پیش از غیرفعالشدن دائمی حساب، خودبهخود برطرف شوند)
- `credits_exhausted`

این وضعیتها تا زمانی که اعتبارنامهها تغییر کنند یا یک اپراتور آنها را بازنشانی کند، باقی میمانند. وضعیتهای پایانی را با وضعیت موقت cooldown بازنویسی نکنید.

**بازیابی تنبل:** وقتی `rateLimitedUntil` منقضی شود، اتصال دوباره واجد شرایط میشود. پس از استفاده موفق، `clearAccountError()` همه فیلدهای خطا را پاک میکند.

### دیوار مصرف Claude OAuth: مسیر با اولویت پایینتر + بازنشانی محدودیت نشست

**محدوده:** یک اتصال اشتراک Claude (OAuth). هر دو قابلیت بهصورت **اختیاری برای هر اتصال** فعال میشوند (Edit connection → بخش Claude → `lowPriorityMode` / `autoLimitReset` در `providerSpecificData`؛ هر دو بهصورت پیشفرض خاموش هستند) و رفتار فرمانهای `/low-priority` و `/limit-reset` در Claude Code را بازتاب میدهند (قرارداد سیمی از Claude Code 2.1.263 استخراج شده است).

**پیادهسازی:**

- ماشین حالت + طبقهبندی پاسخ: `open-sse/services/claudeLowPriority.ts`
- کلاینت وضعیت/ادعای بازنشانی: `open-sse/services/claudeLimitReset.ts`
- هوک اجراکننده (تزریق هدر + تلاش مجدد با همان حساب): `open-sse/executors/base.ts::execute()`
- ماندگارسازی اختیاری: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**محرک:** دیوار مصرف ۵ساعته — یک `429` که هدرهای آن شامل
`anthropic-ratelimit-unified-status: rejected` و، هنگامی که حساب واجد شرایط است،
`anthropic-ratelimit-unified-slow-offer: treatment` باشند. پیش از نخستین `429` دیوار، هیچ چیزی ارسال نمیشود؛ یک 429 ناگهانی بدون هدرهای یکپارچه، از مسیر عادی cooldown عبور میکند.

**مسیر با اولویت پایینتر** (`lowPriorityMode`):

- در 429 دیوار، اجراکننده پیشنهاد را میپذیرد و بلافاصله با همان حساب، همان درخواست را با `anthropic-usage-limit: slow` دوباره ارسال میکند؛ مسیر تا زمان اعلامشده `anthropic-ratelimit-unified-reset` (+۶۰ ثانیه مهلت اضافی) فعال میماند و هر درخواست در این بازه این هدر را حمل میکند. 429 رهگیریشده هرگز به `handleChatCore` نمیرسد؛ بنابراین اتصال وارد cooldown نمیشود و به اتصال دیگری منتقل نمیگردد.
- `anthropic-ratelimit-unified-slow-status` در پاسخهای بعدی: مقادیر `active` / `not_needed` مسیر را حفظ میکنند؛ مقدار `slot_busy` (429) یا یک `529`، مدت انتظار `anthropic-ratelimit-unified-slow-retry-after` سرور را (پیشفرض ۲۰ ثانیه، محدودشده به ۵–۶۰۰ ثانیه، با jitter ±۳۰٪) منتظر میمانند و دوباره تلاش میکنند؛ این فرایند با `anthropic-ratelimit-unified-slow-max-wait` (پیشفرض ۲۰ دقیقه، محدودشده به ۱ دقیقه–۶ ساعت) محدود میشود — پس از آن مسیر پایان مییابد و یک دوره خنکشدن ۱۰دقیقهای، پذیرش مجدد را مسدود میکند. این انتظار همچنین با زمان باقیمانده از مهلت آغاز upstream خود درخواست (`resolveFetchStartTimeout`، پیشفرض ۱۰ دقیقه) منهای حاشیه ۵ ثانیه محدود میشود: بدون این محدودیت، مقدار پیشفرض ۲۰دقیقهای max-wait از طول عمر درخواست بیشتر میشد و خواب در میانه کار متوقف میگردید؛ در نتیجه بهجای پایان graceful با `max_wait` و دوره خنکشدن، یک `TimeoutError` نمایان میشد.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`، چرخش پنجره ۵ساعته، یا `ineligible` بههمراه `anthropic-ratelimit-unified-overage-in-use: true` (که چون هزینه اضافی اکنون دیوار مصرف را پوشش میدهد، آن را در هر وضعیتی با حالت `extra_usage` پایان میدهد) مسیر را خاتمه میدهند؛ سپس پاسخ وارد مسیر عادی cooldown میشود. `budget_exhausted` تا زمان بازنشانی بودجه اعلامشده (حداکثر ۸ روز) به خاطر سپرده میشود.
- بررسی دیوار پس از تلاشهای مجدد درونتلاشی خود اجراکننده که با 400ها فعال میشوند (ویرایش context، محدودسازی thinking/effort، یادگیری خودکار پارامترها) انجام میشود؛ بنابراین یک 429 دیوار که فقط در یکی از این تلاشهای مجدد ظاهر شود نیز رهگیری میگردد و به مسیر cooldown نمیرسد.
- وضعیت برای هر اتصال در حافظه نگهداری میشود (راهاندازی مجدد، برای پذیرش مجدد به یک 429 دیوار اضافی نیاز دارد).

**بازنشانی محدودیت نشست** (`autoLimitReset`، هنگامی که هر دو قابلیت فعال باشند پیش از مسیر امتحان میشود):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → بلوک `juniper_tide`؛ هنگامی که `arm: "reset"` و `available: true` باشند،
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` با
  `{ "program": "juniper_tide" }` ارسال میشود (شناسه UUID سازمان از `providerSpecificData.organizationUUID`، با fallback راهاندازی اولیه).
- `result: reset|not_limited` → درخواست با سرعت کامل (بدون هدر slow) دوباره ارسال میشود.
  `already_used` / `not_offered` مقدار `next_available_at` را (بهطور پیشفرض یک هفته) memoise میکنند؛ هر شکست باعث backoff بهمدت ۱۵ دقیقه میشود. این بازنشانی هفتهای یکبار انجام میشود و همچنان در محدودیت هفتگی محاسبه میگردد.

محافظهای رگرسیون: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`,
`tests/unit/claude-low-priority-executor.test.ts`.

### بازنشانی های بانکی را به طور خودکار اعمال کنید

**محدوده:** اتصالات اشتراک Codex و Claude (OAuth).**انتخاب کنید** : تنظیم `bankedResetAutoApply` به طور پیش فرض خاموش و در حالت `dry-run` است (تنظیمات → AI → اعمال بازنشانی بانکی خودکار).

**هدف:** به جای اینکه منتظر بمانید تا اپراتور «Redeem» را در صفحه «محدودیتهای ارائهدهنده» فشار دهد، بازنشانیهای بانکی را خود به خود خرج میکنند.

| نوع اعتبار (`creditTypes`) | آنچه بازخرید می شود                           | جایی که اجرا می شود                                   |
| -------------------------- | --------------------------------------------- | ----------------------------------------------------- |
| `codexCredits`             | اعتبارات بازنشانی Codex                       | کار پس زمینه، هر 60 ثانیه                             |
| `claudeCredits`            | کمک های مالی بانکی Claude (اعتبارات `GRANT` ) | کار پس زمینه، هر 60 ثانیه                             |
| `claudeSessionReset`       | بازنشانی محدودیت جلسه هفتگی Claude (در بالا)  | مسیر درخواست، از طریق همان خطمشی با تغییر جهت هر حساب |

**پیاده سازی:**

- تصمیم خالص (یک قانون برای هر دو مسیر): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- شغل پیشینه: `src/lib/services/bankedResetAutoApply.ts` (شروع شده در `src/instrumentation-node.ts`)
- دروازه درخواست مسیر Claude : `src/lib/usage/claudeSessionResetPolicy.ts`، ثبت شده از طریق `setClaudeLimitResetPolicy()` در `open-sse/services/claudeLimitReset.ts`
- تاریخچه، کلاه ها و وب هوک: `src/lib/usage/bankedResetAudit.ts`
- تاریخچه API: `GET /api/settings/banked-reset-auto/history?limit=50` (مدیریت auth)

**دستور تصمیم گیری** (اولین قانون شکست، دلیل ثبت شده است):

1. ویژگی خاموش، نوع اعتبار خاموش، یا حساب خارج از محدوده (`accountScope` `all` / `selected` به اضافه نقشه `connections` هر حساب).
2. خارج از برنامه اختیاری UTC (`startHourUtc` > `endHourUtc` از نیمه شب عبور می کند).
3. سقف در 24 ساعت گذشته: `maxPerAccountPerDay` (1)، `maxPerDay` (3) و `minSpacingMinutes` (30) بین هر دو بازخرید.
4. ماشه: یک پنجره دیواری `session` یا `weekly` (خوانده شده از `getQuotaWindowStatus().reachedThreshold`، نه `isAccountQuotaExhausted()`، که فقط یک حساب را با هر پنجره سپری شده گزارش میکند)، یا اعتباری که در `expiringCreditHours` (24) در حسابی که حداقل `expiringCreditMinUsedPercent` (50) استفاده کرده است منقضی میشود.
5. حفاظ تنظیم مجدد طبیعی: از زمانی که پنجره 5 ساعته دیواردار در `sessionResetGuardMinutes` (90) یا پنجره هفتگی دیواردار در `weeklyResetGuardHours` (12) بازنشانی میشود، رد شوید.
6. طبقه هفتگی: وقتی باقیمانده هفتگی کمتر از `weeklyFloorPercent` (10) است، از تنظیم مجدد 5 ساعته صرفنظر کنید.
7. حالت `last-resort` : رد شوید در حالی که یک حساب دیگر از همان ارائه دهنده حداقل `poolHeadroomPercent` (10) در هر دو پنجره باقی مانده است. محرکهای اعتبار در حال انقضا این را دور میزنند.
8. `dry-run` یک ردیف را ثبت می کند و هیچ چیز را بازخرید نمی کند. `last-resort` و `eager` بازخرید می شوند.

دادههای سهمیه از دست رفته هرگز بازخرید را باز نمیکند: زمان بازنشانی ناشناخته یا استفاده هفتگی رد میشود.

**بازنشانی جلسه Claude :** با خاموش بودن ویژگی یا خاموش بودن `claudeSessionReset` ، کلید `autoLimitReset` برای هر حساب دقیقاً مانند قبل تصمیم می گیرد. با روشن بودن هر دو، این ویژگی جایگزین کلیدهای هر حساب میشود: یک حساب درون محدوده فقط زمانی میتواند ادعا کند که خطمشی اجازه میدهد، و در حالت `dry-run` هیچ ادعایی وجود ندارد.

**ایمنی:** شغل حداکثر یک اعتبار در هر تیک بازخرید میکند، قبل از فهرست کردن اعتبارها تصمیم میگیرد (یک حساب از قلم افتاده هرگز فهرست نمیشود)، از کلیدهای ناتوانی `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` استفاده میکند، و پس از یک لیست یا بازخرید ناموفق، حساب را به مدت 1 ساعت پشتیبان میگیرد. هر تصمیم بازخرید، شکست و اجرای خشک به `audit_log` نوشته می شود (`action: "bankedReset.redeem"`، بدون توکن یا شناسه اعتباری). کلاه ها از آن ردیف ها شمارش می شوند، بنابراین از راه اندازی مجدد جان سالم به در می برند. بازخریدهای موفقیت آمیز همچنین وب هوک `provider.reset_redeemed` را فعال می کند.

محافظ های رگرسیون: `tests/unit/banked-reset-policy.test.ts`، `tests/unit/banked-reset-auto-apply.test.ts`، `tests/unit/claude-limit-reset-policy-gate.test.ts`، `tests/unit/banked-reset-history-route.test.ts`.

### وابستگی نشست (#7274)

**محدوده:** یک نشست کلاینت (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) که برای هر **ارائهدهندهای** به یک اتصال متصل میشود.

**هدف:** نگهداشتن یک عامل چندنوبتی (Claude Code، aider، عوامل سفارشی) روی همان حساب در درخواستهای متوالی، برای کاهش از دست رفتن context بین حسابها و کاهش 429های تکراریِ cold-start در ارائهدهندگانی که وضعیت نشست را بهازای هر حساب نگهداری میکنند.

**پیادهسازی:**

- تعیین TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- انتخاب/ایجاد اتصال متصلشده: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- استخراج هدر (عمومی، برای هر ارائهدهنده): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- جدول pin ماندگار: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- تنظیم: `sessionAffinityTtlMs` (TTL سراسری برحسب ms، مقدار `0` آن را غیرفعال میکند) — `src/lib/db/settings.ts`. این تنظیم با migration `124_generic_session_affinity_ttl.sql` از نام مخصوص Codex، یعنی `codexSessionAffinityTtlMs`، تغییر نام یافته است؛ migration هر TTL مربوط به Codex را که قبلاً پیکربندی شده باشد بهعنوان مقدار پیشفرض جدید منتقل میکند.

پیش از #7274، `resolveSessionAffinityTtlMs()` برای هر ارائهدهندهای بهجز `codex` بهصورت زودهنگام مقدار `0` برمیگرداند؛ بنابراین تنظیم TTL (و هدرهای نشست) در هیچ جای دیگری اثری نداشت، با اینکه سازوکار pinning و استخراج هدر از ابتدا مستقل از ارائهدهنده بودند. این اصلاح آن بازگشت زودهنگام را حذف کرد؛ اکنون TTL پس از تنظیم سراسری روی مقداری بیشتر از `0`، بهطور یکسان برای همه ارائهدهندگان اعمال میشود.

سه هدر وابستگی نشست هرگز به upstream ارسال نمیشوند — اجراکنندهها هدرهای upstream خود را از ابتدا میسازند و هدرهای کلاینت را عبور نمیدهند؛ بنابراین این مقدار فقط یک شناسه همبستگی داخلی باقی میماند.

### اجارههای انحصاری اتصال نشست مدیریتشده

**دامنه:** یک کلاینت/نشست HTTP مدیریتشدهٔ فعال، مالک یک اتصال واجد شرایط OmniRoute است.

**هدف:** فراهمکردن مالکیت انحصاری و پایدار اتصال برای کلاینتهایی که به یک
مرز سخت مسیریابی در سراسر درخواستها نیاز دارند. این قابلیت با وابستگی نشست متفاوت است؛
وابستگی نشست یک ترجیح نرم برای تداوم است:
یک اجارهٔ انحصاری، وضعیت چرخهٔ حیات را در SQLite پایدار میکند، یکتایی مالک فعال و
اتصال فعال را در سطح سراسری اعمال میکند و پیش از ارسال به ارائهدهنده، نسل منسوخ را رد میکند.

این قابلیت برای هر کلید API بهصورت اختیاری فعال میشود. یک کلید مدیریتشده باید scope
`lease:exclusive` و یک فهرست صریح و غیرخالی `allowedConnections` داشته باشد. هر کلاینت HTTP میتواند از
نقطهٔ پایانی چرخهٔ حیات استفاده کند؛ نام کلاینت، user-agent، ارائهدهنده، روش OAuth یا مدل الزامی نیست.
اجاره مالک یک اتصال است، نه یک مدل؛ بنابراین تغییر مدل، تا زمانی که اتصال همچنان بهطور معمول
واجد شرایط باشد، binding را حفظ میکند. قوانین عادی مدل، سهمیه، سلامت، cooldown و فهرست مجاز همچنان
مرجع هستند و ممکن است همان نسل را به یک اتصال آزاد واجد شرایط دیگر منتقل کنند.

چرخهٔ حیات شامل `POST /api/v1/session-leases` با اقدامات JSON یعنی `acquire`، `renew` و `release` است.
درخواستهای استنتاج مدیریتشده، مقدار opaque `X-OmniRoute-Lease-Owner` و
`X-OmniRoute-Lease-Generation` دقیق را ارسال میکنند. مالک با `vlo_` بههمراه ۴۳ نویسهٔ base64url
ساخته میشود؛ فقط هش SHA-256 آن ذخیره میشود. هر مرز نهایی ارسال همچنین به شناسهٔ کلید API احراز هویتشده
و شناسهٔ اتصال فعال متصل است. هدرهای کنترلی اجاره از گزارشها، snapshotهای درخواست نگهداریشده
و هدرهای اجراکنندهٔ بالادستی حذف میشوند.

اگر مسیریابی عادی، نامزدهای مدیریتشدهٔ واجد شرایط داشته باشد اما همهٔ نامزدهای آزاد توسط یک
اجارهٔ فعال متعلق به طرفی دیگر اشغال شده باشند، OmniRoute کد HTTP `429`، کد
عدمدسترسی به ظرفیت اجاره، وضعیت انتظار برای ظرفیت و یک `Retry-After` محدودشده را که از نزدیکترین
انقضای مرتبط بهدست آمده است، بازمیگرداند. خالیبودن عادی واجد شرایط بودن، رقابت بر سر اجاره نیست
و معنای خطای مسیریابی موجود خود را حفظ میکند.

سازوکارهای مرتبط همچنان جدا باقی میمانند:

- اشغال نشست OAuth، توزیع نرم و محلیِ فرایند برای حسابهای OAuth است.
- سمافورهای حساب، مجوزهای همزمانی درخواست را اعطا میکنند و با تکمیل درخواست پایان مییابند.
- اجارههای انحصاری نشست مدیریتشده، مالکیت پایدار چرخهٔ حیات با یک مرز نسلی هستند.

## ۳. قفل مدل

**دامنه:** سهتایی ارائهدهنده + اتصال + مدل.

**دامنه بر اساس وضعیت:** وضعیت خطادار تعیین میکند قفل در کدام کلید نوشته شود
(`resolveLockoutScope()` در `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — سیگنال سهمیه یا دسترسی — **خانواده سهمیه** را قفل میکند:
  برای codex، کل دامنه `codex` / `spark` (تمام مدلهای `gpt-5*` مربوط به
  اتصال) و برای سایر ارائهدهندگان، `getQuotaScopedModelForProvider()`.
- `404` مدل پایه را قفل میکند (`getModelLockKey()` آن را به `not_found` محدود میکند).
- هر وضعیت دیگر — خطاهای انتقال/سرور `5xx` و `502` تولیدشده توسط OmniRoute در
  اعتبارسنجی کیفیت — فقط **تاپل دقیق** ارائهدهنده/اتصال/مدل را قفل میکند. یک
  جریان معیوب در یک مدل، شواهدی درباره سهمیه حساب نیست؛ پیش از این قانون، یک
  پاسخ خالی در `codex/gpt-5.6-luna` همه مدلهای `gpt-5*` آن اتصال را به مدت
  ۲ تا ۳۰ دقیقه (با افزایش تدریجی) از مسیریابی حذف میکرد، در حالی که سهمیه آن
  دستنخورده باقی میماند.
- گزینه `scope` صریح فراخوان همیشه اولویت دارد (Antigravity مقدار `"exact"` را ارسال میکند).

**هدف:** جلوگیری از غیرفعالکردن کل اتصال زمانی که فقط یک مدل در دسترس نیست یا سهمیه آن محدود شده است.

**مثالها:**

- ارائهدهندگان دارای سهمیه بهازای هر مدل که `429` برمیگردانند
- ارائهدهندگان محلی که برای یک مدل مفقود `404` برمیگردانند
- خطاهای مجوز حالت/مدل مخصوص ارائهدهنده (برای نمونه، حالتهای Grok)

**پیادهسازی:** `open-sse/services/accountFallback.ts` — `lockModel()`، `clearModelLock()`، `getAllModelLockouts()`.

### داشبورد مهلتهای خنکسازی مدل (v3.8.0)

رابط کاربری: تنظیمات → مهلتهای خنکسازی مدل (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

قفلهای فعال را همراه با این موارد فهرست میکند: ارائهدهنده، اتصال، مدل، دلیل، expiresAt. اپراتورها میتوانند یک مدل را مستقیماً از کارت دوباره فعال کنند.

**REST API:**

- `GET /api/resilience/model-cooldowns` — فهرست قفلهای فعال
- `DELETE /api/resilience/model-cooldowns` — فعالسازی دستی مجدد. بدنه: `{provider, connection, model}`. احراز هویت: مدیریت.

### مدیر مهلت خنکسازی

رابط کاربری: پایش → مدیر مهلت خنکسازی (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

یک صفحه برای هر اتصالی که به دلیلی موقتی از مسیریابی خارج شده است، بهجای
بازکردن صفحه هر ارائهدهنده بهصورت جداگانه. این صفحه مهلتهای خنکسازی اتصال،
قفلهای مدل و وضعیتهای نهایی را فهرست میکند، آنها را برای هر اتصال، موارد
انتخابشده یا همه اتصالهای یک ارائهدهنده پاک میکند و پرکاربردترین قوانین
مهلت خنکسازی را ویرایش میکند: `streamStallCooldown.enabled` و مهلت پایه
`connectionCooldown` برای OAuth / کلید API و همچنین حداکثر گامهای بازگشت
نمایی (که از طریق `PATCH /api/resilience` ذخیره میشوند). وضعیتهای نهایی
(`banned`، `expired`، `credits_exhausted`) فهرست میشوند، اما هرگز از اینجا پاک نمیشوند.

کارت **قوانین مهلت خنکسازی خطا** در همان صفحه، قوانین خطای اپراتور
(`settings.providerErrorRules`) و پیشفرضهای فراگیر هر ارائهدهنده
(`settings.providerErrorDefaults`) را از طریق `PATCH /api/settings` ویرایش میکند —
برای نحوه تطبیق آنها، بخش «قوانین اعلامشده توسط اپراتور» در §۷ را ببینید.
مدتها عبارتاند از پیشفرض (بدون مهلت خنکسازی صریح)، ۳۰ دقیقه، ۱ ساعت،
۵ ساعت، ۲۴ ساعت یا مقدار سفارشی از ۱ تا ۴۳٬۲۰۰ دقیقه (۳۰ روز).

**REST API** (`src/lib/resilience/cooldownManager.ts`، احراز هویت: مدیریت):

- `GET /api/resilience/cooldowns[?provider=]` — اتصالها همراه با وضعیت، مهلت خنکسازی باقیمانده،
  سطح بازگشت، آخرین نوع خطا و قفلهای مدل (بدون اطلاعات احراز هویت)
- `POST /api/resilience/cooldowns` — بدنه `{connectionIds: string[]}` یا
  `{all: true, provider?}`؛ مقدار `{cleared, unchanged, skippedTerminal, lockoutsCleared}` را برمیگرداند

### رابط کاربری تنظیمات قفل مدل + بازیابی با کاهش پس از موفقیت (v3.8.23)

قفل مدل از رفتاری سختکدنویسیشده و همیشهفعال به قابلیتی کاملاً قابلپیکربندی
و اختیاری، همراه با کارت تنظیمات مستقل و مسیر بازیابی خودترمیمشونده تبدیل شده است.

**کارت تنظیمات:** تنظیمات → قفل مدل
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
این کارت از `ModelCooldownsCard` فقطخواندنی بالا **متمایز** است (کارت قبلی فقط
قفلهای فعال را _فهرست_ میکند) — کارت جدید پارامترها را _پیکربندی_ میکند.
مقادیر پیشفرض در `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) قرار دارند:

| تنظیم                   | پیشفرض                           | مفهوم                                                                        |
| ----------------------- | -------------------------------- | ---------------------------------------------------------------------------- |
| `enabled`               | `false`                          | کلید اصلی — قفل مدل بهصورت پیشفرض **خاموش** است.                             |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | وضعیتهای بالادستی که بهعنوان شکستِ محدود به مدل محسوب میشوند.                |
| `baseCooldownMs`        | `120_000` (120 s)                | مدت اولیه قفل برای نخستین شکست.                                              |
| `maxCooldownMs`         | `1_800_000` (30 min)             | سقف مهلت خنکسازی افزایشیافته.                                                |
| `maxBackoffSteps`       | `10`                             | حداکثر گامهای افزایش نمایی بازگشت.                                           |
| `useExponentialBackoff` | `true`                           | تعیین میکند آیا شکستهای تکرارشونده مهلت خنکسازی را بهصورت نمایی افزایش دهند. |

تنظیمات از طریق مخزن معمول تنظیمات ذخیره میشوند و با طرحواره تنظیمات تابآوری
اعتبارسنجی میشوند؛ کارت، `baseCooldownMs`/`maxCooldownMs` را محدود میکند
(با شرط `maxCooldownMs ≥ baseCooldownMs`) و همچنین `maxBackoffSteps` را محدود میکند.

**بازیابی با کاهش پس از موفقیت:** بازیابی صرفاً با پایان تایمر انجام نمیشود.
یک پاسخ سالم، شمارش شکست مدل را کاهش میدهد تا مدلی که در میانه بازه بازیابی
شده است، پیش از پایان تایمر، دیگر به افزایش مهلت خنکسازی ادامه ندهد (و قفل آن
پاک شود). پس از موفقیت هدف ترکیبی، `open-sse/services/combo.ts`، تابع
`decayModelFailureCount()` (`open-sse/services/accountFallback.ts`) را فراخوانی
میکند که `failureCount` ذخیرهشده را نصف میکند (`Math.floor(failureCount / 2)`).
وقتی مقدار آن به `0` برسد، ورودی قفل بهطور کامل حذف میشود. تابع مقابل،
`recordModelLockoutFailure()`، در صورت وقوع شکستها در بازه افزایش، شمارش را
افزایش میدهد (و مهلت خنکسازی را افزایش میدهد). این کاهش پس از موفقیت، علاوه
بر پایان عادی تایمر است — هر یک از این دو مسیر میتواند مدل را دوباره فعال کند.

**وضعیت:** قفلشدنها بهصورت **در حافظه** نگهداری میشوند (مجموعههای `Map` در هر فرایند از
`ModelLockoutEntry` که بر اساس `provider:connectionId:model` کلیدگذاری شدهاند؛ قفلهای محدودهٔ دقیق بر اساس
`provider:connectionId:exact:model`)، و در پایگاهداده ذخیره نمیشوند — با راهاندازی مجدد از بین میروند.
_تنظیمات_ ذخیره میشوند؛ _وضعیت_ فعال قفلشدن موقتی است.

---

## ۴. کنترل همزمانی سهمیه-اشتراکی (v3.8.36)

حسابهای اشتراکی (GLM، MiniMax و غیره) اغلب فقط حدود ۱ تا ۳ درخواست همزمان
را میپذیرند؛ عبور از این مقدار باعث 429 و دورههای خنکسازی میشود. این مشکل در
ترکیبهای **سهمیه-اشتراکی** (`qtSd/…`) شدیدتر است، زیرا چندین کلید API یک حساب
بالادستی را به اشتراک میگذارند. سه لایه مانع هجوم درخواستها به یک حساب مشترک
میشوند.

### سقف همزمانی هر اتصال (`max_concurrent`)

هر اتصال ارائهدهنده میتواند یک سقف `max_concurrent` تعریف کند
(`provider_connections.max_concurrent` که در پنجره اتصال / API / DB تنظیم میشود).
برای نداشتن محدودیت، آن را خالی بگذارید. این تنها گزینهای است که لایه
سریالسازی زیر را کنترل میکند — آن را برابر همزمانی واقعی حساب تنظیم کنید
(برای مثال، GLM حدود ۱ و MiniMax حدود ۲).

### سقفهای همزمانی هر مدل (`modelConcurrency`)

یک اتصال میتواند علاوه بر این، سقفهای دقیق همزمانی هر مدل را درون نگاشت
`rateLimitOverrides` تعریف کند:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

آن را در پنجره اتصال (**Rate limit overrides → Per-model
concurrency caps**، یک `model=cap` در هر خط) یا از طریق
`PATCH /api/providers/[id]` با همین ساختار JSON تنظیم کنید. معنای کلیدها:

- **سراسری اتصال در برابر اختصاصی مدل:** `maxConcurrent` همچنان سقف مشترک
  در سطح کل اتصال است. وقتی هر دو اعمال شوند، هر دو در همان دروازه ترکیبی
  (`global → provider → account → model`) بهصورت اتمی دریافت میشوند؛ رفتار
  مؤثر، محدودیت سختگیرانهترِ قابل اعمال است.
- **تطبیق دقیق کلید مدل:** کلید، رشته مدل ارسالشده به اجراکننده پس از تعیین
  مسیر است — معمولاً شناسه خام مدل بالادستی (`glm-5`)، نه نام مستعار
  `provider/model` در سمت کلاینت (`zai/glm-5` با `glm-5` تطبیق ندارد). مقادیر،
  سقفهای مثبتِ صحیح برای درخواستهای همزمان هستند.
- **صفبندی محلی، بدون شناسایی:** درخواستهای اضافی با همان معنای فعلی صف/مهلت
  زمانی، بهصورت محلی در صف قرار میگیرند (خطاهای پذیرش نوعدار
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute سیاست بالادستی را
  شناسایی یا استنباط نمیکند — بلکه دقیقاً سقفهایی را اعمال میکند که اپراتور
  پیکربندی کرده است. اشباعشدن دروازه مدل هرگز ارائهدهنده را غیرفعال نمیکند و
  هرگز باعث قفل دائمی مدل نمیشود؛ رفتارهای 429/خنکسازی/بازگشت به گزینه جایگزین
  در بالادست همچنان پشتیبان خطا باقی میمانند.
- **محدوده هر اتصال و هر فرایند:** سقفها برای هر اتصال پایگاه داده اعمال و در
  حافظه نگهداری میشوند؛ بنابراین دو اتصالی که از یک کلید API بالادستی استفاده
  مجدد میکنند، با یکدیگر هماهنگ نمیشوند.
- **تنظیمنشده یعنی بدون تغییر:** حذف نگاشت (یا خالیگذاشتن فیلد داشبورد) هیچ
  دروازه مدلی اضافه نمیکند. نمونه پیکربندی، بدون اعمال هیچ محدودیت سراسری برای
  ارائهدهنده:

```text
glm-5=1
glm-4.7=3
```

### سریالسازی درخواستهای سهمیه-اشتراکی

وقتی یک ارسال سهمیه-اشتراکی، اتصالی را هدف میگیرد که `max_concurrent` مثبت
تعریف کرده است، درخواستهای همزمان به آن **حساب** از طریق یک سمافور
هر-اتصال (با کلید `qsconn:<connectionId>`) سریالسازی میشوند: درخواستهای اضافی
**در صف منتظر میمانند** و بهجای ایجاد هجوم به حساب، منتظر نوبت میشوند. این
سازوکار **باز-گشوده (fail-open)** است — صف اشباعشده یا اتمام مهلت، بدون دریافت
نوبت ادامه مییابد و هرگز درخواستی را که قابلیت ارسال دارد رد نمیکند. این گزینه
در **Settings → Resilience → Quota-share per-connection
concurrency** فعال یا غیرفعال میشود
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`، بهصورت پیشفرض فعال).
بدون سقف `max_concurrent`، رفتار تغییری نمیکند.

> دروازه مسیریابی سهمیه-اشتراکی (`selectQuotaShareTarget`، DRR + P2C) نیز
> باز-گشوده است و فقط اتصالِ رسیده به سقف را _در اولویت پایینتری_ قرار میدهد —
> در یک مجموعه تکاتصالی نمیتواند محدودیت سخت اعمال کند؛ بنابراین این سمافور است
> که عملاً هجوم را مهار میکند.

### تلاش مجدد آگاه از دوره خنکسازی ترکیب

برای هر راهبرد ترکیب (در صورت فعالبودن)، اگر درخواستی در صورت ارسال، برای یک
خنکسازی کوتاهمدت و موقت باعث 429 شود، بهجای بازگرداندن 429، تا پایان آن
منتظر میماند و دوباره ارسال میشود — این مورد پنجرههای TPM/RPM در رده Gemini
(با `retry-after` حدود ۶۰ ثانیه) را در ترکیبهای چندمدلی پوشش میدهد؛ برای مثال
وقتی هر دو هدف یک ترکیب دومدلی به محدودیت نرخ هر مدل برخورد میکنند. این رفتار
با `comboCooldownWait` (`enabled`، `maxWaitMs`، `maxAttempts`،
`budgetMs`) در **Settings → Resilience** محدود میشود. این سازوکار هرگز برای
`quota_exhausted` (که تا نیمهشب قفل است) یا دلایل احراز هویت/یافتنشدن منتظر
نمیماند.

یک ترکیب میتواند با `config.comboCooldownWaitEnabled: false` از این رفتار
صرفنظر کند. فقط مقدار literal `false` این انتظارهای مشترک ترکیب (خنکسازی پس
از ارسال و انتظار پیش از ارسال برای مدار باز/قفل مدل) و افزایش کف مهلت زمانی
انتظار را غیرفعال میکند. نبودن مقدار یا `true` سیاست سراسری را حفظ میکند؛
`true` نمیتواند انتظارِ بهصورت سراسری غیرفعالشده را فعال کند. مقدار صریح
`targetTimeoutMs` همچنان اولویت دارد. این صرفنظرکردن، انتظار جداگانه پیش از
ارسالِ پینکردن نوبت native-Codex را تغییر نمیدهد.

همین دروازه حالت پیش از ارسال (#16319) را نیز پوشش میدهد: وقتی هر هدف یک ترکیب
پیش از هرگونه تلاش، بهدلیل قرارداشتن مدلش در یک قفل کوتاهمدت و موقت رد میشود،
مسیر بدون تلاش، تحت همان سقفها تا رفع قفل منتظر میماند و دوباره ارسال میکند؛
بهجای آنکه پاسخی بدون راهنمای
`503 ALL_TARGETS_SKIPPED` ارائه دهد. وقتی هیچ انتظاری مجاز نباشد (سقف، تعداد
تلاش یا بودجه تمام شده باشد، یا قابلیت غیرفعال باشد)، پاسخ نهایی به
`429 rate_limit_error` ارتقا مییابد و `retry_after` / `reset_at` را از نزدیکترین
زمان انقضای قفل موقت حمل میکند؛ قفلهای سهمیه، احراز هویت و یافتنشدن همچنان
`503` بدون راهنما باقی میمانند.

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

## 5. کنترل پذیرش صف درخواست (v3.8.49 · issue #6593)

**دامنه**: صف محدودکردن نرخ محلیِ بهازای هر ارائهدهنده+اتصال (`open-sse/services/rateLimitManager.ts`، که توسط Bottleneck پشتیبانی میشود)، یک لایه پایینتر از سه مکانیزم بالا.

**`maxWaitMs` انتظار در صف را محدود میکند؛ `executionMaxWaitMs` اجرا را محدود میکند.**
این دو عمداً از یکدیگر جدا هستند و هیچکدام به دیگری تغذیه نمیشود.

`resilienceSettings.requestQueue.maxWaitMs` **بودجهٔ انتظار در صف** است: شامل
انتظار برای یک اسلات ارائهدهنده و سپس نشستن در وضعیت QUEUED میشود، و تایمر آن
همان لحظهای که کار از QUEUED خارج و اجرایش آغاز میشود پاک میشود
(`rateLimitManager.ts`، `wrappedFn`). درخواستی که از آن فراتر رود هرگز به
upstream نمیرسد. مقدار پیشفرض 30000ms است که توسط `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
در `src/lib/resilience/settings.ts` تأمین و توسط
`tests/unit/ratelimit-admission-control-6593.test.ts` پین شده است، بنابراین تغییر آن
آن تست را قرمز میکند بهجای اینکه این پاراگراف بیصدا کهنه بماند.

`resilienceSettings.requestQueue.executionMaxWaitMs` همان چیزی است که Bottleneck
بهعنوان `expiration` کار دریافت میکند، که تایمرش تنها پس از dispatch شروع میشود.
این یک سپر پشتیبان برای executorهایی است که timeout مخصوص خود برای upstream ندارند،
و وقتی timeout شروعِ fetch خودِ executor طولانیتر باشد به همان مقدار افزایش مییابد،
بنابراین نمیتواند یک پاسخ سالمِ در حال انتقال را قطع کند. مقدار پیشفرض 600000ms (۱۰ دقیقه).

تغذیهٔ بودجهٔ صف به درون `expiration` همان چیزی بود که قبلاً gatewayهای غیرافزایشی
را در میانهٔ راه میکشت — آنها بهطور قانونی پیش از نخستین بایتها دقایقی اجرا
میشوند — و به همین دلیل است که یک expiration با `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) ظاهر میشود در حالی که بودجهٔ صف کد
queue-timeout را حمل میکند. هر یک را میتوان از طریق `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (متغیر محیطی) یا داشبورد
(**Settings → Resilience**) بازنویسی کرد. هر دو هنگام نرمالسازی به بازهٔ 1ms تا
۲۴ ساعت clamp میشوند.

**تقدم، برای هر دو:** متغیر محیطی فقط _پیشفرض_ را تأمین میکند. مقداری که در
`resilienceSettings.requestQueue` پایدار شده است (داشبورد / API patch، ذخیرهشده
در `key_value`) بر آن غلبه میکند، و `rateLimitOverrides.maxWaitMs` /
`.executionMaxWaitMs` بهازای هر اتصال بر آن غلبه میکند. بنابراین تنظیم متغیر
محیطی روی استقراری که از قبل مقدار پایداری دارد هیچ چیزی را تغییر نمیدهد —
بهجای آن، تنظیم پایدار را پاک یا بهروزرسانی کنید.

مدت اقامت در صف توسط `maxWaitMs` محدود میشود؛ `maxQueueDepth` در ادامه محدود
میکند چه تعداد فراخواننده میتوانند همزمان در صف باشند.

**تلاشهای مجدد اعلامشده در بدنه: pacing در برابر lockout.** بدنهٔ یک 429 میتواند
زمان انتظار خودش را اعلام کند (`RetryInfo.retryDelay` در Gemini، متن "retry after Ns")،
که `updateFromResponseBody` آن را میخواند. انتظاری که در `maxWaitMs` اتصال جا شود
pacing است: محدودکننده مخزنش را برای همان مدت خالی میکند و فراخوانهای
صفگرفته وقتی دوباره پر شد dispatch میشوند. انتظاری طولانیتر از `maxWaitMs`
چیزی نیست که صف بتواند تا پایانش بنشیند — Gemini به سهمیهٔ روزانهٔ تمامشده با
`retryDelay: "86399s"` پاسخ میدهد. `Retry-After` بازارسالشده روی 429 بازسازیشده
(#16528) از هماکنون باعث میشود موتور fallback مدل را برای آن پنجره قفل کند،
اما مکثکردن محدودکننده برای آن نیز همچنان هر فراخوانی را که زودتر به کلید برسد
(مثلاً پس از یک بازنشانی resilience) برای تمام `maxWaitMs` متوقف خواهد کرد. وقتی
چنین انتظاری از یک detail تایپدارِ `RetryInfo` گوگل (منشأ `google_rpc_retry_info`)
برسد و محدودکنندهٔ کلید از قبل در قلمروی مدل باشد (به `getLimiterKey` نگاه کنید)،
آن 429 در عوض به یک lockout مدل روی همان اتصال تبدیل میشود
(`lockModelForLongBodyRetry` در
`open-sse/services/rateLimitManager/bodyRetryPause.ts`، با سقف ۲۴ ساعت)، و
محدودکننده بدون مکث رها میشود. انتخاب حساب از طریق `isModelLocked()` بهخاطر آن
قفل رد میشود، و دروازهٔ پیش از dispatch کامبو نیز برای اهداف پینشده به اتصال
همینطور. در antigravity، که محدودکنندهاش بهازای هر خانوادهٔ سهمیه است، قفل روی
مدلِ دقیق است، مانند سایر قفلهای سهمیهایاش. نامی که کلاینت خواسته است نیز وقتی
یک alias آن را به آن مدل resolve کرده باشد قفل میشود، زیرا آن بررسیها از نام
درخواستشده استفاده میکنند؛ دقیقاً همان قفل میشود (`lockExactModel`)، بنابراین یک
alias که از یک خانوادهٔ سهمیهٔ antigravity یا یک قلمروی codex میگذرد هرگز نام
خودش را قفل نمیکند. یک سرنخ نثری، یک `retryDelay` بدون تایپ، یا محدودکنندهای که
کل اتصال در آن شریک است، مکث را حفظ میکند. وقتی محدودکنندهای که مسیر 429
همینحالا بازسازی کرده واقعاً مکث میکند، فراخوانندهای که زمانِ باقیماندهٔ صفش
پیش از پایان مکث تمام شود بلافاصله با کد queue-timeout (`checkLimiterPause`)
برگردانده میشود بهجای آنکه آن زمان را تا پایان صبر کند؛ پایانِ ثبتشده پیش از
ساختهشدن محدودکننده مهار میشود، همانجایی که Bottleneck ساعت تازهسازیاش را
شروع میکند، و هر تغییر بعدی در مخزن آن را فراموش میکند. پوشش دادهشده توسط
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` و
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — سقف پذیرش با فعالسازی صریح (جدید).** `resilienceSettings.requestQueue.maxQueueDepth`
محدود میکند چه تعداد درخواست میتوانند همزمان برای یک ارائهدهنده+اتصال در صف
بنشینند (هنوز dispatch نشدهاند). وقتی صف از قبل `maxQueueDepth` درخواست را در خود
دارد، درخواست جدید با یک خطای تایپدار `code: "RATE_LIMIT_QUEUE_FULL"` **پیش از**
آنکه اصلاً به `limiter.schedule()` برسد، بهسرعت رد میشود — بنابراین رد کردن
ارزان است و پیش از هر کار فشردهسازی پرامپت / ترجمهٔ پاییندست برای آن درخواست
رخ میدهد. پیشفرض `0` = غیرفعال، که رفتار موجودِ صفِ نامحدود را حفظ میکند؛
محدود به ۰ تا ۱۰۰۰۰۰. بازنویسی از طریق `RATE_LIMIT_MAX_QUEUE_DEPTH` (متغیر محیطی)
یا `resilienceSettings.requestQueue.maxQueueDepth` (داشبورد / API patch).

خودِ بررسی پذیرش یک تابع خالص است
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) بنابراین
بدون یک محدودکنندهٔ واقعی Bottleneck قابل تست واحد است.

> RFC که موجب باز شدن #6593 شد، همچنین فلگی با نام `bypassCompressionOnRateLimit`
> را پیشنهاد میکرد. پایپلاین `open-sse/services/compression/` در این مخزن،
> فشردهسازی پرامپت/کانتکست روی درخواست خروجی LLM است (`chatCore.ts`،
> حوالی بلاک `resolveCompressionSettings`/`selectCompressionStrategy`)،
> نه فشردهسازی پاسخ HTTP روی بدنههای 429 ساختگی — هیچ مسیر کد منطبقی
> برای یک فلگ bypass تحتاللفظی وجود ندارد. آن مرحلهٔ فشردهسازی پرامپت
> همچنین در حال حاضر _قبل_ از `withRateLimit()` در پایپلاین درخواست اجرا میشود،
> بنابراین تغییر ترتیب برای رد کردن آن هنگام رد شدن به دلیل پر بودن صف،
> تغییری جداگانه و بزرگتر از محدودهٔ این issue است؛ این کار عمداً در اینجا
> پیادهسازی **نشد** و در صورتی که صرفهجویی در CPU ارزش ریسک تغییر ترتیب را
> داشته باشد، بهعنوان کار بعدی باقی مانده است.

### شبکهٔ امنی فعالسازی خودکار محدودیت نرخ و محافظت از اتصال (`rateLimitProtection`)

**شبکهٔ امنی فعالسازی خودکار** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`، پیشفرض `true`):
بهطور پیشفرض، OmniRoute بهطور خودکار محافظت صف محدودیت نرخ را برای همهٔ اتصالهای فعال ارائهدهندهٔ کلید API (`getProviderCategory(provider) === "apikey"`) فعال میکند. این کار تضمین میکند که درخواستهای ورودی به کلیدهای API بالادستِ حساس به نرخ، بهجای منجر شدن به موجی از خطاهای 429 بالادستی، از طریق Bottleneck در صف قرار گرفته و مهار شوند. این شبکهٔ امنی را میتوان از طریق متغیر محیطی `RATE_LIMIT_AUTO_ENABLE` بازنویسی کرد (`false`/`0`/`off` آن را غیرفعال میکند، `true`/`1`/`on` آن را بهزور فعال میکند)، که بر تنظیم ذخیرهشدهٔ داشبورد (**تنظیمات ← تابآوری** / `PATCH /api/resilience`) اولویت دارد.

**معناشناسی `rateLimitProtection` در سطح هر اتصال:**
محافظت محدودیت نرخ در سطح هر اتصال از طریق فیلد بولی `rateLimitProtection` روی اتصالهای ارائهدهنده ردیابی میشود (در SQLite بهصورت `rate_limit_protection` ذخیره میشود):

- **فعالسازی صریح (`rateLimitProtection === true`)**: محافظت محدودیت نرخ بهصراحت برای این اتصال فعال است، صرفنظر از دستهٔ ارائهدهنده یا اینکه شبکهٔ امنی فعالسازی خودکار روشن باشد یا نه.
- **غیرفعالسازی صریح (`rateLimitProtection === false`)**: محافظت صریح را غیرفعال میکند، اما یک اتصال فعال کلید API را از شبکهٔ امنی سراسری فعالسازی خودکار خارج **نمیکند**. در `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`)، `false` و `undefined` معادل یکدیگر هستند: فقط `rateLimitProtection === true` بهعنوان بازنویسی صریح در نظر گرفته میشود. اگر `rateLimitProtection` برابر `false` باشد (یا تنظیم نشده باشد)، یک اتصال فعال کلید API همچنان با شرط فعالسازی خودکار منطبق است و تحت محافظت محدودیت نرخ باقی میماند.
- **عدم وجود امکان خروج در سطح هر اتصال**: یک اپراتور در حال حاضر نمیتواند بیان کند «این اتصال فعال کلید API بهتنهایی باید بدون محافظت صف محدودیت نرخ اجرا شود» و همزمان فعالسازی خودکار را برای بقیه فعال نگه دارد. برای اجرای کامل اتصالهای کلید API بدون صفهای محدودیت نرخ، شبکهٔ امنی باید بهصورت سراسری خاموش شود (`RATE_LIMIT_AUTO_ENABLE=false` یا `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**مسیرهای نوشتن پشتیبانیشده:**

- **`POST /api/rate-limits`**: مسیر نوشتن مدیریتی پشتیبانیشده برای تغییر وضعیت `rateLimitProtection` یک اتصال (`{ connectionId: string, enabled: boolean }`). فراخوانی آن با `enabled: true` محافظت صریح را روشن میکند؛ فراخوانی آن با `enabled: false` محافظت صریح را حذف میکند (با این حال، در صورت روشن بودن فعالسازی خودکار، اتصالهای فعال کلید API همچنان تحت پوشش شبکهٔ امنی سراسری باقی میمانند).
- **`PUT /api/providers/[id]`**: عمداً `rateLimitProtection` را **نمیپذیرد** و آن را تغییر نمیدهد (#11278). بهروزرسانی فرادادهٔ اتصال ارائهدهنده از طریق `PUT /api/providers/[id]` هرگز وضعیت ذخیرهشدهٔ محافظت محدودیت نرخ را تغییر نخواهد داد.

---

## 6. نگهبان توان عملیاتی آهسته (#9709)

گارد اختیاری `resilienceSettings.streamRecovery.throughputWatchdog` یک بالادست را تشخیص میدهد که هنوز تکهها را ارسال میکند اما خروجی دستیار کمتر از نرخ خروجی مفید پیکربندیشده تولید میکند. عمداً از مهلت زمانی بیکار متمایز است: ضربان قلب و ابرداده هیچ تایمر را بازنشانی می کنند و به عنوان پیشرفت به حساب نمی آیند. همچنین از مهلت تلاش سخت (#9153)، که بدون در نظر گرفتن کیفیت خروجی، سقف ایمنی مطلق باقی میماند، متمایز است.

سگ نگهبان قبل از اینکه بتواند سقط شود نیاز به یک دوره گرم کردن دارد و به دنبال آن یک پنجره چرخان کامل است. دلتاهای متنی را از تکمیلهای چت میشمارد و رویدادهای خروجی API را پاسخ میدهد (یک پروکسی محافظهکار بایت UTF-8 )، رویدادهای فقط استفاده و خالی را نادیده میگیرد، و قضاوت را در حالی که رویدادهای فراخوانی ابزار یا استدلال در حال پرواز هستند، به حالت تعلیق در میآورد. به طور پیشفرض غیرفعال است و میتوان آن را با `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` فعال کرد (این مقدار env فقط — پیشفرض را نشان میدهد که یک `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean ذخیره شده برنده میشود؛ به یادداشت اولویت env-vs-dashboard در بالای این راهنما مراجعه کنید). پنجره، گرم کردن، حداقل نرخ و حداقل خروجی قابل اندازه گیری توسط لایه نرمال سازی تنظیمات انعطاف پذیری معمولی محدود می شود.

هنگامی که فعال باشد، سقط نگهبان فقط برای تلاش فعال بالادستی اعمال می شود. قبل از هر بایت قابل مشاهده برای مشتری، مسیر بازیابی زودهنگام همان حساب موجود ممکن است تلاش را دوباره باز کند. پس از انجام، استریم هرگز کورکورانه پخش نمی شود. فقط قرارداد ادامه ایمن میان جریان موجود می تواند یک پسوند بخیه بزند. نهاییسازی تکشات باقی میماند، بنابراین حسابداری استفاده و انتشار سمافور تکراری نیستند.

---

## ۷. بازبیان وضعیت بالادستی (خطاهای سهمیه با وضعیت نادرست)

**دامنه:** یک درگاه بالادستی که اتمام موقت سهمیه را با وضعیت HTTP نادرست گزارش میکند.

**هدف:** اصلاح یک وضعیت گمراهکننده پیش از طبقهبندی، تا مصرفکنندگان پاییندستی (موتور بازگشت، تجمیع ترکیبی، و پاسخ قابلنمایش برای مشتری) ماهیت واقعیِ قابلتلاشمجددِ خطا را ببینند.

برخی درگاهها اتمام موقت سهمیه را با یک وضعیت HTTP غیرقابلتلاشمجدد علامتگذاری میکنند. `agentrouter.org` بهجای `429` استاندارد، `403` (و گاهی `400`) را همراه با بدنهای چینی (`用户额度不足` / `额度不足`) برمیگرداند. کلاینتهایی مانند Claude
Code، `403` را دائمی در نظر میگیرند و نشست را متوقف میکنند؛ بدون این اصلاح،
موتور بازگشت آن را بهجای یک رویداد سهمیه، `AUTH_ERROR` طبقهبندی میکرد.

**پیادهسازی:**

- رجیستری + تطبیقدهنده: `open-sse/config/upstreamStatusRestatement.ts` — فهرستی
  از قواعد بهازای هر ارائهدهنده (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`) که از طریق `applyStatusRestatement()` تطبیق داده میشوند.
- محل فراخوانی: بلوک `providerFailure:` در `open-sse/handlers/chatCore.ts`
  (حدود خط 3654)، درست پس از آنکه `parseUpstreamError()` پاسخ بالادستی دارای
  وضعیت HTTP خطا (`!providerResponse.ok`) را تجزیه میکند، و پیش از اجرای هرگونه
  طبقهبندی؛ بنابراین همه مصرفکنندگان پاییندستی وضعیت اصلاحشده را میبینند.
  خطاهای جاسازیشده در یک جریان SSE با وضعیت `200` از مسیر جداگانه و دیرتری برای
  تجزیه جریان عبور میکنند و امروز تحت پوشش این هوک نیستند — این یک محدودیت شناختهشده
  است که هنوز برای وضعیت نادرست agentrouter لازم نشده است (چون این وضعیت بهصورت
  وضعیت HTTP خطا ظاهر میشود).
- واجدشرایطبودن برای تلاش مجدد: `429` در
  `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`) قرار دارد؛ بنابراین خطای
  بازبیانشده بهجای نمایش یک `403` مرده، پنجره واقعی تلاش مجدد را حمل میکند.
- `defaultRetryAfterMs` مصنوعیِ `60s` (`upstreamStatusRestatement.ts`) فقط همان
  چیزی است که پاسخ بازبیانشده به **کلاینت** اعلام میکند؛ این مقدار بهخودیخود
  مدت خنکسازی/قفل داخلی اتصال نیست — این مدت بهصورت جداگانه توسط سازوکاری
  کنترل میشود که واقعاً خطای بازبیانشده را مدیریت میکند (پسرفت افزایشی
  Connection Cooldown، §2، با مقدار پایه `3s` برای ارائهدهندگان دارای کلید API؛
  یا Model Lockout، §3، برای ارائهدهندگان دارای سهمیه بهازای مدل مانند
  agentrouter). روتر میتواند از نظر داخلی زودتر از پنجره 60 ثانیهای که به کلاینت
  اعلام میکند، واجد شرایط تلاش مجدد شود — این فاصله عمداً در نظر گرفته شده و
  باگ نیست.

خطاهای دائمی (یعنی `无权访问模型` در agentrouter — دسترسی نداشتن به این مدل)
هرگز بازبیان نمیشوند: `excludeMarkers` حتی در صورت تطبیق `textMarkers`، قاعده را
لغو میکند؛ بنابراین خطا وضعیت اصلی خود را حفظ میکند و هیچچیز برای همیشه تلاش
مجدد نمیکند. قاعده طبقهبندی ارائهدهنده متناظر
(`agentrouter-model-access-denied` در `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`، `scope: "model"`، و یک زمان خنکسازی پایه اعلامشده
`6h`) توسط `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_پیش از_ بازگشت زودهنگام عمومیِ دسته apikey برای `FORBIDDEN` بررسی میشود؛ این
بررسی به `honorsRuleLockScope(provider)` وابسته است (#10334 — در حال حاضر فقط
برای agentrouter فعال است و از طریق فهرست مجاز
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` در `providerErrorRules.ts` کنترل میشود).
زمان خنکسازی اعلامشده 6 ساعته قاعده از طریق
`fallbackResult.baseCooldownMs` منتقل میشود، اما همچنان وارد مسیر ازپیشموجود
قفل بهازای سهمیه مدل میشود
(`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`، که #10334 آن را تغییری نداده و فقط منبع زمان
خنکسازی را تغییر داده است): این زمان مانند هر قفل مدل دیگری به
`mlSettings.maxCooldownMs` اپراتور (مقدار پیشفرض
`1_800_000ms` / 30 دقیقه) محدود میشود، و _دلیل قفل پایدارشده_ همان مقدار
سختکدشده ازپیشموجود `"forbidden"` باقی میماند، نه `"auth_error"` قاعده —
فقط مدت زمان خنکسازی از ابتدا تا انتها رعایت میشود، نه رشته دلیل. خود اتصال
فعال باقی میماند؛ مدلهای همتای روی همان اتصال تحتتأثیر قرار نمیگیرند.

خطاهای سهمیه بازبیانشده (`额度不足`) در محیط عملیاتی به یک قاعده ارائهدهنده
میرسند (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`،
`scope: "connection"`، بدون زمان خنکسازی اعلامشده اختصاصی — مقدار پیشفرض
پسرفت مقیاسشده لایه پایدارسازی اعمال میشود). از زمان #10334، مقدار `scope`
در `ProviderErrorRuleMatch` از ابتدا تا انتها مصرف میشود، اما **فقط** برای
ارائهدهندگانی که در فهرست مجاز `HONORS_RULE_LOCK_SCOPE_PROVIDERS` قرار دارند
(`providerErrorRules.ts` — در حال حاضر فقط `"agentrouter"`، و از طریق
`honorsRuleLockScope()` کنترل میشود). برای هر ارائهدهنده دیگری، `scope` دقیقاً
مانند پیش از #10334 صرفاً اطلاعاتی باقی میماند.
`checkFallbackError` دامنه قاعده تطبیقیافته را بهصورت
`fallbackResult.ruleScope` ارائه میکند؛
`isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) نگهبان مشترکی است که تأیید میکند یک
`ruleScope` واقعاً برای استفاده بهعنوان سیگنالی سراسری برای اتصال و قابلبازیابی
خودکار ایمن است (دامنه `"connection"`، دلیل `quota_exhausted`، هرگز
`permanent` و هرگز `creditsExhausted` — حفاظی در برابر جفتشدن احتمالی آینده
دامنه `"connection"` با یک وضعیت دائمی حساب). دو مصرفکننده آن را فراخوانی میکنند:

- **ماندگاری** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  بهجای ورود به شاخهٔ قفلگذاری **بهازای هر مدل** برای ارائهدهندهٔ passthrough (agentrouter دارای `passthroughModels: true` است → `hasPerModelQuota()` مقدار `true` برمیگرداند)، یک **دورهٔ خنکسازی موقت اتصال** اعمال میکند —
  `testStatus: "unavailable"` + `rateLimitedUntil`، و هرگز یک وضعیت نهایی
  (`credits_exhausted`/`banned`/`expired`) تعیین نمیکند — بنابراین اتصال پس از پایان دورهٔ خنکسازی، خودکار بازیابی میشود و نیازی به بازنشانی دستی اعتبارنامه ندارد.
  برای اتصالهایی که `disableCooling: true` دارند (#2997) نادیده گرفته میشود: این گزینهٔ انصراف، بهجای آن به قفلگذاری بهازای هر مدل منتقل میشود (یک مصالحهٔ مستند — به توضیح کد بالای این شاخه مراجعه کنید).
- **مسیریابی ترکیبی در همان درخواست** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): همین نگهبان، اتصال را در مجموعهٔ درونحافظهای `exhaustedConnections` علامتگذاری میکند که کلید آن
  `${provider}:${connectionId}` است. این کار فقط یک هدف باقیماندهٔ SAME-REQUEST را نادیده میگیرد که _خودش از قبل همان `connectionId` دقیق را_ در شیء هدف اختصاصی خود داشته باشد (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`، شرط `if (provider &&
connectionId)` پیش از جستوجوی `exhaustedConnections`) — یک ترکیب سادهٔ فهرستمدل، که در آن اهداف همتا شناسهٔ `connectionId` ثابتشدهٔ اختصاصی خود را ندارند و هر هدف تنها هنگام dispatch از هدر پاسخ
  `X-OmniRoute-Selected-Connection-Id` resolve میشود، هرگز با آن تطبیق کلید مواجه نمیشود. در این حالت رایج، محافظت واقعی در برابر استفادهٔ دوبارهٔ یک leg باقیمانده از حسابی که همین حالا تمامشده، این `Set` نیست — بلکه لایهٔ ماندگاری بالاست (مقدار `rateLimitedUntil` اتصال اکنون در آینده است) که با همین نگهبان ترکیب میشود تا `transientRateLimitedProviders` را برای این شکست سرکوب کند (به بخش «طراحی دومرحلهای» و توضیح کد مربوط به شاخهٔ
  `isAgentrouterConnectionQuotaScope` در `targetExhaustion.ts` مراجعه کنید): با علامتگذارینشدن این `Set`، اجازهدهی اجباری `allowRateLimitedConnection` در `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`، `:2734-2738`) برای legهای باقیماندهٔ ارائهدهنده فعال نمیشود؛ بنابراین فیلتر `rateLimitedUntil` در انتخاب اعتبارنامه (`src/sse/services/auth.ts:1238`) بهطور عادی رعایت میشود و یک leg باقیمانده یا اتصال دیگری از agentrouter را که هنوز واجد شرایط است انتخاب میکند یا با نبود اعتبارنامه شکست میخورد — و خود را به اتصال این شاخه که بهتازگی وارد دورهٔ خنکسازی شده است تحمیل نمیکند.

### طراحی دومرحلهای: بازبیان وضعیت، سپس طبقهبندی

بازبیان وضعیت (`upstreamStatusRestatement.ts`) و قواعد طبقهبندی ارائهدهنده (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) رجیستریهای جداگانهای هستند که هر دو بر اساس شناسهٔ ارائهدهنده و نشانگرهای متنی کلیدگذاری میشوند، اما در مکانهای متفاوتی اجرا شده و اهداف متفاوتی دارند: بازبیان، وضعیت HTTP را در مراحل ابتدایی در `chatCore.ts` بازنویسی میکند؛ قواعد طبقهبندی، `reason` جایگزین را انتخاب کرده و `scope`
(`model` / `provider` / `connection`) را درون `checkFallbackError()` قفل میکنند
(`open-sse/services/accountFallback.ts`).

قواعد طبقهبندی فقط **متن** کامل خطا را میبینند (برای تطبیق نشانگرهای بدنه مانند `额度不足` لازم است) و این امر فقط برای ارائهدهندگانی صدق میکند که در فهرست مجاز `FULL_TEXT_RULE_PROVIDERS` در `providerErrorRules.ts` قرار دارند — در حال حاضر فقط `"agentrouter"`. برای هر ارائهدهندهٔ دیگر در **کاتالوگ داخلی**، `checkFallbackError` فقط خطای ساختاریافته (`{code, type}`) را به `getProviderErrorRuleMatch` میدهد؛ این مقدار برای قواعد مبتنی بر header/status/code کافی است، اما نسبت به نشانگرهای متن بدنه ناآگاه است.
تابع کمکی `resolveRuleMatchBody()` این انتخاب را انجام میدهد: متن کامل خطا برای ارائهدهندگان مجاز، و خطای ساختاریافته برای سایرین. افزودن یک ارائهدهندهٔ **داخلی** به `FULL_TEXT_RULE_PROVIDERS` یک opt-in صریح در سطح هر ارائهدهنده است — این فهرست وجود دارد تا مسیر پیشفرض برای هر ارائهدهندهای که در آن قرار ندارد، بایتبهبایت بدون تغییر باقی بماند.

`scope` یک قاعده (`model` / `provider` / `connection`) از `FULL_TEXT_RULE_PROVIDERS` یک opt-in جداگانه است: `checkFallbackError` فقط آن را بهصورت `fallbackResult.ruleScope` ارائه میکند و مصرفکنندگان پاییندستی فقط برای ارائهدهندگانی که در فهرست مجاز `HONORS_RULE_LOCK_SCOPE_PROVIDERS` در همان فایل قرار دارند، آن را بهعنوان چیزی فراتر از یک برچسب اطلاعاتی رعایت میکنند (از طریق `honorsRuleLockScope()` کنترل میشود — امروزه فقط `"agentrouter"`). برای اطلاع از کاری که تطبیق `scope: "connection"` پس از قرارگرفتن ارائهدهنده در آن فهرست مجاز انجام میدهد، به بخش «خطاهای سهمیهٔ بازبیانشده» در بالا مراجعه کنید.

**#11104 — قواعد اعلامشده توسط اپراتور هر دو فهرست مجاز را دور میزنند.** اپراتور میتواند در زمان اجرا از طریق `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) یک قاعدهٔ ارائهدهنده را اعلام کند، بدون آنکه این فایل را ویرایش کند. قرار دادن قاعدهٔ اپراتور پشت `FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — فهرستهایی که برای محافظت از رفتار **پیشفرض** قواعد ارائهدهندگان داخلی کاتالوگ طراحی شدهاند — سازوکار تنظیمات را برای هر ارائهدهندهای بهجز مواردی که از قبل در این فهرستها هستند، بیاثر میکند؛ زیرا اعلام قاعده خود opt-in صریح اپراتور است. هر دو تابع `resolveRuleMatchBody()` و `honorsRuleLockScope()` ابتدا `hasOperatorRuleForProvider()` را بررسی میکنند: ارائهدهندهای که قاعدهٔ اپراتور دارد، متن خام خطا را دریافت کرده و `scope` اعلامشدهٔ آن رعایت میشود، صرفنظر از اینکه در هر یک از فهرستهای مجاز نیز قرار داشته باشد یا نه.

**قواعد اعلامشده توسط اپراتور** (`OperatorProviderErrorRule`): هر قاعده یک `status` اختیاری و یک `match` اختیاری دارد (`match` یک زیررشتهٔ ساده و بدون حساسیت به بزرگی/کوچکی حروف از متن خطا است و هرگز RegExp نیست، بنابراین نمیتواند باعث ReDoS شود) و باید دستکم یکی از این دو را تعیین کند. اگر هر دو تعیین شده باشند، با عملگر AND ترکیب میشوند؛ فیلد حذفشده با هر چیزی تطبیق میکند، بنابراین `{match: "insufficient_quota"}` با هر وضعیتی که آن کد را داشته باشد تطبیق میکند. نخستین قاعدهٔ منطبق برنده است. `cooldownMs` حداکثر تا ۳۰ روز را میپذیرد؛ در مجموع حداکثر ۵۰ قاعده مجاز است.

**پیشفرضهای فراگیر** (`settings.providerErrorDefaults`، اختیاری، تنظیمشده از طریق
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
با `cooldownMs` از ۱ دقیقه تا ۳۰ روز. یک پیشفرض فقط زمانی اعمال میشود که هیچ قانون اپراتور و هیچ قانون کاتالوگ داخلی منطبق نشده باشد، و فقط برای خطاهای 402، 403، 408، 429 و 5xx. خطاهای شکل درخواست (400، 404، 409، 413، 422) و 401های بدون جزئیات، همچنان پردازش اختصاصی خود را دارند. اگر `reason` بهصورت صریح تعیین نشده باشد، دلیل از وضعیت استخراج میشود؛ همانطور که `classifyError` این کار را انجام میدهد. تعریف یک پیشفرض برای `hasOperatorRuleForProvider()` بهعنوان یک قانون اپراتور محسوب میشود؛ بنابراین `scope` آن (پیشفرض `"connection"`) رعایت میشود. مهلت مؤثر یک پیشفرض، مقدار طولانیتر بین `cooldownMs` آن و راهنمای تلاش مجدد خود ارائهدهنده است (`Retry-After`، `x-ratelimit-reset` یا راهنمای بازنشانی در بدنه؛ همان راهنمایی که موتور هنگام فعال بودن تنظیم مهلت اتصال "use upstream retry hints" رعایت میکند). بنابراین یک پیشفرض میتواند یک راهنمای کوتاه بالادستی را طولانیتر کند، اما هرگز یک زمان بازنشانی واقعی را کوتاه نمیکند. یک قانون صریح اپراتور، دقیقاً `cooldownMs` تعیینشده خودش را حفظ میکند. نه یک قانون و نه یک پیشفرض، محافظهای مهلت اتصال در `markAccountUnavailable` را دور نمیزنند: یک مهلت فعال و طولانیتر هرگز کوتاه نمیشود و یک وضعیت پایانی هرگز بازنویسی نمیشود. آشکارسازهای متنی داخلی که زودتر در `checkFallbackError` اجرا میشوند (تمامشدن اعتبار، سهمیه روزانه، غیرفعالشدن حساب) همچنان برای عبارتهای اختصاصی خود اولویت دارند.

**شکاف شناختهشده — `providerRuleRegistry` هرگز برای HTTP 400 بررسی نمیشود.**
شاخه `BAD_REQUEST` در `checkFallbackError` وضعیت 400 را کاملاً از طریق آرایههای الگوی خودش (`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` و غیره در `accountFallback.ts`) طبقهبندی میکند و پیش از رسیدن به شاخه `configuredRule`/`getProviderErrorRuleMatch` در بالا بازمیگردد.
یک قانون کاتالوگ داخلی (یا قانون اپراتور) با `status: 400` از نظر نحوی معتبر است، اما هرگز اجرا نخواهد شد. امروزه هیچ قانون موجودی 400 را هدف نمیگیرد، بنابراین چیزی در محیط عملیاتی تحتتأثیر قرار نمیگیرد — اما یک قانون 400 در آینده ابتدا به تغییر این شاخه نیاز دارد؛ تغییری که بزرگتر از افزودن یک قانون است (زیرا طبقهبندی 400 را برای هر ارائهدهندهای که هماکنون به رفتار آرایه الگو متکی است، تغییر میدهد) و برای افزودن قانون یک ارائهدهنده در نظر گرفته نشده است.

### افزودن یک درگاه که سهمیه را نادرست گزارش میکند

1. یک آرایه قانون را در `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`) ثبت کنید. `textMarkers`
   را اختصاصی ارائهدهنده نگه دارید؛ هرگز عبارتهای عمومی انگلیسی را که با
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`) تداخل دارند، دوباره استفاده نکنید.
2. در صورت نیاز، قوانین طبقهبندی را در
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) ثبت کنید تا دامنه قفل مناسب انتخاب شود (`connection` برای سهمیه در سطح حساب، `model` برای خطاهای هر مدل). این مرحله در محیط عملیاتی فقط برای ارائهدهندگانی اثر دارد که قوانینشان به متن کامل خطا (نشانگرهای بدنه) نیاز دارند: شناسه ارائهدهنده را در `FULL_TEXT_RULE_PROVIDERS` در همان فایل اضافه کنید — در غیر این صورت، `checkFallbackError` فقط خطای ساختیافته
   `{code, type}` را به قانون میدهد و یک قانون مبتنی بر متن بدنه هرگز در ترافیک واقعی منطبق نخواهد شد.
   قوانینی که صرفاً بر اساس `status`/`headers` منطبق میشوند (مانند قوانین Opencode یا Minimax) به این فعالسازی اختیاری نیاز ندارند. جدا از این، اگر قانون `scope: "connection"` را اعلام میکند و هدف، یک مهلت واقعی در سطح اتصال بهعلاوه رد ترکیب در همان درخواست است (نه فقط یک برچسب اطلاعرسانی)، شناسه ارائهدهنده را در `HONORS_RULE_LOCK_SCOPE_PROVIDERS` در همان فایل اضافه کنید — این همان چیزی است که مصرف به سبک `isAgentrouterConnectionQuotaScope()` را در `markAccountUnavailable()`
   (`src/sse/services/auth.ts`) و
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) کنترل میکند؛ بدون آن، `scope`
   همچنان از طریق `fallbackResult.ruleScope` منتقل میشود، اما هیچ اقدامی بر اساس آن انجام نخواهد شد.
3. تستهای واحدی مطابق با
   `tests/unit/upstream-status-restatement.test.ts`
   و `tests/unit/agentrouter-error-rules.test.ts` اضافه کنید (از جمله محافظهای
   not-permanent / not-creditsExhausted، و — اگر ارائهدهنده به فهرست مجاز نیاز دارد —
   تستی که تأیید کند `resolveRuleMatchBody()` فقط برای آن ارائهدهنده متن کامل را برمیگرداند).

هیچ تغییری در `chatCore.ts`، `classifyError` یا combo لازم نیست.

#### قفل دستهبندیشده بر اساس خروجی (#10880)

ارائهدهندگان موجود در `EGRESS_BUCKETED_LOCK_PROVIDERS` (خانواده opencode) بهعنوان بالادستیِ دستهبندیشده بر اساس IP در نظر گرفته میشوند (سطح رایگان opencode بر اساس IP دستهبندی میشود، نه بر اساس حساب — به #9611 مراجعه کنید): وضعیت-429 که بهصورت `quota_exhausted`
**یا** `rate_limit_exceeded` طبقهبندی شده باشد، پیش از آنکه چرخش بتواند اتصالها را امتحان کند، هر اتصال از خانواده فهرستمجاز را که آخرین IP خروجی شناختهشدهاش با IP اتصال ناموفق یکسان است، وارد مهلت میکند
— و از فراخوانیهای بالادستی تضمیناً ناموفقِ N-1 جلوگیری میکند (با همان الگوی #10460/#10525).
`rate_limit_exceeded` عمداً گنجانده شده است: در مسیر `markAccountUnavailable`، قوانین اختصاصی opencode هرگز منطبق نمیشوند (هیچ هدر/بدنهای به `checkFallbackError` داده نمیشود و opencode در `FULL_TEXT_RULE_PROVIDERS` نیست)، بنابراین یک 429 که بدنهاش متن سهمیه اشتراک («monthly usage limit
reached») را دارد، پیش از رسیدن به قانون `status_429`، توسط بازگشت متنی سهمیه
(`buildSubscriptionQuotaFallback`، `accountFallback.ts`؛ مهلت ۱ ساعته) بهصورت
`quota_exhausted` طبقهبندی میشود — در حالی که یک 429 فاقد متن سهمیه (محدودسازی نرخ ساده) از طریق قانون `status_429` بهصورت `rate_limit_exceeded` طبقهبندی میشود و همچنان خانواده IP را وارد مهلت میکند. برای ارائهدهندهای که در فهرست مجاز قرار دارد، محدودیت نرخ مبتنی بر IP همان سیگنال سهمیه تمامشده است. محدودیتهای واقعی:

- **بهترین تلاش**: قفل، `egress_ip` شناختهشدهٔ اخیر اتصال را از `proxy_logs` حل میکند (پنجرهٔ ۲۴ساعته، همگام، بدون کش). کش سرد (هرگز برای IP خروجی کاوشی انجام نشده) یا نبود ردیف → اتصال خطاداده همچنان توسط شاخه وارد دورهٔ سردشدن میشود (مانند امروز ثبت میشود)، اما هیچ اتصال همخانوادهای قفل نمیشود.
- **هرگز نهایی نیست**: دورهٔ سردشدن یک پنجرهٔ سهمیهای تمدیدشونده است
  (`testStatus: "unavailable"`)، و هرگز وضعیت دائمی از یک سیگنال در سطح IP
  استخراج نمیشود. اتصالهای `disableCooling` این شاخه را بهطور کامل رد میکنند.
- **تغییر دانهبندی قفل برای خانوادهٔ فهرستمجاز**: این یک تغییر دامنه است، نه صرفاً بهینهسازی اتصالهای همخانواده. opencode یک ارائهدهندهٔ `passthroughModels` است، بنابراین پیش از این شاخه، یک 429 باعث قفلشدن جداگانهٔ هر MODEL میشد؛ اکنون باعث دورهٔ سردشدن اتصال میشود — حتی برای اپراتوری که تنها یک اتصال و هیچ اتصال همخانوادهای ندارد. این همان دانهبندیای است که جدول قوانین opencode از قبل آن را صحیح اعلام میکند (`scope: "connection"`،
  `providerErrorRules.ts`)؛ اما تاکنون هرگز رعایت نشده بود، چون opencode در
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` قرار ندارد. این شاخه دورهٔ سردشدن اتصال خطاداده و `backoffLevel` آن را خودش مینویسد، مشابه شاخهٔ connection-scoped برای agentrouter، و بازمیگردد — بنابراین بلوک هر مدل و مسیر عمومی زیر هرگز اجرا نمیشوند.
- **ترکیب نیز شامل میشود**: مانند شاخهٔ agentrouter، این دامنه عمداً تنزل `persistUnavailableState`/`isCombo` را که یک فراخوان ترکیبی برای 429 اعمال میکند، نادیده میگیرد. قفلشدن هر مدل شکل ضعیفتری از این دامنه نیست؛ بلکه واحد اشتباهی است: دربارهٔ IP تمامشده چیزی نمیگوید، بنابراین چرخش ترکیبی همچنان برای هر اتصال همخانواده یک فراخوانی تضمیناً ناموفق را مصرف خواهد کرد.
- **ایمنی اتصال همخانواده**: اتصال همخانوادهای که از قبل نهایی است (banned/credits_exhausted) یا از قبل در دورهٔ سردشدن طولانیتری قرار دارد، هرگز بازنویسی نمیشود.
- **فهرستمجاز انحصاری**: گسترش `EGRESS_BUCKETED_LOCK_PROVIDERS` یک تصمیم صریح مالک است؛ هیچ اتصال عمومیای انجام نمیشود (الگوی #10334/#10419). کوئری اتصالهای همخانواده به همان فهرستمجاز متصل میشود، بهجای اینکه آن را بهصورت یک مقدار ثابت SQL تکرار کند؛ بنابراین گسترش آن همچنان تغییری یکخطی باقی میماند.
- **چرخش IP خروجی، در هر دو جهت**: پنجرهٔ جستوجو (۲۴ ساعت) بسیار گستردهتر از TTL کش IP خروجی (۵ دقیقه) است، بنابراین «آخرین IP شناختهشده» تاریخچه است، نه وضعیت فعلی. اگر پروکسی یک اتصال در طول این پنجره چرخیده باشد، قفل ممکن است یک IP واقعاً مشترک را **از دست بدهد** (IP ثبتشده همان IP جدید و تمامنشده است) — و بهطور متقارن ممکن است اتصال همخانوادهای را که از آن زمان از IP تمامشده **چرخیده و دور شده است**، وارد دورهٔ سردشدن کند. حالت دوم برای آن اتصال یک پنجرهٔ سردشدن هزینه دارد؛ هر دو مورد بهعنوان محدودیتهای پذیرفتهشدهٔ بهترین تلاش در جستوجوی مبتنی بر تاریخچه پذیرفته میشوند.
- **هزینه**: دو پیمایش محدودشده در `proxy_logs` (با فیلتر پنجره از طریق `idx_pl_timestamp`)، تنها با بسامد 429. هیچ ایندکس جدیدی لازم نیست (مهاجرت 134، YAGNI). اندازهگیری روی یک کپی از پایگاهدادهٔ ترافیک واقعی با اندازهٔ متوسط انجام شده است؛ یک نمونهٔ پرترافیک، در همان پنجره، بهتناسب ردیفهای بیشتری نگه میدارد.

## سایر قابلیتهای تابآوری

- **20 استراتژی مسیریابی** (priority، weighted، round-robin، context-relay، fill-first، p2c، random، least-used، cost-optimized، reset-aware، reset-window، headroom، quota-weighted، strict-random، auto، lkgp، context-optimized، cache-optimized، fusion، pipeline) — به [AUTO-COMBO.md](../routing/AUTO-COMBO.md) مراجعه کنید.
- **مسیریابی آگاه از ریست** (v3.8.0) — اتصالها را بر اساس زمان ریست سهمیه اولویتبندی میکند.
- **تنزل حالت پسزمینه** — در Responses API گزینهی `background: true` همراه با هشدار به حالت همگام (sync) تنزل مییابد.
- **تشخیص پویاي محدودیت ابزار** — وقتی به محدودیت تعداد ابزارها میرسد، از ارائهدهندگان عقبنشینی (back off) میکند.
- **جایگزین اضطراری** — توسط `OMNIROUTE_EMERGENCY_FALLBACK` کنترل میشود؛ اپراتورها میتوانند بدون راهاندازی مجدد، آن را از صفحهی Feature Flags بازنویسی کنند.

---

## اشکالزدایی

- کامبوی وزندار پاسخ `503 all_targets_cooling_down` میدهد (با `Retry-After` تنظیمشده، و `diagnostics.excluded` که همهی اهداف را با `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` فهرست میکند) ← مخزن پیکربندی و متصل شده است، فقط همهی اهداف توسط یک تایمر تابآوری مستثنا شدهاند؛ هشدار `[COMBO] Weighted selection: every target excluded before dispatch — …` دلایل و ثانیههای باقیمانده را ذکر میکند. پاسخ `404 no_executable_targets` از همان کامبو به این معناست که هیچ تایمر تابآوری دخیل نبوده است (چیزی برای اجرا وجود ندارد، یا همهی حسابها در آزمون دسترسپذیری شکست خوردهاند). ساختهشده در `open-sse/services/combo/pinRecovery.ts` بر اساس استثناهای جمعآوریشده در `targetResolution.ts`.
- همهی کلیدهای یک ارائهدهنده نادیده گرفته شدهاند ← هم وضعیت قطعکن مدار (circuit breaker) و هم `rateLimitedUntil`/`testStatus` هر اتصال را بررسی کنید.
- ارائهدهنده پس از پنجرهی ریست بهطور دائم مستثنا شده ← کدی که بهجای `getStatus()`/`canExecute()` مقدار خام `state` را میخواند.
- یک کلید شکست میخورد، بقیه باید کار کنند ← کولداون اتصال را بر قطعکن مدار ترجیح دهید.
- فقط یک مدل شکست میخورد ← قفل مدل (model lockout) را بر کولداون اتصال ترجیح دهید.
- وضعیت باید خودبهخود بازیابی شود اما نمیشود ← وجود مُهر زمانی در آینده و مسیر خواندنی که وضعیت منقضیشده را تازه میکند را بررسی کنید. وضعیتهای دائمی نیازمند تغییر دستی هستند.

---

## وضعیت زمان اجرا — مرجع سریع ایجنت

> بهصورت تحتاللفظی از `AGENTS.md` ← بخش «Resilience Runtime State» منتقل شده است (PR #12743) تا
> راهنمای ایجنت زیر سقف بودجهی 40k کانتکست باقی بماند. این نمای فشرده و روبهروی ایجنت از
> بخشهای بالاست؛ بخشهای شمارهدار همچنان مرجع کامل باقی میمانند.

OmniRoute سه مکانیزم مرتبط اما متمایز برای خطاهای موقت دارد. هنگام اشکالزدایی رفتار مسیریابی،
دامنهی آنها را از یکدیگر جدا نگه دارید. برای نقشهی یکنگر،
[نمودار تابآوری ۳ لایه](../diagrams/exported/resilience-3layers.svg)
(منبع: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
را ببینید.

### قطعکن مدار ارائهدهنده (Provider Circuit Breaker)

**دامنه**: کل ارائهدهنده، مثلاً `glm`، `openai`، `anthropic`.

**هدف**: توقف ارسال ترافیک به ارائهدهندهای که در سطح آپاستریم/سرویس مرتباً در حال شکست است، تا یک ارائهدهندهی ناسالم همهی درخواستها را کند نکند.

**پیادهسازی**:

- کلاس اصلی: `src/shared/utils/circuitBreaker.ts`
- سیمبندی گیت/اجرای چت: `src/sse/handlers/chatHelpers.ts`، `src/sse/handlers/chat.ts`
- API وضعیت زمان اجرا: `src/app/api/monitoring/health/route.ts`
- پوششهای مشترک: `open-sse/services/accountFallback.ts`
- جدول وضعیت پایدار: `domain_circuit_breakers`

**وضعیتها** (4 مورد — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: ترافیک عادی مجاز است.
- `DEGRADED`: باند هشدار زودهنگام — خطاها از آستانهی تنزل عبور کردهاند اما هنوز به آستانهی قطعکن نرسیدهاند؛ ترافیک همچنان جریان دارد، داشبوردها هشدار را نشان میدهند. یک تست اتصال معتبر یا یک پنجرهی آرام بدون خطای جدید، آن را به `CLOSED` بازمیگرداند
  (پنجره در `docs/architecture/RESILIENCE_GUIDE.md` آمده است).
- `OPEN`: ارائهدهنده بهطور موقت مسدود است؛ فراخوانندهها پاسخ provider-circuit-open دریافت میکنند
  یا مسیریابی کامبو به هدف دیگری پرش میکند.
- `HALF_OPEN`: مهلت ریست سپری شده است؛ اجازهی یک درخواست کاوش (probe) داده میشود. موفقیت، قطعکن را میبندد و شکست، آن را دوباره باز میکند.

**پیشفرضها** (`open-sse/config/constants.ts` ← `PROVIDER_PROFILES`، که از طریق
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` در `src/lib/resilience/settings.ts` ←
`getCircuitBreaker(provider, …)` در `src/sse/handlers/chatHelpers.ts` مصرف میشود). قطعکن کل-ارائهدهنده روی `circuitBreakerThreshold` / `circuitBreakerReset` اجرا میشود:

| پروفایل |   تنزل در | باز شدن در (`circuitBreakerThreshold`) | ریست (`circuitBreakerReset`) |
| ------- | --------: | -------------------------------------: | ---------------------------: |
| OAuth   |       `5` |                                    `8` |                        `60s` |
| API key |       `7` |                                   `12` |                        `30s` |
| Local   | (مشتقشده) |                                    `2` |                        `15s` |

`PROVIDER_PROFILES` همچنین `providerFailureThreshold` (10/15/2)،
`providerFailureWindowMs` (15/30/5 دقیقه) و `providerCooldownMs` (5/10/1 دقیقه) را تعریف میکند: اینها موتور
**گیت پنجرهی Provider Cooldown سراسری اختیاری** (`PROVIDER_COOLDOWN_ENABLED`، پیشفرض خاموش) هستند — یک ورودی در سطح ارائهدهنده در `open-sse/services/providerCooldownTracker.ts` تنها پس از `providerFailureThreshold` خطا درون `providerFailureWindowMs` بهعنوان در حال کولداون محسوب میشود و سپس به مدت `providerCooldownMs` سرد میشود. اینها آستانههای قطعکن فعال نیستند — آنها را با انتظار رفتار قطعکن تنظیم نکنید. هر پیشفرضی از طریق
متغیرهای محیطی `OMNIROUTE_PROVIDER_BREAKER_*` و `OMNIROUTE_CIRCUIT_BREAKER_*` قابل بازنویسی است؛ جدول
مرجع دقیقِ زمان اجرا در `docs/architecture/RESILIENCE_GUIDE.md` قرار دارد.

فقط وضعیتهای خطا در سطح ارائهدهنده باید قطعکن ارائهدهنده را فعال کنند:

```ts
(408, 500, 502, 503, 504);
```

قطعکن کل-ارائهدهنده را برای خطاهای عادی حساب/کلید/مدل مانند بیشتر
موارد `401`، `403` یا `429` فعال نکنید. آنها معمولاً متعلق به کولداون اتصال یا قفل
مدل هستند. یک `403` عمومی از ارائهدهندهی API key باید قابل بازیابی باشد، مگر اینکه
بهعنوان خطای نهایی ارائهدهنده/حساب طبقهبندی شده باشد.

بریکر از بازیابی تنبل (lazy) استفاده میکند، نه تایمر پسزمینه. وقتی `OPEN` منقضی میشود،
خواندنهایی مانند `getStatus()`، `canExecute()` و `getRetryAfterMs()` وضعیت را به
`HALF_OPEN` تازهسازی میکنند، بنابراین داشبوردها و سازندگان نامزد ترکیبی (combo) یک
ارائهدهنده منقضیشده را تا ابد حذف نمیکنند.

### کولداون اتصال

**دامنه**: یک اتصال/حساب/کلید ارائهدهنده.

**هدف**: رد کردن موقت یک کلید/حساب معیوب، در حالی که به اتصالهای دیگر همان
ارائهدهنده اجازه داده میشود به سرویسدهی به درخواستها ادامه دهند.

**پیادهسازی**:

- مسیر نوشتن/بهروزرسانی: `src/sse/services/auth.ts::markAccountUnavailable()`
- انتخاب/فیلتر کردن حساب: `src/sse/services/auth.ts::getProviderCredentials...`
- محاسبه کولداون: `open-sse/services/accountFallback.ts::checkFallbackError()`
- تنظیمات: `src/lib/resilience/settings.ts`

فیلدهای مهم روی اتصالهای ارائهدهنده:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

در حین انتخاب حساب، یک اتصال تا زمانی که شرط زیر برقرار باشد رد میشود:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

کولداونها نیز تنبل هستند: وقتی `rateLimitedUntil` در گذشته قرار گیرد، اتصال دوباره
واجد شرایط میشود. پس از استفاده موفق، `clearAccountError()` فیلدهای `testStatus`،
`rateLimitedUntil`، فیلدهای خطا و `backoffLevel` را پاک میکند.

رفتار پیشفرض کولداون اتصال:

- کولداون پایه OAuth: `5s`.
- کولداون پایه کلید API: `3s`.
- برای خطای `429` در کلید API باید در صورت وجود، راهنماییهای تلاش مجدد سمت بالادست
  (`Retry-After`، هدرهای ریست، یا متن ریست قابل تجزیه) ترجیح داده شوند.
- خطاهای تکراری قابل بازیابی از عقبنشینی نمایی استفاده میکنند:

```ts
baseCooldownMs * 2 ** failureIndex;
```

محافظ ضد هجوم گلهای (thundering herd) جلوگیری میکند از اینکه خطاهای همزمان روی یک
اتصال بهطور مکرر کولداون را تمدید کنند یا `backoffLevel` را دو بار افزایش دهند.

وضعیتهای پایانی (terminal) کولداون نیستند. `banned`، `expired` (که تنها پس از N
تلاش مجدد محدود از طریق `EXPIRED_RETRY_MAX` به وضعیت پایانی تبدیل میشود) و
`credits_exhausted` قرار است تا زمانی که اعتبارنامهها/تنظیمات تغییر کنند یا یک
اپراتور آنها را بازنشانی کند، غیرقابل دسترس بمانند. وضعیتهای پایانی را با وضعیت
کولداون گذرا بازنویسی نکنید.

### قفل مدل

**دامنه**: ارائهدهنده + اتصال + مدل.

**هدف**: جلوگیری از غیرفعال شدن کل یک اتصال وقتی فقط یک مدل برای آن اتصال غیرقابل
دسترس یا محدودشده بر اساس سهمیه است.

مثالها:

- ارائهدهندگانی با سهمیه بهازای هر مدل که `429` برمیگردانند.
- ارائهدهندگان محلی که برای یک مدل گمشده `404` برمیگردانند.
- خطاهای مجوز حالت/مدل مخصوص ارائهدهنده، مانند حالتهای منتخب Grok.

قفل مدل در `open-sse/services/accountFallback.ts` قرار دارد و به همان اتصال اجازه
میدهد به سرویسدهی به مدلهای دیگر ادامه دهد.

### راهنمای اشکالزدایی

- اگر همه کلیدهای یک ارائهدهنده رد میشوند، هم وضعیت بریکر ارائهدهنده و هم
  `rateLimitedUntil`/`testStatus` هر اتصال را بررسی کنید.
- اگر یک ارائهدهنده پس از پنجره بازنشانی بهصورت دائمی حذف شده به نظر میرسد، بررسی
  کنید که آیا کد بهجای استفاده از `getStatus()`/`canExecute()` مقدار خام `state` را
  میخواند یا نه.
- اگر یک کلید ارائهدهنده با خطا مواجه میشود اما بقیه باید کار کنند، کولداون اتصال
  را بر بریکر ارائهدهنده ترجیح دهید.
- اگر فقط یک مدل با خطا مواجه میشود، قفل مدل را بر کولداون اتصال ترجیح دهید.
- اگر یک وضعیت باید خودبهخود بازیابی شود، باید یک مهر زمانی آینده/مهلت بازنشانی و یک
  مسیر خواندن داشته باشد که وضعیت منقضیشده را تازهسازی کند. وضعیتهای دائمی به
  تغییرات دستی در اعتبارنامه یا پیکربندی نیاز دارند.

---

## اثر انگشت TLS و پنهانکاری

پنهانکاری مختص ارائهدهنده (JA3/JA4، CCH، مبهمسازی) بهطور جداگانه مستند شده است — به `docs/security/STEALTH_GUIDE.md` مراجعه کنید (در git؛ در `/docs` کامپایل نشده است).

---

## تست تابآوری (فاز ۸ · بلوک C)

فراتر از تستهای واحد برای منطق تابآوری، سه تست، زمان اجرا را تحت شرایط واقعی فشار/خرابی میسنجند (همه یکپارچهسازی/nightly — هیچکدام PRها را مسدود نمیکنند):

| تست         | چه چیزی                                                                                                                                                                                               | اجرا                                     |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | گره upstream ساختگی، تأخیر/ریست/تایماوت/503 واقعی را تزریق میکند؛ اعتبارسنجی میکند که circuit breaker باز/بازیابی میشود و `checkFallbackError` کد 503 را بهعنوان fallback قابلبازیابی طبقهبندی میکند. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | حدود ۵۰۰ استریم برای هر `createSSEStream` تحت `--expose-gc`؛ در صورت رشد heap فراتر از سقف شکست میخورد (محافظ OOM #3069).                                                                             | `npm run test:heap`                      |
| k6 soak     | بار پیوسته در برابر `/api/monitoring/health`؛ آستانههای p95/خطا.                                                                                                                                      | `k6 run tests/load/k6-soak.js` (nightly) |

توسط `.github/workflows/nightly-resilience.yml` هماهنگ میشود (cron + dispatch). در
`test:integration` پیشفرض، chaos و heap خودبهخود رد میشوند (بدون `RUN_CHAOS_INT`/`--expose-gc`).

---

## همچنین ببینید

- [راهنمای معماری](./ARCHITECTURE.md) — معماری سیستم و اجزای داخلی
- [راهنمای کاربر](../guides/USER_GUIDE.md) — ارائهدهندگان، ترکیبها، یکپارچهسازی CLI
- [موتور Auto-Combo](../routing/AUTO-COMBO.md) — امتیازدهی ۱۶عاملی، بستههای حالت
