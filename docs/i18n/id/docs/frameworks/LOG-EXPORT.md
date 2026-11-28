# Log export (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Ekspor log panggilan OmniRoute secara berkelanjutan dan inkremental ke penyimpanan analitik eksternal.

Tab Logs pada dasbor menyimpan riwayat permintaan di SQLite (`call_logs`), yang dibatasi oleh
rotasi dan retensi. Ekspor log mengirim kumpulan rekaman yang sama secara terjadwal agar tetap tersedia
setelah data di basis data lokal dihapus dan dapat digabungkan dengan data lain. BigQuery adalah tujuan pertama;
pipeline ini menggunakan registri, sehingga tujuan lain dapat ditambahkan.

---

## 1. Cara kerjanya

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Jadwal** — satu tugas cron `JobRegistry`, `log_export`, defaultnya adalah `0 * * * *` (setiap jam, UTC). Terdaftar di `src/lib/initCloudSync.ts`; dapat diganti dengan `OMNIROUTE_LOG_EXPORT_CRON`. Setiap kutu menguras semuanya** diaktifkan** tujuan, secara berurutan.
- **Cursor** — SQLite implisit `call_logs.rowid`, bertahan per tujuan di `log_export_destinations.cursor_row_id`. `timestamp` sengaja bukan kursor: penelepon dapat memberikan nilainya sendiri, sehingga permintaan yang lambat dapat ditulis setelah permintaan yang lebih cepat yang dimulai kemudian, dan kursor stempel waktu akan melewatkannya.
- **Pengelompokan** — `batch_size` baris per permintaan (default 500), `max_rows_per_run` baris per proses (default 10.000) sehingga simpanan besar terkuras pada beberapa tick alih-alih memblokir satu.
- **Pengiriman** — kursor bergerak maju hanya setelah `send()` terselesaikan. Batch yang gagal meninggalkan kursor di tempatnya semula, sehingga baris yang sama dicoba lagi pada proses berikutnya. Jaminannya setidaknya satu kali ditambah de-duplikasi di sisi tujuan, tidak benar tepat sekali: BigQuery mengunci setiap baris dengan id log panggilan, yang dihormati berdasarkan upaya terbaik dalam jendela dedupnya sendiri.
- **Penjaga yang tumpang tindih** — cron tick dan `POST .../run` dapat diaktifkan bersamaan. Tujuan yang sudah terkuras akan dilewati daripada terkuras dua kali (`skipped: true` dalam hasil proses), sehingga proses yang dilakukan secara bersamaan tidak dapat mengirim ulang batch atau menulis kursor mundur.
- **Pemulihan pembersihan** — jika `cursor_row_id` berakhir di atas `MAX(rowid)` (seluruh tabel dibersihkan dan rowids dimulai ulang), pelari memutar ulang ke 0 daripada menjadi buta permanen.

### Pelari dan batas yang terisolasi

Setiap tujuan yang dijalankan di Node memulai proses turunan OS yang berumur pendek dan terpisah (`child_process` dengan IPC, bukan `worker_threads`). Pembacaan isi, payload JSON parsing/serialization, `prepare()` tujuan dan jaringan tujuan I/O semuanya berjalan di sana, bukan pada loop peristiwa server. Hanya pesan konfigurasi dan kemajuan kecil yang melintasi IPC; catatan yang diekspor tidak pernah kembali ke server. Tugas cron dan rute Jalankan sekarang mempertahankan hasil publik yang sama dan penjagaan yang tumpang tindih.

Anak membuka `DATA_DIR/storage.sqlite` read-only yang diselesaikan di server menggunakan `node:sqlite`, dengan `busy_timeout=5000` dan `query_only=ON`. Itu tidak mengimpor DB singleton dan tidak melakukan migrasi, pencadangan, atau pembaruan SQLite. pembukuan artefak Missing/corrupt (termasuk artefak yang rusak UPDATE) tetap berada di jalur detail dasbor saja. Kedua jalur berbagi penyelesaian detail murni; ekspor menggunakan pembacaan sistem file asinkron dan artefak yang sama → legacy inline → legacy disk → tidak ada urutan resolusi. Proses mengambil snapshot baris penyisipan maksimum saat anak membuka pembacanya; nanti masukkan tunggu proses berikutnya. Ini adalah batas penyisipan, bukan transaksi SQLite yang berumur panjang: penulis WAL dan pos pemeriksaan tetap bebas selama menunggu jaringan. Updates/deletions baris yang ada tidak dibekukan oleh batas ini.

Setelah setiap batch diterima, anak tersebut menunggu pengakuan. Server pertama-tama menahan kursor dengan `advanceLogExportCursor`, lalu mengirimkan `ack`; tidak ada batch berikutnya yang dimulai sebelum itu. Kegagalan pengiriman, kerusakan, atau batas waktu mencatat kegagalan tanpa memajukan batch tersebut. Batch yang diakui sebelumnya tetap berkomitmen; paling banyak satu batch yang tidak diakui dapat dikirim ulang. Keberhasilan dicatat hanya setelah `done` dan keluarnya anak yang bersih. Kegagalan menghentikan anak dengan SIGTERM, meningkat menjadi SIGKILL setelah 500 ms, dan runner menunggu penutupan proses.

| Variabel lingkungan                           | Bawaan | Tujuan                         |
| --------------------------------------------- | ------ | ------------------------------ |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000 | Batas jam dinding per tujuan   |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024   | Batas ruang lama anak V8 di MB |

nilai Invalid/non-positive/non-integer menggunakan default. Pengaturan heap bukanlah batas total RSS ; batch yang sangat besar masih dapat menghabiskan memori anak dan gagal dijalankan dengan aman. Default 1024 MB menyisakan ruang kepala untuk kumpulan 500 baris default yang terdiri dari 512 artefak KiB dengan isi diaktifkan, termasuk serialisasi JSON yang dipotong byte BigQuery. Itu tidak membuat batch 10.000 baris menjadi aman. Kelelahan heap V8 mencatat kegagalan yang dapat ditindaklanjuti: menurunkan ukuran batch atau menaikkan `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; kursor tetap berada pada kumpulan terakhir yang diakui. Badan inline/disk bersejarah tidak tercakup dalam tutup artefak modern. Operator harus menganggarkan RSS secara terpisah, terutama di dalam wadah dengan memori terbatas.

Anak hanya mewarisi `DATA_DIR`, `NODE_ENV`, `TZ` eksplisit (nama file lama resolusi waktu lokal), `ELECTRON_RUN_AS_NODE` jika ada, dan input keluar berikut: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (dan bentuk huruf kecilnya), `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`. Operator global Undici membagikan resolusi proxy lingkungan murni dan aturan bypass host lokal, termasuk `NO_PROXY`; itu tidak mengimpor `proxyFetch.ts` atau flag DB/feature -nya. Kredensial proxy dihapus dari keluaran yang diteruskan dan kesalahan yang dicatat. Kredensial tujuan hanya dikirimkan dalam satu pesan IPC awal, tidak pernah argv atau lingkungan; penerusan output/error diawali dan dibersihkan. Hanya `ExperimentalWarning` yang dinonaktifkan dalam argumen exec anak untuk menghindari pengulangan peringatan SQLite Node setiap cron dijalankan; jenis peringatan lainnya tetap terlihat.

Modul tujuan harus dapat diimpor tanpa ketergantungan Next.js/server-only. Implementasi BigQuery yang ada sudah memenuhi kontrak tersebut. Cache token akses hanya bertahan untuk proses turunan, bukan untuk seluruh proses. Node adalah runtime yang didukung (mesin `package.json` ). Terdapat jalur kompatibilitas Bun dengan upaya terbaik dan tidak didukung (`bun:sqlite` di `src/lib/db/core.ts` / adapter, dan `Dockerfile.bun`), sehingga ekspor tidak boleh terhenti di bawahnya. Di bawah Bun, ekspor mempertahankan jalur dalam proses sebelumnya dan mengeluarkan peringatan satu kali: isolasi heap/timeout anak tidak tersedia. Gunakan Node untuk loop peristiwa dan isolasi OOM.

Saat `includeBodies` diaktifkan, pilih irama tingkat menit seperti `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` daripada mengumpulkan simpanan muatan per jam. Batas batch dan baris masih terikat pada setiap proses. Proses startup dibayar per tujuan per proses; ini memperdagangkan biaya awal yang kecil untuk isolasi loop peristiwa server, tidak mengurangi total penggunaan CPU.

### Muatan (perintah dan penyelesaian)

Secara default, ekspor hanya membawa bidang ringkasan Log** daftar** menunjukkan. Menyalakan** Ekspor perintah dan tanggapan** (`includeBodies`) juga mengirimkan apa yang Log** detail** tampilan panel untuk setiap panggilan:

| Bidang                           | Apa yang dimilikinya                                           |
| -------------------------------- | -------------------------------------------------------------- |
| `request_body` / `response_body` | Payload panggilan saat dasbor merendernya                      |
| `pipeline_route_decision`        | Target dan model mana yang dipilih router                      |
| `pipeline_client_request`        | Permintaan mentah persis seperti yang dikirimkan klien         |
| `pipeline_openai_request`        | Setelah diterjemahkan ke dalam bentuk OpenAI internal          |
| `pipeline_provider_request`      | Seperti yang sebenarnya dikirim ke hulu, dalam dialek penyedia |
| `pipeline_provider_response`     | Respons hulu yang mentah                                       |
| `pipeline_client_response`       | Apa yang diserahkan kembali kepada penelepon                   |
| `pipeline_error`                 | Detail kesalahan tingkat saluran untuk panggilan yang gagal    |
| `bodies_truncated`               | Benar ketika bidang apa pun di atas mencapai `maxBodyBytes`    |

Ini adalah konten yang cepat, memang begitu** mati secara default** dan sengaja menjadi pilihan per tujuan. Apa yang dikirim adalah apa yang ditampilkan dasbor, karena ekspor dan `getCallLogById` berbagi resolusi detail: muatan sudah disanitasi PII dan disunting secara rahasia saat ditulis, dan panggilan yang dilakukan dengan kunci `noLog` API tidak menyimpan muatan sama sekali, jadi tidak ada apa pun untuk diekspor.

Payload dibaca per baris dari artefak sistem file, sehingga hidrasi hanya berjalan untuk tujuan yang memintanya. Artefak yang hilang atau rusak mengekspor ringkasannya dengan muatan nol daripada menggagalkan batch dan membuat kursor terdampar.

`maxBodyBytes` (default 262144) membatasi setiap bidang. Muatan yang lebih panjang adalah** terpotong bukannya dijatuhkan** — prompt yang terpotong masih menjawab "apa yang ditanyakan" — dan baris tersebut ditandai dengan `bodies_truncated`. Delta potongan demi potongan yang dialirkan tidak diekspor; respons yang dikumpulkan sudah ada di `pipeline_provider_response` dan `pipeline_client_response`.

---

## 2. Berkas

| Komponen                        | Lokasi                                       |
| ------------------------------- | -------------------------------------------- |
| Kontrak tujuan                  | `src/lib/logExport/types.ts`                 |
| Registri                        | `src/lib/logExport/registry.ts`              |
| Penanganan rahasia              | `src/lib/logExport/secrets.ts`               |
| Pelaksana (IPC induk)           | `src/lib/logExport/runner.ts`                |
| Siklus hidup proses             | `src/lib/logExport/childRunner.ts`           |
| Titik masuk proses anak         | `src/lib/logExport/exportChild.ts`           |
| Pembuka hanya-baca              | `src/lib/db/logExportReadOnly.ts`            |
| Kueri/pemetaan bersama          | `src/lib/usage/callLogExportQueries.ts`      |
| Penyelesai detail               | `src/lib/usage/callLogDetailResolver.ts`     |
| Proyeksi API                    | `src/lib/logExport/presenter.ts`             |
| Tujuan BigQuery                 | `src/lib/logExport/destinations/bigquery.ts` |
| Autentikasi akun layanan Google | `src/lib/logExport/googleServiceAccount.ts`  |
| Sumber log panggilan            | `src/lib/usage/callLogExportSource.ts`       |
| Persistensi                     | `src/lib/db/logExportDestinations.ts`        |
| Tugas cron                      | `src/lib/jobs/logExportJob.ts`               |
| Lapisan REST                    | `src/app/api/log-export/`                    |
| Halaman dasbor                  | `src/app/(dashboard)/dashboard/log-export/`  |

Skema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Semua rute memerlukan autentikasi manajemen (`requireManagementAuth`). Rahasia tidak pernah dikembalikan:
rahasia yang tersimpan dikembalikan sebagai literal `__stored__`, dan mengirimkan kembali nilai tersebut saat pembaruan
akan mempertahankan kredensial yang tersimpan.

Pembuatan atau pembaruan tujuan yang tipenya mendeklarasikan rahasia **memerlukan
`STORAGE_ENCRYPTION_KEY`**. Tanpa kunci tersebut, `encrypt()` hanya meneruskan data tanpa enkripsi dan tanpa peringatan, sehingga penulisan
ditolak dengan status 400 alih-alih menyimpan kredensial ke SQLite dalam teks biasa (perlindungan yang sama dengan yang
diterapkan webhook Telegram).

| Metode   | Jalur                                    | Tujuan                                                                       |
| -------- | ---------------------------------------- | ---------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Tipe tujuan + daftar kolom konfigurasinya                                    |
| `GET`    | `/api/log-export/destinations`           | Daftar tujuan (rahasia disembunyikan)                                        |
| `POST`   | `/api/log-export/destinations`           | Membuat tujuan                                                               |
| `GET`    | `/api/log-export/destinations/{id}`      | Membaca satu tujuan                                                          |
| `PUT`    | `/api/log-export/destinations/{id}`      | Memperbarui nama / status aktif / konfigurasi / pemrosesan batch             |
| `DELETE` | `/api/log-export/destinations/{id}`      | Menghapus                                                                    |
| `POST`   | `/api/log-export/destinations/{id}/test` | Menguji kredensial, tanpa menulis apa pun                                    |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Menguras antrean sekarang, melalui jalur yang sama dengan eksekusi terjadwal |
| `GET`    | `/api/log-export/status`                 | Status cron, eksekusi terbaru, antrean tertunda per target                   |

`GET /api/log-export/types` memungkinkan UI bersifat generik: formulir dasbor dirender berdasarkan
deskriptor kolom yang dikembalikan, sehingga tujuan baru tidak memerlukan perubahan UI.

---

## 4. Tujuan BigQuery

Kunci konfigurasi (`type: "bigquery"`):

| Kunci                | Catatan                                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `projectId`          | Proyek GCP yang menyimpan dataset                                                                                   |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                     |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                     |
| `location`           | Hanya digunakan saat dataset harus dibuat (default `EU`)                                                            |
| `serviceAccountJson` | Kunci akun layanan. Rahasia: dienkripsi saat tidak digunakan, tidak pernah dikembalikan                             |
| `autoCreate`         | Membuat dataset/tabel yang tidak ada; secara kondisional menambahkan kolom usage-evidence nullable (default `true`) |

Akun layanan memerlukan `bigquery.tables.updateData` pada tabel target, serta
`bigquery.datasets.create` / `bigquery.tables.create` saat `autoCreate` aktif.
Memperbarui tabel yang sudah ada untuk menambahkan dua field usage-evidence nullable juga memerlukan
`bigquery.tables.update`. Permission yang tidak tersedia akan menggagalkan ekspor tanpa memajukan kursor.

Batch yang dikonfigurasi adalah unit **kursor**, bukan unit HTTP: `send()` membaginya menjadi panggilan
insertAll yang masing-masing berisi maksimal 500 baris, sehingga `batch_size` yang besar tidak akan
memicu batas permintaan BigQuery sebesar 10 MB. Status sementara (408/429/500/502/503/504) dicoba
ulang hingga tiga kali dengan backoff eksponensial, menggunakan kembali insertIds yang sama; kegagalan
autentikasi dan skema langsung memunculkan error pada percobaan pertama, bukan menghabiskan proses.

Tabel yang baru saja dibuat belum langsung terlihat oleh endpoint streaming, yang akan menjawab
404 selama beberapa detik. 404 tersebut dicoba ulang, tetapi **hanya ketika proses ini membuat tabel** —
tabel yang benar-benar tidak ada tetap gagal dengan cepat. Perhatikan bahwa membuat ulang tabel dengan
nama yang baru saja dihapus membuat BigQuery menolak insert streaming selama beberapa menit; ini adalah
karakteristik proses hapus-lalu-buat-ulang, jadi lebih baik gunakan nama tabel baru daripada menghapus
dan menambahkannya kembali.

**Kegagalan sebagian diterima sebagai HTTP 200 dengan `insertErrors[]` yang tidak kosong.** Hal ini
diperlakukan sebagai kegagalan dan memunculkan error, sehingga kursor tidak maju melewati baris yang
tidak pernah diterima BigQuery; `tests/unit/log-export-bigquery.test.ts` menetapkan perilaku ini.

Transportasinya adalah REST biasa — assertion RS256 yang ditandatangani sendiri ditukar dengan token akses di
`https://oauth2.googleapis.com/token`, lalu baris dikirim ke `tabledata.insertAll`. Tidak ada Google SDK
yang ditambahkan. Token akses di-cache dalam proses berdasarkan (akun layanan, scope).

Tabel yang dibuat membawa satu kolom untuk setiap field pada tab Logs ditambah `exported_at`, dan ditata
untuk cara log panggilan sebenarnya dikueri:

- **Dipartisi berdasarkan hari pada `timestamp`**, sehingga kueri yang dibatasi berdasarkan tanggal hanya memindai hari-hari tersebut.
- **Dikelompokkan berdasarkan `api_key_name`, `provider`, `model`, `status`** (dalam urutan tersebut), sehingga pemfilteran berdasarkan
  siapa yang menjalankannya, ke mana permintaan dikirim, atau apakah permintaan gagal akan memangkas blok di dalam setiap partisi. BigQuery
  mengizinkan maksimal empat kolom pengelompokan dan urutannya penting: filter hanya pada `api_key_name`
  akan memangkas blok, sedangkan filter hanya pada `status` tidak.
- **Retensi partisi opsional** melalui `partitionExpirationDays` (0 mempertahankan semuanya), diterapkan
  saat tabel dibuat.

Kedua pengaturan tersebut diterapkan saat pembuatan. Tabel yang sudah ada mempertahankan tata letak
yang dimilikinya, jadi arahkan tujuan ke ID tabel baru jika ingin menerapkannya.

`tests/unit/log-export-bigquery.test.ts` memastikan mapper dan skema tabel tetap sinkron, sehingga
kolom log panggilan baru tidak dapat terhapus secara diam-diam saat diekspor.

Batch dibagi berdasarkan **jumlah baris dan byte yang diserialisasi**. Jumlah baris saja tidak cukup
setelah payload diekspor: 500 baris yang membawa prompt dapat berukuran puluhan megabyte, dan insertAll
menolak permintaan yang berukuran lebih dari 10 MB. Chunk ditutup pada 500 baris atau 9 MB, mana saja yang tercapai lebih dahulu.

---

## 5. Tujuan trace OTLP/HTTP

Konfigurasi menggunakan `type: "otlp-http"`. Ini adalah ekspor terjadwal berbasis kursor dari
log panggilan yang dipersistenkan, bukan sink peristiwa routing live best-effort di
`open-sse/services/routing/otel.ts`. Konfigurasi ini tidak membaca atau mengubah variabel
lingkungan, timer, atau buffer sink tersebut. Mengaktifkan keduanya dapat menghasilkan dua
jenis span independen; gunakan cakupan instrumentasi `omniroute.log-export` untuk
membedakan span log panggilan ini.

| Key                      | Default / tujuan                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------- |
| `endpoint`               | URL trace HTTP(S) lengkap yang wajib diisi; sufiks `/v1/traces` tidak ditambahkan     |
| `headers`                | Baris `Name: value` opsional atau objek JSON berisi string; dienkripsi                |
| `requestHeaderAllowlist` | Kosong (nonaktif); nama/prefiks header klien yang akan ditangkap sebagai atribut span |
| `serviceName`            | `omniroute`; resource `service.name`                                                  |
| `langfuseMapping`        | `false`; menambahkan atribut generation/session/user Langfuse                         |
| `identity`               | `pseudonymous`, `keyName`, atau `none`                                                |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                               |
| `timeoutMs`              | `30000` per percobaan HTTP                                                            |
| `environment`            | Tidak disetel; `langfuse.environment` opsional                                        |

Dasbor generik merender field-field ini. `paths` menerima array API atau textarea dengan
path yang tepat dan dipisahkan oleh baris baru/koma. Embeddings, rerank, dan path lainnya
dilewati kecuali diizinkan secara eksplisit. Baris yang dilewati tetap memajukan kursor;
penghitung `exported`/`exportedTotal` milik runner yang ada menghitung baris sumber yang
diproses, termasuk baris yang difilter, bukan span yang diterima. Pemfilteran dilakukan di
child, tanpa mengubah kontrak IPC/kursor.

Validasi URL menggunakan helper `parseAndValidateNonMetadataUrl` yang bebas DB dari
`src/shared/network/outboundUrlGuard.ts`: kebijakan `block-metadata`. Helper ini memiliki
pemeriksaan metadata/protokol/kredensial tertanam yang sama dan tidak bersyarat seperti
validator webhook dengan URL privat yang diizinkan, tetapi sengaja mengizinkan target
localhost/LAN tanpa override feature flag global. Hal ini memungkinkan endpoint Langfuse,
Phoenix, Tempo, dan Collector yang di-hosting sendiri, termasuk endpoint HTTP privat.
Host metadata cloud selalu diblokir. Pengalihan tidak diikuti, sehingga collector tidak
dapat mengalihkan kredensial ke host lain. Seperti URL guard leksikal yang ada, helper ini
tidak mengunci resolusi DNS; hanya konfigurasikan host yang dikendalikan operator.
Utamakan HTTPS jika endpoint tidak berada di jaringan tepercaya.

### Payload dan pengiriman

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) membawa satu
span CLIENT untuk setiap baris yang diizinkan, yang diberi nama berdasarkan path permintaan
tepatnya. Penamaan path membedakan Chat Completions, Responses, dan Messages tanpa
menyertakan data model atau identitas dalam nama span. Atribut resource mencakup
`service.name` dan `service.version` milik package.

Logger percobaan chat normal (`open-sse/handlers/chatCore/attemptLogging.ts`) menulis
`duration = Date.now() - startTime` saat penyelesaian dan tidak menyediakan timestamp;
`saveCallLogOperation` di `src/lib/usage/callLogs.ts` menetapkan timestamp secara default ke
waktu penulisan (penyelesaian). Karena itu, ekspor menetapkan end = timestamp baris dan
start = end − duration (milidetik, dikonversi menjadi nanodetik desimal). Timestamp historis
yang diberikan caller juga dipertahankan sebagai waktu end; tidak ada pembeda
start/penyelesaian per baris. Duration null menjadi nol. Timestamp yang tidak valid/hilang
menggagalkan batch, bukan membuat span yang nondeterministik. `ttftMs` dapat bernilai null
dan dipetakan ke `omniroute.ttft_ms`.

Atribut mencakup `gen_ai.operation.name="chat"`, provider, model yang diminta/direspons,
token input/output, token cache-read/cache-creation/reasoning opsional, status HTTP,
combo, sumber cache, tag sesi, dan ID korelasi. Nilai integer OTLP dan timestamp berupa
string desimal; string, boolean, dan angka pecahan menggunakan varian nilai OTLP
native-nya. Span error memiliki status ERROR dan pesan status yang telah disanitasi.
Record kanonis tidak memiliki URL host upstream, sehingga `server.address` dihilangkan
daripada secara keliru mengidentifikasi collector sebagai server model. Biaya tidak
diekspor.

Hanya `includeBodies=true` yang melakukan hidrasi konten. Dengan
`langfuseMapping=false`, `gen_ai.input.messages` / `gen_ai.output.messages` membawa JSON
body permintaan/respons yang telah disanitasi seperti disimpan oleh OmniRoute
(dikanonisasi jika dapat di-parse), bukan array messages semconv yang dibentuk ulang.
Body yang dipotong/tidak berformat JSON tetap menjadi teks mentah. Dengan
`langfuseMapping=true`, body hanya dikeluarkan sebagai
`langfuse.observation.input` / `langfuse.observation.output`; atribut
`gen_ai.*.messages` dihilangkan agar setiap body dikirim sekali. Kedua mode mewarisi
`maxBodyBytes` dari jalur hidrasi yang ada;
`omniroute.bodies_truncated=true` menandai pemotongan.
Tidak ada snapshot pipeline tambahan atau pembacaan artefak yang tidak disanitasi yang
ditambahkan oleh tujuan ini; penangkapan header permintaan opsional menggunakan snapshot
klien terhidrasi yang ada, seperti dijelaskan di bawah.
Gunakan cadence tingkat menit seperti `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` saat
mengekspor body, bukan mengakumulasi backlog per jam.

### Header permintaan klien opsional

Penangkapan header **dinonaktifkan secara default**. Tetapkan `requestHeaderAllowlist` dalam
konfigurasi tujuan dan aktifkan **Ekspor prompt dan respons**
(`includeBodies: true` pada tujuan).
Allowlist menerima array API atau textarea dengan nama yang dipisahkan oleh baris baru/koma:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Nama dicocokkan tanpa membedakan huruf besar-kecil dan secara tepat, kecuali satu `*` terminal memilih prefiks nama-header yang tidak kosong. `*` tunggal, wildcard yang disisipkan, dan nama header HTTP yang tidak valid ditolak.
Ada paling banyak 64 selector, masing-masing dengan nama/prefiks sepanjang maksimal 256 byte ASCII.
Pengaturan ini terpisah dari `headers`, yang mengautentikasi exporter ke collector.

Capture hanya membaca `pipeline_client_request`, yang diisi dari `clientRawRequest` (atau `clientRequest` lama) pada pipeline detail yang disimpan. Capture tidak pernah menggunakan header request provider sebagai fallback.
Logging pipeline detail harus sudah diaktifkan saat request direkam. Jika `includeBodies` dinonaktifkan, atau JSON snapshot client tidak ada, rusak, atau terpotong, tidak ada atribut header yang dihasilkan. Meningkatkan `maxBodyBytes` dapat mencegah snapshot terpotong saat ekspor; peningkatan tersebut tidak dapat memulihkan detail yang tidak pernah disimpan. Snapshot yang berukuran lebih dari 1 MiB atau berisi lebih dari 256 entri header akan diabaikan. Ekspor prompt/respons yang ada tetap diaktifkan bersama capture header; allowlist tidak menyediakan mode hidrasi khusus header.

Nilai yang dipilih menjadi array string OTLP `http.request.header.<full lowercase header name>`, bahkan untuk satu string. Misalnya, `X-OmniRoute-Meta-Team: example-team` menjadi
`http.request.header.x-omniroute-meta-team` dengan
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Prefiks lengkap dipertahankan: ini adalah header biasa, tanpa parsing bidang bisnis atau konversi metadata `omniroute.metadata.*` / Langfuse. `langfuseMapping` tidak mengubah semantik header. `User-Agent` terpilih yang hanya memiliki satu nilai juga menetapkan scalar standar
`user_agent.original`. Koma di dalam satu nilai tidak dipisahkan. Varian huruf besar-kecil digabungkan sesuai urutan entri yang disimpan; jika ada varian yang tidak valid, seluruh header tersebut dihilangkan. Atribut diurutkan berdasarkan nama huruf kecil.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, header API-key, nama yang mengandung penanda auth/token/secret/password/credential, serta kredensial gateway internal selalu dikecualikan, meskipun dipilih atau sebagian disamarkan di penyimpanan. Pola kredensial yang dikenal menggunakan kembali detektor kredensial bersama; penanda redaksi dihilangkan, bukan diekspor sebagai nilai yang aman. Hanya string dan array string yang tidak kosong yang diterima; angka atau objek tidak dikonversi. Nama yang tidak valid, key prototipe, karakter kontrol (kecuali tab horizontal), dan Unicode yang cacat diabaikan tanpa menyebabkan batch gagal atau memantulkan isinya dalam error.

Setiap span menangkap paling banyak 32 header, 16 nilai per header, 4096 byte UTF-8 per nilai, dan total 16384 byte UTF-8 untuk seluruh nama dan nilai header yang ditangkap. Header yang terlalu besar/tidak valid dihilangkan seluruhnya, bukan dipotong. Pemilihan adalah keputusan privasi operator: nama yang tampak aman tetap dapat berisi data pribadi, dan batas/detektor ini bukan pembersih PII umum.

### Batas pengiriman

Request dibatasi hingga 500 span dan 4 MiB JSON UTF-8, termasuk envelope.
Setiap span yang diizinkan diperiksa ukurannya sebelum request pertama dari batch cursor. Span individual yang lebih besar dari batas tidak mengirimkan bagian apa pun dari batch tersebut dan gagal dengan panduan untuk menurunkan
`maxBodyBytes`; span tersebut tidak diam-diam dihilangkan. Preflight hanya mempertahankan referensi record
dan jumlah byte, serta membuang setiap span/JSON sementara; span dibuat ulang untuk chunk berbatas
alih-alih menyimpan salinan serialisasi kedua dari batch. HTTP 408/429/5xx, kegagalan jaringan, dan timeout mendapatkan maksimal
tiga percobaan, dengan exponential backoff 250/500 ms. Detik `Retry-After` atau tanggal HTTP
dapat memperpanjang jeda hingga 5 detik. Status lainnya langsung gagal. Penolakan parsial OTLP 2xx juga menimbulkan error alih-alih
mengakui span yang hilang; acknowledgement JSON yang kosong atau valid diterima, dengan
batas pembacaan respons 64 KiB.

Error hanya berisi fakta yang dimiliki exporter: status HTTP, kelas retry, jumlah percobaan, dan jumlah span yang dikirim,
atau teks tetap untuk kegagalan acknowledgement/jaringan. Body respons collector,
jumlah partial-success, dan header respons tidak pernah disalin ke dalam error,
log, atau dashboard. Batch yang gagal atau diterima sebagian tidak diakui: destination menampilkan status
Failing tersebut, cursor tetap berada pada batch terakhir yang diakui, dan proses berikutnya
mengirim ulang baris yang sama. Status permanen terus gagal sampai collector atau konfigurasi diperbaiki.
Gunakan log milik collector untuk detail respons. Ringkasan error call-log tetap menggunakan redaksinya sendiri.
`prepare()` tidak menyediakan apa pun; Test hanya mengirim `{"resourceSpans":[]}` dan melaporkan
status HTTP tanpa menulis span call-log.

ID trace dan ID span adalah masing-masing 32/16 digit heksadesimal pertama dari SHA-256 atas
`"omniroute.trace\\0" + callLogId` dan `"omniroute.span\\0" + callLogId`. Pengiriman ulang membawa
ID yang identik. Ini bukan jaminan deduplikasi: beberapa backend, termasuk ingestion Langfuse
v4, tidak melakukan deduplikasi span dengan ID yang sama. Crash atau kegagalan chunk parsial dapat
mengirim ulang paling banyak satu batch cursor yang belum diakui; seluruh batch tersebut dapat terduplikasi,
bukan hanya chunk HTTP terakhirnya. Pilih ukuran batch cursor dengan mempertimbangkan trade-off tersebut.

### Contoh Langfuse

Konfigurasikan bidang berikut untuk instance Langfuse yang di-host sendiri:

```json
{
  "endpoint": "https://langfuse.example.com/api/public/otel/v1/traces",
  "headers": "Authorization: Basic <base64-of-public-key:secret-key>",
  "serviceName": "omniroute",
  "langfuseMapping": true,
  "identity": "pseudonymous",
  "environment": "production"
}
```

Buat nilai Authorization secara lokal sebagai Base64 dari string literal `public-key:secret-key`
(misalnya dengan `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Jangan menempelkan kredensial nyata ke dalam log, tangkapan layar, atau issue. Pemetaan tersebut secara otomatis
menetapkan `x-langfuse-ingestion-version: 4`; Authorization tetap disediakan dalam `headers`.
Baik header maupun salt identity yang dibuat menggunakan mekanisme bidang secret terenkripsi
dan placeholder API yang ada; `STORAGE_ENCRYPTION_KEY` diperlukan.

Pemetaan menambahkan jenis/model generasi, detail penggunaan JSON (input/output/total dan kunci
cache yang tersedia), snapshot input/output JSON, level ERROR/DEFAULT, pesan status yang
disanitasi, nama trace, id sesi, environment opsional, serta
`langfuse.observation.metadata.<key>` yang dapat difilter untuk provider, model yang diminta, path, kombinasi, sumber
cache, dan status. `langfuse.observation.completion_start_time` adalah ISO 8601 pada
awal + TTFT hanya ketika TTFT diketahui dan berada dalam durasi. Tidak ada atribut biaya yang dikirim.

Mode identitas berlaku untuk `langfuse.user.id`:

- `pseudonymous` (default): HMAC-SHA256 dari id internal kunci API dengan salt 32 byte acak
  per tujuan. Salt dibuat saat pembuatan jika tidak ada, dienkripsi sebagai `identitySalt`,
  tidak pernah dikembalikan, dan dipertahankan selama pengeditan. Id kunci mentah tidak pernah
  dimasukkan ke dalam atribut span. Membuat ulang/memutar salt tujuan akan mengubah identitas.
- `keyName`: nama kunci API yang dikonfigurasi, dengan sengaja mengungkapkan label operator tersebut.
- `none`: tanpa user id. Tag sesi tetap diekspor jika ada; mode ini tidak menganonimkan konten prompt
  arbitrer atau label sesi/korelasi yang diberikan operator.

### Memulai tanpa backfill

Hanya saat pembuatan, aktifkan **Mulai dari posisi saat ini (lewati log yang ada)** atau teruskan
`startFromCurrentPosition: true` pada tingkat teratas payload API create. Ini menginisialisasi
`cursor_row_id` ke rowid maksimum log panggilan yang dipertahankan saat ini menggunakan helper cursor
yang ada, tanpa migrasi. Nilai default-nya adalah false (cursor 0 dan backfill riwayat yang dipertahankan).
Ini bukan pengaturan reset cursor saat pembaruan.

Penambahan `ttftMs` bersama juga menambahkan kolom nullable `ttft_ms` ke mapper BigQuery
dan skema tabel baru: pengujian skema mengharuskan setiap bidang rekaman kanonis memiliki
kolom. Tabel yang ada tetap mengekspor tanpa perubahan: `prepare()` membaca skema tabel
dan hanya menghilangkan `ttft_ms` jika kolom tersebut tidak ada. Tambahkan kolom nullable INT64 untuk mendapatkan TTFT
pada proses berikutnya, atau gunakan tabel baru. Kolom TTFT opsional tidak memicu pembaruan skema. Kolom bukti penggunaan
mengikuti alur kompatibilitas bersyarat dan opt-in di bawah ini; bidang baris lainnya tetap menjalani
pemeriksaan skema yang ketat.

---

## 6. Menambahkan tujuan

1. Buat `src/lib/logExport/destinations/<name>.ts` yang mengekspor `LogExportDestinationType`:
   sebuah `configSchema` Zod, array deskriptor `fields` untuk UI, `secretFields`, dan
   `createClient(config)` yang mengembalikan `test()` / `prepare()` / `send(records)`.
2. Tambahkan ke array `DESTINATIONS` di `src/lib/logExport/registry.ts`.
3. Tulis pengujian di bawah `tests/unit/`.

Itulah seluruh perubahannya: persistensi, tugas cron, lapisan REST, enkripsi rahasia, dan
formulir dasbor semuanya membaca registri.

Dua aturan untuk tujuan baru:

- `send()` **harus melempar pengecualian** jika terjadi kegagalan parsial. Penyelesaian yang berhasil berarti "tujuan sudah memiliki baris-baris ini",
  dan kursor akan melewatinya secara permanen.
- Tujuan yang menerima URL dari pengguna harus memvalidasinya melalui
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) sebelum mengambil data,
  dengan cara yang sama seperti webhook. BigQuery tidak memerlukan ini: host-nya berupa konstanta.

---

## 7. Mengoperasikannya

- **Dasbor**: Integrasi → Ekspor log. Tambahkan tujuan, jalankan **Uji** untuk memeriksa kredensial
  tanpa menulis baris, lalu aktifkan.
- **Backlog**: setiap kartu tujuan menampilkan baris yang tertunda dan kursor; `GET
/api/log-export/status` mengembalikan angka yang sama ditambah 20 proses tugas terakhir.
- **Tujuan yang gagal tidak menyebabkan tujuan lainnya gagal** — ringkasan proses mencatat status
  per tujuan di `last_status` / `last_error`, dan riwayat proses tugas menyimpan agregatnya.
- **Menghapus tujuan akan menghapus kursornya.** Menambahkannya kembali akan dimulai dari log panggilan
  tersimpan yang paling lama, sehingga mengirim ulang baris yang mungkin sudah dimiliki tujuan tersebut.
  Di BigQuery, `insertId` per baris hanya menangani hal ini dalam jendela deduplikasi BigQuery sendiri,
  jadi sebaiknya nonaktifkan tujuan daripada menghapusnya.

### Kompatibilitas skema bukti penggunaan

Tabel BigQuery baru menyertakan `usage_evidence` yang dapat bernilai null (STRING berisi JSON) dan
`usage_estimated` (BOOL). Dengan `autoCreate` diaktifkan, tabel yang sudah ada hanya dapat menerima
kolom nullable yang hilang tersebut. Exporter mempertahankan seluruh skema yang ada, termasuk metadata
field, dan mengirimkan PATCH bersyarat menggunakan etag yang dikembalikan. Perubahan skema secara
bersamaan akan menggagalkan ekspor, bukan menimpanya; proses berikutnya akan membaca tabel kembali.

Dengan `autoCreate` dinonaktifkan, tambahkan kolom-kolom ini sendiri sebelum mengekspor catatan
dengan bukti penggunaan. Metadata skema/etag yang hilang atau pembaruan yang gagal juga mencegah
penyisipan yang memuat bukti. Kursor ekspor tidak akan maju saat terjadi kegagalan tersebut, dan
bukti tidak pernah dihapus secara diam-diam. Retensi log lokal tetap berlaku saat ekspor terblokir,
jadi atasi kegagalan tersebut sebelum baris sumber yang dipertahankan kedaluwarsa.
