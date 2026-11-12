# Webhooks (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Chanzo cha ukweli:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Mara ya mwisho kusasishwa:** 2026-06-28 — v3.8.40

OmniRoute inaweza kurusha vijiti vya wavuti HTTP kwenye hafla za jukwaa. Zitumie kuunganishwa na Slack, PagerDuty, Datadog, huduma za arifa za ndani, au kipokezi chochote cha HTTP.

Mtumaji hutia sahihi kila uwasilishaji kwa HMAC-SHA256, hujaribu tena kushindwa kwa muda mfupi, hufuatilia afya ya uwasilishaji kwa kila mtandao, na kuzima kiotomatiki vituo vinavyoendelea kutofaulu.

## Matukio Yanayotumika

Aina ya `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, inayotumiwa na `src/lib/webhookDispatcher.ts`) kwa sasa ni mifano ya matukio saba:

| Tukio                     | Moto wakati                                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `request.completed`       | Ombi la proksi linakamilika kwa mafanikio                                                                                            |
| `request.failed`          | Ombi la wakala halifaulu baada ya retries/fallback yote                                                                              |
| `quota.exceeded`          | Kitufe cha API kinavuka kizingiti cha budget/quota                                                                                   |
| `proxy.set_aside`         | Mwanachama wa hifadhi ya wakala huwekwa kando baada ya kukataa mara kwa mara (mpito pekee)                                           |
| `proxy.pool.exhausted`    | Kila mwanachama wa wigo wa bwawa la wakala ametengwa                                                                                 |
| `provider.reset_redeemed` | Kutuma otomatiki uwekaji upya uliowekwa kwenye benki kumekomboa mkopo uliowekwa upya au uwekaji upya wa kipindi cha kila wiki Claude |
| `test.ping`               | Tukio la usanifu linalotumiwa na sehemu ya mwisho ya jaribio                                                                         |

Usajili unakubali `"*"` halisi ili kupokea kila tukio. Majina ya matukio yasiyojulikana katika `events` yanapuuzwa wakati wa kutuma.

> Kumbuka: kisambazaji API kimeunganishwa, lakini tovuti za simu za uzalishaji kwa baadhi ya matukio yasiyo ya `test.ping` bado zinatua. Angalia `grep dispatchEvent` ili kuona ni njia zipi zinazoomba mtumaji kwa sasa katika toleo lako.

## Usanifu

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

Utumaji ni moto-na-kusahau kwa mpigaji simu: `Promise.allSettled` humeza makosa ya kila-webhook ili mpokeaji mmoja mbaya asiweze kuzuia wengine.

## Kusainiwa HMAC

Wakati webhook ina `secret`, OmniRoute hutia sahihi mwili wa JSON na kutuma:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Majina ya vichwa hutumia kiambishi awali cha `X-Webhook-*` (sio `X-OmniRoute-*`). Thamani ya sahihi ni `sha256=<hex>` — thibitisha kiambishi awali kamili.

Ikiwa `createWebhook` inaitwa bila siri, moduli ya DB inazalisha moja (`whsec_<48 hex>`) hivyo vijiti vyote vya wavuti vinatiwa saini kwa chaguo-msingi.

### Inathibitisha kwenye mpokeaji

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Daima thibitisha dhidi ya **mbichi** ombi la mwili, kabla ya uchanganuzi wowote JSON.

## Sera ya Kujaribu tena na Kushindwa

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Muda wa kuisha kwa sekunde 10 kwa kila jaribio (`AbortController`).
- HTTP 2xx inahesabiwa kuwa mafanikio.
- HTTP 3xx/4xx inahesabiwa kama hali ya mwisho isiyoweza kujaribu tena — iliyorekodiwa kama ilivyowasilishwa kwa `success = res.ok`.
- HTTP 5xx na hitilafu za mtandao zinajaribiwa tena kwa urejesho wa kielelezo: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Baada ya `maxRetries`, uwasilishaji unarekodiwa kama umeshindwa.
- Kila utoaji husasisha `last_triggered_at`, `last_status`, na ama kuweka upya au kuongeza `failure_count`.
- Kisambazaji huita `disableWebhooksWithHighFailures(10)` baada ya kila feni kuisha, kwa hivyo mtandao wowote wenye `failure_count >= 10` huzimwa kiotomatiki.

## Hifadhidata

Jedwali `webhooks` ( `011_webhooks.sql` ya uhamiaji ):

| Safu                | Aina    | Vidokezo                                                    |
| ------------------- | ------- | ----------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                        |
| `url`               | TEXT    | Marudio ya URL                                              |
| `events`            | TEXT    | safu ya JSON ; `["*"]` chaguo-msingi                        |
| `secret`            | TEXT    | Siri ya HMAC (inayozalishwa otomatiki ikiwa haijatolewa)    |
| `enabled`           | INT     | 0/1; chaguo-msingi kwa 1                                    |
| `description`       | TEXT    | Lebo ya hiari ya binadamu                                   |
| `created_at`        | TEXT    | `datetime('now')`                                           |
| `last_triggered_at` | TEXT    | Inasasishwa kwa kila jaribio la uwasilishaji                |
| `last_status`       | INT     | Hali ya HTTP ya jaribio la mwisho (mtandao = 0)             |
| `failure_count`     | INT     | Huweka upya hadi 0 kwenye mafanikio, + 1 baada ya kutofaulu |

Historia ya uwasilishaji imeendelezwa katika jedwali maalum la `webhook_deliveries` (uhamiaji `069_webhook_deliveries.sql`, iliyoandikwa kupitia `src/lib/db/webhookDeliveries.ts::insertDelivery` kwa kila jaribio), pamoja na vihesabio vya jumla kwenye safu mlalo `webhooks`. Metadata ya aina (Slack / Discord / Telegram / transfoma maalum ya upakiaji) iliongezwa na `070_webhooks_kind_metadata.sql`.

## REST API

Miisho yote inahitaji uthibitisho wa usimamizi (`requireManagementAuth`).

| Mwisho                          | Mbinu  | Maelezo                                                               |
| ------------------------------- | ------ | --------------------------------------------------------------------- |
| `/api/webhooks`                 | GET    | Orodhesha vijiti vya wavuti (siri zilizofichwa)                       |
| `/api/webhooks`                 | POST   | Unda kitabu cha wavuti                                                |
| `/api/webhooks/[id]`            | GET    | Maelezo ya wavuti (siri kamili)                                       |
| `/api/webhooks/[id]`            | PUT    | Sasisha sehemu                                                        |
| `/api/webhooks/[id]`            | DELETE | Ondoa                                                                 |
| `/api/webhooks/[id]/test`       | POST   | Zima `test.ping` (hakuna majaribio tena)                              |
| `/api/webhooks/[id]/deliveries` | GET    | Majaribio ya hivi majuzi ya uwasilishaji kwa kitabu kimoja cha wavuti |
| `/api/webhooks/validate-url`    | POST   | Uthibitishaji wa URL kabla ya safari ya ndege (SSRF guard)            |

`GET /api/webhooks` inaficha siri ya `<first 10 chars>...` ili kuepuka kuvuja kwenye kurasa za kuorodhesha. Tumia `[id]` GET wakati unahitaji siri.

### Unda kitabu cha wavuti

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

Ikiwa `secret` itaachwa, seva hutoa siri `whsec_<hex>` na kuirudisha katika jibu.

### Mtihani webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Hurejesha `{ delivered, status, error }`. Hakuna majaribio tena yanayojaribiwa — muhimu kwa kuthibitisha kwa haraka kwamba mpokeaji anakubali mzigo wa malipo na saini.

## Dashibodi

Ukurasa wa dashibodi katika `/dashboard/webhooks` (tazama `src/app/(dashboard)/dashboard/webhooks/page.tsx`) hutoa:

- Create/edit inashirikiana na kiteua tukio
- Kiashiria cha hali (inafanya kazi / haifanyi kazi / ina makosa) kulingana na `enabled`, `failure_count`, na `last_status`
- Uwasilishaji wa jaribio la kubofya mara moja
- Kugeuza enable/disable kwa mikono

## Mifano ya Upakiaji

### ombi.limekamilika

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

### mtihani.ping

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

Maumbo ya uwanja kwa matukio yasiyo ya `test.ping` yanafafanuliwa na tovuti za simu zinazozitoa; chukulia kitu cha `data` kama kinachoendana mbele (ongeza uwanja, usitegemee kutokuwepo).

## Mazoea Bora

- **Thibitisha saini kwenye kila usafirishaji** dhidi ya mwili mbichi — huzuia POSTs potofu kutoka kwa mtu yeyote anayekisia URL yako ya wavuti.
- **Jibu 2xx ndani ya ~ sekunde 5** — mtumaji anatoka nje kwa sekunde 10. Wapokezi wa polepole watakula majaribio tena na kuongeza `failure_count`.
- **Wafanye washikaji wasiwe na uwezo** — inajaribu tena na semantiki za uwasilishaji angalau mara moja inamaanisha kuwa nakala zinawezekana.
- **Jisajili kwa uchache** — orodhesha matukio tu unayotumia; `"*"` itaongeza gharama kwa vipokezi usivyovidhibiti.
- **Tazama `failure_count`** Vituo vya mwisho — vimezimwa kiotomatiki kwa kushindwa mara 10 mfululizo; weka upya kwa kupiga `PUT /api/webhooks/[id]` na `enabled: true` baada ya kurekebisha mpokeaji.
- **Zungusha siri mara kwa mara** — `PUT` `secret` mpya, peleka thamani mpya kwa mpokeaji, na uthibitishe kupitia sehemu ya mwisho ya jaribio.

## Tazama Pia

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — usimamizi kamili uso wa API
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — kivunja mzunguko / semantiki za kupoeza nyuma ya hitilafu za mtoa huduma zilijitokeza kupitia `request.failed`
- Chanzo: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
