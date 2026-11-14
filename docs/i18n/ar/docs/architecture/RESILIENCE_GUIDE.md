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

**تأخير إعادة المحاولة لكل موفر.** تحتوي صفحة تفاصيل الموفر على** إعادة محاولة التأخير** حدد (تلقائي، 15 ثانية حتى 1 ساعة). يحفظ `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600، من خلال `PATCH /api/resilience`). عندما لا يحمل خطأ حد المعدل أي تلميح لإعادة المحاولة الأولية، تحل هذه القيمة محل التراجع المقاس للموفر وتعيد تعيين `backoffLevel` إلى 0 (`open-sse/services/rotationConfig.ts::overrideFor`). الأسبقية للخطأ محدود المعدل، الأعلى أولاً: تلميح إعادة المحاولة الأولية، ثم `providerSpecificData.rotationOverrides.rateLimitResetSeconds` لكل اتصال، ثم تأخير إعادة المحاولة لكل موفر، ثم env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`، ثم التراجع المقيس. يقوم تلقائيًا بإزالة الحقل. إنه يؤثر فقط على سبب الحد الأقصى للمعدل، ولا يؤثر أبدًا على الحالات النهائية.

**حارس القطيع ضد الرعد:** يمنع حالات الفشل المتزامنة من الإفراط في تمديد فترة التهدئة أو زيادة `backoffLevel` بشكل مزدوج.

**الحد الأقصى للتزامن 429 لا يتسلق سلم التراجع.** `429` الذي يُبلغ جسمه عن حد التزامن ("عدد كبير جدًا من الطلبات المتزامنة"، "حد التزامن"، "حد الطلب الموازي"، GLM `并发数过高`) يعني أن الحساب سليم ولكنه مشغول. يقوم `checkFallbackError()` بإرجاع السبب `concurrency_limited`: فشل في الاتصال التالي الآن، وقم بتبريد هذا الاتصال للحصول على `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) ثابت أو تلميح إعادة المحاولة الأولي، واحتفظ `backoffLevel` دون تغيير، وقم بتعيين `skipProviderBreaker`. لا تزال هيئة الحصص الصريحة تفوز، وبالتالي فإن الهيئة التي تتطابق أيضًا مع نمط الحصص تظل بمثابة حكم الحصص. الكشف: `looksLikeConcurrencyLimit()` في `src/shared/utils/classify429.ts`؛ الحكم: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` ( `FailureKind` للكسارة) لم يتغير ولا يزال يقرأ `rate_limit` لهذه الأجسام.

**أكشاك محتوى الدفق لا تعمل على تبريد الحساب.** عندما تتخلى هيئة مراقبة كشك المحتوى (`open-sse/utils/streamHandler.ts`) عن دفق لم يرسل أي مخرجات نموذج في الوقت المناسب، يسجل `markAccountUnavailable()` الخطأ في الاتصال ولكنه لا يحدد أي فترة تباطؤ: ينتمي الكشك إلى هذا الطلب، وغالبًا ما يكون ذلك بمثابة دورة تفكير طويلة بدون أي إخراج حتى الآن. يمكن للمشغلين الاشتراك مرة أخرى باستخدام `resilienceSettings.streamStallCooldown.enabled` (الافتراضي `false`).

**الاشتراك في إشارة الكمون لاختيار حساب `p2c`.** تسجل كل محاولة مرسلة الوقت حتى البايت الأول والنتيجة لكل اتصال (ولكل نموذج اتصال + ) في نافذة متجددة في الذاكرة: آخر 20 عينة في غضون 15 دقيقة (`open-sse/services/connectionLatencyTracker.ts`، مسجلة من `safeLogEvents()` في `src/sse/handlers/chatHelpers.ts`). عندما يكون `resilienceSettings.p2cLatency.weight` أعلى من `0` (النطاق 0-20، الافتراضي `0` = متوقف)، يضيف `compareP2CConnections()` في `src/sse/services/auth.ts` ما يصل إلى نقاط `weight` لكل مرشح من الزوج. يأتي نصف ذلك من زمن الوصول كنسبة إلى المرشح الأسرع (ضعف البطيء الذي يأخذ النصف الكامل) والنصف الآخر من معدل الخطأ المتداول. ينطبق هذا المصطلح فقط عندما يكون لدى كلا المرشحين 3 عينات على الأقل، لذلك لا يتم معاقبة الحسابات الجديدة، ويظل سقفها أقل من العقوبات المحظورة والمستنفدة للحصة. إنها لا تضيف أي دائرة خاصة بها: لا تزال الحسابات الفاشلة تتم معالجتها من خلال طبقات التهدئة والتأمين والكسر. اضبطه باستخدام `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**تعمل إطارات الاستدلال على إعادة تشغيل ميزانية كشك المحتوى.** يمكن لنموذج الاستدلال أن يفكر لدقائق قبل أول رمز مرئي له: Claude يبث إطارات `thinking_delta` التي قد يكون نص تفكيرها فارغًا، ويقوم الردود API بتدفق عنصر استدلال تلو الآخر. يتعرف `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) على هذه الإطارات، وتعيد هيئة المراقبة تشغيل ميزانيتها لكل إطار بدلاً من إلغاء الدور. ما زالوا ليسوا مخرجات نموذجية، لذا فإن الدور الذي ينتهي بالاستدلال فقط لا يزال يتم الإبلاغ عنه على أنه فارغ، والدور الذي يتوقف عن الاستدلال ويرسل نبضات القلب فقط لا يزال يعطل المراقبة.

إطارات `reasoningContentEvent` الثنائية لـ Kiro ذات التوقيع غير الفارغ تحافظ على نشاط الاستدلال هذا من خلال المنفذ باعتباره دلتا `reasoning_content` فارغة. لا يتم إعادة توجيه التوقيع. البيانات التعريفية والإطارات غير المكتملة والتوقيعات الفارغة لا تؤدي إلى إعادة تشغيل ميزانية المحتوى؛ لا يزال تطبيق مهلة البث النشط المستقل وإلغاء العميل (`open-sse/executors/kiro/reasoning.ts`).

**الحالات الطرفية (فترات التهدئة NOT ):**

- تم تعيين `banned` — بواسطة اكتشاف حظر الكلمات الرئيسية / الحساب (راجع [BAN_DETECTION](../security/BAN_DETECTION.md) ). لا يتم ضبط حالات رفض الطلب المنبع (`request_rejected`، على سبيل المثال Anthropic OAuth 403 "الطلب غير مسموح به"): يتم حسابها لكل اتصال ونموذج ويتم إخراج هذا النموذج من التدوير مع فترة تهدئة متزايدة متوجة بـ `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 ساعة)، أو تبريد الاتصال عندما لا يكون هناك نموذج معروف — `open-sse/services/requestRejectedStreak.ts`
- `expired` (الانتقالات إلى المحطة بعد إعادة المحاولة المقيدة — `EXPIRED_RETRY_MAX = 3` مع التراجع الأسي — بحيث يمكن إصلاح أخطاء OAuth العابرة ذاتيًا قبل إلغاء تنشيط الحساب نهائيًا)
- `credits_exhausted`

وتستمر هذه حتى تتغير بيانات الاعتماد أو يقوم المشغل بإعادة تعيينها. لا تقم بالكتابة فوق الحالات الطرفية بحالة التباطؤ العابرة.

**التعافي البطيء:** عندما تنتهي `rateLimitedUntil` ، يصبح الاتصال مؤهلاً مرة أخرى. عند الاستخدام الناجح، يقوم `clearAccountError()` بمسح كافة حقول الخطأ.

### جدار استخدام Claude OAuth : إعادة ضبط حد جلسة + ذات الأولوية المنخفضة

**نِطَاق:** اتصال اشتراك Claude واحد (OAuth). كلا الميزتين** الاشتراك لكل اتصال** (تحرير قسم الاتصال → Claude → `lowPriorityMode` / `autoLimitReset` في `providerSpecificData`، وكلاهما متوقفان عن العمل بشكل افتراضي) وعكس أوامر `/low-priority` و `/limit-reset` الخاصة بـ Claude Code (عقد سلكي تم التقاطه من Claude Code 2.1.263).

**تطبيق:**

- تصنيف استجابة آلة الدولة + : `open-sse/services/claudeLowPriority.ts`
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

### تطبيق عمليات إعادة التعيين المصرفية تلقائيًا

**نِطَاق:** اتصالات الاشتراك Codex و Claude (OAuth).** الاشتراك** : إعداد `bankedResetAutoApply` متوقف عن التشغيل وفي وضع `dry-run` افتراضيًا (الإعدادات → AI → تطبيق عمليات إعادة التعيين البنكية تلقائيًا).

**غاية:** إنفاق عمليات إعادة التعيين المخزنة من تلقاء نفسها عندما يصل الحساب إلى حد الاستخدام، بدلاً من انتظار عامل التشغيل للضغط على "استرداد" في صفحة حدود الموفر.

| نوع الائتمان (`creditTypes`) | ما يتم خلاصه                                   | حيث يتم تشغيله                                              |
| ---------------------------- | ---------------------------------------------- | ----------------------------------------------------------- |
| `codexCredits`               | إعادة تعيين الاعتمادات Codex                   | وظيفة الخلفية، كل 60 ثانية                                  |
| `claudeCredits`              | المنح المصرفية Claude (اعتمادات `GRANT` )      | وظيفة الخلفية، كل 60 ثانية                                  |
| `claudeSessionReset`         | إعادة تعيين حد الجلسة الأسبوعية Claude (أعلاه) | مسار الطلب، من خلال نفس السياسة المتبعة في التبديل لكل حساب |

**تطبيق:**

- قرار خالص (قاعدة واحدة محددة لكلا المسارين): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- الوظيفة الخلفية: `src/lib/services/bankedResetAutoApply.ts` (بدأت في `src/instrumentation-node.ts`)
- بوابة مسار طلب Claude : `src/lib/usage/claudeSessionResetPolicy.ts`، مسجلة من خلال `setClaudeLimitResetPolicy()` في `open-sse/services/claudeLimitReset.ts`
- التاريخ والقبعات وخطاف الويب: `src/lib/usage/bankedResetAudit.ts`
- التاريخ API: `GET /api/settings/banked-reset-auto/history?limit=50` (مصادقة الإدارة)

**أمر القرار** (القاعدة الأولى الفاشلة هي السبب المسجل):

1. تم إيقاف الميزة، أو إيقاف نوع الائتمان، أو الحساب خارج النطاق (`accountScope` `all` / `selected` بالإضافة إلى خريطة `connections` لكل حساب).
2. خارج جدول UTC الاختياري (`startHourUtc` > `endHourUtc` يعبر منتصف الليل).
3. الحد الأقصى خلال آخر 24 ساعة: `maxPerAccountPerDay` (1)، `maxPerDay` (3)، و `minSpacingMinutes` (30) بين أي عمليتي استرداد.
4. المشغل: نافذة `session` أو `weekly` مسورة (اقرأ من `getQuotaWindowStatus().reachedThreshold`، وليس `isAccountQuotaExhausted()`، والتي تبلغ فقط عن حساب مع كل نافذة يتم إنفاقها)، أو رصيد تنتهي صلاحيته خلال `expiringCreditHours` (24) على حساب استخدم `expiringCreditMinUsedPercent` (50) على الأقل.
5. حماية إعادة الضبط الطبيعية: قم بالتخطي عند إعادة ضبط النافذة المسورة لمدة 5 ساعات ضمن `sessionResetGuardMinutes` (90)، أو النافذة الأسبوعية المسورة داخل `weeklyResetGuardHours` (12).
6. الحد الأسبوعي: قم بتخطي إعادة التعيين لمدة 5 ساعات عندما يكون المتبقي الأسبوعي أقل من `weeklyFloorPercent` (10).
7. وضع `last-resort` : تخطي بينما يكون لدى حساب آخر داخل النطاق لنفس الموفر ما لا يقل عن `poolHeadroomPercent` (10) متبقي في كلا النافذتين. تتجاوز مشغلات انتهاء صلاحية الائتمان هذا.
8. `dry-run` يسجل صفًا ولا يسترد شيئًا؛ تخليص `last-resort` و `eager`.

لا تؤدي بيانات الحصة المفقودة إلى فتح أي عملية استرداد أبدًا: وقت إعادة تعيين غير معروف أو تخطي الاستخدام الأسبوعي.

**إعادة تعيين جلسة Claude :** مع إيقاف تشغيل الميزة، أو إيقاف تشغيل `claudeSessionReset` ، يقرر تبديل `autoLimitReset` لكل حساب تمامًا كما كان من قبل. مع تشغيل كليهما، تحل الميزة محل مفاتيح التبديل لكل حساب: لا يجوز للحساب داخل النطاق المطالبة إلا عندما تسمح السياسة بذلك، وفي وضع `dry-run` لا يتم تقديم أي مطالبة.

**أمان:** تسترد الوظيفة رصيدًا واحدًا على الأكثر لكل علامة، وتقرر قبل إدراج الاعتمادات (لا يتم إدراج الحساب الذي تم تخطيه أبدًا)، وتستخدم مفاتيح العجز `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>`، وتدعم إيقاف الحساب لمدة ساعة واحدة بعد الإدراج أو الاسترداد الفاشلين. تتم كتابة كل قرار استرداد وفشل وقرار تجريبي إلى `audit_log` (`action: "bankedReset.redeem"`، بدون رموز أو معرفات ائتمانية)؛ يتم حساب الأحرف الاستهلالية من تلك الصفوف، بحيث تظل قابلة لإعادة التشغيل. تعمل عمليات الاسترداد الناجحة أيضًا على تشغيل خطاف الويب `provider.reset_redeemed`.

حراس الانحدار: `tests/unit/banked-reset-policy.test.ts`، `tests/unit/banked-reset-auto-apply.test.ts`، `tests/unit/claude-limit-reset-policy-gate.test.ts`، `tests/unit/banked-reset-history-route.test.ts`.

### تقارب الجلسة (#7274)

**نِطَاق:** جلسة عميل واحدة (رأس `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` ) مثبتة على اتصال واحد، لـ** أي** مزود.

**غاية:** احتفظ بوكيل متعدد المنعطفات (رمز Claude ، ومساعد، ووكلاء مخصصين) على نفس الحساب عبر الطلبات، مما يقلل من فقدان السياق عبر الحسابات وتكرار البدء البارد 429 على مقدمي الخدمة الذين لديهم حالة جلسة لكل حساب.

**تطبيق:**

- قرار TTL : `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- دبوس selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- استخراج الرأس (عام، أي مزود): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- جدول الدبوس المستمر: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- الإعداد: `sessionAffinityTtlMs` ( TTL العام في مللي ثانية، تعطيل `0` ) — `src/lib/db/settings.ts`. تمت إعادة تسميته من `codexSessionAffinityTtlMs` المخصص للمخطوطة فقط بواسطة الترحيل `124_generic_session_affinity_ttl.sql`، والذي ينقل أي Codex TTL الذي تم تكوينه مسبقًا باعتباره الإعداد الافتراضي الجديد.

قبل #7274، كان `resolveSessionAffinityTtlMs()` مقيدًا بـ `0` لكل مزود باستثناء `codex`، لذلك لم يكن لإعداد TTL (ورؤوس الجلسة) أي تأثير في أي مكان آخر على الرغم من أن آلية التثبيت واستخراج الرأس كانت بالفعل غير محددة للموفر. أزال الإصلاح هذا الإرجاع المبكر؛ ينطبق TTL الآن بشكل موحد على كل مزود بمجرد تعيينه عالميًا فوق `0`.

لا يتم إعادة توجيه رؤوس تقارب الجلسة الثلاثة مطلقًا. يقوم منفذو — ببناء رؤوسهم الأولية من البداية بدلاً من تمرير رؤوس العميل من خلالها، لذلك يظل هذا معرف ارتباط داخلي فقط.

### عقود إيجار اتصال الجلسة المُدارة الحصرية

**نِطَاق:** يمتلك HTTP client/session المُدار النشط اتصال OmniRoute مؤهل واحد.

**غاية:** توفير ملكية اتصال حصرية دائمة للعملاء الذين يحتاجون إلى سياج توجيه صعب عبر الطلبات. وهذا يختلف عن تقارب الجلسة، وهو تفضيل استمرارية ناعمة: يستمر عقد الإيجار الحصري في حالة دورة الحياة في SQLite، ويفرض تفردًا عالميًا للمالك النشط والاتصال النشط، ويرفض الجيل القديم قبل إرسال الموفر.

الميزة هي الاشتراك لكل مفتاح API. يجب أن يحتوي المفتاح المُدار على نطاق `lease:exclusive` وقائمة `allowedConnections` صريحة وغير فارغة. يمكن لأي عميل HTTP استخدام نقطة نهاية دورة الحياة؛ لا يلزم وجود اسم عميل أو وكيل مستخدم أو موفر أو طريقة OAuth أو نموذج. يمتلك عقد الإيجار اتصالاً، وليس نموذجًا، لذا فإن تغيير النموذج يحتفظ بالربط بينما يظل الاتصال مؤهلاً بشكل عادي. تظل قواعد النموذج العادي والحصة النسبية والصحة والتهدئة والقائمة المسموح بها موثوقة وقد تنقل نفس الجيل إلى اتصال مؤهل مجاني آخر.

دورة الحياة هي `POST /api/v1/session-leases` مع إجراءات JSON `acquire` و `renew` و `release`. تقدم طلبات الاستدلال المُدارة قيمة `X-OmniRoute-Lease-Owner` غير الشفافة و `X-OmniRoute-Lease-Generation` بالضبط. يستخدم المالك `vlo_` متبوعًا بـ 43 حرفًا أساسيًا64url؛ يتم تخزين تجزئة SHA-256 الخاصة به فقط. يربط كل سياج إرسال نهائي أيضًا مفتاح API المصادق عليه ID والاتصال النشط ID. تتم إزالة رؤوس التحكم في الإيجار من السجلات، ولقطات الطلب التي تم الاحتفاظ بها، ورؤوس المنفذ الرئيسي.

إذا كان التوجيه العادي يحتوي على مرشحين مُدارين مؤهلين ولكن كل مرشح حر مشغول بعقد إيجار أجنبي نشط، OmniRoute تُرجع HTTP `429` ورمز سعة الإيجار غير المتاحة وحالة انتظار السعة و `Retry-After` المحدود المشتق من أقرب انتهاء صلاحية ذي صلة. الأهلية الفارغة العادية ليست تنافسًا على عقد الإيجار وتحتفظ بدلالات خطأ التوجيه الحالية الخاصة بها.

تظل الآليات ذات الصلة منفصلة:

- إشغال جلسة OAuth هو التوزيع الناعم للعملية المحلية لحسابات OAuth.
- تمنح إشارات الحساب تصاريح تزامن الطلب وتنتهي عند اكتمال الطلب.
- تعد عقود إيجار الجلسة المُدارة الحصرية ملكية دائمة طوال دورة الحياة مع سياج جيل.

---

## 3. إيقاف النموذج

**النطاق:** ثلاثية المزوّد + الاتصال + النموذج.

**تحديد النطاق حسب الحالة:** تحدد الحالة الفاشلة المفتاح الذي يكتب فيه الإيقاف
(`resolveLockoutScope()` في `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — إشارة إلى الحصة أو الاستحقاق — يتم إيقاف **عائلة
  الحصة**:
  بالنسبة إلى codex، يكون النطاق الكامل `codex` / `spark` (كل نموذج
  `gpt-5*` للاتصال)، وبالنسبة إلى المزوّدين الآخرين، يتم استخدام
  `getQuotaScopedModelForProvider()`.
- تؤدي `404` إلى إيقاف النموذج الأساسي (`getModelLockKey()` يضيّق النطاق إلى
  `not_found`).
- أي حالة أخرى — أخطاء النقل/الخادم `5xx` وإشارة `502` التي ينشئها OmniRoute
  من تلقاء نفسه نتيجة التحقق من الجودة — تؤدي إلى إيقاف **الثلاثية الدقيقة**
  للمزوّد/الاتصال/النموذج فقط. لا يُعدّ تدفق سيئ في نموذج واحد دليلًا على مشكلة
  في حصة الحساب؛ قبل هذه القاعدة، كانت استجابة فارغة واحدة على
  `codex/gpt-5.6-luna` تزيل كل نموذج `gpt-5*` من ذلك الاتصال من التوجيه لمدة
  تتراوح بين دقيقتين و30 دقيقة (مع التصعيد)، بينما تظل حصته دون تغيير.
- يكون خيار `scope` الصريح الذي يحدده المستدعي هو الفائز دائمًا (يمرر
  Antigravity القيمة `"exact"`).

**الهدف:** تجنّب تعطيل اتصال كامل عندما يكون نموذج واحد فقط غير متاح أو مقيّدًا
بالحصة.

**أمثلة:**

- مزوّدو الحصص لكل نموذج الذين يعيدون `429`
- المزوّدون المحليون الذين يعيدون `404` لنموذج مفقود واحد
- حالات فشل أذونات الوضع/النموذج الخاصة بالمزوّد (مثل أوضاع Grok)

**التنفيذ:** `open-sse/services/accountFallback.ts` — `lockModel()`،
`clearModelLock()`، `getAllModelLockouts()`.

### لوحة معلومات فترات تهدئة النماذج (v3.8.0)

واجهة المستخدم: الإعدادات → فترات تهدئة النماذج
(`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

تسرد عمليات الإيقاف النشطة مع: المزوّد، والاتصال، والنموذج، والسبب،
وexpiresAt. ويمكن للمشغّلين إعادة تمكين نموذج يدويًا من البطاقة.

**واجهة REST API:**

- `GET /api/resilience/model-cooldowns` — سرد عمليات الإيقاف النشطة
- `DELETE /api/resilience/model-cooldowns` — إعادة التمكين يدويًا. النص:
  `{provider, connection, model}`. المصادقة: management.

### مدير فترات التهدئة

واجهة المستخدم: المراقبة → مدير فترات التهدئة
(`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

صفحة واحدة لكل اتصال خارج التوجيه لسبب مؤقت، بدلًا من فتح صفحة كل مزوّد على
حدة. تسرد فترات تهدئة الاتصالات، وعمليات إيقاف النماذج، والحالات النهائية،
وتزيلها لكل اتصال، أو لتحديد معيّن، أو لكل اتصالات مزوّد، كما تعدّل قواعد
فترات التهدئة الأكثر ضبطًا: `streamStallCooldown.enabled` ومدة التهدئة
الأساسية `connectionCooldown` الخاصة بـ OAuth / API-key، والحد الأقصى لخطوات
التراجع الأُسّي (يتم الحفظ عبر `PATCH /api/resilience`). تُسرد الحالات النهائية
(`banned`، `expired`، `credits_exhausted`) لكنها لا تُزال هنا مطلقًا.

تعدّل بطاقة **قواعد تهدئة الأخطاء** في الصفحة نفسها قواعد أخطاء المشغّل
(`settings.providerErrorRules`) والقيم الافتراضية الشاملة لكل مزوّد
(`settings.providerErrorDefaults`) عبر `PATCH /api/settings` — راجع "قواعد
يحددها المشغّل" ضمن §7 لمعرفة كيفية مطابقتها. المدد هي: افتراضي (من دون فترة
تهدئة صريحة)، 30 دقيقة، ساعة واحدة، 5 ساعات، 24 ساعة، أو قيمة مخصصة من دقيقة
واحدة إلى 43,200 دقيقة (30 يومًا).

**واجهة REST API** (`src/lib/resilience/cooldownManager.ts`، المصادقة:
management):

- `GET /api/resilience/cooldowns[?provider=]` — الاتصالات مع الحالة، وفترة التهدئة
  المتبقية، ومستوى التراجع، وآخر نوع خطأ، وعمليات إيقاف النماذج (من دون بيانات
  اعتماد)
- `POST /api/resilience/cooldowns` — النص `{connectionIds: string[]}` أو
  `{all: true, provider?}`؛ يعيد `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### واجهة إعدادات إيقاف النماذج + الاسترداد بتناقص النجاح (v3.8.23)

انتقل إيقاف النموذج من سلوك مفعّل دائمًا ومضمّن برمجيًا إلى ميزة قابلة للتهيئة
بالكامل ومفعّلة اختياريًا، مع بطاقة إعدادات خاصة بها ومسار استرداد ذاتي.

**بطاقة الإعدادات:** الإعدادات → إيقاف النموذج
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
وهذه **مختلفة** عن `ModelCooldownsCard` للقراءة فقط أعلاه (التي تقتصر على
_سرد_ عمليات الإيقاف النشطة) — أما البطاقة الجديدة فتعمل على _تهيئة المعلمات_.
توجد القيم الافتراضية في `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| الإعداد                 | القيمة الافتراضية                | المعنى                                                       |
| ----------------------- | -------------------------------- | ------------------------------------------------------------ |
| `enabled`               | `false`                          | مفتاح التفعيل الرئيسي — إيقاف النموذج **معطّل افتراضيًا**.   |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | حالات المنبع التي تُحتسب كفشل محدد النطاق للنموذج.           |
| `baseCooldownMs`        | `120_000` (120 s)                | مدة الإيقاف الأولية للفشل الأول.                             |
| `maxCooldownMs`         | `1_800_000` (30 min)             | الحد الأقصى لفترة التهدئة المتصاعدة.                         |
| `maxBackoffSteps`       | `10`                             | الحد الأقصى لخطوات التصعيد بالتراجع الأُسّي.                 |
| `useExponentialBackoff` | `true`                           | ما إذا كانت حالات الفشل المتكررة تصعّد فترة التهدئة أُسّيًا. |

تُحفظ الإعدادات عبر مخزن الإعدادات العادي وتُتحقق من صحتها عبر مخطط إعدادات
المرونة؛ وتقيّد البطاقة قيم `baseCooldownMs`/`maxCooldownMs`
(مع `maxCooldownMs ≥ baseCooldownMs`) و`maxBackoffSteps` ضمن الحدود.

**الاسترداد بتناقص النجاح:** لا يعتمد الاسترداد على انتهاء المؤقت فقط. إذ تعمل
الاستجابة السليمة على خفض عدد حالات فشل النموذج، بحيث يتوقف نموذج تعافى في
منتصف النافذة عن التصعيد (ويُزال إيقافه) قبل انتهاء مؤقته. عند نجاح الهدف
المركّب، تستدعي `open-sse/services/combo.ts` الدالة
`decayModelFailureCount()` (`open-sse/services/accountFallback.ts`)، التي
تقوم **بتنصيف** `failureCount` المخزّن (`Math.floor(failureCount / 2)`)، وعندما
يصل إلى `0` يُحذف إدخال الإيقاف بالكامل. أما النظير
`recordModelLockoutFailure()` فيزيد العدد (ويصعّد فترة التهدئة) عند حدوث حالات
فشل ضمن نافذة التصعيد. ويأتي هذا التناقص الناتج عن النجاح إضافةً إلى انتهاء
المؤقت العادي — إذ يمكن لأي من المسارين إعادة تمكين النموذج.

**الحالة:** يتم الاحتفاظ بعمليات حظر الدخول **في الذاكرة** (ضمن `Map`s لكل عملية، من النوع
`ModelLockoutEntry` والمفهرسة حسب
`provider:connectionId:model`، بينما تُفهرس عمليات الحظر ذات النطاق الدقيق حسب
`provider:connectionId:exact:model`)، ولا يتم حفظها في
قاعدة البيانات — إذ تُفقد عند إعادة التشغيل. أما _الإعدادات_ فتبقى محفوظة؛ بينما تكون _حالة_ حظر الدخول النشطة مؤقتة.

## 4. التحكم في تزامن حصة الحصص (الإصدار 3.8.36)

غالبًا ما تقبل حسابات الاشتراك (GLM و MiniMax وما إلى ذلك) طلبات متزامنة من ~ 1–3 فقط؛ يؤدي تجاوز ذلك إلى تشغيل 429s وفترات التهدئة. هذا حاد تحت** حصة الحصص** مجموعات (`qtSd/…`) حيث تشترك عدة مفاتيح API في حساب رئيسي واحد. ثلاث طبقات تحمي الحساب المشترك من الغمر.

### الحد الأقصى للتزامن لكل اتصال (`max_concurrent`)

يمكن لكل اتصال مزود أن يعلن عن سقف `max_concurrent` (`provider_connections.max_concurrent`، تم تعيينه في الاتصال modal / API / DB). اتركها فارغة بلا حدود. هذا هو المقبض الوحيد الذي يحرك طبقة التسلسل أسفل — ويضبطها على التزامن الحقيقي للحساب (على سبيل المثال GLM ~ 1، MiniMax ~ 2).

### الحدود القصوى للتزامن لكل نموذج (`modelConcurrency`)

يمكن أن يعلن الاتصال بالإضافة إلى ذلك عن أسقف التزامن الدقيقة لكل نموذج داخل خريطة `rateLimitOverrides` الخاصة به:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

قم بتعيينه في اتصال مشروط (** يتجاوز حد المعدل → الحدود القصوى للتزامن لكل نموذج** ، `model=cap` واحد لكل سطر) أو عبر `PATCH /api/providers/[id]` بنفس شكل JSON. الدلالات الرئيسية:

- **على مستوى الاتصال مقابل الطراز المحدد:** يظل `maxConcurrent` هو السقف المشترك على مستوى الاتصال. عندما ينطبق كلاهما، يتم الحصول على كلا البوابتين ذريًا في نفس البوابة المركبة (`global → provider → account → model`)؛ السلوك الفعال هو الحد الأكثر صرامة المطبق.
- **المطابقة الدقيقة لمفتاح النموذج:** المفتاح هو سلسلة النموذج التي تم تمريرها إلى المنفذ بعد توجيه القرار — عادةً معرف النموذج الأولي المجرد (`glm-5`)، وليس الاسم المستعار `provider/model` من جانب العميل (`zai/glm-5` لا يتطابق مع `glm-5`). القيم هي أسقف الطلب المتزامن ذات الأعداد الصحيحة الموجبة.
- **قائمة الانتظار المحلية، لا يوجد اكتشاف:** يتم وضع الطلبات الزائدة في قائمة الانتظار محليًا باستخدام دلالات queue/timeout الموجودة (أخطاء قبول `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` المكتوبة). لا تكتشف OmniRoute أو تستنتج سياسة المنبع — فهي تفرض الحدود القصوى التي قام المشغل بتكوينها بالضبط. لا تؤدي بوابة النموذج المشبع أبدًا إلى تعطيل الموفر ولا تنشئ أبدًا قفلًا دائمًا للنموذج؛ يبقى سلوك 429/cooldown/fallback المنبع هو الخطأ المساند.
- **لكل اتصال، نطاق لكل عملية:** الأحرف الاستهلالية تكون لكل اتصال بقاعدة بيانات ويتم الاحتفاظ بها في الذاكرة، لذلك لا يتم تنسيق الاتصالين اللذين يستخدمان نفس مفتاح API المنبع مع بعضهما البعض.
- **غير مكون يعني أنه لم يتغير:** إن حذف الخريطة (أو ترك حقل لوحة المعلومات فارغًا) لا يضيف أي بوابة نموذجية. مثال للتكوين دون التأكيد على أي حد للموفر العالمي:

```text
glm-5=1
glm-4.7=3
```

### تسلسل طلب حصة الحصص

عندما يستهدف إرسال حصة الحصص اتصالاً يعلن عن وجود `max_concurrent` موجب، فإن الطلبات المتزامنة لذلك** حساب** يتم إجراء تسلسل لها من خلال إشارة لكل اتصال (مفتاح `qsconn:<connectionId>`): الطلبات الزائدة** انتظر في الطابور** بدلا من إغراق الحساب. إنها** فشل مفتوح** — تستمر قائمة الانتظار المشبعة أو المهلة بدون فترة زمنية بدلاً من رفض أي طلب قابل للإرسال. تبديل في** الإعدادات → Resilience → حصة الحصص المتزامنة لكل اتصال** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`، تشغيل افتراضي). بدون غطاء `max_concurrent` لن يتغير السلوك.

> بوابة توجيه حصة الحصص (`selectQuotaShareTarget`, DRR + P2C) هي في حد ذاتها مفتوحة للفشل ولا تعطي الأولوية إلا لاتصال at-cap — مع تجمع اتصال واحد لا يمكن تقييده بشكل صارم، لذا فإن هذه الإشارة هي ما يحتوي بالفعل على الفيضان.

### إعادة المحاولة مع مراعاة فترة التهدئة

بالنسبة لكل استراتيجية تحرير وسرد (عند تمكينها)، فإن الطلب الذي من شأنه أن يبلور 429 لتهدئة مؤقتة SHORT ينتظرها ويعيد إرسالها بدلاً من إرجاع 429 — وهذا يغطي نوافذ TPM/RPM من فئة الجوزاء (إعادة المحاولة بعد 60 ثانية ~) على مجموعات متعددة النماذج، على سبيل المثال، كلا هدفي التحرير والسرد من نموذجين يصلان إلى حد معدل لكل نموذج. يحدها `comboCooldownWait` (`enabled`، `maxWaitMs`، `maxAttempts`، `budgetMs`) في** إعدادات مرونة →** . لا ينتظر أبدًا أسباب `quota_exhausted` ( auth/not-found حتى منتصف الليل). مع تعيين `comboTimeoutMs` ، لا يبدأ الانتظار الذي لا يمكن أن ينتهي قبل الموعد النهائي (#18998): يجيب التحرير والسرد مرة واحدة باستخدام استجابته النهائية بدلاً من `COMBO_TIMEOUT` 504.

يمكن للتحرير والسرد إلغاء الاشتراك باستخدام `config.comboCooldownWaitEnabled: false`. يقوم `false` الحرفي فقط بتعطيل فترات انتظار التحرير والسرد المشتركة هذه (فترة التهدئة بعد الإرسال وانتظار circuit-open/model-lock قبل الإرسال) وامتداد مهلة انتظار الميزانية الخاصة بها. المفقود أو `true` يحافظ على السياسة العالمية؛ لا يمكن لـ `true` تمكين الانتظار المعطل عالميًا. لا يزال `targetTimeoutMs` الصريح يفوز. لا يؤدي إلغاء الاشتراك هذا إلى تغيير فترة انتظار الإرسال المسبق المنفصلة للمخطوطة الأصلية.

تغطي البوابة نفسها حالة ما قبل الإرسال (#16319): عندما يتم تخطي كل هدف من مجموعة التحرير والسرد قبل إجراء أي محاولة لأن نموذجها يقع في قفل عابر قصير، فإن مسار المحاولة الصفرية ينتظر القفل تحت نفس السقف ويعيد الإرسال، بدلاً من الإجابة على `503 ALL_TARGETS_SKIPPED` بدون تلميح. عندما لا يُسمح بالانتظار (السقف، أو المحاولة، أو استنفاد الميزانية، أو إيقاف الميزة)، تتم ترقية الاستجابة الطرفية إلى `429 rate_limit_error` تحمل `retry_after` / `reset_at` من أول انتهاء صلاحية للقفل العابر؛ الحصة النسبية والمصادقة والأقفال غير الموجودة تحافظ على تلميح أقل 503.

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

## 7. إعادة صياغة حالة المنبع (أخطاء الحصة المبلّغ عنها بشكل غير صحيح)

**النطاق:** بوابة منبع واحدة تُبلّغ عن استنفاد مؤقت للحصة باستخدام حالة HTTP غير صحيحة.

**الهدف:** تصحيح حالة مضللة BEFORE التصنيف، كي يرى المستهلكون اللاحقون (محرك البدائل، وتجميع الاتصالات، والاستجابة الموجّهة إلى العميل) الطبيعة الحقيقية القابلة لإعادة المحاولة للفشل.

تُشير بعض البوابات إلى استنفاد الحصة المؤقت باستخدام حالة HTTP غير قابلة لإعادة المحاولة. تُعيد `agentrouter.org` الحالة `403` (وأحيانًا `400`) مع نص صيني
(`用户额度不足` / `额度不足`) بدلًا من الحالة القياسية `429`. تتعامل عملاء مثل Claude
Code مع `403` على أنه دائم، فتُنهِي الجلسة، ومن دون التصحيح سيصنّفه
محرك البدائل على أنه `AUTH_ERROR` بدلًا من اعتباره حدث حصة.

**التنفيذ:**

- السجل + المطابق: `open-sse/config/upstreamStatusRestatement.ts` — قائمة قواعد لكل مزوّد (`{id, fromStatuses, toStatus, textMarkers, excludeMarkers, defaultRetryAfterMs}`)، تتم مطابقتها عبر `applyStatusRestatement()`.
- موضع الاستدعاء: كتلة `providerFailure:` في `open-sse/handlers/chatCore.ts`
  (بالقرب من السطر 3654)، مباشرة بعد أن تحلّل `parseUpstreamError()` استجابة من المنبع بحالة HTTP خطأ (`!providerResponse.ok`)، وقبل إجراء أي تصنيف، كي يرى كل مستهلك لاحق الحالة المصححة. تتبع الأخطاء المضمّنة داخل تدفق SSE بحالة `200` مسارًا منفصلًا لاحقًا لتحليل التدفق، وهي **غير مشمولة** بهذا الخطاف حاليًا — وهذا قيد معروف، ولم تكن هناك حاجة إليه بعد لمعالجة حالة agentrouter الخاطئة (إذ تظهر على شكل حالة HTTP خطأ).
- أهلية إعادة المحاولة: توجد `429` ضمن `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`)، ولذلك تحمل الأخطاء المُعادَة صياغتها نافذة إعادة محاولة فعلية بدلًا من الظهور كحالة `403` ميتة.
- إن `defaultRetryAfterMs` الاصطناعية البالغة `60s` (`upstreamStatusRestatement.ts`) هي فقط ما تُبلغه الاستجابة المُعادَة صياغتها إلى **العميل**؛ وليست مدة التهدئة/الحظر الداخلية للاتصال بحد ذاتها — إذ تُدار تلك المدة بشكل منفصل بواسطة الآلية التي تتولى فعليًا معالجة الخطأ المُعادَت صياغته (التراجع التصاعدي لـ Connection Cooldown، §2، بمدة أساسية قدرها `3s` لمزوّدي مفاتيح API؛ أو Model Lockout، §3، لمزوّدي الحصص لكل نموذج مثل agentrouter). يمكن أن يصبح الموجّه مؤهلًا لإعادة المحاولة داخليًا قبل انتهاء نافذة `60s` التي يعلنها للعميل — وهذا مقصود لتوفير هامش أمان، وليس خطأ.

لا يُعاد أبدًاَت صياغة الأخطاء الدائمة (مثل `无权访问模型` لدى agentrouter — لا يملك صلاحية الوصول إلى هذا النموذج): إذ يمنع `excludeMarkers` القاعدة حتى عند تطابق `textMarkers`، ولذلك يحتفظ الخطأ بحالته الأصلية ولا تتم إعادة محاولته إلى الأبد. تتم استشارة قاعدة تصنيف المزوّد المطابقة
(`agentrouter-model-access-denied` في `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`، و`scope: "model"`، ومدة تهدئة أساسية مُعلنة قدرها `6h`) بواسطة `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_قبل_ الإرجاع المبكر العام للفئة `FORBIDDEN` الخاصة بمفتاح API، وذلك بشرط
`honorsRuleLockScope(provider)` (#10334 — حاليًا حصرية لـ agentrouter عبر قائمة السماح `HONORS_RULE_LOCK_SCOPE_PROVIDERS` في
`providerErrorRules.ts`). تمرّ مدة التهدئة المُعلنة للقاعدة، والبالغة 6h، عبر `fallbackResult.baseCooldownMs`، لكنها تظل تغذي مسار الحظر السابق لكل نموذج (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`، الذي لم يتغير بسبب #10334 باستثناء مصدر مدة التهدئة): إذ تُقلَّص إلى قيمة `mlSettings.maxCooldownMs` الخاصة بالمشغّل (الافتراضية `1_800_000ms` / 30 دقيقة)، مثل كل حالات حظر النماذج الأخرى، ويظل _سبب الحظر المحفوظ_ هو السلسلة النصية الثابتة السابقة `"forbidden"`، وليس `"auth_error"` الخاصة بالقاعدة — إذ لا تُحترم من البداية إلى النهاية إلا مدة التهدئة، وليس سلسلة السبب. يظل الاتصال نفسه نشطًا، ولا تتأثر النماذج الشقيقة الموجودة على الاتصال نفسه.

تصل أخطاء الحصة المُعادَة صياغتها (`额度不足`) إلى قاعدة مزوّد في بيئة الإنتاج
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`، و`scope:
"connection"`، من دون مدة تهدئة مُعلنة خاصة بها — إذ تُطبَّق القيمة الافتراضية للتراجع المُقاس في طبقة الاستمرارية). منذ #10334، يتم استهلاك `scope` في
`ProviderErrorRuleMatch` من البداية إلى النهاية، ولكن **فقط** للمزوّدين الموجودين في قائمة السماح `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
وحاليًا لا تضم إلا `"agentrouter"`، عبر `honorsRuleLockScope()`). أما جميع المزوّدين الآخرين، فيظل `scope` لديهم ذا قيمة معلوماتية، تمامًا كما كان قبل #10334.
يعرض `checkFallbackError` نطاق القاعدة المطابقة في
`fallbackResult.ruleScope`؛ وتُعدّ `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) الحارس المشترك الذي يؤكد أن
`ruleScope` آمن فعلًا للاعتماد عليه كإشارة على مستوى الاتصال وقابلة للتعافي الذاتي (النطاق `"connection"`، والسبب `quota_exhausted`، وليس أبدًا
`permanent` أو `creditsExhausted` — وذلك دفاعًا ضد اقتران قاعدة مستقبلية بالنطاق `"connection"` مع حالة حساب دائمة). يستدعيها مستهلكان:

- **الاستمرارية** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  بدلاً من الوقوع في فرع الإيقاف **لكل نموذج** الخاص بموفّر passthrough
  (‏agentrouter لديه `passthroughModels: true` → تُرجع
  `hasPerModelQuota()` القيمة `true`)، يطبّق **فترة تهدئة مؤقتة للاتصال** —
  `testStatus: "unavailable"` + `rateLimitedUntil`، وليس حالة نهائية مطلقاً
  (`credits_exhausted`/`banned`/`expired`) — بحيث يتعافى الاتصال تلقائياً
  بمجرد انتهاء فترة التهدئة بدلاً من أن يتطلب إعادة ضبط بيانات الاعتماد يدوياً.
  يُتخطّى ذلك للاتصالات التي تحتوي على `disableCooling: true` (#2997): إذ
  ينتقل خيار الانسحاب هذا إلى الإيقاف لكل نموذج بدلاً من ذلك (وهي مقايضة
  موثّقة — راجع تعليق الكود أعلى الفرع).
- **التوجيه المركّب ضمن الطلب نفسه** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): يضع الحارس نفسه الاتصال
  في مجموعة `exhaustedConnections` الموجودة في الذاكرة، والمفهرسة وفق
  `${provider}:${connectionId}`. لا يؤدي ذلك إلا إلى تخطي هدف متبقٍ ضمن
  الطلب نفسه يحمل _هو ذاته بالفعل `connectionId` المطابق تماماً_ في كائن
  الهدف الخاص به (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`، ‏`if (provider &&
connectionId)` قبل البحث في `exhaustedConnections`) — أما التركيبة العادية
  لقائمة النماذج، حيث لا تحمل الأهداف الشقيقة أي `connectionId` مثبت خاص
  بها، ولا يُحلّ سوى هدف واحد لكل إرسال من ترويسة الاستجابة
  `X-OmniRoute-Selected-Connection-Id`، فلا تصل مطلقاً إلى مطابقة هذا المفتاح.
  في هذه الحالة الشائعة، فإن الحماية الفعلية من إعادة استخدام الحساب الذي
  استُنفد للتو بواسطة مسار متبقٍ ليست هذه المجموعة — بل هي طبقة الاستمرارية
  أعلاه (إذ أصبحت قيمة `rateLimitedUntil` الخاصة بالاتصال في المستقبل)
  مقترنةً بمنع هذا الحارس نفسه لإضافة الموفّر إلى
  `transientRateLimitedProviders` بسبب الفشل (راجع "التصميم ذو المرحلتين"
  وتعليق الكود في فرع
  `isAgentrouterConnectionQuotaScope` في `targetExhaustion.ts`): ومع ترك
  هذه المجموعة دون وضع علامة، فإن السماح الإجباري
  `allowRateLimitedConnection` في `combo.ts` (`open-sse/services/combo.ts:1005-1013`،
  `:2734-2738`) لا يُفعّل للمسارات المتبقية للموفّر، ولذلك يُحترم مرشح
  `rateLimitedUntil` الخاص باختيار بيانات الاعتماد
  (`src/sse/services/auth.ts:1238`) بشكل طبيعي، ويختار المسار المتبقي إما
  اتصال agentrouter آخر ما زال مؤهلاً أو يفشل بسبب عدم توفر بيانات اعتماد —
  ولا يفرض عودته إلى الاتصال الذي أدخله هذا الفرع للتو في فترة التهدئة.

### التصميم ذو المرحلتين: إعادة صياغة الحالة، ثم التصنيف

إن إعادة صياغة الحالة (`upstreamStatusRestatement.ts`) وقواعد تصنيف الموفّر
(`open-sse/config/providerErrorRules.ts`،
`providerRuleRegistry`) هما سجلّان منفصلان يعتمد كلاهما على معرّف الموفّر
وعلامات نصية، لكنهما يعملان في موضعين مختلفين ويخدمان غرضين مختلفين:
فإعادة الصياغة تعيد كتابة حالة HTTP مبكراً في `chatCore.ts`؛ بينما تختار
قواعد التصنيف `reason` الاحتياطي وتقفل `scope`
(`model` / `provider` / `connection`) داخل `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

لا ترى قواعد التصنيف سوى **النص** الكامل للخطأ (وهو مطلوب لمطابقة علامات
المتن مثل `额度不足`) للموفّرين المدرجين في قائمة السماح
`FULL_TEXT_RULE_PROVIDERS` في `providerErrorRules.ts` — وحالياً لا يوجد
فيها سوى `"agentrouter"`. أما كل موفّر آخر من **الفهرس المضمّن**، فتمرر
`checkFallbackError` إلى `getProviderErrorRuleMatch` الخطأ المنظّم فقط
(`{code, type}`)، وهو ما يكفي للقواعد المعتمدة على الترويسة/الحالة/الرمز،
لكنه لا يرى العلامات النصية في متن الخطأ.
وتنفّذ المساعدة `resolveRuleMatchBody()` عملية الاختيار هذه: نص الخطأ
الكامل للموفّرين المدرجين في قائمة السماح، والخطأ المنظّم بخلاف ذلك.
إن إضافة موفّر **مضمّن** إلى `FULL_TEXT_RULE_PROVIDERS` هي موافقة صريحة
خاصة بكل موفّر — وهي موجودة كي يظل المسار الافتراضي لكل موفّر غير مدرج
في القائمة دون أي تغيير، بايتاً ببايت.

ويُعد `scope` الخاص بالقاعدة (`model` / `provider` / `connection`) خيار
موافقة منفصلاً عن `FULL_TEXT_RULE_PROVIDERS`: إذ لا يعرضه
`checkFallbackError` إلا في صورة `fallbackResult.ruleScope`، ولا يحترمه
المستهلكون اللاحقون إلا باعتباره شيئاً يتجاوز مجرد تسمية معلوماتية،
وذلك للموفّرين المدرجين في قائمة السماح
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` في الملف نفسه (عبر
`honorsRuleLockScope()` — وحالياً لا يوجد سوى `"agentrouter"`).
راجع "أخطاء الحصة المعاد صياغتها" أعلاه لمعرفة ما الذي تفعله مطابقة
`scope: "connection"` فعلياً بعد إدراج الموفّر في قائمة السماح هذه.

**#11104 — تتجاوز القواعد التي يصرّح بها المشغّل قائمتي السماح كلتيهما.**
يمكن للمشغّل التصريح بقاعدة خاصة بموفّر أثناء التشغيل عبر
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
من دون تعديل هذا الملف. إن إخضاع قاعدة المشغّل لقائمتي السماح
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — وهما قائمتان
تهدفان إلى حماية السلوك **الافتراضي** لقواعد فهرس الموفّرين المضمّنة —
سيجعل آلية الإعدادات عديمة الفائدة لكل موفّر باستثناء الموفّرين المدرجين
فيهما مسبقاً، إذ إن التصريح بالقاعدة هو بالفعل موافقة صريحة من المشغّل.
يتحقق كل من `resolveRuleMatchBody()` و`honorsRuleLockScope()` أولاً من
`hasOperatorRuleForProvider()`: فالموفّر الذي لديه قاعدة مشغّل يحصل على
نص الخطأ الخام ويُحترم `scope` المصرّح به، بصرف النظر عما إذا كان يظهر
أيضاً في أي من قائمتي السماح.

**القواعد التي يصرّح بها المشغّل** (`OperatorProviderErrorRule`): لكل قاعدة
`status` اختياري و`match` اختياري (وهو سلسلة فرعية عادية غير حساسة لحالة
الأحرف من نص الخطأ، وليست RegExp، ولذلك لا يمكنها التسبب في ReDoS)، ويجب
أن تضبط واحداً منهما على الأقل. وعند ضبط كليهما، تُطبّق المطابقة بشرط
AND؛ أما الحقل المحذوف فيطابق أي قيمة، ولذلك فإن
`{match: "insufficient_quota"}` يطابق أي حالة تحمل ذلك الرمز. تفوز أول
قاعدة مطابقة. يقبل `cooldownMs` مدة تصل إلى 30 يوماً؛ وبحد أقصى 50 قاعدة
إجمالاً.

**الإعدادات الافتراضية الشاملة** (`settings.providerErrorDefaults`، اختيارية، وتُضبط من خلال
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
مع `cooldownMs` من دقيقة واحدة إلى 30 يومًا. يُطبَّق الإعداد الافتراضي فقط عند عدم تطابق
أي قاعدة للمشغّل أو قاعدة مضمّنة في الكتالوج، وفقط مع أخطاء 402 و403 و408 و429 وأخطاء 5xx.
وتحتفظ أخطاء شكل الطلب (400 و404 و409 و413 و422) وأخطاء 401 المجردة بمعالجتها الخاصة.
عند عدم تحديد `reason` صراحةً، يأتي السبب من الحالة، بالطريقة نفسها التي تستخدمها
`classifyError`. ويُحتسب تعريف إعداد افتراضي كقاعدة للمشغّل عند
`hasOperatorRuleForProvider()`، ولذلك يُحترم `scope` الخاص به (وقيمته الافتراضية
`"connection"`). وتكون مدة التهدئة الفعلية للإعداد الافتراضي هي الأطول بين
`cooldownMs` الخاص به وتلميح إعادة المحاولة الخاص بالمزوّد (`Retry-After` أو
`x-ratelimit-reset` أو تلميح إعادة الضبط في النص الأساسي، وهو التلميح نفسه الذي يحترمه
المحرّك عند تفعيل إعداد تهدئة الاتصال «استخدام تلميحات إعادة المحاولة من المصدر»)،
وبذلك يمكن للإعداد الافتراضي تمديد تلميح قصير من المصدر، لكنه لا يقلّص أبدًا مدة إعادة
ضبط فعلية. أما قاعدة المشغّل الصريحة فتحافظ على `cooldownMs` المحدد لها بدقة.
ولا تتجاوز القاعدة أو الإعداد الافتراضي حواجز تهدئة الاتصال في
`markAccountUnavailable`: فلا تُقصَّر مدة تهدئة نشطة وأطول، ولا تُستبدل حالة نهائية.
وتظل كاشفات النصوص المضمّنة التي تعمل مبكرًا في `checkFallbackError` (نفاد الأرصدة،
والحصة اليومية، وتعطيل الحساب) لها الأولوية لعباراتها الخاصة.

**فجوة معروفة — لا يتم أبدًا الرجوع إلى `providerRuleRegistry` عند HTTP 400.**
يصنّف فرع `BAD_REQUEST` في `checkFallbackError` الحالة 400 بالكامل من خلال مصفوفات
الأنماط الخاصة به (`MODEL_ACCESS_DENIED_PATTERNS` و
`CONTEXT_OVERFLOW_PATTERNS` وغيرهما في `accountFallback.ts`) ويعود قبل الوصول إلى فرع
`configuredRule`/`getProviderErrorRuleMatch` الموجود أعلاه.
وتُعد قاعدة كتالوج مضمّنة (أو قاعدة مشغّل) تحتوي على `status: 400` صحيحة نحويًا،
لكنها لن تعمل أبدًا. لا تستهدف أي قاعدة موجودة الحالة 400 حاليًا، لذا لا يتأثر شيء في
الإنتاج — لكن أي قاعدة 400 مستقبلية ستحتاج إلى تعديل هذا الفرع أولًا، وهو تغيير أكبر
من مجرد إضافة قاعدة (إذ سيعيد تصنيف 400 لكل مزوّد يعتمد حاليًا على سلوك مصفوفة الأنماط)،
كما أنه خارج نطاق إضافة قاعدة لمزوّد واحد.

### إضافة بوابة جديدة تُسيء وصف الحصة

1. سجّل مصفوفة قاعدة واحدة في
   `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). اجعل `textMarkers`
   خاصة بالمزوّد؛ ولا تعِد استخدام العبارات الإنجليزية العامة التي تتعارض مع
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. اختياريًا، سجّل قواعد تصنيف في
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) لاختيار
   نطاق القفل المناسب (`connection` لحصة على مستوى الحساب، و`model` للأخطاء الخاصة
   بكل نموذج). لا يدخل هذا الإجراء حيز التنفيذ في الإنتاج إلا للمزوّدين الذين تحتاج
   قواعدهم إلى نص الخطأ الكامل (علامات النص الأساسي): أضف معرّف المزوّد إلى
   `FULL_TEXT_RULE_PROVIDERS` في الملف نفسه — وإلا فلن يمرر
   `checkFallbackError` إلى القاعدة سوى الخطأ المنظم
   `{code, type}`، ولن تتطابق قاعدة تعتمد على نص النص الأساسي مع حركة المرور الفعلية.
   أما القواعد التي تتطابق فقط مع `status`/`headers` (مثل قواعد Opencode أو
   Minimax) فلا تحتاج إلى هذا الاشتراك الاختياري. وبشكل منفصل، إذا أعلنت القاعدة
   `scope: "connection"` وكان المقصود تهدئة فعلية على مستوى الاتصال مع تخطّي
   مجموعة الطلب نفسه (وليس مجرد تسمية معلوماتية)، فأضف معرّف المزوّد إلى
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` في الملف نفسه — فهذا هو ما يتحكم في
   استهلاك من نمط `isAgentrouterConnectionQuotaScope()` في
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) و
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`)؛ ومن دونه سيظل
   `scope` ينتقل عبر `fallbackResult.ruleScope`، لكن لن يتصرف أي جزء بناءً عليه.
3. أضف اختبارات وحدات تحاكي
   `tests/unit/upstream-status-restatement.test.ts`
   و`tests/unit/agentrouter-error-rules.test.ts` (بما في ذلك حواجز
   not-permanent / not-creditsExhausted، وكذلك — إذا كان المزوّد يحتاج إلى
   قائمة السماح — اختبار يؤكد أن `resolveRuleMatchBody()` يعيد النص الكامل
   لهذا المزوّد فقط).

لا حاجة إلى إجراء أي تغييرات على `chatCore.ts` أو `classifyError` أو combo.

#### قفل مُجمّع حسب حزمة الخروج (#10880)

يُعامَل المزوّدون الموجودون في `EGRESS_BUCKETED_LOCK_PROVIDERS` (عائلة opencode)
على أنهم مصدر علوي مُجمّع حسب عنوان IP (فالطبقة المجانية من opencode مُجمّعة حسب
عنوان IP، وليست مُجمّعة حسب الحساب — راجع #9611): إذ تؤدي حالة 429 المصنّفة
`quota_exhausted` **أو** `rate_limit_exceeded` إلى تهدئة كل اتصال من عائلة
قائمة السماح يتطابق آخر عنوان IP معروف للخروج له مع عنوان اتصال الفشل، قبل أن
تتمكن آلية التدوير من تجربتها
— وبذلك تتجنب استدعاءات المصدر العلوي الفاشلة حتمًا وعددها N-1 (بالشكل نفسه
الموضح في #10460/#10525).
ويُدرج `rate_limit_exceeded` عمدًا: ففي مسار `markAccountUnavailable` لا تتطابق
القواعد الخاصة بـ opencode أبدًا (إذ لا يتم تمرير الرؤوس/النص الأساسي إلى
`checkFallbackError`، كما أن opencode ليس ضمن `FULL_TEXT_RULE_PROVIDERS`)، ولذلك
تُصنّف استجابة 429 التي يحمل نصها الأساسي نص حصة الاشتراك
("monthly usage limit reached") على أنها `quota_exhausted` بواسطة الاحتياط النصي
للحصة (`buildSubscriptionQuotaFallback`، `accountFallback.ts`؛ تهدئة لمدة ساعة)
قبل الوصول إلى قاعدة `status_429` — بينما تُصنّف استجابة 429 الخالية من نص الحصة
(تقييد معدل عادي) عبر قاعدة `status_429` على أنها `rate_limit_exceeded`، وتظل
تُهدّئ عائلة عناوين IP. أما بالنسبة إلى المزوّد الموجود في قائمة السماح، فإن تقييد
المعدل المجمّع حسب عنوان IP هو الإشارة نفسها التي يدل عليها نفاد الحصة. الحدود الصادقة:

- **بأفضل جهد**: يحل القفل `egress_ip` الأخير المعروف للاتصال
  من `proxy_logs` (نافذة 24 ساعة، بشكل متزامن، دون ذاكرة تخزين مؤقت). ذاكرة
  تخزين مؤقت باردة (لم يسبق التحقق من عنوان IP للخروج) أو عدم وجود صف → يظل
  الاتصال المتسبب في الفشل في فترة تهدئة بواسطة الفرع (ويُسجَّل كما هو الحال
  اليوم)، ولا يُقفل سوى عدم وجود نظير.
- **ليس نهائيًا أبدًا**: فترة التهدئة هي نافذة حصة تتجدد
  (`testStatus: "unavailable"`)، ولا تُستنتج حالة دائمة أبدًا من إشارة على مستوى
  IP. تتجاوز الاتصالات التي تحتوي على `disableCooling` الفرع بالكامل.
- **تتغير دقة القفل لعائلة قائمة السماح**: هذا تغيير في النطاق، وليس مجرد
  تحسين للنظير. إن opencode هو موفّر `passthroughModels`، لذا قبل هذا الفرع كان
  الخطأ 429 ينتج إقفالًا لكل MODEL؛ أما الآن فينتج فترة تهدئة للاتصال — بما في
  ذلك حالة المشغّل الذي يشغّل اتصالًا واحدًا فقط دون أي نظير على الإطلاق. هذه
  هي الدقة التي يعلن جدول قواعد opencode أنها صحيحة (`scope: "connection"`،
  `providerErrorRules.ts`)، لكنها لم تُحترم حتى الآن لأن opencode ليس ضمن
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. يكتب الفرع فترة تهدئة الاتصال المتسبب في
  الفشل و`backoffLevel` بنفسه، محاكيًا فرع agentrouter ذي النطاق المرتبط
  بالاتصال، ثم يعيد النتيجة — ولا يتم الوصول مطلقًا إلى الحظر لكل نموذج أو
  المسار العام أدناه.
- **التركيبة مشمولة**: كما في فرع agentrouter، يتجاهل النطاق عمدًا خفض
  `persistUnavailableState`/`isCombo` الذي يطبقه مستدعٍ للتركيبة على خطأ 429.
  إن الإقفال لكل نموذج ليس شكلًا أضعف من هذا النطاق، بل هو الوحدة الخاطئة:
  فهو لا يقول شيئًا عن IP المستنفد، ولذلك سيواصل تدوير التركيبة استهلاك استدعاء
  واحد مضمون الفشل لكل نظير.
- **سلامة النظير**: لا تتم الكتابة فوق نظير وصل بالفعل إلى حالة نهائية
  (محظور/نفدت أرصدة الاعتمادات)، أو كان بالفعل في فترة تهدئة أطول.
- **قائمة السماح الحصرية**: إن توسيع `EGRESS_BUCKETED_LOCK_PROVIDERS` هو قرار
  صريح من المالك؛ ولا توجد أي توصيلات عامة (النمطان #10334/#10419). يربط
  استعلام النظير قائمة السماح نفسها بدل تكرارها كقيمة حرفية في SQL، لذا يظل
  توسيعها تغييرًا في سطر واحد.
- **تدوير IP للخروج، في كلا الاتجاهين**: نافذة البحث (24 ساعة) أوسع بكثير من
  مدة صلاحية ذاكرة التخزين المؤقت لـ IP الخروج (5 دقائق)، لذا فإن «آخر IP
  معروف» هو سجل تاريخي، وليس الحالة الحالية. إذا دوّر اتصال وكيله خلال النافذة،
  فقد **يفوّت** القفل IP مشتركًا فعليًا (فالـIP المسجل هو الجديد غير المستنفد)
  — وبصورة متناظرة، قد **يضع في فترة تهدئة نظيرًا غيّر منذ ذلك الحين مساره**
  بعيدًا عن IP المستنفد. تكلف الحالة الثانية ذلك النظير نافذة تهدئة واحدة؛
  وكلتاهما حدود مقبولة لبذل أفضل جهد في عملية بحث تعتمد على السجل التاريخي.
- **التكلفة**: عمليتا فحص محددتان لنطاق `proxy_logs` (مُرشحتان حسب النافذة
  عبر `idx_pl_timestamp`)، ولا تُنفذان إلا بمعدل تكرار 429. لا يوجد فهرس جديد
  (الترحيل 134 ‏YAGNI). تم القياس على نسخة من قاعدة بيانات بحركة مرور حقيقية
  ومتوسطة الحجم؛ ويحتفظ المثيل عالي معدل الإنتاجية بعدد أكبر نسبيًا من الصفوف
  في النافذة نفسها.

## ميزات المرونة الأخرى

- **22 استراتيجية توجيه** (الأولوية، الموزونة، جولة روبن، ترحيل السياق، التعبئة أولاً، p2c، عشوائي، الأقل استخدامًا، تحسين التكلفة، إعادة الضبط، نافذة إعادة الضبط، انتهاء الصلاحية أولاً، الإرتفاع، الحصص الموزونة، عشوائي صارم، تلقائي، lkgp، محسن للسياق، محسن للتخزين المؤقت، دمج، خط أنابيب، jev) — راجع [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **إعادة تعيين التوجيه** (الإصدار 3.8.0) تعطي — الأولوية للاتصالات حسب وقت إعادة تعيين الحصة النسبية.
- **تدهور وضع الخلفية** ردود — API `background: true` متدهورة للمزامنة مع التحذير.
- **الكشف عن حدود الأداة الديناميكية** تتراجع — عن مقدمي الخدمة عندما تصل حدود عدد الأدوات.
- **احتياطي الطوارئ** — التي تسيطر عليها `OMNIROUTE_EMERGENCY_FALLBACK`; يمكن للمشغلين تجاوزه من صفحة علامات الميزات دون إعادة التشغيل.

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
