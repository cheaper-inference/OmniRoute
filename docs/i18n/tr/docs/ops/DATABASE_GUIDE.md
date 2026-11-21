# Database Schema & Operations Guide (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Özet**: OmniRoute, birincil veri deposu olarak **WAL günlüklemeli SQLite** kullanır ve hassas alanlarda duran veriler için **AES-256-GCM** şifrelemesi uygular. Bu kılavuz şemayı, geçişleri, yedekleme/kurtarma işlemlerini ve operasyonel çalışma kılavuzlarını kapsar.

**Kaynaklar:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 temel tablo)
- `src/lib/db/migrationRunner.ts` — sürümlendirilmiş geçişler
- `src/lib/db/migrations/` — sürümlendirilmiş 167 SQL dosyası
- `src/lib/db/encryption.ts` — şifreleme yardımcıları
- `src/lib/db/backup.ts` — yedek dışa/içe aktarma
- `src/lib/db/healthCheck.ts` — durum tanılama

---

## Neden SQLite?

OmniRoute, çeşitli nedenlerle PostgreSQL/MySQL yerine SQLite'ı tercih etmiştir:

| Faktör             | SQLite                                  | PostgreSQL                                   |
| ------------------ | --------------------------------------- | -------------------------------------------- |
| **Dağıtım**        | Gömülü — ayrı sunucu gerekmez           | Sunucu kurulumu gerektirir                   |
| **Şifreleme**      | Uygulama katmanı (AES-256-GCM)          | Yerleşik TDE                                 |
| **Performans**     | Küçük/orta ölçekli iş yüklerinde hızlı  | Çok yoğun eşzamanlı yazmalarda daha iyi      |
| **Eşzamanlılık**   | WAL modu eşzamanlı okumalara izin verir | Tam MVCC                                     |
| **Yedekleme**      | Tek dosyalı kopya                       | `pg_dump` veya dosya sistemi anlık görüntüsü |
| **Kullanım alanı** | Kullanıcı başına kurulum, gömülü        | Çok kiracılı SaaS                            |

**Tek kullanıcılı, tek örnekli** dağıtımlarda (OmniRoute'un birincil kullanım alanı) SQLite daha basit ve daha hızlıdır.

### WAL Günlükleme

`core.ts`, veritabanını **WAL (Önden Yazmalı Günlükleme) modunda** açar:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL, yazma işlemleri sırasında **eşzamanlı okumalara** izin verir; bu, istekler kaydedilirken sorgular gerçekleştiren kontrol paneli için önemlidir.

Varsayılan önbellek boyutu **65.536 KiB'dir (64 MiB)**. SQLite, negatif bir
`cache_size` değerini KiB cinsinden yaklaşık bir üst sınır olarak yorumlar ve sayfaları gerektiğinde tahsis eder.
**Ayarlar > Sistem ve Depolama > Önbellek Boyutu**, **1 ile
1.000.000 KiB** arasındaki tam sayı değerlerini kabul eder; ayarın kaydedilmesi, değeri etkin veritabanı bağlantısına uygular
ve OmniRoute, kalıcı değeri başlangıçta geri yükler.

---

## Veritabanı Konumu

SQLite dosyası şurada saklanır:

| İşletim Sistemi | Yol                                                            |
| --------------- | -------------------------------------------------------------- |
| Linux           | `~/.omniroute/storage.sqlite`                                  |
| macOS           | `~/.omniroute/storage.sqlite`                                  |
| Windows         | `%USERPROFILE%\.omniroute\storage.sqlite`                      |
| Docker          | `/app/data/storage.sqlite` (`DATA_DIR` ile yapılandırılabilir) |

İlişkili dosyalar:

- `storage.sqlite-wal` — önden yazmalı günlük
- `storage.sqlite-shm` — paylaşımlı bellek dosyası
- `call_logs/` — istek yükü yapıtları (etkinse)

**Konumu geçersiz kılma:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Alan Modülü Mimarisi

OmniRoute'un veritabanında `src/lib/db/` altında **110 üst düzey TypeScript modülü** bulunur. Her alan modülü:

- Bir veya daha fazla belirli tablonun sahibidir
- Tür tanımlı CRUD işlevlerini dışa aktarır
- Başka bir modülün tablolarına hiçbir zaman erişmez
- Veritabanına erişmek için `core.ts` içindeki `getDbInstance()` işlevini kullanır

### 110 Üst Düzey Veritabanı Modülü

OmniRoute'un `src/lib/db/` altında **110 üst düzey TypeScript dosyası** bulunur. Aşağıda temel modüllerden bir örneklem yer almaktadır; tam liste için dizin içeriğine bakın:

| Modül                   | Tablolar                                                       | Sorumluluk                                                                       |
| ----------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API anahtarı sağlayıcı kaydı ve kimlik bilgileri                           |
| `models.ts`             | `key_value` (model verileri)                                   | Model tanımları, yetenekler, fiyatlandırma                                       |
| `combos.ts`             | `combos`                                                       | Kombinasyon yönlendirme yapılandırmaları ve sıralaması                           |
| `apiKeys.ts`            | `api_keys`                                                     | API anahtarı yaşam döngüsü, kapsamlar, kota takibi                               |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Sistem yapılandırması ve paylaşılan KV deposu                                    |
| `backup.ts`             | —                                                              | Yedekleme dışa/içe aktarma işlemleri                                             |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Proxy yapılandırmaları ve yönlendirme kuralları                                  |
| `prompts.ts`            | `prompt_templates`                                             | Yeniden kullanılabilir istem şablonları, sürüm oluşturma                         |
| `webhooks.ts`           | `webhooks`                                                     | Olay güdümlü webhook abonelikleri ve günlükleri                                  |
| `detailedLogs.ts`       | `request_detail_logs`                                          | İstek başına denetim günlüğü kaydı (isteğe bağlı, yüksek hacimli)                |
| `domainState.ts`        | `domain_*` (5 tablo)                                           | Alan bütçeleri, devre kesiciler, kilitlemeler, yedek zincirleri, maliyet geçmişi |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A için izin verilen API anahtarları                                        |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Geçmiş kota kullanımı                                                            |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Modelleri varsayılan kombinasyonlarla eşleme                                     |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI'ye özgü kalıcı durum                                                         |
| `encryption.ts`         | —                                                              | Alanları şifrelemeye/şifrelerini çözmeye yönelik yardımcı işlevler               |
| `readCache.ts`          | —                                                              | Okuma ağırlıklı işlemler için bellek içi önbellek                                |
| `secrets.ts`            | `key_value` (şifrelenmiş girdiler)                             | Şifrelenmiş gizli bilgi depolama                                                 |
| `stateReset.ts`         | —                                                              | Test için veritabanı durumunu silme/sıfırlama                                    |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Aracı devri için oturum bağlamı                                                  |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Kullanım takibi                                                                  |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Sıkıştırma yapılandırması                                                        |

### Modül Sınırları

Temel bir mimari kural: **modüller birbirlerinin tablolarına doğrudan erişmez**. Başka bir modülün verileriyle çalışmak için işlevi o modülden içe aktarın.

```ts
// ❌ YANLIŞ: başka bir modülden doğrudan SQL
db.prepare("SELECT * FROM provider_connections").all();

// ✅ DOĞRU: providers modülü işlevini kullanın
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Bu kural kod incelemesiyle uygulanır — statik bir denetim yoktur, ancak ihlaller işaretlenir.

---

## Temel Şema (17 tablo)

`core.ts`, `SCHEMA_SQL` içindeki 17 temel tabloyu tanımlar. Bunlar `001_initial_schema.sql` migrasyonu tarafından oluşturulur ve çekirdek şemayı meydana getirir.

### Çekirdek Tablolar (ilk migrasyonda oluşturulur)

| Tablo                      | Amaç                                     | Temel sütunlar                                                          |
| -------------------------- | ---------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Sağlayıcı kimlik bilgileri (şifrelenmiş) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Sağlayıcı düğümü yönlendirme bilgileri   | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Genel KV deposu                          | `namespace`, `key`, `value`                                             |
| `combos`                   | Yönlendirme kombinasyonu tanımları       | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Ağ geçidi için API anahtarları           | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Veritabanı meta verileri                 | `key`, `value`                                                          |
| `usage_history`            | İstek kullanım kayıtları                 | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | İstek yükleri ve yanıtları               | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Proxy istek günlükleri                   | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Modelden sağlayıcıya geçiş zincirleri    | `model`, `chain`                                                        |
| `domain_budgets`           | Alan adı başına harcama bütçeleri        | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Bütçe sıfırlama geçmişi                  | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Alan adı başına maliyet takibi           | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Alan adı hız sınırı durumu               | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Alan adı başına devre kesici durumu      | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM yanıt önbelleği                      | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Geçmiş kota anlık görüntüleri            | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Ek Tablolar (sonraki migrasyonlarla eklenir)

Sonraki migrasyonlar aşağıdaki gibi tablolar ekler:

- `cli_tool_state` (migrasyon 011) — CLI aracı durumu
- `mcp_*` tabloları — MCP sunucusu denetimi
- `a2a_*` tabloları — A2A görev durumu
- `usage_*` tabloları — kullanım takibi
- `plugin_*` tabloları — eklenti sistemi
- `skill_executions` — beceri yürütme geçmişi
- `memory_*` tabloları — bellek sistemi
- `compression_*` tabloları — sıkıştırma sistemi
- `webhook_*` tabloları — webhook teslimat günlüğü
- `acp_*` tabloları — Agent Client Protocol
- `oneproxy_*` tabloları — 1proxy pazaryeri
- `proxy_assignments` — proxy kapsam bağlamaları
- `detailed_call_artifacts` — çağrı günlüğü yapıtlarının meta verileri
- `quota_alert_history` — kota uyarısı denetimi
- `command_code_auth_sessions` — Command Code OAuth oturumları

Yaklaşık 30'dan fazla tablonun tam listesi `src/lib/db/migrations/` içindedir.

---

## Göçler

OmniRoute kullanım alanları** sürümlendirilmiş, eş gücü olmayan geçişler** `src/lib/db/migrations/`. Her geçiş tek bir SQL dosyasıdır. İki adlandırma formatı bir arada bulunur; `_omniroute_migrations` kaydedilen sürüm sayısal önektir.

### Taşıma Adlandırma

| Biçim                                           | Örnek                                | İçin kullanılır                                                                                                                                        |
| ----------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `NNN_description.sql` (tam olarak 3 hane)       | `241_seen_models.sql`                | Eski seri `001`–`241`. Zaman damgası formatı geldiğinde dondu (`240` ve `241` bundan hemen önce birleştirildi): hiçbir yeni dosya sıralı sayı almıyor. |
| `YYYYMMDDHHMMSS_description.sql` (14 hane, UTC) | `20261113120000_add_usage_index.sql` | 2026-11-13 tarihinden itibaren oluşturulan her geçiş.                                                                                                  |

Neden değişiklik: sıralı sayılarda, paralel PRs aynı sonraki sayıyı seçti ve biri hariç tümü birleştirmeden önce yeniden numaralandırmak zorunda kaldı. Bir UTC zaman damgası her PR kendi sürümünü verir.

Zaman damgası formatına ilişkin kurallar ( `npm run check:migration-numbering` tarafından uygulanır, `scripts/check/lib/migrationNaming.mjs` oluşturucuyla paylaşılır):

- Zaman damgası gerçek bir UTC tarihi ve saatidir; `20261113000000` daha erken değildir ve gelecekte 10 dakikadan fazla olmamalıdır.
- Açıklama, bir harfle başlayan küçük harf `snake_case` (`a-z`, `0-9`, kelimeler arasında tek `_` ), en fazla 80 karakter.
- Aynı zaman damgasına sahip iki dosya kopyadır.
- Boşluksuz kural yalnızca eski seriler için geçerlidir: bilinen boşluklar `026`, `055` ve `121` dışında `001` `241` kadar her sayı mevcut olmalıdır. `241` (veya herhangi bir eski dosyanın) silinmesi geçidi başarısız kılar. `001` ve `241` hiçbir zaman `KNOWN_GAPS` izin verilenler listesine eklenemez. Zaman damgalı dosyalar hiçbir zaman boşluk yaratmaz.
- `src/lib/db/migrations/` her giriş, geçerli küçük harfli `.sql` adına sahip normal bir dosya olmalıdır. Bir dizin, bir sembolik bağlantı, bir `.SQL` veya `.sql.bak` dosyası, gizli bir dosya veya boşluk içeren bir ad, koşucu onu sessizce atlayacağından veya önyükleme sırasında çökeceğinden geçitte başarısız olur.

**Siparişi uygula.** Çalıştırıcı metne göre değil önekin sayısal değerine göre sıralar: önce eski `001`–`241` dosyaları, ardından zaman damgası sırasına göre zaman damgalı dosyalar, ardından `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` ile kayıtlı herhangi bir ad alanı dizinleri ( `ee-001` gibi sürümler). Bekleyen geçiş, sürümü `_omniroute_migrations` olmayan herhangi bir dosyadır; dolayısıyla eski bir daldan yeni bir daldan sonra birleşen geçiş, mevcut veritabanlarında hâlâ geçerlidir.

**Zaman damgası birleştirme sırası değil, oluşturma sırasıdır.** Geçişiniz, geçiş işlemi tarafından oluşturulan bir tabloya veya sütuna bağlıysa** daha yeni** zaman damgası (örneğin, ilk önce birleştirilen başka bir PR biri), yeni bir veritabanı ilk önce sizinkini çalıştırır ve başarısız olur. PR hala açıkken, daha yeni bir zaman damgası alması için dosya adını `npm run db:new-migration` ile yeniden oluşturun veya bağımsız hale getirin. `npm run test:migrations:fresh` her geçişi boş bir veritabanına uygular ve bunu yakalar.

### Birleştirilmiş Taşıma Hiçbir Zaman Silinmez veya Yeniden Adlandırılmaz

Bir geçiş dosyası bir sürüm şubesinde veya `main` olduğunda, zaten homolog ve geliştirici veritabanlarında, VPS yüklemelerinde ve Enterprise senkronizasyonunda çalıştırılmıştır. O andan itibaren:

- **Asla silmeyin.** Yeni yüklemeler şemasını kaybederken yükseltilmiş veritabanları onu korur.
- **Asla yeniden adlandırmayın.** `_omniroute_migrations` sürüm artık bir dosyayla eşleşmeyeceğinden, onu zaten uygulayan her veritabanı onu yeniden çalıştıracaktır. İdempotent olmayan SQL daha sonra verileri çoğaltır veya önyüklemeyi durdurur.
- **Farklı bir şemaya mı ihtiyacınız var?** `npm run db:new-migration` ile yeni bir geçiş oluşturun.

Yeniden adlandırma yalnızca henüz birleştirilmemiş bir dosya için güvenlidir; kapının ipuçlarının işaret ettiği durum da budur. Yayın etiketi burada hiçbir şeyi değiştirmez: `release/v*` şubesine yapılan her gönderim, Docker `:next` görüntüsünü yayınlar ve homologda, VPS yüklemelerinde ve Enterprise senkronizasyonunda çalışır; dolayısıyla, herhangi bir `vX.Y.Z` etiketi mevcut olmadan önce birleştirilmiş geçiş gerçek veritabanlarında çalıştırılır. Geçit, etiketlenmiş olsun ya da olmasın, bir temel dosyanın her kaldırılmasında başarısız olur.

- **Birleştirilmiş taşıma işlemini geri alma.** Dosyayı silen bir `git revert` geçitte başarısız olur. Dosyayı saklayın ve yeni bir geçişte şemasını geri alın: `npm run db:new-migration -- <description>`, `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` vb. Yükseltilmiş ve yeni veritabanları daha sonra aynı şemayla sona erer.
- **Kabul edilen yeniden adlandırma: uyumluluk girişi ve aynı içerik.** Birleştirilmiş bir dosyanın taşınması gerekiyorsa (örneğin, birleştirilmiş iki dosya bir zaman damgasını paylaşır ve çalıştırıcı sürüm çarpışmasıyla durur), sonraki dosyayı SQL dokunmadan yeniden adlandırın ve `src/lib/db/migrationRunner/constants.ts` içindeki `RENAMED_MIGRATION_COMPATIBILITY` `{ fromVersion, fromName, toVersion, toName }` ekleyin. Eski sürümü uygulayan veritabanları, dosyayı yeniden çalıştırmak yerine `_omniroute_migrations` satırlarını taşır. Kapı, böyle bir yeniden adlandırma konusunda uyarıda bulunur ve yeni zaman damgası ne olursa olsun, her zaman değiştirme kontrolünü çalıştırır: yeni yüklemeler dosyayı yeni konumuna uygular, yükseltilmiş veritabanları bunu yapmaz, bu nedenle eskisinin yakınında yeni bir zaman damgası seçin. İçerik değiştiğinde (yeni bir geçişte şema değişikliği hala geçerliyse) veya girişin hedef dosyası diskte değilse, kapı yeniden adlandırmada başarısız olur.
- **Asla aynı zaman damgası içinde yeniden adlandırmayın.** Zaman damgasını koruyan ve yalnızca açıklamayı değiştiren bir yeniden adlandırma, giriş olsun ya da olmasın, kapıda başarısız olur. `toVersion` `fromVersion` eşit olan bir girişle, koşucu eski `_omniroute_migrations` satırını siler ve dosyayı zaten çalıştırmış olan her veritabanına yeniden uygular. Bir giriş olmadan, koşucu yalnızca sürümü izler: bu veritabanlarındaki dosyayı atlar (yeni içerik hiçbir zaman orada çalışmaz) ve her önyüklemede bir yeniden numaralandırma hatasını günlüğe kaydeder. Başka bir zaman damgası artı bir uyumluluk girişi kullanın veya adı saklayın.
- **Kapı, yeniden adlandırılan dosyanın tekrar çalışmadığını kontrol eder.** Kapsanan her yeniden adlandırma için kapı, yeni dosya adını `--must-not-apply` ile değiştirme kontrolüne iletir. Denetim, yükseltilmiş veritabanını gerçek çalıştırıcıyla önyükler ve çalıştırıcı bu dosyayı tekrar uygularsa (örneğin, girişin yanlış bir sürümü veya adı olması nedeniyle veya kapının metin ayrıştırıcısının `constants.ts` TypeScript farklı okuması nedeniyle), kapı `migration renomeada rodaria de novo` ile başarısız olur ve sizden girişin eski ve yeni sürümlerini ve adlarını kontrol etmenizi ister.

### Kapı Üsse Karşı Neyi Kontrol Ediyor?

Çekme isteği ve birleştirme kuyruğu çalıştırmalarında `npm run check:migration-numbering`, diskteki `src/lib/db/migrations/` temel daldaki aynı dizinle karşılaştırır. Taban şu sırayladır: `--base-latest-tag`, `--base <ref>`, `MIGRATION_BASE_REF` değişkeni veya `GITHUB_EVENT_NAME`, `pull_request`, `pull_request_target` veya `merge_group` olduğunda, birleştirme işleminin ilk ebeveyni, olay yükünün `merge_group.base_sha` veya `git merge-base HEAD origin/$GITHUB_BASE_REF`. Çözülebilir bir tabanı olmayan bir çekme isteğinde veya birleştirme kuyruğu çalıştırmasında kapı başarısız olur. `--base` olmadan CI dışında `comparação com a base: pulada (sem --base)` yazdırır ve bu kuralları atlar.

`--base-latest-tag` `HEAD` tarihindeki en yeni yayın etiketiyle (semver sırasıyla `vX.Y.Z` ; gecelikler gibi son eklenmiş etiketler sayılmaz) `--base` ile aynı kurallara göre karşılaştırılır. Release-Green (`scripts/quality/validate-release-green.mjs`) kapıyı bu şekilde çalıştırır, çünkü push ve zamanlanmış çalıştırmaların çekme isteği tabanı yoktur ve birleştirme, yeni bir CI çalıştırması olmadan gerçekleşebilir. Tarihte serbest bırakma etiketi bulunmadığından kapı başarısız olur; `git fetch --tags` çalıştırın ( CI, `fetch-depth: 0` ile `actions/checkout` etiketleri getirir).

| Çekme isteğinde değişiklik                                                                                                 | Sonuç                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tabanda bulunan bir dosya `RENAMED_MIGRATION_COMPATIBILITY` girişiyle yeniden adlandırılır                                 | **Uyarı** içerik aynıysa ve değiştirme kontrolü yeni zaman damgası ne olursa olsun çalışıyorsa; yeni konum son şemayı değiştirirse (yeniden adlandırmayı geri alın veya işe gidip geldiği yerde başka bir yeni zaman damgası seçin) veya koşucu, yeniden adlandırılan dosyayı yükseltilmiş bir veritabanına tekrar uygularsa başarısız olur.** Başarısız** içerik değiştiyse. |
| Tabanda bulunan bir dosya, zaman damgası korunarak yeniden adlandırılır (yalnızca açıklama değişir)                        | **Başarısız** , girişli veya girişsiz: koşucu bunu tekrar uygular (girişle birlikte) veya sürüme göre atlar (girişsiz). Başka bir zaman damgası artı bir uyumluluk girişi kullanın veya adı saklayın.                                                                                                                                                                         |
| Baz ünitede bulunan bir dosya silinir veya giriş yapılmadan yeniden adlandırılır                                           | **Başarısız** , dosyanın bir yayın etiketinde olup olmadığına bakılmaksızın. Bunu geri almak için dosyayı `git checkout <base> -- src/lib/db/migrations/<file>` ile geri yükleyin; şemasını geri döndürmek için `DROP ... IF EXISTS` ile yeni bir geçiş ekleyin.                                                                                                              |
| Tabanda bulunan bir dosyanın içeriği farklı                                                                                | **Uyarı** ( GitHub Eylemlerinde bir `::warning` açıklaması) ve değiştirme kontrolü çalıştırılır. Yükseltilen veritabanları düzenlenen dosyayı tekrar uygulamadığından, düzenleme son şemayı değiştirirse başarısız olur: değişikliği yeni bir geçişe koyun. Zararsız bir düzenleme (yorum, `IF NOT EXISTS`) yalnızca uyarır.                                                  |
| Tabanın en yenisinden daha yeni olmayan bir zaman damgasına sahip bir zaman damgalı dosya eklenir                          | Aşağıda açıklanan geçiş kontrolünü çalıştırır.                                                                                                                                                                                                                                                                                                                                |
| Tabanın en yeni eski formatlı dosyasının altına bir sayı ile eski formatlı bir `NNN_` dosyası eklenir                      | **Başarısız** , `KNOWN_GAPS` aynı çekme isteğinde düzenlenmiş olsa bile: eski seri dondurulur, geçişi `npm run db:new-migration` ile oluşturun. Tabanın en yenisinin üzerindeki eski formattaki dosyalar ( `release/v*` `main` çekme isteği) kabul edilir.                                                                                                                    |
| Sıra dışı, düzenlenmiş veya yeniden adlandırılmış bir dosya `INSERT`, `UPDATE`, `DELETE` veya `REPLACE` ifadeleri içeriyor | **Uyarı** : değişim kontrolü verileri karşılaştırmaz, bu nedenle yükseltilmiş ve yeni veritabanlarının uygulanma sırasının sonucu değiştirip değiştirmediğini inceleyin.                                                                                                                                                                                                      |

Değiştirme kontrolünün bir çalıştırması, sıra dışı, düzenlenmiş ve yeniden adlandırılmış dosyaları birlikte kapsar.

Değiştirme kontrolü (`scripts/check/migration-commutation.ts`), gerçek kurulum yoluna sahip iki geçici veritabanı oluşturur:** yükseltilmiş** bir (temel geçişlerle önyükleme yapın, ardından çekme isteğinin geçişleriyle aynı dosyada yeniden başlatın) ve bir** taze** bir (çekme isteğinin geçişlerini içeren bir önyükleme). Ortaya çıkan şemaları karşılaştırır: tablolar ve sütunlar (sütun sırası göz ardı edilerek), UNIQUE / PRIMARY KEY ve FOREIGN KEY kısıtlamaları, her tablonun normalleştirilmiş `CREATE TABLE` metni ( CHECK kısıtlamalarını, harmanlamaları, oluşturulan sütunları ve tablo seçeneklerini kapsar), dizinler, tetikleyiciler ve görünümler. Satır verileri karşılaştırılmaz. Eşleşirlerse, kapı dosyanın bozuk olduğunu ancak gidip geldiğini ve geçtiğini yazdırır. Farklıysa, kapı farkla ve duruma ilişkin bir ipucuyla başarısız olur: sıra dışı bir dosya için adını `npm run db:new-migration` ile yeniden oluşturun; bu, dosya henüz birleştirilmediğinden güvenlidir; düzenlenmiş bir temel dosya için, temel içeriği geri yükleyin ve değişikliği yeni bir geçişe koyun; yeniden adlandırılmış bir dosya için, yeniden adlandırmayı geri alın veya dosyanın gidip geldiği yerde başka bir yeni zaman damgası seçin; asla başka bir adla aynı zaman damgasını seçmeyin. Denetimin kendisi yürütülemezse, kapı CI başarısız olur ve yalnızca yerel olarak uyarır. Düzenlenmiş bir temel dosya için, yükseltilmiş veritabanı, o dosyanın tabanının içeriğiyle oluşturulur ve ikinci önyükleme, sürümü zaten kayıtlı olduğundan onu atlar. Yeniden adlandırılan bir dosya için, yükseltilmiş veritabanı, dosyanın eski adıyla oluşturulur ve ikinci önyükleme, `_omniroute_migrations` satırını, onu yeniden çalıştırmak yerine uyumluluk girdisi aracılığıyla taşır; geçit yeni adı `--must-not-apply` ile iletir, dolayısıyla ikinci önyükleme bunu uygularsa kontrol başarısız olur. Yükseltilmiş yolda bir çekme isteği geçişi uygulanamazsa, yani her temel geçişten sonra (yeni kurulumda da başarısız olsun veya olmasın), kapı `migration do PR não aplica` bildirir ve sizden SQL tabanın mevcut şemasına göre düzeltmenizi ister; dosya daha sonraki bir zaman damgasına sahip başka bir çekme isteği geçişine bağlıysa adını `npm run db:new-migration` ile yeniden oluşturun.

Aynı karşılaştırmayı yerel olarak çalıştırmak için, en son sürümle karşılaştırmak üzere tabanı açıkça iletin; örneğin `npm run check:migration-numbering -- --base origin/<base-branch>` veya `npm run check:migration-numbering -- --base-latest-tag`.

### Open PR `NNN` Geçişini Dönüştürme

Anahtardan önce açılan bir çekme isteği hala `242_add_widgets.sql` gibi sıralı bir dosya taşıyabilir. `241` üzerindeki eski sayılar reddedilir, bu nedenle birleştirmeden önce dönüştürün:

1. **Açıklamayı koruyarak dosyayı oluşturucuyla yeniden adlandırın.** Yeni adı almak için `npm run db:new-migration -- <same description>` çalıştırın, SQL ona taşıyın ve eski `NNN_` dosyasını silin. Açıklama aynı kalmalıdır: aşağıdaki uyumluluk girişi onunla eşleşir.
2. **Kalıcı bir veritabanı eski numarayı çalıştırıyorsa bir uyumluluk girişi ekleyin.** Saklanan herhangi bir veritabanı (homolog, VPS, katkıda bulunanın kendi kurulumu) `NNN_` dosyasıyla PR bir yapısını çalıştırdıysa, `src/lib/db/migrationRunner/constants.ts` içindeki `RENAMED_MIGRATION_COMPATIBILITY` `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` ekleyin. Bu** `237` `241` geçiş için gereklidir** : bu yuvalar artık kanonik `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` ve `241_seen_models.sql` değerlerini tutar ve böyle bir giriş olmadan, böyle bir veritabanı kanonik geçişi sonsuza kadar atlar ve dönüştürülmüş olanı yeniden çalıştırır. Ayrıca hedef bir zaman damgası olduğunda `242` gibi boş kalan bir yuva için de çalışır. Şüphe duyduğunuzda girişi ekleyin. Bunu dizide nereye eklediğiniz önemli değildir: bir girişin hedef yuvası hala başka bir girişin uzaklaştığı bir satırı tuttuğunda (örneğin, eski bir `usage_history_calculated_cost` satırı `237` taşınmayı beklerken `237` bir PR satırını tutarken), koşucu bu girişin yuva serbest kalana kadar beklemesine izin verir. Yalnızca gerçek bir çakışma, örneğin girişsiz bir satır tarafından tutulan bir yuva veya yuvaları değiştiren iki giriş, `Cannot reconcile ...` ile önyüklemeyi durdurur.
3. **SQL bağımsız tutun** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), çünkü dönüştürülen geçiş, şemasının zaten mevcut olduğu bir veritabanıyla karşılaşabilir.
4. **Sürüm anahtarlı özel durumları taşıyın.** PR `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) veya `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`) içindeki eski numarası için bir büyük/küçük harf eklediyse, anahtarı yeni zaman damgasıyla değiştirin.

`tests/unit/db/codex-fence-migration-rename.test.ts` yeniden adlandırılmış bir geçişe yönelik testin çalışan bir örneğidir.

### Geçiş Öncesi Şubelere Geri Bildirimler

Bir `YYYYMMDDHHMMSS_` dosyasını asla anahtardan önce gelen bir şubeye (örneğin eski bir `release/v*` şubesi) rastgele seçmeyin veya desteklemeyin. Buradaki çalıştırıcı dosya adlarını metin olarak sıralıyor, böylece zaman damgalı bir dosya yeni bir veritabanında `201_` ve `202_` arasında çalışacak ve oradaki eski kapı 14 basamaklı önekleri anlamıyor. Böyle bir dalda, değişikliği o dalın kendi sonraki `NNN_` dosyası olarak yazın, idempotent, böylece zaman damgalı sürüm daha sonra geldiğinde işlem yapılmaz.

### Taşıma İşlemleri Nasıl Yürür?

Başlangıçta `migrationRunner.ts`:

1. Mevcut değilse `_omniroute_migrations` tablosunu oluşturur
2. Halihazırda uygulanmış geçişlere ilişkin sorgular
3. Tüm yeni geçiş işlemlerini, her biri bir işlemde olmak üzere sırayla uygular
4. Uygulanan her geçişi zaman damgasıyla kaydeder

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

### iktidarsızlık

Göçler olmalı** güçsüz** — bunları iki kez çalıştırması işlem dışı olmalıdır:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`, `IF EXISTS` ve `OR IGNORE` / `OR REPLACE` cümlelerini özgürce kullanın.

### Yeni Bir Taşıma Ekleme

1. **Dosyayı jeneratörle oluşturun** : `npm run db:new-migration -- <description>` (örneğin `npm run db:new-migration -- add combo priority`). Geçerli UTC zamanı ve bir yorum başlığıyla `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` yazar, bu zaman damgası alınırsa bir saniye ileri gider ve hiçbir zaman dosyanın üzerine yazmaz. Numarayı elle seçmeyin.
2. **Güvenli DDL kullanın** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Verileri dikkatlice doldurun** : mevcut satırları işlemek için `UPDATE ... WHERE ...` kullanın
4. **Sırayı ve adlandırmayı kontrol edin** : `npm run test:migrations:fresh` (boş bir veritabanındaki tüm geçişler) ve `npm run check:migration-numbering`
5. **Bir kopya üzerinde test edin** : hiçbir zaman üretimde test edilmemiş geçişleri çalıştırma
6. **Koddan oluşturulan bir tablonun da geçişe ihtiyacı var** : Eğer bir modül aynı zamanda tabloyu yavaş bir şekilde oluşturuyorsa (`CREATE TABLE IF NOT EXISTS`, kendi kendini iyileştirme yolu olarak tutulur), bir geçişin onu aynı DDL ile oluşturması gerekir. Aksi takdirde, temiz kurulum ve yükseltilmiş kurulum, kod yolunun çalışıp çalışmadığına bağlı olarak farklı şemalarla sonuçlanır. `tests/unit/db/lazy-table-migration-guard.test.ts` `src/` ve `open-sse/` tarar ve geçiş olmadan tembel bir `CREATE` başarısız olur (#20557). Örnek: `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`.

Örnek:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Geriye dönük olarak uyumsuz değişiklikler** (örneğin, sütunların düşürülmesi) zordur. OmniRoute geçiş uygulandığında NOT — sürüm düşürmesini destekliyor mu, şema değişikliği kalıcıdır. Buna göre plan yapın.

---

## Bekleyen Verilerin Şifrelenmesi

Hassas alanlar (API anahtarları, OAuth belirteçleri, bağlantı dizeleri) bekleme durumundayken **AES-256-GCM** kullanılarak şifrelenir.

### Nasıl Çalışır?

```ts
// src/lib/db/encryption.ts (basitleştirilmiş)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Nerelerde Kullanılır?

- `provider_connections.api_key` — uygulama düzeyinde şifrelenir
- `provider_connections.access_token`, `refresh_token`, `id_token` — uygulama düzeyinde şifrelenir
- `namespace = "secrets"` değerine sahip `key_value` girdileri — uygulama düzeyinde şifrelenir
- `proxy_registry.auth` — mevcutsa uygulama düzeyinde şifrelenir

### Şifreleme Anahtarı

Şifreleme anahtarı, bir **paroladan** (`STORAGE_ENCRYPTION_KEY` ortam değişkeni aracılığıyla ayarlanır) ve bir **salt değerinden** (veritabanında saklanır) türetilir. Verilerin şifresini çözmek için her ikisi de gereklidir.

```bash
# Güvenli bir parola oluşturun
openssl rand -hex 32

# .env dosyasında ayarlayın
STORAGE_ENCRYPTION_KEY=<anahtarınız>
```

> **Kritik**: Şifreleme anahtarının kaybedilmesi, şifrelenmiş tüm verilere erişimin kaybedilmesi anlamına gelir. **Anahtarı veritabanından ayrı olarak yedekleyin**.

### Şifrelenmeyenler

Performans nedenleriyle aşağıdakiler düz metin olarak saklanır:

- Sağlayıcı görünen adları
- Model tanımları (zaten herkese açık)
- Yönlendirme kuralları
- Kullanım kayıtları (kişisel olarak tanımlanabilir bilgi içermez)

---

## Şifrelemeyle İlgili Uyarılar (v3.8.16+)

OmniRoute, iki şifreleme şemasını şeffaf biçimde işlemek için **`migrateLegacyEncryptedString()`** kullanır:

- **Eski** (v3.5.0 öncesi): XOR tabanlı "şifreleme" (gerçek kriptografi değildir)
- **Güncel**: Uygun IV ve kimlik doğrulama etiketiyle AES-256-GCM

Geçiş yardımcısı eski biçimi algılar ve ilk okuma sırasında veriyi yeni şemayla yeniden şifreler. Bu sayede kimlik bilgilerini kaybetmeden eski bir veritabanını yükseltebilirsiniz.

---

## Okuma Önbelleği

Sık okunan veriler (modeller, sağlayıcılar, ayarlar) için `readCache.ts`, **bellek içi önbellek** sağlar:

```ts
// Başlangıçta önbelleğe alınır, yazma sırasında geçersiz kılınır
const providers = await getCachedProviders(); // Hızlı, bellek içi
const fresh = await listProviders(); // Yavaş, veritabanına erişir
```

| Önbelleğe alınan varlık | Önbellek anahtarı | TTL                  |
| ----------------------- | ----------------- | -------------------- |
| `models`                | `models:v1`       | Yazma işlemine kadar |
| `provider_connections`  | `providers:v1`    | Yazma işlemine kadar |
| `settings`              | `settings:v1`     | Yazma işlemine kadar |
| `combos`                | `combos:v1`       | Yazma işlemine kadar |

İlgili tabloya yapılan her yazma işleminde önbellek geçersiz kılınır.

---

## Yedekleme ve Kurtarma

### Manuel Yedekleme

```bash
# Yerel bir yedek oluşturmak için CLI'ı kullanın
omniroute backup create --name pre-migration

# Veya API aracılığıyla
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Yedekleme dosyası şunları içerir:

- Tüm veritabanı tabloları (JSON olarak serileştirilmiş)
- Çağrı günlüğü eserleri (base64 kodlu, isteğe bağlı)
- Ayarlar + gizli bilgiler (şifrelenmiş)
- Eklenti yapılandırması

### Geri Yükleme

```bash
# CLI aracılığıyla
omniroute restore pre-migration

# API aracılığıyla
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Uyarı**: Geri yükleme işlemi tüm veritabanının üzerine yazar. Önce tüm istemcileri durdurun.

### Otomatik Yedeklemeler

```bash
# CLI aracılığıyla otomatik günlük yedeklemeleri etkinleştirin
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Zamanlama, varsayılan olarak her 30 saniyede bir tetiklenen ve cron ifadesini sunucunun yerel saatine göre değerlendiren bir arka plan görevi tarafından sunucu tarafında yürütülür.

| Değişken                                    | Varsayılan | Açıklama                                                                                                                                       |
| ------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`    | Milisaniye cinsinden tetikleme aralığı (en az `5000`). Eşleşen cron dakikasına güvenilir biçimde denk gelmek için 60 saniyeden kısa olmalıdır. |

### SQLite Çalışırken Yedekleme

Çalışan bir veritabanını kesinti olmadan yedeklemek için:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Bu komut, SQLite'ın çevrimiçi yedekleme API'sini kullanır — OmniRoute çalışırken güvenle yürütülebilir.

---

## Performans Ayarlama

### WAL Modu

WAL varsayılan olarak etkindir. Yüksek yazma iş yükleri için şunları göz önünde bulundurun:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute `journal_size_limit` ayarlamaz. Bir denetim noktası WAL çerçevelerini ana dosyaya taşır, ancak WAL dosyası ayrılan en büyük boyutunu korur. `OMNIROUTE_WAL_GUARD_MAX_MB` guard yalnızca `wal_checkpoint(RESTART)` uyarır ve çalıştırır; disk boyutunda bir kapak değil.

### Dizinler

Performansa yönelik temel dizinler (geçişlerle otomatik olarak oluşturulur):

- sağlayıcıya göre `idx_models_provider` — model aramaları
- `idx_combo_targets_combo_id` — birleşik hedef genişletme
- `idx_usage_history_api_key_timestamp` — kullanım analitiği
- `idx_quota_snapshots_api_key_window` — kota takibi
- `idx_call_logs_timestamp` — çağrı günlüğü sorguları

Yeni bir dizin eklemek için bir geçiş oluşturun:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Bellek Eşlemeli I/O

Çok büyük veritabanları için (> 10GB), bellek eşlemesi SQLite pragma aracılığıyla ayarlanabilir:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Sıkıştırma

Uzun süredir çalışan OmniRoute bulut sunucuları ara sıra `VACUUM` yararlanır:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Trafiğin düşük olduğu dönemlerde aylık olarak çalıştırın. (WAL modu ihtiyacı azaltır ancak ortadan kaldırmaz.)

---

## Sistem Durumu Kontrolü

`src/lib/db/healthCheck.ts`, **veritabanı düzeyinde sistem durumu tanılaması** sağlar:

Her iki fiil de kimlik doğrulaması gerektirir (aksi takdirde `401`). `GET` yalnızca tanılama yapar; `POST`, aynı kontrolü `autoRepair` etkinleştirilmiş olarak çalıştırır.

```bash
GET  /api/db/health   # tanıla
POST /api/db/health   # tanıla + onar
```

Yanıt, `runDbHealthCheck()` tarafından üretilen `DbHealthCheckResult` değeridir
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Etki alanı bütçeleri, artık mevcut olmayan API anahtarlarına başvuruyordu.",
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

| Alan              | Anlamı                                                                                                                                                                            |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `issues` boş olduğunda `true` olur. `driver` bunu hiçbir zaman etkilemez.                                                                                                         |
| `issues[].type`   | `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state` değerlerinden biri.                                                                               |
| `repairedCount`   | Bu çalıştırma sırasında onarılan satırlar; `autoRepair` false olduğunda her zaman `0` olur.                                                                                       |
| `backupCreated`   | Onarımdan önce yedek alınıp alınmadığı.                                                                                                                                           |
| `checkedAt`       | Çalıştırma ile bu çalıştırmanın yazdığı tüm onarım notları tarafından paylaşılan ISO zaman damgası.                                                                               |
| `driver.name`     | Kontrol edilen veritabanına hizmet veren SQLite sürücüsü.                                                                                                                         |
| `driver.degraded` | Yazmalar veritabanı dosyası tarafından kalıcı şekilde desteklenmediğinde `true` olur — `sql.js` WASM fallback'i (tüm dosyanın kalıcılaştırılması) veya bellek içi bir veritabanı. |

Aynı yük, `omniroute_db_health_check` MCP aracı tarafından da döndürülür.

Bozulmayı tespit etmek için `PRAGMA integrity_check` çalıştırın:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Şunu yazdırmalıdır: ok
```

`ok` dışında herhangi bir sonuç döndürürse **veritabanını kullanmayı derhal bırakın** ve yedekten geri yükleyin.

---

## Felaket Kurtarma

### Senaryo 1: WAL Dosyası Kayboldu

`-wal` dosyası eksik ancak `-shm` ve ana veritabanı sağlam:

```bash
# Bir sonraki açılışta otomatik olarak kurtarılır
omniroute
```

SQLite otomatik kurtarma yapamazsa:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Senaryo 2: Ana Veritabanı Dosyası Bozuldu

Yedekten geri yükleyin:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]`, çalışan bir sunucudan yalnızca tam bir `.tar.gz` arşivi indirir
(`GET /api/db-backups/exportAll`, operatör kimlik bilgileri gereklidir); herhangi bir geri yükleme işlemi gerçekleştirmez.

### Senaryo 3: Şifreleme Anahtarı Kayboldu

Anahtar olmadan **kurtarma mümkün değildir**. Şifrelenmiş alanlar okunamaz. Tüm sağlayıcıları yeni kimlik bilgileriyle manuel olarak yeniden ekleyin.

> **Risk azaltma**: Şifreleme anahtarını her zaman ayrı olarak, tercihen bir parola yöneticisinde veya KMS'de yedekleyin.

### Senaryo 4: Disk Dolu

SQLite, `SQLITE_FULL` hataları döndürür. Diskte yer açtıktan sonra şunu çalıştırın:

```bash
# Alan açmak için WAL denetim noktası oluşturun
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Yaygın İşlemler

### Bir Tabloyu İnceleme

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Tüm Tablolardaki Satırları Sayma

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Tüm Verileri Sıfırlama (Silme)

```bash
# Önce OmniRoute'u durdurun
omniroute stop

# Veritabanı dosyasını silin
rm ~/.omniroute/storage.sqlite*

# Yeniden başlatın (boş veritabanı yeniden oluşturulur)
omniroute
```

**Seçici** sıfırlama için (sağlayıcıları koruyup kullanım verilerini silme):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Tek Bir Tabloyu Dışa Aktarma

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Sorun Giderme

### "Veritabanı kilitli"

Başka bir işlem, yazma kilidini tutuyor. Şunlardan birini yapın:

- Diğer işlemin tamamlanmasını bekleyin (`lsof | grep storage.sqlite` ile kontrol edin)
- Diğer işlemi sonlandırın
- Sorun devam ederse OmniRoute'u yeniden başlatın

### "Yabancı anahtar kısıtlaması başarısız oldu"

Bir alan modülü, başvuru bütünlüğünü ihlal ediyor. Şunları kontrol edin:

- Bağımlı tablolardaki yetim satırlar
- Yayılmayan kademeli silmeler
- Yabancı anahtarı değiştiren yakın tarihli bir geçiş

İhlalleri bulmak için `PRAGMA foreign_key_check;` komutunu çalıştırın.

### "Bellek yetersiz"

SQLite'ın bellek eşlemeli G/Ç kullanımı, işletim sistemi sınırını aşıyor. SQLite pragma'sı aracılığıyla azaltın:

```sql
PRAGMA mmap_size = 134217728;  -- 256MB yerine 128MB
```

Veya devre dışı bırakın:

```sql
PRAGMA mmap_size = 0;
```

### "Geçiş yarıda başarısız oldu"

Geçiş bir işlem içinde çalıştırıldığı için geri alınmış olmalıdır. Alınmadıysa:

1. **OmniRoute'u durdurun** (daha fazla denemeyi önleyin)
2. `sqlite3` ile **veritabanı durumunu kontrol edin**
3. Kısmi geçişi **manuel olarak düzeltin**
4. OmniRoute'u **yeniden çalıştırın** (geçiş yeniden denenecektir)

Bunu önlemek için geçişleri her zaman önce bir kopya üzerinde test edin.

---

## Ayrıca Bakınız

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — kullanım tabloları
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — sistem durumu izleme
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — sürüm akışı
- Kaynak: `src/lib/db/` (80+ dosya, ~25K kod satırı)
