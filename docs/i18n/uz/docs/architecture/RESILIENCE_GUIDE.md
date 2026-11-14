# Resilience Guide (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute uchta alohida, lekin bir-biriga bog'liq bo'lgan moslashuvchanlik mexanizmiga ega. Har birining maqsadi va doirasi boshqacha. Marshrutlash xatti-harakatlarini tuzatishda ularni alohida saqlang.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Manba: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Moslashuvchanlikni almashtirish uchun Env-vs-boshqaruv paneli ustunligi.** Qo'shilishga chidamlilik muhitdan — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — o'zgartiriladi faqat _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`) bilan ta'minlaydi. Mantiqiy qiymat `resilienceSettings` da saqlanib qoldi (Dashboard →** Sozlamalar → Resilience** / `PATCH /api/resilience`, `key_value` da saqlanadi) env qiymatini yutadi: normallashtirish (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) mavjud bo'lganda saqlangan mantiqiy qiymatni saqlaydi. Boshqaruv paneli allaqachon saqlangan `false` bo'lgan joylashtirishda bunday env var ni `true` ga o'rnatish, shuning uchun hech narsani o'zgartirmaydi — almashtirish tugmachasini aylantiradi** Sozlamalar → Resilience** (yoki saqlangan maydonni tozalang) o'rniga.

## 1. Provayder avtomatik uzgichi (Circuit Breaker)

**Qamrov:** butun provayder (masalan, `glm`, `openai`, `anthropic`).

**Maqsad:** yuqori oqim/xizmat darajasida takroran ishlamayotgan provayderga trafik yuborishni to'xtatish.

**Amalga oshirish:**

- Asosiy klass: `src/shared/utils/circuitBreaker.ts`
- Ulanish: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Holat API'si: `GET /api/monitoring/health`
- Qayta tiklash API'si: `POST /api/resilience/reset`
- O'ramlar (wrapper): `open-sse/services/accountFallback.ts`
- DB jadvali: `domain_circuit_breakers`

**Holatlar:**

- `CLOSED` — oddiy trafik ruxsat etiladi
- `DEGRADED` — trafik hali ham ruxsat etiladi, lekin provayderda ko'paygan xatoliklar kuzatilmoqda; yetarli miqdordagi muvaffaqiyatli so'rovlar, amal qiladigan ulanish testi yoki oxirgi xatolik turi uchun eng uzun `OPEN` ushlab turish muddatidan keyin (uning `cooldownByKind` qiymati, aks holda `resetTimeout`, × `maxBackoffMultiplier`, kamida bitta cooldown) yangi xatolik yuz bermasa, `CLOSED` holatiga qaytadi
- `OPEN` — provayder vaqtincha bloklangan; combo marshrutlash uni o'tkazib yuboradi
- `HALF_OPEN` — qayta tiklanish vaqti o'tgan; sinov (probe) so'roviga ruxsat beriladi

**Sozlanadigan standart qiymatlar (`open-sse/config/constants.ts`, Boshqaruv paneli → Sozlamalar → Chidamlilik sahifasida ko'rsatiladi):**

| Sinf    | DEGRADED bo'ladi | Ochiladi   | Qayta tiklanish vaqti |
| ------- | ---------------- | ---------- | --------------------- |
| OAuth   | 5 xatolik        | 8 xatolik  | 60s                   |
| API-key | 7 xatolik        | 12 xatolik | 30s                   |
| Local   | hosilaviy        | 2 xatolik  | 15s                   |

`degradationThreshold` provayder qachon `DEGRADED` holatiga kirishini boshqaradi; `failureThreshold` esa qachon ochilishi va o'tkazib yuborilishini belgilaydi. Mahalliy (Local) provayder profillari hozircha Chidamlilik sozlamalari sahifasida ko'rsatilmaydi.

**Uzgich kodlari:** faqat provayder darajasidagi statuslar `[408, 500, 502, 503, 504]`. Hisob (account) darajasidagi xatoliklar uchun ishga TUSHMASLIGI kerak (ko'pchilik 401/403/429 xatoliklari cooldown yoki lockout mexanizmlariga tegishli).

**Dangasa tiklanish (lazy recovery):** `OPEN` muddati tugagach, `getStatus()`, `canExecute()`, `getRetryAfterMs()` holatni `HALF_OPEN` ga yangilaydi. Xuddi shu o'qishlar (va keyingi xatolik) eskirgan `DEGRADED` holatini `CLOSED` ga qaytaradi. Orqa fon taymeri kerak emas.

---

### Ixtiyoriy (opt-in) global Provayder Cooldown'i (oyna cheklovi)

To'rtinchi, **ixtiyoriy** qavat (`PROVIDER_COOLDOWN_ENABLED`, sukut bo'yicha **o'chiq**) ishlamayotgan provayderlar haqida so'rovlararo xotirani `open-sse/services/providerCooldownTracker.ts` faylida saqlaydi; combo maqsadlarini aniqlash shu xotiraga murojaat qiladi, shunda ketma-ket combo so'rovlar hozirgina ishlamay qolgan provayderni qayta-qayta tekshirib o'tirmaydi. Provayder darajasidagi yozuvlar `PROVIDER_PROFILES` oyna chekloviga bo'ysunadi:

| Profil  | ishga tushadi (`providerFailureThreshold`) | ichida (`providerFailureWindowMs`) | soviydi (`providerCooldownMs`) |
| ------- | -----------------------------------------: | ---------------------------------: | -----------------------------: |
| OAuth   |                                       `10` |                            `15min` |                         `5min` |
| API key |                                       `15` |                            `30min` |                        `10min` |

Chegaradan past bo'lsa, provayder sovuyapti deb hisoblan**maydi**; muvaffaqiyatli so'rov oynani tozalaydi. Ulanish darajasidagi yozuvlar (`provider:connectionId`) buning o'rniga eksponensial `minRetryCooldownMs → maxRetryCooldownMs` backoff'ini saqlaydi. Qayta belgilashlar (override):
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regressiyadan himoya qiluvchi test: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Ulanishni sovutish

**Qo'llash doirasi:** yagona provayder connection/account/key.

**Maqsad:** Xuddi shu provayder uchun boshqa ulanishlar xizmat qilishda davom etar ekan, bitta noto'g'ri kalitni o'tkazib yuboring.

**Amalga oshirish:**

- Mavjud emas deb belgilang: `src/sse/services/auth.ts::markAccountUnavailable()`
- Tanlash: bir xil faylda `getProviderCredentials*`
- Sovutish vaqti: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Sozlamalar: `src/lib/resilience/settings.ts`

**Har bir ulanish uchun maydonlar:**

- `rateLimitedUntil` — vaqt tamg'asi sovutish muddati tugaguncha
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — eksponensial orqaga qaytish hisoblagichi

**Standart sovutish vaqti:**

- OAuth bazasi: 5s
- API kalitlari bazasi: 3s
- API-kalit 429: yuqori oqim `Retry-After`/ reset headers/parseable reset matnini afzal ko'radi
- Orqaga qaytish: `baseCooldownMs * 2 ** failureIndex`

**Har bir provayder uchun qayta urinish kechikishi.** Provayder tafsilotlari sahifasida a bor** Qayta urinish kechikishi** tanlang (Avtomatik, 15 soniyadan 1 soatgacha). `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600, `PATCH /api/resilience` orqali) saqlaydi. Tezlik chegarasi xatosi yuqori oqimga qayta urinib ko‘rish haqida maslahat bermasa, bu qiymat provayder uchun miqyosdagi orqaga qaytish o‘rnini bosadi va `backoffLevel` 0 (`open-sse/services/rotationConfig.ts::overrideFor`) ga qaytaradi. Tezlik bilan cheklangan xatolik uchun ustunlik, birinchi navbatda eng yuqori: yuqori oqimdagi qayta urinish bo‘yicha maslahat, so‘ngra har bir ulanish uchun `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, keyin har bir provayder uchun qayta urinish kechikishi, keyin env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, so‘ngra masshtabli qaytarilish. Maydonni avtomatik olib tashlaydi. Bu faqat tarif chegarasi sababiga ta'sir qiladi, hech qachon terminal holatlariga ta'sir qilmaydi.

**Momaqaldiroqqa qarshi qorovul:** Sovutish muddatini haddan tashqari uzaytirish yoki `backoffLevel` ikki baravar oshirishdan bir vaqtda nosozliklarni oldini oladi.

**429-sonli parallellik chegarasi orqaga qaytish zinapoyasiga chiqmaydi.** Tanasi parallellik chegarasi haqida xabar bergan `429` (“juda ko‘p bir vaqtda so‘rovlar”, “parallellik chegarasi”, “parallel so‘rov chegarasi”, GLM `并发数过高`) hisob sog‘lom, lekin band ekanligini bildiradi. `checkFallbackError()` `concurrency_limited` sababini qaytaradi: hozir keyingi ulanishga o‘tish, uni sobit `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) yoki yuqori oqimga qayta urinib ko‘rish uchun sovitish, `backoffLevel` o‘zgarmagan holda saqlash va `skipProviderBreaker` o‘rnatish. Aniq kvota tanasi hali ham g'alaba qozonadi, shuning uchun kvota tartibiga mos keladigan organ kvota hukmi bo'lib qoladi. Aniqlash: `src/shared/utils/classify429.ts` ichida `looksLikeConcurrencyLimit()` ; hukm: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (to'xtatuvchining `FailureKind`) o'zgarmagan va hali ham bu jismlar uchun `rate_limit` o'qiydi.

**Stream kontenti stendlari hisobni sovutmaydi.** Kontent-stall kuzatuvchisi (`open-sse/utils/streamHandler.ts`) o‘z vaqtida model chiqishini jo‘natmagan oqimdan voz kechsa, `markAccountUnavailable()` ulanishdagi xatolikni qayd qiladi, lekin sovutish vaqti o‘rnatmaydi: to‘xtash joyi o‘sha so‘rovga tegishli bo‘lib, ko‘pincha hali chiqmagan holda uzoq fikrlash davri. Operatorlar `resilienceSettings.streamStallCooldown.enabled` (standart `false`) bilan qayta kirishlari mumkin.

**`p2c` hisobini tanlash uchun kechikish signali.** Har bir jo'natilgan urinish o'zining birinchi baytgacha bo'lgan vaqtini va har bir ulanish (va har bir ulanish + modeli) natijasini xotiradagi siljish oynasida qayd etadi: 15 daqiqa ichida oxirgi 20 ta namuna (`open-sse/services/connectionLatencyTracker.ts`, `safeLogEvents()` dan `src/sse/handlers/chatHelpers.ts` da yozib olingan). `resilienceSettings.p2cLatency.weight` `0` yuqori bo'lsa (diapazon 0-20, standart `0` = o'chirilgan), `src/sse/services/auth.ts` `compareP2CConnections()` juftlikning har bir nomzodiga `weight` ballgacha qo'shadi. Buning yarmi kechikishdan tezroq nomzodga nisbati (ikki baravar sekin to'liq yarmini oladi) va yarmi aylanish xatosi darajasidan kelib chiqadi. Ushbu atama faqat ikkala nomzodda kamida 3 ta namunaga ega bo'lgan taqdirdagina qo'llaniladi, shuning uchun yangi hisoblar jazolanmaydi va uning chegarasi kvota bloklangan va kvota tugagan jazolardan past bo'ladi. U o'ziga xos sxemani qo'shmaydi: muvaffaqiyatsiz hisoblar hali ham sovutish, blokirovka va to'xtatuvchi qatlamlar tomonidan boshqariladi. Uni `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` bilan o'rnating.

**Fikrlash ramkalari kontent-to'xtash byudjetini qayta ishga tushiradi.** Fikrlash modeli o'zining birinchi ko'rinadigan tokenidan oldin bir necha daqiqa o'ylab ko'rishi mumkin: Claude fikrlash matni bo'sh bo'lishi mumkin bo'lgan `thinking_delta` freymlarni uzatadi va API javoblari birin-ketin fikrlash elementini uzatadi. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) bu kadrlarni taniydi va qo‘riqchi navbatni bekor qilish o‘rniga har birida o‘z byudjetini qayta ishga tushiradi. Ular hali ham namunaviy chiqish emas, shuning uchun faqat fikrlash bilan tugaydigan burilish hali ham bo'sh deb xabar qilinadi va fikrlashni to'xtatuvchi va faqat yurak urishlarini yuboradigan burilish hali ham kuzatuvchini qo'zg'atadi.

Kiro ning bo'sh bo'lmagan imzosi bo'lgan ikkilik `reasoningContentEvent` freymlari bu fikrlash faoliyatini bajaruvchi orqali bo'sh `reasoning_content` deltasi sifatida saqlaydi. Imzo yuborilmaydi. Metadata, to'liq bo'lmagan ramkalar va bo'sh imzolar kontent byudjetini qayta ishga tushirmaydi; mustaqil faol oqim vaqti va mijozni bekor qilish hali ham amal qiladi (`open-sse/executors/kiro/reasoning.ts`).

**Terminal holatlari (NOT sovutish vaqti):**

- `banned` — taqiqlangan kalit so'z / hisobni taqiqlashni aniqlash orqali o'rnatiladi (qarang: [BAN_DETECTION](../security/BAN_DETECTION.md) ). Yuqori oqim boshiga so‘rovni rad etish (`request_rejected`, masalan Anthropic OAuth 403 “So‘rovga ruxsat yo‘q”) hech qachon o‘rnatilmaydi: ular har bir ulanish va model bo‘yicha hisoblanadi va `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 soat) bilan chegaralangan o‘sib borayotgan sovutish vaqti bilan ushbu modelni aylanishdan olib tashlaydi yoki hech qanday model ma’lum bo‘lmasa, ulanishni sovutadi — `open-sse/services/requestRejectedStreak.ts`
- `expired` (cheklangan takroriy urinishlardan so‘ng terminalga o‘tish — `EXPIRED_RETRY_MAX = 3` eksponensial orqaga qaytish — bilan, shuning uchun vaqtinchalik OAuth xatolar hisob butunlay o‘chirilgunga qadar o‘z-o‘zidan tuzalishi mumkin)
- `credits_exhausted`

Hisob ma'lumotlari o'zgarmaguncha yoki operator ularni qayta tiklamaguncha ular saqlanib qoladi. Vaqtinchalik sovutish holatiga ega terminal holatlarini qayta yozmang.

**Dangasa tiklanish:** `rateLimitedUntil` o'tganda, ulanish yana yaroqli bo'ladi. Muvaffaqiyatli foydalanishda `clearAccountError()` barcha xato maydonlarini tozalaydi.

### Claude OAuth foydalanish devori: past ustuvor yo‘lak + seans chegarasini tiklash

**Qo'llash doirasi:** bitta Claude obuna (OAuth) ulanishi. Ikkala xususiyat ham** har bir ulanish uchun ro'yxatdan o'tish** (Ulanish → Claude bo‘limi → `lowPriorityMode` / `autoLimitReset` in `providerSpecificData`, ikkalasi ham sukut bo‘yicha o‘chirilgan) va Claude Codening `/low-priority` va `/limit-reset` buyruqlarini aks ettiring ( Claude Code 2.1.263 dan olingan simli shartnoma).

**Amalga oshirish:**

- Davlat mashinasi + javob tasnifi: `open-sse/services/claudeLowPriority.ts`
- status/claim mijozini tiklash: `open-sse/services/claudeLimitReset.ts`
- Ijrochi kancasi (sarlavha kiritish + bir xil hisobni qayta urinish): `open-sse/executors/base.ts::execute()`
- Ro'yxatdan o'tishda qat'iylik: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Trigger:** 5 soatlik foydalanish devori — a `429`, uning sarlavhalari `anthropic-ratelimit-unified-status: rejected` o'z ichiga oladi va agar hisob mos bo'lsa, `anthropic-ratelimit-unified-slow-offer: treatment`. O'sha birinchi devordan oldin hech narsa yuborilmaydi 429; birlashtirilgan sarlavhalarsiz portlash 429 oddiy sovutish yo'lidan o'tadi.

**Pastki ustuvor yo'lak** (`lowPriorityMode`):

- Devorda 429 ijrochi taklifni qabul qiladi va darhol qayta urinib ko'radi** bir xil** `anthropic-usage-limit: slow` bilan hisob; qator e'lon qilingan `anthropic-ratelimit-unified-reset` (+ 60s grace)gacha faol qoladi va bu oynadagi har bir so'rov sarlavhani olib yuradi. Qabul qilingan 429 hech qachon `handleChatCore` etib bormaydi, shuning uchun ulanish** emas** sovutish rejimiga qo'ying va aylanmaydi.
- keyingi javoblarda `anthropic-ratelimit-unified-slow-status` : `active` / `not_needed` chiziqni ushlab turing; `slot_busy` (429) yoki `529` serverning `anthropic-ratelimit-unified-slow-retry-after` kuting (standart 20s, qisqich 5–600s, ± 30% jitter) va `anthropic-ratelimit-unified-slow-max-wait` bilan chegaralangan (standart 20 daqiqa, qisqich 1 min–6 soat) — yo‘lak tugashi va sovishini kuting. Kutish, qo'shimcha ravishda, so'rovning o'zining yuqoriga yo'nalishda ishga tushish vaqti (`resolveFetchStartTimeout`, sukut bo'yicha 10 min) minus 5 s chegarasi bilan chegaralanadi: bu cheklovsiz 20 daqiqalik sukut bo'yicha maksimal kutish so'rovdan oshib ketadi va kutish kutishning o'rtalarida to'xtatiladi, + esa cooloff o'rniga `max_wait` o'rniga `TimeoutError` grace.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5 soatlik oynani ag'darish yoki `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (bu har qanday holatda `extra_usage` sifatida tugaydi, chunki to'langan ortiqcha to'lov endi devorni qoplaydi) chiziqni tugatadi; keyin javob normal sovutish yo'liga oqib o'tadi. `budget_exhausted` e'lon qilingan byudjetni tiklashgacha eslab qoladi (≤ 8 kun).
- Devor tekshiruvi ijrochining 400 ta intra-urinishlaridan (kontekstni tahrirlash, thinking/effort qisqichlari, parametrlarni avtomatik o'rganish) so'ng amalga oshiriladi, shuning uchun 429-sonli devor sovutish yo'liga etib borish o'rniga, faqat shu qayta urinishlardan birida yuzalarni ushlab turadi.
- Holat har bir ulanish uchun xotirada (qayta ishga tushirish uchun yana bitta devor 429 turadi).

**Seans chegarasini tiklash** (`autoLimitReset`, ikkalasi ham yoqilgan bo'lsa, chiziqdan oldin harakat qildi):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` bloki; qachon `arm: "reset"` va `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` bilan `{ "program": "juniper_tide" }` (tashkilot UUID dan `providerSpecificData.organizationUUID`, bootstrap fallback).
- `result: reset|not_limited` → so'rov to'liq tezlikda qayta urinib ko'riladi (sekin sarlavha yo'q). `already_used` / `not_offered` memoise `next_available_at` (standart bir hafta); har qanday nosozlik 15 daqiqada to'xtaydi. Qayta o'rnatish haftada bir marta amalga oshiriladi va hali ham haftalik chegaraga kiradi.

Regressiya himoyachilari: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Bank o'rnatilgan tiklashlarni avtomatik qo'llash

**Qo'llash doirasi:** Codex va Claude obuna (OAuth) ulanishlari.** Ro‘yxatdan o‘tish** : `bankedResetAutoApply` sozlamasi oʻchirilgan va sukut boʻyicha `dry-run` rejimida (Sozlamalar → AI → Banklangan qayta oʻrnatishlarni avtomatik qoʻllash).

**Maqsad:** Operatorning Provayder chegaralari sahifasida “Qabul qilish” tugmasini bosishini kutish o‘rniga, hisob foydalanish devoriga tushganda, bank o‘rnatilgan resetlarni mustaqil ravishda sarflang.

| Kredit turi (`creditTypes`) | Qaytarilgan narsa                                   | Qayerda yuradi                                                              |
| --------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------- |
| `codexCredits`              | Codex kreditlarni tiklash                           | fon ishi, har 60 soniyada                                                   |
| `claudeCredits`             | Claude bank grantlari (`GRANT` kreditlari)          | fon ishi, har 60 soniyada                                                   |
| `claudeSessionReset`        | Claude haftalik sessiya limitini tiklash (yuqorida) | so'rov yo'li, har bir hisob uchun almashtirish bilan bir xil siyosat orqali |

**Amalga oshirish:**

- Sof qaror (har ikki yo'l uchun bir qoida o'rnatilgan): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- Asosiy ish: `src/lib/services/bankedResetAutoApply.ts` ( `src/instrumentation-node.ts` da boshlangan)
- Claude so'rov yo'li darvozasi: `src/lib/usage/claudeSessionResetPolicy.ts`, `open-sse/services/claudeLimitReset.ts` da `setClaudeLimitResetPolicy()` orqali ro'yxatdan o'tgan
- Tarix, bosh harflar va vebhuk: `src/lib/usage/bankedResetAudit.ts`
- Tarix API: `GET /api/settings/banked-reset-auto/history?limit=50` (boshqaruv auth)

**Qaror qabul qilish tartibi** (birinchi muvaffaqiyatsiz qoida - bu qayd etilgan sabab):

1. Funksiya o‘chirilgan, kredit turi o‘chirilgan yoki hisob ko‘rib chiqilmagan (`accountScope` `all` / `selected` va har bir hisob uchun `connections` xaritasi).
2. Ixtiyoriy UTC jadvalidan tashqari (`startHourUtc` > `endHourUtc` yarim tunni kesib o'tadi).
3. Oxirgi 24 soatdagi bosh harflar: `maxPerAccountPerDay` (1), `maxPerDay` (3) va `minSpacingMinutes` (30) har qanday ikkita xarid o‘rtasida.
4. Trigger: devor bilan o'ralgan `session` yoki `weekly` oynasi ( `getQuotaWindowStatus().reachedThreshold` emas, `isAccountQuotaExhausted()` dan o'qing, u faqat har bir sarflangan oynada hisob haqida xabar beradi) yoki kamida `expiringCreditMinUsedPercent` (50) ishlatgan hisobdagi kredit muddati `expiringCreditHours` (24) ichida tugaydi.
5. Tabiiy qayta o'rnatish qo'riqchisi: devor bilan o'ralgan 5 soatlik oyna `sessionResetGuardMinutes` (90) ichida yoki haftalik devorli oyna `weeklyResetGuardHours` (12) ichida tiklanganda o'tkazib yuboring.
6. Haftalik qavat: haftalik qolgan `weeklyFloorPercent` (10) dan past bo'lsa, 5 soatlik tiklashni o'tkazib yuboring.
7. `last-resort` rejimi: bir xil provayderning boshqa bir hisob qaydnomasi ikkala oynada kamida `poolHeadroomPercent` (10) qolgan bo‘lsa, o‘tkazib yuboring. Muddati tugagan kredit tetiklari buni chetlab o'tadi.
8. `dry-run` qatorni yozadi va hech narsani qaytarib bermaydi; `last-resort` va `eager` sotib olish.

Yo'qolgan kvota ma'lumotlari to'lovni hech qachon ochmaydi: noma'lum tiklash vaqti yoki haftalik foydalanish o'tkazib yuboriladi.

**Claude sessiyasini tiklash:** xususiyat o'chirilgan yoki `claudeSessionReset` o'chirilgan holda, har bir hisob uchun `autoLimitReset` o'tish-o'tish to'liq avvalgidek qaror qiladi. Ikkalasi ham yoqilgan bo‘lsa, bu xususiyat har bir hisob uchun almashtirishlarni almashtiradi: amaldagi hisob faqat siyosat ruxsat bergan taqdirdagina da’vo qilishi mumkin va `dry-run` rejimida hech qanday da’vo qo‘yilmaydi.

**Xavfsizlik:** Ish har bir belgi uchun koʻpi bilan bitta kreditni sotib oladi, kreditlarni roʻyxatga olishdan oldin qaror qiladi (oʻtkazib yuborilgan hisob hech qachon roʻyxatga kiritilmaydi), `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` idempotency kalitlaridan foydalanadi va roʻyxatga olish muvaffaqiyatsiz tugashi yoki sotib olinganidan keyin 1 soat davomida hisobni oʻchirib qoʻyadi. Har bir sotib olish, muvaffaqiyatsizlik va quruq ishga tushirish qarori `audit_log` ga yoziladi (`action: "bankedReset.redeem"`, tokenlar yoki kredit identifikatorlari yo'q); qopqoqlar o'sha qatorlardan hisoblanadi, shuning uchun ular qayta ishga tushirilganda omon qoladilar. Muvaffaqiyatli xaridlar `provider.reset_redeemed` veb-hukni ham ishga tushiradi.

Regressiya himoyachilari: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### Seansga yaqinlik (#7274)

**Qo'llash doirasi:** bitta ulanishga biriktirilgan bitta mijoz seansi (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` sarlavhasi),** har qanday** provayder.

**Maqsad:** Ko‘p burilishli agentni (Claude Code, yordamchi, maxsus agentlar) so‘rovlar bo‘yicha bir xil hisob qaydnomasida saqlang, bu esa har bir hisob seansi holatiga ega provayderlarda o‘zaro hisob kontekstini yo‘qotish va takroriy sovuq ishga tushirish 429-larni kamaytirish imkonini beradi.

**Amalga oshirish:**

- TTL o'lchamlari: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Sarlavhani chiqarish (umumiy, har qanday provayder): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Doimiy pin jadvali: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Sozlama: `sessionAffinityTtlMs` (global TTL ms, `0` o'chiradi) — `src/lib/db/settings.ts`. Oldin sozlangan har qanday Codex TTL yangi standart sifatida olib yuruvchi `124_generic_session_affinity_ttl.sql` migratsiyasi orqali faqat Kodeks `codexSessionAffinityTtlMs` nomidan qayta nomlandi.

#7274 oldin `resolveSessionAffinityTtlMs()` `codex` tashqari har bir provayder uchun `0` ga qattiq bog'langan edi, shuning uchun TTL sozlamasi (va sessiya sarlavhalari) boshqa joyda hech qanday ta'sir ko'rsatmadi, garchi mahkamlash mexanizmi va sarlavhani chiqarish allaqachon provayder-agnostik bo'lsa ham. Tuzatish erta qaytishni olib tashladi; TTL endi global miqyosda `0` dan yuqori o'rnatilgan har bir provayder uchun bir xilda qo'llaniladi.

Uchta seansga yaqinlik sarlavhalari hech qachon yuqoriga yo'naltirilmaydi — ijrochilari mijoz sarlavhalarini o'tkazish o'rniga noldan o'zlarining yuqori oqim sarlavhalarini yaratadilar, shuning uchun bu faqat ichki korrelyatsiya identifikatori bo'lib qoladi.

### Eksklyuziv boshqariladigan seans ulanishi ijarasi

**Qo'llash doirasi:** bitta faol boshqariladigan HTTP client/session bitta mos OmniRoute ulanishiga ega.

**Maqsad:** so'rovlar bo'ylab qattiq marshrutlash panjarasiga muhtoj bo'lgan mijozlar uchun mustahkam eksklyuziv ulanish egaligini ta'minlash. Bu yumshoq uzluksizlik afzalligi boʻlgan seans yaqinligidan farq qiladi: eksklyuziv ijara SQLite hayot sikli holatini saqlab qoladi, global faol egasi va faol ulanish yagonaligini taʼminlaydi va provayder joʻnatilishidan oldin eskirgan avlodni rad etadi.

Xususiyat har bir API kalitiga kirish. Boshqariladigan kalitda `lease:exclusive` doirasi va aniq bo‘sh bo‘lmagan `allowedConnections` ro‘yxati bo‘lishi kerak. Har qanday HTTP mijozi hayot aylanishining yakuniy nuqtasidan foydalanishi mumkin; mijoz nomi, foydalanuvchi-agent, provayder, OAuth usuli yoki modeli talab qilinmaydi. Ijara modelga emas, balki ulanishga ega, shuning uchun model o‘zgarishi bog‘lanishni saqlab qoladi va ulanish odatda mos bo‘lib qoladi. Oddiy model, kvota, sog'liq, sovutish muddati va ruxsat etilgan ro'yxat qoidalari ishonchli bo'lib qoladi va bir xil avlodni boshqa bepul ulanishga o'tkazishi mumkin.

Hayotiy tsikl `acquire`, `renew` va `release` JSON amallari bilan `POST /api/v1/session-leases`. Boshqariladigan xulosa so'rovlari noaniq `X-OmniRoute-Lease-Owner` qiymatini va aniq `X-OmniRoute-Lease-Generation` taqdim etadi. Egasi `vlo_` dan keyin 43 ta base64url belgilaridan foydalanadi; faqat uning SHA-256 xeshi saqlanadi. Har bir oxirgi jo'natish panjarasi, shuningdek, autentifikatsiya qilingan API kaliti ID va faol ulanish ID bilan bog'lanadi. Ijara boshqaruvi sarlavhalari jurnallardan, saqlangan soʻrov suratlari va yuqoridagi ijrochi sarlavhalaridan olib tashlanadi.

Agar oddiy marshrutda muvofiq boshqariladigan nomzodlar bo‘lsa, lekin har bir bepul nomzod xorijiy faol ijaraga ega bo‘lsa, OmniRoute HTTP `429`, ijara sig‘imi mavjud emas kodi, sig‘imni kutish holati va eng erta tegishli muddatdan kelib chiqqan chegaralangan `Retry-After` qaytaradi. Oddiy bo'sh muvofiqlik ijara bahsi emas va uning mavjud marshrutlash xatosi semantikasini saqlab qoladi.

Tegishli mexanizmlar alohida bo'lib qoladi:

- OAuth sessiyasi bandligi OAuth hisoblari uchun jarayon-lokal yumshoq taqsimotdir.
- Hisob semaforlari soʻrovlar bilan muvofiqlik ruxsatlarini beradi va soʻrov tugashi bilan tugaydi.
- Eksklyuziv boshqariladigan seans lizinglari avlod panjarasi bilan mustahkam umrbod egalikdir.

---

## 3. Model bloklanishi

**Qo‘llanish sohasi:** provayder + ulanish + model uchligi.

**Holat bo‘yicha qo‘llanish sohasi:** bloklanish qaysi kalitga yozilishini muvaffaqiyatsiz holat belgilaydi
(`open-sse/services/accountFallback/exactModelLock.ts` ichidagi `resolveLockoutScope()`):

- `429` / `403` / `402` — kvota yoki huquq signali — **kvota oilasi**ni bloklaydi:
  codex uchun butun `codex` / `spark` sohasi (ulanishdagi barcha `gpt-5*` modellari), boshqa provayderlar uchun esa `getQuotaScopedModelForProvider()`.
- `404` yalang‘och modelni bloklaydi (`getModelLockKey()` `not_found`ni toraytiradi).
- Boshqa har qanday holat — `5xx` transport/server xatolari va OmniRoute sifatni tekshirishdan hosil qiladigan o‘zining `502` holati — faqat **aniq** provayder/ulanish/model uchligini bloklaydi. Bitta modeldagi noto‘g‘ri oqim hisob kvotasi haqida dalil bermaydi; bu qoida joriy etilishidan oldin `codex/gpt-5.6-luna`dagi bitta bo‘sh javob ushbu ulanishdagi barcha `gpt-5*` modellarini 2–30 daqiqaga (bosqichma-bosqich oshib boradigan muddat bilan) marshrutlashdan chiqarar, kvotasi esa o‘zgarishsiz qolardi.
- Chaqiruvchining aniq `scope` opsiyasi har doim ustun turadi (Antigravity `"exact"` qiymatini uzatadi).

**Maqsad:** faqat bitta model mavjud bo‘lmaganda yoki kvota bilan cheklanganda butun ulanishni o‘chirib qo‘ymaslik.

**Misollar:**

- 429 qaytaradigan har bir model uchun alohida kvotaga ega provayderlar
- Bitta mavjud bo‘lmagan model uchun 404 qaytaradigan mahalliy provayderlar
- Provayderga xos rejim/model ruxsati bilan bog‘liq xatolar (masalan, Grok rejimlari)

**Amalga oshirish:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Model sovitishlari paneli (v3.8.0)

UI: Sozlamalar → Model sovitishlari (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Faol bloklanishlarni quyidagilar bilan ko‘rsatadi: provayder, ulanish, model, sabab, tugash vaqti. Operatorlar kartadan modelni qo‘lda qayta yoqishi mumkin.

**REST API:**

- `GET /api/resilience/model-cooldowns` — faol bloklanishlarni ro‘yxatlash
- `DELETE /api/resilience/model-cooldowns` — qo‘lda qayta yoqish. Tana: `{provider, connection, model}`. Autentifikatsiya: boshqaruv.

### Sovitishlar menejeri

UI: Monitoring → Sovitishlar menejeri (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Vaqtinchalik sababga ko‘ra marshrutlashdan chiqarilgan har bir ulanish uchun alohida provayder sahifasini ochish o‘rniga bitta sahifa. Unda ulanish sovitishlari, model bloklanishlari va terminal holatlar ko‘rsatiladi, ularni ulanish bo‘yicha, tanlangan ulanishlar uchun yoki provayderning barcha ulanishlari uchun tozalash, shuningdek, eng ko‘p sozlanadigan sovitish qoidalarini — `streamStallCooldown.enabled` va OAuth / API-kalit `connectionCooldown` boshlang‘ich sovitish muddati hamda maksimal backoff bosqichlarini — tahrirlash mumkin (`PATCH /api/resilience` orqali saqlanadi). Terminal holatlar (`banned`, `expired`, `credits_exhausted`) ro‘yxatga olinadi, ammo bu yerda hech qachon tozalanmaydi.

Xuddi shu sahifadagi **Xatolarni sovitish qoidalari** kartasi operator xatolari qoidalarini (`settings.providerErrorRules`) va har bir provayder uchun umumiy standartlarni (`settings.providerErrorDefaults`) `PATCH /api/settings` orqali tahrirlaydi — ular qanday mos kelishi haqida §7 dagi “Operator e’lon qilgan qoidalar” bo‘limiga qarang. Davomiyliklar Standart (aniq sovitish muddati yo‘q), 30 daqiqa, 1 soat, 5 soat, 24 soat yoki 1–43 200 daqiqa (30 kun) oralig‘idagi maxsus qiymat bo‘lishi mumkin.

**REST API** (`src/lib/resilience/cooldownManager.ts`, autentifikatsiya: boshqaruv):

- `GET /api/resilience/cooldowns[?provider=]` — holat, qolgan sovitish muddati, backoff darajasi, so‘nggi xato turi va model bloklanishlari ko‘rsatilgan ulanishlar (maxfiy ma’lumotlarsiz)
- `POST /api/resilience/cooldowns` — tana `{connectionIds: string[]}` yoki `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}`ni qaytaradi

### Bloklanish sozlamalari UI + muvaffaqiyatga asoslangan kamayish orqali tiklanish (v3.8.23)

Model bloklanishi doim yoqilgan, kodga qattiq kiritilgan xatti-harakatdan o‘z sozlamalar kartasiga va o‘zini tiklaydigan qayta tiklanish yo‘liga ega, to‘liq sozlanadigan, ixtiyoriy funksiyaga aylandi.

**Sozlamalar kartasi:** Sozlamalar → Model bloklanishi
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Bu yuqoridagi faqat o‘qish uchun mo‘ljallangan `ModelCooldownsCard`dan **farq qiladi** (u faqat faol bloklanishlarni
_ro‘yxatlaydi_) — yangi karta _parametrlarni sozlaydi_. Standart qiymatlar `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) ichida saqlanadi:

| Sozlama                 | Standart qiymat                  | Ma’nosi                                                                      |
| ----------------------- | -------------------------------- | ---------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Asosiy almashtirgich — model bloklanishi **standart bo‘yicha o‘chiq**.       |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Model doirasidagi xato sifatida hisoblanadigan yuqori oqim holatlari.        |
| `baseCooldownMs`        | `120_000` (120 s)                | Birinchi xato uchun boshlang‘ich bloklanish davomiyligi.                     |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Oshirilgan sovitish muddatining yuqori chegarasi.                            |
| `maxBackoffSteps`       | `10`                             | Eksponensial backoff oshirish bosqichlarining maksimal soni.                 |
| `useExponentialBackoff` | `true`                           | Takroriy xatolar sovitish muddatini eksponensial ravishda oshirishi kerakmi. |

Sozlamalar odatiy sozlamalar ombori orqali saqlanadi va resilience sozlamalari sxemasi orqali tekshiriladi; karta `baseCooldownMs`/`maxCooldownMs` qiymatlarini (`maxCooldownMs ≥ baseCooldownMs` sharti bilan) hamda `maxBackoffSteps`ni chegaralaydi.

**Muvaffaqiyatga asoslangan kamayish orqali tiklanish:** tiklanish **faqat taymer tugashiga** bog‘liq emas. Sog‘lom javob modelning xatolar hisobini kamaytiradi, shuning uchun tiklangan model muddat oynasi davomida oshirishni to‘xtatadi (va bloklanishni olib tashlaydi). Muvaffaqiyatli combo nishonida `open-sse/services/combo.ts` `decayModelFailureCount()`ni
(`open-sse/services/accountFallback.ts`) chaqiradi; bu saqlangan
`failureCount`ni ikkiga bo‘ladi (`Math.floor(failureCount / 2)`); u `0`ga yetganda bloklanish yozuvi butunlay o‘chiriladi. Buning qarama-qarshi tomoni bo‘lgan `recordModelLockoutFailure()` oshirish oynasi ichidagi xatolarda hisobni oshiradi (va sovitish muddatini oshiradi). Ushbu muvaffaqiyatga asoslangan kamayish oddiy taymer tugashiga qo‘shimcha hisoblanadi — har ikkala yo‘l ham modelni qayta yoqishi mumkin.

**Holat:** bloklashlar **xotirada** saqlanadi (har bir jarayon uchun `ModelLockoutEntry` obyektlaridan iborat, `provider:connectionId:model` kaliti bo‘yicha `Map`lar, aniq qamrovli bloklashlar esa `provider:connectionId:exact:model` bo‘yicha), ma’lumotlar bazasiga saqlanmaydi — qayta ishga tushirilganda ular yo‘qoladi. _Sozlamalar_ saqlanadi; faol bloklash _holati_ esa vaqtinchalik.

## 4. Kvota-ulashishning parallelligini nazorat qilish (v3.8.36)

Obuna hisoblari (GLM, MiniMax va boshqalar) ko'pincha faqat ~ 1–3 bir vaqtda so'rovlarni qabul qiladi; buning oshib ketishi 429 soniya va sovutish vaqtini ishga tushiradi. Bu o'tkir ostida** kvota-ulush** (`qtSd/…`) kombinatsiyalar, bu erda bir nechta API kalitlari bitta yuqori oqim hisobini baham ko'radi. Uchta qatlam umumiy hisobni suv bosishidan saqlaydi.

### Har bir ulanish uchun moslik chegarasi (`max_concurrent`)

Har bir provayder ulanishi `max_concurrent` shiftini e'lon qilishi mumkin (`provider_connections.max_concurrent`, ulanish modal / API / DB da o'rnatiladi). Hech qanday cheklovsiz uni bo'sh qoldiring. Bu — ostidagi ketma-ketlashtirish qatlamini boshqaradigan yagona tugma bo'lib, uni hisobning haqiqiy parallelligiga o'rnatadi (masalan, GLM ~ 1, MiniMax ~ 2).

### Har bir model uchun mos keluvchi chegaralar (`modelConcurrency`)

Ulanish qo'shimcha ravishda o'zining `rateLimitOverrides` xaritasi ichida har bir model uchun aniq moslik shiftini e'lon qilishi mumkin:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Uni ulanish rejimiga o'rnating (** Tarif chegarasi har bir model uchun → chegaralarini bekor qiladi** , har bir satr uchun bitta `model=cap` ) yoki bir xil JSON shakliga ega `PATCH /api/providers/[id]` orqali. Asosiy semantika:

- **Ulanish bo'yicha va modelga xos:** `maxConcurrent` umumiy ulanish bo'yicha shift bo'lib qoladi. Ikkalasi ham qo'llanilganda, ikkala eshik ham bir xil kompozit eshikda (`global → provider → account → model`) atomik ravishda olinadi; samarali xatti-harakatlar qat'iyroq qo'llaniladigan chegaradir.
- **Aniq model kaliti mosligi:** kaliti — marshrutlashdan so'ng ijrochiga uzatiladigan model qatori odatda yalang'och yuqori oqim model identifikatori (`glm-5`), mijoz tomoni `provider/model` taxallus emas (`zai/glm-5` `glm-5` mos kelmaydi). Qiymatlar musbat-butun sonli bir vaqtning o'zida so'rov shiftlaridir.
- **Mahalliy navbat, topilmadi:** ortiqcha so'rovlar mavjud queue/timeout semantikasi (yozilgan `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` kirish xatolari) bilan mahalliy navbat. OmniRoute yuqori oqim siyosatini aniqlamaydi yoki xulosa qilmaydi — u operator sozlagan aniq shiftlarni amalga oshiradi. To'yingan model darvozasi hech qachon provayderni o'chirib qo'ymaydi va hech qachon doimiy model blokirovkasini yaratmaydi; upstream 429/cooldown/fallback xatti xato backstop bo'lib qoladi.
- **Har bir ulanish, har bir jarayon doirasi:** bosh harflar har bir ma'lumotlar bazasi ulanishi va xotirada saqlanadi, shuning uchun bir xil yuqori oqim API kalitini qayta ishlatadigan ikkita ulanish bir-biri bilan muvofiqlashtirilmaydi.
- **Konfiguratsiya o'zgarmagan degan ma'noni anglatadi:** xaritani o'tkazib yuborish (yoki asboblar paneli maydonini bo'sh qoldirish) hech qanday model darvozasini qo'shmaydi. Har qanday universal provayder cheklovisiz konfiguratsiyaga misol:

```text
glm-5=1
glm-4.7=3
```

### Kvota almashish soʻrovini ketma-ketlashtirish

Kvota taqsimoti musbat `max_concurrent` e'lon qiladigan ulanishni maqsad qilganda, unga bir vaqtda so'rovlar yuboriladi.** hisob** har bir ulanish semafori (kalit `qsconn:<connectionId>`) orqali ketma-ketlashtiriladi: ortiqcha so'rovlar** navbatda kuting** hisobni to'ldirish o'rniga. Bu** muvaffaqiyatsiz ochiq** — to'yingan navbat yoki vaqt tugashi jo'natilishi mumkin bo'lgan so'rovni rad etishdan ko'ra, tirqishsiz davom etadi. Kirish** Parametrlar → Moslashuvchanlik → Kvota-ulanish uchun bir vaqtning o‘zida** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, sukut bo'yicha yoqilgan). `max_concurrent` qopqog'isiz xatti-harakatlar o'zgarmaydi.

> Kvota-ulush marshrutlash eshigi (`selectQuotaShareTarget`, DRR + P2C) o'zi ishlamay qoladi va faqat bitta ulanishli hovuzga ega bo'lgan — ulanishini _deprioritizes_, u qattiq cheklay olmaydi, shuning uchun bu semafor aslida toshqinni o'z ichiga oladi.

### Kombo sovishini biladigan qayta urinib ko'ring

Har bir kombinatsiyalangan strategiya uchun (yoqilganda) SHORT vaqtinchalik sovutish uchun 429 ni kristallashtiradigan so'rov uni kutadi va 429 — ni qaytarish o'rniga qayta jo'natadi, bu Gemini-sinf TPM/RPM oynalarini (~ 60s qayta urinib ko'ring) qamrab oladi, masalan, ko'p modelli kombo va 2-tarmoqli kombinatsiyalarda. tarif chegarasi. `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) bilan chegaralangan** → Moslashuvchanlik sozlamalari** . U hech qachon `quota_exhausted` (yarim tungacha qulflangan) yoki auth/not-found sabablarini kutmaydi. `comboTimeoutMs` oʻrnatilganda, bu muddatdan oldin tuga olmaydigan kutish boshlanmaydi (#18998): kombinatsiya birdaniga `COMBO_TIMEOUT` 504 oʻrniga terminal javobi bilan javob beradi.

Kombo `config.comboCooldownWaitEnabled: false` bilan voz kechishi mumkin. Faqat literal `false` ushbu umumiy kombinatsiyalangan kutishlarni (jo'natishdan keyingi sovutish va jo'natishdan oldingi circuit-open/model-lock kutishlari) va ularning kutish-byudjet taymout-qavatini kengaytirishni o'chirib qo'yadi. Yo'qolgan yoki `true` global siyosatni saqlaydi; `true` global miqyosda o'chirilgan kutishni faollashtira olmaydi. Aniq `targetTimeoutMs` hali ham g'alaba qozonadi. Bu voz kechish alohida mahalliy-Kodexni burish-pin jo'natishdan oldin kutishni o'zgartirmaydi.

Xuddi shu darvoza jo'natishdan oldingi holatni (#16319) qamrab oladi: har qanday urinish amalga oshirilgunga qadar kombinatning har bir nishoni o'tkazib yuborilsa, uning modeli qisqa vaqtinchalik blokirovkada o'tirsa, nolga urinish yo'li bir xil shiftlar ostida qulfni kutadi va maslahatsiz `503 ALL_TARGETS_SKIPPED` javob berish o'rniga qayta jo'natadi. Kutishga ruxsat berilmaganda (shift, urinish yoki byudjet tugagan yoki xususiyat o'chirilgan), terminal javobi eng erta vaqtinchalik blokirovka muddati tugaganidan boshlab `retry_after` / `reset_at` ko'taruvchi `429 rate_limit_error` ga yangilanadi; kvota, auth va topilmagan qulflar maslahatsiz 503 ni saqlaydi.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. Navbatga qabul qilishni boshqarish (v3.8.49 · masala #6593)

**Qamrov**: har bir provayder+ulanish uchun lokal rate-limit navbati (`open-sse/services/rateLimitManager.ts`,
Bottleneck'ga asoslangan), yuqoridagi uchta mexanizmdan bir qatlam pastda.

**`maxWaitMs` navbat kutishini chegaralaydi; `executionMaxWaitMs` bajarilishni chegaralaydi.**
Ikkalasi ataylab ajratilgan va hech biri ikkinchisini oziqlantirmaydi.

`resilienceSettings.requestQueue.maxWaitMs` — bu **navbatda kutish byudjeti**: u
provayder slotini kutishni va so'ngra QUEUED holatida turishni qamrab oladi va uning taymeri
vazifa QUEUED holatidan chiqib, bajarilishni boshlagan zahoti tozalanadi
(`rateLimitManager.ts`, `wrappedFn`). Undan oshib ketgan so'rov hech qachon upstream'ga yetib bormaydi.
Standart 30000ms, `src/lib/resilience/settings.ts` faylidagi `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
tomonidan beriladi va `tests/unit/ratelimit-admission-control-6593.test.ts` bilan qotirilgan,
shuning uchun uning o'zgarishi ushbu paragrafni jimgina eskirib qolishga qoldirmasdan, o'sha testni qizil qiladi.

`resilienceSettings.requestQueue.executionMaxWaitMs` — bu Bottleneck vazifa `expiration`i sifatida
qabul qiladigan qiymat, uning taymeri faqat dispatch'dan keyin boshlanadi. Bu
o'zining upstream timeout'iga ega bo'lmagan bajaruvchilar uchun zaxira to'siq bo'lib,
agar bajaruvchining o'z fetch-start timeout'i uzunroq bo'lsa, o'sha qiymatgacha ko'tariladi,
shuning uchun u sog'lom, davom etayotgan javobni to'xtatib qo'ya olmaydi. Standart 600000ms (10 daqiqa).

Navbat byudjetini `expiration`ga oziqlantirish aynan shu narsa ilgari inkremental bo'lmagan
gateway'larni bajarilish o'rtasida o'ldirardi — ular birinchi baytlargacha qonuniy ravishda bir necha daqiqa ishlaydi —
va shuning uchun expiration `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) sifatida yuzaga chiqadi, navbat byudjeti esa
navbat-timeout kodini olib yuradi. Ikkalasini ham `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) yoki dashboard orqali boshqaring
(**Settings → Resilience**). Normalizatsiya qilinganda ikkalasi ham 1ms–24s oralig'iga cheklanadi.

**Ustuvorlik, ikkalasi uchun ham:** env o'zgaruvchisi faqat _standart_ qiymatni beradi. `resilienceSettings.requestQueue`da
saqlangan qiymat (dashboard / API patch, `key_value`da saqlanadi) undan ustun turadi, va har bir ulanish uchun
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` esa bundan ham ustun turadi. Shuning uchun
allaqachon saqlangan qiymatga ega bo'lgan deployment'da env o'zgaruvchisini o'rnatish
hech narsani o'zgartirmaydi — buning o'rniga saqlangan sozlamani tozalang yoki yangilang.

Navbatda turish `maxWaitMs` bilan chegaralanadi; quyidagi `maxQueueDepth` bir vaqtning o'zida
qancha chaqiruvchi navbatda turishi mumkinligini chegaralaydi.

**Javob tanasida ko'rsatilgan qayta urinishlar: pacing va lockout.** 429 javob tanasi o'zining kutish vaqtini
nomlashi mumkin (Gemini `RetryInfo.retryDelay`, "retry after Ns" matni), buni
`updateFromResponseBody` o'qiydi. Ulanishning `maxWaitMs`iga mos keladigan kutish — bu pacing: limiter
o'sha vaqt davomida o'z rezervuarini bo'shatadi va navbatdagi chaqiruvlar u qayta to'lganda dispatch qilinadi.
`maxWaitMs`dan uzunroq kutish esa navbat o'tirib kuta olmaydigan narsadir — Gemini tugagan kunlik kvotaga
`retryDelay: "86399s"` bilan javob qaytaradi. Qayta qurilgan 429'dagi uzatilgan `Retry-After` (#16528)
allaqachon fallback dvigatelining modelni o'sha oyna uchun bloklashiga olib keladi, ammo limiterni ham
shu sababdan pauza qilish kalitga erta yetib kelgan har qanday chaqiruvni (masalan, resilience reset'dan keyin)
butun `maxWaitMs` davomida to'xtatib qo'yar edi. Bunday kutish tiplashtirilgan Google `RetryInfo`
detalidan (`google_rpc_retry_info` kelib chiqishi) kelib chiqqanda va kalitning limiteri allaqachon modelga
chegaralangan bo'lsa (qarang `getLimiterKey`), 429 o'sha ulanishda model lockout'iga aylanadi
(`open-sse/services/rateLimitManager/bodyRetryPause.ts` faylidagi `lockModelForLongBodyRetry`, maksimal 24 soat),
va limiter pauza qilinmagan holda qoldiriladi. Akkaunt tanlash bu lock'ni `isModelLocked()` orqali o'tkazib yuboradi,
ulanishga bog'langan maqsadlar uchun combo pre-dispatch gate ham shunday qiladi. Antigravity'da, uning limiteri
har bir kvota oilasi uchun bo'lsa, lock uning boshqa kvota lock'lari kabi aniq modelga qo'yiladi. Alias uni o'sha modelga
hal qilgan bo'lsa, mijoz so'ragan nom ham lock qilinadi, chunki bu tekshiruvlar so'ralgan nomdan foydalanadi;
u aniq (`lockExactModel`) lock qilinadi, shuning uchun antigravity kvota oilasini yoki codex qamrovini kesib o'tuvchi
alias hech qachon o'zini lock qilmaydi. Proza ko'rinishidagi ishora, tiplashtirilmagan `retryDelay` yoki butun ulanish
tomonidan bo'lishilgan limiter pauzani saqlab qoladi. 429 yo'li hozirgina qayta qurgan limiter haqiqatan pauza qilsa,
qolgan navbat vaqti pauza tugashidan oldin tamom bo'ladigan chaqiruv o'sha vaqtni kutmasdan, darhol
navbat-timeout kodi bilan qaytariladi (`checkLimiterPause`); qayd etilgan tugash limiter qurilishidan oldin,
Bottleneck o'zining yangilash soatini boshlaydigan joyda bog'lanadi va rezervuarga keyingi har qanday o'zgarish uni unutadi.
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` va
`tests/unit/rate-limit-body-retry-pause.test.ts` bilan qamrab olingan.

**`maxQueueDepth` — ixtiyoriy qabul qilish chegarasi (yangi).** `resilienceSettings.requestQueue.maxQueueDepth`
bir vaqtning o'zida bitta provayder+ulanish uchun qancha so'rov navbatda (hali dispatch qilinmagan) turishi mumkinligini chegaralaydi.
Navbat allaqachon `maxQueueDepth` so'rovni ushlab turganda, yangi so'rov `limiter.schedule()`ga yetib borishidan **oldin**
tiplashtirilgan `code: "RATE_LIMIT_QUEUE_FULL"` xatosi bilan tez rad etiladi
— shuning uchun rad etish arzon bo'lib, o'sha so'rov uchun har qanday quyi oqimdagi
prompt-compression / tarjima ishlaridan oldin sodir bo'ladi. Standart `0` =
o'chirilgan, mavjud chegaralanmagan navbat xatti-harakatini saqlab qoladi; chegaralangan 0–100000.
`RATE_LIMIT_MAX_QUEUE_DEPTH` (env) yoki
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch) orqali boshqaring.

Qabul qilish tekshiruvining o'zi sof funksiya
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), shuning uchun uni haqiqiy Bottleneck limiter'isiz
unit-test qilish mumkin.

> #6593 ni ochgan RFC shuningdek `bypassCompressionOnRateLimit`
> bayrog'ini ham taklif qilgan edi. Bu repodagi `open-sse/services/compression/`
> pipeline'i chiquvchi LLM so'rovida prompt/kontekst siqilishi (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy` bloki atrofida),
> sintez qilingan 429 tanalarida HTTP javob siqilishi emas — so'zma-so'z
> bypass bayrog'i uchun mos keladigan kod yo'li mavjud emas. Bu prompt siqish
> qadami hozirda so'rov pipeline'ida `withRateLimit()` dan _oldin_ ishlaydi,
> shuning uchun navbat to'lgan holda rad etilganda uni o'tkazib yuborish uchun
> qayta tartibga solish — bu issue doirasidan tashqaridagi alohida, kattaroq
> o'zgarishdir; u ataylab bu yerda **amalga oshirilmadi** va CPU tejash foydasi
> qayta tartibga solish xavfiga arziydigan bo'lsa, keyingi ish sifatida
> qoldirildi.

### Rate-limit avtomatik yoqish xavfsizlik tarmog'i va ulanish himoyasi (`rateLimitProtection`)

**Avtomatik yoqish xavfsizlik tarmog'i** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, standart `true`):
Standart holatda OmniRoute barcha faol API-kalit provayder ulanishlari uchun rate-limit navbat himoyasini avtomatik ravishda yoqadi (`getProviderCategory(provider) === "apikey"`). Bu so'rov tezligiga sezgir yuqori oqim API kalitlariga kiruvchi so'rovlar yuqori oqim 429 xatolariga o'z-o'zidan portlash o'rniga Bottleneck orqali navbatga qo'yilishi va cheklanishini ta'minlaydi. Xavfsizlik tarmog'ini `RATE_LIMIT_AUTO_ENABLE` muhit o'zgaruvchisi orqali bekor qilish mumkin (`false`/`0`/`off` o'chiradi, `true`/`1`/`on` majburiy yoqadi), bu esa saqlangan dashboard sozlamasidan ustun turadi (**Sozlamalar → Chidamlilik** / `PATCH /api/resilience`).

**Har bir ulanish uchun `rateLimitProtection` semantikasi:**
Har bir ulanish uchun rate-limit himoyasi provayder ulanishlaridagi `rateLimitProtection` boolean maydoni orqali kuzatiladi (SQLite'da `rate_limit_protection` sifatida saqlanadi):

- **Aniq yoqilgan (`rateLimitProtection === true`)**: Ushbu ulanish uchun rate-limit himoyasi provayder toifasidan yoki avtomatik yoqish xavfsizlik tarmog'i yoqilgan-yoqmaganidan qat'i nazar, aniq yoqilgan.
- **Aniq o'chirilgan (`rateLimitProtection === false`)**: Aniq himoyani o'chiradi, lekin faol API-kalit ulanishini global avtomatik yoqish xavfsizlik tarmog'idan **chiqarmaydi**. `reconcileEnabledConnections` da (`open-sse/services/rateLimitManager.ts`) `false` va `undefined` teng: faqat `rateLimitProtection === true` aniq bekor qilish (override) sifatida qabul qilinadi. Agar `rateLimitProtection` `false` bo'lsa (yoki o'rnatilmagan bo'lsa), faol API-kalit ulanishi hali ham avtomatik yoqish shartiga mos keladi va rate-limit himoyasida qolaveradi.
- **Har bir ulanish uchun alohida chiqish imkoniyati yo'q**: Operator hozirda boshqalar uchun avtomatik yoqishni faol saqlagan holda "ushbu yagona faol API-kalit ulanishi rate-limit navbat himoyasisiz ishlashi kerak" degan holatni ifodalay olmaydi. API-kalit ulanishlarini rate-limit navbatlarisiz to'liq ishlatish uchun xavfsizlik tarmog'i global ravishda o'chirilishi kerak (`RATE_LIMIT_AUTO_ENABLE=false` yoki `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Qo'llab-quvvatlanadigan yozish yo'llari:**

- **`POST /api/rate-limits`**: Ulanish uchun `rateLimitProtection` ni almashtirishning qo'llab-quvvatlanadigan boshqaruv yozish yo'li (`{ connectionId: string, enabled: boolean }`). Buni `enabled: true` bilan chaqirish aniq himoyani yoqadi; `enabled: false` bilan chaqirish esa aniq himoyani olib tashlaydi (garchi avtomatik yoqish yoqilgan bo'lsa, faol API-kalit ulanishlari global xavfsizlik tarmog'i ostida qolsa-da).
- **`PUT /api/providers/[id]`**: Ataylab `rateLimitProtection` ni qabul qilmaydi va o'zgartirmaydi (#11278). `PUT /api/providers/[id]` orqali provayder ulanishi metama'lumotlarini yangilash hech qachon saqlangan rate-limit himoyasi holatini o'zgartirmaydi.

---

## 6. Sekin oqim o'tkazuvchanligi kuzatuvchisi (#9709)

Ixtiyoriy `resilienceSettings.streamRecovery.throughputWatchdog` himoyasi yuqori oqimni aniqlaydi, u hali ham bo‘laklarni jo‘natadi, lekin sozlangan foydali chiqish tezligidan pastroq yordamchi mahsulot chiqaradi. U bo'sh vaqtdan ataylab farq qiladi: yurak urishi va metadata na taymerni tiklamaydi va na progress deb hisoblanmaydi. Bu, shuningdek, qattiq urinish muddatidan (#9153) ajralib turadi, bu chiqish sifatiga qaramasdan mutlaq xavfsizlik shiftini saqlab qoladi.

Qo'riqchi to'xtatilishidan oldin isinish davrini, so'ngra to'liq aylanma oynani talab qiladi. U Chatni yakunlash va javoblarni API chiqish hodisalari (konservativ UTF-8 bayt proksi-server) dan matn deltalarini hisoblaydi, faqat foydalanish va bo'sh hodisalarni e'tiborsiz qoldiradi va vosita chaqiruvi yoki mulohaza yuritish hodisalari parvoz paytida hukmni to'xtatadi. U sukut bo'yicha o'chirib qo'yilgan va `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` bilan yoqilishi mumkin (bu env qiymati faqat birlamchi — saqlangan `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean yutadi; ushbu qo'llanmaning yuqori qismidagi env-vs-dashboard ustunlik eslatmasiga qarang); oyna, isinish, minimal tezlik va minimal o'lchash mumkin bo'lgan chiqish normal moslashuvchanlik-sozlamalarni normallashtirish qatlami bilan chegaralanadi.

Yoqilganda, kuzatuvni bekor qilish faqat faol yuqori oqimga urinish uchun qo'llaniladi. Mijoz tomonidan ko'rinadigan baytlardan oldin, mavjud bir xil hisobni erta tiklash yo'li urinishni qayta ochishi mumkin. Amalga oshirilgandan so'ng, oqim hech qachon ko'r-ko'rona takrorlanmaydi; faqat mavjud xavfsiz mid-stream davom shartnoma qo'shimchasini tikish mumkin. Yakunlash bir martalik bo'lib qoladi, shuning uchun foydalanish hisobi va semaforni chiqarish takrorlanmaydi.

---

## 7. Upstream holatini qayta belgilash (noto‘g‘ri ko‘rsatilgan kvota xatolari)

**Qo‘llanish doirasi:** vaqtinchalik kvota tugaganini noto‘g‘ri HTTP holati bilan bildiradigan bitta upstream gateway.

**Maqsad:** tasniflashdan OLDIN chalg‘ituvchi holatni tuzatish, shunda quyi oqim iste’molchilari (fallback engine, combo aggregation, client-facing response) xatoning qayta urinish mumkin bo‘lgan haqiqiy xususiyatini ko‘radi.

Ba’zi gateway’lar VAQTINCHALIK kvota tugaganini qayta urinish mumkin bo‘lmagan HTTP
holati bilan bildiradi. `agentrouter.org` standart `429` o‘rniga xitoycha matn
(`用户额度不足` / `额度不足`) bilan `403` (ba’zan `400`) qaytaradi. Claude
Code kabi mijozlar `403` ni doimiy xato deb hisoblab, sessiyani to‘xtatadi va tuzatishsiz
fallback engine uni kvota hodisasi o‘rniga `AUTH_ERROR` sifatida tasniflaydi.

**Amalga oshirish:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — har bir provider uchun qoidalar ro‘yxati (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), `applyStatusRestatement()` orqali moslashtiriladi.
- Chaqiruv nuqtasi: `open-sse/handlers/chatCore.ts` dagi `providerFailure:` bloki
  (taxminan 3654-qator), `parseUpstreamError()` upstream javobini xato HTTP holati bilan (`!providerResponse.ok`) tahlil qilganidan so‘ng darhol va har qanday tasniflash ishga tushishidan oldin joylashgan; shu sababli barcha quyi oqim iste’molchilari tuzatilgan holatni ko‘radi. `200` SSE oqimiga joylashtirilgan xatolar alohida, keyinroq amalga oshiriladigan oqim tahlili yo‘lidan o‘tadi va bugun ushbu hook qamroviga kirmaydi — bu ma’lum cheklov bo‘lib, agentrouter’ning xato holati bilan yuzaga chiqadigan noto‘g‘ri statusi uchun hozircha talab etilmaydi.
- Qayta urinishga yaroqlilik: `429` `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`) tarkibida mavjud, shuning uchun qayta belgilangan xato ishlamaydigan `403` sifatida yuzaga chiqish o‘rniga haqiqiy qayta urinish oynasini olib yuradi.
- Sintetik `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  faqat qayta belgilangan javob **mijozga** bildiradigan qiymatdir; u ulanishning ichki cooldown/lockout davomiyligi emas — bu alohida ravishda qayta belgilangan xatoni amalda boshqaradigan mexanizmga bog‘liq (Connection Cooldown’ning bosqichma-bosqich backoff’i, §2, API-key provider’lari uchun bazaviy `3s`; yoki agentrouter kabi har bir model kvotasi bo‘yicha provider’lar uchun Model Lockout, §3). Router ichki qayta urinishga mijozga e’lon qilgan 60 soniyalik oynadan oldinroq tayyor bo‘lishi mumkin — bu qasddan qoldirilgan zaxira vaqt, xato emas.

Doimiy xatolar (`agentrouter`ning `无权访问模型` — bu modelga kirish huquqi yo‘q) HECH
QACHON qayta belgilanmaydi: `excludeMarkers` `textMarkers` mos kelgan taqdirda ham qoidani bekor qiladi, shuning uchun xato o‘zining dastlabki holatini saqlab qoladi va hech narsa cheksiz qayta urinmaydi. Mos provider tasniflash qoidasi
(`open-sse/config/providerErrorRules.ts` dagi `agentrouter-model-access-denied`:
`reason: "auth_error"`, `scope: "model"`, e’lon qilingan bazaviy cooldown `6h`) `checkFallbackError` (`open-sse/services/accountFallback.ts`) tomonidan umumiy apikey-kategoriyadagi `FORBIDDEN` erta qaytarilishidan _oldin_, `honorsRuleLockScope(provider)` (#10334 — hozirda `providerErrorRules.ts` ichidagi `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist’i orqali faqat agentrouter’ga xos) sharti asosida tekshiriladi. Qoidada e’lon qilingan 6 soatlik cooldown `fallbackResult.baseCooldownMs` orqali uzatiladi, ammo u baribir avvaldan mavjud bo‘lgan har bir model kvotasi uchun lockout yo‘liga (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`) yuboriladi (#10334 bu yo‘lni cooldown manbasidan tashqari o‘zgartirmaydi): u operatorning `mlSettings.maxCooldownMs` qiymatigacha (standart `1_800_000ms` / 30 daqiqa) qisqartiriladi, boshqa barcha model lockout’lari kabi, va _saqlanadigan lockout sababi_ qoidaning `"auth_error"` qiymati emas, avvaldan qattiq kodlangan `"forbidden"` bo‘lib qoladi — boshidan oxirigacha faqat cooldown davomiyligi hisobga olinadi, sabab satri emas. Ulanishning o‘zi faol qoladi; ayni ulanishdagi qo‘shni modellar bundan ta’sirlanmaydi.

Qayta belgilangan kvota xatolari (`额度不足`) production muhitida provider qoidasiga yetib boradi
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, o‘ziga tegishli e’lon qilingan cooldown mavjud emas — persistence layer’ning masshtablangan backoff standarti qo‘llanadi). #10334 dan beri `ProviderErrorRuleMatch` dagi `scope` boshidan oxirigacha ISHLATILADI, ammo **faqat** `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist’iga kiritilgan provider’lar uchun (`providerErrorRules.ts` — bugungi kunda faqat `"agentrouter"`, `honorsRuleLockScope()` orqali boshqariladi). Boshqa har qanday provider uchun `scope` #10334 dan avvalgidek axborot xarakterida qoladi.
`checkFallbackError` mos kelgan qoidaning scope qiymatini `fallbackResult.ruleScope` sifatida taqdim etadi; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) — `ruleScope` qiymatini ulanish bo‘yicha, o‘zini o‘zi tiklaydigan signal sifatida qo‘llash haqiqatan xavfsiz ekanini tasdiqlovchi umumiy himoya tekshiruvi (scope `"connection"`, reason `quota_exhausted`, hech qachon `permanent` emas, hech qachon `creditsExhausted` emas — bu kelajakdagi qoidada scope `"connection"` doimiy account holati bilan juftlanishidan himoya qiladi). Undan ikki iste’molchi foydalanadi:

- **Saqlash** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provider **har bir model uchun** bloklash tarmog‘iga tushish o‘rniga (agentrouter’da `passthroughModels: true` → `hasPerModelQuota()` `true` qaytaradi), **vaqtinchalik ulanish sovish davri**ni qo‘llaydi —
  `testStatus: "unavailable"` + `rateLimitedUntil`, hech qachon terminal holat emas
  (`credits_exhausted`/`banned`/`expired`) — shuning uchun ulanish sovish davri tugagach, hisob ma’lumotlarini qo‘lda tiklashni talab qilmasdan o‘z-o‘zidan tiklanadi.
  `disableCooling: true` bo‘lgan ulanishlar uchun o‘tkazib yuboriladi (#2997): bu istisno per-model bloklashga o‘tadi (hujjatlashtirilgan murosa — tarmoq ustidagi kod izohiga qarang).
- **Bir xil so‘rovdagi combo marshrutlash** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): xuddi shu himoya ulanishni xotiradagi `exhaustedConnections` to‘plamiga `${provider}:${connectionId}` kaliti bilan belgilaydi. Bu faqat o‘z target obyektida aynan shu `connectionId` ko‘rsatilgan, qolgan SAME-REQUEST targetni o‘tkazib yuboradi (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `exhaustedConnections` qidiruvidan oldingi `if (provider &&
connectionId)`) — oddiy model-ro‘yxat combo’sida qo‘shni targetlarda o‘ziga biriktirilgan `connectionId` bo‘lmaydi va ulanish har bir dispatch uchun javobdagi `X-OmniRoute-Selected-Connection-Id` headeridan yechiladi, shuning uchun bu kalit mosligi hech qachon yuz bermaydi. Bunday keng tarqalgan holatda qolgan qadamning hozirgina tugatilgan hisobni qayta ishlatishiga qarshi haqiqiy himoya bu Set emas — yuqoridagi saqlash qatlami (`rateLimitedUntil` endi kelajakdagi vaqtga o‘rnatilgan) hamda shu himoyaning xato uchun `transientRateLimitedProviders`ni bostirishi ( `targetExhaustion.ts` dagi `isAgentrouterConnectionQuotaScope` tarmog‘iga berilgan kod izohidagi “Two-stage design” bo‘limiga qarang): Set belgilanmagan holda qolsa, `combo.ts` dagi `allowRateLimitedConnection` majburiy ruxsati (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) provayderning qolgan qadamlariga ishga tushmaydi, shuning uchun credential tanlashdagi `rateLimitedUntil` filtri (`src/sse/services/auth.ts:1238`) odatdagidek hisobga olinadi va qolgan qadam boshqa, hali ham yaroqli agentrouter ulanishini tanlaydi yoki mavjud credentiallar bo‘lmagani sababli muvaffaqiyatsiz tugaydi — u bu tarmoq hozirgina sovitgan ulanishga majburan qaytmaydi.

### Ikki bosqichli dizayn: statusni qayta ifodalash, keyin tasniflash

Statusni qayta ifodalash (`upstreamStatusRestatement.ts`) va provayderni tasniflash qoidalari (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) provayder identifikatori va matn markerlari asosida ishlaydigan alohida registrlardir, biroq ular turli joylarda bajariladi va turli maqsadlarga xizmat qiladi: qayta ifodalash `chatCore.ts`da HTTP statusini erta qayta yozadi;
tasniflash qoidalari esa `checkFallbackError()` ichida zaxira `reason`ni tanlaydi va `scope`ni
(`model` / `provider` / `connection`) belgilaydi (`open-sse/services/accountFallback.ts`).

Tasniflash qoidalari faqat `providerErrorRules.ts`dagi `FULL_TEXT_RULE_PROVIDERS` ruxsat etilgan ro‘yxatida ko‘rsatilgan provayderlar uchun to‘liq xato **matnini** ko‘radi (`额度不足` kabi body markerlarini moslashtirish uchun kerak) — hozircha faqat `"agentrouter"`. Boshqa barcha **o‘rnatilgan katalog** provayderlari uchun `checkFallbackError` `getProviderErrorRuleMatch`ga faqat strukturalangan xatoni (`{code, type}`) uzatadi; bu header/status/code asosidagi qoidalar uchun yetarli, biroq body matnidagi markerlarni ko‘rmaydi.
`resolveRuleMatchBody()` yordamchisi shu tanlovni amalga oshiradi: ruxsat etilgan provayderlar uchun to‘liq xato matni, aks holda strukturalangan xato. **O‘rnatilgan** provayderni `FULL_TEXT_RULE_PROVIDERS`ga qo‘shish provayder bo‘yicha aniq yoqish hisoblanadi — bu ro‘yxatda bo‘lmagan har bir provayder uchun standart yo‘l baytma-bayt o‘zgarmasligini ta’minlash uchun mavjud.

Qoidaning `scope`i (`model` / `provider` / `connection`) `FULL_TEXT_RULE_PROVIDERS`dan alohida yoqiladigan imkoniyatdir: `checkFallbackError` uni faqat `fallbackResult.ruleScope` sifatida ko‘rsatadi, quyi darajadagi iste’molchilar esa uni bir xil fayldagi `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ruxsat etilgan ro‘yxatida ko‘rsatilgan provayderlar uchungina axborot yorlig‘idan boshqa narsa sifatida hisobga oladi (`honorsRuleLockScope()` orqali nazorat qilinadi — hozircha faqat `"agentrouter"`). Provayder ushbu ruxsat etilgan ro‘yxatda bo‘lgach, `scope: "connection"` mosligi amalda nima qilishini yuqoridagi “Restated quota
errors” bo‘limidan ko‘ring.

**#11104 — operator e’lon qilgan qoidalar ikkala ruxsat etilgan ro‘yxatni ham chetlab o‘tadi.** Operator faylni tahrirlamasdan, `settings.providerErrorRules` orqali ish vaqtida provayder bo‘yicha qoida e’lon qilishi mumkin (`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`). Operator qoidasini `FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` orqali cheklash — o‘rnatilgan katalog qoidalarining **standart** xatti-harakatini himoyalash uchun mo‘ljallangan ruxsat etilgan ro‘yxatlar — sozlamalar mexanizmini ushbu ro‘yxatlarda allaqachon mavjud bo‘lgan provayderlardan tashqari barcha provayderlar uchun ishlamas holga keltirgan bo‘lardi, chunki qoidani e’lon qilishning o‘zi operatorning aniq roziligidir. `resolveRuleMatchBody()` va `honorsRuleLockScope()` avval `hasOperatorRuleForProvider()`ni tekshiradi: operator qoidasi mavjud bo‘lgan provayder xom xato matnini oladi va e’lon qilingan `scope`ini, ikkala ruxsat etilgan ro‘yxatning birortasida bo‘lish-bo‘lmasligidan qat’i nazar, hisobga oldiradi.

**Operator e’lon qilgan qoidalar** (`OperatorProviderErrorRule`): har bir qoidada ixtiyoriy `status` va ixtiyoriy `match` mavjud (`match` xato matnidagi oddiy, katta-kichik harflarga sezgir bo‘lmagan qism satridir, hech qachon RegExp emas, shuning uchun ReDoSga sabab bo‘la olmaydi) va ulardan kamida bittasi o‘rnatilishi shart. Ikkalasi ham o‘rnatilgan bo‘lsa, ular AND sharti bilan bog‘lanadi; o‘tkazib yuborilgan maydon istalgan qiymatga mos keladi, shuning uchun `{match: "insufficient_quota"}` ushbu kodni o‘z ichiga olgan istalgan statusga mos keladi. Birinchi mos kelgan qoida g‘olib bo‘ladi. `cooldownMs` ko‘pi bilan 30 kungacha qabul qilinadi; jami qoidalar soni 50 tadan oshmaydi.

**Barcha holatlar uchun standart sozlamalar** (`settings.providerErrorDefaults`, ixtiyoriy, `setOperatorProviderErrorDefaults` orqali o‘rnatiladi): `{[provider]: {cooldownMs, scope?, reason?}}`
`cooldownMs` qiymati 1 daqiqadan 30 kungacha bo‘lishi mumkin. Standart sozlama faqat operator qoidasi ham, ichki katalog qoidasi ham mos kelmaganda va faqat 402, 403, 408, 429 hamda 5xx xatolariga nisbatan qo‘llanadi. So‘rov shakliga oid xatolar (400, 404, 409, 413, 422) va alohida kelgan 401 xatolari o‘zlarining amaldagi qayta ishlanish usulini saqlab qoladi. Aniq `reason` ko‘rsatilmagan bo‘lsa, sabab statusdan olinadi — `classifyError` qanday ishlasa, xuddi shunday. Standart sozlamani e’lon qilish `hasOperatorRuleForProvider()` uchun operator qoidasi hisoblanadi, shuning uchun uning `scope` qiymati (standart qiymat `"connection"`) inobatga olinadi. Standart sozlamaning amaldagi kutish muddati uning `cooldownMs` qiymati va provayderning o‘z qayta urinish ko‘rsatmasidan (`Retry-After`, `x-ratelimit-reset` yoki tanadagi reset ko‘rsatmasi; ulanishni kutish sozlamasida "use upstream retry hints" yoqilganda dvigatel aynan shu ko‘rsatmani inobatga oladi) kattarog‘i bo‘ladi. Shu sababli standart sozlama qisqa upstream ko‘rsatmasini uzaytirishi mumkin, ammo haqiqiy reset muddatini hech qachon qisqartirmaydi. Aniq operator qoidasi o‘zining belgilangan `cooldownMs` qiymatini saqlaydi. Na qoida, na standart sozlama `markAccountUnavailable` ichidagi ulanishni kutish himoyalarini chetlab o‘tadi: faol va uzoqroq kutish muddati hech qachon qisqartirilmaydi, terminal status esa hech qachon ustidan yozilmaydi. `checkFallbackError` ichida oldinroq ishlaydigan ichki matn aniqlagichlar (kreditlar tugagan, kunlik kvota, akkaunt faolsizlantirilgan) o‘zlariga tegishli iboralar uchun hamon ustuvor hisoblanadi.

**Ma’lum bo‘shliq — `providerRuleRegistry` HTTP 400 uchun hech qachon tekshirilmaydi.**
`checkFallbackError` funksiyasining `BAD_REQUEST` tarmog‘i 400 statusini to‘liq o‘zining pattern massivlari (`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` va boshqalar `accountFallback.ts` ichida) orqali tasniflaydi va yuqoridagi `configuredRule`/`getProviderErrorRuleMatch` tarmog‘iga yetib bormasdan qaytadi. `status: 400` bo‘lgan ichki katalog qoidasi (yoki operator qoidasi) sintaktik jihatdan to‘g‘ri bo‘lsa-da, hech qachon ishga tushmaydi. Hozircha mavjud qoidalarning hech biri 400 ni nishonga olmaydi, shuning uchun ishlab chiqarishdagi hech narsa ta’sirlanmaydi — ammo kelajakdagi 400 qoidasi uchun avval shu tarmoqni o‘zgartirish kerak bo‘ladi. Bu qoida qo‘shishdan ko‘ra kattaroq o‘zgarishdir, chunki u pattern-massiv xatti-harakatiga allaqachon tayanayotgan har bir provayder uchun 400 tasnifini qayta belgilaydi va bitta provayderga qoida qo‘shish doirasiga kirmaydi.

### Kvotani noto‘g‘ri ko‘rsatuvchi yangi gateway qo‘shish

1. `statusRestatementRegistry` ichida bitta qoida massivini ro‘yxatdan o‘tkazing
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers` qiymatlarini provayderga xos saqlang; `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`) bilan to‘qnashadigan umumiy inglizcha iboralarni hech qachon qayta ishlatmang.
2. To‘g‘ri bloklash doirasini tanlash uchun `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) ichida tasniflash qoidalarini ixtiyoriy ravishda ro‘yxatdan o‘tkazing (`connection` — akkaunt miqyosidagi kvota uchun, `model` — modelga xos xatolar uchun). Bu qadam ishlab chiqarishda faqat qoidalari to‘liq xato matniga (body markerlariga) muhtoj bo‘lgan provayderlar uchun amal qiladi: shu fayldagi `FULL_TEXT_RULE_PROVIDERS` ga provayder identifikatorini qo‘shing — aks holda `checkFallbackError` qoidaga faqat tuzilgan `{code, type}` xatosini uzatadi va body matniga asoslangan qoida haqiqiy trafikda hech qachon mos kelmaydi.
   Faqat `status`/`headers` asosida mos keladigan qoidalar (masalan, Opencode yoki Minimax qoidalari) uchun bu ixtiyoriy ruxsat kerak emas. Bundan tashqari, agar qoida `scope: "connection"` ni e’lon qilsa va maqsad haqiqiy ulanish miqyosidagi kutish muddati hamda ayni so‘rovdagi kombinatsiyali o‘tkazib yuborish bo‘lsa (shunchaki ma’lumot yorlig‘i emas), shu fayldagi `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ga provayder identifikatorini qo‘shing — aynan shu narsa `markAccountUnavailable()` (`src/sse/services/auth.ts`) ichidagi `isAgentrouterConnectionQuotaScope()` uslubidagi iste’molni va `applyComboTargetExhaustion()` (`open-sse/services/combo/targetExhaustion.ts`) ni boshqaradi; busiz `scope` baribir `fallbackResult.ruleScope` orqali uzatiladi, ammo undan hech narsa foydalanmaydi.
3. `tests/unit/upstream-status-restatement.test.ts` va `tests/unit/agentrouter-error-rules.test.ts` dagi testlarga o‘xshash unit testlar qo‘shing (jumladan, not-permanent / not-creditsExhausted himoyalari va — agar provayderga allowlist kerak bo‘lsa — `resolveRuleMatchBody()` faqat shu provayder uchun to‘liq matn qaytarishini tasdiqlovchi test).

`chatCore.ts`, `classifyError` yoki combo uchun hech qanday o‘zgarish kerak emas.

#### Chiqish bucketlariga bo‘lingan bloklash (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` dagi provayderlar (opencode oilasi) IP-bucketlangan upstream sifatida ko‘riladi (opencode bepul tarifi akkaunt bo‘yicha emas, IP bo‘yicha bucketlanadi — #9611 ga qarang): 429 statusi `quota_exhausted` **yoki** `rate_limit_exceeded` sifatida tasniflanganda, rotatsiya ularni sinab ko‘rishidan oldin oxirgi ma’lum chiqish IP manzili ishlamay qolgan ulanish IP manziliga mos keladigan allowlistdagi oilaga mansub barcha ulanishlar kutish holatiga o‘tkaziladi
— bu N-1 ta muvaffaqiyatsiz bo‘lishi aniq upstream chaqiruvlarining oldini oladi (#10460/#10525 bilan bir xil ko‘rinish). `rate_limit_exceeded` ataylab kiritilgan: `markAccountUnavailable` yo‘lida opencode’ga xos qoidalar hech qachon mos kelmaydi (`checkFallbackError` ga header/body uzatilmaydi, opencode `FULL_TEXT_RULE_PROVIDERS` ro‘yxatida yo‘q), shuning uchun tanasida obuna kvotasi matni ("monthly usage limit reached") bo‘lgan 429 `status_429` qoidasiga yetib borishdan oldin kvota matniga asoslangan fallback (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 soatlik kutish) orqali `quota_exhausted` sifatida tasniflanadi — kvota matni bo‘lmagan 429 (oddiy rate limiting) esa `status_429` qoidasi orqali `rate_limit_exceeded` sifatida tasniflanadi va IP oilasini baribir kutish holatiga o‘tkazadi. Allowlistdagi provayder uchun IP-bucketlangan rate limit tugagan kvota bilan bir xil signal hisoblanadi. Haqiqiy cheklovlar:

- **Eng yaxshi harakat**: lock ulanishning oxirgi ma’lum `egress_ip` qiymatini
  `proxy_logs` dan (24 soatlik oyna, sinxron, keshsiz) aniqlaydi. Sovuq kesh
  (egress IP hech qachon tekshirilmagan) yoki qator mavjud bo‘lmasa → xato bergan
  ulanish baribir branch orqali sovitiladi (bugungidek qayd etiladi), faqat
  qo‘shni ulanishlarning hech biri lock qilinmaydi.
- **Hech qachon terminal holatga o‘tmaydi**: sovitish yangilanadigan kvota oynasi
  (`testStatus: "unavailable"`) hisoblanadi; doimiy holat hech qachon IP
  darajasidagi signal asosida hosil qilinmaydi. `disableCooling` ulanishlari
  branch’ni butunlay o‘tkazib yuboradi.
- **Ruxsat berilgan oila uchun lock granulyarligi o‘zgaradi**: bu faqat qo‘shni
  ulanishlarni optimallashtirish emas, balki qamrov o‘zgarishidir. opencode
  `passthroughModels` provider’i bo‘lgani sababli, bu branch’dan oldin 429 har bir
  MODEL uchun lockout hosil qilardi; endi esa u ulanishni sovitadi — hatto
  qo‘shni ulanishlari umuman mavjud bo‘lmagan yagona ulanishni ishga tushirgan
  operator uchun ham. Bu opencode qoidasidagi jadval allaqachon to‘g‘ri deb
  e’lon qilgan granulyarlikdir (`scope: "connection"`,
  `providerErrorRules.ts`); bunga qadar u hech qachon amal qilinmagan, chunki
  opencode `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ichida yo‘q. Branch xato bergan
  ulanishning sovitish holati va `backoffLevel` qiymatini connection-scoped
  agentrouter branch’iga taqlid qilgan holda o‘zi yozadi va qaytadi — har bir
  model uchun block hamda quyidagi umumiy yo‘lga hech qachon yetib borilmaydi.
- **Combo ham qamrab olingan**: agentrouter branch’iga o‘xshab, qamrov combo
  chaqiruvchisi 429 uchun qo‘llaydigan
  `persistUnavailableState`/`isCombo` pasaytirishini ataylab e’tiborsiz qoldiradi.
  Har bir model uchun lockout bu qamrovning kuchsizroq shakli emas, balki noto‘g‘ri
  birlikdir: u tugagan IP haqida hech narsa demaydi, shuning uchun combo
  rotatsiyasi har bir qo‘shni ulanish uchun albatta muvaffaqiyatsiz bo‘ladigan
  bittadan chaqiruvni bajarishda davom etadi.
- **Qo‘shni ulanishlar xavfsizligi**: allaqachon terminal holatda
  (banned/credits_exhausted) bo‘lgan yoki allaqachon uzoqroq sovitish davrida
  turgan qo‘shni ulanishning holati hech qachon ustiga yozilmaydi.
- **Faqat ruxsat berilganlar ro‘yxati**: `EGRESS_BUCKETED_LOCK_PROVIDERS` ni
  kengaytirish owner’ning aniq qaroridir; umumiy ulash mavjud emas
  (pattern #10334/#10419). Qo‘shni ulanishlar so‘rovi o‘sha ruxsat berilganlar
  ro‘yxatini SQL literal sifatida takrorlash o‘rniga unga bog‘lanadi, shuning
  uchun uni kengaytirish bir qatorli o‘zgarish bo‘lib qoladi.
- **Egress IP rotatsiyasi, har ikki yo‘nalishda**: qidiruv oynasi (24 soat)
  egress-IP keshining TTL qiymatidan (5 daqiqa) ancha keng, shuning uchun
  “oxirgi ma’lum IP” joriy holat emas, balki tarixdir. Agar ulanish proxy’si
  oyna ichida rotatsiyalangan bo‘lsa, lock haqiqatan ham umumiy bo‘lgan IP’ni
  **o‘tkazib yuborishi** mumkin (qayd etilgan IP yangi va hali tugamagan IP
  bo‘ladi) — va aksincha, tugagan IP’dan keyin rotatsiyalangan qo‘shni ulanishni
  **sovitishi** ham mumkin. Ikkinchi holat ushbu qo‘shni ulanishga bitta
  sovitish oynasi xarajat qiladi; ikkalasi ham tarixga asoslangan qidiruvning
  qabul qilingan eng yaxshi-harakat cheklovlaridir.
- **Xarajat**: `proxy_logs` bo‘yicha ikkita chegaralangan skan (oyna
  `idx_pl_timestamp` orqali filtrlanadi), faqat 429 chastotasida. Yangi indeks
  yo‘q (migration 134 YAGNI). O‘rtacha hajmdagi, real trafikdan olingan DB
  nusxasida o‘lchangan; yuqori o‘tkazuvchanlikka ega instansiya xuddi shu oynada
  mutanosib ravishda ko‘proq qatorni saqlaydi.

## Boshqa chidamlilik xususiyatlari

- **22 marshrutlash strategiyasi** (prioritet, vaznli, round-robin, kontekst-rele, to'ldirish-birinchi, p2c, tasodifiy, eng kam foydalanilgan, xarajat optimallashtirilgan, qayta o'rnatish, qayta o'rnatish-oyna, muddati-birinchi, bosh maydoni, kvotada o'lchangan, qat'iy-tasodifiy, auto, lkgp, kontekst-optimallashtirilgan, jegav-optimallashtirilgan, jegav-optimallashtirilgan) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md)
- **Qayta tiklashdan xabardor marshrutizatsiya** (v3.8.0) — ulanishlarni kvotani tiklash vaqti bo'yicha birinchi o'ringa qo'yadi.
- **Fon rejimining buzilishi** — Javoblari API `background: true` ogohlantirish bilan sinxronlash uchun buzilgan.
- **Dinamik asboblar chegarasini aniqlash** Asboblar soni chegaralanganda — provayderlarni o'chirib qo'yadi.
- **Favqulodda tiklanish** `OMNIROUTE_EMERGENCY_FALLBACK` tomonidan boshqariladigan — ; operatorlar uni Feature Flags sahifasidan qayta ishga tushirmasdan bekor qilishi mumkin.

---

## Nosozliklarni tuzatish

- Weighted combo `503 all_targets_cooling_down` javobini qaytaradi (`Retry-After` o'rnatilgan, `diagnostics.excluded` har bir targetni `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` bilan sanaydi) → pool sozlangan va ulangan, har bir target shunchaki chidamlilik taymeri tomonidan istisno qilingan; `[COMBO] Weighted selection: every target excluded before dispatch — …` ogohlantirishi sabablarni va qolgan soniyalarni ko'rsatadi. Xuddi shu kombodan olingan `404 no_executable_targets` hech qanday chidamlilik taymeri ishtirok etmaganini anglatadi (ishga tushiradigan hech narsa yo'q yoki har bir akkaunt mavjudlik tekshiruvidan o'tolmagan). `targetResolution.ts` da yig'ilgan istisnolardan `open-sse/services/combo/pinRecovery.ts` da qurilgan.
- Provayderning barcha kalitlari o'tkazib yuborildi → circuit breaker holatini VA har bir ulanishning `rateLimitedUntil`/`testStatus` qiymatini tekshiring.
- Provayder reset oynasidan keyin doimiy istisno qilingan → kod `getStatus()`/`canExecute()` o'rniga xom `state` ni o'qiyapti.
- Bitta kalit ishlamayapti, boshqalari ishlashi kerak → circuit breaker o'rniga connection cooldown ni afzal ko'ring.
- Faqat bitta model ishlamayapti → connection cooldown o'rniga model lockout ni afzal ko'ring.
- Holat o'z-o'zidan tiklanishi kerak edi, lekin tiklanmayapti → kelajakdagi timestamp hamda muddati o'tgan holatni yangilaydigan o'qish yo'lini tekshiring. Doimiy holatlar qo'lda o'zgartirishni talab qiladi.

---

## Runtime holati — agent uchun tezkor ma'lumotnoma

> Agent qo'llanmasi 40k kontekst byudjetidan oshmasligi uchun `AGENTS.md` → "Resilience
> Runtime State" bo'limidan (PR #12743) so'zma-so'z ko'chirildi. Bu yuqoridagi bo'limlarning
> ixcham, agentga mo'ljallangan ko'rinishi; raqamlangan bo'limlar to'liq ma'lumotnoma bo'lib qoladi.

OmniRoute da bir-biri bilan bog'liq, lekin alohida uchta vaqtinchalik xato mexanizmi mavjud. Marshrutlash xatti-harakatida nosozlikni qidirganda ularning qamrovini alohida saqlang. Bir qarashda tushunish uchun [3 qatlamli chidamlilik diagrammasi](../diagrams/exported/resilience-3layers.svg) ga qarang (manba: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)).

### Provayder Circuit Breaker

**Qamrov**: butun provayder, masalan `glm`, `openai`, `anthropic`.

**Maqsad**: upstream/xizmat darajasida qayta-qayta xato berayotgan provayderga trafik yuborishni to'xtatish, shunda bitta nosog'lom provayder har bir so'rovni sekinlashtirmaydi.

**Amalga oshirish**:

- Asosiy klass: `src/shared/utils/circuitBreaker.ts`
- Chat gate/ijro ulanishi: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Runtime holati API si: `src/app/api/monitoring/health/route.ts`
- Umumiy wrapperlar: `open-sse/services/accountFallback.ts`
- Doimiy saqlanadigan holat jadvali: `domain_circuit_breakers`

**Holatlar** (4 ta — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normal trafik ruxsat etiladi.
- `DEGRADED`: erta ogohlantirish zonasi — xatolar degradatsiya chegarasidan oshdi, lekin hali uzgich chegarasidan oshmadi; trafik davom etadi, dashboardlar ogohlantirishni ko'rsatadi. Yaroqli ulanish testi yoki yangi xatosiz sokin oyna uni `CLOSED` holatiga qaytaradi (oyna `docs/architecture/RESILIENCE_GUIDE.md` da keltirilgan).
- `OPEN`: provayder vaqtincha bloklangan; chaqiruvchilar provider-circuit-open javobini oladi yoki combo marshrutlash boshqa targetga o'tadi.
- `HALF_OPEN`: reset timeout muddati o'tgan; sinov so'roviga ruxsat beriladi. Muvaffaqiyat uzgichni yopadi, xato uni qayta ochadi.

**Standart qiymatlar** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, `src/lib/resilience/settings.ts` dagi `DEFAULT_RESILIENCE_SETTINGS.providerBreaker` orqali ishlatiladi → `src/sse/handlers/chatHelpers.ts` dagi `getCircuitBreaker(provider, …)`). Butun provayder uzgichi `circuitBreakerThreshold` / `circuitBreakerReset` asosida ishlaydi:

| Profil     | degradatsiya | ochilish (`circuitBreakerThreshold`) | tiklash (`circuitBreakerReset`) |
| ---------- | -----------: | -----------------------------------: | ------------------------------: |
| OAuth      |          `5` |                                  `8` |                           `60s` |
| API kaliti |          `7` |                                 `12` |                           `30s` |
| Lokal      |     (hosila) |                                  `2` |                           `15s` |

`PROVIDER_PROFILES` shuningdek `providerFailureThreshold` (10/15/2), `providerFailureWindowMs` (15/30/5 daq) va `providerCooldownMs` (5/10/1 daq) ni ham belgilaydi: bular **ixtiyoriy global Provider Cooldown ning oyna darvozasi**ni ta'minlaydi (`PROVIDER_COOLDOWN_ENABLED`, standart holda o'chiq) — `open-sse/services/providerCooldownTracker.ts` dagi provayder darajasidagi yozuv faqat `providerFailureWindowMs` ichida `providerFailureThreshold` ta xatodan keyin sovush deb hisoblanadi va keyin `providerCooldownMs` davomida sovuydi. Ular faol uzgichning chegaralari EMAS — ularni uzgich xatti-harakatini kutib sozlamang. Har bir standart qiymatni `OMNIROUTE_PROVIDER_BREAKER_*` va `OMNIROUTE_CIRCUIT_BREAKER_*` muhit o'zgaruvchilari orqali bekor qilish mumkin; runtime uchun aniq ma'lumotnoma jadvali `docs/architecture/RESILIENCE_GUIDE.md` da joylashgan.

Faqat provayder darajasidagi xato holatlari provayder uzgichini ishga tushirishi kerak:

```ts
(408, 500, 502, 503, 504);
```

Ko'pchilik `401`, `403` yoki `429` holatlari kabi oddiy akkaunt/kalit/model xatolari uchun butun provayder uzgichini ishga tushirmang. Ular odatda connection cooldown yoki model lockout ga tegishli. Umumiy API-kalit provayderining `403` holati terminal provayder/akkaunt xatosi deb tasniflanmagan taqdirda tiklanadigan bo'lishi kerak.

Breaker fon taymeridan emas, balki dangasa (lazy) tiklashdan foydalanadi. `OPEN` muddati
tugaganda, `getStatus()`, `canExecute()` va `getRetryAfterMs()` kabi o'qishlar holatni
`HALF_OPEN` ga yangilaydi, shuning uchun dashboardlar va combo nomzod yaratuvchilar muddati
o'tgan provayderni abadiy chetda qoldirmaydi.

### Ulanish cooldowni

**Qamrov**: bitta provayder ulanishi/akkaunti/kaliti.

**Maqsad**: bir provayderning boshqa ulanishlari so'rovlarga xizmat ko'rsatishda davom
etishi uchun, bitta nosoz kalit/akkauntni vaqtincha o'tkazib yuborish.

**Amalga oshirish**:

- Yozish/yangilash yo'li: `src/sse/services/auth.ts::markAccountUnavailable()`
- Akkauntni tanlash/filtrlash: `src/sse/services/auth.ts::getProviderCredentials...`
- Cooldown hisoblash: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Sozlamalar: `src/lib/resilience/settings.ts`

Provayder ulanishlaridagi muhim maydonlar:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Akkaunt tanlash paytida ulanish quyidagi holatda o'tkazib yuboriladi:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldownlar ham dangasa ishlaydi: `rateLimitedUntil` o'tmishda qolganda, ulanish yana
tanlashga mos bo'ladi. Muvaffaqiyatli foydalanilganda, `clearAccountError()` `testStatus`,
`rateLimitedUntil`, xato maydonlari va `backoffLevel` qiymatlarini tozalaydi.

Standart ulanish cooldown xatti-harakati:

- OAuth asosiy cooldowni: `5s`.
- API-kalit asosiy cooldowni: `3s`.
- API-kalit uchun `429` javobida upstream qayta urinish ko'rsatmalariga (`Retry-After`,
  reset sarlavhalari yoki tahlil qilinadigan reset matni) mavjud bo'lganda ustunlik
  berish kerak.
- Takrorlanuvchi tiklanadigan xatolar eksponensial backoffdan foydalanadi:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Thundering-herdga qarshi himoya bir xil ulanishda bir vaqtda yuzaga keladigan xatolarning
cooldownni qayta-qayta uzaytirishi yoki `backoffLevel`ni ikki marta oshirib yuborishining
oldini oladi.

Yakuniy holatlar cooldown emas. `banned`, `expired` (u faqat `EXPIRED_RETRY_MAX` orqali
N ta cheklangan qayta urinishdan keyin yakuniy holatga aylanadi) va `credits_exhausted`
ma'lumotlar/sozlamalar o'zgartirilguncha yoki operator ularni qayta o'rnatguncha mavjud
bo'lmasligi uchun mo'ljallangan. Yakuniy holatlarning ustiga vaqtinchalik cooldown
holatini yozmang.

### Model bloklanishi

**Qamrov**: provayder + ulanish + model.

**Maqsad**: ushbu ulanish uchun faqat bitta model mavjud bo'lmasa yoki kvota bilan
cheklangan bo'lsa, butun ulanishni o'chirib qo'ymaslik.

Misollar:

- Har bir model bo'yicha kvota qo'llab, `429` qaytaradigan provayderlar.
- Bitta topilmayotgan model uchun `404` qaytaradigan mahalliy provayderlar.
- Tanlangan Grok rejimlari kabi provayderga xos rejim/model ruxsat xatolari.

Model bloklanishi `open-sse/services/accountFallback.ts` da joylashgan bo'lib, bir xil
ulanishga boshqa modellarga xizmat ko'rsatishda davom etish imkonini beradi.

### Nosozliklarni tuzatish bo'yicha ko'rsatmalar

- Agar provayderning barcha kalitlari o'tkazib yuborilsa, provayder breaker holatini va
  har bir ulanishning `rateLimitedUntil`/`testStatus` qiymatlarini tekshiring.
- Agar provayder qayta o'rnatish oynasidan keyin ham doimiy ravishda chiqarib
  yuborilgandek ko'rinsa, kod `getStatus()`/`canExecute()` dan foydalanish o'rniga xom
  `state`ni o'qiyotganligini tekshiring.
- Agar bitta provayder kaliti ishlamasa, lekin boshqalari ishlashi kerak bo'lsa, provayder
  breakeri o'rniga ulanish cooldownini afzal ko'ring.
- Agar faqat bitta model ishlamasa, ulanish cooldowni o'rniga model bloklanishini afzal
  ko'ring.
- Agar holat o'z-o'zidan tiklanishi kerak bo'lsa, unda kelajakdagi vaqt belgisi/qayta
  o'rnatish taymauti hamda muddati o'tgan holatni yangilaydigan o'qish yo'li bo'lishi
  kerak. Doimiy holatlar qo'lda ma'lumot yoki konfiguratsiya o'zgarishlarini talab qiladi.

---

## TLS Fingerprinting va yashirinlik

Provayderga xos yashirinlik (JA3/JA4, CCH, obfuskatsiya) alohida hujjatlashtirilgan — qarang `docs/security/STEALTH_GUIDE.md` (git; `/docs` ichiga kompilyatsiya qilinmagan).

---

## Barqarorlik testlari (8-bosqich · C-blok)

Barqarorlik logikasi uchun unit testlardan tashqari, uchta test runtime-ni
haqiqiy stress/muvaffaqiyatsizlik sharoitlarida sinovdan o'tkazadi (barchasi integratsiya/nightly — hech biri PR-larni bloklamaydi):

| Test        | Nima qiladi                                                                                                                                                                                                  | Ishga tushirish                            |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| Chaos       | Soxta-upstream tuguni haqiqiy latency/reset/timeout/503 holatlarini kiritadi; circuit breaker ochilishi/tiklanishini va `checkFallbackError` 503 ni tiklanadigan fallback sifatida tasniflashini tekshiradi. | `RUN_CHAOS_INT=1 npm run test:chaos`       |
| Heap-growth | `--expose-gc` ostida har bir `createSSEStream` uchun ~500 ta oqim; heap chegaradan oshib ketsa muvaffaqiyatsiz bo'ladi (OOM guard #3069).                                                                    | `npm run test:heap`                        |
| k6 soak     | `/api/monitoring/health` ga uzluksiz yuk; p95/xato chegaralari.                                                                                                                                              | `k6 run tests/load/k6-soak.js` (har kecha) |

`.github/workflows/nightly-resilience.yml` tomonidan boshqariladi (cron + dispatch). Standart
`test:integration` da chaos va heap o'z-o'zini o'tkazib yuboradi (`RUN_CHAOS_INT`/`--expose-gc` bo'lmasa).

---

## Shuningdek qarang

- [Arxitektura qo'llanmasi](./ARCHITECTURE.md) — Tizim arxitekturasi va ichki tuzilishi
- [Foydalanuvchi qo'llanmasi](../guides/USER_GUIDE.md) — Provayderlar, kombolar, CLI integratsiyasi
- [Auto-Combo dvigateli](../routing/AUTO-COMBO.md) — 16 faktorli baholash, rejim paketlari
