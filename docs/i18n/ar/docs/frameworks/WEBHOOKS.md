# Webhooks (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **مصدر الحقيقة:** `src/lib/webhookDispatcher.ts`، `src/lib/db/webhooks.ts`، `src/app/api/webhooks/`**آخر تحديث:** 28-06-2026 — v3.8.40

يمكن لـ OmniRoute إطلاق خطافات الويب HTTP على أحداث النظام الأساسي. استخدمها للتكامل مع Slack أو PagerDuty أو Datadog أو خدمات التنبيه الداخلية أو أي جهاز استقبال HTTP.

يقوم المرسل بتوقيع كل عملية تسليم باستخدام HMAC-SHA256، وإعادة المحاولة في حالات الفشل العابر، وتتبع صحة التسليم لكل خطاف ويب، وتعطيل نقاط النهاية التي تستمر في الفشل تلقائيًا.

## الأحداث المدعومة

يقوم نوع `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`، الذي يستهلكه `src/lib/webhookDispatcher.ts`) حاليًا بنموذج سبعة أحداث:

| حدث                       | حرائق عندما                                                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | اكتمل طلب الوكيل بنجاح                                                                                                      |
| `request.failed`          | فشل طلب الوكيل بعد كل retries/fallback                                                                                      |
| `quota.exceeded`          | يتجاوز مفتاح API عتبة budget/quota                                                                                          |
| `proxy.set_aside`         | يتم استبعاد عضو تجمع الوكيل بعد الرفض المتكرر (الانتقال فقط)                                                                |
| `proxy.pool.exhausted`    | يتم وضع كل عضو في نطاق تجمع الوكيل جانبًا                                                                                   |
| `provider.reset_redeemed` | تم استرداد عمليات إعادة التعيين المصرفية التي يتم تطبيقها تلقائيًا برصيد إعادة التعيين أو إعادة تعيين جلسة Claude الأسبوعية |
| `test.ping`               | الحدث الاصطناعي الذي تستخدمه نقطة نهاية الاختبار                                                                            |

تقبل الاشتراكات `"*"` الحرفي لتلقي كل حدث. يتم تجاهل أسماء الأحداث غير المعروفة في `events` في وقت الإرسال.

> ملاحظة: المرسل API متصل سلكيًا، لكن مواقع استدعاء الإنتاج لبعض الأحداث غير `test.ping` لا تزال في حالة هبوط. تحقق من `grep dispatchEvent` لمعرفة المسارات التي تستدعي المرسل حاليًا في إصدارك.

## بنيان

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

الإرسال عبارة عن تجاهل وتجاهل للمتصل: تبتلع `Promise.allSettled` الأخطاء لكل خطاف على الويب بحيث لا يتمكن أحد المستلمين السيئين من حظر الآخرين.

## توقيع HMAC

عندما يحتوي خطاف الويب على `secret`، يقوم OmniRoute بتوقيع نص JSON ويرسل:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> تستخدم أسماء الرؤوس البادئة `X-Webhook-*` (وليس `X-OmniRoute-*`). قيمة التوقيع هي `sha256=<hex>` — تحقق من البادئة الكاملة.

إذا تم استدعاء `createWebhook` بدون سر، فإن وحدة DB تنشئ واحدًا (`whsec_<48 hex>`) بحيث يتم توقيع جميع خطافات الويب بشكل افتراضي.

### التحقق على المتلقي

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

تحقق دائمًا ضد **خام** نص الطلب، قبل أي تحليل JSON.

## سياسة إعادة المحاولة والفشل

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- مهلة 10 ثوانٍ لكل محاولة (`AbortController`).
- يعتبر HTTP 2xx نجاحًا.
- HTTP 3xx/4xx يعتبر حالة نهائية غير قابلة لإعادة المحاولة، — مسجلة على أنها تم تسليمها مع `success = res.ok`.
- تتم إعادة محاولة HTTP 5xx وأخطاء الشبكة مع التراجع الأسي: `2^attempt * 1000 ms` (1s، 2s، 4s).
- بعد `maxRetries`، يتم تسجيل التسليم على أنه فاشل.
- يقوم كل تسليم بتحديث `last_triggered_at` و `last_status` وإما إعادة تعيين `failure_count` أو زيادته.
- يتصل المرسل بـ `disableWebhooksWithHighFailures(10)` بعد كل عملية توزيع، لذلك يتم تعطيل أي خطاف ويب مع `failure_count >= 10` تلقائيًا.

## قاعدة البيانات

الجدول `webhooks` (الهجرة `011_webhooks.sql`):

| عمود                | يكتب    | ملحوظات                                           |
| ------------------- | ------- | ------------------------------------------------- |
| `id`                | TEXT PK | UUID                                              |
| `url`               | TEXT    | الوجهة URL                                        |
| `events`            | TEXT    | مجموعة JSON ؛ الافتراضي `["*"]`                   |
| `secret`            | TEXT    | سر HMAC (يتم إنشاؤه تلقائيًا إذا لم يتم تقديمه)   |
| `enabled`           | INT     | 0/1؛ الإعدادات الافتراضية إلى 1                   |
| `description`       | TEXT    | تسمية بشرية اختيارية                              |
| `created_at`        | TEXT    | `datetime('now')`                                 |
| `last_triggered_at` | TEXT    | يتم تحديثه في كل محاولة تسليم                     |
| `last_status`       | INT     | حالة HTTP للمحاولة الأخيرة (0 شبكة = )            |
| `failure_count`     | INT     | يتم إعادة التعيين إلى 0 عند النجاح، + 1 عند الفشل |

يتم الاحتفاظ بسجل التسليم في جدول `webhook_deliveries` المخصص (ترحيل `069_webhook_deliveries.sql`، المكتوب عبر `src/lib/db/webhookDeliveries.ts::insertDelivery` في كل محاولة)، بالإضافة إلى العدادات المجمعة في صف `webhooks`. تمت إضافة بيانات التعريف النوعية (Slack / Discord / Telegram / محولات الحمولة النافعة المخصصة) بواسطة `070_webhooks_kind_metadata.sql`.

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
| `/api/webhooks/validate-url`    | POST   | التحقق من صحة URL قبل الرحلة (حارس SSRF )    |

تخفي `GET /api/webhooks` سر `<first 10 chars>...` لتجنب التسرب في صفحات القائمة. استخدم `[id]` GET عندما تحتاج إلى السر بالفعل.

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

إرجاع `{ delivered, status, error }`. لا توجد محاولات إعادة محاولة — مفيدة للتحقق بسرعة من قبول المتلقي للحمولة والتوقيع.

## لوحة القيادة

توفر صفحة لوحة المعلومات في `/dashboard/webhooks` (انظر `src/app/(dashboard)/dashboard/webhooks/page.tsx`) ما يلي:

- خطافات الويب Create/edit مع منتقي الأحداث
- مؤشر الحالة (نشط / غير نشط / مخطئ) يعتمد على `enabled` و `failure_count` و `last_status`
- تسليم الاختبار بنقرة واحدة
- تبديل enable/disable اليدوي

## أمثلة الحمولة

### الطلب.مكتمل

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

يتم تعريف أشكال الحقول للأحداث غير `test.ping` بواسطة مواقع الاتصال التي تبثها؛ تعامل مع كائن `data` على أنه متوافق مع الأمام (أضف الحقول، لا تعتمد على الغياب).

## أفضل الممارسات

- **التحقق من التوقيع على كل تسليم** ضد الجسم الخام، يمنع — POSTs المخادع من أي شخص يخمن خطاف الويب الخاص بك URL.
- **الرد 2xx خلال ~ 5 ثواني** — تنتهي مهلة المرسل عند 10 ثوانٍ. سوف تأكل أجهزة الاستقبال البطيئة عمليات إعادة المحاولة وتضخيم `failure_count`.
- **جعل المعالجين عاجزين** تعني إعادة محاولة — ودلالات التسليم مرة واحدة على الأقل أن التكرارات ممكنة.
- **اشترك بالحد الأدنى** قائمة — فقط الأحداث التي تستهلكها بالفعل؛ ستضيف `"*"` تكلفة على أجهزة الاستقبال التي لا تتحكم فيها.
- **شاهد `failure_count`** يتم تعطيل نقاط نهاية — تلقائيًا عند 10 حالات فشل متتالية؛ إعادة التعيين عن طريق الاتصال بـ `PUT /api/webhooks/[id]` مع `enabled: true` بعد إصلاح جهاز الاستقبال.
- **تدوير الأسرار بشكل دوري** — `PUT` `secret` جديد، ونشر القيمة الجديدة إلى جهاز الاستقبال، والتأكيد عبر نقطة نهاية الاختبار.

## انظر أيضا

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — سطح API للإدارة الكاملة
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — قاطع الدائرة / دلالات التباطؤ وراء فشل الموفر ظهرت عبر `request.failed`
- المصدر: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
