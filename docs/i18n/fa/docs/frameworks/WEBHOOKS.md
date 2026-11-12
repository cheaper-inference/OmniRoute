# Webhooks (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **منبع حقیقت:** `src/lib/webhookDispatcher.ts`، `src/lib/db/webhooks.ts`، `src/app/api/webhooks/`**آخرین به روز رسانی:** 2026-06-28 — نسخه 3.8.40

OmniRoute می تواند وب هوک های HTTP را در رویدادهای پلت فرم شلیک کند. از آنها برای ادغام با Slack، PagerDuty، Datadog، خدمات هشدار داخلی یا هر گیرنده HTTP استفاده کنید.

توزیعکننده هر تحویل را با HMAC-SHA256 امضا میکند، خرابیهای گذرا را مجدداً امتحان میکند، سلامت تحویل را در هر وبقلاب ردیابی میکند، و نقاط پایانی را که مدام با شکست مواجه میشوند، بهطور خودکار غیرفعال میکند.

## رویدادهای پشتیبانی شده

نوع `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`، مصرف شده توسط `src/lib/webhookDispatcher.ts`) در حال حاضر هفت رویداد را مدل می کند:

| رویداد                    | آتش سوزی زمانی که                                                                              |
| ------------------------- | ---------------------------------------------------------------------------------------------- |
| `request.completed`       | یک درخواست پروکسی با موفقیت تکمیل شد                                                           |
| `request.failed`          | یک درخواست پروکسی پس از تمام retries/fallback با شکست مواجه می شود                             |
| `quota.exceeded`          | یک کلید API از آستانه budget/quota عبور می کند                                                 |
| `proxy.set_aside`         | یک عضو استخر پروکسی پس از امتناع های مکرر کنار گذاشته می شود (فقط انتقال)                      |
| `proxy.pool.exhausted`    | هر عضوی از محدوده استخر پروکسی کنار گذاشته می شود                                              |
| `provider.reset_redeemed` | بازنشانیهای بانکی با اعمال خودکار اعتبار بازنشانی یا بازنشانی جلسه هفتگی Claude را بازخرید کرد |
| `test.ping`               | رویداد مصنوعی که توسط نقطه پایانی آزمون استفاده میشود                                          |

اشتراک ها برای دریافت هر رویداد، `"*"` تحت اللفظی را می پذیرند. نام رویدادهای ناشناخته در `events` در زمان ارسال نادیده گرفته می شود.

> توجه: توزیع کننده API سیمی است، اما سایت های تماس تولید برای برخی از رویدادهای غیر `test.ping` هنوز در حال فرود هستند. `grep dispatchEvent` بررسی کنید تا ببینید کدام مسیرها در حال حاضر توزیع کننده را در نسخه شما فراخوانی می کنند.

## معماری

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

Dispatch برای تماس گیرنده آتش و فراموش می شود: `Promise.allSettled` خطاهای هر وب هوک را می بلعد تا یک گیرنده بد نتواند دیگران را مسدود کند.

## امضای HMAC

هنگامی که یک وب هوک دارای `secret` است، OmniRoute بدنه JSON را امضا می کند و می فرستد:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> نامهای سرصفحه از پیشوند `X-Webhook-*` (نه `X-OmniRoute-*`) استفاده میکنند. مقدار امضا `sha256=<hex>` — است که پیشوند کامل را تأیید کنید.

اگر `createWebhook` بدون راز فراخوانی شود، ماژول DB یک (`whsec_<48 hex>`) ایجاد می کند، بنابراین تمام وب هوک ها به طور پیش فرض امضا می شوند.

### تایید در گیرنده

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

همیشه در مقابل تأیید کنید **خام** بدن درخواست، قبل از هر تجزیه JSON.

## سیاست تلاش مجدد و شکست

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 ثانیه تایم اوت در هر تلاش (`AbortController`).
- HTTP 2xx موفقیت محسوب می شود.
- HTTP 3xx/4xx بهعنوان یک وضعیت نهایی غیرقابل امتحان مجدد به حساب میآید — بهعنوان تحویل با `success = res.ok` ثبت شده است.
- HTTP 5xx و خطاهای شبکه با عقب نشینی نمایی دوباره امتحان می شوند: `2^attempt * 1000 ms` (1s, 2s, 4s).
- پس از `maxRetries`، تحویل به عنوان ناموفق ثبت می شود.
- هر تحویل `last_triggered_at`، `last_status` را به روز می کند و `failure_count` را بازنشانی یا افزایش می دهد.
- دیسپاچر پس از هر فن خروجی، `disableWebhooksWithHighFailures(10)` را فراخوانی میکند، بنابراین هر وب هوکی با `failure_count >= 10` به طور خودکار غیرفعال میشود.

## پایگاه داده

جدول `webhooks` (مهاجرت `011_webhooks.sql`):

| ستون                | تایپ کنید | یادداشت ها                                               |
| ------------------- | --------- | -------------------------------------------------------- |
| `id`                | TEXT PK   | UUID                                                     |
| `url`               | TEXT      | مقصد URL                                                 |
| `events`            | TEXT      | آرایه JSON ؛ پیش فرض `["*"]`                             |
| `secret`            | TEXT      | راز HMAC (در صورت عدم ارائه به صورت خودکار تولید می شود) |
| `enabled`           | INT       | 0/1; پیش فرض 1 است                                       |
| `description`       | TEXT      | برچسب انسانی اختیاری                                     |
| `created_at`        | TEXT      | `datetime('now')`                                        |
| `last_triggered_at` | TEXT      | در هر تلاش برای تحویل به روز می شود                      |
| `last_status`       | INT       | وضعیت HTTP آخرین تلاش (0 شبکه = )                        |
| `failure_count`     | INT       | در صورت موفقیت به 0، در صورت شکست به + 1 بازنشانی میشود  |

سابقه تحویل در جدول اختصاصی `webhook_deliveries` (مهاجرت `069_webhook_deliveries.sql`، نوشته شده از طریق `src/lib/db/webhookDeliveries.ts::insertDelivery` در هر تلاش)، علاوه بر شمارندههای کل در ردیف `webhooks` وجود دارد. فراداده نوع (Slack / Discord / Telegram / ترانسفورماتور محموله سفارشی) توسط `070_webhooks_kind_metadata.sql` اضافه شد.

## REST API

همه نقاط پایانی به اعتبار مدیریت (`requireManagementAuth`) نیاز دارند.

| نقطه پایانی                     | روش    | توضیحات                                     |
| ------------------------------- | ------ | ------------------------------------------- |
| `/api/webhooks`                 | GET    | لیست وبقلابها (اسرار پنهان شده)             |
| `/api/webhooks`                 | POST   | ایجاد وب هوک                                |
| `/api/webhooks/[id]`            | GET    | جزئیات وب هوک (کاملا راز)                   |
| `/api/webhooks/[id]`            | PUT    | به روز رسانی فیلدها                         |
| `/api/webhooks/[id]`            | DELETE | حذف کنید                                    |
| `/api/webhooks/[id]/test`       | POST   | شلیک `test.ping` (بدون تلاش مجدد)           |
| `/api/webhooks/[id]/deliveries` | GET    | تلاشهای تحویل اخیر برای یک هوک              |
| `/api/webhooks/validate-url`    | POST   | اعتبار سنجی URL قبل از پرواز (نگهبان SSRF ) |

`GET /api/webhooks` راز `<first 10 chars>...` را پنهان می کند تا از افشای آن در صفحات لیست جلوگیری کند. زمانی که واقعاً به راز نیاز دارید از `[id]` GET استفاده کنید.

### ایجاد وب هوک

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

اگر `secret` حذف شود، سرور یک رمز `whsec_<hex>` تولید می کند و آن را در پاسخ برمی گرداند.

### تست وب هوک

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` را برمیگرداند. هیچ تلاش مجددی انجام نمی شود — برای تأیید سریع اینکه گیرنده بار و امضا را می پذیرد مفید باشد.

## داشبورد

صفحه داشبورد در `/dashboard/webhooks` (به `src/app/(dashboard)/dashboard/webhooks/page.tsx` مراجعه کنید) ارائه می دهد:

- Create/edit با انتخابگر رویداد به وبقلاب میپردازد
- نشانگر وضعیت (فعال / غیر فعال / خطا) بر اساس `enabled`، `failure_count` و `last_status`
- تحویل تست با یک کلیک
- تعویض دستی enable/disable

## نمونه های باربری

### درخواست.تکمیل شد

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

اشکال فیلد برای رویدادهای غیر `test.ping` توسط سایت های فراخوانی که آنها را منتشر می کنند، تعریف می شوند. با شی `data` به عنوان سازگار با جلو رفتار کنید (فیلدها را اضافه کنید، به غیبت وابسته نباشید).

## بهترین شیوه ها

- **در هر تحویل، امضا را تأیید کنید** در برابر بدنه خام — از جعل POSTs از هر کسی که وب هوک شما URL را حدس می زند جلوگیری می کند.
- **2xx در عرض 5 ثانیه ~ پاسخ دهید** زمان پخش — در 10 ثانیه تمام می شود. گیرنده های آهسته تلاش های مجدد را می خورند و `failure_count` باد می کنند.
- **کنترل کننده ها را بی توان کنید** تکرار — و معنایی تحویل حداقل یک بار به این معنی است که امکان تکرار وجود دارد.
- **اشتراک حداقلی** — فقط رویدادهایی را فهرست می کند که شما واقعاً مصرف می کنید. `"*"` به گیرنده هایی که کنترل نمی کنید هزینه اضافه می کند.
- **`failure_count` را تماشا کنید** نقاط پایانی — در 10 خرابی متوالی به طور خودکار غیرفعال می شوند. پس از تعمیر گیرنده، با تماس `PUT /api/webhooks/[id]` با `enabled: true` ریست کنید.
- **اسرار را به صورت دوره ای بچرخانید** — `PUT` یک `secret` جدید، مقدار جدید را در گیرنده مستقر کرده و از طریق نقطه پایانی آزمایش تأیید کنید.

## همچنین ببینید

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — مدیریت کامل سطح API
- قطع کننده مدار [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — /معنای خنک کننده در پس خرابی های ارائه دهنده از طریق `request.failed` ظاهر شد
- منبع: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
