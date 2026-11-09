# Webhooks (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Tõe allikas:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Viimati värskendatud:** 28.06.2026 — v3.8.40

OmniRoute saab käivitada HTTP veebihaake platvormi sündmustel. Kasutage neid Slack, PagerDuty, Datadogi, sisemiste hoiatusteenuste või mis tahes HTTP vastuvõtjaga integreerimiseks.

Dispetšer allkirjastab iga tarne HMAC-SHA256, proovib mööduvaid tõrkeid uuesti, jälgib kohaletoimetamise seisukorda veebihaagi kaupa ja keelab automaatselt lõpp-punktid, mis pidevalt ebaõnnestuvad.

## Toetatud sündmused

`WebhookEvent` tüüp (`src/lib/webhooks/eventDescriptions.ts`, tarbib `src/lib/webhookDispatcher.ts`) modelleerib praegu seitset sündmust:

| Sündmus                   | Põleb, kui                                                                                                        |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Puhverserveri taotlus on edukalt lõpule viidud                                                                    |
| `request.failed`          | Puhverserveri taotlus nurjub pärast kogu retries/fallback                                                         |
| `quota.exceeded`          | API võti ületab budget/quota läve                                                                                 |
| `proxy.set_aside`         | Puhverserveri koguli liige jäetakse pärast korduvaid keeldumisi kõrvale (ainult üleminek)                         |
| `proxy.pool.exhausted`    | Iga puhverserveri kogumi liige on kõrvale jäetud                                                                  |
| `provider.reset_redeemed` | Panga lähtestamise automaatne rakendamine lunastas lähtestamiskrediidi või Claude iganädalase seansi lähtestamise |
| `test.ping`               | Testi lõpp-punktis kasutatav sünteetiline sündmus                                                                 |

Tellimused aktsepteerivad iga sündmuse vastuvõtmiseks sõnasõnalist `"*"`. Tundmatuid sündmuste nimesid `events` s eiratakse lähetamise ajal.

> Märkus. Dispetšer API on juhtmega, kuid mõnede mitte-`test.ping` sündmuste tootmiskõnede saidid maanduvad endiselt. Kontrollige `grep dispatchEvent` et näha, millised teed teie versioonis praegu dispetšerit kutsuvad.

## Arhitektuur

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

Väljasaatmine on helistaja jaoks tuli ja unusta: `Promise.allSettled` neelab veebihaagi vead, nii et üks halb vastuvõtja ei saa teisi blokeerida.

## HMAC allkirjastamine

Kui veebihaagil on `secret`, allkirjastab OmniRoute JSON keha ja saadab:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Päise nimed kasutavad `X-Webhook-*` eesliidet (mitte `X-OmniRoute-*`). Allkirja väärtus on `sha256=<hex>` — kontrollige täielikku eesliidet.

Kui `createWebhook` kutsutakse välja ilma saladuseta, genereerib DB moodul selle (`whsec_<48 hex>`), nii et kõik veebihaagid allkirjastatakse vaikimisi.

### Vastuvõtja kontrollimine

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Kontrollige alati vastu **toores** päringu keha enne mis tahes JSON sõelumist.

## Uuesti proovimise ja ebaõnnestumise eeskirjad

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10-sekundiline ajalõpp katse kohta (`AbortController`).
- HTTP 2xx loetakse õnnestunuks.
- HTTP 3xx/4xx loetakse lõplikuks olekuks — mida ei saa `success = res.ok` proovida.
- HTTP 5xx ja võrguvigu proovitakse uuesti eksponentsiaalse tagasilöögiga: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Pärast `maxRetries` registreeritakse tarne ebaõnnestunuks.
- Iga tarne värskendab `last_triggered_at`, `last_status` ja kas lähtestab või suurendab `failure_count`.
- Dispetšer helistab `disableWebhooksWithHighFailures(10)` pärast iga väljapuhumist, nii et kõik `failure_count >= 10` -ga veebikonks on automaatselt keelatud.

## Andmebaas

Tabel `webhooks` (migratsioon `011_webhooks.sql`):

| Veerg               | Tüüp    | Märkmed                                                       |
| ------------------- | ------- | ------------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                          |
| `url`               | TEXT    | Sihtkoht URL                                                  |
| `events`            | TEXT    | JSON massiiv; vaikimisi `["*"]`                               |
| `secret`            | TEXT    | HMAC saladus (genereeritud automaatselt, kui seda pole antud) |
| `enabled`           | INT     | 0/1; vaikimisi 1                                              |
| `description`       | TEXT    | Valikuline inimese silt                                       |
| `created_at`        | TEXT    | `datetime('now')`                                             |
| `last_triggered_at` | TEXT    | Uuendatakse igal tarnekatsel                                  |
| `last_status`       | INT     | Viimase katse HTTP olek (0 = võrk)                            |
| `failure_count`     | INT     | Lähtestab 0 õnnestumise korral, + 1 ebaõnnestumise korral     |

Tarneajalugu säilitatakse lisaks `webhooks` rea koondloenduritele spetsiaalses `webhook_deliveries` tabelis (migratsioon `069_webhook_deliveries.sql`, kirjutatakse `src/lib/db/webhookDeliveries.ts::insertDelivery` kaudu igal katsel). Kind metaandmed (Slack / Discord / Telegram / kohandatud kasuliku koormuse trafod) lisas `070_webhooks_kind_metadata.sql`.

## REST API

Kõik lõpp-punktid nõuavad haldamise autentimist (`requireManagementAuth`).

| Lõpp-punkt                      | meetod | Kirjeldus                                 |
| ------------------------------- | ------ | ----------------------------------------- |
| `/api/webhooks`                 | GET    | Veebihaagide loend (saladused varjatud)   |
| `/api/webhooks`                 | POST   | Loo veebihaak                             |
| `/api/webhooks/[id]`            | GET    | Veebihaagi üksikasjad (täielik saladus)   |
| `/api/webhooks/[id]`            | PUT    | Värskenda väljad                          |
| `/api/webhooks/[id]`            | DELETE | Eemalda                                   |
| `/api/webhooks/[id]/test`       | POST   | Käivitage `test.ping` (ei proovi uuesti)  |
| `/api/webhooks/[id]/deliveries` | GET    | Ühe veebihaagi hiljutised edastamiskatsed |
| `/api/webhooks/validate-url`    | POST   | Lennueelne URL valideerimine (SSRF valve) |

`GET /api/webhooks` varjab `<first 10 chars>...` saladust, et vältida loendilehtedele lekkimist. Kasutage `[id]` GET, kui vajate saladust.

### Loo veebihaak

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

Kui `secret` jäetakse välja, genereerib server `whsec_<hex>` saladuse ja tagastab selle vastuses.

### Testige veebihaagi

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Tagastab `{ delivered, status, error }`. Korduskatseid ei üritata. — on kasulik kiireks kinnitamiseks, et vastuvõtja aktsepteerib kasulikku lasti ja allkirja.

## Armatuurlaud

`/dashboard/webhooks` armatuurlaua leht (vt `src/app/(dashboard)/dashboard/webhooks/page.tsx`) pakub järgmist:

- Create/edit veebihaagid sündmuste valijaga
- Olekuindikaator (aktiivne / passiivne / vigane) põhineb `enabled`, `failure_count` ja `last_status`
- Testedastus ühe klõpsuga
- Manuaalne enable/disable lüliti

## Kasuliku koormuse näited

### taotlus.lõpetatud

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

Mitte-`test.ping` sündmuste väljakujud on määratletud neid väljastavate kõnesaitide järgi; käsitleda `data` objekti edasiühilduvana (lisage väljad, ärge sõltuge puudumisest).

## Parimad tavad

- **Kontrollige allkirja igal tarnimisel** vastu töötlemata korpust — takistab võltsitud POSTs kõigilt, kes arvavad ära teie veebihaagi URL.
- **Vastake 2xx ~ 5 sekundi jooksul** Dispetšer — aegub 10 sekundi pärast. Aeglased vastuvõtjad söövad korduskatseid ja suurendavad `failure_count`.
- **Muutke käitlejad idempotentseks** — korduskatsed ja vähemalt korra edastamise semantika tähendavad, et duplikaadid on võimalikud.
- **Telli minimaalselt** — loetleb ainult sündmused, mida tegelikult tarbite; `"*"` lisab kulusid vastuvõtjatele, mida te ei kontrolli.
- **Vaadake `failure_count`** — lõpp-punktid keelatakse automaatselt 10 järjestikuse tõrke korral; lähtestage, helistades pärast vastuvõtja parandamist `PUT /api/webhooks/[id]` koos `enabled: true`.
- **Pöörake perioodiliselt saladusi** — `PUT` uus `secret`, juurutage uus väärtus vastuvõtjasse ja kinnitage testi lõpp-punkti kaudu.

## Vaata ka

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — täishaldus API pind
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — kaitselüliti/jahutussemantika pakkuja rikete taga, mis ilmnesid `request.failed` kaudu
- Allikas: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
