# Custom JSON API provider nodes (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

Özel bir JSON API düğümü, OpenAI veya Anthropic protokolünü konuşmayan bir JSON iş uç noktasına bağlanır. OmniRoute bir JSON istek şablonunu doldurur, URL uç noktasının tamamına gönderir, yanıtı bir yanıt yolundan okur ve bunu istemciye kendi formatında (Sohbet Tamamlamaları, Yanıtlar, Mesajlar, ...) döndürür.

`apiType: "custom-json"` sahip OpenAI uyumlu bir düğümdür; kimliği `openai-compatible-custom-json-<suffix>` biçimindedir. Kontrol paneli formu henüz kullanılamıyor. Bu düğümleri aşağıdaki sağlayıcı düğümü API aracılığıyla oluşturun ve düzenleyin.

## Bir düğüm oluştur

`POST /api/provider-nodes` (yönetim yetkilendirmesi):

```json
{
  "type": "openai-compatible",
  "apiType": "custom-json",
  "name": "Business API",
  "prefix": "biz",
  "baseUrl": "https://api.example.com/v1/answer",
  "customHeaders": { "X-Tenant": "demo" },
  "customJson": {
    "method": "POST",
    "authType": "api-key",
    "authHeader": "X-Service-Key",
    "requestTemplate": {
      "project_id": "demo-project",
      "question": "{{prompt}}",
      "history": "{{messages}}"
    },
    "responsePath": "data.answer"
  }
}
```

- `baseUrl` şudur** tamamlamak** uç nokta URL. Hiçbir şey eklenmez ( `/chat/completions` yok, `/models` yok) ve diğer OpenAI uyumlu düğümlerin aksine varsayılan URL yoktur. Katıştırılmış kimlik bilgileri veya `#fragment` olmadan `http(s)` olmalıdır ve hem düğüm kaydedildiğinde hem de her istekte her sağlayıcı düğümle aynı giden URL korumasını geçer.
- Bağlantı anahtarını (varsayılan dahil `authType` `bearer` veya `api-key`) gönderen bir düğümün `https://` kullanması gerekir. Düz `http://` yalnızca geridöngü ana bilgisayarı (`localhost`, `127.0.0.0/8`, `::1`) veya hiçbir anahtar göndermeyen `authType: "none"` ile kabul edilir. Özel LAN adresleri (`10.x`, `172.16-31.x`, `192.168.x`) muaf değildir: o ağdaki herkes anahtarı okuyabilir. Böyle bir düğümün kaydedilmesi `400` ile başarısız olur ve daha önce saklanan bir düğüm, herhangi bir istek gönderilmeden önce aynı mesajla her istekte kapatılamaz. LAN üzerindeki anahtarlı bir uç nokta için, onu TLS (örneğin ters proxy) arkasına koyun.
- `customJson` Zod ile doğrulanır; bilinmeyen anahtarlar reddedilir. Her alan isteğe bağlıdır:

| Alan              | Değerler                                  | Varsayılan                                             |
| ----------------- | ----------------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                    | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`               | `bearer`                                               |
| `authHeader`      | `api-key` olduğunda kullanılan başlık adı | `X-API-Key`                                            |
| `requestTemplate` | JSON nesnesi (≤ 64 KB, derinlik ≤ 32)     | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | alan yolu veya tüm vücut için `$`         | `choices[0].message.content`                           |

- Sır, bağlantının API anahtarında kalır, asla şablonda kalmaz. `bearer` `Authorization: Bearer <key>` gönderir; `api-key` `<authHeader>: <key>` gönderir. Kimlik doğrulama başlığı `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` veya atlamadan atlama başlığı olamaz. `none` ile bağlantıların anahtara ihtiyacı yoktur.
- Ekstra statik başlıklar, düğümün normal `customHeaders` kullanır (diğer tüm uyumlu düğümlerle aynı doğrulama; burada kimlik doğrulama başlıklarına izin verilmez).

`PUT /api/provider-nodes/<id>` aynı `customJson` kabul eder ve düğümün mevcut her bağlantısında `baseUrl` ve yapılandırmayı yeniden yazar. `customJson` atlanması depolanan yapılandırmayı korur; `apiType` `chat` veya `responses` olarak değiştirmek onu düğümden ve bağlantılarından kaldırır.

Daha sonra her zamanki gibi düğüme bir bağlantı ekleyin (düğüm kimliğiyle birlikte `POST /api/providers` ) ve `<prefix>/<model>`(örneğin `biz/assistant-v1` isteğinde bulunun. Uç nokta hiçbir model listesi göstermez, bu nedenle model kimliklerini elle ekleyin.

## Şablon isteyin

Şablonlar düz JSON. Bir dize değeri `{{placeholder}}` işaretçileri içerebilir; hiçbir şey değerlendirilmez veya yürütülmez ve nesne anahtarları hiçbir zaman değiştirilmez.

| Yer tutucu           | Değer                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| `{{prompt}}`         | En son kullanıcı mesajının metni (yeni satırlarla birleştirilen metin parçaları) |
| `{{messages}}`       | OpenAI sohbet formatındaki konuşma                                               |
| `{{model}}`          | Sağlayıcı öneki olmadan istenen model kimliği                                    |
| `{{stream}}`         | Her zaman `false` — uç nokta tek bir JSON belgesiyle yanıt verir                 |
| `{{request.<path>}}` | Çevrilen (OpenAI sohbet biçimi) isteğinin alanı                                  |

- Tam olarak tek bir yer tutucu olan değer, JSON türünü korur (`"{{messages}}"` bir dizi haline gelir); daha uzun bir dizenin içindeki yer tutucu metin olarak eklenir.
- Hiçbir şeye çözümlenmeyen bir yer tutucu, eksik bir yük göndermek yerine HTTP 400 ile isteği başarısızlığa uğratır.
- Yollar nokta gösterimini ve sayısal dizinleri (`data.items[0].text`) kullanır. `__proto__`, `prototype` ve `constructor` anahtarlarda ve yollarda reddedilir.

## Yanıtlar

`responsePath` değer asistan yanıtı haline gelir: dizeler geçer, diğer JSON değerleri serileştirilir. Eksik veya `null` alanı veya JSON olmayan bir gövde HTTP 502 değerini döndürür. Yukarı akış hata durumları aktarılır. Akış istemcileri için OmniRoute JSON yanıtının tamamını bekler ve ardından bunu bir içerik parçası artı bitiş parçası olarak yayınlar; bu jeton akışı değil. Araç çağrıları ve kullanım alanları eşlenmemiştir.

## Asla tekrar oynatılmadı

Bir iş isteği başarısız olsa bile yan etkilere sahip olabilir. OmniRoute bu nedenle onu bir kez gönderir:

- aktarım yeniden denemesi yok ve yönlendirme takibi yok;
- başka bir bağlantıda yeniden deneme yok (hesap geri dönüşü) — hata olduğu gibi döndürülür ve bağlantı soğutulmaz;
- boş veya başarısız bir yanıt için bile bir sonraki birleşik hedefe geri dönüş yok.

Ayrı istemci istekleri ve çeşitli modelleri açıkça çağıran füzyon panelleri, yine de uç noktayı bağımsız olarak çağırır.

## Bir düğümü test etme

Bir bağlantıyı kaydetme, bağlantı** Test** düğme ve arka plan sağlık kontrolleri hiçbir zaman uç noktayı çağırmaz: yalnızca depolanan yapılandırmayı doğrular ve bağlantıyı doğrulanamaz olarak bildirir.

`"apiType": "custom-json"` ve düğüm alanları (`baseUrl`, `apiKey`, `customJson`, isteğe bağlı `customHeaders` ve `modelId`) ile `POST /api/provider-nodes/validate` en son kullanıcı metni olarak `ping` ile tam olarak tek bir gerçek istek gönderir. `{ "valid": true }` veya yukarı akış durumuna yanıt verir (asla yukarı akış gövdesine yanıt vermez).

## Depolamak

Yapılandırma `provider_nodes.custom_json_config_json` (geçiş `240_provider_node_custom_json_config.sql`) saklanır ve her bağlantının `providerSpecificData.customJson` kopyalanır.

Uygulama: `open-sse/utils/customJson.ts` (doğrulama ve şablon oluşturma), `open-sse/executors/customJson.ts` (yürütücü), `open-sse/services/combo/noReplayLatch.ts` ve `src/sse/handlers/chat/responsePolicies.ts` (tekrarlama yok).
