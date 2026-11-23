# Guardrails (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Haqiqatning asosiy manbasi:** `src/lib/guardrails/`
> **Soʻnggi yangilanish:** 2026-08-29 — v3.8.51 (Video Bridge transkriptining kelib chiqishi chaqiruvchi tomonidan eʼlon qilinadi,
> server tomonidan hali tasdiqlanmaydi — #11661 ga muvofiq aniqlashtirildi)

Guardrail’lar OmniRoute va yuqori oqim provayderlari oʻrtasidagi chegarada xavfsizlik, siyosat va kontent oʻzgartirishlarini taʼminlaydi. Har bir guardrail soʻrov yuklamalarini (`preCall`) va yuqori oqim javoblarini (`postCall`) tekshirishi (hamda ixtiyoriy ravishda rad etishi, oʻzgartirishi yoki izoh bilan belgilashi) mumkin.

Tizim **xatoda ochiq qoladi**: agar guardrail bajarilish vaqtida istisno chiqarsa, registr xatoni qayd etadi va soʻrovni muvaffaqiyatsiz yakunlash oʻrniga keyingi guardrail bilan davom etadi. Bloklash tasodif emas, balki aniq qarordir (`block: true`).

## O‘rnatilgan himoya cheklovlari

Reyestr import paytida ustuvorlik tartibida oltita himoya cheklovini avtomatik yuklaydi
(`registry.ts` → `registerDefaultGuardrails()` ga qarang):

| Ustuvorlik | Nomi                | Bosqich(lar)   | Fayl                  |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Ustuvorlik raqami kichik bo‘lganlari **birinchi** ishlaydi.

### Ko‘rish ko‘prigi (`visionBridge.ts`) — Modallik ko‘prigi PR-1

**Ko‘rish imkoniyatisiz modellarga** yo‘naltirilgan, tasvirlarni o‘z ichiga oluvchi so‘rovlarni ushlab, butun so‘rovni ko‘rish imkoniyatiga ega modelga qayta yo‘naltiradi yoki yuqori oqim chaqiruvidan oldin tasvir qismlarini sozlanadigan ko‘rish modeli yaratgan matnli tavsiflar bilan almashtiradi. Bu faqat matn bilan ishlaydigan provayderlarga multimodal foydali yuklarni shaffof tarzda qayta ishlash imkonini beradi.

Jarayon:

1. Agar maqsadli model allaqachon ko‘rishni qo‘llab-quvvatlasa, o‘tkazib yuboriladi (u majburiy ko‘prik ro‘yxati `isVisionBridgeForcedModel` ichida bo‘lmasa).
2. Tasvir qismlarini `extractImageParts(messages)` orqali ajratib oladi
   (`visionBridgeHelpers.ts`); u `open-sse/utils/mediaParts.ts` ichidagi **yagona media
   detektori** `detectMediaParts()` ga topshiradi — bu kombinatsiya muvofiqligi filtri bilan birgalikda ishlatiladigan yagona haqiqat manbaidir.
   Ajratib olish faqat `replaceImageParts` qayta joylashtira oladigan yuqori darajadagi qism shakllari uchun ruxsat etilgan ro‘yxat asosida bajariladi (ajratib olish↔almashtirish shartnomasi): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` va Responses API `input_image`. Ichma-ich topilmalar va
   faqat indikatorli shakllar kombinatsiya filtri uchun mo‘ljallangan bo‘lib, hech qachon ajratib olinmaydi.
   Hech narsa topilmasa, o‘tkazib yuboriladi.
3. Ish vaqti konfiguratsiyasini `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`) orqali aniqlaydi: yangi `modalityBridge*`
   sozlama kalitlari ustunlik qiladi; eski `visionBridge*` kalitlari **bir sikllik
   zaxira variant** (orqaga qaytarish oynasi) bo‘lib qoladi. Ko‘prik o‘chirilgan bo‘lsa, hech qanday media bo‘ylab o‘tishdan oldin o‘tkazib yuboriladi.
4. Rejim tanlagichi (`modalityBridgeVisionMode`, quyidagi jadvalga qarang)
   qayta yo‘naltirish yoki tavsiflashni belgilaydi. Qayta yo‘naltirish faqat `model`
   almashtirilgan `modifiedPayload` hamda `{ rerouted, fromModel, toModel, imagesKept }` metama’lumotlarini qaytaradi.
5. Tavsiflash yo‘li: tasvirlar sonini `maxImages` bilan cheklaydi, vazifani hisobga oluvchi ko‘rsatmani tuzadi,
   tavsif keshini tekshiradi, ko‘rish modelini **parallel ravishda**
   (`Promise.allSettled`) chaqiradi va tasvirlar o‘rniga `[Image N]: <description>` matn qismlarini joylaydi. Muvaffaqiyatsiz tavsiflash `null` qaytaradi va asl tasvir qismi
   **saqlab qolinadi** (#4012) — bundan kombinatsiyalangan tavsiflash yo‘lida barcha
   tavsiflash urinishlari muvaffaqiyatsiz bo‘lgan holat mustasno; bunda ko‘rish imkoniyati yo‘qligi tasdiqlangan yuqori oqimga
   `(mavjud emas — ko‘rish imkoniyatiga ega provayder ulanmagan)` to‘ldiruvchisi beriladi (#8430).
6. `modifiedPayload` va metama’lumotlarni (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`) qaytaradi.

#### Rejim tanlagichi (`modalityBridgeVisionMode`)

| Rejim      | Standart | Xatti-harakat                                                                                                                                                                                                                                                                                                                                                                 |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Eski evristika o‘zgartirilmagan (#6640/#7204): kombinatsiyalanmagan/`auto/` modellar, asl modelda foydalanishga yaroqli hisob ma’lumotlari mavjud bo‘lmasa, eng yaxshi ko‘rish modeliga qayta yo‘naltiriladi (mavjud bo‘lsa, tavsiflaydi); kombinatsiyalangan maqsadlar har doim tavsiflanadi.                                                                                |
| `describe` |          | Har doim tavsiflaydi — qayta yo‘naltirish bloki butunlay o‘tkazib yuboriladi; har doim foydalanuvchi tanlagan model javob beradi.                                                                                                                                                                                                                                             |
| `reroute`  |          | Majburiy qayta yo‘naltirish: hisob ma’lumotlariga ega modelni saqlash himoyasi chetlab o‘tiladi. Qayta yo‘naltirish **maqsadi** uchun hisob ma’lumotlari himoyasi hamon qo‘llanadi — foydalanishga yaroqli ko‘rish maqsadi mavjud bo‘lmasa, so‘rov tavsiflashga o‘tadi, shunda xom tasvirlar hech qachon faqat matn bilan ishlaydigan server tomoniga yetib bormaydi (#8430). |

Majburiy rejimlar avtomatik evristika ishga tushishidan **oldin** qisqa tutashuv qiladi; `auto` xatti-harakati PR-1 dan oldingi himoya cheklovi bilan baytma-bayt bir xil.

#### API kaliti doirasi (`visionBridgeKeyScope.ts`)

Chaqiruvchining API kaliti `allowedConnections`, kvota havzalari
(`allowedQuotas`) yoki modellarni (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`) cheklaganda, ko‘prik qayta yo‘naltirish va tavsiflash modellarini faqat kalit foydalanishi mumkin bo‘lgan modellar orasidan va kalit foydalanishi mumkin bo‘lgan ulanishlarda tanlaydi. Shundan so‘ng tavsiflash chaqiruvi har doim `x-omniroute-self-loop-key-id` sarlavhasi bilan OmniRoute o‘z-o‘ziga qaytish sikli orqali o‘tadi, shu sababli qabul qiluvchi chat so‘rovi ushbu kalitning ulanish va model siyosatini yana bir bor qo‘llaydi. `enforceApiKeyPolicy()` bu sarlavhani faqat o‘z-o‘ziga qaytish bearer’i bilan birga qabul qiladi, shuning uchun u faqat kirish doirasini toraytirishi mumkin; mavjud bo‘lmagan id rad etiladi.

Agar kalit uchun hech qanday ko‘rish modeliga ruxsat berilmagan bo‘lsa, tavsiflash yo‘li chetga chiqadi va so‘rov o‘zgartirilmagan holda uzatiladi; bu o‘chirilgan himoya cheklovidagi kabi xatoda ochiq qolish xatti-harakatidir (metama’lumotlar: `{ skipped: true, reason: "no_permitted_vision_model" }`).
Kalitsiz so‘rovlar va bunday cheklovlarga ega bo‘lmagan kalitlar avvalgidek ishlaydi.

#### Vazifani hisobga oluvchi tavsiflash ko‘rsatmasi (`modalityBridgeVisionTaskAware`)

Standart qiymat — **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) asosiy tavsiflash promptiga **foydalanuvchining oxirgi xabari** matnini (500 ta belgigacha qisqartirib) qoʻshadi; bu tavsifni foydalanuvchi aslida soʻragan narsaga yoʻnaltiradi (codex-vision-proxy namunasi) va vision modeldan koʻrinib turgan matnni transkripsiya qilishni soʻraydi. Flag oʻchirilgan boʻlsa yoki foydalanuvchi matni boʻlmasa, asosiy prompt oʻzgartirilmasdan ishlatiladi.

Tavsiflash self-loop jarayonining OpenAI bilan mos keluvchi soʻrovi (`visionBridgeHelpers.ts` ichidagi `callVisionModelSingle()`) har doim `image_url.detail: "high"` qiymatini soʻraydi — bu har bir chaqiruvchi/provayder uchun shartsiz bajariladi va hech qanday mijoz signaliga bogʻliq emas. Past tafsilotli namuna olish aynan ushbu prompt soʻraydigan matn transkripsiyasi vazifasi uchun OCR aniqligini pasaytiradi, shuning uchun dastlabki kiruvchi soʻrov qaysi tafsilot darajasidan foydalanganidan qatʼi nazar, tavsiflash chaqiruvi doimo yuqori tafsilot darajasini soʻraydi. Bu faqat ichki tavsiflash soʻrovi tanasiga taʼsir qiladi; OmniRoute asosiy soʻrovda chaqiruvchining oʻz `image_url.detail` qiymatini qanday uzatishini oʻzgartirmaydi — bu standart qiymat alohida ravishda va faqat aniqlangan OpenCode mijozlari uchun `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`) ichida qoʻllanadi. Tavsiflash self-loop jarayonining Anthropic wire-format tarmogʻida `detail` maydoni yoʻq va unga ushbu standart qiymatlarning hech biri taʼsir qilmaydi.

#### Tavsif chiqishi chegarasi (`modalityBridgeVisionMaxChars`)

| Kalit                          | Standart qiymat | Oraliq             |
| ------------------------------ | --------------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`             | `0` yoki 100–50000 |

`0` (standart qiymat) **chegara yoʻqligini** anglatadi — `callVisionModel()` qaytargan tavsif oʻzgartirilmasdan uzatiladi va mavjud xatti-harakat saqlanib qoladi. 100–50000 oraligʻidagi har qanday qiymat tavsif `[Image N]: <description>` sifatida qayta joylashtirilishidan oldin unga `…` suffiksini qoʻshib qisqartiradi (`src/lib/guardrails/visionBridge.ts` ichidagi `VisionBridgeGuardrail.preCall()`). Quyi oqimdagi modelga toʻliq transkripsiya kerak boʻladigan tafsilotlarga boy OCR vazifalari uchun bu qiymatni oshiring; koʻp matn qaytaradigan vision modellarda token sarfini cheklash uchun esa kamaytiring. Boshqaruv panelidagi maydon Vision tabining Advanced panelida joylashgan (`ModalityBridgeVisionTab.tsx` ichidagi `modality-bridge-max-chars`) va aniq koʻrsatilgan `0` qiymatini oʻzgartirmagan holda 1 dan 99 gacha boʻlgan har qanday qiymatni eng kam 100 qiymatiga koʻtaradi — `0` shunchaki «oʻrnatilmagan» standart qiymat emas, balki alohida haqiqiy Zod qiymatidir (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`).

#### Tavsif keshi (`modalityBridge/bridgeCache.ts`)

Tavsif natijalari uchun jarayon miqyosida umumiy foydalaniladigan xotiradagi LRU + TTL keshi.
Kalit = `sha256(imageRef + composedPrompt + configuredBridgeModel)`, uzunlik prefiksi bilan ramkalangan (maydon chegaralarida toʻqnashuvlarsiz). Model komponenti amalda javob bergan model emas, balki **sozlangan** bridge modelidir — `callVisionModel` ichki ravishda zaxira modelga oʻtishi mumkin va har bir urinish boʻyicha kalitlash keshni parchalab yuboradi. Muvaffaqiyatsiz tavsiflar hech qachon keshlanmaydi. Sozlamalar:

| Kalit                           | Standart qiymat | Oraliq  |
| ------------------------------- | --------------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`          | —       |
| `modalityBridgeCacheTtlMinutes` | `60`            | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`           | 10–5000 |

#### Masofaviy tasvirni normallashtirish (self-loop tavsifi/base64 yuklab olish)

Bridge **masofaviy** tasvirni oʻzi yuklab olganda — Anthropic tavsiflash self-call jarayonida va claude-wire-format uchun base64 formatiga aylantirishda (`ensureBase64ImagesForClaudeWire`), ikkalasida ham `visionBridgeHelpers.ts` ichidagi `fetchRemoteImageAsDataUri()` orqali — hosil boʻlgan data URI vision model soʻroviga joylashtirilishidan oldin `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) orqali oʻtkaziladi. Haddan tashqari katta tasvirlarning **uzun tomoni 2048px** gacha kichraytiriladi (OpenAI/Anthropic server tomonida allaqachon qoʻllaydigan oʻlcham chegarasiga mos ravishda), bu vision model koʻradigan narsani oʻzgartirmasdan yuklanadigan baytlar hajmi va kechikishni kamaytiradi. Oʻlchamni oʻzgartirish dinamik import orqali yuklanadigan `sharp` yordamida amalga oshiriladi: uning mahalliy binar fayli yuklanmaydigan platformada `normalizeDataUri()` **hech qachon xatolik tashlamaydi** — u dastlabki baytlarni oʻzgartirmasdan uzatishga qaytadi, shuning uchun tavsiflash/base64 formatiga aylantirish yoʻli doimo ishlashda davom etadi. Tasvir boʻlmagan baytlar (dekodlanadigan tasvir qaytarmagan yuklab olish natijasi) ham oʻzgartirilmasdan uzatiladi. Bu normallashtirish faqat bridge oʻzining self-call jarayoni uchun yuklab oladigan tasvirlar bilan cheklangan — u chaqiruvchining oʻzgartirilmagan bevosita uzatiladigan payloadiga hech qachon qoʻllanmaydi, bu faqat rozilik asosida oʻzgartirish tamoyiliga mos keladi (Qatʼiy qoida #20).

#### Sozlamalar sxemasi + migratsiya

Yangi `modalityBridge*` kalitlari `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`) ichida Zod orqali tekshiriladi: `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` uchligi va Audio Bridge tomonidan ishlatiladigan `modalityBridgeAudio*` guruhi. `141_modality_bridge_settings.sql` migratsiyasi mavjud eski `visionBridge*` qiymatlarini mos keluvchi yangi kalitlarga nusxalaydi (idempotent, operator oʻrnatgan `modalityBridge*` qiymatini hech qachon qayta yozmaydi); eski kalitlar bir reliz sikli davomida oʻqish uchun zaxira variant sifatida qabul qilinaveradi.

#### Shaffoflik headeri + statistika

Tavsiflash orqali oʻzgartirilgan javoblarda
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
mavjud boʻladi (`modalityBridge/bridgeStats.ts` ichidagi `buildModalityBridgeHeader()` tomonidan yaratiladi va `src/sse/handlers/chatHelpers.ts` ichidagi `withModalityBridgeHeader()` tomonidan qoʻshiladi).
Qayta yoʻnaltirilgan soʻrovlarga **hech qanday** header qoʻshilmaydi — payload oʻzgartirilmagan va model almashtirilgani javob tanasidagi `model` maydonida allaqachon koʻrinadi.

`GET /api/modality-bridge/stats` (`GET /api/settings` bilan bir xil darajadagi
boshqaruv autentifikatsiyasi) `vision`, `audio` va `video` uchun xotirada
saqlanadigan har bir modallik hisoblagichlarini
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` qaytaradi. `averageLatencyMs`
maxraj sifatida barcha urinishlardan emas, `latencySamples` qiymatidan
foydalanadi; vaqt o‘lchovi mavjud bo‘lmagan operatsiya soxta nol millisekundlik
namuna yaratmaydi. `bridged` muvaffaqiyatli konvertatsiyalar uchun orqaga
mos taxallus bo‘lib qoladi; muvaffaqiyatsiz urinishlar uning qiymatini oshirmaydi.
Hisoblagichlar dizaynga ko‘ra jarayon qayta ishga tushirilganda tiklanadi
(bu hisob-kitob emas, telemetriya).

#### Boshqaruv paneli konfiguratsiyasi

Maxsus boshqaruv paneli sahifasi
`/dashboard/settings/modality-bridge` manzilida joylashgan. Uning URL orqali
manzillanadigan `Vision`, `Audio` va `Video` ichki oynalari `tab` qiymatini
almashtirishda so‘rov parametrlarini saqlab qoladi. Vision ichki oynasi
yoqish/o‘chirish, rejim, model tanlash (jumladan, avtomatik standart), vazifani
hisobga oluvchi ko‘rsatmalar, kengaytirilgan vaqt tugashi/tasvir/tavsif
uzunligi/kesh cheklovlari, ish vaqti hisoblagichlari hamda himoyalangan namunaviy
so‘rovni taqdim etadi. Audio ichki oynasi ham faol: u yoqish/o‘chirish, Auto
variantiga ega faqat STT uchun model tanlagichi, vaqt tugashi/klipning maksimal
cheklovlari, audio hisoblagichlari va `input_audio` namunaviy sinovini taqdim
etadi. Video ichki oynasi ishlaydi: u FFmpeg/ffprobe ish vaqti holatini — to‘rtta
aniq interfeys holatidan birini (`unknown`, tekshiruv davom etayotganida yoki
yakunlanmaganida; `restricted`, boshqaruv paneli xosti loopback bo‘lmagani sababli
tekshiruv mijoz tomonida o‘tkazib yuborilganda; `unavailable`, tekshiruvdan keyin
mavjud emasligi tasdiqlanganda; yoki `available`, FFmpeg/ffprobe versiyalari bilan)
— ko‘rsatadi, yoqish/model/kadr/video/vaqt tugashi cheklovlarini saqlaydi, model
tanlagichini tasvir bilan ishlash imkoniyatiga ega modellar bilan cheklaydi va
video hisoblagichlarini taqdim etadi.

AI sozlamalari ostidagi avvalgi Vision Bridge kartasi endi yangi sahifaga
moslik havolasi hisoblanadi; u endi formaning ikkinchi nusxasini boshqarmaydi.
Media Providers ham mavjud Speech-to-Text sinov maydonchasini olib tashlamagan
holda Image-to-Text va Speech-to-Text ish jarayonlarini tegishli Modality Bridge
ichki oynalariga bog‘laydi.

**O‘z-o‘ziga halqa uchun qabul tekshiruvini chetlab o‘tish:** tavsiflash chaqiruvi
OmniRoute'ning o‘z `/v1` o‘z-o‘ziga halqasi (nostandart provayder modeli) orqali
yo‘naltirilganda, quyi so‘rov `x-omniroute-admission-bypass: internal` yuboradi
va aniqlangan o‘z-o‘ziga halqa hisob ma’lumoti — lokal rejimdagi mahalliy
`sk_omniroute` sentinel qiymati yoki operator sozlagan `OMNIROUTE_API_KEY` /
`ROUTER_API_KEY` muhit kaliti (#1350) — bilan autentifikatsiyadan o‘tadi. Shu
tariqa `REQUIRE_API_KEY=true` o‘rnatmalari ham tavsiflash chaqiruvini bajara
oladi. Chetlab o‘tish faqat aynan shu hisob ma’lumotlari uchun qabul qilinadi,
shuning uchun tashqi mijozlar qabul tekshiruvini o‘tkazib yuborish maqsadida bu
sarlavhadan foydalana olmaydi.

Eski standart qiymatlar `src/shared/constants/visionBridgeDefaults.ts` ichida;
yangi rejim/vazifani hisobga olish/kesh standartlari va sozlamalar aniqlagichi
esa `src/shared/constants/modalityBridgeDefaults.ts` ichida joylashgan.
Himoya mexanizmi testlar soxta `getSettings` va `callVisionModel` amalga
oshirishlarini kiritishi uchun `deps` konstruktor parametrini taqdim etadi.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Audio kiritishni qabul qilishi ma’lum bo‘lmagan nishonga yetib borishidan oldin
audio mavjud chat so‘rovlarini tutib oladi. U chat so‘rovini hech qachon boshqa
yo‘nalishga o‘tkazmaydi: audio qismlar mavjud OpenAI bilan mos ko‘p qismli
endpoint orqali matnga aylantiriladi va tanlangan chat modeli matnli
transkriptlar bilan ishlashda davom etadi.

Jarayon:

1. `supportsAudio` qiymatini `getResolvedModelCapabilities()` orqali aniqlang.
   Provayder reyestrining aniq metama’lumotlari ustunlikka ega, undan keyin
   statik model metama’lumotlari, so‘ng sinxronlangan `modalities_input` keladi.
   `audio` mavjud bo‘lmagan e’lon qilingan kirish ro‘yxati `false` hisoblanadi;
   imkoniyatga oid dalil bo‘lmasa, qiymat `null` bo‘lib qoladi. `false` ham,
   `null` ham konservativ ko‘prikni faollashtiradi, `true` esa uni chetlab o‘tadi.
2. `modalityBridgeAudio*` sozlamalarini aniqlang va umumiy `detectMediaParts()`
   detektori orqali har bir xabardan biriktirish mumkin bo‘lgan yuqori
   darajadagi audio qismlarni ajratib oling. Qo‘llab-quvvatlanadigan uzatish
   shakllari: OpenAI `input_audio`, `audio_url` va
   `source.media_type: "audio/*"`. Ichki joylashtirilgan audio yo‘naltirish uchun
   aniqlanadi, ammo biriktirish yo‘li tomonidan olib tashlanmaydi. Ish hajmi
   `modalityBridgeAudioMaxClips` bilan cheklanadi; keyingi qismlar o‘zgarishsiz
   qoladi.
3. Sozlangan `provider/model` qiymatiga amal qiling yoki
   `selectAudioBridgeModel()` funksiyasiga `AUDIO_TRANSCRIPTION_PROVIDERS`
   bo‘ylab barqaror katalog tartibida yurib, foydalanishga yaroqli faol provayder
   hisob ma’lumotiga ega birinchi modelni tanlashga ruxsat bering.
4. `callAudioTranscription()` base64/data-URI audioni ko‘p qismli `file` ga
   aylantiradi yoki masofaviy `audio_url` resursini DNS mahkamlashi va 25 MB
   chekloviga ega faqat ochiq manzillarga ruxsat beruvchi chiquvchi trafik
   himoyasi orqali yuklab oladi. So‘ng u fayl va tanlangan modelni
   `resolveSelfLoopBearer()` yordamida autentifikatsiya qilingan mahalliy
   `/v1/audio/transcriptions` o‘z-o‘ziga halqasiga POST so‘rovi orqali yuboradi.
   Mavjud transkripsiya yo‘li hisob ma’lumotlarini odatiy qidirish, kutish
   davri/tezlik cheklovi bilan ishlash va provayderga uzatishni bajaradi.
5. Muvaffaqiyatli chaqiruvlar tegishli qismlarni
   `[Audio N]: <transcript>` bilan almashtiradi. Chaqiruvlar
   `Promise.allSettled` bilan bajariladi: alohida xatolik o‘sha asl audio qismini
   saqlab qoladi (#4012 shartnomasi). Agar barcha chaqiruvlar muvaffaqiyatsiz
   tugasa va nishonning `supportsAudio === false` ekani isbotlangan bo‘lsa,
   qismlar `[Audio N]: (unavailable — no STT provider connected)` ga aylanadi
   (#8430 shartnomasi). Noma’lum nishon (`null`) uchun barcha chaqiruvlar
   muvaffaqiyatsiz tugagan natija o‘zgarishsiz qoladi. Faqat matn bilan ishlashi
   isbotlangan va foydalanishga yaroqli STT hisob ma’lumoti bo‘lmagan nishon
   tarmoq chaqiruvisiz ayni aniq to‘ldiruvchi matnni oladi.

Muvaffaqiyatli transkriptlar butun jarayon uchun umumiy Modality Bridge LRU/TTL
keshidan foydalanadi. Kalit audio havolasi, barqaror `audio-transcription`
operatsiya yorlig‘i va tanlangan STT modelini birlashtiradi; xatoliklar hech
qachon keshlanmaydi. Audio urinishlari umumiy `bridged`, `cacheHits`, `failures`
va `lastUsedAt` hisoblagichlarini yangilaydi. O‘zgartirilgan javoblar
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` sarlavhasini
oladi; o‘zgartirilmagan so‘rovlar Audio Bridge segmentini olmaydi.

Ish vaqti sozlamalari DB tomonidan ta’minlanadi va Zod yordamida tekshiriladi:

| Kalit                         | Standart qiymat | Diapazon              |
| ----------------------------- | --------------- | --------------------- |
| `modalityBridgeAudioEnabled`  | `true`          | —                     |
| `modalityBridgeAudioModel`    | `""`            | Avtomatik yoki STT ID |
| `modalityBridgeAudioTimeout`  | `60000`         | 1000–300000           |
| `modalityBridgeAudioMaxClips` | `3`             | 1–10                  |

Umumiy kesh `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` va `modalityBridgeCacheMaxEntries` orqali boshqarilishda davom etadi.

### Video koʻprigi (`videoBridge.ts`, `videoBridgePipeline.ts`)

Maʼlum ichki video qoʻllab-quvvatlash imkoniyatiga ega boʻlmagan maqsad chaqirilishidan
oldin Chat Completions `messages` va Responses API `input` ichidagi yuqori darajali
video qismlarini tutib qoladi. Qoʻllab-quvvatlanadigan shakllar: `input_video`,
`video_url`, `video_source`, HTTPS URL manzillari va `data:video/*;base64,...`
maʼlumot URI manzillari. Matndagi oddiy fayl nomlari video sifatida qabul qilinmaydi.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) soʻrovni aylanib chiqish,
imkoniyat/siyosat tekshiruvi, har bir soʻrov boʻyicha jamlash va javob foydali
yukini boshqaradi. Har bir video uchun bajariladigan ishlar — olish, butun natija
keshi, kadrlar ketma-ketligini tavsiflash (bunda chaqiruvchi eʼlon qilgan har qanday
audio transkripsiya birlashtiriladi), shuningdek har bir urinish uchun
metrikalar/bekor qilish/tozalash — `videoBridgePipeline.ts` ichidagi
`processVideoPart` ortida yashirilgan boʻlib, u `preCall` sikli ichida har bir
video qismi uchun bir marta chaqiriladi. Ushbu modul, shuningdek,
`VideoMediaBrokerPort` (baytlarni olish va namunaviy kadrlarni ajratib olish),
`VideoAudioTranscriptionPort` (chaqiruvchi eʼlon qilgan audio transkripsiyani
namunaviy kadr izohlari bilan birlashtirish) va `VideoDrilldownPort` (kadrlarni
chuqur tahlil qilish uchun saqlash chegarasi; hali `processVideoPart` bilan
ulanmagan — hozircha chuqur tahlil yozuvlarini faqat alohida
`/api/modality-bridge/video/drilldown` marshruti yozadi) aniq port chegaralarini belgilaydi.

Ommaviy `/v1` soʻrov yoʻli hech qachon quyi jarayonni import qilmaydi yoki
chaqirmaydi. Masofaviy videolar 50 MiB chegarasida yuklab olinadi; ichki base64
videolar uchun har bir videoga konservativ 36 MiB dekodlangan hajm chegarasi
qoʻllanadi, shunda model/xabarlar/ramkalash qobigʻi ommaviy JSON soʻrovlarini
qabul qilishdagi 50 MiB chegarasi ichida qolishi mumkin. Ichki maʼlumot uzunligi
va dekodlangan hajm baholari xotira ajratilishidan oldin tekshiriladi. Boshlangʻich
masofaviy URL va har bir qayta yoʻnaltirish uchun HTTPS talab qilinadi; bunda DNS
mahkamlashga ega mavjud faqat ommaviy chiqish himoyasi qoʻllanadi. Keyin baytlar
aniq ichki `POST /api/modality-bridge/video/extract` broker chegarasi orqali
oʻtadi. Ushbu marshrut ham `LOCAL_ONLY`, ham `SPAWN_CAPABLE` boʻlib, faqat har bir
jarayon uchun autentifikatsiyalangan, ishonchli loopback soʻrovini qabul qiladi
va hech qachon URL, fayl tizimi yoʻli, bajariladigan fayl yoki argumentlar
roʻyxatini qabul qilmaydi. API tanasi hajmini boshqarish konveyeri va ishlov
beruvchining tanani bosqichma-bosqich oʻquvchisi broker kirishi uchun 50 MiB
chegarasini bir-biridan mustaqil ravishda taʼminlaydi. Uning cheklangan navbati
bir vaqtning oʻzida bitta ajratib olish amalini bajaradi, kutayotgan toʻrtta
vazifaga ruxsat beradi va kutayotgan kirish maʼlumotlarini 100 MiB bilan cheklaydi.

Broker ichida `ffprobe` xususiy lokal faylni oʻqiydi; belgilangan formatlar
ruxsat roʻyxati pleylist va manifest formatlarini istisno qiladi. Ruxsat etilgan
MOV oilasidagi konteynerlar uchun tashqi MOV maʼlumot havolalari standart
holatda oʻchirilgan boʻlib qoladi va belgilangan buyruq ularni yoqmaydi.
`ffprobe` ham, `ffmpeg` ham faqat `file` protokoli ruxsat roʻyxati, bitta oqim,
belgilangan argument massivlari, shellsiz ishga tushirish va `PATH` orqali
aniqlanadigan bajariladigan fayllardan foydalanadi. Biriktirilgan muqova tasviri
oqimlari ijro etiladigan nomzodlar hisoblanmaydi. Barcha ijro etiladigan oqimlar
cheklovlarga mos kelishi shart va deterministik eng past indeksli zaxira
variantidan oldin aniq standart oqimga ustunlik beriladi. Videolar 600 soniya,
har bir oʻlcham boʻyicha 8 192 piksel va 33 554 432 manba pikseli bilan
cheklanadi. FFmpeg 1–16 ta oʻrta nuqtadagi JPEG kadrlarini namuna sifatida oladi,
kichikroq kirishlarni kattalashtirmasdan uzun tomonini koʻpi bilan 1 024
pikselgacha kichraytiradi va hech qachon URL qabul qilmaydi. Namuna olish
standart holatda `uniform`. Ixtiyoriy `scene_aware` va tajribaviy `segment_aware`
siyosatlari allaqachon tekshirilgan lokal oqim ustida bitta qoʻshimcha belgilangan
FFmpeg oʻtishini bajaradi, cheklangan `showinfo` sahna vaqt belgilarini tanlaydi
va detektor xatosi, vaqt tugashi, notoʻgʻri shakllangan chiqish yoki boʻsh
nomzodlar toʻplami yuz berganda deterministik tarzda ayni bir xil tekis
taqsimlangan oʻrta nuqtalarga qaytadi. Segmentlardan xabardor rejim oʻrta nuqta
namunalarini tekshirilgan sahna oraliqlariga mutanosib ravishda taqsimlaydi;
segmentlardan xabardor dalillar va zaxira xatti-harakati quyida batafsil
bayon qilingan. Qatʼiy 16 kadrli chegara
har bir siyosatda tanlashdan keyin qoʻllanadi. Sahnalardan xabardor soʻrovda
faqat bitta kadr byudjeti boʻlsa, u faol toʻliq video yoki fokus oynasining tekis
taqsimlangan oʻrta nuqtasidan foydalanadi va `policyEffective: uniform` deb
xabar beradi: tanlangan yagona sahna kadri vaqt oraligʻining har ikki uchini
saqlay olmaydi. Chaqiruvchi ixtiyoriy ravishda chekli fokus oynasini
(`start`/`end` soniyalari) taqdim etishi mumkin; chegaralar media davomiyligiga
moslab cheklanadi, teskari yoki chekli boʻlmagan oynalar rad etiladi va barcha
namuna olish siyosatlari faqat normallashtirilgan oraliq ichida bajariladi.
Hosil boʻlgan oyna namuna olish metamaʼlumotlariga va ishonchsiz tavsif
prefiksiga kiritiladi, shunda quyi oqimdagi modellar fokuslangan parchani toʻliq
vaqt chizigʻidan farqlay oladi.

Semantik izoh fokusi alohida, aniq sozlamadir. Standart `full`
tahlil rejimi mavjud kadr soʻrovini saqlab qoladi va soʻrov matnini hech qachon
izoh modeliga uzatmaydi. `focused` rejimida koʻprik ayni Chat yoki Responses
konteyneridan faqat foydalanuvchi yozgan eng soʻnggi boʻsh boʻlmagan
`text`/`input_text` qiymatini oʻqiydi, uni NFC formatiga normallashtiradi,
boshqaruv belgilarini va boʻsh joylarni birlashtiradi hamda 500 Unicode kod
nuqtasi bilan cheklaydi. Boʻsh natija aynan `full` soʻroviga qaytadi. Foydalanish
mumkin boʻlgan ishora maxsus ishonchsiz foydalanuvchi konteksti blokida JSON
sifatida serializatsiya qilinadi va faqat kuzatiladigan tafsilotlarga ustunlik
berishi mumkin; u mediadagi koʻrinadigan yoki eshitiladigan koʻrsatmalarga amal
qilmaslik haqidagi alohida ogohlantirishni bekor qila olmaydi. Matnli fokus hech
qachon `start`/`end` qiymatlarini keltirib chiqarmaydi yoki vaqt boʻyicha namuna
oluvchini oʻzgartirmaydi.

#### FU-07 tuzilmaviy segment dalillari

`segment_aware` allaqachon tekshirilgan mahalliy video oqimi ustida chegaralangan bitta dastlabki tahlil bosqichidan foydalanadi. Belgilangan filtrlar zanjiri avval kenglikni ko‘pi bilan 320 pikselgacha masshtablaydi, sahna almashishlari va qotib qolgan intervallarni aniqlaydi, so‘ng xiralik, o‘rtacha yorqinlik hamda fazoviy/vaqtinchalik axborot uchun soniyasiga 1 kadrdan namuna oladi. Bu bosqich 600 ta strukturaviy namuna, bitta FFmpeg/filtr oqimi, ayni faqat `file` protokoli va konteyner ruxsat ro‘yxatlari, jarayon chiqishi uchun 1 MiB chegara hamda brokerning umumiy bekor qilish/muddat chegarasi doirasida ko‘pi bilan 30 soniya bilan cheklangan. U so‘rovdan hech qachon buyruq, filtr, yo‘l yoki URL qabul qilmaydi.

Strukturaviy qiymatlar videoni semantik tushunish emas, balki deterministik namuna olish dalillaridir. Ular subyektlar, harakatlar, subtitrlar, nutq yoki foydalanuvchi niyatini aniqlamaydi. Sahna va qotib qolish chegaralari segmentlarni shakllantiradi; qotib qolish qamrovi, xiralik, ekspozitsiya, fazoviy tafsilotlar va vaqtinchalik o‘zgarishlar faqat mavjud 1–16 kadrli budjet qanday taqsimlanishiga ta’sir qiladi. To‘liq qotib qolgan segment ko‘pi bilan bitta kadr bilan cheklanadi, qotib qolmagan segmentlar esa qolgan budjet uchun raqobatlashadi. Chegaralar soni kadrlar sonidan oshganda, vaqt shkalasi bo‘ylab bir tekis qamrov saqlanadi, shu sababli boshlanishdagi tezkor kesishlar oxirdagi uzun segmentni yashira olmaydi. Qotib qolish chegarasining 1 soniyalik tahlil aniqligi ichidagi sahna chegaralari birlashtiriladi.

Filtrlarning yo‘qligi, noto‘g‘ri shakllangan/bo‘sh dalillar, detektor xatosi yoki chegaralangan dastlabki tahlilning kutish vaqti tugashi aynan bir tekis o‘rta nuqta siyosatiga ochiq tarzda qaytadi. Chaqiruvchining bekor qilishi yoki broker muddati ochiq tarzda qaytmaydi: u bajarilayotgan quyi jarayonni tugatadi, keyingi kadrlarni ajratib olishning oldini oladi va shaxsiy vaqtinchalik daraxt `finally` ichida o‘chiriladi.

`scripts/perf/video-bridge-fu07-eval.ts` deduplikatsiyadan keyingi subtitr chaqiruvlari tejalishi, zich harakat uchun budjet taqsimoti, xiralik/ekspozitsiya/SI-TI dalillari, uzun yakuniy qismga ega tezkor kesishlar va asta-sekin so‘nishdagi yolg‘on musbat natijalar uchun deterministik haqiqiy FFmpeg sinov namunalarini yaratadi. U dastlabki tahlilning real vaqtini va `/usr/bin/time` mavjud bo‘lganda quyi jarayonning CPU sarfi hamda eng yuqori RSS qiymatini qayd etadi. Uning sifat tekshiruvlari faqat strukturaviy etalonlardir. Haqiqiy subtitr modelining sifati `HOLD` holatida qoladi, chunki bu sinov vositasida vakolatli endpoint yoki qotirilgan baholovchi yo‘q. `--caption-cost-per-call-usd` har bir chaqiruv uchun aniq musbat xarajat bahosini taqdim etmasa, pul tejalishi ham `HOLD` holatida qoladi; skript hech qachon bu natijalarning birortasini soxtalashtirmaydi.

Har bir kadr 4 MiB, barcha xom kadrlar birgalikda 23 MiB va serializatsiya qilingan broker javobi 32 MiB bilan cheklangan. Shaxsiy vaqtinchalik katalog `finally` ichida o‘chiriladi. OmniRoute FFmpeg’ni o‘z ichiga olmaydi va maxsus bajariluvchi fayl yo‘lini qabul qilmaydi. Subtitr yaratishdan oldin ko‘prik konservativ vizual deduplikatsiya bosqichini qo‘llaydi: har bir JPEG 16×16 kulrang tusli buferga kichraytiriladi va faqat oxirgi saqlab qolingan kadr bilan taqqoslanadi. Bir kadrdan yuqori subtitr budjeti so‘ralganda, ajratib olish ushbu budjetdan ko‘pi bilan ikki baravar katta va hech qachon 16 kadrdan oshmaydigan chegaralangan nomzodlar to‘plamini taqdim etadi. So‘ralgan chegara faqat deduplikatsiyadan keyin qo‘llanadi; budjet kamida ikkita bo‘lganda, yakuniy siyraklashtirish davomida birinchi va oxirgi tanlangan nomzodlar saqlab qolinadi. Versiyalangan `grayscale-16x16-mean-cells-v2` siyosati o‘rtacha yorqinlik farqi va normallashtirilgan farqi kamida 0.05 bo‘lgan kichik tasvir kataklari nisbatidan kattasini qo‘llaydi. Dublikat chegarasi 0.04 o‘zgarmas qiymat bo‘lib, bajarilish vaqti sozlamasi sifatida taqdim etish o‘rniga bashorat qilinuvchanlik uchun tanlangan. Bu ikkilamchi yuqori kontrastli signal faqat o‘rtacha qiymatga asoslangan taqqoslash yashirishi mumkin bo‘lgan kichik harakatlar va ko‘rinadigan matn o‘zgarishlarini saqlaydi. Taqqoslagich yoki dekoder xatolari ochiq tarzda ishlashni davom ettiradi va qamrovni saqlaydi. Chiqish metama’lumotlari ajratib olingan nomzodlar, muvaffaqiyatli ishlatilgan kadrlar va olib tashlangan vizual dublikatlarni alohida ko‘rsatadi.

Aniq belgilangan video qismi vaqt tamg‘alari tushirilgan kontakt varag‘ini so‘rashi mumkin. Ko‘prik ko‘pi bilan 4 ustunli, 16 kadrli JPEG panjarasini yaratadi. Har bir 512 pikselli katak o‘z manbasining vaqt tamg‘asini yuqori kontrastli pastki tasmaga tushiradi, ayni vaqt tamg‘alari esa quyi oqimdagi bog‘lash va audit uchun matnli metama’lumotlarda saqlanadi. To‘liq JPEG 32 MiB bilan cheklangan holda qoladi. Agar `sharp` panjarani dekodlay yoki tuza olmasa, ko‘prik alohida JPEG kadrlarga qaytadi; mijozning bekor qilishi esa baribir varaq operatsiyasi orqali uzatiladi.

Ishga joriy etish dalillari sintetik kompozitsiya mikrobenchmarkidan ataylab ajratilgan. `scripts/perf/video-bridge-contact-sheet-eval.ts` haqiqiy OpenAI-mos ko‘rish modellari uchun sxema versiyasiga ega A/B sinov vositasini belgilaydi. U provayder bildirgan tokenlar, boshidan oxirigacha real kechikish (varaqni tuzish bilan birga), model chaqiruvlari soni va manifestda belgilangan faktlarning saqlanishini o‘lchaydi. Modelning xom javoblari hisobotga yozilmaydi; faqat SHA-256 dayjestlari va mos kelgan fakt ID’lari saqlanadi. `--execute-real` uzatilmasa hamda `--model`, `OMNIROUTE_BASE_URL` va `OMNIROUTE_API_KEY` sozlanmasa, sinov vositasi tarmoq yoki pullik model chaqiruvini amalga oshirmaydi. Bunday aniq haqiqiy ishga tushirishsiz uning mashina o‘qiy oladigan hukmi `HOLD` holatida qoladi; sintetik foydali yuk/chaqiruvlar soni o‘lchovlarining o‘zi ishga joriy etish dalili hisoblanmaydi.

Chaqiruvchilar qo‘llab-quvvatlanadigan video qismiga, agar ularda allaqachon moslashtirilgan matn mavjud bo‘lsa, ixtiyoriy `transcript.cues` massivini biriktirishi mumkin. Har bir cue `text`, tekshirilgan davomiylik ichidagi chekli `start`/`end` intervali va ruxsat ro‘yxatiga kiritilgan `source` (`client`, `embedded` yoki `audio-bridge`) qiymatini o‘z ichiga olishi kerak; `confidence` sukut bo‘yicha `1` bo‘ladi va `0` bilan `1` oralig‘ida qolishi shart. Aynan bir xil cue’lar birlashtiriladi. OmniRoute bu metama’lumotlardan hech qachon transkripsiyani boshlamaydi: tekshirilgan cue’lar manbasi, ishonch darajasi va intervali bilan birga tavsiflangan natijaga ko‘chiriladi hamda kadr subtitrlari yonida ishonchsiz kuzatuvlar sifatida ko‘rsatiladi. Noto‘g‘ri, diapazondan tashqaridagi yoki kelib chiqishi ko‘rsatilmagan matn subtitr oqimiga qo‘shish o‘rniga rad etiladi. So‘rov tanasidagi har ikkala transkript kanali taqdim etilgan kelib chiqishni, jumladan o‘zi bildirgan `embedded` yoki `audio-bridge` yorliqlarini ham `client` qiymatiga normallashtiradi. Faqat serverga tegishli adapter kod orqali beriladigan `trustedSource` argumenti yordamida ushbu ishonchli yorliqlarni tayinlay oladi; so‘rovdagi JSON maydoni bu argumentga yetib bora olmaydi. Transkript matni kelib chiqishidan qat’i nazar, media asosida olingan ishonchsiz kontent bo‘lib qoladi va hech qachon avtorizatsiyani belgilamasligi kerak.

Ilgʻor chaqiruvchi ayni video uchun `audioTranscript` trekini taqdim etishi mumkin;
u server transkripsiyasining isboti sifatida emas, mijoz taqdim etgan matn sifatida ko‘riladi.
Birlashtirish chegarasi vizual va audio kuzatuvlarni bitta muddat va bekor qilish
signali ostida ishga tushiradi, ularni umumiy vaqt shkalasida tartiblaydi, aynan bir xil
nusxalarni birlashtiradi va faqat bir tomon muvaffaqiyatli bo‘lganda qisman natijani
bildiradi. Yaroqsiz `audioTranscript` butun videoni xatoga olib kelish o‘rniga shu
qisman natijaga tushiriladi — vizual tavsif saqlab qolinadi, audio tarmoq esa
zararsizlantirilgan xato kodini qayd etadi. Har bir tarmoqning mavjudligi, qismanlik
bayrog‘i va zararsizlantirilgan xato kodlari tavsiflangan natijada, himoya cheklovi
metama’lumotlarida (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), natijalar keshi metama’lumotlarida va ko‘prikning
birlashtirish hisoblagichlarida saqlanadi. Standart Video Bridge yo‘li nutqni matnga
aylantirishni ishga tushirmaydi yoki medianing ikkinchi nusxasini yuklab olmaydi;
bunday aniq trek bo‘lmasa, u faqat video rejimida qoladi.

**Transkriptni saqlash (#12150 P1).** Bu Video Bridge (o‘zi ixtiyoriy ravishda
yoqiladi) transkript signalini yaratgan har qanday holatda avtomatik qo‘llanadi —
alohida saqlash bayrog‘i yo‘q. So‘rov istalgan transkript signalini (chaqiruvchi
e’lon qilgan `transcript` yoki birlashtirilgan `audioTranscript`) yaratganda,
himoya cheklovi uni `videoBridgeObserved` deb belgilaydi va video tavsifining
tahrirlangan yashirin nusxasini yaratadi — bu aynan bir xil render bo‘lib, undagi
har bir signalning erkin matnli tanasi `[redacted-video-transcript]` bilan
almashtiriladi; u satr yig‘ilishidan oldin tuzilmali signal maydonini almashtirish
orqali quriladi (hech qachon tekislangan matnni tahlil qilish orqali emas, shuning
uchun hech qanday signal mazmuni — zararli yoki oddiy, jumladan `[inaudible]`/
`[music]` kabi `]` belgisi mavjud tanalar — saqlanib qololmaydi). Saqlangan
chaqiruv jurnali so‘rov tanasi videodan olingan har bir matn qismini mazmun
tengligi bo‘yicha moslangan shu tahrirlangan yashirin nusxa bilan almashtiradi;
`fullText` langari chaqiruvdan oldingi yakunlangan himoya cheklovi foydali
yuklamasidan qayta o‘qiladi, shu sababli keyingi zanjir himoya cheklovlari (PII va
hisob ma’lumotlari niqoblagichlari, ustuvorliklari 10/95) tavsif matnini o‘z
joyida qayta yozganidan va tizim ko‘rsatmasi/topshirish/xotira kiritilishi xabarlar
massivini qayta shakllantirganidan keyin ham moslashtirish muvaffaqiyatli bo‘ladi.
Modelga yuqori oqim bo‘ylab yuboriladigan tana o‘zgarmaydi. Kuzatilgan so‘rov
bardavom Memory’ni ham to‘ldirmaydi (so‘rovdan ham, javobdan ham olinadigan
ajratib olish o‘tkazib yuboriladi), shuning uchun modelning o‘z javobi transkript
matnini Memory ichiga aks-sado sifatida qaytara olmaydi.

**Videoning xom maydonlari (#12430).** Ko‘prik yoqilgan va mahalliy video qo‘llovi noma’lum yoki mavjud bo‘lmaganda, belgilangan `transcript`/`audioTranscript` maydonlari, hatto tavsiflash muvaffaqiyatsiz tugagandan yoki `maxVideos` chegarasidan keyin ham, `videoBridgeObserved` holatini faollashtiradi. `null` va bo‘sh satrlar hisobga olinadi; mavjud bo‘lmagan maydonlar va videoga aloqador bo‘lmagan metama’lumotlar hisobga olinmaydi. Saqlanadigan nusxalarda bu maydonlar tahrirlanadi yoki so‘rov tashlab ketiladi, keshlar/Memory esa chetlab o‘tiladi.

Ushbu zaxira yo‘llarida chaqiruvchining yaroqli signallari nostandart provayder
maydonlari o‘rniga qo‘llab-quvvatlanadigan `text`/`input_text` qismlariga aylanadi.
So‘rov bilan taqdim etilgan har ikkala trek ham ishonchsiz `client` kuzatuvlari
bo‘lib qoladi va video tavsiflanmagani hamda vaqt belgilarining mediaga nisbatan
tekshirilmagani haqida aniq ogohlantirish beriladi. Mavjud 256 ta signal/64-KiB
umumiy va har bir signal uchun budjetlar ikki trekka birgalikda tatbiq etiladi;
vaqt belgilari brokerning 600 soniyalik yuqori chegarasiga va taqdim etilgan har
qanday fokus oynasiga mos kelishi kerak. Yaroqsiz treklar ixtiyoriy matn sifatida
uzatilmaydi, balki tashlab yuboriladi; ularning birgalikdagi budjeti oshib
ketmagan bo‘lsa, yaroqli yonma-yon trekdan foydalanish mumkin. Null/bo‘sh
maydonlar hech qanday matn qo‘shmaydi. Bu zaxira mexanizmi hech qanday media
olishni yoki transkripsiyani qo‘shmaydi. Transkript kengaytma maydonlari zaxira
video tashuvchisidan va uning `video_url`/`source` obyektlaridan olib tashlanadi.
OpenAI uzatish ro‘yxati qat’iyligicha qoladi; mahalliy qo‘llovi noma’lum video
tashuvchilari mavjudligicha qoladi, faqat matnni qo‘llashi ma’lum bo‘lgan
nishonlar esa xavfsiz markerlarni saqlaydi. Tuzilmali tahrirlash yashirin
nusxalari qo‘shilgan transkript matnini himoya qiladi, chaqiruvchiga tegishli asl
so‘rov esa o‘zgarmaydi. Mahalliy qo‘llovga ega nishonlar va o‘chirilgan
ko‘priklar mavjud chetlab o‘tish xatti-harakatini saqlab qoladi.

Qo‘shimcha saqlanadigan nusxalar ham ayni kuzatilgan-so‘rov signalidan
foydalanadi. Himoya cheklovlaridan oldingi xom mijoz so‘rovi oniy nusxasi,
xotiradagi kutilayotgan so‘rov va erta rad etilgan so‘rov jurnali video
qismlaridagi transkript maydonlarini tuzilmali ravishda almashtiradi; konveyer
bosqichlari va kontekstni topshirish tomonidan sintez qilingan satrli ko‘rsatmalar
saqlanadigan so‘rov tanasi qabul qiluvchisida tahrirlanadi. Saqlangan
`video_content_removed` markeri `previous_response_id` orqali davom ettirishni
ataylab olib tashlangan matnni qayta tiklash o‘rniga yopiq tarzda muvaffaqiyatsiz
qiladi. Agar kuzatilgan so‘rov jurnalga yozilishidan oldin har bir qism uchun
tahrirlash yashirin nusxasini yo‘qotsa yoki keyingi so‘rov o‘zgarishlaridan so‘ng
bir nechta video yashirin nusxalaridan hatto bittasi mos kelmasa, qisman
tahrirlangan transkriptni saqlab qolish o‘rniga saqlanadigan so‘rov tanasi
butunlay tashlab ketiladi.

Kuzatilgan so‘rov uchun model javobi transkriptning istalgan qismini tuzilmali
signal chegarasisiz iqtibos qilishi mumkin. Shu sababli uning saqlanadigan
chaqiruv jurnali `responseBody` maydoni tashlab ketish markeri bilan
almashtiriladi; batafsil konveyer artefakti (u yuqori oqim/mijoz tanalari va oqim
bo‘laklarini o‘z ichiga olishi mumkin) saqlanmaydi. Semantik, idempotentlik va
mulohazani qayta ijro etish keshlari bu so‘rov uchun o‘qish va yozishlarni chetlab
o‘tadi. Provayder so‘rovi va mijozga ko‘rinadigan javob o‘zgarmaydi. Batafsil
artefakt tashlab ketilganda, erta keepalive baytlari vaqtinchalik buferdan
chiqarib yuboriladi. Kiro’ning noto‘g‘ri shakllangan EventStream ogohlantirishi
faqat foydali yuklama baytlari sonini bildiradi, uning mazmunini yoki JSON
tahlilchisining xom xatosini hech qachon bildirmaydi.
Bu har bir aloqasiz provayder/plagin diagnostikasi tekshirilganini da’vo qilmaydi;
saqlanadigan qabul qiluvchilarni kengroq ko‘lamda tekshirish #11658 ichida
kuzatiladi.

Ichki `/api/modality-bridge/video/drilldown` hayotiy sikli alohida, loopback/token orqali autentifikatsiya qilinadigan kesh substratidir. Har bir operatsiya kanonik shaffof bo‘lmagan principal ID’ni ham talab qiladi. Production chaqiruvchisi yoqilishidan oldin u ushbu ID’ni autentifikatsiya qilingan tenantdan hosil qilishi va mijoz tanlagan qiymatni hech qachon uzatmasligi kerak. Kesh kalitlari ushbu principalni kanonik sessiya va video-reference ID’lariga bog‘laydi, faqat ularning SHA-256 asosida hosil qilingan kalitlarini saqlaydi hamda o‘qish va o‘chirish amallarini ayni principal doirasida cheklaydi. Kesh har bir yozuv uchun ko‘pi bilan 16 ta hosil qilingan JPEG kadrni saqlaydi, ularni o‘n daqiqadan keyin eskirgan deb hisoblaydi va chegaralangan `start`/`end` o‘qishlarini yoki sessiyani aniq o‘chirishni qo‘llab-quvvatlaydi.

Har bir principal 16 ta yozuv va 64 MiB kanonik JPEG ma’lumoti bilan cheklangan. Bu cheklovlar global 64 yozuv/256 MiB chegarasidan mustaqil: principal kvotasi bosimi global LRU chiqarib tashlashi ko‘rib chiqilishidan oldin faqat shu principalning eng uzoq vaqt ishlatilmagan yozuvlarini chiqarib tashlaydi. Kesh faoliyati vaqtida eskirgan yozuvlar principal va global hisobdan olib tashlanadi, bekor qilish va validatsiya xatosi esa qisman almashtirishni saqlamaydi.

Kesh kanonik bo‘lmagan Base64’ni, ortiqcha to‘ldirishni, JPEG bo‘lmagan mediani, noto‘g‘ri shakllangan yoki kesilgan JPEG’larni va chegaralangan to‘liq tasvir `sharp` dekodlashida ogohlantirish keltirib chiqaradigan JPEG’larni rad etadi. U har bir qabul qilingan tasvirni kanonik JPEG sifatida qayta kodlaydi, kenglik va balandlikni chaqiruvchi maydonlariga ishonish o‘rniga dekodlangan baytlardan aniqlaydi hamda oxirida kelgan har qanday polyglot baytlarni saqlab qolmasdan tashlab yuboradi. Har ikkala kvotaga faqat chegaralangan kanonik siqilgan bufer hisoblanadi. JSON uzatish chegarasi 32 MiB dekodlangan kirish chegarasi uchun Base64 qo‘shimcha hajmini ham o‘z ichiga oladi. Har bir saqlangan hosila uning validatsiya qilingan JPEG formati/rezolyutsiyasi, sampling siyosati, hosila versiyasi, yaratilish vaqti, server hisoblagan kontent xeshi va xeshlangan asosiy reference hamda ishonchli chaqiruvchining asosiy kontent xeshini qayd etadi. Atomar kesh commitidan oldin asinxron dekodlash/xeshlash bosqichlari orasida bekor qilish holati tekshiriladi.

Bu bosqich hali production producer’ini route’ga ulamaydi va ko‘p rezolyutsiyali variant tanlashni taqdim etmaydi. Shu sababli shaffof Video Bridge so‘rov yo‘li qo‘shimcha ish bajarmaydi, tenantga bog‘langan principalni hosil qilish va to‘liq FU-08 ko‘p rezolyutsiyali hayotiy sikli esa yakunlangan xatti-harakat sifatida hujjatlashtirilmay, alohida keyingi ish bo‘lib qoladi.

Kadrlarga sozlangan Video modeli yordamida ketma-ket caption yaratiladi. Bo‘sh Video override’i Vision sozlamasini meros qilib oladi; agar ikkalasi ham bo‘sh bo‘lsa, Vision auto-router’i amalda ishlatiladigan vision imkoniyatiga ega modelni tanlaydi. Muvaffaqiyatli caption’lar asl qismni barqaror `[Video description:` prefiksi bilan almashtiradi; bu prefiks matnni ishonchsiz, mediadan hosil qilingan kuzatuv sifatida ham belgilaydi va quyi oqimdagi modellarga mediadagi ko‘rsatmalarga amal qilmaslikni bildiradi. Kadr-caption kesh kalitlari JPEG baytlari, prompt, vaqt tamg‘asi va amaldagi modelni o‘z ichiga oladi; faqat muvaffaqiyatli caption’lar keshlanadi. Kesh yozuvlari haqiqiy muvaffaqiyatli producer modelini, jumladan fallback modelini ham saqlaydi; turli kadrlar turli modellar tomonidan yaratilganida bridge `mixed` deb xabar beradi. Keshdan topilgan natija producer identifikatorini so‘ralgan routing rejasi sifatida qayta belgilash o‘rniga undan qayta foydalanadi. Butun video natijasi keshi chiqishni o‘zgartiradigan har bir kirish bo‘yicha kalitlanadi — prompt, amaldagi model, sampling siyosati, kadrlar soni, semantik tahlil rejimi, normallashtirilgan focus hint’ning SHA-256 fingerprint’i, focus oynasi, `transcript`, `audioTranscript` va contact-sheet bayrog‘i — shu sababli bu o‘lchamlardan istalgan birini o‘zgartirish keshdan topilmaslikka olib keladi, eskirgan natijani qayta ishlatishga emas. Vizual dedup siyosati versiyasi, threshold’i va chegaralangan nomzod kadrlar soni ham natija-kesh kaliti va metama’lumotlarida aniq ko‘rsatiladi; shu sababli siyosat o‘zgarishi butun video uchun eskirgan tavsifni qayta ishlata olmaydi. Natija-kesh v4 metama’lumotlari rejim va fingerprint’ni saqlaydi, foydalanuvchining xom topshirig‘ini esa hech qachon saqlamaydi. Guardrail metama’lumotlari so‘ralgan va amaldagi tahlil rejimlarining ikkalasini ham ko‘rsatadi; foydalanishga yaroqli foydalanuvchi matnisiz so‘ralgan `focused` rejimi amalda `full` sifatida qayd etiladi.

Guardrail har bir qo‘llab-quvvatlanadigan video qismini ajratib oladi, ammo `modalityBridgeVideoMaxVideos` miqdoridan ortiq videoni tavsiflamaydi. `supportsVideo === false` ekanligi isbotlangan target uchun muvaffaqiyatsiz va limitdan oshgan videolar aniq xavfsiz matn markerlariga aylantiriladi, shuning uchun hech qanday xom video saqlanib qolmaydi. Imkoniyat noma’lum bo‘lsa, bu qismlar o‘z video tashuvchisini saqlab qoladi; har qanday fallback transcript yuqoridagi chegaralangan matnga aylantirishga amal qiladi. `supportsVideo === true` bo‘lgan target’lar bridge’ni chetlab o‘tadi. Mijoz so‘rovining abort signali yuklab olish, broker navbati, subprocess’lar va caption chaqiruvlari bo‘ylab uzatiladi; abort’lar videolar orasida ishlovni to‘xtatadi va hech qachon xom mediaga fail-open qilmaydi.

Runtime sozlamalari DB’da saqlanadi va Zod orqali validatsiya qilinadi:

| Kalit                               | Standart qiymat | Diapazon / xatti-harakat                                                                                              |
| ----------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`         | Ixtiyoriy ish muhiti, alohida yoqiladi                                                                                |
| `modalityBridgeVideoAnalysisMode`   | `"full"`        | `full` umumiy taglavhalarni saqlaydi; `focused` cheklangan, ishonchsiz so‘nggi foydalanuvchi kontekstidan foydalanadi |
| `modalityBridgeVideoModel`          | `""`            | Vision Bridge modelini meros qilib oladi                                                                              |
| `modalityBridgeVideoFrameCount`     | `8`             | 1–16                                                                                                                  |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`     | `uniform`, `scene_aware` yoki proporsional `segment_aware`; detektor xatosida `uniform`ga qaytiladi                   |
| `modalityBridgeVideoMaxVideos`      | `1`             | 1–4                                                                                                                   |
| `modalityBridgeVideoTimeout`        | `120000`        | 1000–120000 ms                                                                                                        |

Avvaldan saqlangan, 120 soniyadan yuqori Video kutish vaqti qiymatlari brokerning
oxirgi muddatigacha cheklanadi; ushbu chegaradan yuqori yangi sozlama yozuvlari rad etiladi.
`GET /api/modality-bridge/video/runtime` autentifikatsiya yoki ish muhitini tekshirishdan
oldin ishonchli muhrlangan loopback lokalligini, so‘ngra boshqaruv
autentifikatsiyasini talab qiladi. U faqat `available`, tozalangan FFmpeg/ffprobe versiyalari va ish muhiti mavjud bo‘lmaganda qat’iy belgilangan
sababni qaytaradi. Ichki ajratib olish endpointi ommaviy
yuklash API’si emas: navbatning to‘lishi `503` va `Retry-After`ni qaytaradi, chaqiruvchining
uzilishi `499`ni, brokerning qat’iy belgilangan oxirgi muddati esa `504`ni qaytaradi. Konvertatsiya qilingan javoblar
Vision yoki Audio segmentlarini olib tashlamasdan markaziy
`x-omniroute-modality-bridge` sarlavhasiga `video->text;model=<visionModel>;parts=<videos>`ni qo‘shadi.

### PII niqoblagichi (`piiMasker.ts`)

**Har ikki** bosqichda ishlaydi.

- **`preCall`** foydali yuklamani klonlaydi, `system`, `messages`, `input` va
  `prompt` bo‘ylab yuradi (jumladan, oddiy satr elementlari) hamda `content`/`text`
  satr maydonlariga (`@/shared/utils/inputSanitizer`dan)
  `processPII()`ni qo‘llaydi. `PII_REDACTION_ENABLED=true` bo‘lganda, aniqlangan
  PII chiquvchi foydali yuklamada tahrirlanadi. Bu `INPUT_SANITIZER_MODE`dan
  mustaqil (u faqat prompt-inyeksiya siyosatini boshqaradi). Tahrirlash o‘chirilgan
  bo‘lsa, chaqiruv kontentni qayta yozmasdan aniqlash sonlarini qayd etadi.
- **`postCall`** javobni chuqur klonlaydi, `sanitizePIIResponse()` va
  Responses-API shakli niqoblagichini (`maskResponsesOutput` — `output_text`
  hamda `output[].content[].text`ni qamrab oladi) ishga tushiradi. Agar biror
  tahrirlash amalga oshirilsa, o‘zgartirilgan javob asl javobning o‘rnini egallaydi.

Himoya qoidasi hech qachon bloklamaydi; u faqat izoh qo‘shadi (`meta.detections`,
`meta.redacted`) yoki qayta yozadi.

#### Tur bo‘yicha tanlash, maxsus andozalar va aniqlash hisoblagichlari

**Boshqaruv paneli → Sozlamalar → Xavfsizlik → PII niqoblash** _nima_
niqoblanishini tanlaydi. U niqoblashni yoqmaydi: buning uchun hanuz
`PII_REDACTION_ENABLED` (so‘rov) va `PII_RESPONSE_SANITIZATION` (javob + SSE)
ishlatiladi, ikkalasi ham standart holatda o‘chiq.

- **Tur bo‘yicha tanlash** — ichki identifikatorlar
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`)da keltirilgan. Qiymat
  berilmasa, barcha turlar nazarda tutiladi (bu sozlama paydo bo‘lishidan oldingi
  xatti-harakat). So‘rov mexanizmining `ssn_us` andozasi `ssn`ga mos keladi.
  Shablonlar (Minimal, Standart, Moliyaviy, Braziliya, AQSH, To‘liq) faqat
  foydalanuvchi interfeysidagi belgilash kataklarini to‘ldiradi.
- **Maxsus andozalar** — 20 tagacha muntazam ifoda yoki joker belgili andoza
  (`*` = bo‘shliq bo‘lmagan 64 tagacha belgi, `?` = bitta belgi). Mosliklar
  `[CUSTOM_REDACTED]`ga aylanadi. Har bir andoza `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`) orqali o‘tadi: ko‘pi bilan 500 ta belgi,
  bayroqlar `g i m s u` bilan cheklanadi, kompilyatsiya qilinishi, `safe-regex`
  tekshiruvidan (halokatli ortga qaytish) o‘tishi hamda bo‘sh satrga yoki tahrirlash
  to‘ldiruvchisiga mos kelmasligi kerak. Tekshiruvdan o‘tmagan andoza saqlash va
  sinash paytida rad etiladi, tekshiruvdan o‘tmagan saqlangan qator esa
  kompilyatsiya qilinmasdan ish vaqtida o‘tkazib yuboriladi. Maxsus andozalar
  faqat niqoblash yoqilgan paytda ishlaydi.
- **Aniqlash hisoblagichlari** — tur bo‘yicha sonlar (mos kelgan qiymatlar hech
  qachon saqlanmaydi) xotirada saqlanadi va qayta ishga tushirilganda tiklanadi
  (`src/lib/pii/piiDetectionStats.ts`). Ular faqat niqoblash yoqilgan paytda
  ortadi.

Sozlamalar `key_value` jadvalida (`pii_settings` nomlar sohasi,
`src/lib/db/piiSettings.ts`) saqlanadi va 1 soniyalik kesh orqali o‘qiladi. API:

| Metod  | Yo‘l                     | Maqsad                                                                                       |
| ------ | ------------------------ | -------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Bayroq holati, `enabledTypes`, `customPatterns`, aniqlash hisoblagichlari                    |
| `PUT`  | `/api/settings/pii`      | `enabledTypes` (`null` = barchasi) va/yoki `customPatterns`ni almashtirish                   |
| `POST` | `/api/settings/pii/test` | Bitta andozani ko‘pi bilan 8 KB namunaga nisbatan sinovdan o‘tkazish; hech narsa saqlanmaydi |

Uchalasining barchasi boshqaruv autentifikatsiyasini talab qiladi va tanani Zod
(`src/shared/validation/schemas/piiSettings.ts`) yordamida tekshiradi.

### Prompt-inyeksiya (`promptInjection.ts`)

Foydalanuvchi taqdim etgan kontentdagi zararli tuzilmalarni aniqlaydi va
sozlangan siyosatni majburiy qo‘llaydi. Xatti-harakat muhit o‘zgaruvchilari va
konstruktor parametrlariga bog‘liq:

| Sozlama            | Muhit o‘zgaruvchisi                                                                                         | Standart qiymat | Ta’siri                                                                                                                                                                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Yoqilgan           | `INPUT_SANITIZER_ENABLED`                                                                                   | `true`          | `false` bo‘lganda, himoya mexanizmi tekshiruvni darhol yakunlaydi.                                                                                                                                                                      |
| Rejim              | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                             | `warn`          | Inyeksiya siyosati: `block`, `warn` yoki `log`. (`redact` orqaga muvofiqlik uchun qabul qilinadi, ammo inyeksiya matnini **olib tashlamaydi**; so‘rovdagi PII ma’lumotlarini qayta yozish `PII_REDACTION_ENABLED` orqali boshqariladi.) |
| Bloklash chegarasi | `blockThreshold` opsiyasi / `INPUT_SANITIZER_BLOCK_THRESHOLD` (`INJECTION_GUARD_BLOCK_THRESHOLD` taxallusi) | `high`          | Bloklash uchun talab qilinadigan minimal jiddiylik darajasi. Standart holatda o‘rta daraja faqat kuzatiladi.                                                                                                                            |

**Rejim ustuvorligi** (`getMode`): chaqiruvchining `options.mode` qiymati →
`INJECTION_GUARD_MODE` **DB funksional bayroq bekor qilishi** (Boshqaruv paneli → Sozlamalar →
Funksional bayroqlar) → `INJECTION_GUARD_MODE` muhit o‘zgaruvchisi → `INPUT_SANITIZER_MODE` muhit o‘zgaruvchisi →
`warn`. Shu sababli boshqaruv panelidagi bekor qilish muhit o‘zgaruvchilaridan ustun turadi va Funksional
bayroqlar interfeysi ishlayotgan himoya mexanizmini real vaqt rejimida boshqaradi (qayta ishga tushirish talab etilmaydi). DB o‘qilishi xatolarga chidamli:
agar xatolik yuz bersa, himoya mexanizmi muhit o‘zgaruvchilariga asoslangan xatti-harakatga qaytadi; hech qanday
bekor qilish o‘rnatilmaganida esa xatti-harakat faqat muhit o‘zgaruvchilari orqali aniqlanadigan holat bilan bir xil bo‘ladi.

Aniqlash manbalari:

1. `@/shared/utils/inputSanitizer` modulidagi `sanitizeRequest()` (konveyerning
   boshqa qismlarida ham ishlatiladigan umumiy detektorlar to‘plami).
2. Ichki `DEFAULT_GUARD_PATTERNS` (hozirda `system_override_inline` va
   `markdown_system_block`, ikkalasi ham `high` jiddiylik darajasiga ega).
3. Konstruktor opsiyalari orqali uzatiladigan ixtiyoriy `customPatterns` (satrlar, muntazam ifodalar
   yoki `{ name, pattern, severity }` yozuvlari).

`mode === "block"` bo‘lganda **va** kamida bitta aniqlangan holat jiddiylik
chegarasiga yetsa, `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }` qiymatini qaytaradi. `warn`/`log` rejimlarida himoya mexanizmi jurnalga yozadi, ammo
chaqiruvga ruxsat beradi. Umumiy yordamchi `evaluatePromptInjection()` ham
reestr orqali o‘tmasdan promptlarni baholashi kerak bo‘lgan chaqiruvchilar uchun eksport qilinadi.

**Skanerlash chegarasi (v3.8.20):** detektor birlashtirilgan prompt matnining faqat **dastlabki 16 KB** qismini
tekshiradi — `src/shared/utils/inputSanitizer.ts` faylida
`MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bayt). `detectInjection()` ham,
`evaluatePromptInjection()` ham andozalar siklini ishga tushirishdan oldin
`slice(0, MAX_INJECTION_SCAN_BYTES)` ni qo‘llaydi. Inyeksiya direktivalari kiritmaning yuqori qismiga yaqin joylashadi, shuning uchun bu
yuzlab KB hajmdagi foydali yuklamalarda regex CPU/GC sarfini aniqlash samaradorligini pasaytirmasdan
cheklaydi (qarang: #3932, #4041).

### Hisob ma’lumotlarini maskalovchi (`credentialMasker.ts`)

**Har ikkala** bosqichda ham, standart zanjirning oxirida ishlaydi (ustuvorlik `95`). Chiquvchi foydali yuklamadagi (xabar
mazmuni, vosita chaqiruvi argumentlari, vosita natijalari) **hamda** provayder javobidagi
keng tarqalgan API kaliti / maxfiy token andozalarini yashiradi. Natijada promptga joylangan hisob ma’lumotlari
(yoki vosita natijasi tomonidan qaytarilganlari) tashqi provayderga yoki mijozga qayta sizib chiqmaydi.

- **Faqat faol rozilik bilan yoqiladi**, PII ma’lumotlarini yashirish bilan bir xil qoida (Qat’iy qoida #20 bilan bog‘liq):
  `settings.credentialRedactionEnabled === true` **yoki**
  `CREDENTIAL_REDACTION_ENABLED=true` bo‘lmasa, o‘chirib qo‘yiladi. O‘chiq holatda himoya mexanizmi hech qanday amal bajarmaydi —
  u hech qachon bloklamaydi va hech qachon qayta yozmaydi.
- `redactCredentials()` foydali yuklama/javob daraxtini to‘liq kezib chiqadi (`walkValue()`,
  prototip ifloslanishidan himoyalangan, `WeakSet` orqali sikllardan himoyalangan) va mos keluvchi qiymatlarni
  `[REDACTED:<type>]` to‘ldiruvchisi bilan almashtiradi, faqat amalda
  o‘zgargan shoxlarni klonlaydi.
- `CREDENTIAL_PATTERNS` LLM provayderlari kalitlarini (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokenlarini (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), to‘lov kalitlarini (Stripe, Square), bulut
  kalitlarini (AWS kirish kaliti, Twilio, SendGrid, Mailgun), maxfiy kalitlar / JWTlarni,
  hisob ma’lumotlarini o‘z ichiga olgan ulanish satrlarini (`mongodb://user:pass@...` va boshqalar) hamda
  umumiy `Authorization`/`x-api-key`/`api-key`/`apikey` sarlavha-qiymat
  andozasini qamrab oladi. Sarlavha shaklidagi kalitlar (`authorization`, `x-api-key`, `api-key`,
  `apikey`) umumiy matn regexi orqali emas, balki tuzilmaviy tarzda yashiriladi (faqat qiymat yashiriladi,
  `Bearer `/`Basic ` kabi sxema prefiksi saqlanadi).
- Himoya mexanizmi hech qachon bloklamaydi; u faqat qayta yozadi (`modifiedPayload` /
  `modifiedResponse`) va izohlaydi (`meta.credentialsRedacted`, `meta.count`).

Regressiyadan himoya testi: `tests/unit/credential-masker-guardrail.test.ts`.

## Asosiy kontrakt (`base.ts`)

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
  block?: boolean; // true zanjir bajarilishini darhol toʻxtatadi
  message?: string; // bloklanganda koʻrsatiladi
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // soʻrovni qayta yozish uchun preCall tomonidan qaytariladi
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

Himoya cheklovi `void`, `{}` yoki `{ block: false }` qiymatlaridan birini
qaytarish orqali «oʻzgarish yoʻq» holatini bildiradi. `modifiedPayload`/`modifiedResponse`
qaytarilishi zanjir boʻylab keyingi himoya cheklovlariga uzatilayotgan qiymatni
almashtiradi. `signal?: AbortSignal` chaqiruvchining hayot siklini himoya
cheklovlariga uzatadi. Soʻrovning bekor qilinishi ataylab qoʻllanadigan ochiq
oʻtkazish istisnosidir: media koʻpriklari ishni toʻxtatadi va tozalashni amalga
oshiradi, bunda xom media uni qoʻllab-quvvatlamasligi maʼlum boʻlgan maqsadga
qayta tiklanmaydi.

## Reestr (`registry.ts`)

Yagona `guardrailRegistry` nusxasi quyidagilarni taqdim etadi:

- `register(guardrail)` — himoya cheklovini qoʻshadi (yoki normallashtirilgan
  nom boʻyicha almashtiradi) va roʻyxatni `priority` qiymatining oʻsish tartibida
  qayta saralaydi.
- `clear()` / `list()` — maʼmuriy yordamchi funksiyalar.
- `runPreCallHooks(payload, context)` — faol himoya cheklovlarini ketma-ket
  bajaradi, foydali yuklamani `modifiedPayload` orqali uzatadi va birinchi
  `block: true` holatida toʻxtaydi.
- `runPostCallHooks(response, context)` — javob tomonida xuddi shu oqimni
  bajaradi.
- `resetGuardrailsForTests({ registerDefaults })` — holatni tozalaydi va
  testlarni izolyatsiya qilish uchun ixtiyoriy ravishda standart himoya
  cheklovlarini qayta roʻyxatdan oʻtkazadi.

Har ikkala bajaruvchi ham `{ blocked, payload|response, results, guardrail?, message? }`
qiymatini qaytaradi, bunda `results` har bir himoya cheklovi uchun `blocked`,
`skipped`, `modified`, `error` va `meta` maydonlarini oʻz ichiga olgan
`GuardrailExecutionResult` yozuvlari massivi boʻlib, kuzatuv uchun foydalidir.

### Har bir soʻrov uchun himoya cheklovlarini oʻchirish

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` joriy soʻrov uchun
oʻtkazib yuborilishi kerak boʻlgan himoya cheklovlari nomlarining takrorlanmaydigan
roʻyxatini jamlaydi. Manbalar (barchasi ixtiyoriy, barchasi birlashtiriladi):

- `apiKeyInfo.disabledGuardrails`
- Soʻrov tanasidagi `disabledGuardrails` (yuqori darajada)
- Soʻrov tanasidagi `metadata.disabledGuardrails`
- `x-omniroute-disabled-guardrails` sarlavhasi (yoki eski
  `x-disabled-guardrails`)

Qiymatlar satrlar massivi yoki vergul bilan ajratilgan satr boʻlishi mumkin;
nomlar kichik harflardagi kebab-case formatiga normallashtiriladi
(`pii_masker` → `pii-masker`). Natija `context.disabledGuardrails` orqali
reestrga uzatiladi va reestr mos keluvchi himoya cheklovlarini oʻtkazib yuboradi
(`results` ichida `skipped: true`).

## Bajarilish tartibi

`src/sse/handlers/chat.ts` va `open-sse/handlers/chatCore.ts` orqali oʻtadigan har bir soʻrov uchun:

1. `resolveDisabledGuardrails(...)` API kaliti, soʻrov tanasi va sarlavhalar asosida oʻtkazib yuboriladigan himoya mexanizmlari roʻyxatini tuzadi.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` himoya mexanizmlarini ustuvorlikning oʻsish tartibida ishga tushiradi:
   - Oʻchirilgan himoya mexanizmlari `skipped` sifatida qayd etiladi.
   - Har bir himoya mexanizmining `preCall` funksiyasi `modifiedPayload` orqali foydali yuklamani qayta yozishi mumkin.
   - Birinchi `block: true` zanjirni muddatidan oldin toʻxtatadi va ishlov beruvchi himoya mexanizmi tomonidan rad etilganlik javobini qaytaradi.
3. (Qayta yozilgan boʻlishi mumkin boʻlgan) foydali yuklama kombinatsiyalangan marshrutlash va yuqori oqimga joʻnatish jarayoniga oʻtadi.
4. Javob shakllantirilgach, `guardrailRegistry.runPostCallHooks(...)` javob ustida ayni zanjirni ishga tushiradi. Bu yerda `block: true` yuqori oqim javobini bekor qiladi.

Istisno chiqaradigan himoya mexanizmlari `error: <message>` bilan qayd etiladi va `logger.warn` orqali jurnalga yoziladi, ammo zanjir davom etadi — bu ataylab ochiq xato siyosati asosida ishlaydi.

## Konfiguratsiya

Ichki himoya mexanizmlari oʻqiydigan muhit oʻzgaruvchilari:

| Oʻzgaruvchi                           | Foydalanadigan mexanizm  | Taʼsiri                                                                                                                             |
| ------------------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`       | Aniqlashni butunlay oʻchirish uchun `false` qiymatini belgilang.                                                                    |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`       | Inʼeksiya siyosati: `warn`, `block` yoki `log`. Eski `redact` qiymati inʼeksiya matnini qayta yozmaydi.                             |
| `INJECTION_GUARD_MODE`                | `prompt-injection`       | Inʼeksiya himoyasi rejimi; shuningdek, muhit oʻzgaruvchilarini **ustunlik bilan almashtiradigan** MB xususiyat bayrogʻi (MB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`       | `MODE=block` rad etadigan minimal jiddiylik darajasi: `high` (standart), `medium` yoki `low`.                                       |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`       | `INPUT_SANITIZER_BLOCK_THRESHOLD` uchun eski muqobil nom.                                                                           |
| `PII_REDACTION_ENABLED`               | `pii-masker`             | `true` boʻlganda, soʻrovdagi PII tahrirlanadi (inʼeksiya rejimidan mustaqil ravishda).                                              |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (quyi oqim) | Javob tomonidagi niqoblash mexanizmi xatti-harakatini boshqaradi.                                                                   |

Modality Bridge himoya mexanizmlari ish vaqti konfiguratsiyasini muhit oʻzgaruvchilaridan emas, MB tomonidan qoʻllab-quvvatlanadigan sozlamalar omboridan (`getSettings()`) oʻqiydi. Vision uchun asosiy kalitlar:
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` va
`modalityBridgeCacheMaxEntries`. Eski
`visionBridge*` kalitlari faqat hujjatlashtirilgan bir siklli oʻqish
zaxira varianti sifatida qabul qilinadi; boshqaruv panelidagi yozuvlar asosiy kalitlardan foydalanadi. Standart qiymatlar va zaxira variantni aniqlovchi
`src/shared/constants/modalityBridgeDefaults.ts` faylida joylashgan, eski
konstantalar esa `src/shared/constants/visionBridgeDefaults.ts` faylida saqlab qolingan.

Audio `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` va `modalityBridgeAudioMaxClips`, shuningdek, umumiy
`modalityBridgeCache*` sozlamalaridan foydalanadi. Audio uchun eski kalitlarga qaytish imkoniyati yoʻq, chunki bu
kalitlar Modality Bridge sxemasi bilan birga joriy etilgan.

Video `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` va
`modalityBridgeVideoTimeout`, shuningdek, umumiy `modalityBridgeCache*` sozlamalaridan foydalanadi.
U standart holatda oʻchirilgan, chunki FFmpeg/ffprobe ixtiyoriy operatsion
bogʻliqliklar hisoblanadi va kadrlarga tavsif yaratish kechikish hamda model xarajatini oshiradi.

## Maxsus Guardrail’lar

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

1. `BaseGuardrail`ni kengaytiruvchi `src/lib/guardrails/myGuardrail.ts` faylini yarating.
2. `preCall` va/yoki `postCall`ni amalga oshiring.
3. Import vaqtida roʻyxatdan oʻtkazing (`registerDefaultGuardrails`dan qoʻshing) yoki
   bajarilish vaqtida `guardrailRegistry.register(...)`ni chaqiring — registr
   bir xil normallashtirilgan nomga ega oldingi guardrail’ni almashtiradi.
4. Testlarni `tests/unit/` ichiga qoʻshing (mavjud misollar:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testlash

Maʼlum holatdan boshlash uchun testlar orasida `resetGuardrailsForTests()`dan foydalaning.
Boʻsh registr bilan boshlash va faqat test qilinayotgan guardrail’larni roʻyxatdan
oʻtkazish uchun `{ registerDefaults: false }`ni uzating. Vision Bridge bogʻliqliklarni
kiritishni (`deps.getSettings`, `deps.callVisionModel`) qabul qiladi; Audio Bridge esa
sozlamalar, imkoniyatlar, STT modelini tanlash, hisob maʼlumotlarini tekshirish va
transkripsiya uchun mos ekvivalent ulanish nuqtalarini taqdim etadi. Shu sababli testlar
har ikkala oqimni ham maʼlumotlar bazasi yoki tarmoqqa ulanmasdan sinashi mumkin.

## Shuningdek qarang

- `src/lib/guardrails/` — amalga oshirish
- `src/shared/utils/inputSanitizer.ts` — prompt-injection va PII niqoblashni
  taʼminlovchi umumiy detektor
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge standartlari va
  majburiy bridge modellari roʻyxati
- `src/shared/constants/modalityBridgeDefaults.ts` — umumiy Vision/Audio bajarilish muhiti standartlari
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonal qatlam (circuit breaker, kutish davrlari)
- `docs/reference/ENVIRONMENT.md` — muhit oʻzgaruvchilarining toʻliq maʼlumotnomasi

## Injection-guard marshrut qamrovi va red-team (8-bosqich · D blok)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) foydalanuvchi promptlarini
qabul qiladigan barcha marshrutlarni qamrab oladi. U `INJECTION_GUARD_MODE`ga amal qiladi
(standart `warn` = faqat jurnalga yozish; `block` = HTTP 400 `SECURITY_001`ni qaytaradi).

| Tur           | Marshrutlar                                                                                                                                          | Standart rejim |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Matn (mavjud) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn           |
| Generativ     | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn           |
| Maʼlumotlar   | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn           |

Matnni ajratib olish (`extractMessageContents`) `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`ni qamrab oladi.

**Red-team (har kecha, `nightly-llm-security.yml`):** promptfoo har bir marshrut
`INJECTION_GUARD_MODE=block` holatida OWASP-LLM korpusini bloklashini tekshiradi; garak
probelarni ishga tushiradi (maxfiy kalit boʻlmasa, oʻtkazib yuboradi).
Izchillik uchun `moderations` ham kiritilgan — `block` rejimidagi operatorlar uni
`resolveDisabledGuardrails` orqali istisno qilishi mumkin.

Har kechalik ish jarayoni (`.github/workflows/nightly-llm-security.yml`, cron + qoʻlda
ishga tushirish) ikkita vazifaga ega:

- **`promptfoo-guard` (bloklovchi)** — `INJECTION_GUARD_MODE=block` bilan
  `promptfoo eval -c promptfooconfig.yaml`ni ishga tushiradi. Har bir zararli holat
  (masalan, "barcha oldingi koʻrsatmalarni eʼtiborsiz qoldir…", DAN uslubidagi
  jailbreak’lar) javobda `error.code === "SECURITY_001"` mavjudligini, yaʼni guard
  soʻrovni amalda rad etganini tekshiradi.
- **`garak` (tavsiyaviy)** — lokal OmniRoute nusxasiga
  (`http://localhost:20128/v1`) qarshi garak’ni `--probes promptinject,dan,leakreplay`
  bilan ishga tushiradi. U provayder maxfiy kalitiga (`PROMPTFOO_PROVIDER_KEY`)
  bogʻlangan; kalit boʻlmasa muammosiz oʻtkazib yuboradi va `|| true` bilan
  yakunlanadi, shu sababli CI’ni muvaffaqiyatsiz qilmasdan hisobot beradi.

Guard yordamchisining (`createInjectionGuard` / `withInjectionGuard`) qamrovi
prompt qabul qiluvchi har bir `/v1` marshrutini oʻz ichiga oladi; prompt matni
`src/shared/utils/inputSanitizer.ts` ichidagi `extractMessageContents()` tomonidan
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`dan olinadi.
