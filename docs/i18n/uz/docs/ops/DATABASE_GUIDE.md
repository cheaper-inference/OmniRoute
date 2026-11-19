# Database Schema & Operations Guide (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Qisqacha**: OmniRoute asosiy maʼlumotlar ombori sifatida **WAL jurnallash bilan SQLite** dan, maxfiy maydonlarni saqlashda esa **AES-256-GCM** shifrlashidan foydalanadi. Ushbu qoʻllanmada sxema, migratsiyalar, zaxiralash/tiklash va operatsion yoʻriqnomalar yoritiladi.

**Manbalar:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 ta asosiy jadval)
- `src/lib/db/migrationRunner.ts` — versiyalangan migratsiyalar
- `src/lib/db/migrations/` — 167 ta versiyalangan SQL fayli
- `src/lib/db/encryption.ts` — shifrlash yordamchi vositalari
- `src/lib/db/backup.ts` — zaxira nusxasini eksport/import qilish
- `src/lib/db/healthCheck.ts` — holat diagnostikasi

---

## Nega SQLite?

OmniRoute bir nechta sababga koʻra PostgreSQL/MySQL oʻrniga SQLiteʼni tanladi:

| Omil                   | SQLite                                       | PostgreSQL                                   |
| ---------------------- | -------------------------------------------- | -------------------------------------------- |
| **Joylashtirish**      | Ichki — alohida server talab qilinmaydi      | Serverni sozlash talab qilinadi              |
| **Shifrlash**          | Ilova qatlami (AES-256-GCM)                  | Ichki TDE                                    |
| **Unumdorlik**         | Kichik/oʻrta ish yuklari uchun tezroq        | Juda katta parallel yozuvlar uchun yaxshiroq |
| **Parallellik**        | WAL rejimi parallel oʻqishga imkon beradi    | Toʻliq MVCC                                  |
| **Zaxiralash**         | Bitta faylni nusxalash                       | `pg_dump` yoki fayl tizimi oniy nusxasi      |
| **Foydalanish holati** | Har bir foydalanuvchi uchun oʻrnatish, ichki | Koʻp ijarachili SaaS                         |

**Bitta foydalanuvchili, bitta nusxali** joylashtirishlar (OmniRouteʼning asosiy foydalanish holati) uchun SQLite sodda va tezroq.

### WAL jurnallash

`core.ts` maʼlumotlar bazasini **WAL (oldindan yozish jurnali) rejimida** ochadi:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL yozish vaqtida **parallel oʻqishlarga** imkon beradi — bu soʻrovlar qayd etilayotgan paytda soʻrov yuboradigan boshqaruv paneli uchun muhim.

Standart kesh hajmi **65,536 KiB (64 MiB)**. SQLite manfiy
`cache_size` qiymatini KiBʼdagi taxminiy yuqori chegara sifatida talqin qiladi va sahifalarni talabga qarab ajratadi.
**Sozlamalar > Tizim va xotira > Kesh hajmi** boʻlimi **1 dan
1,000,000 KiB** gacha boʻlgan butun sonlarni qabul qiladi; sozlamani saqlash uni ishlayotgan maʼlumotlar bazasi ulanishiga qoʻllaydi,
OmniRoute esa saqlangan qiymatni ishga tushirish vaqtida tiklaydi.

---

## Maʼlumotlar bazasi joylashuvi

SQLite fayli quyidagi manzilda saqlanadi:

| OT      | Yoʻl                                                     |
| ------- | -------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                            |
| macOS   | `~/.omniroute/storage.sqlite`                            |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                |
| Docker  | `/app/data/storage.sqlite` (`DATA_DIR` orqali sozlanadi) |

Yordamchi fayllar:

- `storage.sqlite-wal` — oldindan yozish jurnali
- `storage.sqlite-shm` — umumiy xotira fayli
- `call_logs/` — soʻrov yuklamasi artefaktlari (agar yoqilgan boʻlsa)

**Joylashuvni almashtirish:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Domen moduli arxitekturasi

OmniRoute ma’lumotlar bazasida `src/lib/db/` ichida **110 ta yuqori darajadagi TypeScript moduli** mavjud. Har bir domen moduli:

- Bir yoki bir nechta muayyan jadvalga egalik qiladi
- Tiplashtirilgan CRUD funksiyalarini eksport qiladi
- Boshqa modul jadvallariga hech qachon bevosita murojaat qilmaydi
- Ma’lumotlar bazasiga kirish uchun `core.ts` ichidagi `getDbInstance()` funksiyasidan foydalanadi

### Yuqori darajadagi 110 ta ma’lumotlar bazasi moduli

OmniRoute’da `src/lib/db/` ichida **110 ta yuqori darajadagi TypeScript fayli** mavjud. Quyida asosiy modullardan ayrimlari keltirilgan; to‘liq ro‘yxat uchun katalog tarkibiga qarang:

| Modul                   | Jadvallar                                                      | Vazifasi                                                                                   |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | OAuth/API kaliti provayderlarini ro‘yxatdan o‘tkazish va hisob ma’lumotlari                |
| `models.ts`             | `key_value` (model ma’lumotlari)                               | Model ta’riflari, imkoniyatlari va narxlari                                                |
| `combos.ts`             | `combos`                                                       | Kombinatsiyali marshrutlash konfiguratsiyalari va tartiblash                               |
| `apiKeys.ts`            | `api_keys`                                                     | API kalitlarining hayot sikli, qamrovlari va kvotalarni kuzatish                           |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Tizim konfiguratsiyasi va umumiy KV ombori                                                 |
| `backup.ts`             | —                                                              | Zaxira nusxasini eksport/import qilish amallari                                            |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Proksi konfiguratsiyalari va marshrutlash qoidalari                                        |
| `prompts.ts`            | `prompt_templates`                                             | Qayta foydalaniladigan prompt shablonlari va versiyalash                                   |
| `webhooks.ts`           | `webhooks`                                                     | Hodisalarga asoslangan webhook obunalari va jurnallari                                     |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Har bir so‘rov bo‘yicha audit jurnali (ixtiyoriy, katta hajmli)                            |
| `domainState.ts`        | `domain_*` (5 ta jadval)                                       | Domen budjetlari, avtomatik uzgichlar, bloklashlar, zaxira zanjirlari va xarajatlar tarixi |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A uchun ruxsat etilgan API kalitlari                                                 |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Kvotadan foydalanish tarixi                                                                |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Modellarni standart kombinatsiyalarga moslashtirish                                        |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI’ga xos doimiy holat                                                                    |
| `encryption.ts`         | —                                                              | Maydonlarni shifrlash/deshifrlash uchun yordamchi vositalar                                |
| `readCache.ts`          | —                                                              | O‘qish amallari ko‘p bo‘lgan holatlar uchun xotira ichidagi kesh                           |
| `secrets.ts`            | `key_value` (shifrlangan yozuvlar)                             | Shifrlangan maxfiy ma’lumotlar ombori                                                      |
| `stateReset.ts`         | —                                                              | Sinov uchun ma’lumotlar bazasi holatini tozalash/qayta o‘rnatish                           |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Agentga topshirish uchun seans konteksti                                                   |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Foydalanishni kuzatish                                                                     |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Siqish konfiguratsiyasi                                                                    |

### Modul chegaralari

Asosiy arxitektura qoidasi: **modullar bir-birining jadvallariga to‘g‘ridan-to‘g‘ri murojaat qilmaydi**. Boshqa modul ma’lumotlari bilan ishlash uchun o‘sha moduldagi funksiyani import qiling.

```ts
// ❌ NOTO‘G‘RI: boshqa modulga tegishli jadvalga to‘g‘ridan-to‘g‘ri SQL so‘rovi
db.prepare("SELECT * FROM provider_connections").all();

// ✅ TO‘G‘RI: providers moduli funksiyasidan foydalaning
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Bu qoida kodni ko‘rib chiqish jarayonida nazorat qilinadi — statik tekshiruv mavjud emas, ammo qoida buzilishlari belgilab qo‘yiladi.

---

## Asosiy sxema (17 ta jadval)

`core.ts` fayli `SCHEMA_SQL` ichidagi 17 ta asosiy jadvalni belgilaydi. Ular `001_initial_schema.sql` migratsiyasi orqali yaratiladi va asosiy sxemani tashkil etadi.

### Asosiy jadvallar (dastlabki migratsiyada yaratiladi)

| Jadval                     | Vazifasi                                       | Asosiy ustunlar                                                         |
| -------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Provayder hisob maʼlumotlari (shifrlangan)     | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Provayder tugunining marshrutlash maʼlumotlari | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Umumiy KV ombori                               | `namespace`, `key`, `value`                                             |
| `combos`                   | Marshrutlash kombinatsiyasi taʼriflari         | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Shlyuz uchun API kalitlari                     | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Maʼlumotlar bazasi metamaʼlumotlari            | `key`, `value`                                                          |
| `usage_history`            | Soʻrovlardan foydalanish yozuvlari             | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Soʻrov yuklamalari va javoblar                 | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Proksi soʻrovlari jurnali                      | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Modeldan provayderga oʻtish zanjirlari         | `model`, `chain`                                                        |
| `domain_budgets`           | Har bir domen uchun xarajat budjeti            | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Budjetni tiklash tarixi                        | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Har bir domen boʻyicha xarajatlarni kuzatish   | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Domen tezlik cheklovi holati                   | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Har bir domen uchun zanjir uzgich holati       | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM javoblari keshi                            | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Kvotaning tarixiy oniy tasvirlari              | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Qoʻshimcha jadvallar (keyingi migratsiyalarda qoʻshilgan)

Keyingi migratsiyalar quyidagi jadvallarni qoʻshadi:

- `cli_tool_state` (011-migratsiya) — CLI vositasi holati
- `mcp_*` jadvallari — MCP serveri auditi
- `a2a_*` jadvallari — A2A vazifasi holati
- `usage_*` jadvallari — foydalanishni kuzatish
- `plugin_*` jadvallari — plagin tizimi
- `skill_executions` — koʻnikmalarni bajarish tarixi
- `memory_*` jadvallari — xotira tizimi
- `compression_*` jadvallari — siqish tizimi
- `webhook_*` jadvallari — webhook yetkazib berish jurnali
- `acp_*` jadvallari — Agent Client Protocol
- `oneproxy_*` jadvallari — 1proxy marketpleysi
- `proxy_assignments` — proksi doirasi bogʻlanishlari
- `detailed_call_artifacts` — chaqiruv jurnali artefaktlari metamaʼlumotlari
- `quota_alert_history` — kvota ogohlantirishlari auditi
- `command_code_auth_sessions` — Command Code OAuth seanslari

Taxminan 30 dan ortiq jadvallarning toʻliq roʻyxati `src/lib/db/migrations/` ichida joylashgan.

---

## Migratsiya

OmniRoute foydalanadi** versiyali, idempotent migratsiya** `src/lib/db/migrations/` ichida. Har bir migratsiya bitta SQL faylidir. Ikki nomlash formati birga mavjud; `_omniroute_migrations` da yozilgan versiya raqamli prefiksdir.

### Migratsiya nomi

| Format                                              | Misol                                | uchun ishlatiladi                                                                                                                                                          |
| --------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (aniq 3 ta raqam)             | `241_seen_models.sql`                | Qadimgi `001` seriyasi –`241`. Vaqt tamg'asi formati tushganda muzlatilgan (`240` va `241` undan oldin birlashtirilgan): hech qanday yangi fayl ketma-ket raqamni olmaydi. |
| `YYYYMMDDHHMMSS_description.sql` (14 ta raqam, UTC) | `20261113120000_add_usage_index.sql` | Har bir migratsiya 2026-11-13 dan boshlab yaratilgan.                                                                                                                      |

Nima uchun o'zgarish: ketma-ket raqamlar bilan parallel PRs bir xil keyingi raqamni tanladi va birlashmasidan oldin hammasini qayta raqamlash kerak edi. UTC vaqt tamg'asi har bir PR o'z versiyasini beradi.

Vaqt tamg'asi formati qoidalari ( `npm run check:migration-numbering` tomonidan amalga oshirilgan, `scripts/check/lib/migrationNaming.mjs` da generator bilan birgalikda):

- Vaqt tamg'asi haqiqiy UTC sanasi va vaqti bo'lib, `20261113000000` dan oldin emas va kelajakda 10 daqiqadan oshmasligi kerak.
- Tavsif harf bilan boshlanadigan kichik `snake_case` (`a-z`, `0-9`, so'zlar orasidagi bitta `_` ), ko'pi bilan 80 belgidan iborat.
- Bir xil vaqt tamg'asi bo'lgan ikkita fayl dublikatdir.
- Bo'shliqsiz qoida faqat eski qatorlarga taalluqlidir: `001` dan `241` gacha bo'lgan har bir raqam mavjud bo'lishi kerak, ma'lum bo'lgan `026`, `055` va `121` bo'shliqlaridan tashqari. `241` (yoki har qanday eski fayl) o'chirilsa, darvoza ishlamay qoladi. `001` va `241` hech qachon `KNOWN_GAPS` ruxsat etilgan ro'yxatga qo'shilmaydi. Vaqt tamg'asi bo'lgan fayllar hech qachon bo'shliq yaratmaydi.
- `src/lib/db/migrations/` -dagi har bir yozuv haqiqiy kichik `.sql` nomiga ega oddiy fayl bo'lishi kerak. Katalog, simli havola, `.SQL` yoki `.sql.bak` fayli, yashirin fayl yoki bo'sh joy bo'lgan nom darvozani ishlamay qoldiradi, chunki yuguruvchi uni jimgina o'tkazib yuboradi yoki yuklash paytida ishdan chiqadi.

**Buyurtmani qo'llash.** Yuguruvchi matn bo'yicha emas, balki prefiksning raqamli qiymati bo'yicha saralaydi: avval eski `001`–`241` fayllari, so'ngra vaqt tamg'asi tartibida vaqt tamg'asi bo'lgan fayllar, so'ngra `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` bilan ro'yxatdan o'tgan har qanday nom oralig'i kataloglari ( `ee-001` kabi versiyalar). Kutilayotgan migratsiya - bu versiyasi `_omniroute_migrations` ichida bo'lmagan har qanday fayl, shuning uchun yangisidan keyin birlashtirilgan eski filialdan ko'chirish mavjud ma'lumotlar bazalarida hamon amal qiladi.

**Vaqt tamg'asi birlashtirish tartibi emas, balki yaratish tartibidir.** Agar migratsiyangiz a bilan migratsiya orqali yaratilgan jadval yoki ustunga bog'liq bo'lsa** yangiroq** vaqt tamg'asi (masalan, birinchi bo'lib birlashtirilgan boshqa PR dan biri), yangi ma'lumotlar bazasi birinchi navbatda sizniki ishlaydi va muvaffaqiyatsiz bo'ladi. Sizning PR hali ochiq bo'lsa-da, fayl nomini `npm run db:new-migration` bilan qayta yarating, shunda u yangiroq vaqt tamg'asi oladi yoki uni mustaqil qilib qo'ying. `npm run test:migrations:fresh` har bir migratsiyani bo'sh ma'lumotlar bazasiga qo'llaydi va buni ushlaydi.

### Birlashtirilgan migratsiya hech qachon o'chirilmaydi yoki nomi o'zgartirilmaydi

Migratsiya fayli reliz bo'limida yoki `main` bo'lsa, u allaqachon homolog va ishlab chiquvchi ma'lumotlar bazalarida, VPS o'rnatishlarida va Enterprise sinxronlashida ishlagan. Shu vaqtdan boshlab:

- **Hech qachon o'chirmang.** Yangilangan o'rnatishlar sxemasini yo'qotadi, yangilangan ma'lumotlar bazasi esa uni saqlaydi.
- **Hech qachon nomini o'zgartirmang.** `_omniroute_migrations` versiyasi endi faylga mos kelmaydi, shuning uchun uni qo'llagan har bir ma'lumotlar bazasi uni qayta ishga tushiradi. Non-idempotent SQL keyin ma'lumotlarni takrorlaydi yoki yuklashni to'xtatadi.
- **Boshqa sxema kerakmi?** `npm run db:new-migration` bilan yangi migratsiya yarating.

Nomini o'zgartirish faqat hali birlashtirilmagan fayl uchun xavfsizdir, bu esa darvoza maslahatlarida ko'rsatilgan. Chiqarish yorlig'i bu erda hech narsani o'zgartirmaydi: `release/v*` filialiga har bir surish Docker `:next` tasvirini nashr etadi va homolog, VPS o'rnatish va Enterprise sinxronlashda ishlaydi, shuning uchun birlashtirilgan migratsiya har qanday `vX.Y.Z` tegi mavjud bo'lgunga qadar haqiqiy ma'lumotlar bazalarida amalga oshirildi. Darvoza asosiy faylni har bir o'chirishda muvaffaqiyatsiz bo'ladi, teglangan yoki yo'q.

- **Birlashtirilgan migratsiyani qaytarish.** Faylni o'chirib tashlaydigan `git revert` eshikni buzadi. Faylni saqlang va uning sxemasini yangi migratsiyada bekor qiling: `npm run db:new-migration -- <description>`, `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` va boshqalar bilan. Yangilangan va yangi ma'lumotlar bazalari bir xil sxema bilan tugaydi.
- **Qabul qilingan nomni o'zgartirish: moslik yozuvi va bir xil tarkib.** Agar birlashtirilgan fayl harakatlanishi kerak bo'lsa (masalan, ikkita birlashtirilgan fayl vaqt tamg'asini taqsimlasa va chopuvchi versiya to'qnashuvi bilan to'xtasa), keyingisining nomini uning SQL tegmasdan o'zgartiring va `src/lib/db/migrationRunner/constants.ts` dagi `{ fromVersion, fromName, toVersion, toName }` ga `RENAMED_MIGRATION_COMPATIBILITY` qo'shing. Eski versiyani qo'llagan ma'lumotlar bazalari faylni qayta ishga tushirish o'rniga o'zlarining `_omniroute_migrations` qatoriga ko'chiriladi. Darvoza bunday nomni o'zgartirish haqida ogohlantiradi va har doim yangi vaqt tamg'asi qanday bo'lishidan qat'i nazar, almashtirish tekshiruvini o'tkazadi: yangi o'rnatishlar faylni yangi holatda qo'llaydi, yangilangan ma'lumotlar bazalari esa qo'llamaydi, shuning uchun eskisiga yaqin yangi vaqt tamg'asini tanlang. Kontent o'zgargan bo'lsa (sxema o'zgarishi hali ham yangi migratsiyada davom etadi) yoki yozuvning maqsadli fayli diskda bo'lmasa, darvoza nomini o'zgartira olmaydi.
- **Hech qachon bir xil vaqt tamg'asi ichida nomini o'zgartirmang.** Vaqt tamg'asini saqlaydigan va faqat tavsifni o'zgartiradigan nomni o'zgartirish, kirish bilan yoki kiritmasdan, darvoza ishlamay qoladi. `toVersion` `fromVersion` ga teng bo'lgan yozuv bilan yuguruvchi eski `_omniroute_migrations` qatorini o'chiradi va faylni uni ishga tushirgan har bir ma'lumotlar bazasida yana qo'llaydi. Yozuvsiz yuguruvchi faqat versiyani kuzatadi: u maʼlumotlar bazalaridagi faylni oʻtkazib yuboradi (yangi kontent u yerda hech qachon ishlamaydi) va har bir yuklashda qayta raqamlash xatosini qayd qiladi. Boshqa vaqt tamg'asi va moslik yozuvidan foydalaning yoki ismni saqlang.
- **Darvoza qayta nomlangan fayl qayta ishlamayotganligini tekshiradi.** Har bir qoplangan qayta nomlash uchun darvoza yangi fayl nomini `--must-not-apply` bilan kommutatsiya tekshiruviga o'tkazadi. Tekshiruv yangilangan ma'lumotlar bazasini haqiqiy yuguruvchi bilan ishga tushiradi va agar yuguruvchi yana ushbu faylni qo'llasa (masalan, yozuv noto'g'ri versiya yoki nomga ega bo'lgani uchun yoki darvoza matn tahlilchisi `constants.ts` TypeScript dan farqli o'qiganligi sababli), darvoza `migration renomeada rodaria de novo` bilan ishlamay qoladi va yozuvning eski va yangi versiyalari va nomlarini tekshirishingizni so'raydi.

### Darvoza bazaga qarshi nimani tekshiradi

Pull so'rovi va birlashma navbati bajarilganda, `npm run check:migration-numbering` diskdagi `src/lib/db/migrations/` asosiy filialdagi bir xil katalog bilan taqqoslaydi. Asos, bu tartibda: `--base-latest-tag`, `--base <ref>`, `MIGRATION_BASE_REF` o‘zgaruvchisi yoki `GITHUB_EVENT_NAME` `pull_request` bo‘lsa, `pull_request_target` yoki `merge_group` bo‘lsa, birlashtirish majburiyatining birinchi ota-onasi, hodisaning foydali yuki `merge_group.base_sha` yoki `git merge-base HEAD origin/$GITHUB_BASE_REF`. Yechish mumkin bo'lmagan asossiz tortishish so'rovida yoki birlashma navbatida darvoza ishlamay qoladi. `--base` CI tashqarisida u `comparação com a base: pulada (sem --base)` chop qiladi va bu qoidalarni o'tkazib yuboradi.

`--base-latest-tag` `--base` bilan bir xil qoidalar bilan `HEAD` tarixidagi eng yangi nashr tegi (semver tartibida `vX.Y.Z` ; tungi kunlar kabi qo‘shimchali teglar hisobga olinmaydi) bilan solishtiradi. Release-Green (`scripts/quality/validate-release-green.mjs`) darvozani shu tarzda boshqaradi, chunki surish va rejalashtirilgan yugurishlarda tortish so‘rovi asosi yo‘q va birlashma yangi CI yugurishsiz qo‘nishi mumkin. Tarixda hech qanday reliz yorlig'i bo'lmasa, darvoza ishlamay qoladi; `git fetch --tags` ishga tushirish ( CI da, `fetch-depth: 0` bilan `actions/checkout` teglarni olib keladi).

| O'chirish so'roviga o'zgartirish                                                                                       | Natija                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bazada mavjud bo'lgan fayl nomi `RENAMED_MIGRATION_COMPATIBILITY` yozuvi bilan o'zgartiriladi                          | **Ogohlantirish** agar tarkib bir xil bo'lsa va kommutatsiya tekshiruvi yangi vaqt tamg'asidan qat'i nazar ishlaydi; Agar yangi pozitsiya yakuniy sxemani o'zgartirsa (nomini o'zgartirishni bekor qiling yoki u harakatlanadigan joyda boshqa yangi vaqt tamg'asini tanlang) yoki yuguruvchi yangilangan ma'lumotlar bazasida qayta nomlangan faylni qo'llasa, bu muvaffaqiyatsiz tugaydi.** Muvaffaqiyatsiz** agar tarkib o'zgargan bo'lsa. |
| Bazada mavjud bo'lgan fayl vaqt tamg'asi bilan qayta nomlanadi (faqat tavsif o'zgaradi)                                | **Muvaffaqiyatsiz** , yozuvli yoki yozuvsiz: yuguruvchi uni qayta qo'llaydi (kirish bilan) yoki uni versiya bo'yicha (bittasiz) o'tkazib yuboradi. Boshqa vaqt tamg'asi va moslik yozuvidan foydalaning yoki ismni saqlang.                                                                                                                                                                                                                   |
| Bazada mavjud bo'lgan fayl o'chiriladi yoki yozuvsiz qayta nomlanadi                                                   | **Muvaffaqiyatsiz** , fayl reliz tegida bo'ladimi yoki yo'qmi. Uni bekor qilish uchun faylni `git checkout <base> -- src/lib/db/migrations/<file>` bilan tiklang; uning sxemasini qaytarish uchun `DROP ... IF EXISTS` bilan yangi migratsiya qo'shing.                                                                                                                                                                                       |
| Bazada mavjud bo'lgan fayl turli xil tarkibga ega                                                                      | **Ogohlantirish** ( GitHub Actions da `::warning` izohi) va kommutatsiya tekshiruvi ishlaydi. Tahrirlash yakuniy sxemani o'zgartirsa, u bajarilmaydi, chunki yangilangan ma'lumotlar bazalari tahrirlangan faylni qayta qo'llamaydi: o'zgartirishni yangi migratsiyaga qo'ying. Zararsiz tahrir (sharh, `IF NOT EXISTS`) faqat ogohlantiradi.                                                                                                 |
| Vaqt tamg'asi bo'lgan fayl bazaning eng yangisidan yangi bo'lmagan vaqt tamg'asi bilan qo'shiladi                      | Quyida tavsiflangan kommutatsiya tekshiruvini boshqaradi.                                                                                                                                                                                                                                                                                                                                                                                     |
| Eski formatdagi `NNN_` fayli bazaning eng yangi eski formatdagi fayli ostidagi raqam bilan qo'shiladi                  | **Muvaffaqiyatsiz** , `KNOWN_GAPS` bir xil tortish so'rovida tahrirlangan bo'lsa ham: eski seriyalar muzlatilgan, migratsiyani `npm run db:new-migration` bilan yarating. Bazaning eng yangisi ustidagi eski formatdagi fayllar ( `release/v*` to `main` pull so'rovi) qabul qilinadi.                                                                                                                                                        |
| Tartibsiz, tahrirlangan yoki nomi oʻzgartirilgan faylda `INSERT`, `UPDATE`, `DELETE` yoki `REPLACE` bayonotlari mavjud | **Ogohlantirish** : kommutatsiya tekshiruvi ma'lumotlarni taqqoslamaydi, shuning uchun yangilangan va yangi ma'lumotlar bazalarini qo'llash tartibi natijani o'zgartiradimi yoki yo'qligini ko'rib chiqing.                                                                                                                                                                                                                                   |

Kommutatsiya tekshiruvining bir bosqichi tartibsiz, tahrirlangan va qayta nomlangan fayllarni birgalikda qamrab oladi.

Kommutatsiya tekshiruvi (`scripts/check/migration-commutation.ts`) haqiqiy o'rnatish yo'li bilan ikkita vaqtinchalik ma'lumotlar bazasini yaratadi: an** yangilangan** biri (asosiy migratsiyalar bilan yuklash, so'ngra tortib olish so'rovi ko'chishlari bilan bir xil faylda qayta yuklash) va** yangi** bitta (tortishish so'rovining ko'chishi bilan bitta yuklash). Olingan sxemalarni solishtiradi: jadvallar va ustunlar (ustun tartibini e'tiborsiz qoldirish), UNIQUE / PRIMARY KEY va FOREIGN KEY cheklovlari, har bir jadvalning normallashtirilgan `CREATE TABLE` matni ( CHECK cheklovlarini, har birini, yaratilgan ustunlarni va jadval variantlarini qamrab oladi), indekslar, triggerlar va ko'rinishlar. Qator ma'lumotlari solishtirilmaydi. Agar ular mos kelsa, shlyuz faylning tartibsiz ekanligini, lekin ish yo'nalishini bosib o'tadi va o'tadi. Agar ular bir-biridan farq qilsa, darvoza farq va ish uchun maslahat bilan muvaffaqiyatsiz bo'ladi: tartibsiz fayl uchun uning nomini `npm run db:new-migration` bilan qayta yarating, bu fayl hali birlashtirilmaganligi sababli xavfsizdir; tahrirlangan asosiy fayl uchun asosiy tarkibni tiklang va o'zgartirishni yangi migratsiyaga qo'ying; nomi o'zgartirilgan fayl uchun, nomini o'zgartirishni bekor qiling yoki u harakatlanadigan joyda boshqa yangi vaqt tamg'asini tanlang, hech qachon boshqa nom bilan bir xil vaqt tamg'asi bo'lmaydi. Tekshirishning o'zi ishlamasa, darvoza CI da ishlamay qoladi va faqat mahalliy sifatida ogohlantiradi. Tahrirlangan asosiy fayl uchun yangilangan ma'lumotlar bazasi ushbu faylning asosiy tarkibi bilan tuziladi va ikkinchi yuklash uni o'tkazib yuboradi, chunki uning versiyasi allaqachon yozilgan. Nomi o'zgartirilgan fayl uchun yangilangan ma'lumotlar bazasi eski nomi ostidagi fayl bilan tuziladi va ikkinchi yuklash uni qayta ishga tushirish o'rniga moslik yozuvi orqali o'zining `_omniroute_migrations` qatorini siljitadi; darvoza yangi nomni `--must-not-apply` bilan o'tkazadi, shuning uchun ikkinchi yuklash uni qo'llasa, tekshirish muvaffaqiyatsiz tugadi. Agar tortish so'rovi migratsiyasi yangilangan yo'lda qo'llanilmasa, ya'ni har bir baza migratsiyasidan keyin (yangi o'rnatishda ham muvaffaqiyatsiz bo'ladimi yoki yo'qmi), darvoza `migration do PR não aplica` haqida xabar beradi va sizdan SQL bazaning joriy sxemasiga nisbatan tuzatishingizni so'raydi; agar fayl keyingi vaqt tamg'asi bilan boshqa tortishish so'rovi migratsiyasiga bog'liq bo'lsa, uning nomini `npm run db:new-migration` bilan qayta yarating.

Xuddi shu taqqoslashni mahalliy sifatida ishlatish uchun bazani aniq o'tkazing, masalan `npm run check:migration-numbering -- --base origin/<base-branch>` yoki `npm run check:migration-numbering -- --base-latest-tag` so'nggi versiya bilan solishtiring.

### Ochiq PR ning `NNN` Migratsiyasini aylantirish

Kalitdan oldin ochilgan tortishish so'rovi hali ham `242_add_widgets.sql` kabi ketma-ket faylni olib yurishi mumkin. `241` dan yuqori eski raqamlar rad etilgan, shuning uchun ularni birlashtirishdan oldin aylantiring:

1. **Tavsifni saqlab, generator bilan fayl nomini o'zgartiring.** Yangi nomni olish uchun `npm run db:new-migration -- <same description>` ishga tushiring, SQL ni unga ko'chiring va eski `NNN_` faylini o'chiring. Tavsif bir xil bo'lishi kerak: quyida keltirilgan muvofiqlik yozuvi unga mos keladi.
2. **Agar doimiy ma'lumotlar bazasi eski raqamni ishlatsa, moslik yozuvini qo'shing.** Agar saqlangan ma'lumotlar bazasi (homolog, VPS, hissa qo'shuvchining shaxsiy o'rnatishi) `NNN_` fayli bilan PR tuzilishini ishga tushirgan bo'lsa, `src/lib/db/migrationRunner/constants.ts` dagi `RENAMED_MIGRATION_COMPATIBILITY` ga `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` qo'shing. Bu** `237` dan `241` gacha bo'lishi uchun zarur** : bu uyalar endi kanonik `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` va `241_seen_models.sql` ni ushlab turadi va bunday ma'lumotlar bazasi kirishsiz kanonik migratsiyani abadiy o'tkazib yuboradi va o'zgartirilganni qayta ishga tushiradi. Shuningdek, u bo'sh qoladigan uyalar uchun ham ishlaydi, masalan, `242`, maqsad vaqt tamg'asi bo'lsa. Agar shubhangiz bo'lsa, kirishni qo'shing. Uni massivga qayerga qo‘shishingiz muhim emas: agar yozuvning maqsadli uyasi hali ham boshqa yozuv uzoqlashadigan qatorni ushlab tursa (masalan `237` PR qatorini ushlab turganda, eski `usage_history_calculated_cost` qatori `237` ga o‘tishni kutayotganda), yuguruvchi bu yozuvni slot bo‘shguncha kutishga ruxsat beradi. Faqat haqiqiy ziddiyat, masalan, bir qatorda hech qanday kirish harakatlanmaydigan uyasi yoki o'rinlarni almashtiradigan ikkita yozuv, `Cannot reconcile ...` bilan yuklashni to'xtatadi.
3. **SQL idempotent saqlang** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), chunki aylantirilgan migratsiya uning sxemasi allaqachon mavjud bo'lgan ma'lumotlar bazasiga mos kelishi mumkin.
4. **Versiya kalitli maxsus holatlarni ko'chiring.** Agar PR o'zining eski raqamiga `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) yoki `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`) da registr qo'shgan bo'lsa, kalitni yangi vaqt tamg'asiga o'zgartiring.

`tests/unit/db/codex-fence-migration-rename.test.ts` qayta nomlangan migratsiya uchun sinovning amaliy namunasidir.

### O'tishdan oldin filiallarga qaytish

Hech qachon `YYYYMMDDHHMMSS_` faylini kommutatordan oldingi filialga (masalan, eski `release/v*` filiali) cherry-pick yoki backport qilmang. U yerdagi yuguruvchi fayl nomlarini matn sifatida saralaydi, shuning uchun vaqt tamg'asi bo'lgan fayl yangi ma'lumotlar bazasida `201_` va `202_` o'rtasida ishlaydi va u erdagi eski darvoza 14 xonali prefikslarni tushunmaydi. Bunday filialda o'zgartirishni o'sha filialning navbatdagi `NNN_` fayli sifatida yozing, idempotent, shuning uchun vaqt tamg'asi versiyasi keyinroq kelganda, u no-op hisoblanadi.

### Migratsiya qanday amalga oshiriladi

Ishga tushganda, `migrationRunner.ts`:

1. Agar mavjud bo'lmasa, `_omniroute_migrations` jadvalini yaratadi
2. Allaqachon qo'llanilgan migratsiya uchun so'rovlar
3. Har bir tranzaksiyada har qanday yangi migratsiyalarni tartibda qo'llaydi
4. Har bir qo'llaniladigan migratsiyani vaqt tamg'asi bilan yozib oladi

```ts
// src/lib/db/migrationRunner.ts (simplified)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### Idroksizlik

Migratsiya bo'lishi kerak** idempotent** — ularni ikki marta ishga tushirish no-op bo'lishi kerak:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`, `IF EXISTS` va `OR IGNORE` / `OR REPLACE` bandlaridan erkin foydalaning.

### Yangi migratsiya qo'shish

1. **Faylni generator bilan yarating** : `npm run db:new-migration -- <description>` (masalan, `npm run db:new-migration -- add combo priority`). U joriy UTC vaqti va sharh sarlavhasi bilan `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` yozadi, agar vaqt tamg'asi olinsa, bir soniya oldinga siljiydi va hech qachon faylni qayta yozmaydi. Raqamni qo'lda tanlamang.
2. **Xavfsiz DDL dan foydalaning** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Ma'lumotlarni ehtiyotkorlik bilan to'ldiring** : mavjud qatorlarni boshqarish uchun `UPDATE ... WHERE ...` foydalaning
4. **Buyurtma va nomlashni tekshiring** : `npm run test:migrations:fresh` (bo'sh ma'lumotlar bazasidagi barcha migratsiya) va `npm run check:migration-numbering`
5. **Nusxada sinov** : ishlab chiqarishda hech qachon sinovdan o'tmagan migratsiyalarni amalga oshirmang

Misol:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Orqaga mos kelmaydigan o'zgarishlar** (masalan, ustunlarni tushirish) qiyin. OmniRoute migratsiya qo‘llanilgach, NOT — pasaytirishni qo‘llab-quvvatlaydi, sxema o‘zgarishi doimiy bo‘ladi. Shunga ko'ra rejalashtirish.

---

## Saqlangan maʼlumotlarni shifrlash

Maxfiy maydonlar (API kalitlari, OAuth tokenlari, ulanish satrlari) saqlash vaqtida **AES-256-GCM** yordamida shifrlanadi.

### Bu qanday ishlaydi

```ts
// src/lib/db/encryption.ts (soddalashtirilgan)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Qayerlarda ishlatiladi

- `provider_connections.api_key` — ilova darajasida shifrlanadi
- `provider_connections.access_token`, `refresh_token`, `id_token` — ilova darajasida shifrlanadi
- `namespace = "secrets"` boʻlgan `key_value` yozuvlari — ilova darajasida shifrlanadi
- `proxy_registry.auth` — ilova darajasida shifrlanadi (agar mavjud boʻlsa)

### Shifrlash kaliti

Shifrlash kaliti **maxfiy ibora** (`STORAGE_ENCRYPTION_KEY` muhit oʻzgaruvchisi orqali oʻrnatiladi) va **salt** (maʼlumotlar bazasida saqlanadi) asosida hosil qilinadi. Maʼlumotlarni shifrdan chiqarish uchun ikkalasi ham talab qilinadi.

```bash
# Xavfsiz maxfiy iborani yarating
openssl rand -hex 32

# .env faylida o‘rnating
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Juda muhim**: Shifrlash kalitini yoʻqotish barcha shifrlangan maʼlumotlarga kirish imkoniyatini yoʻqotishni anglatadi. **Kalitning zaxira nusxasini maʼlumotlar bazasidan alohida saqlang**.

### Nimalar shifrlanmaydi

Unumdorlik nuqtayi nazaridan quyidagilar oddiy matn koʻrinishida saqlanadi:

- Provayderlarning koʻrsatiladigan nomlari
- Model taʼriflari (allaqachon ochiq)
- Marshrutlash qoidalari
- Foydalanish qaydlari (shaxsni identifikatsiyalashga imkon beruvchi maʼlumotlarsiz)

---

## Shifrlashga oid ogohlantirishlar (v3.8.16+)

OmniRoute ikkita shifrlash sxemasini shaffof tarzda boshqarish uchun **`migrateLegacyEncryptedString()`** funksiyasidan foydalanadi:

- **Eski** (v3.5.0 dan oldingi): XOR asosidagi „shifrlash“ (haqiqiy kriptografiya emas)
- **Joriy**: tegishli IV va autentifikatsiya tegiga ega AES-256-GCM

Migratsiya yordamchisi eski formatni aniqlaydi va birinchi o‘qishda yangi sxema bilan qayta shifrlaydi. Bu hisobga olish ma’lumotlarini yo‘qotmasdan eski ma’lumotlar bazasini yangilashingiz mumkinligini anglatadi.

---

## O‘qish keshi

Tez-tez o‘qiladigan ma’lumotlar (modellar, provayderlar, sozlamalar) uchun `readCache.ts` **xotira ichidagi keshni** taqdim etadi:

```ts
// Ishga tushganda keshlanadi, yozishda bekor qilinadi
const providers = await getCachedProviders(); // Tez, xotira ichida
const fresh = await listProviders(); // Sekin, ma’lumotlar bazasiga murojaat qiladi
```

| Keshlangan obyekt      | Kesh kaliti    | TTL         |
| ---------------------- | -------------- | ----------- |
| `models`               | `models:v1`    | Yozishgacha |
| `provider_connections` | `providers:v1` | Yozishgacha |
| `settings`             | `settings:v1`  | Yozishgacha |
| `combos`               | `combos:v1`    | Yozishgacha |

Tegishli jadvalga har safar yozilganda kesh bekor qilinadi.

---

## Zaxiralash va tiklash

### Qo‘lda zaxiralash

```bash
# Mahalliy zaxira nusxasini yaratish uchun CLI’dan foydalaning
omniroute backup create --name pre-migration

# Yoki API orqali
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Zaxira fayli quyidagilarni o‘z ichiga oladi:

- Barcha ma’lumotlar bazasi jadvallari (JSON formatiga serializatsiya qilingan)
- Chaqiruv jurnali artefaktlari (base64 formatida kodlangan, ixtiyoriy)
- Sozlamalar + maxfiy ma’lumotlar (shifrlangan)
- Plagin konfiguratsiyasi

### Tiklash

```bash
# CLI orqali
omniroute restore pre-migration

# API orqali
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Ogohlantirish**: Tiklash butun ma’lumotlar bazasining ustiga yozadi. Avval barcha mijozlarni to‘xtating.

### Avtomatlashtirilgan zaxiralash

```bash
# CLI orqali avtomatik kundalik zaxiralashni yoqing
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Jadval server tomonida har 30 soniyada (standart qiymat) ishga tushadigan va cron ifodasini serverning mahalliy vaqtiga nisbatan baholaydigan fon vazifasi tomonidan bajariladi.

| O‘zgaruvchi                                 | Standart qiymat | Tavsif                                                                                                                                       |
| ------------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`         | Millisekundlardagi ishga tushish oralig‘i (eng kami `5000`). Mos cron daqiqasiga ishonchli tushishi uchun 60 soniyadan qisqa bo‘lishi kerak. |

### SQLite ishlayotgan paytdagi zaxira nusxasi

Ishlayotgan ma’lumotlar bazasini to‘xtalishsiz zaxiralash uchun:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Bu SQLite’ning onlayn zaxiralash API’sidan foydalanadi — OmniRoute ishlab turgan paytda bajarish xavfsiz.

---

## Ishlashni sozlash

### WAL rejimi

WAL sukut bo'yicha yoqilgan. Yuqori yozish yuklari uchun quyidagilarni ko'rib chiqing:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute `journal_size_limit` o'rnatmaydi. Tekshirish nuqtasi WAL freymlarini asosiy faylga o'tkazadi, lekin WAL fayli o'zining eng katta ajratilgan hajmini saqlaydi. `OMNIROUTE_WAL_GUARD_MAX_MB` qo'riqchisi faqat ogohlantiradi va `wal_checkpoint(RESTART)` ishlaydi; bu disk o'lchamidagi qopqoq emas.

### Indekslar

Ishlash uchun asosiy indekslar (migratsiya orqali avtomatik yaratilgan):

- `idx_models_provider` — modeli provayder tomonidan qidiriladi
- `idx_combo_targets_combo_id` — birlashgan maqsadli kengaytirish
- `idx_usage_history_api_key_timestamp` — foydalanish tahlili
- `idx_quota_snapshots_api_key_window` — kvotasini kuzatish
- `idx_call_logs_timestamp` — qo'ng'iroqlar jurnali so'rovlari

Yangi indeks qo'shish uchun migratsiya yarating:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Xotira xaritasi I/O

Juda katta ma'lumotlar bazalari uchun (> 10GB), xotira xaritasini SQLite pragma orqali sozlash mumkin:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Siqilish

Uzoq muddatli OmniRoute misollari vaqti-vaqti bilan `VACUUM` dan foyda oladi:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Har oyda trafik kam bo'lgan oynalarda ishga tushiring. (WAL rejimi ehtiyojni kamaytiradi, lekin uni yo'q qilmaydi.)

---

## Holatni tekshirish

`src/lib/db/healthCheck.ts` **maʼlumotlar bazasi darajasidagi holat diagnostikasini** taqdim etadi:

Har ikkala HTTP metodi autentifikatsiyani talab qiladi (aks holda `401`). `GET` faqat diagnostika qiladi; `POST` esa
xuddi shu tekshiruvni `autoRepair` yoqilgan holda bajaradi.

```bash
GET  /api/db/health   # diagnostika qilish
POST /api/db/health   # diagnostika qilish + tuzatish
```

Javob `runDbHealthCheck()` tomonidan yaratilgan `DbHealthCheckResult`
(`src/lib/db/healthCheck.ts`) hisoblanadi:

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Domain budgets referenced API keys that no longer exist.",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| Maydon            | Maʼnosi                                                                                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `isHealthy`       | `issues` boʻsh boʻlganda `true`. `driver` unga hech qachon taʼsir qilmaydi.                                                                                              |
| `issues[].type`   | `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state` qiymatlaridan biri.                                                                      |
| `repairedCount`   | Ushbu ishga tushirish davomida tuzatilgan qatorlar; `autoRepair` false boʻlganda har doim `0`.                                                                           |
| `backupCreated`   | Tuzatishdan oldin zaxira nusxasi yaratilgan-yaratilmaganligi.                                                                                                            |
| `checkedAt`       | Ishga tushirish va u yozadigan har qanday tuzatish qaydi uchun umumiy boʻlgan ISO vaqt tamgʻasi.                                                                         |
| `driver.name`     | Tekshirilgan maʼlumotlar bazasiga xizmat koʻrsatuvchi SQLite drayveri.                                                                                                   |
| `driver.degraded` | Yozuvlar maʼlumotlar bazasi fayli bilan doimiy tarzda himoyalanmaganda `true` — `sql.js` WASM zaxira varianti (butun faylni saqlash) yoki xotiradagi maʼlumotlar bazasi. |

Xuddi shu foydali yuklama `omniroute_db_health_check` MCP vositasi tomonidan qaytariladi.

Buzilishlarni aniqlash uchun `PRAGMA integrity_check` buyrugʻini ishga tushiring:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Quyidagini chiqarishi kerak: ok
```

Agar u `ok` dan boshqa natija qaytarsa, **maʼlumotlar bazasidan foydalanishni darhol toʻxtating** va uni zaxira nusxasidan tiklang.

---

## Favqulodda holatdan tiklash

### 1-holat: WAL fayli yoʻqolgan

`-wal` fayli yoʻq, ammo `-shm` va asosiy maʼlumotlar bazasi shikastlanmagan:

```bash
# Keyingi ochishda avtomatik ravishda tiklanadi
omniroute
```

Agar SQLite avtomatik ravishda tiklay olmasa:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### 2-holat: Asosiy maʼlumotlar bazasi fayli buzilgan

Zaxira nusxasidan tiklang:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` faqat ishlab turgan serverdan toʻliq `.tar.gz` arxivini yuklab oladi
(`GET /api/db-backups/exportAll`, operator hisob maʼlumotlari talab qilinadi); u hech narsani tiklamaydi.

### 3-holat: Shifrlash kaliti yoʻqolgan

Kalitsiz **tiklashning iloji yoʻq**. Shifrlangan maydonlarni oʻqib boʻlmaydi. Barcha provayderlarni yangi hisob maʼlumotlari bilan qoʻlda qayta qoʻshing.

> **Oldini olish chorasi**: Shifrlash kalitining zaxira nusxasini har doim alohida, yaxshisi parollar menejeri yoki KMS tizimida saqlang.

### 4-holat: Disk toʻlgan

SQLite `SQLITE_FULL` xatolarini qaytaradi. Diskda joy boʻshating, soʻng quyidagini bajaring:

```bash
# Joy bo'shatish uchun WAL nazorat nuqtasini yarating
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Keng tarqalgan amallar

### Jadvalni tekshirish

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Barcha jadvallardagi qatorlarni sanash

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Barcha maʼlumotlarni tiklash (tozalash)

```bash
# Avval OmniRouteʼni toʻxtating
omniroute stop

# Maʼlumotlar bazasi faylini oʻchiring
rm ~/.omniroute/storage.sqlite*

# Qayta ishga tushiring (boʻsh maʼlumotlar bazasini qayta yaratadi)
omniroute
```

**Tanlab** tiklash uchun (provayderlarni saqlab qolib, foydalanish maʼlumotlarini tozalash):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Bitta jadvalni eksport qilish

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Muammolarni bartaraf etish

### "Maʼlumotlar bazasi qulflangan"

Boshqa jarayon yozish qulfini ushlab turibdi. Quyidagilardan birini bajaring:

- Boshqa jarayon tugashini kuting (`lsof | grep storage.sqlite` orqali tekshiring)
- Boshqa jarayonni majburan toʻxtating
- Muammo davom etsa, OmniRouteʼni qayta ishga tushiring

### "Tashqi kalit cheklovi bajarilmadi"

Domen moduli havolalar yaxlitligini buzmoqda. Quyidagilarni tekshiring:

- Bogʻliq jadvallardagi yetim qatorlar
- Tarqalmagan kaskadli oʻchirishlar
- Tashqi kalitni oʻzgartirgan soʻnggi migratsiya

Buzilishlarni topish uchun `PRAGMA foreign_key_check;` buyrugʻini bajaring.

### "Xotira yetarli emas"

SQLiteʼning xotiraga akslantirilgan kiritish-chiqarish hajmi operatsion tizim cheklovidan oshmoqda. Uni SQLite pragma orqali kamaytiring:

```sql
PRAGMA mmap_size = 134217728;  -- 256MB oʻrniga 128MB
```

Yoki oʻchirib qoʻying:

```sql
PRAGMA mmap_size = 0;
```

### "Migratsiya jarayonning oʻrtasida muvaffaqiyatsiz tugadi"

Migratsiya tranzaksiya ichida bajarilgan, shuning uchun oʻzgarishlar ortga qaytarilgan boʻlishi kerak. Aks holda:

1. **OmniRouteʼni toʻxtating** (keyingi urinishlarning oldini oling)
2. `sqlite3` yordamida **maʼlumotlar bazasi holatini tekshiring**
3. Qisman bajarilgan migratsiyani **qoʻlda tuzating**
4. OmniRouteʼni **qayta ishga tushiring** (migratsiya qayta bajariladi)

Buning oldini olish uchun migratsiyalarni har doim avval nusxada sinab koʻring.

---

## Shuningdek qarang

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — foydalanish jadvallari
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — holat monitoringi
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — reliz jarayoni
- Manba: `src/lib/db/` (80 dan ortiq fayl, ~25K kod qatori)
