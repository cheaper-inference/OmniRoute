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

## 2. Ulanishni kutish muddati

**Qoʻllanish sohasi:** bitta provayder ulanishi/akkaunti/kaliti.

**Maqsad:** boshqa ulanishlar shu provayder uchun xizmat koʻrsatishda davom etayotganda, ishlamaydigan bitta kalitni oʻtkazib yuborish.

**Joriy etilishi:**

- Mavjud emas deb belgilash: `src/sse/services/auth.ts::markAccountUnavailable()`
- Tanlash: shu fayldagi `getProviderCredentials*`
- Kutish muddatini hisoblash: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Sozlamalar: `src/lib/resilience/settings.ts`

**Har bir ulanish uchun maydonlar:**

- `rateLimitedUntil` — kutish muddati tugaydigan vaqt tamgʻasi
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — eksponensial kechikish hisoblagichi

**Standart kutish muddatlari:**

- OAuth bazaviy qiymati: 5s
- API-kalit bazaviy qiymati: 3s
- API-key 429: upstream `Retry-After`/reset sarlavhalari/ajratib olinadigan reset matniga ustunlik beradi
- Kechikishni oshirish: `baseCooldownMs * 2 ** failureIndex`

**Provayder boʻyicha qayta urinish kechikishi.** Provayder tafsilotlari sahifasida **Qayta urinish kechikishi** tanlovi mavjud (Auto,
15s dan 1h gacha). U `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` qiymatini saqlaydi
(1–21600, `PATCH /api/resilience` orqali). Rate-limit xatosida upstream qayta urinish
koʻrsatkichi boʻlmasa, bu qiymat provayder uchun masshtablangan kechikishni almashtiradi va
`backoffLevel` qiymatini 0 ga qaytaradi (`open-sse/services/rotationConfig.ts::overrideFor`). Rate-limit xatosi uchun ustuvorlik tartibi, yuqorisidan boshlab: upstream qayta urinish koʻrsatkichi, undan keyin ulanishga xos `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, undan keyin provayder boʻyicha qayta urinish kechikishi, undan keyin
`OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` muhiti oʻzgaruvchisi, soʻngra
masshtablangan kechikish. Auto maydonni olib tashlaydi. Bu faqat rate-limit sababiga taʼsir qiladi, terminal holatlarga hech qachon taʼsir qilmaydi.

**Bir vaqtdagi koʻplab soʻrovlar toʻplanishidan himoya:** bir vaqtdagi xatolar kutish muddatini haddan tashqari uzaytirishi yoki `backoffLevel` qiymatini ikki marta oshirishining oldini oladi.

**Concurrency-limit 429 xatolari kechikish pogʻonalarini oshirmaydi.** Tanasida
concurrency limiti ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) haqida xabar berilgan `429` akkaunt sogʻlom, ammo band ekanini anglatadi.
`checkFallbackError()` `concurrency_limited` sababini qaytaradi: darhol keyingi
ulanishga oʻtiladi, bu ulanish `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) belgilangan muddatga yoki upstream qayta urinish koʻrsatmasi asosida kutishga qoʻyiladi, `backoffLevel` oʻzgarmagan holda saqlanadi va `skipProviderBreaker` oʻrnatiladi.
Aniq quota tanasi ustunlik qiladi, shuning uchun quota namunasi bilan ham mos keladigan tana quota hukmi boʻlib qoladi. Aniqlash: `src/shared/utils/classify429.ts` ichidagi `looksLikeConcurrencyLimit()`;
hukm: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (breaker’ning `FailureKind` qiymati) oʻzgarmaydi va bu tanalar uchun ham `rate_limit` qiymatini oʻqishda davom etadi.

**Stream tarkibidagi toʻxtab qolishlar akkauntni kutishga qoʻymaydi.** Content-stall watchdog
(`open-sse/utils/streamHandler.ts`) oʻz vaqtida model chiqishini yubormagan streamdan voz kechganda,
`markAccountUnavailable()` xatoni ulanishda qayd etadi, ammo kutish muddatini belgilamaydi: toʻxtab qolish shu soʻrovga tegishli boʻlib, koʻpincha hali chiqishsiz davom etayotgan uzoq reasoning burilishidir. Operatorlar `resilienceSettings.streamStallCooldown.enabled` orqali buni qayta yoqishi mumkin (standart qiymat `false`).

**`p2c` akkaunt tanlovi uchun ixtiyoriy kechikish signali.** Joʻnatilgan har bir urinish oʻzining birinchi baytgacha boʻlgan vaqtini va natijasini har bir ulanish (shuningdek, ulanish + model juftligi) boʻyicha xotiradagi siljiydigan oynada qayd etadi: 15 daqiqa ichidagi oxirgi 20 ta namuna
(`open-sse/services/connectionLatencyTracker.ts`, `src/sse/handlers/chatHelpers.ts` ichidagi `safeLogEvents()` dan qayd etiladi). `resilienceSettings.p2cLatency.weight` qiymati `0` dan yuqori boʻlganda
(0–20 oraligʻi, standart `0` = oʻchirilgan), `src/sse/services/auth.ts` ichidagi `compareP2CConnections()` juftlikdagi har bir nomzodga `weight` qiymatigacha ball qoʻshadi. Uning yarmi tezroq nomzodga nisbatan kechikish nisbatidan (ikki baravar sekinlik toʻliq yarim ballni beradi), ikkinchi yarmi esa siljiydigan xatolik ulushidan hosil boʻladi.
Bu had faqat ikkala nomzodda kamida 3 ta namuna boʻlganda qoʻllanadi, shuning uchun yangi akkauntlar jazolanmaydi va uning yuqori chegarasi quota-blocked hamda quota-exhausted jarimalaridan past boʻlib qoladi. U oʻzining alohida circuit’ini yaratmaydi: ishlamayotgan akkauntlar hanuz kutish, lockout va breaker qatlamlari orqali boshqariladi. Uni `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` orqali oʻrnating.

**Reasoning freymlari content-stall budjetini qayta boshlaydi.** Reasoning modeli birinchi koʻrinadigan tokenigacha bir necha daqiqa fikrlashi mumkin: Claude boʻsh thinking matnli `thinking_delta` freymlarini uzatadi, Responses API esa bir reasoning elementidan keyingisiga oʻtadi. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) bu freymlarni taniydi va watchdog burilishni bekor qilish oʻrniga har bir freymda oʻz budjetini qayta boshlaydi. Ular hanuz model chiqishi hisoblanmaydi, shuning uchun faqat reasoning bilan yakunlangan burilish baribir boʻsh deb hisobot qilinadi, reasoning toʻxtab, faqat heartbeat yuboriladigan burilish esa watchdog’ni baribir ishga tushiradi.

Kiro’ning ikkilik `reasoningContentEvent` freymlari boʻsh boʻlmagan imzo bilan ushbu reasoning faolligini executor orqali boʻsh `reasoning_content` deltasi sifatida saqlab qoladi. Imzo uzatilmaydi. Metadata, toʻliq boʻlmagan freymlar va boʻsh imzolar content budjetini qayta boshlamaydi; mustaqil active-stream timeout va mijoz tomonidan bekor qilish hanuz amal qiladi (`open-sse/executors/kiro/reasoning.ts`).

**Terminal holatlar (kutish muddatlari EMAS):**

- `banned` — taqiqlangan kalit soʻz / akkaunt bloklanishini aniqlash orqali oʻrnatiladi (qarang: [BAN_DETECTION](../security/BAN_DETECTION.md)). Upstream tomonidan har bir soʻrov uchun beriladigan rad javoblari (`request_rejected`, masalan, Anthropic OAuth 403 "Request not allowed") uni hech qachon oʻrnatmaydi: ular ulanish va model boʻyicha hisoblanadi hamda oʻsib boruvchi kutish muddati bilan shu modelni rotatsiyadan chiqaradi; kutish muddati `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h) bilan cheklanadi yoki model nomaʼlum boʻlganda ulanishni kutishga qoʻyadi — `open-sse/services/requestRejectedStreak.ts`
- `expired` (cheklangan qayta urinishlardan soʻng terminal holatiga oʻtadi — eksponensial kechikish bilan `EXPIRED_RETRY_MAX = 3`; shu tariqa vaqtinchalik OAuth xatolari akkaunt butunlay oʻchirib qoʻyilishidan oldin oʻz-oʻzidan tiklanishi mumkin)
- `credits_exhausted`

Bular hisob maʼlumotlari oʻzgartirilmaguncha yoki operator ularni qayta tiklamaguncha saqlanadi. Terminal holatlarni vaqtinchalik sovish holati bilan almashtirmang.

**Dangasa tiklanish:** `rateLimitedUntil` muddati oʻtgach, ulanish yana muvofiq boʻladi. Muvaffaqiyatli foydalanilganda, `clearAccountError()` barcha xato maydonlarini tozalaydi.

### Claude OAuth foydalanish cheklovi: past ustuvorlikdagi yoʻlak + sessiya cheklovini qayta tiklash

**Qamrov:** bitta Claude obunasi (OAuth) ulanishi. Har ikkala funksiya ham **ulanish bo‘yicha ixtiyoriy** (Edit connection → Claude section → `lowPriorityMode` / `autoLimitReset` in
`providerSpecificData`, ikkalasi ham sukut boʻyicha oʻchiq) va Claude Codeʼning `/low-priority` hamda `/limit-reset` buyruqlarini aks ettiradi (sim kontrakti Claude Code 2.1.263 dan olingan).

**Amalga oshirish:**

- Holat mashinasi va javoblarni tasniflash: `open-sse/services/claudeLowPriority.ts`
- Qayta tiklash holati/claim mijozi: `open-sse/services/claudeLimitReset.ts`
- Ijrochi hookʼi (header kiritish + shu hisob bilan qayta urinish): `open-sse/executors/base.ts::execute()`
- Ixtiyoriy sozlamalarni saqlash: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Trigger:** 5 soatlik foydalanish cheklovi — headerʼlarida
`anthropic-ratelimit-unified-status: rejected` va hisob muvofiq boʻlganda
`anthropic-ratelimit-unified-slow-offer: treatment` boʻlgan `429`. Birinchi cheklovdagi
`429` gacha hech narsa yuborilmaydi; unified headerʼlarsiz kelgan qisqa muddatli `429` odatiy sovish yoʻli orqali oʻtadi.

**Past ustuvorlikdagi yoʻlak** (`lowPriorityMode`):

- Cheklovdagi `429` holatida ijrochi taklifni qabul qiladi va darhol **oʻsha**
  hisob bilan `anthropic-usage-limit: slow` orqali qayta urinadi; yoʻlak eʼlon qilingan
  `anthropic-ratelimit-unified-reset` (+60 soniyalik qoʻshimcha vaqt)gacha faol boʻlib qoladi va shu vaqt oraligʻidagi har bir soʻrov headerʼni olib yuradi. Ushlangan `429` hech qachon `handleChatCore` ga yetib bormaydi, shuning uchun ulanish
  **sovish holatiga oʻtkazilmaydi** va boshqa ulanishga almashtirilmaydi.
- Keyingi javoblardagi `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`
  yoʻlakni saqlab qoladi; `slot_busy` (`429`) yoki `529` serverning
  `anthropic-ratelimit-unified-slow-retry-after` qiymatini kutadi (sukut boʻyicha 20 soniya, 5–600 soniya oraligʻida cheklangan, ±30% jitter)
  va `anthropic-ratelimit-unified-slow-max-wait` bilan chegaralangan holda qayta urinadi (sukut boʻyicha 20 daqiqa, 1 daqiqa–6 soat oraligʻida cheklangan) — bu muddatdan oʻtgach yoʻlak tugaydi va qayta qabul qilishni 10 daqiqaga bloklaydigan sovish davri boshlanadi. Kutish qoʻshimcha ravishda soʻrovning upstreamʼni boshlash uchun ajratilgan timeoutʼida qolgan vaqt bilan ham cheklanadi
  (`resolveFetchStartTimeout`, sukut boʻyicha 10 daqiqa) va undan 5 soniyalik chegirma qilinadi: bu cheklov boʻlmasa, sukut boʻyicha 20 daqiqalik maksimal kutish soʻrovdan uzoqroq davom etar edi va uyqu holati kutish oʻrtasida toʻxtatilib, silliq `max_wait` yakunlanishi + sovish oʻrniga `TimeoutError` yuzaga kelardi.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5 soatlik oynaning yangilanishi yoki
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (bu har qanday holatda uni `extra_usage` sifatida tugatadi, chunki endi pullik ortiqcha foydalanish cheklovni qoplaydi) yoʻlakni tugatadi; shundan keyin javob odatiy sovish yoʻliga oʻtadi. `budget_exhausted` eʼlon qilingan budjet tiklanishigacha (≤ 8 kun) eslab qolinadi.
- Cheklov tekshiruvi ijrochining 400 asosidagi urinish ichidagi qayta urinishlaridan (kontekstni tahrirlash, thinking/effort cheklovlari, parametrlarni avtomatik oʻrganish) keyin ishlaydi, shuning uchun ushbu qayta urinishlardan birida yuzaga kelgan cheklovdagi `429` ham sovish yoʻliga oʻtmasdan ushlanadi.
- Holat har bir ulanish uchun xotirada saqlanadi (qayta ishga tushirish qayta qabul qilish uchun yana bitta cheklovdagi `429`ni talab qiladi).

**Sessiya cheklovini qayta tiklash** (`autoLimitReset`, ikkalasi yoqilgan boʻlsa, yoʻlakdan oldin sinab koʻriladi):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  bloki; `arm: "reset"` va `available: true` boʻlganda,
  `{ "program": "juniper_tide" }` bilan `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` (tashkilot UUIDʼsi `providerSpecificData.organizationUUID` dan, bootstrap fallback).
- `result: reset|not_limited` → soʻrov toʻliq tezlikda qayta uriniladi (slow headerʼsiz).
  `already_used` / `not_offered` `next_available_at` qiymatini (sukut boʻyicha bir hafta) eslab qoladi; har qanday xato 15 daqiqalik backoffʼga olib keladi. Qayta tiklash haftasiga bir marta amalga oshiriladi va haftalik cheklovga baribir hisoblanadi.

Regressiya himoyalari: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Sessiya affiniteti (#7274)

**Qamrov:** istalgan provider uchun bitta mijoz sessiyasi (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` headerʼi) bitta ulanishga biriktiriladi.

**Maqsad:** ko‘p navbatli agentni (Claude Code, aider, maxsus agentlar) soʻrovlar orasida bir xil hisobda saqlash, shu orqali hisoblararo kontekst yoʻqolishini va har bir hisob uchun sessiya holatiga ega providerʼlarda takroriy sovuq ishga tushirishdagi `429`larni kamaytirish.

**Amalga oshirish:**

- TTLʼni aniqlash: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Biriktiriladigan ulanishni tanlash/yaratish: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Headerʼni ajratib olish (umumiy, istalgan provider): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Saqlanadigan biriktirish jadvali: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Sozlama: `sessionAffinityTtlMs` (msʼdagi global TTL, `0` o‘chiradi) — `src/lib/db/settings.ts`. Codexʼga xos `codexSessionAffinityTtlMs` nomi `124_generic_session_affinity_ttl.sql` migratsiyasi orqali o‘zgartirildi; u avval sozlangan Codex TTLʼlarini yangi sukut boʻyicha qiymat sifatida saqlab qoladi.

#7274 gacha `resolveSessionAffinityTtlMs()` `codex`dan boshqa har bir provider uchun darhol `0` qaytarardi, shuning uchun TTL sozlamasi (va sessiya headerʼlari) boshqa hech qayerda taʼsir qilmasdi, garchi biriktirish mexanizmi va headerʼlarni ajratib olish allaqachon providerʼdan mustaqil boʻlgan boʻlsa ham. Tuzatish ushbu erta qaytishni olib tashladi; TTL endi global ravishda `0` dan yuqori qiymatga oʻrnatilgach, barcha providerʼlarga bir xil qoʻllanadi.

Uchala sessiya affiniteti headerʼi ham upstreamʼga hech qachon uzatilmaydi — ijrochilar mijoz headerʼlarini shunchaki uzatish oʻrniga upstream headerʼlarini boshidan yaratadi, shu sababli bu faqat ichki korrelyatsiya identifikatori boʻlib qoladi.

### Eksklyuziv boshqariladigan sessiya ulanishi ijaralari

**Qamrov:** bitta faol boshqariladigan HTTP klienti/seansi bitta mos OmniRoute ulanishiga egalik qiladi.

**Maqsad:** so‘rovlar bo‘ylab qat’iy marshrutlash to‘sig‘iga muhtoj klientlar uchun ulanishga nisbatan uzoq muddatli eksklyuziv egalikni ta’minlash. Bu yumshoq uzluksizlik afzalligi bo‘lgan sessiya affinligidan farq qiladi: eksklyuziv ijara hayotiy sikl holatini SQLite’da saqlaydi, faol egalik qiluvchi va faol ulanishning global noyobligini ta’minlaydi hamda provayderga yuborishdan oldin eskirgan avlodni rad etadi.

Bu funksiya har bir API kaliti uchun ixtiyoriydir. Boshqariladigan kalit `lease:exclusive` qamroviga va aniq, bo‘sh bo‘lmagan `allowedConnections` ro‘yxatiga ega bo‘lishi kerak. Hayotiy sikl endpointidan istalgan klient foydalanishi mumkin; klient nomi, user-agent, provayder, OAuth usuli yoki model talab qilinmaydi. Ijara modelga emas, ulanishga egalik qiladi, shuning uchun ulanish odatda mos bo‘lib qolsa, modelni almashtirish bog‘lanishni saqlab qoladi. Oddiy model, kvota, holat, kutish va ruxsat berilganlar ro‘yxati qoidalari ustuvor bo‘lib qoladi hamda ayni avlodni boshqa bo‘sh, mos ulanishga o‘tkazishi mumkin.

Hayotiy sikl JSON amallari `acquire`, `renew` va `release` bo‘lgan `POST /api/v1/session-leases` orqali boshqariladi. Boshqariladigan inference so‘rovlari shaffof bo‘lmagan `X-OmniRoute-Lease-Owner` qiymati va aynan `X-OmniRoute-Lease-Generation` qiymatini yuboradi. Egasi `vlo_` prefiksi va 43 ta base64url belgisidan iborat bo‘ladi; faqat uning SHA-256 xeshi saqlanadi. Har bir yakuniy yuborish to‘sig‘i autentifikatsiyadan o‘tgan API kaliti identifikatori va faol ulanish identifikatoriga ham bog‘lanadi. Ijarani boshqarish sarlavhalari jurnallardan, saqlab qolingan so‘rov snapshotlaridan va yuqori oqim executor sarlavhalaridan olib tashlanadi.

Agar oddiy marshrutlashda mos boshqariladigan nomzodlar mavjud bo‘lsa-yu, barcha bo‘sh nomzodlar boshqa faol ijaralar tomonidan band qilingan bo‘lsa, OmniRoute HTTP `429`, lease-capacity-unavailable kodi, waiting-for-capacity holati va eng erta tegishli tugash muddatidan kelib chiqib hisoblangan cheklangan `Retry-After` qiymatini qaytaradi. Odatdagi mos nomzodlarning yo‘qligi ijara bilan bog‘liq bandlik emas va mavjud marshrutlash xatosi semantikasini saqlab qoladi.

Bog‘liq mexanizmlar alohida bo‘lib qoladi:

- OAuth sessiyasi bandligi OAuth hisoblari uchun jarayon doirasidagi yumshoq taqsimlashni ta’minlaydi.
- Hisob semaforlari so‘rovlar parallelligi uchun ruxsatlar beradi va so‘rov yakunlanganda tugaydi.
- Eksklyuziv boshqariladigan sessiya ijaralari avlod to‘sig‘iga ega, doimiy hayotiy sikl egaligini ta’minlaydi.

## 3. Model blokirovkasi

**Qamrov:** provayder + ulanish + model uchligi.

**Status bo'yicha kalit qamrovi:** muvaffaqiyatsiz bo'lgan status blokirovka qaysi kalitga yozilishini belgilaydi (`open-sse/services/accountFallback/exactModelLock.ts` faylidagi `resolveLockoutScope()`):

- `429` / `403` / `402` — kvota yoki ruxsat (entitlement) signali — **kvota oilasini** blokirovka qiladi:
  codex uchun butun `codex` / `spark` qamrovi (ulanishning har bir `gpt-5*`
  modeli), boshqa provayderlar uchun `getQuotaScopedModelForProvider()`.
- `404` faqat modelning o'zini blokirovka qiladi (`getModelLockKey()` `not_found` holatini toraytiradi).
- Boshqa har qanday status — `5xx` transport/server xatoliklari va OmniRoute'ning sifat
  tekshiruvidan o'zi sintez qilgan `502` — faqat **aniq**
  provayder/ulanish/model uchligini blokirovka qiladi. Bitta modeldagi yomon oqim
  hisobning kvotasi haqida dalil emas; bu qoidadan oldin
  `codex/gpt-5.6-luna`da bitta bo'sh javob ushbu ulanishning barcha `gpt-5*`
  modellarini marshrutlashdan 2–30 daqiqaga (oshib boruvchi) olib tashlardi,
  kvotasi esa o'zgarmasdan qolardi.
- Chaqiruvchining aniq ko'rsatilgan `scope` opsiyasi har doim ustun keladi (Antigravity `"exact"` uzatadi).

**Maqsad:** faqat bitta model mavjud bo'lmaganda yoki kvota bilan cheklanganda butun ulanishni o'chirib qo'ymaslik.

**Misollar:**

- Har bir model uchun kvota qo'llovchi va 429 qaytaruvchi provayderlar
- Bitta topilmagan model uchun 404 qaytaruvchi mahalliy provayderlar
- Provayderga xos rejim/model ruxsat xatoliklari (masalan, Grok rejimlari)

**Implementatsiya:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Model sovutishlari paneli (v3.8.0)

UI: Sozlamalar → Model sovutishlari (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Faol blokirovkalarni quyidagilar bilan ro'yxatlaydi: provayder, ulanish, model, sabab, expiresAt. Operatorlar modelni kartadan qo'lda qayta yoqishlari mumkin.

**REST API:**

- `GET /api/resilience/model-cooldowns` — faol blokirovkalar ro'yxati
- `DELETE /api/resilience/model-cooldowns` — qo'lda qayta yoqish. Tana: `{provider, connection, model}`. Avtorizatsiya: management.

### Cooldown boshqaruvchisi

UI: Monitoring → Cooldown boshqaruvchisi (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Vaqtinchalik sabab tufayli marshrutlashdan chiqqan har bir ulanish uchun bitta sahifa —
har bir provayder sahifasini ochish o'rniga. U ulanish sovutishlari, model blokirovkalari
va yakuniy holatlarni ro'yxatlaydi, ularni har bir ulanish uchun, tanlanganlar uchun yoki
provayderning barcha ulanishlari uchun tozalaydi hamda eng ko'p sozlanadigan sovutish
qoidalarini tahrirlaydi: `streamStallCooldown.enabled` hamda OAuth / API-kalit
`connectionCooldown` asosiy sovutishi va maksimal backoff qadamlari
(`PATCH /api/resilience` orqali saqlanadi). Yakuniy holatlar (`banned`, `expired`,
`credits_exhausted`) ro'yxatlanadi, lekin bu yerda hech qachon tozalanmaydi.

**REST API** (`src/lib/resilience/cooldownManager.ts`, avtorizatsiya: management):

- `GET /api/resilience/cooldowns[?provider=]` — status, qolgan sovutish,
  backoff darajasi, oxirgi xato turi va model blokirovkalari bilan ulanishlar
  (hisob ma'lumotlarisiz)
- `POST /api/resilience/cooldowns` — tana `{connectionIds: string[]}` yoki
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` qaytaradi

### Blokirovka sozlamalari UI + muvaffaqiyat-pasayishi tiklanishi (v3.8.23)

Model blokirovkasi doimiy yoqilgan, qattiq kodlashgan xatti-harakatdan to'liq
sozlanadigan, ixtiyoriy (opt-in) xususiyatga aylandi — o'z sozlamalar kartasi va
o'z-o'zini tuzatadigan tiklanish yo'li bilan.

**Sozlamalar kartasi:** Sozlamalar → Model blokirovkasi
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Bu yuqoridagi faqat o'qish uchun mo'ljallangan `ModelCooldownsCard`dan
**farq qiladi** (u faqat faol blokirovkalarni _ro'yxatlaydi_) — yangi karta
_parametrlarni sozlaydi_. Standartlar `DEFAULT_MODEL_LOCKOUT_SETTINGS`da
joylashgan (`src/lib/resilience/modelLockoutSettings.ts`):

| Sozlama                 | Standart                         | Ma'nosi                                                                   |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Bosh kalit — model blokirovkasi **standart bo'yicha o'chiq**.             |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Model qamrovli muvaffaqiyatsizlik deb hisoblanadigan upstream statuslari. |
| `baseCooldownMs`        | `120_000` (120 s)                | Birinchi muvaffaqiyatsizlik uchun boshlang'ich blokirovka davomiyligi.    |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Oshirilgan sovutishning yuqori chegarasi.                                 |
| `maxBackoffSteps`       | `10`                             | Maksimal eksponentsial-backoff eskalatsiya qadamlari.                     |
| `useExponentialBackoff` | `true`                           | Takroriy muvaffaqiyatsizliklar sovutishni eksponentsial oshiradimi.       |

Sozlamalar oddiy sozlamalar ombori orqali saqlanadi va resilience sozlamalari
sxemasi orqali tekshiriladi; karta `baseCooldownMs`/`maxCooldownMs`ni
(`maxCooldownMs ≥ baseCooldownMs` sharti bilan) va `maxBackoffSteps`ni cheklaydi.

**Muvaffaqiyat-pasayishi tiklanishi:** tiklanish **faqat** taymer tugashi emas.
Sog'lom javob modelning muvaffaqiyatsizliklar sonini orqaga qaytarib tushiradi,
shuning uchun oyna o'rtasida tiklangan model taymeri tugashidan oldin eskalatsiyani
to'xtatadi (va tozalanadi). Muvaffaqiyatli combo nishonida
`open-sse/services/combo.ts` `decayModelFailureCount()`ni chaqiradi
(`open-sse/services/accountFallback.ts`), u saqlangan `failureCount`ni
**yarmiga** kamaytiradi (`Math.floor(failureCount / 2)`); u `0`ga yetganda
blokirovka yozuvi butunlay o'chiriladi. Qarama-qarshi
`recordModelLockoutFailure()` eskalatsiya oynasi ichidagi
muvaffaqiyatsizliklarda sonni oshiradi (va sovutishni eskalatsiya qiladi). Bu
muvaffaqiyat-pasayishi oddiy taymer tugashiga qo'shimcha — ikkala yo'l ham
modelni qayta yoqishi mumkin.

**Holat:** blokirovkalari **xotirada** saqlanadi (har bir jarayon uchun
`provider:connectionId:model` kaliti bilan bog'langan `ModelLockoutEntry`
`Map`lari, aniq qamrovli qulflar esa `provider:connectionId:exact:model` bilan),
DB ga saqlanmaydi — ular qayta ishga tushirishda yo'qoladi. _Sozlamalar_
saqlanadi; faol blokirovka _holati_ vaqtinchalikdir.

---

## 4. Kvota-ulushli parallellikni boshqarish (v3.8.36)

Obuna hisoblari (GLM, MiniMax va boshqalar) ko‘pincha atigi ~1–3 ta parallel
so‘rovni qabul qiladi; bu chegaradan oshish 429 xatolari va sovitish davrlarini
keltirib chiqaradi. Bu holat **kvota-ulushi** (`qtSd/…`) kombinatsiyalarida,
ya’ni bir nechta API kalitlari bitta yuqori darajadagi hisobdan foydalanganda,
ayniqsa keskinlashadi. Umumiy hisobning so‘rovlar bilan to‘lib ketishining oldini
uchta qatlam oladi.

### Ulanish bo‘yicha parallellik chegarasi (`max_concurrent`)

Har bir provayder ulanishi `max_concurrent` chegarasini e’lon qilishi mumkin
(`provider_connections.max_concurrent`, ulanish oynasi / API / DB orqali
o‘rnatiladi). Cheklov bo‘lmasligi uchun maydonni bo‘sh qoldiring. Bu quyidagi
seriyalashtirish qatlamini boshqaradigan yagona parametrdir — uni hisobning
haqiqiy parallelligiga o‘rnating (masalan, GLM ~1, MiniMax ~2).

### Model bo‘yicha parallellik chegaralari (`modelConcurrency`)

Ulanish qo‘shimcha ravishda `rateLimitOverrides` xaritasida har bir model uchun
aniq parallellik chegaralarini e’lon qilishi mumkin:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Uni ulanish oynasida (**Rate limit overrides → Per-model
concurrency caps**, har bir qatorda bittadan `model=cap`) yoki
`PATCH /api/providers/[id]` orqali xuddi shu JSON shaklida o‘rnating. Asosiy
qoidalar:

- **Ulanish bo‘yicha va modelga xos:** `maxConcurrent` butun ulanish uchun umumiy
  chegaraligicha qoladi. Ikkalasi ham qo‘llanganda, ikkala ruxsat ham bir xil
  kompozit ruxsat mexanizmida atomik tarzda olinadi
  (`global → provider → account → model`); amaldagi xatti-harakat qo‘llanadigan
  cheklovlarning qat’iyrog‘iga bo‘ysunadi.
- **Model kalitining aniq mosligi:** kalit marshrutlash aniqlangandan keyin
  executor’ga uzatiladigan model satridir — odatda yuqori darajadagi provayderning
  yalang‘och model identifikatori (`glm-5`), mijoz tomonidagi
  `provider/model` taxallusi emas (`zai/glm-5` `glm-5` bilan mos kelmaydi).
  Qiymatlar musbat butun son ko‘rinishidagi parallel so‘rov chegaralaridir.
- **Mahalliy navbatga qo‘yish, aniqlash yo‘q:** ortiqcha so‘rovlar mavjud
  navbat/vaqt tugashi semantikasi asosida mahalliy navbatga qo‘yiladi
  (tiplangan `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` qabul qilish
  xatolari). OmniRoute yuqori darajadagi siyosatni aniqlamaydi yoki taxmin
  qilmaydi — operator sozlagan aniq chegaralarni qo‘llaydi. To‘yingan model
  ruxsat mexanizmi provayderni hech qachon o‘chirib qo‘ymaydi va modelni
  doimiy ravishda bloklamaydi; yuqori darajadagi 429/sovitish/zaxira yo‘liga
  o‘tish xatti-harakati xatolarni qayta ishlashning oxirgi himoya qatlamidir.
- **Ulanish va jarayon bo‘yicha qamrov:** chegaralar har bir ma’lumotlar bazasi
  ulanishi uchun alohida bo‘ladi va xotirada saqlanadi, shuning uchun bir xil
  yuqori darajadagi API kalitidan qayta foydalanadigan ikkita ulanish o‘zaro
  muvofiqlashmaydi.
- **Sozlanmagan holat o‘zgarishsiz qoladi:** xaritani tashlab ketish (yoki
  boshqaruv panelidagi maydonni bo‘sh qoldirish) hech qanday model ruxsat
  mexanizmini qo‘shmaydi. Hech qanday universal provayder cheklovini
  tasdiqlamaydigan namunaviy konfiguratsiya:

```text
glm-5=1
glm-4.7=3
```

### Kvota-ulushi so‘rovlarini seriyalashtirish

Kvota-ulushi orqali yuborish `max_concurrent` musbat qiymatini e’lon qilgan
ulanishga yo‘naltirilganda, shu **hisob** uchun parallel so‘rovlar
ulanishga xos semafor orqali (`qsconn:<connectionId>` kaliti bilan)
seriyalashtiriladi: ortiqcha so‘rovlar hisobni to‘ldirib yuborish o‘rniga
**navbatda kutadi**. Bu **fail-open** rejimida ishlaydi — navbat to‘yingan yoki
vaqt tugagan taqdirda, jo‘natilishi mumkin bo‘lgan so‘rovni hech qachon
rad etmaslik uchun slot olinmasa ham davom etadi. Bu sozlama
**Settings → Resilience → Quota-share per-connection
concurrency** ichida joylashgan
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, sukut bo‘yicha
yoqilgan). `max_concurrent` chegarasi bo‘lmasa, xatti-harakat o‘zgarmaydi.

> Kvota-ulushi marshrutlash ruxsat mexanizmining o‘zi (`selectQuotaShareTarget`,
> DRR + P2C) ham fail-open rejimida ishlaydi va chegaraga yetgan ulanishga
> faqat _pastroq ustuvorlik beradi_ — bitta ulanishli hovuzda u qat’iy
> cheklay olmaydi, shuning uchun to‘lib ketishni amalda aynan shu semafor
> nazorat qiladi.

### Kombinatsiyalar uchun sovitishni hisobga oluvchi qayta urinish

Har bir kombinatsiya strategiyasida (yoqilgan bo‘lsa), qisqa muddatli
vaqtinchalik sovitish davrida 429 ga olib keladigan so‘rov 429 ni qaytarish
o‘rniga sovitish tugashini kutadi va qayta yuboriladi — bu Gemini sinfidagi
TPM/RPM oynalarini (~60 soniyalik retry-after), masalan, 2-model
kombinatsiyasining ikkala nishoni ham model bo‘yicha tezlik chegarasiga
yetgan holatlarni qamrab oladi. Bu jarayon **Settings → Resilience** ichidagi
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) orqali cheklanadi. U `quota_exhausted` (yarim tungacha
bloklangan) yoki autentifikatsiya/topilmaganlik sabablarini hech qachon
kutmaydi.

Kombinatsiya `config.comboCooldownWaitEnabled: false` orqali bu xatti-harakatni
o‘chirishi mumkin. Faqat literal `false` ushbu umumiy kombinatsiya kutishlarini
(dispatch’dan keyingi sovitish hamda dispatch’dan oldingi circuit-open/model-lock
kutishlarini) va kutish byudjeti sababli timeout minimal qiymatining
kengaytirilishini o‘chiradi. Qiymat yo‘q bo‘lsa yoki `true` bo‘lsa, global
siyosat saqlanadi; `true` global ravishda o‘chirilgan kutishni yoqa olmaydi.
Aniq `targetTimeoutMs` baribir ustunlik qiladi. Bu istisno native-Codex
turn-pin dispatch’dan oldingi kutishiga ta’sir qilmaydi.

Xuddi shu ruxsat mexanizmi dispatch’dan oldingi holatni ham qamrab oladi
(#16319): kombinatsiyaning har bir nishoni biror urinish bajarilishidan oldin
modeli qisqa muddatli vaqtinchalik blokda turgani sababli o‘tkazib yuborilganda,
nol urinishli yo‘l ayni chegaralar ostida blokdan chiqishni kutadi va qayta
yuboradi; natijada izohsiz `503 ALL_TARGETS_SKIPPED` javobi qaytarilmaydi.
Kutishga ruxsat berilmaganda (chegara, urinishlar yoki byudjet tugaganda yoxud
funksiya o‘chirilganda), yakuniy javob eng erta vaqtinchalik blok tugashidan
olingan `retry_after` / `reset_at` ma’lumotlarini o‘z ichiga olgan
`429 rate_limit_error` ga ko‘tariladi; kvota, autentifikatsiya va topilmaganlik
bloklari esa izohsiz 503 holatini saqlab qoladi.

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

## 7. Upstream statusini qayta bayon qilish (notoʻgʻri koʻrsatilgan kvota xatolari)

**Qamrov:** vaqtinchalik kvota tugashini notoʻgʻri HTTP status bilan xabar qiladigan bitta upstream shlyuz.

**Maqsad:** chalgʻituvchi statusni tasniflashdan OLDIN tuzatish, shunda quyi oqim iste'molchilari (fallback dvigateli, combo agregatsiyasi, mijozga qaratilgan javob) xatolikning qayta urinish mumkin boʻlgan haqiqiy tabiatini koʻradi.

Ba'zi shlyuzlar VAQTINCHALIK kvota tugashini qayta urinib boʻlmaydigan HTTP
status bilan bildiradi. `agentrouter.org` standart `429` oʻrniga xitoycha
javob tanasi (`用户额度不足` / `额度不足`) bilan `403` (ba'zan `400`) qaytaradi.
Claude Code kabi mijozlar `403` ni doimiy deb bilib, sessiyani bekor qiladi,
va tuzatishsiz fallback dvigateli uni kvota hodisasi oʻrniga `AUTH_ERROR`
deb tasniflardi.

**Amalga oshirish:**

- Reestr + moslashtiruvchi: `open-sse/config/upstreamStatusRestatement.ts` —
  har bir provayder uchun qoidalar roʻyxati (`{id, fromStatuses, toStatus,
textMarkers, excludeMarkers, defaultRetryAfterMs}`), `applyStatusRestatement()`
  orqali moslashtiriladi.
- Chaqiruv nuqtasi: `open-sse/handlers/chatCore.ts` faylidagi `providerFailure:`
  bloki (taxminan 3654-qator), `parseUpstreamError()` xato HTTP statusli
  upstream javobini tahlil qilgandan (`!providerResponse.ok`) soʻng darhol va
  har qanday tasniflash ishga tushishidan oldin, shunda har bir quyi oqim
  iste'molchisi tuzatilgan statusni koʻradi. `200` SSE oqimi ichiga
  joylashtirilgan xatolar alohida, keyinroq bajariladigan oqim-tahlil
  yoʻlidan oʻtadi va bugungi kunda bu hook tomonidan qamrab **olinmaydi** —
  bu ma'lum cheklov bo'lib, agentrouter'ning notoʻgʻri statusi uchun hali
  kerak emas (u xato HTTP statusi sifatida yuzaga chiqadi).
- Qayta urinishga moslik: `429` `RETRY_AFTER_ELIGIBLE_STATUSES` ichida
  (`open-sse/services/combo/unavailableRetryGate.ts`), shuning uchun qayta
  bayon qilingan xato oʻlik `403` sifatida koʻrinish oʻrniga haqiqiy qayta
  urinish oynasiga ega boʻladi.
- Sintetik `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) —
  bu faqat qayta bayon qilingan javob **mijozga** aytadigan qiymat; u oʻzi
  ulanishning ichki cooldown/lockout davomiyligi emas — buni qayta bayon
  qilingan xatoni amalda qayta ishlaydigan mexanizm alohida boshqaradi
  (Connection Cooldown'ning ortib boruvchi backoff'i, §2, API-kalit
  provayderlari uchun bazaviy `3s`; yoki Model Lockout, §3, agentrouter
  kabi model-kvota provayderlari uchun). Router mijozga e'lon qiladigan
  60s oynadan oldinroq ichkarida qayta urinishga mos boʻlishi mumkin —
  bu qasddan qoldirilgan zaxira, xatolik emas.

Doimiy xatolar (agentrouter'ning `无权访问模型` — bu modelga kirish yoʻq)
HECH QACHON qayta bayon qilinmaydi: `excludeMarkers` hatto `textMarkers`
mos kelganda ham qoidaga veto qoʻyadi, shuning uchun xato asl statusini
saqlab qoladi va hech narsa uni abadiy qayta urinmaydi. Mos keluvchi
provayder tasnif qoidasi (`open-sse/config/providerErrorRules.ts` dagi
`agentrouter-model-access-denied`: `reason: "auth_error"`, `scope: "model"`,
e'lon qilingan `6h` bazaviy cooldown) umumiy apikey toifasidagi `FORBIDDEN`
erta-qaytishdan _oldin_ `checkFallbackError`
(`open-sse/services/accountFallback.ts`) tomonidan koʻrib chiqiladi,
`honorsRuleLockScope(provider)` shartiga bogʻlangan holda (#10334 — hozircha
faqat agentrouter'ga xos, `providerErrorRules.ts` dagi
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist'i orqali). Qoidaning e'lon
qilingan 6h cooldown'i `fallbackResult.baseCooldownMs` sifatida uzatiladi,
lekin u baribir ilgaridan mavjud model-kvota lockout yoʻlagini quvvatlaydi
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, #10334
tomonidan cooldown manbasidan tashqari oʻzgartirilmagan): u har qanday
boshqa model lockout'i kabi operatorning `mlSettings.maxCooldownMs`
qiymatiga (standart `1_800_000ms` / 30 daqiqa) qisqartiriladi, va
_saqlanadigan lockout sababi_ qoidaning `"auth_error"` i emas, balki
ilgaridan mavjud qattiq kodlangan `"forbidden"` boʻlib qoladi — toʻliq
zanjirda faqat cooldown davomiyligi hisobga olinadi, sabab qatori emas.
Ulanishning oʻzi faol qoladi; shu ulanishdagi qo'shni modellarga
ta'sir qilmaydi.

Qayta bayon qilingan kvota xatolari (`额度不足`) prodakshnda provayder
qoidasiga yetib boradi (`agentrouter-user-quota-exhausted`:
`reason: "quota_exhausted"`, `scope: "connection"`, oʻziga xos e'lon
qilingan cooldown'i yoʻq — saqlash qatlamining masshtablangan backoff
standarti qo'llaniladi). #10334 dan beri `ProviderErrorRuleMatch` dagi
`scope` toʻliq zanjirda HAQIQATAN iste'mol qilinadi, lekin **faqat**
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist'idagi provayderlar uchun
(`providerErrorRules.ts` — bugun faqat `"agentrouter"`,
`honorsRuleLockScope()` orqali shartlangan). Boshqa barcha provayderlar
uchun `scope` aynan #10334 dan oldingidek, ma'lumot uchun qoladi.
`checkFallbackError` mos kelgan qoidaning scope'ini
`fallbackResult.ruleScope` sifatida chiqaradi;
`isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) —
`ruleScope` ni butun ulanish miqyosida, oʻz-oʻzidan tiklanadigan signal
sifatida hisobga olish haqiqatan xavfsiz ekanligini tasdiqlovchi umumiy
himoyachi (scope `"connection"`, sabab `quota_exhausted`, hech qachon
`permanent` emas, hech qachon `creditsExhausted` emas — kelajakdagi
qoidaning scope `"connection"` ni doimiy hisob holati bilan juftlashiga
qarshi himoya). Ikki iste'molchi uni chaqiradi:

- **Doimiylik** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provayderning **har bir model uchun** blokirovka
  tarmog'iga tushib qolish o'rniga (agentrouter `passthroughModels: true` →
  `hasPerModelQuota()` `true` qaytaradi), u **vaqtinchalik ulanish
  sovutishini** qo'llaydi — `testStatus: "unavailable"` + `rateLimitedUntil`,
  hech qanday yakuniy status emas
  (`credits_exhausted`/`banned`/`expired`) — shuning uchun sovutish muddati
  tugagach, qo'lda credentialni qayta sozlash talab etilmasdan, ulanish
  o'z-o'zidan tiklanadi.
  `disableCooling: true` bo'lgan ulanishlar uchun o'tkazib yuboriladi (#2997):
  bunday opt-out buning o'rniga har bir model uchun blokirovkaga o'tib o'tadi
  (hujjatlashtirilgan kompromiss — tarmoq ustidagi kod sharhiga qarang).
- **Bir xil so'rov kombo marshrutlash** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): xuddi shu himoya ulanishni
  xotira-ichidagi `exhaustedConnections` to'plamiga
  `${provider}:${connectionId}` kaliti bilan belgilaydi. Bu faqat o'z target
  obyektida _aynadan o'sha `connectionId`ni allaqachon olib yuruvchi_ qolgan
  BIR XIL SO'ROV targetini o'tkazib yuboradi
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `exhaustedConnections`
  qidiruvidan oldin `if (provider &&
connectionId)`) — oddiy model-ro'yxati kombosi, bunda qo'shni targetlar
  o'zlariga mahkamlangan `connectionId` olib yurmaydi va bittasi faqat har bir
  jo'natishda javobning `X-OmniRoute-Selected-Connection-Id` sarlavhasidan
  aniqlanadi, hech qachon bu kalit mosligiga duch kelmaydi. Bu keng tarqalgan
  holat uchun, qolgan oyoqning hozirgina tugatilgan hisobni qayta ishlatishidan
  haqiqiy himoya bu Set EMAS — bu yuqoridagi doimiylik qatlami (ulanishning
  `rateLimitedUntil` endi kelajakda) va xuddi shu himoyaning ushbu xato uchun
  `transientRateLimitedProviders`ni bostirishi kombinatsiyasidir ("Ikki bosqichli
  dizayn" bo'limi va `targetExhaustion.ts`dagi
  `isAgentrouterConnectionQuotaScope` tarmog'idagi kod sharhiga qarang): bu Set
  belgilanmagan holda qoldirilganda, `combo.ts`ning
  `allowRateLimitedConnection` majburiy ruxsati
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) provayderning qolgan
  oyoqlari uchun umuman ishga tushmaydi, shuning uchun credential tanlashning
  `rateLimitedUntil` filtri (`src/sse/services/auth.ts:1238`) odatdagidek hurmat
  qilinadi va qolgan oyoq yoki hali ham mos bo'lgan boshqa agentrouter
  ulanishini tanlaydi, yoki mavjud credentiallar yo'qligi sababli
  muvaffaqiyatsiz bo'ladi — u bu tarmoq hozirgina sovutgan ulanishga o'zini
  majburan qaytarmaydi.

### Ikki bosqichli dizayn: statusni qayta bayon qilish, so'ng tasniflash

Statusni qayta bayon qilish (`upstreamStatusRestatement.ts`) va provayder
tasniflash qoidalari (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ikkalasi ham provayder identifikatori va matn
markerlariga kalitlanadigan alohida reyestrlardir, lekin ular turli joylarda
ishlaydi va turli maqsadlarga xizmat qiladi: qayta bayon qilish HTTP statusini
`chatCore.ts`da erta bosqichda qayta yozadi; tasniflash qoidalari esa zaxira
`reason`ni tanlaydi va `scope`ni (`model` / `provider` / `connection`)
`checkFallbackError()` ichida qulflaydi (`open-sse/services/accountFallback.ts`).

Tasniflash qoidalari to'liq xato **matnini** faqat
`providerErrorRules.ts`dagi `FULL_TEXT_RULE_PROVIDERS` ruxsat ro'yxatida
keltirilgan provayderlar uchun ko'radi (`额度不足` kabi tana markerlarini
moslashtirish uchun zarur) — hozircha faqat `"agentrouter"`. Boshqa har bir
**o'rnatilgan katalog** provayderi uchun `checkFallbackError`
`getProviderErrorRuleMatch`ga faqat strukturalashgan xatoni (`{code, type}`)
topshiradi, bu sarlavha/status/kodga asoslangan qoidalar uchun yetarli, lekin
tana-matn markerlariga nisbatan ko'rdir. `resolveRuleMatchBody()` yordamchisi
ushbu tanlovni bajaradi: ruxsat ro'yxatiga kiritilgan provayderlar uchun to'liq
xato matni, aks holda strukturalashgan xato. `FULL_TEXT_RULE_PROVIDERS`ga
**o'rnatilgan** provayder qo'shish har bir provayder bo'yicha aniq opt-in'dir —
u ro'yxatda bo'lmagan har bir provayder uchun standart yo'l baytma-bayt
o'zgarmay qolishi uchun mavjud.

Qoidaning `scope`i (`model` / `provider` / `connection`)
`FULL_TEXT_RULE_PROVIDERS`dan alohida opt-in'dir: `checkFallbackError` uni
faqat `fallbackResult.ruleScope` sifatida ochib beradi va quyi oqim
iste'molchilari uni ma'lumot yorlig'idan farqli biror narsa sifatida faqat
xuddi shu fayldagi `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ruxsat ro'yxatidagi
provayderlar uchun hurmat qiladi (`honorsRuleLockScope()` orqali cheklangan —
bugun faqat `"agentrouter"`). Provayder ushbu ruxsat ro'yxatiga kiritilgach,
`scope: "connection"` mosligi aslida nima qilishini bilish uchun yuqoridagi
"Qayta bayon qilingan kvota xatolari" bo'limiga qarang.

**#11104 — operator e'lon qilgan qoidalar ikkala ruxsat ro'yxatini chetlab
o'tadi.** Operator ushbu faylni tahrirlamasdan, ish vaqtida
`settings.providerErrorRules` orqali
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) har bir
provayder uchun qoida e'lon qilishi mumkin. Operator qoidasini
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` ortiga qo'yish —
o'rnatilgan katalog qoidalarining **standart** xatti-harakatini himoya qilish
uchun mo'ljallangan ruxsat ro'yxatlari — sozlamalar mexanizmini u yerda
allaqachon keltirilgan provayderlardan tashqari barcha provayderlar uchun
samarasiz qilib qo'yardi, chunki qoidani e'lon qilishning o'zi allaqachon
operatorning aniq opt-in'idir. `resolveRuleMatchBody()` va
`honorsRuleLockScope()` ikkalasi ham avval `hasOperatorRuleForProvider()`ni
tekshiradi: operator qoidasiga ega provayder xom xato matnini oladi va uning
e'lon qilingan `scope`i hurmat qilinadi, u biror ruxsat ro'yxatida ham
ko'rsatilganmi-yo'q, bundan qat'i nazar.

**Ma'lum bo'shliq — `providerRuleRegistry` HTTP 400 uchun hech qachon
murojaat qilinmaydi.** `checkFallbackError`ning `BAD_REQUEST` tarmog'i 400
statusini to'liq o'zining naqsh massivlari (`accountFallback.ts`dagi
`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` va boshqalar) orqali
tasniflaydi va undan yuqoridagi `configuredRule`/`getProviderErrorRuleMatch`
tarmog'iga yetib borishdan oldin qaytadi. `status: 400`li o'rnatilgan katalog
qoidasi (yoki operator qoidasi) sintaktik jihatdan to'g'ri, lekin hech qachon
ishga tushmaydi. Bugun hech qanday mavjud qoida 400 ni nishonga olmaydi,
shuning uchun ishlab chiqarishda hech narsa ta'sirlanmaydi — lekin kelajakdagi
400 qoidasi avval ushbu tarmoqni o'zgartirishni talab qiladi, bu qoida
qo'shishdan ko'ra kattaroq o'zgarishdir (u naqsh-massiv xatti-harakatiga
allaqachon tayanadigan har bir provayder uchun 400 ni qayta tasniflaydi) va
bitta provayder qoidasini qo'shish doirasidan tashqarida.

### Kvotani notoʻgʻri bildiruvchi yangi gateway qoʻshish

1. `statusRestatementRegistry` da bitta qoida massivini roʻyxatdan oʻtkazing
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers` ni
   provayderga xos saqlang; `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`) bilan toʻqnashadigan umumiy
   inglizcha iboralarni hech qachon qayta ishlatmang.
2. Toʻgʻri qulflash doirasini tanlash uchun ixtiyoriy ravishda
   `open-sse/config/providerErrorRules.ts` faylida (`providerRuleRegistry`)
   tasniflash qoidalarini roʻyxatdan oʻtkazing (hisob boʻylab kvota uchun
   `connection`, har bir modelga xos xatolar uchun `model`). Bu qadam
   production muhitida faqat qoidalari toʻliq xato matnini (body markerlarini)
   talab qiladigan provayderlar uchun kuchga kiradi: provayder
   identifikatorini xuddi shu fayldagi `FULL_TEXT_RULE_PROVIDERS` ga qoʻshing —
   aks holda `checkFallbackError` qoidaga faqat tuzilmaviy `{code, type}`
   xatosini topshiradi va body-matn qoidasi jonli trafikda hech qachon mos
   kelmaydi. Faqat `status`/`headers` boʻyicha mos keladigan qoidalar
   (masalan, Opencode yoki Minimaxniki) uchun bu opt-in talab qilinmaydi.
   Bundan alohida, agar qoida `scope: "connection"` ni eʼlon qilsa va maqsad
   haqiqiy ulanish boʻylab cooldown hamda bir xil soʻrov doirasida combo
   oʻtkazib yuborish boʻlsa (shunchaki axborot beruvchi yorliq emas),
   provayder identifikatorini xuddi shu fayldagi
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ga qoʻshing — aynan shu
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) va
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) ichida
   `isAgentrouterConnectionQuotaScope()` uslubidagi isteʼmolni boshqaradi;
   u boʻlmasa, `scope` baribir `fallbackResult.ruleScope` orqali oqib oʻtadi,
   lekin uni hech narsa amalda qoʻllamaydi.
3. `tests/unit/upstream-status-restatement.test.ts` va
   `tests/unit/agentrouter-error-rules.test.ts` ga oʻxshatib unit testlar
   qoʻshing (jumladan, not-permanent / not-creditsExhausted himoyalari va —
   agar provayderga allowlist kerak boʻlsa — `resolveRuleMatchBody()` toʻliq
   matnni faqat oʻsha provayder uchun qaytarishini tasdiqlovchi test).

`chatCore.ts`, `classifyError` yoki combo ga hech qanday oʻzgarish talab
qilinmaydi.

#### Egress-bucketli qulflash (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` dagi provayderlar (opencode oilasi)
IP-bucketli upstream sifatida qaraladi (opencode bepul darajasi IP-bucketli,
hisob-bucketli emas — #9611 ga qarang): status-429 boʻyicha `quota_exhausted`
**yoki** `rate_limit_exceeded` deb tasniflangan xato, rotatsiya ularni sinab
koʻrishidan oldin, soʻnggi maʼlum egress IP manzili muvaffaqiyatsiz
ulanishniki bilan bir xil boʻlgan har bir allowlisted-oiladagi ulanishni
cooldown holatiga oʻtkazadi — bu N-1 ta oldindan muvaffaqiyatsizligi
kafolatlangan upstream chaqiruvlarini oldini oladi (#10460/#10525 bilan bir
xil sxema). `rate_limit_exceeded` ataylab kiritilgan:
`markAccountUnavailable` yoʻlida opencode-ga xos qoidalar hech qachon mos
kelmaydi (`checkFallbackError` ga headers/body topshirilmaydi, opencode
`FULL_TEXT_RULE_PROVIDERS` da yoʻq), shuning uchun body qismida obuna-kvota
matni ("monthly usage limit reached") boʻlgan 429 `status_429` qoidasiga
yetib borishdan oldin kvota-matn fallbacki (`buildSubscriptionQuotaFallback`,
`accountFallback.ts`; 1 soatlik cooldown) tomonidan `quota_exhausted` deb
tasniflanadi — kvota matnisiz 429 (oddiy rate limiting) esa `status_429`
qoidasi orqali `rate_limit_exceeded` deb tasniflanadi va baribir IP oilasini
cooldown qiladi. Allowlisted provayder uchun IP-bucketli rate limit tugagan
kvota bilan bir xil signaldir. Halol cheklovlar:

- **Best-effort**: qulf ulanishning so'nggi ma'lum `egress_ip` qiymatini
  `proxy_logs` jadvalidan aniqlaydi (24 soatlik oyna, sinxron, keshsiz). Sovuq
  kesh (egress IP hech qachon tekshirilmagan) yoki qator yo'q →
  muvaffaqiyatsiz ulanish baribir branch tomonidan sovitiladi (avvalgidek
  yoziladi), faqat hech qanday sibling qulflanmaydi.
- **Hech qachon yakuniy emas**: cooldown — yangilanib turuvchi kvota oynasi
  (`testStatus: "unavailable"`); doimiy holat IP darajasidagi signaldan hech
  qachon olinmaydi. `disableCooling` ulanishlari branchni butunlay o'tkazib
  yuboradi.
- **Allowlistdagi oila uchun qulf granularligi o'zgaradi**: bu faqatgina
  sibling optimallashtiruvi emas, balki scope o'zgarishi. opencode —
  `passthroughModels` provayderi, shuning uchun bu branchdan oldin 429 har bir
  MODEL bo'yicha blokirovka hosil qilardi; endi u ulanish cooldown'ini hosil
  qiladi — jumladan, umuman siblingsiz yagona ulanish bilan ishlaydigan
  operator uchun ham. Bu aynan opencode qoida jadvali allaqachon to'g'ri deb
  e'lon qilgan granularlik (`scope: "connection"`, `providerErrorRules.ts`),
  lekin hozirgacha hech qachon bajarilmagan, chunki opencode
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ichida emas. Branch muvaffaqiyatsiz
  ulanishning cooldown'i + `backoffLevel`ini o'zi yozadi, ulanish qamrovli
  agentrouter branchini aks ettiradi va qaytadi — model bo'yicha blok va
  quyidagi umumiy yo'lga hech qachon yetib borilmaydi.
- **Combo ham kiritilgan**: agentrouter branchi kabi, bu scope combo
  chaqiruvchisi 429 ga qo'llaydigan `persistUnavailableState`/`isCombo`
  pasaytirishini ataylab e'tiborsiz qoldiradi. Model bo'yicha blokirovka bu
  scope'ning zaifroq shakli emas, balki noto'g'ri birlik: u tugagan IP haqida
  hech narsa aytmaydi, shuning uchun combo rotatsiyasi har bir sibling uchun
  kafolatlangan muvaffaqiyatsiz chaqiruvdan bittasini behuda sarflashda davom
  etardi.
- **Sibling xavfsizligi**: allaqachon yakuniy holatda bo'lgan
  (banned/credits_exhausted) yoki allaqachon uzunroq cooldown'da bo'lgan
  sibling hech qachon ustidan yozilmaydi.
- **Eksklyuziv allowlist**: `EGRESS_BUCKETED_LOCK_PROVIDERS`ni kengaytirish —
  egasining aniq qarori; umumiy wiring yo'q (pattern #10334/#10419). Sibling
  so'rovi shu allowlistni SQL literali sifatida takrorlash o'rniga unga
  bog'lanadi, shuning uchun uni kengaytirish bir qatorlik o'zgarish bo'lib
  qoladi.
- **Egress IP rotatsiyasi, ikkala yo'nalishda**: qidiruv oynasi (24 soat)
  egress-IP kesh TTL'idan (5 daqiqa) ancha keng, shuning uchun "so'nggi
  ma'lum IP" joriy holat emas, balki tarix. Agar ulanishning proxysi oyna
  ichida almashgan bo'lsa, qulf chinakamiga ulashilgan IP'ni **o'tkazib
  yuborishi** mumkin (yozilgan IP — yangi, hali tugamagan) — va simmetrik
  ravishda u tugagan IP'dan shu vaqt ichida almashgan siblingni **sovitishi**
  mumkin. Ikkinchi holatda o'sha sibling bitta cooldown oynasini yo'qotadi;
  ikkalasi ham tarixga asoslangan qidiruvning qabul qilingan best-effort
  cheklovlaridir.
- **Xarajat**: `proxy_logs`ning ikkita cheklangan skanerlashi
  (`idx_pl_timestamp` orqali oyna bo'yicha filtrlangan), faqat 429
  chastotasida. Yangi indeks yo'q (migratsiya 134 YAGNI). O'rtacha hajmdagi
  real trafikli DB nusxasida o'lchangan; yuqori o'tkazuvchanlikka ega
  instansiya xuddi shu oynada mutanosib ravishda ko'proq qator saqlaydi.

---

## Boshqa chidamlilik xususiyatlari

- **20 ta marshrutlash strategiyasi** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) ga qarang.
- **Reset-aware routing** (v3.8.0) — ulanishlarni kvota tiklanish vaqtiga ko'ra ustuvor qiladi.
- **Fon rejimi degradatsiyasi** — Responses API dagi `background: true` ogohlantirish bilan sinxron rejimga tushiriladi.
- **Vositalar limitini dinamik aniqlash** — vosita soni limitiga yetilganda provayderlarni chekintiradi.
- **Favqulodda zaxira mexanizmi (fallback)** — `OMNIROUTE_EMERGENCY_FALLBACK` orqali boshqariladi; operatorlar uni qayta ishga tushirishsiz Feature Flags sahifasidan bekor qilishlari mumkin.

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
