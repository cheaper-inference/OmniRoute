# Webhooks (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Kilde til sannhet:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Sist oppdatert:** 2026-06-28 — v3.8.40

OmniRoute kan avfyre HTTP webhooks på plattformhendelser. Bruk dem til å integrere med Slack, PagerDuty, Datadog, interne varslingstjenester eller en hvilken som helst HTTP mottaker.

Senderen signerer hver levering med HMAC-SHA256, prøver på nytt på forbigående feil, sporer leveringshelse per webhook og deaktiverer automatisk endepunkter som stadig mislykkes.

## Støttede arrangementer

`WebhookEvent` typen (`src/lib/webhooks/eventDescriptions.ts`, konsumert av `src/lib/webhookDispatcher.ts`) modellerer for tiden syv hendelser:

| Hendelse                  | Fyrer når                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------ |
| `request.completed`       | En proxy-forespørsel fullføres                                                                         |
| `request.failed`          | En fullmaktsforespørsel mislykkes tross alt retries/fallback                                           |
| `quota.exceeded`          | En API nøkkel krysser en budget/quota terskel                                                          |
| `proxy.set_aside`         | Et medlem av proxy-poolen settes til side etter gjentatte avslag (kun overgang)                        |
| `proxy.pool.exhausted`    | Hvert medlem av en proxy pool-omfang er satt til side                                                  |
| `provider.reset_redeemed` | Auto-apply banked resets innløste en tilbakestillingskreditt eller Claude ukentlig økt tilbakestilling |
| `test.ping`               | Syntetisk hendelse brukt av testendepunktet                                                            |

Abonnementer godtar den bokstavelige `"*"` for å motta hvert arrangement. Ukjente hendelsesnavn i `events` ignoreres ved utsendelsestidspunkt.

> Merk: koordinatoren API er kablet, men produksjonsanropssteder for noen av ikke-`test.ping` -hendelsene lander fortsatt. Sjekk `grep dispatchEvent` for å se hvilke stier som for øyeblikket påkaller avsenderen i utgivelsen din.

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

Sending er brann-og-glem for den som ringer: `Promise.allSettled` svelger feil per webhook slik at en dårlig mottaker ikke kan blokkere de andre.

## HMAC -signering

Når en webhook har en `secret`, signerer OmniRoute JSON kroppen og sender:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Overskriftsnavn bruker `X-Webhook-*` prefikset (ikke `X-OmniRoute-*`). Signaturverdien er `sha256=<hex>` — verifiser hele prefikset.

Hvis `createWebhook` kalles uten en hemmelighet, genererer DB modulen en (`whsec_<48 hex>`) slik at alle webhooks er signert som standard.

### Verifisering på mottaker

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Verifiser alltid mot **rå** forespørselstekst, før noen JSON parsing.

## Retningslinjer for forsøk og feil

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 sekunders timeout per forsøk (`AbortController`).
- HTTP 2xx regnes som suksess.
- HTTP 3xx/4xx teller som en endelig status — som ikke kan prøves på nytt, registrert som levert med `success = res.ok`.
- HTTP 5xx og nettverksfeil prøves på nytt med eksponentiell backoff: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Etter `maxRetries` registreres leveringen som mislykket.
- Hver levering oppdaterer `last_triggered_at`, `last_status`, og enten tilbakestiller eller øker `failure_count`.
- Senderen ringer `disableWebhooksWithHighFailures(10)` etter hver fan-out, så enhver webhook med `failure_count >= 10` blir automatisk deaktivert.

## Database

Tabell `webhooks` (migrering `011_webhooks.sql`):

| Søyle               | Type    | Notater                                               |
| ------------------- | ------- | ----------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                  |
| `url`               | TEXT    | Destinasjon URL                                       |
| `events`            | TEXT    | JSON array; standard `["*"]`                          |
| `secret`            | TEXT    | HMAC hemmelighet (automatisk generert hvis ikke gitt) |
| `enabled`           | INT     | 0/1; standard til 1                                   |
| `description`       | TEXT    | Valgfri menneskelig etikett                           |
| `created_at`        | TEXT    | `datetime('now')`                                     |
| `last_triggered_at` | TEXT    | Oppdatert ved hvert leveringsforsøk                   |
| `last_status`       | INT     | HTTP status for siste forsøk (0 = nettverk)           |
| `failure_count`     | INT     | Tilbakestilles til 0 ved suksess, + 1 ved fiasko      |

Leveringshistorikken er opprettholdt i den dedikerte `webhook_deliveries` tabellen (migrering `069_webhook_deliveries.sql`, skrevet via `src/lib/db/webhookDeliveries.ts::insertDelivery` ved hvert forsøk), i tillegg til de samlede tellerne på `webhooks` raden. Snille metadata (Slack / Discord / Telegram / tilpassede nyttelasttransformatorer) ble lagt til av `070_webhooks_kind_metadata.sql`.

## REST API

Alle endepunkter krever administrasjonsgodkjenning (`requireManagementAuth`).

| Endepunkt                       | Metode | Beskrivelse                             |
| ------------------------------- | ------ | --------------------------------------- |
| `/api/webhooks`                 | GET    | Liste webhooks (hemmeligheter maskert)  |
| `/api/webhooks`                 | POST   | Lag webhook                             |
| `/api/webhooks/[id]`            | GET    | Webhook-detalj (full hemmelighet)       |
| `/api/webhooks/[id]`            | PUT    | Oppdater felt                           |
| `/api/webhooks/[id]`            | DELETE | Fjerne                                  |
| `/api/webhooks/[id]/test`       | POST   | Avfyr en `test.ping` (ingen forsøk)     |
| `/api/webhooks/[id]/deliveries` | GET    | Nylige leveringsforsøk for én webhook   |
| `/api/webhooks/validate-url`    | POST   | URL -validering før flyging (SSRF vakt) |

`GET /api/webhooks` maskerer hemmeligheten til `<first 10 chars>...` for å unngå lekkasje på oppføringssider. Bruk `[id]` GET når du faktisk trenger hemmeligheten.

### Lag webhook

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

Hvis `secret` utelates, genererer serveren en `whsec_<hex>` hemmelighet og returnerer den i svaret.

### Test webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Returnerer `{ delivered, status, error }`. Ingen gjenforsøk er forsøkt — nyttig for raskt å validere at mottakeren aksepterer nyttelasten og signaturen.

## Dashbord

Dashboard-siden på `/dashboard/webhooks` (se `src/app/(dashboard)/dashboard/webhooks/page.tsx`) gir:

- Create/edit webhooks med en hendelsesvelger
- Statusindikator (aktiv / inaktiv / feil) basert på `enabled`, `failure_count` og `last_status`
- Testlevering med ett klikk
- Manuell enable/disable -veksling

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

Feltformer for ikke-`test.ping` -hendelser er definert av anropsstedene som sender dem ut; behandle `data` objektet som fremoverkompatibelt (legg til felt, ikke avhengig av fravær).

## Beste praksis

- **Bekreft signaturen på hver levering** mot den rå kroppen — forhindrer forfalsket POSTs fra alle som gjetter din webhook URL.
- **Svar 2xx innen ~ 5 sekunder** — avsenderen timeout ved 10 s. Langsomme mottakere vil spise nye forsøk og blåse opp `failure_count`.
- **Gjør behandlere idempotente** — forsøk og semantikk minst én gang betyr at duplikater er mulig.
- **Abonner minimalt** — viser kun hendelser du faktisk bruker; `"*"` vil legge til kostnader på mottakere du ikke kontrollerer.
- **Se `failure_count`** — endepunkter deaktiveres automatisk ved 10 påfølgende feil; tilbakestill ved å ringe `PUT /api/webhooks/[id]` med `enabled: true` etter at mottakeren er festet.
- **Roter hemmeligheter med jevne mellomrom** — `PUT` en ny `secret`, distribuer den nye verdien til mottakeren, og bekreft via testendepunktet.

## Se også

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — full styring API overflate
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — kretsbryter / nedkjølingssemantikk bak leverandørfeil dukket opp via `request.failed`
- Kilde: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
