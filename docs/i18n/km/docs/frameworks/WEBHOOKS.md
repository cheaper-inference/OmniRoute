# Webhooks (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **ប្រភពនៃការពិត៖** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**ធ្វើបច្ចុប្បន្នភាពចុងក្រោយ៖** 2026-06-28 — v3.8.40

OmniRoute អាចបញ្ឈប់ HTTP webhooks នៅលើព្រឹត្តិការណ៍វេទិកា។ ប្រើពួកវាដើម្បីរួមបញ្ចូលជាមួយ Slack, PagerDuty, Datadog សេវាកម្មជូនដំណឹងខាងក្នុង ឬអ្នកទទួល HTTP ណាមួយ។

អ្នកចែកចាយចុះហត្ថលេខាលើការដឹកជញ្ជូននីមួយៗជាមួយ HMAC-SHA256 ព្យាយាមម្តងទៀតលើការបរាជ័យបណ្តោះអាសន្ន តាមដានសុខភាពនៃការដឹកជញ្ជូនក្នុងមួយបណ្តាញ និងបិទដោយស្វ័យប្រវត្តិនូវចំណុចបញ្ចប់ដែលបន្តបរាជ័យ។

## ព្រឹត្តិការណ៍ដែលបានគាំទ្រ

ប្រភេទ `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts` ប្រើប្រាស់ដោយ `src/lib/webhookDispatcher.ts`) បច្ចុប្បន្នបង្កើតគំរូព្រឹត្តិការណ៍ចំនួនប្រាំពីរ៖

| ព្រឹត្តិការណ៍             | ឆេះនៅពេល                                                                                                       |
| ------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | សំណើប្រូកស៊ីបានបញ្ចប់ដោយជោគជ័យ                                                                                 |
| `request.failed`          | សំណើប្រូកស៊ីបរាជ័យបន្ទាប់ពី retries/fallback ទាំងអស់។                                                          |
| `quota.exceeded`          | គ្រាប់ចុច API ឆ្លងកាត់កម្រិត budget/quota                                                                      |
| `proxy.set_aside`         | សមាជិកក្រុមប្រូកស៊ីត្រូវបានទុកមួយឡែកបន្ទាប់ពីការបដិសេធម្តងហើយម្តងទៀត (ការផ្លាស់ប្តូរប៉ុណ្ណោះ)                  |
| `proxy.pool.exhausted`    | សមាជិកនីមួយៗនៃវិសាលភាពអាងប្រូកស៊ីត្រូវបានកំណត់ឡែក                                                              |
| `provider.reset_redeemed` | អនុវត្តការកំណត់ឡើងវិញតាមធនាគារដោយស្វ័យប្រវត្តិបានប្តូរយកឥណទានកំណត់ឡើងវិញ ឬកំណត់វគ្គ Claude ប្រចាំសប្តាហ៍ឡើងវិញ |
| `test.ping`               | ព្រឹត្តិការណ៍សំយោគដែលប្រើដោយចំណុចបញ្ចប់នៃការធ្វើតេស្ត                                                          |

ការជាវទទួលយក `"*"` តាមព្យញ្ជនៈ ដើម្បីទទួលបានរាល់ព្រឹត្តិការណ៍។ ឈ្មោះព្រឹត្តិការណ៍ដែលមិនស្គាល់នៅក្នុង `events` មិនត្រូវបានអើពើនៅពេលបញ្ជូន។

> ចំណាំ៖ អ្នកបញ្ជូន API មានខ្សែ ប៉ុន្តែកន្លែងហៅទូរសព្ទផលិតកម្មសម្រាប់ព្រឹត្តិការណ៍ដែលមិនមែនជា`test.ping` មួយចំនួននៅតែចុះចត។ ពិនិត្យមើល `grep dispatchEvent` ដើម្បីមើលផ្លូវណាដែលបច្ចុប្បន្នហៅអ្នកបញ្ជូននៅក្នុងការចេញផ្សាយរបស់អ្នក។

## ស្ថាបត្យកម្ម

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

Dispatch គឺឆេះហើយភ្លេចសម្រាប់អ្នកហៅទូរសព្ទ៖ `Promise.allSettled` លេបរាល់កំហុស webhook ដូច្នេះអ្នកទទួលមិនល្អម្នាក់មិនអាចរារាំងអ្នកផ្សេងបានទេ។

## ការចុះហត្ថលេខាHMAC

នៅពេលដែល webhook មាន `secret` នោះ OmniRoute ចុះហត្ថលេខាលើតួ JSON ហើយផ្ញើ៖

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> ឈ្មោះបឋមកថាប្រើបុព្វបទ `X-Webhook-*` (មិនមែន `X-OmniRoute-*`) ។ តម្លៃហត្ថលេខាគឺ `sha256=<hex>` — ផ្ទៀងផ្ទាត់បុព្វបទពេញលេញ។

ប្រសិនបើ `createWebhook` ត្រូវបានហៅដោយគ្មានអាថ៌កំបាំង ម៉ូឌុល DB បង្កើតមួយ (`whsec_<48 hex>`) ដូច្នេះ webhooks ទាំងអស់ត្រូវបានចុះហត្ថលេខាតាមលំនាំដើម។

### ការផ្ទៀងផ្ទាត់លើអ្នកទទួល

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

តែងតែផ្ទៀងផ្ទាត់ប្រឆាំងនឹង **ឆៅ** ស្នើសុំតួអង្គ មុនពេលការញែក JSON ណាមួយ។

## ព្យាយាមម្តងទៀត & គោលការណ៍បរាជ័យ

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- អស់ពេល 10 វិនាទីក្នុងមួយប៉ុនប៉ង (`AbortController`) ។
- HTTP 2xx រាប់ជាជោគជ័យ។
- HTTP 3xx/4xx រាប់ជាស្ថានភាពចុងក្រោយដែលមិនអាចសាកល្បងឡើងវិញបាន — បានកត់ត្រាថាបានផ្តល់ឱ្យជាមួយ `success = res.ok`។
- HTTP 5xx និងកំហុសបណ្តាញត្រូវបានព្យាយាមម្ដងទៀតដោយមានការត្រឡប់ថយក្រោយអិចស្ប៉ូណង់ស្យែល៖ `2^attempt * 1000 ms` (1s, 2s, 4s)។
- បន្ទាប់ពី `maxRetries` ការដឹកជញ្ជូនត្រូវបានកត់ត្រាថាបរាជ័យ។
- ការចែកចាយនីមួយៗធ្វើបច្ចុប្បន្នភាព `last_triggered_at`, `last_status` និងកំណត់ឡើងវិញ ឬបង្កើន `failure_count`។
- អ្នកបញ្ជូនទូរស័ព្ទហៅ `disableWebhooksWithHighFailures(10)` បន្ទាប់ពីការចេញអ្នកគាំទ្រនីមួយៗ ដូច្នេះ webhook ណាមួយដែលមាន `failure_count >= 10` ត្រូវបានបិទដោយស្វ័យប្រវត្តិ។

## មូលដ្ឋានទិន្នន័យ

តារាង `webhooks` (ការផ្លាស់ប្តូរ `011_webhooks.sql`):

| ជួរឈរ               | ប្រភេទ  | កំណត់ចំណាំ                                                 |
| ------------------- | ------- | ---------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                       |
| `url`               | TEXT    | ទិសដៅ URL                                                  |
| `events`            | TEXT    | អារេJSON ; `["*"]` លំនាំដើម                                |
| `secret`            | TEXT    | សម្ងាត់HMAC (បង្កើតដោយស្វ័យប្រវត្តិប្រសិនបើមិនបានផ្តល់ឱ្យ) |
| `enabled`           | INT     | 0/1; លំនាំដើមទៅ 1                                          |
| `description`       | TEXT    | ស្លាកមនុស្សស្រេចចិត្ត                                      |
| `created_at`        | TEXT    | `datetime('now')`                                          |
| `last_triggered_at` | TEXT    | បានធ្វើបច្ចុប្បន្នភាពរាល់ការព្យាយាមដឹកជញ្ជូន               |
| `last_status`       | INT     | ស្ថានភាព HTTP នៃការប៉ុនប៉ងចុងក្រោយ (បណ្តាញ 0 = )           |
| `failure_count`     | INT     | កំណត់ឡើងវិញទៅ 0 នៅលើជោគជ័យ, + 1 នៅលើការបរាជ័យ              |

ប្រវត្តិនៃការដឹកជញ្ជូនត្រូវបានបន្តនៅក្នុងតារាង `webhook_deliveries` ដែលឧទ្ទិស (ការធ្វើចំណាកស្រុក `069_webhook_deliveries.sql` សរសេរតាមរយៈ `src/lib/db/webhookDeliveries.ts::insertDelivery` រាល់ការប៉ុនប៉ង) បន្ថែមពីលើបញ្ជរសរុបនៅលើជួរ `webhooks` ។ ទិន្នន័យមេតាប្រភេទ (Slack / Discord / Telegram / ឧបករណ៍បំលែងបន្ទុកផ្ទាល់ខ្លួន) ត្រូវបានបន្ថែមដោយ `070_webhooks_kind_metadata.sql`។

## REST API

ចំណុចបញ្ចប់ទាំងអស់ទាមទារការគ្រប់គ្រង (`requireManagementAuth`)។

| ចំណុចបញ្ចប់                     | វិធីសាស្រ្ត | ការពិពណ៌នា                                |
| ------------------------------- | ----------- | ----------------------------------------- |
| `/api/webhooks`                 | GET         | រាយបញ្ជីបណ្តាញទំពក់ (លាក់បាំងអាថ៌កំបាំង)  |
| `/api/webhooks`                 | POST        | បង្កើត webhook                            |
| `/api/webhooks/[id]`            | GET         | ព័ត៌មានលម្អិត Webhook (អាថ៌កំបាំងពេញលេញ)  |
| `/api/webhooks/[id]`            | PUT         | ធ្វើបច្ចុប្បន្នភាពវាល                     |
| `/api/webhooks/[id]`            | DELETE      | ដកចេញ                                     |
| `/api/webhooks/[id]/test`       | POST        | បាញ់ `test.ping` (មិនព្យាយាមម្ដងទៀត)      |
| `/api/webhooks/[id]/deliveries` | GET         | ការព្យាយាមចែកចាយថ្មីៗសម្រាប់ webhook មួយ។ |
| `/api/webhooks/validate-url`    | POST        | សុពលភាព URL មុនការហោះហើរ (SSRF យាម)       |

`GET /api/webhooks` បិទបាំងអាថ៌កំបាំងរបស់ `<first 10 chars>...` ដើម្បីជៀសវាងការលេចធ្លាយនៅលើទំព័រចុះបញ្ជី។ ប្រើ `[id]` GET នៅពេលដែលអ្នកពិតជាត្រូវការអាថ៌កំបាំង។

### បង្កើត webhook

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

ប្រសិនបើ `secret` ត្រូវបានលុបចោល នោះម៉ាស៊ីនមេបង្កើត `whsec_<hex>` សម្ងាត់ ហើយបញ្ជូនវាមកវិញក្នុងការឆ្លើយតប។

### សាកល្បង webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

ត្រឡប់ `{ delivered, status, error }`។ គ្មានការព្យាយាមម្តងទៀតត្រូវបានព្យាយាម — មានប្រយោជន៍សម្រាប់ការបញ្ជាក់យ៉ាងឆាប់រហ័សថាអ្នកទទួលទទួលយកបន្ទុកនិងហត្ថលេខា។

## ផ្ទាំងគ្រប់គ្រង

ទំព័រផ្ទាំងគ្រប់គ្រងនៅ `/dashboard/webhooks` (សូមមើល `src/app/(dashboard)/dashboard/webhooks/page.tsx`) ផ្តល់៖

- Create/edit webhooks ជាមួយនឹងកម្មវិធីជ្រើសរើសព្រឹត្តិការណ៍
- សូចនាករស្ថានភាព (សកម្ម / អសកម្ម / កំហុស) ផ្អែកលើ `enabled`, `failure_count`, និង `last_status`
- ការបញ្ជូនសាកល្បងដោយចុចតែម្តង
- បិទ/បើក enable/disable ដោយដៃ

## ឧទាហរណ៍នៃបន្ទុក

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

ទម្រង់វាលសម្រាប់ព្រឹត្តិការណ៍ដែលមិនមែនជា`test.ping` ត្រូវបានកំណត់ដោយគេហទំព័រហៅទូរសព្ទដែលបញ្ចេញពួកវា។ ចាត់ទុកវត្ថុ `data` ជាការត្រូវគ្នាទៅមុខ (បន្ថែមវាល កុំអាស្រ័យលើអវត្តមាន)។

## ការអនុវត្តល្អបំផុត

- **ផ្ទៀងផ្ទាត់ហត្ថលេខាលើរាល់ការដឹកជញ្ជូន** ប្រឆាំងនឹងរាងកាយឆៅ — ការពារ POSTs ក្លែងក្លាយពីនរណាម្នាក់ដែលទាយ webhook URL របស់អ្នក។
- **ឆ្លើយតប 2xx ក្នុងរយៈពេល ~ 5 វិនាទី** — អ្នកបញ្ជូនពេលវេលាចេញនៅម៉ោង 10 វិនាទី។ អ្នកទទួលយឺតនឹងញ៉ាំការព្យាយាមម្តងទៀត និងបំប៉ោង `failure_count`។
- **ធ្វើឱ្យអ្នកគ្រប់គ្រងគ្មានកម្លាំង** — ព្យាយាមម្តងទៀត និងយ៉ាងហោចណាស់ម្តង អត្ថន័យនៃការដឹកជញ្ជូនមានន័យថា ស្ទួនអាចធ្វើទៅបាន។
- **ជាវតិចតួចបំផុត។** — រាយបញ្ជីតែព្រឹត្តិការណ៍ដែលអ្នកពិតជាប្រើប្រាស់។ `"*"` នឹងបន្ថែមការចំណាយលើអ្នកទទួលដែលអ្នកមិនគ្រប់គ្រង។
- **មើល `failure_count`** ចំណុចបញ្ចប់ — ត្រូវបានបិទដោយស្វ័យប្រវត្តិនៅការបរាជ័យ 10 ជាប់ៗគ្នា។ កំណត់ឡើងវិញដោយការហៅ `PUT /api/webhooks/[id]` ជាមួយ `enabled: true` បន្ទាប់ពីជួសជុលអ្នកទទួល។
- **បង្វិលអាថ៌កំបាំងតាមកាលកំណត់** — `PUT` ជា `secret` ថ្មី ដាក់ពង្រាយតម្លៃថ្មីទៅអ្នកទទួល ហើយបញ្ជាក់តាមរយៈចំណុចបញ្ចប់សាកល្បង។

## សូមមើលផងដែរ។

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ការគ្រប់គ្រងពេញលេញ API ផ្ទៃ
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — circuit breaker / cooldown semantics នៅពីក្រោយការបរាជ័យរបស់អ្នកផ្តល់សេវាបានលេចឡើងតាមរយៈ `request.failed`
- ប្រភព៖ `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
