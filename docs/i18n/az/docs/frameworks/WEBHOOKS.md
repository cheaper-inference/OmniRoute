# Webhooks (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Həqiqətin mənbəyi:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Son yeniləmə:** 28-06-2026 — v3.8.40

OmniRoute platforma hadisələri üzərində HTTP webhooks işə sala bilər. Slack, PagerDuty, Datadog, daxili xəbərdarlıq xidmətləri və ya hər hansı HTTP qəbuledicisi ilə inteqrasiya etmək üçün onlardan istifadə edin.

Dispetçer hər bir çatdırılmanı HMAC-SHA256 ilə imzalayır, keçici nasazlıqlara yenidən cəhd edir, hər veb-qanda çatdırılma sağlamlığını izləyir və uğursuzluğa davam edən son nöqtələri avtomatik söndürür.

## Dəstəklənən Hadisələr

`WebhookEvent` növü (`src/lib/webhooks/eventDescriptions.ts`, `src/lib/webhookDispatcher.ts` tərəfindən istehlak olunur) hazırda yeddi hadisəni modelləşdirir:

| Hadisə                    | Nə vaxt yanır                                                                                                  |
| ------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Proksiləşdirilmiş sorğu uğurla tamamlanır                                                                      |
| `request.failed`          | Bütün retries/fallback dan sonra etibarlı sorğu uğursuz olur                                                   |
| `quota.exceeded`          | API açarı budget/quota həddini keçir                                                                           |
| `proxy.set_aside`         | Proksi hovuz üzvü təkrar imtinalardan sonra kənara qoyulur (yalnız keçid)                                      |
| `proxy.pool.exhausted`    | Proksi hovuz dairəsinin hər bir üzvü bir kənara qoyulur                                                        |
| `provider.reset_redeemed` | Bank edilmiş sıfırlamaları avtomatik tətbiq edin, sıfırlanmış kredit və ya Claude həftəlik sessiya sıfırlaması |
| `test.ping`               | Testin son nöqtəsi tərəfindən istifadə edilən sintetik hadisə                                                  |

Abunəliklər hər hadisəni qəbul etmək üçün hərfi `"*"` qəbul edir. `events` də naməlum hadisə adları göndərilmə zamanı nəzərə alınmır.

> Qeyd: dispetçer API simlidir, lakin bəzi qeyri-`test.ping` hadisələri üçün istehsal zəng saytları hələ də eniş edir. Hazırda buraxılışınızda dispetçeri hansı yolların işə saldığını görmək üçün `grep dispatchEvent` yoxlayın.

## Memarlıq

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

Göndərmə zəng edən üçün unudulur və yaddan çıxır: `Promise.allSettled` hər webhook səhvlərini udur ki, bir pis qəbuledici digərlərini bloklaya bilmir.

## HMAC İmzalanması

Veb kancada `secret` olduqda, OmniRoute JSON gövdəsini imzalayır və göndərir:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Başlıq adları `X-Webhook-*` prefiksindən istifadə edir ( `X-OmniRoute-*` deyil). İmza dəyəri `sha256=<hex>` — tam prefiksi yoxlayın.

Əgər `createWebhook` sirr olmadan çağırılırsa, DB modulu bir (`whsec_<48 hex>`) yaradır ki, bütün veb-qancalar defolt olaraq imzalanır.

### Qəbuledicidə yoxlanılır

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Həmişə qarşı doğrulayın **xam** İstənilən JSON təhlilindən əvvəl sorğu orqanı.

## Yenidən cəhd və uğursuzluq siyasəti

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Hər cəhd üçün 10 saniyə fasilə (`AbortController`).
- HTTP 2xx uğur sayılır.
- HTTP 3xx/4xx `success = res.ok` ilə çatdırıldığı kimi qeydə alınmış, təkrar sınanmaq mümkün olmayan yekun status — kimi sayılır.
- HTTP 5xx və şəbəkə xətaları eksponensial geriləmə ilə yenidən yoxlanılır: `2^attempt * 1000 ms` (1s, 2s, 4s).
- `maxRetries` dan sonra çatdırılma uğursuz kimi qeyd olunur.
- Hər bir çatdırılma `last_triggered_at`, `last_status` yeniləyir və ya `failure_count` sıfırlayır və ya artırır.
- Dispetçer hər fan-outdan sonra `disableWebhooksWithHighFailures(10)` zəng edir, ona görə də `failure_count >= 10` ilə istənilən veb-qanca avtomatik olaraq söndürülür.

## Verilənlər bazası

Cədvəl `webhooks` (miqrasiya `011_webhooks.sql`):

| Sütun               | Növ     | Qeydlər                                       |
| ------------------- | ------- | --------------------------------------------- |
| `id`                | TEXT PK | UUID                                          |
| `url`               | TEXT    | Təyinat URL                                   |
| `events`            | TEXT    | JSON massivi; standart `["*"]`                |
| `secret`            | TEXT    | HMAC sirri (verilmədikdə avtomatik yaradılır) |
| `enabled`           | INT     | 0/1; default olaraq 1                         |
| `description`       | TEXT    | İsteğe bağlı insan etiketi                    |
| `created_at`        | TEXT    | `datetime('now')`                             |
| `last_triggered_at` | TEXT    | Hər çatdırılma cəhdində yenilənir             |
| `last_status`       | INT     | Son cəhdin HTTP statusu (0 = şəbəkəsi)        |
| `failure_count`     | INT     | Uğurda 0-a, uğursuzluqda + 1-ə sıfırlanır     |

Çatdırılma tarixçəsi `webhooks` cərgəsindəki ümumi sayğaclara əlavə olaraq, xüsusi `webhook_deliveries` cədvəlində saxlanılır (miqrasiya `069_webhook_deliveries.sql`, hər cəhddə `src/lib/db/webhookDeliveries.ts::insertDelivery` vasitəsilə yazılır). Növ metadata (Slack / Discord / Telegram / xüsusi faydalı yük transformatorları) `070_webhooks_kind_metadata.sql` tərəfindən əlavə edildi.

## REST API

Bütün son nöqtələr idarəetmə autentliyini tələb edir (`requireManagementAuth`).

| Son nöqtə                       | Metod  | Təsvir                                        |
| ------------------------------- | ------ | --------------------------------------------- |
| `/api/webhooks`                 | GET    | Veb kancaların siyahısı (maskalı sirlər)      |
| `/api/webhooks`                 | POST   | Webhook yaradın                               |
| `/api/webhooks/[id]`            | GET    | Webhook təfərrüatı (tam gizli)                |
| `/api/webhooks/[id]`            | PUT    | Sahələri yeniləyin                            |
| `/api/webhooks/[id]`            | DELETE | Sil                                           |
| `/api/webhooks/[id]/test`       | POST   | `test.ping` işə salın (yenidən cəhd yoxdur)   |
| `/api/webhooks/[id]/deliveries` | GET    | Bir webhook üçün son çatdırılma cəhdləri      |
| `/api/webhooks/validate-url`    | POST   | Uçuşdan əvvəl URL yoxlaması (SSRF mühafizəsi) |

`GET /api/webhooks` siyahı səhifələrində sızmamaq üçün `<first 10 chars>...` nin sirrini gizlədir. Həqiqətən sirrə ehtiyacınız olduqda `[id]` GET dən istifadə edin.

### Webhook yaradın

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

`secret` buraxılıbsa, server `whsec_<hex>` sirri yaradır və onu cavabda qaytarır.

### Test webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` nı qaytarır. Qəbuledicinin faydalı yükü və imzanı qəbul etdiyini tez bir zamanda təsdiqləmək üçün faydalı — heç bir təkrar cəhdə cəhd edilmir.

## İdarə paneli

`/dashboard/webhooks` -dakı tablosunun səhifəsi (bax: `src/app/(dashboard)/dashboard/webhooks/page.tsx`) aşağıdakıları təmin edir:

- Tədbir seçicisi ilə Create/edit veb-qançları
- `enabled`, `failure_count` və `last_status` əsasında status göstəricisi (aktiv / qeyri-aktiv / xətalı)
- Bir kliklə test çatdırılması
- Əl ilə enable/disable keçidi

## Yükləmə nümunələri

### sorğu.tamamlandı

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

Qeyri-`test.ping` hadisələri üçün sahə formaları onları yayan zəng saytları tərəfindən müəyyən edilir; `data` obyektini irəli uyğunluq kimi qəbul edin (sahələr əlavə edin, yoxluğundan asılı olmayın).

## Ən yaxşı təcrübələr

- **Hər çatdırılmada imzanı yoxlayın** xam bədənə qarşı — URL webhookunuzu təxmin edən hər kəsdən saxta POSTs qarşısını alır.
- **~ 5 saniyə ərzində 2xx cavab verin** — dispetçerin vaxtı 10 s. Yavaş qəbul edənlər təkrar cəhdləri yeyəcək və `failure_count` şişirdəcəklər.
- **İşləyiciləri idempotent edin** — təkrar cəhdləri və ən azı bir dəfə çatdırılma semantikası dublikatların mümkün olduğunu bildirir.
- **Minimum abunə olun** — yalnız həqiqətən istehlak etdiyiniz hadisələri siyahıya alır; `"*"` nəzarət etmədiyiniz qəbuledicilərə xərc əlavə edəcək.
- **`failure_count` baxın** — son nöqtələri 10 ardıcıl uğursuzluqda avtomatik olaraq söndürülür; qəbuledicini düzəltdikdən sonra `PUT /api/webhooks/[id]` ilə `enabled: true` -yə zəng edərək sıfırlayın.
- **Sirləri vaxtaşırı çevirin** — `PUT` yeni `secret`, yeni dəyəri qəbulediciyə yerləşdirin və testin son nöqtəsi vasitəsilə təsdiqləyin.

## Həmçinin baxın

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — tam idarə API səthi
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — dövrə açarı / provayder uğursuzluqlarının arxasındakı soyutma semantikası `request.failed` vasitəsilə ortaya çıxdı
- Mənbə: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
