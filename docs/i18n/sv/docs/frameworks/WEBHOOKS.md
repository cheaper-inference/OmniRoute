# Webhooks (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Sanningens källa:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Senast uppdaterad:** 2026-06-28 — v3.8.40

OmniRoute kan avfyra HTTP webhooks på plattformsevenemang. Använd dem för att integrera med Slack, PagerDuty, Datadog, interna larmtjänster eller någon HTTP mottagare.

Avsändaren signerar varje leverans med HMAC-SHA256, försöker igen på övergående misslyckanden, spårar leveranstillstånd per webhook och inaktiverar automatiskt slutpunkter som fortsätter att misslyckas.

## Events som stöds

`WebhookEvent` typen (`src/lib/webhooks/eventDescriptions.ts`, konsumerad av `src/lib/webhookDispatcher.ts`) modellerar för närvarande sju händelser:

| Händelse                  | Bränder när                                                                                                                   |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | En fullmaktsbegäran slutförs framgångsrikt                                                                                    |
| `request.failed`          | En fullmaktsbegäran misslyckas trots allt retries/fallback                                                                    |
| `quota.exceeded`          | En API nyckel passerar en budget/quota tröskel                                                                                |
| `proxy.set_aside`         | En proxypoolmedlem sätts åt sidan efter upprepade avslag (endast övergång)                                                    |
| `proxy.pool.exhausted`    | Varje medlem i en proxypools räckvidd sätts åt sidan                                                                          |
| `provider.reset_redeemed` | Automatisk applicering av bankåterställningar löste in en återställningskredit eller återställning av Claude veckovis session |
| `test.ping`               | Syntetisk händelse som används av testets slutpunkt                                                                           |

Prenumerationer accepterar den bokstavliga `"*"` för att ta emot varje event. Okända händelsenamn i `events` ignoreras vid leveranstid.

> Obs: avsändaren API är ansluten, men produktionsanropsplatser för några av de icke-`test.ping` händelser landar fortfarande. Kontrollera `grep dispatchEvent` för att se vilka sökvägar som för närvarande anropar avsändaren i din version.

## Arkitektur

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

Dispatch är brand-and-forget för den som ringer: `Promise.allSettled` sväljer per-webhook-fel så att en dålig mottagare inte kan blockera de andra.

## HMAC -signering

När en webhook har en `secret` signerar OmniRoute JSON kroppen och skickar:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Rubriknamn använder `X-Webhook-*` prefixet (inte `X-OmniRoute-*`). Signaturvärdet är `sha256=<hex>` — verifiera hela prefixet.

Om `createWebhook` anropas utan en hemlighet, genererar DB modulen en (`whsec_<48 hex>`) så alla webhooks signeras som standard.

### Verifiering på mottagaren

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Verifiera alltid mot **rå** förfrågan, innan någon JSON -analys.

## Försök igen & misslyckande policy

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 sekunders timeout per försök (`AbortController`).
- HTTP 2xx räknas som framgång.
- HTTP 3xx/4xx räknas som en icke-försökbar slutstatus — registrerad som levererad med `success = res.ok`.
- HTTP 5xx och nätverksfel prövas igen med exponentiell backoff: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Efter `maxRetries` registreras leveransen som misslyckad.
- Varje leverans uppdaterar `last_triggered_at`, `last_status` och antingen återställer eller ökar `failure_count`.
- Samordnaren ringer `disableWebhooksWithHighFailures(10)` efter varje fan-out, så alla webhook med `failure_count >= 10` inaktiveras automatiskt.

## Databas

Tabell `webhooks` (migrering `011_webhooks.sql`):

| Kolumn              | Typ     | Anteckningar                                           |
| ------------------- | ------- | ------------------------------------------------------ |
| `id`                | TEXT PK | UUID                                                   |
| `url`               | TEXT    | Destination URL                                        |
| `events`            | TEXT    | JSON array; standard `["*"]`                           |
| `secret`            | TEXT    | HMAC hemlighet (automatiskt genererad om den inte ges) |
| `enabled`           | INT     | 0/1; standard till 1                                   |
| `description`       | TEXT    | Valfri mänsklig etikett                                |
| `created_at`        | TEXT    | `datetime('now')`                                      |
| `last_triggered_at` | TEXT    | Uppdaterad vid varje leveransförsök                    |
| `last_status`       | INT     | HTTP status för det senaste försöket (0 = nätverk)     |
| `failure_count`     | INT     | Återställs till 0 vid framgång, + 1 vid misslyckande   |

Leveranshistoriken finns kvar i den dedikerade `webhook_deliveries` tabellen (migrering `069_webhook_deliveries.sql`, skriven via `src/lib/db/webhookDeliveries.ts::insertDelivery` vid varje försök), förutom de sammanlagda räknarna på `webhooks` raden. Typisk metadata (Slack / Discord / Telegram /anpassade nyttolasttransformatorer) lades till av `070_webhooks_kind_metadata.sql`.

## REST API

Alla slutpunkter kräver hanteringsbehörighet (`requireManagementAuth`).

| Slutpunkt                       | Metod  | Beskrivning                               |
| ------------------------------- | ------ | ----------------------------------------- |
| `/api/webhooks`                 | GET    | Lista webhooks (hemligheter maskerade)    |
| `/api/webhooks`                 | POST   | Skapa webhook                             |
| `/api/webhooks/[id]`            | GET    | Webhook detalj (fullständig hemlighet)    |
| `/api/webhooks/[id]`            | PUT    | Uppdatera fält                            |
| `/api/webhooks/[id]`            | DELETE | Ta bort                                   |
| `/api/webhooks/[id]/test`       | POST   | Avfyra en `test.ping` (inga försök igen)  |
| `/api/webhooks/[id]/deliveries` | GET    | Senaste leveransförsök för en webhook     |
| `/api/webhooks/validate-url`    | POST   | URL -validering före flygning (SSRF vakt) |

`GET /api/webhooks` maskerar hemligheten till `<first 10 chars>...` för att undvika läckage på listningssidor. Använd `[id]` GET när du verkligen behöver hemligheten.

### Skapa webhook

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

Om `secret` utelämnas genererar servern en `whsec_<hex>` hemlighet och returnerar den i svaret.

### Testa webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Returnerar `{ delivered, status, error }`. Inga återförsök görs — användbart för att snabbt validera att mottagaren accepterar nyttolasten och signaturen.

## Instrumentbräda

Instrumentpanelsidan på `/dashboard/webhooks` (se `src/app/(dashboard)/dashboard/webhooks/page.tsx`) ger:

- Create/edit webhooks med en händelseväljare
- Statusindikator (aktiv / inaktiv / fel) baserad på `enabled`, `failure_count` och `last_status`
- Testleverans med ett klick
- Manuell enable/disable -växling

## Exempel på nyttolast

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

Fältformer för icke-`test.ping` -händelser definieras av de anropsplatser som avger dem; behandla `data` objektet som framåtkompatibelt (lägg till fält, beror inte på frånvaro).

## Bästa metoder

- **Verifiera signaturen vid varje leverans** mot den råa kroppen — förhindrar falsk POSTs från alla som gissar din webhook URL.
- **Svara 2xx inom ~ 5 sekunder** — avsändaren timeout vid 10 s. Långsamma mottagare kommer att äta upp nya försök och blåsa upp `failure_count`.
- **Gör hanterare idempotenta** — försök och semantik för leverans åtminstone en gång innebär att dubbletter är möjliga.
- **Prenumerera minimalt** — listar endast händelser som du faktiskt konsumerar; `"*"` kommer att lägga till kostnad på mottagare som du inte kontrollerar.
- **Titta på `failure_count`** — slutpunkter inaktiveras automatiskt vid 10 på varandra följande fel; återställ genom att anropa `PUT /api/webhooks/[id]` med `enabled: true` efter att ha fixerat mottagaren.
- **Rotera hemligheter med jämna mellanrum** — `PUT` en ny `secret`, distribuera det nya värdet till mottagaren och bekräfta via testslutpunkten.

## Se även

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — full förvaltning API yta
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — kretsbrytare / nedkylningssemantik bakom leverantörsfel uppstod via `request.failed`
- Källa: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
