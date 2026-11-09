# Webhooks (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Tiesos šaltinis:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Paskutinį kartą atnaujinta:** 2026-06-28 — v3.8.40

OmniRoute gali suaktyvinti HTTP internetinius kabliukus platformos įvykiuose. Naudokite juos norėdami integruoti su Slack, PagerDuty, Datadog, vidinėmis įspėjimo paslaugomis arba bet kokiu HTTP imtuvu.

Dispečeris kiekvieną pristatymą pasirašo su HMAC-SHA256, bando dar kartą pastebėti laikinus gedimus, seka pristatymo būseną pagal žiniatinklio kabliuką ir automatiškai išjungia galutinius taškus, kurie nuolat sugenda.

## Palaikomi įvykiai

`WebhookEvent` tipas (`src/lib/webhooks/eventDescriptions.ts`, vartojamas `src/lib/webhookDispatcher.ts`) šiuo metu modeliuoja septynis įvykius:

| Renginys                  | Uždega, kai                                                                                                             |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Tarpinio serverio užklausa sėkmingai užbaigta                                                                           |
| `request.failed`          | Tarpinio serverio užklausa nepavyksta po visų retries/fallback                                                          |
| `quota.exceeded`          | API raktas kerta budget/quota slenkstį                                                                                  |
| `proxy.set_aside`         | Įgaliotųjų serverių grupės narys pašalinamas po pakartotinio atsisakymo (tik pereinant)                                 |
| `proxy.pool.exhausted`    | Kiekvienas įgaliotojo serverio grupės narys yra atskirtas                                                               |
| `provider.reset_redeemed` | Automatiškai taikydami banko nustatymų atkūrimą išpirko iš naujo kreditą arba Claude savaitės seanso nustatymą iš naujo |
| `test.ping`               | Sintetinis įvykis, naudojamas bandymo galutiniame taške                                                                 |

Prenumeratos priima tiesioginę `"*"`, kad gautumėte kiekvieną įvykį. Nežinomi įvykių pavadinimai `events` yra ignoruojami išsiuntimo metu.

> Pastaba: dispečeris API yra prijungtas, bet kai kurių ne `test.ping` įvykių gamybos skambučių vietos vis dar nusileidžia. Patikrinkite `grep dispatchEvent` kad sužinotumėte, kurie keliai šiuo metu iškviečia dispečerį jūsų leidime.

## Architektūra

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

Išsiuntimas skambinančiajam yra ugnis ir pamiršta: `Promise.allSettled` praryja kiekvieno žiniatinklio kablio klaidas, todėl vienas blogas imtuvas negali blokuoti kitų.

## HMAC pasirašymas

Kai žiniatinklio kabliukas turi `secret`, OmniRoute pasirašo JSON turinį ir siunčia:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Antraštės pavadinimuose naudojamas `X-Webhook-*` priešdėlis (ne `X-OmniRoute-*`). Parašo reikšmė yra `sha256=<hex>` — patikrinkite visą priešdėlį.

Jei `createWebhook` iškviečiamas be paslapties, DB modulis sugeneruoja vieną (`whsec_<48 hex>`), todėl visi žiniatinklio kabliukai yra pasirašyti pagal numatytuosius nustatymus.

### Tikrinama imtuve

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Visada patikrinkite, ar **neapdorotas** užklausos turinys prieš bet kokį JSON analizavimą.

## Pakartotinio bandymo ir nesėkmės politika

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 sekundžių skirtasis laikas vienam bandymui (`AbortController`).
- HTTP 2xx laikomas sėkme.
- HTTP 3xx/4xx skaičiuojamas kaip nebandoma galutinė — būsena, įrašyta kaip pristatyta su `success = res.ok`.
- HTTP 5xx ir tinklo klaidos bandomos pakartotinai naudojant eksponentinį atsitraukimą: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Po `maxRetries` pristatymas įrašomas kaip nepavykęs.
- Kiekvienas pristatymas atnaujina `last_triggered_at`, `last_status` ir iš naujo nustato arba padidina `failure_count`.
- Dispečeris skambina `disableWebhooksWithHighFailures(10)` po kiekvieno ventiliatoriaus išjungimo, todėl bet koks „webhook“ su `failure_count >= 10` automatiškai išjungiamas.

## Duomenų bazė

Lentelė `webhooks` (perkėlimas `011_webhooks.sql`):

| Stulpelis           | Tipas   | Pastabos                                                    |
| ------------------- | ------- | ----------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                        |
| `url`               | TEXT    | Paskirtis URL                                               |
| `events`            | TEXT    | JSON masyvas; numatytasis `["*"]`                           |
| `secret`            | TEXT    | HMAC paslaptis (sugeneruojama automatiškai, jei nenurodyta) |
| `enabled`           | INT     | 0/1; numatytasis 1                                          |
| `description`       | TEXT    | Neprivaloma žmogaus etiketė                                 |
| `created_at`        | TEXT    | `datetime('now')`                                           |
| `last_triggered_at` | TEXT    | Atnaujinama kiekvieną kartą bandant pristatyti              |
| `last_status`       | INT     | Paskutinio bandymo HTTP būsena (0 = tinklo)                 |
| `failure_count`     | INT     | Sėkmės atveju atkuriama iki 0, nesėkmės atveju + 1          |

Pristatymo istorija išsaugoma specialioje `webhook_deliveries` lentelėje (perkėlimas `069_webhook_deliveries.sql`, rašomas per `src/lib/db/webhookDeliveries.ts::insertDelivery` kiekvieną kartą), be bendrų skaitiklių `webhooks` eilutėje. Natūralų metaduomenis (Slack / Discord / Telegram / pasirinktinius naudingos apkrovos transformatorius) pridėjo `070_webhooks_kind_metadata.sql`.

## REST API

Visiems galiniams taškams reikalingas valdymo autentifikavimas (`requireManagementAuth`).

| Galutinis taškas                | Metodas | Aprašymas                                              |
| ------------------------------- | ------- | ------------------------------------------------------ |
| `/api/webhooks`                 | GET     | Sąrašas žiniatinklio kabliukai (paslaptys užmaskuotos) |
| `/api/webhooks`                 | POST    | Sukurkite „Webhook“.                                   |
| `/api/webhooks/[id]`            | GET     | „Webhook“ detalė (visa paslaptis)                      |
| `/api/webhooks/[id]`            | PUT     | Atnaujinti laukus                                      |
| `/api/webhooks/[id]`            | DELETE  | Pašalinti                                              |
| `/api/webhooks/[id]/test`       | POST    | Suaktyvinkite `test.ping` (be bandymų)                 |
| `/api/webhooks/[id]/deliveries` | GET     | Naujausi vieno „Webhook“ pristatymo bandymai           |
| `/api/webhooks/validate-url`    | POST    | URL patvirtinimas prieš skrydį (SSRF apsauga)          |

`GET /api/webhooks` užmaskuoja `<first 10 chars>...` paslaptį, kad išvengtų nutekėjimo sąrašo puslapiuose. Naudokite `[id]` GET kai jums iš tikrųjų reikia paslapties.

### Sukurkite „Webhook“.

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

Jei `secret` praleista, serveris sukuria `whsec_<hex>` paslaptį ir grąžina ją atsakyme.

### Išbandykite „Webhook“.

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Grąžina `{ delivered, status, error }`. Nebandoma kartoti. — naudinga norint greitai patikrinti, ar imtuvas priima naudingą apkrovą ir parašą.

## Prietaisų skydelis

`/dashboard/webhooks` prietaisų skydelio puslapyje (žr. `src/app/(dashboard)/dashboard/webhooks/page.tsx`) pateikiama:

- Create/edit žiniatinklio kabliukai su įvykių rinkikliu
- Būsenos indikatorius (aktyvus / neaktyvus / klaida), pagrįstas `enabled`, `failure_count` ir `last_status`
- Bandomasis pristatymas vienu paspaudimu
- Rankinis enable/disable perjungimas

## Naudingos apkrovos pavyzdžiai

### prašymas.užbaigtas

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

Laukų formas ne `test.ping` įvykiams apibrėžia juos skleidžiančios skambučių vietos; traktuokite `data` objektą kaip suderinamą su pirmyn (pridėkite laukų, nepriklausykite nuo nebuvimo).

## Geriausia praktika

- **Patikrinkite parašą ant kiekvieno pristatymo** nuo neapdoroto korpuso — apsaugo nuo apgaulingo POSTs nuo bet kurio, kas atspėja jūsų žiniatinklio kabliuką URL.
- **Atsakykite 2xx per ~ per 5 sekundes** — dispečeriui skirtas laikas baigiasi po 10 s. Lėti imtuvai valgys pakartotinius bandymus ir padidins `failure_count`.
- **Padarykite tvarkytojus idempotentais** — pakartotiniai bandymai ir bent vieną kartą pristatymo semantika reiškia, kad galimi dublikatai.
- **Prenumeruokite minimaliai** — išvardija tik tuos įvykius, kuriuos iš tikrųjų vartojate; `"*"` padidins imtuvų, kurių nevaldote, kainą.
- **Žiūrėkite `failure_count`** — galiniai taškai automatiškai išjungiami 10 gedimų iš eilės; iš naujo nustatykite paskambinę `PUT /api/webhooks/[id]` su `enabled: true`, sutvarkę imtuvą.
- **Periodiškai pasukite paslaptis** — `PUT` naują `secret`, įdiekite naują reikšmę imtuve ir patvirtinkite naudodami bandomąjį galinį tašką.

## Taip pat žr

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — viso valdymo API paviršius
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — grandinės pertraukiklio / vėsinimo semantika už tiekėjo gedimus, atskleistus per `request.failed`
- Šaltinis: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
