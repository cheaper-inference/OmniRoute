# Guardrails (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Həqiqət mənbəyi:** `src/lib/guardrails/`
> **Son yenilənmə:** 2026-08-29 — v3.8.51 (Video Bridge transkriptinin mənşəyi çağıran tərəf tərəfindən bəyan edilir,
> hələ server tərəfindən təsdiqlənmir — #11661 əsasında dəqiqləşdirilib)

Qoruyucu mexanizmlər OmniRoute ilə yuxarı axın provayderləri arasındakı sərhəddə
təhlükəsizlik, siyasət və məzmun transformasiyalarını təmin edir. Hər bir qoruyucu mexanizm
sorğu faydalı yüklərini (`preCall`) və yuxarı axın cavablarını (`postCall`) yoxlaya
(və istəyə görə rədd edə, transformasiya edə və ya annotasiya edə) bilər.

Sistem **xəta zamanı açıqdır**: qoruyucu mexanizm icra zamanı xəta atarsa, reyestr
xətanı qeydə alır və sorğunu uğursuz etmək əvəzinə növbəti qoruyucu mexanizmlə
davam edir. Bloklama heç vaxt təsadüf deyil, açıq şəkildə verilən qərardır (`block: true`).

## Daxili Qoruyucu Mexanizmlər

Reyestr import zamanı altı qoruyucu mexanizmi prioritet sırası ilə avtomatik yükləyir
(baxın: `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Ad                  | Mərhələ(lər)   | Fayl                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Daha aşağı prioritet nömrələri **birinci** icra olunur.

### Görüntü Körpüsü (`visionBridge.ts`) — Modallıq Körpüsü PR-1

**Görüntü dəstəkləməyən modellərə** yönəldilmiş və şəkil ehtiva edən sorğuları tutur və ya bütün sorğunu görüntü dəstəkli modelə yenidən yönləndirir, ya da yuxarı axın çağırışından əvvəl şəkil hissələrini konfiqurasiya edilə bilən görüntü modeli tərəfindən yaradılmış mətn təsvirləri ilə əvəz edir. Bu, yalnız mətn dəstəkləyən provayderlərə multimodal faydalı yükləri şəffaf şəkildə emal etməyə imkan verir.

Axın:

1. Hədəf model artıq görüntünü dəstəkləyirsə, keçin (model məcburi körpü siyahısında `isVisionBridgeForcedModel` olmadığı halda).
2. Şəkil hissələrini `extractImageParts(messages)` vasitəsilə çıxarın
   (`visionBridgeHelpers.ts`); bu funksiya combo uyğunluq filtri ilə paylaşılan vahid həqiqət mənbəyi olan `open-sse/utils/mediaParts.ts` faylındakı **vahid media detektoruna** `detectMediaParts()` həvalə edir.
   Çıxarma əməliyyatı `replaceImageParts` funksiyasının yenidən yerləşdirə bildiyi formalardakı üst səviyyəli hissələrin icazə siyahısı ilə məhdudlaşdırılıb (çıxarma↔əvəzləmə müqaviləsi): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` və Responses API `input_image`. İç-içə uyğunluqlar və
   yalnız göstəricidən ibarət formalar combo filtr materialıdır və heç vaxt çıxarılmır.
   Heç biri tapılmadıqda keçin.
3. İcra vaxtı konfiqurasiyasını `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`) vasitəsilə müəyyənləşdirin: yeni `modalityBridge*`
   parametr açarları üstünlük təşkil edir; köhnə `visionBridge*` açarları isə **bir dövrlük
   ehtiyat variant** (geri qaytarma pəncərəsi) kimi qalır. Körpü deaktivdirsə, hər hansı media keçidindən əvvəl keçin.
4. Rejim seçicisi (`modalityBridgeVisionMode`, aşağıdakı cədvələ baxın)
   yenidən yönləndirmə və ya təsvir etmə arasında seçim edir. Yenidən yönləndirmə yalnız `model`
   dəyişdirilmiş `modifiedPayload`, həmçinin `{ rerouted, fromModel, toModel, imagesKept }` metadatasını qaytarır.
5. Təsvir yolu: şəkillərin sayını `maxImages` ilə məhdudlaşdırır, tapşırığı nəzərə alan sorğunu tərtib edir,
   təsvir keşini yoxlayır, görüntü modelini **paralel şəkildə**
   (`Promise.allSettled`) çağırır və onların yerinə `[Image N]: <description>` mətn hissələrini
   əlavə edir. Uğursuz təsvir `null` qaytarır və orijinal şəkil hissəsi
   **qorunur** (#4012) — bütün təsvirlərin uğursuz olduğu combo təsvir yolu istisnadır; bu halda görüntünü dəstəkləmədiyi təsdiqlənmiş yuxarı axına
   `(əlçatan deyil — görüntü dəstəkli heç bir provayder qoşulmayıb)` əvəzedicisi ötürülür (#8430).
6. `modifiedPayload` və metadatanı (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`) qaytarın.

#### Rejim seçicisi (`modalityBridgeVisionMode`)

| Rejim      | İlkin dəyər | Davranış                                                                                                                                                                                                                                                                                                                |
| ---------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔           | Köhnə evristika dəyişdirilmədən saxlanılıb (#6640/#7204): combo olmayan/`auto/` modellər, orijinal modelin istifadəyə yararlı etimadnamələri olmadığı halda, ən yaxşı görüntü modelinə yenidən yönləndirilir (olduqda təsvir edilir); combo hədəflər həmişə təsvir edilir.                                              |
| `describe` |             | Həmişə təsvir et — yenidən yönləndirmə bloku tamamilə ötürülür; həmişə istifadəçinin seçdiyi model cavab verir.                                                                                                                                                                                                         |
| `reroute`  |             | Məcburi yenidən yönləndirmə: etimadnaməsi olan modeli saxlama qoruması nəzərə alınmır. Yenidən yönləndirmə **hədəfinin** etimadnamə qoruması hələ də tətbiq olunur — istifadəyə yararlı görüntü hədəfi olmadıqda, xam şəkillərin yalnız mətn dəstəkləyən arxa xidmətə çatmaması üçün sorğu təsvir yoluna keçir (#8430). |

Məcburi rejimlər avtomatik evristika işə düşməzdən **əvvəl** qısa qapanma yaradır; `auto` davranışı
PR-1-dən əvvəlki qoruyucu mexanizmlə bayt səviyyəsində eynidir.

#### API açarının əhatə dairəsi (`visionBridgeKeyScope.ts`)

Çağıranın API açarı `allowedConnections`, kvota hovuzlarını
(`allowedQuotas`) və ya modelləri (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`) məhdudlaşdırdıqda, körpü yalnız açarın istifadə edə biləcəyi bağlantılarda və açarın istifadəsinə icazə verilmiş yenidən yönləndirmə və təsvir modellərini seçir. Bundan sonra təsvir çağırışı həmişə `x-omniroute-self-loop-key-id` başlığı ilə OmniRoute özünədövrəsi üzərindən keçir ki, qəbul edən söhbət sorğusu həmin açarın bağlantı və model siyasətini yenidən tətbiq etsin. `enforceApiKeyPolicy()`
bu başlığı yalnız özünədövrə bearer-i ilə birlikdə nəzərə alır, buna görə də o, yalnız girişi daralda bilər və uyğun nəticə verməyən id rədd edilir.

Açar üçün heç bir görüntü modelinə icazə verilmirsə, təsvir yolu kənara çəkilir və
sorğu dəyişdirilmədən ötürülür; bu, deaktiv edilmiş qoruyucu mexanizmin xətada açıq qalma davranışı ilə eynidir (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Açarsız sorğular və bu məhdudiyyətləri olmayan açarlar əvvəlki kimi davranır.

#### Tapşırığı nəzərə alan təsvir sorğusu (`modalityBridgeVisionTaskAware`)

Standart olaraq **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) əsas
təsvir sorğusuna **son istifadəçi mesajının** mətnini (500 simvoladək qısaldılmış)
əlavə edir, təsviri istifadəçinin əslində soruşduğu istiqamətə yönəldir
(codex-vision-proxy nümunəsi) və görmə modelindən görünən mətni transkripsiya etməsini
istəyir. Bayraq söndürülübsə — və ya istifadəçi mətni yoxdursa — əsas sorğu dəyişdirilmədən istifadə olunur.

Təsvirin özünə yönələn dövrünün OpenAI-uyğun sorğusu (`callVisionModelSingle()`
`visionBridgeHelpers.ts` daxilində) həmişə `image_url.detail: "high"` tələb edir —
şərtsiz olaraq, hər bir çağıran/provayder üçün və heç bir müştəri siqnalından asılı
olmadan. Aşağı detallı seçmə məhz bu sorğunun tələb etdiyi mətn transkripsiyası
tapşırığında OCR dəqiqliyini azaldır, buna görə də ilkin daxil olan sorğuda hansı
detal səviyyəsinin istifadə edilməsindən asılı olmayaraq, təsvir çağırışının özü
həmişə yüksək detal tələb edir. Bu, yalnız daxili təsvir sorğusunun gövdəsinə təsir
edir; OmniRoute-un əsas sorğuda çağıranın öz `image_url.detail` dəyərini necə
ötürdüyünü dəyişmir — həmin standart ayrıca və yalnız aşkarlanmış OpenCode
müştəriləri üçün `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`)
daxilində tətbiq olunur. Təsvirin özünə yönələn dövrünün Anthropic kabel-formatı
şaxəsində `detail` sahəsi yoxdur və o, hər iki standartdan təsirlənmir.

#### Təsvir çıxışı limiti (`modalityBridgeVisionMaxChars`)

| Açar                           | Standart | Aralıq              |
| ------------------------------ | -------- | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`      | `0` və ya 100–50000 |

`0` (standart) **limit yoxdur** deməkdir — `callVisionModel()` tərəfindən qaytarılan
təsvir dəyişdirilmədən ötürülür və mövcud davranış qorunur. 100–50000 aralığındakı
istənilən dəyər, təsvir `[Image N]: <description>` kimi yenidən yerləşdirilməzdən
əvvəl onu `…` sonluğu ilə qısaldır
(`VisionBridgeGuardrail.preCall()` `src/lib/guardrails/visionBridge.ts` daxilində).
Aşağı axındakı modelin tam transkripsiyaya ehtiyac duyduğu, çox detallı OCR
tapşırıqları üçün bunu artırın; çox danışan görmə modellərində token istifadəsini
məhdudlaşdırmaq üçün isə azaldın. İdarəetmə panelindəki sahə Vision nişanının
Advanced panelində yerləşir (`modality-bridge-max-chars`
`ModalityBridgeVisionTab.tsx` daxilində) və açıq şəkildə göstərilən `0` dəyərinə
toxunmadan 1 ilə 99 arasındakı istənilən dəyəri minimum 100 həddinə qaldırır —
`0` sadəcə “təyin edilməyib” standartı deyil, özü etibarlı Zod dəyəridir
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`).

#### Təsvir keş yaddaşı (`modalityBridge/bridgeCache.ts`)

Təsvir çıxışları üçün proses miqyasında ortaq istifadə edilən yaddaşdaxili LRU + TTL keşi.
Açar = `sha256(imageRef + composedPrompt + configuredBridgeModel)`, uzunluq prefiksli
çərçivələmə ilə (sahə sərhədlərinin toqquşması yoxdur). Model komponenti faktiki
cavab verən model deyil, **konfiqurasiya edilmiş** körpü modelidir —
`callVisionModel` daxildə ehtiyat varianta keçə bilər və hər cəhd üzrə açarlama
keşi parçalayardı. Uğursuz təsvirlər heç vaxt keşlənmir. Parametrlər:

| Açar                            | Standart | Aralıq  |
| ------------------------------- | -------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`   | —       |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000 |

#### Uzaq təsvirin normallaşdırılması (özünə yönələn təsvir/base64 əldəetməsi)

Körpü **uzaq** təsviri özü əldə etdikdə — həm Anthropic təsvir öz-çağırışı, həm də
claude-kabel-formatı üçün base64 çevirməsi
(`ensureBase64ImagesForClaudeWire`), hər ikisi `visionBridgeHelpers.ts`
daxilindəki `fetchRemoteImageAsDataUri()` vasitəsilə — yaranan data URI görmə
modelinin sorğusuna yerləşdirilməzdən əvvəl `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) vasitəsilə emal olunur. Ölçüsü həddən artıq
böyük təsvirlər **uzun tərəfi 2048px** olacaq şəkildə kiçildilir (OpenAI/Anthropic-in
artıq server tərəfində tətbiq etdiyi ölçü limitinə uyğun olaraq); bu, görmə
modelinin gördüyünü dəyişdirmədən yükləmə baytlarını/gecikməsini azaldır. Ölçünün
dəyişdirilməsi dinamik import vasitəsilə yüklənən `sharp` istifadə edir: onun
yerli binar faylının yüklənə bilmədiyi platformada `normalizeDataUri()` **heç vaxt
xəta atmır** — ilkin baytları dəyişdirmədən ötürməyə geri qayıdır, beləliklə
təsvir/base64-çevirmə yolu həmişə işləməyə davam edir. Təsvir olmayan baytlar
(dekodlaşdırıla bilən təsvir qaytarmayan əldəetmə) da dəyişdirilmədən ötürülür.
Bu normallaşdırma körpünün öz çağırışı üçün əldə etdiyi təsvirlərlə məhdudlaşır —
yalnız açıq seçimlə dəyişiklik prinsipinə (Sərt Qayda #20) uyğun olaraq, çağıranın
dəyişdirilmədən ötürülən xam faydalı yükünə heç vaxt tətbiq edilmir.

#### Parametrlər sxemi + miqrasiya

Yeni `modalityBridge*` açarları `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`) daxilində Zod ilə doğrulanır:
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCache*` üçlüyü və Audio Bridge tərəfindən istifadə edilən
`modalityBridgeAudio*` qrupu. `141_modality_bridge_settings.sql` miqrasiyası
mövcud köhnə `visionBridge*` dəyərlərini uyğun yeni açarlara köçürür
(idempotentdir, operatorun təyin etdiyi `modalityBridge*` dəyərinin üzərinə heç
vaxt yazmır); köhnə açarlar bir buraxılış dövrü ərzində oxuma üçün ehtiyat variant
kimi qəbul edilməyə davam edir.

#### Şəffaflıq başlığı + statistika

Təsvir vasitəsilə çevrilmiş cavablar
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
başlığını daşıyır (`modalityBridge/bridgeStats.ts` daxilindəki
`buildModalityBridgeHeader()` tərəfindən yaradılır,
`src/sse/handlers/chatHelpers.ts` daxilindəki `withModalityBridgeHeader()`
tərəfindən əlavə olunur). Yenidən marşrutlaşdırılmış sorğular **heç bir** başlıq
almır — faydalı yükə toxunulmayıb və model dəyişikliyi artıq cavab gövdəsinin
`model` sahəsində görünür.

`GET /api/modality-bridge/stats` (`GET /api/settings` ilə eyni səviyyəli idarəetmə autentifikasiyası) `vision`, `audio` və `video` üçün yaddaşda saxlanılan modal üzrə
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` sayğaclarını qaytarır.
`averageLatencyMs` məxrəc kimi bütün cəhdlərdən deyil, `latencySamples` dəyərindən istifadə edir; vaxt ölçülməyən əməliyyat süni şəkildə sıfır millisaniyəlik nümunə yaratmır.
`bridged` uğurlu çevirmələr üçün geriyə uyğun ləqəb olaraq qalır; uğursuz cəhdlər onu artırmır.
Sayğaclar layihəyə əsasən proses yenidən başladıqda sıfırlanır
(uçot deyil, telemetriyadır).

#### İdarəetmə panelinin konfiqurasiyası

Xüsusi idarəetmə paneli səhifəsi
`/dashboard/settings/modality-bridge` ünvanındadır. Onun URL vasitəsilə ünvanlana bilən `Vision`, `Audio`
və `Video` tabları `tab` dəyərini dəyişərkən sorğu parametrlərini qoruyur.
Vision tabı aktivləşdirməni, rejimi, model seçimini (avtomatik standart seçim daxil olmaqla), tapşırığa uyğun sorğu tərtibini, təkmil vaxt aşımı/şəkil/təsvir uzunluğu/keş məhdudiyyətlərini, icra vaxtı
sayğaclarını və qorunan nümunə sorğusunu təqdim edir. Audio tabı da işləkdir: o,
aktivləşdirməni, Auto seçimi olan yalnız STT model seçicisini, vaxt aşımı/maksimum klip məhdudiyyətlərini, audio
sayğaclarını və `input_audio` nümunə testini təqdim edir. Video tabı funksionaldır: o,
FFmpeg/ffprobe icra mühitinin vəziyyətini — dörd açıq UI vəziyyətindən birini (yoxlama davam edərkən və ya tamamlana bilmədikdə `unknown`, yoxlamanın klient tərəfində buraxıldığı, loopback olmayan idarəetmə paneli hostunda `restricted`, yoxlanıldıqdan və mövcud olmadığı təsdiqləndikdən sonra `unavailable`, yaxud FFmpeg/ffprobe versiyaları ilə birlikdə `available`) — göstərir, aktivləşdirmə/model/kadr/video/vaxt aşımı məhdudiyyətlərini yadda saxlayır, model seçicisini görüntü imkanlı
modellərlə məhdudlaşdırır və video sayğaclarını təqdim edir.

AI ayarları altındakı əvvəlki Vision Bridge kartı yeni səhifəyə uyğunluq keçididir; o, artıq formanın ikinci nüsxəsini özündə saxlamır. Media Providers həmçinin mövcud Speech-to-Text sınaq mühitini silmədən Image-to-Text və Speech-to-Text iş axınlarını müvafiq Modality Bridge tablarına bağlayır.

**Özünə dövrə qəbulunun yan keçidi:** təsvir çağırışı OmniRoute-un öz
`/v1` özünə dövrəsi (qeyri-standart provayder modeli) üzərindən yönləndirildikdə, alt sorğu
`x-omniroute-admission-bypass: internal` göndərir və müəyyən edilmiş
özünə dövrə etimadnaməsi — lokal rejimdə yerli `sk_omniroute` sentinel dəyəri və ya
operator tərəfindən konfiqurasiya edilmiş `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` mühit açarı (#1350) ilə autentifikasiya olunur ki,
`REQUIRE_API_KEY=true` yerləşdirmələri təsvir çağırışını yenə də icra edə bilsin. Yan keçid
yalnız məhz həmin etimadnamələr üçün qəbul edilir, buna görə xarici klientlər
qəbul prosesini keçmək üçün bu başlıqdan istifadə edə bilməz.

Köhnə standart dəyərlər `src/shared/constants/visionBridgeDefaults.ts` faylındadır;
yeni rejim/tapşırığa uyğun/keş standartları və ayarlar həlledicisi isə
`src/shared/constants/modalityBridgeDefaults.ts` faylındadır. Qoruyucu mexanizm testlərin saxta `getSettings` və
`callVisionModel` reallaşdırmalarını daxil edə bilməsi üçün
`deps` konstruktor seçimini təqdim edir.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Audio ehtiva edən söhbət sorğularını audio girişini qəbul etdiyi məlum olmayan hədəfə çatmazdan əvvəl tutur. O, söhbət sorğusunu heç vaxt başqa istiqamətə yönləndirmir: audio hissələr mövcud OpenAI-uyğun çoxhissəli son nöqtə vasitəsilə mətnə çevrilir və seçilmiş söhbət modeli mətn transkriptləri ilə davam edir.

Axın:

1. `supportsAudio` dəyərini `getResolvedModelCapabilities()` vasitəsilə müəyyən edin. Açıq şəkildə göstərilmiş
   provayder reyestri metadatası üstünlük təşkil edir, sonra statik model metadatası, daha sonra sinxronlaşdırılmış
   `modalities_input` gəlir. `audio` ehtiva etməyən bəyan edilmiş giriş siyahısı `false` sayılır;
   imkan haqqında sübut olmadıqda dəyər `null` olaraq qalır. Həm `false`, həm də `null` konservativ körpünü
   aktivləşdirir, `true` isə ondan yan keçir.
2. `modalityBridgeAudio*` ayarlarını müəyyən edin və paylaşılan `detectMediaParts()`
   detektoru vasitəsilə hər mesajdan birləşdirilə bilən üst səviyyəli audio hissələri çıxarın.
   Dəstəklənən ötürmə formatları OpenAI `input_audio`, `audio_url` və
   `source.media_type: "audio/*"`-dır. İç-içə audio yönləndirmə üçün aşkarlanır, lakin
   birləşdirmə yolu tərəfindən silinmir. İş həcmi `modalityBridgeAudioMaxClips` ilə məhdudlaşdırılır;
   sonrakı hissələr toxunulmaz qalır.
3. Konfiqurasiya edilmiş `provider/model` dəyərini nəzərə alın və ya `selectAudioBridgeModel()` funksiyasına
   `AUDIO_TRANSCRIPTION_PROVIDERS` siyahısını sabit kataloq ardıcıllığı ilə nəzərdən keçirərək
   istifadəyə yararlı aktiv provayder etimadnaməsinə malik ilk modeli seçməyə icazə verin.
4. `callAudioTranscription()` base64/data-URI audionu çoxhissəli
   `file` formasına çevirir və ya uzaq `audio_url` ünvanından audionu DNS sabitləməsi və 25 MB həddi olan, yalnız ictimai ünvanlara icazə verən çıxış qoruyucusu vasitəsilə endirir. Daha sonra faylı və seçilmiş
   modeli `resolveSelfLoopBearer()` ilə autentifikasiya edilmiş yerli `/v1/audio/transcriptions` özünə dövrəsinə POST edir. Mövcud transkripsiya marşrutu adi
   etimadnamə axtarışını, soyuma müddəti/sürət məhdudiyyəti idarəetməsini və provayderə yönləndirməni həyata keçirir.
5. Uğurlu çağırışlar öz hissələrini `[Audio N]: <transcript>` ilə əvəz edir. Çağırışlar
   `Promise.allSettled` ilə icra olunur: ayrıca bir uğursuzluq həmin orijinal
   audio hissəsini qoruyur (#4012 müqaviləsi). Bütün çağırışlar uğursuz olarsa və hədəfin
   `supportsAudio === false` olduğu sübut edilmişsə, hissələr
   `[Audio N]: (unavailable — no STT provider connected)` formasına çevrilir (#8430 müqaviləsi).
   Naməlum hədəf (`null`) üçün bütün çağırışların uğursuz olduğu nəticə toxunulmaz qalır. İstifadəyə yararlı STT etimadnaməsi olmayan, mətn rejimli olduğu sübut edilmiş hədəf şəbəkə çağırışı etmədən eyni açıq
   əvəzedici mətni alır.

Uğurlu transkriptlər proses miqyasında ortaq Modality Bridge LRU/TTL keşindən istifadə edir.
Açar audio istinadını, sabit `audio-transcription` əməliyyat
etiketini və seçilmiş STT modelini birləşdirir; uğursuzluqlar heç vaxt keşlənmir. Audio cəhdləri
paylaşılan `bridged`, `cacheHits`, `failures` və `lastUsedAt` sayğaclarını yeniləyir.
Çevrilmiş cavablar
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` daşıyır; toxunulmamış
sorğular Audio Bridge seqmenti almır.

İcra vaxtı ayarları verilənlər bazasında saxlanılır və Zod ilə yoxlanılır:

| Açar                          | Standart | Diapazon                  |
| ----------------------------- | -------- | ------------------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                         |
| `modalityBridgeAudioModel`    | `""`     | Avtomatik və ya STT ID-si |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000               |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10                      |

Ortaq keş hələ də `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` və `modalityBridgeCacheMaxEntries` tərəfindən idarə olunur.

### Video körpüsü (`videoBridge.ts`, `videoBridgePipeline.ts`)

Məlum yerli video dəstəyi olmayan hədəf çağırılmazdan əvvəl Chat Completions
`messages` və Responses API `input` daxilindəki üst səviyyəli video hissələrini
tutur. Dəstəklənən formatlar `input_video`, `video_url`, `video_source`, HTTPS URL-ləri
və `data:video/*;base64,...` data URI-ləridir. Mətndəki sadə fayl adları video
kimi qəbul edilmir.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) sorğunun keçilməsinə,
imkan/siyasət yoxlamasına, hər sorğu üzrə aqreqasiyaya və cavab yükünə cavabdehdir.
Hər video üzrə iş — əldəetmə, tam nəticə keşi, kadr ardıcıllığının təsviri
(buraya çağıran tərəfin bəyan etdiyi istənilən audio transkripsiyası birləşdirilir)
və hər cəhd üzrə metriklər/dayandırma/təmizləmə — `videoBridgePipeline.ts`
daxilindəki `processVideoPart` arxasında gizlədilir və `preCall` dövrü daxilində
hər video hissəsi üçün bir dəfə çağırılır. Həmin modul həmçinin açıq port
sərhədlərini müəyyən edir: `VideoMediaBrokerPort` (baytların əldə edilməsi və
nümunələnmiş kadrların çıxarılması), `VideoAudioTranscriptionPort` (çağıran
tərəfin bəyan etdiyi audio transkripsiyasının nümunələnmiş təsvirlərlə
birləşdirilməsi) və `VideoDrilldownPort` (kadrların detallı araşdırılması üçün
saxlama sərhədi; hələ `processVideoPart` ilə əlaqələndirilməyib — hazırda detallı
araşdırma qeydlərini yalnız ayrıca `/api/modality-bridge/video/drilldown`
marşrutu yazır).

İctimai `/v1` sorğu yolu heç vaxt alt prosesi idxal və ya işə salmır. Uzaq
videolar 50 MiB həddi daxilində endirilir; model/mesajlar/çərçivələmə zərfinin
ictimai JSON sorğuları üçün 50 MiB qəbul həddi daxilində qala bilməsi məqsədilə
sətirdaxili base64 videolar üçün hər video üzrə konservativ 36 MiB dekodlaşdırılmış
ölçü həddi tətbiq olunur. Sətirdaxili uzunluq və dekodlaşdırılmış ölçü təxminləri
yaddaş ayrılmazdan əvvəl yoxlanılır. Mövcud, DNS sabitləməsinə malik yalnız-ictimai
çıxış qoruyucusundan istifadə edilməklə həm ilkin uzaq URL-də, həm də hər
yönləndirmədə HTTPS tələb olunur. Daha sonra baytlar dəqiq daxili
`POST /api/modality-bridge/video/extract` broker sərhədini keçir. Bu marşrut həm
`LOCAL_ONLY`, həm də `SPAWN_CAPABLE`-dır, yalnız hər proses üçün autentifikasiya
edilmiş etibarlı geri-dövrə sorğusunu qəbul edir və heç vaxt URL, fayl sistemi
yolu, icra olunan fayl və ya arqument siyahısı qəbul etmir. API gövdə ölçüsü
konveyeri və emaledicinin artımlı gövdə oxuyucusu broker girişi üçün 50 MiB
həddini müstəqil şəkildə tətbiq edir. Onun məhdud növbəsi eyni anda bir çıxarma
əməliyyatını icra edir, gözləyən dörd işə icazə verir və gözləyən girişin ümumi
ölçüsünü 100 MiB ilə məhdudlaşdırır.

Broker daxilində `ffprobe` məxfi lokal faylı oxuyur; sabit format icazə siyahısı
pleylist və manifest formatlarını istisna edir. İcazə verilən MOV ailəsi
konteynerləri üçün xarici MOV məlumat istinadları standart olaraq deaktiv
qalır və sabit komanda onları aktivləşdirmir. Həm `ffprobe`, həm də `ffmpeg`
yalnız `file` protokolunun icazə siyahısından, bir axından, sabit arqument
massivlərindən istifadə edir, qabıqdan istifadə etmir və icra olunan faylları
`PATH` vasitəsilə müəyyənləşdirir. Əlavə edilmiş şəkil-üz qabığı axınları
oynadıla bilən namizədlər deyil. Bütün oynadıla bilən axınlar hədlərə uyğun
olmalıdır və deterministik ən aşağı indeksli ehtiyat variantdan əvvəl açıq
şəkildə standart kimi təyin edilmiş axına üstünlük verilir. Videolar 600 saniyə,
hər ölçü üzrə 8,192 piksel və 33,554,432 mənbə pikseli ilə məhdudlaşdırılır.
FFmpeg 1–16 orta nöqtə JPEG kadrını nümunələyir, daha kiçik girişləri böyütmədən
uzun kənarı maksimum 1,024 pikselədək kiçildir və heç vaxt URL qəbul etmir.
Standart nümunələmə `uniform`-dur. İstəyə bağlı `scene_aware` və eksperimental
`segment_aware` siyasətləri artıq doğrulanmış lokal axın üzərində əlavə bir
sabit FFmpeg keçidi yerinə yetirir, məhdud `showinfo` səhnə zaman nişanlarını
seçir və detektor nasazlığı, vaxt aşımı, düzgün formalaşdırılmamış çıxış və ya
boş namizəd dəsti halında deterministik şəkildə eyni bərabər paylanmış orta
nöqtələrə qayıdır. Seqmentdən xəbərdar rejim orta nöqtə nümunələrini doğrulanmış
səhnə intervallarına mütənasib şəkildə bölüşdürür; seqmentdən xəbərdar sübutlar
və ehtiyat davranış aşağıda ətraflı təsvir edilir. Sərt 16 kadr həddi hər
siyasətdə seçimdən sonra tətbiq olunur. Səhnədən xəbərdar sorğunun yalnız bir
kadrlıq büdcəsi olduqda, aktiv tam video və ya fokus pəncərəsinin bərabər
paylanmış orta nöqtəsindən istifadə edilir və `policyEffective: uniform`
göstərilir: seçilmiş tək səhnə kadrı zaman aralığının hər iki ucunu qoruya bilməz.
Çağıran tərəf istəyə bağlı olaraq sonlu fokus pəncərəsi (`start`/`end` saniyə)
təqdim edə bilər; sərhədlər medianın müddətinə uyğun məhdudlaşdırılır, tərsinə
çevrilmiş və ya sonlu olmayan pəncərələr rədd edilir və bütün nümunələmə
siyasətləri yalnız normallaşdırılmış interval daxilində yerinə yetirilir.
Nəticə pəncərəsi nümunələmə metadatasına və etibar edilməyən təsvir prefiksinə
daxil edilir ki, sonrakı modellər fokuslanmış fraqmenti tam zaman xəttindən
fərqləndirə bilsin.

Semantik təsvir fokusu ayrıca, açıq parametrdir. Standart `full` analiz rejimi
mövcud kadr sorğusunu qoruyur və sorğu mətnini heç vaxt təsvir modelinə ötürmür.
`focused` rejimində körpü yalnız eyni Chat və ya Responses konteynerindəki
istifadəçi tərəfindən yazılmış ən son boş olmayan `text`/`input_text` mətnini
oxuyur, onu NFC-yə normallaşdırır, idarəetmə simvollarını və boşluqları
yığcamlaşdırır və 500 Unicode kod nöqtəsi ilə məhdudlaşdırır. Boş nəticə dəqiq
`full` sorğusuna qayıdır. İstifadəyə yararlı göstəriş ayrıca, etibar edilməyən
istifadəçi konteksti blokunda JSON kimi seriallaşdırılır və yalnız müşahidə
oluna bilən detallara üstünlük verə bilər; o, mediada görünən və ya eşidilən
təlimatlara əməl etməmək barədə ayrıca xəbərdarlığı ləğv edə bilməz. Mətn fokusu
heç vaxt `start`/`end` dəyərlərini çıxarmır və ya zaman nümunələyicisini dəyişmir.

#### FU-07 struktur seqment sübutları

`segment_aware` artıq doğrulanmış lokal video axını üzərində bir dəfəlik, məhdud ilkin analiz keçidi həyata keçirir. Sabit filtr zənciri əvvəlcə eni maksimum 320 pikselədək miqyaslandırır, səhnə dəyişikliklərini və donmuş intervalları aşkarlayır, sonra bulanıqlıq, orta parlaqlıq, məkan və zaman məlumatı üçün saniyədə 1 kadr nümunəsi götürür. Keçid 600 struktur nümunəsi, bir FFmpeg/filtr axını, eyni yalnız `file` protokolu və konteyner icazə siyahıları, 1 MiB proses çıxışı limiti və brokerin ortaq dayandırma/son tarix çərçivəsində maksimum 30 saniyə ilə məhdudlaşdırılır. O, sorğudan heç vaxt əmr, filtr, yol və ya URL qəbul etmir.

Struktur dəyərləri semantik video anlayışı deyil, deterministik nümunə götürmə sübutudur. Onlar subyektləri, hərəkətləri, altyazıları, nitqi və ya istifadəçi niyyətini müəyyən etmir. Səhnə və donma sərhədləri seqmentləri formalaşdırır; donma əhatəsi, bulanıqlıq, ekspozisiya, məkan detalları və zamana görə dəyişiklik yalnız mövcud 1–16 kadr büdcəsinin necə bölüşdürüldüyünə təsir edir. Tamamilə donmuş seqment maksimum bir kadrla məhdudlaşdırılır, donmamış seqmentlər isə qalan büdcə uğrunda rəqabət aparır. Sərhədlərin sayı kadrlardan çox olduqda, vahid zaman xətti əhatəsi qorunur ki, başlanğıcdakı sürətli kəsimlər sondakı uzun seqmenti gizlədə bilməsin. Donma sərhədindən 1 saniyəlik analiz ayırdetməsi daxilində olan səhnə sərhədləri birləşdirilir.

Çatışmayan filtrlər, yanlış formatlı/boş sübutlar, detektor xətası və ya məhdud ilkin analiz vaxt aşımı zamanı sistem tam olaraq vahid orta nöqtə siyasətinə açıq şəkildə geri dönür. Çağıranın dayandırması və ya brokerin son tarixi zamanı isə belə geri dönüş baş vermir: davam edən alt proses dayandırılır, sonrakı kadr çıxarılmasının qarşısı alınır və şəxsi müvəqqəti ağac `finally` daxilində silinir.

`scripts/perf/video-bridge-fu07-eval.ts` dublikatlar silindikdən sonrakı altyazı çağırışı qənaəti, sıx hərəkət üçün büdcə bölgüsü, bulanıqlıq/ekspozisiya/SI-TI sübutu, uzun sonluqlu sürətli kəsimlər və tədricən solmanın yanlış müsbət nəticələri üçün deterministik real FFmpeg sınaq materialları yaradır. O, ilkin analizin faktiki müddətini və `/usr/bin/time` mövcud olduqda alt prosesin CPU istifadəsini və pik RSS göstəricisini qeydə alır. Onun keyfiyyət yoxlamaları yalnız struktur orakullarıdır. Real altyazı modelinin keyfiyyəti `HOLD` olaraq qalır, çünki bu sınaq vasitəsində səlahiyyətli son nöqtə və ya dondurulmuş qiymətləndirici yoxdur. `--caption-cost-per-call-usd` hər çağırış üçün aşkar müsbət xərc təxmini təqdim etmədikdə, pul qənaəti də `HOLD` olaraq qalır; skript bu nəticələrin heç birini saxtalaşdırmır.

Hər kadr 4 MiB, bütün xam kadrlar birlikdə 23 MiB, seriallaşdırılmış broker cavabı isə 32 MiB ilə məhdudlaşdırılır. Şəxsi müvəqqəti kataloq `finally` daxilində silinir. OmniRoute FFmpeg-i paketinə daxil etmir və fərdi icra faylı yolu qəbul etmir. Altyazı yaradılmasından əvvəl körpü konservativ vizual dublikat silmə keçidi tətbiq edir: hər JPEG 16×16 ölçülü boz tonlu buferə kiçildilir və yalnız son saxlanmış kadrla müqayisə edilir. Bir kadrdan artıq tələb olunan altyazı büdcəsi üçün çıxarış həmin büdcənin iki mislinədək, lakin heç vaxt 16 kadrdan çox olmayan məhdud namizəd hovuzu təqdim edir. Tələb olunan limit yalnız dublikatların silinməsindən sonra tətbiq olunur və büdcə ən azı iki olduqda yekun seyrəltmə zamanı ilk və son seçilmiş namizədlər qorunur. Versiyalaşdırılmış `grayscale-16x16-mean-cells-v2` siyasəti orta parlaqlıq fərqi ilə normallaşdırılmış fərqi ən azı 0.05 olan miniatür xanalarının nisbətindən daha böyük olanını istifadə edir. Dublikat həddi sabit 0.04-dür və icra vaxtı parametri kimi təqdim edilmək əvəzinə proqnozlaşdırıla bilməsi üçün seçilib. Bu ikinci yüksək kontrastlı siqnal yalnız orta göstəriciyə əsaslanan müqayisənin gizlədə biləcəyi kiçik hərəkətləri və görünən mətn dəyişikliklərini qoruyur. Müqayisəçi və ya dekoder xətaları zamanı sistem açıq şəkildə davam edir və əhatəni qoruyur. Çıxış metadatası çıxarılmış namizədləri, uğurla istifadə edilmiş kadrları və atılmış vizual dublikatları bir-birindən ayırır.

Açıq şəkildə işarələnmiş video hissəsi vaxt nişanlı kontakt vərəqi tələb edə bilər. Körpü maksimum 4 sütunlu, 16 kadrlı JPEG toru yaradır. Hər 512 piksellik xana mənbənin vaxt nişanını yüksək kontrastlı alt zolağa həkk edir, eyni vaxt nişanları isə sonrakı əlaqələndirmə və audit üçün mətn metadatasında saxlanılır. Tam JPEG 32 MiB ilə məhdud qalır. `sharp` toru dekodlaşdıra və ya tərtib edə bilmədikdə, körpü fərdi JPEG kadrlarına geri dönür; müştəri dayandırması isə yenə də vərəq əməliyyatı boyunca ötürülür.

İrəlilətmə sübutu sintetik kompozisiya mikrobencmarkından qəsdən ayrı saxlanılır. `scripts/perf/video-bridge-contact-sheet-eval.ts` real OpenAI-uyğun görüntü modelləri üçün sxem versiyalı A/B sınaq vasitəsi müəyyən edir. O, provayder tərəfindən bildirilən tokenləri, ucdan-uca faktiki gecikməni (vərəqin tərtibi daxil olmaqla), model çağırışlarının sayını və manifestlə müəyyən edilmiş faktların saxlanmasını ölçür. Xam model cavabları hesabata yazılmır; yalnız SHA-256 heşləri və uyğun gələn fakt ID-ləri saxlanılır. `--execute-real` ötürülmədikdə və `--model`, `OMNIROUTE_BASE_URL` və `OMNIROUTE_API_KEY` konfiqurasiya edilmədikdə sınaq vasitəsi heç bir şəbəkə və ya ödənişli model çağırışı etmir. Belə açıq real icra olmadan onun maşın tərəfindən oxuna bilən hökmü `HOLD` olaraq qalır; yalnız sintetik faydalı yük/çağırış sayı ölçmələri irəlilətmə sübutu sayılmır.

Çağıranlar əvvəlcədən uyğunlaşdırılmış mətnə sahib olduqları halda, dəstəklənən video hissəsinə ixtiyari `transcript.cues` massivi əlavə edə bilərlər. Hər qeyd `text`, yoxlanılmış müddət daxilində sonlu `start`/`end` intervalı və icazə siyahısında olan `source` (`client`, `embedded` və ya `audio-bridge`) ehtiva etməlidir; `confidence` üçün standart dəyər `1`-dir və o, `0` ilə `1` arasında qalmalıdır. Tam eyni qeydlər birləşdirilir. OmniRoute heç vaxt bu metadata əsasında transkripsiyaya başlamır: doğrulanmış qeydlər mənbə, etibar səviyyəsi və intervalla birlikdə təsvir edilmiş nəticəyə köçürülür və kadr altyazılarının yanında etibar edilməyən müşahidələr kimi göstərilir. Yanlış, diapazondan kənar və ya mənşəyi göstərilməyən mətn altyazı axınına qarışdırılmaq əvəzinə rədd edilir. Hər iki sorğu gövdəsi transkript kanalı təqdim edilən mənşəni, özünün bəyan etdiyi `embedded` və ya `audio-bridge` etiketləri də daxil olmaqla, `client` kimi normallaşdırır. Yalnız serverə məxsus adapter həmin etibarlı etiketləri yalnız kodla verilən `trustedSource` arqumenti vasitəsilə təyin edə bilər; sorğudakı JSON sahəsi həmin arqumentə çata bilməz. Mənşəyindən asılı olmayaraq, transkript mətni etibar edilməyən, mediadan əldə olunmuş məzmun olaraq qalır və heç vaxt avtorizasiyanı müəyyən etməməlidir.

Təkmil çağırış edən tərəf eyni video üçün `audioTranscript` treki təqdim edə bilər;
bu, server transkripsiyasının sübutu kimi deyil, klient tərəfindən təqdim edilmiş mətn kimi qəbul edilir.
Birləşdirmə sərhədi vizual və audio müşahidələri vahid son müddət və dayandırma siqnalı
altında icra edir, onları ümumi zaman xəttində sıralayır, tam dublikatları birləşdirir
və yalnız bir tərəf uğurlu olduqda qismən nəticə bildirir.
Etibarsız `audioTranscript` bütün videonun emalını uğursuz etmək əvəzinə həmin qismən
nəticəyə endirilir — vizual təsvir saxlanılır, audio qolu isə təmizlənmiş xəta kodunu
qeydə alır. Hər qol üzrə əlçatanlıq, qismən nəticə bayrağı və təmizlənmiş xəta kodları
təsvir edilmiş nəticədə, qoruyucu mexanizmin metadatasında (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), nəticə keşinin metadatasında və körpünün
birləşdirmə sayğaclarında qorunur. Standart Video Bridge yolu nitqdən mətnə çevirməni
işə salmır və medianın ikinci nüsxəsini endirmir; həmin trek açıq şəkildə təqdim
edilmədikdə yalnız video rejimində qalır.

**Transkriptin saxlanması (#12150 P1).** Bu, Video Bridge (özü ayrıca aktivləşdirilməlidir)
transkript ipucunu göstərdiyi hər dəfə avtomatik tətbiq olunur — ayrıca saxlama
bayrağı yoxdur. Sorğu hər hansı transkript ipucunu (çağırış edən tərəfin bəyan etdiyi
`transcript` və ya birləşdirilmiş `audioTranscript`) göstərdikdə qoruyucu mexanizm onu
`videoBridgeObserved` kimi işarələyir və video təsvirinin redaktə edilmiş kölgəsini yaradır —
bu, hər bir ipucunun sərbəst mətn gövdəsinin `[redacted-video-transcript]` ilə əvəzləndiyi
eyni təsvir formasıdır və sətir yığılmazdan əvvəl strukturlaşdırılmış ipucu sahəsinin
əvəzlənməsi ilə qurulur (heç vaxt yastılanmış mətn təhlil edilmir, buna görə də
heç bir ipucu məzmunu — düşmən xarakterli və ya adi, o cümlədən `[inaudible]`/`[music]`
kimi `]` simvolu ehtiva edən gövdələr — qala bilməz). Davamlı saxlanılan çağırış jurnalının
sorğu gövdəsi məzmun bərabərliyinə əsasən uyğunlaşdıraraq videodan əldə edilmiş hər bir
mətn hissəsini həmin redaktə edilmiş kölgə ilə əvəz edir; `fullText` lövbəri çağırışdan
əvvəlki tamamlanmış qoruyucu mexanizm yükündən yenidən oxunur, beləliklə sonrakı zəncir
qoruyucu mexanizmləri (PII və giriş məlumatı maskalayıcıları, prioritetlər 10/95) təsvir
mətnini yerində yenidən yazdıqdan və sistem göstərişi/təhvilvermə/yaddaş daxil edilməsi
mesaj massivinin formasını dəyişdirdikdən sonra da uyğunlaşdırma uğurlu olur.
Modelə göndərilən gövdə dəyişməz qalır. Müşahidə edilmiş sorğu həmçinin heç bir davamlı
Memory doldurmur (həm sorğudan, həm də cavabdan əldə edilən çıxarış ötürülür), buna görə
modelin öz cavabı transkript mətnini Memory daxilində təkrarlaya bilməz.

**Xam video sahələri (#12430).** Körpü aktiv olduqda və yerli video dəstəyi naməlum və ya mövcud olmadıqda, müəyyən edilmiş `transcript`/`audioTranscript` sahələri hətta təsvir uğursuzluğundan və ya `maxVideos` limitindən sonra da `videoBridgeObserved` parametrini aktivləşdirir. `null` və boş sətirlər nəzərə alınır; mövcud olmayan sahələr və videoya aid olmayan metadata nəzərə alınmır. Saxlanılan nüsxələr bu sahələri redaktə edir və ya sorğunu buraxır, keşlərdən/Memory-dən isə yan keçilir.

Həmin ehtiyat yollarda çağırış edən tərəfin etibarlı ipucları qeyri-standart provayder
sahələri əvəzinə dəstəklənən `text`/`input_text` hissələrinə çevrilir. Sorğu ilə təqdim
edilmiş hər iki trek, videonun təsvir edilmədiyi və vaxt nişanlarının media ilə
tutuşdurulmadığı barədə açıq xəbərdarlıqla birlikdə etibar edilməyən `client`
müşahidələri olaraq qalır. Mövcud 256 ipucu/64-KiB ümumi və hər ipucu üzrə büdcələr
iki trekə birlikdə tətbiq edilir; vaxt nişanları brokerin 600 saniyəlik həddinə və
təqdim edilmiş istənilən fokus pəncərəsinə uyğun gəlməlidir. Etibarsız treklər ixtiyari
mətn kimi ötürülmür, atılır; onların birgə büdcəsi aşılmadıqda etibarlı yanaşı trek
yenə də istifadə edilə bilər. Null/boş sahələr mətn əlavə etmir. Bu ehtiyat mexanizmi
heç bir media əldə edilməsi və ya transkripsiya əlavə etmir.
Transkript genişləndirmə sahələri ehtiyat video daşıyıcısından və onun
`video_url`/`source` obyektlərindən silinir. OpenAI ötürmə icazə siyahısı sərt qalır;
yerli dəstəyi naməlum olan video daşıyıcıları əlçatan qalır, yalnız mətni dəstəklədiyi
məlum olan hədəflər isə təhlükəsiz markerləri saxlayır. Strukturlaşdırılmış redaktə
kölgələri əlavə edilmiş transkript mətnini qoruyur, çağırış edən tərəfə məxsus orijinal
sorğu isə dəyişməz qalır. Yerli dəstəyi olan hədəflər və deaktiv edilmiş körpülər
mövcud yan keçmə davranışını saxlayır.

Əlavə saxlanılan nüsxələr eyni müşahidə edilmiş sorğu siqnalından istifadə edir. Qoruyucu
mexanizmdən əvvəlki xam klient sorğusu anlıq görüntüsü, yaddaşdakı gözləyən sorğu və
erkən rədd edilmiş sorğu jurnalı video hissələrindəki transkript sahələrini struktur
şəkildə əvəz edir; konveyer mərhələləri və kontekst təhvilverməsi tərəfindən yaradılmış
sətir göstərişləri davamlı saxlanılan sorğu gövdəsi qəbuledicisində redaktə edilir.
Davamlı saxlanılan `video_content_removed` markeri `previous_response_id` davamının
qəsdən atılmış mətni yenidən qurmaq əvəzinə qapalı şəkildə uğursuz olmasını təmin edir.
Müşahidə edilmiş sorğu jurnallaşdırmadan əvvəl hissə üzrə redaktə kölgəsini itirərsə
və ya bir neçə video kölgəsindən hətta biri sonrakı sorğu dəyişikliklərindən sonra
uyğun gəlməzsə, qismən redaktə edilmiş transkripti saxlamaq əvəzinə saxlanılan sorğu
gövdəsi tamamilə buraxılır.

Müşahidə edilmiş sorğu üçün model cavabı strukturlaşdırılmış ipucu sərhədi olmadan
transkriptin istənilən hissəsindən sitat gətirə bilər. Buna görə onun davamlı saxlanılan
çağırış jurnalındakı `responseBody` sahəsi buraxılma markeri ilə əvəz olunur; təfərrüatlı
konveyer artefaktı (yuxarı axın/klient gövdələrini və axın fraqmentlərini ehtiva edə bilər)
saxlanılmır. Semantik, idempotentlik və əsaslandırma təkrar-icra keşləri həmin sorğu üçün
oxuma və yazmalardan yan keçir. Provayder sorğusu və klientə görünən cavab dəyişməz qalır.
Təfərrüatlı artefakt buraxıldıqda erkən bağlantını aktiv saxlama baytları müvəqqəti
buferdən boşaldılır. Kiro-nun qüsurlu EventStream xəbərdarlığı heç vaxt onun məzmununu
və ya JSON təhlilçisinin xam xətasını deyil, yalnız yükün bayt sayını bildirir.
Bu, əlaqəsiz hər bir provayder/plagin diaqnostikasının audit edildiyini iddia etmir;
saxlanılan qəbuledicilərin daha geniş yoxlanışı #11658 daxilində izlənilir.

Daxili `/api/modality-bridge/video/drilldown` həyat dövrü ayrıca,
loopback/token ilə autentifikasiya olunan keş substratıdır. Hər əməliyyat həmçinin
kanonik qeyri-şəffaf principal ID tələb edir. İstehsal mühiti çağıranı aktivləşdirilməzdən əvvəl həmin ID-ni
autentifikasiya olunmuş tenant əsasında törətməli və heç vaxt
müştərinin seçdiyi dəyəri ötürməməlidir. Keş açarları həmin principal-ı kanonik sessiya və
video istinad ID-lərinə bağlayır, yalnız onların SHA-256 əsasında törədilmiş açarlarını saxlayır və həm oxuma,
həm də silmə əməliyyatlarını eyni principal ilə məhdudlaşdırır. Keş hər qeyd üçün ən çox 16 törədilmiş JPEG
kadrı saxlayır, onların müddətini on dəqiqədən sonra bitirir və məhdudlaşdırılmış
`start`/`end` oxumalarını və ya sessiyanın açıq şəkildə silinməsini dəstəkləyir.

Hər principal 16 qeyd və 64 MiB kanonik JPEG məlumatı ilə məhdudlaşdırılır. Bu
məhdudiyyətlər qlobal 64 qeyd/256 MiB yuxarı həddindən müstəqildir: principal kvotasına
təzyiq yarandıqda qlobal LRU çıxarılması nəzərdən keçirilməzdən əvvəl yalnız həmin principal-ın
ən uzun müddət istifadə olunmayan qeydləri çıxarılır. Müddəti bitmiş qeydlər keş fəaliyyəti zamanı həm principal,
həm də qlobal uçotdan təmizlənir, ləğv etmə və doğrulama uğursuzluğu isə
qismən əvəzləməni qeydə almır.

Keş qeyri-kanonik Base64-ü, artıq doldurmanı, JPEG olmayan medianı, qüsurlu və ya
kəsilmiş JPEG-ləri və məhdudlaşdırılmış tam təsvir `sharp`
dekodlaşdırması zamanı xəbərdarlıq yaradan JPEG-ləri rədd edir. O, qəbul edilmiş hər təsviri kanonik JPEG kimi yenidən kodlaşdırır,
eni və hündürlüyü çağıran tərəfin sahələrinə etibar etmək əvəzinə dekodlaşdırılmış baytlardan törədir
və sondakı bütün poliqlot baytları saxlamaq əvəzinə atır. Hər iki kvotaya yalnız məhdudlaşdırılmış
kanonik sıxılmış bufer daxil edilir. JSON ötürmə həddi 32 MiB
dekodlaşdırılmış giriş yuxarı həddi üçün Base64 əlavə yükünü ehtiva edir. Hər
saxlanmış törəmə onun doğrulanmış JPEG formatını/rezolyusiyasını, seçmə siyasətini,
törəmə versiyasını, yaradılma vaxtını, server tərəfindən hesablanmış məzmun heşini və heşlənmiş ana
istinadı, eləcə də etibarlı çağıranın ana məzmun heşini qeydə alır. Ləğv etmə
atomik keş qeydəalmasından əvvəl asinxron dekodlaşdırma/heşləmə mərhələləri arasında yoxlanılır.

Bu tranş hələ istehsal mühiti istehsalçısını marşruta qoşmur və
çoxrezolyusiyalı variant seçimini təmin etmir. Buna görə də şəffaf Video Bridge sorğu
yolu əlavə iş yükü yaratmır, tenant-a bağlı principal törətməsi və
tam FU-08 çoxrezolyusiyalı həyat dövrü isə tamamlanmış davranış kimi sənədləşdirilmək əvəzinə
açıq sonrakı iş olaraq qalır.

Kadrlara konfiqurasiya edilmiş Video modeli ilə ardıcıl təsvirlər əlavə olunur. Boş
Video əvəzləməsi Vision parametrini miras alır; hər ikisi boşdursa, Vision
avtomatik marşrutlayıcısı effektiv görüntü imkanlı modeli seçir. Uğurlu təsvirlər
orijinal hissəni sabit `[Video description:` prefiksi ilə əvəz edir; bu prefiks mətni
etibarsız, mediadan törədilmiş müşahidə kimi də işarələyir və aşağı axındakı
modellərə mediada tapılan təlimatlara əməl etməməyi bildirir. Kadr təsviri keş açarlarına
JPEG baytları, prompt, zaman damğası və effektiv model daxildir; yalnız uğurlu
təsvirlər keşlənir. Keş qeydləri faktiki uğurlu istehsalçı modeli,
o cümlədən ehtiyat modeli saxlayır; müxtəlif kadrlar müxtəlif modellər tərəfindən
hazırlandıqda körpü `mixed` bildirir. Keş uyğunluğu həmin istehsalçı identikliyini
sorğu edilən marşrutlaşdırma planı kimi yenidən etiketləmək əvəzinə təkrar istifadə edir. Bütöv video nəticəsi
keşi çıxışı dəyişdirən hər bir giriş əsasında açarlanır — prompt, effektiv
model, seçmə siyasəti, kadr sayı, semantik analiz rejimi, normallaşdırılmış fokus göstərişinin SHA-256
barmaq izi, fokus pəncərəsi, `transcript`,
`audioTranscript` və kontakt vərəqi bayrağı — buna görə də həmin
ölçülərdən hər hansı birinin dəyişməsi köhnəlmiş təkrar istifadə deyil, keş uyğunsuzluğudur. Vizual dublikatların aradan qaldırılması siyasətinin
versiyası, həddi və məhdudlaşdırılmış namizəd kadr sayı da
nəticə keşi açarında və metadatasında açıq şəkildə göstərilir; beləliklə, siyasət dəyişikliyi köhnəlmiş
bütöv video təsvirini təkrar istifadə edə bilməz. Nəticə keşinin v4 metadatası rejimi və
barmaq izini saxlayır, istifadəçinin xam tapşırığını isə heç vaxt saxlamır. Qoruyucu mexanizmin metadatası həm
sorğu edilən, həm də effektiv analiz rejimlərini bildirir; istifadəyə yararlı istifadəçi mətni olmayan sorğu edilmiş `focused` rejimi effektiv olaraq `full` kimi bildirilir.

Qoruyucu mexanizm dəstəklənən bütün video hissələrini çıxarır, lakin
`modalityBridgeVideoMaxVideos` sayından çoxunu təsvir etmir.
`supportsVideo === false` olduğu sübut edilmiş hədəf üçün uğursuz və həddi aşan videolar açıq təhlükəsiz
mətn işarələrinə çevrilir ki, heç bir xam video qalmasın. İmkan məlum olmadıqda həmin hissələr
video daşıyıcısını saxlayır; istənilən ehtiyat transkript yuxarıdakı məhdudlaşdırılmış mətn
çevrilməsinə uyğun olur. `supportsVideo === true` olan hədəflər körpüdən yan keçir.
Müştəri sorğusunun dayandırma siqnalı endirmə, broker növbəsi,
alt proseslər və təsvir çağırışları boyunca ötürülür; dayandırmalar videolar arasında prosesi dayandırır
və heç vaxt xam mediaya açıq keçidlə nəticələnmir.

İcra vaxtı parametrləri DB-də saxlanılır və Zod ilə doğrulanır:

| Açar                                | Standart    | Diapazon / davranış                                                                                                   |
| ----------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | İstəyə bağlı icra mühiti, aktivləşdirmə tələb olunur                                                                  |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` ümumi təsvirləri qoruyur; `focused` məhdudlaşdırılmış, etibarsız ən son istifadəçi kontekstindən istifadə edir |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge modelini miras alır                                                                                     |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                  |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` və ya proporsional `segment_aware`; detektor nasazlığı zamanı `uniform` istifadə olunur      |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                   |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                        |

Əvvəldən saxlanmış, 120 saniyədən yuxarı Video taymaut dəyərləri brokerin son
müddətinə uyğun məhdudlaşdırılır; bu həddi aşan yeni parametr yazılışları rədd edilir.
`GET /api/modality-bridge/video/runtime` autentifikasiya və ya icra mühitinin
yoxlanmasından əvvəl etibarlı şəkildə işarələnmiş lokal geri dövrə mənsubluğu
tələb edir, sonra isə idarəetmə autentifikasiyası tələb olunur. O, yalnız
`available`, təmizlənmiş FFmpeg/ffprobe versiyalarını və icra mühiti əlçatan
olmadıqda sabit səbəbi qaytarır. Daxili çıxarış son nöqtəsi ictimai fayl yükləmə
API-si deyil: növbənin dolması `503` və `Retry-After`, çağıranın əlaqəni kəsməsi
`499`, sabit broker son müddətinin bitməsi isə `504` qaytarır. Çevrilmiş cavablar
Vision və ya Audio seqmentlərini silmədən mərkəzi `x-omniroute-modality-bridge`
başlığına `video->text;model=<visionModel>;parts=<videos>` əlavə edir.

### PII Maskalayıcısı (`piiMasker.ts`)

**Hər iki** mərhələdə işləyir.

- **`preCall`** faydalı yükü klonlayır, `system`, `messages`, `input` və
  `prompt` sahələrini (sadə sətir elementləri daxil olmaqla) gəzir və sətir tipli
  `content`/`text` sahələrinə `processPII()` (`@/shared/utils/inputSanitizer`
  modulundan) tətbiq edir. `PII_REDACTION_ENABLED=true` olduqda aşkarlanmış PII
  çıxış faydalı yükündə redaktə edilir. Bu, `INPUT_SANITIZER_MODE` parametrindən
  (yalnız prompt inyeksiyası siyasətini idarə edir) asılı deyil. Redaktə söndürüldükdə
  çağırış, məzmunu yenidən yazmadan aşkarlama saylarını qeydə alır.
- **`postCall`** cavabı dərin klonlayır, `sanitizePIIResponse()` və
  Responses-API formatı maskalayıcısını (`maskResponsesOutput` —
  `output_text` və `output[].content[].text` sahələrini əhatə edir) işə salır.
  Hər hansı redaktə baş verərsə, dəyişdirilmiş cavab orijinalı əvəz edir.

Qoruyucu mexanizm heç vaxt bloklamır; yalnız annotasiya edir
(`meta.detections`, `meta.redacted`) və ya yenidən yazır.

#### Növ üzrə seçim, fərdi nümunələr və aşkarlama sayğacları

**İdarəetmə paneli → Parametrlər → Təhlükəsizlik → PII maskalanması** _nəyin_
maskalanacağını seçir. O, maskalanmanı aktivləşdirmir: bunun üçün hələ də
`PII_REDACTION_ENABLED` (sorğu) və `PII_RESPONSE_SANITIZATION` (cavab + SSE)
istifadə olunur və hər ikisi standart olaraq söndürülüb.

- **Növ üzrə seçim** — daxili identifikatorlar
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`) faylında siyahıya
  alınıb. Təyin edilməməsi bütün növlər deməkdir (bu parametr mövcud olmamışdan
  əvvəlki davranış). Sorğu mühərrikinin `ssn_us` nümunəsi `ssn` ilə
  əlaqələndirilir. Şablonlar (Minimal, Standart, Maliyyə, Braziliya, ABŞ, Tam)
  yalnız UI-dəki seçim xanalarını doldurur.
- **Fərdi nümunələr** — 20-dək regex və ya wildcard nümunəsi (`*` = 64-dək
  boşluq olmayan simvol, `?` = bir simvol). Uyğunluqlar `[CUSTOM_REDACTED]`
  ilə əvəz olunur. Hər nümunə `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`) funksiyasından keçirilir: maksimum
  500 simvol, bayraqlar yalnız `g i m s u` ilə məhdudlaşır, kompilyasiya
  olunmalı, `safe-regex` yoxlamasından (fəlakətli geri izləmə) keçməli və boş
  sətirə və ya redaktə yer tutucusuna uyğun gəlməməlidir. Yoxlamadan keçməyən
  nümunə saxlanarkən və sınaqdan keçirilərkən rədd edilir; yoxlamadan keçməyən
  saxlanmış sətir isə kompilyasiya edilmək əvəzinə icra zamanı ötürülür. Fərdi
  nümunələr yalnız maskalanma aktiv olduqda işləyir.
- **Aşkarlama sayğacları** — yaddaşda saxlanılan və yenidən başlatma zamanı
  sıfırlanan növ üzrə saylar (uyğun gəlmiş dəyərlər heç vaxt saxlanmır)
  (`src/lib/pii/piiDetectionStats.ts`). Onlar yalnız maskalanma aktiv olduqda artır.

Parametrlər `key_value` cədvəlində (`pii_settings` ad məkanı,
`src/lib/db/piiSettings.ts`) saxlanılır və 1 s keş vasitəsilə oxunur. API:

| Metod  | Yol                      | Məqsəd                                                                             |
| ------ | ------------------------ | ---------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Bayraq vəziyyəti, `enabledTypes`, `customPatterns`, aşkarlama sayğacları           |
| `PUT`  | `/api/settings/pii`      | `enabledTypes` (`null` = hamısı) və/və ya `customPatterns` dəyərlərini əvəz etmək  |
| `POST` | `/api/settings/pii/test` | Bir nümunəni maksimum 8 KB-lıq nümunə üzərində sınaqdan keçirmək; heç nə saxlanmır |

Hər üçü idarəetmə autentifikasiyası tələb edir və gövdəni Zod ilə yoxlayır
(`src/shared/validation/schemas/piiSettings.ts`).

### Prompt İnyeksiyası (`promptInjection.ts`)

İstifadəçi tərəfindən təqdim edilmiş məzmunda zərərli strukturları aşkarlayır və
konfiqurasiya edilmiş siyasəti tətbiq edir. Davranış mühit dəyişənləri və
konstruktor seçimləri ilə idarə olunur:

| Parametr       | Mühit dəyişəni                                                                                                 | Defolt | Təsir                                                                                                                                                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aktivdir       | `INPUT_SANITIZER_ENABLED`                                                                                      | `true` | `false` olduqda qoruyucu mexanizm dərhal dayanır.                                                                                                                                                                                  |
| Rejim          | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                                | `warn` | İnjeksiya siyasəti: `block`, `warn` və ya `log`. (`redact` geriyə uyğunluq üçün qəbul edilir, lakin injeksiya mətnini **silməz**; sorğudakı PII məlumatlarının yenidən yazılması `PII_REDACTION_ENABLED` vasitəsilə idarə olunur.) |
| Bloklama həddi | `blockThreshold` seçimi / `INPUT_SANITIZER_BLOCK_THRESHOLD` (`INJECTION_GUARD_BLOCK_THRESHOLD` alternativ adı) | `high` | Bloklama üçün tələb olunan minimum ciddilik səviyyəsi. Defolt halda orta səviyyə yalnız müşahidə üçündür.                                                                                                                          |

**Rejim prioriteti** (`getMode`): çağıranın `options.mode` parametri →
`INJECTION_GUARD_MODE` üçün **DB funksiya bayrağı üstünlüyü** (İdarə paneli → Parametrlər →
Funksiya bayraqları) → `INJECTION_GUARD_MODE` mühit dəyişəni → `INPUT_SANITIZER_MODE` mühit dəyişəni →
`warn`. Beləliklə, idarə panelindəki üstünlük mühit dəyişənlərindən daha yüksək prioritetə malikdir və Funksiya
bayraqları interfeysi işləyən qoruyucu mexanizmi real vaxtda idarə edir (yenidən başlatma tələb olunmur). DB-dən oxuma nasazlığa qarşı təhlükəsizdir:
xəta baş verərsə, qoruyucu mexanizm mühit dəyişənlərinə əsaslanan davranışa qayıdır; heç bir
üstünlük təyin edilmədikdə isə davranış yalnız mühit dəyişənlərinə əsaslanan həlletmə ilə eyni olur.

Aşkarlama mənbələri:

1. `@/shared/utils/inputSanitizer` modulundan `sanitizeRequest()` (emal
   konveyerinin digər hissələrində də istifadə olunan ortaq detektor dəsti).
2. Daxili `DEFAULT_GUARD_PATTERNS` (hazırda `system_override_inline` və
   `markdown_system_block`; hər ikisinin ciddilik səviyyəsi `high`-dır).
3. Konstruktor seçimləri vasitəsilə ötürülən istəyə bağlı `customPatterns` (sətirlər, müntəzəm ifadələr
   və ya `{ name, pattern, severity }` qeydləri).

`mode === "block"` olduqda **və** ən azı bir aşkarlama ciddilik
həddinə çatdıqda, `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }` qaytarır. `warn`/`log` rejimlərində qoruyucu mexanizm jurnal qeydi yaradır, lakin
çağırışa icazə verir. Ortaq `evaluatePromptInjection()` köməkçi funksiyası da
reyestrdən keçmədən sorğuları qiymətləndirməli olan çağıranlar üçün ixrac edilir.

**Skan limiti (v3.8.20):** detektor birləşdirilmiş sorğu mətninin yalnız **ilk 16 KB** hissəsini
yoxlayır — `src/shared/utils/inputSanitizer.ts` faylında
`MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bayt). Həm `detectInjection()`, həm də
`evaluatePromptInjection()` nümunələr üzrə dövrü işə salmazdan əvvəl `slice(0, MAX_INJECTION_SCAN_BYTES)` tətbiq edir.
İnjeksiya direktivləri girişin başlanğıcına yaxın yerləşdiyinə görə bu,
aşkarlamanı zəiflətmədən yüzlərlə KB ölçülü faydalı yüklərdə regex CPU/GC istifadəsini məhdudlaşdırır (bax:
#3932, #4041).

### Etimadnamə maskalayıcısı (`credentialMasker.ts`)

**Hər iki** mərhələdə, defolt zəncirin sonunda (prioritet `95`) işləyir. Geniş
yayılmış API açarı / məxfi token nümunələrini çıxış faydalı yükündən (mesaj
məzmunu, alət çağırışı arqumentləri, alət nəticələri) **və** provayder cavabından redaktə edir ki,
sorğuya yerləşdirilmiş (və ya alət nəticəsi tərəfindən geri qaytarılmış) etimadnamə
yuxarı axındakı provayderə və ya yenidən müştəriyə sızmasın.

- PII redaktəsi ilə eyni qaydada **yalnız seçim əsasında aktivləşdirilir** (Sərt Qayda #20 ilə əlaqəli):
  `settings.credentialRedactionEnabled === true` **və ya**
  `CREDENTIAL_REDACTION_ENABLED=true` olmadıqda deaktivdir. Söndürüldükdə qoruyucu mexanizm heç bir əməliyyat yerinə yetirmir —
  heç vaxt bloklamır və heç vaxt yenidən yazmır.
- `redactCredentials()` bütün faydalı yük/cavab ağacını gəzir (`walkValue()`,
  prototip çirkləndirilməsinə qarşı təhlükəsizdir, `WeakSet` vasitəsilə dövrlərə qarşı təhlükəsizdir) və uyğunluqları
  `[REDACTED:<type>]` yer tutucusu ilə əvəz edir; yalnız həqiqətən
  dəyişdirilmiş budaqları klonlayır.
- `CREDENTIAL_PATTERNS` LLM provayder açarlarını (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokenlərini (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), ödəniş açarlarını (Stripe, Square), bulud
  açarlarını (AWS giriş açarı, Twilio, SendGrid, Mailgun), şəxsi açarları / JWT-ləri,
  etimadnamə ehtiva edən bağlantı sətirlərini (`mongodb://user:pass@...` və s.) və
  ümumi `Authorization`/`x-api-key`/`api-key`/`apikey` başlıq-dəyər
  nümunəsini əhatə edir. Başlıq formasındakı açarlar (`authorization`, `x-api-key`, `api-key`,
  `apikey`) ümumi mətn regex-i vasitəsilə deyil, struktur şəklində redaktə edilir (yalnız dəyər;
  `Bearer `/`Basic ` kimi sxem prefiksi saxlanılır).
- Qoruyucu mexanizm heç vaxt bloklamır; yalnız yenidən yazır (`modifiedPayload` /
  `modifiedResponse`) və annotasiya əlavə edir (`meta.credentialsRedacted`, `meta.count`).

Reqressiyadan qorunma: `tests/unit/credential-masker-guardrail.test.ts`.

## Əsas müqavilə (`base.ts`)

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
  block?: boolean; // true zənciri dərhal dayandırır
  message?: string; // bloklama zamanı göstərilir
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // sorğunu yenidən yazmaq üçün preCall tərəfindən qaytarılır
  modifiedResponse?: TValue; // cavabı yenidən yazmaq üçün postCall tərəfindən qaytarılır
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

Qoruyucu mexanizm `void`, `{}` və ya `{ block: false }` qaytarmaqla "dəyişiklik yoxdur"
siqnalını verir. `modifiedPayload`/`modifiedResponse` qaytarılması zəncir boyunca
sonrakı qoruyucu mexanizmlərə ötürülən dəyəri əvəz edir.
`signal?: AbortSignal` çağıranın həyat dövrünü qoruyucu mexanizmlərə ötürür. Sorğunun ləğv edilməsi qəsdən tətbiq olunan fail-open istisnasıdır: media körpüləri işi dayandırır və təmizləmə aparır, lakin emal edilməmiş medianı onu dəstəkləmədiyi məlum olan hədəfə bərpa etmir.

## Reyestr (`registry.ts`)

Tək nümunəli `guardrailRegistry` aşağıdakıları təqdim edir:

- `register(guardrail)` — qoruyucu mexanizm əlavə edir (və ya normallaşdırılmış ada görə əvəz edir) və
  artan `priority` sırasına görə yenidən çeşidləyir.
- `clear()` / `list()` — inzibati köməkçi funksiyalar.
- `runPreCallHooks(payload, context)` — aktiv qoruyucu mexanizmlər üzrə iterasiya edir, payload-u
  `modifiedPayload` vasitəsilə zəncir boyunca ötürür və ilk `block: true` halında dayanır.
- `runPostCallHooks(response, context)` — cavab tərəfində eyni axını icra edir.
- `resetGuardrailsForTests({ registerDefaults })` — vəziyyəti təmizləyir və təmiz test izolyasiyası üçün istəyə bağlı olaraq
  standartları yenidən qeydiyyatdan keçirir.

Hər iki icra mexanizmi `{ blocked, payload|response, results, guardrail?, message? }`
qaytarır; burada `results` hər qoruyucu mexanizm üzrə
`blocked`, `skipped`, `modified`, `error` və `meta` sahələrini ehtiva edən
`GuardrailExecutionResult` qeydləri massividir və izləmə üçün faydalıdır.

### Hər sorğu üzrə qoruyucu mexanizmlərin deaktiv edilməsi

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` cari sorğu üçün
ötürülməli olan qoruyucu mexanizm adlarının təkrarlanmayan siyahısını toplayır.
Mənbələr (hamısı istəyə bağlıdır və hamısı birləşdirilir):

- `apiKeyInfo.disabledGuardrails`
- Sorğunun gövdəsində `disabledGuardrails` (yuxarı səviyyə)
- Sorğunun gövdəsində `metadata.disabledGuardrails`
- `x-omniroute-disabled-guardrails` başlığı (və ya köhnə
  `x-disabled-guardrails`)

Dəyərlər sətirlər massivləri və ya vergüllə ayrılmış sətir ola bilər; adlar
kiçik hərflərlə kebab-case formatına normallaşdırılır (`pii_masker` → `pii-masker`). Nəticə
`context.disabledGuardrails` vasitəsilə reyestrə ötürülür və reyestr uyğun gələn
qoruyucu mexanizmləri ötürür (`results` daxilində `skipped: true`).

## İcra ardıcıllığı

`src/sse/handlers/chat.ts` və `open-sse/handlers/chatCore.ts` vasitəsilə keçən hər bir sorğu üçün:

1. `resolveDisabledGuardrails(...)` API açarı, sorğu gövdəsi və başlıqlar əsasında ötürüləcək qoruyucu mexanizmlərin siyahısını yaradır.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` qoruyucu mexanizmləri artan prioritet sırası ilə işə salır:
   - Deaktiv edilmiş qoruyucu mexanizmlər `skipped` kimi qeydə alınır.
   - Hər qoruyucu mexanizmin `preCall` funksiyası `modifiedPayload` vasitəsilə faydalı yükü yenidən yaza bilər.
   - İlk `block: true` zənciri qısa qapayır və emalçı qoruyucu mexanizm tərəfindən rədd cavabı qaytarır.
3. Dəyişdirilmiş ola bilən faydalı yük kombinə edilmiş marşrutlaşdırmaya və yuxarı axına göndərilməyə ötürülür.
4. Cavab formalaşdırıldıqdan sonra `guardrailRegistry.runPostCallHooks(...)` cavab üzərində eyni zənciri işə salır. Buradakı `block: true` yuxarı axın cavabını ləğv edir.

İstisna atan qoruyucu mexanizmlər `error: <message>` ilə qeydə alınır və `logger.warn` vasitəsilə jurnala yazılır, lakin zəncir davam edir — bu, dizayn etibarilə nasazlıq zamanı icazəvermə yanaşmasıdır.

## Konfiqurasiya

Daxili qoruyucu mexanizmlərin oxuduğu mühit dəyişənləri:

| Dəyişən                               | İstifadə edən             | Təsir                                                                                                         |
| ------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Aşkarlamanı tamamilə deaktiv etmək üçün `false` təyin edin.                                                   |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | İnjeksiya siyasəti: `warn`, `block` və ya `log`. Köhnə `redact` dəyəri injeksiya mətnini yenidən yazmır.      |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | İnjeksiya qoruyucusunun rejimi; həmçinin mühit dəyişənlərini **üstələyən** DB funksiya bayrağıdır (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | `MODE=block` tərəfindən rədd edilən minimum ciddilik səviyyəsi: `high` (standart), `medium` və ya `low`.      |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | `INPUT_SANITIZER_BLOCK_THRESHOLD` üçün köhnə alternativ ad.                                                   |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | `true` olduqda sorğudakı PII redaktə edilir (injeksiya rejimindən asılı olmayaraq).                           |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (aşağı axın) | Cavab tərəfindəki maskalayıcının davranışını idarə edir.                                                      |

Modality Bridge qoruyucu mexanizmləri mühit dəyişənlərindən deyil, DB dəstəkli parametrlər anbarındakı icra vaxtı konfiqurasiyasını (`getSettings()`) oxuyur. Vision üçün əsas açarlar bunlardır:
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` və
`modalityBridgeCacheMaxEntries`. Köhnə
`visionBridge*` açarları yalnız sənədləşdirilmiş bir dövrlük oxuma ehtiyat variantı kimi qəbul edilir; idarəetmə panelindəki yazma əməliyyatları əsas açarlardan istifadə edir. Standart dəyərlər və ehtiyat həll mexanizmi `src/shared/constants/modalityBridgeDefaults.ts` daxilindədir, köhnə sabitlər isə `src/shared/constants/visionBridgeDefaults.ts` daxilində saxlanılır.

Audio `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` və `modalityBridgeAudioMaxClips`, həmçinin ortaq
`modalityBridgeCache*` parametrlərindən istifadə edir. Bu açarlar Modality Bridge sxemi ilə təqdim edildiyinə görə Audio üçün köhnə açarlara ehtiyat keçid yoxdur.

Video `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` və
`modalityBridgeVideoTimeout`, həmçinin ortaq `modalityBridgeCache*` parametrlərindən istifadə edir.
FFmpeg/ffprobe istəyə bağlı əməliyyat asılılıqları olduğuna, kadrların təsvir edilməsi isə gecikmə və model xərci yaratdığına görə bu funksiya standart olaraq deaktivdir.

## Fərdi qoruyucu mexanizmlər

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

Addımlar:

1. `BaseGuardrail` sinfini genişləndirən `src/lib/guardrails/myGuardrail.ts` faylını yaradın.
2. `preCall` və/və ya `postCall` metodunu reallaşdırın.
3. Ya import zamanı qeydiyyatdan keçirin (`registerDefaultGuardrails` daxilindən əlavə edin), ya da
   icra zamanı `guardrailRegistry.register(...)` çağırın — reyestr eyni normallaşdırılmış ada
   malik əvvəlki qoruyucu mexanizmi əvəz edir.
4. Testləri `tests/unit/` altında əlavə edin (mövcud nümunələr:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testləmə

Məlum vəziyyətdən başlamaq üçün testlər arasında `resetGuardrailsForTests()` istifadə edin.
Boş reyestrlə başlamaq və yalnız test edilən qoruyucu mexanizmləri qeydiyyatdan keçirmək
üçün `{ registerDefaults: false }` ötürün. Vision Bridge asılılıqların yeridilməsini
(`deps.getSettings`, `deps.callVisionModel`) qəbul edir; Audio Bridge isə parametrlər,
imkanlar, STT modelinin seçimi, giriş məlumatlarının yoxlanılması və transkripsiya üçün
ekvivalent müdaxilə nöqtələri təqdim edir. Buna görə də testlər hər iki axını DB və ya
şəbəkə çıxışı olmadan sınaqdan keçirə bilər.

## Həmçinin baxın

- `src/lib/guardrails/` — reallaşdırma
- `src/shared/utils/inputSanitizer.ts` — prompt inyeksiyasını və PII maskalanmasını
  təmin edən ortaq detektor
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge standartları və
  məcburi körpü model siyahısı
- `src/shared/constants/modalityBridgeDefaults.ts` — ortaq Vision/Audio icra mühiti standartları
- `docs/architecture/RESILIENCE_GUIDE.md` — ortoqonal qat (dövrə kəsicisi, gözləmə müddətləri)
- `docs/reference/ENVIRONMENT.md` — mühit dəyişənlərinin tam arayışı

## İnyeksiya qoruyucusunun marşrut əhatəsi və red-team (Mərhələ 8 · Blok D)

İnyeksiya qoruyucusu (`createInjectionGuard` / `withInjectionGuard`) istifadəçi promptlarını
qəbul edən bütün marşrutları əhatə edir. O, `INJECTION_GUARD_MODE` parametrinə riayət edir
(standart `warn` = yalnız jurnala yazır; `block` = HTTP 400 `SECURITY_001` qaytarır).

| Növ           | Marşrutlar                                                                                                                                           | Standart rejim |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Mətn (mövcud) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn           |
| Generativ     | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn           |
| Məlumat       | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn           |

Mətnin çıxarılması (`extractMessageContents`) `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` sahələrini əhatə edir.

**Red-team (gecəlik, `nightly-llm-security.yml`):** promptfoo hər bir marşrutun
`INJECTION_GUARD_MODE=block` rejimində OWASP-LLM korpusunu blokladığını yoxlayır; garak
sınaqları işə salır (gizli açar olmadıqda ötürür). `moderations` ardıcıllıq naminə daxil
edilib — `block` rejimindəki operatorlar onu `resolveDisabledGuardrails` vasitəsilə istisna
edə bilərlər.

Gecəlik iş axınının (`.github/workflows/nightly-llm-security.yml`, cron + əl ilə
işə salma) iki tapşırığı var:

- **`promptfoo-guard` (bloklayıcı)** — `INJECTION_GUARD_MODE=block` ilə
  `promptfoo eval -c promptfooconfig.yaml` əmrini işlədir. Hər bir rəqib ssenari
  (məsələn, "əvvəlki bütün təlimatlara məhəl qoyma…", DAN üslublu jailbreak-lər)
  cavabın `error.code === "SECURITY_001"` daşıdığını, yəni qoruyucunun sorğunu
  həqiqətən rədd etdiyini təsdiqləyir.
- **`garak` (məşvərətçi)** — yerli OmniRoute instansiyasına
  (`http://localhost:20128/v1`) qarşı garak-ı `--probes promptinject,dan,leakreplay`
  ilə işə salır. Provayderin gizli açarından (`PROMPTFOO_PROVIDER_KEY`) asılıdır;
  açar olmadıqda problemsiz ötürülür və sonuna `|| true` əlavə edilib, buna görə
  CI prosesini uğursuz etmədən hesabat verir.

Qoruyucu köməkçi funksiyanın (`createInjectionGuard` / `withInjectionGuard`) əhatəsi
prompt daşıyan hər bir `/v1` marşrutunu əhatə edir; prompt mətni
`src/shared/utils/inputSanitizer.ts` daxilindəki `extractMessageContents()` tərəfindən
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` sahələrindən
götürülür.
