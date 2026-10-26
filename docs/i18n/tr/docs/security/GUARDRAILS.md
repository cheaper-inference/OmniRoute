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

## Yerleşik Guardrail'ler

Kayıt defteri, içe aktarım sırasında öncelik sırasına göre altı guardrail'i otomatik olarak yükler
(bkz. `registry.ts` → `registerDefaultGuardrails()`):

| Öncelik | Ad                  | Aşama(lar)     | Dosya                 |
| ------- | ------------------- | -------------- | --------------------- |
| `5`     | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`     | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`     | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`    | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`    | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`    | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Düşük öncelik numaraları **önce** çalışır.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

GLM 5.3 temel modeli ve `glm-5.3-{low,high,max}`, açık
`supportsVision:false` registry/spec meta verisine sahiptir. GLM 5.3 Flash varyantları yerel görüntü modelleri olarak kalır. Claude Code'un `/v1/messages` rotası, Claude'dan OpenAI'a çeviriden **önce** paylaşılan `handleChat` çağrı öncesi guardrail zincirine girer; iç içe geçmiş `Read` araç sonucu görüntüleri, bu çeviri onları OpenAI `image_url` içeriğine taşımadan önce betimlenmeli veya işlenmelidir (#17069).

**Görüntü desteklemeyen modelleri** hedefleyen görüntü içeren istekleri yakalar ve yukarı akış çağrısından önce ya tüm isteği görüntü özellikli bir modele yeniden yönlendirir ya da görüntü parçalarını, yapılandırılabilir bir görüntü modeli tarafından üretilen metin betimlemeleriyle değiştirir. Bu, yalnızca metin destekleyen sağlayıcıların çok modlu yükleri şeffaf bir şekilde işlemesine olanak tanır.

Akış:

1. Hedef model zaten görüntü destekliyorsa atla (zorunlu köprü listesi
   `isVisionBridgeForcedModel` içinde yer almadığı sürece).
2. Görüntü parçalarını `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`) aracılığıyla çıkar; bu işlev, `open-sse/utils/mediaParts.ts` içindeki **birleşik medya dedektörü** `detectMediaParts()` işlevine devreder — kombinasyon uyumluluk filtresiyle paylaşılan tek doğruluk kaynağı.
   Çıkarma, `replaceImageParts`'ın geri ekleyebileceği şekillerle izin listesine alınmıştır (extract↔replace sözleşmesi): OpenAI `image_url`, Anthropic base64
   `source.type:"base64"`, Anthropic URL `source.type:"url"` ve Responses
   API `input_image`. Claude Code `tool_result.content` ve Responses araç çıktılarının içine iç içe yerleştirilmiş eşleşen görüntüler de çıkarılır ve özgün yollarında değiştirilir; yalnızca gösterge olan şekiller kombinasyon filtresine aittir ve çıkarılmaz.
   Hiçbiri bulunamazsa atla.
3. Çalışma zamanı yapılandırmasını `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`) aracılığıyla çöz: yeni `modalityBridge*`
   ayar anahtarları önceliklidir; eski `visionBridge*` anahtarları **tek döngülük
   bir geri dönüş** (geri alma penceresi) olarak kalır. Köprü devre dışıysa herhangi bir medya taramasından önce atla.
4. Mod seçici (`modalityBridgeVisionMode`, aşağıdaki tabloya bakın) yeniden yönlendirme ile betimleme arasında karar verir. Yeniden yönlendirme, yalnızca `model` değiştirilmiş `modifiedPayload` ile birlikte `{ rerouted, fromModel, toModel, imagesKept }` meta verisini döndürür.
5. Betimleme yolu: görüntüleri `maxImages` ile sınırlar, göreve duyarlı istemi oluşturur,
   betimleme önbelleğine başvurur, görüntü modelini **paralel olarak**
   çağırır (`Promise.allSettled`) ve yerlerine `[Image N]: <description>` metin parçalarını enjekte eder. Başarısız bir betimleme `null` döndürür: ham görüntü, bilinmeyen/görüntü özellikli hedefler için korunur
   (#4012), ancak **doğrulanmış yalnızca metin doğrudan hedefi**
   veya sıfır görüntülü kombinasyon, betimlenememiş her görüntü için — kısmi hatalar ve betimleme çağrısı sınırını aşan görüntüler dahil — açık bir
   `(unavailable — no vision-capable provider connected)` metin taslağı alır
   (#17069). Mevcut tümü başarısız kombinasyon betimleme geri dönüşü
   yerinde kalır (#8430).
6. `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`) döndürür.

#### Mod seçici (`modalityBridgeVisionMode`)

| Mod        | Varsayılan | Davranış                                                                                                                                                                                                                                                                                                      |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔          | Eski sezgisel yöntem, değiştirilmemiş (#6640/#7204): combo olmayan/`auto/` modeller, orijinal modelin zaten kullanılabilir kimlik bilgileri olmadıkça (o zaman describe yapılır) en iyi görüş modeline yeniden yönlendirilir; combo hedefleri her zaman describe yapar.                                       |
| `describe` |            | Her zaman describe — reroute bloğu tamamen atlanır; kullanıcının seçtiği model her zaman yanıt verir.                                                                                                                                                                                                         |
| `reroute`  |            | Reroute'u zorla: kimlik bilgisine sahip modeli koruma kontrolü atlanır. Reroute-**hedefi** kimlik bilgisi kontrolü hâlâ geçerlidir — kullanılabilir bir görüş hedefi olmadığında, köprü describe yapmak veya ham görüntüleri yalnızca metin destekleyen bir hedefe göndermek yerine net bir hatayla engeller. |

Zorlanan modlar, auto sezgisel yöntemi çalışmadan **önce** kısa devre yapar; `auto` davranışı, PR-1 öncesi koruma mekanizmasıyla bayt düzeyinde aynıdır.

#### API anahtarı kapsamı (`visionBridgeKeyScope.ts`)

Çağıranın API anahtarı `allowedConnections`, kota havuzlarını
(`allowedQuotas`) veya modelleri (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`) kısıtladığında,
köprü yalnızca anahtarın kullanabileceği bağlantılar üzerinde, anahtarın
kullanabileceği reroute ve describe modellerini seçer. Describe çağrısı daha
sonra her zaman `x-omniroute-self-loop-key-id` başlığıyla OmniRoute self-loop
üzerinden geçer; böylece alan sohbet isteği, o anahtarın bağlantı ve model
politikasını tekrar uygular. `enforceApiKeyPolicy()` bu başlığı yalnızca
self-loop bearer ile birlikte dikkate alır; dolayısıyla erişimi yalnızca
daraltabilir ve çözümlenemeyen bir kimlik reddedilir.

Anahtar için hiçbir görüş modeline izin verilmiyorsa, **doğrulanmış yalnızca
metin destekleyen bir hedef**, görüntü baytlarını yetersiz bir upstream'e
iletmek yerine görüntü isteğini yerel olarak net bir HTTP 400 ile reddeder
(#17069). Bilinmeyen veya yerel görüş yeteneğine sahip hedefler için describe
yolu, önceki fail-open davranışını korur (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Anahtarsız istekler ve bu kısıtlamalara sahip olmayan anahtarlar, tamamen
eskisi gibi davranır.

#### Göreve duyarlı describe istemi (`modalityBridgeVisionTaskAware`)

Varsayılan **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`),
**son kullanıcı mesajının** metnini (500 karaktere kısaltılmış olarak) temel
describe istemine ekler; açıklamayı kullanıcının gerçekte sorduğu şeye
yönlendirir (codex-vision-proxy kalıbı) ve görüş modelinden görünür metni
yazıya dökmesini ister. Bayrak kapalıysa — veya kullanıcı metni yoksa — temel
istem değiştirilmeden kullanılır.

Describe self-loop'unun kendi OpenAI uyumlu isteği (`visionBridgeHelpers.ts`
içindeki `callVisionModelSingle()`) her zaman `image_url.detail: "high"`
ister — koşulsuz olarak, her çağıran/sağlayıcı için, herhangi bir istemci
sinyaline bağlı olmaksızın. Düşük ayrıntılı örnekleme, tam olarak bu istemin
istediği metin yazıya dökme görevi için OCR doğruluğunu düşürür; bu nedenle
describe çağrısının kendisi, orijinal gelen isteğin hangi ayrıntı düzeyini
kullandığına bakılmaksızın her zaman yüksek ayrıntı ister. Bu yalnızca dahili
describe istek gövdesini etkiler; OmniRoute'un çağıranın kendi
`image_url.detail` değerini birincil istekte nasıl ilettiğini değiştirmez —
bu varsayılan ayrı olarak ve yalnızca algılanan OpenCode istemcileri için
`defaultImageDetail()` içinde (`open-sse/handlers/chatCore/upstreamBody.ts`)
uygulanır. Describe self-loop'unun Anthropic wire-format dalında `detail`
alanı yoktur ve her iki varsayılandan da etkilenmez.

#### Describe çıktı sınırı (`modalityBridgeVisionMaxChars`)

| Anahtar                        | Varsayılan | Aralık             |
| ------------------------------ | ---------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`        | `0` veya 100–50000 |

`0` (varsayılan) **sınır yok** anlamına gelir — `callVisionModel()` tarafından
döndürülen açıklama, mevcut davranış korunarak değiştirilmeden geçirilir.
100–50000 aralığındaki herhangi bir değer, açıklama `[Image N]: <description>`
olarak geri eklenmeden önce onu bir `…` sonekiyle kısaltır
(`src/lib/guardrails/visionBridge.ts` içindeki
`VisionBridgeGuardrail.preCall()`). Alt akış modelinin tam yazıya dökülmüş
metne ihtiyaç duyduğu ayrıntı yoğun OCR görevleri için bunu yükseltin; aşırı
konuşkan görüş modellerinde token kullanımını sınırlamak için düşürün.
Kontrol paneli alanı, Vision sekmesinin Gelişmiş panelinde bulunur
(`ModalityBridgeVisionTab.tsx` içindeki `modality-bridge-max-chars`) ve açık
bir `0` değerine dokunmazken 1 ile 99 arasındaki herhangi bir değeri 100 alt
sınırına yükseltir — `0` kendi başına geçerli bir Zod değeridir
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), yalnızca
"ayarlanmamış" varsayılanı değildir.

#### Describe önbelleği (`modalityBridge/bridgeCache.ts`)

Describe çıktıları için bellek içi LRU + TTL önbelleği; işlem genelinde
paylaşılır. Anahtar = uzunluk önekli çerçevelemeyle
`sha256(imageRef + composedPrompt + configuredBridgeModel)` (alan sınırı
çakışması yok). Model bileşeni, gerçekte yanıt veren model değil,
**yapılandırılmış** köprü modelidir — `callVisionModel` dahili olarak yedek
modele dönebilir ve deneme başına anahtarlama önbelleği parçalardı. Başarısız
describe'lar asla önbelleğe alınmaz. Ayarlar:

| Anahtar                         | Varsayılan | Aralık  |
| ------------------------------- | ---------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`     | —       |
| `modalityBridgeCacheTtlMinutes` | `60`       | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`      | 10–5000 |

#### Uzak görsel normalizasyonu (self-loop describe/base64 getirme)

Köprü **uzak** bir görseli kendisi getirdiğinde — Anthropic describe self-call'u ve claude-wire-format base64 dönüşümü (`ensureBase64ImagesForClaudeWire`), ikisi de `visionBridgeHelpers.ts` içindeki `fetchRemoteImageAsDataUri()` aracılığıyla — elde edilen data URI, vision-model isteğine gömülmeden önce `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) içinden geçirilir. Boyutu aşan görseller **2048px uzun kenara** küçültülür (OpenAI/Anthropic'in sunucu tarafında zaten uyguladığı yeniden boyutlandırma sınırıyla aynı); bu, vision modelinin gördüğünü değiştirmeden yükleme baytlarını/gecikmeyi azaltır. Yeniden boyutlandırma, dinamik import ile yüklenen `sharp` kullanır: yerel ikili dosyasının yüklenemediği bir platformda `normalizeDataUri()` **asla hata fırlatmaz** — orijinal baytların doğrudan geçişine geri döner, böylece describe/base64-dönüşüm yolu her zaman çalışmaya devam eder. Görsel olmayan baytlar (çözümlenebilir bir görsel döndürmeyen bir getirme) da dokunulmadan geçirilir. Bu normalizasyon, köprünün kendi self-call'u için getirdiği görsellerle sınırlıdır — çağıranın ham passthrough yüküne asla uygulanmaz; bu, yalnızca-opt-in mutasyon ilkesiyle tutarlıdır (Katı Kural #20).

#### Ayar şeması + geçiş

Yeni `modalityBridge*` anahtarları `updateSettingsSchema` içinde (`src/shared/validation/settingsSchemas.ts`) Zod ile doğrulanır: `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` üçlüsü ve Audio Bridge tarafından kullanılan `modalityBridgeAudio*` grubu. `141_modality_bridge_settings.sql` geçişi, mevcut eski `visionBridge*` değerlerini karşılık gelen yeni anahtarlara kopyalar (idempotent; operatörün ayarladığı bir `modalityBridge*` değerini asla ezmez); eski anahtarlar bir sürüm döngüsü boyunca okuma yedeği olarak kabul edilmeye devam eder.

#### Şeffaflık başlığı + istatistikler

Describe ile dönüştürülmüş yanıtlar `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` taşır (`modalityBridge/bridgeStats.ts` içindeki `buildModalityBridgeHeader()` tarafından oluşturulur, `src/sse/handlers/chatHelpers.ts` içindeki `withModalityBridgeHeader()` tarafından damgalanır). Yeniden yönlendirilen istekler **hiçbir** başlık almaz — yük dokunulmamıştır ve model değişimi zaten yanıt gövdesinin `model` alanında görünürdür.

`GET /api/modality-bridge/stats` (yönetim kimlik doğrulaması, `GET /api/settings` ile aynı katman) `vision`, `audio` ve `video` için bellek içi modalite başına sayaçları `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` döndürür. `averageLatencyMs`, payda olarak tüm denemeleri değil `latencySamples` değerini kullanır; zamanlaması olmayan bir işlem sıfır milisaniyelik bir örnek uydurmaz. `bridged`, başarılı dönüşümler için geriye dönük uyumlu takma ad olarak kalır; başarısız denemeler onu artırmaz. Sayaçlar, tasarım gereği işlem yeniden başlatıldığında sıfırlanır (telemetri, muhasebe değil).

#### Dashboard yapılandırması

Özel dashboard sayfası `/dashboard/settings/modality-bridge` adresidir. URL ile adreslenebilir `Vision`, `Audio` ve `Video` sekmeleri, `tab` değerini değiştirirken sorgu parametrelerini korur. Vision sekmesi etkinleştirme, mod, model seçimi (otomatik varsayılan dahil), göreve duyarlı prompting, gelişmiş zaman aşımı/görsel/açıklama uzunluğu/önbellek sınırları, çalışma zamanı sayaçları ve korumalı bir örnek istek sunar. Audio sekmesi de canlıdır: etkinleştirme, Auto içeren yalnızca-STT model seçici, zaman aşımı/maksimum klip sınırları, ses sayaçları ve bir `input_audio` örnek testi sunar. Video sekmesi işlevseldir: FFmpeg/ffprobe çalışma zamanı durumunu bildirir — dört açık UI durumundan biri (yoklama sürerken veya tamamlanamadığında `unknown`, yoklamanın istemci tarafında atlandığı loopback olmayan bir dashboard ana bilgisayarında `restricted`, yoklanıp eksik olduğu doğrulandığında `unavailable` veya FFmpeg/ffprobe sürümleriyle birlikte `available`) — etkinleştirme/model/kare/video/zaman aşımı sınırlarını kalıcı hale getirir, model seçiciyi vision yetenekli modellerle filtreler ve video sayaçlarını sunar.

AI ayarları altındaki eski Vision Bridge kartı, yeni sayfaya bir uyumluluk bağlantısıdır; artık formun ikinci bir kopyasına sahip değildir. Media Providers ayrıca Image-to-Text ve Speech-to-Text iş akışlarını, mevcut Speech-to-Text playground'unu kaldırmadan ilgili Modality Bridge sekmelerine bağlar.

**Self-loop admission bypass:** describe çağrısı OmniRoute'un kendi `/v1` self-loop'u üzerinden yönlendirildiğinde (standart olmayan sağlayıcı modeli), alt istek `x-omniroute-admission-bypass: internal` gönderir ve çözümlenmiş self-loop kimlik bilgisiyle kimliği doğrulanır — yerel modda yerel `sk_omniroute` sentinel'i veya operatörün yapılandırdığı `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` ortam anahtarı (#1350); böylece `REQUIRE_API_KEY=true` dağıtımları describe çağrısını yine de çalıştırabilir. Bypass yalnızca tam olarak bu kimlik bilgileri için kabul edilir; dolayısıyla harici istemciler bu başlığı admission'ı atlamak için kullanamaz.

Eski varsayılanlar `src/shared/constants/visionBridgeDefaults.ts` içinde bulunur; yeni mod/göreve duyarlı/önbellek varsayılanları ve ayar çözümleyicisi `src/shared/constants/modalityBridgeDefaults.ts` içinde bulunur. Guardrail, testlerin sahte `getSettings` ve `callVisionModel` implementasyonları enjekte edebilmesi için bir `deps` constructor seçeneği sunar.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Ses içeren sohbet isteklerini, ses girişini kabul ettiği bilinmeyen bir hedefe ulaşmadan önce yakalar. Sohbet isteğini asla yeniden yönlendirmez: ses parçaları mevcut OpenAI uyumlu multipart uç noktası üzerinden metne dönüştürülür ve seçilen sohbet modeli metin transkriptleriyle devam eder.

Akış:

1. `supportsAudio` değerini `getResolvedModelCapabilities()` aracılığıyla çözümleyin. Açık sağlayıcı kayıt defteri (provider-registry) meta verisi öncelik kazanır, ardından statik model meta verisi, sonra senkronize edilmiş `modalities_input` gelir. `audio` içermeyen bildirilmiş bir girdi listesi `false` değerini verir; yetenek kanıtı yoksa `null` kalır. Hem `false` hem de `null` muhafazakâr köprüyü etkinleştirirken, `true` köprüyü atlar.
2. `modalityBridgeAudio*` ayarlarını çözümleyin ve paylaşılan `detectMediaParts()` algılayıcısı aracılığıyla her mesajdan kesilip çıkarılabilir (spliceable) üst düzey ses parçalarını ayıklayın. Desteklenen hat (wire) biçimleri OpenAI `input_audio`, `audio_url` ve `source.media_type: "audio/*"` şeklindedir. İç içe geçmiş ses, yönlendirme için algılanır ancak kesip çıkarma (splice) yolu tarafından kaldırılmaz. İş, `modalityBridgeAudioMaxClips` ile üst sınırlanır; sonraki parçalar dokunulmadan kalır.
3. Yapılandırılmış bir `provider/model` değerine uyun veya `selectAudioBridgeModel()` fonksiyonunun `AUDIO_TRANSCRIPTION_PROVIDERS` listesini kararlı katalog sırasıyla gezmesine ve kullanılabilir bir aktif sağlayıcı kimlik bilgisine sahip ilk modeli seçmesine izin verin.
4. `callAudioTranscription()`, base64/data-URI sesini çok parçalı (multipart) bir `file` öğesine dönüştürür veya uzak bir `audio_url` adresini DNS sabitleme (pinning) ve 25 MB sınırına sahip yalnızca-genel giden bağlantı koruması üzerinden indirir. Ardından dosyayı ve seçilen modeli, `resolveSelfLoopBearer()` ile kimliği doğrulanmış yerel `/v1/audio/transcriptions` kendine-döngüsüne (self-loop) POST eder. Mevcut transkripsiyon rotası normal kimlik bilgisi araması, cooldown/rate-limit işleme ve sağlayıcı dağıtımı gerçekleştirir.
5. Başarılı çağrılar, parçalarını `[Audio N]: <transcript>` ile değiştirir. Çağrılar `Promise.allSettled` ile çalışır: tek bir hata, ilgili özgün ses parçasını korur (#4012 sözleşmesi). Tüm çağrılar başarısız olursa ve hedefin `supportsAudio === false` olduğu kanıtlanmışsa, parçalar `[Audio N]: (unavailable — no STT provider connected)` haline gelir (#8430 sözleşmesi). Bilinmeyen bir hedef (`null`) için, tamamen başarısız bir sonuç dokunulmadan kalır. Kullanılabilir STT kimlik bilgisi olmayan, kanıtlanmış salt-metin bir hedef, ağ çağrısı yapılmadan aynı açık saplamayı (stub) alır.

Başarılı transkriptler, işlem genelindeki Modality Bridge LRU/TTL önbelleğini kullanır. Anahtar; ses referansını, kararlı `audio-transcription` işlem etiketini ve seçilen STT modelini birleştirir; hatalar asla önbelleğe alınmaz. Ses denemeleri, paylaşılan `bridged`, `cacheHits`, `failures` ve `lastUsedAt` sayaçlarını günceller. Dönüştürülen yanıtlar `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` başlığını taşır; dokunulmamış istekler bir Audio Bridge bölümü almaz.

Çalışma zamanı ayarları veritabanı desteklidir ve Zod ile doğrulanır:

| Anahtar                       | Varsayılan | Aralık                    |
| ----------------------------- | ---------- | ------------------------- |
| `modalityBridgeAudioEnabled`  | `true`     | —                         |
| `modalityBridgeAudioModel`    | `""`       | Otomatik veya STT kimliği |
| `modalityBridgeAudioTimeout`  | `60000`    | 1000–300000               |
| `modalityBridgeAudioMaxClips` | `3`        | 1–10                      |

Paylaşılan önbellek, `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` ve `modalityBridgeCacheMaxEntries` tarafından kontrol edilmeye devam eder.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Bilinen yerel video desteği olmayan bir hedef çağrılmadan önce, Chat Completions `messages` ve Responses API `input` içindeki üst düzey video parçalarını yakalar. Desteklenen biçimler `input_video`, `video_url`, `video_source`, HTTPS URL'leri ve `data:video/*;base64,...` data URI'leridir. Metin içindeki düz dosya adları video olarak ele alınmaz.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`), istek dolaşımını, yetenek/politika denetimini, istek başına toplamayı ve yanıt yükünü üstlenir. Video başına iş — edinim, tam-sonuç önbelleği, bir kare dizisini tanımlama (çağıranın bildirdiği herhangi bir ses transkriptini birleştirir) ve deneme başına metrikler/iptal/temizlik — `preCall` döngüsü içinde her video parçası için bir kez çağrılan, `videoBridgePipeline.ts` içindeki `processVideoPart` arkasına gizlenmiştir. Bu modül ayrıca açık port sınırlarını da tanımlar: `VideoMediaBrokerPort` (baytları edinme ve örneklenmiş kareleri çıkarma), `VideoAudioTranscriptionPort` (çağıranın bildirdiği bir ses transkriptini örneklenmiş kare açıklamalarıyla birleştirme) ve `VideoDrilldownPort` (kare drill-down kalıcılık sınırı; henüz `processVideoPart`'a bağlanmadı — bugün yalnızca ayrı `/api/modality-bridge/video/drilldown` rotası drill-down girdileri yazar).

Genel `/v1` istek yolu asla bir alt işlem (subprocess) içe aktarmaz veya çağırmaz. Uzak videolar 50 MiB sınırı altında indirilir; satır içi base64 videolar, model/mesajlar/çerçeveleme zarfının 50 MiB genel JSON istek kabul sınırı içinde kalabilmesi için video başına muhafazakâr 36 MiB çözülmüş (decoded) üst sınırına sahiptir. Satır içi uzunluk ve çözülmüş boyut tahminleri, bellek ayırma öncesinde denetlenir. Mevcut yalnızca-genel giden bağlantı koruması DNS sabitleme ile kullanılarak, başlangıç uzak URL'si ve her yönlendirme için HTTPS zorunludur. Baytlar daha sonra tam olarak iç `POST /api/modality-bridge/video/extract` aracı (broker) sınırından geçer. Bu rota hem `LOCAL_ONLY` hem de `SPAWN_CAPABLE`'dır, yalnızca işlem başına kimliği doğrulanmış, güvenilir geri döngü (trusted-loopback) isteklerini kabul eder ve asla bir URL, dosya sistemi yolu, yürütülebilir dosya veya argüman listesi kabul etmez. API gövde boyutu hattı ve işleyicinin artımlı gövde okuyucusu, birbirinden bağımsız olarak 50 MiB aracı girdi üst sınırını uygular. Sınırlı kuyruğu aynı anda tek bir çıkarım çalıştırır, dört bekleyen işe izin verir ve bekleyen girdi toplamını 100 MiB ile sınırlar.

Aracının içinde `ffprobe` özel bir yerel dosya okur; sabit format izin listesi, oynatma listesi ve manifest formatlarını hariç tutar. İzin verilen MOV ailesi kapsayıcılar için harici MOV veri referansları varsayılan olarak devre dışı kalır ve sabit komut bunları etkinleştirmeyi seçmez. Hem `ffprobe` hem de `ffmpeg`; yalnızca `file` protokolü beyaz listesini, tek iş parçacığını, sabit argüman dizilerini, kabuk kullanmamayı ve `PATH` üzerinden çözümlenen çalıştırılabilir dosyaları kullanır. Ekli resim kapak akışları oynatılabilir aday değildir. Tüm oynatılabilir akışlar sınırları karşılamalıdır ve deterministik en düşük indeksli geri dönüşten önce açık bir varsayılan akış tercih edilir. Videolar 600 saniye, boyut başına 8.192 piksel ve 33.554.432 kaynak piksel ile sınırlıdır. FFmpeg, 1–16 orta nokta JPEG karesi örnekler, daha küçük girdileri büyütmeden uzun kenarı en fazla 1.024 piksele küçültür ve asla bir URL almaz. Örnekleme varsayılan olarak `uniform` şeklindedir. İsteğe bağlı `scene_aware` ve deneysel `segment_aware` politikaları, halihazırda doğrulanmış yerel akış üzerinde ek bir sabit FFmpeg geçişi gerçekleştirir, sınırlı `showinfo` sahne zaman damgaları seçer ve dedektör hatası, zaman aşımı, bozuk çıktı veya boş bir aday kümesi durumunda deterministik olarak aynı tekdüzen orta noktalara geri döner. Segment-duyarlı mod, orta nokta örneklerini doğrulanmış sahne aralıklarıyla orantılı olarak tahsis eder; segment-duyarlı kanıt ve geri dönüş davranışı aşağıda ayrıntılı olarak açıklanmıştır. Katı 16 kare üst sınırı her politikada seçimden sonra uygulanır. Sahne-duyarlı bir isteğin yalnızca tek karelik bütçesi olduğunda, etkin tam video veya odak penceresinin tekdüzen orta noktasını kullanır ve `policyEffective: uniform` bildirir: seçilen tek bir sahne karesi her iki zamansal ucu da koruyamaz. Çağıran isteğe bağlı olarak sonlu bir odak penceresi (`start`/`end` saniye cinsinden) sağlayabilir; sınırlar medya süresine kırpılır, ters çevrilmiş veya sonlu olmayan pencereler reddedilir ve tüm örnekleme politikaları yalnızca normalize edilmiş aralık içinde gerçekleştirilir. Elde edilen pencere, örnekleme metaverilerine ve güvenilmeyen açıklama önekine dahil edilir; böylece sonraki modeller odaklanmış bir kesiti tam zaman çizelgesinden ayırt edebilir.

Anlamsal açıklama odağı ayrı ve açık bir ayardır. Varsayılan `full` analiz modu mevcut kare istemini korur ve istek metnini asla açıklama modeline iletmez. `focused` modunda köprü, aynı Chat veya Responses kapsayıcısından yalnızca kullanıcı tarafından yazılmış en son boş olmayan `text`/`input_text` değerini okur, bunu NFC'ye normalize eder, kontrol karakterlerini ve boşlukları daraltır ve 500 Unicode kod noktasıyla sınırlar. Boş bir sonuç tam olarak `full` istemine geri döner. Kullanılabilir bir ipucu, ayrılmış bir güvenilmeyen-kullanıcı-bağlamı bloğunda JSON olarak serileştirilir ve yalnızca gözlemlenebilir ayrıntıları önceliklendirebilir; medyada görünen veya duyulan talimatları izlemeye karşı olan ayrı uyarıyı geçersiz kılamaz. Metinsel odak asla `start`/`end` çıkarımında bulunmaz ve zamansal örnekleyiciyi değiştirmez.

#### FU-07 yapısal segment kanıtı

`segment_aware`, halihazırda doğrulanmış yerel video akışı üzerinde tek bir sınırlı ön analiz geçişi kullanır. Sabit filtre zinciri önce en fazla 320 piksel genişliğe ölçekler, sahne değişimlerini ve donmuş aralıkları tespit eder, ardından bulanıklık, ortalama luma ve uzamsal/zamansal bilgi için saniyede 1 kare örnekler. Geçiş; 600 yapısal örnek, tek FFmpeg/filtre iş parçacığı, aynı yalnızca-`file` protokol ve kapsayıcı izin listeleri, 1 MiB süreç çıktısı sınırı ve aracının paylaşılan iptal/son tarih sınırı içinde en fazla 30 saniye ile sınırlıdır. İstekten asla komut, filtre, yol veya URL kabul etmez.

Yapısal değerler anlamsal video anlayışı değil, deterministik örnekleme kanıtıdır. Özne, eylem, açıklama, konuşma veya kullanıcı amacı çıkarsamazlar. Sahne ve donma sınırları segmentleri oluşturur; donma kapsamı, bulanıklık, pozlama, uzamsal ayrıntı ve zamansal değişim yalnızca mevcut 1–16 kare bütçesinin nasıl tahsis edileceğini etkiler. Tamamen donmuş bir segment bir kareyle sınırlandırılır; donmamış segmentler kalan bütçe için yarışır. Sınırların sayısı kareleri aştığında, hızlı erken kesmeler uzun bir sondaki segmenti gizleyemesin diye tekdüzen zaman çizelgesi kapsamı korunur. Bir donma sınırının 1 saniyelik analiz çözünürlüğü içinde kalan sahne sınırları birleştirilir.

Eksik filtreler, bozuk/boş kanıt, dedektör hatası veya sınırlı ön analiz zaman aşımı, fail-open davranışıyla tam tekdüzen orta nokta politikasına geri döner. Bir çağıran iptali veya aracı son tarihi ise fail-open davranmaz: devam eden alt süreci sonlandırır, sonraki kare çıkarımını engeller ve özel geçici dizin ağacı `finally` içinde kaldırılır.

`scripts/perf/video-bridge-fu07-eval.ts`; tekilleştirme sonrası açıklama çağrısı tasarrufları, yoğun hareket bütçe tahsisi, bulanıklık/pozlama/SI-TI kanıtı, uzun kuyruklu hızlı kesmeler ve kademeli kararma yanlış pozitifleri için deterministik gerçek FFmpeg fikstürleri üretir. Ön analiz duvar saati süresini ve `/usr/bin/time` mevcut olduğunda alt süreç CPU kullanımı ile tepe RSS değerini kaydeder. Kalite kontrolleri yalnızca yapısal oracle'lardır. Bu test düzeneğinin yetkili bir uç noktası veya dondurulmuş bir değerlendiricisi olmadığı için gerçek açıklama modeli kalitesi `HOLD` olarak kalır. `--caption-cost-per-call-usd` açık ve pozitif bir çağrı başına maliyet tahmini sağlamadıkça parasal tasarruflar da `HOLD` olarak kalır; betik bu sonuçların ikisini de asla uydurmaz.

Her kare 4 MiB ile, tüm ham kareler toplamda 23 MiB ile ve serileştirilmiş broker yanıtı 32 MiB ile sınırlıdır. Özel bir geçici dizin `finally` içinde kaldırılır. OmniRoute, FFmpeg'i pakete dahil etmez ve özel bir yürütülebilir dosya yolu kabul etmez. Altyazılamadan önce köprü, ihtiyatlı bir görsel tekilleştirme geçişi uygular: her JPEG 16×16 gri tonlamalı bir arabelleğe indirgenir ve yalnızca saklanan son kareyle karşılaştırılır. Bir karenin üzerinde istenen bir altyazı bütçesi için çıkarma, bu bütçenin en fazla iki katına kadar ve asla 16 kareden fazla olmayan sınırlı bir aday havuzu sağlar. İstenen üst sınır yalnızca tekilleştirmeden sonra uygulanır; bütçe en az iki olduğunda son inceltme sırasında ilk ve son seçilen adaylar korunur. Sürümlendirilmiş `grayscale-16x16-mean-cells-v2` ilkesi, ortalama luma farkı ile normalize farkı en az 0.05 olan küçük resim hücrelerinin oranı arasından büyük olanı kullanır. Yinelenen eşiği, çalışma zamanı ayarı olarak sunulmak yerine öngörülebilirlik için seçilen 0.04 sabitidir. Bu ikincil yüksek kontrast sinyali, yalnızca ortalamaya dayalı bir karşılaştırmanın gizleyebileceği küçük hareketleri ve görünür metin değişikliklerini korur. Karşılaştırıcı veya kod çözücü hataları açık başarısız (fail-open) olur ve kapsamı korur. Çıktı meta verileri; çıkarılan adayları, başarıyla kullanılan kareleri ve atılan görsel yinelenenleri birbirinden ayırır.

Açıkça işaretlenmiş bir video bölümü, zaman damgalı bir kontak sayfası (contact sheet) isteyebilir. Köprü en fazla 4 sütunlu, 16 kareli bir JPEG ızgarası oluşturur. Her 512 piksellik hücre, kaynak zaman damgasını yüksek kontrastlı bir alt banda işler; aynı zaman damgaları, aşağı akışta ilişkilendirme ve denetim için metinsel meta verilerde de kalır. Tam JPEG 32 MiB sınırında tutulur. `sharp` ızgaranın kodunu çözemezse veya ızgarayı oluşturamazsa köprü, tek tek JPEG karelerine geri döner; bir istemci iptali yine de sayfa işlemi boyunca yayılır.

Yükseltme kanıtı, sentetik bileşim mikro kıyaslamasından kasıtlı olarak ayrı tutulur. `scripts/perf/video-bridge-contact-sheet-eval.ts`, gerçek OpenAI uyumlu görü modelleri için şema sürümlü bir A/B test düzeneği tanımlar. Düzenek; sağlayıcının bildirdiği token'ları, uçtan uca duvar saati gecikmesini (sayfa bileşimi dahil), model çağrısı sayısını ve manifestte tanımlanan olgu tutmayı ölçer. Ham model yanıtları rapora yazılmaz; yalnızca SHA-256 özetleri ve eşleşen olgu kimlikleri saklanır. `--execute-real` geçilmedikçe ve `--model`, `OMNIROUTE_BASE_URL` ile `OMNIROUTE_API_KEY` yapılandırılmadıkça düzenek hiçbir ağ veya ücretli model çağrısı yapmaz. Bu açık gerçek çalıştırma olmadan, makine tarafından okunabilir kararı `HOLD` olarak kalır; tek başına sentetik yük/çağrı sayısı ölçümleri yükseltme kanıtı sayılmaz.

Çağıranlar, hizalanmış metne zaten sahip olduklarında desteklenen bir video bölümüne isteğe bağlı bir `transcript.cues` dizisi ekleyebilir. Her işaret (cue); `text`, saptanan sürenin içinde sonlu bir `start`/`end` aralığı ve beyaz listeye alınmış bir `source` (`client`, `embedded` veya `audio-bridge`) taşımalıdır; `confidence` varsayılan olarak `1` olur ve `0` ile `1` arasında kalmalıdır. Tamamen aynı olan işaretler birleştirilir. OmniRoute bu meta verilerden asla transkripsiyon başlatmaz: doğrulanan işaretler; kaynak, güven düzeyi ve aralık bilgisiyle birlikte açıklanan sonuca kopyalanır ve kare altyazılarının yanında güvenilmeyen gözlemler olarak sunulur. Geçersiz, aralık dışı veya kökeni belirtilmemiş metin, altyazı akışına karıştırılmak yerine reddedilir. İstek gövdesindeki her iki transkript kanalı da, kendiliğinden beyan edilen `embedded` veya `audio-bridge` etiketleri dahil olmak üzere, sağlanan kökeni `client` olarak normalleştirir. Bu güvenilir etiketleri yalnızca sunucuya ait bir bağdaştırıcı, yalnızca koddan erişilebilen `trustedSource` bağımsız değişkeni aracılığıyla atayabilir; bir istek JSON alanı bu bağımsız değişkene ulaşamaz. Transkript metni, kökeni ne olursa olsun güvenilmeyen, ortamdan türetilmiş içerik olarak kalır ve asla yetkilendirmeyi belirlememelidir.

İleri düzey bir çağıran, aynı video için bir `audioTranscript` parçası sağlayabilir; bu, sunucu transkripsiyonunun kanıtı değil, istemci tarafından sağlanan metin olarak ele alınır. Birleştirme noktası; görsel ve ses gözlemlerini tek bir zaman sınırı ve iptal sinyali altında çalıştırır, bunları ortak bir zaman çizelgesinde sıralar, tamamen aynı olanları birleştirir ve yalnızca bir taraf başarılı olduğunda kısmi bir sonuç bildirir. Geçersiz bir `audioTranscript`, tüm videoyu başarısız kılmak yerine bu kısmi sonuca geriler — görsel açıklama korunur ve ses dalı temizlenmiş bir hata kodu kaydeder. Dal başına kullanılabilirlik, kısmi bayrak ve temizlenmiş hata kodları; açıklanan sonuçta, güvenlik korkuluğu (guardrail) meta verilerinde (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), sonuç önbelleği meta verilerinde ve köprü birleştirme sayaçlarında korunur. Varsayılan Video Bridge yolu, konuşmayı metne dönüştürme çağırmaz veya ikinci bir ortam kopyası indirmez; bu açık parça olmadan yalnızca video olarak kalır.

**Transkript saklama (#12150 P1).** Bu, Video Bridge (kendisi isteğe bağlıdır) bir transkript girdisi oluşturduğunda otomatik olarak uygulanır; ayrı bir saklama bayrağı yoktur. Bir istek herhangi bir transkript girdisi (çağıranın bildirdiği bir `transcript` veya birleştirilmiş bir `audioTranscript`) oluşturduğunda, koruma katmanı bunu `videoBridgeObserved` olarak işaretler ve video açıklamasının redakte edilmiş bir gölge kopyasını üretir. Bu kopya, her girdinin serbest metin gövdesinin `[redacted-video-transcript]` ile değiştirildiği özdeş bir oluşturumdur ve dize birleştirilmeden önce yapılandırılmış girdi alanı değiştirilerek oluşturulur (düzleştirilmiş metin hiçbir zaman ayrıştırılmaz; dolayısıyla `[inaudible]`/`[music]` gibi `]` içeren gövdeler de dahil olmak üzere kötü amaçlı veya sıradan hiçbir girdi içeriği korunamaz). Kalıcı çağrı günlüğündeki istek gövdesi, videodan türetilen her metin bölümünü içerik eşitliğine göre eşleştirilen bu redakte edilmiş gölge kopyayla değiştirir; `fullText` çapası, çağrı öncesi tamamlanmış koruma katmanı yükünden yeniden okunur. Böylece daha sonraki zincir koruma katmanları (10/95 öncelikli PII ve kimlik bilgisi maskeleyicileri) açıklama metnini yerinde yeniden yazdıktan ve sistem istemi/devir/Memory ekleme işlemleri ileti dizisini yeniden şekillendirdikten sonra bile eşleştirme başarılı olur. Modele yukarı akışta gönderilen gövde değişmez. Gözlemlenen bir istek ayrıca kalıcı Memory içeriği oluşturmaz (hem istekten hem de yanıttan türetilen çıkarma işlemleri atlanır); böylece modelin kendi yanıtı transkript metnini Memory içine yansıtamaz.

**Ham video alanları (#12430).** Köprü etkinleştirildiğinde ve yerel video desteği bilinmediğinde veya mevcut olmadığında, tanımlı `transcript`/`audioTranscript` alanları, açıklama başarısızlığından veya bir `maxVideos` sınırından sonra bile `videoBridgeObserved` durumunu etkinleştirir. `null` ve boş dizeler hesaba katılır; mevcut olmayan alanlar ve video dışı meta veriler hesaba katılmaz. Saklanan kopyalarda bu alanlar redakte edilir veya istek atlanır; önbellekler ve Memory devre dışı bırakılır.

Bu geri dönüş yollarında, çağıranın sağladığı geçerli girdiler standart dışı sağlayıcı alanları yerine desteklenen `text`/`input_text` bölümlerine dönüşür. İstekle sağlanan her iki parça da güvenilmeyen `client` gözlemleri olarak kalır ve videonun açıklanmadığını ve zaman damgalarının medyayla karşılaştırılarak doğrulanmadığını açıkça belirten bir uyarı içerir. Mevcut 256 girdi/64 KiB toplam sınırı ve girdi başına sınırlar, iki parça için birlikte uygulanır; zaman damgaları aracının 600 saniyelik üst sınırına ve sağlanan herhangi bir odak penceresine uymalıdır. Geçersiz parçalar rastgele metin olarak iletilmek yerine atılır; birleşik sınırları aşılmadığı sürece geçerli bir eş parça yine de kullanılabilir. Null/boş alanlar metin eklemez. Bu geri dönüş mekanizması herhangi bir medya alma veya transkripsiyon işlemi eklemez. Transkript uzantı alanları, geri dönüş video taşıyıcısından ve onun `video_url`/`source` nesnelerinden kaldırılır. OpenAI aktarım izin listesi katı kalır; yerel desteği bilinmeyen video taşıyıcıları kullanılabilir durumda kalırken, yalnızca metin desteklediği bilinen hedefler güvenli işaretleri korur. Yapılandırılmış redaksiyon gölge kopyaları eklenen transkript metnini korurken, çağırana ait özgün istek değişmeden kalır. Yerel desteğe sahip hedefler ve devre dışı bırakılmış köprüler mevcut atlama davranışlarını korur.

Saklanan ek kopyalar aynı gözlemlenen istek sinyalini kullanır. Koruma katmanı öncesindeki ham istemci isteği anlık görüntüsü, bellekte bekleyen istek ve erken reddedilen istek günlüğü, video bölümlerindeki transkript alanlarını yapısal olarak değiştirir; işlem hattı aşamaları ve bağlam devri tarafından oluşturulan dize istemleri, kalıcı istek gövdesi hedefinde redakte edilir. Kalıcı `video_content_removed` işareti, `previous_response_id` devam işleminin kasıtlı olarak atılan metni yeniden oluşturmak yerine güvenli biçimde başarısız olmasını sağlar. Gözlemlenen bir istek, günlüğe kaydedilmeden önce bölüm başına redaksiyon gölge kopyasını kaybederse veya birkaç video gölge kopyasından yalnızca biri bile daha sonraki istek değişikliklerinin ardından eşleşmezse, kısmen redakte edilmiş bir transkripti saklamak yerine saklanan istek gövdesinin tamamı atlanır.

Gözlemlenen bir istek için model yanıtı, yapılandırılmış bir girdi sınırı olmadan transkriptin herhangi bir bölümünden alıntı yapabilir. Bu nedenle kalıcı çağrı günlüğündeki `responseBody` bir atlama işaretiyle değiştirilir; yukarı akış/istemci gövdelerini ve akış parçalarını içerebilen ayrıntılı işlem hattı yapıtı saklanmaz. Anlamsal, eşgüçlülük ve akıl yürütme yeniden oynatma önbellekleri, bu istek için okuma ve yazma işlemlerini atlar. Sağlayıcı isteği ve istemcinin gördüğü yanıt değişmeden kalır. Ayrıntılı yapıt atlandığında, erken keepalive baytları geçici arabellekten boşaltılır. Kiro'nun hatalı biçimlendirilmiş EventStream uyarısı yalnızca yükün bayt sayısını bildirir; içeriğini veya JSON ayrıştırıcısının ham hatasını hiçbir zaman bildirmez.
Bu, ilişkisiz her sağlayıcı/eklenti tanılamasının denetlendiği anlamına gelmez; saklanan hedeflere yönelik daha geniş kapsamlı tarama #11658 kapsamında izlenmektedir.

Dahili `/api/modality-bridge/video/drilldown` yaşam döngüsü, ayrı bir geri döngü/token doğrulamalı önbellek altyapısıdır. Her işlem ayrıca kanonik ve opak bir güvenlik öznesi kimliği gerektirir. Bir üretim çağırıcısı etkinleştirilmeden önce bu kimliği, kimliği doğrulanmış kiracıdan türetmeli ve istemci tarafından seçilen bir değeri hiçbir zaman iletmemelidir. Önbellek anahtarları bu güvenlik öznesini kanonik oturum ve video referansı kimliklerine bağlar, yalnızca bunların SHA-256 ile türetilmiş anahtarlarını depolar ve hem okumaları hem de silme işlemlerini aynı güvenlik öznesiyle sınırlar. Önbellek, girdi başına en fazla 16 türetilmiş JPEG karesi depolar, bunların süresini on dakika sonra sonlandırır ve sınırlandırılmış `start`/`end` okumalarını veya açık oturum silme işlemlerini destekler.

Her güvenlik öznesi, 16 girdi ve 64 MiB kanonik JPEG verisiyle sınırlandırılmıştır. Bu sınırlar, 64 girdi/256 MiB genel üst sınırından bağımsızdır: güvenlik öznesi kotası üzerindeki baskı, genel LRU tahliyesi değerlendirilmeden önce yalnızca ilgili güvenlik öznesinin en uzun süredir kullanılmayan girdilerini tahliye eder. Süresi dolmuş girdiler, önbellek etkinliği sırasında hem güvenlik öznesi hem de genel hesaplamadan temizlenirken iptal ve doğrulama hataları kısmi bir değiştirme işlemini kaydetmez.

Önbellek; kanonik olmayan Base64'ü, fazla dolguyu, JPEG olmayan medyayı, bozuk veya kesik JPEG'leri ve sınırlı bir tam-görüntü `sharp` çözümlemesi sırasında uyarı üreten JPEG'leri reddeder. Kabul edilen her görüntüyü kanonik bir JPEG olarak yeniden kodlar, genişlik ve yüksekliği çağıran alanlarına güvenmek yerine çözümlenmiş baytlardan türetir ve sondaki polyglot baytları saklamak yerine atar. Her iki kotaya da yalnızca sınırlı kanonik sıkıştırılmış arabellek yansıtılır. JSON hat sınırı, 32 MiB çözümlenmiş-girdi tavanı için Base64 ek yükünü içerir. Saklanan her türetme; doğrulanmış JPEG biçimini/çözünürlüğünü, örnekleme politikasını, türetme sürümünü, oluşturma zamanını, sunucu tarafından hesaplanan içerik karmasını ve karmalanmış üst öğe referansını, ayrıca güvenilir çağıranın üst-içerik karmasını kaydeder. Atomik önbellek işlemesinden önce eşzamansız çözümleme/karma aşamaları arasında iptal kontrol edilir.

Bu dilim, rotaya henüz bir üretim üreticisi bağlamaz ve çok çözünürlüklü varyant seçimi sağlamaz. Şeffaf Video Köprüsü istek yolu bu nedenle ek bir iş yüklemez; kiracıya bağlı asıl (principal) türetme ve tam FU-08 çok çözünürlüklü yaşam döngüsü ise tamamlanmış davranış olarak belgelenmek yerine açık takip çalışması olarak kalır.

Kareler, yapılandırılmış Video modeliyle sırayla açıklanır. Boş bir Video geçersiz kılması Vision ayarını miras alır; ikisi de boşsa, Vision otomatik yönlendiricisi etkin görüş yetenekli modeli seçer. Başarılı açıklamalar, orijinal parçayı kararlı bir `[Video description:` önekiyle değiştirir; bu önek ayrıca metni güvenilmeyen, medyadan türetilmiş bir gözlem olarak işaretler ve aşağı akış modellerine medyada bulunan talimatları izlememelerini söyler. Kare-açıklaması önbellek anahtarları JPEG baytlarını, istemi, zaman damgasını ve etkin modeli içerir; yalnızca başarılı açıklamalar önbelleğe alınır. Önbellek girdileri, bir geri dönüş (fallback) modeli de dahil olmak üzere gerçek başarılı üretici modeli tutar; farklı kareler farklı modeller tarafından üretildiğinde köprü `mixed` bildirir. Bir önbellek isabeti, bu üretici kimliğini istenen yönlendirme planı olarak yeniden etiketlemek yerine yeniden kullanır. Tüm-video sonuç önbelleği, çıktıyı değiştiren her girdiyle anahtarlanır — istem, etkin model, örnekleme politikası, kare sayısı, anlamsal analiz modu, normalleştirilmiş odak ipucunun SHA-256 parmak izi, odak penceresi, `transcript`, `audioTranscript` ve contact-sheet bayrağı — böylece bu boyutlardan herhangi birini değiştirmek bir önbellek ıskalamasıdır, asla bayat bir yeniden kullanım değildir. Görsel tekilleştirme (dedup) politika sürümü, eşiği ve sınırlı aday-kare sayısı da sonuç-önbelleği anahtarında ve meta verilerinde açıktır; bu nedenle bir politika değişikliği bayat bir tüm-video açıklamasını yeniden kullanamaz. Sonuç-önbelleği v4 meta verileri modu ve parmak izini tutar, asla ham kullanıcı görevini tutmaz. Guardrail meta verileri hem istenen hem de etkin analiz modlarını bildirir; kullanılabilir kullanıcı metni olmadan istenen bir `focused` modu, etkin olarak `full` şeklinde bildirilir.

Guardrail, desteklenen her video parçasını çıkarır ancak `modalityBridgeVideoMaxVideos` değerinden fazlasını betimlemez. `supportsVideo === false` olduğu kanıtlanmış bir hedef için, başarısız ve sınırı aşan videolar açık güvenli metin işaretçilerine dönüşür, böylece hiçbir ham video sağ kalmaz. Yetenek bilinmediğinde, bu parçalar video taşıyıcılarını korur; herhangi bir geri dönüş transkripti yukarıdaki sınırlı metin dönüşümünü izler. `supportsVideo === true` olan hedefler köprüyü atlar. İstemci istek iptal sinyali indirme, aracı kuyruğu, alt süreçler ve açıklama çağrıları boyunca yayılır; iptaller videolar arasında durur ve asla ham medyaya açık şekilde başarısız olmaz (fail open).

Çalışma zamanı ayarları veritabanı desteklidir ve Zod ile doğrulanır:

| Anahtar                             | Varsayılan  | Aralık / davranış                                                                                        |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | İsteğe bağlı çalışma zamanı, etkinleştirmeye dayalı (opt-in)                                             |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` genel açıklamaları korur; `focused` sınırlı, güvenilmeyen son-kullanıcı bağlamını kullanır        |
| `modalityBridgeVideoModel`          | `""`        | Vision Köprüsü modelini miras alır                                                                       |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                     |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` veya orantısal `segment_aware`; algılayıcı hatası `uniform` değerine geri döner |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                      |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                           |

120 saniyenin üzerindeki eski (legacy) kalıcı Video zaman aşımı değerleri aracı (broker) son teslim süresine kırpılır; bu sınırın üzerindeki yeni ayar yazmaları reddedilir. `GET /api/modality-bridge/video/runtime`, kimlik doğrulama veya çalışma zamanı yoklamasından önce güvenilir damgalı geri döngü (loopback) yerelliği gerektirir, ardından yönetim kimlik doğrulaması gerektirir. Yalnızca `available`, temizlenmiş FFmpeg/ffprobe sürümleri ve çalışma zamanı kullanılamadığında sabit bir neden döndürür. Dahili çıkarım uç noktası herkese açık bir yükleme API'si değildir: kuyruk doygunluğu `503` artı `Retry-After` döndürür, bir çağıran bağlantı kesmesi `499` döndürür ve sabit aracı son teslim süresi `504` döndürür. Dönüştürülen yanıtlar, Vision veya Ses segmentlerini kaldırmadan merkezi `x-omniroute-modality-bridge` başlığına `video->text;model=<visionModel>;parts=<videos>` ekler.

### PII Maskeleyici (`piiMasker.ts`)

**Her iki** aşamada da çalışır.

- **`preCall`**, yükü klonlar; `system`, `messages`, `input` ve
  `prompt` alanlarını (düz dize öğeleri dahil) gezer ve dize türündeki
  `content`/`text` alanlarına `processPII()` işlevini
  (`@/shared/utils/inputSanitizer` içinden) uygular.
  `PII_REDACTION_ENABLED=true` olduğunda, tespit edilen PII giden yükte
  maskelenir. Bu, `INPUT_SANITIZER_MODE` ayarından bağımsızdır (bu ayar yalnızca
  prompt-injection politikasını kontrol eder). Maskeleme kapalıyken çağrı,
  içeriği yeniden yazmadan yalnızca tespit sayılarını kaydeder.
- **`postCall`**, yanıtı derin klonlar; `sanitizePIIResponse()` işlevini ve
  Responses API biçimine uygun maskeleyiciyi (`maskResponsesOutput` —
  `output_text` ve `output[].content[].text` alanlarını kapsar) çalıştırır.
  Herhangi bir maskeleme gerçekleşirse, değiştirilmiş yanıt orijinalinin yerini alır.

Koruma (guardrail) hiçbir zaman engelleme yapmaz; yalnızca açıklama ekler
(`meta.detections`, `meta.redacted`) ya da içeriği yeniden yazar.

#### Tür bazında seçim, özel desenler ve tespit sayaçları

**Pano → Ayarlar → Güvenlik → PII maskeleme** bölümü, _neyin_ maskeleneceğini
seçer. Maskelemeyi açmaz: bunu hâlâ `PII_REDACTION_ENABLED` (istek) ve
`PII_RESPONSE_SANITIZATION` (yanıt + SSE) yapar; ikisi de varsayılan olarak
kapalıdır.

- **Tür bazında seçim** — yerleşik kimlikler
  `src/shared/constants/piiTypes.ts` dosyasında listelenir (`PII_BUILTIN_TYPES`).
  Ayarlanmamış olması tüm türler anlamına gelir (bu ayar eklenmeden önceki
  davranış). İstek motorundaki `ssn_us` deseni `ssn` ile eşleşir. Şablonlar
  (Minimal, Standart, Finansal, Brezilya, ABD, Tam) yalnızca arayüzdeki onay
  kutularını doldurur.
- **Özel desenler** — en fazla 20 regex veya joker karakter deseni (`*` = en
  fazla 64 boşluk içermeyen karakter, `?` = tek karakter). Eşleşmeler
  `[CUSTOM_REDACTED]` olur. Her desen `compilePiiCustomPattern()`
  işlevinden geçer (`src/shared/utils/piiCustomPatterns.ts`): en fazla 500
  karakter olabilir, flag'ler `g i m s u` ile sınırlıdır, derlenebilmeli,
  `safe-regex` denetiminden (katastrofik geri izleme) geçmeli ve boş bir dizeyle
  ya da bir maskeleme yer tutucusuyla eşleşmemelidir. Doğrulamadan geçemeyen bir
  desen kaydedilirken ve test edilirken reddedilir; başarısız olan kayıtlı bir
  satır ise çalışma zamanında derlenmek yerine atlanır. Özel desenler yalnızca
  maskeleme açıkken çalışır.
- **Tespit sayaçları** — tür başına sayılar (eşleşen değerler asla tutulmaz),
  bellekte saklanır ve yeniden başlatmada sıfırlanır
  (`src/lib/pii/piiDetectionStats.ts`). Yalnızca maskeleme açıkken artarlar.

Ayarlar `key_value` tablosunda tutulur (`pii_settings` ad alanı,
`src/lib/db/piiSettings.ts`) ve 1 saniyelik bir önbellek üzerinden okunur. API:

| Yöntem | Yol                      | Amaç                                                                                         |
| ------ | ------------------------ | -------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Flag durumu, `enabledTypes`, `customPatterns`, tespit sayaçları                              |
| `PUT`  | `/api/settings/pii`      | `enabledTypes` (`null` = tümü) ve/veya `customPatterns` değerlerini değiştirir               |
| `POST` | `/api/settings/pii/test` | Tek bir deseni en fazla 8 KB'lık bir örnekle deneme çalıştırması yapar; hiçbir şey saklanmaz |

Üçü de yönetim kimlik doğrulaması gerektirir ve gövdeyi Zod ile doğrular
(`src/shared/validation/schemas/piiSettings.ts`).

### Prompt Injection (`promptInjection.ts`)

Kullanıcı tarafından sağlanan içerikteki düşmanca yapıları tespit eder ve
yapılandırılmış politikayı uygular. Davranış, ortam değişkenleri ve kurucu
(constructor) seçenekleriyle belirlenir:

| Ayar            | Ortam değişkeni                                                                                            | Varsayılan | Etki                                                                                                                                                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Etkin           | `INPUT_SANITIZER_ENABLED`                                                                                  | `true`     | `false` olduğunda koruma kısa devre yapar.                                                                                                                                                                                  |
| Mod             | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                            | `warn`     | Enjeksiyon politikası: `block`, `warn` veya `log`. (`redact` geriye dönük uyumluluk için kabul edilir ancak enjeksiyon metnini **temizlemez**; istek PII yeniden yazımı `PII_REDACTION_ENABLED` tarafından kontrol edilir.) |
| Engelleme eşiği | `blockThreshold` seçeneği / `INPUT_SANITIZER_BLOCK_THRESHOLD` (takma ad `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`     | Engelleme için gereken minimum önem derecesi. Varsayılanda Orta seviye yalnızca gözlemlenir.                                                                                                                                |

**Mod önceliği** (`getMode`): çağıranın `options.mode` değeri →
`INJECTION_GUARD_MODE` **DB özellik bayrağı geçersiz kılması** (Pano → Ayarlar →
Özellik Bayrakları) → `INJECTION_GUARD_MODE` ortam değişkeni →
`INPUT_SANITIZER_MODE` ortam değişkeni → `warn`. Dolayısıyla pano üzerinden
yapılan bir geçersiz kılma ortam değişkenlerine baskın gelir; böylece Özellik
Bayrakları arayüzü, çalışan korumayı canlı olarak (yeniden başlatma olmadan)
kontrol eder. DB okuması hata güvenliklidir (fail-safe): hata verirse koruma,
ortam tabanlı davranışa geri döner; hiçbir geçersiz kılma ayarlanmadığında ise
davranış, yalnızca ortam değişkenlerine göre çözümlemeyle birebir aynıdır.

Tespit kaynakları:

1. `@/shared/utils/inputSanitizer` içinden `sanitizeRequest()` (işlem hattının
   başka yerlerinde de kullanılan ortak dedektör kümesi).
2. Yerleşik `DEFAULT_GUARD_PATTERNS` (şu anda `system_override_inline` ve
   `markdown_system_block`; ikisi de `high` önem derecesinde).
3. Kurucu seçenekleri aracılığıyla geçirilen isteğe bağlı `customPatterns`
   (dizeler, regex'ler veya `{ name, pattern, severity }` kayıtları).

`mode === "block"` olduğunda **ve** en az bir tespit önem eşiğini
karşıladığında, `preCall` şunu döndürür: `{ block: true, message: "Request
rejected: suspicious content detected" }`. `warn`/`log` modlarında guardrail
kayıt tutar ancak çağrıya izin verir. Paylaşılan yardımcı
`evaluatePromptInjection()`, kayıt defteri (registry) üzerinden geçmeden
istemleri değerlendirmesi gereken çağıranlar için de dışa aktarılır.

**Tarama sınırı (v3.8.20):** algılayıcı, birleştirilmiş istem metninin yalnızca
**ilk 16 KB**'ını inceler — `src/shared/utils/inputSanitizer.ts` içinde
`MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bayt). Hem `detectInjection()`
hem de `evaluatePromptInjection()`, desen döngüsünü çalıştırmadan önce
`slice(0, MAX_INJECTION_SCAN_BYTES)` uygular. Enjeksiyon yönergeleri bir
girdinin başına yakın konumlandığından, bu sınır algılamayı zayıflatmadan
birkaç yüz KB'lık yüklerde regex CPU/GC maliyetini kısıtlar (bkz.
#3932, #4041).

### Kimlik Bilgisi Maskeleyici (`credentialMasker.ts`)

**Her iki** aşamada da çalışır ve varsayılan zincirde en sonda yer alır
(öncelik `95`). Giden yükteki (mesaj içeriği, araç çağrısı bağımsız
değişkenleri, araç sonuçları) **ve** sağlayıcı yanıtındaki iyi bilinen API
anahtarı / gizli token desenlerini gizler; böylece bir isteme yapıştırılan
(veya bir araç sonucu tarafından geri yansıtılan) kimlik bilgisi, yukarı akış
sağlayıcısına veya istemciye sızdırılmaz.

- **Yalnızca isteğe bağlıdır (opt-in)**, PII gizleme ile aynı kuralı izler
  (Katı Kural #20'ye bitişik): `settings.credentialRedactionEnabled === true`
  **veya** `CREDENTIAL_REDACTION_ENABLED=true` olmadıkça devre dışıdır.
  Kapalıyken guardrail bir no-op'tur — asla engellemez ve asla yeniden yazmaz.
- `redactCredentials()`, yük/yanıt ağacının tamamını dolaşır (`walkValue()`,
  prototip kirliliğine karşı güvenli, `WeakSet` aracılığıyla döngü güvenli) ve
  eşleşmeleri `[REDACTED:<type>]` yer tutucusuyla değiştirir; yalnızca
  gerçekten değişen dalları klonlar.
- `CREDENTIAL_PATTERNS`; LLM sağlayıcı anahtarlarını (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS token'larını (GitHub,
  Slack, Linear, Notion, npm, Postman, Discord), ödeme anahtarlarını (Stripe,
  Square), bulut anahtarlarını (AWS erişim anahtarı, Twilio, SendGrid,
  Mailgun), özel anahtarları / JWT'leri, kimlik bilgisi içeren bağlantı
  dizgilerini (`mongodb://user:pass@...` vb.) ve genel bir
  `Authorization`/`x-api-key`/`api-key`/`apikey` başlık-değeri desenini
  kapsar. Başlık biçimli anahtarlar (`authorization`, `x-api-key`, `api-key`,
  `apikey`), genel metin regex'i yerine yapısal olarak gizlenir (yalnızca
  değer gizlenir; `Bearer `/`Basic ` gibi şema öneki korunur).
- Guardrail asla engellemez; yalnızca yeniden yazar (`modifiedPayload` /
  `modifiedResponse`) ve not ekler (`meta.credentialsRedacted`, `meta.count`).

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
