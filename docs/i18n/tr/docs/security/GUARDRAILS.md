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

Devam ediyor **ikisi birden** aşamalar.

- **`preCall`** veriyi klonlar, `system`, `messages`, `input` ve `prompt` (düz dize öğeleri dahil) yürütür ve `content`/`text` dize alanlarına `processPII()` ( `@/shared/utils/inputSanitizer`) uygular. `PII_REDACTION_ENABLED=true` olduğunda, algılanan PII giden veri yükünde düzenlenir. Bu, `INPUT_SANITIZER_MODE` bağımsızdır (yalnızca istem ekleme ilkesini denetler). Redaksiyon kapalıyken çağrı kayıtlarının tespiti, içeriğin yeniden yazılmasına gerek kalmadan sayılır.
- **`postCall`** Yanıtı derin klonlar, `sanitizePIIResponse()` ek olarak Yanıtlar API'si şeklindeki maskeleyiciyi çalıştırır (`maskResponsesOutput` — `output_text` ve `output[].content[].text` kapsar). Herhangi bir düzeltme meydana gelirse, değiştirilen yanıt orijinalin yerine geçer.

Korkuluk asla engellemez; yalnızca açıklama ekler (`meta.detections`, `meta.redacted`) veya yeniden yazar.

#### Türe göre seçim, özel modeller ve tespit sayaçları

**Kontrol Paneli → Ayarları → Güvenliği → PII maskeleme** _neyin_ maskeleneceğini seçer. Maskelemeyi açmaz: bu hala `PII_REDACTION_ENABLED` (istek) ve `PII_RESPONSE_SANITIZATION` (yanıt + SSE), her ikisi de varsayılan olarak kapalıdır.

- **Tür başına seçim** — yerleşik kimlikleri `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`) listelenir. Ayarlanmamış, her tür anlamına gelir (bu ayar mevcut olmadan önceki davranış). İstek motorunun `ssn_us` modeli `ssn` ile eşleşir. Şablonlar (Minimal, Standart, Finansal, Brezilya, USA, GDPR, POPIA, Tam) yalnızca UI onay kutularını doldurur.
- **GDPR ve POPIA tanımlayıcıları** EU ve Güney Afrika kişisel tanımlayıcılarını kapsayan — on iki yerleşik kimlik (aşağıdaki tablo). Regex'leri, doğrulayıcıları ve yetki etiketleri, hem yanıt temizleyicinin (`src/lib/piiSanitizer.ts`) hem de istek maskeleyicinin (`src/shared/utils/inputSanitizer.ts`) tükettiği `src/shared/utils/piiPatterns.ts` adlı tek bir tabloda bulunur. Bir eşleşme yalnızca doğrulayıcısı onu kabul ettiğinde düzenlenir; çıplak bir rakam dizisi asla yeterli değildir. Bu kimlikler var olmadan önce daraltılmış bir seçimi kaydeden operatör, yeni kimlikler işaretlenene kadar sahip olduğu davranışı korur.
- **Özel desenler** — en fazla 20 normal ifade veya joker karakter deseni (`*` = en fazla 64 boşluk olmayan karakter, `?` = bir). Maçlar `[CUSTOM_REDACTED]` olur. Her model `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`) geçer: en fazla 500 karakter, bayraklar `g i m s u` ile sınırlıdır, derlenmeli, `safe-regex` (felaket geri izleme) geçmeli ve boş bir dizeyle veya redaksiyon yer tutucusuyla eşleşmemelidir. Başarısız olan bir model kaydedildiğinde ve test edildiğinde reddedilir ve başarısız olan depolanan bir satır, derlenmek yerine çalışma zamanında atlanır. Özel desenler yalnızca maskeleme açıkken çalışır.
- **Algılama sayaçları** Tür başına — sayıları (hiçbir zaman eşleşmeyen değerler), bellekte tutulur ve yeniden başlatma sırasında sıfırlanır (`src/lib/pii/piiDetectionStats.ts`). Yalnızca maskeleme açıkken artarlar.

Ayarlar `key_value` tablosunda bulunur ( `pii_settings`, `src/lib/db/piiSettings.ts` ad alanı) ve 1 saniyelik önbellek aracılığıyla okunur. API

| Yöntem | Yol                      | Amaç                                                                                         |
| ------ | ------------------------ | -------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Flag durumu, `enabledTypes`, `customPatterns`, tespit sayaçları                              |
| `PUT`  | `/api/settings/pii`      | `enabledTypes` (`null` = tümü) ve/veya `customPatterns` değerlerini değiştirir               |
| `POST` | `/api/settings/pii/test` | Tek bir deseni en fazla 8 KB'lık bir örnekle deneme çalıştırması yapar; hiçbir şey saklanmaz |

Üçü de yönetim yetkilendirmesi gerektirir ve gövdeyi Zod (`src/shared/validation/schemas/piiSettings.ts`) ile doğrular. Oturum açma devre dışıyken (`requireLogin=false`) `GET` ve test uç noktası açıktır ancak `PUT` hâlâ bir kontrol paneli oturumuna, bir `manage` -scope API anahtarına, yazma kapsamına veya daha yüksek bir `oma_` erişim belirtecine veya geri döngüden gönderilen CLI belirtecine veya dahili hizmet belirtecine ihtiyacı vardır.

#### GDPR (EU) ve POPIA (Güney Afrika) tanımlayıcıları

| Kimlik              | Tanımlayıcı                  | Doğrulama                                                                      |
| ------------------- | ---------------------------- | ------------------------------------------------------------------------------ |
| `iban`              | IBAN                         | Bilinen ülke, o ülke için tam uzunluk, ISO 13616 MOD-97-10                     |
| `eu_vat`            | AB KDV numarası              | Bilinen üye devlet öneki ve o devletin numara biçimi (VIES sorgusu yok)        |
| `es_dni_nie`        | İspanya DNI / NIE            | Kontrol harfi (değer mod 23); NIE, `X/Y/Z` + 7 rakamdır                        |
| `it_codice_fiscale` | İtalya Codice Fiscale        | Tek/çift konum tablolarından kontrol harfi                                     |
| `pl_pesel`          | Polonya PESEL                | Ağırlıklı sağlama toplamı ve kodlanmış doğum ayı/günü için makul aralıklar     |
| `nl_bsn`            | Hollanda BSN                 | 11 kontrolü (ağırlıklar 9..2, -1)                                              |
| `de_steuer_id`      | Almanya Steuer-ID            | ISO 7064 Mod 11,10 ve rakam yapısı kuralları (başta 0 yok)                     |
| `se_personnummer`   | İsveç personnummer           | Son on rakama Luhn ve makul doğum tarihi (10 veya 12 rakam)                    |
| `za_id`             | Güney Afrika kimlik numarası | 13 rakamın tümüne Luhn, geçerli doğum ayı/günü, vatandaşlık rakamı 0 veya 1    |
| `za_phone`          | Güney Afrika telefonu        | `+27` / `27` öneki veya boşluk ya da tireyle yazılmış ulusal `0..` biçimi      |
| `za_vat`            | Güney Afrika KDV numarası    | `4` ile başlayan 10 rakam **ve** önceki 48 karakterde "VAT" / "BTW"            |
| `za_tax_ref`        | Güney Afrika vergi referansı | `0`-`3` ile başlayan 10 rakam, Luhn **ve** önceki 48 karakterde "tax" / "SARS" |

Yalnızca rakamlı formatlar sipariş numaraları, yapı numaraları ve zaman damgalarıyla çarpıştığı için en zayıf olanlar (`za_vat`, `za_tax_ref`) anahtar kelime ipucuna ihtiyaç duyar ve on basamaklı basit bir `0..` numarası Güney Afrika telefon numarası olarak değerlendirilmez. Aralıklı IBANs (`GB29 NWBK ...`) eşleşmedi. Akış yolunda işaret yalnızca geçerli parçanın içinde aranır. Kimlikler genel telefon kalıplarının önünde yer aldığından, doğrulanmış bir tanımlayıcı kendi yer tutucusunu korur (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). `gdpr` ve `popia` şablonları sırasıyla EU ve Güney Afrika kimliklerini seçer. Maskeleme isteğe bağlı olarak kalır (Zor Kural #20): burada hiçbir şey varsayılan özellik bayrağını değiştirmez.

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
