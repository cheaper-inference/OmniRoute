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

Reyestr import zamanı prioritet sırası ilə altı guardrail-ı avtomatik yükləyir
(bax: `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Ad                  | Mərhələ(lər)   | Fayl                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Daha aşağı prioritet nömrələri **əvvəl** işləyir.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

GLM 5.3 baza modeli və `glm-5.3-{low,high,max}` açıq şəkildə göstərilmiş
`supportsVision:false` reyestr/spec metadatasına malikdir. GLM 5.3 Flash
variantları nativ görmə modelləri olaraq qalır. Claude Code-un `/v1/messages`
marşrutu, Claude-dan OpenAI-ya çevrilmədən **əvvəl** paylaşılan `handleChat`
pre-call guardrail zəncirinə daxil olur; iç-içə yerləşən `Read` alət-nəticəsi
şəkilləri, həmin çevrilmə onları OpenAI `image_url` məzmununa qaldırmazdan
əvvəl təsvir edilməli və ya emal olunmalıdır (#17069).

**Görmə qabiliyyəti olmayan modellərə** yönələn şəkil daşıyan sorğuları tutur
və ya bütün sorğunu görmə qabiliyyətli modelə yenidən yönləndirir, ya da
yuxarı axın çağırışından əvvəl şəkil hissələrini konfiqurasiya oluna bilən
görmə modelinin yaratdığı mətn təsvirləri ilə əvəz edir. Bu, yalnız mətn
provayderlərinin multimodal yükləri şəffaf şəkildə emal etməsinə imkan verir.

Axın:

1. Hədəf model artıq görməni dəstəkləyirsə ötür (məcburi-körpü siyahısında
   `isVisionBridgeForcedModel` içində görünmədikcə).
2. Şəkil hissələrini `extractImageParts(messages)` vasitəsilə çıxarır
   (`visionBridgeHelpers.ts`); bu, kombo uyğunluq filtri ilə paylaşılan
   yeganə həqiqət mənbəyi olan `open-sse/utils/mediaParts.ts` faylındakı
   **vahid media detektoru** `detectMediaParts()` funksiyasına həvalə edir.
   Çıxarma, `replaceImageParts`-ın geri birləşdirə biləcəyi formalarla icazə
   siyahısına alınıb (extract↔replace müqaviləsi): OpenAI `image_url`,
   Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` və Responses API `input_image`. Claude Code
   `tool_result.content` və Responses alət çıxışları daxilində iç-içə
   yerləşən uyğun şəkillər də çıxarılır və orijinal yollarında əvəz edilir;
   yalnız-göstərici formalar kombo-filtr materialıdır və çıxarılmır.
   Heç biri tapılmasa, ötür.
3. İş vaxtı konfiqurasiyasını `resolveVisionBridgeRuntimeSettings()`
   vasitəsilə müəyyən edir (`src/shared/constants/modalityBridgeDefaults.ts`):
   yeni `modalityBridge*` parametr açarları üstün gəlir; köhnə (legacy)
   `visionBridge*` açarları **bir dövrlük ehtiyat** olaraq qalır (geri
   qaytarma pəncərəsi). Körpü deaktiv olduqda, hər hansı media gəzintisindən
   əvvəl ötür.
4. Rejim seçici (`modalityBridgeVisionMode`, aşağıdakı cədvələ baxın)
   yenidən yönləndirmə və təsvir arasında seçim edir. Yenidən yönləndirmə,
   yalnız `model` dəyişdirilmiş halda `modifiedPayload` və əlavə meta
   `{ rerouted, fromModel, toModel, imagesKept }` qaytarır.
5. Təsvir yolu: şəkilləri `maxImages` ilə məhdudlaşdırır, tapşırığa uyğun
   prompt-u qurur, təsvir keşini yoxlayır, görmə modelini **paralel**
   çağırır (`Promise.allSettled`) və onların yerinə
   `[Image N]: <description>` mətn hissələrini yerləşdirir. Uğursuz təsvir
   `null` qaytarır: xam şəkil naməlum/görmə qabiliyyətli hədəflər üçün
   saxlanılır (#4012), lakin **təsdiqlənmiş yalnız-mətn birbaşa hədəf** və
   ya sıfır-görmə kombosu hər təsvir olunmamış şəkil üçün — qismən
   uğursuzluqlar və təsvir çağırışı həddini aşan şəkillər daxil olmaqla —
   açıq `(unavailable — no vision-capable provider connected)` mətn
   saplaması alır (#17069). Bütün təsvirlərin uğursuz olduğu hallar üçün
   mövcud kombo təsvir ehtiyatı yerində qalır (#8430).
6. `modifiedPayload` + meta qaytarır (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Rejim seçici (`modalityBridgeVisionMode`)

| Rejim      | Defolt | Davranış                                                                                                                                                                                                                                                                                           |
| ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | Köhnə heuristika, toxunulmamış (#6640/#7204): kombo olmayan/`auto/` modellər orijinal modelin artıq istifadəyə yararlı etimadnamələri olmadıqca (o zaman describe) ən yaxşı görmə modelinə reroute edilir; kombo hədəflər həmişə describe edir.                                                    |
| `describe` |        | Həmişə describe — reroute bloku tamamilə ötürülür; istifadəçinin seçdiyi model həmişə cavab verir.                                                                                                                                                                                                 |
| `reroute`  |        | Məcburi reroute: etimadnaməsi olan modeli saxlama mühafizəsi yan keçilir. Reroute-**hədəfi** etimadnamə mühafizəsi hələ də qüvvədə qalır — istifadəyə yararlı görmə hədəfi mövcud olmadıqda, körpü təsvir etmək və ya xam şəkilləri yalnız-mətn hədəfə göndərmək əvəzinə aydın xəta ilə bloklayır. |

Məcburi rejimlər auto heuristikası işə düşməzdən **əvvəl** qısaqapanma edir;
`auto` davranışı PR-1-öncəsi mühafizə mexanizmi ilə bayt səviyyəsində eynidir.

#### API açarı əhatə dairəsi (`visionBridgeKeyScope.ts`)

Çağırışçının API açarı `allowedConnections`, kvota hovuzlarını
(`allowedQuotas`) və ya modelləri (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`) məhdudlaşdırdıqda,
körpü yalnız açarın istifadə edə biləcəyi reroute və describe modellərini,
açarın istifadə edə biləcəyi bağlantılarda seçir. Describe çağırışı sonra
həmişə `x-omniroute-self-loop-key-id` başlığı ilə OmniRoute self-loop-u
vasitəsilə keçir, beləliklə qəbul edən söhbət sorğusu həmin açarın bağlantı
və model siyasətini yenidən tətbiq edir. `enforceApiKeyPolicy()` bu başlığı
yalnız self-loop bearer-i ilə birlikdə nəzərə alır, ona görə də o, yalnız
girişi daralda bilər və həll olunmayan id rədd edilir.

Açar üçün heç bir görmə modelinə icazə verilmirsə, **təsdiqlənmiş
yalnız-mətn hədəfi** şəkil baytlarını qabiliyyətsiz upstream-ə
yönləndirmək əvəzinə şəkil sorğusunu yerli olaraq aydın HTTP 400 ilə
rədd edir (#17069). Görmə qabiliyyəti naməlum və ya yerli olan hədəflər
üçün describe yolu əvvəlki fail-open davranışını saxlayır
(meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Açarsız sorğular və bu məhdudiyyətləri olmayan açarlar dəqiq əvvəlki
kimi davranır.

#### Tapşırıqdan xəbərdar describe prompt-u (`modalityBridgeVisionTaskAware`)

Defolt **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`)
**son istifadəçi mesajının** mətnini (500 simvola kəsilmiş) əsas describe
prompt-una əlavə edir, təsviri istifadəçinin əslində nə soruşduğuna doğru
yönəldir (codex-vision-proxy nümunəsi) və görmə modelindən görünən mətni
transkripsiya etməsini xahiş edir. Bayraq sönük olduqda — və ya istifadəçi
mətni olmadıqda — əsas prompt dəyişilmədən istifadə olunur.

Describe self-loop-un öz OpenAI-uyğun sorğusu (`visionBridgeHelpers.ts`-dəki
`callVisionModelSingle()`) həmişə `image_url.detail: "high"` tələb edir —
qeyd-şərtsiz, hər çağırışçı/provayder üçün, heç bir müştəri siqnalından
asılı olmayaraq. Aşağı detallı nümunəgötürmə məhz bu prompt-un tələb etdiyi
mətn-transkripsiya tapşırığı üçün OCR dəqiqliyini pisləşdirir, ona görə də
describe çağırışının özü orijinal daxilolan sorğunun hansı detal səviyyəsindən
istifadə etməsindən asılı olmayaraq həmişə yüksək detal istəyir. Bu, yalnız
daxili describe sorğusunun gövdəsinə təsir edir; OmniRoute-un əsas sorğuda
çağırışçının öz `image_url.detail`-ını necə yönləndirdiyini dəyişmir —
həmin defolt ayrıca və yalnız aşkarlanmış OpenCode müştəriləri üçün
`defaultImageDetail()`-da (`open-sse/handlers/chatCore/upstreamBody.ts`)
tətbiq olunur. Describe self-loop-un Anthropic wire-format qolunda `detail`
sahəsi yoxdur və heç bir defoltdan təsirlənmir.

#### Describe çıxışının üst həddi (`modalityBridgeVisionMaxChars`)

| Açar                           | Defolt | Aralıq              |
| ------------------------------ | ------ | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` və ya 100–50000 |

`0` (defolt) **hədd yoxdur** deməkdir — `callVisionModel()` tərəfindən
qaytarılan təsvir dəyişilmədən ötürülür və mövcud davranış qorunur.
100–50000 aralığındakı istənilən dəyər təsviri `[Image N]: <description>`
kimi geri yerləşdirilməzdən əvvəl `…` sonluğu ilə kəsir
(`src/lib/guardrails/visionBridge.ts`-dəki `VisionBridgeGuardrail.preCall()`).
Downstream modelin tam transkripsiyaya ehtiyacı olduğu detal-yüklü OCR
tapşırıqları üçün bunu artırın; çox danışan görmə modellərində token
istifadəsini məhdudlaşdırmaq üçün azaldın. İdarəetmə paneli sahəsi Vision
tab-ının Advanced panelində yerləşir (`ModalityBridgeVisionTab.tsx`-dəki
`modality-bridge-max-chars`) və 1 ilə 99 arasındakı istənilən dəyəri 100
aşağı həddinə qaldırır, açıq şəkildə verilmiş `0`-ı isə toxunulmamış
saxlayır — `0` özü də tam etibarlı bir Zod dəyəridir
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), sadəcə
"təyin edilməmiş" defolt deyil.

#### Describe keşi (`modalityBridge/bridgeCache.ts`)

Describe çıxışları üçün yaddaşdaxili LRU + TTL keşi, proses səviyyəsində
paylaşılır. Açar = uzunluq-prefiks çərçivələməsi ilə
`sha256(imageRef + composedPrompt + configuredBridgeModel)` (sahə sərhədi
toqquşmaları yoxdur). Model komponenti **konfiqurasiya olunmuş** körpü
modelidir, əslində cavab verən model deyil — `callVisionModel` daxili olaraq
ehtiyat varianta keçə bilər və hər cəhd üzrə açarlama keşi
fraqmentləşdirərdi. Uğursuz describe-lar heç vaxt keşlənmir. Parametrlər:

| Açar                            | Defolt | Aralıq  |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Uzaq şəkil normallaşdırılması (self-loop describe/base64 əldə etmə)

Körpü **uzaq** şəkli özü əldə etdikdə — Anthropic describe özünə çağırışı və
claude-wire-format base64 çevrilməsi (`ensureBase64ImagesForClaudeWire`),
hər ikisi `visionBridgeHelpers.ts` faylındakı `fetchRemoteImageAsDataUri()`
vasitəsilə — yaranan data URI vision-model sorğusuna daxil edilməzdən əvvəl
`normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) vasitəsilə
keçirilir. Həddindən böyük şəkillər **2048px uzun tərəfə** qədər kiçildilir
(OpenAI/Anthropic-in server tərəfində artıq tətbiq etdiyi ölçü dəyişmə
limitinə uyğun), bu da vision modelin gördüyünü dəyişmədən yükləmə
baytlarını/gecikməni azaldır. Ölçü dəyişmə dinamik import ilə yüklənən
`sharp` istifadə edir: onun nativ binar faylının yüklənə bilmədiyi
platformada `normalizeDataUri()` **heç vaxt istisna atmır** — orijinal
baytların birbaşa keçidinə qayıdır, buna görə describe/base64-çevirmə yolu
həmişə işləməyə davam edir. Şəkil olmayan baytlar (deşifr edilə bilən şəkil
qaytarmayan əldə etmə) da dəyişdirilmədən keçirilir. Bu normallaşdırma
yalnız körpünün öz özünə çağırışı üçün əldə etdiyi şəkillərə aiddir — o,
çağıranın xam birbaşa keçid yükünə heç vaxt tətbiq edilmir, bu da yalnız
seçim əsasında dəyişiklik prinsipi ilə uyğundur (Sərt Qayda #20).

#### Tənzimləmələr sxemi + miqrasiya

Yeni `modalityBridge*` açarları `updateSettingsSchema`-da
(`src/shared/validation/settingsSchemas.ts`) Zod ilə yoxlanılır:
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCache*` üçlüyü və Audio Bridge-in istifadə etdiyi
`modalityBridgeAudio*` qrupu. `141_modality_bridge_settings.sql`
miqrasiyası mövcud köhnə `visionBridge*` dəyərlərini uyğun yeni açarlara
köçürür (idempotent, operator tərəfindən təyin edilmiş `modalityBridge*`
dəyərini heç vaxt üzərinə yazmır); köhnə açarlar bir buraxılış dövrü
ərzində oxuma ehtiyatı kimi qəbul edilməyə davam edir.

#### Şəffaflıq başlığı + statistika

Describe ilə transformasiya edilmiş cavablar
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
daşıyır (`modalityBridge/bridgeStats.ts`-də `buildModalityBridgeHeader()`
tərəfindən qurulur, `src/sse/handlers/chatHelpers.ts`-də
`withModalityBridgeHeader()` tərəfindən vurulur). Yenidən yönləndirilmiş
sorğular **heç bir** başlıq almır — yük dəyişdirilməyib və model dəyişikliyi
artıq cavab gövdəsindəki `model` sahəsində görünür.

`GET /api/modality-bridge/stats` (idarəetmə autentifikasiyası,
`GET /api/settings` ilə eyni səviyyə) `vision`, `audio` və `video` üçün
yaddaşda saxlanılan hər modalitet üzrə sayğacları `{ attempts, successes,
bridged, cacheHits, failures, totalLatencyMs, latencySamples,
averageLatencyMs, lastUsedAt }` qaytarır. `averageLatencyMs` məxrəc olaraq
bütün cəhdləri deyil, `latencySamples`-ı istifadə edir; vaxt ölçməsi
olmayan əməliyyat sıfır millisaniyəlik nümunə uydurmur. `bridged` uğurlu
çevrilmələr üçün geriyə uyğun ləqəb olaraq qalır; uğursuz cəhdlər onu
artırmır. Sayğaclar dizayn üzrə prosesin yenidən başladılmasında sıfırlanır
(telemetriya, mühasibat deyil).

#### İdarə paneli konfiqurasiyası

Xüsusi idarə paneli səhifəsi `/dashboard/settings/modality-bridge`-dir.
Onun URL ilə ünvanlana bilən `Vision`, `Audio` və `Video` vərəqləri `tab`
dəyərini dəyişərkən sorğu parametrlərini qoruyur. Vision vərəqi
aktivləşdirmə, rejim, model seçimi (avtomatik standart daxil olmaqla),
tapşırıqdan xəbərdar promptlar, genişləndirilmiş vaxt
aşımı/şəkil/təsvir-uzunluğu/keş limitləri, icra vaxtı sayğacları və qorunan
nümunə sorğusu təqdim edir. Audio vərəqi də aktivdir: o, aktivləşdirmə,
Auto ilə yalnız-STT model seçicisi, vaxt aşımı/maksimum-klip limitləri,
audio sayğacları və `input_audio` nümunə testi təqdim edir. Video vərəqi
funksionaldır: o, FFmpeg/ffprobe icra vəziyyətini bildirir — dörd aşkar UI
vəziyyətindən biri (yoxlama icra edilərkən və ya tamamlana bilmədikdə
`unknown`, yoxlamanın müştəri tərəfində keçildiyi loopback olmayan idarə
paneli hostunda `restricted`, yoxlanıb və olmadığı təsdiqləndikdən sonra
`unavailable`, yoxsa FFmpeg/ffprobe versiyaları ilə `available`) —
aktiv/model/kadr/video/vaxt-aşımı limitlərini saxlayır, model seçicisini
vision qabiliyyətli modellərə filterləyir və video sayğaclarını təqdim
edir.

AI tənzimləmələri altındakı əvvəlki Vision Bridge kartı yeni səhifəyə
uyğunluq keçididir; o, artıq formanın ikinci nüsxəsinə sahib deyil. Media
Providers həmçinin Image-to-Text və Speech-to-Text iş axınlarını mövcud
Speech-to-Text sınaq meydançasını silmədən müvafiq Modality Bridge
vərəqlərinə bağlayır.

**Self-loop qəbul bypass-ı:** describe çağırışı OmniRoute-un öz `/v1`
self-loop-u (qeyri-standart provayder modeli) vasitəsilə yönləndirildikdə,
alt-sorğu `x-omniroute-admission-bypass: internal` göndərir və həll edilmiş
self-loop etimadnaməsi ilə autentifikasiya olunur — lokal rejimdə lokal
`sk_omniroute` sentinel-i, yoxsa `REQUIRE_API_KEY=true` yerləşdirmələrinin
describe çağırışını yenə də icra edə bilməsi üçün operator tərəfindən
konfiqurasiya edilmiş `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env açarı
(#1350). Bypass yalnız həmin konkret etimadnamələr üçün qəbul edilir, buna
görə xarici müştərilər qəbulu atlamaq üçün başlıqdan istifadə edə bilməz.

Köhnə standart dəyərlər `src/shared/constants/visionBridgeDefaults.ts`-də
yerləşir; yeni rejim/tapşırıqdan-xəbərdar/keş standart dəyərləri və
tənzimləmələr həlledicisi `src/shared/constants/modalityBridgeDefaults.ts`-də
yerləşir. Mühafizə mexanizmi `deps` konstruktor seçimini açır ki, testlər
saxta `getSettings` və `callVisionModel` implementasiyalarını yeridə
bilsinlər.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Audio daxiletməsini qəbul etdiyi məlum olmayan hədəfə çatmazdan əvvəl audio
daşıyan söhbət sorğularını ələ keçirir. O, söhbət sorğusunu heç vaxt yenidən
yönləndirmir: audio hissələr mövcud OpenAI-uyğun multipart son nöqtəsi
vasitəsilə transkripsiya olunur və seçilmiş söhbət modeli mətn transkriptləri
ilə davam edir.

Axın:

1. `supportsAudio`-ı `getResolvedModelCapabilities()` vasitəsilə müəyyən edin. Açıq şəkildə
   göstərilmiş provider-registry metadatası üstün gəlir, sonra statik model
   metadatası, sonra sinxronlaşdırılmış `modalities_input`. `audio` ehtiva etməyən
   elan edilmiş giriş siyahısı `false` deməkdir; heç bir qabiliyyət dəlili
   olmadıqda `null` qalır. Həm `false`, həm də `null` ehtiyatlı körpünü
   aktivləşdirir, `true` isə onu yan keçir.
2. `modalityBridgeAudio*` parametrlərini müəyyən edin və paylaşılan
   `detectMediaParts()` detektoru vasitəsilə hər mesajdan splice edilə bilən
   yuxarı səviyyəli audio hissələri çıxarın. Dəstəklənən wire formaları OpenAI
   `input_audio`, `audio_url` və `source.media_type: "audio/*"`-dır. İç-içə audio
   marşrutlaşdırma üçün aşkarlanır, lakin splice yolu ilə silinmir. İş
   `modalityBridgeAudioMaxClips` ilə məhdudlaşdırılır; sonrakı hissələr
   toxunulmamış qalır.
3. Konfiqurasiya olunmuş `provider/model`-ə riayət edin, ya da
   `selectAudioBridgeModel()` funksiyasına icazə verin ki,
   `AUDIO_TRANSCRIPTION_PROVIDERS` siyahısını sabit kataloq sırası ilə gəzsin və
   istifadəyə yararlı aktiv provider etimadnaməsi olan ilk modeli seçsin.
4. `callAudioTranscription()` base64/data-URI audionu multipart `file`-a çevirir
   və ya DNS pinning və 25 MB məhdudiyyəti ilə yalnız-ictimai çıxış mühafizəsi
   vasitəsilə uzaq `audio_url`-i yükləyir. Sonra faylı və seçilmiş modeli
   `resolveSelfLoopBearer()` ilə autentifikasiya olunmuş lokal
   `/v1/audio/transcriptions` self-loop-a POST edir. Mövcud transkripsiya
   marşrutu normal etimadnamə axtarışı, cooldown/rate-limit emalı və provider
   yönləndirməsini həyata keçirir.
5. Uğurlu çağırışlar öz hissələrini `[Audio N]: <transcript>` ilə əvəz edir.
   Çağırışlar `Promise.allSettled` ilə işləyir: fərdi uğursuzluq həmin orijinal
   audio hissəni qoruyub saxlayır (#4012 kontraktı). Əgər bütün çağırışlar
   uğursuz olarsa və hədəfin `supportsAudio === false` olduğu sübut olunubsa,
   hissələr `[Audio N]: (unavailable — no STT provider connected)` olur (#8430
   kontraktı). Naməlum hədəf (`null`) üçün tam uğursuzluq nəticəsi toxunulmamış
   qalır. İstifadəyə yararlı STT etimadnaməsi olmayan, sübut olunmuş yalnız-mətn
   hədəf şəbəkə çağırışı etmədən eyni açıq stub-u alır.

Uğurlu transkriptlər proses səviyyəsində Modality Bridge LRU/TTL keşindən
istifadə edir. Açar audio istinadını, sabit `audio-transcription` əməliyyat
etiketini və seçilmiş STT modelini birləşdirir; uğursuzluqlar heç vaxt
keşlənmir. Audio cəhdləri paylaşılan `bridged`, `cacheHits`, `failures` və
`lastUsedAt` sayğaclarını yeniləyir. Transformasiya olunmuş cavablar
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` daşıyır;
toxunulmamış sorğular Audio Bridge seqmenti almır.

Runtime parametrləri verilənlər bazasında saxlanılır və Zod ilə təsdiqlənir:

| Açar                          | Defolt  | Aralıq                 |
| ----------------------------- | ------- | ---------------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                      |
| `modalityBridgeAudioModel`    | `""`    | Avtomatik və ya STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000            |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10                   |

Paylaşılan keş `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` və `modalityBridgeCacheMaxEntries` tərəfindən
idarə olunmağa davam edir.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Məlum yerli video dəstəyi olmayan hədəf çağırılmazdan əvvəl Chat Completions
`messages` və Responses API `input` içindəki yuxarı səviyyəli video hissələri ələ
keçirir. Dəstəklənən formalar `input_video`, `video_url`, `video_source`, HTTPS
URL-lər və `data:video/*;base64,...` data URI-lərdir. Mətn içindəki sadə fayl
adları video kimi qəbul edilmir.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) sorğu keçməsini,
qabiliyyət/siyasət yoxlanışını, sorğu başına aqreqasiyanı və cavab yükünü öz
üzərinə götürür. Video başına iş — əldə etmə, tam nəticə keşi, kadr
ardıcıllığının təsviri (çağırıcının elan etdiyi istənilən audio transkripti
birləşdirir) və cəhd başına metriklər/ləğv/təmizlik — `videoBridgePipeline.ts`
faylındakı `processVideoPart` arxasında gizlənib və `preCall` dövrünün içində hər
video hissə üçün bir dəfə çağırılır. Həmin modul həmçinin açıq port sərhədlərini
təyin edir: `VideoMediaBrokerPort` (baytların əldə edilməsi və nümunə kadrələrin
çıxarılması), `VideoAudioTranscriptionPort` (çağırıcının elan etdiyi audio
transkriptin nümunə izahlarla birləşdirilməsi) və `VideoDrilldownPort` (kadr
drill-down qalıcılıq sərhədi; hələ ki, `processVideoPart`-a qoşulmayıb — bu gün
drill-down qeydlərini yalnız ayrıca `/api/modality-bridge/video/drilldown`
marşrutu yazır).

İctimai `/v1` sorğu yolu heç vaxt altproses idxal etmir və ya işə salmır. Uzaq
videolar 50 MiB məhdudiyyəti ilə yüklənir; inline base64 videolar üçün
model/mesajlar/çərçivə zərfinin 50 MiB-lik ictimai JSON sorğu qəbul limitinin
içində qala bilməsi məqsədilə ehtiyatlı 36 MiB dekodlanmış video-başına limit
tətbiq olunur. Inline uzunluq və dekodlanmış ölçü təxminləri yaddaş ayrılmazdan
əvvəl yoxlanılır. İlkin uzaq URL və hər yönləndirmə üçün DNS pinning ilə mövcud
yalnız-ictimai çıxış mühafizəsindən istifadə edilməklə HTTPS tələb olunur. Sonra
baytlar dəqiq daxili `POST /api/modality-bridge/video/extract` broker sərhədini
keçir. Həmin marşrut həm `LOCAL_ONLY`, həm də `SPAWN_CAPABLE`-dır, yalnız proses
üzrə autentifikasiya olunmuş, etibarlı loopback sorğusunu qəbul edir və heç vaxt
URL, fayl sistemi yolu, icra faylı və ya arqument siyahısı qəbul etmir. API
body-size pipeline-ı və işləyicinin inkremental body oxuyucusu müstəqil olaraq
50 MiB broker giriş limitini tətbiq edir. Onun məhdudlaşdırılmış növbəsi eyni
anda bir çıxarma işlədir, dörd gözləmədə olan işə icazə verir və gözləyən girişi
100 MiB ilə məhdudlaşdırır.

Broker daxilində `ffprobe` özəl lokal faylı oxuyur; sabit format icazə
siyahısı pleylist və manifest formatlarını istisna edir. İcazə verilən
MOV-ailəsi konteynerləri üçün xarici MOV məlumat istinadları defolt olaraq
deaktiv qalır və sabit əmr onlara qoşulmur. Həm `ffprobe`, həm də `ffmpeg`
yalnız-`file` protokol ağ siyahısından, bir thread-dən, sabit arqument
massivlərindən istifadə edir, shell olmadan işləyir və icra olunan fayllar
`PATH`-dən tapılır. Qoşulmuş şəkil (attached-picture) üzlük axınları
oynadıla bilən namizədlər deyil. Bütün oynadıla bilən axınlar
məhdudiyyətlərə cavab verməlidir və deterministik ən aşağı indeksli ehtiyat
variantdan əvvəl açıq şəkildə göstərilmiş defolt axına üstünlük verilir.
Videolar 600 saniyə, hər ölçü üçün 8,192 piksel və 33,554,432 mənbə pikseli
ilə məhdudlaşdırılır. FFmpeg 1–16 orta nöqtəli (midpoint) JPEG kadrı
nümunə götürür, uzun kənarı kiçik girişləri böyütmədən ən çox 1,024 pikselə
qədər kiçildir və heç vaxt URL almır. Nümunə götürmə defolt olaraq
`uniform`-dur. İstəyə bağlı `scene_aware` və eksperimental `segment_aware`
siyasətləri artıq yoxlanılmış lokal axın üzərində bir əlavə sabit FFmpeg
keçidi icra edir, məhdudlaşdırılmış `showinfo` səhnə vaxt möhürlərini seçir
və detektor xətası, vaxt aşımı, düzgün olmayan çıxış və ya boş namizəd
çoxluğu halında deterministik şəkildə eyni uniform orta nöqtələrə qayıdır.
Segment-aware rejimi orta nöqtə nümunələrini yoxlanılmış səhnə intervallarına
mütənasib şəkildə bölüşdürür; segment-aware dəlilləri və ehtiyat davranış
aşağıda ətraflı izah olunur. Sərt 16-kadr həddi hər siyasətdə seçimdən sonra
tətbiq olunur. Scene-aware sorğunun yalnız bir kadr büdcəsi olduqda, o, aktiv
tam-video və ya fokus pəncərəsinin uniform orta nöqtəsindən istifadə edir və
`policyEffective: uniform` bildirir: seçilmiş tək bir səhnə kadrı hər iki
temporal ucu qoruya bilməz. Çağıran tərəf istəyə bağlı olaraq sonlu fokus
pəncərəsi (`start`/`end` saniyələri) təqdim edə bilər; sərhədlər media
müddətinə sıxılır (clamped), tərsinə çevrilmiş və ya qeyri-sonlu pəncərələr
rədd edilir və bütün nümunə götürmə siyasətləri yalnız normallaşdırılmış
interval daxilində icra olunur. Nəticədə yaranan pəncərə nümunə götürmə
metaməlumatlarına və etibarsız təsvir prefiksinə daxil edilir ki, aşağı axın
modellər fokuslanmış hissəni tam zaman xəttindən ayıra bilsinlər.

Semantik başlıq (caption) fokusu ayrıca, açıq bir parametrdır. Defolt `full`
analiz rejimi mövcud kadr promptunu qoruyur və sorğu mətnini heç vaxt başlıq
modelinə yönləndirmir. `focused` rejimində körpü (bridge) eyni Chat və ya
Responses konteynerindən yalnız istifadəçi tərəfindən yazılmış ən son
qeyri-boş `text`/`input_text`-i oxuyur, onu NFC-yə normallaşdırır,
idarəetmə simvollarını və boşluqları birləşdirir və 500 Unicode kod nöqtəsi
ilə məhdudlaşdırır. Boş nəticə dəqiq `full` promptuna qayıdır. İstifadəyə
yararlı ipucu xüsusi etibarsız-istifadəçi-konteksti blokunda JSON kimi
seriyalaşdırılır və yalnız müşahidə olunan təfərrüatlara üstünlük verə bilər;
o, mediada görünən və ya eşidilən təlimatlara əməl etməməyə dair ayrıca
xəbərdarlığı əvəz edə bilməz. Mətn fokusu heç vaxt `start`/`end` çıxarmır
və temporal nümunə götürəni dəyişmir.

#### FU-07 struktur segment dəlilləri

`segment_aware` artıq yoxlanılmış lokal video axını üzərində bir
məhdudlaşdırılmış ilkin-analiz keçidi istifadə edir. Sabit filtr zənciri
əvvəlcə ən çox 320 piksel enə miqyaslayır, səhnə dəyişikliklərini və donmuş
intervalları aşkarlayır, sonra bulanıqlıq, orta luma və məkan/zaman məlumatı
üçün saniyədə 1 kadr nümunə götürür. Keçid 600 struktur nümunə, bir
FFmpeg/filtr thread-i, eyni yalnız-`file` protokol və konteyner icazə
siyahıları, 1 MiB proses-çıxış həddi və brokerin paylaşılan ləğv/son tarix
daxilində ən çox 30 saniyə ilə məhdudlaşdırılır. O, sorğudan heç vaxt əmr,
filtr, yol və ya URL qəbul etmir.

Struktur dəyərlər deterministik nümunə dəlilləridir, semantik video anlayışı
deyil. Onlar subyektləri, hərəkətləri, başlıqları, nitqi və ya istifadəçi
niyyətini çıxarmır. Səhnə və donma sərhədləri seqmentlər əmələ gətirir;
donma əhatəsi, bulanıqlıq, ekspozisiya, məkan detalları və zaman dəyişikliyi
yalnız mövcud 1–16 kadr büdcəsinin necə bölüşdürülməsinə təsir edir.
Tamamilə donmuş seqment bir kadrla məhdudlaşdırılır, donmamış seqmentlər isə
qalan büdcə uğrunda rəqabət aparır. Sərhədlərin sayı kadrların sayını
üstələdikdə, uniform zaman xətti əhatəsi qorunur ki, sürətli erkən kəsimlər
uzun sonluq seqmentini gizlədə bilməsin. Donma sərhədinin 1 saniyəlik analiz
dəqiqliyi daxilində olan səhnə sərhədləri birləşdirilir.

Çatışmayan filtrlər, düzgün olmayan/boş dəlillər, detektor xətası və ya
məhdudlaşdırılmış ilkin-analiz vaxt aşımı dəqiq uniform orta nöqtə siyasətinə
fail-open rejimində qayıdır. Çağıran ləğvi və ya broker son tarixi fail-open
etmir: o, icra halında olan alt prosesi dayandırır, sonrakı kadr
çıxarılmasının qarşısını alır və özəl müvəqqəti ağac `finally` blokunda
silinir.

`scripts/perf/video-bridge-fu07-eval.ts` təkrarlanmazdan (dedup) sonra
başlıq-çağırışı qənaətləri, sıx-hərəkət büdcə bölgüsü,
bulanıqlıq/ekspozisiya/SI-TI dəlilləri, uzun quyruqlu sürətli kəsimlər və
tədrici-sönmə yalan müsbətləri üçün deterministik real FFmpeg test fiksturları
yaradır. O, ilkin-analiz faktiki vaxtını və `/usr/bin/time` mövcud olduqda
uşaq proses CPU-sunu və pik RSS-i qeyd edir. Onun keyfiyyət yoxlamaları
yalnız struktur orakullardır. Real başlıq-modeli keyfiyyəti `HOLD` olaraq
qalır, çünki bu qoşqunun səlahiyyətli son nöqtəsi və ya dondurulmuş
qiymətləndiricisi yoxdur. `--caption-cost-per-call-usd` açıq müsbət
hər-çağırış qiyməti təqdim etmədikcə, pul qənaətləri də `HOLD` olaraq qalır;
skript nəticələrin heç birini uydurmur.

Hər kadr 4 MiB ilə, bütün xam kadrlar birlikdə 23 MiB ilə, serializasiya olunmuş broker cavabı isə 32 MiB ilə məhdudlaşır. Şəxsi müvəqqəti qovluq `finally` blokunda silinir. OmniRoute FFmpeg-i paketinə daxil etmir və fərdi icra faylı yolunu qəbul etmir. Təsvirləmədən əvvəl körpü ehtiyatlı bir vizual deduplikasiya keçidi tətbiq edir: hər JPEG 16×16 boz çalarlı buferə endirilir və yalnız son saxlanılan kadrla müqayisə olunur. Bir kadrı ötən tələb olunmuş təsvir büdcəsi üçün çıxarılma həmin büdcənin iki qatına qədər, lakin heç vaxt 16 kadrdan çox olmayan məhdud namizəd hovuzu təmin edir. Tələb olunan limit yalnız deduplikasiyadan sonra tətbiq olunur; büdcə ən azı iki olduqda son incəltmə zamanı birinci və son seçilmiş namizədlər saxlanılır. Versiyalaşdırılmış `grayscale-16x16-mean-cells-v2` siyasəti orta luma fərqi ilə normallaşdırılmış fərqi ən azı 0.05 olan miniatür xanaların nisbətindən böyük olanını istifadə edir. Dublikat həddi proqnozlaşdırıla bilmək naminə seçilmiş və iş vaxtı parametri kimi açılmamış sabit 0.04-dür. Bu ikinci dərəcəli yüksək kontrastlı siqnal yalnız orta qiymət üzrə müqayisənin gizlədə biləcəyi kiçik hərəkətləri və görünən mətn dəyişikliklərini qoruyur. Müqayisəçi və ya dekoder xətaları açıq davranaraq uğursuz olur və əhatəni saxlayır. Çıxış metadatası çıxarılmış namizədləri, uğurla istifadə olunmuş kadrları və atılmış vizual dublikatları bir-birindən ayırır.

Açıq şəkildə işarələnmiş video hissəsi zaman möhürlü kontakt vərəqi tələb edə bilər. Körpü ən çox 4 sütunlu, 16 kadrlıq JPEG şəbəkəsi qurur. Hər 512 piksellik xana öz mənbə zaman möhürünü yüksək kontrastlı alt zolağa həkk edir, eyni zaman möhürləri isə sonrakı əlaqələndirmə və audit üçün mətn metadatasında da qalır. Tam JPEG 32 MiB ilə məhdudlaşdırılmış olaraq qalır. `sharp` şəbəkəni deşifrə edə və ya qura bilmirsə, körpü ayrı-ayrı JPEG kadrlarına qayıdır; müştəri tərəfindən dayandırma isə vərəq əməliyyatı vasitəsilə yenə də yayılır.

Promosiya sübutları sintetik kompozisiya mikrobenchmarkından qəsdən ayrı saxlanılır. `scripts/perf/video-bridge-contact-sheet-eval.ts` real OpenAI-uyğun görmə modelləri üçün sxem versiyalı A/B hərnəsi müəyyən edir. O, provayderin bildirdiyi tokenləri, ucdan-uca real gecikməni (vərəq yığımı daxil olmaqla), model çağırışlarının sayını və manifesdə müəyyən edilmiş faktların saxlanmasını ölçür. Xam model cavabları hesabata yazılmır; yalnız SHA-256 xəritələri və uyğunlaşdırılmış fakt ID-ləri saxlanılır. Hərnes `--execute-real` ötürülmədikcə və `--model`, `OMNIROUTE_BASE_URL` ilə `OMNIROUTE_API_KEY` konfiqurasiya edilmədikcə heç bir şəbəkə və ya ödənişli model çağırışı etmir. Bu açıq real icra olmadan onun maşın tərəfindən oxunan qərarı `HOLD` olaraq qalır; təkcə sintetik yük/çağırış sayı ölçmələri promosiya sübutu deyil.

Çağırışçılar artıq uyğunlaşdırılmış mətnə sahib olduqda dəstəklənən video hissəsinə istəyə bağlı `transcript.cues` massivi əlavə edə bilərlər. Hər kiy `text`, ölçülmüş müddətin daxilində sonlu `start`/`end` intervalı və icazə verilmiş siyahıda olan `source` (`client`, `embedded` və ya `audio-bridge`) daşımalıdır; `confidence` susmaya görə `1` olur və `0` ilə `1` arasında qalmalıdır. Dəqiq dublikat kiy-lər birləşdirilir. OmniRoute bu metadatadan heç vaxt transkripsiya başlatmır: yoxlanılmış kiy-lər mənbə, etibarlılıq və interval ilə təsvir edilmiş nəticəyə köçürülür və kadr təsvirləri ilə yanaşı etibarsız müşahidələr kimi göstərilir. Keçərsiz, diapazondan kənar və ya mənşəsiz mətn təsvir axınına qarışdırılmaq əvəzinə rədd edilir. Hər iki sorğu gövdəsi transkript kanalı verilmiş mənşəni — öz bəyan etdiyi `embedded` və ya `audio-bridge` etiketləri də daxil olmaqla — `client` dəyərinə normallaşdırır. Bu etibarlı etiketləri yalnız serverə məxsus adapter, yalnız koddan keçilə bilən `trustedSource` arqumenti vasitəsilə təyin edə bilər; sorğu JSON sahəsi həmin arqumentə çata bilməz. Transkript mətni mənşəyindən asılı olmayaraq etibarsız, mediadan törəyən məzmun olaraq qalır və heç vaxt səlahiyyət qərarını müəyyən etməməlidir.

Təcrübəli çağırışçı eyni video üçün `audioTranscript` trekini təqdim edə bilər; o, server transkripsiyasının sübutu deyil, müştərinin təqdim etdiyi mətn kimi qəbul edilir. Birləşmə qatı vizual və audio müşahidələri vahid son icra vaxtı və vahid dayandırma siqnalı altında işlədir, onları ümumi zaman oxunda sıralayır, dəqiq dublikatları birləşdirir və yalnız bir tərəf uğur qazandıqda qismən nəticə bildirir. Keçərsiz `audioTranscript` bütün videonun uğursuz olması əvəzinə həmin qismən nəticəyə enir — vizual təsvir saxlanılır, audio qolunda isə təmizlənmiş xəta kodu qeyd olunur. Qol üzrə əlçatanlıq, qismən bayraq və təmizlənmiş xəta kodları təsvir edilmiş nəticədə, guardrail metadatasında (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), nəticə keşinin metadatasında və körpünün birləşmə sayğaclarında saxlanılır. Susmaya görə Video Bridge yolu nitqi mətnə çevirmə işə salmır və ikinci media surətini yükləmir; həmin açıq trek olmadan o, yalnız video olaraq qalır.

**Transkriptin saxlanması (#12150 P1).** Bu, Video Bridge (özü seçim əsasında aktivləşdirilir) hər dəfə transkript işarəsini göstərdikdə avtomatik tətbiq olunur — ayrıca saxlanma bayrağı yoxdur. Sorğu hər hansı transkript işarəsini (çağıran tərəfindən elan edilmiş `transcript` və ya birləşdirilmiş `audioTranscript`) göstərdikdə qoruyucu mexanizm onu `videoBridgeObserved` kimi işarələyir və video təsvirinin maskalanmış kölgə nüsxəsini yaradır — hər işarənin sərbəst mətn gövdəsinin `[redacted-video-transcript]` ilə əvəz edildiyi eyni göstərim; bu, sətir yığılmazdan əvvəl strukturlaşdırılmış işarə sahəsinin əvəzlənməsi ilə qurulur (heç vaxt yastılanmış mətn təhlil edilmir, buna görə də heç bir işarə məzmunu — zərərli və ya adi, o cümlədən `[inaudible]`/`[music]` kimi `]` simvolu ehtiva edən gövdələr — qorunub qala bilməz). Saxlanılan çağırış jurnalı sorğusunun gövdəsində videodan törədilmiş hər mətn hissəsi məzmun bərabərliyinə əsasən uyğunlaşdırılaraq həmin maskalanmış kölgə nüsxəsi ilə əvəz edilir; `fullText` lövbəri çağırışdan əvvəlki tamamlanmış qoruyucu mexanizm yükündən yenidən oxunur, buna görə də sonrakı zəncir qoruyucu mexanizmləri (PII və giriş məlumatı maskalayıcıları, prioritetlər 10/95) təsvir mətnini yerində yenidən yazdıqdan və sistem göstərişi/ötürmə/yaddaş inyeksiyası mesaj massivinin formasını dəyişdirdikdən sonra belə uyğunlaşdırma uğurlu olur. Modelə yuxarı axın üzrə göndərilən gövdə dəyişmir. Müşahidə edilmiş sorğu həmçinin heç bir davamlı Memory doldurmur (həm sorğudan, həm də cavabdan törədilən çıxarış ötürülür), buna görə modelin öz cavabı transkript mətnini Memory-yə əks etdirə bilməz.

**Xam video sahələri (#12430).** Körpü aktiv olduqda və yerli video dəstəyinin mövcudluğu naməlum olduqda və ya belə dəstək olmadıqda, müəyyən edilmiş `transcript`/`audioTranscript` sahələri təsvir uğursuzluğundan və ya `maxVideos` limitindən sonra belə `videoBridgeObserved`-ı aktivləşdirir. `null` və boş sətirlər nəzərə alınır; mövcud olmayan sahələr və videoya aid olmayan metadata nəzərə alınmır. Saxlanılan nüsxələrdə bu sahələr maskalanır və ya sorğu buraxılır, keşlərdən və Memory-dən yan keçilir.

Həmin ehtiyat yollarda çağıranın etibarlı işarələri qeyri-standart provayder sahələri əvəzinə dəstəklənən `text`/`input_text` hissələrinə çevrilir. Sorğuda təqdim edilən hər iki trek etibarsız `client` müşahidələri olaraq qalır və videonun təsvir edilmədiyini, vaxt nişanlarının isə media ilə tutuşdurulmadığını bildirən açıq xəbərdarlıqla müşayiət olunur. Mövcud 256 işarə/64 KiB ümumi və hər işarə üzrə büdcələr iki trekə birlikdə tətbiq edilir; vaxt nişanları brokerin 600 saniyəlik yuxarı həddinə və təqdim edilmiş hər hansı fokus pəncərəsinə uyğun olmalıdır. Etibarsız treklər ixtiyari mətn kimi ötürülmür, atılır; onların birgə büdcəsi aşılmadığı halda etibarlı qardaş trek yenə də istifadə edilə bilər. Null/boş sahələr mətn əlavə etmir. Bu ehtiyat mexanizm heç bir media əldəetməsi və ya transkripsiya əlavə etmir. Transkript genişləndirmə sahələri ehtiyat video daşıyıcısından və onun `video_url`/`source` obyektlərindən silinir. OpenAI ötürmə formatının icazə siyahısı sərt qalır; yerli dəstəyi naməlum olan video daşıyıcıları əlçatan qalır, yalnız mətni dəstəklədiyi məlum olan hədəflər isə təhlükəsiz markerləri saxlayır. Strukturlaşdırılmış maskalama kölgələri əlavə edilmiş transkript mətnini qoruyur, çağırana məxsus orijinal sorğu isə dəyişməz qalır. Yerli dəstəyi olan hədəflər və deaktiv edilmiş körpülər mövcud yan keçmə davranışını saxlayır.

Əlavə saxlanılan nüsxələr eyni müşahidə edilmiş sorğu siqnalından istifadə edir. Qoruyucu mexanizmdən əvvəlki xam müştəri sorğusu ani görüntüsü, yaddaşdakı gözləyən sorğu və erkən rədd edilmiş sorğu jurnalı video hissələrindəki transkript sahələrini struktur şəkildə əvəz edir; konveyer mərhələləri və kontekst ötürməsi tərəfindən yaradılan sətir göstərişləri saxlanılan sorğu gövdəsi çıxışında maskalanır. Saxlanılan `video_content_removed` markeri `previous_response_id` davamının qəsdən atılmış mətni yenidən qurmaq əvəzinə təhlükəsiz şəkildə uğursuz olmasını təmin edir. Müşahidə edilmiş sorğu jurnala yazılmadan əvvəl hər hissə üzrə maskalama kölgəsini itirərsə və ya bir neçə video kölgəsindən hətta biri sonrakı sorğu dəyişikliklərindən sonra uyğun gəlməzsə, qismən maskalanmış transkriptin saxlanmasının qarşısını almaq üçün saxlanılan sorğu gövdəsi tamamilə buraxılır.

Müşahidə edilmiş sorğu üçün model cavabı strukturlaşdırılmış işarə sərhədi olmadan transkriptin istənilən hissəsindən sitat gətirə bilər. Buna görə də onun saxlanılan çağırış jurnalındakı `responseBody` sahəsi buraxılma markeri ilə əvəz edilir; ətraflı konveyer artefaktı (yuxarı axın/müştəri gövdələrini və axın fraqmentlərini ehtiva edə bilər) saxlanılmır. Semantik, idempotentlik və əsaslandırmanın təkrar icrası keşləri həmin sorğu üçün oxuma və yazmalardan yan keçir. Provayder sorğusu və müştəriyə görünən cavab dəyişməz qalır. Ətraflı artefakt buraxıldıqda erkən keepalive baytları müvəqqəti buferdən boşaldılır. Kiro-nun yanlış formatlı EventStream xəbərdarlığı heç vaxt məzmunu və ya JSON təhlilçisinin xam xətasını deyil, yalnız faydalı yükün bayt sayını bildirir.
Bu, əlaqəsiz hər bir provayder/plagin diaqnostikasının auditdən keçirildiyini iddia etmir; saxlanılan çıxış nöqtələrinin daha geniş yoxlanışı #11658-də izlənilir.

Daxili `/api/modality-bridge/video/drilldown` həyat dövrü ayrıca, loopback/token ilə autentifikasiya olunan keş alt sistemidir. Hər əməliyyat həmçinin kanonik qeyri-şəffaf subyekt identifikatoru tələb edir. İstehsal mühitindəki çağıran aktivləşdirilməzdən əvvəl həmin identifikatoru autentifikasiya edilmiş tenant-dan törətməli və müştəri tərəfindən seçilmiş dəyəri heç vaxt ötürməməlidir. Keş açarları həmin subyekti kanonik sessiya və video istinadı identifikatorlarına bağlayır, yalnız onların SHA-256 əsasında törədilmiş açarlarını saxlayır, həm oxumaları, həm də silməni eyni subyektlə məhdudlaşdırır. Keş hər qeyd üçün ən çoxu 16 törədilmiş JPEG kadrı saxlayır, on dəqiqədən sonra onların müddətini bitirir və məhdud `start`/`end` oxumalarını və ya sessiyanın açıq şəkildə silinməsini dəstəkləyir.

Hər subyekt 16 qeyd və 64 MiB kanonik JPEG məlumatı ilə məhdudlaşdırılır. Bu limitlər qlobal 64 qeyd/256 MiB yuxarı həddindən müstəqildir: subyekt kvotasının təzyiqi qlobal LRU çıxarılması nəzərdən keçirilməzdən əvvəl yalnız həmin subyektin ən uzun müddət istifadə edilməmiş qeydlərini çıxarır. Müddəti bitmiş qeydlər keş fəaliyyəti zamanı həm subyekt, həm də qlobal uçotdan təmizlənir, ləğvetmə və doğrulama uğursuzluğu isə qismən əvəzləməni təsdiqləmir.

Keş qeyri-kanonik Base64-u, artıq doldurmanı, JPEG olmayan medianı, natamam və ya kəsilmiş JPEG-ləri, həmçinin məhdudlaşdırılmış tam görüntü `sharp` dekodlaşdırması zamanı xəbərdarlıq yaradan JPEG-ləri rədd edir. O, qəbul edilən hər görüntünü kanonik JPEG kimi yenidən kodlaşdırır, çağıran sahələrinə güvənmək əvəzinə eni və hündürlüyü dekodlaşdırılmış baytlardan əldə edir və sondakı poliqlot baytları saxlamaq əvəzinə atır. Hər iki kvotaya yalnız məhdudlaşdırılmış kanonik sıxılmış bufer hesablanır. JSON xətti limiti 32 MiB dekodlaşdırılmış giriş həddi üçün Base64 əlavəsini də əhatə edir. Hər saxlanılan törəmə öz təsdiqlənmiş JPEG formatını/ölçüsünü, seçim siyasətini, törəmə versiyasını, yaradılma vaxtını, server tərəfindən hesablanmış məzmun heşini və heşlənmiş valideyn istinadını, eləcə də etibarlı çağıranın valideyn məzmunu heşini qeyd edir. Atomik keş təsdiqindən əvvəl asinxron dekodlaşdırma/heşləmə mərhələləri arasında ləğvetmə yoxlanılır.

Bu tranş hələ ki, istehsal prodüserini marşruta qoşmur və çoxölçülü variant seçimi təqdim etmir. Buna görə şəffaf Video Körpüsü sorğu yolu heç bir əlavə iş tələb etmir, icarəçiyə bağlı prinsipal törəməsi və tam FU-08 çoxölçülü həyat dövrü isə tamamlanmış davranış kimi sənədləşdirilmək əvəzinə açıq şəkildə sonrakı iş kimi qalır.

Kadrlar konfiqurasiya edilmiş Video modeli ilə ardıcıl olaraq təsvir edilir. Boş Video ləğvetməsi Vision parametrini miras alır; hər ikisi boşdursa, Vision avtomatik marşrutlaşdırıcısı effektiv görmə qabiliyyətli modeli seçir. Uğurlu təsvirlər orijinal hissəni sabit `[Video description:` prefiksi ilə əvəz edir ki, bu da mətni etibarsız media mənşəli müşahidə kimi işarələyir və sonrakı modellərə mediadakı təlimatlara əməl etməməyi bildirir. Kadr təsviri keş açarları JPEG baytlarını, sorğunu, vaxt möhürünü və effektiv modeli əhatə edir; yalnız uğurlu təsvirlər keşlənir. Keş qeydləri ehtiyat model daxil olmaqla faktiki uğurlu prodüser modelini saxlayır; fərqli kadrlar fərqli modellər tərəfindən istehsal olunanda körpü `mixed` bildirir. Keş uyğunluğu həmin prodüser kimliyini tələb olunan marşrutlaşdırma planı kimi yenidən etiketləmək əvəzinə yenidən istifadə edir. Bütöv video nəticə keşi çıxışı dəyişən hər giriş üzrə açarlanır — sorğu, effektiv model, seçim siyasəti, kadr sayı, semantik təhlil rejimi, normallaşdırılmış fokus göstərişinin SHA-256 barmaq izi, fokus pəncərəsi, `transcript`, `audioTranscript` və kontakt vərəqi bayrağı — buna görə bu ölçülərdən hər hansı birinin dəyişilməsi keş qaçırmasıdır, heç vaxt köhnə təkrar istifadə deyil. Vizual deduplikasiya siyasətinin versiyası, eşiyi və məhdudlaşdırılmış namizəd kadr sayı da nəticə keşi açarında və metaməlumatlarında açıq şəkildə göstərilir; buna görə siyasət dəyişikliyi köhnə bütöv video təsvirini təkrar istifadə edə bilməz. Nəticə keşi v4 metaməlumatları rejimi və barmaq izini saxlayır, heç vaxt xam istifadəçi tapşırığını yox. Qoruyucu metaməlumatları həm tələb olunan, həm də effektiv təhlil rejimlərini bildirir; istifadə edilə bilən istifadəçi mətni olmadan tələb olunan `focused` rejimi effektiv olaraq `full` kimi bildirilir.

Qoruyucu dəstəklənən hər video hissəsini çıxarır, lakin `modalityBridgeVideoMaxVideos`-dan çoxunu təsvir etmir. `supportsVideo === false` olduğu sübut edilmiş hədəf üçün uğursuz və limiti aşan videolar açıq təhlükəsiz mətn markerlərinə çevrilir ki, heç bir xam video qalmasın. Qabiliyyət naməlum olduqda, həmin hissələr öz video daşıyıcılarını saxlayır; hər hansı ehtiyat transkript yuxarıdakı məhdudlaşdırılmış mətn çevrilməsinə əməl edir. `supportsVideo === true` olan hədəflər körpünü yan keçir. Müştəri sorğusunun dayandırma siqnalı yükləmə, broker növbəsi, alt proseslər və təsvir çağırışları boyunca yayılır; dayandırmalar videolar arasında dayanır və heç vaxt uğursuzluq halında xam mediaya açılmır.

İcra parametrləri verilənlər bazasında saxlanır və Zod ilə təsdiqlənir:

| Açar                                | Defolt      | Aralıq / davranış                                                                                                   |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | İstəyə bağlı icra, seçimlə aktivləşdirilən                                                                          |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` ümumi təsvirləri saxlayır; `focused` məhdudlaşdırılmış, etibarsız son istifadəçi kontekstindən istifadə edir |
| `modalityBridgeVideoModel`          | `""`        | Vision Körpüsü modelini miras alır                                                                                  |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` və ya proporsional `segment_aware`; detektor uğursuzluğu `uniform`-a qayıdır               |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                 |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                      |

120 saniyədən yuxarı köhnə saxlanılmış Video vaxt aşımı dəyərləri broker son müddətinə məhdudlaşdırılır; həmin limitdən yuxarı yeni parametrlər yazıları rədd edilir. `GET /api/modality-bridge/video/runtime` autentifikasiya və ya icra mühiti yoxlamasından əvvəl etibarlı möhürlənmiş loopback lokallığı tələb edir, sonra isə idarəetmə autentifikasiyası tələb edir. O, yalnız `available`, təmizlənmiş FFmpeg/ffprobe versiyalarını və icra mühiti əlçatan olmadıqda sabit bir səbəb qaytarır. Daxili çıxarış nöqtəsi ictimai yükləmə API-si deyil: növbə doyması `503` və `Retry-After` qaytarır, çağıranın ayrılması `499` qaytarır, sabit broker son müddəti isə `504` qaytarır. Çevrilmiş cavablar mərkəzi `x-omniroute-modality-bridge` başlığına Vision və ya Audio seqmentlərini silmədən `video->text;model=<visionModel>;parts=<videos>` əlavə edir.

### PII Masker (`piiMasker.ts`)

**Hər iki** mərhələdə işləyir.

- **`preCall`** yükü klonlayır, `system`, `messages`, `input` və
  `prompt` (düz sətir elementləri daxil olmaqla) üzərindən keçir və sətir tipli
  `content`/`text` sahələrinə `processPII()` funksiyasını
  (`@/shared/utils/inputSanitizer`-dən) tətbiq edir. `PII_REDACTION_ENABLED=true`
  olduqda, aşkar edilmiş PII gedən yükdə maskalanır. Bu,
  `INPUT_SANITIZER_MODE`-dan müstəqildir (o, yalnız prompt inyeksiyası siyasətini
  idarə edir). Maskalama sönülü olduqda, çağırış məzmunu yenidən yazmadan yalnız
  aşkarlama saylarını qeyd edir.
- **`postCall`** cavabı dərin klonlayır, `sanitizePIIResponse()` funksiyasını və
  Responses-API-forma maskalayıcısını (`maskResponsesOutput` — `output_text` və
  `output[].content[].text` sahələrini əhatə edir) işə salır. Hər hansı maskalama
  baş verərsə, dəyişdirilmiş cavab orijinalı əvəz edir.

Qoruyucu heç vaxt bloklamır; o, yalnız annotasiya edir (`meta.detections`,
`meta.redacted`) və ya yenidən yazır.

#### Tip üzrə seçim, xüsusi nümunələr və aşkarlama sayğacları

**İdarə paneli → Parametrlər → Təhlükəsizlik → PII maskalama** _nəyin_
maskalanacağını seçir. O, maskalamayı aktivləşdirmir: bu, hələ də
`PII_REDACTION_ENABLED` (sorğu) və `PII_RESPONSE_SANITIZATION` (cavab + SSE)
vasitəsilə olur — hər ikisi defolt olaraq sönülüdür.

- **Tip üzrə seçim** — daxili identifikatorlar
  `src/shared/constants/piiTypes.ts` faylında (`PII_BUILTIN_TYPES`) sadalanır.
  Təyin edilməmiş halda bütün tiplər nəzərdə tutulur (bu parametr yaranmamışdan
  əvvəlki davranış). Sorğu mühərrikinin `ssn_us` nümunəsi `ssn`-ə
  uyğunlaşdırılır. Şablonlar (Minimal, Standard, Financial, Brazilian, USA,
  Full) yalnız İİ-dəki seçim qutularını doldurur.
- **Xüsusi nümunələr** — 20-ə qədər regex və ya wildcard nümunəsi (`*` = 64-ə
  qədər boşluq olmayan simvol, `?` = bir). Uyğunluqlar `[CUSTOM_REDACTED]` olur.
  Hər nümunə `compilePiiCustomPattern()` funksiyasından keçir
  (`src/shared/utils/piiCustomPatterns.ts`): maksimum 500 simvol, flag-lər
  `g i m s u` ilə məhdudlaşır, kompilyasiya olunmalıdır, `safe-regex`
  yoxlamasından keçməlidir (katastrofik geri izləmə) və boş sətirə və ya
  maskalama yer tutucusuna uyğun gəlməməlidir. Yoxlamadan keçməyən nümunə
  saxlanılarkən və test edilərkən rədd edilir, yoxlamadan keçməyən saxlanmış
  sətir isə icra vaxtı kompilyasiya olunmaq əvəzinə atlanır. Xüsusi nümunələr
  yalnız maskalama aktivkən işləyir.
- **Aşkarlama sayğacları** — tip üzrə saylar (heç vaxt uyğun gələn dəyərlər
  deyil), yaddaşda saxlanılır və yenidən başladıldıqda sıfırlanır
  (`src/lib/pii/piiDetectionStats.ts`). Onlar yalnız maskalama aktivkən artır.

Parametrlər `key_value` cədvəlində saxlanılır (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) və 1 saniyəlik keş vasitəsilə oxunur. API:

| Metod  | Yol                      | Məqsəd                                                                        |
| ------ | ------------------------ | ----------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Flaq vəziyyəti, `enabledTypes`, `customPatterns`, aşkarlama sayğacları        |
| `PUT`  | `/api/settings/pii`      | `enabledTypes` (`null` = hamısı) və/və ya `customPatterns` dəyərini əvəz edir |
| `POST` | `/api/settings/pii/test` | Bir nümunəni ən çox 8 KB-lıq sınaq mətninə qarşı yoxlayır; heç nə saxlanılmır |

Hər üçü idarəetmə autentifikasiyası tələb edir və gövdəni Zod ilə yoxlayır
(`src/shared/validation/schemas/piiSettings.ts`).

### Prompt inyeksiyası (`promptInjection.ts`)

İstifadəçi tərəfindən təqdim edilən məzmunda düşmən strukturları aşkar edir və
konfiqurasiya edilmiş siyasəti tətbiq edir. Davranış mühit dəyişənləri və
konstruktor seçimləri ilə idarə olunur:

| Parametr   | Mühit dəyişəni                                                                                        | Defolt | Təsir                                                                                                                                                                                                      |
| ---------- | ----------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aktiv      | `INPUT_SANITIZER_ENABLED`                                                                             | `true` | `false` olduqda, qoruyucu baypas olunur.                                                                                                                                                                   |
| Rejim      | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn` | İnyeksiya siyasəti: `block`, `warn` və ya `log`. (`redact` geriyə uyğunluq üçün qəbul edilir, lakin inyeksiya mətnini **silmir**; sorğuda PII yenidən yazılması `PII_REDACTION_ENABLED` ilə idarə olunur.) |
| Blok həddi | `blockThreshold` seçimi / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Bloklama üçün tələb olunan minimum ciddiyyət səviyyəsi. Defolt olaraq Medium yalnız müşahidə üçündür.                                                                                                      |

**Rejim prioriteti** (`getMode`): çağıran tərəfin `options.mode` →
`INJECTION_GUARD_MODE` üçün **DB feature-flag ləğvi** (İdarə paneli → Parametrlər →
Funksiya bayraqları) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Buna görə də idarə paneli ləğvi mühit dəyişənlərini üstələyir, yəni
Funksiya bayraqları İİ-si işləyən qoruyucunu canlı olaraq idarə edir (yenidən
başlatma olmadan). DB oxunuşu fail-safe-dir: səhv baş verərsə, qoruyucu mühit
dəyişənlərinə əsaslanan davranışa qayıdır və heç bir ləğv təyin edilmədikdə
davranış yalnız-env həlli ilə tam eyni olur.

Aşkarlama mənbələri:

1. `@/shared/utils/inputSanitizer`-dən `sanitizeRequest()` (pipeline-ın başqa
   yerlərində də istifadə olunan paylaşılan detektor dəsti).
2. Daxili `DEFAULT_GUARD_PATTERNS` (hazırda `system_override_inline` və
   `markdown_system_block`, hər ikisi `high` ciddiyyətli).
3. Konstruktor seçimləri vasitəsilə ötürülən istəyə bağlı `customPatterns`
   (sətirlər, regex-lər və ya `{ name, pattern, severity }` qeydləri).

`mode === "block"` olduqda **və** ən azı bir aşkarlama ciddilik həddinə çatdıqda, `preCall` `{ block: true, message: "Request rejected: suspicious content detected" }` qaytarır. `warn`/`log` rejimlərində guardrail jurnala yazır, lakin çağırışa icazə verir. Reyestrdən keçmədən promptları qiymətləndirmək istəyən çağırışçılar üçün paylaşılan köməkçi `evaluatePromptInjection()` da ixrac olunur.

**Skan həddi (v3.8.20):** detektor yalnız birləşdirilmiş prompt mətninin **ilk 16 KB**-ını yoxlayır — `src/shared/utils/inputSanitizer.ts` faylında `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bayt). Həm `detectInjection()`, həm də `evaluatePromptInjection()` nümunə dövrünü işə salmazdan əvvəl `slice(0, MAX_INJECTION_SCAN_BYTES)` tətbiq edir. İnyeksiya direktivləri girişin yuxarı hissəsində yerləşir, buna görə də bu, aşkarlamanı zəiflətmədən bir neçə yüz KB-lıq yüklərdə regex CPU/GC sərfini məhdudlaşdırır (bax: #3932, #4041).

### Kimlik Məlumatlarının Maskalayıcısı (`credentialMasker.ts`)

**Hər iki** mərhələdə işləyir, standart zəncirdə sonuncudur (prioritet `95`). Məşhur API-açar / gizli token nümunələrini gedən yük (mesaj məzmunu, alət çağırışı arqumentləri, alət nəticələri) **və** provayder cavabından gizlədir, beləliklə prompta yapışdırılan (və ya alət nəticəsi ilə geri qaytarılan) kimlik məlumatları nə yuxarı axın provayderinə, nə də müştəriyə sızmır.

- **Yalnız istəyə bağlı (opt-in)**, PII gizlətməsi ilə eyni konvensiya (Sərt Qayda #20-ə bitişik): `settings.credentialRedactionEnabled === true` **və ya** `CREDENTIAL_REDACTION_ENABLED=true` olmadıqca sönülüdür. Söndürüldükdə guardrail no-op-dur — nə heç vaxt bloklayır, nə də yenidən yazır.
- `redactCredentials()` tam yük/cavab ağacını gəzir (`walkValue()`, prototip çirklənməsinə qarşı təhlükəsiz, `WeakSet` vasitəsilə dövrlərə qarşı təhlükəsiz) və uyğunluqları `[REDACTED:<type>]` yer tutucusu ilə əvəz edir, yalnız həqiqətən dəyişən budaqları klonlayır.
- `CREDENTIAL_PATTERNS` LLM provayder açarlarını (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokenlərini (GitHub, Slack, Linear, Notion, npm, Postman, Discord), ödəniş açarlarını (Stripe, Square), bulud açarlarını (AWS giriş açarı, Twilio, SendGrid, Mailgun), özəl açarları / JWT-ləri, kimlik məlumatı daşıyan qoşulma sətirlərini (`mongodb://user:pass@...` və s.) və ümumi `Authorization`/`x-api-key`/`api-key`/`apikey` başlıq-dəyər nümunəsini əhatə edir. Başlıq formalı açarlar (`authorization`, `x-api-key`, `api-key`, `apikey`) ümumi mətn regex-i əvəzinə struktur şəkildə gizlədilir (yalnız dəyər, `Bearer `/`Basic ` kimi sxem prefiksi qorunur).
- Guardrail heç vaxt bloklamır; o, yalnız yenidən yazır (`modifiedPayload` / `modifiedResponse`) və annotasiya edir (`meta.credentialsRedacted`, `meta.count`).

Reqressiya mühafizəsi: `tests/unit/credential-masker-guardrail.test.ts`.

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
