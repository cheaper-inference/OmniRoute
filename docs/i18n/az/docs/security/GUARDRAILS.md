# Guardrails (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Həqiqət mənbəyi:** `src/lib/guardrails/`
> **Son yenilənmə:** 2026-10-17 — v3.8.52 (əlavə edildi: [Əhatə və məhdudiyyətlər](#coverage-and-limits):
> hook-ların hansı marşrutlara və cavab yollarına çatdığı, birləşdirilmiş deaktivasiya başlıqları (#16412),
> məcburi sərhəd kimi inyeksiya blok rejimi (#16413) və post-call-dan əvvəl cavabı nəyin gördüyü)

Guardrail-lər OmniRoute ilə yuxarı axın provayderlər arasındakı sərhəddə
təhlükəsizlik, siyasət və məzmun çevrilmələrini icra edir. Hər bir guardrail
sorğu yüklərini (`preCall`) və yuxarı axın cavablarını (`postCall`) yoxlaya
(və istəyə bağlı olaraq rədd edə, çevirə və ya annotasiya edə) bilər.

Sistem **fail-open** prinsipi ilə işləyir: əgər guardrail icra zamanı xəta
atarsa, reyestr xətanı qeydə alır və sorğunu uğursuz elan etmək əvəzinə
növbəti guardrail ilə davam edir. Bloklama aşkar qərardır (`block: true`),
heç vaxt təsadüf deyil. Yeganə istisna ləğv edilmiş sorğudur: çağırıcının
`signal`-ı ləğv edildikdə, xəta atan guardrail ötürülmək əvəzinə hook
icrasını rədd edir.

Hook-lar hər marşrutda və ya hər cavabda **işləmir**. Guardrail-dan
təhlükəsizlik nəzarəti kimi istifadə etməzdən əvvəl
[Əhatə və məhdudiyyətlər](#coverage-and-limits) bölməsini oxuyun.

## Daxili Guardrail-lər

Reyestr import zamanı prioritet sırası ilə altı guardrail-i avtomatik yükləyir
(`registry.ts` → `registerDefaultGuardrails()` bölməsinə baxın):

| Prioritet | Ad                  | Mərhələ(lər)   | Fayl                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Daha aşağı prioritet nömrələri **əvvəl** icra olunur.

### Vision Körpüsü (`visionBridge.ts`) — Modallıq Körpüsü PR-1

GLM 5.3 əsas modeli və `glm-5.3-{low,high,max}` modelləri açıq şəkildə
`supportsVision:false` reyestr/spec metadatasına malikdir. GLM 5.3 Flash variantları
isə yerli görmə dəstəkli modellər olaraq qalır. Claude Code-un `/v1/messages` marşrutu
Claude-dan OpenAI-yə tərcümədən **əvvəl** paylaşılan `handleChat` pre-call guardrail
zəncirinə daxil olur; iç-içə `Read` alət-nəticəsi şəkilləri OpenAI
`image_url` məzmununa qaldırılmadan əvvəl təsvir edilməli və ya işlənməlidir (#17069).

**Görmə dəstəyi olmayan modellərə** yönəlmiş şəkil ehtiva edən sorğuları
tutur və ya bütün sorğunu görmə dəstəyi olan modelə yönləndirir, ya da yuxarı axın
çağırışından əvvəl şəkil hissələrini konfiqurasiya edilə bilən görmə modeli
tərəfindən yaradılan mətn təsvirləri ilə əvəz edir. Bu, yalnız mətn dəstəkləyən
provayderlərə multimodal payload-ları şəffaf şəkildə emal etməyə imkan verir.

Axın:

1. Hədəf model artıq görməni dəstəkləyirsə, buraxılır (`isVisionBridgeForcedModel`
   məcburi körpü siyahısında görünməsi istisnadır).
2. `extractImageParts(messages)` vasitəsilə şəkil hissələrini çıxarır
   (`visionBridgeHelpers.ts`); bu funksiya `open-sse/utils/mediaParts.ts` daxilindəki
   combo uyğunluq filtri ilə paylaşılan vahid həqiqət mənbəyi olan **vahid media
   detektoru** `detectMediaParts()` funksiyasına delegasiya edir.
   Çıxarma yalnız `replaceImageParts` funksiyasının geri yerləşdirə biləcəyi formalara
   allowlist ilə məhdudlaşdırılır (çıxarma↔əvəzləmə müqaviləsi): OpenAI
   `image_url`, Anthropic `source.type:"base64"`, Anthropic URL
   `source.type:"url"` və Responses API `input_image`. Claude Code
   `tool_result.content` daxilində və Responses alət çıxışlarında iç-içə yerləşən
   uyğun şəkillər də çıxarılır və ilkin yollarında əvəzlənir; yalnız indikator olan
   formalar combo-filtr materialıdır və çıxarılmır.
   Heç biri tapılmadıqda buraxılır.
3. İşləmə zamanı konfiqurasiyanı `resolveVisionBridgeRuntimeSettings()` vasitəsilə
   həll edir (`src/shared/constants/modalityBridgeDefaults.ts`): yeni
   `modalityBridge*` parametr açarları üstünlük qazanır; köhnə `visionBridge*`
   açarları **bir dövrəlik geri dönüş** kimi saxlanılır (geri qaytarma pəncərəsi).
   Körpü deaktiv edilibsə, hər hansı media keçidindən əvvəl buraxılır.
4. Rejim seçicisi (`modalityBridgeVisionMode`, aşağıdakı cədvələ baxın)
   yönləndirmə və təsvir etmə arasında seçim edir. Yönləndirmə yalnız `model` sahəsi
   dəyişdirilmiş `modifiedPayload`, həmçinin `{ rerouted, fromModel, toModel, imagesKept }`
   metadatasını qaytarır.
5. Təsvir yolunda: şəkillərin sayını `maxImages` ilə məhdudlaşdırır, tapşırığa uyğun
   sorğunu formalaşdırır, təsvir keşinə müraciət edir, görmə modelini **paralel**
   çağırır (`Promise.allSettled`) və onların yerinə `[Image N]: <description>` mətn
   hissələrini daxil edir. Uğursuz təsvir `null` qaytarır: xam şəkil naməlum/görmə
   dəstəyi olan hədəflər üçün qorunur (#4012), lakin **görmə dəstəyi olmayan olduğu
   təsdiqlənmiş birbaşa hədəfə** və ya sıfır görmə dəstəyi olan combo-ya hər
   təsvir olunmamış şəkil üçün, qismən uğursuzluqlar və təsvir çağırışı limitini
   aşan şəkillər də daxil olmaqla, açıq
   `(unavailable — no vision-capable provider connected)` mətn stub-ı əlavə edilir
   (#17069). Mövcud bütün çağırışların uğursuz olduğu combo təsviri üçün geri dönüş
   mexanizmi qüvvədə qalır (#8430).
6. `modifiedPayload` və meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`) qaytarır.

#### Rejim seçicisi (`modalityBridgeVisionMode`)

| Rejim      | Defolt | Davranış                                                                                                                                                                                                                                                                                                      |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | Dəyişdirilməmiş köhnə evristika (#6640/#7204): combo olmayan/`auto/` modelləri, ilkin modelin artıq istifadə edilə bilən kredensialları olduğu halda (bu zaman təsvir edilir) ən yaxşı görmə modelinə yönləndirir; combo hədəfləri isə həmişə təsvir edilir.                                                  |
| `describe` |        | Həmişə təsvir edir — yönləndirmə bloku tamamilə ötürülür; istifadəçinin seçdiyi model həmişə cavab verir.                                                                                                                                                                                                     |
| `reroute`  |        | Məcburi yönləndirmə: kredensialı olan modeli qoruma yoxlaması ötürülür. Yönləndirmə-**hədəfi** kredensial yoxlaması isə qüvvədə qalır — istifadə edilə bilən görmə hədəfi olmadıqda körpü təsvir etmək və ya xam şəkilləri yalnız mətn dəstəkləyən hədəfə göndərmək əvəzinə aydın xəta ilə prosesi bloklayır. |

Məcburi rejimlər `auto` evristikası işə düşməzdən **əvvəl** qısa yoldan icra olunur;
`auto` davranışı PR-1-dən əvvəlki guardrail ilə bayt səviyyəsində eynidir.

#### API açarı əhatə dairəsi (`visionBridgeKeyScope.ts`)

Zəng edən tərəfin API açarı `allowedConnections`, kvota hovuzlarını
(`allowedQuotas`) və ya modelləri (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`) məhdudlaşdırdıqda, bridge yalnız açarın istifadə edə bildiyi bağlantılarda, açarın istifadə edə bildiyi reroute və describe modellərini seçir. Describe çağırışı daha sonra həmişə `x-omniroute-self-loop-key-id` başlığı ilə OmniRoute self-loop vasitəsilə həyata keçirilir, beləliklə qəbul edən chat sorğusu həmin açarın bağlantı və model siyasətini yenidən tətbiq edir. `enforceApiKeyPolicy()` həmin başlığa yalnız self-loop bearer ilə birlikdə riayət edir; buna görə də giriş imkanlarını yalnız daralda bilər və həll olunmayan ID rədd edilir.

Açar üçün heç bir vision modelinə icazə verilmirsə, **təsdiqlənmiş yalnız mətn hədəfi** şəkil sorğusunu uyğun olmayan upstream-ə şəkil baytlarını yönləndirmək əvəzinə, yerli olaraq aydın HTTP 400 xətası ilə rədd edir (#17069). Naməlum və ya native vision imkanına malik hədəflər üçün describe yolu əvvəlki fail-open davranışını saxlayır (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Açar olmadan edilən sorğular və bu məhdudiyyətləri olmayan açarlar əvvəlki kimi davranır.

#### Tapşırıqdan xəbərdar describe prompt-u (`modalityBridgeVisionTaskAware`)

Defolt **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) əsas describe prompt-una **son istifadəçi mesajının** mətnini (500 simvola qədər qısaldılmış) əlavə edir; bu, təsviri istifadəçinin əslində nə istədiyinə yönəldir (codex-vision-proxy nümunəsi) və vision modelindən görünən mətni transkripsiya etməyi xahiş edir. Flag deaktiv olduqda — və ya istifadəçi mətni olmadıqda — əsas prompt dəyişdirilmədən istifadə olunur.

Describe self-loop-un öz OpenAI-uyğun sorğusu (`visionBridgeHelpers.ts` daxilindəki `callVisionModelSingle()`) həmişə `image_url.detail: "high"` tələb edir — hər bir caller/provider üçün qeyd-şərtsiz və heç bir client siqnalına əsaslanmadan. Aşağı detal səviyyəsində nümunə götürülməsi məhz bu prompt-un tələb etdiyi mətn transkripsiyası tapşırığı üçün OCR dəqiqliyini azaldır; buna görə describe çağırışı ilkin inbound sorğuda istifadə olunan detal səviyyəsindən asılı olmayaraq həmişə yüksək detal tələb edir. Bu, yalnız daxili describe sorğusunun body-sinə təsir edir; OmniRoute-un caller-in öz `image_url.detail` dəyərini əsas sorğuda necə yönləndirdiyini dəyişmir — həmin defolt ayrıca və yalnız aşkarlanmış OpenCode client-ləri üçün `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`) daxilində tətbiq edilir. Describe self-loop-un Anthropic wire-format qolu `detail` sahəsinə malik deyil və hər iki defoltdan təsirlənmir.

#### Describe çıxış limiti (`modalityBridgeVisionMaxChars`)

| Açar                           | Defolt | Diapazon            |
| ------------------------------ | ------ | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` və ya 100–50000 |

`0` (defolt) **heç bir limitin olmaması** deməkdir — `callVisionModel()` tərəfindən qaytarılan təsvir dəyişdirilmədən ötürülür və mövcud davranış qorunur. 100–50000 diapazonundakı istənilən dəyər təsviri `[Image N]: <description>` kimi yenidən yerləşdirilməzdən əvvəl `…` suffiksi ilə qısaldır (`src/lib/guardrails/visionBridge.ts` daxilində `VisionBridgeGuardrail.preCall()`). Downstream modelə tam transkripsiya lazım olan, detallı OCR tapşırıqları üçün bu dəyəri artırın; çox danışan vision modellərində token istifadəsini məhdudlaşdırmaq üçün azaldın. Dashboard sahəsi Vision tab-ının Advanced panelində yerləşir (`ModalityBridgeVisionTab.tsx` daxilində `modality-bridge-max-chars`) və 1 ilə 99 arasındakı istənilən dəyəri 100 minimumuna qaldırır, açıq şəkildə verilmiş `0` dəyərini isə dəyişməz saxlayır — `0` sadəcə “təyin edilməyib” defoltu deyil, ayrıca etibarlı Zod dəyəridir (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`).

#### Describe keşi (`modalityBridge/bridgeCache.ts`)

Describe çıxışları üçün proses boyu paylaşılan yaddaşdaxili LRU + TTL keşi.
Açar uzunluq prefiksi ilə çərçivələnmiş `sha256(imageRef + composedPrompt + configuredBridgeModel)` dəyəridir (sahə sərhədləri arasında toqquşma yoxdur). Model komponenti faktiki cavabı verən model deyil, **konfiqurasiya edilmiş** bridge modelidir — `callVisionModel` daxildə fallback edə bilər və hər cəhd üzrə açar yaratmaq keşi parçalayardı. Uğursuz describe nəticələri heç vaxt keşlənmir. Parametrlər:

| Açar                            | Defolt | Diapazon |
| ------------------------------- | ------ | -------- |
| `modalityBridgeCacheEnabled`    | `true` | —        |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440   |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000  |

#### Uzaq şəkillərin normallaşdırılması (self-loop describe/base64 fetch)

Bridge **uzaq** şəkli özü gətirdikdə — həm Anthropic describe self-call, həm də claude-wire-format base64 çevrilməsi (`ensureBase64ImagesForClaudeWire`), hər ikisi `visionBridgeHelpers.ts` daxilindəki `fetchRemoteImageAsDataUri()` vasitəsilə — alınan data URI vision-model sorğusuna yerləşdirilməzdən əvvəl `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) funksiyasından keçirilir. Həddən artıq böyük şəkillər **2048px uzun kənara** qədər kiçildilir (bu, OpenAI/Anthropic-in artıq server tərəfində tətbiq etdiyi ölçü limitinə uyğundur); beləliklə vision modelin gördüyü məzmun dəyişmədən yükləmə baytları və gecikmə azalır. Ölçüləndirmə dinamik import vasitəsilə yüklənən `sharp` istifadə edir: platformada onun native binary-si yüklənə bilmədikdə, `normalizeDataUri()` **heç vaxt xəta yaratmır** — ilkin baytları olduğu kimi ötürür; beləliklə describe/base64-conversion yolu həmişə işlək qalır. Şəkil olmayan baytlar (decodable şəkil qaytarmayan fetch) da dəyişdirilmədən ötürülür. Bu normallaşdırma yalnız bridge-in öz self-call üçün gətirdiyi şəkillərə tətbiq olunur — opt-in-only mutation prinsipinə (Hard Rule #20) uyğun olaraq caller-in xam passthrough payload-ına heç vaxt tətbiq edilmir.

#### Parametrlər sxemi + miqrasiya

Yeni `modalityBridge*` açarları
(`src/shared/validation/settingsSchemas.ts`) daxilindəki `updateSettingsSchema` tərəfindən Zod ilə yoxlanılır:
`modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, `modalityBridgeCache*` üçlüyü və Audio Bridge tərəfindən istifadə olunan `modalityBridgeAudio*` qrupu. `141_modality_bridge_settings.sql` miqrasiyası mövcud köhnə `visionBridge*` dəyərlərini uyğun yeni açarlara köçürür (idempotentdir, operator tərəfindən təyin edilmiş `modalityBridge*` dəyərinin üzərinə heç vaxt yazmır); köhnə açarlar bir buraxılış dövrü ərzində oxuma ehtiyatı kimi qəbul edilməyə davam edir.

#### Şəffaflıq başlığı + statistika

Təsvirə çevrilmiş cavablar
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
daşıyır (bu başlıq `modalityBridge/bridgeStats.ts` daxilindəki
`buildModalityBridgeHeader()` tərəfindən yaradılır və
`src/sse/handlers/chatHelpers.ts` daxilindəki
`withModalityBridgeHeader()` tərəfindən əlavə olunur). Yenidən yönləndirilmiş sorğular heç bir başlıq almır — payload dəyişdirilməyib və model dəyişməsi cavab gövdəsinin `model` sahəsində artıq görünür.

`GET /api/modality-bridge/stats` (idarəetmə autentifikasiyası, `GET /api/settings` ilə eyni səviyyə) `vision`, `audio` və `video` üçün yaddaşdakı modallıq üzrə sayğacları
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` qaytarır. `averageLatencyMs` məxrəc kimi bütün cəhdlərdən deyil, `latencySamples`-dan istifadə edir; zaman ölçümü olmayan əməliyyat sıfır millisaniyəlik nümunə yaratmır. `bridged` uğurlu çevirmələr üçün geriyə uyğun ləqəb olaraq qalır; uğursuz cəhdlər onu artırmır.
Sayğaclar dizayn üzrə proses yenidən başladıldıqda sıfırlanır
(mühasibat uçotu deyil, telemetriyadır).

#### İdarə panelinin konfiqurasiyası

Xüsusi idarə paneli səhifəsi
`/dashboard/settings/modality-bridge` ünvanındadır. URL ilə ünvanlana bilən `Vision`, `Audio` və `Video` tabları `tab` dəyərini dəyişərkən sorğu parametrlərini qoruyur.
Vision tabı aktivləşdirmə, rejim, model seçimi (avtomatik standart seçim daxil olmaqla), tapşırıqdan xəbərdar prompt qurulması, qabaqcıl timeout/şəkil/təsvir uzunluğu/cache limitlərini, icra zamanı sayğaclarını və qorunan nümunə sorğusunu təqdim edir. Audio tabı da aktivdir: aktivləşdirməni, yalnız STT üçün Auto seçiminə malik model seçicisini, timeout/maksimum klip limitlərini, audio sayğaclarını və `input_audio` nümunə testini təqdim edir. Video tabı funksionaldır: FFmpeg/ffprobe icra mühitinin vəziyyətini — dörd açıq UI vəziyyətindən birini — göstərir (`unknown`, yoxlama davam edərkən və ya tamamlana bilmədikdə; `restricted`, yoxlama müştəri tərəfində loopback olmayan idarə paneli hostunda ötürüldükdə; `unavailable`, yoxlamadan sonra çatışmadığı təsdiqləndikdə; yaxud FFmpeg/ffprobe versiyaları ilə birlikdə `available`), enable/model/frame/video/timeout limitlərini yadda saxlayır, model seçicisini vision qabiliyyətli modellərlə məhdudlaşdırır və video sayğaclarını təqdim edir.

AI parametrləri altındakı əvvəlki Vision Bridge kartı yeni səhifəyə uyğunluq keçididir; artıq formanın ikinci nüsxəsinə sahib deyil. Media Providers də mövcud Speech-to-Text playground-ını silmədən Image-to-Text və Speech-to-Text iş axınlarını uyğun Modality Bridge tablarına yönləndirir.

**Öz-özünə dövrə üçün qəbul bypass-ı:** təsvir sorğusu OmniRoute-un öz `/v1` self-loop-u üzərindən (standart olmayan provider modelində) yönləndirildikdə, alt sorğu `x-omniroute-admission-bypass: internal` göndərir və həll edilmiş self-loop credential-ı ilə autentifikasiya olunur — local rejimdə lokal `sk_omniroute` sentinel-i, yaxud operator tərəfindən konfiqurasiya edilmiş `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env açarı (#1350); beləliklə `REQUIRE_API_KEY=true` yerləşdirmələri təsvir sorğusunu yenə də icra edə bilər. Bypass yalnız həmin dəqiq credential-lar üçün nəzərə alınır; buna görə xarici müştərilər qəbul yoxlamasını keçmək üçün başlıqdan istifadə edə bilməz.

Köhnə standartlar `src/shared/constants/visionBridgeDefaults.ts` daxilində yerləşir; yeni mode/task-aware/cache standartları və settings resolver `src/shared/constants/modalityBridgeDefaults.ts` daxilindədir. Guardrail konstruktor seçimi kimi `deps` təqdim edir ki, testlər saxta `getSettings` və `callVisionModel` implementasiyalarını daxil edə bilsin.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Audio daşıyan chat sorğularını audio girişini qəbul etdiyi məlum olmayan hədəfə çatmazdan əvvəl tutur. O, chat sorğusunu heç vaxt yenidən yönləndirmir: audio hissələri mövcud OpenAI-uyğun multipart endpoint vasitəsilə mətnə transkripsiya olunur və seçilmiş chat modeli mətn transkriptləri ilə davam edir.

Axın:

1. `supportsAudio` göstəricisini `getResolvedModelCapabilities()` vasitəsilə həll edin. Əvvəlcə provayder reyestrinin açıq metadata-sı, sonra statik model metadata-sı, daha sonra isə sinxronlaşdırılmış `modalities_input` nəzərə alınır. Elan edilmiş giriş siyahısında `audio` yoxdursa, nəticə `false`; heç bir imkan sübutu qalmadıqda isə `null` olur. Həm `false`, həm də `null` konservativ körpünü aktivləşdirir, `true` isə onu yan keçir.
2. `modalityBridgeAudio*` parametrlərini həll edin və paylaşılan `detectMediaParts()` detektoru vasitəsilə hər mesajdakı splice edilə bilən üst səviyyəli audio hissələrini çıxarın. Dəstəklənən naqil formaları OpenAI `input_audio`, `audio_url` və `source.media_type: "audio/*"`-dır. Marşrutlaşdırma üçün iç-içə audio aşkarlanır, lakin splice yolu ilə silinmir. İş `modalityBridgeAudioMaxClips` ilə məhdudlaşdırılır; sonrakı hissələr toxunulmaz qalır.
3. Konfiqurasiya edilmiş `provider/model` dəyərinə üstünlük verin və ya `selectAudioBridgeModel()` funksiyasına `AUDIO_TRANSCRIPTION_PROVIDERS` siyahısını sabit kataloq sırası ilə gəzməyə və istifadə edilə bilən aktiv provayder məlumatlarına malik ilk modeli seçməyə icazə verin.
4. `callAudioTranscription()` base64/data-URI audio məlumatını multipart `file` obyektinə çevirir və ya uzaq `audio_url` ünvanından yalnız ictimai resurslara icazə verən, DNS pinləməli və 25 MB limitli çıxış qoruyucusu vasitəsilə yükləyir. Daha sonra faylı və seçilmiş modeli `resolveSelfLoopBearer()` ilə autentifikasiya edilmiş lokal `/v1/audio/transcriptions` self-loop ünvanına POST edir. Mövcud transkripsiya marşrutu adi credential axtarışını, cooldown/rate-limit idarəetməsini və provayderə yönləndirməni həyata keçirir.
5. Uğurlu çağırışlar öz hissələrini `[Audio N]: <transcript>` ilə əvəz edir. Çağırışlar `Promise.allSettled` ilə icra olunur: ayrı-ayrı uğursuzluqlar həmin orijinal audio hissəsini saxlayır (#4012 müqaviləsi). Bütün çağırışlar uğursuz olarsa və hədəfin `supportsAudio === false` olduğu sübut edilərsə, hissələr
   `[Audio N]: (unavailable — no STT provider connected)` (#8430 müqaviləsi) şəklinə çevrilir. Naməlum hədəf (`null`) üçün bütün çağırışların uğursuz nəticəsi dəyişdirilmədən qalır. Yalnız mətn dəstəyi olduğu sübut edilən hədəf heç bir istifadə edilə bilən STT məlumatına malik deyilsə, şəbəkə çağırışı edilmədən eyni açıq stubu alır.

Uğurlu transkripsiyalar proses səviyyəsindəki Modality Bridge LRU/TTL keşindən istifadə edir. Açar audio istinadını, sabit `audio-transcription` əməliyyat etiketini və seçilmiş STT modelini birləşdirir; uğursuzluqlar heç vaxt keşlənmir. Audio cəhdləri paylaşılan `bridged`, `cacheHits`, `failures` və `lastUsedAt` sayğaclarını yeniləyir. Çevrilmiş cavablar
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` daşıyır; toxunulmamış sorğulara Audio Bridge seqmenti əlavə edilmir.

İşləmə parametrləri DB-də saxlanılır və Zod ilə təsdiqlənir:

| Açar                          | Standart | Aralıq            |
| ----------------------------- | -------- | ----------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                 |
| `modalityBridgeAudioModel`    | `""`     | Auto və ya STT ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000       |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10              |

Paylaşılan keş `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` və `modalityBridgeCacheMaxEntries` tərəfindən idarə olunmağa davam edir.

### Video Körpüsü (`videoBridge.ts`, `videoBridgePipeline.ts`)

Chat Completions `messages` və Responses API `input` daxilindəki üst səviyyəli video hissələrini, məlum yerli video dəstəyi olmayan hədəf çağırılmazdan əvvəl müdaxilə edərək emal edir. Dəstəklənən formalar `input_video`, `video_url`, `video_source`, HTTPS URL-ləri və `data:video/*;base64,...` data URI-ləridir. Mətn daxilindəki adi fayl adları video kimi qəbul edilmir.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) sorğunun travers edilməsinə, imkan/siyasət yoxlamasına, sorğu üzrə aqreqasiyaya və cavab payload-ına cavabdehdir. Hər video üzrə iş — əldə etmə, tam nəticə keşi, hər hansı çağıran tərəfindən elan edilmiş audio transkriptini birləşdirən kadr ardıcıllığının təsviri, həmçinin hər cəhd üzrə metriklər/abort/təmizləmə — `videoBridgePipeline.ts` daxilindəki `processVideoPart` arxasında gizlədilir və `preCall` dövrəsində hər video hissəsi üçün bir dəfə çağırılır. Bu modul həmçinin açıq port sərhədlərini müəyyən edir: `VideoMediaBrokerPort` (baytların əldə edilməsi və nümunələnmiş kadrların çıxarılması), `VideoAudioTranscriptionPort` (çağıran tərəfindən elan edilmiş audio transkriptinin nümunələnmiş altyazılarla birləşdirilməsi) və `VideoDrilldownPort` (kadrların detallı təhlilinin saxlanması sərhədi; hələ `processVideoPart` daxilində qoşulmayıb — hazırda detallı təhlil qeydlərini yalnız ayrıca `/api/modality-bridge/video/drilldown` marşrutu yazır).

İctimai `/v1` sorğu yolu heç vaxt subprocess idxal etmir və ya çağırmır. Uzaq videolar 50 MiB limiti altında yüklənir; daxili base64 videoları model/mesaj/kadrlaşdırma zərfinin ictimai JSON sorğularının 50 MiB qəbul limitinə sığması üçün hər video üzrə konservativ 36 MiB dekodlaşdırılmış ölçü limiti ilə məhdudlaşdırılır. Daxili uzunluq və dekodlaşdırılmış ölçü təxminləri yaddaş ayırmadan əvvəl yoxlanılır. İlkin uzaq URL və hər bir yönləndirmə üçün HTTPS tələb olunur; bunun üçün DNS pinləməli, yalnız ictimai resurslara icazə verən mövcud çıxış qoruyucusundan istifadə edilir. Daha sonra baytlar dəqiq daxili `POST /api/modality-bridge/video/extract` broker sərhədindən keçir. Bu marşrut həm `LOCAL_ONLY`, həm də `SPAWN_CAPABLE` xüsusiyyətlərinə malikdir, hər proses üçün autentifikasiya edilmiş, etibarlı loopback sorğularını qəbul edir və URL, fayl sistemi yolu, icra edilə bilən fayl və ya arqument siyahısını heç vaxt qəbul etmir. API gövdəsinin ölçüsü pipeline-ı və handler-in inkremental gövdə oxuyucusu müstəqil şəkildə broker girişini 50 MiB ilə məhdudlaşdırır. Onun məhdudlaşdırılmış növbəsi eyni anda bir çıxarış icra edir, dörd gözləyən işi qəbul edir və gözləyən girişləri 100 MiB ilə məhdudlaşdırır.

Broker daxilində `ffprobe` şəxsi lokal faylı oxuyur; sabit format icazə siyahısından pleylist və manifest formatları çıxarılıb. İcazə verilən MOV ailəsi konteynerləri üçün xarici MOV məlumat istinadları standart olaraq deaktivdir və sabit əmr onları aktivləşdirmir. Həm `ffprobe`, həm də `ffmpeg` yalnız `file` protokoluna icazə verən siyahıdan, bir axından, sabit arqument massivlərindən və shellsiz rejimdən istifadə edir; icra olunan fayllar `PATH` əsasında həll olunur. Əlavə edilmiş şəkil örtüyü axınları oxuna bilən namizədlər deyil. Oxuna bilən bütün axınlar məhdudiyyətlərə cavab verməlidir və deterministik ən aşağı indeksli ehtiyat variantdan əvvəl açıq şəkildə təyin edilmiş standart axına üstünlük verilir. Videolar 600 saniyə, hər ölçü üzrə 8.192 piksel və 33.554.432 mənbə pikseli ilə məhdudlaşdırılır. FFmpeg 1–16 ədəd orta nöqtə JPEG kadrı nümunələyir, kiçik girişləri böyütmədən uzun kənarı ən çox 1.024 pikselə qədər kiçildir və heç vaxt URL qəbul etmir. Nümunələmə standart olaraq `uniform` rejimindədir. İxtiyari `scene_aware` və eksperimental `segment_aware` siyasətləri artıq yoxlanılmış lokal axın üzərində bir əlavə sabit FFmpeg keçidi icra edir, məhdudlaşdırılmış `showinfo` səhnə vaxtlarını seçir və detektor xətası, vaxt aşımı, səhv formatlı çıxış və ya namizədlər dəstinin boş olması halında deterministik şəkildə eyni bərabər paylanmış orta nöqtələrə qayıdır. Segment-əsaslı rejim orta nöqtə nümunələrini yoxlanılmış səhnə intervallarına mütənasib şəkildə ayırır; segment-əsaslı sübutlar və ehtiyat davranışı aşağıda ətraflı təsvir olunur. Sərt 16 kadr limiti hər siyasətdə seçimdən sonra tətbiq edilir. Səhnə-əsaslı sorğunun yalnız bir kadr limiti olduqda, aktiv tam video və ya fokus pəncərəsinin bərabər paylanmış orta nöqtəsindən istifadə edir və `policyEffective: uniform` bildirir: tək seçilmiş səhnə kadrı zaman xəttinin hər iki ucunu qoruya bilməz. Çağıran tərəf ixtiyari olaraq sonlu fokus pəncərəsi (`start`/`end` saniyə) təqdim edə bilər; sərhədlər media müddətinə uyğunlaşdırılır, tərsinə çevrilmiş və ya sonlu olmayan pəncərələr rədd edilir və bütün nümunələmə siyasətləri yalnız normallaşdırılmış interval daxilində icra olunur. Nəticədə yaranan pəncərə nümunələmə metadatasına və etibarsız təsvir prefiksinə daxil edilir ki, sonrakı modellər fokuslanmış fraqmenti tam zaman xəttindən fərqləndirə bilsin.

Semantik başlıq fokusu ayrıca, açıq şəkildə təyin edilən parametrdir. Standart `full` analiz rejimi mövcud kadr sorğusunu qoruyur və sorğu mətnini heç vaxt başlıq modelinə ötürmür. `focused` rejimində körpü eyni Chat və ya Responses konteynerindən yalnız istifadəçi tərəfindən yazılmış, boş olmayan ən son `text`/`input_text` dəyərini oxuyur, onu NFC-yə normallaşdırır, idarəetmə simvollarını və boşluqları birləşdirir və 500 Unicode kod nöqtəsi ilə məhdudlaşdırır. Nəticə boş olduqda dəqiq `full` sorğusuna qayıdır. İstifadə oluna bilən göstəriş ayrıca etibarsız istifadəçi konteksti blokunda JSON kimi seriallaşdırılır və yalnız müşahidə oluna bilən detallara üstünlük verə bilər; o, mediada görünən və ya eşidilən təlimatlara əməl etməyə qarşı ayrıca xəbərdarlığı ləğv edə bilməz. Mətn fokusu heç vaxt `start`/`end` dəyərlərini çıxarmır və zaman nümunələyicisini dəyişmir.

#### FU-07 struktur segment sübutları

`segment_aware` artıq yoxlanılmış lokal video axını üzərində məhdudlaşdırılmış bir ilkin analiz keçidindən istifadə edir. Sabit filtr zənciri əvvəlcə eni ən çox 320 pikselə qədər kiçildir, səhnə dəyişikliklərini və donmuş intervalları aşkarlayır, sonra bulanıqlıq, orta luma və məkan/zaman məlumatları üçün saniyədə 1 kadr nümunələyir. Keçid 600 struktur nümunəsi, bir FFmpeg/filtr axını, eyni yalnız `file` protokoluna və konteyner icazə siyahılarına, proses çıxışı üçün 1 MiB limitinə və brokerin ortaq ləğvetmə son tarixinin daxilində ən çox 30 saniyəyə qədər məhdudlaşdırılır. O, sorğudan heç vaxt əmr, filtr, yol və ya URL qəbul etmir.

Struktur dəyərləri semantik video anlayışı deyil, deterministik nümunələmə sübutlarıdır. Onlar subyektləri, hərəkətləri, başlıqları, nitqi və ya istifadəçi niyyətini çıxarmır. Səhnə və donma sərhədləri segmentləri formalaşdırır; donma əhatəsi, bulanıqlıq, ekspozisiya, məkan detalları və zaman dəyişiklikləri yalnız mövcud 1–16 kadr büdcəsinin necə bölüşdürülməsinə təsir edir. Tamamilə donmuş segment üçün ən çox bir kadr ayrılır, donmamış segmentlər isə qalan büdcə uğrunda rəqabət aparır. Sərhədlərin sayı kadrların sayını aşdıqda, sürətli ilkin kəsimlərin uzun sonrakı segmenti gizlədə bilməməsi üçün zaman xəttinin bərabər əhatəsi saxlanılır. Donma sərhədinin 1 saniyəlik analiz dəqiqliyi daxilində olan səhnə sərhədləri birləşdirilir.

Filtrlərin çatışmaması, səhv formatlı və ya boş sübut, detektor xətası yaxud məhdudlaşdırılmış ilkin analiz vaxt aşımı dəqiq bərabər paylanmış orta nöqtə siyasətinə açıq şəkildə qayıdır. Çağıranın ləğvi və ya brokerin son tarixi açıq şəkildə geri qayıtma halı deyil: bu, icra olunan alt prosesi dayandırır, sonrakı kadr çıxarılmasının qarşısını alır və şəxsi müvəqqəti ağac `finally` daxilində silinir.

`scripts/perf/video-bridge-fu07-eval.ts` deduplikasiyadan sonrakı başlıq çağırışlarına qənaət, sıx hərəkət üçün büdcə bölgüsü, bulanıqlıq/ekspozisiya/SI-TI sübutları, uzun sonlu sürətli kəsimlər və tədricən solma üzrə yanlış pozitivlər üçün deterministik real FFmpeg qurğuları yaradır. O, ilkin analizin divar saatı müddətini və `/usr/bin/time` mövcud olduqda törəmə prosesin CPU istifadəsini və pik RSS göstəricisini qeydə alır. Onun keyfiyyət yoxlamaları yalnız struktur orakullarıdır. Real başlıq modeli keyfiyyəti `HOLD` olaraq qalır, çünki bu harness-in səlahiyyətli endpoint-i və ya dondurulmuş hakimi yoxdur. Pul qənaəti də `--caption-cost-per-call-usd` açıq şəkildə müsbət, hər çağırış üçün təxmin təqdim etmədiyi halda `HOLD` olaraq qalır; skript bu nəticələrdən heç birini uydurmur.

Hər kadr 4 MiB, bütün xam kadrlar birlikdə 23 MiB, seriyalaşdırılmış broker cavabı isə 32 MiB ilə məhdudlaşır. Şəxsi müvəqqəti kataloq `finally` daxilində silinir. OmniRoute FFmpeg-i paketə daxil etmir və xüsusi icra faylı yolunu qəbul etmir. Başlıqlama prosesindən əvvəl körpü konservativ vizual deduplikasiya mərhələsi tətbiq edir: hər JPEG 16×16 ölçülü boz tonlu buferə endirilir və yalnız saxlanılmış son kadrla müqayisə olunur. Tələb olunan başlıq büdcəsi bir kadrdan çox olduqda, çıxarış həmin büdcənin iki mislinədək, lakin heç vaxt 16 kadrdan çox olmayan məhdud namizəd hovuzu təqdim edir. Tələb olunan limit yalnız deduplikasiyadan sonra tətbiq edilir; büdcə ən azı iki olduqda, son seyrəltmə zamanı ilk və son seçilmiş namizədlər qorunur. Versiyalanmış
`grayscale-16x16-mean-cells-v2` siyasəti orta luma fərqi ilə normallaşdırılmış fərqi ən azı 0.05 olan miniatür hüceyrələrin nisbətindən daha böyük olanı istifadə edir. Dublikat həddi icra zamanı dəyişdirilə bilən parametr kimi təqdim edilmək əvəzinə, proqnozlaşdırıla bilənlik üçün seçilmiş 0.04 sabitidir. Bu ikinci yüksək kontrast siqnalı yalnız orta göstəriciyə əsaslanan müqayisənin gizlədə biləcəyi kiçik hərəkəti və görünən mətn dəyişikliklərini qoruyur. Müqayisəçi və ya dekoder xətaları açıq rejimdə işləyir və əhatəliliyi saxlayır. Çıxış metadatası çıxarılmış namizədləri, uğurla istifadə edilmiş kadrları və atılmış vizual dublikatları ayrı göstərir.

Açıq şəkildə işarələnmiş video hissəsi vaxt möhürlü kontakt vərəqi tələb edə bilər. Körpü ən çox 4 sütunlu, 16 kadrdan ibarət JPEG toru yaradır. Hər 512 piksellik hüceyrənin aşağı hissəsindəki yüksək kontrastlı zolağa mənbə vaxt möhürü yazılır; eyni vaxt möhürləri sonrakı əlaqələndirmə və audit üçün mətn metadatasında da saxlanılır. Tam JPEG 32 MiB ilə məhdudlaşdırılır. `sharp` toru dekodlaya və ya birləşdirə bilmədikdə, körpü ayrı-ayrı JPEG kadrlarına qayıdır; müştəri tərəfindən dayandırılma vərəq əməliyyatı boyunca ötürülür.

Təşviqat sübutu sintetik kompozisiya mikrosınağından qəsdən ayrı saxlanılır. `scripts/perf/video-bridge-contact-sheet-eval.ts` real OpenAI-compatible görmə modelləri üçün sxem versiyalı A/B sınaq mexanizmini müəyyən edir. O, provayder tərəfindən bildirilən tokenləri, başdan-başa divar saatı gecikməsini (vərəqin kompozisiyası daxil olmaqla), model çağırışlarının sayını və manifest tərəfindən müəyyən edilmiş faktların saxlanmasını ölçür. Xam model cavabları hesabata yazılmır; yalnız SHA-256 heşləri və uyğunlaşdırılmış fakt identifikatorları saxlanılır. `--execute-real` ötürülmədikdə və `--model`, `OMNIROUTE_BASE_URL` və `OMNIROUTE_API_KEY` konfiqurasiya edilmədikdə, sınaq mexanizmi heç bir şəbəkə və ya ödənişli model çağırışı etmir. Bu açıq şəkildə həyata keçirilən real sınaq olmadan onun maşın tərəfindən oxuna bilən hökmü `HOLD` olaraq qalır; yalnız sintetik faydalı yük və çağırış sayı ölçmələri təşviqat sübutu hesab edilmir.

Çağıran tərəflər artıq uyğunlaşdırılmış mətnə sahib olduqda, dəstəklənən video hissəsinə ixtiyari `transcript.cues` massivi əlavə edə bilərlər. Hər göstəriş `text` sahəsini, yoxlanılan müddət daxilində yerləşən sonlu `start`/`end` intervalını və icazə verilmiş `source` (`client`, `embedded` və ya `audio-bridge`) dəyərini daşımalıdır; `confidence` standart olaraq `1` olur və `0` ilə `1` arasında qalmalıdır. Tam eyni göstərişlər birləşdirilərək tək nüsxəyə endirilir. OmniRoute bu metadatadan transkripsiyanı heç vaxt başlatmır: yoxlanılmış göstərişlər mənbə, etimad və interval ilə birlikdə təsvir edilmiş nəticəyə köçürülür və kadr başlıqları ilə yanaşı etibarsız müşahidələr kimi təqdim edilir. Etibarsız, diapazondan kənar və ya mənşəyi olmayan mətn başlıq axınına qarışdırılmaq əvəzinə rədd edilir. Sorğu gövdəsindəki hər iki transkript kanalı təqdim edilmiş mənşə məlumatını `client` olaraq normallaşdırır; buna özünün bildirdiyi `embedded` və ya `audio-bridge` etiketləri də daxildir. Bu etibarlı etiketləri yalnız serverə məxsus adapter kod üçün nəzərdə tutulmuş `trustedSource` arqumenti vasitəsilə təyin edə bilər; sorğu JSON sahəsi həmin arqumentə çata bilməz. Transkript mətni mənşəyindən asılı olmayaraq etibarsız, mediadan törəmiş məzmun olaraq qalır və heç vaxt avtorizasiyanı müəyyən etməməlidir.

Təkmil çağıran tərəf eyni video üçün `audioTranscript` treki təqdim edə bilər; bu, server transkripsiyasının sübutu deyil, müştəri tərəfindən təqdim edilmiş mətn kimi qəbul edilir. Birləşdirmə qovşağı vizual və audio müşahidələri vahid son tarix və dayandırılma siqnalı altında icra edir, onları ümumi zaman xətti üzrə sıralayır, tam eyni dublikatları birləşdirir və yalnız bir tərəf uğur qazandıqda qismən nəticə bildirir. Yanlış `audioTranscript` tam videonu uğursuz vəziyyətə salmaq əvəzinə qismən nəticəyə çevrilir — vizual təsvir saxlanılır, audio budağı isə təmizlənmiş uğursuzluq kodunu qeyd edir. Hər budağın əlçatanlığı, qismən nəticə bayrağı və təmizlənmiş uğursuzluq kodları təsvir edilmiş nəticədə, qoruyucu mexanizmin metadatasında (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), nəticə keşinin metadatasında və körpünün birləşdirmə sayğaclarında saxlanılır. Standart Video Bridge yolu nitqdən mətnə çevirməni çağırmır və medianın ikinci nüsxəsini endirmir; bu açıq trek olmadan yalnız video rejimində qalır.

**Transkriptin saxlanması (#12150 P1).** Bu, Video Bridge (özü seçimə bağlıdır)
transkript kuyu göstərdikdə avtomatik tətbiq olunur — ayrıca saxlanma bayrağı yoxdur.
Sorğu hər hansı transkript kuyu göstərdikdə (çağıran tərəfindən elan edilmiş
`transcript` və ya birləşdirilmiş `audioTranscript`), qoruyucu mexanizm onu
`videoBridgeObserved` kimi işarələyir və video təsvirinin redaktə edilmiş kölgəsini
yaradır — hər bir kuyun sərbəst mətn gövdəsinin
`[redacted-video-transcript]` ilə əvəz olunduğu eyni göstərim. Bu, düzləşdirilmiş
mətni təhlil etməklə deyil, sətir yığılmazdan əvvəl strukturlaşdırılmış kuy sahəsinin
əvəzlənməsi ilə qurulur; beləliklə, `]` simvolunu ehtiva edən gövdələr, məsələn
`[inaudible]`/`[music]`, daxil olmaqla, heç bir kuy məzmunu — zərərli və ya adi —
saxlanıla bilməz. Davamlı çağırış jurnalı sorğusunun gövdəsində video mənşəli hər bir
mətn hissəsi məzmun bərabərliyinə əsasən həmin redaktə edilmiş kölgə ilə əvəzlənir;
`fullText` ankeri çağırışdan əvvəlki tamamlanmış qoruyucu mexanizm yükündən yenidən
oxunur, buna görə sonrakı zəncir qoruyucuları (prioritetləri 10/95 olan PII və
identifikasiya məlumatı maskalayıcıları) təsvir mətnini yerində dəyişdikdən və
sistem sorğusu/təhvilvermə/yaddaş inyeksiyası mesaj massivini yenidən
formalaşdırdıqdan sonra da uyğunluq qorunur. Modelə yuxarı axına göndərilən gövdə
dəyişdirilmir. Müşahidə edilmiş sorğu heç bir davamlı Memory məlumatı yaratmır
(həm sorğudan, həm də cavabdan irəli gələn çıxarışlar ötürülür), buna görə modelin
öz cavabı transkript mətnini Memory məlumatına köçürə bilməz.

**Xam video sahələri (#12430).** Körpü aktiv olduqda və yerli video dəstəyi naməlum
olduqda və ya olmadıqda, müəyyən edilmiş `transcript`/`audioTranscript` sahələri,
hətta təsvir uğursuz olduqdan və ya `maxVideos` limiti tətbiq edildikdən sonra da
`videoBridgeObserved` işarəsini aktivləşdirir. `null` və boş sətirlər nəzərə alınır;
olmayan sahələr və video olmayan metadatalar nəzərə alınmır. Saxlanılan nüsxələrdə bu
sahələr redaktə edilir və ya sorğu buraxılır, keşlərə/Memory-ə müraciət edilmir.

Bu ehtiyat yollarında etibarlı çağıran kuyləri qeyri-standart provayder sahələri
əvəzinə dəstəklənən `text`/`input_text` hissələrinə çevrilir. Sorğu ilə təqdim
edilmiş hər iki trek etibarsız `client` müşahidələri olaraq qalır; videonun təsvir
edilmədiyini və zaman nişanlarının media ilə yoxlanılmadığını bildirən açıq xəbərdarlıq
əlavə olunur. Mövcud 256-kuy/64-KiB ümumi və kuy başına büdcələr birlikdə iki trekə
tətbiq edilir; zaman nişanları brokerin 600 saniyəlik tavanına və təqdim edilmiş
fokus pəncərəsinə uyğun olmalıdır. Etibarsız treklər silinir və ixtiyari mətn kimi
ötürülmür; birləşdirilmiş büdcə aşılmadıqda etibarlı qonşu trekdən yenə istifadə
oluna bilər. Null/boş sahələr mətn əlavə etmir. Bu ehtiyat mexanizmi media
götürülməsi və ya transkripsiya əlavə etmir. Transkript genişləndirmə sahələri ehtiyat
video daşıyıcısından və onun `video_url`/`source` obyektlərindən silinir. OpenAI
ötürmə icazə siyahısı sərt olaraq qalır; naməlum yerli video daşıyıcıları əlçatan
olmağa davam edir və yalnız mətn qəbul edən məlum hədəflər təhlükəsiz markerləri
saxlayır. Strukturlaşdırılmış redaktə kölgələri əlavə edilmiş transkript mətnini
qoruyur, ilkin çağırana məxsus sorğu isə dəyişdirilmir. Yerli dəstəyi olan hədəflər
və deaktiv edilmiş körpülər mövcud yan keçmə davranışını saxlayır.

Əlavə saxlanılan nüsxələr eyni müşahidə edilmiş sorğu siqnalından istifadə edir.
Qoruyucu mexanizmdən əvvəlki xam müştəri-sorğusu snapshot-ı, yaddaşdaxili gözləyən
sorğu və erkən rədd edilmiş sorğu jurnalı video hissələrindəki transkript sahələrini
strukturlaşdırılmış şəkildə əvəz edir; pipeline mərhələləri və kontekst təhvilverməsi
tərəfindən sintez edilən sətir sorğuları davamlı sorğu gövdəsi qəbuledicisində
redaktə olunur. Davamlı `video_content_removed` marker-i mətni qəsdən silindikdən
sonra yenidən qurmaq əvəzinə `previous_response_id` davamını təhlükəsiz şəkildə
uğursuzluqla dayandırır. Müşahidə edilmiş sorğu qeydiyyata alınmazdan əvvəl hissə
başına redaktə kölgəsini itirərsə və ya sonrakı sorğu dəyişikliklərindən sonra bir
neçə video kölgəsindən hətta biri uyğun gəlməzsə, qismən redaktə edilmiş transkripti
saxlamaqdansa, davamlı sorğunun gövdəsi tamamilə buraxılır.

Müşahidə edilmiş sorğu üçün model cavabı strukturlaşdırılmış kuy sərhədi olmadan
transkriptin istənilən hissəsindən sitat gətirə bilər. Buna görə onun davamlı çağırış
jurnalındakı `responseBody` sahəsi buraxılma markeri ilə əvəzlənir; ətraflı pipeline
artefaktı (yuxarı axın/müştəri gövdələrini və axın parçalarını ehtiva edə bilər)
saxlanmır. Həmin sorğu üçün semantik, idempotentlik və reasoning-replay keşlərinin
oxunması və yazılması yan keçilir. Provayder sorğusu və müştərinin gördüyü cavab
dəyişdirilmir. Ətraflı artefakt buraxıldıqda erkən keepalive baytları müvəqqəti
buferdən boşaldılır. Kiro-nun səhv formalı EventStream xəbərdarlığı yalnız yükün
bayt sayını bildirir, onun məzmununu və ya JSON analizçisinin xam xətasını heç vaxt
bildirmir.
Bu, əlaqəsiz hər bir provayder/plagin diaqnostikasının yoxlanıldığını iddia etmir;
daha geniş davamlı qəbuledici yoxlaması #11658-də izlənilir.

Daxili `/api/modality-bridge/video/drilldown` həyat dövrü ayrıca, loopback/token ilə
autentifikasiya olunan keş substratıdır. Hər əməliyyat həmçinin kanonik, qeyri-şəffaf
principal ID tələb edir. Production çağırıcısı aktivləşdirilməzdən əvvəl həmin ID-ni
autentifikasiya edilmiş tenant-dan törətməli və müştəri tərəfindən seçilmiş dəyəri
heç vaxt ötürməməlidir. Keş açarları həmin principal-ı kanonik sessiya və video
istinad ID-ləri ilə əlaqələndirir, yalnız onların SHA-256-dan törədilmiş açarlarını
saxlayır və həm oxuma, həm də silmə əməliyyatlarını eyni principal ilə
məhdudlaşdırır. Keş hər giriş üçün ən çox 16 törədilmiş JPEG kadrı saxlayır, onları
on dəqiqədən sonra müddəti bitmiş hesab edir və məhdudlaşdırılmış `start`/`end`
oxumalarını və ya açıq sessiya silinməsini dəstəkləyir.

Hər principal 16 giriş və 64 MiB kanonik JPEG məlumatı ilə məhdudlaşır. Bu limitlər
qlobal 64 giriş/256 MiB tavanından müstəqildir: principal kvotasına təzyiq yarandıqda
qlobal LRU silinməsi nəzərdən keçirilməzdən əvvəl yalnız həmin principal-ın ən uzun
müddət istifadə olunmayan girişləri silinir. Müddəti bitmiş girişlər keş fəaliyyəti
zamanı həm principal, həm də qlobal uçotdan təmizlənir, ləğvetmə və yoxlama
uğursuzluğu isə qismən əvəzləməni təsdiqləmir.

Keş kanonik olmayan Base64-i, artıq padding-i, JPEG olmayan medianı, zədələnmiş və ya yarımçıq JPEG-ləri, eləcə də məhdudlaşdırılmış tam şəkil `sharp` dekodlaması zamanı xəbərdarlıq yaradan JPEG-ləri rədd edir. O, qəbul edilmiş hər bir şəkli kanonik JPEG kimi yenidən kodlayır, en və hündürlüyü çağıranın sahələrinə etibar etmək əvəzinə dekodlanmış baytlardan müəyyən edir və saxlamamaq üçün sondakı poliqloq baytlarını ləğv edir. Hər iki kvotaya yalnız məhdudlaşdırılmış kanonik sıxılmış bufer hesablanır. JSON ötürmə limiti 32 MiB dekodlanmış giriş tavanı üçün Base64 əlavə yükünü də əhatə edir. Saxlanılan hər bir törəmə təsdiqlənmiş JPEG formatını/ölçüsünü, nümunələmə siyasətini, törəmə versiyasını, yaradılma vaxtını, server tərəfindən hesablanmış məzmun heşini, heşlənmiş ana istinadını və etibarlı çağıranın ana məzmun heşini qeyd edir. Ləğvetmə asinxron dekodlama/heşləmə mərhələləri arasında, keşə atomik commit edilməzdən əvvəl yoxlanılır.

Bu mərhələ hələ istehsal mühitində olan producer-i marşruta qoşmur və çoxölçülü variant seçimini təmin etmir. Buna görə də şəffaf Video Bridge sorğu yolu əlavə iş yaratmır, tenant-a bağlı principal törədilməsi və tam FU-08 çoxölçülü lifecycle isə tamamlanmış davranış kimi sənədləşdirilmək əvəzinə açıq şəkildə sonrakı iş olaraq qalır.

Kadrlar konfiqurasiya edilmiş Video modeli ilə ardıcıl şəkildə başlıqlanır. Boş Video override-ı Vision ayarını miras alır; hər ikisi boşdursa, Vision auto-router effektiv vision-capable model-i seçir. Uğurlu başlıqlar ilkin hissəni sabit `[Video description:` prefiksi ilə əvəz edir; bu prefiks həmçinin mətni etibarsız media mənşəli müşahidə kimi işarələyir və sonrakı modellərə mediada tapılan təlimatlara əməl etməməyi bildirir. Kadr başlığı keş açarlarına JPEG baytları, prompt, zaman nişanı və effektiv model daxildir; yalnız uğurlu başlıqlar keşlənir. Keş qeydləri fallback modeli də daxil olmaqla faktiki uğurlu producer modelini saxlayır; müxtəlif kadrlar fərqli modellər tərəfindən yaradılıbsa, bridge `mixed` bildirir. Keş hit-i həmin producer identikliyini yenidən istifadə edir və onu tələb olunan routing planı kimi yenidən adlandırmır. Bütün video nəticə keşi çıxışı dəyişən hər bir giriş əsasında açarlanır — prompt, effektiv model, nümunələmə siyasəti, kadr sayı, semantik analiz rejimi, normallaşdırılmış focus hint-in SHA-256 fingerprint-i, focus window, `transcript`, `audioTranscript` və contact-sheet flag — buna görə də bu ölçülərdən hər hansı biri dəyişdikdə keş miss baş verir və heç vaxt köhnəlmiş nəticə təkrar istifadə edilmir. Vizual dedup siyasətinin versiyası, həddi və məhdudlaşdırılmış namizəd-kadr sayı da nəticə-keş açarında və metadatasında açıq şəkildə göstərilir; buna görə siyasət dəyişikliyi köhnəlmiş bütün-video təsvirinin təkrar istifadəsinə səbəb ola bilməz. Result-cache v4 metadatası xam istifadəçi tapşırığını deyil, rejimi və fingerprint-i saxlayır. Guardrail metadatası həm tələb olunan, həm də effektiv analiz rejimlərini bildirir; istifadə edilə bilən istifadəçi mətni olmayan `focused` rejimi faktiki olaraq `full` kimi bildirilir.

Guardrail bütün dəstəklənən video hissələrini çıxarır, lakin `modalityBridgeVideoMaxVideos` sayından çoxunu təsvir etmir. `supportsVideo === false` olduğu sübut edilmiş hədəf üçün uğursuz və limitdən artıq videolar açıq təhlükəsiz mətn markerlərinə çevrilir ki, xam video qalmasın. Qabiliyyət naməlum olduqda həmin hissələr video daşıyıcısını saxlayır; hər hansı fallback transkript yuxarıda göstərilən məhdudlaşdırılmış mətn çevrilməsindən keçir. `supportsVideo === true` olan hədəflər bridge-i keçirlər. Client sorğusunun abort siqnalı endirmə, broker növbəsi, subprocess-lər və başlıqlandırma çağırışları boyunca ötürülür; abortlar videolar arasında prosesi dayandırır və heç vaxt xam mediaya fail-open etmir.

Runtime ayarları DB-də saxlanılır və Zod ilə təsdiqlənir:

| Açar                                | İlkin dəyər | Diapazon / davranış                                                                                                   |
| ----------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | İstəyə bağlı runtime, opt-in                                                                                          |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` ümumi başlıqları qoruyur; `focused` məhdudlaşdırılmış, etibarsız ən son istifadəçi kontekstindən istifadə edir |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge modelini miras alır                                                                                     |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                  |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` və ya proporsional `segment_aware`; detektor uğursuz olduqda `uniform`-a qayıdır             |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                   |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                        |

Saxlanılmış köhnə Video timeout dəyərləri 120 saniyədən yuxarı olduqda broker deadline-ına qədər məhdudlaşdırılır; yeni ayar yazılışlarında bu həddən yuxarı dəyərlər rədd edilir. `GET /api/modality-bridge/video/runtime` autentifikasiyadan və runtime yoxlanışından əvvəl etibarlı möhürlənmiş loopback lokaliteti tələb edir, daha sonra isə management auth tələb edir. O, yalnız `available`, təmizlənmiş FFmpeg/ffprobe versiyalarını və runtime əlçatan olmadıqda sabit səbəbi qaytarır. Daxili extraction endpoint-i ictimai upload API deyil: növbə dolduqda `503` və `Retry-After`, çağıran əlaqəni kəsdikdə `499`, sabit broker deadline-ı keçdikdə isə `504` qaytarılır. Çevrilmiş cavablar mərkəzi `x-omniroute-modality-bridge` başlığına `video->text;model=<visionModel>;parts=<videos>` əlavə edir və Vision və ya Audio seqmentlərini silmir.

### PII Maskalayıcı (`piiMasker.ts`)

**Hər iki** mərhələdə işləyir.

- **`preCall`** yükü klonlayır, `system`, `messages`, `input` və
  `prompt` sahələrini (sadə sətir elementləri də daxil olmaqla) gəzir və
  `@/shared/utils/inputSanitizer` modulundakı `processPII()` funksiyasını sətir
  tipli `content`/`text` sahələrinə tətbiq edir. `PII_REDACTION_ENABLED=true`
  olduqda aşkarlanan PII xaricə göndərilən yükdə redaktə edilir. Bu,
  `INPUT_SANITIZER_MODE` parametrindən asılı deyil (bu parametr yalnız prompt
  inyeksiyası siyasətinə nəzarət edir). Redaktə deaktiv olduqda çağırış
  məzmunu yenidən yazmadan aşkarlama saylarını qeyd edir.
- **`postCall`** cavabı dərin klonlayır, `sanitizePIIResponse()` funksiyasını və
  Responses API formasına uyğun maskalayıcını (`maskResponsesOutput` —
  `output_text` və `output[].content[].text` sahələrini əhatə edir) işlədir.
  Hər hansı redaktə baş verərsə, dəyişdirilmiş cavab orijinalı əvəz edir.

Qoruyucu mexanizm heç vaxt bloklamır; yalnız annotasiya əlavə edir
(`meta.detections`, `meta.redacted`) və ya məzmunu yenidən yazır.

#### Növ üzrə seçim, xüsusi nümunələr və aşkarlama sayğacları

**Dashboard → Settings → Security → PII masking** hansı məlumatların
maskalanacağını seçir. Bu seçim maskalamanı aktivləşdirmir: bunun üçün
sorğular üzrə `PII_REDACTION_ENABLED`, cavablar və SSE üzrə isə
`PII_RESPONSE_SANITIZATION` istifadə olunur; hər ikisi standart olaraq
deaktivdir.

- **Növ üzrə seçim** — daxili identifikatorlar
  `src/shared/constants/piiTypes.ts` faylında (`PII_BUILTIN_TYPES`) sadalanır.
  Dəyərin təyin edilməməsi bütün növlər deməkdir (bu parametr mövcud olmamışdan
  əvvəlki davranış). Sorğu mühərrikinin `ssn_us` nümunəsi `ssn` növünə uyğun
  gəlir. Şablonlar (Minimal, Standard, Financial, Brazilian, USA, GDPR, POPIA,
  Full) yalnız UI-dakı qeyd xanalarını doldurur.
- **GDPR və POPIA identifikatorları** — Aİ və Cənubi Afrikadakı şəxsi
  identifikatorları əhatə edən on iki daxili identifikator (aşağıdakı cədvəl).
  Onların regex-ləri, validatorları və yurisdiksiya teqləri həm cavab
  sanitayzerinin (`src/lib/piiSanitizer.ts`), həm də sorğu maskalayıcısının
  (`src/shared/utils/inputSanitizer.ts`) istifadə etdiyi vahid
  `src/shared/utils/piiPatterns.ts` cədvəlində yerləşir. Uyğunluq yalnız
  validator onu qəbul etdikdə redaktə edilir; sadə rəqəm ardıcıllığı heç vaxt
  kifayət etmir. Bu identifikatorlar mövcud olmamışdan əvvəl məhdudlaşdırılmış
  seçim saxlamış operator yeni identifikatorlar seçilənədək əvvəlki davranışı
  saxlayır.
- **Xüsusi nümunələr** — 20-dək regex və ya wildcard nümunəsi (`*` = boşluq
  olmayan ən çox 64 simvol, `?` = bir simvol). Uyğunluqlar
  `[CUSTOM_REDACTED]` ilə əvəz olunur. Hər nümunə
  `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`)
  funksiyasından keçir: uzunluq ən çox 500 simvol olmalı, bayraqlar yalnız
  `g i m s u` ola bilər, nümunə kompilyasiya edilməli, `safe-regex` yoxlamasından
  (katastrofik geri izləmə) keçməli və boş sətirə və ya redaktə əvəzləyicisinə
  uyğun gəlməməlidir. Yoxlamadan keçməyən nümunə saxlanılarkən və sınaqdan
  keçirilərkən rədd edilir; saxlanılmış sətir yoxlamadan keçməzsə, icra zamanı
  kompilyasiya edilmək əvəzinə ötürülür. Xüsusi nümunələr yalnız maskalama
  aktiv olduqda işlədilir.
- **Aşkarlama sayğacları** — növ üzrə saylar (uyğun gələn dəyərlər heç vaxt
  saxlanılmır) yaddaşda tutulur və yenidən başlatma zamanı sıfırlanır
  (`src/lib/pii/piiDetectionStats.ts`). Onlar yalnız maskalama aktiv olduqda
  artır.

Parametrlər `key_value` cədvəlində (`pii_settings` ad sahəsi,
`src/lib/db/piiSettings.ts`) saxlanılır və 1 saniyəlik keş vasitəsilə oxunur.
API:

| Metod  | Yol                      | Təyinat                                                                               |
| ------ | ------------------------ | ------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Bayrağın vəziyyəti, `enabledTypes`, `customPatterns`, aşkarlama sayğacları            |
| `PUT`  | `/api/settings/pii`      | `enabledTypes` (`null` = hamısı) və/və ya `customPatterns` dəyərlərini əvəz etmək     |
| `POST` | `/api/settings/pii/test` | Bir nümunəni ən çox 8 KB ölçülü nümunə üzərində sınaqdan keçirmək; heç nə saxlanılmır |

Bu üç endpoint idarəetmə autentifikasiyası tələb edir və sorğu gövdəsini Zod
ilə (`src/shared/validation/schemas/piiSettings.ts`) yoxlayır.

#### GDPR (Aİ) və POPIA (Cənubi Afrika) identifikatorları

| ID                  | İdentifikator                 | Yoxlama                                                                              |
| ------------------- | ----------------------------- | ------------------------------------------------------------------------------------ |
| `iban`              | IBAN                          | Məlum ölkə, həmin ölkə üçün dəqiq uzunluq, ISO 13616 MOD-97-10                       |
| `eu_vat`            | Aİ ƏDV nömrəsi                | Məlum üzv dövlət prefiksi və həmin dövlətin nömrə formatı (VIES yoxlaması aparılmır) |
| `es_dni_nie`        | İspan DNI / NIE               | Nəzarət hərfi (qiymət mod 23); NIE `X/Y/Z` + 7 rəqəmdən ibarətdir                    |
| `it_codice_fiscale` | İtaliya Codice Fiscale        | Tək/cüt mövqe cədvəllərindən alınan nəzarət hərfi                                    |
| `pl_pesel`          | Polşa PESEL                   | Çəkili yoxlama cəmi və mövcud olan kodlaşdırılmış doğum tarixi                       |
| `nl_bsn`            | Niderland BSN                 | 11 yoxlaması (9..2 çəkiləri, -1)                                                     |
| `de_steuer_id`      | Alman Steuer-ID               | ISO 7064 Mod 11,10 və rəqəm strukturu qaydaları (ilk rəqəm 0 ola bilməz)             |
| `se_personnummer`   | İsveç personnummer            | Son on rəqəm üzərində Luhn və etibarlı doğum tarixi (10 və ya 12 rəqəm)              |
| `za_id`             | Cənubi Afrika ID nömrəsi      | Bütün 13 rəqəm üzərində Luhn, etibarlı doğum ayı/günü, vətəndaşlıq rəqəmi 0 və ya 1  |
| `za_phone`          | Cənubi Afrika telefon nömrəsi | `+27` / `27` prefiksi və ya boşluqla və ya tire ilə yazılmış milli `0..` forması     |
| `za_vat`            | Cənubi Afrika ƏDV nömrəsi     | `4` ilə başlayan 10 rəqəm **və** əvvəlki 48 simvolda "VAT" / "BTW"                   |
| `za_tax_ref`        | Cənubi Afrika vergi ref.      | `0`-`3` ilə başlayan 10 rəqəm, Luhn, **və** əvvəlki 48 simvolda "tax" / "SARS"       |

Rəqəmlərdən yalnız ibarət formatlar sifariş nömrələri, build nömrələri və
vaxt möhürləri ilə toqquşduğuna görə, ən zəif olanlar (`za_vat`, `za_tax_ref`)
açar söz göstəricisini tələb edir və tək halda olan onrəqəmli `0..` nömrəsi
Cənubi Afrika telefon nömrəsi kimi qəbul edilmir. Boşluqlu IBAN-lar (`GB29 NWBK ...`)
tapılmır. Axın emalı yolunda göstərici yalnız cari hissə daxilində axtarılır. İdentifikatorlar ümumi telefon
şablonlarından əvvəl yerləşir, buna görə təsdiqlənmiş identifikator öz
placeholder-ını saxlayır
(`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). `gdpr` və `popia` şablonları
müvafiq olaraq Aİ və Cənubi Afrika identifikatorlarını seçir. Maskalama
özü opt-in olaraq qalır (Sərt Qayda #20): burada heç nə funksiya bayrağının
defoltunu dəyişmir.

### Prompt Injection (`promptInjection.ts`)

İstifadəçi tərəfindən təqdim edilən məzmunda əks-təsirli strukturları aşkarlayır və
konfiqurasiya edilmiş siyasəti tətbiq edir. Davranış mühit dəyişənləri və konstruktor seçimləri ilə idarə olunur:

| Setting        | Env var                                                                                               | Default | Effect                                                                                                                                                                                                         |
| -------------- | ----------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aktivdir       | `INPUT_SANITIZER_ENABLED`                                                                             | `true`  | `false` olduqda qoruyucu qısa dövrə ilə dayandırılır.                                                                                                                                                          |
| Rejim          | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`  | İnjeksiya siyasəti: `block`, `warn` və ya `log`. (`redact` geriyə uyğunluq üçün qəbul edilir, lakin injeksiya mətnini silmir; sorğunun PII yenidən yazılması `PII_REDACTION_ENABLED` tərəfindən idarə olunur.) |
| Bloklama həddi | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Bloklama üçün tələb olunan minimum ciddilik səviyyəsi. Defolt olaraq orta səviyyə yalnız müşahidə edilir.                                                                                                      |

**Rejim üstünlüyü** (`getMode`): çağıranın `options.mode` →
`INJECTION_GUARD_MODE` **DB funksiya bayrağı override-ı** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Buna görə dashboard override-ı env dəyişənlərindən üstün gəlir və Feature
Flags UI-si işləyən qoruyucunu canlı şəkildə idarə edir (yenidən başlatma tələb olunmur).
DB oxunması təhlükəsiz şəkildə geriyə qayıdır:
xəta baş verərsə, qoruyucu env əsaslı davranışa qayıdır və override
təyin edilmədikdə davranış yalnız env dəyişənləri ilə həll edilən davranışla eyni olur.

Aşkarlama mənbələri:

1. `@/shared/utils/inputSanitizer` modulundan `sanitizeRequest()` (pipeline-ın
   başqa yerlərində istifadə olunan ümumi detektor dəsti).
2. Daxili `DEFAULT_GUARD_PATTERNS` (hazırda hər ikisi `high` ciddilik səviyyəsinə
   malik `system_override_inline` və `markdown_system_block`).
3. Konstruktor seçimləri vasitəsilə ötürülən ixtiyari `customPatterns` (sətirlər,
   regex-lər və ya `{ name, pattern, severity }` qeydləri).

`mode === "block"` olduqda **və** ən azı bir aşkarlama ciddilik həddinə çatdıqda,
`preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }` qaytarır. `warn`/`log` rejimlərində qoruyucu
jurnala yazır, lakin çağırışa icazə verir. Paylaşılan
`evaluatePromptInjection()` köməkçi funksiyası da ixrac olunur ki, çağırış edənlər prompt-ları reyestrdən keçirmədən qiymətləndirə bilsinlər.

**Skan həddi (v3.8.20):** detektor birləşdirilmiş prompt mətninin yalnız
**ilk 16 KB** hissəsini yoxlayır — `src/shared/utils/inputSanitizer.ts` daxilində
`MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bayt). Həm
`detectInjection()`, həm də `evaluatePromptInjection()` şablon dövrünü
işə salmazdan əvvəl `slice(0, MAX_INJECTION_SCAN_BYTES)` tətbiq edir. İnjeksiya direktivləri girişin yuxarı hissəsinə yaxın yerləşir, buna görə bu yanaşma çox yüz KB-lıq yüklərdə regex CPU/GC istifadəsini məhdudlaşdırır və aşkarlamanı zəiflətmir (bax: #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Hər iki mərhələdə, defolt zəncirin sonunda (prioritet `95`) işləyir. Çıxış
payload-ından (mesaj məzmunu, alət çağırışının arqumentləri, alət nəticələri)
**və** provayder cavabından tanınmış API açarı / məxfi token şablonlarını redaktə edir ki,
prompt-a yapışdırılmış credential (və ya alət nəticəsi tərəfindən geri əks etdirilən
credential) nə yuxarı axındakı provayderə, nə də klientə sızmasın.

- **Yalnız opt-in**, PII redaksiyası ilə eyni qayda (Sərt Qayda #20-yə yaxın):
  yalnız `settings.credentialRedactionEnabled === true` **və ya**
  `CREDENTIAL_REDACTION_ENABLED=true` olduqda aktivdir. Söndürülmüş vəziyyətdə qoruyucu
  heç nə etmir — heç vaxt bloklamır və heç vaxt yenidən yazmır.
- `redactCredentials()` tam payload/cavab ağacını (`walkValue()`,
  prototip çirkləndirilməsinə qarşı təhlükəsiz, `WeakSet` vasitəsilə dövrələrə qarşı
  təhlükəsiz) gəzir və uyğunluqları `[REDACTED:<type>]` placeholder-ı ilə əvəz edir,
  yalnız faktiki dəyişmiş budaqları klonlayır.
- `CREDENTIAL_PATTERNS` LLM provayderlərinin açarlarını (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokenlərini (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), ödəniş açarlarını (Stripe, Square), bulud
  açarlarını (AWS access key, Twilio, SendGrid, Mailgun), private key / JWT-ləri,
  credential daşıyan bağlantı sətirlərini
  (`mongodb://user:pass@...` və s.) və ümumi
  `Authorization`/`x-api-key`/`api-key`/`apikey` başlıq-dəyəri
  şablonunu əhatə edir. Başlıq formasındakı açarlar (`authorization`, `x-api-key`,
  `api-key`, `apikey`) struktur üzrə (yalnız dəyər; `Bearer `/`Basic ` kimi sxem
  prefiksi saxlanılmaqla), ümumi mətn regex-i vasitəsilə deyil, redaktə olunur.
- Qoruyucu heç vaxt bloklamır; yalnız yenidən yazır (`modifiedPayload` /
  `modifiedResponse`) və annotasiya edir (`meta.credentialsRedacted`, `meta.count`).

Reqressiya qoruması: `tests/unit/credential-masker-guardrail.test.ts`.

## Baza Müqaviləsi (`base.ts`)

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
  block?: boolean; // true zənciri dayandırır (short-circuit)
  message?: string; // bloklanma zamanı göstərilir
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

Guardrail "dəyişiklik yoxdur" siqnalını `void`, `{}` və ya
`{ block: false }` qaytarmaqla verir. `modifiedPayload`/`modifiedResponse`
qaytarmaq, zəncirdə aşağı axın (downstream) guardrail-lər üçün axan dəyəri əvəz edir.
`signal?: AbortSignal` çağıranın (caller) lifecycle-ını guardrail-lərə daşıyır. Sorğunun abort edilməsi qəsdən edilmiş fail-open istisnasıdır: media körpüləri işi dayandırır və xam medianı onu dəstəkləmədiyi bilinən hədəfə bərpa etmədən təmizlənir.

## Reyestr (`registry.ts`)

`guardrailRegistry` singleton-u aşağıdakıları təqdim edir:

- `register(guardrail)` — guardrail əlavə edir (və ya normallaşdırılmış ada görə
  əvəz edir) və `priority` üzrə artan sıralamanı yenidən qurur.
- `clear()` / `list()` — inzibati köməkçilər.
- `runPreCallHooks(payload, context)` — aktiv guardrail-ləri gəzir, payload-u
  `modifiedPayload` vasitəsilə ötürür və ilk `block: true`-da dayanır.
- `runPostCallHooks(response, context)` — eyni axın cavab tərəfində.
- `resetGuardrailsForTests({ registerDefaults })` — vəziyyəti təmizləyir və təmiz
  test izolyasiyası üçün defoltları istəyə görə yenidən qeydiyyatdan keçirir.

Hər iki runner `{ blocked, payload|response, results, guardrail?, message? }`
qaytarır, burada `results` hər guardrail üzrə `blocked`, `skipped`, `modified`,
`error` və `meta` sahələrini ehtiva edən `GuardrailExecutionResult`
qeydlərinin massividir və izləmə (tracing) üçün faydalıdır.

### Guardrail-lərin sorğu üzrə söndürülməsi

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` cari sorğu üçün
ötürülməli (skip) olan guardrail adlarının təkrarlanmamış siyahısını toplayır.
Beş kanal var; onlar bu sıra ilə oxunur və bir siyahıda birləşdirilir
(təkrarlar aradan qaldırılarkən ilk rast gəlinən üstün tutulur):

1. `apiKeyInfo.disabledGuardrails`
2. Sorğu gövdəsi `disabledGuardrails` (yuxarı səviyyə)
3. Sorğu gövdəsi `metadata.disabledGuardrails` (yalnız `metadata` obyekt olduqda)
4. Başlıq `x-omniroute-disabled-guardrails`
5. Köhnə (legacy) başlıq `x-disabled-guardrails`

Bütün beş kanal birləşdirilir, iki başlıq da daxil olmaqla: həm
`x-omniroute-disabled-guardrails`, həm də `x-disabled-guardrails` göndərilməsi
onların siyahılarının birləşməsini ötürür və boş müasir başlıq artıq köhnə
başlığı gizlətmir
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412),
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)-də düzəldilib).

Dəyərlər sətir massivləri və ya vergüllə ayrılmış sətir ola bilər; adlar kəsilir
(trim) və kiçik hərflərlə kebab-case-ə normallaşdırılır (`pii_masker` →
`pii-masker`), boş elementlər isə atılır. Nəticə `context.disabledGuardrails`
vasitəsilə reyestrə ötürülür və reyestr uyğun guardrail-ləri ötürür
(`results`-da `skipped: true`).

Söndürmə siyahısı yalnız **reyestrə** təsir edir. Prompt-injection `block` rejimi
məcburi sərhəddir: injection-guard middleware-i
(`src/middleware/promptInjectionGuard.ts`) `evaluatePromptInjection()`
funksiyasını heç bir çağıran tərəfindən idarə olunan söndürmə siyahısı olmadan
çağırır (əvvəllər etdiyi ölü `resolveDisabledGuardrails({ body })` çağırışı
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)-də silinib), ona görə
də `prompt-injection`-ı söndürən sorğu `block` rejimində yenə də rədd edilir. Bu,
qəsdən belədir. Söndürmə kanalları çağıran tərəfindən idarə olunur (sorğu gövdəsi,
metadata, başlıqlar) və çağıran operator tərəfindən qurulmuş təhlükəsizlik
nəzarətini söndürə bilməməlidir
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).
[#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)-dən gələn başlıq
birləşməsi yalnız hansı reyestr guardrail-lərinin ötürüldüyünü dəyişir; o,
klientə middleware-i keçməyə imkan vermir. Açar üzrə və qrup üzrə məcburi
guardrail siyasətləri v4 RFC
[#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417)-də izlənir.
Bax: [Əhatə və məhdudiyyətlər](#coverage-and-limits).

## İcra sırası

`src/sse/handlers/chat.ts` və `open-sse/handlers/chatCore.ts` üzərindən axan hər bir sorğu üçün ([Əhatə və məhdudiyyətlər](#coverage-and-limits) bölməsində sadalanan söhbət ailəsi marşrutları):

1. `resolveDisabledGuardrails(...)` API açarından, gövdədən və başlıqlardan ötürmə siyahısını qurur.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` qoruyucuları artan prioritet sırası ilə işə salır:
   - Deaktiv edilmiş qoruyucular `skipped` kimi qeydə alınır.
   - Hər qoruyucunun `preCall` metodu `modifiedPayload` vasitəsilə yükü yenidən yaza bilər.
   - İlk `block: true` zənciri qısaldır (short-circuit) və handler qoruyucu rədd cavabı qaytarır.
3. (Mümkünsə yenidən yazılmış) yük kombo marşrutlaşdırma və upstream ötürülməsinə axır.
4. **Yalnız non-streaming:** cavab yığıldıqdan sonra `guardrailRegistry.runPostCallHooks(...)` cavab üzərində eyni zənciri işə salır. Burada `block: true` upstream cavabını atır və HTTP 400 qaytarır. Axınlanan cavablar bu addımı tamamilə ötürür.

Xəta atan qoruyucular `error: <message>` ilə qeydə alınır və `logger.warn` vasitəsilə jurnala yazılır, lakin zəncir davam edir — dizayn üzrə fail-open.

## Əhatə və məhdudiyyətlər

Qoruyucu reyestri yalnız söhbət pipeline-ına qoşulub. Bu məhdudiyyətlər `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` və `tests/unit/guardrail-pipeline-characterization.test.ts` tərəfindən sabitlənir; davranış dəyişdikdə həmin testləri qəsdən yeniləyin.

### Hook-lar harada işləyir

| Hook / idarə                         | İşlədiyi yer                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                    | `handleChat` (`src/sse/handlers/chat.ts`) tərəfindən emal olunan sorğular: `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (və `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` və Telegram söhbət proksisi. Həmçinin idarə panelinin test endpointi `/api/guardrails/test`. Pre-call blok HTTP 400 qaytarır. |
| `runPostCallHooks`                   | Yalnız **non-streaming** söhbət cavabları (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Axınlanan cavablar ona heç vaxt çatmır.                                                                                                                                                                                                                                                                                                    |
| Streaming PII                        | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), `PII_RESPONSE_SANITIZATION` aktiv olduqda `streamingPipeline.ts` daxilində kəmərə qoşulur. O, qoruyucu deyil, ona görə də deaktiv kanalları ona təsir etmir.                                                                                                                                                                                                                   |
| Injection-guard middleware-i (köhnə) | Prompt daşıyan hər bir `/v1` marşrutu, söhbət ailəsi də daxil olmaqla (bax: [marşrut əhatəsi](#injection-guard-route-coverage--red-team-phase-8--block-d)). Yalnız prompt injection.                                                                                                                                                                                                                                                         |

### Nə əhatə olunmur

- **Media, embeddings və data marşrutları** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) reyestrə heç vaxt çatmır.
  Orada PII maskalanması, etimadnamə maskalanması və ya modallıq körpüsü
  işləmir. Onların yeganə yoxlanışı köhnə injection-guard middleware-idir.
- **Axınlanan cavablar** post-call qoruyucuları almır: nə `pii-masker`, nə də
  `credential-masker` post-call, üstəlik post-call blok da yoxdur. Yalnız
  streaming PII transformasiyası tətbiq olunur (`PII_RESPONSE_SANITIZATION`
  aktiv olduqda). Axınlanan cavabda geri əks olunmuş etimadnamə gizlədilmir.
- **Deaktiv kanalları və middleware (dizayn üzrə):** middleware prompt
  injection-u `evaluatePromptInjection()` funksiyasına öz çağırışı ilə
  qiymətləndirir və heç bir çağırışçı tərəfindən idarə olunan deaktiv siyahısı
  ötürmür. `block` rejimi çağırışçı tərəfindən idarə olunan deaktivlərin yan
  keçə bilməyəcəyi məcburi sərhəddir, o cümlədən söhbət ailəsi
  marşrutlarında
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).
  `prompt-injection`-u deaktiv etmək yalnız reyestr qoruyucusunu ötürür.

### Post-call-dan əvvəl cavabı nə görür

Non-streaming yolda sıra belədir: yaddaş çıxarılması → daxili alət icrası → post-call qoruyucular → post-call blok çıxışı → semantik keşə yazma.

- **Yaddaş çıxarışı** və **alət icrası** cavabı, çağırış-sonrası (post-call)
  mühafizə mexanizmləri onu yenidən yaza və ya bloklaya bilməzdən əvvəl görür.
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401)-dən bəri,
  yaddaş çıxarışı `PII_RESPONSE_SANITIZATION` aktiv olduqda (həm axınlı, həm də
  qeyri-axınlı rejimdə) çıxarılmış mətni `sanitizePII`-dən keçirir, lakin
  çağırış-sonrasının sonradan blokladığı cavab artıq yaddaşa və alətlərə təqdim
  edilmiş olur.
- **Semantik keş** cavabı çağırış-sonrasından sonra saxlayır, buna görə də o,
  yenidən yazılmış cavabı saxlayır və bloklanmış cavab heç vaxt keşlənmir. Keş
  qeydləri API açarı üzrə açarlanır.

## Konfiqurasiya

Daxili mühafizəçilər tərəfindən oxunan mühit dəyişənləri:

| Dəyişən                               | İstifadə edən             | Təsir                                                                                                           |
| ------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Aşkarlamanı tamamilə söndürmək üçün `false` təyin edin.                                                         |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | İnjeksiya siyasəti: `warn`, `block` və ya `log`. Köhnə `redact` dəyəri injeksiya mətnini yenidən yazmır.        |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | İnjeksiya mühafizəçisi üçün rejim; həmçinin mühit dəyişənlərini **əvəz edən** DB xüsusiyyət bayrağı (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | `MODE=block` rejiminin rədd etdiyi minimum ciddiyyət səviyyəsi: `high` (standart), `medium` və ya `low`.        |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | `INPUT_SANITIZER_BLOCK_THRESHOLD` üçün köhnə ləqəb.                                                             |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | `true` olduqda, sorğudakı PII maskalanır (injeksiya rejimindən asılı olmayaraq).                                |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (aşağı axın) | Cavab tərəfindəki maskalayıcının davranışını idarə edir.                                                        |

Modality Bridge mühafizəçiləri iş vaxtı konfiqurasiyasını mühit dəyişənlərindən
yox, DB əsaslı parametrlər saxlancından (`getSettings()`) oxuyur. Vision-un əsas
açarları bunlardır: `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` və
`modalityBridgeCacheMaxEntries`. Köhnə
`visionBridge*` açarları yalnız sənədləşdirilmiş bir-dövrlük oxuma ehtiyatı kimi
qəbul edilir; idarə paneli yazmaları əsas açarlardan istifadə edir. Standart
dəyərlər və ehtiyat həlledici `src/shared/constants/modalityBridgeDefaults.ts`
faylında yerləşir, köhnə sabitlər isə
`src/shared/constants/visionBridgeDefaults.ts` faylında saxlanılır.

Audio `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` və `modalityBridgeAudioMaxClips` açarlarından,
həmçinin paylaşılan `modalityBridgeCache*` parametrlərindən istifadə edir.
Audionun köhnə açar ehtiyatı yoxdur, çünki bu açarlar Modality Bridge sxemi
ilə təqdim edilib.

Video `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` və
`modalityBridgeVideoTimeout` açarlarından, həmçinin paylaşılan
`modalityBridgeCache*` parametrlərindən istifadə edir. O, standart olaraq
söndürülüb, çünki FFmpeg/ffprobe isteğe bağlı əməliyyat asılılıqlarıdır və
kadr başlıqlama gecikmə və model xərci əlavə edir.

## Xüsusi Guardrails

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

1. `BaseGuardrail`-dən miras alan `src/lib/guardrails/myGuardrail.ts` yaradın.
2. `preCall` və/və ya `postCall` metodlarını implementasiya edin.
3. Ya import zamanı qeydiyyatdan keçirin (`registerDefaultGuardrails`-dən push edin),
   ya da runtime-da `guardrailRegistry.register(...)` çağırın — registr eyni
   normallaşdırılmış ada malik istənilən əvvəlki guardrail-i əvəz edir.
4. `tests/unit/` altında testlər əlavə edin (mövcud nümunələr:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testləmə

Məlum bir vəziyyətdən başlamaq üçün testlər arasında `resetGuardrailsForTests()` istifadə edin.
Boş registrlə başlamaq və yalnız test edilən guardrail-ləri qeydiyyatdan keçirmək üçün
`{ registerDefaults: false }` ötürün. Vision Bridge dependency injection qəbul edir
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge isə parametrlər, imkanlar,
STT model seçimi, credential yoxlamaları və transkripsiya üçün ekvivalent nöqtələr
təqdim edir. Beləliklə, testlər DB və ya şəbəkə girişi olmadan hər iki axını yoxlaya bilər.

## Həmçinin bax

- `src/lib/guardrails/` — implementasiya
- `src/shared/utils/inputSanitizer.ts` — prompt-injection və PII maskələməsini təmin edən
  paylaşılan detektor
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge standartları və
  məcburi-bridge model siyahısı
- `src/shared/constants/modalityBridgeDefaults.ts` — paylaşılan Vision/Audio runtime standartları
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonal qat (circuit breaker, cooldown-lar)
- `docs/reference/ENVIRONMENT.md` — tam env dəyişəni istinadı

## Injection-guard marşrut əhatəsi və red-team (Faza 8 · Blok D)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) istifadəçi promptlarını
qəbul edən bütün marşrutları əhatə edir. O, `INJECTION_GUARD_MODE`-a riayət edir
(standart `warn` = yalnız log; `block` = HTTP 400 `SECURITY_001` qaytarır).

| Növ           | Marşrutlar                                                                                                                                           | Standart rejim |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Mətn (mövcud) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn           |
| Generativ     | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn           |
| Məlumat       | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn           |

Mətn çıxarılması (`extractMessageContents`) `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` sahələrini əhatə edir.

**Red-team (gecəlik, `nightly-llm-security.yml`):** promptfoo hər marşrutun
`INJECTION_GUARD_MODE=block` rejimində OWASP-LLM korpusunu blokladığını yoxlayır; garak
probelar işlədir (secret olmadıqda keçir). `moderations` ardıcıllıq üçün daxil edilib.
Blok rejimi məcburi sərhəddir: `evaluatePromptInjection()` middleware-in ötürdüyü
sorğu-səviyyəli deaktiv siyahısını nəzərə almır, ona görə də `disabledGuardrails`
marşrutu bundan **azad etmir** ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Gecəlik workflow (`.github/workflows/nightly-llm-security.yml`, cron + manual
dispatch) iki job-a malikdir:

- **`promptfoo-guard` (bloklayıcı)** — `INJECTION_GUARD_MODE=block` ilə
  `promptfoo eval -c promptfooconfig.yaml` işlədir. Hər adversarial keys
  (məs. "ignore all previous instructions…", DAN tipli jailbreak-lər) cavabın
  `error.code === "SECURITY_001"` daşıdığını təsdiq edir, yəni guard sorğunu
  həqiqətən rədd edir.
- **`garak` (məsləhət xarakterli)** — lokal OmniRoute instansiyasına
  (`http://localhost:20128/v1`) qarşı garak `--probes promptinject,dan,leakreplay`
  işlədir. Provider secret-ə (`PROMPTFOO_PROVIDER_KEY`) bağlıdır; problemsiz şəkildə
  keçir və `|| true` ilə sonlanır, ona görə də CI-u pozmadan hesabat verir.

Guard helper-in (`createInjectionGuard` / `withInjectionGuard`) əhatəsi prompt
daşıyan hər `/v1` marşrutuna şamil edilir; prompt mətni
`src/shared/utils/inputSanitizer.ts` faylındakı `extractMessageContents()` tərəfindən
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` sahələrindən götürülür.
