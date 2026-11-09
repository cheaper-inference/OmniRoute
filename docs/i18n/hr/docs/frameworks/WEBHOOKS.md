# Webhooks (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Izvor istine:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Zadnje ažuriranje:** 2026-06-28 — v3.8.40

OmniRoute može aktivirati HTTP webhookove na događajima platforme. Koristite ih za integraciju sa Slack, PagerDuty, Datadogom, internim servisima za uzbunjivanje ili bilo kojim HTTP prijemnikom.

Dispečer potpisuje svaku isporuku pomoću HMAC-SHA256, ponovno pokušava kod prolaznih kvarova, prati ispravnost isporuke po web-dojavniku i automatski onemogućuje krajnje točke koje stalno ne uspijevaju.

## Podržani događaji

Vrsta `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, koristi `src/lib/webhookDispatcher.ts`) trenutno modelira sedam događaja:

| Događaj                   | Pali kada                                                                                                        |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Proxy zahtjev uspješno je dovršen                                                                                |
| `request.failed`          | Proxy zahtjev ne uspijeva nakon svih retries/fallback                                                            |
| `quota.exceeded`          | API ključ prelazi budget/quota prag                                                                              |
| `proxy.set_aside`         | Član proxy skupa izdvaja se nakon opetovanih odbijanja (samo prijelaz)                                           |
| `proxy.pool.exhausted`    | Svaki član opsega proxy skupa je izdvojen                                                                        |
| `provider.reset_redeemed` | Automatska primjena bankovnih resetiranja iskoristio je kredit za resetiranje ili resetirao Claude tjednu sesiju |
| `test.ping`               | Sintetički događaj koji koristi krajnja točka testa                                                              |

Pretplate prihvaćaju doslovni `"*"` za primanje svakog događaja. Nazivi nepoznatih događaja u `events` u zanemaruju se u vrijeme slanja.

> Napomena: dispečerski API je ožičen, ali proizvodne pozivne stranice za neke od događaja koji nisu `test.ping` još uvijek slijeću. Provjerite `grep dispatchEvent` da vidite koji putovi trenutno pozivaju dispečera u vašem izdanju.

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

Slanje je za pozivatelja "pokreni i zaboravi": `Promise.allSettled` guta pogreške po web-dojavniku tako da jedan loš primatelj ne može blokirati ostale.

## Potpisivanje HMAC

Kada web-dojavnik ima `secret`, OmniRoute potpisuje JSON tijelo i šalje:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Imena zaglavlja koriste `X-Webhook-*` prefiks (ne `X-OmniRoute-*`). Vrijednost potpisa je `sha256=<hex>` — provjerite puni prefiks.

Ako se `createWebhook` pozove bez tajne, DB modul generira tajnu (`whsec_<48 hex>`) tako da su svi web-dojavnici potpisani prema zadanim postavkama.

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

Uvijek provjerite prema **sirovo** tijelo zahtjeva, prije bilo kakvog JSON analiziranja.

## Politika ponovnog pokušaja i neuspjeha

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 sekundi čekanja po pokušaju (`AbortController`).
- HTTP 2xx se računa kao uspjeh.
- HTTP 3xx/4xx računa se kao konačni status bez ponovnog pokušaja — zabilježen kao isporučen sa `success = res.ok`.
- HTTP 5xx i mrežne pogreške ponovno se pokušavaju s eksponencijalnim odmakom: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Nakon `maxRetries` isporuka se bilježi kao neuspjela.
- Svaka isporuka ažurira `last_triggered_at`, `last_status` i poništava ili povećava `failure_count`.
- Dispečer poziva `disableWebhooksWithHighFailures(10)` nakon svakog fan-outa, tako da je svaki webhook sa `failure_count >= 10` automatski onemogućen.

## Baza podataka

Tablica `webhooks` (migracija `011_webhooks.sql`):

| stupac              | Tip     | Bilješke                                                 |
| ------------------- | ------- | -------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                     |
| `url`               | TEXT    | Odredište URL                                            |
| `events`            | TEXT    | JSON niz; zadani `["*"]`                                 |
| `secret`            | TEXT    | HMAC tajna (automatski generirana ako nije dana)         |
| `enabled`           | INT     | 0/1; zadano je 1                                         |
| `description`       | TEXT    | Izborna ljudska oznaka                                   |
| `created_at`        | TEXT    | `datetime('now')`                                        |
| `last_triggered_at` | TEXT    | Ažurira se pri svakom pokušaju isporuke                  |
| `last_status`       | INT     | HTTP status posljednjeg pokušaja (0 = mreža)             |
| `failure_count`     | INT     | Resetira na 0 u slučaju uspjeha, + 1 u slučaju neuspjeha |

Povijest isporuke čuva se u namjenskoj tablici `webhook_deliveries` (migracija `069_webhook_deliveries.sql`, ispisana putem `src/lib/db/webhookDeliveries.ts::insertDelivery` pri svakom pokušaju), uz skupne brojače u retku `webhooks`. Metapodatke vrste (Slack / Discord / Telegram / prilagođeni transformatori nosivosti) dodao je `070_webhooks_kind_metadata.sql`.

## REST API

Sve krajnje točke zahtijevaju autorizaciju upravljanja (`requireManagementAuth`).

| Krajnja točka                   | metoda | Opis                                            |
| ------------------------------- | ------ | ----------------------------------------------- |
| `/api/webhooks`                 | GET    | Popis webdojavnika (maskirane tajne)            |
| `/api/webhooks`                 | POST   | Stvorite web-dojavnik                           |
| `/api/webhooks/[id]`            | GET    | Pojedinosti o web-dojavniku (potpuna tajna)     |
| `/api/webhooks/[id]`            | PUT    | Ažurirajte polja                                |
| `/api/webhooks/[id]`            | DELETE | Ukloniti                                        |
| `/api/webhooks/[id]/test`       | POST   | Ispali `test.ping` (bez ponovnih pokušaja)      |
| `/api/webhooks/[id]/deliveries` | GET    | Nedavni pokušaji isporuke za jedan web-dojavnik |
| `/api/webhooks/validate-url`    | POST   | URL validacija prije leta (SSRF čuvar)          |

`GET /api/webhooks` skriva tajnu `<first 10 chars>...` u kako bi se izbjeglo curenje na stranicama popisa. Koristite `[id]` GET kada stvarno trebate tajnu.

### Stvorite web-dojavnik

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

Ako je `secret` izostavljen, poslužitelj generira `whsec_<hex>` tajnu i vraća je u odgovoru.

### Testiraj webdojavnik

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Vraća `{ delivered, status, error }`. Nema ponovnih pokušaja. — je koristan za brzu provjeru prihvaća li primatelj korisni teret i potpis.

## Nadzorna ploča

Stranica nadzorne ploče na `/dashboard/webhooks` (vidi `src/app/(dashboard)/dashboard/webhooks/page.tsx`) pruža:

- Create/edit web-dojavnici s biračem događaja
- Indikator statusa (aktivno/neaktivno/pogreška) na temelju `enabled`, `failure_count` i `last_status`
- Isporuka testa jednim klikom
- Ručni enable/disable prekidač

## Primjeri nosivosti

### zahtjev.dovršeno

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

Oblici polja za događaje koji nisu `test.ping` definirani su pozivnim mjestima koja ih emitiraju; tretirajte `data` objekt kao kompatibilan prema naprijed (dodajte polja, ne ovisite o odsutnosti).

## Najbolji primjeri iz prakse

- **Ovjerite potpis na svakoj dostavi** protiv sirovog tijela — sprječava lažni POSTs od bilo koga tko pogodi vaš webhook URL.
- **Odgovorite 2xx unutar ~ 5 sekundi** — dispečer istekne na 10 s. Spori primatelji će jesti ponovne pokušaje i napuhati `failure_count`.
- **Učinite rukovatelje idempotentnima** — ponovni pokušaji i semantika isporuke barem jednom znače da su mogući duplikati.
- **Pretplatite se minimalno** — navodi samo događaje koje stvarno konzumirate; `"*"` će povećati troškove na prijemnicima koje ne kontrolirate.
- **Gledajte `failure_count`** — krajnje točke automatski se onemogućuju pri 10 uzastopnih kvarova; resetirati pozivanjem `PUT /api/webhooks/[id]` sa `enabled: true` nakon popravljanja prijemnika.
- **Povremeno mijenjajte tajne** — `PUT` novi `secret`, implementirajte novu vrijednost na prijamniku i potvrdite putem testne krajnje točke.

## Vidi također

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — potpuno upravljanje API površinom
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — prekidač/semantika hlađenja koja stoji iza kvarova pružatelja isplivanih putem `request.failed`
- Izvor: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
