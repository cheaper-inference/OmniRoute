# Webhooks (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **సత్యానికి మూలం:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**చివరిగా నవీకరించబడింది:** 2026-06-28 — v3.8.40

OmniRoute ప్లాట్ఫారమ్ ఈవెంట్లలో HTTP వెబ్హూక్లను కాల్చగలదు. Slack, PagerDuty, డేటాడాగ్, అంతర్గత హెచ్చరిక సేవలు లేదా ఏదైనా HTTP రిసీవర్తో ఏకీకృతం చేయడానికి వాటిని ఉపయోగించండి.

డిస్పాచర్ ప్రతి డెలివరీని HMAC-SHA256 తో సంతకం చేస్తాడు, తాత్కాలిక వైఫల్యాలపై మళ్లీ ప్రయత్నిస్తాడు, ప్రతి వెబ్హుక్కు డెలివరీ ఆరోగ్యాన్ని ట్రాక్ చేస్తాడు మరియు విఫలమయ్యే ముగింపు పాయింట్లను ఆటో-డిజేబుల్ చేస్తాడు.

## మద్దతు ఉన్న ఈవెంట్లు

`WebhookEvent` రకం (`src/lib/webhooks/eventDescriptions.ts`, `src/lib/webhookDispatcher.ts` ద్వారా వినియోగించబడుతుంది ) ప్రస్తుతం ఏడు ఈవెంట్లను మోడల్ చేస్తుంది:

| ఈవెంట్                    | ఎప్పుడు మంటలు                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------- |
| `request.completed`       | ప్రాక్సీ అభ్యర్థన విజయవంతంగా పూర్తయింది                                                                  |
| `request.failed`          | అన్ని retries/fallback తర్వాత ప్రాక్సీ అభ్యర్థన విఫలమవుతుంది                                             |
| `quota.exceeded`          | API కీ budget/quota థ్రెషోల్డ్ను దాటుతుంది                                                               |
| `proxy.set_aside`         | ప్రాక్సీ పూల్ సభ్యుడు పదే పదే తిరస్కరణల తర్వాత పక్కన పెట్టబడతారు (పరివర్తన మాత్రమే)                      |
| `proxy.pool.exhausted`    | ప్రాక్సీ పూల్ స్కోప్లోని ప్రతి సభ్యుడు పక్కన పెట్టబడతారు                                                 |
| `provider.reset_redeemed` | స్వయంచాలకంగా వర్తించే బ్యాంకింగ్ రీసెట్లు రీసెట్ క్రెడిట్ లేదా Claude వారపు సెషన్ రీసెట్ను రీడీమ్ చేశాయి |
| `test.ping`               | పరీక్ష ముగింపు బిందువు ఉపయోగించే సింథటిక్ ఈవెంట్                                                         |

ప్రతి ఈవెంట్ను స్వీకరించడానికి సబ్స్క్రిప్షన్లు లిటరల్ `"*"` అంగీకరిస్తాయి. `events` లో తెలియని ఈవెంట్ పేర్లు పంపే సమయంలో విస్మరించబడతాయి.

> గమనిక: డిస్పాచర్ API వైర్ చేయబడింది, అయితే కొన్ని`test.ping` కాని ఈవెంట్ల కోసం ప్రొడక్షన్ కాల్ సైట్లు ఇప్పటికీ ల్యాండింగ్లో ఉన్నాయి. ప్రస్తుతం మీ విడుదలలో డిస్పాచర్ను ఏ పాత్లు అమలు చేస్తున్నాయో చూడటానికి `grep dispatchEvent` తనిఖీ చేయండి.

## ఆర్కిటెక్చర్

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

డిస్పాచ్ అనేది కాలర్కి ఫైర్ అండ్ ఫర్గెట్: `Promise.allSettled` ఒక్కో వెబ్హుక్ లోపాలను మింగుతుంది కాబట్టి ఒక చెడ్డ రిసీవర్ ఇతరులను బ్లాక్ చేయదు.

## HMAC సంతకం

వెబ్హుక్లో `secret` ఉన్నప్పుడు, OmniRoute JSON బాడీకి సంతకం చేసి పంపుతుంది:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> హెడర్ పేర్లు `X-Webhook-*` ఉపసర్గను ఉపయోగిస్తాయి ( `X-OmniRoute-*` కాదు). సంతకం విలువ `sha256=<hex>` — పూర్తి ఉపసర్గను ధృవీకరించండి.

`createWebhook` రహస్యం లేకుండా పిలిస్తే, DB మాడ్యూల్ ఒకదాన్ని (`whsec_<48 hex>`) ఉత్పత్తి చేస్తుంది కాబట్టి అన్ని వెబ్హూక్లు డిఫాల్ట్గా సంతకం చేయబడతాయి.

### రిసీవర్లో ధృవీకరిస్తోంది

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

దీనికి వ్యతిరేకంగా ఎల్లప్పుడూ ధృవీకరించండి**ముడి** ఏదైనా JSON పార్సింగ్కు ముందు శరీరాన్ని అభ్యర్థించండి.

## మళ్లీ ప్రయత్నించండి & వైఫల్యం పాలసీ

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- ప్రతి ప్రయత్నానికి 10 సెకన్ల సమయం ముగిసింది (`AbortController`).
- HTTP 2xx విజయంగా పరిగణించబడుతుంది.
- HTTP 3xx/4xx `success = res.ok` తో డెలివరీ చేయబడినట్లుగా నమోదు చేయబడిన — తిరిగి ప్రయత్నించలేని తుది స్థితిగా పరిగణించబడుతుంది.
- HTTP 5xx మరియు నెట్వర్క్ లోపాలు ఎక్స్పోనెన్షియల్ బ్యాక్ఆఫ్తో మళ్లీ ప్రయత్నించబడతాయి: `2^attempt * 1000 ms` (1సె, 2సె, 4సె).
- `maxRetries` తర్వాత, డెలివరీ విఫలమైనట్లు నమోదు చేయబడుతుంది.
- ప్రతి డెలివరీ `last_triggered_at`, `last_status`, మరియు `failure_count` ని రీసెట్ చేస్తుంది లేదా ఇంక్రిమెంట్ చేస్తుంది .
- ప్రతి ఫ్యాన్-అవుట్ తర్వాత డిస్పాచర్ `disableWebhooksWithHighFailures(10)` కాల్ చేస్తాడు, కాబట్టి `failure_count >= 10` తో ఉన్న ఏదైనా వెబ్హుక్ స్వయంచాలకంగా నిలిపివేయబడుతుంది.

## డేటాబేస్

టేబుల్ `webhooks` (మైగ్రేషన్ `011_webhooks.sql`):

| కాలమ్               | టైప్ చేయండి | గమనికలు                                              |
| ------------------- | ----------- | ---------------------------------------------------- |
| `id`                | TEXT PK     | UUID                                                 |
| `url`               | TEXT        | గమ్యం URL                                            |
| `events`            | TEXT        | JSON శ్రేణి; డిఫాల్ట్ `["*"]`                        |
| `secret`            | TEXT        | HMAC రహస్యం (ఇవ్వకపోతే స్వయంచాలకంగా రూపొందించబడింది) |
| `enabled`           | INT         | 0/1; డిఫాల్ట్లు 1                                    |
| `description`       | TEXT        | ఐచ్ఛిక మానవ లేబుల్                                   |
| `created_at`        | TEXT        | `datetime('now')`                                    |
| `last_triggered_at` | TEXT        | ప్రతి డెలివరీ ప్రయత్నంలో నవీకరించబడింది              |
| `last_status`       | INT         | చివరి ప్రయత్నం యొక్క HTTP స్థితి (0 = నెట్వర్క్)     |
| `failure_count`     | INT         | విజయంపై 0కి, వైఫల్యంపై + 1కి రీసెట్ చేయబడుతుంది      |

డెలివరీ చరిత్ర అంకితమైన `webhook_deliveries` పట్టికలో కొనసాగుతుంది (మైగ్రేషన్ `069_webhook_deliveries.sql`, ప్రతి ప్రయత్నంలో `src/lib/db/webhookDeliveries.ts::insertDelivery` ద్వారా వ్రాయబడుతుంది), `webhooks` వరుసలోని మొత్తం కౌంటర్లతో పాటు. కైండ్ మెటాడేటా (Slack / Discord / Telegram / కస్టమ్ పేలోడ్ ట్రాన్స్ఫార్మర్లు) `070_webhooks_kind_metadata.sql` ద్వారా జోడించబడింది.

## REST API

అన్ని ఎండ్పాయింట్లకు నిర్వహణ ప్రమాణీకరణ (`requireManagementAuth`) అవసరం.

| ఎండ్ పాయింట్                    | పద్ధతి | వివరణ                                             |
| ------------------------------- | ------ | ------------------------------------------------- |
| `/api/webhooks`                 | GET    | వెబ్హూక్ల జాబితా (రహస్యాలు ముసుగు)                |
| `/api/webhooks`                 | POST   | వెబ్హుక్ని సృష్టించండి                            |
| `/api/webhooks/[id]`            | GET    | Webhook వివరాలు (పూర్తి రహస్యం)                   |
| `/api/webhooks/[id]`            | PUT    | ఫీల్డ్లను నవీకరించండి                             |
| `/api/webhooks/[id]`            | DELETE | తొలగించు                                          |
| `/api/webhooks/[id]/test`       | POST   | `test.ping` ని కాల్చండి (మళ్లీ ప్రయత్నించడం లేదు) |
| `/api/webhooks/[id]/deliveries` | GET    | ఒక వెబ్హుక్ కోసం ఇటీవలి డెలివరీ ప్రయత్నాలు        |
| `/api/webhooks/validate-url`    | POST   | ప్రీ-ఫ్లైట్ URL ధ్రువీకరణ (SSRF గార్డ్)           |

లిస్టింగ్ పేజీలలో లీక్ అవ్వకుండా ఉండటానికి`GET /api/webhooks` `<first 10 chars>...` రహస్యాన్ని కప్పివేస్తుంది. మీకు నిజంగా రహస్యం అవసరమైనప్పుడు `[id]` GET ని ఉపయోగించండి.

### వెబ్హుక్ని సృష్టించండి

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

`secret` విస్మరించబడితే, సర్వర్ `whsec_<hex>` రహస్యాన్ని ఉత్పత్తి చేస్తుంది మరియు ప్రతిస్పందనలో దాన్ని అందిస్తుంది.

### వెబ్హుక్ని పరీక్షించండి

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` ని అందిస్తుంది. రిసీవర్ పేలోడ్ మరియు సంతకాన్ని అంగీకరిస్తున్నట్లు త్వరగా ధృవీకరించడానికి — ఉపయుక్తంగా మళ్లీ ప్రయత్నించలేదు.

## డాష్బోర్డ్

`/dashboard/webhooks` వద్ద డాష్బోర్డ్ పేజీ ( `src/app/(dashboard)/dashboard/webhooks/page.tsx` చూడండి) అందిస్తుంది:

- ఈవెంట్ పికర్తోCreate/edit వెబ్హుక్స్
- `enabled`, `failure_count`, మరియు `last_status` ఆధారంగా స్థితి సూచిక (క్రియాశీల / నిష్క్రియ / లోపం)
- ఒక-క్లిక్ టెస్ట్ డెలివరీ
- మాన్యువల్ enable/disable టోగుల్

## పేలోడ్ ఉదాహరణలు

### అభ్యర్థన.పూర్తయింది

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

`test.ping` కాని ఈవెంట్ల కోసం ఫీల్డ్ ఆకారాలు వాటిని విడుదల చేసే కాల్ సైట్ల ద్వారా నిర్వచించబడతాయి; `data` ఆబ్జెక్ట్ను ఫార్వర్డ్-అనుకూలమైనదిగా పరిగణించండి (ఫీల్డ్లను జోడించండి, లేకపోవడంపై ఆధారపడవద్దు).

## ఉత్తమ పద్ధతులు

- **ప్రతి డెలివరీలో సంతకాన్ని ధృవీకరించండి** ముడి శరీరానికి వ్యతిరేకంగా — మీ వెబ్హుక్ URL ఊహించే వారి నుండి స్పూఫ్డ్ POSTs నిరోధిస్తుంది.
- **~ 5 సెకన్లలోపు 2xx ప్రతిస్పందించండి** — డిస్పాచర్ సమయం 10 సెకన్లకు ముగిసింది. స్లో రిసీవర్లు మళ్లీ ప్రయత్నించి `failure_count` పెంచుతాయి.
- **హ్యాండ్లర్లను అసంపూర్ణంగా చేయండి** — మళ్లీ ప్రయత్నిస్తుంది మరియు కనీసం ఒకసారి డెలివరీ సెమాంటిక్స్ అంటే నకిలీలు సాధ్యమే.
- **కనిష్టంగా సభ్యత్వం పొందండి** — మీరు నిజంగా వినియోగించే ఈవెంట్లను మాత్రమే జాబితా చేయండి; `"*"` మీరు నియంత్రించని రిసీవర్లపై ధరను జోడిస్తుంది.
- **`failure_count` చూడండి** — ముగింపు పాయింట్లు 10 వరుస వైఫల్యాల వద్ద స్వయంచాలకంగా నిలిపివేయబడతాయి; రిసీవర్ను పరిష్కరించిన తర్వాత `enabled: true` తో `PUT /api/webhooks/[id]` కాల్ చేయడం ద్వారా రీసెట్ చేయండి.
- **క్రమానుగతంగా రహస్యాలను తిప్పండి** — `PUT` కొత్త `secret`, రిసీవర్కు కొత్త విలువను అమలు చేయండి మరియు పరీక్ష ముగింపు పాయింట్ ద్వారా నిర్ధారించండి.

## ఇవి కూడా చూడండి

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — పూర్తి నిర్వహణ API ఉపరితలం
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — సర్క్యూట్ బ్రేకర్ / ప్రొవైడర్ వైఫల్యాల వెనుక ఉన్న కూల్డౌన్ సెమాంటిక్స్ `request.failed` ద్వారా బయటపడింది.
- మూలం: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
