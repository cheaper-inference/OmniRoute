# Webhooks (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Orisun otitọ:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Imudojuiwọn to kẹhin:** 2026-06-28 — v3.8.40

OmniRoute le ina HTTP webhooks lori awọn iṣẹlẹ Syeed. Lo wọn lati ṣepọ pẹlu Slack, PagerDuty, Datadog, awọn iṣẹ titaniji inu, tabi eyikeyi olugba HTTP.

Awọn dispatcher ami kọọkan ifijiṣẹ pẹlu HMAC-SHA256, retries on transient ikuna, orin ilera ifijiṣẹ fun webhook, ati auto-disables endpoints ti o pa aise.

## Awọn iṣẹlẹ atilẹyin

Iru `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, ti o jẹ nipasẹ `src/lib/webhookDispatcher.ts`) lọwọlọwọ ṣe apẹẹrẹ awọn iṣẹlẹ meje:

| Iṣẹlẹ                     | Ina nigbati                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| `request.completed`       | Ibere asoju kan pari ni aṣeyọri                                                             |
| `request.failed`          | Ibeere aṣoju kuna lẹhin gbogbo retries/fallback                                             |
| `quota.exceeded`          | Bọtini API kan kọja iloro budget/quota kan                                                  |
| `proxy.set_aside`         | Ọmọ ẹgbẹ adagun-aṣoju kan ti ya sọtọ lẹhin awọn ijusilẹ leralera (iyipada nikan)            |
| `proxy.pool.exhausted`    | Gbogbo ọmọ ẹgbẹ ti aaye adagun aṣoju aṣoju ti ṣeto si apakan                                |
| `provider.reset_redeemed` | Awọn atunto ile-ifowo lo ni aifọwọyi ṣe irapada kirẹditi atunto tabi atunto igba ọsẹ Claude |
| `test.ping`               | Iṣẹlẹ sintetiki lo nipasẹ aaye ipari idanwo                                                 |

Awọn iforukọsilẹ gba `"*"` gangan lati gba gbogbo iṣẹlẹ. Awọn orukọ iṣẹlẹ ti a ko mọ ni `events` ni a kọbikita ni akoko fifiranṣẹ.

> Akiyesi: Olufiranṣẹ API ti firanṣẹ, ṣugbọn awọn aaye ipe iṣelọpọ fun diẹ ninu awọn iṣẹlẹ ti kii ṣe `test.ping` tun wa ni ibalẹ. Ṣayẹwo `grep dispatchEvent` lati rii iru awọn ipa-ọna ti o pe olufiranṣẹ lọwọlọwọ ninu itusilẹ rẹ.

## Faaji

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

Dispatch jẹ ina-ati-igbagbe fun olupe: `Promise.allSettled` gbe awọn aṣiṣe webhook mì nitoribẹẹ olugba buburu ko le di awọn miiran duro.

## Ibuwọlu HMAC

Nigbati kio wẹẹbu kan ba ni `secret`, OmniRoute ṣe ami si ara JSON ati firanṣẹ:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Awọn orukọ akọsori lo ìpele `X-Webhook-*` (kii ṣe `X-OmniRoute-*`). Iye Ibuwọlu jẹ `sha256=<hex>` — ṣe idaniloju ìpele kikun.

Ti a ba pe `createWebhook` laisi aṣiri, module DB n ṣe agbejade ọkan (`whsec_<48 hex>`) nitorinaa gbogbo awọn oju opo wẹẹbu ti fowo si nipasẹ aiyipada.

### Ijẹrisi lori olugba

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Nigbagbogbo daju lodi si awọn **aise** ara beere, ṣaaju ṣiṣe itupalẹ JSON eyikeyi.

## Tun gbiyanju & Ilana Ikuna

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 akoko akoko keji fun igbiyanju (`AbortController`).
- HTTP 2xx ka bi aṣeyọri.
- HTTP 3xx/4xx ṣe iṣiro bi ipo ikẹhin ti kii ṣe atunwi — ti o gbasilẹ bi jiṣẹ pẹlu `success = res.ok`.
- HTTP 5xx ati awọn aṣiṣe nẹtiwọọki ni a tun gbiyanju pẹlu ifẹhinti ipari: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Lẹhin `maxRetries`, ifijiṣẹ ti wa ni igbasilẹ bi kuna.
- Ifijiṣẹ kọọkan ṣe imudojuiwọn `last_triggered_at`, `last_status`, ati boya tunto tabi awọn afikun `failure_count`.
- Olupin naa n pe `disableWebhooksWithHighFailures(10)` lẹhin igbafẹfẹ kọọkan, nitorinaa eyikeyi webhook pẹlu `failure_count >= 10` jẹ alaabo laifọwọyi.

## Aaye data

Tabili `webhooks` (Iṣikiri `011_webhooks.sql`):

| Àwọ̀n                | Iru     | Awọn akọsilẹ                                   |
| ------------------- | ------- | ---------------------------------------------- |
| `id`                | TEXT PK | UUID                                           |
| `url`               | TEXT    | Ibugbe URL                                     |
| `events`            | TEXT    | Eto JSON ; aiyipada `["*"]`                    |
| `secret`            | TEXT    | Aṣiri HMAC (ti ipilẹṣẹ laifọwọyi ti ko ba fun) |
| `enabled`           | INT     | 0/1; aipe si 1                                 |
| `description`       | TEXT    | Iyan eniyan aami                               |
| `created_at`        | TEXT    | `datetime('now')`                              |
| `last_triggered_at` | TEXT    | Imudojuiwọn lori gbogbo igbiyanju ifijiṣẹ      |
| `last_status`       | INT     | Ipo HTTP ti igbiyanju kẹhin (0 = nẹtiwọki)     |
| `failure_count`     | INT     | Tunto si 0 lori aṣeyọri, + 1 lori ikuna        |

Itan ifijiṣẹ wa ni iduro ni tabili iyasọtọ `webhook_deliveries` (ijira `069_webhook_deliveries.sql`, ti a kọ nipasẹ `src/lib/db/webhookDeliveries.ts::insertDelivery` lori gbogbo igbiyanju), ni afikun si awọn iṣiro apapọ lori ila `webhooks`. Awọn metadata oninuure (Slack / Discord / Telegram / awọn oluyipada isanwo isanwo aṣa) jẹ afikun nipasẹ `070_webhooks_kind_metadata.sql`.

## REST API

Gbogbo awọn aaye ipari nilo ijẹrisi iṣakoso (`requireManagementAuth`).

| Opin ojuami                     | Ọna    | Apejuwe                                                |
| ------------------------------- | ------ | ------------------------------------------------------ |
| `/api/webhooks`                 | GET    | Ṣe atokọ awọn kio wẹẹbu (awọn aṣiri ti a boju)         |
| `/api/webhooks`                 | POST   | Ṣẹda webhook                                           |
| `/api/webhooks/[id]`            | GET    | Awọn alaye Webhook (aṣiri kikun)                       |
| `/api/webhooks/[id]`            | PUT    | Awọn aaye imudojuiwọn                                  |
| `/api/webhooks/[id]`            | DELETE | Yọ kuro                                                |
| `/api/webhooks/[id]/test`       | POST   | Ina kan `test.ping` (ko si awọn atunwo)                |
| `/api/webhooks/[id]/deliveries` | GET    | Awọn igbiyanju ifijiṣẹ aipẹ fun webhook kan            |
| `/api/webhooks/validate-url`    | POST   | Ifọwọsi URL ti ọkọ ofurufu ṣaaju-ofurufu (oluṣọ SSRF ) |

`GET /api/webhooks` bo aṣiri si `<first 10 chars>...` lati yago fun jijo lori awọn oju-iwe atokọ. Lo `[id]` GET nigba ti o ba nilo aṣiri gangan.

### Ṣẹda webhook

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

Ti o ba jẹ pe `secret` ti yọkuro, olupin naa ṣe ipilẹṣẹ aṣiri `whsec_<hex>` kan ati da pada ni idahun.

### Idanwo webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Pada `{ delivered, status, error }`. Ko si awọn igbiyanju igbiyanju — ti o wulo fun idaniloju ni kiakia pe olugba gba fifuye isanwo ati ibuwọlu.

## Dasibodu

Oju-iwe dasibodu ni `/dashboard/webhooks` (wo `src/app/(dashboard)/dashboard/webhooks/page.tsx`) pese:

- Create/edit webhooks pẹlu ohun iṣẹlẹ picker
- Atọka ipo (lọwọ / aiṣiṣẹ / aṣiṣe) da lori `enabled`, `failure_count`, ati `last_status`
- Ọkan-tẹ igbeyewo ifijiṣẹ
- Afọwọṣe enable/disable toggle

## Payload Apeere

### ìbéèrè.pari

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

### idanwo.ping

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

Awọn apẹrẹ aaye fun awọn iṣẹlẹ ti kii ṣe `test.ping` jẹ asọye nipasẹ awọn aaye ipe ti o jade wọn; tọju nkan `data` bi ibaramu siwaju (fi awọn aaye kun, maṣe dale lori isansa).

## Awọn iṣe ti o dara julọ

- **Daju awọn Ibuwọlu lori gbogbo ifijiṣẹ** lodi si awọn aise body — idilọwọ awọn spoofed POSTs lati ẹnikẹni ti o gboju rẹ webhook URL.
- **Dahun 2xx laarin ~ 5 iṣẹju-aaya** — awọn dispatcher igba jade ni 10 s. Awọn olugba ti o lọra yoo jẹ awọn igbiyanju ati fifun `failure_count`.
- **Ṣe awọn olutọju ara lagbara** Awọn igbiyanju — ati awọn itumọ-itumọ ifijiṣẹ ni o kere ju-ẹẹkan tumọ si awọn ẹda-ẹda jẹ ṣeeṣe.
- **Alabapin iwonba** — ṣe atokọ awọn iṣẹlẹ nikan ti o jẹ gangan; `"*"` yoo ṣafikun iye owo lori awọn olugba ti o ko ṣakoso.
- **Wo `failure_count`** Awọn aaye ipari — jẹ alaabo-laifọwọyi ni awọn ikuna itẹlera 10; tunto nipa pipe `PUT /api/webhooks/[id]` pẹlu `enabled: true` lẹhin titunṣe olugba.
- **Yi awọn asiri lorekore** — `PUT` a titun `secret`, ran awọn titun iye si awọn olugba, ki o si jẹrisi nipasẹ awọn igbeyewo opin ojuami.

## Wo Tun

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — kikun isakoso API dada
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — Circuit fifọ / atunmọ itutu lẹhin awọn ikuna olupese ti farahan nipasẹ `request.failed`
- Orisun: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
