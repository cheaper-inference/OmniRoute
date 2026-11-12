# Webhooks (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Az igazság forrása:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Utolsó frissítés:** 2026-06-28 — v3.8.40

OmniRoute elindíthatja HTTP webhookat a platformeseményeken. Használja őket Slack, PagerDuty, Datadog , belső riasztási szolgáltatások vagy bármely HTTP vevő integrálására.

A diszpécser minden kézbesítést aláír HMAC-SHA256 val, újrapróbálja az átmeneti hibákat, nyomon követi a kézbesítés állapotát webhookonként, és automatikusan letiltja a folyamatosan meghibásodó végpontokat.

## Támogatott események

A `WebhookEvent` típus (`src/lib/webhooks/eventDescriptions.ts`, a `src/lib/webhookDispatcher.ts` fogyasztja ) jelenleg hét eseményt modellez:

| Esemény                   | Kigyullad, amikor                                                                                                                  |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | A proxy kérés sikeresen befejeződött                                                                                               |
| `request.failed`          | A proxy kérés az összes retries/fallback után sikertelen                                                                           |
| `quota.exceeded`          | A API kulcs átlép egy budget/quota küszöböt                                                                                        |
| `proxy.set_aside`         | A proxy pool-tag ismételt elutasítás után félretesz (csak átállás esetén)                                                          |
| `proxy.pool.exhausted`    | A proxykészlet hatókörének minden tagja félre van állítva                                                                          |
| `provider.reset_redeemed` | A banki visszaállítások automatikus alkalmazása visszaállítási jóváírást vagy a Claude heti munkamenet-visszaállítását váltotta be |
| `test.ping`               | A teszt végpont által használt szintetikus esemény                                                                                 |

Az előfizetések elfogadják a szó szerinti `"*"` minden esemény fogadásához. `events` ben lévő ismeretlen eseményneveket a rendszer figyelmen kívül hagyja a feladáskor.

> Megjegyzés: a diszpécser API vezetékes, de néhány nem `test.ping` esemény termelési hívóhelyei még mindig leszállnak. Ellenőrizze `grep dispatchEvent` hogy megtudja, mely útvonalak hívják meg jelenleg a diszpécsert a kiadásban.

## Építészet

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

A küldés tüzet és felejtést jelent a hívó számára: `Promise.allSettled` lenyeli a webhook-hibákat, így egy rossz vevő nem tudja blokkolni a többit.

## HMAC aláírás

Ha egy webhook rendelkezik `secret`, OmniRoute aláírja a JSON törzsét, és elküldi:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> A fejlécnevek a `X-Webhook-*` előtagot használják (nem `X-OmniRoute-*`). Az aláírás értéke `sha256=<hex>` — ellenőrizze a teljes előtagot.

Ha `createWebhook` titkosítás nélkül kerül meghívásra, a DB modul létrehoz egyet (`whsec_<48 hex>`), így alapértelmezés szerint minden webhook alá van írva.

### Ellenőrzés a vevőn

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Mindig ellenőrizze a **nyers** kéréstörzs, minden JSON elemzés előtt.

## Újrapróbálkozás és sikertelenség szabályzata

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 másodperces időtúllépés kísérletenként (`AbortController`).
- HTTP 2xx sikernek számít.
- HTTP — 3xx/4xx nem újrapróbálható végleges állapotnak számít `success = res.ok`
- HTTP 5xx és a hálózati hibák exponenciális visszalépéssel próbálkoznak újra: `2^attempt * 1000 ms` (1s, 2s, 4s).
- `maxRetries` után a szállítás sikertelenként kerül rögzítésre.
- Minden szállítás frissíti `last_triggered_at`, `last_status`, és visszaállítja vagy növeli `failure_count`.
- A diszpécser minden kifúvás után hívja `disableWebhooksWithHighFailures(10)`, így minden `failure_count >= 10` vel rendelkező webhook automatikusan letiltásra kerül.

## Adatbázis

`webhooks` táblázat (migráció `011_webhooks.sql`):

| Oszlop              | Írja be | Megjegyzések                                              |
| ------------------- | ------- | --------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                      |
| `url`               | TEXT    | Úticél URL                                                |
| `events`            | TEXT    | JSON tömb; alapértelmezett `["*"]`                        |
| `secret`            | TEXT    | HMAC titkos (automatikusan generálva, ha nincs megadva)   |
| `enabled`           | INT     | 0/1; alapértelmezés szerint 1                             |
| `description`       | TEXT    | Opcionális emberi címke                                   |
| `created_at`        | TEXT    | `datetime('now')`                                         |
| `last_triggered_at` | TEXT    | Minden kézbesítési kísérletnél frissítve                  |
| `last_status`       | INT     | Az utolsó kísérlet HTTP állapota (0 = hálózat)            |
| `failure_count`     | INT     | Siker esetén 0-ra, sikertelenség esetén + 1-re áll vissza |

A kézbesítési előzmények megmaradnak a dedikált `webhook_deliveries` táblában ( `069_webhook_deliveries.sql` migráció, minden próbálkozásnál `src/lib/db/webhookDeliveries.ts::insertDelivery` keresztül írva), a `webhooks` sorban lévő összesített számlálókon kívül. A típusú metaadatokat (Slack / Discord / Telegram / egyéni hasznos transzformátorok) `070_webhooks_kind_metadata.sql` adta hozzá.

## REST API

Minden végpont kezelési hitelesítést (`requireManagementAuth`) igényel.

| Végpont                         | Módszer | Leírás                                         |
| ------------------------------- | ------- | ---------------------------------------------- |
| `/api/webhooks`                 | GET     | Webhookok listázása (titkok maszkolva)         |
| `/api/webhooks`                 | POST    | Webhook létrehozása                            |
| `/api/webhooks/[id]`            | GET     | Webhook részletei (teljesen titkos)            |
| `/api/webhooks/[id]`            | PUT     | Frissítse a mezőket                            |
| `/api/webhooks/[id]`            | DELETE  | Távolítsa el                                   |
| `/api/webhooks/[id]/test`       | POST    | `test.ping` aktiválása (nincs újrapróbálkozás) |
| `/api/webhooks/[id]/deliveries` | GET     | Egy webhook legutóbbi kézbesítési kísérletei   |
| `/api/webhooks/validate-url`    | POST    | Repülés előtti URL érvényesítés (SSRF őr)      |

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

Ha `secret` ki van hagyva, a szerver létrehoz egy `whsec_<hex>` titkot, és visszaadja azt a válaszban.

### Webhook tesztelése

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` értéket adja vissza. Nem próbálkoznak újra. — hasznos annak gyors ellenőrzéséhez, hogy a vevő elfogadja-e a hasznos adatot és az aláírást.

## Műszerfal

A `/dashboard/webhooks` irányítópult-oldala (lásd: `src/app/(dashboard)/dashboard/webhooks/page.tsx`) a következőket tartalmazza:

- Create/edit webhookok eseményválasztóval
- Állapotjelző (aktív / inaktív / hibás) `enabled`, `failure_count` és `last_status` alapján
- Egy kattintásos tesztküldés
- Manuális enable/disable kapcsoló

## Példák hasznos terhelésre

### kérés.befejezve

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

### teszt.ping

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

A nem `test.ping` események mező alakjait az azokat kibocsátó hívási helyek határozzák meg; kezelje a `data` objektumot előre kompatibilisként (mezők hozzáadása, ne függjön a távolléttől).

## Legjobb gyakorlatok

- **Minden kézbesítéskor ellenőrizze az aláírást** a nyers test ellen — megakadályozza a hamisított POSTs bárkitől, aki kitalálja a webhook URL.
- **Válaszoljon 2xx ~ 5 másodpercen belül** — a diszpécser 10 másodpercnél túllépi az időt. A lassú vevők megeszik az újrapróbálkozásokat és felfújják `failure_count`.
- **Tedd a kezelőket idempotenssé** — újrapróbálkozása és a legalább egyszeri kézbesítési szemantika azt jelenti, hogy duplikációk lehetségesek.
- **Iratkozz fel minimálisan** — csak az Ön által ténylegesen fogyasztott eseményeket listázza ki; `"*"` megnöveli a költségeket az Ön által nem ellenőrzött vevőkészülékeken.
- **Nézze meg `failure_count`** — végpontok 10 egymást követő meghibásodás esetén automatikusan letiltásra kerülnek; visszaállítás `PUT /api/webhooks/[id]` hívásával a `enabled: true` a vevő javítása után.
- **Időnként forgatja a titkokat** — `PUT` egy új `secret`, telepítse az új értéket a vevőre, és erősítse meg a teszt végponton keresztül.

## Lásd még

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — teljes körű menedzsment API felület
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — megszakító/lehűlés szemantika a szolgáltatói hibák mögött `request.failed` keresztül
- Forrás: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
