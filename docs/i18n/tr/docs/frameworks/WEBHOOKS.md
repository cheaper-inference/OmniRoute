# Webhooks (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Doğruluk kaynağı:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Son güncelleme:** 2026-06-28 — v3.8.40

OmniRoute, platform olaylarında HTTP webhook'larını tetikleyebilir. Bunları Slack, PagerDuty, Datadog, dahili uyarı hizmetleri veya herhangi bir HTTP alıcısıyla entegrasyon sağlamak için kullanın.

Dağıtıcı, her teslimatı HMAC-SHA256 ile imzalar, geçici hatalarda yeniden dener, her webhook için teslimat durumunu izler ve sürekli başarısız olan uç noktaları otomatik olarak devre dışı bırakır.

## Desteklenen Etkinlikler

`WebhookEvent` türü (`src/lib/webhooks/eventDescriptions.ts`, `src/lib/webhookDispatcher.ts` tarafından tüketilir) şu anda sekiz olayı modellemektedir:

| Etkinlik                  | Ne zaman ateşlenir                                                                                                                |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Proxy'li istek başarıyla tamamlandı                                                                                               |
| `request.failed`          | Tüm retries/fallback sonra proxy'li bir istek başarısız olur                                                                      |
| `quota.exceeded`          | Bir API anahtarı budget/quota eşiğini geçiyor                                                                                     |
| `proxy.set_aside`         | Tekrarlanan retlerden sonra bir vekil havuzu üyesi kenara alınır (yalnızca geçiş)                                                 |
| `proxy.pool.exhausted`    | Proxy havuzu kapsamının her üyesi bir kenara bırakılır                                                                            |
| `provider.reset_redeemed` | Banka sıfırlamalarının otomatik olarak uygulanması, sıfırlama kredisi veya Claude haftalık oturum sıfırlaması ile sonuçlandırıldı |
| `provider.exhausted`      | Bir sağlayıcının her hesabı soğuyor (sağlayıcı başına en fazla 10 dakikada bir)                                                   |
| `test.ping`               | Test uç noktası tarafından kullanılan sentetik olay                                                                               |

Abonelikler, her etkinliği almak için gerçek `"*"` kabul eder. `events` bilinmeyen olay adları dağıtım sırasında göz ardı edilir.

> Not: dağıtıcı API kabloludur, ancak `test.ping` olmayan bazı olaylar için üretim çağrısı siteleri hala bağlantı halindedir. Sürümünüzde şu anda hangi yolların dağıtıcıyı çağırdığını görmek için `grep dispatchEvent` kontrol edin.

## Mimari

```
Çağıran (işleyici, hizmet, izleyici)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> webhook.events değerine göre filtrele
    -> her eşleşme için (paralel olarak):
       deliverWebhook(url, payload, secret)
         yükü oluştur { event, timestamp, data }
         gövdeyi HMAC-SHA256 ile imzala (secret mevcutsa)
         10 sn zaman aşımıyla POST gönder
         5xx / ağ hatasında en fazla 3 kez yeniden dene
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Dağıtım, çağıran açısından başlat-ve-unut şeklindedir: `Promise.allSettled`, webhook başına oluşan hataları yutar; böylece hatalı bir alıcı diğerlerini engelleyemez.

## HMAC İmzalama

Bir webhook'un `secret` değeri olduğunda OmniRoute, JSON gövdesini imzalar ve şunları gönderir:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Üstbilgi adları `X-Webhook-*` önekini kullanır (`X-OmniRoute-*` değil). İmza
> değeri `sha256=<hex>` biçimindedir — önekin tamamını doğrulayın.

`createWebhook`, secret olmadan çağrılırsa DB modülü bir secret oluşturur
(`whsec_<48 hex>`); dolayısıyla tüm webhook'lar varsayılan olarak imzalanır.

### Alıcıda doğrulama

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Her zaman herhangi bir JSON ayrıştırmasından önce **ham** istek gövdesine göre doğrulama yapın.

## Yeniden Deneme ve Hata Politikası

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Her deneme için 10 saniyelik zaman aşımı (`AbortController`).
- HTTP 2xx başarı olarak kabul edilir.
- HTTP 3xx/4xx, yeniden denenemeyen nihai durum olarak kabul edilir — `success = res.ok`
  ile teslim edilmiş olarak kaydedilir.
- HTTP 5xx ve ağ hataları, üstel geri çekilme ile yeniden denenir:
  `2^attempt * 1000 ms` (1 sn, 2 sn, 4 sn).
- `maxRetries` sonrasında teslimat başarısız olarak kaydedilir.
- Her teslimat `last_triggered_at`, `last_status` alanlarını günceller ve
  `failure_count` değerini sıfırlar veya artırır.
- Dağıtıcı, her dağıtımdan sonra `disableWebhooksWithHighFailures(10)` çağrısını
  yapar; böylece `failure_count >= 10` olan tüm webhook'lar otomatik olarak devre dışı bırakılır.

## Veritabanı

`webhooks` tablosu (`011_webhooks.sql` migrasyonu):

| Sütun               | Tür     | Notlar                                          |
| ------------------- | ------- | ----------------------------------------------- |
| `id`                | TEXT PK | UUID                                            |
| `url`               | TEXT    | Hedef URL                                       |
| `events`            | TEXT    | JSON dizisi; varsayılan `["*"]`                 |
| `secret`            | TEXT    | HMAC sırrı (belirtilmezse otomatik oluşturulur) |
| `enabled`           | INT     | 0/1; varsayılan 1                               |
| `description`       | TEXT    | İsteğe bağlı açıklayıcı etiket                  |
| `created_at`        | TEXT    | `datetime('now')`                               |
| `last_triggered_at` | TEXT    | Her teslimat denemesinde güncellenir            |
| `last_status`       | INT     | Son denemenin HTTP durumu (0 = ağ)              |
| `failure_count`     | INT     | Başarı durumunda 0'a sıfırlanır, hatada +1      |

Teslimat geçmişi, `webhooks` satırındaki toplu sayaçlara ek olarak özel
`webhook_deliveries` tablosunda kalıcı olarak saklanır (migrasyon
`069_webhook_deliveries.sql`; her denemede
`src/lib/db/webhookDeliveries.ts::insertDelivery` aracılığıyla yazılır).
Tür meta verileri (Slack / Discord / Telegram / özel yük dönüştürücüleri)
`070_webhooks_kind_metadata.sql` tarafından eklenmiştir.

## REST API

Tüm uç noktalar yönetim kimlik doğrulaması (`requireManagementAuth`) gerektirir.

| Uç nokta                        | Yöntem | Tanım                                                   |
| ------------------------------- | ------ | ------------------------------------------------------- |
| `/api/webhooks`                 | GET    | Web kancalarını listeleme (gizli sırlar maskelenmiştir) |
| `/api/webhooks`                 | POST   | Web kancası oluştur                                     |
| `/api/webhooks/[id]`            | GET    | Web kancası ayrıntısı (tam gizli)                       |
| `/api/webhooks/[id]`            | PUT    | Alanları güncelle                                       |
| `/api/webhooks/[id]`            | DELETE | Kaldırmak                                               |
| `/api/webhooks/[id]/test`       | POST   | Bir `test.ping` ateşleyin (yeniden deneme yok)          |
| `/api/webhooks/[id]/deliveries` | GET    | Bir webhook için son teslim denemeleri                  |
| `/api/webhooks/validate-url`    | POST   | Uçuş öncesi URL doğrulaması (SSRF guard)                |

`GET /api/webhooks` listeleme sayfalarına sızmayı önlemek için `<first 10 chars>...` sırrını maskeler. Sırra gerçekten ihtiyacınız olduğunda `[id]` GET kullanın.

### Web kancası oluştur

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

`secret` atlanırsa, sunucu bir `whsec_<hex>` sırrı oluşturur ve bunu yanıtta döndürür.

### Web kancasını test edin

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` döndürür. Alıcının yükü ve imzayı kabul ettiğini hızlı bir şekilde doğrulamak için hiçbir yeniden deneme —.

## Kontrol Paneli

`/dashboard/webhooks` adresindeki kontrol paneli sayfası (bkz.
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) şunları sağlar:

- Olay seçiciyle webhook oluşturma/düzenleme
- `enabled`, `failure_count` ve `last_status` değerlerine göre durum göstergesi (etkin / devre dışı / hatalı)
- Tek tıklamayla test teslimatı
- Manuel etkinleştirme/devre dışı bırakma anahtarı

## Yük Örnekleri

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
    "message": "OmniRoute'tan test webhook teslimatı",
    "webhookId": "<uuid>"
  }
}
```

`test.ping` dışındaki olayların alan yapıları, bunları yayınlayan çağrı noktaları tarafından tanımlanır; `data` nesnesini ileriye dönük uyumlu olarak ele alın (alan ekleyin, alanların mevcut olmamasına güvenmeyin).

## En İyi Uygulamalar

- **Her teslimatta imzayı doğrulayın** — webhook URL'nizi tahmin eden kişilerin sahte POST istekleri göndermesini önlemek için doğrulamayı ham gövde üzerinde yapın.
- **~5 saniye içinde 2xx yanıtı verin** — dağıtıcı 10 saniye sonra zaman aşımına uğrar. Yavaş alıcılar yeniden denemeleri tüketir ve `failure_count` değerini artırır.
- **İşleyicileri idempotent hale getirin** — yeniden denemeler ve en az bir kez teslimat semantiği nedeniyle yinelenen teslimatlar mümkündür.
- **Yalnızca gerekli olaylara abone olun** — sadece gerçekten kullandığınız olayları listeleyin; `"*"`, kontrol etmediğiniz alıcılarda maliyeti artırır.
- **`failure_count` değerini izleyin** — uç noktalar art arda 10 hatadan sonra otomatik olarak devre dışı bırakılır; alıcıyı düzelttikten sonra `enabled: true` ile `PUT /api/webhooks/[id]` çağrısı yaparak sıfırlayın.
- **Gizli anahtarları düzenli olarak yenileyin** — yeni bir `secret` değerini `PUT` ile gönderin, yeni değeri alıcıya dağıtın ve test uç noktası aracılığıyla doğrulayın.

## Ayrıca Bakınız

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — yönetim API'sinin tüm kapsamı
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — `request.failed` aracılığıyla gösterilen sağlayıcı hatalarının arkasındaki devre kesici / bekleme süresi semantiği
- Kaynak: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
