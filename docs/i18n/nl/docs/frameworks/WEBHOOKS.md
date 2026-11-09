# Webhooks (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Bron van waarheid:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Laatst bijgewerkt:** 28-06-2026 — v3.8.40

OmniRoute kan HTTP webhooks op platformevenementen afvuren. Gebruik ze om te integreren met Slack, PagerDuty, Datadog, interne waarschuwingsdiensten of elke HTTP ontvanger.

De coördinator ondertekent elke levering met HMAC-SHA256, probeert opnieuw bij tijdelijke fouten, volgt de leveringsstatus per webhook en schakelt automatisch eindpunten uit die blijven mislukken.

## Ondersteunde evenementen

Het `WebhookEvent` type (`src/lib/webhooks/eventDescriptions.ts`, verbruikt door `src/lib/webhookDispatcher.ts`) modelleert momenteel zeven gebeurtenissen:

| Evenement                 | Brandt wanneer                                                                                             |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Een proxyverzoek is succesvol voltooid                                                                     |
| `request.failed`          | Een proxyverzoek mislukt immers retries/fallback                                                           |
| `quota.exceeded`          | Een API sleutel overschrijdt een budget/quota -drempel                                                     |
| `proxy.set_aside`         | Een lid van de proxypool wordt na herhaalde weigeringen aan de kant gezet (alleen overgang)                |
| `proxy.pool.exhausted`    | Elk lid van een proxypoolbereik wordt opzij gezet                                                          |
| `provider.reset_redeemed` | Automatisch toepassen van bankresets, ingewisseld voor een resettegoed of de wekelijkse Claude sessiereset |
| `test.ping`               | Synthetische gebeurtenis gebruikt door het testeindpunt                                                    |

Abonnementen accepteren de letterlijke `"*"` om elk evenement te ontvangen. Onbekende gebeurtenisnamen in `events` worden tijdens verzending genegeerd.

> Let op: de coördinator API is aangesloten, maar productieoproeplocaties voor sommige niet-`test.ping` -evenementen komen nog steeds binnen. Controleer `grep dispatchEvent` om te zien welke paden momenteel de dispatcher in uw release aanroepen.

## Architectuur

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

Verzending is voor de beller een kwestie van vergeten: `Promise.allSettled` slikt fouten per webhook in, zodat de ene slechte ontvanger de andere niet kan blokkeren.

## HMAC -ondertekening

Wanneer een webhook een `secret` heeft, ondertekent OmniRoute de JSON body en verzendt:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Headernamen gebruiken het `X-Webhook-*` voorvoegsel (niet `X-OmniRoute-*`). De handtekeningwaarde is `sha256=<hex>` — verifieer het volledige voorvoegsel.

Als `createWebhook` zonder geheim wordt aangeroepen, genereert de DB module er een (`whsec_<48 hex>`), zodat alle webhooks standaard worden ondertekend.

### Verificatie op de ontvanger

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Verifieer altijd aan de hand van de **rauw** request body, vóór enige JSON parsering.

## Beleid voor opnieuw proberen en mislukken

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Time-out van 10 seconden per poging (`AbortController`).
- HTTP 2xx geldt als succes.
- HTTP 3xx/4xx geldt als een niet-herhaalbare eindstatus — vastgelegd als afgeleverd bij `success = res.ok`.
- HTTP 5xx en netwerkfouten worden opnieuw geprobeerd met exponentiële uitstel: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Na `maxRetries` wordt de levering als mislukt geregistreerd.
- Bij elke levering worden `last_triggered_at` en `last_status` bijgewerkt en wordt `failure_count` opnieuw ingesteld of verhoogd.
- De coördinator roept `disableWebhooksWithHighFailures(10)` op na elke fan-out, zodat elke webhook met `failure_count >= 10` automatisch wordt uitgeschakeld.

## Database

Tabel `webhooks` (migratie `011_webhooks.sql`):

| Kolom               | Type    | Opmerkingen                                                 |
| ------------------- | ------- | ----------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                        |
| `url`               | TEXT    | Bestemming URL                                              |
| `events`            | TEXT    | JSON array; standaard `["*"]`                               |
| `secret`            | TEXT    | HMAC geheim (automatisch gegenereerd indien niet opgegeven) |
| `enabled`           | INT     | 0/1; standaard ingesteld op 1                               |
| `description`       | TEXT    | Optioneel menselijk label                                   |
| `created_at`        | TEXT    | `datetime('now')`                                           |
| `last_triggered_at` | TEXT    | Bij elke bezorgpoging bijgewerkt                            |
| `last_status`       | INT     | HTTP status van de laatste poging (0 = -netwerk)            |
| `failure_count`     | INT     | Wordt gereset naar 0 bij succes, + 1 bij mislukking         |

De leveringsgeschiedenis wordt bewaard in de speciale `webhook_deliveries` tabel (migratie `069_webhook_deliveries.sql`, bij elke poging via `src/lib/db/webhookDeliveries.ts::insertDelivery` geschreven), naast de verzamelde tellers op de `webhooks` rij. Soort metadata (Slack / Discord / Telegram / aangepaste payload transformers) zijn toegevoegd door `070_webhooks_kind_metadata.sql`.

## REST API

Voor alle eindpunten is beheerauthenticatie (`requireManagementAuth`) vereist.

| Eindpunt                        | Methode | Beschrijving                                   |
| ------------------------------- | ------- | ---------------------------------------------- |
| `/api/webhooks`                 | GET     | Webhooks weergeven (geheimen gemaskeerd)       |
| `/api/webhooks`                 | POST    | Maak een webhook                               |
| `/api/webhooks/[id]`            | GET     | Webhookdetail (volledig geheim)                |
| `/api/webhooks/[id]`            | PUT     | Velden bijwerken                               |
| `/api/webhooks/[id]`            | DELETE  | Verwijderen                                    |
| `/api/webhooks/[id]/test`       | POST    | Vuur een `test.ping` af (geen nieuwe pogingen) |
| `/api/webhooks/[id]/deliveries` | GET     | Recente bezorgpogingen voor één webhook        |
| `/api/webhooks/validate-url`    | POST    | URL -validatie vóór de vlucht (SSRF bewaking)  |

`GET /api/webhooks` maskeert het geheim van `<first 10 chars>...` om lekken op aanbiedingspagina's te voorkomen. Gebruik de `[id]` GET wanneer je het geheim echt nodig hebt.

### Maak een webhook

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

Als `secret` wordt weggelaten, genereert de server een `whsec_<hex>` geheim en retourneert dit in het antwoord.

### Webhook testen

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Retourneert `{ delivered, status, error }`. Er worden geen nieuwe pogingen ondernomen. — is handig om snel te valideren dat de ontvanger de payload en handtekening accepteert.

## Dashboard

De dashboardpagina bij `/dashboard/webhooks` (zie `src/app/(dashboard)/dashboard/webhooks/page.tsx`) biedt:

- Create/edit webhooks met een evenementenkiezer
- Statusindicator (actief / inactief / foutief) op basis van `enabled`, `failure_count` en `last_status`
- Testlevering met één klik
- Handmatige enable/disable schakelaar

## Voorbeelden van laadvermogen

### verzoek.voltooid

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

Veldvormen voor niet-`test.ping` gebeurtenissen worden gedefinieerd door de oproeplocaties die deze uitzenden; behandel het `data` object als voorwaarts compatibel (voeg velden toe, ben niet afhankelijk van afwezigheid).

## Beste praktijken

- **Controleer de handtekening bij elke levering** tegen het rauwe lichaam voorkomt — vervalste POSTs van iedereen die uw webhook URL raadt.
- **Reageer 2xx binnen ~ 5 seconden** — de coördinator krijgt een time-out na 10 s. Langzame ontvangers zullen nieuwe pogingen opeten en `failure_count` opblazen.
- **Maak begeleiders idempotent** — pogingen en de semantiek van minstens één keer bezorgen zorgen ervoor dat duplicaten mogelijk zijn.
- **Abonneer minimaal** — vermeldt alleen evenementen die u daadwerkelijk gebruikt; `"*"` brengt kosten in rekening voor ontvangers die u niet beheert.
- **Kijk `failure_count`** — eindpunten worden automatisch uitgeschakeld bij 10 opeenvolgende fouten; resetten door `PUT /api/webhooks/[id]` aan te roepen met `enabled: true` nadat de ontvanger is gerepareerd.
- **Roteer geheimen periodiek** — `PUT` een nieuwe `secret`, implementeer de nieuwe waarde naar de ontvanger en bevestig via het testeindpunt.

## Zie ook

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — volledig beheer API oppervlak
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — stroomonderbreker/cooldown-semantiek achter providerfouten opgedoken via `request.failed`
- Bron: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
