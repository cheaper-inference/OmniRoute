# Webhooks (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **सत्यको स्रोत:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**पछिल्लो अपडेट:** 2026-06-28 — v3.8.40

OmniRoute प्लेटफर्म घटनाहरूमा HTTP वेबहुकहरू फायर गर्न सक्छ। तिनीहरूलाई Slack, PagerDuty, Datadog, आन्तरिक चेतावनी सेवाहरू, वा कुनै HTTP रिसीभरसँग एकीकृत गर्न प्रयोग गर्नुहोस्।

प्रेषकले HMAC-SHA256 सँग प्रत्येक डेलिभरीमा हस्ताक्षर गर्दछ, क्षणिक विफलताहरूमा पुन: प्रयास गर्दछ, प्रति वेबहुक डेलिभरी स्वास्थ्य ट्र्याक गर्दछ, र असफल भइरहने अन्तबिन्दुहरूलाई स्वत: असक्षम पार्छ।

## समर्थित घटनाहरू

`WebhookEvent` प्रकार (`src/lib/webhooks/eventDescriptions.ts`, `src/lib/webhookDispatcher.ts` द्वारा उपभोग गरिएको) हाल सात घटनाहरू मोडेल गर्दछ:

| घटना                      | जब आगो लाग्छ                                                             |
| ------------------------- | ------------------------------------------------------------------------ |
| `request.completed`       | प्रोक्सी अनुरोध सफलतापूर्वक पूरा भयो                                     |
| `request.failed`          | एक प्रोक्सी अनुरोध सबै retries/fallback पछि असफल हुन्छ                   |
| `quota.exceeded`          | API कुञ्जीले budget/quota थ्रेसहोल्ड पार गर्दछ                           |
| `proxy.set_aside`         | एक प्रोक्सी पूल सदस्य बारम्बार अस्वीकार पछि अलग गरिएको छ (संक्रमण मात्र) |
| `proxy.pool.exhausted`    | प्रोक्सी पूल स्कोपको प्रत्येक सदस्यलाई अलग गरिएको छ                      |
| `provider.reset_redeemed` | स्वतः-लागू बैंक रिसेट रिसेट क्रेडिट वा Claude साप्ताहिक सत्र रिसेट रिडिम |
| `test.ping`               | परीक्षण अन्तिम बिन्दु द्वारा प्रयोग गरिएको सिंथेटिक घटना                 |

सदस्यताहरूले प्रत्येक घटना प्राप्त गर्न शाब्दिक `"*"` स्वीकार गर्दछ। `events` मा अज्ञात घटना नामहरू प्रेषण समयमा बेवास्ता गरिन्छ।

> नोट: डिस्प्याचर API तार गरिएको छ, तर केहि गैर-`test.ping` घटनाहरूको लागि उत्पादन कल साइटहरू अझै अवतरण भइरहेका छन्। `grep dispatchEvent` जाँच गर्नुहोस् कि कुन पथहरूले हाल तपाईंको रिलीजमा प्रेषकलाई आह्वान गर्दछ।

## वास्तुकला

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

डिस्प्याच कलरको लागि फायर-एन्ड-फोरगेट हो: `Promise.allSettled` प्रति-वेबहुक त्रुटिहरू निगल्छ त्यसैले एउटा खराब रिसीभरले अरूलाई रोक्न सक्दैन।

## HMAC हस्ताक्षर

जब वेबहुकमा `secret` हुन्छ, OmniRoute JSON बडीमा हस्ताक्षर गर्छ र पठाउँछ:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> हेडर नामहरूले `X-Webhook-*` उपसर्ग प्रयोग गर्दछ ( `X-OmniRoute-*` होइन)। हस्ताक्षर मान `sha256=<hex>` — पूर्ण उपसर्ग प्रमाणित गर्नुहोस्।

यदि `createWebhook` लाई गोप्य बिना बोलाइन्छ भने, DB मोड्युलले एउटा (`whsec_<48 hex>`) उत्पन्न गर्दछ त्यसैले सबै वेबहुकहरू पूर्वनिर्धारित रूपमा हस्ताक्षर हुन्छन्।

### रिसीभरमा प्रमाणीकरण गर्दै

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

सधैं विरुद्ध प्रमाणित गर्नुहोस्**कच्चा** कुनै पनि JSON पार्सिङ अघि शरीर अनुरोध गर्नुहोस्।

## पुन: प्रयास र विफलता नीति

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 सेकेन्ड टाइमआउट प्रति प्रयास (`AbortController`)।
- HTTP 2xx लाई सफलताको रूपमा गणना गरिन्छ।
- HTTP 3xx/4xx `success = res.ok` सँग डेलिभर गरिएको रूपमा रेकर्ड गरिएको — पुन: प्रयास गर्न नसकिने अन्तिम स्थितिको रूपमा गणना गर्दछ।
- HTTP 5xx र नेटवर्क त्रुटिहरू घातीय ब्याकअफको साथ पुन: प्रयास गरिन्छ: `2^attempt * 1000 ms` (1s, 2s, 4s)।
- `maxRetries` पछि, डेलिभरी असफल भएको रूपमा रेकर्ड गरिएको छ।
- प्रत्येक डेलिभरीले `last_triggered_at`, `last_status` अपडेट गर्छ र `failure_count` रिसेट वा वृद्धि गर्छ।
- डिस्प्याचरले प्रत्येक फ्यान-आउट पछि `disableWebhooksWithHighFailures(10)` कल गर्छ, त्यसैले `failure_count >= 10` सँग कुनै पनि वेबहुक स्वतः असक्षम हुन्छ।

## डाटाबेस

तालिका `webhooks` (माइग्रेसन `011_webhooks.sql`):

| स्तम्भ              | टाइप गर्नुहोस् | नोटहरू                                     |
| ------------------- | -------------- | ------------------------------------------ |
| `id`                | TEXT PK        | UUID                                       |
| `url`               | TEXT           | गन्तव्य URL                                |
| `events`            | TEXT           | JSON एरे; पूर्वनिर्धारित `["*"]`           |
| `secret`            | TEXT           | HMAC गोप्य (दिईएको छैन भने स्वतः उत्पन्न)  |
| `enabled`           | INT            | 0/1; 1 मा पूर्वनिर्धारित                   |
| `description`       | TEXT           | वैकल्पिक मानव लेबल                         |
| `created_at`        | TEXT           | `datetime('now')`                          |
| `last_triggered_at` | TEXT           | हरेक डेलिभरी प्रयासमा अद्यावधिक गरियो      |
| `last_status`       | INT            | अन्तिम प्रयासकोHTTP स्थिति (0 = नेटवर्क)   |
| `failure_count`     | INT            | सफलतामा ०, असफलतामा + 1 मा रिसेट गर्नुहोस् |

डेडिकेटेड `webhook_deliveries` तालिका (माइग्रेसन `069_webhook_deliveries.sql`, प्रत्येक प्रयासमा `src/lib/db/webhookDeliveries.ts::insertDelivery` मार्फत लेखिएको) मा डेलिभरी इतिहास कायम रहन्छ, `webhooks` पङ्क्तिमा जम्मा काउन्टरहरूको अतिरिक्त। प्रकारको मेटाडेटा (Slack / Discord / Telegram / अनुकूलन पेलोड ट्रान्सफर्मरहरू) `070_webhooks_kind_metadata.sql` द्वारा थपिएको थियो।

## REST API

सबै अन्तिम बिन्दुहरूलाई व्यवस्थापन प्रमाणीकरण (`requireManagementAuth`) आवश्यक छ।

| अन्तिम बिन्दु                   | विधि   | विवरण                                                     |
| ------------------------------- | ------ | --------------------------------------------------------- |
| `/api/webhooks`                 | GET    | वेबहुकहरू सूचीबद्ध गर्नुहोस् (गोप्य कुराहरू मास्क गरिएको) |
| `/api/webhooks`                 | POST   | वेबहुक सिर्जना गर्नुहोस्                                  |
| `/api/webhooks/[id]`            | GET    | वेबहुक विवरण (पूर्ण गोप्य)                                |
| `/api/webhooks/[id]`            | PUT    | फिल्डहरू अपडेट गर्नुहोस्                                  |
| `/api/webhooks/[id]`            | DELETE | हटाउनुहोस्                                                |
| `/api/webhooks/[id]/test`       | POST   | `test.ping` फायर गर्नुहोस् (पुन: प्रयास छैन)              |
| `/api/webhooks/[id]/deliveries` | GET    | एउटा वेबहुकको लागि हालैको डेलिभरी प्रयासहरू               |
| `/api/webhooks/validate-url`    | POST   | पूर्व उडान URL प्रमाणीकरण (SSRF गार्ड)                    |

`GET /api/webhooks` ले `<first 10 chars>...` मा गोप्य मास्क गर्दछ सूची पृष्ठहरूमा चुहावटबाट बच्न। जब तपाईलाई वास्तवमा गोप्य चाहिन्छ `[id]` GET प्रयोग गर्नुहोस्।

### वेबहुक सिर्जना गर्नुहोस्

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

यदि `secret` हटाइयो भने, सर्भरले `whsec_<hex>` गोप्य उत्पन्न गर्छ र प्रतिक्रियामा फिर्ता गर्छ।

### वेबहुक परीक्षण गर्नुहोस्

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` फर्काउँछ। प्रापकले पेलोड र हस्ताक्षर स्वीकार गर्छ भनी तुरुन्त प्रमाणीकरण गर्नको लागि — उपयोगी कुनै पुन: प्रयासहरू प्रयास गरिएको छैन।

## ड्यासबोर्ड

`/dashboard/webhooks` मा ड्यासबोर्ड पृष्ठ ( `src/app/(dashboard)/dashboard/webhooks/page.tsx` हेर्नुहोस्) प्रदान गर्दछ:

- घटना चयनकर्तासँग Create/edit वेबहुकहरू
- `enabled`, `failure_count`, र `last_status` मा आधारित स्थिति सूचक (सक्रिय / निष्क्रिय / त्रुटिपूर्ण)
- एक-क्लिक परीक्षण वितरण
- म्यानुअल enable/disable टगल

## पेलोड उदाहरणहरू

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

गैर-`test.ping` घटनाहरूको लागि फिल्ड आकारहरू कल साइटहरू द्वारा परिभाषित गरिन्छ जसले तिनीहरूलाई उत्सर्जन गर्दछ; `data` वस्तुलाई अगाडि-कम्प्याटिबलको रूपमा व्यवहार गर्नुहोस् (फिल्डहरू थप्नुहोस्, अनुपस्थितिमा निर्भर नगर्नुहोस्)।

## उत्तम अभ्यासहरू

- **प्रत्येक डेलिभरीमा हस्ताक्षर प्रमाणित गर्नुहोस्** कच्चा शरीरको विरुद्धमा — तपाईंको वेबहुक URL अनुमान गर्ने जो कोहीबाट नक्कली POSTs रोक्छ।
- **~ 5 सेकेन्ड भित्र 2xx जवाफ दिनुहोस्** — डिस्प्याचर टाइम 10 सेकेन्डमा। ढिलो रिसिभरहरूले पुन: प्रयासहरू खानेछन् र `failure_count` फुलाउनेछन्।
- **ह्यान्डलरहरूलाई सक्षम बनाउनुहोस्** — पुन: प्रयासहरू र कम्तिमा-एक पटक डेलिभरी सिमान्टिक्सको मतलब नक्कलहरू सम्भव छन्।
- **न्यूनतम सदस्यता लिनुहोस्** — तपाईंले वास्तवमा उपभोग गर्ने घटनाहरू मात्र सूचीबद्ध गर्नुहोस्। `"*"` तपाईंले नियन्त्रण नगर्ने रिसिभरहरूमा लागत थप्नेछ।
- **`failure_count` हेर्नुहोस्** — अन्तिम बिन्दुहरू 10 लगातार विफलताहरूमा स्वत: असक्षम हुन्छन्; रिसिभर फिक्स गरेपछि `PUT /api/webhooks/[id]` `enabled: true` सँग कल गरेर रिसेट गर्नुहोस्।
- **समय समयमा गोप्य घुमाउनुहोस्** — `PUT` नयाँ `secret`, रिसीभरमा नयाँ मान डिप्लोय गर्नुहोस्, र परीक्षण अन्त्य बिन्दु मार्फत पुष्टि गर्नुहोस्।

## यो पनि हेर्नुहोस्

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — पूर्ण व्यवस्थापन API सतह
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — सर्किट ब्रेकर / प्रदायक असफलता पछाडिको कूलडाउन अर्थशास्त्र `request.failed` मार्फत देखा पर्‍यो
- स्रोत: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
