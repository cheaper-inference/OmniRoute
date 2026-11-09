# Guardrails (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Doğruluk kaynağı:** `src/lib/guardrails/`
> **Son güncelleme:** 2026-10-17 — v3.8.52 ([Kapsam ve sınırlar](#coverage-and-limits) eklendi:
> hook'ların hangi rotalara ve yanıt yollarına ulaştığı, birleştirilmiş devre dışı bırakma başlıkları (#16412), zorunlu bir sınır olarak enjeksiyon
> engelleme modu (#16413) ve çağrı sonrasından önce yanıtı neyin gördüğü)

Guardrail'ler, OmniRoute ile yukarı akış sağlayıcıları arasındaki sınırda güvenlik, politika ve içerik dönüşümlerini zorunlu kılar. Her guardrail, istek yüklerini (`preCall`) ve yukarı akış yanıtlarını (`postCall`) inceleyebilir (ve isteğe bağlı olarak reddedebilir, dönüştürebilir veya açıklama ekleyebilir).

Sistem **fail-open**'dır: bir guardrail çalışırken hata fırlatırsa, kayıt defteri hatayı kaydeder ve isteği başarısız kılmak yerine bir sonraki guardrail ile devam eder. Engelleme açık bir karardır (`block: true`), asla bir kaza değildir. Tek istisna iptal edilen bir istektir: çağıranın `signal`'ı iptal edildiğinde, hata fırlatan bir guardrail atlanmak yerine hook çalıştırmasını reddeder.

Hook'lar her rotada veya her yanıtta **çalışmaz**. Bir guardrail'e güvenlik denetimi olarak güvenmeden önce
[Kapsam ve sınırlar](#coverage-and-limits) bölümünü okuyun.

## Dahili Korkuluklar

The registry auto-loads six guardrails in priority order on import (see `registry.ts` → `registerDefaultGuardrails()`):

| Öncelik | İsim                | Aşama(lar)     | Dosya                 |
| ------- | ------------------- | -------------- | --------------------- |
| `5`     | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`     | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`     | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`    | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`    | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`    | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Daha düşük öncelikli numaralar çalıştırılır** Birinci** .

### Vizyon Köprüsü (`visionBridge.ts`) — Modalite Köprüsü PR-1

GLM 5.3 temel modeli ve `glm-5.3-{low,high,max}` açık `supportsVision:false` registry/spec meta verilerine sahiptir. GLM 5.3 Flash çeşitleri yerel görüşlü modeller olarak kalır. Claude Kodunun `/v1/messages` rotası, paylaşılan `handleChat` ön çağrı korkuluk zincirine girer** önce** Claude'dan OpenAI'ye çeviri; iç içe `Read` araç-sonuç görüntülerinin, çevirinin bunları OpenAI `image_url` içeriğine (#17069) kaldırmasından önce tanımlanması veya işlenmesi gerekir.

Hedeflenen görüntü taşıyan istekleri keser** görüş dışı modeller** ve ya tüm isteği görsel özellikli bir modele yeniden yönlendirir ya da görüntü parçalarını, yukarı akış çağrısından önce yapılandırılabilir bir görsel model tarafından üretilen metin açıklamalarıyla değiştirir. Bu, salt metin sağlayıcılarının çok modlu yükleri şeffaf bir şekilde işlemesine olanak tanır.

Akış:

1. Hedef model zaten görmeyi destekliyorsa atlayın (zorunlu köprü listesinde görünmüyorsa `isVisionBridgeForcedModel`).
2. Görüntü parçalarını, yetki veren `extractImageParts(messages)` (`visionBridgeHelpers.ts`) aracılığıyla çıkarın.** birleşik medya dedektörü** `open-sse/utils/mediaParts.ts` — `detectMediaParts()` birleşik uyumluluk filtresiyle paylaşılan tek gerçek kaynaktır. Çıkarma, `replaceImageParts` geri ekleyebileceği şekillere (↔ sözleşmenin yerine geçen özet) izin verilenler listesine eklenmiştir: OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` ve Responses API `input_image`. Claude Code `tool_result.content` ve Yanıtlar aracı çıktılarının içine yerleştirilmiş eşleşen görüntüler de çıkarılır ve orijinal yollarında değiştirilir; yalnızca göstergeden oluşan şekiller birleşik filtre malzemesidir ve çıkarılmaz. Hiçbiri bulunamazsa atlayın.
3. Çalışma zamanı yapılandırmasını `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`) aracılığıyla çözün: yeni `modalityBridge*` ayar anahtarları kazanır; eski `visionBridge*` anahtarları kalır** tek döngülü geri dönüş** (geri alma penceresi). Köprü devre dışı bırakıldığında herhangi bir medya geçişinden önce atlayın.
4. Mod seçici (`modalityBridgeVisionMode`, aşağıdaki tabloya bakın) yeniden yönlendirmeye veya açıklamaya karar verir. Yeniden yönlendirme, `modifiedPayload` yalnızca `model` değiştirilmiş ve meta `{ rerouted, fromModel, toModel, imagesKept }` ile döndürür.
5. Yolu açıklayın: `maxImages` görüntüleri sınırlayın, göreve uygun istemi oluşturun, tanımlama önbelleğine başvurun, görüntü modelini çağırın** paralel olarak** (`Promise.allSettled`) ve `[Image N]: <description>` metin parçalarını yerlerine enjekte edin. Başarısız bir açıklama `null` sonucunu verir: ham görüntü unknown/vision-capable hedefleri (#4012) için korunur, ancak** onaylanmış salt metin doğrudan hedefi** veya sıfır görüş kombinasyonu, kısmi hatalar ve tanımlama çağrısı sınırının (#17069) ötesindeki görüntüler de dahil olmak üzere, tanımlanmamış her görüntü için açık bir `(unavailable — no vision-capable provider connected)` metin koçanı alır. Mevcut tamamen başarısız olan kombo, geri dönüşün yerinde kaldığını belirtir (#8430).
6. `modifiedPayload` + metasını döndürün (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Mod seçici (`modalityBridgeVisionMode`)

| Mod        | Varsayılan | Davranış                                                                                                                                                                                                                                                                                                                           |
| ---------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔          | Eski buluşsal yöntem, el değmemiş (#6640/#7204): birleşik olmayan/`auto/` modelleri, orijinal model zaten kullanılabilir kimlik bilgilerine sahip olmadığı sürece en iyi görüş modeline yeniden yönlendirilir (sonra açıklayın); Birleşik hedefler her zaman açıklanır.                                                            |
| `describe` |            | Her zaman — açıklayın, yeniden yönlendirme bloğu tamamen atlanır; kullanıcının seçtiği model her zaman cevap verir.                                                                                                                                                                                                                |
| `reroute`  |            | Yeniden yönlendirmeyi zorla: kimlik bilgilerini koruyan model koruması atlanır. Yeniden yönlendirme-** hedef** kimlik bilgisi koruması, kullanılabilir bir görüş hedefi olmadığında hala — uygular; köprü, ham görüntüleri salt metinden oluşan bir hedefi tanımlamak veya bu hedefe göndermek yerine açık bir hatayla bloke eder. |

Zorunlu modlar kısa devre** önce** otomatik buluşsal çalışmalar; `auto` davranışı pre-PR-1 korkuluğuyla bayt aynıdır.

#### API anahtarı kapsamı (`visionBridgeKeyScope.ts`)

Arayanın API anahtarı `allowedConnections`, kota havuzlarını (`allowedQuotas`) veya modelleri (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`) kısıtladığında, köprü yalnızca yeniden yönlendirmeyi seçer ve anahtarın kullanabileceği bağlantılarda anahtarın kullanabileceği modelleri tanımlar. Açıklama çağrısı daha sonra her zaman `x-omniroute-self-loop-key-id` başlığıyla OmniRoute kendi kendine döngüsünden geçer, böylece alıcı sohbet isteği o anahtarın bağlantı ve model politikasını yeniden zorlar. `enforceApiKeyPolicy()` bu başlığı yalnızca kendi kendine döngü taşıyıcısıyla birlikte kabul eder, böylece yalnızca erişimi daraltabilir ve çözümlenmeyen bir kimlik reddedilir.

Anahtar için herhangi bir görüntü modeline izin verilmiyorsa,** onaylanmış salt metin hedefi** görüntü baytlarını yetersiz bir yukarı akışa (#17069) iletmek yerine görüntü isteğini yerel olarak temiz bir HTTP 400 ile reddeder. Bilinmeyen veya yerel görüş yeteneğine sahip hedefler için açıklama yolu, önceki arızada açılma davranışını (meta `{ skipped: true, reason: "no_permitted_vision_model" }`) korur. Anahtarsız istekler ve bu kısıtlamaların olmadığı anahtarlar tam olarak eskisi gibi davranır.

#### Göreve duyarlı açıklama istemi (`modalityBridgeVisionTaskAware`)

Varsayılan** doğru** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) metnini ekler** son kullanıcı mesajı** (500 karaktere kısaltılmış) temel açıklama istemine, açıklamayı kullanıcının gerçekte sorduğu şeye (kodeks-görüntü-vekil modeli) yönlendirerek ve görüntü modelinden görünür metni yazıya geçirmesini ister. — işareti kapalıyken veya — kullanıcı metni yokken temel bilgi istemi değiştirilmeden kullanılır.

Tanımlama öz döngüsünün kendi OpenAI uyumlu isteği ( `visionBridgeHelpers.ts` `callVisionModelSingle()` ), herhangi bir istemci sinyaline bağlanmadan her caller/provider için her zaman koşulsuz olarak `image_url.detail: "high"` — talep eder. Düşük ayrıntılı örnekleme, tam olarak bu istemin istediği metin transkripsiyon görevi için OCR doğruluğunu azaltır; bu nedenle, açıklama çağrısının kendisi, orijinal gelen isteğin kullandığı ayrıntı düzeyine bakılmaksızın her zaman yüksek ayrıntı ister. Bu yalnızca dahili açıklama isteği gövdesini etkiler; OmniRoute arayanın kendi `image_url.detail` `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`) cinsinden varsayılanın ayrı olarak ve yalnızca algılanan OpenCode istemcileri için uygulandığı — birincil isteğinde nasıl ilettiğini değiştirmez. Tanımlanan kendi kendine döngünün Anthropic kablo formatı dalında `detail` alanı yoktur ve her iki varsayılandan da etkilenmez.

#### Çıkış sınırını (`modalityBridgeVisionMaxChars`) açıklayın

| Anahtar                        | Varsayılan | Menzil             |
| ------------------------------ | ---------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`        | `0` veya 100–50000 |

`0` (varsayılan) şu anlama gelir:** kapak yok** — `callVisionModel()` tarafından döndürülen açıklama, mevcut davranış korunarak değiştirilmeden geçirilir. 100–50000 aralığındaki herhangi bir değer, `[Image N]: <description>` ( `src/lib/guardrails/visionBridge.ts` `VisionBridgeGuardrail.preCall()` ) olarak geri eklenmeden önce açıklamayı bir `…` son ekiyle keser. Aşağı akış modelinin tam transkripsiyona ihtiyaç duyduğu, ayrıntı ağırlıklı OCR görevleri için bunu yükseltin; Konuşkan görüş modellerinde bunu sınırlı jeton kullanımına düşürün. Kontrol paneli alanı, Vision sekmesinin Gelişmiş panelinde bulunur ( `ModalityBridgeVisionTab.tsx` `modality-bridge-max-chars` ) ve 1 ile 99 arasındaki herhangi bir değeri 100. kata kadar sıkıştırır ve açık bir `0` dokunulmaz — `0` yalnızca "ayarlanmamış" varsayılan değil, kendi başına geçerli bir Zod değeridir (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`).

#### Önbelleği tanımlama (`modalityBridge/bridgeCache.ts`)

Süreç genelinde paylaşılan çıktıları tanımlamak için bellek içi LRU + TTL önbelleği. Uzunluk öneki çerçeveli anahtar = `sha256(imageRef + composedPrompt + configuredBridgeModel)` (alan sınırı çarpışması yok). Model bileşeni** yapılandırılmış** gerçekte — `callVisionModel` yanıtını veren model değil, köprü modeli dahili olarak geri düşebilir ve deneme başına anahtarlama önbelleği parçalayabilir. Başarısız açıklamalar hiçbir zaman önbelleğe alınmaz. Ayarlar:

| Anahtar                         | Varsayılan | Menzil  |
| ------------------------------- | ---------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`     | —       |
| `modalityBridgeCacheTtlMinutes` | `60`       | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`      | 10–5000 |

#### Uzaktan görüntü normalleştirme (kendi kendine döngülü describe/base64 getirme)

Köprü bir şey getirdiğinde** uzak** görüntünün kendisi — Anthropic, kendi kendine çağrıyı ve Claude-wire formatı base64 dönüşümünü (`ensureBase64ImagesForClaudeWire`) tanımlar; her ikisi de `visionBridgeHelpers.ts` — `fetchRemoteImageAsDataUri()` yoluyla, elde edilen URI verileri, vizyon modeli isteğine gömülmeden önce `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) içinden geçirilir. Büyük boyutlu görüntüler küçültülür** 2048 piksel uzun kenar** ( OpenAI/Anthropic yeniden boyutlandırma sınırıyla eşleşme zaten sunucu tarafında geçerlidir), bu da vizyon modelinin gördüklerini değiştirmeden bytes/latency yüklemesini keser. Yeniden boyutlandırma, dinamik içe aktarma yoluyla yüklenen `sharp` kullanır: yerel ikili dosyasının yüklenemediği bir platformda, `normalizeDataUri()`** asla atmaz** — orijinal baytların geçişine geri döner, böylece describe/base64-conversion yolu her zaman çalışmaya devam eder. Görüntü olmayan baytlar (kodu çözülebilir bir görüntü döndürmeyen bir getirme) da dokunulmadan iletilir. Bu normalleştirmenin kapsamı, köprünün kendi kendi kendine çağrısı için getirdiği görüntülerle sınırlıdır —, yalnızca isteğe bağlı mutasyon ilkesi (Zor Kural #20) ile tutarlı olarak hiçbir zaman arayanın ham geçiş yüküne uygulanmaz.

#### Ayarlar şeması + geçişi

Yeni `modalityBridge*` anahtarları `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`) cinsinden Zod tarafından doğrulanmıştır: `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` üçlüsü ve Audio Bridge tarafından kullanılan `modalityBridgeAudio*` grubu. Geçiş `141_modality_bridge_settings.sql` mevcut eski `visionBridge*` değerlerini eşleşen yeni anahtarlara kopyalar (aynı değerdedir, hiçbir zaman operatör tarafından ayarlanan `modalityBridge*` değerinin üzerine yazmaz); eski anahtarlar, bir yayın döngüsü boyunca okuma geri dönüşü olarak kabul edilmeye devam eder.

#### Şeffaflık başlığı + istatistikleri

Açıklama-dönüştürülmüş yanıtlar `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` taşır ( `modalityBridge/bridgeStats.ts` `buildModalityBridgeHeader()` tarafından oluşturulmuştur, `src/sse/handlers/chatHelpers.ts` `withModalityBridgeHeader()` tarafından damgalanmıştır). Yeniden yönlendirilen istekler** HAYIR** başlık — yüküne dokunulmamıştı ve model değişimi yanıt gövdesinin `model` alanında zaten görülebiliyordu.

`GET /api/modality-bridge/stats` (yönetim kimlik doğrulaması, `GET /api/settings` ile aynı katman) `vision`, `audio` ve `video` için her modaliteye özel `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` sayaçlarını döndürür. `averageLatencyMs`, payda olarak tüm denemeleri değil `latencySamples` kullanır; zamanlaması olmayan bir işlem sıfır milisaniyelik bir örnek üretmez. `bridged` başarılı dönüşümler için geriye dönük uyumlu takma ad olmaya devam ediyor; başarısız girişimler bunu artırmaz. Sayaçlar tasarım gereği süreç yeniden başlatıldığında sıfırlanır (telemetri, muhasebe değil).

#### Kontrol paneli yapılandırması

Özel kontrol paneli sayfası `/dashboard/settings/modality-bridge`. URL adreslenebilir `Vision`, `Audio` ve `Video` sekmeleri, `tab` değerini değiştirirken sorgu parametrelerini korur. Vision sekmesi, etkinleştirmeyi, modu, model seçimini (otomatik varsayılan dahil), göreve duyarlı istemi, gelişmiş timeout/image/description-length/cache sınırlarını, çalışma zamanı sayaçlarını ve korunan örnek isteğini gösterir. Ses sekmesi de yayında: etkinleştirmeyi, Otomatik özellikli yalnızca STT model seçiciyi, timeout/max-clip sınırlarını, ses sayaçlarını ve `input_audio` örnek testini ortaya çıkarıyor. Video sekmesi işlevseldir: FFmpeg/ffprobe çalışma zamanı durumunu rapor eder — dört açık UI durumundan biri (prob uçuştayken veya tamamlanamazken `unknown`, probun istemci tarafında atlandığı geridöngü olmayan bir kontrol paneli ana bilgisayarında `restricted`, bir kez problandığında ve eksik olduğu onaylandığında `unavailable` veya FFmpeg/ffprobe sürümleriyle `available` ) — enable/model/frame/video/timeout sınırlarını korur, model seçiciyi görüş özellikli modellere göre filtreler ve video sayaçlarını açığa çıkarır.

AI ayarları altındaki eski Vision Bridge kartı, yeni sayfaya yönelik bir uyumluluk bağlantısıdır; artık formun ikinci bir kopyasına sahip değildir. Medya Sağlayıcıları ayrıca mevcut Konuşmadan Metne oyun alanını kaldırmadan Görüntüden Metne ve Konuşmadan Metne iş akışlarını ilgili Modalite Köprüsü sekmelerine bağlar.

**Kendi kendine döngü kabul bypass'ı:** açıklama çağrısı OmniRoute kendi `/v1` kendi kendine döngüsü (standart dışı sağlayıcı modeli) üzerinden yönlendirdiğinde, alt istek `x-omniroute-admission-bypass: internal` gönderir ve yerel modda yerel `sk_omniroute` nöbetçisi çözümlenmiş öz döngü kimlik bilgisi — ile veya operatör tarafından yapılandırılmış `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env anahtarı (#1350) ile doğrulanır, böylece `REQUIRE_API_KEY=true` dağıtımları hala açıklama çağrısını çalıştırabilir. Baypas yalnızca bu kesin kimlik bilgileri için kabul edilir, dolayısıyla harici istemciler girişi atlamak için başlığı kullanamaz.

Eski varsayılanlar `src/shared/constants/visionBridgeDefaults.ts` bulunur; yeni mode/task-aware/cache varsayılanları ve ayar çözümleyicisi `src/shared/constants/modalityBridgeDefaults.ts` mevcuttur. Korkuluk, testlerin sahte `getSettings` ve `callVisionModel` uygulamalarını enjekte edebilmesi için bir `deps` yapıcı seçeneğini ortaya çıkarır.

### Ses Köprüsü (`audioBridge.ts`) — Modalite Köprüsü PR-3

Ses içeren sohbet isteklerini, ses girişini kabul ettiği bilinmeyen bir hedefe ulaşmadan önce durdurur. Sohbet isteğini hiçbir zaman yeniden yönlendirmez: Ses parçaları, mevcut OpenAI uyumlu çok parçalı uç nokta aracılığıyla kopyalanır ve seçilen sohbet modeli, metin transkriptleriyle devam eder.

Akış:

1. `supportsAudio` `getResolvedModelCapabilities()` aracılığıyla çözümleyin. Açık sağlayıcı kayıt defteri meta verileri kazanır, ardından statik model meta verileri kazanır ve ardından senkronize edilen `modalities_input`. `audio` olmadan bildirilmiş bir giriş listesi `false`; hiçbir yetenek kanıtı kalmadı `null`. Hem `false` hem de `null` muhafazakar köprüyü etkinleştirirken `true` onu atlar.
2. Paylaşılan `detectMediaParts()` algılayıcı aracılığıyla `modalityBridgeAudio*` ayarlarını çözümleyin ve her mesajdan eklenebilir üst düzey ses parçalarını çıkarın. Desteklenen tel şekilleri OpenAI `input_audio`, `audio_url` ve `source.media_type: "audio/*"`. Yönlendirme için iç içe ses algılanır ancak ekleme yolu tarafından kaldırılmaz. Çalışma `modalityBridgeAudioMaxClips` ile sınırlandırılmıştır; sonraki kısımlara dokunulmaz.
3. Yapılandırılmış bir `provider/model` kabul edin veya `selectAudioBridgeModel()` `AUDIO_TRANSCRIPTION_PROVIDERS` sabit katalog sırasıyla yürütmesine izin verin ve kullanılabilir bir etkin sağlayıcı kimlik bilgilerine sahip ilk modeli seçin.
4. `callAudioTranscription()` base64/data-URI sesini çok parçalı bir `file` dönüştürür veya DNS sabitlemesi ve 25 MB sınırı ile yalnızca genel giden giden koruma aracılığıyla uzak bir `audio_url` indirir. Daha sonra dosyayı ve seçilen modeli, `resolveSelfLoopBearer()` ile doğrulanan yerel `/v1/audio/transcriptions` kendi kendine döngüsüne POSTs. Mevcut transkripsiyon yolu normal kimlik bilgisi aramayı, cooldown/rate-limit işlemeyi ve sağlayıcı gönderimini gerçekleştirir.
5. Başarılı çağrılar, parçalarını `[Audio N]: <transcript>` ile değiştirir. Çağrılar `Promise.allSettled` ile yürütülür: bireysel bir arıza, orijinal ses parçasını (#4012 sözleşmesi) korur. Her çağrı başarısız olursa ve hedef `supportsAudio === false` olarak kanıtlanmışsa, parçalar `[Audio N]: (unavailable — no STT provider connected)` (#8430 sözleşmesi) haline gelir. Bilinmeyen bir hedef (`null`) için, tamamen başarısızlık sonucuna dokunulmadan kalır. Kullanılabilir STT kimlik bilgisi olmayan kanıtlanmış salt metin hedefi, bir ağ çağrısı yapmadan aynı açık saplamayı alır.

Başarılı transkriptler, süreç genelindeki Modalite Bridge LRU/TTL önbelleğini kullanır. Anahtar, ses referansını, kararlı `audio-transcription` işlem etiketini ve seçilen STT modelini birleştirir; hatalar hiçbir zaman önbelleğe alınmaz. Ses denemeleri paylaşılan `bridged`, `cacheHits`, `failures` ve `lastUsedAt` sayaçlarını günceller. Dönüştürülen yanıtlar `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` taşır; dokunulmamış istekler bir Ses Köprüsü segmenti almaz.

Çalışma zamanı ayarları DB desteklidir ve Zod tarafından doğrulanmıştır:

| Anahtar                       | Varsayılan | Menzil               |
| ----------------------------- | ---------- | -------------------- |
| `modalityBridgeAudioEnabled`  | `true`     | —                    |
| `modalityBridgeAudioModel`    | `""`       | Otomatik veya STT ID |
| `modalityBridgeAudioTimeout`  | `60000`    | 1000–300000          |
| `modalityBridgeAudioMaxClips` | `3`        | 1–10                 |

Paylaşılan önbellek `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` ve `modalityBridgeCacheMaxEntries` tarafından kontrol edilmeye devam eder.

### Video Köprüsü (`videoBridge.ts`, `videoBridgePipeline.ts`)

Bilinen yerel video desteği olmayan bir hedef çağrılmadan önce Sohbet Tamamlamaları `messages` ve Yanıtlar API `input` üst düzey video bölümlerini keser. Desteklenen şekiller `input_video`, `video_url`, `video_source`, HTTPS URLs ve `data:video/*;base64,...` verileri URIs. Metindeki düz dosya adları video olarak değerlendirilmez.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) istek geçişinin, capability/policy kontrolünün, istek başına toplamanın ve yanıt yükünün sahibidir. Her video çalışması için — edinimi, tüm sonuç önbelleği, bir çerçeve dizisini tanımlar (arayan tarafından bildirilen herhangi bir ses metnini birleştirir) ve deneme başına metrics/abort/cleanup —, `videoBridgePipeline.ts` içindeki `processVideoPart` arkasında gizlenir ve `preCall` döngüsü içindeki video parçası başına bir kez çağrılır. Bu modül aynı zamanda açık bağlantı noktası sınırlarını da tanımlar: `VideoMediaBrokerPort` (baytların alınması ve örneklenmiş çerçevelerin çıkarılması), `VideoAudioTranscriptionPort` (arayanın bildirdiği bir ses metnini örneklenmiş altyazılarla birleştirmek) ve `VideoDrilldownPort` (eski ham depo şekli). Üretim STT ve çerçeve tutma, `createVideoSttAdapter` ve `createVideoDrilldownAdapter` yoluyla tanımlama noktasının etrafında oluşturulur; ikincisi, paylaşılan opak tanıtıcı yaşam döngüsünü kullanır.

Genel `/v1` istek yolu hiçbir zaman bir alt işlemi içe aktarmaz veya çağırmaz. Uzak videolar 50 MiB sınırı altında indirilir; satır içi base64 videoları, video başına 36 MiB kodu çözülmüş muhafazakar bir sınıra sahiptir, böylece model/messages/framing zarfı, 50 MiB olan genel JSON isteği kabul sınırının içinde kalabilir. Satır içi uzunluk ve kodu çözülmüş boyut tahminleri, tahsisten önce kontrol edilir. HTTPS DNS sabitlemeli mevcut yalnızca genel giden giden korumayı kullanarak, ilk uzak URL ve her yeniden yönlendirmede gereklidir. Baytlar daha sonra tam dahili `POST /api/modality-bridge/video/extract` aracı sınırını geçer. Bu rota hem `LOCAL_ONLY` hem de `SPAWN_CAPABLE`, yalnızca işlem başına kimliği doğrulanmış, güvenilen geridöngü isteğini kabul eder ve hiçbir zaman URL, dosya sistemi yolu, yürütülebilir dosya veya argüman listesini kabul etmez. API gövde boyutu ardışık düzeni ve işleyicinin artımlı gövde okuyucusu, bağımsız olarak 50 MiB aracı giriş sınırını zorlar. Sınırlandırılmış kuyruğu her seferinde bir çıkarma işlemi gerçekleştirir, dört bekleyen işe izin verir ve bekleyen girişi 100 MiB ile sınırlandırır.

Aracının içinde `ffprobe` özel bir yerel dosyayı okur; sabit biçimli izin verilenler listesi, oynatma listesi ve bildirim biçimlerini hariç tutar. İzin verilen MOV ailesi kapsayıcıları için harici MOV veri referansları varsayılan olarak devre dışı kalır ve sabit komut bunları etkinleştirmez. Hem `ffprobe` hem de `ffmpeg` `file` -only protokolü beyaz listesini, tek iş parçacığını, sabit bağımsız değişken dizilerini, kabuk yok ve `PATH` çözümlenen yürütülebilir dosyaları kullanır. Ekli resimli kapak yayınları oynanabilir adaylar değildir. Oynatılabilir tüm akışların sınırları karşılaması gerekir ve deterministik en düşük endeks geri dönüşünden önce açık bir varsayılan akış tercih edilir. Videolar 600 saniye, boyut başına 8.192 piksel ve 33.554.432 kaynak pikselle sınırlıdır. FFmpeg 1-16 orta nokta JPEG karesini örnekler, daha küçük girişlerin ölçeğini yükseltmeden uzun kenarı en fazla 1.024 piksele ölçeklendirir ve hiçbir zaman URL almaz. Örnekleme varsayılan olarak `uniform`. İsteğe bağlı `scene_aware` ve deneysel `segment_aware` politikaları, halihazırda doğrulanmış yerel akış üzerinden ek bir sabit FFmpeg geçişi gerçekleştirir, sınırlı `showinfo` sahne zaman damgalarını seçer ve dedektör arızası, zaman aşımı, hatalı biçimlendirilmiş çıktı veya boş bir aday kümesi durumunda belirleyici olarak aynı tekdüze orta noktalara geri döner. Segmente duyarlı mod, orta nokta örneklerini doğrulanmış sahne aralıklarıyla orantılı olarak tahsis eder; segmente duyarlı kanıtlar ve geri dönüş davranışı aşağıda ayrıntılı olarak açıklanmıştır. Her poliçede seçimden sonra 16 karelik sert tavan uygulanır. Sahneye duyarlı bir isteğin yalnızca tek karelik bir bütçesi olduğunda, etkin tam video veya odak penceresinin tek tip orta noktasını kullanır ve `policyEffective: uniform` raporunu verir: seçilen tek bir sahne karesi, her iki zamansal ucu da koruyamaz. Arayan kişi isteğe bağlı olarak sınırlı bir odak penceresi (`start`/`end` saniye) sağlayabilir; sınırlar medya süresine sabitlenir, tersine çevrilmiş veya sonlu olmayan pencereler reddedilir ve tüm örnekleme politikaları yalnızca normalleştirilmiş aralık içinde gerçekleştirilir. Ortaya çıkan pencere, örnekleme meta verilerine ve güvenilmeyen açıklama önekine dahil edilir, böylece aşağı akış modelleri odaklanmış bir alıntıyı tam zaman çizelgesinden ayırt edebilir.

Anlamsal altyazı odağı ayrı ve açık bir ayardır. Varsayılan `full` analiz modu mevcut çerçeve istemini korur ve istek metnini hiçbir zaman altyazı modeline iletmez. `focused` modunda, köprü aynı Sohbet veya Yanıtlar kapsayıcısından yalnızca boş olmayan, kullanıcı tarafından yazılan en son `text`/`input_text` okur, bunu NFC olarak normalleştirir, kontrol karakterlerini ve boşlukları daraltır ve bunu 500 Unicode kod noktasıyla sınırlar. Boş bir sonuç tam `full` istemine geri döner. Kullanılabilir bir ipucu, özel bir güvenilmeyen kullanıcı bağlamı bloğunda JSON olarak serileştirilir ve yalnızca gözlemlenebilir ayrıntılara öncelik verebilir; medyada görünen veya işitilen aşağıdaki talimatlara ilişkin ayrı uyarıyı geçersiz kılamaz. Metinsel odak hiçbir zaman `start`/`end` sonucunu çıkarmaz veya zamansal örnekleyiciyi değiştirmez.

#### FU-07 yapısal segment kanıtı

`segment_aware` halihazırda doğrulanmış yerel video akışı üzerinden sınırlı bir ön analiz geçişi kullanır. Sabit filtre zinciri ilk önce en fazla 320 piksel genişliğe ölçeklenir, sahne değişikliklerini ve donmuş aralıkları algılar, ardından bulanıklık, ortalama luma ve spatial/temporal bilgileri için saniyede 1 kare hızında örnekleme yapar. Geçiş, 600 yapısal örnek, bir FFmpeg/filter iş parçacığı, aynı `file` -only protokolü ve kapsayıcı izin verilenler listeleri, 1 MiB işlem-çıkış sınırı ve aracının paylaşılan abort/deadline. en fazla 30 saniye ile sınırlıdır. İstekten hiçbir zaman bir komut, filtre, yol veya URL kabul etmez.

Yapısal değerler anlamsal video anlayışı değil, deterministik örnekleme kanıtıdır. Konular, eylemler, altyazılar, konuşmalar veya kullanıcının amacı hakkında bir çıkarımda bulunmazlar. Sahne ve donma sınırları bölümler oluşturur; kapsamın dondurulması, bulanıklık, pozlama, mekansal ayrıntı ve zamansal değişiklik yalnızca mevcut 1-16 kare bütçesinin nasıl tahsis edildiğini etkiler. Tamamen dondurulmuş bir bölüm tek kareyle sınırlandırılırken, dondurulmamış bölümler kalan bütçe için rekabet eder. Sınırların sayısı karelerden fazla olduğunda, tekdüze zaman çizelgesi kapsamı korunur, böylece hızlı erken kesmeler uzun bir sondaki segmenti gizleyemez. Donma sınırının 1 saniyelik analiz çözünürlüğü içindeki sahne sınırları birleştirilir.

Eksik filtreler, malformed/empty kanıtları, bir dedektör hatası veya sınırlı ön analiz zaman aşımı, tam olarak tek tip orta nokta politikasına açık değildir. Arayanı iptal etme veya aracının son teslim tarihi başarısız bir şekilde açılmaz: uçuş sırasındaki alt işlemi sonlandırır, daha sonra çerçeve çıkarılmasını önler ve özel geçici ağaç `finally` kaldırılır.

`scripts/perf/video-bridge-fu07-eval.ts` tekilleştirme sonrası altyazı çağrı tasarrufları, yoğun hareketli bütçe tahsisi, blur/exposure/SI-TI kanıtları, uzun kuyruklu hızlı kesintiler ve kademeli olarak silinen hatalı pozitifler için deterministik gerçek FFmpeg fikstürleri üretir. Analiz öncesi duvar süresini ve `/usr/bin/time` mevcut olduğu durumlarda alt CPU ve zirve RSS kaydeder. Kalite kontrolleri yalnızca yapısal kahinlerdir. Gerçek altyazı modeli kalitesi `HOLD` kalır çünkü bu koşumun yetkili bir son noktası veya donmuş yargıcı yoktur. `--caption-cost-per-call-usd` çağrı başına açık bir pozitif tahmin sağlamadığı sürece parasal tasarruflar da `HOLD` olarak kalır; senaryo hiçbir zaman her iki sonucu da uydurmaz.

Her çerçeve 4 MiB ile sınırlıdır, tüm ham çerçeveler birlikte 23 MiB ile ve serileştirilmiş aracı yanıtı 32 MiB ile sınırlıdır. `finally` özel bir geçici dizin kaldırıldı. OmniRoute FFmpeg paketlemez ve özel bir yürütülebilir yolu kabul etmez. Altyazı eklemeden önce köprü, koruyucu bir görsel tekilleştirme geçişi uygular: her JPEG 16 × 16 gri tonlamalı arabelleğe indirgenir ve yalnızca tutulan son kareyle karşılaştırılır. Bir karenin üzerinde talep edilen altyazı bütçesi için çıkarma, bu bütçenin iki katına kadar sınırlı bir aday havuzu sağlar ve hiçbir zaman 16 kareyi aşmaz. Talep edilen üst sınır yalnızca tekilleştirmeden sonra uygulanır; ilk ve son seçilen adaylar, bütçe en az iki olduğunda son azaltma sırasında korunur. Sürümlendirilmiş `grayscale-16x16-mean-cells-v2` politikası, ortalama luma deltasından büyük olanı ve normalleştirilmiş deltası en az 0,05 olan küçük resim hücrelerinin oranını kullanır. Yinelenen eşik, çalışma zamanı ayarı olarak ortaya çıkmak yerine öngörülebilirlik için seçilen sabit 0,04'tür. Bu ikincil yüksek kontrastlı sinyal, yalnızca ortalama karşılaştırmanın gizleyebileceği küçük hareketi ve görünür metin değişikliklerini korur. Karşılaştırıcı veya kod çözücü hataları açılmaz ve kapsama alanı korunur. Çıktı meta verileri, çıkarılan adayları, başarıyla kullanılan kareleri ve bırakılan görsel kopyaları ayırır.

Açıkça işaretlenmiş bir video bölümü, zaman damgalı bir bağlantı sayfası isteyebilir. Köprü en fazla 4 sütunlu, 16 çerçeveli bir JPEG ızgarası oluşturur. Her 512 piksellik hücre, kaynak zaman damgasını yüksek kontrastlı bir alt banda yazarken aynı zaman damgaları, aşağı yönde ilişkilendirme ve denetim için metinsel meta verilerde kalır. JPEG tamamı 32 MiB ile sınırlı kalır. `sharp` ızgaranın kodunu çözemezse veya oluşturamazsa, köprü bireysel JPEG çerçevelerine geri döner; istemci iptali sayfa işlemi boyunca yayılmaya devam eder.

Promosyon kanıtları kasıtlı olarak sentetik bileşim mikro kıyaslamalarından ayrı tutulmaktadır. `scripts/perf/video-bridge-contact-sheet-eval.ts` gerçek OpenAI uyumlu görüntü modelleri için şema sürümüne sahip bir A/B donanımını tanımlar. Sağlayıcı tarafından bildirilen belirteçleri, uçtan uca duvar gecikmesini (sayfa bileşimi dahil), model çağrı sayısını ve bildirim tanımlı bilgi saklamayı ölçer. Ham model yanıtları rapora yazılmaz; yalnızca SHA-256 özetleri ve eşleşen IDs gerçeği korunur. Kablo demeti, `--execute-real` geçilmediği ve `--model`, `OMNIROUTE_BASE_URL` ve `OMNIROUTE_API_KEY` yapılandırılmadığı sürece hiçbir ağ veya ücretli model çağrısı yapmaz. Bu açık gerçek çalıştırma olmadan, makine tarafından okunabilir kararı `HOLD` kalır; sentetik payload/call-count ölçümleri tek başına tanıtım kanıtı değildir.

Arayanlar, halihazırda hizalanmış metne sahip olduklarında, desteklenen bir video bölümüne isteğe bağlı bir `transcript.cues` dizisi ekleyebilirler. Her işaret `text`, incelenen süre içinde sonlu bir `start`/`end` aralığını ve beyaz listeye alınmış bir `source` (`client`, `embedded` veya `audio-bridge`) taşımalıdır; `confidence` varsayılan olarak `1` ve `0` ile `1` arasında kalmalıdır. Tam yinelenen ipuçları daraltılır. OmniRoute hiçbir zaman transkripsiyonu bu meta verilerden başlatmaz: doğrulanmış ipuçları, kaynak, güven ve aralıkla birlikte açıklanan sonuca kopyalanır ve çerçeve başlıklarının yanında güvenilmeyen gözlemler olarak oluşturulur. Geçersiz, kapsam dışı veya kaynaktan bağımsız metin, altyazı akışına karıştırılmak yerine reddedilir. Her iki istek gövdesi transkript kanalı da, kendinden onaylı `embedded` veya `audio-bridge` etiketleri dahil olmak üzere `client` sağlanan kaynağı normalleştirir. Yalnızca sunucuya ait bir bağdaştırıcı bu güvenilir etiketleri salt kod `trustedSource` bağımsız değişkeni aracılığıyla atayabilir; bir istek JSON alanı bu bağımsız değişkene ulaşamaz. Transkript metni, kaynağına bakılmaksızın medyadan türetilmiş güvenilmeyen içerik olarak kalır ve hiçbir zaman yetkilendirmeyi belirlememelidir.

İleri düzey bir arayan, aynı video için bir `audioTranscript` parçası sağlayabilir; sunucu transkripsiyonunun kanıtı olarak değil, müşteri tarafından sağlanan metin olarak kabul edilir. Füzyon dikişi, görsel ve işitsel gözlemleri tek bir son tarih ve iptal sinyali altında yürütür, bunları ortak bir zaman çizelgesinde sıralar, tam kopyaları daraltır ve yalnızca bir taraf başarılı olduğunda kısmi bir sonuç bildirir. Geçersiz bir `audioTranscript` görsel açıklamanın tutulduğu — kısmi sonucunun bozulmasına neden olur ve ses dalı, videonun tamamını başarısız kılmak yerine, arındırılmış bir hata kodu — kaydeder. Şube başına kullanılabilirlik, kısmi bayrak ve arındırılmış hata kodları, açıklanan sonuçta, korkuluk meta verilerinde (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), sonuç önbellek meta verilerinde ve köprü füzyon sayaçlarında korunur. Varsayılan Video Köprüsü yolu, konuşmayı metne dönüştürmeyi başlatmaz veya ikinci bir medya kopyasını indirmez; bu açık parça olmadan yalnızca video olarak kalır.

**Transkript saklama (#12150 P1).** Bu, Video Bridge'in (kendisi dahil) bir transkript işareti oluşturduğunda otomatik olarak uygulanır — ayrı bir saklama işareti yoktur. Bir istek, herhangi bir transkript işaretini (arayanın bildirdiği bir `transcript` veya birleştirilmiş `audioTranscript`) oluşturduğunda, korkuluk onu `videoBridgeObserved` işaretler ve video açıklamasının düzeltilmiş bir gölgesini üretir — her işaretin serbest metin gövdesinin `[redacted-video-transcript]` ile değiştirildiği özdeş bir oluşturma, dize bir araya getirilmeden önce yapılandırılmış işaret alanının değiştirilmesiyle oluşturulur (asla düzleştirilmiş metni ayrıştırarak değil, dolayısıyla işaret içeriği olmaz — `[inaudible]`/`[music]` — gibi `]` içeren cisimler dahil olmak üzere düşmanca veya sıradan hayatta kalabilir). Kalıcı çağrı günlüğü isteği gövdesi, içerik eşitliğiyle eşleşen, redaksiyona tabi tutulan gölge için videodan türetilmiş her metin parçasını değiştirir; `fullText` çapası, bitmiş çağrı öncesi korkuluk yükünden yeniden okunur, böylece daha sonraki zincir korkulukları ( PII ve kimlik bilgisi maskeleyicileri, 10/95 öncelikleri) açıklama metnini yerinde yeniden yazdıktan ve system-prompt/handoff/memory enjeksiyonu mesaj dizisini yeniden şekillendirdikten sonra eşleşme hala başarılı olur. Modelin yukarısına gönderilen gövde değişmedi. Gözlemlenen bir istek aynı zamanda kalıcı bir Bellek doldurmaz (hem istek hem de yanıttan türetilmiş çıkarma atlanır), dolayısıyla modelin kendi yanıtı transkripsiyon metnini Belleğe yansıtamaz.

**Ham video alanları (#12430).** Köprü etkinleştirildiğinde ve yerel video desteği bilinmediğinde veya bulunmadığında, tanımlı `transcript`/`audioTranscript` alanları, açıklama hatasından veya `maxVideos` sınırından sonra bile `videoBridgeObserved` de etkinleştirir. `null` ve boş dizeler sayılır; Eksik alanlar ve video olmayan meta veriler geçerli değildir. Saklanan kopyalar bu alanları düzenler veya isteği atlar ve caches/Memory atlanır.

Bu geri dönüş yollarında geçerli arayan ipuçları, standart olmayan sağlayıcı alanları yerine desteklenen `text`/`input_text` parçaları haline gelir. İstekle sağlanan parçaların her ikisi de güvenilmeyen `client` gözlemleri olarak kalıyor ve videonun açıklanmadığına ve zaman damgalarının medyaya göre doğrulanmadığına dair açık bir uyarı veriliyor. Mevcut 256-cue/64-KiB toplamı ve işaret başına bütçeler iki yol boyunca birlikte uygulanır; zaman damgaları komisyoncunun 600 saniyelik tavanına ve sağlanan herhangi bir odak penceresine uymalıdır. Geçersiz parçalar atılır, rastgele metin olarak iletilmez; Toplam bütçeleri aşılmadığı sürece geçerli bir kardeş yine de kullanılabilir. Null/empty alanları metin eklemez. Bu geri dönüşte medya getirme veya transkripsiyon eklenmez. Transkript uzantısı alanları, yedek video taşıyıcısından ve onun `video_url`/`source` nesnelerinden kaldırılır. OpenAI wire izin verilenler listesi katı kalır; bilinmeyen yerel video taşıyıcıları kullanılabilir durumda kalır ve bilinen salt metin hedefleri güvenli işaretçileri tutar. Yapılandırılmış redaksiyon gölgeleri, eklenen transkript metnini korurken arayanın sahip olduğu orijinal istek değişmeden kalır. Yerel olarak desteklenen hedefler ve devre dışı bırakılan köprüler, mevcut bypass davranışlarını korur.

Tutulan ek kopyalar aynı gözlemlenen istek sinyalini kullanır. Ham ön koruma istemci isteği anlık görüntüsü, bellek içi bekleyen istek ve erken reddedilen istek günlüğü, yapısal olarak video bölümlerindeki transkript alanlarının yerini alır; İşlem hattı aşamaları ve bağlam aktarımı tarafından sentezlenen dize istemleri, kalıcı istek gövdesi havuzunda düzenlenir. Kalıcı `video_content_removed` işaretçisi, kasıtlı olarak atılan metni yeniden oluşturmak yerine `previous_response_id` devamının başarısız şekilde kapatılmasını sağlar. Gözlemlenen bir istek, günlüğe kaydetmeden önce parça başına redaksiyon gölgesini kaybederse veya hatta birkaç video gölgesinden biri daha sonraki istek mutasyonlarından sonra eşleşmezse, kısmen düzeltilmiş bir transkriptin saklanması yerine tutulan istek gövdesi tamamen çıkarılır.

Gözlemlenen bir istek için, bir model yanıtı, transkriptin herhangi bir bölümünü yapılandırılmış bir ipucu sınırı olmadan alıntılayabilir. Bu nedenle kalıcı çağrı günlüğü `responseBody` yerini bir atlama işaretçisi alır; ayrıntılı ardışık düzen yapıtı ( upstream/client gövdelerini ve akış parçalarını içerebilen) korunmaz. Semantik, bağımsız olma ve akıl yürütme-tekrar yürütme önbellekleri bu istek için okuma ve yazma işlemlerini atlar. Sağlayıcının isteği ve müşterinin görebileceği yanıt değişmeden kalır. Ayrıntılı yapay yapı atlandığında, erken canlı tutma baytları geçici arabellekten boşaltılır. Kiro hatalı biçimlendirilmiş EventStream uyarısı yalnızca yük bayt sayısını bildirir, içeriğini veya JSON ayrıştırıcısının ham hatasını bildirmez. Bu, ilgisiz her provider/plugin teşhisinin denetlendiğini iddia etmez; daha geniş tutulan havuz taraması #11658 cinsinden izlenir.

Dahili `/api/modality-bridge/video/drilldown` yaşam döngüsü ayrı bir loopback/token-authenticated önbellek alt katmanıdır. Her işlem aynı zamanda kanonik opak bir prensip ID gerektirir. Bir üretim çağırıcısı etkinleştirilmeden önce, ID kimliği doğrulanmış kiracıdan türetmeli ve hiçbir zaman istemci tarafından seçilen bir değeri iletmemelidir. Önbellek anahtarları bu sorumluyu kanonik oturuma ve IDs video referansına bağlar, yalnızca SHA-256-derived anahtarlarını saklar ve hem okuma hem de silme işlemlerini aynı sorumlunun kapsamına alır. Önbellek, giriş başına en fazla 16 türetilmiş JPEG karesi depolar, on dakika sonra bunların geçerliliğini sona erdirir ve sınırlı `start`/`end` okumalarını veya açık oturum silmeyi destekler.

Her anapara 16 giriş ve 64 MiB kanonik JPEG verisi ile sınırlıdır. Bu sınırlar genel 64-entry/256 MiB tavanından bağımsızdır: asıl kota baskısı, küresel LRU tahliyesi dikkate alınmadan önce yalnızca anaparanın en az kullanılan girişlerini tahliye eder. Süresi dolmuş girişler, önbellek etkinliğinde hem ana hem de genel muhasebeden silinir; iptal ve doğrulama başarısızlığı ise kısmi bir değişiklik gerçekleştirmez.

Önbellek, standart olmayan Base64'ü, aşırı dolguyu, JPEG olmayan ortamı, hatalı biçimlendirilmiş veya kesilmiş JPEGs ve sınırlı tam görüntü `sharp` kod çözme sırasında bir uyarı üreten JPEGs reddeder. Kabul edilen her görüntüyü kanonik bir JPEG olarak yeniden kodlar, çağıran alanlarına güvenmek yerine genişliği ve yüksekliği kodu çözülmüş baytlardan türetir ve sondaki çok dilli baytları korumak yerine atar. Her iki kotaya da yalnızca sınırlı kurallı sıkıştırılmış arabellek yüklenir. JSON kablo sınırı, 32 MiB çözülmüş giriş tavanı için Base64 ek yükünü içerir. Her depolanan türetme, doğrulanmış JPEG format/resolution, örnekleme politikasını, türetme sürümünü, oluşturma zamanını, sunucu tarafından hesaplanan içerik karmasını ve karma edilmiş üst referansını ve ayrıca güvenilen arayanın üst içerik karmasını kaydeder. İptal, atomik önbellek işlemi öncesinde eşzamansız decode/hash aşamaları arasında kontrol edilir.

Yapım üreticisi, halihazırda türetilmiş aracı çerçevelerini yalnızca başarılı görsel analizden sonra, ikinci bir video download/extraction. olmadan yeniden kullanır. `modalityBridgeVideoDrilldownEnabled=true` operatörünü, parça başına katı `drilldown: true` ve kimliği doğrulanmış bir API anahtarı kaydı ID gerektirir. Müşteri tarafından bildirilen principal/session değerleri hiçbir zaman sahiplik oluşturmaz. Üç koşulun tümü olmadan ek kareleri karma hale getirmez, yeniden boyutlandırmaz veya korumaz. Tutma hatası, kullanılabilir görsel yanıtı korur. İzin verilen istekler tüm video sonuç önbelleğini atlar, böylece önbelleğe alınan sonuçlar hiçbir zaman yeniden oynatılmaz.

Başarılı JSON ve SSE yanıtları, sınırlı `x-omniroute-video-drilldown` başlığında en fazla dört opak tanıtıcıyı ortaya çıkarır. Yetkili tarayıcı kaynakları, CORS kaynak politikasını genişletmeden bu başlığı okuyabilir. Yeni tanıtıcılar `v1.<32-byte random base64url token>` kullanır ve kayıt defteri yalnızca onların SHA-256 karmalarını korur. reader/header ayrıştırıcısı aynı zamanda eski 64-hex belirteçlerini de kabul eder. Kimliği doğrulanmış genel tüketici `GET /api/v1/video-bridge/drilldown?handle=...` ve bağımsız olarak `modalityBridgeVideoDrilldownRemoteEnabled=true` tarafından kontrol edilir. Açık kalıcı false, eski `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env geri dönüşü etkinleştirildiğinde bile erişimi iptal eder. Üretimi elde tutma, benzer eski `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` geri dönüşüne sahiptir. Her iki yedek de varsayılan olarak kapalıdır.

Tüketici, kimliği doğrulanmış anahtardan sahiplik alır ve anahtar ilkesini uygular: hem GET hem de DELETE, `/v1` ve `/api/v1` takma adları da dahil olmak üzere `video` uç nokta kategorisine aittir. Boş olmayan uç nokta izin verilenler listesine sahip anahtarlar `video` içermelidir; sınırsız anahtarlar uyumlu kalır. Tüketici, bilinmeyen, süresi dolmuş ve başka bir anahtarın tanıtıcıları için aynı 404'ü döndürür. `variant=preview|standard|detail` (maksimum JPEG boyutu 320/640/1280, hiçbir zaman yükseltilmemiştir), `limit=1..8` (veya eski `frames` takma adı, asla her ikisi birden), sıfır tabanlı `page` ve isteğe bağlı `start`/`end` odak saniyelerini kabul eder. Yinelenen sorgu anahtarları ve ters odak pencereleri reddedilir. Döndürülen her varyant, tutulan kaynağa bağlı olarak gerçek içeriğinin ve gerçek çözünürlük meta verilerinin bir karmasına sahiptir. Varyantlar, ekstra tutulan kopyalar olarak saklanmak yerine okunduğunda türetilir. Base64/envelope dahil olmak üzere JSON yanıtı 32 MiB ile sınırlandırılmıştır; büyük boyutlu bir sayfa 413 değerini döndürür ve istemcinin daha az çerçeve istemesi gerekir. Her yeniden boyutlandırma etrafındaki kontrol iptalini okur ve geri dönmeden önce tanıtıcı geçerliliğini yeniden kontrol eder. sahibi tarafından `DELETE` önemsizdir; silme veya TTL süresinin dolması, tutulan kaynak ve kullanım hesaplamasını serbest bırakır.

Paylaşılan depo süreç yereldir: tanıtıcılar yeniden başlatıldığında sona erer ve bağımsız OmniRoute süreçleri arasında aktarılamaz. Yönetim istatistikleri, etkili saklama/uzaktan politikayı ortaya çıkarır ve yalnızca tutulan entries/bytes toplar; medyayı, referansları, ana IDs veya tanıtıcıları asla göstermez. Video ayarları paneli bu değerleri gösterir ve her iki izin anahtarına da devam edebilir. Bu uygulama belgeleri, canlı dağıtım veya tanıtım kanıtı değildir; gerçek model kabulü ayrı olarak takip edilir.

Çerçevelere, yapılandırılmış Video modeliyle sırayla altyazı eklenir. Boş bir Video geçersiz kılma, Görüş ayarını devralır; her ikisi de boşsa Vision otomatik yönlendirici etkili görme özellikli modeli seçer. Başarılı altyazılar, orijinal parçayı, aynı zamanda metni güvenilmez medyadan türetilmiş bir gözlem olarak işaretleyen ve alt modellere medyada bulunan talimatları takip etmemelerini söyleyen sabit bir `[Video description:` önekiyle değiştirir. Çerçeve başlığı önbellek anahtarları JPEG baytlarını, istemi, zaman damgasını ve etkili modeli içerir; yalnızca başarılı altyazılar önbelleğe alınır. Önbellek girişleri, bir geri dönüş modeli de dahil olmak üzere gerçek başarılı üretici modelini korur; köprü, farklı modeller tarafından farklı çerçeveler üretildiğinde `mixed` raporunu verir. Bir önbellek isabeti, bu üretici kimliğini istenen yönlendirme planı olarak yeniden etiketlemek yerine yeniden kullanır. Tüm video sonuç önbelleği, çıktı — istemini, etkili modeli, örnekleme politikasını, kare sayısını, anlamsal analiz modunu, normalleştirilmiş odak ipucunun SHA-256 parmak izini, odak penceresini, `transcript`, `audioTranscript` ve iletişim sayfası bayrağını — değiştiren her girişe anahtarlanır; dolayısıyla bu boyutlardan herhangi birinin değiştirilmesi bir önbellek kaçırmadır, asla eskimiş bir yeniden kullanım değildir. Görsel yinelenenleri kaldırma ilkesi sürümü, eşik ve sınırlı aday çerçeve sayısı da sonuç önbellek anahtarında ve meta verilerde açıkça belirtilmiştir; bu nedenle bir politika değişikliği, eski bir videonun tamamını kapsayan açıklamayı yeniden kullanamaz. Sonuç önbelleği v4 meta verileri, ham kullanıcı görevini asla değil, modu ve parmak izini korur. Guardrail meta verileri hem talep edilen hem de etkili analiz modlarını rapor eder; Kullanılabilir kullanıcı metni olmayan talep edilen bir `focused` modu etkili bir şekilde `full` olarak rapor edilir.

Korkuluk, desteklenen her video parçasını çıkarır ancak `modalityBridgeVideoMaxVideos` fazlasını tanımlamaz. `supportsVideo === false` sahip olduğu kanıtlanmış bir hedef için, başarısız olan ve limiti aşan videolar açık güvenli metin işaretçileri haline gelir ve böylece hiçbir ham video hayatta kalmaz. Yetenek bilinmediğinde bu parçalar video taşıyıcılarını korur; herhangi bir geri dönüş transkripti yukarıdaki sınırlı metin dönüşümünü takip eder. `supportsVideo === true` hedefler köprüyü atlar. İstemci isteğini iptal etme sinyali, indirme, aracı kuyruğu, alt işlemler ve altyazı çağrıları yoluyla yayılır; videolar arasındaki duraklamayı iptal eder ve asla ham medyaya açılmaz.

Çalışma zamanı ayarları DB desteklidir ve Zod tarafından doğrulanmıştır:

| Anahtar                             | Varsayılan  | Aralık / davranış                                                                                  |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | İsteğe bağlı çalışma zamanı, katılım                                                               |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` genel başlıkları korur; `focused` sınırlı, güvenilmeyen en son kullanıcı bağlamını kullanır |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge modelini devralın                                                                    |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                               |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` veya orantılı `segment_aware`; dedektör arızası `uniform` geri dönüyor    |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                     |

Eski kalıcı 120 saniyenin üzerindeki video zaman aşımı değerleri aracının son teslim tarihine sabitlenir; bu sınırın üzerindeki yeni ayar yazıları reddedilir. `GET /api/modality-bridge/video/runtime` kimlik doğrulama veya çalışma zamanı incelemesinden önce güvenilir damgalı geridöngü konumu gerektirir, ardından yönetim kimlik doğrulaması gerektirir. Çalışma zamanı kullanılamadığında yalnızca `available`, temizlenmiş FFmpeg/ffprobe sürümlerini ve sabit bir nedeni döndürür. Dahili çıkarma uç noktası genel bir yükleme API değildir: kuyruk doygunluğu `503` artı `Retry-After` döndürür, arayan bağlantısının kesilmesi `499` döndürür ve sabit aracı son tarihi `504` döndürür. Dönüştürülen yanıtlar, Görüntü veya Ses segmentlerini kaldırmadan merkezi `x-omniroute-modality-bridge` başlığına `video->text;model=<visionModel>;parts=<videos>` ekler.

### PII Maskeleyici (`piiMasker.ts`)

Devam ediyor** ikisi birden** aşamalar.

- **`preCall`** yükü klonlar, `system`, `messages`, `input` ve `prompt` (düz dize öğeleri dahil) yürütür ve `processPII()` ( `@/shared/utils/inputSanitizer`) `content`/`text` dize alanlarına uygular. `PII_REDACTION_ENABLED=true` olduğunda, algılanan PII giden veri yükünde çıkarılır. Bu, `INPUT_SANITIZER_MODE` bağımsızdır (yalnızca istem ekleme ilkesini denetler). Redaksiyon kapalıyken çağrı kayıtlarının tespiti, içeriğin yeniden yazılmasına gerek kalmadan sayılır.
- **`postCall`** Yanıtı derin klonlar, `sanitizePIIResponse()` artı Responses-API-şekil maskeleyicisini çalıştırır (`maskResponsesOutput` — `output_text` ve `output[].content[].text` kapsar). Herhangi bir düzeltme meydana gelirse, değiştirilen yanıt orijinalin yerine geçer.

Korkuluk asla engellemez; yalnızca açıklama ekler (`meta.detections`, `meta.redacted`) veya yeniden yazar.

#### Türe göre seçim, özel modeller ve tespit sayaçları

**Kontrol Paneli → Ayarları → Güvenlik → PII maskeleme** _neyin_ maskeleneceğini seçer. Maskelemeyi açmaz: bu hala `PII_REDACTION_ENABLED` (istek) ve `PII_RESPONSE_SANITIZATION` (yanıt + SSE), her ikisi de varsayılan olarak kapalıdır.

- **Tür başına seçim** — yerleşik kimlikler `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`) içinde listelenir. Ayarlanmamış, her tür anlamına gelir (bu ayar mevcut olmadan önceki davranış). İstek motorunun `ssn_us` modeli `ssn` ile eşleşir. Şablonlar (Minimal, Standart, Mali, Brezilya, USA, GDPR, POPIA, Tam) yalnızca UI içindeki onay kutularını doldurur.
- **GDPR ve POPIA tanımlayıcıları** — EU ve Güney Afrika kişisel tanımlayıcılarını kapsayan on iki yerleşik kimlik (aşağıdaki tablo). Regex'leri, doğrulayıcıları ve yetki etiketleri, hem yanıt temizleyicinin (`src/lib/piiSanitizer.ts`) hem de istek maskeleyicinin (`src/shared/utils/inputSanitizer.ts`) tükettiği `src/shared/utils/piiPatterns.ts` adlı tek bir tabloda bulunur. Bir eşleşme yalnızca doğrulayıcısı onu kabul ettiğinde düzenlenir; çıplak bir rakam dizisi asla yeterli değildir. Bu kimlikler var olmadan önce daraltılmış bir seçimi kaydeden operatör, yeni kimlikler işaretlenene kadar sahip olduğu davranışı korur.
- **Özel desenler** — en fazla 20 normal ifade veya joker karakter deseni (`*` = en fazla 64 boşluk olmayan karakter, `?` = one). Eşleşmeler `[CUSTOM_REDACTED]` olur. Her kalıp `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`) üzerinden geçer: en fazla 500 karakter, `g i m s u` ile sınırlı bayraklar derlenmeli, `safe-regex` (felaket geri izleme) geçmeli ve boş bir dizeyle veya redaksiyon yer tutucusuyla eşleşmemelidir. Başarısız olan bir model kaydedildiğinde ve test edildiğinde reddedilir ve başarısız olan depolanan bir satır, derlenmek yerine çalışma zamanında atlanır. Özel desenler yalnızca maskeleme açıkken çalışır.
- **Algılama sayaçları** Tür başına — sayıları (hiçbir zaman eşleşmeyen değerler), bellekte tutulur ve yeniden başlatma sırasında sıfırlanır (`src/lib/pii/piiDetectionStats.ts`). Yalnızca maskeleme açıkken artarlar.

Ayarlar `key_value` tablosunda bulunur ( `pii_settings`, `src/lib/db/piiSettings.ts` ad alanı) ve 1 saniyelik önbellek aracılığıyla okunur. API:

| Yöntem | Yol                      | Amaç                                                                            |
| ------ | ------------------------ | ------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Bayrak durumu, `enabledTypes`, `customPatterns`, tespit sayaçları               |
| `PUT`  | `/api/settings/pii`      | `enabledTypes` değiştirin (`null` = tümü) and/or `customPatterns`               |
| `POST` | `/api/settings/pii/test` | Bir modeli en fazla 8 KB bir numuneye karşı prova yapın; hiçbir şey saklanmıyor |

Üçü de yönetim yetkilendirmesi gerektirir ve gövdeyi Zod (`src/shared/validation/schemas/piiSettings.ts`) ile doğrular. Oturum açma devre dışıyken (`requireLogin=false`) `GET` ve test uç noktası açıktır ancak `PUT` hâlâ bir kontrol paneli oturumuna, bir `manage` -scope API anahtarına, yazma kapsamına veya daha yüksek bir `oma_` erişim belirtecine veya geri döngüden gönderilen CLI belirtecine veya dahili hizmet belirtecine ihtiyacı vardır.

#### GDPR (EU) ve POPIA (Güney Afrika) tanımlayıcıları

| İD                  | Tanımlayıcı               | Doğrulama                                                                       |
| ------------------- | ------------------------- | ------------------------------------------------------------------------------- |
| `iban`              | IBAN                      | Bilinen ülke, o ülke için tam uzunluk, ISO 13616 MOD-97-10                      |
| `eu_vat`            | EU VAT numarası           | Bilinen üye devlet öneki ve bu eyaletin sayı biçimi ( VIES araması yok)         |
| `es_dni_nie`        | İspanyolca DNI / NIE      | Kontrol harfi (değer modu 23); NIE `X/Y/Z` + 7 basamaklıdır                     |
| `it_codice_fiscale` | İtalyanca Codice Fiscale  | odd/even konum tablolarından kontrol mektubu                                    |
| `pl_pesel`          | Polonya PESEL             | Ağırlıklı sağlama toplamı ve mevcut kodlanmış bir doğum tarihi                  |
| `nl_bsn`            | Hollandalı BSN            | 11 geçirmez (ağırlık 9..2, -1)                                                  |
| `de_steuer_id`      | Alman Steuer-ID           | ISO 7064 Mod 11,10 artı rakam yapısı kuralları (başında 0 yok)                  |
| `se_personnummer`   | İsveçli kişi numarası     | Luhn'un son on hanesi ve makul bir doğum tarihi (10 veya 12 hane)               |
| `za_id`             | Güney Afrika ID numarası  | 13 hanenin tamamında Luhn, geçerli doğum month/day, vatandaşlık hanesi 0 veya 1 |
| `za_phone`          | Güney Afrika telefonu     | `+27` / `27` öneki veya boşluk veya kısa çizgi ile yazılan ulusal `0..` formu   |
| `za_vat`            | Güney Afrika VAT numarası | `4` ile başlayan 10 hane** Ve** Önceki 48 karakterde "VAT" / "BTW"              |
| `za_tax_ref`        | Güney Afrika vergi ref.   | `0`-`3`, Luhn ile başlayan 10 hane** Ve** Önceki 48 karakterde "vergi" / "SARS" |

Salt rakamlı formatlar sipariş numaraları, yapı numaraları ve zaman damgalarıyla çarpıştığı için en zayıf olanlar (`za_vat`, `za_tax_ref`) anahtar kelime ipucuna ihtiyaç duyar ve on basamaklı çıplak bir `0..` numarası Güney Afrika telefon numarası olarak değerlendirilmez. Aralıklı IBANs (`GB29 NWBK ...`) eşleşmiyor. Akış yolunda işaret yalnızca geçerli parçanın içinde aranır. Kimlikler genel telefon kalıplarının önünde yer aldığından, doğrulanmış bir tanımlayıcı kendi yer tutucusunu (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...) korur. `gdpr` ve `popia` şablonları sırasıyla EU ve Güney Afrika kimliklerini seçer. Maskelemenin kendisi isteğe bağlı olarak kalır (Zor Kural #20): burada hiçbir şey varsayılan özellik bayrağını değiştirmez.

### Hızlı Enjeksiyon (`promptInjection.ts`)

Kullanıcı tarafından sağlanan içerikteki düşmanca yapıları algılar ve yapılandırılmış politikayı uygular. Davranış, ortam değişkenleri ve yapıcı seçenekleri tarafından yönlendirilir:

| Ayar             | Ortam değişkeni                                                                                            | Varsayılan | Etki                                                                                                                                                                                                             |
| ---------------- | ---------------------------------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Etkinleştirilmiş | `INPUT_SANITIZER_ENABLED`                                                                                  | `true`     | `false` olduğunda korkuluk kısa devre yapar.                                                                                                                                                                     |
| Mod              | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                            | `warn`     | Ekleme politikası: `block`, `warn` veya `log`. (`redact` geri uyumluluk için kabul edilir ancak** Olumsuz** şerit enjeksiyon metni; PII yeniden yazma isteği `PII_REDACTION_ENABLED` tarafından kontrol edilir.) |
| Blok eşiği       | `blockThreshold` seçeneği / `INPUT_SANITIZER_BLOCK_THRESHOLD` (takma ad `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`     | Engellemek için gereken minimum önem derecesi. Medium, varsayılan olarak yalnızca gözlem içindir.                                                                                                                |

**Mod önceliği** (`getMode`): arayan `options.mode` → `INJECTION_GUARD_MODE`**DB özellik bayrağını geçersiz kılma** (Kontrol Paneli → Ayarları → Özellik Bayrakları) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. Bu nedenle, bir kontrol paneli geçersiz kılma, env değişkenlerine karşı galip gelir, böylece Özellik Bayrakları UI çalışan korumayı canlı olarak kontrol eder (yeniden başlatma yok). DB okuması arıza korumalıdır: hata verirse, koruma env tabanlı davranışa geri döner ve hiçbir geçersiz kılma ayarlanmadığında davranış, yalnızca env çözünürlüğüyle aynıdır.

Algılama kaynakları:

1. `@/shared/utils/inputSanitizer` `sanitizeRequest()` (boru hattının başka bir yerinde kullanılan paylaşılan dedektör seti).
2. Yerleşik `DEFAULT_GUARD_PATTERNS` (şu anda `system_override_inline` ve `markdown_system_block`, her ikisi de `high` önem derecesine sahiptir).
3. İsteğe bağlı `customPatterns` yapıcı seçenekleri (dizeler, normal ifade veya `{ name, pattern, severity }` kayıtları) aracılığıyla aktarılır.

Ne zaman `mode === "block"`** Ve** en az bir algılama önem eşiğini karşıladığında `preCall`, `{ block: true, message: "Request rejected: suspicious content detected" }` değerini döndürür. `warn`/`log` modlarında korkuluk günlüğe kaydedilir ancak çağrıya izin verilir. Paylaşılan yardımcı `evaluatePromptInjection()` kayıt defterine girmeden istemleri değerlendirmesi gereken arayanlar için de dışa aktarılır.

**Tarama sınırı (v3.8.20):** dedektör yalnızca şunları denetler:** ilk 16 KB** `src/shared/utils/inputSanitizer.ts` içindeki birleştirilmiş bilgi istemi metni — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bayt). Desen döngüsünü çalıştırmadan önce hem `detectInjection()` hem de `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)`. Enjeksiyon direktifleri bir girişin üst kısmına yakın bir yerde bulunur, bu nedenle bu, algılamayı zayıflatmadan yüzlerce KB'lik verilerde regex CPU/GC sınırlar (cf. #3932, #4041).

### Kimlik Bilgisi Maskeleyicisi (`credentialMasker.ts`)

Devam ediyor** ikisi birden** aşamalar, varsayılan zincirin sonuncusudur (öncelik `95`). Giden yükteki iyi bilinen API anahtarı/gizli belirteç modellerini çıkarır (mesaj içeriği, araç çağrısı bağımsız değişkenleri, araç sonuçları)** Ve** sağlayıcı yanıtı, böylece bir bilgi istemine yapıştırılan (veya bir araç sonucu tarafından yankılanan) kimlik bilgisi yukarı akış sağlayıcısına veya istemciye geri sızdırılmaz.

- **Yalnızca kaydolma** , PII redaksiyonuyla aynı kural (Katı Kural #20-bitişik): `settings.credentialRedactionEnabled === true` olmadığı sürece devre dışı** veya** `CREDENTIAL_REDACTION_ENABLED=true`. Kapalıyken, korkuluk hiçbir zaman bloke etmeyen ve asla yeniden yazmayan, işlemsiz bir —.
- `redactCredentials()` payload/response ağacının tamamını yürütür (`walkValue()`, prototip-pollution-safe, `WeakSet` aracılığıyla çevrim güvenli) ve eşleşmeleri bir `[REDACTED:<type>]` yer tutucuyla değiştirerek yalnızca gerçekten değişen dalları klonlar.
- `CREDENTIAL_PATTERNS` LLM sağlayıcı anahtarlarını (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS belirteçlerini (GitHub, Slack, Linear, Notion, npm, Postman, Discord), ödeme anahtarlarını (Stripe, Square), bulut anahtarlarını (AWS erişim anahtarı, Twilio, SendGrid, Mailgun), özel anahtarları / JWTs, kimlik bilgisi taşıyan öğeleri kapsar bağlantı dizeleri (`mongodb://user:pass@...` vb.) ve genel bir `Authorization`/`x-api-key`/`api-key`/`apikey` başlık değeri modeli. Başlık şeklindeki anahtarlar (`authorization`, `x-api-key`, `api-key`, `apikey`) genel metin regex'i yerine yapısal olarak düzenlenir (yalnızca değer, `Bearer `/`Basic ` gibi şema öneki korunur).
- Korkuluk asla engellemez; yalnızca yeniden yazar (`modifiedPayload` / `modifiedResponse`) ve açıklama ekler (`meta.credentialsRedacted`, `meta.count`).

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
  block?: boolean; // true olduğunda zinciri kısa devre yapar
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

Bir guardrail, `void`, `{}` veya `{ block: false }` döndürerek "değişiklik yok" sinyali verir. `modifiedPayload`/`modifiedResponse` döndürmek, zincirde ilerideki guardrail'lere akan değerin yerini alır. `signal?: AbortSignal`, çağıranın yaşam döngüsünü guardrail'lere taşır. Bir isteğin iptal edilmesi, kasıtlı fail-open istisnasıdır: medya köprüleri, ham medyayı desteklemediği bilinen bir hedefe geri yüklemeden çalışmayı durdurur ve temizlik yapar.

## Kayıt Defteri (`registry.ts`)

Tekil (singleton) `guardrailRegistry` şunları sunar:

- `register(guardrail)` — bir guardrail ekler (veya normalleştirilmiş ada göre değiştirir) ve artan `priority` değerine göre yeniden sıralar.
- `clear()` / `list()` — yönetimsel yardımcılar.
- `runPreCallHooks(payload, context)` — etkin guardrail'leri sırayla işler, yükü `modifiedPayload` üzerinden zincir boyunca iletir ve ilk `block: true` değerinde durur.
- `runPostCallHooks(response, context)` — yanıt tarafında aynı akış.
- `resetGuardrailsForTests({ registerDefaults })` — durumu temizler ve temiz bir test yalıtımı için isteğe bağlı olarak varsayılanları yeniden kaydeder.

Her iki çalıştırıcı da `{ blocked, payload|response, results, guardrail?, message? }` döndürür; burada `results`, guardrail başına `blocked`, `skipped`, `modified`, `error` ve `meta` alanlarını içeren `GuardrailExecutionResult` kayıtlarından oluşan bir dizidir ve izleme (tracing) için kullanışlıdır.

### Guardrail'leri İstek Bazında Devre Dışı Bırakma

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })`, geçerli istek için atlanması gereken guardrail adlarının tekilleştirilmiş bir listesini oluşturur. Bu sırayla okunan ve tek bir listede birleştirilen beş kanal vardır (tekilleştirmede ilk geçen kazanır):

1. `apiKeyInfo.disabledGuardrails`
2. İstek gövdesi `disabledGuardrails` (en üst düzey)
3. İstek gövdesi `metadata.disabledGuardrails` (yalnızca `metadata` bir nesne olduğunda)
4. `x-omniroute-disabled-guardrails` üstbilgisi
5. Eski (legacy) `x-disabled-guardrails` üstbilgisi

Beş kanalın tümü birleştirilir; iki üstbilgi de buna dahildir: hem `x-omniroute-disabled-guardrails` hem de `x-disabled-guardrails` göndermek, listelerinin birleşimini atlar ve boş bir modern üstbilgi artık eski olanı gizlemez ([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), [#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805) ile düzeltildi).

Değerler dizgi dizileri ya da virgülle ayrılmış bir dizgi olabilir; adlar kırpılır ve küçük harfli kebab-case biçimine normalleştirilir (`pii_masker` → `pii-masker`), boş girdiler atılır. Sonuç, `context.disabledGuardrails` aracılığıyla kayıt defterine aktarılır; kayıt defteri eşleşen guardrail'leri atlar (`results` içinde `skipped: true`).

Devre dışı bırakma listesi yalnızca **kayıt defterini** etkiler. İstem enjeksiyonu `block` modu zorunlu bir sınırdır: injection-guard ara yazılımı (`src/middleware/promptInjectionGuard.ts`), `evaluatePromptInjection()` işlevini çağıranın denetimindeki herhangi bir devre dışı bırakma listesi olmadan çağırır (eskiden yaptığı ölü `resolveDisabledGuardrails({ body })` çağrısı [#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934) ile kaldırıldı); bu nedenle `prompt-injection` guardrail'ini devre dışı bırakan bir istek, `block` modunda yine de reddedilir. Bu, tasarım gereğidir. Devre dışı bırakma kanalları çağıranın denetimindedir (istek gövdesi, metadata, üstbilgiler) ve bir çağıran, operatörün ayarladığı bir güvenlik denetimini kapatamamalıdır ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)'deki üstbilgi birleşimi yalnızca hangi kayıt defteri guardrail'lerinin atlanacağını değiştirir; bir istemcinin ara yazılımı atlatmasına izin vermez. Anahtar başına ve grup başına zorunlu guardrail ilkeleri, v4 RFC'si [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417)'de izlenmektedir. Bkz. [Kapsam ve sınırlar](#coverage-and-limits).

## Yürütme Sırası

`src/sse/handlers/chat.ts` ve `open-sse/handlers/chatCore.ts` üzerinden akan her istek için ([Kapsam ve sınırlar](#kapsam-ve-sınırlar) altında listelenen sohbet ailesi rotaları):

1. `resolveDisabledGuardrails(...)` atlama listesini API anahtarından, gövdeden
   ve başlıklardan oluşturur.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` guardrail'leri artan öncelik
   sırasına göre çalıştırır:
   - Devre dışı bırakılan guardrail'ler `skipped` olarak kaydedilir.
   - Her guardrail'in `preCall`'ı, yükü `modifiedPayload` aracılığıyla yeniden yazabilir.
   - İlk `block: true` zinciri kısa devre yapar ve işleyici bir guardrail reddi
     yanıtı döndürür.
3. (Olası yeniden yazılmış) yük, combo yönlendirmesine ve upstream gönderimine akar.
4. **Yalnızca akışsız (non-streaming):** yanıt oluşturulduktan sonra,
   `guardrailRegistry.runPostCallHooks(...)` aynı zinciri yanıt üzerinde
   çalıştırır. Buradaki `block: true`, upstream yanıtını düşürür ve HTTP 400
   döndürür. Stream edilen yanıtlar bu adımı tamamen atlar.

Hata fırlatan guardrail'ler `error: <message>` ile kaydedilir ve `logger.warn`
aracılığıyla günlüğe yazılır, ancak zincir devam eder — tasarım gereği fail-open.

## Kapsam ve sınırlar

Guardrail registry'si yalnızca sohbet pipeline'ına bağlanmıştır. Bu sınırlar
`tests/unit/guardrail-pipeline-wiring-characterization.test.ts` ve
`tests/unit/guardrail-pipeline-characterization.test.ts` tarafından sabitlenmiştir;
davranış değiştiğinde bu testleri bilinçli olarak güncelleyin.

### Hook'ların çalıştığı yerler

| Hook / kontrol                        | Çalıştığı yerler                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                     | `handleChat` (`src/sse/handlers/chat.ts`) tarafından işlenen istekler: `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (ve `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` ve Telegram sohbet vekili. Ayrıca pano test uç noktası `/api/guardrails/test`. Bir pre-call engellemesi HTTP 400 döndürür. |
| `runPostCallHooks`                    | Yalnızca **akışsız (non-streaming)** sohbet yanıtları (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Stream edilen yanıtlar buna asla ulaşmaz.                                                                                                                                                                                                                                                                               |
| Streaming PII                         | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`); `PII_RESPONSE_SANITIZATION` açıkken `streamingPipeline.ts` içinde pipe'a bağlanır. Bir guardrail değildir, bu nedenle devre dışı bırakma kanalları onu etkilemez.                                                                                                                                                                                                       |
| Injection-guard middleware'i (legacy) | Sohbet ailesi dahil, prompt taşıyan her `/v1` rotası (bkz. [rota kapsamı](#injection-guard-route-coverage--red-team-phase-8--block-d)). Yalnızca prompt injection.                                                                                                                                                                                                                                                                    |

### Kapsanmayanlar

- **Medya, embeddings ve veri rotaları** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) registry'ye asla ulaşmaz. Orada
  PII maskeleme, kimlik bilgisi maskeleme veya modality bridge çalışmaz. Tek
  denetimleri, eski (legacy) injection-guard middleware'idir.
- **Stream edilen yanıtlar** post-call guardrail'i almaz: post-call `pii-masker`
  veya `credential-masker` yoktur ve post-call engellemesi de yoktur. Yalnızca
  streaming PII dönüşümü uygulanır (`PII_RESPONSE_SANITIZATION` açıkken). Stream
  edilen bir yanıtta geri yansıtılan bir kimlik bilgisi maskelenmez.
- **Devre dışı bırakma kanalları ve middleware (tasarım gereği):** middleware,
  prompt injection'ı, çağıran kontrolündeki herhangi bir devre dışı bırakma listesi
  iletmeden, kendi `evaluatePromptInjection()` çağrısıyla değerlendirir. `block`
  modu, sohbet ailesi rotaları da dahil olmak üzere, çağıran kontrolündeki devre
  dışı bırakmaların atlatamayacağı zorunlu bir sınırdır
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).
  `prompt-injection`'ı devre dışı bırakmak yalnızca registry guardrail'ini atlar.

### Post-call'dan önce yanıtı neler görür

Non-streaming yolunda sıra şöyledir: bellek çıkarımı → yerleşik araç
yürütme → post-call guardrail'leri → post-call engel çıkışı → semantic-cache
deposuna yazma.

- **Bellek çıkarımı** ve **araç yürütme**, yanıtı çağrı sonrası
  korumalar onu yeniden yazmadan veya engellemeden önce görür.
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401)'den bu yana,
  bellek çıkarımı, `PII_RESPONSE_SANITIZATION` açıkken (hem akışlı hem de
  akışsız modda) çıkarılan metni `sanitizePII` üzerinden geçirir; ancak çağrı
  sonrası korumaların daha sonra engellediği bir yanıt yine de belleğe ve
  araçlara sunulmuş olur.
- **Anlamsal önbellek**, yanıtı çağrı sonrası işlemin ardından saklar; bu
  nedenle yeniden yazılmış yanıtı saklar ve engellenen bir yanıt asla önbelleğe
  alınmaz. Önbellek girdileri API anahtarı başına anahtarlanır.

## Yapılandırma

Yerleşik korumalar tarafından okunan ortam değişkenleri:

| Değişken                              | Kullanan                  | Etki                                                                                                              |
| ------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Algılamayı tamamen devre dışı bırakmak için `false` olarak ayarlayın.                                             |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Enjeksiyon politikası: `warn`, `block` veya `log`. Eski `redact` değeri enjeksiyon metnini yeniden yazmaz.        |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Enjeksiyon korumasının modu; ayrıca ortam değişkenlerini **geçersiz kılan** bir DB özellik bayrağıdır (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | `MODE=block` tarafından reddedilecek minimum önem derecesi: `high` (varsayılan), `medium` veya `low`.             |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | `INPUT_SANITIZER_BLOCK_THRESHOLD` için eski takma ad.                                                             |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | `true` olduğunda, istekteki PII maskelenir (enjeksiyon modundan bağımsız).                                        |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (aşağı akış) | Yanıt tarafındaki maskeleyici davranışını kontrol eder.                                                           |

Modality Bridge korumaları, çalışma zamanı yapılandırmasını ortam
değişkenlerinden değil, DB destekli ayarlar deposundan (`getSettings()`) okur.
Vision'ın birincil anahtarları şunlardır:
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` ve
`modalityBridgeCacheMaxEntries`. Eski
`visionBridge*` anahtarları yalnızca belgelenen tek döngülük okuma geri
dönüşü olarak kabul edilir; pano yazma işlemleri birincil anahtarları kullanır.
Varsayılanlar ve geri dönüş çözümleyicisi
`src/shared/constants/modalityBridgeDefaults.ts` dosyasında bulunur; eski
sabitler ise `src/shared/constants/visionBridgeDefaults.ts` dosyasında
tutulur.

Audio, `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` ve `modalityBridgeAudioMaxClips` anahtarlarının
yanı sıra paylaşılan `modalityBridgeCache*` ayarlarını kullanır. Bu anahtarlar
Modality Bridge şemasıyla birlikte tanıtıldığından Audio için eski anahtar geri
dönüşü yoktur.

Video, `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` ve
`modalityBridgeVideoTimeout` anahtarlarının yanı sıra paylaşılan
`modalityBridgeCache*` ayarlarını kullanır. FFmpeg/ffprobe isteğe bağlı
operasyonel bağımlılıklar olduğundan ve kare açıklaması oluşturma işlemi
gecikme süresi ile model maliyeti eklediğinden, varsayılan olarak devre
dışıdır.

## Özel Koruma Rayları (Guardrails)

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

1. `BaseGuardrail` sınıfını genişleten `src/lib/guardrails/myGuardrail.ts` dosyasını oluşturun.
2. `preCall` ve/veya `postCall` metodlarını uygulayın.
3. Ya içe aktarma (import) zamanında kaydedin (`registerDefaultGuardrails` içinden push ederek) ya da
   çalışma zamanında `guardrailRegistry.register(...)` çağırın — kayıt defteri (registry),
   aynı normalize edilmiş ada sahip önceki guardrail'in yerine geçer.
4. `tests/unit/` altına testler ekleyin (mevcut örnekler:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Test Etme

Bilinen bir durumdan başlamak için testler arasında `resetGuardrailsForTests()` kullanın.
Boş bir kayıt defteriyle başlamak ve yalnızca test edilen guardrail'leri kaydetmek için
`{ registerDefaults: false }` geçirin. Vision Bridge, bağımlılık enjeksiyonunu kabul eder
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge ise ayarlar, yetenekler,
STT model seçimi, kimlik bilgisi kontrolleri ve transkripsiyon için eşdeğer
bağlantı noktaları (seam) sunar. Böylece testler her iki akışı da veritabanı
veya ağ erişimi olmadan çalıştırabilir.

## Ayrıca Bakınız

- `src/lib/guardrails/` — uygulama
- `src/shared/utils/inputSanitizer.ts` — prompt-injection ve PII maskelemesini
  destekleyen paylaşılan algılayıcı
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge varsayılanları ve
  zorunlu köprü (forced-bridge) model listesi
- `src/shared/constants/modalityBridgeDefaults.ts` — paylaşılan Vision/Audio çalışma zamanı varsayılanları
- `docs/architecture/RESILIENCE_GUIDE.md` — dik (orthogonal) katman (circuit breaker, cooldown'lar)
- `docs/reference/ENVIRONMENT.md` — tam ortam değişkeni referansı

## Injection-guard rota kapsamı ve red-team (Faz 8 · Blok D)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`), kullanıcı prompt'u
kabul eden tüm rotaları kapsar. `INJECTION_GUARD_MODE` değerine uyar (varsayılan `warn` =
yalnızca log; `block` = HTTP 400 `SECURITY_001` döndürür).

| Tür            | Rotalar                                                                                                                                              | Varsayılan mod |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Metin (mevcut) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn           |
| Üretken        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn           |
| Veri           | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn           |

Metin çıkarımı (`extractMessageContents`), `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` alanlarını kapsar.

**Red-team (gecelik, `nightly-llm-security.yml`):** promptfoo, her rotanın
`INJECTION_GUARD_MODE=block` altında OWASP-LLM külliyatını engellediğini doğrular;
garak probları çalıştırır (gizli anahtar olmadan atlar). `moderations`, tutarlılık
için dahil edilmiştir. Block modu zorunlu bir sınırdır: `evaluatePromptInjection()`,
ara katmanın (middleware) kendisine ilettiği istek bazlı devre dışı bırakma listesini
yok sayar; bu nedenle `disabledGuardrails` bir rotayı bundan **muaf tutmaz**
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Gecelik iş akışı (`.github/workflows/nightly-llm-security.yml`, cron + manuel
tetikleme) iki işe (job) sahiptir:

- **`promptfoo-guard` (engelleyici)** — `INJECTION_GUARD_MODE=block` ile
  `promptfoo eval -c promptfooconfig.yaml` çalıştırır. Her düşmanca test senaryosu
  (örn. "ignore all previous instructions…", DAN tarzı jailbreak'ler) yanıtın
  `error.code === "SECURITY_001"` taşıdığını, yani guard'ın isteği gerçekten
  reddettiğini doğrular.
- **`garak` (danışman niteliğinde)** — yerel bir OmniRoute örneğine
  (`http://localhost:20128/v1`) karşı garak `--probes promptinject,dan,leakreplay`
  çalıştırır. Bir sağlayıcı gizli anahtarına (`PROMPTFOO_PROVIDER_KEY`) bağlıdır;
  sorunsuz şekilde atlar ve `|| true` ile sonlandırılmıştır, böylece CI'ı
  başarısız etmeden raporlar.

Guard yardımcısının (`createInjectionGuard` / `withInjectionGuard`) kapsamı,
prompt taşıyan tüm `/v1` rotalarını kapsar; prompt metni,
`src/shared/utils/inputSanitizer.ts` içindeki `extractMessageContents()` tarafından
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` alanlarından
alınır.
