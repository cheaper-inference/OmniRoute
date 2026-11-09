# Webhooks (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **સત્યનો સ્ત્રોત:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**છેલ્લે અપડેટ કર્યું:** 2026-06-28 — v3.8.40

OmniRoute પ્લેટફોર્મ ઇવેન્ટ્સ પર HTTP વેબહુક્સને ફાયર કરી શકે છે. Slack, PagerDuty, Datadog, આંતરિક ચેતવણી સેવાઓ અથવા કોઈપણ HTTP રીસીવર સાથે સંકલિત કરવા માટે તેનો ઉપયોગ કરો.

ડિસ્પેચર દરેક ડિલિવરીને HMAC-SHA256 વડે સહી કરે છે, ક્ષણિક નિષ્ફળતાઓ પર ફરીથી પ્રયાસ કરે છે, વેબહૂક દીઠ ડિલિવરી આરોગ્યને ટ્રૅક કરે છે અને નિષ્ફળ થતા જ રહેલા એન્ડપોઇન્ટને સ્વતઃ-અક્ષમ કરે છે.

## સપોર્ટેડ ઇવેન્ટ્સ

`WebhookEvent` પ્રકાર (`src/lib/webhooks/eventDescriptions.ts`, `src/lib/webhookDispatcher.ts` દ્વારા ઉપયોગમાં લેવાય છે) હાલમાં સાત ઇવેન્ટ્સનું મોડેલ કરે છે:

| ઘટના                      | જ્યારે આગ લાગે છે                                                                       |
| ------------------------- | --------------------------------------------------------------------------------------- |
| `request.completed`       | પ્રોક્સી વિનંતી સફળતાપૂર્વક પૂર્ણ થાય છે                                                |
| `request.failed`          | તમામ retries/fallback પછી પ્રોક્સી વિનંતી નિષ્ફળ જાય છે                                 |
| `quota.exceeded`          | API કી budget/quota થ્રેશોલ્ડને પાર કરે છે                                              |
| `proxy.set_aside`         | વારંવારના ઇનકાર પછી પ્રોક્સી પૂલ સભ્યને અલગ રાખવામાં આવે છે (ફક્ત સંક્રમણ)              |
| `proxy.pool.exhausted`    | પ્રોક્સી પૂલ સ્કોપના દરેક સભ્યને અલગ રાખવામાં આવ્યા છે                                  |
| `provider.reset_redeemed` | રિસેટ ક્રેડિટ અથવા Claude સાપ્તાહિક સત્ર રીસેટ રિડીમ કરેલ બેંક્ડ રીસેટ્સ સ્વતઃ લાગુ કરો |
| `test.ping`               | ટેસ્ટ એન્ડપોઇન્ટ દ્વારા ઉપયોગમાં લેવાતી સિન્થેટિક ઇવેન્ટ                                |

સબ્સ્ક્રિપ્શન્સ દરેક ઇવેન્ટ પ્રાપ્ત કરવા માટે શાબ્દિક `"*"` સ્વીકારે છે. `events` માં અજાણ્યા ઇવેન્ટના નામોને ડિસ્પેચ સમયે અવગણવામાં આવે છે.

> નોંધ: ડિસ્પેચર API વાયર્ડ છે, પરંતુ કેટલીક બિન-`test.ping` ઇવેન્ટ્સ માટે પ્રોડક્શન કૉલ સાઇટ્સ હજુ પણ ઉતરી રહી છે. તમારા પ્રકાશનમાં હાલમાં કયા પાથ ડિસ્પેચરને બોલાવે છે તે જોવા માટે `grep dispatchEvent` તપાસો.

## આર્કિટેક્ચર

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

કોલર માટે ડિસ્પેચ ફાયર એન્ડ ફર્ગેટ છે: `Promise.allSettled` પ્રતિ-વેબહુક ભૂલોને ગળી જાય છે જેથી એક ખરાબ રીસીવર અન્યને બ્લોક કરી શકતો નથી.

## HMAC હસ્તાક્ષર

જ્યારે વેબહૂક પાસે `secret` હોય, ત્યારે OmniRoute JSON બોડી પર સહી કરે છે અને મોકલે છે:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> હેડર નામો `X-Webhook-*` ઉપસર્ગનો ઉપયોગ કરે છે ( `X-OmniRoute-*` નહીં). સહી મૂલ્ય `sha256=<hex>` — છે સંપૂર્ણ ઉપસર્ગ ચકાસો.

જો `createWebhook` ને ગુપ્ત વગર બોલાવવામાં આવે, તો DB મોડ્યુલ એક (`whsec_<48 hex>`) જનરેટ કરે છે જેથી તમામ વેબહુક્સ ડિફોલ્ટ રૂપે સહી કરવામાં આવે છે.

### રીસીવર પર ચકાસણી

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

હંમેશા સામે ચકાસો**કાચું** કોઈપણ JSON પાર્સિંગ પહેલાં, મુખ્ય ભાગની વિનંતી કરો.

## ફરીથી પ્રયાસ કરો અને નિષ્ફળતા નીતિ

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- પ્રયાસ દીઠ 10 સેકન્ડ સમયસમાપ્તિ (`AbortController`).
- HTTP 2xx સફળતા તરીકે ગણાય છે.
- HTTP 3xx/4xx `success = res.ok` સાથે વિતરિત થયા મુજબ નોંધાયેલ — ફરી પ્રયાસ ન કરી શકાય તેવી અંતિમ સ્થિતિ તરીકે ગણાય છે.
- HTTP 5xx અને નેટવર્ક ભૂલોનો ઘાતાંકીય બેકઓફ સાથે ફરીથી પ્રયાસ કરવામાં આવે છે: `2^attempt * 1000 ms` (1s, 2s, 4s).
- `maxRetries` પછી, ડિલિવરી નિષ્ફળ તરીકે રેકોર્ડ કરવામાં આવે છે.
- દરેક ડિલિવરી `last_triggered_at`, `last_status` અપડેટ કરે છે અને કાં તો `failure_count` ફરીથી સેટ કરે છે અથવા વધારો કરે છે.
- ડિસ્પેચર દરેક ફેન-આઉટ પછી `disableWebhooksWithHighFailures(10)` કૉલ કરે છે, તેથી `failure_count >= 10` સાથેનો કોઈપણ વેબહૂક આપમેળે અક્ષમ થઈ જાય છે.

## ડેટાબેઝ

કોષ્ટક `webhooks` (માઇગ્રેશન `011_webhooks.sql`):

| કૉલમ                | પ્રકાર  | નોંધો                                               |
| ------------------- | ------- | --------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                |
| `url`               | TEXT    | ગંતવ્ય URL                                          |
| `events`            | TEXT    | JSON એરે; ડિફોલ્ટ `["*"]`                           |
| `secret`            | TEXT    | HMAC ગુપ્ત (જો આપવામાં ન આવે તો સ્વતઃ જનરેટ થાય છે) |
| `enabled`           | INT     | 0/1; 1 માટે ડિફોલ્ટ                                 |
| `description`       | TEXT    | વૈકલ્પિક માનવ લેબલ                                  |
| `created_at`        | TEXT    | `datetime('now')`                                   |
| `last_triggered_at` | TEXT    | દરેક ડિલિવરી પ્રયાસ પર અપડેટ                        |
| `last_status`       | INT     | છેલ્લા પ્રયાસનીHTTP સ્થિતિ (0 = નેટવર્ક)            |
| `failure_count`     | INT     | સફળતા પર 0, નિષ્ફળતા પર + 1 પર ફરીથી સેટ કરો        |

`webhooks` પંક્તિ પર એકંદર કાઉન્ટર્સ ઉપરાંત, ડિલિવરી ઇતિહાસ સમર્પિત `webhook_deliveries` કોષ્ટકમાં ચાલુ રહે છે (માઇગ્રેશન `069_webhook_deliveries.sql`, દરેક પ્રયાસ પર `src/lib/db/webhookDeliveries.ts::insertDelivery` દ્વારા લખવામાં આવે છે). પ્રકારનો મેટાડેટા (Slack / Discord / Telegram / કસ્ટમ પેલોડ ટ્રાન્સફોર્મર્સ) `070_webhooks_kind_metadata.sql` દ્વારા ઉમેરવામાં આવ્યો હતો.

## REST API

બધા એન્ડપોઇન્ટ્સને મેનેજમેન્ટ ઓથ (`requireManagementAuth`) ની જરૂર છે.

| અંતિમ બિંદુ                     | પદ્ધતિ | વર્ણન                                      |
| ------------------------------- | ------ | ------------------------------------------ |
| `/api/webhooks`                 | GET    | વેબહુક્સની સૂચિ બનાવો (રહસ્યો ઢંકાયેલા)    |
| `/api/webhooks`                 | POST   | વેબહૂક બનાવો                               |
| `/api/webhooks/[id]`            | GET    | વેબહૂકની વિગતો (સંપૂર્ણ રહસ્ય)             |
| `/api/webhooks/[id]`            | PUT    | ફીલ્ડ અપડેટ કરો                            |
| `/api/webhooks/[id]`            | DELETE | દૂર કરો                                    |
| `/api/webhooks/[id]/test`       | POST   | `test.ping` ફાયર કરો (કોઈ પુનઃપ્રયાસ નહીં) |
| `/api/webhooks/[id]/deliveries` | GET    | એક વેબહૂક માટે તાજેતરના વિતરણ પ્રયાસો      |
| `/api/webhooks/validate-url`    | POST   | પ્રી-ફ્લાઇટ URL માન્યતા (SSRF ગાર્ડ)       |

`GET /api/webhooks` લિસ્ટિંગ પૃષ્ઠો પર લીક થવાથી બચવા માટે `<first 10 chars>...` ને ગુપ્ત રાખે છે. જ્યારે તમને ખરેખર રહસ્યની જરૂર હોય ત્યારે `[id]` GET નો ઉપયોગ કરો.

### વેબહૂક બનાવો

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

જો `secret` અવગણવામાં આવે છે, તો સર્વર `whsec_<hex>` સિક્રેટ જનરેટ કરે છે અને તેને પ્રતિસાદમાં પરત કરે છે.

### વેબહૂકનું પરીક્ષણ કરો

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` પરત કરે છે. રીસીવર પેલોડ અને હસ્તાક્ષર સ્વીકારે છે તે ઝડપથી માન્ય કરવા માટે — ઉપયોગી કોઈ પુનઃપ્રયાસ કરવાનો પ્રયાસ કરવામાં આવતો નથી.

## ડેશબોર્ડ

`/dashboard/webhooks` પર ડેશબોર્ડ પેજ (જુઓ `src/app/(dashboard)/dashboard/webhooks/page.tsx`) આપે છે:

- ઇવેન્ટ પીકર સાથેCreate/edit વેબહુક્સ
- `enabled`, `failure_count`, અને `last_status` પર આધારિત સ્થિતિ સૂચક (સક્રિય / નિષ્ક્રિય / ભૂલ થયેલ)
- એક-ક્લિક ટેસ્ટ ડિલિવરી
- મેન્યુઅલ enable/disable ટૉગલ

## પેલોડ ઉદાહરણો

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

### ટેસ્ટ.પિંગ

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

બિન-`test.ping` ઇવેન્ટ્સ માટે ફીલ્ડ આકારો કૉલ સાઇટ્સ દ્વારા વ્યાખ્યાયિત કરવામાં આવે છે જે તેમને ઉત્સર્જન કરે છે; `data` ઑબ્જેક્ટને ફોરવર્ડ-સુસંગત ગણો (ફીલ્ડ ઉમેરો, ગેરહાજરી પર આધાર રાખશો નહીં).

## શ્રેષ્ઠ વ્યવહાર

- **દરેક ડિલિવરી પર સહી ચકાસો** કાચા શરીરની વિરુદ્ધ — તમારા વેબહૂક URL અનુમાન લગાવનાર કોઈપણ વ્યક્તિ પાસેથી નકલી POSTs અટકાવે છે.
- **~ 5 સેકન્ડમાં 2xx પ્રતિસાદ આપો** — ડિસ્પેચરનો સમય 10 સે. ધીમા રીસીવરો ફરી પ્રયાસો ખાશે અને `failure_count` ફૂલાવશે.
- **હેન્ડલર્સને અશક્તિમાન બનાવો** — ફરી પ્રયાસો અને ઓછામાં ઓછા એક વખત ડિલિવરી સિમેન્ટિક્સનો અર્થ છે કે ડુપ્લિકેટ્સ શક્ય છે.
- **ન્યૂનતમ સબ્સ્ક્રાઇબ કરો** — ફક્ત ઇવેન્ટ્સની સૂચિ આપે છે જેનો તમે ખરેખર ઉપયોગ કરો છો; `"*"` તમે જે રીસીવરોને નિયંત્રિત કરતા નથી તેના પર ખર્ચ ઉમેરશે.
- **`failure_count` જુઓ** — એન્ડપોઇન્ટ્સ સતત 10 નિષ્ફળતા પર સ્વતઃ-અક્ષમ થાય છે; રીસીવરને ઠીક કર્યા પછી `PUT /api/webhooks/[id]` `enabled: true` સાથે કૉલ કરીને ફરીથી સેટ કરો.
- **સમયાંતરે રહસ્યો ફેરવો** — `PUT` એક નવું `secret`, રીસીવરને નવું મૂલ્ય જમાવો અને ટેસ્ટ એન્ડપોઇન્ટ દ્વારા પુષ્ટિ કરો.

## આ પણ જુઓ

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — સંપૂર્ણ સંચાલન API સપાટી
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — સર્કિટ બ્રેકર / પ્રદાતાની નિષ્ફળતા પાછળના કૂલડાઉન સિમેન્ટિક્સ `request.failed` દ્વારા સપાટી પર આવ્યા
- સ્ત્રોત: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
