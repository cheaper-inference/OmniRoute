# Webhooks (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Hiteles forrás:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Utolsó frissítés:** 2026-06-28 — v3.8.40

Az OmniRoute HTTP-webhookokat indíthat a platform eseményeire. Ezekkel integrálható a
Slack, a PagerDuty, a Datadog, a belső riasztási szolgáltatások vagy bármely HTTP-fogadó.

A diszpécser minden kézbesítést HMAC-SHA256 használatával ír alá, átmeneti
hibák esetén újrapróbálkozik, webhookonként követi a kézbesítés állapotát, és automatikusan letiltja a
folyamatosan hibázó végpontokat.

## Támogatott események

A `WebhookEvent` típus (`src/lib/webhooks/eventDescriptions.ts`, `src/lib/webhookDispatcher.ts` által fogyasztott ) jelenleg nyolc eseményt modellez:

| Esemény                   | Kigyullad, amikor                                                                                                     |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | A proxy kérés sikeresen befejeződött                                                                                  |
| `request.failed`          | A proxy kérés minden retries/fallback után sikertelen                                                                 |
| `quota.exceeded`          | A API billentyű átlép egy budget/quota küszöböt                                                                       |
| `proxy.set_aside`         | A proxy pool-tag ismételt elutasítás után félretesz (csak átállás esetén)                                             |
| `proxy.pool.exhausted`    | A proxykészlet hatókörének minden tagja félre van állítva                                                             |
| `provider.reset_redeemed` | A banki visszaállítások automatikus alkalmazása visszaállítási jóváírást vagy a Claude heti munkamenet-visszaállítást |
| `provider.exhausted`      | Egy szolgáltató minden fiókja lehűl (szolgáltatónként legfeljebb egyszer 10 percenként)                               |
| `test.ping`               | A teszt végpont által használt szintetikus esemény                                                                    |

Az előfizetések elfogadják a szó szerinti `"*"` minden esemény fogadására. `events` ben lévő ismeretlen eseményneveket a rendszer figyelmen kívül hagyja a feladáskor.

> Megjegyzés: a diszpécser API vezetékes, de egyes nem `test.ping` események termelési hívóhelyei még mindig leszállnak. Ellenőrizze `grep dispatchEvent` hogy megtudja, mely útvonalak hívják meg jelenleg a diszpécsert a kiadásban.

## Architektúra

```
Hívó (kezelő, szolgáltatás, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> szűrés a webhook.events alapján
    -> minden egyezéshez (párhuzamosan):
       deliverWebhook(url, payload, secret)
         hasznos adat összeállítása { event, timestamp, data }
         törzs aláírása HMAC-SHA256 használatával (ha van secret)
         POST 10 másodperces időtúllépéssel
         legfeljebb 3 újrapróbálkozás 5xx / hálózati hiba esetén
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

A diszpécselés a hívó számára „indítsd el és felejtsd el” módon működik: a `Promise.allSettled`
elnyeli az egyes webhookok hibáit, így egy hibás fogadó nem blokkolhatja a többit.

## HMAC-aláírás

Ha egy webhook rendelkezik `secret` értékkel, az OmniRoute aláírja a JSON-törzset, és a következőket küldi:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <esemény>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hexadecimális HMAC-SHA256(secret, törzs)>
```

> A fejlécnevek az `X-Webhook-*` előtagot használják (nem az `X-OmniRoute-*` előtagot). Az aláírás
> értéke `sha256=<hex>` — a teljes előtagot ellenőrizni kell.

Ha a `createWebhook` meghívásakor nincs megadva secret, az adatbázismodul generál egyet
(`whsec_<48 hex>`), így alapértelmezés szerint minden webhook alá van írva.

### Ellenőrzés a fogadó oldalon

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Az ellenőrzést mindig a **nyers** kéréstörzs alapján, bármilyen JSON-feldolgozás előtt kell elvégezni.

## Újrapróbálkozási és hibakezelési szabályzat

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Próbálkozásonként 10 másodperces időkorlát (`AbortController`).
- A HTTP 2xx sikeresnek számít.
- A HTTP 3xx/4xx nem újrapróbálható végleges állapotnak számít — kézbesítettként lesz rögzítve,
  ahol `success = res.ok`.
- A HTTP 5xx válaszok és a hálózati hibák esetén exponenciális késleltetéssel történik újrapróbálkozás:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- A `maxRetries` elérése után a kézbesítés sikertelenként lesz rögzítve.
- Minden kézbesítés frissíti a `last_triggered_at` és `last_status` értékét, valamint vagy visszaállítja,
  vagy növeli a `failure_count` értékét.
- Az elosztó minden szétküldés után meghívja a `disableWebhooksWithHighFailures(10)` függvényt,
  így minden olyan webhook automatikusan letiltásra kerül, amelynél a `failure_count >= 10`.

## Adatbázis

A `webhooks` tábla (`011_webhooks.sql` migráció):

| Oszlop              | Típus   | Megjegyzések                                             |
| ------------------- | ------- | -------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                     |
| `url`               | TEXT    | Cél URL                                                  |
| `events`            | TEXT    | JSON-tömb; alapértelmezett értéke `["*"]`                |
| `secret`            | TEXT    | HMAC-titok (automatikusan generálódik, ha nincs megadva) |
| `enabled`           | INT     | 0/1; alapértelmezett értéke 1                            |
| `description`       | TEXT    | Opcionális, emberek számára olvasható címke              |
| `created_at`        | TEXT    | `datetime('now')`                                        |
| `last_triggered_at` | TEXT    | Minden kézbesítési kísérletkor frissül                   |
| `last_status`       | INT     | Az utolsó kísérlet HTTP-állapota (0 = hálózati hiba)     |
| `failure_count`     | INT     | Siker esetén 0-ra áll vissza, hiba esetén +1             |

A kézbesítési előzmények a külön erre szolgáló `webhook_deliveries` táblában maradnak meg
(`069_webhook_deliveries.sql` migráció, minden próbálkozáskor a
`src/lib/db/webhookDeliveries.ts::insertDelivery` írja), a `webhooks` sor összesített
számlálói mellett. A típusmetaadatokat (Slack / Discord /
Telegram / egyéni hasznosadat-átalakítók) a `070_webhooks_kind_metadata.sql` adta hozzá.

## REST API

Minden végponthoz kezelési hitelesítés szükséges (`requireManagementAuth`).

| Végpont                         | Módszer | Leírás                                       |
| ------------------------------- | ------- | -------------------------------------------- |
| `/api/webhooks`                 | GET     | Webhookok listázása (titkok maszkolva)       |
| `/api/webhooks`                 | POST    | Webhook létrehozása                          |
| `/api/webhooks/[id]`            | GET     | Webhook részletei (teljesen titkos)          |
| `/api/webhooks/[id]`            | PUT     | Frissítse a mezőket                          |
| `/api/webhooks/[id]`            | DELETE  | Távolítsa el                                 |
| `/api/webhooks/[id]/test`       | POST    | `test.ping` indítása (nincs újrapróbálkozás) |
| `/api/webhooks/[id]/deliveries` | GET     | Egy webhook legutóbbi kézbesítési kísérletei |
| `/api/webhooks/validate-url`    | POST    | Repülés előtti URL ellenőrzés (SSRF guard)   |

`GET /api/webhooks` elfedi a `<first 10 chars>...` titkát, hogy elkerülje a kiszivárogtatást a listaoldalakon. Használja a `[id]` GET amikor valóban szüksége van a titokra.

### Webhook létrehozása

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

Ha `secret` kimarad, a szerver létrehoz egy `whsec_<hex>` titkos adatot, és visszaadja azt a válaszban.

### Webhook tesztelése

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` adja vissza. Nem próbálkoznak újra. — hasznos annak gyors ellenőrzéséhez, hogy a vevő elfogadja-e a hasznos adatot és az aláírást.

## Irányítópult

A `/dashboard/webhooks` címen elérhető irányítópultoldal (lásd:
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) a következőket biztosítja:

- Webhookok létrehozása/szerkesztése eseményválasztóval
- Állapotjelző (aktív / inaktív / hibás) az `enabled`, a `failure_count` és a `last_status` alapján
- Tesztkézbesítés egyetlen kattintással
- Manuális engedélyezési/letiltási kapcsoló

## Hasznosadat-példák

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
    "message": "Teszt webhook-kézbesítés az OmniRoute-tól",
    "webhookId": "<uuid>"
  }
}
```

A nem `test.ping` események mezőstruktúráját az azokat kibocsátó hívási helyek határozzák meg; a `data` objektumot kezelje előre kompatibilisként (mezőket adjon hozzá, és ne hagyatkozzon azok hiányára).

## Bevált gyakorlatok

- **Minden kézbesítésnél ellenőrizze az aláírást** a nyers törzs alapján — ez megakadályozza, hogy bárki hamisított POST-kéréseket küldjön, aki kitalálja a webhook URL-jét.
- **Körülbelül 5 másodpercen belül válaszoljon 2xx állapotkóddal** — az elosztó időtúllépése 10 másodperc. A lassú fogadók felhasználják az újrapróbálkozásokat, és növelik a `failure_count` értékét.
- **Tegye a kezelőket idempotenssé** — az újrapróbálkozások és a legalább egyszeri kézbesítési szemantika miatt ismétlődések fordulhatnak elő.
- **Csak a szükséges eseményekre iratkozzon fel** — kizárólag a ténylegesen felhasznált eseményeket sorolja fel; a `"*"` növeli a költségeket az Ön által nem felügyelt fogadóknál.
- **Figyelje a `failure_count` értékét** — a végpontok 10 egymást követő hiba után automatikusan letiltásra kerülnek; a fogadó javítása után az `enabled: true` értékkel meghívott `PUT /api/webhooks/[id]` kéréssel állíthatja vissza.
- **Rendszeresen cserélje a titkos kulcsokat** — küldje el az új `secret` értéket `PUT` kéréssel, telepítse az új értéket a fogadón, majd erősítse meg a tesztvégponton keresztül.

## Lásd még

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — a teljes felügyeleti API-felület
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — a szolgáltatói hibák mögötti, a `request.failed` eseményen keresztül megjelenő áramkör-megszakító / várakozási idő szemantikája
- Forrás: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
