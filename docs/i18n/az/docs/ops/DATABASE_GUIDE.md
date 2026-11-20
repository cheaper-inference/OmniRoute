# Database Schema & Operations Guide (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Qısa xülasə**: OmniRoute əsas məlumat anbarı kimi **WAL jurnallaşdırması ilə SQLite** istifadə edir və həssas sahələr saxlanma zamanı **AES-256-GCM** ilə şifrələnir. Bu təlimatda sxem, miqrasiyalar, ehtiyat nüsxələmə/bərpa və əməliyyat təlimatları əhatə olunur.

**Mənbələr:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 əsas cədvəl)
- `src/lib/db/migrationRunner.ts` — versiyalaşdırılmış miqrasiyalar
- `src/lib/db/migrations/` — 167 versiyalaşdırılmış SQL faylı
- `src/lib/db/encryption.ts` — şifrələmə köməkçiləri
- `src/lib/db/backup.ts` — ehtiyat nüsxənin ixracı/idxalı
- `src/lib/db/healthCheck.ts` — sağlamlıq diaqnostikası

---

## Niyə SQLite?

OmniRoute bir neçə səbəbə görə PostgreSQL/MySQL əvəzinə SQLite seçib:

| Amil                   | SQLite                                   | PostgreSQL                                       |
| ---------------------- | ---------------------------------------- | ------------------------------------------------ |
| **Yerləşdirmə**        | Daxili — ayrıca server tələb etmir       | Server quraşdırılması tələb edir                 |
| **Şifrələmə**          | Tətbiq səviyyəsində (AES-256-GCM)        | Daxili TDE                                       |
| **Məhsuldarlıq**       | Kiçik/orta iş yükləri üçün daha sürətli  | Böyük həcmli paralel yazmalar üçün daha yaxşıdır |
| **Paralellik**         | WAL rejimi paralel oxumalara imkan verir | Tam MVCC                                         |
| **Ehtiyat nüsxə**      | Tək faylın kopyalanması                  | `pg_dump` və ya fayl sistemi anlıq görüntüsü     |
| **İstifadə ssenarisi** | Hər istifadəçi üçün quraşdırma, daxili   | Çoxicarəçili SaaS                                |

**Tək istifadəçili, tək instanslı** yerləşdirmələr (OmniRoute-un əsas istifadə ssenarisi) üçün SQLite daha sadə və sürətlidir.

### WAL jurnallaşdırması

`core.ts` verilənlər bazasını **WAL (qabaqcadan yazma jurnalı) rejimində** açır:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL yazma zamanı **paralel oxumalara** imkan verir — bu, sorğular qeydə alınarkən məlumatları sorğulayan idarə paneli üçün vacibdir.

Standart keş ölçüsü **65,536 KiB (64 MiB)** təşkil edir. SQLite mənfi
`cache_size` dəyərini KiB ilə təxmini yuxarı hədd kimi şərh edir və səhifələri tələb olunduqca ayırır.
**Parametrlər > Sistem və yaddaş > Keş ölçüsü** bölməsi **1-dən
1,000,000 KiB-dək** tam ədəd dəyərləri qəbul edir; parametrin yadda saxlanması onu aktiv verilənlər bazası bağlantısına tətbiq edir,
OmniRoute isə saxlanılmış dəyəri başlanğıc zamanı bərpa edir.

---

## Verilənlər bazasının yeri

SQLite faylı burada saxlanılır:

| ƏS      | Yol                                                                          |
| ------- | ---------------------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                                |
| macOS   | `~/.omniroute/storage.sqlite`                                                |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                                    |
| Docker  | `/app/data/storage.sqlite` (`DATA_DIR` vasitəsilə konfiqurasiya edilə bilər) |

Əlaqəli fayllar:

- `storage.sqlite-wal` — qabaqcadan yazma jurnalı
- `storage.sqlite-shm` — ortaq yaddaş faylı
- `call_logs/` — sorğu faydalı yükü artefaktları (aktivləşdirildiyi halda)

**Yeri dəyişdirin:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Domen Modulu Arxitekturası

OmniRoute-un verilənlər bazasında `src/lib/db/` daxilində **110 üst səviyyəli TypeScript modulu** var. Hər bir domen modulu:

- Bir və ya daha çox konkret cədvələ sahibdir
- Tipləşdirilmiş CRUD funksiyalarını ixrac edir
- Heç vaxt başqa modulun cədvəllərinə toxunmur
- Verilənlər bazasına daxil olmaq üçün `core.ts` faylındakı `getDbInstance()` funksiyasından istifadə edir

### 110 Üst Səviyyəli Verilənlər Bazası Modulu

OmniRoute-un `src/lib/db/` daxilində **110 üst səviyyəli TypeScript faylı** var. Aşağıda əsas modullardan bəziləri göstərilib; tam siyahı üçün qovluq siyahısına baxın:

| Modul                   | Cədvəllər                                                      | Məsuliyyət                                                                               |
| ----------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API açarı provayderinin qeydiyyatı və giriş məlumatları                            |
| `models.ts`             | `key_value` (model məlumatları)                                | Model tərifləri, imkanları və qiymətləri                                                 |
| `combos.ts`             | `combos`                                                       | Kombinasiya marşrutlaşdırma konfiqurasiyaları və sıralama                                |
| `apiKeys.ts`            | `api_keys`                                                     | API açarlarının həyat dövrü, əhatə dairələri və kvota izlənməsi                          |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Sistem konfiqurasiyası və ortaq KV yaddaşı                                               |
| `backup.ts`             | —                                                              | Ehtiyat nüsxənin ixracı/idxalı əməliyyatları                                             |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Proksi konfiqurasiyaları və marşrutlaşdırma qaydaları                                    |
| `prompts.ts`            | `prompt_templates`                                             | Təkrar istifadə edilə bilən sorğu şablonları və versiyalaşdırma                          |
| `webhooks.ts`           | `webhooks`                                                     | Hadisə əsaslı vebhuk abunəlikləri və jurnalları                                          |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Hər sorğu üzrə audit jurnallaşdırması (ixtiyari, yüksək həcmli)                          |
| `domainState.ts`        | `domain_*` (5 cədvəl)                                          | Domen büdcələri, dövrə açarları, bloklamalar, ehtiyat keçid zəncirləri və xərc tarixçəsi |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A üçün icazə siyahısına daxil edilmiş API açarları                                 |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Tarixi kvota istifadəsi                                                                  |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Modellərin standart kombinasiyalarla əlaqələndirilməsi                                   |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI-yə xas davamlı vəziyyət                                                              |
| `encryption.ts`         | —                                                              | Sahələrin şifrələnməsi/deşifrələnməsi üçün köməkçi funksiyalar                           |
| `readCache.ts`          | —                                                              | Oxuma intensiv əməliyyatlar üçün yaddaşdaxili keş                                        |
| `secrets.ts`            | `key_value` (şifrələnmiş qeydlər)                              | Şifrələnmiş məxfi məlumatların saxlanması                                                |
| `stateReset.ts`         | —                                                              | Sınaq üçün verilənlər bazası vəziyyətinin silinməsi/sıfırlanması                         |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Agent ötürməsi üçün sessiya konteksti                                                    |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | İstifadənin izlənməsi                                                                    |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Sıxılma konfiqurasiyası                                                                  |

### Modul Sərhədləri

Əsas arxitektura qaydası: **modullar bir-birinin cədvəllərinə birbaşa daxil olmur**. Başqa modulun məlumatları ilə işləmək üçün həmin moduldan funksiyanı idxal edin.

```ts
// ❌ YANLIŞ: başqa moduldan birbaşa SQL sorğusu
db.prepare("SELECT * FROM provider_connections").all();

// ✅ DÜZGÜN: providers modulunun funksiyasından istifadə edin
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Bu qaydanın tətbiqi kod yoxlaması vasitəsilə təmin edilir — statik yoxlama yoxdur, lakin pozuntular işarələnir.

---

## Əsas sxem (17 cədvəl)

`core.ts` faylı `SCHEMA_SQL` daxilindəki 17 əsas cədvəli müəyyən edir. Bunlar `001_initial_schema.sql` miqrasiyası tərəfindən yaradılır və əsas sxemi təşkil edir.

### Əsas cədvəllər (ilkin miqrasiya zamanı yaradılır)

| Cədvəl                     | Təyinatı                                  | Əsas sütunlar                                                           |
| -------------------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Provayder giriş məlumatları (şifrələnmiş) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Provayder qovşaqlarının marşrut məlumatı  | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Ümumi KV yaddaşı                          | `namespace`, `key`, `value`                                             |
| `combos`                   | Marşrutlaşdırma kombinasiyalarının tərifi | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Şlüz üçün API açarları                    | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Verilənlər bazasının metaməlumatları      | `key`, `value`                                                          |
| `usage_history`            | Sorğu istifadəsi qeydləri                 | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Sorğu faydalı yükləri və cavabları        | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Proksi sorğularının jurnalları            | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Modeldən provayderə keçid zəncirləri      | `model`, `chain`                                                        |
| `domain_budgets`           | Domen üzrə xərc büdcələri                 | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Büdcə sıfırlama tarixçəsi                 | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Domen üzrə xərclərin izlənməsi            | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Domenin sürət məhdudiyyəti vəziyyəti      | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Domen üzrə dövrə açarının vəziyyəti       | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM cavab keşi                            | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Tarixi kvota anlıq görüntüləri            | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Əlavə cədvəllər (sonrakı miqrasiyalarla əlavə edilib)

Sonrakı miqrasiyalar aşağıdakı kimi cədvəllər əlavə edir:

- `cli_tool_state` (miqrasiya 011) — CLI alətinin vəziyyəti
- `mcp_*` cədvəlləri — MCP server auditi
- `a2a_*` cədvəlləri — A2A tapşırıq vəziyyəti
- `usage_*` cədvəlləri — istifadənin izlənməsi
- `plugin_*` cədvəlləri — plagin sistemi
- `skill_executions` — bacarıqların icra tarixçəsi
- `memory_*` cədvəlləri — yaddaş sistemi
- `compression_*` cədvəlləri — sıxılma sistemi
- `webhook_*` cədvəlləri — webhook çatdırılma jurnalı
- `acp_*` cədvəlləri — Agent Müştəri Protokolu
- `oneproxy_*` cədvəlləri — 1proxy bazarı
- `proxy_assignments` — proksi əhatə dairəsi əlaqələndirmələri
- `detailed_call_artifacts` — çağırış jurnalı artefaktlarının metaməlumatları
- `quota_alert_history` — kvota xəbərdarlıqlarının auditi
- `command_code_auth_sessions` — Command Code OAuth sessiyaları

Təxminən 30-dan çox cədvəlin tam siyahısı `src/lib/db/migrations/` daxilindədir.

---

## Miqrasiyalar

OmniRoute istifadə edir** versiyalı, idempotent köçlər** `src/lib/db/migrations/`. Hər bir köçürmə tək SQL faylıdır. İki adlandırma formatı birlikdə mövcuddur; `_omniroute_migrations` -də qeydə alınan versiya rəqəmli prefiksdir.

### Miqrasiya Adlandırma

| Format                                           | Misal                                | üçün istifadə olunur                                                                                                                                           |
| ------------------------------------------------ | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (dəqiq 3 rəqəm)            | `241_seen_models.sql`                | Köhnə seriya `001`–`241`. Vaxt damğası formatı endikdə dondurulub (`240` və `241` ondan bir qədər əvvəl birləşdirilib): heç bir yeni fayl ardıcıl nömrə almır. |
| `YYYYMMDDHHMMSS_description.sql` (14 rəqəm, UTC) | `20261113120000_add_usage_index.sql` | 2026-11-13 tarixindən yaranan hər miqrasiya.                                                                                                                   |

Dəyişiklik niyə: ardıcıl nömrələrlə paralel PRs eyni növbəti nömrəni seçdi və birindən başqa hamısı birləşmədən əvvəl yenidən nömrələnməlidir. UTC vaxt damgası hər PR öz versiyasını verir.

Vaxt damğası formatı üçün qaydalar ( `npm run check:migration-numbering` tərəfindən tətbiq edilir, `scripts/check/lib/migrationNaming.mjs`-də generatorla paylaşılır):

- Vaxt möhürü `20261113000000` dən tez olmayan və gələcəkdə 10 dəqiqədən çox olmayan real UTC tarixi və vaxtıdır.
- Təsvir `snake_case` hərfi ilə başlayan kiçik hərflə (`a-z`, `0-9`, sözlər arasında tək `_` ), ən çoxu 80 simvoldan ibarətdir.
- Eyni vaxt damğası olan iki fayl dublikatdır.
- Qeyri-boşluq qaydası yalnız köhnə sıralara aiddir: `026`, `055` və `121` məlum boşluqlar istisna olmaqla, `001` -dan `241` ə qədər hər bir ədəd mövcud olmalıdır. `241` (və ya hər hansı köhnə fayl) silinməsi qapını uğursuz edir. `001` və `241` heç vaxt `KNOWN_GAPS` icazə siyahısına əlavə edilə bilməz. Vaxt damğası olan fayllar heç vaxt boşluq yaratmır.
- `src/lib/db/migrations/` -dakı hər giriş etibarlı kiçik hərf `.sql` adı olan adi fayl olmalıdır. Kataloq, simvolik keçid, `.SQL` və ya `.sql.bak` faylı, gizli fayl və ya boşluqlu ad qapıdan keçmir, çünki qaçışçı onu səssizcə ötürər və ya açılış zamanı qəzaya uğrayar.

**Sifariş tətbiq edin.** Qaçışçı mətnə görə deyil, prefiksin ədədi dəyərinə görə çeşidləyir: əvvəlcə köhnə `001`–`241` faylları, sonra zaman damğası sırası ilə zaman damğası qoyulmuş fayllar, sonra `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` ilə qeydiyyatdan keçmiş istənilən ad boşluqlu qovluqlar ( `ee-001` kimi versiyalar). Gözləyən miqrasiya versiyası `_omniroute_migrations`-də olmayan hər hansı bir fayldır, ona görə də yenisindən sonra birləşən köhnə filialdan miqrasiya hələ də mövcud verilənlər bazalarına tətbiq edilir.

**Vaxt möhürü birləşmə qaydası deyil, yaradılış sırasıdır.** Əgər miqrasiyanız a ilə miqrasiya tərəfindən yaradılmış cədvəl və ya sütundan asılıdırsa** daha yeni** vaxt damgası (məsələn, birinci birləşən digər PR dan biri), təzə verilənlər bazası əvvəlcə sizinkini işlədəcək və uğursuz olacaq. Sizin PR hələ açıq olsa da, fayl adını `npm run db:new-migration` ilə bərpa edin ki, o, daha yeni vaxt damğası əldə etsin və ya onu müstəqil edin. `npm run test:migrations:fresh` hər miqrasiyanı boş verilənlər bazasına tətbiq edir və bunu tutur.

### Birləşdirilmiş miqrasiya heç vaxt silinmir və ya adı dəyişdirilmir

Miqrasiya faylı buraxılış filialında və ya `main` da olduqdan sonra o, artıq homolog və developer verilənlər bazalarında, VPS quraşdırmalarında və Enterprise sinxronizasiyasında işləmişdir. Bundan sonra:

- **Heç vaxt silməyin.** Təkmilləşdirilmiş verilənlər bazası onu saxlayarkən təzə quraşdırmalar öz sxemini itirəcək.
- **Heç vaxt adını dəyişməyin.** `_omniroute_migrations` -dakı versiya artıq fayla uyğun gəlməyəcək, ona görə də onu tətbiq etmiş hər bir verilənlər bazası onu yenidən işə salacaq. Qeyri-idempotent SQL sonra məlumatları təkrarlayır və ya yükləməni dayandırır.
- **Fərqli bir sxemə ehtiyacınız varmı?** `npm run db:new-migration` ilə yeni miqrasiya yaradın.

Adının dəyişdirilməsi yalnız hələ birləşdirilməmiş fayl üçün təhlükəsizdir, bu da qapının göstərişlərinə istinad edir. Buraxılış teqi burada heç nəyi dəyişmir: `release/v*` filialına edilən hər təkan Docker `:next` şəklini dərc edir və homolog, VPS quraşdırmaları və Enterprise sinxronizasiyası üzərində işləyir, beləliklə, hər hansı `vX.Y.Z` teqi mövcud olmamışdan əvvəl birləşdirilmiş miqrasiya real verilənlər bazalarında həyata keçirilir. Qapı, işarələnmiş və ya olmayan əsas faylın hər silinməsində uğursuz olur.

- **Birləşdirilmiş miqrasiyanın geri qaytarılması.** Faylı silən `git revert` qapını uğursuz edir. Faylı saxlayın və onun sxemini yeni köçürmədə geri alın: `npm run db:new-migration -- <description>`, `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` və s. ilə. Təkmilləşdirilmiş və təzə verilənlər bazaları daha sonra eyni sxemlə bitir.
- **Qəbul edilən bir ad dəyişdirmə: uyğunluq girişi və eyni məzmun.** Birləşdirilmiş fayl hərəkət etməlidirsə (məsələn, iki birləşdirilmiş fayl vaxt damğasını paylaşır və qaçışçı versiyanın toqquşması ilə dayanırsa), SQL toxunmadan sonrakının adını dəyişdirin və `src/lib/db/migrationRunner/constants.ts`-də `RENAMED_MIGRATION_COMPATIBILITY` -ə `{ fromVersion, fromName, toVersion, toName }` əlavə edin. Köhnə versiyanı tətbiq edən verilənlər bazası faylı yenidən işə salmaq əvəzinə öz `_omniroute_migrations` sırasını köçürür. Qapı belə bir ad dəyişdirmə barədə xəbərdarlıq edir və yeni vaxt damğası nə olursa olsun, həmişə onun üzərində kommutasiya yoxlamasını həyata keçirir: təzə quraşdırmalar faylı yeni mövqeyində tətbiq edir, təkmilləşdirilmiş verilənlər bazası tətbiq etmir, ona görə də köhnənin yanında yeni vaxt damğası seçin. Məzmun dəyişdirildikdə (sxem dəyişikliyi hələ də yeni miqrasiyada gedir) və ya girişin hədəf faylı diskdə deyilsə, qapı adını dəyişdirə bilmir.
- **Heç vaxt eyni vaxt damğası daxilində adını dəyişməyin.** Vaxt möhürünü saxlayan və yalnız təsviri dəyişən adının dəyişdirilməsi, girişlə və ya giriş olmadan darvazadan keçmir. `toVersion` `fromVersion` ə bərabər olan girişlə qaçışçı köhnə `_omniroute_migrations` cərgəsini silir və faylı artıq işləmiş hər bir verilənlər bazasında yenidən tətbiq edir. Giriş olmadan, qaçışçı yalnız versiyanı izləyir: o, həmin verilənlər bazasındakı faylı atlayır (yeni məzmun heç vaxt orada işləmir) və hər açılışda nömrələmə xətası qeyd edir. Başqa vaxt damğası və uyğunluq qeydindən istifadə edin və ya adı saxlayın.
- **Qapı adı dəyişdirilmiş faylın yenidən işləmədiyini yoxlayır.** Hər əhatə olunmuş adının dəyişdirilməsi üçün qapı yeni fayl adını `--must-not-apply` ilə kommutasiya yoxlamasına keçir. Çek təkmilləşdirilmiş verilənlər bazasını real qaçışçı ilə yükləyir və qaçışçı həmin faylı yenidən tətbiq edərsə (məsələn, girişin yanlış versiyası və ya adı olduğu üçün və ya darvazanın mətn təhlilçisi `constants.ts` TypeScript-dən fərqli oxuduğu üçün), qapı `migration renomeada rodaria de novo` ilə uğursuz olur və sizdən girişin köhnə və yeni versiyalarını və adlarını yoxlamağı xahiş edir.

### Qapının bazaya qarşı yoxladığı şey

Çəkmə sorğusu və birləşmə növbəsi işlərində `npm run check:migration-numbering` diskdəki `src/lib/db/migrations/` baza filialındakı eyni kataloqla müqayisə edir. Baza bu qaydadadır: `--base-latest-tag`, `--base <ref>`, `MIGRATION_BASE_REF` dəyişəni və ya `GITHUB_EVENT_NAME` `pull_request` olduqda, `pull_request_target` və ya `merge_group`, birləşmənin ilk valideyni, hadisənin faydalı yükünün `merge_group.base_sha` və ya `git merge-base HEAD origin/$GITHUB_BASE_REF`. Çəkmə sorğusunda və ya həll edilə bilən bazası olmayan birləşmə növbəsində qapı uğursuz olur. `--base` olmadan CI xaricində `comparação com a base: pulada (sem --base)` çap edir və bu qaydaları atlayır.

`--base-latest-tag` `--base` ilə eyni qaydalarla `HEAD` tarixində olan ən yeni buraxılış teqi (semver qaydasında `vX.Y.Z` ; gecələr kimi şəkilçi teqlər sayılmır) ilə müqayisə edir. Release-Green (`scripts/quality/validate-release-green.mjs`) qapını bu şəkildə idarə edir, çünki təkan və planlaşdırılmış qaçışların çəkmə sorğusu bazası yoxdur və birləşmə təzə CI qaçışı olmadan enə bilər. Tarixdə heç bir buraxılış etiketi olmadan darvaza uğursuz olur; `git fetch --tags` çalıştırın ( CI də , `fetch-depth: 0` ilə `actions/checkout` teqləri gətirir).

| Çəkmə sorğusunda dəyişiklik edin                                                                                          | Nəticə                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Bazada mövcud olan faylın adı `RENAMED_MIGRATION_COMPATIBILITY` girişi ilə dəyişdirilir                                   | **Xəbərdarlıq** məzmun eynidirsə və kommutasiya yoxlanışı yeni vaxt damğasından asılı olmayaraq işləyirsə; yeni mövqe son sxemi dəyişərsə (adını dəyişdirin və ya onun işlədiyi yerdə başqa yeni vaxt damğası seçin) və ya qaçışçı yenidən adı dəyişdirilmiş faylı təkmilləşdirilmiş verilənlər bazasında tətbiq edərsə, uğursuz olur.** Uğursuz** məzmun dəyişsə. |
| Bazada mövcud olan faylın adı dəyişdirilərək vaxt damğası saxlanılır (yalnız təsvir dəyişir)                              | **Uğursuz** , girişlə və ya giriş olmadan: qaçışçı onu yenidən tətbiq edəcək (girişlə) və ya versiyaya görə (bir olmadan) keçəcək. Başqa vaxt damğası və uyğunluq qeydindən istifadə edin və ya adı saxlayın.                                                                                                                                                      |
| Bazada mövcud olan fayl silinir və ya giriş olmadan adı dəyişdirilir                                                      | **Uğursuz** , faylın buraxılış etiketində olub-olmamasından asılı olmayaraq. Onu ləğv etmək üçün faylı `git checkout <base> -- src/lib/db/migrations/<file>` ilə bərpa edin; onun sxemini geri qaytarmaq üçün `DROP ... IF EXISTS` ilə yeni miqrasiya əlavə edin.                                                                                                  |
| Bazada mövcud olan fayl müxtəlif məzmuna malikdir                                                                         | **Xəbərdarlıq** ( GitHub Actions-da `::warning` annotasiyası) və kommutasiya yoxlanışı həyata keçirilir. Redaktə yekun sxemi dəyişdirərsə, bu uğursuz olur, çünki təkmilləşdirilmiş verilənlər bazaları redaktə edilmiş faylı bir daha tətbiq etmir: dəyişikliyi yeni miqrasiyaya qoyun. Zərərsiz redaktə (şərh, `IF NOT EXISTS`) yalnız xəbərdarlıq edir.         |
| Zaman damğası vurulmuş fayl bazanın ən yenisindən daha yeni olmayan vaxt damğası ilə əlavə edilir                         | Aşağıda təsvir edilən kommutasiya yoxlamasını həyata keçirir.                                                                                                                                                                                                                                                                                                      |
| Köhnə formatlı `NNN_` faylı bazanın ən yeni köhnə format faylının altındakı nömrə ilə əlavə olunur                        | **Uğursuz** , `KNOWN_GAPS` eyni çəkmə sorğusunda redaktə olunsa belə: köhnə seriya dondurulub, `npm run db:new-migration` ilə miqrasiya yaradın. Bazanın ən yenisindən yuxarı olan köhnə formatlı fayllar ( `release/v*` -dən `main` çəkmə sorğusu) qəbul edilir.                                                                                                  |
| Sıradan çıxmış, redaktə edilmiş və ya adı dəyişdirilmiş faylda `INSERT`, `UPDATE`, `DELETE` və ya `REPLACE` ifadələri var | **Xəbərdarlıq** : kommutasiya yoxlanışı məlumatları müqayisə etmir, ona görə də təkmilləşdirilmiş və təzə verilənlər bazalarının tətbiqi sırasının nəticəni dəyişib-dəyişdirmədiyini nəzərdən keçirin.                                                                                                                                                             |

Kommutasiya yoxlamasının bir işi sıradan çıxmış, redaktə edilmiş və adı dəyişdirilmiş faylları birlikdə əhatə edir.

Kommutasiya yoxlaması (`scripts/check/migration-commutation.ts`) real quraşdırma yolu ilə iki müvəqqəti verilənlər bazası qurur: a** təkmilləşdirilmiş** biri (əsas miqrasiya ilə yükləyin, sonra çəkmə sorğusunun miqrasiyaları ilə eyni faylda yenidən yükləyin) və** təzə** bir (çəkmə sorğusunun miqrasiyaları ilə bir açılış). O, nəticədə yaranan sxemləri müqayisə edir: cədvəllər və sütunlar (sütun sırasına məhəl qoymadan), UNIQUE / PRIMARY KEY və FOREIGN KEY məhdudiyyətləri, hər cədvəlin normallaşdırılmış `CREATE TABLE` mətni ( CHECK məhdudiyyətlərini, harmanlamaları, yaradılan sütunları və cədvəl seçimlərini əhatə edir), indekslər, tətiklər və görünüşlər. Sətir məlumatları müqayisə edilmir. Əgər onlar uyğun gəlirsə, qapı faylın sıradan çıxdığını yazır, lakin işə gedir və keçir. Əgər onlar fərqlidirsə, qapı fərq və iş üçün göstərişlə uğursuz olur: sıradan çıxmış fayl üçün onun adını `npm run db:new-migration` ilə bərpa edin, çünki fayl hələ birləşdirilməyib; redaktə edilmiş əsas fayl üçün əsas məzmunu bərpa edin və dəyişikliyi yeni miqrasiyaya qoyun; adı dəyişdirilmiş fayl üçün adının dəyişdirilməsini ləğv edin və ya onun işlədiyi yerdə başqa yeni vaxt damgası seçin, heç vaxt başqa adla eyni vaxt damgası olmasın. Çekin özü işləyə bilmirsə, qapı CI də uğursuz olur və yalnız yerli olaraq xəbərdarlıq edir. Redaktə edilmiş əsas fayl üçün təkmilləşdirilmiş verilənlər bazası həmin faylın baza məzmunu ilə qurulur və onun versiyası artıq qeydə alındığı üçün ikinci yükləmə onu atlayır. Adı dəyişdirilmiş fayl üçün təkmilləşdirilmiş verilənlər bazası köhnə adı altında fayl ilə qurulur və ikinci yükləmə `_omniroute_migrations` cərgəsini yenidən işə salmaq əvəzinə uyğunluq girişindən keçir; qapı yeni adı `--must-not-apply` ilə keçir, ona görə də ikinci yükləmə onu tətbiq edərsə yoxlama uğursuz olur. Əgər çəkmə sorğusu miqrasiyası təkmilləşdirilmiş yolda tətbiq olunmursa, yəni hər baza miqrasiyasından sonra (təzə quraşdırmada da uğursuz olub-olmamasından asılı olmayaraq) qapı `migration do PR não aplica` hesabat verir və sizdən bazanın cari sxeminə qarşı SQL düzəltməyi xahiş edir; fayl daha sonrakı vaxt damğası ilə başqa çəkmə sorğusu miqrasiyasından asılıdırsa, onun adını `npm run db:new-migration` ilə bərpa edin.

Eyni müqayisəni yerli olaraq həyata keçirmək üçün bazanı açıq şəkildə ötürün, məsələn `npm run check:migration-numbering -- --base origin/<base-branch>` və ya ən son buraxılışla müqayisə etmək üçün `npm run check:migration-numbering -- --base-latest-tag`.

### Açıq PR-nın `NNN` Miqrasiyasına çevrilməsi

Keçiddən əvvəl açılmış çəkmə sorğusu hələ də `242_add_widgets.sql` kimi ardıcıl fayl daşıya bilər. `241` dən yuxarı olan köhnə nömrələr rədd edilir, ona görə də birləşmədən əvvəl onu çevirin:

1. **Təsviri saxlayaraq faylın adını generatorla dəyişdirin.** Yeni adı almaq üçün `npm run db:new-migration -- <same description>` işə salın, SQL ni ona köçürün və köhnə `NNN_` faylını silin. Təsvir eyni qalmalıdır: aşağıda uyğunluq qeydi ona uyğun gəlir.
2. **Davamlı verilənlər bazası köhnə nömrəni işlədirsə, uyğunluq girişi əlavə edin.** Əgər saxlanılan hər hansı verilənlər bazası (homolog, VPS, ianəçinin öz quraşdırması) `NNN_` faylı ilə PR quruluşunu işlədirsə, `src/lib/db/migrationRunner/constants.ts`-də `RENAMED_MIGRATION_COMPATIBILITY` -ə `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` əlavə edin. bu** `237` - `241` üçün tələb olunur** : bu yuvalar indi kanonik `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` və `241_seen_models.sql` saxlayır və belə bir verilənlər bazası giriş olmadan kanonik miqrasiyanı əbədi olaraq atlayır və çevrilmiş olanı yenidən işə salır. O, həmçinin təyinat vaxt damğası olduqda, `242` kimi boş qalan yuva üçün işləyir. Şübhə olduqda, girişi əlavə edin. Onu massivdə hara əlavə etməyiniz vacib deyil: girişin hədəf yuvası hələ də başqa bir girişin uzaqlaşdığı cərgə saxladıqda (məsələn, köhnə `usage_history_calculated_cost` cərgəsi `237`-a keçməyi gözləyərkən `237` PR cərgəsini saxlayır), qaçışçı həmin girişi yuva boş olana qədər gözləməyə icazə verir. Yalnız real münaqişə, məsələn, heç bir giriş hərəkəti olmayan bir sıra tərəfindən tutulan yuva və ya yuvaları dəyişdirən iki giriş, `Cannot reconcile ...` ilə açılışı dayandırır.
3. **SQL idempotent saxlayın** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), çünki çevrilmiş miqrasiya onun sxeminin artıq mövcud olduğu verilənlər bazasına cavab verə bilər.
4. **Versiya açarlı xüsusi halları köçürün.** Əgər PR köhnə nömrəsinə `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) və ya `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`) ilə hərf əlavə edibsə, açarı yeni vaxt damğasına dəyişin.

`tests/unit/db/codex-fence-migration-rename.test.ts` adı dəyişdirilmiş miqrasiya üçün sınaq nümunəsidir.

### Keçiddən əvvəl filiallara qayıdır

Heç vaxt `YYYYMMDDHHMMSS_` faylını keçiddən əvvəl olan filiala (məsələn, köhnə `release/v*` filialı) albalı seçməyin və ya backport etməyin. Oradakı qaçışçı fayl adlarını mətn kimi çeşidləyir, ona görə də vaxt damğası qoyulmuş fayl yeni verilənlər bazasında `201_` və `202_` arasında işləyəcək və oradakı köhnə qapı 14 rəqəmli prefiksləri başa düşmür. Belə bir filialda dəyişikliyi həmin filialın özünün növbəti `NNN_` faylı kimi yazın, idempotent, ona görə də vaxt damğası olan versiya sonra gələndə o, qeyri-opdur.

### Miqrasiya necə gedir

Başlanğıcda, `migrationRunner.ts`:

1. Əgər mövcud deyilsə, `_omniroute_migrations` cədvəli yaradır
2. Artıq tətbiq edilmiş köçürmələr üçün sorğular
3. Hər bir tranzaksiyada hər hansı yeni miqrasiyanı ardıcıllıqla tətbiq edir
4. Tətbiq olunan hər bir köçü vaxt damğası ilə qeyd edir

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

### Qüsursuzluq

Köçlər olmalıdır** idempotent** — onları iki dəfə işə salmaq qeyri-op olmalıdır:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`, `IF EXISTS` və `OR IGNORE` / `OR REPLACE` bəndlərindən liberal şəkildə istifadə edin.

### Yeni miqrasiyanın əlavə edilməsi

1. **Generator ilə fayl yaradın** : `npm run db:new-migration -- <description>` (məsələn, `npm run db:new-migration -- add combo priority`). O, cari UTC vaxtı və şərh başlığı ilə `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` yazır, həmin vaxt damğası götürülərsə, bir saniyə irəliləyir və heç vaxt faylın üzərinə yazmır. Nömrəni əl ilə seçməyin.
2. **Təhlükəsiz DDL istifadə edin** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Məlumatları diqqətlə doldurun** : mövcud sətirləri idarə etmək üçün `UPDATE ... WHERE ...` istifadə edin
4. **Sifarişi və adını yoxlayın** : `npm run test:migrations:fresh` (boş verilənlər bazasında bütün köçürmələr) və `npm run check:migration-numbering`
5. **Bir nüsxədə sınaq** : istehsalda heç vaxt sınaqdan keçirilməmiş miqrasiyaları həyata keçirməyin
6. **Koddan yaradılmış cədvəlin də miqrasiyaya ehtiyacı var** : modul da cədvəli tənbəl şəkildə yaradırsa (`CREATE TABLE IF NOT EXISTS`, özünü sağaltma yolu kimi saxlanılır), köçürmə onu eyni DDL ilə yaratmalıdır. Əks halda, təmiz quraşdırma və təkmilləşdirilmiş quraşdırma, həmin kod yolunun keçib-keçməməsindən asılı olaraq müxtəlif sxemlərlə başa çatır. `tests/unit/db/lazy-table-migration-guard.test.ts` `src/` və `open-sse/` skan edir və köçürmə olmadan tənbəl `CREATE` də uğursuz olur (#20557). Misal: `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`.

Misal:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Geriyə uyğun olmayan dəyişikliklər** (məsələn, sütunları atmaq) çətin olur. OmniRoute miqrasiya tətbiq edildikdən sonra NOT — endirilməsini dəstəkləyir, sxem dəyişikliyi daimidir. Buna uyğun olaraq planlaşdırın.

---

## Saxlanılan məlumatların şifrələnməsi

Həssas sahələr (API açarları, OAuth tokenləri, bağlantı sətirləri) saxlanılarkən **AES-256-GCM** vasitəsilə şifrələnir.

### İş prinsipi

```ts
// src/lib/db/encryption.ts (sadələşdirilib)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### İstifadə edildiyi yerlər

- `provider_connections.api_key` — tətbiq səviyyəsində şifrələnir
- `provider_connections.access_token`, `refresh_token`, `id_token` — tətbiq səviyyəsində şifrələnir
- `namespace = "secrets"` olan `key_value` qeydləri — tətbiq səviyyəsində şifrələnir
- `proxy_registry.auth` — mövcud olduqda tətbiq səviyyəsində şifrələnir

### Şifrələmə açarı

Şifrələmə açarı **parol ifadəsindən** (`STORAGE_ENCRYPTION_KEY` mühit dəyişəni vasitəsilə təyin edilir) və **duzdan** (DB-də saxlanılır) yaradılır. Məlumatların şifrəsini açmaq üçün hər ikisi tələb olunur.

```bash
# Təhlükəsiz parol ifadəsi yaradın
openssl rand -hex 32

# .env faylında təyin edin
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritik**: Şifrələmə açarının itirilməsi bütün şifrələnmiş məlumatlara girişin itirilməsi deməkdir. **Açarın ehtiyat nüsxəsini verilənlər bazasından ayrı saxlayın**.

### Nələr şifrələnmir

Performans səbəblərinə görə aşağıdakılar açıq mətn şəklində saxlanılır:

- Provayderlərin görünən adları
- Model tərifləri (onsuz da açıqdır)
- Marşrutlaşdırma qaydaları
- İstifadə qeydləri (PII yoxdur)

---

## Şifrələmə ilə bağlı məhdudiyyətlər (v3.8.16+)

OmniRoute iki şifrələmə sxemini şəffaf şəkildə idarə etmək üçün **`migrateLegacyEncryptedString()`** funksiyasından istifadə edir:

- **Köhnə** (v3.5.0-dan əvvəl): XOR əsaslı "şifrələmə" (həqiqi kriptoqrafiya deyil)
- **Cari**: Düzgün IV və autentifikasiya teqi ilə AES-256-GCM

Miqrasiya köməkçisi köhnə formatı aşkarlayır və ilk oxuma zamanı məlumatı yeni sxemlə yenidən şifrələyir. Bu, giriş məlumatlarını itirmədən köhnə verilənlər bazasını yeniləməyə imkan verir.

---

## Oxuma keşi

Tez-tez oxunan məlumatlar (modellər, provayderlər, parametrlər) üçün `readCache.ts` **yaddaşdaxili keş** təqdim edir:

```ts
// Başlanğıcda keşlənir, yazma zamanı etibarsız edilir
const providers = await getCachedProviders(); // Sürətli, yaddaşdaxili
const fresh = await listProviders(); // Yavaş, verilənlər bazasına müraciət edir
```

| Keşlənən obyekt        | Keş açarı      | TTL           |
| ---------------------- | -------------- | ------------- |
| `models`               | `models:v1`    | Yazmaya qədər |
| `provider_connections` | `providers:v1` | Yazmaya qədər |
| `settings`             | `settings:v1`  | Yazmaya qədər |
| `combos`               | `combos:v1`    | Yazmaya qədər |

Müvafiq cədvələ hər yazma zamanı keş etibarsız edilir.

---

## Ehtiyat nüsxələmə və bərpa

### Əl ilə ehtiyat nüsxələmə

```bash
# Lokal ehtiyat nüsxə yaratmaq üçün CLI-dan istifadə edin
omniroute backup create --name pre-migration

# Və ya API vasitəsilə
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Ehtiyat nüsxə faylına aşağıdakılar daxildir:

- Bütün verilənlər bazası cədvəlləri (JSON formatına seriallaşdırılmış)
- Çağırış jurnalı artefaktları (base64 ilə kodlaşdırılmış, istəyə bağlı)
- Parametrlər + məxfi məlumatlar (şifrələnmiş)
- Plagin konfiqurasiyası

### Bərpa

```bash
# CLI vasitəsilə
omniroute restore pre-migration

# API vasitəsilə
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Xəbərdarlıq**: Bərpa bütün verilənlər bazasının üzərinə yazır. Əvvəlcə bütün klientləri dayandırın.

### Avtomatlaşdırılmış ehtiyat nüsxələr

```bash
# CLI vasitəsilə gündəlik avtomatik ehtiyat nüsxələməni aktivləşdirin
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Cədvəl server tərəfində, hər 30 saniyədən bir (standart olaraq) işə düşən və cron ifadəsini serverin yerli vaxtına əsasən qiymətləndirən fon tapşırığı tərəfindən icra edilir.

| Dəyişən                                     | Standart | Təsvir                                                                                                                              |
| ------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`  | Millisaniyə ilə işə düşmə intervalı (minimum `5000`). Uyğun cron dəqiqəsinə etibarlı şəkildə düşmək üçün 60 san-dən qısa olmalıdır. |

### SQLite işlək ehtiyat nüsxəsi

İşlək verilənlər bazasının fasiləsiz ehtiyat nüsxələnməsi üçün:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Bu, SQLite-ın onlayn ehtiyat nüsxələmə API-sindən istifadə edir — OmniRoute işləyərkən icra edilməsi təhlükəsizdir.

---

## Performans Tuning

### WAL rejimi

WAL default olaraq aktivdir. Yüksək yazma iş yükləri üçün nəzərə alın:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute `journal_size_limit` təyin etmir. Yoxlama nöqtəsi WAL çərçivələrini əsas fayla köçürür, lakin WAL faylı ən böyük ayrılmış ölçüsünü saxlayır. `OMNIROUTE_WAL_GUARD_MAX_MB` mühafizəçisi yalnız xəbərdarlıq edir və `wal_checkpoint(RESTART)` işlədir; disk ölçüsündə qapaq deyil.

### İndekslər

Performans üçün əsas indekslər (miqrasiya tərəfindən avtomatik yaradılmışdır):

- provayder tərəfindən `idx_models_provider` — model axtarışları
- `idx_combo_targets_combo_id` — Combo hədəf genişləndirilməsi
- `idx_usage_history_api_key_timestamp` — istifadə analitikası
- `idx_quota_snapshots_api_key_window` — kvota izləmə
- `idx_call_logs_timestamp` — zəng qeydləri sorğuları

Yeni indeks əlavə etmək üçün miqrasiya yaradın:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Yaddaş Xəritəli I/O

Çox böyük verilənlər bazası üçün (> 10GB), yaddaş xəritələşdirilməsi SQLite praqması vasitəsilə tənzimlənə bilər:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Sıxılma

Uzunmüddətli OmniRoute nümunələri təsadüfi `VACUUM` dən faydalanır:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Trafik az olan pəncərələrdə aylıq işləyin. (WAL rejimi ehtiyacı azaldır, lakin aradan qaldırmır.)

---

## Sağlamlıq Yoxlaması

`src/lib/db/healthCheck.ts` **verilənlər bazası səviyyəsində sağlamlıq diaqnostikası** təmin edir:

Hər iki metod autentifikasiya tələb edir (əks halda `401`). `GET` yalnız diaqnostika aparır; `POST` isə
eyni yoxlamanı `autoRepair` aktiv olmaqla işə salır.

```bash
GET  /api/db/health   # diaqnostika apar
POST /api/db/health   # diaqnostika apar + təmir et
```

Cavab `runDbHealthCheck()` tərəfindən yaradılan `DbHealthCheckResult` nəticəsidir
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Domen büdcələri artıq mövcud olmayan API açarlarına istinad edirdi.",
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

| Sahə              | Mənası                                                                                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `isHealthy`       | `issues` boş olduqda `true` olur. `driver` buna heç vaxt təsir etmir.                                                                                                          |
| `issues[].type`   | `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state` dəyərlərindən biri.                                                                            |
| `repairedCount`   | Bu icra zamanı təmir edilən sətirlər; `autoRepair` false olduqda həmişə `0` olur.                                                                                              |
| `backupCreated`   | Təmir edilməzdən əvvəl ehtiyat nüsxənin yaradılıb-yaradılmadığı.                                                                                                               |
| `checkedAt`       | İcra və onun yazdığı hər hansı təmir qeydi üçün ortaq olan ISO vaxt möhürü.                                                                                                    |
| `driver.name`     | Yoxlanılan verilənlər bazasına xidmət göstərən SQLite drayveri.                                                                                                                |
| `driver.degraded` | Yazmalar verilənlər bazası faylında davamlı şəkildə saxlanmadıqda `true` olur — `sql.js` WASM ehtiyat variantı (bütün faylın saxlanması) və ya yaddaşdaxili verilənlər bazası. |

Eyni faydalı yük `omniroute_db_health_check` MCP aləti tərəfindən qaytarılır.

Zədələnməni aşkarlamaq üçün `PRAGMA integrity_check` əmrini işə salın:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Çap edilməlidir: ok
```

`ok` xaricində hər hansı nəticə qaytararsa, **verilənlər bazasından istifadəni dərhal dayandırın** və onu ehtiyat nüsxədən bərpa edin.

---

## Fəlakətdən sonra bərpa

### Ssenari 1: WAL faylı itib

`-wal` faylı yoxdur, lakin `-shm` və əsas verilənlər bazası bütövdür:

```bash
# Növbəti açılışda avtomatik bərpa olunur
omniroute
```

SQLite avtomatik bərpa edə bilmirsə:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Ssenari 2: Əsas verilənlər bazası faylı zədələnib

Ehtiyat nüsxədən bərpa edin:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` yalnız işləyən serverdən tam `.tar.gz` arxivini endirir
(`GET /api/db-backups/exportAll`, operator giriş məlumatları tələb olunur); heç nəyi bərpa etmir.

### Ssenari 3: Şifrələmə açarı itib

Açar olmadan **bərpa mümkün deyil**. Şifrələnmiş sahələri oxumaq mümkün deyil. Bütün provayderləri yeni giriş məlumatları ilə əl ilə yenidən əlavə edin.

> **Riskin azaldılması**: Şifrələmə açarının ehtiyat nüsxəsini həmişə ayrıca, ideal olaraq parol menecerində və ya KMS-də saxlayın.

### Ssenari 4: Disk doludur

SQLite `SQLITE_FULL` xətaları qaytaracaq. Diskdə yer boşaldın, sonra:

```bash
# Yer boşaltmaq üçün WAL yoxlama nöqtəsi yaradın
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Ümumi Əməliyyatlar

### Cədvəli Yoxlamaq

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Bütün Cədvəllərdəki Sətirləri Saymaq

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Bütün Məlumatları Sıfırlamaq (Silmək)

```bash
# Əvvəlcə OmniRoute-u dayandırın
omniroute stop

# Verilənlər bazası faylını silin
rm ~/.omniroute/storage.sqlite*

# Yenidən başladın (boş verilənlər bazası yenidən yaradılacaq)
omniroute
```

**Seçimli** sıfırlama üçün (provayderləri saxlayıb istifadə məlumatlarını silmək):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Tək Cədvəli Eksport Etmək

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Nasazlıqların Aradan Qaldırılması

### "Verilənlər bazası kilidlənib"

Başqa proses yazma kilidini saxlayır. Aşağıdakılardan birini edin:

- Digər prosesin bitməsini gözləyin (`lsof | grep storage.sqlite` ilə yoxlayın)
- Digər prosesi dayandırın
- Problem davam edərsə, OmniRoute-u yenidən başladın

### "Xarici açar məhdudiyyəti pozulub"

Domen modulu istinad bütövlüyünü pozur. Aşağıdakıları yoxlayın:

- Asılı cədvəllərdə əlaqəsiz qalmış sətirlər
- Tətbiq edilməmiş kaskad silmələri
- Xarici açarı dəyişdirmiş son miqrasiya

Pozuntuları tapmaq üçün `PRAGMA foreign_key_check;` əmrini icra edin.

### "Yaddaş çatışmır"

SQLite-ın yaddaşla əlaqələndirilmiş giriş-çıxış əməliyyatları əməliyyat sisteminin limitini aşır. SQLite pragma-sı vasitəsilə ölçünü azaldın:

```sql
PRAGMA mmap_size = 134217728;  -- 256MB əvəzinə 128MB
```

Və ya deaktiv edin:

```sql
PRAGMA mmap_size = 0;
```

### "Miqrasiya yarıda uğursuz oldu"

Miqrasiya tranzaksiya daxilində icra edildiyi üçün geri qaytarılmalı idi. Əgər qaytarılmayıbsa:

1. **OmniRoute-u dayandırın** (sonrakı cəhdlərin qarşısını alın)
2. `sqlite3` ilə **verilənlər bazasının vəziyyətini yoxlayın**
3. Qismən tətbiq edilmiş miqrasiyanı **əl ilə düzəldin**
4. OmniRoute-u **yenidən başladın** (miqrasiya yenidən sınanacaq)

Bunun qarşısını almaq üçün miqrasiyaları həmişə əvvəlcə nüsxə üzərində sınaqdan keçirin.

---

## Həmçinin Baxın

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — istifadə cədvəlləri
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — sağlamlıq monitorinqi
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — buraxılış prosesi
- Mənbə: `src/lib/db/` (80-dən çox fayl, təxminən 25 min kod sətri)
