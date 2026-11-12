# Webhooks (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Isi mmalite nke eziokwu:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Emelitere ikpeazụ:** 2026-06-28 — v3.8.40

OmniRoute nwere ike gbaa HTTP webhooks na mmemme ikpo okwu. Jiri ha jikọọ na Slack, PagerDuty, Datadog , esịtidem alerting ọrụ, ma ọ bụ ihe ọ bụla HTTP nnata.

Onye na-ezipụ na-edebanye aha nnyefe ọ bụla na HMAC-SHA256, na-emegharị na ọdịda na-adịru nwa oge, na-akwado ahụike nnyefe kwa webhook, na-ewepụkwa njedebe njedebe nke na-aga n'ihu.

## Ihe omume akwadoro

Ụdị `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, nke `src/lib/webhookDispatcher.ts` na-eri) na-emepụta ihe omume asaa ugbu a:

| Ihe omume                 | Ọkụ mgbe                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Arịrịọ proxied mezuru nke ọma                                                                           |
| `request.failed`          | Arịrịọ proxied ada ada ma retries/fallback niile gachara                                                |
| `quota.exceeded`          | Otu igodo API na-agafe ụzọ budget/quota                                                                 |
| `proxy.set_aside`         | A na-ewepụta onye otu ọdọ mmiri proxy ka ọ jụrụ ugboro ugboro (naanị mgbanwe)                           |
| `proxy.pool.exhausted`    | A na-ewepụta onye ọ bụla so na mpaghara proxy ọdọ mmiri                                                 |
| `provider.reset_redeemed` | Ntọgharị ụlọ akụ etinyere na-akpaghị aka gbapụtara kredit nrụpụta ma ọ bụ ntọgharị nnọkọ Claude kwa izu |
| `test.ping`               | Ihe omume sịntetik nke ebe njedebe ule ji                                                               |

Ndebanye aha na-anabata `"*"` nkịtị iji nata mmemme ọ bụla. A na-eleghara aha mmemme amabeghị na `events` anya n'oge izipu.

> Cheta na: API onye na-ezipụ ozi bụ wired, mana saịtị ịkpọ oku maka ụfọdụ mmemme na-abụghị nke `test.ping` ka na-agbadata. Lelee `grep dispatchEvent` ka ịhụ ụzọ ndị na-akpọku onye na-ezipụ ozi ugbu a na ntọhapụ gị.

## Nhazi

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

Nzipu bụ ọkụ-na-echefu maka onye na-akpọ oku: `Promise.allSettled` na-eloda njehie kwa webhook ka otu onye nnata ọjọọ enweghị ike igbochi ndị ọzọ.

## Ịbanye HMAC

Mgbe webhook nwere `secret`, OmniRoute bịanyere aka na ahụ JSON wee zipu:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Aha nkụnye eji isi mee na-eji prefix `X-Webhook-*` (ọ bụghị `X-OmniRoute-*`). Uru mbinye aka bụ `sha256=<hex>` — nyochaa prefix zuru ezu.

Ọ bụrụ na a na-akpọ `createWebhook` na-enweghị ihe nzuzo, modul DB na-emepụta otu (`whsec_<48 hex>`) ya mere a na-edebanye aha webhooks niile na ndabara.

### Na-enyocha na nnata

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Na-enyocha mgbe niile megide ya **raw** Rịọ ahụ, tupu nyocha JSON ọ bụla.

## Nwaagharịa & Iwu ọdịda

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Oge 10 nke abụọ kwa mgbalị (`AbortController`).
- HTTP 2xx gụrụ dị ka ihe ịga nke ọma.
- HTTP 3xx/4xx na-agụ dị ka ọkwa ikpeazụ a na-apụghị ịnwale ya — dekọrọ ka ewepụtara ya na `success = res.ok`.
- A na-anwalegharị HTTP 5xx na mperi netwọk site na nkwụghachi azụ: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Mgbe `maxRetries`, a na-edekọ nnyefe ka ọ dara.
- Nbufe ọ bụla na-emelite `last_triggered_at`, `last_status`, ma megharịa ma ọ bụ nwekwuo `failure_count`.
- Onye na-ezipụ ozi ahụ na-akpọ `disableWebhooksWithHighFailures(10)` ka onye ọ bụla na-apụ apụ, yabụ na-enwe nkwarụ webụ ọ bụla nwere `failure_count >= 10` na-akpaghị aka.

## Ebe nchekwa data

Okpokoro `webhooks` (Mbugharị `011_webhooks.sql`):

| Ogidi               | Ụdị     | Ihe ndetu                                                    |
| ------------------- | ------- | ------------------------------------------------------------ |
| `id`                | TEXT PK | UUID                                                         |
| `url`               | TEXT    | Ebe URL                                                      |
| `events`            | TEXT    | JSON n'usoro; `["*"]` ndabara                                |
| `secret`            | TEXT    | HMAC nzuzo (mepụtara na-akpaghị aka ma ọ bụrụ na enyeghị ya) |
| `enabled`           | INT     | 0/1; ndabara na 1                                            |
| `description`       | TEXT    | akara mmadụ nhọrọ                                            |
| `created_at`        | TEXT    | `datetime('now')`                                            |
| `last_triggered_at` | TEXT    | Emelitere na mbọ mbufe ọ bụla                                |
| `last_status`       | INT     | Ọkwa HTTP nke mbọ ikpeazụ (0 = netwọk)                       |
| `failure_count`     | INT     | Tụgharịa na 0 na ịga nke ọma, + 1 na ọdịda                   |

A na-aga n'ihu na akụkọ nnyefe na tebụl `webhook_deliveries` raara onwe ya nye (mbugharị `069_webhook_deliveries.sql`, nke e dere site na `src/lib/db/webhookDeliveries.ts::insertDelivery` na mgbalị ọ bụla), na mgbakwunye na nchịkọta nchịkọta na ahịrị `webhooks`. `070_webhooks_kind_metadata.sql` gbakwunyere metadata ụdị (Slack / Discord / Telegram / ihe ntụgharị ụgwọ akwụ ụgwọ omenala).

## REST API

Ebe njedebe niile chọrọ nyocha njikwa (`requireManagementAuth`).

| Ebe njedebe                     | Usoro  | Nkọwa                                      |
| ------------------------------- | ------ | ------------------------------------------ |
| `/api/webhooks`                 | GET    | Ndepụta webhooks (ihe nzuzo kpuchie)       |
| `/api/webhooks`                 | POST   | Mepụta nko weebụ                           |
| `/api/webhooks/[id]`            | GET    | Nkọwa Webhook (nzuzo zuru oke)             |
| `/api/webhooks/[id]`            | PUT    | Melite mpaghara                            |
| `/api/webhooks/[id]`            | DELETE | Wepu                                       |
| `/api/webhooks/[id]/test`       | POST   | Gbanyụọ `test.ping` (anaghị emegharị ọzọ)  |
| `/api/webhooks/[id]/deliveries` | GET    | Mgbalị mbufe na nso nso a maka otu webhook |
| `/api/webhooks/validate-url`    | POST   | Nkwado URL tupu ụgbọ elu (onye nche SSRF ) |

`GET /api/webhooks` na-ekpuchi ihe nzuzo dị na `<first 10 chars>...` ka ịzenarị na ibe ndepụta. Jiri `[id]` GET mgbe ịchọrọ nzuzo.

### Mepụta nko weebụ

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

Ọ bụrụ na ewepụrụ `secret`, ihe nkesa na-ewepụta ihe nzuzo `whsec_<hex>` wee weghachi ya na nzaghachi.

### Nwalee nko webụ

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Na-eweghachite `{ delivered, status, error }`. Ọ nweghị nnwale ọzọ a nwara — bara uru maka ịkwado ngwa ngwa na onye nnata na-anabata ibu na mbinye aka.

## Dashboard

Ibe dashboard dị na `/dashboard/webhooks` (lee `src/app/(dashboard)/dashboard/webhooks/page.tsx`) na-enye:

- Create/edit webụ nko na onye na-ahọrọ mmemme
- Ngosipụta ọnọdụ (adịghị arụ ọrụ / adịghị arụ ọrụ / ezighi ezi) dabere na `enabled`, `failure_count`, na `last_status`
- Otu-pịa nnyefe ule
- Ntụgharị enable/disable akwụkwọ ntuziaka

## Ọmụmaatụ ịkwụ ụgwọ

### arịrịọ.mechara

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

### nwale.ping

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

A na-akọwapụta ụdị mpaghara maka mmemme na-abụghị nke `test.ping` site na saịtị oku na-ebupụta ha; na-emeso ihe `data` dị ka ihe na-aga n'ihu (tinye ubi, adaberela na enweghị).

## Omume kacha mma

- **Nyochaa mbinye aka na nnyefe ọ bụla** megide ahụ raw — na-egbochi POSTs spoofed site na onye ọ bụla na-eche gị webhook URL.
- **Zaa 2xx n'ime nkeji ~ 5** — oge izipu ga-apụta na 10s. Ndị na-anata ngwa ngwa ga-erigharị ma fesaa `failure_count`.
- **Mee ka ndị na-elekọta ya nwee ike** Nnwale — na ntụgharị akwụkwọ ozi opekata mpe-opekata mpe, ọ ga-ekwe omume.
- **Debanye aha obere** — depụta naanị ihe omume ị na-eri; `"*"` ga-agbakwunye ego na ndị nnata ị naghị ejikwa.
- **Lelee `failure_count`** A na-agbanyụ ngwụcha ngwụcha — na ọdịda 10 n'usoro; Tọgharia site na ịkpọ `PUT /api/webhooks/[id]` na `enabled: true` mgbe edozichara onye nnata.
- **Na-atụgharị ihe nzuzo kwa oge** — `PUT` ọhụrụ `secret`, tinye uru ọhụrụ na onye nnata, ma kwadoro site na njedebe ule.

## Hụkwa

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — zuru njikwa API elu
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — sekit breaker / cooldown semantics n'azụ ọdịda ndị na-eweta ọdịda pụtara site na `request.failed`
- Isi mmalite: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
