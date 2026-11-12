# Webhooks (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **የእውነት ምንጭ፡-** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**መጨረሻ የዘመነው፡-** 2026-06-28 — v3.8.40

OmniRoute HTTP ዌብ መንጠቆዎችን በመድረክ ዝግጅቶች ላይ ማቃጠል ይችላል። ከ Slack፣ PagerDuty፣ Datadog፣ የውስጥ ማንቂያ አገልግሎቶች፣ ወይም ከማንኛውም HTTP ተቀባይ ጋር ለማዋሃድ ይጠቀሙባቸው።

ላኪው እያንዳንዱን መላኪያ በ HMAC-SHA256 ይፈርማል፣ ጊዜያዊ ውድቀቶችን እንደገና ይሞክራል፣ የመላኪያ ጤናን በዌብ መንጠቆ ይከታተላል፣ እና አለመሳካታቸውን የሚቀጥሉ የመጨረሻ ነጥቦችን በራስሰር ያሰናክላል።

## የሚደገፉ ክስተቶች

የ `WebhookEvent` አይነት (`src/lib/webhooks/eventDescriptions.ts`፣ በ `src/lib/webhookDispatcher.ts` የሚበላ) በአሁኑ ጊዜ ሰባት ክስተቶችን ሞዴል አድርጓል፡-

| ክስተት                      | ሲቃጠል                                                                                |
| ------------------------- | ----------------------------------------------------------------------------------- |
| `request.completed`       | የተኪ ጥያቄ በተሳካ ሁኔታ ይጠናቀቃል                                                             |
| `request.failed`          | ከሁሉም retries/fallback በኋላ የተኪ ጥያቄ አልተሳካም።                                           |
| `quota.exceeded`          | የ API ቁልፍ የ budget/quota ገደብ ያልፋል                                                   |
| `proxy.set_aside`         | የፕሮክሲ ገንዳ አባል ከተደጋጋሚ እምቢታ በኋላ ወደ ጎን ተቀምጧል (ሽግግር ብቻ)                                 |
| `proxy.pool.exhausted`    | እያንዳንዱ የፕሮክሲ ገንዳ ወሰን አባል ወደ ጎን ተቀምጧል                                                |
| `provider.reset_redeemed` | በራስ-የተተገበሩ የባንክ ዳግም ማስጀመሪያዎች ዳግም ማስጀመሪያ ክሬዲት ወይም የ Claude ሳምንታዊ ክፍለ ጊዜ ዳግም አስጀምረዋል። |
| `test.ping`               | በሙከራ መጨረሻ ነጥብ ጥቅም ላይ የዋለ ሰው ሠራሽ ክስተት                                                |

የደንበኝነት ምዝገባዎች እያንዳንዱን ክስተት ለመቀበል ቀጥተኛውን `"*"` ይቀበላሉ። በ `events` ውስጥ ያልታወቁ የክስተት ስሞች በመላክ ጊዜ ችላ ይባላሉ።

> ማስታወሻ፡ ላኪው API ባለገመድ ነው፣ ነገር ግን ለአንዳንድ `test.ping` ያልሆኑ ክስተቶች የምርት ጥሪ ጣቢያዎች አሁንም እያረፉ ነው። በአሁኑ ጊዜ ልቀትህ ውስጥ ላኪውን የሚጠራው የትኛው ዱካ እንደሆነ ለማየት `grep dispatchEvent` ፈትሽ።

## አርክቴክቸር

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

መላክ ለጠሪው እሳቱ እና ይረሳል፡- `Promise.allSettled` በየድር መንጠቆ ስህተቶችን ስለሚውጥ አንድ መጥፎ ተቀባይ ሌሎቹን ማገድ አይችልም።

## HMAC መፈረም

የድር መንጠቆ `secret` ሲኖረው፣ OmniRoute የ JSON አካልን ይፈርማል እና ይልካል፡-

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> የራስጌ ስሞች የ `X-Webhook-*` ቅድመ ቅጥያ ( `X-OmniRoute-*` ሳይሆን) ይጠቀማሉ። የፊርማው ዋጋ `sha256=<hex>` — ነው ሙሉውን ቅድመ ቅጥያ ያረጋግጡ።

`createWebhook` ያለ ምስጢር ከተጠራ የ DB ሞጁል አንድ (`whsec_<48 hex>`) ያመነጫል ስለዚህ ሁሉም የድር መንጠቆዎች በነባሪነት ይፈርማሉ።

### በተቀባዩ ላይ ማረጋገጥ

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

ሁልጊዜ በ ላይ ያረጋግጡ **ጥሬው** የጥያቄ አካል፣ ከማንኛውም JSON ትንተና በፊት።

## ድጋሚ ሞክር እና ውድቀት ፖሊሲ

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- በአንድ ሙከራ 10 ሰከንድ ጊዜ አልቋል (`AbortController`)።
- HTTP 2xx እንደ ስኬት ይቆጠራል።
- HTTP 3xx/4xx ከ `success = res.ok` ጋር እንደደረሰ የተመዘገበ እንደ የማይሞከር የመጨረሻ ደረጃ ይቆጠራል —
- HTTP 5xx እና የአውታረ መረብ ስህተቶች ከአርቢ ጀርባ `2^attempt * 1000 ms` (1s፣ 2s፣ 4s) ጋር እንደገና ይሞከራሉ።
- ከ `maxRetries` በኋላ፣ መላኪያው ያልተሳካ ሆኖ ተመዝግቧል።
- እያንዳንዱ ማቅረቢያ `last_triggered_at`፣ `last_status` ያዘምናል እና ወይ ዳግም ያስጀምራል ወይም `failure_count` ይጨምራል።
- ላኪው ከእያንዳንዱ አድናቂ-ውጭ በኋላ ወደ `disableWebhooksWithHighFailures(10)` ይደውላል፣ ስለዚህ ማንኛውም ዌብ መንጠቆ ከ `failure_count >= 10` ጋር በራስ-ሰር ይሰናከላል።

## የውሂብ ጎታ

ሰንጠረዥ `webhooks` (ስደት `011_webhooks.sql`):

| አምድ                 | ዓይነት    | ማስታወሻዎች                            |
| ------------------- | ------- | ---------------------------------- |
| `id`                | TEXT PK | UUID                               |
| `url`               | TEXT    | መድረሻ URL                           |
| `events`            | TEXT    | JSON ድርድር; ነባሪ `["*"]`             |
| `secret`            | TEXT    | HMAC ሚስጥር (ካልተሰጠ በራስ-ሰር የተፈጠረ)     |
| `enabled`           | INT     | 0/1; ነባሪዎች ወደ 1                    |
| `description`       | TEXT    | አማራጭ የሰው መለያ                       |
| `created_at`        | TEXT    | `datetime('now')`                  |
| `last_triggered_at` | TEXT    | በእያንዳንዱ የማድረስ ሙከራ ተዘምኗል            |
| `last_status`       | INT     | የመጨረሻው ሙከራ HTTP ሁኔታ (0 = አውታረ መረብ) |
| `failure_count`     | INT     | በስኬት ወደ 0፣ + 1 በመክሸፍ ላይ            |

የማስረከቢያ ታሪክ በተወሰነው `webhook_deliveries` ሠንጠረዥ ውስጥ ጸንቷል (ስደት `069_webhook_deliveries.sql`፣ በእያንዳንዱ ሙከራ በ `src/lib/db/webhookDeliveries.ts::insertDelivery` የተጻፈ)፣ በ `webhooks` ረድፍ ላይ ካሉ ድምር ቆጣሪዎች በተጨማሪ። ዓይነት ሜታዳታ (Slack / Discord / Telegram /ብጁ የሚጫኑ ትራንስፎርመሮች) በ `070_webhooks_kind_metadata.sql` ታክለዋል።

## REST API

ሁሉም የመጨረሻ ነጥቦች የአስተዳደር ማረጋገጫ (`requireManagementAuth`) ያስፈልጋቸዋል።

| የመጨረሻ ነጥብ                       | ዘዴ     | መግለጫ                              |
| ------------------------------- | ------ | --------------------------------- |
| `/api/webhooks`                 | GET    | የድር መንጠቆዎችን ይዘርዝሩ (ምስጢሮች ጭንብል)    |
| `/api/webhooks`                 | POST   | የድር መንጠቆን ይፍጠሩ                    |
| `/api/webhooks/[id]`            | GET    | Webhook ዝርዝር (ሙሉ ሚስጥር)            |
| `/api/webhooks/[id]`            | PUT    | መስኮችን አዘምን                        |
| `/api/webhooks/[id]`            | DELETE | አስወግድ                             |
| `/api/webhooks/[id]/test`       | POST   | `test.ping` ማቃጠል (ዳግም ሙከራዎች የሉም)  |
| `/api/webhooks/[id]/deliveries` | GET    | ለአንድ የድር መንጠቆ የቅርብ ጊዜ የማድረስ ሙከራዎች |
| `/api/webhooks/validate-url`    | POST   | የቅድመ በረራ URL ማረጋገጫ (SSRF ጠባቂ)     |

`GET /api/webhooks` በዝርዝሮች ገፆች ላይ እንዳይፈስ የ `<first 10 chars>...` ሚስጥር ይደብቃል። ምስጢሩን በትክክል በሚፈልጉበት ጊዜ `[id]` GET ይጠቀሙ።

### የድር መንጠቆን ይፍጠሩ

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

`secret` ከተተወ አገልጋዩ የ `whsec_<hex>` ሚስጥር ያመነጫል እና በምላሹ ይመልሳል።

### የድር መንጠቆን ይሞክሩ

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` ይመልሳል። ምንም ሙከራዎች አልተሞከሩም — ተቀባዩ ክፍያውን እና ፊርማውን መቀበሉን በፍጥነት ለማረጋገጥ ይጠቅማል።

## ዳሽቦርድ

በ `/dashboard/webhooks` ላይ ያለው ዳሽቦርድ ገጽ ( `src/app/(dashboard)/dashboard/webhooks/page.tsx` ይመልከቱ) ያቀርባል፡-

- Create/edit የድር መንጠቆዎች ከክስተት መራጭ ጋር
- በ `enabled`፣ `failure_count` እና `last_status` ላይ የተመሰረተ የሁኔታ አመልካች (ገባሪ/የቦዘነ/የተሳሳተ)
- አንድ-ጠቅ ሙከራ ማድረስ
- በእጅ enable/disable መቀያየር

## የመጫኛ ምሳሌዎች

### ጥያቄ. ተጠናቅቋል

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

### መፈተሽ.ፒንግ

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

`test.ping` ላልሆኑ ክስተቶች የመስክ ቅርጾች የሚገለጹት በሚለቁት የጥሪ ጣቢያዎች ነው; የ `data` ነገርን ወደፊት የሚስማማ አድርገው ይያዙት (መስኮችን ያክሉ፣ በሌለበት ላይ የተመኩ አይደሉም)።

## ምርጥ ልምዶች

- **በእያንዳንዱ ማቅረቢያ ላይ ፊርማውን ያረጋግጡ** በጥሬው አካል ላይ — የእርስዎን ዌብ መንጠቆ URL ከሚገምት ማንኛውም ሰው የተፈጨ POSTs ይከላከላል።
- **በ ~ 5 ሰከንድ ውስጥ 2xx ምላሽ ይስጡ** — የላኪው ጊዜ በ10 ሴ. ቀርፋፋ ተቀባዮች ሬሲዎችን ይበላሉ እና `failure_count` ያሳድጋሉ።
- **ተቆጣጣሪዎችን ጠንካራ ያድርጉ** — እንደገና ይሞክራል እና ቢያንስ አንድ ጊዜ የማድረስ ትርጉም ማለት የተባዙ ሊሆኑ ይችላሉ።
- **በትንሹ ለደንበኝነት ይመዝገቡ** — እርስዎ በትክክል የሚጠቀሙባቸውን ክስተቶች ብቻ ይዘርዝሩ። `"*"` እርስዎ በማይቆጣጠሩት ሪሲቨሮች ላይ ወጪን ይጨምራል።
- **`failure_count` ይመልከቱ** — የመጨረሻ ነጥቦች በ 10 ተከታታይ ውድቀቶች በራስ-ሰር ተሰናክለዋል; መቀበያውን ካስተካከለ በኋላ ወደ `PUT /api/webhooks/[id]` በመደወል ዳግም ያስጀምሩ `enabled: true`
- **ሚስጥሮችን በየጊዜው ያሽከርክሩ** — `PUT` አዲስ `secret`፣ አዲሱን እሴት ወደ ተቀባዩ ያሰማሩ እና በሙከራ መጨረሻ ነጥብ ያረጋግጡ።

## በተጨማሪም ተመልከት

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ሙሉ አስተዳደር API ወለል
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — የወረዳ የሚላተም / ከአቅራቢው ውድቀቶች በስተጀርባ የቀዘቀዘ ትርጉም በ `request.failed` በኩል ብቅ አለ
- ምንጭ `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
