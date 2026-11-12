# Webhooks (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **ସତ୍ୟର ଉତ୍ସ:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**ଶେଷ ଅଦ୍ୟତନ:** 2026-06-28 — v3.8.40

ପ୍ଲାଟଫର୍ମ ଇଭେଣ୍ଟରେOmniRoute HTTP ୱେବହକ୍ସକୁ ଅଗ୍ନି ଦେଇପାରେ। Slack, PagerDuty, Datadog, ଆଭ୍ୟନ୍ତରୀଣ ସତର୍କତା ସେବା କିମ୍ବା ଯେକ any ଣସି HTTP ରିସିଭର୍ ସହିତ ଏକୀଭୂତ ହେବା ପାଇଁ ସେମାନଙ୍କୁ ବ୍ୟବହାର କରନ୍ତୁ।

ଡିସପେକ୍ଟର HMAC-SHA256 ସହିତ ପ୍ରତ୍ୟେକ ବିତରଣକୁ ଦସ୍ତଖତ କରେ, କ୍ଷଣସ୍ଥାୟୀ ବିଫଳତା ଉପରେ ପୁନ ries ଚେଷ୍ଟା କରେ, ୱେବହୋକ୍ ପ୍ରତି ବିତରଣ ସ୍ୱାସ୍ଥ୍ୟକୁ ଟ୍ରାକ୍ କରେ ଏବଂ ଶେଷ ପଏଣ୍ଟଗୁଡ଼ିକୁ ଅଟୋ-ଅକ୍ଷମ କରେ ଯାହା ବିଫଳ ହୁଏ।

## ସମର୍ଥିତ ଇଭେଣ୍ଟଗୁଡିକ।

`WebhookEvent` ପ୍ରକାର (`src/lib/webhooks/eventDescriptions.ts`, `src/lib/webhookDispatcher.ts` ଦ୍ୱାରା ଗ୍ରାସିତ) ବର୍ତ୍ତମାନ ସାତଟି ଘଟଣାକୁ ମଡେଲ କରେ:

| ଘଟଣା                      | କେତେବେଳେ ଅଗ୍ନିକାଣ୍ଡ।                                                                                       |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `request.completed`       | ଏକ ପ୍ରକ୍ସିଡ୍ ଅନୁରୋଧ ସଫଳତାର ସହିତ ସମାପ୍ତ ହୁଏ।                                                                |
| `request.failed`          | ସମସ୍ତ retries/fallback ପରେ ଏକ ପ୍ରକ୍ସିଡ୍ ଅନୁରୋଧ ବିଫଳ ହୁଏ।                                                   |
| `quota.exceeded`          | ଏକ API ଚାବି ଏକ budget/quota ସୀମା ଅତିକ୍ରମ କରେ।                                                              |
| `proxy.set_aside`         | ବାରମ୍ବାର ପ୍ରତ୍ୟାଖ୍ୟାନ ପରେ କେବଳ ଏକ ପ୍ରକ୍ସି ପୁଲ୍ ସଦସ୍ୟଙ୍କୁ ପୃଥକ କରାଯାଇଛି।                                    |
| `proxy.pool.exhausted`    | ଏକ ପ୍ରକ୍ସି ପୁଲ୍ ପରିସରର ପ୍ରତ୍ୟେକ ସଦସ୍ୟଙ୍କୁ ପୃଥକ କରାଯାଇଛି।                                                   |
| `provider.reset_redeemed` | ବ୍ୟାଙ୍କ୍ ରିସେଟଗୁଡିକ ଅଟୋ-ପ୍ରୟୋଗ କରନ୍ତୁ ଏକ ପୁନ et ସେଟ୍ କ୍ରେଡିଟ୍ କିମ୍ବା Claude ସାପ୍ତାହିକ ଅଧିବେଶନ ପୁନ et ସେଟ୍। |
| `test.ping`               | ପରୀକ୍ଷା ଶେଷ ପଏଣ୍ଟ ଦ୍ୱାରା ବ୍ୟବହୃତ ସିନ୍ଥେଟିକ୍ ଇଭେଣ୍ଟ।                                                        |

ପ୍ରତ୍ୟେକ ଇଭେଣ୍ଟ ଗ୍ରହଣ କରିବାକୁ ସଦସ୍ୟତା ଆକ୍ଷରିକ `"*"` ଗ୍ରହଣ କରେ। `events` ରେ ଅଜ୍ଞାତ ଇଭେଣ୍ଟ ନାମଗୁଡିକ ପଠାଇବା ସମୟରେ ଅଣଦେଖା କରାଯାଏ।

> ଟିପନ୍ତୁ: ପ୍ରେରଣକାରୀ API ତାରଯୁକ୍ତ, କିନ୍ତୁ କିଛି ଅଣ-`test.ping` ଇଭେଣ୍ଟ ପାଇଁ ଉତ୍ପାଦନ କଲ୍ ସାଇଟ୍ ଅବତରଣ କରୁଛି। ଆପଣଙ୍କ ପ୍ରକାଶନରେ କେଉଁ ପଥଗୁଡିକ ବର୍ତ୍ତମାନ ପ୍ରେରଣକର୍ତ୍ତାଙ୍କୁ ଆହ୍ .ାନ କରିବାକୁ `grep dispatchEvent` ଯାଞ୍ଚ କରନ୍ତୁ।

## ସ୍ଥାପତ୍ୟ

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

କଲର୍ ପାଇଁ ଡିସପ୍ୟାଚ୍ ଅଗ୍ନି-ଭୁଲିଯାଆନ୍ତି: `Promise.allSettled` ପ୍ରତି ୱେବହକ୍ ତ୍ରୁଟି ଗିଳିଥାଏ ତେଣୁ ଗୋଟିଏ ଖରାପ ରିସିଭର୍ ଅନ୍ୟମାନଙ୍କୁ ଅବରୋଧ କରିପାରିବ ନାହିଁ।

## HMAC ଦସ୍ତଖତ।

ଯେତେବେଳେ ଏକ ୱେବହୋକରେ `secret` ଥାଏ, OmniRoute JSON ଶରୀରକୁ ଦସ୍ତଖତ କରେ ଏବଂ ପଠାଏ:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> ହେଡର୍ ନାମଗୁଡିକ `X-Webhook-*` ଉପସର୍ଗ ବ୍ୟବହାର କରେ ( `X-OmniRoute-*` ନୁହେଁ)। ଦସ୍ତଖତ ମୂଲ୍ୟ ହେଉଛି `sha256=<hex>` — ପୂର୍ଣ୍ଣ ଉପସର୍ଗ ଯାଞ୍ଚ କରେ।

ଯଦି `createWebhook` ବିନା ରହସ୍ୟରେ କୁହାଯାଏ, DB ମଡ୍ୟୁଲ୍ ଗୋଟିଏ (`whsec_<48 hex>`) ସୃଷ୍ଟି କରେ ତେଣୁ ସମସ୍ତ ୱେବହକ୍ ଡିଫଲ୍ଟ ଭାବରେ ସାଇନ୍ ହୋଇଯାଏ।

### ରିସିଭର୍ ଉପରେ ଯାଞ୍ଚ କରୁଛି।

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

ସର୍ବଦା ଯାଞ୍ଚ କରନ୍ତୁ।**କଞ୍ଚା।** ଯେକ any ଣସି JSON ପାର୍ସ କରିବା ପୂର୍ବରୁ ଶରୀର ପାଇଁ ଅନୁରୋଧ।

## ପୁନ ry ଚେଷ୍ଟା ଏବଂ ବିଫଳତା ନୀତି।

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- ପ୍ରତି ପ୍ରୟାସରେ 10 ଦ୍ୱିତୀୟ ସମୟ ସମାପ୍ତ (`AbortController`)।
- HTTP 2xx ସଫଳତା ଭାବରେ ଗଣନା କରେ।
- HTTP 3xx/4xx ଏକ ପୁନ ry ଚେଷ୍ଟାଯୋଗ୍ୟ ଅନ୍ତିମ ସ୍ଥିତି ଭାବରେ ଗଣନା କରେ — ସହିତ `success = res.ok` ସହିତ ବିତରଣ କରାଯାଇଥିବା ରେକର୍ଡ କରାଯାଇଛି।
- HTTP 5xx ଏବଂ ନେଟୱର୍କ ତ୍ରୁଟିଗୁଡିକ ଏକ୍ସପୋନ୍ସନାଲ ବ୍ୟାକଅଫ୍ ସହିତ ପୁନ ry ଚେଷ୍ଟା କରାଯାଏ: `2^attempt * 1000 ms` (1s, 2s, 4s)।
- `maxRetries` ପରେ, ବିତରଣ ବିଫଳ ହୋଇଥିବା ରେକର୍ଡ କରାଯାଇଛି।
- ପ୍ରତ୍ୟେକ ବିତରଣ `last_triggered_at`, `last_status` ଅଦ୍ୟତନ କରିଥାଏ, ଏବଂ `failure_count` ପୁନ res ସେଟ୍ କିମ୍ବା ବୃଦ୍ଧି କରିଥାଏ।
- ପ୍ରେରକ ପ୍ରତ୍ୟେକ ଫ୍ୟାନ୍ ଆଉଟ୍ ପରେ `disableWebhooksWithHighFailures(10)` ଡାକନ୍ତି, ତେଣୁ `failure_count >= 10` ସହିତ ଯେକ web ଣସି ୱେବହୋକ୍ ସ୍ୱୟଂଚାଳିତ ଭାବରେ ଅକ୍ଷମ ହୋଇଥାଏ।

## ଡାଟାବେସ୍

ସାରଣୀ `webhooks` (ସ୍ଥାନାନ୍ତରଣ `011_webhooks.sql`):

| ସ୍ତମ୍ଭ              | ଟାଇପ୍ କରନ୍ତୁ। | ଟିପ୍ପଣୀ।                                           |
| ------------------- | ------------- | -------------------------------------------------- |
| `id`                | TEXT PK       | UUID                                               |
| `url`               | TEXT          | ଲକ୍ଷ୍ୟସ୍ଥଳ URL                                     |
| `events`            | TEXT          | JSON ଆରେ; ଡିଫଲ୍ଟ `["*"]`                           |
| `secret`            | TEXT          | HMAC ଗୁପ୍ତ (ଯଦି ଦିଆଯାଇନଥାଏ ଅଟୋ-ଜେନେରେଟ୍)           |
| `enabled`           | INT           | 0/1; 1 କୁ ଡିଫଲ୍ଟ କରେ।                              |
| `description`       | TEXT          | ବ human କଳ୍ପିକ ମାନବ ଲେବଲ୍।                         |
| `created_at`        | TEXT          | `datetime('now')`                                  |
| `last_triggered_at` | TEXT          | ପ୍ରତ୍ୟେକ ବିତରଣ ପ୍ରୟାସରେ ଅଦ୍ୟତନ କରାଯାଇଛି।           |
| `last_status`       | INT           | ଶେଷ ପ୍ରୟାସର HTTP ସ୍ଥିତି (0 = ନେଟୱାର୍କ)             |
| `failure_count`     | INT           | ସଫଳତା ଉପରେ 0, ବିଫଳତା ଉପରେ + 1 କୁ ପୁନ ets ସେଟ୍ କରେ। |

ବିତରଣ ଇତିହାସ `webhooks` ଧାଡିରେ ଏଗ୍ରିଗେଟ୍ କାଉଣ୍ଟର ବ୍ୟତୀତ ଉତ୍ସର୍ଗୀକୃତ `webhook_deliveries` ସାରଣୀରେ (ସ୍ଥାନାନ୍ତରଣ `069_webhook_deliveries.sql`, ପ୍ରତ୍ୟେକ ପ୍ରୟାସରେ `src/lib/db/webhookDeliveries.ts::insertDelivery` ମାଧ୍ୟମରେ ଲିଖିତ) ରେ ରହିଥାଏ। ଦୟାକରି ମେଟାଡାଟା (Slack / Discord / Telegram / କଷ୍ଟମ୍ ପେଲୋଡ୍ ଟ୍ରାନ୍ସଫର୍ମର) `070_webhooks_kind_metadata.sql` ଦ୍ୱାରା ଯୋଗ କରାଯାଇଥିଲା।

## REST API

ସମସ୍ତ ଏଣ୍ଡପଏଣ୍ଟଗୁଡିକ ମ୍ୟାନେଜମେଣ୍ଟ auth (`requireManagementAuth`) ଆବଶ୍ୟକ କରେ।

| ଶେଷ ପଏଣ୍ଟ।                      | ପଦ୍ଧତି | ବର୍ଣ୍ଣନା                                             |
| ------------------------------- | ------ | ---------------------------------------------------- |
| `/api/webhooks`                 | GET    | ୱେବହକ୍ସ ତାଲିକା କରନ୍ତୁ (ରହସ୍ୟ ମାସ୍କେଡ୍)               |
| `/api/webhooks`                 | POST   | ୱେବ୍ ହକ୍ ସୃଷ୍ଟି କରନ୍ତୁ।                              |
| `/api/webhooks/[id]`            | GET    | ୱେବ୍ ହକ୍ ସବିଶେଷ (ପୂର୍ଣ୍ଣ ରହସ୍ୟ)                      |
| `/api/webhooks/[id]`            | PUT    | କ୍ଷେତ୍ରଗୁଡିକ ଅଦ୍ୟତନ କରନ୍ତୁ।                          |
| `/api/webhooks/[id]`            | DELETE | ଅପସାରଣ କରନ୍ତୁ।                                       |
| `/api/webhooks/[id]/test`       | POST   | ଏକ `test.ping` ନିଆଁ ଲଗାନ୍ତୁ (କ ret ଣସି ଚେଷ୍ଟା ନାହିଁ) |
| `/api/webhooks/[id]/deliveries` | GET    | ଗୋଟିଏ ୱେବହକ୍ ପାଇଁ ସାମ୍ପ୍ରତିକ ବିତରଣ ପ୍ରୟାସ।           |
| `/api/webhooks/validate-url`    | POST   | ଉଡ଼ାଣ ପୂର୍ବରୁ URL ବ ation ଧତା (SSRF ରାକ୍ଷୀ)          |

ତାଲିକା ପୃଷ୍ଠାଗୁଡ଼ିକରେ ଲିକ୍ ନହେବା ପାଇଁ`GET /api/webhooks` `<first 10 chars>...` ର ରହସ୍ୟକୁ ମାସ୍କ କରିଥାଏ। ଯେତେବେଳେ ଆପଣ ପ୍ରକୃତରେ ରହସ୍ୟ ଆବଶ୍ୟକ କରନ୍ତି `[id]` GET ବ୍ୟବହାର କରନ୍ତୁ।

### ୱେବ୍ ହକ୍ ସୃଷ୍ଟି କରନ୍ତୁ।

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

ଯଦି `secret` କୁ ବାଦ ଦିଆଯାଇଛି, ସର୍ଭର ଏକ `whsec_<hex>` ଗୁପ୍ତ ସୃଷ୍ଟି କରେ ଏବଂ ପ୍ରତିକ୍ରିୟାରେ ଏହାକୁ ଫେରସ୍ତ କରେ।

### ୱେବ୍ ହକ୍ ପରୀକ୍ଷା କରନ୍ତୁ।

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` ଫେରସ୍ତ କରେ। କ rec ଣସି ପୁନ ries ଚେଷ୍ଟା ଶୀଘ୍ର ବ valid ଧତା ପାଇଁ — ଉପଯୋଗୀ ନୁହେଁ ଯାହା ରିସିଭର୍ ପେଲୋଡ୍ ଏବଂ ସ୍ ature ାକ୍ଷର ଗ୍ରହଣ କରେ।

## ଡ୍ୟାସବୋର୍ଡ।

`/dashboard/webhooks` ରେ ଡ୍ୟାସବୋର୍ଡ ପୃଷ୍ଠା ( `src/app/(dashboard)/dashboard/webhooks/page.tsx` ଦେଖନ୍ତୁ) ପ୍ରଦାନ କରେ:

- ଏକ ଇଭେଣ୍ଟ ପିକର୍ ସହିତ Create/edit ୱେବହକ୍ସ।
- `enabled`, `failure_count`, ଏବଂ `last_status` ଉପରେ ଆଧାର କରି ସ୍ଥିତି ସୂଚକ (ସକ୍ରିୟ / ନିଷ୍କ୍ରିୟ / ତ୍ରୁଟି)।
- ଗୋଟିଏ କ୍ଲିକ୍ ପରୀକ୍ଷା ବିତରଣ।
- ମାନୁଆଲ୍ enable/disable ଟୋଗଲ୍।

## ପେଲୋଡ୍ ଉଦାହରଣ।

### ଅନୁରୋଧ

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

ଅଣ-`test.ping` ଇଭେଣ୍ଟଗୁଡିକ ପାଇଁ ଫିଲ୍ଡ ଆକୃତିଗୁଡିକ ସେମାନଙ୍କୁ ନିର୍ଗତ କରୁଥିବା କଲ୍ ସାଇଟ୍ ଦ୍ୱାରା ବ୍ୟାଖ୍ୟା କରାଯାଇଥାଏ। `data` ବସ୍ତୁକୁ ଅଗ୍ରଗାମୀ-ସୁସଙ୍ଗତ ଭାବରେ ବ୍ୟବହାର କରନ୍ତୁ (କ୍ଷେତ୍ର ଯୋଡନ୍ତୁ, ଅନୁପସ୍ଥିତି ଉପରେ ନିର୍ଭର କରନ୍ତୁ ନାହିଁ)।

## ସର୍ବୋତ୍ତମ ଅଭ୍ୟାସ।

- **ପ୍ରତ୍ୟେକ ବିତରଣରେ ଦସ୍ତଖତ ଯାଞ୍ଚ କରନ୍ତୁ।** କଞ୍ଚା ଶରୀର ବିରୁଦ୍ଧରେ — ତୁମର ୱେବହୋକ୍ URL ଅନୁମାନ କରୁଥିବା ବ୍ୟକ୍ତିଙ୍କ ଠାରୁ ଖରାପ POSTs ପ୍ରତିରୋଧ କରେ।
- **~ 5 ସେକେଣ୍ଡ ମଧ୍ୟରେ 2xx ପ୍ରତିକ୍ରିୟା କରନ୍ତୁ।** — ପ୍ରେରଣକାରୀ ସମୟ 10 ସେକେଣ୍ଡରେ। ଧୀର ରିସିଭର୍ ପୁନ ry ଚେଷ୍ଟା କରିବେ ଏବଂ `failure_count` ବ ate ାଇବେ।
- **ହ୍ୟାଣ୍ଡେଲର୍ ମାନଙ୍କୁ ନିଷ୍କ୍ରିୟ କରନ୍ତୁ।** — ପୁନ ries ଚେଷ୍ଟା କରେ ଏବଂ ଅତି କମରେ ଥରେ ବିତରଣ ଅର୍ଥର ଅର୍ଥ ହେଉଛି ନକଲ ସମ୍ଭବ।
- **ସର୍ବନିମ୍ନ ସବସ୍କ୍ରାଇବ କରନ୍ତୁ।** — କେବଳ ଇଭେଣ୍ଟଗୁଡିକ ତାଲିକାଭୁକ୍ତ କରେ ଯାହାକୁ ଆପଣ ପ୍ରକୃତରେ ଖାଉଛନ୍ତି; `"*"` ଆପଣ ନିୟନ୍ତ୍ରଣ କରୁଥିବା ରିସିଭର୍ ଉପରେ ମୂଲ୍ୟ ଯୋଗ କରିବେ।
- **`failure_count` ଦେଖନ୍ତୁ।** କ୍ରମାଗତ 10 ବିଫଳତାରେ — ଶେଷ ପଏଣ୍ଟଗୁଡିକ ଅଟୋ-ଅକ୍ଷମ ଅଟେ; ରିସିଭର୍ ଫିକ୍ସିଂ କରିବା ପରେ `enabled: true` ସହିତ `PUT /api/webhooks/[id]` କଲ କରି ପୁନ res ସେଟ୍ କରନ୍ତୁ।
- **ପର୍ଯ୍ୟାୟକ୍ରମେ ରହସ୍ୟ ଘୂର୍ଣ୍ଣନ କରନ୍ତୁ।** — `PUT` ଏକ ନୂତନ `secret`, ନୂତନ ମୂଲ୍ୟକୁ ରିସିଭର୍ରେ ନିୟୋଜିତ କର ଏବଂ ପରୀକ୍ଷା ଶେଷ ପଏଣ୍ଟ ମାଧ୍ୟମରେ ନିଶ୍ଚିତ କର।

## ଆହୁରି ମଧ୍ୟ ଦେଖନ୍ତୁ।

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ପୂର୍ଣ୍ଣ ପରିଚାଳନା API ପୃଷ୍ଠ।
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ସର୍କିଟ ବ୍ରେକର / କୁଲଡାଉନ୍ ସେମାଣ୍ଟିକ୍ସ ପ୍ରଦାନକାରୀ ବିଫଳତା ପଛରେ `request.failed` ମାଧ୍ୟମରେ ସାମ୍ନାକୁ ଆସିଛି।
- ଉତ୍ସ: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
