# Webhooks (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Foinse na fírinne:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Nuashonraithe is déanaí:** 2026-06-28 — v3.8.40

Is féidir le OmniRoute cipíní gréasáin HTTP a dhó ar imeachtaí ardáin. Úsáid iad chun comhtháthú le Slack, PagerDuty, Datadog , seirbhísí foláirimh inmheánacha, nó aon ghlacadóir HTTP.

Síníonn an seoltóir gach seachadadh le HMAC-SHA256, déanann sé iarracht ar theipeanna díomuana, rianaíonn sé sláinte an tseachadta in aghaidh na cuaiche gréasáin, agus díchumasaíonn sé críochphointí a leanann teip.

## Imeachtaí Tacaithe

Múnlaíonn an cineál `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, arna thomhailt ag `src/lib/webhookDispatcher.ts`) seacht n-imeacht faoi láthair:

| Imeacht                   | Tinte nuair                                                                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Críochnaíonn iarratas seachfhreastalaí go rathúil                                                                                           |
| `request.failed`          | Teipeann ar iarratas seachfhreastalaí tar éis gach retries/fallback                                                                         |
| `quota.exceeded`          | Trasnaíonn eochair API tairseach budget/quota                                                                                               |
| `proxy.set_aside`         | Cuirtear ball comhthiomsaithe seachfhreastalaí ar leataobh tar éis diúltú arís agus arís eile (aistriú amháin)                              |
| `proxy.pool.exhausted`    | Cuirtear raon feidhme comhthiomsaithe seachfhreastalaí ar leataobh do gach ball                                                             |
| `provider.reset_redeemed` | D’fhuascail athshocraithe bainc a cuireadh i bhfeidhm go huathoibríoch creidmheas athshocraithe nó athshocrú seisiúin sheachtainiúil Claude |
| `test.ping`               | Ócáid shintéiseach a úsáideann críochphointe na tástála                                                                                     |

Glacann síntiúis leis an `"*"` litriúil chun gach imeacht a fháil. Ní thugtar aird ar ainmneacha teagmhais anaithnid in `events` ag am seolta.

> Tabhair faoi deara: tá an seoltóir API sreangaithe, ach tá suíomhanna glaonna táirgeachta do chuid de na himeachtaí neamh-`test.ping` fós ag teacht i dtír. Seiceáil `grep dispatchEvent` chun a fháil amach cé na cosáin a n-úsáideann an seoltóir i do scaoileadh faoi láthair.

## Ailtireacht

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

Ní féidir leis an nglaoiteoir dearmad a dhéanamh ar an tseoladh: fáinleogaíonn `Promise.allSettled` earráidí in aghaidh an chuardaigh gréasáin mar sin ní féidir le droch-ghlacadóir amháin bac a chur ar na cinn eile.

## Síniú HMAC

Nuair a bhíonn `secret` ag crúca gréasáin, síníonn OmniRoute an corp JSON agus seolann sé:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Úsáideann ainmneacha ceanntásca an réimír `X-Webhook-*` (ní `X-OmniRoute-*`). Is é an luach sínithe `sha256=<hex>` — fíoraigh an réimír iomlán.

Má thugtar `createWebhook` gan rún, gineann an modúl DB ceann (`whsec_<48 hex>`) agus mar sin sínítear gach crúca gréasáin de réir réamhshocraithe.

### Ag fíorú ar an nglacadóir

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Fíoraigh i gcónaí i gcoinne an **amh** comhlacht iarratais, roimh aon pharsáil JSON.

## Beartas Athiarrachta & Teip

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Teorainn ama 10 soicind in aghaidh an iarracht (`AbortController`).
- Áirítear HTTP 2xx mar rath.
- HTTP Áirítear 3xx/4xx mar stádas deiridh neamh-in-triail — taifeadta mar a sheachadtar le `success = res.ok`.
- Aisghabhtar earráidí HTTP 5xx agus líonra le haisíoc easpónantúil: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Tar éis `maxRetries`, déantar an seachadadh a thaifeadadh mar theip.
- Nuashonraíonn gach seachadadh `last_triggered_at`, `last_status`, agus athshocraíonn nó méadaíonn sé `failure_count`.
- Glaonn an seoltóir ar `disableWebhooksWithHighFailures(10)` tar éis gach fean-amach, agus mar sin díchumasaítear aon chuaille gréasáin le `failure_count >= 10` go huathoibríoch.

## Bunachar Sonraí

Tábla `webhooks` (imirce `011_webhooks.sql`):

| Colún               | Cineál  | Nótaí                                           |
| ------------------- | ------- | ----------------------------------------------- |
| `id`                | TEXT PK | UUID                                            |
| `url`               | TEXT    | Ceann Scríbe URL                                |
| `events`            | TEXT    | eagar JSON ; `["*"]` réamhshocraithe            |
| `secret`            | TEXT    | Rún HMAC (uathghinte mura dtugtar é)            |
| `enabled`           | INT     | 0/1; réamhshocraithe go 1                       |
| `description`       | TEXT    | Lipéad daonna roghnach                          |
| `created_at`        | TEXT    | `datetime('now')`                               |
| `last_triggered_at` | TEXT    | Nuashonraithe ar gach iarracht seachadta        |
| `last_status`       | INT     | Stádas HTTP na hiarrachta deiridh (0 líonra = ) |
| `failure_count`     | INT     | Athshocraigh go 0 ar rath, + 1 ar theip         |

Tá stair seachadta fós sa tábla tiomnaithe `webhook_deliveries` (imirce `069_webhook_deliveries.sql`, scríofa trí `src/lib/db/webhookDeliveries.ts::insertDelivery` ar gach iarracht), chomh maith leis na cuntair chomhiomlán ar an tsraith `webhooks`. Chuir `070_webhooks_kind_metadata.sql` meiteashonraí cineálta (Slack / Discord / Telegram / claochladáin pálasta saincheaptha) leis.

## REST API

Tá údarás bainistíochta (`requireManagementAuth`) ag teastáil ó gach críochphointe.

| Críochphointe                   | Modh   | Cur síos                                                           |
| ------------------------------- | ------ | ------------------------------------------------------------------ |
| `/api/webhooks`                 | GET    | Liostaigh cuaillí gréasáin (rúin faoi cheilt)                      |
| `/api/webhooks`                 | POST   | Cruthaigh crúca gréasáin                                           |
| `/api/webhooks/[id]`            | GET    | Mionsonraí ar an gcuar gréasáin (rún iomlán)                       |
| `/api/webhooks/[id]`            | PUT    | Réimsí cothrom le dáta                                             |
| `/api/webhooks/[id]`            | DELETE | Bain                                                               |
| `/api/webhooks/[id]/test`       | POST   | Dóiteáin `test.ping` (gan atriall)                                 |
| `/api/webhooks/[id]/deliveries` | GET    | Iarrachtaí seachadta le déanaí le haghaidh cuaille gréasáin amháin |
| `/api/webhooks/validate-url`    | POST   | Bailíochtú URL réamh-eitilte (garda SSRF )                         |

Cuimsíonn `GET /api/webhooks` an rún do `<first 10 chars>...` chun sceitheadh ar leathanaigh liostála a sheachaint. Bain úsáid as an `[id]` GET nuair is gá duit an rún.

### Cruthaigh crúca gréasáin

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

Má fhágtar `secret` ar lár, gineann an freastalaí rún `whsec_<hex>` agus seolann sé ar ais sa fhreagra é.

### Cabhrán gréasáin a thástáil

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Filleann `{ delivered, status, error }`. Ní dhéantar aon iarracht — atá úsáideach chun a dheimhniú go tapa go nglacann an glacadóir leis an bpálasta agus leis an síniú.

## Deais

Soláthraíonn leathanach an deais ag `/dashboard/webhooks` (féach `src/app/(dashboard)/dashboard/webhooks/page.tsx`):

- Buaicíní gréasáin Create/edit le roghnóir imeachtaí
- Táscaire stádais (gníomhach / neamhghníomhach / earráideach) bunaithe ar `enabled`, `failure_count`, agus `last_status`
- Seachadadh tástála aon-cliceáil
- Lámhleabhar enable/disable scoránaigh

## Samplaí de phárolla

### iarratas.críochnaithe

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

### tástáil.ping

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

Sainítear cruthanna allamuigh le haghaidh imeachtaí neamh-`test.ping` ag na suíomhanna glaonna a astaíonn iad; caitheamh leis an oibiacht `data` mar rud atá comhoiriúnach chun tosaigh (cuir réimsí leis, ná bí ag brath ar neamhláithreacht).

## Cleachtais is Fearr

- **Fíoraigh an síniú ar gach seachadadh** in aghaidh an choirp amh — cosc POSTs spoofed ó dhuine ar bith a buille faoi thuairim do whook URL.
- **Freagair 2xx laistigh de ~ 5 soicind** — amanna an seoltaí amach ag 10 s. Déanfaidh glacadóirí mall atriail a ithe agus inflate `failure_count`.
- **Déan láimhseálaithe díomhaoin** Ciallaíonn atrialltaí — agus ar a laghad uair amháin semantics seachadta gur féidir dúbailt.
- **Liostáil íosta** Ní liostaíonn — ach na himeachtaí a itheann tú; Cuirfidh `"*"` costas ar ghlacadóirí nach bhfuil á rialú agat.
- **Féach ar `failure_count`** Tá críochphointí — faoi mhíchumas uathoibríoch ag 10 teip as a chéile; athshocrú trí ghlaoch a chur ar `PUT /api/webhooks/[id]` le `enabled: true` tar éis an glacadóir a shocrú.
- **Rothlaigh rúin go tréimhsiúil** — `PUT` `secret` nua , imscaradh an luach nua chuig an nglacadóir, agus deimhnigh tríd an gcríochphointe tástála.

## Féach Chomh maith leis sin

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — bainistíochta iomlán dromchla API
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) Scoradán ciorcaid — / séimeantaice fuarú taobh thiar de theipeanna soláthraithe a ndearnadh dromchla orthu trí `request.failed`
- Foinse: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
