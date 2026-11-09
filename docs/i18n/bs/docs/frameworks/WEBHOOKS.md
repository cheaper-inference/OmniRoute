# Webhooks (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Izvor istine:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Posljednje ažurirano:** 2026-06-28 — v3.8.40

OmniRoute može pokrenuti HTTP webhookove na događajima platforme. Koristite ih za integraciju sa Slack, PagerDuty, Datadog, internim servisima za upozorenje ili bilo kojim HTTP prijemnikom.

Dispečer potpisuje svaku isporuku sa HMAC-SHA256, ponovo pokušava u slučaju prolaznih kvarova, prati zdravlje isporuke po webhooku i automatski onemogućuje krajnje tačke koje i dalje ne uspijevaju.

## Podržani događaji

`WebhookEvent` tip (`src/lib/webhooks/eventDescriptions.ts`, konzumira `src/lib/webhookDispatcher.ts`) trenutno modelira sedam događaja:

| Događaj                   | Pali kada                                                                                                              |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Proxy zahtjev je uspješno završen                                                                                      |
| `request.failed`          | Proksirani zahtjev ne uspijeva nakon svih retries/fallback                                                             |
| `quota.exceeded`          | API ključ prelazi budget/quota prag                                                                                    |
| `proxy.set_aside`         | Član skupa proksija se izdvaja nakon ponovljenih odbijanja (samo prijelaz)                                             |
| `proxy.pool.exhausted`    | Svaki član opsega proxy pool-a je izdvojen                                                                             |
| `provider.reset_redeemed` | Automatska primjena bankovnih poništavanja iskoristila je kredit za resetiranje ili resetiranje sedmične sesije Claude |
| `test.ping`               | Sintetički događaj koji koristi krajnja točka testa                                                                    |

Pretplate prihvataju doslovno `"*"` za primanje svakog događaja. Nepoznata imena događaja u `events` se zanemaruju u vrijeme otpreme.

> Napomena: dispečerski API je povezan, ali proizvodne pozivne lokacije za neke od događaja koji nisu `test.ping` još uvijek slijeću. Provjerite `grep dispatchEvent` da vidite koje staze trenutno pozivaju dispečera u vašem izdanju.

## Arhitektura

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

Otpremanje je pali i zaboravi za pozivaoca: `Promise.allSettled` guta greške po webhook-u tako da jedan loš prijemnik ne može blokirati druge.

## Potpisivanje HMAC

Kada webhook ima `secret`, OmniRoute potpisuje JSON tijelo i šalje:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Imena zaglavlja koriste `X-Webhook-*` prefiks (ne `X-OmniRoute-*`). Vrijednost potpisa je `sha256=<hex>` — provjeri puni prefiks.

Ako je `createWebhook` pozvan bez tajne, DB modul generira jedan (`whsec_<48 hex>`) tako da su svi web-hukci potpisani po defaultu.

### Provjera na prijemniku

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Uvijek provjerite u odnosu na **sirovo** tijelo zahtjeva, prije bilo kakvog JSON raščlanjivanja.

## Politika ponovnog pokušaja i neuspjeha

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Vremensko ograničenje od 10 sekundi po pokušaju (`AbortController`).
- HTTP 2xx se računa kao uspjeh.
- HTTP 3xx/4xx se računa kao konačni status — koji se ne može ponoviti i koji je zabilježen kao isporučen sa `success = res.ok`.
- HTTP 5xx i mrežne greške se ponovo pokušavaju s eksponencijalnim povlačenjem: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Nakon `maxRetries`, isporuka se bilježi kao neuspješna.
- Svaka isporuka ažurira `last_triggered_at`, `last_status` i resetuje ili povećava `failure_count`.
- Dispečer poziva `disableWebhooksWithHighFailures(10)` nakon svakog odvajanja, tako da je svaki webhook sa `failure_count >= 10` automatski onemogućen.

## Baza podataka

Tabela `webhooks` (migracija `011_webhooks.sql`):

| Kolona              | Tip     | Bilješke                                                 |
| ------------------- | ------- | -------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                     |
| `url`               | TEXT    | Odredište URL                                            |
| `events`            | TEXT    | JSON niz; default `["*"]`                                |
| `secret`            | TEXT    | HMAC tajna (automatski generirana ako nije data)         |
| `enabled`           | INT     | 0/1; podrazumevano je 1                                  |
| `description`       | TEXT    | Opcionalna ljudska oznaka                                |
| `created_at`        | TEXT    | `datetime('now')`                                        |
| `last_triggered_at` | TEXT    | Ažurirano pri svakom pokušaju isporuke                   |
| `last_status`       | INT     | HTTP status posljednjeg pokušaja (0 = mreža)             |
| `failure_count`     | INT     | Vraća se na 0 u slučaju uspjeha, + 1 u slučaju neuspjeha |

Istorija isporuke se zadržava u namjenskoj `webhook_deliveries` tabeli (migracija `069_webhook_deliveries.sql`, upisana preko `src/lib/db/webhookDeliveries.ts::insertDelivery` pri svakom pokušaju), pored agregatnih brojača u `webhooks` redu. Vrsta metapodataka (Slack / Discord / Telegram / prilagođeni transformatori tereta) je dodao `070_webhooks_kind_metadata.sql`.

## REST API

Sve krajnje tačke zahtijevaju autorizaciju upravljanja (`requireManagementAuth`).

| Krajnja tačka                   | Metoda | Opis                                       |
| ------------------------------- | ------ | ------------------------------------------ |
| `/api/webhooks`                 | GET    | Navedite webhookove (tajne maskirane)      |
| `/api/webhooks`                 | POST   | Kreirajte webhook                          |
| `/api/webhooks/[id]`            | GET    | Detalji webhooka (potpuna tajna)           |
| `/api/webhooks/[id]`            | PUT    | Ažurirajte polja                           |
| `/api/webhooks/[id]`            | DELETE | Ukloni                                     |
| `/api/webhooks/[id]/test`       | POST   | Pokreni `test.ping` (bez pokušaja)         |
| `/api/webhooks/[id]/deliveries` | GET    | Nedavni pokušaji isporuke za jedan webhook |
| `/api/webhooks/validate-url`    | POST   | URL validacija prije leta (SSRF zaštita)   |

`GET /api/webhooks` maskira tajnu `<first 10 chars>...` kako bi se izbjeglo curenje na stranicama sa listingom. Koristite `[id]` GET kada vam je tajna zaista potrebna.

### Kreirajte webhook

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

Ako je `secret` izostavljen, server generiše `whsec_<hex>` tajnu i vraća je u odgovoru.

### Test webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Vraća `{ delivered, status, error }`. Ne pokušavaju se ponovljeni pokušaji. — je koristan za brzu provjeru da li primatelj prihvaća teret i potpis.

## Dashboard

Stranica kontrolne ploče u `/dashboard/webhooks` (pogledajte `src/app/(dashboard)/dashboard/webhooks/page.tsx`) pruža:

- Create/edit webhookovi s biračem događaja
- Indikator statusa (aktivan / neaktivan / greška) zasnovan na `enabled`, `failure_count` i `last_status`
- Isporuka testa jednim klikom
- Ručno prebacivanje enable/disable

## Primjeri nosivosti

### zahtjev.završen

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

Oblici polja za događaje koji nisu `test.ping` definirani su pozivnim mjestima koja ih emituju; tretirajte `data` objekat kao kompatibilan za prosljeđivanje (dodajte polja, ne ovise o odsustvu).

## Najbolje prakse

- **Ovjerite potpis na svakoj isporuci** protiv sirovog tijela — sprječava lažni POSTs od bilo koga ko pogodi vaš webhook URL.
- **Odgovorite 2xx unutar ~ 5 sekundi** — dispečer istekne na 10 s. Spori prijemnici će pojesti ponovne pokušaje i naduvati `failure_count`.
- **Učinite rukovaoce idempotentnima** — ponovni pokušaji i semantika isporuke najmanje jednom znače da su duplikati mogući.
- **Pretplatite se minimalno** — navodi samo događaje koje stvarno konzumirate; `"*"` će dodati troškove za prijemnike koje ne kontrolišete.
- **Gledajte `failure_count`** — krajnje tačke se automatski deaktiviraju pri 10 uzastopnih kvarova; resetirajte pozivanjem `PUT /api/webhooks/[id]` sa `enabled: true` nakon popravljanja prijemnika.
- **Povremeno rotirajte tajne** — `PUT` novi `secret`, implementirajte novu vrijednost na prijemnik i potvrdite preko testne krajnje točke.

## Vidi također

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — potpuno upravljanje API površinom
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — semantika prekidača / hlađenja iza kvarova provajdera otkrivenih preko `request.failed`
- Izvor: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
