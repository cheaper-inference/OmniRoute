# Webhooks (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **সত্যের উত্স:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**সর্বশেষ আপডেট:** 2026-06-28 — v3.8.40

OmniRoute প্ল্যাটফর্ম ইভেন্টগুলিতে HTTP ওয়েবহুক ফায়ার করতে পারে। Slack, PagerDuty, Datadog, অভ্যন্তরীণ সতর্কতা পরিষেবা, বা যে কোনও HTTP রিসিভারের সাথে একীভূত করতে এগুলি ব্যবহার করুন৷

প্রেরক প্রতিটি ডেলিভারি HMAC-SHA256 সাথে স্বাক্ষর করে, ক্ষণস্থায়ী ব্যর্থতার উপর পুনরায় চেষ্টা করে, প্রতি ওয়েবহুক ডেলিভারি স্বাস্থ্য ট্র্যাক করে এবং ব্যর্থ হতে থাকা শেষ পয়েন্টগুলি স্বয়ংক্রিয়ভাবে অক্ষম করে।

## সমর্থিত ইভেন্ট

`WebhookEvent` প্রকার (`src/lib/webhooks/eventDescriptions.ts`, `src/lib/webhookDispatcher.ts` দ্বারা গ্রাস করা হয়েছে) বর্তমানে সাতটি ইভেন্টের মডেল রয়েছে:

| ঘটনা                      | আগুন লাগে যখন                                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------------------------- |
| `request.completed`       | একটি প্রক্সি অনুরোধ সফলভাবে সম্পন্ন হয়েছে৷                                                               |
| `request.failed`          | একটি প্রক্সি অনুরোধ সব retries/fallback পরে ব্যর্থ হয়                                                    |
| `quota.exceeded`          | একটি API কী একটি budget/quota থ্রেশহোল্ড অতিক্রম করে                                                      |
| `proxy.set_aside`         | একটি প্রক্সি পুল সদস্য বারবার প্রত্যাখ্যান করার পরে আলাদা করা হয় (শুধুমাত্র পরিবর্তন)                    |
| `proxy.pool.exhausted`    | একটি প্রক্সি পুল সুযোগের প্রত্যেক সদস্যকে আলাদা করে রাখা হয়েছে                                           |
| `provider.reset_redeemed` | স্বয়ংক্রিয়ভাবে প্রয়োগ করা ব্যাঙ্কড রিসেট একটি রিসেট ক্রেডিট বা Claude সাপ্তাহিক সেশন রিসেট রিডিম করেছে |
| `test.ping`               | পরীক্ষার এন্ডপয়েন্ট দ্বারা ব্যবহৃত সিন্থেটিক ইভেন্ট                                                      |

সদস্যতা প্রতিটি ইভেন্ট গ্রহণ করতে আক্ষরিক `"*"` গ্রহণ করে। `events` এ অজানা ইভেন্টের নাম পাঠানোর সময় উপেক্ষা করা হয়।

> দ্রষ্টব্য: প্রেরণকারী API তারযুক্ত, কিন্তু`test.ping` বাইরের কিছু ইভেন্টের জন্য উৎপাদন কল সাইট এখনও অবতরণ করছে। আপনার রিলিজে বর্তমানে কোন পাথগুলি প্রেরণকারীকে আমন্ত্রণ জানিয়েছে তা দেখতে `grep dispatchEvent` চেক করুন৷

## স্থাপত্য

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

কলারের জন্য ডিসপ্যাচ ফায়ার-এন্ড-ফোরগেট: `Promise.allSettled` প্রতি-ওয়েবহুক ত্রুটিগুলি গ্রাস করে তাই একটি খারাপ রিসিভার অন্যদের ব্লক করতে পারে না।

## HMAC স্বাক্ষর

যখন একটি ওয়েবহুকের একটি `secret` থাকে, তখন OmniRoute JSON বডিতে স্বাক্ষর করে এবং পাঠায়:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> হেডারের নাম `X-Webhook-*` উপসর্গ ব্যবহার করে ( `X-OmniRoute-*` নয়)। স্বাক্ষর মান হল `sha256=<hex>` — সম্পূর্ণ উপসর্গ যাচাই করুন।

যদি `createWebhook` গোপন না করে বলা হয়, DB মডিউল একটি (`whsec_<48 hex>`) তৈরি করে তাই সমস্ত ওয়েবহুক ডিফল্টরূপে স্বাক্ষরিত হয়।

### রিসিভারে যাচাই করা হচ্ছে

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

সর্বদা বিরুদ্ধে যাচাই **কাঁচা** কোন JSON পার্সিং আগে, শরীরের অনুরোধ করুন.

## পুনরায় চেষ্টা করুন এবং ব্যর্থতার নীতি

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- প্রতি প্রচেষ্টায় 10 সেকেন্ড টাইমআউট (`AbortController`)।
- HTTP 2xx সাফল্য হিসাবে গণনা করে।
- HTTP 3xx/4xx একটি অ-পুনরায় চেষ্টাযোগ্য চূড়ান্ত অবস্থা হিসাবে গণনা করে — `success = res.ok` সাথে বিতরণ করা হিসাবে রেকর্ড করা হয়েছে।
- HTTP 5xx এবং নেটওয়ার্ক ত্রুটিগুলি সূচকীয় ব্যাকঅফের সাথে পুনরায় চেষ্টা করা হয়েছে: `2^attempt * 1000 ms` (1s, 2s, 4s)।
- `maxRetries` এর পরে, বিতরণ ব্যর্থ হিসাবে রেকর্ড করা হয়।
- প্রতিটি ডেলিভারি `last_triggered_at`, `last_status` আপডেট করে এবং হয় `failure_count` রিসেট বা বৃদ্ধি করে।
- প্রেরক প্রতিটি ফ্যান-আউটের পরে `disableWebhooksWithHighFailures(10)` কল করে, তাই `failure_count >= 10` সাথে যেকোনো ওয়েবহুক স্বয়ংক্রিয়ভাবে অক্ষম হয়ে যায়।

## ডাটাবেস

টেবিল `webhooks` (মাইগ্রেশন `011_webhooks.sql`):

| কলাম                | টাইপ    | নোট                                             |
| ------------------- | ------- | ----------------------------------------------- |
| `id`                | TEXT PK | UUID                                            |
| `url`               | TEXT    | গন্তব্য URL                                     |
| `events`            | TEXT    | JSON অ্যারে; ডিফল্ট `["*"]`                     |
| `secret`            | TEXT    | HMAC গোপন (না দিলে স্বয়ংক্রিয়ভাবে তৈরি)       |
| `enabled`           | INT     | 0/1; ডিফল্ট 1                                   |
| `description`       | TEXT    | ঐচ্ছিক মানব লেবেল                               |
| `created_at`        | TEXT    | `datetime('now')`                               |
| `last_triggered_at` | TEXT    | প্রতিটি ডেলিভারি প্রচেষ্টা আপডেট                |
| `last_status`       | INT     | শেষ প্রচেষ্টার HTTP স্থিতি (0 = নেটওয়ার্ক)     |
| `failure_count`     | INT     | সাফল্যের জন্য 0, ব্যর্থতার জন্য + 1 রিসেট করুন৷ |

ডেলিভারি ইতিহাস ডেডিকেটেড `webhook_deliveries` টেবিলে (মাইগ্রেশন `069_webhook_deliveries.sql`, প্রতিটি প্রচেষ্টায় `src/lib/db/webhookDeliveries.ts::insertDelivery` এর মাধ্যমে লেখা), `webhooks` সারিতে মোট কাউন্টারগুলি ছাড়াও বজায় থাকে। ধরনের মেটাডেটা (Slack / Discord / Telegram / কাস্টম পেলোড ট্রান্সফরমার) `070_webhooks_kind_metadata.sql` দ্বারা যোগ করা হয়েছে৷

## REST API

সমস্ত এন্ডপয়েন্টের জন্য ম্যানেজমেন্ট অথ (`requireManagementAuth`) প্রয়োজন।

| শেষবিন্দু                       | পদ্ধতি | বর্ণনা                                              |
| ------------------------------- | ------ | --------------------------------------------------- |
| `/api/webhooks`                 | GET    | ওয়েবহুকের তালিকা (গোপন গোপন)                       |
| `/api/webhooks`                 | POST   | ওয়েবহুক তৈরি করুন                                  |
| `/api/webhooks/[id]`            | GET    | ওয়েবহুকের বিস্তারিত (সম্পূর্ণ গোপনীয়তা)           |
| `/api/webhooks/[id]`            | PUT    | ক্ষেত্র আপডেট করুন                                  |
| `/api/webhooks/[id]`            | DELETE | সরান                                                |
| `/api/webhooks/[id]/test`       | POST   | একটি `test.ping` ফায়ার করুন (কোনও পুনঃ চেষ্টা নেই) |
| `/api/webhooks/[id]/deliveries` | GET    | একটি ওয়েবহুকের জন্য সাম্প্রতিক বিতরণ প্রচেষ্টা     |
| `/api/webhooks/validate-url`    | POST   | প্রাক-ফ্লাইট URL বৈধতা (SSRF গার্ড)                 |

তালিকার পাতায় ফাঁস এড়াতে`GET /api/webhooks` `<first 10 chars>...` এর গোপনীয়তা লুকিয়ে রাখে। আপনার আসলে গোপন প্রয়োজন হলে `[id]` GET ব্যবহার করুন।

### ওয়েবহুক তৈরি করুন

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

যদি `secret` বাদ দেওয়া হয়, সার্ভার একটি `whsec_<hex>` সিক্রেট তৈরি করে এবং প্রতিক্রিয়াতে এটি ফেরত দেয়।

### ওয়েবহুক পরীক্ষা করুন

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` ফেরত দেয়। রিসিভার পেলোড এবং স্বাক্ষর গ্রহণ করে তা দ্রুত যাচাই করার জন্য — উপযোগী কোনো পুনঃপ্রচারের চেষ্টা করা হয় না।

## ড্যাশবোর্ড

`/dashboard/webhooks` তে ড্যাশবোর্ড পৃষ্ঠা ( `src/app/(dashboard)/dashboard/webhooks/page.tsx` দেখুন) প্রদান করে:

- একটি ইভেন্ট পিকার সহ Create/edit ওয়েবহুক
- `enabled`, `failure_count`, এবং `last_status` এর উপর ভিত্তি করে স্থিতি নির্দেশক (সক্রিয় / নিষ্ক্রিয় / ত্রুটিযুক্ত)
- এক-ক্লিক টেস্ট ডেলিভারি
- ম্যানুয়াল enable/disable টগল

## পেলোড উদাহরণ

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

অ-`test.ping` ইভেন্টগুলির ক্ষেত্রের আকারগুলি কল সাইটগুলি দ্বারা সংজ্ঞায়িত করা হয় যা তাদের নির্গত করে; `data` অবজেক্টকে ফরওয়ার্ড-সামঞ্জস্যপূর্ণ হিসাবে বিবেচনা করুন (ক্ষেত্র যোগ করুন, অনুপস্থিতির উপর নির্ভর করবেন না)।

## সর্বোত্তম অনুশীলন

- **প্রতিটি ডেলিভারিতে স্বাক্ষর যাচাই করুন** কাঁচা শরীরের বিরুদ্ধে — আপনার ওয়েবহুক URL অনুমান করে এমন যেকোন ব্যক্তির কাছ থেকে স্পুফ করা POSTs প্রতিরোধ করে।
- **~ 5 সেকেন্ডের মধ্যে 2xx উত্তর দিন** — প্রেরকের সময় 10 সেকেন্ডে শেষ হয়। ধীরগতির রিসিভার পুনরায় চেষ্টা করবে এবং `failure_count` স্ফীত করবে।
- **হ্যান্ডলারদের বুদ্ধিমত্তাহীন করুন** — পুনরায় চেষ্টা করা এবং অন্তত-একবার ডেলিভারি শব্দার্থ মানে ডুপ্লিকেট সম্ভব।
- **সর্বনিম্ন সদস্যতা** — শুধুমাত্র ইভেন্টগুলিকে তালিকাভুক্ত করে যা আপনি আসলে ব্যবহার করেন; আপনি নিয়ন্ত্রণ করেন না এমন রিসিভারগুলিতে `"*"` খরচ যোগ করবে।
- **`failure_count` দেখুন** পরপর 10টি ব্যর্থতায় — এন্ডপয়েন্টগুলি স্বয়ংক্রিয়ভাবে নিষ্ক্রিয় হয়; রিসিভার ঠিক করার পর `enabled: true` সাথে `PUT /api/webhooks/[id]` কল করে রিসেট করুন।
- **পর্যায়ক্রমে গোপন ঘোরান** — `PUT` একটি নতুন `secret`, রিসিভারে নতুন মান স্থাপন করুন এবং পরীক্ষার শেষ পয়েন্টের মাধ্যমে নিশ্চিত করুন।

## এছাড়াও দেখুন

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — সম্পূর্ণ ব্যবস্থাপনা API পৃষ্ঠ
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — সার্কিট ব্রেকার / কুলডাউন শব্দার্থবিদ্যা `request.failed` এর মাধ্যমে সরবরাহকারী ব্যর্থতার পিছনে
- সূত্র: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
