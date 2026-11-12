# Webhooks (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **ಸತ್ಯದ ಮೂಲ:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**ಕೊನೆಯದಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ:** 2026-06-28 — v3.8.40

OmniRoute ಪ್ಲಾಟ್ಫಾರ್ಮ್ ಈವೆಂಟ್ಗಳಲ್ಲಿ HTTP ವೆಬ್ಹೂಕ್ಗಳನ್ನು ಹಾರಿಸಬಹುದು. Slack, PagerDuty, ಡೇಟಾಡಾಗ್, ಆಂತರಿಕ ಎಚ್ಚರಿಕೆ ಸೇವೆಗಳು ಅಥವಾ ಯಾವುದೇ HTTP ರಿಸೀವರ್ನೊಂದಿಗೆ ಸಂಯೋಜಿಸಲು ಅವುಗಳನ್ನು ಬಳಸಿ.

ರವಾನೆದಾರರು ಪ್ರತಿ ವಿತರಣೆಯನ್ನು HMAC-SHA256 ಯೊಂದಿಗೆ ಸಹಿ ಮಾಡುತ್ತಾರೆ, ಅಸ್ಥಿರ ವೈಫಲ್ಯಗಳನ್ನು ಮರುಪ್ರಯತ್ನಿಸುತ್ತಾರೆ, ಪ್ರತಿ ವೆಬ್ಹೂಕ್ಗೆ ವಿತರಣಾ ಆರೋಗ್ಯವನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡುತ್ತಾರೆ ಮತ್ತು ವಿಫಲಗೊಳ್ಳುವ ಅಂತ್ಯಬಿಂದುಗಳನ್ನು ಸ್ವಯಂ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸುತ್ತಾರೆ.

## ಬೆಂಬಲಿತ ಈವೆಂಟ್ಗಳು

`WebhookEvent` ಪ್ರಕಾರವು (`src/lib/webhooks/eventDescriptions.ts`, `src/lib/webhookDispatcher.ts` ನಿಂದ ಸೇವಿಸಲ್ಪಟ್ಟಿದೆ ) ಪ್ರಸ್ತುತ ಏಳು ಈವೆಂಟ್ಗಳನ್ನು ರೂಪಿಸುತ್ತದೆ:

| ಈವೆಂಟ್                    | ಯಾವಾಗ ಬೆಂಕಿ                                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `request.completed`       | ಪ್ರಾಕ್ಸಿಡ್ ವಿನಂತಿಯು ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಂಡಿದೆ                                                                              |
| `request.failed`          | ಎಲ್ಲಾ retries/fallback ನಂತರ ಪ್ರಾಕ್ಸಿಡ್ ವಿನಂತಿಯು ವಿಫಲಗೊಳ್ಳುತ್ತದೆ                                                          |
| `quota.exceeded`          | API ಕೀಲಿಯು budget/quota ಮಿತಿಯನ್ನು ದಾಟುತ್ತದೆ                                                                              |
| `proxy.set_aside`         | ಪುನರಾವರ್ತಿತ ನಿರಾಕರಣೆಗಳ ನಂತರ ಪ್ರಾಕ್ಸಿ ಪೂಲ್ ಸದಸ್ಯರನ್ನು ಪಕ್ಕಕ್ಕೆ ಹಾಕಲಾಗುತ್ತದೆ (ಪರಿವರ್ತನೆ ಮಾತ್ರ)                             |
| `proxy.pool.exhausted`    | ಪ್ರಾಕ್ಸಿ ಪೂಲ್ ಸ್ಕೋಪ್ನ ಪ್ರತಿಯೊಬ್ಬ ಸದಸ್ಯರನ್ನು ಪಕ್ಕಕ್ಕೆ ಹಾಕಲಾಗಿದೆ                                                           |
| `provider.reset_redeemed` | ಸ್ವಯಂ-ಅನ್ವಯಿಸುವ ಬ್ಯಾಂಕಿನ ಮರುಹೊಂದಿಕೆಗಳು ಮರುಹೊಂದಿಸುವ ಕ್ರೆಡಿಟ್ ಅಥವಾ Claude ಸಾಪ್ತಾಹಿಕ ಸೆಶನ್ ಮರುಹೊಂದಿಕೆಯನ್ನು ರಿಡೀಮ್ ಮಾಡಲಾಗಿದೆ |
| `test.ping`               | ಪರೀಕ್ಷಾ ಅಂತಿಮ ಬಿಂದು ಬಳಸಿದ ಸಂಶ್ಲೇಷಿತ ಘಟನೆ                                                                                 |

ಪ್ರತಿ ಈವೆಂಟ್ ಅನ್ನು ಸ್ವೀಕರಿಸಲು ಚಂದಾದಾರಿಕೆಗಳು ಅಕ್ಷರಶಃ `"*"` ಸ್ವೀಕರಿಸುತ್ತವೆ. `events` ಯಲ್ಲಿನ ಅಜ್ಞಾತ ಈವೆಂಟ್ ಹೆಸರುಗಳನ್ನು ರವಾನೆ ಸಮಯದಲ್ಲಿ ನಿರ್ಲಕ್ಷಿಸಲಾಗುತ್ತದೆ.

> ಗಮನಿಸಿ: ರವಾನೆದಾರ API ವೈರ್ಡ್ ಆಗಿದೆ, ಆದರೆ ಕೆಲವು`test.ping` ಅಲ್ಲದ ಈವೆಂಟ್ಗಳಿಗೆ ಉತ್ಪಾದನಾ ಕರೆ ಸೈಟ್ಗಳು ಇನ್ನೂ ಲ್ಯಾಂಡಿಂಗ್ ಆಗುತ್ತಿವೆ. ನಿಮ್ಮ ಬಿಡುಗಡೆಯಲ್ಲಿ ಪ್ರಸ್ತುತ ಯಾವ ಮಾರ್ಗಗಳು ರವಾನೆದಾರರನ್ನು ಆಹ್ವಾನಿಸುತ್ತವೆ ಎಂಬುದನ್ನು ನೋಡಲು `grep dispatchEvent` ಪರಿಶೀಲಿಸಿ.

## ವಾಸ್ತುಶಿಲ್ಪ

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

ರವಾನೆಯು ಕರೆ ಮಾಡಿದವರಿಗೆ ಬೆಂಕಿ ಮತ್ತು ಮರೆತುಬಿಡಿ: `Promise.allSettled` ಪ್ರತಿ ವೆಬ್ಹೂಕ್ ದೋಷಗಳನ್ನು ನುಂಗುತ್ತದೆ ಆದ್ದರಿಂದ ಒಂದು ಕೆಟ್ಟ ರಿಸೀವರ್ ಇತರರನ್ನು ನಿರ್ಬಂಧಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ.

## HMAC ಸಹಿ

ವೆಬ್ಹೂಕ್ `secret` ಅನ್ನು ಹೊಂದಿರುವಾಗ, OmniRoute JSON ದೇಹಕ್ಕೆ ಸಹಿ ಮಾಡುತ್ತದೆ ಮತ್ತು ಕಳುಹಿಸುತ್ತದೆ:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> ಹೆಡರ್ ಹೆಸರುಗಳು `X-Webhook-*` ಪೂರ್ವಪ್ರತ್ಯಯವನ್ನು ಬಳಸುತ್ತವೆ ( `X-OmniRoute-*` ಅಲ್ಲ). ಸಹಿ ಮೌಲ್ಯವು `sha256=<hex>` — ಪೂರ್ಣ ಪೂರ್ವಪ್ರತ್ಯಯವನ್ನು ಪರಿಶೀಲಿಸಿ.

`createWebhook` ರಹಸ್ಯವಿಲ್ಲದೆ ಕರೆದರೆ, DB ಮಾಡ್ಯೂಲ್ ಒಂದನ್ನು ಉತ್ಪಾದಿಸುತ್ತದೆ (`whsec_<48 hex>`) ಆದ್ದರಿಂದ ಎಲ್ಲಾ ವೆಬ್ಹೂಕ್ಗಳನ್ನು ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ಸಹಿ ಮಾಡಲಾಗುತ್ತದೆ.

### ರಿಸೀವರ್ನಲ್ಲಿ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

ವಿರುದ್ಧ ಯಾವಾಗಲೂ ಪರಿಶೀಲಿಸಿ**ಕಚ್ಚಾ** ಯಾವುದೇ JSON ಪಾರ್ಸಿಂಗ್ ಮಾಡುವ ಮೊದಲು ದೇಹವನ್ನು ವಿನಂತಿಸಿ.

## ಮರುಪ್ರಯತ್ನಿಸಿ ಮತ್ತು ವೈಫಲ್ಯ ನೀತಿ

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- ಪ್ರತಿ ಪ್ರಯತ್ನಕ್ಕೆ 10 ಸೆಕೆಂಡುಗಳ ಕಾಲಾವಧಿ (`AbortController`).
- HTTP 2xx ಯಶಸ್ಸು ಎಂದು ಪರಿಗಣಿಸುತ್ತದೆ.
- HTTP 3xx/4xx ಮರುಪ್ರಯತ್ನಿಸಲಾಗದ ಅಂತಿಮ ಸ್ಥಿತಿ — ಎಂದು ಪರಿಗಣಿಸುತ್ತದೆ `success = res.ok` ಯೊಂದಿಗೆ ವಿತರಿಸಲಾಗಿದೆ.
- HTTP 5xx ಮತ್ತು ನೆಟ್ವರ್ಕ್ ದೋಷಗಳನ್ನು ಘಾತೀಯ ಬ್ಯಾಕ್ಆಫ್ನೊಂದಿಗೆ ಮರುಪ್ರಯತ್ನಿಸಲಾಗಿದೆ: `2^attempt * 1000 ms` (1s, 2s, 4s).
- `maxRetries` ನಂತರ, ವಿತರಣೆಯು ವಿಫಲವಾಗಿದೆ ಎಂದು ದಾಖಲಿಸಲಾಗಿದೆ.
- ಪ್ರತಿ ವಿತರಣೆಯು `last_triggered_at`, `last_status` ನವೀಕರಿಸುತ್ತದೆ ಮತ್ತು `failure_count` ಮರುಹೊಂದಿಸುತ್ತದೆ ಅಥವಾ ಹೆಚ್ಚಿಸುತ್ತದೆ.
- ಪ್ರತಿ ಫ್ಯಾನ್-ಔಟ್ ನಂತರ ರವಾನೆದಾರನು `disableWebhooksWithHighFailures(10)` ಕರೆ ಮಾಡುತ್ತಾನೆ, ಆದ್ದರಿಂದ `failure_count >= 10` ಯೊಂದಿಗಿನ ಯಾವುದೇ ವೆಬ್ಹೂಕ್ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನಿಷ್ಕ್ರಿಯಗೊಳ್ಳುತ್ತದೆ.

## ಡೇಟಾಬೇಸ್

ಟೇಬಲ್ `webhooks` (ವಲಸೆ `011_webhooks.sql`):

| ಅಂಕಣ                | ಟೈಪ್ ಮಾಡಿ | ಟಿಪ್ಪಣಿಗಳು                                         |
| ------------------- | --------- | -------------------------------------------------- |
| `id`                | TEXT PK   | UUID                                               |
| `url`               | TEXT      | ಗಮ್ಯಸ್ಥಾನ URL                                      |
| `events`            | TEXT      | JSON ಅರೇ; ಡೀಫಾಲ್ಟ್ `["*"]`                         |
| `secret`            | TEXT      | HMAC ರಹಸ್ಯ (ನೀಡದಿದ್ದಲ್ಲಿ ಸ್ವಯಂ-ರಚಿಸಲಾಗಿದೆ)         |
| `enabled`           | INT       | 0/1; 1 ಗೆ ಡಿಫಾಲ್ಟ್                                 |
| `description`       | TEXT      | ಐಚ್ಛಿಕ ಮಾನವ ಲೇಬಲ್                                  |
| `created_at`        | TEXT      | `datetime('now')`                                  |
| `last_triggered_at` | TEXT      | ಪ್ರತಿ ವಿತರಣಾ ಪ್ರಯತ್ನದಲ್ಲಿ ನವೀಕರಿಸಲಾಗಿದೆ            |
| `last_status`       | INT       | ಕೊನೆಯ ಪ್ರಯತ್ನದ HTTP ಸ್ಥಿತಿ (0 = ನೆಟ್ವರ್ಕ್)         |
| `failure_count`     | INT       | ಯಶಸ್ಸಿನ ಮೇಲೆ 0, ವೈಫಲ್ಯದಲ್ಲಿ + 1 ಗೆ ಮರುಹೊಂದಿಸುತ್ತದೆ |

`webhooks` ಸಾಲಿನಲ್ಲಿನ ಒಟ್ಟು ಕೌಂಟರ್ಗಳ ಜೊತೆಗೆ, ಡೆಲಿವರಿ ಇತಿಹಾಸವು ಮೀಸಲಾದ `webhook_deliveries` ಟೇಬಲ್ನಲ್ಲಿ (ವಲಸೆ `069_webhook_deliveries.sql`, ಪ್ರತಿ ಪ್ರಯತ್ನದಲ್ಲಿ `src/lib/db/webhookDeliveries.ts::insertDelivery` ಮೂಲಕ ಬರೆಯಲಾಗುತ್ತದೆ) ಮುಂದುವರಿಯುತ್ತದೆ. ರೀತಿಯ ಮೆಟಾಡೇಟಾ (Slack / Discord / Telegram / ಕಸ್ಟಮ್ ಪೇಲೋಡ್ ಟ್ರಾನ್ಸ್ಫಾರ್ಮರ್ಗಳು) ಅನ್ನು `070_webhooks_kind_metadata.sql` ನಿಂದ ಸೇರಿಸಲಾಗಿದೆ.

## REST API

ಎಲ್ಲಾ ಅಂತಿಮ ಬಿಂದುಗಳಿಗೆ ನಿರ್ವಹಣಾ ದೃಢೀಕರಣದ ಅಗತ್ಯವಿದೆ (`requireManagementAuth`).

| ಅಂತ್ಯಬಿಂದು                      | ವಿಧಾನ  | ವಿವರಣೆ                                               |
| ------------------------------- | ------ | ---------------------------------------------------- |
| `/api/webhooks`                 | GET    | ವೆಬ್ಹೂಕ್ಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿ (ರಹಸ್ಯಗಳನ್ನು ಮರೆಮಾಚಲಾಗಿದೆ) |
| `/api/webhooks`                 | POST   | ವೆಬ್ಹೂಕ್ ರಚಿಸಿ                                       |
| `/api/webhooks/[id]`            | GET    | ವೆಬ್ಹೂಕ್ ವಿವರ (ಸಂಪೂರ್ಣ ರಹಸ್ಯ)                        |
| `/api/webhooks/[id]`            | PUT    | ಕ್ಷೇತ್ರಗಳನ್ನು ನವೀಕರಿಸಿ                               |
| `/api/webhooks/[id]`            | DELETE | ತೆಗೆದುಹಾಕಿ                                           |
| `/api/webhooks/[id]/test`       | POST   | `test.ping` ಅನ್ನು ಹಾರಿಸಿ (ಯಾವುದೇ ಮರುಪ್ರಯತ್ನಗಳಿಲ್ಲ)   |
| `/api/webhooks/[id]/deliveries` | GET    | ಒಂದು ವೆಬ್ಹೂಕ್ಗಾಗಿ ಇತ್ತೀಚಿನ ವಿತರಣಾ ಪ್ರಯತ್ನಗಳು         |
| `/api/webhooks/validate-url`    | POST   | ಪ್ರೀ-ಫ್ಲೈಟ್ URL ಮೌಲ್ಯೀಕರಣ (SSRF ಗಾರ್ಡ್)              |

ಪಟ್ಟಿಯ ಪುಟಗಳಲ್ಲಿ ಸೋರಿಕೆಯಾಗುವುದನ್ನು ತಪ್ಪಿಸಲು`GET /api/webhooks` `<first 10 chars>...` ಗೆ ರಹಸ್ಯವನ್ನು ಮರೆಮಾಡುತ್ತದೆ. ನಿಮಗೆ ನಿಜವಾಗಿಯೂ ರಹಸ್ಯ ಅಗತ್ಯವಿರುವಾಗ `[id]` GET ಬಳಸಿ.

### ವೆಬ್ಹೂಕ್ ರಚಿಸಿ

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

`secret` ಅನ್ನು ಬಿಟ್ಟುಬಿಟ್ಟರೆ, ಸರ್ವರ್ `whsec_<hex>` ರಹಸ್ಯವನ್ನು ಉತ್ಪಾದಿಸುತ್ತದೆ ಮತ್ತು ಅದನ್ನು ಪ್ರತಿಕ್ರಿಯೆಯಲ್ಲಿ ಹಿಂತಿರುಗಿಸುತ್ತದೆ.

### ವೆಬ್ಹುಕ್ ಅನ್ನು ಪರೀಕ್ಷಿಸಿ

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` ಹಿಂತಿರುಗಿಸುತ್ತದೆ. ರಿಸೀವರ್ ಪೇಲೋಡ್ ಮತ್ತು ಸಹಿಯನ್ನು ಸ್ವೀಕರಿಸುತ್ತಾರೆ ಎಂಬುದನ್ನು ತ್ವರಿತವಾಗಿ ಮೌಲ್ಯೀಕರಿಸಲು — ಉಪಯುಕ್ತವಾದ ಯಾವುದೇ ಮರುಪ್ರಯತ್ನಗಳನ್ನು ಪ್ರಯತ್ನಿಸಲಾಗುವುದಿಲ್ಲ.

## ಡ್ಯಾಶ್ಬೋರ್ಡ್

`/dashboard/webhooks` ನಲ್ಲಿನ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಪುಟವು ( `src/app/(dashboard)/dashboard/webhooks/page.tsx` ನೋಡಿ) ಒದಗಿಸುತ್ತದೆ:

- ಈವೆಂಟ್ ಪಿಕರ್ನೊಂದಿಗೆCreate/edit ವೆಬ್ಹೂಕ್ಸ್
- `enabled`, `failure_count`, ಮತ್ತು `last_status` ಆಧರಿಸಿ ಸ್ಥಿತಿ ಸೂಚಕ (ಸಕ್ರಿಯ / ನಿಷ್ಕ್ರಿಯ / ದೋಷಪೂರಿತ)
- ಒಂದು ಕ್ಲಿಕ್ ಪರೀಕ್ಷಾ ವಿತರಣೆ
- ಹಸ್ತಚಾಲಿತ enable/disable ಟಾಗಲ್

## ಪೇಲೋಡ್ ಉದಾಹರಣೆಗಳು

### ಕೋರಿಕೆ.ಪೂರ್ಣಗೊಂಡಿದೆ

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

`test.ping` ಅಲ್ಲದ ಈವೆಂಟ್ಗಳಿಗೆ ಕ್ಷೇತ್ರ ಆಕಾರಗಳನ್ನು ಅವುಗಳನ್ನು ಹೊರಸೂಸುವ ಕರೆ ಸೈಟ್ಗಳಿಂದ ವ್ಯಾಖ್ಯಾನಿಸಲಾಗಿದೆ; `data` ವಸ್ತುವನ್ನು ಫಾರ್ವರ್ಡ್-ಹೊಂದಾಣಿಕೆಯಂತೆ ಪರಿಗಣಿಸಿ (ಕ್ಷೇತ್ರಗಳನ್ನು ಸೇರಿಸಿ, ಅನುಪಸ್ಥಿತಿಯ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿಲ್ಲ).

## ಅತ್ಯುತ್ತಮ ಅಭ್ಯಾಸಗಳು

- **ಪ್ರತಿ ವಿತರಣೆಯಲ್ಲಿ ಸಹಿಯನ್ನು ಪರಿಶೀಲಿಸಿ** ಕಚ್ಚಾ ದೇಹದ ವಿರುದ್ಧ — ನಿಮ್ಮ ವೆಬ್ಹೂಕ್ URL ಅನ್ನು ಊಹಿಸುವ ಯಾರಿಂದಲೂ ವಂಚನೆಯ POSTs ತಡೆಯುತ್ತದೆ.
- **~ 5 ಸೆಕೆಂಡುಗಳಲ್ಲಿ 2xx ಪ್ರತಿಕ್ರಿಯಿಸಿ** — ರವಾನೆದಾರರ ಸಮಯವು 10 ಸೆ. ನಿಧಾನ ರಿಸೀವರ್ಗಳು ಮರುಪ್ರಯತ್ನಗಳನ್ನು ತಿನ್ನುತ್ತವೆ ಮತ್ತು `failure_count` ಹೆಚ್ಚಿಸುತ್ತವೆ.
- **ನಿರ್ವಹಣಾಕಾರರನ್ನು ಅಸಮರ್ಥರನ್ನಾಗಿ ಮಾಡಿ** — ಮರುಪ್ರಯತ್ನಗಳು ಮತ್ತು ಕನಿಷ್ಠ ಒಮ್ಮೆ ಡೆಲಿವರಿ ಸೆಮ್ಯಾಂಟಿಕ್ಸ್ ಎಂದರೆ ನಕಲುಗಳು ಸಾಧ್ಯ.
- **ಕನಿಷ್ಠ ಚಂದಾದಾರರಾಗಿ** — ನೀವು ನಿಜವಾಗಿಯೂ ಸೇವಿಸುವ ಈವೆಂಟ್ಗಳನ್ನು ಮಾತ್ರ ಪಟ್ಟಿ ಮಾಡಿ; ನೀವು ನಿಯಂತ್ರಿಸದ ರಿಸೀವರ್ಗಳ ಮೇಲೆ `"*"` ವೆಚ್ಚವನ್ನು ಸೇರಿಸುತ್ತದೆ.
- **`failure_count` ವೀಕ್ಷಿಸಿ** — ಎಂಡ್ಪಾಯಿಂಟ್ಗಳನ್ನು 10 ಸತತ ವೈಫಲ್ಯಗಳಲ್ಲಿ ಸ್ವಯಂ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ; ರಿಸೀವರ್ ಅನ್ನು ಸರಿಪಡಿಸಿದ ನಂತರ `PUT /api/webhooks/[id]` ಜೊತೆಗೆ `enabled: true` ಗೆ ಕರೆ ಮಾಡುವ ಮೂಲಕ ಮರುಹೊಂದಿಸಿ.
- **ನಿಯತಕಾಲಿಕವಾಗಿ ರಹಸ್ಯಗಳನ್ನು ತಿರುಗಿಸಿ** — `PUT` ಹೊಸ `secret`, ರಿಸೀವರ್ಗೆ ಹೊಸ ಮೌಲ್ಯವನ್ನು ನಿಯೋಜಿಸಿ ಮತ್ತು ಪರೀಕ್ಷಾ ಅಂತಿಮ ಬಿಂದುವಿನ ಮೂಲಕ ದೃಢೀಕರಿಸಿ.

## ಇದನ್ನೂ ನೋಡಿ

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ಪೂರ್ಣ ನಿರ್ವಹಣೆ API ಮೇಲ್ಮೈ
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ಸರ್ಕ್ಯೂಟ್ ಬ್ರೇಕರ್ / ಪೂರೈಕೆದಾರರ ವೈಫಲ್ಯಗಳ ಹಿಂದಿನ ಕೂಲ್ಡೌನ್ ಸೆಮ್ಯಾಂಟಿಕ್ಸ್ `request.failed` ಮೂಲಕ ಹೊರಹೊಮ್ಮಿತು
- ಮೂಲ: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
