# Webhooks (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Pinagmulan ng katotohanan:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Huling na-update:** 2026-06-28 — v3.8.40

Maaaring magpagana OmniRoute ng mga webhook HTTP sa mga kaganapan sa platform. Gamitin ang mga ito upang isama sa Slack, PagerDuty, Datadog, panloob na mga serbisyo sa pag-aalerto, o anumang HTTP receiver.

Pipirmahan ng dispatcher ang bawat paghahatid gamit ang HMAC-SHA256, muling sumusubok sa mga lumilipas na pagkabigo, sinusubaybayan ang kalusugan ng paghahatid sa bawat webhook, at awtomatikong hindi pinapagana ang mga endpoint na patuloy na nabigo.

## Mga Sinusuportahang Kaganapan

Ang uri ng `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, ginagamit ng `src/lib/webhookDispatcher.ts`) ay kasalukuyang nagmomodelo ng pitong kaganapan:

| Kaganapan                 | Sunog kapag                                                                                                          |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Matagumpay na nakumpleto ang isang proxy na kahilingan                                                               |
| `request.failed`          | Nabigo ang isang proxy na kahilingan pagkatapos ng lahat ng retries/fallback                                         |
| `quota.exceeded`          | Ang isang API key ay tumatawid sa isang budget/quota threshold                                                       |
| `proxy.set_aside`         | Ang isang miyembro ng proxy pool ay isinantabi pagkatapos ng paulit-ulit na pagtanggi (transition lang)              |
| `proxy.pool.exhausted`    | Ang bawat miyembro ng saklaw ng proxy pool ay inilalaan                                                              |
| `provider.reset_redeemed` | Ang awtomatikong pag-apply ng mga banked reset ay nag-redeem ng isang reset credit o ang Claude weekly session reset |
| `test.ping`               | Sintetikong kaganapan na ginagamit ng endpoint ng pagsubok                                                           |

Tinatanggap ng mga subscription ang literal `"*"` upang matanggap ang bawat kaganapan. Ang mga hindi kilalang pangalan ng kaganapan sa `events` ay binabalewala sa oras ng pagpapadala.

> Tandaan: ang dispatcher API ay naka-wire, ngunit ang mga production call site para sa ilan sa mga hindi `test.ping` na kaganapan ay lumalapag pa rin. Suriin `grep dispatchEvent` upang makita kung aling mga path ang kasalukuyang humihimok sa dispatcher sa iyong release.

## Arkitektura

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

Ang dispatch ay fire-and-forget para sa tumatawag: Nilulunok `Promise.allSettled` ang mga error sa bawat webhook kaya hindi ma-block ng isang masamang receiver ang iba.

## Pagpirma ng HMAC

Kapag ang isang webhook ay may `secret`, pinipirmahan ng OmniRoute ang katawan JSON at ipinapadala ang:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Ginagamit ng mga pangalan ng header ang prefix `X-Webhook-*` (hindi `X-OmniRoute-*`). Ang signature value ay `sha256=<hex>` — i-verify ang buong prefix.

Kung `createWebhook` ay tinatawag na walang lihim, ang DB module ay bubuo ng isa (`whsec_<48 hex>`) kaya lahat ng webhooks ay nilagdaan bilang default.

### Pag-verify sa receiver

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Palaging i-verify laban sa **hilaw** humiling ng katawan, bago ang anumang pag-parse ng JSON.

## Subukan muli at Patakaran sa Pagkabigo

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 segundong timeout bawat pagsubok (`AbortController`).
- HTTP 2xx ay binibilang bilang tagumpay.
- Binibilang ang HTTP 3xx/4xx bilang isang hindi nasusubukang panghuling katayuan na naitala ng — bilang naihatid sa `success = res.ok`.
- HTTP 5xx at mga error sa network ay muling sinusubukang may exponential backoff: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Pagkatapos ng `maxRetries`, ang paghahatid ay naitala bilang nabigo.
- Ang bawat paghahatid ay nag-a-update ng `last_triggered_at`, `last_status`, at alinman sa pag-reset o pagtaas `failure_count`.
- Ang dispatcher ay tumatawag sa `disableWebhooksWithHighFailures(10)` pagkatapos ng bawat fan-out, kaya ang anumang webhook na may `failure_count >= 10` ay awtomatikong hindi pinagana.

## Database

Talahanayan `webhooks` (migration `011_webhooks.sql`):

| Kolum               | Uri     | Mga Tala                                             |
| ------------------- | ------- | ---------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                 |
| `url`               | TEXT    | Patutunguhan URL                                     |
| `events`            | TEXT    | hanay JSON ; default `["*"]`                         |
| `secret`            | TEXT    | HMAC secret (awtomatikong nabuo kung hindi ibinigay) |
| `enabled`           | INT     | 0/1; default sa 1                                    |
| `description`       | TEXT    | Opsyonal na label ng tao                             |
| `created_at`        | TEXT    | `datetime('now')`                                    |
| `last_triggered_at` | TEXT    | Na-update sa bawat pagtatangka sa paghahatid         |
| `last_status`       | INT     | HTTP status ng huling pagtatangka (0 = network)      |
| `failure_count`     | INT     | Ni-reset sa 0 sa tagumpay, + 1 sa pagkabigo          |

Ang kasaysayan ng paghahatid ay nananatili sa nakalaang `webhook_deliveries` table (migration `069_webhook_deliveries.sql`, nakasulat sa pamamagitan ng `src/lib/db/webhookDeliveries.ts::insertDelivery` sa bawat pagsubok), bilang karagdagan sa mga pinagsama-samang counter sa `webhooks` row. Ang uri ng metadata (Slack / Discord / Telegram / custom na payload transformer) ay idinagdag ng `070_webhooks_kind_metadata.sql`.

## REST API

Ang lahat ng endpoint ay nangangailangan ng management auth (`requireManagementAuth`).

| Endpoint                        | Pamamaraan | Paglalarawan                                                    |
| ------------------------------- | ---------- | --------------------------------------------------------------- |
| `/api/webhooks`                 | GET        | Maglista ng mga webhook (nakamaskara ang mga lihim)             |
| `/api/webhooks`                 | POST       | Lumikha ng webhook                                              |
| `/api/webhooks/[id]`            | GET        | Detalye ng webhook (buong sikreto)                              |
| `/api/webhooks/[id]`            | PUT        | I-update ang mga field                                          |
| `/api/webhooks/[id]`            | DELETE     | Alisin                                                          |
| `/api/webhooks/[id]/test`       | POST       | Paganahin ang isang `test.ping` (walang muling pagsubok)        |
| `/api/webhooks/[id]/deliveries` | GET        | Kamakailang mga pagtatangka sa paghahatid para sa isang webhook |
| `/api/webhooks/validate-url`    | POST       | Pre-flight URL validation (SSRF guard)                          |

Tinatakpan `GET /api/webhooks` ang sikreto sa `<first 10 chars>...` upang maiwasan ang pagtulo sa mga pahina ng listahan. Gamitin ang `[id]` GET kapag talagang kailangan mo ang sikreto.

### Lumikha ng webhook

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

Kung aalisin ang `secret`, bubuo ang server ng lihim `whsec_<hex>` at ibabalik ito sa tugon.

### Subukan ang webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Ibinabalik ang `{ delivered, status, error }`. Walang muling pagsubok na tinangka — na kapaki-pakinabang para sa mabilis na pagpapatunay na tinatanggap ng receiver ang payload at lagda.

## Dashboard

Ang pahina ng dashboard sa `/dashboard/webhooks` (tingnan `src/app/(dashboard)/dashboard/webhooks/page.tsx`) ay nagbibigay ng:

- Mga webhook Create/edit na may tagapili ng kaganapan
- Status indicator (aktibo / hindi aktibo / nagkamali) batay sa `enabled`, `failure_count`, at `last_status`
- Isang-click na pagsubok na paghahatid
- Manu-manong enable/disable toggle

## Mga Halimbawa ng Payload

### kahilingan.nakumpleto

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

### pagsubok.ping

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

Ang mga hugis ng field para sa mga kaganapang hindi `test.ping` ay tinutukoy ng mga site ng tawag na naglalabas ng mga ito; ituring ang `data` object bilang forward-compatible (magdagdag ng mga field, huwag umasa sa kawalan).

## Pinakamahusay na Kasanayan

- **I-verify ang lagda sa bawat paghahatid** laban sa hilaw na katawan pinipigilan ng — ang spoofed POSTs mula sa sinumang mahulaan ang iyong webhook URL.
- **Tumugon ng 2xx sa loob ng ~ 5 segundo** — ang dispatcher ay nag-time out sa 10 s. Ang mga mabagal na receiver ay kakain ng mga muling pagsubok at magpapalaki `failure_count`.
- **Gawing idempotent ang mga humahawak** Ang mga muling pagsubok — at hindi bababa sa isang beses na delivery semantics ay nangangahulugang posible ang mga duplicate.
- **Mag-subscribe nang kaunti** — ay naglilista lamang ng mga kaganapan na aktwal mong kinokonsumo; Magdaragdag `"*"` ng gastos sa mga receiver na hindi mo kontrolado.
- **Manood ng `failure_count`** Ang mga endpoint — ay awtomatikong hindi pinagana sa 10 magkakasunod na pagkabigo; i-reset sa pamamagitan ng pagtawag `PUT /api/webhooks/[id]` sa `enabled: true` pagkatapos ayusin ang receiver.
- **Paikutin ang mga lihim nang pana-panahon** — `PUT` isang bagong `secret`, i-deploy ang bagong value sa receiver, at kumpirmahin sa pamamagitan ng test endpoint.

## Tingnan din

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — full management API surface
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — circuit breaker / cooldown semantics sa likod ng mga pagkabigo ng provider na lumabas sa pamamagitan ng `request.failed`
- Pinagmulan: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
