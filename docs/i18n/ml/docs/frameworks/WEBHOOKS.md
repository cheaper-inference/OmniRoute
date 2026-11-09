# Webhooks (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **സത്യത്തിൻ്റെ ഉറവിടം:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**അവസാനം അപ്ഡേറ്റ് ചെയ്തത്:** 2026-06-28 — v3.8.40

OmniRoute പ്ലാറ്റ്ഫോം ഇവൻ്റുകളിൽ HTTP വെബ്ഹുക്കുകൾ വെടിവയ്ക്കാൻ കഴിയും. Slack, PagerDuty, Datadog, ആന്തരിക അലേർട്ടിംഗ് സേവനങ്ങൾ അല്ലെങ്കിൽ ഏതെങ്കിലും HTTP റിസീവർ എന്നിവയുമായി സംയോജിപ്പിക്കാൻ അവ ഉപയോഗിക്കുക.

ഡിസ്പാച്ചർ ഓരോ ഡെലിവറിയിലും HMAC-SHA256 ഉപയോഗിച്ച് ഒപ്പിടുന്നു, ക്ഷണികമായ പരാജയങ്ങളിൽ വീണ്ടും ശ്രമിക്കുന്നു, ഓരോ വെബ്ഹൂക്കിലും ഡെലിവറി ആരോഗ്യം ട്രാക്ക് ചെയ്യുന്നു, തുടർച്ചയായി പരാജയപ്പെടുന്ന എൻഡ് പോയിൻ്റുകൾ സ്വയമേവ പ്രവർത്തനരഹിതമാക്കുന്നു.

## പിന്തുണയ്ക്കുന്ന ഇവൻ്റുകൾ

`WebhookEvent` തരം (`src/lib/webhooks/eventDescriptions.ts`, `src/lib/webhookDispatcher.ts` ഉപയോഗിക്കുന്നു) നിലവിൽ ഏഴ് ഇവൻ്റുകൾ മാതൃകയാക്കുന്നു:

| സംഭവം                     | എപ്പോൾ തീ                                                                                                              |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | ഒരു പ്രോക്സിഡ് അഭ്യർത്ഥന വിജയകരമായി പൂർത്തിയായി                                                                        |
| `request.failed`          | എല്ലാ retries/fallback നും ശേഷം ഒരു പ്രോക്സിഡ് അഭ്യർത്ഥന പരാജയപ്പെടുന്നു                                               |
| `quota.exceeded`          | ഒരു API കീ ഒരു budget/quota പരിധി കടക്കുന്നു                                                                           |
| `proxy.set_aside`         | ആവർത്തിച്ചുള്ള നിരസിച്ചതിന് ശേഷം ഒരു പ്രോക്സി പൂൾ അംഗം മാറ്റിവെക്കുന്നു (പരിവർത്തനം മാത്രം)                            |
| `proxy.pool.exhausted`    | ഒരു പ്രോക്സി പൂൾ സ്കോപ്പിലെ എല്ലാ അംഗങ്ങളെയും മാറ്റി വെച്ചിരിക്കുന്നു                                                  |
| `provider.reset_redeemed` | സ്വയമേവ പ്രയോഗിക്കുന്ന ബാങ്ക് റീസെറ്റുകൾ ഒരു റീസെറ്റ് ക്രെഡിറ്റ് അല്ലെങ്കിൽ Claude പ്രതിവാര സെഷൻ റീസെറ്റ് റിഡീം ചെയ്തു |
| `test.ping`               | ടെസ്റ്റ് എൻഡ് പോയിൻ്റ് ഉപയോഗിക്കുന്ന സിന്തറ്റിക് ഇവൻ്റ്                                                                |

ഓരോ ഇവൻ്റും സ്വീകരിക്കുന്നതിന് സബ്സ്ക്രിപ്ഷനുകൾ അക്ഷരാർത്ഥത്തിലുള്ള `"*"` സ്വീകരിക്കുന്നു. `events` യിലെ അജ്ഞാത ഇവൻ്റ് പേരുകൾ ഡിസ്പാച്ച് സമയത്ത് അവഗണിക്കപ്പെടും.

> ശ്രദ്ധിക്കുക: ഡിസ്പാച്ചർ API വയർഡ് ആണ്, എന്നാൽ `test.ping` അല്ലാത്ത ചില ഇവൻ്റുകളുടെ പ്രൊഡക്ഷൻ കോൾ സൈറ്റുകൾ ഇപ്പോഴും ലാൻഡിംഗ് തുടരുകയാണ്. നിങ്ങളുടെ റിലീസിൽ നിലവിൽ ഏതൊക്കെ പാതകളാണ് ഡിസ്പാച്ചറിനെ അഭ്യർത്ഥിക്കുന്നതെന്ന് കാണാൻ `grep dispatchEvent` പരിശോധിക്കുക.

## വാസ്തുവിദ്യ

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

ഡിസ്പാച്ച് എന്നത് വിളിക്കുന്നയാൾക്ക് തീയും മറക്കലും ആണ്: `Promise.allSettled` ഓരോ വെബ്ഹുക്കും പിശകുകൾ വിഴുങ്ങുന്നു, അതിനാൽ ഒരു മോശം റിസീവറിന് മറ്റുള്ളവരെ തടയാൻ കഴിയില്ല.

## HMAC ഒപ്പിടൽ

ഒരു വെബ്ഹുക്കിന് `secret` ഉള്ളപ്പോൾ, OmniRoute JSON ബോഡിയിൽ ഒപ്പിട്ട് അയയ്ക്കുന്നു:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> ഹെഡർ നാമങ്ങൾ `X-Webhook-*` പ്രിഫിക്സ് ഉപയോഗിക്കുന്നു ( `X-OmniRoute-*` അല്ല). സിഗ്നേച്ചർ മൂല്യം `sha256=<hex>` — ആണ് പൂർണ്ണ പ്രിഫിക്സ് പരിശോധിക്കുക.

ഒരു രഹസ്യവുമില്ലാതെ `createWebhook` എന്ന് വിളിക്കുകയാണെങ്കിൽ, DB മൊഡ്യൂൾ ഒന്ന് (`whsec_<48 hex>`) സൃഷ്ടിക്കുന്നു, അതിനാൽ എല്ലാ വെബ്ഹൂക്കുകളും സ്ഥിരസ്ഥിതിയായി ഒപ്പിടും.

### റിസീവറിൽ പരിശോധിക്കുന്നു

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

എന്നതിനെതിരെ എപ്പോഴും സ്ഥിരീകരിക്കുക **അസംസ്കൃത** ഏതെങ്കിലും JSON പാഴ്സിംഗിന് മുമ്പ് ബോഡി അഭ്യർത്ഥിക്കുക.

## വീണ്ടും ശ്രമിക്കൂ & പരാജയം നയം

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- ഓരോ ശ്രമത്തിനും 10 സെക്കൻഡ് ടൈംഔട്ട് (`AbortController`).
- HTTP 2xx വിജയമായി കണക്കാക്കുന്നു.
- HTTP 3xx/4xx `success = res.ok` ഉപയോഗിച്ച് ഡെലിവർ ചെയ്തിരിക്കുന്ന — റെക്കോർഡ് ചെയ്ത, വീണ്ടും ശ്രമിക്കാനാകാത്ത അന്തിമ നിലയായി കണക്കാക്കുന്നു.
- HTTP 5xx, നെറ്റ്വർക്ക് പിശകുകൾ എന്നിവ എക്സ്പോണൻഷ്യൽ ബാക്ക്ഓഫ് ഉപയോഗിച്ച് വീണ്ടും പരീക്ഷിക്കുന്നു: `2^attempt * 1000 ms` (1സെ, 2സെ, 4സെ).
- `maxRetries` ശേഷം, ഡെലിവറി പരാജയപ്പെട്ടതായി രേഖപ്പെടുത്തുന്നു.
- ഓരോ ഡെലിവറിയും `last_triggered_at`, `last_status` അപ്ഡേറ്റ് ചെയ്യുന്നു, ഒന്നുകിൽ `failure_count` പുനഃസജ്ജമാക്കുകയോ വർദ്ധിപ്പിക്കുകയോ ചെയ്യുന്നു.
- ഓരോ ഫാൻ-ഔട്ടിനുശേഷവും ഡിസ്പാച്ചർ `disableWebhooksWithHighFailures(10)` വിളിക്കുന്നു, അതിനാൽ `failure_count >= 10` ഉള്ള ഏതൊരു വെബ്ഹുക്കും സ്വയമേവ പ്രവർത്തനരഹിതമാക്കും.

## ഡാറ്റാബേസ്

പട്ടിക `webhooks` (മൈഗ്രേഷൻ `011_webhooks.sql`):

| കോളം                | ടൈപ്പ് ചെയ്യുക | കുറിപ്പുകൾ                                                           |
| ------------------- | -------------- | -------------------------------------------------------------------- |
| `id`                | TEXT PK        | UUID                                                                 |
| `url`               | TEXT           | ലക്ഷ്യസ്ഥാനം URL                                                     |
| `events`            | TEXT           | JSON അറേ; സ്ഥിരസ്ഥിതി `["*"]`                                        |
| `secret`            | TEXT           | HMAC രഹസ്യം (നൽകിയില്ലെങ്കിൽ സ്വയമേവ സൃഷ്ടിച്ചത്)                    |
| `enabled`           | INT            | 0/1; സ്ഥിരസ്ഥിതി 1                                                   |
| `description`       | TEXT           | ഓപ്ഷണൽ ഹ്യൂമൻ ലേബൽ                                                   |
| `created_at`        | TEXT           | `datetime('now')`                                                    |
| `last_triggered_at` | TEXT           | ഓരോ ഡെലിവറി ശ്രമത്തിലും അപ്ഡേറ്റ് ചെയ്യുന്നു                         |
| `last_status`       | INT            | അവസാന ശ്രമത്തിൻ്റെHTTP നില (0 = നെറ്റ്വർക്ക്)                        |
| `failure_count`     | INT            | വിജയിക്കുമ്പോൾ 0 ആയും പരാജയപ്പെടുമ്പോൾ + 1 ആയും പുനഃക്രമീകരിക്കുന്നു |

`webhooks` നിരയിലെ മൊത്തം കൗണ്ടറുകൾക്ക് പുറമേ, ഡെലിവറി ചരിത്രം സമർപ്പിത `webhook_deliveries` പട്ടികയിൽ (മൈഗ്രേഷൻ `069_webhook_deliveries.sql`, എല്ലാ ശ്രമങ്ങളിലും `src/lib/db/webhookDeliveries.ts::insertDelivery` വഴി എഴുതിയിരിക്കുന്നു) നിലനിൽക്കുന്നു. തരത്തിലുള്ള മെറ്റാഡാറ്റ (Slack / Discord / Telegram / ഇഷ്ടാനുസൃത പേലോഡ് ട്രാൻസ്ഫോർമറുകൾ) `070_webhooks_kind_metadata.sql` ചേർത്തു.

## REST API

എല്ലാ എൻഡ് പോയിൻ്റുകൾക്കും മാനേജ്മെൻ്റ് ഓത്ത് ആവശ്യമാണ് (`requireManagementAuth`).

| അവസാന പോയിൻ്റ്                  | രീതി   | വിവരണം                                                   |
| ------------------------------- | ------ | -------------------------------------------------------- |
| `/api/webhooks`                 | GET    | വെബ്ഹുക്കുകൾ ലിസ്റ്റ് ചെയ്യുക (രഹസ്യങ്ങൾ മറച്ചത്)        |
| `/api/webhooks`                 | POST   | വെബ്ഹുക്ക് സൃഷ്ടിക്കുക                                   |
| `/api/webhooks/[id]`            | GET    | Webhook വിശദാംശങ്ങൾ (പൂർണ്ണ രഹസ്യം)                      |
| `/api/webhooks/[id]`            | PUT    | ഫീൽഡുകൾ അപ്ഡേറ്റ് ചെയ്യുക                                |
| `/api/webhooks/[id]`            | DELETE | നീക്കം ചെയ്യുക                                           |
| `/api/webhooks/[id]/test`       | POST   | ഒരു `test.ping` വെടിവയ്ക്കുക (വീണ്ടും ശ്രമിക്കേണ്ടതില്ല) |
| `/api/webhooks/[id]/deliveries` | GET    | ഒരു വെബ്ഹുക്കിനുള്ള സമീപകാല ഡെലിവറി ശ്രമങ്ങൾ             |
| `/api/webhooks/validate-url`    | POST   | പ്രീ-ഫ്ലൈറ്റ് URL മൂല്യനിർണ്ണയം (SSRF ഗാർഡ്)             |

ലിസ്റ്റിംഗ് പേജുകളിൽ ചോർച്ച ഒഴിവാക്കാൻ `GET /api/webhooks` `<first 10 chars>...` യുടെ രഹസ്യം മറയ്ക്കുന്നു. നിങ്ങൾക്ക് യഥാർത്ഥത്തിൽ രഹസ്യം ആവശ്യമുള്ളപ്പോൾ `[id]` GET ഉപയോഗിക്കുക.

### വെബ്ഹുക്ക് സൃഷ്ടിക്കുക

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

`secret` ഒഴിവാക്കിയാൽ, സെർവർ ഒരു `whsec_<hex>` രഹസ്യം സൃഷ്ടിക്കുകയും പ്രതികരണത്തിൽ അത് നൽകുകയും ചെയ്യുന്നു.

### വെബ്ഹുക്ക് ടെസ്റ്റ് ചെയ്യുക

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` തിരികെ നൽകുന്നു. റിസീവർ പേലോഡും ഒപ്പും സ്വീകരിക്കുന്നുവെന്ന് വേഗത്തിൽ സാധൂകരിക്കുന്നതിന് — ഉപയോഗപ്രദമായ പുനഃശ്രമങ്ങളൊന്നും ശ്രമിക്കുന്നില്ല.

## ഡാഷ്ബോർഡ്

`/dashboard/webhooks` ലെ ഡാഷ്ബോർഡ് പേജ് ( `src/app/(dashboard)/dashboard/webhooks/page.tsx` കാണുക) നൽകുന്നു:

- ഒരു ഇവൻ്റ് പിക്കർ ഉപയോഗിച്ച്Create/edit വെബ്ഹുക്കുകൾ
- `enabled`, `failure_count`, `last_status` എന്നിവയെ അടിസ്ഥാനമാക്കിയുള്ള സ്റ്റാറ്റസ് ഇൻഡിക്കേറ്റർ (സജീവ / നിഷ്ക്രിയ / പിശക്)
- ഒറ്റ ക്ലിക്ക് ടെസ്റ്റ് ഡെലിവറി
- മാനുവൽ enable/disable ടോഗിൾ

## പേലോഡ് ഉദാഹരണങ്ങൾ

### അപേക്ഷ.പൂർത്തിയായി

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

`test.ping` ഇതര ഇവൻ്റുകളുടെ ഫീൽഡ് രൂപങ്ങൾ അവ പുറപ്പെടുവിക്കുന്ന കോൾ സൈറ്റുകൾ നിർവചിച്ചിരിക്കുന്നു; `data` ഒബ്ജക്റ്റ് ഫോർവേഡ്-കമ്പാറ്റിബിൾ ആയി പരിഗണിക്കുക (ഫീൽഡുകൾ ചേർക്കുക, അഭാവത്തെ ആശ്രയിക്കരുത്).

## മികച്ച സമ്പ്രദായങ്ങൾ

- **ഓരോ ഡെലിവറിയിലും ഒപ്പ് പരിശോധിക്കുക** അസംസ്കൃത ബോഡിക്കെതിരെ — നിങ്ങളുടെ വെബ്ഹുക്ക് URL ഊഹിക്കുന്ന ആരിൽ നിന്നും കബളിപ്പിക്കപ്പെട്ട POSTs തടയുന്നു.
- **~ 5 സെക്കൻഡിനുള്ളിൽ 2xx പ്രതികരിക്കുക** — ഡിസ്പാച്ചർ സമയം 10 സെക്കൻഡിൽ അവസാനിക്കുന്നു. സ്ലോ റിസീവറുകൾ വീണ്ടും ശ്രമിക്കുകയും `failure_count` വർദ്ധിപ്പിക്കുകയും ചെയ്യും.
- **കൈകാര്യം ചെയ്യുന്നവരെ വിഡ്ഢികളാക്കുക** — വീണ്ടും ശ്രമിക്കുന്നു, ഒരു തവണയെങ്കിലും ഡെലിവറി സെമാൻ്റിക്സ് അർത്ഥമാക്കുന്നത് തനിപ്പകർപ്പുകൾ സാധ്യമാണ് എന്നാണ്.
- **ചുരുങ്ങിയത് സബ്സ്ക്രൈബ് ചെയ്യുക** — നിങ്ങൾ യഥാർത്ഥത്തിൽ ഉപയോഗിക്കുന്ന ഇവൻ്റുകൾ മാത്രം ലിസ്റ്റ് ചെയ്യുക; നിങ്ങൾ നിയന്ത്രിക്കാത്ത റിസീവറുകളിൽ `"*"` ചിലവ് ചേർക്കും.
- **`failure_count` കാണുക** തുടർച്ചയായ 10 പരാജയങ്ങളിൽ — എൻഡ്പോയിൻ്റുകൾ സ്വയമേവ പ്രവർത്തനരഹിതമാക്കി; റിസീവർ ശരിയാക്കിയ ശേഷം `enabled: true` ഉപയോഗിച്ച് `PUT /api/webhooks/[id]` വിളിച്ച് പുനഃസജ്ജമാക്കുക.
- **രഹസ്യങ്ങൾ ഇടയ്ക്കിടെ തിരിക്കുക** — `PUT` ഒരു പുതിയ `secret`, റിസീവറിലേക്ക് പുതിയ മൂല്യം വിന്യസിക്കുക, ടെസ്റ്റ് എൻഡ് പോയിൻ്റ് വഴി സ്ഥിരീകരിക്കുക.

## ഇതും കാണുക

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — പൂർണ്ണ മാനേജ്മെൻ്റ് API ഉപരിതലം
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — സർക്യൂട്ട് ബ്രേക്കർ / ദാതാവിൻ്റെ പരാജയങ്ങൾക്ക് പിന്നിലെ കൂൾഡൗൺ സെമാൻ്റിക്സ് `request.failed` വഴി ഉയർന്നു.
- ഉറവിടം: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
