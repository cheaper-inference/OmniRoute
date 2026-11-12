# Webhooks (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **ਸੱਚ ਦਾ ਸਰੋਤ:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**ਆਖਰੀ ਵਾਰ ਅੱਪਡੇਟ ਕੀਤਾ:** 2026-06-28 — v3.8.40

OmniRoute ਪਲੇਟਫਾਰਮ ਇਵੈਂਟਾਂ 'ਤੇ HTTP ਵੈਬਹੁੱਕ ਨੂੰ ਫਾਇਰ ਕਰ ਸਕਦਾ ਹੈ। Slack, PagerDuty, Datadog, ਅੰਦਰੂਨੀ ਚੇਤਾਵਨੀ ਸੇਵਾਵਾਂ, ਜਾਂ ਕਿਸੇ HTTP ਰਿਸੀਵਰ ਨਾਲ ਏਕੀਕ੍ਰਿਤ ਕਰਨ ਲਈ ਉਹਨਾਂ ਦੀ ਵਰਤੋਂ ਕਰੋ।

ਡਿਸਪੈਚਰ HMAC-SHA256 ਨਾਲ ਹਰੇਕ ਡਿਲੀਵਰੀ 'ਤੇ ਹਸਤਾਖਰ ਕਰਦਾ ਹੈ, ਅਸਥਾਈ ਅਸਫਲਤਾਵਾਂ 'ਤੇ ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰਦਾ ਹੈ, ਪ੍ਰਤੀ ਵੈਬਹੁੱਕ ਡਿਲੀਵਰੀ ਸਿਹਤ ਨੂੰ ਟਰੈਕ ਕਰਦਾ ਹੈ, ਅਤੇ ਅੰਤਮ ਬਿੰਦੂਆਂ ਨੂੰ ਸਵੈ-ਅਯੋਗ ਕਰਦਾ ਹੈ ਜੋ ਅਸਫਲ ਹੁੰਦੇ ਰਹਿੰਦੇ ਹਨ।

## ਸਮਰਥਿਤ ਇਵੈਂਟਸ

`WebhookEvent` ਕਿਸਮ (`src/lib/webhooks/eventDescriptions.ts`, `src/lib/webhookDispatcher.ts` ਦੁਆਰਾ ਖਪਤ ਕੀਤੀ ਜਾਂਦੀ ਹੈ) ਵਰਤਮਾਨ ਵਿੱਚ ਸੱਤ ਇਵੈਂਟਾਂ ਨੂੰ ਮਾਡਲ ਕਰਦੀ ਹੈ:

| ਘਟਨਾ                      | ਜਦੋਂ ਅੱਗ ਲੱਗ ਜਾਂਦੀ ਹੈ                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------- |
| `request.completed`       | ਇੱਕ ਪ੍ਰੌਕਸੀ ਬੇਨਤੀ ਸਫਲਤਾਪੂਰਵਕ ਪੂਰੀ ਹੋਈ                                                        |
| `request.failed`          | ਇੱਕ ਪ੍ਰੌਕਸੀ ਬੇਨਤੀ ਸਾਰੇ retries/fallback ਦੇ ਬਾਅਦ ਅਸਫਲ ਹੋ ਜਾਂਦੀ ਹੈ                             |
| `quota.exceeded`          | ਇੱਕ API ਕੁੰਜੀ ਇੱਕ budget/quota ਥ੍ਰੈਸ਼ਹੋਲਡ ਨੂੰ ਪਾਰ ਕਰਦੀ ਹੈ                                    |
| `proxy.set_aside`         | ਇੱਕ ਪ੍ਰੌਕਸੀ ਪੂਲ ਮੈਂਬਰ ਨੂੰ ਵਾਰ-ਵਾਰ ਇਨਕਾਰ ਕਰਨ ਤੋਂ ਬਾਅਦ ਇੱਕ ਪਾਸੇ ਰੱਖਿਆ ਜਾਂਦਾ ਹੈ (ਸਿਰਫ਼ ਤਬਦੀਲੀ)  |
| `proxy.pool.exhausted`    | ਇੱਕ ਪ੍ਰੌਕਸੀ ਪੂਲ ਸਕੋਪ ਦੇ ਹਰ ਮੈਂਬਰ ਨੂੰ ਇੱਕ ਪਾਸੇ ਰੱਖਿਆ ਗਿਆ ਹੈ                                   |
| `provider.reset_redeemed` | ਸਵੈ-ਲਾਗੂ ਬੈਂਕ ਕੀਤੇ ਰੀਸੈੱਟਾਂ ਨੇ ਰੀਸੈਟ ਕ੍ਰੈਡਿਟ ਜਾਂ Claude ਹਫਤਾਵਾਰੀ ਸੈਸ਼ਨ ਰੀਸੈੱਟ ਨੂੰ ਰੀਡੀਮ ਕੀਤਾ |
| `test.ping`               | ਟੈਸਟ ਅੰਤਮ ਬਿੰਦੂ ਦੁਆਰਾ ਵਰਤੀ ਗਈ ਸਿੰਥੈਟਿਕ ਘਟਨਾ                                                  |

ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਹਰ ਇਵੈਂਟ ਨੂੰ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਸ਼ਾਬਦਿਕ `"*"` ਸਵੀਕਾਰ ਕਰਦੇ ਹਨ। `events` ਵਿੱਚ ਅਣਜਾਣ ਇਵੈਂਟ ਨਾਮਾਂ ਨੂੰ ਡਿਸਪੈਚ ਸਮੇਂ ਅਣਡਿੱਠ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।

> ਨੋਟ: ਡਿਸਪੈਚਰ API ਵਾਇਰਡ ਹੈ, ਪਰ ਕੁਝ ਗੈਰ-`test.ping` ਇਵੈਂਟਾਂ ਲਈ ਉਤਪਾਦਨ ਕਾਲ ਸਾਈਟਾਂ ਅਜੇ ਵੀ ਉਤਰ ਰਹੀਆਂ ਹਨ। ਇਹ ਦੇਖਣ ਲਈ `grep dispatchEvent` ਜਾਂਚ ਕਰੋ ਕਿ ਵਰਤਮਾਨ ਵਿੱਚ ਤੁਹਾਡੇ ਰੀਲੀਜ਼ ਵਿੱਚ ਡਿਸਪੈਚਰ ਨੂੰ ਕਿਹੜੇ ਮਾਰਗਾਂ ਨੇ ਬੁਲਾਇਆ ਹੈ।

## ਆਰਕੀਟੈਕਚਰ

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

ਡਿਸਪੈਚ ਕਾਲਰ ਲਈ ਫਾਇਰ-ਐਂਡ-ਫਰਗੇਟ ਹੈ: `Promise.allSettled` ਪ੍ਰਤੀ-ਵੈਬਹੁੱਕ ਗਲਤੀਆਂ ਨੂੰ ਨਿਗਲ ਜਾਂਦਾ ਹੈ ਤਾਂ ਕਿ ਇੱਕ ਖਰਾਬ ਪ੍ਰਾਪਤਕਰਤਾ ਦੂਜੇ ਨੂੰ ਰੋਕ ਨਾ ਸਕੇ।

## HMAC ਦਸਤਖਤ

ਜਦੋਂ ਇੱਕ ਵੈਬਹੁੱਕ ਵਿੱਚ `secret` ਹੁੰਦਾ ਹੈ, OmniRoute JSON ਬਾਡੀ 'ਤੇ ਹਸਤਾਖਰ ਕਰਦਾ ਹੈ ਅਤੇ ਭੇਜਦਾ ਹੈ:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> ਸਿਰਲੇਖ ਦੇ ਨਾਮ `X-Webhook-*` ਅਗੇਤਰ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹਨ ( `X-OmniRoute-*` ਨਹੀਂ)। ਹਸਤਾਖਰ ਮੁੱਲ `sha256=<hex>` — ਹੈ ਪੂਰੇ ਅਗੇਤਰ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ।

ਜੇਕਰ `createWebhook` ਨੂੰ ਬਿਨਾਂ ਕਿਸੇ ਗੁਪਤ ਦੇ ਬੁਲਾਇਆ ਜਾਂਦਾ ਹੈ, ਤਾਂ DB ਮੋਡੀਊਲ ਇੱਕ (`whsec_<48 hex>`) ਤਿਆਰ ਕਰਦਾ ਹੈ ਇਸਲਈ ਸਾਰੇ ਵੈਬਹੁੱਕ ਮੂਲ ਰੂਪ ਵਿੱਚ ਹਸਤਾਖਰ ਕੀਤੇ ਜਾਂਦੇ ਹਨ।

### ਰਿਸੀਵਰ 'ਤੇ ਪੁਸ਼ਟੀ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

ਦੇ ਵਿਰੁੱਧ ਹਮੇਸ਼ਾਂ ਤਸਦੀਕ ਕਰੋ**ਕੱਚਾ** ਕਿਸੇ ਵੀ JSON ਪਾਰਸਿੰਗ ਤੋਂ ਪਹਿਲਾਂ, ਸਰੀਰ ਦੀ ਬੇਨਤੀ ਕਰੋ।

## ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ ਅਤੇ ਅਸਫਲਤਾ ਨੀਤੀ

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- ਪ੍ਰਤੀ ਕੋਸ਼ਿਸ਼ 10 ਸਕਿੰਟ ਸਮਾਂ ਸਮਾਪਤ (`AbortController`)।
- HTTP 2xx ਨੂੰ ਸਫਲਤਾ ਮੰਨਿਆ ਜਾਂਦਾ ਹੈ।
- HTTP 3xx/4xx — `success = res.ok` ਨਾਲ ਡਿਲੀਵਰ ਕੀਤੇ ਗਏ ਇੱਕ ਗੈਰ-ਮੁੜ-ਕੋਸ਼ਿਸ਼ਯੋਗ ਅੰਤਮ ਸਥਿਤੀ ਵਜੋਂ ਗਿਣਿਆ ਜਾਂਦਾ ਹੈ।
- HTTP 5xx ਅਤੇ ਨੈੱਟਵਰਕ ਤਰੁੱਟੀਆਂ ਨੂੰ ਐਕਸਪੋਨੈਂਸ਼ੀਅਲ ਬੈਕਆਫ ਦੇ ਨਾਲ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ: `2^attempt * 1000 ms` (1s, 2s, 4s)।
- `maxRetries` ਤੋਂ ਬਾਅਦ, ਡਿਲੀਵਰੀ ਨੂੰ ਅਸਫਲ ਵਜੋਂ ਰਿਕਾਰਡ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।
- ਹਰੇਕ ਡਿਲੀਵਰੀ `last_triggered_at`, `last_status` ਅੱਪਡੇਟ ਕਰਦੀ ਹੈ, ਅਤੇ ਜਾਂ ਤਾਂ `failure_count` ਰੀਸੈੱਟ ਕਰਦੀ ਹੈ ਜਾਂ ਵਧਾਉਂਦੀ ਹੈ।
- ਡਿਸਪੈਚਰ ਹਰੇਕ ਪ੍ਰਸ਼ੰਸਕ-ਆਉਟ ਤੋਂ ਬਾਅਦ `disableWebhooksWithHighFailures(10)` ਕਾਲ ਕਰਦਾ ਹੈ, ਇਸਲਈ `failure_count >= 10` ਵਾਲਾ ਕੋਈ ਵੀ ਵੈਬਹੁੱਕ ਆਪਣੇ ਆਪ ਹੀ ਅਸਮਰੱਥ ਹੋ ਜਾਂਦਾ ਹੈ।

## ਡਾਟਾਬੇਸ

ਟੇਬਲ `webhooks` (ਮਾਈਗ੍ਰੇਸ਼ਨ `011_webhooks.sql`):

| ਕਾਲਮ                | ਟਾਈਪ ਕਰੋ | ਨੋਟਸ                                                |
| ------------------- | -------- | --------------------------------------------------- |
| `id`                | TEXT PK  | UUID                                                |
| `url`               | TEXT     | ਮੰਜ਼ਿਲ URL                                          |
| `events`            | TEXT     | JSON ਐਰੇ; ਪੂਰਵ-ਨਿਰਧਾਰਤ `["*"]`                      |
| `secret`            | TEXT     | HMAC ਗੁਪਤ (ਜੇ ਨਹੀਂ ਦਿੱਤਾ ਗਿਆ ਤਾਂ ਸਵੈ-ਤਿਆਰ ਕੀਤਾ ਗਿਆ) |
| `enabled`           | INT      | 0/1; 1 ਲਈ ਡਿਫਾਲਟ                                    |
| `description`       | TEXT     | ਵਿਕਲਪਿਕ ਮਨੁੱਖੀ ਲੇਬਲ                                 |
| `created_at`        | TEXT     | `datetime('now')`                                   |
| `last_triggered_at` | TEXT     | ਹਰ ਡਿਲੀਵਰੀ ਕੋਸ਼ਿਸ਼ 'ਤੇ ਅਪਡੇਟ ਕੀਤਾ ਗਿਆ               |
| `last_status`       | INT      | ਆਖਰੀ ਕੋਸ਼ਿਸ਼ ਦੀHTTP ਸਥਿਤੀ (0 = ਨੈੱਟਵਰਕ)             |
| `failure_count`     | INT      | ਸਫਲਤਾ 'ਤੇ 0, ਅਸਫਲਤਾ 'ਤੇ + 1 'ਤੇ ਰੀਸੈੱਟ ਕਰੋ          |

ਡਿਲੀਵਰੀ ਇਤਿਹਾਸ ਨੂੰ ਸਮਰਪਿਤ `webhook_deliveries` ਸਾਰਣੀ (ਪ੍ਰਵਾਸ `069_webhook_deliveries.sql`, ਹਰ ਕੋਸ਼ਿਸ਼ 'ਤੇ `src/lib/db/webhookDeliveries.ts::insertDelivery` ਦੁਆਰਾ ਲਿਖਿਆ ਗਿਆ) ਵਿੱਚ ਕਾਇਮ ਹੈ, `webhooks` ਕਤਾਰ 'ਤੇ ਕੁੱਲ ਕਾਊਂਟਰਾਂ ਤੋਂ ਇਲਾਵਾ। ਕਿਸਮ ਦਾ ਮੈਟਾਡੇਟਾ (Slack / Discord / Telegram / ਕਸਟਮ ਪੇਲੋਡ ਟ੍ਰਾਂਸਫਾਰਮਰ) `070_webhooks_kind_metadata.sql` ਦੁਆਰਾ ਜੋੜਿਆ ਗਿਆ ਸੀ।

## REST API

ਸਾਰੇ ਅੰਤਮ ਬਿੰਦੂਆਂ ਲਈ ਪ੍ਰਬੰਧਨ ਪ੍ਰਮਾਣਿਕਤਾ (`requireManagementAuth`) ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ।

| ਅੰਤ ਬਿੰਦੂ                       | ਵਿਧੀ   | ਵਰਣਨ                                            |
| ------------------------------- | ------ | ----------------------------------------------- |
| `/api/webhooks`                 | GET    | ਵੈਬਹੁੱਕਾਂ ਦੀ ਸੂਚੀ ਬਣਾਓ (ਭੇਦ ਨਕਾਬਬੰਦ)            |
| `/api/webhooks`                 | POST   | ਵੈਬਹੁੱਕ ਬਣਾਓ                                    |
| `/api/webhooks/[id]`            | GET    | ਵੈਬਹੁੱਕ ਵੇਰਵੇ (ਪੂਰਾ ਰਾਜ਼)                       |
| `/api/webhooks/[id]`            | PUT    | ਖੇਤਰਾਂ ਨੂੰ ਅੱਪਡੇਟ ਕਰੋ                           |
| `/api/webhooks/[id]`            | DELETE | ਹਟਾਓ                                            |
| `/api/webhooks/[id]/test`       | POST   | `test.ping` ਨੂੰ ਫਾਇਰ ਕਰੋ (ਕੋਈ ਮੁੜ ਕੋਸ਼ਿਸ਼ ਨਹੀਂ) |
| `/api/webhooks/[id]/deliveries` | GET    | ਇੱਕ ਵੈੱਬਹੁੱਕ ਲਈ ਹਾਲੀਆ ਡਿਲੀਵਰੀ ਕੋਸ਼ਿਸ਼ਾਂ         |
| `/api/webhooks/validate-url`    | POST   | ਪ੍ਰੀ-ਫਲਾਈਟ URL ਪ੍ਰਮਾਣਿਕਤਾ (SSRF ਗਾਰਡ)           |

`GET /api/webhooks` ਸੂਚੀ ਪੰਨਿਆਂ 'ਤੇ ਲੀਕ ਹੋਣ ਤੋਂ ਬਚਣ ਲਈ `<first 10 chars>...` ਦਾ ਰਾਜ਼ ਲੁਕਾਉਂਦਾ ਹੈ। `[id]` GET ਦੀ ਵਰਤੋਂ ਕਰੋ ਜਦੋਂ ਤੁਹਾਨੂੰ ਅਸਲ ਵਿੱਚ ਗੁਪਤ ਦੀ ਲੋੜ ਹੋਵੇ।

### ਵੈਬਹੁੱਕ ਬਣਾਓ

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

ਜੇਕਰ `secret` ਨੂੰ ਛੱਡ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਸਰਵਰ ਇੱਕ `whsec_<hex>` ਗੁਪਤ ਬਣਾਉਂਦਾ ਹੈ ਅਤੇ ਇਸਨੂੰ ਜਵਾਬ ਵਿੱਚ ਵਾਪਸ ਕਰਦਾ ਹੈ।

### ਵੈੱਬਹੁੱਕ ਦੀ ਜਾਂਚ ਕਰੋ

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` ਵਾਪਸ ਕਰਦਾ ਹੈ। ਕਿਸੇ ਵੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਦੀ ਕੋਸ਼ਿਸ਼ ਨਹੀਂ ਕੀਤੀ ਜਾਂਦੀ ਹੈ — ਇਹ ਤੁਰੰਤ ਪ੍ਰਮਾਣਿਤ ਕਰਨ ਲਈ ਉਪਯੋਗੀ ਹੈ ਕਿ ਪ੍ਰਾਪਤਕਰਤਾ ਪੇਲੋਡ ਅਤੇ ਦਸਤਖਤ ਸਵੀਕਾਰ ਕਰਦਾ ਹੈ।

## ਡੈਸ਼ਬੋਰਡ

`/dashboard/webhooks` ਤੇ ਡੈਸ਼ਬੋਰਡ ਪੰਨਾ ( `src/app/(dashboard)/dashboard/webhooks/page.tsx` ਦੇਖੋ) ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ:

- ਇੱਕ ਇਵੈਂਟ ਚੋਣਕਾਰ ਦੇ ਨਾਲ Create/edit ਵੈਬਹੁੱਕ
- `enabled`, `failure_count`, ਅਤੇ `last_status` ਤੇ ਆਧਾਰਿਤ ਸਥਿਤੀ ਸੂਚਕ (ਕਿਰਿਆਸ਼ੀਲ/ਅਕਿਰਿਆਸ਼ੀਲ/ਗਲਤੀ)
- ਇੱਕ-ਕਲਿੱਕ ਟੈਸਟ ਡਿਲੀਵਰੀ
- ਮੈਨੁਅਲ enable/disable ਟੌਗਲ

## ਪੇਲੋਡ ਉਦਾਹਰਨਾਂ

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

ਗੈਰ-`test.ping` ਇਵੈਂਟਸ ਲਈ ਫੀਲਡ ਆਕਾਰ ਕਾਲ ਸਾਈਟਾਂ ਦੁਆਰਾ ਪਰਿਭਾਸ਼ਿਤ ਕੀਤੇ ਜਾਂਦੇ ਹਨ ਜੋ ਉਹਨਾਂ ਨੂੰ ਛੱਡਦੀਆਂ ਹਨ; `data` ਆਬਜੈਕਟ ਨੂੰ ਫਾਰਵਰਡ-ਅਨੁਕੂਲ ਸਮਝੋ (ਫੀਲਡ ਸ਼ਾਮਲ ਕਰੋ, ਗੈਰਹਾਜ਼ਰੀ 'ਤੇ ਨਿਰਭਰ ਨਾ ਕਰੋ)।

## ਵਧੀਆ ਅਭਿਆਸ

- **ਹਰ ਡਿਲੀਵਰੀ 'ਤੇ ਦਸਤਖਤ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ** ਕੱਚੇ ਸਰੀਰ ਦੇ ਵਿਰੁੱਧ — ਤੁਹਾਡੇ ਵੈਬਹੁੱਕ URL ਦਾ ਅਨੁਮਾਨ ਲਗਾਉਣ ਵਾਲੇ ਕਿਸੇ ਵੀ ਵਿਅਕਤੀ ਤੋਂ ਧੋਖੇਬਾਜ਼ POSTs ਰੋਕਦਾ ਹੈ।
- **~ 5 ਸਕਿੰਟਾਂ ਦੇ ਅੰਦਰ 2xx ਜਵਾਬ ਦਿਓ** — ਡਿਸਪੈਚਰ ਦਾ ਸਮਾਂ 10 ਸਕਿੰਟ 'ਤੇ ਖਤਮ ਹੁੰਦਾ ਹੈ। ਹੌਲੀ ਰਿਸੀਵਰ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ਾਂ ਖਾਵੇਗਾ ਅਤੇ `failure_count` ਵਧਾ ਦੇਵੇਗਾ।
- **ਹੈਂਡਲਰਾਂ ਨੂੰ ਅਯੋਗ ਬਣਾਓ** — ਮੁੜ ਕੋਸ਼ਿਸ਼ਾਂ ਅਤੇ ਘੱਟੋ-ਘੱਟ-ਇੱਕ ਵਾਰ ਡਿਲੀਵਰੀ ਸਿਮੈਂਟਿਕਸ ਦਾ ਮਤਲਬ ਹੈ ਕਿ ਡੁਪਲੀਕੇਟ ਸੰਭਵ ਹਨ।
- **ਘੱਟ ਤੋਂ ਘੱਟ ਗਾਹਕ ਬਣੋ** — ਸਿਰਫ਼ ਉਹਨਾਂ ਘਟਨਾਵਾਂ ਦੀ ਸੂਚੀ ਬਣਾਓ ਜੋ ਤੁਸੀਂ ਅਸਲ ਵਿੱਚ ਵਰਤਦੇ ਹੋ; `"*"` ਉਹਨਾਂ ਰਿਸੀਵਰਾਂ 'ਤੇ ਲਾਗਤ ਜੋੜੇਗਾ ਜਿਨ੍ਹਾਂ 'ਤੇ ਤੁਸੀਂ ਕੰਟਰੋਲ ਨਹੀਂ ਕਰਦੇ ਹੋ।
- **`failure_count` ਦੇਖੋ** — ਅੰਤਮ ਬਿੰਦੂ ਲਗਾਤਾਰ 10 ਅਸਫਲਤਾਵਾਂ 'ਤੇ ਸਵੈ-ਅਯੋਗ ਹੋ ਜਾਂਦੇ ਹਨ; ਰਿਸੀਵਰ ਫਿਕਸ ਕਰਨ ਤੋਂ ਬਾਅਦ `PUT /api/webhooks/[id]` `enabled: true` ਨਾਲ ਕਾਲ ਕਰਕੇ ਰੀਸੈਟ ਕਰੋ।
- **ਸਮੇਂ-ਸਮੇਂ ਤੇ ਭੇਦ ਘੁੰਮਾਓ** — `PUT` ਇੱਕ ਨਵਾਂ `secret`, ਰਿਸੀਵਰ ਲਈ ਨਵਾਂ ਮੁੱਲ ਤੈਨਾਤ ਕਰੋ, ਅਤੇ ਟੈਸਟ ਐਂਡਪੁਆਇੰਟ ਦੁਆਰਾ ਪੁਸ਼ਟੀ ਕਰੋ।

## ਇਹ ਵੀ ਦੇਖੋ

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ਪੂਰਾ ਪ੍ਰਬੰਧਨ API ਸਤ੍ਹਾ
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ਸਰਕਟ ਬ੍ਰੇਕਰ / ਪ੍ਰਦਾਤਾ ਦੀਆਂ ਅਸਫਲਤਾਵਾਂ ਦੇ ਪਿੱਛੇ ਕੂਲਡਾਉਨ ਅਰਥ ਵਿਗਿਆਨ `request.failed` ਦੁਆਰਾ ਸਾਹਮਣੇ ਆਏ
- ਸਰੋਤ: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
