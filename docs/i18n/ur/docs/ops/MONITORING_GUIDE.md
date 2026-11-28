# Monitoring & Observability Guide (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **خلاصہ**: OmniRoute میں صحت کی اندرونی نگرانی، فراہم کنندہ آٹو پائلٹ، کوٹا ٹریکنگ، اور مشاہداتی ہُکس شامل ہیں۔ یہ رہنما ڈیش بورڈ، انتباہات، اور خرابیوں کے ازالے کا احاطہ کرتا ہے۔

**ماخذ:**

- `src/lib/monitoring/observability.ts` — مشاہداتی اسنیپ شاٹ
- `src/lib/monitoring/comboHealthAutopilot.ts` — کومبو ہیلتھ آٹو پائلٹ
- `src/lib/monitoring/providerHealthAutopilot.ts` — فراہم کنندہ آٹو پائلٹ
- `src/lib/monitoring/providerHealthMatrix.ts` — فراہم کنندہ ہیلتھ میٹرکس
- `src/lib/localHealthCheck.ts` — مقامی صحت کی جانچ
- `src/lib/tokenHealthCheck.ts` — ٹوکن ریفریش کی صحت
- `src/lib/proxyHealth.ts` — پراکسی ہیلتھ کیش (PROXY_GUIDE.md میں شامل)

---

## جائزہ

OmniRoute میں **نگرانی کی 3 تہیں** ہیں:

```
┌──────────────────────────────────────────────────────────────┐
│  تہہ 1: سسٹم کی صحت (سرور کی سطح پر)                          │
│  ├─ localHealthCheck.ts — DB، پورٹس، مقامی انحصارات           │
│  ├─ db/healthCheck.ts — سالمیت، FK، غیر منسلک باقیات          │
│  └─ ڈیش بورڈ: /dashboard/health                              │
├──────────────────────────────────────────────────────────────┤
│  تہہ 2: فراہم کنندہ کی صحت (ہر فراہم کنندہ کی لچک)             │
│  ├─ providerHealthAutopilot.ts — سرکٹ بریکر، کول ڈاؤنز        │
│  ├─ providerHealthMatrix.ts — فراہم کنندہ/ماڈل کے لحاظ سے صحت کے اسکور │
│  └─ ڈیش بورڈ: /dashboard/providers                           │
├──────────────────────────────────────────────────────────────┤
│  تہہ 3: لائیو مشاہدہ پذیری (رن ٹائم اسنیپ شاٹس)               │
│  ├─ observability.ts — سرکٹ بریکرز، سیشنز، کوٹا               │
│  ├─ tokenHealthCheck.ts — OAuth ٹوکن ریفریش کی صحت            │
│  └─ MCP ٹولز: omniroute_get_health، omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## ڈیش بورڈ کے صفحات

### `/dashboard/health` (سسٹم کی صحت)

اعلیٰ سطحی ہیلتھ ڈیش بورڈ یہ معلومات دکھاتا ہے:

| حصہ                      | یہ کیا دکھاتا ہے                                |
| ------------------------ | ----------------------------------------------- |
| **سرور کی حالت**         | اپ ٹائم، ورژن، پورٹ، فعال کنکشنز                |
| **ڈیٹابیس**              | کنکشن، سالمیت، WAL سائز، حالیہ مائیگریشنز       |
| **فراہم کنندہ کا خلاصہ** | فعال تعداد، صحت مند تعداد، کھلے بریکرز کی تعداد |
| **کوٹا مانیٹرز**         | فعال سیشنز، انتباہی حالت، ختم شدہ کوٹا          |
| **حالیہ خرابیاں**        | اسٹیک ٹریسز کے ساتھ آخری 10 خرابیاں             |
| **وسائل کا استعمال**     | میموری، CPU، ہیپ پریشر کا اشاریہ                |

### `/dashboard/providers` (فراہم کنندہ کی صحت)

ہر فراہم کنندہ کا ڈیش بورڈ:

| کالم        | وضاحت                                                      |
| ----------- | ---------------------------------------------------------- |
| فراہم کنندہ | فراہم کنندہ ID + ظاہری نام                                 |
| صحت         | سبز/پیلی/سرخ حالت                                          |
| سرکٹ        | کھلی/بند/نیم کھلی حالت                                     |
| کنکشنز      | کنکشنز کی تعداد، آخری ریفریش                               |
| ماڈلز       | دستیاب ماڈلز، ہر ماڈل کی صحت                               |
| لاگت        | آج کی لاگت، 7 دن کا رجحان                                  |
| خرابیاں     | گزشتہ 24 گھنٹوں کی خرابیوں کی تعداد، سرفہرست خرابی کی کلاس |

کسی فراہم کنندہ پر کلک کرکے یہ معلومات دیکھیں:

- تاخیر کی تفصیل کے ساتھ حالیہ درخواستیں
- ہر کنکشن کے صحت کے اسکور
- ہر ماڈل کے لاک آؤٹس
- آٹو پائلٹ کی سفارشات

### `/dashboard/quota` (کوٹا ٹریکنگ)

ہر API کلید کے لیے:

- موجودہ استعمال بمقابلہ حد (پروگریس بار)
- کوٹا کا رجحان (30 دن کا چارٹ)
- اگلا ری سیٹ وقت
- انتباہات کی تاریخ

### `/dashboard/combos` (کومبو کی صحت)

ہر کومبو کے لیے:

- حکمت عملی + اہداف
- ہر ہدف کی صحت
- حالیہ فال بیک واقعات
- کامیابی کی شرح (24 گھنٹے، 7 دن، 30 دن)

---

## ہیلتھ چیک API

OmniRoute بے نقاب کرتا ہے۔** دو** HTTP صحت کی سطحیں وہ آرکیسٹریٹرز کے لیے قابل تبادلہ نہیں ہیں۔

| راستہ                        | مقصد                                                            | وزن                                     | کے لیے استعمال کریں۔                                                     |
| ---------------------------- | --------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------ |
| `GET /healthz`               | لائف سائیکل liveness/readiness (`ok` / `starting` / `stopping`) | معمولی (صرف فیز فلیگ)                   | کوبرنیٹس** تیاری** ; نرم** زندہ دلی** اگر آپ کو HTTP استعمال کرنا چاہیے۔ |
| `GET /api/monitoring/health` | ڈیپ سسٹم + فراہم کنندہ کا خلاصہ (DB، ہیپ، کیٹلاگ شمار، …)       | بھاری (مطابقت پذیری DB / نگرانی کا کام) | ڈیش بورڈز، بلیک باکس ڈیپ چیک، Docker کا بلٹ ان ہیلتھ چیک                 |

> **نوٹ:** فراہم کنندہ ہیلتھ میٹرکس، آٹو پائلٹ ایشوز، کوٹہ مانیٹر، ٹوکن ہیلتھ، اور `/api/monitoring/health` سے آگے لیٹنسی کی تفصیلات کے ذریعے دستیاب ہیں۔**MCP ٹول** `observability_snapshot` یا** ڈیش بورڈ** صفحات — ان کے لیے کوئی وقف شدہ REST راستے نہیں ہیں۔

دونوں راستے پر چلتے ہیں۔** ایک ہی نوڈ ایونٹ لوپ** درخواست سے نمٹنے کے طور پر. سی پی یو سے منسلک راستہ ( `GET /v1/models` کیٹلاگ کا بڑا کام، طویل سیاق و سباق کمپریشن / ٹوکن گنتی) تاخیر کر سکتا ہے** تمام** HTTP ہینڈلرز، بشمول `/healthz`۔ ایونٹ-لوپ مصروف ≠ عمل ختم ہو گیا۔ ہاگ کو ٹھیک کرنے کو ترجیح دیں؛ تحقیقاتی ٹیوننگ صرف جھوٹی ہلاکتوں کو کم کرتی ہے۔

### ہلکا پھلکا آرکیسٹریٹر پروب

```bash
GET /healthz
# or HEAD /healthz
```

- **200** + باڈی `ok` جب سرور لائف سائیکل مرحلہ تیار ہو۔
- **503** + `starting` / `stopping` بوٹ یا بند کے دوران
- نفاذ: `src/app/healthz/route.ts` (کوئی DB پنگ نہیں)

### نظام صحت (گہری)

```bash
GET /api/monitoring/health
```

جواب:

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

#### `credentialHealth`: پروب-کیشے بمقابلہ SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` ہے** ان میموری پروب-کیشے گیج** , `provider_connections.test_status` کا لائیو ڈمپ نہیں . #12532 کے بعد درخواست کا راستہ صرف `getCachedCredentialHealthSummary()` پڑھتا ہے۔ پس منظر کی تحقیقات ایونٹ لوپ سے دور کیشے کو ریفریش کرتی ہیں۔

| تہہ                  | جہاں                                                                  | اس کا کیا مطلب ہے۔                                                                                                                                                                                                |
| -------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| پروب-کیشے گیج        | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | آخری سندی صحت کی تحقیقات کے نتائج ابھی بھی پروسیس میموری میں رکھے ہوئے ہیں۔ `source` ہمیشہ `probe-cache` ہوتا ہے۔                                                                                                 |
| ناکام کنکشن کی تفصیل | `credentialHealth.failedConnections`                                  | حاضر** صرف جب `failed > 0`** . `status=error` (`connectionId`, `status`, sanitized `lastError` / `lastErrorType`) کے ساتھ کیشے کی قطاروں کی پابند فہرست۔ `failedOmitted` سیٹ کیا جاتا ہے جب فہرست کیپ کی گئی تھی۔ |
| SQLite چپچپا حیثیت   | `credentialHealth.staleDbNonOkCount`                                  | کی گنتی** فعال** (`is_active=1`) کنکشن کی قطاریں جن کی برقرار `test_status` ایک معروف نان اوکے ہے (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`)۔                              |

دونوں پرتیں جان بوجھ کر اختلاف کر سکتی ہیں:

- Gauge `failed=0` جبکہ `staleDbNonOkCount>0` — SQLite میں اب بھی ایک چپچپا `test_status` ہے (مثال کے طور پر `expired` یا `credits_exhausted`) کہ تازہ ترین پروب-کیشے اسنیپ شاٹ کو `status=error` شمار نہیں کیا جاتا ہے۔
- گیج `failed>0` جبکہ SQLite صحت مند نظر آرہا ہے — حالیہ تحقیقات ناکام ہوئی اور کیش ہو گئی۔ DB قطار کو اپ ڈیٹ نہیں کیا گیا، یا بعد میں صاف کر دیا گیا۔

اس اختتامی نقطہ کو سکریپ کرتے وقت صرف `provider_connections.test_status` پر خبردار نہ کریں۔ براہ راست تحقیقات کی ناکامیوں کے لیے `failed` + `failedConnections` استعمال کریں، اور جب آپ کو مستقل چپچپا اسٹیٹس کی گنتی کی ضرورت ہو تو `staleDbNonOkCount` استعمال کریں۔

### Kubernetes کی تحقیقات کی سفارشات

OmniRoute ہے a** سنگل نوڈ کا عمل** (ایک واقعہ لوپ) اسٹاک Docker `HEALTHCHECK` ہلکے وزن کے `/healthz` کو نشانہ بناتا ہے۔ `/api/monitoring/health` ہے** بہت بھاری** کبلیٹ زندہ رہنے کے وقفوں کے لیے۔

| تحقیقات      | تجویز کردہ ہدف                                                                 | نوٹس                                                                                                                                                                                                                                                                                                                                            |
| ------------ | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **آغاز**     | HTTP `GET /healthz` ایک لمبے `failureThreshold` (یا بڑے `startPeriod`) کے ساتھ | کولڈ سٹارٹ + SQLite ہجرت چند سیکنڈ سے زیادہ ہو سکتی ہے۔                                                                                                                                                                                                                                                                                         |
| **تیاری**    | HTTP `GET /healthz`                                                            | لائف سائیکل `ok` / `starting` / `stopping` (200 بمقابلہ 503)۔ اگر لوپ CPU بلاک ہو تو پھر بھی فلیپ ہوتا ہے۔ اے** ایک سے زیادہ سیکنڈ میں 200 صحت مند نہیں ہے۔** (#10303) — اس کا مطلب ہے کہ ایونٹ کا لوپ 3 بائٹ ہینڈلر کے چلنے سے پہلے ہی بھوکا تھا                                                                                               |
| **زندہ دلی** | HTTP `GET /livez`،** یا TCP** مین سروس پورٹ پر (`PORT`, ڈیفالٹ `20128`)        | `/livez` صرف عمل کے لیے زندہ ہے (ہمیشہ 200 اگر ہینڈلر چلتا ہے)۔ یہ اب بھی ایونٹ لوپ — مصروف ≠ ڈیڈ کو شیئر کرتا ہے، اور یہ TCP سے بہتر ایونٹ-لوپ بھوک (#10303) کا پتہ نہیں لگاتا ہے۔ ترجیح دیں۔**TCP** اگر HTTP تحقیقات catalog/compression بوجھ کے تحت وقت ختم ہو جاتی ہے؛ کرو** نہیں** شارٹ ایونٹ لوپ اسٹالز پر کسی بھی طرح سے پوڈ کو مار ڈالو |
| **گہری صحت** | ایک بیرونی چیکر سے `GET /api/monitoring/health`                                | kubelet `livenessProbe` / تنگ `readinessProbe`                                                                                                                                                                                                                                                                                                  |

مثال کی شکل (اپنے کولڈ سٹارٹ اور کمپریشن بوجھ میں حد کو ایڈجسٹ کریں):

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

**مت کرو** نقطہ کبلیٹ** زندہ دلی** `/api/monitoring/health` میں یہ راستہ حقیقی DB/monitoring کام کرتا ہے اور بوجھ کے تحت غلط مثبت ہوگا۔

متعلقہ: [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (ایونٹ لوپ کے مصروف ہونے کے دوران تحقیقات)، [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (کیٹلاگ پرائسنگ ہوگ)، [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (کمپریشن ٹوکن کاؤنٹ ہاگ)۔

### سسٹمڈ واچ ڈاگ (منجمد ایونٹ لوپ)

سسٹمڈ ہوسٹ پر، OmniRoute سروس مینیجر کو بتاتا ہے جب یہ تیار ہوتا ہے اور اسے پنگ لگاتا رہتا ہے، اس لیے ایک سرور جس کا ایونٹ لوپ پھنس جاتا ہے وہ خاموش رہنے کے بجائے ہلاک ہو جاتا ہے اور دوبارہ شروع ہو جاتا ہے۔ پنگز سرور کے اپنے ایونٹ لوپ سے آتے ہیں: جب یہ بلاک ہو جاتا ہے، تو وہ رک جاتے ہیں، اور `WatchdogSec` کے بغیر گزر جانے کے بعد systemd سروس کو دوبارہ شروع کر دیتا ہے۔

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) پہلے ہی اس کے ساتھ صارف یونٹ لکھتا ہے۔ ایک یونٹ جسے آپ خود لکھتے ہیں (پہلے سے طے شدہ `Type=simple`) کو کوئی واچ ڈاگ نہیں ملتا ہے، لہذا ان لائنوں کو اس کے `[Service]` سیکشن میں شامل کریں:

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

تیار کردہ یونٹ `Restart=on-failure` کو سیٹ کرتا ہے، لہذا اس لائن کے ساتھ ساتھ — بھی شامل کریں اس کے بغیر واچ ڈاگ پھنسی ہوئی سروس کو دوبارہ شروع کرنے کے بجائے صرف مار دیتا ہے۔

- `Type=notify`: جب سرور `READY=1` بھیجتا ہے تو سروس "شروع" ہوتی ہے، نہ کہ جب عمل شروع ہوتا ہے۔ `TimeoutStartSec` ایک سست آغاز کا پابند ہے۔
- `NotifyAccess=all`: پنگز سرور کے عمل کے ذریعے بھیجے جاتے ہیں، جو کہ `omniroute serve` سپروائزر کا بچہ ہے۔
- `WatchdogSec`: پنگ ہر 60 سیکنڈ میں باہر نکلتے ہیں، لہذا استعمال کریں۔** 120 یا اس سے زیادہ** . چھوٹی اقدار ایک صحت مند سرور کو دوبارہ شروع کریں گی۔
- پیش منظر میں `omniroute serve` چلائیں۔ `--daemon` سرور کو یونٹ کے سی گروپ سے الگ کرتا ہے اور مطلع ہینڈ شیک کبھی مکمل نہیں ہوتا ہے۔

چیک کریں کہ یہ دوبارہ شروع کرنے کے بعد فعال ہے:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` ترتیب شدہ تاخیر کو ظاہر کرتا ہے اور `WatchdogTimestamp` ہر منٹ آگے بڑھتا ہے۔ واچ ڈاگ کی وجہ سے دوبارہ شروع ہونے کو `Result=watchdog` کے بطور ریکارڈ کیا جاتا ہے۔ یونٹ کو اسی طرح رکھتے ہوئے پنگز کو آف کرنے کے لیے، سیٹ کریں `OMNIROUTE_DISABLE_SD_NOTIFY=1`؛ `NOTIFY_SOCKET` (ٹرمینل، Docker، Electron، Windows) کے بغیر کچھ نہیں بھیجا جاتا ہے۔

واچ ڈاگ صرف یہ چیک کرتا ہے کہ ایونٹ کا لوپ چلتا رہتا ہے۔ ایک سرور جو سست ہے لیکن پھر بھی مڑ رہا ہے دوبارہ شروع نہیں ہوا ہے۔

### اختیاری درخواست کے راستے کا کام (میموری، ہنر، ٹوکن ریفریش)

میموری نکالنے، مہارت کے انجکشن، اور OAuth ٹوکن ریفریش کا اشتراک کریں** مین نوڈ ایونٹ لوپ** `/healthz` کے ساتھ وہ ڈیش بورڈ ٹوگل فیچرز ہیں (`memoryEnabled`, `skillsEnabled`)، ورکر پول نہیں۔ [Environment — ایونٹ لوپ لاگت](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349) دیکھیں۔

### صحت فراہم کرنے والا

> **کوئی REST اختتامی نقطہ نہیں۔** فراہم کنندہ کی صحت کا ڈیٹا MCP ٹول `observability_snapshot` یا ڈیش بورڈ `/dashboard/providers` صفحہ کے ذریعے دستیاب ہے۔

### فراہم کنندہ کی تفصیل

> **کوئی REST اختتامی نقطہ نہیں۔** فی فراہم کنندہ کی تفصیل ڈیش بورڈ `/dashboard/providers` صفحہ کے ذریعے دستیاب ہے۔

---

## پرووائیڈر ہیلتھ آٹو پائلٹ

`providerHealthAutopilot.ts` ماڈیول ایک **خود بحال ہونے والا نظام** ہے جو:

1. پرووائیڈر کے مسائل کا پتہ لگاتا ہے (سرکٹ کھلا ہونا، کول ڈاؤنز، لاک آؤٹس، کوٹا انتباہات)
2. انہیں حل کرنے کے لیے **تجویز کردہ اقدامات** تیار کرتا ہے
3. اختیاری طور پر کم خطرے والے اقدامات کو **خودکار طور پر انجام دیتا** ہے

### دریافت کردہ مسائل کی اقسام

| مسئلے کی قسم                 | شدت      | مثالی صورتِ حال                      |
| ---------------------------- | -------- | ------------------------------------ |
| `provider_circuit_open`      | سنگین    | 5 ناکامیوں کے بعد سرکٹ بریکر کھلا ہے |
| `provider_circuit_half_open` | انتباہ   | سرکٹ بحالی کی جانچ کر رہا ہے         |
| `connection_cooldown`        | انتباہ   | 429 کے بعد کنکشن کول ڈاؤن میں ہے     |
| `stale_connection_error`     | انتباہ   | آخری ریفریش 30+ منٹ پہلے ناکام ہوا   |
| `terminal_connection_error`  | سنگین    | OAuth منسوخ، کلید غیر درست           |
| `inactive_connection`        | معلوماتی | ترتیبات میں کنکشن غیر فعال ہے        |
| `model_lockout`              | انتباہ   | مخصوص ماڈل قرنطینہ میں ہے            |
| `quota_monitor_warning`      | انتباہ   | کوٹا کا 80%+ استعمال ہو چکا ہے       |

### تیار کردہ اقدامات کی اقسام

| اقدام                          | خطرہ    | وضاحت                                       |
| ------------------------------ | ------- | ------------------------------------------- |
| `clear_provider_breaker`       | درمیانہ | سرکٹ بریکر کو بند حالت میں ری سیٹ کریں      |
| `clear_connection_cooldown`    | کم      | کنکشن سے کول ڈاؤن ہٹائیں                    |
| `clear_stale_connection_error` | کم      | فرسودہ خرابی کا فلیگ صاف کریں               |
| `clear_model_lockout`          | کم      | قرنطینہ شدہ ماڈل کو دوبارہ فعال کریں        |
| `reactivate_connection`        | درمیانہ | غیر فعال کنکشن کو دوبارہ فعال کریں          |
| `deactivate_connection`        | زیادہ   | مسئلہ پیدا کرنے والے کنکشن کو غیر فعال کریں |

### API

> **کوئی REST اینڈ پوائنٹ نہیں ہے۔** آٹو پائلٹ کے مسائل MCP ٹول `observability_snapshot` یا ڈیش بورڈ کے ذریعے دستیاب ہیں۔ آٹو پائلٹ اندرونی طور پر چلتا ہے؛ اس کا رویہ ماحول کے متغیرات کے بجائے ترتیبات کے DB کے ذریعے ترتیب دیا جاتا ہے (ہر کنکشن کا `autopilotMode` فیلڈ) — آٹو پائلٹ موڈ کے env var کے لیے `grep -rn` صفر نتائج لوٹاتا ہے۔

### آٹو پائلٹ موڈ

آٹو پائلٹ بطور ڈیفالٹ **دستی موڈ** میں کام کرتا ہے — یہ مسائل کا پتہ لگاتا اور تجویز کردہ اقدامات تیار کرتا ہے، لیکن انہیں خودکار طور پر لاگو نہیں کرتا۔ اقدامات ڈیش بورڈ کے ذریعے لاگو کیے جا سکتے ہیں۔

---

## کومبو ہیلتھ آٹو پائلٹ

`comboHealthAutopilot.ts` پرووائیڈر آٹو پائلٹ کا **کومبو کے لیے مخصوص** متبادل ہے۔ یہ:

- غیر صحت مند کومبوز کا پتہ لگاتا ہے
- اہداف کی ترتیب نو تجویز کرتا ہے
- خراب اہداف کو غیر فعال کرنے کی تجویز دیتا ہے
- N ناکامیوں کے بعد ناکارہ اہداف کو خودکار طور پر ہٹا دیتا ہے

### کومبو مسائل کی مثالیں

```
کومبو "always-on" (ترجیحی حکمتِ عملی)
├─ ہدف 1: openai/gpt-5 (صحت مند)
├─ ہدف 2: anthropic/claude-opus-4-6 (⚠️ ماڈل 14:00 تک لاک آؤٹ ہے)
└─ ہدف 3: kiro/claude-sonnet-4-5 (صحت مند)

تجویز کردہ اقدام: ترتیب نو — لاک آؤٹ ختم ہونے تک kiro کو anthropic سے اوپر منتقل کریں
```

---

## کوٹا مانیٹرز

`observability.ts` سبسکرپشن پرووائیڈرز (Claude Code، Codex، GitHub Copilot) کے لیے **ہر سیشن کے کوٹا مانیٹرز** ظاہر کرتا ہے:

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

### اسٹیٹس کے معانی

| اسٹیٹس      | کب                     | UI اقدام                                 |
| ----------- | ---------------------- | ---------------------------------------- |
| `starting`  | ابتدائی پول جاری ہے    | اسپنر                                    |
| `idle`      | کوئی حالیہ سرگرمی نہیں | ڈیش بورڈ سے پوشیدہ                       |
| `healthy`   | کوٹا کا > 50% باقی ہے  | سبز نقطہ                                 |
| `warning`   | کوٹا کا < 50% باقی ہے  | زرد انتباہ                               |
| `exhausted` | کوٹا = 0%              | سرخ بلاک، اگلے پرووائیڈر کی طرف روٹ کریں |
| `error`     | پولنگ ناکام ہو گئی     | سرخ نقطہ، جلد دوبارہ کوشش کریں           |

### API

> **کوئی REST اینڈ پوائنٹ نہیں ہے۔** کوٹا مانیٹر کا ڈیٹا MCP ٹول `observability_snapshot` یا ڈیش بورڈ کے ذریعے دستیاب ہے۔

---

## مشاہداتی اسنیپ شاٹ

MCP ٹول `observability_snapshot`، AI ایجنٹس کے لیے **سسٹم کا مکمل اسنیپ شاٹ** واپس کرتا ہے:

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
  "quotaMonitors": {/* اوپر دیکھیں */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

ایجنٹس اسے **روٹنگ کے فیصلے** کرنے کے لیے استعمال کرتے ہیں — مثلاً، "اگر openai کا سرکٹ کھلا ہو تو پہلے anthropic کی طرف روٹ کریں"۔

---

## ٹوکن کی صحت کی جانچ

OAuth فراہم کنندگان (Claude Code، GitHub Copilot، Cursor) کو **وقتاً فوقتاً ٹوکن ریفریش** کی ضرورت ہوتی ہے۔ `src/lib/tokenHealthCheck.ts` پس منظر میں ایک شیڈیولر چلاتا ہے:

- **سویپ ٹِک**: ہر 60 سیکنڈ بعد (`src/lib/tokenHealthCheck.ts:30` میں `TICK_MS = 60 * 1000` کے مطابق سویپ)
- **فی کنکشن صحت کی جانچ کا وقفہ**: ڈیفالٹ 60 منٹ (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`)؛ سیٹنگز DB کے ذریعے قابلِ ترتیب
- **401 پر پیشگی ریفریش**: فی کنکشن انٹرسیپٹر کے ذریعے سنبھالا جاتا ہے

### ٹوکن کی صحت کی حالت

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

### ترتیب

ٹوکن کی صحت کی جانچ کی ترتیب داخلی طور پر `tokenHealthCheck.ts` کے ذریعے سنبھالی جاتی ہے۔

### ٹوکن کی صحت

> **کوئی REST اینڈ پوائنٹ نہیں۔** ٹوکن کی صحت کا ڈیٹا ڈیش بورڈ یا MCP ٹول `observability_snapshot` کے ذریعے دستیاب ہے۔

---

## الرٹنگ

### بلٹ اِن چینلز

OmniRoute، **3 الرٹ چینلز** کو سپورٹ کرتا ہے:

| چینل          | سیٹ اپ        | استعمال کی صورت             |
| ------------- | ------------- | --------------------------- |
| ڈیش بورڈ بینر | ہمیشہ فعال    | اِن-ایپ اطلاعات             |
| Webhook       | URL ترتیب دیں | Slack، Discord، PagerDuty   |
| لاگ           | ڈیفالٹ        | بیرونی لاگ ایگریگیشن کے لیے |

### Webhook کی ترتیب

> **نوٹ:** Webhook الرٹنگ کی ترتیب ڈیش بورڈ کے Settings صفحے کے ذریعے سنبھالی جاتی ہے۔ Webhook URL، ایونٹ فلٹرنگ، اور پے لوڈ کی تخصیص کے لیے Settings UI دیکھیں۔

### الرٹ کی اقسام

| الرٹ                         | کب                                   | ڈیفالٹ شدت |
| ---------------------------- | ------------------------------------ | ---------- |
| `provider_circuit_open`      | سرکٹ کھلنے پر                        | نازک       |
| `provider_circuit_half_open` | سرکٹ کی بحالی کی جانچ کے دوران       | معلوماتی   |
| `quota_warning`              | کوٹہ 80%+ ہونے پر                    | انتباہ     |
| `quota_exhausted`            | کوٹہ 100% ہونے پر                    | نازک       |
| `token_refresh_failed`       | ریفریش کی مسلسل 3+ ناکامیوں پر       | انتباہ     |
| `token_expired`              | ٹوکن کی میعاد گزرنے پر               | نازک       |
| `combo_target_unhealthy`     | کومبو ہدف 1h+ تک کول ڈاؤن میں ہو     | انتباہ     |
| `db_integrity_warning`       | FK خلاف ورزیاں > 0 ہوں               | انتباہ     |
| `heap_pressure`              | ہیپ کا استعمال حد کے 80% سے زیادہ ہو | انتباہ     |

---

## کارکردگی کے میٹرکس

### ٹریک کیے جانے والے میٹرکس

| میٹرک                   | قسم      | ماخذ                            |
| ----------------------- | -------- | ------------------------------- |
| `request_count`         | کاؤنٹر   | `services/usage.ts`             |
| `request_latency_ms`    | ہسٹوگرام | `services/usage.ts`             |
| `tokens_consumed`       | کاؤنٹر   | `services/usage.ts`             |
| `cost_usd`              | کاؤنٹر   | `services/usage.ts`             |
| `provider_errors`       | کاؤنٹر   | `services/errorClassifier.ts`   |
| `circuit_state_changes` | کاؤنٹر   | `services/resilience.ts`        |
| `cache_hits`            | کاؤنٹر   | `services/signatureCache.ts`    |
| `compression_savings`   | ہسٹوگرام | `services/compression/stats.ts` |
| `quota_used`            | گیج      | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | گیج      | `observability.ts`              |

### لیٹنسی پرسنٹائلز (p50/p95/p99)

> **کوئی REST endpoint نہیں ہے۔** لیٹنسی پرسنٹائل کا ڈیٹا ڈیش بورڈ کے `/dashboard/health` صفحے کے ذریعے دستیاب ہے۔ Prometheus/OpenTelemetry ایکسپورٹ v3.9 کے لیے منصوبہ بند ہے۔

### Prometheus / OpenTelemetry ایکسپورٹ (مرحلہ 2)

v3.9 کے لیے منصوبہ بند: Prometheus، OpenTelemetry، Datadog کو مقامی ایکسپورٹ۔

فی الحال، کسی بھی HTTP پر مبنی مانیٹرنگ سسٹم (Prometheus blackbox exporter، Datadog HTTP check، وغیرہ) کے ذریعے `/api/monitoring/health` کو اسکریپ کریں۔

---

## الرٹنگ کی تراکیب

### Slack

> **نوٹ:** Webhook الرٹنگ ڈیش بورڈ کے Settings صفحے کے ذریعے کنفیگر کی جاتی ہے — اس کے لیے کوئی مخصوص webhook env vars نہیں ہیں (`grep -rn` صفر نتائج واپس کرتا ہے)۔ webhook URL، ایونٹ فلٹرنگ، اور پے لوڈ کی تخصیص کے لیے Settings UI دیکھیں۔

### Discord

> Webhook الرٹنگ، Slack جیسا ہی Settings UI طریقۂ کار استعمال کرتی ہے۔ Discord اسی JSON پے لوڈ ساخت کو قبول کرتا ہے۔

### PagerDuty

> Webhook الرٹنگ وہی Settings UI طریقۂ کار استعمال کرتی ہے۔ PagerDuty Events API v2 روٹنگ کیز Settings UI میں کنفیگر کی جاتی ہیں۔

### حسبِ ضرورت Webhook (JSON)

> JSON باڈی کے ساتھ POST قبول کرنے والا کوئی بھی HTTP endpoint کام کرے گا۔ URL کو Settings UI میں کنفیگر کریں۔

---

## ڈیش بورڈ کی کنفیگریشن

### ہیلتھ ڈیش بورڈ کو حسبِ ضرورت بنائیں

ایک `~/.omniroute/dashboard.json` بنائیں:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### کسی پرووائیڈر کو سب سے اوپر پِن کریں

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## مسائل کا ازالہ

### "پرووائیڈر صحت مند دکھائی دیتا ہے لیکن درخواستیں ناکام ہو رہی ہیں"

1. **autopilot مسائل** چیک کریں — ممکن ہے کوئی ماڈل لاک آؤٹ ہو
2. مخصوص ایرر کلاس کے لیے **حالیہ خرابیاں** دیکھیں
3. پرووائیڈر کارڈ میں **کنکشن ٹیسٹ** آزمائیں
4. چیک کریں کہ آیا پرووائیڈر **upstream پر ریٹ لمیٹڈ** ہے (مقامی طور پر دکھائی نہیں دیتا)

### "کوٹہ صحت مند دکھائی دیتا ہے لیکن مجھے 429s نظر آ رہے ہیں"

- 429 کا مطلب ہے کہ پرووائیڈر کے مطابق آپ اپنا کوٹہ استعمال کر چکے ہیں
- OmniRoute کی کوٹہ ٹریکنگ **پرانی** ہو سکتی ہے — حتمی درست صورتِ حال upstream پرووائیڈر کے پاس ہوتی ہے
- کوٹہ ڈیٹا اندرونی کوٹہ مانیٹر کے ذریعے خودکار طور پر ریفریش ہوتا ہے

### "Combo ناکام ہو رہا ہے لیکن تمام اہداف صحت مند دکھائی دیتے ہیں"

- اہداف کی ترتیب کے مسائل کے لیے **combo health** ڈیش بورڈ چیک کریں
- **fallback ایونٹس** دیکھیں — ممکن ہے combo بہت تیزی سے تمام اختیارات آزما رہا ہو
- تصدیق کریں کہ **strategy** آپ کے استعمال کے معاملے سے مطابقت رکھتی ہے (priority بمقابلہ round-robin بمقابلہ auto)

### "ڈیٹا بیس ہیلتھ چیک ناکام ہو رہا ہے"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` چلائیں
- اگر "ok" آئے — یہ غلط الارم ہے، ہیلتھ چیک ضرورت سے زیادہ سخت ہے
- اگر کچھ اور آئے — **OmniRoute کو روکیں** اور [ڈیزاسٹر ریکوری گائیڈ](./DATABASE_GUIDE.md#disaster-recovery) پر عمل کریں

### "میموری ہیپ پر دباؤ تشویش ناک ہے"

```bash
# موجودہ ہیپ چیک کریں
node -e "console.log(process.memoryUsage())"

# دستی GC متحرک کریں (اگر --expose-gc موجود ہو)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# بیک وقت درخواستوں کی تعداد کم کریں (اسے ڈیش بورڈ کے Settings صفحے کے ذریعے سیٹ کریں، env var کے ذریعے نہیں)
# کوئی `MAX_CONCURRENT_REQUESTS` env var موجود نہیں ہے — اسے Settings → Concurrency میں کنفیگر کریں۔
```

---

## مزید دیکھیں

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — استعمال اور لاگت کی ٹریکنگ
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB اسکیما + صحت
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — پراکسی کی صحت (علیحدہ کیش)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — سسٹم کا فنِ تعمیر
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — سرکٹ بریکر کی تفصیلات
- ماخذ: `src/lib/monitoring/` (4 فائلیں، 2121 LOC)
