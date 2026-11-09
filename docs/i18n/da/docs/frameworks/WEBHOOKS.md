# Webhooks (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Sandhedens kilde:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Sidst opdateret:** 2026-06-28 — v3.8.40

OmniRoute kan affyre HTTP webhooks på platformsbegivenheder. Brug dem til at integrere med Slack, PagerDuty, Datadog, interne alarmtjenester eller enhver HTTP modtager.

Afsenderen signerer hver levering med HMAC-SHA256, prøver igen på forbigående fejl, sporer leveringstilstand pr. webhook og deaktiverer automatisk slutpunkter, der bliver ved med at svigte.

## Understøttede begivenheder

`WebhookEvent` typen (`src/lib/webhooks/eventDescriptions.ts`, forbrugt af `src/lib/webhookDispatcher.ts`) modellerer i øjeblikket syv begivenheder:

| Tilfælde                  | Brand når                                                                                                        |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | En fuldmagtsanmodning fuldføres                                                                                  |
| `request.failed`          | En fuldmagtsanmodning mislykkes trods alt retries/fallback                                                       |
| `quota.exceeded`          | En API -nøgle krydser en budget/quota -tærskel                                                                   |
| `proxy.set_aside`         | Et medlem af proxypuljen sættes til side efter gentagne afslag (kun overgang)                                    |
| `proxy.pool.exhausted`    | Hvert medlem af en proxy-pulje-omfang er afsat                                                                   |
| `provider.reset_redeemed` | Auto-anvend bankerede nulstillinger indløste en nulstillingskredit eller nulstilling af Claude ugentlige session |
| `test.ping`               | Syntetisk hændelse brugt af testendepunktet                                                                      |

Abonnementer accepterer den bogstavelige `"*"` for at modtage hver begivenhed. Ukendte hændelsesnavne i `events` ignoreres på afsendelsestidspunktet.

> Bemærk: afsenderen API er tilsluttet, men produktionsopkaldssteder for nogle af de ikke-`test.ping` begivenheder lander stadig. Tjek `grep dispatchEvent` for at se, hvilke stier der i øjeblikket påkalder afsenderen i din udgivelse.

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

Afsendelse er brand-and-forget for den, der ringer: `Promise.allSettled` sluger per-webhook fejl, så en dårlig modtager ikke kan blokere de andre.

## HMAC -signering

Når en webhook har en `secret`, underskriver OmniRoute JSON kroppen og sender:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Headernavne bruger `X-Webhook-*` præfikset (ikke `X-OmniRoute-*`). Signaturværdien er `sha256=<hex>` — bekræft det fulde præfiks.

Hvis `createWebhook` kaldes uden en hemmelighed, genererer DB modulet en (`whsec_<48 hex>`), så alle webhooks er signeret som standard.

### Verifikation på modtageren

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Kontroller altid mod **rå** anmodningstekst, før enhver JSON parsing.

## Forsøg igen og fejlpolitik

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 sekunders timeout pr. forsøg (`AbortController`).
- HTTP 2xx tæller som succes.
- HTTP 3xx/4xx tæller som en endelig status — der ikke kan gentages, registreret som leveret med `success = res.ok`.
- HTTP 5xx og netværksfejl forsøges igen med eksponentiel backoff: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Efter `maxRetries` registreres leveringen som mislykket.
- Hver levering opdaterer `last_triggered_at`, `last_status` og enten nulstiller eller øger `failure_count`.
- Afsenderen ringer til `disableWebhooksWithHighFailures(10)` efter hver fan-out, så enhver webhook med `failure_count >= 10` deaktiveres automatisk.

## Database

Tabel `webhooks` (migrering `011_webhooks.sql`):

| Kolonne             | Type    | Noter                                             |
| ------------------- | ------- | ------------------------------------------------- |
| `id`                | TEXT PK | UUID                                              |
| `url`               | TEXT    | Destination URL                                   |
| `events`            | TEXT    | JSON array; standard `["*"]`                      |
| `secret`            | TEXT    | HMAC hemmelighed (autogenereret, hvis ikke givet) |
| `enabled`           | INT     | 0/1; standard til 1                               |
| `description`       | TEXT    | Valgfri menneskelig etiket                        |
| `created_at`        | TEXT    | `datetime('now')`                                 |
| `last_triggered_at` | TEXT    | Opdateret ved hvert leveringsforsøg               |
| `last_status`       | INT     | HTTP status for sidste forsøg (0 = netværk)       |
| `failure_count`     | INT     | Nulstilles til 0 ved succes, + 1 ved fiasko       |

Leveringshistorikken bevares i den dedikerede `webhook_deliveries` tabel (migrering `069_webhook_deliveries.sql`, skrevet via `src/lib/db/webhookDeliveries.ts::insertDelivery` ved hvert forsøg), foruden de samlede tællere på `webhooks` rækken. Venlige metadata (Slack / Discord / Telegram / brugerdefinerede nyttelasttransformere) blev tilføjet af `070_webhooks_kind_metadata.sql`.

## REST API

Alle endepunkter kræver administrationsgodkendelse (`requireManagementAuth`).

| Slutpunkt                       | Metode | Beskrivelse                                  |
| ------------------------------- | ------ | -------------------------------------------- |
| `/api/webhooks`                 | GET    | Liste over webhooks (hemmeligheder maskeret) |
| `/api/webhooks`                 | POST   | Opret webhook                                |
| `/api/webhooks/[id]`            | GET    | Webhook-detalje (fuld hemmelighed)           |
| `/api/webhooks/[id]`            | PUT    | Opdater felter                               |
| `/api/webhooks/[id]`            | DELETE | Fjerne                                       |
| `/api/webhooks/[id]/test`       | POST   | Affyr en `test.ping` (ingen genforsøg)       |
| `/api/webhooks/[id]/deliveries` | GET    | Seneste leveringsforsøg for én webhook       |
| `/api/webhooks/validate-url`    | POST   | URL -validering før flyvning (SSRF vagt)     |

`GET /api/webhooks` maskerer hemmeligheden bag `<first 10 chars>...` for at undgå at lække på listesider. Brug `[id]` GET når du rent faktisk har brug for hemmeligheden.

### Opret webhook

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

Hvis `secret` udelades, genererer serveren en `whsec_<hex>` hemmelighed og returnerer den i svaret.

### Test webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Returnerer `{ delivered, status, error }`. Ingen genforsøg er forsøgt — nyttige til hurtigt at validere, at modtageren accepterer nyttelasten og signaturen.

## Dashboard

Dashboard-siden hos `/dashboard/webhooks` (se `src/app/(dashboard)/dashboard/webhooks/page.tsx`) giver:

- Create/edit webhooks med en begivenhedsvælger
- Statusindikator (aktiv / inaktiv / fejlbehæftet) baseret på `enabled`, `failure_count` og `last_status`
- Et-klik testlevering
- Manuel enable/disable -knap

## Eksempler på nyttelast

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

Feltformer for ikke-`test.ping` -hændelser er defineret af de opkaldssteder, der udsender dem; behandle `data` objektet som fremadkompatibelt (tilføj felter, afhængig ikke af fravær).

## Bedste praksis

- **Bekræft signaturen ved hver levering** mod den rå krop — forhindrer spoofed POSTs fra alle, der gætter din webhook URL.
- **Svar 2xx inden for ~ 5 sekunder** — afsenderen timeout ved 10 s. Langsomme modtagere vil spise genforsøg og puste `failure_count` op.
- **Gør handlere idempotente** — genforsøg og semantik for levering af mindst én gang betyder, at dubletter er mulige.
- **Abonner minimalt** — lister kun begivenheder, du rent faktisk bruger; `"*"` vil tilføje omkostninger på modtagere, du ikke kontrollerer.
- **Se `failure_count`** — endepunkter deaktiveres automatisk ved 10 på hinanden følgende fejl; nulstilles ved at ringe til `PUT /api/webhooks/[id]` med `enabled: true` efter fastgørelse af modtageren.
- **Roter hemmeligheder med jævne mellemrum** — `PUT` en ny `secret`, implementer den nye værdi til modtageren, og bekræft via testslutpunktet.

## Se også

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — fuld styring API overflade
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — afbryder/afkølingssemantik bag udbyderfejl dukkede op via `request.failed`
- Kilde: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
