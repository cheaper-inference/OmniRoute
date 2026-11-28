# Monitoring & Observability Guide (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **باختصار**: يأتي OmniRoute مزودًا بمراقبة مدمجة للصحة، وقيادة تلقائية لموفّري الخدمة، وتتبع للحصص، وخطافات لقابلية الرصد. يغطي هذا الدليل لوحة المعلومات والتنبيهات واستكشاف الأخطاء وإصلاحها.

**المصادر:**

- `src/lib/monitoring/observability.ts` — لقطة قابلية الرصد
- `src/lib/monitoring/comboHealthAutopilot.ts` — القيادة التلقائية لصحة التركيبات
- `src/lib/monitoring/providerHealthAutopilot.ts` — القيادة التلقائية لموفّر الخدمة
- `src/lib/monitoring/providerHealthMatrix.ts` — مصفوفة صحة موفّري الخدمة
- `src/lib/localHealthCheck.ts` — فحص الصحة المحلي
- `src/lib/tokenHealthCheck.ts` — صحة تحديث الرمز المميز
- `src/lib/proxyHealth.ts` — ذاكرة التخزين المؤقت لصحة الوكيل (موضحة في PROXY_GUIDE.md)

---

## نظرة عامة

يحتوي OmniRoute على **3 طبقات للمراقبة**:

```
┌──────────────────────────────────────────────────────────────┐
│  الطبقة 1: صحة النظام (على مستوى الخادم)                     │
│  ├─ localHealthCheck.ts — قاعدة البيانات، المنافذ، التبعيات الأصلية │
│  ├─ db/healthCheck.ts — التكامل، المفاتيح الخارجية، العناصر المعزولة │
│  └─ لوحة المعلومات: /dashboard/health                       │
├──────────────────────────────────────────────────────────────┤
│  الطبقة 2: صحة موفّر الخدمة (المرونة لكل موفّر)              │
│  ├─ providerHealthAutopilot.ts — قاطع الدائرة، فترات التهدئة │
│  ├─ providerHealthMatrix.ts — درجات الصحة حسب الموفّر/النموذج │
│  └─ لوحة المعلومات: /dashboard/providers                    │
├──────────────────────────────────────────────────────────────┤
│  الطبقة 3: قابلية الرصد المباشر (لقطات وقت التشغيل)          │
│  ├─ observability.ts — قواطع الدائرة، الجلسات، الحصة         │
│  ├─ tokenHealthCheck.ts — صحة تحديث رمز OAuth المميز         │
│  └─ أدوات MCP: omniroute_get_health، omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## صفحات لوحة المعلومات

### `/dashboard/health` (صحة النظام)

تعرض لوحة معلومات الصحة ذات المستوى الأعلى ما يلي:

| القسم               | ما يعرضه                                          |
| ------------------- | ------------------------------------------------- |
| **حالة الخادم**     | مدة التشغيل، الإصدار، المنفذ، الاتصالات النشطة    |
| **قاعدة البيانات**  | الاتصال، التكامل، حجم WAL، عمليات الترحيل الأخيرة |
| **ملخص الموفّرين**  | العدد النشط، العدد السليم، عدد القواطع المفتوحة   |
| **مراقبو الحصص**    | الجلسات النشطة، التنبيهات، الحصص المستنفدة        |
| **الأخطاء الأخيرة** | آخر 10 أخطاء مع تتبعات المكدس                     |
| **استخدام الموارد** | الذاكرة، وحدة المعالجة المركزية، مؤشر ضغط الكومة  |

### `/dashboard/providers` (صحة موفّر الخدمة)

لوحة معلومات لكل موفّر خدمة:

| العمود    | الوصف                                          |
| --------- | ---------------------------------------------- |
| الموفّر   | معرّف الموفّر + اسم العرض                      |
| الصحة     | حالة خضراء/صفراء/حمراء                         |
| الدائرة   | حالة مفتوحة/مغلقة/نصف مفتوحة                   |
| الاتصالات | عدد الاتصالات، آخر تحديث                       |
| النماذج   | النماذج المتاحة، الصحة لكل نموذج               |
| التكلفة   | تكلفة اليوم، اتجاه 7 أيام                      |
| الأخطاء   | عدد أخطاء آخر 24 ساعة، فئة الخطأ الأكثر شيوعًا |

انقر فوق موفّر خدمة للاطلاع على:

- الطلبات الأخيرة مع تفصيل زمن الاستجابة
- درجات الصحة لكل اتصال
- عمليات القفل لكل نموذج
- توصيات القيادة التلقائية

### `/dashboard/quota` (تتبع الحصص)

لكل مفتاح API:

- الاستخدام الحالي مقابل الحد (شريط تقدم)
- اتجاه الحصة (مخطط لمدة 30 يومًا)
- وقت إعادة التعيين التالي
- سجل التنبيهات

### `/dashboard/combos` (صحة التركيبات)

لكل تركيبة:

- الاستراتيجية + الأهداف
- الصحة لكل هدف
- أحداث الرجوع الاحتياطي الأخيرة
- معدل النجاح (24 ساعة، 7 أيام، 30 يومًا)

---

## فحص الصحة API

يكشف OmniRoute** اثنين** الأسطح الصحية HTTP. أنها ليست قابلة للتبديل للمنسقين.

| طريق                         | غاية                                                            | وزن                               | استخدم ل                                                                         |
| ---------------------------- | --------------------------------------------------------------- | --------------------------------- | -------------------------------------------------------------------------------- |
| `GET /healthz`               | دورة الحياة liveness/readiness (`ok` / `starting` / `stopping`) | تافه (علامة المرحلة فقط)          | كوبيرنيتيس** استعداد** ; ناعم** حيوية** إذا كان يجب عليك استخدام HTTP            |
| `GET /api/monitoring/health` | ملخص مزود + للنظام العميق (DB، الكومة، عدد الكتالوج، ...)       | ثقيل (مزامنة DB / أعمال المراقبة) | لوحات المعلومات، والفحوصات العميقة للصندوق الأسود، والفحص الصحي المدمج في Docker |

> **ملحوظة:** تتوفر مصفوفات صحة الموفر، ومشكلات الطيار الآلي، ومراقبي الحصص، وصحة الرمز المميز، وتفاصيل زمن الاستجابة خارج `/api/monitoring/health` عبر** أداة MCP** `observability_snapshot` أو** لوحة القيادة** صفحات — لا توجد طرق REST مخصصة لهؤلاء.

كلا الطريقين يعملان على** نفس حلقة حدث العقدة** كما التعامل مع الطلب. يمكن أن يتأخر المسار المرتبط بوحدة المعالجة المركزية (عمل كتالوج `GET /v1/models` الكبير، وضغط السياق الطويل/عد الرموز المميزة).** الجميع** معالجات HTTP ، بما في ذلك `/healthz`. انتهت عملية ≠ المزدحمة بحلقة الحدث. تفضل إصلاح الخنزير. ضبط المسبار يقلل فقط من عمليات القتل الخاطئة.

### مسبار منسق خفيف الوزن

```bash
GET /healthz
# or HEAD /healthz
```

- **200** + body `ok` عندما تكون مرحلة دورة حياة الخادم جاهزة
- **503** + `starting` / `stopping` أثناء التمهيد أو إيقاف التشغيل
- التنفيذ: `src/app/healthz/route.ts` (لا يوجد DB ping)

### صحة النظام (عميق)

```bash
GET /api/monitoring/health
```

إجابة:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: مسبار ذاكرة التخزين المؤقت مقابل SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` هو** مقياس ذاكرة التخزين المؤقت في الذاكرة** ، وليس تفريغًا مباشرًا لـ `provider_connections.test_status`. بعد #12532 يقرأ مسار الطلب `getCachedCredentialHealthSummary()` فقط؛ تقوم تحقيقات الخلفية بتحديث ذاكرة التخزين المؤقت خارج حلقة الحدث.

| طبقة                       | أين                                                                   | ماذا يعني                                                                                                                                                                                                      |
| -------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| مقياس ذاكرة التخزين المؤقت | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | آخر نتائج مسبار صحة بيانات الاعتماد لا تزال محفوظة في ذاكرة العملية. `source` هو دائما `probe-cache`.                                                                                                          |
| تفاصيل الاتصال الفاشلة     | `credentialHealth.failedConnections`                                  | حاضر** فقط عندما `failed > 0`** . قائمة محددة من صفوف ذاكرة التخزين المؤقت باستخدام `status=error` (`connectionId`, `status`, `lastError` / `lastErrorType`). تم تعيين `failedOmitted` عندما تم تغطية القائمة. |
| حالة لزجة SQLite           | `credentialHealth.staleDbNonOkCount`                                  | عدد** نشيط** (`is_active=1`) صفوف الاتصال التي يكون `test_status` المستمر فيها غير موافق معروف (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                              |

يمكن أن تختلف الطبقتان عن قصد:

- مقياس `failed=0` بينما `staleDbNonOkCount>0` — SQLite لا يزال يحتوي على `test_status` لزج (على سبيل المثال `expired` أو `credits_exhausted`) بحيث لا يتم احتساب لقطة ذاكرة التخزين المؤقت الأخيرة كـ `status=error`.
- قياس `failed>0` بينما يبدو SQLite سليمًا — فشل مسبار حديث وتم تخزينه مؤقتًا؛ لم يتم تحديث الصف DB ، أو تم مسحه لاحقًا.

لا تنبه فقط إلى `provider_connections.test_status` عند إلغاء نقطة النهاية هذه. استخدم `failed` + `failedConnections` لحالات فشل المسبار المباشر، و `staleDbNonOkCount` عندما تحتاج إلى حساب الحالة الثابتة المستمرة.

### توصيات التحقيق Kubernetes

OmniRoute هو أ** عملية عقدة واحدة** (حلقة حدث واحدة). الأسهم Docker `HEALTHCHECK` تستهدف `/healthz` خفيفة الوزن. `/api/monitoring/health` هو** ثقيلة جدا** لفترات حياة kubelet.

| دقق           | الهدف الموصى به                                                                   | ملحوظات                                                                                                                                                                                                                                                                                                     |
| ------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **بدء**       | HTTP `GET /healthz` مع `failureThreshold` طويل (أو `startPeriod` كبير)            | البداية الباردة يمكن أن تتجاوز عملية ترحيل + SQLite بضع ثوانٍ                                                                                                                                                                                                                                               |
| **استعداد**   | HTTP `GET /healthz`                                                               | دورة الحياة `ok` / `starting` / `stopping` (200 مقابل 503). لا يزال يرفرف إذا كانت الحلقة محظورة بواسطة وحدة المعالجة المركزية (CPU). أ** 200 في عدة ثواني ليست صحية** (#10303) — يعني أن حلقة الحدث قد تم تجويعها قبل تشغيل معالج 3 بايت                                                                   |
| **حيوية**     | HTTP `GET /livez`،** أو TCP** على منفذ الخدمة الرئيسي (`PORT`، `20128` الافتراضي) | `/livez` عملية حية فقط (دائمًا 200 إذا تم تشغيل المعالج). لا يزال يشترك في حلقة الحدث — مشغول ≠ ميت، ولا يكتشف تجويع حلقة الحدث (#10303) بشكل أفضل من TCP. يفضل**TCP** إذا انتهت مهلة تحقيقات HTTP تحت تحميل catalog/compression ؛ يفعل** لا** اقتل الكبسولة في أكشاك حلقة الأحداث القصيرة في كلتا الحالتين |
| **صحة عميقة** | `GET /api/monitoring/health` من مدقق خارجي                                        | ليس من أجل kubelet `livenessProbe` / `readinessProbe` الضيق                                                                                                                                                                                                                                                 |

مثال على الشكل (اضبط العتبات على حمل التشغيل البارد والضغط):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # Under event-loop stall HTTP /livez can still time out. TCP is the
  # conservative alternative:
  # tcpSocket:
  #   port: http
```

**لا** نقطة كوبيليت** حيوية** في `/api/monitoring/health`. يعمل هذا المسار بشكل حقيقي DB/monitoring وسيكون إيجابيًا كاذبًا تحت الحمل.

ذات صلة: [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (تحقيقات أثناء انشغال حلقة الحدث)، [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (خنزير تسعير الكتالوج)، [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (خنزير عدد الرموز المميزة للضغط).

### مراقب systemd (حلقة الأحداث المجمدة)

على مضيف systemd، يخبر OmniRoute مدير الخدمة عندما يكون جاهزًا ويستمر في تنفيذ الأمر ping عليه، لذلك يتم قتل الخادم الذي تم تعليق حلقة الأحداث الخاصة به وإعادة تشغيله بدلاً من البقاء مستيقظًا وصامتًا. تأتي أصوات الاتصال من حلقة الأحداث الخاصة بالخادم: عندما يتم حظرها، تتوقف، ويعيد النظام تشغيل الخدمة بمجرد انقضاء `WatchdogSec` بدون وجود حلقة.

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) يكتب بالفعل وحدة مستخدم بهذا. الوحدة التي تكتبها بنفسك ( `Type=simple` الافتراضية ) لن تحصل على مراقب، لذا أضف هذه السطور إلى قسم `[Service]` الخاص بها:

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

تقوم الوحدة التي تم إنشاؤها بتعيين `Restart=on-failure`، لذا أضف هذا السطر أيضًا — بدونه، تقتل الوكالة الخدمة المتوقفة فقط بدلاً من إعادة تشغيلها.

- `Type=notify`: يتم "بدء" الخدمة عندما يرسل الخادم `READY=1`، وليس عند تفرع العملية. حدود `TimeoutStartSec` بداية بطيئة.
- `NotifyAccess=all`: يتم إرسال الأصوات بواسطة عملية الخادم، وهي تابعة لمشرف `omniroute serve`.
- `WatchdogSec`: تصدر الأصوات كل 60 ثانية، لذا استخدمها** 120 أو أكثر** . ستعمل القيم الأصغر على إعادة تشغيل خادم سليم.
- قم بتشغيل `omniroute serve` في المقدمة. يقوم `--daemon` بفصل الخادم عن مجموعة cgroup الخاصة بالوحدة ولا تكتمل عملية تأكيد الاتصال مطلقًا.

تأكد من أنه نشط بعد إعادة التشغيل:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

يعرض `WatchdogUSec` التأخير الذي تم تكوينه ويتحرك `WatchdogTimestamp` للأمام كل دقيقة. يتم تسجيل إعادة التشغيل التي تسببها هيئة المراقبة كـ `Result=watchdog`. لإيقاف تشغيل الأصوات مع الحفاظ على الوحدة كما هي، اضبط `OMNIROUTE_DISABLE_SD_NOTIFY=1`; بدون `NOTIFY_SOCKET` (محطة، Docker، Electron، Windows) لا يتم إرسال أي شيء.

تتحقق جهة المراقبة فقط من استمرار تشغيل حلقة الحدث. لا يتم إعادة تشغيل الخادم الذي يكون بطيئًا ولكن لا يزال قيد التشغيل.

### عمل مسار الطلب الاختياري (الذاكرة، المهارات، تحديث الرمز المميز)

استخراج الذاكرة وحقن المهارات وتحديث رمز OAuth بمشاركة** حلقة حدث العقدة الرئيسية** مع `/healthz`. إنها ميزات تبديل لوحة المعلومات (`memoryEnabled`، `skillsEnabled`)، وليست مجموعة عاملة. راجع [تكلفة حلقة حدث البيئة —](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### صحة المزود

> **لا توجد نقطة النهاية REST.** تتوفر بيانات صحة الموفر عبر أداة MCP `observability_snapshot` أو صفحة `/dashboard/providers` للوحة المعلومات.

### تفاصيل المزود

> **لا توجد نقطة النهاية REST.** تتوفر التفاصيل الخاصة بكل مزود عبر صفحة `/dashboard/providers` للوحة المعلومات.

---

## الطيار الآلي لصحة المزوّد

الوحدة `providerHealthAutopilot.ts` هي **نظام ذاتي الإصلاح** يقوم بما يلي:

1. يكتشف مشكلات المزوّد (فتح قاطع الدائرة، وفترات التهدئة، وحالات الحظر، وتحذيرات الحصة)
2. يُنشئ **إجراءات موصى بها** لحلها
3. ينفّذ اختياريًا الإجراءات منخفضة المخاطر **تلقائيًا**

### أنواع المشكلات المكتشفة

| نوع المشكلة                  | الخطورة | مثال على الحالة                    |
| ---------------------------- | ------- | ---------------------------------- |
| `provider_circuit_open`      | حرجة    | فتح قاطع الدائرة بعد 5 حالات فشل   |
| `provider_circuit_half_open` | تحذير   | الدائرة تختبر التعافي              |
| `connection_cooldown`        | تحذير   | الاتصال في فترة تهدئة بعد 429      |
| `stale_connection_error`     | تحذير   | فشل آخر تحديث منذ أكثر من 30 دقيقة |
| `terminal_connection_error`  | حرجة    | إلغاء OAuth أو عدم صلاحية المفتاح  |
| `inactive_connection`        | معلومات | الاتصال معطّل في الإعدادات         |
| `model_lockout`              | تحذير   | نموذج محدد قيد العزل               |
| `quota_monitor_warning`      | تحذير   | استهلاك الحصة بنسبة 80% أو أكثر    |

### أنواع الإجراءات المُنشأة

| الإجراء                        | المخاطر | الوصف                                 |
| ------------------------------ | ------- | ------------------------------------- |
| `clear_provider_breaker`       | متوسطة  | إعادة ضبط قاطع الدائرة إلى حالة مغلقة |
| `clear_connection_cooldown`    | منخفضة  | إزالة فترة التهدئة من اتصال           |
| `clear_stale_connection_error` | منخفضة  | مسح علامة الخطأ القديم                |
| `clear_model_lockout`          | منخفضة  | إعادة تمكين نموذج معزول               |
| `reactivate_connection`        | متوسطة  | إعادة تمكين اتصال أُلغي تنشيطه        |
| `deactivate_connection`        | مرتفعة  | تعطيل اتصال يسبب مشكلات               |

### واجهة API

> **لا توجد نقطة نهاية REST.** تتوفر مشكلات الطيار الآلي عبر أداة MCP المسماة `observability_snapshot` أو لوحة المعلومات. يعمل الطيار الآلي داخليًا؛ ويُضبط سلوكه عبر قاعدة بيانات الإعدادات (الحقل `autopilotMode` لكل اتصال)، وليس عبر متغيرات البيئة — لا يُرجع الأمر `grep -rn` أي نتائج لمتغير بيئة خاص بوضع الطيار الآلي.

### وضع الطيار الآلي

يعمل الطيار الآلي في **الوضع اليدوي** افتراضيًا — فهو يكتشف المشكلات ويُنشئ الإجراءات الموصى بها، لكنه لا يطبقها تلقائيًا. يمكن تطبيق الإجراءات عبر لوحة المعلومات.

---

## الطيار الآلي لصحة المجموعات

يمثل `comboHealthAutopilot.ts` النظير **الخاص بالمجموعات** للطيار الآلي الخاص بالمزوّد. ويقوم بما يلي:

- يكتشف المجموعات غير السليمة
- يوصي بإعادة ترتيب الأهداف
- يقترح تعطيل الأهداف المعطّلة
- يزيل الأهداف غير الفعالة تلقائيًا بعد N من حالات الفشل

### أمثلة على مشكلات المجموعات

```
المجموعة "always-on" (استراتيجية الأولوية)
├─ الهدف 1: openai/gpt-5 (سليم)
├─ الهدف 2: anthropic/claude-opus-4-6 (⚠️ النموذج محظور حتى 14:00)
└─ الهدف 3: kiro/claude-sonnet-4-5 (سليم)

الإجراء الموصى به: إعادة الترتيب — نقل kiro فوق anthropic حتى انتهاء الحظر
```

---

## مراقبات الحصة

يعرض `observability.ts` **مراقبات الحصة لكل جلسة** لمزوّدي الاشتراكات (Claude Code وCodex وGitHub Copilot):

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### معاني الحالات

| الحالة      | متى                          | إجراء واجهة المستخدم                    |
| ----------- | ---------------------------- | --------------------------------------- |
| `starting`  | الاستطلاع الأولي قيد التنفيذ | مؤشر تحميل                              |
| `idle`      | لا يوجد نشاط حديث            | الإخفاء من لوحة المعلومات               |
| `healthy`   | المتبقي من الحصة > 50%       | نقطة خضراء                              |
| `warning`   | المتبقي من الحصة < 50%       | تنبيه أصفر                              |
| `exhausted` | الحصة = 0%                   | كتلة حمراء، والتوجيه إلى المزوّد التالي |
| `error`     | فشل الاستطلاع                | نقطة حمراء، وإعادة المحاولة قريبًا      |

### واجهة API

> **لا توجد نقطة نهاية REST.** تتوفر بيانات مراقبة الحصة عبر أداة MCP المسماة `observability_snapshot` أو لوحة المعلومات.

---

## لقطة قابلية الرصد

تُرجع أداة MCP المسماة `observability_snapshot` **لقطة كاملة للنظام** لوكلاء الذكاء الاصطناعي:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* انظر أعلاه */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

يستخدم الوكلاء هذه البيانات لاتخاذ **قرارات التوجيه** — على سبيل المثال، «إذا كانت دائرة openai مفتوحة، فوجّه الطلب إلى anthropic أولًا».

---

## فحص سلامة الرمز المميز

تحتاج موفّرات OAuth ‏(Claude Code وGitHub Copilot وCursor) إلى **تحديث دوري للرمز المميز**. يُشغّل `src/lib/tokenHealthCheck.ts` مجدوِلًا في الخلفية:

- **دورة الفحص**: كل 60 ثانية (الفحص في `TICK_MS = 60 * 1000` في `src/lib/tokenHealthCheck.ts:30`)
- **الفاصل الزمني لفحص السلامة لكل اتصال**: 60 دقيقة افتراضيًا (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`)؛ ويمكن ضبطه عبر قاعدة بيانات الإعدادات
- **التحديث الاستباقي عند 401**: يعالجه المعترض الخاص بكل اتصال

### حالة سلامة الرمز المميز

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### التهيئة

تتم معالجة تهيئة فحص سلامة الرمز المميز داخليًا بواسطة `tokenHealthCheck.ts`.

### سلامة الرمز المميز

> **لا توجد نقطة نهاية REST.** تتوفر بيانات سلامة الرمز المميز عبر لوحة المعلومات أو أداة MCP المسماة `observability_snapshot`.

---

## التنبيهات

### القنوات المضمنة

يدعم OmniRoute **3 قنوات للتنبيهات**:

| القناة              | الإعداد      | حالة الاستخدام            |
| ------------------- | ------------ | ------------------------- |
| شريط لوحة المعلومات | مفعّل دائمًا | الإشعارات داخل التطبيق    |
| Webhook             | تهيئة URL    | Slack وDiscord وPagerDuty |
| السجل               | افتراضي      | لتجميع السجلات خارجيًا    |

### تهيئة Webhook

> **ملاحظة:** تتم معالجة تهيئة تنبيهات Webhook عبر صفحة الإعدادات في لوحة المعلومات. راجع واجهة مستخدم الإعدادات للاطلاع على URL الخاص بـ Webhook وتصفية الأحداث وتخصيص الحمولة.

### أنواع التنبيهات

| التنبيه                      | متى                                                     | مستوى الخطورة الافتراضي |
| ---------------------------- | ------------------------------------------------------- | ----------------------- |
| `provider_circuit_open`      | عند فتح الدائرة                                         | حرج                     |
| `provider_circuit_half_open` | عند اختبار استعادة الدائرة                              | معلوماتي                |
| `quota_warning`              | عندما تبلغ الحصة 80% أو أكثر                            | تحذير                   |
| `quota_exhausted`            | عندما تبلغ الحصة 100%                                   | حرج                     |
| `token_refresh_failed`       | بعد 3 حالات فشل متتالية أو أكثر في التحديث              | تحذير                   |
| `token_expired`              | عند تجاوز الرمز المميز لتاريخ انتهاء صلاحيته            | حرج                     |
| `combo_target_unhealthy`     | عندما يكون هدف المجموعة في فترة تهدئة لمدة ساعة أو أكثر | تحذير                   |
| `db_integrity_warning`       | عندما تكون انتهاكات FK أكبر من 0                        | تحذير                   |
| `heap_pressure`              | عندما يتجاوز استخدام الكومة 80% من الحد                 | تحذير                   |

---

## مقاييس الأداء

### المقاييس المتتبعة

| المقياس                 | النوع       | المصدر                          |
| ----------------------- | ----------- | ------------------------------- |
| `request_count`         | عدّاد       | `services/usage.ts`             |
| `request_latency_ms`    | مدرج تكراري | `services/usage.ts`             |
| `tokens_consumed`       | عدّاد       | `services/usage.ts`             |
| `cost_usd`              | عدّاد       | `services/usage.ts`             |
| `provider_errors`       | عدّاد       | `services/errorClassifier.ts`   |
| `circuit_state_changes` | عدّاد       | `services/resilience.ts`        |
| `cache_hits`            | عدّاد       | `services/signatureCache.ts`    |
| `compression_savings`   | مدرج تكراري | `services/compression/stats.ts` |
| `quota_used`            | مقياس       | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | مقياس       | `observability.ts`              |

### النسب المئوية لزمن الاستجابة (p50/p95/p99)

> **لا توجد نقطة نهاية REST.** تتوفر بيانات النسب المئوية لزمن الاستجابة عبر صفحة لوحة المعلومات `/dashboard/health`. ومن المخطط دعم التصدير إلى Prometheus/OpenTelemetry في v3.9.

### التصدير إلى Prometheus / OpenTelemetry (المرحلة 2)

من المخطط في v3.9: تصدير أصلي إلى Prometheus وOpenTelemetry وDatadog.

في الوقت الحالي، اجلب البيانات من `/api/monitoring/health` باستخدام أي نظام مراقبة قائم على HTTP (مثل Prometheus blackbox exporter أو فحص HTTP في Datadog، إلخ).

---

## وصفات التنبيه

### Slack

> **ملاحظة:** تُضبط تنبيهات Webhook من خلال صفحة الإعدادات في لوحة المعلومات — لا توجد متغيرات بيئة مخصصة لـ Webhook (يُرجع `grep -rn` صفر نتائج). راجع واجهة مستخدم الإعدادات لضبط عنوان URL الخاص بـ Webhook وتصفية الأحداث وتخصيص الحمولة.

### Discord

> تستخدم تنبيهات Webhook مسار واجهة مستخدم الإعدادات نفسه المستخدم مع Slack. يقبل Discord بنية حمولة JSON نفسها.

### PagerDuty

> تستخدم تنبيهات Webhook مسار واجهة مستخدم الإعدادات نفسه. تُضبط مفاتيح التوجيه الخاصة بـ PagerDuty Events API v2 في واجهة مستخدم الإعدادات.

### Webhook مخصص (JSON)

> ستعمل أي نقطة نهاية HTTP تقبل طلبات POST ذات جسم JSON. اضبط عنوان URL في واجهة مستخدم الإعدادات.

---

## إعداد لوحة المعلومات

### تخصيص لوحة معلومات الصحة

أنشئ الملف `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### تثبيت موفّر في الأعلى

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## استكشاف الأخطاء وإصلاحها

### "يشير الموفّر إلى أنه سليم، لكن الطلبات تفشل"

1. تحقق من **مشكلات الطيار الآلي** — ربما تم حظر أحد النماذج
2. راجع **الأخطاء الأخيرة** لمعرفة فئة الخطأ المحددة
3. جرّب **اختبار الاتصال** في بطاقة الموفّر
4. تحقق مما إذا كان الموفّر **خاضعًا لتحديد المعدل من المنبع** (غير مرئي محليًا)

### "تشير الحصة إلى أنها سليمة، لكنني أرى أخطاء 429"

- يعني 429 أن الموفّر يشير إلى أنك استنفدت حصتك
- قد يكون تتبع الحصة في OmniRoute **قديمًا** — الحقيقة المعتمدة لدى الموفّر في المنبع
- تُحدّث بيانات الحصة تلقائيًا عبر مراقب الحصة الداخلي

### "تفشل المجموعة، لكن جميع الأهداف تبدو سليمة"

- تحقق من لوحة معلومات **صحة المجموعة** بحثًا عن مشكلات في ترتيب الأهداف
- راجع **أحداث الرجوع الاحتياطي** — ربما تستنفد المجموعة خياراتها بسرعة كبيرة
- تحقق من أن **الاستراتيجية** تطابق حالة استخدامك (الأولوية مقابل التناوب مقابل التلقائي)

### "يفشل فحص صحة قاعدة البيانات"

- شغّل `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- إذا كانت النتيجة "ok" — فهذا إنذار كاذب، إذ إن فحص الصحة صارم أكثر من اللازم
- إذا كانت النتيجة أي شيء آخر — **أوقف OmniRoute** واتبع [دليل التعافي من الكوارث](./DATABASE_GUIDE.md#disaster-recovery)

### "ضغط كومة الذاكرة حرج"

```bash
# تحقق من الكومة الحالية
node -e "console.log(process.memoryUsage())"

# شغّل جمع البيانات المهملة يدويًا (إذا كان --expose-gc مفعّلًا)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# قلّل الطلبات المتزامنة (اضبطها عبر صفحة الإعدادات في لوحة المعلومات، وليس عبر متغير بيئة)
# لا يوجد متغير بيئة باسم `MAX_CONCURRENT_REQUESTS` — اضبطه في الإعدادات ← التزامن.
```

---

## انظر أيضًا

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — تتبّع الاستخدام والتكلفة
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — مخطط قاعدة البيانات وحالتها
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — حالة الوكيل (ذاكرة تخزين مؤقت منفصلة)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — معمارية النظام
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — تفاصيل قاطع الدائرة
- المصدر: `src/lib/monitoring/` (4 ملفات، 2121 سطرًا برمجيًا)
