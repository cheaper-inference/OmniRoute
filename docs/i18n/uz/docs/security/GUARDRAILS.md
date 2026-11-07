# Guardrails (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Haqiqat manbai:** `src/lib/guardrails/`
> **Oxirgi yangilangan:** 2026-10-17 — v3.8.52 (qo'shildi: [Qamrov va cheklovlar](#coverage-and-limits):
> hook'lar qaysi marshrutlar va javob yo'llariga yetishi, birlashtirilgan o'chirish sarlavhalari (#16412), majburiy chegara sifatida in'eksiyani bloklash rejimi (#16413) va post-call'dan oldin javobni nima ko'rishi)

Guardrail'lar OmniRoute va yuqori oqim provayderlari o'rtasidagi chegarada xavfsizlik, siyosat va kontent transformatsiyalarini amalga oshiradi. Har bir guardrail so'rov yuklamalarini (`preCall`) va yuqori oqim javoblarini (`postCall`) tekshirishi (va ixtiyoriy ravishda rad etishi, transformatsiya qilishi yoki izohlashi) mumkin.

Tizim **fail-open** tamoyilida ishlaydi: agar guardrail bajarilish paytida xatolik tashlasa, reyestr xatolikni qayd etadi va so'rovni muvaffaqiyatsiz qilish o'rniga keyingi guardrail bilan davom etadi. Bloklash aniq qarordir (`block: true`), hech qachon tasodif emas. Yagona istisno — bekor qilingan so'rov: chaqiruvchining `signal`i bekor qilinganda, xatolik tashlagan guardrail o'tkazib yuborilish o'rniga hook ishga tushirilishini rad etadi.

Hook'lar har bir marshrutda yoki har bir javobda ishga tush**maydi**. Guardrail'ga xavfsizlik nazorati sifatida tayanishdan oldin [Qamrov va cheklovlar](#coverage-and-limits) bo'limini o'qing.

## O'rnatilgan to'siqlar

Ro'yxatga olish kitobi oltita to'siqni import qilishda ustuvor tartibda avtomatik yuklaydi ( `registry.ts` → `registerDefaultGuardrails()` ga qarang):

| Ustuvorlik | Ism                 | Bosqich(lar)   | Fayl                  |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Pastroq ustuvor raqamlar ishlaydi** birinchi** .

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

GLM 5.3 asosiy modeli va `glm-5.3-{low,high,max}` aniq `supportsVision:false` registry/spec metamaʼlumotlariga ega. GLM 5.3 Flash variantlari mahalliy ko'rish modellari bo'lib qolmoqda. Claude Code `/v1/messages` marshruti umumiy `handleChat` qo‘ng‘iroqdan oldingi qo‘riqlash zanjiriga kiradi** oldin** Kloddan OpenAIga tarjima; Tarjima ularni OpenAI `image_url` kontentiga koʻtarishdan oldin (#17069) ichki oʻrnatilgan `Read` asbob-natijalari tasvirlari tasvirlanishi yoki qayta ishlanishi kerak.

Yo'naltirilgan tasvirni ko'rsatadigan so'rovlarni ushlab turadi** ko'rinmaydigan modellar** va yo butun so'rovni ko'rish qobiliyatiga ega modelga yo'naltiradi yoki yuqori oqim qo'ng'irog'idan oldin sozlanishi ko'rish modeli tomonidan ishlab chiqarilgan tasvir qismlarini matn tavsiflari bilan almashtiradi. Bu faqat matnli provayderlarga multimodal foydali yuklarni shaffof tarzda boshqarish imkonini beradi.

Oqim:

1. Maqsadli model allaqachon ko'rishni qo'llab-quvvatlasa, o'tkazib yuboring (agar u majburiy ko'prik ro'yxatida ko'rinmasa `isVisionBridgeForcedModel`).
2. Tasvir qismlarini `extractImageParts(messages)` (`visionBridgeHelpers.ts`) orqali ajratib oling** yagona media detektori** `detectMediaParts()` in `open-sse/utils/mediaParts.ts` — kombinatsiyalangan muvofiqlik filtri bilan bo'lingan yagona haqiqat manbai. Ekstraksiyaga `replaceImageParts` birikishi mumkin boʻlgan shakllar roʻyxatiga kiritilgan (koʻchirma ↔ shartnomani almashtiradi): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`, va Responses API `input_image`. Claude Code `tool_result.content` va Responses vositalarining chiqishlari ichiga joylashtirilgan mos tasvirlar ham chiqariladi va asl yo'llarida almashtiriladi; faqat indikatorli shakllar kombo-filtr materialidir va ular chiqarilmaydi. Agar topilmasa, o'tkazib yuboring.
3. Ish vaqti konfiguratsiyasini `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`) orqali hal qiling: yangi `modalityBridge*` sozlamalari kalitlari g'alaba qozonadi; eski `visionBridge*` kalitlari qoladi a** bir davrli qaytish** (Orqaga qaytarish oynasi). Ko'prik o'chirilgan bo'lsa, har qanday media o'tishdan oldin o'tkazib yuboring.
4. Rejim selektori (`modalityBridgeVisionMode`, quyidagi jadvalga qarang) yo‘nalishni o‘zgartirish va ta’riflashni hal qiladi. Qayta marshrut `modifiedPayload` faqat `model` almashtirilgan va meta `{ rerouted, fromModel, toModel, imagesKept }` bilan qaytaradi.
5. Yo'lni tavsiflang: `maxImages` da tasvirlarni qo'llang, vazifani biladigan taklifni tuzing, tavsif keshiga murojaat qiling, ko'rish modeliga qo'ng'iroq qiling** parallel ravishda** (`Promise.allSettled`) va ularning oʻrniga `[Image N]: <description>` matn qismlarini kiriting. Muvaffaqiyatsiz tavsif `null` hosil qiladi: xom tasvir unknown/vision-capable maqsadlari uchun saqlanadi (#4012), lekin a** tasdiqlangan faqat matnli to'g'ridan-to'g'ri maqsad** yoki nol koʻrish kombinatsiyasi har bir taʼriflanmagan tasvir uchun aniq `(unavailable — no vision-capable provider connected)` matn stubiga ega boʻladi, jumladan, qisman nosozliklar va tavsiflangan qoʻngʻiroq chegarasidan tashqaridagi tasvirlar (#17069). Mavjud nomutanosib kombinatsiya o'z o'rnida qolganlarni tasvirlaydi (#8430).
6. `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`) ni qaytaring.

#### Rejim selektori (`modalityBridgeVisionMode`)

| Rejim      | Standart | Xulq-atvor                                                                                                                                                                                                                                                                                                                                                           |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Eski evristik, tegilmagan (#6640/#7204): kombinatsiyalangan bo'lmagan/`auto/` modellari, agar original modelda foydalanish mumkin bo'lgan hisobga olish ma'lumotlari bo'lmasa, eng yaxshi ko'rish modeliga yo'naltiriladi (keyin tavsiflang); kombinatsiyalangan maqsadlar har doim tasvirlaydi.                                                                     |
| `describe` |          | Har doim — ta'riflang Qayta yo'nalish bloki butunlay o'tkazib yuboriladi; foydalanuvchi tanlagan model har doim javob beradi.                                                                                                                                                                                                                                        |
| `reroute`  |          | Majburiy yo‘nalishni o‘zgartirish: hisobga olingan namunadagi qo‘riqchi chetlab o‘tildi. Yo'nalishni o'zgartirish -** maqsad** Agar foydalanish mumkin bo'lgan ko'rish maqsadi mavjud bo'lmasa, hisobga olish ma'lumotlari himoyasi hali ham — qo'llaydi, ko'prik xom tasvirlarni faqat matnli nishonga tasvirlash yoki yuborish o'rniga aniq xato bilan bloklanadi. |

Majburiy rejimlar qisqa tutashuv** oldin** avtomatik evristik yugurish; `auto` xatti-harakati pre-PR-1 qo'riqchisi bilan bayt bilan bir xil.

#### API kalit doirasi (`visionBridgeKeyScope.ts`)

Qo'ng'iroq qiluvchining API tugmasi `allowedConnections`, kvota hovuzlarini (`allowedQuotas`) yoki modellarni (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`) cheklaganida, ko'prik faqat yo'nalishni o'zgartiradi va kalit foydalanishi mumkin bo'lgan modellarni tavsiflaydi, kalit foydalanishi mumkin bo'lgan ulanishlarda. Ta'riflash qo'ng'irog'i har doim `x-omniroute-self-loop-key-id` sarlavhasi bilan OmniRoute o'z-o'zidan o'tadi, shuning uchun qabul qiluvchi chat so'rovi yana o'sha kalitning ulanishi va model siyosatini amalga oshiradi. `enforceApiKeyPolicy()` bu sarlavhani faqat o‘z-o‘zidan aylanish tashuvchisi bilan birga hurmat qiladi, shuning uchun u faqat kirishni qisqartirishi mumkin va hal qilinmagan identifikator rad etiladi.

Agar kalit uchun ko'rish modeliga ruxsat berilmasa, a** faqat matn uchun tasdiqlangan maqsad** tasvir baytlarini qobiliyatsiz yuqori oqimga yo'naltirish o'rniga aniq HTTP 400 bilan rasm so'rovini mahalliy ravishda rad etadi (#17069). Noma'lum yoki mahalliy ko'rish qobiliyatiga ega bo'lgan nishonlar uchun tavsif yo'li o'zining oldingi ishlamay qolgan harakatini saqlab qoladi (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Kalitsiz so'rovlar va bu cheklovlarsiz kalitlar xuddi avvalgidek ishlaydi.

#### Vazifadan xabardor tavsif soʻrovi (`modalityBridgeVisionTaskAware`)

Standart** rost** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) ning matniga qo‘shiladi** oxirgi foydalanuvchi xabari** (500 ta belgigacha qisqartirilgan) ta'rifni foydalanuvchi so'ragan narsaga yo'naltiradigan (kodeks-vizion-proksi namunasi) va ko'rish modelidan ko'rinadigan matnni transkripsiya qilishni so'rab, tavsiflovchi so'rovni asosga o'tkazing. — bayrog'i o'chirilgan yoki foydalanuvchi matni bo'lmagan — bilan asosiy so'rov o'zgarmagan holda ishlatiladi.

O'z-o'zini tavsiflovchi tsiklning OpenAI-ga mos keladigan so'rovi (`callVisionModelSingle()` in `visionBridgeHelpers.ts`) har doim mijoz signaliga bog'lanmagan, har bir caller/provider uchun shartsiz `image_url.detail: "high"` — so'raydi. Kam tafsilotli namuna olish ushbu taklif soʻragan matnni transkripsiya qilish vazifasi uchun OCR aniqligini pasaytiradi, shuning uchun asl kirish soʻrovi qaysi tafsilotlar darajasidan foydalanilishidan qatʼi nazar, tavsif qoʻngʻiroqining oʻzi har doim yuqori tafsilotlarni soʻraydi. Bu faqat ichki tavsif so'roviga ta'sir qiladi; u OmniRoute qo'ng'iroq qiluvchining o'z `image_url.detail` birlamchi so'rov — bo'yicha qanday yo'naltirishini o'zgartirmaydi, bu sukut bo'yicha alohida qo'llaniladi va faqat aniqlangan OpenCode mijozlari uchun `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Ta'riflovchi o'z-o'zidan aylanishning Anthropic sim formatidagi filiali `detail` maydoniga ega emas va sukut bo'yicha ham ta'sir qilmaydi.

#### Chiqish qopqog'ini tavsiflang (`modalityBridgeVisionMaxChars`)

| Kalit                          | Standart | Diapazon           |
| ------------------------------ | -------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`      | `0` yoki 100–50000 |

`0` (standart) degan ma'noni anglatadi** qopqoq yo'q** — `callVisionModel()` tomonidan qaytarilgan tavsif mavjud xatti-harakatlarni saqlab, o'zgartirilmagan holda o'tkaziladi. 100–50000 oralig‘idagi har qanday qiymat tavsifni `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` da `src/lib/guardrails/visionBridge.ts`) sifatida qo‘shishdan oldin `…` qo‘shimchasi bilan qisqartiradi. Buni quyi oqim modeli toʻliq transkripsiyaga muhtoj boʻlgan, batafsil talab qilinadigan OCR vazifalari uchun oshiring; chatty vision modellarida tokendan foydalanish uchun uni pasaytiring. Boshqaruv paneli maydoni Vision ilovasining Kengaytirilgan panelida ( `ModalityBridgeVisionTab.tsx` da `modality-bridge-max-chars` ) yashaydi va 1 dan 99 gacha boʻlgan qiymatlarni 100-qavatgacha mahkamlaydi, shu bilan birga aniq `0` teginmagan — `0` oʻziga xos Zod qiymatidir (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), shunchaki “standart” emas.

#### Keshni tavsiflash (`modalityBridge/bridgeCache.ts`)

Xotiradagi LRU + TTL kesh, natijalarni tavsiflash uchun, butun jarayon bo'ylab taqsimlanadi. Uzunlik-prefiksli ramkali = `sha256(imageRef + composedPrompt + configuredBridgeModel)` kaliti (maydon chegarasi to'qnashuvi yo'q). Model komponenti hisoblanadi** tuzilgan** — `callVisionModel` javob bergan model emas, balki ko'prik modeli ichki orqaga qaytishi mumkin va har bir urinishda tugmachalar keshni parchalaydi. Muvaffaqiyatsiz tavsiflar hech qachon keshda saqlanmaydi. Sozlamalar:

| Kalit                           | Standart | Diapazon |
| ------------------------------- | -------- | -------- |
| `modalityBridgeCacheEnabled`    | `true`   | —        |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440   |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000  |

#### Masofaviy tasvirni normallashtirish (oʻz-oʻzidan describe/base64 olish)

Ko'prik olib kelganda a** masofaviy** tasvirning o'zi — Anthropic o'z-o'zidan qo'ng'iroqni va claude-wire-format base64 konversiyasini (`ensureBase64ImagesForClaudeWire`) tasvirlaydi, ikkalasi ham `fetchRemoteImageAsDataUri()` orqali `visionBridgeHelpers.ts` — olingan ma'lumotlar URI ko'rish modeli so'roviga kiritilishidan oldin `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) orqali uzatiladi. Katta o'lchamli tasvirlar a ga qisqartiriladi** 2048px uzun qirrasi** ( OpenAI/Anthropic o'lchamini o'zgartirish qopqog'i allaqachon server tomonida qo'llaniladi), bu ko'rish modeli ko'rgan narsani o'zgartirmasdan yuklash bytes/latency qisqartiradi. Oʻlchamini oʻzgartirish dinamik import orqali yuklangan `sharp` foydalanadi: uning mahalliy ikkilik fayli yuklana olmaydigan platformada, `normalizeDataUri()`** hech qachon tashlamaydi** — u asl baytlarning o'tish joyiga tushadi, shuning uchun describe/base64-conversion yo'li doimo ishlashda davom etadi. Tasvir bo'lmagan baytlar (dekodlanadigan tasvirni qaytarmagan olish) ham tegmasdan o'tkaziladi. Ushbu normallashtirish ko'prik o'z-o'zidan qo'ng'iroq qilish uchun olinadigan tasvirlar uchun mo'ljallangan — u hech qachon qo'ng'iroq qiluvchining xom o'tish yukiga qo'llanilmaydi, faqat opt-in-mutatsiya tamoyiliga (Qattiq qoida №20) mos keladi.

#### Sozlamalar sxemasi + migratsiya

Yangi `modalityBridge*` tugmalari `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`) da Zod bilan tasdiqlangan: `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` triosi va Audio Bridge tomonidan ishlatiladigan `modalityBridgeAudio*` guruhi. Migratsiya `141_modality_bridge_settings.sql` mavjud eski `visionBridge*` qiymatlarini mos keladigan yangi kalitlarga ko'chiradi (idempotent, hech qachon operator o'rnatgan `modalityBridge*` qiymatini qayta yozmaydi); eski kalitlar bitta chiqarish sikli uchun o'qish zaxirasi sifatida qabul qilinadi.

#### Shaffoflik sarlavhasi + statistikasi

Ta'riflash-o'zgartirilgan javoblar `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` ( `modalityBridge/bridgeStats.ts` da `buildModalityBridgeHeader()` tomonidan qurilgan, `src/sse/handlers/chatHelpers.ts` da `withModalityBridgeHeader()` tomonidan muhrlangan) olib boradi. Qayta yo'naltirilgan so'rovlar olinadi** yo'q** — sarlavhasi foydali yukga tegmagan va model almashinuvi javob tanasining `model` maydonida allaqachon ko'rinadi.

`GET /api/modality-bridge/stats` (boshqaruv auth, `GET /api/settings` bilan bir xil daraja) `vision`, `audio` va `video` uchun har bir modallik hisoblagichlari `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` qaytaradi. `averageLatencyMs` maxraj sifatida barcha urinishlarni emas, balki `latencySamples` foydalanadi; Vaqtsiz operatsiya nol millisekundlik namunani yaratmaydi. `bridged` muvaffaqiyatli konvertatsiya qilish uchun orqaga mos keluvchi taxallus bo'lib qoladi; muvaffaqiyatsiz urinishlar uni oshirmaydi. Hisoblagichlar dizayn bo'yicha qayta ishga tushirilganda qayta o'rnatiladi (buxgalteriya hisobi emas, telemetriya).

#### Boshqaruv paneli konfiguratsiyasi

Maxsus asboblar paneli sahifasi `/dashboard/settings/modality-bridge` hisoblanadi. Uning URL manzilli `Vision`, `Audio` va `Video` yorliqlari `tab` qiymatini almashtirishda so'rov parametrlarini saqlaydi. Vision yorlig'i yoqish, rejim, model tanlash (shu jumladan, avtomatik standart), vazifani bilish taklifi, kengaytirilgan timeout/image/description-length/cache chegaralari, ish vaqti hisoblagichlari va himoyalangan namuna so'rovini ko'rsatadi. Ovoz yorlig'i ham jonli: u yoqish, Avtomatik, timeout/max-clip chegaralari, audio hisoblagichlar va `input_audio` namunaviy testi bilan faqat STT uchun model tanlashni ochib beradi. Video yorlig‘i funktsionaldir: u FFmpeg/ffprobe ish vaqti holatini — to‘rtta aniq UI holatidan biri haqida xabar beradi (`unknown` enable/model/frame/video/timeout uchayotganda yoki tugallanmasa, `restricted`, mijoz tomonidan o‘tkazib yuborilgan, orqaga qaytmaydigan boshqaruv paneli xostida, tekshirilgandan so‘ng `unavailable` bir marta tekshirilgan va yo‘qligi tasdiqlangan, yoki FFmpeg/ffprobe `available` model tanlash moslamasini ko'rish qobiliyatiga ega modellarga filtrlaydi va — hisoblagichlarni ko'rsatadi.

AI sozlamalari ostidagi sobiq Vision Bridge kartasi yangi sahifaga moslik havolasi; u endi shaklning ikkinchi nusxasiga egalik qilmaydi. Media provayderlari, shuningdek, mavjud Nutqdan matnga oʻyin maydonchasini olib tashlamasdan, “Tasvirdan matnga” va “Nutqdan matnga” ish oqimlarini tegishli Modallik koʻprigi yorliqlariga bogʻlaydi.

**O'z-o'zidan kirishni chetlab o'tish:** qo'ng'iroq marshrutlari OmniRoute ning o'z `/v1` o'z-o'zidan aylanishi (nostandart provayder modeli) orqali tavsiflanganda, quyi so'rov `x-omniroute-admission-bypass: internal` yuboradi va hal qilingan o'z-o'zidan aylanish hisob ma'lumotlari bilan autentifikatsiya qilinadi — mahalliy rejimda mahalliy `sk_omniroute` sentinel yoki operator tomonidan sozlangan `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` enqmentlar hali ham ishga tushirilishi mumkin `REQUIRE_API_KEY=true` chaqiruv. Aylanib o'tish faqat o'sha aniq hisobga olish ma'lumotlari uchun hurmat qilinadi, shuning uchun tashqi mijozlar kirishni o'tkazib yuborish uchun sarlavhadan foydalana olmaydi. (#1350)

Legacy sukut bo'yicha `src/shared/constants/visionBridgeDefaults.ts` yashaydi; yangi mode/task-aware/cache sukut bo'yicha va sozlamalarni hal qiluvchi `src/shared/constants/modalityBridgeDefaults.ts` yashaydi. Qo'riqchi `deps` konstruktor variantini ochib beradi, shuning uchun testlar soxta `getSettings` va `callVisionModel` ilovalarini kiritishi mumkin.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Ovozli chat so‘rovlarini ular audio kiritishni qabul qilishi ma’lum bo‘lmagan maqsadga yetib borishidan oldin ushlab turadi. U hech qachon chat so‘rovini qayta yo‘naltirmaydi: audio qismlar mavjud OpenAI-mos keladigan ko‘p qismli so‘nggi nuqta orqali transkripsiya qilinadi va tanlangan chat modeli matn transkriptlari bilan davom etadi.

Oqim:

1. `supportsAudio` `getResolvedModelCapabilities()` orqali hal qiling. Aniq provayder-registr metama'lumotlari g'alaba qozonadi, so'ngra statik model metama'lumotlari, keyin sinxronlangan `modalities_input`. `audio` e'lon qilingan kirish ro'yxati `false`; hech qobiliyat dalil `null` qoladi. `false` ham, `null` konservativ ko'prikni faollashtiradi, `true` esa uni chetlab o'tadi.
2. Umumiy `detectMediaParts()` detektori orqali `modalityBridgeAudio*` sozlamalarini hal qiling va har bir xabardan yuqori darajadagi audio qismlarini ajratib oling. Qo'llab-quvvatlanadigan sim shakllari OpenAI `input_audio`, `audio_url` va `source.media_type: "audio/*"` dir. Marshrutlash uchun ichki o'rnatilgan audio aniqlandi, lekin ulanish yo'li bilan olib tashlanmaydi. Ish `modalityBridgeAudioMaxClips` bilan chegaralangan; keyingi qismlar tegmasdan qoladi.
3. Sozlangan `provider/model` hurmat qiling yoki `selectAudioBridgeModel()` `AUDIO_TRANSCRIPTION_PROVIDERS` barqaror katalog tartibida yurishiga ruxsat bering va faol provayder hisob ma'lumotlariga ega birinchi modelni tanlang.
4. `callAudioTranscription()` base64/data-URI audioni ko‘p qismli `file` ga o‘zgartiradi yoki DNS pinlash va 25 MB chegarasi bilan faqat umumiy chiquvchi qo‘riqchi orqali masofaviy `audio_url` yuklab oladi. Keyin u faylni va tanlangan modelni `resolveSelfLoopBearer()` bilan autentifikatsiya qilingan mahalliy `/v1/audio/transcriptions` o'z-o'zidan aylanishiga POSTs. Mavjud transkripsiya marshruti oddiy hisob ma'lumotlarini qidirish, cooldown/rate-limit bilan ishlash va provayderni yuborishni amalga oshiradi.
5. Muvaffaqiyatli qo'ng'iroqlar o'z qismlarini `[Audio N]: <transcript>` bilan almashtiradi. Qo'ng'iroqlar `Promise.allSettled` bilan amalga oshiriladi: individual xatolik asl audio qismini saqlab qoladi (#4012 shartnoma). Agar har bir qo'ng'iroq muvaffaqiyatsiz bo'lsa va maqsad isbotlangan bo'lsa `supportsAudio === false`, qismlar `[Audio N]: (unavailable — no STT provider connected)` bo'ladi (#8430 shartnoma). Noma'lum maqsad (`null`) uchun to'liq muvaffaqiyatsizlik natijasi teginmasdan qoladi. Foydalanishga yaroqli STT hisob ma'lumotlariga ega bo'lmagan faqat matn uchun tasdiqlangan maqsad tarmoq qo'ng'irog'ini bermasdan bir xil aniq stubni oladi.

Muvaffaqiyatli transkriptlar jarayon bo'yicha Modality Bridge LRU/TTL keshidan foydalanadi. Kalit audio ma'lumotnomasini, barqaror `audio-transcription` operatsiya yorlig'ini va tanlangan STT modelini birlashtiradi; muvaffaqiyatsizliklar hech qachon keshda saqlanmaydi. Audio urinishlar umumiy `bridged`, `cacheHits`, `failures` va `lastUsedAt` hisoblagichlarini yangilaydi. O'zgartirilgan javoblar `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` olib yuradi; tegmagan so'rovlar Audio Bridge segmentini olmaydi.

Ish vaqti sozlamalari JB tomonidan qo'llab-quvvatlanadi va Zod tomonidan tasdiqlangan:

| Kalit                         | Standart | Diapazon              |
| ----------------------------- | -------- | --------------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                     |
| `modalityBridgeAudioModel`    | `""`     | Avtomatik yoki STT ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000           |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10                  |

Umumiy kesh `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` va `modalityBridgeCacheMaxEntries` tomonidan boshqariladi.

### Video ko'prigi (`videoBridge.ts`, `videoBridgePipeline.ts`)

Chat Completions `messages` va Responses API `input` -ning yuqori darajadagi video qismlarini ma'lum mahalliy video qo'llab-quvvatlashi bo'lmagan maqsad chaqirilishidan oldin ushlab turadi. Qo'llab-quvvatlanadigan shakllar `input_video`, `video_url`, `video_source`, HTTPS URLs va `data:video/*;base64,...` data URIs dir. Matndagi oddiy fayl nomlari video sifatida ko'rilmaydi.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) soʻrovni oʻtkazish, capability/policy tekshiruvi, har bir soʻrovni yigʻish va javob yukiga ega. Har bir video ish — olish, butun natija kesh, kadrlar ketma-ketligini tavsiflovchi (har qanday qo'ng'iroq qiluvchi tomonidan e'lon qilingan audio transkriptni birlashtiradi) va har bir urinish metrics/abort/cleanup — `videoBridgePipeline.ts` ichida `processVideoPart` orqasida yashiringan, `preCall` ning tsikli ichida har bir video qismi uchun bir marta chaqiriladi. Ushbu modul, shuningdek, aniq port chegaralarini belgilaydi `VideoMediaBrokerPort` (baytlarni olish va namunali kadrlarni chiqarish), `VideoAudioTranscriptionPort` (qo'ng'iroq qiluvchi tomonidan e'lon qilingan audio transkriptni namunali sarlavhalar bilan birlashtirish) va `VideoDrilldownPort` (kadrni batafsil o'zgartirish chegarasi; hali `processVideoPart` ga ulanmagan — faqat bugungi kunda alohida `/api/modality-bridge/video/drilldown` yozish).

Ommaviy `/v1` so'rovi yo'li hech qachon kichik jarayonni import qilmaydi yoki chaqirmaydi. Masofaviy videolar 50 MiB chegarasi ostida yuklab olinadi; Inline base64 videolari har bir video uchun dekodlangan 36 MiB konservativ qopqoqqa ega, shuning uchun model/messages/framing konverti umumiy JSON so‘rovini qabul qilish chegarasi 50 MiB ichida qolishi mumkin. Inline uzunligi va dekodlangan o'lchamdagi taxminlar ajratishdan oldin tekshiriladi. HTTPS boshlang‘ich masofaviy URL va har bir qayta yo‘naltirishda, DNS pinning bilan mavjud faqat umumiy chiqish qo‘riqchisidan foydalangan holda talab qilinadi. Keyin baytlar aniq ichki `POST /api/modality-bridge/video/extract` broker chegarasini kesib o'tadi. Bu marshrut ham `LOCAL_ONLY`, ham `SPAWN_CAPABLE` bo'lib, faqat har bir jarayon uchun autentifikatsiya qilingan, ishonchli orqaga qaytish so'rovini qabul qiladi va hech qachon URL, fayl tizimi yo'li, bajariladigan yoki argumentlar ro'yxatini qabul qilmaydi. API korpus o'lchamli quvur liniyasi va ishlov beruvchining incremental korpus o'quvchisi mustaqil ravishda 50 MiB broker kiritish qopqog'ini amalga oshiradi. Uning chegaralangan navbati bir vaqtning o'zida bitta ekstraktsiyani amalga oshiradi, to'rtta kutilayotgan ishni bajarishga imkon beradi va 100 MiB da kutilayotgan kiritishni cheklaydi.

Broker ichida `ffprobe` xususiy mahalliy faylni o'qiydi; Ruxsat etilgan formatlar ro'yxati pleylist va manifest formatlarini o'z ichiga olmaydi. Ruxsat etilgan MOV-oilaviy konteynerlar uchun tashqi MOV ma'lumotlar havolalari sukut bo'yicha o'chirilgan bo'lib qoladi va belgilangan buyruq ularga qo'shilmaydi. Har ikkala `ffprobe` va `ffmpeg` `file` -only protokoli oq roʻyxatidan, bitta ipdan, belgilangan argumentlar massivlaridan, qobiqsiz va `PATH` dan hal qilingan bajariladigan fayllardan foydalanadi. Biriktirilgan rasmli muqova oqimlari ijro etilishi mumkin emas. Barcha ijro etiladigan oqimlar cheklovlarga javob berishi kerak va deterministik eng past indeksli qaytarilishdan oldin aniq standart oqim afzalroqdir. Videolar 600 soniya, har bir oʻlcham uchun 8.192 piksel va 33.554.432 manba piksel bilan cheklangan. FFmpeg 1–16 oʻrta nuqtali JPEG kadrlarni namuna oladi, kichikroq kiritishlarni oʻlchamini oshirmasdan uzun chetini koʻpi bilan 1024 pikselgacha pasaytiradi va hech qachon URL olmaydi. Namuna olish sukut bo'yicha `uniform`. Majburiy emas `scene_aware` va eksperimental `segment_aware` siyosatlari allaqachon tasdiqlangan mahalliy oqim orqali bitta qo‘shimcha sobit FFmpeg o‘tishni amalga oshiradi, cheklangan `showinfo` sahnasi vaqt belgilarini tanlaydi va detektorning ishlamay qolishi, vaqt tugashi, noto‘g‘ri shakllangan chiqish yoki bo‘sh nomzodlar to‘plamida aniq bir xil o‘rta nuqtalarga qaytadi. Segmentni bilish rejimi o'rta nuqta namunalarini tasdiqlangan sahna intervallariga mutanosib ravishda ajratadi; segmentdan xabardor dalillar va orqaga qaytish xatti-harakatlari quyida batafsil tavsiflangan. Qattiq 16-ramkali qopqoq har bir siyosatda tanlangandan keyin qo'llaniladi. Sahnadan xabardor bo'lgan so'rov faqat bitta kadrli byudjetga ega bo'lsa, u faol to'liq video yoki fokus oynasining yagona o'rta nuqtasidan foydalanadi va `policyEffective: uniform` haqida hisobot beradi: bitta tanlangan sahna ramkasi ikkala vaqtinchalik uchni ham saqlay olmaydi. Qo'ng'iroq qiluvchi ixtiyoriy ravishda cheklangan fokus oynasini taqdim etishi mumkin (`start`/`end` soniya); chegaralar media davomiyligiga mahkamlanadi, teskari yoki cheksiz oynalar rad etiladi va barcha namuna olish siyosatlari faqat normallashtirilgan intervalda amalga oshiriladi. Olingan oyna namunaviy metama'lumotlarga va ishonchsiz tavsif prefiksiga kiritilgan, shuning uchun quyi oqim modellari diqqat markazida bo'lgan parchani to'liq vaqt jadvalidan ajrata oladi.

Semantik sarlavha fokusi alohida, aniq sozlamadir. Standart `full` tahlil rejimi mavjud kadr soʻrovini saqlaydi va hech qachon soʻrov matnini sarlavhalar modeliga yoʻnaltirmaydi. `focused` rejimida ko'prik faqat bir xil Chat yoki Javoblar konteyneridan foydalanuvchi tomonidan yozilgan eng so'nggi bo'sh bo'lmagan `text`/`input_text` ni o'qiydi, uni NFC ga normallashtiradi, boshqaruv belgilarini va bo'sh joyni yig'adi va uni 500 Unicode kod nuqtasi bilan cheklaydi. Bo'sh natija aniq `full` so'roviga qaytadi. Foydalanish mumkin bo'lgan maslahat ishonchsiz foydalanuvchi kontekstli blokida JSON sifatida seriyalashtiriladi va faqat kuzatilishi mumkin bo'lgan tafsilotlarga ustunlik berishi mumkin; u ommaviy axborot vositalarida ko'rinadigan yoki eshitiladigan quyidagi ko'rsatmalarga qarshi alohida ogohlantirishni bekor qila olmaydi. Matnli fokus hech qachon `start`/`end` ni anglatmaydi yoki vaqtinchalik namunani o'zgartirmaydi.

#### FU-07 strukturaviy segment dalillari

`segment_aware` allaqachon tasdiqlangan mahalliy video oqimi ustidan bir chegaralangan tahlil oldidan o'tishdan foydalanadi. Ruxsat etilgan filtr zanjiri birinchi navbatda ko'pi bilan 320 piksel kenglikda o'lchaydi, sahna o'zgarishlarini va muzlatilgan intervallarni aniqlaydi, so'ngra loyqalik, o'rtacha luma va spatial/temporal ma'lumotlari uchun soniyasiga 1 kadr tezlikda namuna oladi. O'tish 600 ta tizimli namunalar, bitta FFmpeg/filter ipi, bir xil `file` -only protokoli va konteyner ruxsat etilgan ro'yxatlar, 1 MiB jarayon-chiqarish bilan bog'langan va brokerning umumiy abort/deadline. ichida ko'pi bilan 30 soniya bilan cheklangan. U hech qachon so'rovdan buyruq, filtr, yo'l yoki URL qabul qilmaydi.

Strukturaviy qadriyatlar semantik videoni tushunish emas, balki deterministik namuna olish dalilidir. Ular mavzular, harakatlar, sarlavhalar, nutq yoki foydalanuvchi niyatini anglatmaydi. Sahna va muzlash chegaralari segmentlarni hosil qiladi; qamrovni muzlatish, loyqalik, ekspozitsiya, fazoviy tafsilotlar va vaqtinchalik o'zgarish faqat mavjud 1-16 kadr byudjeti qanday taqsimlanishiga ta'sir qiladi. To'liq muzlatilgan segment bitta kadrda yopiladi, muzlatilmagan segmentlar esa qolgan byudjet uchun raqobatlashadi. Agar chegaralar ramkalardan ko'p bo'lsa, vaqt jadvalining bir xil qamrovi saqlanib qoladi, shuning uchun tez erta kesishlar uzoq davom etayotgan segmentni yashira olmaydi. Muzlash chegarasining 1 soniyalik tahlil ruxsati doirasidagi sahna chegaralari birlashtiriladi.

Etishmayotgan filtrlar, malformed/empty dalillari, detektor xatosi yoki chegaralangan tahlildan oldingi vaqt tugashi aniq yagona o'rta nuqta siyosatiga ochilmaydi. Qo'ng'iroq qiluvchining to'xtatilishi yoki brokerning oxirgi muddati ochilmaydi: u parvozdagi pastki jarayonni tugatadi, keyinchalik kadrlarni chiqarishni oldini oladi va shaxsiy vaqtinchalik daraxt `finally` da o'chiriladi.

`scripts/perf/video-bridge-fu07-eval.ts` detupdan keyingi sarlavhali qo‘ng‘iroqlarni tejash, zich harakatli byudjetni taqsimlash, blur/exposure/SI-TI dalillari, uzun dumli tezkor kesishlar va asta-sekin so‘nayotgan noto‘g‘ri pozitivlar uchun deterministik real FFmpeg moslamalarini yaratadi. U tahlildan oldingi devor vaqtini va `/usr/bin/time` mavjud bo'lgan joyda, bola CPU va tepalik RSS qayd qiladi. Uning sifatini tekshirish faqat tizimli oracle hisoblanadi. Haqiqiy taglavha namunasi sifati `HOLD` bo'lib qoladi, chunki bu jabduqda ruxsat berilgan yakuniy nuqta yoki muzlatilgan sudya yo'q. Agar `--caption-cost-per-call-usd` har bir qo'ng'iroq uchun aniq ijobiy baho bermasa, pul jamg'armalari ham `HOLD` bo'lib qoladi; skript hech qachon ikkala natijani ham ishlab chiqarmaydi.

Har bir freym 4 MiB, barcha xom ramkalar birgalikda 23 MiB va seriallashtirilgan broker javobi 32 MiB bilan cheklangan. Shaxsiy vaqtinchalik katalog `finally` da o'chiriladi. OmniRoute FFmpeg birlashtirmaydi va maxsus bajariladigan yo'lni qabul qilmaydi. Sarlavha qo'yishdan oldin, ko'prik konservativ vizual detuplikatsiya o'tishini qo'llaydi: har bir JPEG 16 × 16 kulrang rangdagi buferga qisqartiriladi va faqat oxirgi saqlangan kadr bilan solishtiriladi. Bir kadrdan yuqori soʻralgan sarlavhalar byudjeti uchun ekstraktsiya bu byudjetdan ikki baravar koʻp boʻlgan va 16 kadrdan ortiq boʻlmagan cheklangan nomzodlar pulini taqdim etadi. Talab qilingan cheklov faqat deuplikatsiyadan so'ng qo'llaniladi, birinchi va yakuniy tanlangan nomzodlar byudjet kamida ikkita bo'lsa, yakuniy noziklashtirish vaqtida saqlanadi. Versiyalangan `grayscale-16x16-mean-cells-v2` siyosatida kattaroq oʻrtacha luma deltasi va normallashtirilgan deltasi kamida 0,05 boʻlgan eskiz hujayralari nisbati qoʻllaniladi. Takroriy chegara doimiy 0,04 bo'lib, ish vaqti sozlamasi sifatida emas, balki bashorat qilish uchun tanlangan. Ushbu ikkilamchi yuqori kontrastli signal kichik harakat va ko'rinadigan matn o'zgarishlarini saqlaydi, faqat o'rtacha taqqoslash yashirishi mumkin. Taqqoslovchi yoki dekoder xatolar ochilmaydi va qamrovni saqlaydi. Chiqarish meta-ma'lumotlari ajratilgan nomzodlarni, muvaffaqiyatli ishlatilgan ramkalarni va vizual dublikatlarni o'chirib tashlaydi.

Aniq belgilangan video qismi vaqt tamg'asi qo'yilgan aloqa varaqini so'rashi mumkin. Ko'prik eng ko'p 4 ustunli, 16 ramkali JPEG panjarasini quradi. Har bir 512-pikselli hujayra o'zining manba vaqt tamg'asini yuqori kontrastli pastki diapazonga yozadi, xuddi shu vaqt belgilari esa quyi oqim assotsiatsiyasi va audit uchun matn metama'lumotlarida qoladi. To'liq JPEG 32 MiB bilan chegaralangan bo'lib qoladi. Agar `sharp` gridni dekodlay olmasa yoki tuza olmasa, ko'prik yana alohida JPEG freymlariga tushadi; mijoz bekor qilish hali ham varaq operatsiyasi orqali tarqaladi.

Rag'batlantiruvchi dalillar sintetik kompozitsiyaning mikrobenchmarkidan ataylab ajratilgan. `scripts/perf/video-bridge-contact-sheet-eval.ts` haqiqiy OpenAI-mos ko'rish modellari uchun sxemali A/B jabduqlarini belgilaydi. U provayder tomonidan bildirilgan tokenlarni, devorning oxirigacha kechikishini (shu jumladan varaq tarkibi), model qo'ng'iroqlari sonini va manifestda aniqlangan faktlarni saqlashni o'lchaydi. Raw model javoblari hisobotga yozilmaydi; faqat SHA-256 dayjestlari va mos keladigan fakt IDs saqlanadi. Agar `--execute-real` uzatilmasa va `--model`, `OMNIROUTE_BASE_URL` va `OMNIROUTE_API_KEY` sozlanmasa, jabduqlar tarmoq yoki pullik model chaqiruvini amalga oshirmaydi. Bu aniq real ishga tushirish holda, uning mashina o'qilishi hukm `HOLD` qoladi; sintetik payload/call-count o'lchovlarining o'zi reklama dalil emas.

Qo'ng'iroq qiluvchilar qo'llab-quvvatlanadigan video qismiga ixtiyoriy `transcript.cues` massivini biriktirishlari mumkin, agar ular allaqachon tekislangan matnga ega bo'lsa. Har bir ishora `text`, tekshirilayotgan davomiylik ichida chekli `start`/`end` oralig'i va oq ro'yxatga kiritilgan `source` (`client`, `embedded` yoki `audio-bridge`) ni olib yurishi kerak; `confidence` sukut bo'yicha `1` ga o'rnatiladi va `0` va `1` orasida qolishi kerak. Aynan takroriy ishoralar yiqildi. OmniRoute hech qachon ushbu metamaʼlumotlardan transkripsiyani boshlamaydi: tasdiqlangan signallar tavsiflangan natijaga manba, ishonchlilik va interval bilan koʻchiriladi va ramka sarlavhalari bilan birga ishonchsiz kuzatuvlar sifatida koʻrsatiladi. Yaroqsiz, diapazondan tashqarida yoki manbadan xoli matn taglavhalar oqimiga qoʻshilgandan koʻra rad etiladi. Har ikkala soʻrov-tana transkript kanali `client` ga taqdim etilgan manbani, jumladan, oʻz-oʻzidan tasdiqlangan `embedded` yoki `audio-bridge` yorliqlarini normallashtiradi. Faqat serverga tegishli adapter ushbu ishonchli teglarni faqat kodli `trustedSource` argumenti orqali belgilashi mumkin; JSON so'rovi maydoni bu argumentga erisha olmaydi. Transkript matni, kelib chiqishidan qat'i nazar, ishonchli bo'lmagan mediadan olingan kontent bo'lib qoladi va hech qachon avtorizatsiyani belgilamasligi kerak.

Murakkab qo'ng'iroq qiluvchi bir xil video uchun `audioTranscript` trekni taqdim etishi mumkin; u server transkripsiyasining isboti emas, balki mijoz tomonidan taqdim etilgan matn sifatida qaraladi. Termoyaviy tikuv vizual va audio kuzatuvlarni bitta muddat ostida amalga oshiradi va signalni bekor qiladi, ularni umumiy vaqt jadvalida buyurtma qiladi, aniq dublikatlarni yiqadi va faqat bir tomon muvaffaqiyatli bo'lganda qisman natija haqida xabar beradi. Noto'g'ri `audioTranscript` o'sha qisman natijaga olib keladi — vizual tavsif saqlanadi va audio bo'lim butun videoni ishlamay qolishi o'rniga sanitarlashtirilgan nosozlik kodini — yozib oladi. Har bir filialning mavjudligi, qisman bayroq va dezinfektsiyalangan nosozlik kodlari tavsiflangan natijada, qo'riqchi metama'lumotlarida (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), natija keshidagi metama'lumotlarda va ko'prik termoyadroviy hisoblagichlarida saqlanadi. Standart Video Bridge yo'li nutqdan matnga o'tishni chaqirmaydi yoki ikkinchi media nusxasini yuklab olmaydi; bu aniq trek bo'lmasa, u faqat video bo'lib qoladi.

**Transkriptni saqlash (#12150 P1).** Bu Video Bridge (oʻzi roʻyxatdan oʻtgan) — transkriptini taqdim qilganda, alohida saqlash bayrogʻi boʻlmaganda avtomatik ravishda qoʻllaniladi. So‘rov transkriptning har qanday belgisini (qo‘ng‘iroq qiluvchi tomonidan e’lon qilingan `transcript` yoki birlashtirilgan `audioTranscript`) berganida, qo‘riqchi uni `videoBridgeObserved` belgilaydi va video tavsifining tahrirlangan soyasini hosil qiladi — unda har bir ishoraning erkin matn tanasi o‘rniga `[redacted-video-transcript]` tuzilmasi o‘rnini bosuvchi tuzilma bilan almashtiriladi. (Hech qachon tekislangan matnni tahlil qilish yo'li bilan emas, shuning uchun hech qanday — raqib yoki oddiy, shu jumladan `]` o'z ichiga olgan `[inaudible]`/`[music]` — kabi jismlar omon qololmaydi). Doimiy qo'ng'iroqlar jurnali so'rovining asosiy qismi har bir videodan olingan matn qismini kontent tengligi bilan mos keladigan tahrirlangan soyaga almashtiradi; `fullText` langari qo‘ng‘iroqdan oldin tayyor qo‘riqchi foydali yukidan qayta o‘qiladi, shuning uchun keyingi zanjir qo‘riqchilari ( PII va hisobga olish ma’lumotlari maskalari, ustuvorliklar 10/95) tavsif matnini joyida qayta yozgandan so‘ng va system-prompt/handoff/memory injection xabarlar massivini qayta shakllantirgandan keyin ham o‘yin muvaffaqiyatli bo‘ladi. Modelga yuqori oqimga yuborilgan korpus o'zgarishsiz. Kuzatilgan so'rovda barqaror Xotira ham yo'q (so'rov va javobdan olingan ekstraktsiya o'tkazib yuboriladi), shuning uchun modelning o'z javobi transkripsiya matnini Xotiraga aks ettira olmaydi.

**Xom video maydonlari (#12430).** Ko'prik yoqilganda va mahalliy videoni qo'llab-quvvatlash noma'lum yoki yo'q bo'lsa, belgilangan `transcript`/`audioTranscript` maydonlari ham tavsif xatosi yoki `maxVideos` chegarasidan keyin ham `videoBridgeObserved` faollashtiradi. `null` va bo'sh satrlarni hisoblash; yo'q maydonlar va video bo'lmagan metama'lumotlar bunday qilmaydi. Saqlangan nusxalar bu maydonlarni o'zgartiradi yoki so'rovni o'tkazib yuboradi va caches/Memory chetlab o'tiladi.

Ushbu qayta tiklash yo'llarida qo'ng'iroq qiluvchining haqiqiy signallari nostandart provayder maydonlariga emas, balki qo'llab-quvvatlanadigan `text`/`input_text` qismlariga aylanadi. Soʻrov boʻyicha taqdim etilgan ikkala trek ham ishonchsiz `client` kuzatuvlari boʻlib qolmoqda, bunda video tasvirlanmaganligi va vaqt tamgʻalari ommaviy axborot vositalariga nisbatan tasdiqlanmaganligi haqida aniq ogohlantirish. Mavjud 256-cue/64-KiB jami va har bir cue byudjetlari ikkita trek bo'ylab birgalikda qo'llaniladi; vaqt belgilari brokerning 600 soniyali shiftiga va har qanday taqdim etilgan fokus oynasiga mos kelishi kerak. Yaroqsiz treklar o'chiriladi, ixtiyoriy matn sifatida yuborilmaydi; joriy birodar, agar ularning umumiy byudjeti oshib ketmasa, hali ham foydalanish mumkin. Null/empty maydonlari matn qo'shmaydi. Bu qayta tiklash orqali hech qanday media yuklash yoki transkripsiya qo'shilmaydi. Transkripsiya kengaytmasi maydonlari zaxira video tashuvchidan va uning `video_url`/`source` obyektlaridan olib tashlanadi. OpenAI sim ruxsatnomalari ro'yxati qat'iy bo'lib qoladi; noma'lum video tashuvchilar mavjud bo'lib qoladi va faqat matn uchun ma'lum bo'lgan maqsadlar xavfsiz markerlarni saqlaydi. Strukturaviy redaktsiya soyalari qo'shilgan transkript matnini himoya qiladi, asl qo'ng'iroq qiluvchiga tegishli so'rov esa o'zgarishsiz qoladi. Mahalliy tomonidan qo'llab-quvvatlanadigan maqsadlar va o'chirilgan ko'priklar mavjud chetlab o'tish harakatlarini saqlab qoladi.

Qo'shimcha saqlangan nusxalar bir xil kuzatilgan so'rov signalidan foydalanadi. Oldindan himoyalangan mijoz so'rovining surati, xotirada kutilayotgan so'rov va erta rad etilgan so'rovlar jurnali video qismlaridagi transkript maydonlarini tizimli ravishda almashtiradi; Quvur bosqichlari va kontekstni uzatish boʻyicha sintez qilingan satr soʻrovlari doimiy soʻrov tanasida tahrirlanadi. Doimiy `video_content_removed` markeri ataylab olib tashlangan matnni qayta qurish o‘rniga `previous_response_id` davomini yopib qo‘yadi. Agar kuzatilgan soʻrov jurnalga kirishdan oldin oʻzining qisman tahrirlash soyasini yoʻqotsa yoki hatto keyingi soʻrov mutatsiyalaridan soʻng bir nechta video soyalardan biri mos kelmasa, qisman tahrirlangan transkriptni saqlab qolish oʻrniga saqlangan soʻrov tanasi butunlay olib tashlanadi.

Kuzatilgan so'rov uchun namunaviy javob transkriptning istalgan qismini tuzilgan chegarasiz iqtibos keltirishi mumkin. Shuning uchun uning doimiy qo'ng'iroqlar jurnali `responseBody` o'rniga o'tkazib yuborilgan belgi qo'yiladi; batafsil quvur liniyasi artefakti ( upstream/client jismlari va oqim qismlarini o'z ichiga olishi mumkin) saqlanmaydi. Semantik, idempotentlik va fikrlashni takrorlash keshlari ushbu so'rov uchun o'qish va yozishni chetlab o'tadi. Provayder so'rovi va mijozga ko'rinadigan javob o'zgarishsiz qoladi. Batafsil artefakt o'tkazib yuborilganda, dastlabki saqlanib qolgan baytlar vaqtinchalik buferdan chiqariladi. Kiro ning noto'g'ri tuzilgan EventStream ogohlantirishi faqat foydali yuk baytlari soni haqida xabar beradi, hech qachon uning mazmuni yoki JSON tahlilchisining xom xatosi. Bu har bir bog'liq bo'lmagan provider/plugin diagnostikasi tekshirilganligini da'vo qilmaydi; kengroq saqlangan-lavabo tozalash #11658 da kuzatiladi.

Ichki `/api/modality-bridge/video/drilldown` hayot aylanishi alohida, loopback/token-authenticated kesh substratidir. Har bir operatsiya, shuningdek, kanonik shaffof bo'lmagan asosiy ID talab qiladi. Ishlab chiqarish qo'ng'irog'i yoqilishidan oldin, u ID ni autentifikatsiya qilingan ijarachidan olishi kerak va hech qachon mijoz tanlagan qiymatni uzatmasligi kerak. Kesh kalitlari ushbu printsipni kanonik seans va IDs video-ma'lumotnomasi bilan bog'laydi, faqat ularning SHA-256-derived kalitlarini saqlaydi va o'qish va o'chirishni bir xil printsipga qamrab oladi. Kesh har bir kirish uchun ko'pi bilan 16 ta olingan JPEG kadrlarni saqlaydi, ularning muddati o'n daqiqadan so'ng tugaydi va cheklangan `start`/`end` o'qish yoki seansni aniq o'chirishni qo'llab-quvvatlaydi.

Har bir asosiy 16 ta yozuv va 64 MiB kanonik JPEG ma'lumotlari bilan cheklangan. Bu chegaralar global 64-entry/256 MiB shiftidan mustaqildir: asosiy kvota bosimi faqat o'sha direktorning global LRU ko'chirishdan oldin eng kam qo'llanilgan yozuvlarini ko'rib chiqadi. Muddati o'tgan yozuvlar kesh faoliyati bo'yicha ham asosiy, ham global hisobdan o'chiriladi, bekor qilish va tekshirishda xatolik qisman almashtirishni amalga oshirmaydi.

Kesh kanonik bo'lmagan Base64, ortiqcha to'ldirish, JPEG bo'lmagan media, noto'g'ri shakllangan yoki kesilgan JPEGs va cheklangan to'liq tasvir `sharp` dekodlash paytida ogohlantirishni keltirib chiqaradigan JPEGs rad etadi. U har bir qabul qilingan tasvirni kanonik JPEG sifatida qayta kodlaydi, ishonchli qo'ng'iroq qiluvchi maydonlari o'rniga dekodlangan baytlardan kenglik va balandlikni oladi va ularni saqlab qolish o'rniga har qanday keyingi poliglot baytlarini olib tashlaydi. Faqat chegaralangan kanonik siqilgan bufer ikkala kvotaga ham to'lanadi. JSON sim chegarasi 32 MiB dekodlangan kirish shipi uchun Base64 yukini o'z ichiga oladi. Har bir saqlangan derivatsiya o'zining tasdiqlangan JPEG format/resolution, namuna olish siyosati, hosila versiyasi, yaratilish vaqti, server tomonidan hisoblangan kontent xeshi va xeshlangan ota-ona havolasi hamda ishonchli qo'ng'iroq qiluvchining ota-kontent xeshini qayd qiladi. Bekor qilish atom keshini bajarishdan oldin asinxron decode/hash fazalari o'rtasida tekshiriladi.

Ushbu transh hali ishlab chiqaruvchi ishlab chiqaruvchini marshrutga ulamaydi va ko'p o'lchamli variantni tanlashni ta'minlamaydi. Shaffof Video Bridge so'rov yo'li shuning uchun hech qanday qo'shimcha ishni talab qilmaydi, ayni paytda ijarachiga bog'liq bo'lgan asosiy ma'lumotlar va to'liq FU-08 ko'p ruxsatli hayot tsikli to'liq xatti-harakatlar sifatida hujjatlashtirilgandan ko'ra aniq keyingi ish bo'lib qoladi.

Kadrlar sozlangan Video modeli bilan ketma-ket sarlavha qilinadi. Bo'sh Videoni bekor qilish Vision sozlamasini meros qilib oladi; agar ikkalasi ham bo'sh bo'lsa, Vision avtomatik marshrutizatori samarali ko'rish qobiliyatiga ega modelni tanlaydi. Muvaffaqiyatli sarlavhalar asl qismni barqaror `[Video description:` prefiksi bilan almashtiradi, u ham matnni ishonchsiz mediadan olingan kuzatuv sifatida belgilaydi va quyi oqim modellariga ommaviy axborot vositalaridagi ko'rsatmalarga amal qilmaslikni aytadi. Kadr sarlavhalari kesh kalitlari JPEG baytlarini, taklifni, vaqt tamg'asini va samarali modelni o'z ichiga oladi; faqat muvaffaqiyatli sarlavhalar keshlanadi. Kesh yozuvlari haqiqiy muvaffaqiyatli ishlab chiqaruvchi modelini, shu jumladan zaxira modelini saqlaydi; ko'prik turli modellar tomonidan turli ramkalar ishlab chiqarilganda `mixed` haqida xabar beradi. Keshga kirish so'ralgan marshrutlash rejasi sifatida qayta belgilash o'rniga, ishlab chiqaruvchining identifikatoridan qayta foydalanadi. Butun video natija keshi har bir kiritishda kalit —, samarali model, tanlab olish siyosati, kadrlar soni, semantik tahlil rejimi, normallashtirilgan fokusli maslahatning SHA-256 barmoq izini, fokus oynasi, `transcript`, `audioTranscript` va kontakt varaqlari bayrog'i — o'zgartiradi, shuning uchun bu o'lchamlarning birortasini o'zgartirganda, hech qachon keshdan foydalanilmaydi. Vizual dedup siyosati versiyasi, chegara va chegaralangan nomzodlar soni ham natija kesh kaliti va metama'lumotlarida aniq ko'rsatilgan; Shuning uchun siyosat o‘zgarishi eskirgan butun video tavsifidan qayta foydalana olmaydi. Natija-kesh v4 meta-ma'lumotlari rejim va barmoq izini saqlaydi, lekin hech qachon xom foydalanuvchi vazifasini bajarmaydi. Guardrail metadata so'ralgan va samarali tahlil usullari haqida hisobot beradi; foydalanish mumkin bo'lgan foydalanuvchi matnisiz so'ralgan `focused` rejimi samarali `full` sifatida xabar qilinadi.

Qo'riqchi har bir qo'llab-quvvatlanadigan video qismini ajratib oladi, lekin `modalityBridgeVideoMaxVideos` dan ko'proq narsani tasvirlamaydi. `supportsVideo === false` borligi isbotlangan maqsad uchun muvaffaqiyatsiz va chegaralangan videolar aniq xavfsiz matn belgilariga aylanadi, shuning uchun hech qanday xom video omon qolmaydi. Qobiliyati noma'lum bo'lsa, bu qismlar video tashuvchini saqlab qoladi; har qanday zaxira transkript yuqoridagi cheklangan matn konvertatsiyasidan keyin keladi. `supportsVideo === true` bilan nishonlar ko'prikni chetlab o'tadi. Mijoz so'rovini bekor qilish signali yuklab olish, broker navbati, kichik jarayonlar va sarlavha qo'ng'iroqlari orqali tarqaladi; Abortlar videolar orasida to'xtaydi va hech qachon xom media uchun ochiq bo'lmaydi.

Ish vaqti sozlamalari JB tomonidan qo'llab-quvvatlanadi va Zod tomonidan tasdiqlangan:

| Kalit                               | Standart    | Diapazon / xatti-harakatlar                                                                                          |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Ixtiyoriy ish vaqti, kirish                                                                                          |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` umumiy sarlavhalarni saqlaydi; `focused` cheklangan, ishonchsiz oxirgi foydalanuvchi kontekstidan foydalanadi |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge modelini meros qilib oling                                                                             |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                 |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` yoki proportsional `segment_aware`; detektorning ishdan chiqishi `uniform` ga qaytadi       |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                  |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                       |

120 sekunddan ortiq eski davom etgan video taym-out qiymatlari brokerning oxirgi muddatiga mahkamlanadi; limitdan yuqori bo'lgan yangi sozlamalar rad etiladi. `GET /api/modality-bridge/video/runtime` autentifikatsiyadan yoki ish vaqtini tekshirishdan oldin ishonchli muhrlangan orqaga qaytish joylashuvini talab qiladi, keyin boshqaruv autentsiyasini talab qiladi. U faqat `available`, tozalangan FFmpeg/ffprobe versiyalari va ish vaqti mavjud bo'lmaganda aniq sababni qaytaradi. Ichki chiqarish yakuniy nuqtasi ommaviy yuklash API emas: navbatning to'yinganligi `503` plus `Retry-After`, qo'ng'iroq qiluvchining uzilishi `499` qaytaradi va sobit broker muddati `504` qaytaradi. O'zgartirilgan javoblar Vision yoki Audio segmentlarini olib tashlamasdan markaziy `x-omniroute-modality-bridge` sarlavhasiga `video->text;model=<visionModel>;parts=<videos>` qo'shadi.

### PII Masker (`piiMasker.ts`)

Davom etadi** ikkalasi ham** bosqichlari.

- **`preCall`** foydali yukni klonlaydi, `system`, `messages`, `input` va `prompt` (jumladan, oddiy string elementlari) boʻylab yuradi va `processPII()` ( `@/shared/utils/inputSanitizer` dan) `content`/`text` maydonlariga qoʻllaydi. Qachon `PII_REDACTION_ENABLED=true`, aniqlangan PII chiquvchi foydali yukda tahrirlanadi. Bu `INPUT_SANITIZER_MODE` dan mustaqil (faqat tezkor kiritish siyosatini boshqaradi). Qayta tiklash o'chirilgan bo'lsa, qo'ng'iroq kontentni qayta yozmasdan aniqlashni qayd qiladi.
- **`postCall`** javobni chuqur klonlaydi, `sanitizePIIResponse()` va Responses-API shaklidagi niqobni ishga tushiradi (`maskResponsesOutput` — `output_text` va `output[].content[].text` ni qamrab oladi). Agar biron bir tahrir sodir bo'lsa, o'zgartirilgan javob asl nusxani almashtiradi.

Qo'riqchi hech qachon to'sib qo'ymaydi; u faqat izoh beradi (`meta.detections`, `meta.redacted`) yoki qayta yozadi.

#### Har bir turdagi tanlash, maxsus naqshlar va aniqlash hisoblagichlari

**Boshqaruv paneli → Parametrlari → Xavfsizlik → PII maskalanishi** niqoblangan _nimani tanlaydi. U niqoblashni yoqmaydi: bu hali ham `PII_REDACTION_ENABLED` (so'rov) va `PII_RESPONSE_SANITIZATION` (javob + SSE), ikkalasi ham sukut bo'yicha o'chirilgan.

- **Har bir tur uchun tanlov** — o'rnatilgan identifikatorlar `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`) da keltirilgan. Oʻrnatilmagan har bir tur (ushbu sozlama mavjud boʻlgunga qadar harakat) degan maʼnoni anglatadi. So‘rov mexanizmining `ssn_us` namunasi `ssn` ga mos keladi. Shablonlar (Minimal, Standart, Moliyaviy, Braziliya, USA, GDPR, POPIA, Toʻliq) faqat UI dagi belgilash katakchalarini toʻldiradi.
- **GDPR va POPIA identifikatorlari** — EU va Janubiy Afrika shaxsiy identifikatorlarini qamrab oluvchi o'n ikkita o'rnatilgan identifikator (quyidagi jadval). Ularning regexlari, validatorlari va yurisdiktsiya teglari bitta jadvalda, `src/shared/utils/piiPatterns.ts` joylashgan bo'lib, ularni javobni tozalash vositasi (`src/lib/piiSanitizer.ts`) va so'rovni niqoblovchi (`src/shared/utils/inputSanitizer.ts`) iste'mol qiladi. Moslik faqat uning validatori uni qabul qilgan taqdirdagina tahrir qilinadi; raqamlarning yalang'och yugurishi hech qachon etarli emas. Ushbu identifikatorlar mavjud bo'lgunga qadar toraytirilgan tanlovni saqlagan operator yangi identifikatorlar belgilanmaguncha o'zining xatti-harakatlarini saqlab qoladi.
- **Maxsus naqshlar** — 20 tagacha regex yoki joker belgilar (`*` = 64 ta boʻsh boʻlmagan belgilar, `?` = bitta). Matchlar `[CUSTOM_REDACTED]` aylanadi. Har bir naqsh `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`) dan o'tadi: ko'pi bilan 500 ta belgidan iborat, `g i m s u` bilan cheklangan bayroqlar kompilyatsiya qilinishi kerak, `safe-regex` (halokatli orqaga qaytish) dan o'tishi kerak va bo'sh satr yoki redaktsiya to'ldiruvchisiga mos kelmasligi kerak. Muvaffaqiyatsiz bo'lgan naqsh saqlangan va sinovdan o'tkazilganda rad etiladi va bajarilmagan saqlangan qator kompilyatsiya qilish o'rniga ish vaqtida o'tkazib yuboriladi. Maxsus naqshlar faqat niqoblash yoqilganda ishlaydi.
- **Aniqlash hisoblagichlari** — har bir turdagi hisoblar (hech qachon mos kelmaydigan qiymatlar), xotirada saqlanadi va qayta ishga tushirilganda qayta o'rnatiladi (`src/lib/pii/piiDetectionStats.ts`). Ular faqat niqoblash yoqilgan paytda ortadi.

Sozlamalar `key_value` jadvalida (nomlar maydoni `pii_settings`, `src/lib/db/piiSettings.ts`) yashaydi va 1 s kesh orqali o'qiladi. API:

| Usul   | Yo'l                     | Maqsad                                                                                 |
| ------ | ------------------------ | -------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Bayroq holati, `enabledTypes`, `customPatterns`, aniqlash hisoblagichlari              |
| `PUT`  | `/api/settings/pii`      | `enabledTypes` (`null` = all) and/or `customPatterns` ni almashtiring                  |
| `POST` | `/api/settings/pii/test` | Bir namunani ko'pi bilan 8 KB bo'lgan namunaga qarshi quriting; hech narsa saqlanmaydi |

Uchalasi ham boshqaruv authini talab qiladi va tanani Zod (`src/shared/validation/schemas/piiSettings.ts`) bilan tasdiqlaydi.

#### GDPR (EU) va POPIA (Janubiy Afrika) identifikatorlari

| Id                  | Identifikator                        | Tasdiqlash                                                                                  |
| ------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                                 | Ma'lum mamlakat, o'sha mamlakat uchun aniq uzunlik, ISO 13616 MOD-97-10                     |
| `eu_vat`            | EU VAT raqami                        | Maʼlum aʼzo davlat prefiksi va bu shtatning raqam formati ( VIES qidiruvi yoʻq)             |
| `es_dni_nie`        | Ispan DNI / NIE                      | Nazorat xati (mod 23 qiymati); NIE `X/Y/Z` + 7 ta raqam                                     |
| `it_codice_fiscale` | Italiya Kodeksi Fiscale              | odd/even pozitsiyasi jadvallaridan nazorat xati                                             |
| `pl_pesel`          | Polsha PESEL                         | Og'irlangan nazorat summasi va mavjud kodlangan tug'ilgan sana                              |
| `nl_bsn`            | Gollandiyalik BSN                    | 11-dalil (og'irliklari 9..2, -1)                                                            |
| `de_steuer_id`      | Germaniya Steuer-ID                  | ISO 7064 Mod 11,10 va raqamli tuzilma qoidalari (boshlovchi 0 yo'q)                         |
| `se_personnummer`   | Shvetsiya xodimi                     | Oxirgi o'n raqam ustidagi Luhn va tug'ilgan sanasi (10 yoki 12 raqam)                       |
| `za_id`             | Janubiy Afrika ID raqami             | Barcha 13 ta raqamdan ortiq Luhn, haqiqiy tug'ilganlik month/day, fuqarolik raqami 0 yoki 1 |
| `za_phone`          | Janubiy Afrika telefon               | `+27` / `27` prefiksi yoki bo'sh joy yoki defis bilan yozilgan milliy `0..` shakli          |
| `za_vat`            | Janubiy Afrika VAT raqami            | `4` bilan boshlangan 10 ta raqam** va** Oldin 48 belgi ichida "VAT" / "BTW"                 |
| `za_tax_ref`        | Janubiy Afrika soliq ma'lumotnomasi. | `0` boshlanadigan 10 ta raqam -`3`, Luhn,** va** Oldin 48 belgi ichida "tax" / "SARS"       |

Faqat raqamli formatlar buyurtma raqamlari, raqamlar va vaqt belgilari bilan toʻqnashganligi sababli, eng zaiflari (`za_vat`, `za_tax_ref`) kalit soʻzni talab qiladi va oʻn xonali yalangʻoch `0..` raqami Janubiy Afrika telefon raqami sifatida koʻrib chiqilmaydi. Intervalli IBANs (`GB29 NWBK ...`) mos emas. Oqim yo'lida ishora faqat joriy bo'lak ichida qaraladi. Identifikatorlar umumiy telefon naqshlaridan oldinda joylashgan, shuning uchun tasdiqlangan identifikator o'z o'rnini egallaydi (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). `gdpr` va `popia` shablonlari mos ravishda EU va Janubiy Afrika identifikatorlarini tanlaydi. Maskaning o'zi qo'shilib qoladi (Qattiq qoida №20): bu erda hech narsa standart xususiyat bayrog'ini o'zgartirmaydi.

### Tez in'ektsiya (`promptInjection.ts`)

Foydalanuvchi tomonidan taqdim etilgan kontentdagi raqib tuzilmalarini aniqlaydi va sozlangan siyosatni amalga oshiradi. Xulq-atvor atrof-muhit o'zgaruvchilari va konstruktor variantlari tomonidan boshqariladi:

| Sozlama        | Env var                                                                                                    | Standart | Effekt                                                                                                                                                                                                                            |
| -------------- | ---------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Yoqilgan       | `INPUT_SANITIZER_ENABLED`                                                                                  | `true`   | Qachon `false`, himoya panjarasi qisqa tutashuvi.                                                                                                                                                                                 |
| Rejim          | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                            | `warn`   | Injection siyosati: `block`, `warn`, yoki `log`. (`redact` back-compat uchun qabul qilinadi, lekin shunday qiladi** emas** chiziqli in'ektsiya matni; PII so'rovini qayta yozish `PII_REDACTION_ENABLED` tomonidan boshqariladi.) |
| Blok chegarasi | `blockThreshold` varianti / `INPUT_SANITIZER_BLOCK_THRESHOLD` (taxallus `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Bloklash uchun zarur bo'lgan minimal jiddiylik. O'rta sukut bo'yicha faqat kuzatiladi.                                                                                                                                            |

**Rejim ustunligi** (`getMode`): qo'ng'iroq qiluvchi `options.mode` → `INJECTION_GUARD_MODE`**DB xususiyat-bayroqni bekor qilish** (Boshqaruv paneli → sozlamalari → Xususiyatlar bayroqlari) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. Shuning uchun asboblar panelini bekor qilish env varslari ustidan g'alaba qozonadi, shuning uchun Feature Flags UI ishlaydigan qo'riqchini jonli ravishda boshqaradi (qayta ishga tushirilmaydi). DB o'qish xatolikka yo'l qo'ymaydi: agar u xato qilsa, qo'riqchi envga asoslangan xatti-harakatlarga qaytadi va hech qanday bekor o'rnatilmaganda xatti-harakat faqat env ruxsati bilan bir xil bo'ladi.

Aniqlash manbalari:

1. `@/shared/utils/inputSanitizer` dan `sanitizeRequest()` (quvurning boshqa joylarida ishlatiladigan umumiy detektorlar to'plami).
2. Oʻrnatilgan `DEFAULT_GUARD_PATTERNS` (hozirda `system_override_inline` va `markdown_system_block`, ikkalasi ham `high` jiddiyligi).
3. Ixtiyoriy `customPatterns` konstruktor variantlari (satrlar, regex yoki `{ name, pattern, severity }` yozuvlari) orqali o'tkaziladi.

Qachon `mode === "block"`** va** kamida bitta aniqlash jiddiylik chegarasiga javob beradi, `preCall` `{ block: true, message: "Request rejected: suspicious content detected" }` qaytaradi. `warn`/`log` rejimlarida qo'riqchi ro'yxatga oladi, lekin qo'ng'iroq qilishga ruxsat beradi. Umumiy yordamchi `evaluatePromptInjection()` shuningdek, ro'yxatga olish kitobidan o'tmasdan takliflarni baholashi kerak bo'lgan qo'ng'iroq qiluvchilar uchun eksport qilinadi.

**Skanerlangan (v3.8.20):** detektor faqat tekshiradi** birinchi 16 KB** `src/shared/utils/inputSanitizer.ts` ichida birlashtirilgan tezkor matn — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bayt). Naqshli siklni ishga tushirishdan oldin ham `detectInjection()`, ham `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)`. Injection direktivalari kirishning yuqori qismiga yaqin joylashadi, shuning uchun bu aniqlanishni zaiflashtirmasdan ko'p yuz KB foydali yuklarda regex CPU/GC cheklaydi (qarang. #3932, #4041).

### Hisob ma'lumotlarini maskalovchi (`credentialMasker.ts`)

Davom etadi** ikkalasi ham** bosqichlar, sukut bo'yicha zanjirda oxirgi (prioritet `95`). Chiqish yukidan (xabar mazmuni, asbob-chaqiruv argumentlari, asboblar natijalari) taniqli API-kalitlari / maxfiy token naqshlarini o'zgartiradi.** va** provayderning javobi, shuning uchun so'rovga joylashtirilgan hisob ma'lumotlari (yoki vosita natijasi bilan aks ettirilgan) yuqori oqim provayderiga yoki mijozga qaytarilmaydi.

- **Faqat ro'yxatdan o'tish** , PII redaktsiyasi bilan bir xil konventsiya (Qattiq qoida №20-qo'shni): agar `settings.credentialRedactionEnabled === true` bo'lmasa, o'chirib qo'yiladi** yoki** `CREDENTIAL_REDACTION_ENABLED=true`. U o'chirilgan bo'lsa, qo'riqchi no-op — bo'lib, u hech qachon blokirovka qilmaydi va hech qachon qayta yozmaydi.
- `redactCredentials()` toʻliq payload/response daraxti boʻylab yuradi (`walkValue()`, prototip-ifloslanishdan xavfsiz, `WeakSet` orqali sikl xavfsiz) va gugurtlarni `[REDACTED:<type>]` toʻldiruvchisi bilan almashtirib, faqat haqiqatda oʻzgargan novdalarni klonlaydi.
- `CREDENTIAL_PATTERNS` LLM provayder kalitlarini (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokenlarini (GitHub, Slack, Lineer, Notion, npm, Postman, Discord), to‘lov kalitlarini (kvadrat kaliti), bulutga kirish kalitlarini (AWS ) qamrab oladi. Twilio, SendGrid, Mailgun), shaxsiy kalitlar / JWTs, hisobga olish ma'lumotlariga ega ulanish satrlari (`mongodb://user:pass@...` va boshqalar) va umumiy `Authorization`/`x-api-key`/`api-key`/`apikey` sarlavha qiymati namunasi. Sarlavha shaklidagi kalitlar (`authorization`, `x-api-key`, `api-key`, `apikey`) umumiy matn regex orqali emas, balki tizimli ravishda tahrirlanadi (faqat qiymat, sxema prefiksi `Bearer `/`Basic ` kabi saqlanadi).
- Qo'riqchi hech qachon to'sib qo'ymaydi; u faqat qayta yozadi (`modifiedPayload` / `modifiedResponse`) va izoh beradi (`meta.credentialsRedacted`, `meta.count`).

Regressiya himoyachisi: `tests/unit/credential-masker-guardrail.test.ts`.

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
