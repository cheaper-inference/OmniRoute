# Webhooks (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Zdroj pravdy:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Posledná aktualizácia:** 2026-06-28 — v3.8.40

OmniRoute môže spúšťať webhooky HTTP na udalostiach platformy. Použite ich na integráciu so Slack, PagerDuty, Datadog, internými výstražnými službami alebo akýmkoľvek prijímačom HTTP.

Dispečer podpíše každú dodávku pomocou HMAC-SHA256, zopakuje prechodné zlyhania, sleduje stav doručenia podľa webhooku a automaticky deaktivuje koncové body, ktoré stále zlyhávajú.

## Podporované udalosti

Typ `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, spotrebovaný `src/lib/webhookDispatcher.ts`) v súčasnosti modeluje sedem udalostí:

| Udalosť                   | Požiare, keď                                                                                             |
| ------------------------- | -------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Žiadosť cez proxy sa úspešne dokončí                                                                     |
| `request.failed`          | Žiadosť cez proxy zlyhá po všetkých retries/fallback                                                     |
| `quota.exceeded`          | Kľúč API prekračuje prah budget/quota                                                                    |
| `proxy.set_aside`         | Po opakovaných odmietnutiach je člen skupiny proxy vyčlenený (iba prechod)                               |
| `proxy.pool.exhausted`    | Každý člen rozsahu proxy poolu je vyčlenený                                                              |
| `provider.reset_redeemed` | Automaticky aplikované bankové resety využili resetovaný kredit alebo resetovali týždennú reláciu Claude |
| `test.ping`               | Syntetická udalosť používaná koncovým bodom testu                                                        |

Predplatné akceptuje doslovné `"*"`, aby ste dostali každú udalosť. Neznáme názvy udalostí v `events` sú v čase odoslania ignorované.

> Poznámka: Dispečer API je pripojený, ale miesta volania produkcie pre niektoré udalosti, ktoré nie sú `test.ping`, stále pristávajú. Skontrolujte `grep dispatchEvent`, aby ste videli, ktoré cesty momentálne vyvolávajú dispečera vo vašom vydaní.

## Architektúra

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

Odoslanie je pre volajúceho prvoradé: `Promise.allSettled` prehltne chyby na webhook, takže jeden zlý prijímač nemôže blokovať ostatné.

## Podpis HMAC

Keď má webhook `secret`, OmniRoute podpíše telo JSON a odošle:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Názvy hlavičiek používajú predponu `X-Webhook-*` (nie `X-OmniRoute-*`). Hodnota podpisu je `sha256=<hex>` — overte celú predponu.

Ak sa volá `createWebhook` bez tajomstva, modul DB ho vygeneruje (`whsec_<48 hex>`), takže všetky webhooky sú štandardne podpísané.

### Overenie na prijímači

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Vždy overte oproti **surové** telo žiadosti pred akoukoľvek analýzou JSON.

## Zásady opätovného pokusu a zlyhania

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10-sekundový časový limit na pokus (`AbortController`).
- HTTP 2xx sa počíta ako úspech.
- HTTP 3xx/4xx sa počíta ako neopakovateľný konečný stav — zaznamenaný ako doručený so `success = res.ok`.
- HTTP 5xx a sieťové chyby sa opakujú s exponenciálnym stiahnutím: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Po `maxRetries` sa dodávka zaznamená ako neúspešná.
- Každá dodávka aktualizuje `last_triggered_at`, `last_status` a buď resetuje alebo zvýši `failure_count`.
- Dispečer volá `disableWebhooksWithHighFailures(10)` po každom rozvetvení, takže každý webhook so `failure_count >= 10` je automaticky zakázaný.

## Databáza

Tabuľka `webhooks` (migrácia `011_webhooks.sql`):

| Stĺpec              | Typ     | Poznámky                                                  |
| ------------------- | ------- | --------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                      |
| `url`               | TEXT    | Destinácia URL                                            |
| `events`            | TEXT    | pole JSON ; predvolené `["*"]`                            |
| `secret`            | TEXT    | Tajomstvo HMAC (automaticky generované, ak nie je zadané) |
| `enabled`           | INT     | 0/1; predvolene je 1                                      |
| `description`       | TEXT    | Voliteľné označenie človeka                               |
| `created_at`        | TEXT    | `datetime('now')`                                         |
| `last_triggered_at` | TEXT    | Aktualizované pri každom pokuse o doručenie               |
| `last_status`       | INT     | Stav HTTP posledného pokusu (0 sieť = )                   |
| `failure_count`     | INT     | Resetuje sa na 0 pri úspechu, + 1 pri neúspechu           |

História doručenia sa uchováva vo vyhradenej tabuľke `webhook_deliveries` (migrácia `069_webhook_deliveries.sql`, zapísaná cez `src/lib/db/webhookDeliveries.ts::insertDelivery` pri každom pokuse), okrem súhrnných počítadiel v riadku `webhooks`. Druhové metadáta (Slack / Discord / Telegram / vlastné transformátory užitočného zaťaženia) pridal `070_webhooks_kind_metadata.sql`.

## REST API

Všetky koncové body vyžadujú autorizáciu správy (`requireManagementAuth`).

| Koncový bod                     | Metóda | Popis                                        |
| ------------------------------- | ------ | -------------------------------------------- |
| `/api/webhooks`                 | GET    | Zoznam webhookov (skryté tajomstvá)          |
| `/api/webhooks`                 | POST   | Vytvorte webhook                             |
| `/api/webhooks/[id]`            | GET    | Podrobnosti webhooku (úplné tajomstvo)       |
| `/api/webhooks/[id]`            | PUT    | Aktualizujte polia                           |
| `/api/webhooks/[id]`            | DELETE | Odstrániť                                    |
| `/api/webhooks/[id]/test`       | POST   | Spustite `test.ping` (žiadne pokusy)         |
| `/api/webhooks/[id]/deliveries` | GET    | Nedávne pokusy o doručenie pre jeden webhook |
| `/api/webhooks/validate-url`    | POST   | Predletová validácia URL (ochrana SSRF )     |

`GET /api/webhooks` maskuje tajomstvo `<first 10 chars>...`, aby sa zabránilo úniku na stránkach so zoznamom. Použite `[id]` GET keď skutočne potrebujete tajomstvo.

### Vytvorte webhook

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

Ak sa vynechá `secret`, server vygeneruje tajný kľúč `whsec_<hex>` a vráti ho v odpovedi.

### Testovací webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Vráti `{ delivered, status, error }`. Nepokúšajú sa žiadne pokusy. — je užitočné na rýchle overenie, či prijímač akceptuje užitočné zaťaženie a podpis.

## Dashboard

Stránka dashboard na `/dashboard/webhooks` (pozri `src/app/(dashboard)/dashboard/webhooks/page.tsx`) poskytuje:

- Webhooky Create/edit s výberom udalostí
- Indikátor stavu (aktívny / neaktívny / chybný) na základe `enabled`, `failure_count` a `last_status`
- Doručenie testu jedným kliknutím
- Manuálne prepínanie enable/disable

## Príklady užitočného zaťaženia

### žiadosť.vybavená

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

Tvary polí pre udalosti, ktoré nie sú `test.ping` sú definované miestami volania, ktoré ich vysielajú; zaobchádzať s objektom `data` ako s dopredne kompatibilným (pridajte polia, nezávisia od neprítomnosti).

## osvedčené postupy

- **Overte podpis na každej zásielke** proti surovému telu — bráni falošnému POSTs každému, kto uhádne váš webhook URL.
- **Odpovedzte 2xx do 5 sekúnd ~** — dispečer vyprší o 10 s. Pomalé prijímače zjedia pokusy a nafúknu `failure_count`.
- **Urobte manipulátorov idempotentnými** Opakované pokusy — a sémantika doručenia aspoň raz znamenajú, že sú možné duplikáty.
- **Odoberajte minimálne** — uvádza iba udalosti, ktoré skutočne konzumujete; `"*"` zvýši náklady na prijímače, ktoré neovládate.
- **Sledujte `failure_count`** Koncové body — sa automaticky deaktivujú pri 10 po sebe nasledujúcich zlyhaniach; resetujte volaním `PUT /api/webhooks/[id]` so `enabled: true` po upevnení prijímača.
- **Pravidelne otáčajte tajomstvá** — `PUT` nové `secret`, nasaďte novú hodnotu do prijímača a potvrďte prostredníctvom testovacieho koncového bodu.

## Pozri tiež

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — plná správa API povrch
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) Sémantika ističa/chladenia — za zlyhaniami poskytovateľa sa objavila prostredníctvom `request.failed`
- Zdroj: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
