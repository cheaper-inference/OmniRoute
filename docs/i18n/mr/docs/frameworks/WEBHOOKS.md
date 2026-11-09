# Webhooks (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **सत्याचा स्रोत:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**शेवटचे अपडेट:** 2026-06-28 — v3.8.40

OmniRoute प्लॅटफॉर्म इव्हेंटवर HTTP वेबहुक फायर करू शकते. Slack, PagerDuty, Datadog, अंतर्गत सूचना सेवा किंवा कोणत्याही HTTP रिसीव्हरसह एकत्रित करण्यासाठी त्यांचा वापर करा.

डिस्पॅचर प्रत्येक डिलिव्हरीवर HMAC-SHA256 सह स्वाक्षरी करतो, क्षणिक अपयशांवर पुन्हा प्रयत्न करतो, प्रति वेबहुक वितरण आरोग्याचा मागोवा घेतो आणि अयशस्वी होणारे एंडपॉइंट स्वयं-अक्षम करतो.

## समर्थीत कार्यक्रम

`WebhookEvent` प्रकार (`src/lib/webhooks/eventDescriptions.ts`, `src/lib/webhookDispatcher.ts` द्वारे वापरला जातो) सध्या सात इव्हेंट्सचे मॉडेल करतो:

| कार्यक्रम                 | जेव्हा आग लागते                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------- |
| `request.completed`       | प्रॉक्सी विनंती यशस्वीरित्या पूर्ण होते                                                |
| `request.failed`          | सर्व retries/fallback नंतर प्रॉक्सी विनंती अयशस्वी होते                                |
| `quota.exceeded`          | API की budget/quota थ्रेशोल्ड ओलांडते                                                  |
| `proxy.set_aside`         | प्रॉक्सी पूल सदस्य वारंवार नकार दिल्यानंतर बाजूला ठेवला जातो (केवळ संक्रमण)            |
| `proxy.pool.exhausted`    | प्रॉक्सी पूल स्कोपचा प्रत्येक सदस्य बाजूला ठेवला आहे                                   |
| `provider.reset_redeemed` | स्वयं-लागू बँक केलेले रीसेट रीसेट क्रेडिट किंवा Claude साप्ताहिक सत्र रीसेट रिडीम केले |
| `test.ping`               | चाचणी एंडपॉइंटद्वारे वापरलेली सिंथेटिक घटना                                            |

सदस्यता प्रत्येक कार्यक्रम प्राप्त करण्यासाठी शाब्दिक `"*"` स्वीकारतात. `events` मधील अज्ञात इव्हेंटची नावे पाठवण्याच्या वेळी दुर्लक्षित केली जातात.

> टीप: डिस्पॅचर API वायर्ड आहे, परंतु`test.ping` नसलेल्या काही इव्हेंटसाठी उत्पादन कॉल साइट अजूनही उतरत आहेत. तुमच्या रिलीझमध्ये सध्या कोणते पथ डिस्पॅचरला आमंत्रित करतात हे पाहण्यासाठी `grep dispatchEvent` तपासा.

## आर्किटेक्चर

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

कॉलरसाठी डिस्पॅच फायर-एंड-फोरगेट आहे: `Promise.allSettled` प्रति-वेबहुक एरर गिळतो त्यामुळे एक खराब रिसीव्हर इतरांना ब्लॉक करू शकत नाही.

## HMAC स्वाक्षरी

जेव्हा वेबहुकमध्ये `secret` असते, तेव्हा OmniRoute JSON बॉडीवर स्वाक्षरी करते आणि पाठवते:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> हेडर नावे `X-Webhook-*` उपसर्ग वापरतात ( `X-OmniRoute-*` नाही). स्वाक्षरी मूल्य `sha256=<hex>` — आहे पूर्ण उपसर्ग सत्यापित करा.

`createWebhook` गुप्ततेशिवाय कॉल केल्यास, DB मॉड्यूल एक (`whsec_<48 hex>`) व्युत्पन्न करते त्यामुळे सर्व वेबहुक डीफॉल्टनुसार स्वाक्षरी केले जातात.

### रिसीव्हरवर पडताळणी करत आहे

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

विरुद्ध नेहमी पडताळणी करा**कच्चा** कोणत्याही JSON पार्सिंगपूर्वी मुख्य भागाची विनंती करा.

## पुन्हा प्रयत्न करा आणि अयशस्वी धोरण

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- प्रति प्रयत्न 10 सेकंद कालबाह्य (`AbortController`).
- HTTP 2xx यशस्वी म्हणून गणले जाते.
- HTTP 3xx/4xx गणना `success = res.ok` सोबत वितरीत केल्याप्रमाणे — पुनर्प्रयत्न न करता येणारी अंतिम स्थिती म्हणून केली जाते.
- HTTP 5xx आणि नेटवर्क त्रुटींचा घातांकीय बॅकऑफसह पुन्हा प्रयत्न केला जातो: `2^attempt * 1000 ms` (1s, 2s, 4s).
- `maxRetries` नंतर, वितरण अयशस्वी म्हणून रेकॉर्ड केले जाते.
- प्रत्येक वितरण `last_triggered_at`, `last_status` अपडेट करते आणि `failure_count` रीसेट करते किंवा वाढवते.
- डिस्पॅचर प्रत्येक फॅन-आउटनंतर `disableWebhooksWithHighFailures(10)` कॉल करतो, त्यामुळे `failure_count >= 10` सह कोणतेही वेबहुक स्वयंचलितपणे अक्षम केले जाते.

## डेटाबेस

टेबल `webhooks` (स्थलांतर `011_webhooks.sql`):

| स्तंभ               | प्रकार  | नोट्स                                        |
| ------------------- | ------- | -------------------------------------------- |
| `id`                | TEXT PK | UUID                                         |
| `url`               | TEXT    | गंतव्य URL                                   |
| `events`            | TEXT    | JSON ॲरे; डीफॉल्ट `["*"]`                    |
| `secret`            | TEXT    | HMAC गुप्त (दिले नसल्यास स्वयं-व्युत्पन्न)   |
| `enabled`           | INT     | 0/1; डीफॉल्ट 1                               |
| `description`       | TEXT    | पर्यायी मानवी लेबल                           |
| `created_at`        | TEXT    | `datetime('now')`                            |
| `last_triggered_at` | TEXT    | प्रत्येक डिलिव्हरी प्रयत्नावर अपडेट केले     |
| `last_status`       | INT     | शेवटच्या प्रयत्नाचीHTTP स्थिती (0 = नेटवर्क) |
| `failure_count`     | INT     | यशावर 0 वर रीसेट करा, अयशस्वी झाल्यावर + 1   |

`webhooks` पंक्तीवरील एकूण काउंटर व्यतिरिक्त, समर्पित `webhook_deliveries` टेबलमध्ये (स्थलांतर `069_webhook_deliveries.sql`, प्रत्येक प्रयत्नात `src/lib/db/webhookDeliveries.ts::insertDelivery` द्वारे लिहिलेले) वितरण इतिहास कायम आहे. प्रकारचा मेटाडेटा (Slack / Discord / Telegram / सानुकूल पेलोड ट्रान्सफॉर्मर) `070_webhooks_kind_metadata.sql` द्वारे जोडला गेला.

## REST API

सर्व एंडपॉइंट्सना व्यवस्थापन प्रमाणीकरण (`requireManagementAuth`) आवश्यक आहे.

| शेवटचा बिंदू                    | पद्धत  | वर्णन                                      |
| ------------------------------- | ------ | ------------------------------------------ |
| `/api/webhooks`                 | GET    | वेबहुकची यादी करा (गुप्ते झाकलेली)         |
| `/api/webhooks`                 | POST   | वेबहुक तयार करा                            |
| `/api/webhooks/[id]`            | GET    | वेबहुक तपशील (संपूर्ण गुप्त)               |
| `/api/webhooks/[id]`            | PUT    | फील्ड अद्यतनित करा                         |
| `/api/webhooks/[id]`            | DELETE | काढा                                       |
| `/api/webhooks/[id]/test`       | POST   | `test.ping` फायर करा (पुन्हा प्रयत्न नाही) |
| `/api/webhooks/[id]/deliveries` | GET    | एका वेबहुकसाठी अलीकडील वितरण प्रयत्न       |
| `/api/webhooks/validate-url`    | POST   | प्री-फ्लाइट URL प्रमाणीकरण (SSRF गार्ड)    |

`GET /api/webhooks` सूचीच्या पृष्ठांवर लीक होऊ नये म्हणून `<first 10 chars>...` चे रहस्य लपवते. जेव्हा तुम्हाला खरोखर गुप्ततेची आवश्यकता असेल तेव्हा `[id]` GET वापरा.

### वेबहुक तयार करा

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

`secret` वगळल्यास, सर्व्हर `whsec_<hex>` गुपित व्युत्पन्न करतो आणि प्रतिसादात ते परत करतो.

### चाचणी वेबहुक

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` परत करतो. प्राप्तकर्ता पेलोड आणि स्वाक्षरी स्वीकारतो हे त्वरीत सत्यापित करण्यासाठी — उपयुक्त प्रयत्न करण्याचा कोणताही प्रयत्न केला जात नाही.

## डॅशबोर्ड

`/dashboard/webhooks` वरील डॅशबोर्ड पृष्ठ ( `src/app/(dashboard)/dashboard/webhooks/page.tsx` पहा) प्रदान करते:

- इव्हेंट पिकरसह Create/edit वेबहुक
- `enabled`, `failure_count` आणि `last_status` वर आधारित स्थिती निर्देशक (सक्रिय / निष्क्रिय / त्रुटी)
- एक-क्लिक चाचणी वितरण
- मॅन्युअल enable/disable टॉगल

## पेलोड उदाहरणे

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

`test.ping` नसलेल्या इव्हेंटसाठी फील्ड आकार त्यांना उत्सर्जित करणाऱ्या कॉल साइटद्वारे परिभाषित केले जातात; `data` ऑब्जेक्टला फॉरवर्ड-कंपॅटिबल म्हणून हाताळा (फील्ड जोडा, अनुपस्थितीवर अवलंबून राहू नका).

## सर्वोत्तम पद्धती

- **प्रत्येक डिलिव्हरीवर स्वाक्षरीची पडताळणी करा** रॉ बॉडी विरुद्ध — तुमच्या वेबहुक URL चा अंदाज लावणाऱ्या कोणत्याही व्यक्तीकडून फसवणूक केलेल्या POSTs प्रतिबंधित करते.
- **~ 5 सेकंदात 2xx प्रतिसाद द्या** — डिस्पॅचरची वेळ 10 से. स्लो रिसीव्हर्स पुन्हा प्रयत्न करतील आणि `failure_count` फुगवतील.
- **हँडलर्सना अशक्त बनवा** — पुन्हा प्रयत्न करा आणि किमान-एकदा वितरण शब्दार्थ म्हणजे डुप्लिकेट शक्य आहेत.
- **कमीत कमी सदस्यता घ्या** — फक्त तुम्ही वापरत असलेल्या घटनांची यादी करा; `"*"` तुम्ही नियंत्रित करत नसलेल्या रिसीव्हर्सवर खर्च जोडेल.
- **`failure_count` पहा** — एंडपॉइंट्स सलग 10 अयशस्वी झाल्यास स्वयं-अक्षम केले जातात; रिसीव्हर निश्चित केल्यानंतर `PUT /api/webhooks/[id]` सह `enabled: true` वर कॉल करून रीसेट करा.
- **वेळोवेळी रहस्ये फिरवा** — `PUT` एक नवीन `secret`, नवीन मूल्य प्राप्तकर्त्याला तैनात करा आणि चाचणी एंडपॉइंटद्वारे पुष्टी करा.

## हे देखील पहा

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — पूर्ण व्यवस्थापन API पृष्ठभाग
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — सर्किट ब्रेकर / कूलडाउन सिमेंटिक्स प्रदात्याच्या अपयशामागील `request.failed` द्वारे समोर आले
- स्रोत: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
