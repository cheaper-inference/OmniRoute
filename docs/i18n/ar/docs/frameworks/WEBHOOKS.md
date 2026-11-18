# Webhooks (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **المصدر الموثوق:** `src/lib/webhookDispatcher.ts`، `src/lib/db/webhooks.ts`، `src/app/api/webhooks/`
> **آخر تحديث:** 2026-06-28 — v3.8.40

يمكن لـ OmniRoute إرسال خطافات ويب HTTP عند وقوع أحداث على المنصة. استخدمها للتكامل مع
Slack أو PagerDuty أو Datadog أو خدمات التنبيه الداخلية أو أي مستقبِل HTTP.

يوقّع المرسِل كل عملية تسليم باستخدام HMAC-SHA256، ويعيد المحاولة عند حدوث
أعطال مؤقتة، ويتتبع سلامة التسليم لكل خطاف ويب، ويعطّل تلقائيًا نقاط النهاية التي
يستمر فشلها.

## الأحداث المدعومة

يقوم نوع `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`، الذي يستهلكه `src/lib/webhookDispatcher.ts`) حاليًا بنموذج ثمانية أحداث:

| حدث                       | حرائق عندما                                                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | اكتمل طلب الوكيل بنجاح                                                                                                    |
| `request.failed`          | فشل طلب الوكيل بعد كل retries/fallback                                                                                    |
| `quota.exceeded`          | يتجاوز مفتاح API عتبة budget/quota                                                                                        |
| `proxy.set_aside`         | يتم استبعاد عضو تجمع الوكيل بعد الرفض المتكرر (الانتقال فقط)                                                              |
| `proxy.pool.exhausted`    | يتم وضع كل عضو في نطاق تجمع الوكيل جانبًا                                                                                 |
| `provider.reset_redeemed` | تم استرداد عمليات إعادة التعيين المصرفية التي يتم تطبيقها تلقائيًا برصيد إعادة تعيين أو إعادة تعيين جلسة Claude الأسبوعية |
| `provider.exhausted`      | يتم تبريد كل حساب خاص بمزود الخدمة (مرة واحدة على الأكثر لكل مزود كل 10 دقائق)                                            |
| `test.ping`               | الحدث الاصطناعي الذي تستخدمه نقطة نهاية الاختبار                                                                          |

الاشتراكات تقبل `"*"` الحرفي لتلقي كل حدث. يتم تجاهل أسماء الأحداث غير المعروفة في `events` في وقت الإرسال.

> ملاحظة: المرسل API سلكي، لكن مواقع استدعاء الإنتاج لبعض الأحداث التي لا تتعلق بـ `test.ping` ما زالت تعمل. تحقق من `grep dispatchEvent` لمعرفة المسارات التي تستدعي المرسل حاليًا في إصدارك.

## البنية

```
المستدعي (معالج، خدمة، مراقب)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> التصفية حسب webhook.events
    -> لكل تطابق (بالتوازي):
       deliverWebhook(url, payload, secret)
         إنشاء الحمولة { event, timestamp, data }
         توقيع النص باستخدام HMAC-SHA256 (إذا كان السر موجودًا)
         POST بمهلة 10 ثوانٍ
         إعادة المحاولة حتى 3 مرات عند أخطاء 5xx / أخطاء الشبكة
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

يتم الإرسال بنمط الإطلاق دون انتظار بالنسبة إلى المستدعي: تتجاهل `Promise.allSettled`
الأخطاء الخاصة بكل خطاف ويب، بحيث لا يمكن لمستقبِل معطّل واحد حظر المستقبِلات الأخرى.

## توقيع HMAC

عندما يكون لخطاف الويب `secret`، يوقّع OmniRoute نص JSON ويرسل:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> تستخدم أسماء الترويسات البادئة `X-Webhook-*` (وليس `X-OmniRoute-*`). قيمة التوقيع
> هي `sha256=<hex>` — تحقّق من البادئة كاملةً.

إذا استُدعيت `createWebhook` دون سر، فستُنشئ وحدة DB سرًا
(`whsec_<48 hex>`) بحيث تكون جميع خطافات الويب موقّعة افتراضيًا.

### التحقّق لدى المستقبِل

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

تحقّق دائمًا باستخدام نص الطلب **الخام** قبل أي تحليل لـ JSON.

## سياسة إعادة المحاولة والفشل

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- مهلة قدرها 10 ثوانٍ لكل محاولة (`AbortController`).
- تُعدّ استجابات HTTP ‏2xx نجاحًا.
- تُعدّ استجابات HTTP ‏3xx/4xx حالة نهائية غير قابلة لإعادة المحاولة — ويُسجَّل التسليم
  مع `success = res.ok`.
- يُعاد إجراء المحاولة عند استجابات HTTP ‏5xx وأخطاء الشبكة، باستخدام تراجع أُسّي:
  `2^attempt * 1000 ms` (1s، 2s، 4s).
- بعد `maxRetries`، يُسجَّل التسليم على أنه فاشل.
- يحدّث كل تسليم `last_triggered_at` و`last_status`، ويعيد تعيين
  `failure_count` أو يزيده.
- يستدعي الموزّع `disableWebhooksWithHighFailures(10)` بعد كل عملية توزيع،
  لذلك يُعطَّل تلقائيًا أي webhook تكون فيه `failure_count >= 10`.

## قاعدة البيانات

الجدول `webhooks` (الترحيل `011_webhooks.sql`):

| العمود              | النوع   | ملاحظات                                           |
| ------------------- | ------- | ------------------------------------------------- |
| `id`                | TEXT PK | UUID                                              |
| `url`               | TEXT    | عنوان URL للوجهة                                  |
| `events`            | TEXT    | مصفوفة JSON؛ القيمة الافتراضية `["*"]`            |
| `secret`            | TEXT    | سر HMAC (يُنشأ تلقائيًا إذا لم يُحدَّد)           |
| `enabled`           | INT     | 0/1؛ القيمة الافتراضية 1                          |
| `description`       | TEXT    | تسمية وصفية اختيارية                              |
| `created_at`        | TEXT    | `datetime('now')`                                 |
| `last_triggered_at` | TEXT    | يُحدَّث عند كل محاولة تسليم                       |
| `last_status`       | INT     | حالة HTTP للمحاولة الأخيرة (0 = الشبكة)           |
| `failure_count`     | INT     | يُعاد تعيينه إلى 0 عند النجاح، ويُزاد 1 عند الفشل |

يُحفَظ سجل التسليم في الجدول المخصص `webhook_deliveries`
(الترحيل `069_webhook_deliveries.sql`، وتتم الكتابة عبر
`src/lib/db/webhookDeliveries.ts::insertDelivery` عند كل محاولة)، بالإضافة
إلى العدادات المجمّعة في صف `webhooks`. أُضيفت بيانات النوع الوصفية (Slack / Discord /
Telegram / محوّلات الحمولات المخصصة) بواسطة `070_webhooks_kind_metadata.sql`.

## REST API

تتطلب كافة نقاط النهاية مصادقة الإدارة (`requireManagementAuth`).

| نقطة النهاية                    | طريقة  | وصف                                          |
| ------------------------------- | ------ | -------------------------------------------- |
| `/api/webhooks`                 | GET    | قائمة خطافات الويب (الأسرار المقنعة)         |
| `/api/webhooks`                 | POST   | إنشاء خطاف على الويب                         |
| `/api/webhooks/[id]`            | GET    | تفاصيل Webhook (السرية الكاملة)              |
| `/api/webhooks/[id]`            | PUT    | تحديث الحقول                                 |
| `/api/webhooks/[id]`            | DELETE | يزيل                                         |
| `/api/webhooks/[id]/test`       | POST   | إطلاق `test.ping` (بدون إعادة المحاولة)      |
| `/api/webhooks/[id]/deliveries` | GET    | محاولات التسليم الأخيرة لخطاف واحد على الويب |
| `/api/webhooks/validate-url`    | POST   | التحقق من URL قبل الرحلة (حارس SSRF )        |

يخفي `GET /api/webhooks` سر `<first 10 chars>...` لتجنب التسرب على صفحات القائمة. استخدم `[id]` GET عندما تحتاج إلى السر بالفعل.

### إنشاء خطاف على الويب

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

إذا تم حذف `secret` ، يقوم الخادم بإنشاء سر `whsec_<hex>` ويعيده في الاستجابة.

### اختبار خطاف الويب

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

ترجع `{ delivered, status, error }`. لا توجد محاولات لإعادة المحاولة — مفيدة للتحقق بسرعة من قبول المتلقي للحمولة والتوقيع.

## لوحة التحكم

توفر صفحة لوحة التحكم في `/dashboard/webhooks` (راجع
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) ما يلي:

- إنشاء/تعديل خطافات الويب باستخدام منتقي الأحداث
- مؤشر الحالة (نشط / غير نشط / به خطأ) استنادًا إلى `enabled` و
  `failure_count` و`last_status`
- إرسال اختباري بنقرة واحدة
- مفتاح تبديل يدوي للتمكين/التعطيل

## أمثلة على الحمولة

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
    "message": "اختبار تسليم خطاف الويب من OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

تُحدَّد أشكال الحقول لأحداث غير `test.ping` من خلال مواضع الاستدعاء التي تُصدرها؛
تعامل مع الكائن `data` على أنه متوافق مع الإصدارات المستقبلية (أضف حقولًا، ولا تعتمد على
غيابها).

## أفضل الممارسات

- **تحقق من التوقيع عند كل عملية تسليم** بمقارنته مع النص الخام للطلب — فهذا يمنع
  طلبات POST المزيفة من أي شخص يخمّن عنوان URL لخطاف الويب الخاص بك.
- **استجب برمز 2xx خلال نحو 5 ثوانٍ** — تنتهي مهلة الموزّع بعد 10 ثوانٍ. ستستهلك
  الجهات المستقبلة البطيئة محاولات إعادة الإرسال وتزيد قيمة `failure_count`.
- **اجعل المعالجات متكافئة النتائج** — تعني محاولات إعادة الإرسال ودلالات التسليم
  مرة واحدة على الأقل احتمال وجود نسخ مكررة.
- **اشترك في الحد الأدنى** — أدرج فقط الأحداث التي تستهلكها فعليًا؛ ستضيف `"*"`
  تكلفة على الجهات المستقبلة التي لا تتحكم فيها.
- **راقب `failure_count`** — تُعطَّل نقاط النهاية تلقائيًا بعد 10 حالات فشل
  متتالية؛ أعد ضبطها باستدعاء `PUT /api/webhooks/[id]` مع `enabled: true`
  بعد إصلاح الجهة المستقبلة.
- **بدّل الأسرار دوريًا** — أرسل سرًا جديدًا في `secret` باستخدام `PUT`، وانشر القيمة الجديدة
  إلى الجهة المستقبلة، وأكّدها عبر نقطة نهاية الاختبار.

## راجع أيضًا

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — واجهة API الكاملة للإدارة
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — دلالات قاطع الدائرة / فترة التهدئة
  وراء حالات فشل المزوّد الظاهرة عبر `request.failed`
- المصدر: `src/lib/webhookDispatcher.ts`، و`src/lib/db/webhooks.ts`
