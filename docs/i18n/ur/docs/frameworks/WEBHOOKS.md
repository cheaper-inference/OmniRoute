# Webhooks (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **سچائی کا ماخذ:** `src/lib/webhookDispatcher.ts`، `src/lib/db/webhooks.ts`، `src/app/api/webhooks/`**آخری اپ ڈیٹ:** 28-06-2026 — v3.8.40

OmniRoute پلیٹ فارم ایونٹس پر HTTP ویب ہکس کو فائر کر سکتا ہے۔ انہیں Slack، PagerDuty، Datadog، اندرونی الرٹنگ سروسز، یا کسی HTTP وصول کنندہ کے ساتھ ضم کرنے کے لیے استعمال کریں۔

ڈسپیچر HMAC-SHA256 کے ساتھ ہر ڈیلیوری پر دستخط کرتا ہے، عارضی ناکامیوں پر دوبارہ کوشش کرتا ہے، فی ویب ہک ڈیلیوری کی صحت کو ٹریک کرتا ہے، اور ناکام ہونے والے اختتامی پوائنٹس کو خودکار طور پر غیر فعال کرتا ہے۔

## تعاون یافتہ واقعات

`WebhookEvent` قسم (`src/lib/webhooks/eventDescriptions.ts`, `src/lib/webhookDispatcher.ts` کے ذریعہ استعمال کیا جاتا ہے ) فی الحال سات واقعات کا ماڈل بناتا ہے:

| واقعہ                     | جب آگ لگتی ہے۔                                                                               |
| ------------------------- | -------------------------------------------------------------------------------------------- |
| `request.completed`       | ایک پراکسی درخواست کامیابی کے ساتھ مکمل ہو جاتی ہے۔                                          |
| `request.failed`          | تمام retries/fallback کے بعد ایک پراکسی درخواست ناکام ہوجاتی ہے۔                             |
| `quota.exceeded`          | ایک API کلید budget/quota حد کو عبور کرتی ہے۔                                                |
| `proxy.set_aside`         | ایک پراکسی پول ممبر کو بار بار انکار کے بعد الگ کر دیا جاتا ہے (صرف منتقلی)                  |
| `proxy.pool.exhausted`    | پراکسی پول اسکوپ کے ہر ممبر کو الگ کر دیا گیا ہے۔                                            |
| `provider.reset_redeemed` | خودکار طور پر لاگو بینک شدہ ری سیٹس نے ری سیٹ کریڈٹ یا Claude ہفتہ وار سیشن ری سیٹ کو چھڑایا |
| `test.ping`               | ٹیسٹ اینڈ پوائنٹ کے ذریعے استعمال ہونے والا مصنوعی واقعہ                                     |

سبسکرپشنز ہر ایونٹ کو حاصل کرنے کے لیے لفظی `"*"` قبول کرتی ہیں۔ `events` میں نامعلوم ایونٹ کے ناموں کو ڈسپیچ کے وقت نظر انداز کر دیا جاتا ہے۔

> نوٹ: ڈسپیچر API وائرڈ ہے، لیکن کچھ غیر `test.ping` ایونٹس کے لیے پروڈکشن کال سائٹس اب بھی اتر رہی ہیں۔ یہ دیکھنے کے لیے `grep dispatchEvent` چیک کریں کہ فی الحال آپ کی ریلیز میں کون سے راستے ڈسپیچر کو پکارتے ہیں۔

## فن تعمیر

```
Caller (handler, service, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filter by webhook.events
    -> for each match (in parallel):
       deliverWebhook(url, payload, secret)
         build payload { event, timestamp, data }
         sign body with HMAC-SHA256 (if secret present)
         POST with 10s timeout
         retry up to 3 times on 5xx / network error
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

ڈسپیچ کال کرنے والے کے لیے فائر اینڈ فرجٹ ہے: `Promise.allSettled` فی ویب ہک کی غلطیوں کو نگل لیتا ہے اس لیے ایک برا وصول کنندہ دوسرے کو بلاک نہیں کر سکتا۔

## HMAC دستخط کرنا

جب ویب ہک میں `secret` ہوتا ہے، OmniRoute JSON باڈی پر دستخط کرتا ہے اور بھیجتا ہے:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> ہیڈر کے نام `X-Webhook-*` سابقہ استعمال کرتے ہیں ( `X-OmniRoute-*` نہیں )۔ دستخط کی قدر `sha256=<hex>` — ہے مکمل سابقہ کی تصدیق کریں۔

اگر `createWebhook` کو بغیر کسی راز کے کہا جاتا ہے، DB ماڈیول ایک (`whsec_<48 hex>`) تیار کرتا ہے لہذا تمام ویب ہکس بطور ڈیفالٹ دستخط کیے جاتے ہیں۔

### وصول کنندہ پر تصدیق ہو رہی ہے۔

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

کے خلاف ہمیشہ تصدیق کریں۔**خام** کسی بھی JSON کی تجزیہ سے پہلے باڈی کی درخواست کریں۔

## دوبارہ کوشش کریں اور ناکامی کی پالیسی

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 سیکنڈ ٹائم آؤٹ فی کوشش (`AbortController`)۔
- HTTP 2xx کامیابی کے طور پر شمار ہوتا ہے۔
- HTTP 3xx/4xx کا شمار ایک ناقابل واپسی حتمی حیثیت کے طور پر کیا جاتا ہے — جو `success = res.ok` کے ساتھ ڈیلیور کیا گیا ہے۔
- HTTP 5xx اور نیٹ ورک کی خرابیوں کو ایکسپونیشنل بیک آف کے ساتھ دوبارہ آزمایا جاتا ہے: `2^attempt * 1000 ms` (1s, 2s, 4s)۔
- `maxRetries` کے بعد، ڈیلیوری کو ناکام کے طور پر ریکارڈ کیا جاتا ہے۔
- ہر ڈیلیوری `last_triggered_at`, `last_status` اپ ڈیٹ کرتی ہے اور یا تو `failure_count` ری سیٹ کرتی ہے یا ان میں اضافہ کرتی ہے۔
- ڈسپیچر ہر فین آؤٹ کے بعد `disableWebhooksWithHighFailures(10)` کال کرتا ہے، لہذا `failure_count >= 10` کے ساتھ کوئی بھی ویب ہک خود بخود غیر فعال ہو جاتا ہے۔

## ڈیٹا بیس

جدول `webhooks` (ہجرت `011_webhooks.sql`):

| کالم                | قسم     | نوٹس                                                 |
| ------------------- | ------- | ---------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                 |
| `url`               | TEXT    | منزل URL                                             |
| `events`            | TEXT    | JSON صف؛ پہلے سے طے شدہ `["*"]`                      |
| `secret`            | TEXT    | HMAC راز (اگر نہیں دیا گیا تو خود کار طریقے سے تیار) |
| `enabled`           | INT     | 0/1؛ پہلے سے طے شدہ 1                                |
| `description`       | TEXT    | اختیاری انسانی لیبل                                  |
| `created_at`        | TEXT    | `datetime('now')`                                    |
| `last_triggered_at` | TEXT    | ترسیل کی ہر کوشش پر اپ ڈیٹ                           |
| `last_status`       | INT     | آخری کوشش کی HTTP کی حیثیت (0 = نیٹ ورک)             |
| `failure_count`     | INT     | کامیابی پر 0، ناکامی پر + 1 پر ری سیٹ کرتا ہے۔       |

ڈیلیوری کی تاریخ وقف `webhook_deliveries` ٹیبل میں برقرار رہتی ہے (ہجرت `069_webhook_deliveries.sql`، ہر کوشش پر `src/lib/db/webhookDeliveries.ts::insertDelivery` کے ذریعے لکھا جاتا ہے)، `webhooks` قطار میں مجموعی کاؤنٹرز کے علاوہ۔ قسم کا میٹا ڈیٹا (Slack / Discord / Telegram / کسٹم پے لوڈ ٹرانسفارمرز) `070_webhooks_kind_metadata.sql` کے ذریعہ شامل کیا گیا تھا۔

## REST API

تمام اینڈ پوائنٹس کے لیے انتظامی تصدیق (`requireManagementAuth`) کی ضرورت ہوتی ہے۔

| اختتامی نقطہ                    | طریقہ  | تفصیل                                    |
| ------------------------------- | ------ | ---------------------------------------- |
| `/api/webhooks`                 | GET    | ویب ہکس کی فہرست (راز پوشیدہ)            |
| `/api/webhooks`                 | POST   | ویب ہک بنائیں                            |
| `/api/webhooks/[id]`            | GET    | ویب ہُک کی تفصیل (مکمل راز)              |
| `/api/webhooks/[id]`            | PUT    | فیلڈز کو اپ ڈیٹ کریں۔                    |
| `/api/webhooks/[id]`            | DELETE | ہٹا دیں۔                                 |
| `/api/webhooks/[id]/test`       | POST   | `test.ping` فائر کریں (کوئی کوشش نہیں)   |
| `/api/webhooks/[id]/deliveries` | GET    | ایک ویب ہک کے لیے حالیہ ترسیل کی کوششیں۔ |
| `/api/webhooks/validate-url`    | POST   | پری فلائٹ URL کی توثیق (SSRF گارڈ)       |

`GET /api/webhooks` فہرست کے صفحات پر لیک ہونے سے بچنے کے لیے `<first 10 chars>...` کے راز کو چھپا دیتا ہے۔ جب آپ کو حقیقت میں راز کی ضرورت ہو تو `[id]` GET استعمال کریں۔

### ویب ہک بنائیں

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Slack alerts"
  }'
```

اگر `secret` کو چھوڑ دیا جاتا ہے، تو سرور ایک `whsec_<hex>` راز تیار کرتا ہے اور اسے جواب میں واپس کرتا ہے۔

### ویب ہک کی جانچ کریں۔

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` لوٹاتا ہے۔ کسی بھی کوشش کی کوشش نہیں کی جاتی ہے — فوری طور پر توثیق کرنے کے لیے مفید ہے کہ وصول کنندہ پے لوڈ اور دستخط قبول کرتا ہے۔

## ڈیش بورڈ

`/dashboard/webhooks` پر ڈیش بورڈ صفحہ ( `src/app/(dashboard)/dashboard/webhooks/page.tsx` دیکھیں ) فراہم کرتا ہے:

- ایونٹ چننے والے کے ساتھ Create/edit ویب ہکس
- `enabled`، `failure_count`، اور `last_status` پر مبنی اسٹیٹس انڈیکیٹر (فعال/غیر فعال/غلط)
- ایک کلک ٹیسٹ ڈیلیوری
- دستی enable/disable ٹوگل

## پے لوڈ کی مثالیں۔

### request.completed

```json
{
  "event": "request.completed",
  "timestamp": "2026-05-13T20:30:00.123Z",
  "data": {
    "trace_id": "...",
    "api_key_id": "...",
    "provider": "openai",
    "model": "gpt-5",
    "status": 200,
    "tokens_in": 142,
    "tokens_out": 350,
    "cost_usd": 0.0042
  }
}
```

### test.ping

```json
{
  "event": "test.ping",
  "timestamp": "2026-05-13T20:32:00.000Z",
  "data": {
    "message": "Test webhook delivery from OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

غیر `test.ping` واقعات کے لیے فیلڈ کی شکلیں کال سائٹس کے ذریعے بیان کی جاتی ہیں جو ان کو خارج کرتی ہیں۔ `data` آبجیکٹ کو فارورڈ کمپیٹیبل سمجھیں (فیلڈز شامل کریں، غیر موجودگی پر انحصار نہ کریں)۔

## بہترین طرز عمل

- **ہر ڈیلیوری پر دستخط کی تصدیق کریں۔** خام جسم کے خلاف — جعلی POSTs کسی ایسے شخص سے روکتا ہے جو آپ کے ویب ہک URL کا اندازہ لگاتا ہے۔
- **~ 5 سیکنڈ کے اندر 2xx جواب دیں۔** — ڈسپیچر کا ٹائم 10 سیکنڈ پر ختم ہو جاتا ہے۔ سست ریسیورز دوبارہ کوششیں کریں گے اور `failure_count` بڑھا دیں گے۔
- **ہینڈلرز کو کمزور بنائیں** — دوبارہ کوشش کریں اور کم از کم ایک بار ڈیلیوری سیمنٹکس کا مطلب ہے کہ نقلیں ممکن ہیں۔
- **کم سے کم سبسکرائب کریں۔** — صرف ان واقعات کی فہرست دیتا ہے جو آپ اصل میں استعمال کرتے ہیں۔ `"*"` وصول کنندگان پر لاگت کا اضافہ کرے گا جن پر آپ کا کنٹرول نہیں ہے۔
- **`failure_count` دیکھیں** مسلسل 10 ناکامیوں پر — اینڈ پوائنٹس خودکار طور پر غیر فعال ہو جاتے ہیں۔ ریسیور کو ٹھیک کرنے کے بعد `PUT /api/webhooks/[id]` `enabled: true` کے ساتھ کال کرکے دوبارہ ترتیب دیں۔
- **وقتا فوقتا رازوں کو گھمائیں۔** — `PUT` ایک نیا `secret`، وصول کنندہ پر نئی قدر تعینات کریں، اور ٹیسٹ اینڈ پوائنٹ کے ذریعے تصدیق کریں۔

## یہ بھی دیکھیں

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — مکمل انتظام API سطح
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — سرکٹ بریکر / کولڈاؤن سیمنٹکس فراہم کنندہ کی ناکامیوں کے پیچھے `request.failed` کے ذریعے سامنے آیا
- ماخذ: `src/lib/webhookDispatcher.ts`، `src/lib/db/webhooks.ts`
