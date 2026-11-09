# Webhooks (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **सत्य का स्रोत:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**आखरी अपडेट:** 2026-06-28 — v3.8.40

OmniRoute प्लेटफ़ॉर्म इवेंट पर HTTP वेबहुक सक्रिय कर सकता है। Slack, PagerDuty, डेटाडॉग, आंतरिक चेतावनी सेवाओं, या किसी HTTP रिसीवर के साथ एकीकृत करने के लिए उनका उपयोग करें।

डिस्पैचर प्रत्येक डिलीवरी पर HMAC-SHA256 के साथ हस्ताक्षर करता है, क्षणिक विफलताओं पर पुनः प्रयास करता है, प्रति वेबहुक डिलीवरी स्वास्थ्य को ट्रैक करता है, और विफल रहने वाले एंडपॉइंट को ऑटो-अक्षम कर देता है।

## समर्थित घटनाएँ

`WebhookEvent` प्रकार (`src/lib/webhooks/eventDescriptions.ts`, `src/lib/webhookDispatcher.ts` द्वारा उपभोग किया गया) वर्तमान में सात घटनाओं को मॉडल करता है:

| आयोजन                     | जब आग लगती है                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `request.completed`       | एक प्रॉक्सी अनुरोध सफलतापूर्वक पूरा हो जाता है                                                    |
| `request.failed`          | सभी retries/fallback के बाद एक प्रॉक्सी अनुरोध विफल हो जाता है                                    |
| `quota.exceeded`          | एक API कुंजी budget/quota सीमा को पार कर जाती है                                                  |
| `proxy.set_aside`         | एक प्रॉक्सी पूल सदस्य को बार-बार इनकार करने के बाद अलग रखा जाता है (केवल संक्रमण)                 |
| `proxy.pool.exhausted`    | प्रॉक्सी पूल स्कोप के प्रत्येक सदस्य को अलग रखा गया है                                            |
| `provider.reset_redeemed` | स्वचालित रूप से लागू बैंक रीसेट को रीसेट क्रेडिट या Claude साप्ताहिक सत्र रीसेट से भुनाया जाता है |
| `test.ping`               | परीक्षण समापन बिंदु द्वारा प्रयुक्त सिंथेटिक घटना                                                 |

प्रत्येक ईवेंट प्राप्त करने के लिए सदस्यताएँ शाब्दिक `"*"` स्वीकार करती हैं। प्रेषण के समय `events` में अज्ञात ईवेंट नामों को अनदेखा कर दिया जाता है।

> ध्यान दें: डिस्पैचर API वायर्ड है, लेकिन कुछ गैर-`test.ping` घटनाओं के लिए उत्पादन कॉल साइटें अभी भी लैंडिंग कर रही हैं। यह देखने के लिए `grep dispatchEvent` की जाँच करें कि कौन से पथ वर्तमान में आपके रिलीज़ में डिस्पैचर को आमंत्रित करते हैं।

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

कॉल करने वाले के लिए डिस्पैच आग लगाओ और भूल जाओ: `Promise.allSettled` प्रति-वेबहुक त्रुटियों को निगल लेता है इसलिए एक खराब रिसीवर दूसरे को ब्लॉक नहीं कर सकता है।

## HMAC हस्ताक्षर

जब किसी वेबहुक में `secret` होता है, OmniRoute JSON बॉडी पर हस्ताक्षर करता है और भेजता है:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> हेडर नाम `X-Webhook-*` उपसर्ग का उपयोग करते हैं ( `X-OmniRoute-*` नहीं)। हस्ताक्षर मान `sha256=<hex>` है — पूर्ण उपसर्ग को सत्यापित करें।

यदि `createWebhook` को बिना किसी रहस्य के कॉल किया जाता है, तो DB मॉड्यूल एक (`whsec_<48 hex>`) उत्पन्न करता है, इसलिए सभी वेबहुक डिफ़ॉल्ट रूप से हस्ताक्षरित होते हैं।

### रिसीवर पर सत्यापन किया जा रहा है

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

हमेशा इसके विरुद्ध सत्यापन करें**कच्चा** किसी भी JSON पार्सिंग से पहले अनुरोध निकाय।

## पुनः प्रयास एवं विफलता नीति

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- प्रति प्रयास 10 सेकंड का टाइमआउट (`AbortController`)।
- HTTP 2xx को सफलता के रूप में गिना जाता है।
- HTTP 3xx/4xx गैर-पुन: प्रयास योग्य अंतिम स्थिति — के रूप में गिना जाता है जिसे `success = res.ok` के साथ डिलीवर किया गया है।
- HTTP 5xx और नेटवर्क त्रुटियों को घातीय बैकऑफ़ के साथ पुनः प्रयास किया जाता है: `2^attempt * 1000 ms` (1s, 2s, 4s)।
- `maxRetries` के बाद, डिलीवरी विफल के रूप में दर्ज की जाती है।
- प्रत्येक डिलीवरी `last_triggered_at`, `last_status` अपडेट करती है और या तो `failure_count` रीसेट या बढ़ाती है।
- डिस्पैचर प्रत्येक फैन-आउट के बाद `disableWebhooksWithHighFailures(10)` कॉल करता है, इसलिए `failure_count >= 10` वाला कोई भी वेबहुक स्वचालित रूप से अक्षम हो जाता है।

## डेटाबेस

तालिका `webhooks` (माइग्रेशन `011_webhooks.sql`):

| स्तंभ               | प्रकार  | टिप्पणियाँ                                         |
| ------------------- | ------- | -------------------------------------------------- |
| `id`                | TEXT PK | UUID                                               |
| `url`               | TEXT    | गंतव्य URL                                         |
| `events`            | TEXT    | JSON सरणी; डिफ़ॉल्ट `["*"]`                        |
| `secret`            | TEXT    | HMAC रहस्य (यदि नहीं दिया गया है तो स्वतः उत्पन्न) |
| `enabled`           | INT     | 0/1; डिफ़ॉल्ट 1                                    |
| `description`       | TEXT    | वैकल्पिक मानव लेबल                                 |
| `created_at`        | TEXT    | `datetime('now')`                                  |
| `last_triggered_at` | TEXT    | हर डिलीवरी प्रयास पर अपडेट किया गया                |
| `last_status`       | INT     | अंतिम प्रयास कीHTTP स्थिति (0 = नेटवर्क)           |
| `failure_count`     | INT     | सफलता पर 0 पर रीसेट होता है, विफलता पर + 1 पर      |

वितरण इतिहास `webhooks` पंक्ति पर समग्र काउंटरों के अलावा, समर्पित `webhook_deliveries` तालिका (माइग्रेशन `069_webhook_deliveries.sql`, हर प्रयास पर `src/lib/db/webhookDeliveries.ts::insertDelivery` के माध्यम से लिखा गया) में कायम रहता है। प्रकार का मेटाडेटा (Slack / Discord / Telegram / कस्टम पेलोड ट्रांसफार्मर) `070_webhooks_kind_metadata.sql` द्वारा जोड़ा गया था।

## REST API

सभी समापन बिंदुओं के लिए प्रबंधन प्रमाणीकरण (`requireManagementAuth`) की आवश्यकता होती है।

| endpoint                        | तरीका  | विवरण                                           |
| ------------------------------- | ------ | ----------------------------------------------- |
| `/api/webhooks`                 | GET    | वेबहुक की सूची बनाएं (रहस्य छिपा हुआ)           |
| `/api/webhooks`                 | POST   | वेबहुक बनाएं                                    |
| `/api/webhooks/[id]`            | GET    | वेबहुक विवरण (पूर्ण रहस्य)                      |
| `/api/webhooks/[id]`            | PUT    | फ़ील्ड अद्यतन करें                              |
| `/api/webhooks/[id]`            | DELETE | निकालना                                         |
| `/api/webhooks/[id]/test`       | POST   | एक `test.ping` फायर करें (कोई पुनः प्रयास नहीं) |
| `/api/webhooks/[id]/deliveries` | GET    | एक वेबहुक के लिए हाल ही में डिलीवरी के प्रयास   |
| `/api/webhooks/validate-url`    | POST   | उड़ान-पूर्व URL सत्यापन (SSRF गार्ड)            |

लिस्टिंग पेजों पर लीक से बचने के लिए `GET /api/webhooks` `<first 10 chars>...` के रहस्य को छिपा देता है। जब आपको वास्तव में रहस्य की आवश्यकता हो तो `[id]` GET उपयोग करें।

### वेबहुक बनाएं

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

यदि `secret` को छोड़ दिया जाता है, तो सर्वर एक `whsec_<hex>` रहस्य उत्पन्न करता है और इसे प्रतिक्रिया में लौटाता है।

### वेबहुक का परीक्षण करें

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` लौटाता है. किसी पुनः प्रयास का प्रयास नहीं किया जाता है। — यह शीघ्रता से सत्यापित करने के लिए उपयोगी है कि रिसीवर पेलोड और हस्ताक्षर स्वीकार करता है।

## डैशबोर्ड

`/dashboard/webhooks` पर डैशबोर्ड पृष्ठ ( `src/app/(dashboard)/dashboard/webhooks/page.tsx` देखें) प्रदान करता है:

- इवेंट पिकर के साथ Create/edit वेबहुक
- `enabled`, `failure_count` और `last_status` पर आधारित स्थिति संकेतक (सक्रिय/निष्क्रिय/त्रुटि)।
- एक-क्लिक परीक्षण वितरण
- मैनुअल enable/disable टॉगल

## पेलोड उदाहरण

### अनुरोध.पूर्ण

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

गैर-`test.ping` घटनाओं के लिए फ़ील्ड आकार उन कॉल साइटों द्वारा परिभाषित किए जाते हैं जो उन्हें उत्सर्जित करते हैं; `data` ऑब्जेक्ट को फॉरवर्ड-संगत मानें (फ़ील्ड जोड़ें, अनुपस्थिति पर निर्भर न हों)।

## सर्वोत्तम प्रथाएं

- **प्रत्येक डिलीवरी पर हस्ताक्षर सत्यापित करें** कच्ची बॉडी के विरुद्ध — आपके वेबहुक URL अनुमान लगाने वाले किसी भी व्यक्ति से नकली POSTs रोकता है।
- **~ 5 सेकंड के भीतर 2xx का उत्तर दें** — डिस्पैचर का समय 10 सेकंड पर समाप्त हो जाता है। धीमे रिसीवर पुनः प्रयास करेंगे और `failure_count` बढ़ाएंगे।
- **संचालकों को निष्क्रिय बनाओ** — पुनर्प्रयास और कम से कम एक बार डिलीवरी शब्दार्थ का मतलब है कि डुप्लिकेट संभव है।
- **न्यूनतम सदस्यता लें** — केवल उन घटनाओं को सूचीबद्ध करता है जिनका आप वास्तव में उपभोग करते हैं; `"*"` उन रिसीवरों पर लागत जोड़ देगा जिन पर आपका नियंत्रण नहीं है।
- **`failure_count` देखें** — एंडपॉइंट लगातार 10 विफलताओं पर स्वतः अक्षम हो जाते हैं; रिसीवर को ठीक करने के बाद `enabled: true` के साथ `PUT /api/webhooks/[id]` कॉल करके रीसेट करें।
- **रहस्यों को समय-समय पर घुमाएँ** — `PUT` एक नया `secret`, रिसीवर पर नया मान तैनात करें, और परीक्षण समापन बिंदु के माध्यम से पुष्टि करें।

## यह भी देखें

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — पूर्ण प्रबंधन API सतह
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — सर्किट ब्रेकर / प्रदाता विफलताओं के पीछे कूलडाउन शब्दार्थ `request.failed` के माध्यम से सामने आए
- स्रोत: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
