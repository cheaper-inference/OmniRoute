# Webhooks (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Ճշմարտության աղբյուրը.** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Վերջին թարմացումը՝** 2026-06-28 — v3.8.40

OmniRoute կարող է գործարկել HTTP վեբ-կեռիկներ հարթակի իրադարձությունների վրա: Օգտագործեք դրանք Slack, PagerDuty, Datadog-ի, ներքին ահազանգման ծառայությունների կամ ցանկացած HTTP ընդունիչի հետ ինտեգրվելու համար:

Դիսպետչերը ստորագրում է յուրաքանչյուր առաքում HMAC-SHA256 ով, կրկնում է անցողիկ խափանումները, հետևում է առաքման առողջությանը յուրաքանչյուր վեբ-կապիկի համար և ավտոմատ անջատում է վերջնակետերը, որոնք անընդհատ ձախողվում են:

## Աջակցվող իրադարձություններ

`WebhookEvent` տեսակը (`src/lib/webhooks/eventDescriptions.ts`, սպառված `src/lib/webhookDispatcher.ts` ի կողմից) ներկայումս մոդելավորում է յոթ իրադարձություն.

| Իրադարձություն            | Հրդեհներ, երբ                                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Վստահված հարցումը հաջողությամբ ավարտվում է                                                                    |
| `request.failed`          | Վստահված հարցումը ձախողվում է բոլոր retries/fallback հետո                                                     |
| `quota.exceeded`          | API բանալին անցնում է budget/quota շեմը                                                                       |
| `proxy.set_aside`         | Վստահված խմբի անդամը մի կողմ է դրվում կրկնակի մերժումներից հետո (միայն անցումային)                            |
| `proxy.pool.exhausted`    | Վստահված անձի լողավազանի շրջանակի յուրաքանչյուր անդամ մի կողմ է դրված                                         |
| `provider.reset_redeemed` | Ավտոմատ կիրառման բանկային վերակայումները մարեցին վերակայված վարկը կամ Claude շաբաթական նստաշրջանի վերակայումը |
| `test.ping`               | Սինթետիկ իրադարձություն, որն օգտագործվում է թեստի վերջնակետի կողմից                                           |

Բաժանորդագրություններն ընդունում են բառացի `"*"` յուրաքանչյուր իրադարձություն ստանալու համար: Իրադարձությունների անհայտ անունները `events` ում անտեսվում են առաքման ժամանակ:

> Նշում. API դիսպետչերը միացված է, բայց ոչ `test.ping` իրադարձությունների արտադրական զանգերի կայքերը դեռևս վայրէջք են կատարում: Ստուգեք `grep dispatchEvent` ՝ տեսնելու, թե որ ուղիներն են ներկայումս կանչում դիսպետչերին ձեր թողարկման մեջ:

## Ճարտարապետություն

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

Զանգահարողի համար ուղարկումը աննշան է և մոռացվում է. `Promise.allSettled` կուլ է տալիս յուրաքանչյուր վեբ-կապիկի սխալները, այնպես որ մի վատ ընդունիչը չի կարող արգելափակել մյուսներին:

## HMAC ստորագրում

Երբ webhook-ն ունի `secret`, OmniRoute ստորագրում է JSON մարմինը և ուղարկում.

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Վերնագրերի անուններն օգտագործում են `X-Webhook-*` նախածանցը (ոչ `X-OmniRoute-*`): Ստորագրության արժեքը `sha256=<hex>` — է, ստուգեք ամբողջական նախածանցը:

Եթե `createWebhook` կանչվում է առանց գաղտնիքի, DB մոդուլը ստեղծում է մեկը (`whsec_<48 hex>`), այնպես որ բոլոր վեբ-կեռիկներն ստորագրված են լռելյայնորեն:

### Ստուգում ստացողի վրա

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Միշտ ստուգեք ընդդեմ **հում** հարցման մարմինը, նախքան JSON ցանկացած վերլուծություն:

## Կրկին փորձեր և ձախողման քաղաքականություն

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 վայրկյան թայմաութ յուրաքանչյուր փորձից (`AbortController`):
- HTTP 2xx-ը համարվում է հաջողություն:
- HTTP 3xx/4xx հաշվվում է որպես — չվերափորձվող վերջնական կարգավիճակ, որը գրանցված է որպես `success = res.ok` ով առաքված:
- HTTP 5xx և ցանցային սխալները կրկին փորձարկվում են էքսպոնենցիալ հետընթացով. `2^attempt * 1000 ms` (1s, 2s, 4s):
- `maxRetries` ից հետո առաքումը գրանցվում է որպես ձախողված:
- Յուրաքանչյուր առաքում թարմացնում է `last_triggered_at`, `last_status` և կամ վերակայում կամ ավելացնում է `failure_count`:
- Դիսպետչերը կանչում է `disableWebhooksWithHighFailures(10)` յուրաքանչյուր օդափոխումից հետո, ուստի `failure_count >= 10` ով ցանկացած վեբ-կեռիկ ավտոմատ անջատվում է:

## Տվյալների բազա

Աղյուսակ `webhooks` (միգրացիոն `011_webhooks.sql`):

| Սյունակ             | Տեսակ   | Նշումներ                                                    |
| ------------------- | ------- | ----------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                        |
| `url`               | TEXT    | Նպատակակետ URL                                              |
| `events`            | TEXT    | JSON զանգված; լռելյայն `["*"]`                              |
| `secret`            | TEXT    | HMAC գաղտնիք (ավտոմատ ստեղծվում է, եթե տրված չէ)            |
| `enabled`           | INT     | 0/1; կանխադրված է 1                                         |
| `description`       | TEXT    | Ընտրովի մարդկային պիտակ                                     |
| `created_at`        | TEXT    | `datetime('now')`                                           |
| `last_triggered_at` | TEXT    | Թարմացվում է առաքման յուրաքանչյուր փորձի ժամանակ            |
| `last_status`       | INT     | Վերջին փորձի HTTP կարգավիճակը (0 = ցանց)                    |
| `failure_count`     | INT     | Հաջողության դեպքում վերականգնվում է 0, ձախողման դեպքում + 1 |

Առաքման պատմությունը պահպանվում է հատուկ `webhook_deliveries` աղյուսակում (միգրացիոն `069_webhook_deliveries.sql`, գրվում է `src/lib/db/webhookDeliveries.ts::insertDelivery` միջոցով ամեն փորձի դեպքում), ի լրումն `webhooks` շարքի համախառն հաշվիչների: Բարի մետատվյալներ (Slack / Discord / Telegram / հարմարեցված ծանրաբեռնված տրանսֆորմատորներ) ավելացվել է `070_webhooks_kind_metadata.sql` կողմից:

## REST API

Բոլոր վերջնակետերը պահանջում են կառավարման վավերացում (`requireManagementAuth`):

| Վերջնակետ                       | Մեթոդ  | Նկարագրություն                                   |
| ------------------------------- | ------ | ------------------------------------------------ |
| `/api/webhooks`                 | GET    | Ցուցակել վեբ-կեռիկներ (գաղտնիքները դիմակավորված) |
| `/api/webhooks`                 | POST   | Ստեղծեք վեբ կեռիկ                                |
| `/api/webhooks/[id]`            | GET    | Webhook մանրամասները (ամբողջական գաղտնիք)        |
| `/api/webhooks/[id]`            | PUT    | Թարմացնել դաշտերը                                |
| `/api/webhooks/[id]`            | DELETE | Հեռացնել                                         |
| `/api/webhooks/[id]/test`       | POST   | Գործարկել `test.ping` (կրկնվող փորձեր չկան)      |
| `/api/webhooks/[id]/deliveries` | GET    | Մեկ վեբ-կեռիկի առաքման վերջին փորձերը            |
| `/api/webhooks/validate-url`    | POST   | Նախքան թռիչքային URL վավերացում (SSRF պահակ)     |

`GET /api/webhooks` թաքցնում է `<first 10 chars>...` ի գաղտնիքը՝ ցուցակման էջերում արտահոսքից խուսափելու համար: Օգտագործեք `[id]` GET ն, երբ իրականում ձեզ անհրաժեշտ է գաղտնիքը:

### Ստեղծեք վեբ կեռիկ

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

Եթե `secret` բաց թողնված է, սերվերը ստեղծում է `whsec_<hex>` գաղտնիք և վերադարձնում այն պատասխանում:

### Փորձնական վեբ-կեռիկ

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Վերադարձնում է `{ delivered, status, error }`: Ոչ մի կրկնություն չի փորձվում — օգտակար է արագ հաստատելու համար, որ ստացողը ընդունում է օգտակար բեռը և ստորագրությունը:

## Վահանակ

`/dashboard/webhooks` ի վահանակի էջը (տես `src/app/(dashboard)/dashboard/webhooks/page.tsx`) ապահովում է.

- Create/edit վեբկապում է իրադարձությունների ընտրիչով
- Կարգավիճակի ցուցիչ (ակտիվ / ոչ ակտիվ / սխալ) հիմնված `enabled`, `failure_count` և `last_status` վրա
- Մեկ սեղմումով թեստի առաքում
- Ձեռնարկ enable/disable անջատիչ

## Օգտակար բեռի օրինակներ

### խնդրանք.ավարտված

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

Ոչ `test.ping` իրադարձությունների դաշտերի ձևերը սահմանվում են զանգերի կայքերով, որոնք թողարկում են դրանք. վերաբերվեք `data` օբյեկտին որպես առաջընթաց-համատեղելի (ավելացրեք դաշտեր, կախված չլինեք բացակայությունից):

## Լավագույն պրակտիկա

- **Ստուգեք ստորագրությունը յուրաքանչյուր առաքման ժամանակ** Հում մարմնի դեմ — կանխում է կեղծված POSTs յուրաքանչյուրից, ով կռահում է ձեր URL վեբկեռիկը:
- **Պատասխանեք 2xx ~ 5 վայրկյանի ընթացքում** — դիսպետչերի ժամանակն ավարտվում է 10 վայրկյանում: Դանդաղ ընդունիչները կուտեն կրկնվող փորձերը և կփքեն `failure_count`:
- **Դարձրեք զբաղվողներին անիմաստ** — կրկնվող փորձերը և առնվազն մեկ անգամ առաքման իմաստաբանությունը նշանակում է, որ հնարավոր են կրկնօրինակներ:
- **Բաժանորդագրվեք նվազագույնը** — ցուցակագրեք միայն այն իրադարձությունները, որոնք իրականում սպառում եք. `"*"` կավելացնի ձեր չվերահսկվող ընդունիչների արժեքը:
- **Դիտեք `failure_count`** — վերջնակետերը ավտոմատ անջատվում են 10 անընդմեջ ձախողումների դեպքում. զրոյացնել՝ ընդունիչը շտկելուց հետո `PUT /api/webhooks/[id]` ով `enabled: true` ով զանգահարելով:
- **Պարբերաբար պտտեք գաղտնիքները** — `PUT` նոր `secret`, նոր արժեքը տեղադրեք ստացողի վրա և հաստատեք փորձարկման վերջնակետի միջոցով:

## Տես նաև

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ամբողջական կառավարում API մակերեսը
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — անջատիչ / սառեցման իմաստաբանություն մատակարարի ձախողումների հետևում, որոնք հայտնվել են `request.failed` միջոցով
- Աղբյուր՝ `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
