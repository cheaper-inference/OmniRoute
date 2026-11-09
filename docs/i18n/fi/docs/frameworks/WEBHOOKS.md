# Webhooks (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Totuuden lähde:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Viimeksi päivitetty:** 28.6.2026 — v3.8.40

OmniRoute voi käynnistää HTTP webhookeja alustatapahtumissa. Käytä niitä integroidaksesi Slack, PagerDuty, Datadogin, sisäisten hälytyspalvelujen tai minkä tahansa HTTP vastaanottimen kanssa.

Välittäjä allekirjoittaa jokaisen toimituksen HMAC-SHA256:lla, yrittää uudelleen ohimeneviä vikoja, seuraa toimituksen tilaa webhook-kohtaisesti ja poistaa automaattisesti käytöstä päätepisteet, jotka epäonnistuvat jatkuvasti.

## Tuetut tapahtumat

`WebhookEvent` tyyppi (`src/lib/webhooks/eventDescriptions.ts`, `src/lib/webhookDispatcher.ts`:n käyttämä) mallintaa tällä hetkellä seitsemää tapahtumaa:

| Tapahtuma                 | Tulee kun                                                                                                      |
| ------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Välityspalvelinpyyntö valmistuu onnistuneesti                                                                  |
| `request.failed`          | Välityspalvelinpyyntö epäonnistuu kaiken retries/fallback jälkeen                                              |
| `quota.exceeded`          | API -avain ylittää budget/quota -kynnyksen                                                                     |
| `proxy.set_aside`         | Välityspalvelimen jäsen erotetaan toistuvien kieltäytymisten jälkeen (vain siirtyminen)                        |
| `proxy.pool.exhausted`    | Jokainen välityspalvelimen laajuuden jäsen on varattu                                                          |
| `provider.reset_redeemed` | Automaattinen pankkiasetusten palautus lunasti palautushyvityksen tai Claude viikoittaisen istunnon nollauksen |
| `test.ping`               | Testin päätepisteen käyttämä synteettinen tapahtuma                                                            |

Tilaukset hyväksyvät kirjaimellisen `"*"` vastaanottamaan jokaisen tapahtuman. Tuntemattomat tapahtumanimet `events` ssä ohitetaan lähetyshetkellä.

> Huomautus: Dispatcher API on langallinen, mutta joidenkin muiden kuin `test.ping` tapahtumien tuotantokutsut saapuvat edelleen. Tarkista `grep dispatchEvent` nähdäksesi, mitkä polut kutsuvat tällä hetkellä julkaisusi lähettäjää.

## Arkkitehtuuri

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

Lähetys on soittajalle tulipalo ja unohda: `Promise.allSettled` nielee verkkokoukun virheet, joten yksi huono vastaanotin ei voi estää muita.

## HMAC -allekirjoitus

Kun webhookissa on `secret`, OmniRoute allekirjoittaa JSON rungon ja lähettää:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Otsikkojen nimet käyttävät `X-Webhook-*` etuliitettä (ei `X-OmniRoute-*`). Allekirjoituksen arvo on `sha256=<hex>` — tarkista koko etuliite.

Jos `createWebhook` kutsutaan ilman salaisuutta, DB moduuli luo sellaisen (`whsec_<48 hex>`), joten kaikki webhookit allekirjoitetaan oletusarvoisesti.

### Vahvistetaan vastaanottimessa

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Tarkista aina vastaan **raaka** pyyntöteksti ennen JSON jäsennystä.

## Uudelleenyritys- ja epäonnistumiskäytäntö

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 sekunnin aikakatkaisu yritystä kohden (`AbortController`).
- HTTP 2xx lasketaan menestykseksi.
- HTTP 3xx/4xx lasketaan lopulliseksi — tilaksi, jota ei voida yrittää `success = res.ok`.
- HTTP 5xx ja verkkovirheet yritetään uudelleen eksponentiaalisella perääntymisellä: `2^attempt * 1000 ms` (1s, 2s, 4s).
- `maxRetries`:n jälkeen toimitus kirjataan epäonnistuneeksi.
- Jokainen toimitus päivittää `last_triggered_at`, `last_status` ja joko nollaa tai lisää `failure_count`.
- Välittäjä soittaa `disableWebhooksWithHighFailures(10)` jokaisen puhalluksen jälkeen, joten kaikki `failure_count >= 10` llä varustettu webhook poistetaan automaattisesti käytöstä.

## Tietokanta

Taulukko `webhooks` (siirto `011_webhooks.sql`):

| Sarake              | Tyyppi  | Huomautuksia                                               |
| ------------------- | ------- | ---------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                       |
| `url`               | TEXT    | Kohde URL                                                  |
| `events`            | TEXT    | JSON array; oletus `["*"]`                                 |
| `secret`            | TEXT    | HMAC salaisuus (automaattisesti luotu, jos sitä ei anneta) |
| `enabled`           | INT     | 0/1; oletusarvo on 1                                       |
| `description`       | TEXT    | Valinnainen ihmismerkki                                    |
| `created_at`        | TEXT    | `datetime('now')`                                          |
| `last_triggered_at` | TEXT    | Päivitetään jokaisella toimitusyrityksellä                 |
| `last_status`       | INT     | Viimeisen yrityksen HTTP tila (0 = verkko)                 |
| `failure_count`     | INT     | Palautuu 0:aan onnistuessa, + 1:een epäonnistuessa         |

Toimitushistoria säilyy erillisessä `webhook_deliveries` taulukossa (siirto `069_webhook_deliveries.sql`, kirjoitetaan `src/lib/db/webhookDeliveries.ts::insertDelivery` kautta jokaisella yrityksellä) `webhooks` rivin aggregaattilaskurien lisäksi. `070_webhooks_kind_metadata.sql` lisäsi lajin metatiedot (Slack / Discord / Telegram / mukautetut hyötykuormamuuntajat).

## REST API

Kaikki päätepisteet vaativat hallinnan todennuksen (`requireManagementAuth`).

| Päätepiste                      | Menetelmä | Kuvaus                                              |
| ------------------------------- | --------- | --------------------------------------------------- |
| `/api/webhooks`                 | GET       | Luettelo webhookit (salaisuudet peitetty)           |
| `/api/webhooks`                 | POST      | Luo webhook                                         |
| `/api/webhooks/[id]`            | GET       | Webhook-tiedot (täysi salaisuus)                    |
| `/api/webhooks/[id]`            | PUT       | Päivitä kentät                                      |
| `/api/webhooks/[id]`            | DELETE    | Poistaa                                             |
| `/api/webhooks/[id]/test`       | POST      | Käynnistä `test.ping` (ei uudelleenyrityksiä)       |
| `/api/webhooks/[id]/deliveries` | GET       | Viimeaikaiset toimitusyritykset yhdelle webhookille |
| `/api/webhooks/validate-url`    | POST      | Lentoa edeltävä URL vahvistus (SSRF vartija)        |

`GET /api/webhooks` peittää `<first 10 chars>...` :n salaisuuden välttääkseen vuodon listaussivuilla. Käytä `[id]` GET, kun todella tarvitset salaisuutta.

### Luo webhook

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

Jos `secret` jätetään pois, palvelin luo `whsec_<hex>` salaisuuden ja palauttaa sen vastauksessa.

### Testaa webhookia

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Palauttaa `{ delivered, status, error }`. Uudelleenyrityksiä ei yritetä. — on hyödyllinen nopeassa varmentamisessa, että vastaanotin hyväksyy hyötykuorman ja allekirjoituksen.

## Kojelauta

`/dashboard/webhooks` :n kojelautasivu (katso `src/app/(dashboard)/dashboard/webhooks/page.tsx`) tarjoaa:

- Create/edit webhookit tapahtumavalitsimella
- Tilailmaisin (aktiivinen / ei-aktiivinen / virheellinen) perustuu `enabled`, `failure_count` ja `last_status`
- Yhden napsautuksen testitoimitus
- Manuaalinen enable/disable kytkin

## Esimerkkejä hyötykuormasta

### pyyntö.täytetty

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

Ei-`test.ping` -tapahtumien kenttämuodot määrittävät niitä lähettävät puhelupaikat; käsittele `data` objektia eteenpäin yhteensopivana (lisää kenttiä, älä riipu poissaolosta).

## Parhaat käytännöt

- **Tarkista jokaisen toimituksen allekirjoitus** raakarunkoa vasten — estää väärennetyn POSTs keneltä tahansa, joka arvaa verkkohookisi URL.
- **Vastaa 2xx ~ 5 sekunnin sisällä** Lähettäjä — aikakatkaisee 10 sekunnin kohdalla. Hitaat vastaanottimet syövät uudelleenyrityksiä ja täyttävät `failure_count`.
- **Tee ohjaajista idempotenteja** — uudelleenyritykset ja vähintään kerran toimituksen semantiikka tarkoittavat, että kaksoiskappaleet ovat mahdollisia.
- **Tilaa minimaalisesti** — listaa vain tapahtumat, joita todella käytät; `"*"` lisää kustannuksia vastaanottimissa, joita et hallitse.
- **Katso `failure_count`** — päätepisteet poistetaan automaattisesti käytöstä 10 peräkkäisen vian yhteydessä; nollaa soittamalla `PUT /api/webhooks/[id]` lle `enabled: true` llä vastaanottimen korjaamisen jälkeen.
- **Kierrä salaisuuksia säännöllisesti** — `PUT` uusi `secret`, ota uusi arvo käyttöön vastaanottimeen ja vahvista testipäätepisteen kautta.

## Katso myös

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — täyden hallinnan API pinta
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — katkaisija/jäähdytyssemantiikka palveluntarjoajan vikojen takana, jotka tulivat esille `request.failed` kautta
- Lähde: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
