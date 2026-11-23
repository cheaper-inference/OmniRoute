# Guardrails (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Doğruluk kaynağı:** `src/lib/guardrails/`
> **Son güncelleme:** 2026-08-29 — v3.8.51 (Video Köprüsü transkript kaynağı arayan tarafından beyan edilir,
> henüz sunucu tarafından doğrulanmadı — #11661 uyarınca açıklığa kavuşturuldu)

Guardrail'ler, OmniRoute ile yukarı akış sağlayıcıları arasındaki sınırda güvenliği, politikayı ve içerik dönüşümlerini zorunlu kılar. Her guardrail, istek yüklerini (`preCall`) ve yukarı akış yanıtlarını (`postCall`) inceleyebilir (ve isteğe bağlı olarak reddedebilir, dönüştürebilir veya açıklama ekleyebilir).

Sistem **açıkta başarısız olur**: bir guardrail yürütülürken bir hata fırlatırsa, kayıt defteri hatayı kaydeder ve isteği başarısız kılmak yerine bir sonraki guardrail ile devam eder. Engelleme açık bir karardır (`block: true`), asla bir kaza değildir.

## Yerleşik Koruma Mekanizmaları

Kayıt defteri, içe aktarma sırasında öncelik sırasına göre altı koruma mekanizmasını otomatik olarak yükler
(bkz. `registry.ts` → `registerDefaultGuardrails()`):

| Öncelik | Ad                  | Aşama(lar)     | Dosya                 |
| ------- | ------------------- | -------------- | --------------------- |
| `5`     | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`     | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`     | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`    | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`    | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`    | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Daha düşük öncelik numaraları **önce** çalışır.

### Görüntü Köprüsü (`visionBridge.ts`) — Modalite Köprüsü PR-1

**Görüntü desteklemeyen modellere** yönelik, görüntü içeren istekleri yakalar ve
isteğin tamamını görüntü destekli bir modele yeniden yönlendirir ya da üst
servis çağrısından önce görüntü parçalarını, yapılandırılabilir bir görüntü
modelinin ürettiği metin açıklamalarıyla değiştirir. Bu, yalnızca metin
destekleyen sağlayıcıların çok modlu yükleri şeffaf biçimde işlemesine olanak
tanır.

Akış:

1. Hedef model zaten görüntü destekliyorsa atla (`isVisionBridgeForcedModel`
   zorunlu köprü listesindeyse atlama).
2. Görüntü parçalarını `extractImageParts(messages)` aracılığıyla ayıkla
   (`visionBridgeHelpers.ts`); bu işlev, birleşik uyumluluk filtresiyle
   paylaşılan tek doğruluk kaynağı olan `open-sse/utils/mediaParts.ts`
   içindeki **birleşik medya algılayıcısı** `detectMediaParts()` işlevine
   devreder. Ayıklama, `replaceImageParts` işlevinin yeniden ekleyebileceği
   şekillerdeki üst düzey parçalarla sınırlandırılmıştır (ayıklama↔değiştirme
   sözleşmesi): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`,
   Anthropic URL `source.type:"url"` ve Responses API `input_image`. İç içe
   eşleşmeler ve yalnızca gösterge içeren şekiller birleşik filtreye yöneliktir
   ve hiçbir zaman ayıklanmaz. Hiçbiri bulunamazsa atla.
3. Çalışma zamanı yapılandırmasını `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`) aracılığıyla çözümle:
   yeni `modalityBridge*` ayar anahtarları önceliklidir; eski `visionBridge*`
   anahtarları **tek döngülük yedek seçenek** (geri alma penceresi) olarak
   kalır. Köprü devre dışıysa herhangi bir medya taraması yapılmadan önce
   atla.
4. Mod seçici (`modalityBridgeVisionMode`, aşağıdaki tabloya bakın), yeniden
   yönlendirme ile açıklama arasında karar verir. Yeniden yönlendirme, yalnızca
   `model` değiştirilmiş şekilde `modifiedPayload` ve ayrıca
   `{ rerouted, fromModel, toModel, imagesKept }` meta verisini döndürür.
5. Açıklama yolu: görüntü sayısını `maxImages` ile sınırla, göreve duyarlı
   istemi oluştur, açıklama önbelleğine başvur, görüntü modelini **paralel**
   olarak (`Promise.allSettled`) çağır ve görüntülerin yerine
   `[Image N]: <description>` metin parçalarını ekle. Başarısız bir açıklama
   `null` sonucunu verir ve özgün görüntü parçası **korunur** (#4012) — ancak
   tüm açıklamaların başarısız olduğu birleşik açıklama yolunda, görüntü
   desteklemediği doğrulanmış bir üst servise bunun yerine
   `(unavailable — no vision-capable provider connected)` yer tutucusu
   gönderilir (#8430).
6. `modifiedPayload` ve meta veriyi (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`) döndür.

#### Mod seçici (`modalityBridgeVisionMode`)

| Mod        | Varsayılan | Davranış                                                                                                                                                                                                                                                                                                                                                 |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔          | Eski sezgisel yöntem değiştirilmeden kullanılır (#6640/#7204): birleşik olmayan/`auto/` modeller, özgün model zaten kullanılabilir kimlik bilgilerine sahip değilse en iyi görüntü modeline yeniden yönlendirilir (sahipse açıklama kullanılır); birleşik hedefler her zaman açıklama kullanır.                                                          |
| `describe` |            | Her zaman açıkla — yeniden yönlendirme bloğu tamamen atlanır; her zaman kullanıcının seçtiği model yanıt verir.                                                                                                                                                                                                                                          |
| `reroute`  |            | Yeniden yönlendirmeyi zorunlu kıl: kimlik bilgilerine sahip modeli koruma denetimi atlanır. Yeniden yönlendirme **hedefine** yönelik kimlik bilgisi denetimi yine uygulanır — kullanılabilir bir görüntü hedefi bulunmadığında istek açıklama yoluna geçer; böylece ham görüntüler yalnızca metin destekleyen bir arka uca hiçbir zaman ulaşmaz (#8430). |

Zorunlu modlar, otomatik sezgisel yöntem çalışmadan **önce** kısa devre yapar;
`auto` davranışı, PR-1 öncesi koruma mekanizmasıyla bayt düzeyinde aynıdır.

#### API anahtarı kapsamı (`visionBridgeKeyScope.ts`)

Çağıranın API anahtarı `allowedConnections`, kota havuzları
(`allowedQuotas`) veya modeller (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`) üzerinde
kısıtlamalar getiriyorsa köprü, yeniden yönlendirme ve açıklama modellerini
yalnızca anahtarın kullanabileceği modeller ve bağlantılar arasından seçer.
Ardından açıklama çağrısı her zaman `x-omniroute-self-loop-key-id` başlığıyla
OmniRoute öz döngüsü üzerinden gerçekleştirilir; böylece çağrıyı alan sohbet
isteği, söz konusu anahtarın bağlantı ve model politikasını yeniden uygular.
`enforceApiKeyPolicy()`, bu başlığı yalnızca öz döngü bearer değeriyle birlikte
kabul eder; dolayısıyla başlık yalnızca erişimi daraltabilir ve çözümlenemeyen
bir kimlik reddedilir.

Anahtar için hiçbir görüntü modeline izin verilmiyorsa açıklama yolu devreden
çıkar ve istek değiştirilmeden geçirilir; bu, devre dışı bırakılmış bir koruma
mekanizmasıyla aynı açık kalma davranışıdır (meta
`{ skipped: true, reason: "no_permitted_vision_model" }`). Anahtarı olmayan
istekler ve bu kısıtlamalara sahip olmayan anahtarlar tam olarak önceki gibi
davranır.

#### Göreve duyarlı açıklama istemi (`modalityBridgeVisionTaskAware`)

Varsayılan **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`), açıklamayı kullanıcının gerçekte sorduğu şeye yönlendirmek (codex-vision-proxy kalıbı) ve görsel modelinden görünür metni yazıya dökmesini istemek için **son kullanıcı mesajının** metnini (500 karakterle sınırlandırılmış olarak) temel açıklama istemine ekler. Bayrak kapalıysa veya kullanıcı metni yoksa temel istem değiştirilmeden kullanılır.

Açıklama öz yinelemesinin kendi OpenAI uyumlu isteği (`visionBridgeHelpers.ts` içindeki `callVisionModelSingle()`), her zaman `image_url.detail: "high"` talep eder — koşulsuz olarak, her çağıran/sağlayıcı için ve herhangi bir istemci sinyaline bağlı olmadan. Düşük ayrıntılı örnekleme, tam olarak bu istemin talep ettiği metin transkripsiyonu görevi için OCR doğruluğunu düşürdüğünden, açıklama çağrısının kendisi, özgün gelen isteğin kullandığı ayrıntı düzeyinden bağımsız olarak her zaman yüksek ayrıntı talep eder. Bu yalnızca dahili açıklama isteği gövdesini etkiler; OmniRoute'un birincil istekte çağıranın kendi `image_url.detail` değerini nasıl ilettiğini değiştirmez — bu varsayılan ayrı olarak ve yalnızca algılanan OpenCode istemcileri için `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`) içinde uygulanır. Açıklama öz yinelemesinin Anthropic kablo biçimi dalında `detail` alanı yoktur ve iki varsayılandan da etkilenmez.

#### Açıklama çıktısı sınırı (`modalityBridgeVisionMaxChars`)

| Anahtar                        | Varsayılan | Aralık             |
| ------------------------------ | ---------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`        | `0` veya 100–50000 |

`0` (varsayılan), **sınır yok** anlamına gelir — `callVisionModel()` tarafından döndürülen açıklama değiştirilmeden iletilerek mevcut davranış korunur. 100–50000 aralığındaki herhangi bir değer, açıklama tekrar `[Image N]: <description>` biçiminde eklenmeden önce onu bir `…` son ekiyle kısaltır (`src/lib/guardrails/visionBridge.ts` içindeki `VisionBridgeGuardrail.preCall()`). Aşağı akış modelinin transkripsiyonun tamamına ihtiyaç duyduğu, ayrıntı yoğunluklu OCR görevleri için bu değeri yükseltin; fazla konuşkan görsel modellerinde token kullanımını sınırlamak için düşürün. Kontrol paneli alanı, Görsel sekmesinin Gelişmiş panelinde bulunur (`ModalityBridgeVisionTab.tsx` içindeki `modality-bridge-max-chars`) ve açıkça belirtilen `0` değerine dokunmadan 1 ile 99 arasındaki tüm değerleri alt sınır olan 100'e yükseltir — `0`, yalnızca "ayarlanmamış" varsayılanı değil, kendi başına geçerli bir Zod değeridir (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`).

#### Açıklama önbelleği (`modalityBridge/bridgeCache.ts`)

Açıklama çıktıları için süreç genelinde paylaşılan, bellek içi LRU + TTL önbelleği. Anahtar = uzunluk önekli çerçeveleme (alan sınırı çakışması olmadan) kullanan `sha256(imageRef + composedPrompt + configuredBridgeModel)`. Model bileşeni, gerçekten yanıt veren model değil, **yapılandırılmış** köprü modelidir — `callVisionModel` dahili olarak geri dönüş yapabilir ve her denemeye göre anahtarlama önbelleği parçalar. Başarısız açıklamalar hiçbir zaman önbelleğe alınmaz. Ayarlar:

| Anahtar                         | Varsayılan | Aralık  |
| ------------------------------- | ---------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`     | —       |
| `modalityBridgeCacheTtlMinutes` | `60`       | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`      | 10–5000 |

#### Uzak görsel normalizasyonu (öz yineleme açıklaması/base64 getirme)

Köprü bir **uzak** görseli kendisi getirdiğinde — Anthropic açıklama öz çağrısı ve claude kablo biçimi base64 dönüşümü (`ensureBase64ImagesForClaudeWire`), her ikisi de `visionBridgeHelpers.ts` içindeki `fetchRemoteImageAsDataUri()` üzerinden — ortaya çıkan veri URI'si, görsel modeli isteğine gömülmeden önce `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) üzerinden geçirilir. Büyük boyutlu görsellerin **2048px uzun kenara** ölçeği düşürülür (OpenAI/Anthropic'in sunucu tarafında zaten uyguladığı yeniden boyutlandırma sınırıyla eşleşir); bu, görsel modelinin gördüğünü değiştirmeden yükleme baytlarını/gecikmesini azaltır. Yeniden boyutlandırma, dinamik içe aktarma yoluyla yüklenen `sharp` kullanır: yerel ikili dosyasının yüklenemediği bir platformda `normalizeDataUri()` **hiçbir zaman hata fırlatmaz** — özgün baytları doğrudan geçirerek geri dönüş yapar; böylece açıklama/base64 dönüşümü yolu her zaman çalışmaya devam eder. Görsel olmayan baytlar (kodu çözülebilir bir görsel döndürmeyen bir getirme işlemi) da değiştirilmeden geçirilir. Bu normalizasyon, köprünün kendi öz çağrısı için getirdiği görsellerle sınırlıdır — yalnızca açıkça etkinleştirildiğinde değişiklik yapma ilkesiyle (Kesin Kural #20) tutarlı olarak çağıranın ham doğrudan geçiş yüküne hiçbir zaman uygulanmaz.

#### Ayarlar şeması + geçiş

Yeni `modalityBridge*` anahtarları, `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`) içinde Zod ile doğrulanır: `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` üçlüsü ve Ses Köprüsü tarafından kullanılan `modalityBridgeAudio*` grubu. `141_modality_bridge_settings.sql` geçişi, mevcut eski `visionBridge*` değerlerini eşleşen yeni anahtarlara kopyalar (idempotenttir, operatör tarafından ayarlanmış bir `modalityBridge*` değerinin hiçbir zaman üzerine yazmaz); eski anahtarlar bir sürüm döngüsü boyunca okuma geri dönüşü olarak kabul edilmeye devam eder.

#### Şeffaflık üstbilgisi + istatistikler

Açıklamayla dönüştürülmüş yanıtlar, `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` üstbilgisini taşır (`modalityBridge/bridgeStats.ts` içindeki `buildModalityBridgeHeader()` tarafından oluşturulur, `src/sse/handlers/chatHelpers.ts` içindeki `withModalityBridgeHeader()` tarafından eklenir). Yeniden yönlendirilen istekler **hiçbir** üstbilgi almaz — yük değiştirilmemiştir ve model değişimi zaten yanıt gövdesinin `model` alanında görünür.

`GET /api/modality-bridge/stats` (`GET /api/settings` ile aynı seviyede yönetim kimlik doğrulaması), `vision`, `audio` ve `video` için bellek içi modalite bazlı sayaçları
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` döndürür. `averageLatencyMs`, payda olarak tüm denemeleri değil `latencySamples` değerini kullanır; zamanlama bilgisi olmayan bir işlem, sıfır milisaniyelik sahte bir örnek oluşturmaz. `bridged`, başarılı dönüşümler için geriye dönük uyumlu takma ad olarak kalır; başarısız denemeler bu değeri artırmaz.
Sayaçlar tasarım gereği süreç yeniden başlatıldığında sıfırlanır
(muhasebe değil, telemetri).

#### Pano yapılandırması

Özel pano sayfası
`/dashboard/settings/modality-bridge` adresindedir. URL üzerinden adreslenebilen `Vision`, `Audio`
ve `Video` sekmeleri, `tab` değerini değiştirirken sorgu parametrelerini korur.
Vision sekmesi; etkinleştirme, mod, model seçimi (otomatik varsayılan dâhil),
göreve duyarlı istem oluşturma, gelişmiş zaman aşımı/görüntü/açıklama uzunluğu/önbellek
sınırları, çalışma zamanı
sayaçları ve korumalı bir örnek istek sunar. Audio sekmesi de aktiftir: etkinleştirme,
Auto seçeneğine sahip yalnızca STT modellerini içeren bir model seçici, zaman aşımı/maksimum klip
sınırları, ses sayaçları ve bir `input_audio` örnek testi sunar. Video sekmesi işlevseldir:
FFmpeg/ffprobe çalışma zamanı durumunu bildirir — dört açık kullanıcı arayüzü durumundan biri
(`unknown`: yoklama devam ederken veya tamamlanamadığında, `restricted`: istemci tarafında
yoklamanın atlandığı geri döngü olmayan bir pano ana makinesinde, `unavailable`: yoklama yapılıp
eksik olduğu doğrulandıktan sonra ya da `available`: FFmpeg/ffprobe sürümleriyle birlikte) —
etkinleştirme/model/kare/video/zaman aşımı sınırlarını kalıcı olarak saklar, model seçiciyi
görüntü işleme yeteneğine sahip modellerle filtreler ve video sayaçlarını sunar.

AI ayarları altındaki eski Vision Bridge kartı, yeni sayfaya yönlendiren bir uyumluluk
bağlantısıdır; artık formun ikinci bir kopyasını barındırmaz. Media Providers da mevcut
Speech-to-Text deneme alanını kaldırmadan Image-to-Text ve Speech-to-Text iş akışlarını
karşılık gelen Modality Bridge sekmelerine bağlar.

**Kendi döngüsü için kabul atlaması:** Açıklama çağrısı OmniRoute'un kendi `/v1`
geri döngüsü üzerinden yönlendirildiğinde (standart olmayan sağlayıcı modeli), alt istek
`x-omniroute-admission-bypass: internal` gönderir ve çözümlenen geri döngü
kimlik bilgisiyle doğrulanır — yerel modda yerel `sk_omniroute` sentinel değeri veya
operatör tarafından yapılandırılmış `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` ortam değişkeni
anahtarı (#1350); böylece `REQUIRE_API_KEY=true` dağıtımları açıklama çağrısını çalıştırmaya
devam edebilir. Atlama yalnızca tam olarak bu kimlik bilgileri için kabul edilir; dolayısıyla
harici istemciler kabul denetimini atlamak üzere bu başlığı kullanamaz.

Eski varsayılanlar `src/shared/constants/visionBridgeDefaults.ts` içinde bulunur;
yeni mod/göreve duyarlı/önbellek varsayılanları ve ayar çözümleyicisi
`src/shared/constants/modalityBridgeDefaults.ts` içinde bulunur. Koruma mekanizması,
testlerin sahte `getSettings` ve `callVisionModel` uygulamaları enjekte edebilmesi için
bir `deps` kurucu seçeneği sunar.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Ses girdisini kabul ettiği bilinmeyen bir hedefe ulaşmadan önce ses içeren sohbet
isteklerini yakalar. Sohbet isteğini hiçbir zaman yeniden yönlendirmez: ses parçalarının
metne dökümü, mevcut OpenAI uyumlu multipart uç noktası üzerinden yapılır ve seçilen
sohbet modeli metin dökümleriyle devam eder.

Akış:

1. `supportsAudio` değerini `getResolvedModelCapabilities()` aracılığıyla çözümleyin.
   Öncelik sırasıyla açık sağlayıcı kayıt defteri meta verileri, statik model meta verileri
   ve ardından eşitlenmiş `modalities_input` kullanılır. `audio` içermeyen bildirilmiş bir
   girdi listesi `false` değerini verir; hiçbir yetenek kanıtı yoksa değer `null` olarak
   kalır. Hem `false` hem de `null`, ihtiyatlı köprüyü etkinleştirirken `true` bunu atlar.
2. `modalityBridgeAudio*` ayarlarını çözümleyin ve paylaşılan `detectMediaParts()`
   algılayıcısı aracılığıyla her mesajdan eklenip çıkarılabilir üst düzey ses parçalarını
   ayıklayın. Desteklenen aktarım biçimleri OpenAI `input_audio`, `audio_url` ve
   `source.media_type: "audio/*"` biçimleridir. İç içe ses, yönlendirme için algılanır
   ancak ekleme-çıkarma yolu tarafından kaldırılmaz. İş miktarı `modalityBridgeAudioMaxClips`
   ile sınırlandırılır; sonraki parçalar değiştirilmeden kalır.
3. Yapılandırılmış bir `provider/model` değerini kullanın veya `selectAudioBridgeModel()`
   işlevinin `AUDIO_TRANSCRIPTION_PROVIDERS` içinde kararlı katalog sırasıyla ilerleyip
   kullanılabilir etkin sağlayıcı kimlik bilgisine sahip ilk modeli seçmesine izin verin.
4. `callAudioTranscription()`, base64/data-URI sesini multipart bir `file` öğesine
   dönüştürür veya uzak bir `audio_url` öğesini DNS sabitlemeli ve 25 MB sınırına sahip,
   yalnızca genel erişime izin veren giden bağlantı koruması üzerinden indirir. Ardından
   dosyayı ve seçilen modeli, `resolveSelfLoopBearer()` ile kimliği doğrulanan yerel
   `/v1/audio/transcriptions` geri döngüsüne POST eder. Mevcut transkripsiyon rotası normal
   kimlik bilgisi aramasını, bekleme süresi/hız sınırı yönetimini ve sağlayıcıya
   yönlendirmeyi gerçekleştirir.
5. Başarılı çağrılar kendi parçalarını `[Audio N]: <transcript>` ile değiştirir. Çağrılar
   `Promise.allSettled` ile çalışır: tekil bir hata, özgün ses parçasını korur (#4012
   sözleşmesi). Tüm çağrılar başarısız olursa ve hedefin
   `supportsAudio === false` olduğu kanıtlanmışsa parçalar
   `[Audio N]: (unavailable — no STT provider connected)` olur (#8430 sözleşmesi).
   Bilinmeyen bir hedef (`null`) için tümünün başarısız olduğu sonuç değiştirilmeden kalır.
   Kullanılabilir STT kimlik bilgisine sahip olmayan ve yalnızca metin desteklediği kanıtlanmış
   bir hedef, ağ çağrısı yapılmadan aynı açık yer tutucuyu alır.

Başarılı transkripsiyonlar, süreç genelindeki Modality Bridge LRU/TTL önbelleğini kullanır.
Anahtar; ses referansını, kararlı `audio-transcription` işlem etiketini ve seçilen STT
modelini birleştirir; hatalar hiçbir zaman önbelleğe alınmaz. Ses denemeleri paylaşılan
`bridged`, `cacheHits`, `failures` ve `lastUsedAt` sayaçlarını günceller.
Dönüştürülen yanıtlar
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` taşır; değiştirilmemiş
istekler bir Audio Bridge segmenti almaz.

Çalışma zamanı ayarları DB desteklidir ve Zod ile doğrulanır:

| Anahtar                       | Varsayılan | Aralık                    |
| ----------------------------- | ---------- | ------------------------- |
| `modalityBridgeAudioEnabled`  | `true`     | —                         |
| `modalityBridgeAudioModel`    | `""`       | Otomatik veya STT kimliği |
| `modalityBridgeAudioTimeout`  | `60000`    | 1000–300000               |
| `modalityBridgeAudioMaxClips` | `3`        | 1–10                      |

Paylaşılan önbellek, `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` ve `modalityBridgeCacheMaxEntries` tarafından
denetlenmeye devam eder.

### Video Köprüsü (`videoBridge.ts`, `videoBridgePipeline.ts`)

Bilinen yerel video desteğine sahip olmayan bir hedef çağrılmadan önce Chat
Completions `messages` ve Responses API `input` içindeki üst düzey video
parçalarını yakalar. Desteklenen biçimler `input_video`, `video_url`,
`video_source`, HTTPS URL'leri ve `data:video/*;base64,...` veri URI'leridir.
Metin içindeki düz dosya adları video olarak değerlendirilmez.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`), istek dolaşımını,
yetenek/politika kontrolünü, istek başına toplamayı ve yanıt yükünü yönetir.
Video başına çalışma — edinme, tam sonuç önbelleği, bir kare dizisini açıklama
(çağıran tarafından bildirilen herhangi bir ses transkriptini birleştirir) ve
deneme başına metrikler/iptal/temizleme — `videoBridgePipeline.ts` içindeki
`processVideoPart` arkasında gizlenmiştir ve `preCall` döngüsü içinde her video
parçası için bir kez çağrılır. Bu modül ayrıca açık port sınırları olan
`VideoMediaBrokerPort` (baytları edinme ve örneklenmiş kareleri çıkarma),
`VideoAudioTranscriptionPort` (çağıran tarafından bildirilen bir ses
transkriptini örneklenmiş altyazılarla birleştirme) ve `VideoDrilldownPort`
(kare ayrıntılandırma kalıcılığı sınırı; henüz `processVideoPart` içine
bağlanmamıştır — günümüzde ayrıntılandırma girdilerini yalnızca ayrı
`/api/modality-bridge/video/drilldown` rotası yazar) tanımlar.

Genel `/v1` istek yolu hiçbir zaman bir alt süreci içe aktarmaz veya çağırmaz.
Uzak videolar 50 MiB sınırı altında indirilir; satır içi base64 videolar,
model/mesajlar/çerçeveleme zarfının 50 MiB'lik genel JSON istek kabul sınırı
içinde kalabilmesi için video başına ihtiyatlı bir 36 MiB kodu çözülmüş boyut
sınırına sahiptir. Satır içi uzunluk ve kodu çözülmüş boyut tahminleri, bellek
ayrılmadan önce kontrol edilir. İlk uzak URL'de ve her yönlendirmede HTTPS
zorunludur ve DNS sabitlemeli mevcut yalnızca genel kullanıma açık giden bağlantı
koruması kullanılır. Baytlar daha sonra tam olarak dahili
`POST /api/modality-bridge/video/extract` aracı sınırından geçer. Bu rota hem
`LOCAL_ONLY` hem de `SPAWN_CAPABLE` niteliğindedir; yalnızca süreç başına kimliği
doğrulanmış, güvenilir geri döngü isteğini kabul eder ve hiçbir zaman URL, dosya
sistemi yolu, yürütülebilir dosya veya bağımsız değişken listesi kabul etmez.
API gövde boyutu işlem hattı ve işleyicinin artımlı gövde okuyucusu, 50 MiB'lik
araç girdisi sınırını birbirinden bağımsız olarak uygular. Sınırlı kuyruğu aynı
anda bir çıkarma işlemi çalıştırır, bekleyen dört işe izin verir ve bekleyen
girdiyi 100 MiB ile sınırlar.

Araç içinde `ffprobe`, özel bir yerel dosyayı okur; sabit biçim izin listesi,
oynatma listesi ve bildirim biçimlerini hariç tutar. İzin verilen MOV ailesi
kapsayıcılarında harici MOV veri referansları varsayılan olarak devre dışı kalır
ve sabit komut bunları etkinleştirmez. Hem `ffprobe` hem de `ffmpeg`, yalnızca
`file` protokolüne izin veren listeyi, tek iş parçacığını, sabit bağımsız değişken
dizilerini ve kabuksuz çalıştırmayı kullanır; yürütülebilir dosyalar `PATH`
üzerinden çözümlenir. Ekli resim kapak akışları oynatılabilir adaylar değildir.
Tüm oynatılabilir akışlar sınırları karşılamalıdır ve deterministik en düşük
indeksli geri dönüşten önce açıkça belirtilmiş varsayılan akış tercih edilir.
Videolar 600 saniye, boyut başına 8.192 piksel ve 33.554.432 kaynak piksel ile
sınırlıdır. FFmpeg, orta noktalardan 1–16 JPEG karesi örnekler, daha küçük
girdileri büyütmeden uzun kenarı en fazla 1.024 piksele küçültür ve hiçbir zaman
URL almaz. Örnekleme varsayılan olarak `uniform` değerindedir. İsteğe bağlı
`scene_aware` ve deneysel `segment_aware` politikaları, önceden doğrulanmış
yerel akış üzerinde ek bir sabit FFmpeg geçişi gerçekleştirir, sınırlı
`showinfo` sahne zaman damgalarını seçer ve algılayıcı hatası, zaman aşımı,
hatalı biçimlendirilmiş çıktı veya boş aday kümesi durumunda deterministik
olarak aynı tekdüzen orta noktalara geri döner. Segment duyarlı mod, orta nokta
örneklerini doğrulanmış sahne aralıklarına orantılı biçimde dağıtır; segment
duyarlı kanıtlar ve geri dönüş davranışı aşağıda ayrıntılı olarak açıklanmıştır.
16 karelik kesin sınır, her politikada seçimden sonra uygulanır. Sahne duyarlı
bir isteğin yalnızca tek karelik bütçesi olduğunda, etkin tam video veya odak
penceresinin tekdüzen orta noktasını kullanır ve `policyEffective: uniform`
bildirir: seçilen tek bir sahne karesi, zaman çizelgesinin her iki ucunu da
koruyamaz. Çağıran isteğe bağlı olarak sonlu bir odak penceresi (`start`/`end`
saniye) sağlayabilir; sınırlar medya süresine göre kısıtlanır, ters çevrilmiş
veya sonlu olmayan pencereler reddedilir ve tüm örnekleme politikaları yalnızca
normalleştirilmiş aralık içinde gerçekleştirilir. Ortaya çıkan pencere,
örnekleme meta verilerine ve güvenilmeyen açıklama önekine dahil edilir; böylece
aşağı akış modelleri odaklanmış bir kesiti tam zaman çizelgesinden ayırt
edebilir.

Anlamsal altyazı odağı ayrı ve açık bir ayardır. Varsayılan `full` analiz modu,
mevcut kare istemini korur ve istek metnini hiçbir zaman altyazı modeline
iletmez. `focused` modunda köprü, aynı Chat veya Responses kapsayıcısından
yalnızca kullanıcı tarafından yazılmış, boş olmayan en son `text`/`input_text`
öğesini okur, bunu NFC'ye normalleştirir, kontrol karakterlerini ve boşlukları
daraltır ve 500 Unicode kod noktasıyla sınırlar. Boş bir sonuç, tam olarak
`full` istemine geri döner. Kullanılabilir bir ipucu, güvenilmeyen kullanıcı
bağlamına ayrılmış bir blokta JSON olarak serileştirilir ve yalnızca
gözlemlenebilir ayrıntıklara öncelik verebilir; medyada görülebilen veya
duyulabilen talimatların izlenmemesi yönündeki ayrı uyarıyı geçersiz kılamaz.
Metinsel odak hiçbir zaman `start`/`end` çıkarımında bulunmaz veya zamansal
örnekleyiciyi değiştirmez.

#### FU-07 yapısal segment kanıtı

`segment_aware`, önceden doğrulanmış yerel video akışı üzerinde sınırlı tek bir ön analiz geçişi kullanır. Sabit filtre zinciri önce genişliği en fazla 320 piksel olacak şekilde ölçekler, sahne değişikliklerini ve donmuş aralıkları tespit eder; ardından bulanıklık, ortalama luma ve uzamsal/zamansal bilgi için saniyede 1 kare örnekler. Geçiş; 600 yapısal örnek, tek bir FFmpeg/filtre iş parçacığı, aynı yalnızca `file` protokolü ve kapsayıcı izin listeleri, 1 MiB işlem çıktısı sınırı ve aracının paylaşılan iptal/son tarih süresi içinde en fazla 30 saniye ile sınırlıdır. İstekten hiçbir zaman komut, filtre, yol veya URL kabul etmez.

Yapısal değerler, anlamsal video anlayışı değil, deterministik örnekleme kanıtlarıdır. Özneler, eylemler, altyazılar, konuşma veya kullanıcı amacı hakkında çıkarım yapmazlar. Sahne ve donma sınırları segmentleri oluşturur; donma kapsamı, bulanıklık, pozlama, uzamsal ayrıntı ve zamansal değişim yalnızca mevcut 1–16 karelik bütçenin nasıl tahsis edileceğini etkiler. Tamamen donmuş bir segment en fazla bir kareyle sınırlandırılırken donmamış segmentler kalan bütçe için rekabet eder. Sınırların sayısı karelerin sayısını aştığında, hızlı erken kesmelerin sondaki uzun bir segmenti gizleyememesi için zaman çizelgesi genelindeki tekdüze kapsam korunur. Bir donma sınırının 1 saniyelik analiz çözünürlüğü içinde kalan sahne sınırları birleştirilir.

Eksik filtreler, hatalı biçimlendirilmiş/boş kanıtlar, bir algılayıcı hatası veya sınırlı ön analiz zaman aşımı durumunda sistem, tam olarak tekdüze orta nokta politikasına açık biçimde geri döner. Çağıran tarafın iptali veya aracının son tarihi açık biçimde geri dönmez: devam eden alt işlemi sonlandırır, daha sonraki kare çıkarma işlemlerini engeller ve özel geçici ağaç `finally` içinde kaldırılır.

`scripts/perf/video-bridge-fu07-eval.ts`; tekilleştirme sonrası altyazı çağrısı tasarrufları, yoğun hareket bütçesi tahsisi, bulanıklık/pozlama/SI-TI kanıtı, uzun kuyruklu hızlı kesmeler ve kademeli kararma kaynaklı yanlış pozitifler için deterministik gerçek FFmpeg test düzenekleri oluşturur. Ön analiz duvar saati süresini ve `/usr/bin/time` kullanılabildiğinde alt işlem CPU kullanımını ve en yüksek RSS değerini kaydeder. Kalite kontrolleri yalnızca yapısal doğrulama ölçütleridir. Bu test düzeneğinin yetkilendirilmiş bir uç noktası veya dondurulmuş bir değerlendiricisi olmadığından, gerçek altyazı modeli kalitesi `HOLD` olarak kalır. `--caption-cost-per-call-usd` açıkça pozitif bir çağrı başına maliyet tahmini sağlamadığı sürece parasal tasarruflar da `HOLD` olarak kalır; betik bu sonuçlardan hiçbirini uydurmaz.

Her kare 4 MiB ile, tüm ham kareler birlikte 23 MiB ile ve serileştirilmiş aracı yanıtı 32 MiB ile sınırlıdır. Özel bir geçici dizin `finally` içinde kaldırılır. OmniRoute, FFmpeg'i paketinde içermez ve özel bir yürütülebilir dosya yolu kabul etmez. Altyazı oluşturmadan önce köprü, ihtiyatlı bir görsel tekilleştirme geçişi uygular: her JPEG, 16×16 gri tonlamalı bir arabelleğe indirgenir ve yalnızca en son tutulan kareyle karşılaştırılır. Bir kareden fazla istenen altyazı bütçesi için çıkarma işlemi, bu bütçenin en fazla iki katı büyüklüğünde ve hiçbir zaman 16 kareyi aşmayan sınırlı bir aday havuzu sağlar. İstenen üst sınır yalnızca tekilleştirmeden sonra uygulanır; bütçe en az iki olduğunda son seyreltme sırasında seçilen ilk ve son adaylar korunur. Sürümlendirilmiş `grayscale-16x16-mean-cells-v2` politikası, ortalama luma farkı ile normalleştirilmiş farkı en az 0.05 olan küçük resim hücrelerinin oranından daha büyük olanı kullanır. Yinelenen öğe eşiği, çalışma zamanı ayarı olarak sunulmak yerine öngörülebilirlik amacıyla seçilen 0.04 sabitidir. Bu ikincil yüksek kontrastlı sinyal, yalnızca ortalamaya dayalı bir karşılaştırmanın gizleyebileceği küçük hareketleri ve görünür metin değişikliklerini korur. Karşılaştırıcı veya kod çözücü hataları açık biçimde devam eder ve kapsamı korur. Çıktı meta verileri; çıkarılan adayları, başarıyla kullanılan kareleri ve elenen görsel yinelenenleri ayrı ayrı gösterir.

Açıkça işaretlenmiş bir video bölümü, zaman damgalı bir kontak sayfası isteyebilir. Köprü, en fazla 4 sütunlu ve 16 kareli bir JPEG ızgarası oluşturur. Her 512 piksellik hücre, kaynak zaman damgasını yüksek kontrastlı bir alt banda işlerken aynı zaman damgaları aşağı akış ilişkilendirmesi ve denetim için metinsel meta verilerde kalır. Tam JPEG, 32 MiB ile sınırlı kalır. `sharp`, ızgaranın kodunu çözemez veya ızgarayı oluşturamazsa köprü ayrı JPEG karelerine geri döner; istemci iptali yine de sayfa işlemi boyunca yayılır.

Terfi kanıtı, sentetik birleştirme mikro karşılaştırmalı değerlendirmesinden bilinçli olarak ayrı tutulur. `scripts/perf/video-bridge-contact-sheet-eval.ts`, gerçek OpenAI uyumlu görüntü modelleri için şema sürümlü bir A/B test düzeneği tanımlar. Sağlayıcı tarafından bildirilen belirteçleri, uçtan uca duvar saati gecikmesini (sayfa oluşturma dâhil), model çağrısı sayısını ve bildirim dosyasında tanımlanan olgu korunumunu ölçer. Ham model yanıtları rapora yazılmaz; yalnızca SHA-256 özetleri ve eşleşen olgu kimlikleri tutulur. `--execute-real` aktarılmadığı ve `--model`, `OMNIROUTE_BASE_URL` ve `OMNIROUTE_API_KEY` yapılandırılmadığı sürece test düzeneği hiçbir ağ veya ücretli model çağrısı yapmaz. Bu açık gerçek çalıştırma olmadan, makine tarafından okunabilir kararı `HOLD` olarak kalır; sentetik veri yükü/çağrı sayısı ölçümleri tek başına terfi kanıtı değildir.

Çağıranlar, önceden hizalanmış metne sahip olduklarında desteklenen bir video bölümüne isteğe bağlı bir `transcript.cues` dizisi ekleyebilir. Her ipucu; `text`, incelenen süre içindeki sonlu bir `start`/`end` aralığı ve izin listesindeki bir `source` (`client`, `embedded` veya `audio-bridge`) içermelidir; `confidence` varsayılan olarak `1` değerini alır ve `0` ile `1` arasında kalmalıdır. Tam olarak yinelenen ipuçları birleştirilir. OmniRoute bu meta verilerden hiçbir zaman transkripsiyon başlatmaz: doğrulanmış ipuçları kaynak, güven ve aralık bilgileriyle açıklanan sonuca kopyalanır ve kare altyazılarının yanında güvenilmeyen gözlemler olarak işlenir. Geçersiz, aralık dışı veya kaynağı belirtilmemiş metinler altyazı akışına karıştırılmak yerine reddedilir. Her iki istek gövdesi transkript kanalı da kullanıcı tarafından sağlanan kaynak bilgisini, kullanıcı tarafından beyan edilen `embedded` veya `audio-bridge` etiketleri dâhil olmak üzere `client` olarak normalleştirir. Bu güvenilir etiketleri yalnızca sunucunun sahip olduğu bir bağdaştırıcı, yalnızca kodda kullanılabilen `trustedSource` bağımsız değişkeni aracılığıyla atayabilir; bir istek JSON alanı bu bağımsız değişkene ulaşamaz. Transkript metni, kaynağından bağımsız olarak güvenilmeyen, medyadan türetilmiş içerik olarak kalır ve hiçbir zaman yetkilendirmeyi belirlememelidir.

İleri düzey bir çağıran, aynı video için bir `audioTranscript` izi sağlayabilir;
bu, sunucu transkripsiyonunun kanıtı olarak değil, istemci tarafından sağlanan metin olarak değerlendirilir.
Birleştirme katmanı, görsel ve sesli gözlemleri tek bir son tarih ve iptal
sinyali altında çalıştırır, bunları ortak bir zaman çizelgesinde sıralar, tamamen
aynı olanları birleştirir ve yalnızca bir taraf başarılı olduğunda kısmi bir sonuç bildirir.
Geçersiz bir `audioTranscript`, videonun tamamının başarısız olmasına neden olmak
yerine bu kısmi sonuca indirgenir — görsel açıklama korunur ve ses dalı,
temizlenmiş bir hata kodu kaydeder. Dal bazındaki kullanılabilirlik, kısmi bayrağı
ve temizlenmiş hata kodları; açıklanan sonuçta, koruma metadatasında
(`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), sonuç önbelleği metadatasında ve köprü
birleştirme sayaçlarında korunur. Varsayılan Video Bridge yolu, konuşmayı metne
dönüştürme işlemini çağırmaz veya ikinci bir medya kopyası indirmez; bu açık iz
olmadığında yalnızca video olarak kalır.

**Transkript saklama (#12150 P1).** Bu, Video Bridge (kendisi isteğe bağlıdır)
bir transkript ipucu işlediğinde otomatik olarak uygulanır — ayrı bir saklama
bayrağı yoktur. Bir istek herhangi bir transkript ipucunu (çağıranın bildirdiği
bir `transcript` veya birleştirilmiş bir `audioTranscript`) işlediğinde, koruma
katmanı bunu `videoBridgeObserved` olarak işaretler ve video açıklamasının
karartılmış bir gölge kopyasını üretir — her ipucunun serbest metin gövdesinin
`[redacted-video-transcript]` ile değiştirildiği özdeş bir işleme; bu kopya,
dize birleştirilmeden önce yapılandırılmış ipucu alanının değiştirilmesiyle
oluşturulur (hiçbir zaman düzleştirilmiş metin ayrıştırılmaz; dolayısıyla
`[inaudible]`/`[music]` gibi `]` içeren gövdeler dahil olmak üzere kötü niyetli
veya sıradan hiçbir ipucu içeriği varlığını sürdüremez). Kalıcı çağrı günlüğü
istek gövdesi, video kaynaklı her metin bölümünü içerik eşitliğine göre
eşleştirilen bu karartılmış gölgeyle değiştirir; `fullText` bağlantı noktası,
tamamlanmış çağrı öncesi koruma yükünden yeniden okunur. Böylece sonraki zincir
korumaları (10/95 öncelikli PII ve kimlik bilgisi maskeleyicileri) açıklama
metnini yerinde yeniden yazdıktan ve sistem istemi/devir/bellek enjeksiyonu
mesaj dizisini yeniden şekillendirdikten sonra bile eşleşme başarılı olur.
Modele yukarı akışta gönderilen gövde değişmeden kalır. Gözlemlenen bir istek
ayrıca kalıcı Memory'yi doldurmaz (hem istekten hem de yanıttan türetilen çıkarma
atlanır); böylece modelin kendi yanıtı transkript metnini Memory'ye yansıtamaz.

**Ham video alanları (#12430).** Köprü etkinleştirildiğinde ve yerel video desteği bilinmediğinde veya bulunmadığında, tanımlanmış `transcript`/`audioTranscript` alanları, açıklama başarısızlığından veya bir `maxVideos` sınırından sonra bile `videoBridgeObserved` durumunu etkinleştirir. `null` ve boş dizeler hesaba katılır; eksik alanlar ve video dışı metadata hesaba katılmaz. Saklanan kopyalarda bu alanlar karartılır veya istek çıkarılır; önbellekler/Memory atlanır.

Bu geri dönüş yollarında geçerli çağıran ipuçları, standart dışı sağlayıcı
alanları yerine desteklenen `text`/`input_text` bölümlerine dönüşür. İstekle
sağlanan her iki iz de güvenilmeyen `client` gözlemleri olarak kalır ve videonun
açıklanmadığını ve zaman damgalarının medyayla karşılaştırılarak doğrulanmadığını
belirten açık bir uyarı içerir. Mevcut 256 ipucu/64 KiB toplam ve ipucu başına
bütçeler, iki iz genelinde birlikte uygulanır; zaman damgaları aracının 600
saniyelik üst sınırına ve sağlanan herhangi bir odak penceresine uymalıdır.
Geçersiz izler atılır, rastgele metin olarak iletilmez; birleşik bütçeleri
aşılmadığı sürece geçerli bir kardeş iz yine de kullanılabilir. Null/boş alanlar
metin eklemez. Bu geri dönüş, medya getirme veya transkripsiyon işlemi eklemez.
Transkript uzantısı alanları, geri dönüş video taşıyıcısından ve bunun
`video_url`/`source` nesnelerinden kaldırılır. OpenAI aktarım izin listesi katı
kalmaya devam eder; yerel desteği bilinmeyen video taşıyıcıları kullanılabilir
durumda kalır ve yalnızca metin desteklediği bilinen hedefler güvenli işaretçileri
korur. Yapılandırılmış karartma gölgeleri eklenen transkript metnini korurken,
çağırana ait özgün istek değişmeden kalır. Yerel desteğe sahip hedefler ve devre
dışı bırakılmış köprüler mevcut atlama davranışlarını korur.

Saklanan ek kopyalar aynı gözlemlenen istek sinyalini kullanır. Koruma öncesi ham
istemci isteği anlık görüntüsü, bellekte bekleyen istek ve erken reddedilen istek
günlüğü, video bölümlerindeki transkript alanlarını yapısal olarak değiştirir;
işlem hattı aşamaları ve bağlam devri tarafından sentezlenen dize istemleri,
kalıcı istek gövdesi hedefinde karartılır. Kalıcı `video_content_removed`
işaretçisi, `previous_response_id` devamının kasıtlı olarak atılan metni yeniden
oluşturması yerine güvenli biçimde başarısız olmasını sağlar. Gözlemlenen bir
istek, günlük kaydından önce bölüm başına karartma gölgesini kaybederse veya
birden fazla video gölgesinden yalnızca biri bile sonraki istek değişikliklerinden
sonra eşleşmezse, kısmen karartılmış bir transkripti saklamak yerine saklanan
istek gövdesinin tamamı çıkarılır.

Gözlemlenen bir istek için model yanıtı, yapılandırılmış bir ipucu sınırı
olmadan transkriptin herhangi bir bölümünü alıntılayabilir. Bu nedenle kalıcı
çağrı günlüğü `responseBody` alanı bir çıkarma işaretçisiyle değiştirilir;
ayrıntılı işlem hattı artefaktı (yukarı akış/istemci gövdelerini ve akış
parçalarını içerebilir) saklanmaz. Anlamsal, idempotency ve reasoning-replay
önbellekleri bu istek için okuma ve yazma işlemlerini atlar. Sağlayıcı isteği ve
istemcinin gördüğü yanıt değişmeden kalır. Ayrıntılı artefakt çıkarıldığında
erken keepalive baytları geçici arabellekten boşaltılır. Kiro'nun hatalı
EventStream uyarısı yalnızca yük baytı sayısını bildirir; hiçbir zaman yükün
içeriğini veya JSON ayrıştırıcısının ham hatasını bildirmez.
Bu, ilgisiz her sağlayıcı/eklenti tanılamasının denetlendiği anlamına gelmez;
saklanan hedeflere yönelik daha geniş tarama #11658 kapsamında izlenmektedir.

Dahili `/api/modality-bridge/video/drilldown` yaşam döngüsü, ayrı bir
geri döngü/belirteç kimlik doğrulamalı önbellek altyapısıdır. Her işlem ayrıca
kanonik, opak bir asıl kimliği gerektirir. Bir üretim çağırıcısı etkinleştirilmeden
önce, bu kimliği kimliği doğrulanmış kiracıdan türetmeli ve istemci tarafından
seçilmiş bir değeri asla iletmemelidir. Önbellek anahtarları bu asıl kimliği
kanonik oturum ve video referansı kimliklerine bağlar, yalnızca bunların SHA-256
ile türetilmiş anahtarlarını saklar ve hem okumaları hem de silme işlemlerini aynı
asılla sınırlar. Önbellek, girdi başına en fazla 16 türetilmiş JPEG karesi saklar,
on dakika sonra bunların süresini dolmuş sayar ve sınırlandırılmış `start`/`end`
okumalarını veya açık oturum silme işlemini destekler.

Her asıl, 16 girdi ve 64 MiB kanonik JPEG verisiyle sınırlıdır. Bu sınırlar,
64 girdilik/256 MiB'lık genel üst sınırdan bağımsızdır: asıl kota baskısı, genel
LRU tahliyesi değerlendirilmeden önce yalnızca o asılın en uzun süredir
kullanılmayan girdilerini tahliye eder. Süresi dolmuş girdiler, önbellek etkinliği
sırasında hem asıl hem de genel hesaplamadan temizlenirken iptal ve doğrulama
hataları kısmi bir değiştirme işlemini kaydetmez.

Önbellek; kanonik olmayan Base64'ü, fazla dolguyu, JPEG olmayan medyayı, hatalı
biçimlendirilmiş veya kesilmiş JPEG'leri ve sınırlandırılmış bir tam görüntü `sharp`
kod çözme işlemi sırasında uyarı üreten JPEG'leri reddeder. Kabul edilen her görüntüyü
kanonik JPEG olarak yeniden kodlar, çağırıcı alanlarına güvenmek yerine genişlik ve
yüksekliği kodu çözülmüş baytlardan türetir ve sondaki çok biçimli dosya baytlarını
saklamak yerine atar. Her iki kotaya da yalnızca sınırlandırılmış kanonik sıkıştırılmış
tampon yansıtılır. JSON aktarım sınırı, 32 MiB'lık kodu çözülmüş girdi üst sınırı için
Base64 ek yükünü içerir. Saklanan her türetme; doğrulanmış JPEG biçimini/çözünürlüğünü,
örnekleme politikasını, türetme sürümünü, oluşturulma zamanını, sunucu tarafından
hesaplanan içerik karmasını ve karmalanmış üst referansın yanı sıra güvenilir çağırıcının
üst içerik karmasını kaydeder. İptal, atomik önbellek kaydından önce eşzamansız kod
çözme/karma aşamaları arasında denetlenir.

Bu dilim henüz üretimdeki bir üreticiyi rotaya bağlamaz ve çoklu çözünürlük
varyantı seçimi sağlamaz. Bu nedenle şeffaf Video Bridge istek yolu herhangi bir
ek iş yüküne maruz kalmaz; kiracıya bağlı asıl türetme ve tam FU-08 çoklu çözünürlük
yaşam döngüsü ise tamamlanmış davranış olarak belgelenmek yerine açık takip işleri
olarak kalır.

Karelere, yapılandırılmış Video modeliyle sıralı olarak açıklama yazılır. Boş bir
Video geçersiz kılma ayarı, Vision ayarını devralır; her ikisi de boşsa Vision
otomatik yönlendiricisi, etkin ve görme yetenekli modeli seçer. Başarılı açıklamalar,
özgün parçayı sabit bir `[Video description:` önekiyle değiştirir; bu önek ayrıca
metni güvenilmeyen, medyadan türetilmiş bir gözlem olarak işaretler ve aşağı akış
modellerine medyada bulunan talimatları izlememelerini söyler. Kare açıklaması
önbellek anahtarları JPEG baytlarını, istemi, zaman damgasını ve etkin modeli
içerir; yalnızca başarılı açıklamalar önbelleğe alınır. Önbellek girdileri,
yedek model de dâhil olmak üzere gerçekten başarılı olan üretici modeli saklar;
farklı kareler farklı modeller tarafından üretildiğinde köprü `mixed` bildirir.
Bir önbellek isabeti, bu üretici kimliğini istenen yönlendirme planı olarak yeniden
etiketlemek yerine aynen kullanır. Tüm video sonucu önbelleği, çıktıyı değiştiren
her girdiye göre anahtarlanır — istem, etkin model, örnekleme politikası, kare
sayısı, anlamsal analiz modu, normalleştirilmiş odak ipucunun SHA-256 parmak izi,
odak penceresi, `transcript`, `audioTranscript` ve kişi sayfası bayrağı — böylece
bu boyutlardan herhangi birinin değiştirilmesi eski bir sonucun yeniden
kullanılmasına değil, önbellek ıskalamasına yol açar. Görsel tekilleştirme politikası
sürümü, eşiği ve sınırlandırılmış aday kare sayısı da sonuç önbelleği anahtarında
ve meta verilerinde açıkça belirtilir; dolayısıyla bir politika değişikliği eski
bir tüm video açıklamasını yeniden kullanamaz. Sonuç önbelleği v4 meta verileri
modu ve parmak izini saklar, ham kullanıcı görevini ise asla saklamaz. Koruma
meta verileri hem istenen hem de etkin analiz modlarını bildirir; kullanılabilir
kullanıcı metni olmadan istenen `focused` modu, etkin olarak `full` şeklinde
bildirilir.

Koruma katmanı, desteklenen her video parçasını çıkarır ancak
`modalityBridgeVideoMaxVideos` değerinden fazla videoyu açıklamaz.
`supportsVideo === false` olduğu kanıtlanan bir hedef için, başarısız ve sınırı
aşan videolar açık, güvenli metin işaretlerine dönüştürülür; böylece hiçbir ham
video kalmaz. Yetenek bilinmiyorsa bu parçalar video taşıyıcılarını korur; varsa
herhangi bir yedek transkript, yukarıdaki sınırlandırılmış metin dönüştürmesini
izler. `supportsVideo === true` olan hedefler köprüyü atlar.
İstemci isteği iptal sinyali; indirme, aracı kuyruğu, alt süreçler ve açıklama
çağrıları boyunca yayılır; iptaller videolar arasında işlemi durdurur ve hiçbir
zaman ham medyaya açık kalacak şekilde başarısız olmaz.

Çalışma zamanı ayarları DB destekli ve Zod ile doğrulanmıştır:

| Anahtar                             | Varsayılan  | Aralık / davranış                                                                                   |
| ----------------------------------- | ----------- | --------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | İsteğe bağlı çalışma zamanı, etkinleştirme gerekir                                                  |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` genel altyazıları korur; `focused` sınırlı, güvenilmeyen en son kullanıcı bağlamını kullanır |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge modelini devralır                                                                     |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` veya orantılı `segment_aware`; algılayıcı hatasında `uniform` kullanılır   |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                 |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                      |

120 saniyenin üzerindeki kalıcı eski Video zaman aşımı değerleri aracı
son tarihine sınırlandırılır; bu sınırın üzerindeki yeni ayar yazma işlemleri reddedilir.
`GET /api/modality-bridge/video/runtime`, kimlik doğrulama veya çalışma zamanı
yoklamasından önce güvenilir şekilde damgalanmış geri döngü yerelliğini, ardından yönetim
kimlik doğrulamasını gerektirir. Yalnızca `available`, temizlenmiş FFmpeg/ffprobe sürümleri ve çalışma
zamanı kullanılamadığında sabit bir neden döndürür. Dahili çıkarma uç noktası, herkese
açık bir yükleme API'si değildir: kuyruk doygunluğu `503` ile birlikte `Retry-After` döndürür, arayanın
bağlantıyı kesmesi `499`, sabit aracı son tarihi ise `504` döndürür. Dönüştürülen yanıtlar,
Vision veya Audio segmentlerini kaldırmadan merkezi `x-omniroute-modality-bridge`
başlığına `video->text;model=<visionModel>;parts=<videos>` ekler.

### PII Maskeleyici (`piiMasker.ts`)

**Her iki** aşamada da çalışır.

- **`preCall`** yükü klonlar; `system`, `messages`, `input` ve
  `prompt` alanlarını (düz metin öğeleri dahil) dolaşır ve `content`/`text` dize
  alanlarına (`@/shared/utils/inputSanitizer` içindeki) `processPII()` işlevini uygular.
  `PII_REDACTION_ENABLED=true` olduğunda, algılanan PII giden yükte gizlenir.
  Bu, yalnızca istem enjeksiyonu politikasını denetleyen `INPUT_SANITIZER_MODE`
  ayarından bağımsızdır. Gizleme kapalıyken çağrı, içeriği yeniden yazmadan algılama
  sayılarını kaydeder.
- **`postCall`** yanıtı derinlemesine klonlar, `sanitizePIIResponse()` ile birlikte
  Responses API biçimi maskeleyicisini (`maskResponsesOutput` —
  `output_text` ve `output[].content[].text` alanlarını kapsar) çalıştırır. Herhangi bir
  gizleme gerçekleşirse değiştirilmiş yanıt özgün yanıtın yerini alır.

Koruma kuralı hiçbir zaman engelleme yapmaz; yalnızca açıklama ekler
(`meta.detections`, `meta.redacted`) veya yeniden yazar.

#### Türe göre seçim, özel kalıplar ve algılama sayaçları

**Gösterge Paneli → Ayarlar → Güvenlik → PII maskeleme**, _neyin_ maskeleneceğini seçer.
Maskelemeyi etkinleştirmez: bunun için hâlâ `PII_REDACTION_ENABLED` (istek) ve
`PII_RESPONSE_SANITIZATION` (yanıt + SSE) kullanılır; ikisi de varsayılan olarak kapalıdır.

- **Türe göre seçim** — yerleşik kimlikler
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`) içinde listelenir. Ayarlanmamış olması, her
  türün seçili olduğu anlamına gelir (bu ayar eklenmeden önceki davranış). İstek motorunun
  `ssn_us` kalıbı `ssn` ile eşleşir. Şablonlar (Minimal, Standart, Finansal,
  Brezilya, ABD, Tam) yalnızca kullanıcı arayüzündeki onay kutularını doldurur.
- **Özel kalıplar** — en fazla 20 regex veya joker karakter kalıbı (`*` = en fazla 64
  boşluk olmayan karakter, `?` = bir karakter). Eşleşmeler `[CUSTOM_REDACTED]` olur.
  Her kalıp `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`) üzerinden geçer: en fazla 500 karakter, bayraklar
  `g i m s u` ile sınırlıdır, derlenebilmelidir, `safe-regex` denetiminden (yıkıcı
  geri izleme) geçmelidir ve boş bir dizeyle veya gizleme yer tutucusuyla eşleşmemelidir.
  Başarısız olan bir kalıp kaydedilirken ve test edilirken reddedilir; başarısız olan
  kayıtlı bir satır ise derlenmek yerine çalışma zamanında atlanır. Özel kalıplar yalnızca
  maskeleme açıkken çalışır.
- **Algılama sayaçları** — türe göre sayılar (eşleşen değerler hiçbir zaman tutulmaz),
  bellekte saklanır ve yeniden başlatma sırasında sıfırlanır
  (`src/lib/pii/piiDetectionStats.ts`). Yalnızca maskeleme açıkken artarlar.

Ayarlar `key_value` tablosunda (`pii_settings` ad alanı,
`src/lib/db/piiSettings.ts`) bulunur ve 1 sn'lik bir önbellek üzerinden okunur. API:

| Yöntem | Yol                      | Amaç                                                                                    |
| ------ | ------------------------ | --------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Bayrak durumu, `enabledTypes`, `customPatterns`, algılama sayaçları                     |
| `PUT`  | `/api/settings/pii`      | `enabledTypes` (`null` = tümü) ve/veya `customPatterns` değerlerini değiştirir          |
| `POST` | `/api/settings/pii/test` | Bir kalıbı en fazla 8 KB'lık bir örnekle deneme amaçlı çalıştırır; hiçbir şey saklanmaz |

Üçü de yönetim kimlik doğrulaması gerektirir ve gövdeyi Zod
(`src/shared/validation/schemas/piiSettings.ts`) ile doğrular.

### İstem Enjeksiyonu (`promptInjection.ts`)

Kullanıcı tarafından sağlanan içerikteki düşmanca yapıları algılar ve
yapılandırılmış politikayı uygular. Davranış, ortam değişkenleri ve oluşturucu
seçenekleri tarafından belirlenir:

| Ayar            | Ortam değişkeni                                                                                             | Varsayılan | Etki                                                                                                                                                                                                                          |
| --------------- | ----------------------------------------------------------------------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Etkin           | `INPUT_SANITIZER_ENABLED`                                                                                   | `true`     | `false` olduğunda koruma mekanizması kısa devre yapar.                                                                                                                                                                        |
| Mod             | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                             | `warn`     | Enjeksiyon politikası: `block`, `warn` veya `log`. (`redact` geriye dönük uyumluluk için kabul edilir ancak enjeksiyon metnini **kaldırmaz**; isteklerdeki PII yeniden yazımı `PII_REDACTION_ENABLED` tarafından denetlenir.) |
| Engelleme eşiği | `blockThreshold` seçeneği / `INPUT_SANITIZER_BLOCK_THRESHOLD` (`INJECTION_GUARD_BLOCK_THRESHOLD` diğer adı) | `high`     | Engelleme için gereken minimum önem derecesi. Varsayılan olarak orta önem derecesi yalnızca gözlemlenir.                                                                                                                      |

**Mod önceliği** (`getMode`): çağıranın `options.mode` değeri →
`INJECTION_GUARD_MODE` **DB özellik bayrağı geçersiz kılması** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` ortam değişkeni → `INPUT_SANITIZER_MODE` ortam değişkeni →
`warn`. Dolayısıyla paneldeki bir geçersiz kılma, ortam değişkenlerine göre önceliklidir; böylece Feature
Flags kullanıcı arayüzü, çalışan korumayı canlı olarak denetler (yeniden başlatma gerekmez). DB okuması güvenli biçimde
başarısız olur: bir hata oluşursa koruma, ortam değişkeni tabanlı davranışa geri döner ve herhangi bir
geçersiz kılma ayarlanmadığında davranış, yalnızca ortam değişkenleriyle yapılan çözümlemeyle aynıdır.

Algılama kaynakları:

1. `@/shared/utils/inputSanitizer` içindeki `sanitizeRequest()` (işlem hattının
   başka yerlerinde kullanılan paylaşılan algılayıcı kümesi).
2. Yerleşik `DEFAULT_GUARD_PATTERNS` (şu anda `system_override_inline` ve
   `markdown_system_block`; her ikisinin önem derecesi de `high`).
3. Oluşturucu seçenekleri aracılığıyla geçirilen isteğe bağlı `customPatterns` (dizeler, düzenli ifadeler
   veya `{ name, pattern, severity }` kayıtları).

`mode === "block"` olduğunda **ve** en az bir algılama önem derecesi
eşiğini karşıladığında `preCall`, `{ block: true, message: "Request rejected:
suspicious content detected" }` döndürür. `warn`/`log` modlarında koruma mekanizması günlük kaydı oluşturur ancak
çağrıya izin verir. Paylaşılan `evaluatePromptInjection()` yardımcısı da kayıt defteri
üzerinden geçmeden istemleri değerlendirmesi gereken çağıranlar için dışa aktarılır.

**Tarama sınırı (v3.8.20):** algılayıcı, birleştirilmiş istem metninin yalnızca **ilk 16 KB** bölümünü
inceler — `src/shared/utils/inputSanitizer.ts` içindeki
`MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bayt). Hem `detectInjection()` hem de
`evaluatePromptInjection()`, kalıp döngüsünü çalıştırmadan önce `slice(0, MAX_INJECTION_SCAN_BYTES)`
uygular. Enjeksiyon yönergeleri girdinin üst kısmına yakın bulunur; dolayısıyla bu,
algılamayı zayıflatmadan yüzlerce KB büyüklüğündeki yüklerde regex CPU/GC kullanımını sınırlar (bkz.
#3932, #4041).

### Kimlik Bilgisi Maskeleyici (`credentialMasker.ts`)

Varsayılan zincirde son sırada (öncelik `95`) olmak üzere **her iki** aşamada da çalışır. İyi bilinen
API anahtarı / gizli belirteç kalıplarını giden yükten (mesaj
içeriği, araç çağrısı bağımsız değişkenleri, araç sonuçları) **ve** sağlayıcı yanıtından çıkarır; böylece
bir isteme yapıştırılan (veya bir araç sonucu tarafından geri döndürülen) kimlik bilgileri,
yukarı akış sağlayıcısına veya istemciye geri sızdırılmaz.

- **Yalnızca açıkça etkinleştirilir**; PII çıkarma ile aynı kural geçerlidir (Sabit Kural #20 ile ilişkili):
  `settings.credentialRedactionEnabled === true` **veya**
  `CREDENTIAL_REDACTION_ENABLED=true` olmadığı sürece devre dışıdır. Kapalıyken koruma mekanizması hiçbir işlem yapmaz —
  hiçbir zaman engellemez veya yeniden yazmaz.
- `redactCredentials()`, tüm yük/yanıt ağacını dolaşır (`walkValue()`;
  prototip kirlenmesine karşı güvenli, `WeakSet` aracılığıyla döngülere karşı güvenli) ve eşleşmeleri
  `[REDACTED:<type>]` yer tutucusuyla değiştirerek yalnızca gerçekten
  değişen dalları klonlar.
- `CREDENTIAL_PATTERNS`; LLM sağlayıcı anahtarlarını (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS belirteçlerini (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), ödeme anahtarlarını (Stripe, Square), bulut
  anahtarlarını (AWS erişim anahtarı, Twilio, SendGrid, Mailgun), özel anahtarları / JWT'leri,
  kimlik bilgisi taşıyan bağlantı dizelerini (`mongodb://user:pass@...` vb.) ve
  genel bir `Authorization`/`x-api-key`/`api-key`/`apikey` üstbilgi-değer
  kalıbını kapsar. Üstbilgi biçimindeki anahtarlar (`authorization`, `x-api-key`, `api-key`,
  `apikey`), genel metin regex'i aracılığıyla değil, yapısal olarak (yalnızca değer;
  `Bearer `/`Basic ` gibi şema önekleri korunarak) çıkarılır.
- Koruma mekanizması hiçbir zaman engellemez; yalnızca yeniden yazar (`modifiedPayload` /
  `modifiedResponse`) ve açıklama bilgisi ekler (`meta.credentialsRedacted`, `meta.count`).

Regresyon koruması: `tests/unit/credential-masker-guardrail.test.ts`.

## Temel Sözleşme (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true, zinciri kısa devre yapar (short-circuit)
  message?: string; // engelleme durumunda gösterilir
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // isteği yeniden yazmak için preCall tarafından döndürülür
  modifiedResponse?: TValue; // yanıtı yeniden yazmak için postCall tarafından döndürülür
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Bir güvenlik koruması (guardrail), `void`, `{}` veya `{ block: false }` döndürerek "değişiklik yok" sinyali verir. Bir `modifiedPayload`/`modifiedResponse` döndürmek, sonraki güvenlik korumaları için zincir boyunca akan değerin yerini alır. `signal?: AbortSignal`, çağrıcı yaşam döngüsünü güvenlik korumalarına taşır. İstek iptali, kasıtlı bir hataya açık (fail-open) istisnadır: medya köprüleri, ham medyayı desteklemediği bilinen bir hedefe geri yüklemeden çalışmaları durdurur ve temizlik yapar.

## Kayıt Defteri (`registry.ts`)

Singleton `guardrailRegistry` şunları sunar:

- `register(guardrail)` — bir güvenlik koruması ekler (veya normalleştirilmiş ada göre değiştirir) ve artan `priority` değerine göre yeniden sıralar.
- `clear()` / `list()` — yönetimsel yardımcılar.
- `runPreCallHooks(payload, context)` — etkin güvenlik korumaları üzerinden yinelenir, yükü (`payload`) `modifiedPayload` aracılığıyla aktarır ve ilk `block: true` değerinde durur.
- `runPostCallHooks(response, context)` — yanıt tarafında aynı akış.
- `resetGuardrailsForTests({ registerDefaults })` — temiz test izolasyonu için durumu temizler ve isteğe bağlı olarak varsayılanları yeniden kaydeder.

Her iki çalıştırıcı da `results` alanının izleme için yararlı olan her güvenlik korumasına ait `blocked`, `skipped`, `modified`, `error` ve `meta` alanlarını içeren `GuardrailExecutionResult` kayıtlarından oluşan bir dizi olduğu `{ blocked, payload|response, results, guardrail?, message? }` nesnesini döndürür.

### İstek Başına Güvenlik Korumalarını Devre Dışı Bırakma

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })`, mevcut istek için atlanması gereken güvenlik koruması adlarının tekilleştirilmiş (de-duplicated) bir listesini toplar. Kaynaklar (tümü isteğe bağlı, tümü birleştirilir):

- `apiKeyInfo.disabledGuardrails`
- İstek gövdesi `disabledGuardrails` (en üst düzey)
- İstek gövdesi `metadata.disabledGuardrails`
- Header `x-omniroute-disabled-guardrails` (veya eski adıyla `x-disabled-guardrails`)

Değerler dizi veya virgülle ayrılmış bir dize olabilir; adlar küçük harfli kebab-case formatına normalleştirilir (`pii_masker` → `pii-masker`). Sonuç, `context.disabledGuardrails` aracılığıyla, eşleşen güvenlik korumalarını (`results` içinde `skipped: true`) atlayan kayıt defterine iletilir.

## Yürütme Sırası

`src/sse/handlers/chat.ts` ve `open-sse/handlers/chatCore.ts` üzerinden geçen her istek için:

1.  `resolveDisabledGuardrails(...)` API anahtarı, gövde ve başlıklardan atlama listesini oluşturur.
2.  `guardrailRegistry.runPreCallHooks(body, ctx)` koruyucuları artan öncelik sırasına göre çalıştırır:
    - Devre dışı bırakılan koruyucular `skipped` olarak kaydedilir.
    - Her koruyucunun `preCall`'u, `modifiedPayload` aracılığıyla yükü yeniden yazabilir.
    - İlk `block: true` zinciri kısa devre yapar ve işleyici bir koruyucu reddetme yanıtı döndürür.
3.  (Potansiyel olarak yeniden yazılmış) yük, birleşik yönlendirme ve yukarı akış dağıtımına akar.
4.  Yanıt birleştirildikten sonra, `guardrailRegistry.runPostCallHooks(...)` aynı zinciri yanıt üzerinde çalıştırır. Buradaki `block: true` yukarı akış yanıtını düşürür.

Hata fırlatan koruyucular `error: <message>` ile kaydedilir ve `logger.warn` aracılığıyla günlüğe yazılır, ancak zincir devam eder — tasarım gereği açık kalır.

## Yapılandırma

Yerleşik koruyucular tarafından okunan ortam değişkenleri:

| Değişken                              | Kullanan                  | Etki                                                                                                                 |
| :------------------------------------ | :------------------------ | :------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Algılamayı tamamen devre dışı bırakmak için `false` olarak ayarlayın.                                                |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Enjeksiyon politikası: `warn`, `block` veya `log`. Eski `redact` değeri enjeksiyon metnini yeniden yazmaz.           |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Enjeksiyon koruyucusu için mod; ayrıca ortam değişkenlerini **geçersiz kılan** bir DB özellik bayrağıdır (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | `MODE=block`'un reddettiği minimum ciddiyet: `high` (varsayılan), `medium` veya `low`.                               |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | `INPUT_SANITIZER_BLOCK_THRESHOLD` için eski takma ad.                                                                |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | `true` olduğunda, istek PII'si redakte edilir (enjeksiyon modundan bağımsız olarak).                                 |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Yanıt tarafı maskeleyici davranışını kontrol eder.                                                                   |

Modality Bridge koruyucuları, çalışma zamanı yapılandırmasını ortam değişkenlerinden değil, DB destekli ayarlar deposundan (`getSettings()`) okur. Vision'ın birincil anahtarları `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` ve `modalityBridgeCacheMaxEntries` şeklindedir. Eski `visionBridge*` anahtarları yalnızca belgelenmiş tek döngülü okuma geri dönüşü olarak kabul edilir; kontrol paneli yazımları birincil anahtarları kullanır. Varsayılanlar ve geri dönüş çözümleyici `src/shared/constants/modalityBridgeDefaults.ts` içinde bulunur, eski sabitler ise `src/shared/constants/visionBridgeDefaults.ts` içinde korunur.

Ses, `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`, `modalityBridgeAudioTimeout` ve `modalityBridgeAudioMaxClips` ile paylaşılan `modalityBridgeCache*` ayarlarını kullanır. Sesin eski anahtar geri dönüşü yoktur çünkü bu anahtarlar Modality Bridge şemasıyla birlikte tanıtılmıştır.

Video, `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`, `modalityBridgeVideoModel`, `modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`, `modalityBridgeVideoMaxVideos` ve `modalityBridgeVideoTimeout` ile paylaşılan `modalityBridgeCache*` ayarlarını kullanır. Varsayılan olarak devre dışıdır çünkü FFmpeg/ffprobe isteğe bağlı operasyonel bağımlılıklardır ve kare altyazılandırma gecikme ve model maliyeti ekler.

## Özel Güvenlik Kalkanları (Custom Guardrails)

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Adımlar:

1. `BaseGuardrail` sınıfından türeyen `src/lib/guardrails/myGuardrail.ts` dosyasını oluşturun.
2. `preCall` ve/or `postCall` metodlarını implement edin.
3. Ya içe aktarma (import) zamanında kaydedin (`registerDefaultGuardrails` içinden çağırarak) ya da
   çalışma zamanında (runtime) `guardrailRegistry.register(...)` metodunu çağırın — kayıt defteri (registry), aynı normalize edilmiş isme sahip
   önceki tüm güvenlik kalkanlarının yerini alır.
4. `tests/unit/` altında testler ekleyin (mevcut örnekler:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Test Etme

Bilinen bir durumdan başlamak için testler arasında `resetGuardrailsForTests()` kullanın.
Boş bir kayıt defteriyle başlamak ve yalnızca test edilen güvenlik kalkanlarını kaydetmek için
`{ registerDefaults: false }` parametresini geçirin. Vision Bridge bağımlılık enjeksiyonunu
(`deps.getSettings`, `deps.callVisionModel`) kabul eder; Audio Bridge ise ayarlar, yetenekler, STT model seçimi, kimlik bilgisi kontrolleri ve transkripsiyon için
eşdeğer dikişleri (seam) sunar. Bu sayede testler, veritabanı veya ağ erişimine gerek kalmadan her iki akışı da çalıştırabilir.

## Ayrıca Bakınız

- `src/lib/guardrails/` — implementasyon
- `src/shared/utils/inputSanitizer.ts` — prompt-injection ve PII maskeleme özelliklerini sağlayan
  ortak detektör
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge varsayılanları ve
  zorunlu köprü (forced-bridge) model listesi
- `src/shared/constants/modalityBridgeDefaults.ts` — ortak Vision/Audio çalışma zamanı (runtime) varsayılanları
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonal katman (circuit breaker, cooldowns)
- `docs/reference/ENVIRONMENT.md` — tam çevre değişkeni (env var) referansı

## Enjeksiyon Kalkanı Rota Kapsamı ve Kırmızı Takım (Red-Team) Testleri (Faz 8 · Blok D)

Enjeksiyon kalkanı (`createInjectionGuard` / `withInjectionGuard`), kullanıcı istemlerini (prompt) kabul eden tüm rotaları
kapsar. `INJECTION_GUARD_MODE` ayarına uyar (varsayılan `warn` = yalnızca loglar;
`block` = HTTP 400 `SECURITY_001` döndürür).

| Tür            | Rotalar                                                                                                                                              | Varsayılan mod |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Metin (mevcut) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn           |
| Üretken        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn           |
| Veri           | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn           |

Metin çıkarma (`extractMessageContents`), `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` alanlarını kapsar.

**Kırmızı takım (gece çalışması, `nightly-llm-security.yml`):** promptfoo, her rotanın `INJECTION_GUARD_MODE=block` altında OWASP-LLM derlemini (corpus) engellediğini doğrular; garak taramalar çalıştırır (gizli anahtar yoksa atlanır).
`moderations` tutarlılık için dahil edilmiştir — blok modundaki operatörler `resolveDisabledGuardrails`
aracılığıyla bunu muaf tutabilir.

Gece iş akışı (`.github/workflows/nightly-llm-security.yml`, cron + manuel
tetikleme) iki işe sahiptir:

- **`promptfoo-guard` (engelleme)** — `INJECTION_GUARD_MODE=block` ile
  `promptfoo eval -c promptfooconfig.yaml` komutunu çalıştırır. Her düşmanca senaryo (ör. "önceki tüm
  talimatları yoksay…", DAN tarzı jailbreak'ler), yanıtın `error.code === "SECURITY_001"` taşıdığını, yani kalkanın isteği gerçekten reddettiğini iddia eder.
- **`garak` (tavsiye niteliğinde)** — yerel bir OmniRoute örneğine (`http://localhost:20128/v1`) karşı
  garak `--probes promptinject,dan,leakreplay` komutunu çalıştırır. Sağlayıcı gizli anahtarına (`PROMPTFOO_PROVIDER_KEY`) bağlıdır; sorunsuz bir şekilde atlanır ve sonuna `|| true` eklenmiştir, böylece CI'ı (sürekli entegrasyon) başarısız kılmadan raporlama yapar.

Kalkan yardımcısının (`createInjectionGuard` / `withInjectionGuard`) kapsamı,
istem içeren her `/v1` rotasını kapsar; istem metni, `src/shared/utils/inputSanitizer.ts` içindeki
`extractMessageContents()` tarafından `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` alanlarından çekilir.
