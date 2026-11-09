# Webhooks (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Gerçeğin kaynağı:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Son güncelleme:** 2026-06-28 — v3.8.40

OmniRoute platform etkinliklerinde HTTP web kancalarını etkinleştirebilir. Bunları Slack, PagerDuty, Datadog, dahili uyarı hizmetleri veya herhangi bir HTTP alıcısıyla entegre etmek için kullanın.

Dağıtıcı her teslimatı HMAC-SHA256 ile imzalar, geçici arızaları yeniden dener, web kancası başına teslimat durumunu izler ve başarısız olmaya devam eden uç noktaları otomatik olarak devre dışı bırakır.

## Desteklenen Etkinlikler

`WebhookEvent` türü ( `src/lib/webhookDispatcher.ts` tarafından tüketilen `src/lib/webhooks/eventDescriptions.ts`) şu anda yedi olayı modellemektedir:

| Etkinlik                  | Ne zaman ateşlenir                                                                                                                |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Proxy'li istek başarıyla tamamlandı                                                                                               |
| `request.failed`          | Tüm retries/fallback sonra proxy'li bir istek başarısız olur                                                                      |
| `quota.exceeded`          | Bir API anahtarı budget/quota eşiğini geçiyor                                                                                     |
| `proxy.set_aside`         | Tekrarlanan retlerden sonra bir vekil havuzu üyesi kenara alınır (yalnızca geçiş)                                                 |
| `proxy.pool.exhausted`    | Proxy havuzu kapsamının her üyesi bir kenara bırakılır                                                                            |
| `provider.reset_redeemed` | Banka sıfırlamalarının otomatik olarak uygulanması, sıfırlama kredisi veya Claude haftalık oturum sıfırlaması ile sonuçlandırıldı |
| `test.ping`               | Test uç noktası tarafından kullanılan sentetik olay                                                                               |

Abonelikler, her etkinliği almak için gerçek `"*"` kabul eder. `events` bilinmeyen olay adları dağıtım sırasında göz ardı edilir.

> Not: Dağıtıcı API kabloludur ancak `test.ping` olmayan bazı olaylar için üretim çağrı siteleri hala bağlantı halindedir. Sürümünüzde şu anda hangi yolların dağıtıcıyı çağırdığını görmek için `grep dispatchEvent` kontrol edin.

## Mimarlık

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

Gönderim, arayan kişi için at ve unut yöntemidir: `Promise.allSettled` web kancası başına hataları yutar, böylece kötü bir alıcı diğerlerini engelleyemez.

## HMAC İmzalama

Bir web kancasında `secret` bulunduğunda OmniRoute, JSON gövdesini imzalar ve şunu gönderir:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Başlık adları `X-Webhook-*` önekini kullanır ( `X-OmniRoute-*` değil). İmza değeri `sha256=<hex>` — tam öneki doğrular.

`createWebhook` bir sır olmadan çağrılırsa DB modülü bir tane (`whsec_<48 hex>`) oluşturur, böylece tüm web kancaları varsayılan olarak imzalanır.

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

Her zaman şunu doğrulayın:**çiğ** Herhangi bir JSON ayrıştırmasından önce istek gövdesi.

## Yeniden Deneme ve Başarısızlık Politikası

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Deneme başına 10 saniyelik zaman aşımı (`AbortController`).
- HTTP 2xx başarı olarak sayılır.
- HTTP 3xx/4xx `success = res.ok` ile teslim edildiği şekilde kaydedilen yeniden denenemeyen nihai durum — olarak sayılır.
- HTTP 5xx ve ağ hataları üstel geri çekilmeyle yeniden denenir: `2^attempt * 1000 ms` (1s, 2s, 4s).
- `maxRetries` sonra teslimat başarısız olarak kaydedilir.
- Her teslimat `last_triggered_at` ve `last_status` günceller ve `failure_count` sıfırlar veya artırır.
- Dağıtıcı her dağıtımdan sonra `disableWebhooksWithHighFailures(10)` çağırır, böylece `failure_count >= 10` tüm web kancaları otomatik olarak devre dışı bırakılır.

## Veritabanı

`webhooks` Tablosu ( `011_webhooks.sql` geçişi):

| Kolon               | Tip     | Notlar                                                        |
| ------------------- | ------- | ------------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                          |
| `url`               | TEXT    | Hedef URL                                                     |
| `events`            | TEXT    | JSON dizisi; varsayılan `["*"]`                               |
| `secret`            | TEXT    | HMAC sırrı (verilmemişse otomatik olarak oluşturulur)         |
| `enabled`           | INT     | 0/1; varsayılan olarak 1'dir                                  |
| `description`       | TEXT    | İsteğe bağlı insan etiketi                                    |
| `created_at`        | TEXT    | `datetime('now')`                                             |
| `last_triggered_at` | TEXT    | Her teslimat denemesinde güncellenir                          |
| `last_status`       | INT     | Son denemenin HTTP durumu (0 = ağı)                           |
| `failure_count`     | INT     | Başarı durumunda 0'a, başarısızlık durumunda + 1'e sıfırlanır |

Teslimat geçmişi, `webhooks` satırındaki toplam sayaçlara ek olarak özel `webhook_deliveries` tablosunda (geçiş `069_webhook_deliveries.sql`, her denemede `src/lib/db/webhookDeliveries.ts::insertDelivery` aracılığıyla yazılır) saklanır. Tür meta verileri (Slack / Discord / Telegram / özel yük transformatörleri) `070_webhooks_kind_metadata.sql` tarafından eklendi.

## REST API

Tüm uç noktalar yönetim kimlik doğrulaması (`requireManagementAuth`) gerektirir.

| Uç nokta                        | Yöntem | Tanım                                                   |
| ------------------------------- | ------ | ------------------------------------------------------- |
| `/api/webhooks`                 | GET    | Web kancalarını listeleme (gizli sırlar maskelenmiştir) |
| `/api/webhooks`                 | POST   | Web kancası oluştur                                     |
| `/api/webhooks/[id]`            | GET    | Web kancası ayrıntısı (tam gizli)                       |
| `/api/webhooks/[id]`            | PUT    | Alanları güncelle                                       |
| `/api/webhooks/[id]`            | DELETE | Kaldırmak                                               |
| `/api/webhooks/[id]/test`       | POST   | `test.ping` ateşleyin (yeniden deneme yok)              |
| `/api/webhooks/[id]/deliveries` | GET    | Bir webhook için son teslim denemeleri                  |
| `/api/webhooks/validate-url`    | POST   | Uçuş öncesi URL doğrulaması (SSRF koruması)             |

`GET /api/webhooks` listeleme sayfalarına sızmayı önlemek için sırrı `<first 10 chars>...` gizler. Sırra gerçekten ihtiyacınız olduğunda `[id]` GET kullanın.

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

`secret` atlanırsa sunucu bir `whsec_<hex>` sırrı oluşturur ve bunu yanıtta döndürür.

### Web kancasını test edin

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` döndürür. Yeniden deneme yapılmaz — alıcının yükü ve imzayı kabul ettiğini hızlı bir şekilde doğrulamak için kullanışlıdır.

## Kontrol Paneli

`/dashboard/webhooks` kontrol paneli sayfası (bkz. `src/app/(dashboard)/dashboard/webhooks/page.tsx`) şunları sağlar:

- Etkinlik seçicili Create/edit web kancaları
- `enabled`, `failure_count` ve `last_status` dayalı durum göstergesi (etkin/etkin değil/hatalı)
- Tek tıkla test sunumu
- Manuel enable/disable geçişi

## Yük Örnekleri

### istek.tamamlandı

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

`test.ping` dışı olaylara ilişkin alan şekilleri, bunları yayan çağrı siteleri tarafından tanımlanır; `data` nesnesine ileriye dönük uyumlu olarak davranın (alan ekleyin, yokluğuna bağlı kalmayın).

## En İyi Uygulamalar

- **Her teslimatta imzayı doğrulayın** ham gövdeye karşı — webhook URL tahmin eden herkesin sahte POSTs önler.
- **2xx'e ~ 5 saniye içinde yanıt verin** — sevk programı 10 saniyede zaman aşımına uğruyor. Yavaş alıcılar yeniden denemeleri tüketecek ve `failure_count` şişirecektir.
- **İşleyicileri önemsiz hale getirin** — yeniden denemeleri ve en az bir kez teslimat semantiği, kopyaların mümkün olduğu anlamına gelir.
- **Minimum düzeyde abone olun** — yalnızca gerçekten tükettiğiniz olayları listeler; `"*"` kontrol etmediğiniz alıcılara maliyet ekleyecektir.
- **`failure_count` izleyin** — uç noktaları art arda 10 arıza durumunda otomatik olarak devre dışı bırakılır; Alıcıyı tamir ettikten sonra `enabled: true` ile `PUT /api/webhooks/[id]` arayarak sıfırlayın.
- **Gizli dizileri periyodik olarak döndürün** — `PUT` yeni bir `secret`, yeni değeri alıcıya dağıtın ve test uç noktası aracılığıyla onaylayın.

## Ayrıca Bakınız

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — tam yönetim API yüzeyi
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) `request.failed` aracılığıyla ortaya çıkan sağlayıcı arızalarının ardındaki — devre kesici / bekleme süresi semantiği
- Kaynak: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
