# Database Schema & Operations Guide (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: OmniRoute menggunakan **SQLite dengan penjurnalan WAL** sebagai penyimpanan utamanya, dengan enkripsi **AES-256-GCM** untuk data sensitif yang tersimpan. Panduan ini membahas skema, migrasi, pencadangan/pemulihan, dan panduan operasional.

**Sumber:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 tabel dasar)
- `src/lib/db/migrationRunner.ts` — migrasi berversi
- `src/lib/db/migrations/` — 167 file SQL berversi
- `src/lib/db/encryption.ts` — fungsi bantuan enkripsi
- `src/lib/db/backup.ts` — ekspor/impor cadangan
- `src/lib/db/healthCheck.ts` — diagnostik kesehatan

---

## Mengapa SQLite?

OmniRoute memilih SQLite dibandingkan PostgreSQL/MySQL karena beberapa alasan:

| Faktor               | SQLite                                       | PostgreSQL                                         |
| -------------------- | -------------------------------------------- | -------------------------------------------------- |
| **Penerapan**        | Tertanam — tidak memerlukan server terpisah  | Memerlukan penyiapan server                        |
| **Enkripsi**         | Lapisan aplikasi (AES-256-GCM)               | TDE bawaan                                         |
| **Performa**         | Lebih cepat untuk beban kerja kecil/menengah | Lebih baik untuk penulisan serentak berskala besar |
| **Konkurensi**       | Mode WAL memungkinkan pembacaan serentak     | MVCC penuh                                         |
| **Pencadangan**      | Penyalinan satu file                         | `pg_dump` atau snapshot sistem file                |
| **Kasus penggunaan** | Instalasi per pengguna, tertanam             | SaaS multi-tenant                                  |

Untuk penerapan **pengguna tunggal, instans tunggal** (kasus penggunaan utama OmniRoute), SQLite lebih sederhana dan lebih cepat.

### Penjurnalan WAL

`core.ts` membuka basis data dengan **mode WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL memungkinkan **pembacaan serentak** selama proses penulisan — hal ini penting untuk dasbor, yang menjalankan kueri ketika permintaan sedang dicatat.

Ukuran cache default adalah **65.536 KiB (64 MiB)**. SQLite menafsirkan nilai negatif
`cache_size` sebagai perkiraan batas atas dalam KiB dan mengalokasikan halaman sesuai kebutuhan.
**Pengaturan > Sistem & Penyimpanan > Ukuran Cache** menerima nilai bilangan bulat dari **1 hingga
1.000.000 KiB**; menyimpan pengaturan akan menerapkannya ke koneksi basis data aktif,
dan OmniRoute memulihkan nilai yang tersimpan saat dimulai.

---

## Lokasi Basis Data

File SQLite disimpan di:

| OS      | Jalur                                                               |
| ------- | ------------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                       |
| macOS   | `~/.omniroute/storage.sqlite`                                       |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                           |
| Docker  | `/app/data/storage.sqlite` (dapat dikonfigurasi melalui `DATA_DIR`) |

File pendamping:

- `storage.sqlite-wal` — log write-ahead
- `storage.sqlite-shm` — file memori bersama
- `call_logs/` — artefak payload permintaan (jika diaktifkan)

**Ganti lokasi:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Arsitektur Modul Domain

Database OmniRoute memiliki **110 modul TypeScript tingkat atas** di `src/lib/db/`. Setiap modul domain:

- Memiliki satu atau beberapa tabel tertentu
- Mengekspor fungsi CRUD yang memiliki tipe
- Tidak pernah mengakses tabel milik modul lain
- Menggunakan `getDbInstance()` dari `core.ts` untuk mengakses DB

### 110 Modul DB Tingkat Atas

OmniRoute memiliki **110 file TypeScript tingkat atas** di `src/lib/db/`. Berikut adalah beberapa contoh modul inti; lihat daftar direktori untuk daftar lengkapnya:

| Modul                   | Tabel                                                          | Tanggung Jawab                                                               |
| ----------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Pendaftaran dan kredensial penyedia melalui OAuth/kunci API                  |
| `models.ts`             | `key_value` (data model)                                       | Definisi model, kapabilitas, harga                                           |
| `combos.ts`             | `combos`                                                       | Konfigurasi dan urutan perutean kombo                                        |
| `apiKeys.ts`            | `api_keys`                                                     | Siklus hidup kunci API, cakupan, pelacakan kuota                             |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Konfigurasi sistem dan penyimpanan KV bersama                                |
| `backup.ts`             | —                                                              | Operasi ekspor/impor cadangan                                                |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Konfigurasi proksi dan aturan perutean                                       |
| `prompts.ts`            | `prompt_templates`                                             | Templat prompt yang dapat digunakan kembali, pembuatan versi                 |
| `webhooks.ts`           | `webhooks`                                                     | Langganan dan log webhook berbasis peristiwa                                 |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Pencatatan audit per permintaan (opsional, volume tinggi)                    |
| `domainState.ts`        | `domain_*` (5 tabel)                                           | Anggaran domain, pemutus sirkuit, penguncian, rantai fallback, riwayat biaya |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Kunci API yang diizinkan untuk MCP/A2A                                       |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Riwayat penggunaan kuota                                                     |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Memetakan model ke kombo default                                             |
| `cliToolState.ts`       | `cli_tool_state`                                               | Status persisten khusus CLI                                                  |
| `encryption.ts`         | —                                                              | Fungsi pembantu untuk mengenkripsi/mendekripsi bidang                        |
| `readCache.ts`          | —                                                              | Cache dalam memori untuk operasi yang banyak melakukan pembacaan             |
| `secrets.ts`            | `key_value` (entri terenkripsi)                                | Penyimpanan rahasia terenkripsi                                              |
| `stateReset.ts`         | —                                                              | Menghapus/mengatur ulang status DB untuk pengujian                           |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Konteks sesi untuk serah terima agen                                         |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Pelacakan penggunaan                                                         |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Konfigurasi kompresi                                                         |

### Batasan Modul

Aturan arsitektur inti: **modul tidak mengakses tabel milik modul lain secara langsung**. Untuk bekerja dengan data modul lain, impor fungsi dari modul tersebut.

```ts
// ❌ SALAH: SQL langsung dari modul lain
db.prepare("SELECT * FROM provider_connections").all();

// ✅ BENAR: gunakan fungsi dari modul providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Aturan ini diberlakukan melalui tinjauan kode — tidak ada pemeriksaan statis, tetapi pelanggaran akan ditandai.

---

## Skema Dasar (17 tabel)

`core.ts` mendefinisikan 17 tabel dasar dalam `SCHEMA_SQL`. Tabel-tabel ini dibuat oleh migrasi `001_initial_schema.sql` dan membentuk skema inti.

### Tabel Inti (dibuat dalam migrasi awal)

| Tabel                      | Tujuan                            | Kolom utama                                                             |
| -------------------------- | --------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Kredensial penyedia (terenkripsi) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Informasi perutean node penyedia  | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Penyimpanan KV umum               | `namespace`, `key`, `value`                                             |
| `combos`                   | Definisi kombinasi perutean       | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Kunci API untuk gateway           | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadata basis data               | `key`, `value`                                                          |
| `usage_history`            | Catatan penggunaan permintaan     | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Muatan permintaan & respons       | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Log permintaan proksi             | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Rantai model-ke-penyedia          | `model`, `chain`                                                        |
| `domain_budgets`           | Anggaran pengeluaran per domain   | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Riwayat pengaturan ulang anggaran | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Pelacakan biaya per domain        | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Status pembatasan laju domain     | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Status circuit breaker per domain | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache respons LLM                 | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Snapshot kuota historis           | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Tabel Tambahan (ditambahkan oleh migrasi berikutnya)

Migrasi berikutnya menambahkan tabel seperti:

- `cli_tool_state` (migrasi 011) — status alat CLI
- Tabel `mcp_*` — audit server MCP
- Tabel `a2a_*` — status tugas A2A
- Tabel `usage_*` — pelacakan penggunaan
- Tabel `plugin_*` — sistem plugin
- `skill_executions` — riwayat eksekusi keterampilan
- Tabel `memory_*` — sistem memori
- Tabel `compression_*` — sistem kompresi
- Tabel `webhook_*` — log pengiriman webhook
- Tabel `acp_*` — Agent Client Protocol
- Tabel `oneproxy_*` — marketplace 1proxy
- `proxy_assignments` — pengikatan cakupan proksi
- `detailed_call_artifacts` — metadata artefak log panggilan
- `quota_alert_history` — audit peringatan kuota
- `command_code_auth_sessions` — sesi OAuth Command Code

Daftar lengkap sekitar 30+ tabel tersedia di `src/lib/db/migrations/`.

---

## Migrasi

OmniRoute menggunakan** berversi, migrasi idempoten** di `src/lib/db/migrations/`. Setiap migrasi adalah satu file SQL. Dua format penamaan hidup berdampingan; versi yang direkam dalam `_omniroute_migrations` adalah awalan numerik.

### Penamaan Migrasi

| Format                                           | Contoh                               | Digunakan untuk                                                                                                                                                    |
| ------------------------------------------------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `NNN_description.sql` (tepatnya 3 digit)         | `241_seen_models.sql`                | Seri lama `001`–`241`. Dibekukan ketika format stempel waktu muncul (`240` dan `241` digabungkan tepat sebelum itu): tidak ada file baru yang mendapat nomor urut. |
| `YYYYMMDDHHMMSS_description.sql` (14 digit, UTC) | `20261113120000_add_usage_index.sql` | Setiap migrasi dibuat mulai tanggal 13-11-2026 dan seterusnya.                                                                                                     |

Mengapa berubah: dengan nomor urut, PRs paralel mengambil nomor berikutnya yang sama dan semua kecuali satu harus memberi nomor ulang sebelum digabungkan. Stempel waktu UTC memberikan setiap PR versinya sendiri.

Aturan untuk format stempel waktu (diberlakukan oleh `npm run check:migration-numbering`, dibagikan dengan generator di `scripts/check/lib/migrationNaming.mjs`):

- Stempel waktu adalah tanggal dan waktu UTC yang sebenarnya, tidak lebih awal dari `20261113000000` dan tidak lebih dari 10 menit ke depan.
- Deskripsinya berupa huruf kecil `snake_case` yang diawali dengan huruf (`a-z`, `0-9`, `_` tunggal antar kata), maksimal 80 karakter.
- Dua file dengan stempel waktu yang sama adalah duplikat.
- Aturan tanpa celah hanya berlaku pada deret lama: setiap bilangan dari `001` hingga `241` harus ada, kecuali celah yang diketahui `026`, `055` dan `121`. Menghapus `241` (atau file lama apa pun) akan menggagalkan gerbang. `001` dan `241` tidak pernah dapat ditambahkan ke daftar `KNOWN_GAPS` yang diizinkan. File yang diberi stempel waktu tidak pernah membuat celah.
- Setiap entri di `src/lib/db/migrations/` harus berupa file biasa dengan nama `.sql` huruf kecil yang valid. Direktori, symlink, file `.SQL` atau `.sql.bak`, file tersembunyi atau nama dengan spasi gagal dalam gerbang, karena runner akan melewatkannya secara diam-diam atau crash saat boot.

**Terapkan pesanan.** Pelari mengurutkan berdasarkan nilai numerik dari awalan, bukan berdasarkan teks: file `001`–`241` yang lama terlebih dahulu, lalu file yang diberi stempel waktu dalam urutan stempel waktu, lalu direktori dengan spasi nama apa pun yang terdaftar `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (versi seperti `ee-001`). Migrasi yang tertunda adalah file apa pun yang versinya tidak ada di `_omniroute_migrations`, sehingga migrasi dari cabang lama yang digabungkan setelah cabang yang lebih baru masih berlaku pada database yang sudah ada.

**Stempel waktu adalah urutan pembuatan, bukan urutan penggabungan.** Jika migrasi Anda bergantung pada tabel atau kolom yang dibuat oleh migrasi dengan a** lebih baru** stempel waktu (misalnya, satu dari PR lain yang digabungkan terlebih dahulu), database baru akan menjalankan database Anda terlebih dahulu dan gagal. Saat PR Anda masih terbuka, buat ulang nama file dengan `npm run db:new-migration` sehingga mendapat stempel waktu yang lebih baru, atau jadikan independen. `npm run test:migrations:fresh` menerapkan setiap migrasi ke database kosong dan menangkapnya.

### Migrasi yang Digabung Tidak Pernah Dihapus atau Diganti Namanya

Setelah file migrasi berada di cabang rilis atau `main`, file tersebut sudah berjalan di database homolog dan pengembang, di instalasi VPS, dan di sinkronisasi Perusahaan. Sejak saat itu:

- **Jangan pernah menghapusnya.** Instalasi baru akan kehilangan skemanya sementara database yang ditingkatkan akan mempertahankannya.
- **Jangan pernah mengganti namanya.** Versi di `_omniroute_migrations` tidak lagi cocok dengan file, jadi setiap database yang sudah menerapkannya akan menjalankannya lagi. SQL non-idempoten kemudian menggandakan data atau menghentikan boot.
- **Butuh skema yang berbeda?** Buat migrasi baru dengan `npm run db:new-migration`.

Mengganti nama hanya aman untuk file yang belum digabungkan, yang merupakan petunjuk gerbang. Tag rilis tidak mengubah apa pun di sini: setiap dorongan ke cabang `release/v*` menerbitkan gambar Docker `:next` dan berjalan pada homolog, instalasi VPS, dan sinkronisasi Perusahaan, sehingga migrasi gabungan telah berjalan di database nyata sebelum tag `vX.Y.Z` ada. Gerbang gagal setiap penghapusan file dasar, diberi tag atau tidak.

- **Mengembalikan migrasi gabungan.** `git revert` yang menghapus file gagal melewati gerbang. Simpan file dan batalkan skemanya dalam migrasi baru: `npm run db:new-migration -- <description>`, dengan `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` dan seterusnya. Basis data yang ditingkatkan dan baru kemudian diakhiri dengan skema yang sama.
- **Yang menerima penggantian nama: entri kompatibilitas dan konten yang identik.** Jika file yang digabungkan harus dipindahkan (misalnya, dua file yang digabungkan berbagi stempel waktu dan pelari berhenti dengan tabrakan versi), ganti nama file berikutnya tanpa menyentuh SQL -nya dan tambahkan `{ fromVersion, fromName, toVersion, toName }` ke `RENAMED_MIGRATION_COMPATIBILITY` di `src/lib/db/migrationRunner/constants.ts`. Basis data yang menerapkan versi lama akan memindahkan baris `_omniroute_migrations` -nya alih-alih menjalankan file lagi. Gerbang memperingatkan tentang penggantian nama seperti itu dan selalu menjalankan pemeriksaan pergantian, apa pun stempel waktu yang baru: instalasi baru menerapkan file pada posisi barunya, basis data yang ditingkatkan tidak, jadi pilih stempel waktu baru di dekat yang lama. Gerbang gagal mengganti nama jika konten diubah (perubahan skema masih terjadi pada migrasi baru), atau jika file target entri tidak ada di disk.
- **Jangan pernah mengganti nama dalam stempel waktu yang sama.** Penggantian nama yang menyimpan stempel waktu dan hanya mengubah deskripsi akan gagal, dengan atau tanpa entri. Dengan entri yang `toVersion` sama dengan `fromVersion` nya, pelari menghapus baris `_omniroute_migrations` lama dan menerapkan kembali file tersebut pada setiap database yang sudah menjalankannya. Tanpa entri, runner hanya melacak versinya: ia melewatkan file di database tersebut (konten baru tidak pernah berjalan di sana) dan mencatat kesalahan penomoran ulang pada setiap boot. Gunakan stempel waktu lain ditambah entri kompatibilitas, atau pertahankan namanya.
- **Gerbang memeriksa bahwa file yang diubah namanya tidak berjalan lagi.** Untuk setiap penggantian nama yang tercakup, gerbang meneruskan nama file baru ke pemeriksaan pergantian dengan `--must-not-apply`. Pemeriksaan mem-boot database yang ditingkatkan dengan pelari sebenarnya, dan jika pelari menerapkan file itu lagi (misalnya, karena entri memiliki versi atau nama yang salah, atau karena pengurai teks gerbang membaca `constants.ts` berbeda dari TypeScript), gerbang gagal dengan `migration renomeada rodaria de novo` dan meminta Anda memeriksa versi dan nama entri yang lama dan baru.

### Apa yang Diperiksa Gerbang Terhadap Pangkalan

Saat permintaan tarik dan antrian penggabungan berjalan, `npm run check:migration-numbering` membandingkan `src/lib/db/migrations/` pada disk dengan direktori yang sama di cabang dasar. Basisnya adalah, dalam urutan ini: `--base-latest-tag`, `--base <ref>`, variabel `MIGRATION_BASE_REF`, atau, jika `GITHUB_EVENT_NAME` adalah `pull_request`, `pull_request_target` atau `merge_group`, induk pertama dari komit penggabungan, `merge_group.base_sha` dari muatan peristiwa, atau `git merge-base HEAD origin/$GITHUB_BASE_REF`. Dalam permintaan tarik atau antrian penggabungan yang dijalankan tanpa basis yang dapat diselesaikan, gerbang gagal. Di luar CI tanpa `--base` ia mencetak `comparação com a base: pulada (sem --base)` dan melewatkan aturan ini.

`--base-latest-tag` membandingkan dengan tag rilis terbaru (`vX.Y.Z` dalam urutan semver; tag bersufiks seperti nightlies tidak dihitung) yang ada dalam sejarah `HEAD`, dengan aturan yang sama seperti `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) menjalankan gerbang dengan cara ini, karena proses push dan terjadwal tidak memiliki basis permintaan tarik dan penggabungan dapat dilakukan tanpa proses CI baru. Tanpa tag rilis dalam riwayat, gerbang gagal; jalankan `git fetch --tags` (dalam CI, `actions/checkout` dengan `fetch-depth: 0` membawa tag).

| Ubah pada permintaan tarik                                                                                             | Hasil                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| File yang ada di pangkalan diganti namanya, dengan entri `RENAMED_MIGRATION_COMPATIBILITY`                             | **Peringatan** jika kontennya identik, dan pemeriksaan pergantian berjalan apa pun stempel waktu yang baru; gagal jika posisi baru mengubah skema akhir (membatalkan penggantian nama, atau memilih stempel waktu baru lainnya di mana ia berpindah) atau jika pelari akan menerapkan kembali file yang diubah namanya pada database yang ditingkatkan.** Gagal** jika isinya berubah. |
| File yang ada di pangkalan diganti namanya dengan tetap mempertahankan stempel waktunya (hanya deskripsi yang berubah) | **Gagal** , dengan atau tanpa entri: pelari akan menerapkannya lagi (dengan entri) atau melewatinya berdasarkan versi (tanpa entri). Gunakan stempel waktu lain ditambah entri kompatibilitas, atau pertahankan namanya.                                                                                                                                                               |
| File yang ada di pangkalan dihapus, atau diganti namanya tanpa entri                                                   | **Gagal** , apakah file tersebut ada dalam tag rilis atau tidak. Untuk membatalkannya, pulihkan file dengan `git checkout <base> -- src/lib/db/migrations/<file>`; untuk mengembalikan skemanya, tambahkan migrasi baru dengan `DROP ... IF EXISTS`.                                                                                                                                   |
| File yang ada di pangkalan memiliki konten yang berbeda                                                                | **Peringatan** (anotasi `::warning` di Tindakan GitHub ), dan pemeriksaan pergantian berjalan. Gagal jika pengeditan mengubah skema akhir, karena database yang ditingkatkan tidak menerapkan lagi file yang diedit: masukkan perubahan ke dalam migrasi baru. Pengeditan yang tidak berbahaya (komentar, `IF NOT EXISTS`) hanya memperingatkan.                                       |
| File yang diberi stempel waktu ditambahkan dengan stempel waktu yang tidak lebih baru dari yang terbaru dari basis     | Menjalankan pemeriksaan pergantian, dijelaskan di bawah.                                                                                                                                                                                                                                                                                                                               |
| File `NNN_` format lama ditambahkan dengan nomor di bawah file format lama terbaru basis                               | **Gagal** , meskipun `KNOWN_GAPS` diedit dalam permintaan tarik yang sama: seri lama dibekukan, buat migrasi dengan `npm run db:new-migration`. File format lama di atas yang terbaru dari basis (permintaan tarik `release/v*` ke `main` ) diterima.                                                                                                                                  |
| File yang rusak, diedit atau diganti namanya berisi pernyataan `INSERT`, `UPDATE`, `DELETE` atau `REPLACE`             | **Peringatan** : pemeriksaan pergantian tidak membandingkan data, jadi tinjau apakah urutan penerapan database yang ditingkatkan dan baru akan mengubah hasilnya.                                                                                                                                                                                                                      |

Satu kali pemeriksaan pergantian mencakup file yang rusak, file yang diedit, dan file yang diganti namanya secara bersamaan.

Pemeriksaan pergantian (`scripts/check/migration-commutation.ts`) membangun dua database sementara dengan jalur instalasi sebenarnya: an** ditingkatkan** satu (boot dengan migrasi dasar, lalu boot lagi pada file yang sama dengan migrasi permintaan tarik) dan a** segar** satu (satu boot dengan migrasi permintaan tarik). Ini membandingkan skema yang dihasilkan: tabel dan kolom (mengabaikan urutan kolom), batasan UNIQUE / PRIMARY KEY dan FOREIGN KEY, teks `CREATE TABLE` yang dinormalisasi dari setiap tabel (yang mencakup batasan CHECK, susunan, kolom yang dihasilkan dan opsi tabel), indeks, pemicu dan tampilan. Data baris tidak dibandingkan. Jika cocok, gerbang akan mencetak bahwa file tersebut rusak tetapi bolak-balik, dan lolos. Jika berbeda, gerbang gagal dengan perbedaan dan petunjuk untuk kasus ini: untuk file yang rusak, buat ulang namanya dengan `npm run db:new-migration`, yang aman karena file belum digabungkan; untuk file dasar yang diedit, pulihkan konten dasar dan masukkan perubahan ke dalam migrasi baru; untuk file yang diganti namanya, batalkan penggantian nama atau pilih stempel waktu baru lainnya yang akan diubah, jangan pernah stempel waktu yang sama dengan nama lain. Jika pemeriksaan itu sendiri tidak dapat dijalankan, gerbang gagal di CI dan hanya memperingatkan secara lokal. Untuk file dasar yang diedit, database yang ditingkatkan dibuat dengan konten dasar file tersebut, dan boot kedua melewatkannya karena versinya sudah direkam. Untuk file yang diganti namanya, database yang ditingkatkan dibuat dengan file tersebut dengan nama lamanya, dan boot kedua memindahkan baris `_omniroute_migrations` melalui entri kompatibilitas alih-alih menjalankannya lagi; gerbang melewati nama baru dengan `--must-not-apply`, jadi pemeriksaan gagal jika boot kedua menerapkannya. Jika migrasi permintaan tarik gagal diterapkan pada jalur yang ditingkatkan, yaitu, setelah setiap migrasi basis (baik gagal pada instalasi baru atau tidak), gerbang melaporkan `migration do PR não aplica` dan meminta Anda untuk memperbaiki SQL terhadap skema basis saat ini; jika file bergantung pada migrasi permintaan tarik lainnya dengan stempel waktu yang lebih baru, buat ulang namanya dengan `npm run db:new-migration`.

Untuk menjalankan perbandingan yang sama secara lokal, teruskan basis secara eksplisit, misalnya `npm run check:migration-numbering -- --base origin/<base-branch>`, atau `npm run check:migration-numbering -- --base-latest-tag` untuk membandingkan dengan rilis terbaru.

### Mengonversi Migrasi `NNN` Open PR

Permintaan tarik yang dibuka sebelum peralihan mungkin masih membawa file berurutan seperti `242_add_widgets.sql`. Angka lama di atas `241` ditolak, jadi konversikan sebelum menggabungkan:

1. **Ganti nama file dengan generator, pertahankan deskripsinya.** Jalankan `npm run db:new-migration -- <same description>` untuk mendapatkan nama baru, pindahkan SQL ke dalamnya, dan hapus file `NNN_` yang lama. Deskripsinya harus tetap sama: entri kompatibilitas di bawah cocok dengan deskripsi tersebut.
2. **Tambahkan entri kompatibilitas jika database persisten menjalankan nomor lama.** Jika ada database yang disimpan (homolog, a VPS, instalasi milik kontributor) menjalankan build PR dengan file `NNN_`, tambahkan `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` ke `RENAMED_MIGRATION_COMPATIBILITY` di `src/lib/db/migrationRunner/constants.ts`. Ini** diperlukan untuk `237` ke `241`** : slot tersebut sekarang menampung kanonik `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` dan `241_seen_models.sql`, dan tanpa entri, database tersebut akan melewatkan migrasi kanonik selamanya dan menjalankan migrasi yang telah dikonversi lagi. Ini juga berfungsi untuk slot yang tetap kosong, seperti `242`, ketika tujuannya adalah stempel waktu. Jika ragu, tambahkan entri. Tempat Anda menambahkannya ke dalam larik tidak menjadi masalah: ketika slot target entri masih berisi baris yang dipindahkan entri lain (misalnya `237` menahan baris PR sementara baris `usage_history_calculated_cost` yang lebih lama menunggu untuk dipindahkan ke `237`), pelari membiarkan entri tersebut menunggu hingga slotnya kosong. Hanya konflik nyata, seperti slot yang dipegang oleh satu baris tanpa entri bergerak, atau dua entri yang bertukar slot, menghentikan booting dengan `Cannot reconcile ...`.
3. **Jaga agar SQL idempoten** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), karena migrasi yang dikonversi mungkin bertemu dengan database yang skemanya sudah ada.
4. **Pindahkan kasus khusus dengan kunci versi.** Jika PR menambahkan huruf besar/kecil untuk nomor lamanya di `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) atau di `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), ubah kunci ke stempel waktu yang baru.

`tests/unit/db/codex-fence-migration-rename.test.ts` adalah contoh pengujian yang berfungsi untuk migrasi yang diganti namanya.

### Backport ke Cabang Sebelum Switch

Jangan pernah memilih atau mem-backport file `YYYYMMDDHHMMSS_` ke cabang yang sudah ada sebelum peralihan (misalnya cabang `release/v*` yang lebih lama). Pelari di sana mengurutkan nama file sebagai teks, sehingga file yang diberi stempel waktu akan dijalankan antara `201_` dan `202_` pada database baru, dan gerbang lama di sana tidak memahami awalan 14 digit. Pada cabang seperti itu, tulis perubahan sebagai file `NNN_` berikutnya milik cabang itu, idempoten, sehingga tidak boleh dilakukan ketika versi yang diberi stempel waktu tiba nanti.

### Bagaimana Migrasi Dijalankan

Saat memulai, `migrationRunner.ts`:

1. Membuat tabel `_omniroute_migrations` jika tidak ada
2. Kueri untuk migrasi yang sudah diterapkan
3. Menerapkan migrasi baru apa pun secara berurutan, masing-masing dalam suatu transaksi
4. Catat setiap migrasi yang diterapkan dengan stempel waktu

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

Migrasi harus dilakukan** idempoten** — menjalankannya dua kali seharusnya tidak dilakukan:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Gunakan klausa `IF NOT EXISTS`, `IF EXISTS`, dan `OR IGNORE` / `OR REPLACE` secara bebas.

### Menambahkan Migrasi Baru

1. **Buat file dengan generator** : `npm run db:new-migration -- <description>` (misalnya `npm run db:new-migration -- add combo priority`). Ia menulis `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` dengan waktu UTC saat ini dan header komentar, bergerak maju satu detik jika stempel waktu tersebut digunakan, dan tidak pernah menimpa file. Jangan memilih nomor dengan tangan.
2. **Gunakan DDL yang aman** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Isi ulang data dengan hati-hati** : gunakan `UPDATE ... WHERE ...` untuk menangani baris yang ada
4. **Periksa pesanan dan penamaan** : `npm run test:migrations:fresh` (semua migrasi pada database kosong) dan `npm run check:migration-numbering`
5. **Uji pada salinan** : jangan pernah menjalankan migrasi yang belum teruji pada produksi

Contoh:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Perubahan yang tidak kompatibel ke belakang** (misalnya, menjatuhkan kolom) itu rumit. OmniRoute apakah NOT mendukung penurunan versi — setelah migrasi diterapkan, perubahan skema bersifat permanen. Rencanakan dengan tepat.

---

## Enkripsi Data Tersimpan

Kolom sensitif (kunci API, token OAuth, string koneksi) dienkripsi saat disimpan menggunakan **AES-256-GCM**.

### Cara Kerjanya

```ts
// src/lib/db/encryption.ts (disederhanakan)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Tempat Penggunaannya

- `provider_connections.api_key` — dienkripsi pada tingkat aplikasi
- `provider_connections.access_token`, `refresh_token`, `id_token` — dienkripsi pada tingkat aplikasi
- Entri `key_value` dengan `namespace = "secrets"` — dienkripsi pada tingkat aplikasi
- `proxy_registry.auth` — dienkripsi pada tingkat aplikasi (jika ada)

### Kunci Enkripsi

Kunci enkripsi diturunkan dari sebuah **frasa sandi** (ditetapkan melalui variabel lingkungan `STORAGE_ENCRYPTION_KEY`) dan sebuah **salt** (disimpan di DB). Keduanya diperlukan untuk mendekripsi data.

```bash
# Buat frasa sandi yang aman
openssl rand -hex 32

# Tetapkan di .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Penting**: Kehilangan kunci enkripsi berarti kehilangan akses ke seluruh data terenkripsi. **Cadangkan kunci secara terpisah dari basis data**.

### Data yang TIDAK Dienkripsi

Demi alasan performa, data berikut disimpan dalam bentuk teks biasa:

- Nama tampilan penyedia
- Definisi model (sudah tersedia untuk publik)
- Aturan perutean
- Catatan penggunaan (tanpa PII)

---

## Catatan Penting Enkripsi (v3.8.16+)

OmniRoute menggunakan **`migrateLegacyEncryptedString()`** untuk menangani dua skema enkripsi secara transparan:

- **Lama** (sebelum v3.5.0): "enkripsi" berbasis XOR (bukan kriptografi yang sebenarnya)
- **Saat ini**: AES-256-GCM dengan IV dan tag autentikasi yang tepat

Helper migrasi mendeteksi format lama dan mengenkripsi ulang menggunakan skema baru saat pertama kali dibaca. Artinya, Anda dapat memutakhirkan database lama tanpa kehilangan kredensial.

---

## Cache Baca

Untuk data yang sering dibaca (model, penyedia, pengaturan), `readCache.ts` menyediakan **cache dalam memori**:

```ts
// Di-cache saat startup, diinvalidasi saat penulisan
const providers = await getCachedProviders(); // Cepat, dalam memori
const fresh = await listProviders(); // Lambat, mengakses DB
```

| Entitas yang di-cache  | Kunci cache    | TTL                  |
| ---------------------- | -------------- | -------------------- |
| `models`               | `models:v1`    | Hingga ada penulisan |
| `provider_connections` | `providers:v1` | Hingga ada penulisan |
| `settings`             | `settings:v1`  | Hingga ada penulisan |
| `combos`               | `combos:v1`    | Hingga ada penulisan |

Cache diinvalidasi setiap kali terjadi penulisan ke tabel terkait.

---

## Pencadangan dan Pemulihan

### Pencadangan Manual

```bash
# Gunakan CLI untuk membuat cadangan lokal
omniroute backup create --name pre-migration

# Atau melalui API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

File cadangan mencakup:

- Semua tabel DB (diserialisasi ke JSON)
- Artefak log panggilan (dikodekan dengan base64, opsional)
- Pengaturan + rahasia (dienkripsi)
- Konfigurasi plugin

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

> **Peringatan**: Pemulihan akan menimpa seluruh DB. Hentikan semua klien terlebih dahulu.

### Pencadangan Otomatis

```bash
# Aktifkan pencadangan harian otomatis melalui CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Jadwal dijalankan di sisi server oleh tugas latar belakang yang berdetak setiap 30 detik
(secara default) dan mengevaluasi ekspresi cron berdasarkan waktu lokal server.

| Variabel                                    | Default | Deskripsi                                                                                                                |
| ------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | Interval detak dalam ms (min `5000`). Harus lebih pendek dari 60 dtk agar dapat tepat masuk dalam menit cron yang cocok. |

### Pencadangan Langsung SQLite

Untuk pencadangan DB aktif tanpa waktu henti:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Perintah ini menggunakan API pencadangan online SQLite — aman dijalankan saat OmniRoute sedang berjalan.

---

## Penyetelan Kinerja

### Modus WAL

WAL diaktifkan secara default. Untuk beban kerja tulis tinggi, pertimbangkan:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute tidak menyetel `journal_size_limit`. Sebuah pos pemeriksaan memindahkan frame WAL ke dalam file utama, tetapi file WAL mempertahankan ukuran alokasi terbesarnya. Penjaga `OMNIROUTE_WAL_GUARD_MAX_MB` hanya memperingatkan dan menjalankan `wal_checkpoint(RESTART)`; ini bukan batasan ukuran disk.

### Indeks

Indeks utama untuk kinerja (dibuat secara otomatis oleh migrasi):

- pencarian model `idx_models_provider` — berdasarkan penyedia
- perluasan target kombo `idx_combo_targets_combo_id` —
- analisis penggunaan `idx_usage_history_api_key_timestamp` —
- pelacakan kuota `idx_quota_snapshots_api_key_window` —
- `idx_call_logs_timestamp` — kueri log panggilan

Untuk menambahkan indeks baru, buat migrasi:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### I/O yang Dipetakan Memori

Untuk database yang sangat besar (> 10GB), pemetaan memori dapat disesuaikan melalui SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Pemadatan

Instans OmniRoute yang sudah berjalan lama mendapat manfaat dari `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Jalankan setiap bulan selama periode lalu lintas rendah. (Mode WAL mengurangi kebutuhan, namun tidak menghilangkannya.)

---

## Pemeriksaan Kesehatan

`src/lib/db/healthCheck.ts` menyediakan **diagnostik kesehatan tingkat basis data**:

Kedua verba memerlukan autentikasi (`401` jika tidak ada). `GET` hanya melakukan diagnosis; `POST` menjalankan
pemeriksaan yang sama dengan `autoRepair` diaktifkan.

```bash
GET  /api/db/health   # diagnosis
POST /api/db/health   # diagnosis + perbaikan
```

Responsnya adalah `DbHealthCheckResult` yang dihasilkan oleh `runDbHealthCheck()`
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

| Kolom             | Arti                                                                                                                                                                  |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` jika `issues` kosong. `driver` tidak pernah memengaruhinya.                                                                                                    |
| `issues[].type`   | Salah satu dari `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                      |
| `repairedCount`   | Baris yang diperbaiki selama proses ini; selalu `0` jika `autoRepair` bernilai false.                                                                                 |
| `backupCreated`   | Apakah cadangan dibuat sebelum melakukan perbaikan.                                                                                                                   |
| `checkedAt`       | Stempel waktu ISO yang digunakan bersama oleh proses ini dan catatan perbaikan apa pun yang ditulisnya.                                                               |
| `driver.name`     | Driver SQLite yang melayani basis data yang diperiksa.                                                                                                                |
| `driver.degraded` | `true` jika operasi tulis tidak disimpan secara persisten dalam berkas basis data — fallback WASM `sql.js` (persistensi seluruh berkas) atau basis data dalam memori. |

Payload yang sama dikembalikan oleh alat MCP `omniroute_db_health_check`.

Jalankan `PRAGMA integrity_check` untuk mendeteksi kerusakan:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Seharusnya menampilkan: ok
```

Jika perintah tersebut mengembalikan hasil selain `ok`, **segera hentikan penggunaan basis data** dan pulihkan dari cadangan.

---

## Pemulihan Bencana

### Skenario 1: File WAL Hilang

File `-wal` hilang, tetapi `-shm` dan DB utama masih utuh:

```bash
# Pulih secara otomatis saat dibuka berikutnya
omniroute
```

Jika SQLite tidak dapat melakukan pemulihan otomatis:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Skenario 2: File DB Utama Rusak

Pulihkan dari cadangan:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` hanya mengunduh arsip `.tar.gz` lengkap dari server yang sedang berjalan
(`GET /api/db-backups/exportAll`, memerlukan kredensial operator); perintah ini tidak memulihkan apa pun.

### Skenario 3: Kunci Enkripsi Hilang

**Pemulihan tidak dapat dilakukan** tanpa kunci tersebut. Kolom yang dienkripsi tidak dapat dibaca. Tambahkan kembali semua penyedia secara manual dengan kredensial baru.

> **Mitigasi**: Selalu cadangkan kunci enkripsi secara terpisah, idealnya di pengelola kata sandi atau KMS.

### Skenario 4: Disk Penuh

SQLite akan mengembalikan kesalahan `SQLITE_FULL`. Kosongkan ruang disk, lalu:

```bash
# Lakukan checkpoint pada WAL untuk mengosongkan ruang
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Operasi Umum

### Memeriksa Tabel

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Menghitung Baris di Semua Tabel

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Mengatur Ulang (Menghapus) Semua Data

```bash
# Hentikan OmniRoute terlebih dahulu
omniroute stop

# Hapus file DB
rm ~/.omniroute/storage.sqlite*

# Mulai ulang (akan membuat ulang DB kosong)
omniroute
```

Untuk pengaturan ulang **selektif** (pertahankan penyedia, hapus data penggunaan):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Mengekspor Satu Tabel

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Pemecahan Masalah

### "Database terkunci"

Proses lain sedang menahan kunci tulis. Anda dapat:

- Menunggu hingga proses lain selesai (periksa `lsof | grep storage.sqlite`)
- Menghentikan paksa proses lain
- Jika masalah berlanjut, mulai ulang OmniRoute

### "Batasan kunci asing gagal"

Modul domain melanggar integritas referensial. Periksa:

- Baris tanpa induk di tabel dependen
- Penghapusan berantai yang tidak diterapkan
- Migrasi terbaru yang mengubah kunci asing

Jalankan `PRAGMA foreign_key_check;` untuk menemukan pelanggaran.

### "Kehabisan memori"

I/O yang dipetakan ke memori milik SQLite melampaui batas OS. Kurangi melalui pragma SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB, bukan 256MB
```

Atau nonaktifkan:

```sql
PRAGMA mmap_size = 0;
```

### "Migrasi gagal di tengah proses"

Migrasi berjalan dalam sebuah transaksi, jadi perubahan seharusnya telah dibatalkan. Jika tidak:

1. **Hentikan OmniRoute** (cegah percobaan lebih lanjut)
2. **Periksa status DB** dengan `sqlite3`
3. **Perbaiki secara manual** migrasi parsial tersebut
4. **Jalankan ulang** OmniRoute (migrasi akan dicoba kembali)

Untuk mencegah hal ini, selalu uji migrasi pada salinan terlebih dahulu.

---

## Lihat Juga

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tabel penggunaan
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — pemantauan kesehatan
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — alur rilis
- Sumber: `src/lib/db/` (80+ file, ~25 ribu baris kode)
