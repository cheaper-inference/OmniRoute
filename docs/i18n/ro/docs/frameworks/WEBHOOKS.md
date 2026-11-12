# Webhooks (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Sursa adevărului:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Ultima actualizare:** 2026-06-28 — v3.8.40

OmniRoute poate declanșa webhook-uri HTTP la evenimentele platformei. Folosiți-le pentru a vă integra cu Slack, PagerDuty, Datadog, servicii interne de alertă sau orice receptor HTTP.

Dispecerul semnează fiecare livrare cu HMAC-SHA256, reîncearcă eșecurile tranzitorii, urmărește starea livrării per webhook și dezactivează automat punctele finale care continuă să eșueze.

## Evenimente acceptate

Tipul `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, consumat de `src/lib/webhookDispatcher.ts`) modelează în prezent șapte evenimente:

| Eveniment                 | Incendii când                                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `request.completed`       | O solicitare proxy s-a finalizat cu succes                                                                               |
| `request.failed`          | O solicitare proxy eșuează după toate retries/fallback                                                                   |
| `quota.exceeded`          | O cheie API depășește un prag budget/quota                                                                               |
| `proxy.set_aside`         | Un membru al grupului de proxy este pus deoparte după refuzuri repetate (doar tranziție)                                 |
| `proxy.pool.exhausted`    | Fiecare membru al domeniului unui pool de proxy este pus deoparte                                                        |
| `provider.reset_redeemed` | Aplicarea automată a resetărilor bancare a valorificat un credit de resetare sau resetarea săptămânală a sesiunii Claude |
| `test.ping`               | Eveniment sintetic utilizat de punctul final al testului                                                                 |

Abonamentele acceptă `"*"` literal pentru a primi fiecare eveniment. Numele evenimentelor necunoscute din `events` sunt ignorate la momentul expedierii.

> Notă: dispecerul API este conectat, dar site-urile de apel de producție pentru unele dintre evenimentele non-`test.ping` sunt încă aterizate. Verificați `grep dispatchEvent` pentru a vedea ce căi invocă în prezent dispecerul în versiunea dvs.

## Arhitectură

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

Expedierea este trage și uită pentru apelant: `Promise.allSettled` înghite erorile per-webhook, astfel încât un receptor rău nu poate bloca pe ceilalți.

## Semnarea HMAC

Când un webhook are un `secret`, OmniRoute semnează corpul JSON și trimite:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Numele antetului folosesc prefixul `X-Webhook-*` (nu `X-OmniRoute-*`). Valoarea semnăturii este `sha256=<hex>` — verifică prefixul complet.

Dacă `createWebhook` este apelat fără un secret, modulul DB generează unul (`whsec_<48 hex>`), astfel încât toate webhook-urile sunt semnate implicit.

### Se verifică pe receptor

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Verificați întotdeauna împotriva **brut** Corpul cererii, înainte de orice analiză JSON.

## Politica de reîncercare și eșec

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Timeout de 10 secunde per încercare (`AbortController`).
- HTTP 2xx contează drept succes.
- HTTP 3xx/4xx contează ca stare finală care nu poate fi reîncercată — înregistrată ca fiind livrată cu `success = res.ok`.
- HTTP 5xx și erorile de rețea sunt reîncercate cu backoff exponențial: `2^attempt * 1000 ms` (1s, 2s, 4s).
- După `maxRetries`, livrarea este înregistrată ca eșuată.
- Fiecare livrare actualizează `last_triggered_at`, `last_status` și fie resetează, fie crește `failure_count`.
- Dispeceratul apelează `disableWebhooksWithHighFailures(10)` după fiecare fan-out, astfel încât orice webhook cu `failure_count >= 10` este dezactivat automat.

## Baza de date

Tabel `webhooks` (migrare `011_webhooks.sql`):

| Coloană             | Tip     | Note                                           |
| ------------------- | ------- | ---------------------------------------------- |
| `id`                | TEXT PK | UUID                                           |
| `url`               | TEXT    | Destinație URL                                 |
| `events`            | TEXT    | matrice JSON ; `["*"]` implicit                |
| `secret`            | TEXT    | Secret HMAC (generat automat dacă nu este dat) |
| `enabled`           | INT     | 0/1; implicit la 1                             |
| `description`       | TEXT    | Etichetă umană opțională                       |
| `created_at`        | TEXT    | `datetime('now')`                              |
| `last_triggered_at` | TEXT    | Actualizat la fiecare încercare de livrare     |
| `last_status`       | INT     | Starea HTTP a ultimei încercări (0 rețea = )   |
| `failure_count`     | INT     | Resetează la 0 la succes, + 1 la eșec          |

Istoricul livrărilor este persistat în tabelul `webhook_deliveries` dedicat (migrarea `069_webhook_deliveries.sql`, scrisă prin `src/lib/db/webhookDeliveries.ts::insertDelivery` la fiecare încercare), în plus față de contoarele agregate de pe rândul `webhooks`. Metadate amabile (Slack / Discord / Telegram / transformatoare personalizate de sarcină utilă) au fost adăugate de `070_webhooks_kind_metadata.sql`.

## REST API

Toate punctele finale necesită autentificare de gestionare (`requireManagementAuth`).

| Punct final                     | Metodă | Descriere                                      |
| ------------------------------- | ------ | ---------------------------------------------- |
| `/api/webhooks`                 | GET    | Listează webhook-uri (secrete mascate)         |
| `/api/webhooks`                 | POST   | Creați webhook                                 |
| `/api/webhooks/[id]`            | GET    | Detaliu webhook (secret complet)               |
| `/api/webhooks/[id]`            | PUT    | Actualizați câmpurile                          |
| `/api/webhooks/[id]`            | DELETE | Elimina                                        |
| `/api/webhooks/[id]/test`       | POST   | Declanșează un `test.ping` (fără reîncercări)  |
| `/api/webhooks/[id]/deliveries` | GET    | Încercări recente de livrare pentru un webhook |
| `/api/webhooks/validate-url`    | POST   | Validare URL înainte de zbor (garda SSRF )     |

`GET /api/webhooks` maschează secretul pentru `<first 10 chars>...` pentru a evita scurgerile pe paginile de listare. Utilizați `[id]` GET atunci când aveți nevoie de secret.

### Creați webhook

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

Dacă `secret` este omis, serverul generează un secret `whsec_<hex>` și îl returnează în răspuns.

### Testați webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Returnează `{ delivered, status, error }`. Nu se încearcă reîncercări — utile pentru validarea rapidă a faptului că receptorul acceptă sarcina utilă și semnătura.

## Bord

Pagina tabloului de bord de la `/dashboard/webhooks` (vezi `src/app/(dashboard)/dashboard/webhooks/page.tsx`) oferă:

- Webhook-uri Create/edit cu un selector de evenimente
- Indicator de stare (activ / inactiv / eroat) bazat pe `enabled`, `failure_count` și `last_status`
- Livrare test cu un singur clic
- Comutare manuală enable/disable

## Exemple de încărcătură utilă

### cerere.finalizat

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

Formele câmpurilor pentru evenimente non-`test.ping` sunt definite de site-urile de apel care le emit; tratați obiectul `data` ca fiind compatibil înainte (adăugați câmpuri, nu depind de absență).

## Cele mai bune practici

- **Verificați semnătura la fiecare livrare** împotriva corpului brut — previne falsificarea POSTs de la oricine ghiceste webhook-ul dvs. URL.
- **Răspunde 2xx în ~ 5 secunde** — dispeceratul expiră la 10 s. Receptorii lenți vor mânca reîncercări și vor umfla `failure_count`.
- **Faceți manipulatorii idempotenți** Reîncercările — și semantica de livrare cel puțin o dată înseamnă că sunt posibile duplicate.
- **Abonați-vă minim** — listează numai evenimentele pe care le consumați efectiv; `"*"` va adăuga costuri pentru receptoarele pe care nu le controlați.
- **Urmărește `failure_count`** Punctele finale — sunt dezactivate automat la 10 erori consecutive; resetați apelând `PUT /api/webhooks/[id]` cu `enabled: true` după repararea receptorului.
- **Rotiți secretele periodic** — `PUT` un nou `secret`, implementați noua valoare către receptor și confirmați prin punctul final de testare.

## Vezi De asemenea

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — management complet API suprafata
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — întrerupător de circuit / semantică de răcire din spatele defecțiunilor furnizorului a apărut prin `request.failed`
- Sursa: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
