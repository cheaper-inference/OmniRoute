# Webhooks (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Sors tal-verità:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Aġġornata l-aħħar:** 2026-06-28 — v3.8.40

OmniRoute jista' jispara webhooks HTTP fuq avvenimenti tal-pjattaforma. Użahom biex tintegra ma' Slack, PagerDuty, Datadog, servizzi interni ta' twissija, jew kwalunkwe riċevitur HTTP.

Id-dispaċċ jiffirma kull konsenja HMAC-SHA256, jerġa' jipprova fuq fallimenti temporanji, isegwi s-saħħa tal-kunsinna għal kull webhook, u jiddiżattiva awtomatikament l-endpoints li jibqgħu jonqsu.

## Avvenimenti Appoġġjati

It-tip `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, ikkunsmat minn `src/lib/webhookDispatcher.ts`) bħalissa jimmudella seba' avvenimenti:

| Avveniment                | Nirien meta                                                                                                             |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Talba b'prokura titlesta b'suċċess                                                                                      |
| `request.failed`          | Talba bi prokura tonqos wara retries/fallback kollha                                                                    |
| `quota.exceeded`          | Ċavetta API taqsam limitu budget/quota                                                                                  |
| `proxy.set_aside`         | Membru tal-grupp ta' prokura jitwarrab wara rifjuti ripetuti (tranżizzjoni biss)                                        |
| `proxy.pool.exhausted`    | Kull membru ta' ambitu ta' pool ta' prokura jitwarrab                                                                   |
| `provider.reset_redeemed` | Ir-resets bankarji tal-applikazzjoni awtomatika fdew kreditu ta' reset jew ir-reset tas-sessjoni ta' kull ġimgħa Claude |
| `test.ping`               | Avveniment sintetiku użat mill-endpoint tat-test                                                                        |

L-abbonamenti jaċċettaw l- `"*"` letterali biex jirċievu kull avveniment. Ismijiet ta' avvenimenti mhux magħrufa `events` jiġu injorati fil-ħin tad-dispaċċ.

> Nota: id-dispatcher API huwa bil-fili, iżda s-siti ta 'sejħiet ta' produzzjoni għal xi wħud mill-avvenimenti mhux `test.ping` għadhom qed jinżlu. Iċċekkja `grep dispatchEvent` biex tara liema mogħdijiet bħalissa jinvokaw lid-dispaċċ fir-rilaxx tiegħek.

## Arkitettura

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

Id-dispaċċ huwa nar u tinsa għal min iċempel: `Promise.allSettled` jibla 'żbalji għal kull webhook sabiex riċevitur ħażin wieħed ma jistax jimblokka lill-oħrajn.

## Iffirmar HMAC

Meta webhook ikollu `secret`, OmniRoute jiffirma l-korp JSON u jibgħat:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> L-ismijiet tal-header jużaw il-prefiss `X-Webhook-*` (mhux `X-OmniRoute-*`). Il-valur tal-firma huwa `sha256=<hex>` — jivverifika l-prefiss sħiħ.

Jekk `createWebhook` jissejjaħ mingħajr sigriet, il-modulu DB jiġġenera wieħed (`whsec_<48 hex>`) sabiex il-webhooks kollha jiġu ffirmati b'mod awtomatiku.

### Verifika fuq ir-riċevitur

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Dejjem ivverifika kontra l-**nej** korp talba, qabel kwalunkwe parsing JSON.

## Ipprova mill-ġdid u Politika ta' Falliment

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 sekondi timeout għal kull tentattiv (`AbortController`).
- HTTP 2xx jgħodd bħala suċċess.
- HTTP 3xx/4xx jgħodd bħala status finali — li ma jistax jerġa' jiġi pprovat irreġistrat bħala kkonsenjat ma' `success = res.ok`.
- HTTP 5xx u żbalji tan-netwerk jerġgħu jiġu ppruvati b'backoff esponenzjali: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Wara `maxRetries`, il-kunsinna tiġi rreġistrata bħala falluta.
- Kull konsenja taġġorna `last_triggered_at`, `last_status`, u jew reset jew inkrementi `failure_count`.
- Id-dispatcher isejjaħ lil `disableWebhooksWithHighFailures(10)` wara kull fan-out, għalhekk kwalunkwe webhook `failure_count >= 10` huwa awtomatikament diżattivat.

## Database

Tabella `webhooks` (migrazzjoni `011_webhooks.sql`):

| Kolonna             | Tip     | Noti                                                    |
| ------------------- | ------- | ------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                    |
| `url`               | TEXT    | Destinazzjoni URL                                       |
| `events`            | TEXT    | Array JSON ; default `["*"]`                            |
| `secret`            | TEXT    | Sigriet HMAC (ġenerat awtomatikament jekk ma jingħatax) |
| `enabled`           | INT     | 0/1; default għal 1                                     |
| `description`       | TEXT    | Tikketta umana mhux obbligatorja                        |
| `created_at`        | TEXT    | `datetime('now')`                                       |
| `last_triggered_at` | TEXT    | Aġġornat fuq kull tentattiv ta' kunsinna                |
| `last_status`       | INT     | Status HTTP tal-aħħar tentattiv (0 netwerk = )          |
| `failure_count`     | INT     | Resets għal 0 fuq suċċess, + 1 fuq falliment            |

L-istorja tal-kunsinna hija ppersistita fit-tabella `webhook_deliveries` ddedikata (migrazzjoni `069_webhook_deliveries.sql`, miktuba permezz ta ' `src/lib/db/webhookDeliveries.ts::insertDelivery` fuq kull tentattiv), minbarra l-counters aggregati fuq ir-ringiela `webhooks`. Metadata tip (Slack / Discord / Telegram / transformers tat-tagħbija personalizzata) ġiet miżjuda minn `070_webhooks_kind_metadata.sql`.

## REST API

L-endpoints kollha jeħtieġu awtorizzazzjoni tal-ġestjoni (`requireManagementAuth`).

| Endpoint                        | Metodu | Deskrizzjoni                                        |
| ------------------------------- | ------ | --------------------------------------------------- |
| `/api/webhooks`                 | GET    | Lista webhooks (sigrieti mgħottija)                 |
| `/api/webhooks`                 | POST   | Oħloq webhook                                       |
| `/api/webhooks/[id]`            | GET    | Dettall tal-Webhook (sigriet sħiħ)                  |
| `/api/webhooks/[id]`            | PUT    | Aġġorna l-oqsma                                     |
| `/api/webhooks/[id]`            | DELETE | Neħħi                                               |
| `/api/webhooks/[id]/test`       | POST   | Fire a `test.ping` (l-ebda prova mill-ġdid)         |
| `/api/webhooks/[id]/deliveries` | GET    | Tentattivi riċenti ta' kunsinna għal webhook wieħed |
| `/api/webhooks/validate-url`    | POST   | Validazzjoni URL qabel it-titjira (gwardja SSRF )   |

`GET /api/webhooks` jaħbi s-sigriet għal `<first 10 chars>...` biex tevita li tnixxi fuq il-paġni tal-elenkar. Uża l- `[id]` GET meta fil-fatt għandek bżonn is-sigriet.

### Oħloq webhook

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

Jekk `secret` titħalla barra, is-server jiġġenera sigriet `whsec_<hex>` u jirritornah fir-rispons.

### Test webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Ritorn `{ delivered, status, error }`. Ebda tentattivi mill-ġdid huma attentati — utli għall-validazzjoni malajr li r-riċevitur jaċċetta t-tagħbija u l-firma.

## Dashboard

Il-paġna tad-dashboard `/dashboard/webhooks` (ara `src/app/(dashboard)/dashboard/webhooks/page.tsx`) tipprovdi:

- Webhooks Create/edit b'picker tal-avveniment
- Indikatur tal-istatus (attiv / inattiv / bi żball) ibbażat fuq `enabled`, `failure_count`, u `last_status`
- Konsenja tat-test b'klikk waħda
- Toggle manwali enable/disable

## Eżempji ta' Tagħbija

### talba.lest

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

Il-forom tal-kamp għal avvenimenti mhux `test.ping` huma definiti mis-siti tas-sejħiet li jarmuhom; ittratta l-oġġett `data` bħala kompatibbli bil-quddiem (żid oqsma, ma jiddependux fuq l-assenza).

## L-Aħjar Prattiki

- **Ivverifika l-firma fuq kull kunsinna** kontra l-korp mhux maħdum — jipprevjeni POSTs spoofed minn kull min guess webhook tiegħek URL.
- **Irrispondi 2xx fi żmien ~ 5 sekondi** — id-dispatcher jispiċċa f'10 s. Riċevituri bil-mod se jieklu mill-ġdid u jintefħu `failure_count`.
- **Agħmel il-handlers idempotenti** Jippruvaw mill-ġdid — u semantika tal-kunsinna tal-inqas darba jfissru duplikati huma possibbli.
- **Abbona minimament** — telenka biss avvenimenti li attwalment tikkonsma; `"*"` se jżid l-ispiża fuq riċevituri li ma tikkontrollax.
- **Watch `failure_count`** L-endpoints — huma awto-diżattivati f'10 fallimenti konsekuttivi; reset billi ċċempel lil `PUT /api/webhooks/[id]` ma ' `enabled: true` wara li tiffissa r-riċevitur.
- **Dawwar is-sigrieti perjodikament** — `PUT` a `secret` ġdid, skjerament il-valur il-ġdid lir-riċevitur, u kkonferma permezz tal-endpoint tat-test.

## Ara Wkoll

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ġestjoni sħiħa API wiċċ
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — circuit breaker / semantika ta' cooldown wara fallimenti tal-fornitur ħarġu permezz ta `request.failed`
- Sors: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
