# Webhooks (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **სიმართლის წყარო:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**ბოლო განახლება:** 2026-06-28 — v3.8.40

OmniRoute შეუძლია HTTP ვებჰუკების გაშვება პლატფორმის ღონისძიებებზე. გამოიყენეთ ისინი Slack, PagerDuty, Datadog, შიდა სიგნალიზაციის სერვისებთან ან HTTP მიმღებთან ინტეგრირებისთვის.

დისპეტჩერი ხელს აწერს თითოეულ მიწოდებას HMAC-SHA256 ით, ხელახლა ცდის გარდამავალ წარუმატებლობებს, თვალყურს ადევნებს მიწოდების სიჯანსაღეს თითო webhook-ზე და ავტომატურად გამორთავს საბოლოო წერტილებს, რომლებიც მუდმივად მარცხდებიან.

## მხარდაჭერილი ღონისძიებები

`WebhookEvent` ტიპი (`src/lib/webhooks/eventDescriptions.ts`, მოხმარებული `src/lib/webhookDispatcher.ts`) ამჟამად აყალიბებს შვიდ მოვლენას:

| ღონისძიება                | ხანძარი როცა                                                                                                          |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | პროქსიირებული მოთხოვნა წარმატებით სრულდება                                                                            |
| `request.failed`          | მარიონეტული მოთხოვნა ვერ ხერხდება ყველა retries/fallback შემდეგ                                                       |
| `quota.exceeded`          | API გასაღები კვეთს budget/quota ბარიერს                                                                               |
| `proxy.set_aside`         | მარიონეტული ჯგუფის წევრი განიხილება განმეორებითი უარის შემდეგ (მხოლოდ გარდამავალი)                                    |
| `proxy.pool.exhausted`    | პროქსი აუზის ფარგლების ყველა წევრი განზეა გამოყოფილი                                                                  |
| `provider.reset_redeemed` | საბანკო გადატვირთვის ავტომატური გამოყენება გამოისყიდა გადატვირთვის კრედიტი ან Claude ყოველკვირეული სესიის გადატვირთვა |
| `test.ping`               | სინთეტიკური მოვლენა, რომელიც გამოიყენება ტესტის საბოლოო წერტილის მიერ                                                 |

გამოწერები იღებენ სიტყვასიტყვით `"*"` ყველა მოვლენის მისაღებად. უცნობი მოვლენის სახელები `events` ში იგნორირებულია გაგზავნის დროს.

> შენიშვნა: დისპეჩერი API არის სადენიანი, მაგრამ წარმოების გამოძახების ადგილები ზოგიერთი არა-`test.ping` მოვლენისთვის ჯერ კიდევ დაშვებულია. შეამოწმეთ `grep dispatchEvent`, რომ ნახოთ რომელი ბილიკები მიმართავს დისპეტჩერს თქვენს გამოშვებაში.

## არქიტექტურა

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

აბონენტისთვის გაგზავნა ცეცხლსასროლი იარაღია და დაივიწყე: `Promise.allSettled` ყლაპავს შეცდომებს თითო ქსელში, ასე რომ ერთი ცუდი მიმღები არ შეუძლია დაბლოკოს სხვები.

## HMAC ხელმოწერა

როდესაც ვებჰუკს აქვს `secret`, OmniRoute ხელს აწერს JSON სხეულს და აგზავნის:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> სათაურის სახელები იყენებენ `X-Webhook-*` პრეფიქსს (არა `X-OmniRoute-*`). ხელმოწერის მნიშვნელობა არის `sha256=<hex>` — გადაამოწმეთ სრული პრეფიქსი.

თუ `createWebhook` გამოიძახება საიდუმლოების გარეშე, DB მოდული წარმოქმნის ერთს (`whsec_<48 hex>`), ასე რომ ყველა webhook ხელმოწერილია ნაგულისხმევად.

### გადამოწმება მიმღებზე

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

ყოველთვის გადაამოწმეთ წინააღმდეგ **ნედლი** მოთხოვნის ორგანო, ნებისმიერი JSON ანალიზის წინ.

## ხელახლა ცდა და წარუმატებლობის პოლიტიკა

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 წამი თითო მცდელობაზე (`AbortController`).
- HTTP 2xx ითვლება წარმატებად.
- HTTP 3xx/4xx ითვლება, როგორც განუმეორებელი საბოლოო სტატუსი — ჩაწერილი, როგორც მიწოდებული `success = res.ok` ით.
- HTTP 5xx და ქსელის შეცდომები ხელახლა განიხილება ექსპონენციალური უკან დახევით: `2^attempt * 1000 ms` (1s, 2s, 4s).
- `maxRetries` შემდეგ, მიწოდება ჩაიწერება, როგორც წარუმატებელი.
- ყოველი მიწოდება განაახლებს `last_triggered_at`, `last_status`, და ან გადატვირთავს ან ზრდის `failure_count`.
- დისპეტჩერი უწოდებს `disableWebhooksWithHighFailures(10)` ყოველი ფან-აუტის შემდეგ, ასე რომ, ნებისმიერი webhook `failure_count >= 10` ით ავტომატურად გამორთულია.

## მონაცემთა ბაზა

ცხრილი `webhooks` (მიგრაცია `011_webhooks.sql`):

| სვეტი               | ტიპი    | შენიშვნები                                                    |
| ------------------- | ------- | ------------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                          |
| `url`               | TEXT    | დანიშნულების ადგილი URL                                       |
| `events`            | TEXT    | JSON მასივი; ნაგულისხმევი `["*"]`                             |
| `secret`            | TEXT    | HMAC საიდუმლო (ავტომატურად გენერირებული, თუ არ არის მოცემული) |
| `enabled`           | INT     | 0/1; ნაგულისხმევია 1                                          |
| `description`       | TEXT    | პირობითი ადამიანის ეტიკეტი                                    |
| `created_at`        | TEXT    | `datetime('now')`                                             |
| `last_triggered_at` | TEXT    | განახლებულია მიწოდების ყოველი მცდელობისას                     |
| `last_status`       | INT     | ბოლო მცდელობის HTTP სტატუსი (0 = ქსელი)                       |
| `failure_count`     | INT     | აღდგება 0-ზე წარმატების შემთხვევაში, + 1 წარუმატებლობისას     |

მიწოდების ისტორია შენარჩუნებულია გამოყოფილ `webhook_deliveries` ცხრილში (მიგრაცია `069_webhook_deliveries.sql`, იწერება `src/lib/db/webhookDeliveries.ts::insertDelivery` ით ყოველი მცდელობისას), გარდა `webhooks` მწკრივის საერთო მრიცხველებისა. სახის მეტამონაცემები (Slack / Discord / Telegram / მორგებული დატვირთვის ტრანსფორმატორები) დაამატა `070_webhooks_kind_metadata.sql` მა.

## REST API

ყველა საბოლოო წერტილი მოითხოვს მენეჯმენტის ავტორიზაციას (`requireManagementAuth`).

| ბოლო წერტილი                    | მეთოდი | აღწერა                                        |
| ------------------------------- | ------ | --------------------------------------------- |
| `/api/webhooks`                 | GET    | ვებ-ჰუკების სია (საიდუმლოები ნიღბიანი)        |
| `/api/webhooks`                 | POST   | ვებჰუკის შექმნა                               |
| `/api/webhooks/[id]`            | GET    | ვებჰუკის დეტალი (სრული საიდუმლო)              |
| `/api/webhooks/[id]`            | PUT    | ველების განახლება                             |
| `/api/webhooks/[id]`            | DELETE | ამოღება                                       |
| `/api/webhooks/[id]/test`       | POST   | გაათავისუფლეთ `test.ping` (გამეორება არ არის) |
| `/api/webhooks/[id]/deliveries` | GET    | მიწოდების ბოლო მცდელობები ერთი ვებჰუკისთვის   |
| `/api/webhooks/validate-url`    | POST   | ფრენის წინ URL ვალიდაცია (SSRF მცველი)        |

`GET /api/webhooks` ნიღბავს `<first 10 chars>...` ის საიდუმლოს, რათა თავიდან აიცილოს გაჟონვა ჩამონათვალის გვერდებზე. გამოიყენეთ `[id]` GET როდესაც ნამდვილად გჭირდებათ საიდუმლო.

### ვებჰუკის შექმნა

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

თუ `secret` გამოტოვებულია, სერვერი წარმოქმნის `whsec_<hex>` საიდუმლოს და აბრუნებს მას პასუხში.

### ტესტი webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

აბრუნებს `{ delivered, status, error }`. ხელახალი — არ არის მცდელობა.

## დაფა

დაფის გვერდი `/dashboard/webhooks` ში (იხ. `src/app/(dashboard)/dashboard/webhooks/page.tsx`) გთავაზობთ:

- Create/edit webhooks ღონისძიების ამომრჩევი
- სტატუსის ინდიკატორი (აქტიური / არააქტიური / შეცდომით) დაფუძნებული `enabled`, `failure_count` და `last_status`
- ტესტის მიწოდება ერთი დაწკაპუნებით
- მექანიკური enable/disable გადართვა

## დატვირთვის მაგალითები

### მოთხოვნა.შესრულებულია

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

### ტესტი.პინგი

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

ველის ფორმები არა-`test.ping` მოვლენებისთვის განისაზღვრება გამოძახების საიტებით, რომლებიც ასხივებენ მათ; განიხილეთ `data` ობიექტი, როგორც წინსვლის თავსებადი (დაამატეთ ველები, არ იყო დამოკიდებული არყოფნაზე).

## საუკეთესო პრაქტიკა

- **გადაამოწმეთ ხელმოწერა ყოველ მიწოდებაზე** დაუმუშავებელი სხეულის წინააღმდეგ — ხელს უშლის გაყალბებულ POSTs ყველასგან, ვინც გამოიცნობს თქვენს ვებჰუკს URL.
- **უპასუხეთ 2xx ~ 5 წამში** — დისპეტჩერის დრო ამოიწურება 10 წამში. ნელი მიმღებები მიირთმევენ განმეორებით ცდას და ადიდებენ `failure_count`.
- **გამტარები გახადეთ უძლურები** — ხელახალი ცდები და ერთხელ მაინც მიწოდების სემანტიკა ნიშნავს დუბლიკატებს.
- **გამოიწერეთ მინიმალურად** — ჩამოთვალეთ მხოლოდ ის მოვლენები, რომლებსაც რეალურად მოიხმართ; `"*"` დაამატებს ღირებულებას მიმღებებზე, რომლებსაც არ აკონტროლებთ.
- **უყურეთ `failure_count`** — ბოლო წერტილები ავტომატურად გამორთულია ზედიზედ 10 წარუმატებლობის შემთხვევაში; გადატვირთეთ `PUT /api/webhooks/[id]` დარეკვით `enabled: true` ით მიმღების დაფიქსირების შემდეგ.
- **პერიოდულად გადაატრიალეთ საიდუმლოებები** — `PUT` ახალი `secret`, განათავსეთ ახალი მნიშვნელობა მიმღებზე და დაადასტურეთ ტესტის საბოლოო წერტილის მეშვეობით.

## აგრეთვე იხილეთ

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — სრული მართვა API ზედაპირი
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ამომრთველი / გაგრილების სემანტიკა პროვაიდერის წარუმატებლობის მიღმა გამოჩნდა `request.failed` მეშვეობით
- წყარო: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
