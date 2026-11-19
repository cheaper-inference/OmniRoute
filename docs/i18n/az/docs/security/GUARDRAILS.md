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

### Vision Bridge (`visionBridge.ts`) — Modallıq körpüsü PR-1

GLM 5.3 baza modeli və `glm-5.3-{low,high,max}` modellərinin reyestr/spec metadatasında açıq şəkildə
`supportsVision:false` göstərilir. GLM 5.3 Flash variantları isə yerli vision modelləri olaraq qalır. Claude Code-un
`/v1/messages` marşrutu Claude-dan OpenAI-yə tərcümədən **əvvəl** paylaşılan `handleChat` pre-call qoruyucu mexanizmlər zəncirinə daxil olur; iç-içə yerləşən
`Read` alət nəticəsi şəkilləri OpenAI `image_url` məzmununa çevrilməzdən əvvəl təsvir edilməli və ya işlənməlidir (#17069).

**Vision** dəstəyi olmayan modellərə yönəlmiş şəkil daşıyan sorğuları tutur və ya bütün sorğunu vision dəstəyi olan modelə yönləndirir, yaxud upstream çağırışından əvvəl şəkil hissələrini konfiqurasiya edilə bilən vision modeli tərəfindən yaradılan mətn təsvirləri ilə əvəz edir. Bu, yalnız mətnlə işləyən provayderlərin multimodal payload-ları şəffaf şəkildə emal etməsinə imkan verir.

Axın:

1. Hədəf model artıq vision dəstəyinə malikdirsə, buraxılır (`isVisionBridgeForcedModel` məcburi körpü siyahısında görünməsi istisna olmaqla).
2. Şəkil hissələrini `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`) vasitəsilə çıxarır; bu funksiya **vahid media detektoruna** `open-sse/utils/mediaParts.ts` daxilindəki `detectMediaParts()`-a delegasiya edir — combo uyğunluq filtri ilə paylaşılan yeganə həqiqət mənbəyinə.
   Çıxarma yalnız `replaceImageParts` funksiyasının geri yerləşdirə biləcəyi formalara icazə verir (extract↔replace müqaviləsi): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` və Responses API `input_image`. Claude Code
   `tool_result.content` daxilində və Responses alət çıxışlarında iç-içə yerləşən uyğun şəkillər də çıxarılır və ilkin yollarında əvəz olunur; yalnız indikator xarakterli formalar combo-filtr materialıdır və çıxarılmır.
   Heç biri tapılmadıqda buraxılır.
3. İşləmə zamanı konfiqurasiyanı `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`) vasitəsilə həll edir: yeni `modalityBridge*` parametr açarları üstünlük qazanır; köhnə `visionBridge*` açarları bir dövr ərzində **ehtiyat variantı** olaraq saxlanılır (geri qaytarma pəncərəsi). Körpü deaktiv edilibsə, media üzərində hər hansı keçid edilməzdən əvvəl buraxılır.
4. Rejim seçicisi (`modalityBridgeVisionMode`, aşağıdakı cədvələ baxın) yenidən yönləndirmə ilə təsvir etmə arasında seçim edir. Yenidən yönləndirmə yalnız `model` sahəsi dəyişdirilmiş `modifiedPayload` və `{ rerouted, fromModel, toModel, imagesKept }` metadatasını qaytarır.
5. Təsvir yolunda şəkilləri `maxImages` ilə məhdudlaşdırır, tapşırıqdan xəbərdar prompt tərtib edir, təsvir keşinə müraciət edir, vision modelini **paralel şəkildə** çağırır
   (`Promise.allSettled`) və onların yerinə `[Image N]: <description>` mətn hissələrini əlavə edir. Uğursuz təsvir `null` qaytarır: xam şəkil naməlum və ya vision dəstəyi olan hədəflər üçün qorunur (#4012), lakin **təsdiqlənmiş yalnız-mətnli birbaşa hədəf** və ya sıfır-vision-lu combo üçün təsvir edilməmiş hər bir şəklə, qismən uğursuzluqlar və təsvir çağırışı limitini aşan şəkillər də daxil olmaqla, açıq
   `(unavailable — no vision-capable provider connected)` mətn stubu əlavə edilir (#17069). Tamamilə uğursuz combo təsviri üçün mövcud ehtiyat davranış saxlanılır (#8430).
6. `modifiedPayload` və meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`) qaytarır.

#### Rejim seçicisi (`modalityBridgeVisionMode`)

| Rejim      | Standart | Davranış                                                                                                                                                                                                                                                                                                                 |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔        | Köhnə evristika olduğu kimi saxlanılır (#6640/#7204): combo olmayan/`auto/` modellər ən yaxşı vision modelinə yönləndirilir, ilkin modelin istifadə edilə bilən kredensialları olmadıqda (bu halda təsvir edilir); combo hədəfləri isə həmişə təsvir edilir.                                                             |
| `describe` |          | Həmişə təsvir edir — yenidən yönləndirmə bloku tamamilə ötürülür; istifadəçinin seçdiyi model həmişə cavab verir.                                                                                                                                                                                                        |
| `reroute`  |          | Yenidən yönləndirməni məcbur edir: kredensialı olan modeli qoruma yoxlaması yan keçilir. Yenidən yönləndirmə-**hədəfi** kredensial yoxlaması isə yenə tətbiq olunur — istifadə edilə bilən vision hədəfi olmadıqda körpü aydın xəta ilə bloklayır, təsvir etmir və xam şəkilləri yalnız mətnlə işləyən hədəfə göndərmir. |

Məcburi rejimlər `auto` evristikası işə düşməzdən **əvvəl** qısa yol ilə seçilir; `auto` davranışı PR-1-dən əvvəlki qoruyucu mexanizmlə bayt səviyyəsində eynidir.

#### API açarının əhatə dairəsi (`visionBridgeKeyScope.ts`)

Çağıranın API açarı `allowedConnections`, kvota hovuzlarını
(`allowedQuotas`) və ya modelləri (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`) məhdudlaşdırdıqda, körpü yalnız
açarın istifadə edə bildiyi bağlantılarda, açarın istifadə edə bildiyi yenidən
yönləndirmə və təsvir modellərini seçir. Təsvir çağırışı daha sonra həmişə
`x-omniroute-self-loop-key-id` başlığı ilə OmniRoute öz-dövrəsi üzərindən keçir;
beləliklə, qəbul edən çat sorğusu həmin açarın bağlantı və model siyasətini yenidən
tətbiq edir. `enforceApiKeyPolicy()` bu başlığı yalnız öz-dövrə bearer-i ilə birlikdə
qəbul edir; buna görə də başlıq yalnız girişi daralda bilər və həll olunmayan
identifikator rədd edilir.

Açar üçün heç bir görmə modelinə icazə verilmədikdə, **təsdiqlənmiş yalnız mətn
hədəfi** şəkil sorğusunu lokal olaraq aydın HTTP 400 xətası ilə rədd edir və şəkil
baytlarını imkanları olmayan yuxarı axına yönləndirmir (#17069). Naməlum və ya
doğma görmə imkanlarına malik hədəflər üçün təsvir yolu əvvəlki fail-open
davranışını saxlayır (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Açarsız sorğular və bu məhdudiyyətlərə malik olmayan açarlar əvvəlki kimi tam
eyni davranır.

#### Tapşırıqdan xəbərdar təsvir sorğusu (`modalityBridgeVisionTaskAware`)

Defolt dəyər **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) baza
təsvir sorğusuna **son istifadəçi mesajının** mətnini (500 simvolla
məhdudlaşdırılmış) əlavə edir; bu, təsviri istifadəçinin əslində soruşduğu mövzuya
yönəldir (codex-vision-proxy nümunəsi) və görmə modelindən görünən mətni
transkripsiya etməyi xahiş edir. Bayraq söndürüldükdə — və ya istifadəçi mətni
olmadıqda — baza sorğusu dəyişdirilmədən istifadə olunur.

Təsvir öz-dövrəsinin OpenAI-uyğun sorğusu (`visionBridgeHelpers.ts` daxilindəki
`callVisionModelSingle()`) həmişə `image_url.detail: "high"` tələb edir —
bütün çağıranlar/təchizatçılar üçün qeyd-şərtsiz və heç bir müştəri siqnalından
asılı olmadan. Aşağı təfərrüatlı nümunələndirmə bu sorğunun istədiyi məhz mətn
transkripsiyası tapşırığı üçün OCR dəqiqliyini pisləşdirir; buna görə təsvir
çağırışı ilkin daxil olan sorğuda hansı təfərrüat səviyyəsindən istifadə
edilməsindən asılı olmayaraq həmişə yüksək təfərrüat tələb edir. Bu yalnız daxili
təsvir sorğusunun gövdəsinə təsir edir; OmniRoute-un çağıranın öz
`image_url.detail` parametrini əsas sorğuda necə yönləndirməsini dəyişmir — həmin
defolt ayrıca və yalnız aşkarlanmış OpenCode müştəriləri üçün
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`) daxilində
tətbiq edilir. Təsvir öz-dövrəsinin Anthropic naqil formatı budağında `detail`
sahəsi yoxdur və hər iki defoltdan təsirlənmir.

#### Təsvir çıxışının həddi (`modalityBridgeVisionMaxChars`)

| Açar                           | Defolt | Aralıq              |
| ------------------------------ | ------ | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` və ya 100–50000 |

`0` (defolt) **heç bir həddin olmaması** deməkdir — `callVisionModel()` tərəfindən
qaytarılan təsvir dəyişdirilmədən ötürülür və mövcud davranış qorunur. 100–50000
aralığındakı istənilən dəyər təsvirə `[Image N]: <description>` kimi yenidən
əlavə edilməzdən əvvəl onu `…` sonluğu ilə kəsir
(`src/lib/guardrails/visionBridge.ts` daxilində `VisionBridgeGuardrail.preCall()`).
Aşağı axın modelinin tam transkripsiyaya ehtiyac duyduğu, təfərrüat yönümlü OCR
tapşırıqları üçün bu dəyəri artırın; çox danışan görmə modellərində token
istifadəsini məhdudlaşdırmaq üçün azaldın. İdarə panelindəki sahə Vision
vərəqəsinin Advanced panelində yerləşir
(`ModalityBridgeVisionTab.tsx` daxilində `modality-bridge-max-chars`) və 1 ilə 99
arasındakı istənilən dəyəri 100 həddinə qədər qaldırır, açıq şəkildə verilmiş `0`
dəyərini isə olduğu kimi saxlayır — `0` sadəcə “təyin edilməyib” defoltu deyil,
öz-özlüyündə etibarlı Zod dəyəridir
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`).

#### Təsvir keşi (`modalityBridge/bridgeCache.ts`)

Təsvir çıxışları üçün proses miqyasında paylaşdırılan, yaddaşdaxili LRU + TTL
keşidir. Açar uzunluq prefiksi çərçivələməsi ilə
`sha256(imageRef + composedPrompt + configuredBridgeModel)` kimi hesablanır
(sahə sərhədlərinin toqquşması yoxdur). Model komponenti faktiki cavabı verən
model deyil, **konfiqurasiya edilmiş** körpü modelidir —
`callVisionModel` daxildə ehtiyat modelə keçə bilər və hər cəhd üzrə açar yaratmaq
keşi parçalayardı. Uğursuz təsvirlər heç vaxt keşlənmir. Parametrlər:

| Açar                            | Defolt | Aralıq  |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Uzaq şəkillərin normallaşdırılması (öz-dövrə təsviri/base64 gətirilməsi)

Körpü **uzaq** şəkli özü gətirdikdə — həm Anthropic təsvir öz-çağırışında, həm də
claude naqil formatına base64 çevrilməsində
(`ensureBase64ImagesForClaudeWire`), hər ikisi `visionBridgeHelpers.ts`
daxilindəki `fetchRemoteImageAsDataUri()` vasitəsilə — nəticədə yaranan data URI
görmə-modeli sorğusuna daxil edilməzdən əvvəl `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) funksiyasından keçirilir. Həddən böyük
şəkillər **2048px uzun kənara** qədər kiçildilir (OpenAI/Anthropic-in server
tərəfində artıq tətbiq etdiyi ölçü həddinə uyğun olaraq); bu, görmə modelinin
gördüyü məzmunu dəyişmədən yükləmə baytlarını/gecikməsini azaldır.
Ölçüləndirmə dinamik import vasitəsilə yüklənən `sharp` istifadə edir: onun yerli
binari faylı platformada yüklənə bilmədikdə `normalizeDataUri()` **heç vaxt xəta
atmayır** — ilkin baytların olduğu kimi ötürüldüyü rejimə keçir; beləliklə,
təsvir/base64 çevirmə yolu həmişə işlək qalır. Şəkil olmayan baytlar (dekodlana
bilən şəkil qaytarmayan gətirmə əməliyyatı) da toxunulmadan ötürülür. Bu
normallaşdırma yalnız körpünün öz çağırışı üçün gətirdiyi şəkillərə tətbiq edilir —
opsional seçimlə aktivləşdirilən dəyişiklik prinsipinə (Sərt Qayda #20) uyğun
olaraq, çağıranın xam ötürmə yükünə heç vaxt tətbiq edilmir.

#### Parametrlər sxemi + miqrasiya

Yeni `modalityBridge*` açarları
(`src/shared/validation/settingsSchemas.ts` daxilindəki `updateSettingsSchema`-da)
Zod ilə yoxlanılır: `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, `modalityBridgeCache*` üçlüyü və Audio Bridge
tərəfindən istifadə olunan `modalityBridgeAudio*` qrupu. `141_modality_bridge_settings.sql`
miqrasiyası mövcud köhnə `visionBridge*` dəyərlərini uyğun yeni açarlara köçürür
(idempotentdir və operator tərəfindən təyin edilmiş `modalityBridge*` dəyərinin
üzərinə heç vaxt yazmır); köhnə açarlar bir buraxılış dövrü ərzində oxuma
ehtiyat variantı kimi qəbul edilməyə davam edir.

#### Şəffaflıq başlığı + statistika

Təsvirlə çevrilmiş cavablar
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
başlığını daşıyır (`modalityBridge/bridgeStats.ts` daxilindəki
`buildModalityBridgeHeader()` tərəfindən yaradılır və
`src/sse/handlers/chatHelpers.ts` daxilindəki `withModalityBridgeHeader()`
tərəfindən əlavə edilir). Yenidən istiqamətləndirilmiş sorğular heç bir başlıq
almır — faydalı yük dəyişdirilməyib və model dəyişikliyi cavab gövdəsindəki
`model` sahəsində artıq görünür.

`GET /api/modality-bridge/stats` (idarəetmə autentifikasiyası ilə,
`GET /api/settings` ilə eyni səviyyədə) `vision`, `audio` və `video` üçün
yaddaşdaxili modallıq başına sayğacları
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` qaytarır.
`averageLatencyMs` məxrəc kimi bütün cəhdlərdən deyil, `latencySamples`-dan
istifadə edir; vaxt ölçümü olmayan əməliyyat sıfır millisaniyəlik nümunə
uydurmur. `bridged` uğurlu çevirmələr üçün geriyə uyğun təxəllüs olaraq qalır;
uğursuz cəhdlər onu artırmır.
Sayğaclar dizayn üzrə proses yenidən başladıldıqda sıfırlanır
(uçot deyil, telemetriyadır).

#### İdarə panelinin konfiqurasiyası

Xüsusi idarə paneli səhifəsi
`/dashboard/settings/modality-bridge` ünvanındadır. URL ilə ünvanlana bilən
`Vision`, `Audio` və `Video` tabları `tab` dəyərini dəyişərkən sorğu
parametrlərini qoruyur. Vision tabı aktivləşdirməni, rejimi, model seçimini
(avtomatik standart seçim daxil olmaqla), tapşırıqdan xəbərdar prompt
yaradılmasını, inkişaf etmiş timeout/şəkil/təsvir uzunluğu/cache limitlərini,
işləmə zamanı sayğaclarını və qorunan nümunə sorğusunu təqdim edir. Audio tabı
da artıq işləkdir: burada aktivləşdirmə, Auto seçimi olan yalnız STT üçün model
seçicisi, timeout/maksimum klip limitləri, audio sayğacları və
`input_audio` nümunə testi təqdim olunur. Video tabı işləkdir: FFmpeg/ffprobe
işləmə mühitinin vəziyyətini — dörd açıq UI vəziyyətindən birini — göstərir
(probe davam edərkən və ya tamamlana bilmədikdə `unknown`, probe müştəri
tərəfindən buraxıldığı loopback olmayan idarə paneli hostunda `restricted`,
probe edildikdən və çatışmadığı təsdiqləndikdən sonra `unavailable`, FFmpeg/
ffprobe versiyaları ilə birlikdə `available`) və enable/model/frame/video/
timeout limitlərini saxlayır, model seçicisini görmə qabiliyyətinə malik
modellərlə məhdudlaşdırır və video sayğaclarını təqdim edir.

AI settings altındakı əvvəlki Vision Bridge kartı yeni səhifəyə uyğunluq
keçididir; artıq formanın ikinci nüsxəsinə sahib deyil. Media Providers də
mövcud Speech-to-Text playground-ını silmədən Image-to-Text və Speech-to-Text
iş axınlarını uyğun Modality Bridge tablarına yönləndirir.

**Özünə dövrə qoşulma qəbulundan yan keçmə:** təsvir çağırışı OmniRoute-un
öz `/v1` self-loop-u üzərindən (standart olmayan provider modeli ilə)
yönləndirildikdə, alt sorğu `x-omniroute-admission-bypass: internal`
göndərir və həll edilmiş self-loop kredensialı ilə autentifikasiya olunur —
lokal rejimdə yerli `sk_omniroute` sentineli, yaxud operator tərəfindən
konfiqurasiya edilmiş `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` mühit açarı
(#1350); beləliklə, `REQUIRE_API_KEY=true` ilə işləyən deployment-lar da
təsvir çağırışını icra edə bilir. Bu yan keçmə yalnız həmin dəqiq
kredensiallar üçün qəbul olunur; buna görə xarici müştərilər qəbul
yoxlamasından yayınmaq üçün başlıqdan istifadə edə bilməz.

Köhnə standartlar `src/shared/constants/visionBridgeDefaults.ts` daxilində
yerləşir; yeni rejim/tapşırıqdan xəbərdar/cache standartları və settings
resolver-i `src/shared/constants/modalityBridgeDefaults.ts` daxilindədir.
Qoruyucu mexanizm testlərin saxta `getSettings` və `callVisionModel`
implementasiyalarını daxil edə bilməsi üçün `deps` konstruktor seçimini təqdim
edir.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Audio daşıyan çat sorğularını audio girişini qəbul etdiyi məlum olmayan hədəfə
çatmazdan əvvəl ələ keçirir. Çat sorğusunu heç vaxt yenidən yönləndirmir:
audio hissələri mövcud OpenAI-uyğun multipart endpoint vasitəsilə mətnə
çevrilir və seçilmiş çat modeli mətn transkriptləri ilə işini davam etdirir.

Axın:

1. `supportsAudio` dəyərini `getResolvedModelCapabilities()` vasitəsilə müəyyən edin. Əvvəlcə provider reyestrinin açıq metadatası, sonra statik model metadatası, daha sonra isə sinxronlaşdırılmış `modalities_input` nəzərə alınır. `audio` olmadan elan edilmiş giriş siyahısı `false` deməkdir; heç bir imkan sübutu qalmadıqda nəticə `null` olur. Həm `false`, həm də `null` konservativ körpünü aktivləşdirir, `true` isə onu yan keçir.
2. `modalityBridgeAudio*` parametrlərini müəyyən edin və hər mesajdakı splice edilə bilən üst səviyyəli audio hissələrini ümumi `detectMediaParts()` detektoru vasitəsilə çıxarın. Dəstəklənən wire formaları OpenAI `input_audio`, `audio_url` və `source.media_type: "audio/*"`-dır. İç-içə audio marşrutlaşdırma üçün aşkar edilir, lakin splice yolu ilə silinmir. İş `modalityBridgeAudioMaxClips` ilə məhdudlaşdırılır; sonrakı hissələr toxunulmaz qalır.
3. Konfiqurasiya edilmiş `provider/model` dəyərinə üstünlük verin və ya `selectAudioBridgeModel()` funksiyasına `AUDIO_TRANSCRIPTION_PROVIDERS` siyahısını sabit kataloq sırası ilə gəzməyə və istifadəyə yararlı aktiv provider kredensialına malik ilk modeli seçməyə icazə verin.
4. `callAudioTranscription()` base64/data-URI formatlı audionu multipart `file` obyektinə çevirir və ya uzaqdakı `audio_url` ünvanını DNS pinləməsi və 25 MB limiti olan yalnız ictimai ünvanlara icazə verən outbound qoruması vasitəsilə endirir. Daha sonra faylı və seçilmiş modeli `resolveSelfLoopBearer()` ilə autentifikasiya edilən lokal `/v1/audio/transcriptions` self-loop ünvanına POST edir. Mövcud transkripsiya marşrutu adi kredensial axtarışını, cooldown/rate-limit emalını və provider göndərişini həyata keçirir.
5. Uğurlu çağırışlar öz hissələrini `[Audio N]: <transcript>` ilə əvəz edir. Çağırışlar `Promise.allSettled` ilə icra olunur: ayrı-ayrı uğursuzluqlar həmin orijinal audio hissəsini saxlayır (#4012 müqaviləsi). Bütün çağırışlar uğursuz olarsa və hədəfin `supportsAudio === false` olduğu sübut edilərsə, hissələr
   `[Audio N]: (unavailable — no STT provider connected)` formasını alır (#8430 müqaviləsi). Naməlum hədəf (`null`) üçün bütün nəticələrin uğursuz olması halında məzmun toxunulmaz qalır. Yalnız mətn qəbul edən və istifadəyə yararlı STT kredensialı olmayan sübut edilmiş hədəf də şəbəkə çağırışı edilmədən eyni açıq stub mətnini alır.

Uğurlu transkripsiyalar proses üzrə ümumi Modality Bridge LRU/TTL keşindən istifadə edir. Açar audio istinadını, sabit `audio-transcription` əməliyyat etiketini və seçilmiş STT modelini birləşdirir; uğursuzluqlar heç vaxt keşlənmir. Audio cəhdləri ümumi `bridged`, `cacheHits`, `failures` və `lastUsedAt` sayğaclarını yeniləyir. Transformasiya edilmiş cavablara
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` başlığı əlavə olunur; toxunulmamış sorğular Audio Bridge seqmenti almır.

İşləmə parametrləri DB-də saxlanılır və Zod ilə yoxlanılır:

| Açar                          | Standart | Aralıq            |
| ----------------------------- | -------- | ----------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                 |
| `modalityBridgeAudioModel`    | `""`     | Auto və ya STT ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000       |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10              |

Ümumi keş `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` və `modalityBridgeCacheMaxEntries` parametrləri ilə idarə olunmağa davam edir.

### Video Körpüsü (`videoBridge.ts`, `videoBridgePipeline.ts`)

Chat Completions `messages` və Responses API `input` daxilindəki üst səviyyəli video hissələrini yerli video dəstəyi məlum olmayan hədəf çağırılmazdan əvvəl ələ keçirir. Dəstəklənən formalar `input_video`, `video_url`, `video_source`, HTTPS URL-ləri və `data:video/*;base64,...` data URI-ləridir. Mətn daxilindəki adi fayl adları video kimi qəbul edilmir.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) sorğunun keçilməsini, imkan/siyasət yoxlamasını, sorğu üzrə aqreqasiyanı və cavab yükünü idarə edir. Video üzrə iş — əldəetmə, bütün nəticənin keşlənməsi, kadr ardıcıllığının təsviri (çağıran tərəfindən elan edilmiş audio transkriptini birləşdirir) və hər cəhd üzrə metrikalar/abort/təmizləmə — `videoBridgePipeline.ts` daxilindəki `processVideoPart` funksiyasının arxasında gizlədilir və `preCall` dövrəsində hər video hissəsi üçün bir dəfə çağırılır. Həmin modul həmçinin açıq port sərhədlərini müəyyən edir: `VideoMediaBrokerPort` (baytların əldə edilməsi və seçilmiş kadrların çıxarılması), `VideoAudioTranscriptionPort` (çağıran tərəfindən elan edilmiş audio transkriptinin seçilmiş altyazılarla birləşdirilməsi) və `VideoDrilldownPort` (köhnə xam yaddaş forması). İstehsal STT-si və kadrların saxlanması `createVideoSttAdapter` və `createVideoDrilldownAdapter` vasitəsilə təsvir portunun ətrafında birləşdirilir; sonuncu ümumi qeyri-şəffaf tutacaq həyat dövründən istifadə edir.

İctimai `/v1` sorğu yolu heç vaxt subprocess idxal etmir və ya çağırmır. Uzaq videolar 50 MiB limiti altında endirilir; daxili base64 videolar üçün isə video başına konservativ 36 MiB dekodlaşdırılmış limit tətbiq olunur ki, model/mesaj/kadrlaşdırma zərfi 50 MiB-lıq ictimai JSON sorğusunun qəbul limitləri daxilində qala bilsin. Daxili uzunluq və dekodlaşdırılmış ölçü təxminləri ayırma əməliyyatından əvvəl yoxlanılır. İlkin uzaq URL və hər bir yönləndirmə üçün HTTPS tələb olunur; bunun üçün DNS pinləməsi olan mövcud yalnız ictimai ünvanlara icazə verən outbound qorumasından istifadə edilir. Daha sonra baytlar dəqiq daxili `POST /api/modality-bridge/video/extract` broker sərhədindən keçir. Bu marşrut həm `LOCAL_ONLY`, həm də `SPAWN_CAPABLE` xüsusiyyətlərinə malikdir, yalnız proses üzrə autentifikasiya edilmiş və etibarlı loopback sorğusunu qəbul edir və URL, fayl sistemi yolu, icra edilə bilən fayl və ya arqument siyahısını heç vaxt qəbul etmir. API gövdəsinin ölçüsü üzrə pipeline və handler-in artımlı gövdə oxuyucusu müstəqil şəkildə 50 MiB broker giriş limitini tətbiq edir. Onun məhdudlaşdırılmış növbəsi eyni anda bir çıxarma əməliyyatına imkan verir, dörd gözləyən işi qəbul edir və gözləyən girişləri 100 MiB ilə məhdudlaşdırır.

Broker daxilində `ffprobe` şəxsi lokal faylı oxuyur; sabit format
icazə siyahısından pleylist və manifest formatları çıxarılıb. İcazə verilən MOV
ailəsi konteynerləri üçün xarici MOV məlumat istinadları standart olaraq deaktiv
edilmiş vəziyyətdə qalır və sabit əmr onları aktivləşdirmir. Həm `ffprobe`, həm
də `ffmpeg` yalnız `file` protokoluna icazə verən siyahıdan, bir mövzudan,
sabit arqument massivlərindən və qabıqsız icradan istifadə edir; icra faylları
`PATH` əsasında həll olunur. Əlavə edilmiş şəkil-kadr üz qabığı axınları
oynadıla bilən namizədlər deyil. Oynadıla bilən bütün axınlar limitlərə cavab
verməlidir və deterministik ən aşağı indeksli ehtiyat seçimindən əvvəl açıq
şəkildə təyin edilmiş standart axına üstünlük verilir. Videolar 600 saniyə,
hər ölçü üzrə 8.192 piksel və 33.554.432 mənbə pikseli ilə məhdudlaşdırılır.
FFmpeg 1–16 ədəd orta nöqtə JPEG kadrı nümunələyir, daha kiçik girişləri
böyütmədən uzun kənarı ən çox 1.024 pikselə qədər kiçildir və heç vaxt URL
qəbul etmir. Nümunələmə standart olaraq `uniform`-dur. İxtiyari
`scene_aware` və eksperimental `segment_aware` siyasətləri artıq yoxlanılmış
lokal axın üzərində əlavə bir sabit FFmpeg keçidi icra edir, sərhədlənmiş
`showinfo` səhnə zaman nişanlarını seçir və detektor xətası, vaxt aşımı, səhv
formatlı çıxış və ya boş namizəd dəsti zamanı deterministik şəkildə eyni
vahid orta nöqtələrə qayıdır. Segment-əsaslı rejim orta nöqtə nümunələrini
yoxlanılmış səhnə intervallarına mütənasib şəkildə ayırır; segment-əsaslı
sübutlar və ehtiyat davranışı aşağıda ətraflı təsvir olunur. Sərt 16 kadr
limiti hər siyasətdə seçimdən sonra tətbiq edilir. Səhnə-əsaslı sorğunun
büdcəsi yalnız bir kadr olduqda, aktiv tam video və ya fokus pəncərəsinin
vahid orta nöqtəsindən istifadə edir və `policyEffective: uniform` bildirir:
seçilmiş tək səhnə kadrı həm zamanın başlanğıcını, həm də sonunu qoruya bilməz.
Çağıran tərəf istəyə görə sonlu fokus pəncərəsi (`start`/`end` saniyə)
verə bilər; sərhədlər medianın müddətinə uyğunlaşdırılır, tərs və ya sonlu
olmayan pəncərələr rədd edilir və bütün nümunələmə siyasətləri yalnız
normallaşdırılmış interval daxilində icra olunur. Nəticədəki pəncərə
nümunələmə metadatasına və etibarsız təsvir prefiksinə daxil edilir ki,
aşağı axındakı modellər fokuslanmış parçanı tam zaman xəttindən fərqləndirə
bilsin.

Semantik başlıq fokusu ayrıca, açıq şəkildə təyin edilən parametrdir.
Standart `full` təhlil rejimi mövcud kadr sorğusunu qoruyur və sorğu mətnini
heç vaxt başlıq modelinə ötürmür. `focused` rejimində körpü eyni Chat və ya
Responses konteynerindən yalnız ən son, boş olmayan, istifadəçi tərəfindən
yazılmış `text`/`input_text` dəyərini oxuyur, onu NFC-yə normallaşdırır,
idarəetmə simvollarını və boşluqları birləşdirir və onu 500 Unicode kod
nöqtəsi ilə məhdudlaşdırır. Boş nəticə dəqiq `full` sorğusuna qayıdır.
İstifadə edilə bilən ipucu ayrıca etibarsız istifadəçi konteksti blokunda JSON
kimi seriallaşdırılır və yalnız müşahidə edilə bilən detallara üstünlük verə
bilər; o, mediada görünən və ya eşidilən təlimatlara əməl etməyə qarşı ayrıca
xəbərdarlığı ləğv edə bilməz. Mətn fokusu heç vaxt `start`/`end` dəyərlərini
çıxarmır və zaman nümunələyicisini dəyişmir.

#### FU-07 struktur seqment sübutları

`segment_aware` artıq yoxlanılmış lokal video axını üzərində sərhədlənmiş bir
ilkin təhlil keçidindən istifadə edir. Sabit filtr zənciri əvvəlcə eni ən çox
320 pikselə qədər kiçildir, səhnə dəyişikliklərini və donmuş intervalları
aşkarlayır, sonra bulanıqlıq, orta luma və məkan/zaman məlumatı üçün saniyədə
1 kadr nümunələyir. Keçid 600 struktur nümunəsi, bir FFmpeg/filtr mövzusu,
eyni yalnız `file` protokolu və konteyner icazə siyahıları, 1 MiB proses çıxışı
limiti və brokerin ümumi dayandırma/müddət limiti daxilində ən çox 30 saniyə
ilə məhdudlaşdırılır. O, sorğudan heç vaxt əmr, filtr, yol və ya URL qəbul
etmir.

Struktur dəyərləri semantik video anlama deyil, deterministik nümunələmə
sübutudur. Onlar obyektləri, hərəkətləri, başlıqları, nitqi və ya istifadəçi
niyyətini çıxarmır. Səhnə və donma sərhədləri seqmentləri formalaşdırır;
donma əhatəsi, bulanıqlıq, ekspozisiya, məkan detalları və zaman dəyişkənliyi
yalnız mövcud 1–16 kadr büdcəsinin necə bölüşdürülməsinə təsir edir. Tamamilə
donmuş seqment üçün ən çox bir kadr ayrılır, donmamış seqmentlər isə qalan
büdcə uğrunda rəqabət aparır. Sərhədlərin sayı kadrların sayından çox olduqda,
sürətli ilkin kəsiklərin uzun son seqmenti gizlədə bilməməsi üçün zaman xətti
üzrə vahid əhatə saxlanılır. Donma sərhədinin 1 saniyəlik təhlil ayırdetmə
qabiliyyəti daxilində olan səhnə sərhədləri birləşdirilir.

Filtrlərin çatışmaması, səhv formatlı və ya boş sübut, detektor xətası və ya
sərhədlənmiş ilkin təhlil vaxt aşımı dəqiq vahid orta nöqtə siyasətinə açıq
şəkildə qayıdır. Çağıranın dayandırması və ya brokerin müddət limiti açıq
şəkildə geri qayıtma ilə nəticələnmir: uçuşda olan altprosesi dayandırır, sonrakı
kadr çıxarışının qarşısını alır və şəxsi müvəqqəti ağac `finally` daxilində
silinir.

`scripts/perf/video-bridge-fu07-eval.ts` deduplikasiyadan sonrakı başlıq
çağırışı qənaətləri, sıx hərəkət üçün büdcə bölgüsü, bulanıqlıq/ekspozisiya/SI-TI
sübutları, uzun son hissəsi olan sürətli kəsiklər və tədricən solma üzrə yanlış
müsbət nəticələr üçün deterministik real FFmpeg fixture-ləri yaradır. O, ilkin
təhlilin divar saatı müddətini və `/usr/bin/time` mövcud olduqda törəmə prosesin
CPU istifadəsini və pik RSS göstəricisini qeyd edir. Onun keyfiyyət yoxlamaları
yalnız struktur orakullarıdır. Bu harness-in icazə verilmiş son nöqtəsi və ya
sabit hakimi olmadığından, real başlıq modeli keyfiyyəti `HOLD` olaraq qalır.
`--caption-cost-per-call-usd` açıq şəkildə müsbət hər çağırış üçün təxmin
təqdim etmədikcə, pul qənaəti də `HOLD` olaraq qalır; skript bu nəticələrdən
heç birini uydurmur.

Hər kadr 4 MiB, bütün xam kadrlar birlikdə 23 MiB, seriyalaşdırılmış broker cavabı isə 32 MiB ilə məhdudlaşır. Şəxsi müvəqqəti kataloq `finally` daxilində silinir. OmniRoute FFmpeg-i paketə daxil etmir və fərdi icra faylı yolunu qəbul etmir. Başlıqlama prosesindən əvvəl bridge konservativ vizual deduplikasiya mərhələsi tətbiq edir: hər JPEG 16×16 ölçülü boz çalarlar buferinə endirilir və yalnız saxlanılmış son kadrla müqayisə olunur. Tələb olunan başlıq büdcəsi bir kadrdan çox olduqda, çıxarış həmin büdcənin iki mislinədək, lakin heç vaxt 16 kadrdan çox olmayan məhdud namizəd hovuzu təqdim edir. Tələb olunan limit yalnız dedupl ikasiyadan sonra tətbiq olunur; büdcə ən azı iki olduqda, son seyrəltmə zamanı ilk və son seçilmiş namizədlər saxlanılır. Versiyalı `grayscale-16x16-mean-cells-v2` siyasəti orta luma fərqi ilə normallaşdırılmış fərqi ən azı 0.05 olan miniatür hüceyrələrinin nisbətindən böyüyünü istifadə edir. Dublikat həddi icra zamanı dəyişdirilə bilən parametr kimi təqdim edilmək əvəzinə proqnozlaşdırıla bilməsi üçün seçilmiş 0.04 sabitidir. Bu ikinci yüksək kontrast siqnalı yalnız orta qiymətə əsaslanan müqayisənin gizlədə biləcəyi kiçik hərəkətləri və görünən mətn dəyişikliklərini qoruyur. Müqayisəçi və ya dekoder xətaları prosesi dayandırmadan əhatəliliyi saxlayır. Çıxış metadatası çıxarılmış namizədləri, uğurla istifadə olunmuş kadrları və atılmış vizual dublikatları ayrı göstərir.

Açıq şəkildə işarələnmiş video hissəsi zaman nişanlı kontakt vərəqi tələb edə bilər. Bridge ən çox 4 sütunlu, 16 kadrdan ibarət JPEG şəbəkəsi yaradır. Hər 512 piksel ölçülü xana öz mənbə zaman nişanını yüksək kontrastlı alt zolağa yazır; eyni zaman nişanları sonrakı əlaqələndirmə və audit üçün mətn metadatasında da saxlanılır. Tam JPEG 32 MiB ilə məhdudlaşdırılır. `sharp` şəbəkəni dekodlaşdıra və ya birləşdirə bilmədikdə, bridge ayrı-ayrı JPEG kadrlarına qayıdır; müştərinin abort etməsi vərəq əməliyyatı vasitəsilə ötürülür.

Promot­siya sübutları sintetik kompozisiya mikrobençmarkından qəsdən ayrı saxlanılır. `scripts/perf/video-bridge-contact-sheet-eval.ts` real OpenAI-uyğun görmə modelləri üçün sxem versiyalı A/B harness-i müəyyən edir. O, provayder tərəfindən bildirilən tokenləri, ucdan-uca divar saatı gecikməsini (vərəqin kompozisiyası daxil olmaqla), model çağırışlarının sayını və manifestdə müəyyən edilmiş faktların saxlanmasını ölçür. Xam model cavabları hesabata yazılmır; yalnız SHA-256 həzmləri və uyğunlaşdırılmış fakt identifikatorları saxlanılır. `--execute-real` ötürülmədikdə və `--model`, `OMNIROUTE_BASE_URL` və `OMNIROUTE_API_KEY` konfiqurasiya edilmədikdə harness heç bir şəbəkə və ya ödənişli model çağırışı etmir. Bu açıq real icra olmadan onun maşın tərəfindən oxuna bilən hökmü `HOLD` olaraq qalır; yalnız sintetik payload/çağırış sayı ölçmələri promot­siya sübutu sayılmır.

Ayrı `scripts/perf/video-bridge-promotion-eval.ts` FU-07 və ya FU-09 müşahidələrini qəbul edir. Promot­siya üçün uyğunluq bütün səkkiz sintetik ssenari növünü və sanitarlaşdırılmış real klipi, hər rol və hal üzrə ən azı üç ölçülmüş təkrarı, elan edilmiş bütün on metriyi, dəyişdirilməmiş media/prompt/gözlənilən-fakt/ayar həzmlərini, unikal müşahidə identifikatorlarını və yoxlanılmış toxumlu A/B ardıcıllığını tələb edir. İcra qəbzi korpus həzmini, dəqiq namizəd SHA-sını və model reviziyasını əlaqələndirir. Çatışmayan və ya etibarsız ölçmələr `HOLD` olaraq qalır; buna 30 saniyədən çox CPU, 512 MiB-dən çox pik RSS və ya 30 saniyədən çox ilkin analiz də daxildir. Bunlar sübutların qəbul edilməsi üçün limitlərdir, yeni icra zamanı RSS tətbiqi zəmanəti deyil.

FU-07 ən azı 98% keyfiyyət saxlanmasını və p95 gecikməsinin bazanın 1.2 mislisindən çox olmamasını, həmçinin ekvivalent orta başlıq çağırışları sayında ya hal üzrə balanslaşdırılmış orta recall göstəricisinin mütləq 0.05 yaxşılaşmasını, ya da dedupl ikasiyadan sonrakı orta başlıq çağırışlarının ən azı 10% azalmasını tələb edir. FU-09 ən azı 0.85 keyfiyyət, 95% saxlanma, 20% median gecikmə azalması və 10% token azalması tələb edir. Kritik fakt itkisi, inyeksiya uyğunluğu və ya istifadəyə dair məlumatın çatışmaması promot­siyaya mane olur. Bir icra heç nəyi promot edə bilməz: `--previous-report` eyni siyasət/model reviziyası/namizəd/korpus üçün bir-birindən fərqli, üst-üstə düşməyən və ardıcıl olaraq uyğun iki icranı təsdiqləyir. Nümunələmə eksperimenti kontakt vərəqi eksperimentini təsdiqləyə bilməz.

Toplayıcılar cavabları yaddaşda qiymətləndirməli və cavab mətnini heç vaxt saxlamadan `responseDigest` ilə yanaşı metrikləri və müşahidə əlaqələrini yazmalıdır. İstehlakçı köhnə xam müşahidələri də oxuyur, lakin həmin mətni heç vaxt öz hesabatlarına köçürmür. Hər müşahidə üçün `responseDigest` və ya `rawResponseText`-dən dəqiq biri qəbul edilir. Versiyalı icazə siyahısı dəyişməz `hold` defoltu ilə boş olaraq qalır. Uyğun giriş üçün onun sübut istinadı, siyasəti, model reviziyası, dəqiq namizəd SHA-sı, manifest həzmi və iki fərqli icra identifikatoru tələb olunur; ziddiyyətli kontekstlər rədd edilir. Bu metadatalar audit müqaviləsidir, istinad edilən faylın həqiqi ölçmələr ehtiva etdiyinə sübut deyil. Hər hansı giriş əlavə etməzdən əvvəl faktiki qəbzləri nəzərdən keçirin. İdarəetmə statistikası endpoint-i və Video paneli konservativ hazırlıq vəziyyətini göstərir. Yalnız konfiqurasiya edilmiş model ləqəbi onun reviziyasını və ya işləyən namizəd SHA-sını təsdiqləmir; buna görə cari panel başqa icra kontekstindən uyğunluğu təkrar istifadə etmək əvəzinə `HOLD` göstərir. Açıq eksperimental seçim promot­siyadan ayrı olaraq qalır; heç bir defolt avtomatik dəyişdirilmir.

Zəng edənlər uyğunlaşdırılmış mətnə artıq sahib olduqda, dəstəklənən video
hissəsinə əlavə olaraq `transcript.cues` massivi qoşa bilərlər. Hər bir cue
`text` sahəsini, yoxlanılan müddət daxilində sonlu `start`/`end` intervalını və
icazə verilən `source` dəyərini (`client`, `embedded` və ya `audio-bridge`)
daşımalıdır; `confidence` standart olaraq `1` olur və `0` ilə `1` arasında
qalmalıdır. Tamamilə eyni cue-lar birləşdirilir. OmniRoute heç vaxt bu
metadatadan transkripsiyaya başlamır: yoxlanılmış cue-lar source, confidence və
interval ilə təsvir edilən nəticəyə köçürülür və kadr başlıqları ilə yanaşı
etibarsız müşahidələr kimi göstərilir. Yanlış, diapazondan kənar və ya
mənşəyi olmayan mətn başlıq axınına qarışdırılmaq əvəzinə rədd edilir. Sorğu
gövdəsindəki hər iki transcript kanalı təqdim edilmiş mənşəni `client` olaraq
normallaşdırır; buna özünü `embedded` və ya `audio-bridge` kimi bəyan edən
etiketlər də daxildir. Yalnız serverə məxsus adapter kodla təmin edilən
`trustedSource` arqumenti vasitəsilə həmin etibarlı etiketləri təyin edə bilər;
sorğu JSON sahəsi bu arqumentə çata bilməz. Transcript mətni mənşəyindən asılı
olmayaraq etibarsız, mediadan törəmiş məzmun olaraq qalır və heç vaxt
avtorizasiyanı müəyyən etməməlidir.

Təkmil caller eyni video üçün `audioTranscript` treki təqdim edə bilər; bu,
server transkripsiyasının sübutu deyil, client tərəfindən təqdim edilmiş mətn
kimi qəbul edilir. Birləşdirmə seam-i vizual və audio müşahidələri bir ümumi
son tarix və abort siqnalı altında icra edir, onları ümumi zaman xəttində
sıralayır, tamamilə eyni dublikatları birləşdirir və yalnız tərəflərdən biri
uğurlu olduqda qismən nəticə qaytarır. Yanlış `audioTranscript` qismən
nəticəyə çevrilir — vizual təsvir saxlanılır, audio budağı isə təmizlənmiş
uğursuzluq kodu qeyd edir — bütün videonun uğursuz olmasına səbəb olmaq əvəzinə.
Hər budağın əlçatanlığı, qismən nəticə bayrağı və təmizlənmiş uğursuzluq
kodları təsvir edilən nəticədə, qoruyucu mexanizmin metadata-sında
(`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), nəticə
keşi metadata-sında və bridge birləşdirmə sayğaclarında saxlanılır. Standart
Video Bridge yolu nitqdən mətnə çevirməni çağırmır və medianın ikinci
nüsxəsini endirmir; bu açıq trek olmadan o, yalnız video olaraq qalır.

**Transcript retention (#12150 P1).** Bu, Video Bridge (özü də opt-in-dir)
transcript cue göstərdikdə avtomatik tətbiq olunur — ayrıca retention bayrağı
yoxdur. Sorğu istənilən transcript cue göstərdikdə (caller tərəfindən elan
edilmiş `transcript` və ya birləşdirilmiş `audioTranscript`), qoruyucu
mexanizm onu `videoBridgeObserved` kimi işarələyir və video təsvirinin
redaktə edilmiş kölgəsini yaradır — hər bir cue-nun sərbəst mətn gövdəsinin
`[redacted-video-transcript]` ilə əvəz edildiyi eyni təsvir; bu, sətirləşdirilmiş
mətn təhlil edilməklə deyil, sətir yığılmazdan əvvəl strukturlaşdırılmış cue
sahəsi əvəzlənməklə yaradılır, buna görə heç bir cue məzmunu — düşməncəsinə
hazırlanmış və ya adi, o cümlədən `]` simvolunu ehtiva edən
`[inaudible]`/`[music]` gövdələri — qala bilməz. Davamlı call-log sorğu
gövdəsində hər video mənşəli mətn hissəsi məzmun bərabərliyi əsasında həmin
redaktə edilmiş kölgə ilə əvəzlənir; `fullText` lövbəri tamamlanmış ilkin
çağırış qoruyucu mexanizmi payload-ından yenidən oxunur, buna görə sonrakı
zəncir qoruyucu mexanizmləri (prioritetləri 10/95 olan PII və credential
maskalayıcıları) təsvir mətnini yerində yenidən yazdıqdan və sistem promptu/
handoff/memory inyeksiyası mesaj massivini yenidən formalaşdırdıqdan sonra da
uyğunluq qorunur. Upstream modelə göndərilən gövdə dəyişdirilmir. Müşahidə
edilmiş sorğu heç bir davamlı Memory-ni də doldurmur (həm sorğudan, həm də
cavabdan törəyən çıxarışlar ötürülür), buna görə modelin öz cavabı transcript
mətnini Memory-yə əks etdirə bilməz.

**Raw video fields (#12430).** Bridge aktiv olduqda və native video dəstəyi
naməlum və ya mövcud olmadıqda, müəyyən edilmiş `transcript`/`audioTranscript`
sahələri təsvir uğursuz olduqdan və ya `maxVideos` limitinə çatıldıqdan sonra
belə `videoBridgeObserved`-ı aktivləşdirir. `null` və boş sətirlər də nəzərə
alınır; sahələrin olmaması və video olmayan metadata isə nəzərə alınmır.
Saxlanılan nüsxələrdə bu sahələr redaktə edilir və ya sorğu buraxılır, keşlər və
Memory isə yan keçilir.

Bu fallback yollarında etibarlı caller cue-ları qeyri-standart provider
sahələri əvəzinə dəstəklənən `text`/`input_text` hissələrinə çevrilir. Sorğu
tərəfindən təqdim edilən hər iki trek açıq xəbərdarlıqla etibarsız `client`
müşahidələri olaraq qalır: video təsvir edilməyib və zaman damğaları media ilə
uyğunlaşdırılmayıb. Mövcud 256-cue/64-KiB ümumi və hər cue üçün büdcələr iki
trek üzrə birlikdə tətbiq edilir; zaman damğaları brokerin 600 saniyəlik
tavanına və təqdim edilmiş istənilən fokus pəncərəsinə uyğun gəlməlidir. Yanlış
treklər ixtiyari mətn kimi ötürülmək əvəzinə silinir; birləşdirilmiş büdcə
aşılmadıqda etibarlı qonşu trek yenə istifadə edilə bilər. Null/boş sahələr
mətn əlavə etmir. Bu fallback tərəfindən heç bir media gətirilməsi və ya
transkripsiya əlavə edilmir. Transcript genişləndirmə sahələri fallback video
daşıyıcısından və onun `video_url`/`source` obyektlərindən silinir. OpenAI wire
allowlist-i sərt olaraq qalır; naməlum-native video daşıyıcıları əlçatan
olmaqda davam edir və yalnız məlum mətn hədəfləri təhlükəsiz markerləri
saxlayır. Strukturlaşdırılmış redaktə kölgələri əlavə edilmiş transcript
mətnini qoruyur, ilkin caller-ə məxsus sorğu isə dəyişdirilmir.
Native-supported hədəflər və deaktiv edilmiş bridge-lər mövcud bypass
davranışını saxlayır.

Əlavə saxlanılan nüsxələr də eyni müşahidə edilmiş sorğu siqnalından istifadə
edir. İlkin qoruyucu mexanizmdən əvvəlki client-sorğu snapshot-ı, yaddaşda
gözləyən sorğu və erkən rədd edilmiş sorğu jurnalı video hissələrindəki
transcript sahələrini strukturlaşdırılmış şəkildə əvəz edir; pipeline
mərhələləri və context handoff tərəfindən yaradılan sətir promptları isə
davamlı sorğu gövdəsi sink-ində redaktə olunur. Davamlı
`video_content_removed` markeri `previous_response_id` davamını qapalı
rejimdə uğursuz edir və qəsdən silinmiş mətni yenidən qurmağa imkan vermir.
Müşahidə edilmiş sorğu loglama prosesindən əvvəl hər-hissə redaktə kölgəsini
itirərsə və ya sonrakı sorğu dəyişikliklərindən sonra bir neçə video
kölgəsindən hətta biri uyğunlaşmazsa, qismən redaktə edilmiş transcript-i
saxlamaq əvəzinə davamlı sorğu gövdəsi tamamilə buraxılır.

Müşahidə olunan sorğu üçün model cavabı strukturlaşdırılmış işarə sərhədi olmadan transkriptin istənilən hissəsinə istinad edə bilər. Buna görə də saxlanılan çağırış jurnalındakı
`responseBody` buraxılma işarəsi ilə əvəz olunur; ətraflı pipeline artefaktı (buraya upstream/client body-ləri və axın parçaları daxil ola bilər) saxlanılmır. Semantik, idempotentlik və reasoning-replay keşləri həmin sorğu üçün oxuma və yazmaları keçirlər. Provayder sorğusu və klientə görünən cavab dəyişməz qalır. Ətraflı artefakt buraxıldıqda ilkin keepalive baytları müvəqqəti buferdən boşaldılır. Kiro-nun səhv formatlı EventStream xəbərdarlığı yalnız payload baytlarının sayını bildirir, məzmunu və ya JSON parser-in xam xətasını heç vaxt bildirmir.
Bu, əlaqəsiz hər bir provayder/plugin diaqnostikasının auditdən keçirildiyini iddia etmir; daha geniş saxlanılan sink yoxlaması #11658-də izlənilir.

Daxili `/api/modality-bridge/video/drilldown` həyat dövrü ayrıca, loopback/token-authenticated keş infrastrukturudur. Hər əməliyyat üçün həmçinin kanonik qeyri-şəffaf principal ID tələb olunur. Production çağırıcısı aktivləşdirilməzdən əvvəl bu ID-ni autentifikasiya olunmuş tenant-dan törətməli və klient tərəfindən seçilmiş dəyəri heç vaxt ötürməməlidir. Keş açarları həmin principal-ı kanonik session və video-reference ID-ləri ilə əlaqələndirir, yalnız onlardan törədilmiş SHA-256 açarlarını saxlayır və həm oxuma, həm də silmə əməliyyatlarını eyni principal ilə məhdudlaşdırır. Keş hər giriş üçün ən çox 16 törədilmiş JPEG frame saxlayır, onları on dəqiqədən sonra müddəti bitmiş hesab edir və məhdudlaşdırılmış `start`/`end` oxumalarını və ya açıq session silinməsini dəstəkləyir.

Hər principal 16 giriş və 64 MiB kanonik JPEG datası ilə məhdudlaşdırılır. Bu limitlər qlobal 64 giriş/256 MiB tavanından müstəqildir: principal kvotasına təzyiq qlobal LRU silinməsi nəzərdən keçirilməzdən əvvəl yalnız həmin principal-a aid ən uzun müddət istifadə olunmamış girişləri silir. Müddəti bitmiş girişlər keş fəaliyyəti zamanı həm principal, həm də qlobal uçotdan təmizlənir, cancellation və validation failure isə qismən əvəzetməni commit etmir.

Keş kanonik olmayan Base64-ü, artıq padding-i, JPEG olmayan medianı, səhv formatlı və ya yarımçıq JPEG-ləri, həmçinin məhdudlaşdırılmış tam təsvirli `sharp` dekodlaması zamanı xəbərdarlıq yaradan JPEG-ləri rədd edir. Qəbul edilmiş hər təsviri kanonik JPEG kimi yenidən kodlayır, eni və hündürlüyü çağırıcı sahələrinə etibar etmək əvəzinə dekodlanmış baytlardan törədir və saxlamazdan əvvəl sondakı polyglot baytlarını atır. Hər iki kvotaya yalnız məhdudlaşdırılmış kanonik sıxılmış bufer daxil edilir. JSON wire limiti 32 MiB dekodlanmış giriş tavanı üçün Base64 əlavə yükünü də nəzərə alır. Saxlanılan hər törəmə özünün yoxlanılmış JPEG formatını/ölçüsünü, sampling siyasətini, törəmə versiyasını, yaradılma vaxtını, server tərəfindən hesablanmış məzmun hash-ini, hash-lənmiş əsas istinadı və etibarlı çağırıcının əsas məzmun hash-ini qeyd edir. Cancellation asinxron decode/hash mərhələləri arasında, atomik keş commit-indən əvvəl yoxlanılır.

Production producer artıq törədilmiş broker frame-lərini yalnız uğurlu vizual analizdən sonra, videonun ikinci dəfə endirilməsi/çıxarılması olmadan təkrar istifadə edir. Bunun üçün operatorun `modalityBridgeVideoDrilldownEnabled=true` olması, hər hissə üzrə ciddi `drilldown: true` və autentifikasiya olunmuş API-key record ID tələb olunur. Klient tərəfindən elan edilmiş principal/session dəyərləri sahiblik yaratmır. Bu üç şərtin hamısı olmadan əlavə frame-lər hash-lənmir, ölçüsü dəyişdirilmir və saxlanılmır. Saxlama uğursuzluğu istifadəyə yararlı vizual cavabı qoruyur. Razılıq verilmiş sorğular bütün video nəticə keşini keçirlər ki, keşlənmiş nəticələr handle-ları heç vaxt təkrar göstərməsin.

Uğurlu JSON və SSE cavabları məhdudlaşdırılmış `x-omniroute-video-drilldown` başlığında ən çox dörd qeyri-şəffaf handle göstərir. Səlahiyyətli brauzer origin-ləri CORS origin siyasətini genişləndirmədən həmin başlığı oxuya bilər. Yeni handle-lar `v1.<32-byte random base64url
token>` formasından istifadə edir və registry yalnız onların SHA-256 hash-lərini saxlayır. Reader/header parser həmçinin köhnə 64-hex token-ləri qəbul edir. Autentifikasiya olunmuş ictimai consumer
`GET /api/v1/video-bridge/drilldown?handle=...` ünvanıdır və ayrıca
`modalityBridgeVideoDrilldownRemoteEnabled=true` ilə idarə olunur. Açıq şəkildə saxlanılmış false dəyəri, köhnə `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env fallback-i aktiv olsa belə, girişi ləğv edir. Production retention üçün analoji köhnə
`OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` fallback-i mövcuddur. Hər iki fallback standart olaraq söndürülüb.

Consumer sahibliyi autentifikasiya olunmuş açardan törədir və açar siyasətini tətbiq edir:
həm GET, həm də DELETE `/v1` və `/api/v1` alias-ları daxil olmaqla `video` endpoint kateqoriyasına aiddir. Boş olmayan endpoint allowlist-i olan açarlara `video` daxil edilməlidir; məhdudiyyətsiz açarlar uyğunluğunu qoruyur. Consumer naməlum, müddəti bitmiş və başqa açara aid handle-lar üçün eyni 404 cavabını qaytarır. O, `variant=preview|standard|detail` (maksimum JPEG ölçüsü 320/640/1280, heç vaxt böyüdülmür), `limit=1..8` (və ya köhnə `frames` alias-ı, heç vaxt hər ikisi birlikdə deyil), sıfır əsaslı `page` və ixtiyari `start`/`end` fokus saniyələrini qəbul edir. Təkrarlanan query açarları və tərsinə çevrilmiş fokus pəncərələri rədd edilir. Qaytarılan hər variantın faktiki məzmununun hash-i və faktiki ölçü metadatası olur və saxlanılan mənbə ilə əlaqələndirilir. Variantlar əlavə saxlanılan nüsxələr kimi saxlanmaq əvəzinə oxuma zamanı törədilir. Base64/envelope daxil olmaqla JSON cavabı 32 MiB ilə məhdudlaşdırılır; ölçüsü həddən artıq olan səhifə 413 qaytarır və klient daha az frame tələb etməlidir. Oxumalar hər resize əməliyyatı ətrafında cancellation-u yoxlayır və qaytarmadan əvvəl handle etibarlılığını yenidən yoxlayır. Sahib tərəfindən `DELETE` idempotentdir; silinmə və ya TTL müddətinin bitməsi saxlanılan mənbəni və istifadə uçotunu azad edir.

Paylaşılan store proses daxilində lokaldır: handle-ların müddəti restart zamanı bitir və onlar müstəqil OmniRoute prosesləri arasında ötürülə bilmir. İdarəetmə statistikası effektiv retention/
remote siyasətini və ümumi saxlanılan girişlərin/baytların sayını göstərir; medianı, istinadları, principal ID-ləri və ya handle-ları heç vaxt göstərmir. Video settings paneli bu dəyərləri göstərir və hər iki razılıq keçidini saxlaya bilər. Bu implementasiya sənədləri canlı deployment və ya promotion sübutu deyil; real-model qəbulu ayrıca izlənilir.

Kadrlar konfiqurasiya edilmiş Video modeli ilə ardıcıl şəkildə başlıqlandırılır. Boş
Video override-ı Vision ayarını miras alır; hər ikisi boşdursa, Vision
auto-router-ı effektiv görmə qabiliyyətli modeli seçir. Uğurlu başlıqlar orijinal hissəni
sabit `[Video description:` prefiksi ilə əvəz edir; bu prefiks həmçinin mətni etibarsız media mənşəli müşahidə kimi işarələyir və aşağı axın modellərinə mediada tapılan təlimatlara əməl etməməyi bildirir. Kadr-başlıq keş açarlarına JPEG baytları, prompt, zaman möhürü və effektiv model daxildir; yalnız uğurlu başlıqlar keşlənir. Keş qeydləri faktiki uğurlu istehsalçı modelini, o cümlədən ehtiyat modelini saxlayır; müxtəlif kadrlar müxtəlif modellər tərəfindən yaradıldıqda bridge `mixed` bildirir. Keş uyğunluğu həmin istehsalçı identikliyini yenidən istifadə edir və onu tələb olunan marşrutlaşdırma planı kimi yenidən etiketləmir. Bütün videonun nəticə keşi çıxışı dəyişən hər bir giriş üzrə açarlaşdırılır — prompt, effektiv model, nümunələndirmə siyasəti, kadr sayı, semantik analiz rejimi, normallaşdırılmış fokus ipucunun SHA-256 barmaq izi, fokus pəncərəsi, `transcript`,
`audioTranscript` və kontakt vərəqi bayrağı — buna görə də bu ölçülərdən hər hansı birinin dəyişdirilməsi keş itkisi yaradır və heç vaxt köhnə nəticənin yenidən istifadəsinə səbəb olmur. Vizual deduplikasiya siyasətinin versiyası, həddi və məhdudlaşdırılmış namizəd kadr sayı da nəticə-keş açarında və metadatasında açıq şəkildə göstərilir; buna görə siyasət dəyişikliyi köhnəlmiş bütün-video təsvirini yenidən istifadə edə bilməz. Nəticə-keşinin v4 metadatası rejimi və barmaq izini saxlayır, xam istifadəçi tapşırığını isə heç vaxt saxlamır. Qoruyucu mexanizmin metadatası həm tələb olunan, həm də effektiv analiz rejimlərini bildirir; istifadə edilə bilən istifadəçi mətni olmayan `focused` rejimi faktiki olaraq `full` kimi bildirilir.

Qoruyucu mexanizm dəstəklənən hər bir video hissəsini çıxarır, lakin
`modalityBridgeVideoMaxVideos` sayından artıq videonu təsvir etmir. `supportsVideo === false` olduğu sübut edilmiş hədəf üçün uğursuz və limitdən artıq videolar açıq təhlükəsiz mətn markerlərinə çevrilir ki, xam video saxlanılmasın. Qabiliyyət naməlum olduqda həmin hissələr video daşıyıcısını saxlayır; istənilən ehtiyat transkript yuxarıda göstərilən məhdud mətn çevrilməsindən keçir. `supportsVideo === true` olan hədəflər bridge-i keçirlər.
Klient sorğusunun abort siqnalı yükləmə, broker növbəsi, alt proseslər və başlıqlandırma çağırışları boyunca ötürülür; abortlar videolar arasında prosesi dayandırır və heç vaxt xam mediaya açıq keçidlə nəticələnmir.

İş vaxtı ayarları DB əsaslıdır və Zod ilə yoxlanılır:

| Açar                                | Standart    | Aralıq / davranış                                                                                                     |
| ----------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | İstəyə bağlı iş vaxtı ayarı, opt-in                                                                                   |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` ümumi başlıqları qoruyur; `focused` məhdudlaşdırılmış, etibarsız ən son istifadəçi kontekstindən istifadə edir |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge modelini miras alır                                                                                     |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                  |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` və ya proporsional `segment_aware`; detektor uğursuz olduqda `uniform`-a qayıdır             |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                   |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                        |

Davamlı saxlanılmış köhnə Video timeout dəyərləri 120 saniyədən yuxarı olduqda broker son müddətinə qədər məhdudlaşdırılır; yeni ayar yazılışlarında bu limiti aşan dəyərlər rədd edilir.
`GET /api/modality-bridge/video/runtime` autentifikasiyadan və ya iş vaxtının yoxlanılmasından əvvəl etibarlı möhürlənmiş loopback lokalığını tələb edir, sonra isə idarəetmə autentifikasiyasını tələb edir. O, yalnız `available`, təmizlənmiş FFmpeg/ffprobe versiyalarını və iş vaxtı əlçatan olmadıqda sabit səbəbi qaytarır. Daxili çıxarış endpoint-i ictimai yükləmə API-si deyil: növbənin dolması `503` və `Retry-After` ilə, çağıranın əlaqəni kəsməsi `499` ilə, sabit broker son müddətinin aşılması isə `504` ilə nəticələnir. Çevrilmiş cavablar mərkəzi
`x-omniroute-modality-bridge` başlığına Vision və ya Audio seqmentlərini silmədən
`video->text;model=<visionModel>;parts=<videos>` əlavə edir.

### PII Masker (`piiMasker.ts`)

**hər iki** mərhələdə işləyir.

- **`preCall`** payload-ı klonlayır, `system`, `messages`, `input` və
  `prompt` sahələrini (sadə sətir elementləri də daxil olmaqla) gəzir və
  `@/shared/utils/inputSanitizer`-dən olan `processPII()` funksiyasını sətir tipli
  `content`/`text` sahələrinə tətbiq edir. `PII_REDACTION_ENABLED=true` olduqda aşkarlanmış PII xaricə göndərilən payload-da redaktə edilir. Bu, `INPUT_SANITIZER_MODE`-dan asılı deyil (`INPUT_SANITIZER_MODE` yalnız prompt-injection siyasətinə nəzarət edir). Redaktə söndürülmüş olduqda çağırış məzmunu yenidən yazmadan aşkarlama saylarını qeyd edir.
- **`postCall`** cavabı dərin şəkildə klonlayır, `sanitizePIIResponse()` və Responses-API-formalı maskalayıcını (`maskResponsesOutput` — `output_text` və `output[].content[].text` sahələrini əhatə edir) işlədir. Hər hansı redaktə baş verərsə, dəyişdirilmiş cavab orijinalı əvəz edir.

Qoruyucu mexanizm heç vaxt bloklamır; yalnız annotasiya əlavə edir (`meta.detections`,
`meta.redacted`) və ya cavabı yenidən yazır.

**Geri qaytarıla bilən kassa (`PII_REVERSIBLE_VAULT_ENABLED`, default `false`).** Həm
`PII_REDACTION_ENABLED`, həm də `PII_REVERSIBLE_VAULT_ENABLED` aktiv olduqda (DB override >
env > default, hər sorğu üçün bir dəfə oxunur), `handleChat` hər bir müştəri
sorğusu üçün bir kassa açır (`src/lib/pii/requestTokenVaultScope.ts`) və onu
pre-call mərhələsinə `GuardrailContext.tokenVault` kimi ötürür. Maskalayıcı daha
sonra daxili, təsdiqlənmiş (GDPR/POPIA) və xüsusi qaydalar üçün `[EMAIL_REDACTED]`
əvəzinə `<<PII_EMAIL_QWERTYUI_1>>` kimi əvəzedici tokenlər yazır. Nonce hər sorğu
üçün 8 təsadüfi böyük hərfdən ibarətdir və sorğu daxilində eyni dəyər üçün eyni
token istifadə olunur. Yalnız maskalayıcı token yaradır: prompt-injection qoruması
və `/api/guardrails/test` kassa olmadan işləyir və yer tutucuları saxlayır.

- Provayder, hər bir combo mərhələsi, retry, fusion panel üzvü və fusion judge
  yalnız tokenləri görür. Tokenlər `handleChat`-dən çıxan 2xx cavabında bir dəfə
  bərpa olunur: təhlil edilmiş SSE-də hər sahə üzrə (event-lər arasında bölünmüş
  token də həll olunur; tool-call arqumentləri JSON-escape edilir) və ya JSON
  body-də hər sahə üzrə, yenidən hesablanmış `Content-Length` ilə. Content və
  reasoning mətni, eləcə də tool-call arqumentləri bərpa olunur. Xəta body-ləri
  (4xx/5xx) tokenləri saxlayır.
- Uğursuzluqlar məxfi qalır: token yaratma uğursuz olarsa və ya kassa bir dəyəri
  qəbul etməzsə (1000 giriş, hər dəyər üçün 256 simvol, ümumilikdə 64 KB), bunun
  əvəzinə yer tutucu yazılır; kassanın həll edə bilmədiyi token və ya uğursuz bərpa
  literal olaraq saxlanır və yalnız say qeyd olunur. Kassada timer və qlobal vəziyyət
  yoxdur; cavab axını başa çatdıqda, ləğv edildikdə və ya xəta baş verdikdə
  təmizlənir.
- Sorğu tokenlər yaradıbsa, memory extraction, idempotency save və hər iki
  semantic-cache write ötürülür, çünki sonrakı heç bir sorğu həmin tokenləri həll
  edə bilməz. Call log-larda provayder sorğusu və cavabı tokenləri daşıyır;
  qeydə alınan müştəri sorğusu body-si isə plain redaction-da olduğu kimi xam
  müştəri girişidir.
- Tokenlər sorğuya xas təsadüfi nonce-dan istifadə edir, buna görə prompt prefix
  hər turn-də dəyişir: provider-side prompt caching maskalanmış turn-lər üçün işləmir
  və sonrakı turn-də geri qayıdan token (məsələn, `previous_response_id` vasitəsilə)
  köhnə sorğuya aiddir və literal olaraq qalır.

#### Tip üzrə seçim, xüsusi pattern-lər və aşkarlama sayğacları

**Dashboard → Settings → Security → PII masking** nəyin maskalanacağını seçir. Bu,
maskalanmanı aktivləşdirmir: bunun üçün hələ də `PII_REDACTION_ENABLED` (request) və
`PII_RESPONSE_SANITIZATION` (response + SSE) istifadə olunur və hər ikisi
standart olaraq deaktivdir.

- **Tip üzrə seçim** — daxili id-lər
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`) faylında sadalanır. Dəyər
  təyin edilmədikdə bütün tiplər seçilir (bu parametr mövcud olmamışdan əvvəlki
  davranış). Sorğu mühərrikinin `ssn_us` pattern-i `ssn`-ə uyğunlaşdırılır.
  Şablonlar (Minimal, Standard, Financial, Brazilian, USA, GDPR, POPIA, Full)
  yalnız UI-dəki checkbox-ları doldurur.
- **GDPR və POPIA identifikatorları** — aşağıdakı cədvəldə göstərilən, Aİ və
  Cənubi Afrika şəxsi identifikatorlarını əhatə edən on iki daxili id. Onların
  regex-ləri, validator-ları və yurisdiksiya teqləri həm response sanitizer-in
  (`src/lib/piiSanitizer.ts`), həm də request masker-in
  (`src/shared/utils/inputSanitizer.ts`) istifadə etdiyi vahid cədvəldə,
  `src/shared/utils/piiPatterns.ts` faylında yerləşir. Uyğunluq yalnız validator
  onu qəbul etdikdə redaktə olunur; rəqəmlərdən ibarət sadə ardıcıllıq heç vaxt
  kifayət etmir. Bu id-lər mövcud olmamışdan əvvəl daraldılmış seçim saxlamış
  operator yeni id-lər işarələnənədək əvvəlki davranışı saxlayır.
- **Xüsusi pattern-lər** — 20-dək regex və ya wildcard pattern-i (`*` = boşluq
  olmayan ən çox 64 simvol, `?` = bir simvol). Uyğunluqlar `[CUSTOM_REDACTED]`
  olur. Hər pattern `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`) vasitəsilə yoxlanılır: ən çox 500
  simvol, flag-lar yalnız `g i m s u` ola bilər, pattern compile olunmalıdır,
  `safe-regex` yoxlamasından keçməlidir (katastrofik backtracking), boş sətirə və
  ya redaction placeholder-ına uyğun gəlməməlidir. Uğursuz pattern yadda saxlanarkən
  və test edilərkən rədd edilir, saxlanmış və runtime zamanı uğursuz olan sətir isə
  compile edilmək əvəzinə ötürülür. Xüsusi pattern-lər yalnız masking aktiv olduqda
  işləyir.
- **Aşkarlama sayğacları** — tip üzrə saylar (heç vaxt uyğun gələn dəyərlər deyil),
  yaddaşda saxlanır və restart zamanı sıfırlanır
  (`src/lib/pii/piiDetectionStats.ts`). Onlar yalnız masking aktiv olduqda artır.

Ayarlar `key_value` cədvəlində (`pii_settings` namespace,
`src/lib/db/piiSettings.ts`) saxlanır və 1 saniyəlik cache vasitəsilə oxunur. API:

| Method | Path                     | Purpose                                                                           |
| ------ | ------------------------ | --------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Flag vəziyyəti, `enabledTypes`, `customPatterns`, aşkarlama sayğacları            |
| `PUT`  | `/api/settings/pii`      | `enabledTypes` (`null` = hamısı) və/və ya `customPatterns`-i əvəz etmək           |
| `POST` | `/api/settings/pii/test` | Bir pattern-i ən çox 8 KB-lıq nümunə üzərində sınaqdan keçirmək; heç nə saxlanmır |

Hər üç endpoint management auth tələb edir və body-ni Zod ilə yoxlayır
(`src/shared/validation/schemas/piiSettings.ts`). Login deaktiv olduqda
(`requireLogin=false`) `GET` və test endpoint-i açıqdır, lakin `PUT` üçün hələ də
dashboard session-u, `manage`-scope API key, write scope və ya daha yüksək səlahiyyətli
`oma_` access token, yaxud loopback-dan göndərilən CLI token və ya
internal-service token tələb olunur.

#### GDPR (Aİ) və POPIA (Cənubi Afrika) identifikatorları

| Id                  | Identifier                          | Validation                                                                           |
| ------------------- | ----------------------------------- | ------------------------------------------------------------------------------------ |
| `iban`              | IBAN                                | Tanınmış ölkə, həmin ölkə üçün dəqiq uzunluq, ISO 13616 MOD-97-10                    |
| `eu_vat`            | Aİ ƏDV nömrəsi                      | Tanınmış üzv dövlət prefiksi və həmin dövlətin nömrə formatı (VIES yoxlaması yoxdur) |
| `es_dni_nie`        | İspan DNI / NIE                     | Nəzarət hərfi (qiymət mod 23); NIE — `X/Y/Z` + 7 rəqəm                               |
| `it_codice_fiscale` | İtaliya Codice Fiscale              | Tək/cüt mövqe cədvəllərindən hesablanan nəzarət hərfi                                |
| `pl_pesel`          | Polşa PESEL                         | Çəkili yoxlama cəmi və mövcud olan kodlaşdırılmış doğum tarixi                       |
| `nl_bsn`            | Niderland BSN                       | 11 yoxlaması (9..2 çəkiləri, -1)                                                     |
| `de_steuer_id`      | Alman Steuer-ID                     | ISO 7064 Mod 11,10 və rəqəm strukturu qaydaları (başda 0 olmamalıdır)                |
| `se_personnummer`   | İsveç personnummer                  | Son on rəqəm üzərində Luhn və məqbul doğum tarixi (10 və ya 12 rəqəm)                |
| `za_id`             | Cənubi Afrika ID nömrəsi            | Bütün 13 rəqəm üzərində Luhn, etibarlı doğum ayı/günü, vətəndaşlıq rəqəmi 0 və ya 1  |
| `za_phone`          | Cənubi Afrika telefon nömrəsi       | `+27` / `27` prefiksi və ya boşluqla və ya defislə yazılmış milli `0..` forması      |
| `za_vat`            | Cənubi Afrika ƏDV nömrəsi           | `4` ilə başlayan 10 rəqəm **və** əvvəlki 48 simvolda "VAT" / "BTW"                   |
| `za_tax_ref`        | Cənubi Afrika vergi istinad nömrəsi | `0`-`3` ilə başlayan 10 rəqəm, Luhn, **və** əvvəlki 48 simvolda "tax" / "SARS"       |

Yalnız rəqəmlərdən ibarət formatlar sifariş nömrələri, build nömrələri və
vaxt möhürləri ilə toqquşduğuna görə, ən zəif olanlar (`za_vat`, `za_tax_ref`)
açar söz göstəricisinə ehtiyac duyur və yalnız on rəqəmli `0..` nömrəsi Cənubi
Afrika telefon nömrəsi kimi qəbul edilmir. Boşluqlu IBAN-lar (`GB29 NWBK ...`)
uyğunlaşdırılmır. Axın emalı yolunda göstərici yalnız cari hissənin daxilində
axtarılır. İdentifikatorlar ümumi telefon nümunələrindən əvvəl yerləşir, buna
görə təsdiqlənmiş identifikator öz placeholder-ını saxlayır
(`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). `gdpr` və `popia` şablonları
müvafiq olaraq Aİ və Cənubi Afrika identifikatorlarını seçir. Maskalamanın özü
istəyə bağlı olaraq qalır (Hard Rule #20): burada heç nə funksiya bayrağının
standart parametrini dəyişmir.

### Prompt Injection (`promptInjection.ts`)

İstifadəçi tərəfindən təqdim edilən məzmunda düşməncəsinə hazırlanmış strukturları
aşkarlayır və konfiqurasiya edilmiş siyasəti tətbiq edir. Davranış mühit
dəyişənləri və konstruktor seçimləri ilə idarə olunur:

| Setting         | Env var                                                                                               | Default | Effect                                                                                                                                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enabled         | `INPUT_SANITIZER_ENABLED`                                                                             | `true`  | `false` olduqda qoruyucu mexanizm dərhal dayandırılır.                                                                                                                                                         |
| Mode            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`  | İnjeksiya siyasəti: `block`, `warn` və ya `log`. (`redact` geriyə uyğunluq üçün qəbul edilir, lakin injeksiya mətnini silmir; sorğunun PII yenidən yazılması `PII_REDACTION_ENABLED` tərəfindən idarə olunur.) |
| Block threshold | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Bloklama üçün tələb olunan minimum ciddilik səviyyəsi. Standart olaraq orta səviyyə yalnız müşahidə edilir.                                                                                                    |

**Rejim üstünlüyü** (`getMode`): çağıranın `options.mode` →
`INJECTION_GUARD_MODE` **DB funksiya bayrağı üzərindən ləğvetmə** (İdarə paneli →
Parametrlər → Funksiya bayraqları) → `INJECTION_GUARD_MODE` mühit dəyişəni →
`INPUT_SANITIZER_MODE` mühit dəyişəni → `warn`. Buna görə idarə panelindəki
ləğvetmə mühit dəyişənlərindən üstün olur və Funksiya bayraqları interfeysi
işləyən qoruyucu mexanizmi canlı şəkildə idarə edir (yenidən başlatma tələb
olunmur). DB oxunması fail-safe prinsipi ilə işləyir: xəta baş verərsə,
qoruyucu mexanizm mühit dəyişənlərinə əsaslanan davranışa qayıdır və heç bir
ləğvetmə təyin edilmədikdə davranış yalnız mühit dəyişənlərindən istifadə edilən
həll ilə eyni olur.

Aşkarlama mənbələri:

1. `@/shared/utils/inputSanitizer` modulundan `sanitizeRequest()` (pipeline-ın
   digər hissələrində istifadə olunan ümumi aşkarlayıcı dəsti).
2. Daxili `DEFAULT_GUARD_PATTERNS` (`system_override_inline` və
   `markdown_system_block`; hazırda hər ikisinin ciddilik səviyyəsi `high`-dır).
3. Konstruktor seçimləri vasitəsilə ötürülən əlavə `customPatterns` (sətirlər,
   regex və ya `{ name, pattern, severity }` qeydləri).

`mode === "block"` olduqda **və** ən azı bir aşkarlama ciddilik həddinə
çatdıqda, `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }` qaytarır. `warn`/`log` rejimlərində qoruyucu
mexanizm hadisəni jurnala yazır, lakin çağırışa icazə verir. Ümumi
`evaluatePromptInjection()` köməkçi funksiyası reyestrdən keçmədən promptları
qiymətləndirməyə ehtiyacı olan çağıranlar üçün də ixrac olunur.

**Skanlama sərhədi (v3.8.20):** detektor birləşdirilmiş prompt mətninin yalnız **ilk 16 KB** hissəsini yoxlayır — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bayt) `src/shared/utils/inputSanitizer.ts` daxilində. `detectInjection()` və `evaluatePromptInjection()` hər ikisi pattern dövrünü işə salmazdan əvvəl `slice(0, MAX_INJECTION_SCAN_BYTES)` tətbiq edir. İnjection direktivləri girişin yuxarı hissəsinə yaxın yerləşdiyindən, bu, aşkarlamanı zəiflətmədən çox yüz KB-lıq yüklərdə regex CPU/GC xərclərini məhdudlaşdırır (müq. #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Hər iki mərhələdə işləyir və standart zəncirin sonunda yerləşir (prioritet `95`). Xaricə göndərilən yükdən (mesaj məzmunu, alət çağırışının arqumentləri, alət nəticələri) **və** provayderin cavabından tanınmış API açarı / məxfi token pattern-lərini redaktə edir; beləliklə prompt-a yapışdırılmış credential (və ya alət nəticəsi tərəfindən geri əks etdirilmiş credential) nə yuxarı provayderə, nə də müştəriyə sızır.

- **Yalnız aktivləşdirildikdə işləyir**, PII redaksiyası ilə eyni konvensiyaya əsasən (Hard Rule #20-yə yaxın): `settings.credentialRedactionEnabled === true` **və ya** `CREDENTIAL_REDACTION_ENABLED=true` olmadıqda deaktivdir. Deaktiv vəziyyətdə qoruyucu mexanizm `no-op` olur — heç vaxt bloklamır və heç nəyi yenidən yazmır.
- `redactCredentials()` bütün yük/cavab ağacını (`walkValue()`, prototip çirkləndirməsinə qarşı təhlükəsiz, `WeakSet` vasitəsilə dövrələrə davamlı) gəzir və uyğunluqları `[REDACTED:<type>]` yer tutucusu ilə əvəz edir; yalnız həqiqətən dəyişmiş budaqları klonlayır.
- `CREDENTIAL_PATTERNS` LLM provayder açarlarını (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokenlərini (GitHub, Slack, Linear, Notion, npm, Postman, Discord), ödəniş açarlarını (Stripe, Square), bulud açarlarını (AWS access key, Twilio, SendGrid, Mailgun), şəxsi açarları / JWT-ləri, credential ehtiva edən bağlantı sətirlərini (`mongodb://user:pass@...` və s.) və ümumi `Authorization`/`x-api-key`/`api-key`/`apikey` başlıq-dəyəri pattern-ini əhatə edir. Başlıq formasında olan açarlar (`authorization`, `x-api-key`, `api-key`, `apikey`) ümumi mətn regex-i ilə deyil, struktur olaraq (yalnız dəyər; `Bearer `/`Basic ` kimi sxem prefiksi saxlanılmaqla) redaktə edilir.
- Qoruyucu mexanizm heç vaxt bloklamır; yalnız yenidən yazır (`modifiedPayload` / `modifiedResponse`) və annotasiya əlavə edir (`meta.credentialsRedacted`, `meta.count`).

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

`src/sse/handlers/chat.ts` və
`open-sse/handlers/chatCore.ts` üzərindən keçən hər bir sorğu üçün
([Əhatə dairəsi və məhdudiyyətlər](#coverage-and-limits) bölməsində sadalanan chat ailəsi marşrutları):

1. `resolveDisabledGuardrails(...)` API açarından, gövdədən
   və başlıqlardan istifadə edərək buraxılacaq siyahını yaradır.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` qoruyucu qaydaları artan
   prioritet sırası ilə işə salır:
   - Deaktiv edilmiş qoruyucu qaydalar `skipped` kimi qeyd olunur.
   - Hər bir qoruyucu qaydanın `preCall` metodu `modifiedPayload` vasitəsilə yükü yenidən yaza bilər.
   - İlk `block: true` zənciri qısaqapanma ilə dayandırır və işləyici qoruyucu qaydanın rədd cavabını qaytarır.
3. (Potensial olaraq yenidən yazılmış) yük combo marşrutlaşdırılmasına və yuxarı axın göndərişinə ötürülür.
4. **Yalnız axınsız rejimdə:** cavab yığıldıqdan sonra
   `guardrailRegistry.runPostCallHooks(...)` cavab üzərində eyni zənciri işə salır. Buradakı `block: true` yuxarı axın cavabını ləğv edir və HTTP 400 qaytarır. Axınla ötürülən cavablar bu mərhələni tamamilə ötürür.
5. **Yalnız geri qaytarıla bilən vault üçün:** sorğu tokenlər yaratdıqda, `handleChat`
   onları qaytardığı 2xx cavabında, post-call hook-lardan və axınla ötürülən PII transformasiyasından sonra bərpa edir; beləliklə, `PII_RESPONSE_SANITIZATION` bərpa edilmiş əsli deyil, tokenləri və model tərəfindən yaradılmış PII-ni görür.

Xəta atan qoruyucu qaydalar `error: <message>` ilə qeyd olunur və `logger.warn` vasitəsilə jurnala yazılır, lakin zəncir davam edir — bu, dizayn üzrə uğursuzluqda açıq davranışdır.

## Əhatə dairəsi və məhdudiyyətlər

Qoruyucu mexanizmlər reyestri yalnız çat konveyerinə qoşulub. Bu məhdudiyyətlər
`tests/unit/guardrail-pipeline-wiring-characterization.test.ts` və
`tests/unit/guardrail-pipeline-characterization.test.ts` tərəfindən təsbit edilir;
davranış dəyişdikdə həmin testləri məqsədli şəkildə yeniləyin.

### Hook-ların işə düşdüyü yerlər

| Hook / idarəetmə                    | İşlədiyi yerlər                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                   | `handleChat` (`src/sse/handlers/chat.ts`) tərəfindən emal edilən sorğular: `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (və `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` və Telegram çat proksisi. Həmçinin idarəetmə panelinin test endpoint-i `/api/guardrails/test`. Pre-call bloklaması HTTP 400 qaytarır. |
| `runPostCallHooks`                  | Yalnız **axınsız** çat cavabları (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Axınla ötürülən cavablar heç vaxt ona çatmır.                                                                                                                                                                                                                                                                                                               |
| Axın üzrə PII                       | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`); `PII_RESPONSE_SANITIZATION` aktiv olduqda `streamingPipeline.ts`-də konveyerə qoşulur. Bu, qoruyucu mexanizm deyil, ona görə deaktiv etmə kanalları ona təsir etmir.                                                                                                                                                                                                                   |
| Geri qaytarıla bilən PII anbarı     | Yalnız `handleChat` tərəfindən emal edilən sorğular üçün, `PII_REDACTION_ENABLED` və `PII_REVERSIBLE_VAULT_ENABLED` aktiv olduqda. Tokenlər pre-call `pii-masker` tərəfindən yaradılır və `handleChat` çıxışında (`src/lib/pii/requestTokenVaultScope.ts`) bərpa edilir. Sorğu üçün `pii-masker` deaktiv edilərsə, heç nə yaradılmır.                                                                                                                |
| Injection-guard middleware (legacy) | `/v1` daxilində prompt daşıyan hər bir marşrut, o cümlədən çat ailəsi (bax: [marşrut əhatə dairəsi](#injection-guard-route-coverage--red-team-phase-8--block-d)). Yalnız prompt inyeksiyası.                                                                                                                                                                                                                                                         |

### Əhatə olunmayanlar

- **Media, embedding və data marşrutları** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) heç vaxt reyestrə çatmır. Orada
  PII maskalanması, credential maskalanması və ya modallıq körpüsü işləmir. Onların
  yeganə yoxlaması legacy injection-guard middleware-dir.
- **Axınla ötürülən cavablar** post-call qoruyucu mexanizmlərini əldə etmir: nə
  `pii-masker`, nə də `credential-masker` post-call mərhələsində işləmir və
  post-call bloklaması tətbiq edilmir. Yalnız axın üzrə PII transformasiyası
  tətbiq olunur (`PII_RESPONSE_SANITIZATION` aktiv olduqda). Axınla ötürülən
  cavabda geri əks olunan credential redaktə edilmir.
- **Deaktiv etmə kanalları və middleware (qəsdən belədir):** middleware prompt
  inyeksiyasını caller tərəfindən idarə olunan heç bir deaktiv etmə siyahısı
  ötürmədən, `evaluatePromptInjection()` funksiyasına öz çağırışı vasitəsilə
  qiymətləndirir. `block` rejimi caller tərəfindən idarə olunan deaktiv etmələrin
  yan keçə bilmədiyi məcburi sərhəddir; buna çat ailəsi marşrutları da daxildir
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). `prompt-injection`-ın deaktiv edilməsi yalnız reyestrdəki qoruyucu mexanizmi ötürür.

### Post-call mərhələsindən əvvəl cavabı nə görür

Axınsız yolda ardıcıllıq belədir: yaddaşdan çıxarış → daxili alətin
icrası → post-call qoruyucu mexanizmləri → post-call blokundan çıxış →
semantik keşdə saxlama.

- **Yaddaşdan çıxarış** və **alətin icrası** post-call qoruyucu mexanizmləri
  cavabı yenidən yaza və ya bloklaya bilməzdən əvvəl cavabı görür.
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401)-dən etibarən yaddaşdan
  çıxarış `PII_RESPONSE_SANITIZATION` aktiv olduqda çıxarılmış mətni
  `sanitizePII` vasitəsilə emal edir (həm axınlı, həm də axınsız rejimdə), lakin
  sonradan post-call mərhələsində bloklanan cavab yenə də yaddaşa və alətlərə
  təqdim edilmiş olur.
- **Semantik keş** cavabı post-call mərhələsindən sonra saxlayır; buna görə də
  yenidən yazılmış cavabı saxlayır və bloklanmış cavab heç vaxt keşlənmir. Keş
  qeydləri hər API açarı üzrə ayrıca açarlandırılır.

## Konfiqurasiya

Daxili qoruyucu mexanizmlər tərəfindən oxunan mühit dəyişənləri:

| Dəyişən                               | Tərəfindən istifadə olunur | Təsiri                                                                                                          |
| ------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Aşkarlanmanı tamamilə deaktiv etmək üçün `false` olaraq təyin edin.                                             |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | İnjeksiya siyasəti: `warn`, `block` və ya `log`. Köhnə `redact` dəyəri injeksiya mətnini yenidən yazmır.        |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | İnjeksiya qoruyucusunun rejimi; həmçinin env dəyişənlərini **üstələyən** DB funksiya bayrağıdır (DB > ENV).     |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | `MODE=block` rejiminin rədd etdiyi minimum ciddilik səviyyəsi: `high` (standart), `medium` və ya `low`.         |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | `INPUT_SANITIZER_BLOCK_THRESHOLD` üçün köhnə alias.                                                             |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | `true` olduqda sorğudakı PII redaktə edilir (injeksiya rejimindən asılı olmayaraq).                             |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | `PII_REDACTION_ENABLED` ilə birlikdə geri çevrilə bilən tokenlər yaradır və onları 2xx cavablarında bərpa edir. |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream)  | Cavab tərəfində masker davranışına nəzarət edir.                                                                |

Modality Bridge qoruyucu mexanizmləri mühit dəyişənlərindən deyil, DB əsaslı parametrlər
mağazasından (`getSettings()`) iş vaxtı konfiqurasiyasını oxuyur. Vision üçün əsas açarlar
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` və
`modalityBridgeCacheMaxEntries`-dir. Köhnə
`visionBridge*` açarları yalnız sənədləşdirilmiş bir dövrəlik oxuma ehtiyat variantı kimi
qəbul edilir; dashboard yazmaları əsas açarlardan istifadə edir. Standart dəyərlər və ehtiyat
variantı həlledicisi `src/shared/constants/modalityBridgeDefaults.ts` faylında yerləşir; köhnə
konstantlar isə `src/shared/constants/visionBridgeDefaults.ts` faylında saxlanılır.

Audio `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` və `modalityBridgeAudioMaxClips` açarlarından, həmçinin ümumi
`modalityBridgeCache*` parametrlərindən istifadə edir. Audio üçün köhnə açar ehtiyat variantı
mövcud deyil, çünki bu açarlar Modality Bridge sxemi ilə birlikdə təqdim edilib.

Video `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` və
`modalityBridgeVideoTimeout` açarlarından, həmçinin ümumi `modalityBridgeCache*` parametrlərindən
istifadə edir. FFmpeg/ffprobe əməliyyat asılılıqları məcburi olmadığından, kadr başlıqlarının
yaradılması isə gecikmə və model xərclərini artırdığından, bu funksiya standart olaraq deaktivdir.

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
