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

## Daxili qoruyucu mexanizmlər

Reyestr idxal zamanı prioritet sırası ilə altı qoruyucu mexanizmi avtomatik yükləyir
(bax: `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Ad                  | Mərhələ(lər)   | Fayl                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Daha aşağı prioritet nömrələri **əvvəl** icra olunur.

### Vision Bridge (`visionBridge.ts`) — Modallıq körpüsü PR-1

GLM 5.3 baza modeli və `glm-5.3-{low,high,max}` açıq şəkildə
`supportsVision:false` reyestr/spec metadatasına malikdir. GLM 5.3 Flash variantları
yerli görmə modelləri olaraq qalır. Claude Code-un `/v1/messages` marşrutu Claude-dan-OpenAI-a
tərcümədən **əvvəl** paylaşılan `handleChat` pre-call qoruyucu mexanizmlər zəncirinə daxil olur;
iç-içə `Read` alət-nəticəsi şəkilləri OpenAI `image_url` məzmununa qaldırılmadan əvvəl
təsvir edilməli və ya işlənməlidir (#17069).

Şəkil daşıyan sorğuları **görmə qabiliyyəti olmayan modellərə** yönəldildikdə ələ keçirir
və ya bütün sorğunu görmə qabiliyyətli modelə yenidən yönləndirir, ya da upstream çağırışından
əvvəl konfiqurasiya edilə bilən görmə modeli tərəfindən yaradılan mətn təsvirləri ilə şəkil
hissələrini əvəz edir. Bu, yalnız mətnli provayderlərə multimodal yükləri şəffaf şəkildə
emal etməyə imkan verir.

Axın:

1. Hədəf model artıq görməni dəstəkləyirsə, buraxılır (`isVisionBridgeForcedModel` məcburi körpü siyahısında görünməsi istisnadır).
2. Şəkil hissələrini `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`) vasitəsilə çıxarır; bu funksiya **vahid media detektoruna**
   `open-sse/utils/mediaParts.ts` daxilindəki `detectMediaParts()`-a həvalə edir — combo
   uyğunluq filtri ilə paylaşılan yeganə həqiqət mənbəyinə.
   Çıxarış `replaceImageParts` funksiyasının geri yerləşdirə biləcəyi formalara icazə siyahısı
   ilə məhdudlaşdırılır (extract↔replace müqaviləsi): OpenAI `image_url`, Anthropic-in
   `source.type:"base64"` base64 forması, Anthropic URL `source.type:"url"` forması və
   Responses API `input_image`. Claude Code-un `tool_result.content` daxilində və Responses
   alət çıxışlarında iç-içə yerləşən uyğun şəkillər də çıxarılır və ilkin yollarında əvəz olunur;
   yalnız indikator olan formalar combo-filtr materialıdır və çıxarılmır.
   Heç biri tapılmazsa, buraxılır.
3. İşləmə zamanı konfiqurasiyanı `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`) vasitəsilə həll edir: yeni
   `modalityBridge*` parametr açarları üstün tutulur; köhnə `visionBridge*` açarları
   **bir dövrəlik ehtiyat** olaraq qalır (geri qaytarma pəncərəsi). Körpü söndürülübsə,
   istənilən media keçidindən əvvəl buraxılır.
4. Rejim seçicisi (`modalityBridgeVisionMode`, aşağıdakı cədvələ baxın) yenidən yönləndirmə
   və ya təsvir etmə arasında qərar verir. Yenidən yönləndirmə yalnız `model` dəyişdirilmiş
   `modifiedPayload`, həmçinin `{ rerouted, fromModel, toModel, imagesKept }` metadatasını qaytarır.
5. Təsvir yolunda şəkilləri `maxImages` ilə məhdudlaşdırır, tapşırıqdan xəbərdar sorğunu
   formalaşdırır, təsvir keşinə müraciət edir, görmə modelini **paralel** çağırır
   (`Promise.allSettled`) və onların yerinə `[Image N]: <description>` mətn hissələrini daxil edir.
   Uğursuz təsvir `null` qaytarır: xam şəkil naməlum/görmə qabiliyyətli hədəflər üçün qorunur
   (#4012), lakin **təsdiqlənmiş yalnız mətnli birbaşa hədəf** və ya sıfır görmə qabiliyyətli
   combo üçün təsvir edilməmiş hər bir şəklə, o cümlədən qismən uğursuzluqlarda və təsvir
   çağırışı limitini aşan şəkillərdə açıq
   `(unavailable — no vision-capable provider connected)` mətn əvəzedicisi əlavə olunur (#17069).
   Mövcud bütün cəhdlərin uğursuz olduğu combo təsvir ehtiyat mexanizmi qüvvədə qalır (#8430).
6. `modifiedPayload` və meta məlumatlarını (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`) qaytarır.

#### Rejim seçicisi (`modalityBridgeVisionMode`)

| Rejim      | Standart | Davranış                                                                                                                                                                                                                                                                                                                    |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Köhnə evristika dəyişdirilmədən qalır (#6640/#7204): combo olmayan/`auto/` modellər ən yaxşı görmə modelinə yenidən yönləndirilir, ilkin modelin artıq istifadə edilə bilən etimadnamələri olduğu hallar istisnadır (bu halda təsvir edilir); combo hədəfləri həmişə təsvir edir.                                           |
| `describe` |          | Həmişə təsvir edir — yenidən yönləndirmə bloku tamamilə ötürülür; istifadəçinin seçdiyi model həmişə cavab verir.                                                                                                                                                                                                           |
| `reroute`  |          | Yenidən yönləndirməni məcbur edir: etimadnamələri olan modeli qoruma yoxlaması keçilir. Yenidən yönləndirmə-**hədəfinin** etimadnamə yoxlaması yenə tətbiq olunur — istifadə edilə bilən görmə hədəfi olmadıqda körpü təsvir etmədən və ya xam şəkilləri yalnız mətnli hədəfə göndərmədən aydın xəta ilə prosesi bloklayır. |

Məcburi rejimlər `auto` evristikası işə düşməzdən **əvvəl** qısa yoldan icra olunur;
`auto` davranışı PR-1-dən əvvəlki qoruyucu mexanizmlə bayt səviyyəsində eynidir.

#### API açarı əhatə dairəsi (`visionBridgeKeyScope.ts`)

Çağıranın API açarı `allowedConnections`, kvota hovuzlarını
(`allowedQuotas`) və ya modelləri (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`) məhdudlaşdırdıqda, körpü yalnız açarın istifadə edə bildiyi bağlantılardakı, açarın istifadə edə bildiyi yönləndirmə və təsvir modellərini seçir. Təsvir çağırışı bundan sonra həmişə `x-omniroute-self-loop-key-id` başlığı ilə OmniRoute öz-dövrəsi üzərindən həyata keçirilir; beləliklə, qəbul edilən çat sorğusu həmin açarın bağlantı və model siyasətini yenidən tətbiq edir. `enforceApiKeyPolicy()` bu başlığa yalnız öz-dövrə bearer-i ilə birlikdə etibar edir, buna görə giriş yalnız daraldıla bilər və həll olunmayan id rədd edilir.

Açar üçün heç bir vision modelinə icazə verilmədikdə, **təsdiqlənmiş yalnız mətn hədəfi** şəkil sorğusunu lokal olaraq aydın HTTP 400 xətası ilə rədd edir və şəkil baytlarını imkanları olmayan upstream-ə yönləndirmir (#17069). Naməlum və ya yerli vision imkanlarına malik hədəflər üçün təsvir yolu əvvəlki fail-open davranışını saxlayır (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Açar olmadan edilən sorğular və bu məhdudiyyətlərə malik olmayan açarlar əvvəlki kimi tamamilə eyni davranır.

#### Tapşırığa uyğun təsvir promptu (`modalityBridgeVisionTaskAware`)

Defolt dəyər **true**-dur. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) əsas təsvir promptuna **son istifadəçi mesajının** mətnini (500 simvola qədər qısaldılmış) əlavə edir; bu, təsviri istifadəçinin əslində nə istədiyinə yönəldir (codex-vision-proxy nümunəsi) və vision modelindən görünən mətni transkripsiya etməyi xahiş edir. Bayraq söndürüldükdə və ya istifadəçi mətni olmadıqda, əsas prompt dəyişdirilmədən istifadə olunur.

Təsvir öz-dövrəsinin OpenAI-uyğun sorğusu (`visionBridgeHelpers.ts` daxilindəki
`callVisionModelSingle()`) həmişə `image_url.detail: "high"` tələb edir —
şərtsiz olaraq, hər bir çağıran/provayder üçün. Aşağı detallı nümunələndirmə məhz bu promptun tələb etdiyi mətn transkripsiyası tapşırığı üçün OCR dəqiqliyini aşağı salır; buna görə təsvir çağırışı ilkin daxil olan sorğuda hansı detal səviyyəsindən istifadə edilməsindən asılı olmayaraq həmişə yüksək detal tələb edir. Bu, yalnız daxili təsvir sorğusunun gövdəsinə təsir edir; OmniRoute-un çağıranın öz `image_url.detail` dəyərini əsas sorğuda necə yönləndirdiyini dəyişmir — həmin defolt ayrıca və yalnız aşkar edilmiş OpenCode klientləri üçün `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`) daxilində tətbiq edilir. Təsvir öz-dövrəsinin Anthropic naqil formatı budağında `detail` sahəsi yoxdur və bu defoltların heç birindən təsirlənmir.

#### Təsvir çıxışının yuxarı həddi (`modalityBridgeVisionMaxChars`)

| Açar                           | Defolt | Aralıq              |
| ------------------------------ | ------ | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` və ya 100–50000 |

`0` (defolt) **heç bir yuxarı həddin olmaması** deməkdir — `callVisionModel()` tərəfindən qaytarılan təsvir dəyişdirilmədən ötürülür və mövcud davranış qorunur. 100–50000 aralığındakı istənilən dəyər təsviri `[Image N]: <description>` kimi mətnə yerləşdirilməzdən əvvəl `…` şəkilçisi ilə qısaldır (`src/lib/guardrails/visionBridge.ts` daxilində `VisionBridgeGuardrail.preCall()`). Aşağı axın modelinin tam transkripsiyaya ehtiyacı olduğu detallı OCR tapşırıqları üçün bu dəyəri artırın; çoxsözlü vision modellərində token istifadəsini məhdudlaşdırmaq üçün azaldın. İdarə panelindəki sahə Vision bölməsinin Advanced panelində yerləşir (`ModalityBridgeVisionTab.tsx` daxilində `modality-bridge-max-chars`) və 1–99 arasındakı istənilən dəyəri 100 həddinə qədər qaldırır, açıq şəkildə daxil edilmiş `0` dəyərinə isə toxunmur — `0` özlüyündə etibarlı Zod dəyəridir
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), sadəcə “təyin edilməyib” defoltu deyil.

#### Təsvir keşləşdirməsi (`modalityBridge/bridgeCache.ts`)

Təsvir çıxışları üçün proses səviyyəsində paylaşılan yaddaşdaxili LRU + TTL keşi. Açar uzunluq prefiksli çərçivələmə ilə (sahə sərhədlərinin toqquşmasının qarşısını alaraq) `sha256(imageRef + composedPrompt + configuredBridgeModel)`-ə bərabərdir. Model komponenti faktiki cavabı verən model deyil, **konfiqurasiya edilmiş** körpü modelidir —
`callVisionModel` daxilən ehtiyat modelə keçə bilər və hər cəhd üzrə açar yaratmaq keşi parçalayardı. Uğursuz təsvirlər heç vaxt keşə yazılmır. Parametrlər:

| Açar                            | Defolt | Aralıq  |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Uzaq şəkillərin normallaşdırılması (öz-dövrə təsviri/base64 gətirilməsi)

Körpü **uzaq** şəkli özü gətirdikdə — həm Anthropic təsvir öz-çağırışı, həm də claude-naqil-formatlı base64 çevirməsi
(`ensureBase64ImagesForClaudeWire`), hər ikisi `visionBridgeHelpers.ts` daxilindəki
`fetchRemoteImageAsDataUri()` vasitəsilə — nəticədə alınan data URI vision-model sorğusuna yerləşdirilməzdən əvvəl `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) funksiyasından keçirilir. Həddən artıq böyük şəkillər **2048px uzun kənara** qədər kiçildilir (OpenAI/Anthropic-in server tərəfində artıq tətbiq etdiyi ölçü həddinə uyğun olaraq); bu, vision modelinin gördüyünü dəyişmədən yükləmə baytlarını/gecikməni azaldır. Ölçünün dəyişdirilməsi dinamik import vasitəsilə yüklənən `sharp` istifadə edir: native ikilisinin yüklənməsi hansısa platformada uğursuz olduqda `normalizeDataUri()` **heç vaxt xəta atmır** — ilkin baytların olduğu kimi ötürülməsinə qayıdır və beləliklə, təsvir/base64 çevirmə yolu həmişə işlək qalır. Şəkil olmayan baytlar (decodlana bilən şəkil qaytarmayan gətirmə əməliyyatı) da toxunulmadan ötürülür. Bu normallaşdırma yalnız körpünün öz çağırışı üçün gətirdiyi şəkillərə tətbiq olunur — opt-in-only dəyişiklik prinsipinə (Hard Rule #20) uyğun olaraq çağıranın xam passthrough yükünə heç vaxt tətbiq edilmir.

#### Parametrlər sxemi + miqrasiya

Yeni `modalityBridge*` açarları
(`src/shared/validation/settingsSchemas.ts`) daxilindəki `updateSettingsSchema` tərəfindən Zod ilə yoxlanılır:
`modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, `modalityBridgeCache*` üçlüyü və Audio Bridge tərəfindən istifadə olunan
`modalityBridgeAudio*` qrupu. `141_modality_bridge_settings.sql` miqrasiyası mövcud köhnə
`visionBridge*` dəyərlərini uyğun yeni açarlara köçürür (idempotentdir, operator tərəfindən təyin edilmiş
`modalityBridge*` dəyərinin üzərinə heç vaxt yazmır); köhnə açarlar bir buraxılış dövrü ərzində oxuma
ehtiyatı kimi qəbul edilməyə davam edir.

#### Şəffaflıq başlığı + statistika

Təsvir çevrilmiş cavablar
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
başlığını daşıyır (`modalityBridge/bridgeStats.ts` daxilindəki `buildModalityBridgeHeader()` tərəfindən
qurulur və `src/sse/handlers/chatHelpers.ts` daxilindəki `withModalityBridgeHeader()` tərəfindən əlavə edilir).
Yenidən istiqamətləndirilmiş sorğular heç bir başlıq almır — faydalı yük dəyişdirilməyib və model dəyişimi
artıq cavab gövdəsinin `model` sahəsində görünür.

`GET /api/modality-bridge/stats` (idarəetmə autentifikasiyası, `GET /api/settings` ilə eyni səviyyədə)
`vision`, `audio` və `video` üçün yaddaşdaxili modallıq üzrə sayğacları
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` qaytarır. `averageLatencyMs` məxrəc kimi bütün cəhdlərdən
deyil, `latencySamples` dəyərindən istifadə edir; vaxt ölçümü olmayan əməliyyat sıfır millisaniyəlik nümunə
uydurmur. `bridged` uğurlu çevrilmələr üçün geriyə uyğun ləqəb olaraq qalır; uğursuz cəhdlər onu artırmır.
Sayğaclar dizayn üzrə proses yenidən başladıqda sıfırlanır
(telemetriya, uçot deyil).

#### İdarə panelinin konfiqurasiyası

Xüsusi idarə paneli səhifəsi
`/dashboard/settings/modality-bridge` ünvanındadır. URL ilə ünvanlana bilən `Vision`, `Audio`
və `Video` tabları `tab` dəyərini dəyişərkən sorğu parametrlərini qoruyur.
Vision tabı aktivləşdirmə, rejim, model seçimi (avtomatik standart daxil olmaqla), tapşırıqdan xəbərdar
promptinqi, genişləndirilmiş timeout/şəkil/təsvir uzunluğu/cache məhdudiyyətlərini, icra zamanı
sayğaclarını və qorunan nümunə sorğusunu təqdim edir. Audio tabı da işləkdir: aktivləşdirmə,
yalnız STT üçün Auto seçimi olan model seçicisini, timeout/maksimum klip məhdudiyyətlərini, audio
sayğaclarını və `input_audio` nümunə testini təqdim edir. Video tabı funksionaldır: FFmpeg/ffprobe
icra mühitinin vəziyyətini — dörd açıq UI vəziyyətindən birini — göstərir (`unknown`, probe icra
olunduğu və ya tamamlana bilmədiyi müddətdə; client tərəfində probe-un ötürülməsi üçün loopback
olmayan idarə paneli hostunda `restricted`; probe edildikdən və çatışmadığı təsdiqləndikdən sonra
`unavailable`; FFmpeg/ffprobe versiyaları ilə birlikdə `available`) — saxlayır, model/kadr/video/timeout
məhdudiyyətlərini yadda saxlayır, model seçicisini görmə qabiliyyətli modellərlə məhdudlaşdırır və
video sayğaclarını təqdim edir.

AI settings daxilindəki əvvəlki Vision Bridge kartı yeni səhifəyə uyğunluq keçididir; artıq formanın
ikinci nüsxəsinə sahib deyil. Media Providers də mövcud Speech-to-Text playground-ını silmədən
Image-to-Text və Speech-to-Text iş axınlarını uyğun Modality Bridge tablarına bağlayır.

**Self-loop qəbulundan yan keçmə:** təsvir çağırışı OmniRoute-un öz
`/v1` self-loop-u (standart olmayan provider modeli) üzərindən yönləndirildikdə, alt sorğu
`x-omniroute-admission-bypass: internal` göndərir və həll edilmiş self-loop credential-i ilə
autentifikasiya olunur — local rejimdə lokal `sk_omniroute` sentinel-i və ya operator tərəfindən
konfiqurasiya edilmiş `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` mühit açarı (#1350); beləliklə
`REQUIRE_API_KEY=true` yerləşdirmələri də təsvir çağırışını icra edə bilər. Bypass yalnız həmin dəqiq
credential-lər üçün qəbul edilir, buna görə xarici client-lər qəbul mərhələsini keçmək üçün başlıqdan
istifadə edə bilməz.

Köhnə standartlar `src/shared/constants/visionBridgeDefaults.ts` daxilində yerləşir; yeni
rejim/tapşırıqdan xəbərdar/cache standartları və settings resolver
`src/shared/constants/modalityBridgeDefaults.ts` daxilində yerləşir. Guardrail testlərin saxta
`getSettings` və `callVisionModel` implementasiyalarını daxil etməsi üçün `deps` konstruktor seçimini
təqdim edir.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Audio daşıyan chat sorğularını audio girişini qəbul etdiyi məlum olmayan hədəfə çatmazdan əvvəl
tutur. O, chat sorğusunu heç vaxt yenidən istiqamətləndirmir: audio hissələri mövcud
OpenAI-uyğun multipart endpoint vasitəsilə mətnə transkripsiya edilir və seçilmiş chat modeli
mətn transkriptləri ilə işləməyə davam edir.

Axın:

1. `supportsAudio` dəyərini `getResolvedModelCapabilities()` vasitəsilə müəyyənləşdirin. Əvvəlcə provayder reyestrinin açıq metadata-sı, sonra statik model metadata-sı, daha sonra isə sinxronlaşdırılmış `modalities_input` nəzərə alınır. `audio` olmayan elan edilmiş giriş siyahısı `false` deməkdir; heç bir imkan sübutu qalmadıqda nəticə `null` olur. Həm `false`, həm də `null` konservativ körpünü aktivləşdirir, `true` isə onu yan keçir.
2. `modalityBridgeAudio*` parametrlərini müəyyənləşdirin və paylaşılan `detectMediaParts()` detektoru vasitəsilə hər mesajdan splice edilə bilən, üst səviyyədəki audio hissələrini çıxarın. Dəstəklənən wire formaları OpenAI `input_audio`, `audio_url` və `source.media_type: "audio/*"`-dır. İç-içə audio marşrutlaşdırma üçün aşkarlanır, lakin splice yolu ilə silinmir. İş `modalityBridgeAudioMaxClips` ilə məhdudlaşdırılır; sonrakı hissələr toxunulmaz qalır.
3. Konfiqurasiya edilmiş `provider/model` dəyərinə üstünlük verin və ya `selectAudioBridgeModel()` funksiyasına `AUDIO_TRANSCRIPTION_PROVIDERS` siyahısını sabit kataloq ardıcıllığı ilə nəzərdən keçirərək aktiv provayder üçün istifadə edilə bilən kredensiala malik ilk modeli seçməyə icazə verin.
4. `callAudioTranscription()` base64/data-URI audio məlumatını multipart `file`-a çevirir və ya uzaqdakı `audio_url`-i DNS pinləməsi və 25 MB limiti olan yalnız ictimai resurslara icazə verən outbound qoruması vasitəsilə endirir. Daha sonra faylı və seçilmiş modeli `resolveSelfLoopBearer()` ilə autentifikasiya edilən lokal `/v1/audio/transcriptions` self-loop ünvanına POST edir. Mövcud transkripsiya marşrutu adi kredensial axtarışını, cooldown/rate-limit idarəetməsini və provayderə yönləndirməni həyata keçirir.
5. Uğurlu çağırışlar öz hissələrini `[Audio N]: <transcript>` ilə əvəz edir. Çağırışlar `Promise.allSettled` ilə icra olunur: ayrı-ayrı uğursuzluqlar həmin ilkin audio hissəsini qoruyur (#4012 müqaviləsi). Bütün çağırışlar uğursuz olduqda və hədəfin `supportsAudio === false` olduğu sübut edildikdə, hissələr
   `[Audio N]: (unavailable — no STT provider connected)` (#8430 müqaviləsi) ilə əvəz olunur. Naməlum hədəf (`null`) üçün bütün çağırışların uğursuz nəticəsi toxunulmaz qalır. Yalnız mətn qəbul etdiyi sübut edilmiş və istifadə edilə bilən STT kredensialı olmayan hədəf şəbəkə çağırışı edilmədən eyni açıq stub-u alır.

Uğurlu transkriptlər proses üzrə paylaşılan Modality Bridge LRU/TTL keşindən istifadə edir. Açar audio istinadını, sabit `audio-transcription` əməliyyat etiketini və seçilmiş STT modelini birləşdirir; uğursuzluqlar heç vaxt keşlənmir. Audio cəhdləri paylaşılan `bridged`, `cacheHits`, `failures` və `lastUsedAt` sayğaclarını yeniləyir. Çevrilmiş cavablar
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` daşıyır; toxunulmamış sorğulara Audio Bridge seqmenti əlavə edilmir.

İşləmə zamanı parametrlər DB-də saxlanılır və Zod ilə yoxlanılır:

| Açar                          | Standart | Aralıq            |
| ----------------------------- | -------- | ----------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                 |
| `modalityBridgeAudioModel`    | `""`     | Auto və ya STT ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000       |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10              |

Paylaşılan keş `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` və `modalityBridgeCacheMaxEntries` parametrləri ilə idarə olunmağa davam edir.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Chat Completions `messages` və Responses API `input` daxilindəki üst səviyyəli video hissələrini video dəstəyi barədə məlum yerli imkanları olmayan hədəf çağırılmazdan əvvəl tutur. Dəstəklənən formalar `input_video`, `video_url`, `video_source`, HTTPS URL-ləri və `data:video/*;base64,...` data URI-ləridir. Mətn daxilindəki adi fayl adları video kimi qəbul edilmir.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) sorğunun travers edilməsinə, imkan/siyasət yoxlamasına, sorğu üzrə aqreqasiyaya və cavab payload-ına cavabdehdir. Hər video üzrə iş — əldəetmə, tam nəticə keşi, kadr ardıcıllığının təsviri (çağıran tərəfindən elan edilmiş audio transkriptini birləşdirir), həmçinin hər cəhd üzrə metriklər/ləğvetmə/təmizləmə — `videoBridgePipeline.ts` daxilindəki `processVideoPart` arxasında gizlədilir və `preCall` dövrəsində hər video hissəsi üçün bir dəfə çağırılır. Həmin modul həmçinin açıq port sərhədlərini müəyyən edir: `VideoMediaBrokerPort` (baytların əldə edilməsi və nümunə kadrlarının çıxarılması), `VideoAudioTranscriptionPort` (çağıran tərəfindən elan edilmiş audio transkriptinin nümunə üzrə başlıqlarla birləşdirilməsi) və `VideoDrilldownPort` (legacy xam yaddaş forması). Production STT və kadrların saxlanması təsvir portu ətrafında `createVideoSttAdapter` və `createVideoDrilldownAdapter` vasitəsilə birləşdirilir; sonuncu paylaşılan qeyri-şəffaf handle həyat dövründən istifadə edir.

İctimai `/v1` sorğu yolu heç vaxt subprocess import etmir və ya çağırmır. Uzaq videolar 50 MiB limiti altında endirilir; inline base64 videolar üçün model/mesajlar/kadrlaşdırma envelope-nun 50 MiB-lik ictimai JSON sorğusu qəbul limitinə sığması üçün hər video üzrə konservativ 36 MiB dekodlaşdırılmış limit tətbiq olunur. Inline uzunluq və dekodlaşdırılmış ölçü təxminləri yaddaş ayırmadan əvvəl yoxlanılır. İlkin uzaq URL və hər bir yönləndirmə üçün mövcud DNS pinləməli, yalnız ictimai resurslara icazə verən outbound qorumasından istifadə etməklə HTTPS tələb olunur. Daha sonra baytlar dəqiq daxili `POST /api/modality-bridge/video/extract` broker sərhədindən keçir. Bu marşrut həm `LOCAL_ONLY`, həm də `SPAWN_CAPABLE`-dır, yalnız proses üzrə autentifikasiya edilmiş etibarlı loopback sorğusunu qəbul edir və URL, fayl sistemi yolu, icra olunan fayl və ya arqument siyahısını heç vaxt qəbul etmir. API body-size pipeline-ı və handler-in artımlı body reader-i müstəqil şəkildə 50 MiB broker giriş limitini tətbiq edir. Onun məhdudlaşdırılmış növbəsi eyni anda bir çıxarış icra edir, dörd gözləyən işə icazə verir və gözləyən girişləri 100 MiB ilə məhdudlaşdırır.

Broker daxilində `ffprobe` şəxsi lokal faylı oxuyur; sabit format
icazə siyahısına pleylist və manifest formatları daxil deyil. İcazə verilən MOV
ailəsi konteynerləri üçün xarici MOV məlumat istinadları standart olaraq
deaktiv olaraq qalır və sabit əmr onları aktivləşdirmir. Həm `ffprobe`, həm də
`ffmpeg` yalnız `file` protokoluna icazə verən siyahıdan, bir başlıqdan, sabit
arqument massivlərindən və shellsiz icradan istifadə edir; icra olunan fayllar
`PATH` əsasında müəyyənləşdirilir. Qoşulmuş şəkil üz qabığı axınları oynadıla
bilən namizədlər deyil. Oynadıla bilən bütün axınlar limitlərə uyğun olmalıdır
və deterministik ən aşağı indeksli ehtiyat seçimdən əvvəl açıq şəkildə
göstərilən standart axına üstünlük verilir. Videolar 600 saniyə, hər ölçü üzrə
8.192 piksel və 33.554.432 mənbə pikseli ilə məhdudlaşdırılır. FFmpeg 1–16
aralıq JPEG kadrı nümunələyir, kiçik girişləri böyütmədən uzun kənarı ən çox
1.024 pikselə qədər kiçildir və heç vaxt URL qəbul etmir. Nümunələmə standart
olaraq `uniform` rejimindədir. Könüllü `scene_aware` və eksperimental
`segment_aware` siyasətləri artıq yoxlanılmış lokal axın üzərində əlavə bir
sabit FFmpeg keçidi icra edir, məhdudlaşdırılmış `showinfo` səhnə zaman
nişanlarını seçir və detektor xətası, vaxt aşımı, səhv formatlı çıxış və ya
namizəd dəstinin boş olması halında deterministik şəkildə eyni bərabər
paylanmış orta nöqtələrə qayıdır. Segment-yönümlü rejim orta nöqtə nümunələrini
yoxlanılmış səhnə intervallarına mütənasib şəkildə ayırır; segment-yönümlü
sübutlar və ehtiyat davranışı aşağıda ətraflı izah edilir. Sərt 16 kadr limiti
bütün siyasətlərdə seçimdən sonra tətbiq olunur. Səhnə-yönümlü sorğunun
büdcəsi yalnız bir kadr olduqda, aktiv tam video və ya fokus pəncərəsinin
bərabər paylanmış orta nöqtəsindən istifadə edir və `policyEffective: uniform`
bildirir: tək seçilmiş səhnə kadrı zaman xəttinin hər iki ucunu qoruya bilməz.
Çağıran tərəf istəyə görə sonlu fokus pəncərəsi (`start`/`end` saniyə) təqdim
edə bilər; sərhədlər medianın müddəti daxilində məhdudlaşdırılır, tərs və ya
sonlu olmayan pəncərələr rədd edilir və bütün nümunələmə siyasətləri yalnız
normallaşdırılmış interval daxilində həyata keçirilir. Nəticədə yaranan
pəncərə nümunələmə metadatasına və etibarsız təsvir prefiksinə daxil edilir ki,
aşağı axındakı modellər fokuslanmış hissəni tam zaman xəttindən ayıra bilsin.

Semantik başlıq fokuslanması ayrıca, açıq şəkildə verilən parametrdir.
Standart `full` analiz rejimi mövcud kadr sorğusunu qoruyur və sorğu mətnini
heç vaxt başlıq modelinə ötürmür. `focused` rejimində körpü eyni Chat və ya
Responses konteynerindən yalnız istifadəçi tərəfindən yazılmış ən son boş
olmayan `text`/`input_text` dəyərini oxuyur, onu NFC formasında normallaşdırır,
idarəetmə simvollarını və boşluqları birləşdirir və 500 Unicode kod nöqtəsi ilə
məhdudlaşdırır. Boş nəticə dəqiq `full` sorğusuna qayıdır. İstifadəyə yararlı
işarə ayrıca etibarsız istifadəçi konteksti blokunda JSON kimi
seriyalaşdırılır və yalnız müşahidə edilə bilən detallara üstünlük verə bilər;
o, mediada görünən və ya eşidilən təlimatlara əməl etməmək barədə ayrıca
xəbərdarlığı ləğv edə bilməz. Mətn fokusu heç vaxt `start`/`end` dəyərlərini
çıxarmır və zaman nümunələyicisini dəyişmir.

#### FU-07 struktur seqment sübutları

`segment_aware` artıq yoxlanılmış lokal video axını üzərində məhdudlaşdırılmış
bir ilkin analiz keçidindən istifadə edir. Sabit filtr zənciri əvvəlcə eni ən
çox 320 pikselə qədər kiçildir, səhnə dəyişikliklərini və donmuş intervalları
aşkarlayır, sonra bulanıqlıq, orta luma və məkan/zaman informasiyası üçün
saniyədə 1 kadr nümunələyir. Keçid 600 struktur nümunəsi, bir FFmpeg/filtr
başlığı, eyni `file`-yalnız protokol və konteyner icazə siyahıları, 1 MiB
proses çıxışı limiti və brokerin ortaq dayandırma/müddət limiti daxilində ən
çox 30 saniyə ilə məhdudlaşdırılır. O, sorğudan heç vaxt əmr, filtr, yol və ya
URL qəbul etmir.

Struktur dəyərlər semantik video anlayışı deyil, deterministik nümunələmə
sübutlarıdır. Onlar obyektləri, hərəkətləri, başlıqları, nitqi və ya istifadəçi
niyyətini çıxarmır. Səhnə və donma sərhədləri seqmentləri formalaşdırır; donma
əhatəsi, bulanıqlıq, ekspozisiya, məkan detalları və zaman dəyişimi yalnız
mövcud 1–16 kadr büdcəsinin necə bölüşdürülməsinə təsir edir. Tamamilə donmuş
seqment üçün ən çox bir kadr ayrılır, donmamış seqmentlər isə qalan büdcə üçün
rəqabət aparır. Sərhədlərin sayı kadrların sayını keçdikdə, sürətli erkən
kəsiklərin uzun son seqmenti gizlədə bilməməsi üçün zaman xəttinin bərabər
əhatəsi saxlanılır. Donma sərhədinin 1 saniyəlik analiz dəqiqliyi daxilindəki
səhnə sərhədləri birləşdirilir.

Filtrlərin olmaması, səhv formatlı və ya boş sübut, detektor xətası yaxud
məhdudlaşdırılmış ilkin analiz vaxtının aşılması dəqiq bərabər paylanmış orta
nöqtə siyasətinə açıq şəkildə geri qayıdır. Çağıranın dayandırması və ya
brokerin son müddəti açıq şəkildə geri qayıtma ilə nəticələnmir: icra olunan
alt proses dayandırılır, sonrakı kadr çıxarışının qarşısı alınır və şəxsi
müvəqqəti ağac `finally` daxilində silinir.

`scripts/perf/video-bridge-fu07-eval.ts` deduplikasiyadan sonrakı başlıq
çağırışlarına qənaət, sıx hərəkət üçün büdcə bölgüsü, bulanıqlıq/ekspozisiya/SI-TI
sübutları, uzun quyruqlu sürətli kəsiklər və tədricən solma ilə yaranan yanlış
müsbət nəticələr üçün deterministik real FFmpeg qurğuları yaradır. O, ilkin
analizin divar saatı müddətini və `/usr/bin/time` əlçatan olduqda, törəmə
prosesin CPU istifadəsini və pik RSS göstəricisini qeyd edir. Onun keyfiyyət
yoxlamaları yalnız struktur orakllarıdır. Bu harness-in icazəli son nöqtəsi və
ya dondurulmuş hakimi olmadığı üçün real başlıq modeli keyfiyyəti `HOLD`
olaraq qalır. Pul qənaəti də yalnız `--caption-cost-per-call-usd` hər çağırış
üçün açıq şəkildə müsbət təxmin təqdim etdikdə `HOLD` olaraq qalır; skript bu
nəticələrin heç birini uydurmur.

Hər kadr 4 MiB, bütün xam kadrlar birlikdə 23 MiB, seriallaşdırılmış broker cavabı isə 32 MiB ilə məhdudlaşır. Şəxsi müvəqqəti kataloq `finally` blokunda silinir. OmniRoute FFmpeg-i paketə daxil etmir və fərdi icra edilə bilən fayl yolunu qəbul etmir. Başlıqlandırmadan əvvəl körpü konservativ vizual dublikatların çıxarılması mərhələsi tətbiq edir: hər JPEG 16×16 ölçülü boz tonlu buferə endirilir və yalnız saxlanılan son kadrla müqayisə olunur. Tələb olunan başlıq büdcəsi bir kadrdan çox olduqda, çıxarış həmin büdcənin iki mislinədək, lakin heç vaxt 16 kadrdan çox olmayan məhdud namizəd hovuzu təqdim edir. Tələb olunan limit yalnız dublikatların çıxarılmasından sonra tətbiq edilir; büdcə ən azı iki olduqda, son seyrəltmə zamanı ilk və son seçilmiş namizədlər qorunur. Versiyalı
`grayscale-16x16-mean-cells-v2` siyasəti orta luma fərqi ilə normallaşdırılmış fərqi ən azı 0.05 olan miniatür təsvir xanalarının nisbətindən daha böyük olanı istifadə edir. Dublikat həddi icra zamanı dəyişdirilə bilən parametr kimi təqdim edilməyən və proqnozlaşdırıla bilməsi üçün seçilmiş 0.04 sabitidir. Bu ikinci
yüksək kontrastlı siqnal yalnız orta göstəriciyə əsaslanan müqayisənin gizlədə biləcəyi kiçik hərəkətləri və görünən mətn dəyişikliklərini qoruyur. Müqayisəçi və ya dekoder xətaları açıq şəkildə buraxılır və əhatəlilik saxlanılır. Çıxış metadatası çıxarılmış namizədləri, uğurla istifadə edilmiş kadrları və atılmış vizual dublikatları ayrı göstərir.

Açıq şəkildə işarələnmiş video hissəsi zaman nişanlı kontakt vərəqi tələb edə bilər. Körpü ən çox 4 sütunlu, 16 kadrdan ibarət JPEG şəbəkəsi yaradır. Hər 512 piksellik xana mənbə zaman nişanını yüksək kontrastlı alt zolağa yazır, eyni zaman nişanları isə sonrakı əlaqələndirmə və audit üçün mətn metadatasında saxlanılır. Tam JPEG 32 MiB ilə məhdudlaşdırılır. `sharp` şəbəkəni dekodlaşdıra və ya birləşdirə bilmədikdə, körpü ayrı-ayrı JPEG kadrlarına qayıdır; müştərinin ləğvi şəbəkə əməliyyatı vasitəsilə də ötürülür.

Promosiyaya çıxarılma sübutu sintetik kompozisiya mikrobencmarkından qəsdən ayrı saxlanılır. `scripts/perf/video-bridge-contact-sheet-eval.ts` real OpenAI-uyğun görmə modelləri üçün sxem versiyalı A/B qoşqusunu müəyyən edir. O, provayder tərəfindən bildirilən tokenləri, başdan-başa divar saatı gecikməsini (şəbəkənin yaradılması da daxil olmaqla), model çağırışlarının sayını və manifestdə müəyyən edilmiş faktların qorunmasını ölçür. Xam model cavabları hesabata yazılmır; yalnız SHA-256 həzmləri və uyğun fakt identifikatorları saxlanılır. `--execute-real` ötürülmədikcə və `--model`, `OMNIROUTE_BASE_URL` və `OMNIROUTE_API_KEY` konfiqurasiya edilmədikcə qoşqu heç bir şəbəkə və ya ödənişli model çağırışı etmir. Bu açıq real icra olmadan onun maşın tərəfindən oxuna bilən hökmü `HOLD` olaraq qalır; yalnız sintetik faydalı yük və çağırış sayı ölçmələri promosiyaya çıxarılma sübutu hesab edilmir.

Çağıran tərəf artıq uyğunlaşdırılmış mətnə malik olduqda, dəstəklənən video hissəsinə ixtiyari `transcript.cues` massivi əlavə edə bilər. Hər cue `text` sahəsini, yoxlanılmış müddət daxilində yerləşən sonlu `start`/`end` intervalını və icazə verilən `source` dəyərini (`client`, `embedded` və ya `audio-bridge`) daşımalıdır; `confidence` standart olaraq `1` olur və `0` ilə `1` arasında qalmalıdır. Tam eyni cue-lar birləşdirilir. OmniRoute bu metadatadan heç vaxt transkripsiyanı başlatmır: yoxlanılmış cue-lar mənbə, etimad və interval ilə təsvir edilmiş nəticəyə köçürülür və kadr başlıqları ilə yanaşı etibarsız müşahidələr kimi təqdim edilir. Etibarsız, diapazondan kənar və ya mənşə məlumatı olmayan mətn başlıq axınına qarışdırılmaq əvəzinə rədd edilir. Sorğu gövdəsindəki hər iki transkript kanalı təqdim edilmiş mənşə məlumatını, o cümlədən özünün bildirdiyi `embedded` və ya `audio-bridge` etiketlərini `client` olaraq normallaşdırır. Yalnız serverin sahib olduğu adapter kodla idarə olunan `trustedSource` arqumenti vasitəsilə həmin etibarlı etiketləri təyin edə bilər; sorğu JSON sahəsi həmin arqumentə çata bilməz. Transkript mətni mənşəyindən asılı olmayaraq, mediadan əldə edilmiş etibarsız məzmun olaraq qalır və heç vaxt avtorizasiyanı müəyyən etməməlidir.

Qabaqcıl çağıran tərəf eyni video üçün `audioTranscript` treki təqdim edə bilər; bu, server transkripsiyasının sübutu deyil, müştəri tərəfindən təqdim edilmiş mətn kimi qəbul olunur. Birləşdirmə qovşağı vizual və audio müşahidələri bir son tarix və ləğvetmə siqnalı altında icra edir, onları ümumi zaman xəttində sıralayır, tam eyni dublikatları birləşdirir və yalnız bir tərəf uğur qazandıqda qismən nəticə bildirir. Etibarsız `audioTranscript` bütün videonu uğursuz etmək əvəzinə, həmin qismən nəticəyə keçir — vizual təsvir saxlanılır, audio budağı isə təmizlənmiş xəta kodu qeyd edir. Hər budağın əlçatanlığı, qismən nəticə bayrağı və təmizlənmiş xəta kodları təsvir edilmiş nəticədə, qoruyucu mexanizm metadatasında (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), nəticə keşinin metadatasında və körpünün birləşdirmə sayğaclarında saxlanılır. Standart Video Bridge yolu nitqdən mətnə çevirməni çağırmır və medianın ikinci nüsxəsini endirmir; bu açıq trek olmadan yalnız video ilə işləyir.

**Transcript retention (#12150 P1).** Bu, Video Bridge (özü seçimə bağlıdır) transcript cue-u göstərdiyi hər vəziyyətdə avtomatik tətbiq olunur — ayrıca retention bayrağı yoxdur. Sorğu istənilən transcript cue-unu (çağıran tərəfindən elan edilmiş `transcript` və ya birləşdirilmiş `audioTranscript`) göstərdikdə, qoruyucu mexanizm onu `videoBridgeObserved` kimi işarələyir və video təsvirinin redaktə edilmiş kölgəsini yaradır — hər cue-un sərbəst mətn gövdəsinin ` [redacted-video-transcript]` ilə əvəz edildiyi eyni render; bu, yastılaşdırılmış mətni təhlil etməklə deyil, sətir yığılmazdan əvvəl strukturlaşdırılmış cue sahəsinin əvəzlənməsi ilə qurulur, buna görə də heç bir cue məzmunu — düşməncəsinə hazırlanmış və ya adi, o cümlədən `]` ehtiva edən gövdələr, məsələn `[inaudible]`/`[music]` — qorunub qala bilməz. Saxlanılan call-log sorğu gövdəsində video mənşəli hər mətn hissəsi məzmun bərabərliyinə əsasən həmin redaktə edilmiş kölgə ilə əvəzlənir; `fullText` lövbəri tamamlanmış çağırışdan əvvəlki qoruyucu mexanizm yükündən yenidən oxunur, buna görə də sonrakı zəncir qoruyucu mexanizmləri (prioritetləri 10/95 olan PII və credential maskalayıcıları) təsvir mətnini yerində dəyişdikdən və sistem promptu/handoff/memory inyeksiyası mesaj massivini yenidən formalaşdırdıqdan sonra da uyğunluq davam edir. Modelə yuxarı axınla göndərilən gövdə dəyişdirilmir. Müşahidə edilmiş sorğu heç bir dayanıqlı Memory-ni doldurmur (həm sorğudan, həm də cavabdan alınan çıxarışlar ötürülür), beləliklə modelin öz cavabı transcript mətnini Memory-yə əks etdirə bilmir.

**Raw video fields (#12430).** Bridge aktiv olduqda və native video dəstəyi məlum olmadıqda və ya olmadıqda, müəyyən edilmiş `transcript`/`audioTranscript` sahələri, hətta təsvir uğursuz olduqdan və ya `maxVideos` limitindən sonra belə, `videoBridgeObserved`-ı aktivləşdirir. `null` və boş sətirlər nəzərə alınır; olmayan sahələr və video olmayan metadata nəzərə alınmır. Saxlanılan nüsxələrdə bu sahələr redaktə edilir və ya sorğu buraxılır, cache/Memory isə yan keçilir.

Bu fallback yollarında etibarlı çağıran cue-ları qeyri-standart provider sahələri əvəzinə dəstəklənən `text`/`input_text` hissələrinə çevrilir. Sorğu ilə təqdim edilən hər iki trek etibarsız `client` müşahidələri olaraq qalır; videonun təsvir edilmədiyi və zaman nişanlarının media ilə yoxlanmadığı barədə açıq xəbərdarlıq əlavə olunur. Mövcud 256-cue/64-KiB ümumi və hər cue üçün büdcələr birlikdə iki trekə tətbiq edilir; zaman nişanları brokerin 600 saniyəlik həddinə və təqdim edilmiş fokus pəncərəsinə uyğun olmalıdır. Etibarsız treklər atılır, ixtiyari mətn kimi ötürülmür; birləşdirilmiş büdcə aşılmadıqca etibarlı qonşu trek yenə də istifadə edilə bilər. Null/boş sahələr mətn əlavə etmir. Bu fallback tərəfindən heç bir media götürülməsi və ya transkripsiya əlavə edilmir. Transcript genişləndirmə sahələri fallback video daşıyıcısından və onun `video_url`/`source` obyektlərindən silinir. OpenAI wire allowlist-i ciddi olaraq qalır; naməlum-native video daşıyıcıları əlçatan olaraq qalır və yalnız mətn dəstəkləyən məlum hədəflər təhlükəsiz markerləri saxlayır. Strukturlaşdırılmış redaktə kölgələri əlavə edilmiş transcript mətnini qoruyur, orijinal çağırana məxsus sorğu isə dəyişdirilmir. Native dəstəkli hədəflər və deaktiv edilmiş bridge-lər mövcud bypass davranışını saxlayır.

Əlavə saxlanılan nüsxələr eyni müşahidə edilmiş sorğu siqnalından istifadə edir. Xam qoruyucu mexanizmdən əvvəlki client-request snapshot-ı, yaddaşdakı gözləyən sorğu və erkən rədd edilmiş sorğu jurnalı video hissələrindəki transcript sahələrini strukturlaşdırılmış şəkildə əvəz edir; pipeline mərhələləri və context handoff tərəfindən sintez edilən sətir promptları saxlanılan sorğu gövdəsi sinkində redaktə olunur. Saxlanılan `video_content_removed` marker-i `previous_response_id` davamını təhlükəsiz şəkildə uğursuz edir və qəsdən atılmış mətni yenidən qurmasının qarşısını alır. Müşahidə edilmiş sorğu loglama zamanı hər hissə üzrə redaktə kölgəsini itirərsə və ya sonrakı sorğu dəyişikliklərindən sonra bir neçə video kölgəsindən hətta biri uyğun gəlməzsə, qismən redaktə edilmiş transcript-i saxlamaq əvəzinə saxlanılan sorğu gövdəsi tamamilə buraxılır.

Müşahidə edilmiş sorğu üçün model cavabı transcript-in istənilən hissəsini strukturlaşdırılmış cue sərhədi olmadan sitat gətirə bilər. Buna görə onun saxlanılan call-log `responseBody`-si buraxılma markeri ilə əvəz olunur; təfərrüatlı pipeline artefaktı (yuxarı axın/client gövdələrini və stream hissələrini ehtiva edə bilər) saxlanılmır. Həmin sorğu üçün semantic, idempotency və reasoning-replay cache-lərinin oxunması və yazılması yan keçilir. Provider sorğusu və client üçün görünən cavab dəyişdirilmir. Təfərrüatlı artefakt buraxıldıqda ilkin keepalive baytları müvəqqəti buferdən boşaldılır. Kiro-nun düzgün formatlanmamış EventStream xəbərdarlığı yalnız payload baytlarının sayını bildirir, məzmununu və ya JSON parser-in xam xətasını heç vaxt bildirmir.
Bu, əlaqəsiz hər provider/plugin diaqnostikasının auditdən keçirildiyini iddia etmir; daha geniş saxlanılan sinklərin yoxlanması #11658-də izlənilir.

Daxili `/api/modality-bridge/video/drilldown` lifecycle-i ayrıca, loopback/token-authenticated cache substratıdır. Hər əməliyyat həmçinin canonical opaque principal ID tələb edir. Production caller aktivləşdirilməzdən əvvəl həmin ID-ni authenticated tenant-dan törətməli və client tərəfindən seçilmiş dəyəri heç vaxt ötürməməlidir. Cache açarları həmin principal-i canonical session və video-reference ID-ləri ilə əlaqələndirir, yalnız onların SHA-256-dan törədilmiş açarlarını saxlayır və həm oxuma, həm də silmə əməliyyatlarını eyni principal ilə məhdudlaşdırır. Cache hər entry üçün ən çox 16 törədilmiş JPEG frame saxlayır, onları on dəqiqədən sonra müddəti bitmiş hesab edir və məhdudlaşdırılmış `start`/`end` oxumalarını və ya açıq session silinməsini dəstəkləyir.

Hər principal 16 entry və 64 MiB canonical JPEG data ilə məhdudlaşdırılır. Bu limitlər qlobal 64-entry/256 MiB həddindən müstəqildir: principal quota təzyiqi qlobal LRU eviction nəzərdən keçirilməzdən əvvəl yalnız həmin principal-in ən uzun müddət istifadə olunmayan entry-lərini çıxarır. Müddəti bitmiş entry-lər cache aktivliyi zamanı həm principal, həm də qlobal uçotdan təmizlənir, cancellation və validation failure isə qismən əvəzetməni commit etmir.

Keş kanonik olmayan Base64-i, artıq padding-i, JPEG olmayan medianı, səhv formatlanmış və ya yarımçıq JPEG-ləri, eləcə də məhdudlaşdırılmış tam təsvirli `sharp` dekodlaması zamanı xəbərdarlıq yaradan JPEG-ləri rədd edir. O, qəbul edilmiş hər təsviri kanonik JPEG kimi yenidən kodlayır, eni və hündürlüyü çağıranın sahələrinə etibar etmək əvəzinə dekodlanmış baytlardan müəyyənləşdirir və saxlamadan əvvəl sondakı poliqloT baytlarını atır. Kvotaların hər ikisinə yalnız məhdudlaşdırılmış kanonik sıxılmış bufer hesablanır. JSON wire limiti 32 MiB-lik dekodlanmış giriş həddi üçün Base64 əlavə yükünü də əhatə edir. Hər saxlanılan törəmə təsdiqlənmiş JPEG formatını/ölçüsünü, seçmə siyasətini, törəmə versiyasını, yaradılma vaxtını, server tərəfindən hesablanmış məzmun heşini, heşlənmiş ana istinadını və etibarlı çağıranın ana məzmun heşini qeyd edir. Ləğvetmə asinxron dekodlama/heşləmə mərhələləri arasında, keşə atomik commit edilməzdən əvvəl yoxlanılır.

Production producer artıq törədilmiş broker kadrlarını yalnız uğurlu vizual analizdən sonra, videonun ikinci dəfə endirilməsi/çıxarılması olmadan təkrar istifadə edir. Bunun üçün operatorun `modalityBridgeVideoDrilldownEnabled=true` parametri, hər hissə üzrə ciddi `drilldown: true` və autentifikasiya olunmuş API açarı qeyd ID-si tələb olunur. Müştəri tərəfindən elan edilən principal/session dəyərləri heç vaxt sahiblik yaratmır. Bu üç şərtin hamısı olmadıqda əlavə kadrlar heşlənmir, ölçüləri dəyişdirilmir və saxlanılmır. Saxlama uğursuz olduqda istifadə edilə bilən vizual cavab qorunur. Razılıq verilmiş sorğular bütün video nəticə keşini yan keçirir ki, keşlənmiş nəticələr handle-ları heç vaxt yenidən təqdim etməsin.

Uğurlu JSON və SSE cavabları məhdudlaşdırılmış `x-omniroute-video-drilldown` başlığında ən çox dörd qeyri-şəffaf handle təqdim edir. Səlahiyyətli brauzer origin-ləri CORS origin siyasətini genişləndirmədən həmin başlığı oxuya bilər. Yeni handle-lar `v1.<32-byte random base64url token>` formatından istifadə edir və reyestr yalnız onların SHA-256 heşlərini saxlayır. Reader/header parser həmçinin köhnə 64-hex token-ləri qəbul edir. Autentifikasiya olunmuş ictimai consumer `GET /api/v1/video-bridge/drilldown?handle=...` ünvanıdır və ayrıca `modalityBridgeVideoDrilldownRemoteEnabled=true` parametri ilə idarə olunur. Açıq şəkildə saxlanılan false dəyəri, köhnə `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env fallback-i aktiv olsa belə, girişi ləğv edir. Production retention üçün analoji köhnə `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` fallback-i mövcuddur. Hər iki fallback-in standart dəyəri off-dur.

Consumer sahibliyi autentifikasiya olunmuş açardan müəyyən edir və açar siyasətini tətbiq edir: həm GET, həm də DELETE `/v1` və `/api/v1` alias-ları daxil olmaqla `video` endpoint kateqoriyasına aiddir. Endpoint allowlist-i boş olmayan açarlara `video` daxil edilməlidir; məhdudiyyətsiz açarlar uyğunluğunu qoruyur. Consumer naməlum, vaxtı bitmiş və başqa açara məxsus handle-lar üçün eyni 404 cavabını qaytarır. O, `variant=preview|standard|detail` (maksimum JPEG ölçüsü 320/640/1280, heç vaxt böyüdülmür), `limit=1..8` (və ya köhnə `frames` alias-ı, lakin hər ikisi birlikdə istifadə edilə bilməz), sıfır əsaslı `page` və əlavə `start`/`end` fokus saniyələrini qəbul edir. Təkrarlanan query açarları və tərsinə çevrilmiş fokus pəncərələri rədd edilir. Qaytarılan hər variantın faktiki məzmununun heşi və faktiki ölçü metadatası olur və saxlanılan mənbə ilə əlaqələndirilir. Variantlar əlavə saxlanılan nüsxələr kimi yadda saxlanılmaq əvəzinə oxunma zamanı törədilir. Base64/envelope daxil olmaqla JSON cavabı 32 MiB ilə məhdudlaşdırılır; həddən böyük səhifə 413 qaytarır və müştəri daha az kadr tələb etməlidir. Oxunuşlar hər ölçü dəyişdirmə əməliyyatı ətrafında ləğvetməni yoxlayır və qaytarmadan əvvəl handle-ın etibarlılığını yenidən yoxlayır. Sahib tərəfindən edilən `DELETE` idempotentdir; silinmə və ya TTL-nin başa çatması saxlanılan mənbəni və istifadə uçotunu azad edir.

Paylaşılan store proses-lokaldır: handle-lar restart zamanı vaxtı bitir və müstəqil OmniRoute prosesləri arasında ötürülə bilmir. İdarəetmə statistikaları effektiv retention/remote siyasətini və yalnız saxlanılan ümumi girişlərin/baytların sayını göstərir; medianı, istinadları, principal ID-lərini və handle-ları heç vaxt göstərmir. Video settings paneli həmin dəyərləri göstərir və hər iki consent switch-i saxlaya bilər. Bu implementasiya sənədləri canlı deployment və ya promotion sübutu deyil; real-model qəbulu ayrıca izlənilir.

Kadrlar konfiqurasiya edilmiş Video modeli ilə ardıcıl şəkildə caption edilir. Boş Video override-i Vision parametrini miras alır; hər ikisi boş olduqda Vision auto-router effektiv vision-capable model-i seçir. Uğurlu caption-lar orijinal hissəni sabit `[Video description:` prefiksi ilə əvəz edir; bu prefiks həm mətni etibarsız, mediadan törədilmiş müşahidə kimi işarələyir, həm də aşağıdakı modellərə mediada tapılan təlimatlara əməl etməməyi bildirir. Frame-caption keş açarlarına JPEG baytları, prompt, timestamp və effektiv model daxildir; yalnız uğurlu caption-lar keşlənir. Keş girişləri fallback model də daxil olmaqla faktiki uğurlu producer modelini saxlayır; müxtəlif kadrlar fərqli modellərlə yaradıldıqda bridge `mixed` bildirir. Keş hit-i həmin producer identikliyini təkrar istifadə edir və onu tələb olunan routing planı kimi yenidən etiketləmir. Bütün video nəticə keşi çıxışı dəyişən hər bir giriş üzrə açarlanır — prompt, effektiv model, sampling siyasəti, kadr sayı, semantik analiz rejimi, normallaşdırılmış fokus hint-in SHA-256 fingerprint-i, fokus pəncərəsi, `transcript`, `audioTranscript` və contact-sheet flag — buna görə də bu ölçülərdən hər hansı birinin dəyişməsi keş miss-i yaradır, köhnə nəticənin təkrar istifadəsini deyil. Vizual dedup siyasətinin versiyası, həddi və məhdudlaşdırılmış namizəd-kadr sayı da nəticə-keş açarında və metadatasında açıq şəkildə göstərilir; buna görə siyasət dəyişikliyi köhnə bütün-video təsvirinin təkrar istifadəsinə səbəb ola bilməz. Result-cache v4 metadatası rejimi və fingerprint-i saxlayır, xam istifadəçi tapşırığını isə heç vaxt saxlamır. Guardrail metadatası həm tələb olunan, həm də effektiv analiz rejimlərini bildirir; istifadə edilə bilən istifadəçi mətni olmayan `focused` rejimi faktiki olaraq `full` kimi bildirilir.

Guardrail dəstəklənən hər video hissəsini çıxarır, lakin
`modalityBridgeVideoMaxVideos` sayından çoxunu təsvir etmir. `supportsVideo === false`
olduğu təsdiqlənmiş hədəf üçün uğursuz və limitdən artıq videolar açıq təhlükəsiz
mətn markerlərinə çevrilir ki, xam video qalmasın. Qabiliyyət məlum olmadıqda bu
hissələr video daşıyıcısını saxlayır; istənilən alternativ transkript yuxarıda
göstərilən məhdud mətn çevirməsindən keçir. `supportsVideo === true` olan hədəflər
bridge-i keçirlər. Client sorğusunun ləğvetmə siqnalı endirmə, broker növbəsi,
alt proseslər və altyazı çağırışları boyunca ötürülür; ləğvetmələr videoların
arasında prosesi dayandırır və heç vaxt xam mediaya təhlükəsiz olmayan keçid etmir.

İş vaxtı parametrləri DB-də saxlanılır və Zod ilə yoxlanılır:

| Açar                                | İlkin dəyər | Aralıq / davranış                                                                                                    |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | İstəyə bağlı iş vaxtı parametri, açıq şəkildə aktivləşdirilməlidir                                                   |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` ümumi altyazıları saxlayır; `focused` məhdudlaşdırılmış, etibarsız son istifadəçi kontekstindən istifadə edir |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge modelini miras alır                                                                                    |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                 |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` və ya proporsional `segment_aware`; detektor uğursuz olduqda `uniform`-a qayıdır            |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                  |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                       |

Əvvəldən saxlanılmış Video timeout dəyərləri 120 saniyədən yuxarı olduqda broker
deadline-ına qədər məhdudlaşdırılır; yeni parametrlərin yazılması zamanı bu
həddən yuxarı dəyərlər rədd edilir.
`GET /api/modality-bridge/video/runtime` autentifikasiyadan və iş vaxtının
yoxlanılmasından əvvəl etibarlı, möhürlənmiş loopback lokaliteti tələb edir,
daha sonra isə idarəetmə autentifikasiyası tələb olunur. O, yalnız
`available`, təmizlənmiş FFmpeg/ffprobe versiyalarını və iş vaxtı əlçatan
olmadıqda sabit səbəbi qaytarır. Daxili çıxarış endpoint-i açıq upload API-si
deyil: növbə tutumu dolduqda `503` və `Retry-After`, caller bağlantısı
kəsildikdə `499`, sabit broker deadline-ı keçdikdə isə `504` qaytarılır.
Çevrilmiş cavablar mərkəzi `x-omniroute-modality-bridge` başlığına
`video->text;model=<visionModel>;parts=<videos>` əlavə edir, Vision və ya Audio
seqmentlərini silmir.

### PII maskalayıcısı (`piiMasker.ts`)

Hər iki mərhələdə işləyir.

- **`preCall`** payload-un klonunu yaradır, `system`, `messages`, `input` və
  `prompt` sahələrini (sadə sətir elementləri də daxil olmaqla) gəzir və
  `@/shared/utils/inputSanitizer` modulundakı `processPII()` funksiyasını sətir
  tipli `content`/`text` sahələrinə tətbiq edir. `PII_REDACTION_ENABLED=true`
  olduqda aşkarlanmış PII gedən payload-da redaktə edilir. Bu,
  `INPUT_SANITIZER_MODE` parametrindən asılı deyil (o yalnız prompt-injection
  siyasətinə nəzarət edir). Redaktə deaktiv olduqda çağırış aşkarlama saylarını
  qeyd edir, lakin məzmunu yenidən yazmır.
- **`postCall`** cavabı dərin klonlayır, `sanitizePIIResponse()` funksiyasını və
  Responses API formasının maskalayıcısını (`maskResponsesOutput` —
  `output_text` və `output[].content[].text` sahələrini əhatə edir) işlədir.
  Hər hansı redaktə baş verərsə, dəyişdirilmiş cavab orijinalı əvəz edir.

Guardrail heç vaxt bloklamır; yalnız annotasiya edir (`meta.detections`,
`meta.redacted`) və ya yenidən yazır.

#### Növə görə seçim, xüsusi nümunələr və aşkarlama sayğacları

**Dashboard → Settings → Security → PII masking** hansı məlumatların
maskalanacağını seçir. Bu, maskalamanı aktivləşdirmir: maskalama hələ də
`sorğu` üçün `PII_REDACTION_ENABLED`, cavab + SSE üçün isə
`PII_RESPONSE_SANITIZATION` vasitəsilə idarə olunur və hər ikisi ilkin olaraq
deaktivdir.

- **Növə görə seçim** — daxili identifikatorlar
  `src/shared/constants/piiTypes.ts` faylında (`PII_BUILTIN_TYPES`) sadalanır.
  Dəyər təyin edilmədikdə bütün növlər seçilir (bu parametr mövcud olmamışdan
  əvvəlki davranış). Sorğu mühərrikinin `ssn_us` nümunəsi `ssn`-ə uyğun gəlir.
  Şablonlar (Minimal, Standard, Financial, Brazilian, USA, GDPR, POPIA, Full)
  yalnız UI-dakı checkbox-ları doldurur.
- **GDPR və POPIA identifikatorları** — Aİ və Cənubi Afrikadakı şəxsi
  identifikatorları əhatə edən on iki daxili identifikator (aşağıdakı cədvəl).
  Onların regex-ləri, validatorları və yurisdiksiya teqləri həm cavab
  təmizləyicisinin (`src/lib/piiSanitizer.ts`), həm də sorğu
  maskalayıcısının (`src/shared/utils/inputSanitizer.ts`) istifadə etdiyi
  `src/shared/utils/piiPatterns.ts` faylındakı vahid cədvəldə yerləşir.
  Uyğunluq yalnız validator onu qəbul etdikdə redaktə edilir; rəqəmlərdən ibarət
  sadə ardıcıllıq heç vaxt kifayət deyil. Bu identifikatorlar mövcud olmamışdan
  əvvəl seçimlərini daraldaraq saxlamış operator yeni identifikatorları seçənə
  qədər əvvəlki davranışı saxlayır.
- **Xüsusi nümunələr** — ən çox 20 regex və ya wildcard nümunəsi (`*` = boşluq
  olmayan ən çox 64 simvol, `?` = bir simvol). Uyğunluqlar
  `[CUSTOM_REDACTED]` ilə əvəz edilir. Hər nümunə
  `src/shared/utils/piiCustomPatterns.ts` modulundakı
  `compilePiiCustomPattern()` funksiyasından keçir: uzunluq ən çox 500 simvol
  olmalı, bayraqlar `g i m s u` ilə məhdudlaşmalı, nümunə kompilyasiya edilməli,
  `safe-regex` yoxlamasından (katastrofik backtracking) keçməli və boş sətirə
  və ya redaktə placeholder-inə uyğun gəlməməlidir. Uğursuz nümunə yadda
  saxlanılarkən və sınaqdan keçirilərkən rədd edilir, saxlanılmış və uğursuz
  olan sətir isə iş vaxtında kompilyasiya edilmədən ötürülür. Xüsusi nümunələr
  yalnız maskalama aktiv olduqda işlədilir.
- **Aşkarlama sayğacları** — növ üzrə saylar (heç vaxt uyğun gələn dəyərlər
  deyil) yaddaşda saxlanılır və restart zamanı sıfırlanır
  (`src/lib/pii/piiDetectionStats.ts`). Onlar yalnız maskalama aktiv olduqda
  artır.

Parametrlər `key_value` cədvəlində (`pii_settings` namespace-i,
`src/lib/db/piiSettings.ts`) saxlanılır və 1 saniyəlik keş vasitəsilə oxunur.
API:

| Method | Path                     | Purpose                                                                                  |
| ------ | ------------------------ | ---------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Bayraq vəziyyəti, `enabledTypes`, `customPatterns`, aşkarlama sayğacları                 |
| `PUT`  | `/api/settings/pii`      | `enabledTypes` (`null` = hamısı) və/və ya `customPatterns` dəyərlərini əvəz edir         |
| `POST` | `/api/settings/pii/test` | Ən çox 8 KB ölçüsündə nümunə üzərində bir pattern-i sınaqdan keçirir; heç nə saxlanılmır |

Bu üç endpoint-in hamısı idarəetmə autentifikasiyası tələb edir və gövdəni Zod ilə yoxlayır
(`src/shared/validation/schemas/piiSettings.ts`). Giriş deaktiv edildikdə
(`requireLogin=false`) `GET` və test endpoint-i açıq olur, lakin `PUT` hələ də
dashboard sessiyası, `manage` əhatə dairəli API açarı, yazma əhatə dairəsi və ya daha
yüksək səviyyəyə malik `oma_` access token-i, yaxud loopback-dən göndərilən CLI token-i
və ya daxili xidmət token-i tələb edir.

#### GDPR (Aİ) və POPIA (Cənubi Afrika) identifikatorları

| Id                  | Identifier                    | Validation                                                                           |
| ------------------- | ----------------------------- | ------------------------------------------------------------------------------------ |
| `iban`              | IBAN                          | Tanınmış ölkə, həmin ölkə üçün dəqiq uzunluq, ISO 13616 MOD-97-10                    |
| `eu_vat`            | Aİ ƏDV nömrəsi                | Tanınmış üzv dövlət prefiksi və həmin dövlətin nömrə formatı (VIES axtarışı yoxdur)  |
| `es_dni_nie`        | İspan DNI / NIE               | Nəzarət hərfi (qiymət mod 23); NIE `X/Y/Z` + 7 rəqəmdir                              |
| `it_codice_fiscale` | İtaliya Codice Fiscale        | Tək/cüt mövqe cədvəllərindən hesablanan nəzarət hərfi                                |
| `pl_pesel`          | Polşa PESEL                   | Çəkili yoxlama cəmi və mövcud olan kodlaşdırılmış doğum tarixi                       |
| `nl_bsn`            | Niderland BSN                 | 11 yoxlaması (9..2, -1 çəkiləri)                                                     |
| `de_steuer_id`      | Alman Steuer-ID               | ISO 7064 Mod 11,10 və rəqəm strukturu qaydaları (ilk rəqəm 0 ola bilməz)             |
| `se_personnummer`   | İsveç personnummer            | Son on rəqəm üzərində Luhn və məntiqli doğum tarixi (10 və ya 12 rəqəm)              |
| `za_id`             | Cənubi Afrika ID nömrəsi      | Bütün 13 rəqəm üzərində Luhn, etibarlı doğum ayı/günü, vətəndaşlıq rəqəmi 0 və ya 1  |
| `za_phone`          | Cənubi Afrika telefon nömrəsi | `+27` / `27` prefiksi və ya boşluq və ya defislə yazılmış milli `0..` forması        |
| `za_vat`            | Cənubi Afrika ƏDV nömrəsi     | `4` ilə başlayan 10 rəqəm **və** ondan əvvəlki 48 simvolda "VAT" / "BTW"             |
| `za_tax_ref`        | Cənubi Afrika vergi istinadı  | `0`-`3` ilə başlayan 10 rəqəm, Luhn, **və** ondan əvvəlki 48 simvolda "tax" / "SARS" |

Yalnız rəqəmlərdən ibarət formatlar sifariş nömrələri, build nömrələri və
vaxt damğaları ilə toqquşduğuna görə, ən zəif olanlar (`za_vat`, `za_tax_ref`)
açar söz siqnalı tələb edir və ayrıca yazılmış onrəqəmli `0..` nömrəsi Cənubi Afrika
telefon nömrəsi kimi qəbul edilmir. Boşluqlu IBAN-lar (`GB29 NWBK ...`) uyğunlaşdırılmır.
Axın yolu üzrə siqnal yalnız cari hissənin daxilində axtarılır. ID-lər ümumi telefon
pattern-lərindən əvvəl yerləşir, buna görə də yoxlanılmış identifikator öz placeholder-ını
saxlayır
(`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). `gdpr` və `popia` şablonları müvafiq olaraq
Aİ və Cənubi Afrika ID-lərini seçir. Maskalama özü opt-in olaraq qalır (Sərt Qayda #20):
buradakı heç nə feature-flag defoltunu dəyişmir.

### Prompt Injection (`promptInjection.ts`)

İstifadəçi tərəfindən təqdim olunan məzmunda rəqib strukturları aşkarlayır və
konfiqurasiya edilmiş siyasəti tətbiq edir. Davranış mühit dəyişənləri və konstruktor
seçimləri ilə idarə olunur:

| Setting        | Env var                                                                                               | Default | Effect                                                                                                                                                                                                          |
| -------------- | ----------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aktivdir       | `INPUT_SANITIZER_ENABLED`                                                                             | `true`  | `false` olduqda qoruyucu mexanizm qısa dövrə ilə dayandırılır.                                                                                                                                                  |
| Rejim          | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`  | Injection siyasəti: `block`, `warn` və ya `log`. (`redact` geriyə uyğunluq üçün qəbul edilir, lakin injection mətnini silmir; sorğudakı PII yenidən yazılması `PII_REDACTION_ENABLED` tərəfindən idarə olunur.) |
| Bloklama həddi | `blockThreshold` seçimi / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Bloklama üçün tələb olunan minimum ciddilik səviyyəsi. Defolt olaraq orta səviyyə yalnız müşahidə edilir.                                                                                                       |

**Rejim prioriteti** (`getMode`): çağıranın `options.mode`-u →
`INJECTION_GUARD_MODE` **DB feature-flag override-ı** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Buna görə dashboard override-ı env dəyişənlərindən üstün gəlir və Feature
Flags UI işləyən qoruyucu mexanizmi canlı şəkildə idarə edir (yenidən başlatma
tələb olunmur). DB oxunması fail-safe davranır: xəta baş verərsə, qoruyucu mexanizm
env əsaslı davranışa qayıdır və heç bir override təyin edilmədikdə davranış yalnız
env əsasında həll ilə eyni olur.

Aşkarlama mənbələri:

1. `sanitizeRequest()` from `@/shared/utils/inputSanitizer` (pipeline-da başqa
   yerlərdə istifadə olunan ümumi detektor dəsti).
2. Daxili `DEFAULT_GUARD_PATTERNS` (`system_override_inline` və
   `markdown_system_block`, hər ikisi `high` ciddilik səviyyəsində).
3. Konstruktor seçimləri vasitəsilə ötürülən ixtiyari `customPatterns` (sətirlər,
   regex və ya `{ name, pattern, severity }` qeydləri).

`mode === "block"` olduqda **və** ən azı bir aşkarlama ciddilik həddinə
uyğun gəldikdə, `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }` qaytarır. `warn`/`log` rejimlərində qoruyucu
mexanizm qeydə alır, lakin çağırışa icazə verir. Ümumi
`evaluatePromptInjection()` köməkçisi də reyestrdən keçmədən promptları
qiymətləndirməyə ehtiyacı olan çağırışçılar üçün ixrac olunur.

**Skan həddi (v3.8.20):** detektor birləşdirilmiş prompt mətninin yalnız
**ilk 16 KB** hissəsini yoxlayır — `MAX_INJECTION_SCAN_BYTES = 16 * 1024`
(16 384 bayt) `src/shared/utils/inputSanitizer.ts` faylında müəyyən edilir.
Həm `detectInjection()`, həm də `evaluatePromptInjection()` pattern dövrünü
işə salmazdan əvvəl `slice(0, MAX_INJECTION_SCAN_BYTES)` tətbiq edir.
İnyeksiya direktivləri girişin başlanğıcına yaxın yerləşir, buna görə bu hədd
bir neçə yüz KB-lıq yüklərdə regex CPU/GC xərclərini artırmadan aşkarlamanı
zəiflətmir (bax: #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Hər iki mərhələdə, standart zəncirin sonunda (prioritet `95`) işləyir. Gedən
yükdə (mesaj məzmunu, alət çağırışının arqumentləri, alət nəticələri) **və**
provayder cavabında məlum API açarı / məxfi token pattern-lərini redaktə edir;
beləliklə prompta əlavə edilmiş (və ya alət nəticəsi tərəfindən geri qaytarılmış)
məlumat provayderə göndərilərkən və ya müştəriyə qaytarılarkən sızmır.

- **Yalnız aktivləşdirildikdə işləyir**, PII redaksiyası ilə eyni konvensiyadan
  istifadə edir (Hard Rule #20-yə yaxın): yalnız
  `settings.credentialRedactionEnabled === true` **və ya**
  `CREDENTIAL_REDACTION_ENABLED=true` olduqda aktivdir. Söndürülü olduqda
  qoruyucu mexanizm heç nə etmir — heç vaxt bloklamır və heç nəyi yenidən
  yazmır.
- `redactCredentials()` bütün yük/cavab ağacını (`walkValue()`,
  prototip çirkləndirilməsinə qarşı təhlükəsiz, `WeakSet` vasitəsilə
  dövrələrə qarşı təhlükəsiz) gəzir və uyğunluqları `[REDACTED:<type>]`
  yer tutucusu ilə əvəz edir; yalnız həqiqətən dəyişmiş budaqları klonlayır.
- `CREDENTIAL_PATTERNS` LLM provayder açarlarını (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokenlərini (GitHub,
  Slack, Linear, Notion, npm, Postman, Discord), ödəniş açarlarını (Stripe,
  Square), bulud açarlarını (AWS access key, Twilio, SendGrid, Mailgun), məxfi
  açarları / JWT-ləri, etimadnamə daşıyan bağlantı sətirlərini
  (`mongodb://user:pass@...` və s.) və ümumi
  `Authorization`/`x-api-key`/`api-key`/`apikey` başlıq-dəyəri pattern-ini
  əhatə edir. Başlıq formasında olan açarlar (`authorization`, `x-api-key`,
  `api-key`, `apikey`) ümumi mətn regex-i ilə deyil, struktur üzrə (yalnız dəyər;
  `Bearer `/`Basic ` kimi sxem prefiksi saxlanılmaqla) redaktə edilir.
- Qoruyucu mexanizm heç vaxt bloklamır; yalnız yenidən yazır
  (`modifiedPayload` / `modifiedResponse`) və annotasiya əlavə edir
  (`meta.credentialsRedacted`, `meta.count`).

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
