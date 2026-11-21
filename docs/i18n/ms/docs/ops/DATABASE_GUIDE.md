# Database Schema & Operations Guide (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: OmniRoute menggunakan **SQLite dengan penjurnalan WAL** sebagai stor utama, dengan penyulitan **AES-256-GCM** ketika disimpan untuk medan sensitif. Panduan ini merangkumi skema, migrasi, sandaran/pemulihan, dan buku panduan operasi.

**Sumber:**

- `src/lib/db/core.ts` — tika tunggal + SCHEMA_SQL (17 jadual asas)
- `src/lib/db/migrationRunner.ts` — migrasi berversi
- `src/lib/db/migrations/` — 167 fail SQL berversi
- `src/lib/db/encryption.ts` — pembantu penyulitan
- `src/lib/db/backup.ts` — eksport/import sandaran
- `src/lib/db/healthCheck.ts` — diagnostik kesihatan

---

## Mengapa SQLite?

OmniRoute memilih SQLite berbanding PostgreSQL/MySQL atas beberapa sebab:

| Faktor             | SQLite                                         | PostgreSQL                                         |
| ------------------ | ---------------------------------------------- | -------------------------------------------------- |
| **Penggunaan**     | Terbenam — tiada pelayan berasingan            | Memerlukan penyediaan pelayan                      |
| **Penyulitan**     | Lapisan aplikasi (AES-256-GCM)                 | TDE terbina dalam                                  |
| **Prestasi**       | Lebih pantas untuk beban kerja kecil/sederhana | Lebih baik untuk penulisan serentak berskala besar |
| **Keserentakan**   | Mod WAL membenarkan pembacaan serentak         | MVCC penuh                                         |
| **Sandaran**       | Salinan fail tunggal                           | `pg_dump` atau syot kilat sistem fail              |
| **Kes penggunaan** | Pemasangan per pengguna, terbenam              | SaaS berbilang penyewa                             |

Untuk penggunaan **pengguna tunggal, tika tunggal** (kes penggunaan utama OmniRoute), SQLite lebih ringkas dan pantas.

### Penjurnalan WAL

`core.ts` membuka pangkalan data dengan **mod WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL membenarkan **pembacaan serentak** semasa penulisan — penting untuk papan pemuka, yang membuat pertanyaan ketika permintaan sedang direkodkan.

Saiz cache lalai ialah **65,536 KiB (64 MiB)**. SQLite mentafsirkan `cache_size`
negatif sebagai had atas anggaran dalam KiB dan memperuntukkan halaman mengikut
keperluan. **Tetapan > Sistem & Storan > Saiz Cache** menerima nilai integer dari
**1 hingga 1,000,000 KiB**; penyimpanan tetapan akan menerapkannya pada sambungan
pangkalan data aktif, dan OmniRoute memulihkan nilai tersimpan ketika dimulakan.

---

## Lokasi Pangkalan Data

Fail SQLite disimpan di:

| OS      | Laluan                                                                 |
| ------- | ---------------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                          |
| macOS   | `~/.omniroute/storage.sqlite`                                          |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                              |
| Docker  | `/app/data/storage.sqlite` (boleh dikonfigurasikan melalui `DATA_DIR`) |

Fail pendamping:

- `storage.sqlite-wal` — log tulis awal
- `storage.sqlite-shm` — fail memori dikongsi
- `call_logs/` — artifak muatan permintaan (jika didayakan)

**Gantikan lokasi:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Seni Bina Modul Domain

Pangkalan data OmniRoute mempunyai **110 modul TypeScript peringkat atas** dalam `src/lib/db/`. Setiap modul domain:

- Memiliki satu atau lebih jadual khusus
- Mengeksport fungsi CRUD berjenis
- Tidak pernah mengakses jadual modul lain
- Menggunakan `getDbInstance()` daripada `core.ts` untuk mengakses DB

### 110 Modul DB Peringkat Atas

OmniRoute mempunyai **110 fail TypeScript peringkat atas** dalam `src/lib/db/`. Di bawah ialah sampel modul teras; lihat penyenaraian direktori untuk senarai lengkap:

| Modul                   | Jadual                                                         | Tanggungjawab                                                             |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Pendaftaran dan kelayakan penyedia melalui OAuth/kunci API                |
| `models.ts`             | `key_value` (data model)                                       | Takrifan model, keupayaan, penetapan harga                                |
| `combos.ts`             | `combos`                                                       | Konfigurasi dan susunan penghalaan kombo                                  |
| `apiKeys.ts`            | `api_keys`                                                     | Kitar hayat kunci API, skop, penjejakan kuota                             |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Konfigurasi sistem dan stor KV dikongsi                                   |
| `backup.ts`             | —                                                              | Operasi eksport/import sandaran                                           |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Konfigurasi proksi dan peraturan penghalaan                               |
| `prompts.ts`            | `prompt_templates`                                             | Templat gesaan boleh guna semula, pengurusan versi                        |
| `webhooks.ts`           | `webhooks`                                                     | Langganan dan log webhook berasaskan peristiwa                            |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Pengelogan audit bagi setiap permintaan (pilihan, volum tinggi)           |
| `domainState.ts`        | `domain_*` (5 jadual)                                          | Belanjawan domain, pemutus litar, sekatan, rantaian sandaran, sejarah kos |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Kunci API yang disenaraikan putih untuk MCP/A2A                           |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Penggunaan kuota sejarah                                                  |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Memetakan model kepada kombo lalai                                        |
| `cliToolState.ts`       | `cli_tool_state`                                               | Keadaan berterusan khusus CLI                                             |
| `encryption.ts`         | —                                                              | Pembantu untuk menyulitkan/menyahsulit medan                              |
| `readCache.ts`          | —                                                              | Cache dalam memori untuk operasi intensif baca                            |
| `secrets.ts`            | `key_value` (entri disulitkan)                                 | Storan rahsia disulitkan                                                  |
| `stateReset.ts`         | —                                                              | Menghapuskan/menetapkan semula keadaan DB untuk pengujian                 |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Konteks sesi untuk penyerahan ejen                                        |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Penjejakan penggunaan                                                     |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Konfigurasi pemampatan                                                    |

### Sempadan Modul

Peraturan seni bina teras: **modul tidak mengakses jadual modul lain secara langsung**. Untuk menggunakan data modul lain, import fungsi daripada modul tersebut.

```ts
// ❌ SALAH: SQL langsung daripada modul lain
db.prepare("SELECT * FROM provider_connections").all();

// ✅ BETUL: gunakan fungsi modul penyedia
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Peraturan ini dikuatkuasakan melalui semakan kod — tiada pemeriksaan statik, tetapi pelanggaran akan ditandakan.

---

## Skema Asas (17 jadual)

`core.ts` mentakrifkan 17 jadual asas dalam `SCHEMA_SQL`. Jadual-jadual ini dicipta oleh migrasi `001_initial_schema.sql` dan membentuk skema teras.

### Jadual Teras (dicipta dalam migrasi awal)

| Jadual                     | Tujuan                                | Lajur utama                                                             |
| -------------------------- | ------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Bukti kelayakan penyedia (disulitkan) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Maklumat penghalaan nod penyedia      | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Storan KV umum                        | `namespace`, `key`, `value`                                             |
| `combos`                   | Takrif gabungan penghalaan            | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Kunci API untuk get laluan            | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadata pangkalan data               | `key`, `value`                                                          |
| `usage_history`            | Rekod penggunaan permintaan           | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Muatan permintaan & respons           | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Log permintaan proksi                 | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Rantaian model kepada penyedia        | `model`, `chain`                                                        |
| `domain_budgets`           | Belanjawan perbelanjaan setiap domain | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Sejarah penetapan semula belanjawan   | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Penjejakan kos setiap domain          | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Keadaan had kadar domain              | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Keadaan pemutus litar setiap domain   | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache respons LLM                     | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Syot kilat kuota bersejarah           | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Jadual Tambahan (ditambah oleh migrasi kemudian)

Migrasi seterusnya menambah jadual seperti:

- `cli_tool_state` (migrasi 011) — keadaan alat CLI
- Jadual `mcp_*` — audit pelayan MCP
- Jadual `a2a_*` — keadaan tugas A2A
- Jadual `usage_*` — penjejakan penggunaan
- Jadual `plugin_*` — sistem pemalam
- `skill_executions` — sejarah pelaksanaan kemahiran
- Jadual `memory_*` — sistem memori
- Jadual `compression_*` — sistem pemampatan
- Jadual `webhook_*` — log penghantaran webhook
- Jadual `acp_*` — Protokol Klien Ejen
- Jadual `oneproxy_*` — pasaran 1proxy
- `proxy_assignments` — pengikatan skop proksi
- `detailed_call_artifacts` — metadata artifak log panggilan
- `quota_alert_history` — audit amaran kuota
- `command_code_auth_sessions` — sesi OAuth Command Code

Senarai penuh kira-kira 30+ jadual terdapat dalam `src/lib/db/migrations/`.

---

## Penghijrahan

OmniRoute guna** versi, migrasi idempoten** dalam `src/lib/db/migrations/`. Setiap migrasi ialah satu fail SQL. Dua format penamaan wujud bersama; versi yang direkodkan dalam `_omniroute_migrations` ialah awalan angka.

### Penamaan Migrasi

| Format                                           | Contoh                               | Digunakan untuk                                                                                                                                                          |
| ------------------------------------------------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `NNN_description.sql` (tepat 3 digit)            | `241_seen_models.sql`                | Siri lama `001`–`241`. Dibekukan apabila format cap masa mendarat (`240` dan `241` telah digabungkan sejurus sebelum itu): tiada fail baharu mendapat nombor berjujukan. |
| `YYYYMMDDHHMMSS_description.sql` (14 digit, UTC) | `20261113120000_add_usage_index.sql` | Setiap penghijrahan yang dibuat dari 2026-11-13 pada.                                                                                                                    |

Sebab perubahan: dengan nombor berjujukan, PRs selari memilih nombor seterusnya yang sama dan semua kecuali satu perlu menomborkan semula sebelum bergabung. Cap masa UTC memberikan setiap PR versinya sendiri.

Peraturan untuk format cap masa (dikuatkuasakan oleh `npm run check:migration-numbering`, dikongsi dengan penjana dalam `scripts/check/lib/migrationNaming.mjs`):

- Cap masa ialah tarikh dan masa UTC sebenar, tidak lebih awal daripada `20261113000000` dan tidak lebih daripada 10 minit pada masa hadapan.
- Penerangan ialah `snake_case` huruf kecil bermula dengan huruf (`a-z`, `0-9`, `_` tunggal antara perkataan), paling banyak 80 aksara.
- Dua fail dengan cap masa yang sama adalah pendua.
- Peraturan tanpa jurang hanya digunakan pada siri lama: setiap nombor dari `001` hingga `241` mesti wujud, kecuali jurang yang diketahui `026`, `055` dan `121`. Memadam `241` (atau mana-mana fail lama) gagal gerbang. `001` dan `241` tidak boleh ditambahkan pada senarai dibenarkan `KNOWN_GAPS`. Fail yang dicap masa tidak pernah mencipta jurang.
- Setiap entri dalam `src/lib/db/migrations/` mestilah fail biasa dengan nama `.sql` huruf kecil yang sah. Direktori, pautan sym, fail `.SQL` atau `.sql.bak`, fail tersembunyi atau nama dengan ruang gagal masuk, kerana pelari akan melangkaunya secara senyap atau ranap semasa but.

**Mohon pesanan.** Pelari mengisih mengikut nilai berangka awalan, bukan mengikut teks: fail `001`–`241` lama dahulu, kemudian fail cap masa dalam susunan cap masa, kemudian mana-mana direktori ruang nama yang didaftarkan dengan `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (versi seperti `ee-001`). Penghijrahan yang belum selesai ialah mana-mana fail yang versinya tiada dalam `_omniroute_migrations`, jadi penghijrahan daripada cawangan lama yang bergabung selepas yang lebih baharu masih digunakan pada pangkalan data sedia ada.

**Cap masa ialah tertib penciptaan, bukan tertib gabungan.** Jika penghijrahan anda bergantung pada jadual atau lajur yang dibuat oleh penghijrahan dengan a** lebih baru** cap waktu (contohnya, satu daripada PR lain yang bergabung dahulu), pangkalan data baharu akan menjalankan pangkalan data anda dahulu dan gagal. Semasa PR anda masih terbuka, jana semula nama fail dengan `npm run db:new-migration` supaya ia mendapat cap masa yang lebih baharu atau jadikannya bebas. `npm run test:migrations:fresh` menggunakan setiap migrasi ke pangkalan data kosong dan menangkap ini.

### Penghijrahan Gabungan Tidak Pernah Dipadamkan atau Dinamakan Semula

Setelah fail migrasi berada pada cawangan keluaran atau `main`, ia telah pun dijalankan pada pangkalan data homolog dan pembangun, pada pemasangan VPS dan dalam penyegerakan Perusahaan. Sejak itu:

- **Jangan sekali-kali memadamkannya.** Pemasangan baharu akan kehilangan skemanya manakala pangkalan data yang dinaik taraf menyimpannya.
- **Jangan sekali-kali menamakannya.** Versi dalam `_omniroute_migrations` tidak lagi sepadan dengan fail, jadi setiap pangkalan data yang telah menggunakannya akan menjalankannya semula. SQL bukan idempoten kemudian menduplikasi data atau menghentikan but.
- **Perlukan skema yang berbeza?** Buat penghijrahan baharu dengan `npm run db:new-migration`.

Penamaan semula adalah selamat hanya untuk fail yang belum dicantumkan lagi, iaitu kes yang dirujuk oleh pembayang get. Teg keluaran tidak mengubah apa-apa di sini: setiap tolakan ke cawangan `release/v*` menerbitkan imej Docker `:next` dan berjalan pada homolog, pemasangan VPS dan penyegerakan Perusahaan, jadi penghijrahan gabungan telah dijalankan pada pangkalan data sebenar sebelum sebarang teg `vX.Y.Z` wujud. Gerbang gagal setiap pengalihan keluar fail asas, ditandakan atau tidak.

- **Mengembalikan penghijrahan yang digabungkan.** `git revert` yang memadamkan fail gagal gerbang. Simpan fail dan buat asal skemanya dalam migrasi baharu: `npm run db:new-migration -- <description>`, dengan `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` dan seterusnya. Pangkalan data yang dinaik taraf dan segar kemudian berakhir dengan skema yang sama.
- **Nama semula yang diterima: entri keserasian dan kandungan yang sama.** Jika fail yang digabungkan mesti dialihkan (contohnya, dua fail yang digabungkan berkongsi cap masa dan pelari berhenti dengan perlanggaran versi), namakan semula fail yang terkemudian tanpa menyentuh SQL dan tambah `{ fromVersion, fromName, toVersion, toName }` kepada `RENAMED_MIGRATION_COMPATIBILITY` dalam `src/lib/db/migrationRunner/constants.ts`. Pangkalan data yang menggunakan versi lama memindahkan baris `_omniroute_migrations` mereka dan bukannya menjalankan fail itu semula. Gerbang memberi amaran tentang nama semula sedemikian dan sentiasa menjalankan semakan pertukaran padanya, tidak kira cap masa baharu: pemasangan baharu menggunakan fail pada kedudukan baharunya, pangkalan data dinaik taraf tidak, jadi pilih cap masa baharu berhampiran yang lama. Gerbang gagal menamakan semula jika kandungan ditukar (perubahan skema masih berlaku dalam penghijrahan baharu), atau jika fail sasaran masukan tiada pada cakera.
- **Jangan sekali-kali menamakan semula dalam cap masa yang sama.** Penamaan semula yang menyimpan cap masa dan hanya menukar perihalan gagal masuk, dengan atau tanpa entri. Dengan entri yang `toVersion` bersamaan dengan `fromVersion`, pelari memadamkan baris `_omniroute_migrations` lama dan menggunakan fail itu semula pada setiap pangkalan data yang telah menjalankannya. Tanpa entri, pelari hanya menjejaki versi: ia melangkau fail pada pangkalan data tersebut (kandungan baharu tidak pernah berjalan di sana) dan mencatat ralat pennomboran semula pada setiap but. Gunakan cap masa lain serta entri keserasian, atau simpan namanya.
- **Gerbang menyemak bahawa fail yang dinamakan semula tidak berjalan semula.** Untuk setiap nama semula yang dilindungi, get menghantar nama fail baharu kepada semakan ganti dengan `--must-not-apply`. Semakan but pangkalan data dinaik taraf dengan pelari sebenar, dan jika pelari menggunakan fail itu semula (contohnya, kerana entri mempunyai versi atau nama yang salah, atau kerana penghurai teks get membaca `constants.ts` berbeza daripada TypeScript), get gagal dengan `migration renomeada rodaria de novo` dan meminta anda menyemak versi dan nama lama dan baharu entri itu.

### Perkara yang Diperiksa oleh Pintu Terhadap Pangkalan

Atas permintaan tarik dan larian merge-queue, `npm run check:migration-numbering` membandingkan `src/lib/db/migrations/` pada cakera dengan direktori yang sama pada cawangan asas. Asasnya ialah, dalam tertib ini: `--base-latest-tag`, `--base <ref>`, pembolehubah `MIGRATION_BASE_REF` atau, apabila `GITHUB_EVENT_NAME` ialah `pull_request`, `pull_request_target` atau `merge_group`, induk pertama komit gabungan, `merge_group.base_sha` muatan acara atau `git merge-base HEAD origin/$GITHUB_BASE_REF`. Dalam permintaan tarik atau larian gilir gabungan tanpa asas yang boleh diselesaikan, pintu itu gagal. Di luar CI tanpa `--base` ia mencetak `comparação com a base: pulada (sem --base)` dan melangkau peraturan ini.

`--base-latest-tag` membandingkan dengan teg keluaran terbaharu (`vX.Y.Z` dalam susunan semver; tag akhiran seperti nightlies tidak dikira) yang ada dalam sejarah `HEAD`, dengan peraturan yang sama seperti `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) menjalankan gerbang dengan cara ini, kerana larian tolak dan berjadual tidak mempunyai asas permintaan tarik dan gabungan boleh mendarat tanpa larian CI baharu. Tanpa teg keluaran dalam sejarah pintu gerbang gagal; jalankan `git fetch --tags` (dalam CI, `actions/checkout` dengan `fetch-depth: 0` membawa tag).

| Tukar pada permintaan tarik                                                                                             | Hasilnya                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Fail yang wujud pada pangkalan dinamakan semula, dengan entri `RENAMED_MIGRATION_COMPATIBILITY`                         | **Amaran** jika kandungan adalah sama, dan semakan pertukaran berjalan apa sahaja cap masa baharu; ia gagal jika kedudukan baharu menukar skema akhir (buat asal nama semula, atau pilih cap waktu baharu lain di mana ia berulang-alik) atau jika pelari akan menggunakan fail yang dinamakan semula pada pangkalan data yang dinaik taraf.** gagal** jika kandungan berubah. |
| Fail yang wujud di pangkalan dinamakan semula dengan mengekalkan cap masanya (hanya perihalan berubah)                  | **gagal** , dengan atau tanpa entri: pelari akan menggunakannya semula (dengan entri) atau melangkaunya mengikut versi (tanpa satu). Gunakan cap masa lain serta entri keserasian, atau simpan namanya.                                                                                                                                                                        |
| Fail yang wujud di pangkalan dipadamkan, atau dinamakan semula tanpa entri                                              | **gagal** , sama ada fail itu berada dalam teg keluaran atau tidak. Untuk membuat asalnya, pulihkan fail dengan `git checkout <base> -- src/lib/db/migrations/<file>`; untuk mengembalikan skemanya, tambahkan migrasi baharu dengan `DROP ... IF EXISTS`.                                                                                                                     |
| Fail yang wujud di pangkalan mempunyai kandungan yang berbeza                                                           | **Amaran** (anotasi `::warning` dalam Tindakan GitHub ), dan semakan penukaran berjalan. Gagal jika pengeditan mengubah skema akhir, kerana pangkalan data yang dinaik taraf tidak menggunakan fail yang diedit semula: letakkan perubahan dalam migrasi baharu. Suntingan yang tidak berbahaya (komen, `IF NOT EXISTS`) hanya memberi amaran.                                 |
| Fail cap masa ditambah dengan cap masa yang tidak lebih baharu daripada cap masa yang terbaharu                         | Menjalankan semakan pertukaran, yang diterangkan di bawah.                                                                                                                                                                                                                                                                                                                     |
| Fail `NNN_` format lama ditambah dengan nombor di bawah fail format lama terbaharu pangkalan                            | **gagal** , walaupun `KNOWN_GAPS` diedit dalam permintaan tarik yang sama: siri lama dibekukan, buat migrasi dengan `npm run db:new-migration`. Fail format lama di atas fail terbaharu pangkalan (permintaan tarik `release/v*` ke `main` ) diterima.                                                                                                                         |
| Fail yang tidak tertib, diedit atau dinamakan semula mengandungi pernyataan `INSERT`, `UPDATE`, `DELETE` atau `REPLACE` | **Amaran** : semakan pertukaran tidak membandingkan data, jadi semak sama ada susunan pangkalan data yang dinaik taraf dan baharu digunakan ia mengubah hasilnya.                                                                                                                                                                                                              |

Satu larian semakan pertukaran meliputi fail yang tidak teratur, fail yang diedit dan dinamakan semula bersama-sama.

Semakan pertukaran (`scripts/check/migration-commutation.ts`) membina dua pangkalan data sementara dengan laluan pemasangan sebenar: a** dinaik taraf** satu (but dengan migrasi asas, kemudian but semula pada fail yang sama dengan migrasi permintaan tarik) dan** segar** satu (satu but dengan migrasi permintaan tarik). Ia membandingkan skema yang terhasil: jadual dan lajur (mengabaikan susunan lajur), kekangan UNIQUE / PRIMARY KEY dan FOREIGN KEY, teks `CREATE TABLE` yang dinormalkan bagi setiap jadual (yang meliputi kekangan CHECK, penyusunan, lajur terjana dan pilihan jadual), indeks, pencetus dan pandangan. Data baris tidak dibandingkan. Jika ia sepadan, pintu pagar mencetak bahawa fail itu tidak teratur tetapi berulang-alik dan berlalu. Jika mereka berbeza, get gagal dengan perbezaan dan pembayang untuk kes: untuk fail yang tidak tertib, jana semula namanya dengan `npm run db:new-migration`, yang selamat kerana fail itu belum digabungkan lagi; untuk fail asas yang diedit, pulihkan kandungan asas dan letakkan perubahan dalam migrasi baharu; untuk fail yang dinamakan semula, buat asal nama semula atau pilih cap masa baharu yang lain tempat ia berulang-alik, jangan sekali-kali cap masa yang sama dengan nama lain. Jika semakan itu sendiri tidak boleh dijalankan, pintu gerbang gagal dalam CI dan hanya memberi amaran secara tempatan. Untuk fail asas yang diedit, pangkalan data yang dinaik taraf dibina dengan kandungan asas fail tersebut dan but kedua melangkaunya kerana versinya telah direkodkan. Untuk fail yang dinamakan semula, pangkalan data yang dinaik taraf dibina dengan fail di bawah nama lamanya dan but kedua mengalihkan baris `_omniroute_migrations` melalui entri keserasian dan bukannya menjalankannya semula; get melepasi nama baharu dengan `--must-not-apply`, jadi semakan gagal jika but kedua menggunakannya. Jika migrasi permintaan tarik gagal digunakan pada laluan yang dinaik taraf, iaitu selepas setiap pemindahan asas (sama ada ia juga gagal pada pemasangan baharu atau tidak), get melaporkan `migration do PR não aplica` dan meminta anda membetulkan SQL terhadap skema semasa pangkalan; jika fail bergantung pada pemindahan permintaan tarik lain dengan cap waktu kemudian, jana semula namanya dengan `npm run db:new-migration`.

Untuk menjalankan perbandingan yang sama secara setempat, lulus pangkalan secara eksplisit, contohnya `npm run check:migration-numbering -- --base origin/<base-branch>`, atau `npm run check:migration-numbering -- --base-latest-tag` untuk dibandingkan dengan keluaran terkini.

### Menukar Penghijrahan PR `NNN` Terbuka

Permintaan tarik dibuka sebelum suis mungkin masih membawa fail berjujukan seperti `242_add_widgets.sql`. Nombor lama di atas `241` ditolak, jadi tukarkannya sebelum digabungkan:

1. **Namakan semula fail dengan penjana, menyimpan penerangan.** Jalankan `npm run db:new-migration -- <same description>` untuk mendapatkan nama baharu, alihkan SQL ke dalamnya dan padamkan fail `NNN_` lama. Perihalan mesti kekal sama: entri keserasian di bawah sepadan dengannya.
2. **Tambahkan entri keserasian jika pangkalan data berterusan menjalankan nombor lama.** Jika mana-mana pangkalan data yang disimpan (homolog, a VPS, pemasangan penyumbang sendiri) menjalankan binaan PR dengan fail `NNN_`, tambah `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` kepada `RENAMED_MIGRATION_COMPATIBILITY` dalam `src/lib/db/migrationRunner/constants.ts`. Ini adalah** diperlukan untuk `237` hingga `241`** : slot tersebut kini memegang `237_usage_history_calculated_cost.sql` kanonik , `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` dan `241_seen_models.sql`, dan tanpa entri pangkalan data sedemikian melangkau penghijrahan kanonik selama-lamanya dan menjalankan yang ditukar semula. Ia juga berfungsi untuk slot yang kekal kosong, seperti `242`, apabila destinasi ialah cap waktu. Apabila ragu-ragu, tambah entri. Di mana anda menambahnya dalam tatasusunan tidak penting: apabila slot sasaran entri masih memegang baris yang entri lain dialihkan (contohnya `237` menahan baris PR manakala baris `usage_history_calculated_cost` yang lebih lama menunggu untuk beralih ke `237`), pelari membenarkan entri itu menunggu sehingga slot itu kosong. Hanya konflik sebenar, seperti slot yang dipegang oleh baris tiada entri bergerak, atau dua entri yang menukar slot, menghentikan but dengan `Cannot reconcile ...`.
3. **Kekalkan idempoten SQL** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), kerana migrasi yang ditukar mungkin memenuhi pangkalan data yang skemanya sudah wujud.
4. **Alihkan kes khas berkunci versi.** Jika PR menambah huruf besar untuk nombor lamanya dalam `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) atau dalam `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), tukar kekunci kepada cap waktu baharu.

`tests/unit/db/codex-fence-migration-rename.test.ts` ialah contoh ujian yang berfungsi untuk penghijrahan yang dinamakan semula.

### Backport ke Cawangan Sebelum Tukar

Jangan sekali-kali memilih atau membalikkan fail `YYYYMMDDHHMMSS_` ke cawangan yang mendahului suis (contohnya cawangan `release/v*` yang lebih lama). Pelari di sana mengisih nama fail sebagai teks, jadi fail yang dicap masa akan dijalankan antara `201_` dan `202_` pada pangkalan data baharu, dan gerbang lama di sana tidak memahami awalan 14 digit. Pada cawangan sedemikian, tulis perubahan itu sebagai fail `NNN_` seterusnya cawangan itu sendiri, idempoten, jadi ia tidak boleh digunakan apabila versi cap masa tiba kemudian.

### Bagaimana Migrasi Berjalan

Pada permulaan, `migrationRunner.ts`:

1. Mencipta jadual `_omniroute_migrations` jika tidak wujud
2. Pertanyaan untuk migrasi yang telah digunakan
3. Menggunakan sebarang migrasi baharu mengikut tertib, setiap satu dalam transaksi
4. Merekod setiap migrasi yang digunakan dengan cap masa

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

### Idempotensi

Migrasi mestilah** idempoten** — menjalankannya dua kali sepatutnya tidak boleh digunakan:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Gunakan klausa `IF NOT EXISTS`, `IF EXISTS` dan `OR IGNORE` / `OR REPLACE` secara bebas.

### Menambah Migrasi Baharu

1. **Buat fail dengan penjana** : `npm run db:new-migration -- <description>` (contohnya `npm run db:new-migration -- add combo priority`). Ia menulis `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` dengan masa UTC semasa dan pengepala ulasan, bergerak ke hadapan satu saat jika cap masa itu diambil dan tidak pernah menimpa fail. Jangan pilih nombor dengan tangan.
2. **Gunakan DDL yang selamat** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Isi semula data dengan teliti** : gunakan `UPDATE ... WHERE ...` untuk mengendalikan baris sedia ada
4. **Semak pesanan dan penamaan** : `npm run test:migrations:fresh` (semua migrasi pada pangkalan data kosong) dan `npm run check:migration-numbering`
5. **Uji pada salinan** : tidak pernah menjalankan migrasi yang belum teruji pada pengeluaran
6. **Jadual yang dibuat daripada kod memerlukan penghijrahan juga** : jika modul juga membuat jadual dengan malas (`CREATE TABLE IF NOT EXISTS`, disimpan sebagai laluan penyembuhan diri), penghijrahan mesti menciptanya dengan DDL yang sama. Jika tidak, pemasangan bersih dan pemasangan yang dinaik taraf berakhir dengan skema yang berbeza, bergantung pada sama ada laluan kod tersebut berjalan. `tests/unit/db/lazy-table-migration-guard.test.ts` mengimbas `src/` dan `open-sse/` dan gagal pada `CREATE` malas tanpa penghijrahan (#20557). Contoh: `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`.

Contoh:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Perubahan tidak serasi ke belakang** (cth, menjatuhkan lajur) adalah rumit. OmniRoute adakah NOT menyokong penurunan taraf — setelah migrasi digunakan, perubahan skema adalah kekal. Rancang dengan sewajarnya.

---

## Penyulitan Data Tersimpan

Medan sensitif (kunci API, token OAuth, rentetan sambungan) disulitkan semasa disimpan menggunakan **AES-256-GCM**.

### Cara Ia Berfungsi

```ts
// src/lib/db/encryption.ts (dipermudahkan)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Tempat Ia Digunakan

- `provider_connections.api_key` — disulitkan pada peringkat aplikasi
- `provider_connections.access_token`, `refresh_token`, `id_token` — disulitkan pada peringkat aplikasi
- Entri `key_value` dengan `namespace = "secrets"` — disulitkan pada peringkat aplikasi
- `proxy_registry.auth` — disulitkan pada peringkat aplikasi (jika ada)

### Kunci Penyulitan

Kunci penyulitan diperoleh daripada **frasa laluan** (ditetapkan melalui pemboleh ubah persekitaran `STORAGE_ENCRYPTION_KEY`) dan **salt** (disimpan dalam DB). Kedua-duanya diperlukan untuk menyahsulit data.

```bash
# Jana frasa laluan yang selamat
openssl rand -hex 32

# Tetapkan dalam .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritikal**: Kehilangan kunci penyulitan bermakna kehilangan akses kepada semua data yang disulitkan. **Sandarkan kunci secara berasingan daripada pangkalan data**.

### Perkara yang TIDAK Disulitkan

Atas sebab prestasi, perkara berikut disimpan dalam bentuk teks biasa:

- Nama paparan penyedia
- Takrifan model (sememangnya tersedia secara umum)
- Peraturan penghalaan
- Rekod penggunaan (tiada PII)

---

## Peringatan Penyulitan (v3.8.16+)

OmniRoute menggunakan **`migrateLegacyEncryptedString()`** untuk mengendalikan dua skim penyulitan secara telus:

- **Legasi** (sebelum v3.5.0): "penyulitan" berasaskan XOR (bukan kriptografi sebenar)
- **Semasa**: AES-256-GCM dengan IV dan tag pengesahan yang betul

Pembantu migrasi mengesan format legasi dan menyulitkannya semula menggunakan skim baharu ketika bacaan pertama. Ini bermakna anda boleh menaik taraf pangkalan data lama tanpa kehilangan kelayakan.

---

## Cache Bacaan

Untuk data yang kerap dibaca (model, penyedia, tetapan), `readCache.ts` menyediakan **cache dalam memori**:

```ts
// Dicache semasa permulaan, dibatalkan apabila ditulis
const providers = await getCachedProviders(); // Pantas, dalam memori
const fresh = await listProviders(); // Perlahan, mengakses DB
```

| Entiti yang dicache    | Kunci cache    | TTL              |
| ---------------------- | -------------- | ---------------- |
| `models`               | `models:v1`    | Sehingga ditulis |
| `provider_connections` | `providers:v1` | Sehingga ditulis |
| `settings`             | `settings:v1`  | Sehingga ditulis |
| `combos`               | `combos:v1`    | Sehingga ditulis |

Cache dibatalkan pada setiap penulisan ke jadual yang sepadan.

---

## Sandaran dan Pemulihan

### Sandaran Manual

```bash
# Gunakan CLI untuk mencipta sandaran setempat
omniroute backup create --name pre-migration

# Atau melalui API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Fail sandaran merangkumi:

- Semua jadual DB (disirikan kepada JSON)
- Artifak log panggilan (dikodkan dengan base64, pilihan)
- Tetapan + rahsia (disulitkan)
- Konfigurasi pemalam

### Pemulihan

```bash
# Melalui CLI
omniroute restore pre-migration

# Melalui API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Amaran**: Pemulihan menulis ganti keseluruhan DB. Hentikan semua klien terlebih dahulu.

### Sandaran Automatik

```bash
# Dayakan sandaran harian automatik melalui CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Jadual dilaksanakan pada bahagian pelayan oleh tugas latar belakang yang berjalan setiap 30 saat
(lalai) dan menilai ungkapan cron berdasarkan waktu tempatan pelayan.

| Pemboleh ubah                               | Lalai   | Penerangan                                                                                                                 |
| ------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | Selang masa dalam ms (min `5000`). Mestilah kurang daripada 60 s untuk memastikan ia berada dalam minit cron yang sepadan. |

### Sandaran Langsung SQLite

Untuk membuat sandaran pangkalan data aktif tanpa masa henti:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Ini menggunakan API sandaran dalam talian SQLite — selamat dijalankan semasa OmniRoute sedang berjalan.

---

## Penalaan Prestasi

### Mod WAL

WAL didayakan secara lalai. Untuk beban kerja menulis tinggi, pertimbangkan:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute tidak menetapkan `journal_size_limit`. Pusat pemeriksaan mengalihkan bingkai WAL ke dalam fail utama, tetapi fail WAL mengekalkan saiz diperuntukkan terbesarnya. Pengawal `OMNIROUTE_WAL_GUARD_MAX_MB` hanya memberi amaran dan menjalankan `wal_checkpoint(RESTART)`; ia bukan penutup saiz cakera.

### Indeks

Indeks utama untuk prestasi (dicipta secara automatik oleh migrasi):

- carian model `idx_models_provider` — oleh pembekal
- pengembangan sasaran kombo `idx_combo_targets_combo_id` —
- analisis penggunaan `idx_usage_history_api_key_timestamp` —
- penjejakan kuota `idx_quota_snapshots_api_key_window` —
- pertanyaan log panggilan `idx_call_logs_timestamp` —

Untuk menambah indeks baharu, buat migrasi:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### I/O yang Dipetakan Memori

Untuk pangkalan data yang sangat besar (> 10GB), pemetaan memori boleh dilaraskan melalui SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Pemadatan

Contoh OmniRoute yang berjalan lama mendapat manfaat daripada `VACUUM` sekali-sekala :

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Jalankan setiap bulan semasa tingkap trafik rendah. ( Mod WAL mengurangkan keperluan, tetapi tidak menghapuskannya.)

---

## Semakan Kesihatan

`src/lib/db/healthCheck.ts` menyediakan **diagnostik kesihatan peringkat DB**:

Kedua-dua kata kerja memerlukan pengesahan (`401` jika tiada). `GET` hanya menjalankan diagnosis; `POST` menjalankan
semakan yang sama dengan `autoRepair` didayakan.

```bash
GET  /api/db/health   # diagnosis
POST /api/db/health   # diagnosis + pembaikan
```

Respons ialah `DbHealthCheckResult` yang dihasilkan oleh `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

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

| Medan             | Maksud                                                                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` apabila `issues` kosong. `driver` tidak pernah mempengaruhinya.                                                                                                    |
| `issues[].type`   | Salah satu daripada `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                      |
| `repairedCount`   | Baris yang dibaiki semasa pelaksanaan ini; sentiasa `0` apabila `autoRepair` ialah false.                                                                                 |
| `backupCreated`   | Sama ada sandaran telah dibuat sebelum pembaikan.                                                                                                                         |
| `checkedAt`       | Cap masa ISO yang dikongsi oleh pelaksanaan dan sebarang nota pembaikan yang ditulisnya.                                                                                  |
| `driver.name`     | Pemacu SQLite yang menyediakan pangkalan data yang disemak.                                                                                                               |
| `driver.degraded` | `true` apabila penulisan tidak disandarkan secara kekal oleh fail pangkalan data — sandaran WASM `sql.js` (pengekalan keseluruhan fail) atau pangkalan data dalam memori. |

Muatan yang sama dikembalikan oleh alat MCP `omniroute_db_health_check`.

Jalankan `PRAGMA integrity_check` untuk mengesan kerosakan:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Sepatutnya memaparkan: ok
```

Jika ia mengembalikan apa-apa selain `ok`, **hentikan penggunaan pangkalan data dengan serta-merta** dan pulihkan daripada sandaran.

---

## Pemulihan Bencana

### Senario 1: Fail WAL Hilang

Fail `-wal` hilang tetapi `-shm` dan DB utama masih utuh:

```bash
# Pulih secara automatik apabila dibuka seterusnya
omniroute
```

Jika SQLite tidak dapat melakukan pemulihan secara automatik:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Senario 2: Fail DB Utama Rosak

Pulihkan daripada sandaran:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` hanya memuat turun arkib `.tar.gz` penuh daripada pelayan yang sedang berjalan
(`GET /api/db-backups/exportAll`, bukti kelayakan pengendali diperlukan); arahan ini tidak memulihkan apa-apa.

### Senario 3: Kunci Penyulitan Hilang

**Pemulihan tidak dapat dilakukan** tanpa kunci tersebut. Medan yang disulitkan tidak dapat dibaca. Tambahkan semula semua penyedia secara manual menggunakan bukti kelayakan baharu.

> **Langkah mitigasi**: Sentiasa sandarkan kunci penyulitan secara berasingan, sebaik-baiknya dalam pengurus kata laluan atau KMS.

### Senario 4: Cakera Penuh

SQLite akan mengembalikan ralat `SQLITE_FULL`. Kosongkan ruang cakera, kemudian:

```bash
# Lakukan titik semak WAL untuk mengosongkan ruang
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Operasi Lazim

### Periksa Jadual

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Kira Baris dalam Semua Jadual

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Tetapkan Semula (Padam) Semua Data

```bash
# Hentikan OmniRoute terlebih dahulu
omniroute stop

# Padam fail DB
rm ~/.omniroute/storage.sqlite*

# Mulakan semula (akan mencipta semula DB kosong)
omniroute
```

Untuk penetapan semula **terpilih** (kekalkan penyedia, padam data penggunaan):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Eksport Satu Jadual

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Penyelesaian Masalah

### "Pangkalan data dikunci"

Proses lain sedang memegang kunci tulis. Anda boleh:

- Tunggu sehingga proses lain selesai (semak `lsof | grep storage.sqlite`)
- Tamatkan proses lain
- Jika masalah berterusan, mulakan semula OmniRoute

### "Kekangan kunci asing gagal"

Modul domain melanggar integriti rujukan. Semak:

- Baris yatim dalam jadual bersandar
- Pemadaman lata yang tidak disebarkan
- Migrasi terkini yang mengubah kunci asing

Jalankan `PRAGMA foreign_key_check;` untuk mencari pelanggaran.

### "Kehabisan memori"

I/O berpeta memori SQLite melebihi had OS. Kurangkan melalui pragma SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB dan bukannya 256MB
```

Atau nyahdayakannya:

```sql
PRAGMA mmap_size = 0;
```

### "Migrasi gagal di pertengahan proses"

Migrasi dijalankan dalam transaksi, jadi ia sepatutnya telah digulung balik. Jika tidak:

1. **Hentikan OmniRoute** (cegah percubaan selanjutnya)
2. **Semak keadaan DB** dengan `sqlite3`
3. **Baiki secara manual** migrasi separa
4. **Jalankan semula** OmniRoute (migrasi akan dicuba semula)

Untuk mencegah perkara ini, sentiasa uji migrasi pada salinan terlebih dahulu.

---

## Lihat Juga

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — jadual penggunaan
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — pemantauan kesihatan
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — aliran keluaran
- Sumber: `src/lib/db/` (80+ fail, ~25K baris kod)
