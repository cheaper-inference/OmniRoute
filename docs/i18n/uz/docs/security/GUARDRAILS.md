# Guardrails (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Haqiqat manbai:** `src/lib/guardrails/`
> **Oxirgi yangilangan:** 2026-10-17 — v3.8.52 (qo'shildi: [Qamrov va cheklovlar](#coverage-and-limits):
> hook'lar qaysi marshrutlar va javob yo'llariga yetishi, birlashtirilgan o'chirish sarlavhalari (#16412), majburiy chegara sifatida in'eksiyani bloklash rejimi (#16413) va post-call'dan oldin javobni nima ko'rishi)

Guardrail'lar OmniRoute va yuqori oqim provayderlari o'rtasidagi chegarada xavfsizlik, siyosat va kontent transformatsiyalarini amalga oshiradi. Har bir guardrail so'rov yuklamalarini (`preCall`) va yuqori oqim javoblarini (`postCall`) tekshirishi (va ixtiyoriy ravishda rad etishi, transformatsiya qilishi yoki izohlashi) mumkin.

Tizim **fail-open** tamoyilida ishlaydi: agar guardrail bajarilish paytida xatolik tashlasa, reyestr xatolikni qayd etadi va so'rovni muvaffaqiyatsiz qilish o'rniga keyingi guardrail bilan davom etadi. Bloklash aniq qarordir (`block: true`), hech qachon tasodif emas. Yagona istisno — bekor qilingan so'rov: chaqiruvchining `signal`i bekor qilinganda, xatolik tashlagan guardrail o'tkazib yuborilish o'rniga hook ishga tushirilishini rad etadi.

Hook'lar har bir marshrutda yoki har bir javobda ishga tush**maydi**. Guardrail'ga xavfsizlik nazorati sifatida tayanishdan oldin [Qamrov va cheklovlar](#coverage-and-limits) bo'limini o'qing.

## O'rnatilgan guardrail'lar

Reyestr import paytida oltita guardrail'ni ustuvorlik tartibida avtomatik yuklaydi
(qarang: `registry.ts` → `registerDefaultGuardrails()`):

| Ustuvorlik | Nomi                | Bosqich(lar)   | Fayl                  |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Kichikroq ustuvorlik raqamlari **birinchi** ishga tushadi.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

GLM 5.3 bazaviy modeli va `glm-5.3-{low,high,max}` aniq `supportsVision:false` reyestr/spec metama'lumotlariga ega. GLM 5.3 Flash variantlari native-vision modellari bo'lib qoladi. Claude Code'ning `/v1/messages` marshruti Claude'dan OpenAI'ga tarjima qilishdan **oldin** umumiy `handleChat` pre-call guardrail zanjiriga kiradi; ichiga joylashtirilgan `Read` tool-result rasmlari shu tarjima ularni OpenAI `image_url` kontentiga ko'tarishidan oldin tavsiflanishi yoki qayta ishlanishi kerak (#17069).

Rasm o'z ichiga olgan va **vision qo'llab-quvvatlamaydigan modellarga** qaratilgan so'rovlarni ushlab qoladi hamda butun so'rovni vision qobiliyatiga ega modelga qayta yo'naltiradi yoki rasm qismlarini yuqori oqim chaqiruvidan oldin sozlanadigan vision modeli tomonidan ishlab chiqarilgan matn tavsiflari bilan almashtiradi. Bu faqat-matn provayderlarga multimodal yuklamalarni shaffof tarzda qayta ishlash imkonini beradi.

Ishlash tartibi:

1. Maqsadli model vision'ni allaqachon qo'llab-quvvatlasa, o'tkazib yuboradi
   (agar u majburiy-bridge ro'yxati `isVisionBridgeForcedModel` ichida ko'rinmasa).
2. Rasm qismlarini `extractImageParts(messages)` orqali ajratib oladi
   (`visionBridgeHelpers.ts`), u esa combo moslik filtri bilan baham ko'riladigan
   yagona haqiqat manbai — `open-sse/utils/mediaParts.ts` ichidagi **yagona media
   detektori** `detectMediaParts()`ga topshiradi. Ajratib olish `replaceImageParts`
   qayta joylashtira oladigan shakllarga allowlist qilingan (extract↔replace
   shartnomasi): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`,
   Anthropic URL `source.type:"url"` va Responses API `input_image`. Claude Code
   `tool_result.content` va Responses tool chiqishlari ichiga joylashtirilgan mos
   rasmlar ham ajratib olinadi va asl yo'llarida almashtiriladi; faqat-indikator
   shakllar combo-filtr materiali hisoblanadi va ajratib olinmaydi.
   Hech narsa topilmasa, o'tkazib yuboradi.
3. Runtime konfiguratsiyasini `resolveVisionBridgeRuntimeSettings()` orqali aniqlaydi
   (`src/shared/constants/modalityBridgeDefaults.ts`): yangi `modalityBridge*`
   sozlash kalitlari ustun keladi; eski `visionBridge*` kalitlari **bir tsikllik
   zaxira** sifatida qoladi (qaytarish oynasi). Bridge o'chirilgan bo'lsa, har qanday
   media ko'zdan kechirilishidan oldin o'tkazib yuboradi.
4. Rejim selektori (`modalityBridgeVisionMode`, quyidagi jadvalga qarang) qayta
   yo'naltirish yoki tavsiflashni hal qiladi. Qayta yo'naltirish faqat `model`
   almashtirilgan `modifiedPayload`ni, shuningdek `{ rerouted, fromModel, toModel, imagesKept }`
   metasini qaytaradi.
5. Tavsiflash yo'li: rasmlarni `maxImages` bilan cheklaydi, vazifani hisobga oluvchi
   promptni tuzadi, tavsif keshiga murojaat qiladi, vision modelini **parallel**
   chaqiradi (`Promise.allSettled`) va ularning o'rniga `[Image N]: <description>`
   matn qismlarini kiritadi. Muvaffaqiyatsiz tavsif `null` qaytaradi: xom rasm
   noma'lum/vision qobiliyatli maqsadlar uchun saqlanadi (#4012), lekin
   **tasdiqlangan faqat-matn to'g'ridan-to'g'ri maqsad** yoki nol-vision combo har
   bir tavsiflanmagan rasm uchun — qisman muvaffaqiyatsizliklar va tavsif-chaqiruvi
   chegarasidan oshgan rasmlarni ham qo'shgan holda — aniq
   `(unavailable — no vision-capable provider connected)` matn stub'ini oladi
   (#17069). Barchasi muvaffaqiyatsiz bo'lgan combo tavsifi uchun mavjud zaxira
   mexanizmi o'z joyida qoladi (#8430).
6. `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`) qaytaradi.

#### Rejim selektori (`modalityBridgeVisionMode`)

| Rejim      | Standart | Xatti-harakat                                                                                                                                                                                                                                                                                                            |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔        | Eski heuristika, tegilmagan (#6640/#7204): combo boʻlmagan/`auto/` modellar eng yaxshi vision modelga qayta yoʻnaltiriladi, agar asl model allaqachon foydalanish mumkin boʻlgan credential'larga ega boʻlmasa (bunday holda describe); combo nishonlar har doim describe qilinadi.                                      |
| `describe` |          | Har doim describe — reroute bloki butunlay oʻtkazib yuboriladi; foydalanuvchi tanlagan model har doim javob beradi.                                                                                                                                                                                                      |
| `reroute`  |          | Majburiy reroute: credentialli modelni saqlab qolish himoyasi chetlab oʻtiladi. Reroute-**nishon** credential himoyasi baribir amal qiladi — foydalanish mumkin boʻlgan vision nishon mavjud boʻlmaganda, bridge describe qilish yoki xom tasvirlarni faqat-matn nishonga yuborish oʻrniga aniq xatolik bilan bloklaydi. |

Majburiy rejimlar auto heuristikasi ishga tushishidan **oldin** short-circuit qiladi; `auto` xatti-harakati PR-1 dan oldingi guardrail bilan bayt-anigʻlikda bir xil.

#### API-kalit doirasi (`visionBridgeKeyScope.ts`)

Chaqiruvchining API kaliti `allowedConnections`, kvota havzalarini
(`allowedQuotas`) yoki modellarni (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`) cheklaganda,
bridge faqat kalitga ruxsat etilgan ulanishlarda, kalit foydalanishi mumkin
boʻlgan reroute va describe modellarni tanlaydi. Keyin describe chaqiruvi
har doim `x-omniroute-self-loop-key-id` sarlavhasi bilan OmniRoute
self-loop orqali oʻtadi, shu tufayli qabul qiluvchi chat soʻrovi oʻsha
kalitning ulanish va model siyosatini yana bir bor qoʻllaydi.
`enforceApiKeyPolicy()` bu sarlavhani faqat self-loop bearer bilan birga
e'tirof etadi, shuning uchun u faqat kirishni toraytirishi mumkin, va
aniqlanmaydigan id rad etiladi.

Agar kalit uchun hech qanday vision modelga ruxsat boʻlmasa, **tasdiqlangan
faqat-matn nishon** tasvir baytlarini qobiliyatsiz upstreamga uzatish
oʻrniga soʻrovni mahalliy ravishda aniq HTTP 400 bilan rad etadi (#17069).
Vision qobiliyati noma'lum yoki mahalliy boʻlgan nishonlar uchun describe
yoʻli oldingi fail-open xatti-harakatini saqlab qoladi (meta
`{ skipped: true, reason: "no_permitted_vision_model" }`).
Kalitsiz soʻrovlar va bu cheklovlarga ega boʻlmagan kalitlar avvalgidek
xatti-harakat qiladi.

#### Vazifaga sezgir describe prompti (`modalityBridgeVisionTaskAware`)

Standart **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`)
asosiy describe promptiga **oxirgi foydalanuvchi xabari** matnini (500
belgigacha qisqartirilgan holda) qoʻshadi, bu tavsifni foydalanuvchi aslida
nima soʻraganiga yoʻnaltiradi (codex-vision-proxy namunasi) va vision
modeldan koʻrinib turgan matnni transkripsiya qilishni soʻraydi. Bayroq
oʻchirilganida — yoki foydalanuvchi matni boʻlmaganda — asosiy prompt
oʻzgarishsiz qoʻllanadi.

Describe self-loop'ning oʻz OpenAI-mos soʻrovi
(`visionBridgeHelpers.ts` dagi `callVisionModelSingle()`) har doim
`image_url.detail: "high"` soʻraydi — shartsiz, har bir
chaqiruvchi/provayder uchun, hech qanday mijoz signaliga bogʻlanmagan
holda. Past batafsillikdagi sampling aynan shu prompt soʻraydigan
matn-transkripsiya vazifasi uchun OCR aniqligini pasaytiradi, shuning
uchun describe chaqiruvining oʻzi asl kiruvchi soʻrov qaysi batafsillik
darajasidan foydalanganidan qat'i nazar, har doim yuqori batafsillik
soʻraydi. Bu faqat ichki describe soʻrovining tanasiga taʼsir qiladi; u
OmniRoute asosiy soʻrovda chaqiruvchining oʻz `image_url.detail`
qiymatini qanday uzatishini oʻzgartirmaydi — bu standart alohida
qoʻllanadi va faqat aniqlangan OpenCode mijozlari uchun,
`defaultImageDetail()` da (`open-sse/handlers/chatCore/upstreamBody.ts`).
Describe self-loop'ning Anthropic wire-format tarmogʻida `detail` maydoni
mavjud emas va ikkala standartdan ham taʼsirlanmaydi.

#### Describe chiqishi chegarasi (`modalityBridgeVisionMaxChars`)

| Kalit                          | Standart | Diapazon           |
| ------------------------------ | -------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`      | `0` yoki 100–50000 |

`0` (standart) **chegarasiz** deganini anglatadi — `callVisionModel()`
qaytargan tavsif oʻzgartirilmasdan oʻtkazilib, mavjud xatti-harakat
saqlanadi. 100–50000 diapazonidagi istalgan qiymat tavsifni
`[Image N]: <description>` sifatida qayta kiritilishidan oldin `…`
suffiksi bilan qisqartiradi (`src/lib/guardrails/visionBridge.ts` dagi
`VisionBridgeGuardrail.preCall()`). Quyi oqim (downstream) modeliga toʻliq
transkripsiya kerak boʻlgan, batafsillikka boy OCR vazifalari uchun bu
qiymatni oshiring; sergap vision modellarda token sarfini cheklash uchun
pasaytiring. Dashboard maydoni Vision yorligʻining Advanced panelida
joylashgan (`ModalityBridgeVisionTab.tsx` dagi `modality-bridge-max-chars`)
va 1 dan 99 gacha boʻlgan har qanday qiymatni 100 pastki chegarasiga qadar
clamp qiladi, aniq kiritilgan `0` ni esa tegmaydi — `0` oʻz-oʻzidan
toʻlaqonli Zod qiymati
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`),
shunchaki "oʻrnatilmagan" standart emas.

#### Describe keshi (`modalityBridge/bridgeCache.ts`)

Describe chiqishlari uchun operativ xotiradagi LRU + TTL kesh, butun
jarayon boʻylab umumiy. Kalit =
`sha256(imageRef + composedPrompt + configuredBridgeModel)`,
uzunlik-prefiks freymingi bilan (maydon chegaralari toʻqnashuvisiz). Model
komponenti **sozlangan** bridge modeli, haqiqatda javob bergan model emas —
`callVisionModel` ichki ravishda fallback qilishi mumkin va har urinish
boʻyicha kalitlash keshni parchalab yuborardi. Muvaffaqiyatsiz tugagan
describe'lar hech qachon keshlanmaydi. Sozlamalar:

| Kalit                           | Standart | Diapazon |
| ------------------------------- | -------- | -------- |
| `modalityBridgeCacheEnabled`    | `true`   | —        |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440   |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000  |

#### Masofaviy rasm normalizatsiyasi (self-loop describe/base64 yuklab olish)

Koʻprik **masofaviy** rasmni oʻzi yuklab olganda — Anthropic describe self-chaqirigʻi va claude-wire-format base64 konvertatsiyasi (`ensureBase64ImagesForClaudeWire`), ikkalasi ham `visionBridgeHelpers.ts` dagi `fetchRemoteImageAsDataUri()` orqali — natijada olingan data URI vision-model soʻroviga joylashtirilishidan oldin `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) orqali oʻtkaziladi. Haddan tashqari katta rasmlar **2048px uzun tomon**ga kichraytiriladi (bu OpenAI/Anthropic server tomonida allaqachon qoʻllaydigan resize chegarasiga mos keladi), bu esa vision model koʻradigan narsani oʻzgartirmasdan yuklash baytlari/kechikishni qisqartiradi. Oʻlchamni oʻzgartirish dinamik import orqali yuklanadigan `sharp` dan foydalanadi: native binari yuklanmaydigan platformada `normalizeDataUri()` **hech qachon xato tashlamaydi** — u asl baytlarni oʻzgartirmasdan oʻtkazib yuborishga (passthrough) qaytadi, shuning uchun describe/base64-konvertatsiya yoʻli har doim ishlashda davom etadi. Rasm boʻlmagan baytlar (dekodlanadigan rasm qaytarmagan fetch) ham tegilmasdan oʻtkaziladi. Bu normalizatsiya faqat koʻprik oʻz self-chaqirigʻi uchun yuklab oladigan rasmlarga tegishli — u hech qachon chaqiruvchining xom passthrough yuklamasiga qoʻllanmaydi, bu esa faqat rozilik asosidagi (opt-in-only) mutatsiya prinsipiga muvofiq (Qattiq qoida №20).

#### Sozlamalar sxemasi + migratsiya

Yangi `modalityBridge*` kalitlari `updateSettingsSchema` da (`src/shared/validation/settingsSchemas.ts`) Zod orqali tekshiriladi: `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` uchligi va Audio Bridge tomonidan ishlatiladigan `modalityBridgeAudio*` guruhi. `141_modality_bridge_settings.sql` migratsiyasi mavjud eski `visionBridge*` qiymatlarini mos keluvchi yangi kalitlarga nusxalaydi (idempotent, operator oʻrnatgan `modalityBridge*` qiymatini hech qachon qayta yozmaydi); eski kalitlar bir reliz tsikli davomida oʻqish zaxira varianti (read fallback) sifatida qabul qilinishda davom etadi.

#### Shaffoflik sarlavhasi + statistika

Describe bilan transformatsiya qilingan javoblar
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
sarlavhasini olib yuradi (u `modalityBridge/bridgeStats.ts` dagi `buildModalityBridgeHeader()` tomonidan yaratiladi, `src/sse/handlers/chatHelpers.ts` dagi `withModalityBridgeHeader()` tomonidan qoʻyiladi). Qayta yoʻnaltirilgan soʻrovlar **hech qanday** sarlavha olmaydi — yuklama tegilmagan edi va model almashtirilishi javob tanasining `model` maydonida allaqachon koʻrinib turadi.

`GET /api/modality-bridge/stats` (boshqaruv autentifikatsiyasi, `GET /api/settings` bilan bir xil daraja) `vision`, `audio` va `video` uchun xotiradagi (in-memory) modality boʻyicha hisoblagichlarni
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` qaytaradi. `averageLatencyMs` maxraj sifatida barcha urinishlarni emas, balki `latencySamples` ni ishlatadi; vaqt oʻlchovisiz operatsiya nol millisekundli namuna toʻqimaydi. `bridged` muvaffaqiyatli konvertatsiyalar uchun orqaga muvofiqlik taxallusi boʻlib qoladi; muvaffaqiyatsiz urinishlar uni oshirmaydi. Hisoblagichlar jarayon qayta ishga tushirilganda loyihaviy jihatdan qayta oʻrnatiladi (bu telemetriya, hisob-kitob emas).

#### Boshqaruv paneli konfiguratsiyasi

Maxsus boshqaruv paneli sahifasi —
`/dashboard/settings/modality-bridge`. Uning URL orqali murojaat qilinadigan `Vision`, `Audio` va `Video` tablari `tab` qiymatini almashtirishda soʻrov parametrlarini saqlab qoladi. Vision tabi yoqish, rejim, model tanlash (avtomatik standart bilan birga), vazifaga mos soʻrov (task-aware prompting), kengaytirilgan timeout/rasm/tavsif-uzunligi/kesh chegaralari, runtime hisoblagichlari va himoyalangan namuna soʻrovini taqdim etadi. Audio tabi ham faol: u yoqish, Auto bilan faqat-STT model tanlagich, timeout/maksimal-klip chegaralari, audio hisoblagichlari va `input_audio` namuna testini taqdim etadi. Video tabi ishlaydi: u FFmpeg/ffprobe runtime holatini xabar qiladi — toʻrtta aniq UI holatidan biri (tekshiruv davom etayotganda yoki tugallana olmaganda `unknown`, tekshiruv mijoz tomonida oʻtkazib yuboriladigan loopback boʻlmagan boshqaruv paneli hostida `restricted`, tekshirilgach yoʻqligi tasdiqlanganda `unavailable` yoki FFmpeg/ffprobe versiyalari bilan `available`) — yoqish/model/kadr/video/timeout chegaralarini saqlaydi, model tanlagichni vision qobiliyatli modellarga filtrlaydi va video hisoblagichlarini taqdim etadi.

AI sozlamalari ostidagi avvalgi Vision Bridge kartasi yangi sahifaga muvofiqlik havolasi hisoblanadi; u endi formaning ikkinchi nusxasiga ega emas. Media Providers ham Image-to-Text va Speech-to-Text ish oqimlarini mavjud Speech-to-Text playground'ini olib tashlamasdan tegishli Modality Bridge tablariga bogʻlaydi.

**Self-loop kirishni chetlab oʻtish:** describe chaqirigʻi OmniRoute'ning oʻz `/v1` self-loop'i orqali yoʻnaltirilganda (nostandart provayder modeli), kichik soʻrov `x-omniroute-admission-bypass: internal` yuboradi va hal qilingan self-loop maʼlumotnomasi bilan autentifikatsiya qilinadi — lokal rejimda lokal `sk_omniroute` sentineli yoki operator sozlagan `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` muhit kaliti (#1350), shunday qilib `REQUIRE_API_KEY=true` joylashtirishlari ham describe chaqirigʻini ishga tushira oladi. Chetlab oʻtish faqat aynan shu maʼlumotnomalar uchun qabul qilinadi, shuning uchun tashqi mijozlar kirishdan oʻtish uchun bu sarlavhani ishlata olmaydi.

Eski standart qiymatlar `src/shared/constants/visionBridgeDefaults.ts` da joylashgan; yangi rejim/vazifaga-mos/kesh standartlari va sozlamalar hal qiluvchisi `src/shared/constants/modalityBridgeDefaults.ts` da joylashgan. Guardrail testlar soxta `getSettings` va `callVisionModel` implementatsiyalarini kiritishi uchun `deps` konstruktor opsiyasini taqdim etadi.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Audio kirishni qabul qilishi nomaʼlum boʻlgan maqsadga yetib borishidan oldin audio qismli chat soʻrovlarini ushlab qoladi. U chat soʻrovini hech qachon qayta yoʻnaltirmaydi: audio qismlar mavjud OpenAI-mos multipart endpoint orqali transkripsiya qilinadi va tanlangan chat modeli matn transkriptlar bilan davom etadi.

Oqim:

1. `supportsAudio` ni `getResolvedModelCapabilities()` orqali aniqlang. Aniq
   provider-registry metama'lumotlari ustun keladi, so'ng statik model
   metama'lumotlari, keyin sinxronlashtirilgan `modalities_input`. `audio` siz
   e'lon qilingan kirish ro'yxati `false` deb hisoblanadi; qobiliyat haqida
   dalil bo'lmasa, `null` qoladi. `false` ham, `null` ham konservativ ko'prikni
   faollashtiradi, `true` esa uni chetlab o'tadi.
2. `modalityBridgeAudio*` sozlamalarini aniqlang va umumiy `detectMediaParts()`
   detektori orqali har bir xabardan kesish mumkin bo'lgan yuqori darajadagi
   audio qismlarni ajratib oling. Qo'llab-quvvatlanadigan uzatish (wire)
   shakllari — OpenAI `input_audio`, `audio_url` va
   `source.media_type: "audio/*"`. Ichma-ich joylashgan audio marshrutlash
   uchun aniqlanadi, lekin splice yo'li orqali o'chirilmaydi. Ish
   `modalityBridgeAudioMaxClips` bilan cheklangan; keyingi qismlar
   o'zgarmaydi.
3. Sozlangan `provider/model` ga amal qiling, aks holda
   `selectAudioBridgeModel()` ga `AUDIO_TRANSCRIPTION_PROVIDERS` ni barqaror
   katalog tartibida kezish va foydalanish mumkin bo'lgan faol provayder hisob
   ma'lumotiga ega birinchi modelni tanlash imkonini bering.
4. `callAudioTranscription()` base64/data-URI audioni multipart `file` ga
   aylantiradi yoki masofaviy `audio_url` ni DNS pinning va 25 MB chegarasi
   bilan mavjud faqat-ommaviy chiquvchi himoyachi (outbound guard) orqali
   yuklab oladi. Keyin fayl va tanlangan modelni `resolveSelfLoopBearer()`
   bilan autentifikatsiya qilingan mahalliy `/v1/audio/transcriptions`
   self-loop qo'ng'irog'iga POST qiladi. Mavjud transkripsiya marshruti oddiy
   hisob ma'lumotlarini qidirish, cooldown/rate-limit boshqaruvi va
   provayderga yo'naltirishni bajaradi.
5. Muvaffaqiyatli qo'ng'iroqlar o'z qismlarini `[Audio N]: <transcript>` bilan
   almashtiradi. Qo'ng'iroqlar `Promise.allSettled` bilan bajariladi: alohida
   xato asl audio qismni saqlab qoladi (#4012 kontrakti). Agar barcha
   qo'ng'iroqlar muvaffaqiyatsiz bo'lsa va maqsadning `supportsAudio === false`
   ekanligi isbotlangan bo'lsa, qismlar
   `[Audio N]: (unavailable — no STT provider connected)` ga aylanadi
   (#8430 kontrakti). Noma'lum maqsad (`null`) uchun to'liq muvaffaqiyatsiz
   natija o'zgarmaydi. Foydalanish mumkin bo'lgan STT hisob ma'lumotisiz
   isbotlangan faqat-matn maqsad tarmoq qo'ng'irog'ini amalga oshirmasdan
   xuddi shu aniq stubni oladi.

Muvaffaqiyatli transkriptlar butun jarayon bo'ylab Modality Bridge LRU/TTL
keshidan foydalanadi. Kalit audio havolasi, barqaror `audio-transcription`
operatsiya yorlig'i va tanlangan STT modelini birlashtiradi; xatolar hech
qachon keshlanmaydi. Audio urinishlar umumiy `bridged`, `cacheHits`,
`failures` va `lastUsedAt` hisoblagichlarini yangilaydi. O'zgartirilgan
javoblar
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` ni olib
yuradi; o'zgartirilmagan so'rovlar Audio Bridge segmentini olmaydi.

Ish vaqti (runtime) sozlamalari ma'lumotlar bazasida saqlanadi va Zod bilan
tekshiriladi:

| Kalit                         | Standart | Oraliq           |
| ----------------------------- | -------- | ---------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                |
| `modalityBridgeAudioModel`    | `""`     | Avto yoki STT ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10             |

Umumiy kesh `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` va
`modalityBridgeCacheMaxEntries` orqali boshqariladi.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Ma'lum native video qo'llab-quvvatlashiga ega bo'lmagan maqsad chaqirilishidan
oldin Chat Completions `messages` va Responses API `input` dagi yuqori
darajadagi video qismlarni ushlab qoladi. Qo'llab-quvvatlanadigan shakllar —
`input_video`, `video_url`, `video_source`, HTTPS URLlar va
`data:video/*;base64,...` data URIlari. Matndagi oddiy fayl nomlari video
sifatida qaralmaydi.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) so'rovni kezish,
qobiliyat/siyosat tekshiruvi, har bir so'rov bo'yicha agregatsiya va javob
yukini (payload) o'z zimmasiga oladi. Har bir video bo'yicha ish — olish,
butun-natija keshi, kadr ketma-ketligini tasvirlash (bu chaqiruvchi e'lon
qilgan har qanday audio transkriptni birlashtiradi) va har bir urinish
bo'yicha metrikalar/abort/tozalash — `videoBridgePipeline.ts` dagi
`processVideoPart` ortida yashiringan bo'lib, u `preCall` sikli ichida har bir
video qism uchun bir marta chaqiriladi. Bu modul, shuningdek, aniq port
chegaralarini belgilaydi: `VideoMediaBrokerPort` (baytlarni olish va namuna
olingan kadrlarni ajratib olish), `VideoAudioTranscriptionPort` (chaqiruvchi
e'lon qilgan audio transkriptni namuna olingan tavsiflar bilan birlashtirish)
va `VideoDrilldownPort` (kadr drill-down saqlash chegarasi; hali
`processVideoPart` ga ulanmagan — hozircha drill-down yozuvlarini faqat
alohida `/api/modality-bridge/video/drilldown` marshruti yozadi).

Ommaviy `/v1` so'rov yo'li hech qachon subjarayonni import qilmaydi yoki ishga
tushirmaydi. Masofaviy videolar 50 MiB chegarasi bilan yuklab olinadi; ichki
(inline) base64 videolar uchun har bir video bo'yicha 36 MiB konservativ
dekodlangan chegara mavjud, shunda model/messages/framing qopqog'i 50 MiB
ommaviy JSON so'rov qabul qilish chegarasi ichida qolishi mumkin. Ichki
uzunlik va dekodlangan hajm baholari xotira ajratishdan oldin tekshiriladi.
Boshlang'ich masofaviy URL va har bir redirect uchun HTTPS talab qilinadi,
bunda mavjud faqat-ommaviy chiquvchi himoyachi DNS pinning bilan ishlatiladi.
Keyin baytlar aniq ichki `POST /api/modality-bridge/video/extract` broker
chegarasidan o'tadi. Bu marshrut bir vaqtda `LOCAL_ONLY` ham, `SPAWN_CAPABLE`
ham hisoblanadi, faqat jarayon darajasida autentifikatsiya qilingan, ishonchli
loopback so'rovni qabul qiladi va hech qachon URL, fayl tizimi yo'li,
bajariladigan fayl yoki argumentlar ro'yxatini qabul qilmaydi. API body-size
konveyeri va ishlov beruvchining bosqichma-bosqich body o'quvchisi 50 MiB
broker kirish chegarasini mustaqil ravishda ta'minlaydi. Uning chegaralangan
navbati bir vaqtda bitta ajratishni bajaradi, to'rtta kutilayotgan ishga
ruxsat beradi va kutilayotgan kirishni 100 MiB bilan cheklaydi.

Broker ichida `ffprobe` maxfiy lokal faylni oʻqiydi; belgilangan formatlar ruxsatnomasi pleylist va manifest formatlarini istisno qiladi. Ruxsat etilgan MOV oilasidagi konteynerlar uchun tashqi MOV maʼlumot havolalari sukut boʻyicha oʻchiq qoladi va belgilangan buyruq ularni faollashtirmaydi. `ffprobe` ham, `ffmpeg` ham faqat `file` protokoliga ruxsat beruvchi oq roʻyxatdan, bitta oqimdan (thread), belgilangan argument massivlaridan foydalanadi, shellsiz ishlaydi va ijro fayllar `PATH` dan topiladi. Biriktirilgan rasm muqova oqimlari oʻynatiladigan nomzodlar emas. Barcha oʻynatiladigan oqimlar cheklovlarga javob berishi shart va aniq belgilangan standart oqim deterministik eng past indeksli zaxira variantdan oldin afzal koʻriladi. Videolar 600 soniya, har bir oʻlchov boʻyicha 8,192 piksel va 33,554,432 manba pikseli bilan cheklangan. FFmpeg 1–16 ta oʻrta nuqtadagi JPEG kadrni namuna oladi, uzun chekkani kichikroq kirishlarni kattalashtirmasdan eng koʻpi 1,024 pikselgacha kichraytiradi va hech qachon URL olmaydi. Namuna olish sukut boʻyicha `uniform`. Ixtiyoriy `scene_aware` va eksperimental `segment_aware` siyosatlari allaqachon tekshirilgan lokal oqim boʻylab bitta qoʻshimcha belgilangan FFmpeg oʻtishini bajaradi, cheklangan `showinfo` sahna vaqt tamgʻalarini tanlaydi va detektor xatosi, vaqt tugashi, notoʻgʻri chiqish yoki boʻsh nomzodlar toʻplami holatida deterministik tarzda xuddi shu bir tekis oʻrta nuqtalarga qaytadi. Segmentga asoslangan rejim oʻrta nuqta namunalarini tekshirilgan sahna intervallariga mutanosib ravishda taqsimlaydi; segmentga asoslangan dalillar va zaxira xatti-harakati quyida batafsil bayon etiladi. Qattiq 16 kadr chegarasi har bir siyosatda tanlovdan keyin qoʻllanadi. Sahnaga asoslangan soʻrovda faqat bitta kadr byudjeti boʻlsa, u faol toʻliq video yoki fokus oynasining bir tekis oʻrta nuqtasidan foydalanadi va `policyEffective: uniform` deb xabar beradi: bitta tanlangan sahna kadri vaqtning ikkala chekkasini ham saqlab qola olmaydi. Soʻrovchi ixtiyoriy ravishda cheklangan fokus oynasini (`start`/`end` soniyalari) berishi mumkin; chegaralar media davomiyligiga qisqartiriladi, teskari yoki cheksiz oynalar rad etiladi va barcha namuna olish siyosatlari faqat normallashtirilgan interval ichida bajariladi. Natijada hosil boʻlgan oyna namuna olish metamaʼlumotlariga va ishonchsiz tavsif prefiksiga kiritiladi, shunda quyi oqimdagi modellar fokuslangan parchani toʻliq vaqt shkalasidan ajrata oladi.

Semantik izoh fokusi alohida, aniq sozlama. Sukut boʻyicha `full` tahlil rejimi mavjud kadr promptini saqlaydi va soʻrov matnini izoh modeliga hech qachon uzatmaydi. `focused` rejimida koʻprik faqat bir xil Chat yoki Responses konteyneridagi soʻnggi boʻsh boʻlmagan, foydalanuvchi yozgan `text`/`input_text` ni oʻqiydi, uni NFC ga normallashtiradi, boshqaruv belgilari va boʻshliqlarni birlashtiradi hamda 500 ta Unicode kod nuqtasi bilan cheklaydi. Boʻsh natija aynan `full` promptiga qaytadi. Foydali ishora alohida ishonchsiz-foydalanuvchi-konteksti blokida JSON sifatida seriyalanadi va faqat kuzatiladigan tafsilotlarni ustuvor qilishi mumkin; u mediada koʻrinadigan yoki eshitiladigan koʻrsatmalarga amal qilishdan qaytaruvchi alohida ogohlantirishni bekor qila olmaydi. Matnli fokus hech qachon `start`/`end` ni taxmin qilmaydi va vaqtinchalik namuna oluvchini oʻzgartirmaydi.

#### FU-07 strukturaviy segment dalillari

`segment_aware` allaqachon tekshirilgan lokal video oqimi boʻylab bitta cheklangan oldindan tahlil oʻtishidan foydalanadi. Belgilangan filtr zanjiri avval kenglikni eng koʻpi 320 pikselgacha kichraytiradi, sahna oʻzgarishlari va muzlagan intervallarni aniqlaydi, soʻngra xiralashuv, oʻrtacha yorqinlik (luma) hamda fazoviy/vaqtinchalik maʼlumot uchun soniyasiga 1 kadr namuna oladi. Bu oʻtish 600 ta strukturaviy namuna, bitta FFmpeg/filtr oqimi, xuddi shu faqat `file` protokoli va konteyner ruxsatnomalari roʻyxatlari, 1 MiB jarayon chiqishi chegarasi hamda brokerning umumiy bekor qilish/muddat chegarasi ichida eng koʻpi 30 soniya bilan cheklangan. U hech qachon soʻrovdan buyruq, filtr, yoʻl yoki URL qabul qilmaydi.

Strukturaviy qiymatlar deterministik namuna olish dalillaridir, semantik video tushunish emas. Ular subyektlar, harakatlar, izohlar, nutq yoki foydalanuvchi niyatini keltirib chiqarmaydi. Sahna va muzlash chegaralari segmentlarni hosil qiladi; muzlash qamrovi, xiralashuv, ekspozitsiya, fazoviy tafsilot va vaqtinchalik oʻzgarish faqat mavjud 1–16 kadr byudjetining qanday taqsimlanishiga taʼsir qiladi. Toʻliq muzlagan segment bitta kadr bilan cheklanadi, muzlamagan segmentlar esa qolgan byudjet uchun raqobatlashadi. Chegaralar kadrlardan koʻp boʻlganda, tezkor dastlabki kesishlar uzun oxirgi segmentni yashira olmasligi uchun vaqt shkalasining bir tekis qamrovi saqlanadi. Muzlash chegarasining 1 soniyalik tahlil aniqligi ichidagi sahna chegaralari birlashtiriladi.

Yetishmayotgan filtrlar, notoʻgʻri/boʻsh dalillar, detektor xatosi yoki cheklangan oldindan tahlil vaqtining tugashi aynan bir tekis oʻrta nuqta siyosatiga ochiq xatoga (fail-open) oʻtadi. Soʻrovchi bekor qilishi yoki broker muddati ochiq xatoga oʻtmaydi: u bajarilayotgan quyi jarayonni tugatadi, keyingi kadr ajratishning oldini oladi va maxfiy vaqtinchalik daraxt `finally` ichida oʻchiriladi.

`scripts/perf/video-bridge-fu07-eval.ts` deduplikatsiyadan keyingi izoh-chaqiruv tejashlari, zich harakat byudjeti taqsimoti, xiralashuv/ekspozitsiya/SI-TI dalillari, uzun quyruqli tezkor kesishlar hamda asta-sekin soʻnish (gradual fade) yolgʻon musbat natijalari uchun deterministik haqiqiy FFmpeg fiksturalarini yaratadi. U oldindan tahlilning soat vaqtini (wall time) va `/usr/bin/time` mavjud boʻlgan joylarda bola jarayon CPU si hamda eng yuqori RSS ni qayd etadi. Uning sifat tekshiruvlari faqat strukturaviy orakullardir. Haqiqiy izoh modeli sifati `HOLD` holatida qoladi, chunki bu garnessda vakolatli endpoint yoki muzlatilgan hakam yoʻq. Pul tejalishi ham `HOLD` holatida qoladi, agar `--caption-cost-per-call-usd` har bir chaqiruv uchun aniq ijobiy baho taqdim etmasa; skript hech qachon bu natijalarning birortasini toʻqib chiqarmaydi.

Har bir kadr 4 MiB bilan cheklangan, barcha xom kadrlar birgalikda 23 MiB bilan,
seriyalangan broker javobi esa 32 MiB bilan cheklangan. Maxsus vaqtinchalik
katalog `finally` ichida o'chiriladi. OmniRoute FFmpeg ni o'z tarkibiga kiritmaydi
va maxsus bajariladigan fayl yo'lini qabul qilmaydi. Taglavhalashdan oldin
ko'prik ehtiyotkor vizual takrorlarni olib tashlash bosqichini qo'llaydi: har bir
JPEG 16×16 kulrang buferga kichraytiriladi va faqat oxirgi saqlab qolingan kadr
bilan taqqoslanadi. Bir kadr dan ortiq so'ralgan taglavha byudjeti uchun
ekstraksiya ushbu byudjetning ikki baravarigacha va hech qachon 16 kadr dan
oshmaydigan cheklangan nomzodlar havzasini taqdim etadi. So'ralgan chegara faqat
takrorlarni olib tashlashdan keyin qo'llanadi; byudjet kamida ikki bo'lganida
yakuniy siyraklashtirish paytida birinchi va oxirgi tanlangan nomzodlar saqlab
qolinadi. Versiyalangan
`grayscale-16x16-mean-cells-v2` siyosati o'rtacha yorqinlik (luma) deltasi va
normallashtirilgan deltasi kamida 0.05 bo'lgan miniatyura kataklari nisbati
orasidan kattaroq bo'lganini ishlatadi. Takror chegarasi doimiy 0.04 ga teng
bo'lib, u ish vaqti sozlamasi sifatida ochilmay, balki bashorat qilish oson
bo'lishi uchun tanlangan. Ushbu ikkilamchi yuqori kontrastli signal faqat o'rtacha
qiymat bo'yicha taqqoslash yashirib qolishi mumkin bo'lgan kichik harakatlar va
ko'rinadigan matn o'zgarishlarini saqlab qoladi. Komparator yoki dekoder xatolari
jarayonni to'xtatmaydi (fail open) va qamrov saqlanadi. Chiqish metama'lumotlari
ajratib olingan nomzodlarni, muvaffaqiyatli ishlatilgan kadrlarni va tushirib
qoldirilgan vizual takrorlarni bir-biridan ajratadi.

Aniq belgilangan video qismi vaqt tamg'ali kontakt varag'ini so'rashi mumkin.
Ko'prik ko'pi bilan 4 ustunli, 16 kadr li JPEG panjarasini yaratadi. Har bir
512 pikselli katak o'z manba vaqt tamg'asini yuqori kontrastli pastki tasmaga
singdirib yozadi, xuddi shu vaqt tamg'alari esa keyingi bog'lash va audit uchun
matnli metama'lumotlarda ham saqlanadi. To'liq JPEG 32 MiB bilan cheklangan
bo'lib qoladi. Agar `sharp` panjarani dekodlay olmasa yoki yaratolmasa, ko'prik
alohida JPEG kadrlariga qaytadi; mijoz tomonidan bekor qilish esa varaq
operatsiyasi orqali baribir tarqaladi.

Mahsulotga ko'tarish (promotion) dalillari ataylab sintetik kompozitsiya
mikrobenchmarkidan ajratilgan. `scripts/perf/video-bridge-contact-sheet-eval.ts`
haqiqiy OpenAI-mos ko'rish modellari uchun sxema bo'yicha versiyalangan A/B sinov
g'ilofini belgilaydi. U provayder xabar qilgan tokenlarni, uchidan-uchigacha
(end-to-end) real vaqt kechikishini (varaq kompozitsiyasini ham o'z ichiga olgan
holda), model chaqiruvlari sonini va manifestda belgilangan faktlarni ushlab
qolishni o'lchaydi. Modelning xom javoblari hisobotga yozilmaydi; faqat SHA-256
xeshlari va mos kelgan fakt ID lari saqlanadi. G'ilov `--execute-real`
uzatilmaguncha hamda `--model`, `OMNIROUTE_BASE_URL` va `OMNIROUTE_API_KEY`
sozlanmaguncha hech qanday tarmoq yoki pullik model chaqiruvini amalga
oshirmaydi. Ushbu aniq real ishga tushirish bo'lmasa, uning mashina o'qiydigan
hukmi `HOLD` bo'lib qoladi; faqat sintetik yuklama/chaqiruvlar soni o'lchovlari
o'zi ko'tarish dalili hisoblanmaydi.

Chaqiruvchilar, agar ularda allaqachon sinxronlashtirilgan matn mavjud bo'lsa,
qo'llab-quvvatlanadigan video qismiga ixtiyoriy `transcript.cues` massivini
biriktirishi mumkin. Har bir cue `text`, aniqlangan (probe qilingan) davomiylik
ichidagi chekli `start`/`end` intervali va oq ro'yxatga kiritilgan `source`
(`client`, `embedded` yoki `audio-bridge`) ni o'z ichiga olishi shart;
`confidence` sukut bo'yicha `1` ga teng bo'lib, `0` va `1` orasida qolishi kerak.
Aynan bir xil takroriy cue lar birlashtiriladi. OmniRoute hech qachon ushbu
metama'lumotlardan transkripsiyani boshlamaydi: tekshirilgan cue lar manba,
ishonch darajasi va interval bilan tavsiflangan natijaga ko'chiriladi hamda kadr
taglavhalari yonida ishonchsiz kuzatuvlar sifatida ko'rsatiladi. Yaroqsiz,
diapazondan tashqaridagi yoki kelib chiqishi ko'rsatilmagan matn taglavha oqimiga
aralashtirilmay, rad etiladi. So'rov tanasidagi ikkala transkript kanali ham
taqdim etilgan kelib chiqishni `client` ga normallashtiradi, jumladan, o'zi e'lon
qilgan `embedded` yoki `audio-bridge` yorliqlarini ham. Ushbu ishonchli
yorliqlarni faqat serverga tegishli adapter, faqat kod ichidan erishiladigan
`trustedSource` argumenti orqali belgilashi mumkin; so'rovning JSON maydoni bu
argumentga yetib bora olmaydi. Transkript matni o'z kelib chiqishidan qat'i
nazar, ishonchsiz, mediadan olingan kontent bo'lib qoladi va hech qachon
avtorizatsiyani belgilamasligi kerak.

Tajribali chaqiruvchi xuddi shu video uchun `audioTranscript` trekini taqdim
etishi mumkin; u mijoz taqdim etgan matn sifatida qaraladi, server
transkripsiyasining isboti emas. Fusion choki vizual va audio kuzatuvlarni yagona
muddat (deadline) va bitta bekor qilish signali ostida ishga tushiradi, ularni
umumiy vaqt chizig'ida tartiblaydi, aynan takrorlarni birlashtiradi va faqat bir
tomon muvaffaqiyatli bo'lganida qisman natija haqida xabar beradi. Yaroqsiz
`audioTranscript` butun videoni muvaffaqiyatsiz qilish o'rniga shu qisman
natijaga tushadi — vizual tavsif saqlanib qoladi, audio tarmoq esa tozalangan
xatolik kodini qayd etadi. Tarmoq bo'yicha mavjudlik, qisman natija bayrog'i va
tozalangan xatolik kodlari tavsiflangan natijada, guardrail metama'lumotlarida
(`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), natija keshi metama'lumotlarida va ko'prikning fusion
hisoblagichlarida saqlanadi. Sukut bo'yicha Video Bridge yo'li nutqni matnga
aylantirishni chaqirmaydi va ikkinchi media nusxasini yuklab olmaydi; ushbu aniq
trek bo'lmasa, u faqat video rejimida qoladi.

**Transkriptni saqlash (#12150 P1).** Bu, Video Bridge (o'zi opt-in asosida yoqiladi) transkript cue'sini render qilgan har qanday holatda avtomatik qo'llaniladi — alohida saqlash bayrog'i mavjud emas. So'rov biror transkript cue'sini (chaqiruvchi e'lon qilgan `transcript` yoki birlashtirilgan `audioTranscript`) render qilganda, guardrail uni `videoBridgeObserved` deb belgilaydi va video tavsifining redaksiya qilingan soyasini hosil qiladi — har bir cue'ning erkin matn tanasi `[redacted-video-transcript]` bilan almashtirilgan bir xil render bo'lib, u satr yig'ilishidan oldin tuzilmaviy cue maydonini almashtirish orqali quriladi (tekislangan matnni tahlil qilish orqali hech qachon emas, shuning uchun hech qanday cue tarkibi — zararli yoki oddiy, jumladan `[inaudible]`/`[music]` kabi `]` o'z ichiga olgan tanalar ham — saqlanib qolmaydi). Saqlanadigan chaqiruv jurnalining so'rov tanasi videodan olingan har bir matn qismini shu redaksiya qilingan soya bilan almashtiradi, moslik tarkib tengligi bo'yicha aniqlanadi; `fullText` langari (anchor) tugallangan pre-call guardrail yukidan qayta o'qiladi, shuning uchun keyingi zanjir guardraillari (PII va credential maskerlari, 10/95 prioritetlari) tavsif matnini joyida qayta yozgandan keyin ham va system-prompt/handoff/memory inyeksiyasi xabarlar massivini qayta shakllantirgandan keyin ham moslik baribir muvaffaqiyatli bo'ladi. Modelga upstream yuboriladigan tana o'zgarmaydi. Kuzatilgan so'rov hech qanday doimiy Memory'ni ham to'ldirmaydi (so'rovdan ham, javobdan ham ajratib olish o'tkazib yuboriladi), shuning uchun modelning o'z javobi transkript matnini Memory'ga aks ettira olmaydi.

**Xom video maydonlari (#12430).** Bridge yoqilgan va native video qo'llab-quvvatlash noma'lum yoki mavjud bo'lmaganda, aniqlangan `transcript`/`audioTranscript` maydonlari ham `videoBridgeObserved`ni faollashtiradi — hatto tavsiflash muvaffaqiyatsizligidan yoki `maxVideos` chegarasidan keyin ham. `null` va bo'sh satrlar hisobga olinadi; mavjud bo'lmagan maydonlar va video bo'lmagan metama'lumotlar hisobga olinmaydi. Saqlangan nusxalar bu maydonlarni redaksiya qiladi yoki so'rovni butunlay tashlab yuboradi, keshlar/Memory esa chetlab o'tiladi.

Ushbu fallback yo'llarida haqiqiy chaqiruvchi cue'lari nostandart provayder maydonlari o'rniga qo'llab-quvvatlanadigan `text`/`input_text` qismlariga aylanadi. So'rov bilan taqdim etilgan ikkala trek ham ishonchsiz `client` kuzatuvlari bo'lib qoladi va video tavsiflanmaganligi hamda vaqt belgilari media bilan tekshirilmaganligi haqida aniq ogohlantirish beriladi. Mavjud 256 cue/64 KiB umumiy va har bir cue uchun byudjetlar ikkala trekka birgalikda qo'llaniladi; vaqt belgilari brokerning 600 soniyalik yuqori chegarasiga va taqdim etilgan har qanday fokus oynasiga sig'ishi kerak. Yaroqsiz treklar ixtiyoriy matn sifatida uzatilmaydi, balki tashlab yuboriladi; ularning birlashtirilgan byudjeti oshirilmagan taqdirda, haqiqiy qo'shni (sibling) trekdan baribir foydalanilishi mumkin. Null/bo'sh maydonlar matn qo'shmaydi. Bu fallback hech qanday media yuklab olish yoki transkripsiya qo'shmaydi. Transkript kengaytma maydonlari fallback video tashuvchisidan hamda uning `video_url`/`source` obyektlaridan olib tashlanadi. OpenAI wire allowlist'i qat'iy bo'lib qoladi; native'i noma'lum video tashuvchilari mavjudligicha qoladi va ma'lum faqat-matn maqsadlar xavfsiz belgilarni saqlaydi. Tuzilmaviy redaksiya soyalari qo'shilgan transkript matnini himoya qiladi, asl chaqiruvchiga tegishli so'rov esa o'zgarmaydi. Native qo'llab-quvvatlanadigan maqsadlar va o'chirilgan bridjlar mavjud chetlab o'tish xatti-harakatini saqlaydi.

Qo'shimcha saqlangan nusxalar xuddi shu kuzatilgan so'rov signalidan foydalanadi. Xom pre-guardrail mijoz so'rovi snapshot'i, xotiradagi kutilayotgan so'rov va erta rad etilgan so'rovlar jurnali video qismlardagi transkript maydonlarini tuzilmaviy ravishda almashtiradi; pipeline bosqichlari va kontekst handoff tomonidan sintez qilingan satr promptlari esa saqlanadigan so'rov tanasi sinkida redaksiya qilinadi. Saqlangan `video_content_removed` belgisi `previous_response_id` orqali davom ettirish qasddan tashlab yuborilgan matnni qayta qurish o'rniga yopiq (fail-closed) rejimda muvaffaqiyatsiz bo'lishiga olib keladi. Agar kuzatilgan so'rov jurnalga yozilishidan oldin har bir qismga mo'ljallangan redaksiya soyasini yo'qotsa, yoki keyingi so'rov o'zgarishlaridan so'ng bir nechta video soyasidan hatto bittasi mos kelmasa, saqlangan so'rov tanasi qisman redaksiya qilingan transkriptni saqlash o'rniga butunlay tashlab yuboriladi.

Kuzatilgan so'rov uchun model javobi tuzilmaviy cue chegarasisiz transkriptning istalgan qismini iqtibos qilishi mumkin. Shuning uchun uning saqlanadigan chaqiruv jurnalidagi `responseBody` maydoni tashlab yuborish belgisi bilan almashtiriladi; batafsil pipeline artefakti (unda upstream/client tanalari va oqim bo'laklari bo'lishi mumkin) saqlanmaydi. Semantik, idempotency va reasoning-replay keshlari bu so'rov uchun o'qish va yozishni chetlab o'tadi. Provayder so'rovi va mijozga ko'rinadigan javob o'zgarmaydi. Batafsil artefakt tashlab yuborilganda, erta keepalive baytlari vaqtinchalik buferdan chiqarib tashlanadi. Kiro'ning noto'g'ri formatlangan EventStream ogohlantirishi faqat yuk baytlari sonini xabar qiladi, uning tarkibini yoki JSON parserining xom xatosini hech qachon xabar qilmaydi.
Bu, har bir aloqasiz provayder/plugin diagnostikasi tekshirilganini da'vo qilmaydi; saqlangan sinklar bo'yicha kengroq tozalash #11658 da kuzatiladi.

Ichki `/api/modality-bridge/video/drilldown` hayotiy tsikli alohida, loopback/token orqali autentifikatsiyalangan kesh substratidir. Har bir operatsiya kanonik, noaniq (opaque) principal ID'sini ham talab qiladi. Production chaqiruvchisi yoqilishidan oldin u bu ID'ni autentifikatsiyalangan tenantdan hosila qilishi va mijoz tanlagan qiymatni hech qachon uzatmasligi kerak. Kesh kalitlari shu principal'ni kanonik sessiya va video-ma'lumotnoma ID'lariga bog'laydi, faqat ularning SHA-256 dan hosila qilingan kalitlarini saqlaydi hamda o'qish va o'chirishni bir xil principal doirasiga cheklaydi. Kesh har bir yozuv uchun ko'pi bilan 16 ta hosila qilingan JPEG kadrini saqlaydi, ularning muddatini o'n daqiqadan keyin tugatadi hamda chegaralangan `start`/`end` o'qishlarini yoki sessiyani aniq o'chirishni qo'llab-quvvatlaydi.

Har bir principal 16 ta yozuv va 64 MiB kanonik JPEG ma'lumoti bilan cheklangan. Bu chegaralar global 64 yozuv/256 MiB yuqori chegarasidan mustaqil: principal kvotasi bosimi global LRU chiqarilishi ko'rib chiqilishdan oldin faqat shu principalning eng uzoq vaqt foydalanilmagan yozuvlarini chiqarib tashlaydi. Muddati tugagan yozuvlar kesh faolligida ham principal, ham global hisobdan tozalanadi; bekor qilish va validatsiya muvaffaqiyatsizligi esa qisman almashtirishni amalga oshirmaydi.

Kesh kanonik bo'lmagan Base64, ortiqcha padding, JPEG bo'lmagan media, shakli buzilgan yoki kesilgan JPEG'larni va chegaralangan to'liq-tasvir `sharp` dekodlashi paytida ogohlantirish hosil qiladigan JPEG'larni rad etadi. U har bir qabul qilingan tasvirni kanonik JPEG sifatida qayta kodlaydi, kenglik va balandlikni chaqiruvchi maydonlariga ishonish o'rniga dekodlangan baytlardan oladi hamda oxirgi poliglot baytlarni saqlab qolish o'rniga olib tashlaydi. Faqat chegaralangan kanonik siqilgan bufer ikkala kvotadan hisoblanadi. JSON uzatish chegarasi 32 MiB dekodlangan-kirish chegarasi uchun Base64 qo'shimcha yukini o'z ichiga oladi. Har bir saqlangan derivatsiya o'zining tasdiqlangan JPEG formati/ajratish qobiliyati, namuna olish siyosati, derivatsiya versiyasi, yaratilgan vaqti, server tomonidan hisoblangan kontent xeshi hamda xeshlangan ota-havolasi va ishonchli chaqiruvchining ota-kontent xeshini qayd etadi. Atomik kesh commitidan oldin asinxron dekodlash/xesh fazalari orasida bekor qilish tekshiriladi.

Ushbu tranche hali marshrutga ishlab chiqarish prodyuserini ulamaydi va ko'p ajratishli variantlarni tanlashni ta'minlamaydi. Shuning uchun shaffof Video Bridge so'rov yo'li qo'shimcha ish talab qilmaydi, ijarachiga bog'langan principal derivatsiyasi va to'liq FU-08 ko'p ajratishli hayotiy tsikli esa to'liq xatti-harakat sifatida hujjatlashtirilmay, aniq keyingi ish bo'lib qoladi.

Fremlar sozlangan Video modeli bilan ketma-ket izohlanadi. Bo'sh Video o'zgartirishi Vision sozlamasidan meros oladi; agar ikkalasi ham bo'sh bo'lsa, Vision avtomatik-marshrutizatori samarali ko'rish qobiliyatiga ega modelni tanlaydi. Muvaffaqiyatli izohlar asl qismni barqaror `[Video description:` prefiksi bilan almashtiradi, bu prefiks matnni ishonchsiz, mediadan olingan kuzatuv sifatida belgilaydi va keyingi modellarga mediada uchraydigan ko'rsatmalarga amal qilmaslikni aytadi. Frey-izoh kesh kalitlari JPEG baytlari, prompt, vaqt belgisi va samarali modelni o'z ichiga oladi; faqat muvaffaqiyatli izohlar keshlanadi. Kesh yozuvlari haqiqiy muvaffaqiyatli prodyuser modelini, jumladan zaxira modelini saqlaydi; turli fremlar turli modellar tomonidan ishlab chiqarilgan bo'lsa, ko'prik `mixed` deb xabar beradi. Kesh hit ushbu prodyuser identitetini so'ralgan marshrutlash rejasi deb qayta nomlash o'rniga qayta ishlatadi. Butun-video natija keshi chiqishni o'zgartiradigan har bir kirish bo'yicha kalitlanadi — prompt, samarali model, namuna olish siyosati, fremlar soni, semantik tahlil rejimi, normallashtirilgan fokus ishorasining SHA-256 barmoq izi, fokus oynasi, `transcript`, `audioTranscript` va kontakt-varaq bayrog'i — shu bois ushbu o'lchovlardan birortasini o'zgartirish kesh miss bo'ladi, hech qachon eskirgan qayta foydalanish emas. Vizual dedup siyosatining versiyasi, chegarasi va chegaralangan nomzod-fremlar soni ham natija-kesh kalitida va metama'lumotlarda aniq ko'rsatiladi; shuning uchun siyosat o'zgarishi eskirgan butun-video tavsifini qayta ishlata olmaydi. Natija-kesh v4 metama'lumotlari rejim va barmoq izini saqlaydi, hech qachon xom foydalanuvchi vazifasini emas. Guardrail metama'lumotlari so'ralgan va samarali tahlil rejimlarining ikkalasini ham xabar qiladi; ishlatiladigan foydalanuvchi matnisiz so'ralgan `focused` rejimi samarali ravishda `full` deb xabar qilinadi.

Guardrail har bir qo'llab-quvvatlanadigan video qismini ajratib oladi, lekin `modalityBridgeVideoMaxVideos`'dan ortig'ini tasvirlamaydi. `supportsVideo === false` ekanligi isbotlangan nishon uchun muvaffaqiyatsiz bo'lgan va chegaradan oshgan videolar aniq xavfsiz matn belgilariga aylanadi, shunda hech qanday xom video saqlanib qolmaydi. Qobiliyat noma'lum bo'lsa, bu qismlar o'z video tashuvchisini saqlab qoladi; har qanday zaxira transkript yuqoridagi chegaralangan matn konversiyasiga amal qiladi. `supportsVideo === true` bo'lgan nishonlar ko'prikdan chetlab o'tadi. Mijoz so'rovining bekor qilish signali yuklab olish, broker navbati, subprotsesslar va izoh chaqiruvlari bo'ylab tarqaladi; bekor qilishlar videolar orasida to'xtaydi va hech qachon xom mediaga fail-open qilmaydi.

Runtime sozlamalari DB-ga asoslangan va Zod bilan tasdiqlanadi:

| Kalit                               | Standart    | Diapazon / xatti-harakat                                                                                             |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Ixtiyoriy runtime, opt-in                                                                                            |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` umumiy izohlarni saqlaydi; `focused` chegaralangan, ishonchsiz so'nggi-foydalanuvchi kontekstidan foydalanadi |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge modelidan meros oladi                                                                                  |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                 |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` yoki mutanosib `segment_aware`; detektor xatosi `uniform`ga qaytadi                         |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                  |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                       |

120 soniyadan yuqori bo'lgan avvaldan saqlangan Video timeout qiymatlari broker muddatiga cheklanadi; ushbu chegaradan yuqori yangi sozlamalar yozuvlari rad etiladi. `GET /api/modality-bridge/video/runtime` autentifikatsiya yoki runtime tekshiruvidan oldin ishonchli muhrlangan loopback mahalliyligini talab qiladi, so'ngra boshqaruv autentifikatsiyasini talab qiladi. U faqat `available`, tozalangan FFmpeg/ffprobe versiyalari va runtime mavjud bo'lmaganda belgilangan sababni qaytaradi. Ichki chiqarish endpointi ommaviy yuklash API'si emas: navbat to'yinishi `503` hamda `Retry-After` qaytaradi, chaqiruvchi uzilishi `499` qaytaradi va belgilangan broker muddati `504` qaytaradi. Konvertatsiya qilingan javoblar Vision yoki Audio segmentlarini olib tashlamasdan markaziy `x-omniroute-modality-bridge` sarlavhasiga `video->text;model=<visionModel>;parts=<videos>` qo'shadi.

### PII Masker (`piiMasker.ts`)

**Ikkala** bosqichda ham ishlaydi.

- **`preCall`** yukni (payload) klonlaydi, `system`, `messages`, `input` va
  `prompt` ni aylanib chiqadi (oddiy string elementlarni ham o'z ichiga olgan
  holda) va string `content`/`text` maydonlariga `processPII()` ni
  (`@/shared/utils/inputSanitizer` dan) qo'llaydi. `PII_REDACTION_ENABLED=true`
  bo'lganida, aniqlangan PII chiquvchi yukda yashirib qo'yiladi (redact
  qilinadi). Bu `INPUT_SANITIZER_MODE` dan mustaqil (u faqat
  prompt-injection siyosatini boshqaradi). Yashirish o'chirilganida, chaqiruv
  kontentni qayta yozmasdan aniqlash sonlarini qayd etadi.
- **`postCall`** javobni chuqur klonlaydi, `sanitizePIIResponse()` ni hamda
  Responses-API-shakl maskalovchisini (`maskResponsesOutput` — `output_text`
  va `output[].content[].text` ni qamrab oladi) ishga tushiradi. Agar biror
  yashirish sodir bo'lsa, o'zgartirilgan javob asl nusxasining o'rnini egallaydi.

Guardrail hech qachon bloklamaydi; u faqat annotatsiya qiladi (`meta.detections`,
`meta.redacted`) yoki qayta yozadi.

#### Tur bo'yicha tanlash, maxsus andozalar va aniqlash hisoblagichlari

**Dashboard → Settings → Security → PII masking** _nima_ maskalanishini
tanlaydi. U maskalashni yoqmaydi: buni hali ham `PII_REDACTION_ENABLED`
(so'rov) va `PII_RESPONSE_SANITIZATION` (javob + SSE) bajaradi, ikkalasi ham
sukut bo'yicha o'chirilgan.

- **Tur bo'yicha tanlash** — o'rnatilgan identifikatorlar
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`) da sanab o'tilgan.
  O'rnatilmagan holat har bir turni anglatadi (bu sozlama mavjud bo'lmasdan
  oldingi xatti-harakat). So'rov dvigatelining `ssn_us` andozasi `ssn` ga
  moslanadi. Shablonlar (Minimal, Standard, Financial, Brazilian, USA, Full)
  faqat UI dagi belgilash katakchalarini to'ldiradi.
- **Maxsus andozalar** — 20 tagacha regex yoki wildcard andozalari (`*` = 64
  tagacha bo'shliq bo'lmagan belgilar, `?` = bitta). Mosliklar
  `[CUSTOM_REDACTED]` ga aylanadi. Har bir andoza `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`) orqali o'tadi: ko'pi bilan 500
  belgi, flaglar `g i m s u` bilan cheklangan, kompilyatsiya bo'lishi shart,
  `safe-regex` dan o'tishi shart (katastrofik backtracking) va bo'sh string
  yoki yashirish joyostagichi (placeholder) ga mos kelmasligi shart. Muvaffaqiyatsiz
  bo'lgan andoza saqlanayotganda va sinovdan o'tkazilayotganda rad etiladi,
  muvaffaqiyatsiz bo'lgan saqlangan qator esa ish vaqtida kompilyatsiya
  qilinish o'rniga o'tkazib yuboriladi. Maxsus andozalar faqat maskalash
  yoqilganida ishlaydi.
- **Aniqlash hisoblagichlari** — tur bo'yicha sonlar (hech qachon mos kelgan
  qiymatlar emas), xotirada saqlanadi va qayta ishga tushirishda nolga
  tushiriladi (`src/lib/pii/piiDetectionStats.ts`). Ular faqat maskalash
  yoqilganida oshadi.

Sozlamalar `key_value` jadvalida saqlanadi (`pii_settings` nom maydoni,
`src/lib/db/piiSettings.ts`) va 1 soniyalik kesh orqali o'qiladi. API:

| Metod  | Yo'l                     | Maqsad                                                                                  |
| ------ | ------------------------ | --------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Bayroq holati, `enabledTypes`, `customPatterns`, aniqlash hisoblagichlari               |
| `PUT`  | `/api/settings/pii`      | `enabledTypes` (`null` = hammasi) va/yoki `customPatterns` ni almashtirish              |
| `POST` | `/api/settings/pii/test` | Bitta andozani ko'pi bilan 8 KB lik namunada sinovdan o'tkazish; hech narsa saqlanmaydi |

Uchtalasi ham boshqaruv autentifikatsiyasini talab qiladi va tanani Zod bilan
tekshiradi (`src/shared/validation/schemas/piiSettings.ts`).

### Prompt Injection (`promptInjection.ts`)

Foydalanuvchi tomonidan taqdim etilgan kontentdagi zararli strukturalarni
aniqlaydi va sozlangan siyosatni joriy etadi. Xatti-harakat atrof-muhit
o'zgaruvchilari va konstruktor opsiyalari orqali boshqariladi:

| Sozlama            | Env o'zgaruvchisi                                                                                       | Sukut bo'yicha | Ta'sir                                                                                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Yoqilgan           | `INPUT_SANITIZER_ENABLED`                                                                               | `true`         | `false` bo'lganda, guardrail qisqa tutashadi (short-circuit).                                                                                                                                                 |
| Rejim              | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                         | `warn`         | Injection siyosati: `block`, `warn` yoki `log`. (`redact` orqaga moslik uchun qabul qilinadi, lekin injection matnini olib tashlamaydi; so'rov PII qayta yozuvi `PII_REDACTION_ENABLED` orqali boshqariladi.) |
| Bloklash chegarasi | `blockThreshold` opsiyasi / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`         | Bloklash uchun talab qilinadigan minimal jiddiylik darajasi. Medium sukut bo'yicha faqat kuzatish uchun (observe-only).                                                                                       |

**Rejim ustuvorligi** (`getMode`): chaqiruvchi `options.mode` →
`INJECTION_GUARD_MODE` **DB feature-flag bekor qilishi (override)** (Dashboard →
Settings → Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE`
env → `warn`. Demak, dashboard bekor qilishi env o'zgaruvchilaridan ustun
keladi, shuning uchun Feature Flags UI ishlayotgan guardni jonli boshqaradi
(qayta ishga tushirishsiz). DB o'qish xavfsiz ishlamay qolganda ham to'g'ri
ishlaydi (fail-safe): agar xatolik yuz bersa, guard env-ga asoslangan
xatti-harakatga qaytadi va hech qanday bekor qilish o'rnatilmaganida xatti-harakat
faqat env orqali aniqlanish bilan bir xil bo'ladi.

Aniqlash manbalari:

1. `@/shared/utils/inputSanitizer` dan `sanitizeRequest()` (pipeline ning
   boshqa joylarida ham ishlatiladigan umumiy detektorlar to'plami).
2. O'rnatilgan `DEFAULT_GUARD_PATTERNS` (hozircha `system_override_inline` va
   `markdown_system_block`, ikkalasi ham `high` jiddiylikda).
3. Konstruktor opsiyalari orqali uzatilgan ixtiyoriy `customPatterns`
   (stringlar, regexlar yoki `{ name, pattern, severity }` yozuvlari).

`mode === "block"` **bo'lganda** va kamida bitta aniqlash jiddiylik
chegarasiga yetganda, `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }` qaytaradi. `warn`/`log` rejimlarida guardrail
jurnalga yozadi, lekin chaqiruvga ruxsat beradi. Umumiy yordamchi
`evaluatePromptInjection()` ham eksport qilinadi — u reyestr orqali o'tmasdan
promptlarni baholashi kerak bo'lgan chaqiruvchilar uchun mo'ljallangan.

**Skanerlash chegarasi (v3.8.20):** detektor birlashtirilgan prompt matnining
faqat **dastlabki 16 KB** qismini tekshiradi — `src/shared/utils/inputSanitizer.ts`
faylidagi `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bayt).
`detectInjection()` ham, `evaluatePromptInjection()` ham andoza siklini ishga
tushirishdan oldin `slice(0, MAX_INJECTION_SCAN_BYTES)` qiladi. Injection
direktivalari kiritmaning boshiga yaqin joylashadi, shuning uchun bu
aniqlashni zaiflashtirmasdan bir necha yuz KB'lik yuklamalarda regex CPU/GC
sarfi cheklaydi (qarang: #3932, #4041).

### Hisob ma'lumotlari niqoblagichi (`credentialMasker.ts`)

**Ikkala** bosqichda ham ishlaydi, standart zanjirda oxirgi o'rinda turadi
(ustuvorlik `95`). Taniqli API-kalit / maxfiy token andozalarini chiquvchi
yuklamadan (xabar tarkibi, tool-call argumentlari, tool natijalari) **va**
provayder javobidan yashiradi, shunda promptga joylashtirilgan (yoki tool
natijasi orqali qaytarilgan) hisob ma'lumotlari upstream provayderga yoki
mijozga sizib chiqmaydi.

- **Faqat opt-in**, PII yashirish bilan bir xil konventsiya (Qattiq qoida
  №20 ga yaqin): `settings.credentialRedactionEnabled === true` **yoki**
  `CREDENTIAL_REDACTION_ENABLED=true` bo'lmaganda o'chiq. U o'chirilganida
  guardrail no-op bo'ladi — hech qachon bloklamaydi va hech qachon qayta
  yozmaydi.
- `redactCredentials()` butun yuklama/javob daraxtini aylanib chiqadi
  (`walkValue()`, prototype-pollution'dan xavfsiz, `WeakSet` orqali
  tsikllardan xavfsiz) va mosliklarni `[REDACTED:<type>]` o'rinbosari bilan
  almashtiradi, faqat haqiqatda o'zgargan tarmoqlarni klonlaydi.
- `CREDENTIAL_PATTERNS` LLM provayder kalitlarini (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokenlarini (GitHub,
  Slack, Linear, Notion, npm, Postman, Discord), to'lov kalitlarini (Stripe,
  Square), bulut kalitlarini (AWS access key, Twilio, SendGrid, Mailgun),
  private key'lar / JWT'larni, hisob ma'lumotlarini o'z ichiga olgan ulanish
  satrlarini (`mongodb://user:pass@...` va boshqalar) hamda umumiy
  `Authorization`/`x-api-key`/`api-key`/`apikey` sarlavha-qiymat andozasini
  qamrab oladi. Sarlavha shaklidagi kalitlar (`authorization`, `x-api-key`,
  `api-key`, `apikey`) umumiy matn regex'i orqali emas, balki strukturaviy
  ravishda yashiriladi (faqat qiymat, `Bearer `/`Basic ` kabi sxema prefiksi
  saqlanadi).
- Guardrail hech qachon bloklamaydi; u faqat qayta yozadi (`modifiedPayload` /
  `modifiedResponse`) va izoh qo'shadi (`meta.credentialsRedacted`,
  `meta.count`).

Regressiya himoyasi: `tests/unit/credential-masker-guardrail.test.ts`.

## Asosiy shartnoma (`base.ts`)

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
  block?: boolean; // true zanjirni erta to'xtatadi (short-circuit)
  message?: string; // bloklanganda ko'rsatiladi
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // so'rovni qayta yozish uchun preCall tomonidan qaytariladi
  modifiedResponse?: TValue; // javobni qayta yozish uchun postCall tomonidan qaytariladi
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

Guardrail `void`, `{}` yoki `{ block: false }` qaytarish orqali "o'zgarish yo'q"
deb signal beradi. `modifiedPayload`/`modifiedResponse` qaytarish zanjir bo'ylab
keyingi (downstream) guardraillarga oqayotgan qiymatni almashtiradi.
`signal?: AbortSignal` chaqiruvchining hayotiy siklini guardraillarga olib kiradi.
So'rovni bekor qilish (abort) qasddan qilingan fail-open istisnodir: media
ko'priklar ishni to'xtatadi va xom (raw) mediani uni qo'llab-quvvatlamasligi
ma'lum bo'lgan maqsadga tiklamasdan tozalash (cleanup) ishlarini bajaradi.

## Reyestr (`registry.ts`)

`guardrailRegistry` singletoni quyidagilarni taqdim etadi:

- `register(guardrail)` — guardrail qo'shadi (yoki normallashtirilgan nom
  bo'yicha almashtiradi) va `priority` bo'yicha o'sish tartibida qayta saralaydi.
- `clear()` / `list()` — ma'muriy yordamchi funksiyalar.
- `runPreCallHooks(payload, context)` — faol guardraillarni ketma-ket ishga
  tushiradi, payloadni `modifiedPayload` orqali uzatadi va birinchi
  `block: true` da to'xtaydi.
- `runPostCallHooks(response, context)` — javob tomonida xuddi shunday oqim.
- `resetGuardrailsForTests({ registerDefaults })` — holatni tozalaydi va toza
  test izolyatsiyasi uchun ixtiyoriy ravishda standartlarni qayta ro'yxatga oladi.

Ikkala runner ham `{ blocked, payload|response, results, guardrail?, message? }`
qaytaradi, bunda `results` — har bir guardrail uchun `blocked`, `skipped`,
`modified`, `error` va `meta` maydonlarini o'z ichiga olgan
`GuardrailExecutionResult` yozuvlari massivi bo'lib, kuzatish (tracing) uchun
foydalidir.

### Har bir so'rov uchun guardraillarni o'chirish

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` joriy so'rov uchun
o'tkazib yuborilishi kerak bo'lgan guardrail nomlarining takrorlardan tozalangan
ro'yxatini yig'adi. Besh ta kanal mavjud bo'lib, ular shu tartibda o'qiladi va
bitta ro'yxatga birlashtiriladi (takrorlarni olib tashlashda birinchi uchragani
g'alaba qozonadi):

1. `apiKeyInfo.disabledGuardrails`
2. So'rov tanasidagi `disabledGuardrails` (yuqori darajadagi)
3. So'rov tanasidagi `metadata.disabledGuardrails` (faqat `metadata` obyekt bo'lganida)
4. `x-omniroute-disabled-guardrails` sarlavhasi
5. Eski (legacy) `x-disabled-guardrails` sarlavhasi

Barcha besh kanal birlashtiriladi, jumladan ikkala sarlavha ham: ham
`x-omniroute-disabled-guardrails`, ham `x-disabled-guardrails` yuborilsa,
ularning ro'yxatlari birlashmasi o'tkazib yuboriladi va bo'sh zamonaviy sarlavha
endi eskisini yashirmaydi
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412),
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805) da tuzatilgan).

Qiymatlar satrlar massivi yoki vergul bilan ajratilgan satr bo'lishi mumkin;
nomlar kesiladi (trim) va kichik harfli kebab-case ga normallashtiriladi
(`pii_masker` → `pii-masker`), bo'sh yozuvlar esa tashlab yuboriladi. Natija
`context.disabledGuardrails` orqali reyestrga uzatiladi va u mos keluvchi
guardraillarni o'tkazib yuboradi (`results` ichida `skipped: true`).

O'chirish ro'yxati faqat **reyestr**ga ta'sir qiladi. Prompt-inyeksiya `block`
rejimi majburiy chegaradir: injection-guard middleware
(`src/middleware/promptInjectionGuard.ts`) `evaluatePromptInjection()` ni
chaqiruvchi tomonidan boshqariladigan hech qanday o'chirish ro'yxatisiz chaqiradi
(ilgari u amalga oshirgan ishlamaydigan `resolveDisabledGuardrails({ body })`
chaqiruvi [#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934) da olib
tashlangan), shuning uchun `prompt-injection` ni o'chiruvchi so'rov `block`
rejimida baribir rad etiladi. Bu qasddan shunday loyihalangan. O'chirish kanallari
chaqiruvchi tomonidan boshqariladi (so'rov tanasi, metadata, sarlavhalar) va
chaqiruvchi operator o'rnatgan xavfsizlik nazoratini o'chira olmasligi kerak
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).
[#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412) dagi sarlavha
birlashmasi faqat qaysi reyestr guardraillari o'tkazib yuborilishini o'zgartiradi;
u mijozga middleware ni chetlab o'tish imkonini bermaydi. Har bir kalit va har bir
guruh uchun majburiy guardrail siyosatlari v4 RFC
[#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417) da kuzatib
boriladi.
Qarang: [Qamrov va cheklovlar](#coverage-and-limits).

## Bajarilish tartibi

`src/sse/handlers/chat.ts` va `open-sse/handlers/chatCore.ts` orqali o'tuvchi har bir so'rov uchun ([Qamrov va cheklovlar](#coverage-and-limits) bo'limida sanab o'tilgan chat oilasidagi marshrutlar):

1. `resolveDisabledGuardrails(...)` API kaliti, body va sarlavhalardan o'tkazib yuborish ro'yxatini tuzadi.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` guardrail'larni ustuvorlikning o'sish tartibida ishga tushiradi:
   - O'chirilgan guardrail'lar `skipped` sifatida qayd etiladi.
   - Har bir guardrail'ning `preCall` metodi yukni `modifiedPayload` orqali qayta yozishi mumkin.
   - Birinchi `block: true` zanjirni darhol to'xtatadi va handler guardrail rad javobini qaytaradi.
3. (Ehtimol qayta yozilgan) yuk combo marshrutlash va upstream dispatchga o'tadi.
4. **Faqat non-streaming:** javob shakllantirilgandan so'ng, `guardrailRegistry.runPostCallHooks(...)` xuddi shu zanjirni javob ustida ishga tushiradi. Bu yerda `block: true` upstream javobini tashlab yuboradi va HTTP 400 qaytaradi. Oqimli (streamed) javoblar bu bosqichni butunlay o'tkazib yuboradi.

Xato tashlaydigan guardrail'lar `error: <message>` bilan qayd etiladi va `logger.warn` orqali jurnallanadi, lekin zanjir davom etadi — dizayn bo'yicha fail-open.

## Qamrov va cheklovlar

Guardrail reestri faqat chat pipeline'iga ulangan. Ushbu cheklovlar `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` va `tests/unit/guardrail-pipeline-characterization.test.ts` tomonidan mahkamlangan; xatti-harakat o'zgarganda ushbu testlarni ataylab yangilang.

### Hook'lar qayerda ishlaydi

| Hook / boshqaruv                    | Qayerda ishlaydi                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                   | `handleChat` (`src/sse/handlers/chat.ts`) tomonidan qayta ishlanadigan so'rovlar: `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (va `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` va Telegram chat proksisi. Shuningdek, `/api/guardrails/test` dashboard test endpointi. Pre-call blok HTTP 400 qaytaradi. |
| `runPostCallHooks`                  | Faqat **non-streaming** chat javoblari (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Oqimli javoblar unga hech qachon yetib bormaydi.                                                                                                                                                                                                                                                                                                 |
| Oqimli PII                          | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), `PII_RESPONSE_SANITIZATION` yoqilganda `streamingPipeline.ts` ichida ulangan. Bu guardrail emas, shuning uchun o'chirish kanallari unga ta'sir qilmaydi.                                                                                                                                                                                                                          |
| Injection-guard middleware (legacy) | Prompt olib yuruvchi har bir `/v1` marshruti, chat oilasi ham kiradi (qarang: [marshrut qamrovi](#injection-guard-route-coverage--red-team-phase-8--block-d)). Faqat prompt injection.                                                                                                                                                                                                                                                          |

### Nima qamrab olinmagan

- **Media, embeddings va ma'lumotlar marshrutlari** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) reestrga hech qachon yetib
  bormaydi. U yerda PII niqoblash, credential niqoblash yoki modalitet ko'prigi
  ishlamaydi. Ularning yagona tekshiruvi — legacy injection-guard middleware.
- **Oqimli javoblar** post-call guardrail'larsiz qoladi: `pii-masker` yoki
  `credential-masker` post-call yo'q va post-call blok ham yo'q. Faqat oqimli
  PII transformi qo'llaniladi (`PII_RESPONSE_SANITIZATION` yoqilganda). Oqimli
  javobda qaytarilgan credential yashirilmaydi.
- **O'chirish kanallari va middleware (dizayn bo'yicha):** middleware prompt
  injection'ni `evaluatePromptInjection()` ga o'z chaqiruvi bilan baholaydi va
  chaqiruvchi boshqaruvidagi o'chirish ro'yxatini uzatmaydi. `block` rejimi —
  chaqiruvchi boshqaruvidagi o'chirishlar aylanib o'ta olmaydigan majburiy
  chegaradir, jumladan chat oilasi marshrutlarida ham
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).
  `prompt-injection`'ni o'chirish faqat reestr guardrail'ini o'tkazib yuboradi.

### Post-call'dan oldin javobni nima ko'radi

Non-streaming yo'lida tartib: xotira ajratish → o'rnatilgan vositalarni
bajarish → post-call guardrail'lar → post-call blok chiqishi → semantik keshga
saqlash.

- **Xotira ekstraksiyasi** va **vosita ijrosi** javobni post-call himoya
  mexanizmlari uni qayta yozishi yoki bloklashidan oldin koʻradi.
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) dan beri,
  `PII_RESPONSE_SANITIZATION` yoqilgan boʻlsa (oqimli va oqimsiz rejimlarning
  ikkalasida ham), xotira ekstraksiyasi ajratib olingan matnni `sanitizePII`
  orqali oʻtkazadi, lekin post-call keyinroq bloklaydigan javob baribir
  xotira va vositalarga taqdim etilgan boʻladi.
- **Semantik kesh** javobni post-call'dan keyin saqlaydi, shuning uchun u
  qayta yozilgan javobni saqlaydi va bloklangan javob hech qachon
  keshlanmaydi. Kesh yozuvlari har bir API kaliti boʻyicha kalitlanadi.

## Konfiguratsiya

O'rnatilgan himoya mexanizmlari (guardrails) tomonidan o'qiladigan muhit o'zgaruvchilari:

| O'zgaruvchi                           | Kim tomonidan ishlatiladi | Ta'siri                                                                                                                       |
| ------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Aniqlashni butunlay o'chirish uchun `false` qilib o'rnating.                                                                  |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Inyeksiya siyosati: `warn`, `block` yoki `log`. Eskirgan `redact` qiymati inyeksiya matnini qayta yozmaydi.                   |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Inyeksiya himoyachisi rejimi; shuningdek, muhit o'zgaruvchilarini **ustun qilib** qo'yadigan DB funksiya bayrog'i (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | `MODE=block` rad etadigan minimal jiddiylik darajasi: `high` (standart), `medium` yoki `low`.                                 |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | `INPUT_SANITIZER_BLOCK_THRESHOLD` uchun eskirgan taxallus.                                                                    |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | `true` bo'lganda, so'rovdagi PII yashiriladi (inyeksiya rejimidan mustaqil).                                                  |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Javob tomonidagi maskerlash xatti-harakatini boshqaradi.                                                                      |

Modality Bridge himoya mexanizmlari ish vaqti konfiguratsiyasini muhit
o'zgaruvchilaridan emas, balki DB asosidagi sozlamalar omboridan
(`getSettings()`) o'qiydi. Vision'ning asosiy kalitlari:
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` va
`modalityBridgeCacheMaxEntries`. Eskirgan
`visionBridge*` kalitlari faqat hujjatlashtirilgan bir siklli o'qish
zaxirasi sifatida qabul qilinadi; boshqaruv paneli yozuvlari asosiy kalitlardan
foydalanadi. Standart qiymatlar va zaxira rezolvi
`src/shared/constants/modalityBridgeDefaults.ts` faylida joylashgan bo'lib,
eskirgan konstantalar `src/shared/constants/visionBridgeDefaults.ts` faylida saqlanadi.

Audio `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` va `modalityBridgeAudioMaxClips` kalitlaridan,
shuningdek umumiy `modalityBridgeCache*` sozlamalaridan foydalanadi. Audio
eskirgan kalit zaxirasiga ega emas, chunki bu kalitlar Modality Bridge sxemasi
bilan birga kiritilgan.

Video `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` va
`modalityBridgeVideoTimeout` kalitlaridan, shuningdek umumiy `modalityBridgeCache*`
sozlamalaridan foydalanadi. U standart holatda o'chirilgan, chunki FFmpeg/ffprobe
ixtiyoriy operatsion bog'liqliklar hisoblanadi va kadrlarni izohlash kechikish
hamda model xarajatini qo'shadi.

## Maxsus guardrail'lar

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

Qadamlar:

1. `BaseGuardrail`dan meros oluvchi `src/lib/guardrails/myGuardrail.ts` faylini yarating.
2. `preCall` va/yoki `postCall` metodlarini implementatsiya qiling.
3. Uni import vaqtida ro'yxatdan o'tkazing (`registerDefaultGuardrails` ichidan push qilish orqali) yoki ish vaqtida `guardrailRegistry.register(...)` ni chaqiring — reestr bir xil normallashtirilgan nomga ega oldingi guardrail'ni almashtiradi.
4. `tests/unit/` ostiga testlar qo'shing (mavjud misollar:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testlash

Testlar orasida ma'lum holatdan boshlash uchun `resetGuardrailsForTests()` funksiyasidan foydalaning. Bo'sh reestr bilan boshlash va faqat sinov ostidagi guardrail'larni ro'yxatdan o'tkazish uchun `{ registerDefaults: false }` parametrini bering. Vision Bridge dependency injection'ni qabul qiladi (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge esa sozlamalar, imkoniyatlar, STT modelini tanlash, credential tekshiruvlari va transkripsiya uchun tengdosh ulanish nuqtalarini taqdim etadi. Shunday qilib, testlar DB yoki tarmoq kirishisiz ikkala oqimni ham sinab ko'rishi mumkin.

## Shuningdek qarang

- `src/lib/guardrails/` — implementatsiya
- `src/shared/utils/inputSanitizer.ts` — prompt-inyeksiya va PII niqoblashni ta'minlaydigan umumiy detektor
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge standart sozlamalari va majburiy-bridge modellari ro'yxati
- `src/shared/constants/modalityBridgeDefaults.ts` — umumiy Vision/Audio ish vaqti standart sozlamalari
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonal qatlam (circuit breaker, cooldown'lar)
- `docs/reference/ENVIRONMENT.md` — env o'zgaruvchilari bo'yicha to'liq ma'lumotnoma

## Injection-guard marshrut qamrovi va red-team (8-bosqich · D bloki)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) foydalanuvchi prompt'larini qabul qiluvchi barcha marshrutlarni qamrab oladi. U `INJECTION_GUARD_MODE` sozlamasiga amal qiladi (standart `warn` = faqat logga yozish; `block` = HTTP 400 `SECURITY_001` qaytaradi).

| Turi          | Marshrutlar                                                                                                                                          | Standart rejim |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Matn (mavjud) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn           |
| Generativ     | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn           |
| Ma'lumotlar   | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn           |

Matn ajratib olish (`extractMessageContents`) `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` maydonlarini qamrab oladi.

**Red-team (har tungi, `nightly-llm-security.yml`):** promptfoo har bir marshrut `INJECTION_GUARD_MODE=block` rejimida OWASP-LLM korpusini bloklashini tekshiradi; garak probe'larni ishga tushiradi (secret bo'lmasa o'tkazib yuboradi). `moderations` izchillik uchun kiritilgan. Block rejimi majburiy chegaradir: `evaluatePromptInjection()` middleware unga uzatadigan har-so'rovlik o'chirish ro'yxatini e'tiborsiz qoldiradi, shuning uchun `disabledGuardrails` marshrutni bundan **ozod qilmaydi** ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Har tungi workflow (`.github/workflows/nightly-llm-security.yml`, cron + qo'lda ishga tushirish) ikkita job'ga ega:

- **`promptfoo-guard` (bloklovchi)** — `INJECTION_GUARD_MODE=block` bilan `promptfoo eval -c promptfooconfig.yaml` ni ishga tushiradi. Har bir adversarial holat (masalan, "oldingi barcha ko'rsatmalarni e'tiborsiz qoldiring…", DAN-uslubidagi jailbreak'lar) javob `error.code === "SECURITY_001"` ni o'z ichiga olishini tasdiqlaydi, ya'ni guard so'rovni haqiqatda rad etgan.
- **`garak` (maslahat)** — mahalliy OmniRoute instansiyasiga (`http://localhost:20128/v1`) nisbatan garak `--probes promptinject,dan,leakreplay` ni ishga tushiradi. Provayder secret'iga bog'langan (`PROMPTFOO_PROVIDER_KEY`); muammosiz o'tkazib yuboradi va `|| true` bilan yakunlanadi, shuning uchun CI'ni buzmasdan hisobot beradi.

Guard yordamchisining qamrovi (`createInjectionGuard` / `withInjectionGuard`) prompt olib yuruvchi har bir `/v1` marshrutini o'z ichiga oladi; prompt matni `src/shared/utils/inputSanitizer.ts` ichidagi `extractMessageContents()` tomonidan `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` maydonlaridan olinadi.
