# Webhooks (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Patiesības avots:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Pēdējo reizi atjaunināts:** 2026-06-28 — v3.8.40

OmniRoute var aktivizēt HTTP tīmekļa aizķeres platformas notikumos. Izmantojiet tos, lai integrētu ar Slack, PagerDuty, Datadog, iekšējiem brīdināšanas pakalpojumiem vai jebkuru HTTP uztvērēju.

Dispečers katru piegādi paraksta ar HMAC-SHA256, atkārtoti mēģina konstatēt pārejošas kļūmes, izseko piegādes stāvokli katram tīmekļa aizķerei un automātiski atspējo galapunktus, kas pastāvīgi neizdodas.

## Atbalstītie pasākumi

`WebhookEvent` tips (`src/lib/webhooks/eventDescriptions.ts`, patērē `src/lib/webhookDispatcher.ts`) pašlaik modelē septiņus notikumus:

| Pasākums                  | Aizdedzina, kad                                                                                                        |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Starpniekservera pieprasījums ir veiksmīgi pabeigts                                                                    |
| `request.failed`          | Starpniekservera pieprasījums neizdodas pēc retries/fallback                                                           |
| `quota.exceeded`          | API atslēga šķērso budget/quota slieksni                                                                               |
| `proxy.set_aside`         | Pēc atkārtotiem atteikumiem starpniekserveru pūla dalībnieks tiek atcelts (tikai pārejai)                              |
| `proxy.pool.exhausted`    | Katrs starpniekservera pūla tvēruma dalībnieks ir rezervēts                                                            |
| `provider.reset_redeemed` | Automātiski lietot bankas atiestatīšanu, kas izpirka atiestatīšanas kredītu vai Claude iknedēļas sesijas atiestatīšanu |
| `test.ping`               | Sintētisks notikums, ko izmanto testa galapunkts                                                                       |

Abonementi pieņem burtisku `"*"`, lai saņemtu katru notikumu. Nezināmi notikumu nosaukumi `events` tiek ignorēti nosūtīšanas laikā.

> Piezīme. Dispečeram API ir pievienots vads, bet dažu notikumu, kas nav `test.ping`, ražošanas zvanu vietas joprojām tiek nolaistas. Pārbaudiet `grep dispatchEvent`, lai redzētu, kuri ceļi pašlaik izsauc dispečeru jūsu laidienā.

## Arhitektūra

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

Nosūtīšana zvanītājam ir uguns un aizmirst: `Promise.allSettled` norij katras tīmekļa aizķeres kļūdas, tāpēc viens slikts uztvērējs nevar bloķēt citus.

## HMAC parakstīšana

Ja tīmekļa aizķerei ir `secret`, OmniRoute paraksta JSON pamattekstu un nosūta:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Galvenes nosaukumos tiek izmantots `X-Webhook-*` prefikss (nevis `X-OmniRoute-*`). Paraksta vērtība ir `sha256=<hex>` — verificējiet pilnu prefiksu.

Ja `createWebhook` tiek izsaukts bez noslēpuma, DB modulis ģenerē vienu (`whsec_<48 hex>`), tāpēc visi tīmekļa aizķeri tiek parakstīti pēc noklusējuma.

### Pārbaude uztvērējā

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Vienmēr pārbaudiet pret **neapstrādāts** pieprasījuma pamatteksts pirms JSON parsēšanas.

## Atkārtota mēģinājuma un neveiksmes politika

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 sekunžu taimauts vienam mēģinājumam (`AbortController`).
- HTTP 2xx tiek uzskatīts par panākumu.
- HTTP 3xx/4xx tiek uzskatīts par neizmēģināmu galīgo statusu — kas reģistrēts kā piegādāts kopā ar `success = res.ok`.
- HTTP 5xx un tīkla kļūdas tiek mēģināts atkārtoti ar eksponenciālu atkāpšanos: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Pēc `maxRetries` piegāde tiek reģistrēta kā neizdevusies.
- Katra piegāde atjaunina `last_triggered_at`, `last_status` un atiestata vai palielina `failure_count`.
- Dispečers izsauc `disableWebhooksWithHighFailures(10)` pēc katras ventilatora izslēgšanas, tāpēc jebkurš tīmekļa aizķere ar `failure_count >= 10` tiek automātiski atspējots.

## Datu bāze

`webhooks` tabula (migrācija `011_webhooks.sql`):

| Kolonna             | Tips    | Piezīmes                                                         |
| ------------------- | ------- | ---------------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                             |
| `url`               | TEXT    | Galamērķis URL                                                   |
| `events`            | TEXT    | JSON masīvs; noklusējuma `["*"]`                                 |
| `secret`            | TEXT    | HMAC noslēpums (automātiski ģenerēts, ja tas nav norādīts)       |
| `enabled`           | INT     | 0/1; noklusējuma vērtība ir 1                                    |
| `description`       | TEXT    | Cilvēka etiķete pēc izvēles                                      |
| `created_at`        | TEXT    | `datetime('now')`                                                |
| `last_triggered_at` | TEXT    | Atjaunināts katrā piegādes mēģinājumā                            |
| `last_status`       | INT     | Pēdējā mēģinājuma HTTP statuss (0 = tīkls)                       |
| `failure_count`     | INT     | Veiksmes gadījumā tiek atiestatīts uz 0, neveiksmes gadījumā + 1 |

Piegādes vēsture tiek saglabāta speciālajā `webhook_deliveries` tabulā (migrācija `069_webhook_deliveries.sql`, kas tiek ierakstīta, izmantojot `src/lib/db/webhookDeliveries.ts::insertDelivery` katrā mēģinājumā), papildus apkopotajiem skaitītājiem `webhooks` rindā. `070_webhooks_kind_metadata.sql` pievienoja veida metadatus (Slack / Discord / Telegram / pielāgotus kravas transformatorus).

## REST API

Visiem galapunktiem ir nepieciešama pārvaldības autentifikācija (`requireManagementAuth`).

| Galapunkts                      | Metode | Apraksts                                            |
| ------------------------------- | ------ | --------------------------------------------------- |
| `/api/webhooks`                 | GET    | Tīmekļa aizķeru saraksts (slēpti noslēpumi)         |
| `/api/webhooks`                 | POST   | Izveidojiet tīmekļa aizķeri                         |
| `/api/webhooks/[id]`            | GET    | Web aizķeres informācija (pilns noslēpums)          |
| `/api/webhooks/[id]`            | PUT    | Atjaunināt laukus                                   |
| `/api/webhooks/[id]`            | DELETE | Noņemt                                              |
| `/api/webhooks/[id]/test`       | POST   | Aktivizēt `test.ping` (nav atkārtotu mēģinājumu)    |
| `/api/webhooks/[id]/deliveries` | GET    | Nesenie piegādes mēģinājumi vienam tīmekļa aizķerei |
| `/api/webhooks/validate-url`    | POST   | Pirmslidojuma URL validācija (SSRF aizsargs)        |

`GET /api/webhooks` maskē `<first 10 chars>...` noslēpumu, lai izvairītos no informācijas noplūdes saraksta lapās. Izmantojiet `[id]` GET kad jums patiešām ir nepieciešams noslēpums.

### Izveidojiet tīmekļa aizķeri

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

Ja `secret` tiek izlaists, serveris ģenerē `whsec_<hex>` noslēpumu un atgriež to atbildē.

### Pārbaudiet tīmekļa aizķeri

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Atgriež `{ delivered, status, error }`. Netiek mēģināts mēģināt. — ir noderīgs, lai ātri pārbaudītu, vai uztvērējs pieņem lietderīgo slodzi un parakstu.

## Informācijas panelis

`/dashboard/webhooks` informācijas paneļa lapa (skatiet `src/app/(dashboard)/dashboard/webhooks/page.tsx`) nodrošina:

- Create/edit tīmekļa aizķeres ar notikumu atlasītāju
- Statusa indikators (aktīvs / neaktīvs / kļūdains), pamatojoties uz `enabled`, `failure_count` un `last_status`
- Testa piegāde ar vienu klikšķi
- Manuāls enable/disable pārslēgs

## Kravas piemēri

### pieprasījums.pabeigts

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

Lauku formas notikumiem, kas nav `test.ping` nosaka zvanu vietnes, kas tos izstaro; apstrādājiet `data` objektu kā uz priekšu saderīgu (pievienojiet laukus, nav atkarīgi no prombūtnes).

## Labākā prakse

- **Pārbaudiet parakstu uz katras piegādes** pret neapstrādātu korpusu — novērš viltotu POSTs no ikviena, kas uzmin jūsu tīmekļa aizķeri URL.
- **Atbildiet 2xx ~ 5 sekunžu laikā** Dispečera — noildze beidzas pēc 10 s. Lēnie uztvērēji ēdīs atkārtotus mēģinājumus un uzpūtīs `failure_count`.
- **Padariet apdarinātājus idempotentus** — atkārtojumi un vismaz vienreizējas piegādes semantika nozīmē, ka ir iespējami dublikāti.
- **Abonējiet minimāli** — uzskaita tikai tos notikumus, kurus jūs faktiski patērējat; `"*"` palielinās izmaksas par uztvērējiem, kurus jūs nekontrolējat.
- **Skatieties `failure_count`** — galapunkti tiek automātiski atspējoti 10 secīgu kļūmju gadījumā; atiestatiet, zvanot `PUT /api/webhooks/[id]` ar `enabled: true` pēc uztvērēja labošanas.
- **Periodiski apgrieziet noslēpumus** — `PUT` jaunu `secret`, izvietojiet jauno vērtību uztvērējā un apstipriniet, izmantojot testa galapunktu.

## Skatīt arī

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — pilna pārvaldība API virsma
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ķēdes pārtraucēja/atdzišanas semantika aiz pakalpojumu sniedzēja kļūmēm, kas atklātas, izmantojot `request.failed`
- Avots: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
