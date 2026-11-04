# Resilience Guide (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

لدى OmniRoute ثلاث آليات مرونة متميزة ولكنها مرتبطة ببعضها البعض. ولكل منها نطاق وغرض مختلف. احتفظ بها منفصلة عند تصحيح سلوك التوجيه.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> المصدر: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **أسبقية Env-vs-dashboard لتبديل المرونة.** تقوم خاصية تبديل مرونة الاشتراك المصنفة من البيئة — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — بتوفير _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). استمرت القيمة المنطقية في `resilienceSettings` (Dashboard →** إعدادات مرونة →** / `PATCH /api/resilience`، المخزن في `key_value`) يفوز على قيمة env: التطبيع (`toBoolean`، `src/lib/resilience/settings/normalize.ts`) يحافظ على القيمة المنطقية المخزنة كلما وجدت. تعيين مثل env var على `true` عند النشر حيث قامت لوحة المعلومات بحفظ `false` بالفعل، وبالتالي لا يغير شيئًا — اقلب مفتاح التبديل للداخل** إعدادات مرونة →** (أو امسح الحقل المخزن) بدلاً من ذلك.

## 1. قاطع دائرة المزوّد (Provider Circuit Breaker)

**النطاق:** المزوّد بأكمله (مثل `glm`، `openai`، `anthropic`).

**الغرض:** إيقاف إرسال الحركة إلى مزوّد يفشل بشكل متكرر على مستوى المنبع/الخدمة.

**التنفيذ:**

- الفئة الأساسية: `src/shared/utils/circuitBreaker.ts`
- الربط: `src/sse/handlers/chatHelpers.ts`، `src/sse/handlers/chat.ts`
- واجهة برمجة التطبيقات للحالة: `GET /api/monitoring/health`
- واجهة برمجة التطبيقات لإعادة التعيين: `POST /api/resilience/reset`
- الأغلفة: `open-sse/services/accountFallback.ts`
- جدول قاعدة البيانات: `domain_circuit_breakers`

**الحالات:**

- `CLOSED` — يُسمح بالحركة بشكل طبيعي
- `DEGRADED` — لا تزال الحركة مسموحًا بها، لكن تتم متابعة الإخفاقات المتصاعدة للمزوّد؛ وتعود إلى `CLOSED` عند تحقيق عدد كافٍ من النجاحات، أو عند اجتياز اختبار اتصال صالح، أو بعد مرور أطول مدة بقاء في حالة `OPEN` لآخر نوع من الإخفاق (قيمة `cooldownByKind` الخاصة به، وإلا `resetTimeout`، مضروبة × `maxBackoffMultiplier`، وبحد أدنى فترة تبريد واحدة) دون حدوث إخفاق جديد
- `OPEN` — المزوّد محظور مؤقتًا؛ يتخطاه التوجيه المركّب (combo)
- `HALF_OPEN` — انقضت مهلة إعادة التعيين؛ يُسمح بطلب استقصائي

**الإعدادات الافتراضية القابلة للتكوين (`open-sse/config/constants.ts`، معروضة في لوحة التحكم → الإعدادات → المرونة):**

| الفئة   | تتدهور عند | تنفتح عند  | مهلة إعادة التعيين |
| ------- | ---------- | ---------- | ------------------ |
| OAuth   | 5 إخفاقات  | 8 إخفاقات  | 60s                |
| API-key | 7 إخفاقات  | 12 إخفاقًا | 30s                |
| Local   | مشتقة      | إخفاقان    | 15s                |

يتحكم `degradationThreshold` في متى يدخل المزوّد حالة `DEGRADED`؛ بينما يتحكم `failureThreshold` في متى ينفتح ويتم تخطيه. ملفات تعريف المزوّدات المحلية (Local) غير معروضة بعد في صفحة إعدادات المرونة.

**رموز التفعيل:** فقط رموز الحالة على مستوى المزوّد `[408, 500, 502, 503, 504]`. لا يتم التفعيل لأخطاء مستوى الحساب (معظم 401/403/429 — فتلك تخص فترة التبريد أو القفل).

**التعافي الكسول:** عندما تنتهي صلاحية `OPEN`، تقوم `getStatus()` و`canExecute()` و`getRetryAfterMs()` بتحديث الحالة إلى `HALF_OPEN`. وتؤدي عمليات القراءة نفسها (والإخفاق التالي) إلى تحلّل حالة `DEGRADED` القديمة وعودتها إلى `CLOSED`. لا حاجة إلى مؤقّت يعمل في الخلفية.

---

### تبريد المزوّد العام الاختياري (بوابة النافذة الزمنية)

تحتفظ طبقة رابعة **اختيارية (opt-in)** (`PROVIDER_COOLDOWN_ENABLED`، الافتراضي **معطّل**) بذاكرة عابرة للطلبات عن المزوّدات الفاشلة في `open-sse/services/providerCooldownTracker.ts`، ويستشيرها حلّ أهداف combo بحيث تتوقف طلبات combo المتتالية عن إعادة المرور على مزوّد فشل للتوّ. تحترم الإدخالات على مستوى المزوّد بوابة النافذة الزمنية في `PROVIDER_PROFILES`:

| الملف التعريفي | يُفعَّل بعد (`providerFailureThreshold`) | خلال (`providerFailureWindowMs`) | يُبرَّد لمدة (`providerCooldownMs`) |
| -------------- | ---------------------------------------: | -------------------------------: | ----------------------------------: |
| OAuth          |                                     `10` |                          `15min` |                              `5min` |
| API key        |                                     `15` |                          `30min` |                             `10min` |

تحت العتبة، **لا** يُعتبر المزوّد في حالة تبريد؛ ويمحو النجاحُ النافذةَ الزمنية. أما الإدخالات على مستوى الاتصال (`provider:connectionId`) فتحتفظ بدلاً من ذلك بالتراجع الأُسّي `minRetryCooldownMs → maxRetryCooldownMs`. التجاوزات: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. حارس الانحدار: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. فترة تهدئة الاتصال

**نِطَاق:** مزود واحد connection/account/key.

**غاية:** تخطي مفتاحًا سيئًا بينما تستمر الاتصالات الأخرى لنفس المزود في الخدمة.

**تطبيق:**

- وضع علامة غير متاح: `src/sse/services/auth.ts::markAccountUnavailable()`
- التحديد: `getProviderCredentials*` في نفس الملف
- حساب فترة التهدئة: `open-sse/services/accountFallback.ts::checkFallbackError()`
- الإعدادات: `src/lib/resilience/settings.ts`

**الحقول لكل اتصال:**

- `rateLimitedUntil` — الطابع الزمني حتى انتهاء فترة التهدئة
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — عداد التراجع الأسي

**فترات التهدئة الافتراضية:**

- قاعدة OAuth : 5S
- قاعدة مفاتيح API: 3s
- مفتاح API 429: يفضل نص إعادة تعيين `Retry-After`/reset headers/parseable
- التراجع: `baseCooldownMs * 2 ** failureIndex`

**تأخير إعادة المحاولة لكل موفر.** تحتوي صفحة تفاصيل الموفر على** إعادة محاولة التأخير** حدد (تلقائي، 15 ثانية حتى 1 ساعة). يحفظ `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600، من خلال `PATCH /api/resilience`). عندما لا يحمل خطأ حد المعدل أي تلميح لإعادة المحاولة الأولية، تحل هذه القيمة محل التراجع المقاس للموفر وتعيد تعيين `backoffLevel` إلى 0 (`open-sse/services/rotationConfig.ts::overrideFor`). الأسبقية للخطأ محدود المعدل، الأعلى أولاً: تلميح إعادة المحاولة الأولية، ثم `providerSpecificData.rotationOverrides.rateLimitResetSeconds` لكل اتصال، ثم تأخير إعادة المحاولة لكل موفر، ثم env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`، ثم التراجع المقاس. يقوم تلقائيًا بإزالة الحقل. إنه يؤثر فقط على سبب الحد الأقصى للمعدل، ولا يؤثر أبدًا على الحالات النهائية.

**حارس القطيع ضد الرعد:** يمنع حالات الفشل المتزامنة من الإفراط في تمديد فترة التهدئة أو زيادة `backoffLevel` بشكل مزدوج.

**الحد الأقصى للتزامن 429 لا يتسلق سلم التراجع.** `429` الذي يُبلغ جسمه عن حد التزامن ("عدد كبير جدًا من الطلبات المتزامنة"، "حد التزامن"، "حد الطلب الموازي"، GLM `并发数过高`) يعني أن الحساب سليم ولكنه مشغول. يقوم `checkFallbackError()` بإرجاع السبب `concurrency_limited`: فشل في الاتصال التالي الآن، وقم بتبريد هذا الاتصال للحصول على `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) ثابت أو تلميح إعادة المحاولة الأولي، واحتفظ `backoffLevel` دون تغيير، وقم بتعيين `skipProviderBreaker`. لا تزال هيئة الحصص الصريحة تفوز، وبالتالي فإن الهيئة التي تتطابق أيضًا مع نمط الحصص تظل بمثابة حكم الحصص. الكشف: `looksLikeConcurrencyLimit()` في `src/shared/utils/classify429.ts`؛ الحكم: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` ( `FailureKind` للكسارة) لم يتغير ولا يزال يقرأ `rate_limit` لهذه الأجسام.

**أكشاك محتوى الدفق لا تعمل على تبريد الحساب.** عندما تتخلى هيئة مراقبة كشك المحتوى (`open-sse/utils/streamHandler.ts`) عن دفق لم يرسل أي مخرجات نموذج في الوقت المناسب، يسجل `markAccountUnavailable()` الخطأ في الاتصال ولكنه لا يحدد أي فترة تباطؤ: ينتمي الكشك إلى هذا الطلب، وغالبًا ما يكون ذلك بمثابة دورة تفكير طويلة بدون أي إخراج حتى الآن. يمكن للمشغلين الاشتراك مرة أخرى باستخدام `resilienceSettings.streamStallCooldown.enabled` (الافتراضي `false`).

**الاشتراك في إشارة الكمون لاختيار حساب `p2c`.** تسجل كل محاولة مرسلة الوقت حتى البايت الأول والنتيجة لكل اتصال (ولكل نموذج اتصال + ) في نافذة متجددة في الذاكرة: آخر 20 عينة في غضون 15 دقيقة (`open-sse/services/connectionLatencyTracker.ts`، مسجلة من `safeLogEvents()` في `src/sse/handlers/chatHelpers.ts`). عندما يكون `resilienceSettings.p2cLatency.weight` أعلى من `0` (النطاق 0-20، الافتراضي `0` = متوقف)، يضيف `compareP2CConnections()` في `src/sse/services/auth.ts` ما يصل إلى نقاط `weight` لكل مرشح من الزوج. يأتي نصف ذلك من زمن الوصول كنسبة إلى المرشح الأسرع (ضعف البطيء الذي يأخذ النصف الكامل) والنصف الآخر من معدل الخطأ المتداول. ينطبق هذا المصطلح فقط عندما يكون لدى كلا المرشحين 3 عينات على الأقل، لذلك لا يتم معاقبة الحسابات الجديدة، ويظل سقفها أقل من العقوبات المحظورة والمستنفدة للحصة. إنها لا تضيف أي دائرة خاصة بها: لا تزال الحسابات الفاشلة تتم معالجتها من خلال طبقات التهدئة والتأمين والكسر. اضبطه باستخدام `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**تقوم إطارات الاستدلال بإعادة تشغيل ميزانية كشك المحتوى.** يمكن لنموذج الاستدلال أن يفكر لدقائق قبل أول رمز مرئي له: Claude يبث إطارات `thinking_delta` التي قد يكون نص تفكيرها فارغًا، ويقوم الردود API بتدفق عنصر استدلال تلو الآخر. يتعرف `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) على هذه الإطارات، وتعيد هيئة المراقبة تشغيل ميزانيتها لكل إطار بدلاً من إلغاء الدور. ما زالوا ليسوا مخرجات نموذجية، لذا فإن الدور الذي ينتهي بالاستدلال فقط لا يزال يتم الإبلاغ عنه على أنه فارغ، والدور الذي يتوقف عن الاستدلال ويرسل نبضات القلب فقط لا يزال يعطل المراقبة.

إطارات `reasoningContentEvent` الثنائية لـ Kiro ذات التوقيع غير الفارغ تحافظ على نشاط الاستدلال هذا من خلال المنفذ باعتباره دلتا `reasoning_content` فارغة. لا يتم إعادة توجيه التوقيع. البيانات التعريفية والإطارات غير المكتملة والتوقيعات الفارغة لا تؤدي إلى إعادة تشغيل ميزانية المحتوى؛ لا يزال تطبيق مهلة البث النشط المستقل وإلغاء العميل (`open-sse/executors/kiro/reasoning.ts`).

**الحالات الطرفية (فترات التهدئة NOT ):**

- تم تعيين `banned` — من خلال اكتشاف حظر الكلمات الرئيسية/الحسابات المحظورة (انظر [BAN_DETECTION](../security/BAN_DETECTION.md) ) ومن خلال ثلاث حالات رفض متتالية لكل طلب (`request_rejected`، على سبيل المثال Anthropic OAuth 403 "الطلب غير مسموح به" — `open-sse/services/requestRejectedStreak.ts`); يؤدي رفض واحد فقط إلى تبريد الاتصال
- `expired` (الانتقالات إلى المحطة بعد إعادة المحاولة المقيدة — `EXPIRED_RETRY_MAX = 3` مع التراجع الأسي — بحيث يمكن إصلاح أخطاء OAuth العابرة ذاتيًا قبل إلغاء تنشيط الحساب نهائيًا)
- `credits_exhausted`

وتستمر هذه حتى تتغير بيانات الاعتماد أو يقوم المشغل بإعادة تعيينها. لا تقم بالكتابة فوق الحالات الطرفية بحالة التهدئة العابرة.

**التعافي البطيء:** عندما تنتهي `rateLimitedUntil` ، يصبح الاتصال مؤهلاً مرة أخرى. عند الاستخدام الناجح، يقوم `clearAccountError()` بمسح كافة حقول الخطأ.

### جدار استخدام Claude OAuth : إعادة ضبط حد جلسة + ذات الأولوية المنخفضة

**نِطَاق:** اتصال اشتراك Claude واحد (OAuth). كلا الميزتين** الاشتراك لكل اتصال** (تحرير قسم الاتصال → Claude → `lowPriorityMode` / `autoLimitReset` في `providerSpecificData`، وكلاهما متوقفان عن العمل بشكل افتراضي) وعكس أوامر `/low-priority` و `/limit-reset` الخاصة بـ Claude Code (عقد سلكي تم التقاطه من Claude Code 2.1.263).

**تطبيق:**

- تصنيف استجابة آلة الحالة + : `open-sse/services/claudeLowPriority.ts`
- إعادة تعيين عميل status/claim : `open-sse/services/claudeLimitReset.ts`
- خطاف المنفذ (إعادة محاولة حقن الرأس + لنفس الحساب): `open-sse/executors/base.ts::execute()`
- استمرارية التقيد: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**مشغل:** جدار الاستخدام لمدة 5 ساعات — a `429` الذي تحمل رؤوسه `anthropic-ratelimit-unified-status: rejected` ، وعندما يكون الحساب مؤهلاً، `anthropic-ratelimit-unified-slow-offer: treatment`. لا يتم إرسال أي شيء قبل ذلك الجدار الأول 429؛ تمر الاندفاعة 429 بدون رؤوس موحدة عبر مسار التهدئة العادي.

**حارة ذات الأولوية الدنيا** (`lowPriorityMode`):

- على الحائط 429، يقبل المنفذ العرض ويعيد المحاولة على الفور** نفس** حساب مع `anthropic-usage-limit: slow`; يظل المسار نشطًا حتى يتم الإعلان عن `anthropic-ratelimit-unified-reset` (+ 60s Grace) وكل طلب في تلك النافذة يحمل الرأس. 429 الذي تم اعتراضه لا يصل أبدًا إلى `handleChatCore`، لذلك يتم الاتصال** لا** يتم وضعها في فترة التهدئة ولا يتم تدويرها بعيدًا.
- `anthropic-ratelimit-unified-slow-status` في الردود اللاحقة: `active` / `not_needed` حافظ على المسار؛ `slot_busy` (429) أو `529` انتظر `anthropic-ratelimit-unified-slow-retry-after` الخاص بالخادم (20 ثانية افتراضية، مشبك 5–600 ثانية، ± 30% ارتعاش) وأعد المحاولة، محاطًا بـ `anthropic-ratelimit-unified-slow-max-wait` (افتراضي 20 دقيقة، مشبك 1 دقيقة - 6 ساعات) — بعد انتهاء الممر وإعادة قبول كتل التبريد لمدة 10 دقائق. يتم أيضًا وضع حد أقصى للانتظار بما تبقى من مهلة البدء الأولية للطلب (`resolveFetchStartTimeout`، 10 دقائق بشكل افتراضي) مطروحًا منها هامش 5 ثوانٍ: بدون هذا الحد الأقصى، فإن الحد الأقصى للانتظار الافتراضي لمدة 20 دقيقة سوف يتجاوز الطلب وسيتم إحباط السكون في منتصف الانتظار، مما يظهر `TimeoutError` بدلاً من `max_wait` end + Cool-off.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`، أو تمرير النافذة لمدة 5 ساعات، أو `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (الذي ينهيها كـ `extra_usage` في أي حالة، نظرًا لأن الفائض المدفوع يغطي الجدار الآن) ينهي المسار؛ ثم تتدفق الاستجابة إلى مسار التهدئة العادي. يتم تذكر `budget_exhausted` حتى إعادة تعيين الميزانية المعلنة (≤ 8 أيام).
- يتم تشغيل فحص الجدار بعد عمليات إعادة المحاولة التي قام بها المنفذ والتي يبلغ عددها 400 محاولة (تحرير السياق، ومشابك thinking/effort ، والتعلم التلقائي المعلمي)، لذا فإن الجدار 429 الذي يظهر فقط على إحدى المحاولات هذه لا يزال يتم اعتراضه بدلاً من الوصول إلى مسار التهدئة.
- الحالة موجودة في الذاكرة لكل اتصال (تكلف إعادة التشغيل جدارًا إضافيًا 429 لإعادة قبوله).

**إعادة ضبط حد الجلسة** (`autoLimitReset`، حاول قبل المسار عندما يكون كلاهما قيد التشغيل):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` كتلة؛ عندما `arm: "reset"` و `available: true`، `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` مع `{ "program": "juniper_tide" }` (المؤسسة UUID من `providerSpecificData.organizationUUID`، bootstrap الاحتياطي).
- `result: reset|not_limited` → تتم إعادة محاولة الطلب بأقصى سرعة (بدون رأس بطيء). مذكرة `already_used` / `not_offered` `next_available_at` (أسبوع واحد افتراضي) ؛ أي فشل يتراجع 15 دقيقة. تتم إعادة التعيين مرة واحدة في الأسبوع ولا تزال تُحتسب ضمن الحد الأسبوعي.

حراس الانحدار: `tests/unit/claude-low-priority-mode.test.ts`، `tests/unit/claude-limit-reset.test.ts`، `tests/unit/claude-low-priority-executor.test.ts`.

### تقارب الجلسة (#7274)

**نِطَاق:** جلسة عميل واحدة (رأس `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` ) مثبتة على اتصال واحد، لـ** أي** مزود.

**غاية:** احتفظ بوكيل متعدد المنعطفات (رمز Claude ، ومساعد، ووكلاء مخصصين) على نفس الحساب عبر الطلبات، مما يقلل من فقدان السياق عبر الحسابات وتكرار البدء البارد 429 على مقدمي الخدمة الذين لديهم حالة جلسة لكل حساب.

**تطبيق:**

- قرار TTL : `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- دبوس selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- استخراج الرأس (عام، أي مزود): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- جدول الدبوس المستمر: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- الإعداد: `sessionAffinityTtlMs` ( TTL العام في مللي ثانية، تعطيل `0` ) — `src/lib/db/settings.ts`. تمت إعادة تسميته من `codexSessionAffinityTtlMs` المخصص للمخطوطة فقط بواسطة الترحيل `124_generic_session_affinity_ttl.sql`، والذي ينقل أي Codex TTL الذي تم تكوينه مسبقًا باعتباره الإعداد الافتراضي الجديد.

قبل #7274، كان `resolveSessionAffinityTtlMs()` مقيدًا بكفالة `0` لكل مزود باستثناء `codex`، لذلك لم يكن لإعداد TTL (ورؤوس الجلسة) أي تأثير في أي مكان آخر على الرغم من أن آلية التثبيت واستخراج الرأس كانت بالفعل غير محددة للمزود. أزال الإصلاح هذا الإرجاع المبكر؛ ينطبق TTL الآن بشكل موحد على كل مزود بمجرد تعيينه عالميًا فوق `0`.

لا يتم إعادة توجيه رؤوس تقارب الجلسة الثلاثة مطلقًا. يقوم منفذو — ببناء رؤوسهم الأولية من البداية بدلاً من تمرير رؤوس العميل من خلالها، لذلك يظل هذا معرف ارتباط داخلي فقط.

### عقود إيجار اتصال الجلسة المُدارة الحصرية

**نِطَاق:** يمتلك HTTP client/session المُدار النشط اتصال OmniRoute مؤهل واحد.

**غاية:** توفير ملكية اتصال حصرية دائمة للعملاء الذين يحتاجون إلى سياج توجيه صعب عبر الطلبات. وهذا يختلف عن تقارب الجلسة، وهو تفضيل استمرارية ناعمة: يستمر عقد الإيجار الحصري في حالة دورة الحياة في SQLite، ويفرض تفردًا عالميًا للمالك النشط والاتصال النشط، ويرفض الجيل القديم قبل إرسال الموفر.

الميزة هي الاشتراك لكل مفتاح API. يجب أن يحتوي المفتاح المُدار على نطاق `lease:exclusive` وقائمة `allowedConnections` صريحة وغير فارغة. يمكن لأي عميل HTTP استخدام نقطة نهاية دورة الحياة؛ لا يلزم وجود اسم عميل أو وكيل مستخدم أو موفر أو طريقة OAuth أو نموذج. يمتلك عقد الإيجار اتصالاً، وليس نموذجًا، لذا فإن تغيير النموذج يحتفظ بالربط بينما يظل الاتصال مؤهلاً بشكل عادي. تظل قواعد النموذج العادي والحصة النسبية والصحة والتهدئة والقائمة المسموح بها موثوقة وقد تنقل نفس الجيل إلى اتصال مؤهل مجاني آخر.

دورة الحياة هي `POST /api/v1/session-leases` مع إجراءات JSON `acquire` و `renew` و `release`. تقدم طلبات الاستدلال المُدارة قيمة `X-OmniRoute-Lease-Owner` غير الشفافة و `X-OmniRoute-Lease-Generation` بالضبط. يستخدم المالك `vlo_` متبوعًا بـ 43 حرفًا من نوع base64url؛ يتم تخزين تجزئة SHA-256 الخاصة به فقط. يربط كل سياج إرسال نهائي أيضًا مفتاح API المصادق عليه ID والاتصال النشط ID. تتم إزالة رؤوس التحكم في الإيجار من السجلات، ولقطات الطلب التي تم الاحتفاظ بها، ورؤوس المنفذ الرئيسي.

إذا كان التوجيه العادي يحتوي على مرشحين مُدارين مؤهلين ولكن كل مرشح حر مشغول بعقد إيجار أجنبي نشط، OmniRoute تُرجع HTTP `429` ورمز سعة الإيجار غير المتاحة وحالة انتظار السعة و `Retry-After` المحدود المشتق من أقرب انتهاء صلاحية ذي صلة. الأهلية الفارغة العادية ليست تنافسًا على عقد الإيجار وتحتفظ بدلالات خطأ التوجيه الحالية الخاصة بها.

تظل الآليات ذات الصلة منفصلة:

- إشغال جلسة OAuth هو التوزيع الناعم للعملية المحلية لحسابات OAuth.
- تمنح إشارات الحساب تصاريح تزامن الطلب وتنتهي عند اكتمال الطلب.
- تعد عقود إيجار الجلسة المُدارة الحصرية ملكية دائمة طوال دورة الحياة مع سياج جيل.

---

## 3. قفل النموذج (Model Lockout)

**النطاق:** ثلاثية المزوّد + الاتصال + النموذج.

**نطاق المفتاح حسب الحالة:** حالة الفشل هي التي تحدد المفتاح الذي يُكتب عليه القفل
(`resolveLockoutScope()` في `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — إشارة حصة أو استحقاق — يُقفل **عائلة الحصة**:
  في حالة codex النطاق الكامل `codex` / `spark` (كل نموذج `gpt-5*` في
  الاتصال)، وفي المزوّدات الأخرى `getQuotaScopedModelForProvider()`.
- `404` يقفل النموذج المجرد (`getModelLockKey()` يضيّق نطاق `not_found`).
- أي حالة أخرى — أعطال النقل/الخادم `5xx` و`502` المُصنَّع داخليًا من OmniRoute
  الناتج عن التحقق من الجودة — يقفل مجموعة
  المزوّد/الاتصال/النموذج **الدقيقة** فقط. تدفّق تالف على نموذج واحد ليس دليلاً
  على حصة الحساب؛ قبل هذه القاعدة، كان ردّ واحد فارغ على
  `codex/gpt-5.6-luna` يُخرج كل نماذج `gpt-5*` في ذلك الاتصال من
  التوجيه لمدة 2–30 دقيقة (بتصاعد) بينما حصتها سليمة تمامًا.
- خيار `scope` الصريح من المُستدعي يتغلب دائمًا (Antigravity يمرر `"exact"`).

**الغرض:** تجنّب تعطيل اتصال كامل عندما يكون نموذج واحد فقط غير متاح أو محدود الحصة.

**أمثلة:**

- مزوّدات الحصة لكل نموذج التي تُعيد 429
- المزوّدات المحلية التي تُعيد 404 لنموذج واحد مفقود
- أعطال أذونات الوضع/النموذج الخاصة بالمزوّد (مثل أوضاع Grok)

**التنفيذ:** `open-sse/services/accountFallback.ts` — `lockModel()`، `clearModelLock()`، `getAllModelLockouts()`.

### لوحة فترات تبريد النماذج (v3.8.0)

واجهة المستخدم: الإعدادات ← Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

تعرض القفلات النشطة مع: المزوّد، الاتصال، النموذج، السبب، expiresAt. يمكن للمشغّلين إعادة تفعيل نموذج يدويًا من البطاقة.

**واجهة REST API:**

- `GET /api/resilience/model-cooldowns` — عرض القفلات النشطة
- `DELETE /api/resilience/model-cooldowns` — إعادة التفعيل اليدوي. الجسم: `{provider, connection, model}`. المصادقة: management.

### مدير فترات التبريد (Cooldown Manager)

واجهة المستخدم: المراقبة ← Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

صفحة واحدة لكل اتصال خارج التوجيه لسبب مؤقت، بدلاً من
فتح صفحة كل مزوّد على حدة. تعرض فترات تبريد الاتصالات وقفلات النماذج والحالات
النهائية، وتزيلها لكل اتصال، أو لمجموعة مختارة، أو لجميع اتصالات مزوّد معين،
وتُحرر أكثر قواعد التبريد تعديلاً: `streamStallCooldown.enabled` و
`connectionCooldown` الخاص بـ OAuth / مفتاح API (فترة التبريد الأساسية وخطوات
التراجع القصوى) (تُحفظ عبر
`PATCH /api/resilience`). الحالات النهائية (`banned`، `expired`، `credits_exhausted`)
تُعرض لكن لا تُزال هنا أبدًا.

**واجهة REST API** (`src/lib/resilience/cooldownManager.ts`، المصادقة: management):

- `GET /api/resilience/cooldowns[?provider=]` — الاتصالات مع الحالة، ووقت التبريد المتبقي،
  ومستوى التراجع، ونوع آخر خطأ، وقفلات النماذج (بدون بيانات اعتماد)
- `POST /api/resilience/cooldowns` — الجسم `{connectionIds: string[]}` أو
  `{all: true, provider?}`؛ يُعيد `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### واجهة إعدادات القفل + الاسترداد بالاضمحلال عند النجاح (v3.8.23)

تحوّل قفل النموذج من سلوك ثابت مفعّل دائمًا إلى ميزة قابلة للتكوين بالكامل
واختيارية (opt-in) لها بطاقة إعدادات خاصة ومسار استرداد ذاتي الإصلاح.

**بطاقة الإعدادات:** الإعدادات ← Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
هذه **مختلفة** عن `ModelCooldownsCard` للقراءة فقط أعلاه (التي _تعرض_ فقط
القفلات النشطة) — البطاقة الجديدة _تُكوّن المعاملات_. القيم الافتراضية
موجودة في `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| الإعداد                 | الافتراضي                        | المعنى                                                      |
| ----------------------- | -------------------------------- | ----------------------------------------------------------- |
| `enabled`               | `false`                          | المفتاح الرئيسي — قفل النموذج **معطّل افتراضيًا**.          |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | حالات المزوّد التي تُحسب فشلاً على مستوى النموذج.           |
| `baseCooldownMs`        | `120_000` (120 ثانية)            | مدة القفل الأولية لأول فشل.                                 |
| `maxCooldownMs`         | `1_800_000` (30 دقيقة)           | الحد الأقصى لفترة التبريد المتصاعدة.                        |
| `maxBackoffSteps`       | `10`                             | الحد الأقصى لخطوات تصعيد التراجع الأُسّي.                   |
| `useExponentialBackoff` | `true`                           | ما إذا كانت الإخفاقات المتكررة تُصعّد فترة التبريد أُسّيًا. |

تُحفظ الإعدادات عبر مخزن الإعدادات العادي وتُتحقق عبر
مخطط إعدادات المرونة؛ البطاقة تحدّ `baseCooldownMs`/`maxCooldownMs`
(مع `maxCooldownMs ≥ baseCooldownMs`) و`maxBackoffSteps`.

**الاسترداد بالاضمحلال عند النجاح:** الاسترداد **ليس** مجرد انتهاء المؤقت. الردّ
السليم يُنقص عداد فشل النموذج تدريجيًا بحيث يتوقف النموذج الذي تعافى
في منتصف النافذة عن التصعيد (ويتم مسحه) قبل انتهاء مؤقته. عند
هدف combo ناجح، يستدعي `open-sse/services/combo.ts` الدالة `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`)، التي **تُنصّف** قيمة
`failureCount` المخزنة (`Math.floor(failureCount / 2)`)؛ وعندما تصل إلى `0` يُحذف
إدخال القفل بالكامل. الدالة المقابلة `recordModelLockoutFailure()`
تزيد العداد (وتُصعّد فترة التبريد) عند الإخفاقات ضمن
نافذة التصعيد. هذا الاضمحلال عند النجاح يأتي بالإضافة إلى انتهاء المؤقت العادي —
كلا المسارين يمكنه إعادة تفعيل نموذج.

**الحالة:** تُحفظ القفلات **في الذاكرة** (`Map`s لكل عملية من
`ModelLockoutEntry` مفهرسة بـ `provider:connectionId:model`، وأقفال النطاق الدقيق بـ
`provider:connectionId:exact:model`)، ولا تُحفظ في
قاعدة البيانات — تُفقد عند إعادة التشغيل. _الإعدادات_ محفوظة بشكل دائم؛ أما
_حالة_ القفل النشطة فهي مؤقتة زائلة.

---

## 4. التحكم في التزامن عبر حصة الاتصال (v3.8.36)

غالبًا ما تقبل حسابات الاشتراك (GLM وMiniMax وغيرها) نحو 1–3 طلبات
متزامنة فقط؛ ويؤدي تجاوز ذلك إلى ظهور أخطاء 429 وفترات تهدئة. ويزداد هذا الأمر
حدةً في مجموعات **حصة الاتصال** (`qtSd/…`)، حيث تشترك عدة مفاتيح API في
حساب upstream واحد. تحافظ ثلاث طبقات على عدم إغراق الحساب المشترك بالطلبات.

### الحد الأقصى للتزامن لكل اتصال (`max_concurrent`)

يمكن لكل اتصال موفّر تعريف حد أقصى `max_concurrent`
(`provider_connections.max_concurrent`، ويتم تعيينه في نافذة الاتصال / API / قاعدة البيانات).
اتركه فارغًا لعدم فرض أي حد. هذا هو المفتاح الوحيد الذي يقود طبقة التسلسل
أدناه — عيّنه على قيمة التزامن الفعلية للحساب (مثلًا GLM نحو 1 وMiniMax نحو 2).

### حدود التزامن لكل نموذج (`modelConcurrency`)

يمكن للاتصال أيضًا تعريف حدود تزامن دقيقة لكل نموذج داخل خريطة
`rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

عيّنها في نافذة الاتصال (**تجاوزات حد معدل الطلب → حدود التزامن لكل نموذج**،
قيمة `model=cap` واحدة في كل سطر) أو عبر
`PATCH /api/providers/[id]` باستخدام بنية JSON نفسها. دلالات المفاتيح:

- **على مستوى الاتصال مقابل الخاص بالنموذج:** يظل `maxConcurrent` هو الحد
  المشترك على مستوى الاتصال بالكامل. عند انطباق كليهما، يتم الحصول على
  البوابتين ذريًا في البوابة المركبة نفسها
  (`global → provider → account → model`)؛ ويكون السلوك الفعلي هو الحد
  الأكثر تقييدًا من الحدود المنطبقة.
- **مطابقة مفتاح النموذج تمامًا:** المفتاح هو سلسلة النموذج التي يتم تمريرها
  إلى المنفّذ بعد حل التوجيه — وعادةً ما تكون معرّف النموذج الخام لدى upstream
  (`glm-5`)، وليس اسمًا مستعارًا `provider/model` من جانب العميل
  (`zai/glm-5` لا يطابق `glm-5`). القيم هي حدود موجبة صحيحة لعدد الطلبات
  المتزامنة.
- **وضع الطلبات في قائمة انتظار محلية، دون اكتشاف:** توضع الطلبات الزائدة في
  قائمة انتظار محلية مع دلالات قائمة الانتظار/المهلة الحالية (أخطاء قبول مكتوبة
  النوع `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). لا يكتشف OmniRoute
  سياسة upstream أو يستنتجها — بل يفرض الحدود الدقيقة التي ضبطها المشغّل.
  لا تؤدي بوابة نموذج ممتلئة إلى تعطيل الموفّر، ولا تنشئ حظرًا دائمًا للنموذج؛
  ويظل سلوك أخطاء 429/التهدئة/البديل من upstream هو آلية التصدي الاحتياطية.
- **النطاق لكل اتصال ولكل عملية:** تكون الحدود خاصة بكل اتصال في قاعدة البيانات
  ومحتفظًا بها في الذاكرة، ولذلك لا يتناسق اتصالان يعيدان استخدام مفتاح API
  نفسه لدى upstream مع بعضهما.
- **عدم الضبط يعني عدم التغيير:** لا تؤدي إزالة الخريطة (أو ترك حقل لوحة
  المعلومات فارغًا) إلى إضافة بوابة نموذج. مثال على إعداد دون تأكيد أي حد
  شامل للموفّر:

```text
glm-5=1
glm-4.7=3
```

### تسلسل طلبات حصة الاتصال

عندما يستهدف توجيه حصة الاتصال اتصالًا يعرّف قيمة موجبة لـ
`max_concurrent`، يتم تسلسل الطلبات المتزامنة إلى ذلك **الحساب** عبر
إشارة لكل اتصال (المفتاح `qsconn:<connectionId>`): وتنتظر الطلبات الزائدة
**في قائمة الانتظار** بدلًا من إغراق الحساب. وهي **تعمل في وضع الفتح عند
الفشل** — إذ تتابع قائمة الانتظار المشبعة أو المهلة دون الحصول على خانة، بدلًا
من رفض طلب قابل للتوجيه في أي وقت. يمكن تبديل ذلك من **الإعدادات → المرونة →
التزامن لكل اتصال لحصة الاتصال**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`، مفعّل افتراضيًا).
ومن دون حد `max_concurrent` يبقى السلوك دون تغيير.

> تعمل بوابة توجيه حصة الاتصال (`selectQuotaShareTarget`، ‏DRR + ‏P2C) نفسها
> في وضع الفتح عند الفشل، ولا تفعل سوى _خفض أولوية_ اتصال بلغ الحد — ومع
> مجموعة مؤلفة من اتصال واحد لا يمكنها فرض حد صارم، ولذلك فإن هذه الإشارة هي
> التي تحتوي الإغراق فعليًا.

### إعادة المحاولة مع مراعاة فترة تهدئة المجموعة

بالنسبة إلى كل استراتيجية مجموعة (عند تفعيلها)، ينتظر الطلب الذي كان سيؤدي
إلى تثبيت خطأ 429 لفترة تهدئة انتقالية SHORT قصيرة، ثم يعيد التوجيه بدلًا من
إرجاع الخطأ 429 — ويشمل ذلك نوافذ TPM/RPM من فئة Gemini (نحو 60 ثانية لإعادة
المحاولة) في المجموعات متعددة النماذج، مثل وصول كلا الهدفين في مجموعة مؤلفة من
نموذجين إلى حد معدل طلب لكل نموذج. ويخضع ذلك للحدود `comboCooldownWait`
(`enabled` و`maxWaitMs` و`maxAttempts` و`budgetMs`) ضمن **الإعدادات → المرونة**.
ولا ينتظر أبدًا حالات `quota_exhausted` (المقفلة حتى منتصف الليل)، أو أسباب
المصادقة/عدم العثور.

يمكن للمجموعة إلغاء الاشتراك باستخدام `config.comboCooldownWaitEnabled: false`.
لا يؤدي إلا `false` الحرفي إلى تعطيل فترات انتظار المجموعة المشتركة هذه
(التهدئة بعد التوجيه وانتظار فتح الدارة/قفل النموذج قبل التوجيه) وتمديد الحد
الأدنى لمهلة الانتظار الناتج عن ميزانية الانتظار. ويحافظ غياب القيمة أو
`true` على السياسة العامة؛ ولا يمكن لـ`true` تفعيل الانتظار إذا كان معطّلًا
عالميًا. ويظل `targetTimeoutMs` المحدد صراحةً هو الغالب. ولا يغيّر هذا الإلغاء
انتظار تثبيت دور Native-Codex المنفصل قبل التوجيه.

وتغطي البوابة نفسها حالة ما قبل التوجيه (#16319): عندما يتم تخطي كل هدف في
مجموعة قبل إجراء أي محاولة لأن نموذجها موجود في حالة حظر انتقالية قصيرة، ينتظر
مسار عدم المحاولة الانتظار حتى انتهاء القفل ضمن الحدود نفسها ثم يعيد التوجيه،
بدلًا من إرجاع `503 ALL_TARGETS_SKIPPED` دون تلميح. وعندما لا يُسمح بالانتظار
(بسبب استنفاد الحد أو المحاولات أو الميزانية، أو تعطيل الميزة)، تتم ترقية
الاستجابة النهائية إلى
`429 rate_limit_error` مع حملها `retry_after` / `reset_at` من أقرب انتهاء
لقفل انتقالي؛ بينما تحتفظ أقفال الحصة والمصادقة وعدم العثور بالخطأ 503 دون تلميح.

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

## 5. التحكم في قبول طابور الطلبات (v3.8.49 · issue #6593)

**النطاق**: طابور تحديد المعدل المحلي لكل مزوّد+اتصال (`open-sse/services/rateLimitManager.ts`، المدعوم بـ Bottleneck)، وهي طبقة واحدة أسفل الآليات الثلاث المذكورة أعلاه.

**`maxWaitMs` يحدّد زمن الانتظار في الطابور؛ `executionMaxWaitMs` يحدّد زمن التنفيذ.**
كلاهما منفصل عمدًا عن الآخر، ولا يغذّي أحدهما الآخر.

`resilienceSettings.requestQueue.maxWaitMs` هو **ميزانية الانتظار في الطابور**: يغطي الانتظار للحصول على خانة من المزوّد ثم البقاء في حالة QUEUED، ويتم مسح مؤقّته في اللحظة التي تغادر فيها المهمة حالة QUEUED وتبدأ التنفيذ (`rateLimitManager.ts`، `wrappedFn`). الطلب الذي يتجاوزها لا يصل أبدًا إلى المصدر upstream. القيمة الافتراضية 30000ms، ويوفّرها `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` في `src/lib/resilience/settings.ts` ويثبّتها `tests/unit/ratelimit-admission-control-6593.test.ts`، لذا فإن أي تغيير فيها يجعل ذلك الاختبار يفشل بدلًا من ترك هذه الفقرة قديمة بصمت.

`resilienceSettings.requestQueue.executionMaxWaitMs` هو ما يستلمه Bottleneck كـ `expiration` للمهمة، ولا يبدأ مؤقّته إلا بعد الإرسال للتنفيذ. إنه شبكة أمان للمنفّذين الذين لا يملكون مهلة upstream خاصة بهم، ويُرفع إلى مهلة بدء الجلب الخاصة بالمنفّذ عندما تكون أطول، بحيث لا يمكنه قطع استجابة سليمة قيد النقل. القيمة الافتراضية 600000ms (10 دقائق).

تغذية ميزانية الطابور في `expiration` هي ما كان يقتل البوابات غير التزايدية في منتصف الرحلة — فهي تعمل بشكل مشروع لدقائق قبل وصول أول البايتات — ولهذا السبب يُعرَض انتهاء صلاحية التنفيذ كـ `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) بينما تحمل ميزانية الطابور رمز مهلة الطابور. يمكن تجاوز أيٍّ منهما عبر `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (متغيّرات البيئة) أو عبر لوحة التحكم (**Settings ← Resilience**). كلاهما يُحصَر ضمن النطاق 1ms–24h عند التطبيع.

**الأولوية، لكليهما:** متغيّر البيئة يوفّر القيمة _الافتراضية_ فقط. القيمة المحفوظة في `resilienceSettings.requestQueue` (لوحة التحكم / تعديل API، المخزّنة في `key_value`) تتفوّق عليها، وقيمة `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` الخاصة بكل اتصال تتفوّق على تلك. لذلك فإن تعيين متغيّر البيئة على نشرٍ لديه قيمة محفوظة مسبقًا لا يغيّر شيئًا — امسح الإعداد المحفوظ أو حدّثه بدلًا من ذلك.

مدة البقاء في الطابور محدودة بـ `maxWaitMs`؛ أما `maxQueueDepth` أدناه فيحدّ عدد المتصلين الذين يمكنهم الانتظار في الطابور في آنٍ واحد.

**إعادة المحاولة المذكورة في جسم الاستجابة: التنظيم مقابل القفل.** يمكن لجسم استجابة 429 أن يحدّد مدة انتظاره الخاصة (Gemini `RetryInfo.retryDelay`، نص "retry after Ns")، والذي تقرؤه `updateFromResponseBody`. الانتظار الذي يندرج ضمن `maxWaitMs` الخاص بالاتصال هو تنظيم للإيقاع: يفرغ المحدِّد خزّانه لتلك المدة وتُرسَل الاستدعاءات المنتظرة عندما يُعاد ملؤه. أما الانتظار الأطول من `maxWaitMs` فليس شيئًا يمكن للطابور أن يصبر عليه — فـ Gemini يجيب عن الحصة اليومية المستنفدة بـ `retryDelay: "86399s"`. إن `Retry-After` المُرحَّل على استجابة 429 المعاد بناؤها (#16528) يجعل محرّك الاحتياط يقفل النموذج لتلك النافذة أصلًا، لكن إيقاف المحدِّد مؤقتًا عنها أيضًا كان سيظل يعطّل أي استدعاء يصل إلى المفتاح مبكرًا (بعد إعادة تعيين المرونة مثلًا) طوال مدة `maxWaitMs`. عندما يأتي مثل هذا الانتظار من تفصيل Google `RetryInfo` مُنمَّط (مصدر `google_rpc_retry_info`) ويكون محدِّد المفتاح مُوجَّهًا أصلًا إلى النموذج (انظر `getLimiterKey`)، تتحول استجابة 429 إلى قفلٍ للنموذج على ذلك الاتصال بدلًا من ذلك (`lockModelForLongBodyRetry` في `open-sse/services/rateLimitManager/bodyRetryPause.ts`، وبحد أقصى 24h)، ويُترَك المحدِّد دون إيقاف مؤقت. يتخطّى اختيار الحساب ذلك القفل عبر `isModelLocked()`، وكذلك بوابة ما قبل الإرسال للتركيبات للأهداف المثبَّتة على الاتصال. في antigravity، حيث يكون المحدِّد لكل عائلة حصص، يكون القفل على النموذج المحدد بالضبط، مثل أقفال الحصص الأخرى. الاسم الذي طلبه العميل يُقفَل أيضًا عندما يحلّه اسمٌ مستعار إلى ذلك النموذج، لأن تلك الفحوصات تستخدم الاسم المطلوب؛ ويُقفَل بدقة (`lockExactModel`)، لذا فإن اسمًا مستعارًا يعبر عائلة حصص antigravity أو نطاق codex لا يقفل نفسه أبدًا. التلميح النصي، أو `retryDelay` غير المُنمَّط، أو محدِّد يتشاركه الاتصال بأكمله يُبقي على الإيقاف المؤقت. عندما يتوقف المحدِّد الذي أعاد مسار 429 بناءه للتو مؤقتًا، يُرفَض المتصل الذي ينتهي زمن طابوره المتبقّي قبل انتهاء الإيقاف المؤقت فورًا برمز مهلة الطابور (`checkLimiterPause`) بدلًا من انتظار انقضاء ذلك الزمن؛ ويُثبَّت النهاية المسجَّلة قبل بناء المحدِّد، حيث يبدأ Bottleneck ساعة التحديث الخاصة به، وأي تغيير لاحق في الخزّان ينساها. تغطية ذلك في `tests/unit/rate-limit-long-body-retry-lockout.test.ts` و`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — حدّ القبول الاختياري (جديد).** تحدّد `resilienceSettings.requestQueue.maxQueueDepth` عدد الطلبات التي يمكنها البقاء في الطابور (لم تُرسَل للتنفيذ بعد) لمزوّد+اتصال واحد في آنٍ واحد. عندما يحتوي الطابور أصلًا على `maxQueueDepth` من الطلبات، يُرفَض الطلب الجديد بسرعة بخطأ مُنمَّط `code: "RATE_LIMIT_QUEUE_FULL"` **قبل** أن يصل أصلًا إلى `limiter.schedule()` — لذا يكون الرفض رخيصًا ويحدث قبل أي عمل لاحق لضغط الموجّهات / الترجمة لذلك الطلب. القيمة الافتراضية `0` = معطّل، مع الحفاظ على السلوك الحالي للطابور غير المحدود؛ النطاق 0–100000. يمكن التجاوز عبر `RATE_LIMIT_MAX_QUEUE_DEPTH` (متغيّر بيئة) أو `resilienceSettings.requestQueue.maxQueueDepth` (لوحة التحكم / تعديل API).

فحص القبول نفسه دالة نقية (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) بحيث يمكن اختباره وحدةً دون محدِّد Bottleneck حقيقي.

> اقترحت وثيقة RFC التي فتحت #6593 أيضًا علمًا باسم `bypassCompressionOnRateLimit`.
> إن مسار `open-sse/services/compression/` في هذا المستودع هو ضغط الموجّه/السياق
> على طلب LLM الصادر (`chatCore.ts`، حول كتلة
> `resolveCompressionSettings`/`selectCompressionStrategy`)، وليس ضغط استجابة
> HTTP على أجسام 429 المُصنَّعة — فلا يوجد مسار كود مطابق لعلم تجاوز حرفي. كما
> أن خطوة ضغط الموجّه هذه تعمل حاليًا _قبل_ `withRateLimit()` في مسار الطلب،
> لذا فإن إعادة الترتيب لتخطّيها عند رفضٍ بسبب امتلاء قائمة الانتظار يُعدّ
> تغييرًا منفصلًا وأكبر من نطاق هذه المشكلة؛ وقد **لم** يُنفَّذ هنا عن قصد،
> وتُرك كمتابعة لاحقة إذا كانت فائدة توفير وحدة المعالجة المركزية تستحق
> مخاطرة إعادة الترتيب.

### شبكة أمان التفعيل التلقائي لحد المعدل وحماية الاتصال (`rateLimitProtection`)

**شبكة أمان التفعيل التلقائي** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`، الافتراضي `true`):
افتراضيًا، يُفعّل OmniRoute تلقائيًا حماية قائمة انتظار حد المعدل لجميع اتصالات مزوّدي مفاتيح API النشطة (`getProviderCategory(provider) === "apikey"`). يضمن هذا أن الطلبات الواردة إلى مفاتيح API المنبعية الحساسة للمعدل تُدرج في قائمة الانتظار وتُقيَّد عبر Bottleneck بدلًا من التدفق المفاجئ نحو أخطاء 429 من المنبع. يمكن تجاوز شبكة الأمان عبر متغير البيئة `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` للتعطيل، `true`/`1`/`on` للفرض)، والذي تكون له الأسبقية على إعداد لوحة التحكم المُخزَّن (**الإعدادات → المرونة** / `PATCH /api/resilience`).

**دلالات `rateLimitProtection` على مستوى كل اتصال:**
تُتتبَّع حماية حد المعدل لكل اتصال عبر الحقل المنطقي `rateLimitProtection` في اتصالات المزوّد (المُخزَّن باسم `rate_limit_protection` في SQLite):

- **التفعيل الصريح (`rateLimitProtection === true`)**: تُفعَّل حماية حد المعدل صراحةً لهذا الاتصال، بغض النظر عن فئة المزوّد أو عمّا إذا كانت شبكة أمان التفعيل التلقائي مُفعّلة.
- **التعطيل الصريح (`rateLimitProtection === false`)**: يُعطّل الحماية الصريحة، لكنه **لا** يُخرج اتصال مفتاح API نشطًا من نطاق شبكة أمان التفعيل التلقائي العامة. في `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`)، تكون `false` و`undefined` متكافئتين: فقط `rateLimitProtection === true` تُعامل بوصفها تجاوزًا صريحًا. إذا كانت `rateLimitProtection` تساوي `false` (أو غير مضبوطة)، فإن اتصال مفتاح API النشط يظل مطابقًا لشرط التفعيل التلقائي ويبقى محميًّا بحد المعدل.
- **لا يوجد استثناء على مستوى الاتصال**: لا يستطيع المشغّل حاليًا التعبير عن "يجب أن يعمل هذا الاتصال النشط الوحيد بمفتاح API دون حماية قائمة انتظار حد المعدل" مع إبقاء التفعيل التلقائي نشطًا للاتصالات الأخرى. لتشغيل اتصالات مفاتيح API دون قوائم انتظار حد المعدل تمامًا، يجب إيقاف شبكة الأمان عالميًا (`RATE_LIMIT_AUTO_ENABLE=false` أو `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**مسارات الكتابة المدعومة:**

- **`POST /api/rate-limits`**: مسار الكتابة الإداري المدعوم لتبديل `rateLimitProtection` لاتصالٍ ما (`{ connectionId: string, enabled: boolean }`). استدعاؤه مع `enabled: true` يُفعّل الحماية الصريحة؛ واستدعاؤه مع `enabled: false` يُزيل الحماية الصريحة (مع بقاء اتصالات مفاتيح API النشطة مشمولةً بشبكة الأمان العامة إذا كان التفعيل التلقائي مُفعّلًا).
- **`PUT /api/providers/[id]`**: عمدًا **لا** يقبل أو يبدّل `rateLimitProtection` (#11278). إن تحديث بيانات وصف اتصال المزوّد عبر `PUT /api/providers/[id]` لن يغيّر أبدًا حالة حماية حد المعدل المُخزَّنة.

---

## 6. مراقب إنتاجية التدفق البطيء (#9709)

يكتشف حارس `resilienceSettings.streamRecovery.throughputWatchdog` الاختياري المنبع الذي لا يزال يرسل قطعًا ولكنه ينتج مخرجات مساعدة أقل من معدل المخرجات المفيدة الذي تم تكوينه. إنه يختلف بشكل متعمد عن مهلة الخمول: لا يتم إعادة ضبط نبضات القلب وبيانات التعريف ولا يتم احتسابها كتقدم. وهو يختلف أيضًا عن الموعد النهائي للمحاولة الصعبة (#9153)، والذي يظل بمثابة سقف أمان مطلق بغض النظر عن جودة المخرجات.

تتطلب هيئة المراقبة فترة إحماء تليها نافذة متدحرجة كاملة قبل أن تتمكن من الإجهاض. فهو يحسب دلتا النص من إكمالات الدردشة والاستجابات لأحداث إخراج API (وكيل بايت UTF-8 محافظ)، ويتجاهل أحداث الاستخدام فقط والأحداث الفارغة، ويعلق الحكم أثناء تشغيل أحداث استدعاء الأدوات أو الاستدلال. يتم تعطيله افتراضيًا ويمكن تمكينه باستخدام `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (تعمل قيمة env هذه فقط على زرع — الافتراضي ويفوز منطقي `resilienceSettings.streamRecovery.throughputWatchdog.enabled` المحفوظ؛ راجع ملاحظة أسبقية env-vs-dashboard في الجزء العلوي من هذا الدليل)؛ النافذة، والإحماء، والحد الأدنى للمعدل، والحد الأدنى من المخرجات القابلة للقياس مقيدة بطبقة تطبيع إعدادات المرونة العادية.

عند التمكين، يتم تطبيق إحباط المراقبة فقط على محاولة المنبع النشطة. قبل أي وحدات بايت مرئية للعميل، قد يقوم مسار الاسترداد المبكر للحساب نفسه الموجود بإعادة فتح المحاولة. بعد الالتزام، لا يتم إعادة تشغيل البث بشكل أعمى أبدًا؛ فقط عقد الاستمرار الآمن في منتصف الدفق الحالي يمكنه خياطة لاحقة. تظل عملية الإنهاء بمثابة طلقة واحدة، لذا لا يتم تكرار حساب الاستخدام وإصدار الإشارة.

---

## 7. إعادة صياغة حالة الـ Upstream (أخطاء الحصة المُصنَّفة بشكل خاطئ)

**النطاق:** بوابة upstream واحدة تُبلغ عن استنفاد مؤقت للحصة برمز حالة HTTP خاطئ.

**الغرض:** تصحيح رمز حالة مضلِّل قبل التصنيف، حتى ترى المكوّنات اللاحقة (محرك الـ fallback، وتجميع الـ combo، والاستجابة الموجَّهة للعميل) الطبيعة الحقيقية القابلة لإعادة المحاولة للفشل.

بعض البوابات تُشير إلى استنفاد الحصة المؤقت برمز حالة HTTP غير قابل لإعادة المحاولة. يُعيد `agentrouter.org` الرمز `403` (وأحيانًا `400`) مع جسم استجابة بالصينية (`用户额度不足` / `额度不足`) بدلًا من الرمز القياسي `429`. عملاء مثل Claude Code يتعاملون مع `403` كخطأ دائم ويُنهون الجلسة، وبدون التصحيح سيُصنِّفه محرك الـ fallback كـ `AUTH_ERROR` بدلًا من حدث حصة.

**التنفيذ:**

- السجل + المطابِق: `open-sse/config/upstreamStatusRestatement.ts` — قائمة قواعد لكل مزوّد (`{id, fromStatuses, toStatus, textMarkers, excludeMarkers, defaultRetryAfterMs}`)، تُطابَق عبر `applyStatusRestatement()`.
- موضع الاستدعاء: كتلة `providerFailure:` في `open-sse/handlers/chatCore.ts` (حوالي السطر 3654)، مباشرةً بعد أن يُحلِّل `parseUpstreamError()` استجابة upstream تحمل رمز حالة خطأ HTTP (`!providerResponse.ok`)، وقبل تشغيل أي تصنيف، حتى يرى كل مستهلك لاحق الرمز المُصحَّح. الأخطاء المضمَّنة داخل تدفق SSE برمز `200` تسلك مسارًا منفصلًا ولاحقًا لتحليل التدفق و**لا** يغطيها هذا الخطاف حاليًا — وهو قيد معروف، غير مطلوب بعد لحالة رمز الحالة الخاطئ في agentrouter (الذي يظهر كرمز حالة خطأ HTTP).
- الأهلية لإعادة المحاولة: `429` موجود في `RETRY_AFTER_ELIGIBLE_STATUSES` (`open-sse/services/combo/unavailableRetryGate.ts`)، لذا يحمل الخطأ المُعاد صياغته نافذة إعادة محاولة حقيقية بدلًا من الظهور كـ `403` ميت.
- القيمة الاصطناعية `60s` في `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) هي فقط ما تُخبر به الاستجابة المُعاد صياغتها **العميل**؛ وليست بحد ذاتها مدة التبريد/الحظر الداخلية للاتصال — فتلك تُدار بشكل منفصل بواسطة أيّ آلية تتعامل فعليًا مع الخطأ المُعاد صياغته (التراجع المتصاعد في Connection Cooldown، §2، بقيمة أساسية `3s` لمزوّدي مفاتيح API؛ أو Model Lockout، §3، لمزوّدي الحصة لكل نموذج مثل agentrouter). قد يصبح الموجِّه مؤهلًا لإعادة المحاولة داخليًا قبل انقضاء نافذة الـ 60 ثانية التي يعلنها للعميل — وهامش مقصود، وليس خطأً.

الأخطاء الدائمة (خطأ `无权访问模型` في agentrouter — لا وصول إلى هذا النموذج) لا تُعاد صياغتها أبدًا: `excludeMarkers` ينقض القاعدة حتى عندما تتطابق `textMarkers`، فيحتفظ الخطأ برمز حالته الأصلي ولا يعيد أي شيء محاولته إلى الأبد. قاعدة التصنيف المطابقة للمزوّد (`agentrouter-model-access-denied` في `open-sse/config/providerErrorRules.ts`: `reason: "auth_error"`، و`scope: "model"`، ومدة تبريد أساسية مُعلنة قدرها `6h`) يستشيرها `checkFallbackError` (`open-sse/services/accountFallback.ts`) _قبل_ الإرجاع المبكر العام `FORBIDDEN` الخاص بفئة apikey، بشرط تحقق `honorsRuleLockScope(provider)` (‎#10334 — حصري حاليًا بـ agentrouter عبر قائمة السماح `HONORS_RULE_LOCK_SCOPE_PROVIDERS` في `providerErrorRules.ts`). مدة التبريد المُعلنة البالغة 6 ساعات في القاعدة تتدفق عبر `fallbackResult.baseCooldownMs`، لكنها لا تزال تغذّي مسار الحظر الموجود مسبقًا للحصة لكل نموذج (`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`، دون تغيير بسبب ‎#10334 باستثناء مصدر مدة التبريد): إذ تُقتَطع إلى حد `mlSettings.maxCooldownMs` الذي يضبطه المشغِّل (الافتراضي `1_800_000ms` / 30 دقيقة)، مثل أي حظر نموذج آخر، ويبقى _سبب الحظر المُخزَّن_ هو القيمة الثابتة الموجودة مسبقًا `"forbidden"`، وليس `"auth_error"` الخاص بالقاعدة — فمدة التبريد فقط هي المُطبَّقة من البداية إلى النهاية، وليس نص السبب. يبقى الاتصال نفسه نشطًا؛ والنماذج الشقيقة على الاتصال نفسه لا تتأثر.

أخطاء الحصة المُعاد صياغتها (`额度不足`) تصل إلى قاعدة مزوّد في بيئة الإنتاج (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`، و`scope: "connection"`، وبدون مدة تبريد مُعلنة خاصة بها — تسري القيمة الافتراضية للتراجع المُدرَّج في طبقة التخزين). منذ ‎#10334، يُستهلَك `scope` في `ProviderErrorRuleMatch` من البداية إلى النهاية فعليًا، لكن **فقط** للمزوّدين الموجودين في قائمة السماح `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` — اليوم `"agentrouter"` فقط، بشرط تحقق `honorsRuleLockScope()`). أما لكل مزوّد آخر فيبقى `scope` معلوماتيًا فقط، تمامًا كما كان قبل ‎#10334. يُظهِر `checkFallbackError` نطاق القاعدة المطابَقة عبر `fallbackResult.ruleScope`؛ و`isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) هو الحارس المشترك الذي يؤكد أن `ruleScope` آمن حقًا ليُعتمَد كإشارة ذاتية التعافي على مستوى الاتصال بأكمله (نطاق `"connection"`، وسبب `quota_exhausted`، وليس `permanent` أبدًا، وليس `creditsExhausted` أبدًا — دفاعًا ضد قاعدة مستقبلية تقترن فيها قيمة النطاق `"connection"` بحالة حساب دائمة). مستهلِكان يستدعيانه:

- **الاستمرارية** (`markAccountUnavailable()`، `src/sse/services/auth.ts`):
  بدلاً من السقوط في فرع القفل **لكل نموذج** الخاص بموفّر التمرير
  (حيث agentrouter هو `passthroughModels: true` → تُعيد `hasPerModelQuota()`
  القيمة `true`)، يُطبَّق **تبريد مؤقت للاتصال** —
  `testStatus: "unavailable"` + `rateLimitedUntil`، وليس أبدًا حالة نهائية
  (`credits_exhausted`/`banned`/`expired`) — بحيث يتعافى الاتصال ذاتيًا
  بمجرد انقضاء فترة التبريد بدلاً من اشتراط إعادة تعيين يدوية لبيانات
  الاعتماد. يتم تخطّي ذلك للاتصالات التي تحمل `disableCooling: true`
  (#2997): إذ يتحوّل هذا الانسحاب الاختياري بدلاً من ذلك إلى القفل لكل
  نموذج (مفاضلة موثّقة — راجع تعليق الشيفرة أعلى الفرع).
- **توجيه التوليفة ضمن الطلب نفسه** (`applyComboTargetExhaustion()`،
  `open-sse/services/combo/targetExhaustion.ts`): يضع الحارس نفسه علامة على
  الاتصال في مجموعة `exhaustedConnections` المخزّنة في الذاكرة، بمفتاح
  `${provider}:${connectionId}`. لا يتخطّى هذا إلا هدفًا متبقيًا ضمن الطلب
  نفسه _يحمل هو نفسه ذلك `connectionId` ذاته بالفعل_ على كائن الهدف الخاص به
  (`getExhaustedTargetSkipReason()`،
  `open-sse/services/combo/comboPredicates.ts`، `if (provider &&
connectionId)` قبل البحث في `exhaustedConnections`) — أما التوليفة
  البسيطة من قائمة نماذج، حيث لا تحمل الأهداف الشقيقة أي `connectionId`
  مثبّت خاص بها ولا يُحسم واحد إلا لكل إرسال من ترويسة الاستجابة
  `X-OmniRoute-Selected-Connection-Id`، فلا تصيب ذلك التطابق في المفتاح
  أبدًا. وفي هذه الحالة الشائعة، فإن الحماية الحقيقية من إعادة مرحلة
  متبقية استخدامَ الحساب الذي استُنفد للتو ليست هي هذه المجموعة (Set) — بل
  هي طبقة الاستمرارية أعلاه (حيث أصبح `rateLimitedUntil` الخاص بالاتصال
  الآن في المستقبل) مقترنةً بقيام هذا الحارس نفسه بكبت
  `transientRateLimitedProviders` لهذا الفشل (راجع «التصميم ثنائي المرحلة»
  وتعليق الشيفرة على فرع `isAgentrouterConnectionQuotaScope` في
  `targetExhaustion.ts`): ومع بقاء تلك المجموعة دون وسم، فإن السماح القسري
  `allowRateLimitedConnection` في `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`، `:2734-2738`) لا يتفعّل للمراحل
  المتبقية من الموفّر، ومن ثم يُحترَم مرشّح `rateLimitedUntil` الخاص
  باختيار بيانات الاعتماد (`src/sse/services/auth.ts:1238`) بشكل طبيعي،
  فتختار المرحلة المتبقية إما اتصال agentrouter مختلفًا لا يزال مؤهلاً،
  وإما أن تفشل بعدم توفّر بيانات اعتماد — فهي لا تشقّ طريقها قسرًا عائدةً
  إلى الاتصال الذي برّده هذا الفرع للتو.

### التصميم ثنائي المرحلة: إعادة صياغة الحالة، ثم التصنيف

تُعدّ إعادة صياغة الحالة (`upstreamStatusRestatement.ts`) وقواعد تصنيف
الموفّر (`open-sse/config/providerErrorRules.ts`، `providerRuleRegistry`)
سجلّين منفصلين يعتمد كلاهما على معرّف الموفّر وعلامات النص، لكنهما يعملان
في مواضع مختلفة ويخدمان أغراضًا مختلفة: فإعادة الصياغة تُعيد كتابة حالة
HTTP مبكرًا في `chatCore.ts`؛ بينما تختار قواعد التصنيف `reason` الاحتياطي
وتقفل `scope` (`model` / `provider` / `connection`) داخل
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

لا ترى قواعد التصنيف **نص** الخطأ الكامل (اللازم لمطابقة علامات الجسم مثل
`额度不足`) إلا للموفّرين المدرجين في القائمة البيضاء
`FULL_TEXT_RULE_PROVIDERS` في `providerErrorRules.ts` — وحاليًا
`"agentrouter"` فقط. أما لأي موفّر آخر من **الفهرس المدمج**، فإن
`checkFallbackError` يُسلّم إلى `getProviderErrorRuleMatch` الخطأ المنظَّم
فقط (`{code, type}`)، وهو ما يكفي للقواعد المعتمدة على
الترويسات/الحالة/الرمز، لكنه أعمى عن علامات نص الجسم. يجري المساعد
`resolveRuleMatchBody()` هذا الاختيار: نص الخطأ الكامل للموفّرين المدرجين
في القائمة البيضاء، والخطأ المنظَّم فيما عدا ذلك. تُعدّ إضافة موفّر
**مدمج** إلى `FULL_TEXT_RULE_PROVIDERS` اشتراكًا صريحًا يُمنح لكل موفّر
على حدة — وهي موجودة بحيث يبقى المسار الافتراضي لكل موفّر غير مدرج في
القائمة ثابتًا بايتًا ببايت.

يُعدّ `scope` الخاص بالقاعدة (`model` / `provider` / `connection`)
اشتراكًا منفصلاً عن `FULL_TEXT_RULE_PROVIDERS`: فـ `checkFallbackError` لا
يُظهره إلا كـ `fallbackResult.ruleScope`، والمستهلِكون اللاحقون لا
يحترمونه كشيءٍ يتجاوز كونه وسمًا معلوماتيًا إلا للموفّرين المدرجين في
القائمة البيضاء `HONORS_RULE_LOCK_SCOPE_PROVIDERS` في الملف نفسه (بتقييد
عبر `honorsRuleLockScope()` — واليوم `"agentrouter"` فقط). راجع «أخطاء
الحصة المُعاد صياغتها» أعلاه لمعرفة ما يفعله تطابق `scope: "connection"`
فعليًا بمجرد وجود موفّر في تلك القائمة البيضاء.

**#11104 — القواعد المُعلنة من المشغِّل تتجاوز كلتا القائمتين
البيضاوين.** يمكن للمشغِّل إعلان قاعدة لكل موفّر أثناء التشغيل عبر
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
دون تعديل هذا الملف. إن تقييد قاعدة مشغِّل خلف
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — وهما
قائمتان بيضاوان تهدفان إلى حماية السلوك **الافتراضي** لقواعد الفهرس
المدمجة — كان سيجعل آلية الإعدادات عديمة الجدوى لكل موفّر عدا تلك المدرجة
فيهما بالفعل، إذ إن إعلان القاعدة هو بحد ذاته اشتراك المشغِّل الصريح.
يتحقق كلٌّ من `resolveRuleMatchBody()` و`honorsRuleLockScope()` أولاً من
`hasOperatorRuleForProvider()`: فالموفّر الذي له قاعدة مشغِّل يحصل على نص
الخطأ الخام ويُحترَم `scope` المُعلن له، بغض النظر عما إذا كان يظهر أيضًا
في أيٍّ من القائمتين البيضاوين.

**فجوة معروفة — لا تتم استشارة `providerRuleRegistry` أبدًا لدى HTTP 400.** إن فرع `BAD_REQUEST` في `checkFallbackError` يصنّف الحالة 400
بالكامل عبر مصفوفات الأنماط الخاصة به (`MODEL_ACCESS_DENIED_PATTERNS`،
`CONTEXT_OVERFLOW_PATTERNS`، إلخ في `accountFallback.ts`) ويعود قبل بلوغ
فرع `configuredRule`/`getProviderErrorRuleMatch` الواقع أعلاه. إن قاعدة من
الفهرس المدمج (أو قاعدة مشغِّل) تحمل `status: 400` تكون صالحة من حيث
الصياغة لكنها لن تنطلق أبدًا. لا توجد اليوم أي قاعدة قائمة تستهدف 400،
لذا لا يتأثر أي شيء في بيئة الإنتاج — لكن أي قاعدة مستقبلية للحالة 400
تستلزم تعديل هذا الفرع أولاً، وهو تغيير أكبر من مجرد إضافة قاعدة (فهو
يُعيد تصنيف 400 لكل موفّر يعتمد بالفعل على سلوك مصفوفة الأنماط) ويخرج عن
نطاق إضافة قاعدة لموفّر واحد.

### إضافة بوابة جديدة تُسيء التصريح عن الحصة

1. سجّل مصفوفة قواعد واحدة في `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). اجعل `textMarkers`
   خاصةً بكل مزوّد؛ ولا تُعِد أبدًا استخدام عبارات إنجليزية عامة تتعارض مع
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. اختياريًا، سجّل قواعد التصنيف في
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) لاختيار
   نطاق القفل الصحيح (`connection` للحصة على مستوى الحساب، و`model`
   للأخطاء الخاصة بكل نموذج). لا تسري هذه الخطوة في بيئة الإنتاج إلا
   للمزوّدين الذين تحتاج قواعدهم إلى نص الخطأ الكامل (مؤشرات الجسم):
   أضِف معرّف المزوّد إلى `FULL_TEXT_RULE_PROVIDERS` في الملف نفسه —
   وإلا فإن `checkFallbackError` لن يُمرّر إلى القاعدة سوى الخطأ المهيكل
   `{code, type}`، ولن تتطابق قاعدة نص الجسم مع حركة المرور الفعلية أبدًا.
   أما القواعد التي تتطابق اعتمادًا على `status`/`headers` فقط (مثل قواعد
   Opencode أو Minimax) فلا تحتاج إلى هذا التفعيل الاختياري. وبشكل منفصل،
   إذا كانت القاعدة تُعلن `scope: "connection"` وكان المقصود هو فترة
   تهدئة فعلية على مستوى الاتصال مع تخطي التركيبة (combo) في الطلب نفسه
   (وليس مجرد وسم إعلامي)، فأضِف معرّف المزوّد إلى
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` في الملف نفسه — فهذا هو ما يتحكم في
   الاستهلاك على نمط `isAgentrouterConnectionQuotaScope()` داخل
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) و
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`)؛ وبدونه، يظل `scope`
   يتدفق عبر `fallbackResult.ruleScope` لكن لا شيء يتصرف بناءً عليه.
3. أضِف اختبارات وحدة تعكس `tests/unit/upstream-status-restatement.test.ts`
   و`tests/unit/agentrouter-error-rules.test.ts` (بما في ذلك فحوصات الحماية
   not-permanent / not-creditsExhausted، و— إذا كان المزوّد يحتاج إلى قائمة
   السماح — اختبارًا يؤكد أن `resolveRuleMatchBody()` يعيد النص الكامل
   لذلك المزوّد فقط).

لا حاجة إلى أي تغييرات في `chatCore.ts` أو `classifyError` أو combo.

#### قفل مُجمَّع حسب IP الصادر (#10880)

تُعامَل المزوّدات المدرجة في `EGRESS_BUCKETED_LOCK_PROVIDERS` (عائلة opencode)
بوصفها جهة عليا (upstream) مُجمَّعة حسب عنوان IP (فالطبقة المجانية من opencode
مُجمَّعة حسب IP وليس حسب الحساب — راجع #9611): فالخطأ من الحالة 429 المصنَّف
`quota_exhausted` **أو** `rate_limit_exceeded` يُدخل في فترة تهدئة كل اتصال
ينتمي إلى عائلة قائمة السماح ويتطابق آخر عنوان IP صادر معروف له مع عنوان
الاتصال الفاشل، قبل أن تتمكن عملية التدوير من تجربتها — متجنِّبًا بذلك N-1
من الاستدعاءات العلوية المضمونة الفشل (بالشكل نفسه كما في #10460/#10525).

تم تضمين `rate_limit_exceeded` عن قصد: ففي مسار `markAccountUnavailable`
لا تتطابق القواعد الخاصة بـ opencode أبدًا (إذ لا تُمرَّر أي ترويسات/جسم
إلى `checkFallbackError`، وopencode غير مدرج في `FULL_TEXT_RULE_PROVIDERS`)،
لذا فإن الخطأ 429 الذي يحمل جسده نص حصة الاشتراك ("monthly usage limit
reached") يُصنَّف `quota_exhausted` بواسطة آلية التراجع المستندة إلى نص
الحصة (`buildSubscriptionQuotaFallback`، `accountFallback.ts`؛ تهدئة لمدة
ساعة واحدة) قبل الوصول إلى قاعدة `status_429` أصلًا — بينما يُصنَّف الخطأ
429 الخالي من نص الحصة (تقييد معدل عادي) عبر قاعدة `status_429` بوصفه
`rate_limit_exceeded` ويظل يُدخل عائلة IP في فترة تهدئة. فبالنسبة إلى مزوّد
مدرج في قائمة السماح، يُعدّ حد المعدل المُجمَّع حسب IP الإشارة نفسها للحصة
المستنفدة. القيود الصريحة:

- **أفضل جهد ممكن**: يستخرج القفل آخر `egress_ip` معروف للاتصال من `proxy_logs` (نافذة 24 ساعة، بشكل متزامن، بدون ذاكرة تخزين مؤقت). في حال ذاكرة تخزين مؤقت باردة (لم يُفحص IP الخروج مطلقًا) أو عدم وجود صف → لا يزال الاتصال الفاشل يُبرَّد بواسطة الفرع (يُسجَّل كما هو الحال اليوم)، فقط لا يُقفَل أي شقيق.
- **ليس نهائيًا أبدًا**: فترة التبريد هي نافذة حصة متجددة (`testStatus: "unavailable"`)؛ لا تُشتق حالة دائمة أبدًا من إشارة على مستوى IP. تتخطى الاتصالات ذات `disableCooling` الفرع بالكامل.
- **تتغير دقة القفل للعائلة المدرجة في قائمة السماح**: هذا تغيير في النطاق، وليس مجرد تحسين للأشقاء. فـ opencode موفر `passthroughModels`، لذا قبل هذا الفرع كان خطأ 429 ينتج قفلًا لكل نموذج (MODEL)؛ أما الآن فينتج تبريدًا للاتصال — بما في ذلك لمشغّل يدير اتصالًا واحدًا دون أي شقيق على الإطلاق. هذه هي الدقة التي يعلن جدول قواعد opencode بالفعل أنها صحيحة (`scope: "connection"`، `providerErrorRules.ts`)، ولم تُحترم حتى الآن لأن opencode ليس في `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. يكتب الفرع تبريد الاتصال الفاشل + `backoffLevel` بنفسه، على غرار فرع agentrouter ذي النطاق على مستوى الاتصال، ثم يعود — لا يُصل أبدًا إلى الحظر لكل نموذج ولا إلى المسار العام أدناه.
- **يشمل Combo**: مثل فرع agentrouter، يتجاهل النطاق عمدًا تخفيض `persistUnavailableState`/`isCombo` الذي يطبقه متصل combo على خطأ 429. فالقفل لكل نموذج ليس شكلًا أضعف من هذا النطاق، بل هو الوحدة الخاطئة: إذ لا يقول شيئًا عن IP المستنفد، ولذا سيظل تدوير combo يحرق مكالمة واحدة مضمونة الفشل لكل شقيق.
- **أمان الأشقاء**: الشقيق الموجود أصلًا في حالة نهائية (banned/credits_exhausted) أو في تبريد أطول بالفعل لا تتم الكتابة فوقه أبدًا.
- **قائمة سماح حصرية**: توسيع `EGRESS_BUCKETED_LOCK_PROVIDERS` قرار صريح من المالك؛ لا يوجد ربط عام (النمط #10334/#10419). يربط استعلام الأشقاء قائمة السماح نفسها بدلًا من تكرارها كقيمة حرفية في SQL، لذا يبقى توسيعها تغييرًا في سطر واحد.
- **تدوير IP الخروج، في كلا الاتجاهين**: نافذة البحث (24 ساعة) أوسع بكثير من TTL لذاكرة التخزين المؤقت لـ IP الخروج (5 دقائق)، لذا فإن "آخر IP معروف" هو سجل تاريخي، وليس الحالة الحالية. إذا دار بروكسي الاتصال داخل النافذة، فقد **يفوت** القفل IP مشتركًا حقًا (الـ IP المسجل هو الجديد غير المستنفد) — وبالمثل قد **يبرّد شقيقًا دار منذ ذلك الحين بعيدًا** عن IP المستنفد. الحالة الثانية تكلف ذلك الشقيق نافذة تبريد واحدة؛ وكلاهما حدان مقبولان ضمن أفضل جهد ممكن لبحث قائم على السجل التاريخي.
- **التكلفة**: مسحان محدودان لـ `proxy_logs` (مُرشَّحان بالنافذة عبر `idx_pl_timestamp`)، فقط عند تكرار حدوث 429. لا فهرس جديد (ترحيل 134 YAGNI). قيست على نسخة من قاعدة بيانات بحركة مرور حقيقية متوسطة الحجم؛ وتحتفظ النسخة عالية الإنتاجية بعدد أكبر نسبيًا من الصفوف في النافذة نفسها.

---

## ميزات المرونة الأخرى

- **20 استراتيجية توجيه** (priority وweighted وround-robin وcontext-relay وfill-first وp2c وrandom وleast-used وcost-optimized وreset-aware وreset-window وheadroom وquota-weighted وstrict-random وauto وlkgp وcontext-optimized وcache-optimized وfusion وpipeline) — راجع [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **التوجيه الواعي بإعادة التعيين** (v3.8.0) — يمنح الأولوية للاتصالات بحسب وقت إعادة تعيين الحصة.
- **تدهور الوضع الخلفي** — يُرجَع `background: true` في Responses API إلى الوضع المتزامن مع تحذير.
- **الاكتشاف الديناميكي لحدود الأدوات** — يتراجع عن المزوّدين عند بلوغ حدود عدد الأدوات.
- **الاحتياط الطارئ** — يُتحكَّم به عبر `OMNIROUTE_EMERGENCY_FALLBACK`؛ ويمكن للمشغّلين تجاوزه من صفحة Feature Flags دون إعادة تشغيل.

---

## تصحيح الأخطاء

- يردّ الكومبو المرجّح بـ `503 all_targets_cooling_down` (مع تعيين `Retry-After`، ويسرد `diagnostics.excluded` كل هدف مع `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) ← المجموعة مُهيأة ومتصلة، وكل هدف مستبعَد فقط بفعل مؤقّت مرونة؛ وتحذير `[COMBO] Weighted selection: every target excluded before dispatch — …` يذكر الأسباب والثواني المتبقية. أما `404 no_executable_targets` من الكومبو نفسه فيعني أنه لم يتدخل أي مؤقّت مرونة (لا يوجد ما يمكن تشغيله، أو فشل كل حساب في فحص التوافر). بُني في `open-sse/services/combo/pinRecovery.ts` انطلاقًا من الاستبعادات المُجمَّعة في `targetResolution.ts`.
- تخطّي جميع مفاتيح أحد المزوّدين ← تحقّق من حالة قاطع الدائرة **ومن** `rateLimitedUntil`/`testStatus` لكل اتصال على حدة.
- استبعاد المزوّد نهائيًا بعد نافذة إعادة التعيين ← كود يقرأ `state` الخام بدلًا من `getStatus()`/`canExecute()`.
- فشل مفتاح واحد بينما يفترض أن تعمل البقية ← فضّل تهدئة الاتصال على قاطع الدائرة.
- فشل نموذج واحد فقط ← فضّل قفل النموذج على تهدئة الاتصال.
- يفترض أن تتعافى الحالة تلقائيًا لكنها لا تفعل ← تحقّق من وجود طابع زمني مستقبلي + مسار قراءة يُحدِّث الحالة المنتهية الصلاحية. الحالات الدائمة تتطلب تغييرات يدوية.

---

## حالة وقت التشغيل — مرجع سريع للوكيل

> نُقل حرفيًا من `AGENTS.md` ← "Resilience Runtime State" (PR #12743) كي يبقى دليل
> الوكيل ضمن ميزانية السياق 40k. وهو العرض المكثّف الموجَّه للوكيل للأقسام
> أعلاه؛ بينما تبقى الأقسام المرقّمة هي المرجع الكامل.

تملك OmniRoute ثلاث آليات متقاربة لكنها متميزة للفشل المؤقت. حافظ على فصل
نطاقاتها عند تصحيح سلوك التوجيه. اطلع على
[مخطط المرونة ثلاثي الطبقات](../diagrams/exported/resilience-3layers.svg)
(المصدر: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
للحصول على خريطة شاملة بنظرة واحدة.

### قاطع دائرة المزوّد

**النطاق**: المزوّد بالكامل، مثل `glm` و`openai` و`anthropic`.

**الغرض**: إيقاف إرسال حركة المرور إلى مزوّد يفشل بشكل متكرر على مستوى
المنبع/الخدمة، حتى لا يتسبب مزوّد واحد غير سليم في إبطاء كل طلب.

**التنفيذ**:

- الفئة الأساسية: `src/shared/utils/circuitBreaker.ts`
- توصيل بوابة الدردشة/التنفيذ: `src/sse/handlers/chatHelpers.ts` و`src/sse/handlers/chat.ts`
- واجهة برمجة تطبيقات حالة وقت التشغيل: `src/app/api/monitoring/health/route.ts`
- الأغلفة المشتركة: `open-sse/services/accountFallback.ts`
- جدول الحالة المُخزَّن: `domain_circuit_breakers`

**الحالات** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: يُسمح بحركة المرور العادية.
- `DEGRADED`: نطاق إنذار مبكر — تجاوزت حالات الفشل عتبة التدهور لكنها لم تبلغ
  عتبة القاطع بعد؛ تستمر حركة المرور، وتعرض لوحات المعلومات التحذير. يعيدها اختبار
  اتصال ناجح أو نافذة هدوء دون فشل جديد إلى `CLOSED`
  (نافذة الزمن موضحة في `docs/architecture/RESILIENCE_GUIDE.md`).
- `OPEN`: المزوّد محظور مؤقتًا؛ يتلقى المتصلون استجابة «دائرة المزوّد مفتوحة»
  أو يتخطى توجيه الكومبو إلى هدف آخر.
- `HALF_OPEN`: انقضت مهلة إعادة التعيين؛ يُسمح بطلب فحص. النجاح يغلق
  القاطع، والفشل يعيد فتحه.

**الإعدادات الافتراضية** (`open-sse/config/constants.ts` ← `PROVIDER_PROFILES`، تُستهلك عبر
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` في `src/lib/resilience/settings.ts` ←
`getCircuitBreaker(provider, …)` في `src/sse/handlers/chatHelpers.ts`). يعمل قاطع المزوّد
الكامل على `circuitBreakerThreshold` / `circuitBreakerReset`:

| الملف     | يتدهور عند | يفتح عند (`circuitBreakerThreshold`) | إعادة التعيين (`circuitBreakerReset`) |
| --------- | ---------: | -----------------------------------: | ------------------------------------: |
| OAuth     |        `5` |                                  `8` |                                 `60s` |
| مفتاح API |        `7` |                                 `12` |                                 `30s` |
| محلي      |    (مشتقّ) |                                  `2` |                                 `15s` |

يعرّف `PROVIDER_PROFILES` أيضًا `providerFailureThreshold` (10/15/2) و
`providerFailureWindowMs` (15/30/5 دقائق) و`providerCooldownMs` (5/10/1 دقائق): وهذه تشغّل
**بوابة النافذة الزمنية لميزة تهدئة المزوّد العامة الاختيارية** (`PROVIDER_COOLDOWN_ENABLED`، معطّلة
افتراضيًا) — فلا يُحتسب الإدخال على مستوى المزوّد في `open-sse/services/providerCooldownTracker.ts`
كتهدئة إلا بعد `providerFailureThreshold` من حالات الفشل داخل `providerFailureWindowMs`، ثم
يهدأ لمدة `providerCooldownMs`. هذه **ليست** عتبات القاطع الفعلي — لا تضبطها
متوقعًا سلوك القاطع. كل قيمة افتراضية قابلة للتجاوز عبر متغيرات البيئة
`OMNIROUTE_PROVIDER_BREAKER_*` و`OMNIROUTE_CIRCUIT_BREAKER_*`؛
وجدول المرجع الدقيق لوقت التشغيل موجود في `docs/architecture/RESILIENCE_GUIDE.md`.

يجب ألا تُفعِّل قاطع المزوّد إلا رموز حالة الفشل على مستوى المزوّد:

```ts
(408, 500, 502, 503, 504);
```

لا تُفعِّل قاطع المزوّد الكامل بسبب أخطاء الحساب/المفتاح/النموذج المعتادة مثل معظم
حالات `401` أو `403` أو `429`. تلك تنتمي عادةً إلى تهدئة الاتصال أو قفل
النموذج. ويجب أن تكون حالة `403` من مزوّد بمفتاح API عام قابلة للاسترداد ما لم تُصنَّف
كخطأ نهائي على مستوى المزوّد/الحساب.

يستخدم المُقطِّع (breaker) الاسترداد الكسول (lazy recovery)، وليس مؤقّتًا يعمل في الخلفية. عندما تنتهي صلاحية الحالة `OPEN`، فإن عمليات القراءة مثل `getStatus()` و`canExecute()` و`getRetryAfterMs()` تُحدِّث الحالة إلى `HALF_OPEN`، بحيث لا تستمر لوحات المراقبة ومُنشئات المرشّحين المدمجة في استبعاد مزوّد منتهية صلاحيته إلى الأبد.

### فترة تهدئة الاتصال (Connection Cooldown)

**النطاق**: اتصال/حساب/مفتاح واحد للمزوّد.

**الغرض**: تخطّي مفتاح/حساب معيب مؤقتًا مع السماح للاتصالات الأخرى لنفس المزوّد بمواصلة خدمة الطلبات.

**التنفيذ**:

- مسار الكتابة/التحديث: `src/sse/services/auth.ts::markAccountUnavailable()`
- اختيار الحساب/تصفيته: `src/sse/services/auth.ts::getProviderCredentials...`
- حساب فترة التهدئة: `open-sse/services/accountFallback.ts::checkFallbackError()`
- الإعدادات: `src/lib/resilience/settings.ts`

الحقول المهمة في اتصالات المزوّد:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

أثناء اختيار الحساب، يتم تخطّي الاتصال طالما:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

فترات التهدئة كسولة أيضًا: عندما يصبح `rateLimitedUntil` في الماضي، يصبح الاتصال مؤهَّلًا مرة أخرى. وعند الاستخدام الناجح، يقوم `clearAccountError()` بمسح `testStatus` و`rateLimitedUntil` وحقول الأخطاء و`backoffLevel`.

السلوك الافتراضي لفترة تهدئة الاتصال:

- فترة التهدئة الأساسية لـ OAuth: ‏`5s`.
- فترة التهدئة الأساسية لمفتاح API: ‏`3s`.
- عند حدوث الخطأ `429` لمفتاح API، يجب تفضيل تلميحات إعادة المحاولة الواردة من المصدر (`Retry-After`، أو ترويسات إعادة الضبط، أو نص إعادة ضبط قابل للتحليل) عند توفّرها.
- الإخفاقات المتكررة القابلة للاسترداد تستخدم التراجع الأُسّي (exponential backoff):

```ts
baseCooldownMs * 2 ** failureIndex;
```

يمنع حارس مكافحة تأثير القطيع المدوّي (anti-thundering-herd) الإخفاقات المتزامنة على نفس الاتصال من إطالة فترة التهدئة بشكل متكرر أو زيادة `backoffLevel` مرتين.

الحالات النهائية (Terminal states) ليست فترات تهدئة. فالحالات `banned` و`expired` (التي تصبح نهائية فقط بعد N من المحاولات المحدودة عبر `EXPIRED_RETRY_MAX`) و`credits_exhausted` مُصمَّمة لتبقى غير متاحة حتى تتغيّر بيانات الاعتماد/الإعدادات أو يقوم المشغِّل بإعادة ضبطها. لا تكتب فوق الحالات النهائية بحالة تهدئة عابرة.

### حظر النموذج (Model Lockout)

**النطاق**: المزوّد + الاتصال + النموذج.

**الغرض**: تجنّب تعطيل اتصال كامل عندما يكون نموذج واحد فقط غير متاح أو محدود الحصة لذلك الاتصال.

أمثلة:

- مزوّدون بحصص لكل نموذج يُرجعون `429`.
- مزوّدون محليون يُرجعون `404` لنموذج واحد مفقود.
- إخفاقات أذونات الوضع/النموذج الخاصة بالمزوّد، مثل أوضاع Grok المحدَّدة.

يوجد حظر النموذج في `open-sse/services/accountFallback.ts` ويسمح لنفس الاتصال بمواصلة خدمة النماذج الأخرى.

### إرشادات تصحيح الأخطاء

- إذا تم تخطّي جميع مفاتيح أحد المزوّدين، افحص كلًّا من حالة مُقطِّع المزوّد و`rateLimitedUntil`/`testStatus` لكل اتصال.
- إذا بدا أن أحد المزوّدين مستبعَد بشكل دائم بعد نافذة إعادة الضبط، تحقّق ممّا إذا كان الكود يقرأ `state` الخام بدلًا من استخدام `getStatus()`/`canExecute()`.
- إذا فشل أحد مفاتيح المزوّد بينما يُفترض أن تعمل المفاتيح الأخرى، فضِّل فترة تهدئة الاتصال على مُقطِّع المزوّد.
- إذا فشل نموذج واحد فقط، فضِّل حظر النموذج على فترة تهدئة الاتصال.
- إذا كان يُفترض أن تتعافى حالة ما تلقائيًا، فيجب أن تحتوي على طابع زمني مستقبلي/مهلة إعادة ضبط ومسار قراءة يُحدِّث الحالة المنتهية الصلاحية. أما الحالات الدائمة فتتطلب تغييرات يدوية في بيانات الاعتماد أو الإعدادات.

---

## بصمات TLS والتخفي

التخفي الخاص بكل مزوّد (JA3/JA4 وCCH والتشويش) موثَّق بشكل منفصل — راجع `docs/security/STEALTH_GUIDE.md` (في git؛ غير مُجمَّع ضمن `/docs`).

---

## اختبار المرونة (المرحلة 8 · الكتلة C)

إلى جانب اختبارات الوحدة لمنطق المرونة، تُخضِع ثلاثة اختبارات بيئة التشغيل
لظروف ضغط/فشل حقيقية (جميعها اختبارات تكامل/ليلية — ولا يمنع أيٌّ منها طلبات الدمج PRs):

| الاختبار    | الوظيفة                                                                                                                                                                | التشغيل                               |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| الفوضى      | عقدة upstream وهمية تحقن زمن استجابة/إعادة تعيين/مهلة/503 حقيقية؛ تتحقق من أن قاطع الدائرة يفتح ويتعافى وأن `checkFallbackError` يصنّف 503 كـ fallback قابل للاسترداد. | `RUN_CHAOS_INT=1 npm run test:chaos`  |
| نمو الذاكرة | نحو 500 تدفق لكل `createSSEStream` تحت `--expose-gc`؛ يفشل إذا تجاوز نمو الـ heap الحد الأقصى (حارس OOM رقم #3069).                                                    | `npm run test:heap`                   |
| نقع k6      | حمل مستدام على `/api/monitoring/health`؛ عتبات p95/الأخطاء.                                                                                                            | `k6 run tests/load/k6-soak.js` (ليلي) |

يُنسَّق عبر `.github/workflows/nightly-resilience.yml` (cron + dispatch). في
`test:integration` الافتراضي، يتخطى اختبارا الفوضى والذاكرة نفسيهما تلقائيًا (دون `RUN_CHAOS_INT`/`--expose-gc`).

---

## انظر أيضًا

- [دليل البنية](./ARCHITECTURE.md) — بنية النظام وتفاصيله الداخلية
- [دليل المستخدم](../guides/USER_GUIDE.md) — المزوّدون والتركيبات والتكامل مع CLI
- [محرك التركيب التلقائي](../routing/AUTO-COMBO.md) — تسجيل بـ 16 عاملًا، وحزم الأوضاع
