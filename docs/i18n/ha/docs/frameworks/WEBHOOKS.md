# Webhooks (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Tushen gaskiya:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**An sabunta ta ƙarshe:** 2026-06-28 — v3.8.40

OmniRoute na iya korar ƙugiya na HTTP akan abubuwan dandali. Yi amfani da su don haɗawa tare da Slack, PagerDuty, Datadog, sabis na faɗakarwa na ciki, ko kowane mai karɓar HTTP.

Mai aikawa yana sanya alamar kowane bayarwa tare da HMAC-SHA256, yana sake gwadawa akan gazawar wucin gadi, yana kula da lafiyar isar da saƙon kowane gidan yanar gizo, kuma yana kashe ƙarshen ƙarshen da ke ci gaba da kasawa.

## Abubuwan Taimako

Nau'in `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, wanda `src/lib/webhookDispatcher.ts` ke cinyewa) a halin yanzu yana ƙira abubuwa bakwai:

| Lamarin                   | Wuta lokacin                                                                                                           |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | An kammala buƙatun wakili cikin nasara                                                                                 |
| `request.failed`          | Buƙatun wakili ya gaza bayan duk retries/fallback                                                                      |
| `quota.exceeded`          | Maɓallin API ya ketare iyakar budget/quota                                                                             |
| `proxy.set_aside`         | An keɓe memba na tafkin wakili bayan an ƙi maimaitawa (canji kawai)                                                    |
| `proxy.pool.exhausted`    | An keɓe kowane memba na keɓan wurin wurin wakilta                                                                      |
| `provider.reset_redeemed` | Sake saitin banki da aka yi amfani da kai ta atomatik ya fanshi ƙimar sake saiti ko sake saitin zaman mako-mako Claude |
| `test.ping`               | Lamarin da aka yi amfani da shi ta hanyar ƙarshen gwajin                                                               |

Biyan kuɗi suna karɓar ainihin `"*"` don karɓar kowane taron. Sunayen taron da ba a san su ba a cikin `events` ana watsi da su a lokacin aikawa.

> Lura: API mai aikawa yana da waya, amma wuraren samarwa don wasu abubuwan da ba na `test.ping` ba har yanzu suna sauka. Bincika `grep dispatchEvent` don ganin waɗanne hanyoyi a halin yanzu ke kiran mai aikawa a cikin sakin ku.

## Gine-gine

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

Aika wuta-da-manta ga mai kira: `Promise.allSettled` yana haɗiye kurakuran yanar gizo don haka mummunan mai karɓa ba zai iya toshe sauran ba.

## Shiga HMAC

Lokacin da ƙugiya ta yanar gizo tana da `secret`, OmniRoute yana sanya hannu kan jikin JSON kuma ya aika:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Sunayen rubutun suna amfani da prefix `X-Webhook-*` (ba `X-OmniRoute-*` ba). Ƙimar sa hannun `sha256=<hex>` — ta tabbatar da cikakken prefix.

Idan ana kiran `createWebhook` ba tare da ɓoye ba, tsarin DB yana haifar da ɗaya (`whsec_<48 hex>`) don haka duk ƙugiya na yanar gizo suna sanya hannu ta tsohuwa.

### Tabbatarwa akan mai karɓa

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Koyaushe tabbatarwa akan **danye** buqatar jiki, kafin duk wani bincike na JSON.

## Sake gwadawa & Manufar gazawa

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 na biyu lokacin ƙare kowane ƙoƙari (`AbortController`).
- HTTP 2xx yana ƙidaya azaman nasara.
- HTTP 3xx/4xx yana ƙidaya azaman matsayin ƙarshe wanda ba za'a iya sake gwadawa ba — da aka rubuta kamar yadda aka kawo tare da `success = res.ok`.
- HTTP 5xx da kurakurai na cibiyar sadarwa ana sake gwada su tare da bayanan baya: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Bayan `maxRetries`, ana yin rikodin isarwa kamar yadda ya kasa.
- Kowane bayarwa yana ɗaukaka `last_triggered_at`, `last_status`, kuma ko dai ya sake saiti ko ƙara `failure_count`.
- Mai aikawa yana kiran `disableWebhooksWithHighFailures(10)` bayan kowane fan-out, don haka duk wani ƙugiya tare da `failure_count >= 10` ana kashe shi ta atomatik.

## Database

Tebur `webhooks` (Hijira `011_webhooks.sql`):

| Rukunin             | Nau'in  | Bayanan kula                                                    |
| ------------------- | ------- | --------------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                            |
| `url`               | TEXT    | Hanyar URL                                                      |
| `events`            | TEXT    | tsararrun JSON ; tsoho `["*"]`                                  |
| `secret`            | TEXT    | Sirrin HMAC (wanda aka ƙirƙira ta atomatik idan ba a ba shi ba) |
| `enabled`           | INT     | 0/1; gazawar zuwa 1                                             |
| `description`       | TEXT    | Tambarin ɗan adam na zaɓi                                       |
| `created_at`        | TEXT    | `datetime('now')`                                               |
| `last_triggered_at` | TEXT    | An sabunta akan kowane ƙoƙarin bayarwa                          |
| `last_status`       | INT     | Matsayin HTTP na ƙoƙari na ƙarshe (0 = cibiyar sadarwa)         |
| `failure_count`     | INT     | Yana sake saitawa zuwa 0 akan nasara, + 1 akan gazawa           |

Tarihin bayarwa yana dawwama a cikin keɓaɓɓen tebur `webhook_deliveries` (hijira `069_webhook_deliveries.sql`, an rubuta ta hanyar `src/lib/db/webhookDeliveries.ts::insertDelivery` akan kowane ƙoƙari), baya ga jimlar ƙididdiga akan layin `webhooks`. Metadata mai kirki (Slack / Discord / Telegram / masu canji na biyan kuɗi na al'ada) `070_webhooks_kind_metadata.sql` ya ƙara.

## REST API

Duk wuraren ƙarewa suna buƙatar auth gudanarwa (`requireManagementAuth`).

| Ƙarshen Ƙarshe                  | Hanya  | Bayani                                                |
| ------------------------------- | ------ | ----------------------------------------------------- |
| `/api/webhooks`                 | GET    | Jerin ƙugiya na gidan yanar gizo (asirin da aka rufe) |
| `/api/webhooks`                 | POST   | Ƙirƙiri ƙugiya ta yanar gizo                          |
| `/api/webhooks/[id]`            | GET    | Bayanin Webhook (cikakken sirri)                      |
| `/api/webhooks/[id]`            | PUT    | Sabunta filayen                                       |
| `/api/webhooks/[id]`            | DELETE | Cire                                                  |
| `/api/webhooks/[id]/test`       | POST   | Wuta a `test.ping` (babu sakewa)                      |
| `/api/webhooks/[id]/deliveries` | GET    | Ƙoƙarin isarwa na baya-bayan nan don ƙugiya guda ɗaya |
| `/api/webhooks/validate-url`    | POST   | Ingancin URL kafin tashi jirgin (Magadin SSRF )       |

`GET /api/webhooks` yana rufe sirrin `<first 10 chars>...` don gujewa yaɗuwa akan shafukan jeri. Yi amfani da `[id]` GET lokacin da gaske kuna buƙatar sirrin.

### Ƙirƙiri ƙugiya ta yanar gizo

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

Idan an cire `secret`, uwar garken yana haifar da sirrin `whsec_<hex>` kuma ya mayar da shi a cikin martani.

### Gwada ƙugiya

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Yana dawo da `{ delivered, status, error }`. Ba a yi ƙoƙarin sake gwadawa — mai amfani don tabbatarwa da sauri cewa mai karɓa ya karɓi kaya da sa hannu.

## Dashboard

Shafin dashboard a `/dashboard/webhooks` (duba `src/app/(dashboard)/dashboard/webhooks/page.tsx`) yana ba da:

- Create/edit gidan yanar gizo tare da mai ɗaukar taron
- Alamar matsayi (aiki / mara aiki / kuskure) dangane da `enabled`, `failure_count`, da `last_status`
- Isar da gwajin dannawa ɗaya
- Canjin enable/disable na hannu

## Misalan Biyan Kuɗi

### nema.kammala

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

### gwaji.ping

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

Siffofin filin don abubuwan da ba na `test.ping` ba ana bayyana su ta wuraren kiran da ke fitar da su; yi da abin `data` a matsayin mai dacewa da gaba (ƙara filayen, kar a dogara da rashi).

## Mafi kyawun Ayyuka

- **Tabbatar da sa hannu akan kowane bayarwa** a kan danyen jiki — yana hana zubewar POSTs daga duk wanda ya zaci URL din ku.
- **Amsa 2xx a cikin ~ 5 seconds** — lokacin aika aika a 10s. Masu karɓa a hankali za su ci maimaitawa kuma su busa `failure_count`.
- **Ka sanya masu sarrafa su zama masu ƙarfi** Sake gwadawa — da tarukan isarwa aƙalla sau ɗaya yana nufin kwafi mai yiwuwa ne.
- **Biyan kuɗi kaɗan** — jerin abubuwan da suka faru ne kawai da kuke cinyewa; `"*"` zai ƙara farashi akan masu karɓa waɗanda ba ku sarrafa su.
- **Kalli `failure_count`** — ƙarshen maki an kashe su ta atomatik a gazawar 10 a jere; sake saiti ta hanyar kiran `PUT /api/webhooks/[id]` tare da `enabled: true` bayan gyara mai karɓa.
- **Juya asirin lokaci-lokaci** — `PUT` sabon `secret`, ƙaddamar da sabon ƙimar zuwa mai karɓa, kuma tabbatar ta hanyar ƙarshen gwajin.

## Duba kuma

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — cikakken gudanarwa API surface
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — na'ura mai ba da hanya tsakanin hanyoyin sadarwa / kwantar da hankali bayan gazawar mai samarwa ta fito ta hanyar `request.failed`
- Source: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
