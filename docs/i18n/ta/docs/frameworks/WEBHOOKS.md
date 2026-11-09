# Webhooks (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **உண்மையின் ஆதாரம்:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**கடைசியாக புதுப்பிக்கப்பட்டது:** 2026-06-28 — v3.8.40

OmniRoute இயங்குதள நிகழ்வுகளில் HTTP வெப்ஹூக்குகளை இயக்க முடியும். Slack, PagerDuty, டேட்டாடாக், உள் எச்சரிக்கை சேவைகள் அல்லது ஏதேனும் HTTP ரிசீவருடன் ஒருங்கிணைக்க அவற்றைப் பயன்படுத்தவும்.

அனுப்பியவர் ஒவ்வொரு டெலிவரிக்கும் HMAC-SHA256 உடன் கையொப்பமிடுகிறார், தற்காலிக தோல்விகளை மீண்டும் முயற்சிக்கிறார், ஒரு வெப்ஹூக்கிற்கான டெலிவரி ஆரோக்கியத்தைக் கண்காணிக்கிறார் மற்றும் தொடர்ந்து தோல்வியடையும் முனைப்புள்ளிகளைத் தானாக முடக்குகிறார்.

## ஆதரிக்கப்படும் நிகழ்வுகள்

`WebhookEvent` வகை (`src/lib/webhooks/eventDescriptions.ts`, `src/lib/webhookDispatcher.ts` ஆல் உட்கொள்ளப்படுகிறது ) தற்போது ஏழு நிகழ்வுகளை மாதிரியாகக் கொண்டுள்ளது:

| நிகழ்வு                   | எப்போது சுடுகிறது                                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `request.completed`       | ப்ராக்ஸி கோரிக்கை வெற்றிகரமாக முடிந்தது                                                                                        |
| `request.failed`          | அனைத்து retries/fallback க்குப் பிறகும் ப்ராக்ஸி கோரிக்கை தோல்வியடைகிறது                                                       |
| `quota.exceeded`          | API விசை budget/quota வரம்பை கடக்கிறது                                                                                         |
| `proxy.set_aside`         | ப்ராக்ஸி பூல் உறுப்பினர் மீண்டும் மீண்டும் மறுத்த பிறகு ஒதுக்கி வைக்கப்படுகிறார் (மாற்றம் மட்டும்)                             |
| `proxy.pool.exhausted`    | ப்ராக்ஸி பூல் ஸ்கோப்பின் ஒவ்வொரு உறுப்பினரும் ஒதுக்கப்பட்டுள்ளனர்                                                              |
| `provider.reset_redeemed` | தானாக விண்ணப்பிக்கும் வங்கி மீட்டமைப்புகள் மீட்டமைக்கப்பட்ட கிரெடிட்டை அல்லது Claude வாராந்திர அமர்வு மீட்டமைப்பை மீட்டெடுத்தன |
| `test.ping`               | சோதனை முடிவுப் புள்ளியால் பயன்படுத்தப்படும் செயற்கை நிகழ்வு                                                                    |

ஒவ்வொரு நிகழ்வையும் பெற சந்தாக்கள் நேரடியான `"*"` ஏற்றுக்கொள்கின்றன. `events` இல் தெரியாத நிகழ்வு பெயர்கள் அனுப்பும் நேரத்தில் புறக்கணிக்கப்படும்.

> குறிப்பு: அனுப்பிய API கம்பியில் உள்ளது, ஆனால்`test.ping` அல்லாத சில நிகழ்வுகளுக்கான தயாரிப்பு அழைப்பு தளங்கள் இன்னும் இறங்குகின்றன. உங்கள் வெளியீட்டில் தற்போது எந்தப் பாதைகள் அனுப்புபவரை அழைக்கின்றன என்பதைப் பார்க்க `grep dispatchEvent` சரிபார்க்கவும்.

## கட்டிடக்கலை

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

டிஸ்பாட்ச் என்பது அழைப்பாளருக்கு தீ மற்றும் மறந்துவிடு: `Promise.allSettled` ஒவ்வொரு வெப்ஹூக் பிழைகளை விழுங்குகிறது, அதனால் ஒரு மோசமான பெறுநரால் மற்றவர்களைத் தடுக்க முடியாது.

## HMAC கையொப்பமிடுதல்

வெப்ஹூக்கில் `secret` இருந்தால், OmniRoute JSON உடலில் கையொப்பமிட்டு அனுப்புகிறது:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> தலைப்புப் பெயர்கள் `X-Webhook-*` முன்னொட்டைப் பயன்படுத்துகின்றன ( `X-OmniRoute-*` அல்ல). கையொப்ப மதிப்பு `sha256=<hex>` — முழு முன்னொட்டை சரிபார்க்கவும்.

`createWebhook` ரகசியம் இல்லாமல் அழைக்கப்பட்டால், DB தொகுதி ஒன்று (`whsec_<48 hex>`) உருவாக்குகிறது, எனவே அனைத்து வெப்ஹூக்குகளும் இயல்பாக கையொப்பமிடப்படும்.

### ரிசீவரில் சரிபார்க்கிறது

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

எதிராக எப்போதும் சரிபார்க்கவும்**மூல** எந்த JSON பாகுபடுத்துதலுக்கும் முன், உடலைக் கோரவும்.

## மீண்டும் முயற்சி & தோல்வி கொள்கை

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- ஒரு முயற்சிக்கு 10 வினாடி நேரம் முடிந்தது (`AbortController`).
- HTTP 2xx வெற்றியாகக் கருதப்படுகிறது.
- HTTP 3xx/4xx மீண்டும் முயற்சிக்க முடியாத இறுதி நிலை — என `success = res.ok` உடன் வழங்கப்பட்டதாகக் கணக்கிடப்படுகிறது.
- HTTP 5xx மற்றும் நெட்வொர்க் பிழைகள் அதிவேக பேக்ஆஃப் மூலம் மீண்டும் முயற்சிக்கப்படுகின்றன: `2^attempt * 1000 ms` (1s, 2s, 4s).
- `maxRetries` க்குப் பிறகு, டெலிவரி தோல்வியடைந்ததாகப் பதிவுசெய்யப்பட்டது.
- ஒவ்வொரு விநியோகமும் `last_triggered_at`, `last_status` ஆகியவற்றைப் புதுப்பிக்கிறது மற்றும் `failure_count` மீட்டமைக்கிறது அல்லது அதிகரிக்கிறது.
- ஒவ்வொரு ஃபேன்-அவுட்டுக்குப் பிறகும் அனுப்பியவர் `disableWebhooksWithHighFailures(10)` அழைக்கிறார், எனவே `failure_count >= 10` உடனான எந்த வெப்ஹூக்கும் தானாகவே முடக்கப்படும்.

## தரவுத்தளம்

அட்டவணை `webhooks` (இடம்பெயர்வு `011_webhooks.sql`):

| நெடுவரிசை           | வகை     | குறிப்புகள்                                               |
| ------------------- | ------- | --------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                      |
| `url`               | TEXT    | இலக்கு URL                                                |
| `events`            | TEXT    | JSON வரிசை; இயல்புநிலை `["*"]`                            |
| `secret`            | TEXT    | HMAC ரகசியம் (கொடுக்கப்படாவிட்டால் தானாக உருவாக்கப்படும்) |
| `enabled`           | INT     | 0/1; இயல்புநிலை 1                                         |
| `description`       | TEXT    | விருப்பமான மனித லேபிள்                                    |
| `created_at`        | TEXT    | `datetime('now')`                                         |
| `last_triggered_at` | TEXT    | ஒவ்வொரு டெலிவரி முயற்சியிலும் புதுப்பிக்கப்படும்          |
| `last_status`       | INT     | கடைசி முயற்சியின்HTTP நிலை (0 = நெட்வொர்க்)               |
| `failure_count`     | INT     | வெற்றியில் 0, தோல்வியில் + 1 என மீட்டமைக்கப்படும்         |

`webhooks` வரிசையில் உள்ள மொத்த கவுண்டர்களுக்கு கூடுதலாக, பிரத்யேக `webhook_deliveries` அட்டவணையில் (இடம்பெயர்வு `069_webhook_deliveries.sql`, ஒவ்வொரு முயற்சியிலும் `src/lib/db/webhookDeliveries.ts::insertDelivery` வழியாக எழுதப்பட்டது) டெலிவரி வரலாறு தொடரும். வகையான மெட்டாடேட்டா (Slack / Discord / Telegram / தனிப்பயன் பேலோட் டிரான்ஸ்பார்மர்கள்) `070_webhooks_kind_metadata.sql` ஆல் சேர்க்கப்பட்டது.

## REST API

அனைத்து இறுதிப்புள்ளிகளுக்கும் மேலாண்மை அங்கீகாரம் (`requireManagementAuth`) தேவை.

| இறுதிப்புள்ளி                   | முறை   | விளக்கம்                                              |
| ------------------------------- | ------ | ----------------------------------------------------- |
| `/api/webhooks`                 | GET    | வெப்ஹூக்குகளைப் பட்டியலிடு (மறைக்கப்பட்ட இரகசியங்கள்) |
| `/api/webhooks`                 | POST   | வெப்ஹூக்கை உருவாக்கவும்                               |
| `/api/webhooks/[id]`            | GET    | Webhook விவரம் (முழு ரகசியம்)                         |
| `/api/webhooks/[id]`            | PUT    | புலங்களைப் புதுப்பிக்கவும்                            |
| `/api/webhooks/[id]`            | DELETE | அகற்று                                                |
| `/api/webhooks/[id]/test`       | POST   | ஒரு `test.ping` இயக்கவும் (மீண்டும் முயற்சி இல்லை)    |
| `/api/webhooks/[id]/deliveries` | GET    | ஒரு webhook க்கான சமீபத்திய டெலிவரி முயற்சிகள்        |
| `/api/webhooks/validate-url`    | POST   | விமானத்திற்கு முந்தைய URL சரிபார்ப்பு (SSRF காவலர்)   |

பட்டியல் பக்கங்களில் கசிவதைத் தவிர்க்க `GET /api/webhooks` `<first 10 chars>...` இன் ரகசியத்தை மறைக்கிறது. உங்களுக்கு உண்மையில் ரகசியம் தேவைப்படும்போது `[id]` GET ஐப் பயன்படுத்தவும்.

### வெப்ஹூக்கை உருவாக்கவும்

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

`secret` தவிர்க்கப்பட்டால், சேவையகம் `whsec_<hex>` ரகசியத்தை உருவாக்கி அதை பதிலில் வழங்கும்.

### சோதனை வெப்ஹூக்

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

திரும்புகிறது `{ delivered, status, error }`. ரிசீவர் பேலோட் மற்றும் கையொப்பத்தை ஏற்றுக்கொள்கிறார் என்பதை விரைவாகச் சரிபார்க்க — பயனுள்ளதாக இருக்கும்.

## டாஷ்போர்டு

`/dashboard/webhooks` இல் உள்ள டாஷ்போர்டு பக்கம் ( `src/app/(dashboard)/dashboard/webhooks/page.tsx` பார்க்கவும்) வழங்குகிறது:

- Create/edit வெப்ஹூக்குகள் நிகழ்வுத் தேர்வி
- `enabled`, `failure_count`, மற்றும் `last_status` அடிப்படையில் நிலை காட்டி (செயலில் / செயலற்ற / பிழை)
- ஒரு கிளிக் சோதனை டெலிவரி
- கைமுறை enable/disable நிலைமாற்றம்

## பேலோட் எடுத்துக்காட்டுகள்

### கோரிக்கை.முடிந்தது

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

`test.ping` அல்லாத நிகழ்வுகளுக்கான புல வடிவங்கள் அவற்றை வெளியிடும் அழைப்பு தளங்களால் வரையறுக்கப்படுகின்றன; `data` பொருளை முன்னோக்கி-இணக்கமானதாகக் கருதுங்கள் (புலங்களைச் சேர்க்கவும், இல்லாததைச் சார்ந்திருக்க வேண்டாம்).

## சிறந்த நடைமுறைகள்

- **ஒவ்வொரு விநியோகத்திலும் கையொப்பத்தைச் சரிபார்க்கவும்** உங்கள் வெப்ஹூக்கை URL யூகிக்கும் எவரிடமிருந்தும் ஏமாற்றப்பட்ட POSTs — தடுக்கிறது.
- **~ 5 வினாடிகளுக்குள் 2xx பதிலளிக்கவும்** — அனுப்பியவர் 10 வினாடிகளில் வெளியேறுகிறார். மெதுவான பெறுநர்கள் மீண்டும் முயற்சி செய்து `failure_count` உயர்த்தும்.
- **கையாளுபவர்களை திறமையற்றவர்களாக ஆக்குங்கள்** — மறுமுயற்சிகள் மற்றும் குறைந்த பட்சம் ஒரு முறை டெலிவரி செமாண்டிக்ஸ் அதாவது நகல் சாத்தியம்.
- **குறைந்த பட்சம் குழுசேரவும்** நீங்கள் உண்மையில் உட்கொள்ளும் நிகழ்வுகளை மட்டுமே — பட்டியலிடுகிறது; நீங்கள் கட்டுப்படுத்தாத ரிசீவர்களில் `"*"` விலையைச் சேர்க்கும்.
- **`failure_count` பார்க்கவும்** — இறுதிப்புள்ளிகள் 10 தொடர்ச்சியான தோல்விகளில் தானாக முடக்கப்படும்; ரிசீவரை சரிசெய்த பிறகு `PUT /api/webhooks/[id]` உடன் `enabled: true` ஐ அழைப்பதன் மூலம் மீட்டமைக்கவும்.
- **ரகசியங்களை அவ்வப்போது சுழற்றுங்கள்** — `PUT` ஒரு புதிய `secret`, புதிய மதிப்பை பெறுநருக்கு வரிசைப்படுத்தி, சோதனை முடிவுப் புள்ளி வழியாக உறுதிப்படுத்தவும்.

## மேலும் பார்க்கவும்

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — முழு மேலாண்மை API மேற்பரப்பு
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — சர்க்யூட் பிரேக்கர் / வழங்குநர் தோல்விகளுக்குப் பின்னால் உள்ள கூல்டவுன் செமாண்டிக்ஸ் `request.failed` வழியாக வெளிப்பட்டது
- ஆதாரம்: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
