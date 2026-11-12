# Webhooks (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Vir resnice:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Zadnja posodobitev:** 2026-06-28 — v3.8.40

OmniRoute lahko sproži spletne trnke HTTP na dogodkih platforme. Uporabite jih za integracijo z Slack, PagerDuty, Datadog, notranjimi storitvami opozarjanja ali katerim koli sprejemnikom HTTP.

Dispečer podpiše vsako dostavo z HMAC-SHA256, znova poskusi ob prehodnih napakah, sledi zdravju dostave na webhook in samodejno onemogoči končne točke, ki nenehno odpovedujejo.

## Podprti dogodki

Tip `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, ki ga uporablja `src/lib/webhookDispatcher.ts`) trenutno modelira sedem dogodkov:

| Dogodek                   | Požari, ko                                                                                                           |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Posredovana zahteva se uspešno zaključi                                                                              |
| `request.failed`          | Proksi zahteva ne uspe po vseh retries/fallback                                                                      |
| `quota.exceeded`          | Ključ API prestopi prag budget/quota                                                                                 |
| `proxy.set_aside`         | Član skupine proxy je po večkratnih zavrnitvah izločen (samo prehod)                                                 |
| `proxy.pool.exhausted`    | Vsak član obsega bazena proxy je postavljen na stran                                                                 |
| `provider.reset_redeemed` | Samodejna uporaba bančnih ponastavitev je unovčila dobroimetje za ponastavitev ali ponastavitev tedenske seje Claude |
| `test.ping`               | Sintetični dogodek, ki ga uporablja preskusna končna točka                                                           |

Naročnine sprejemajo dobesedno `"*"` za prejemanje vsakega dogodka. Neznana imena dogodkov v `events` so ob času pošiljanja prezrta.

> Opomba: dispečerski API je povezan, vendar produkcijska klicna mesta za nekatere dogodke, ki niso `test.ping`, še vedno pristajajo. Preverite `grep dispatchEvent`, da vidite, katere poti trenutno kličejo dispečerja v vaši izdaji.

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

Za klicatelja je odpošiljanje sproži in pozabi: `Promise.allSettled` pogoltne napake na webhook, tako da en slab sprejemnik ne more blokirati drugih.

## Podpis HMAC

Ko ima webhook `secret`, OmniRoute podpiše telo JSON in pošlje:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Imena glav uporabljajo predpono `X-Webhook-*` (ne `X-OmniRoute-*`). Vrednost podpisa je `sha256=<hex>` — preveri celotno predpono.

Če je `createWebhook` poklican brez skrivnosti, jo modul DB ustvari (`whsec_<48 hex>`), tako da so vsi spletni trnki privzeto podpisani.

### Preverjanje na sprejemniku

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Vedno preverite glede na **surovo** telo zahteve pred kakršnim koli razčlenjevanjem JSON.

## Pravilnik o ponovnem poskusu in neuspehu

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 sekundna časovna omejitev na poskus (`AbortController`).
- HTTP 2xx šteje za uspeh.
- HTTP 3xx/4xx se šteje kot končni status —, ki ga ni mogoče ponovno poskusiti, zabeležen kot dostavljen z `success = res.ok`.
- HTTP 5xx in omrežne napake se znova poskusijo z eksponentnim odmikom: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Po `maxRetries` se dostava zabeleži kot neuspešna.
- Vsaka dobava posodobi `last_triggered_at`, `last_status` in ponastavi ali poveča `failure_count`.
- Dispečer pokliče `disableWebhooksWithHighFailures(10)` po vsakem razprševanju, tako da je kateri koli webhook z `failure_count >= 10` samodejno onemogočen.

## Baza podatkov

Tabela `webhooks` (migracija `011_webhooks.sql`):

| Stolpec             | Vrsta   | Opombe                                            |
| ------------------- | ------- | ------------------------------------------------- |
| `id`                | TEXT PK | UUID                                              |
| `url`               | TEXT    | Destinacija URL                                   |
| `events`            | TEXT    | JSON ; privzeti `["*"]`                           |
| `secret`            | TEXT    | Skrivnost HMAC (samodejno ustvarjena, če ni dana) |
| `enabled`           | INT     | 0/1; privzeto je 1                                |
| `description`       | TEXT    | Izbirna človeška oznaka                           |
| `created_at`        | TEXT    | `datetime('now')`                                 |
| `last_triggered_at` | TEXT    | Posodobljeno ob vsakem poskusu dostave            |
| `last_status`       | INT     | Stanje HTTP zadnjega poskusa (0 omrežje = )       |
| `failure_count`     | INT     | Ponastavi se na 0 ob uspehu, + 1 ob neuspehu      |

Zgodovina dostave je poleg skupnih števcev v vrstici `webhooks` shranjena v namenski tabeli `webhook_deliveries` (migracija `069_webhook_deliveries.sql`, zapisana prek `src/lib/db/webhookDeliveries.ts::insertDelivery` ob vsakem poskusu). Vrste metapodatkov (Slack / Discord / Telegram / transformatorji tovora po meri) je dodal `070_webhooks_kind_metadata.sql`.

## REST API

Vse končne točke zahtevajo avtorizacijo upravljanja (`requireManagementAuth`).

| Končna točka                    | Metoda | Opis                                            |
| ------------------------------- | ------ | ----------------------------------------------- |
| `/api/webhooks`                 | GET    | Seznam webhookov (zamaskirane skrivnosti)       |
| `/api/webhooks`                 | POST   | Ustvari webhook                                 |
| `/api/webhooks/[id]`            | GET    | Podrobnosti spletnega trnka (popolna skrivnost) |
| `/api/webhooks/[id]`            | PUT    | Posodobi polja                                  |
| `/api/webhooks/[id]`            | DELETE | Odstrani                                        |
| `/api/webhooks/[id]/test`       | POST   | Sproži `test.ping` (brez ponovnih poskusov)     |
| `/api/webhooks/[id]/deliveries` | GET    | Nedavni poskusi dostave za en webhook           |
| `/api/webhooks/validate-url`    | POST   | Validacija URL pred letom (zaščita SSRF )       |

`GET /api/webhooks` prikrije skrivnost `<first 10 chars>...`, da prepreči uhajanje na straneh s seznami. Uporabite `[id]` GET, ko res potrebujete skrivnost.

### Ustvari webhook

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

Če je `secret` izpuščen, strežnik ustvari skrivnost `whsec_<hex>` in jo vrne v odgovoru.

### Test webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Vrne `{ delivered, status, error }`. Brez ponovnih poskusov. — je uporaben za hitro preverjanje, ali sprejemnik sprejema tovor in podpis.

## Nadzorna plošča

Stran nadzorne plošče pri `/dashboard/webhooks` (glejte `src/app/(dashboard)/dashboard/webhooks/page.tsx`) ponuja:

- Create/edit webhooks z izbirnikom dogodkov
- Indikator stanja (aktiven/neaktiven/z napako) na podlagi `enabled`, `failure_count` in `last_status`
- Dostava testa z enim klikom
- Ročni preklop enable/disable

## Primeri tovora

### zahteva.izpolnjeno

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

Oblike polj za dogodke, ki niso `test.ping` definirajo klicna mesta, ki jih oddajajo; obravnavajte objekt `data` kot naprej združljiv (dodajte polja, ne odvisni od odsotnosti).

## Najboljše prakse

- **Ob vsaki pošiljki preverite podpis** proti neobdelanemu telesu — preprečuje ponarejen POSTs vsakomur, ki ugane vaš webhook URL.
- **Odgovorite 2xx v ~ 5 sekundah** — dispečer poteče pri 10 s. Počasni sprejemniki bodo jedli ponovne poskuse in napihnili `failure_count`.
- **Naj bodo upravljalci idempotentni** Ponovni poskusi — in semantika dostave vsaj enkrat pomenijo, da so možni dvojniki.
- **Naročite se minimalno** — navaja samo dogodke, ki jih dejansko porabite; `"*"` bo povečal stroške za sprejemnike, ki jih ne nadzorujete.
- **Oglejte si `failure_count`** Končne točke — so samodejno onemogočene pri 10 zaporednih napakah; ponastavite s klicem `PUT /api/webhooks/[id]` z `enabled: true` po popravku sprejemnika.
- **Občasno zamenjajte skrivnosti** — `PUT` nov `secret`, razporedite novo vrednost v sprejemnik in potrdite prek testne končne točke.

## Glej tudi

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — polno upravljanje površine API
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — odklopnik/semantika ohlajanja za napakami ponudnika, ki so se pojavili prek `request.failed`
- Vir: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
