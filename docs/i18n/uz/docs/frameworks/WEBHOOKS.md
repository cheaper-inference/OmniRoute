# Webhooks (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Haqiqat manbai:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Oxirgi yangilangan:** 2026-06-28 — v3.8.40

OmniRoute HTTP vebhuklarini platforma voqealarida yoqishi mumkin. Ulardan Slack, PagerDuty, Datadog, ichki ogohlantirish xizmatlari yoki har qanday HTTP qabul qiluvchisi bilan integratsiya qilish uchun foydalaning.

Dispetcher har bir yetkazib berishni HMAC-SHA256 bilan imzolaydi, vaqtinchalik nosozliklarni qayta ko‘rib chiqadi, har bir veb-huk uchun yetkazib berish holatini kuzatadi va ishlamay qolayotgan so‘nggi nuqtalarni avtomatik ravishda o‘chiradi.

## Qo'llab-quvvatlanadigan voqealar

`WebhookEvent` turi (`src/lib/webhooks/eventDescriptions.ts`, `src/lib/webhookDispatcher.ts` tomonidan iste'mol qilinadi) hozirda ettita hodisani modellashtiradi:

| Tadbir                    | Qachon yonadi                                                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Proksi-so'rov muvaffaqiyatli yakunlandi                                                                                         |
| `request.failed`          | Proksi-so'rov barcha retries/fallback keyin bajarilmaydi                                                                        |
| `quota.exceeded`          | API kaliti budget/quota chegarasini kesib o'tadi                                                                                |
| `proxy.set_aside`         | Proksi-pul a'zosi qayta-qayta rad etilgandan so'ng ajratiladi (faqat o'tish)                                                    |
| `proxy.pool.exhausted`    | Proksi-server doirasining har bir a'zosi ajratilgan                                                                             |
| `provider.reset_redeemed` | Avtomatik ravishda bank oʻrnatilgan resetlarni qoʻllash qayta tiklangan kredit yoki Claude haftalik sessiyasi asliga qaytarildi |
| `test.ping`               | Sinovning oxirgi nuqtasi tomonidan ishlatiladigan sintetik hodisa                                                               |

Obunalar har bir voqeani qabul qilish uchun tom ma'noda `"*"` qabul qiladi. `events` noma'lum hodisa nomlari jo'natish vaqtida e'tiborga olinmaydi.

> Eslatma: API dispetcheri simli, ammo `test.ping` bo'lmagan ba'zi hodisalar uchun ishlab chiqarish qo'ng'iroqlari saytlari hali ham qo'nmoqda. Sizning relizingizdagi dispetcherni hozirda qaysi yo'llar chaqirayotganini bilish uchun `grep dispatchEvent` tekshiring.

## Arxitektura

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

Dispatch qo'ng'iroq qiluvchi uchun yoqadi va unutadi: `Promise.allSettled` har bir veb-hukdagi xatolarni yutadi, shuning uchun bitta yomon qabul qiluvchi boshqalarni bloklay olmaydi.

## HMAC imzosi

Agar vebhukda `secret` bo'lsa, OmniRoute JSON korpusiga imzo qo'yadi va quyidagilarni yuboradi:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Sarlavha nomlari `X-Webhook-*` prefiksidan foydalanadi ( `X-OmniRoute-*` emas). Imzo qiymati `sha256=<hex>` — toʻliq prefiksni tasdiqlaydi.

Agar `createWebhook` sirsiz chaqirilsa, DB moduli bitta (`whsec_<48 hex>`) hosil qiladi, shuning uchun barcha webhooks sukut bo'yicha imzolanadi.

### Qabul qiluvchida tekshirish

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Har doim qarshi tekshiring **xom** har qanday JSON tahlilidan oldin so'rov tanasi.

## Qayta urinish va muvaffaqiyatsizlik siyosati

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Har bir urinish uchun 10 soniya taym-aut (`AbortController`).
- HTTP 2xx muvaffaqiyat deb hisoblanadi.
- HTTP 3xx/4xx qayta urinib bo‘lmaydigan yakuniy holat sifatida hisoblanadi — `success = res.ok` bilan yetkazib berilgani qayd etilgan.
- HTTP 5xx va tarmoq xatoliklari eksponensial orqaga qaytish bilan qayta uriniladi: `2^attempt * 1000 ms` (1s, 2s, 4s).
- `maxRetries` dan so'ng etkazib berish muvaffaqiyatsiz deb qayd etiladi.
- Har bir yetkazib berish `last_triggered_at`, `last_status` va `failure_count` qayta o'rnatadi yoki oshiradi.
- Dispetcher har bir chiqishdan keyin `disableWebhooksWithHighFailures(10)` qo'ng'iroq qiladi, shuning uchun `failure_count >= 10` bilan har qanday veb-huk avtomatik ravishda o'chiriladi.

## Ma'lumotlar bazasi

`webhooks` jadvali (migratsiya `011_webhooks.sql`):

| Ustun               | Turi    | Eslatmalar                                                          |
| ------------------- | ------- | ------------------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                                |
| `url`               | TEXT    | Belgilangan manzil URL                                              |
| `events`            | TEXT    | JSON massivi; standart `["*"]`                                      |
| `secret`            | TEXT    | HMAC siri (agar berilmasa, avtomatik ravishda yaratiladi)           |
| `enabled`           | INT     | 0/1; sukut bo'yicha 1                                               |
| `description`       | TEXT    | Ixtiyoriy inson yorlig'i                                            |
| `created_at`        | TEXT    | `datetime('now')`                                                   |
| `last_triggered_at` | TEXT    | Har bir yetkazib berish urinishida yangilanadi                      |
| `last_status`       | INT     | Oxirgi urinishning HTTP holati (0 = tarmog'i)                       |
| `failure_count`     | INT     | Muvaffaqiyatli 0 ga, muvaffaqiyatsizlikka uchragan + 1 ga tiklanadi |

Yetkazib berish tarixi `webhooks` qatoridagi jami hisoblagichlardan tashqari, maxsus `webhook_deliveries` jadvalida saqlanadi (migratsiya `069_webhook_deliveries.sql`, har bir urinishda `src/lib/db/webhookDeliveries.ts::insertDelivery` orqali yoziladi). `070_webhooks_kind_metadata.sql` tomonidan turdagi metama'lumotlar (Slack / Discord / Telegram / maxsus foydali yuk transformatorlari) qo'shildi.

## REST API

Barcha so'nggi nuqtalar boshqaruv autentsiyasini (`requireManagementAuth`) talab qiladi.

| Yakuniy nuqta                   | Usul   | Tavsif                                                |
| ------------------------------- | ------ | ----------------------------------------------------- |
| `/api/webhooks`                 | GET    | Veb-huklarni ro'yxatlash (maskalangan sirlar)         |
| `/api/webhooks`                 | POST   | Webhook yarating                                      |
| `/api/webhooks/[id]`            | GET    | Webhuk tafsilotlari (to'liq maxfiy)                   |
| `/api/webhooks/[id]`            | PUT    | Maydonlarni yangilash                                 |
| `/api/webhooks/[id]`            | DELETE | O'chirish                                             |
| `/api/webhooks/[id]/test`       | POST   | `test.ping` ni yoqish (qayta urinishlarsiz)           |
| `/api/webhooks/[id]/deliveries` | GET    | Bitta vebhuk uchun oxirgi yetkazib berish urinishlari |
| `/api/webhooks/validate-url`    | POST   | Parvoz oldidan URL tekshiruvi (SSRF qo'riqchisi)      |

`GET /api/webhooks` listing sahifalarida sizib chiqmaslik uchun `<first 10 chars>...` sirini yashiradi. Sizga sir kerak bo'lganda `[id]` GET dan foydalaning.

### Webhook yarating

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

Agar `secret` o'tkazib yuborilsa, server `whsec_<hex>` sirini yaratadi va uni javobda qaytaradi.

### Sinov vebhuk

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` ni qaytaradi. Qayta urinishlar amalga oshirilmaydi — qabul qiluvchining foydali yuk va imzoni qabul qilishini tezda tekshirish uchun foydalidir.

## Boshqaruv paneli

`/dashboard/webhooks` boshqaruv paneli sahifasi ( `src/app/(dashboard)/dashboard/webhooks/page.tsx` qarang) quyidagilarni ta'minlaydi:

- Voqealar tanlagichi bilan Create/edit vebhuklari
- `enabled`, `failure_count` va `last_status` ga asoslangan holat indikatori (faol / nofaol / xatolik)
- Bir marta bosish orqali sinov yetkazib berish
- Qo'lda enable/disable almashtirish

## Yuk yukiga misollar

### so'rov.tugallangan

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

`test.ping` bo'lmagan hodisalar uchun maydon shakllari ularni chiqaradigan qo'ng'iroq saytlari tomonidan belgilanadi; `data` ob'ektini oldinga mos keladigan sifatida ko'rib chiqing (maydonlarni qo'shing, yo'qligiga bog'liq emas).

## Eng yaxshi amaliyotlar

- **Har bir etkazib berishda imzoni tekshiring** xomashyo tanasiga qarshi — sizning webhook URL taxmin qilgan har bir kishidan soxta POSTs oldini oladi.
- **~ 5 soniya ichida 2xx javob bering** — dispetcher vaqti 10 soniyada tugaydi. Sekin qabul qiluvchilar qayta urinishlarni eyishadi va `failure_count` shishiradi.
- **Ishlovchilarni idempotent qiling** — qayta urinishlari va hech bo'lmaganda bir marta yetkazib berish semantikasi dublikat qilish mumkinligini anglatadi.
- **Minimal obuna bo'ling** — ro'yxati faqat siz haqiqatan ham iste'mol qiladigan hodisalar; `"*"` siz nazorat qilmaydigan qabul qiluvchilarning narxini oshiradi.
- **`failure_count` tomosha qiling** — so'nggi nuqtalari ketma-ket 10 ta nosozlikda avtomatik ravishda o'chiriladi; qabul qilgichni tuzatgandan so'ng `PUT /api/webhooks/[id]` bilan `enabled: true` ga qo'ng'iroq qilish orqali qayta o'rnating.
- **Vaqti-vaqti bilan sirlarni aylantiring** — `PUT` yangi `secret`, qabul qiluvchiga yangi qiymatni o'rnating va sinov so'nggi nuqtasi orqali tasdiqlang.

## Shuningdek qarang

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — to'liq boshqarish API yuzasi
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — elektron to'xtatuvchisi / provayder nosozliklari ortidagi sovutish semantikasi `request.failed` orqali yuzaga keldi
- Manba: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
