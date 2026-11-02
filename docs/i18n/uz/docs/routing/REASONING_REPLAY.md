# Reasoning Replay Cache (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Haqiqiy manba:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Oxirgi yangilanish:** 2026-06-28 — v3.8.40

OmniRoute fikrlash rejimidagi modellar yaratgan yordamchi `reasoning_content` maʼlumotini yozib oladi va yuqori oqim provayderi talab qilganda uni ko‘p bosqichli so‘rovlarda shaffof tarzda qayta uzatadi. Bu mijozning suhbat tarixida oldingi bosqichga tegishli mulohaza mavjud bo‘lmaganda qatʼiy provayderlar qaytaradigan HTTP 400 xatolarini bartaraf etadi.

## Bu nima uchun mavjud

Fikrlash rejimidagi ayrim provayderlar **oldingi yordamchi xabarida asl `reasoning_content` mavjud bo‘lmasa**, keyingi bosqichni rad etadi. Yuqori oqim quyidagiga o‘xshash xabarlar bilan 400 xatosini qaytaradi:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Ammo odatiy mijozlar (Cursor, Cline, Roo Code, OpenAI SDK) qayta uzatadigan tarixdan `reasoning_content` maʼlumotini olib tashlaydi. OmniRoute yuqori oqim ko‘radigan so‘rov izchil bo‘lishi uchun uni server tomonidagi keshdan tiklaydi. Issue #1628 kesh jarayon qayta ishga tushirilganda ham saqlanib qolishi uchun gibrid xotira/SQLite doimiy saqlash mexanizmini joriy etdi.

## Arxitektura

```
N-burilish (assistant yaratadi):
  → javob reasoning_content + tool_calls ni oʻz ichiga oladi
  → agar requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      har bir tool_call.id boʻyicha kalitlangan holda (xotira + DB) ga yozadi
  → javobni klientga uzatadi (u reasoning maʼlumotini saqlashi ham, saqlamasligi ham mumkin)

N+1-burilish (klient keyingi soʻrovni yuboradi):
  → tarjimon aniqlaydi: requiresReasoningReplay(provider, model) === true
  → tool_calls mavjud, ammo reasoning_content boʻlmagan har bir assistant xabari uchun:
      lookupReasoning(toolCalls[0].id) → xotira → DB
      topildi  → msg.reasoning_content = cached; recordReplay()
      topilmadi → msg.reasoning_content = "" (eski DeepSeek versiyalari uchun avvalgi zaxira mexanizmi)
  → yuqori oqim izchil tarixni koʻradi → 400 xatosi yoʻq
```

Qamrab olish `open-sse/handlers/chatCore.ts` ichida (ikki joyda, yaʼni `cacheReasoningFromAssistantMessage` chaqiriladigan ikkala joyda) amalga oshiriladi. Qayta ijro etish `open-sse/translator/index.ts` ichida sxemaga moslashtirishdan keyin, ammo yuborishdan oldin amalga oshiriladi.

Oddiy (`tool_call` mavjud boʻlmagan) assistant burilishlari boshqacha kalitlanadi: `buildAssistantMessageCacheKey()` sessiya doirasini hamda shu burilishgacha boʻlgan, OpenAI formatiga normallashtirilgan transkriptni xeshlaydi, chunki `tools` mavjud boʻlganda DeepSeek _har bir_ oldingi burilishning reasoning maʼlumotini talab qiladi. Responses-API maqsadlari uchun (masalan, `/responses` manziliga yoʻnaltiriladigan `opencode-go/deepseek-v4-flash`) yuqori oqim tanasi `messages` emas, `input` ni tashiydi, shuning uchun `translateRequest()` (`open-sse/translator/index.ts`) callback opsiyasi orqali oʻzi xeshlagan oraliq transkriptni bildiradi va qamrab olish joylari aynan shu transkriptni xeshlaydi. Responses qayta ijro etish bosqichi har bir manba formati uchun OpenAI oraliq formatida ishlaydi, shu sababli Anthropic Messages klientlari (Claude → OpenAI → Responses) ham qayta ijro etiladi.

## Saqlash — gibrid xotira + SQLite

Tezkor yo‘l nosozlikdan keyin tiklash va boshqaruv panelida ko‘rsatish uchun SQLite jadvali bilan taʼminlangan, xotiradagi `Map` tuzilmasidan (yaratilish vaqti bo‘yicha LRU) foydalanadi.

| Qatlam | Amalga oshirilishi                                   | Maqsad                                                               |
| ------ | ---------------------------------------------------- | -------------------------------------------------------------------- |
| Xotira | `open-sse/services/reasoningCache.ts` ichidagi `Map` | Tezkor qidiruvlar, 200 taga yetganda eng eskisini chiqarib tashlaydi |
| DB     | `reasoning_cache` jadvali (`src/lib/db/`)            | Qayta ishga tushirishlar orasida saqlanadi, statistikani taʼminlaydi |

Yozuvlar har ikkalasiga ham yuboriladi. O‘qish avval xotiradan tekshiradi, so‘ng DB zaxira manba sifatida ishlatiladi (DB dan topilgan yozuvlar qayta xotiraga ko‘tariladi). DB xatolari jiddiy emas — xotiradagi kesh tezkor yo‘lga xizmat ko‘rsatishda davom etadi.

**Standart qiymatlar:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Xotiradagi yozuvlarning maksimal soni: `200` (`MAX_MEMORY_ENTRIES`)
- Chiqarib tashlash: avval eng eski `createdAt`

## Maʼlumotlar bazasi sxemasi

Migratsiya: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

Indekslar: `expires_at`, `provider`, `model`, `created_at`. `expires_at` Unix davri soniyalari sifatida saqlanadi; SELECT qatlami eski matn qiymatlarini `EXPIRES_AT_EPOCH_SQL` orqali meʼyorlashtiradi.

## Provayder / modelni aniqlash

`requiresReasoningReplay(provider, model)` funksiyasi `true` qaytarganda takroriy ijro yoqiladi. Funksiya `open-sse/services/reasoningCache.ts` faylidagi ikkita roʻyxatni tekshiradi.

**Provayder identifikatorlari (aniq moslik, registr hisobga olinmaydi):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**Model uchun regex andozalari (registr hisobga olinmaydi):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` va `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, ixtiyoriy `-free` suffiksi bilan)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Yangi qatʼiy provayder/model qoʻshish uchun uni ushbu roʻyxatlardan biriga qoʻshish va takroriy ijro kiritilishini tasdiqlovchi birlik testini yozish kerak. PR tavsifida oʻzgartirishga sabab boʻlgan yuqori oqimdagi aniq 400 xatosi matni keltirilishi kerak.

## REST API

Kesh `src/app/api/cache/reasoning/route.ts` ostida ikkita endpoint taqdim etadi. Ularning ikkalasi ham boshqaruv autentifikatsiyasini (`@/shared/utils/apiAuth` modulidagi `isAuthenticated`) talab qiladi.

| Metod  | Endpoint                                                  | Tavsif                                                                                                    |
| ------ | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistika + sahifalangan yozuvlar                                                                        |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtrlangan roʻyxat (`limit` `[1, 200]` oraligʻiga cheklanadi)                                            |
| DELETE | `/api/cache/reasoning`                                    | Hammasini (xotira + DB) tozalash va muvaffaqiyatli/muvaffaqiyatsiz topish hisoblagichlarini qayta tiklash |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Faqat bitta provayderga tegishli yozuvlarni tozalash                                                      |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Bitta yozuvni oʻchirish                                                                                   |

**GET javobining tuzilishi:**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## Operatsion qaydlar

- **Tozalash:** `cleanupReasoningCache()` muddati tugagan xotira yozuvlarini oʻchiradi va `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` soʻrovini bajaradi. Holatni tekshirish ishchi jarayonlari buni davriy ravishda chaqiradi.
- **Avariyadan keyingi tiklanish:** Qayta ishga tushirilgandan keyin xotira boʻsh boʻladi, ammo DB hali ham muddati tugamagan yozuvlarni saqlaydi. Berilgan `tool_call_id` uchun birinchi qidiruv DB orqali topiladi; keyingi qidiruvlar xotira orqali topiladi.
- **Mulohaza yoʻq — kesh ham yoʻq:** Assistent xabarida `reasoning_content` / `reasoning` maydoni boʻlmasa, `cacheReasoningFromAssistantMessage` `0` qaytaradi, shuning uchun fikrlashsiz javoblar hech qanday xarajat keltirmaydi.
- **Yozish ham shart bilan boshqariladi:** `chatCore.ts` faylidagi ikkala chaqiruv joyi ham (oqimsiz va oqimli) `cacheReasoningFromAssistantMessage()` funksiyasini faqat `requiresReasoningReplay(provider, model)` `true` boʻlganda chaqiradi — bu oʻqish tomoni tekshiradigan ayni predikatdir. Takroriy ijro provayderidan umuman foydalanmaydigan oʻrnatmalar mulohazani oʻz ichiga olgan har bir javobda yozish, indeksni yangilash va try/catch xarajatlarini boshqa koʻtarmaydi.
- **Qatʼiy boʻlmagan provayderlar:** `requiresReasoningReplay` `false` boʻlsa va maqsadli format OpenAI boʻlsa, tarjimon chiquvchi xabarlardan barcha `reasoning_content` maydonlarini **olib tashlaydi** — OpenAI Chat Completions uni qabul qilmaydi.

## Muse yopiq mulohazasiga egalik

Muse (`muse-code`) chaqiruvchiga bog‘langan yopiq mulohazani (`encrypted_content`) qaytaradi. Uni boshqa hisob yoki qayta berilgan kirish ma’lumoti bilan takrorlash yuqori oqimda ishlamaydi; shu sabab asl OAuth so‘rovlari har so‘rovda aylantirish o‘rniga seans darajasidagi egalikdan foydalanadi (`src/sse/services/museSessionOwnership.ts`, `src/sse/handlers/chat.ts` da majburiy qo‘llanadi). Aniq tanlangan API-kalit ulanishlari va faqat API-kalitli sozlamalar bu egalik rejimisiz mavjud yo‘naltirishni saqlaydi.

- Har navbatda barqaror seans ID’sini bering: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` yoki `x-codex-session-id`; yoki tanada `prompt_cache_key`, `session_id`, `conversation_id` yoki `metadata.session_id` dan foydalaning (shu ustuvorlik tartibida). Ikki yoki undan ortiq asl OAuth hisob faol bo‘lsa, yo‘q yoki bo‘sh ID 400 qaytaradi; bitta OAuth hisobda aylantiriladigan boshqa hisob yo‘q, shuning uchun so‘rov biriktirilmagan yo‘naltirishni saqlaydi. Doiraga chaqiruvchining OmniRoute API-kalit ID’si kiradi.
- Yangi mustaqil seanslar API-kalitning ulanish siyosati ruxsat bergan faol asl OAuth hisoblar orasida ulanish ID’si tartibida navbatma-navbat taqsimlanadi. Navbatlash ulanish kutishidagi, yakuniy holatdagi (`banned`, `expired`, `credits_exhausted`) yoki so‘ralgan model uchun bloklangan hisoblarni o‘tkazib yuboradi; Muse yuqori oqim xatolari boshqa provayderlar kabi kutish va uzgich holatini qayd etadi. Aniq majburiy ulanish yangi seansda navbatlashni chetlab o‘tadi, ammo muvaffaqiyatli javob bergan egani almashtira olmaydi.
- Egasi muvaffaqiyatli javob berguncha, egasi mavjud bo‘lmay qolgan seans sog‘lom hisobga qayta tayinlanadi. Birinchi muvaffaqiyatli javobdan keyin seans 30 kun faoliyatsiz qolguncha o‘sha egaga biriktiriladi (`MUSE_SESSION_IDLE_TTL_MS`).
- Har davom va vosita natijasi navbati seans egasiga biriktirilgan qoladi: ulanish, hisob identifikatori va inferensiya kirish ma’lumotining avlodi; bular yuqori oqim urinishlaridan, jumladan kirish ma’lumoti yangilanganidan keyingi takrorlardan oldin yana tekshiriladi. Responses chaqiruv ID’lari/element havolalari va Chat Completions vosita chaqiruv ID’lari o‘sha seans va avlod uchun qayd etilgan bo‘lishi shart.
- `muse_session_ownership` nom maydonidagi SQLite `key_value` yozuvlari (`src/lib/db/museSessionOwnership.ts`) egalikni va aylantirish kursorini qayta ishga tushirishlar orasida saqlaydi. Har egallash va berilgan javob seans faollik vaqtini yangilaydi; `MUSE_SESSION_IDLE_TTL_MS` dan uzoq faoliyatsiz seans ko‘pi bilan har 10 daqiqada bir marta, chegaralangan guruhlarda tozalanadi (ega biriktirishi, javob berilgan bayrog‘i va qayd etilgan yopiq/havola xeshlari), shunda uning tarixini keyin takrorlash noma’lum ega sifatida xavfsiz rad etiladi. Yozuvlarda ulanish ID’lari va hisob identifikatori, kirish ma’lumoti, yopiq mazmun hamda davom havolalari xeshlari bor; sirlar yoki suhbat tarixi emas. Mijozlar to‘liq tarixi va yopiq mulohazasini saqlab yuborishi kerak.
- Noma’lum yoki begona yopiq mulohaza, yo‘q ega, mavjud bo‘lmagan ega hisobi yoki qayd etilgan tarix bilan avlod o‘zgarishi aniq 4xx/503 orqali xavfsiz rad etiladi; hech qachon hisoblar orasida yashirin o‘tish yoki mulohazani tashlab yuborish bo‘lmaydi.
- Shu hisobning qayta berilgan kaliti faqat seansda takrorlanadigan tarix qayd etilmagan bo‘lsa qabul qilinadi; qayd etilgan seanslar yangidan boshlanguncha xavfsiz rad etilishda davom etadi.
- Bo‘sh yuqori oqim javobi (`upstream_empty_response` / `empty_response`, chaqiruvchiga hech narsa yuborilmagan) o‘sha egada ko‘pi bilan ikki marta, 0.5 s va keyin 1.5 s dan so‘ng takrorlanadi (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Barcha urinishlar bo‘sh bo‘lsa, kutish yoki uzgich belgisiz asl 502 qaytariladi, shuning uchun beqaror javob egani bloklamaydi.
- Barcha `muse-code` so‘rovlari semantik kesh o‘qish va yozishlarini, jumladan oqimli yozishni chetlab o‘tadi; keshlangan yopiq chiqish boshqa seans egasiga o‘ta olmaydi.

Regressiya himoyalari: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` va `tests/unit/chatcore-semantic-cache.test.ts`.

## Shuningdek qarang

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — zanjir uzgichlar, kutish davrlari, model blokirovkalari
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — yuqori oqimdagi 400 xatolarini tashxislash
- Manba: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migratsiya: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API marshruti: `src/app/api/cache/reasoning/route.ts`
- Asl muammo: #1628
